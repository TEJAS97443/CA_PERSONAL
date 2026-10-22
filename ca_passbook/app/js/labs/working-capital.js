/* PassBook — Working Capital Lab (Paper 6A: fm.wc).
   Pure part: cycle(o) -> the operating cycle R + W + F + D − C (SM ch. 9 §6, Illustration 2); estimate(o) -> the statement of working capital
   requirement on a total-cost or cash-cost basis (§6.2–6.3, Illustrations 3 and 4); credit(o) -> credit policies by the total and the
   incremental approach (§19, Illustrations 12–14); baumol(o) -> Baumol's optimum cash balance (§11.1, Illustration 10); millerOrr(o) -> the
   Miller-Orr control limits run on a made-up stream of daily cash flows (§11.2 states the rule, not a formula, so that part is illustrative).
   UI part: def and GA.lab.register(def) at the bottom. Node-testable: require('app/js/labs/working-capital.js'). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const UT = () => GA.util || {};
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const sg = (x, d) => (x < 0 ? '−' : '') + grp(Math.abs(x), d);
  const r2 = x => (x < 0 ? -1 : 1) * Math.round(Math.abs(x) * 100 + 1e-7) / 100;           // half away from zero, as ICAI rounds
  const inr = n => (UT().inr ? UT().inr(n) : (n < 0 ? '−' : '') + '₹' + grp(Math.abs(Math.round(n * 100) / 100)));
  const am = x => sg(r2(x));                                                               // a table amount: Indian grouping, at most two decimals
  const lakh = x => sg(r2(x / 1e5)) + ' lakh';
  const pct = x => sg(r2(x)) + '%';
  const tiny = x => Math.abs(x) < 1e-9;
  /** a forgiving amount: '12,50,000', ' 4.5 ', '₹ 30 000' → number; '' or junk → NaN */
  function amt(x) {
    if (typeof x === 'number') return x;
    const s = String(x == null ? '' : x).replace(/[₹,\s_%]/g, '').replace(/[−–—]/g, '-');
    return s === '' ? NaN : Number(s);
  }
  const num0 = x => { const n = amt(x); return Number.isFinite(n) ? n : 0; };
  const nice = x => { if (!(x > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; };
  const niceTop = x => { if (!(x > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return ([1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(k => m <= k + 1e-9) || 10) * p; };
  function ticksFor(lo, hi, n, lab) {
    const st = nice((hi - lo) / (n || 5)), out = [];
    for (let x = Math.ceil(lo / st - 1e-9) * st; x <= hi + 1e-9 * st; x += st) { const y = +(Math.abs(x) < st * 1e-9 ? 0 : x).toPrecision(12); out.push([y, lab ? lab(y) : sg(y, 4)]); }
    return out;
  }
  const scaleOf = m => (m >= 1e5 ? { d: 1e5, lab: '₹ lakh', w: v => sg(r2(v / 1e5)) + ' lakh' } : { d: 1, lab: '₹', w: v => sg(r2(v)) });

  /* ================================================================== 1. the operating cycle (SM §6, §6.1) */
  const STAGES = [
    { k: 'R', name: 'Raw material storage', base: 'raw material consumed', bal: 'raw material stock', lane: 'Raw material', col: 'a' },
    { k: 'W', name: 'Work-in-progress holding', base: 'cost of production', bal: 'work-in-progress', lane: 'Work-in-progress', col: 'b' },
    { k: 'F', name: 'Finished goods storage', base: 'cost of goods sold', bal: 'finished goods stock', lane: 'Finished goods', col: 'c' },
    { k: 'D', name: 'Receivables collection', base: 'credit sales', bal: 'receivables', lane: 'Receivables', col: 'e' },
    { k: 'C', name: 'Credit from suppliers', base: 'credit purchases', bal: 'payables', lane: 'Payables (credit)', col: 'f' }
  ];
  /** rows: [[name, opening, closing, annual base, days given], ×5]. Average = (opening + closing) ÷ 2, or the one balance given. o.round: whole days, cycles to 2 decimals */
  function cycle(o) {
    const yd = o.yearDays === 365 ? 365 : 360, rows = o.rows || [];
    if (rows.length !== 5) throw new Error('Keep the five stages in order: raw material, work-in-progress, finished goods, receivables, payables.');
    const st = STAGES.map((S, i) => {
      const r = rows[i], op = num0(r[1]), cl = num0(r[2]), base = num0(r[3]), given = num0(r[4]);
      if (op < 0 || cl < 0 || base < 0 || given < 0) throw new Error(`${S.name}: amounts and days cannot be negative.`);
      const avg = op && cl ? (op + cl) / 2 : op || cl;
      let days, how;
      if (given > 0) { days = given; how = 'given'; }
      else if (avg === 0) { days = 0; how = 'none'; }
      else { if (!(base > 0)) throw new Error(`${S.name}: give the annual ${S.base} (or the days directly).`); days = avg / (base / yd); how = 'computed'; }
      const shown = o.round && how === 'computed' ? Math.round(days + 1e-9) : days;
      return Object.assign({}, S, { op, cl, avg, annual: base, perDay: base / yd, exact: days, days: shown, how });
    });
    const [R, W, F, D, C] = st.map(s => s.days);
    const gross = R + W + F + D, net = gross - C;
    if (!(net > 0)) throw new Error('The net operating cycle must be positive (payables cannot outlast the whole cycle).');
    const exactCycles = yd / net, cycles = o.round ? r2(exactCycles) : exactCycles;
    const cost = num0(o.cost), wc = cost > 0 ? cost / cycles : 0;
    return { yd, stages: st, R, W, F, D, C, gross, net, cycles, exactCycles, cost, wc };
  }

  /* ================================================================== 2. the statement of working capital requirement (SM §6.2, §6.3) */
  const DIV = { months: 12, weeks: 52 };
  /** o: annual amounts {sales, credit %, materials, wages, mfg, dep, admin, selling}, periods in o.unit, basis 'total' | 'cash' | 'sales' */
  function estimate(o) {
    const yd = o.yearDays === 365 ? 365 : 360, per = DIV[o.unit] || yd, uw = o.unit === 'weeks' ? 'week' : o.unit === 'days' ? 'day' : 'month';
    const k = num0(o.units) || 1;
    const A = { sales: num0(o.sales) * k, mat: num0(o.materials) * k, wages: num0(o.wages) * k, mfg: num0(o.mfg) * k, dep: num0(o.dep) * k, admin: num0(o.admin) * k, sell: num0(o.selling) * k };
    Object.entries(A).forEach(([key, v]) => { if (v < 0) throw new Error('Amounts cannot be negative (' + key + ').'); });
    const P = {}; ['rm', 'wip', 'fg', 'dr', 'cr', 'wl', 'ml', 'al', 'sl', 'adv'].forEach(key => { P[key] = num0(o[key]); if (P[key] < 0) throw new Error('Periods cannot be negative.'); });
    const conv = o.conv == null ? 50 : num0(o.conv), credit = o.credit == null ? 100 : num0(o.credit), m = num0(o.margin);
    if (!(conv >= 0 && conv <= 100)) throw new Error('The stage of completion of WIP is a percentage from 0 to 100.');
    if (!(credit >= 0 && credit <= 100)) throw new Error('Credit sales are a percentage of sales from 0 to 100.');
    if (!(m >= 0 && m < 100)) throw new Error('The safety margin is a percentage from 0 to below 100.');
    const basis = o.basis === 'cash' ? 'cash' : o.basis === 'sales' ? 'sales' : 'total';
    const cashCOP = A.mat + A.wages + A.mfg, totCOP = cashCOP + A.dep;
    const cashCOS = cashCOP + A.admin + A.sell, totCOS = totCOP + A.admin + A.sell;
    if (basis === 'sales' && !(A.sales > 0)) throw new Error('Give the sales to value debtors at selling price.');
    const cop = basis === 'cash' ? cashCOP : totCOP;
    const debBase = basis === 'cash' ? cashCOS : basis === 'sales' ? A.sales : totCOS;
    const f = p => p / per;
    const wipConv = (A.wages + A.mfg + (basis === 'cash' ? 0 : A.dep)) * conv / 100;
    const CA = [
      { k: 'rm', lab: 'Raw materials', v: A.mat * f(P.rm), work: `${am(A.mat)} × ${grp(P.rm)}/${per}`, why: `${grp(P.rm)} ${uw}${P.rm === 1 ? '' : 's'} of raw material consumption (${inr(A.mat)} a year) sit in the store.` },
      { k: 'wip', lab: 'Work-in-progress', v: (A.mat + wipConv) * f(P.wip), work: `(${am(A.mat)} + ${grp(conv)}% × ${am(A.wages + A.mfg + (basis === 'cash' ? 0 : A.dep))}) × ${grp(P.wip)}/${per}`,
        why: `Each unit spends ${grp(P.wip)} ${uw}${P.wip === 1 ? '' : 's'} in process: materials are fed in at the start (100%), wages and overheads accrue as work proceeds, so on average only ${grp(conv)}% of them are in it.` },
      { k: 'fg', lab: 'Finished goods', v: cop * f(P.fg), work: `${am(cop)} × ${grp(P.fg)}/${per}`, why: `${grp(P.fg)} ${uw}${P.fg === 1 ? '' : 's'} of output wait in the warehouse, valued at ${basis === 'cash' ? 'cash cost of production (depreciation left out: it needs no funds)' : 'cost of production'} of ${inr(cop)} a year.` },
      { k: 'dr', lab: 'Receivables (debtors)', v: debBase * credit / 100 * f(P.dr), work: `${am(debBase)}${credit !== 100 ? ` × ${grp(credit)}%` : ''} × ${grp(P.dr)}/${per}`,
        why: basis === 'sales' ? `Debtors are taken at selling price (${inr(A.sales)} of sales a year)${credit !== 100 ? `, ${grp(credit)}% on credit` : ''}, for ${grp(P.dr)} ${uw}s of credit.`
          : `Customers take ${grp(P.dr)} ${uw}${P.dr === 1 ? '' : 's'} to pay. Funds are tied up only at ${basis === 'cash' ? 'cash' : ''} cost of sales (${inr(debBase)} a year), not at selling price: the profit in a debtor was never spent.` },
      { k: 'adv', lab: 'Prepaid expenses', v: A.sell * f(P.adv), work: `${am(A.sell)} × ${grp(P.adv)}/${per}`, why: `Selling expenses paid ${grp(P.adv)} ${uw}${P.adv === 1 ? '' : 's'} in advance are funds paid out before they are used.` },
      { k: 'cash', lab: 'Minimum cash balance', v: num0(o.cash), work: 'given', why: `${inr(num0(o.cash))} of cash is kept in hand at all times.` }
    ];
    const CL = [
      { k: 'cr', lab: 'Trade payables (creditors for materials)', v: A.mat * f(P.cr), work: `${am(A.mat)} × ${grp(P.cr)}/${per}`, why: `Suppliers give ${grp(P.cr)} ${uw}${P.cr === 1 ? '' : 's'} of credit on materials: that much of the investment is financed by them.` },
      { k: 'wl', lab: 'Wages payable', v: A.wages * f(P.wl), work: `${am(A.wages)} × ${grp(P.wl)}/${per}`, why: `Wages are paid ${grp(P.wl)} ${uw}${P.wl === 1 ? '' : 's'} in arrear, so that much is owed at any time.` },
      { k: 'ml', lab: 'Payables for overheads', v: A.mfg * f(P.ml), work: `${am(A.mfg)} × ${grp(P.ml)}/${per}`, why: `Cash overheads are paid ${grp(P.ml)} ${uw}${P.ml === 1 ? '' : 's'} late: another free source of funds.` },
      { k: 'al', lab: 'Administrative expenses payable', v: A.admin * f(P.al), work: `${am(A.admin)} × ${grp(P.al)}/${per}`, why: `Administrative expenses are paid ${grp(P.al)} ${uw}${P.al === 1 ? '' : 's'} in arrear.` },
      { k: 'sl', lab: 'Selling expenses payable', v: A.sell * f(P.sl), work: `${am(A.sell)} × ${grp(P.sl)}/${per}`, why: `Selling expenses are paid ${grp(P.sl)} ${uw}${P.sl === 1 ? '' : 's'} in arrear.` }
    ];
    const ca = CA.filter(x => x.v > 0 || x.k === 'rm' || x.k === 'fg' || x.k === 'dr'), cl = CL.filter(x => x.v > 0 || x.k === 'cr');
    const gca = ca.reduce((s, x) => s + x.v, 0), tcl = cl.reduce((s, x) => s + x.v, 0), nwc = gca - tcl;
    const marginAmt = o.marginOn === 'total' ? nwc * m / (100 - m) : nwc * m / 100, total = nwc + marginAmt;
    return { A, P, per, uw, basis, conv, credit, cashCOP, totCOP, cashCOS, totCOS, cop, debBase, ca, cl, gca, tcl, nwc, m, marginOn: o.marginOn === 'total' ? 'total' : 'nwc', marginAmt, total,
      currentRatio: tcl > 0 ? gca / tcl : NaN };
  }

  /* ================================================================== 3. credit policies (SM §19) */
  /** o: {policies: [[name, sales, days, bad debts, discount %, % taking]], bdAs: 'pct'|'amt', v (variable cost ratio), fixed, tax, k, kPre, yearDays, costBasis, xcred} */
  function credit(o) {
    const yd = o.yearDays === 365 ? 365 : 360, t = num0(o.tax) / 100, v = o.v, F = num0(o.fixed);
    if (!(v >= 0 && v < 1)) throw new Error('The variable cost must be below the selling price (a ratio from 0 to below 100% of sales).');
    if (!(t >= 0 && t < 1)) throw new Error('The tax rate must be at least 0% and below 100%.');
    const k0 = num0(o.k) / 100, k = o.kPre && t > 0 ? k0 * (1 - t) : k0, xc = num0(o.xcred);
    if (!(k0 >= 0)) throw new Error('The required rate of return cannot be negative.');
    const rows = Array.isArray(o.policies) ? o.policies : [];
    if (rows.length < 2) throw new Error('Give the present policy and at least one proposed policy.');
    if (rows.length > 5) throw new Error('Compare at most five policies (the present one and four proposals).');
    const P = rows.map((r, i) => {
      const name = String(r[0] == null ? '' : r[0]).trim() || (i ? 'Policy ' + 'ABCD'[i - 1] : 'Present');
      const S = num0(r[1]), days = num0(r[2]), bdIn = num0(r[3]), disc = num0(r[4]), take = num0(r[5]);
      if (!(S > 0)) throw new Error(`${name}: give the credit sales (more than zero).`);
      if (days < 0 || bdIn < 0 || disc < 0 || take < 0 || take > 100 || disc > 100) throw new Error(`${name}: days, bad debts and discounts cannot be negative (percentages up to 100).`);
      const VC = S * v, BD = o.bdAs === 'amt' ? bdIn : S * bdIn / 100, CD = S * take / 100 * disc / 100;
      const profit = S - VC - F - BD - CD, taxAmt = profit * t, pat = profit - taxAmt;
      const cost = o.costBasis === 'variable' ? VC : VC + F;
      const debtors = cost * days / yd;
      return { name, S, days, VC, F, BD, CD, profit, taxAmt, pat, cost, debtors, bdRate: BD / S };
    });
    if (new Set(P.map(p => p.name.toLowerCase())).size !== P.length) throw new Error('Give every policy a different name.');
    const p0 = P[0];
    P.forEach(p => {
      p.xcr = xc > 0 ? Math.max(0, p.VC - p0.VC) * xc / yd : 0;              // extra credit from suppliers on the additional variable cost (PYQ Sep 2024)
      p.invest = p.debtors - p.xcr; p.opp = p.invest * k; p.net = p.pat - p.opp;
      p.dSales = p.S - p0.S; p.dVC = p.VC - p0.VC; p.dBD = p.BD - p0.BD; p.dCD = p.CD - p0.CD; p.dProfit = p.profit - p0.profit; p.dPat = p.pat - p0.pat;
      p.dInvest = p.invest - p0.invest; p.dOpp = p.dInvest * k; p.dNet = p.dPat - p.dOpp; p.err = p.dInvest > 0 ? p.dProfit * (1 - t) / p.dInvest : NaN;
    });
    let best = 0; P.forEach((p, i) => { if (p.net > P[best].net + 1e-9) best = i; });
    const tie = P.filter(p => Math.abs(p.net - P[best].net) <= 1e-6).length > 1;
    return { yd, t, k, k0, v, F, P, best, tie, xc };
  }

  /* ================================================================== 4. cash models (SM §11) */
  /** Baumol: C = √(2UP ÷ S). U = disbursements for the period, P = cost per transfer, S = opportunity cost of ₹1 for the same period */
  function baumol(o) {
    const U = o.U, P = o.P, S = o.S;
    if (!(U > 0)) throw new Error('Give the cash disbursements for the period (more than zero).');
    if (!(P > 0)) throw new Error('Give the fixed cost per transfer (more than zero).');
    if (!(S > 0)) throw new Error('Give the opportunity cost (the yield on marketable securities, more than 0%).');
    const C = Math.sqrt(2 * U * P / S), carry = C / 2 * S, trans = U / C * P;
    return { U, P, S, C, avg: C / 2, n: U / C, carry, trans, total: carry + trans };
  }
  /** the disbursements implied by a known optimum: U = C² S ÷ 2P (PYQ Jan 2026 MCQ 7) */
  const baumolU = (C, P, S) => (C * C * S) / (2 * P);
  /** Miller-Orr, run on seeded daily net cash flows: at h, invest h − z; at the lower limit L, sell z − L of securities */
  function millerOrr(o) {
    const L = num0(o.low), z = num0(o.z), h = num0(o.h), days = Math.round(num0(o.days)), swing = num0(o.swing);
    if (!(h > z && z > L)) throw new Error('Miller-Orr needs the lower limit < the return point < the upper limit.');
    if (!(days >= 5 && days <= 365)) throw new Error('Run Miller-Orr for 5 to 365 days.');
    if (!(swing > 0)) throw new Error('Give the largest daily swing in cash (more than zero).');
    let s = (Math.round(num0(o.seed)) >>> 0) || 1;
    const rnd = () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let x = Math.imul(s ^ (s >>> 15), 1 | s); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
    let bal = num0(o.open) || z;
    if (bal > h || bal < L) bal = z;
    const path = [[0, bal]], events = [];
    for (let d = 1; d <= days; d++) {
      const flow = Math.round((rnd() * 2 - 1) * swing);
      let b = bal + flow;
      path.push([d, b]);
      if (b >= h) { events.push({ day: d, kind: 'invest', amount: b - z, from: b }); b = z; path.push([d, b]); }
      else if (b <= L) { events.push({ day: d, kind: 'sell', amount: z - b, from: b }); b = z; path.push([d, b]); }
      bal = b;
    }
    return { L, z, h, days, swing, path, events, end: bal, invests: events.filter(e => e.kind === 'invest').length, sells: events.filter(e => e.kind === 'sell').length };
  }

  /* ================================================================== compute: one function per mode */
  const yearOf = v => (+v.ydays === 365 ? 365 : 360);
  function computeCycle(v) {
    const Cy = cycle({ rows: v.stages, yearDays: yearOf(v), round: v.round !== false, cost: v.opcost });
    const yd = Cy.yd, mPct = num0(v.margin), mAmt = Cy.wc > 0 ? (v.marginOn === 'total' ? Cy.wc * mPct / (100 - mPct) : Cy.wc * mPct / 100) : 0;
    if (!(mPct >= 0 && mPct < 100)) throw new Error('The contingency margin is a percentage from 0 to below 100.');
    const dd = x => sg(r2(x));
    const totalDays = Cy.gross, step = totalDays > 150 ? 20 : totalDays > 80 ? 10 : 5, axMax = Math.ceil(Math.max(totalDays, Cy.C) / step) * step;
    const blocksUpTo = n => {
      const b = []; let t = 0;
      Cy.stages.slice(0, Math.min(n, 4)).forEach(s => { if (s.days > 0) b.push({ p: s.lane, from: t, to: t + s.days, label: `${s.k} ${dd(s.days)}` }); t += s.days; });
      if (n >= 5 && Cy.C > 0) b.push({ p: 'Payables (credit)', from: 0, to: Cy.C, label: `C ${dd(Cy.C)}` });
      if (n >= 6) b.push({ p: 'Cash tied up', from: Cy.C, to: Cy.gross, label: `net ${dd(Cy.net)} days` });
      return b;
    };
    const colors = { 'Raw material': 'a', 'Work-in-progress': 'b', 'Finished goods': 'c', Receivables: 'e', 'Payables (credit)': 'f', 'Cash tied up': 'd' };
    const gantt = (n, marks) => ({ type: 'gantt', title: 'The operating cycle in days', lanes: 'by-process', w: 640, blocks: blocksUpTo(n), axis: { min: 0, max: axMax, step }, colors, marks: marks || [] });
    const dayRows = Cy.stages.map(s => [`${s.name} (${s.k})`, s.how === 'given' ? 'given in the question' : s.how === 'none' ? 'none' :
      `avg ${s.bal} ÷ daily ${s.base} = ${am(s.avg)} ÷ (${am(s.annual)} ÷ ${yd})`, `${dd(s.days)} days${s.how === 'computed' && Math.abs(s.exact - s.days) > 1e-6 ? ` (${sg(r2(s.exact))})` : ''}`]);
    const dayT = n => ({ type: 'table', title: 'Days in each stage', head: ['Stage', 'Formula', 'Days'], rows: dayRows.slice(0, n), cells: n ? { [(n - 1) + ',2']: 'd' } : {}, align: ['left', 'left', 'right'] });
    const flowV = { type: 'flow', title: 'Cash goes round the operating cycle', nodes: [{ id: 'c', kind: 'start', label: 'Cash' }, { id: 'r', kind: 'process', label: 'Raw material' }, { id: 'w', kind: 'process', label: 'Work-in-progress' },
      { id: 'f', kind: 'process', label: 'Finished goods' }, { id: 'd', kind: 'process', label: 'Receivables' }], edges: [['c', 'r', 'buy (on credit)'], ['r', 'w', 'issue'], ['w', 'f', 'complete'], ['f', 'd', 'sell on credit'], ['d', 'c', 'collect']] };
    const frames = [{ caption: 'Cash is spent on raw material, which becomes work-in-progress, then finished goods, then receivables, and finally cash again. The **operating cycle** is how long that takes, less the credit suppliers allow: **R + W + F + D − C**.', view: [flowV] }];
    Cy.stages.forEach((s, i) => {
      const why = s.how === 'given' ? `The question gives it: **${s.k} = ${dd(s.days)} days**.` : s.how === 'none' ? `There is no ${s.bal}, so ${s.k} = 0.` :
        `${s.k} = average ${s.bal} ÷ ${s.base} per day = ${inr(s.avg)} ÷ ${inr(r2(s.perDay))} = **${dd(s.exact)} days**${Math.abs(s.exact - s.days) > 1e-6 ? `, taken as ${dd(s.days)}` : ''}.` + (s.op && s.cl ? ` The average is (opening ${am(s.op)} + closing ${am(s.cl)}) ÷ 2.` : '');
      const lead = ['Raw material waits in the store before it is issued.', 'Then it is in process.', 'Then the finished goods wait to be sold.', 'Then customers take time to pay.',
        'But suppliers wait too: their credit period is money the firm does not have to find.'][i];
      frames.push({ caption: `${lead} ${why}`, view: [gantt(i + 1), dayT(i + 1)] });
    });
    const marks = [{ t: Cy.C, label: 'pay' }, { t: Cy.gross, label: 'collect' }];
    frames.push({ caption: `**Net operating cycle = R + W + F + D − C = ${[Cy.R, Cy.W, Cy.F, Cy.D].map(dd).join(' + ')} − ${dd(Cy.C)} = ${dd(Cy.net)} days**: from paying the suppliers to collecting from customers, the firm's own funds are tied up for ${dd(Cy.net)} days.`, view: [gantt(6, marks), dayT(5)] });
    frames.push({ caption: `Number of operating cycles in a year = ${yd} ÷ ${dd(Cy.net)} = **${sg(r2(Cy.cycles))} times**${v.round !== false ? ' (rounded to two decimals, as ICAI does)' : ''}. A shorter cycle turns the same money over more often.`, view: [gantt(6, marks), dayT(5)] });
    if (Cy.wc > 0) {
      frames.push({ caption: `Working capital required = annual operating cost ÷ number of cycles = ${inr(Cy.cost)} ÷ ${sg(r2(Cy.cycles))} = **${inr(r2(Cy.wc))}**: each rupee of working capital is used ${sg(r2(Cy.cycles))} times a year.` +
        (mAmt > 0 ? ` Add the contingency of ${grp(mPct)}%${v.marginOn === 'total' ? ' of the final requirement (grossed up)' : ''}: ${inr(r2(mAmt))}, so the total is **${inr(r2(Cy.wc + mAmt))}**.` : ''), view: [gantt(6, marks), dayT(5)] });
    }
    const stats = [{ label: 'Net operating cycle', value: dd(Cy.net) + ' days', hint: 'R + W + F + D − C' }, { label: 'Gross operating cycle', value: dd(Cy.gross) + ' days', hint: 'R + W + F + D' },
      { label: 'Operating cycles a year', value: sg(r2(Cy.cycles)), hint: `${yd} ÷ net operating cycle` }];
    if (Cy.wc > 0) stats.push({ label: 'Working capital required', value: inr(r2(Cy.wc + mAmt)), hint: 'annual operating cost ÷ number of operating cycles' + (mAmt ? ', plus the contingency' : '') });
    return {
      frames, stats, table: { head: ['Stage', 'Average balance (₹)', 'Annual base (₹)', 'Days'], rows: Cy.stages.map(s => [`${s.name} (${s.k})`, s.how === 'given' ? '—' : am(s.avg), s.how === 'given' ? '—' : am(s.annual), dd(s.days)]).concat([['Net operating cycle', '', '', dd(Cy.net)]]) },
      note: `**Conventions.** Each stage = average balance ÷ (annual base ÷ ${yd}): raw material on consumption, WIP on cost of production, finished goods on cost of goods sold, receivables on credit sales, payables on credit purchases. The average is (opening + closing) ÷ 2, or the one balance given; days given in the question are used as they are. ` +
        (v.round !== false ? 'Each stage is rounded to whole days and the number of cycles to two decimals, as ICAI\'s answers do. ' : 'Nothing is rounded. ') + 'Working capital = annual operating cost ÷ number of operating cycles (the operating-cycle method).',
      sim: { mode: 'cycle', cy: Cy, margin: mAmt, total: Cy.wc + mAmt }
    };
  }

  function computeEstimate(v) {
    const E = estimate({ yearDays: yearOf(v), unit: v.pu, units: v.units, sales: v.sales, credit: v.credit, materials: v.materials, wages: v.wages, mfg: v.mfg, dep: v.dep, admin: v.admin, selling: v.selling,
      rm: v.rmP, wip: v.wipP, conv: v.conv, fg: v.fgP, dr: v.drP, cr: v.crP, wl: v.wageLag, ml: v.mfgLag, al: v.adminLag, sl: v.sellLag, adv: v.sellAdv, cash: v.cash, basis: v.basis, margin: v.margin, marginOn: v.marginOn });
    const bas = { total: 'total cost basis', cash: 'cash cost basis', sales: 'total cost basis, debtors at selling price' }[E.basis];
    const lines = [{ h: 'A. Current assets' }].concat(E.ca.map(x => Object.assign({ side: 'a' }, x)), [{ sub: 'Gross working capital (total current assets)', v: E.gca, k: 'gca' }, { h: 'B. Current liabilities' }],
      E.cl.map(x => Object.assign({ side: 'l' }, x)), [{ sub: 'Total current liabilities', v: E.tcl, k: 'tcl' }, { sub: 'Net working capital (A − B)', v: E.nwc, k: 'nwc' }]);
    if (E.m > 0) lines.push({ k: 'margin', lab: `Add: Safety margin @ ${grp(E.m)}%${E.marginOn === 'total' ? ' of the requirement' : ''}`, v: E.marginAmt, work: E.marginOn === 'total' ? `${am(E.nwc)} × ${grp(E.m)}/${grp(100 - E.m)}` : `${am(E.nwc)} × ${grp(E.m)}%` });
    lines.push({ sub: 'Working capital requirement', v: E.total, k: 'total', last: true });
    const rowOf = x => (x.h ? [`**${x.h}**`, '', ''] : x.sub ? [`**${x.sub}**`, '', am(x.v)] : [x.side === 'l' ? x.lab : x.lab, x.work === 'given' ? 'given' : x.work, am(x.v)]);
    const stmt = (n, blank) => {
      const L = lines.slice(0, n), rows = L.map(x => { const r = rowOf(x); return blank && !x.h ? [r[0], '', ''] : r; }), cells = {};
      L.forEach((x, i) => { if (x.sub) for (let c = 0; c < 3; c++) cells[i + ',' + c] = x.last ? 'b' : 'hl'; });
      if (!blank && n > 0 && !lines[n - 1].h) cells[(n - 1) + ',2'] = lines[n - 1].last ? 'b' : 'd';
      return { type: 'table', title: `Statement of working capital requirement (${bas})`, head: ['Particulars', 'Working (₹)', '₹'], rows, cells, align: ['left', 'left', 'right'] };
    };
    const frames = [{ caption: `Working capital is estimated item by item: what is tied up in each current asset, less what suppliers, workers and others finance by being paid later. This statement is on a **${bas}**.`, view: [stmt(1)] }];
    lines.forEach((x, i) => {
      if (i === 0) return;
      let cap;
      if (x.h) cap = 'Now the current liabilities: costs that are paid later than they are incurred finance part of the current assets.';
      else if (x.k === 'gca') cap = `Gross working capital = total current assets = **${inr(r2(E.gca))}**.`;
      else if (x.k === 'tcl') cap = `Total current liabilities = **${inr(r2(E.tcl))}**.` + (E.tcl > 0 ? ` Current ratio = ${am(E.gca)} ÷ ${am(E.tcl)} = ${sg(r2(E.currentRatio))}.` : '');
      else if (x.k === 'nwc') cap = `Net working capital = current assets − current liabilities = ${inr(r2(E.gca))} − ${inr(r2(E.tcl))} = **${inr(r2(E.nwc))}**.`;
      else if (x.k === 'margin') cap = E.marginOn === 'total' ? `The margin is ${grp(E.m)}% of the final requirement, so it is grossed up: NWC × ${grp(E.m)} ÷ ${grp(100 - E.m)} = ${inr(r2(E.marginAmt))}.` : `A safety margin of ${grp(E.m)}% of net working capital (${inr(r2(E.marginAmt))}) covers delays and estimating errors.`;
      else if (x.k === 'total') cap = `**Working capital requirement = ${inr(r2(E.total))}** on a ${bas}.`;
      else cap = `${x.lab}: ${x.why} ${x.work === 'given' ? '' : `${x.work} = **${inr(r2(x.v))}**.`}`;
      frames.push({ caption: cap.trim(), view: [stmt(i + 1)] });
    });
    /* the three bases side by side, when they differ */
    const alt = ['total', 'cash', 'sales'].map(b => estimate(Object.assign({}, { yearDays: yearOf(v), unit: v.pu, units: v.units, sales: v.sales, credit: v.credit, materials: v.materials, wages: v.wages, mfg: v.mfg, dep: v.dep, admin: v.admin, selling: v.selling,
      rm: v.rmP, wip: v.wipP, conv: v.conv, fg: v.fgP, dr: v.drP, cr: v.crP, wl: v.wageLag, ml: v.mfgLag, al: v.adminLag, sl: v.sellLag, adv: v.sellAdv, cash: v.cash, margin: v.margin, marginOn: v.marginOn }, { basis: b === 'sales' && !(E.A.sales > 0) ? 'total' : b })));
    const differ = alt.some(x => Math.abs(x.total - E.total) > 0.5);
    if (differ) {
      const cmp = { type: 'table', title: 'The same business on each basis', head: ['Basis', 'Finished goods', 'Debtors', 'Requirement'],
        rows: [['Total cost', am(alt[0].ca.find(x => x.k === 'fg').v), am(alt[0].ca.find(x => x.k === 'dr').v), am(alt[0].total)], ['Cash cost', am(alt[1].ca.find(x => x.k === 'fg').v), am(alt[1].ca.find(x => x.k === 'dr').v), am(alt[1].total)]]
          .concat(E.A.sales > 0 ? [['Debtors at selling price', am(alt[2].ca.find(x => x.k === 'fg').v), am(alt[2].ca.find(x => x.k === 'dr').v), am(alt[2].total)]] : []),
        cells: { [['total', 'cash', 'sales'].indexOf(E.basis) + ',3']: 'b' }, align: ['left', 'right', 'right', 'right'] };
      frames.push({ caption: `The basis changes only finished goods and debtors. Cash cost leaves out depreciation (no funds are needed for it) and debtors at selling price add the profit, so the cash-cost figure is the lowest and the sales-value figure the highest. This statement uses the **${bas}**.`, view: [stmt(lines.length), cmp] });
    }
    const stats = [{ label: 'Gross working capital', value: inr(r2(E.gca)), hint: 'total current assets' }, { label: 'Current liabilities', value: inr(r2(E.tcl)), hint: 'payables, wages and expenses outstanding' },
      { label: 'Net working capital', value: inr(r2(E.nwc)), hint: 'current assets − current liabilities' }, { label: 'Working capital requirement', value: inr(r2(E.total)), hint: E.m ? `net working capital + ${grp(E.m)}% safety margin` : 'net working capital' }];
    if (E.tcl > 0) stats.push({ label: 'Current ratio', value: sg(r2(E.currentRatio)), hint: 'current assets ÷ current liabilities' });
    return {
      frames, stats,
      table: { head: ['Item', 'Working (₹)', 'Amount (₹)'], rows: lines.filter(x => !x.h).map(x => [x.sub || x.lab, x.sub ? '' : x.work, am(x.v)]) },
      note: `**Conventions.** Amounts are annual (multiplied by the units when given per unit); a period of p ${E.uw}s holds p/${E.per} of the year's amount. WIP holds the full material cost and the stated percentage of wages and overheads. Finished goods are at cost of production and debtors at cost of sales (materials, wages, overheads, administration and selling), excluding depreciation on the cash-cost basis, or at selling price if chosen. Purchases are taken as equal to consumption (a regular cycle). The safety margin is a percentage of net working capital, or of the final requirement (grossed up) if chosen.`,
      sim: { mode: 'estimate', E, blank: stmt(lines.length, true) }
    };
  }

  function computeCredit(v) {
    const vr = v.vcBasis === 'unit' ? (amt(v.price) > 0 ? amt(v.vcu) / amt(v.price) : NaN) : num0(v.vcr) / 100;
    if (v.vcBasis === 'unit' && !(amt(v.price) > 0)) throw new Error('Give the selling price per unit (more than zero).');
    const Cr = credit({ policies: v.policies, bdAs: v.bdAs, v: vr, fixed: v.fixed, tax: v.tax, k: v.k, kPre: !!v.kPre, yearDays: yearOf(v), costBasis: v.costBasis, xcred: v.xcred });
    const P = Cr.P, n = P.length, inc = v.approach === 'incremental', hasCD = P.some(p => p.CD > 0), hasTax = Cr.t > 0, hasX = Cr.xc > 0, hasF = Cr.F > 0;
    const kTxt = `${sg(r2(Cr.k * 100))}%`;
    const R = [];
    if (!inc) {
      R.push({ lab: 'Credit sales', f: p => p.S, hl: 1 }, { lab: `Less: Variable costs (${sg(r2(Cr.v * 100))}% of sales)`, f: p => p.VC });
      if (hasF) R.push({ lab: 'Less: Fixed costs', f: p => p.F });
      R.push({ lab: 'Less: Bad debts', f: p => p.BD });
      if (hasCD) R.push({ lab: 'Less: Cash discount', f: p => p.CD });
      R.push({ lab: hasTax ? 'Expected profit before tax' : 'Expected profit', f: p => p.profit, hl: 1 });
      if (hasTax) R.push({ lab: `Less: Tax @ ${grp(Cr.t * 100)}%`, f: p => p.taxAmt }, { lab: 'Expected profit after tax', f: p => p.pat, hl: 1 });
      R.push({ lab: `Cost of credit sales (${v.costBasis === 'variable' ? 'variable cost' : 'variable + fixed'})`, f: p => p.cost }, { lab: 'Collection period (days)', f: p => p.days, n: true },
        { lab: `Investment in receivables (cost × days ÷ ${Cr.yd})`, f: p => p.debtors });
      if (hasX) R.push({ lab: `Less: Extra creditors (${grp(Cr.xc)} days on the additional variable cost)`, f: p => p.xcr }, { lab: 'Net investment in receivables', f: p => p.invest });
      R.push({ lab: `Less: Opportunity cost @ ${kTxt}`, f: p => p.opp }, { lab: 'Net benefit', f: p => p.net, hl: 2 });
    } else {
      R.push({ lab: 'Incremental credit sales', f: (p, i) => (i ? p.dSales : null) }, { lab: 'Less: Incremental variable costs', f: (p, i) => (i ? p.dVC : null) },
        { lab: 'Less: Incremental bad debts', f: (p, i) => (i ? p.dBD : null) });
      if (hasCD) R.push({ lab: 'Less: Incremental cash discount', f: (p, i) => (i ? p.dCD : null) });
      R.push({ lab: hasTax ? 'Incremental profit before tax' : 'Incremental expected profit', f: (p, i) => (i ? p.dProfit : null), hl: 1 });
      if (hasTax) R.push({ lab: 'Incremental profit after tax', f: (p, i) => (i ? p.dPat : null), hl: 1 });
      R.push({ lab: `Investment in receivables (cost × days ÷ ${Cr.yd}${hasX ? ' − extra creditors' : ''})`, f: p => p.invest }, { lab: 'Incremental investment', f: (p, i) => (i ? p.dInvest : null) },
        { lab: `Required return @ ${kTxt}`, f: (p, i) => (i ? p.dOpp : null) }, { lab: 'Incremental net benefit', f: (p, i) => (i ? p.dNet : null), hl: 2 });
    }
    const cellOf = (r, p, i) => { const x = r.f(p, i); return x == null ? '—' : r.n ? grp(x) : am(x); };
    const tbl = (cols, blank) => {
      const head = ['Particulars'].concat(P.map(p => p.name));
      const rows = R.map(r => [r.hl ? `**${r.lab}**` : r.lab].concat(P.map((p, i) => (i < cols && !blank ? cellOf(r, p, i) : ''))));
      const cells = {};
      R.forEach((r, ri) => { if (r.hl) for (let c = 0; c <= n; c++) cells[ri + ',' + c] = r.hl === 2 ? 'b' : 'hl'; });
      if (!blank && cols > 0) for (let ri = 0; ri < R.length; ri++) if (!R[ri].hl) cells[ri + ',' + cols] = 'd';
      return { type: 'table', title: `Evaluation of credit policies (${inc ? 'incremental' : 'total'} approach)`, head, rows, cells, align: ['left'].concat(P.map(() => 'right')) };
    };
    /* the decision in one picture: each proposal's net benefit over the present policy (= its incremental net benefit, either approach) */
    const sc = scaleOf(Math.max(1, ...P.map(p => Math.abs(p.dNet)))), vals = P.map(p => p.dNet / sc.d);
    const lo = Math.min(0, ...vals), hi = Math.max(0, ...vals), pad = (hi - lo) * 0.18 || 1;
    const bars = (cols, mark) => ({ type: 'plot', title: `Gain over ${P[0].name} (net benefit minus its net benefit)`, h: 230, legend: 'none', x: [0.4, n - 0.4], y: [lo < 0 ? lo - pad : 0, hi + pad], ylabel: sc.lab,
      xticks: P.slice(1).map((p, i) => [i + 1, p.name]), yticks: ticksFor(lo < 0 ? lo - pad : 0, hi + pad, 4),
      series: P.slice(1, Math.max(1, cols)).map((p, j) => { const i = j + 1; return { label: p.name, bars: true, values: true, bw: 0.55, color: mark && i === Cr.best ? 'ok' : vals[i] < 0 ? 'bad' : 'abcdefgh'[j], pts: [[i, vals[i], sg(r2(vals[i]))]] }; }) });
    const given = { type: 'table', title: 'The policies', head: ['Policy', 'Credit sales (₹)', 'Collection days', 'Bad debts'].concat(hasCD ? ['Cash discount'] : []),
      rows: P.map(p => [p.name, am(p.S), grp(p.days), v.bdAs === 'amt' ? am(p.BD) : pct(p.bdRate * 100)].concat(hasCD ? [p.CD ? `${grp(num0((v.policies[P.indexOf(p)] || [])[4]))}% for ${grp(num0((v.policies[P.indexOf(p)] || [])[5]))}%` : '—'] : [])),
      align: ['left', 'right', 'right', 'right', 'right'] };
    const frames = [{ caption: `A longer credit period brings more sales, but also more bad debts and more money locked in receivables. Each policy is judged by ${inc ? 'the extra profit it adds against the return required on the extra investment in receivables' : 'its expected profit less the opportunity cost of the funds tied up in its receivables'}.`, view: [given] }];
    P.forEach((p, i) => {
      let cap;
      if (!inc) cap = `**${p.name}** (${grp(p.days)} days): sales ${inr(p.S)}, contribution ${inr(r2(p.S - p.VC))}, bad debts ${inr(r2(p.BD))}${p.CD ? `, discount ${inr(r2(p.CD))}` : ''} → profit ${hasTax ? 'after tax ' : ''}${inr(r2(p.pat))}. ` +
        `Receivables tie up ${inr(r2(p.cost))} × ${grp(p.days)}/${Cr.yd}${p.xcr ? ` − ${inr(r2(p.xcr))} of extra supplier credit` : ''} = ${inr(r2(p.invest))}, costing ${kTxt}: ${inr(r2(p.opp))}. **Net benefit ${inr(r2(p.net))}.**`;
      else if (!i) cap = `The present policy is the base: ${inr(r2(p.invest))} is already invested in receivables. Each proposal is measured by what it adds.`;
      else cap = `**${p.name}**: extra sales ${inr(r2(p.dSales))} add a profit of ${inr(r2(hasTax ? p.dPat : p.dProfit))}${hasTax ? ' after tax' : ''}, but need ${inr(r2(p.dInvest))} more in receivables, which must earn ${kTxt} = ${inr(r2(p.dOpp))}. **Incremental net benefit ${inr(r2(p.dNet))}**` +
        (p.dInvest > 0 ? ` (expected return on the extra investment ${pct(p.err * 100)} against ${kTxt} required).` : '.');
      frames.push({ caption: cap, view: [tbl(i + 1), bars(i + 1)] });
    });
    const B = P[Cr.best];
    const rec = Cr.tie ? 'Two policies tie on net benefit; either may be adopted on these figures.' : Cr.best === 0 ? `**Keep the present policy**: no proposal adds to the net benefit${inc ? ' (every incremental net benefit is negative)' : ''}.`
      : `**Adopt ${B.name}**: its net benefit ${inr(r2(B.net))} is the highest, ${inr(r2(B.net - P[0].net))} more than the present policy` + (inc ? ' (the largest incremental net benefit).' : '.');
    frames.push({ caption: rec + ' The total and the incremental approach always pick the same policy: an incremental net benefit is just the difference of two net benefits.', view: [bars(n, true), tbl(n)] });
    const stats = [{ label: 'Best policy', value: Cr.tie ? 'tie' : B.name, hint: 'the highest net benefit' }, { label: `Net benefit, ${B.name}`, value: inr(r2(B.net)), hint: 'profit after tax − opportunity cost of the investment in receivables' },
      { label: `Gain over ${P[0].name}`, value: inr(r2(B.net - P[0].net)), hint: 'incremental net benefit' }, { label: 'Opportunity cost rate', value: kTxt, hint: v.kPre && Cr.t > 0 ? 'pre-tax rate × (1 − t)' : 'required rate of return' }];
    return {
      frames, stats, table: { head: ['Particulars'].concat(P.map(p => p.name)), rows: R.map(r => [r.lab].concat(P.map((p, i) => cellOf(r, p, i)))) },
      note: `**Conventions.** Variable cost is a fixed share of sales and the fixed cost is the same under every policy. Bad debts and cash discount are worked on each policy's own credit sales. The investment in receivables = cost of credit sales (${v.costBasis === 'variable' ? 'variable cost only' : 'variable plus fixed cost'}) × collection days ÷ ${Cr.yd}, as in the Study Material; its opportunity cost uses ${v.kPre && Cr.t > 0 ? 'the pre-tax rate × (1 − t)' : 'the required rate as given'}.` +
        (hasX ? ` Extra credit from suppliers (${grp(Cr.xc)} days) is taken on the additional variable cost only.` : ''),
      sim: { mode: 'credit', cr: Cr, blankGiven: given }
    };
  }

  function computeCash(v) {
    const per = v.period === 'month' ? 'month' : 'year';
    const S = num0(v.yield) / 100 / (per === 'month' ? 12 : 1), P = num0(v.tcost);
    let U = num0(v.disb), fromC = v.find === 'u';
    if (fromC) { const Cg = num0(v.cstar); if (!(Cg > 0)) throw new Error('Give the optimum cash balance (more than zero).'); if (!(P > 0) || !(S > 0)) throw new Error('Give the cost per transfer and the yield (more than zero).'); U = baumolU(Cg, P, S); }
    const B = baumol({ U, P, S });
    const sc = scaleOf(B.C * 3), xm = niceTop(B.C * 2.6 / sc.d) * sc.d, top = Math.max(B.carry * 2.6, B.total * 1.6);
    const ysc = scaleOf(top), ym = niceTop(top / ysc.d) * ysc.d;
    const fx = (fn) => { const pts = []; for (let i = 1; i <= 120; i++) { const c = xm * (i / 120); pts.push([c / sc.d, fn(c) / ysc.d]); } return pts; };
    const plot = (n, mark) => {
      const series = [{ label: 'transaction cost', pts: fx(c => U / c * P), color: 'a' }, { label: 'carrying cost', pts: fx(c => c / 2 * S), color: 'c' }, { label: 'total cost', pts: fx(c => U / c * P + c / 2 * S), color: 'd' }].slice(0, n);
      const points = mark ? [{ x: B.C / sc.d, y: B.total / ysc.d, label: `optimum ${inr(r2(B.C))}`, pos: 'above', color: 'd' }, { x: B.C / sc.d, y: B.carry / ysc.d, color: 'mute' }] : [];
      if (mark) series.push({ label: 'C*', pts: [[B.C / sc.d, 0], [B.C / sc.d, ym / ysc.d]], color: 'mute', dash: true, legend: false });
      return { type: 'plot', title: `Baumol: the cost of holding cash (per ${per})`, x: [0, xm / sc.d], y: [0, ym / ysc.d], xlabel: `cash balance C (${sc.lab})`, ylabel: `cost (${ysc.lab})`, clip: true, legend: 'top-right', h: 280,
        xticks: ticksFor(0, xm / sc.d, 5), yticks: ticksFor(0, ym / ysc.d, 5), series, points };
    };
    const fT = (n) => ({ type: 'table', title: 'Baumol\'s model', head: ['Quantity', 'Formula', 'Value'], align: ['left', 'left', 'right'], cells: { [(n - 1) + ',2']: 'd' },
      rows: [['Optimum cash balance C*', `√(2UP ÷ S) = √(2 × ${am(U)} × ${am(P)} ÷ ${sg(+(S).toPrecision(6))})`, inr(r2(B.C))], ['Transfers a ' + per, `U ÷ C* = ${am(U)} ÷ ${am(r2(B.C))}`, sg(r2(B.n))],
        ['Average cash balance', 'C* ÷ 2', inr(r2(B.avg))], ['Total cost at C*', 'U ÷ C* × P + C* ÷ 2 × S', inr(r2(B.total))]].slice(0, n) });
    const frames = [
      { caption: `${fromC ? `Working back from an optimum of ${inr(num0(v.cstar))}: U = C*² × S ÷ 2P = **${inr(r2(U))}** a ${per}. ` : ''}Each transfer from marketable securities into cash costs ${inr(P)}, so a small balance means many transfers: the **transaction cost** U ÷ C × P falls as C grows.`, view: [plot(1)] },
      { caption: `Cash held earns nothing: the **carrying cost** is the yield given up on the average balance, C ÷ 2 × S (${sg(r2(num0(v.yield)))}% a year), and it rises in a straight line.`, view: [plot(2)] },
      { caption: 'The **total cost** is their sum. It is lowest where the two costs are equal.', view: [plot(3)] },
      { caption: `**Optimum cash balance C* = √(2UP ÷ S) = ${inr(r2(B.C))}**: there the transaction cost and the carrying cost are both ${inr(r2(B.carry))}. The firm transfers ${inr(r2(B.C))} at a time, ${sg(r2(B.n))} times a ${per}.`, view: [plot(3, true), fT(4)] }
    ];
    let M = null;
    if (v.mo !== false) {
      M = millerOrr({ low: v.moLow, z: v.moZ, h: v.moH, days: v.moDays, swing: v.moSwing, seed: v.moSeed, open: v.moZ });
      const msc = scaleOf(M.h * 1.2), yTop = M.h + (M.h - M.L) * 0.12, yBot = M.L - (M.h - M.L) * 0.12;
      const steps = Math.min(30, M.days), cut = k => Math.round(M.days * k / steps);
      const moPlot = (upto) => ({ type: 'plot', title: 'Miller-Orr: control limits on a random cash balance (illustrative)', x: [0, M.days], y: [yBot / msc.d, yTop / msc.d], xlabel: 'day', ylabel: `cash (${msc.lab})`, legend: 'none', clip: true, h: 280,
        xticks: ticksFor(0, M.days, 6, d => grp(d)), yticks: [[M.L / msc.d, `L ${msc.w(M.L)}`], [M.z / msc.d, `z ${msc.w(M.z)}`], [M.h / msc.d, `h ${msc.w(M.h)}`]],
        series: [{ label: 'upper limit h', pts: [[0, M.h / msc.d], [M.days, M.h / msc.d]], color: 'bad', dash: true }, { label: 'return point z', pts: [[0, M.z / msc.d], [M.days, M.z / msc.d]], color: 'mute', dash: true },
          { label: 'lower limit', pts: [[0, M.L / msc.d], [M.days, M.L / msc.d]], color: 'bad', dash: true }, { label: 'cash balance', pts: M.path.filter(p => p[0] <= upto).map(p => [p[0], p[1] / msc.d]), color: 'a' }],
        points: M.events.filter(e => e.day <= upto).map(e => ({ x: e.day, y: e.from / msc.d, color: e.kind === 'invest' ? 'c' : 'e' })) });
      frames.push({ caption: `When cash flows are not predictable, **Miller-Orr** sets control limits instead: an upper limit h (${inr(M.h)}), a return point z (${inr(M.z)}) and a lower limit (${inr(M.L)}). The daily flows here are made up, to show the rule at work.`, view: [moPlot(0)] });
      let prev = 0;
      for (let s = 1; s <= steps; s++) {
        const d = cut(s); if (d <= prev) continue;
        const ev = M.events.filter(e => e.day > prev && e.day <= d);
        const msg = ev.length ? ev.map(e => (e.kind === 'invest' ? `day ${e.day}: cash hits the upper limit, so ${inr(e.amount)} (h − z) goes into marketable securities` : `day ${e.day}: cash touches the lower limit, so ${inr(e.amount)} of securities are sold to bring it back to z`)).join('; ') + '.'
          : `Days ${prev + 1}–${d}: the balance wanders between the limits, so no transfer is made.`;
        frames.push({ caption: msg.charAt(0).toUpperCase() + msg.slice(1), view: [moPlot(d)] });
        prev = d;
      }
      frames[frames.length - 1].caption += ` Over ${M.days} days: ${M.invests} purchase${M.invests === 1 ? '' : 's'} and ${M.sells} sale${M.sells === 1 ? '' : 's'} of securities; between the limits no transaction is made.`;
    }
    const stats = [{ label: 'Optimum cash balance (Baumol)', value: inr(r2(B.C)), hint: '√(2UP ÷ S)' }, { label: 'Transfers a ' + per, value: sg(r2(B.n)), hint: 'U ÷ C*' }, { label: 'Average cash balance', value: inr(r2(B.avg)), hint: 'C* ÷ 2' },
      { label: 'Total cost at the optimum', value: inr(r2(B.total)), hint: 'transaction cost + carrying cost' }];
    if (fromC) stats.unshift({ label: `Disbursements a ${per}`, value: inr(r2(U)), hint: 'C*² × S ÷ 2P' });
    return {
      frames, stats, table: { head: ['Quantity', 'Value'], rows: [[`Disbursements U (a ${per})`, am(U)], ['Cost per transfer P', am(P)], [`Opportunity cost S (per ${per})`, sg(+(S * 100).toPrecision(6)) + '%'], ['Optimum C*', am(r2(B.C))], ['Transaction cost', am(r2(B.trans))], ['Carrying cost', am(r2(B.carry))]] },
      note: `**Conventions.** Baumol's model as in the Study Material: C = √(2UP ÷ S) with U, P and S for the same period; the carrying cost is on the average balance C ÷ 2 and the transaction cost is U ÷ C transfers × P. The Study Material states the Miller-Orr rule (invest h − z at the upper limit, sell securities back to z at the lower limit) without a formula for the limits, so the limits are inputs and the daily flows are made up from a seed.`,
      sim: { mode: 'cash', B, U, M, fromC }
    };
  }

  function compute(v) {
    if (v.mode === 'estimate') return computeEstimate(v);
    if (v.mode === 'credit') return computeCredit(v);
    if (v.mode === 'cash') return computeCash(v);
    return computeCycle(v);
  }

  /* ================================================================== presets */
  const CYC = { mode: 'cycle', ydays: 360, round: true, margin: 0, marginOn: 'nwc', opcost: 0 };
  const EST = { mode: 'estimate', ydays: 360, pu: 'months', units: 1, credit: 100, dep: 0, admin: 0, selling: 0, rmP: 0, wipP: 0, conv: 50, fgP: 0, drP: 0, crP: 0, wageLag: 0, mfgLag: 0, adminLag: 0, sellLag: 0, sellAdv: 0, cash: 0, basis: 'total', margin: 0, marginOn: 'nwc' };
  const CRD = { mode: 'credit', ydays: 360, bdAs: 'pct', vcBasis: 'pct', fixed: 0, tax: 0, kPre: false, costBasis: 'total', xcred: 0, approach: 'total' };
  const stg = (r, w, f, d, c) => [['Raw material', ...r], ['Work-in-progress', ...w], ['Finished goods', ...f], ['Receivables', ...d], ['Payables', ...c]];
  const presets = [
    { label: 'Tapri Tea Co.: the premix factory\'s operating cycle', values: Object.assign({}, CYC, { opcost: 20000000,
      stages: stg([1000000, 1400000, 14400000, 0], [250000, 350000, 18000000, 0], [1400000, 1600000, 18000000, 0], [2400000, 2600000, 22500000, 0], [500000, 700000, 14400000, 0]) }) },
    { label: 'Study Material Illustration 2: XYZ Ltd\'s net operating cycle', values: Object.assign({}, CYC, { stages: stg([50000, 0, 600000, 0], [30000, 0, 500000, 0], [40000, 0, 800000, 0], [0, 0, 0, 45], [0, 0, 0, 30]) }) },
    { label: 'PYQ Sep 2024, Q1(b): SK Ltd\'s working capital by the operating cycle method', values: Object.assign({}, CYC, { opcost: 1461000 + 414000,
      stages: stg([0, 0, 0, 65], [94600, 0, 1548000, 0], [243500, 0, 1461000, 0], [0, 0, 0, 36], [0, 0, 0, 63]) }) },
    { label: 'MTP Sep 2025 (Series I), Q1(c): Wint Ltd, with a 10% contingency (₹ lakh)', values: Object.assign({}, CYC, { ydays: 365, opcost: 4225, margin: 10,
      stages: stg([585, 845, 4940, 0], [455, 663, 5850, 0], [780, 910, 6825, 0], [1456, 1755, 7605, 0], [884, 923, 5200, 0]) }) },
    { label: 'Study Material Illustration 3: Naureen Ltd\'s working capital forecast', values: Object.assign({}, EST, { sales: 300000, materials: 180000, wages: 30000, mfg: 60000, rmP: 2, wipP: 1, conv: 50, fgP: 3, drP: 3, crP: 2, wageLag: 1, mfgLag: 1, cash: 20000, basis: 'total' }) },
    { label: 'Study Material Illustration 4: XYZ Co. on cash cost basis, 20% safety margin', values: Object.assign({}, EST, { sales: 3600000, materials: 900000, wages: 720000, mfg: 960000, dep: 120000, admin: 240000, selling: 120000,
      rmP: 1, fgP: 1, drP: 2, crP: 2, wageLag: 1, mfgLag: 1, adminLag: 1, sellAdv: 3, cash: 100000, basis: 'cash', margin: 20 }) },
    { label: 'RTP Jan 2026, Q1 (also MTP May 2024 Series II): PPW Ltd on cash cost basis, 15% margin', values: Object.assign({}, EST, { sales: 4800000, materials: 1200000, wages: 960000, mfg: 1200000, admin: 360000, selling: 120000,
      rmP: 2, fgP: 2, drP: 3, crP: 2, wageLag: 1, mfgLag: 1, adminLag: 1, sellAdv: 1, cash: 100000, basis: 'cash', margin: 15 }) },
    { label: 'Tapri Tea Co.: samosa factory, 52-week year, per-unit costs', values: Object.assign({}, EST, { pu: 'weeks', units: 520000, sales: 25, materials: 8, wages: 4, mfg: 5, dep: 1, admin: 1, selling: 1,
      rmP: 4, wipP: 2, conv: 50, fgP: 3, drP: 6, crP: 5, wageLag: 1, mfgLag: 2, adminLag: 2, sellLag: 2, cash: 200000, credit: 80, basis: 'cash', margin: 10 }) },
    { label: 'Study Material Illustration 12: four longer credit periods', values: Object.assign({}, CRD, { vcBasis: 'unit', price: 3, vcu: 2, fixed: 50000, k: 20,
      policies: [['Present', 600000, 30, 1, 0, 0], ['A', 630000, 40, 1.5, 0, 0], ['B', 648000, 50, 2, 0, 0], ['C', 675000, 60, 3, 0, 0], ['D', 690000, 75, 4, 0, 0]] }) },
    { label: 'PYQ Sep 2024, Q3(a): AB Enterprises, with extra supplier credit', values: Object.assign({}, CRD, { vcBasis: 'unit', price: 100, vcu: 50, fixed: 500000, k: 20, xcred: 15,
      policies: [['Present', 3000000, 30, 0, 0, 0], ['A', 3300000, 45, 1, 0, 0], ['B', 3500000, 60, 3.5, 0, 0]] }) },
    { label: 'MTP May 2025 (Series I), Q2(b): ABC Pvt. Ltd\'s two proposals', values: Object.assign({}, CRD, { vcr: 70, k: 20, bdAs: 'amt',
      policies: [['Present', 5000000, 90, 150000, 0, 0], ['Policy 1', 6000000, 120, 300000, 0, 0], ['Policy 2', 6750000, 150, 450000, 0, 0]] }) },
    { label: 'Study Material Illustration 14: a bigger cash discount, with tax', values: Object.assign({}, CRD, { vcr: 78, k: 15, kPre: true, tax: 30, costBasis: 'variable',
      policies: [['Present', 1200000, 30, 1.5, 1, 50], ['Proposed', 1600000, 20, 2, 2, 80]] }) },
    { label: 'Tapri Tea Co.: Dev tests 45 and 60 days for café franchisees (incremental)', values: Object.assign({}, CRD, { vcr: 60, fixed: 1500000, k: 18, tax: 25, approach: 'incremental',
      policies: [['30 days', 12000000, 30, 1, 0, 0], ['45 days', 13500000, 45, 1.5, 0, 0], ['60 days', 14400000, 60, 2.5, 0, 0]] }) },
    { label: 'Study Material Illustration 10: Baumol\'s optimum cash balance', values: { mode: 'cash', find: 'c', period: 'year', disb: 1260000, tcost: 20, yield: 8, mo: true, moLow: 0, moZ: 25000, moH: 75000, moDays: 60, moSwing: 9000, moSeed: 36 } },
    { label: 'PYQ Jan 2026, MCQ 7: the disbursements behind an optimum of ₹30,000', values: { mode: 'cash', find: 'u', period: 'year', cstar: 30000, tcost: 25, yield: 10, mo: false, moLow: 0, moZ: 30000, moH: 90000, moDays: 60, moSwing: 10000, moSeed: 3 } },
    { label: 'RTP Jan 2025, Q1(i): ₹1.5 lakh a month, ₹20 a transfer, 12% yield', values: { mode: 'cash', find: 'c', period: 'year', disb: 1800000, tcost: 20, yield: 12, mo: true, moLow: 0, moZ: 25000, moH: 75000, moDays: 60, moSwing: 8000, moSeed: 63 } }
  ];

  /* ================================================================== the challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  function gen(r) {
    const out = { firm: '' };
    /* cycle: stage days that come out whole */
    const days = [pick(r, [15, 20, 30, 45, 60]), pick(r, [5, 10, 12, 15, 20]), pick(r, [10, 15, 20, 30, 45]), pick(r, [30, 36, 40, 45, 60, 75]), pick(r, [15, 20, 30, 45])];
    const bases = days.map(() => pick(r, [36, 72, 90, 108, 144, 180, 360]) * 1e5);
    out.stages = STAGES.map((S, i) => [S.lane, Math.round(bases[i] / 360 * days[i]), 0, bases[i], 0]);
    out.ydays = 360; out.round = true; out.opcost = pick(r, [0, 90, 120, 180, 240]) * 1e5; out.margin = pick(r, [0, 0, 10, 15, 20]); out.marginOn = 'nwc';   // the margin serves both the cycle and the estimate
    out.askCyc = pick(r, ['net', 'net', 'stage', 'cycles'].concat(out.opcost ? ['wc'] : [])); out.askStage = Math.floor(r() * 4);
    /* estimate: round annual amounts and whole months */
    const sales = pick(r, [60, 120, 180, 240, 360]) * 1e5;
    Object.assign(out, { pu: 'months', units: 1, sales, credit: pick(r, [100, 100, 80]), materials: sales * pick(r, [0.3, 0.4, 0.5]), wages: sales * pick(r, [0.1, 0.15, 0.2]), mfg: sales * pick(r, [0.1, 0.15]), dep: sales * pick(r, [0, 0.05]),
      admin: sales * pick(r, [0, 0.05]), selling: sales * pick(r, [0, 0.025, 0.05]), rmP: pick(r, [1, 2, 3]), wipP: pick(r, [0, 0.5, 1]), conv: 50, fgP: pick(r, [1, 2]), drP: pick(r, [1, 2, 3]), crP: pick(r, [1, 2]),
      wageLag: pick(r, [0.5, 1]), mfgLag: pick(r, [0, 1]), adminLag: pick(r, [0, 1]), sellLag: 0, sellAdv: pick(r, [0, 1, 3]), cash: pick(r, [1, 2, 5]) * 1e5, basis: pick(r, ['total', 'cash', 'cash']) });
    out.askEst = pick(r, ['total', 'total', 'gca', 'dr', 'fg', 'nwc']);
    /* credit: three policies, round figures */
    const s0 = pick(r, [30, 40, 50, 60, 100]) * 1e5, d0 = pick(r, [30, 45, 60]);
    out.policies = [['Present', s0, d0, pick(r, [0, 1, 1.5, 2]), 0, 0], ['A', s0 * pick(r, [1.08, 1.1, 1.15]), d0 + pick(r, [15, 30]), pick(r, [2, 2.5, 3]), 0, 0], ['B', s0 * pick(r, [1.2, 1.25, 1.3]), d0 + pick(r, [45, 60]), pick(r, [3.5, 4, 5]), 0, 0]];
    Object.assign(out, { bdAs: 'pct', vcBasis: 'pct', vcr: pick(r, [50, 60, 70, 75]), fixed: pick(r, [0, 0, 5, 10]) * 1e5, tax: pick(r, [0, 0, 25, 30]), k: pick(r, [10, 12, 15, 20, 25]), kPre: false, costBasis: pick(r, ['total', 'variable']), xcred: 0,
      approach: pick(r, ['total', 'incremental']), askCrd: pick(r, ['best', 'best', 'net', 'opp']), askPol: 1 + Math.floor(r() * 2) });
    /* cash: an optimum that comes out whole */
    const C = pick(r, [10, 12, 15, 20, 24, 25, 30, 40, 50]) * 1000, S = pick(r, [5, 8, 10, 12, 15, 20]), P = pick(r, [10, 20, 25, 40, 50]);
    Object.assign(out, { period: 'year', find: r() < 0.3 ? 'u' : 'c', tcost: P, yield: S, disb: C * C * (S / 100) / (2 * P), cstar: C, mo: false, moLow: 0, moZ: 25000, moH: 75000, moDays: 60, moSwing: 9000, moSeed: 5, askCash: pick(r, ['c', 'c', 'n', 'tc']) });
    return out;
  }
  const askEstOf = v => v.askEst || 'total';
  function solve(res, v) {
    const s = res.sim;
    if (s.mode === 'cycle') { const a = v.askCyc || 'net', C = s.cy; return a === 'stage' ? C.stages[v.askStage || 0].days : a === 'cycles' ? C.cycles : a === 'wc' ? s.total / 1e5 : C.net; }
    if (s.mode === 'estimate') { const E = s.E, a = askEstOf(v); const it = k => (E.ca.find(x => x.k === k) || {}).v || 0; return (a === 'gca' ? E.gca : a === 'nwc' ? E.nwc : a === 'dr' ? it('dr') : a === 'fg' ? it('fg') : E.total) / 1e5; }
    if (s.mode === 'credit') { const a = v.askCrd || 'best', P = s.cr.P, p = P[Math.min(v.askPol || 1, P.length - 1)]; if (a === 'best' && s.cr.tie) return null; return a === 'best' ? P[s.cr.best].name : a === 'opp' ? p.opp / 1e5 : (v.approach === 'incremental' ? p.dNet : p.net) / 1e5; }
    const a = v.askCash || 'c', B = s.B;
    if (s.fromC) return a === 'n' ? B.n : a === 'tc' ? B.total : s.U;
    return a === 'n' ? B.n : a === 'tc' ? B.total : B.C;
  }
  function prompt(v, res) {
    const s = res && res.sim;
    if (v.mode === 'estimate') {
      const E = s.E, P = E.P, mo = x => `${grp(x)} month${x === 1 ? '' : 's'}`;
      const costs = `Annual sales ₹${grp(E.A.sales)}${E.credit !== 100 ? ` (${grp(E.credit)}% on credit)` : ''}; materials ₹${grp(E.A.mat)}, wages ₹${grp(E.A.wages)}, cash manufacturing overheads ₹${grp(E.A.mfg)}` +
        `${E.A.dep ? `, depreciation ₹${grp(E.A.dep)}` : ''}${E.A.admin ? `, administration ₹${grp(E.A.admin)}` : ''}${E.A.sell ? `, selling ₹${grp(E.A.sell)}` : ''}.`;
      const hold = ` Stocks: raw material ${mo(P.rm)}${P.wip ? `, WIP ${mo(P.wip)} (wages and overheads ${grp(E.conv)}% complete)` : ''}, finished goods ${mo(P.fg)}; debtors ${mo(P.dr)}; creditors ${mo(P.cr)}; wages paid ${mo(P.wl)} late` +
        `${P.ml ? `, overheads ${mo(P.ml)} late` : ''}${P.al ? `, administration ${mo(P.al)} late` : ''}${P.adv ? `; selling expenses paid ${mo(P.adv)} in advance` : ''}; cash ₹${grp(num0(v.cash))}${E.m ? `; safety margin ${grp(E.m)}% of net working capital` : ''}.`;
      const what = { total: 'the **working capital requirement**', gca: 'the **gross working capital** (total current assets)', nwc: 'the **net working capital** (before any margin)', dr: 'the investment in **debtors**', fg: 'the investment in **finished goods**' }[askEstOf(v)];
      return `${costs}${hold} On a **${E.basis === 'cash' ? 'cash cost' : 'total cost'} basis**, what is ${what}? In ₹ lakh, two decimals.`;
    }
    if (v.mode === 'credit') {
      const Cr = s.cr, P = Cr.P, p = P[Math.min(v.askPol || 1, P.length - 1)];
      const pol = P.map(q => `**${q.name}**: sales ₹${grp(q.S)}, ${grp(q.days)} days, bad debts ${pct(q.bdRate * 100)}`).join('; ');
      const data = `${pol}. Variable cost ${sg(r2(Cr.v * 100))}% of sales${Cr.F ? `, fixed cost ₹${grp(Cr.F)}` : ''}${Cr.t ? `, tax ${grp(Cr.t * 100)}%` : ''}; required return ${grp(Cr.k0 * 100)}% on the investment in receivables at ${v.costBasis === 'variable' ? 'variable cost' : 'total cost (variable + fixed)'}; 360-day year.`;
      const a = v.askCrd || 'best';
      const q = a === 'best' ? 'Which policy should be adopted?' : a === 'opp' ? `What is the **opportunity cost of the investment in receivables** under ${p.name}? In ₹ lakh, two decimals.`
        : v.approach === 'incremental' ? `By the incremental approach, what is the **incremental net benefit of ${p.name}** over the present policy? In ₹ lakh, two decimals (a loss is negative).` : `By the total approach, what is the **net benefit of ${p.name}**? In ₹ lakh, two decimals.`;
      return `${data} ${q}`;
    }
    if (v.mode === 'cash') {
      const a = v.askCash || 'c';
      const head = s.fromC ? `By Baumol's model a firm's optimum cash balance is ₹${grp(v.cstar)}, with ₹${grp(v.tcost)} a transfer and a ${grp(v.yield)}% yield on securities.` : `Annual cash disbursements ₹${grp(v.disb)}, ₹${grp(v.tcost)} a transfer, ${grp(v.yield)}% a year on marketable securities.`;
      const q = s.fromC ? (a === 'n' ? 'How many transfers are made a year? Two decimals.' : a === 'tc' ? 'What is the total annual cost (transaction + carrying) at that optimum, in ₹?' : 'What are the **total annual cash disbursements**, in ₹?')
        : (a === 'n' ? 'By Baumol, how many transfers a year? Two decimals.' : a === 'tc' ? 'By Baumol, what is the total annual cost at the optimum, in ₹?' : 'What is the **optimum cash balance** by Baumol\'s model, in ₹?');
      return `${head} ${q}`;
    }
    const C = s.cy, st = C.stages, a = v.askCyc || 'net';
    const data = st.map(x => `${x.lane.toLowerCase()} average ₹${grp(x.avg)} on annual ${x.base} ₹${grp(x.annual)}`).join('; ');
    const q = a === 'stage' ? `How many days is the **${st[v.askStage || 0].name.toLowerCase()} period** (${st[v.askStage || 0].k})? Whole days.` : a === 'cycles' ? 'How many **operating cycles** are there in a year? Two decimals.'
      : a === 'wc' ? `With an annual operating cost of ₹${grp(C.cost)}${num0(v.margin) ? ` and a ${grp(v.margin)}% contingency` : ''}, what **working capital** is required by the operating cycle method? In ₹ lakh, two decimals.` : 'What is the **net operating cycle** in days?';
    return `360-day year; ${data}. ${q}`;
  }
  function explain(res, v) {
    const s = res.sim;
    if (s.mode === 'cycle') { const C = s.cy; return `${C.stages.map(x => `${x.k} = ${am(x.avg)} ÷ (${am(x.annual)} ÷ 360) = ${sg(r2(x.days))}`).join('; ')}. Net cycle = ${[C.R, C.W, C.F, C.D].map(x => sg(r2(x))).join(' + ')} − ${sg(r2(C.C))} = **${sg(r2(C.net))} days**; cycles = 360 ÷ ${sg(r2(C.net))} = **${sg(r2(C.cycles))}**` + (C.wc ? `; working capital = ${am(C.cost)} ÷ ${sg(r2(C.cycles))} = ${inr(r2(C.wc))}${s.margin ? ` + ${inr(r2(s.margin))} contingency` : ''} = **${lakh(s.total)}**.` : '.'); }
    if (s.mode === 'estimate') { const E = s.E; return `${E.ca.map(x => `${x.lab} ${x.work === 'given' ? '' : x.work + ' = '}${am(x.v)}`).join('; ')} → gross ${am(E.gca)} (**${lakh(E.gca)}**). Less ${E.cl.map(x => `${x.lab.toLowerCase()} ${am(x.v)}`).join(', ')} = ${am(E.tcl)} → net ${am(E.nwc)} (**${lakh(E.nwc)}**)${E.m ? ` + ${grp(E.m)}% margin ${am(E.marginAmt)}` : ''} = **${lakh(E.total)}**.`; }
    if (s.mode === 'credit') { const P = s.cr.P; return P.map(p => `${p.name}: profit ${am(p.pat)} − opportunity cost ${am(p.invest)} × ${sg(r2(s.cr.k * 100))}% = ${am(p.opp)} → net **${lakh(p.net)}**${p !== P[0] ? ` (incremental **${lakh(p.dNet)}**)` : ''}`).join('; ') + `. Best: **${P[s.cr.best].name}**.`; }
    const B = s.B;
    return (s.fromC ? `U = C*² × S ÷ 2P = ${am(v.cstar)}² × ${grp(v.yield)}% ÷ (2 × ${grp(v.tcost)}) = **${inr(r2(s.U))}**. ` : '') + `C* = √(2 × ${am(s.U)} × ${grp(v.tcost)} ÷ ${grp(v.yield / 100)}) = **${inr(r2(B.C))}**; transfers U ÷ C* = **${sg(r2(B.n))}**; total cost = ${am(r2(B.trans))} + ${am(r2(B.carry))} = **${inr(r2(B.total))}**.`;
  }

  /* ================================================================== the definition */
  const is = m => v => (v.mode || 'cycle') === m;
  const isEst = is('estimate'), isCrd = is('credit'), isCash = is('cash'), isCyc = is('cycle');
  const months = { months: 'months', weeks: 'weeks', days: 'days' };
  const per = lab => ({ id: lab[0], type: 'number', label: lab[1], short: lab[2], value: lab[3], min: 0, max: 400, show: isEst });
  const def = {
    id: 'working-capital', title: 'Working Capital Lab',
    blurb: 'Watch the operating cycle, build the working capital statement, compare credit policies and find the optimum cash.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to explore', value: 'cycle', options: [['cycle', 'Operating cycle'], ['estimate', 'Working capital estimate'], ['credit', 'Credit policy (receivables)'], ['cash', 'Cash models (Baumol, Miller-Orr)']] },
      { id: 'ydays', type: 'seg', label: 'Days in a year', value: 360, options: [[360, '360'], [365, '365']], show: v => !isCash(v) },
      /* operating cycle */
      { id: 'stages', type: 'table', label: 'Stages (average = opening and closing averaged, or the one balance given)', short: 'Stages', show: isCyc, max: 5,
        rows: presets[0].values.stages.map(r => r.slice()),
        cols: [{ id: 'stage', label: 'Stage', type: 'text' }, { id: 'op', label: 'Open ₹', type: 'number', min: 0, def: 0 }, { id: 'cl', label: 'Close ₹', type: 'number', min: 0, def: 0 },
          { id: 'base', label: 'Annual ₹', type: 'number', min: 0, def: 0 }, { id: 'days', label: 'Days', type: 'number', min: 0, def: 0 }],
        help: 'Rows in order: raw material (annual = consumption), work-in-progress (cost of production), finished goods (cost of goods sold), receivables (credit sales), payables (credit purchases). Give the days instead when the question gives them; leave a balance at 0 when only one is given.' },
      { id: 'round', type: 'toggle', label: 'Round as ICAI does (whole days, cycles to two decimals)', short: 'ICAI rounding', value: true, show: isCyc },
      { id: 'opcost', type: 'number', label: 'Annual operating cost for the working capital amount (₹; 0 = none)', short: 'Operating cost', value: 20000000, min: 0, max: 1e13, show: isCyc },
      /* estimate */
      { id: 'units', type: 'number', label: 'Units a year (1 = the amounts below are already annual)', short: 'Units', value: 1, min: 1, max: 1e9, show: isEst },
      { id: 'sales', type: 'number', label: 'Sales (₹ a year, or the price per unit)', short: 'Sales', value: 3000000, min: 0, max: 1e13, show: isEst },
      { id: 'credit', type: 'number', label: 'Credit sales (% of sales)', short: 'Credit sales %', value: 100, min: 0, max: 100, show: isEst },
      { id: 'materials', type: 'number', label: 'Materials consumed (₹)', short: 'Materials', value: 900000, min: 0, max: 1e13, show: isEst },
      { id: 'wages', type: 'number', label: 'Wages (₹)', value: 450000, min: 0, max: 1e13, show: isEst },
      { id: 'mfg', type: 'number', label: 'Cash manufacturing overheads (₹)', short: 'Overheads', value: 450000, min: 0, max: 1e13, show: isEst },
      { id: 'dep', type: 'number', label: 'Depreciation in cost of production (₹; 0 = none)', short: 'Depreciation', value: 150000, min: 0, max: 1e13, show: isEst },
      { id: 'admin', type: 'number', label: 'Administrative expenses (₹; 0 = none)', short: 'Administration', value: 150000, min: 0, max: 1e13, show: isEst },
      { id: 'selling', type: 'number', label: 'Selling expenses (₹; 0 = none)', short: 'Selling', value: 60000, min: 0, max: 1e13, show: isEst },
      { id: 'pu', type: 'seg', label: 'Periods below are in', value: 'months', options: Object.entries(months), show: isEst },
      per(['rmP', 'Raw material held', 'RM held', 2]), per(['wipP', 'Work-in-progress period (0 = ignore WIP)', 'WIP period', 0.5]),
      { id: 'conv', type: 'number', label: 'WIP: wages and overheads complete (%)', short: 'WIP completion', value: 50, min: 0, max: 100, show: v => isEst(v) && num0(v.wipP) > 0 },
      per(['fgP', 'Finished goods held', 'FG held', 1]), per(['drP', 'Credit to customers', 'Debtors', 2]), per(['crP', 'Credit from suppliers', 'Creditors', 1]),
      per(['wageLag', 'Lag in paying wages (0 = none)', 'Wage lag', 0.5]), per(['mfgLag', 'Lag in paying overheads (0 = none)', 'Overhead lag', 1]),
      per(['adminLag', 'Lag in paying administration (0 = none)', 'Admin lag', 1]), per(['sellLag', 'Lag in paying selling expenses (0 = none)', 'Selling lag', 0]),
      per(['sellAdv', 'Selling expenses paid in advance (0 = none)', 'Prepaid', 0]),
      { id: 'cash', type: 'number', label: 'Minimum cash balance (₹; 0 = none)', short: 'Cash', value: 100000, min: 0, max: 1e13, show: isEst },
      { id: 'basis', type: 'seg', label: 'Basis', value: 'cash', options: [['total', 'Total cost'], ['cash', 'Cash cost'], ['sales', 'Debtors at sales']], show: isEst },
      { id: 'margin', type: 'number', label: 'Safety margin or contingency (%; 0 = none)', short: 'Margin', value: 0, min: 0, max: 99, show: v => isEst(v) || isCyc(v) },
      { id: 'marginOn', type: 'seg', label: 'Margin is a % of', value: 'nwc', options: [['nwc', 'Net working capital'], ['total', 'The final requirement']], show: v => (isEst(v) || isCyc(v)) && num0(v.margin) > 0 },
      /* credit policy */
      { id: 'approach', type: 'seg', label: 'Approach', value: 'total', options: [['total', 'Total'], ['incremental', 'Incremental']], show: isCrd },
      { id: 'policies', type: 'table', label: 'Policies (present first)', short: 'Policies', show: isCrd, max: 5,
        rows: [['30 days', 12000000, 30, 1, 0, 0], ['45 days', 13500000, 45, 1.5, 0, 0], ['60 days', 14400000, 60, 2.5, 0, 0]],
        cols: [{ id: 'name', label: 'Policy', type: 'text', auto: n => (n ? 'Policy ' + 'ABCD'[n - 1] : 'Present') }, { id: 'sales', label: 'Sales ₹', type: 'number', min: 0, def: 0 }, { id: 'days', label: 'Days', type: 'number', min: 0, def: 30 },
          { id: 'bd', label: 'Bad debts', type: 'number', min: 0, def: 0 }, { id: 'disc', label: 'Disc. %', type: 'number', min: 0, max: 100, def: 0 }, { id: 'take', label: 'Taking %', type: 'number', min: 0, max: 100, def: 0 }],
        help: 'One row per policy, the present one first: credit sales, average collection period (days), bad debts (as % of sales, or ₹ if chosen below), cash discount rate and the % of sales on which customers take it.' },
      { id: 'bdAs', type: 'seg', label: 'Bad debts given as', value: 'pct', options: [['pct', '% of sales'], ['amt', '₹ amount']], show: isCrd },
      { id: 'vcBasis', type: 'seg', label: 'Variable cost given as', value: 'pct', options: [['pct', '% of sales'], ['unit', 'Price and cost per unit']], show: isCrd },
      { id: 'vcr', type: 'number', label: 'Variable cost (% of sales)', short: 'VC %', value: 60, min: 0, max: 99.99, show: v => isCrd(v) && v.vcBasis !== 'unit' },
      { id: 'price', type: 'number', label: 'Selling price per unit (₹)', short: 'Price', value: 100, min: 0, max: 1e8, show: v => isCrd(v) && v.vcBasis === 'unit' },
      { id: 'vcu', type: 'number', label: 'Variable cost per unit (₹)', short: 'VC per unit', value: 60, min: 0, max: 1e8, show: v => isCrd(v) && v.vcBasis === 'unit' },
      { id: 'fixed', type: 'number', label: 'Fixed cost (₹; 0 = none)', short: 'Fixed cost', value: 1500000, min: 0, max: 1e13, show: isCrd },
      { id: 'k', type: 'number', label: 'Required return on investment in receivables (%)', short: 'Required return', value: 18, min: 0, max: 100, show: isCrd },
      { id: 'tax', type: 'number', label: 'Tax rate (%; 0 = ignore tax)', short: 'Tax', value: 25, min: 0, max: 99, show: isCrd },
      { id: 'kPre', type: 'toggle', label: 'The required return is before tax (use it × (1 − t))', short: 'Pre-tax return', value: false, show: v => isCrd(v) && num0(v.tax) > 0 },
      { id: 'costBasis', type: 'seg', label: 'Investment in receivables at', value: 'total', options: [['total', 'Total cost'], ['variable', 'Variable cost']], show: isCrd },
      { id: 'xcred', type: 'number', label: 'Extra days of supplier credit on the additional variable cost (0 = none)', short: 'Extra creditor days', value: 0, min: 0, max: 365, show: isCrd },
      /* cash models */
      { id: 'find', type: 'seg', label: 'Baumol: find', value: 'c', options: [['c', 'Optimum C*'], ['u', 'Disbursements U']], show: isCash },
      { id: 'period', type: 'seg', label: 'Disbursements are for a', value: 'year', options: [['year', 'Year'], ['month', 'Month']], show: isCash },
      { id: 'disb', type: 'number', label: 'Cash disbursements U (₹)', short: 'Disbursements', value: 1800000, min: 0, max: 1e13, show: v => isCash(v) && v.find !== 'u' },
      { id: 'cstar', type: 'number', label: 'Known optimum cash balance (₹)', short: 'Optimum', value: 30000, min: 0, max: 1e12, show: v => isCash(v) && v.find === 'u' },
      { id: 'tcost', type: 'number', label: 'Cost per transfer P (₹)', short: 'Cost per transfer', value: 20, min: 0, max: 1e7, show: isCash },
      { id: 'yield', type: 'number', label: 'Yield on marketable securities (% a year)', short: 'Yield', value: 12, min: 0, max: 100, show: isCash },
      { id: 'mo', type: 'toggle', label: 'Also run Miller-Orr control limits (illustrative)', short: 'Miller-Orr', value: true, show: isCash },
      { id: 'moLow', type: 'number', label: 'Miller-Orr lower limit (₹)', short: 'Lower limit', value: 0, min: 0, max: 1e12, show: v => isCash(v) && v.mo !== false },
      { id: 'moZ', type: 'number', label: 'Return point z (₹)', short: 'Return point', value: 25000, min: 0, max: 1e12, show: v => isCash(v) && v.mo !== false },
      { id: 'moH', type: 'number', label: 'Upper limit h (₹)', short: 'Upper limit', value: 75000, min: 0, max: 1e12, show: v => isCash(v) && v.mo !== false },
      { id: 'moDays', type: 'number', label: 'Days to run', value: 60, min: 5, max: 365, show: v => isCash(v) && v.mo !== false },
      { id: 'moSwing', type: 'number', label: 'Largest daily net cash flow (₹)', short: 'Daily swing', value: 8000, min: 1, max: 1e12, show: v => isCash(v) && v.mo !== false },
      { id: 'moSeed', type: 'number', label: 'Random seed for the made-up flows', short: 'Seed', value: 63, min: 1, max: 1e6, show: v => isCash(v) && v.mo !== false }
    ],
    presets, compute,
    challenge: {
      title: 'Work out the working capital',
      gen, solve, prompt, explain, tol: 0.011, unit: '',
      kind: (v) => (v.mode === 'credit' && (v.askCrd || 'best') === 'best' ? 'choice' : 'num'),
      choices: (v, res) => (res && res.sim && res.sim.cr ? res.sim.cr.P.map(p => p.name) : []),
      signed: (v, res) => { const w = solve(res, v); return typeof w === 'number' && w < 0; },
      /* the test state's picture: the givens only, never a computed amount */
      view: (res, v) => { const s = res && res.sim; if (!s) return null; if (s.mode === 'estimate') return [s.blank]; if (s.mode === 'credit') return [s.blankGiven]; if (s.mode === 'cycle') return [res.frames[0].view[0]]; return null; }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { amt, cycle, estimate, credit, baumol, baumolU, millerOrr, compute, def, presets };
  g.__lab_def_working_capital = def;
})(typeof window !== 'undefined' ? window : globalThis);
