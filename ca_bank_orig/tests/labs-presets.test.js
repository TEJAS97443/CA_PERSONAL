/* Lab examples (WP12, audit P1-38): GATE examples name their question in a leading tag, '[cs-2015-3:CS36] Address · …', the label states only
   the question (never its result), labels are formatted at render time ('GATE 2015 CS · Set 3 · Q36'), and the Examples picker lists the
   GATE papers first. Every cited id must be a shipped question (build.py --check makes that an error too). */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');

const FIX = { 'fixture-bep': path.join(ROOT, 'tests/fixtures/fixture-bep.js') };        // the test fixture lab: the framework is exercised with no real lab
const LABS = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/labs.json'), 'utf8')).filter(l => l.status !== 'planned').map(l => l.id).concat(Object.keys(FIX));
const defOf = id => { const m = require(FIX[id] || path.join(ROOT, 'app/js/labs', id + '.js')); return (m && m.def) || L.get(id); };
/* the shipped question ids, read in a sandbox of their own (the shared GAD and the require cache belong to the other tests) */
const vm = require('vm'), QIDS = new Set();
const box = { GAD: { reg: (kind, id, rows) => { if (kind === 'pyq') rows.forEach(q => QIDS.add(q.id)); } } };
if (fs.existsSync(path.join(ROOT, 'data/pyq'))) for (const f of fs.readdirSync(path.join(ROOT, 'data/pyq'))) vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data/pyq', f), 'utf8'), box);

test('labs: a preset tag parses into question ids, a group and the question text (P1-38)', () => {
  assert.deepEqual(L.presetInfo({ label: '[cs-2015-3:CS36] Address · the last host of 200.10.11.144/27' }),
    { pyq: ['cs-2015-3:CS36'], group: 'Address', text: 'the last host of 200.10.11.144/27' });
  assert.deepEqual(L.presetInfo({ label: '[cs-2009:Q59, cs-2009:Q60] Which array is a max-heap?' }).pyq, ['cs-2009:Q59', 'cs-2009:Q60']);
  assert.deepEqual(L.presetInfo({ label: 'Textbook string, 3 frames' }), { pyq: [], group: '', text: 'Textbook string, 3 frames' });
  assert.deepEqual(L.presetInfo({ label: 'Two flips', pyq: 'cs-2017-1:Q32' }).pyq, ['cs-2017-1:Q32'], 'a pyq field works too');
  assert.deepEqual(L.presetInfo({ label: '[not an id] text' }).pyq, [], 'a bracket that is not a question id is just text');
});
test('labs: question ids are written the way the papers print them (P1-38)', () => {
  assert.equal(L.pyqLabel(['cs-2015-3:CS36']), 'GATE 2015 CS · Set 3 · Q36');
  assert.equal(L.pyqLabel(['cs-2012:Q42']), 'GATE 2012 CS · Q42');
  assert.equal(L.pyqLabel(['cs-2015-1:GA9']), 'GATE 2015 CS · Set 1 · GA Q9');
  assert.equal(L.pyqLabel(['cs-2009:Q59', 'cs-2009:Q60']), 'GATE 2009 CS · Q59–60', 'a linked pair reads as one range');
  assert.equal(L.pyqLabel(['cs-2012:Q11', 'cs-2012:Q40']), 'GATE 2012 CS · Q11, Q40');
  assert.equal(L.pyqLabel([]), '');
});
test('labs: the Examples picker lists the GATE papers first, in their authored order (P1-38)', () => {
  const def = { presets: [{ label: 'Lesson example' }, { label: '[cs-2012:Q42] A · one' }, { label: 'Another' }, { label: '[cs-2022:Q64] two' }] };
  const ex = L.examples(def);
  assert.deepEqual(ex.gate.map(r => r.i), [1, 3]);
  assert.deepEqual(ex.other.map(r => r.i), [0, 2]);
});

for (const id of LABS) {
  test(`labs: ${id}: every past-paper example is tagged, its ids are shipped questions, and its label states only the question (P1-38)`, () => {
    const def = defOf(id), bad = [];
    (def.presets || []).forEach((p, i) => {
      const info = L.presetInfo(p), lab = String(p.label);
      const loose = lab.replace(/^\[[^\]]*\]\s*/, '');
      if (/cs-\d{4}(-\d)?:(CS|GA|Q)\d+/.test(loose)) bad.push(`#${i + 1} has an id outside its tag: ${lab}`);
      if (info.pyq.length) {
        info.pyq.forEach(q => { if (!QIDS.has(q)) bad.push(`#${i + 1} cites ${q}, not in the bank`); });
        if (/\(GATE \d{4}\)|GATE \d{4} (set \d )?(CS|Q)\d+/i.test(loose)) bad.push(`#${i + 1} repeats the paper in its text: ${lab}`);
        if (/\(key\b|\banswer:/i.test(loose)) bad.push(`#${i + 1} states the key: ${lab}`);              // '(key 21)'; a hash key ('for key 90') is fine
        if (/→\s*[−-]?[\d.,∞]+\s*\)?\s*$/.test(loose)) bad.push(`#${i + 1} ends with its result: ${lab}`);   // '… → 435'; a given ('λ = 1') is fine
        if (/\(option [A-D]\)/i.test(loose)) bad.push(`#${i + 1} names the right option: ${lab}`);
        if (!info.text || info.text.length < 6) bad.push(`#${i + 1} has no question text`);
      }
    });
    assert.deepEqual(bad, []);
  });
}


/* ---------------------------------------------------------------- program lists (P1-38, part B): the sync lab's protocol and program selects */
test('labs: a select prints a GATE program the paper\'s way inside a "From GATE papers" group; the Given line keeps the plain label (P1-38)', () => {
  const html = L.optionsHtml([['a', 'Peterson', 'Protocols'], ['b', 'Strict alternation', 'From GATE papers (1)', 'cs-2016-2:CS48'], ['c', 'Plain']], 'b');
  assert.match(html, /^<optgroup label="Protocols"><option value="a">Peterson<\/option><\/optgroup><optgroup label="From GATE papers \(1\)"><option value="b" selected>GATE 2016 CS · Set 2 · Q48 — Strict alternation<\/option><\/optgroup><option value="c">Plain<\/option>$/);
  const def = { controls: [{ id: 'program', type: 'seg', label: 'Program', options: [['p', 'Peterson']], value: 'p' }, { id: 'variant', type: 'select', label: 'Entry/exit protocol', options: [['b', 'Strict alternation', 'From GATE papers (1)', 'cs-2016-2:CS48']], value: 'b' }] };
  assert.deepEqual(L.given(def, L._defaults(def)), ['Peterson', 'Entry/exit protocol: Strict alternation']);
});
test('labs: choosing a GATE program in a program list loads the preset tagged with it (P1-38)', () => {
  const def = { presets: [{ label: 'Lesson run', values: { variant: 'peterson' } }, { label: '[cs-2016-2:CS48] Strict alternation: which requirement fails?', values: { program: 'peterson', variant: 'strict' } }] };
  assert.equal(L.gatePresetFor(def, 'variant', 'strict'), 1);
  assert.equal(L.gatePresetFor(def, 'variant', 'peterson'), -1, 'an untagged preset is not a GATE example');
  assert.equal(L.gatePresetFor(def, 'example', 'strict'), -1);
});
for (const id of LABS) {
  test(`labs: ${id}: every GATE program in a select names a shipped question, has a tagged preset, and its label names no paper or option (P1-38)`, () => {
    const def = defOf(id), bad = [];
    for (const c of def.controls || []) {
      for (const o of c.options || []) {
        const lab = String(o[1]);
        if (/GATE \d{4}|cs-\d{4}(-\d)?:(CS|GA|Q)\d+/.test(lab)) bad.push(`${c.id}/${o[0]}: the label names a paper (give the option a question id instead): ${lab}`);
        if (/\(option [A-D]\)|option \([A-D]\)|answer \(?[A-D]\)?/i.test(lab)) bad.push(`${c.id}/${o[0]}: the label names an option: ${lab}`);
        if (!o[3]) continue;
        if (!QIDS.has(o[3])) bad.push(`${c.id}/${o[0]}: ${o[3]} is not in the bank`);
        if (c.type !== 'select' || !c.examples) bad.push(`${c.id}: a list with GATE programs is a select with examples: true`);
        if (L.gatePresetFor(def, c.id, o[0]) < 0) bad.push(`${c.id}/${o[0]}: no preset tagged ${o[3]} loads it`);
        else if (!L.presetInfo(def.presets[L.gatePresetFor(def, c.id, o[0])]).pyq.includes(o[3])) bad.push(`${c.id}/${o[0]}: its preset cites another question`);
      }
    }
    assert.deepEqual(bad, []);
  });
}

/* ---------------------------------------------------------------- P2-59: one blurb per lab */
test('labs: every lab has one verb-first blurb of at most 120 characters, the same on its card (content/labs.json) and its page (P2-59)', () => {
  const cat = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/labs.json'), 'utf8'));
  const VERBS = /^(Run|Step|Serve|Translate|Place|Explore|Work|Watch|Build|Type|Insert|Split|Compute|Find|Test|Fill|Row-reduce|Convert|Minimise|Clock)\b/;
  const bad = [];
  for (const l of cat.filter(x => x.status !== 'planned')) {
    const def = defOf(l.id);
    if (def.blurb !== l.blurb) bad.push(`${l.id}: the page says "${String(def.blurb).slice(0, 50)}…", the card "${String(l.blurb).slice(0, 50)}…"`);
    if (String(l.blurb).length > 120) bad.push(`${l.id}: ${l.blurb.length} characters`);
    if (!VERBS.test(l.blurb)) bad.push(`${l.id}: not verb-first: ${l.blurb}`);
    if (/graph you draw|^Draw K-maps/i.test(l.blurb)) bad.push(`${l.id}: promises drawing the lab does not have`);
  }
  assert.deepEqual(bad, []);
});
