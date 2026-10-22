/* Portfolio Matrices Lab (app/js/labs/bcg-ge.js): the BCG growth-share matrix and the GE nine-cell grid, checked against the ICAI Study
   Material (Paper 6B chapter 4, 4.4.3 and 4.4.4) and ICAI's Suggested Answers, plus brute-force cross-checks on random portfolios. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const LAB = require('../app/js/labs/bcg-ge.js');
const { bcgClassify, geClassify, parseLevel, compute, def, QUAD } = LAB;
const base = () => L._defaults(def);
const byName = list => Object.fromEntries(list.map(u => [u.name, u]));
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const shapesOf = fr => fr.view.find(x => x.type === 'shapes');
const circles = fig => fig.items.filter(i => i.kind === 'circle' && i.r >= 0.2);

/* ---------------------------------------------------------------- BCG: Study Material */
test('BCG, SM Test Your Knowledge Descriptive Q2 (Soorya Ltd., two-firm industry): A Star, B Question mark, C Cash cow, D Dog (SM answer, p. 4.47)', () => {
  // only two firms, so the rival holds 100 − own share: A 80/20 = 4×, B 40/60, C 60/40 = 1.5×, D 5/95
  const res = compute(Object.assign(base(), def.presets[1].values));
  const u = byName(res.sim.list);
  assert.deepEqual(['A', 'B', 'C', 'D'].map(n => u[n].quad), ['star', 'qm', 'cow', 'dog']);
  approx(u.A.rms, 4); approx(u.B.rms, 2 / 3); approx(u.C.rms, 1.5); approx(u.D.rms, 5 / 95);
  assert.deepEqual(res.stats.map(s => s.value), ['1', '1', '1', '1']);
  // the answer's split (+15 %, +10 % high; −20 %, −10 % low) holds for any growth line from just above −10 % up to +10 %
  for (const cut of [-9, -5, 0, 5, 10]) {
    const r = compute(Object.assign(base(), def.presets[1].values, { cutGrowth: cut }));
    assert.deepEqual(r.sim.list.map(x => x.quad), ['star', 'qm', 'cow', 'dog'], 'growth line ' + cut);
  }
  assert.equal(compute(Object.assign(base(), def.presets[1].values, { cutGrowth: 11 })).sim.list[1].quad, 'dog', 'a line above +10 % makes B a low-growth SBU');
});
test('BCG, SM illustration "Coufix" (p. 4.29): 60 % share within six months of launch in a growing market is a Star', () => {
  const [c] = bcgClassify([{ name: 'Coufix', revenue: 80, share: 60, rival: 25, growth: 35 }], {});
  assert.equal(c.quad, 'star'); assert.equal(c.strategy, 'Build');
});
test('BCG, PYQ January 2025 Q5(c) ("Say no to Sugar", major share, growing rapidly): a Star, Build or Hold; Harvest and Divest unsuitable', () => {
  const [s] = bcgClassify([{ name: 'Say no to Sugar', revenue: 50, share: 45, rival: 20, growth: 30 }], {});
  assert.equal(s.quad, 'star');
  assert.equal(QUAD.star.strategy, 'Build');
  assert.match(QUAD.star.why, /Hold/); assert.match(QUAD.star.why, /never Harvest or Divest/);
});
test('BCG strategies, RTP May 2026 Q14 and MTP January 2025 Series II answers: Stars Build, Cash cows Harvest, Question marks Hold, Dogs Divest', () => {
  assert.deepEqual(Object.fromEntries(Object.values(QUAD).map(q => [q.name, q.strategy])), { Star: 'Build', 'Question mark': 'Hold', 'Cash cow': 'Harvest', Dog: 'Divest' });
  assert.match(QUAD.dog.why, /divestment or liquidation/, 'SM 4.4.3: Dogs should be minimised by means of divestment or liquidation');
  assert.match(QUAD.qm.why, /cash traps/);
});
test('BCG, RTP May 2026 Q1(iv) (EcoRide: scooters a Cash cow, e-bikes a Star): harvest the scooters and invest in the e-bikes, option (c)', () => {
  const list = bcgClassify([{ name: 'Scooters', revenue: 300, share: 30, rival: 18, growth: 3 }, { name: 'E-bikes', revenue: 80, share: 28, rival: 12, growth: 40 }], {});
  assert.deepEqual(list.map(u => [u.quad, u.strategy]), [['cow', 'Harvest'], ['star', 'Build']]);
});
test('BCG, RTP May 2024 Q13 (XYZ Corporation): the newly established software unit in a high-growth market with a leading share is the Star', () => {
  const list = bcgClassify([
    { name: 'Consumer electronics', revenue: 900, share: 25, rival: 20, growth: 4 },
    { name: 'E-commerce', revenue: 300, share: 8, rival: 30, growth: 25 },
    { name: 'Industrial machinery', revenue: 500, share: 6, rival: 22, growth: 2 },
    { name: 'Software', revenue: 120, share: 30, rival: 18, growth: 28 }], {});
  assert.deepEqual(list.filter(u => u.quad === 'star').map(u => u.name), ['Software']);
});

test('BCG, MTP May 2026 Series II MCQ (A)(i) (InnovateCo\'s home appliances: mature, steady cash flow, low growth): a Cash cow funds the growth areas, option (b)', () => {
  const [h] = bcgClassify([{ name: 'Home appliances', revenue: 500, share: 30, rival: 20, growth: 2 }], {});
  assert.equal(h.quad, 'cow');
  assert.match(QUAD.cow.why, /generate cash/); assert.match(QUAD.cow.why, /use it for Stars and Question marks/);
});

/* ---------------------------------------------------------------- BCG: the drawing and the frames */
test('BCG frames: the empty matrix, then two frames per SBU (read the share and growth, then place it), then the whole portfolio', () => {
  const res = compute(base());
  const n = res.sim.list.length;
  assert.equal(res.frames.length, 2 * n + 2);
  assert.match(res.frames[0].caption, /high share on the left/);
  res.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 40, 'frame ' + i); f.view.forEach(x => diagram.render(x)); });
  const placed = res.frames.map(f => circles(shapesOf(f)).length);
  assert.deepEqual(placed, [0].concat(...res.sim.list.map((u, i) => [i, i + 1])).concat([n]), 'each placement adds one bubble');
  assert.match(res.frames[1].caption, /34 ÷ 18 = \*\*1\.89×\*\*/, 'the relative share is worked out');
  assert.match(res.frames[2].caption, /\*\*Cash cow\*\*/);
  const fig = shapesOf(res.frames[0]);
  const labels = fig.items.filter(i => i.kind === 'text').map(i => i.t);
  assert.ok(['Stars', 'Question marks', 'Cash cows', 'Dogs'].every(q => labels.includes(q)));
  const at = q => fig.items.find(i => i.kind === 'text' && i.t === q).at;
  assert.ok(at('Stars')[0] < 5 && at('Stars')[1] > 4 && at('Question marks')[0] > 5 && at('Cash cows')[1] < 4 && at('Dogs')[0] > 5 && at('Dogs')[1] < 4, 'the Study Material\'s layout: Stars top-left, Question marks top-right, Cash cows bottom-left, Dogs bottom-right');
});
test('BCG brute force: on 2,000 random portfolios the quadrant is (share ÷ rival ≥ line, growth ≥ line) and the bubble is drawn inside it', () => {
  const r = lcg(11);
  for (let k = 0; k < 2000; k++) {
    const n = 1 + Math.floor(r() * 8), cutShare = [0.5, 1, 1.5, 2][k % 4], cutGrowth = [0, 5, 10, 15][(k >> 2) % 4];
    const rows = Array.from({ length: n }, (_, i) => { const share = 1 + Math.floor(r() * 60), rival = 1 + Math.floor(r() * (99 - share)); return ['U' + i, 1 + Math.floor(r() * 500), share, rival, -30 + Math.floor(r() * 80)]; });
    const res = compute(Object.assign(base(), { mode: 'bcg', shareMode: 'pct', units: rows, cutShare, cutGrowth }));
    const last = shapesOf(res.frames[res.frames.length - 1]), cs = circles(last);
    assert.equal(cs.length, n);
    res.sim.list.forEach((u, i) => {
      const hs = rows[i][2] / rows[i][3] >= cutShare, hg = rows[i][4] >= cutGrowth;
      const want = hg ? (hs ? 'star' : 'qm') : (hs ? 'cow' : 'dog');
      assert.equal(u.quad, want, JSON.stringify(rows[i]));
      const [x, y] = cs[i].c;
      assert.equal(x < 5, hs, 'drawn on the correct side of the share line'); assert.equal(y > 4, hg, 'drawn on the correct side of the growth line');
    });
    const t = res.stats.reduce((s, x) => s + +x.value, 0);
    assert.equal(t, n, 'the four counts add up to the SBUs');
  }
});
test('BCG with relative shares typed as multiples gives the same quadrants as own % ÷ rival %', () => {
  const r = lcg(5);
  for (let k = 0; k < 300; k++) {
    const share = 1 + Math.floor(r() * 60), rival = 1 + Math.floor(r() * (99 - share)), growth = -20 + Math.floor(r() * 50);
    const a = bcgClassify([{ name: 'X', revenue: 5, share, rival, growth }], {})[0];
    const b = bcgClassify([{ name: 'X', revenue: 5, share: share / rival, growth }], { rel: true })[0];
    assert.equal(a.quad, b.quad);
  }
});
test('BCG input errors say what to fix', () => {
  const one = o => bcgClassify([Object.assign({ name: 'X', revenue: 10, share: 20, rival: 30, growth: 5 }, o)], {});
  assert.throws(() => one({ share: 70, rival: 40 }), /more than 100%/);
  assert.throws(() => one({ revenue: 0 }), /revenue must be more than 0/);
  assert.throws(() => one({ rival: 0 }), /largest rival's share/);
  assert.throws(() => bcgClassify([{ name: 'X', revenue: 1, share: 1, rival: 2, growth: 1 }, { name: 'x', revenue: 1, share: 1, rival: 2, growth: 1 }], {}), /different name/);
  assert.throws(() => bcgClassify([{ name: 'X', revenue: 1, share: 0, growth: 1 }], { rel: true }), /relative market share/);
  assert.throws(() => compute(Object.assign(base(), { cutShare: 0 })), /high-share line/);
  // forgiving amounts: '1,250' and '₹ 420' are numbers
  const res = compute(Object.assign(base(), { units: [['A', '1,250', '30', '20', '12'], ['B', '₹ 420', '10', '40', '-5']] }));
  assert.deepEqual(res.sim.list.map(u => [u.revenue, u.quad]), [[1250, 'star'], [420, 'dog']]);
});

/* ---------------------------------------------------------------- GE nine-cell */
test('GE: the nine cells are exactly those of the Study Material\'s figure (p. 4.31)', () => {
  const want = { 'high,strong': 'Invest/Expand', 'high,average': 'Invest/Expand', 'high,weak': 'Select/Earn', 'medium,strong': 'Invest/Expand', 'medium,average': 'Select/Earn',
    'medium,weak': 'Harvest/Divest', 'low,strong': 'Select/Earn', 'low,average': 'Harvest/Divest', 'low,weak': 'Harvest/Divest' };
  for (const [k, s] of Object.entries(want)) { const [a, b] = k.split(','); assert.equal(geClassify([{ name: 'X', attr: a, str: b }])[0].strategy, s, k); }
});
test('GE, PYQ September 2025 MCQ 16: high market attractiveness and strong business strength → Invest/Expand, option (A)', () => {
  assert.equal(geClassify([{ name: 'X', attr: 'High', str: 'Strong' }])[0].strategy, 'Invest/Expand');
});
test('GE, PYQ May 2026 MCQ 16: the two dimensions are business strength and market attractiveness, option (A)', () => {
  const res = compute(Object.assign(base(), { mode: 'ge' }));
  assert.match(res.frames[0].caption, /market attractiveness/); assert.match(res.frames[0].caption, /business strength/);
  const t = shapesOf(res.frames[0]).items.filter(i => i.kind === 'text').map(i => i.t);
  assert.ok(t.includes('Business strength') && t.some(x => /Market attractiveness/.test(x)));
  assert.ok(!/market share|growth rate/i.test(t.join(' ')), 'not BCG\'s share and growth');
});
test('GE, RTP January 2025 Q13 (InnovaTech): AI solutions (high, strong) get the go-ahead to invest; legacy software (low, weak) is harvested', () => {
  const res = compute(Object.assign(base(), def.presets[4].values));
  const u = byName(res.sim.list);
  assert.equal(u['AI solutions'].strategy, 'Invest/Expand'); assert.equal(u['AI solutions'].zone, 'green');
  assert.equal(u['Legacy software'].strategy, 'Harvest/Divest'); assert.equal(u['Legacy software'].zone, 'red');
});
test('GE, RTP September 2026 Q14 (EcoBuild: medium strength, low attractiveness): the Study Material\'s cell is red; the RTP\'s yellow reading is flagged', () => {
  const res = compute(Object.assign(base(), def.presets[5].values));
  assert.equal(res.sim.list[0].zone, 'red'); assert.equal(res.sim.list[0].strategy, 'Harvest/Divest');
  assert.match(res.note, /RTP for September 2026 \(Q14\)/); assert.match(res.note, /selective/);
  const N = L.notesOf(res.note);
  assert.ok(N.rest.includes('Exam note'), 'the exam note is a remark with the results, not a convention');
  assert.ok(!/RTP/.test(compute(Object.assign(base(), def.presets[4].values)).note), 'no exam note when no SBU is in that cell');
});
test('GE levels: words, first letters and scores from 1 to 5 (thirds); anything else is refused', () => {
  assert.deepEqual(['High', 'h', ' MEDIUM ', 'med', 'low'].map(t => parseLevel(t, 'attr').level), ['high', 'high', 'medium', 'medium', 'low']);
  assert.deepEqual(['Strong', 's', 'Average', 'avg', 'weak', 'high', 'low'].map(t => parseLevel(t, 'str').level), ['strong', 'strong', 'average', 'average', 'weak', 'strong', 'weak']);
  assert.deepEqual([1, 2.3, 2.34, 3.66, 3.67, 5].map(n => parseLevel(String(n), 'attr').level), ['low', 'low', 'medium', 'medium', 'high', 'high']);
  assert.equal(parseLevel('fantastic', 'attr'), null);
  assert.throws(() => parseLevel('7', 'str'), /from 1/);
  assert.throws(() => geClassify([{ name: 'X', attr: 'superb', str: 'Strong' }]), /High, Medium or Low/);
  assert.throws(() => geClassify([{ name: 'X', attr: 'High', str: 'meh' }]), /Strong, Average or Weak/);
});
test('GE brute force: the zone is green when (row + column) ≤ 1, yellow at 2, red from 3 (high/strong = 0), for every cell and 1,000 random scores', () => {
  const rule = (ri, ci) => (ri + ci <= 1 ? 'green' : ri + ci === 2 ? 'yellow' : 'red');
  const R = ['high', 'medium', 'low'], C = ['strong', 'average', 'weak'];
  R.forEach((a, ri) => C.forEach((s, ci) => assert.equal(geClassify([{ name: 'X', attr: a, str: s }])[0].zone, rule(ri, ci))));
  const r = lcg(3), band = n => (n < 7 / 3 ? 2 : n < 11 / 3 ? 1 : 0);
  for (let k = 0; k < 1000; k++) {
    const a = Math.round((1 + 4 * r()) * 100) / 100, s = Math.round((1 + 4 * r()) * 100) / 100;
    const res = compute(Object.assign(base(), { mode: 'ge', geUnits: [['X', String(a), String(s), 0]] }));
    assert.equal(res.sim.list[0].zone, rule(band(a), band(s)), a + ' / ' + s);
    const c = circles(shapesOf(res.frames[res.frames.length - 1]))[0].c, ri = band(a), ci = band(s);
    assert.ok(c[0] >= ci * 3.4 && c[0] <= (ci + 1) * 3.4 && c[1] >= (2 - ri) * 2.4 && c[1] <= (3 - ri) * 2.4, 'the bubble is inside its cell');
  }
});
test('GE frames: the grid, then per SBU its row and its cell, then all; duplicate cells are spread apart', () => {
  const res = compute(Object.assign(base(), { mode: 'ge', geUnits: [['A', 'High', 'Strong', 0], ['B', 'High', 'Strong', 0], ['C', 'Low', 'Weak', 0]] }));
  assert.equal(res.frames.length, 8);
  const cs = circles(shapesOf(res.frames[7]));
  assert.notDeepEqual(cs[0].c, cs[1].c, 'two SBUs in one cell do not overlap');
  assert.match(res.frames[2].caption, /\*\*Invest\/Expand\*\*/);
  assert.match(res.frames[6].caption, /retrenchment, divestment or liquidation/, 'SM 4.4.4: the red zone');
  res.frames.forEach(f => f.view.forEach(x => diagram.render(x)));
});

/* ---------------------------------------------------------------- the challenge */
test('challenge: BCG and GE problems have one right choice, read from the same compute, and the test picture names no quadrant or strategy', () => {
  for (const mode of ['bcg', 'ge']) {
    for (let s = 1; s <= 60; s++) {
      const P = L.problem(def, Object.assign(base(), { mode }), s * 104729);
      assert.equal(P.result.sim.mode, mode, 'the problem follows the mode being explored');
      const spec = L.answerSpec(def, P.values, P.result, P.want);
      assert.equal(spec.kind, 'choice');
      assert.equal(spec.choices.filter(c => L.check(spec, c[0], P.want).ok).length, 1);
      const u = P.result.sim.list[P.values.ask];
      if (mode === 'bcg') {
        assert.ok(Math.abs(u.rms - 1) >= 0.1 && u.growth !== 10, 'no problem sits on a line');
        assert.equal(P.want, P.values.askWhat === 'strategy' ? u.strategy : QUAD[u.quad].name);
      } else assert.equal(P.want, u.strategy);
      const txt = JSON.stringify(def.challenge.view(P.result, P.values));
      assert.ok(!/Stars|Cash cows|Question marks|Dogs|Invest\/Expand|Select\/Earn|Harvest\/Divest/.test(txt), 'the blank matrix gives nothing away');
      assert.ok(def.challenge.explain(P.result, P.values).length > 40);
    }
  }
});
test('presets: every example computes, one cites the Study Material and two cite ICAI RTPs; the default is the first example', () => {
  for (const p of def.presets) { const r = compute(Object.assign(base(), p.values)); assert.ok(r.frames.length >= 4, p.label); }
  assert.ok(def.presets.some(p => /SM Test Your Knowledge/.test(p.label)));
  assert.ok(def.presets.filter(p => /RTP (January|September) 20\d\d Q\d+/.test(p.label)).length >= 2);
  assert.deepEqual(compute(base()).sim.list.map(u => u.name), compute(Object.assign(base(), def.presets[0].values)).sim.list.map(u => u.name));
});
