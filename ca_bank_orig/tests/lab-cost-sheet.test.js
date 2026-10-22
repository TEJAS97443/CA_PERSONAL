/* Cost Sheet Lab (cma.sheet): the Study Material's illustrations and practical problems (ICAI SM Paper 4 ch. 6, July 2024 edition,
   relevant for January 2027), real ICAI questions with their Suggested Answers, the identities a cost sheet must keep on random inputs,
   the classifier against ICAI's own classification, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/cost-sheet.js');
const { compute, classify, presets } = LAB;
const near = (a, b, tol, msg) => { if (!(Math.abs(a - b) <= tol)) throw new Error(`${msg || ''} expected ${b} ± ${tol}, got ${a}`); };
const preset = word => presets.find(p => p.label.indexOf(word) >= 0).values;
const T = r => r.sim.T;
const num = x => Number(String(x).replace(/,/g, ''));
const base = { mode: 'sheet', produced: 0, sold: 0, fgOpenUnits: 0, profitOn: 'sales', profitPct: '', job: [] };
const sheet = (items, extra) => compute(Object.assign({}, base, { items }, extra || {}));

/* ---------------------------------------------------------------- the classifier */
test('cost sheet: SM Illustration 3 (Arnav Ispat Udyog): all 45 items go to the head ICAI\'s solution gives them', () => {
  const r = compute(preset('Arnav'));
  const got = Object.fromEntries(r.sim.items.map(it => [it.label, it.head]));
  const want = {
    'Raw materials purchased': 'rm-add', 'GST paid on purchases (eligible for input tax credit)': 'excl', 'Freight inwards': 'rm-add', 'Wages paid to factory workers': 'labour',
    'Contribution towards employees\' PF and ESIS': 'labour', 'Production bonus paid to factory workers': 'labour', 'Royalty paid for production': 'dexp', 'Power and fuel': 'dexp',
    'Moulds and patterns (₹8,96,000 over two years: amortised)': 'dexp', 'Job charges paid to job workers': 'dexp', 'Stores and spares consumed': 'foh', 'Depreciation on factory building': 'foh',
    'Depreciation on office building': 'admin', 'Depreciation on plant and machinery': 'foh', 'Depreciation on delivery vehicles': 'dist', 'Salary paid to supervisors': 'foh',
    'Repairs and maintenance of plant and machinery': 'foh', 'Repairs and maintenance of sales office building': 'selling', 'Repairs and maintenance of vehicles used by directors': 'admin',
    'Insurance of plant and machinery': 'foh', 'Insurance of factory building': 'foh', 'Insurance of stock of raw materials and WIP': 'foh', 'Expenses for quality control check activities': 'qc',
    'Salary paid to quality control staff': 'qc', 'R&D for improvement in the production process': 'rd', 'Pollution control, engineering and maintenance': 'foh', 'Expenses for administration of factory work': 'admin-prod',
    'Salary: production control manager': 'admin-prod', 'Salary: finance and accounts manager': 'admin', 'Salary: sales and marketing manager': 'selling', 'Salary paid to the General Manager': 'admin',
    'Primary packing necessary to maintain quality': 'pack1', 'Packing for re-distribution of finished goods': 'pack2', 'Interest and finance charges (non-equity funds)': 'interest', 'Fee paid to auditors': 'admin',
    'Fee paid to legal advisors': 'admin', 'Fee paid to independent directors': 'admin', 'Performance bonus paid to sales staff': 'selling', 'Opening stock of raw materials': 'rm-open', 'Opening work-in-process': 'wip-open',
    'Opening stock of finished goods': 'fg-open', 'Closing stock of raw materials': 'rm-close', 'Closing work-in-process': 'wip-close', 'Closing stock of finished goods': 'fg-close', 'Scrap and waste sold': 'scrap' };
  assert.deepEqual(got, want);
});
test('cost sheet: the classifier follows SM §4.2 and the chapter MCQs (GST with or without credit, penalties, bad debts, canteen, royalty, audit fee)', () => {
  const h = s => classify(s).head;
  assert.equal(h('GST paid on raw materials (ITC available)'), 'excl');
  assert.equal(h('GST paid on raw materials (input credit cannot be claimed)'), 'rm-add', 'MCQ 2: non-creditable GST is part of material cost');
  assert.equal(h('Penalty paid for late delivery'), 'excl'); assert.equal(h('Fine for pollution breach'), 'excl'); assert.equal(h('Cost of lockdown (abnormal)'), 'excl');
  assert.equal(h('Bad debts written off'), 'selling', 'Ch. 4 MCQ 7'); assert.equal(h('Canteen expenses for factory workers'), 'foh', 'MCQ 9');
  assert.equal(h('Royalty paid to the State Government on production'), 'dexp', 'MCQ 10'); assert.equal(h('Audit fees'), 'admin', 'MCQ 7');
  assert.equal(h('Salary paid to plant supervisor'), 'foh', 'MCQ 4'); assert.equal(h('Salary of product testing lab staff'), 'qc', 'MCQ 6');
  assert.equal(h('Depreciation of director\'s laptop'), 'admin', 'MCQ 5'); assert.equal(h('Salary paid to factory store staff'), 'foh', 'MCQ 8');
  assert.equal(h('Interest on borrowed funds'), 'interest'); assert.equal(h('Sales'), 'sales'); assert.equal(h('Sales return and rebates'), 'sales-less'); assert.equal(h('Sales commission'), 'selling');
  assert.equal(h('Purchase returns'), 'rm-less'); assert.equal(h('Carriage outwards'), 'dist'); assert.equal(h('Carriage inwards'), 'rm-add');
  assert.equal(LAB.headOf('closing finished goods'), 'fg-close'); assert.equal(LAB.headOf('selling direct'), 'sell-direct'); assert.equal(LAB.headOf('works'), 'works'); assert.equal(LAB.headOf('xyz'), undefined);
});

/* ---------------------------------------------------------------- Study Material */
test('cost sheet: SM Illustration 1: prime 2,70,000 (67.50), cost of production 3,50,000 (87.50), closing stock 35,000, COGS 3,15,000, cost of sales 3,68,000 (102.22), profit 82,000', () => {
  const r = compute(preset('SM Illustration 1')), t = T(r);
  assert.deepEqual([t.prime, t.cop, t.fgClose, t.cogs, t.cos, t.profit], [270000, 350000, 35000, 315000, 368000, 82000]);
  const unit = key => r.sim.S.rows.find(x => x.key === key).unit;
  assert.equal(unit('prime'), 67.5); assert.equal(unit('cop'), 87.5); assert.equal(unit('cogs'), 87.5); near(unit('cos'), 102.22, 0.005);
  assert.equal(r.sim.S.rows.find(x => x.head === 'admin').unit.toFixed(2), '9.72', 'admin per unit sold');
});
test('cost sheet: SM Illustration 2 (ABC Corporation): materials consumed 4,90,000, prime 7,30,000, factory cost 8,27,000, COP 8,77,000, COGS 8,57,000, net profit 1,18,000', () => {
  const t = T(compute(preset('SM Illustration 2')));
  assert.deepEqual([t.material, t.prime, t.gross, t.works, t.cop, t.cogs, t.cos, t.profit], [490000, 730000, 830000, 827000, 877000, 857000, 882000, 118000]);
});
test('cost sheet: SM Illustration 3 (Arnav): prime 10,74,25,200; factory cost 10,80,83,100; COP 10,93,05,700; COGS 10,86,05,700; cost of sales 11,35,03,300', () => {
  const t = T(compute(preset('Arnav')));
  assert.deepEqual([t.material, t.labour, t.dexp, t.prime, t.foh, t.gross, t.works], [101960600, 3570000, 1894600, 107425200, 607900, 108033100, 108083100]);
  assert.deepEqual([t.qc, t.rd, t.adminp, t.scrap, t.pack1, t.cop, t.cogs], [115800, 18200, 1078600, 86000, 96000, 109305700, 108605700]);
  assert.deepEqual([t.admin, t.selling, t.dist + t.pack2, t.interest, t.cos], [2769600, 1210000, 198000, 720000, 113503300]);
});
test('cost sheet: SM Practical Problem 2 (Aditya Industries): closing stock 44,000 units × ₹94.73 = 41,68,120; COGS 1,51,70,280; cost of sales 1,85,89,280; profit 15% on sales 32,80,461', () => {
  const r = sheet([['Opening raw materials', '12,00,000', ''], ['Opening work-in-process', '18,00,000', ''], ['Opening finished goods (10,000 units)', '9,60,000', ''], ['Closing raw materials', '14,00,000', ''],
    ['Closing work-in-process', '16,04,000', ''], ['Raw materials purchased', '1,44,00,000', ''], ['GST paid on raw materials purchased (ITC available)', '7,20,000', ''], ['Wages paid to production workers', '36,64,000', ''],
    ['Expenses paid for utilities', '1,45,600', ''], ['Office and administration expenses paid', '26,52,000', ''], ['Travelling allowance paid to office staff', '1,21,000', ''], ['Selling expenses', '6,46,000', ''],
    ['Factory overheads (21,600 hours × ₹8)', '1,72,800', '']], { produced: 194000, sold: 160000, fgOpenUnits: 10000, profitOn: 'sales', profitPct: '15' });
  const t = T(r);
  assert.equal(t.prime, 18009600); assert.equal(t.cop, 18378400);
  assert.equal(r.sim.S.fgAuto.copU, 94.73); assert.equal(Math.round(t.fgClose), 4168120);
  assert.equal(Math.round(t.cogs), 15170280); assert.equal(Math.round(t.cos), 18589280);
  near(t.profit, 3280461, 0.5); near(t.sales, 21869741, 0.5);
});
test('cost sheet: SM Practical Problem 4 (G.K Co.): COGS 6,02,750; administration 18,870; selling and distribution 92,400; net profit 35,980 after interest', () => {
  const t = T(sheet([['Sales', '7,68,000', ''], ['Sales return and rebates', '14,000', ''], ['Opening stock of raw materials', '1,40,000', ''], ['Materials purchased', '3,20,000', ''], ['Freight incurred on materials', '16,000', ''],
    ['Purchase returns', '4,800', ''], ['Closing stock of raw materials', '1,80,000', ''], ['Direct employee cost (1,60,000 + 8,000 outstanding)', '1,68,000', ''], ['Indirect employee cost (18,000 + 1,200 outstanding)', '19,200', ''],
    ['Factory supervision', '10,000', ''], ['Repairs and factory up-keeping', '14,000', ''], ['Heat, light and power (factory 8/10)', '52,000', ''], ['Rates and taxes (factory 2/3)', '4,200', ''], ['Miscellaneous factory expenses', '18,700', ''],
    ['Depreciation of plant (10%)', '46,050', ''], ['Depreciation of buildings (factory 8/10)', '6,400', ''], ['Opening work-in-process', '2,00,000', ''], ['Closing work-in-process', '1,92,000', ''],
    ['Opening stock of finished goods', '80,000', ''], ['Closing stock of finished goods', '1,15,000', ''], ['Office salaries and expenses', '8,600', ''], ['Depreciation of office appliances', '870', ''],
    ['Depreciation of buildings (office 1/10)', '800', ''], ['Heat, light and power (office 1/10)', '6,500', ''], ['Rates and taxes (office 1/3)', '2,100', ''], ['Sales commission', '33,600', ''], ['Sales travelling', '11,000', ''],
    ['Sales promotion', '22,500', ''], ['Distribution department: salaries and expenses', '18,000', ''], ['Heat, light and power (distribution 1/10)', '6,500', ''], ['Depreciation of buildings (selling 1/10)', '800', ''],
    ['Interest on borrowed funds (2,000 + 2,000 outstanding)', '4,000', '']]));
  assert.deepEqual([t.material, t.prime, t.foh, t.gross, t.cop, t.cogs], [291200, 459200, 170550, 629750, 637750, 602750]);
  assert.equal(t.admin, 18870); assert.equal(t.selling + t.dist, 92400); assert.equal(t.interest, 4000);
  assert.equal(t.sales, 754000); assert.equal(t.cos, 718020); assert.equal(t.profit, 35980);
});
test('cost sheet: SM Case Scenario 1 (M Ltd): prime 7,87,10,000 (d); cost of production 7,87,28,000 (c); administration 92,400 (a); S&D 56,000 and cost of sales 7,88,76,400 (b)', () => {
  const t = T(sheet([['Raw materials consumed', '50,00,000', ''], ['Wages and salary', '6,40,00,000', ''], ['Gratuity and leave encashment', '64,20,000', ''], ['Power consumed by the machines (13,000 kWh × ₹8)', '1,04,000', ''],
    ['Diesel for the backup power generator (2,000 litres × ₹93)', '1,86,000', ''], ['Hiring charges for HEMM used in production', '30,00,000', ''], ['AMC of CCTV at the factory premises', '18,000', ''],
    ['Hiring charges of cars used for official purposes', '66,000', ''], ['Reimbursement of diesel cost for the cars', '22,000', 'admin'], ['GST under RCM on car hire (5%, no credit)', '4,400', 'admin'],
    ['Maintenance of the weighing bridge used at dispatch', '12,000', ''], ['AMC of CCTV at the dispatch weighing bridge', '8,000', ''], ['TA/DA and hotel bill of the sales manager', '36,000', '']]));
  assert.deepEqual([t.prime, t.cop, t.admin, t.selling + t.dist, t.cos], [78710000, 78728000, 92400, 56000, 78876400]);
});

/* ---------------------------------------------------------------- real ICAI questions */
test('cost sheet: Exam Jan 2026 Q2(a) (Dhol Makers, Suggested Answers): prime 24,15,000; works 26,28,400; COP 27,50,000; closing 1,000 units 5,50,000 (FIFO); COGS 32,10,000; cost of sales 33,60,000; profit 8,40,000; sales 42,00,000', () => {
  const r = compute(preset('Dhol Makers')), t = T(r);
  assert.deepEqual([t.prime, t.works, t.cop, t.fgClose, t.cogs, t.cos, t.profit, t.sales], [2415000, 2628400, 2750000, 550000, 3210000, 3360000, 840000, 4200000]);
  assert.deepEqual([r.sim.S.fgAuto.units, r.sim.S.fgAuto.copU], [1000, 550]);
});
test('cost sheet: Exam Jan 2025 Q4(b) (LMN Foods, Suggested Answers): 50% of direct labour, 8% of production cost; bulk order 6,16,400 + 25% on cost = ₹7,70,500', () => {
  const r = compute(preset('LMN Foods')), R = r.sim.R, Q = r.sim.Q;
  assert.equal(R.foh.pct, 50); assert.equal(R.sd.pct, 8);
  assert.deepEqual([Q.prime, Q.foh, Q.cop, Q.sd, Q.total, Q.profit, Q.price], [450000, 75000, 525000, 42000, 616400, 154100, 770500]);
});
test('cost sheet: MTP Sep 2026 Series I Q2(a) (Job No. 707): works cost 82,400 with the normal rectification, COP 90,640, total 97,891.20, price ₹1,22,364', () => {
  const Q = compute(preset('Job No. 707')).sim.Q;
  assert.deepEqual([Q.dm, Q.prime, Q.foh, Q.works, Q.adm, Q.cop], [42000, 68000, 12000, 82400, 8240, 90640]);
  near(Q.sd, 7251.2, 1e-9); near(Q.total, 97891.2, 1e-9); near(Q.profit, 24472.8, 1e-9); near(Q.price, 122364, 1e-9);
});
test('cost sheet: RTP Jan 2026 Q13: rates 52.806% / 19.251% / 26.952% after −10% and +20%, profit 20.755% on cost: price ₹11,31,479', () => {
  const r = compute(preset('RTP Jan 2026')), R = r.sim.R, Q = r.sim.Q;
  assert.deepEqual([R.foh.pct, R.adm.pct, R.sd.pct, R.profit.pct], [52.806, 19.251, 26.952, 20.755]);
  near(Q.foh, 110893, 0.5); near(Q.works, 640893, 0.5); near(Q.adm, 123378, 0.5); near(Q.sd, 172733, 0.5); near(Q.total, 937004, 0.5); near(Q.profit, 194475, 0.5);
  assert.equal(Math.round(Q.price), 1131479);
  const exact = compute(Object.assign({}, preset('RTP Jan 2026'), { pctDp: 'exact' })).sim.Q;
  near(exact.price, 1131479, 3, 'exact rates land within a few rupees of ICAI\'s rounded ones');
});

/* ---------------------------------------------------------------- identities on random inputs */
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const HEADS = ['rm-open', 'rm-add', 'rm-less', 'rm-close', 'labour', 'dexp', 'foh', 'wip-open', 'wip-close', 'qc', 'rd', 'admin-prod', 'scrap', 'pack1', 'fg-open', 'fg-close', 'admin', 'selling', 'dist', 'pack2', 'interest', 'excl'];
test('cost sheet: brute force, 500 random sheets: every line is the sum of its parts, the chain closes at sales, and excluded items never touch the cost', () => {
  const rnd = lcg(17);
  for (let k = 0; k < 500; k++) {
    const items = [];
    const n = 4 + Math.floor(rnd() * 25);
    for (let i = 0; i < n; i++) items.push([`Item ${i}`, String(100 * (1 + Math.floor(rnd() * 5000))), HEADS[Math.floor(rnd() * HEADS.length)]]);
    const S = sum => sum;
    const r = sheet(items), t = T(r);
    const tot = h => items.filter(x => x[2] === h).reduce((a, x) => a + +x[1], 0);
    assert.equal(t.material, tot('rm-open') + tot('rm-add') - tot('rm-less') - tot('rm-close'));
    assert.equal(t.prime, t.material + tot('labour') + tot('dexp'));
    assert.equal(t.works, t.prime + tot('foh') + tot('wip-open') - tot('wip-close'));
    assert.equal(t.cop, t.works + tot('qc') + tot('rd') + tot('admin-prod') - tot('scrap') + tot('pack1'));
    assert.equal(t.cogs, t.cop + tot('fg-open') - tot('fg-close'));
    assert.equal(t.cos, t.cogs + tot('admin') + tot('selling') + tot('dist') + tot('pack2') + tot('interest'));
    const all = items.filter(x => x[2] !== 'excl'), signed = x => (/^(rm-less|rm-close|wip-close|scrap|fg-close)$/.test(x[2]) ? -1 : 1) * +x[1];
    assert.equal(t.cos, all.reduce((a, x) => a + signed(x), 0), `#${k}: cost of sales is the signed sum of every item that is a cost`);
    const withSales = sheet(items.concat([['Sales', String(Math.max(0, Math.round(t.cos * (1 + rnd())))), 'sales']])), u = T(withSales);
    assert.equal(u.profit + u.cos, u.sales, 'profit + cost of sales = sales');
    if (t.cos > 0) for (const on of ['cost', 'sales']) {
      const p = 5 + Math.floor(rnd() * 40), q = T(sheet(items, { profitOn: on, profitPct: String(p) }));
      near(on === 'sales' ? q.profit / q.sales : q.profit / q.cos, p / 100, 1e-9, `#${k}: ${p}% on ${on}`);
    }
    S(0);
  }
});
test('cost sheet: per-unit column and FIFO closing stock on random volumes: closing units = opening + produced − sold, at this period\'s COP per unit', () => {
  const rnd = lcg(23);
  for (let k = 0; k < 300; k++) {
    const prod = 100 * (1 + Math.floor(rnd() * 100)), open = Math.floor(rnd() * prod), sold = Math.floor(rnd() * (open + prod));
    const items = [['Raw materials', String(1000 * (1 + Math.floor(rnd() * 900))), ''], ['Direct wages', String(1000 * (1 + Math.floor(rnd() * 500))), ''], ['Factory overheads', String(1000 * Math.floor(rnd() * 300)), '']];
    if (open) items.push(['Opening stock of finished goods', String(open * (10 + Math.floor(rnd() * 90))), '']);
    if (sold > prod && !open) continue;
    const r = sheet(items, { produced: prod, sold: sold || 1, fgOpenUnits: open }), t = T(r), A = r.sim.S.fgAuto, closeU = open + prod - (sold || 1);
    if (closeU > 0) { assert.equal(A.units, closeU); near(t.fgClose, Math.min(closeU, prod) * Math.round((t.cop / prod) * 100) / 100 + (closeU > prod ? (t.fgOpen / open) * (closeU - prod) : 0), 1e-6); }
    r.sim.S.rows.forEach(x => { if (x.unit != null) near(x.unit * (x.per === 'p' ? prod : sold || 1), x.total, 1e-6); });
  }
});
test('cost sheet: quotation identities: price = total × (1 + p%) on cost and total ÷ (1 − p%) on sales; rates from last period re-price last period exactly', () => {
  const rnd = lcg(31);
  for (let k = 0; k < 300; k++) {
    const v = LAB.gen(rnd, 'quote'), r = compute(v), Q = r.sim.Q, p = +v.profitPct / 100;
    near(Q.price, v.profitOn === 'sales' ? Q.total / (1 - p) : Q.total * (1 + p), 1e-6);
    near(Q.profit / (v.profitOn === 'sales' ? Q.price : Q.total), p, 1e-9);
    const again = compute(Object.assign({}, v, { job: v.items.slice(0, 2) })).sim.Q;      // pricing last period's own prime costs gives back its overheads
    const S = r.sim.T;
    near(again.foh, S.foh, 1e-6); near(again.adm, S.admin + S.adminp, 1e-6); near(again.sd, S.selling + S.dist + S.pack2, 1e-6);
  }
});

/* ---------------------------------------------------------------- the animation */
test('cost sheet: every example builds, ≤ 120 frames, captions every line, states its conventions; items left out are shown with their reason', () => {
  presets.forEach(p => {
    const r = compute(p.values);
    assert.ok(r.frames.length >= 5 && r.frames.length <= 120, `${p.label}: ${r.frames.length}`);
    r.frames.forEach((f, i) => { assert.ok(f.caption && f.caption.length > 15, `${p.label} frame ${i}`); assert.ok(f.view && f.view.length); });
    assert.match(r.note, /^\*\*Conventions\.\*\*/); assert.ok(r.stats.length >= 3 && r.stats.length <= 6);
  });
  const r = compute(presets[0].values), caps = r.frames.map(f => f.caption).join('\n');
  assert.match(caps, /Not part of cost/); assert.match(caps, /input tax credit/); assert.match(caps, /Penalty/);
  assert.match(caps, /closing finished goods/i); assert.match(caps, /separate item of cost of sales/);
  const order = r.sim.S.rows.filter(x => x.key).map(x => x.key);
  assert.deepEqual(order, ['prime', 'gross', 'works', 'cop', 'cogs', 'cos', 'profit', 'sales'], 'ICAI\'s order of subtotals');
});

/* ---------------------------------------------------------------- bad input */
test('cost sheet: bad input fails with a message that says what to fix', () => {
  assert.throws(() => sheet([['Wages', 'lots', '']]), /must be a number/);
  assert.throws(() => sheet([['Wages', '-500', '']]), /without a minus/);
  assert.throws(() => sheet([['Wages', '500', 'magic']]), /is not a head/);
  assert.throws(() => sheet([['Raw materials', '5,000', '']], { produced: 100, sold: 150 }), /more than the opening stock/);
  assert.throws(() => sheet([['Raw materials', '5,000', '']], { profitOn: 'sales', profitPct: '120' }), /below 100%/);
  assert.throws(() => compute(Object.assign({}, preset('LMN Foods'), { job: [['Factory overheads', '10,000', 'factory']] })), /overheads come from the rates/);
  assert.throws(() => compute(Object.assign({}, preset('LMN Foods'), { items: [] })), /nil/);
  assert.throws(() => compute(Object.assign({}, preset('Job No. 707'), { profitOn: 'past' })), /needs rates from last period/);
});

/* ---------------------------------------------------------------- the challenge */
test('cost sheet: test-yourself problems: 300 per mode build, follow the mode being explored, and the given tables show only the items', () => {
  const ch = LAB.def.challenge, dflt = LAB.def.controls.reduce((o, c) => (o[c.id] = c.type === 'table' ? c.rows : c.value, o), {});
  for (const mode of ['sheet', 'quote']) {
    compute(Object.assign({}, dflt, mode === 'quote' ? preset('LMN Foods') : {}, { mode }));          // the framework computes the explored values first
    for (let s = 1; s <= 300; s++) {
      const v = Object.assign({}, dflt, { mode }, ch.gen(GA.util.rng(s * 7907 + mode.length)));
      assert.equal(v.mode, mode);
      const res = compute(v), want = ch.solve(res, v);
      assert.ok(Number.isFinite(want), `${mode}#${s}`);
      const shown = JSON.stringify(ch.view(res, v));
      const tok = new RegExp('(^|[^0-9,])' + Math.round(want).toLocaleString('en-IN') + '(?![0-9,])');
      if (Math.abs(want) >= 1000) assert.ok(!tok.test(shown) || (v.items || []).concat(v.job || []).some(it => num(it[1]) === Math.round(want)), `${mode}#${s}: the answer is not on show`);
      assert.ok(ch.prompt(v, res).length > 30 && ch.explain(res, v).length > 40);
      compute(Object.assign({}, dflt, mode === 'quote' ? preset('LMN Foods') : {}, { mode }));
    }
  }
});
