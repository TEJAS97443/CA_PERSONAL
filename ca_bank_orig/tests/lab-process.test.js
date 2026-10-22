/* Process Costing Lab (app/js/labs/process.js): the ICAI Study Material's illustrations and practical problems (Paper 4, Ch. 10), real ICAI
   questions with their Suggested Answers (past paper May 2024 Q4(a), past paper Sep 2024 Case Scenario I, MTP March 2026 Series I Case
   Scenario 1), identities on thousands of random inputs (every account balances; FIFO and average differ by exactly the opening WIP's work
   done last period; the chain's costs equal what comes out of it), bad input, and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/process.js');
const { def } = LAB;

const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= (eps == null ? 1e-6 : eps))) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const base = () => Object.fromEntries(def.controls.map(c => [c.id, c.type === 'table' ? c.rows.map(r => r.slice()) : c.value]));
const run = vals => def.compute(Object.assign(base(), vals));
const loss = (lines, procs, extra) => run(Object.assign({ mode: 'loss', costLines: lines, processes: procs }, extra || {})).sim;
/* element rows written the Study Material's way [name, opening ₹, added ₹, opening WIP %, closing WIP %] → the lab's table and % lists */
const els5 = v => { if (!v.wipElements || v.wipElements[0].length < 5) return v; const e = v.wipElements; return Object.assign({}, v, { wipElements: e.map(r => r.slice(0, 3)), openPct: e.map(r => r[3]).join(', '), closePct: e.map(r => r[4]).join(', ') }); };
const wip = vals => run(Object.assign({ mode: 'wip' }, els5(vals))).sim;
const P = (S, name) => S.procs.find(p => p.name === name);

/* ---------------------------------------------------------------- mode 1: process accounts (SM Ch. 10 §3, Examples 1–4) */
const ex = output => loss([['I', 'Material', 5000, 40000], ['I', 'Wages', 0, 30000], ['I', 'Overhead', 0, 27000]], [['I', 5, 2, output, 0]]);
test('SM Ch. 10 Example 1: normal loss with no realisable value: 4,750 units transferred at ₹97,000', () => {
  const S = loss([['I', 'Material', 5000, 40000], ['I', 'Wages', 0, 30000], ['I', 'Overhead', 0, 27000]], [['I', 5, 0, 4750, 0]]);
  const p = S.procs[0];
  assert.equal(p.nlU, 250); assert.equal(p.nlV, 0); assert.equal(p.mainV, 97000); assert.equal(p.alU + p.agU, 0);
});
test('SM Ch. 10 Example 2: scrap ₹2 a unit: normal loss ₹500, transfer ₹96,500', () => {
  const p = ex(4750).procs[0];
  assert.equal(p.nlV, 500); assert.equal(p.mainV, 96500);
});
test('SM Ch. 10 Example 3: abnormal loss 200 units ₹4,063, transfer 4,550 units ₹92,437', () => {
  const p = ex(4550).procs[0];
  assert.equal(p.alU, 200); assert.equal(p.alV, 4063); assert.equal(p.mainV, 92437); assert.equal(p.drV, 97000);
});
test('SM Ch. 10 Example 4: abnormal gain 100 units ₹2,032 debited, transfer ₹98,532; the Abnormal Gain A/c sends ₹1,832 to the Costing P&L', () => {
  const S = ex(4850), p = S.procs[0];
  assert.equal(p.agU, 100); assert.equal(p.agV, 2032); assert.equal(p.mainV, 98532); assert.equal(p.drV, 99032); assert.equal(p.drU, 5100);
  assert.deepEqual(S.agAcc.dr.map(x => x.v), [200, 1832]); assert.equal(S.toPL_gain, 1832);
  assert.equal(p.nlV, 500, 'normal loss stays at its expected figure even though the actual loss was smaller');
});
test('SM Ch. 10 Illustration 2: three processes; 286, 55,714, 1,337 (gain), 91,051, 6,364, 1,10,687 exactly as the Study Material', () => {
  const S = run(def.presets.find(p => /Illustration 2/.test(p.label)).values).sim;
  const [a, b, c] = S.procs;
  assert.equal(a.alU, 50); assert.equal(a.alV, 286); assert.equal(a.mainV, 55714); near(a.rate, 5.7142, 1e-4);
  assert.equal(b.nlU, 488, '5 % of 9,750 = 487.5, rounded to 488 units as the Study Material does');
  assert.equal(b.agU, 138); assert.equal(b.agV, 1337); assert.equal(b.mainV, 91051); near(b.rate, 9.6862, 1e-4);
  assert.equal(c.nlU, 940); assert.equal(c.alU, 460); assert.equal(c.alV, 6364); assert.equal(c.mainV, 110687); near(c.rate, 13.8358, 1e-4);
});
test('SM Ch. 10 Illustration 3 (RST Ltd.): ₹96.7947 and ₹140.0496 a unit; the income statement\'s abnormal loss ₹6,322 and abnormal gain ₹18,459', () => {
  const S = run(def.presets.find(p => /Illustration 3/.test(p.label)).values).sim;
  const [a, b] = S.procs;
  assert.equal(a.nlV, 4688); near(a.rate, 96.7947, 1e-9);
  near(a.mainV, 682403, 1, 'transfer to Process II'); near(a.alV, 7259, 1, 'abnormal loss (ICAI makes it the balancing figure)');
  assert.equal(a.mainV + a.alV, 682403 + 7259, 'the two lines together are exactly ICAI\'s');
  assert.equal(b.nlV, 26438); near(b.rate, 140.0496, 1.1e-4); assert.equal(b.agU, 180); assert.equal(b.agV, 25209); near(b.mainV, 913824, 1);
  near(S.toPL_loss, 6322, 0.5); near(S.toPL_gain, 18459, 0.5);
});
test('SM Ch. 10 MCQ 3: 100 units, ₹160, normal loss 10 %, scrap ₹0.25, output 80: abnormal loss ₹17.50 (amounts kept to the paisa)', () => {
  const p = loss([['A', 'Cost', 100, 160]], [['A', 10, 0.25, 80, 0]], { rupees: false }).procs[0];
  assert.equal(p.nlV, 2.5); near(p.rate, 1.75); assert.equal(p.alV, 17.5);
});
test('SM Ch. 10 MCQ 2: 200 units in, normal loss 20, output 150: abnormal loss of 30 units', () => {
  assert.equal(loss([['A', 'Cost', 200, 2000]], [['A', 10, 0, 150, 0]]).procs[0].alU, 30);
});
test('ICAI past paper May 2024, Q4(a) (Meta Company, Processes P and Q): every figure of the Suggested Answer', () => {
  const S = run(def.presets.find(p => /May 2024/.test(p.label)).values).sim, p = P(S, 'P'), q = P(S, 'Q');
  assert.equal(p.cost, 980600); assert.equal(p.nlU, 600); assert.equal(p.nlV, 3000); assert.equal(p.rate, 104);
  assert.equal(p.alU, 200); assert.equal(p.alV, 20800); assert.equal(p.passU, 6900); assert.equal(p.mainV, 717600); assert.equal(p.soldU, 2300); assert.equal(p.soldV, 239200);
  assert.equal(q.cost, 986700); assert.equal(q.nlU, 690); assert.equal(q.nlV, 5520); assert.equal(q.rate, 158); assert.equal(q.agU, 190); assert.equal(q.agV, 30020);
  assert.equal(q.mainV, 1011200); assert.equal(q.drV, 1016720); assert.equal(q.drU, 7090);
  assert.deepEqual(S.alAcc.cr.map(x => x.v), [1000, 19800], 'Abnormal Loss A/c: By Bank 1,000, By Costing P&L 19,800');
  assert.deepEqual(S.agAcc.dr.map(x => x.v), [1520, 28500], 'Abnormal Gain A/c: To Normal Loss 1,520, then the Costing P&L');
});

/* ---------------------------------------------------------------- mode 2: equivalent production (SM Ch. 10 §4–6) */
const ill4 = (method, dp) => wip({ method, rateDp: dp, openUnits: 1000, introduced: 10000, completed: 9000, closeUnits: 800, nlPct: 10, nlBase: 'total', scrap: 10, abBasis: 'full', wipElements: [['Process cost', 110000, 1930000, 60, 75]] });
test('percentage lists: one per element, or one for all; a wrong count or a bad number is refused', () => {
  const E = [{ name: 'M' }, { name: 'L' }, { name: 'O' }];
  assert.deepEqual(LAB.pctList('100, 40, 40', E, 'x'), [100, 40, 40]);
  assert.deepEqual(LAB.pctList('60', E, 'x'), [60, 60, 60]);
  assert.deepEqual(LAB.pctList('100;50 50', E, 'x'), [100, 50, 50]);
  assert.throws(() => LAB.pctList('100, 40', E, 'opening WIP'), /3 percentages for the opening WIP/);
  assert.throws(() => LAB.pctList('100, 140, 40', E, 'x'), /0 to 100/);
  assert.throws(() => LAB.pctList('', E, 'x'), /0 to 100/);
});
test('SM Ch. 10 Illustration 4 (FIFO): EU 9,100, ₹210.88; 84,352 + 1,10,000 = 1,94,352; 16,87,040; abnormal loss 21,088; closing WIP 1,26,528', () => {
  const E = ill4('fifo', '2');
  assert.equal(E.NL, 1100); assert.equal(E.AL, 100); assert.equal(E.EU[0], 9100); assert.equal(E.R[0], 210.88);
  assert.equal(E.openWork, 84352); assert.equal(E.openTotal, 194352); assert.equal(E.freshV, 1687040); assert.equal(E.alV, 21088); assert.equal(E.closeV, 126528);
  assert.equal(E.diff, -8, '"The difference in total amount may arise due to rounding off error"');
  const X = ill4('fifo', 'exact');
  near(X.R[0], 1919000 / 9100); assert.equal(X.diff, 0, 'with the exact rate the account balances to the rupee');
});
test('SM Ch. 10 Illustration 5 (weighted average): EU 9,700, ₹209.18; 18,82,620; abnormal loss 20,918; closing WIP 1,25,508', () => {
  const E = ill4('avg', '2');
  assert.equal(E.EU[0], 9700); assert.equal(E.R[0], 209.18); assert.equal(E.transfer, 1882620); assert.equal(E.alV, 20918); assert.equal(E.closeV, 125508);
});
test('SM Ch. 10 Practical Problem 1 (cricket bats): EU 10,000 and 8,500; ₹3.30 and ₹2.00; closing WIP ₹7,600; finished ₹42,400', () => {
  const E = wip({ method: 'avg', openUnits: 0, introduced: 10000, completed: 8000, closeUnits: 2000, nlPct: 0, scrap: 0, wipElements: [['Material', 0, 33000, 0, 100], ['Conversion', 0, 17000, 0, 25]] });
  assert.deepEqual(E.EU, [10000, 8500]); near(E.R[0], 3.3); near(E.R[1], 2); assert.equal(E.closeV, 7600); assert.equal(E.transfer, 42400);
  const F = wip({ method: 'fifo', openUnits: 0, introduced: 10000, completed: 8000, closeUnits: 2000, nlPct: 0, scrap: 0, wipElements: [['Material', 0, 33000, 0, 100], ['Conversion', 0, 17000, 0, 25]] });
  assert.equal(F.transfer, E.transfer, 'with no opening WIP, FIFO and average agree');
});
test('SM Ch. 10 Practical Problem 2 (Hill Manufacturing, FIFO): material EU 1,04,000; conversion EU 98,400 at ₹5.83', () => {
  const E = wip({ method: 'fifo', openUnits: 16000, introduced: 100000, completed: 92000, closeUnits: 24000, nlPct: 0, scrap: 0,
    wipElements: [['Material', 27670, 479000, 60, 90], ['Labour', 30120, 182880, 20, 40], ['Factory overhead', 12720, 391160, 20, 40]] });
  assert.equal(E.EU[0], 104000); assert.equal(E.EU[1], 98400); assert.equal(E.EU[2], 98400);
  near(E.R[1] + E.R[2], 5.83, 0.005);
});
test('SM Ch. 10 Practical Problem 3 (average, closing WIP 33⅓ % converted): EU 20,000 and 16,000; ₹1.58, ₹1, ₹1; 50,120 and 13,480', () => {
  const E = wip({ method: 'avg', openUnits: 4000, introduced: 16000, completed: 14000, closeUnits: 6000, nlPct: 0, scrap: 0,
    wipElements: [['Materials', 6000, 25600, 100, 100], ['Labour', 1000, 15000, 25, 100 / 3], ['Overhead', 1000, 15000, 25, 100 / 3]] });
  near(E.EU[0], 20000); near(E.EU[1], 16000, 1e-3); near(E.R[0], 1.58); near(E.R[1], 1, 1e-6);
  assert.equal(E.transfer, 50120); assert.equal(E.closeV, 13480);
});
test('SM Ch. 10 Practical Problem 4 (XYZ Co., average; scrap ₹20 from materials): ₹40 + ₹10 + ₹30; 28,00,000; abnormal loss 72,000; closing WIP 1,44,000', () => {
  const E = run(def.presets.find(p => /Practical Problem 4/.test(p.label)).values).sim;
  assert.equal(E.NL, 2000); assert.equal(E.scrapV, 40000); assert.equal(E.AL, 1000);
  assert.deepEqual(E.EU, [38000, 37400, 37400]); assert.deepEqual(E.R, [40, 10, 30]);
  assert.equal(E.transfer, 2800000); assert.equal(E.alV, 72000); assert.equal(E.closeV, 144000); assert.equal(E.drV, 3056000);
});
test('SM Ch. 10 Practical Problem 5, Process I: EU 40,000 / 35,000 / 35,000; closing WIP ₹8,035, transfer ₹36,965', () => {
  const E = wip({ method: 'avg', openUnits: 0, introduced: 40000, completed: 30000, closeUnits: 10000, nlPct: 0, scrap: 0,
    wipElements: [['Direct material', 0, 15000, 0, 100], ['Direct wages', 0, 18000, 0, 50], ['Factory overheads', 0, 12000, 0, 50]] });
  assert.deepEqual(E.EU, [40000, 35000, 35000]); near(E.closeV, 8035, 1); near(E.transfer, 36965, 1); assert.equal(E.closeV + E.transfer, 45000);
});
test('ICAI past paper Sep 2024, Case Scenario I (Sagar Ltd., FIFO, MCQs 1–5): 72,770 EU at ₹6.50; 74,079 EU at ₹9.00; ₹2,176; ₹12,72,800; ₹30,940', () => {
  const E = run(def.presets.find(p => /Sep 2024/.test(p.label)).values).sim;
  assert.equal(E.NL, 1730, '2 % of total input including opening WIP'); assert.equal(E.AL, 170);
  assert.equal(E.EU[0], 72770); near(E.R[0], 6.5); assert.equal(E.EU[1], 74079); near(E.R[1] + E.R[2], 9);
  assert.equal(E.alV, 2176, 'MCQ 3 (A)'); assert.equal(E.transfer, 1272800, 'MCQ 4 (D)'); assert.equal(E.closeV, 30940, 'MCQ 5 (C)');
});
test('ICAI MTP March 2026 (Series I), Case Scenario 1: FIFO EU for material 5,100 (MCQ 1); labour ₹65 per EU (MCQ 2); material ₹58, overheads ₹36', () => {
  const E = run(def.presets.find(p => /MTP March 2026/.test(p.label)).values).sim;
  assert.equal(E.NL, 900); assert.equal(E.scrapV, 4200); assert.equal(E.AL + E.AG, 0);
  assert.deepEqual(E.EU, [5100, 4860, 4860]); near(E.R[0], 58); near(E.R[1], 65); near(E.R[2], 36);
});
test('abnormal gain with WIP: 100 % complete, deducted from equivalent units, debited to the process', () => {
  const E = wip({ method: 'avg', openUnits: 0, introduced: 10000, completed: 9300, closeUnits: 0, nlPct: 10, nlBase: 'fresh', scrap: 5, abBasis: 'close', wipElements: [['Material', 0, 905000, 100, 100]] });
  assert.equal(E.AG, 300); assert.equal(E.EU[0], 9000); near(E.R[0], 100); assert.equal(E.agV, 30000); assert.equal(E.transfer, 930000);
  assert.equal(E.drV, 935000); assert.equal(E.diff, 0);
});
test('abnormal loss completion: 100 %, as closing WIP, or the stage given', () => {
  const v = { method: 'avg', openUnits: 0, introduced: 1000, completed: 700, closeUnits: 200, nlPct: 0, scrap: 0, wipElements: [['M', 0, 10000, 0, 100], ['C', 0, 9000, 0, 50]] };
  assert.deepEqual(wip(Object.assign({ abBasis: 'full' }, v)).EU, [1000, 900]);
  assert.deepEqual(wip(Object.assign({ abBasis: 'close' }, v)).EU, [1000, 850]);
  assert.deepEqual(wip(Object.assign({ abBasis: 'own', abPct: '100, 20' }, v)).EU, [1000, 820]);
  assert.deepEqual(LAB.abnormalPct([{ w: 1 }, { w: 2 }], 'own', '60'), [60, 60], 'one number applies to every element');
});

/* ---------------------------------------------------------------- identities on random inputs */
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
test('random chains (2 000): every process account balances, the chain\'s costs equal everything that comes out, and the abnormal loss is the textbook formula', () => {
  const rnd = lcg(7);
  for (let k = 0; k < 2000; k++) {
    const n = 1 + Math.floor(rnd() * 3), procs = [], lines = [];
    let units = 1000 + Math.floor(rnd() * 20000);
    for (let i = 0; i < n; i++) {
      const name = ['I', 'II', 'III'][i], nl = Math.floor(rnd() * 15), extra = i && rnd() < 0.3 ? Math.floor(rnd() * 2000) : 0;
      if (i === 0) lines.push([name, 'Material', units, Math.floor(units * (5 + rnd() * 50))]); else if (extra) lines.push([name, 'Added material', extra, extra * 7]);
      lines.push([name, 'Wages', 0, Math.floor(rnd() * 90000)], [name, 'Overheads', 0, Math.floor(rnd() * 60000)]);
      const input = units + extra, nlU = Math.round(input * nl / 100);
      const out = Math.max(1, Math.min(input, input - nlU + Math.round((rnd() - 0.6) * input * 0.06)));
      const pass = i < n - 1 && rnd() < 0.25 ? Math.max(1, Math.floor(out * 0.8)) : 0;
      procs.push([name, nl, Math.floor(rnd() * 8), out, pass]);
      units = pass || out;
    }
    const rupees = rnd() < 0.7, S = loss(lines, procs, { rupees, rateDp: rnd() < 0.2 ? '2' : 'exact' });
    let inV = lines.reduce((a, l) => a + l[3], 0), outV = 0;
    S.procs.forEach((p, i) => {
      const dr = p.dr.reduce((a, x) => a + x.v, 0), cr = p.cr.reduce((a, x) => a + x.v, 0);
      near(dr, cr, 1e-6, `process ${p.name} balances`);
      near(p.dr.reduce((a, x) => a + (x.u || 0), 0), p.cr.reduce((a, x) => a + (x.u || 0), 0), 1e-9, 'units balance');
      if (p.alU && S.dp === 0) near(p.alV, ((p.cost - p.nlV) / (p.input - p.nlU)) * p.alU, rupees ? 0.5 : 0.005, 'abnormal loss = (cost − scrap) ÷ (input − normal loss) × units');
      inV += p.agV; outV += p.nlV + p.alV + p.soldV + (i === S.procs.length - 1 ? p.mainV : 0);
    });
    near(inV, outV, 1e-6, 'costs in + abnormal gains = scrap + abnormal losses + finished stock');
  }
});
test('random WIP problems (3 000): the process account balances (to its rounding line), input = output in units, and average EU − FIFO EU = the opening WIP\'s work done last period', () => {
  const rnd = lcg(11);
  for (let k = 0; k < 3000; k++) {
    const O = Math.floor(rnd() * 5000), I = 1000 + Math.floor(rnd() * 50000), nl = Math.floor(rnd() * 12), base = rnd() < 0.5 ? 'fresh' : 'total';
    const NL = Math.round((base === 'total' ? O + I : I) * nl / 100), W = Math.floor(rnd() * 0.3 * (O + I - NL));
    const AB = Math.round((rnd() - 0.4) * 0.05 * I), C = Math.max(O, Math.min(O + I - W, O + I - NL - W - AB));
    const ne = 1 + Math.floor(rnd() * 3), els = Array.from({ length: ne }, (_, j) => ['E' + j, Math.floor(rnd() * 90000), 1000 + Math.floor(rnd() * 900000), Math.floor(rnd() * 101), Math.floor(rnd() * 101)]);
    const v = els5({ openUnits: O, introduced: I, completed: C, closeUnits: W, nlPct: nl, nlBase: base, scrap: Math.floor(rnd() * 20), abBasis: ['full', 'close'][Math.floor(rnd() * 2)], wipElements: els, rupees: rnd() < 0.8 });
    let F, A;
    try { F = wip(Object.assign({ method: 'fifo' }, v)); A = wip(Object.assign({ method: 'avg' }, v)); }
    catch (e) { if (/no equivalent units|cannot be fewer|more than the units/.test(e.message)) continue; throw e; }
    for (const E of [F, A]) {
      assert.equal(E.O + E.I, E.rows.reduce((a, r) => a + r.units, 0), 'units: input = output');
      near(E.drV, E.scrapV + E.alV + E.accTransfer + E.closeV, 1e-6, 'the process account balances');
      assert.ok(Math.abs(E.diff) <= 2, 'the rounding line moves at most a couple of rupees: ' + E.diff);
    }
    F.els.forEach((e, j) => near(A.EU[j] - F.EU[j], O * e.o / 100, 1e-6, 'EU(avg) − EU(FIFO) = opening WIP × its % complete'));
    const exactF = wip(Object.assign({}, v, { method: 'fifo', rupees: false }));
    near(exactF.openCost + exactF.addedCost + exactF.agV, exactF.scrapV + exactF.alV + exactF.transfer + exactF.closeV, 0.05, 'to the paisa the costs are fully accounted for');
  }
});

/* ---------------------------------------------------------------- bad input */
test('bad input fails with a message that says what to fix', () => {
  assert.throws(() => loss([], []), /at least one process/);
  assert.throws(() => loss([['I', 'M', 100, 1000]], [['I', 100, 0, 50, 0]]), /percentage/);
  assert.throws(() => loss([['I', 'M', 100, 1000]], [['I', 5, 0, 150, 0]]), /cannot be more than the units put in/);
  assert.throws(() => loss([['X', 'M', 100, 1000]], [['I', 5, 0, 90, 0]]), /not in the processes table/);
  assert.throws(() => loss([['I', 'Wages', 0, 1000]], [['I', 5, 0, 90, 0]]), /no units put in/);
  assert.throws(() => loss([['I', 'M', 100, 1000]], [['I', 5, 0, 90, 0], ['i', 5, 0, 80, 0]]), /own name/);
  assert.throws(() => loss([['I', 'M', 100, 1000]], [['I', 5, 0, 90, 95], ['II', 5, 0, 80, 0]]), /cannot pass on/);
  const w = { method: 'fifo', openUnits: 500, introduced: 1000, completed: 400, closeUnits: 100, nlPct: 0, scrap: 0, wipElements: [['M', 0, 1000, 50, 50]] };
  assert.throws(() => wip(w), /FIFO/);
  assert.throws(() => wip(Object.assign({}, w, { completed: 1400, closeUnits: 300 })), /more than the units available/);
  assert.throws(() => wip(Object.assign({}, w, { completed: 900, abBasis: 'own', abPct: '100, 50' })), /1 percentages|one per cost element/);
  assert.throws(() => wip(Object.assign({}, w, { completed: 500, closeUnits: 1000, wipElements: [['M', 0, 1000, 100, 0]] })), /no equivalent units/);
});

/* ---------------------------------------------------------------- every example and the challenge */
test('every example computes, every frame draws, captions say why (no undefined / NaN), frames stay under 120', () => {
  for (const p of def.presets) {
    const r = run(p.values);
    assert.ok(r.frames.length >= 6 && r.frames.length <= 120, p.label + ': ' + r.frames.length + ' frames');
    r.frames.forEach((f, i) => {
      assert.ok(typeof f.caption === 'string' && f.caption.length > 20, `${p.label} #${i} caption`);
      assert.ok(!/undefined|NaN|\[object/.test(f.caption), `${p.label} #${i}: ${f.caption}`);
      f.view.forEach(x => { const html = x.html != null ? x.html : diagram.render(x); assert.ok(!/undefined|NaN/.test(html.replace(/<[^>]+>/g, ' ')), `${p.label} #${i} ${x.type}`); });
    });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, p.label + ' tiles');
    r.stats.forEach(s => assert.ok(!/undefined|NaN/.test(String(s.value)), p.label + ' ' + s.label));
  }
  const labels = def.presets.map(p => p.label);
  assert.ok(labels.filter(l => /ICAI/.test(l)).length >= 2 && labels.some(l => /Tapri/.test(l)), 'Tapri and ICAI examples');
});
test('the default inputs are the Tapri premix example and give clean numbers (₹95 a unit, 200 units abnormal loss ₹19,000)', () => {
  const S = run({}).sim, p = S.procs[0];
  assert.equal(p.rate, 95); assert.equal(p.alU, 200); assert.equal(p.alV, 19000); assert.equal(p.mainV, 883500);
  const E = run({ mode: 'wip' }).sim;
  assert.deepEqual(E.R, [21, 10, 7]); assert.equal(E.transfer, 630400); assert.equal(E.closeV, 46800); assert.equal(E.alV, 22800);
});
test('a two-sided account has its phone twin: the same lines stacked Dr then Cr, the same totals', () => {
  const r = run(def.presets.find(p => /May 2024/.test(p.label)).values), last = r.frames[r.frames.length - 1].view;
  const wide = last.filter(x => /pc-wide/.test(x.html || '')), narrow = last.filter(x => /pc-narrow/.test(x.html || ''));
  assert.equal(wide.length, narrow.length); assert.ok(wide.length >= 3);
  const nums = h => (h.replace(/<[^>]+>/g, ' ').match(/\d[\d,]*/g) || []).sort().join(' ');
  wide.forEach((w, i) => assert.equal(nums(w.html), nums(narrow[i].html), 'the twins show the same figures'));
});
test('challenge: 300 problems per mode compute, have an exact whole-rupee answer, and the test picture shows only the given data', () => {
  for (const mode of ['loss', 'wip']) {
    for (let s = 1; s <= 300; s++) {
      const v = Object.assign(base(), { mode }, def.challenge.gen(GA.util.rng(s * 977)));
      const res = def.compute(v), want = def.challenge.solve(res, v);
      assert.ok(Number.isFinite(want) && want > 0, `${mode}#${s}: ${want}`);
      near(want, Math.round(want), 1e-6, `${mode}#${s} whole rupees`);
      const view = def.challenge.view(res, v);
      assert.ok(Array.isArray(view) && view.length >= 1);
      assert.ok(def.challenge.prompt(v, res).length > 20);
      assert.ok(/₹/.test(def.challenge.explain(res, v)));
    }
  }
});
