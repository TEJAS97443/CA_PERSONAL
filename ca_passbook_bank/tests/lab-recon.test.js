/* Cost-Financial Reconciliation Lab (app/js/labs/recon.js): the ICAI Study Material's illustrations and practical problem (Paper 4, Ch. 7
   §4), real ICAI questions with their Suggested Answers (MTP Jan 2026 Series I Q3(b), MTP Sep 2024 Series I, MTP May 2026 Series II,
   MTP Jan 2025 Series II Q4(c)), identities on thousands of random inputs (the statement closes; starting from either profit reaches the
   other; the memorandum account balances; an independent recomputation of both profits from a pair of P&L accounts agrees), bad input,
   and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require(process.env.RECON_LAB || '../app/js/labs/recon.js');
const { def } = LAB;

const near = (a, b, eps, msg) => { if (!(Math.abs(a - b) <= (eps == null ? 1e-6 : eps))) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const base = () => Object.fromEntries(def.controls.map(c => [c.id, c.type === 'table' ? c.rows.map(r => r.slice()) : c.value]));
const run = vals => def.compute(Object.assign(base(), vals));
const preset = re => def.presets.find(p => re.test(p.label)).values;
const eff = (R, re) => { const x = R.order.concat(R.nil).find(x => re.test(x.name)); if (!x) throw new Error('no item ' + re); return x.e; };

/* ---------------------------------------------------------------- the Study Material (Ch. 7 §4) */
test('SM Ch. 7 Illustration 6 (ABC Manufacturing): 3,00,000 + 97,000 − 2,87,000 = profit as per financial accounts ₹1,10,000, each item in ICAI\'s column', () => {
  const R = run(preset(/Illustration 6/)).sim;
  assert.equal(R.end, 110000); assert.equal(R.A, 97000); assert.equal(R.L, 287000); assert.equal(R.mid, 397000);
  assert.equal(eff(R, /^Factory/), 50000); assert.equal(eff(R, /^Selling/), 20000); assert.equal(eff(R, /Closing stock/), 27000);
  assert.equal(eff(R, /^Administration/), -67000); assert.equal(eff(R, /Goodwill/), -200000); assert.equal(eff(R, /Interest/), -20000);
});
test('SM Ch. 7 Illustration 7: from the financial loss (₹3,000), add the ₹23,000 of overheads the cost accounts did not absorb: costing profit ₹20,000', () => {
  /* ICAI's statement calls the ₹23,000 "over absorbed"; its Overhead Control A/c (₹1,43,000 incurred, ₹1,20,000 absorbed) shows it is
     under-absorbed in the cost accounts, which is why it is ADDED to the financial result to reach the higher costing profit */
  const r = run(preset(/Illustration 7/)), R = r.sim;
  assert.equal(R.end, 20000); assert.equal(R.add.length, 1); assert.equal(R.add[0].e, 23000);
  assert.match(r.frames[1].caption, /under-absorbed/);
});
test('SM Ch. 7 Illustration 8: material, factory and administration over-charged in cost accounts, dividends and interest added; bad debts, preliminary, legal and the stock difference deducted: ₹12,90,000', () => {
  const R = run(preset(/Illustration 8/)).sim;
  assert.equal(R.A, 860000); assert.equal(R.L, 135160); assert.equal(R.end, 1290000);
  assert.equal(eff(R, /material/), 600000); assert.equal(eff(R, /Closing stock/), -5160);
  assert.deepEqual(R.nil.map(x => x.name), ['Selling and distribution overheads'], 'equal in both accounts: no adjustment');
});
test('SM Ch. 7 Practical Problem 5 (H.K. Piano Company): memorandum account from a costing loss ₹3,28,000 to a financial loss ₹4,16,000; both sides ₹4,54,000', () => {
  const r = run(preset(/H\.K\. Piano/)), R = r.sim;
  assert.equal(R.end, -416000);
  const last = r.frames[r.frames.length - 1].view.find(x => /rc-wide/.test(x.html || '')).html;
  assert.equal((last.match(/4,54,000/g) || []).length, 2, 'Total 4,54,000 on both sides');
  assert.match(last, /By Net Loss as per Financial Accounts/); assert.match(last, /To Net Loss as per Cost Accounts/);
});

/* ---------------------------------------------------------------- real ICAI questions */
test('ICAI MTP Jan 2026 (Series I), Q3(b): costing loss ₹3,15,000 → financial loss ₹3,70,000; memorandum account totals ₹4,18,000', () => {
  const r = run(preset(/MTP Jan 2026/)), R = r.sim;
  assert.equal(R.end, -370000);
  assert.equal(R.L, 103000, 'debits: 8,000 + 80,000 + 5,000 + 10,000'); assert.equal(R.A, 48000, 'credits: 5,000 + 15,000 + 25,000 + 3,000');
  assert.equal(eff(R, /Depreciation/), 15000, 'depreciation over-charged in cost accounts (₹90,000 – ₹75,000)');
  const last = r.frames[r.frames.length - 1].view.find(x => /rc-wide/.test(x.html || '')).html;
  assert.equal((last.match(/4,18,000/g) || []).length, 2);
});
test('ICAI MTP Sep 2024 (Series I): costing loss ₹48,700 → financial profit ₹30,400; opening stock overvalued in cost accounts is a credit (₹23,000), closing stock overvalued a debit (₹9,500); totals ₹1,92,200', () => {
  const r = run(preset(/MTP Sep 2024/)), R = r.sim;
  assert.equal(R.end, 30400);
  assert.equal(eff(R, /Opening stock/), 23000); assert.equal(eff(R, /Closing stock/), -9500); assert.equal(eff(R, /Notional rent/), 49000); assert.equal(eff(R, /Depreciation/), 45000);
  const last = r.frames[r.frames.length - 1].view.find(x => /rc-wide/.test(x.html || '')).html;
  assert.equal((last.match(/1,92,200/g) || []).length, 2); assert.match(last, /To Net Profit as per Financial Accounts/);
});
test('ICAI MTP May 2026 (Series II): profit as per cost accounts ₹2,51,839 + 1,54,793 − 4,07,822 = loss as per financial accounts ₹1,190', () => {
  const R = run(preset(/MTP May 2026/)).sim;
  assert.equal(R.A, 154793); assert.equal(R.L, 407822); assert.equal(R.end, -1190);
  assert.equal(eff(R, /Selling/), 24200); assert.equal(eff(R, /Closing stock/), 7593); assert.equal(eff(R, /Administrative/), -74822); assert.equal(eff(R, /Factory/), -40000);
});
test('ICAI MTP Jan 2025 (Series II), Q4(c): ₹7,77,150 + 2,35,500 − 3,84,650 = profit as per financial accounts ₹6,28,000', () => {
  const R = run(preset(/MTP Jan 2025/)).sim;
  assert.equal(R.mid, 1012650); assert.equal(R.L, 384650); assert.equal(R.end, 628000);
});
test('the Tapri examples agree with each other: from costing ₹12,50,000 to financial ₹12,68,000 and back, and as a memorandum account', () => {
  const a = run(preset(/costing profit to financial/)).sim, b = run(preset(/starting from the financial/)).sim, c = run(preset(/memorandum reconciliation account/)).sim;
  assert.equal(a.end, 1268000); assert.equal(b.end, 1250000); assert.equal(c.end, 1268000);
  assert.equal(a.A, b.L); assert.equal(a.L, b.A, 'from the other end every item changes sides');
});

/* ---------------------------------------------------------------- the sign rules */
test('kinds: E / I / OS / CS and words; the sign rule of each kind', () => {
  assert.deepEqual(['E', 'exp', 'Overhead', 'i', 'Income', 'OS', 'opening stock', 'CS', 'closing'].map(LAB.kindOf), ['E', 'E', 'E', 'I', 'I', 'OS', 'OS', 'CS', 'CS']);
  assert.equal(LAB.kindOf('zz'), null);
  const d = rows => LAB.parseItems(rows).map(x => x.d);
  assert.deepEqual(d([['x', 'E', 0, 100], ['x', 'E', 100, 0], ['x', 'I', 0, 100], ['x', 'OS', 100, 0], ['x', 'CS', 100, 0]]), [-100, 100, 100, 100, -100]);
});
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
test('random reconciliations (3 000): an independent pair of P&L accounts gives both profits; the statement reaches the other profit from either end; the memorandum account balances', () => {
  const rnd = lcg(21);
  for (let k = 0; k < 3000; k++) {
    /* build both P&L accounts from scratch: common sales and expenses, then the differing items */
    const sales = 1e6 + Math.floor(rnd() * 9e6), common = Math.floor(rnd() * sales * 0.9);
    let costP = sales - common, finP = sales - common;
    const rows = [], n = 1 + Math.floor(rnd() * 9);
    for (let i = 0; i < n; i++) {
      const kind = ['E', 'I', 'OS', 'CS'][Math.floor(rnd() * 4)];
      const c = rnd() < 0.3 ? 0 : Math.floor(rnd() * 500000), f = rnd() < 0.3 && c ? 0 : Math.floor(rnd() * 500000);
      if (kind === 'E') { costP -= c; finP -= f; } else if (kind === 'I') { costP += c; finP += f; } else if (kind === 'OS') { costP -= c; finP -= f; } else { costP += c; finP += f; }
      rows.push(['item ' + i, kind, c, f]);
    }
    const A = run({ layout: 'cost', costProfit: costP, items: rows }).sim, B = run({ layout: 'fin', finProfit: finP, items: rows }).sim;
    assert.equal(A.end, finP, 'costing → financial'); assert.equal(B.end, costP, 'financial → costing');
    near(A.start + A.A - A.L, A.end); assert.equal(A.A, B.L); assert.equal(A.L, B.A);
    const drSide = Math.abs(Math.min(costP, 0)) + A.L + Math.max(finP, 0), crSide = Math.max(costP, 0) + A.A + Math.abs(Math.min(finP, 0));
    near(drSide, crSide, 1e-6, 'debits = credits');
  }
});

/* ---------------------------------------------------------------- bad input */
test('bad input fails with a message that says what to fix', () => {
  assert.throws(() => run({ items: [] }), /at least one item/);
  assert.throws(() => run({ items: [['Rent', 'X', 0, 100]] }), /kind must be E/);
  assert.throws(() => run({ items: [['Rent', 'E', -5, 100]] }), /positive figures/);
  assert.doesNotThrow(() => run({ items: [['', '', 0, 0], ['Rent', 'E', 0, 100]] }), 'an empty row is skipped');
});

/* ---------------------------------------------------------------- examples and the challenge */
test('every example and every layout computes, every frame draws, captions say why and say Add / Less (or credit / debit)', () => {
  const sets = def.presets.map(p => [p.label, p.values]).concat(['cost', 'fin', 'memo'].map(l => ['default ' + l, { layout: l }]));
  for (const [label, vals] of sets) {
    const r = run(vals);
    assert.ok(r.frames.length >= 3 && r.frames.length <= 120, label);
    r.frames.forEach((f, i) => {
      assert.ok(!/undefined|NaN|\[object/.test(f.caption), `${label} #${i}: ${f.caption}`);
      if (i && i <= r.sim.order.length) assert.match(f.caption, /\*\*(Add|Less|add|deduct)\*\*|\*\*(credit|debit)\*\*/, `${label} #${i}: ${f.caption}`);
      f.view.forEach(x => { const html = x.html != null ? x.html : diagram.render(x); assert.ok(!/undefined|NaN/.test(html.replace(/<[^>]+>/g, ' ')), `${label} #${i}`); });
    });
    assert.equal(r.stats.length, 4);
  }
  assert.ok(def.presets.filter(p => /ICAI MTP/.test(p.label)).length >= 2 && def.presets.some(p => /Tapri/.test(p.label)));
});
test('challenge: 400 problems per layout compute; the answer is a whole rupee, signed, and equals the statement\'s own figure', () => {
  for (const layout of ['cost', 'fin', 'memo']) {
    for (let s = 1; s <= 400; s++) {
      const v = Object.assign(base(), { layout }, def.challenge.gen(GA.util.rng(s * 6113)));
      const res = def.compute(v), want = def.challenge.solve(res, v);
      assert.ok(Number.isFinite(want), `${layout}#${s}`); near(want, Math.round(want), 1e-6);
      if (v.ask === 'end') assert.equal(want, res.sim.end);
      assert.ok(def.challenge.prompt(v, res).length > 20);
    }
  }
  assert.equal(def.challenge.kind, 'signed', 'profits and effects can be negative: the answer box has a minus key');
});
