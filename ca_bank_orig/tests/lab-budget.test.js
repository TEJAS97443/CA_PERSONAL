/* Budget Lab (app/js/labs/budget.js): the flexible budget, the cash budget and the production / purchase budgets against the ICAI Study
   Material (Paper 4, ch. 15, July 2024 edition), ICAI papers with their Suggested Answers, and identities on random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const L = require('../app/js/labs/framework.js');
const B = require('../app/js/labs/budget.js');
const { flexibleBudget, cashBudget, functionalBudget, parseLine, parseLevels, compute, def } = B;
const near = (a, b, eps = 0.006) => { if (!(Math.abs(a - b) <= eps)) throw new Error(`expected ${b}, got ${a}`); };
const nearAll = (a, b, eps) => { assert.equal(a.length, b.length, `${a} vs ${b}`); a.forEach((x, i) => near(x, b[i], eps)); };
const flex = (lines, o) => flexibleBudget(lines.join('\n'), Object.assign({ cap: 0, base: 0, price: 0, unit: 'units', actLevel: 0 }, o));
const cash = (flows, o) => cashBudget(flows.join('\n'), o);
const run = vals => compute(L.prepare(def, Object.assign(L._defaults(def), vals)));
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ================================================================ flexible budget */
test('SM Illustration 1 (7,000 hours = 70%): total ₹4,260, ₹4,440, ₹4,740, ₹5,040; semi-variable steps to ₹1,320 above 85% and ₹1,440 above 95%; recovery rate 0.61 → 0.50', () => {
  const R = flex(['Variable expenses: variable 1260 in total', 'Semi-variable expenses: semi 1200, +10% above 85%, +20% above 95%', 'Fixed expenses: fixed 1800'], { cap: 10000, base: 7000, levels: '70%, 80%, 90%, 100%' });
  nearAll(R.levels.map(l => l.units), [7000, 8000, 9000, 10000]);
  nearAll(R.lines[0].at, [1260, 1440, 1620, 1800]); nearAll(R.lines[1].at, [1200, 1200, 1320, 1440]);
  nearAll(R.total, [4260, 4440, 4740, 5040]);
  nearAll(R.perUnit.map(x => Math.round(x * 100) / 100), [0.61, 0.56, 0.53, 0.5]);   // the SM prints 0.55 for 4,440 ÷ 8,000 = 0.555 (cut, not rounded)
  near(R.perUnit[1], 0.555, 1e-9);
});
test('SM Illustration 2 (sales ₹6,00,000 at 80%): administration, selling and distribution costs ₹2,35,250 / ₹2,49,500 / ₹2,63,750 / ₹2,78,000 at 80 / 90 / 100 / 110%', () => {
  /* the SM gives sales, not units: 7,500 units of ₹100 at 100% reproduce its sales of ₹6,00,000 at 80% */
  const R = flex(['Office salaries: fixed 90000', 'General expenses: 2% of sales', 'Depreciation: fixed 7500', 'Rent and rates: fixed 8750', 'Selling salaries: 8% of sales', 'Travelling: 2% of sales',
    'Sales office: 1% of sales', 'General selling expenses: 1% of sales', 'Distribution wages: fixed 15000', 'Distribution rent: 1% of sales', 'Other distribution expenses: 4% of sales'], { cap: 7500, base: 6000, price: 100, levels: '80%, 90%, 100%, 110%' });
  nearAll(R.sales, [600000, 675000, 750000, 825000]);
  nearAll(R.total, [235250, 249500, 263750, 278000]);
  nearAll(R.lines[4].at, [48000, 54000, 60000, 66000]);
});
test('SM Illustration 3 (Action Plan, normal 8,000 units, actual 6,000): high-low splits ₹0.025 + ₹400 and ₹0.0375 + ₹500; flexible budget ₹4,705 against actual ₹4,990, ₹285 over; no bonus', () => {
  const R = flex(['Salary of foreman: fixed 1000, actual 1000', 'Indirect labour: variable 720 in total, actual 600', 'Indirect material: variable 800 in total, actual 700', 'Repairs and maintenance: semi 600, 650 at 10000, actual 600',
    'Power: semi 800, 875 at 10000, actual 740', 'Tools consumed: variable 320 in total, actual 300', 'Rates and taxes: fixed 150, actual 150', 'Depreciation: fixed 800, actual 800', 'Insurance: fixed 100, actual 100'], { base: 8000, levels: '6000 8000 10000', actLevel: 6000 });
  near(R.lines[3].rate, 0.025, 1e-12); near(R.lines[3].fixed, 400); near(R.lines[4].rate, 0.0375, 1e-12); near(R.lines[4].fixed, 500);
  nearAll(R.lines.map(l => l.at[0]), [1000, 540, 600, 550, 725, 240, 150, 800, 100]);
  nearAll(R.total, [4705, 5290, 5875]);                                 // 5,290 = the normal month and 5,875 = January's plan, both as the SM gives them
  near(R.actual.budget, 4705); near(R.actual.total, 4990); near(R.actual.diff, -285);
  nearAll(R.actual.rows.map(r => r.actual - r.budget), [0, 60, 100, 50, 15, 60, 0, 0, 0]);
  const c = run({ mode: 'flexible', unit: 'units', cap: 0, base: 8000, price: 0, levels: '6000', actLevel: 6000, lines: def.presets.find(p => /Illustration 3/.test(p.label)).values.lines });
  assert.match(c.frames[c.frames.length - 1].caption, /₹285 overspent/);
  assert.equal(c.stats[c.stats.length - 1].value, '₹285 A');
});
test('ICAI PYQ September 2024 Q3(b) (Savi Ltd, 96,000 units at 80%): total cost ₹44,16,800 / ₹51,46,400 / ₹58,76,000 and profit ₹42,23,200 / ₹63,73,600 / ₹85,24,000', () => {
  const R = flex(['Direct variable cost: variable 20', 'Factory overheads: semi 8,40,000, 20% fixed', 'Administrative overheads: fixed 20,60,000', 'Sales commission: 2% of sales', 'Transportation: step 4000 per 4000'], { cap: 120000, base: 96000, price: 120, levels: '60%, 80%, 100%' });
  near(R.lines[1].rate, 7); near(R.lines[1].fixed, 168000); near(R.lines[3].rate, 2.4); nearAll(R.lines[4].at, [72000, 96000, 120000]);
  nearAll(R.total, [4416800, 5146400, 5876000]); nearAll(R.profit, [4223200, 6373600, 8524000]);
});
test('ICAI PYQ May 2025 Q5(c) (college trip, 50 students a bus): total ₹1,27,200 / ₹2,51,400 / ₹3,74,400 / ₹4,98,000; average ₹424 / ₹419 / ₹416 / ₹415', () => {
  const R = flex(['Breakfast: variable 55', 'Lunch: variable 120', 'Evening tea and snacks: variable 40', 'Zoo entrance: variable 25', 'Bus hire: step 6000 per 50', 'Special permit fees: step 500 per 50',
    "Teachers' allowance: step 2000 per 50", 'Museum block entrance: fixed 2000, 3000 above 300, 3500 above 900', 'Prizes: fixed 2200, 2400 above 300, 2500 above 900'], { unit: 'students', levels: '300 600 900 1200' });
  nearAll(R.levels.map(l => R.lines[4].blocks(l.units)), [6, 12, 18, 24]);
  nearAll(R.lines[7].at, [2000, 3000, 3000, 3500]); nearAll(R.lines[8].at, [2200, 2400, 2400, 2500]);
  nearAll(R.total, [127200, 251400, 374400, 498000]); nearAll(R.perUnit, [424, 419, 416, 415]);
  assert.equal(R.lines[4].blocks(301), 7, 'one student over a busload needs another bus');
});
test('reading the lines and levels: Indian and western grouping, % or units, and plain errors', () => {
  nearAll(parseLevels('72,000, 96,000 1,20,000').map(l => l.units), [72000, 96000, 120000]);
  nearAll(parseLevels('60%, 80%', 50000).map(l => l.units), [30000, 40000]);
  assert.throws(() => parseLevels('60%', 0), /capacity/);
  assert.throws(() => parseLevels(''), /activity levels/);
  assert.throws(() => parseLevels('1 2 3 4 5 6 7'), /at most 6/);
  const ctx = { cap: 1000, base: 800, price: 10, line: 1 };
  near(parseLine('Power: semi 8,40,000, 25% variable', Object.assign({}, ctx, { base: 1000 })).fixed, 630000);
  near(parseLine('Repairs: semi 600, fixed 400', ctx).rate, 0.25);
  near(parseLine('Repairs: semi 600, 650 at 100%', ctx).rate, 0.25);
  near(parseLine('Commission: 5% of sales', ctx).rate, 0.5);
  near(parseLine('Supervision: fixed 1000, +50% above 90%', ctx).cost(950), 1500);
  near(parseLine('Supervision: fixed 1000, +50% above 90%', ctx).cost(900), 1000);
  assert.throws(() => parseLine('Rent fixed 100', ctx), /colon/);
  assert.throws(() => parseLine('Rent: monthly 100', ctx), /start with fixed/);
  assert.throws(() => parseLine('Power: semi 800', ctx), /how to split/);
  assert.throws(() => parseLine('Power: semi 800, 900 at 800', ctx), /must differ/);
  assert.throws(() => parseLine('Vans: step 15000', ctx), /step 6500 per 50/);
  assert.throws(() => parseLine('Commission: 2% of sales', Object.assign({}, ctx, { price: 0 })), /selling price/);
  assert.throws(() => parseLine('Labour: variable 720 in total', Object.assign({}, ctx, { base: 0 })), /base level/);
  assert.throws(() => flex(['A: fixed 1', 'a: fixed 2'], { levels: '10' }), /different name/);
  assert.throws(() => flex(['A: fixed 1'], { levels: '10', actLevel: 10 }), /actual cost/);
});
test('random flexible budgets (2,000): every split reproduces the given costs, totals are the sum of the lines, and a budget of fixed and variable lines is a straight line', () => {
  const r = lcg(424242), R = (a, b) => a + r() * (b - a), I = (a, b) => Math.floor(R(a, b + 1));
  for (let k = 0; k < 2000; k++) {
    const cap = I(100, 1e6), base = cap * R(0.3, 1.2), l2 = cap * R(0.3, 1.2);
    if (Math.abs(l2 - base) < 1) continue;
    const c1 = R(1000, 1e6), c2 = c1 * R(0.8, 1.5), f = R(0, 100), v1 = R(0.1, 50), fx = R(0, 1e6);
    const lines = [`Hi-lo: semi ${c1.toFixed(2)}, ${c2.toFixed(2)} at ${l2.toFixed(2)}`, `Share: semi ${c1.toFixed(2)}, ${f.toFixed(2)}% fixed`, `Var: variable ${v1.toFixed(2)}`, `Fix: fixed ${fx.toFixed(2)}`];
    const lv = [I(1, 60), I(61, 120), I(121, 200)];
    const B2 = flex(lines, { cap, base, levels: lv.map(x => x + '%').join(', ') });
    const [hl, sh] = B2.lines;
    near(hl.cost(base), +c1.toFixed(2), 1e-6 * c1); near(hl.cost(hl.l2), +c2.toFixed(2), 1e-6 * c2 + 1e-6); near(hl.l2, +l2.toFixed(2), 1e-9);
    near(sh.cost(base), +c1.toFixed(2), 1e-6 * c1); near(sh.fixed, (+c1.toFixed(2) * +f.toFixed(2)) / 100, 1e-6 * c1);
    B2.levels.forEach((L2, i) => near(B2.total[i], B2.lines.reduce((s, l) => s + l.cost(L2.units), 0), 1e-6 * (1 + Math.abs(B2.total[i]))));
    const slope = (B2.total[2] - B2.total[0]) / (B2.levels[2].units - B2.levels[0].units);
    near(slope, hl.rate + sh.rate + +v1.toFixed(2), 1e-6 * (1 + Math.abs(slope)));
  }
});

/* ================================================================ cash budget */
const BRICKS = ['Cash sales: in 5,40,000 5,40,000 5,85,000 6,75,000 7,20,000 8,10,000', 'Credit sales: in 22,50,000 22,50,000 22,50,000 23,40,000 23,40,000 25,20,000; collected 0 80 10 8',
  'Credit purchases: out 15,30,000 16,20,000 16,20,000 18,00,000 18,00,000 18,00,000; paid 0 75 25', 'Other operating costs: out 8,10,000 8,10,000 8,10,000 10,98,000 11,07,000 11,07,000',
  'Pallet jacks: out Jul 9,00,000; paid 0 25 25 25 25'];
test('ICAI MTP May 2025 Series II Q5(b) (Bricks & Cement): credit sales ₹22,05,000 / ₹22,77,000 / ₹22,86,000; purchases ₹16,20,000 / ₹17,55,000 / ₹18,00,000; closing ₹2,97,000 / ₹2,07,000 / ₹1,71,000', () => {
  const C = cash(BRICKS, { months: 'Apr May Jun Jul Aug Sep', hist: 3, open: 135000, minBal: 0 });
  assert.deepEqual(C.B, ['Jul', 'Aug', 'Sep']);
  nearAll(C.flows[1].cash, [2205000, 2277000, 2286000]); nearAll(C.flows[2].cash, [1620000, 1755000, 1800000]); nearAll(C.flows[4].cash, [0, 225000, 225000]);
  nearAll(C.rec, [2880000, 2997000, 3096000]); nearAll(C.pay, [2718000, 3087000, 3132000]); nearAll(C.net, [162000, -90000, -36000]);
  nearAll(C.opening, [135000, 297000, 207000]); nearAll(C.closing, [297000, 207000, 171000]);
  near(C.flows[1].lost, 2);                                                       // 2% written off as bad debts
  /* the working note of credit sales, as the answer prints it: April 8% in July; May 10% in July, 8% in August; … */
  assert.deepEqual(C.flows[1].note.map(r => [r.month, r.parts.map(x => (x == null ? null : Math.round(x)))]),
    [['Apr', [180000, null, null]], ['May', [225000, 180000, null]], ['Jun', [1800000, 225000, 180000]], ['Jul', [null, 1872000, 234000]], ['Aug', [null, null, 1872000]]]);
});
test('ICAI MTP January 2025 Series I Q4(b) (Anu Ltd): receipts, materials, overheads and wages month by month, closing ₹4,00,000 to ₹2,65,000 through an overdraft of ₹15,60,000', () => {
  const v = def.presets.find(p => /Anu Ltd/.test(p.label)).values;
  const C = cashBudget(v.flows, v);
  nearAll(C.flows[0].cash, [3000000, 3000000, 3375000, 4125000, 5250000, 5850000]);
  nearAll(C.flows[1].cash, [1000000, 1250000, 1500000, 2000000, 1900000, 2200000]);
  nearAll(C.flows[2].cash, [500000, 600000, 800000, 760000, 1100000, 1100000]);
  nearAll(C.flows[3].cash, [1150000, 1500000, 1825000, 2125000, 2200000, 2275000]);
  nearAll(C.pay, [2650000, 3350000, 4225000, 4885000, 5200000, 6075000]);
  nearAll(C.net, [350000, -350000, -850000, -760000, 50000, 1775000]);
  nearAll(C.closing, [400000, 50000, -800000, -1560000, -1510000, 265000]);
  near(Math.max(...C.short), 1560000);
});
test('cash: a cash discount reduces only its part, unpaid percentages are bad debts, and month-keyed one-offs land in their month', () => {
  const C = cash(['Sales: in 20,00,000 22,00,000 25,00,000; collected 20 (2% discount) 50 28', 'Tax: out Mar 50,000'], { months: 'Jan Feb Mar', hist: 2, open: 0, minBal: 0 });
  near(C.flows[0].cash[0], 0.2 * 2500000 * 0.98 + 0.5 * 2200000 + 0.28 * 2000000); near(C.flows[0].disc[0], 0.2 * 2500000 * 0.02); near(C.flows[0].lost, 2);
  nearAll(C.flows[1].cash, [50000]);
  const T = run({ mode: 'cash' }).sim.C;                                          // Tapri, August: worked by hand
  near(T.rec[0], 2150000); near(T.pay[0], 1775000); near(T.closing[0], 575000); near(Math.max(...T.short), 129000);
});
test('cash: plain errors for months, amounts and patterns', () => {
  const o = { months: 'Jan Feb Mar', hist: 1, open: 0, minBal: 0 };
  assert.throws(() => cash(['Sales 100 200'], o), /colon/);
  assert.throws(() => cash(['Sales: 100 200'], o), /"in"/);
  assert.throws(() => cash(['Sales: in 1 2 3 4'], o), /4 amounts but only 3 months/);
  assert.throws(() => cash(['Tax: out Dec 100'], o), /not one of the months/);
  assert.throws(() => cash(['Sales: in 1 2 3; collected 60 50'], o), /more than 100%/);
  assert.throws(() => cash(['Sales: in 1 2 3; maybe 60 40'], o), /pattern/);
  assert.throws(() => cash(['Sales: in 1 2 3'], Object.assign({}, o, { hist: 3 })), /at least one month/);
  assert.throws(() => cash(['A: in 1', 'a: out 1'], o), /different name/);
});
test('random cash budgets (2,000): each closing balance = opening + receipts − payments, each flow\'s cash equals an independent month-by-month spreading of its amounts', () => {
  const r = lcg(777), I = (a, b) => a + Math.floor(r() * (b - a + 1));
  const NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  for (let k = 0; k < 2000; k++) {
    const n = I(2, 8), hist = I(0, n - 1), months = NAMES.slice(0, n), flows = [];
    const nf = I(1, 5);
    for (let f = 0; f < nf; f++) {
      const len = I(1, 4); let left = 100; const pat = [];
      for (let q = 0; q < len; q++) { const p = q === len - 1 ? (r() < 0.7 ? left : I(0, left)) : I(0, left); pat.push(p); left -= p; }
      const amts = months.map(() => I(0, 500) * 100);
      flows.push({ text: `F${f}: ${r() < 0.5 ? 'in' : 'out'} ${amts.join(' ')}; paid ${pat.join(' ')}`, amts, pat });
    }
    const open = I(-1e5, 1e5), C = cash(flows.map(x => x.text), { months: months.join(' '), hist, open, minBal: 0 });
    let bal = open;
    C.B.forEach((m, j) => {
      bal += C.rec[j] - C.pay[j]; near(C.closing[j], bal, 1e-6);
      C.flows.forEach((fl, i) => {
        let want = 0;                                                             // spread every source month forward, then read month t
        flows[i].amts.forEach((a, s) => flows[i].pat.forEach((p, q) => { if (s + q === hist + j) want += (a * p) / 100; }));
        near(fl.cash[j], want, 1e-6);
      });
    });
  }
});

/* ================================================================ functional budgets */
test('ICAI MTP May 2025 Series I Q4(b): production X 66,000 and Y 1,08,000; usage A 28,80,000 kg and B 17,64,000 kg; purchases 28,44,000 kg for ₹5,33,25,000 and 17,32,200 kg for ₹4,67,69,400', () => {
  const R = functionalBudget([['X', 64000, 0, 2000], ['Y', 112000, 4000, 0]], [['A', 'X', 24], ['A', 'Y', 12], ['B', 'X', 12], ['B', 'Y', 9]], [['A', 18.75, 180000, 0], ['B', 27, 120000, 0]], { closePct: 5 });
  nearAll(R.P.map(p => p.prod), [66000, 108000]);
  nearAll(R.M[0].usage, [1584000, 1296000]); nearAll(R.M.map(m => m.totalUse), [2880000, 1764000]);
  nearAll(R.M.map(m => m.close), [144000, 88200]); nearAll(R.M.map(m => m.buy), [2844000, 1732200]); nearAll(R.M.map(m => m.value), [53325000, 46769400]);
});
test('SM practical problem 3 (K Ltd): production 1,38,000 bags; purchases Y 3,27,000 m (₹5,23,20,000), Z 10,05,000 m (₹3,01,50,000), empty bags 1,11,000 (₹1,22,10,000)', () => {
  const R = functionalBudget([['X', 150000, 45000, 33000]], [['Y', 'X', 2.5], ['Z', 'X', 7.5], ['Empty bag', 'X', 1]], [['Y', 160, 96000, 78000], ['Z', 30, 171000, 141000], ['Empty bag', 110, 111000, 84000]], { closePct: 0 });
  near(R.P[0].prod, 138000); nearAll(R.M.map(m => m.buy), [327000, 1005000, 111000]); nearAll(R.M.map(m => m.value), [52320000, 30150000, 12210000]);
});
test('SM Illustration 5 (ACB, MCB, DP; stocks cut by 10%): production 6,220 / 8,280 / 3,920; component purchases ₹10,95,600 + ₹14,80,800 + ₹14,73,120 + ₹7,44,640 = ₹47,94,160', () => {
  const R = functionalBudget([['ACB', 6300, 800, 720], ['MCB', 8400, 1200, 1080], ['DP', 4200, 2800, 2520]],
    [['Base board', 'ACB', 1], ['Base board', 'MCB', 1], ['Base board', 'DP', 1], ['IC08', 'ACB', 8], ['IC08', 'MCB', 2], ['IC08', 'DP', 2], ['IC12', 'ACB', 4], ['IC12', 'MCB', 10], ['IC12', 'DP', 4], ['IC26', 'ACB', 2], ['IC26', 'MCB', 6], ['IC26', 'DP', 8]],
    [['Base board', 60, 1600, 1440], ['IC08', 20, 1200, 1080], ['IC12', 12, 6000, 5400], ['IC26', 8, 4000, 3600]], { closePct: 0 });
  nearAll(R.P.map(p => p.prod), [6220, 8280, 3920]);
  nearAll(R.M.map(m => m.totalUse), [18420, 74160, 123360, 93480]); nearAll(R.M.map(m => m.buy), [18260, 74040, 122760, 93080]);
  nearAll(R.M.map(m => m.value), [1095600, 1480800, 1473120, 744640]); near(R.value, 4794160);
});
test('functional: plain errors', () => {
  assert.throws(() => functionalBudget([], [], [['M', 1, 0, 0]], {}), /at least one product/);
  assert.throws(() => functionalBudget([['P', 10, 0, 0]], [['Q', 'P', 1]], [['M', 1, 0, 0]], {}), /not in the materials/);
  assert.throws(() => functionalBudget([['P', 10, 0, 0]], [['M', 'R', 1]], [['M', 1, 0, 0]], {}), /not in the products/);
  assert.throws(() => functionalBudget([['P', 10, 50, 0]], [], [['M', 1, 0, 0]], {}), /production would be negative/);
  assert.throws(() => functionalBudget([['P', 10, 0, 0]], [['M', 'P', 1]], [['M', 1, 500, 0]], {}), /purchases would be negative/);
});

/* ================================================================ the lab */
test('every preset computes, the ICAI ones show the Suggested Answers on the tiles, and the frames stay small and well-formed', () => {
  const want = {
    'Savi Ltd': ['₹44,16,800', '₹58,76,000'], 'college trip': ['₹1,27,200', '₹4,98,000', '₹424', '₹415'],
    'Bricks & Cement': ['₹1,71,000'], 'Anu Ltd': ['₹2,65,000', '−₹15,60,000'], 'products X and Y': ['66,000 units', '1,08,000 units', '28,44,000', '17,32,200', '₹10,00,94,400'],
    'Illustration 1': ['₹4,260', '₹5,040'], 'Illustration 3': ['₹4,705', '₹5,875'], 'K Ltd': ['1,38,000 units', '3,27,000', '10,05,000', '₹9,46,80,000']
  };
  assert.ok(def.presets.length >= 3 && def.presets.filter(p => /ICAI (PYQ|RTP|MTP)/.test(p.label)).length >= 2);
  for (const p of def.presets) {
    const r = run(p.values);
    assert.ok(r.frames.length >= 3 && r.frames.length <= 120, p.label);
    r.frames.forEach((f, i) => { assert.ok(f.caption.length > 20, `${p.label} frame ${i}`); assert.ok(f.view.length, `${p.label} frame ${i} view`); });
    assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(r.frames) + JSON.stringify(r.stats)), p.label);
    const k = Object.keys(want).find(x => p.label.includes(x));
    if (k) { const got = r.stats.map(s => s.value); want[k].forEach((w, i) => assert.equal(got[i], w, `${p.label}: tile ${i}`)); }
  }
});
test('the flexible budget fills one cost line a frame, then totals, profit, the chart; the cash budget adds one flow a frame with its working note, then one month\'s balance a frame', () => {
  const f = run({ mode: 'flexible' });
  const rowsOf = fr => (fr.view.find(x => x.type === 'table') || { rows: [] }).rows.length;
  assert.deepEqual(f.frames.slice(0, 9).map(rowsOf), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assert.ok(f.frames.some(fr => fr.view.some(x => x.type === 'plot')));
  assert.match(f.frames[4].caption, /semi-variable/); assert.match(f.frames[5].caption, /high-low/);
  const c = run({ mode: 'cash' });
  assert.equal(c.frames[1].view[0].title, 'Working note: Sales');
  assert.match(c.frames[c.frames.length - 1].caption, /most it must borrow is \*\*₹1,29,000\*\* \(Oct\)/);
  const closings = c.frames.map(fr => { const t = fr.view.find(x => x.title && x.title.startsWith('Cash budget')); const row = t && t.rows.find(rw => /Closing balance/.test(rw[0])); return row ? row.slice(1).filter(Boolean).length : 0; });
  assert.deepEqual(closings.slice(-5), [1, 2, 3, 4, 4]);
});

/* ================================================================ the challenge */
test('challenge: 200 problems per mode build, have a well-defined answer read from the same result, and show only the given data', () => {
  for (const [mode] of def.controls[0].options) {
    for (let s = 1; s <= 200; s++) {
      const P = L.problem(def, Object.assign(L._defaults(def), { mode }), s * 7919);
      assert.equal(P.values.mode, mode);
      assert.ok(typeof P.want === 'number' && Number.isFinite(P.want), `${mode}#${s}`);
      const spec = L.answerSpec(def, P.values, P.result, P.want);
      if (mode === 'cash') assert.equal(spec.kind, 'signed'); else { assert.equal(spec.kind, 'num'); assert.ok(P.want >= 0); }
      assert.ok(L.check(spec, L.shown(P.want, spec.tol), P.want).ok);
      assert.match(def.challenge.prompt(P.values, P.result), /^Find /);
      assert.ok(def.challenge.explain(P.result, P.values).length > 20);
      assert.ok(def.challenge.view(P.result, P.values).every(x => x.type === 'table'));
    }
  }
});
