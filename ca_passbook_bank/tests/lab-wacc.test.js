/* Cost of Capital Lab (app/js/labs/wacc.js): the ICAI Study Material's illustrations (Paper 6A, Chapter 4), real ICAI questions with
   their Suggested Answers, identities and brute force on random inputs, the frames and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/wacc.js');
const { pvif, pvaf, fvif, kdIrred, kdApprox, kpApprox, bondNPV, exactIRR, ytm, keGrowth, keCAPM, wacc, mcc, compute, def } = LAB;
const dflt = () => Object.fromEntries(def.controls.map(c => [c.id, c.type === 'table' ? c.rows.map(r => r.slice()) : c.value]));
const run = v => compute(Object.assign(dflt(), v));
const preset = re => { const p = def.presets.find(x => re.test(x.label)); assert.ok(p, 'preset ' + re); return run(p.values); };
const pct = x => Math.round(x * 10000) / 100;                 // 0.08297 -> 8.3
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg || ''} expected ${b} ± ${tol}, got ${a}`);
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const stat = (res, re) => { const s = res.stats.find(x => re.test(x.label)); assert.ok(s, 'stat ' + re); return s.value; };
const caps = res => res.frames.map(f => f.caption).join('\n');
const bond = o => Object.assign({ face: 100, issue: 100, flotPct: 0, flotRs: 0, rv: 100, years: 5, lo: 0, hi: 0, factors: '3', tax: 0 }, o);

/* ---------------------------------------------------------------- the table factors */
test('factors as ICAI tables print them: PVIF 0.909/0.826/0.751/0.683/0.621 at 10%; PVAF 3.791 (10%, 5), 7.722 (5%, 10), 7.024 (7%, 10), 2.487 (10%, 3); FVIF 1.403 (7%, 5)', () => {
  assert.deepEqual([1, 2, 3, 4, 5].map(t => pvif(0.10, t, '3')), [0.909, 0.826, 0.751, 0.683, 0.621]);
  assert.equal(pvaf(0.10, 5, '3'), 3.791); assert.equal(pvaf(0.05, 10, '3'), 7.722); assert.equal(pvaf(0.07, 10, '3'), 7.024); assert.equal(pvaf(0.10, 3, '3'), 2.487);
  assert.equal(pvaf(0.15, 5, '3'), 3.352); assert.equal(pvif(0.15, 5, '3'), 0.497); assert.equal(pvaf(0.03, 10, '3'), 8.530); assert.equal(pvif(0.03, 10, '3'), 0.744);
  assert.equal(fvif(0.07, 5, '3'), 1.403); assert.equal(fvif(0.05, 5, '3'), 1.276);
  approx(pvif(0.10, 5, 'exact'), 1 / 1.1 ** 5, 1e-12); assert.equal(pvif(0.12, 4, '4'), 0.6355);
});

/* ---------------------------------------------------------------- Study Material illustrations: debt and preference */
test('SM Ill. 1 (Sona Ltd): 12% irredeemable debentures at ₹94, tax 35%: Kd = 12 × 0.65 / 94 = 8.30%', () => {
  approx(kdIrred(12, 0.35, 94), 0.0829787, 1e-6);
  assert.equal(stat(preset(/Ill\. 1 ·/), /^Kd/), '8.30%');
});
test('SM Ill. 2: 10% debenture issued at ₹110, par in 5 years, tax 35%: (6.5 − 2) / 105 = 0.0428 (ICAI prints 4.28%, i.e. 4.2857%)', () => {
  approx(kdApprox(10, 0.35, 110, 100, 5, false), 4.5 / 105, 1e-12);
  const res = preset(/Ill\. 2 ·/);
  near(pct(res.cost), 4.28, 0.01);
  assert.match(caps(res), /\(₹6\.50 − ₹2\) \/ ₹105 = \*\*4\.29%\*\*/);
});
test('SM Ill. 3: existing 10% debenture at ₹80, par in 5 years, tax 35%: (6.5 + 4) / 90 = 11.67%', () => {
  const res = preset(/Ill\. 3 ·/);
  assert.equal(pct(res.cost), 11.67); assert.equal(stat(res, /Kd \(after tax\)/), '11.67%');
});
test('SM Example 2 (YTM): the same debenture: NPV +6.74 at 10% (3.791, 0.621), −8.51 at 15% (3.352, 0.497), IRR 12.21%', () => {
  const res = preset(/Example 2/);
  assert.equal(Math.round(res.ytm.A.npv * 100) / 100, 6.74); assert.equal(Math.round(res.ytm.B.npv * 100) / 100, -8.51);
  assert.equal(res.ytm.A.A, 3.791); assert.equal(res.ytm.B.V, 0.497); assert.equal(pct(res.cost), 12.21);
  const t = res.frames[res.frames.length - 1].view[1];
  assert.deepEqual(t.rows.map(r => r[0]), ['0', '1 to 5', '5', 'NPV']);
  assert.deepEqual(t.rows[3], ['NPV', '', '', '**₹6.74**', '', '**(₹8.51)**']);
});
test('SM Ill. 17 (YTM, with flotation): ₹105 less 4% = ₹100.80; NPV +14.65 at 5%, −0.83 at 7%; Kd 6.89%; preference ₹110 less 2%: +9.25 at 3%, −7.79 at 5%, Kp 4.08%', () => {
  const d = preset(/Ill\. 17 · 10% debentures/);
  approx(d.NP, 100.8, 1e-9); assert.equal(Math.round(d.ytm.A.npv * 100) / 100, 14.65); assert.equal(Math.round(d.ytm.B.npv * 100) / 100, -0.83); assert.equal(pct(d.cost), 6.89);
  const p = run(bond({ part: 'pref', ptype: 'red', prate: 5, issue: 110, flotPct: 2, rv: 100, years: 10, pmethod: 'ytm', lo: 3, hi: 5 }));
  approx(p.NP, 107.8, 1e-9); assert.equal(Math.round(p.ytm.A.npv * 100) / 100, 9.25); assert.equal(Math.round(p.ytm.B.npv * 100) / 100, -7.79); near(pct(p.cost), 4.08, 0.011);   // 3 + 9.25 / 17.04 × 2 = 4.0857%, printed 4.08%
});
test('SM Example 3 (convertible): RV = max(₹100, 10 × ₹12 × 1.276 = ₹153.12); approximation 16.09%; present value method 17.43% (15% and 20%)', () => {
  const v = bond({ part: 'debt', dtype: 'conv', coupon: 15, issue: 100, rv: 100, years: 5, tax: 35, ratio: 10, sprice: 12, sgrowth: 5 });
  const a = run(Object.assign({}, v, { method: 'approx' }));
  approx(a.RV, 153.12, 1e-9); near(pct(a.cost), 16.09, 0.011);           // ICAI's 126.53 for (153.12 + 100) / 2 is a slip: 20.374 / 126.56 = 16.10%
  const y = run(Object.assign({}, v, { method: 'ytm', lo: 15, hi: 20 }));
  assert.equal(Math.round(y.ytm.A.npv * 100) / 100, 8.78); assert.equal(Math.round(y.ytm.B.npv * 100) / 100, -9.28); assert.equal(pct(y.cost), 17.43);   // ICAI: +8.78, −9.29, 17.43%
});
test('SM Ill. 6–8 (preference): 10% at ₹95 -> 10.53%; ₹12 at ₹100 less 3% -> 12.37%; redeemable at par in 10 years -> 10.77%', () => {
  assert.equal(pct(run(bond({ part: 'pref', ptype: 'irred', prate: 10, issue: 95 })).cost), 10.53);
  assert.equal(pct(preset(/Ill\. 7/).cost), 12.37);
  assert.equal(pct(preset(/Ill\. 8/).cost), 10.77); approx(kpApprox(10, 95, 100, 10), 10.5 / 97.5, 1e-12);
});

/* ---------------------------------------------------------------- Study Material illustrations: equity, WACC, MCC */
test('SM Ill. 9, 12–15 (equity): D0 ₹1, g 10%, ₹55 -> 12%; CAPM 10% + 1.75 × 5% = 18.75%; Kr 10% and Ke 10.41%; Kr 13.8%; CAPM Kr 14.2%', () => {
  assert.equal(pct(run({ part: 'equity', approach: 'growth', dkind: 'd0', div: 1, g: 10, price: 55, newIssue: 0, flotE: 0 }).kr), 12);
  assert.equal(pct(preset(/Ill\. 12/).ke), 18.75);
  const r13 = preset(/Ill\. 13/); assert.equal(pct(r13.kr), 10); assert.equal(pct(r13.ke), 10.41);
  assert.equal(stat(r13, /Ke \(new equity\)/), '10.41%'); assert.equal(stat(r13, /Kr/), '10.00%');
  assert.equal(pct(run({ part: 'equity', approach: 'growth', dkind: 'd0', div: 4.19, g: 5, price: 50, newIssue: 0, flotE: 0 }).kr), 13.8);   // 0.088 + 0.05
  assert.equal(pct(run({ part: 'equity', approach: 'capm', rf: 7, beta: 1.2, rmkind: 'mrp', rm: 6 }).ke), 14.2);
  approx(keGrowth(10, 185, 0.05), 0.1040540, 1e-6); approx(keCAPM(0.10, 1.75, 0.15), 0.1875, 1e-12);
});
test('SM Ill. 16 (market value of equity split 1 : 3 between shares and retained earnings): ₹6,25,000 and ₹18,75,000, WACC 10.10%', () => {
  const res = preset(/Ill\. 16/);
  assert.deepEqual(res.market.rows.map(r => r.value), [625000, 1875000]); assert.equal(pct(res.market.wacc), 10.1);
  assert.match(res.frames[0].caption, /the market value of the equity, ₹25,00,000, is split between Equity shares and Retained earnings/);
  assert.throws(() => run({ part: 'wacc', splitRE: true, sources: [['Debentures', 100, 100, 8]] }), /name one row "Equity …"/);
});
test('SM Ill. 17 = MTP Sep 2026 S1 Q1(b): WACC 7.74% on book values, 8.59% on market values (weights 0.151, 0.158, 0.691)', () => {
  const res = preset(/Ill\. 17 · WACC/);
  assert.equal(pct(res.book.wacc), 7.74); assert.equal(pct(res.market.wacc), 8.59);
  assert.deepEqual(res.market.rows.map(r => Math.round(r.w * 1000) / 1000), [0.151, 0.158, 0.691]);
  assert.equal(res.market.total, 3475000); approx(res.book.wacc, 0.077425, 1e-12);
  assert.equal(stat(res, /book/), '7.74%'); assert.equal(stat(res, /market/), '8.59%');
});
test('SM Ill. 18 (ABC Ltd, MCC): 0.15 × 8.33% + 0.05 × 12% + 0.80 × 15% = 13.85%; ₹11,800 / 0.80 = ₹14,750; then 14.57% with new equity at 15.9%', () => {
  const res = preset(/Ill\. 18/), M = res.schedule;
  assert.equal(M.breaks.length, 1); approx(M.breaks[0].at, 14750, 1e-9);
  assert.equal(pct(M.ranges[0].mcc), 13.85); assert.equal(pct(M.ranges[1].mcc), 14.57);
  assert.equal(stat(res, /First break point/), '₹14,750');
  assert.match(caps(res), /runs out when the total reaches ₹11,800 \/ 0\.8 = \*\*₹14,750\*\*/);
});

/* ---------------------------------------------------------------- real ICAI questions with their Suggested Answers */
test('PYQ May 2025 Q2(a) (B Ltd): 10% preference share of ₹1,000 redeemable at ₹1,065.40 in 3 years: +48.82 at 10% (2.487, 0.751), −48.66 at 14% (2.322, 0.675), Kp 12%', () => {
  const res = preset(/PYQ May 2025/);
  assert.equal(res.ytm.A.A, 2.487); assert.equal(res.ytm.B.A, 2.322); assert.equal(res.ytm.B.V, 0.675);
  assert.equal(Math.round(res.ytm.A.npv * 100) / 100, 48.82); near(res.ytm.B.npv, -48.66, 0.006);   // 232.20 + 719.145 − 1,000 = −48.655
  assert.equal(pct(res.cost), 12);
});
test('PYQ May 2026 Q2(b) (Z Ltd): convertible at ₹85, RV = 5 × ₹16 × 1.403 = ₹112.24 > ₹105; NPV +5.93 at 10%, −1.17 at 12%; Kd 11.67%', () => {
  const res = preset(/PYQ May 2026/);
  approx(res.RV, 112.24, 1e-9); assert.equal(res.conv.take, 'convert');
  near(res.ytm.A.npv, 5.931, 0.01); near(res.ytm.B.npv, -1.166, 0.01); assert.equal(pct(res.cost), 11.67);
  assert.match(res.frames[0].caption, /they will convert, so RV = ₹112\.24/);
});
test('PYQ Jan 2025 Q2(a) (CMC Ltd): Ke by CAPM 18%; convertible RV 4 × 55 × 1.06⁶ = ₹312.07, Kd 19.52% (approximation, on ₹108); WACC on market values 17.94%', () => {
  assert.equal(pct(preset(/CMC Ltd: Rf/).ke), 18);
  const d = preset(/CMC Ltd: 10% convertible/);
  approx(Math.round(d.RV * 100) / 100, 312.07, 1e-9); near(pct(d.cost), 19.52, 0.011);          // 41.012 / 210.035 = 19.526%, which ICAI truncates
  const w = preset(/CMC Ltd: WACC/);
  assert.equal(w.market.total, 123300000); assert.equal(pct(w.market.wacc), 17.94);
  assert.deepEqual(w.market.rows.map(r => Math.round(r.w * 1000) / 1000), [0.892, 0.088, 0.020]);
});
test('PYQ Sep 2025 Q1(a) (RSA Ltd): Ke = 2.10 / (60 − 4) + 5% = 8.75%; Kp = 8 / 45 = 17.78%; WACC on market values (₹6 crore, ₹2.75 crore) 11.59%', () => {
  assert.equal(pct(preset(/RSA Ltd/).ke), 8.75);
  assert.equal(pct(run(bond({ part: 'pref', ptype: 'irred', face: 100, prate: 8, issue: 45 })).cost), 17.78);
  const w = run({ part: 'wacc', splitRE: false, sources: [['Equity shares', 10000000, 60000000, 8.75], ['8% Preference shares', 50000000, 27500000, 17.78]] });
  assert.equal(pct(w.market.wacc), 11.59);
});
test('RTP May 2024 Q2 (MCC): 0.15 × 7.07% + 0.05 × 12.63% + 0.80 × 16% = 14.49% (ICAI 14.492%); break at ₹3,02,300 / 0.80 = ₹3,77,875; then 15.99% (15.988%)', () => {
  const M = preset(/RTP May 2024/).schedule;
  approx(M.breaks[0].at, 377875, 1e-6); near(M.ranges[0].mcc * 100, 14.492, 0.0005); near(M.ranges[1].mcc * 100, 15.988, 0.0005);
  // and its component costs: 14 × 0.5 / 99 = 7.07%, 1.25 / 9.90 = 12.63%, 1.5115 / 30.25 + 11% = 16.00%, 1.5115 / 22 + 11% = 17.87%
  assert.equal(pct(kdIrred(14, 0.5, 99)), 7.07); assert.equal(pct(1.25 / 9.9), 12.63);
  assert.equal(pct(run({ part: 'equity', approach: 'growth', dkind: 'd1', div: 1.5115, g: 11, price: 30.25, newIssue: 22, flotE: 0 }).kr), 16);
  assert.equal(pct(run({ part: 'equity', approach: 'growth', dkind: 'd1', div: 1.5115, g: 11, price: 30.25, newIssue: 22, flotE: 0 }).ke), 17.87);
});

/* ---------------------------------------------------------------- identities and brute force on random inputs */
test('YTM on 3000 random bonds: NPV at the exact yield is 0; with exact factors the interpolated rate lies in [exact, H] (the NPV curve is convex)', () => {
  const rnd = lcg(17);
  for (let i = 0; i < 3000; i++) {
    const n = 1 + Math.floor(rnd() * 20), RV = 100 * (1 + Math.floor(rnd() * 3) / 20), NP = 70 + Math.floor(rnd() * 50), cf = Math.floor(rnd() * 150) / 10;
    const ex = exactIRR(NP, cf, RV, n);
    if (ex == null || ex <= 0.011) continue;
    approx(bondNPV(NP, cf, RV, n, ex, 'exact').npv, 0, 1e-6);
    const Y = ytm(NP, cf, RV, n, 'exact', 0, 0);
    assert.ok(Y.brackets && Y.A.npv >= 0 && Y.B.npv <= 0, JSON.stringify({ NP, cf, RV, n }));
    assert.ok(Y.irr >= ex - 1e-9 && Y.irr <= Y.H + 1e-12 && Y.L <= ex + 1e-12);
    const Y3 = ytm(NP, cf, RV, n, '3', 0, 0);                         // 3-decimal factors: still a bracket around zero, within 0.15% of the truth
    assert.ok(Y3.A.npv >= 0 && Y3.B.npv < 0); assert.ok(Math.abs(Y3.irr - ex) < 0.0015, `${Y3.irr} vs ${ex}`);
  }
});
test('approximation formulas: equal to I(1 − t)/NP when RV = NP; the deductible variant equals the other when RV = NP; close to the true yield when RV ≈ NP', () => {
  const rnd = lcg(23);
  for (let i = 0; i < 2000; i++) {
    const I = Math.floor(rnd() * 15), t = Math.floor(rnd() * 50) / 100, NP = 80 + Math.floor(rnd() * 40), n = 2 + Math.floor(rnd() * 10);
    approx(kdApprox(I, t, NP, NP, n, false), (I * (1 - t)) / NP, 1e-12); approx(kdApprox(I, t, NP, NP, n, true), (I * (1 - t)) / NP, 1e-12);
    const RV = NP * (1 + (Math.floor(rnd() * 11) - 5) / 100), ex = exactIRR(NP, I * (1 - t), RV, n);
    if (ex != null && ex > 0) assert.ok(Math.abs(kdApprox(I, t, NP, RV, n, false) - ex) < 0.006, `${I} ${t} ${NP} ${RV} ${n}`);
  }
});
test('WACC on 2000 random structures: weights add to 1, WACC lies between the cheapest and dearest cost, and equals Σ w × k computed by hand', () => {
  const rnd = lcg(31);
  for (let i = 0; i < 2000; i++) {
    const k = 2 + Math.floor(rnd() * 4), rows = Array.from({ length: k }, (_, j) => ['S' + j, Math.floor(rnd() * 1e7), Math.floor(rnd() * 1e7), Math.floor(rnd() * 2000) / 100]);
    if (rows.every(r => !r[1]) || rows.every(r => !r[2])) continue;
    const res = run({ part: 'wacc', splitRE: false, sources: rows });
    for (const W of [res.book, res.market]) {
      approx(W.rows.reduce((s, r) => s + r.w, 0), 1, 1e-9);
      const ks = W.rows.filter(r => r.value > 0).map(r => r.cost);
      assert.ok(W.wacc >= Math.min(...ks) - 1e-12 && W.wacc <= Math.max(...ks) + 1e-12);
      approx(W.wacc, W.rows.reduce((s, r) => s + r.value * r.cost, 0) / W.total, 1e-12);
    }
  }
});
test('MCC on 2000 random plans: at any amount X the schedule gives the same MCC as costing each source\'s share w·X directly, and it never falls', () => {
  const rnd = lcg(41);
  for (let i = 0; i < 2000; i++) {
    const k = 2 + Math.floor(rnd() * 3); let left = 100;
    const rows = Array.from({ length: k }, (_, j) => { const w = j === k - 1 ? left : Math.floor(rnd() * (left - (k - j - 1))) + 1; left -= w; const k1 = 5 + Math.floor(rnd() * 15); return { name: 'S' + j, w: w / 100, k1: k1 / 100, limit: rnd() < 0.6 ? 10000 * (1 + Math.floor(rnd() * 50)) : 0, k2: (k1 + 1 + Math.floor(rnd() * 5)) / 100 }; });
    if (rows.some(r => r.w <= 0)) continue;
    const M = mcc(rows);
    for (let s = 0; s < 20; s++) {
      const X = rnd() * 2e6, rg = M.ranges.find(r => X >= r.from && (r.to == null || X < r.to));
      const direct = rows.reduce((t, r) => t + r.w * (r.limit > 0 && r.w * X > r.limit ? r.k2 : r.k1), 0);
      if (M.breaks.some(b => Math.abs(b.at - X) < 1e-6)) continue;
      approx(rg.mcc, direct, 1e-12);
    }
    for (let j = 1; j < M.ranges.length; j++) assert.ok(M.ranges[j].mcc >= M.ranges[j - 1].mcc - 1e-12);
  }
});
test('equity on random inputs: a new issue costs at least Kr when it is not priced above the market; CAPM is a straight line in beta', () => {
  const rnd = lcg(53);
  for (let i = 0; i < 2000; i++) {
    const P = 10 + Math.floor(rnd() * 200), D = 0.5 + Math.floor(rnd() * 100) / 10, gr = Math.floor(rnd() * 12), F = Math.floor(rnd() * 5);
    const res = run({ part: 'equity', approach: 'growth', dkind: 'd1', div: D, g: gr, price: P, newIssue: 0, flotE: F });
    assert.ok(res.ke >= res.kr - 1e-12); approx(res.kr, D / P + gr / 100, 1e-12);
    const rf = Math.floor(rnd() * 10) / 100, rm = rf + Math.floor(rnd() * 10) / 100, b = Math.floor(rnd() * 300) / 100;
    approx(keCAPM(rf, b, rm), (keCAPM(rf, 0, rm) * (2 - b) + keCAPM(rf, 2, rm) * b) / 2, 1e-12);
  }
});

/* ---------------------------------------------------------------- frames, inputs and the definition */
test('frames: the approximation adds one line of working per step; the YTM run shows one rate, then the second, then the interpolation line', () => {
  const res = preset(/Ill\. 2 ·/);
  const lens = res.frames.map(f => (f.view.find(x => x.type === 'table' && x.title === 'Working') || { rows: [] }).rows.length);
  assert.deepEqual(lens, [0, 2, 3, 4, 5, 6]);
  assert.match(res.frames[3].caption, /\(RV − NP\) \/ n = \(₹2\) a year, which reduces the yearly cost/);
  const y = preset(/Example 2/), plots = y.frames.map(f => f.view.find(x => x.type === 'plot' && /NPV/.test(x.title))).filter(Boolean);
  assert.deepEqual(plots.map(p => p.points.length), [1, 2, 3]);
  assert.equal(plots[2].series.length, 2);
  assert.match(caps(y), /The true yield \(where the curve crosses zero\) is 12\.06%/);
  const w = preset(/Ill\. 17 · WACC/);
  assert.equal(w.frames.length, 7); assert.equal(w.frames[6].view[0].type, 'plot');
  assert.match(w.frames[6].caption, /Equity shares weighs 0\.6906 instead of 0\.5/);
});
test('the trial rates: automatic = the whole percentages around the yield; given rates that do not bracket zero are flagged as extrapolation', () => {
  const a = run(bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 80, rv: 100, years: 5, tax: 35, method: 'ytm' }));
  assert.equal(a.ytm.L, 0.12); assert.equal(a.ytm.H, 0.13); assert.ok(a.ytm.auto);
  assert.match(caps(a), /two whole percentages around the yield \(12% and 13%\)/);
  const x = run(bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 80, rv: 100, years: 5, tax: 35, method: 'ytm', lo: 5, hi: 8 }));
  assert.ok(!x.ytm.brackets); assert.match(caps(x), /formula extrapolates/);
});
test('bad inputs say what to fix', () => {
  assert.throws(() => run(bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 100, flotPct: 100, method: 'approx' })), /flotation cost is larger/);
  assert.throws(() => run({ part: 'mcc', mcc: [['A', 50, 10, 0, ''], ['B', 40, 12, 0, '']] }), /add up to 100% \(they add up to 90%\)/);
  assert.throws(() => run({ part: 'wacc', sources: [] }), /at least one source/);
  assert.throws(() => run({ part: 'equity', approach: 'growth', dkind: 'd1', div: 0, g: 5, price: 50 }), /dividend per share/);
  assert.throws(() => run(bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 100, method: 'ytm', lo: 8, hi: 6 })), /higher trial rate/);
});
test('definition: controls show per part, every preset computes with 3–6 tiles, ICAI documents cited, frames under 120', () => {
  const ctl = id => def.controls.find(c => c.id === id);
  assert.ok(ctl('coupon').show({ part: 'debt' }) && !ctl('coupon').show({ part: 'pref' }));
  assert.ok(ctl('rv').show({ part: 'debt', dtype: 'red' }) && !ctl('rv').show({ part: 'debt', dtype: 'irred' }) && ctl('rv').show({ part: 'pref', ptype: 'red' }));
  assert.ok(ctl('lo').show({ part: 'debt', dtype: 'red', method: 'ytm' }) && !ctl('lo').show({ part: 'debt', dtype: 'red', method: 'approx' }));
  assert.ok(ctl('sources').show({ part: 'wacc' }) && ctl('mcc').show({ part: 'mcc' }) && !ctl('mcc').show({ part: 'wacc' }));
  assert.ok(def.presets.filter(p => /^(PYQ|RTP|MTP) /.test(p.label)).length >= 4);
  def.presets.forEach(p => { const res = run(p.values); assert.ok(res.frames.length >= 3 && res.frames.length <= 120, p.label); assert.ok(res.stats.length >= 3 && res.stats.length <= 6, p.label); });
});
test('challenge: 200 problems per part build, the answer is read from the same result, and the prompt names the method and the trial rates', () => {
  for (const part of ['debt', 'pref', 'equity', 'wacc', 'mcc']) {
    compute(Object.assign(dflt(), { part }));
    const rnd = lcg(7);
    for (let i = 0; i < 200; i++) {
      const v = Object.assign(dflt(), { part }, def.challenge.gen(rnd)), res = def.compute(v), want = def.challenge.solve(res, v);
      assert.ok(typeof want === 'number' && isFinite(want) && want > 0, part + JSON.stringify(v));
      const p = def.challenge.prompt(v, res);
      if (res.ytm) assert.match(p, new RegExp(`interpolating between ${Math.round(res.ytm.L * 100)}% and ${Math.round(res.ytm.H * 100)}%`));
      if (part === 'mcc' && v.ask === 'break') assert.equal(want, Math.round(want));
      assert.ok(def.challenge.explain(res, v).length > 20);
    }
  }
});
