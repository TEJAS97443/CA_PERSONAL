/* PassBook — the service worker of the hosted copy (audit P1-58, owner decision D13; owner WP16).

   This file is the source. `build.py --site <dir>` writes <dir>/sw.js with the SITE block below filled in: the build's version, every file's
   content hash and size, the app shell to precache and the hash of the hosted index.html. Unbuilt (SITE.ver null) it answers nothing and
   unregisters itself. file:// never runs a service worker, and the source index.html never registers one: only a site build does, through
   app/js/core/pwa.js (GA.pwa). How to build, test and host it: HOSTING.md.

   Policy
   * Addresses. The hosted copy asks for every file as <path>?v=<sha8> (the first 8 hex digits of its SHA-256) and the cache keeps it under
     that address. Content-addressed: an unchanged file survives an update, a changed one has a new address. A request without ?v= (a sheet a
     view adds by script, a font named in a stylesheet) means this version's file.
   * install precaches the app shell that is not cached yet (index.html, the boot set, every view, the web fonts, the icons). Any failure fails
     the install, so a half-downloaded update never activates. Lessons, papers, solutions, cards, figures, the search index and labs are cached
     on first use; the page hands over what it loaded before the worker took control ({type: 'adopt'}), so a first visit already opens offline.
   * Checked. A network response is hashed before it is used: a file from another build is never kept under the wrong address. Content (data/)
     from a newer build is still shown and kept under its own address; code from another build is refused (the view shows its 'did not load'
     card). Either way the pages hear {type: 'stale'} and an update check runs.
   * Navigations to the app (index.html with any query string) are answered from this version's cached index.html: instant repeat visits and
     offline starts.
   * Updates wait. A new version installs in the background and waits; it takes over only when a page sends {type: 'skip'} (GA.pwa.restart()
     from the 'Update ready · Restart' line), which the page refuses while a test is in progress. activate keeps only this version's files and
     claims the open pages, which reload (a page with a test running reloads when the test ends).
   Pure helpers are exported for Node (tests/pwa.test.js). */
/*SITE*/const SITE = { ver: null, index: null, files: {}, precache: [] };/*SITE*/
(function () {
  'use strict';
  const CACHE = 'pb-files';                 // one content-addressed cache, shared by every version
  const HEX8 = /^[0-9a-f]{8}$/;

  /* ---------------------------------------------------------------- pure helpers */
  /** the site path of a URL inside scope ('' = the scope itself), without query or hash; null outside the scope */
  function pathOf(url, scope) {
    const u = String(url).split('#')[0].split('?')[0];
    if (!u.startsWith(scope)) return null;
    try { return decodeURIComponent(u.slice(scope.length)); } catch (e) { return null; }
  }
  /** the content hash a URL asks for (?v=<sha8>), else null */
  function verOf(url) {
    const q = String(url).split('#')[0].split('?')[1] || '';
    for (const kv of q.split('&')) if (kv.slice(0, 2) === 'v=' && HEX8.test(kv.slice(2))) return kv.slice(2);
    return null;
  }
  /** the cache address of one version of a file */
  const keyOf = (scope, path, sha) => scope + encodeURI(path) + '?v=' + sha;
  /** content files (data/ except the boot pair) from a newer build are shown rather than refused: the old code reads them fine */
  const isContent = p => /^data\//.test(p) && p !== 'data/manifest.js' && p !== 'data/boot.js';
  /** a network body hashing to `got`, asked for as `want`: 'ok' (it is that file), 'newer' (content from another build: show it, keep it under
      its own address) or 'refuse' (code from another build) */
  const verdict = (path, want, got) => (got === want ? 'ok' : isContent(path) ? 'newer' : 'refuse');
  /** the precache paths that are not cached yet (have = Set of cached addresses) */
  const missing = (list, files, scope, have) => list.filter(p => files[p] && !have.has(keyOf(scope, p, files[p][0])));
  /** cached addresses that are not this version's files (activate deletes them) */
  function strays(keys, files, scope) {
    const keep = new Set(Object.keys(files).map(p => keyOf(scope, p, files[p][0])));
    return keys.filter(k => !keep.has(k));
  }
  /** what this device holds of this version: {files, cached, cachedRaw, allRaw, missingGz} (sizes in bytes; gz = the gzip size, the download) */
  function summary(files, scope, have) {
    const o = { files: 0, cached: 0, cachedRaw: 0, allRaw: 0, missingGz: 0 };
    for (const p of Object.keys(files)) {
      const f = files[p], raw = f[1] || 0;
      o.files++; o.allRaw += raw;
      if (have.has(keyOf(scope, p, f[0]))) { o.cached++; o.cachedRaw += raw; } else o.missingGz += f[2] || raw;
    }
    return o;
  }
  /** this version's files that are not cached yet, as [path, sha8] ('Save everything for offline' fetches them) */
  const notCached = (files, scope, have) => Object.keys(files).filter(p => !have.has(keyOf(scope, p, files[p][0]))).map(p => [p, files[p][0]]);
  const lib = { CACHE, pathOf, verOf, keyOf, isContent, verdict, missing, strays, summary, notCached };
  if (typeof module !== 'undefined' && module.exports) { module.exports = Object.assign({ SITE }, lib); return; }

  /* ---------------------------------------------------------------- the worker */
  const W = self, scope = W.registration.scope;
  const OFFLINE = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>Offline · PassBook</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F2F5FF;color:#0E1530;' +
    'font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}main{max-width:30rem;padding:24px}h1{font-size:22px;margin:0 0 8px}' +
    'p{margin:0 0 18px;color:#4D5675}button{height:48px;padding:0 20px;border:0;border-radius:14px;background:#D6245E;color:#fff;font:700 15px system-ui;cursor:pointer}' +
    '@media (prefers-color-scheme:dark){body{background:#111215;color:#F1F3F8}p{color:#A3A8B6}button{background:#FF6B6B;color:#111215}}</style>' +
    '<main><h1>PassBook is offline</h1><p>The copy of the app saved on this device is gone (browsers clear it when storage runs low), and there is ' +
    'no connection to fetch it again. Connect to the internet, then try again.</p><button type="button" onclick="location.reload()">Try again</button></main></html>';

  const open = () => caches.open(CACHE);
  const have = c => c.keys().then(ks => new Set(ks.map(r => r.url)));
  async function sha8(buf) {
    const d = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
    let s = '';
    for (let i = 0; i < 4; i++) s += d[i].toString(16).padStart(2, '0');
    return s;
  }
  const body = (buf, type) => new Response(buf, { status: 200, statusText: 'OK', headers: { 'content-type': type || 'application/octet-stream' } });

  /** one file version from the network, hashed. A hash that does not match is asked once more past the HTTP cache (it may hold a copy another
      build put under this address). → {buf, got, type} | {res} (a 404 or other error, passed on as it is) | null (offline) */
  async function fetchFile(path, want) {
    let last = null;
    for (const mode of ['default', 'reload']) {
      let r;
      try { r = await fetch(keyOf(scope, path, want), { cache: mode, credentials: 'same-origin' }); } catch (e) { return last; }
      if (!r.ok) return last || { res: r };
      const buf = await r.arrayBuffer();
      last = { buf, got: await sha8(buf), type: r.headers.get('content-type') };
      if (last.got === want) return last;
    }
    return last;
  }

  let checkedAt = 0;
  function newerBuild(path) {
    W.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage({ type: 'stale', path }))).catch(() => {});
    if (Date.now() - checkedAt > 60000) { checkedAt = Date.now(); W.registration.update().catch(() => {}); }
  }
  /** keep a response without holding up the page; a full disk only means it is fetched again next time */
  const keep = (e, c, key, buf, type) => { const p = c.put(key, body(buf, type)).catch(() => {}); if (e && e.waitUntil) e.waitUntil(p); return p; };

  async function file(path, want, e) {
    const c = await open(), key = keyOf(scope, path, want);
    const hit = await c.match(key);
    if (hit) return hit;
    const x = await fetchFile(path, want);
    if (!x) return Response.error();                       // offline: the view shows its 'did not load' card
    if (x.res) return x.res;                               // a 404 or a server error: passed on, never cached
    const v = verdict(path, want, x.got);
    if (v === 'ok') { keep(e, c, key, x.buf, x.type); return body(x.buf, x.type); }
    newerBuild(path);
    if (v === 'newer') { keep(e, c, keyOf(scope, path, x.got), x.buf, x.type); return body(x.buf, x.type); }
    return Response.error();
  }
  async function page(req) {
    const c = await open(), hit = SITE.index ? await c.match(keyOf(scope, 'index.html', SITE.index)) : null;
    if (hit) return hit;
    try { return await fetch(req); } catch (err) { return new Response(OFFLINE, { status: 503, headers: { 'content-type': 'text/html; charset=utf-8' } }); }
  }

  W.addEventListener('fetch', e => {
    if (!SITE.ver) return;
    const r = e.request;
    if (r.method !== 'GET') return;
    const path = pathOf(r.url, scope);
    if (path == null) return;                              // another origin, or outside the app's folder
    if (r.mode === 'navigate') { if (path === '' || path === 'index.html') e.respondWith(page(r)); return; }
    const f = SITE.files[path];
    if (!f) return;                                        // not a file of this build: the host answers (a 404)
    e.respondWith(file(path, verOf(r.url) || f[0], e));
  });

  /** fetch and keep a list of [path, sha8] files, six at a time; strict: any file missing or from another build throws */
  async function fill(c, list) {
    let i = 0;
    const one = async () => {
      while (i < list.length) {
        const [p, want] = list[i++], x = await fetchFile(p, want);
        if (!x || x.res || x.got !== want) throw new Error(`${p} ${!x ? 'did not arrive' : x.res ? 'answered ' + x.res.status : 'is from another build'}`);
        await c.put(keyOf(scope, p, want), body(x.buf, x.type));
      }
    };
    await Promise.all(Array.from({ length: Math.min(6, list.length) }, one));
  }
  W.addEventListener('install', e => {
    if (!SITE.ver) return;
    e.waitUntil(open().then(async c => fill(c, missing(SITE.precache, SITE.files, scope, await have(c)).map(p => [p, SITE.files[p][0]]))));
  });
  W.addEventListener('activate', e => e.waitUntil((async () => {
    if (!SITE.ver) { await W.registration.unregister(); return; }
    for (const k of await caches.keys()) if (/^ga-/.test(k) && k !== CACHE) await caches.delete(k);
    const c = await open(), keys = (await c.keys()).map(r => r.url);
    await Promise.all(strays(keys, SITE.files, scope).map(k => c.delete(k)));
    await W.clients.claim();
  })()));

  /** files the page loaded before this worker controlled it (a first visit): keep the ones of this build, quietly skip the rest */
  async function adopt(urls) {
    const c = await open(), got = await have(c), list = [];
    for (const u of urls || []) {
      const p = pathOf(u, scope), f = p != null && SITE.files[p], want = f && (verOf(u) || f[0]);
      if (f && want === f[0] && !got.has(keyOf(scope, p, want))) { got.add(keyOf(scope, p, want)); list.push([p, want]); }
    }
    let i = 0;
    const one = async () => { while (i < list.length) { const [p, want] = list[i++], x = await fetchFile(p, want); if (x && x.buf && x.got === want) await c.put(keyOf(scope, p, want), body(x.buf, x.type)).catch(() => {}); } };
    await Promise.all(Array.from({ length: Math.min(4, list.length) }, one));
    return list.length;
  }
  W.addEventListener('message', e => {
    const d = e.data || {}, port = e.ports && e.ports[0];
    const reply = p => e.waitUntil(p.then(v => port && port.postMessage(v), err => port && port.postMessage({ error: String((err && err.message) || err) })));
    if (d.type === 'skip') W.skipWaiting();
    else if (d.type === 'status') reply(open().then(have).then(h => Object.assign({ ver: SITE.ver }, summary(SITE.files, scope, h))));
    else if (d.type === 'missing') reply(open().then(have).then(h => ({ ver: SITE.ver, list: notCached(SITE.files, scope, h) })));
    else if (d.type === 'adopt') reply(adopt(d.urls).then(n => ({ adopted: n })));
  });
})();
