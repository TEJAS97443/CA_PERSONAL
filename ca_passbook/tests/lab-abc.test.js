/* Activity Based Costing Lab (cma.abc): the Study Material's illustrations and practical problems (ICAI SM Paper 4 ch. 5, July 2024
   edition, relevant for January 2027), real ICAI questions with their Suggested Answers, an independent re-computation on random inputs,
   the identities ABC must keep, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/abc.js');
const { compute, presets } = LAB;
const near = (a, b, tol, msg) => { if (!(Math.abs(a - b) <= tol)) throw new Error(`${msg || ''} expected ${b} ± ${tol}, got ${a}`); };
const preset = word => presets.find(p => p.label.indexOf(word) >= 0).values;
const units = r => r.sim.prod.map(p => p.unit);
const totals = r => r.sim.prod.map(p => Math.round(p.total * 100) / 100);
const trad = r => r.sim.trad.prod.map(p => p.unit);
const rates = r => r.sim.act.map(a => a.rate);
const charge = (r, pool, prod) => { const a = r.sim.act.find(x => x.label === pool); return a.charges[r.sim.P.findIndex(p => p.name === prod)]; };
const sum = a => a.reduce((s, x) => s + x, 0);

/* ---------------------------------------------------------------- reading the inputs */
test('abc: product-data rows are recognised by name: money rows, hours, minutes, batch size; drivers per unit, per batch or in total', () => {
  const P = LAB.parseProducts([['A', '4,000'], ['B', '3,000']]);
  const d = LAB.parseData([['Direct material ₹ (3, 4 kg × ₹2)', '6 8'], ['Direct labour ₹', '5 7.50'], ['Direct labour minutes', '30 45'], ['Machine hours', '2 1'], ['Batch size', '1,000 500'], ['Material weight (kg)', '4 6'], ['Set-ups per batch', '2 3']], P);
  assert.deepEqual(d.map(x => x.role), ['dm', 'dl', 'lmin', 'mh', 'batch', null, null]);
  const FF = LAB.facts(P, d);
  assert.deepEqual(FF.F.map(f => [f.dm, f.dl, f.lhTotal, f.mhTotal, f.batches]), [[6, 5, 2000, 8000, 4], [8, 7.5, 2250, 3000, 6]]);
  const kg = LAB.driverOf('Material weight', P, d, FF), su = LAB.driverOf('Set-ups', P, d, FF), b = LAB.driverOf('batches', P, d, FF);
  assert.deepEqual(kg.vol, [16000, 18000]); assert.equal(kg.unit, 'kg');
  assert.deepEqual(su.vol, [8, 18], 'per batch × batches');
  assert.deepEqual(b.vol, [4, 6]);
  assert.equal(LAB.driverOf('support', P, d, FF), null);
  assert.equal(LAB.facts(LAB.parseProducts([['A', '1,050']]), LAB.parseData([['Batch size', '100']], LAB.parseProducts([['A', '1,050']]))).F[0].batches, 11, 'a part batch is still a batch');
});

/* ---------------------------------------------------------------- Study Material */
test('abc: SM Illustration 1 (ABC Ltd): traditional ₹17 per labour hour → 21.50 / 32.25 / 33.00; ABC rates 0.75 / 1,040 / 1.081 → 25.09 / 28.97 / 30.16 and totals 1,00,360 / 86,910 / 48,256', () => {
  const r = compute(preset('SM Illustration 1'));
  assert.equal(r.sim.trad.R, 17); assert.deepEqual(trad(r), [21.5, 32.25, 33]);
  near(rates(r)[0], 0.75, 1e-12); near(rates(r)[1], 1040, 1e-9); near(rates(r)[2], 39150 / 36200, 1e-12, 'electricity ₹1.081 per operation');
  assert.deepEqual(r.sim.act.map(a => a.used), [38800, 30, 36200]);
  assert.deepEqual(units(r), [25.09, 28.97, 30.16]);
  assert.deepEqual(totals(r), [100360, 86910, 48256]);
  near(sum(r.sim.prod.map(p => p.oh)), 99450, 1e-6, 'ABC charges exactly the ₹99,450 of overheads');
});
test('abc: SM Illustration 2 (MST Ltd): rates on capacity ₹4 per kWh and ₹30 per inspection; unused capacity ₹20,000 + ₹30,000', () => {
  const r = compute(preset('SM Illustration 2'));
  assert.deepEqual(rates(r), [4, 30]);
  assert.deepEqual(r.sim.act[0].charges, [40000, 80000, 60000]); assert.deepEqual(r.sim.act[1].charges, [105000, 75000, 90000]);
  assert.deepEqual(r.sim.act.map(a => a.unused), [20000, 30000]);
  assert.ok(r.frames.some(f => /unused capacity/i.test(f.caption)));
});
test('abc: SM Illustration 3 (equipment Y and Z): ₹62.125 per labour hour → 936.38 / 1,298.50; ABC 5,67,000 and 6,75,500 → 976.80 / 1,266.16; distortion 40.42 and 32.34', () => {
  const r = compute(preset('SM Illustration 3'));
  assert.equal(r.sim.trad.R, 62.125); assert.deepEqual(trad(r), [936.38, 1298.5]);
  assert.deepEqual(rates(r), [350, 17.5, 10.5]);
  assert.deepEqual(r.sim.prod.map(p => p.oh), [567000, 675500]);
  assert.deepEqual(units(r), [976.8, 1266.16]);
  near(units(r)[0] - trad(r)[0], 40.42, 1e-9, 'Y under-costed'); near(units(r)[1] - trad(r)[1], -32.34, 1e-9, 'Z over-costed');
});
test('abc: SM Illustration 4 (Humara-Apna bank): rates 4.00 / 0.50 / 4.00 / 0.50 and ₹50, ₹30, ₹60 per account', () => {
  const r = compute(preset('Humara-Apna'));
  assert.deepEqual(rates(r), [4, 0.5, 4, 0.5]);
  assert.deepEqual(r.sim.prod.map(p => p.oh), [2930000, 390000, 840000]);
  assert.deepEqual(units(r), [50, 30, 60]);
});
test('abc: SM Practical Problem 1 (Woolmark): ₹24,00,000 split 20:30:40:10; ₹9,600 / ₹1.80 / ₹4,800 / ₹750; 427.00 / 425.00 / 335.20 against 230 / 428 / 364', () => {
  const r = compute(preset('Woolmark'));
  assert.deepEqual(r.sim.pools.map(p => p.cost), [480000, 720000, 960000, 240000]);
  assert.deepEqual(r.sim.act.map(a => a.used), [50, 400000, 200, 320], 'batches, machine hours, inspections, purchase orders');
  assert.deepEqual(rates(r), [9600, 1.8, 4800, 750]);
  assert.deepEqual(totals(r), [1281000, 2125000, 6704000]);
  assert.deepEqual(units(r), [427, 425, 335.2]);
  assert.equal(r.sim.trad.R, 6); assert.deepEqual(trad(r), [230, 428, 364]);
});
test('abc: SM Practical Problem 5 (BABYSOFT): with ICAI\'s rates to two decimals (₹0.06 / ₹10 / ₹1.70): 192.48 / 243.70 / 285.72; traditional ₹33 → 189.00 / 244.17 / 291.50', () => {
  const r = compute(preset('BABYSOFT'));
  assert.deepEqual(rates(r), [0.06, 10, 1.7]);
  assert.deepEqual(units(r), [192.48, 243.7, 285.72]);
  assert.deepEqual(totals(r), [769920, 731100, 571440]);
  assert.equal(r.sim.trad.R, 33); assert.deepEqual(trad(r), [189, 244.17, 291.5]);
  const exact = compute(Object.assign({}, preset('BABYSOFT'), { rates: 'exact' }));
  near(exact.sim.act[0].rate, 58000 / 984000, 1e-12, 'the exact forklifting rate is ₹0.0589 per gram');
  near(sum(exact.sim.prod.map(p => p.oh)), 198000, 1e-6, 'exact rates charge every rupee; rounded ones do not');
});

/* ---------------------------------------------------------------- real ICAI questions */
test('abc: Exam Jan 2025 Case Scenario I (Suggested Answers, MCQs 1–5): (A) ₹29.60, (D) ₹15.44, (A) ₹280, (B) ₹15,360, (B) ₹2,94,905', () => {
  const r = compute(preset('Exam Jan 2025'));
  near(r.sim.trad.R, 29.60, 0.005, 'MCQ 1: 2,11,638 ÷ 7,150 labour hours');
  assert.equal(trad(r)[1], 15.44, 'MCQ 2: Y = 8 + 3 + 0.15 × 29.60');
  assert.equal(rates(r)[0], 280, 'MCQ 3: 49,000 ÷ 175 production runs');
  near(charge(r, 'Machine running', 'X'), 15360, 1e-6, 'MCQ 4: 8,000 machine hours × ₹1.92');
  near(r.sim.prod[2].total, 294905, 1e-6, 'MCQ 5: total cost of Z');
});
test('abc: Exam Sep 2024 Q3(a) (GST Ltd): the support activity is spread (WN2: 1,15,200 / 1,36,800 / 18,000), rates ₹20 / ₹19 / ₹25 on company-wide drivers; ABC 90,611 / 64,082 (10.07 / 8.90); traditional ₹3.75 → 86,600 / 60,950 (9.62 / 8.47)', () => {
  const r = compute(preset('Exam Sep 2024'));
  assert.deepEqual(r.sim.pools.map(p => Math.round(p.cost)), [0, 115200, 136800, 18000]);
  assert.deepEqual(r.sim.steps.map(s => Math.round(s.amount)), [45000, 162000, 36000], 'machine maintenance spreads its 27,000 + 9,000');
  assert.deepEqual(rates(r), [20, 19, 25]);
  assert.deepEqual(totals(r), [90611, 64082]); assert.deepEqual(units(r), [10.07, 8.9]);
  assert.equal(r.sim.trad.R, 3.75); assert.deepEqual(r.sim.trad.prod.map(p => p.total), [86600, 60950]); assert.deepEqual(trad(r), [9.62, 8.47]);
});
test('abc: MTP Sep 2026 Series I Q3(a) (Silver Star): ₹75,000 split 5:3:2; ₹625 / ₹168.75 / ₹270 / ₹14; ABC 89,485 / 76,555 / 55,225 / 68,535; differences (30.08) (3.18) 17.48 31.63', () => {
  const r = compute(preset('Silver Star'));
  assert.deepEqual(r.sim.pools.map(p => p.cost), [62500, 40500, 27000, 3500]);
  assert.deepEqual(r.sim.act[0].driver.vol, [32, 26, 20, 22], 'production runs of 25 units');
  assert.deepEqual(rates(r), [625, 168.75, 270, 14]);
  assert.deepEqual(totals(r), [89485, 76555, 55225, 68535]);
  assert.deepEqual(units(r), [111.86, 117.78, 110.45, 124.61]);
  near(r.sim.trad.R, 133500 / 8350, 1e-12); assert.deepEqual(trad(r), [141.94, 120.96, 92.97, 92.98]);
  assert.deepEqual(units(r).map((u, j) => Math.round((u - trad(r)[j]) * 100) / 100), [-30.08, -3.18, 17.48, 31.63]);
});

/* ---------------------------------------------------------------- identities and an independent re-computation */
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
function randomCase(rnd) {
  const n = 1 + Math.floor(rnd() * 4), m = 1 + Math.floor(rnd() * 4);
  const units = Array.from({ length: n }, () => 100 * (1 + Math.floor(rnd() * 50)));
  const rows = [['Direct material ₹', units.map(() => 1 + Math.floor(rnd() * 90)).join(' ')], ['Direct labour ₹', units.map(() => 1 + Math.floor(rnd() * 40)).join(' ')],
    ['Labour hours', units.map(() => (1 + Math.floor(rnd() * 8)) / 4).join(' ')], ['Machine hours', units.map(() => (1 + Math.floor(rnd() * 8)) / 2).join(' ')], ['Batch size', units.map(() => 50).join(' ')]];
  const drivers = [];
  for (let k = 0; k < m; k++) {
    const scope = ['per unit', 'total', 'per batch'][Math.floor(rnd() * 3)];
    rows.push([`Driver ${k} ${scope === 'total' ? '(total)' : scope}`, units.map(() => 1 + Math.floor(rnd() * 20)).join(' '), scope]); drivers.push(`Driver ${k}`);
  }
  const pools = drivers.map((d, k) => [`Pool ${k}`, String(1000 * (1 + Math.floor(rnd() * 300))), rnd() < 0.2 ? 'batches' : rnd() < 0.2 ? 'Machine hours' : d]);
  const resources = rnd() < 0.5 ? [['Shared overhead', String(1000 * Math.floor(rnd() * 200)), pools.map(() => 1 + Math.floor(rnd() * 5)).join(' ')]] : [];
  return { base: rnd() < 0.5 ? 'lh' : 'mh', layout: rnd() < 0.5 ? 'unit' : 'total', rates: 'exact', tradTotal: '', tradHours: '', productLines: units.map((u, j) => ['P' + j, String(u)]), productData: rows, pools, resources };
}
/** a plain re-computation of ABC, written separately from the lab */
function bruteABC(c) {
  const u = c.productLines.map(p => +p[1]), row = l => c.productData.find(r => r[0] === l), q = l => row(l)[1].split(' ').map(Number);
  const batches = u.map(x => Math.ceil(x / 50));
  const vol = name => {
    if (name === 'batches') return batches;
    const r = c.productData.find(x => x[0] === name || x[0].indexOf(name + ' ') === 0), v = r[1].split(' ').map(Number);
    return v.map((x, j) => (r[2] === 'total' ? x : r[2] === 'per batch' ? x * batches[j] : x * u[j]));
  };
  const cost = c.pools.map(p => +p[1]);
  c.resources.forEach(r => { const w = r[2].split(' ').map(Number), W = w.reduce((s, x) => s + x, 0); w.forEach((x, k) => (cost[k] += (+r[1] * x) / W)); });
  const oh = u.map(() => 0);
  c.pools.forEach((p, k) => { const v = vol(p[2]), V = v.reduce((s, x) => s + x, 0); v.forEach((x, j) => (oh[j] += (cost[k] * x) / V)); });
  return { oh, cost };
}
test('abc: brute force, 500 random factories: the lab\'s charges equal an independent re-computation, ABC charges every rupee of the pools, and traditional absorbs the same total', () => {
  const rnd = lcg(3);
  for (let k = 0; k < 500; k++) {
    const c = randomCase(rnd), r = compute(c), b = bruteABC(c);
    r.sim.prod.forEach((p, j) => near(p.oh, b.oh[j], 1e-6, `#${k} ${p.name}`));
    const pools = sum(b.cost);
    near(sum(r.sim.prod.map(p => p.oh)), pools, 1e-6, `#${k}: ABC charges exactly the pools`);
    near(sum(r.sim.trad.prod.map(p => p.oh)), pools, 1e-6, `#${k}: traditional absorbs the same money`);
    r.sim.act.forEach(a => near(sum(a.charges), a.cost, 1e-6, `#${k} ${a.label}: a pool is fully charged when its rate is set on what the products use`));
    r.sim.prod.forEach((p, j) => {
      if (r.sim.layout === 'total') near(p.unit, Math.round((p.total / p.units) * 100) / 100, 1e-9);
      else near(p.total, p.unit * p.units, 1e-6);
    });
  }
});
test('abc: capacity rates: the products bear rate × use, the rest is unused capacity, and the two add up to the pool', () => {
  const rnd = lcg(9);
  for (let k = 0; k < 300; k++) {
    const c = randomCase(rnd);
    const r0 = compute(c);
    c.pools = c.pools.map((p, i) => [p[0], p[1], `${p[2]} of ${Math.ceil(r0.sim.act[i].used * (1 + rnd()))}`]);
    const r = compute(c);
    r.sim.act.forEach(a => { assert.ok(a.unused >= -1e-6, 'unused capacity is never negative'); near(sum(a.charges) + a.unused, a.cost, 1e-6); });
  }
});

/* ---------------------------------------------------------------- the animation */
test('abc: every example builds, keeps ≤ 120 frames, captions every frame, and explains each distortion by the activity behind it', () => {
  presets.forEach(p => {
    const r = compute(p.values);
    assert.ok(r.frames.length >= 5 && r.frames.length <= 120, `${p.label}: ${r.frames.length} frames`);
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 20, `${p.label} frame ${i}`); assert.ok(f.view && f.view.length); });
    assert.ok(r.stats.length >= 2 && r.stats.length <= 6); assert.match(r.note, /^\*\*Conventions\.\*\*/);
  });
  const r = compute(presets[0].values), caps = r.frames.map(f => f.caption).join('\n');
  assert.match(caps, /Frozen samosas.*under-costs/); assert.match(caps, /Premix packs.*over-costs/);
  assert.match(caps, /Mainly \*\*machine set-ups\*\*/, 'the samosas\' many small batches explain their distortion');
  assert.ok(r.frames.some(f => f.view.some(x => x.type === 'nest')), 'each activity is drawn as pool → products');
  assert.match(caps, /Same overheads, divided differently/);
});
test('abc: the Tapri plant: premix over-costed by ₹6.31, sachets and samosas under-costed by ₹9.94 and ₹11.70 a unit', () => {
  const r = compute(presets[0].values);
  assert.deepEqual(r.sim.pools.map(p => p.cost), [150000, 250000, 60000, 40000]);
  assert.deepEqual(units(r).map((u, j) => Math.round((u - trad(r)[j]) * 100) / 100), [-6.31, 9.94, 11.7]);
});

/* ---------------------------------------------------------------- bad input */
test('abc: bad input fails with a message that says what to fix', () => {
  const v = presets[0].values;
  assert.throws(() => compute(Object.assign({}, v, { pools: [['Set-ups', '1,000', 'Flux capacitor']] })), /No driver called "Flux capacitor"/);
  assert.throws(() => compute(Object.assign({}, v, { productData: v.productData.concat([['Extra', '1 2']]) })), /give 3 figures/);
  assert.throws(() => compute(Object.assign({}, v, { pools: v.pools.concat([['Supervision', '5,000', 'support']]), resources: [['Factory supervisor\'s salary', '60,000', '30 10 50 10 0']] })), /support activity/);
  assert.throws(() => compute(Object.assign({}, v, { pools: [['Machine running', '2,44,000', 'Machine hours of 100']], resources: [] })), /smaller than what these products use/);
  assert.throws(() => compute(Object.assign({}, v, { productData: v.productData.filter(d => d[0] !== 'Batch size') })), /driver called "batches"|batch size/);
  assert.throws(() => compute(Object.assign({}, v, { productData: v.productData.filter(d => d[0] !== 'Labour hours') })), /Labour hours/);
  assert.throws(() => compute(Object.assign({}, v, { productLines: [['A', '0']] })), /positive/);
  assert.throws(() => compute(Object.assign({}, v, { resources: [['Rent', '10,000', '1 2']] })), /give 4 figures/);
});

/* ---------------------------------------------------------------- the challenge */
test('abc: test-yourself problems: 300 per mode build, have exact two-decimal answers, and the given tables show only the inputs', () => {
  const ch = LAB.def.challenge, dflt = LAB.def.controls.reduce((o, c) => (o[c.id] = c.type === 'table' ? c.rows : c.value, o), {});
  for (const base of ['lh', 'mh', 'none']) {
    for (let s = 1; s <= 300; s++) {
      const v = Object.assign({}, dflt, { base }, ch.gen(GA.util.rng(s * 104729 + base.length)));
      const res = compute(v), want = ch.solve(res, v);
      assert.ok(Number.isFinite(want) && want > 0, `${base}#${s}`);
      assert.equal(res.sim.base, base, 'the problem keeps the mode being explored');
      if (v._ask === 'rate') assert.equal(want, res.sim.act[v._pool % res.sim.act.length].rate, 'driver rates are exact');
      else near(want, res.sim.prod[v._k].total / res.sim.P[v._k].units, 0.0051);
      const text = JSON.stringify(ch.view(res, v));
      const computed = res.sim.act.map(a => a.rate).concat(res.sim.prod.map(p => p.unit)).filter(x => x > 12 && !Number.isInteger(x));
      computed.forEach(x => assert.ok(text.indexOf(String(x)) < 0, `${base}#${s}: ${x} is not shown while asking`));
      assert.ok(ch.prompt(v, res).length > 40 && ch.explain(res, v).length > 40);
    }
  }
});
