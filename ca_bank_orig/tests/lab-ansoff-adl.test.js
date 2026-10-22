/* Ansoff and ADL Lab (app/js/labs/ansoff-adl.js): Ansoff's product-market growth matrix and the Arthur D. Little strategic condition matrix,
   checked against the ICAI Study Material (Paper 6B chapter 4: 4.2.2.3, 4.4.1, 4.4.2; the ADL figure on page 4.26, read from the rendered
   page) and ICAI's Suggested Answers, plus exhaustive and random cross-checks. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const LAB = require('../app/js/labs/ansoff-adl.js');
const { classifyMove, parseNewness, adlCell, compute, def, ANS, ADL, ADL_COLOR, CASES, ADL_CASES, POS, STAGE, kin } = LAB;
const base = () => L._defaults(def);
const caseById = id => CASES.find(c => c.id === id);
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const shapesOf = fr => fr.view.find(x => x.type === 'shapes');

/* ---------------------------------------------------------------- Ansoff */
test('Ansoff: the four cells and the Study Material\'s layout (existing / new products across, existing / new markets down)', () => {
  assert.equal(classifyMove('existing', 'existing'), 'pen'); assert.equal(classifyMove('existing', 'new'), 'md');
  assert.equal(classifyMove('new', 'existing'), 'pd'); assert.equal(classifyMove('new', 'new'), 'div');
  const fig = shapesOf(compute(base()).frames[0]);
  const at = t => fig.items.find(i => i.kind === 'text' && i.t === t).at;
  assert.ok(at('Market penetration')[0] < 5 && at('Market penetration')[1] > 3.2, 'penetration top-left');
  assert.ok(at('Product development')[0] > 5 && at('Product development')[1] > 3.2, 'product development top-right');
  assert.ok(at('Market development')[0] < 5 && at('Market development')[1] < 3.2, 'market development bottom-left');
  assert.ok(at('Diversification')[0] > 5 && at('Diversification')[1] < 3.2, 'diversification bottom-right');
  assert.match(ANS.div.def, /risky/);
});
test('Ansoff, SM Test Your Knowledge Descriptive Q4 (answer p. 4.49): toothpaste penetration, hotel → dairy diversification, UV maker abroad market development, ungeared scooters product development', () => {
  const res = compute(Object.assign(base(), def.presets[1].values));
  assert.deepEqual(res.sim.list.map(m => ANS[m.key].name), ['Market penetration', 'Diversification', 'Market development', 'Product development']);
  for (const id of ['sm-toothpaste', 'sm-hotel', 'sm-uv', 'sm-scooter']) assert.match(caseById(id).src, /Descriptive Q4/);
});
test('Ansoff, Study Material 4.4.1: Gucci\'s four examples, including new designs in Europe as market penetration', () => {
  const res = compute(Object.assign(base(), def.presets[2].values));
  assert.deepEqual(res.sim.list.map(m => m.key), ['pen', 'md', 'pd', 'div']);
  assert.match(res.note, /new designs inside the same product line do not/);
});
test('Ansoff, RTP September 2025 MCQ 5 (phone maker: discounts, advertising and more retailers in its home country): market penetration, option (a)', () => {
  const res = compute(Object.assign(base(), def.presets[3].values));
  assert.equal(res.sim.list[0].key, 'pen');
  assert.match(ANS.pen.def, /advertising or personal selling/);
});
test('Ansoff: newness words and their synonyms; anything else is refused with the move named', () => {
  assert.deepEqual(['existing', ' Existing ', 'e', 'current', 'present', 'old', 'same'].map(parseNewness), Array(7).fill('existing'));
  assert.deepEqual(['new', 'N', 'modified', 'changed', 'different'].map(parseNewness), Array(5).fill('new'));
  assert.equal(parseNewness('?'), '?'); assert.equal(parseNewness('maybe'), null);
  assert.throws(() => compute(Object.assign(base(), { moves: [['Odd move', 'maybe', 'new']] })), /Odd move: Type the product as "existing" or "new"/);
  assert.throws(() => compute(Object.assign(base(), { moves: [['X', 'new', '?']] })), /market/);
  assert.throws(() => compute(Object.assign(base(), { moves: [] })), /at least one move/);
});
test('Ansoff frames: the empty grid, three frames per move (product question, market question, placement), then all with the expansion grid', () => {
  const res = compute(base()), n = res.sim.list.length;
  assert.equal(res.frames.length, 3 * n + 2);
  const dots = res.frames.map(f => shapesOf(f).items.filter(i => i.kind === 'circle').length);
  assert.deepEqual(dots, [0].concat(...res.sim.list.map((m, i) => [i, i, i + 1])).concat([n]));
  assert.match(res.frames[1].caption, /is the product new to the firm/); assert.match(res.frames[2].caption, /is the market new to the firm/);
  const grid = res.frames[res.frames.length - 1].view[1];
  assert.equal(grid.type, 'table'); assert.match(JSON.stringify(grid.rows), /increase product usage/); assert.match(JSON.stringify(grid.rows), /expand geographically/);
  res.frames.forEach(f => f.view.forEach(x => diagram.render(x)));
});
test('Ansoff brute force: 1,000 random move lists: every dot lands in the cell of its product and market, and the four counts add up', () => {
  const r = lcg(17), W = 5, H = 3.2;
  for (let k = 0; k < 1000; k++) {
    const n = 1 + Math.floor(r() * 8), moves = Array.from({ length: n }, (_, i) => ['M' + i, r() < 0.5 ? 'existing' : 'new', r() < 0.5 ? 'existing' : 'new']);
    const res = compute(Object.assign(base(), { mode: 'ansoff', moves }));
    const dots = shapesOf(res.frames[res.frames.length - 1]).items.filter(i => i.kind === 'circle');
    assert.equal(dots.length, n);
    dots.forEach((d, i) => {
      const [x, y] = d.c, pNew = moves[i][1] === 'new', mNew = moves[i][2] === 'new';
      assert.equal(x > W, pNew, 'new products are drawn on the right'); assert.equal(y < H, mNew, 'new markets are drawn in the lower row');
    });
    assert.equal(res.stats.reduce((s, t) => s + +t.value, 0), n);
  }
});

/* ---------------------------------------------------------------- ADL */
test('ADL: the 20 cells of the Study Material\'s figure (page 4.26, read from the rendered page)', () => {
  assert.deepEqual(adlCell('dominant', 'embryonic').strategies, ['Fast grow', 'Build barriers', 'Act offensively']);
  assert.deepEqual(adlCell('dominant', 'ageing').strategies, ['Defend position', 'Renew', 'Focus', 'Consider withdrawal']);
  assert.deepEqual(adlCell('strong', 'growth').strategies, ['Differentiate', 'Lower cost', 'Attack small firms']);
  assert.deepEqual(adlCell('favourable', 'mature').strategies, ['Focus', 'Differentiate', 'Harvest', 'Find niche', 'Hold niche', 'Turnaround', 'Grow with industry', 'Hit smaller firms']);
  assert.deepEqual(adlCell('tenable', 'growth').strategies, ['Hold niche', 'Turnaround', 'Focus', 'Grow with industry', 'Withdraw']);
  assert.deepEqual(adlCell('weak', 'embryonic').strategies, ['Find niche', 'Catch-up', 'Grow with industry']);
  assert.deepEqual(adlCell('weak', 'ageing').strategies, ['Withdraw']);
  const total = POS.reduce((s, p) => s + STAGE.reduce((t, st) => t + ADL[p][st].length, 0), 0);
  assert.equal(total, 3 + 5 + 5 + 4 + 2 + 3 + 4 + 3 + 3 + 3 + 8 + 2 + 2 + 5 + 3 + 2 + 3 + 3 + 2 + 1, 'every strategy of the figure, counted cell by cell');
  assert.equal(POS.length * STAGE.length, 20, 'a four by five matrix');
});
test('ADL colours: green when position index + stage index ≤ 3, orange at 4, red from 5 (dominant = 0, embryonic = 0): the figure\'s pattern, every cell', () => {
  POS.forEach((p, i) => STAGE.forEach((s, j) => assert.equal(ADL_COLOR[p][s], i + j <= 3 ? 'green' : i + j === 4 ? 'orange' : 'red', p + ' × ' + s)));
});
test('ADL, PYQ September 2025 MCQ 14 (Bio Cure: leading position, maturing industry): strong position in a mature industry, option (B)', () => {
  const res = compute(Object.assign(base(), def.presets[4].values));
  assert.equal(res.sim.cell.pos, 'strong'); assert.equal(res.sim.cell.stage, 'mature');
  assert.deepEqual(res.sim.cell.strategies, ['Lower cost', 'Focus', 'Differentiate', 'Grow with industry']);
  const bio = ADL_CASES.find(c => c.id === 'biocure');
  assert.equal(bio.pos + '/' + bio.stage, 'strong/mature'); assert.match(bio.src, /PYQ September 2025 MCQ 14/);
});
test('ADL, MTP May 2026 Series II MCQ (A)(ii): a Question mark under BCG can be "Dominant" under ADL (technological leadership), option (b)', () => {
  const res = compute(Object.assign(base(), def.presets[5].values));
  assert.equal(res.sim.cell.pos, 'dominant');
  assert.match(res.frames[2].caption, /strong and protected technological leadership/);
  assert.match(res.frames[0].caption, /product life cycle/, 'ADL reads the industry\'s maturity, not market share and growth');
});
test('ADL frames: the matrix, its column, its row, the cell, then the strategy list; the table spec renders', () => {
  const res = compute(Object.assign(base(), { mode: 'adl', unit: 'X', pos: 'tenable', stage: 'mature' }));
  assert.equal(res.frames.length, 5);
  const t = res.frames.map(f => f.view[0]);
  assert.deepEqual(Object.values(t[1].cells), Array(5).fill('d'), 'the Mature column');
  assert.equal(t[2].cells['3,0'], 'd', 'the Tenable row label');
  assert.deepEqual(t[3].cells, { '3,3': 'b' }, 'only the cell, in its red');
  assert.deepEqual(res.frames[4].view[0].rows.map(r => r[1]), ['Turnaround', 'Hold niche', 'Retrench'], 'the strategy list first, so a lesson embed shows it');
  assert.deepEqual(res.frames[4].view[1].cells, { '3,3': 'b' });
  res.frames.forEach(f => f.view.forEach(x => diagram.render(x)));
  assert.throws(() => compute(Object.assign(base(), { mode: 'adl', pos: 'mighty' })), /competitive position/);
  assert.throws(() => compute(Object.assign(base(), { mode: 'adl', stage: 'old' })), /stage of industry maturity/);
});

/* ---------------------------------------------------------------- the challenge */
test('challenge: every Ansoff case and every ADL problem has exactly one right choice, and no wrong choice is a near-synonym of a right one', () => {
  for (const mode of ['ansoff', 'adl']) {
    for (let s = 1; s <= 120; s++) {
      const P = L.problem(def, Object.assign(base(), { mode }), s * 7919);
      assert.equal(P.result.sim.mode, mode);
      const spec = L.answerSpec(def, P.values, P.result, P.want);
      const right = spec.choices.filter(c => L.check(spec, c[0], P.want).ok);
      assert.equal(right.length, 1, JSON.stringify(P.values));
      if (mode === 'adl' && P.values.ask === 'strategy') {
        const cell = P.result.sim.cell.strategies;
        spec.choices.filter(c => c[0] !== P.want).forEach(c => assert.ok(!cell.some(x => kin(x, c[0])), `${c[0]} is too close to ${cell.join(', ')}`));
      }
      if (mode === 'ansoff') {
        const c = caseById(P.values.quiz);
        assert.deepEqual(P.values.moves, [[c.short, '?', '?']], 'the inputs show the move but not its answer');
        assert.equal(P.want, ANS[classifyMove(c.p, c.m)].name);
      }
      const view = JSON.stringify(def.challenge.view(P.result, P.values));
      assert.ok(!/penetration|development|Diversification|Fast grow|Withdraw|Harvest/.test(view), 'the test picture is blank');
    }
  }
});
test('every case in the bank: its text never names its own answer, and ICAI\'s cases cite their source', () => {
  for (const c of CASES) {
    const ans = ANS[classifyMove(c.p, c.m)].name.toLowerCase();
    assert.ok(!c.text.toLowerCase().includes(ans), c.id);
    assert.ok(c.why && c.short.length <= 32, c.id);
  }
  assert.ok(CASES.filter(c => /SM Test Your Knowledge|RTP|Study Material/.test(c.src || '')).length >= 9);
});
test('presets: every example computes; ICAI documents are named in the labels', () => {
  for (const p of def.presets) assert.ok(compute(Object.assign(base(), p.values)).frames.length >= 5, p.label);
  assert.ok(def.presets.some(p => /PYQ September 2025 MCQ 14/.test(p.label)) && def.presets.some(p => /RTP September 2025 MCQ 5/.test(p.label)));
});
