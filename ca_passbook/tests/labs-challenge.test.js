/* Lab challenges (WP12, audit P0-09 / P0-16): the framework's test state in pure form. For every lab and every mode of its first control,
   40 seeded problems: the problem builds, its answer box has a declared kind (a minus key whenever an answer can be negative), the correct
   answer as the verdict prints it is accepted, and the test state's picture (the first frame, or challenge.view) never prints a distinctive
   answer that the problem itself does not state (the leak test). Plus the answer normalisation, the typing filter and the run counter (P0-10). */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const U = GA.util;

/* every ready lab in content/labs.json, plus the test fixture (tests/fixtures/fixture-bep.js), so the framework is exercised even with no real lab */
const FIX = { 'fixture-bep': path.join(ROOT, 'tests/fixtures/fixture-bep.js') };
const LABS = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/labs.json'), 'utf8')).filter(l => l.status !== 'planned').map(l => l.id).concat(Object.keys(FIX));
const defOf = id => { const m = require(FIX[id] || path.join(ROOT, 'app/js/labs', id + '.js')); return (m && m.def) || globalThis['__lab_def_' + id.replace(/-/g, '_')]; };
const KINDS = new Set(['num', 'signed', 'bits', 'digits', 'hex', 'ip', 'cidr', 'set', 'based', 'text', 'yesno', 'choice']);
const SEEDS = 40;

/* ---------------------------------------------------------------- normalisation and the typing filter */
test('labs: answers are normalised before comparing (a set in any order, hex case and 0x, spaced digits, padded addresses)', () => {
  const ok = (kind, typed, want) => L.check({ kind, tol: 0.01 }, typed, want).ok;
  assert.ok(ok('set', 'BAD', 'ABD')); assert.ok(ok('set', 'b, a, d', 'ABD')); assert.ok(!ok('set', 'AB', 'ABD'));
  assert.ok(ok('hex', '0x1f', '1F')); assert.ok(ok('hex', 'ea e5', 'EAE5')); assert.ok(!ok('hex', 'EAE6', 'EAE5'));
  assert.ok(ok('digits', ' 2 1 3,1 ', '2131')); assert.ok(!ok('digits', '2131 7', '2131'));
  assert.ok(ok('bits', '0 1 1 0', '0110')); assert.ok(!ok('bits', '110', '0110'));
  assert.ok(ok('ip', '010.000.001.002', '10.0.1.2')); assert.ok(!ok('ip', '10.0.1', '10.0.1.2'));
  assert.ok(ok('cidr', '124.144.240.0 / 20', '124.144.240.0/20'));
  assert.ok(ok('based', '0744', '744')); assert.ok(ok('based', '101.0100', '101.01')); assert.ok(ok('based', '1a3', '1A3'));
  assert.ok(ok('yesno', 'Y', 'yes')); assert.ok(ok('yesno', 'no', 'no')); assert.ok(!ok('yesno', 'no', 'yes'));
  assert.ok(ok('choice', 'bcnf', 'BCNF')); assert.ok(ok('choice', '1', 1));
  assert.ok(ok('text', ' Dropped ', 'dropped')); assert.ok(ok('text', 'd', 'D'));
  assert.ok(ok('num', '9.25', 9.25)); assert.ok(ok('num', '9.251', 9.25)); assert.ok(!ok('num', '9.3', 9.25));
  assert.ok(ok('signed', '−0.5', -0.5)); assert.ok(ok('signed', '-2', -2)); assert.ok(ok('num', '∞', Infinity));
  assert.ok(L.check({ kind: 'num', tol: 0 }, '7', 7).ok && !L.check({ kind: 'num', tol: 0 }, '7.001', 7).ok);
});
test('labs: an unreadable answer is never graded, and the box says why (P0-16)', () => {
  const v = (kind, t) => L.check({ kind, tol: 0 }, t, 1);
  for (const t of ['abc', '12abc', '1.2.3', '']) assert.equal(v('num', t).valid, false, t);
  assert.match(v('num', '0,75').msg, /decimal point/);
  assert.match(v('signed', 'x').msg, /−0\.5/);
  assert.match(L.check({ kind: 'yesno' }, '', 'yes').msg, /Pick an answer/);
  assert.equal(L.check({ kind: 'bits' }, '10a1', '1011').valid, false);
  assert.equal(L.check({ kind: 'ip' }, '300.1.1.1', '10.0.0.1').valid, false);
});
test('labs: the answer box filters as you type: digits and one point; a leading minus only for signed answers', () => {
  assert.equal(L.cleanTyped('num', '-12.5.3a'), '12.53');
  assert.equal(L.cleanTyped('signed', '-12.5.3a'), '-12.53');
  assert.equal(L.cleanTyped('signed', '1-2'), '12');
  assert.equal(L.cleanTyped('num', '0,75'), '075');            // the comma is dropped (and the box asks for a decimal point), never read as a point
  assert.equal(L.cleanTyped('bits', '1 0x1'), '1 01');
  assert.equal(L.cleanTyped('ip', '10.0.0.1/8'), '10.0.0.18');
  assert.equal(L.cleanTyped('text', 'ABD'), 'ABD');
});
test('labs: a refused comma holds grading back until a point is typed or the box is emptied: 0,75 is never graded as 75 (P0-16)', () => {
  const num = { kind: 'num', tol: 0.01 };
  let text = '', hold = false;                                  // typed key by key: 0 , 7 5
  for (const key of ['0', ',', '7', '5']) { const E = L.typedEdit('num', text + key, hold); text = E.text; hold = E.hold; if (key !== '0') assert.match(E.warn, /decimal point \(\.\), not a comma/, 'the line stays after ' + key); }
  assert.equal(text, '075'); assert.equal(hold, true);
  const r = L.check(num, text, 75, hold);
  assert.equal(r.valid, false, '075 after a comma is not graded'); assert.match(r.msg, /type 0\.75, not 0,75/);
  assert.deepEqual(L.typedEdit('num', '0,75', false), { text: '075', hold: true, warn: 'Use a decimal point (.), not a comma.' }, 'pasted');
  const F = L.typedEdit('num', '0.75', true);                    // the point typed: the hold ends
  assert.deepEqual(F, { text: '0.75', hold: false, warn: '' });
  assert.ok(L.check(num, F.text, 0.75, F.hold).ok);
  assert.equal(L.typedEdit('num', '', true).hold, false, 'an emptied box starts over');
  assert.equal(L.typedEdit('signed', '-,5', false).hold, true);
  assert.match(L.check({ kind: 'num', tol: 0 }, '1,000', 1000).msg, /not a comma/, 'a comma that reaches Check is explained, never read');
  assert.deepEqual(L.typedEdit('signed', '−4', false), { text: '-4', hold: false, warn: '' }, 'a typographic minus is a minus');
  assert.equal(L.typedEdit('num', '-4', false).warn, 'Only digits and one decimal point.');
  assert.equal(L.typedEdit('signed', '4a', false).warn, 'Only digits, one decimal point and a leading minus.');
  assert.deepEqual(L.typedEdit('digits', '2,1,3', true), { text: '2,1,3', hold: false, warn: '' }, 'other kinds never hold');
  assert.equal(L.check({ kind: 'digits' }, '2,1,3', '213', true).ok, true);
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  assert.match(src, /check\(chal\.spec, raw, chal\.want, chal\.hold\)/, 'Check passes the hold');
  assert.match(src, /typedEdit\(chal\.spec\.kind, v, chal\.hold\)/, 'the box filters through typedEdit');
});
test('labs: a number field that takes negatives never gets the minus-less decimal pad (P0-16 for lab inputs)', () => {
  assert.equal(L.numMode({ min: 0 }), ' inputmode="decimal"');
  assert.equal(L.numMode({ min: -99 }), '', 'type=number\'s own keyboard has a minus');
  assert.equal(L.numMode({}), '', 'no declared floor: negatives may be typed');
  const neg = [];
  for (const id of LABS) {
    const def = defOf(id), v = L._defaults(def);
    for (const c of def.controls || []) {
      if (c.type === 'number') { const html = L.controlHtml ? L.controlHtml(c, v, '') : null; if (+c.min < 0 || c.min == null) neg.push(`${id}.${c.id}`); if (html) assert.equal(/inputmode="decimal"/.test(html), +c.min >= 0, `${id}.${c.id}`); }
      if (c.type === 'table') (c.cols || []).forEach(k => { if (k.type === 'number' && !(+k.min >= 0)) neg.push(`${id}.${c.id}.${k.label}`); });
    }
  }
  assert.ok(Array.isArray(neg), 'the fields that take negatives are listed (each one checked above)');
});
test('labs: the lab page\'s inputs column sticks only when all of it fits under the top bar, measured again when it grows (P1-36)', () => {
  assert.equal(L.ctlFits(700, 68, 900), true);
  assert.equal(L.ctlFits(809, 68, 900), false, '68 + 12 + 809 + 12 > 900');
  assert.equal(L.ctlFits(808, 68, 900), true);
  assert.equal(L.ctlFits(725, 68, 768), false, 'the verifier\'s 725 px column at 1366 × 768');
  assert.equal(L.ctlFits(0, 68, 900), false, 'not laid out yet: no sticking');
  assert.equal(L.ctlFits(496, 0, 520), true, 'a bar that scrolls away takes no room');
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  const rec = src.slice(src.indexOf('const recompute = () => {'), src.indexOf('function fit(el)'));
  assert.ok(rec.lastIndexOf('fitCtl()') > rec.indexOf('convEl.innerHTML = conv'), 'recompute measures the column after it adds the conventions');
  assert.match(src, /new ResizeObserver\(\(\) => fitCtl\(\)\)/, 'any later height change measures again');
  assert.match(src, /getPropertyValue\('--nav-h'\)/, 'the sticky offset is the bar\'s real room');
});
test('labs: answer kinds come from the lab, not from the answer value (yes/no and numbers are the only fallbacks)', () => {
  const def = { challenge: {} };
  assert.equal(L.answerSpec(def, {}, {}, 4).kind, 'num');
  assert.equal(L.answerSpec(def, {}, {}, -4).kind, 'num');        // a negative answer does not reveal itself: only a declared kind adds the minus key
  assert.equal(L.answerSpec({ challenge: { signed: true } }, {}, {}, 4).kind, 'signed');
  assert.deepEqual(L.answerSpec(def, {}, {}, 'no').choices.map(c => c[0]), ['yes', 'no']);
  assert.equal(L.answerSpec({ challenge: { kind: () => 'choice', choices: () => ['1NF', 'BCNF'] } }, {}, {}, 'BCNF').choices.length, 2);
});

/* ---------------------------------------------------------------- P0-10: runs */
test('labs: a lesson embed records no run on mount and one on its first interaction; a lab page records one on open (P0-10)', () => {
  let n = 0;
  const embed = L.runTracker(() => n++, true);
  embed.mount(); assert.equal(n, 0, 'mounting (scrolling past) records nothing');
  embed.touch(); assert.equal(n, 1); embed.touch(); embed.touch(); assert.equal(n, 1, 'one run per mount');
  let m = 0;
  const page = L.runTracker(() => m++, false);
  page.mount(); assert.equal(m, 1); page.touch(); assert.equal(m, 1, 'interacting on the page does not count a second run');
});
test('labs: the frame never records a run inside mount() for compact mounts (source guard)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  assert.ok(!/labRun\(id\);\s*\n\s*return \{/.test(src), 'no unconditional labRun before the mount returns');
  assert.match(src, /runTracker\(\(\) => \{ if \(GA\.actions && GA\.actions\.labRun\) GA\.actions\.labRun\(id\); \}, compact\)/);
});

/* ---------------------------------------------------------------- every lab, every mode, 40 problems */
const ent = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
/* what the learner can perceive of a picture (its text and what a screen reader hears: aria-label, title, alt and tip attributes are read
   out of each tag before the tag goes), minus pure-number index labels: bit positions, minterm numbers, table
   column numbers (a K-map's 13 or a DP table's column 14 is not an answer), with thousands separators dropped ('4,540' is one number) */
const textOf = html => ent(String(html)
  .replace(/<text\b[^>]*class="[^"]*\bdtm\b[^"]*"[^>]*>(?:\s*<tspan[^>]*>)?\s*\d+\s*(?:<\/tspan>\s*)?<\/text>/g, ' ')
  .replace(/<th\b[^>]*>\s*\d+\s*<\/th>/g, ' ')
  .replace(/<[^>]+>/g, tag => ' ' + [...tag.matchAll(/\b(?:aria-label|title|alt|data-ftip)="([^"]*)"/g)].map(m => m[1]).join(' ') + ' '))
  .replace(/(\d),(?=\d{3}\b)/g, '$1').replace(/\s+/g, ' ');
const viewText = view => (view || []).map(v => { if (v.html != null) return textOf(v.html); try { return textOf(diagram.render(v)); } catch (e) { return ''; } }).join(' | ');
const esc = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const token = w => new RegExp('(^|[^0-9A-Za-z.])' + esc(w) + '(?![0-9A-Za-z]|\\.[0-9])', 'i');
/** a value that cannot turn up by chance (row numbers, indices and small counts can): non-integers, |n| > 12, strings of 3+ characters */
const distinctive = want => (typeof want === 'number' ? Number.isFinite(want) && (!Number.isInteger(want) || Math.abs(want) > 12)
  : typeof want === 'string' && want.length >= 3 && !/^(yes|no)$/i.test(want) && !/^0+$/.test(want));
const modesOf = def => { const c0 = (def.controls || [])[0]; return c0 && (c0.type === 'seg' || c0.type === 'select') ? c0.options.map(o => [c0.id, o[0]]) : [[null, null]]; };

for (const id of LABS) {
  test(`labs: ${id}: 40 test-yourself problems per mode build, declare their answer box, accept their own answer and never show it while asking (P0-09)`, () => {
    const def = defOf(id);
    assert.ok(def && def.challenge, id + ' has a challenge');
    const dflt = L._defaults(def), leaks = [], problems = [];
    for (const [key, mode] of modesOf(def)) {
      const start = key ? Object.assign({}, dflt, { [key]: mode }) : dflt;
      for (let s = 1; s <= SEEDS; s++) {
        const P = L.problem(def, start, s * 7919);
        const spec = L.answerSpec(def, P.values, P.result, P.want);
        assert.ok(KINDS.has(spec.kind), `${id}:${mode}#${s} kind ${spec.kind}`);
        if (typeof P.want === 'number' && P.want < 0) assert.equal(spec.kind, 'signed', `${id}:${mode}#${s}: a negative answer needs the minus key (P0-16)`);
        if (/^(yes|no)$/i.test(String(P.want))) assert.equal(spec.kind, 'yesno', `${id}:${mode}#${s}: yes/no answers are buttons`);
        if (spec.choices) assert.ok(spec.choices.some(c => L.check(spec, c[0], P.want).ok), `${id}:${mode}#${s}: one button is the answer ${P.want}`);
        else assert.ok(L.check(spec, L.shown(P.want, spec.tol), P.want).ok, `${id}:${mode}#${s}: its own answer '${L.shown(P.want, spec.tol)}' (${spec.kind}) is accepted`);
        const prompt = def.challenge.prompt(P.values, P.result);
        assert.ok(typeof prompt === 'string' && prompt.length > 10, `${id}:${mode}#${s} prompt`);
        assert.ok(!/\b[Cc]over the (stage|chart|table|result|tables|verdicts)\b/.test(prompt), `${id}:${mode}#${s}: the stage hides itself; the prompt need not say 'cover'`);
        problems.push(1);
        if (!distinctive(P.want)) continue;
        const view = L.testView(def, P.values, P.result);
        const T = view ? viewText(view) : '';                 // the conventions ('How this lab counts') hide while asking, like the results
        let problem = textOf(prompt).replace(/\*\*/g, '') + ' ' + Object.values(P.values).map(x => (Array.isArray(x) ? x.flat().join(' ') : String(x))).join(' ');
        problem += ' ' + problem.replace(/(\d)\.(?=\d)/g, '$1 ');                     // the bytes of a dotted address are stated too
        const w = typeof P.want === 'number' ? String(+P.want.toFixed(3)) : String(P.want);
        if (token(w).test(T) && !token(w).test(problem)) leaks.push(`${mode}#${s}: ${w}`);
      }
    }
    assert.ok(problems.length >= SEEDS, id + ' made problems');
    assert.deepEqual(leaks, [], `${id}: the test state shows the answer: ${leaks.slice(0, 6).join(', ')}`);
  });
}

/* ---------------------------------------------------------------- P1-16: compact embeds */
test('labs: a lesson embed shows the views that fit its budget, always at least one drawn view (hidden twins cost nothing) (P1-16)', () => {
  assert.equal(L.fitCount([116, 144], 330), 2);
  assert.equal(L.fitCount([178, 286, 303, 379], 250), 1);
  assert.equal(L.fitCount([905], 250), 1, 'one tall view still shows');
  assert.equal(L.fitCount([0, 400, 100], 250), 2, 'a hidden wide twin first: the narrow view after it still shows');
  assert.equal(L.fitCount([0, 130, 104, 169], 250), 3);
  assert.equal(L.fitCount([0, 0], 250), 2);
  assert.equal(L.fitCount([], 250), 1);
});
test('labs: the Given line lists the actual inputs; a later choice keeps its label (P1-16, P1-36)', () => {
  const def = { controls: [
    { id: 'mode', type: 'seg', label: 'What to explore', options: [['a', 'K-map'], ['b', 'Tabulation']], value: 'a' },
    { id: 'n', type: 'seg', label: 'Variables', options: [[3, '3'], [4, '4']], value: 4 },
    { id: 'q', type: 'number', label: 'Time quantum q (units)', value: 3 },
    { id: 'on', type: 'toggle', label: 'Show the working', value: true },
    { id: 'off', type: 'toggle', label: 'Hidden extra', value: false },
    { id: 'h', type: 'text', label: 'Hidden', value: 'x', show: v => v.mode === 'b' },
    { id: 't', type: 'table', label: 'Processes', rows: [['P1', 0, 7]], value: null, cols: [] } ] };
  const v = L._defaults(def);
  assert.deepEqual(L.given(def, v), ['K-map', 'Variables: 4', 'Time quantum q: 3', 'Show the working', 'Processes: P1 0 7']);
});
test('labs: the Given line leaves out parts that say nothing (a later "none", a declared "0 = …" default, More options, # comments); a short label wins (P1-16)', () => {
  const def = { controls: [
    { id: 'tree', type: 'select', label: 'Tree', options: [['bst', 'Binary search tree']], value: 'bst' },
    { id: 'trav', type: 'select', label: 'Then animate a traversal of the final tree', short: 'Then traverse', options: [['none', 'none'], ['pre', 'preorder']], value: 'none' },
    { id: 'tlb', type: 'number', label: 'TLB entries (0 = no TLB)', value: 0 },
    { id: 'n', type: 'number', label: 'Frames (10 = many)', value: 0 },
    { id: 'more', type: 'toggle', label: 'More options', value: true },
    { id: 'data', type: 'textarea', label: 'Tables (edit freely)', value: '# a comment line\nT(a, b)\n1, 2' } ] };
  const v = L._defaults(def);
  assert.deepEqual(L.given(def, v), ['Binary search tree', 'Frames: 0', 'Tables: T(a, b) ¶ 1, 2']);
  Object.assign(v, { trav: 'pre', tlb: 4 });
  assert.deepEqual(L.given(def, v).slice(0, 3), ['Binary search tree', 'Then traverse: preorder', 'TLB entries: 4']);
});
test('labs: every lab\'s Given line, for its defaults and every example, names real inputs only (P1-16, P1-36)', () => {
  const bad = [];
  for (const id of LABS) {
    const def = defOf(id);
    const sets = [L._defaults(def)].concat((def.presets || []).map(p => Object.assign(L._defaults(def), p.values)));
    for (const v of sets) {
      let parts; try { parts = L.given(def, L.prepare(def, v)); } catch (e) { bad.push(`${id}: ${e.message}`); continue; }
      if (!parts.length) bad.push(`${id}: empty`);
      for (const t of parts) if (/: none$|^More options$|: #|undefined|NaN|\[object/.test(t)) bad.push(`${id}: ${t}`);
    }
  }
  assert.deepEqual(bad.slice(0, 8), []);
});
test('labs: the lab page\'s phone-only "Edit inputs" rule never hides a lesson embed\'s "Change the inputs" (P1-16)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'app/css/labs.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const hides = [...css.matchAll(/([^{}]*\.lab-edit[^{}]*)\{[^}]*display:\s*none/g)].map(m => m[1].trim());
  assert.ok(hides.length, 'the lab page hides its Edit inputs button above 900 px');
  for (const sel of hides) for (const s of sel.split(',')) if (/\.lab-edit\b/.test(s)) assert.match(s.trim(), /^\.lab-ctl\s*>\s*\.lab-edit$/, `"${s.trim()}" would hide the embed button too`);
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  assert.match(src, /<div class="lab-gv">[^`]*<button type="button" class="btn sm ghost lab-edit"/, 'the embed button sits in the Given row');
});

/* ---------------------------------------------------------------- P2-57: conventions vs remarks */
test('labs: a note splits into "How this lab counts" bullets and remarks on the result; the bullets hide while testing (P2-57)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  assert.match(src, /convEl\.hidden = t \|\| /, 'lockState hides the conventions in the test state (some name the result: a total, a normal form)');
  const N = L.notesOf('**Conventions.** Frames start empty. Ties go to the lower index. **P O Q is a possible BFS order** ✓: P first. **Forwarding:** ALU results exist at the end of EX.');
  assert.deepEqual(N.conv, ['Frames start empty.', 'Ties go to the lower index.', '**Forwarding:** ALU results exist at the end of EX.']);
  assert.equal(N.rest, '**P O Q is a possible BFS order** ✓: P first.');
  assert.deepEqual(L.notesOf('Cylinders are numbered 0 – 199; up means towards larger numbers.').conv.length, 1);
  assert.deepEqual(L.notesOf('**Window too big for 2-bit sequence numbers**: GBN needs W ≤ 3.'), { conv: [], rest: '**Window too big for 2-bit sequence numbers**: GBN needs W ≤ 3.' });
  assert.deepEqual(L.notesOf(''), { conv: [], rest: '' });
});
test('labs: every lab\'s conventions read as conventions: no verdict (✓ ✗) and no warning among the bullets (P2-57)', () => {
  const bad = [];
  for (const id of LABS) {
    const def = defOf(id), sets = [L._defaults(def)].concat((def.presets || []).map(p => Object.assign(L._defaults(def), p.values)));
    for (const v of sets) { let r; try { r = def.compute(L.prepare(def, v)); } catch (e) { continue; }
      for (const b of L.notesOf(r.note).conv) if (/[✓✗]|\btoo big\b|\bnot a possible\b/i.test(b)) bad.push(`${id}: ${b.slice(0, 80)}`); }
  }
  assert.deepEqual(bad.slice(0, 6), []);
});
test('labs: every "How this lab counts" bullet is one well-formed sentence: no sentence glued to the next, no double space (P2-62)', () => {
  /* the verifier's run-ons: 'bit 0 last).Leading zeros …', '(RFC 1878)  Bits are numbered … last).uses …', '… is used;  Bits …' */
  const glued = /(?:[a-z]{2}|\))[.!?;](?=[A-Za-z]{2})|\S {2,}\S/;
  const bad = [];
  for (const id of LABS) {
    const def = defOf(id), base = L._defaults(def), sets = [base].concat((def.presets || []).map(p => Object.assign(L._defaults(def), p.values)));
    const first = (def.controls || [])[0];
    if (first && (first.type === 'select' || first.type === 'seg')) for (const o of first.options || []) sets.push(Object.assign(L._defaults(def), { [first.id]: o[0] }));
    for (const v of sets) { let r; try { r = def.compute(L.prepare(def, v)); } catch (e) { continue; }
      for (const b of L.notesOf(r.note).conv) { const t = b.replace(/\*\*[^*]+\*\*/g, 'X').replace(/\$[^$]*\$/g, 'X').replace(/`[^`]*`/g, 'X'); if (glued.test(t)) bad.push(`${id}: ${b.slice(0, 90)}`); } }
  }
  assert.deepEqual([...new Set(bad)].slice(0, 6), []);
});
test('labs: a lab figure keeps its smallest label at 10 px or more (an inline floor GA.fit respects), and formula tables are marked to stack (P2-60)', () => {
  assert.equal(L.labelFloor('<svg width="520"><text font-size="9.5"><tspan>0</tspan></text></svg>', 520), 520, 'a 9.5 px label: never drawn smaller');
  assert.equal(L.labelFloor('<svg width="400"><text font-size="11">a</text></svg>', 400), 364);
  assert.equal(L.labelFloor('<svg width="400"><text font-size="13">a</text></svg>', 400), 0, 'GA.fit\'s 80 % keeps 13 px above 10');
  assert.equal(L.labelFloor('<svg width="400"><text font-size="8"><tspan x="1"></tspan></text><text font-size="12">b</text></svg>', 400), 334, 'an empty label does not count');
  assert.match(L.legible('<svg class="dgs" width="520" style="max-width:520px;min-width:364px"><text font-size="9.5">0</text></svg>', 520), /style="max-width:520px;min-width:520px"/);
  assert.ok(L.formulaHead(['Quantity', 'Formula', 'Value']) && !L.formulaHead(['#', 'move', 'seek']));
  assert.match(L.viewHtml([{ type: 'table', head: ['Quantity', 'Formula', 'Value'], rows: [['a', 'b', 'c']] }]), /^<figure class="dg lab-fx"/);
  assert.match(L.viewHtml([{ type: 'gantt', title: 'G', blocks: [{ label: 'P1', start: 0, end: 30 }] }]), /data-spec=/, 'a gantt keeps its spec so GA.fit can redraw it at phone width');
});
test('labs: results tables right-align number columns only; text columns read left to right (P2-57)', () => {
  assert.deepEqual(L.numericCols({ head: ['#', 'Output', 'How the run ends', 'Interleavings'], rows: [['1', 'ACBD', 'all finish', '27'], ['2', 'DACB', 'deadlock: P2 asleep on t', '1,240']] }), [true, false, false, true]);
  assert.deepEqual(L.numericCols({ head: ['Algorithm', 'Total', 'Avg', 'Order'], rows: [['FCFS', '236', '29.5', '53 → 65'], ['SSTF', '—', '12 %', 'x']] }), [false, true, true, false]);
  const html = L.tableHtml({ head: ['Requirement', 'Verdict', 'Why'], rows: [['Mutual exclusion', '✓', 'no state has both inside']] });
  assert.ok(!/class="r"/.test(html), 'a verdict and a reason are text');
});
test('labs: the player reads |◀ ‹ ▶ › ▶| and Reset has its own icon (P2-57)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  const icons = ['first', 'prev', 'next', 'last'].map(k => (new RegExp(`data-p="${k}"[^>]*>\\$\\{icon\\('([\\w-]+)'\\)`).exec(src) || [])[1]);
  assert.deepEqual(icons, ['step-b', 'chev-l', 'chev-r', 'step-f']);
  const reset = (/id="\$\{pid\}lab-reset">\$\{icon\('([\w-]+)'\)/.exec(src) || [])[1];
  assert.ok(reset && !icons.includes(reset), 'Reset: ' + reset);
});
test('labs: the lab\'s keys act only on the lab, its stage and its caption; controls keep their native keys (P2-58)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  const kd = src.slice(src.indexOf("host.addEventListener('keydown'"), src.indexOf("const onResize"));
  assert.match(kd, /INPUT\|TEXTAREA\|SELECT\|BUTTON\|A\|SUMMARY/, 'form controls and links keep their keys (the step slider moves one step, not two)');
  assert.match(kd, /t === host \|\| \(t\.closest && t\.closest\('\.lab-stage'\)\)/, 'keys only on the lab and its stage');
  assert.match(src, /data-v="\$\{esc\(o\[0\]\)\}" aria-pressed="\$\{on\}"/, 'segments say whether they are pressed');
  assert.match(src, /aria-label="\$\{esc\(`\$\{k\.label\}, row \$\{ri \+ 1\}`\)\}"/, 'table inputs are labelled');
  assert.match(src, /cap\.setAttribute\('aria-live', 'off'\)/, 'a playing caption is not read out frame by frame');
});
test('labs: a lesson embed gives its drawing what the other parts leave of 700 px, a slightly tall one is drawn smaller, a tall one clipped (P1-16)', () => {
  assert.equal(L.viewBudget(400, false), 298);
  assert.equal(L.viewBudget(600, false), 185, 'never below the desktop floor');
  assert.equal(L.viewBudget(600, true), 210, 'nor the phone floor');
  assert.deepEqual(L.viewPlan(250, 298, false), {}, 'fits: drawn as is');
  assert.deepEqual(L.viewPlan(310, 298, false), { zoom: 0.96 }, 'up to 8 % over: drawn a little smaller on a desktop');
  assert.deepEqual(L.viewPlan(310, 298, true), { clip: true }, 'phones never shrink labels further: clipped');
  assert.deepEqual(L.viewPlan(905, 298, false), { clip: true }, 'a tall drawing is clipped under "Show the whole drawing"');
  assert.ok(L.tileBasis({ value: '9.25' }) < L.tileBasis({ value: 'A B C E F G H D' }), 'a long value gets a wider tile');
  assert.equal(L.tileBasis({ value: '65 → 67 → 37 → 14 → 98 → 122 → 124 → 183' }), 340, 'capped: a row of its own');
  const src = fs.readFileSync(path.join(ROOT, 'app/js/labs/framework.js'), 'utf8');
  assert.match(src, /class="lab-whole" aria-controls="\$\{pid\}lab-view" hidden>/, 'the clip has its way out, tied to the drawing');
});
