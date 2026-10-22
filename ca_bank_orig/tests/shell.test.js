/* The shell's route table, navigation and shortcuts must agree with each other and with the view files on disk. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js'); require('../app/js/core/icons.js');
const fs = require('fs'), path = require('path');
const T = require('../app/js/shell.js');
const VIEWS = path.join(__dirname, '..', 'app', 'js', 'views');

const routeOf = href => T.ROUTES.find(([pat]) => new RegExp('^' + pat.replace(/\/:[a-z]+/gi, '/[^/]+') + '/?$').test(href));

test('shell: every routed view has a file, and every file it names exists', () => {
  for (const [pat, view] of T.ROUTES) {
    assert.ok(T.FILE[view], `route ${pat} -> view "${view}" has no FILE entry`);
    assert.ok(fs.existsSync(path.join(VIEWS, T.FILE[view] + '.js')), `app/js/views/${T.FILE[view]}.js missing (view ${view})`);
  }
  for (const deps of Object.values(T.DEPS)) for (const d of deps) assert.ok(fs.existsSync(path.join(VIEWS, d + '.js')), d);
});

test('shell: route patterns are unique; / is home, /map the content map, /progress the old dashboard', () => {
  const pats = T.ROUTES.map(r => r[0]);
  assert.equal(new Set(pats).size, pats.length);
  assert.equal(routeOf('/')[1], 'home');
  assert.equal(routeOf('/map')[1], 'map');
  assert.equal(routeOf('/progress')[1], 'progress');
  assert.ok(!T.ROUTES.some(r => r[1] === 'dashboard'), 'no view is still called "dashboard"');
});

test('shell: top nav, Me menu and phone tab bar follow the v3 spec and every link routes somewhere', () => {
  assert.deepEqual(T.NAV.map(x => x[2]), ['Home', 'Learn', 'Questions', 'Tests', 'Labs', 'Map']);
  assert.deepEqual(T.NAV.map(x => x[0]), ['/', '/syllabus', '/pyq', '/test', '/labs', '/map']);
  // the planner first (P2-40), Sources & method in the menu (P2-48); badges: cards due, today's retry batch, the plan's 'N left' (P3-29)
  assert.deepEqual(T.ME.map(x => x[2]), ['Planner', 'Flashcards', 'Error notebook', 'My progress', 'PassBook Wrapped', 'Settings', 'Sources & method']);
  assert.equal(T.ME.find(x => x[0] === '/flash')[3], 'cards', 'flashcards carry the due count');
  assert.equal(T.ME.find(x => x[0] === '/plan')[3], 'plan'); assert.equal(T.ME.find(x => x[0] === '/notebook')[3], 'nb');
  assert.deepEqual(T.MORE.map(x => x[2]), ['Tests', 'Map'], 'the phone sheet\'s More group uses the tab labels (P2-12)');
  assert.deepEqual(T.TABBAR.map(x => x[2]), ['Home', 'Learn', 'Questions', 'Labs', 'Me']);
  for (const [href, ic, label] of [...T.NAV, ...T.ME, ...T.TABBAR.filter(x => x[0] !== 'me')]) {
    assert.ok(routeOf(href), `nav link ${label} -> ${href} has no route`);
    assert.ok(globalThis.GA.icons[ic], `nav icon "${ic}" is not in the sprite`);
  }
  assert.ok(globalThis.GA.icons.user, 'Me tab icon');
  const navHrefs = new Set(T.NAV.map(x => x[0]));
  for (const [href] of T.ME) assert.ok(!navHrefs.has(href), `${href} is in both the nav and the Me menu`);
});

test('shell: /wrapped is routed to views/wrapped.js', () => {
  assert.equal(routeOf('/wrapped')[1], 'wrapped');
  assert.equal(T.FILE.wrapped, 'wrapped');
});

test('shell: active-link matching', () => {
  const on = T.isActive;
  assert.equal(on('/', '/'), true);
  assert.equal(on('/map', '/'), false);
  assert.equal(on('/progress', '/'), false);
  assert.equal(on('/test/run/abc', '/test'), true);
  assert.equal(on('/testx', '/test'), false);
  assert.equal(on('/q/cs-2019:CS37', '/pyq'), true);
  assert.equal(on('/lab/sort', '/labs'), true);
  assert.equal(on('/about', '/settings'), false, 'Sources & method is its own Me item (P2-48)');
  assert.equal(on('/about', '/about'), true);
  assert.equal(on('/flash/os', '/flash'), true);
  assert.equal(on('/s/os', '/syllabus'), true, 'a subject page lights Learn');
  assert.equal(on('/l/os.mem.paging', '/syllabus'), true, 'a lesson lights Learn');
  assert.equal(on('/labs', '/l'), false);
});

test('shell: every route belongs to exactly one nav tab or the Me menu (or is a deep page of one)', () => {
  const tab = T.tabOf;
  assert.equal(tab('/'), '/'); assert.equal(tab('/l/x.y.z'), '/syllabus'); assert.equal(tab('/s/os'), '/syllabus'); assert.equal(tab('/syllabus'), '/syllabus');
  assert.equal(tab('/q/a:b'), '/pyq'); assert.equal(tab('/test/result/1'), '/test'); assert.equal(tab('/lab/sort'), '/labs'); assert.equal(tab('/map'), '/map');
  for (const p of ['/flash', '/notebook', '/plan', '/progress', '/wrapped', '/settings', '/about']) assert.equal(tab(p), null, p + ' lives in the Me menu');
  const me = p => T.ME.some(([href]) => T.isActive(p, href));
  for (const [pat] of T.ROUTES) {
    const sample = pat.replace(/:[a-z]+/gi, 'x');
    assert.ok(tab(sample) || me(sample), `route ${pat} is reachable from neither the nav nor the Me menu`);
    assert.ok(!(tab(sample) && me(sample)), `route ${pat} lights both the nav and the Me menu`);
  }
});

test('shell: go-to shortcuts are unique, documented and point at routes', () => {
  const combos = T.GO_KEYS.map(k => k[0]);
  assert.equal(new Set(combos).size, combos.length);
  for (const [combo, p, desc] of T.GO_KEYS) { assert.ok(/^g \S$/.test(combo), combo); assert.ok(routeOf(p), p); assert.ok(desc && desc.length > 5); }
  const by = Object.fromEntries(T.GO_KEYS.map(k => [k[0], k[1]]));
  assert.equal(by['g h'], '/'); assert.equal(by['g m'], '/map'); assert.equal(by['g p'], '/pyq'); assert.equal(by['g g'], '/progress'); assert.equal(by['g w'], '/wrapped');
});

test('shell: index.html loads site.css after the base sheets and reveal.js before the shell', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const at = s => html.indexOf(s);
  assert.ok(at('app/css/site.css') > at('app/css/labs.css') && at('app/css/labs.css') > 0);
  assert.ok(at('app/js/core/reveal.js') > 0 && at('app/js/core/reveal.js') < at('app/js/shell.js'));
  assert.ok(!/views\/dashboard\.js/.test(html));
});

test('shell (P2-79): a lesson route starts the serif faces through document.fonts, exactly as fonts.css declares them, never with a script-made preload', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'vendor', 'fonts', 'fonts.css'), 'utf8');
  const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(m => ({ family: (/font-family:\s*"([^"]+)"/.exec(m[1]) || [])[1], style: (/font-style:\s*(\w+)/.exec(m[1]) || [])[1], src: (/url\(([^)]+)\)/.exec(m[1]) || [])[1] }));
  assert.equal(T.SERIF.length, 2);
  for (const f of T.SERIF) {
    const m = /^(italic )?\d+ 1em "([^"]+)"$/.exec(f);
    assert.ok(m, `${f} is a font shorthand document.fonts.load() reads`);
    const face = faces.find(x => x.family === m[2] && x.style === (m[1] ? 'italic' : 'normal'));
    assert.ok(face && /^source-serif(-italic)?\.woff2$/.test(face.src), `${f} matches an @font-face in fonts.css (found ${JSON.stringify(faces.map(x => x.family + ' ' + x.style))})`);
  }
  const base = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'base.css'), 'utf8');
  assert.ok(new RegExp('--font-read:\\s*"' + /"([^"]+)"/.exec(T.SERIF[0])[1] + '"').test(base), 'the lesson text (--font-read) uses the family that is loaded early');
  const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', 'shell.js'), 'utf8');
  assert.ok(!/\.as\s*=\s*'font'|rel\s*=\s*'preload'/.test(src), 'no script-made font preload: with the sheets in <body> Chrome does not match it and fetches each face twice');
  assert.ok(/fonts\.load\(/.test(src), 'the faces load through document.fonts');
  // the @font-face rules exist when a route first runs: fonts.css comes before the shell, whose script waits for the sheets above it
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(html.indexOf('vendor/fonts/fonts.css') > 0 && html.indexOf('vendor/fonts/fonts.css') < html.indexOf('app/js/shell.js'));
});

test('shell: an in-page anchor inside a hash route is split off for the router ("#/about#mastery" -> "#/about" + "mastery")', () => {
  const m = h => { const r = T.ANCHOR.exec(h); return r ? [r[1], r[2]] : null; };
  assert.deepEqual(m('#/about#mastery'), ['#/about', 'mastery']);
  assert.deepEqual(m('#/s/os#t-sched'), ['#/s/os', 't-sched']);
  assert.equal(m('#/about'), null);
  assert.equal(m('#/pyq?paper=cs-2019'), null);
  assert.equal(m('#/q/cs-2019:CS37'), null);
});

test('shell: the sidebar is gone (no sidebar markup, no "[" collapse shortcut, no profile.sidebar use)', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', 'shell.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'shell.css'), 'utf8');
  assert.ok(!/class="sidebar|sb-link|toggleMini|profile\.sidebar/.test(src));
  assert.ok(!/ui\.key\('\['/.test(src));
  assert.ok(!/\.sidebar\b|\.sb-link\b/.test(css));
  assert.ok(/class="topbar"/.test(src) && /class="tabbar"/.test(src) && /id="me-menu"/.test(src), 'top nav, phone tab bar and Me menu are built');
  assert.ok(/id="tb-chips"/.test(src) && !/renderChips\(/.test(src), 'the top bar keeps an empty chips slot: no streak, XP or level chips (2026-10-18)');
});

test('shell: every view visit renders into a fresh host element (P0-02), and a view loaded after the learner moved on is not started', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', 'shell.js'), 'utf8');
  assert.ok(/function freshHost\([^)]*\)\s*\{[\s\S]{0,300}replaceChildren\(host\)/.test(src), 'freshHost puts a new child into #view with replaceChildren');
  const lazy = /const lazy = name => \(\{[\s\S]*?\n      \},/.exec(src);
  assert.ok(lazy, 'the lazy route handler is where it was');
  assert.ok(/const out = freshHost\(outlet, name\)/.test(lazy[0]), 'enter() passes the fresh host, not the outlet, to the view');
  assert.ok(/ctx\.stale\(\)\) return;[\s\S]*V\[name\]\.enter\(ctx, out\)/.test(lazy[0]), 'a stale navigation never enters the view');
  assert.ok(!/V\[name\]\.enter\(ctx, outlet\)/.test(src), 'no view gets the persistent outlet');
});

test('print (P1-17): the print block declares every light colour token with its light value, for the dark theme too', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'base.css'), 'utf8');
  const root = /:root\s*\{([\s\S]*?)\n\}/.exec(css)[1];
  const tokens = {}; root.replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi, (m, k, v) => { tokens[k] = v.trim(); return m; });
  const pm = /@media print\s*\{\s*:root,\s*\[data-theme="dark"\]\s*\{([\s\S]*?)\}/.exec(css);
  assert.ok(pm, 'base.css has @media print { :root, [data-theme="dark"] { … } }');
  const printed = {}; pm[1].replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi, (m, k, v) => { printed[k] = v.trim(); return m; });
  const colour = Object.keys(tokens).filter(k => /^#|^rgba?\(/i.test(tokens[k]) && !/^--(bg|bg-2|surface|line|line-2|shadow)/.test(k) || /^--(ink|ink-2|muted|faint|accent|pop|ok|warn|bad)$/.test(k));
  const missing = colour.filter(k => !(k in printed));
  assert.deepEqual(missing, [], 'tokens the print block leaves to the theme');
  const differ = colour.filter(k => printed[k] && printed[k].toLowerCase() !== tokens[k].toLowerCase());
  assert.deepEqual(differ, [], 'print values that are not the light values');
  assert.ok(/color-scheme:\s*light/.test(pm[1]));
});

/* ---------------------------------------------------------------- the overlay stack (P1-47) against a simulated browser history */
function fakeHistory() {
  const tasks = [];
  const H = { entries: [{ url: '#/a', state: { k: 'k0' } }], i: 0, pops: 0,
    get state() { return H.entries[H.i].state; }, get length() { return H.entries.length; },
    pushState(s) { H.entries.splice(H.i + 1); H.entries.push({ url: H.entries[H.i].url, state: JSON.parse(JSON.stringify(s)) }); H.i++; },
    replaceState(s) { H.entries[H.i] = { url: H.entries[H.i].url, state: JSON.parse(JSON.stringify(s)) }; },
    back() { tasks.push(() => { if (H.i > 0) { H.i--; H.pops++; O.onPop(); } }); },
    nav(url, replace) { if (replace) H.entries[H.i] = { url, state: null }; else { H.entries.splice(H.i + 1); H.entries.push({ url, state: null }); H.i++; } O.onPop(); },
    userBack() { H.i--; O.onPop(); }
  };
  const timers = [];
  const env = { history: H, setTimeout: (f, ms) => timers.push({ f, ms: ms || 0 }), now: () => 0, href: () => H.entries[H.i].url,
    replace: h => H.nav(h, true), assign: h => H.nav(h, false) };
  const UI = require('../app/js/core/ui.js');
  const O = UI._makeOverlays(env);
  /** run zero-delay timers, then queued history tasks, until both are empty (one turn of the event loop at a time) */
  const flush = () => { for (let n = 0; n < 50 && (timers.some(t => t.ms === 0) || tasks.length); n++) { const t = timers.findIndex(x => x.ms === 0); if (t >= 0) { timers.splice(t, 1)[0].f(); continue; } tasks.shift()(); } };
  const tick = () => { const t = timers.findIndex(x => x.ms === 0); if (t >= 0) timers.splice(t, 1)[0].f(); };
  const land = () => { while (tasks.length) tasks.shift()(); };
  return { H, O, flush, tick, land };
}

test('overlays: push adds one history step, pop consumes it with back(), and Back (popstate) closes only the top overlay', () => {
  const { H, O, flush } = fakeHistory();
  let closed = [];
  O.push({ id: 'me', close: () => closed.push('me') });
  assert.equal(H.length, 2); assert.ok(H.state.ov);
  O.pop('me'); assert.deepEqual(closed, ['me']); assert.equal(O.size(), 0);
  flush(); assert.equal(H.i, 0, 'the step is consumed'); assert.equal(H.pops, 1);
  O.push({ id: 'pal', close: () => closed.push('pal') }); O.push({ id: 'dlg', close: () => closed.push('dlg') });
  assert.equal(O.top(), 'dlg');
  H.userBack(); assert.deepEqual(closed.slice(-1), ['dlg']); assert.equal(O.top(), 'pal');
  H.userBack(); assert.deepEqual(closed.slice(-1), ['pal']); assert.equal(O.size(), 0);
});

test('overlays: code that navigates right after closing is never undone (the deferred back() is skipped), and the next push reuses the stale step', () => {
  const { H, O, flush } = fakeHistory();
  O.push({ id: 'dlg', close() {} });
  O.pop('dlg');                    // e.g. Submit closes the confirm…
  H.nav('#/result');               // …and the code navigates at once
  flush();
  assert.equal(H.entries[H.i].url, '#/result', 'the navigation stands');
  assert.equal(H.pops, 0, 'no back() ran');
  // a stale overlay entry (closed without being consumed) is reused rather than piling up Back steps
  const { H: H2, O: O2, flush: f2 } = fakeHistory();
  O2.push({ id: 'pal', close() {} }); O2.pop('pal'); O2.push({ id: 'keys', close() {} });   // the palette's Shortcuts row opens a dialog
  f2();
  assert.equal(H2.length, 2, 'one step for the dialog, none left over from the palette');
  assert.equal(O2.top(), 'keys');
});

test('overlays: while a back() is in flight, pushes wait and after() callbacks (GA.router.go) run once it lands', () => {
  const { H, O, tick, land } = fakeHistory();
  O.push({ id: 'a', close() {} }); O.pop('a');
  assert.equal(O.busy(), false, 'the consume is deferred by one task');
  tick();                                         // the deferred consume issues back()
  assert.equal(O.busy(), true);
  const ran = [];
  O.after(() => ran.push('nav'));
  O.push({ id: 'b', close() {} });                // e.g. the palette's Shortcuts row opens a dialog
  assert.deepEqual(ran, [], 'the navigation waits');
  assert.equal(H.length, 2, 'the dialog\'s step waits too');
  land();                                         // the back() lands (popstate)
  assert.equal(O.busy(), false);
  assert.deepEqual(ran, ['nav']);
  assert.equal(H.i, 1); assert.ok(H.state && H.state.ov, 'the dialog got its step after the back() landed');
  assert.equal(O.top(), 'b');
});

test('overlays: a link inside the top overlay replaces its step (Back returns to the page it was opened on)', () => {
  const { H, O } = fakeHistory();
  let closed = 0;
  O.push({ id: 'me', close: () => closed++ });
  O.follow('#/plan');
  assert.equal(closed, 1); assert.equal(O.size(), 0);
  assert.equal(H.length, 2); assert.equal(H.entries[1].url, '#/plan'); assert.equal(H.state, null);
  H.userBack(); assert.equal(H.entries[H.i].url, '#/a');
});

test('overlays: clear() (a new screen) drops every overlay without touching history; pop(id) of a lower overlay closes just that one', () => {
  const { H, O } = fakeHistory();
  const c = [];
  O.push({ id: 'a', close: () => c.push('a') }); O.push({ id: 'b', close: () => c.push('b') });
  O.pop('a'); assert.deepEqual(c, ['a']); assert.equal(O.top(), 'b');
  O.clear(); assert.deepEqual(c, ['a', 'b']); assert.equal(H.i, 2, 'history untouched');
});

test('router: a stray % in a pasted address does not throw, and a value keeps every = after the first (P3-36)', () => {
  const R = require('../app/js/core/router.js');
  assert.deepEqual(R._parse('#/pyq?q=a%2Fb&x=1=2&bad=%E0%A4%A'), { path: '/pyq', query: { q: 'a/b', x: '1=2', bad: '%E0%A4%A' } });
  assert.deepEqual(R._parse(''), { path: '/', query: {} });
  assert.deepEqual(R._parse('#/l/os.mem.paging?focus=1'), { path: '/l/os.mem.paging', query: { focus: '1' } });
  // a path that cannot be decoded matches no route (the not-found card), so no view decodes it again and throws
  assert.equal(R._decodable('/q/cs-2019%3ACS37%zz'), false); assert.equal(R._decodable('/l/os.mem.paging%'), false);
  assert.equal(R._decodable('/q/cs-2019%3ACS37'), true); assert.equal(R._decodable('/pyq'), true);
});

test('ui: the load-failure card says what failed, why in one line, and names build.py only for a copy opened from a folder (P1-59)', () => {
  const UI = require('../app/js/core/ui.js');
  assert.equal(UI.loadFailedText('lesson', true, 'https:').title, 'This lesson did not load');
  assert.equal(UI.loadFailedText('nonsense', true, 'https:').title, 'This screen did not load');
  assert.ok(/offline/i.test(UI.loadFailedText('search', false, 'https:').line));
  assert.ok(!/build\.py/.test(UI.loadFailedText('paper', true, 'https:').line));
  assert.ok(/build\.py/.test(UI.loadFailedText('paper', true, 'file:').line));
  for (const k of ['lesson', 'question', 'solution', 'paper', 'cards', 'search', 'lab', 'test', 'view']) assert.ok(UI.loadFailedText(k, true, 'https:').title.length > 10, k);
});

test('ui: infoTip builds a real button trigger named by its text (P1-55)', () => {
  const UI = require('../app/js/core/ui.js');
  const h = UI.infoTip('Official key\nmatched our solution', { label: 'Provenance' });
  assert.ok(/^<button type="button" class="itip" data-ftip="Official key\nmatched our solution">/.test(h), h);
  assert.ok(/<span class="sr">Provenance: Official key\. matched our solution<\/span><\/button>$/.test(h));
  assert.ok(!/<script/.test(UI.infoTip('<script>x</script>')), 'escaped');
});

test('shell: GA.shell.has(path) knows the routes (wave-1 owners prepare links to wave-2 screens with it)', () => {
  assert.equal(globalThis.GA.shell.has('/l/os.mem.paging'), true);
  assert.equal(globalThis.GA.shell.has('#/pyq?q=cache'), true);
  assert.equal(globalThis.GA.shell.has('/rev/os'), true);              // added in wave 2 (WP16 routes for WP15)
  assert.equal(globalThis.GA.shell.has('/nope/xyz'), false);
  assert.equal(globalThis.GA.shell.has('/'), true);
});

test('overlays: a replace() on the same screen (live filters) keeps an open sheet; a move back through history closes it', () => {
  const { H, O } = fakeHistory();
  let closed = 0;
  O.push({ id: 'filters', close: () => closed++ });
  H.nav('#/a?subject=os', true);                  // the bank updates its URL from inside the sheet
  assert.equal(closed, 0); assert.equal(O.top(), 'filters');
  H.entries[H.i].state = { k: 'k1' };             // the router keys the entry
  O.pop('filters'); assert.equal(closed, 1);
});

test('shell: the phone tab bar lights Me on Tests and Map and on the Me pages (P2-45, D6), its own tab elsewhere', () => {
  const b = T.barTabOf;
  assert.equal(b('/test'), 'me'); assert.equal(b('/test/run/abc'), 'me'); assert.equal(b('/map'), 'me');
  assert.equal(b('/flash/all'), 'me'); assert.equal(b('/about'), 'me'); assert.equal(b('/plan'), 'me');
  assert.equal(b('/'), '/'); assert.equal(b('/l/os.mem.paging'), '/syllabus'); assert.equal(b('/q/cs-2019:CS37'), '/pyq'); assert.equal(b('/lab/sort'), '/labs');
  for (const [pat] of T.ROUTES) assert.ok(b(pat.replace(/:[a-z]+/gi, 'x')), pat + ' lights a tab-bar tab');
});

test('shell: go-to keys and the palette use the tab labels (P2-12)', () => {
  const by = Object.fromEntries(T.GO_KEYS.map(k => [k[1], k[2]]));
  assert.equal(by['/syllabus'], 'Go to Learn'); assert.equal(by['/pyq'], 'Go to Questions'); assert.equal(by['/test'], 'Go to Tests'); assert.equal(by['/map'], 'Go to Map');
  const S = require('../app/js/core/search.js'), names = S.places().map(p => p.t);
  for (const n of ['Learn', 'Questions', 'Tests', 'Labs', 'Map']) assert.ok(names.includes(n), 'palette place ' + n);
  assert.ok(!names.some(n => /PYQ bank|Tests & mocks|Content map/.test(n)), names.join(', '));
});

test('tokens (P2-06): data series never repeat the CTA coral and every pair reads apart (ΔE2000 >= 8) in light and dark', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'base.css'), 'utf8');
  const block = re => { const m = re.exec(css); const t = {}; m[1].replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi, (x, k, v) => { t[k] = v.trim(); return x; }); return t; };
  const light = block(/:root\s*\{([\s\S]*?)\n\}/), dark = block(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255), lin = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lab = h => { const [r, g, b] = hex(h).map(lin), f = t => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
    const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, Y = r * 0.2126 + g * 0.7152 + b * 0.0722, Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883; return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
  const rad = d => d * Math.PI / 180;
  const de = (x, y) => {   // CIEDE2000
    const [L1, a1, b1] = lab(x), [L2, a2, b2] = lab(y), Cb = (Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2, G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
    const p1 = (1 + G) * a1, p2 = (1 + G) * a2, C1 = Math.hypot(p1, b1), C2 = Math.hypot(p2, b2), hh = (u, v) => { const h = Math.atan2(v, u) * 180 / Math.PI; return h < 0 ? h + 360 : h; };
    const h1 = hh(p1, b1), h2 = hh(p2, b2); let dh = h2 - h1; if (C1 * C2 === 0) dh = 0; else if (dh > 180) dh -= 360; else if (dh < -180) dh += 360;
    const dH = 2 * Math.sqrt(C1 * C2) * Math.sin(rad(dh / 2)), Lb = (L1 + L2) / 2, Cp = (C1 + C2) / 2;
    let hb = h1 + h2; if (C1 * C2 !== 0) hb = Math.abs(h1 - h2) > 180 ? (h1 + h2 + (h1 + h2 < 360 ? 360 : -360)) / 2 : (h1 + h2) / 2;
    const T2 = 1 - 0.17 * Math.cos(rad(hb - 30)) + 0.24 * Math.cos(rad(2 * hb)) + 0.32 * Math.cos(rad(3 * hb + 6)) - 0.2 * Math.cos(rad(4 * hb - 63));
    const th = 30 * Math.exp(-(((hb - 275) / 25) ** 2)), RC = 2 * Math.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7)), SL = 1 + 0.015 * (Lb - 50) ** 2 / Math.sqrt(20 + (Lb - 50) ** 2), SC = 1 + 0.045 * Cp, SH = 1 + 0.015 * Cp * T2;
    const dC = C2 - C1, dL = L2 - L1; return Math.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 - Math.sin(rad(2 * th)) * RC * (dC / SC) * (dH / SH)); };
  assert.ok(de('#000000', '#FFFFFF') > 99 && de('#2450E0', '#2450E0') === 0, 'the ΔE helper');
  for (const [name, t] of [['light', light], ['dark', Object.assign({}, light, dark)]]) {
    const ks = 'abcdefgh'.split('').map(k => '--viz-' + k);
    for (let i = 0; i < ks.length; i++) {
      assert.ok(de(t[ks[i]], t['--pop']) >= 8, `${name}: ${ks[i]} ${t[ks[i]]} is too close to the coral ${t['--pop']}`);
      for (let j = i + 1; j < ks.length; j++) assert.ok(de(t[ks[i]], t[ks[j]]) >= 8, `${name}: ${ks[i]} / ${ks[j]} ΔE ${de(t[ks[i]], t[ks[j]]).toFixed(1)}`);
    }
  }
  assert.equal(light['--viz-d'], '#C2410C'); assert.equal(dark['--viz-d'], '#F97316'); assert.equal(dark['--viz-f'], '#A855F7');
});

test('ui: time counts as focused study only on study screens (P3-44)', () => {
  const UI = require('../app/js/core/ui.js');
  for (const p of ['/l/os.mem.paging', '/q/cs-2019:CS37', '/pyq', '/test/run/abc', '/flash/all', '/flash/os', '/lab/sort', '/notebook']) assert.equal(UI.studyRoute(p), true, p);
  for (const p of ['/', '/syllabus', '/s/os', '/test', '/test/result/1', '/flash', '/labs', '/map', '/progress', '/plan', '/settings', '/about', '/wrapped']) assert.equal(UI.studyRoute(p), false, p);
});

test('ui: the shared wording table (P2-28, P2-66) holds the keys the views read, and single-key shortcuts follow profile.keys (P3-17)', () => {
  const UI = require('../app/js/core/ui.js');
  assert.equal(UI.str.ourEstimate, 'our estimate'); assert.equal(UI.str.legacy, 'not in the current syllabus'); assert.match(UI.str.bankEmpty, /^ICAI past papers, RTPs and MTPs are being added$/); assert.equal(UI.str.noKey, 'No official key');
  assert.deepEqual(Object.assign({}, UI.str.tier), { core: 'Core', standard: 'Extended', advanced: 'Advanced' });
  assert.equal(UI.str.marks(1), '1 mark'); assert.equal(UI.str.marks(2), '2 marks');
  assert.equal(UI.str.backupDownloaded('passbook-backup-2026-10-16.json'), 'Backup downloaded: passbook-backup-2026-10-16.json');
  assert.equal(UI.str.imported(311, 12, 3), 'Progress imported: 311 questions, 12 lessons, 3 tests');
  assert.equal(UI.str.freezeCovered('yesterday', 1), 'Streak saved: a freeze covered yesterday. 1 freeze left.');
  assert.ok(Object.isFrozen(UI.str));
  const prev = globalThis.GA.store;
  try {
    globalThis.GA.store = { state: { profile: {} } }; assert.equal(UI.singleKeys(), true);
    globalThis.GA.store = { state: { profile: { keys: false } } }; assert.equal(UI.singleKeys(), false);
    globalThis.GA.store = { state: { profile: { keys: true } } }; assert.equal(UI.singleKeys(), true);
  } finally { globalThis.GA.store = prev; }
  assert.deepEqual(UI.pageKeys([['j', 'Next question'], ['bad'], ['k', 'Previous question']]), [['j', 'Next question'], ['k', 'Previous question']]);
  assert.deepEqual(UI.pageKeys(), [['j', 'Next question'], ['k', 'Previous question']]); UI.pageKeys([]); assert.deepEqual(UI.pageKeys(), []);
});

/* P3-34 (integration): the first-paint script reads the store's tiny '<profile>:theme' key and parses the whole progress document only when that
   key was never written; a ?theme= query still wins. Runs index.html's own inline script against a stub page. */
test('first paint (P3-34): the boot script reads the theme key first and parses the progress document only without it', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const src = (/<script>\s*(\/\*[\s\S]*?\*\/\s*\(function\(\)\{try\{[\s\S]*?\}\)\(\);)\s*<\/script>/.exec(html) || [])[1];
  assert.ok(src, 'the inline first-paint script is in index.html');
  const run = (store, search, dark) => {
    let parsed = 0, theme = null; const metas = [{ a: {}, getAttribute(k) { return this.a[k] || '#F6F7F9'; }, setAttribute(k, v) { this.a[k] = v; } }];
    const ls = { getItem: k => (k in store ? store[k] : null) };
    const J = { parse: t => { parsed++; return JSON.parse(t); } };
    const doc = { documentElement: { setAttribute: (k, v) => { if (k === 'data-theme') theme = v; } }, querySelectorAll: () => metas };
    new Function('location', 'localStorage', 'JSON', 'matchMedia', 'document', 'URLSearchParams', src)(
      { search }, ls, J, () => ({ matches: !!dark }), doc, URLSearchParams);
    return { theme, parsed, bar: metas[0].a.content || null };
  };
  const big = JSON.stringify({ profile: { theme: 'light' } });
  let r = run({ 'passbook:main:theme': 'dark', 'passbook:main': big }, '', false);
  assert.deepEqual([r.theme, r.parsed, r.bar], ['dark', 0, '#0D0F13'], 'the theme key wins and the document is never parsed');
  r = run({ 'passbook:main': big }, '', true);
  assert.deepEqual([r.theme, r.parsed], ['light', 1], 'without the key the stored profile theme is read once');
  r = run({ 'passbook:demo:theme': 'auto', 'passbook:demo': big }, '?profile=demo', true);
  assert.deepEqual([r.theme, r.parsed, r.bar], ['dark', 0, null], "'auto' follows the system and leaves the bar colour alone");
  r = run({ 'passbook:main:theme': 'dark' }, '?theme=light', false);
  assert.deepEqual([r.theme, r.parsed], ['light', 0], 'a ?theme= query wins');
  r = run({ 'passbook:selftest:theme': 'light' }, '?selftest=1', true);
  assert.equal(r.theme, 'light', '?selftest=1 paints the selftest profile');
});
