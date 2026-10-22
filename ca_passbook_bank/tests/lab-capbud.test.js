/* Capital Budgeting Lab (app/js/labs/capbud.js): the ICAI Study Material's illustrations (Paper 6A, Chapter 7), real ICAI questions with
   their Suggested Answers, identities and brute force on random inputs, the frames and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/capbud.js');
const { pvif, pvaf, fvif, flowsOf, pvRows, npvAt, exactNPV, irrExact, irrInterp, payback, arrOf, mirrOf, crossover, compute, def } = LAB;
const dflt = () => Object.fromEntries(def.controls.map(c => [c.id, c.type === 'table' ? c.rows.map(r => r.slice()) : c.value]));
const one = cf => cf.map((c, t) => [String(t), c]);
const two = (a, b) => { const n = Math.max(a.length, b.length); return Array.from({ length: n }, (_, t) => [String(t), a[t] || 0, b[t] || 0]); };
const run = v => compute(Object.assign(dflt(), { factors: '3', annuity: false, basis: 'cfat', salvage: 0, wc: 0, lo: 0, hi: 0, loB: 0, hiB: 0, reinvest: 0 }, v));
const preset = re => { const p = def.presets.find(x => re.test(x.label)); assert.ok(p, 'preset ' + re); return compute(Object.assign(dflt(), p.values)); };
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg || ''} expected ${b} ± ${tol}, got ${a}`);
const pct = x => Math.round(x * 10000) / 100;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const stat = (res, re) => { const s = res.stats.find(x => re.test(x.label)); assert.ok(s, 'stat ' + re); return s.value; };
const caps = res => res.frames.map(f => f.caption).join('\n');
const F = (cf, o) => flowsOf(cf, o || {});

/* ---------------------------------------------------------------- factors */
test('PV factors as ICAI prints them: 10%: 0.909 0.826 0.751 0.683 0.621; 12%: 0.893 0.797 0.712 0.636 0.567; 15%: 0.870 … 0.247 (10 years); 2-decimal 0.91 0.83 0.75 0.68 0.62', () => {
  assert.deepEqual([1, 2, 3, 4, 5].map(t => pvif(0.10, t, '3')), [0.909, 0.826, 0.751, 0.683, 0.621]);
  assert.deepEqual([1, 2, 3, 4, 5].map(t => pvif(0.12, t, '3')), [0.893, 0.797, 0.712, 0.636, 0.567]);
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => pvif(0.15, t, '3')), [0.870, 0.756, 0.658, 0.572, 0.497, 0.432, 0.376, 0.327, 0.284, 0.247]);
  assert.deepEqual([1, 2, 3, 4, 5].map(t => pvif(0.10, t, '2')), [0.91, 0.83, 0.75, 0.68, 0.62]);
  assert.deepEqual([1, 2, 3, 4].map(t => pvif(0.46, t, '4')), [0.6849, 0.4691, 0.3213, 0.2201]);
  assert.equal(pvaf(0.12, 6, '3'), 4.111); assert.equal(pvaf(0.13, 6, '3'), 3.998); assert.equal(pvaf(0.15, 5, '2'), 3.35); assert.equal(pvaf(0.16, 5, '2'), 3.27);
  assert.deepEqual([4, 3, 2, 1].map(n => fvif(0.08, n, '4')), [1.3605, 1.2597, 1.1664, 1.08]); assert.deepEqual([3, 2, 1].map(n => fvif(0.10, n, '3')), [1.331, 1.21, 1.1]);
});

/* ---------------------------------------------------------------- Study Material: NPV, PI, IRR */
test('SM Ill. 3: ₹1,00,000 returning ₹55,000, ₹80,000, ₹15,000 at 10%: PVs 49,995, 66,080, 11,265; NPV ₹27,340', () => {
  const res = preset(/Ill\. 3/);
  assert.deepEqual(res.P.rows.map(r => Math.round(r.pv)), [-100000, 49995, 66080, 11265]); assert.equal(Math.round(res.npv), 27340);
  assert.equal(stat(res, /NPV at 10%/), '₹27,340');
});
test('SM Ill. 4 (12%): NPVs A (19,750), B 25,635, C 27,050, D (3,750)', () => {
  const P = cf => Math.round(npvAt(F(cf), 0.12, '3', false));
  assert.equal(P([-200000, 50000, 50000, 50000, 50000, 50000]), -19750);
  assert.equal(P([-190000, 40000, 50000, 70000, 75000, 75000]), 25635);
  assert.equal(P([-250000, 75000, 75000, 60000, 80000, 100000]), 27050);
  assert.equal(P([-210000, 75000, 75000, 60000, 40000, 20000]), -3750);
});
test('SM Ill. 5 (PI): 6,50,000 / 5,50,000 = 1.18; 95,000 / 75,000 = 1.27; 1,00,30,000 / 1,00,20,000 = 1.001', () => {
  const pi = (out, inn) => pvRows(F([-out, inn]), 0, 'exact', false).pi;
  assert.equal(Math.round(pi(550000, 650000) * 100) / 100, 1.18); assert.equal(Math.round(pi(75000, 95000) * 100) / 100, 1.27); assert.equal(Math.round(pi(10020000, 10030000) * 1000) / 1000, 1.001);
});
test('SM Ill. 6 (equal inflows): fake payback 4 between PVAF 4.111 (12%) and 3.998 (13%); NPV +27,750 and −500; IRR 12.978%', () => {
  const res = preset(/Ill\. 6/);
  assert.equal(res.irr.L, 0.12); assert.equal(res.irr.H, 0.13); approx(res.irr.A.npv, 27750, 1e-6); approx(res.irr.B.npv, -500, 1e-6);
  near(res.irr.irr * 100, 12.978, 0.005);           // 12% + 27,750 / 28,250 × 1% = 12.9823%; the SM prints 12.978%
  assert.match(res.frames[0].caption, /'fake payback' ₹10,00,000 \/ ₹2,50,000 = 4 is looked up/);
  assert.match(res.frames[1].caption, /4 lies between PVAF 4\.111 at 12% and 3\.998 at 13%/);
  // year by year instead, the rounded factors add up to 4.112: NPV +28,000 at 12%
  approx(npvAt(F([-1000000, 250000, 250000, 250000, 250000, 250000, 250000]), 0.12, '3', false), 28000, 1e-6);
});
test('SM Ill. 7: ₹1,36,000 at 10% -> +2,280 (PV 1,38,280), at 12% -> −4,190 (PV 1,31,810); IRR 10.704%', () => {
  const res = preset(/Ill\. 7/);
  approx(res.irr.A.pvIn, 138280, 1e-6); approx(res.irr.B.pvIn, 131810, 1e-6); approx(res.irr.A.npv, 2280, 1e-6); approx(res.irr.B.npv, -4190, 1e-6);
  near(res.irr.irr * 100, 10.704, 0.001); assert.equal(stat(res, /IRR \(interpolated\)/), '10.70%');
});
test('SM Ill. 8 (2-decimal annuity factors 3.35 and 3.27): ₹3,60,000 returning ₹1,09,400 for 5 years -> NPV 6,490 and (2,262), IRR 15.74%', () => {
  const res = run({ mode: 'irr', annuity: true, factors: '2', lo: 15, hi: 16, flows: one([-360000, 109400, 109400, 109400, 109400, 109400]) });
  approx(res.irr.A.npv, 6490, 1e-6); approx(res.irr.B.npv, -2262, 1e-6); assert.equal(pct(res.irr.irr), 15.74);
});
test('SM Example 8 and 9 (NPV vs IRR): A 50% / B 25% at one year; Example 9: NPV at 46% ≈ 415, at 35% ≈ 14 (4-decimal factors), and at 5% A 6,97,535 < B 8,15,625', () => {
  approx(irrExact([-100000, 150000])[0], 0.5, 1e-9); approx(irrExact([-500000, 625000])[0], 0.25, 1e-9);
  const A = [-900000, 700000, 600000, 400000, 50000], B = [-800000, 62500, 600000, 600000, 600000];
  near(npvAt(F(A), 0.46, '4', false), 415, 1); near(npvAt(F(B), 0.35, '4', false), 14, 1);
  near(npvAt(F(A), 0.05, '4', false), 697535, 1); near(npvAt(F(B), 0.05, '4', false), 815625, 1);
  const res = run({ mode: 'compare', rate: 5, factors: '4', flows: two(A, B) });
  assert.equal(res.byNPV, 'B'); assert.equal(res.byIRR, 'A'); assert.ok(res.conflict);
});
test('SM Ill. 10 (scale): A 25,050 and B 59,300 at 10%; IRR A 24.26% and B 21.48% (20% and 25%); NPV picks B, IRR picks A', () => {
  const res = preset(/Ill\. 10/);
  assert.equal(Math.round(res.A.P.npv), 25050); assert.equal(Math.round(res.B.P.npv), 59300);
  approx(res.A.Y.A.npv, 6450, 1e-6); approx(res.A.Y.B.npv, -1120, 1e-6); approx(res.B.Y.A.npv, 6380, 1e-6); approx(res.B.Y.B.npv, -15200, 1e-6);
  assert.equal(pct(res.A.Y.irr), 24.26); assert.equal(pct(res.B.Y.irr), 21.48);
  assert.ok(res.conflict); assert.equal(res.choose, 'B'); assert.match(caps(res), /\*\*Conflict\*\* \(from a difference in size \(scale\)\)/);
});
test('SM Ill. 11 (timing): X 51,950 and Y 53,350 at 10%; IRR X 24.87% (20%, 25%), Y 17.60% (15%, 20%)', () => {
  const res = preset(/Ill\. 11/);
  assert.equal(Math.round(res.A.P.npv), 51950); assert.equal(Math.round(res.B.P.npv), 53350);
  approx(res.A.Y.A.npv, 14950, 1e-6); approx(res.A.Y.B.npv, -400, 1e-6); approx(res.B.Y.A.npv, 16500, 1e-6); approx(res.B.Y.B.npv, -15250, 1e-6);
  assert.equal(pct(res.A.Y.irr), 24.87); assert.equal(pct(res.B.Y.irr), 17.6);
  assert.ok(res.conflict); assert.match(caps(res), /timing/);
});
test('SM Ill. 12 (unequal lives, 12%): A 1,69,750, B 3,36,400; A\'s NPV at 50% is ₹250 (IRR ≈ 50%); B 2,85,800 at 15% and (70,600) at 50%: IRR 43.07%', () => {
  const res = run({ mode: 'compare', rate: 12, lo: 50, hi: 51, loB: 15, hiB: 50, flows: two([-500000, 750000, 0, 0], [-500000, 200000, 200000, 700000]) });
  assert.equal(Math.round(res.A.P.npv), 169750); assert.equal(Math.round(res.B.P.npv), 336400);
  approx(res.A.Y.A.npv, 250, 1e-6); near(res.A.Y.irr * 100, 50, 0.1);
  approx(res.B.Y.A.npv, 285800, 1e-6); approx(res.B.Y.B.npv, -70600, 1e-6); assert.equal(pct(res.B.Y.irr), 43.07);
  assert.ok(res.conflict); assert.equal(res.choose, 'B');
});

/* ---------------------------------------------------------------- Study Material: payback, discounted payback, ARR, MIRR */
test('SM Example 5 (payback): ₹2,00,000 recovered in exactly 3 years; ₹2,05,000 in 3¼ years (₹5,000 of the 4th year\'s ₹20,000)', () => {
  assert.equal(payback([-200000, 80000, 60000, 60000, 20000]).years, 3);
  const p = payback([-205000, 80000, 60000, 60000, 20000]); approx(p.years, 3.25, 1e-12); approx(p.need, 5000); approx(p.inflow, 20000);
  assert.equal(payback([-30000, 6000, 6000, 6000, 6000, 6000]).years, 5);   // Example 10: simple payback 5 years
});
test('SM Example 10 (discounted payback at 15%): cumulative PV 5,220 … 28,632 after 9 years, 30,114 after 10: about 10 years (9.92)', () => {
  const res = run({ mode: 'payback', rate: 15, flows: one([-30000].concat(Array(10).fill(6000))) });
  assert.deepEqual(res.dpayback.cum.slice(1).map(x => Math.round(x + 30000)), [5220, 9756, 13704, 17136, 20118, 22710, 24966, 26928, 28632, 30114]);
  near(res.dpayback.years, 9.92, 0.005); assert.equal(res.payback.years, 5);
});
test('SM Example 7 (ARR, Times Ltd): ₹3,00,000, salvage ₹90,000, profit before depreciation ₹1,50,000 × 3: annual 37.15%, initial 26.67%, average 41.03%; with ₹45,000 working capital 33.33%', () => {
  const R = arrOf(F([-300000, 150000, 150000, 150000], { salvage: 90000 }));
  approx(R.dep, 70000); approx(R.avg, 80000); assert.deepEqual(R.opening, [300000, 230000, 160000]);
  assert.equal(pct(R.annualAvg), 37.15); assert.equal(pct(R.onInitial), 26.67); assert.equal(pct(R.onAverage), 41.03); approx(R.avgInv, 195000);
  const W = arrOf(F([-300000, 150000, 150000, 150000], { salvage: 90000, wc: 45000 }));
  approx(W.avgInv, 240000); assert.equal(pct(W.onAverage), 33.33);
});
test('SM Ill. 2 (ARR from profits after tax): average ₹92,000 on ₹10,00,000 = 9.2%; on ½(10,00,000 − 80,000) + 80,000 = ₹5,40,000: 17.04%', () => {
  const res = preset(/Ill\. 2 ·/);
  approx(res.arr.avg, 92000); approx(res.arr.avgInv, 540000); assert.equal(pct(res.arr.onInitial), 9.2); assert.equal(pct(res.arr.onAverage), 17.04);
  approx(res.F.dep, 184000); assert.deepEqual(res.F.cf.slice(1), [234000, 259000, 309000, 314000, 344000]);   // PAT + depreciation (+ salvage in year 5)
});
test('SM Ill. 9 (MIRR at 8%, 4-decimal factors 1.3605 … 1.0000): terminal value ₹2,13,587, ratio 1.5705; MIRR 9.45% (the SM reads "9%" off the year-5 PV table)', () => {
  const res = preset(/Ill\. 9/);
  assert.deepEqual(res.mirr.rows.filter(r => !r.out).map(r => Math.round(r.fv)), [40815, 50388, 69984, 32400, 20000]);
  assert.equal(Math.round(res.mirr.tv), 213587); assert.equal(Math.round(res.mirr.ratio * 10000) / 10000, 1.5705);
  assert.equal(Math.round(res.mirr.pvOut), 136000); near(res.mirr.mirr * 100, 9.45, 0.006);
  assert.equal(Math.round((res.mirr.pvOut / res.mirr.tv) * 10000) / 10000, 0.6367);
});

/* ---------------------------------------------------------------- real ICAI questions with their Suggested Answers */
test('PYQ May 2025 Q3(a): at the 12% IRR the outlay is ₹3,08,640; at 10%: PV 3,22,370, NPV 13,730, PI 1.0445, discounted payback 3.845 years; MIRR (TV ₹4,72,100) 11.20%', () => {
  const cf = [-308640, 100000, 100000, 80000, 80000], o = { salvage: 50000 };
  approx(npvAt(F(cf, o), 0.12, '3', false), 0, 1e-6);                                  // NPV = 0 at the 12% IRR: 89,300 + 79,700 + 56,960 + 50,880 + 31,800
  const n = preset(/PYQ May 2025 Q3\(a\) · NPV/);
  approx(n.P.pvIn, 322370, 1e-6); approx(n.npv, 13730, 1e-6); assert.equal(Math.round(n.pi * 10000) / 10000, 1.0445);
  const p = run({ mode: 'payback', flows: one(cf), salvage: 50000 });
  assert.deepEqual(p.dpayback.cum.slice(1).map(x => Math.round(x + 308640)), [90900, 173500, 233580, 322370]);
  assert.equal(Math.round(p.dpayback.years * 1000) / 1000, 3.845);
  const m = preset(/PYQ May 2025 Q3\(a\) · MIRR/);
  assert.equal(Math.round(m.mirr.tv), 472100); assert.equal(Math.round(m.mirr.ratio * 10000) / 10000, 1.5296); near(m.mirr.mirr * 100, 11.2, 0.011);
});
test('PYQ Jan 2026 Q2(b) (Algo Steel): depreciation ₹5,40,000; average PAT ₹8,32,500 on ₹13,20,000 = 63.07%; NPV at 12% ₹18,86,370 (PV of inflows ₹42,86,370)', () => {
  const res = preset(/Algo Steel/);
  approx(res.arr.dep, 540000); approx(res.arr.avg, 832500); approx(res.arr.avgInv, 1320000); assert.equal(pct(res.arr.onAverage), 63.07);
  assert.deepEqual(res.F.cf, [-2400000, 1035000, 1635000, 1485000, 1335000 + 240000]);
  const p = pvRows(res.F, 0.12, '3', false);
  approx(p.pvIn, 4286370, 1e-6); approx(p.npv, 1886370, 1e-6);
});
test('PYQ Jan 2025 Q3(a) (SRT Ltd, 18%): PVs 27,52,750 … 16,03,790, total 1,03,94,884; outflow 22,50,000 with working capital; NPV 81,44,884; PI 4.62', () => {
  const res = preset(/SRT Ltd/);
  assert.deepEqual(res.P.rows.slice(1).map(r => Math.round(r.pv)), [2752750, 2303344, 2021880, 1713120, 1603790]);
  approx(res.P.pvIn, 10394884, 1e-6); approx(res.P.pvOut, 2250000); approx(res.npv, 8144884, 1e-6); assert.equal(Math.round(res.pi * 100) / 100, 4.62);
});
test('RTP May 2024 Q5 (HMR Ltd): NPV at 10% ₹86,543 (6.144 = the yearly factors added); at 20% about (1,22,720); IRR 10% + 86,543 / 2,09,263 × 10% = 14.14%', () => {
  const res = preset(/HMR Ltd/);
  approx(res.irr.A.npv, 86543, 1);
  near(res.irr.B.npv, -122720, 120);                      // ICAI mixes 4.192 (annuity table) at 20%; the yearly factors add to 4.193
  assert.equal(pct(res.irr.irr), 14.14);
  assert.ok(res.irr.irr - res.irr.exact > 0.005, 'a 10-point-wide bracket overstates the IRR');
});
test('RTP Sep 2026 Q7 (Machines I and II, 12%): NPV 86,909 and 1,18,074; IRR 15.46% (15%, 16%: 3.353, 3.274) and 14.74% (14%, 15%: 3.888, 3.785); DPP 4.49 and 5.41 years', () => {
  const res = preset(/RTP Sep 2026/);
  near(res.A.P.npv, 86909, 2); near(res.B.P.npv, 118074, 2);                         // ICAI rounds each PV to the rupee
  approx(res.A.Y.A.npv, 301500 * 3.353 - 1000000, 1e-6); approx(res.B.Y.B.npv, 393500 * 3.785 - 1500000, 1e-6);
  assert.equal(pct(res.A.Y.irr), 15.46); assert.equal(pct(res.B.Y.irr), 14.74);
  const dp = cf => payback(cf.map((c, t) => c * (t ? pvif(0.12, t, '3') : 1))).years;
  near(dp([-1000000, 301500, 301500, 301500, 301500, 301500]), 4.49, 0.005); near(dp([-1500000].concat(Array(6).fill(393500))), 5.41, 0.005);
  // ICAI picks Machine I by the majority of rankings (DPP, IRR); the lab follows the Study Material's rule for mutually exclusive projects: higher NPV
  assert.ok(res.conflict); assert.equal(res.choose, 'B');
});
test('MTP May 2025 S2 Q1(a) (2-decimal factors): A NPV 2,900 and B 18,760; DPP A 4.766 years, B 1.195 years; PI 1.01 and 1.09', () => {
  const A = [-200000, 35000, 80000, 55000, 75000, 20000], B = [-200000, 218000, 10000, 10000, 4000, 3000];
  approx(npvAt(F(A), 0.10, '2', false), 2900, 1e-6); approx(npvAt(F(B), 0.10, '2', false), 18760, 1e-6);
  const res = preset(/MTP May 2025/);
  assert.equal(Math.round(res.dpayback.years * 1000) / 1000, 4.766);
  near(payback(B.map((c, t) => c * (t ? pvif(0.10, t, '2') : 1))).years, 1.195, 0.0005);
  assert.equal(Math.round(pvRows(F(A), 0.10, '2', false).pi * 100) / 100, 1.01); assert.equal(Math.round(pvRows(F(B), 0.10, '2', false).pi * 100) / 100, 1.09);
});
test('PYQ May 2026 MCQ 8: NPV ₹50.71 lakh at 16% and (₹26.84) lakh at 20% interpolate to 18.62%: accept at 18.5%', () => {
  near(16 + (50.71 / (50.71 + 26.84)) * 4, 18.62, 0.005);
  // the lab's interpolation is the same formula: a two-flow project with those NPVs at those rates
  const Y = { L: 0.16, H: 0.2, A: { npv: 50.71 }, B: { npv: -26.84 } };
  near((Y.L + (Y.A.npv / (Y.A.npv - Y.B.npv)) * (Y.H - Y.L)) * 100, 18.6156, 0.0001);
});

/* ---------------------------------------------------------------- identities and brute force on random inputs */
test('3000 random projects: NPV at the exact IRR is 0; exact factors make the year-by-year NPV equal Σ CF/(1 + k)^t; NPV > 0 ⇔ PI > 1 ⇔ IRR > k (one sign change)', () => {
  const rnd = lcg(19);
  for (let i = 0; i < 3000; i++) {
    const n = 1 + Math.floor(rnd() * 8), I = 10000 * (1 + Math.floor(rnd() * 50)), cf = [-I];
    for (let t = 1; t <= n; t++) cf.push(1000 * Math.floor(rnd() * (2 * I / 1000 / n + 1)));
    if (!cf.some(x => x > 0)) continue;
    const k = Math.floor(rnd() * 25) / 100, P = pvRows(F(cf), k, 'exact', false);
    approx(P.npv, exactNPV(cf, k), 1e-6);
    const roots = irrExact(cf);
    assert.ok(roots.length <= 1, 'one sign change, at most one IRR');
    if (roots.length) {
      approx(exactNPV(cf, roots[0]), 0, 1e-4);
      if (Math.abs(roots[0] - k) > 1e-6) { assert.equal(P.npv > 0, roots[0] > k); assert.equal(P.pi > 1, P.npv > 0); }
    }
  }
});
test('interpolation on 2000 random projects: with exact factors the automatic bracket holds the IRR, and the chord overstates it (convex profile) by less than 0.1%', () => {
  const rnd = lcg(29);
  let n0 = 0;
  for (let i = 0; i < 2000; i++) {
    const n = 2 + Math.floor(rnd() * 8), I = 100000, cf = [-I];
    for (let t = 1; t <= n; t++) cf.push(1000 * (5 + Math.floor(rnd() * 60)));
    const ex = irrExact(cf).find(x => x > 0.011);
    if (ex == null || ex > 1.5) continue;
    const Y = irrInterp(F(cf), 'exact', false, 0, 0);
    assert.ok(Y.L <= ex + 1e-12 && ex <= Y.H + 1e-12 && Y.brackets, JSON.stringify(cf));
    assert.ok(Y.irr >= ex - 1e-12 && Y.irr - ex < 0.001);
    const Y3 = irrInterp(F(cf), '3', false, 0, 0);                    // the table factors: still a bracket, within 0.25% of the truth
    assert.ok(Y3.brackets && Math.abs(Y3.irr - ex) < 0.0025); n0++;
  }
  assert.ok(n0 > 1000);
});
test('payback on 2000 random projects: the cumulative flow is negative just before the payback point and zero at it (linear within the year)', () => {
  const rnd = lcg(37);
  for (let i = 0; i < 2000; i++) {
    const n = 2 + Math.floor(rnd() * 8), cf = [-(10000 + Math.floor(rnd() * 90000))];
    for (let t = 1; t <= n; t++) cf.push(Math.floor(rnd() * 40000));
    const p = payback(cf);
    if (p.years == null) { assert.ok(cf.reduce((s, x) => s + x, 0) < 0 || cf.slice(1).every(x => x === 0)); continue; }
    const y = Math.floor(p.years - 1e-12) + 1, before = p.cum[y - 1];
    assert.ok(before < 0); approx(before + (p.years - (y - 1)) * cf[y], 0, 1e-6);
  }
});
test('MIRR on 2000 random projects: with reinvestment at the IRR, MIRR equals the IRR; with reinvestment at k it lies between k and the IRR', () => {
  const rnd = lcg(43);
  for (let i = 0; i < 2000; i++) {
    const n = 2 + Math.floor(rnd() * 6), cf = [-100000];
    for (let t = 1; t <= n; t++) cf.push(1000 * (10 + Math.floor(rnd() * 40)));
    const irr = irrExact(cf).find(x => x > -0.5);
    if (irr == null) continue;
    approx(mirrOf(cf, irr, irr, 'exact').mirr, irr, 1e-9);
    const k = Math.floor(rnd() * 20) / 100, m = mirrOf(cf, k, k, 'exact').mirr;
    assert.ok((m - k) * (irr - m) >= -1e-12, `${k} ${m} ${irr}`);
  }
});
test('the crossover rate on random pairs is where the two NPVs are equal; the ranking flips across it', () => {
  const rnd = lcg(61);
  let seen = 0;
  for (let i = 0; i < 1500; i++) {
    const a = [-100000, 60000 + Math.floor(rnd() * 40) * 1000, 40000, 10000], b = [-(150000 + Math.floor(rnd() * 100) * 1000), 20000, 80000, 200000 + Math.floor(rnd() * 100) * 1000];
    const X = crossover(a, b).filter(x => x > 0 && x < 2);
    if (!X.length) continue;
    approx(exactNPV(a, X[0]), exactNPV(b, X[0]), 1e-4);
    const lo = X[0] - 0.01, hi = X[0] + 0.01;
    if (lo > 0 && X.length === 1) { assert.notEqual(Math.sign(exactNPV(a, lo) - exactNPV(b, lo)), Math.sign(exactNPV(a, hi) - exactNPV(b, hi))); seen++; }
  }
  assert.ok(seen > 200);
});

/* ---------------------------------------------------------------- frames, inputs and the definition */
test('frames: NPV adds one year a frame (one more present value bar and row), then the NPV and PI; captions explain the factor', () => {
  const res = preset(/Ill\. 3/);
  assert.equal(res.frames.length, 7);
  const pvBars = res.frames.map(f => { const p = f.view.find(x => x.type === 'plot'); const s = p.series.find(x => x.label === 'present value'); return s ? s.pts.length : 0; });
  assert.deepEqual(pvBars, [0, 1, 2, 3, 4, 4, 4]);
  const rows = res.frames.map(f => { const t = f.view.find(x => x.type === 'table'); return t ? t.rows.length : 0; });
  assert.deepEqual(rows, [0, 1, 2, 3, 5, 5, 5]);
  assert.match(res.frames[2].caption, /Year 1: factor 1\/1\.1\^1 = 0\.909 \(table, 3 decimals\), so ₹55,000 is worth ₹49,995 today/);
  assert.match(res.frames[5].caption, /NPV = PV of inflows ₹1,27,340 − PV of outflows ₹1,00,000 = \*\*₹27,340\*\*/);
  assert.match(res.frames[6].caption, /Profitability index = .* = \*\*1\.2734\*\*/);
});
test('frames: IRR shows the first rate, the second, the interpolation and then the whole profile with the true IRR; multiple IRRs are flagged', () => {
  const res = preset(/Ill\. 7/);
  assert.equal(res.frames.length, 5);
  assert.deepEqual(res.frames.slice(1, 4).map(f => f.view[0].points.length), [1, 2, 3]);
  assert.match(res.frames[3].caption, /IRR = 10% \+ ₹2,280 \/ \(₹2,280 − \(\(₹4,190\)\)\) × \(12% − 10%\) = \*\*10\.70%\*\*/);
  assert.match(res.frames[4].caption, /crosses zero at the true IRR, 10\.69%/);
  const m = run({ mode: 'irr', flows: one([-100000, 230000, -132000]) });   // IRRs 10% and 20%
  assert.match(caps(m), /have 2 IRRs \(10\.00%, 20\.00%\)/);
});
test('inputs: profits after tax become cash flows; salvage and working capital land in the right years; bad inputs say what to fix', () => {
  const f = flowsOf([-100000, 10000, 10000], { basis: 'pat', salvage: 20000, wc: 5000 });
  assert.deepEqual(f.cf, [-105000, 50000, 75000]); approx(f.dep, 40000);
  assert.throws(() => flowsOf([-100], {}), /at least year 0/);
  assert.throws(() => flowsOf([100, 50], {}), /at least one outflow/);
  assert.throws(() => flowsOf([0, 50, 60], { basis: 'pat' }), /cost of the asset/);
  assert.throws(() => run({ mode: 'irr', flows: one([-100000, 10000, 10000]) }), /no positive IRR/);
  assert.throws(() => run({ mode: 'irr', lo: 12, hi: 10, flows: one([-100000, 60000, 60000]) }), /higher trial rate/);
  // the year column renumbers itself (a deleted row leaves no gap)
  const v = { flows: [['0', -1], ['3', 2], ['7', 3]] }; def.controls.find(c => c.id === 'flows').show(v); assert.deepEqual(v.flows.map(r => r[0]), ['0', '1', '2']);
});
test('definition: every preset computes with 3–6 tiles and under 120 frames; ICAI documents cited; controls show per mode', () => {
  const ctl = id => def.controls.find(c => c.id === id);
  assert.ok(ctl('loB').show({ mode: 'compare' }) && !ctl('loB').show({ mode: 'irr' }) && ctl('lo').show({ mode: 'irr' }));
  assert.ok(ctl('reinvest').show({ mode: 'mirr' }) && !ctl('salvage').show({ mode: 'compare' }));
  assert.ok(def.presets.filter(p => /^(PYQ|RTP|MTP) /.test(p.label)).length >= 4);
  def.presets.forEach(p => { const res = compute(Object.assign(dflt(), p.values)); assert.ok(res.frames.length >= 4 && res.frames.length <= 120, p.label); assert.ok(res.stats.length >= 3 && res.stats.length <= 6, p.label); });
});
test('challenge: 200 problems per mode build; answers come from the same result; NPVs are whole rupees with 3-decimal factors; the prompt names the trial rates', () => {
  for (const mode of ['npv', 'payback', 'irr', 'mirr', 'compare']) {
    compute(Object.assign(dflt(), { mode }));
    const rnd = lcg(3);
    for (let i = 0; i < 200; i++) {
      const v = Object.assign(dflt(), { mode }, def.challenge.gen(rnd)), res = def.compute(v), want = def.challenge.solve(res, v);
      assert.ok(want != null && (typeof want === 'string' || isFinite(want)), mode + JSON.stringify(v));
      const p = def.challenge.prompt(v, res);
      if (mode === 'npv' && v.ask !== 'b') approx(want, Math.round(want), 1e-9);
      if (mode === 'irr') assert.match(p, new RegExp(`between \\*\\*${Math.round(res.irr.L * 100)}% and ${Math.round(res.irr.H * 100)}%`));
      if (mode === 'compare') assert.ok(v.ask === 'a' ? /^[AB]$/.test(want) : /^(yes|no)$/.test(want));
      assert.ok(def.challenge.explain(res, v).length > 20);
    }
  }
});
