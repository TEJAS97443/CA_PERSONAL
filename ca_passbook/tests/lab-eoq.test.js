/* EOQ and Stock Levels Lab (app/js/labs/eoq.js): the ICAI Study Material's illustrations and practical problems (Paper 4, chapter 2,
   §6.1), ICAI Suggested Answers (PYQs, MTPs, RTPs of the new scheme), brute-force and identity checks on random inputs, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const E = require('../app/js/labs/eoq.js');
const { def } = E;
const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= (eps == null ? 1e-6 : eps), `${msg || ''} expected ${b}, got ${a}`);
const run = v => def.compute(L.prepare(def, Object.assign(L._defaults(def), v)));
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const ICAI = { roundQ: true, whole: true };                     // ICAI's answers round the EOQ to whole units and the orders up
const eoqRun = (A, O, price, pct, rup, cmp, o) => run(Object.assign({ mode: 'eoq', A, O, price, pct, rup, cmp: cmp || 0 }, ICAI, o || {})).sim;
const disc = (A, O, price, pct, rup, tiers, o) => run(Object.assign({ mode: 'discount', A, O, price, pct, rup, tiers }, ICAI, o || {})).sim;
const lev = v => run(Object.assign({ mode: 'levels', ltMid: true, lemerg: 0, rolFrom: 'max', roqFrom: 'given', shelf: 0, avgF: 'half', ubasis: 'all' }, v)).sim;

/* ================================================================ EOQ: Study Material */
test('EOQ: SM Illustration 3 — 10,000 kg, ₹50 an order, 8% of ₹2: EOQ 2,500 kg, 4 orders', () => {
  const s = eoqRun(10000, 50, 2, 8, 0);
  near(s.eoq, 2500); near(s.at.n, 4);
});
test('EOQ: SM Illustration 4 — EOQ 200 and total cost ₹1,00,800; at ₹12.80 EOQ 250 and ₹64,640', () => {
  const a = eoqRun(5000, 16, 20, 20, 0);                       // storage 2% + interest 12% + obsolescence 6% = 20%
  near(a.C, 4); near(a.eoq, 200); near(a.at.n, 25); near(a.at.ordering, 400); near(a.at.carrying, 400); near(a.at.total, 100800);
  const b = eoqRun(5000, 16, 12.8, 20, 0);
  near(b.eoq, 250); near(b.at.ordering, 320); near(b.at.carrying, 320); near(b.at.total, 64640);
});
test('EOQ: SM Practical Problem 1 (Anil & Company) — six instalments cost ₹750, the EOQ ₹600: saving ₹150', () => {
  const s = eoqRun(36000, 25, 1, 20, 0, 6000);
  near(s.cmp.ordering, 150); near(s.cmp.carrying, 600); near(s.cmp.relevant, 750);
  near(s.eoq, 3000); near(s.at.n, 12); near(s.at.relevant, 600); near(s.saving, 150);
});
test('EOQ: SM Practical Problem 3 (fertilizers) — 100 and 80 bags, 20 and 16 deliveries, ₹48,000 and ₹44,800', () => {
  const a = eoqRun(2000, 1200, 0, 0, 480), b = eoqRun(1280, 1400, 0, 0, 560);   // carrying given in ₹ a bag
  near(a.eoq, 100); near(a.at.n, 20); near(a.at.relevant, 48000);
  near(b.eoq, 80); near(b.at.n, 16); near(b.at.relevant, 44800);
});
test('EOQ: SM Practical Problem 7 (G. Ltd.) — EOQ 2,400; a 4,000 lot costs ₹640 more; minimum carrying cost ₹2,400', () => {
  const s = eoqRun(48000, 120, 20, 10, 0, 4000);
  near(s.eoq, 2400); near(s.at.relevant, 4800); near(s.cmp.relevant, 5440); near(-s.saving, -640); near(s.at.carrying, 2400);
});
test('EOQ: SM Case Scenario 1 — material A 13,856 kg and material B 16,181 kg', () => {
  near(eoqRun(360000, 1200, 30, 15, 0).eoq, 13856); near(eoqRun(240000, 1200, 44, 5, 0).eoq, 16181);
});

/* ================================================================ EOQ: ICAI Suggested Answers */
test('EOQ: PYQ Jan 2026 MCQs 6–10 — OE 200 kg (₹2.5 a month + 1.25% a quarter); OC 250 kg, 16 orders, ₹81,00,000; 200 kg orders ₹81,02,500', () => {
  const oe = eoqRun(1600, 500, 200, 5, 30);                    // 1.25% × 4 = 5% of ₹200, plus ₹2.5 × 12 = ₹30
  near(oe.C, 40); near(oe.eoq, 200);
  const oc = eoqRun(4000, 3125, 2000, 20, 0, 200);             // 5% + 13% + 2%
  near(oc.eoq, 250); near(oc.at.n, 16); near(oc.at.total, 8100000); near(oc.cmp.total, 8102500);
});
test('EOQ: MTP Sep 2025 Series II Q3(a) — EOQ 1,200 kg; the 1,000 kg ROQ costs ₹21,560 against ₹21,120 (₹440 more)', () => {
  const s = eoqRun(17200, 720, 125, 13.76, 0, 1000);
  near(s.C, 17.2); near(s.eoq, 1200); near(s.at.n, 15); near(s.at.relevant, 21120); near(s.cmp.n, 18); near(s.cmp.relevant, 21560); near(s.saving, 440);
});
test('EOQ: MTP Sep 2026 Series I MCQs — EOQ 1,434 kg; ordering 1,154 kg costs ₹24,95,063', () => {
  const s = eoqRun(26050, 540, 95, 14.4, 0, 1154);
  near(s.eoq, 1434); near(s.cmp.n, 23); near(s.cmp.ordering, 12420); near(s.cmp.total, 2495063, 0.5);
});
test('EOQ: RTP Sep 2025 Q7 — EOQ 2,000 kg against the quarterly 5,000 kg: ₹10,000 against ₹14,500, saving ₹4,500', () => {
  const s = eoqRun(20000, 500, 20, 25, 0, 5000);
  near(s.eoq, 2000); near(s.at.relevant, 10000); near(s.cmp.relevant, 14500); near(s.saving, 4500);
});
test('EOQ: RTP Sep 2026 Q5 — EOQ 646 kg (1% a month + ₹2), 22.6 → 23 orders, total ₹14,69,122', () => {
  const s = eoqRun(14600, 200, 100, 12, 2);
  near(s.C, 14); near(s.eoqExact, 645.87, 0.005); near(s.eoq, 646); near(s.at.n, 23); near(s.at.ordering, 4600); near(s.at.carrying, 4522); near(s.at.total, 1469122);
});
test('EOQ: RTP May 2025 Q8 — EOQ 500 drums (₹180 + 10% of price); ordering + carrying ₹1,00,000 at 500 and ₹1,24,980 at 1,000', () => {
  const s = eoqRun(250000, 100, 200, 10, 180);
  near(s.eoq, 500); near(s.at.relevant, 100000);
  const d = disc(250000, 100, 200, 10, 180, [[1000, 199.6]]);
  const at1000 = d.cands.find(c => c.Q === 1000);
  near(at1000.ordering, 25000); near(at1000.carrying, 99980); near(at1000.total, 50024980); near(d.base.total, 50100000);
  assert.equal(d.best.Q, 1000, 'before the purchasing manager\'s bonus (which the lab does not model) the 1,000-drum discount also wins');
});
test('EOQ: the switches — unrounded EOQ, exact orders: ordering = carrying at the EOQ', () => {
  const s = eoqRun(14600, 200, 100, 12, 2, 0, { roundQ: false, whole: false });
  near(s.eoq, Math.sqrt(2 * 14600 * 200 / 14)); near(s.at.ordering, s.at.carrying, 1e-6);
});

/* ================================================================ quantity discounts */
test('Discount: SM Practical Problem 2 — EOQ 200 costs ₹32,16,000; 4% off at 4,000 costs ₹32,26,000: stay with the EOQ', () => {
  const s = disc(8000, 200, 400, 20, 0, [[4000, '4%']]);
  near(s.eoq, 200); near(s.base.total, 3216000);
  const q = s.cands.find(c => c.Q === 4000);
  near(q.price, 384); near(q.ordering, 400); near(q.carrying, 153600); near(q.total, 3226000);
  assert.equal(s.best.Q, 200);
});
test('Discount: SM Practical Problem 5(a) — EXE Limited: the SM\'s rows 500, 1,000, 2,000, 3,000 tonnes; best 1,000 tonnes at ₹59,22,000; (b) EOQ 200 at ₹1,500', () => {
  const s = disc(5000, 1200, 1200, 20, 0, [[500, 1180], [1000, 1160], [2000, 1140], [3000, 1120]]);
  const tot = Q => s.cands.find(c => c.Q === Q).total;
  near(tot(500), 5971000); near(tot(1000), 5922000); near(tot(2000), 5931600); near(tot(3000), 5938400);   // 2.5 → 3 and 1.67 → 2 orders, as the SM rounds
  assert.equal(s.best.Q, 1000); near(s.best.total, 5922000);
  /* the SM's first row costs an order of 400 tonnes; the lab tests the EOQ (224 tonnes) instead, which is cheaper still; the winner is the same */
  assert.ok(s.base.total < 6063600);
  near(eoqRun(5000, 1200, 1500, 20, 0).eoq, 200);
});
test('Discount: PYQ May 2024 Q1(a) — EOQ 6,000 locks costs ₹8,65,44,000; 2% off at 30,000 costs ₹8,50,39,200: accept', () => {
  const s = disc(360000, 1200, 240, 10, 0, [[30000, '2%']]);
  near(s.eoq, 6000); near(s.base.total, 86544000);
  near(s.best.Q, 30000); near(s.best.price, 235.2); near(s.best.ordering, 14400); near(s.best.carrying, 352800); near(s.best.total, 85039200);
});
test('Discount: MTP May 2024 Series II Q1(b) — EOQ 371, 33 orders, ₹2,09,58,332.40; 5% off at 6,000 costs ₹2,04,33,480: accept', () => {
  const s = disc(12000, 1200, 1740, 12, 0, [[6000, '5%']]);
  near(s.eoq, 371); near(s.base.n, 33); near(s.base.carrying, 38732.4); near(s.base.total, 20958332.4);
  near(s.best.Q, 6000); near(s.best.carrying, 595080); near(s.best.total, 20433480);
});
test('Discount: RTP Sep 2026 Q5(h) — two orders a year at 1% off cost ₹14,96,462 against ₹14,69,122 at the EOQ: reject', () => {
  const s = disc(14600, 200, 100, 12, 2, [[7300, '1%']]);
  const two = s.cands.find(c => c.Q === 7300);
  near(two.C, 13.88); near(two.n, 2); near(two.carrying, 50662); near(two.total, 1496462);
  assert.equal(s.best.Q, 646); near(s.best.total, 1469122);
});
test('Discount: RTP Sep 2025 Q7(vii) — 5% off for the quarterly 5,000 kg: ₹16,125 better than the EOQ', () => {
  const s = disc(20000, 500, 20, 25, 0, [[5000, '5%']]);
  near(s.base.total - s.best.total, 16125); near(s.best.Q, 5000); near(s.best.carrying, 11875);
});
test('Discount: a band\'s own EOQ inside its band is tested; an EOQ that already qualifies for a lower price is priced at it', () => {
  const s = disc(10000, 100, 10, 0, 1, [[1000, 9.5]], { roundQ: false, whole: false });   // C is ₹1 at every price, EOQ 1,414 > 1,000
  const e = s.cands.find(c => c.kind === 'eoq');
  near(e.Q, Math.sqrt(2e6)); near(e.price, 9.5);
  assert.equal(s.best, e);
  const t = disc(10000, 200, 10, 20, 0, [[1000, 8]], { roundQ: false, whole: false });     // at ₹8, C = 1.6: EOQ 1,581 inside its band
  const inner = t.cands.find(c => c.kind === 'inner');
  assert.ok(inner && inner.Q > 1000); near(inner.Q, Math.sqrt(2 * 10000 * 200 / 1.6)); assert.equal(t.best, inner);
});
test('Discount: brute force over every whole order size agrees with the lab\'s best, 300 random price lists', () => {
  const r = lcg(7);
  for (let k = 0; k < 300; k++) {
    const A = 500 + Math.floor(r() * 5000), O = 20 + Math.floor(r() * 400), base = 10 + Math.floor(r() * 200), pct = r() < 0.7 ? 5 + Math.floor(r() * 25) : 0, rup = pct ? (r() < 0.3 ? Math.floor(r() * 5) : 0) : 1 + Math.floor(r() * 20);
    const n = 1 + Math.floor(r() * 3), tiers = []; let from = 50 + Math.floor(r() * 300), p = base;
    for (let i = 0; i < n; i++) { p = +(p * (1 - (0.005 + r() * 0.05))).toFixed(2); tiers.push([from, p]); from += 50 + Math.floor(r() * 800); }
    for (const roundQ of [false, true]) {
      const s = disc(A, O, base, pct, rup, tiers, { roundQ, whole: false });
      const T = E.parseTiers(base, tiers), top = Math.ceil(Math.max(tiers[tiers.length - 1][0] * 1.5, s.eoqExact * 3));
      let bf = Infinity;
      for (let Q = 1; Q <= top; Q++) { const t = E.priceAt(T, Q), C = E.carrying(t.price, pct, rup); bf = Math.min(bf, A * t.price + A / Q * O + Q / 2 * C); }
      if (!roundQ) assert.ok(s.best.total <= bf + 0.005 + 1e-9, `#${k}: the continuous best ${s.best.total} is never above the whole-number best ${bf} (ties within half a paisa go to the smaller order)`);
      assert.ok(Math.abs(s.best.total - bf) <= 1e-4 * bf + 0.5, `#${k} roundQ=${roundQ}: lab ${s.best.total} vs brute force ${bf}`);
    }
  }
});

/* ================================================================ stock levels: Study Material */
test('Levels: SM Illustration 5 — A: ROL 450, min 200, max 650, average 425; B: ROL 300, min 150, max 750, average 450', () => {
  const a = lev({ umin: 25, uavg: 50, umax: 75, lmin: 4, lmax: 6, roq: 300, avgF: 'mid' });
  near(a.rol, 450); near(a.min, 200); near(a.max, 650); near(a.avg, 425);
  const b = lev({ umin: 25, uavg: 50, umax: 75, lmin: 2, lmax: 4, roq: 500, avgF: 'mid' });
  near(b.rol, 300); near(b.min, 150); near(b.max, 750); near(b.avg, 450);
});
test('Levels: SM Illustration 6 — minimum usage 10 from the average; EOQ 200; ROL 300, max 450, min 150, danger 60', () => {
  const s = lev({ ubasis: 'avgmax', uavg: 15, umax: 20, lmin: 5, lmax: 15, ltMid: false, lavg: 10, lemerg: 4, roqFrom: 'eoq', A: 5000, O: 20, price: 50, pct: 0, rup: 5, roundQ: true });
  near(s.umin, 10); near(s.roq, 200); near(s.rol, 300); near(s.max, 450); near(s.min, 150); near(s.danger, 60);
});
test('Levels: SM Practical Problem 6 — ROL 30,000, max 45,000, min 15,000, danger 6,000 (EOQ 20,000)', () => {
  const s = lev({ ubasis: 'avgmax', uavg: 1500, umax: 2000, lmin: 5, lmax: 15, ltMid: false, lavg: 10, lemerg: 4, roqFrom: 'eoq', A: 500000, O: 4000, price: 50, pct: 0, rup: 10, roundQ: true });
  near(s.roq, 20000); near(s.umin, 1000); near(s.rol, 30000); near(s.max, 45000); near(s.min, 15000); near(s.danger, 6000);
});
test('Levels: SM Practical Problem 4 — min of A 4,000; max of B 7,650; ROL of C 5,400 (or 5,600 from its minimum); average of A 9,000 or 10,125', () => {
  const wk = k => ({ umin: 175 * k, uavg: 200 * k, umax: 225 * k });             // weekly production 175–225 units, average 200
  const a = lev(Object.assign(wk(10), { lmin: 1, lmax: 3, ltMid: false, lavg: 2, rolFrom: 'given', rol: 8000, roq: 10000 }));
  near(a.min, 4000); near(a.avgHalf, 9000); near(a.max, 16250); near(a.avgMid, 10125);
  near(lev(Object.assign(wk(4), { lmin: 3, lmax: 5, ltMid: false, lavg: 4, rolFrom: 'given', rol: 4750, roq: 5000 })).max, 7650);
  near(lev(Object.assign(wk(6), { lmin: 2, lmax: 4, ltMid: false, lavg: 3, roq: 10000 })).rol, 5400);
  near(lev(Object.assign(wk(6), { lmin: 2, lmax: 4, ltMid: false, lavg: 3, roq: 10000, rolFrom: 'safety', safety: 2000 })).rol, 5600);
});
test('Levels: SM Case Scenario 1 — perishable A (10 days): maximum 12,000 kg, the lower of 16,200 and 10 days\' usage; minimum 600 kg', () => {
  const s = lev({ umin: 1200, uavg: 1200, umax: 1200, lmin: 1, lmax: 2, roq: 15000, shelf: 10 });
  near(s.rol, 2400); near(s.maxF, 16200); near(s.cap, 12000); near(s.max, 12000); assert.ok(s.capped); near(s.min, 600);
});

/* ================================================================ stock levels: ICAI Suggested Answers */
test('Levels: PYQ May 2024 Q1(a)(ii) — re-order level = safety stock 6,500 + 1,000 × 45 = 51,500', () => {
  near(lev({ umin: 1000, uavg: 1000, umax: 1000, lmin: 45, lmax: 45, rolFrom: 'safety', safety: 6500, roq: 6000 }).rol, 51500);
});
test('Levels: PYQ Jan 2025 Q1(c) — minimum usage 16,000 a day and lead time 5–9 days give the stated ROL 1,80,000 and maximum 1,90,000', () => {
  const s = lev({ umin: 16000, uavg: 18000, umax: 20000, lmin: 5, lmax: 9, roq: 90000 });
  near(s.rol, 180000); near(s.max, 190000);
});
test('Levels: RTP Sep 2026 Q5 — 30–50 kg a day, 5–9 days: ROL 450, max 946, min 170, average 558 (EOQ 646)', () => {
  const s = lev({ ubasis: 'minmax', umin: 30, umax: 50, lmin: 5, lmax: 9, roqFrom: 'eoq', A: 14600, O: 200, price: 100, pct: 12, rup: 2, roundQ: true, avgF: 'mid' });
  near(s.uavg, 40); near(s.roq, 646); near(s.rol, 450); near(s.max, 946); near(s.min, 170); near(s.avg, 558);
});
test('Levels: MTP Sep 2025 Series II Q3(a) — average 50, maximum 70 (minimum 30), 4–8 days, ROQ 1,000: ROL 560, max 1,440, min 260', () => {
  const s = lev({ ubasis: 'avgmax', uavg: 50, umax: 70, lmin: 4, lmax: 8, roq: 1000 });
  near(s.umin, 30); near(s.rol, 560); near(s.max, 1440); near(s.min, 260);
});
test('Levels: MTP Sep 2026 Series I MCQs — ROL 676, ROQ 1,154: maximum 1,690 and minimum 318 (approx.)', () => {
  const s = lev({ ubasis: 'avgmax', uavg: 71.57, umax: 96.57, lmin: 3, lmax: 7, roq: 1154 });
  near(s.umin, 46.57, 1e-9); near(s.rol, 676, 0.5); near(s.max, 1690, 0.5); near(s.min, 318, 0.5);
});
test('Levels: RTP Sep 2025 Q7 — minimum 12, average 62, maximum 112 kg a day, 4–8 days: ROL 896, max 2,848 (EOQ) or 5,848 (ROQ), min 524', () => {
  const base = { umin: 12, uavg: 62, umax: 112, lmin: 4, lmax: 8 };
  const s = lev(Object.assign({ roqFrom: 'eoq', A: 20000, O: 500, price: 20, pct: 25, rup: 0, roundQ: true }, base));
  near(s.rol, 896); near(s.max, 2848); near(s.min, 524);
  near(lev(Object.assign({ roq: 5000 }, base)).max, 5848);
});

/* ================================================================ identities and brute force on random inputs */
test('EOQ identities on 2,000 random cases: ordering = carrying at the EOQ, relevant cost √(2AOC), and no whole order size is cheaper', () => {
  const r = lcg(11);
  for (let k = 0; k < 2000; k++) {
    const A = 100 + Math.floor(r() * 20000), O = 1 + Math.floor(r() * 2000), C = 0.1 + r() * 40;
    const Q = E.eoq(A, O, C), P = E.policy(A, O, 0, C, Q, false);
    near(P.ordering, P.carrying, 1e-6 * P.relevant); near(P.relevant, Math.sqrt(2 * A * O * C), 1e-6 * P.relevant);
    if (k < 200) { let best = Infinity, at = 0; for (let q = 1; q <= Math.ceil(3 * Q); q++) { const c = A / q * O + q / 2 * C; if (c < best) { best = c; at = q; } } assert.ok(Math.abs(at - Q) < 1, `#${k}: brute-force best ${at}, EOQ ${Q}`); }
  }
});
test('Levels: a simulation with random daily usage and lead times never runs out and never passes the maximum level (ROL = max × max)', () => {
  const r = lcg(5);
  for (let k = 0; k < 400; k++) {
    const umin = Math.floor(r() * 50), umax = umin + Math.floor(r() * 50), uavg = (umin + umax) / 2, lmin = 1 + Math.floor(r() * 5), lmax = lmin + Math.floor(r() * 6);
    const roq = umax * lmax + 1 + Math.floor(r() * 500), s = E.levels({ umin, uavg, umax, lmin, lavg: (lmin + lmax) / 2, lmax, roq, rolFrom: 'max' });
    for (let c = 0; c < 20; c++) {                                 // one order cycle: the order goes out at the ROL, usage varies day by day
      const LT = lmin + Math.floor(r() * (lmax - lmin + 1)); let stock = s.rol;
      for (let d = 0; d < LT; d++) stock -= umin + Math.floor(r() * (umax - umin + 1));
      assert.ok(stock >= -1e-9, `#${k}: stock-out ${stock}`);
      assert.ok(stock + roq <= s.max + 1e-9, `#${k}: peak ${stock + roq} above the maximum ${s.max}`);
    }
    near(s.rol - umax * lmax, 0); near(s.max, s.rol - umin * lmin + roq);
  }
});
test('Levels: over a normal cycle the stock averages minimum + ½ ROQ (the sawtooth\'s middle), checked by summing the chart', () => {
  const r = lcg(9);
  for (let k = 0; k < 200; k++) {
    const uavg = 5 + Math.floor(r() * 100), lmin = 1 + Math.floor(r() * 4), lmax = lmin + 2 * Math.floor(r() * 3), roq = 10 + Math.floor(r() * 2000);
    const s = E.levels({ umin: uavg / 2, uavg, umax: uavg * 1.5, lmin, lavg: (lmin + lmax) / 2, lmax, roq, rolFrom: 'max' });
    const T = roq / uavg, N = 4000; let area = 0;
    for (let i = 0; i < N; i++) area += (s.min + roq - uavg * ((i + 0.5) / N) * T) * (T / N);
    near(area / T, s.avgHalf, 1e-6 * s.avgHalf + 1e-9);
  }
});

/* ================================================================ the lab as the app runs it */
test('every example and every mode computes, draws every frame without a diagram error, and keeps its tiles readable', () => {
  const sets = [L._defaults(def)].concat(def.presets.map(p => Object.assign(L._defaults(def), p.values)), ['eoq', 'discount', 'levels'].map(m => Object.assign(L._defaults(def), { mode: m })));
  for (const v of sets) {
    const res = def.compute(L.prepare(def, v));
    assert.ok(res.frames.length >= 3 && res.frames.length <= 120, `${v.mode}: ${res.frames.length} frames`);
    res.frames.forEach((f, i) => {
      assert.ok(f.caption && f.caption.length > 20, `${v.mode} frame ${i} caption`);
      assert.doesNotMatch(f.caption, /NaN|undefined|Infinity/, `${v.mode} frame ${i}: ${f.caption}`);
      (f.view || []).forEach(sp => { const html = diagram.render(sp); assert.ok(html && !/Diagram error|NaN/.test(html), `${v.mode} frame ${i} ${sp.type}`); });
    });
    assert.ok(res.stats.length >= 3 && res.stats.length <= 6);
    res.stats.forEach(s => assert.doesNotMatch(String(s.value), /NaN|undefined|Infinity/, s.label));
  }
});
test('the default Tapri examples: EOQ 6,000 kg saves ₹96,000 against Kesar\'s quarterly 30,000 kg; the 2% deal at 12,000 kg beats 2.5% at 30,000 kg', () => {
  const e = run({ mode: 'eoq' }).sim;
  near(e.eoq, 6000); near(e.saving, 96000);
  const d = run({ mode: 'discount' }).sim;
  assert.equal(d.best.Q, 12000); near(d.best.total, 11833800); near(d.cands.find(c => c.Q === 30000).total, 11852250);
  const l = run({ mode: 'levels' }).sim;
  near(l.rol, 4000); near(l.min, 1600); near(l.max, 8800); near(l.avg, 4600); near(l.danger, 800);
});
test('inputs are forgiving (commas, ₹, spaces) and bad input says what to fix', () => {
  near(run({ mode: 'eoq', A: '1,20,000', O: '₹ 1,500', cmp: 0 }).sim.eoq, 6000);
  near(disc(8000, 200, 400, 20, 0, [[' 4,000 ', ' 4 % '.replace(/\s/g, '')]]).best.Q, 200);
  assert.throws(() => run({ mode: 'eoq', A: 0 }), /annual requirement/i);
  assert.throws(() => run({ mode: 'eoq', O: 0 }), /order/i);
  assert.throws(() => run({ mode: 'eoq', pct: 0, rup: 0 }), /carrying cost must be above/);
  assert.throws(() => run({ mode: 'eoq', A: 'abc' }), /not a number/);
  assert.throws(() => run({ mode: 'discount', tiers: [[30000, '2%'], [12000, '3%']] }), /smallest order size up/);
  assert.throws(() => run({ mode: 'discount', tiers: [[12000, 101]] }), /must lower the price/);
  assert.throws(() => run({ mode: 'discount', tiers: [[12000, '100%']] }), /below 100%/);
  assert.throws(() => run({ mode: 'discount', tiers: [] }), /at least one price break/);
  assert.throws(() => run({ mode: 'levels', umin: 600, uavg: 400, umax: 500 }), /minimum ≤ average ≤ maximum/);
  assert.throws(() => run({ mode: 'levels', ubasis: 'avgmax', uavg: 50, umax: 120 }), /negative minimum/);
  assert.throws(() => run({ mode: 'levels', rolFrom: 'given', rol: 100 }), /below the normal lead-time usage/);
  assert.throws(() => run({ mode: 'levels', roqFrom: 'given', roq: 0 }), /re-order quantity/i);
});
test('Test yourself: 150 problems per mode compute, and each answer is the number the stage shows (the discount winner by a clear margin)', () => {
  for (const mode of ['eoq', 'discount', 'levels']) {
    for (let s = 1; s <= 150; s++) {
      const P = L.problem(def, Object.assign(L._defaults(def), { mode }), s * 104729);
      assert.equal(P.values.mode, mode);
      assert.ok(typeof P.want === 'number' && P.want >= 0 && Number.isFinite(P.want), `${mode}#${s}: ${P.want}`);
      if (mode === 'eoq' && P.values.ask === 'eoq') assert.ok(Number.isInteger(P.want), 'a whole-number EOQ');
      if (mode === 'eoq' && P.values.ask === 'saving') assert.ok(P.want > 0, 'a real saving');
      if (mode === 'discount') { const t = P.result.sim.cands.map(c => c.total).sort((a, b) => a - b); assert.ok(t.length < 2 || t[1] - t[0] >= 50, `${mode}#${s}: near-tie`); }
      const prompt = def.challenge.prompt(P.values, P.result);
      assert.doesNotMatch(prompt, /NaN|undefined/, prompt);
    }
  }
});
