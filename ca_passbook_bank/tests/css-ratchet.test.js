/* The design-system ratchet (audit P2-52, WP14): literal sizes may only go down. Each sheet's count of hard-coded radii (border-radius in px,
   not a --r-* token) and font sizes in px is held at or under the number it had when the consolidation landed (2026-10-17). A sheet that drops
   below its number should lower it here, so the ratchet keeps the gain. New sheets start at their first count; prefer tokens there.
   Also: one segmented control (.seg and .hb-seg defined together, only in components.css) and the card-edge and radius tokens exist. */
const fs = require('fs'), path = require('path');
const CSS = path.join(__dirname, '..', 'app', 'css');
const read = f => fs.readFileSync(path.join(CSS, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const radii = s => (s.match(/border-radius:\s*[^;}]*\d+px/g) || []).filter(d => !/var\(/.test(d)).length;
const fonts = s => (s.match(/font-size:\s*[\d.]+px/g) || []).length + (s.match(/font:\s*\d{3}\s+[\d.]+px/g) || []).length;

const LIMIT = {   // [literal radii, literal font sizes] per sheet
  'bank.css': [5, 38], 'base.css': [2, 1], 'components.css': [24, 57], 'content.css': [2, 12], 'engage.css': [11, 54], 'home.css': [38, 119],
  'hubs.css': [16, 91], 'labs.css': [20, 136], 'lesson.css': [33, 114], 'map.css': [30, 88], 'pwa.css': [0, 0], 'retention.css': [16, 61],
  'revise.css': [10, 22], 'shell.css': [14, 47], 'site.css': [8, 16], 'subject.css': [21, 92], 'tests.css': [18, 118], 'views.css': [22, 78]
};

test('css ratchet: no sheet gains hard-coded radii or font sizes (P2-52)', () => {
  const sheets = fs.readdirSync(CSS).filter(f => f.endsWith('.css')).sort();
  for (const f of sheets) {
    assert.ok(LIMIT[f], `${f} is new: add it to LIMIT in tests/css-ratchet.test.js with its current counts`);
    const s = read(f), [r, t] = LIMIT[f];
    assert.ok(radii(s) <= r, `${f}: ${radii(s)} literal border-radius values (limit ${r}); use var(--r-xs … --r-xl)`);
    assert.ok(fonts(s) <= t, `${f}: ${fonts(s)} literal font sizes in px (limit ${t})`);
  }
  for (const f of Object.keys(LIMIT)) assert.ok(sheets.includes(f), `${f} is gone: remove it from LIMIT`);
});

test('css ratchet: one segmented control, defined once in components.css (P2-52)', () => {
  const where = fs.readdirSync(CSS).filter(f => f.endsWith('.css') && /(^|\})\s*\.seg\s*,\s*\.hb-seg\s*\{/.test(read(f)));
  assert.deepEqual(where, ['components.css']);
  for (const f of fs.readdirSync(CSS).filter(f => f.endsWith('.css') && f !== 'components.css'))
    assert.ok(!/(^|\})\s*\.(hb-)?seg\s*\{/.test(read(f)), `${f} redefines the segmented control's base rule`);
});

test('css ratchet: the radius scale and the card-edge token exist in base.css', () => {
  const b = read('base.css');
  for (const t of ['--r-xs', '--r-sm', '--r:', '--r-lg', '--r-xl', '--card-edge']) assert.ok(b.includes(t), t + ' is defined');
});
