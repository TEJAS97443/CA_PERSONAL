/* Joint and By-Products Lab (app/js/labs/joint.js): the ICAI Study Material's examples, illustrations, practical problems and case scenario
   (Paper 4, Ch. 11), real ICAI questions with their Suggested Answers (past papers May 2024 Q1(b), Jan 2025 MCQ 12, May 2025 Q(b),
   Jan 2026 Q1(b), May 2026 Q3(a); RTP January 2026 Q15), identities on thousands of random inputs (every method's shares add up to the
   joint cost; ratio methods keep share ÷ basis constant; the constant gross margin is the same for every product; the best plan is never
   worse than either extreme, and equals the brute force over all 2ⁿ plans), bad input, and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/joint.js');
const { def } = LAB;

const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= (eps == null ? 1e-6 : eps))) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const base = () => Object.fromEntries(def.controls.map(c => [c.id, c.type === 'table' ? c.rows.map(r => r.slice()) : c.value]));
const run = vals => def.compute(Object.assign(base(), { further: [] }, vals));
const share = (vals, method) => run(Object.assign({}, vals, { mode: 'apportion', method })).sim.A.shares;
const preset = re => def.presets.find(p => re.test(p.label)).values;

/* ---------------------------------------------------------------- apportionment (SM Ch. 11 §3) */
test('SM Ch. 11 Examples 1–3 (A and B, joint cost ₹64,500): NRV 38,700 / 25,800; market value at separation 25,500 / 39,000; after further processing 25,800 / 38,700', () => {
  const v = { jointCost: 64500, products: [['A', 200, 170, 0], ['B', 200, 260, 0]] };
  assert.deepEqual(share(Object.assign({}, v, { further: [['A', 4000, 0, 170, 0], ['B', 32000, 0, 260, 0]] }), 'nrv'), [38700, 25800], 'Example 1: NRV 30,000 : 20,000 = 3 : 2');
  assert.deepEqual(share(v, 'sales'), [25500, 39000], 'Example 2: multiplying factor 75 %');
  assert.deepEqual(share(Object.assign({}, v, { further: [['A', 0, 0, 200, 0], ['B', 0, 0, 300, 0]] }), 'final'), [25800, 38700], 'Example 3: 40,000 : 60,000');
});
test('SM Ch. 11 Illustration 2 (average unit cost): ₹60 a unit; A 30,000, B 12,000, C 18,000', () => {
  const r = run({ mode: 'apportion', method: 'physical', jointCost: 60000, products: [['A', 500, 1, 0], ['B', 200, 1, 0], ['C', 300, 1, 0]] });
  assert.deepEqual(r.sim.A.shares, [30000, 12000, 18000]);
  assert.ok(r.stats.some(s => s.value === '₹60'), 'the average unit cost tile');
});
test('SM Ch. 11 Illustration 1 (coke works, physical units): the shares follow output; ICAI\'s figures differ only by its rounding of the wastage to whole tonnes', () => {
  const s = share({ jointCost: 5500000, products: [['Coke', 3500, 1, 0], ['Tar', 1200, 1, 0], ['Sulphate of ammonia', 52, 1, 0], ['Benzol', 48, 1, 0]] }, 'physical');
  [4010600, 1375000, 59400, 55000].forEach((x, i) => near(s[i], x, 200, 'within the rounding of 146 / 50 / 2 / 2 tonnes'));
  assert.equal(s.reduce((a, b) => a + b, 0), 5500000);
});
test('SM Ch. 11 Illustration 3 (contribution margin): marginal 4,400 by 100 : 120, fixed 3,900 by 40 : 12 → A ₹5,000, B ₹3,300', () => {
  const r = run(preset(/Illustration 3/)), A = r.sim.A;
  assert.deepEqual(A.shares, [5000, 3300]);
  assert.deepEqual(A.rows.find(x => /variable joint/.test(x.label)).cells, [-2000, -2400]);
  assert.deepEqual(A.rows.find(x => /^Fixed/.test(x.label)).cells, [3000, 900]);
});
test('SM Ch. 11 Illustration 4 (Caustic Soda, Chlorine): sales value at split-off 50,000 / 50,000; physical 60,000 / 40,000; NRV 42,857 / 57,143; PVC adds ₹20,000', () => {
  const v = preset(/Illustration 4/);
  assert.deepEqual(share(v, 'sales'), [50000, 50000]);
  assert.deepEqual(share(v, 'physical'), [60000, 40000]);
  assert.deepEqual(share(v, 'nrv'), [42857, 57143]);
  const D = run(Object.assign({}, v, { mode: 'further' })).sim.D, c = D.rows.find(r => r.p.name === 'Chlorine');
  assert.equal(c.incRev, 40000); assert.equal(c.incCost, 20000); assert.equal(c.inc, 20000); assert.ok(c.further);
});
test('SM Ch. 11 Case Scenario (Pokemon Chocolates): 2,49,375 / 4,63,125; 2,85,000 / 4,27,500; 2,22,656.25 / 4,89,843.75; gross margin 8 %; 2,21,587.50 / 4,90,912.50', () => {
  const v = preset(/Pokemon/);
  assert.deepEqual(share(v, 'sales'), [249375, 463125], '(i) (b)');
  assert.deepEqual(share(v, 'physical'), [285000, 427500], '(ii) (d)');
  assert.deepEqual(share(v, 'nrv'), [222656.25, 489843.75], '(iii) (a)');
  const r = run(Object.assign({}, v, { method: 'cgm' }));
  near(r.sim.A.gm, 0.08, 1e-12, '(iv) (a)'); assert.deepEqual(r.sim.A.shares, [221587.5, 490912.5], '(v) (c)');
});
test('SM Ch. 11 Practical Problem 1 (Smile company): by-product NRV ₹2,50,000 off the joint cost; product B ₹5,00,000 by physical volume', () => {
  const r = run({ mode: 'byprod', method: 'physical', jointCost: 1000000, byName: 'By-product', byUnits: 50000, byPrice: 5, byCost: 0, margin: 0,
    products: [['A', 60000, 0, 0], ['B', 120000, 0, 0]], further: [['A', 200000, 0, 50, 0], ['B', 300000, 0, 30, 0]] });
  assert.equal(r.sim.nrv, 250000); assert.equal(r.sim.netJ, 750000); assert.deepEqual(r.sim.t2.shares, [250000, 500000]);
});
test('SM Ch. 11 Practical Problem 2 (Sun-moon Ltd.): NRV shares 26,25,000 / 2,52,000 / 1,75,000 / 1,40,000 / 9,45,000; process A, C, E further, not B; profits 6,30,000 / 13,00,000 / 13,30,000', () => {
  const v = { jointCost: 4137000, otherFixed: 473000, products: [['A', 200000, 17, 0], ['B', 30000, 13, 0], ['C', 25000, 8, 0], ['D', 20000, 10, 0], ['E', 75000, 14, 0]],
    further: [['A', 1250000, 0, 25, 0], ['B', 150000, 0, 17, 0], ['C', 50000, 0, 12, 0], ['E', 150000, 0, 20, 0]] };
  assert.deepEqual(share(v, 'nrv'), [2625000, 252000, 175000, 140000, 945000]);
  const D = run(Object.assign({ mode: 'further' }, v)).sim.D;
  assert.deepEqual(D.rows.map(r => r.inc == null ? null : r.inc), [350000, -30000, 50000, null, 300000]);
  assert.equal(D.splitAll, 630000, '(a)'); assert.equal(D.furtherAll, 1300000, '(b)'); assert.equal(D.best, 1330000, 'suggested plan: profit up by ₹30,000');
});
test('SM Ch. 11 Practical Problem 3 (Buttery Butter): NRV shares 5,10,000 / 45,90,000; refusing the butter offer keeps ₹3,60,000', () => {
  const v = { jointCost: 5100000, products: [['Buttermilk', 28000, 30, 0], ['Butter', 20000, 360, 0]], further: [['Butter', 120000, 16000, 480, 0]] };
  assert.deepEqual(share(v, 'nrv'), [510000, 4590000]);
  const b = run(Object.assign({ mode: 'further' }, v)).sim.D.rows[1];
  assert.equal(b.incRev, 480000); assert.equal(b.inc, 360000); assert.ok(b.further);
});
test('SM Ch. 11 Practical Problem 4 (X, Y, Z and by-product B, margin 25 % on cost = 20 % of sales): net joint cost 90,000; 54,000 / 20,250 / 15,750 (₹6.75, ₹3.38, ₹3.94 a unit)', () => {
  const r = run(preset(/Practical Problem 4/));
  assert.equal(r.sim.nrv, 800); assert.equal(r.sim.netJ, 90000); assert.deepEqual(r.sim.t2.shares, [54000, 20250, 15750]);
  assert.equal(r.sim.t2.ratio, '24 : 9 : 7');
  near(r.sim.t2.shares[1] / 6000, 3.375); near(r.sim.t2.shares[2] / 4000, 3.9375);
});
test('SM Ch. 11 Practical Problem 5 (RST Ltd., by weight): 4,000 / 2,800 / 3,200; process X and Z further, sell Y at split-off', () => {
  const v = { jointCost: 10000, products: [['X', 100, 25, 0], ['Y', 70, 70, 0], ['Z', 80, 45, 0]], further: [['X', 2000, 0, 50, 0], ['Y', 1200, 0, 80, 0], ['Z', 800, 0, 60, 0]] };
  assert.deepEqual(share(v, 'physical'), [4000, 2800, 3200]);
  assert.deepEqual(run(Object.assign({ mode: 'further' }, v)).sim.D.rows.map(r => r.inc), [500, -500, 400]);
});
test('SM Ch. 11 Practical Problem 6 (OPR Ltd.): sales value at split-off 10,000 / 6,000 / 14,000 / 10,000; only S pays to process further (+20,000)', () => {
  const v = { jointCost: 40000, products: [['S', 1, 20000, 0], ['P', 1, 12000, 0], ['N', 1, 28000, 0], ['A', 1, 20000, 0]], further: [['S', 80000, 0, 120000, 0], ['P', 32000, 0, 40000, 0], ['N', 36000, 0, 48000, 0]] };
  assert.deepEqual(share(v, 'sales'), [10000, 6000, 14000, 10000]);
  assert.deepEqual(run(Object.assign({ mode: 'further' }, v)).sim.D.rows.map(r => r.inc == null ? null : r.inc), [20000, -4000, -16000, null]);
});

/* ---------------------------------------------------------------- real ICAI questions */
test('ICAI past paper May 2024, Q1(b): physical 20,000 / 40,000; contribution margin 22,500 / 37,500; processing B further loses ₹1,440', () => {
  const v = preset(/May 2024, Q1\(b\): products/);
  assert.deepEqual(share(v, 'physical'), [20000, 40000], '(i)(a)');
  const A = run(v).sim.A;
  assert.deepEqual(A.shares, [22500, 37500], '(i)(b)');
  assert.deepEqual(A.rows.find(x => x.label === 'Contribution').cells, [28000, 36000]);
  const b = run(preset(/Q1\(b\)\(ii\): process B/)).sim.D.rows[1];
  assert.equal(b.incRev, 10560); assert.equal(b.inc, -1440, '(ii) an opportunity loss of ₹1,440'); assert.equal(b.further, false);
});
test('ICAI past paper Jan 2025, MCQ 12 (Y and Z, NRV after a 25 % margin on cost): joint cost per litre of Y = ₹6.00 (D)', () => {
  const r = run({ mode: 'apportion', method: 'nrv', margin: 20, jointCost: 60000, products: [['Y', 8000, 0, 0], ['Z', 6000, 0, 0]], further: [['Y', 48000, 0, 15, 0], ['Z', 30000, 0, 8.75, 0]] });
  assert.deepEqual(r.sim.A.shares, [48000, 12000]); near(r.sim.A.shares[0] / 8000, 6);
});
test('ICAI past paper May 2025, Q(b) (Aroma Park Ltd.): NRV 2,00,000 : 3,60,000 : 4,00,000 = 5 : 9 : 10 → 1,25,000 / 2,25,000 / 2,50,000; profits 75,000 / 1,35,000 / 1,50,000', () => {
  const r = run(preset(/May 2025/)), A = r.sim.A;
  assert.deepEqual(A.shares, [125000, 225000, 250000]); assert.equal(A.ratio, '5 : 9 : 10');
  const P = r.sim.P, profit = P.map((p, i) => p.finalSales - p.further.cost - A.shares[i]);
  assert.deepEqual(profit, [75000, 135000, 150000]);
  assert.deepEqual(share(preset(/May 2025/), 'physical'), [300000, 180000, 120000], 'the management\'s ₹60 a unit is the physical-units method');
});
test('ICAI past paper Jan 2026, Q1(b) (ECO Cotton): by-product NRV ₹2,100; 1,44,000 split 1,00,800 / 43,200; profit at split-off 2,16,000; Fibre +16,800, Seed −1,800', () => {
  const r = run(preset(/ECO Cotton, Cotton Linters/));
  assert.equal(r.sim.nrv, 2100); assert.equal(r.sim.netJ, 144000); assert.deepEqual(r.sim.t2.shares, [100800, 43200]);
  const D = run(preset(/Cotton Fibre and Cotton Seed further/)).sim.D;
  assert.equal(D.splitAll, 216000, '(ii)');
  assert.deepEqual(D.rows.map(x => [x.incRev, x.incCost, x.inc]), [[56000, 39200, 16800], [12600, 14400, -1800]], '(iii)');
});
test('ICAI past paper May 2026, Q3(a) (Apex Chemicals): sales value at split-off 17,04,000 / 11,36,000; A-Prime: incremental revenue 9,72,000, cost 5,32,000, profit 4,40,000', () => {
  const v = preset(/Apex Chemicals/);
  assert.deepEqual(share(v, 'sales'), [1704000, 1136000], '(i): selling expenses are not deducted from the sales value at split-off');
  const a = run(v).sim.D.rows[0];
  assert.equal(a.incRev, 972000); assert.equal(a.incCost, 532000, 'conversion 5,40,000 less the saving in selling expenses 8,000'); assert.equal(a.inc, 440000);
});
test('ICAI RTP January 2026, Q15 (P, Q, C): joint cost 6,30,000 / 2,80,000 / 3,78,000 (₹35, ₹28, ₹7 a kg); process P and C further, sell Q at split-off', () => {
  const v = preset(/RTP January 2026/);
  const s = share(v, 'sales');
  assert.deepEqual(s, [630000, 280000, 378000]); assert.deepEqual([s[0] / 18000, s[1] / 10000, s[2] / 54000], [35, 28, 7]);
  assert.deepEqual(run(v).sim.D.rows.map(r => r.inc), [216000, -50000, 324000], '₹12, (₹5) and ₹6 a kg');
});

/* ---------------------------------------------------------------- identities */
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
test('random joint processes (3 000): every method\'s shares add up to the joint cost; ratio methods keep share ÷ basis constant; constant gross margin leaves every product the same margin %', () => {
  const rnd = lcg(5);
  for (let k = 0; k < 3000; k++) {
    const n = 2 + Math.floor(rnd() * 4), rupees = rnd() < 0.7;
    const prods = Array.from({ length: n }, (_, i) => ['P' + i, 100 + Math.floor(rnd() * 9000), rnd() < 0.85 ? 1 + Math.floor(rnd() * 200) : 0, Math.floor(rnd() * 3000)]);
    const fur = prods.filter(p => !p[2] || rnd() < 0.5).map(p => [p[0], Math.floor(rnd() * 50000), rnd() < 0.3 ? Math.floor(p[1] * 0.9) : 0, (p[2] || 50) + 1 + Math.floor(rnd() * 100), Math.floor(rnd() * 2000)]);
    const J = 1000 + Math.floor(rnd() * 900000), o = { rupees, margin: 0, varCost: Math.floor(J * rnd()), techRatio: prods.map(() => 1 + Math.floor(rnd() * 5)).join(':') };
    const P = LAB.products(prods, fur, 0);
    for (const [m] of LAB.METHODS) {
      const A = LAB.apportion(m, J, P, o);
      if (A.na) continue;
      near(A.shares.reduce((a, b) => a + b, 0), J, 1e-6, `${m}: shares add up`);
      const basis = { physical: P.map(p => p.units), sales: P.map(p => p.split), nrv: P.map(p => p.nrv), final: P.map(p => p.finalSales) }[m];
      if (basis) A.shares.forEach((x, i) => near(x, (J * basis[i]) / basis.reduce((a, b) => a + b, 0), rupees ? 1 : 0.01, `${m}: proportional`));
      if (m === 'cgm') P.forEach((p, i) => near((p.finalSales - p.sep - A.shares[i]) / p.finalSales, A.gm, (rupees ? 2 : 0.02) / p.finalSales, 'same gross margin %'));
    }
  }
});
test('random decisions (2 000): the best plan equals the brute force over all 2ⁿ plans and is never worse than "all at split-off" or "all further"; the joint cost never changes a decision', () => {
  const rnd = lcg(9);
  for (let k = 0; k < 2000; k++) {
    const n = 2 + Math.floor(rnd() * 4);
    const prods = Array.from({ length: n }, (_, i) => ['P' + i, 100 + Math.floor(rnd() * 5000), 1 + Math.floor(rnd() * 100), Math.floor(rnd() * 5000)]);
    const fur = prods.filter(() => rnd() < 0.7).map(p => [p[0], Math.floor(rnd() * 60000), 0, p[2] + Math.floor(rnd() * 40) - 5, Math.floor(rnd() * 5000)]).filter(f => f[3] > 0);
    if (!fur.length) continue;
    const J = Math.floor(rnd() * 500000), other = Math.floor(rnd() * 50000), P = LAB.products(prods, fur, 0);
    const D = LAB.decide(P, J, other, { rupees: true }), D2 = LAB.decide(P, J + 123456, other, { rupees: true });
    assert.deepEqual(D.rows.map(r => r.verdict), D2.rows.map(r => r.verdict), 'the joint cost is irrelevant');
    const opts = P.filter(p => p.further);
    let bestBrute = -Infinity;
    for (let mask = 0; mask < 1 << opts.length; mask++) {
      const prof = P.reduce((a, p) => { const j = opts.indexOf(p), f = j >= 0 && mask & (1 << j); return a + (f ? p.further.sales - p.further.cost - p.further.sell : p.split - p.sellS); }, 0) - J - other;
      bestBrute = Math.max(bestBrute, prof);
    }
    near(D.best, bestBrute, 1e-6, 'best plan = brute force');
    assert.ok(D.best >= D.splitAll - 1e-9 && D.best >= D.furtherAll - 1e-9);
  }
});
test('by-product treatments: crediting the NRV lowers the main products\' joint cost by exactly the NRV, shared in the method\'s ratio', () => {
  const rnd = lcg(3);
  for (let k = 0; k < 500; k++) {
    const prods = [['A', 1000 + Math.floor(rnd() * 9000), 10 + Math.floor(rnd() * 90), 0], ['B', 1000 + Math.floor(rnd() * 9000), 10 + Math.floor(rnd() * 90), 0]];
    const J = 500000 + Math.floor(rnd() * 500000), units = 100 + Math.floor(rnd() * 900), price = 1 + Math.floor(rnd() * 20), cost = Math.floor(rnd() * units);
    const r = run({ mode: 'byprod', method: ['physical', 'sales', 'nrv', 'final'][k % 4], jointCost: J, products: prods, byName: 'W', byUnits: units, byPrice: price, byCost: cost });
    const S = r.sim;
    assert.equal(S.nrv, units * price - cost);
    near(S.t1.shares.reduce((a, b) => a + b, 0) - S.t2.shares.reduce((a, b) => a + b, 0), S.nrv, 1e-6);
    if (S.t3) near(S.t3.shares.reduce((a, b) => a + b, 0), J, 1e-6, 'as a joint product it shares the whole joint cost');
  }
});

/* ---------------------------------------------------------------- bad input */
test('bad input fails with a message that says what to fix; a method that cannot apply says why', () => {
  const v = { mode: 'apportion', method: 'sales', jointCost: 1000 };
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 10, 5, 0]] })), /at least two joint products/);
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 10, 5, 0], ['a', 10, 5, 0]] })), /Two products/);
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 0, 5, 0], ['B', 10, 5, 0]] })), /units produced/);
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 10, 0, 0], ['B', 10, 5, 0]] })), /no price at split-off and no further processing/);
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 10, 0, 0], ['B', 10, 5, 0]], further: [['A', 10, 0, 9, 0]] })), /Sales value at split-off cannot be used here: A cannot be sold at split-off/);
  assert.throws(() => run(Object.assign({}, v, { products: [['A', 10, 5, 0], ['B', 10, 5, 0]], further: [['C', 10, 0, 9, 0]] })), /not one of the joint products/);
  assert.throws(() => run(Object.assign({}, v, { jointCost: 0, products: [['A', 10, 5, 0], ['B', 10, 5, 0]] })), /joint cost/);
  assert.throws(() => run(Object.assign({}, v, { method: 'contrib', varCost: 0, products: [['A', 10, 5, 0], ['B', 10, 5, 0]] })), /variable part/);
  assert.throws(() => run(Object.assign({}, v, { method: 'contrib', varCost: 5000, products: [['A', 10, 5, 0], ['B', 10, 5, 0]] })), /cannot be more than the joint cost/);
  assert.throws(() => run(Object.assign({}, v, { method: 'tech', techRatio: '1:2:3', products: [['A', 10, 5, 0], ['B', 10, 5, 0]] })), /2 positive weights/);
  assert.throws(() => run({ mode: 'byprod', method: 'physical', jointCost: 1000, products: [['A', 10, 5, 0], ['B', 10, 5, 0]], byUnits: 10, byPrice: 1, byCost: 50 }), /negative/);
  assert.throws(() => run({ mode: 'further', jointCost: 1000, products: [['A', 10, 5, 0], ['B', 10, 5, 0]], further: [] }), /No product has a further-processing option/);
});
test('split() rounds with the largest remainder so the shares always add up exactly', () => {
  assert.deepEqual(LAB.split(100, [1, 1, 1], true), [34, 33, 33]);
  assert.deepEqual(LAB.split(100000, [3, 4], true), [42857, 57143]);
  assert.deepEqual(LAB.split(1, [1, 1, 1], false), [0.34, 0.33, 0.33]);
  assert.equal(LAB.ratioText([30000, 40000]), '3 : 4'); assert.equal(LAB.ratioText([200000, 360000, 400000]), '5 : 9 : 10');
});

/* ---------------------------------------------------------------- examples and the challenge */
test('every example and every mode computes, every frame draws, captions say why (no undefined / NaN), frames stay under 120', () => {
  const sets = def.presets.map(p => [p.label, p.values]).concat(['apportion', 'further', 'byprod'].map(m => ['default ' + m, { mode: m, further: base().further }]));
  for (const [label, vals] of sets) {
    const r = def.compute(Object.assign(base(), vals));
    assert.ok(r.frames.length >= 4 && r.frames.length <= 120, label + ': ' + r.frames.length);
    r.frames.forEach((f, i) => {
      assert.ok(typeof f.caption === 'string' && f.caption.length > 20, `${label} #${i}`);
      assert.ok(!/undefined|NaN|\[object/.test(f.caption), `${label} #${i}: ${f.caption}`);
      f.view.forEach(x => { const html = x.html != null ? x.html : diagram.render(x); assert.ok(!/undefined|NaN/.test(html.replace(/<[^>]+>/g, ' ')), `${label} #${i} ${x.type}`); });
    });
    assert.ok(r.stats.length >= 2 && r.stats.length <= 6, label + ' tiles');
    r.stats.forEach(s => assert.ok(!/undefined|NaN/.test(String(s.value)), label + ' ' + s.label));
  }
  assert.ok(def.presets.filter(p => /ICAI past paper|ICAI RTP/.test(p.label)).length >= 2 && def.presets.some(p => /Tapri/.test(p.label)));
});
test('the default (Tapri chai blends, NRV) gives round shares: Assam ₹2,80,000, Darjeeling ₹2,40,000, dust ₹80,000; further: Assam yes, Darjeeling must, dust no', () => {
  assert.deepEqual(run({ further: base().further }).sim.A.shares, [280000, 240000, 80000]);
  const D = run({ mode: 'further', further: base().further }).sim.D;
  assert.deepEqual(D.rows.map(r => r.verdict.replace(/ \(.*\)$/, '')), ['Process further', 'Process further', 'Sell at split-off']);
});
test('challenge: 300 problems per mode compute and have a whole-rupee (or yes / no) answer that the given-data picture does not reveal', () => {
  for (const mode of ['apportion', 'further', 'byprod']) {
    for (let s = 1; s <= 300; s++) {
      const v = Object.assign(base(), { mode }, def.challenge.gen(GA.util.rng(s * 7907)));
      const res = def.compute(v), want = def.challenge.solve(res, v);
      if (typeof want === 'number') { assert.ok(Number.isFinite(want), `${mode}#${s}`); near(want, Math.round(want), 1e-6, `${mode}#${s} whole rupees: ${want}`); if (mode !== 'further') assert.ok(want > 0); }
      else assert.ok(/^(yes|no)$/.test(want), `${mode}#${s}: ${want}`);
      const kind = def.challenge.kind(v, res);
      assert.ok(typeof want === 'number' ? (want < 0 ? kind === 'signed' : ['num', 'signed'].includes(kind)) : kind === 'yesno', `${mode}#${s} kind ${kind}`);
      assert.ok(def.challenge.prompt(v, res).length > 20 && /₹/.test(def.challenge.explain(res, v)));
    }
  }
});
