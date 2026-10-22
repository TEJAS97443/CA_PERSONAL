/* PassBook — EOQ and Stock Levels Lab (Paper 4, Material Cost: lessons cma.mat.eoq and cma.mat.levels). Owner: job lab-c1.
   Three modes, chosen by the first control:
     eoq       ordering cost, carrying cost and total relevant cost curves with the EOQ where ordering = carrying (plot), the cost at
               the EOQ and, optionally, against another order size (the ICAI "savings by EOQ" question)
     discount  quantity discounts: the EOQ at the list price and every price break evaluated in ICAI's table (purchase + ordering +
               carrying cost), one row per frame, then the total-cost curve of each price band (plot)
     levels    re-order, minimum, maximum, average and danger levels built one by one on a stock control chart (sawtooth plot)
   Verified against the ICAI Study Material (Paper 4, chapter 2, §6.1: Illustrations 3–6, Practical Problems 1–7, Case Scenario 1)
   and ICAI Suggested Answers (PYQ May 2024 Q1(a), PYQ Jan 2026 MCQs 6–10, MTP May 2024 S-II Q1(b), MTP Sep 2025 S-II Q3(a),
   MTP Sep 2026 S-I MCQs, RTP Sep 2025 Q7, RTP Sep 2026 Q5, RTP May 2025 Q8): tests/lab-eoq.test.js.
   Pure part: carrying, eoq, policy, discount, levels, compute. Node: require('app/js/labs/eoq.js') -> {…helpers, compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || {};
  const r2 = x => Math.round(x * 100) / 100;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const nf = x => grp(r2(x));                                                     // quantities: Indian grouping, at most 2 decimals
  /* rupees: Indian grouping; paise always as two digits (₹38,732.40), whole rupees without them */
  const inr = x => { const v = r2(x), a = Math.abs(v); return (v < 0 ? '−' : '') + '₹' + a.toLocaleString('en-IN', Number.isInteger(a) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const pc = x => grp(x, 4) + '%';
  const EPS = 1e-9;

  /* ================================================================ parsing (forgiving: 12,50,000 · ₹ 1,500 · spaces) */
  function amt(x, what, opt) {
    opt = opt || {};
    const s = String(x == null ? '' : x).replace(/[₹,\s]/g, '').replace(/[−–]/g, '-');
    const n = s === '' ? NaN : Number(s);
    if (!Number.isFinite(n)) throw new Error(`${what}: “${String(x).trim()}” is not a number.`);
    if (n < 0) throw new Error(`${what} cannot be negative.`);
    if (opt.pos && !(n > 0)) throw new Error(`${what} must be more than 0.`);
    return n;
  }

  /* ================================================================ pure maths */
  /** carrying cost per unit per year: pct % of the unit price plus a fixed ₹ amount (ICAI: "1% per month plus ₹ 2 per unit per annum") */
  function carrying(price, pct, rup) { return (price * pct) / 100 + rup; }
  /** EOQ = √(2AO ÷ C) */
  function eoq(A, O, C) {
    if (!(A > 0)) throw new Error('Enter the annual requirement A: a number of units above 0.');
    if (!(O > 0)) throw new Error('The cost of placing an order must be above ₹0 (with free orders there is no best order size).');
    if (!(C > 0)) throw new Error('The carrying cost must be above ₹0 a unit a year: give a % of the price, a ₹ amount, or both.');
    return Math.sqrt((2 * A * O) / C);
  }
  /** orders a year for order size Q: exact A ÷ Q, or rounded up to a whole number (ICAI: "12.5 orders are taken as 13") */
  const ordersOf = (A, Q, whole) => (whole ? Math.ceil(A / Q - 1e-9) : A / Q);
  /** the annual cost of ordering Q at a time at unit price `price` with carrying cost C */
  function policy(A, O, price, C, Q, whole) {
    if (!(Q > 0)) throw new Error('An order size must be more than 0.');
    const n = ordersOf(A, Q, whole), ordering = n * O, avg = Q / 2, carry = avg * C, purchase = A * price;
    return { Q, price, C, n, ordering, avg, carrying: carry, relevant: ordering + carry, purchase, total: purchase + ordering + carry };
  }
  /** the price list: base price below the first break, then rows [from, price or 'x%'] (a % is off the base price) */
  function parseTiers(base, rows) {
    const out = [{ from: 0, price: base, off: 0 }];
    (rows || []).forEach((r, i) => {
      const fromRaw = r && r[0], pRaw = r && r[1];
      if ((fromRaw === '' || fromRaw == null) && (pRaw === '' || pRaw == null)) return;     // an empty row is ignored
      const from = amt(fromRaw, `Price break ${i + 1}: the order size`, { pos: true });
      const t = String(pRaw == null ? '' : pRaw).trim();
      let price, off;
      if (/%$/.test(t)) { off = amt(t.slice(0, -1), `Price break ${i + 1}: the discount %`, { pos: true }); if (off >= 100) throw new Error(`Price break ${i + 1}: a discount must be below 100%.`); price = base * (1 - off / 100); }
      else { price = amt(t, `Price break ${i + 1}: the price (₹, or a discount such as 2%)`, { pos: true }); off = ((base - price) / base) * 100; }
      out.push({ from, price, off });
    });
    for (let i = 1; i < out.length; i++) {
      if (!(out[i].from > out[i - 1].from)) throw new Error(`List the price breaks from the smallest order size up (${nf(out[i].from)} comes after ${nf(out[i - 1].from)}).`);
      if (!(out[i].price < out[i - 1].price - EPS)) throw new Error(`Each price break must lower the price: orders of ${nf(out[i].from)} or more would pay ₹${grp(out[i].price)}, not less than ₹${grp(out[i - 1].price)}.`);
    }
    return out;
  }
  const priceAt = (tiers, Q) => { let p = tiers[0]; for (const t of tiers) if (Q >= t.from - EPS) p = t; return p; };
  /** quantity discounts (all-units): candidates are the EOQ at the list price, each break's smallest order and any band's own EOQ that
      falls inside its band; each is costed at the price its size earns. The cheapest total (purchase + ordering + carrying) wins; ties
      go to the smaller order */
  function discount(A, O, base, pct, rup, rows, o) {
    if (!(base > 0)) throw new Error('Enter the list price per unit (above ₹0).');
    const tiers = parseTiers(base, rows);
    if (tiers.length < 2) throw new Error('Add at least one price break (an order size and its lower price or % discount).');
    const roundQ = !!o.roundQ, whole = !!o.whole;
    const C0 = carrying(base, pct, rup), e0x = eoq(A, O, C0), e0 = roundQ ? Math.max(1, Math.round(e0x)) : e0x;
    const cands = [];
    const add = (Q, kind, tier) => {
      const t = priceAt(tiers, Q), C = carrying(t.price, pct, rup);
      if (cands.some(c => Math.abs(c.Q - Q) < EPS)) return;
      cands.push(Object.assign(policy(A, O, t.price, C, Q, whole), { kind, band: tiers.indexOf(t), tier: tier == null ? tiers.indexOf(t) : tier, off: t.off }));
    };
    add(e0, 'eoq', 0);
    tiers.forEach((t, i) => {
      if (!i) return;
      const C = carrying(t.price, pct, rup), ex = eoq(A, O, C), e = roundQ ? Math.max(1, Math.round(ex)) : ex, hi = i + 1 < tiers.length ? tiers[i + 1].from : Infinity;
      if (e > t.from + EPS && e < hi - EPS) add(e, 'inner', i);                // the band's own EOQ, when it qualifies for the band
      add(t.from, 'break', i);
    });
    cands.sort((a, b) => a.Q - b.Q);
    let best = cands[0];
    cands.forEach(c => { if (c.total < best.total - 0.005) best = c; });
    return { tiers, C0, eoqExact: e0x, eoq: e0, cands, best, base: cands.find(c => c.kind === 'eoq') };
  }
  /** stock levels (ICAI SM §6.1). o: {umin, uavg, umax, lmin, lavg, lmax, roq, rolFrom: 'max'|'safety'|'given', safety, rol, lemerg,
      dangerMin, shelf}. Returns every level with its working */
  function levels(o) {
    const { umin, uavg, umax, lmin, lavg, lmax, roq } = o;
    if (!(uavg > 0)) throw new Error('Average usage must be above 0.');
    if (!(umin >= 0) || umin > uavg + EPS || uavg > umax + EPS) throw new Error(`Usage must run minimum ≤ average ≤ maximum (here ${nf(umin)}, ${nf(uavg)}, ${nf(umax)}).`);
    if (!(lmin >= 0) || lmin > lavg + EPS || lavg > lmax + EPS) throw new Error(`Lead time must run minimum ≤ average ≤ maximum (here ${nf(lmin)}, ${nf(lavg)}, ${nf(lmax)}).`);
    if (!(lavg > 0)) throw new Error('Average lead time must be above 0.');
    if (!(roq > 0)) throw new Error('The re-order quantity must be above 0.');
    let rol;
    if (o.rolFrom === 'safety') { if (!(o.safety >= 0)) throw new Error('Safety stock cannot be negative.'); rol = o.safety + uavg * lavg; }
    else if (o.rolFrom === 'given') { if (!(o.rol > 0)) throw new Error('Enter the re-order level (above 0).'); rol = o.rol; }
    else rol = umax * lmax;
    const min = rol - uavg * lavg;
    if (min < -EPS) throw new Error(`The re-order level ${nf(rol)} is below the normal lead-time usage ${nf(uavg * lavg)} (average usage × average lead time), so the minimum level would be negative.`);
    const maxF = rol + roq - umin * lmin;
    const cap = o.shelf > 0 ? uavg * o.shelf : Infinity;
    const max = Math.min(maxF, cap);
    const avgHalf = min + roq / 2, avgMid = (min + max) / 2;
    const danger = o.lemerg > 0 ? (o.dangerMin ? umin : uavg) * o.lemerg : null;
    return { rol, min, maxF, cap, max, capped: cap < maxF - EPS, avgHalf, avgMid, danger, worst: rol - umax * lmax, best: rol - umin * lmin, normal: min };
  }

  /* ================================================================ drawing helpers */
  function niceStep(span, n) {
    const raw = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    for (const m of [1, 2, 2.5, 5, 10]) if (m * mag >= raw - EPS) return m * mag;
    return 10 * mag;
  }
  function axis(lo, hi, n) {
    const st = niceStep(hi - lo, n), a = Math.floor(lo / st + EPS) * st, b = Math.ceil(hi / st - EPS) * st, t = [];
    for (let v = a; v <= b + st / 2; v += st) t.push([+v.toFixed(6), grp(+v.toFixed(6))]);
    return { range: [a, b], ticks: t };
  }
  const sample = (f, x0, x1, N) => { const out = []; for (let k = 0; k <= N; k++) { const x = x0 + ((x1 - x0) * k) / N; const y = f(x); if (Number.isFinite(y)) out.push([+x.toFixed(4), +y.toFixed(4)]); } return out; };
  const fx = (head, rows, title, align) => ({ type: 'table', title, head, rows, align: align || head.map((_, i) => (i ? 'right' : 'left')) });

  const MODES = [['eoq', 'EOQ'], ['discount', 'Discounts'], ['levels', 'Stock levels']];
  let lastMode = 'eoq';                                   // the mode last computed: challenge.gen draws a problem of the same kind

  /* ================================================================ mode: EOQ and cost curves */
  function computeEoq(v) {
    const u = v.unit, A = amt(v.A, 'Annual requirement', { pos: true }), O = amt(v.O, 'Cost per order', { pos: true }), price = amt(v.price, 'Purchase price per unit');
    const pct = amt(v.pct, 'Carrying cost %'), rup = amt(v.rup, 'Carrying cost ₹ per unit'), C = carrying(price, pct, rup);
    const Ex = eoq(A, O, C), E = v.roundQ ? Math.max(1, Math.round(Ex)) : Ex, whole = !!v.whole;
    const cmp = amt(v.cmp, 'The order size to compare');
    const P = policy(A, O, price, C, E, whole), X = cmp > 0 ? policy(A, O, price, C, cmp, whole) : null;
    const relX = Q => (A / Q) * O + (Q / 2) * C;                                   // the curves: exact A ÷ Q
    const xs = axis(0, Math.max(2.2 * Ex, cmp > 0 ? cmp * 1.18 : 0), 6), xmax = xs.range[1];
    const ys = axis(0, Math.max(1.75 * relX(Ex), cmp > 0 ? relX(cmp) * 1.12 : 0), 5);
    const cWhy = pct > 0 && rup > 0 ? `${pc(pct)} × ${inr(price)} + ${inr(rup)} = ${inr(C)}` : pct > 0 ? `${pc(pct)} × ${inr(price)} = ${inr(C)}` : inr(C);
    const plot = (k, extra) => {
      const se = [{ label: 'ordering cost', color: 'a', pts: sample(Q => (A / Q) * O, xmax / 160, xmax, 160) }];
      if (k >= 2) se.push({ label: 'carrying cost', color: 'b', pts: [[0, 0], [xmax, (xmax / 2) * C]] });
      if (k >= 3) se.push({ label: 'total relevant cost', color: 'd', pts: sample(relX, xmax / 160, xmax, 160) });
      if (k >= 4) se.push({ pts: [[Ex, 0], [Ex, relX(Ex)]], color: 'mute', dash: true, legend: false });
      const pts = [];
      if (k >= 4) pts.push({ x: r2(Ex), y: r2(relX(Ex)), label: `EOQ ${nf(E)}`, pos: 'above', color: 'd' }, { x: r2(Ex), y: r2(relX(Ex) / 2), label: 'ordering = carrying', pos: 'right' });
      if (extra && X) { se.push({ pts: [[cmp, 0], [cmp, relX(cmp)]], color: 'mute', dash: true, legend: false }); pts.push({ x: cmp, y: r2(relX(cmp)), label: `${nf(cmp)} at a time`, pos: cmp > Ex ? 'left' : 'right', color: 'c' }); }
      return { type: 'plot', title: 'Annual ordering, carrying and total relevant cost', alt: `Ordering cost falls and carrying cost rises with the order size; the total is lowest at the EOQ, ${nf(E)} ${u}`, w: 560, h: 320,
        x: xs.range, y: ys.range, xticks: xs.ticks, yticks: ys.ticks, xlabel: `order size Q (${u})`, ylabel: '₹ a year', clip: true, legend: 'outside', series: se, points: pts };
    };
    const given = fx(['Item', 'Working', 'Value'], [
      ['Annual requirement (A)', 'given', `${nf(A)} ${u}`],
      ['Cost of placing one order (O)', 'given', inr(O)],
      ['Carrying cost per unit a year (C)', pct > 0 ? cWhy.replace(/ = .*$/, '') : 'given', inr(C)]
    ].concat(cmp > 0 ? [['Order size to compare', 'given', `${nf(cmp)} ${u}`]] : []), 'The data', ['left', 'left', 'right']);
    const eoqRow = ['EOQ', `√(2 × ${nf(A)} × ${grp(O)} ÷ ${grp(r2(C))})`, `${nf(Ex)}${v.roundQ && Math.abs(Ex - E) > 0.005 ? ` → ${nf(E)}` : ''} ${u}`];
    const workRows = [eoqRow,
      ['Orders a year', `${nf(A)} ÷ ${nf(E)}${whole && Math.abs(A / E - P.n) > 1e-6 ? ` = ${nf(A / E)}, rounded up` : ''}`, nf(P.n)],
      ['Ordering cost', `${nf(P.n)} × ${inr(O)}`, inr(P.ordering)],
      ['Carrying cost', `${nf(E)} ÷ 2 × ${inr(C)}`, inr(P.carrying)],
      ['Total relevant cost', 'ordering + carrying', inr(P.relevant)],
      ['Purchase cost', `${nf(A)} × ${inr(price)}`, inr(P.purchase)],
      ['Total cost', 'purchase + ordering + carrying', inr(P.total)]];
    const work = n => fx(['Item', 'Formula', 'Value'], workRows.slice(0, n), 'Cost at the EOQ', ['left', 'left', 'right']);
    const unequal = whole && Math.abs(P.ordering - P.carrying) > 0.005;
    const frames = [
      { caption: `**The data.** ${nf(A)} ${u} are needed a year; placing one order costs ${inr(O)}; holding one unit in store for a year costs ${cWhy} (interest on the money tied up, storage, insurance, obsolescence).`, view: [given] },
      { caption: `**Ordering cost = A ÷ Q × O.** The bigger each order Q, the fewer orders a year: ${nf(A)} ÷ ${nf(xs.ticks[1][0])} = ${nf(A / xs.ticks[1][0])} orders, but ${nf(A)} ÷ ${nf(xs.ticks[3][0])} = ${nf(A / xs.ticks[3][0])}. So the curve falls steeply, then flattens.`, view: [plot(1)] },
      { caption: `**Carrying cost = Q ÷ 2 × C.** Stock falls evenly from Q to nothing before the next delivery, so on average Q ÷ 2 ${u} sit in store, each costing ${inr(C)} a year: a straight line rising with Q.`, view: [plot(2)] },
      { caption: `**Total relevant cost = ordering + carrying.** Small orders pay for too many orders; big orders pay for too much stock. The total is lowest in between. The purchase price (${inr(P.purchase)} a year) is the same for every order size, so the curve leaves it out.`, view: [plot(3)] },
      { caption: `**The EOQ is where the two costs are equal.** Setting A × O ÷ Q = Q × C ÷ 2 gives EOQ = √(2AO ÷ C) = √(2 × ${nf(A)} × ${grp(O)} ÷ ${grp(r2(C))}) = **${nf(Ex)} ${u}**${v.roundQ && Math.abs(Ex - E) > 0.005 ? `, taken as **${nf(E)}** (whole units, as ICAI's answers do)` : ''}.`, view: [plot(4), work(1)] },
      { caption: `**At the EOQ** ${whole && Math.abs(A / E - P.n) > 1e-6 ? `${nf(A)} ÷ ${nf(E)} = ${nf(A / E)} orders, rounded up to **${nf(P.n)}** (an order cannot be split)` : `${nf(A)} ÷ ${nf(E)} = **${nf(P.n)} orders** a year`}: ordering ${inr(P.ordering)}, and an average stock of ${nf(P.avg)} ${u} costs ${inr(P.carrying)} to carry. Total relevant cost **${inr(P.relevant)}**${unequal ? ' (rounding the orders up is why ordering and carrying differ slightly)' : ', the lowest possible'}.`, view: [plot(4), work(5)] }
    ];
    if (X) {
      const save = X.relevant - P.relevant;
      frames.push({ caption: `**Ordering ${nf(cmp)} ${u} at a time instead:** ${nf(X.n)} orders cost ${inr(X.ordering)} and an average stock of ${nf(X.avg)} ${u} costs ${inr(X.carrying)}, so ${inr(X.relevant)} a year. ${save >= 0 ? `The EOQ saves **${inr(save)}** a year` : `This is **${inr(-save)}** cheaper than the EOQ (only because whole orders are rounded up)`}.`,
        view: [plot(4, true), fx(['Item', `EOQ (${nf(E)})`, `${nf(cmp)} at a time`], [['Orders a year', nf(P.n), nf(X.n)], ['Ordering cost', inr(P.ordering), inr(X.ordering)], ['Average stock', nf(P.avg), nf(X.avg)], ['Carrying cost', inr(P.carrying), inr(X.carrying)], ['Total relevant cost', inr(P.relevant), inr(X.relevant)]], 'EOQ against the other order size')] });
    }
    frames.push({ caption: `**Total cost** = purchase ${inr(P.purchase)} + ordering ${inr(P.ordering)} + carrying ${inr(P.carrying)} = **${inr(P.total)}**. Near the EOQ the curve is flat: ordering twice (or half) the EOQ raises the relevant cost by only a quarter.`, view: [plot(4, !!X), work(7)] });
    const half = policy(A, O, price, C, E / 2, false), dbl = policy(A, O, price, C, E * 2, false);
    const rows = [['EOQ', nf(E), nf(P.n), inr(P.ordering), inr(P.carrying), inr(P.relevant), inr(P.total)]];
    if (X) rows.push([`${nf(cmp)} at a time`, nf(cmp), nf(X.n), inr(X.ordering), inr(X.carrying), inr(X.relevant), inr(X.total)]);
    rows.push(['Half the EOQ (exact orders)', nf(E / 2), nf(half.n), inr(half.ordering), inr(half.carrying), inr(half.relevant), inr(half.total)],
      ['Twice the EOQ (exact orders)', nf(E * 2), nf(dbl.n), inr(dbl.ordering), inr(dbl.carrying), inr(dbl.relevant), inr(dbl.total)]);
    const stats = [{ label: `EOQ (${u})`, value: nf(E), hint: '√(2 × A × O ÷ C)' }, { label: 'Orders a year', value: nf(P.n), hint: 'A ÷ EOQ' },
      { label: 'Ordering + carrying at the EOQ', value: inr(P.relevant), hint: 'A ÷ Q × O + Q ÷ 2 × C' }, { label: 'Total cost incl. purchase', value: inr(P.total), hint: 'A × price + ordering + carrying' }];
    if (X) stats.push({ label: X.relevant >= P.relevant ? `Saving by the EOQ vs ${nf(cmp)}` : `Extra cost of the EOQ vs ${nf(cmp)}`, value: inr(Math.abs(X.relevant - P.relevant)), hint: 'relevant cost at the other size − at the EOQ', tone: X.relevant >= P.relevant ? 'ok' : '' });
    return {
      frames, stats, sim: { mode: 'eoq', A, O, price, C, eoqExact: Ex, eoq: E, at: P, cmp: X, saving: X ? X.relevant - P.relevant : null },
      table: { head: ['Order size', `Q (${u})`, 'Orders', 'Ordering', 'Carrying', 'Ordering + carrying', 'Total incl. purchase'], rows },
      note: `**Conventions.** Carrying cost C is the % of the unit price plus any ₹ amount a unit a year. ${v.roundQ ? 'The EOQ is rounded to whole units before it is used, as ICAI\'s answers do.' : 'The EOQ is used unrounded.'} ${whole ? 'Orders a year are rounded up to a whole number when A ÷ Q is not whole, as ICAI\'s answers do.' : 'Orders a year are A ÷ Q exactly.'} The curves use A ÷ Q exactly. The purchase price is the same for every order size, so the curves leave it out and the tables add it back.`
    };
  }

  /* ================================================================ mode: quantity discounts */
  function computeDiscount(v) {
    const u = v.unit, A = amt(v.A, 'Annual requirement', { pos: true }), O = amt(v.O, 'Cost per order', { pos: true }), base = amt(v.price, 'List price per unit', { pos: true });
    const pct = amt(v.pct, 'Carrying cost %'), rup = amt(v.rup, 'Carrying cost ₹ per unit');
    const D = discount(A, O, base, pct, rup, v.tiers, { roundQ: v.roundQ, whole: v.whole });
    const T = D.tiers, E0 = D.base;
    const band = (i, short) => { const t = T[i], hi = i + 1 < T.length ? T[i + 1].from : null; return i ? (hi ? `${nf(t.from)}–${nf(hi)}${short ? '' : ` ${u}`}` : `${nf(t.from)}+${short ? '' : ` ${u}`}`) : `below ${nf(T[1].from)}`; };
    const nTxt = c => (v.whole && Math.abs(A / c.Q - c.n) > 1e-6 ? `${nf(A)} ÷ ${nf(c.Q)} = ${nf(A / c.Q)}, so ${nf(c.n)} orders` : `${nf(c.n)} orders`);
    const priceTxt = t => `${inr(t.price)}${t.off > 0 ? ` (${grp(r2(t.off))}% off)` : ''}`;
    const list = fx(['Order size', 'Price per unit', 'Carrying cost C'], T.map((t, i) => [band(i), priceTxt(t), inr(carrying(t.price, pct, rup))]), 'The price list');
    const head = ['Order size', 'Price', 'Orders', 'Purchase cost', 'Ordering cost', 'Carrying cost', 'Total cost'];
    const rowOf = c => [`${nf(c.Q)}${c.kind === 'eoq' ? ' (EOQ)' : ''}`, inr(c.price), nf(c.n), inr(c.purchase), inr(c.ordering), inr(c.carrying), inr(c.total)];
    const table = (k, best) => {
      const shown = D.cands.slice(0, k), rows = shown.map(rowOf), cells = {};
      if (best) { const bi = shown.indexOf(D.best); if (bi >= 0) for (let j = 0; j < head.length; j++) cells[bi + ',' + j] = 'ok'; }
      return { type: 'table', title: 'Total annual cost of each order size', head, rows, cells, align: ['left', 'right', 'right', 'right', 'right', 'right', 'right'] };
    };
    const lo = Math.min(...D.cands.map(c => c.Q)), hi = Math.max(...D.cands.map(c => c.Q));
    const xs = axis(0, Math.max(hi * 1.2, D.eoqExact * 2.2), 6), xmax = xs.range[1];
    const tot = (t, Q) => A * t.price + (A / Q) * O + (Q / 2) * carrying(t.price, pct, rup);
    const totals = D.cands.map(c => c.total);
    const yLo = Math.min(...totals), yHi = Math.max(...totals), pad = Math.max((yHi - yLo) * 0.35, yLo * 0.004, 1);
    const ys = axis(Math.max(0, yLo - pad), yHi + pad, 5);
    const plot = () => ({
      type: 'plot', title: 'Total annual cost of each price band', alt: 'Each band\'s total-cost curve; the cheapest point is marked', w: 560, h: 320, x: xs.range, y: ys.range, xticks: xs.ticks, yticks: ys.ticks,
      xlabel: `order size Q (${u})`, ylabel: 'total cost (₹ a year)', clip: true, legend: 'outside',
      series: T.map((t, i) => { const a = Math.max(i ? t.from : xmax / 200, lo / 4), b = Math.min(i + 1 < T.length ? T[i + 1].from : xmax, xmax); return { label: `${inr(t.price)} band`, color: 'abcdefgh'[i % 8], pts: b > a ? sample(Q => tot(t, Q), a, b, 90) : [] }; }),
      points: D.cands.map(c => ({ x: r2(c.Q), y: r2(c.total), label: c === D.best ? `best: ${nf(c.Q)}` : nf(c.Q), pos: 'above', color: c === D.best ? 'ok' : null })).map(p => (p.color ? p : { x: p.x, y: p.y, label: p.label, pos: p.pos }))
    });
    const frames = [{ caption: `**The offer.** The price falls for bigger orders (an all-units discount: the lower price applies to the whole order). Carrying cost ${pct > 0 ? `is ${pc(pct)} of the price${rup > 0 ? ` plus ${inr(rup)}` : ''}, so it falls with the price too` : `stays ${inr(rup)} a unit`}.`, view: [list] }];
    const eoqWhy = `√(2 × ${nf(A)} × ${grp(O)} ÷ ${grp(r2(D.C0))}) = ${nf(D.eoqExact)}${v.roundQ && Math.abs(D.eoqExact - D.eoq) > 0.005 ? ` → ${nf(D.eoq)}` : ''}`;
    D.cands.forEach((c, k) => {
      let cap;
      if (c.kind === 'eoq') cap = `**Start with the EOQ at the list price:** ${eoqWhy} ${u}. ${c.band ? `It already qualifies for the ${inr(c.price)} band.` : `It is below the first break (${nf(T[1].from)}), so it pays ${inr(c.price)}.`} ${nTxt(c)} cost ${inr(c.ordering)}, carrying ${inr(c.carrying)}; with the purchase cost, **${inr(c.total)}** a year.`;
      else if (c.kind === 'inner') cap = `**The ${inr(c.price)} band's own EOQ, ${nf(c.Q)} ${u}, falls inside the band**, so it is tested too: **${inr(c.total)}**.`;
      else {
        const d = c.total - E0.total;
        cap = `**Order ${nf(c.Q)} ${u} (the smallest order that earns ${inr(c.price)}).** Against the EOQ the price saves ${inr(E0.purchase - c.purchase)} a year and fewer orders (${nTxt(c)}) save ${inr(E0.ordering - c.ordering)}, but carrying ${nf(c.avg)} ${u} on average costs ${inr(c.carrying - E0.carrying)} more. Total **${inr(c.total)}**: ${d < 0 ? `${inr(-d)} less than the EOQ` : `${inr(d)} more than the EOQ`}.${k === 1 || (k === 2 && D.cands[1].kind === 'inner') ? ` (A bigger order inside the same band pays the same price but carries more stock, so only the band's smallest order needs testing.)` : ''}`;
      }
      frames.push({ caption: cap, view: [table(k + 1, false)] });
    });
    const second = D.cands.filter(c => c !== D.best).sort((a, b) => a.total - b.total)[0];
    frames.push({ caption: `**The total-cost curve of each band.** Within a band the curve is the EOQ curve lifted by that band's purchase cost; a cheaper band starts lower. The marked points are the order sizes in the table.`, view: [plot(), table(D.cands.length, false)] });
    frames.push({ caption: `**Best: ${nf(D.best.Q)} ${u} at a time** at ${inr(D.best.price)}, total **${inr(D.best.total)}** a year${second ? `, ${inr(second.total - D.best.total)} less than the next best (${nf(second.Q)})` : ''}. ${D.best.kind === 'eoq' ? 'The discounts do not pay for the extra stock they need: stay with the EOQ.' : D.best === D.cands[D.cands.length - 1] ? 'The biggest discount wins: its price saving outweighs the extra carrying cost.' : 'A deeper discount needs so much more stock that its carrying cost eats the extra price saving.'}`, view: [plot(), table(D.cands.length, true)] });
    const sv = E0.total - D.best.total;
    return {
      frames, sim: Object.assign({ mode: 'discount', A, O }, D),
      stats: [{ label: `EOQ at the list price (${u})`, value: nf(D.eoq), hint: '√(2 × A × O ÷ C at the list price)' }, { label: `Best order size (${u})`, value: nf(D.best.Q), hint: 'the lowest total of purchase + ordering + carrying cost', tone: 'ok' },
        { label: 'Total cost at the best size', value: inr(D.best.total), hint: 'A × price + A ÷ Q × O + Q ÷ 2 × C' }, { label: sv > 0.005 ? 'Saving against the EOQ' : 'Saving against the EOQ (none)', value: inr(Math.max(0, sv)), hint: 'total at the EOQ − total at the best size' }],
      table: { head, rows: D.cands.map(c => { const r = rowOf(c); if (c === D.best) r[0] += ' (best)'; return r; }) },
      note: `**Conventions.** Discounts are on all units: the price of a band applies to the whole order. A price-list entry is a rupee price or a % off the list price. Carrying cost is worked out at each band's own price. Each band is tested at its smallest order, and at its own EOQ when that falls inside the band. ${v.roundQ ? 'EOQs are rounded to whole units.' : 'EOQs are used unrounded.'} ${v.whole ? 'Orders a year are rounded up to a whole number, as ICAI\'s answers do.' : 'Orders a year are A ÷ Q exactly.'} Ties go to the smaller order.`
    };
  }

  /* ================================================================ mode: stock levels */
  const PER = { day: ['day', 'days'], week: ['week', 'weeks'], month: ['month', 'months'] };
  function computeLevels(v) {
    const u = v.unit, per = PER[v.per] || PER.day, [p1, pN] = per;
    const umax = amt(v.umax, 'Maximum usage'), uavg = v.ubasis === 'minmax' ? null : amt(v.uavg, 'Average usage');
    let umin = v.ubasis === 'avgmax' ? null : amt(v.umin, 'Minimum usage');
    const lmin = amt(v.lmin, 'Minimum lead time'), lmax = amt(v.lmax, 'Maximum lead time');
    const lavg = v.ltMid ? (lmin + lmax) / 2 : amt(v.lavg, 'Average lead time');
    let ua = uavg;
    if (v.ubasis === 'minmax') ua = (umin + umax) / 2;
    if (v.ubasis === 'avgmax') { umin = 2 * uavg - umax; if (umin < -EPS) throw new Error(`An average usage of ${nf(uavg)} with a maximum of ${nf(umax)} gives a negative minimum (2 × ${nf(uavg)} − ${nf(umax)}); check the figures.`); umin = Math.max(0, umin); }
    let roq, R = null;
    if (v.roqFrom === 'eoq') {
      const A = amt(v.A, 'Annual requirement', { pos: true }), O = amt(v.O, 'Cost per order', { pos: true }), price = amt(v.price, 'Purchase price per unit');
      const C = carrying(price, amt(v.pct, 'Carrying cost %'), amt(v.rup, 'Carrying cost ₹ per unit')), ex = eoq(A, O, C);
      roq = v.roundQ ? Math.max(1, Math.round(ex)) : ex; R = { A, O, C, ex };
    } else roq = amt(v.roq, 'Re-order quantity', { pos: true });
    const L = levels({ umin, uavg: ua, umax, lmin, lavg, lmax, roq, rolFrom: v.rolFrom, safety: amt(v.safety, 'Safety stock'), rol: amt(v.rol, 'Re-order level'),
      lemerg: amt(v.lemerg, 'Emergency lead time'), dangerMin: !!v.dangerMin, shelf: amt(v.shelf, 'Shelf life') });
    const avg = v.avgF === 'mid' ? L.avgMid : L.avgHalf;
    const g = [['Usage per ' + p1, v.ubasis === 'minmax' ? `${nf(umin)} to ${nf(umax)}; average = (${nf(umin)} + ${nf(umax)}) ÷ 2 = ${nf(ua)}` : v.ubasis === 'avgmax' ? `average ${nf(ua)}, maximum ${nf(umax)}; minimum = 2 × ${nf(ua)} − ${nf(umax)} = ${nf(umin)}` : `minimum ${nf(umin)}, average ${nf(ua)}, maximum ${nf(umax)}`],
      ['Lead time (' + pN + ')', v.ltMid ? `${nf(lmin)} to ${nf(lmax)}; average = (${nf(lmin)} + ${nf(lmax)}) ÷ 2 = ${nf(lavg)}` : `minimum ${nf(lmin)}, average ${nf(lavg)}, maximum ${nf(lmax)}`]];
    if (L.danger != null) g.push(['Emergency lead time', `${nf(v.lemerg)} ${pN}`]);
    if (v.shelf > 0) g.push(['Shelf life', `${nf(v.shelf)} ${pN}: stock above ${nf(L.cap)} ${u} (average usage × shelf life) would spoil`]);
    if (v.rolFrom === 'safety') g.push(['Safety stock', `${nf(v.safety)} ${u}`]);
    if (v.rolFrom === 'given') g.push(['Re-order level', `given: ${nf(v.rol)} ${u}`]);
    const givenTab = { type: 'table', title: 'The data', head: ['Item', 'Value'], rows: g, align: ['left', 'left'] };
    const roqRow = R ? ['Re-order quantity (EOQ)', `√(2 × ${nf(R.A)} × ${grp(R.O)} ÷ ${grp(r2(R.C))})${v.roundQ && Math.abs(R.ex - roq) > 0.005 ? ` = ${nf(R.ex)}` : ''}`, nf(roq)] : ['Re-order quantity', 'given', nf(roq)];
    const rolRow = v.rolFrom === 'safety' ? ['Re-order level', `${nf(v.safety)} + ${nf(ua)} × ${nf(lavg)}`, nf(L.rol)] : v.rolFrom === 'given' ? ['Re-order level', 'given', nf(L.rol)] : ['Re-order level', `${nf(umax)} × ${nf(lmax)}`, nf(L.rol)];
    const rowsAll = [roqRow, rolRow, ['Minimum level', `${nf(L.rol)} − ${nf(ua)} × ${nf(lavg)}`, nf(L.min)],
      ['Maximum level', `${nf(L.rol)} + ${nf(roq)} − ${nf(umin)} × ${nf(lmin)}${L.capped ? ` = ${nf(L.maxF)}, capped at ${nf(L.cap)}` : ''}`, nf(L.max)],
      ['Average stock', v.avgF === 'mid' ? `(${nf(L.min)} + ${nf(L.max)}) ÷ 2` : `${nf(L.min)} + ${nf(roq)} ÷ 2`, nf(avg)]];
    if (L.danger != null) rowsAll.push(['Danger level', `${nf(v.dangerMin ? umin : ua)} × ${nf(v.lemerg)}`, nf(L.danger)]);
    const work = k => ({ type: 'table', title: 'Stock levels', head: ['Level', 'Working', `${u}`], rows: rowsAll.slice(0, k), align: ['left', 'left', 'right'] });

    /* the stock control chart: two normal cycles (average usage, average lead time), then three futures after the second order */
    const top = L.min + roq, drawable = top > L.rol + EPS;
    const T = roq / ua, t1 = drawable ? (top - L.rol) / ua : 0, tb = T + t1;
    const xs = axis(0, tb + Math.max(lmax, lavg) + 0.18 * T, 7);
    const peak = Math.max(L.max, top, L.best + roq, L.rol);
    const ys = axis(0, peak * 1.08, 5);
    const lv = (k, name, val, color) => ({ k, name, val, color });
    const levelLines = [lv(1, 're-order', L.rol, 'd'), lv(3, 'minimum', L.min, 'c'), lv(4, 'maximum', L.max, 'g'), lv(5, 'average', avg, 'e')].concat(L.danger != null ? [lv(6, 'danger', L.danger, 'h')] : []);
    const chart = k => {
      const se = [];
      if (drawable) {
        const normal = [[0, top], [T, L.min], [T, top], [tb, L.rol]];
        if (k >= 3) normal.push([tb + lavg, L.min], [tb + lavg, top], [Math.min(xs.range[1], tb + lavg + 0.15 * T), top - ua * 0.15 * T]);
        se.push({ label: 'stock (average usage)', color: 'a', pts: normal });
        if (k >= 2) se.push({ label: 'fastest usage, slowest delivery', color: 'bad', dash: true, pts: [[tb, L.rol], [tb + lmax, Math.max(0, L.worst)], [tb + lmax, Math.max(0, L.worst) + roq]] });
        if (k >= 4) se.push({ label: 'slowest usage, fastest delivery', color: 'f', dash: true, pts: [[tb, L.rol], [tb + lmin, L.best], [tb + lmin, L.best + roq]] });
      }
      const marks = levelLines.filter(l => l.k <= k);
      marks.forEach(l => se.push({ pts: [[xs.range[0], l.val], [xs.range[1], l.val]], color: l.color, legend: false, dash: l.name !== 're-order' }));
      /* level names on the y axis; levels closer than 6 % of the axis share one label */
      const sorted = marks.slice().sort((a, b) => a.val - b.val), ticks = [], span = ys.range[1] - ys.range[0];
      sorted.forEach(l => { const last = ticks[ticks.length - 1]; if (last && l.val - last.v < span * 0.06) { last.t += ` · ${l.name} ${nf(l.val)}`; last.v = l.val; } else ticks.push({ v: l.val, t: `${l.name} ${nf(l.val)}` }); });
      const pts = [];
      if (drawable && k >= 2 && L.worst < -EPS) pts.push({ x: r2(tb + lmax), y: 0, label: `stock-out of ${nf(-L.worst)}`, pos: 'right', color: 'bad' });
      return { type: 'plot', title: 'Stock control chart', alt: `Stock falls from ${nf(top)} to the minimum ${nf(L.min)} in a normal cycle; re-order level ${nf(L.rol)}, maximum ${nf(L.max)}`, w: 560, h: 330,
        x: xs.range, y: ys.range, xticks: xs.ticks, yticks: [[0, '0']].concat(ticks.map(t => [r2(t.v), t.t])), xlabel: pN, ylabel: `${u} in stock`, clip: true, legend: 'outside', series: se, points: pts };
    };
    const why = drawable ? '' : ` (The re-order quantity ${nf(roq)} is less than the usage during a lead time, so orders overlap and the chart shows the levels only.)`;
    const frames = [
      { caption: umin === umax && lmin === lmax ? `**The data.** Usage is steady at ${nf(ua)} ${u} a ${p1} and delivery always takes ${nf(lavg)} ${pN}, so the normal case and both extremes are the same.`
        : `**The data.** Usage runs from ${nf(umin)} to ${nf(umax)} ${u} a ${p1} (average ${nf(ua)}) and delivery takes ${nf(lmin)} to ${nf(lmax)} ${pN} (average ${nf(lavg)}): each level plans for the normal case or one of the extremes.`, view: [givenTab] },
      { caption: R ? `**How much to order: the EOQ**, √(2 × ${nf(R.A)} × ${grp(R.O)} ÷ ${grp(r2(R.C))}) = ${nf(R.ex)} ${u}${v.roundQ && Math.abs(R.ex - roq) > 0.005 ? `, taken as ${nf(roq)}` : ''}, is the re-order quantity.` : `**How much to order:** the re-order quantity is given, ${nf(roq)} ${u}.`, view: [work(1)] },
      { caption: (v.rolFrom === 'safety' ? `**Re-order level = safety stock + usage during a normal lead time** = ${nf(v.safety)} + ${nf(ua)} × ${nf(lavg)} = **${nf(L.rol)}**. When stock falls to it, an order goes out, and the safety stock is still there when a normal delivery arrives.`
        : v.rolFrom === 'given' ? `**Re-order level** is given: **${nf(L.rol)}** ${u}. When stock falls to it, a fresh order of ${nf(roq)} goes out.`
          : `**Re-order level = maximum usage × maximum lead time** = ${nf(umax)} × ${nf(lmax)} = **${nf(L.rol)}**. Order when stock falls this low: even at the fastest usage for the longest wait, the stock lasts until the delivery.`) + why, view: [chart(1), work(2)] },
      { caption: drawable ? (L.worst < -EPS ? `**The worst case:** at ${nf(umax)} a ${p1} for ${nf(lmax)} ${pN}, ${nf(umax * lmax)} ${u} are used while the order is on its way, more than the ${nf(L.rol)} in hand: a **stock-out of ${nf(-L.worst)}** before the delivery arrives.` : `**The worst case:** at ${nf(umax)} a ${p1} for ${nf(lmax)} ${pN}, ${nf(umax * lmax)} ${u} are used while the order is on its way, leaving ${nf(L.worst)}${Math.abs(L.worst) < EPS ? ': the stock just runs out as the delivery arrives' : ''}. That is why the re-order level is set where it is.`) : `**The worst case** uses ${nf(umax * lmax)} ${u} during the longest lead time.${why}`, view: [chart(2), work(2)] },
      { caption: `**Minimum level = re-order level − average usage × average lead time** = ${nf(L.rol)} − ${nf(ua)} × ${nf(lavg)} = **${nf(L.min)}**. In a normal cycle the delivery arrives just as stock reaches it; stock below it is a warning that usage or lead time is running above normal.`, view: [chart(3), work(3)] },
      { caption: `**Maximum level = re-order level + re-order quantity − minimum usage × minimum lead time** = ${nf(L.rol)} + ${nf(roq)} − ${nf(umin)} × ${nf(lmin)} = ${nf(L.maxF)}. In the best case (slowest usage, fastest delivery) ${nf(umin * lmin)} ${u} are used before the delivery arrives, so the new lot lifts stock to this peak.${L.capped ? ` The material spoils after ${nf(v.shelf)} ${pN}, so stock is capped at ${nf(ua)} × ${nf(v.shelf)} = **${nf(L.cap)}**, the lower of the two.` : ` **Maximum level ${nf(L.max)}**: more than this ties up money and space.`}`, view: [chart(4), work(4)] },
      { caption: v.avgF === 'mid' ? `**Average stock level = (minimum + maximum) ÷ 2** = (${nf(L.min)} + ${nf(L.max)}) ÷ 2 = **${nf(L.avgMid)}**. (The other formula, minimum + ½ re-order quantity, gives ${Math.abs(L.avgHalf - L.avgMid) < 0.005 ? 'the same here' : `${nf(L.avgHalf)}: the middle of a normal cycle`}.)` : `**Average stock level = minimum + ½ re-order quantity** = ${nf(L.min)} + ${nf(roq)} ÷ 2 = **${nf(L.avgHalf)}**: a normal cycle runs from ${nf(top)} down to ${nf(L.min)}, so this is its middle. (The other formula, (minimum + maximum) ÷ 2, gives ${Math.abs(L.avgHalf - L.avgMid) < 0.005 ? 'the same here' : nf(L.avgMid)}.)`, view: [chart(5), work(5)] }
    ];
    if (L.danger != null) frames.push({ caption: `**Danger level = ${v.dangerMin ? 'minimum' : 'average'} usage × emergency lead time** = ${nf(v.dangerMin ? umin : ua)} × ${nf(v.lemerg)} = **${nf(L.danger)}**. Below it, normal issues stop and an emergency purchase is made: this is just enough to last until a rush order arrives.`, view: [chart(6), work(6)] });
    frames.push({ caption: `**The stock control chart.** Re-order at ${nf(L.rol)}; stock normally swings between ${nf(L.min)} and ${nf(top)} and never needs to pass the maximum ${nf(L.max)}${L.danger != null ? `; at ${nf(L.danger)} it is an emergency` : ''}.`, view: [chart(6), work(rowsAll.length)] });
    const stats = [{ label: `Re-order level (${u})`, value: nf(L.rol), hint: rolRow[1] }, { label: 'Minimum level', value: nf(L.min), hint: 'ROL − average usage × average lead time' },
      { label: 'Maximum level', value: nf(L.max), hint: 'ROL + ROQ − minimum usage × minimum lead time' }, { label: 'Average stock level', value: nf(avg), hint: v.avgF === 'mid' ? '(minimum + maximum) ÷ 2' : 'minimum + ½ ROQ' }];
    if (L.danger != null) stats.push({ label: 'Danger level', value: nf(L.danger), hint: `${v.dangerMin ? 'minimum' : 'average'} usage × emergency lead time` });
    if (L.danger == null) stats.push({ label: `Re-order quantity${R ? ' (EOQ)' : ''}`, value: nf(roq), hint: R ? '√(2 × A × O ÷ C)' : 'given' });
    return {
      frames, stats, sim: Object.assign({ mode: 'levels', roq, umin, uavg: ua, umax, lmin, lavg, lmax, avg, eoq: R ? roq : null }, L),
      table: { head: ['Level', 'Working', u], rows: rowsAll },
      note: `**Conventions.** Usage and lead time are in the same period (a ${p1}). ${v.rolFrom === 'safety' ? 'Re-order level = safety stock + average usage × average lead time.' : v.rolFrom === 'given' ? 'The re-order level is given.' : 'Re-order level = maximum usage × maximum lead time.'} Minimum level = re-order level − average usage × average lead time. Maximum level = re-order level + re-order quantity − minimum usage × minimum lead time${v.shelf > 0 ? ', or the shelf-life stock (average usage × shelf life) if lower' : ''}. ${L.danger != null ? `Danger level = ${v.dangerMin ? 'minimum' : 'average'} usage × emergency lead time.` : 'No emergency lead time is given, so there is no danger level.'} The chart's normal cycles use average usage and average lead time.`
    };
  }

  function compute(v) {
    lastMode = MODES.some(m => m[0] === v.mode) ? v.mode : 'eoq';
    if (lastMode === 'discount') return computeDiscount(v);
    if (lastMode === 'levels') return computeLevels(v);
    return computeEoq(v);
  }

  /* ================================================================ controls, presets, challenge */
  const isE = v => v.mode === 'eoq', isD = v => v.mode === 'discount', isL = v => v.mode === 'levels';
  const costIn = v => !isL(v) || v.roqFrom === 'eoq';
  const UNITS = [['units', 'units'], ['kg', 'kg'], ['tonnes', 'tonnes'], ['litres', 'litres'], ['bags', 'bags'], ['components', 'components']];
  const controls = [
    { id: 'mode', type: 'seg', label: 'What to explore', value: 'eoq', options: MODES },
    { id: 'unit', type: 'select', label: 'Unit of material', short: 'Unit', value: 'kg', options: UNITS },
    { id: 'per', type: 'select', label: 'Usage and lead time are per', short: 'Period', value: 'day', options: [['day', 'day'], ['week', 'week'], ['month', 'month']], show: isL },
    { id: 'ubasis', type: 'select', label: 'Usage given as', value: 'all', options: [['all', 'minimum, average and maximum'], ['minmax', 'minimum and maximum (average = midpoint)'], ['avgmax', 'average and maximum (minimum = 2 × average − maximum)']], show: isL },
    { id: 'umin', type: 'number', label: 'Minimum usage per period', short: 'Min usage', value: 300, min: 0, max: 1e9, show: v => isL(v) && v.ubasis !== 'avgmax' },
    { id: 'uavg', type: 'number', label: 'Average (normal) usage per period', short: 'Average usage', value: 400, min: 0, max: 1e9, show: v => isL(v) && v.ubasis !== 'minmax' },
    { id: 'umax', type: 'number', label: 'Maximum usage per period', short: 'Max usage', value: 500, min: 0, max: 1e9, show: isL },
    { id: 'lmin', type: 'number', label: 'Minimum lead time (periods)', short: 'Min lead time', value: 4, min: 0, max: 1000, show: isL },
    { id: 'lmax', type: 'number', label: 'Maximum lead time (periods)', short: 'Max lead time', value: 8, min: 0, max: 1000, show: isL },
    { id: 'ltMid', type: 'toggle', label: 'Average lead time = (minimum + maximum) ÷ 2', short: 'Average lead time = midpoint', value: true, show: isL },
    { id: 'lavg', type: 'number', label: 'Average lead time (periods)', short: 'Average lead time', value: 6, min: 0, max: 1000, show: v => isL(v) && !v.ltMid },
    { id: 'lemerg', type: 'number', label: 'Emergency lead time (periods, 0 = no danger level)', short: 'Emergency lead time', value: 2, min: 0, max: 1000, show: isL },
    { id: 'dangerMin', type: 'toggle', label: 'Danger level uses minimum usage (default: average)', short: 'Danger level at minimum usage', value: false, show: v => isL(v) && v.lemerg > 0 },
    { id: 'rolFrom', type: 'select', label: 'Re-order level', value: 'max', options: [['max', 'maximum usage × maximum lead time'], ['safety', 'safety stock + average usage × average lead time'], ['given', 'given']], show: isL },
    { id: 'safety', type: 'number', label: 'Safety (minimum) stock', short: 'Safety stock', value: 0, min: 0, max: 1e9, show: v => isL(v) && v.rolFrom === 'safety' },
    { id: 'rol', type: 'number', label: 'Re-order level (given)', short: 'Re-order level', value: 4000, min: 0, max: 1e9, show: v => isL(v) && v.rolFrom === 'given' },
    { id: 'roqFrom', type: 'seg', label: 'Re-order quantity', value: 'eoq', options: [['eoq', 'EOQ'], ['given', 'given']], show: isL },
    { id: 'roq', type: 'number', label: 'Re-order quantity (given)', short: 'Re-order quantity', value: 6000, min: 0, max: 1e9, show: v => isL(v) && v.roqFrom === 'given' },
    { id: 'shelf', type: 'number', label: 'Shelf life in periods (0 = no limit)', short: 'Shelf life', value: 0, min: 0, max: 1e6, show: isL },
    { id: 'avgF', type: 'select', label: 'Average stock level', value: 'half', options: [['half', 'minimum + ½ re-order quantity'], ['mid', '(minimum + maximum) ÷ 2']], show: isL },
    { id: 'A', type: 'number', label: 'Annual requirement A (units a year)', short: 'Annual requirement', value: 120000, min: 0, max: 1e10, show: costIn },
    { id: 'O', type: 'number', label: 'Cost of placing one order O (₹)', short: 'Cost per order', value: 1500, min: 0, max: 1e9, show: costIn },
    { id: 'price', type: 'number', label: 'Purchase price per unit (₹; the list price below the first break)', short: 'Price per unit', value: 100, min: 0, max: 1e9, show: costIn },
    { id: 'pct', type: 'number', label: 'Carrying cost: % of the unit price a year', short: 'Carrying %', value: 10, min: 0, max: 1000, show: costIn },
    { id: 'rup', type: 'number', label: 'Carrying cost: ₹ per unit a year (added to the %)', short: 'Carrying ₹ per unit', value: 0, min: 0, max: 1e9, show: costIn },
    { id: 'cmp', type: 'number', label: 'Compare with an order size of (0 = none)', short: 'Compare with', value: 30000, min: 0, max: 1e10, show: isE },
    { id: 'tiers', type: 'table', label: 'Price breaks (orders of at least … pay …)', max: 6, show: isD, rows: [[12000, '2%'], [30000, '2.5%']],
      cols: [{ id: 'from', label: 'Order size from', type: 'number', min: 1, def: 1000 }, { id: 'price', label: 'Price ₹ or % off', type: 'text', def: '1%' }] },
    { id: 'roundQ', type: 'toggle', label: 'Round the EOQ to whole units (as ICAI\'s answers do)', short: 'EOQ in whole units', value: true, show: costIn },
    { id: 'whole', type: 'toggle', label: 'Whole orders: round A ÷ Q up (as ICAI\'s answers do)', short: 'Whole orders', value: true, show: v => !isL(v) }
  ];
  const P = (label, values) => ({ label, values });
  const tapri = { unit: 'kg', A: 120000, O: 1500, price: 100, pct: 10, rup: 0, roundQ: true, whole: true };
  const presets = [
    P('Tapri premix: milk powder, Kesar\'s quarterly order of 30,000 kg against the EOQ', Object.assign({ mode: 'eoq', cmp: 30000 }, tapri)),
    P('Study Material Illustration 4: 5,000 units at ₹20, carrying 20% a year', { mode: 'eoq', unit: 'units', A: 5000, O: 16, price: 20, pct: 20, rup: 0, cmp: 0, roundQ: true, whole: true }),
    P('Study Material Practical Problem 1 (Anil & Company): six instalments against the EOQ', { mode: 'eoq', unit: 'units', A: 36000, O: 25, price: 1, pct: 20, rup: 0, cmp: 6000, roundQ: true, whole: true }),
    P('PYQ Jan 2026, MCQs 6–10 (data): raw material OC, 200 kg orders against the EOQ', { mode: 'eoq', unit: 'kg', A: 4000, O: 3125, price: 2000, pct: 20, rup: 0, cmp: 200, roundQ: true, whole: true }),
    P('MTP Sep 2025 Series II, Q3(a) (data): material D, ordering 200 kg less than the EOQ', { mode: 'eoq', unit: 'kg', A: 17200, O: 720, price: 125, pct: 13.76, rup: 0, cmp: 1000, roundQ: true, whole: true }),
    P('RTP Sep 2025, Q7 (data): material B, EOQ against a quarterly purchase of 5,000 kg', { mode: 'eoq', unit: 'kg', A: 20000, O: 500, price: 20, pct: 25, rup: 0, cmp: 5000, roundQ: true, whole: true }),
    P('Tapri premix: 2% off from 12,000 kg or 2.5% off from 30,000 kg?', Object.assign({ mode: 'discount', tiers: [[12000, '2%'], [30000, '2.5%']] }, tapri)),
    P('PYQ May 2024, Q1(a) (data): 2% off for 30,000 cycle locks an order', { mode: 'discount', unit: 'units', A: 360000, O: 1200, price: 240, pct: 10, rup: 0, tiers: [[30000, '2%']], roundQ: true, whole: true }),
    P('Study Material Practical Problem 2: 4% off for 4,000 components an order', { mode: 'discount', unit: 'components', A: 8000, O: 200, price: 400, pct: 20, rup: 0, tiers: [[4000, '4%']], roundQ: true, whole: true }),
    P('Study Material Practical Problem 5(a): EXE Limited\'s price list in tonnes', { mode: 'discount', unit: 'tonnes', A: 5000, O: 1200, price: 1200, pct: 20, rup: 0, tiers: [[500, 1180], [1000, 1160], [2000, 1140], [3000, 1120]], roundQ: true, whole: true }),
    P('MTP May 2024 Series II, Q1(b) (data): 5% off for 6,000 units an order', { mode: 'discount', unit: 'units', A: 12000, O: 1200, price: 1740, pct: 12, rup: 0, tiers: [[6000, '5%']], roundQ: true, whole: true }),
    P('RTP Sep 2026, Q5(h) (data): 1% off for buying the year\'s 14,600 kg in two orders', { mode: 'discount', unit: 'kg', A: 14600, O: 200, price: 100, pct: 12, rup: 2, tiers: [[7300, '1%']], roundQ: true, whole: true }),
    P('Tapri premix: milk powder levels, 300–500 kg a day, 4–8 days to deliver', Object.assign({ mode: 'levels', per: 'day', ubasis: 'all', umin: 300, uavg: 400, umax: 500, lmin: 4, lmax: 8, ltMid: true, lemerg: 2, dangerMin: false, rolFrom: 'max', roqFrom: 'eoq', shelf: 0, avgF: 'half' }, tapri)),
    P('Study Material Illustration 5: component A, re-order period 4 to 6 weeks', { mode: 'levels', unit: 'units', per: 'week', ubasis: 'all', umin: 25, uavg: 50, umax: 75, lmin: 4, lmax: 6, ltMid: true, lemerg: 0, rolFrom: 'max', roqFrom: 'given', roq: 300, shelf: 0, avgF: 'mid' }),
    P('Study Material Illustration 6: levels with the EOQ as re-order quantity', { mode: 'levels', unit: 'units', per: 'day', ubasis: 'avgmax', uavg: 15, umax: 20, lmin: 5, lmax: 15, ltMid: false, lavg: 10, lemerg: 4, dangerMin: false, rolFrom: 'max', roqFrom: 'eoq', A: 5000, O: 20, price: 50, pct: 0, rup: 5, roundQ: true, shelf: 0, avgF: 'half' }),
    P('RTP Sep 2026, Q5 (data): raw material for ESS, 210–350 kg a week (30–50 kg a day)', { mode: 'levels', unit: 'kg', per: 'day', ubasis: 'minmax', umin: 30, umax: 50, lmin: 5, lmax: 9, ltMid: true, lemerg: 0, rolFrom: 'max', roqFrom: 'eoq', A: 14600, O: 200, price: 100, pct: 12, rup: 2, roundQ: true, shelf: 0, avgF: 'mid' }),
    P('MTP Sep 2025 Series II, Q3(a) (data): material D, re-order quantity 1,000 kg', { mode: 'levels', unit: 'kg', per: 'day', ubasis: 'avgmax', uavg: 50, umax: 70, lmin: 4, lmax: 8, ltMid: true, lemerg: 0, rolFrom: 'max', roqFrom: 'given', roq: 1000, shelf: 0, avgF: 'half' }),
    P('PYQ May 2024, Q1(a)(ii) (data): re-order level with a safety stock of 6,500 locks', { mode: 'levels', unit: 'units', per: 'day', ubasis: 'all', umin: 1000, uavg: 1000, umax: 1000, lmin: 45, lmax: 45, ltMid: true, lemerg: 0, rolFrom: 'safety', safety: 6500, roqFrom: 'eoq', A: 360000, O: 1200, price: 240, pct: 10, rup: 0, roundQ: true, shelf: 0, avgF: 'half' }),
    P('Study Material Case Scenario 1: perishable material A, used within 10 days', { mode: 'levels', unit: 'kg', per: 'day', ubasis: 'all', umin: 1200, uavg: 1200, umax: 1200, lmin: 1, lmax: 2, ltMid: true, lemerg: 0, rolFrom: 'max', roqFrom: 'given', roq: 15000, shelf: 10, avgF: 'half' })
  ];

  /* ---------------------------------------------------------------- challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  function genEoq(r) {
    for (let k = 0; k < 400; k++) {
      const E = 100 * (2 + Math.floor(r() * 59)), O = pick(r, [50, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000]);
      const C = pick(r, [2, 4, 5, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 50]), A = (E * E * C) / (2 * O);
      if (!Number.isInteger(A) || A < 2 * E || A > 2e6) continue;
      const pct = pick(r, [10, 12, 15, 20, 25]), price = (C * 100) / pct, usePct = Number.isInteger(price * 2);
      const ask = pick(r, ['eoq', 'eoq', 'orders', 'saving']);
      const out = { mode: 'eoq', unit: pick(r, ['units', 'kg', 'components']), A, O, price: usePct ? price : 50, pct: usePct ? pct : 0, rup: usePct ? 0 : C, roundQ: true, whole: true, cmp: 0, ask };
      if (ask === 'orders' && A % E) continue;
      if (ask === 'saving') { const m = pick(r, [0.5, 2, 2.5, 3, 4]), cmp = E * m; if (!Number.isInteger(cmp) || !Number.isInteger(A / cmp)) continue; out.cmp = cmp; }
      return out;
    }
    return { mode: 'eoq', unit: 'units', A: 5000, O: 16, price: 20, pct: 20, rup: 0, roundQ: true, whole: true, cmp: 0, ask: 'eoq' };
  }
  function genDiscount(r) {
    for (let k = 0; k < 400; k++) {
      const g0 = genEoq(r); if (g0.ask === 'saving') continue;
      const E = Math.sqrt((2 * g0.A * g0.O) / carrying(g0.price, g0.pct, g0.rup)), n = 1 + Math.floor(r() * 3), tiers = [];
      let from = E * pick(r, [2, 2.5, 3, 4, 5]), off = 0;
      for (let i = 0; i < n; i++) { off += pick(r, [0.5, 1, 1.5, 2, 3, 4, 5]); from = Math.round(from / 100) * 100; tiers.push([from, off + '%']); from *= pick(r, [2, 2.5, 3]); }
      const v = Object.assign({}, g0, { mode: 'discount', tiers, cmp: 0, ask: 'best' });
      let D; try { D = discount(v.A, v.O, v.price, v.pct, v.rup, v.tiers, v); } catch (e) { continue; }
      const sorted = D.cands.slice().sort((a, b) => a.total - b.total);
      if (sorted.length > 1 && sorted[1].total - sorted[0].total < 50) continue;   // a clear winner, never a near-tie
      return v;
    }
    return { mode: 'discount', unit: 'units', A: 8000, O: 200, price: 400, pct: 20, rup: 0, tiers: [[4000, '4%']], roundQ: true, whole: true, ask: 'best' };
  }
  function genLevels(r) {
    const avgU = 10 * (2 + Math.floor(r() * 40)), spread = 10 * (1 + Math.floor(r() * Math.min(9, avgU / 10 - 1))), lmin = 1 + Math.floor(r() * 6), lmax = lmin + 2 * (1 + Math.floor(r() * 4));
    const roq = 100 * Math.ceil((avgU * (lmin + lmax) / 2 * (1.5 + r() * 3)) / 100);
    return { mode: 'levels', unit: pick(r, ['units', 'kg']), per: pick(r, ['day', 'week']), ubasis: 'all', umin: avgU - spread, uavg: avgU, umax: avgU + spread, lmin, lmax, ltMid: true,
      lemerg: pick(r, [0, 1, 2, 3]), dangerMin: false, rolFrom: 'max', roqFrom: 'given', roq, shelf: 0, avgF: pick(r, ['half', 'mid']), ask: pick(r, ['rol', 'min', 'max', 'avg', 'danger']) };
  }
  const LV = { rol: 're-order level', min: 'minimum level', max: 'maximum level', avg: 'average stock level', danger: 'danger level' };
  const askOf = v => (v.ask === 'danger' && !(v.lemerg > 0) ? 'rol' : v.ask || 'rol');
  const carryTxt = v => (v.pct > 0 ? `${grp(v.pct)}% of the ₹${grp(v.price)} price a year${v.rup > 0 ? ` plus ₹${grp(v.rup)} a unit` : ''}` : `₹${grp(v.rup)} a unit a year`);
  const challenge = {
    title: 'Work it out',
    gen(r) { return lastMode === 'discount' ? genDiscount(r) : lastMode === 'levels' ? genLevels(r) : genEoq(r); },
    prompt(v, res) {
      const u = v.unit;
      if (v.mode === 'discount') return `Annual requirement ${nf(v.A)} ${u}, ₹${grp(v.O)} an order, list price ₹${grp(v.price)}, carrying cost ${carryTxt(v)}. Price breaks: ${res.sim.tiers.slice(1).map(t => `${nf(t.from)}+ ${u} at ${grp(r2(t.off))}% off`).join('; ')}. Which **order size** gives the lowest total cost (purchase + ordering + carrying, whole orders)?`;
      if (v.mode === 'levels') { const a = askOf(v), p = (PER[v.per] || PER.day)[0]; return `Usage ${nf(v.umin)}–${nf(v.umax)} ${u} a ${p} (average ${nf(v.uavg)}), lead time ${nf(v.lmin)}–${nf(v.lmax)} ${p}s, re-order quantity ${nf(v.roq)}${v.lemerg > 0 ? `, emergency lead time ${nf(v.lemerg)} ${p}s` : ''}. What is the **${LV[a]}**${a === 'avg' ? (v.avgF === 'mid' ? ' (as (minimum + maximum) ÷ 2)' : ' (as minimum + ½ re-order quantity)') : ''}?`; }
      const base = `Annual requirement ${nf(v.A)} ${u}, ₹${grp(v.O)} to place an order, carrying cost ${carryTxt(v)}.`;
      if (v.ask === 'orders') return `${base} How many **orders a year** at the EOQ?`;
      if (v.ask === 'saving') return `${base} The buyer orders ${nf(v.cmp)} ${u} at a time. How much a year (₹, ordering + carrying) does ordering the EOQ instead **save**?`;
      return `${base} What is the **EOQ** (${u})?`;
    },
    solve(res, v) {
      const s = res.sim;
      if (s.mode === 'discount') return s.best.Q;
      if (s.mode === 'levels') { const a = askOf(v); return a === 'rol' ? s.rol : a === 'min' ? s.min : a === 'max' ? s.max : a === 'avg' ? s.avg : s.danger; }
      if (v.ask === 'orders') return s.at.n;
      if (v.ask === 'saving') return s.saving;
      return s.eoq;
    },
    tol: 0.5, unit: '', kind: 'num',
    view(res, v) {
      if (v.mode === 'discount') return [{ type: 'table', title: 'The price list', head: ['Order size from', 'Price'], rows: [['0', `₹${grp(v.price)}`]].concat(res.sim.tiers.slice(1).map(t => [nf(t.from), `${grp(r2(t.off))}% off`])), align: ['left', 'right'] }];
      return null;
    },
    explain(res, v) {
      const s = res.sim;
      if (s.mode === 'discount') return `EOQ at the list price = ${nf(s.eoq)}. Totals: ${s.cands.map(c => `${nf(c.Q)} → ${inr(c.total)}`).join('; ')}. The lowest is **${nf(s.best.Q)}**.`;
      if (s.mode === 'levels') return `ROL = ${nf(s.umax)} × ${nf(s.lmax)} = ${nf(s.rol)}; minimum = ${nf(s.rol)} − ${nf(s.uavg)} × ${nf(s.lavg)} = ${nf(s.min)}; maximum = ${nf(s.rol)} + ${nf(s.roq)} − ${nf(s.umin)} × ${nf(s.lmin)} = ${nf(s.max)}; average = ${nf(s.avg)}${s.danger != null ? `; danger = ${nf(s.uavg)} × ${nf(v.lemerg)} = ${nf(s.danger)}` : ''}.`;
      const base = `EOQ = √(2 × ${nf(s.A)} × ${grp(s.O)} ÷ ${grp(r2(s.C))}) = ${nf(s.eoq)}`;
      if (v.ask === 'orders') return `${base}; orders = ${nf(s.A)} ÷ ${nf(s.eoq)} = **${nf(s.at.n)}**.`;
      if (v.ask === 'saving') return `${base}: ordering + carrying = ${inr(s.at.relevant)}. At ${nf(v.cmp)}: ${nf(s.cmp.n)} × ₹${grp(s.O)} + ${nf(v.cmp)} ÷ 2 × ${inr(s.C)} = ${inr(s.cmp.relevant)}. Saving **${inr(s.saving)}**.`;
      return `${base} ${v.unit}.`;
    }
  };

  const def = {
    id: 'eoq', title: 'EOQ and Stock Levels Lab',
    blurb: 'Find the EOQ where ordering and carrying costs meet, test quantity discounts, and build the stock levels on a chart.',
    controls, presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { amt, carrying, eoq, ordersOf, policy, parseTiers, priceAt, discount, levels, compute, def };
  g.__lab_def_eoq = def;
})(typeof window !== 'undefined' ? window : globalThis);
