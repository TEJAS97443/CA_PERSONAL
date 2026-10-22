/* PassBook — Stores Ledger Lab (Paper 4, Material Cost: lessons cma.mat.issues and cma.mat.receipts). Owner: job lab-c1.
   Two modes, chosen by the first control:
     ledger   a priced stores ledger built row by row in ICAI's columns (receipts / issues / balance: quantity, rate, amount) under FIFO,
              LIFO, simple average or weighted average, for receipts, issues, returns to the vendor, returns from departments, shortages
              written off, normal losses absorbed and transfers (no entry); the lots in stock drawn as a stack, with the lots each issue
              takes; a closing comparison of the four methods
     receipt  the cost of one receipt: an invoice taken line by line with the Study Material's treatment of each item (discounts,
              taxes with or without input credit, freight, containers, penalties, other expenses), then the good quantity and the rate
   Verified against the ICAI Study Material (Paper 4, chapter 2: §4 Illustrations 1–2, §8–9, the FIFO example of §8.1, Examples 1–2 of
   §8.2, Illustrations 13–14, Practical Problems 8–9) and ICAI Suggested Answers (PYQ Jan 2026 MCQ 14, MTP Sep 2025 S-I MCQ 1, PYQ Sep
   2024 MCQs 6 and 10, MTP May 2024 S-I Q2(b), RTP Sep 2024 Q1; old scheme: MTP Nov 2022 S-II Q5(b), PYQ May 2023 Q2(a)):
   tests/lab-stores-ledger.test.js. Pure part: parseLedger, ledger, parseInvoice, receipt, compute. Node: require(...) -> {…, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;
  const r2 = x => Math.round((x + (x >= 0 ? 1e-9 : -1e-9)) * 100) / 100;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const nf = x => grp(r2(x));
  const m2 = x => { const v = r2(x); return (v < 0 ? '−' : '') + Math.abs(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };   // ledger amounts: 162.50
  const inr = x => { const v = r2(x), a = Math.abs(v); return (v < 0 ? '−' : '') + '₹' + a.toLocaleString('en-IN', Number.isInteger(a) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const rate = x => { const v = Math.round(x * 1e4) / 1e4; return Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? m2(v) : grp(v, 4); };   // 6.50, 276.54, 6.7778
  const num = s => Number(String(s).replace(/[,₹\s]/g, ''));
  /* prose: whole rupees without paise (₹1,500), a fractional rate to 2–4 decimals (₹5.75, ₹276.5436) */
  const rp = x => { const v = Math.round(x * 1e4) / 1e4; return Number.isInteger(v) ? '₹' + grp(v) : '₹' + rate(v); };

  /* ================================================================ ledger: the transactions text */
  const KEYS = [
    ['returned to the vendor', 'rtv'], ['return to the vendor', 'rtv'], ['returned to vendor', 'rtv'], ['return to vendor', 'rtv'], ['returned to supplier', 'rtv'], ['return to supplier', 'rtv'], ['rtv', 'rtv'],
    ['returned from department', 'rts'], ['return from department', 'rts'], ['returned to stores', 'rts'], ['return to stores', 'rts'], ['returned from', 'rts'], ['return from', 'rts'], ['rts', 'rts'], ['mrr', 'rts'],
    ['normal shortage', 'loss'], ['normal loss', 'loss'], ['normal wastage', 'loss'], ['evaporation', 'loss'],
    ['abnormal shortage', 'short'], ['abnormal loss', 'short'], ['abnormal wastage', 'short'], ['shortage', 'short'], ['missing', 'short'], ['pilferage', 'short'],
    ['opening balance', 'open'], ['opening stock', 'open'], ['opening', 'open'], ['balance b/f', 'open'],
    ['replacement', 'receipt'], ['receipts', 'receipt'], ['receipt', 'receipt'], ['received', 'receipt'], ['purchases', 'receipt'], ['purchased', 'receipt'], ['purchase', 'receipt'], ['grn', 'receipt'],
    ['issues', 'issue'], ['issued', 'issue'], ['issue', 'issue'], ['requisition', 'issue'], ['consumption', 'issue'], ['consumed', 'issue'],
    ['transfer', 'xfer'], ['mtr', 'xfer']
  ];
  const KIND = { open: 'Opening balance', receipt: 'Receipt', issue: 'Issue', rtv: 'Return to vendor', rts: 'Return from department', short: 'Shortage written off', loss: 'Normal loss absorbed', xfer: 'Transfer (no entry)' };
  const KEYRE = new RegExp('(^|[^a-z])(' + KEYS.map(k => k[0].replace(/[/.]/g, '\\$&')).join('|') + ')(?![a-z])', 'i');
  const MAXLINES = 40;
  /** lines like '6-9-22 receipt 50 @ 5.75', '1 Sep opening 25 value 162.50', '20 Sep return from dept 5'; '#' starts a comment */
  function parseLedger(text) {
    const out = [];
    String(text == null ? '' : text).split('\n').forEach((raw, i) => {
      const line = raw.replace(/#.*$/, '').trim();
      if (!line) return;
      const m = KEYRE.exec(line);
      if (!m) throw new Error(`Line ${i + 1} (“${line}”): name the entry after its date: opening, receipt, issue, return to vendor, return from department, shortage, normal loss or transfer.`);
      const at = m.index + m[1].length, kw = m[2].toLowerCase(), kind = KEYS.find(k => k[0] === kw)[1];
      const date = line.slice(0, at).trim().replace(/[:,–—-]\s*$/, '').trim() || `Line ${out.length + 1}`;
      const rest = line.slice(at + kw.length).replace(/\([^)]*\)|\[[^\]]*\]/g, ' ');
      const nre = /(@|\bat\b|\bvalue\b|\bvalued at\b|\bworth\b|=|\bamount\b)?\s*₹?\s*(\d[\d,]*(?:\.\d+)?)/gi;
      let qty = null, rt = null, val = null, mm;
      while ((mm = nre.exec(rest))) {
        const tag = (mm[1] || '').toLowerCase(), n = num(mm[2]);
        if (!tag && qty == null) qty = n;
        else if (tag === '@' || tag === 'at') rt = n;
        else if (tag) val = n;
      }
      if (kind === 'xfer') { out.push({ line: i + 1, date, kind, qty: qty || 0, text: line }); return; }
      if (!(qty > 0)) throw new Error(`Line ${i + 1} (“${line}”): give the quantity, a number above 0.`);
      if ((kind === 'open' || kind === 'receipt') && rt == null && val == null) throw new Error(`Line ${i + 1} (“${line}”): give the rate (@ 5.75) or the value (value 162.50) of the ${kind === 'open' ? 'opening balance' : 'receipt'}.`);
      if (rt == null && val != null) rt = val / qty;
      out.push({ line: i + 1, date, kind, qty, rate: rt, value: val, text: line });
    });
    if (!out.length) throw new Error('Type the transactions, one a line, e.g. “1 Sep opening 25 @ 6.50”.');
    if (out.length > MAXLINES) throw new Error(`At most ${MAXLINES} lines, please (there are ${out.length}).`);
    out.forEach((t, k) => { if (t.kind === 'open' && k > 0 && out.slice(0, k).some(x => x.kind !== 'open')) throw new Error(`Line ${t.line}: an opening balance must come before the other entries.`); });
    return out;
  }

  /* ================================================================ ledger: the simulation */
  const METHODS = { fifo: 'FIFO', lifo: 'LIFO', sa: 'Simple average', wa: 'Weighted average' };
  const roundTo = (x, step) => (step > 0 ? Math.round(x / step + 1e-9) * step : x);
  /** run the ledger. o: {method, rtsMode: 'next' | 'fresh', round: issue-rate step for the averages (0.01, 0.1, 1 or 0 = exact), roundAmt} */
  function ledger(txns, o) {
    const method = o.method, step = +o.round || 0, amt = x => (o.roundAmt ? Math.round(x + 1e-9) : r2(x));
    let lots = [], seq = 0, lastIssue = null, lastReceipt = null;
    const pool = { qty: 0, value: 0, rate: 0 };              // weighted average: the pooled stock (returns kept apart are lots)
    let run = 0;                                             // simple average: the balance is the running total (lots keep their own prices for the average)
    const rows = [], tot = { issues: 0, issueQty: 0, rtv: 0, short: 0, shortQty: 0, lossQty: 0, inValue: 0 };
    const stockQty = () => lots.reduce((a, l) => a + l.qty, 0) + (method === 'wa' ? pool.qty : 0);
    const stockVal = () => (method === 'sa' ? run : lots.reduce((a, l) => a + l.value, 0) + (method === 'wa' ? pool.value : 0));
    const waRate = () => { pool.rate = pool.qty > EPS ? roundTo(pool.value / pool.qty, step) : 0; };
    const saRate = () => { const ls = lots.filter(l => !l.ret && l.qty > EPS); return ls.length ? roundTo(ls.reduce((a, l) => a + l.value / l.qty, 0) / ls.length, step) : 0; };
    /* the issue order: returns kept for the next requisition first, then the oldest lot (FIFO, simple average) or the newest (LIFO) */
    const order = () => { const ret = lots.filter(l => l.ret), rest = lots.filter(l => !l.ret); return ret.concat(method === 'lifo' ? rest.slice().reverse() : rest); };
    const newLot = (qty, rt, value, src, date, ret) => ({ id: seq++, qty, rate: rt, value, src, date, ret: !!ret });
    /** take q units out in issue order; price = 'lot' (each lot at its own rate) or a number (one rate for every unit) */
    function take(q, price) {
      const parts = []; let left = q;
      for (const l of order()) {
        if (left <= EPS) break;
        const k = Math.min(l.qty, left), whole = Math.abs(k - l.qty) < EPS;
        const lotVal = whole ? l.value : r2(k * (l.value / l.qty));
        const charge = price === 'lot' ? lotVal : amt(k * price);
        parts.push({ qty: k, rate: price === 'lot' ? l.value / l.qty : price, amount: charge, lot: l.id, lotRate: l.value / l.qty, date: l.date, ret: l.ret, whole });
        l.qty -= k; l.value -= lotVal; left -= k;
        if (l.qty < EPS) { l.qty = 0; l.value = 0; }
      }
      lots = lots.filter(l => l.qty > EPS);
      return parts;
    }
    const balance = () => method === 'wa'
      ? lots.filter(l => l.ret).map(l => ({ qty: l.qty, rate: l.value / l.qty, value: l.value, ret: true, id: l.id })).concat(pool.qty > EPS ? [{ qty: pool.qty, rate: pool.rate, value: pool.value, pool: true }] : [])
      : (method === 'lifo' ? lots.filter(l => !l.ret).concat(lots.filter(l => l.ret)) : order()).map(l => ({ qty: l.qty, rate: l.value / l.qty, value: l.value, ret: l.ret, id: l.id, date: l.date }));   // FIFO / simple average: in issue order (returns kept apart first); LIFO: oldest first
    /* the issue column of a priced issue (issue or shortage written off) */
    function priced(q, t) {
      if (q > stockQty() + EPS) throw new Error(`${t.date}: ${t.kind === 'short' ? 'a shortage' : 'an issue'} of ${nf(q)} is more than the ${nf(stockQty())} in stock.`);
      const pre = method === 'sa' ? saRate() : null, retParts = [];
      if (method === 'wa' || method === 'sa') {                // returns kept apart go first at their own price; the rest at the average
        let left = q;
        while (left > EPS && lots.some(l => l.ret)) {
          const l = lots.find(x => x.ret), k = Math.min(l.qty, left), whole = Math.abs(k - l.qty) < EPS, v = whole ? l.value : r2(k * (l.value / l.qty));
          retParts.push({ qty: k, rate: l.value / l.qty, amount: v, lot: l.id, ret: true, whole }); l.qty -= k; l.value -= v; left -= k;
          if (l.qty < EPS) lots = lots.filter(x => x !== l);
        }
        if (left <= EPS) return { parts: retParts, avg: null };
        if (method === 'wa') {
          const rt = pool.rate, all = Math.abs(left - pool.qty) < EPS, a = all ? pool.value : amt(left * rt);
          pool.qty -= left; pool.value -= a; if (pool.qty < EPS) { pool.qty = 0; pool.value = 0; }
          return { parts: retParts.concat([{ qty: left, rate: rt, amount: a, pool: true }]), avg: rt };
        }
        const rt = saRate(), parts = take(left, rt);            // simple average: lots leave first-in-first-out; every unit at the average rate
        const sum = parts.reduce((a, p) => a + p.amount, 0);
        const merged = [{ qty: left, rate: rt, amount: sum, lots: parts }];
        return { parts: retParts.concat(merged), avg: rt, pre };
      }
      return { parts: take(q, 'lot'), avg: null };
    }
    txns.forEach(t => {
      const row = { t, rec: null, iss: null, note: '' };
      const before = { qty: stockQty(), value: stockVal(), lots: balance(), poolRate: pool.rate, sa: method === 'sa' ? saRate() : null };
      if (t.kind === 'open' || t.kind === 'receipt') {
        const a = t.value != null ? t.value : r2(t.qty * t.rate);
        row.rec = { qty: t.qty, rate: a / t.qty, amount: a };
        tot.inValue += a; run += a;
        if (method === 'wa') { pool.qty += t.qty; pool.value += a; waRate(); }
        else lots.push(newLot(t.qty, a / t.qty, a, t.kind, t.date));
        lastReceipt = { rate: a / t.qty, date: t.date };
      } else if (t.kind === 'issue' || t.kind === 'short') {
        const P = priced(t.qty, t), a = P.parts.reduce((s, p) => s + p.amount, 0);
        row.iss = { qty: t.qty, parts: P.parts, amount: a, avg: P.avg, pre: P.pre }; run -= a;
        if (t.kind === 'issue') { tot.issues += a; tot.issueQty += t.qty; lastIssue = { rate: a / t.qty, date: t.date }; } else { tot.short += a; tot.shortQty += t.qty; }
      } else if (t.kind === 'rtv') {
        if (method === 'wa') {
          const rt = t.rate != null ? t.rate : lastReceipt ? lastReceipt.rate : null;
          if (rt == null) throw new Error(`${t.date}: nothing has been received yet, so nothing can go back to the vendor.`);
          if (t.qty > pool.qty + EPS) throw new Error(`${t.date}: only ${nf(pool.qty)} are in stock to return.`);
          const a = t.value != null ? t.value : r2(t.qty * rt);
          pool.qty -= t.qty; pool.value -= a; waRate();
          row.iss = { qty: t.qty, parts: [{ qty: t.qty, rate: a / t.qty, amount: a, pool: true }], amount: a, rtv: true };
          tot.rtv += a;
        } else {
          const want = t.rate != null ? t.rate : null;
          const cands = lots.filter(l => !l.ret && (l.src === 'receipt' || l.src === 'open') && (want == null || Math.abs(l.value / l.qty - want) < 0.005));
          const lot = want == null ? lots.filter(l => !l.ret && l.src === 'receipt').slice(-1)[0] : cands.slice(-1)[0];
          if (!lot) throw new Error(`${t.date}: no lot ${want != null ? `at ₹${rate(want)} ` : 'from a receipt '}is in stock to return to the vendor.`);
          if (t.qty > lot.qty + EPS) throw new Error(`${t.date}: only ${nf(lot.qty)} of the ₹${rate(lot.value / lot.qty)} lot are left to return.`);
          const whole = Math.abs(t.qty - lot.qty) < EPS, a = whole ? lot.value : r2(t.qty * (lot.value / lot.qty));
          lot.qty -= t.qty; lot.value -= a; lots = lots.filter(l => l.qty > EPS);
          row.iss = { qty: t.qty, parts: [{ qty: t.qty, rate: a / t.qty, amount: a, lot: lot.id }], amount: a, rtv: true, lotDate: lot.date }; run -= a;
          tot.rtv += a;
        }
      } else if (t.kind === 'rts') {
        const rt = t.rate != null ? t.rate : lastIssue ? lastIssue.rate : null;
        if (rt == null) throw new Error(`${t.date}: nothing has been issued yet, so nothing can come back from a department (or give its rate: @ 5.75).`);
        const a = t.value != null ? t.value : amt(t.qty * rt);
        row.rec = { qty: t.qty, rate: t.value != null ? a / t.qty : rt, amount: a, rts: true, given: t.rate != null };
        tot.inValue += a; run += a;
        if (o.rtsMode === 'fresh') {
          if (method === 'wa') { const keep = step > 0 && Math.abs(rt - pool.rate) < 1e-9 && pool.qty > EPS; pool.qty += t.qty; pool.value += a; if (!keep) waRate(); row.keptRate = keep; }   // back at the current issue rate: the SM keeps the rate (Illustration 14)
          else lots.push(newLot(t.qty, a / t.qty, a, 'rts', t.date));
        } else lots.push(newLot(t.qty, a / t.qty, a, 'rts', t.date, true));
      } else if (t.kind === 'loss') {
        if (t.qty >= stockQty() - EPS) throw new Error(`${t.date}: a normal loss of ${nf(t.qty)} would leave no stock to absorb it.`);
        if (method === 'wa') { if (t.qty >= pool.qty - EPS) throw new Error(`${t.date}: a normal loss of ${nf(t.qty)} would leave no pooled stock to absorb it.`); pool.qty -= t.qty; waRate(); row.loss = { qty: t.qty }; }
        else {                                                   // the lot next in line loses the units and keeps their value
          const ord = order(); let left = t.qty, moved = 0; const hit = [];
          for (const l of ord) { if (left <= EPS) break; const k = Math.min(l.qty, left), v = Math.abs(k - l.qty) < EPS ? l.value : k * (l.value / l.qty); l.qty -= k; l.value -= v; moved += v; left -= k; hit.push(l); }
          lots = lots.filter(l => l.qty > EPS);
          const keeper = order()[0] || null;
          keeper.value += moved;
          row.loss = { qty: t.qty, keeper: keeper ? keeper.id : null, keeperRate: keeper ? keeper.value / keeper.qty : null };
        }
        tot.lossQty += t.qty;
      }
      row.bal = balance(); row.qty = stockQty(); row.value = stockVal(); row.poolRate = pool.rate; row.before = before;
      if (method === 'sa') row.saAfter = saRate();
      rows.push(row);
    });
    return { method, rows, tot, closing: { qty: stockQty(), value: stockVal(), lots: balance(), rate: method === 'wa' ? pool.rate : null } };
  }

  /* ================================================================ receipt: the invoice text */
  const ITEMS = [
    ['purchase price', 'price'], ['listed price', 'price'], ['list price', 'price'], ['invoice price', 'price'], ['basic price', 'price'], ['price', 'price'],
    ['trade discount', 'trade'], ['quantity discount', 'qtydisc'], ['cash discount', 'cash'], ['subsidy', 'subsidy'], ['grant', 'subsidy'], ['incentive', 'subsidy'],
    ['gst', 'gst'], ['cgst and sgst', 'gst'], ['igst', 'gst'], ['customs duty', 'duty'], ['custom duty', 'duty'], ['duties', 'duty'], ['duty', 'duty'],
    ['road tax', 'toll'], ['toll tax', 'toll'], ['toll', 'toll'], ['demurrage', 'penalty'], ['detention', 'penalty'], ['penalty', 'penalty'], ['fine', 'penalty'],
    ['freight and insurance', 'freight'], ['freight', 'freight'], ['carriage', 'freight'], ['transport', 'freight'], ['insurance', 'insurance'],
    ['commission and brokerage', 'commission'], ['commission', 'commission'], ['brokerage', 'commission'],
    ['returnable containers', 'retcont'], ['returnable container', 'retcont'], ['non-returnable containers', 'container'], ['containers', 'container'], ['packing', 'container'],
    ['other expenses', 'other']
  ].sort((a, b) => b[0].length - a[0].length);
  const TREAT = {
    price: ['add', 'the invoice price of the goods: the starting point'],
    trade: ['less', 'trade discount is deducted from the purchase price'],
    qtydisc: ['less', 'a quantity discount is deducted, like a trade discount'],
    subsidy: ['less', 'a subsidy, grant or incentive is deducted from the cost of purchase'],
    cash: ['ignore', 'cash discount is not deducted: it is an interest and finance item'],
    gst: ['ignore', 'GST is left out when its input credit is available (unless stated, assume it is)'],
    gstnc: ['add', 'GST is added because no input credit is available'],
    duty: ['add', 'customs duty paid on import is added to the purchase cost'],
    toll: ['add', 'road tax or toll paid by the buyer is part of the cost of purchase'],
    penalty: ['ignore', 'demurrage, detention charges, fines and penalties are abnormal costs, not part of the cost of purchase'],
    freight: ['add', 'freight inward (and insurance in transit) is directly attributable to the purchase'],
    insurance: ['add', 'insurance in transit protects the goods on the way: added'],
    commission: ['add', 'commission or brokerage paid on the purchase is added'],
    container: ['add', 'the cost of non-returnable containers is added'],
    retcont: ['add', 'returnable containers: only the part not refunded is added'],
    other: ['add', 'other expenses given as a % of the total cost are grossed up: subtotal × p ÷ (100 − p)']
  };
  const ITEMRE = new RegExp('^(' + ITEMS.map(k => k[0].replace(/[-/.]/g, '\\$&')).join('|') + ')(?![a-z])', 'i');
  function parseInvoice(text) {
    const out = [];
    String(text == null ? '' : text).split('\n').forEach((raw, i) => {
      const line = raw.replace(/#.*$/, '').trim();
      if (!line) return;
      const m = ITEMRE.exec(line.replace(/^(add|less)[:\s]+/i, ''));
      if (!m) throw new Error(`Invoice line ${i + 1} (“${line}”): start with the item, e.g. price, trade discount, quantity discount, cash discount, GST, customs duty, freight, insurance, commission, toll tax, demurrage, containers, returnable containers, subsidy or other expenses.`);
      const body = line.replace(/^(add|less)[:\s]+/i, ''), kw = m[1].toLowerCase(), rest = body.slice(m[0].length);
      let key = ITEMS.find(k => k[0] === kw)[1];
      const low = rest.toLowerCase();
      if (key === 'gst' && /no(t)?\s*(input\s*)?credit|credit\s*not|without\s*credit|unregistered/.test(low)) key = 'gstnc';
      const disp = line.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim().replace(/^(add|less)[:\s]+/i, '').replace(/^gst\b/i, 'GST').replace(/^cgst and sgst\b/i, 'CGST and SGST').replace(/^igst\b/i, 'IGST');
      const it = { line: i + 1, key, text: disp, why: (/\(([^)]*)\)/.exec(line) || [])[1] || '' };
      const nums = [...rest.replace(/\([^)]*\)/g, ' ').matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(%)?/g)].map(x => ({ n: num(x[1]), pct: !!x[2], at: x.index }));
      if (key === 'price') {
        const um = /(\d[\d,]*(?:\.\d+)?)\s*[a-z.]*\s*(?:@|at)\s*₹?\s*(\d[\d,]*(?:\.\d+)?)/i.exec(rest);
        if (um) { it.qty = num(um[1]); it.unitRate = num(um[2]); it.amount = it.qty * it.unitRate; }
        else if (nums.length) it.amount = nums[0].n;
      } else if (key === 'retcont') {
        it.amount = nums.length ? nums[0].n : NaN; const rf = /refund(?:ed)?\D*(\d[\d,]*(?:\.\d+)?)/i.exec(rest); it.refund = rf ? num(rf[1]) : 0;
      } else if (nums.length) {
        if (nums[0].pct) { it.pct = nums[0].n; it.base = /of\s*(the\s*)?total/.test(low) ? 'total' : /of\s*(the\s*)?(list(ed)?\s*|purchase\s*|gross\s*|invoice\s*)?price|of\s*gross/.test(low) ? 'gross' : (key === 'trade' || key === 'qtydisc') ? 'gross' : 'net'; }
        else it.amount = nums[0].n;
      }
      if (key === 'other' && it.base !== 'total' && it.pct != null) it.base = 'total';
      if (!(it.amount >= 0) && it.pct == null) throw new Error(`Invoice line ${i + 1} (“${line}”): give an amount (12,500) or a % (10%).`);
      if (it.pct != null && !(it.pct >= 0 && it.pct < 100)) throw new Error(`Invoice line ${i + 1}: a % must be between 0 and 100.`);
      out.push(it);
    });
    if (!out.some(x => x.key === 'price')) throw new Error('Start the invoice with the price of the goods, e.g. “price 5,000 units @ 100” or “price 5,00,000”.');
    return out;
  }
  /** the cost of one receipt. o: {qty, shortage: units or '5%', deter: % provision on the quantity left, abnormal: units} */
  function receipt(items, o) {
    const price = items.filter(x => x.key === 'price').reduce((a, x) => a + x.amount, 0);
    const qty = o.qty > 0 ? o.qty : items.filter(x => x.key === 'price' && x.qty).reduce((a, x) => a + x.qty, 0);
    if (!(qty > 0)) throw new Error('Give the quantity received (or write the price as “price 5,000 units @ 100”).');
    if (!(price > 0)) throw new Error('The price of the goods must be above ₹0.');
    const disc = items.filter(x => x.key === 'trade' || x.key === 'qtydisc').reduce((a, x) => a + (x.pct != null ? price * x.pct / 100 : x.amount), 0);
    const net = price - disc;
    const lines = [];
    let sub = 0;
    items.forEach(x => {
      if (x.key === 'other') return;
      const [eff, why] = TREAT[x.key];
      let base = x.pct != null ? (x.base === 'gross' ? price : net) : null, amount;
      if (x.key === 'retcont') amount = x.amount - x.refund;
      else amount = x.pct != null ? base * x.pct / 100 : x.amount;
      if (x.key === 'retcont' && amount < -EPS) throw new Error(`Invoice line ${x.line}: the refund (₹${grp(x.refund)}) is more than the deposit (₹${grp(x.amount)}).`);
      const sign = eff === 'add' ? 1 : eff === 'less' ? -1 : 0;
      sub += sign * amount;
      lines.push({ item: x, eff, why, amount: r2(amount), sign, base });
    });
    const other = items.filter(x => x.key === 'other');
    let total = sub;
    other.forEach(x => { const a = x.pct != null ? sub * x.pct / (100 - x.pct) : x.amount; lines.push({ item: x, eff: 'add', why: x.pct != null ? TREAT.other[1] : 'other expenses of the purchase are added', amount: a, sign: 1, base: x.pct != null ? sub : null, other: true }); total += a; });
    if (!(total > 0)) throw new Error('The total cost of the receipt must be above ₹0: check the discounts and subsidies.');
    const sh = String(o.shortage == null ? '' : o.shortage).trim(), shPct = /%$/.test(sh);
    const short = sh === '' ? 0 : shPct ? qty * num(sh.slice(0, -1)) / 100 : num(sh);
    if (!(short >= 0) || short >= qty) throw new Error('The normal shortage must be at least 0 and less than the quantity received.');
    const afterShort = qty - short, deter = afterShort * (+o.deter || 0) / 100, normalQty = afterShort - deter;
    const rt = total / normalQty, abn = +o.abnormal || 0;
    if (abn < 0 || abn >= normalQty) throw new Error('The abnormal shortage must be at least 0 and less than the good quantity.');
    return { price, net, lines, sub, total, qty, short, shPct, deter, normalQty, rate: rt, abn, abnLoss: abn * rt, goodQty: normalQty - abn, goodCost: total - abn * rt };
  }

  /* ================================================================ drawing */
  const LC = 'abcdefgh';
  /* table numbers: whole amounts without paise (6,00,000), fractional ones with two digits (162.50); rates the same way (1,500 · 5.75) */
  const tm = x => (Number.isInteger(r2(x)) ? grp(r2(x)) : m2(x));
  const tr = x => (Number.isInteger(Math.round(x * 1e4) / 1e4) ? grp(Math.round(x)) : rate(x));
  const SHORT = { open: 'Opening', receipt: 'Receipt', issue: 'Issue', rtv: 'To vendor', rts: 'From dept', short: 'Shortage', loss: 'Normal loss', xfer: 'Transfer' };
  /** the ledger in ICAI's columns, one row an entry; a FIFO / LIFO balance lists its lots one a line, as the Study Material prints them */
  function ledgerTable(L, k, opt) {
    const rows = [], cells = {}, wa = L.method === 'wa', sa = L.method === 'sa', BR = '<br>';
    L.rows.slice(0, k).forEach((r, ri) => {
      const t = r.t, cur = ri === k - 1 && opt.mark;
      const col = (xs, f) => xs.map(f).join(BR);
      const rec = r.rec ? [tm(r.rec.qty), tr(r.rec.rate), tm(r.rec.amount)] : ['', '', ''];
      const ip = r.iss ? r.iss.parts : [];
      let iss = ip.length ? [col(ip, p => tm(p.qty)), col(ip, p => tr(p.rate)), col(ip, p => tm(p.amount))] : ['', '', ''];
      if (t.kind === 'loss') iss = [tm(t.qty), '', '—'];
      if (t.kind === 'xfer') iss = ['—', '', ''];
      const bl = r.bal.length ? r.bal : [];
      const bal = !bl.length ? ['0', '', '0'] : (wa && !bl.some(b => b.ret)) || sa ? [tm(r.qty), wa ? tr(r.poolRate) : '', tm(r.value)] : [col(bl, b => tm(b.qty)), col(bl, b => tr(b.rate)), col(bl, b => tm(b.value)) + (bl.length > 1 ? `${BR}**${tm(r.value)}**` : '')];
      const label = SHORT[t.kind] + (t.kind === 'rts' && opt.rtsMode !== 'fresh' ? ' (next)' : t.kind === 'short' ? ' (w/o)' : '');
      rows.push([t.date.replace(/\s+/g, '\u00a0'), label].concat(t.kind === 'xfer' ? ['—', '', ''] : rec, iss, bal));
      if (cur) for (let c = 0; c < 11; c++) cells[`${ri},${c}`] = 'hl';
    });
    return { type: 'table', title: `Stores ledger (${METHODS[L.method]})`, head: ['Date', 'Entry', 'Rec. qty', 'Rate', '₹', 'Iss. qty', 'Rate', '₹', 'Bal. qty', 'Rate', '₹'], rows, cells,
      align: ['left', 'left', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right'] };
  }
  function stack(L, r, u, title) {
    const m = L.method, layers = [];
    const taken = new Map();
    if (r && r.iss && r.iss.parts) r.iss.parts.forEach(p => { (p.lots || [p]).forEach(q => { if (q.lot != null) taken.set(q.lot, (taken.get(q.lot) || 0) + q.qty); }); });
    const issuedLayers = [];
    if (r && r.iss) {
      const parts = r.iss.parts.flatMap(p => p.lots ? p.lots.map(q => Object.assign({}, q, { rate: p.rate, amount: q.amount })) : [p]);
      parts.forEach(p => issuedLayers.push({ label: `${r.t.kind === 'rtv' ? 'returned' : r.t.kind === 'short' ? 'written off' : 'issued'}: ${nf(p.qty)} @ ${rp(p.rate)}`, note: r.t.kind === 'rtv' ? `back to the vendor at the purchase price${r.iss.lotDate ? ` of the lot of ${r.iss.lotDate}` : ''}` : p.pool ? 'from the pooled stock' : p.ret ? 'the returned units go first' : m === 'sa' ? `units from the ${rp(p.lotRate)} lot of ${p.date}` : `from the lot of ${p.date}`, right: `₹${tm(p.amount)}`, color: 'mute' }));
    }
    const bal = r ? r.bal : [];
    const lotLayers = bal.map(b => b.pool
      ? { label: `Pooled stock: ${nf(b.qty)} ${u}`, note: `₹${tm(b.value)} ÷ ${nf(b.qty)} = average ₹${rate(b.value / b.qty)}${Math.abs(b.rate - b.value / b.qty) > 1e-6 ? `, issued at ₹${rate(b.rate)}` : ''}`, right: `₹${tm(b.value)}`, color: 'a' }
      : { label: `${nf(b.qty)} ${u} @ ${rp(b.rate)}`, note: b.ret ? 'returned from a department: issued next' : `${b.date ? 'received ' + b.date : ''}`, right: `₹${tm(b.value)}`, color: b.ret ? 'c' : LC[(b.id || 0) % 8] });
    /* draw newest on top: FIFO / simple average issue from the bottom, LIFO from the top; weighted average is one pool */
    const ordered = lotLayers.slice().reverse();
    const all = m === 'lifo' || (r && r.t.kind === 'rtv') ? issuedLayers.concat(ordered) : ordered.concat(issuedLayers);   // units leave from the end they come from
    if (!all.length) all.push({ label: 'No stock', note: '', right: '₹0.00', color: 'mute' });
    const side = m === 'wa' ? [] : [{ label: m === 'lifo' ? 'newest out first' : 'oldest out first', arrow: m === 'lifo' ? 'up' : 'down' }];
    return { type: 'layers', title: title || (m === 'wa' ? 'Stock after this entry' : m === 'sa' ? 'Lots in stock at their own prices (newest on top)' : 'Lots in stock after this entry (newest on top)'), layers: all, side, w: 560, layerH: 42 };
  }

  /* ================================================================ mode: ledger */
  function captionOf(L, r, opt, u) {
    const t = r.t, m = L.method, M = m === 'fifo' || m === 'lifo' ? METHODS[m] : METHODS[m].toLowerCase();
    const list = ps => ps.map(p => `${nf(p.qty)} @ ${rp(p.rate)}`).join(' + ');
    switch (t.kind) {
      case 'open': return `**${t.date}: opening balance** of ${nf(t.qty)} ${u} at ${rp(r.rec.rate)} = ${inr(r.rec.amount)}${t.value != null ? ` (${inr(t.value)} ÷ ${nf(t.qty)} = ${rp(r.rec.rate)} a unit)` : ''}.`;
      case 'receipt': return `**${t.date}: receipt** of ${nf(t.qty)} @ ${rp(r.rec.rate)} = ${inr(r.rec.amount)}. ${m === 'wa' ? `It joins the pool, so the average is worked out again: ${inr(r.value)} ÷ ${nf(r.qty)} = ${rp(r.value / r.qty)}${opt.round > 0 && Math.abs(r.poolRate - r.value / r.qty) > 1e-9 ? `, rounded to ${rp(r.poolRate)}` : ''}.` : m === 'sa' ? `It is a new lot; the simple average of the lot rates in stock becomes ${rp(r.saAfter)}.` : `It is kept as a separate lot at its own price.`}`;
      case 'issue': case 'short': {
        const what = t.kind === 'short' ? `shortage of ${nf(t.qty)} found at stock-taking` : `issue of ${nf(t.qty)}`;
        const tail = t.kind === 'short' ? ` It goes in the issue column at the ${M} price (Study Material §9.3) and is written off (to Costing P&L if abnormal).` : '';
        const ret = r.iss.parts.filter(p => p.ret), rest = r.iss.parts.filter(p => !p.ret);
        const retTxt = ret.length ? `The units returned from a department go first, at their own price (${list(ret)}). ` : '';
        if (m === 'wa') return `**${t.date}: ${what}.** ${retTxt}${rest.length ? `Every unit is priced at the current weighted average, ${rp(rest[0].rate)}: ${nf(rest[0].qty)} × ${rp(rest[0].rate)} = ${inr(rest[0].amount)}. The average itself does not change.` : ''}${tail}`;
        if (m === 'sa') { const p = rest[0], ls = r.before.lots.filter(b => !b.ret); return `**${t.date}: ${what}.** ${retTxt}${p ? `Simple average = the rates of the lots in stock added and divided by their number, ignoring quantities: ${ls.length > 1 ? `(${ls.map(b => '₹' + rate(b.rate)).join(' + ')}) ÷ ${ls.length} = ` : ''}${rp(p.rate)}${opt.round > 0 && ls.length > 1 && Math.abs(ls.reduce((a, b) => a + b.rate, 0) / ls.length - p.rate) > 1e-9 ? ' (rounded)' : ''}. ${nf(p.qty)} × ${rp(p.rate)} = ${inr(p.amount)}; the units physically leave the oldest lot first.` : ''}${tail}`; }
        const whole = rest.filter(p => p.whole).length;
        return `**${t.date}: ${what}.** ${retTxt}${m === 'lifo' ? 'LIFO takes the newest lot first' : 'FIFO takes the oldest lot first'}: ${list(rest)} = ${inr(r.iss.amount)}.${whole ? ` ${whole === 1 ? 'One lot is' : whole + ' lots are'} used up.` : ''}${tail}`;
      }
      case 'rtv': return `**${t.date}: ${nf(t.qty)} returned to the vendor.** They leave at their purchase price, ${rp(r.iss.parts[0].rate)} (${inr(r.iss.amount)}), shown in the issue column${m === 'wa' ? `; the average of what is left is worked out again: ${inr(r.value)} ÷ ${nf(r.qty)} = ${rp(r.value / r.qty)}${opt.round > 0 && Math.abs(r.poolRate - r.value / r.qty) > 1e-9 ? ` → ${rp(r.poolRate)}` : ''}` : ` out of the lot received ${r.iss.lotDate || ''}`.trimEnd()}.`;
      case 'rts': return `**${t.date}: ${nf(t.qty)} returned from a department** at ${rp(r.rec.rate)}${r.rec.given ? '' : ', the price of the latest issue'} (${inr(r.rec.amount)}), entered in the receipt column. ${opt.rtsMode === 'fresh' ? (m === 'wa' ? (r.keptRate ? 'They join the pool at the current average, so the average stays the same.' : `They join the pool: average ${rp(r.poolRate)}.`) : 'They are treated as a fresh receipt at that price (Study Material §9.2, second way).') : 'They are kept apart and issued first, at the same price, against the next requisition (Study Material §9.2, first way).'}`;
      case 'loss': return `**${t.date}: normal loss of ${nf(t.qty)}** (evaporation, breaking of bulk). Good units absorb a normal loss: the quantity falls but the value stays ${inr(r.value)}, so ${m === 'wa' && r.loss.keeper == null ? `the average rises to ${inr(r.value)} ÷ ${nf(r.qty)} = ${rp(r.value / r.qty)}${opt.round > 0 && Math.abs(r.poolRate - r.value / r.qty) > 1e-9 ? ` → ${rp(r.poolRate)}` : ''}` : `the lot next in line carries it: its rate rises to ${rp(r.loss.keeperRate)}`}.`;
      case 'xfer': return `**${t.date}: transfer between jobs or departments.** The material never comes back to the stores, so the stores ledger has no entry; the costs of the two jobs or departments are adjusted instead.`;
      default: return '';
    }
  }
  function computeLedger(v) {
    const u = v.unit || 'units', txns = parseLedger(v.txns), method = METHODS[v.method] ? v.method : 'fifo';
    const opt = { method, rtsMode: v.rtsMode === 'fresh' ? 'fresh' : 'next', round: method === 'wa' || method === 'sa' ? +v.round || 0 : 0, roundAmt: !!v.roundAmt && (method === 'wa' || method === 'sa') };
    const L = ledger(txns, opt);
    const intro = { type: 'table', title: 'The transactions', head: ['Date', 'Entry', 'Quantity', 'Rate / value'], rows: txns.map(t => [t.date, KIND[t.kind], t.kind === 'xfer' ? '—' : nf(t.qty), t.value != null ? `value ₹${m2(t.value)}` : t.rate != null ? `₹${rate(t.rate)}` : '']), align: ['left', 'left', 'right', 'right'] };
    const frames = [{ caption: `**${METHODS[method]}.** ${method === 'fifo' ? 'Issues are priced lot by lot, oldest lot first.' : method === 'lifo' ? 'Issues are priced lot by lot, newest lot first (LIFO is not allowed by AS 2 / Ind AS 2; ICAI teaches it for knowledge).' : method === 'sa' ? 'Each issue is priced at the simple average of the rates of the lots in stock, ignoring their quantities.' : 'Each issue is priced at the weighted average: the value of the stock divided by its quantity, worked out again after every receipt.'} Press ▶ to post the entries one by one.`, view: [intro] }];
    L.rows.forEach((r, k) => frames.push({ caption: captionOf(L, r, opt, u), view: [stack(L, r, u), ledgerTable(L, k + 1, Object.assign({ mark: true }, opt))] }));
    /* the four methods side by side (an error in one, e.g. a lot to return already issued under LIFO, shows as a dash) */
    const cmp = Object.keys(METHODS).map(k => { try { const X = ledger(txns, Object.assign({}, opt, { method: k, round: k === 'wa' || k === 'sa' ? +v.round || 0 : 0, roundAmt: !!v.roundAmt && (k === 'wa' || k === 'sa') })); return [METHODS[k] + (k === method ? ' (this ledger)' : ''), tm(X.tot.issues), tm(X.tot.short), nf(X.closing.qty), tm(X.closing.value)]; } catch (e) { return [METHODS[k], '—', '—', '—', '—']; } });
    const T = L.tot, C = L.closing;
    frames.push({ caption: `**The ledger is complete.** Issued to production ${inr(T.issues)}${T.short ? `, written off ${inr(T.short)}` : ''}${T.rtv ? `, returned to the vendor ${inr(T.rtv)}` : ''}; closing stock ${nf(C.qty)} ${u} worth **${inr(C.value)}**. What came in (${inr(T.inValue)}) = what went out + what is left. The table compares the four methods on the same entries.`,
      view: [stack(L, { t: { kind: 'end' }, bal: C.lots }, u, method === 'wa' ? 'Stock at the end' : 'Lots in stock at the end (newest on top)'), ledgerTable(L, L.rows.length, Object.assign({ mark: false }, opt)), { type: 'table', title: 'The same entries under each method', head: ['Method', 'Issued to production (₹)', 'Written off (₹)', 'Closing qty', 'Closing value (₹)'], rows: cmp, align: ['left', 'right', 'right', 'right', 'right'], cells: Object.fromEntries([0, 1, 2, 3, 4].map(c => [`${Object.keys(METHODS).indexOf(method)},${c}`, 'hl'])) }] });
    const stats = [{ label: 'Issued to production', value: inr(T.issues), hint: `${nf(T.issueQty)} ${u} issued` }, { label: `Closing stock (${u})`, value: nf(C.qty), hint: 'receipts − issues − returns to the vendor − shortages and losses' },
      { label: 'Closing stock value', value: inr(C.value), hint: method === 'fifo' ? 'the newest lots, at their own prices' : method === 'lifo' ? 'the oldest lots, at their own prices' : 'what is left after pricing the issues' }];
    if (method === 'wa' && C.qty > EPS) stats.push({ label: 'Closing rate', value: inr(C.rate), hint: 'value ÷ quantity, as rounded for issues' });
    if (T.short > EPS) stats.push({ label: 'Shortages written off', value: inr(T.short), hint: `${nf(T.shortQty)} ${u} at the issue price` });
    if (T.rtv > EPS && stats.length < 5) stats.push({ label: 'Returned to the vendor', value: inr(T.rtv), hint: 'at the purchase price of the lot returned' });
    const rows = L.rows.map(r => [r.t.date, KIND[r.t.kind], r.rec ? m2(r.rec.amount) : '', r.iss ? m2(r.iss.amount) : '', nf(r.qty), m2(r.value)]);
    return {
      frames, stats, sim: { mode: 'ledger', method, L, tot: T, closing: C, txns },
      table: { head: ['Date', 'Entry', 'In (₹)', 'Out (₹)', 'Balance qty', 'Balance (₹)'], rows },
      note: `**Conventions.** A return to the vendor leaves at the purchase price of the lot it came from (the latest receipt unless a rate is given), in the issue column. A return from a department comes in at the price of the latest issue unless a rate is given, ${opt.rtsMode === 'fresh' ? 'and is treated as a fresh receipt at that price (Study Material §9.2, second way).' : 'and is kept apart and issued first against the next requisition (Study Material §9.2, first way).'} A shortage written off is priced like an issue (Study Material §9.3). A normal loss is absorbed by the good units: the quantity falls and the value stays${method === 'wa' ? ', so the average rises (Illustration 14)' : ', carried by the lot next in line'}. A transfer between jobs or departments makes no entry. ${method === 'wa' || method === 'sa' ? `The ${method === 'wa' ? 'weighted' : 'simple'} average issue rate is ${opt.round > 0 ? `rounded to ₹${grp(opt.round)}` : 'used unrounded'}, the balance is the running total${opt.roundAmt ? ', and amounts are rounded to the rupee' : ''}.` : 'Each lot keeps its own price.'}${method === 'sa' ? ' The simple average uses the lots still in stock; the units themselves leave first-in-first-out, so a lot drops out of the average once it is used up.' : ''}`
    };
  }

  /* ================================================================ mode: receipt */
  function computeReceipt(v) {
    const u = v.unit || 'units', items = parseInvoice(v.inv);
    const R = receipt(items, { qty: +v.rqty, shortage: v.rshort, deter: +v.rdeter, abnormal: +v.rabn });
    const cap = t => t[0].toUpperCase() + t.slice(1);
    const rowOf = l => [cap(l.item.text), l.eff === 'add' ? 'add' : l.eff === 'less' ? 'less' : 'leave out', l.eff === 'ignore' ? `(${m2(l.amount)})` : (l.sign < 0 ? '−' : '') + m2(l.amount)];
    const cost = k => ({ type: 'table', title: 'Cost of the receipt', head: ['Invoice item', 'Treatment', 'Amount (₹)'], rows: R.lines.slice(0, k).map(rowOf).concat(k >= R.lines.length ? [['Total cost of the receipt', '', m2(R.total)]] : []),
      cells: Object.assign({}, ...R.lines.slice(0, k).map((l, i) => (l.eff === 'ignore' ? { [`${i},1`]: 'mute', [`${i},2`]: 'mute' } : {})), k >= R.lines.length ? { [`${R.lines.length},0`]: 'hl', [`${R.lines.length},2`]: 'hl' } : {}), align: ['left', 'left', 'right'] });
    const qrows = [['Quantity received', `${nf(R.qty)} ${u}`]];
    if (R.short > 0) qrows.push([`Less: normal shortage${R.shPct ? ` (${String(v.rshort).trim()})` : ''}`, nf(R.short)]);
    if (R.deter > 0) qrows.push([`Less: provision for deterioration ${grp(+v.rdeter)}%`, nf(R.deter)]);
    qrows.push(['Quantity that bears the cost', nf(R.normalQty)]);
    const qtab = { type: 'table', title: 'Quantity', head: ['Item', 'Units'], rows: qrows, align: ['left', 'right'] };
    const frames = [{ caption: `**The invoice.** Each item is either part of the cost of the material (added or deducted) or left out, following the Study Material's treatment table. Press ▶ to take the items one by one.`, view: [{ type: 'table', title: 'The invoice', head: ['Item'], rows: items.map(x => [x.text]), align: ['left'] }] }];
    R.lines.forEach((l, k) => {
      const how = l.item.pct != null ? (l.other ? ` ${l.item.pct}% of the total = ${inr(l.base)} × ${l.item.pct} ÷ ${100 - l.item.pct} = ${inr(l.amount)}` : ` ${grp(l.item.pct)}% of the ${l.item.base === 'gross' ? 'price' : 'price after discounts'} (${inr(l.base)}) = ${inr(l.amount)}`) : l.item.key === 'retcont' ? ` ${inr(l.item.amount)} deposited − ${inr(l.item.refund)} refunded = ${inr(l.amount)}` : l.item.qty ? ` ${nf(l.item.qty)} × ${rp(l.item.unitRate)} = ${inr(l.amount)}` : '';
      frames.push({ caption: `**${l.item.text[0].toUpperCase() + l.item.text.slice(1)}: ${l.eff === 'add' ? 'add' : l.eff === 'less' ? 'deduct' : 'leave out'}.**${how ? how + '.' : ''} ${l.why[0].toUpperCase() + l.why.slice(1)}.`, view: [cost(k + 1)] });
    });
    frames.push({ caption: `**The quantity that bears the cost.** ${R.short > 0 ? `A normal shortage of ${nf(R.short)} is absorbed by the good units: their cost does not fall, the quantity does. ` : ''}${R.deter > 0 ? `The ${grp(+v.rdeter)}% provision for further deterioration (${nf(R.deter)}) is treated the same way. ` : ''}${nf(R.normalQty)} ${u} carry the ${inr(R.total)}.`, view: [cost(R.lines.length), qtab] });
    frames.push({ caption: `**Rate per unit = ${inr(R.total)} ÷ ${nf(R.normalQty)} = ${rp(Math.round(R.rate * 1e4) / 1e4)}**${Math.abs(R.rate * 100 - Math.round(R.rate * 100)) > 1e-6 ? ` (${inr(R.rate)} to the paisa)` : ''}: the price at which this receipt enters the stores ledger.${R.abn > 0 ? ` The abnormal shortage of ${nf(R.abn)} is valued at this rate, ${inr(R.abnLoss)}, and charged to Costing P&L; the ${nf(R.goodQty)} good units cost ${inr(R.goodCost)}.` : ''}`, view: [cost(R.lines.length), qtab] });
    const stats = [{ label: 'Total cost of the receipt', value: inr(R.total), hint: 'items added − items deducted' }, { label: `Quantity bearing the cost (${u})`, value: nf(R.normalQty), hint: 'received − normal shortage − provision' },
      { label: 'Rate per unit', value: inr(R.rate), hint: 'total cost ÷ quantity bearing it', tone: 'ok' }];
    if (R.abn > 0) stats.push({ label: 'Abnormal shortage to Costing P&L', value: inr(R.abnLoss), hint: 'abnormal units × rate' });
    const left = R.lines.filter(l => l.eff === 'ignore');
    if (left.length) stats.push({ label: 'Left out of cost', value: inr(left.reduce((a, l) => a + l.amount, 0)), hint: left.map(l => l.item.text.replace(/\s*\d.*$/, '')).join(', ') });
    return {
      frames, stats, sim: Object.assign({ mode: 'receipt' }, R),
      table: { head: ['Invoice item', 'Treatment', 'Amount (₹)', 'Why'], rows: R.lines.map(l => rowOf(l).concat([l.why])) },
      note: `**Conventions.** A trade or quantity discount given as a % is of the price; GST, duty, cash discount and other % items are of the price after trade and quantity discounts, unless the line says “of price”. GST is left out unless the line says “no credit”. Other expenses given as a % of the total cost are grossed up. A normal shortage and a provision for deterioration reduce the quantity, not the cost; an abnormal shortage is valued at the rate and goes to Costing P&L.`
    };
  }

  let lastMode = 'ledger';
  function compute(v) {
    lastMode = v.mode === 'receipt' ? 'receipt' : 'ledger';
    return lastMode === 'receipt' ? computeReceipt(v) : computeLedger(v);
  }

  /* ================================================================ controls, presets, challenge */
  const isL = v => v.mode !== 'receipt', isR = v => v.mode === 'receipt', avg = v => isL(v) && (v.method === 'wa' || v.method === 'sa');
  const TAPRI = `1 Sep   opening 400 @ 1,500
3 Sep   issue 250
5 Sep   receipt 500 @ 1,560
8 Sep   return to vendor 50
12 Sep  issue 120
15 Sep  receipt 300 @ 1,620
18 Sep  return from dept 20
22 Sep  transfer 30
26 Sep  issue 400
30 Sep  shortage 5`;
  const TAPRI_INV = `price 2,000 kg @ 1,500
trade discount 5%
gst 5%
cash discount 2%
freight 17,820
insurance 4,500
returnable containers 12,000 refund 9,000
demurrage 2,500`;
  const controls = [
    { id: 'mode', type: 'seg', label: 'What to explore', value: 'ledger', options: [['ledger', 'Stores ledger'], ['receipt', 'Cost of a receipt']] },
    { id: 'method', type: 'select', label: 'Pricing method', short: 'Method', value: 'fifo', options: [['fifo', 'FIFO (first in, first out)'], ['lifo', 'LIFO (last in, first out)'], ['sa', 'Simple average'], ['wa', 'Weighted average']], show: isL },
    { id: 'unit', type: 'select', label: 'Unit of material', short: 'Unit', value: 'kg', options: [['units', 'units'], ['kg', 'kg'], ['tonnes', 'tonnes'], ['litres', 'litres'], ['components', 'components']] },
    { id: 'txns', type: 'textarea', label: 'Transactions, one a line: date, entry, quantity, @ rate (or value)', short: 'Transactions', rows: 10, value: TAPRI, show: isL,
      help: 'Entries: opening, receipt (or purchase, GRN, replacement), issue, return to vendor, return from department (MRR), shortage (written off), normal loss (absorbed), transfer (no entry). Give a rate as “@ 5.75” or a value as “value 162.50”; a return to the vendor takes the latest receipt’s lot unless you give its rate. Text in brackets and after # is ignored.' },
    { id: 'rtsMode', type: 'select', label: 'Material returned from a department', short: 'Returns from departments', value: 'next', options: [['next', 'kept apart, issued first against the next requisition'], ['fresh', 'treated as a fresh receipt at the issue price']], show: isL },
    { id: 'round', type: 'select', label: 'Average rate for issues rounded to', short: 'Average rounded to', value: '0.01', options: [['0.01', '₹0.01 (paisa)'], ['0.1', '₹0.10'], ['1', '₹1'], ['0', 'not rounded']], show: avg },
    { id: 'roundAmt', type: 'toggle', label: 'Round ledger amounts to the rupee', short: 'Amounts to the rupee', value: false, show: avg },
    { id: 'inv', type: 'textarea', label: 'Invoice, one item a line', short: 'Invoice', rows: 9, value: TAPRI_INV, show: isR,
      help: 'Items: price (e.g. “price 5,000 units @ 100”), trade discount, quantity discount, cash discount, GST (add “no credit” if input credit is not available), customs duty, toll tax, freight, insurance, commission, containers, returnable containers … refund …, demurrage / penalty, subsidy, other expenses 2% of total. A trade or quantity discount % is of the price; other % items are of the price after those discounts unless the line says “of price”.' },
    { id: 'rqty', type: 'number', label: 'Quantity received (0 = from the price line)', short: 'Quantity received', value: 0, min: 0, max: 1e9, show: isR },
    { id: 'rshort', type: 'text', label: 'Normal shortage (units, or a % like 5%)', short: 'Normal shortage', value: '40', show: isR },
    { id: 'rdeter', type: 'number', label: 'Provision for deterioration (% of the quantity after the shortage)', short: 'Deterioration %', value: 0, min: 0, max: 99, show: isR },
    { id: 'rabn', type: 'number', label: 'Abnormal shortage (units, charged to Costing P&L)', short: 'Abnormal shortage', value: 0, min: 0, max: 1e9, show: isR }
  ];
  const P = (label, values) => ({ label, values });
  const led = (method, txns, more) => Object.assign({ mode: 'ledger', method, txns, rtsMode: 'next', round: '0.01', roundAmt: false }, more || {});
  const presets = [
    P('Tapri: cardamom store in September, every kind of entry', led('fifo', TAPRI, { unit: 'kg' })),
    P('Study Material Practical Problem 8: AT Ltd., September (FIFO)', led('fifo', `1-9    opening 25 value 162.50
4-9    issue 8            (Req. 85)
6-9    receipt 50 @ 5.75  (B & Co., GRN 26)
7-9    issue 12           (Req. 97)
10-9   return to vendor 10 (B & Co.)
12-9   issue 15           (Req. 108)
13-9   issue 20           (Req. 110)
15-9   receipt 25 @ 6.10  (M & Co., GRN 33)
17-9   issue 10           (Req. 121)
19-9   replacement 10 @ 5.75 (B & Co., GRN 38)
20-9   return from dept 5 (MRR 4)
22-9   transfer 5         (Job 182 to Job 187)
26-9   issue 10           (Req. 146)
29-9   transfer 5         (Dept A to Dept B)
30-9   shortage 2`, { unit: 'units' })),
    P('Study Material Illustration 14: Imbrios India Ltd. (weighted average)', led('wa', `Sep 1   opening 6,000 @ 285
Sep 8   issue 4,875
Sep 9   receipt 17,500 @ 276
Sep 10  issue 12,000
Sep 12  return from dept 2,375
Sep 15  receipt 9,000 @ 288
Sep 17  return to vendor 700
Sep 20  issue 9,500
Sep 30  shortage 900       (misappropriated: abnormal)
Sep 30  normal loss 300    (rusting)`, { unit: 'units', rtsMode: 'fresh', round: '0.01', roundAmt: true })),
    P('Study Material Illustration 13: Sunrise Industries, April (LIFO)', led('lifo', `1-4-2023   opening 100 @ 5
5-4-2023   receipt 300 @ 6
6-4-2023   issue 250
8-4-2023   receipt 500 @ 7
10-4-2023  issue 400
12-4-2023  receipt 600 @ 8
14-4-2023  issue 500`, { unit: 'units' })),
    P('Study Material Practical Problem 9: material X for jobs W 16 and W 17', led('wa', `Jan 1   receipt 100 @ 1
Jan 20  receipt 100 @ 2
Jan 22  issue 60   (Job W 16)
Jan 23  issue 60   (Job W 17)`, { unit: 'units' })),
    P('Study Material §8.1: the FIFO lots of July and August', led('fifo', `July 3   receipt 600 @ 1.00
July 8   issue 400
July 12  issue 200
July 13  receipt 800 @ 1.20
July 22  issue 600
July 23  receipt 600 @ 0.90
July 25  issue 400
Aug 5    receipt 400 @ 1.10
Aug 6    receipt 1,200 @ 0.80
Aug 8    issue 1,000`, { unit: 'kg' })),
    P('Study Material §8.2 Example 1: five April lots, then an issue at the simple average', led('sa', `1 April   receipt 200 @ 10
5 April   receipt 150 @ 12
14 April  receipt 210 @ 12
21 April  receipt 50 @ 15
28 April  receipt 140 @ 11
30 April  issue 100      (added to show the issue price)`, { unit: 'units' })),
    P('PYQ Jan 2026, MCQ 14 (data): material A, October (LIFO)', led('lifo', `01-10-2025  opening 100 @ 50
05-10-2025  receipt 2,500 @ 55
08-10-2025  receipt 600 @ 56
15-10-2025  issue 1,500`, { unit: 'units' })),
    P('MTP Sep 2025 Series I, MCQ 1 (data): raw material for SpeedX, FIFO closing stock', led('fifo', `Start   opening 5,000 @ 10
Early   receipt 10,000 @ 10
Midway  receipt 2,500 @ 12
Period  issue 14,000`, { unit: 'units' })),
    P('PYQ Sep 2024, MCQs 6 and 10 (data): component B at the average price, with storage wastage', led('wa', `Start     opening 5,000 @ 5,150
Year      receipt 60,000 value 30,53,42,000   (₹4,800 − 2% + 8% duties, plus ₹62,000 insurance)
Storage   normal loss 80
Storage   shortage 40     (abnormal wastage)`, { unit: 'units', round: '1' })),
    P('PYQ Sep 2026, MCQ 13 (data): six days of FIFO issues', led('fifo', `Day 0  opening 150 @ 40
Day 1  receipt 25 @ 50
Day 2  receipt 300 @ 52
Day 3  issue 340
Day 4  receipt 200 @ 50
Day 5  issue 300
Day 6  receipt 100 @ 40`, { unit: 'units' })),
    P('Old-scheme MTP Nov 2022 Series II, Q5(b) (data): weighted average rounded to ₹0.10', led('wa', `April 1   opening 1,500 @ 48
April 4   issue 1,100
April 10  receipt 1,600 @ 50
April 20  receipt 2,400 @ 49
April 24  issue 1,600
May 5     receipt 1,000 @ 51
May 10    issue 1,500
May 17    receipt 1,100 @ 52
May 25    receipt 800 @ 52.50
May 26    issue 1,700
May 31    normal loss 80     (shortage at verification)
June 11   receipt 900 @ 54
June 15   issue 1,500
June 21   issue 1,200
June 24   receipt 1,400 @ 55
June 30   normal loss 60     (shortage at verification)`, { unit: 'kg', round: '0.1' })),
    P('Study Material Illustration 2: Part No. A 32 (cash discount, GST credit, boxes)', { mode: 'receipt', unit: 'units', inv: `price 200 units @ 5
trade discount 20%
gst 12%                     (input credit available)
containers 50               (5 non-returnable boxes)
cash discount 2%`, rqty: 0, rshort: '', rdeter: 0, rabn: 0 }),
    P('Study Material Illustration 1: chemical A (normal breakage, 2% deterioration)', { mode: 'receipt', unit: 'kg', inv: `price 10,000 kg @ 10
customs duty 10%            (no credit)
freight 2,133               (A's share of ₹3,840, 5 : 4)`, rqty: 0, rshort: '500', rdeter: 2, rabn: 0 }),
    P('MTP May 2024 Series I, Q2(b) (data): S & Sons, an unregistered buyer', { mode: 'receipt', unit: 'units', inv: `listed price 5,00,000
trade discount 10%
gst 18% no credit
cash discount 10%
toll tax 1,800
freight and insurance 36,000
demurrage 5,000
commission and brokerage 10,000
returnable containers 30,000 refund 26,000
other expenses 2% of total`, rqty: 5000, rshort: '5%', rdeter: 0, rabn: 0 }),
    P('RTP Sep 2024, Q1 (data): Axe Traders, 20% shortage expected', { mode: 'receipt', unit: 'units', inv: `listed price 2,50,000
trade discount 10%
gst 18% no credit           (unregistered buyer: no input credit)
cash discount 10%
toll tax 5,000
freight and insurance 17,220
demurrage 5,000
commission and brokerage 10,000
returnable containers 30,000 refund 20,000
other expenses 2% of total`, rqty: 5000, rshort: '20%', rdeter: 0, rabn: 0 }),
    P('Tapri: a cardamom invoice with a damp sack written off', { mode: 'receipt', unit: 'kg', inv: TAPRI_INV, rqty: 0, rshort: '40', rdeter: 0, rabn: 20 })
  ];

  /* ---------------------------------------------------------------- challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  function genLedger(r) {
    for (let k = 0; k < 200; k++) {
      const method = pick(r, ['fifo', 'lifo', 'sa', 'wa']), lines = [], days = [1, 3, 5, 8, 10, 12, 15, 18, 20, 23, 26, 29];
      let stock = 0, d = 0;
      const opening = r() < 0.7 ? 100 * (1 + Math.floor(r() * 5)) : 0;
      if (opening) { lines.push(`${days[d++]} Mar  opening ${opening} @ ${10 + Math.floor(r() * 30)}`); stock = opening; }
      const n = 4 + Math.floor(r() * 3);
      for (let i = 0; i < n && d < days.length; i++) {
        const issue = stock > 0 && (r() < 0.5 || i === n - 1);
        if (issue) { const q = 10 * Math.max(1, Math.floor((stock / 10) * (0.3 + r() * 0.6))); lines.push(`${days[d++]} Mar  issue ${q}`); stock -= q; }
        else { const q = 50 * (1 + Math.floor(r() * 8)), p = 10 + Math.floor(r() * 30) + pick(r, [0, 0, 0.5]); lines.push(`${days[d++]} Mar  receipt ${q} @ ${p}`); stock += q; }
      }
      const issues = lines.filter(l => / issue /.test(l)).length;
      if (!issues || stock <= 0) continue;
      const ask = r() < 0.5 ? 'closing' : 'issue' + (1 + Math.floor(r() * issues)), txns = lines.join('\n');
      const R = ledger(parseLedger(txns), { method, rtsMode: 'next', round: 0.01, roundAmt: false });
      const want = ask === 'closing' ? R.closing.value : R.rows.filter(x => x.t.kind === 'issue')[+ask.slice(5) - 1].iss.amount;
      if (!(want > 0.5)) continue;                              // simple average can leave a negative balance: never asked
      return { mode: 'ledger', method, txns, rtsMode: 'next', round: '0.01', roundAmt: false, ask };
    }
    return { mode: 'ledger', method: 'fifo', txns: '1 Mar opening 100 @ 10\n5 Mar receipt 200 @ 12\n8 Mar issue 150', rtsMode: 'next', round: '0.01', roundAmt: false, ask: 'closing' };
  }
  function genReceipt(r) {
    const q = 100 * (5 + Math.floor(r() * 50)), p = 5 * (2 + Math.floor(r() * 40)), lines = [`price ${q} units @ ${p}`];
    if (r() < 0.7) lines.push(`trade discount ${pick(r, [2, 5, 10, 20])}%`);
    const gst = pick(r, [5, 12, 18]); lines.push(r() < 0.5 ? `gst ${gst}%` : `gst ${gst}% no credit`);
    if (r() < 0.6) lines.push(`cash discount ${pick(r, [1, 2, 3])}%`);
    lines.push(`freight ${100 * (5 + Math.floor(r() * 50))}`);
    if (r() < 0.5) lines.push(`insurance ${50 * (2 + Math.floor(r() * 20))}`);
    if (r() < 0.4) lines.push(`demurrage ${100 * (1 + Math.floor(r() * 9))}`);
    if (r() < 0.3) { const dep = 1000 * (2 + Math.floor(r() * 8)); lines.push(`returnable containers ${dep} refund ${dep - 500 * (1 + Math.floor(r() * 3))}`); }
    return { mode: 'receipt', unit: 'units', inv: lines.join('\n'), rqty: 0, rshort: r() < 0.6 ? String(q * pick(r, [0.02, 0.04, 0.05])) : '', rdeter: 0, rabn: 0, ask: 'rate' };
  }
  const issueOf = (res, v) => { const k = +String(v.ask || '').replace('issue', ''); const iss = res.sim.L.rows.filter(x => x.t.kind === 'issue'); return iss[k - 1]; };
  const challenge = {
    title: 'Price it',
    gen(r) { return lastMode === 'receipt' ? genReceipt(r) : genLedger(r); },
    prompt(v, res) {
      if (v.mode === 'receipt') return `Using the invoice and the quantities shown (GST is left out unless it says “no credit”; cash discount and demurrage are not costs), what is the **rate per unit** at which this receipt enters the stores ledger? (₹, two decimals.)`;
      const M = METHODS[v.method] + (v.method === 'wa' || v.method === 'sa' ? ' (issue rate rounded to the paisa)' : '');
      if (String(v.ask).startsWith('issue')) { const it = issueOf(res, v); return `Under **${M}**, what is the value (₹) of the **issue on ${it.t.date}** (${nf(it.t.qty)} units)? Transactions: ${res.sim.txns.map(t => t.text.replace(/\s+/g, ' ')).join('; ')}.`; }
      return `Under **${M}**, what is the value (₹) of the **closing stock**? Transactions: ${res.sim.txns.map(t => t.text.replace(/\s+/g, ' ')).join('; ')}.`;
    },
    solve(res, v) {
      if (res.sim.mode === 'receipt') return r2(res.sim.rate);
      if (String(v.ask).startsWith('issue')) { const it = issueOf(res, v); return it ? r2(it.iss.amount) : null; }
      return r2(res.sim.closing.value);
    },
    tol: 0.01, unit: '₹', kind: 'num',
    view: () => null,
    explain(res, v) {
      if (res.sim.mode === 'receipt') return `Cost ₹${m2(res.sim.total)} ÷ ${nf(res.sim.normalQty)} = **₹${m2(res.sim.rate)}**.`;
      if (String(v.ask).startsWith('issue')) { const it = issueOf(res, v); return `${it.iss.parts.map(p => `${nf(p.qty)} @ ₹${rate(p.rate)}`).join(' + ')} = **₹${m2(it.iss.amount)}**.`; }
      return `Closing stock: ${res.sim.closing.lots.map(b => `${nf(b.qty)} @ ₹${rate(b.rate)}`).join(' + ')} = **₹${m2(res.sim.closing.value)}**.`;
    }
  };

  const def = {
    id: 'stores-ledger', title: 'Stores Ledger Lab',
    blurb: 'Build a priced stores ledger row by row under FIFO, LIFO and the averages, and cost a receipt from its invoice.',
    controls, presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseLedger, ledger, parseInvoice, receipt, compute, def, METHODS };
  g.__lab_def_stores_ledger = def;
})(typeof window !== 'undefined' ? window : globalThis);
