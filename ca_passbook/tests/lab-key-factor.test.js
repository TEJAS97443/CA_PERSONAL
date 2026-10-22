/* Key Factor Lab (app/js/labs/key-factor.js): the best product mix under a limiting factor, make or buy with a scarce resource, and the
   shut-down decision, checked against the ICAI Study Material (Paper 4, chapter 14) and real ICAI questions with their Suggested Answers,
   plus independent brute force (an LP solved by vertex enumeration, exhaustive integer search) on thousands of random problems. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const FW = require('../app/js/labs/framework.js');
const { bestMix, makeBuy, shutDown, compute, def } = require('../app/js/labs/key-factor.js');
const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= (eps == null ? 1e-6 : eps))) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const run = v => compute(Object.assign({}, FW._defaults(def), v));
const preset = re => run(def.presets.find(p => re.test(p.label)).values);
const prods = rows => rows.map(([name, price, vc, kf, max, min]) => ({ name, price, vc, kf, max, min: min || 0 }));
const units = R => Object.fromEntries(R.P.map(p => [p.name, p.units]));

/* ---------------------------------------------------------------- product mix: ICAI */
test('key-factor: RTP Sep 2025 Q16 (N.P. Ltd): ₹8.50 vs ₹16 per machine hour; Q 1,00,000 then P 30,000; contribution ₹21,10,000, profit ₹11,50,000', () => {
  /* total cost ₹20 (P) and ₹40 (Q) include fixed overhead at ₹9,60,000 ÷ 1,60,000 hours = ₹6 an hour: VC P = 20 − 12, Q = 40 − 6 */
  const r = preset(/N\.P\. Ltd/), R = r.sim;
  assert.deepEqual(R.P.map(p => p.cpk), [8.5, 16]); assert.deepEqual(R.order.map(p => p.name), ['Q', 'P']);
  assert.deepEqual(units(R), { P: 30000, Q: 100000 }); near(R.contribution, 2110000); near(R.contribution - 960000, 1150000);
  near(40000 * 5 + 80000 * 10, 1000000, 0, 'the draft budget profit, (i)');
});
test('key-factor: PYQ Sep 2025 Q3(b) (SM Ltd): ₹37 vs ₹29 per kg; A 5,000, B 3,000; contribution ₹35,90,000, profit ₹29,90,000', () => {
  const R = preset(/SM Ltd/).sim;
  assert.deepEqual(R.P.map(p => p.cpk), [37, 29]); assert.deepEqual(units(R), { A: 5000, B: 3000 });
  near(R.contribution, 3590000); near(R.contribution - 600000, 2990000);
});
test('key-factor: PYQ May 2023 old scheme Q4(c) (MNP Co.): ₹5 vs ₹10 per hour; B 6,000, A 2,500; profit ₹2,85,000', () => {
  const R = preset(/MNP Co/).sim;
  assert.deepEqual(R.P.map(p => p.cpk), [5, 10]); assert.deepEqual(units(R), { A: 2500, B: 6000 }); near(R.contribution - 140000, 285000);
});
test('key-factor: PYQ Nov 2022 old scheme Q4(a) (crops, minimum areas): rice, wheat, maize; 150 / 50 / 10 hectares; contribution ₹25,75,000, profit ₹4,30,000', () => {
  /* per hectare: wheat 2,000 kg × (₹20 − ₹14), rice 500 × (₹40 − ₹13), maize 100 × (₹250 − ₹150) */
  const R = preset(/hectares/).sim;
  assert.deepEqual(R.P.map(p => p.c), [12000, 13500, 10000]); assert.deepEqual(R.order.map(p => p.name), ['Rice', 'Wheat', 'Maize']);
  assert.deepEqual(units(R), { Wheat: 150, Rice: 50, Maize: 10 }); near(R.contribution, 2575000); near(R.contribution - 2145000, 430000);
});
test('key-factor: SM Illustration 12 (X Ltd parts A, B): the binding resource is the lowest of the three limits; A optimises contribution (₹1,79,982 vs ₹1,62,500)', () => {
  /* one part only: max units = min(4,000 ÷ 0.6, 4,500 ÷ 0.5, 13,000 ÷ 1.6) for A and min(4,000 ÷ 0.25, 4,500 ÷ 0.55, 13,000 ÷ 1.6) for B; each is a one-product mix on its binding factor */
  const A = bestMix(prods([['A', 145, 118, 0.6, 1e9]]), 4000), B = bestMix(prods([['B', 115, 95, 1.6, 1e9]]), 13000);
  assert.equal(A.P[0].units, 6666); assert.equal(B.P[0].units, 8125);
  near(A.contribution, 179982); near(B.contribution, 162500);
});
test('key-factor: the Tapri lesson example: minimum teapots first, then diyas, kulhads; ranking per unit would lose ₹56,000', () => {
  const r = run({ mode: 'mix' }), R = r.sim;
  assert.deepEqual(R.order.map(p => p.name), ['Diya', 'Kulhad', 'Teapot']);
  assert.deepEqual(units(R), { Kulhad: 4000, Teapot: 440, Diya: 3000 }); near(R.contribution, 396000);
  near(R.contribution - r.alt.contribution, 56000);
  r.frames.forEach(f => f.view.forEach(s => GA.diagram.render(s)));
});

/* ---------------------------------------------------------------- product mix: brute force */
/** independent LP for one constraint with bounds min ≤ x ≤ max: an optimum lies at a vertex where every product but at most one sits at a bound */
function lpMix(P, avail) {
  const n = P.length; let best = -Infinity;
  for (let f = -1; f < n; f++) for (let mask = 0; mask < 1 << n; mask++) {
    const x = P.map((p, i) => (mask & (1 << i) ? p.max : p.min));
    if (f >= 0) { const rest = P.reduce((a, p, i) => a + (i === f ? 0 : x[i] * p.kf), 0); x[f] = (avail - rest) / P[f].kf; if (x[f] < P[f].min - 1e-9 || x[f] > P[f].max + 1e-9) continue; }
    if (P.reduce((a, p, i) => a + x[i] * p.kf, 0) > avail + 1e-7) continue;
    best = Math.max(best, P.reduce((a, p, i) => a + x[i] * (p.price - p.vc), 0));
  }
  return best;
}
test('key-factor: 3,000 random mixes: the ranking equals an independent LP (part units); whole units lose less than one unit\'s contribution; integer brute force agrees on small cases', () => {
  const rnd = lcg(7);
  for (let k = 0; k < 3000; k++) {
    const n = 1 + Math.floor(rnd() * 4);
    const P = Array.from({ length: n }, (_, i) => { const vc = Math.floor(rnd() * 50), max = Math.floor(rnd() * 40); return { name: 'P' + i, price: Math.max(0, vc + Math.floor(rnd() * 60) - 5), vc, kf: 1 + Math.floor(rnd() * 5), max, min: rnd() < 0.3 ? Math.floor(rnd() * max * 0.5) : 0 }; });
    const minUse = P.reduce((a, p) => a + p.min * p.kf, 0), avail = minUse + Math.floor(rnd() * 120);
    const cont = bestMix(P, avail, { whole: false }), lp = lpMix(P, avail);
    near(cont.contribution, lp, 1e-6 * (1 + Math.abs(lp)), 'LP');
    const whole = bestMix(P, avail, { whole: true }), maxC = Math.max(0, ...P.map(p => p.price - p.vc));
    assert.ok(whole.contribution <= lp + 1e-6 && whole.contribution >= lp - maxC - 1e-6, 'whole units within one unit');
    assert.ok(whole.P.reduce((a, p) => a + p.used, 0) <= avail + 1e-9);
    whole.P.forEach(p => assert.ok(p.units >= p.min && p.units <= p.max && Number.isInteger(p.units)));
    if (n <= 3 && P.every(p => p.max <= 12)) {                        // exhaustive integer search
      let bestI = -Infinity;
      const rec = (i, used, val) => { if (i === n) { bestI = Math.max(bestI, val); return; } for (let x = P[i].min; x <= P[i].max; x++) { const u = used + x * P[i].kf; if (u > avail) break; rec(i + 1, u, val + x * (P[i].price - P[i].vc)); } };
      rec(0, 0, 0);
      assert.ok(whole.contribution <= bestI + 1e-9 && bestI <= lp + 1e-9);
    }
  }
});

/* ---------------------------------------------------------------- make or buy: ICAI */
test('key-factor: MTP Sep 2025 Series 1 Q4(a) (Apex Electronics): savings ₹300, (₹100), ₹400; per hour ₹250 and ₹114.29; make 3,333 voice modules, buy 667 and every panel and adapter', () => {
  const B = preset(/Apex/).sim, by = Object.fromEntries(B.P.map(p => [p.name, p]));
  near(by['Voice module'].s, 300); near(by['Control panel'].s, -100); near(by['Power adapter'].s, 400);
  near(by['Voice module'].spk, 250); near(by['Power adapter'].spk, 400 / 3.5);
  assert.deepEqual(B.rankOrder.map(p => p.name), ['Voice module', 'Power adapter']);
  assert.deepEqual(B.P.map(p => [p.make, p.bought]), [[3333, 667], [0, 4000], [0, 4000]]);
});
test('key-factor: MTP Nov 2023 Series 2 old scheme Q5(b) (P, Q, R, S): S made first; savings per hour ₹4.80, ₹4.40, ₹4.20; buy 36,200 of R; contribution ₹66,14,760, profit ₹19,30,760', () => {
  const B = preset(/four products|P, Q, R/).sim, by = Object.fromEntries(B.P.map(p => [p.name, p]));
  near(by.P.spk, 4.8); near(by.Q.spk, 4.4); near(by.R.spk, 4.2);
  assert.deepEqual(B.P.map(p => [p.name, p.make, p.bought]), [['P', 120000, 0], ['Q', 186000, 0], ['R', 134800, 36200], ['S', 99000, 0]]);
  near(B.used, 815000);
  const sales = 120000 * 23.88 + 186000 * 28.68 + 171000 * 55.08 + 99000 * 47.88;        // the profitability statement of the answer
  near(sales - B.total, 6614760, 1e-4); near(sales - B.total - 4684000, 1930760, 1e-4);
});
test('key-factor: RTP Jan 2026 Q17 (Jupiter Ltd, EXE cans): make 1,50,000 at ₹0.6375 (₹95,625 vs ₹1,01,250); buy the extra 25,000 / 75,000; the new machine pays above 2,00,000 extra cans', () => {
  /* ₹0.6375 = 20% of ₹2.25 material + 10% of ₹1.50 wages + 10% of ₹0.375 variable overheads (₹27 − ₹1,12,500 ÷ 6,250 cartons = ₹9 a carton) */
  near(0.2 * 54 / 24 + 0.1 * 36 / 24 + 0.1 * (27 - 112500 / (150000 / 24)) / 24, 0.6375, 1e-12);
  const B = preset(/Jupiter/).sim, [a, x] = B.P;
  assert.equal(a.make, 150000); near(a.makeCost, 95625); near(a.need * a.buy, 101250);
  assert.equal(x.make, 0); assert.equal(x.bought, 75000); near(x.buyCost, 50625); assert.ok(x.dropped); near(x.indiff, 200000, 1e-6);
  const B25 = makeBuy([{ name: 'cans', need: 150000, vc: 0.6375, buy: 0.675, kf: 0 }, { name: 'extra', need: 25000, vc: 0.6375, buy: 0.675, kf: 0, fixed: 7500 }], 0);
  near(B25.P[1].buyCost, 16875); assert.equal(B25.P[1].make, 0);
  const B3 = makeBuy([{ name: 'cans', need: 150000, vc: 0.6375, buy: 0.675, kf: 0 }, { name: 'extra', need: 210000, vc: 0.6375, buy: 0.675, kf: 0, fixed: 7500 }], 0);
  assert.equal(B3.P[1].make, 210000, 'beyond 2,00,000 extra cans making wins');
});
test('key-factor: the Tapri samosa factory: masala made first, pastry in full, half the filling; chutney bought (cheaper outside); saving ₹90,000', () => {
  const B = run({ mode: 'makebuy' }).sim;
  assert.deepEqual(B.P.map(p => [p.name, p.make, p.bought]), [['Pastry', 50000, 0], ['Filling', 25000, 25000], ['Chutney', 0, 50000], ['Masala', 50000, 0]]);
  near(B.total, 715000); near(B.saving, 90000);
});

/* ---------------------------------------------------------------- make or buy: brute force */
/** independent: every part at 0 or its need except at most one fractional (it fills the key factor), fixed charges for any part made */
function bruteMB(parts, avail) {
  const n = parts.length, limit = avail > 0 ? avail : Infinity; let best = Infinity;
  const cost = x => parts.reduce((a, p, i) => a + (p.buy > 0 ? x[i] * p.vc + (x[i] > 1e-12 ? p.fixed : 0) + (p.need - x[i]) * p.buy : p.need * p.vc + (p.need > 0 ? p.fixed : 0)), 0);
  for (let f = -1; f < n; f++) for (let mask = 0; mask < 1 << n; mask++) {
    const x = parts.map((p, i) => (p.buy > 0 ? (mask & (1 << i) ? p.need : 0) : p.need));
    if (f >= 0) { if (!(parts[f].buy > 0) || !(parts[f].kf > 0)) continue; const rest = parts.reduce((a, p, i) => a + (i === f ? 0 : x[i] * p.kf), 0); x[f] = (limit - rest) / parts[f].kf; if (!(x[f] >= -1e-9 && x[f] <= parts[f].need + 1e-9)) continue; x[f] = Math.max(0, x[f]); }
    if (parts.reduce((a, p, i) => a + x[i] * p.kf, 0) > limit + 1e-7) continue;
    best = Math.min(best, cost(x));
  }
  return best;
}
test('key-factor: 3,000 random make-or-buy problems: the plan equals an independent search over every vertex (part units, fixed costs too); whole units stay within one unit\'s saving', () => {
  const rnd = lcg(19);
  let checked = 0;
  for (let k = 0; k < 3000; k++) {
    const n = 1 + Math.floor(rnd() * 4);
    const parts = Array.from({ length: n }, (_, i) => ({ name: 'M' + i, need: Math.floor(rnd() * 30), vc: Math.floor(rnd() * 40), buy: rnd() < 0.15 ? 0 : Math.floor(rnd() * 50) + 1, kf: rnd() < 0.15 ? 0 : 1 + Math.floor(rnd() * 4), fixed: rnd() < 0.3 ? Math.floor(rnd() * 120) : 0 }));
    const mustUse = parts.filter(p => !(p.buy > 0)).reduce((a, p) => a + p.need * p.kf, 0), avail = rnd() < 0.2 ? 0 : mustUse + Math.floor(rnd() * 100) + (mustUse ? 0 : 1);
    const cont = makeBuy(parts, avail, { whole: false }), bf = bruteMB(parts, avail);
    near(cont.total, bf, 1e-6 * (1 + bf), 'part units');
    if (!parts.some(p => p.fixed > 0)) {
      const whole = makeBuy(parts, avail, { whole: true }), maxS = Math.max(0, ...parts.filter(p => p.buy > 0).map(p => p.buy - p.vc));
      assert.ok(whole.total >= bf - 1e-6 && whole.total <= bf + maxS + 1e-6, 'whole units within one unit');
      whole.P.forEach(p => assert.ok(Number.isInteger(p.make) && p.make >= 0 && p.make <= p.need));
      checked++;
    }
  }
  assert.ok(checked > 1000);
  assert.throws(() => makeBuy([{ name: 'S', need: 100, vc: 5, buy: 0, kf: 2, fixed: 0 }], 150), /cannot be bought need 200/);
});

/* ---------------------------------------------------------------- shut down */
test('key-factor: PYQ Nov 2023 old scheme Q4(b) (R Ltd Noida): loss ₹2,40,000 if run vs ₹1,95,000 if shut → shut down; shut-down point 75,000 units', () => {
  const S = preset(/Noida/).sim;
  near(S.c, 3); near(S.cont, -240000); near(S.shutCost, 195000); assert.equal(S.decision, 'shut'); near(S.sdp, 75000);
});
test('key-factor: MTP Nov 2023 Series 2 old scheme Q1(b) (T Ltd): loss ₹1,60,000 vs ₹1,45,000 → shut down; shut-down point 1,02,500 units = 86.32% of 1,18,750', () => {
  const S = preset(/T Ltd/).sim;
  near(S.cont, -160000); near(S.shutCost, 145000); assert.equal(S.decision, 'shut'); near(S.sdp, 102500); near(S.sdpPct * 100, 86.32, 0.005); near(95000 / 0.8, 118750);
});
test('key-factor: SM Practical Problem 9(iii) (Mr. X): avoidable fixed cost ₹55,000 ÷ 40% → lock up below sales of ₹1,37,500', () => {
  const S = preset(/Mr\. X/).sim;
  near(S.sdp * 100, 137500); near(S.avoidable, 55000); assert.equal(S.decision, 'continue');
  assert.equal(shutDown({ price: 100, vc: 60, units: 1300, fixed: 80000, keep: 25000 }).decision, 'shut');
});
test('key-factor: shut-down identities on 5,000 random plants: the two results are equal at the shut-down point; the decision flips across it', () => {
  const rnd = lcg(23);
  for (let k = 0; k < 5000; k++) {
    const vc = rnd() * 50, price = vc + 0.5 + rnd() * 50, fixed = rnd() * 1e6, keep = rnd() * fixed, extra = rnd() * fixed * 0.3, units = rnd() * 1e5;
    const S = shutDown({ price, vc, units, fixed, keep, extra });
    if (S.sdp > 0) {
      const at = shutDown({ price, vc, units: S.sdp, fixed, keep, extra });
      near(at.cont, at.shut, 1e-6 * (1 + fixed));
      assert.equal(shutDown({ price, vc, units: S.sdp * 1.01 + 1, fixed, keep, extra }).decision, 'continue');
      if (S.sdp > 2) assert.equal(shutDown({ price, vc, units: S.sdp * 0.99 - 1, fixed, keep, extra }).decision, 'shut');
    } else assert.notEqual(S.decision, 'shut');
  }
  assert.throws(() => shutDown({ price: 10, vc: 12, units: 1, fixed: 1, keep: 0 }), /higher than the variable cost/);
  assert.throws(() => shutDown({ price: 10, vc: 5, units: 1, fixed: 100, keep: 200 }), /cannot be more/);
});

/* ---------------------------------------------------------------- frames, presets */
test('key-factor: every preset computes, renders every frame, ends with the answer and keeps 3–6 tiles; at least 3 presets cite ICAI papers', () => {
  def.presets.forEach(p => {
    const r = run(p.values);
    assert.ok(r.frames.length >= 4 && r.frames.length <= 120, p.label);
    r.frames.forEach(f => { assert.ok(f.caption && f.caption.length > 20, p.label); f.view.forEach(s => GA.diagram.render(s)); });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, p.label + ' tiles');
  });
  assert.ok(def.presets.filter(p => /RTP|MTP|PYQ/.test(p.label)).length >= 3);
});
test('key-factor: bad inputs explain what to fix', () => {
  assert.throws(() => bestMix(prods([['A', 10, 5, 0, 10]]), 10), /use some of the key factor/);
  assert.throws(() => bestMix(prods([['A', 10, 5, 1, 10, 20]]), 100), /minimum/);
  assert.throws(() => bestMix(prods([['A', 10, 5, 2, 10, 8]]), 10), /minimum commitments alone need 16/);
  const R = bestMix(prods([['A', 10, 5, 1, 10]]), 100);
  assert.equal(R.limiting, false); assert.equal(R.P[0].units, 10);
});
