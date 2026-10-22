#!/usr/bin/env node
/* PassBook — what a phone gets from the hosted copy, walked in a real Chrome (tools/perf; owner WP16; audit P1-58, P1-59, P2-49, owner decision D13).

     node --experimental-websocket tools/perf/hosted.js walk [site]       install, offline, update and install checks (about a minute)
     node --experimental-websocket tools/perf/hosted.js selftest [site]   the in-app ?selftest=1 (and its touch pass) served over http
     node --experimental-websocket tools/perf/hosted.js budget [site]     the measured budgets: HTTP/2 + TLS, CPU 4x, phone networks

   [site] defaults to _site (build.py --site). Each run serves a scratch copy of the site from 127.0.0.1 only (server.js), drives Chrome with a
   throw-away profile and private TMPDIR, and deletes all of it at the end. Exit 1 when a check fails.

   walk: a first visit installs the worker, which precaches the shell and adopts what the visit loaded; the copy is installable (Chrome's own
   checks); a repeat visit is answered by the worker; offline, Home and an opened lesson still open while an unopened lesson and a mock say
   honestly that they need a connection; a second version of the copy installs in the background and waits, the Me header offers
   'Update ready · Restart' (only text while a test is in progress, and restart() refuses then), a file of the newer build is shown to the old page,
   and Restart brings the new version in and deletes the old files. No console error outside the offline phase. */
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, spawnSync } = require('child_process');
const { serve } = require('./server');
const { launch, sleep, CH } = require('./cdp');

const ROOT = path.join(__dirname, '..', '..');
const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Mobile Safari/537.36';
let fails = 0, passes = 0;
const ok = (name, cond, detail) => { if (cond) passes++; else fails++; console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${!cond && detail != null ? ' :: ' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) : ''}`); };

function siteInfo(dir) {
  const src = fs.readFileSync(path.join(dir, 'sw.js'), 'utf8'), m = /\/\*SITE\*\/const SITE = (.*?);\/\*SITE\*\//s.exec(src);
  if (!m) throw new Error(dir + '/sw.js is not a built worker (run build.py --site)');
  return JSON.parse(m[1]);
}
function scratchCopy(site) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ga-hosted-')), copy = path.join(base, 'site');
  fs.cpSync(site, copy, { recursive: true });
  return { base, copy, done: () => fs.rmSync(base, { recursive: true, force: true }) };
}
/** reseal a site folder in place (tools/hosted.py seal), after a walk changed a file in it */
function reseal(dir) {
  const r = spawnSync('python3', ['-I', '-c', 'import sys; from pathlib import Path; sys.path.insert(0, sys.argv[1]); import hosted; print(len(hosted.seal(Path(sys.argv[2]))))',
    path.join(ROOT, 'tools'), dir], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('reseal failed: ' + r.stderr);
  return +r.stdout.trim();
}

/** one tab with phone emulation; errors collected by phase */
async function tab(c, o = {}) {
  const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId: s } = await c.send('Target.attachToTarget', { targetId, flatten: true });
  const steps = [['Page.enable'], ['Runtime.enable'], ['Network.enable'], ['Log.enable']];
  if (o.phone !== false) steps.push(['Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }],
    ['Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }], ['Emulation.setUserAgentOverride', { userAgent: UA, platform: 'Linux armv8l' }]);
  for (const [m, p] of steps) await c.send(m, p || {}, s);
  const T = { s, targetId, phase: 'online', errors: [] };
  c.on(m => {
    if (m.sessionId !== s) return;
    const p = m.params || {};
    let text = null;
    if (m.method === 'Runtime.exceptionThrown') text = 'exception: ' + ((p.exceptionDetails.exception && p.exceptionDetails.exception.description) || p.exceptionDetails.text);
    else if (m.method === 'Runtime.consoleAPICalled' && p.type === 'error') text = 'console.error: ' + p.args.map(a => a.value || a.description || '').join(' ');
    else if (m.method === 'Log.entryAdded' && p.entry.level === 'error') text = 'log: ' + p.entry.text + (p.entry.url ? ' ' + p.entry.url : '');
    if (text) T.errors.push([T.phase, text.slice(0, 300)]);
  });
  T.ev = async (expr, timeout = 30000) => {
    const r = await c.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, timeout }, s);
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text);
    return r.result.value;
  };
  /** poll a page expression until it is truthy (navigation-safe); → its value, or false after ms */
  T.until = async (expr, ms = 20000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) { try { const v = await T.ev(expr, 5000); if (v) return v; } catch (e) { /* the page is navigating */ } await sleep(150); }
    return false;
  };
  T.go = url => c.send('Page.navigate', { url }, s);
  T.hash = h => T.ev(`location.hash = ${JSON.stringify(h)}, 1`);
  T.offline = on => c.send('Network.emulateNetworkConditions', { offline: !!on, latency: 0, downloadThroughput: -1, uploadThroughput: -1 }, s);
  return T;
}

const HOME = `document.querySelector('.hm-hero') && !document.querySelector('.boot')`;
const LESSON = id => `document.querySelector('[data-view="lesson"] #lesson-body .lsec') && GA.router.current && GA.router.current.path === ${JSON.stringify('/l/' + id)}`;
const FAILED = `(document.querySelector('#view .load-failed') || {}).innerText || ''`;

async function walk(site) {
  const info = siteInfo(site), sc = scratchCopy(site);
  const srv = await serve(sc.copy, { port: 0 }), base = srv.url;
  const c = await launch({ scratch: sc.base });
  try {
    const T = await tab(c);
    // 1. a first visit: the app, the hosted client, the manifest link; the worker installs, precaches the shell and takes over
    await T.go(base + 'index.html#/');
    ok('first visit: Home renders over http', await T.until(HOME, 30000));
    ok('first visit: GA.pwa exists on the site build (hosted)', await T.ev('!!(window.GA && GA.pwa && GA.pwa.hosted === true)'));
    ok('first visit: the first screen\'s view file was preloaded and fetched once (the preload is used)', await T.ev(`performance.getEntriesByType('resource').filter(e => /\\/views\\/home\\.js\\?v=/.test(e.name)).length === 1 && !!document.querySelector('link[rel="preload"][href*="views/home.js?v="]')`));
    ok('first visit: the manifest and the home-screen icon are linked by script', await T.ev(`!!document.querySelector('link[rel="manifest"][href^="manifest.webmanifest?v="]') && !!document.querySelector('link[rel="apple-touch-icon"]')`));
    const ctl = await T.until(`navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === 'activated'`, 60000);
    ok('first visit: the service worker installs and takes over the page', !!ctl);
    const n = await T.until(`caches.open('pb-files').then(c => c.keys()).then(k => k.length >= ${info.precache.length} ? k.length : 0)`, 30000);
    ok(`install: the app shell is precached (${info.precache.length} files)`, n >= info.precache.length, n);
    const adopted = await T.until(`(async () => { const c = await caches.open('pb-files'), keys = new Set((await c.keys()).map(r => r.url));
      const want = performance.getEntriesByType('resource').map(e => e.name).filter(u => /\\/data\\/(pyq|lessons|sol)\\//.test(u));
      return want.length && want.every(u => keys.has(u)) ? want.length : 0; })()`, 20000);
    ok('install: the files the first visit loaded before the worker are adopted (Home works offline after one visit)', !!adopted, adopted);
    const inst = await c.send('Page.getInstallabilityErrors', {}, T.s).catch(e => ({ installabilityErrors: [{ errorId: e.message }] }));
    ok('installable: Chrome reports no installability errors', (inst.installabilityErrors || []).length === 0, inst.installabilityErrors);
    const man = await c.send('Page.getAppManifest', {}, T.s).catch(e => ({ errors: [{ message: e.message }] }));
    ok('installable: the web manifest parses without errors', man && man.url && /manifest\.webmanifest\?v=/.test(man.url) && !(man.errors || []).length, man && man.errors);
    const st = await T.ev('GA.pwa.status()');
    ok('status(): the offline copy counts the shell and knows the whole copy', st && st.cached.files >= info.precache.length && st.all && st.all.files === Object.keys(info.files).length && st.all.download > 0,
      st && { cached: st.cached, all: st.all, persisted: st.persisted });
    ok('status(): persisted is what the browser says (true, false or null)', st && [true, false, null].includes(st.persisted), st && st.persisted);

    // 2. a repeat visit is answered by the worker; a lesson and a question load online and stay
    await T.go(base + 'index.html?theme=dark#/');
    ok('repeat visit: Home renders, the page answered by the worker', await T.until(HOME, 20000) && await T.ev(`performance.getEntriesByType('navigation')[0].workerStart > 0 && !!navigator.serviceWorker.controller`));
    const lessons = await T.ev('GA.data.D.lessons.filter(l => l.subject === "os").map(l => l.id)');
    const [L1, L2, L3] = [lessons[0], lessons[5], lessons[9]];
    await T.hash('#/l/' + L1);
    ok('online: a lesson opens (and is kept)', await T.until(LESSON(L1), 20000));
    const qid = await T.ev('GA.data.D.questions.find(q => q.paper === "cs-2019" && q.hasSol).id');
    await T.hash('#/q/' + encodeURIComponent(qid));
    ok('online: a question opens', await T.until(`document.querySelector('[data-view="question"] .qc')`, 20000));
    const onlineErrors = T.errors.filter(e => e[0] === 'online');
    ok('online: no console errors', onlineErrors.length === 0, onlineErrors.slice(0, 4));

    // 3. offline (the network off and the host down): what was opened still opens; what was not says so honestly
    T.phase = 'offline'; await T.offline(true); srv.down(true);
    await T.go(base + 'index.html#/');
    ok('offline: Home starts from the saved copy', await T.until(HOME, 20000));
    await T.hash('#/l/' + L1);
    ok('offline: the lesson opened online opens again', await T.until(LESSON(L1), 15000));
    await T.hash('#/l/' + L2);
    const f2 = await T.until(FAILED, 15000);
    ok('offline: an unopened lesson shows the load-failure card that says offline (P1-59)', /did not load/i.test(f2) && /offline/i.test(f2) && !/build\.py/.test(f2), f2);
    await T.hash('#/labs');
    ok('offline: the labs gallery (a precached view) opens', await T.until(`document.querySelector('[data-view="labs"]') && document.querySelectorAll('[data-view="labs"] a[href^="#/lab/"]').length > 3`, 15000));
    await T.hash('#/test?new=mock');
    // WP10's rule (P1-59, P2-76): the papers load first; when they do not arrive nothing is started or saved, and a toast says why
    const mock = await T.until(`[...document.querySelectorAll('.toasts .toast')].map(t => t.textContent).find(t => /did not load/i.test(t) && /offline/i.test(t))`, 30000);
    ok('offline: a new mock says its questions did not load because the phone is offline, and starts nothing (P2-76)', !!mock && !(await T.ev('!!GA.store.state.live')), mock || await T.ev(`location.hash + ' | ' + [...document.querySelectorAll('.toast')].map(t => t.textContent).join(' / ')`).catch(e => e.message));
    T.phase = 'online'; await T.offline(false); srv.down(false);

    // 4. a second version: a lesson's text and a view change, the copy is resealed; the update installs in the background and waits
    const lessonFile = Object.keys(info.files).find(p => p.endsWith('/' + L3 + '.js')), viewFile = 'app/js/views/map.js';
    fs.appendFileSync(path.join(sc.copy, lessonFile), '/* second version (tools/perf/hosted.js walk) */\n');
    fs.appendFileSync(path.join(sc.copy, viewFile), '\n/* second version (tools/perf/hosted.js walk) */\n');
    reseal(sc.copy);
    const info2 = siteInfo(sc.copy);
    await T.go(base + 'index.html#/');
    await T.until(HOME, 20000);
    await T.ev(`(window.__ga_stale = [], GA.pwa.on('stale', p => window.__ga_stale.push(p)), GA.pwa.check(), 1)`);
    ok('update: the new version installs in the background and waits', await T.until('GA.pwa.update === true', 60000));
    ok('update: the old version keeps the page meanwhile', await T.ev(`GAD.manifest.main.ver`) === info.data);
    await T.ev('GA.shell.menu(true), 1'); await sleep(300);
    const line = await T.ev(`(document.querySelector('#me-status [data-me-act="restart"]') || {}).textContent || ''`);
    ok('update: the Me header offers "Update ready · Restart"', /Update ready\s*·\s*Restart/.test(line), line);
    await T.ev('GA.shell.menu(false), 1'); await sleep(300);
    await T.hash('#/l/' + L3);
    ok('update: a lesson changed in the newer build is shown to the old page, which hears "stale"', await T.until(LESSON(L3), 15000) && await T.until(`window.__ga_stale.length > 0`, 5000));
    const guarded = await T.ev(`(() => { GA.store.state.live = { id: 'walk' }; const line = GA.pwa.line(); return GA.pwa.restart().then(() => 'restarted', e => ({ refused: e.message, line })).finally(() => { GA.store.state.live = null; }); })()`);
    ok('update: never during a test: restart() refuses and the line only says when it applies', guarded && guarded.refused && /test/i.test(guarded.refused) && guarded.line && !guarded.line.action, guarded);
    await T.ev('GA.pwa.restart(), 1').catch(() => 0);
    const after = await T.until(`document.querySelector('#view .vh') && GAD.manifest.main.ver === ${JSON.stringify(info2.data)} && GA.pwa.update === false && !!navigator.serviceWorker.controller`, 30000);
    ok('update: Restart brings the new version in', !!after, after || await T.ev(`({ ver: GAD.manifest.main.ver, want: ${JSON.stringify(info2.data)}, was: ${JSON.stringify(info.data)}, update: GA.pwa.update, ctl: !!navigator.serviceWorker.controller, home: !!document.querySelector('.hm-hero'), hash: location.hash })`).catch(e => e.message));
    const keys = await T.ev(`caches.open('pb-files').then(c => c.keys()).then(ks => ks.map(r => r.url))`);
    const oldMap = base + viewFile + '?v=' + info.files[viewFile][0], newMap = base + viewFile + '?v=' + info2.files[viewFile][0];
    ok('update: the old version\'s files are deleted, the new shell is cached', !keys.includes(oldMap) && keys.includes(newMap), { old: keys.includes(oldMap), new: keys.includes(newMap) });
    // 5. the Tests hub's idle prefetch (WP10, P2-76) on a fast connection: the paper files pass through the worker, which keeps them
    const keyedPapers = await T.ev('GA.data.D.papers.filter(p => p.keyed > 0).map(p => "data/pyq/" + p.id + ".js")');
    if (await T.ev(`!!(navigator.connection && navigator.connection.effectiveType === '4g' && !navigator.connection.saveData)`)) {
      await T.hash('#/test');
      const pre = await T.until(`caches.open('pb-files').then(c => c.keys()).then(ks => { const have = ks.map(r => r.url.replace(location.origin + '/', '').split('?')[0]);
        const want = ${JSON.stringify(keyedPapers)}; return want.every(p => have.includes(p)) ? want.length : 0; })`, 40000);
      ok('prefetch (P2-76): an idle Tests hub on a fast connection leaves every keyed paper in the offline copy', !!pre, pre);
    } else console.log('INFO prefetch: this Chrome reports no fast connection, so the Tests hub does not prefetch (as it should)');
    // 6. 'Save everything for offline' (Settings, P1-58): every file of this version, then the line says so; the install row follows the browser
    const saved = await T.ev(`GA.pwa.saveAll().then(r => GA.pwa.status().then(st => ({ r, cached: st.cached.files, all: st.all.files })), e => ({ error: e.message }))`, 300000);
    ok('saveAll(): every file of this version is kept for offline', saved && !saved.error && saved.cached === saved.all && saved.r.files === saved.all, saved);
    await T.hash('#/settings');
    ok('saveAll(): Settings then says everything is saved for offline', await T.until(`/Everything is saved for offline/.test((document.querySelector('#st-pwa') || {}).innerText || '')`, 15000));
    if (await T.ev('GA.pwa.installable')) {
      await T.ev('GA.shell.menu(true), 1'); await sleep(300);
      ok('install: the Me menu shows Install app while the browser offers it', await T.ev(`!document.querySelector('#me-install').hidden && document.querySelector('#me-install').getClientRects().length > 0`));
      await T.ev('GA.shell.menu(false), 1');
    } else console.log('INFO install: this Chrome did not offer its install prompt, so the Install app row stays hidden (as it should)');
    const late = T.errors.filter(e => e[0] === 'online');
    ok('no console errors outside the offline phase', late.length === 0, late.slice(0, 5));
    const off = T.errors.filter(e => e[0] === 'offline');
    console.log(`INFO offline phase: ${off.length} console error(s), the expected failed loads (first: ${off.length ? off[0][1].slice(0, 120) : 'none'})`);
  } finally {
    await c.close(); await srv.close(); sc.done();
  }
}

/** a child process's stdout and stderr, without blocking this process's event loop (it serves the pages) */
function run(cmd, args, o) {
  return new Promise(res => {
    const p = spawn(cmd, args, { env: o.env, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    p.stdout.on('data', d => { out += d; }); p.stderr.on('data', d => { err += d; });
    const t = setTimeout(() => { try { p.kill('SIGKILL'); } catch (e) { /* gone */ } }, o.timeout || 300000);
    p.on('close', code => { clearTimeout(t); res({ status: code, stdout: out, stderr: err }); });
  });
}
/** the in-app self-test (app/js/selftest.js) against the site over http, like tools/smoke.py does on file:// */
async function selftest(site) {
  const sc = scratchCopy(site), srv = await serve(sc.copy, { port: 0 });
  const runs = [['main', 'profile=selftest&selftest=1', []],
    ['touch', 'profile=selftest-touch&selftest=1&touch=1', ['--blink-settings=primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1']]];
  try {
    for (const [name, q, extra] of runs) {
      const prof = fs.mkdtempSync(path.join(sc.base, 'chrome-')), tmp = fs.mkdtempSync(path.join(sc.base, 'tmp-'));
      // spawn, not spawnSync: the server answering this Chrome runs in this very process
      const r = await run(CH, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${prof}`, '--virtual-time-budget=150000', '--dump-dom', ...extra,
        `${srv.url}index.html?${q}`], { timeout: 400000, env: Object.assign({}, process.env, { TMPDIR: tmp }) });
      const m = /<pre id="selftest">([\s\S]*?)<\/pre>/.exec(r.stdout || '');
      if (!m) { ok(`selftest ${name}: finished`, false, (r.stdout || r.stderr || '').slice(-300)); continue; }
      const text = m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'), lines = text.split('\n');
      const f = lines.filter(l => l.startsWith('FAIL')), p = lines.filter(l => l.startsWith('PASS')).length;
      f.forEach(l => console.log(`  [${name}] ${l}`));
      ok(`selftest ${name} over http: ${p} passed, ${f.length} failed`, f.length === 0 && p > 0);
    }
  } finally { await srv.close(); sc.done(); }
}

async function main() {
  const [cmd = 'walk', siteArg] = process.argv.slice(2);
  const site = path.resolve(siteArg || path.join(ROOT, '_site'));
  if (!fs.existsSync(path.join(site, 'sw.js'))) { console.error(`${site} is not a site build: run .venv/bin/python build.py --site first`); process.exit(2); }
  if (cmd === 'walk') await walk(site);
  else if (cmd === 'selftest') await selftest(site);
  else if (cmd === 'budget') await require('./measure').budget(site, { ok });
  else { console.error('usage: hosted.js walk|selftest|budget [site]'); process.exit(2); }
  console.log(`\n${passes} passed, ${fails} failed`);
  process.exit(fails ? 1 : 0);
}
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
module.exports = { tab, scratchCopy, siteInfo, reseal };
