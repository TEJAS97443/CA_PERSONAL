/* Variance Analysis Lab (app/js/labs/variance.js): every formula against the ICAI Study Material's illustrations (Paper 4, ch. 13, July 2024
   edition) and the Suggested Answers of real ICAI papers, then identities and an independent recomputation on thousands of random cases. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const L = require('../app/js/labs/framework.js');
const V = require('../app/js/labs/variance.js');
const { material, labour, voh, foh, compute, def } = V;
const near = (a, b, eps = 0.006) => { if (!(Math.abs(a - b) <= eps)) throw new Error(`expected ${b}, got ${a}`); };
const M = (rows, out, stdOut) => material(rows.map(([name, sq, sp, aq, ap, pq, pp]) => ({ name, sq, sp, aq, ap, pq: pq || 0, pp: pp || 0 })), out, stdOut);
const Lb = (rows, out, stdOut) => labour(rows.map(([name, sh, sr, ah, idle, ar]) => ({ name, sh, sr, ah, idle, ar })), out, stdOut);
const run = vals => compute(L.prepare(def, Object.assign(L._defaults(def), vals)));
const M6 = rows => Object.assign({ mStd: rows.map(r => [r[0], r[1], r[2]]), mAct: rows.map(r => [r[0], r[3], r[4]]) },
  rows.some(r => r[5] > 0) ? { buyGiven: true, mBuy: rows.filter(r => r[5] > 0).map(r => [r[0], r[5], r[6] || 0]) } : {});
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ================================================================ material: Study Material illustrations */
test('SM Illustration 1 (product Z, one material): price ₹9 F, usage ₹5 F, cost ₹14 F', () => {
  const R = M([['Z', 50, 1, 45, 0.8]], 1, 1);
  near(R.price, 9); near(R.usage, 5); near(R.cost, 14); near(R.SC, 50); near(R.AC, 36);
});
test('SM Illustration 2 (NXE, 100 kg for 70 kg): usage ₹20,000 F, price ₹28,000 F, cost ₹48,000 F', () => {
  const R = M([['Material', 100, 1, 280000, 0.9]], 210000, 70);
  near(R.TSQ, 300000); near(R.usage, 20000); near(R.price, 28000); near(R.cost, 48000);
});
test('SM Illustration 3 (40/60 mixture, 10% loss, 182 kg): cost ₹102.22 A, price ₹260 A (A ₹180 F, B ₹440 A), usage ₹157.78 F (A ₹182.22 A, B ₹340 F)', () => {
  const R = M([['A', 40, 20, 90, 18], ['B', 60, 30, 110, 34]], 182, 90);
  near(R.SC, 5257.78); near(R.cost, -102.22); near(R.price, -260); near(R.usage, 157.78);
  near(R.rows[0].price, 180); near(R.rows[1].price, -440); near(R.rows[0].usage, -182.22); near(R.rows[1].usage, 340);
});
test('SM Illustration 4 (ABC Ltd, 15% loss, opening stock at standard price): price ₹376.25 F, usage ₹90 A, yield ₹68 A, mix ₹22 A, cost ₹286.25 F', () => {
  /* AQ = opening 35 + 800 − 5 = 830 kg of A (35 kg at the standard ₹4, 795 at ₹4.25) and 40 + 1,200 − 50 = 1,190 kg of B (40 at ₹3, 1,150 at ₹2.50):
     the actual price is the weighted price of what was used, so the opening stock at standard price carries no price variance */
  const R = M([['A', 40, 4, 830, (35 * 4 + 795 * 4.25) / 830], ['B', 60, 3, 1190, (40 * 3 + 1150 * 2.5) / 1190]], 1700, 85);
  near(R.TSQ, 2000); near(R.rows[0].SQ, 800); near(R.rows[0].RSQ, 808); near(R.rows[1].RSQ, 1212);
  near(R.price, 376.25); near(R.rows[0].price, -198.75); near(R.rows[1].price, 575);
  near(R.usage, -90); near(R.yield, -68); near(R.mix, -22); near(R.cost, 286.25); near(R.AC, 6513.75);
  near(R.scpu, 4);                                                    // working note 3: ₹6,800 ÷ 1,700 kg = ₹4 a kg
  /* on the quantity purchased (SM 13.15's rule; the SM's answer above uses consumption): A 800 kg at ₹4.25, B 1,200 kg at ₹2.50 */
  const P = M([['A', 40, 4, 830, (35 * 4 + 795 * 4.25) / 830, 800, 4.25], ['B', 60, 3, 1190, (40 * 3 + 1150 * 2.5) / 1190, 1200, 2.5]], 1700, 85);
  near(P.price, 376.25); near(P.rows[0].priceBought, -200); near(P.rows[1].priceBought, 600); near(P.priceBought, 400); assert.ok(P.bought);
  near(P.usage, -90); near(P.cost, 286.25);                           // usage and cost are on consumption either way
});
test('SM practical problem 6 (Novell & Co.): bought 20,000 units for ₹88,000, used 19,000: price ₹7,600 A on the quantity used (the SM\'s answer), ₹8,000 A on the quantity bought', () => {
  const R = M([['Material', 10, 4, 19000, 4.4, 20000]], 1800, 1);
  near(R.cost, -11600); near(R.price, -7600); near(R.usage, -4000); near(R.priceBought, -8000); assert.ok(R.bought);
  near(R.priceBought - R.price, (4 - 4.4) * (20000 - 19000));          // the price variance on the stock still in hand
  const d = run(Object.assign({ mode: 'material', out: 1800, stdOut: 1 }, M6([['Material', 10, 4, 19000, 4.4, 20000]])));
  assert.equal(d.stats[1].value, '₹8,000 A', 'purchases entered: the default basis is the quantity purchased (SM 13.15)');
  assert.equal(d.stats[1].label, 'Price variance (on purchases)');
  const c = run(Object.assign({ mode: 'material', out: 1800, stdOut: 1, pvOn: 'bought' }, M6([['Material', 10, 4, 19000, 4.4, 20000]])));
  assert.equal(c.stats[1].value, '₹8,000 A'); assert.match(c.frames[5].caption, /not the cost variance/);
  const u = run(Object.assign({ mode: 'material', out: 1800, stdOut: 1, pvOn: 'used' }, M6([['Material', 10, 4, 19000, 4.4, 20000]])));
  assert.equal(u.stats[1].value, '₹7,600 A'); assert.match(u.frames[5].caption, /The parts add up/);
  assert.match(u.frames[3].caption, /basis of the Study Material's worked answers; SM 13.15 prefers the quantity purchased/);
  const none = run(Object.assign({ mode: 'material', out: 1800, stdOut: 1, pvOn: 'bought' }, M6([['Material', 10, 4, 19000, 4.4]])));
  assert.equal(none.stats[1].value, '₹7,600 A', 'no purchases entered: the basis falls back to the quantity used');
});
test('SM practical problem 13 (J.K. Ltd, 60 batches of 125 kg for 5,600 kg): price ₹3,000 A on consumption (the SM\'s answer), ₹2,200 A on purchases (its note); usage ₹14,500 A', () => {
  const R = M([['A', 62.5, 20, 4500, 21, 5000], ['B', 37.5, 10, 1500, 8, 2000], ['C', 25, 5, 1500, 6, 1200]], 5600, 100);
  near(R.SC, 98000); near(R.AC, 115500); near(R.price, -3000); near(R.usage, -14500); near(R.priceBought, -2200);
  near(R.rows.reduce((s, m) => s + m.RSQ * m.sp, 0), 105000); near(R.mix, -7500); near(R.yield, -7000);
  const p = def.presets.find(x => /J\.K\. Ltd/.test(x.label));
  assert.equal(p.values.pvOn, 'used'); assert.match(p.label, /SM's answer uses consumption/);
  assert.equal(run(p.values).stats[1].value, '₹3,000 A');
  assert.equal(run(Object.assign({}, p.values, { pvOn: 'bought' })).stats[1].value, '₹2,200 A');
});
test('presets that follow the SM answers\' consumption basis select "used" and say so; the purchase-basis twin shows the SM 13.15 rule', () => {
  const cons = def.presets.filter(p => p.values.buyGiven);
  assert.ok(cons.length >= 4);
  cons.forEach(p => {
    if (p.values.pvOn === 'used') assert.match(p.label, /the SM's answer uses consumption/, p.label);
    else assert.match(p.label, /SM 13\.15/, p.label);
  });
  const want = { 'Illustration 4': '₹376.25 F', 'Novell & Co.), bought': '₹7,600 A', 'Novell & Co.) on the quantity purchased': '₹8,000 A' };
  for (const [k, w] of Object.entries(want)) assert.equal(run(def.presets.find(p => p.label.includes(k)).values).stats[1].value, w, k);
  assert.throws(() => run({ mode: 'material', buyGiven: true, mBuy: [['Sugar', 10, 0]] }), /Purchases, row 1: "Sugar"/);
  assert.throws(() => run({ mode: 'material', buyGiven: true, mBuy: [['Tea', 10, 0], ['tea', 5, 0]] }), /twice in the purchases/);
});

/* ================================================================ material: ICAI papers */
test('ICAI PYQ September 2024 Q4(a) (BG company, 1,600 packets): cost ₹10,500 A, price ₹7,500 F, usage ₹18,000 A, mix ₹5,000 A, yield ₹13,000 A', () => {
  const R = M([['A', 4, 50, 7000, 40], ['B', 8, 40, 12500, 45]], 1600, 1);
  near(R.cost, -10500); near(R.price, 7500); near(R.usage, -18000); near(R.mix, -5000); near(R.yield, -13000);
  near(R.rows[0].price, 70000); near(R.rows[1].price, -62500); near(R.rows[0].RSQ, 6500); near(R.rows[1].RSQ, 13000);
  near(R.rows[0].mix, -25000); near(R.rows[1].mix, 20000); near(R.rows[0].yield, -5000); near(R.rows[1].yield, -8000);
});
test('ICAI PYQ May 2026 Q1(b) (EXA Ltd): material usage ₹1,20,000 A, price ₹1,75,000 A at ₹42.50, cost ₹2,95,000 A', () => {
  const R = M([['Raw material', 5, 30, 14000, 42.5]], 2000, 1);
  near(R.usage, -120000); near(R.price, -175000); near(R.cost, -295000);
});

/* ================================================================ labour */
test('SM Illustration 5: rate ₹9,000 F, efficiency ₹5,000 F, cost ₹14,000 F', () => {
  const R = Lb([['Labour', 1000, 50, 900, 0, 40]], 1, 1);
  near(R.rate, 9000); near(R.eff, 5000); near(R.cost, 14000); near(R.idle, 0);
});
test('SM Illustration 6 (EXE, 100 workers, 42-hour week, 5% idle): cost ₹432 F, rate ₹672 F, efficiency ₹1,020 F, idle time ₹1,260 A', () => {
  /* one standard grade at ₹6; the three pay groups enter as their average rate (₹24,528 for 4,200 hours paid) */
  const R = Lb([['Workers', 4, 6, 4200, 210, 24528 / 4200]], 1040, 1);
  near(R.TSH, 4160); near(R.cost, 432); near(R.rate, 672); near(R.eff, 1020); near(R.idle, -1260);
});
test('SM Illustration 7 (NPX Ltd, 10,000 units): cost ₹83,500 A, rate ₹59,500 A, efficiency ₹15,800 A, idle ₹8,200 A, mix ₹11,500 F, yield ₹27,300 A; part (b) rate ₹52,000 A', () => {
  const rows = [['Skilled', 2, 6, 18000, 500, 7], ['Semi-skilled', 3, 4, 33000, 700, 3.5], ['Unskilled', 5, 3, 58000, 800, 4]];
  const R = Lb(rows, 10000, 1);
  near(R.cost, -83500); near(R.rate, -59500); near(R.eff, -15800); near(R.idle, -8200); near(R.mix, 11500); near(R.yield, -27300);
  assert.deepEqual(R.rows.map(x => Math.round(x.cost)), [-6000, 4500, -82000]);
  assert.deepEqual(R.rows.map(x => Math.round(x.mix)), [23400, -800, -11100]);
  const b = Lb([['Skilled', 2, 6, 18000, 500, (5000 * 5.5 + 13000 * 7) / 18000]].concat(rows.slice(1)), 10000, 1);   // 5,000 hours at ₹5.50, the rest at ₹7
  near(b.rows[0].rate, -10500); near(b.rate, -52000);
});
test('SM Illustration 8 (gang of 32 : 12 : 6, 1,800 standard hours produced): cost ₹2,424 A, rate ₹2,000 A, efficiency ₹424 A, mix ₹80 F, yield ₹504 A', () => {
  const R = Lb([['Skilled', 32, 3, 1120, 0, 4], ['Semi-skilled', 12, 2, 720, 0, 3], ['Unskilled', 6, 1, 160, 0, 2]], 1800, 50);
  assert.deepEqual(R.rows.map(x => x.SH), [1152, 432, 216]); assert.deepEqual(R.rows.map(x => x.RSH), [1280, 480, 240]);
  near(R.cost, -2424); near(R.rate, -2000); near(R.eff, -424); near(R.mix, 80); near(R.yield, -504);
});
test('ICAI PYQ September 2024 Q4(a) (BG company): labour cost ₹38,000 A, rate ₹30,000 A, efficiency ₹2,000 F, idle time ₹10,000 A', () => {
  /* skilled 6,000 h at ₹25 and semi-skilled 4,000 h at ₹20 against one standard grade at ₹20: entered as 10,000 h at the average ₹23 */
  const R = Lb([['Workers', 6, 20, 10000, 500, 23]], 1600, 1);
  near(R.cost, -38000); near(R.rate, -30000); near(R.eff, 2000); near(R.idle, -10000);
});
test('ICAI PYQ May 2026 Q1(b) (EXA Ltd): labour rate ₹24,000 A, efficiency ₹50,000 A', () => {
  const R = Lb([['Labour', 2.5, 50, 6000, 0, 324000 / 6000]], 2000, 1);
  near(R.rate, -24000); near(R.eff, -50000); near(R.cost, -74000);
});
test('ICAI MTP May 2025 Series I Q2 (labour weeks): cost ₹1,04,000 A, rate ₹51,200 A, efficiency ₹52,800 A, mix ₹76,800 F, revised efficiency ₹1,29,600 A', () => {
  const R = Lb([['Skilled', 9000, 120, 8960, 0, 140], ['Semi-skilled', 5400, 80, 3840, 0, 100], ['Unskilled', 7200, 60, 10240, 0, 40]], 1, 1);
  near(R.cost, -104000); near(R.rate, -51200); near(R.eff, -52800); near(R.mix, 76800); near(R.yield, -129600);
  near(R.rows[2].eff, -182400);                                       // the MCQ's answer: unskilled efficiency ₹1,82,400 A
  assert.deepEqual(R.rows.map(x => x.RSH), [9600, 5760, 7680]);
});

/* ================================================================ overheads */
test('SM Illustration 9 (G Ltd): VOH cost ₹4,000 A, expenditure ₹6,000 A, efficiency ₹2,000 F', () => {
  const R = voh({ budOut: 6000, budHrs: 12000, bud: 120000, out: 5900, actHrs: 11600, act: 122000 });
  near(R.SRh, 10); near(R.SRu, 20); near(R.cost, -4000); near(R.exp, -6000); near(R.eff, 2000);
});
test('SM Illustration 13: VOH ₹6,000 A = ₹3,000 A + ₹3,000 A; FOH cost ₹10,000 A, expenditure ₹10,000 F, volume ₹20,000 A, efficiency ₹10,000 A, capacity ₹30,000 A, calendar ₹20,000 F', () => {
  const v = voh({ budOut: 4000, budHrs: 8000, bud: 120000, out: 3800, actHrs: 7800, act: 120000 });
  near(v.cost, -6000); near(v.exp, -3000); near(v.eff, -3000);
  const f = foh({ bud: 400000, budOut: 4000, budHrs: 8000, budDays: 20, act: 390000, out: 3800, actHrs: 7800, actDays: 21 });
  near(f.cost, -10000); near(f.exp, 10000); near(f.vol, -20000); near(f.eff, -10000); near(f.RBH, 8400); near(f.cap, -30000); near(f.cal, 20000);
});
test('SM Illustration 10 (J&G Ltd, no days): cost nil, expenditure ₹60,000 A, volume ₹60,000 F, efficiency ₹40,000 A, capacity ₹1,00,000 F', () => {
  const f = foh({ bud: 1500000, budOut: 7500, budHrs: 15000, budDays: 0, act: 1560000, out: 7800, actHrs: 16000, actDays: 0 });
  near(f.cost, 0); near(f.exp, -60000); near(f.vol, 60000); near(f.eff, -40000); near(f.cap, 100000); assert.equal(f.cal, undefined);
  assert.equal(V.fv(f.cost), 'Nil');
});
test('SM Illustration 11 (120 machines × 8 h × 25 days; 24 days of 840 machine hours): efficiency ₹6,360 F, capacity ₹17,280 A, calendar ₹5,760 A, expenditure ₹2,000 F, volume ₹16,680 A, total ₹14,680 A', () => {
  const f = foh({ bud: 144000, budOut: 6000, budHrs: 24000, budDays: 25, act: 142000, out: 5305, actHrs: 20160, actDays: 24 });
  near(f.SRh, 6); near(f.SRu, 24); near(f.SRd, 5760); near(f.SH, 21220); near(f.RBH, 23040);
  near(f.eff, 6360); near(f.cap, -17280); near(f.cal, -5760); near(f.exp, 2000); near(f.vol, -16680); near(f.cost, -14680);
});
test('SM Illustration 12 (per-unit rates, no hours): FOH volume ₹3,00,000 A and expenditure ₹4,00,000 A', () => {
  /* fixed ₹3,000 a unit at a capacity of 200; actual total overheads ₹11,50,000 less variable ₹1,500 × 100 units */
  const f = foh({ bud: 3000 * 200, budOut: 200, budHrs: 0, budDays: 0, act: 1150000 - 1500 * 100, out: 100, actHrs: 0, actDays: 0 });
  near(f.vol, -300000); near(f.exp, -400000); near(f.cost, -700000); assert.equal(f.eff, undefined);
});
test('ICAI PYQ May 2025 Q4(b) (no hours, 27 days against 25): VOH ₹720 A; FOH ₹1,200 A, expenditure ₹1,200 F, volume ₹2,400 A, calendar ₹3,840 F', () => {
  const v = voh({ budOut: 4800, budHrs: 0, bud: 14400, out: 4560, actHrs: 0, act: 14400 });
  near(v.cost, -720); assert.equal(v.exp, undefined);
  const f = foh({ bud: 48000, budOut: 4800, budHrs: 0, budDays: 25, act: 46800, out: 4560, actHrs: 0, actDays: 27 });
  near(f.cost, -1200); near(f.exp, 1200); near(f.vol, -2400); near(f.cal, 3840); near(f.rest, -6240); near(f.cal + f.rest, f.vol);
});
test('ICAI PYQ May 2026 Q3(b) (Alpha Ltd, 25 × 12,000 h budgeted, 28 × 12,500 h at 0.9 a hour): expenditure ₹24,000 A, volume ₹30,000 F, calendar ₹72,000 F, cost ₹6,000 F', () => {
  const f = foh({ bud: 600000, budOut: 300000, budHrs: 300000, budDays: 25, act: 624000, out: 350000 * 0.9, actHrs: 350000, actDays: 28 });
  near(f.out, 315000); near(f.SRu, 2); near(f.SRd, 24000);
  near(f.exp, -24000); near(f.vol, 30000); near(f.cal, 72000); near(f.cost, 6000);
  near(f.eff + f.cap + f.cal, f.vol);                                 // the paper stops at the volume variance; the lab's split still closes
});

/* ================================================================ the lab: presets, frames, total mode */
test('every preset computes, cites its source plainly, and the ICAI ones reproduce the Suggested Answers on the stage', () => {
  const want = {
    'PYQ September 2024, Q4(a) (BG company): materials': ['₹10,500 A', '₹7,500 F', '₹18,000 A', '₹5,000 A', '₹13,000 A'],
    'PYQ September 2024, Q4(a) (BG company): labour': ['₹38,000 A', '₹30,000 A', '₹10,000 A', '₹2,000 F'],
    'PYQ May 2026, Q1(b) (EXA Ltd): material': ['₹2,95,000 A', '₹1,75,000 A', '₹1,20,000 A'],
    'MTP May 2025 Series I, Q2': ['₹1,04,000 A', '₹51,200 A', 'Nil', '₹52,800 A', '₹76,800 F', '₹1,29,600 A'],
    'PYQ May 2026, Q3(b)': ['₹6,000 F', '₹24,000 A', '₹30,000 F'],
    'PYQ May 2025, Q4(b): fixed': ['₹1,200 A', '₹1,200 F', '₹2,400 A', '₹3,840 F'],
    'PYQ May 2025, Q4(b): variable': ['₹720 A']
  };
  assert.ok(def.presets.length >= 3);
  assert.ok(def.presets.filter(p => /ICAI (PYQ|RTP|MTP)/.test(p.label)).length >= 2, 'at least two real ICAI questions');
  for (const p of def.presets) {
    const r = run(p.values);
    assert.ok(r.frames.length >= 2 && r.frames.length <= 120, p.label);
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 20, `${p.label} frame ${i}`); assert.ok(Array.isArray(f.view) && f.view.length, `${p.label} frame ${i} view`); });
    assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(r.frames) + JSON.stringify(r.stats)), p.label);
    const k = Object.keys(want).find(x => p.label.includes(x));
    if (k) { const got = r.stats.map(s => s.value); want[k].forEach((w, i) => assert.equal(got[i], w, `${p.label}: tile ${i}`)); }
    assert.ok(!/→\s*₹?[\d,.]+\s*[AF]?\s*$/.test(p.label), 'a label never states its result');
  }
});
test('the tree grows one branch a frame and every drawn node is coloured by its sign (F green, A rose, nil grey)', () => {
  const r = run({ mode: 'material' });
  const count = f => { const t = f.view.find(x => x.type === 'tree'); if (!t) return 0; let n = 0; (function walk(x) { n++; (x.children || []).forEach(walk); })(t.root); return n; };
  assert.deepEqual(r.frames.map(count), [0, 0, 1, 2, 3, 3, 3, 4, 5, 5]);
  const t = r.frames[r.frames.length - 1].view[0].root;
  assert.equal(t.color, 'bad'); assert.equal(t.children[0].color, 'ok'); assert.match(t.children[0].label, /₹33,000 F/);
  assert.match(t.children[1].children[1].label, /Yield\n₹72,000 A/);
  assert.match(r.frames[r.frames.length - 1].caption, /The parts add up to the parent/);
  const lab = run({ mode: 'labour' });
  assert.match(lab.frames[lab.frames.length - 1].caption, /mix \+ yield = ₹720 A \+ ₹3,420 F = \*\*₹2,700 F\*\*/);
});
test('total mode: the Tapri reconciliation adds the adverse variances, deducts the favourable ones and lands on the actual cost', () => {
  const r = run({ mode: 'total' }), T = r.sim.T;
  near(T.SC, 5037600); near(T.AC, 5125124); near(T.total, -87524);
  near(T.leaves.reduce((s, x) => s + x[1], 0), T.total);
  const last = r.frames[r.frames.length - 1], rec = last.view.find(x => x.type === 'table');
  assert.equal(rec.rows[rec.rows.length - 1][2], '**51,25,124**');
  assert.match(last.caption, /The statement closes/);
  assert.equal(r.stats[0].value, '₹87,524 A');
});
test('labour: idle time is adverse and on standard rate; hours paid drive the rate variance, hours worked the efficiency variance', () => {
  const R = Lb([['X', 1, 10, 120, 20, 12]], 100, 1);
  near(R.idle, -200); near(R.rate, -240); near(R.eff, 0); near(R.cost, 1000 - 1440);
});
test('bad inputs fail with plain messages', () => {
  assert.throws(() => M([['A', 1, 1, 1, 1]], 0, 1), /actual output/);
  assert.throws(() => M([['A', 1, 1, 1, 1]], 10, 0), /standard mix/);
  assert.throws(() => M([], 10, 1), /at least one material/);
  assert.throws(() => M([['A', 0, 5, 1, 1]], 10, 1), /standard quantity/);
  assert.throws(() => M([['A', 1, 1, 1, 1], ['a', 1, 1, 1, 1]], 10, 1), /different name/);
  assert.throws(() => Lb([['S', 2, 5, 10, 11, 5]], 10, 1), /idle hours/);
  assert.throws(() => Lb([['S', 0, 5, 10, 0, 5]], 10, 1), /standard hours/);
  assert.throws(() => voh({ budOut: 0, budHrs: 1, bud: 1, out: 1, actHrs: 1, act: 1 }), /budgeted output/);
  assert.throws(() => foh({ bud: 0, budOut: 1, budHrs: 0, budDays: 0, act: 1, out: 1 }), /budgeted fixed overheads/);
  assert.throws(() => foh({ bud: 10, budOut: 1, budHrs: 0, budDays: 25, act: 1, out: 1, actDays: 0 }), /actual working days/);
  assert.throws(() => run({ mode: 'material', mStd: [], mAct: [] }), /material/);
});

/* ================================================================ identities and an independent recomputation on random inputs */
test('random cases (3,000): price + usage = cost, mix + yield = usage, the output-basis yield agrees, labour and overhead splits close', () => {
  const r = lcg(20261020);
  const R = (a, b) => a + r() * (b - a), I = (a, b) => Math.floor(R(a, b + 1));
  for (let k = 0; k < 3000; k++) {
    const n = I(1, 4), out = R(1, 5000), stdOut = R(0.5, 200);
    const mat = Array.from({ length: n }, (_, i) => ['m' + i, R(0, 50) + (i === 0 ? 1 : 0), R(0.5, 100), R(0, 3000), R(0, 120), r() < 0.3 ? R(0, 3000) : 0, r() < 0.5 ? R(0, 120) : 0]);
    const A = M(mat, out, stdOut);
    near(A.price + A.usage, A.cost, 1e-6 * (1 + Math.abs(A.SC) + Math.abs(A.AC)));
    near(A.mix + A.yield, A.usage, 1e-6 * (1 + Math.abs(A.SC)));
    near(A.yieldOut, A.yield, 1e-6 * (1 + Math.abs(A.SC)));
    /* independent: the "standard cost of …" forms of the Study Material (13.15 – 13.17) built from column totals */
    const stdCostAQ = A.rows.reduce((s, m) => s + m.aq * m.sp, 0), stdCostRSQ = A.rows.reduce((s, m) => s + (A.TAQ * m.sq / A.sumStd) * m.sp, 0);
    near(A.price, stdCostAQ - A.AC, 1e-6 * (1 + A.AC)); near(A.usage, A.SC - stdCostAQ, 1e-6 * (1 + A.SC));
    near(A.mix, stdCostRSQ - stdCostAQ, 1e-6 * (1 + A.SC)); near(A.yield, A.SC - stdCostRSQ, 1e-6 * (1 + A.SC));
    near(A.priceBought, A.rows.reduce((s, m, i) => { const pq = mat[i][5], pp = pq > 0 && mat[i][6] > 0 ? mat[i][6] : m.ap; return s + (m.sp - pp) * (pq > 0 ? pq : m.aq); }, 0), 1e-6 * (1 + A.AC + A.rows.reduce((s, m) => s + m.PQ * m.sp, 0)));
    if (!A.bought) near(A.priceBought, A.price, 1e-9 * (1 + A.AC));      // no purchases entered: both bases agree
    if (n === 1) near(A.mix, 0, 1e-6 * (1 + A.SC));                       // one material: no mix
    const g = I(1, 4), lab = Array.from({ length: g }, (_, i) => { const ah = R(0, 2000); return ['g' + i, R(0, 20) + (i === 0 ? 0.5 : 0), R(1, 300), ah, r() < 0.5 ? R(0, ah) : 0, R(0, 320)]; });
    const B = Lb(lab, out, stdOut);
    near(B.rate + B.idle + B.eff, B.cost, 1e-6 * (1 + B.SC + B.AC)); near(B.mix + B.yield, B.eff, 1e-6 * (1 + B.SC));
    near(B.eff, B.SC - B.rows.reduce((s, x) => s + x.AW * x.sr, 0), 1e-6 * (1 + B.SC));
    assert.ok(B.idle <= 1e-9);
    const budOut = R(10, 1e5), budHrs = r() < 0.2 ? 0 : R(10, 1e5), budDays = r() < 0.3 ? 0 : I(1, 31), o = { budOut, budHrs, out, actHrs: R(0, 1e5) };
    const Vv = voh(Object.assign({ bud: R(0, 1e6), act: R(0, 1e6) }, o));
    if (Vv.hours) near(Vv.exp + Vv.eff, Vv.cost, 1e-6 * (1 + Vv.bud + Vv.act + Vv.absorbed));
    const Fx = foh(Object.assign({ bud: R(1, 1e6), act: R(0, 1e6), budDays, actDays: budDays ? I(1, 31) : 0 }, o));
    const tol = 1e-6 * (1 + Fx.bud + Fx.act + Fx.absorbed);
    near(Fx.exp + Fx.vol, Fx.cost, tol);
    if (Fx.hours) near(Fx.eff + Fx.cap + (Fx.days ? Fx.cal : 0), Fx.vol, tol);
    else if (Fx.days) near(Fx.cal + Fx.rest, Fx.vol, tol);
    if (Fx.hours && Fx.days) near(Fx.SRh * Fx.RBH, Fx.possible, tol);       // revised budgeted hours at the hourly rate = the budget for the actual days
  }
});
test('random total-cost cases (500): the leaves of the tree add up to the total and the reconciliation closes', () => {
  for (let s = 1; s <= 500; s++) {
    const v = Object.assign(L._defaults(def), { mode: 'total' });
    const P = L.problem(def, v, s * 104729);
    const T = P.result.sim.T;
    near(T.leaves.reduce((a, x) => a + x[1], 0), T.total, 1e-6 * (1 + T.SC));
    near(T.SC - T.AC, T.total, 1e-6 * (1 + T.SC));
    assert.match(P.result.frames[P.result.frames.length - 1].caption, /The statement closes/);
  }
});

/* ================================================================ the challenge */
test('challenge: 200 problems per mode build, ask a variance of that mode, and have a whole-rupee answer read from the same result', () => {
  for (const [mode] of def.controls[0].options) {
    for (let s = 1; s <= 200; s++) {
      const P = L.problem(def, Object.assign(L._defaults(def), { mode }), s * 7919);
      assert.equal(P.values.mode, mode);
      const w = P.want;
      assert.ok(typeof w === 'number' && Number.isFinite(w), `${mode}#${s}`);
      assert.ok(Math.abs(w - Math.round(w)) < 1e-6, `${mode}#${s}: ${w} is not whole rupees`);
      const prompt = def.challenge.prompt(P.values, P.result);
      assert.match(prompt, /variance/); assert.match(prompt, /minus sign/);
      const spec = L.answerSpec(def, P.values, P.result, w);
      assert.equal(spec.kind, 'signed');
      assert.ok(L.check(spec, String(Math.round(w)), w).ok);
      assert.ok(def.challenge.explain(P.result, P.values).length > 20);
      const view = def.challenge.view(P.result, P.values);
      assert.ok(view.length >= 1 && view.every(x => x.type === 'table'), 'the test state shows the given data only');
    }
  }
});
test('inputs: the actual table is matched to the standard by name; a standard material not used has AQ 0, an extra one has SQ 0; names may not repeat', () => {
  const r = run({ mode: 'material', out: 100, stdOut: 1, mStd: [['A', 1, 10], ['B', 1, 5]], mAct: [[' b ', 90, 6, 0], ['C', 10, 3, 0]] });
  const R = r.sim.M;
  assert.deepEqual(R.rows.map(m => [m.name, m.sq, m.aq]), [['A', 1, 0], ['B', 1, 90], ['C', 0, 10]]);
  near(R.rows[0].usage, 1000); near(R.rows[2].price, -30); near(R.rows[2].usage, 0); near(R.rows[2].RSQ, 0);   // no standard price for C: all of its cost is price variance
  near(R.price + R.usage, R.cost);
  assert.throws(() => run({ mode: 'material', mStd: [['A', 1, 1], ['a', 1, 1]] }), /twice in the standard/);
  assert.throws(() => run({ mode: 'labour', lAct: [['X', 1, 0, 1], ['x', 1, 0, 1]] }), /twice in the actual/);
});
