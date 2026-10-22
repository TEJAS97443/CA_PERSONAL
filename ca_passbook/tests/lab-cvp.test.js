/* CVP Lab (app/js/labs/cvp.js): every figure checked against the ICAI Study Material (Paper 4, chapter 14 Marginal Costing) and real ICAI
   questions with their Suggested Answers / RTP answers, plus identities on thousands of random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/cvp.js');
const { single, mix, absorb, compute, def } = LAB;
const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= (eps == null ? 1e-6 : eps))) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const run = v => compute(Object.assign({}, require('../app/js/labs/framework.js')._defaults(def), v));

/* ---------------------------------------------------------------- one product: Study Material */
test('cvp: SM Example 3 (ABC Ltd): BEP 1,000 units, MoS 700 units = 41% of 1,700 forecast units', () => {
  const S = single({ price: 500, vc: 300, fixed: 200000, units: 1700 });
  near(S.c, 200); near(S.pv, 0.4); near(S.bepU, 1000); near(S.bepS, 500000);
  near(S.mosU, 700); near(S.mosPct * 100, 41.18, 0.01);                       // SM rounds 700/1,700 to "41% of sales"
});
test('cvp: SM Illustration 1 (MNP Ltd): BEP 1,75,000 units and cash BEP 1,00,000 units', () => {
  const S = single({ price: 37.5, vc: 17.5, fixed: 3500000, dep: 1500000, units: 275000 });
  near(S.bepU, 175000); near(S.cashBepU, 100000);
});
test('cvp: SM Illustration 2: BEP 10,000 units; sales for a ₹20,000 profit ₹3,40,000', () => {
  const S = single({ price: 30, vc: 15, fixed: 150000, target: 20000 });
  near(S.bepU, 10000); near(S.tS, 340000); near(S.pv, 0.5);
});
test('cvp: SM Illustration 3: 20% price cut at P/V 40% needs sales value +60% and quantity doubled (₹10, 100 units proof)', () => {
  const b = single({ price: 10, vc: 6, fixed: 0, units: 100 }), s = single({ price: 8, vc: 6, fixed: 0, units: 200 });
  near(b.pv, 0.4); near(s.pv, 0.25); near(s.contribution, b.contribution); near(s.sales / b.sales, 1.6);
});
test('cvp: SM Illustration 5 (Rio Co.): P/V 40%, BEP ₹75,000, MoS ₹25,000', () => {
  const S = single({ price: 100, vc: 60, fixed: 30000, units: 1000 });             // sales ₹1,00,000 as 1,000 units of ₹100
  near(S.pv, 0.4); near(S.bepS, 75000); near(S.mosS, 25000); near(S.profit, 10000);
});
test('cvp: SM Illustration 7: profit ₹30,000 at ₹10 price, ₹8 marginal cost → MoS ₹1,50,000 (= profit ÷ P/V)', () => {
  const units = 30000 / 2 + 0;                                                     // profit = MoS units × contribution, any fixed cost works
  const S = single({ price: 10, vc: 8, fixed: 100000, units: 100000 / 2 + units });
  near(S.profit, 30000); near(S.mosS, 150000); near(S.mosS * S.pv, S.profit);
});
test('cvp: SM Illustration 8 (A Ltd): MoS 37.5%, P/V 40%, F ₹5 lakh → BES ₹12,50,000, sales ₹20,00,000, profit ₹3,00,000, new MoS ₹9,00,000', () => {
  const S = single({ price: 100, vc: 60, fixed: 500000, units: 20000 });
  near(S.bepS, 1250000); near(S.mosPct, 0.375); near(S.profit, 300000);
  const N = single({ price: 100, vc: 60, fixed: 500000, units: 20000 * 1.075 });
  near(N.mosS, 900000);
});
test('cvp: SM Illustration 11(i) (M.K. Ltd): BEP 20,000 units; 60% MoS → 50,000 units, profit ₹7,20,000, 21.6% after 40% tax', () => {
  const S = single({ price: 40, vc: 16, fixed: 480000, units: 50000 });
  near(S.bepU, 20000); near(S.mosPct, 0.6); near(S.profit, 720000); near(S.profit * 0.6 / S.sales, 0.216);
});
test('cvp: SM Practical Problem 13: BEP 40,000 units; price cut to ₹180 → 50,000 units', () => {
  near(single({ price: 200, vc: 100, fixed: 4000000 }).bepU, 40000);
  const r = run({ mode: 'bep', price: 200, vc: 100, fixed: 4000000, units: 800000, target: 0, dPrice: -10 });
  near(r.sim.S.bepU, 50000); near(r.sim.base.bepU, 40000);
});
test('cvp: SM Practical Problem 16 (Bhutan mineral water): 10% profit on sales → price ₹15 (₹6,00,000 for 40,000 bottles)', () => {
  /* variable cost ex-commission ₹3,99,200 = ₹9.98 a bottle; commission 8% of price; fixed ₹92,800. As a CVP: P/V = 1 − 9.98/p − 8% */
  const p = 15, S = single({ price: p, vc: 9.98 + 0.08 * p, fixed: 92800, target: 10, tkind: 'pct' });
  near(S.tS, 600000, 0.01); near(S.tU, 40000, 1e-6);
  const B = single({ price: 14, vc: 9.98 + 0.08 * 14, fixed: 92800 });              // (ii) at ₹14: VC ₹11.10, BEP 32,000 bottles, ₹4,48,000
  near(B.vc, 11.1, 1e-9); near(B.bepU, 32000); near(B.bepS, 448000);
});

/* ---------------------------------------------------------------- one product: ICAI questions */
test('cvp: PYQ Sep 2025 Case Scenario II (JMS Ltd): contribution ₹18, BES ₹19,50,000 (option D), profit at −10% sales ₹1,15,200 (option A)', () => {
  /* VC = 9,50,000 + 5,93,750 + 2,85,000 + 1,42,500 + 80,750 = 20,52,000 (MCQ 7, option A) for 36,000 units; fixed 1,90,000 + 2,13,750 + 64,250 */
  const vc = (950000 + 593750 + 285000 + 142500 + 80750) / 36000, fixed = 190000 + 213750 + 64250;
  near(vc * 36000, 2052000); near(vc, 57);
  const r = run({ mode: 'bep', price: 75, vc: 57, fixed, units: 36000, target: 0, dUnits: -10 });
  near(r.sim.base.c, 18); near(r.sim.base.bepS, 1950000); near(r.sim.S.profit, 115200);
  const P = def.presets.find(p => /JMS/.test(p.label));
  const rp = run(P.values); near(rp.sim.base.bepS, 1950000); near(rp.sim.S.profit, 115200);
});
test('cvp: RTP May 2024 Q11 (A Ltd): profit ₹1,25,000, BES ₹6,90,941 (ICAI ₹6,90,882 with P/V rounded to 53.41%), MoS 25.30% (ICAI 25.31%), −10% sales → ₹75,600', () => {
  /* COGS = 3,01,000/0.43 = 7,00,000; cost of sales 8,00,000; variable 2,10,000 + 1,05,000 + 70,000 + 14,000 + 32,000 = 4,31,000; fixed 3,69,000 */
  const cogs = 301000 / 0.43, cos = (cogs + 68000) / 0.96;
  near(cogs, 700000, 1e-6); near(cos, 800000, 1e-6);
  const varT = 0.3 * cogs + 0.15 * cogs + 0.1 * cogs + 0.02 * cogs + 0.04 * cos;
  near(varT, 431000, 1e-6);
  const r = run({ mode: 'bep', price: 185, vc: varT / 5000, fixed: 369000, units: 5000, target: 0, dUnits: -10 });
  const b = r.sim.base;
  near(b.profit, 125000, 1e-6); near(b.pv * 100, 53.41, 0.005);
  near(b.bepS, 690941.3, 0.1); near(b.bepS, 690882, 0.0001 * 690882);          // within 0.01% of ICAI's figure (the rounded ratio)
  near(b.mosPct * 100, 25.30, 0.01); near(r.sim.S.profit, 75600, 1e-6);
});
test('cvp: RTP May 2025 Q18 (Gourmet): VC ₹11, F ₹8,00,000; BEP 61,539 cartons; 20% after-tax return → 80,769 cartons; price-cut plan profit ₹16,000', () => {
  /* high-low: (8,80,000 − 7,00,000)/20,000 = ₹9 + (6,90,000 − 6,50,000)/20,000 = ₹2 */
  const vc = (880000 - 700000) / 20000 + (690000 - 650000) / 20000, fixed = (700000 - 50000 * 9) + (650000 - 50000 * 2);
  near(vc, 11); near(fixed, 800000);
  const P = def.presets.find(p => /Gourmet/.test(p.label)), r = run(P.values), b = r.sim.base;
  near(Math.ceil(b.bepU), 61539); near(b.preTax, 250000, 1e-6); near(Math.floor(b.tU), 80769); near(Math.floor(b.tU) * 24, 1938456);
  near(r.sim.S.price, 22.5); near(r.sim.S.fixed, 950000); near(r.sim.S.units, 84000); near(r.sim.S.profit, 16000, 1e-6);
});
test('cvp: RTP Sep 2025 Q6 (MCQ): sales can fall 50% before a loss, P/V 40%, F ₹5,00,000 → projected sales ₹25,00,000 (option D)', () => {
  const S = single({ price: 1, vc: 0.6, fixed: 500000, units: 2500000 });
  near(S.mosPct, 0.5); near(S.bepS, 1250000);
});
test('cvp: RTP Sep 2024 Q17(i) (RS Ltd): BEP 60,000 units; 60% MoS → 1,50,000 units; net return 14.40% after 40% tax', () => {
  const S = single({ price: 100, vc: 60, fixed: 2400000, units: 150000 });
  near(S.bepU, 60000); near(S.mosPct, 0.6); near(S.profit, 3600000); near(S.profit * 0.6 / S.sales, 0.144);
});

/* ---------------------------------------------------------------- one product: the lab's frames and identities */
test('cvp: the break-even frames add one line at a time and end with the answer; P/V and contribution charts build too', () => {
  for (const chart of ['be', 'contrib', 'pv']) {
    const r = run({ mode: 'bep', chart, price: 100, vc: 60, fixed: 200000, units: 8000, target: 100000, dep: 50000 });
    assert.ok(r.frames.length >= (chart === 'pv' ? 6 : 8), chart + ' frames');
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 20, `${chart} caption ${i}`); f.view.forEach(s => GA.diagram.render(s)); });
    const s = r.frames[r.frames.length - 1].view[0];
    assert.equal(s.type, 'plot');
    if (chart !== 'pv') assert.ok(s.points.some(p => /BEP 5,000/.test(p.label)), 'the BEP is marked');
  }
  const r = run({ mode: 'bep', price: 100, vc: 60, fixed: 200000, units: 8000, target: 100000 });
  assert.match(r.frames[3].caption, /5,000 boxes/); assert.match(r.frames[r.frames.length - 1].caption, /7,500 boxes/);
  assert.equal(r.stats.find(t => /P\/V/.test(t.label)).value, '40%');
});
test('cvp: what-if sliders keep the old lines dashed and show a before/after table', () => {
  const r = run({ mode: 'bep', price: 100, vc: 60, fixed: 200000, units: 8000, target: 0, dPrice: 10, dFixed: -5 });
  const last = r.frames[r.frames.length - 1];
  assert.equal(last.view[1].type, 'table'); assert.ok(last.view[0].series.some(s => s.label === 'before' && s.dash));
  near(r.sim.S.price, 110); near(r.sim.S.fixed, 190000); near(r.sim.S.bepU, 190000 / 50);
});
test('cvp: identities on 3,000 random products: profit = MoS × P/V = contribution − F; BEP sales × P/V = F; target sales give the target', () => {
  const rnd = lcg(11);
  for (let k = 0; k < 3000; k++) {
    const vc = rnd() * 500, price = vc + 0.5 + rnd() * 500, fixed = rnd() * 1e7, units = rnd() * 1e5, tax = rnd() < 0.5 ? 0 : rnd() * 0.5, target = 1 + rnd() * 1e6;
    const S = single({ price, vc, fixed, units, target, tax });
    near(S.mosS * S.pv, S.profit, 1e-6 * (1 + Math.abs(S.profit)));
    near(S.bepS * S.pv, fixed, 1e-6 * (1 + fixed));
    near(S.tU * S.c - fixed, target / (1 - tax), 1e-6 * (1 + target));
    near(single({ price, vc, fixed, units: S.bepU }).profit, 0, 1e-6 * (1 + fixed));
    const r = (1 - tax) * S.pv * 100 * rnd() * 0.9, P = single({ price, vc, fixed, target: r, tkind: 'pct', tax });   // a % of sales the product can reach
    if ((1 - tax) * S.pv > r / 100) near((1 - tax) * (P.tS * P.pv - P.fixed), P.tS * r / 100, 1e-6 * (1 + P.tS));
  }
});
test('cvp: bad inputs explain what to fix', () => {
  assert.throws(() => single({ price: 50, vc: 60, fixed: 1 }), /higher than the variable cost/);
  assert.throws(() => single({ price: 0, vc: 0, fixed: 1 }), /price above zero/);
  assert.throws(() => single({ price: 10, vc: 5, fixed: 100, dep: 200 }), /non-cash part/);
  assert.throws(() => single({ price: 10, vc: 5, fixed: 100, target: 60, tkind: 'pct' }), /not reachable/);
});

/* ---------------------------------------------------------------- sales mix */
test('cvp: SM Example 4 (Arnav Ltd): mix 4 : 3, contributions ₹40 and ₹20, F ₹6,16,000 → 19,600 units: J 11,200, K 8,400', () => {
  const M = mix([{ name: 'J', price: 100, vc: 60, w: 4 }, { name: 'K', price: 50, vc: 30, w: 3 }], 'units', 616000);
  near(M.cu, 220 / 7); near(M.bepU, 19600); near(M.rows[0].bepU, 11200); near(M.rows[1].bepU, 8400);
  near(M.bepB, 2800); near(M.check, 616000);
});
test('cvp: RTP May 2025 Q7 (PR Ltd pens, MCQ option c): 800 batches; ball pens 4,000, gel pens 2,400', () => {
  const P = def.presets.find(p => /PR Ltd/.test(p.label)), r = run(P.values), M = r.sim;
  assert.deepEqual(M.batch, [5, 3]); near(M.cb, 420); near(M.bepB, 800); near(M.rows[0].bepU, 4000); near(M.rows[1].bepU, 2400);
  near(M.profit, 9600 / 8 * 420 - 336000);
});
test('cvp: RTP Sep 2024 Q17(ii) (RS Ltd): composite ₹43.75; BEP 64,000 units = X 40,000 + Y 24,000', () => {
  const r = run(def.presets.find(p => /RS Ltd/.test(p.label)).values), M = r.sim;
  near(M.cu, 43.75); near(M.bepU, 64000); near(M.rows[0].bepU, 40000); near(M.rows[1].bepU, 24000);
});
test('cvp: SM Illustration 11(ii) (M.K. Ltd): weighted contribution ₹28.80, BEP 23,145.83 → X 16,202, Y 6,944 units', () => {
  /* ICAI weights the 7 : 3 ratio as units (24 × 7 + 40 × 3) / 10 = 28.8, and prints the total as 23,145.80 */
  const M = mix([{ name: 'X', price: 40, vc: 16, w: 7 }, { name: 'Y', price: 50, vc: 10, w: 3 }], 'units', 666600);
  near(M.cu, 28.8); near(M.bepU, 23145.83, 0.01); near(Math.floor(M.rows[0].bepU), 16202); near(Math.floor(M.rows[1].bepU), 6943); near(M.rows[1].bepU, 6943.75, 1e-6);
});
test('cvp: RTP Sep 2026 Q15 (XYX Ltd): existing P/V 47%, BES ₹3,82,979, profit ₹1,02,000; proposed 50%, ₹3,60,000, ₹1,40,000', () => {
  const ex = run(def.presets.find(p => /XYX Ltd existing/.test(p.label)).values).sim;
  near(ex.pv, 0.47); near(Math.round(ex.bepS), 382979); near(ex.profit, 102000, 1e-6);
  const pr = run(def.presets.find(p => /XYX Ltd proposed/.test(p.label)).values).sim;
  near(pr.pv, 0.5); near(pr.bepS, 360000); near(pr.profit, 140000, 1e-6);
});
test('cvp: SM Practical Problem 20 (Prisha Ltd): existing 47.5% → BES ₹37,89,473.68, profit ₹10,50,000; proposed 50% → ₹36,00,000, ₹14,00,000', () => {
  const ex = run(def.presets.find(p => /Prisha/.test(p.label)).values).sim;
  near(ex.pv, 0.475); near(ex.bepS, 3789473.68, 0.01); near(ex.profit, 1050000, 1e-6);
  const pr = mix([{ name: 'A', price: 300, vc: 150, w: 45 }, { name: 'B', price: 400, vc: 200, w: 30 }, { name: 'E', price: 300, vc: 150, w: 25 }], 'value', 1800000, 6400000);
  near(pr.pv, 0.5); near(pr.bepS, 3600000); near(pr.profit, 1400000, 1e-6);
});
test('cvp: SM Illustration 6 profit graph: A, B, C cumulative profits ₹1,000, ₹3,250, ₹2,500; BEP ₹12,500', () => {
  /* per product totals as one "unit": A 7,500 / 1,500, B 7,500 / 5,250, C 3,750 / 4,500 (negative contribution allowed in a mix) */
  const M = mix([{ name: 'A', price: 7500, vc: 1500, w: 7500 }, { name: 'B', price: 7500, vc: 5250, w: 7500 }, { name: 'C', price: 3750, vc: 4500, w: 3750 }], 'value', 5000, 18750);
  near(M.pv, 0.4); near(M.bepS, 12500); near(M.profit, 2500, 1e-9);
  const r = run({ mode: 'multi', basis: 'value', mfixed: 5000, mixValue: 18750, mixProducts: [['A', 7500, 1500, 7500], ['B', 7500, 5250, 7500], ['C', 3750, 4500, 3750]] });
  const plot = r.frames[r.frames.length - 1].view[0];
  assert.deepEqual(plot.series[0].pts.map(p => p[1]), [-5000, 1000, 3250, 2500]);
});
test('cvp: mix identities on 2,000 random mixes: contribution at the BEP = F; profit = MoS × composite P/V', () => {
  const rnd = lcg(5);
  for (let k = 0; k < 2000; k++) {
    const n = 1 + Math.floor(rnd() * 5), basis = rnd() < 0.5 ? 'units' : 'value';
    const ps = Array.from({ length: n }, (_, i) => { const vc = rnd() * 100; return { name: 'P' + i, price: vc + 1 + rnd() * 100, vc, w: Math.floor(1 + rnd() * 9) }; });
    const F = rnd() * 1e6, E = basis === 'units' ? rnd() * 1e5 : rnd() * 1e7;
    const M = mix(ps, basis, F, E);
    near(M.check, F, 1e-6 * (1 + F));
    near(M.mosS * M.pv, M.profit, 1e-6 * (1 + Math.abs(M.profit)));
    near(M.rows.reduce((a, r) => a + r.bepS, 0), M.bepS, 1e-6 * (1 + M.bepS));
    if (basis === 'units' && M.batch) near(M.bepB * M.batchN, M.bepU, 1e-6 * (1 + M.bepU));
  }
  assert.throws(() => mix([{ name: 'A', price: 10, vc: 12, w: 1 }], 'units', 100), /never break even/);
});

/* ---------------------------------------------------------------- marginal vs absorption */
const ab = (o, periods) => absorb(Object.assign({ basis: 'normal', open: 0, vcs: 0, fos: 0 }, o, { periods: periods.map(([name, prod, sold]) => ({ name, prod, sold })) }));
test('cvp: SM Illustration 14 (Wonder Ltd ZEST): absorbed ₹44,000, over-absorbed ₹4,000, absorption profit ₹40,000, marginal ₹28,000', () => {
  const A = ab({ price: 2000, vcp: 800, vcs: 400, fop: 40000, normal: 200, fos: 60000 }, [['Q1', 220, 160]]), p = A.periods[0];
  near(p.rate, 200); near(p.A.fixAbs, 44000); near(p.under, -4000); near(p.A.closeV, 60000); near(p.A.cogs, 160000);
  near(p.A.cos, 280000); near(p.A.profit, 40000); near(p.M.closeV, 48000); near(p.M.vcogs, 128000); near(p.M.contribution, 128000); near(p.M.profit, 28000);
  near(p.diff, 60 * 200);
});
test('cvp: MTP May 2025 Series 1 Q5(a) (RN Ltd): absorption ₹2,20,000 (over-absorbed ₹22,000), marginal ₹1,54,000', () => {
  const p = run(def.presets.find(x => /RN Ltd/.test(x.label)).values).sim.periods[0];
  near(p.rate, 200); near(p.under, -22000); near(p.A.closeV, 330000); near(p.A.cos, 1540000); near(p.A.profit, 220000); near(p.M.profit, 154000);
});
test('cvp: MTP May 2024 Series 1 Q4(a) (AB Ltd): absorption 22,59,000 / 24,10,000 / 29,19,000; marginal 22,19,000 / 24,20,000 / 28,89,000', () => {
  const A = run(def.presets.find(x => /AB Ltd/.test(x.label)).values).sim;
  assert.deepEqual(A.periods.map(p => Math.round(p.A.profit)), [2259000, 2410000, 2919000]);
  assert.deepEqual(A.periods.map(p => Math.round(p.M.profit)), [2219000, 2420000, 2889000]);
  assert.deepEqual(A.periods.map(p => Math.round(p.under)), [40000, 60000, -50000]);
  assert.deepEqual(A.periods.map(p => p.closeU), [400, 300, 600]);
});
test('cvp: SM Practical Problem 17 (XYZ Ltd) reconciliation: opening 10,000 and closing 20,000 units at ₹2 fixed → absorption higher by ₹20,000', () => {
  /* the variance of ₹35,000 on variable cost is absorbed in both stocks alike, so only the fixed overhead (₹2 a unit) separates the profits */
  const A = ab({ price: 20, vcp: 11, vcs: 3, fop: 360000, normal: 180000, fos: 270000, open: 10000 }, [['Year', 160000, 150000]]), p = A.periods[0];
  near(p.openFix, 20000); near(p.closeFix, 40000); near(p.diff, 20000); near(p.under, 40000);
  near(p.A.profit - 35000 * (150000 - 10000) / 160000, 259375, 1e-6);            // ICAI ₹2,59,375 after the ₹35,000 actual-cost excess (its share sold)
  near(p.M.profit - 35000 * (150000 - 10000) / 160000, 239375, 1e-6);            // ICAI ₹2,39,375
});
test('cvp: absorption identities on 2,000 random runs: difference = Δ fixed OH in stock; with no stock change the profits agree', () => {
  const rnd = lcg(3);
  for (let k = 0; k < 2000; k++) {
    const n = 1 + Math.floor(rnd() * 6), basis = rnd() < 0.5 ? 'normal' : 'actual', open = Math.floor(rnd() * 500);
    let stock = open; const periods = [];
    for (let i = 0; i < n; i++) { const prod = 1 + Math.floor(rnd() * 1000), sold = Math.floor(rnd() * (stock + prod + 1)); stock += prod - sold; periods.push(['P' + i, prod, sold]); }
    const o = { price: 50 + rnd() * 100, vcp: rnd() * 40, vcs: rnd() * 5, fop: rnd() * 1e5, normal: 1 + rnd() * 1000, basis, fos: rnd() * 1e4, open };
    const A = ab(o, periods);
    A.periods.forEach(p => {
      near(p.diff, p.closeFix - p.openFix, 1e-6 * (1 + Math.abs(p.diff)));
      near(p.A.sales - p.M.sales, 0);
      if (basis === 'actual') near(p.under, 0, 1e-6);
    });
    near(A.totA - A.totM, A.periods[n - 1].closeFix - A.periods[0].openFix, 1e-6 * (1 + Math.abs(A.totA)));
    const same = ab(o, periods.map(([nm, pr]) => [nm, pr, pr])).periods;            // production = sales every period: no difference
    if (!open) same.forEach(p => near(p.diff, 0, 1e-6));
  }
  assert.throws(() => ab({ price: 10, vcp: 5, fop: 100, normal: 10 }, [['Q1', 10, 20]]), /cannot be sold/);
  assert.throws(() => ab({ price: 10, vcp: 5, fop: 100, basis: 'actual' }, [['Q1', 0, 0]]), /must produce/);
});
test('cvp: Tapri four quarters: stock returns to zero, so the yearly totals agree; every statement renders', () => {
  const r = run(def.presets.find(x => /four quarters/.test(x.label)).values);
  near(r.sim.totA, r.sim.totM, 1e-6);
  r.frames.forEach(f => f.view.forEach(s => GA.diagram.render(s)));
  assert.ok(r.frames.length <= 120);
});

/* ---------------------------------------------------------------- presets and the lab's own checks */
test('cvp: every preset computes, renders every frame and keeps frames ≤ 120; at least 3 presets cite ICAI', () => {
  def.presets.forEach(p => {
    const r = run(p.values);
    assert.ok(r.frames.length >= 3 && r.frames.length <= 120, p.label);
    r.frames.forEach(f => f.view.forEach(s => { const h = GA.diagram.render(s); assert.ok(!/Diagram error/.test(h), p.label); }));
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, p.label + ' tiles');
  });
  assert.ok(def.presets.filter(p => /RTP|MTP|PYQ/.test(p.label)).length >= 3);
});
