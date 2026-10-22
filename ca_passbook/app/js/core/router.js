/* PassBook — hash router. Routes are patterns like '/s/:subject'. A route handler is {enter(ctx, outlet), leave?()}.
   ctx = {params, query, path, stale()}. Navigating away calls leave() so views can stop timers.

   Scroll (P1-01): every history entry gets a key in history.state (k). Positions are saved per key while the learner scrolls ({y, h: the nearest heading
   id above the fold, o: the offset from it}) and kept in sessionStorage, so Back, Forward and a reload return to the same place; the position is
   re-applied for ~1.5 s while lazy figures grow and stops as soon as the learner scrolls. New navigations start at the top; a pending in-page anchor
   (#/l/<id>#<heading>, taken off by the shell) wins over both. Focus (P1-48): when the navigation started inside the view (or focus was lost to the
   page), focus moves to the new view's [data-focus] element, else its h1, and the page title is announced through GA.ui.say. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const routes = [];
  let current = null, outlet = null, seq = 0, booted = false;
  const bus = (GA.util || { emitter: () => ({ on() {}, emit() {} }) }).emitter();
  const hasDOM = typeof document !== 'undefined' && typeof g.addEventListener === 'function';

  function compile(pat) {
    const keys = [];
    const re = new RegExp('^' + pat.replace(/\/:([a-z]+)\*/gi, (_, k) => { keys.push(k); return '/(.+)'; }).replace(/\/:([a-z]+)/gi, (_, k) => { keys.push(k); return '/([^/]+)'; }) + '/?$');
    return { re, keys, pat };
  }
  /** a stray % in a pasted address must not throw (P3-36): fall back to the raw text */
  const dec = s => { try { return decodeURIComponent(s); } catch (e) { return s; } };
  const decodable = s => { try { decodeURIComponent(s); return true; } catch (e) { return false; } };
  function parse(hash) {
    const h = (hash || '').replace(/^#/, '') || '/';
    const qi = h.indexOf('?'), path = qi < 0 ? h : h.slice(0, qi), qs = qi < 0 ? '' : h.slice(qi + 1);
    const query = {};
    qs.split('&').filter(Boolean).forEach(kv => { const i = kv.indexOf('='); const k = i < 0 ? kv : kv.slice(0, i), v = i < 0 ? '' : kv.slice(i + 1); query[dec(k)] = dec(v); });
    return { path: path || '/', query };
  }

  /* ------------------------------------------------------------------ scroll positions per history entry */
  const SKEY = 'passbook:scroll';
  const pos = (() => { try { return JSON.parse((g.sessionStorage && g.sessionStorage.getItem(SKEY)) || '{}') || {}; } catch (e) { return {}; } })();
  let curKey = null, restoring = null;
  const newKey = () => 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const state = () => { try { return g.history.state; } catch (e) { return null; } };
  function persist() {
    try {
      const keys = Object.keys(pos);
      if (keys.length > 60) keys.sort((a, b) => (pos[a].t || 0) - (pos[b].t || 0)).slice(0, keys.length - 60).forEach(k => delete pos[k]);
      g.sessionStorage.setItem(SKEY, JSON.stringify(pos));
    } catch (e) { /* storage blocked: positions live for this page only */ }
  }
  /** the fold line under the sticky top bar; 0 where the bar scrolls away (short landscape screens, P2-55) */
  const navH = () => { const tb = document.querySelector('.topbar'); return tb && getComputedStyle(tb).position === 'sticky' ? Math.max(0, tb.getBoundingClientRect().bottom) : 0; };
  const HEADS = 'h1[id], h2[id], h3[id], h4[id], [data-anchor][id]';
  /** {y, h, o} for the current scroll position: the last heading whose top is above the fold line, and the offset from it */
  function measure() {
    const y = Math.round(g.scrollY || g.pageYOffset || 0), line = navH() + 8;
    let h = null, o = 0;
    if (outlet && y > 0) {
      const hs = outlet.querySelectorAll(HEADS);
      for (const el of hs) { const r = el.getBoundingClientRect(); if (!r.height) continue; if (r.top <= line) { h = el.id; o = Math.round(line - r.top); } else break; }   // hidden headings (closed folds) have no box
    }
    return { y, h, o, t: Date.now() };
  }
  function save(key) { if (!hasDOM || !key || restoring) return; pos[key] = measure(); persist(); }
  function target(p) {
    if (p.h) { const el = document.getElementById(p.h), r = el && el.getBoundingClientRect(); if (el && r.height && outlet && outlet.contains(el)) return Math.max(0, Math.round(r.top + g.scrollY - navH() - 8 + p.o)); }
    return p.y;
  }
  /** re-apply a position while the page settles (lazy figures, fonts); stops when the learner scrolls, after ~1.5 s, or on the next navigation */
  function settleAt(get, my) {
    let stop = false;
    const quit = () => { stop = true; ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(ev => removeEventListener(ev, quit, true)); restoring = null; };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(ev => addEventListener(ev, quit, { capture: true, passive: true }));
    restoring = { quit };
    const t0 = Date.now();
    const step = () => {
      if (stop || my !== seq) { if (!stop) quit(); return; }
      const y = get();
      if (y != null && Math.abs((g.scrollY || 0) - y) > 2) g.scrollTo(0, y);
      if (Date.now() - t0 < 1500) setTimeout(step, 100); else quit();
    };
    step();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!stop && my === seq) { const y = get(); if (y != null) g.scrollTo(0, y); } });
  }
  if (hasDOM) {
    try { if ('scrollRestoration' in g.history) g.history.scrollRestoration = 'manual'; } catch (e) { /* not supported */ }
    let sT = null;
    addEventListener('scroll', () => { if (restoring || !curKey) return; clearTimeout(sT); sT = setTimeout(() => save(curKey), 150); }, { passive: true });
    addEventListener('pagehide', () => save(curKey));
  }

  /* ------------------------------------------------------------------ focus and announcements after a navigation */
  function focusView(view) {
    const el = view && (view.querySelector('[data-focus]') || view.querySelector('h1'));
    if (!el) return;
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    try { el.focus({ preventScroll: true }); } catch (e) { /* detached */ }
  }
  function announce() {
    if (!GA.ui || !GA.ui.say) return;
    const t = (document.title || '').replace(/\s*·\s*PassBook$/, '').trim();
    GA.ui.say(t && t !== 'PassBook' ? t : 'Home');
  }

  /** the kind of file that did not arrive, from its path (the loaders' Error carries .file) */
  const kindOf = f => (/data\/lessons\//.test(f) ? 'lesson' : /data\/pyq\//.test(f) ? 'paper' : /data\/sol\//.test(f) ? 'solution' : /data\/cards\//.test(f) ? 'cards'
    : /search-pyq/.test(f) ? 'search' : /labs?\//.test(f) ? 'lab' : 'view');
  function errorCard(e) {
    const failedLoad = e && (e.loadFailed || e.file || /Failed to load|did not register|is not loaded|Could not load/.test(String(e.message)));
    if (GA.ui && GA.ui.loadFailed && failedLoad) { GA.ui.loadFailed(outlet, { what: kindOf(String(e.file || e.message || '')), main: true }); return; }
    const esc = GA.util ? GA.util.esc : String;
    const has = GA.store && typeof GA.store.rawText === 'function', undo = GA.store && typeof GA.store.lastImport === 'function' && GA.store.lastImport();
    // plain words first (P3-42); the developer's message only inside 'Details', for a bug report
    outlet.innerHTML = `<div class="empty err-card" role="alert"><div class="em-i">!</div><b>This screen ran into a problem</b><p>Your saved progress is safe. Try again; if it keeps happening, download your saved data.</p>` +
      `<div class="btns" style="justify-content:center;margin-top:6px"><button type="button" class="btn pop" data-err="retry">Try again</button>` +
      (has ? '<button type="button" class="btn" data-err="save">Download my saved data</button>' : '') +
      (undo ? '<button type="button" class="btn" data-err="undo">Undo last import</button>' : '') + '</div>' +
      (e && e.message ? `<details class="err-x"><summary>Details for a bug report</summary><code>${esc(e.message)}</code></details>` : '') + '</div>';
    outlet.querySelectorAll('[data-err]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.err;
      if (k === 'retry') R.resolve();
      else if (k === 'undo') GA.store.undoImport();
      else if (k === 'save' && GA.shell && GA.shell.download) GA.shell.download('passbook-saved-data.json', GA.store.rawText() || '');
    }));
  }

  const R = {
    add(pat, handler, meta) { routes.push(Object.assign(compile(pat), { handler, meta: meta || {} })); return R; },
    mount(el) { outlet = el; },
    href(path, query) { const q = query ? '?' + Object.entries(query).filter(([, v]) => v != null && v !== '').map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&') : ''; return '#' + path + (q === '?' ? '' : q); },
    /** navigate; while an overlay's history.back() is in flight the navigation waits for it, so it is never undone (P1-47) */
    go(path, query, replace) {
      const h = R.href(path, query);
      const nav = () => { if (replace) location.replace(h); else location.hash = h; };
      if (GA.ui && GA.ui.overlay && GA.ui.overlay.busy()) GA.ui.overlay.after(nav); else nav();
    },
    get current() { return current; },
    on: bus.on,
    /** the shell answers whether an in-page anchor is waiting to be scrolled to (it then owns the scroll) */
    pendingAnchor: () => null,
    /** keep scrolling to getY() while the page settles (~1.5 s, until the learner scrolls or navigates): the shell's anchors use it */
    settle(getY) { if (hasDOM) settleAt(getY, seq); },
    /** saved scroll position of the current history entry (tests, debugging) */
    _pos: () => (curKey ? pos[curKey] || null : null),
    _parse: parse,
    _decodable: decodable,
    async resolve() {
      const { path, query } = parse(location.hash);
      const my = ++seq;
      // the entry we are leaving keeps its position; the entry we arrive at gets a key the first time
      if (curKey) save(curKey);
      if (restoring) restoring.quit();
      const st = state() || {};
      let key = st.k;
      if (!key) { key = newKey(); try { g.history.replaceState(Object.assign({}, st, { k: key }), ''); } catch (e) { /* file:// quirks */ } }
      const same = key === curKey, back = same || !!pos[key];   // Back / Forward / reload / a re-render of the same entry: return to the saved place
      curKey = key;
      const anchored = !!(R.pendingAnchor && R.pendingAnchor());
      const ae = hasDOM ? document.activeElement : null, inView = !ae || ae === document.body || (outlet && outlet.contains(ae));
      // a path that cannot be decoded (a stray % in a pasted address, P3-36) matches no route: it gets the not-found card, never a view
      for (const r of decodable(path) ? routes : []) {
        const m = r.re.exec(path);
        if (!m) continue;
        const params = {};
        r.keys.forEach((k, i) => (params[k] = dec(m[i + 1])));
        if (current && current.handler.leave) { try { current.handler.leave(); } catch (e) { console.error(e); } }
        current = { handler: r.handler, pat: r.pat, params, query, path, meta: r.meta, back };
        bus.emit('before', current);
        if (!back && !anchored) { outlet.scrollTop = 0; g.scrollTo(0, 0); }
        try { await r.handler.enter({ params, query, path, meta: r.meta, stale: () => my !== seq }, outlet); }
        catch (e) {
          // a view that decodes its (already decoded) id once more throws URIError on a '%' in it ('#/q/50%25'): that address cannot be decoded
          // either, so it gets the not-found card, not an error (P3-36)
          const undecodable = !!e && e.name === 'URIError' && !!GA.shell && typeof GA.shell.notFound === 'function';
          if (undecodable) console.warn('router: ' + path + ' does not decode (' + e.message + ')'); else console.error(e);
          if (my === seq) { if (undecodable) GA.shell.notFound({ kind: 'page', id: path, crumbs: [] }); else errorCard(e); }
        }
        if (my !== seq) return;
        bus.emit('after', current);
        if (back && !anchored && pos[key]) { const p = pos[key]; settleAt(() => target(p), my); }
        if (booted && inView) focusView(outlet);
        if (booted && !same) announce();                  // a re-render of the same screen is not news
        booted = true;
        return;
      }
      if (current && current.handler.leave) { try { current.handler.leave(); } catch (e) { console.error(e); } }
      current = { handler: {}, pat: '404', params: {}, query, path, meta: {}, back };
      outlet.innerHTML = '<div class="empty"><div class="em-i">?</div><b>Page not found</b><p>That address does not exist. <a class="link" href="#/">Go to the home page</a>.</p></div>';
      if (!back) g.scrollTo(0, 0);
      bus.emit('after', { path, params: {}, query, pat: '404', meta: {}, back });
      if (booted && inView) focusView(outlet);
      booted = true;
    },
    start() { window.addEventListener('hashchange', R.resolve); R.resolve(); }
  };
  GA.router = R;
  if (typeof module !== 'undefined' && module.exports) module.exports = R;
})(typeof window !== 'undefined' ? window : globalThis);
