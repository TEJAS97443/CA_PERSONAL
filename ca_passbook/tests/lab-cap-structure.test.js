/* Capital Structure Theories Lab: the ICAI Study Material's illustrations (Paper 6A, ch. 5, July 2024 edition), real ICAI questions with
   their Suggested Answers, and identities / brute force on random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/cap-structure.js');
const { solve, sweep, traditional, arbitrage, compute, def } = LAB;
const Lk = 100000;
const near = (a, b, eps, msg) => { if (Math.abs(a - b) > eps) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const pct2 = x => Math.round(x * 10000) / 100;                    // a rate to two decimals of a per cent
const dflt = () => { const v = {}; def.controls.forEach(c => (v[c.id] = c.type === 'table' ? c.rows.map(r => r.slice()) : c.value)); return v; };
const run = vals => compute(Object.assign(dflt(), vals));
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ================================================================ Study Material illustrations */
test('SM Illustration 1 (Rupa Ltd, NI): S = ₹18,75,000, V = ₹38,75,000, Ko = 12.90%', () => {
  const R = solve('ni', { ebit: 5 * Lk, kd: 0.10, ke: 0.16, debt: 20 * Lk });
  near(R.I, 2 * Lk, 1e-6); near(R.NI, 3 * Lk, 1e-6); near(R.S, 1875000, 1e-6); near(R.V, 3875000, 1e-6); assert.equal(pct2(R.Ko), 12.90);
});
test('SM Illustration 2 (Indra Ltd, traditional/NI valuation): S = ₹3,33,333, V = ₹8,33,333, Ko = 12%', () => {
  const R = solve('ni', { ebit: 1 * Lk, kd: 0.10, ke: 0.15, debt: 5 * Lk });
  assert.equal(Math.round(R.S), 333333); assert.equal(Math.round(R.V), 833333); near(R.Ko, 0.12, 1e-12);
  near(R.Ke * R.S / R.V + R.Kd * R.D / R.V, 0.12, 1e-12, 'Ko = Ke·S/V + Kd·D/V');
});
test('SM Illustration 3 (seven options, weights given): Ko 13.00, 12.80, 13.52, 14.10, 14.80, 16.50, 18.80%; option 2 is optimal', () => {
  const T = traditional([[0, 11, 13], [10 * Lk, 11, 13], [20 * Lk, 11.6, 14], [30 * Lk, 12, 15], [40 * Lk, 13, 16], [50 * Lk, 15, 18], [60 * Lk, 18, 20]], { basis: 'book', cap: 100 * Lk });
  assert.deepEqual(T.rows.map(r => pct2(r.Ko)), [13.00, 12.80, 13.52, 14.10, 14.80, 16.50, 18.80]);
  assert.equal(T.best, 1);
});
test('SM Illustration 4 (Amita Ltd, NOI): V = ₹33,33,333, S = ₹18,33,333, Ke = 19.09%', () => {
  const R = solve('noi', { ebit: 5 * Lk, kd: 0.10, ko: 0.15, debt: 15 * Lk });
  assert.equal(Math.round(R.V), 3333333); assert.equal(Math.round(R.S), 1833333); assert.equal(pct2(R.Ke), 19.09);
  near(R.Ko + (R.Ko - R.Kd) * R.D / R.S, R.Ke, 1e-12, 'Ke = Ko + (Ko − Kd) D/S');
});
test('SM Illustration 5 (Alpha Ltd 50% debt, Beta Ltd 20% debt, no tax): V = ₹20,00,000; Ke 28% and 20.5%; a 2% holder of Alpha earns ₹5,600', () => {
  const A = solve('mm', { ebit: 3.6 * Lk, kd: 0.08, ko: 0.18, share: 0.5 }), B = solve('mm', { ebit: 3.6 * Lk, kd: 0.08, ko: 0.18, share: 0.2 });
  near(A.V, 20 * Lk, 1e-6); near(A.D, 10 * Lk, 1e-6); near(A.NI, 2.8 * Lk, 1e-6); near(0.02 * A.NI, 5600, 1e-6);
  near(A.Ke, 0.28, 1e-12); near(B.D, 4 * Lk, 1e-6); near(B.NI, 3.28 * Lk, 1e-6); near(B.Ke, 0.205, 1e-12);
});
test('SM practical problem 7 (Sanghmani Ltd, one-third debt at 10%, Samsui Ke 16%): Ke = 19% under MM', () => {
  near(solve('mm', { ebit: 16 * Lk, kd: 0.10, ko: 0.16, share: 1 / 3 }).Ke, 0.19, 1e-12);
});
test('SM practical problem 9 (Leo Ltd, MM at book values): Ke 18.00, 19.00, 20.20, 21.50, 23.25, 25.14, 27.50, 30.60, 34.00%', () => {
  const T = traditional([[0, 0, 12], [10 * Lk, 7, 12.5], [20 * Lk, 7, 13], [30 * Lk, 7.5, 13.5], [40 * Lk, 7.5, 14], [50 * Lk, 8, 15], [60 * Lk, 8.5, 16], [70 * Lk, 9, 17], [80 * Lk, 10, 20]], { basis: 'book', ebit: 21.6 * Lk, cap: 120 * Lk, mm: true });
  near(T.mm.ko, 0.18, 1e-12);
  assert.deepEqual(T.mm.rows.map(r => pct2(r.ke)), [18.00, 19.00, 20.20, 21.50, 23.25, 25.14, 27.50, 30.60, 34.00]);
});
test('SM Illustration 10 (Blue Ltd, ₹275 lakh of 15% debentures, t 30%): EBIT ₹500 lakh, VL ₹1,832.5 lakh, Ke 20.62%, Ko 19.10%', () => {
  const R = solve('mmtax', { vu: 1750, keu: 0.20, kd: 0.15, t: 0.30, debt: 275 });
  near(R.ebit, 500, 1e-9); near(R.V, 1832.5, 1e-9); near(R.S, 1557.5, 1e-9); near(R.EBT, 458.75, 1e-9); near(R.NI, 321.125, 1e-9);
  assert.equal(pct2(R.Ke), 20.62); assert.equal(pct2(R.Kdt), 10.5); assert.equal(pct2(R.Ko), 19.10);
  near(R.Ko, 0.20 * (1 - 0.3 * 275 / 1832.5), 1e-12, 'Ko = Keu (1 − tL)');
  near(R.Ke, 0.20 + (0.20 - 0.15) * 275 * 0.7 / 1557.5, 1e-12, 'Ke = Keu + (Keu − Kd)(1 − t) D/S');
});

/* ================================================================ arbitrage: Study Material Illustrations 6 – 9 */
test('SM Illustration 6 (M Ltd levered, Ke 11.5%; N Ltd Ke 10%): VM ₹2,13,043; 10% holder keeps ₹1,300 of income and frees ₹1,304.3', () => {
  const A = arbitrage({ ebit: 20000, debt: 100000, kd: 0.07, keL: 0.115, keU: 0.10, alpha: 0.10, method: 'same' });
  assert.equal(A.dir, 'LtoU'); assert.equal(Math.round(A.SL), 113043); assert.equal(Math.round(A.VL), 213043);
  near(A.sell, 11304.35, 0.01); near(A.borrow, 10000, 1e-9); near(A.buy, 20000, 1e-9); near(A.surplus, 1304.35, 0.01);
  near(A.after, 1300, 1e-9); near(A.before, 1300, 1e-9);
});
test('SM Illustration 7 (15% holder of the levered firm, Ke 12.5% both): sell ₹24,000, borrow ₹15,000, buy ₹39,000, gain ₹375', () => {
  const A = arbitrage({ ebit: 30000, debt: 100000, kd: 0.10, keL: 0.125, keU: 0.125, alpha: 0.15, method: 'all' });
  near(A.VL, 260000, 1e-6); near(A.VU, 240000, 1e-6); near(A.sell, 24000, 1e-6); near(A.borrow, 15000, 1e-9); near(A.buy, 39000, 1e-6);
  near(A.incU, 4875, 1e-6); near(A.interest, 1500, 1e-9); near(A.after, 3375, 1e-6); near(A.before, 3000, 1e-6); near(A.gain, 375, 1e-6);
});
test('SM Illustration 8 (U Ltd Ke 10%, L Ltd Ke 18%): L worth ₹1,72,222; 10% holder of U keeps ₹2,000 of income and frees ₹2,778', () => {
  const A = arbitrage({ ebit: 20000, debt: 100000, kd: 0.07, keL: 0.18, keU: 0.10, alpha: 0.10, method: 'same' });
  assert.equal(A.dir, 'UtoL'); assert.equal(Math.round(A.SL), 72222); assert.equal(Math.round(A.VL), 172222);
  assert.equal(Math.round(A.buyE), 7222); near(A.lend, 10000, 1e-9); assert.equal(Math.round(A.cost), 17222); assert.equal(Math.round(A.surplus), 2778);
  near(A.incD, 700, 1e-9); near(A.incE, 1300, 1e-9); near(A.after, 2000, 1e-9);
});
test('SM Illustration 9 (unlevered firm dearer, 15% holder): sell ₹36,000, lend ₹18,000, buy ₹18,000 of shares, gain ₹900', () => {
  const A = arbitrage({ ebit: 30000, debt: 100000, kd: 0.10, keL: 0.20, keU: 0.125, alpha: 0.15, method: 'all' });
  assert.equal(A.dir, 'UtoL'); near(A.VL, 200000, 1e-6); near(A.VU, 240000, 1e-6);
  near(A.sell, 36000, 1e-6); near(A.lend, 18000, 1e-6); near(A.buyE, 18000, 1e-6); near(A.incE, 3600, 1e-6); near(A.incD, 1800, 1e-6);
  near(A.after, 5400, 1e-6); near(A.before, 4500, 1e-6); near(A.gain, 900, 1e-6);
});

/* ================================================================ real ICAI questions with their Suggested Answers */
test('PYQ May 2024 Q2(b) (Suggested Answer): 12% holder of the levered firm: ₹18,240 + ₹9,000 → ₹27,240, income ₹2,685 vs ₹2,280, gain ₹405', () => {
  const A = arbitrage({ ebit: 25000, debt: 75000, kd: 0.08, keL: 0.125, keU: 0.125, alpha: 0.12, method: 'all' });
  near(A.SL, 152000, 1e-6); near(A.VL, 227000, 1e-6); near(A.VU, 200000, 1e-6);
  near(A.sell, 18240, 1e-6); near(A.borrow, 9000, 1e-6); near(A.buy, 27240, 1e-6); near(A.incU, 3405, 1e-6); near(A.interest, 720, 1e-9);
  near(A.after, 2685, 1e-6); near(A.before, 2280, 1e-6); near(A.gain, 405, 1e-6);
});
test('PYQ May 2024 Q2(b), the Suggested Answer\'s second method: same ₹2,280 of income and ₹3,240 of surplus cash', () => {
  const A = arbitrage({ ebit: 25000, debt: 75000, kd: 0.08, keL: 0.125, keU: 0.125, alpha: 0.12, method: 'same' });
  near(A.funds, 27240, 1e-6); near(A.buy, 24000, 1e-6); near(A.surplus, 3240, 1e-6); near(A.incU, 3000, 1e-6); near(A.after, 2280, 1e-6);
});
test('RTP May 2024 Q3 = MTP Sep 2026 Series 1 Q1(a): 20% holder: sell ₹48,000, borrow ₹30,000, buy ₹78,000, gain ₹750', () => {
  const A = arbitrage({ ebit: 45000, debt: 150000, kd: 0.10, keL: 0.125, keU: 0.125, alpha: 0.20, method: 'all' });
  near(A.VL, 390000, 1e-6); near(A.VU, 360000, 1e-6); near(A.sell, 48000, 1e-6); near(A.borrow, 30000, 1e-6); near(A.buy, 78000, 1e-6);
  near(A.incU, 9750, 1e-6); near(A.after, 6750, 1e-6); near(A.before, 6000, 1e-6); near(A.gain, 750, 1e-6);
});
test('RTP May 2026 Q6 = RTP Sep 2024 Q7 = SM problem 8: MM no tax V ₹1 crore, Ke 25.04%, Ko 18%; with 40% tax Vu ₹60 lakh, VL ₹81.6 lakh, Ke 25.04%, Ko 13.23%', () => {
  const a = solve('mm', { ebit: 18 * Lk, kd: 0.12, ko: 0.18, debt: 54 * Lk });
  near(a.V, 100 * Lk, 1e-6); near(a.S, 46 * Lk, 1e-6); near(a.I, 6.48 * Lk, 1e-6); assert.equal(+a.Ke.toFixed(4), 0.2504); near(a.Ke * a.S / a.V + a.Kd * a.D / a.V, 0.18, 1e-12);
  const b = solve('mmtax', { ebit: 18 * Lk, kd: 0.12, keu: 0.18, t: 0.40, debt: 54 * Lk });
  near(b.Vu, 60 * Lk, 1e-6); near(b.V, 81.6 * Lk, 1e-6); near(b.S, 27.6 * Lk, 1e-6); near(b.tax, 460800, 1e-6); near(b.NI, 691200, 1e-6);
  assert.equal(+b.Ke.toFixed(4), 0.2504); assert.equal(pct2(b.Kdt), 7.2); near(b.Ko, 0.1323, 0.00006, 'Ko 13.235%: the answer adds the rounded parts 0.0846 + 0.0477 = 13.23%');
});
test('PYQ May 2025 Q3(b) (Z Ltd, Suggested Answer): VL ₹1,490 lakh (+₹90 lakh), S ₹1,190 lakh, Ke 19.06%, Ko 16.91%', () => {
  const R = solve('mmtax', { vu: 1400, keu: 0.18, kd: 0.12, t: 0.30, debt: 300 });
  near(R.V, 1490, 1e-9); near(R.TB, 90, 1e-9); near(R.S, 1190, 1e-9); near(R.ebit, 360, 1e-9); near(R.NI, 226.8, 1e-9);
  assert.equal(pct2(R.Ke), 19.06); assert.equal(pct2(R.Kdt), 8.4); assert.equal(pct2(R.Ko), 16.91);
});
test('RTP Sep 2024 Q6 (ABC Ltd and XYZ Ltd, tax advantage 25%): S ₹7 crore, WACC 18.18%, Ke 24.29% (answer: 24.28% approx.)', () => {
  const R = solve('mmtax', { vu: 1000 * Lk, keu: 0.20, kd: 0.10, t: 0.25, debt: 400 * Lk });
  near(R.V, 1100 * Lk, 1e-6); near(R.S, 700 * Lk, 1e-6); assert.equal(pct2(R.Ko), 18.18); near(R.Ke, 0.20 + 0.75 * 4 / 7 * 0.10, 1e-12); assert.equal(pct2(R.Ke), 24.29);
});
test('MTP May 2025 Series 2 Q2(b) (Zordon Ltd, book values): Ko lowest 9.8% at ₹15,00,000 of debt; MM Ke 10.0, 10.4, 11.0, 11.6, 12.0, 12.5, 13.0%', () => {
  const T = traditional([[0, 0, 10], [5 * Lk, 6, 10.5], [10 * Lk, 6, 11], [15 * Lk, 6.2, 11.3], [20 * Lk, 7, 12.4], [25 * Lk, 7.5, 13.5], [30 * Lk, 8, 16]], { basis: 'book', ebit: 5 * Lk, cap: 50 * Lk, mm: true });
  [0.100, 0.101, 0.100, 0.098, 0.102, 0.106, 0.112].forEach((k, i) => near(T.rows[i].Ko, k, 0.0011, `row ${i + 1}`));   // the answer's column (7) adds parts rounded to 3 places
  assert.equal(T.best, 3); near(T.rows[3].D, 15 * Lk, 1e-9);
  near(T.mm.ko, 0.10, 1e-12);
  assert.deepEqual(T.mm.rows.map(r => +r.ke.toFixed(3)), [0.100, 0.104, 0.110, 0.116, 0.120, 0.125, 0.130]);
});

/* ================================================================ identities and brute force on random inputs */
test('random NOI / MM 1958 firms: V and Ko are flat across leverage, Ke = Ko + (Ko − Kd) D/S, Ko = Ke S/V + Kd D/V (2,000 cases)', () => {
  const rnd = lcg(7);
  for (let k = 0; k < 2000; k++) {
    const ko = 0.08 + rnd() * 0.15, kd = ko * (0.2 + 0.75 * rnd()), ebit = 1e4 + rnd() * 1e7, mode = rnd() < 0.5 ? 'noi' : 'mm';
    const V0 = ebit / ko, D = rnd() * 0.95 * V0;
    const R = solve(mode, { ebit, kd, ko, debt: D });
    near(R.V / V0, 1, 1e-12); near(R.S + R.D, R.V, 1e-6 * R.V);
    near(R.Ke, ko + (ko - kd) * D / R.S, 1e-9); near(R.Ke * R.S / R.V + kd * D / R.V, ko, 1e-12);
    const S = sweep(mode, { ebit, kd, ko }, R.share);
    S.forEach(r => { near(r.V / V0, 1, 1e-12); near(r.Ko, ko, 1e-15); });
    for (let i = 1; i < S.length; i++) assert.ok(S[i].Ke > S[i - 1].Ke, 'Ke rises with leverage');
    assert.ok(S.some(r => r.mine && Math.abs(r.D - D) < 1e-6 * V0 + 1e-6), 'the chosen debt is on the grid');
  }
});
test('random NI firms: Ke and Kd fixed, Ko = EBIT/V = Ke S/V + Kd D/V, V rises and Ko falls with leverage; % and amount inputs agree (2,000 cases)', () => {
  const rnd = lcg(11);
  for (let k = 0; k < 2000; k++) {
    const ke = 0.08 + rnd() * 0.2, kd = ke * (0.2 + 0.75 * rnd()), ebit = 1e4 + rnd() * 1e7, D = rnd() * 0.95 * ebit / kd;
    const R = solve('ni', { ebit, kd, ke, debt: D });
    near(R.S, (ebit - kd * D) / ke, 1e-6); near(R.V, R.S + D, 1e-6); near(R.Ko, ebit / R.V, 1e-12); near(R.Ke * R.S / R.V + kd * D / R.V, R.Ko, 1e-12);
    const P = solve('ni', { ebit, kd, ke, share: R.share });
    near(P.D, D, 1e-6 * (1 + D)); near(P.V, R.V, 1e-6 * R.V);
    const S = sweep('ni', { ebit, kd, ke }, R.share);
    for (let i = 1; i < S.length; i++) { assert.ok(S[i].V > S[i - 1].V); assert.ok(S[i].Ko < S[i - 1].Ko); near(S[i].Ke, ke, 0); }
  }
});
test('random MM 1963 firms: VL = Vu + tD, Ko = Keu(1 − tD/V) from the weighted after-tax costs, Ke from income = formula; from EBIT or from Vu agree (2,000 cases)', () => {
  const rnd = lcg(13);
  for (let k = 0; k < 2000; k++) {
    const keu = 0.08 + rnd() * 0.15, kd = keu * (0.2 + 0.75 * rnd()), t = rnd() * 0.5, ebit = 1e4 + rnd() * 1e7;
    const Vu = ebit * (1 - t) / keu, D = rnd() * 0.95 * Vu / (1 - t);
    const R = solve('mmtax', { ebit, keu, kd, t, debt: D });
    near(R.V, Vu + t * D, 1e-6 * R.V); near(R.Ko, keu * (1 - t * D / R.V), 1e-12); near(R.Ke, keu + (keu - kd) * (1 - t) * D / R.S, 1e-9);
    near(R.Ko, R.Ke * R.S / R.V + kd * (1 - t) * D / R.V, 1e-12);
    const W = solve('mmtax', { vu: Vu, keu, kd, t, debt: D });
    near(W.ebit, ebit, 1e-6 * ebit); near(W.Ke, R.Ke, 1e-9);
    const P = solve('mmtax', { ebit, keu, kd, t, share: R.share });
    near(P.D, D, 1e-6 * (1 + D));
    const S = sweep('mmtax', { ebit, keu, kd, t }, R.share);
    for (let i = 1; i < S.length; i++) if (t > 0.001) { assert.ok(S[i].V > S[i - 1].V); assert.ok(S[i].Ko < S[i - 1].Ko); }
  }
});
test('random arbitrage: gain = α·KeU·(VL − VU) or α·EBIT·(VU − VL)/VL, ≥ 0; surplus = α·|VL − VU| with the income unchanged; nothing when the values match (3,000 cases)', () => {
  const rnd = lcg(17);
  for (let k = 0; k < 3000; k++) {
    const ebit = 1e4 + rnd() * 1e6, kd = 0.04 + rnd() * 0.1, D = rnd() * 0.9 * ebit / kd, keU = 0.06 + rnd() * 0.2, keL = keU * (0.7 + rnd() * 0.8), a = 0.01 + rnd() * 0.5;
    const all = arbitrage({ ebit, debt: D, kd, keL, keU, alpha: a, method: 'all' }), same = arbitrage({ ebit, debt: D, kd, keL, keU, alpha: a, method: 'same' });
    if (all.dir === 'none') continue;
    assert.ok(all.gain >= -1e-9, 'never a loss');
    if (all.dir === 'LtoU') near(all.gain, a * keU * (all.VL - all.VU), 1e-6 * (1 + all.gain));
    else near(all.gain, a * ebit * (all.VU - all.VL) / all.VL, 1e-6 * (1 + all.gain));
    near(same.surplus, a * Math.abs(all.VL - all.VU), 1e-6 * (1 + same.surplus));
    near(same.after, same.before, 1e-6 * same.before, 'same income');
    if (all.dir === 'UtoL') near(all.lend / (all.lend + all.buyE), D / all.VL, 1e-12, 'lend in the levered firm\'s proportion');
  }
  const eq = arbitrage({ ebit: 30000, debt: 100000, kd: 0.10, keL: 0.20 / 1, keU: 0.15, alpha: 0.1, method: 'all' });   // S = 20,000 / 0.2 = 1,00,000; V = 2,00,000 = 30,000 / 0.15
  assert.equal(eq.dir, 'none'); assert.equal(eq.gain, 0);
});
test('random traditional schedules: the optimum is the brute-force minimum Ko; market Ko = EBIT/V = Ke·S/V + Kd·D/V; book weights add to 1 (1,000 cases)', () => {
  const rnd = lcg(19);
  for (let k = 0; k < 1000; k++) {
    const n = 2 + Math.floor(rnd() * 8), step = (1 + Math.floor(rnd() * 9)) * Lk, ebit = (2 + rnd() * 10) * step;
    const rows = Array.from({ length: n }, (_, i) => [i * step, i ? 5 + i + rnd() * 3 : 0, 10 + i * (0.5 + rnd() * 2)]);
    const book = rnd() < 0.5, cap = (n + 1) * step;
    let T;
    try { T = traditional(rows, { basis: book ? 'book' : 'market', ebit, cap }); } catch (e) { assert.match(e.message, /leaves nothing/); continue; }
    const kos = T.rows.map(r => r.Ko), min = Math.min(...kos);
    if (!book) near(T.rows[T.best].V, Math.max(...T.rows.map(x => x.V)), 1e-6, 'the lowest Ko is the highest V');
    assert.equal(T.best, kos.findIndex(x => x === min));
    T.rows.forEach((r, i) => {
      if (book) near(r.we + r.wd, 1, 1e-12);
      else { near(r.Ko, ebit / r.V, 1e-12); near(r.ke * r.S / r.V + (r.kd || 0) * r.D / r.V, r.Ko, 1e-12); }
    });
  }
});

/* ================================================================ the lab: frames, views, presets, errors, challenge */
test('every preset and every mode on the defaults computes; frames ≤ 120; every view renders; the first frame shows only givens', () => {
  const sets = def.presets.map(p => [p.label, p.values]).concat(['ni', 'noi', 'trad', 'mm', 'mmtax', 'arb'].map(m => ['default ' + m, { mode: m }]));
  for (const [label, vals] of sets) {
    const r = run(vals);
    assert.ok(r.frames.length >= 5 && r.frames.length <= 120, label + ': ' + r.frames.length + ' frames');
    r.frames.forEach((f, i) => {
      assert.ok(typeof f.caption === 'string' && f.caption.length > 20, `${label} #${i} caption`);
      assert.ok(!/undefined|NaN|\[object/.test(f.caption), `${label} #${i}: ${f.caption.slice(0, 120)}`);
      f.view.forEach(s => { const html = GA.diagram.render(s); assert.ok(!/NaN|undefined/.test(html), `${label} #${i} ${s.type}`); });
    });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, label + ' tiles');
    r.stats.forEach(s => assert.ok(!/NaN|undefined|—/.test(s.value), `${label}: ${s.label} = ${s.value}`));
    assert.deepEqual(r.given, r.frames[0].view.slice(0, 1), label + ': the test state shows the givens (the first frame)');
    assert.ok(/\*\*Conventions\.\*\*/.test(r.note), label + ' note');
  }
});
test('the stage reads like the ICAI answer: Illustration 1\'s statement ends at Ko 12.90%; the PYQ May 2024 frames end with the ₹405 gain', () => {
  const r = run(def.presets[1].values), last = r.frames[r.frames.length - 1];
  const st = last.view.find(s => s.type === 'table');
  assert.deepEqual(st.rows.map(x => x[2]).slice(-4), ['₹3,00,000', '₹18,75,000', '₹38,75,000', '12.90%']);
  const a = run(def.presets.find(p => /PYQ May 2024 Q2\(b\): a 12%/.test(p.label)).values);
  const moves = a.table.rows.map(x => x[2]);
  assert.deepEqual(moves, ['₹18,240', '₹9,000', '₹27,240', '₹3,405', '₹720', '₹2,685', '₹2,280', '₹405']);
  assert.match(a.frames[a.frames.length - 2].caption, /gains \*\*₹405\*\* a year/);
});
test('presets cite at least two real ICAI questions and the Study Material; the cast appears', () => {
  const labels = def.presets.map(p => p.label);
  assert.ok(labels.filter(l => /\b(PYQ|RTP|MTP) (May|Sep|Jan)\b/.test(l)).length >= 4, 'ICAI papers');
  assert.ok(labels.some(l => /Study Material Illustration/.test(l)));
  assert.ok(labels.some(l => /Tapri Tea Co\. Ltd/.test(l)));
  assert.ok(def.presets.length >= 3);
});
test('lakh amounts read as ₹ lakh; rupee amounts use Indian grouping and whole rupees above ₹1 lakh', () => {
  assert.equal(LAB.money(1832.5, 'lakh'), '₹1,832.5 lakh');
  assert.equal(LAB.money(3875000, 'rs'), '₹38,75,000');
  assert.equal(LAB.money(113043.478, 'rs'), '₹1,13,043');
  assert.equal(LAB.money(11304.348, 'rs'), '₹11,304.35');
  const r = run(def.presets.find(p => /PYQ May 2025/.test(p.label)).values);
  assert.equal(r.stats[0].value, '₹1,490 lakh');
});
test('bad input fails with a plain message', () => {
  assert.throws(() => solve('ni', { ebit: 1e5, kd: 0.10, ke: 0.16, debt: 2e6 }), /swallow the whole EBIT/);
  assert.throws(() => solve('ni', { ebit: 1e5, kd: 0.18, ke: 0.16, debt: 1e5 }), /Kd lower than Ke/);
  assert.throws(() => solve('noi', { ebit: 1e5, kd: 0.10, ko: 0.15, debt: 7e5 }), /less than the value of the firm/);
  assert.throws(() => solve('mm', { ebit: 1e5, kd: 0.10, ko: 0.15, share: 1 }), /below 100%/);
  assert.throws(() => solve('mmtax', { ebit: 1e5, kd: 0.10, keu: 0.15, t: 0.3, debt: 1e6 }), /too large/);
  assert.throws(() => traditional([[0, 0, 12], [0, 8, 13]], { basis: 'market', ebit: 1e5 }), /smallest to the largest/);
  assert.throws(() => traditional([[0, 0, 12]], { basis: 'market', ebit: 1e5 }), /at least two/);
  assert.throws(() => traditional([[0, 0, 12], [6e6, 8, 13]], { basis: 'book', ebit: 1e5, cap: 5e6 }), /less than the total capital/);
  assert.throws(() => arbitrage({ ebit: 1e4, debt: 2e5, kd: 0.1, keL: 0.15, keU: 0.12, alpha: 0.1 }), /swallows/);
  assert.throws(() => run({ mode: 'ni', kd: 20, ke: 16 }), /Kd lower than Ke/);
});
test('challenge: 150 problems per mode; each answer agrees with an independent recomputation from the drawn inputs', () => {
  const L = require('../app/js/labs/framework.js');
  const indep = v => {
    const P = x => +x / 100;
    if (v.mode === 'arb') {
      const I = P(v.kd) * v.debtLev, SL = (v.ebit - I) / P(v.keLev), VL = SL + +v.debtLev, VU = v.ebit / P(v.keUnlev), a = P(v.hold);
      if (v.switch === 'same') return Math.round(a * Math.abs(VL - VU));
      return Math.round(VL > VU ? a * P(v.keUnlev) * (VL - VU) : a * v.ebit * (VU - VL) / VL);
    }
    if (v.mode === 'trad') {
      const ko = v.sched.map(([D, kd, ke]) => {
        if (v.basis === 'book') return P(ke) * (1 - D / v.cap) + P(kd) * D / v.cap;
        const S = (v.ebit - P(kd) * D) / P(ke); return v.ebit / (S + D);
      });
      const i = ko.indexOf(Math.min(...ko));
      return v.q === 'ko' ? Math.round(ko[i] * 10000) / 100 : v.sched[i][0];
    }
    const D = v.dmode === 'pct' ? null : +v.debt;
    let V, S, Ke, Ko;
    if (v.mode === 'ni') { S = (v.ebit - P(v.kd) * D) / P(v.ke); V = S + D; Ko = v.ebit / V; Ke = P(v.ke); }
    else if (v.mode === 'noi' || v.mode === 'mm') { V = v.ebit / P(v.ko); const d = D == null ? P(v.share) * V : D; S = V - d; Ke = (v.ebit - P(v.kd) * d) / S; Ko = P(v.ko); }
    else { const t = P(v.tax), ebit = v.start === 'vu' ? v.vu * P(v.keu) / (1 - t) : +v.ebit, Vu = ebit * (1 - t) / P(v.keu); V = Vu + t * D; S = V - D; Ke = (ebit - P(v.kd) * D) * (1 - t) / S; Ko = P(v.keu) * (1 - t * D / V); }
    const money = x => (v.unit === 'lakh' ? Math.round(x * 100) / 100 : Math.round(x));
    return { v: money(V), s: money(S), ke: Math.round(Ke * 10000) / 100, ko: Math.round(Ko * 10000) / 100 }[v.q || (v.mode === 'ni' ? 'v' : v.mode === 'mmtax' ? 'v' : 'ke')];
  };
  for (const mode of ['ni', 'noi', 'trad', 'mm', 'mmtax', 'arb']) {
    const kinds = new Set();
    for (let s = 1; s <= 150; s++) {
      const Pb = L.problem(def, Object.assign(dflt(), { mode }), s * 104729);
      assert.equal(Pb.values.mode, mode, 'the problem follows the mode being explored');
      const want = indep(Pb.values);
      near(Pb.want, want, 0.0100001, `${mode}#${s}`);
      assert.ok(Pb.want > 0);
      const prompt = def.challenge.prompt(Pb.values, Pb.result);
      assert.ok(prompt.length > 40 && !/undefined|NaN/.test(prompt), prompt);
      assert.ok(def.challenge.explain(Pb.result, Pb.values).length > 20);
      kinds.add(Pb.values.q || Pb.values.switch);
    }
    assert.ok(kinds.size >= 2, mode + ' asks more than one kind of question');
  }
});
test('the lab registers with the framework and its blurb is one verb-first sentence of at most 120 characters', () => {
  assert.equal(def.id, 'cap-structure');
  assert.ok(def.blurb.length <= 120 && /^Watch\b/.test(def.blurb));
  assert.equal(def.controls[0].id, 'mode');
});
