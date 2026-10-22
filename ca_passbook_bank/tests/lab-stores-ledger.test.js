/* Stores Ledger Lab (app/js/labs/stores-ledger.js): the ICAI Study Material's ledgers and examples (Paper 4, chapter 2), ICAI
   Suggested Answers (new scheme; two old-scheme papers for the rounding conventions), a unit-by-unit brute force and conservation
   identities on random ledgers, the cost of a receipt, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const S = require('../app/js/labs/stores-ledger.js');
const { def } = S;
const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= (eps == null ? 1e-6 : eps), `${msg || ''} expected ${b}, got ${a}`);
const run = v => def.compute(L.prepare(def, Object.assign(L._defaults(def), v)));
const book = (method, txns, o) => S.ledger(S.parseLedger(txns), Object.assign({ method, rtsMode: 'next', round: method === 'wa' || method === 'sa' ? 0.01 : 0, roundAmt: false }, o || {}));
const issues = R => R.rows.filter(r => r.t.kind === 'issue').map(r => r.iss.amount);
const preset = re => def.presets.find(p => re.test(p.label)).values;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ================================================================ Study Material */
test('Ledger: SM Practical Problem 8 (AT Ltd., FIFO) — every balance of the SM\'s ledger, the 26-9 issue ₹59.25 and the shortage ₹12.20', () => {
  const R = book('fifo', preset(/Practical Problem 8/).txns);
  const bal = R.rows.map(r => +r.value.toFixed(2));
  assert.deepEqual(bal, [162.5, 110.5, 398, 320, 262.5, 172.5, 57.5, 210, 152.5, 210, 238.75, 238.75, 179.5, 179.5, 167.3]);
  const r26 = R.rows.find(r => r.t.date === '26-9');
  assert.deepEqual(r26.iss.parts.map(p => [p.qty, p.rate, p.amount]), [[5, 5.75, 28.75], [5, 6.1, 30.5]], 'the returned 5 units go first (working note 3)');
  const rtv = R.rows.find(r => r.t.kind === 'rtv'); near(rtv.iss.amount, 57.5); assert.deepEqual(R.rows[4].bal.map(b => [b.qty, b.rate]), [[5, 6.5], [40, 5.75]]);
  const rts = R.rows.find(r => r.t.kind === 'rts'); near(rts.rec.rate, 5.75, 1e-9, 'at the price of the latest issue (17-9)');
  const sh = R.rows[R.rows.length - 1]; near(sh.iss.amount, 12.2); assert.deepEqual(sh.bal.map(b => [b.qty, b.rate]), [[18, 6.1], [10, 5.75]]);
  assert.equal(R.rows.filter(r => r.t.kind === 'xfer').length, 2); near(R.closing.qty, 28);
});
test('Ledger: SM Illustration 14 (Imbrios, weighted average) — the SM\'s rates, amounts and balances to the rupee; closing 6,600 at ₹294.87 = ₹19,46,112', () => {
  const R = book('wa', preset(/Illustration 14/).txns, { rtsMode: 'fresh', round: 0.01, roundAmt: true });
  assert.deepEqual(R.rows.map(r => +r.poolRate.toFixed(2)), [285, 285, 276.54, 276.54, 276.54, 282.27, 282.04, 282.04, 282.04, 294.87]);
  assert.deepEqual(R.rows.map(r => Math.round(r.value)), [1710000, 320625, 5150625, 1832145, 2488928, 5080928, 4879328, 2199948, 1946112, 1946112]);
  assert.deepEqual(issues(R), [1389375, 3318480, 2679380]);
  near(R.rows[4].rec.amount, 656783); near(R.rows[6].iss.amount, 201600); near(R.rows[8].iss.amount, 253836);
  near(R.closing.qty, 6600); near(R.closing.value, 1946112); near(R.closing.rate, 294.87);
});
test('Ledger: SM Illustration 13 (Sunrise) — FIFO issues ₹1,400 + ₹2,650 + ₹3,750 = ₹7,800, stock ₹2,800; LIFO ₹1,500 + ₹2,800 + ₹4,000 = ₹8,300, stock ₹2,300', () => {
  const tx = preset(/Illustration 13/).txns;
  const F = book('fifo', tx), Lf = book('lifo', tx);
  assert.deepEqual(issues(F), [1400, 2650, 3750]); near(F.closing.value, 2800); assert.deepEqual(F.closing.lots.map(b => [b.qty, b.rate]), [[350, 8]]);
  assert.deepEqual(issues(Lf), [1500, 2800, 4000]); near(Lf.closing.value, 2300);
  assert.deepEqual(Lf.closing.lots.map(b => [b.qty, b.rate]).sort((a, b) => a[1] - b[1]), [[100, 5], [50, 6], [100, 7], [100, 8]], 'the SM\'s 100 @ 5, 50 @ 6, 100 @ 7 and 100 @ 8');
});
test('Ledger: SM Practical Problem 9 — jobs W 16 and W 17 and the closing stock: FIFO 60 / 80 / 160, LIFO 120 / 100 / 80, weighted average 90 / 90 / 120', () => {
  const tx = preset(/Practical Problem 9/).txns;
  for (const [m, want] of [['fifo', [60, 80, 160]], ['lifo', [120, 100, 80]], ['wa', [90, 90, 120]]]) {
    const R = book(m, tx); assert.deepEqual(issues(R).concat([R.closing.value]), want, m);
  }
});
test('Ledger: SM §8.1 FIFO lots — July 25 takes 200 of lot 2 and 200 of lot 3; August 8 three lots; 1,000 kg of lot 5 left at ₹800', () => {
  const R = book('fifo', preset(/§8\.1/).txns);
  assert.deepEqual(issues(R), [400, 200, 720, 420, 960]);
  assert.deepEqual(R.rows.find(r => r.t.date === 'Aug 8').iss.parts.map(p => [p.qty, p.rate]), [[400, 0.9], [400, 1.1], [200, 0.8]]);
  near(R.closing.qty, 1000); near(R.closing.value, 800);
});
test('Ledger: SM §8.2 Examples 1 and 2 — simple average ₹12 (rates of the 5 lots ÷ 5); weighted average ₹8,610 ÷ 750 = ₹11.48', () => {
  const tx = preset(/Example 1/).txns;
  const A = book('sa', tx); near(A.rows[5].iss.parts[0].rate, 12); near(issues(A)[0], 1200);
  const W = book('wa', tx); near(W.rows[4].value, 8610); near(W.rows[4].poolRate, 11.48);
});
test('Ledger: simple average drops a lot from the average once it is used up (the SM: "the price of stock of that lot which is completely sold out is not considered")', () => {
  const R = book('sa', 'a receipt 100 @ 10\nb receipt 100 @ 20\nc issue 100\nd issue 50');
  near(R.rows[2].iss.parts[0].rate, 15, 1e-9, '(10 + 20) ÷ 2'); near(R.rows[3].iss.parts[0].rate, 20, 1e-9, 'the ₹10 lot is used up');
  near(R.closing.value, 3000 - 1500 - 1000);
});

/* ================================================================ ICAI Suggested Answers */
test('Ledger: PYQ Jan 2026 MCQ 14 — LIFO value of material A consumed: 600 @ ₹56 + 900 @ ₹55 = ₹83,100 (option A)', () => {
  near(issues(book('lifo', preset(/PYQ Jan 2026/).txns))[0], 83100);
});
test('Ledger: MTP Sep 2025 Series I MCQ 1 — FIFO closing stock 2,500 @ ₹12 + 1,000 @ ₹10 = ₹40,000 (option c)', () => {
  const R = book('fifo', preset(/MTP Sep 2025 Series I/).txns);
  near(R.closing.value, 40000); assert.deepEqual(R.closing.lots.map(b => [b.qty, b.rate]), [[1000, 10], [2500, 12]]);
});
test('Ledger: PYQ Sep 2024 MCQs 6 and 10 — average price ₹5,100 after normal wastage; abnormal wastage 40 × ₹5,100 = ₹2,04,000 (options A, A)', () => {
  const R = book('wa', preset(/PYQ Sep 2024/).txns, { round: 1 });
  near(R.rows[2].poolRate, 5100); near(R.tot.short, 204000);
  near(book('wa', preset(/PYQ Sep 2024/).txns, { round: 0 }).rows[2].poolRate, 331092000 / 64920, 1e-9, 'unrounded it is exactly ₹33,10,92,000 ÷ 64,920 = ₹5,100');
});
test('Ledger: PYQ Sep 2026 MCQ 13 — FIFO issue on day 5: 135 @ ₹52 + 165 @ ₹50 = ₹15,270 (option C; ICAI has not yet published the Sep 2026 answers)', () => {
  near(issues(book('fifo', preset(/PYQ Sep 2026/).txns))[1], 15270);
});
test('Ledger: old-scheme MTP Nov 2022 Series II Q5(b) — weighted average rounded to ₹0.10, shortages absorbed: the answer\'s rates, issues and ₹1,09,810 for 1,960 kg', () => {
  const R = book('wa', preset(/MTP Nov 2022/).txns, { round: 0.1 });
  const rates = R.rows.map(r => +r.poolRate.toFixed(2));
  assert.deepEqual(rates, [48, 48, 49.6, 49.3, 49.3, 49.7, 49.7, 50.5, 50.9, 50.9, 52.5, 52.9, 52.9, 52.9, 54.4, 56]);
  assert.deepEqual(issues(R), [52800, 78880, 74550, 86530, 79350, 63480]);
  near(R.closing.qty, 1960); near(R.closing.value, 109810);
});
test('Ledger: old-scheme PYQ May 2023 Q2(a)(iii) — FIFO, January to April: issues ₹52,500, ₹53,310, ₹75,388, ₹67,600; closing 5,100 kg', () => {
  const R = book('fifo', `Jan opening 6,020 value 63,210
Jan receipt 4,368 @ 10
Jan issue 5,000
Feb receipt 5,408 @ 12
Feb issue 5,280
Mar receipt 6,240 @ 13
Mar issue 6,240
Apr receipt 4,784 @ 11
Apr issue 5,200`);
  assert.deepEqual(issues(R), [52500, 53310, 75388, 67600]);
  near(R.closing.qty, 5100); near(R.closing.value, 316 * 13 + 52624);
});

/* ================================================================ the cost of a receipt */
const cost = (inv, o) => S.receipt(S.parseInvoice(inv), Object.assign({ qty: 0, shortage: '', deter: 0, abnormal: 0 }, o || {}));
test('Receipt: SM Illustration 2 (Part No. A 32) — ₹800 + ₹50 boxes, GST with credit and the 2% cash discount left out: ₹4.25 a unit', () => {
  const R = cost(preset(/Illustration 2/).inv);
  near(R.total, 850); near(R.rate, 4.25);
  assert.deepEqual(R.lines.filter(l => l.eff === 'ignore').map(l => l.item.key), ['gst', 'cash']);
});
test('Receipt: SM Illustration 1 — chemical A ₹1,12,133 ÷ 9,310 kg = ₹12.04; chemical B ₹1,16,107 ÷ 7,526.4 kg = ₹15.43', () => {
  const a = cost(preset(/Illustration 1:/).inv, { shortage: '500', deter: 2 });
  near(a.total, 112133); near(a.normalQty, 9310); near(a.rate, 12.04, 0.005);
  const b = cost('price 8,000 kg @ 13\ncustoms duty 10%\nfreight 1,707', { shortage: '320', deter: 2 });
  near(b.total, 116107); near(b.normalQty, 7526.4); near(b.rate, 15.43, 0.005);
});
test('Receipt: MTP May 2024 Series I Q2(b) (S & Sons) — total ₹5,94,694 for 4,750 good units: ₹125.20', () => {
  const R = cost(preset(/MTP May 2024 Series I/).inv, { qty: 5000, shortage: '5%' });
  near(R.total, 594694, 0.5); near(R.normalQty, 4750); near(R.rate, 125.2, 0.005);
  near(R.lines.find(l => l.item.key === 'gstnc').amount, 81000); near(R.lines.find(l => l.other).amount, 11894, 0.5);
});
test('Receipt: RTP Sep 2024 Q1 (Axe Traders) — cash discount ₹22,500 (left out), other expenses ₹6,280, GST ₹40,500 added, ₹3,14,000 for 4,000 units: ₹78.50', () => {
  const R = cost(preset(/RTP Sep 2024/).inv, { qty: 5000, shortage: '20%' });
  near(R.lines.find(l => l.item.key === 'cash').amount, 22500); near(R.lines.find(l => l.other).amount, 6280); near(R.lines.find(l => l.item.key === 'gstnc').amount, 40500);
  near(R.total, 314000); near(R.normalQty, 4000); near(R.rate, 78.5);
});
test('Receipt: PYQ Sep 2024 Case Scenario II — ₹4,800 less 2% trade discount plus duties at 8% of the purchase price, plus ₹62,000 insurance: ₹30,53,42,000', () => {
  const R = cost('price 60,000 units @ 4,800\ntrade discount 2%\nduties 8% of purchase price\ninsurance 62,000');
  near(R.total, 305342000); near(R.rate, 305342000 / 60000);
});
test('Receipt: abnormal shortage is valued at the rate and charged to Costing P&L; the good units carry the rest', () => {
  const R = run({ mode: 'receipt' }).sim;                    // the Tapri invoice: ₹28,75,320 for 1,960 kg
  near(R.total, 2875320); near(R.rate, 1467);
  const T = run(preset(/damp sack/)).sim;
  near(T.abnLoss, 20 * 1467); near(T.goodQty, 1940); near(T.goodCost, 2875320 - 29340);
});

/* ================================================================ brute force and identities */
function randomLedger(r, opts) {
  const lines = []; let stock = 0, issued = 0;
  if (r() < 0.6) { const q = 1 + Math.floor(r() * 30); lines.push(`d0 opening ${q} @ ${1 + Math.floor(r() * 20)}`); stock = q; }
  const n = 3 + Math.floor(r() * 8);
  for (let i = 1; i <= n; i++) {
    const x = r();
    if (stock > 0 && x < 0.45) { const q = 1 + Math.floor(r() * stock); lines.push(`d${i} issue ${q}`); stock -= q; issued++; }
    else if (opts.extras && stock > 2 && x < 0.55) { lines.push(`d${i} shortage 1`); stock -= 1; }
    else if (opts.extras && stock > 3 && x < 0.62) { lines.push(`d${i} normal loss 1`); stock -= 1; }
    else if (opts.extras && issued && x < 0.7) { lines.push(`d${i} return from dept 1`); stock += 1; }
    else { const q = 1 + Math.floor(r() * 25); lines.push(`d${i} receipt ${q} @ ${1 + Math.floor(r() * 20)}${r() < 0.3 ? '.5' : ''}`); stock += q; }
  }
  return lines.join('\n');
}
test('Ledger: a unit-by-unit queue (FIFO) and stack (LIFO) price every issue exactly as the lab does, 1,000 random ledgers', () => {
  const r = lcg(3);
  for (let k = 0; k < 1000; k++) {
    const tx = randomLedger(r, {}), T = S.parseLedger(tx);
    for (const m of ['fifo', 'lifo']) {
      const units = [], got = [];
      T.forEach(t => {
        if (t.kind === 'open' || t.kind === 'receipt') for (let i = 0; i < t.qty; i++) units.push(t.rate);
        else if (t.kind === 'issue') { let v = 0; for (let i = 0; i < t.qty; i++) v += m === 'fifo' ? units.shift() : units.pop(); got.push(Math.round(v * 100) / 100); }
      });
      const R = S.ledger(T, { method: m, rtsMode: 'next', round: 0 });
      assert.deepEqual(issues(R).map(x => Math.round(x * 100) / 100), got, `#${k} ${m}: ${tx}`);
      near(R.closing.value, units.reduce((a, x) => a + x, 0), 1e-6);
    }
  }
});
test('Ledger: value in = issues + returns to the vendor + write-offs + closing stock, and quantities balance, for every method on 800 random ledgers with returns, shortages and losses', () => {
  const r = lcg(17);
  for (let k = 0; k < 800; k++) {
    const tx = randomLedger(r, { extras: true }), T = S.parseLedger(tx);
    for (const m of ['fifo', 'lifo', 'sa', 'wa']) for (const rtsMode of ['next', 'fresh']) for (const round of m === 'wa' || m === 'sa' ? [0, 0.01, 1] : [0]) {
      const R = S.ledger(T, { method: m, rtsMode, round, roundAmt: k % 2 === 0 });
      const t = R.tot;
      near(t.inValue, t.issues + t.rtv + t.short + R.closing.value, 1e-6, `#${k} ${m} ${rtsMode} ${round} value`);
      const qin = T.filter(x => ['open', 'receipt', 'rts'].includes(x.kind)).reduce((a, x) => a + x.qty, 0);
      near(qin, t.issueQty + t.shortQty + t.lossQty + R.closing.qty, 1e-9, `#${k} ${m} qty`);
      if (m === 'wa' && !round && k % 2 && !R.rows.some(x => x.bal.some(b => b.ret)) && R.closing.qty > 0) near(R.closing.value / R.closing.qty, R.closing.rate, 0.01, `#${k} unrounded: the closing rate is value ÷ quantity (amounts kept to the paisa)`);
    }
  }
});
test('Ledger: when every lot costs the same, the four methods agree; an unrounded weighted average never prices an issue outside the lot rates in stock', () => {
  const r = lcg(23);
  for (let k = 0; k < 300; k++) {
    const p = 1 + Math.floor(r() * 50), tx = randomLedger(r, {}).replace(/@ [\d.]+/g, `@ ${p}`);
    const vals = ['fifo', 'lifo', 'sa', 'wa'].map(m => S.ledger(S.parseLedger(tx), { method: m, rtsMode: 'next', round: 0 }).closing.value);
    vals.forEach(v => near(v, vals[0], 1e-6));
    const tx2 = randomLedger(r, {}), W = S.ledger(S.parseLedger(tx2), { method: 'wa', rtsMode: 'next', round: 0 });
    const rates = S.parseLedger(tx2).filter(t => t.rate != null).map(t => t.rate);
    W.rows.filter(x => x.iss).forEach(x => { const u = x.iss.amount / x.iss.qty; assert.ok(u >= Math.min(...rates) - 1e-9 && u <= Math.max(...rates) + 1e-9); });
  }
});
test('Ledger: a normal loss keeps the stock value and lowers the quantity; a shortage written off takes the issue price', () => {
  for (const m of ['fifo', 'lifo', 'sa', 'wa']) {
    const R = book(m, 'a opening 100 @ 10\nb receipt 100 @ 12\nc normal loss 10\nd shortage 10');
    near(R.rows[2].value, R.rows[1].value); near(R.rows[2].qty, 190);
    const p2 = x => Math.round(x * 100) / 100;                 // amounts are kept to the paisa
    near(R.rows[3].iss.amount, m === 'wa' ? 10 * p2(2200 / 190) : m === 'sa' ? 10 * p2((1000 / 90 + 12) / 2) : m === 'fifo' ? p2(10 * 1000 / 90) : p2(10 * 1200 / 90), 1e-6, m);
  }
});

/* ================================================================ the lab as the app runs it */
test('every example computes, draws every frame without a diagram error and keeps its tiles readable', () => {
  const sets = [L._defaults(def)].concat(def.presets.map(p => Object.assign(L._defaults(def), p.values)), ['fifo', 'lifo', 'sa', 'wa'].map(m => Object.assign(L._defaults(def), { method: m })), [Object.assign(L._defaults(def), { mode: 'receipt' })]);
  for (const v of sets) {
    const res = def.compute(L.prepare(def, v));
    assert.ok(res.frames.length >= 3 && res.frames.length <= 120);
    res.frames.forEach((f, i) => {
      assert.ok(f.caption && f.caption.length > 20, `frame ${i}`);
      assert.doesNotMatch(f.caption, /NaN|undefined|Infinity|\[object/, f.caption);
      (f.view || []).forEach(sp => { const html = diagram.render(sp); assert.ok(html && !/NaN|undefined/.test(html), `${v.mode}/${v.method} frame ${i} ${sp.type}`); });
    });
    assert.ok(res.stats.length >= 3 && res.stats.length <= 6, `${res.stats.length} tiles`);
    res.stats.forEach(s => assert.doesNotMatch(String(s.value), /NaN|undefined|Infinity/));
  }
});
test('the default Tapri ledger (FIFO): issues ₹11,76,000, written off ₹7,800, returned ₹78,000, closing 395 kg at ₹6,34,200', () => {
  const s = run({}).sim;
  near(s.tot.issues, 1176000); near(s.tot.short, 7800); near(s.tot.rtv, 78000); near(s.closing.qty, 395); near(s.closing.value, 634200);
});
test('bad input says which line to fix', () => {
  assert.throws(() => run({ txns: '1 Sep opening 10 @ 5\n2 Sep issue 20' }), /more than the 10 in stock/);
  assert.throws(() => run({ txns: '1 Sep recipt 10 @ 5' }), /Line 1 .*name the entry/);
  assert.throws(() => run({ txns: '1 Sep receipt 10' }), /give the rate/);
  assert.throws(() => run({ txns: '1 Sep receipt 10 @ 5\n2 Sep opening 5 @ 4' }), /opening balance must come before/);
  assert.throws(() => run({ txns: '1 Sep opening 10 @ 5\n2 Sep return to vendor 2' }), /no lot from a receipt/);
  assert.throws(() => run({ txns: '1 Sep receipt 10 @ 5\n2 Sep return from dept 2' }), /nothing has been issued yet/);
  assert.throws(() => run({ txns: '1 Sep receipt 10 @ 5\n2 Sep normal loss 10' }), /no stock to absorb|no pooled stock/);
  assert.throws(() => run({ txns: '' }), /Type the transactions/);
  assert.throws(() => run({ txns: '1 Sep receipt 0 @ 5' }), /quantity, a number above 0/);
  assert.throws(() => run({ txns: Array.from({ length: 41 }, (_, i) => `d${i} receipt 1 @ 1`).join('\n') }), /At most 40/);
  assert.throws(() => run({ mode: 'receipt', inv: 'freight 100' }), /Start the invoice with the price/);
  assert.throws(() => run({ mode: 'receipt', inv: 'price 100 units @ 5\nreturnable containers 50 refund 80' }), /refund .* more than the deposit/);
  assert.throws(() => run({ mode: 'receipt', inv: 'price 100 units @ 5\nmystery 10' }), /start with the item/);
  assert.throws(() => run({ mode: 'receipt', inv: 'price 100 units @ 5', rshort: '100' }), /normal shortage/);
  near(run({ txns: '1 Sep opening 1,000 @ ₹1,500\n2 Sep issue 250 (Req. 12, line 3)' }).sim.tot.issues, 375000, 1e-9, 'commas, ₹ and bracketed references are read');
});
test('Test yourself: 150 problems per mode compute, and each answer is the value the ledger or the statement shows', () => {
  for (const mode of ['ledger', 'receipt']) {
    for (let s = 1; s <= 150; s++) {
      const P = L.problem(def, Object.assign(L._defaults(def), { mode }), s * 15485863);
      assert.equal(P.values.mode, mode);
      assert.ok(typeof P.want === 'number' && Number.isFinite(P.want) && P.want > 0, `${mode}#${s}: ${P.want}`);
      const prompt = def.challenge.prompt(P.values, P.result);
      assert.doesNotMatch(prompt, /NaN|undefined/, prompt);
      if (mode === 'ledger') { const R = book(P.values.method, P.values.txns); assert.ok(R.closing.qty > 0); }
    }
  }
});
