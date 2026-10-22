/* Audit Risk and Materiality Lab (app/js/labs/audit-risk.js): the Study Material's model and examples (Paper 5, Ch 3 §1–2, §16; Ch 7 §3),
   real ICAI questions with their Suggested Answers, and invariants on random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const A = require('../app/js/labs/audit-risk.js');
const { riskModel, withEvent, illustrativeDR, materiality, compute, def, EVENTS, DRG, LV } = A;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const V = over => Object.assign(L._defaults(def), over);
const drawAll = res => res.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 20, `frame ${i} has a caption`); f.view.forEach(x => { if (x.html == null) diagram.render(x); }); });

/* ---------------------------------------------------------------- the model (Study Material pp. 3.4–3.10) */
test('audit-risk: RoMM combines inherent and control risk; the acceptable detection risk is its inverse (SM p. 3.10: AR = RoMM × DR)', () => {
  assert.equal(riskModel('high', 'high').romm, 'Very high');
  assert.equal(riskModel('high', 'high').dr, 'Lowest');
  assert.equal(riskModel('low', 'low').dr, 'Highest');
  assert.equal(riskModel('moderate', 'moderate').dr, 'Medium');
  /* the classic grid: rows IR high / moderate / low, columns CR high / moderate / low */
  const want = { high: ['Lowest', 'Lower', 'Medium'], moderate: ['Lower', 'Medium', 'Higher'], low: ['Medium', 'Higher', 'Highest'] };
  for (const ir of LV) assert.deepEqual(['high', 'moderate', 'low'].map(cr => riskModel(ir, cr).dr), want[ir], ir);
});
test('audit-risk: raising either inherent or control risk never raises the acceptable detection risk, and always adds work (monotone grid)', () => {
  const rank = x => DRG.indexOf(x);
  for (const ir of LV) for (const cr of LV) {
    const m = riskModel(ir, cr);
    if (ir !== 'high') assert.ok(rank(riskModel(LV[LV.indexOf(ir) + 1], cr).dr) > rank(m.dr), `IR up from ${ir}`);
    if (cr !== 'high') assert.ok(rank(riskModel(ir, LV[LV.indexOf(cr) + 1]).dr) > rank(m.dr), `CR up from ${cr}`);
  }
});
test('audit-risk: the illustrative percentages agree with the grid: the same rank gives the same detection risk, and AR = IR × CR × DR = 5%', () => {
  const byRank = {};
  for (const ir of LV) for (const cr of LV) {
    const m = riskModel(ir, cr);
    approx((m.irPct * m.crPct * m.drPct) / 10000, 5, 1e-9);
    if (byRank[m.rank] != null) approx(m.drPct, byRank[m.rank]); else byRank[m.rank] = m.drPct;
  }
  assert.deepEqual([0, 1, 2, 3, 4].map(k => byRank[k]), [80, 40, 20, 10, 5]);
});
test('audit-risk: AR = IR × CR × DR solved for DR (SM p. 3.10), and the identity holds on 3,000 random inputs', () => {
  const x = illustrativeDR(5, 100, 50);
  approx(x.romm, 50); approx(x.dr, 10);
  approx(illustrativeDR(5, 80, 50).dr, 12.5);
  approx(illustrativeDR(5, 80, 80).dr, 7.8125);
  assert.ok(illustrativeDR(10, 20, 25).capped, 'RoMM 5% is below a 10% target: any detection risk will do');
  const r = lcg(7);
  for (let k = 0; k < 3000; k++) {
    const ar = 0.5 + r() * 9.5, ir = 1 + r() * 99, cr = 1 + r() * 99, d = illustrativeDR(ar, ir, cr);
    if (!d.capped) approx((ir * cr * d.dr) / 10000, ar, 1e-9);
    else assert.ok((ir * cr) / 100 < ar && d.dr === 100);
    const d2 = illustrativeDR(ar, ir, Math.min(100, cr + 5));
    assert.ok(d2.dr <= d.dr + 1e-12, 'more control risk, never more acceptable detection risk');
  }
});

/* ---------------------------------------------------------------- real ICAI questions */
test('audit-risk: MTP Sep 2024 Series I, Q1(b) (CA Tina, GP ratio 14% → 24%): RoMM high, so detection risk is kept LOW, not high (Suggested Answer)', () => {
  const p = def.presets.find(x => /MTP Sep 2024 Series I, Q1\(b\)/.test(x.label));
  const res = compute(V(p.values)), m = res.sim.after;
  assert.equal(m.romm, 'High');
  assert.ok(DRG.indexOf(m.dr) > DRG.indexOf('Medium'), 'below medium: "detection risk has to be kept at low level"');
  assert.match(res.frames[res.frames.length - 1].caption, /more persuasive evidence/);
});
test('audit-risk: MTP May 2024 Series I, general MCQ 1 (NGO, foreign funding, untrained finance head): audit risk high, key (c)', () => {
  const p = def.presets.find(x => /MTP May 2024 Series I, MCQ 1/.test(x.label));
  const m = compute(V(p.values)).sim.after;
  assert.equal(m.romm, 'Very high'); assert.equal(m.dr, 'Lowest'); assert.equal(m.work, 'Most');
});
test('audit-risk: the component of risk in each ICAI case matches the Suggested Answers', () => {
  /* MTP May 2025 Series II, Q1(a): (i) stubble start-up -> inherent risk, (ii) sensors -> control risk, (iii) revenue procedures -> detection risk;
     MTP Jan 2026 Series II, Q11 (unauthorised access to the inventory system) -> (a) control risk;
     MTP May 2025 Series I, Q5 (travel expenses posted by unauthorised staff) -> (c) control risk */
  const want = { stubble: 'ir', sensors: 'cr', sample: 'dr', access: 'cr', travel: 'cr' };
  for (const [id, comp] of Object.entries(want)) assert.equal(EVENTS[id].comp, comp, id);
  for (const id of Object.keys(want)) assert.ok(EVENTS[id].src, `${id} names its source`);
});
test('audit-risk: an inherent or control risk event moves the cell one level and lowers the acceptable detection risk; a detection risk event leaves RoMM alone', () => {
  const e = withEvent('moderate', 'low', 'access');
  assert.equal(e.after.cr, 'moderate'); assert.equal(e.before.dr, 'Higher'); assert.equal(e.after.dr, 'Medium');
  const s = withEvent('moderate', 'moderate', 'stubble');
  assert.equal(s.after.ir, 'high'); assert.equal(s.after.dr, 'Lower');
  const d = withEvent('moderate', 'moderate', 'sample');
  assert.deepEqual([d.after.romm, d.after.dr], [d.before.romm, d.before.dr]);
  const h = withEvent('high', 'low', 'complex');
  assert.equal(h.after.ir, 'high'); assert.equal(h.moved, false, 'already high: stays high');
  const res = compute(V({ mode: 'model', ir: 'moderate', cr: 'moderate', event: 'nocount' })), resp = res.frames[res.frames.length - 1].view[0].rows;
  assert.match(resp[resp.length - 1][1], /count/, 'the detection-risk event names its fix');
  assert.ok(res.table.rows.some(r => r[0] === 'Event' && /Detection risk/.test(r[1])), 'the results table names the component');
});
test('audit-risk: the response follows SA 330 (Study Material pp. 3.66–3.71)', () => {
  const resp = (ir, cr) => { const f = compute(V({ mode: 'model', ir, cr, event: 'none' })).frames; return f[f.length - 1].view[0].rows; };
  const tc = (ir, cr) => resp(ir, cr).find(r => r[0] === 'Tests of controls')[1];
  assert.match(tc('moderate', 'low'), /^Required/, 'reliance on controls means testing them');
  assert.match(tc('moderate', 'high'), /^Not planned/);
  for (const ir of LV) for (const cr of LV) assert.match(resp(ir, cr).find(r => r[0] === 'Substantive procedures')[1], /always some for each material class/);
  const ch = compute(V({ mode: 'model', ir: 'moderate', cr: 'low', event: 'access' })).table.rows;
  assert.deepEqual(ch.find(r => r[0] === 'Acceptable detection risk').slice(0, 2), ['Acceptable detection risk', 'Higher → Medium'], 'the results table shows the move');
});

/* ---------------------------------------------------------------- materiality (SA 320) and misstatements (SA 450) */
test('audit-risk: MTP Sep 2024 Series II, Q6 (Cheap Cost, PBT ₹5 crore at 5%): ₹10 lakh + ₹20 lakh uncorrected are material in aggregate, key (b)', () => {
  const p = def.presets.find(x => /MTP Sep 2024 Series II, Q6/.test(x.label));
  const R = materiality(V(p.values));
  assert.equal(R.M, 2500000);
  assert.ok(R.items.every(x => x.a < R.M), 'each one alone is below materiality');
  assert.equal(R.U, 3000000);
  assert.equal(R.material, true);
  const res = compute(V(p.values));
  assert.match(res.frames[res.frames.length - 1].caption, /material in aggregate/);
  assert.match(res.frames[res.frames.length - 1].caption, /effect on the opinion/, 'key (b): "their effect on opinion should be considered by auditor"');
});
test('audit-risk: RTP Jan 2026, Q3: materiality 5% of ₹15 lakh = ₹75,000, and performance materiality is set below it, key (c)', () => {
  const p = def.presets.find(x => /RTP Jan 2026, Q3/.test(x.label));
  const R = materiality(V(p.values));
  assert.equal(R.M, 75000);
  assert.ok(R.PM < R.M);
  assert.throws(() => materiality(V(Object.assign({}, p.values, { pmPct: 100 }))), /below materiality/, 'performance materiality at or above materiality is refused');
});
test('audit-risk: MTP Sep 2024 Series I, Q7 (Priority Ltd, steady profits, PBT ₹8 crore): the PBT benchmark at 5% gives ₹40 lakh; SM p. 3.21: 1% of revenue for an NPO', () => {
  approx(materiality(V({ mode: 'mat', bench: 'pbt', base: 80000000, pct: A.BENCH.pbt.sm, pmPct: 75, ctPct: 0, mis: [] })).M, 4000000);
  assert.equal(A.BENCH.pbt.sm, 5); assert.equal(A.BENCH.revenue.sm, 1); assert.equal(A.BENCH.expenses.sm, 1);
  approx(materiality(V({ mode: 'mat', bench: 'revenue', base: 1000000000, pct: 1, pmPct: 75, ctPct: 0, mis: [] })).M, 10000000);
});
test('audit-risk: an item material by its nature is material at any size; corrected and clearly trivial items leave the aggregate (SA 450)', () => {
  const p = def.presets.find(x => /Tapri Foundation/.test(x.label));
  const R = materiality(V(p.values));
  assert.equal(R.M, 240000); assert.equal(R.CT, 12000);
  assert.equal(R.items[1].material, true, 'the undisclosed related-party donation');
  assert.equal(R.items[2].status, 'corrected');
  assert.equal(R.U, 130000); assert.equal(R.material, true, 'material by nature although the total is below materiality');
  const t = materiality(V({ mode: 'mat', bench: 'pbt', base: 1e7, pct: 5, pmPct: 75, ctPct: 5, mis: [['Small', 20000, ''], ['Bigger', 100000, '']] }));
  assert.equal(t.items[0].status, 'clearly trivial'); assert.equal(t.U, 100000);
});
test('audit-risk: on 2,000 random cases the aggregate is the sum of the open items and the verdict follows it (invariant)', () => {
  const r = lcg(11);
  for (let k = 0; k < 2000; k++) {
    const n = Math.floor(r() * 6), base = 1e6 + Math.floor(r() * 1e9), pct = 0.5 + Math.floor(r() * 10), pmPct = 50 + Math.floor(r() * 40), ctPct = Math.floor(r() * 10);
    const mis = Array.from({ length: n }, (_, i) => ['m' + i, Math.floor(r() * base * pct / 60), r() < 0.2 ? 'fixed' : r() < 0.12 ? 'nature' : '']);
    const R = materiality({ bench: 'pbt', base, pct, pmPct, ctPct, mis });
    const open = R.items.filter(x => !x.fixed && !(x.a <= R.CT && !x.nature && R.CT > 0));
    assert.equal(R.U, open.reduce((s, x) => s + x.a, 0));
    assert.equal(R.material, open.some(x => x.nature) || R.U >= R.M);
    assert.ok(R.PM < R.M || R.M === 0);
    if (R.items.some(x => !x.fixed && x.a >= R.M)) assert.ok(R.material, 'one item at or over materiality makes the whole material');
  }
});
test('audit-risk: plain-language errors for impossible inputs', () => {
  assert.throws(() => compute(V({ mode: 'mat', base: 0 })), /more than zero/);
  assert.throws(() => compute(V({ mode: 'mat', pct: 0 })), /percentage/);
  assert.throws(() => compute(V({ mode: 'mat', ctPct: 80 })), /clearly trivial/);
  assert.throws(() => compute(V({ mode: 'mat', mis: [['x', 'lots', '']] })), /number of rupees/);
  assert.throws(() => compute(V({ mode: 'mat', mis: [['x', 100, 'maybe']] })), /fixed .* or nature/);
  assert.throws(() => compute(V({ mode: 'numeric', irp: 0 })), /Inherent risk/);
  assert.throws(() => riskModel('very high', 'low'), /low, moderate or high/);
});

/* ---------------------------------------------------------------- the lab as drawn */
test('audit-risk: the defaults and every example compute and draw; every frame has a caption; captions say levels in words', () => {
  for (const v of [L._defaults(def)].concat(def.presets.map(p => V(p.values)))) {
    const res = compute(L.prepare(def, v));
    drawAll(res);
    assert.ok(res.frames.length >= 4 && res.frames.length <= 40);
    assert.ok(res.stats.length >= 3 && res.stats.length <= 6);
  }
  assert.ok(def.presets.length >= 3 && def.presets.some(p => /(MTP|RTP|PYQ) [A-Z][a-z]{2} \d{4}/.test(p.label)), 'at least one example names its ICAI paper');
});
test('audit-risk: materiality frames add one bar per misstatement, then the total', () => {
  const v = V({ mode: 'mat', bench: 'pbt', base: 50000000, pct: 5, pmPct: 75, ctPct: 0, mis: [['a', 1000000, ''], ['b', 2000000, ''], ['c', 500000, 'fixed']] });
  const res = compute(v), bars = f => f.view.filter(x => x.type === 'plot').flatMap(x => x.series.filter(s => s.bars).flatMap(s => s.pts)).length;
  const counts = res.frames.map(bars);
  assert.deepEqual(counts.slice(-4), [1, 2, 3, 4], 'one more bar each step; the last one is the total');
});
test('audit-risk: the challenge answers come from the same compute the stage shows', () => {
  const r = lcg(3), seen = new Set();
  for (let k = 0; k < 300; k++) {
    compute(V({ mode: ['model', 'numeric', 'mat'][k % 3] }));                // Test yourself follows the mode being explored
    const g = def.challenge.gen(r), v = L.prepare(def, V(g)), res = compute(v), want = def.challenge.solve(res, v);
    assert.equal(v.mode, ['model', 'numeric', 'mat'][k % 3]); seen.add(v.mode + (v.ask || '') + (v.event && v.event !== 'none' ? 'ev' : ''));
    if (v.mode === 'mat' && v.ask === 'm') approx(want, (v.base * v.pct) / 100, 0.5);
    if (v.mode === 'mat' && v.ask === 'agg') { assert.ok(Math.abs(res.sim.U - res.sim.M) > 0.05 * res.sim.M, 'never a borderline verdict'); }
    if (v.mode === 'numeric') approx(want, Math.min(100, (v.ar * 10000) / (v.irp * v.crp)), 0.006);
    assert.ok(def.challenge.explain(res, v).length > 10);
  }
  assert.ok(['model', 'modelev', 'numeric', 'matm', 'matagg'].every(x => seen.has(x)), 'every kind of question turns up');
});
