/* Spot the Strategy Lab (app/js/labs/spot-strategy.js): every case's answer is checked against ICAI's Suggested Answer (RTPs, MTPs, past
   papers) or the Study Material's own example, every clue is really in its case, and the frames, the marks and the challenge are checked
   on every case. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const LAB = require('../app/js/labs/spot-strategy.js');
const { CASES, FAMILIES, findClues, markText, compute, def, sync } = LAB;
const base = () => L._defaults(def);
const byId = Object.fromEntries(CASES.map(c => [c.id, c]));
const run = v => compute(L.prepare(def, Object.assign(base(), v)));
const plain = html => html.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const token = w => new RegExp('(^|[^0-9A-Za-z.])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![0-9A-Za-z]|\\.[0-9])', 'i');

/* ---------------------------------------------------------------- ICAI's answers */
const ICAI = {
  'g-elite': ['Focused differentiation', 'RTP September 2026 Q13'], 'g-pearl': ['Differentiation', 'PYQ May 2026 Q5(b)'],
  'g-budget': ['Cost leadership', 'MTP May 2025 Series II'], 'g-eco': ['Focused differentiation', 'MTP May 2025 Series II'], 'g-vogue': ['Differentiation', 'MTP May 2025 Series II'],
  'g-elitew': ['Focused differentiation', 'RTP May 2025 Q11'], 'g-abc': ['Differentiation', 'RTP May 2024 Q11'], 'g-xxp': ['Differentiation', 'RTP September 2024 Q11'],
  'a-tooth': ['Market penetration', 'Descriptive Q4(i)'], 'a-hotel': ['Diversification', 'Descriptive Q4(ii)'], 'a-uv': ['Market development', 'Descriptive Q4(iii)'],
  'a-scooter': ['Product development', 'Descriptive Q4(iv)'], 'a-phone': ['Market penetration', 'RTP September 2025 MCQ 5'], 'a-gho': ['Market penetration', 'RTP September 2026'],
  'i-gho': ['Forward integration', 'RTP September 2026'], 'i-rajesh': ['Conglomerate diversification', 'RTP May 2026 MCQ 6'],
  'c-mm': ['Stability', 'PYQ May 2026 Q5(c)'],
  'r-maai23': ['Turnaround', 'PYQ May 2025 Q5(c)'], 'r-maai24': ['Divestment', 'PYQ May 2025 Q5(c)'], 'r-prime': ['Liquidation', 'RTP September 2026 MCQ 5'],
  'r-cloth': ['Turnaround', 'RTP September 2025 MCQ 6'], 'r-symergy': ['Turnaround', 'PYQ September 2024 Q5(b)'],
  'm-green': ['Key players', 'PYQ September 2025 MCQ 13'], 'm-ngo': ['Key players', 'RTP May 2026'], 'm-health': ['Keep informed', 'RTP September 2025 MCQ 4'],
  'l-rohan': ['Functional level', 'RTP May 2026 MCQ 2'], 'l-bev': ['Functional level', 'RTP September 2025 MCQ 2'], 'l-alpha': ['Corporate level', 'RTP September 2026 MCQ 2'],
  'p-intro': ['Introduction', 'RTP September 2024 Q9'], 'p-growth': ['Growth', 'RTP September 2024 Q9'],
  'b-sugar': ['Star', 'PYQ January 2025 Q5(c)'], 'b-xyz': ['Star', 'RTP May 2024 Q13'], 'b-innov': ['Cash cow', 'MTP May 2026 Series II'], 'b-scooter': ['Cash cow', 'RTP May 2026']
};
const SM = {
  'g-phones': 'Best-cost provider', 'a-gucci': 'Product development', 'i-farms': 'Backward integration', 'i-coffee': 'Forward integration', 'i-textile': 'Horizontal integration',
  'i-shoes': 'Concentric diversification', 'i-cement': 'Conglomerate diversification', 'm-gst': 'Key players', 'l-adani': 'Corporate level', 'p-phone': 'Decline',
  's-brand': 'Strength', 's-auto': 'Weakness', 's-tech': 'Opportunity', 's-online': 'Threat', 'b-coufix': 'Star'
};
test(`ICAI's Suggested Answers: ${Object.keys(ICAI).length} cases from RTPs, MTPs and past papers carry ICAI's answer and name their source`, () => {
  for (const [id, [ans, src]] of Object.entries(ICAI)) {
    const c = byId[id];
    assert.ok(c, id); assert.equal(c.answer, ans, id); assert.ok(c.src.includes(src), `${id}: ${c.src}`);
    assert.equal(run({ case: id }).sim.answer, ans);
  }
});
test(`the Study Material's own examples and illustrations (${Object.keys(SM).length}) carry the Study Material's answer`, () => {
  for (const [id, ans] of Object.entries(SM)) { assert.equal(byId[id].answer, ans, id); assert.match(byId[id].src, /Study Material|SM /, id); }
});

/* ---------------------------------------------------------------- the bank */
test('every case: a known family, an answer among its options, at least one clue, every clue really in the text, and the text never names the answer', () => {
  const ids = new Set();
  for (const c of CASES) {
    assert.ok(!ids.has(c.id), 'unique id ' + c.id); ids.add(c.id);
    const F = FAMILIES[c.fam];
    assert.ok(F, c.id); assert.ok(F.opts.some(o => o[0] === c.answer), c.id + ': ' + c.answer);
    assert.ok(c.clues.length >= 1 && c.why.length > 20, c.id);
    const found = findClues(c.text, c.clues);
    for (let i = 1; i < found.length; i++) assert.ok(found[i].at >= found[i - 1].at + found[i - 1].len, c.id + ': clues do not overlap');
    assert.ok(!token(c.answer).test(c.text), `${c.id}: the case text names its own answer "${c.answer}"`);
    assert.ok(!token(c.answer).test(c.title), `${c.id}: the title names the answer`);
  }
  assert.throws(() => findClues('abc', [['xyz', 'n']]), /clue not in the text/);
});
test('coverage: ten families from five chapters, at least three cases each, and most cases are ICAI\'s own', () => {
  assert.equal(Object.keys(FAMILIES).length, 10);
  for (const f of Object.keys(FAMILIES)) assert.ok(CASES.filter(c => c.fam === f).length >= 3, f);
  assert.ok(CASES.filter(c => c.src).length >= 45, CASES.filter(c => c.src).length + ' sourced cases');
  assert.ok(!Object.keys(FAMILIES).some(f => /tows/i.test(f)), 'TOWS is not in the current Study Material');
  for (const f of Object.values(FAMILIES)) assert.ok(f.opts.length >= 3 && f.how.length > 20 && /Study Material \d/.test(f.sm));
});

/* ---------------------------------------------------------------- frames and marks */
test('frames: the plain case, one frame per clue (marks grow by one, the newest ringed), then the answer with the options table', () => {
  for (const c of CASES) {
    const res = run({ case: c.id });
    assert.equal(res.frames.length, c.clues.length + 2, c.id);
    res.frames.forEach((f, k) => {
      const html = f.view[0].html, marks = (html.match(/<mark\b/g) || []).length;
      assert.equal(marks, Math.min(k, c.clues.length), c.id + ' frame ' + k);
      if (k >= 1 && k <= c.clues.length) assert.equal((html.match(/<mark class="now">/g) || []).length, 1);
      assert.ok(plain(html).includes(c.text), c.id + ': the marks never change the words');
    });
    const last = res.frames[res.frames.length - 1], t = last.view[1];
    const i = FAMILIES[c.fam].opts.findIndex(o => o[0] === c.answer);
    assert.equal(t.cells[i + ',0'], 'ok'); assert.equal(Object.keys(t.cells).length, 2);
    diagram.render(t);
    assert.match(last.caption, new RegExp('\\*\\*' + c.answer.replace(/[()]/g, '\\$&') + '\\*\\*'));
  }
});
test('marks escape the text: a case with < & " stays well-formed', () => {
  const t = 'A & B said "<cheap>" twice', f = findClues(t, [['"<cheap>"', 'n']]);
  assert.equal(markText(t, f, 1), 'A &amp; B said <mark class="now">&quot;&lt;cheap&gt;&quot;</mark> twice');
});
test('the family list and the case list stay in step', () => {
  const v = Object.assign(base(), { fam: 'mendelow' }); sync(v);
  assert.equal(byId[v.case].fam, 'mendelow', 'choosing a family shows its first case');
  v.case = 'b-coufix'; sync(v);
  assert.equal(v.fam, 'bcg', 'choosing a case of another family switches the family');
  const w = Object.assign(base(), { fam: 'all', case: 'p-phone' }); sync(w);
  assert.equal(w.case, 'p-phone'); assert.equal(w.fam, 'all', '"Any concept" keeps any case');
  assert.throws(() => compute(Object.assign(base(), { case: 'nope' })), /Choose a case/);
});

/* ---------------------------------------------------------------- the challenge */
test('challenge: every family draws its own cases (any concept draws them all), with one right choice and an unmarked card', () => {
  for (const fam of ['all'].concat(Object.keys(FAMILIES))) {
    const seen = new Set();
    for (let s = 1; s <= 80; s++) {
      const P = L.problem(def, Object.assign(base(), { fam }), s * 7919);
      const c = P.result.sim.case;
      if (fam !== 'all') assert.equal(c.fam, fam);
      seen.add(c.id);
      const spec = L.answerSpec(def, P.values, P.result, P.want);
      assert.equal(spec.kind, 'choice');
      assert.equal(spec.choices.filter(x => L.check(spec, x[0], P.want).ok).length, 1);
      const view = def.challenge.view(P.result, P.values)[0].html;
      assert.ok(!/<mark/.test(view), 'no clue is marked while asking');
      assert.ok(def.challenge.explain(P.result, P.values).includes(c.answer));
    }
    if (fam !== 'all') assert.ok(seen.size >= Math.min(3, CASES.filter(c => c.fam === fam).length), fam + ' draws several cases');
  }
});
test('presets: every example computes; five cite ICAI papers', () => {
  for (const p of def.presets) assert.ok(run(p.values).frames.length >= 3, p.label);
  assert.ok(def.presets.filter(p => /^(RTP|PYQ|MTP) /.test(p.label)).length >= 5);
});
