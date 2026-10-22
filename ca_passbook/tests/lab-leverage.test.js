/* Leverage and EBIT-EPS Lab (app/js/labs/leverage.js): verified against the ICAI Study Material (Paper 6A, ch. 6 Leverages and ch. 5 §5
   EBIT-EPS analysis), real ICAI questions with their Suggested Answers (PYQ Jan 2025 Q1(b) and MCQs 1–5, PYQ May 2024 Q1(b), MTP May 2025
   Series I Q3(a)), and identities on thousands of random inputs (the % change cascade, DCL = DOL × DFL, EPS = 0 at the financial BEP,
   equal EPS at the indifference point and the steeper plan winning above it). */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const FW = require('../app/js/labs/framework.js');
const LAB = require('../app/js/labs/leverage.js');
const { statement, planOf, epsAt, indifference, compute, def, amt } = LAB;
const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= eps)) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const st = (o) => statement(Object.assign({ fixed: 0, interest: 0, prefDiv: 0, tax: 0, shares: 1 }, o));
const run = vals => compute(Object.assign(FW._defaults(def), vals));
const preset = re => { const p = def.presets.find(x => re.test(x.label)); if (!p) throw new Error('no preset ' + re); return run(p.values); };
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ------------------------------------------------------------------ Study Material, ch. 6 */
test('SM ch. 6 Example 1: DOL of product X = 20,000 ÷ 5,000 = 4 and of Y = 8,000 ÷ 3,000 = 2.67; BEP 750 and 625 units', () => {
  const X = st({ sales: 40000, vc: 20000, fixed: 15000 }), Y = st({ sales: 20000, vc: 12000, fixed: 5000 });
  approx(X.DOL, 4); near(Y.DOL, 2.67, 0.005);
  approx(X.bep / 40, 750); approx(Y.bep / 20, 625);
});
test('SM ch. 6 Example 2: break-even sales 37,500, MOS 0.25 and DOL = 1 ÷ MOS = 4', () => {
  const S = st({ sales: 50000, vc: 30000, fixed: 15000 });
  approx(S.bep, 37500); approx(S.mos, 0.25); approx(S.DOL, 4); approx(1 / S.mos, S.DOL);
});
test('SM ch. 6 situations: no fixed cost gives DOL 1; fixed cost ₹50,000 gives DOL 2 (EBIT +100% for sales +50%); interest ₹20,000 gives DFL 1.25 (EPS 4 → 6.5)', () => {
  approx(st({ sales: 200000, vc: 100000 }).DOL, 1);
  const r = run({ mode: 'lev', input: 'unit', units: 20000, price: 10, vcu: 5, fixed: 50000, debt: 0, rate: 0, pref: 0, prate: 0, tax: 50, shares: 10000, change: 50 });
  approx(r.sim.S.DOL, 2); approx(r.sim.dEBIT, 100);
  const f = run({ mode: 'lev', input: 'total', sales: 100000, vcr: 0, fixed: 0, debt: 200000, rate: 10, pref: 0, prate: 0, tax: 50, shares: 10000, change: 50 });
  approx(f.sim.S.DFL, 1.25); approx(f.sim.S.EPS, 4); approx(f.sim.A.EPS, 6.5); approx(f.sim.dEPS, 62.5);
});
test('SM ch. 6 Illustration 1: 10,000 shirts at ₹500, VC ₹200, fixed ₹25,00,000: DOL 6; sales +10% lift EBIT by ₹3,00,000 (60%)', () => {
  const r = run({ mode: 'lev', input: 'unit', units: 10000, price: 500, vcu: 200, fixed: 2500000, debt: 0, rate: 0, pref: 0, prate: 0, tax: 30, shares: 1000, change: 10 });
  approx(r.sim.S.DOL, 6); approx(r.sim.S.EBIT, 500000); approx(r.sim.A.EBIT - r.sim.S.EBIT, 300000, 1e-6); approx(r.sim.dEBIT, 60, 1e-9);
});
test('SM ch. 6 Illustration 2: DOL of firms A, B, C, D = 7, 2, 3, 1 at 5,000 units', () => {
  const firms = [[20, 6, 60000, 7], [32, 16, 40000, 2], [50, 20, 100000, 3], [70, 50, 0, 1]];
  firms.forEach(([p, v, F, want]) => approx(st({ sales: 5000 * p, vc: 5000 * v, fixed: F }).DOL, want));
});
test('SM ch. 6 Illustration 3 (the preset): DOL 6, DFL 2, DCL 12, EPS ₹5, ROE 5%; sales up ₹6,00,000 makes EBIT ₹5,00,000', () => {
  const r = preset(/Illustration 3/), S = r.sim.S;
  approx(S.C, 1200000); approx(S.EBIT, 200000); approx(S.EBT, 100000); approx(S.PAT, 50000);
  approx(S.DOL, 6); approx(S.DFL, 2); approx(S.DCL, 12); approx(S.EPS, 5);
  approx(S.PAT / 1000000 * 100, 5);                                                   // (d) ROI computed as ROE
  approx(r.sim.A.sales - S.sales, 600000, 1e-6); approx(r.sim.A.EBIT, 500000, 1e-6);     // (e)
});
test('SM ch. 6 Illustration 4 (Yizi Co.): with interest ₹4,44,000 + ₹88,160, DOL 1.43, DFL 1.49, DCL 2.13, EPS ₹1.30', () => {
  const S = st({ sales: 8400000, vc: 8400000 * (1 - 0.2755), fixed: 696000, interest: 444000 + 88160, tax: 0.4, shares: 500000 });
  approx(S.C, 2314200, 1e-6); approx(S.EBIT, 1618200, 1e-6); approx(S.EBT, 1086040, 1e-6); approx(S.PAT, 651624, 1e-6);
  near(S.DOL, 1.43, 0.005); near(S.DFL, 1.49, 0.005); near(S.DCL, 2.13, 0.005); near(S.EPS, 1.30, 0.005);
});
test('SM ch. 6 Illustration 5: A Ltd (sales 3,75,000, fixed 1,20,000, interest 20,000) DOL 5, DFL 3, EAT 7,000; B Ltd DOL 2, DFL 2, EAT 70,000', () => {
  const A = st({ sales: 375000, vc: 225000, fixed: 120000, interest: 20000, tax: 0.3 }), B = st({ sales: 800000, vc: 400000, fixed: 200000, interest: 100000, tax: 0.3 });
  approx(A.DOL, 5); approx(A.DFL, 3); approx(A.PAT, 7000); approx(A.DCL, 15);
  approx(B.DOL, 2); approx(B.DFL, 2); approx(B.PAT, 70000); approx(B.DCL, 4);
});
test('SM ch. 6 Practical Problem 1 (Imax Ltd): DOL 1.05, DFL 2.25, DCL 2.3625; sales +10% raise EPS by 23.625%', () => {
  const r = run({ mode: 'lev', input: 'total', sales: 10000000, vcr: 100 - 33.075, fixed: 157500, debt: 1750000, rate: 100, pref: 0, prate: 0, tax: 30, shares: 100000, change: 10 });
  approx(r.sim.S.EBIT, 3150000, 1e-6); approx(r.sim.S.EBT, 1400000, 1e-6);
  approx(r.sim.S.DOL, 1.05, 1e-9); approx(r.sim.S.DFL, 2.25, 1e-9); approx(r.sim.S.DCL, 2.3625, 1e-9); approx(r.sim.dEPS, 23.625, 1e-9);
});
test('SM ch. 6: DFL with preference dividend = EBIT ÷ [(EBIT − interest) − Dp ÷ (1 − t)]', () => {
  const S = st({ sales: 1000000, vc: 400000, fixed: 200000, interest: 100000, prefDiv: 60000, tax: 0.4 });
  approx(S.DFL, 400000 / (300000 - 60000 / 0.6)); approx(S.fbep, 100000 + 100000); approx(S.DCL, S.DOL * S.DFL, 1e-12);
});

/* ------------------------------------------------------------------ real ICAI questions (Suggested Answers) */
test('PYQ Jan 2025 Q1(b), EXIM Ltd (the preset): EPS ₹136.5, DOL 1.363, DFL 1.128, DCL 1.538 (sales = ₹80 lakh × 2.5)', () => {
  const r = preset(/EXIM/), S = r.sim.S;
  approx(S.sales, 20000000); approx(S.C, 6000000); approx(S.EBIT, 4400000); approx(S.I, 500000); approx(S.EBT, 3900000); approx(S.PAT, 2730000);
  approx(S.EPS, 136.5); near(S.DOL, 1.363, 0.001); near(S.DFL, 1.128, 0.001); near(S.DCL, 1.538, 0.001);
  assert.equal(r.stats.find(s => /DOL/.test(s.label)).value, '1.364');
  assert.equal(r.stats.find(s => s.label === 'EPS').value, '₹136.50');
});
test('PYQ May 2024 Q1(b), Alpha Ltd (the preset): EPS ₹604 → ₹424 if sales fall 15% (−29.80%), ₹364 if they fall 20% (−39.73%); DOL 1.875, 2.22, 2.40; DFL 1.06, 1.08', () => {
  const r = preset(/Alpha/), S = r.sim.S, A = r.sim.A;
  approx(S.EBIT, 20000000); approx(S.I, 1125000); approx(S.EPS, 604); approx(A.EPS, 424);
  near(r.sim.dEPS, -29.80, 0.005); approx(r.sim.dEBIT, -28.125, 1e-9);
  approx(S.DOL, 1.875); near(A.DOL, 2.22, 0.005); near(S.DFL, 1.06, 0.005); near(A.DFL, 1.08, 0.005);
  const r20 = run(Object.assign({}, def.presets.find(p => /Alpha/.test(p.label)).values, { change: -20 }));
  approx(r20.sim.A.EPS, 364); near(r20.sim.dEPS, -39.73, 0.006);   // ICAI prints 240 ÷ 604 = 39.735 as 39.73 near(r20.sim.A.DOL, 2.40, 1e-9);
});
test('PYQ Jan 2025 MCQs 1–5, Coral Ltd (the preset): EPS ₹3.90 / ₹4.10 (C), MPS ₹46.80 / ₹61.50 (A), financial BEP ₹13,60,000 / ₹15,08,571 (D), indifference ₹34,40,000 (B), EPS there ₹1.30 (A)', () => {
  const r = preset(/Coral/), s = r.sim, [p1, p2] = s.plans;
  approx(p1.N, 1120000); approx(p2.N, 1040000); approx(p1.I, 1360000); approx(p2.I, 1100000); approx(p2.P, 286000);
  near(s.eps[0], 3.90, 1e-9); near(s.eps[1], 4.10, 1e-9);
  near(s.mps[0], 46.80, 1e-9); near(s.mps[1], 61.50, 1e-9);
  approx(p1.fbep, 1360000); near(p2.fbep, 1508571.43, 0.01);
  const q = s.pairs[0]; assert.equal(q.kind, 'point'); near(q.x, 3440000, 1e-6); near(q.eps, 1.30, 1e-9);
  assert.equal(s.plans[s.bMps].name, 'Plan II');
});
test('MTP May 2025 Series I Q3(a), Perfact Ltd (the preset): indifference EBIT ₹5,98,000; financial BEP ₹1,26,000 and ₹2,04,666', () => {
  const s = preset(/Perfact/).sim, q = s.pairs[0];
  near(q.x, 598000, 1e-6); approx(s.plans[0].fbep, 126000); near(s.plans[1].fbep, 204666.67, 0.01);
  approx(epsAt(s.plans[0], q.x, s.t), epsAt(s.plans[1], q.x, s.t), 1e-12);
});

/* ------------------------------------------------------------------ Study Material, ch. 5 §5 (EBIT-EPS) */
test('SM ch. 5 Illustration 11 (the preset): EPS 1.25 / 1.46 / 1.36 at EBIT ₹3,12,500; 0.30 / 0.275 / 0.175 at EBIT ₹75,000; MPS 12.50 / 11.68 / 9.52 with P/E 10, 8, 7', () => {
  const v = def.presets.find(p => /Illustration 11/.test(p.label)).values, s = run(v).sim;
  near(s.eps[0], 1.25, 1e-9); near(s.eps[1], 1.4625, 1e-9); near(s.eps[2], 1.3625, 1e-9);
  const low = run(Object.assign({}, v, { ebit: 75000 })).sim;
  near(low.eps[0], 0.30, 1e-9); near(low.eps[1], 0.275, 1e-9); near(low.eps[2], 0.175, 1e-9);
  const pe = run(Object.assign({}, v, { plans: v.plans.map((p, i) => p.slice(0, 7).concat([[10, 8, 7][i]])) })).sim;
  near(pe.mps[0], 12.50, 1e-9); near(pe.mps[1], 11.68, 0.03); near(pe.mps[2], 9.52, 0.02);   // ICAI multiplies the EPS rounded to 1.46 and 1.36
  assert.equal(pe.plans[pe.bMps].name, 'Equity'); assert.equal(pe.plans[pe.bEps].name, 'Debt');
});
test('SM ch. 5 Illustration 12 (Best of Luck Ltd): EPS 4.17 / 4.60 / 4.57 for equity at ₹25, 16% debentures, half each with equity at ₹50', () => {
  const s = run({ mode: 'ebiteps', xshares: 1000000, xdebt: 0, xrate: 0, xpref: 0, xprate: 0, tax: 50, ebit: 10000000,
    plans: [['I', 5000000, 25, 0, 0, 0, 0, 0], ['II', 0, 25, 5000000, 16, 0, 0, 0], ['III', 2500000, 50, 2500000, 16, 0, 0, 0]] }).sim;
  near(s.eps[0], 4.17, 0.005); near(s.eps[1], 4.60, 1e-9); near(s.eps[2], 4.57, 0.005);
  assert.equal(s.plans[s.bEps].name, 'II');
});
test('SM ch. 5 answers to Practical Problems 1, 3 and 6: indifference EBIT ₹1.08 crore, ₹10,80,000 and ₹9,60,000; EPS 8.28 / 8.23 at ₹9,50,000 and 8.52 / 8.58 at ₹9,70,000', () => {
  const t30 = 0.3, base0 = { shares: 0, interest: 0, prefDiv: 0 };
  const q1 = indifference(planOf(base0, { name: 'a', eq: 9e7, price: 10 }, t30), planOf(base0, { name: 'b', eq: 3e7, price: 10, debt: 6e7, drate: 12 }, t30), t30);
  near(q1.x, 10800000, 1e-6);
  const q3 = indifference(planOf(base0, { name: 'I', eq: 6e6, price: 10 }, 0.4), planOf(base0, { name: 'II', eq: 2e6, price: 10, debt: 4e6, drate: 18 }, 0.4), 0.4);
  near(q3.x, 1080000, 1e-6);
  const A = planOf(base0, { name: 'I', eq: 6e6, price: 100, debt: 2e6, drate: 12 }, t30), B = planOf(base0, { name: 'II', eq: 4e6, price: 100, debt: 4e6, drate: 12 }, t30);
  near(indifference(A, B, t30).x, 960000, 1e-6);
  near(epsAt(A, 950000, t30), 8.28, 0.005); near(epsAt(B, 950000, t30), 8.23, 0.0051);   // 8.225, printed 8.23
  near(epsAt(A, 970000, t30), 8.52, 0.005); near(epsAt(B, 970000, t30), 8.58, 0.0051);   // 8.575, printed 8.58
});
test('SM ch. 5 Practical Problem 4: EPS 4 / 7.20 / 6.40; financial BEP 0, ₹8,000, ₹16,000; indifference A-B ₹16,000, A-C ₹32,000, none for B-C', () => {
  const s = run({ mode: 'ebiteps', xshares: 0, xdebt: 0, xrate: 0, xpref: 0, xprate: 0, tax: 50, ebit: 80000,
    plans: [['A', 200000, 20, 0, 0, 0, 0, 0], ['B', 100000, 20, 100000, 8, 0, 0, 0], ['C', 100000, 20, 0, 0, 100000, 8, 0]] }).sim;
  near(s.eps[0], 4, 1e-9); near(s.eps[1], 7.2, 1e-9); near(s.eps[2], 6.4, 1e-9);
  assert.deepEqual(s.plans.map(p => p.fbep), [0, 8000, 16000]);
  const [ab, ac, bc] = s.pairs;
  near(ab.x, 16000, 1e-9); near(ac.x, 32000, 1e-9); assert.equal(bc.kind, 'none'); assert.equal(bc.better, 'B');
});
test('SM ch. 5 Practical Problem 5 (₹ thousand): EPS 0.495 / 0.305 / 0.651 and the debt-equity indifference EBIT 2,376', () => {
  const s = run({ mode: 'ebiteps', xshares: 800, xdebt: 3600, xrate: 10, xpref: 0, xprate: 0, tax: 40, ebit: 1500,
    plans: [['Debt', 0, 16, 4000, 12, 0, 0, 0], ['Preference', 0, 16, 0, 0, 4000, 11, 0], ['Equity', 4000, 16, 0, 0, 0, 0, 0]] }).sim;
  near(s.eps[0], 0.495, 1e-9); near(s.eps[1], 0.305, 1e-9); near(s.eps[2], 0.651, 0.0005);
  near(s.pairs.find(q => q.i === 0 && q.j === 2).x, 2376, 1e-9);
});

/* ------------------------------------------------------------------ identities on random inputs */
test('random statements (3,000): %ΔEBIT = DOL × %Δsales and %ΔEPS = DCL × %Δsales exactly; DCL = DOL × DFL; MOS = 1 ÷ DOL above break-even', () => {
  const rnd = lcg(7);
  let n = 0;
  for (let k = 0; k < 3000; k++) {
    const q = 1000 + Math.floor(rnd() * 99000), p = 10 + Math.floor(rnd() * 490), u = Math.floor(rnd() * (p - 1)), F = Math.floor(rnd() * q * (p - u) * 1.3);
    const debt = Math.floor(rnd() * 5e6), rate = Math.floor(rnd() * 20), pref = rnd() < 0.4 ? Math.floor(rnd() * 2e6) : 0, prate = Math.floor(rnd() * 15);
    const tax = Math.floor(rnd() * 60), shares = 100 + Math.floor(rnd() * 1e5), ch = Math.round((rnd() * 80 - 40) * 10) / 10 || 5;
    let r; try { r = run({ mode: 'lev', input: 'unit', units: q, price: p, vcu: u, fixed: F, debt, rate, pref, prate, tax, shares, change: ch }); } catch (e) { continue; }
    const S = r.sim.S, A = r.sim.A;
    if (!Number.isFinite(S.DOL) || !Number.isFinite(S.DFL) || Math.abs(S.EBIT) < 1 || Math.abs(S.EPS) < 1e-6) continue;
    n++;
    near(r.sim.dEBIT, S.DOL * ch, 1e-6 * Math.max(1, Math.abs(S.DOL * ch)), 'EBIT cascade');
    near(r.sim.dEPS, S.DCL * ch, 1e-6 * Math.max(1, Math.abs(S.DCL * ch)), 'EPS cascade');
    near(S.DCL, S.DOL * S.DFL, 1e-9 * Math.max(1, Math.abs(S.DCL)), 'DCL');
    if (S.EBIT > 0) near(S.mos, 1 / S.DOL, 1e-9, 'MOS');
    near(A.EPS, S.EPS * (1 + S.DCL * ch / 100), 1e-6 * Math.max(1, Math.abs(A.EPS)), 'EPS after');
    if (S.EBIT > 0 && S.F > 0) assert.ok(S.DOL > 1, 'above break-even with a fixed cost, DOL > 1');
  }
  assert.ok(n > 2000, 'enough usable cases: ' + n);
});
test('random financing plans (2,000): EPS is 0 at each financial BEP; two plans give equal EPS at the indifference point and the plan with fewer shares wins above it (brute-force scan)', () => {
  const rnd = lcg(11);
  let n = 0;
  for (let k = 0; k < 2000; k++) {
    const t = Math.floor(rnd() * 60) / 100, base = { shares: Math.floor(rnd() * 3) * 1e5, interest: Math.floor(rnd() * 3e5), prefDiv: Math.floor(rnd() * 1e5) };
    const mk = name => ({ name, eq: Math.floor(rnd() * 5e6), price: 5 + Math.floor(rnd() * 95), debt: Math.floor(rnd() * 5e6), drate: Math.floor(rnd() * 20), pref: rnd() < 0.3 ? Math.floor(rnd() * 2e6) : 0, prate: Math.floor(rnd() * 14) });
    let a, b; try { a = planOf(base, mk('a'), t); b = planOf(base, mk('b'), t); } catch (e) { continue; }
    approx(epsAt(a, a.fbep, t), 0, 1e-9); approx(epsAt(b, b.fbep, t), 0, 1e-9);
    const q = indifference(a, b, t);
    if (q.kind !== 'point') continue;
    n++;
    near(epsAt(a, q.x, t), epsAt(b, q.x, t), 1e-9 * Math.max(1, Math.abs(q.eps)), 'equal EPS');
    const d = x => epsAt(a, x, t) - epsAt(b, x, t), step = Math.max(1, Math.abs(q.x)) * 0.01;
    assert.ok(d(q.x - step) * d(q.x + step) < 0, 'the EPS lines cross there');
    const above = epsAt(a, q.x + step, t) > epsAt(b, q.x + step, t) ? 'a' : 'b';
    assert.equal(above, q.steeper, 'the plan with fewer shares (steeper line) wins above the indifference point');
  }
  assert.ok(n > 1500, 'enough crossing pairs: ' + n);
});

/* ------------------------------------------------------------------ frames, stats and the page */
test('every preset computes; the frames build the statement one line at a time and end on the full working', () => {
  for (const p of def.presets) {
    const r = run(p.values);
    assert.ok(r.frames.length >= 8 && r.frames.length <= 120, p.label + ': ' + r.frames.length + ' frames');
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 15, `${p.label} #${i} caption`); assert.ok(Array.isArray(f.view) && f.view.length, `${p.label} #${i} view`); f.view.forEach(v => GA.diagram.render(v)); });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, p.label + ' tiles');
    assert.ok(r.table && r.table.rows.length >= 3);
  }
  const r = run(def.presets[0].values);
  const rowsAt = i => r.frames[i].view[0].rows.length;
  for (let i = 1; i < 11; i++) assert.equal(rowsAt(i), rowsAt(i - 1) + 1, 'one line per frame');
  assert.equal(r.frames[0].view[0].rows.length, 1, 'the first frame holds only the sales line');
  assert.match(r.frames[r.frames.length - 1].caption, /exactly what the leverages predicted/);
});
test('at least three presets, two citing real ICAI papers in the label (PYQ / RTP / MTP), the others with the PassBook cast', () => {
  assert.ok(def.presets.length >= 3);
  assert.ok(def.presets.filter(p => /\b(PYQ|RTP|MTP)\b/.test(p.label)).length >= 2);
  assert.ok(def.presets.some(p => /Tapri/.test(p.label)));
  def.presets.forEach(p => assert.ok(!/→\s*[\d₹]/.test(p.label), 'a label never states its result: ' + p.label));
});
test('EBIT-EPS frames: plan lines start at their financial BEP and the indifference point is marked on the chart', () => {
  const r = preset(/Coral/);
  const charts = r.frames.filter(f => f.view[0].type === 'plot');
  assert.ok(charts.length >= 3);
  const last = r.frames[r.frames.length - 1].view[0];
  assert.ok(last.points.some(p => /Plan I = Plan II/.test(p.label) && Math.abs(p.x - 34.4) < 1e-9), 'indifference point at ₹34.4 lakh');
  assert.ok(r.frames.some(f => f.view[0].type === 'plot' && f.view[0].points.some(p => /financial BEP 13\.6 lakh/.test(p.label || ''))), 'Plan I\'s financial BEP is named on its line');
  assert.ok(last.points.some(p => p.label === 'Plan II: ₹4.10'), 'the best EPS is named at the expected EBIT');
  assert.match(r.frames[r.frames.length - 1].caption, /Plan II/);
});
test('below break-even the lab says so: negative DOL, a loss, and the caption explains negative leverage', () => {
  const r = preset(/bad year/), S = r.sim.S;
  assert.ok(S.EBIT < 0 && S.DOL < 0);
  assert.ok(r.frames.some(f => /below its break-even sales/.test(f.caption)));
});
test('bad input fails loudly, in plain words', () => {
  assert.throws(() => run({ mode: 'lev', input: 'unit', units: 1000, price: 10, vcu: 12 }), /selling price must be higher/);
  assert.throws(() => run({ mode: 'lev', shares: 0 }), /number of equity shares/);
  assert.throws(() => run({ mode: 'lev', tax: 100 }), /tax rate/);
  assert.throws(() => run({ mode: 'lev', input: 'total', sales: 0 }), /sales/);
  assert.throws(() => run({ mode: 'ebiteps', plans: [['A', 1e6, 10, 0, 0, 0, 0, 0]] }), /at least two/);
  assert.throws(() => run({ mode: 'ebiteps', plans: [['A', 1e6, 10, 0, 0, 0, 0, 0], ['a', 0, 10, 1e6, 10, 0, 0, 0]] }), /different name/);
  assert.throws(() => run({ mode: 'ebiteps', plans: [['A', 1e6, 0, 0, 0, 0, 0, 0], ['B', 0, 10, 1e6, 10, 0, 0, 0]] }), /issue price/);
  assert.throws(() => run({ mode: 'ebiteps', xshares: 0, plans: [['A', 1e6, 10, 0, 0, 0, 0, 0], ['B', 0, 10, 1e6, 10, 0, 0, 0]] }), /no equity shares/);
  assert.equal(amt('12,50,000'), 1250000); assert.equal(amt(' ₹ 4.5 '), 4.5); assert.ok(Number.isNaN(amt('')));
});
test('same shares and same charges: every EBIT is an indifference point; same shares, different charges: none', () => {
  const b = { shares: 1000, interest: 0, prefDiv: 0 };
  const a1 = planOf(b, { name: 'x', debt: 1000, drate: 10 }, 0.3), a2 = planOf(b, { name: 'y', debt: 1000, drate: 10 }, 0.3), a3 = planOf(b, { name: 'z', debt: 1000, drate: 12 }, 0.3);
  assert.equal(indifference(a1, a2, 0.3).kind, 'all');
  const q = indifference(a1, a3, 0.3); assert.equal(q.kind, 'none'); assert.equal(q.better, 'x');
});

/* ------------------------------------------------------------------ the challenge */
test('challenge: 400 problems per mode build, their answer is what the stage shows, negative answers get the minus key, and the explanation states it', () => {
  for (const mode of ['lev', 'ebiteps']) {
    const asks = new Set();
    for (let s = 1; s <= 400; s++) {
      const P = FW.problem(def, Object.assign(FW._defaults(def), { mode }), s * 104729);
      assert.equal(P.values.mode, mode);
      const w = P.want, spec = FW.answerSpec(def, P.values, P.result, w);
      assert.ok(typeof w === 'number' && Number.isFinite(w), mode + ' answer');
      if (w < 0) assert.equal(spec.kind, 'signed');
      assert.ok(FW.check(spec, String(Math.round(w * 100) / 100), w).ok, `${mode}#${s}: the two-decimal answer ${w} is accepted`);
      const ask = mode === 'lev' ? P.values.askLev : P.values.askEps; asks.add(ask);
      const ex = def.challenge.explain(P.result, P.values);
      assert.ok(ex.includes(String(Math.abs(Math.round(w * 100) / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')[0]), `${mode}#${s} explain names the answer: ${ex}`);
      const pr = def.challenge.prompt(P.values, P.result);
      assert.ok(/two decimals/i.test(pr), 'the prompt says how to round');
      if (mode === 'lev') { const S = P.result.sim.S; assert.ok(S.EBIT > 0 && S.EBT > 0, 'a profitable firm'); }
      else assert.ok(P.result.sim.pairs[0].kind === 'point' && P.result.sim.pairs[0].x > 0, 'a positive indifference point');
    }
    assert.ok(asks.size >= (mode === 'lev' ? 6 : 3), mode + ' asks every kind of question: ' + [...asks]);
  }
});
test('challenge leverages come out in at most three decimals, as ICAI designs its numbers', () => {
  for (let s = 1; s <= 200; s++) {
    const P = FW.problem(def, Object.assign(FW._defaults(def), { mode: 'lev' }), s * 7919);
    const S = P.result.sim.S;
    [S.DOL, S.DFL].forEach(x => near(x, Math.round(x * 1000) / 1000, 2e-4, 'leverage ' + x));
  }
});
