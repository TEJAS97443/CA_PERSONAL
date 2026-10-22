/* The hosted copy (audit P1-58, P2-49, P2-76; owner decision D13; WP16): the service worker's pure helpers (sw.js), GA.pwa's (app/js/core/pwa.js),
   the shell's wave-2 routes and rows, and the rules that keep the source inert on file:// (no version, no manifest link, no worker). The browser side
   (install, offline, update, installability) is walked against a real site build by tools/perf/hosted.js. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js'); require('../app/js/core/icons.js');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const SW = require('../sw.js');
const PWA = require('../app/js/core/pwa.js');
const T = require('../app/js/shell.js');
const scope = 'https://example.org/gate/';

test('sw: the source worker is unbuilt (SITE.ver null) and holds exactly one SITE block for build.py --site to fill', () => {
  assert.equal(SW.SITE.ver, null);
  assert.deepEqual(SW.SITE.files, {});
  assert.equal((read('sw.js').match(/\/\*SITE\*\/[\s\S]*?\/\*SITE\*\//g) || []).length, 1);
  assert.equal(SW.CACHE, 'pb-files');
});

test('sw: a request URL gives its site path and the content hash it asks for', () => {
  assert.equal(SW.pathOf(scope + 'data/lessons/os/os.mem.paging.js?v=1a2b3c4d', scope), 'data/lessons/os/os.mem.paging.js');
  assert.equal(SW.pathOf(scope, scope), '', 'the scope itself (a navigation to the folder)');
  assert.equal(SW.pathOf(scope + 'index.html?profile=demo#/l/os.mem.paging', scope), 'index.html');
  assert.equal(SW.pathOf('https://example.org/other/x.js', scope), null, 'outside the app folder');
  assert.equal(SW.pathOf('https://cdn.example.com/gate/x.js', scope), null, 'another origin');
  assert.equal(SW.pathOf(scope + 'a%20b.js', scope), 'a b.js');
  assert.equal(SW.verOf('x.js?v=1a2b3c4d'), '1a2b3c4d');
  assert.equal(SW.verOf('x.js?a=1&v=deadbeef#top'), 'deadbeef');
  assert.equal(SW.verOf('x.js?v=7fb7d4b8x'), null, 'not a sha8');
  assert.equal(SW.verOf('x.js?v=DEADBEEF'), null, 'the build writes lower-case hex');
  assert.equal(SW.verOf('x.js'), null);
  assert.equal(SW.keyOf(scope, 'data/x.js', 'deadbeef'), scope + 'data/x.js?v=deadbeef');
});

test('sw: content from a newer build is shown, code from another build is refused', () => {
  assert.equal(SW.verdict('data/lessons/os/os.x.js', 'aaaa0000', 'aaaa0000'), 'ok');
  assert.equal(SW.verdict('data/lessons/os/os.x.js', 'aaaa0000', 'bbbb1111'), 'newer');
  assert.equal(SW.verdict('data/figs/cs-2007/cs-2007-Q26-f1.webp', 'aaaa0000', 'bbbb1111'), 'newer');
  for (const p of ['data/manifest.js', 'data/boot.js', 'app/js/labs/cpu-sched.js', 'app/js/views/home.js', 'vendor/katex/katex.min.js', 'index.html'])
    assert.equal(SW.verdict(p, 'aaaa0000', 'bbbb1111'), 'refuse', p);
});

test('sw: install fetches only the shell files not cached yet; activate deletes what is not this version; the summary and the missing list', () => {
  const files = { 'index.html': ['11111111', 10, 5], 'app/a.js': ['22222222', 100, 40], 'data/l.js': ['33333333', 50, 20] };
  const have = new Set([SW.keyOf(scope, 'app/a.js', '22222222'), SW.keyOf(scope, 'app/a.js', '99999999')]);
  assert.deepEqual(SW.missing(['index.html', 'app/a.js', 'not/in/table.js'], files, scope, have), ['index.html']);
  assert.deepEqual(SW.strays([...have, SW.keyOf(scope, 'data/l.js', '33333333')], files, scope), [SW.keyOf(scope, 'app/a.js', '99999999')]);
  assert.deepEqual(SW.summary(files, scope, have), { files: 3, cached: 1, cachedRaw: 100, allRaw: 160, missingGz: 25 });
  assert.deepEqual(SW.notCached(files, scope, have), [['index.html', '11111111'], ['data/l.js', '33333333']]);
});

test('pwa: GA.pwa exists only for a site build over http(s) with service workers (never in Node, never on file://)', () => {
  assert.equal(PWA.eligible({ site: true, protocol: 'https:', sw: true }), true);
  assert.equal(PWA.eligible({ site: true, protocol: 'http:', sw: true }), true, 'localhost testing');
  assert.equal(PWA.eligible({ site: true, protocol: 'file:', sw: true }), false);
  assert.equal(PWA.eligible({ site: false, protocol: 'https:', sw: true }), false, 'the source tree served as it is');
  assert.equal(PWA.eligible({ site: true, protocol: 'https:', sw: false }), false);
  assert.equal(globalThis.GA.pwa, undefined);
});

test('pwa: the Me header line for a waiting update never offers Restart while a test is in progress', () => {
  assert.equal(PWA.updateLine(false, false), null);
  assert.deepEqual(PWA.updateLine(true, false), { kind: 'update', text: 'Update ready · Restart', lead: 'Update ready', act: 'Restart', action: 'restart' });
  const live = PWA.updateLine(true, true);
  assert.equal(live.kind, 'update'); assert.ok(!live.action && !live.act && !live.href, 'plain text, no action');
  assert.ok(/after your test/.test(live.text));
  assert.equal(PWA.liveIn('{"live":{"id":"t1","at":5}}'), true);
  assert.equal(PWA.liveIn('{"live":null}'), false);
  assert.equal(PWA.liveIn('not json'), false);
  assert.equal(PWA.liveIn(null), false);
});

test('pwa: status() sizes: the device\'s own bytes, every file of this version, and the download still to do', () => {
  assert.deepEqual(PWA.sizes(null, 5e6), { cached: { bytes: 5e6, files: 0 }, all: null }, 'no worker yet');
  assert.deepEqual(PWA.sizes({ error: 'x' }, 0), { cached: { bytes: 0, files: 0 }, all: null });
  const sum = { files: 700, cached: 85, cachedRaw: 4e6, allRaw: 22e6, missingGz: 7e6 };
  assert.deepEqual(PWA.sizes(sum, 10e6), { cached: { bytes: 10e6, files: 85 }, all: { files: 700, download: 7e6, bytes: 10e6 + 18e6 * 2.5 } });
  assert.equal(PWA.sizes(sum, 0).cached.bytes, 4e6, 'without an estimate: the raw bytes cached');
  assert.equal(PWA.sizes(sum, 0).all.bytes, 22e6);
  assert.equal(PWA.sizes(sum, 400e6).all.bytes, 400e6 + 18e6 * 4, 'the device ratio is capped at 4');
});

test('shell (wave 2): /rev and /rev/:subject open views/revise.js under Learn, with a Formula sheets row in the Me menu', () => {
  const routeOf = h => T.ROUTES.find(([pat]) => new RegExp('^' + pat.replace(/\/:[a-z]+/gi, '/[^/]+') + '/?$').test(h));
  assert.equal(routeOf('/rev')[1], 'revise'); assert.equal(routeOf('/rev/os')[1], 'revise');
  assert.equal(T.FILE.revise, 'revise');
  assert.ok(fs.existsSync(path.join(ROOT, 'app/js/views/revise.js')));
  assert.equal(globalThis.GA.shell.has('/rev/os'), true); assert.equal(globalThis.GA.shell.has('#/rev'), true);
  assert.equal(T.tabOf('/rev/os'), '/syllabus', 'a revision sheet lights Learn, like its crumbs');
  assert.equal(T.barTabOf('/rev'), '/syllabus');
  assert.ok(!T.ME.some(([h]) => h === '/rev'), 'not a Me page: the row is a shortcut, like the More group');
  assert.deepEqual(T.STUDY, [['/rev', 'sigma', 'Formula sheets']]);
  assert.ok(globalThis.GA.icons.sigma);
  const src = read('app/js/shell.js');
  assert.ok(/STUDY\.filter\(r => Shell\.has\(r\[0\]\)\)/.test(src), 'the row shows while its route exists');
  assert.ok(/updateLine\(\)\]\)\.filter\(Boolean\)/.test(src), 'the update line is one of the Me header lines');
  assert.ok(/id="me-install" hidden/.test(src) && /inst\.hidden = !\(GA\.pwa && GA\.pwa\.installable\)/.test(src), 'Install app only when the browser offers it');
});

test('index.html (P1-58): the hosted-copy client loads before the shell; the source carries no version, manifest link or site marker', () => {
  const html = read('index.html'), live = html.replace(/<!--[\s\S]*?-->/g, '');
  assert.ok(html.indexOf('src="app/js/core/pwa.js"') > 0 && html.indexOf('src="app/js/core/pwa.js"') < html.indexOf('src="app/js/shell.js"'));
  assert.ok(!/<link\b[^>]*rel="manifest"/.test(live), 'a static manifest link logs CORS errors on file://');
  assert.ok(!/<html\b[^>]*data-site/.test(live), 'only a site build marks the page');
  assert.ok(!/(?:src|href)="[^"]*\?v=/.test(live), 'versions are written into the site build only');
  assert.ok(/GA\.util\.verUrl\('app\/js\/selftest\.js'\)/.test(html), 'the self-test loads versioned on a hosted copy');
  const css = read('app/css/pwa.css');
  assert.ok(/\.me-menu \.mi\[hidden\]\s*\{\s*display:\s*none;?\s*\}/.test(css), '.mi is display:flex, so the hidden install row needs its own rule');
  assert.ok(html.indexOf('app/css/pwa.css') > html.indexOf('app/css/revise.css'), 'pwa.css is linked last');
});

test('hosted copy builder (tools/hosted.py): its Python tests pass (tests/py/test_hosted.py)', () => {
  const cp = require('child_process');
  const PY = (() => { for (const p of ['python3', 'python']) { try { cp.execFileSync(p, ['-c', '0'], { stdio: 'ignore' }); return p; } catch (e) { /* next */ } } return null; })();
  if (!PY) { console.log('       (skipped: no python3 on PATH)'); return; }
  const r = cp.spawnSync(PY, ['-I', '-m', 'unittest', 'discover', '-s', 'tests/py', '-p', 'test_hosted.py'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000 });
  assert.equal(r.status, 0, (r.stderr || r.stdout || '').slice(-1500));
});
