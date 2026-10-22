/* PassBook — the hosted copy's client (audit P1-58, P2-49, P2-76; owner decision D13; owner WP16). Contract: docs/ARCHITECTURE.md §10.12.

   GA.pwa exists only in a site build (build.py --site marks <html data-site>) opened over http(s) in a browser with service workers. file://
   and the source tree served as it is never see it, so every caller feature-detects it: Settings' 'On this phone' lines (WP6), the Me menu's
   update and install rows (shell.js), the Tests hub's idle prefetch of the paper files (WP10).

   GA.pwa = { hosted: true, update, installable, installed,
              status()  → Promise of {installed, update, persisted, cached: {bytes, files}, all: {download, bytes, files} | null},
              restart() → Promise (rejects while a test is in progress), saveAll(onProgress?) → Promise of {bytes, files},
              install() → Promise of boolean (the browser's own prompt), check() (look for an update now), on(event, fn) → off }
   events: 'update' (true: a new version finished installing and waits for Restart), 'installable' (the browser offers or withdrew its install
   prompt), 'stale' (a file from a newer build was asked for), 'saving' ({done, total} while saveAll runs).

   Update policy (sw.js): a new version installs in the background and waits. restart() hands over only when no test is in progress in this
   profile (read from storage, so a test running in another tab counts); every other open page reloads when it takes over, and a page with a
   test on screen reloads when that test ends. The worker registers after the page has loaded, so it never competes with the first screen. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  /* ---------------------------------------------------------------- pure helpers (tests/pwa.test.js) */
  /** a site build over http(s) in a browser with service workers: env = {site, protocol, sw} */
  const eligible = env => !!(env && env.site && /^https?:$/.test(env.protocol || '') && env.sw);
  /** the Me header's line for a waiting update, in the shell's line shape; while a test is in progress it only says when it will apply */
  function updateLine(update, live) {
    if (!update) return null;
    return live ? { kind: 'update', text: 'Update ready · it applies after your test' }
      : { kind: 'update', text: 'Update ready · Restart', lead: 'Update ready', act: 'Restart', action: 'restart' };
  }
  /** status()'s sizes from the worker's summary ({files, cached, cachedRaw, allRaw, missingGz}) and what the browser says this site's caches
      take (used, bytes): cached = what the device holds now; all = every file of this version, with the download still to do and, from this
      device's own ratio of stored to raw bytes, about what the whole copy would take here */
  function sizes(sum, used) {
    const u = typeof used === 'number' && used > 0 ? used : 0;
    if (!sum || typeof sum !== 'object' || sum.error || typeof sum.files !== 'number') return { cached: { bytes: u, files: 0 }, all: null };
    const bytes = u || sum.cachedRaw || 0;
    const ratio = sum.cachedRaw > 0 && bytes > 0 ? Math.min(4, Math.max(1, bytes / sum.cachedRaw)) : 1;
    return { cached: { bytes, files: sum.cached || 0 },
             all: { files: sum.files, download: sum.missingGz || 0, bytes: Math.round(bytes + Math.max(0, (sum.allRaw || 0) - (sum.cachedRaw || 0)) * ratio) } };
  }
  /** a test in progress in a stored progress document (its text), for restart(): another tab may have started it */
  function liveIn(text) { try { const d = text ? JSON.parse(text) : null; return !!(d && d.live); } catch (e) { return false; } }
  const lib = { eligible, updateLine, sizes, liveIn };

  const doc = g.document, nav = g.navigator, loc = g.location;
  if (!doc || !nav || !loc || !eligible({ site: doc.documentElement.hasAttribute('data-site'), protocol: loc.protocol, sw: 'serviceWorker' in nav })) {
    if (typeof module !== 'undefined' && module.exports) module.exports = lib;
    return;
  }

  /* ---------------------------------------------------------------- the browser side */
  const SW = nav.serviceWorker, listeners = {};
  const emit = (ev, v) => (listeners[ev] || []).slice().forEach(fn => { try { fn(v); } catch (e) { if (g.console) console.error('pwa ' + ev + ':', e); } });
  let reg = null, waiting = false, prompt = null, lastCheck = 0, reloadWanted = false;
  let hadController = !!SW.controller;          // false on a first visit: the worker's first take-over is not an update
  const standalone = () => !!(nav.standalone || (g.matchMedia && g.matchMedia('(display-mode: standalone)').matches));
  const inExam = () => !!(doc.body && doc.body.classList.contains('in-exam'));
  /** a test in progress in this profile: the live store, else the stored document (a test started in another tab) */
  function testRunning() {
    const S = GA.store;
    if (S && S.state && S.state.live) return true;
    try { return liveIn(S && S.key ? g.localStorage.getItem(S.key) : null); } catch (e) { return false; }
  }

  function setWaiting(v) { v = !!v; if (v === waiting) return; waiting = v; emit('update', v); }
  function watch(r) {
    reg = r;
    if (r.waiting && SW.controller) setWaiting(true);
    r.addEventListener('updatefound', () => {
      const w = r.installing;
      if (!w) return;
      w.addEventListener('statechange', () => {
        if (w.state === 'installed' && SW.controller) setWaiting(true);
        else if (w.state === 'redundant' && !r.waiting) setWaiting(false);
      });
    });
  }
  function reloadNow() { try { if (GA.store && typeof GA.store.flushNow === 'function') GA.store.flushNow(); } catch (e) { /* the page reloads anyway */ } loc.reload(); }
  /** reload into the new version, but never under a test on screen: that page reloads when its test ends */
  function reloadWhenFree() {
    if (!inExam()) { reloadNow(); return; }
    if (reloadWanted) return;
    reloadWanted = true;
    new MutationObserver((recs, mo) => { if (!inExam()) { mo.disconnect(); reloadNow(); } }).observe(doc.body, { attributes: true, attributeFilter: ['class'] });
  }
  /** ask the worker that controls this page (or the active one); null when there is none yet or it does not answer in time */
  function ask(msg, ms) {
    const w = SW.controller || (reg && reg.active);
    if (!w || typeof MessageChannel !== 'function') return Promise.resolve(null);
    return new Promise(res => {
      const ch = new MessageChannel(), t = setTimeout(() => res(null), ms || 5000);
      ch.port1.onmessage = e => { clearTimeout(t); res(e.data); };
      try { w.postMessage(msg, [ch.port2]); } catch (e) { clearTimeout(t); res(null); }
    });
  }
  /** a first visit loaded its files before the worker existed: hand them over, so that visit's lesson and questions open offline too */
  function adopt() {
    const P = g.performance;
    if (!P || typeof P.getEntriesByType !== 'function') return;
    const urls = P.getEntriesByType('resource').map(x => x.name).filter(u => u.indexOf(loc.origin + '/') === 0);
    if (urls.length) ask({ type: 'adopt', urls }, 120000);
  }
  function check(force) {
    if (!reg) return;
    const now = Date.now();
    if (!force && now - lastCheck < 3600e3) return;          // an installed app that stays open looks once an hour, when it comes back to view
    lastCheck = now;
    reg.update().catch(() => { /* offline: the next look */ });
  }

  SW.addEventListener('controllerchange', () => {
    if (!hadController) { hadController = true; adopt(); return; }
    reloadWhenFree();
  });
  SW.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === 'stale') { emit('stale', d.path || null); check(true); }
  });
  g.addEventListener('beforeinstallprompt', e => { e.preventDefault(); prompt = e; emit('installable', true); });
  g.addEventListener('appinstalled', () => { prompt = null; emit('installable', false); });
  doc.addEventListener('visibilitychange', () => { if (!doc.hidden) check(false); });
  g.addEventListener('online', () => check(true));

  function register() {
    SW.register('sw.js', { updateViaCache: 'none' }).then(r => { lastCheck = Date.now(); watch(r); },
      err => { if (g.console) console.warn('PassBook: the offline copy could not start:', (err && err.message) || err); });
  }
  // after the first screen: a first visit precaches the shell in the background, a repeat visit only looks for an update
  const start = () => setTimeout(register, SW.controller ? 1000 : 2500);
  if (doc.readyState === 'complete') start(); else g.addEventListener('load', start, { once: true });

  const P = GA.pwa = {
    hosted: true,
    /** a new version is installed and waits for restart() */
    get update() { return waiting; },
    /** the browser offers its install prompt (Chromium; iOS installs through Share → Add to Home Screen) */
    get installable() { return !!prompt && !standalone(); },
    get installed() { return standalone(); },
    testRunning,
    line() { return updateLine(waiting, !!(GA.store && GA.store.state && GA.store.state.live)); },
    status() {
      const SM = nav.storage;
      const est = SM && typeof SM.estimate === 'function' ? SM.estimate().catch(() => null) : Promise.resolve(null);
      const per = SM && typeof SM.persisted === 'function' ? SM.persisted().catch(() => null) : Promise.resolve(null);
      return Promise.all([ask({ type: 'status' }), est, per]).then(([sum, e, p]) => {
        const used = e ? (e.usageDetails && typeof e.usageDetails.caches === 'number' ? e.usageDetails.caches : e.usage) : 0;
        const z = sizes(sum, used);
        return { installed: standalone(), update: waiting, persisted: p === true ? true : p === false ? false : null, cached: z.cached, all: z.all };
      });
    },
    restart() {
      if (testRunning()) return Promise.reject(new Error('A test is in progress. Finish it or leave it first: the update waits until then.'));
      const w = reg && reg.waiting;
      if (!w) { reloadNow(); return Promise.resolve(); }
      hadController = true;
      w.postMessage({ type: 'skip' });                       // the new version takes over; controllerchange reloads this page
      setTimeout(reloadNow, 4000);                           // in case the take-over is never announced
      return Promise.resolve();
    },
    /** 'Save everything for offline': every file of this version not cached yet, four at a time, through the worker (which keeps each one) */
    saveAll(onProgress) {
      // the files are kept by the worker as they pass through it: a page it does not control (a hard reload) would only download them
      if (!SW.controller) return Promise.reject(new Error('This page is not using its offline copy yet. Reload the app, then try again.'));
      return ask({ type: 'missing' }, 15000).then(m => {
        if (!m || !Array.isArray(m.list)) throw new Error('The offline copy is still being set up. Try again in a minute.');
        const list = m.list, total = list.length;
        let i = 0, done = 0, failed = 0;
        const tick = () => { const v = { done, total }; emit('saving', v); if (typeof onProgress === 'function') onProgress(v); };
        const one = () => {
          if (i >= list.length) return Promise.resolve();
          const [path, sha] = list[i++];
          return fetch(encodeURI(path) + '?v=' + sha).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
            .catch(() => { failed++; }).then(() => { done++; tick(); return one(); });
        };
        tick();
        return Promise.all(Array.from({ length: Math.min(4, total) }, one)).then(() => {
          if (failed) throw new Error(`${failed} of ${total} files did not download. Try again to finish.`);
          if (GA.store && typeof GA.store.persist === 'function') GA.store.persist().catch(() => null);   // a bigger offline copy is worth keeping (silent where the browser allows)
          return P.status();
        }).then(st => ({ bytes: st.cached.bytes, files: st.cached.files }));
      });
    },
    install() {
      if (!prompt) return Promise.resolve(false);
      const p = prompt;
      prompt = null; emit('installable', false);
      return Promise.resolve().then(() => p.prompt()).then(() => p.userChoice).then(c => !!c && c.outcome === 'accepted', () => false);
    },
    check: () => check(true),
    on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); return () => { listeners[ev] = (listeners[ev] || []).filter(x => x !== fn); }; },
    _lib: lib
  };
})(typeof window !== 'undefined' ? window : globalThis);
