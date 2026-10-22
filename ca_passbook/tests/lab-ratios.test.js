/* Ratio Analysis Lab (app/js/labs/ratios.js): verified against the ICAI Study Material (Paper 6A ch. 3: Illustrations 1, 2, 4 and 5 and
   Example 1, the DuPont split) and real ICAI questions with their Suggested Answers (PYQ Jan 2025 MCQs 6–7, PYQ Sep 2024 Q1(c), MTP Sep 2025
   Series I Q1(b)); plus round trips on random businesses (statements → ratios → statements), the DuPont identity and the balance check. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/viz/diagram.js');
const FW = require('../app/js/labs/framework.js');
const { parseLine, parseLines, solve, ratiosOf, compute, def } = require('../app/js/labs/ratios.js');
const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= eps)) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const run = vals => compute(FW.prepare(def, Object.assign(FW._defaults(def), vals)));
const P = re => { const p = def.presets.find(x => re.test(x.label)); if (!p) throw new Error('no preset ' + re); return p.values; };
const known = (lines, yd) => solve(parseLines(lines, yd || 360)).known;
const ratio = (r, id) => { const x = r.sim.R.find(q => q.id === id); if (!x) throw new Error('no ratio ' + id); return x.x; };
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ------------------------------------------------------------------ the parser */
test('lines in plain words become linear equations: amounts, lakh, % of, a : b, fractions, months, labels, ratio names', () => {
  assert.deepEqual(parseLine('sales = 150 lakh').eq, { L: 1, k: { sales: 1 }, c: -15000000 });
  assert.deepEqual(parseLine('credit sales = 80% of sales').eq.k, { csales: 1, sales: -0.8 });
  const cr = parseLine('Working capital ratio: current assets / current liabilities = 8 : 5');
  assert.equal(cr.label, 'Working capital ratio'); near(cr.eq.k.cl, -1.6, 1e-12); assert.equal(cr.eq.k.ca, 1);
  near(parseLine('fixed assets / current assets = 5/7').eq.k.ca, -5 / 7, 1e-12);
  const cp = parseLine('collection period = 2 months', 360).eq;            // avgrec × 360 / csales = 60 days
  assert.equal(cp.k.avgrec, 360); near(cp.k.csales, -60, 1e-12);
  assert.deepEqual(parseLine("Shareholders' funds = 9,00,000").eq.k, { nw: 1 });
  assert.deepEqual(Object.keys(parseLine('long-term debt / net worth = 0.6').eq.k).sort(), ['ltd', 'nw']);
  assert.deepEqual(parseLine('other current liabilities = 2,25,000 + 1,40,000').eq, { L: 1, k: { ocl: 1 }, c: -365000 });
  assert.deepEqual(parseLine('quick ratio = 1 : 1').eq.k, { qa: 1, cl: -1 });
  near(parseLine('return on net worth = 10%').eq.k.nw, -0.1, 1e-12);
  assert.deepEqual(parseLine('preference dividend = 10% of preference share capital').eq.k, { pdiv: 1, pref: -0.1 });
});
test('a line that cannot be read says why', () => {
  assert.throws(() => parseLine('current ratio 2'), /"="/);
  assert.throws(() => parseLine('sales = 10 bananas'), /do not know "bananas"/);
  assert.throws(() => parseLine('sales × stock = 10'), /cannot be multiplied/);
  assert.throws(() => parseLine('current ratio = quick ratio'), /ratio must be equal to a number/);
  assert.throws(() => parseLines(''), /Type the given/);
  assert.throws(() => run({ mode: 'dupont', given: 'sales = 100' }), /DuPont needs net profit/);
});

/* ------------------------------------------------------------------ the dashboard: Study Material */
test('SM ch. 3 Illustration 1 (the preset), HPCL 2022-23: GP 20.3%, operating expenses 15.2%, operating profit 5.08%, capital turnover 2.54, stock turnover 3.87, NP to net worth 16.24%, collection period 70.44 days', () => {
  const r = run(P(/Illustration 1/));
  near(ratio(r, 'gpr'), 20.32, 0.005); near(ratio(r, 'oer'), 15.24, 0.005); near(ratio(r, 'opr'), 5.08, 0.005); near(ratio(r, 'ct'), 2.54, 0.005);
  near(ratio(r, 'it'), 3.87, 0.005); near(ratio(r, 'roe'), 16.24, 0.005); near(ratio(r, 'acp'), 70.44, 0.005);
  assert.equal(r.sim.S.conflicts.length, 0);
});
test('SM ch. 3 Illustration 1, HPCL 2021-22 (closing receivables, opening stock ₹40,000): GP 21.3%, opex 16.3%, operating profit 5%, capital turnover 3, stock turnover 4.72, NP to net worth 15%, 67.6 days', () => {
  const r = run({ mode: 'dash', ydays: 365, given: ['sales = 3,00,000', 'credit sales = 2,70,000', 'cost of goods sold = 2,36,000', 'operating expenses = 49,000', 'fixed assets = 30,000', 'receivables = 50,000',
    'cash = 10,000', 'stock = 60,000', 'opening stock = 40,000', 'creditors = 50,000', 'share capital = 75,000', 'reserves = 25,000'].join('\n') });
  near(ratio(r, 'gpr'), 21.33, 0.005); near(ratio(r, 'oer'), 16.33, 0.005); near(ratio(r, 'opr'), 5, 1e-9); near(ratio(r, 'ct'), 3, 1e-9);
  near(ratio(r, 'it'), 4.72, 1e-9); near(ratio(r, 'roe'), 15, 1e-9); near(ratio(r, 'acp'), 67.59, 0.005);
});
test('SM ch. 3 Illustration 5 (the preset), ABC Company 2022-23: current 1.20, acid test 0.40, receivables turnover 13.82, 26.41 days, inventory turnover 6.11, total debt to net worth 1.61, long-term debt to capitalisation 0.32, GP 0.13, NP 0.026, asset turnover 2.24, ROA 0.06', () => {
  const r = run(P(/Illustration 5/));
  near(ratio(r, 'cr'), 1.20, 0.005); near(ratio(r, 'qr'), 0.40, 0.005); near(ratio(r, 'rt'), 13.82, 0.005); near(ratio(r, 'acp'), 26.41, 0.01);
  near(ratio(r, 'it'), 6.11, 0.005); near(ratio(r, 'tolnw'), 1.61, 0.005); near(ratio(r, 'dr'), 0.32, 0.005); near(ratio(r, 'gpr') / 100, 0.13, 0.005);
  near(ratio(r, 'npr') / 100, 0.026, 0.0005); near(ratio(r, 'tat'), 2.24, 0.005); near(ratio(r, 'roa') / 100, 0.06, 0.005);
  assert.ok(r.frames.some(f => /taken as nil/.test(f.caption)), 'a ratio resting on nil interest says so');
});
test('MTP Sep 2025 Series I Q1(b), Gagan Pvt. Ltd (the preset): quick ratio 0.8, fixed assets turnover 3.67, proprietary ratio 0.58, EPS ₹4.25', () => {
  const r = run(P(/Gagan/)), k = r.sim.S.known;
  approx(k.ca, 2500000, 1e-6); approx(k.cl, 1000000, 1e-6); approx(k.ta, 5500000, 1e-6); approx(k.sales, 11000000, 1e-6); approx(k.inv, 1700000, 1e-6);
  approx(k.ltd, 1300000, 1e-6); approx(k.nw, 2600000, 1e-6); approx(k.pat, 825000, 1e-6);
  near(ratio(r, 'qr'), 0.8, 1e-9); near(ratio(r, 'fat'), 3.67, 0.005); near(ratio(r, 'prop'), 0.58, 0.005); near(ratio(r, 'eps'), 4.25, 1e-9);
  assert.ok(r.sim.S.steps.some(s => s.how === 'together'), 'current ratio and working capital are solved together');
});
test('SM ch. 3 Example 1 (the preset): DuPont 14.39% × 1.0455 × 2.0621 = 31.02% (31.03% unrounded)', () => {
  const s = run(P(/Example 1/)).sim;
  near(s.npm * 100, 14.39, 0.005); near(s.at, 1.0455, 0.00005); near(s.em, 2.0621, 0.00005);
  near(s.roe * 100, 31.03, 0.005); near(0.1439 * 1.0455 * 2.0621 * 100, 31.02, 0.005);
  near(s.roe, 4212 / 13572, 1e-12);
});

/* ------------------------------------------------------------------ build from ratios: ICAI */
test('PYQ Jan 2025 MCQs 6–7, VP Ltd (the preset): inventory ₹20 lakh and receivables ₹20 lakh (A); current assets ₹60 lakh and current liabilities ₹40 lakh (C)', () => {
  const r = run(P(/VP Ltd/)), k = r.sim.S.known;
  approx(k.inv, 2000000, 1e-6); approx(k.rec, 2000000, 1e-6); approx(k.ca, 6000000, 1e-6); approx(k.cl, 4000000, 1e-6);
  assert.ok(r.sim.S.steps.some(s => s.how === 'together' && s.vars.includes('ca') && s.vars.includes('cl')), 'the current and quick ratios are solved together');
});
test('PYQ Sep 2024 Q1(c), MNP Ltd (the preset): fixed assets 8,70,000; inventories 4,35,000; debtors 3,62,500; cash 72,500; long-term loan 5,40,000; total 17,40,000', () => {
  const r = run(P(/MNP/)), k = r.sim.S.known;
  [['fa', 870000], ['inv', 435000], ['rec', 362500], ['cash', 72500], ['ltd', 540000], ['ta', 1740000], ['tl', 1740000], ['sales', 4350000], ['cogs', 3262500]].forEach(([v, w]) => approx(k[v], w, 1e-6));
  assert.match(r.frames[r.frames.length - 1].caption, /balance sheet is complete/);
});
test('SM ch. 3 Illustration 2 (the preset), Alpha Ltd: balance sheet 2,00,000 (stock 30,000, receivables 40,000, bank 10,000); sales 2,40,000, COGS 2,04,000, expenses 22,000, interest 1,000, net profit 13,000', () => {
  const k = run(P(/Illustration 2/)).sim.S.known;
  [['esc', 100000], ['rs', 30000], ['ltd', 20000], ['cl', 50000], ['fa', 120000], ['inv', 30000], ['rec', 40000], ['cash', 10000], ['sales', 240000], ['cogs', 204000], ['opex', 22000], ['int', 1000], ['pat', 13000]].forEach(([v, w]) => approx(k[v], w, 1e-6));
});
test('SM ch. 3 Illustration 4 (the preset), Aebece Company: opening stock 80,000, purchases 27,20,000, operating expenses 1,60,000, net profit 6,40,000, liabilities 64,00,000, other current assets 52,00,000, total 96,00,000', () => {
  const r = run(P(/Illustration 4/)), k = r.sim.S.known;
  [['oinv', 80000], ['purch', 2720000], ['opex', 160000], ['pat', 640000], ['ol', 6400000], ['nw', 3200000], ['ca', 5600000], ['ta', 9600000], ['sales', 3200000]].forEach(([v, w]) => approx(k[v], w, 1e-6));
  const bs = r.frames[r.frames.length - 1].view[0];
  assert.ok(bs.rows.some(row => /balancing figure/.test(row[2]) && row[3] === '52,00,000'), 'receivables and cash shown as the balancing figure, as ICAI does');
  assert.ok(bs.rows.some(row => row[0] === 'Outside liabilities' && row[1] === '64,00,000'));
});
test('inconsistent data are flagged: Alpha Ltd with its unused "stock turnover 8 times" (2,04,000 ÷ 30,000 is 6.8)', () => {
  const r = run(Object.assign({}, P(/Illustration 2/), { given: P(/Illustration 2/).given + '\nstock turnover = 8' }));
  assert.ok(r.sim.S.conflicts.length > 0, 'some line is flagged');
  assert.match(r.frames[r.frames.length - 1].caption, /Check the data/);
});
test('too little data: the lab says which items are still open, never invents them', () => {
  const r = run({ mode: 'build', given: 'current ratio = 2\nstock = 5,00,000' });
  assert.match(r.frames[r.frames.length - 1].caption, /Still open/);
  assert.ok(!('ca' in r.sim.S.known));
});

/* ------------------------------------------------------------------ round trips on random businesses */
function business(rnd) {
  const sales = (60 + Math.floor(rnd() * 400)) * 1e5, gpp = 0.15 + rnd() * 0.3, cogs = sales * (1 - gpp), opex = sales * rnd() * 0.1, ltd = Math.floor(rnd() * 50) * 1e5, int = ltd * 0.1;
  const fa = sales * (0.3 + rnd() * 0.5), inv = cogs / (3 + rnd() * 6), rec = sales * (20 + rnd() * 60) / 360, cash = (1 + rnd() * 10) * 1e5, cred = cogs * (15 + rnd() * 60) / 360;
  const ta = fa + inv + rec + cash, esc = Math.floor(5 + rnd() * 40) * 1e5, rs = ta - cred - ltd - esc, pbt = sales - cogs - opex - int, tax = pbt * 0.25;
  return { sales, cogs, opex, int, tax, fa, inv, rec, cash, cred, ltd, esc, rs, ta, pat: pbt - tax };
}
const fmtLine = (n, x) => `${n} = ${Math.round(x * 1e4) / 1e4}`;
test('round trip (500 businesses): statements → ratios; then the ratios plus the capital → the same balance sheet, which balances', () => {
  const rnd = lcg(21); let n = 0;
  for (let k = 0; k < 500; k++) {
    const B = business(rnd);
    if (!(B.rs > 0) || !(B.pat > 0)) continue;
    n++;
    const full = [['sales', B.sales], ['cost of goods sold', B.cogs], ['operating expenses', B.opex], ['interest', B.int], ['tax', B.tax], ['fixed assets', B.fa], ['stock', B.inv], ['receivables', B.rec], ['cash', B.cash],
      ['creditors', B.cred], ['long term debt', B.ltd], ['equity share capital', B.esc], ['reserves and surplus', B.rs]].map(([a, b]) => fmtLine(a, b)).join('\n');
    const K = known(full), R = Object.fromEntries(ratiosOf(K, 360).map(x => [x.id, x.x]));
    near(K.ta, K.tl, 1e-3, 'balances'); near(R.cr, K.ca / K.cl, 1e-12);
    const lines = [fmtLine('equity share capital', B.esc), fmtLine('reserves and surplus', B.rs), fmtLine('creditors', B.cred), `long term debt / net worth = ${B.ltd / (B.esc + B.rs)}`, `total assets turnover = ${R.tat}`,
      `gross profit ratio = ${R.gpr}%`, `inventory turnover = ${R.it}`, `collection period = ${R.acp} days`, `current ratio = ${R.cr}`].join('\n');
    const K2 = known(lines);
    ['fa', 'inv', 'rec', 'cash', 'ltd', 'ta', 'sales'].forEach(v => near(K2[v], K[v], 1e-6 * Math.max(1, K[v]) + 0.01, v));
  }
  assert.ok(n > 300, 'enough businesses: ' + n);
});
test('random businesses (500): DuPont NPM × asset turnover × equity multiplier = ROE; operating ratio + operating profit ratio = 100%; quick ratio ≤ current ratio', () => {
  const rnd = lcg(33);
  for (let k = 0; k < 500; k++) {
    const B = business(rnd);
    if (!(B.rs > 0) || !(B.pat > 0)) continue;
    const given = Object.entries({ sales: B.sales, 'cost of goods sold': B.cogs, 'operating expenses': B.opex, interest: B.int, tax: B.tax, 'fixed assets': B.fa, stock: B.inv, receivables: B.rec, cash: B.cash, creditors: B.cred, 'long term debt': B.ltd, 'share capital': B.esc, reserves: B.rs }).map(([a, b]) => fmtLine(a, b)).join('\n');
    const d = run({ mode: 'dupont', given }).sim, r = run({ mode: 'dash', given });
    near(d.npm * d.at * d.em, d.roe, 1e-12); near(d.roe * 100, ratio(r, 'roe'), 1e-9);
    near(ratio(r, 'or') + ratio(r, 'opr'), 100, 1e-9); assert.ok(ratio(r, 'qr') <= ratio(r, 'cr') + 1e-12);
  }
});

/* ------------------------------------------------------------------ the page */
test('every preset computes, renders every frame, keeps 3–6 tiles; build frames fix one more figure each', () => {
  for (const p of def.presets) {
    const r = run(p.values);
    assert.ok(r.frames.length >= 5 && r.frames.length <= 120, p.label + ' frames ' + r.frames.length);
    r.frames.forEach((f, i) => { assert.ok(f.caption.length > 15, `${p.label} #${i}`); f.view.forEach(x => GA.diagram.render(x)); });
    assert.ok(r.stats.length >= 3 && r.stats.length <= 6, p.label + ' tiles ' + r.stats.length);
  }
  const b = run(P(/MNP/));
  const filled = f => f.view[0].rows.flat().filter(c => c && c !== '?' && /\d/.test(c)).length;
  for (let i = 2; i < b.frames.length - 1; i++) assert.ok(filled(b.frames[i]) >= filled(b.frames[i - 1]), 'figures only accumulate');
});
test('presets: three or more, at least two from ICAI papers named in the label, and the PassBook cast', () => {
  assert.ok(def.presets.filter(p => /\b(PYQ|RTP|MTP)\b/.test(p.label)).length >= 3);
  assert.ok(def.presets.filter(p => /Tapri/.test(p.label)).length >= 3);
});
test('the dashboard can show one group (for a lesson embed)', () => {
  const r = run({ mode: 'dash', group: 'liq', given: P(/Tapri Tea Co.: Dev/).given });
  assert.ok(r.sim.R.every(x => x.g === 'liq') && r.sim.R.length >= 3);
});

/* ------------------------------------------------------------------ the challenge */
test('challenge: 300 problems per mode build; the answer is what the lab shows; build answers are the hidden figures', () => {
  for (const mode of ['dash', 'dupont', 'build']) {
    const asks = new Set();
    for (let s = 1; s <= 300; s++) {
      const Pr = FW.problem(def, Object.assign(FW._defaults(def), { mode }), s * 104729);
      assert.equal(Pr.values.mode, mode);
      const spec = FW.answerSpec(def, Pr.values, Pr.result, Pr.want);
      assert.ok(Number.isFinite(Pr.want), mode + ' answer');
      assert.ok(FW.check(spec, String(Math.round(Pr.want * 100) / 100), Pr.want).ok);
      asks.add(mode === 'build' ? Pr.values.askB : mode === 'dupont' ? Pr.values.askP : Pr.values.askD);
      assert.ok(def.challenge.prompt(Pr.values, Pr.result).length > 60);
      assert.ok(def.challenge.explain(Pr.result, Pr.values).length > 20);
      if (mode === 'build') assert.equal(Pr.result.sim.S.conflicts.length, 0, 'a generated problem is consistent');
    }
    assert.ok(asks.size >= 4, mode + ' asks: ' + [...asks]);
  }
});
