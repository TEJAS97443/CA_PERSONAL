/* Working Capital Lab (app/js/labs/working-capital.js): verified against the ICAI Study Material (Paper 6A ch. 9: §6 operating cycle and
   Illustration 2, §6.2–6.3 Illustrations 3 and 4, §19 Illustrations 12–14, §11.1 Illustration 10) and real ICAI questions with their
   Suggested Answers (PYQ Sep 2024 Q1(b) and Q3(a), PYQ Jan 2025 MCQ 8, PYQ Jan 2026 MCQ 7, RTP Jan 2026 Q1 = MTP May 2024 Series II, RTP Sep
   2024, RTP Jan 2025 Q1(i), MTP Sep 2025 Series I Q1(c), MTP May 2025 Series I Q2(b)), plus identities on random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const FW = require('../app/js/labs/framework.js');
const { cycle, estimate, credit, baumol, baumolU, millerOrr, compute, def, amt } = require('../app/js/labs/working-capital.js');
const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= eps)) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const run = vals => compute(FW.prepare(def, Object.assign(FW._defaults(def), vals)));
const preset = re => { const p = def.presets.find(x => re.test(x.label)); if (!p) throw new Error('no preset ' + re); return run(p.values); };
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const stg = (...r) => r.map((x, i) => [['RM', 'WIP', 'FG', 'Debtors', 'Creditors'][i], ...x]);
const E0 = { yearDays: 360, unit: 'months', units: 1, credit: 100, conv: 50, basis: 'total', margin: 0 };
const est = o => estimate(Object.assign({}, E0, o));
const item = (E, k) => (E.ca.concat(E.cl).find(x => x.k === k) || {}).v;

/* ------------------------------------------------------------------ the operating cycle */
test('SM ch. 9 §6 example: 60 − 15 + 15 + 30 + 30 = 120 days, from days given', () => {
  const c = cycle({ rows: stg([0, 0, 0, 60], [0, 0, 0, 15], [0, 0, 0, 30], [0, 0, 0, 30], [0, 0, 0, 15]), round: true });
  assert.equal(c.net, 120); assert.equal(c.gross, 135);
});
test('SM ch. 9 Illustration 2 (the preset): R 30, W 22, F 18, D 45, C 30 → net cycle 85 days; 360 ÷ 85 = 4.23 cycles', () => {
  const s = preset(/Illustration 2/).sim.cy;
  assert.deepEqual([s.R, s.W, s.F, s.D, s.C], [30, 22, 18, 45, 30]);
  near(s.stages[1].exact, 21.6, 1e-9);                       // ₹30,000 ÷ (₹5,00,000 ÷ 360); ICAI takes 22 days
  assert.equal(s.net, 85);
  near(s.cycles, 4.23, 0.0101);                               // 4.235…: ICAI prints 4.23, the lab rounds half up to 4.24
});
test('PYQ Sep 2024 Q1(b), SK Ltd (the preset): W 22, F 60, net cycle 120 days, 3 cycles, working capital ₹6,25,000', () => {
  const r = preset(/SK Ltd/), s = r.sim.cy;
  assert.deepEqual([s.R, s.W, s.F, s.D, s.C], [65, 22, 60, 36, 63]);
  assert.equal(s.net, 120); assert.equal(s.cycles, 3); approx(s.wc, 625000);
  assert.equal(r.stats.find(x => /required/.test(x.label)).value, '₹6,25,000');
});
test('MTP Sep 2025 Series I Q1(c), Wint Ltd (the preset, ₹ lakh): R 53, W 35, F 45, D 77, C 63; 147 days; 2.48 cycles; ₹1,703.63 lakh + 10% = ₹1,874 lakh', () => {
  const r = preset(/Wint/), s = r.sim.cy;
  near(s.stages[0].exact, 52.83, 0.005); near(s.stages[1].exact, 34.87, 0.01);   // 34.878: ICAI truncates to 34.87 near(s.stages[2].exact, 45.19, 0.005); near(s.stages[3].exact, 77.06, 0.005); near(s.stages[4].exact, 63.42, 0.005);
  assert.deepEqual([s.R, s.W, s.F, s.D, s.C], [53, 35, 45, 77, 63]);
  assert.equal(s.net, 147); assert.equal(s.cycles, 2.48);
  near(s.wc, 1703.63, 0.005); near(r.sim.margin, 170.363, 0.001); near(r.sim.total, 1874, 0.02);
});
test('operating cycle identities (2,000 random cases): net = R + W + F + D − C, unrounded days = average ÷ daily base, WC × cycles = annual cost', () => {
  const rnd = lcg(5);
  for (let k = 0; k < 2000; k++) {
    const rows = stg(...Array.from({ length: 5 }, () => [Math.floor(rnd() * 1e6), rnd() < 0.5 ? 0 : Math.floor(rnd() * 1e6), 1e6 + Math.floor(rnd() * 1e7), 0]));
    let c; try { c = cycle({ rows, yearDays: rnd() < 0.5 ? 360 : 365, round: false, cost: 5e6 }); } catch (e) { assert.match(e.message, /positive/); continue; }
    near(c.net, c.R + c.W + c.F + c.D - c.C, 1e-9);
    c.stages.forEach(s => near(s.days, s.avg / (s.annual / c.yd), 1e-9));
    near(c.wc * c.cycles, 5e6, 1e-6); near(c.cycles * c.net, c.yd, 1e-9);
  }
});

/* ------------------------------------------------------------------ the statement of working capital requirement */
test('SM ch. 9 Illustration 3, Naureen Ltd (the preset): RM 30,000, WIP 18,750, FG 67,500, debtors 67,500, cash 20,000; creditors 30,000, wages 2,500, overheads 5,000 → ₹1,66,250', () => {
  const E = preset(/Naureen/).sim.E;
  assert.deepEqual(['rm', 'wip', 'fg', 'dr', 'cash', 'cr', 'wl', 'ml'].map(k => item(E, k)), [30000, 18750, 67500, 67500, 20000, 30000, 2500, 5000]);
  approx(E.gca, 203750); approx(E.tcl, 37500); approx(E.total, 166250);
});
test('SM ch. 9 Illustration 4, XYZ Co. on cash cost basis (the preset): CA ₹9,10,000, CL ₹3,10,000, NWC ₹6,00,000, with 20% margin ₹7,20,000', () => {
  const E = preset(/Illustration 4/).sim.E;
  assert.deepEqual(['rm', 'fg', 'dr', 'adv', 'cash'].map(k => item(E, k)), [75000, 215000, 490000, 30000, 100000]);
  assert.deepEqual(['cr', 'wl', 'ml', 'al'].map(k => item(E, k)), [150000, 60000, 80000, 20000]);
  approx(E.cashCOP, 2580000); approx(E.cashCOS, 2940000);
  approx(E.gca, 910000); approx(E.tcl, 310000); approx(E.nwc, 600000); approx(E.marginAmt, 120000); approx(E.total, 720000);
});
test('RTP Jan 2026 Q1 (= MTP May 2024 Series II Q2(a)), PPW Ltd (the preset): gross WC ₹18,30,000 (C), requirement ₹16,33,000 (A), current ratio 4.46 (A)', () => {
  const r = preset(/PPW/), E = r.sim.E;
  approx(E.gca, 1830000); approx(E.tcl, 410000); approx(E.nwc, 1420000); approx(E.marginAmt, 213000); approx(E.total, 1633000);
  near(E.currentRatio, 4.46, 0.005);
  assert.equal(r.stats.find(x => /requirement/.test(x.label)).value, '₹16,33,000');
});
test('PYQ Jan 2025 MCQ 8, JKL Co.: CA ₹1 crore, CL ₹50 lakh, contingency 20% of working capital → ₹60 lakh (B)', () => {
  const E = est({ cash: 1e7, materials: 6e7, cr: 1, margin: 20 });
  approx(E.gca, 1e7); approx(E.tcl, 5e6); approx(E.total, 6e6);
});
test('RTP Sep 2024: a 10% contingency of the final requirement is grossed up: ₹4,49,792 × 1/9 = ₹49,977 → ₹4,99,769', () => {
  const E = est({ cash: 890000, materials: 440208 * 12, cr: 1, margin: 10, marginOn: 'total' });
  approx(E.nwc, 449792, 1e-6); near(E.marginAmt, 49977, 0.5); near(E.total, 499769, 0.5);
});
test('estimate identities (2,000 random cases): totals add up; cash cost ≤ total cost ≤ debtors at sales; per-unit × units = annual; 1 month = 30 days in a 360-day year', () => {
  const rnd = lcg(9);
  for (let k = 0; k < 2000; k++) {
    const sales = 1e6 + Math.floor(rnd() * 1e7), f = () => Math.floor(rnd() * sales * 0.2);
    const o = { sales, materials: f(), wages: f(), mfg: f(), dep: f() / 2, admin: f() / 2, selling: f() / 4, rm: rnd() * 3, wip: rnd(), fg: rnd() * 2, dr: rnd() * 3, cr: rnd() * 2, wl: rnd(), ml: rnd(), al: rnd(), sl: rnd() * 0.5, adv: rnd(),
      cash: Math.floor(rnd() * 2e5), credit: 50 + Math.floor(rnd() * 51), conv: Math.floor(rnd() * 101), margin: Math.floor(rnd() * 30), marginOn: rnd() < 0.5 ? 'nwc' : 'total' };
    if (o.materials + o.wages + o.mfg + o.dep + o.admin + o.selling >= sales) continue;
    const T = est(Object.assign({}, o, { basis: 'total' })), C = est(Object.assign({}, o, { basis: 'cash' })), S = est(Object.assign({}, o, { basis: 'sales' }));
    for (const E of [T, C, S]) {
      near(E.gca, E.ca.reduce((s, x) => s + x.v, 0), 1e-6); near(E.tcl, E.cl.reduce((s, x) => s + x.v, 0), 1e-6);
      near(E.total, E.nwc + E.marginAmt, 1e-6);
      if (E.marginOn === 'total') near(E.marginAmt, E.total * E.m / 100, 1e-6); else near(E.marginAmt, E.nwc * E.m / 100, 1e-6);
    }
    assert.ok(C.gca <= T.gca + 1e-6 && T.gca <= S.gca + 1e-6, 'cash cost ≤ total cost ≤ sales value');
    const U = est(Object.assign({}, o, { units: 1000, sales: o.sales / 1000, materials: o.materials / 1000, wages: o.wages / 1000, mfg: o.mfg / 1000, dep: o.dep / 1000, admin: o.admin / 1000, selling: o.selling / 1000, basis: 'total' }));
    near(U.total, T.total, 1e-6 * Math.max(1, Math.abs(T.total)));
    const D = est(Object.assign({}, o, { unit: 'days', rm: o.rm * 30, wip: o.wip * 30, fg: o.fg * 30, dr: o.dr * 30, cr: o.cr * 30, wl: o.wl * 30, ml: o.ml * 30, al: o.al * 30, sl: o.sl * 30, adv: o.adv * 30, basis: 'total' }));
    near(D.total, T.total, 1e-6 * Math.max(1, Math.abs(T.total)));
  }
});

/* ------------------------------------------------------------------ credit policies */
const CR = { bdAs: 'pct', fixed: 0, tax: 0, k: 20, kPre: false, yearDays: 360, costBasis: 'total', xcred: 0 };
test('SM ch. 9 Illustration 12 (the preset): total approach net benefits 1,36,500 / 1,40,106 / 1,39,651 / 1,38,083 / 1,31,150 → Policy A', () => {
  const c = preset(/Illustration 12/).sim.cr, P = c.P;
  [136500, 140106, 139651, 138083, 131150].forEach((w, i) => near(P[i].net, w, 0.5, P[i].name));
  [37500, 52222, 66944, 83333, 106250].forEach((w, i) => near(P[i].invest, w, 0.5));
  [7500, 10444, 13389, 16667, 21250].forEach((w, i) => near(P[i].opp, w, 0.5));
  assert.equal(P[c.best].name, 'A');
});
test('SM ch. 9 Illustration 12, incremental approach: 3,606 / 3,151 / 1,583 / −5,350, expected rates 44.49% / 30.70% / 23.45% / 12.22% → Policy A', () => {
  const r = run(Object.assign({}, def.presets.find(p => /Illustration 12/.test(p.label)).values, { approach: 'incremental' })), P = r.sim.cr.P;
  [3606, 3151, 1583, -5350].forEach((w, i) => near(P[i + 1].dNet, w, 0.5));
  [14722, 29444, 45833, 68750].forEach((w, i) => near(P[i + 1].dInvest, w, 0.5));
  [44.49, 30.70, 23.45, 12.22].forEach((w, i) => near(P[i + 1].err * 100, w, 0.005));
  assert.equal(P[r.sim.cr.best].name, 'A');
  assert.match(r.frames[r.frames.length - 1].caption, /Adopt A/);
});
test('SM ch. 9 Illustration 13: opportunity cost 2,18,750 / 3,50,000 / 4,92,188 at 25% on variable cost; net benefits 11,31,250 / 11,50,000 / 10,82,812 → Option I', () => {
  const c = credit(Object.assign({}, CR, { v: 0.7, k: 25, bdAs: 'amt', costBasis: 'variable', policies: [['Present', 5e6, 90, 150000], ['I', 6e6, 120, 300000], ['II', 6.75e6, 150, 450000]] }));
  [218750, 350000, 492187.5].forEach((w, i) => near(c.P[i].opp, w, 1e-6));
  [1131250, 1150000, 1082812.5].forEach((w, i) => near(c.P[i].net, w, 1e-6));
  assert.equal(c.P[c.best].name, 'I');
});
test('MTP May 2025 Series I Q2(b), ABC Pvt. Ltd (the preset, 20%): net benefits 11,75,000 / 12,20,000 / 11,81,250 → Proposed Policy 1', () => {
  const c = preset(/ABC Pvt/).sim.cr;
  [175000, 280000, 393750].forEach((w, i) => near(c.P[i].opp, w, 1e-6));
  [1175000, 1220000, 1181250].forEach((w, i) => near(c.P[i].net, w, 1e-6));
  assert.equal(c.P[c.best].name, 'Policy 1');
});
test('SM ch. 9 Illustration 14 (the preset): discounts 6,000 / 25,600; opportunity cost 8,190 / 7,280 at 15% × (1 − 30%) on variable cost; net 1,59,810 / 1,98,800 (+38,990)', () => {
  const c = preset(/Illustration 14/).sim.cr, [a, b] = c.P;
  approx(a.CD, 6000); approx(b.CD, 25600); approx(a.BD, 18000); approx(b.BD, 32000);
  approx(a.pat, 168000); approx(b.pat, 206080); near(a.opp, 8190, 1e-6); near(b.opp, 7280, 1e-6);
  near(a.net, 159810, 1e-6); near(b.net, 198800, 1e-6); near(b.net - a.net, 38990, 1e-6); near(c.k, 0.105, 1e-12);
});
test('PYQ Sep 2024 Q3(a), AB Enterprises (the preset): investment 1,66,667 / 2,62,500 / 3,64,583 after 15 days of extra supplier credit; net benefits 9,66,667 / 10,64,500 / 10,54,583 → Policy A', () => {
  const c = preset(/AB Enterprises/).sim.cr, P = c.P;
  [0, 6250, 10417].forEach((w, i) => near(P[i].xcr, w, 0.5));
  [166667, 262500, 364583].forEach((w, i) => near(P[i].invest, w, 0.5));
  [966667, 1064500, 1054583].forEach((w, i) => near(P[i].net, w, 0.5));
  approx(P[1].BD, 33000); approx(P[2].BD, 122500);
  assert.equal(P[c.best].name, 'A');
});
test('credit identities (2,000 random cases): incremental net benefit = net benefit − present net benefit; both approaches pick the same policy', () => {
  const rnd = lcg(13);
  for (let k = 0; k < 2000; k++) {
    const n = 2 + Math.floor(rnd() * 4), s0 = 1e6 + Math.floor(rnd() * 1e7);
    const policies = Array.from({ length: n }, (_, i) => ['P' + i, s0 * (1 + i * rnd() * 0.2), 15 + Math.floor(rnd() * 90), rnd() * 5, rnd() < 0.3 ? rnd() * 3 : 0, Math.floor(rnd() * 100)]);
    const c = credit(Object.assign({}, CR, { v: 0.3 + rnd() * 0.6, fixed: Math.floor(rnd() * 1e6), tax: Math.floor(rnd() * 40), k: 5 + rnd() * 25, kPre: rnd() < 0.5, costBasis: rnd() < 0.5 ? 'total' : 'variable', xcred: rnd() < 0.3 ? 15 : 0, policies }));
    c.P.forEach(p => near(p.dNet, p.net - c.P[0].net, 1e-6 * Math.max(1, Math.abs(p.net))));
    let bi = 0; c.P.forEach((p, i) => { if (p.dNet > c.P[bi].dNet + 1e-9) bi = i; });
    if (!c.tie) assert.equal(bi, c.best);
  }
});

/* ------------------------------------------------------------------ cash models */
test('SM ch. 9 Illustration 10 (the preset): Baumol C = √(2 × 12,60,000 × 20 ÷ 0.08) = ₹25,100', () => {
  const B = preset(/Illustration 10/).sim.B;
  near(B.C, 25100, 0.5); near(B.carry, B.trans, 1e-9);
});
test('PYQ Jan 2026 MCQ 7 (the preset): an optimum of ₹30,000 at ₹25 a transfer and 10% means disbursements of ₹18,00,000 (A)', () => {
  const s = preset(/MCQ 7/).sim;
  approx(s.U, 1800000, 1e-6); approx(baumolU(30000, 25, 0.1), 1800000, 1e-6); near(s.B.C, 30000, 1e-6);
});
test('RTP Jan 2025 Q1(i) (the preset): ₹1.5 lakh a month, ₹20 a transfer, 12% → ₹24,495', () => {
  near(preset(/RTP Jan 2025/).sim.B.C, 24495, 0.5);
});
test('Baumol: the total cost at C* is the lowest on a fine grid, and a monthly U with a monthly S gives the same C* as a year', () => {
  const rnd = lcg(17);
  for (let k = 0; k < 300; k++) {
    const B = baumol({ U: 1e5 + rnd() * 1e8, P: 5 + rnd() * 100, S: 0.02 + rnd() * 0.2 });
    const tc = c => B.U / c * B.P + c / 2 * B.S;
    for (let f = 0.5; f <= 2; f += 0.05) assert.ok(tc(B.C * f) >= B.total - 1e-6);
    const M = baumol({ U: B.U / 12, P: B.P, S: B.S / 12 });
    near(M.C, B.C, 1e-6 * B.C);
  }
});
test('Miller-Orr rule: the balance never stays outside the limits; at the upper limit h − z (or more) is invested, at the lower limit the balance returns to z; a seed repeats', () => {
  for (let seed = 1; seed <= 200; seed++) {
    const M = millerOrr({ low: 0, z: 25000, h: 75000, days: 120, swing: 12000, seed });
    M.events.forEach(e => { if (e.kind === 'invest') { assert.ok(e.from >= 75000); near(e.amount, e.from - 25000, 1e-9); } else { assert.ok(e.from <= 0); near(e.amount, 25000 - e.from, 1e-9); } });
    for (let i = 1; i < M.path.length; i++) { const [d, b] = M.path[i]; const next = M.path[i + 1]; if (b >= 75000 || b <= 0) assert.ok(next && next[0] === d && next[1] === 25000, 'reset to z the same day'); }
    assert.deepEqual(millerOrr({ low: 0, z: 25000, h: 75000, days: 120, swing: 12000, seed }).path, M.path);
  }
  assert.throws(() => millerOrr({ low: 0, z: 80000, h: 75000, days: 30, swing: 1000 }), /lower limit < the return point < the upper limit/);
});

/* ------------------------------------------------------------------ the page */
test('every preset and mode computes, renders every frame, and keeps 3–6 tiles', () => {
  const sets = def.presets.map(p => p.values).concat(['cycle', 'estimate', 'credit', 'cash'].map(mode => ({ mode })));
  for (const v of sets) {
    const r = run(v);
    assert.ok(r.frames.length >= 4 && r.frames.length <= 120, v.mode + ' frames ' + r.frames.length);
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 15, `${v.mode} #${i} caption`); f.view.forEach(x => GA.diagram.render(x)); });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, v.mode + ' tiles');
  }
});
test('presets: at least three, five or more from ICAI papers named in the label, and the PassBook cast', () => {
  assert.ok(def.presets.filter(p => /\b(PYQ|RTP|MTP)\b/.test(p.label)).length >= 5);
  assert.ok(def.presets.filter(p => /Tapri/.test(p.label)).length >= 3);
});
test('frames build one thing at a time: the cycle adds one stage per frame, the statement one line per frame', () => {
  const c = run({ mode: 'cycle' });
  for (let i = 1; i <= 5; i++) assert.equal(c.frames[i].view[1].rows.length, i);
  const e = preset(/Naureen/);
  for (let i = 1; i < e.frames.length - 1; i++) { const a = e.frames[i - 1].view[0].rows.length, b = e.frames[i].view[0].rows.length; assert.ok(b === a + 1 || i === e.frames.length - 1, 'one line'); }
});
test('bad input fails loudly, in plain words', () => {
  assert.throws(() => run({ mode: 'cycle', stages: stg([1, 0, 0, 0], [1, 0, 100, 0]) }), /five stages/);
  assert.throws(() => run({ mode: 'cycle', stages: stg([100, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]) }), /annual raw material consumed/);
  assert.throws(() => run({ mode: 'cycle', stages: stg([0, 0, 0, 10], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 90]) }), /positive/);
  assert.throws(() => run({ mode: 'estimate', conv: 150 }), /stage of completion/);
  assert.throws(() => run({ mode: 'credit', policies: [['Only', 1e6, 30, 1, 0, 0]] }), /at least one proposed/);
  assert.throws(() => run({ mode: 'credit', vcr: 100 }), /variable cost/);
  assert.throws(() => run({ mode: 'cash', disb: 0 }), /disbursements/);
  assert.equal(amt('12,50,000'), 1250000); assert.equal(amt('₹ 4.5'), 4.5);
});

/* ------------------------------------------------------------------ the challenge */
test('challenge: 300 problems per mode build; the answer is what the lab computes; choices hold the answer; negatives get the minus key', () => {
  for (const mode of ['cycle', 'estimate', 'credit', 'cash']) {
    const asks = new Set();
    for (let s = 1; s <= 300; s++) {
      const P = FW.problem(def, Object.assign(FW._defaults(def), { mode }), s * 104729);
      assert.equal(P.values.mode, mode);
      const spec = FW.answerSpec(def, P.values, P.result, P.want);
      asks.add({ cycle: P.values.askCyc, estimate: P.values.askEst, credit: P.values.askCrd, cash: P.values.askCash }[mode]);
      if (spec.kind === 'choice') assert.ok(spec.choices.some(c => FW.check(spec, c[0], P.want).ok), 'a button is the answer');
      else { assert.ok(Number.isFinite(P.want)); assert.ok(FW.check(spec, String(Math.round(P.want * 100) / 100), P.want).ok, `${mode}#${s} two-decimal answer ${P.want}`); if (P.want < 0) assert.equal(spec.kind, 'signed'); }
      assert.ok(def.challenge.prompt(P.values, P.result).length > 40);
      assert.ok(def.challenge.explain(P.result, P.values).length > 40);
      if (mode === 'cycle' && P.values.askCyc === 'net') assert.ok(Number.isInteger(P.want), 'whole days');
      if (mode === 'cash' && P.values.askCash === 'c') assert.ok(Number.isInteger(Math.round(P.want * 1e6) / 1e6), 'a whole-rupee optimum');
    }
    assert.ok(asks.size >= 3, mode + ' varies its questions: ' + [...asks]);
  }
});
