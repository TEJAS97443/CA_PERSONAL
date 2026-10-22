/* The labs gallery (WP12, audit P2-59 / P1-39 / P1-57) and the lab page's small copy: the featured slot names a returning learner's lab
   with a label the store can back up (no record time = no 'Continue where you left off'), the subject sections keep page order (no dense
   packing: reading and Tab order follow 'most marks first') and share card heights in a row, the featured card's small text on its tinted
   tiles meets WCAG AA in both themes, and a lab's {html} block can never widen a phone's stage (P2-60). */
globalThis.GA = globalThis.GA || {};
GA.views = GA.views || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
require('../app/js/views/labs.js');
const P = GA.views.labs._pure;
const css = fs.readFileSync(path.join(ROOT, 'app/css/labs.css'), 'utf8');
const base = fs.readFileSync(path.join(ROOT, 'app/css/base.css'), 'utf8');

const list = ['cache', 'sql', 'routing', 'kmap'].map(id => ({ id, title: id, status: 'ready' }));
const ids = r => (r ? [r.c.id, r.by] : null);

test('labs gallery: a fresh profile has no featured lab of its own (the most-asked lab is shown instead)', () => {
  assert.equal(P.lastLab({ labs: {}, log: [] }, list), null);
  assert.equal(P.lastLab({}, list), null);
});
test('labs gallery: with no record times the featured label never claims "where you left off" (the verifier\'s Cache, SQL x2, Routing run)', () => {
  /* one Cache challenge, then SQL opened and stepped twice and Routing once: the store keeps no time for opening a lab */
  const st = { labs: { cache: { runs: 1, ch: { n: 1, ok: 1 } }, sql: { runs: 2, ch: { n: 0, ok: 0 } }, routing: { runs: 1, ch: { n: 0, ok: 0 } } },
    log: [[1000, 'q:x', 1], [2000, 'lab:cache', 1, null, 'l'], [3000, 'q:y', 0]] };
  const r = P.lastLab(st, list);
  assert.deepEqual(ids(r), ['cache', 'test']);
  assert.equal(P.CONT[r.by][0], 'Your last lab challenge');
  assert.notEqual(P.CONT[r.by][0], 'Continue where you left off');
  /* no challenge at all: the most-opened lab, said as such */
  const r2 = P.lastLab({ labs: { sql: { runs: 2, ch: { n: 0, ok: 0 } }, routing: { runs: 5, ch: { n: 0, ok: 0 } } }, log: [] }, list);
  assert.deepEqual(ids(r2), ['routing', 'opened']);
  assert.equal(P.CONT[r2.by][0], 'Your most-opened lab');
  /* the newest challenge row wins by its time, not its place in the log */
  const r3 = P.lastLab({ labs: { cache: { runs: 1, ch: { n: 1, ok: 0 } }, kmap: { runs: 1, ch: { n: 1, ok: 1 } } }, log: [[5000, 'lab:kmap', 1], [4000, 'lab:cache', 0]] }, list);
  assert.deepEqual(ids(r3), ['kmap', 'test']);
  /* a challenge row for a lab that is not in the list (planned, renamed) is skipped */
  assert.deepEqual(ids(P.lastLab({ labs: {}, log: [[9000, 'lab:gone', 1], [8000, 'lab:sql', 1]] }, list)), ['sql', 'test']);
});
test('labs gallery: once the store keeps a lab record time (l.at), the newest one is "Continue where you left off"', () => {
  const st = { labs: { cache: { runs: 1, ch: { n: 1, ok: 1 }, at: 2000 }, sql: { runs: 2, ch: { n: 0, ok: 0 }, at: 4000 }, routing: { runs: 1, ch: { n: 0, ok: 0 }, at: 3000 } },
    log: [[2000, 'lab:cache', 1, null, 'l']] };
  const r = P.lastLab(st, list);
  assert.deepEqual(ids(r), ['sql', 'time']);
  assert.deepEqual(P.CONT[r.by], ['Continue where you left off', 'Continue the lab']);
  /* a challenge row newer than every record time still counts (a check is a use) */
  assert.deepEqual(ids(P.lastLab(Object.assign({}, st, { log: [[5000, 'lab:kmap', 0]] }), list)), ['kmap', 'time']);
});
test('labs page: the From the papers foot line agrees in number', () => {
  assert.equal(P.moreEx(1), "1 more ICAI example is in the lab's Examples list.");
  assert.equal(P.moreEx(3), "3 more ICAI examples are in the lab's Examples list.");
  assert.equal(P.moreEx(1200), "1,200 more ICAI examples are in the lab's Examples list.");
});

/* ---------------------------------------------------------------- layout guards (P2-59, P1-39, P2-60) */
const rule = sel => { const i = css.indexOf(sel + ' {'); assert.ok(i >= 0, `labs.css has ${sel}`); return css.slice(i, css.indexOf('}', i) + 1); };
test('labs gallery: the subject sections keep page order (no dense packing) and share the heading line and card height in a row', () => {
  assert.doesNotMatch(rule('.lb-gs'), /dense/, 'dense packing pulls later (fewer-marks) sections up beside earlier ones: visual and Tab order jump');
  assert.match(rule('.lb-gs'), /align-items:\s*stretch/);
  assert.match(css, /@supports \(grid-template-rows: subgrid\) \{ \.lb-g \{ grid-row: span 2; grid-template-rows: subgrid; \}/);
  assert.match(rule('.lb-card'), /flex-direction:\s*column/);
  assert.match(rule('.lb-f'), /margin-top:\s*auto/, 'the card footer sits at the bottom of the (row-high) card');
  assert.match(css, /\.lb-card:not\(\.lb-feat\) \.lb-f > \.lb-mine \{ order: -1; \}/, 'the numbers line is the last line, so it lines up across a row with or without a record');
});
test('labs: a lab\'s {html} block may shrink to the stage (its wide drawing scrolls in its box, the page never scrolls sideways)', () => {
  assert.match(css, /\.lab-view > \.lab-html \{ min-width: 0; \}/);
});

/* ---------------------------------------------------------------- P1-57: the featured card's text on cobalt and on its tinted tiles */
const hex = h => [0, 2, 4].map(i => parseInt(h.replace('#', '').slice(i, i + 2), 16));
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = rgb => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const mix = (a, b, t) => a.map((v, i) => v * t + b[i] * (1 - t));
/** the share of --accent-ink a declaration paints: var(--accent-ink) = 1, color-mix(in srgb, var(--accent-ink) N%, transparent) = N / 100 */
const inkShare = (decl, prop) => {
  const m = new RegExp(`(?:^|[;{\\s])${prop}:\\s*([^;}]+)`).exec(decl); assert.ok(m, `${prop} in ${decl.slice(0, 40)}`);
  const v = m[1].trim();
  if (/^var\(--accent-ink\)$/.test(v)) return 1;
  const k = /^color-mix\(in srgb, var\(--accent-ink\) ([\d.]+)%, transparent\)$/.exec(v); assert.ok(k, `${prop}: ${v} is an accent-ink share`);
  return +k[1] / 100;
};
const themes = (() => {
  const tok = (block, name) => (new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(block) || [])[1];
  const root = base.slice(base.indexOf(':root'), base.indexOf('[data-theme="dark"] {'));
  const dark = base.slice(base.indexOf('[data-theme="dark"] {'));
  return [['light', root], ['dark', dark]].map(([n, b]) => ({ n, accent: hex(tok(b, 'accent')), ink: hex(tok(b, 'accent-ink')) }));
})();
test('labs gallery: the featured card\'s small text reads at 4.5:1 or more on the cobalt frame and on its number tiles, light and dark (P1-57)', () => {
  assert.equal(themes.length, 2);
  const tileT = inkShare(rule('.lb-nums div'), 'background');
  const onTile = [['.lb-nums span', 'caption under a numeral'], ['.lb-nums b small', "the '/30' after a numeral"]];
  const onFrame = [['.lb-eb', 'eyebrow'], ['.lb-feat .lb-t small', 'subject line'], ['.lb-feat .lb-p', 'blurb']];
  for (const t of themes) {
    const tile = mix(t.ink, t.accent, tileT);
    for (const [sel, what] of onTile) { const r = ratio(mix(t.ink, tile, inkShare(rule(sel), 'color')), tile); assert.ok(r >= 4.5, `${t.n}: ${what} ${r.toFixed(2)}:1`); }
    for (const [sel, what] of onFrame) { const d = sel === '.lb-eb' ? css.slice(css.indexOf('.lb-eb { margin: 0;'), css.indexOf('}', css.indexOf('.lb-eb { margin: 0;')) + 1) : rule(sel);
      const r = ratio(mix(t.ink, t.accent, inkShare(d, 'color')), t.accent); assert.ok(r >= 4.5, `${t.n}: ${what} ${r.toFixed(2)}:1`); }
  }
});
