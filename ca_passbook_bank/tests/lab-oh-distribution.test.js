/* Overhead Distribution Lab (cma.oh): the Study Material's illustrations and practical problems (ICAI SM Paper 4 ch. 4, July 2024 edition,
   relevant for January 2027), real ICAI questions with their Suggested Answers, brute-force identities on random inputs, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/oh-distribution.js');
const { compute, split, numList, num, presets } = LAB;
const near = (a, b, tol, msg) => { if (!(Math.abs(a - b) <= tol)) throw new Error(`${msg || ''} expected ${b} ± ${tol}, got ${a}`); };
const base = { part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '', bases: [], items: [] };
const run = v => compute(Object.assign({}, base, v));
const fin = (r, names) => names.map(n => r.sim.secondary.final[r.sim.D.findIndex(d => d.name === n)]);
const prim = (r, names) => names.map(n => r.sim.primary.totals[r.sim.D.findIndex(d => d.name === n)]);
const rowOf = (r, label, k) => r.sim.secondary.rows.filter(x => x.label === label)[k || 0];
const preset = word => presets.find(p => p.label.indexOf(word) >= 0).values;

/* ---------------------------------------------------------------- reading the inputs */
test('oh: amounts and lists are read the way students type them (Indian commas, ratios, percentages, dashes)', () => {
  assert.equal(num('12,50,000'), 1250000); assert.equal(num('₹ 4,75,000'), 475000); assert.equal(num('1,500'), 1500); assert.equal(num('-'), 0);
  assert.ok(isNaN(num('12,5,0')));
  assert.deepEqual(numList('2,000 800 400 1,600'), [2000, 800, 400, 1600]);
  assert.deepEqual(numList('45% 15% 30% - 10%'), [45, 15, 30, 0, 10]);
  assert.deepEqual(numList('5:3:2'), [5, 3, 2]);
  assert.deepEqual(numList('20,30,40'), [20, 30, 40], 'commas between small numbers separate them');
  assert.deepEqual(numList('1,50,000 0 50,000'), [150000, 0, 50000]);
  assert.equal(numList('ten 20'), null);
});

/* ---------------------------------------------------------------- the rounding rule */
test('oh: whole-rupee shares add up exactly and reproduce ICAI\'s rounded rows (SM Ill. 5; RTP Sep 2026 Q1)', () => {
  assert.deepEqual(split(29125, [45, 15, 30, 0, 10], 1), [13106, 4369, 8738, 0, 2912], 'SM Ill. 5: X\'s second round');
  assert.deepEqual(split(240000, [20, 10, 1, 2], 1), [145455, 72727, 7273, 14545], 'RTP Sep 2026: plant insurance');
  assert.deepEqual(split(320000, [20, 10, 1, 2], 1), [193939, 96970, 9697, 19394], 'RTP Sep 2026: depreciation');
  const c = split(500000, [150, 100, 40, 20], 1);
  assert.equal(c.reduce((a, b) => a + b), 500000, 'canteen subsidy adds up (ICAI prints 2,41,935 but its column total uses 2,41,936)');
  assert.deepEqual(c, [241936, 161290, 64516, 32258]);
  const rnd = (() => { let s = 7; return () => (s = (s * 48271) % 2147483647) / 2147483647; })();
  for (let k = 0; k < 2000; k++) {
    const w = Array.from({ length: 2 + Math.floor(rnd() * 6) }, () => (rnd() < 0.2 ? 0 : Math.floor(rnd() * 900) + 1));
    if (!w.some(x => x > 0)) w[0] = 1;
    const amt = Math.floor(rnd() * 5e7), parts = split(amt, w, 1), W = w.reduce((a, b) => a + b);
    assert.equal(parts.reduce((a, b) => a + b), amt, 'a row always adds up');
    parts.forEach((p, i) => { assert.ok(Number.isInteger(p)); assert.ok(Math.abs(p - (amt * w[i]) / W) < 1, 'each share is within a rupee of exact'); if (!w[i]) assert.equal(p, 0); });
  }
});

/* ---------------------------------------------------------------- Study Material illustrations */
const XL = { method: 'direct', depts: [['A', 'P', '30,00,000'], ['B', 'P', '26,00,000'], ['C', 'P', '24,00,000'], ['Stores', 'S', '4,00,000'], ['Time-keeping and accounts', 'S', '3,00,000'], ['Power', 'S', '1,60,000'], ['Canteen', 'S', '1,00,000']],
  bases: [['HP', '300 300 200 - - - -'], ['Workers', '20 15 15 - - - -'], ['Stores requisitions', '2,50,000 1,50,000 1,00,000 - - - -']],
  service: [['Stores', 'Stores requisitions'], ['Time-keeping and accounts', 'Workers'], ['Power', 'HP'], ['Canteen', 'Workers']] };
test('oh: SM Illustration 1 (XL Ltd), direct re-distribution: A 34,20,000, B 29,00,000, C 26,40,000 and every row', () => {
  const r = run(XL);
  assert.deepEqual(fin(r, ['A', 'B', 'C']), [3420000, 2900000, 2640000]);
  assert.deepEqual(rowOf(r, 'Stores').cells.slice(0, 3), [200000, 120000, 80000]);
  assert.deepEqual(rowOf(r, 'Time-keeping and accounts').cells.slice(0, 3), [120000, 90000, 90000]);
  assert.deepEqual(rowOf(r, 'Power').cells.slice(0, 3), [60000, 60000, 40000]);
  assert.deepEqual(rowOf(r, 'Canteen').cells.slice(0, 3), [40000, 30000, 30000]);
  assert.equal(rowOf(r, 'Stores').ratio, '5:3:2:—:—:—:—');
});
test('oh: SM Illustration 2, step method: X closes first (5:8:7), then Y (2:3): A 4,60,000, B 5,10,000', () => {
  const r = run({ method: 'step', depts: [['A', 'P', '3,00,000'], ['B', 'P', '3,20,000'], ['X', 'S', '2,00,000'], ['Y', 'S', '1,50,000']], service: [['X', '40 35 - 25'], ['Y', '40 60 - -']] });
  assert.deepEqual(rowOf(r, 'X').cells, [80000, 70000, -200000, 50000]);
  assert.equal(rowOf(r, 'X').after[3], 200000, 'Y carries 2,00,000 after X is closed');
  assert.deepEqual(fin(r, ['A', 'B']), [460000, 510000]);
});
const BOILER = { method: 'simultaneous', depts: [['A', 'P', '0'], ['B', 'P', '0'], ['Boiler house', 'S', '3,00,000'], ['Pump room', 'S', '60,000']], service: [['Boiler house', '60 35 - 5'], ['Pump room', '10 40 50 -']] };
test('oh: SM Illustration 3, simultaneous equations: P = 76,923, B = 3,38,462; A 2,10,769, B 1,49,231', () => {
  const r = run(BOILER), S = r.sim.secondary;
  assert.deepEqual(S.T, [338462, 76923]);
  near(S.exact[1], 75000 / 0.975, 1e-6, 'P = 75,000 / 0.975');
  assert.deepEqual(fin(r, ['A', 'B']), [210769, 149231]);
  assert.deepEqual(rowOf(r, 'Boiler house').cells.slice(0, 2), [203077, 118462]);
  assert.deepEqual(rowOf(r, 'Pump room').cells.slice(0, 2), [7692, 30769]);
  assert.match(r.frames.find(f => /Substituting/.test(f.caption)).caption, /0\.975/);
});
test('oh: SM Illustration 4 (Sanz Ltd), primary distribution: power on HP × machine hours (10:16:16:3:5), totals 2,70,000 … 5,35,000', () => {
  const r = compute(preset('Sanz Ltd): primary'));
  assert.deepEqual(r.sim.primary.totals, [270000, 370000, 600000, 475000, 535000]);
  const power = r.sim.primary.rows.find(x => x.label === 'Power');
  assert.deepEqual(power.cells, [50000, 80000, 80000, 15000, 25000]);
  assert.equal(power.ratio, '10:16:16:3:5');
  assert.deepEqual(r.sim.primary.rows.find(x => x.label === 'Factory rent').cells, [100000, 50000, 100000, 50000, 100000]);
  assert.deepEqual(r.sim.primary.rows.find(x => x.label === 'Other overheads').cells, [100000, 200000, 400000, 100000, 100000]);
  assert.ok(r.frames.length <= 120);
});
test('oh: SM Illustration 4, trial and error: X 5,04,271 and Y 5,85,413, as ICAI\'s working', () => {
  const r = compute(preset('trial and error between X and Y'));
  assert.deepEqual(r.sim.secondary.T, [504271, 585413]);
  assert.deepEqual(r.sim.secondary.iter.map(x => x.gives.filter(Boolean)[0]), [47500, 29125, 2913, 146]);
  near(r.sim.secondary.pending, 14.6, 0.01, 'X\'s last 146 × 10% is never passed');
});
test('oh: SM Illustration 5, repeated distribution: ICAI\'s rounds, 8,48,177 / 6,50,541 / 7,51,282 (± ₹2) and machine hour rates 848.18, 325.27, 187.82', () => {
  const r = compute(preset('Sanz Ltd): primary'));
  const X = r.sim.secondary.rows.filter(x => x.label === 'X'), Y = r.sim.secondary.rows.filter(x => x.label === 'Y');
  assert.deepEqual(X[0].cells, [213750, 71250, 142500, -475000, 47500]);
  assert.deepEqual(Y[0].cells, [349500, 203875, 0, 29125, -582500]);
  assert.deepEqual(X[1].cells, [13106, 4369, 8738, -29125, 2912]);
  assert.deepEqual(Y[1].cells, [1747, 1019, 0, 146, -2912]);
  assert.equal(Y[Y.length - 1].kind, 'close', 'the last small balance of Y goes to production only');
  const f = fin(r, ['A', 'B', 'C']);
  [848177, 650541, 751282].forEach((x, i) => near(f[i], x, 2, 'department ' + 'ABC'[i]));
  assert.equal(f[0] + f[1] + f[2], 2250000, 'nothing is lost');
  assert.deepEqual(r.sim.absorb.rows.map(x => Math.round(x.rate * 100) / 100), [848.18, 325.27, 187.82]);
});
test('oh: SM Practical Problem 1 (ABC Company): primary totals 83,920 / 30,500 / 20,000 / 30,000; repeated distribution 1,18,397 and 46,023 (± ₹2)', () => {
  const r = compute(preset('ABC Company'));
  assert.deepEqual(r.sim.primary.totals, [83920, 30500, 20000, 30000]);
  const row = l => r.sim.primary.rows.find(x => x.label === l).cells;
  assert.deepEqual(row('Power'), [5600, 800, 0, 1600]); assert.deepEqual(row('Fuel and heat'), [1200, 2400, 800, 1600]);
  assert.deepEqual(row('Insurance'), [640, 200, 10, 150]); assert.deepEqual(row('Depreciation'), [64000, 20000, 1000, 15000]);
  assert.deepEqual(rowOf(r, 'Stores & maintenance').cells, [15000, 6000, 9000, -30000]);
  assert.deepEqual(rowOf(r, 'General plant').cells, [16571, 8286, -29000, 4143], 'general plant on employees 20:10:—:5 = 4:2:1');
  const f = fin(r, ['Machine shop', 'Packing']);
  near(f[0], 118397, 2); near(f[1], 46023, 2); assert.equal(f[0] + f[1], 164420);
});
test('oh: SM Practical Problem 2 (Modern Manufactures): primary 7,700 / 7,300 / 9,800 / 4,700 / 929; repeated 9,233.8 / 9,034.9 / 12,160.3; product X ≈ ₹37.19 of overhead', () => {
  const r = run({ method: 'repeated', rate: 'lh', job: '4 5 3',
    depts: [['P1', 'P', ''], ['P2', 'P', ''], ['P3', 'P', ''], ['S1', 'S', ''], ['S2', 'S', '']],
    bases: [['Working hours', '3,070 4,475 2,419 - -'], ['Direct wages', '3,000 2,000 3,000 1,500 195'], ['Machine value', '60,000 80,000 1,00,000 5,000 5,000'], ['HP', '60 30 50 10 0'], ['Light points', '10 15 20 10 5'], ['Floor space', '2,000 2,500 3,000 2,000 500']],
    items: [['Direct wages of S1 and S2', '0 0 0 1,500 195', 'allocated'], ['Rent and rates', '5,000', 'Floor space'], ['General lighting', '600', 'Light points'], ['Indirect wages', '1,939', 'Direct wages'],
      ['Power', '1,500', 'HP'], ['Depreciation on machines', '10,000', 'Machine value'], ['Sundries', '9,695', 'Direct wages']],
    service: [['S1', '20 30 40 - 10'], ['S2', '40 20 30 10 -']] });
  assert.deepEqual(r.sim.primary.totals, [7700, 7300, 9800, 4700, 929]);
  const f = fin(r, ['P1', 'P2', 'P3']);
  near(f[0], 9233.8, 1.5); near(f[1], 9034.9, 1.5); near(f[2], 12160.3, 1.5);
  const rates = r.sim.absorb.rows.map(x => Math.round(x.rate * 100) / 100);
  assert.deepEqual(rates.slice(1), [2.02, 5.03]);
  near(rates[0], 3.00, 0.011, 'P1: 9,233.8 ÷ 3,070 is 3.0077, which ICAI prints as 3.00');
  near(r.sim.absorb.job.total, 37.19, 0.05, 'product X: 4, 5 and 3 hours');
});
test('oh: SM Practical Problem 3 (Deccan), step ladder P → Q → R → S on employees, labour hours, area, labour hours: 3,00,000 / 1,35,000 / 1,60,000 and rates 75, 45, 40', () => {
  const r = compute(preset('Deccan'));
  assert.deepEqual(rowOf(r, 'P').cells, [10000, 12500, 8500, -45000, 5000, 4000, 5000]);
  assert.deepEqual(rowOf(r, 'Q').cells, [16000, 12000, 16000, 0, -80000, 24000, 12000]);
  assert.deepEqual(rowOf(r, 'R').cells, [57000, 28500, 28500, 0, 0, -133000, 19000]);
  assert.deepEqual(rowOf(r, 'S').cells, [24000, 18000, 24000, 0, 0, 0, -66000]);
  assert.deepEqual(fin(r, ['X', 'Y', 'Z']), [300000, 135000, 160000]);
  assert.deepEqual(r.sim.absorb.rows.map(x => x.rate), [75, 45, 40]);
});

/* ---------------------------------------------------------------- real ICAI questions with Suggested Answers */
test('oh: RTP Sep 2026 Q1 (Apex Mobility): ICAI\'s primary distribution to the rupee, maintenance closed first, stores 5,43,669', () => {
  const r = compute(preset('Apex Mobility')), row = l => r.sim.primary.rows.find(x => x.label === l).cells;
  assert.deepEqual(row('Factory rent'), [1080000, 432000, 108000, 180000]);
  assert.deepEqual(row('Building insurance'), [120000, 48000, 12000, 20000]);
  assert.deepEqual(row('Plant insurance'), [145455, 72727, 7273, 14545]);
  assert.deepEqual(row('Depreciation on machinery'), [193939, 96970, 9697, 19394]);
  assert.deepEqual(r.sim.primary.totals, [3601330, 1770987, 501486, 506197], 'ICAI: 36,01,330 / 17,70,987 / 5,01,486 / 5,06,197');
  assert.deepEqual(rowOf(r, 'Maintenance').cells, [253099, 210915, 42183, -506197]);
  assert.equal(rowOf(r, 'Stores').amount, 543669, 'MCQ (i) B: ₹5,43,669');
  assert.equal(rowOf(r, 'Maintenance').amount, 506197, 'MCQ (ii) C: ₹5,06,197');
  /* the question prints store requisitions 4,000 : 2,000; ICAI's answer shares stores 5:2. With the printed data the MCQ keys still win */
  const f = fin(r, ['Fabrication', 'Assembly']), rates = r.sim.absorb.rows.map(x => x.rate);
  assert.deepEqual(f, [4216875, 2163125]);
  const nearest = (x, opts) => opts.reduce((b, o) => (Math.abs(o - x) < Math.abs(b - x) ? o : b));
  assert.equal(nearest(rates[0], [1.21, 12, 20, 4.56]), 1.21, 'MCQ (iii) A: ₹1.21 per machine hour');
  assert.equal(nearest(rates[1], [18, 2.5, 20, 0.71]), 0.71, 'MCQ (iv) D: ₹0.71 per labour hour');
  assert.equal(r.sim.absorb.rows[0].by, 'mh'); assert.equal(r.sim.absorb.rows[1].by, 'lh', '"most appropriate": machine hours for fabrication, labour hours for assembly');
  const icai = compute(Object.assign({}, preset('Apex Mobility'), { service: [['Maintenance', 'Maintenance hours'], ['Stores', '5 2 - -']] }));
  assert.deepEqual(fin(icai, ['Fabrication', 'Assembly']), [4242764, 2137236], 'ICAI\'s totals with its 5:2 split');
  assert.deepEqual(icai.sim.absorb.rows.map(x => Math.round(x.rate * 100) / 100), [1.21, 0.71]);
  near(150000 + 10000 + icai.sim.absorb.job.total, 160445, 1, 'MCQ (v) C: full production cost of Job AMS-101 ₹1,60,445');
  assert.equal(compute(Object.assign({}, preset('Apex Mobility'), { order: 'most' })).sim.secondary.order[0], 3, '"serves most other service departments" also closes maintenance first');
});
test('oh: MTP May 2026 Series I Q3(b) (Union Ltd): primary 1,97,250 / 80,625 / 1,25,775 / 87,550; a = 1,61,745, b = 1,19,899; 3,38,072 and 1,53,128', () => {
  const r = compute(preset('Union Ltd'));
  assert.deepEqual(r.sim.primary.totals, [197250, 80625, 125775, 87550]);
  const row = l => r.sim.primary.rows.find(x => x.label === l).cells;
  assert.deepEqual(row('Power'), [54600, 7800, 0, 15600]); assert.deepEqual(row('Rent'), [30000, 12000, 6000, 24000]);
  assert.deepEqual(row('Taxes'), [5250, 1575, 525, 1050]);
  const S = r.sim.secondary;
  assert.deepEqual(S.S.map(s => r.sim.D[s].name), ['Stores', 'General plant']);
  assert.deepEqual(S.T, [119899, 161745]);
  assert.deepEqual(fin(r, ['Machine shop', 'Packing']), [338072, 153128], 'ICAI: 3,38,072.00 and 1,53,128.30');
});
test('oh: Exam Sep 2025 Q2(b) (Suggested Answers): S2 = 2,77,551, S1 = 1,87,755; P1 1,44,082, P2 1,48,979, P3 1,06,939', () => {
  const r = compute(preset('Exam Sep 2025 Q2(b)'));
  assert.deepEqual(r.sim.secondary.T, [187755, 277551]);
  assert.deepEqual(fin(r, ['P1', 'P2', 'P3']), [144082, 148979, 106939]);
  assert.deepEqual(rowOf(r, 'S1').cells.slice(0, 3), [46939, 65714, 37551]);
  assert.deepEqual(rowOf(r, 'S2').cells.slice(0, 3), [97143, 83265, 69388]);
  const e = r.sim.secondary.eqs.map(x => [x.c, x.terms.map(t => Math.round(t.k * 100) / 100)]);
  assert.deepEqual(e, [[160000, [0.1]], [240000, [0.2]]], 'S1 = 1,60,000 + 0.10 S2; S2 = 2,40,000 + 0.20 S1');
});
test('oh: MTP Sep 2025 Series II Q2(a) (IOT Solutions): direct, step (finance first) and simultaneous, fixed and variable costs, all to the rupee', () => {
  const fixed = preset('IOT Solutions');
  const variable = Object.assign({}, fixed, { depts: [['MD', 'P', '0'], ['DS', 'P', '0'], ['Finance', 'S', '12,76,000'], ['IT', 'S', '38,28,000']], service: [['Finance', '1,200 3,600 - 1,200'], ['IT', '79,800 34,200 6,000 -']] });
  const got = (v, m) => fin(compute(Object.assign({}, v, { method: m })), ['MD', 'DS']);
  assert.deepEqual(got(fixed, 'direct'), [2966700, 2360600]);
  assert.deepEqual(got(fixed, 'step'), [2922376, 2404924]);
  assert.deepEqual(got(fixed, 'simultaneous'), [2950830, 2376470]);
  assert.deepEqual(compute(Object.assign({}, fixed, { method: 'simultaneous' })).sim.secondary.T, [2460628, 3276563], 'F = 24,60,628, T = 32,76,563');
  assert.deepEqual(got(variable, 'direct'), [2998600, 2105400]);
  assert.deepEqual(got(variable, 'step'), [3113440, 1990560]);
  assert.deepEqual(got(variable, 'simultaneous'), [3039200, 2064800]);
  /* dual rate: the two runs add to ICAI's totals of 59,65,300 / 44,66,000 (direct), 60,35,816 / 43,95,484 (step), 59,90,030 / 44,41,270 (simultaneous) */
  const both = m => got(fixed, m).map((x, i) => x + got(variable, m)[i]);
  assert.deepEqual(both('direct'), [5965300, 4466000]); assert.deepEqual(both('step'), [6035816, 4395484]); assert.deepEqual(both('simultaneous'), [5990030, 4441270]);
});

/* ---------------------------------------------------------------- identities on random inputs */
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
function randomCase(rnd) {
  const nP = 1 + Math.floor(rnd() * 3), nS = 1 + Math.floor(rnd() * 3), n = nP + nS;
  const depts = Array.from({ length: n }, (_, i) => [(i < nP ? 'P' : 'S') + i, i < nP ? 'P' : 'S', String(Math.floor(rnd() * 900000) + 1000)]);
  const service = depts.slice(nP).map((d, k) => [d[0], depts.map((e, j) => (j === nP + k ? '-' : j < nP ? String(1 + Math.floor(rnd() * 60)) : String(rnd() < 0.5 ? Math.floor(rnd() * 25) : 0))).join(' ')]);
  const bases = [['Area', depts.map(() => String(Math.floor(rnd() * 3000))).join(' ')], ['Labour hours', depts.map(() => String(Math.floor(rnd() * 5000))).join(' ')], ['Machine hours', depts.map(() => String(Math.floor(rnd() * 5000) + 1)).join(' ')]];
  if (!numList(bases[0][1]).some(x => x > 0)) bases[0][1] = depts.map(() => '1').join(' ');
  const items = rnd() < 0.6 ? [['Rent', String(Math.floor(rnd() * 500000)), 'Area'], ['Power', String(Math.floor(rnd() * 300000)), 'Machine hours']] : [];
  return { depts, service, bases, items };
}
test('oh: brute force, 400 random factories: every method puts all the overheads in production (exactly, in whole rupees); simultaneous = a long repeated distribution', () => {
  const rnd = lcg(11);
  for (let k = 0; k < 400; k++) {
    const c = randomCase(rnd);
    const total = compute(Object.assign({}, base, c, { method: 'direct' })).sim.primary.totals.reduce((a, b) => a + b);
    for (const m of ['direct', 'step', 'repeated']) {
      const r = compute(Object.assign({}, base, c, { method: m }));
      const S = r.sim.secondary, prodSum = r.sim.D.reduce((a, d, j) => a + (d.P ? S.final[j] : 0), 0);
      assert.equal(prodSum, total, `${m} #${k}: production holds everything`);
      r.sim.D.forEach((d, j) => { if (!d.P) assert.equal(S.final[j], 0, `${m} #${k}: ${d.name} is emptied`); });
      S.rows.forEach(x => assert.equal(x.cells.reduce((a, b) => a + b, 0), 0, `${m} #${k}: a row moves money, never makes it`));
      if (m === 'step') {
        const closed = new Set();
        S.rows.forEach(x => { closed.forEach(j => assert.equal(x.cells[j], 0, `step #${k}: a closed department takes nothing back`)); closed.add(x.s); });
      }
    }
    const sim = compute(Object.assign({}, base, c, { method: 'simultaneous', round: false })).sim, rep = compute(Object.assign({}, base, c, { method: 'repeated', round: false, stop: 1e-6 })).sim;
    sim.D.forEach((d, j) => { if (d.P) near(sim.secondary.final[j], rep.secondary.final[j], 0.01, `#${k} ${d.name}`); });
    /* the equations hold: T_s = own_s + Σ q(t → s) T_t */
    const S = sim.secondary, svc = LAB.parseService(c.service, sim.D, LAB.parseBases(c.bases, sim.D));
    S.S.forEach((s, a) => {
      const rhs = sim.primary.totals[s] + S.S.reduce((x, t, b) => { if (t === s) return x; const r2 = svc.find(z => z.s === t); return x + (r2.w[s] / r2.w.reduce((p, q) => p + q, 0)) * S.exact[b]; }, 0);
      near(S.exact[a], rhs, 1e-6, `#${k} equation of ${sim.D[s].name}`);
    });
    const exactTotal = sim.primary.totals.reduce((a, b) => a + b);
    near(sim.D.reduce((a, d, j) => a + (d.P ? S.final[j] : 0), 0), exactTotal, 1e-6, `#${k}: simultaneous (exact) loses nothing`);
    const tr = compute(Object.assign({}, base, c, { method: 'trial', round: false, stop: 0.01 })).sim;
    near(tr.D.reduce((a, d, j) => a + (d.P ? tr.secondary.final[j] : 0), 0) + tr.secondary.pending, exactTotal, 1e-6, `#${k}: trial and error is short by exactly what it never passed`);
  }
});
test('oh: primary distribution identity: the department totals add up to the allocated overheads plus every item (rounded and exact)', () => {
  const rnd = lcg(5);
  for (let k = 0; k < 300; k++) {
    const c = randomCase(rnd);
    for (const round of [true, false]) {
      const r = compute(Object.assign({}, base, c, { method: 'direct', round })), P = r.sim.primary;
      const want = c.depts.reduce((a, d) => a + (round ? Math.round(num(d[2])) : num(d[2])), 0) + c.items.reduce((a, it) => a + num(it[1]), 0);
      near(P.totals.reduce((a, b) => a + b), want, round ? 0 : 1e-6);
    }
  }
});

/* ---------------------------------------------------------------- the animation */
test('oh: every example builds, keeps ≤ 120 frames, captions every frame and states its conventions', () => {
  presets.forEach(p => {
    const r = compute(p.values);
    assert.ok(r.frames.length >= 4 && r.frames.length <= 120, p.label + ': ' + r.frames.length + ' frames');
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 20, `${p.label} frame ${i} caption`); assert.ok(f.view && f.view.length, `${p.label} frame ${i} view`); });
    assert.ok(r.stats.length >= 2 && r.stats.length <= 6);
    assert.match(r.note, /^\*\*Conventions\.\*\*/);
  });
  const r = compute(presets[0].values), primFrames = r.frames.filter(f => f.view[0].title && /^Primary/.test(f.view[0].title));
  assert.ok(primFrames.length >= 16, 'the primary table fills cell by cell');
  assert.ok(r.frames.some(f => /Closing/.test(f.caption)), 'the repeated distribution ends with the closing step');
  assert.ok(compute(Object.assign({}, presets[0].values, { part: 'primary' })).frames.every(f => !/Secondary/.test(f.view[0].title || '')));
  assert.ok(compute(Object.assign({}, presets[0].values, { part: 'secondary' })).frames.every(f => !/^Primary/.test(f.view[0].title || '')));
});
test('oh: the Tapri example: repeated, simultaneous, step and direct agree where they should', () => {
  const v = presets[0].values;
  const rep = fin(compute(v), ['Blending', 'Packing']), sim = fin(compute(Object.assign({}, v, { method: 'simultaneous' })), ['Blending', 'Packing']);
  rep.forEach((x, i) => near(x, sim[i], 2));
  near(compute(Object.assign({}, v, { method: 'simultaneous', round: false })).sim.secondary.final[0], 505000 + 0.6 * (158000 / 0.98) + 0.5 * (90000 + 0.1 * (158000 / 0.98)), 1e-6);
  assert.deepEqual(prim(compute(v), ['Blending', 'Packing', 'Boiler house', 'Maintenance']), [505000, 325000, 140000, 90000]);
});

/* ---------------------------------------------------------------- bad input */
test('oh: bad input fails with a message that says what to fix', () => {
  const v = presets[0].values;
  assert.throws(() => compute(Object.assign({}, v, { depts: [['A', 'S', '100']], service: [['A', '100']] })), /production department/);
  assert.throws(() => compute(Object.assign({}, v, { depts: v.depts.concat([['Blending', 'P', '1']]) })), /different name/);
  assert.throws(() => compute(Object.assign({}, v, { service: [v.service[0]] })), /Maintenance/);
  assert.throws(() => compute(Object.assign({}, v, { service: [['Boiler house', '60 30'], v.service[1]] })), /give 4 shares/);
  assert.throws(() => compute(Object.assign({}, v, { items: [['Rent', '1,20,000', 'Volume']] })), /no basis called "Volume"/);
  assert.throws(() => compute(Object.assign({}, v, { bases: [['Floor area', '1 2 3']] })), /give 4 figures/);
  assert.throws(() => compute(Object.assign({}, v, { depts: [['A', 'X', '1']] })), /type P/);
  assert.throws(() => compute(Object.assign({}, v, { method: 'simultaneous', service: [['Boiler house', '0 0 - 100'], ['Maintenance', '0 0 100 -']] })), /only serve each other/);
  assert.throws(() => compute(Object.assign({}, v, { method: 'direct', service: [['Boiler house', '0 0 - 100'], v.service[1]] })), /nowhere to put/);
  assert.throws(() => compute(Object.assign({}, v, { job: '12' })), /Job hours: give 2 figures/);
});

/* ---------------------------------------------------------------- the challenge */
test('oh: test-yourself problems: 300 per method build, the answer is the stage\'s own figure, and the given table never shows it', () => {
  const ch = LAB.def.challenge;
  for (const method of ['direct', 'step', 'repeated', 'simultaneous', 'trial']) {
    for (let s = 1; s <= 300; s++) {
      const rnd = GA.util.rng(s * 7919 + method.length);
      const v = Object.assign({}, LAB.def.controls.reduce((o, c) => (o[c.id] = c.type === 'table' ? c.rows : c.value, o), {}), { method }, ch.gen(rnd));
      const res = compute(v), want = ch.solve(res, v);
      assert.ok(Number.isFinite(want) && want > 0, `${method}#${s}`);
      assert.ok(['direct', 'step', 'simultaneous'].includes(res.sim.method), 'problems use a method with one exact answer');
      if (v._ask !== 'job') assert.equal(want, Math.round(res.sim.secondary.final[res.sim.D.findIndex(d => d.P && d.name === res.sim.D.filter(x => x.P)[v._k].name)]));
      const shown = JSON.stringify(ch.view(res, v));
      assert.ok(shown.indexOf(want.toLocaleString('en-IN')) < 0 || String(want).length < 4, `${method}#${s}: the given table hides the answer`);
      assert.ok(ch.prompt(v, res).length > 40 && ch.explain(res, v).length > 40);
    }
  }
});
