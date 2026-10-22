/* PassBook — Budget Lab (Paper 4, Budgets and Budgetary Control: ICAI Study Material, chapter 15).
   Three modes, each a pure function of its inputs (Node-testable: require('app/js/labs/budget.js')):
     flexible   flexibleBudget(lines, opts): cost lines that are fixed, variable, semi-variable (split by a fixed share, a fixed amount or the
                high-low method, SM 15.28), stepped (₹ per bus of 50) or a % of sales, costed at several activity levels; total and per-unit
                cost, profit, and the comparison of actual costs with the flexible budget at the actual level (SM Illustration 3)
     cash       cashBudget(flows, opts): receipts and payments month by month, each flow spread over the months by its collection or
                payment pattern (% in the month, the next month, …; cash discount; what is never collected is a bad debt), opening and
                closing balances, and the shortfall below a minimum balance
     functional functionalBudget(products, bom, materials, opts): production = sales + closing − opening stock of finished goods; material
                usage = production × quantity per unit; purchases = usage + closing − opening stock of materials, valued at the price
   The lines of the flexible budget and the cash flows are typed one per line ("Power: semi 800, 875 at 10000"); see the help of the boxes. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = () => GA.util || {};
  const inr = n => (U().inr ? U().inr(n) : '₹' + Math.round(n));
  const EPS = 1e-9;
  /** an amount with Indian grouping, at most two decimals (three below 1: ₹0.555 a unit stays visible) */
  const qf = n => { const a = Math.abs(n), d = a > 0 && a < 1 ? 3 : 2, x = Math.round(n * 10 ** d) / 10 ** d; return Math.abs(x) < 1e-12 ? '0' : x.toLocaleString('en-IN', { maximumFractionDigits: d }); };
  const rs = n => (n < -0.005 ? '(' + qf(-n) + ')' : qf(n));                              // a budget figure: negatives in brackets, as ICAI prints them
  const inrU = n => (Math.abs(n) > 0 && Math.abs(n) < 1 ? '₹' + qf(n) : inr(n));            // a rate per unit: ₹0.0375 keeps its digits
  const sum = (a, f) => a.reduce((s, x) => s + (f ? f(x) : x), 0);
  /** numbers as typed: 8,40,000 (Indian), 840,000 or 840000, with decimals; the groups need digits right after each comma */
  const NUM = '(\\d{1,3}(?:,\\d{2,3})+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?)';
  const toNum = s => parseFloat(String(s).replace(/,/g, ''));
  const nz = x => { const n = typeof x === 'number' ? x : toNum(String(x == null ? '' : x).replace(/[₹\s]/g, '')); return Number.isFinite(n) ? n : 0; };
  const plural = (n, w) => `${qf(n)} ${w}${Math.abs(n - 1) < EPS ? '' : 's'}`;

  /* ================================================================== flexible budget */
  /** activity levels typed as '60%, 80%, 100%' (of capacity) or '72,000 96,000' (in units) -> [{units, pct}] */
  function parseLevels(text, cap) {
    const out = [], re = new RegExp(NUM + '\\s*(%?)', 'g');
    let m;
    while ((m = re.exec(String(text == null ? '' : text)))) {
      const x = toNum(m[1]), pct = m[2] === '%';
      if (pct && !(cap > 0)) throw new Error('Levels in % need the activity at 100% capacity; enter it, or type the levels in units.');
      const units = pct ? (cap * x) / 100 : x;
      if (!(units > 0)) throw new Error('Every activity level must be more than 0.');
      out.push({ units, pct: cap > 0 ? (units / cap) * 100 : null });
    }
    if (!out.length) throw new Error('Type the activity levels to budget for, e.g. "60%, 80%, 100%" or "72000 96000 120000".');
    if (out.length > 6) throw new Error(`Budget at most 6 levels at a time (you typed ${out.length}).`);
    return out;
  }
  /** one threshold of a step-up or a slab: '85%' of capacity or '300' units */
  const levelOf = (x, pct, cap, line) => { if (pct && !(cap > 0)) throw new Error(`${line}: a threshold in % needs the activity at 100% capacity.`); return pct ? (cap * x) / 100 : x; };
  /** step-ups and slabs of a fixed cost: '+10% above 85%' (on the base amount), '3000 above 300' (the cost from there on) */
  function parseSteps(s, cap, line) {
    const re = new RegExp('([+-]?)\\s*' + NUM + '\\s*(%?)\\s*(?:above|over|beyond|after|>)\\s*' + NUM + '\\s*(%?)', 'g'), out = [];
    let m;
    while ((m = re.exec(s))) out.push({ rel: m[3] === '%', v: toNum(m[2]) * (m[1] === '-' ? -1 : 1), sign: m[1], at: levelOf(toNum(m[4]), m[5] === '%', cap, line), atText: m[4] + m[5] });
    return out.sort((a, b) => a.at - b.at);
  }
  const KIND = { fixed: 'Fixed', variable: 'Variable', semi: 'Semi-variable', step: 'Step', sales: '% of sales' };
  /** a cost line 'Item: how it behaves' -> {name, kind, cost(x)} with what the captions need. ctx: {cap, base, price, line} */
  function parseLine(raw, ctx) {
    const at = `Line ${ctx.line}`, m = /^\s*([^:]+?)\s*:\s*(.+?)\s*$/.exec(raw);
    if (!m) throw new Error(`${at}: write the item, a colon, then how it behaves, e.g. "Rent: fixed 50000".`);
    const name = m[1].trim(), where = `${at} (${name})`;
    let s = m[2].toLowerCase().replace(/₹/g, '').replace(/\s+/g, ' ');
    let actual = null;
    const am = new RegExp('(?:^|[,;]\\s*)actual(?:\\s+cost)?\\s*(?:=|:)?\\s*' + NUM).exec(s);
    if (am) { actual = toNum(am[1]); s = (s.slice(0, am.index) + s.slice(am.index + am[0].length)).trim(); }
    const first = new RegExp(NUM).exec(s);
    const L = { name, actual, raw: m[2] };
    const needBase = what => { if (!(ctx.base > 0)) throw new Error(`${where}: ${what} needs the activity at which the costs are given (the base level).`); };
    if (new RegExp(NUM + '\\s*%\\s*of\\s*(?:the\\s+)?(?:sales|turnover|revenue)').test(s)) {
      const p = toNum(new RegExp(NUM + '\\s*%\\s*of').exec(s)[1]);
      if (!(ctx.price > 0)) throw new Error(`${where}: a cost that is a % of sales needs the selling price per unit.`);
      Object.assign(L, { kind: 'sales', pct: p, rate: (p / 100) * ctx.price });
      L.cost = x => L.rate * x;
    } else if (/^(fixed|f)\b/.test(s)) {
      if (!first) throw new Error(`${where}: give the fixed amount, e.g. "fixed 120000".`);
      Object.assign(L, { kind: 'fixed', amount: toNum(first[1]), steps: parseSteps(s.slice(first.index + first[0].length), ctx.cap, where) });
      L.cost = x => stepped(L, x);
    } else if (/^(variable|var|v)\b/.test(s)) {
      if (!first) throw new Error(`${where}: give the variable cost, e.g. "variable 20" (₹ a unit) or "variable 720 in total".`);
      const total = /\b(in total|total|at base|at the base)\b/.test(s);
      if (total) needBase('a total variable cost');
      Object.assign(L, { kind: 'variable', given: toNum(first[1]), total, rate: total ? toNum(first[1]) / ctx.base : toNum(first[1]) });
      L.cost = x => L.rate * x;
    } else if (/^(semi(?:-?variable)?|sv|s)\b/.test(s)) {
      if (!first) throw new Error(`${where}: give the cost at the base level, e.g. "semi 840000, 20% fixed".`);
      const c1 = toNum(first[1]), rest = s.slice(first.index + first[0].length);
      const fp = new RegExp(NUM + '\\s*%\\s*fixed').exec(rest), vp = new RegExp(NUM + '\\s*%\\s*variable').exec(rest);
      const fa = new RegExp('fixed\\s+(?:part\\s+|portion\\s+)?(?:is\\s+)?' + NUM + '(?!\\s*%)').exec(rest), hl = new RegExp(NUM + '\\s+(?:at|for)\\s+' + NUM + '\\s*(%?)').exec(rest);
      Object.assign(L, { kind: 'semi', c1 });
      if (hl) {
        needBase('the high-low split');
        const c2 = toNum(hl[1]), l2 = levelOf(toNum(hl[2]), hl[3] === '%', ctx.cap, where);
        if (Math.abs(l2 - ctx.base) < EPS) throw new Error(`${where}: the second level (${qf(l2)}) must differ from the base level to split by high-low.`);
        L.split = 'highlow'; L.c2 = c2; L.l2 = l2; L.rate = (c2 - c1) / (l2 - ctx.base); L.fixed = c1 - L.rate * ctx.base;
      } else if (fp || vp) {
        needBase('the split');
        const f = fp ? toNum(fp[1]) : 100 - toNum(vp[1]);
        if (f < 0 || f > 100) throw new Error(`${where}: the fixed share must be between 0% and 100%.`);
        L.split = 'pct'; L.fixedPct = f; L.fixed = (c1 * f) / 100; L.rate = (c1 - L.fixed) / ctx.base;
      } else if (fa) {
        needBase('the split');
        L.split = 'amount'; L.fixed = toNum(fa[1]); L.rate = (c1 - L.fixed) / ctx.base;
        if (L.fixed > c1 + EPS) throw new Error(`${where}: the fixed part (${qf(L.fixed)}) cannot exceed the cost at the base level (${qf(c1)}).`);
      } else {
        const st = parseSteps(rest, ctx.cap, where);
        if (!st.length) throw new Error(`${where}: say how to split it: "20% fixed", "fixed 400", or its cost at another level ("875 at 10000").`);
        L.split = 'steps'; L.amount = c1; L.steps = st;
      }
      L.cost = L.split === 'steps' ? x => stepped(L, x) : x => L.fixed + L.rate * x;
    } else if (/^step\b/.test(s)) {
      const sm = new RegExp('^step\\s+' + NUM + '\\s*(?:per|for each|for every|every|a|each)\\s*' + NUM).exec(s);
      if (!sm) throw new Error(`${where}: write a stepped cost as "step 6500 per 50" (₹ for each block of 50 or part of it).`);
      Object.assign(L, { kind: 'step', amount: toNum(sm[1]), size: toNum(sm[2]) });
      if (!(L.size > 0)) throw new Error(`${where}: the block size must be more than 0.`);
      L.blocks = x => Math.ceil(x / L.size - 1e-9);
      L.cost = x => L.blocks(x) * L.amount;
    } else throw new Error(`${where}: start with fixed, variable, semi or step, or write "2% of sales".`);
    return L;
  }
  /** a fixed (or stepped semi-variable) cost at level x: the base amount, or the last step-up / slab whose threshold x is above */
  function stepped(L, x) {
    let v = L.amount;
    (L.steps || []).forEach(st => { if (x > st.at + EPS) v = st.rel ? L.amount * (1 + st.v / 100) : st.v; });
    return v;
  }
  function flexibleBudget(text, o) {
    const cap = nz(o.cap), base = nz(o.base), price = nz(o.price);
    const raw = String(text == null ? '' : text).split('\n').map(l => l.trim()).filter(l => l && l[0] !== '#');
    if (!raw.length) throw new Error('Add at least one cost line, e.g. "Rent: fixed 50000".');
    if (raw.length > 14) throw new Error(`At most 14 cost lines (you have ${raw.length}).`);
    const lines = raw.map((r, i) => parseLine(r, { cap, base, price, line: i + 1 }));
    if (new Set(lines.map(l => l.name.toLowerCase())).size !== lines.length) throw new Error('Give every cost line a different name.');
    const levels = parseLevels(o.levels, cap);
    const R = { cap, base, price, lines, levels, unit: String(o.unit || 'units').trim() || 'units' };
    lines.forEach(l => { l.at = levels.map(lv => l.cost(lv.units)); });
    R.total = levels.map((lv, i) => sum(lines, l => l.at[i]));
    R.perUnit = levels.map((lv, i) => R.total[i] / lv.units);
    R.cost = x => sum(lines, l => l.cost(x));
    if (price > 0) { R.sales = levels.map(lv => lv.units * price); R.profit = R.sales.map((sv, i) => sv - R.total[i]); }
    const act = nz(o.actLevel);
    if (act > 0) {
      const miss = lines.filter(l => l.actual == null);
      if (miss.length) throw new Error(`To compare with actual, give every line its actual cost (add ", actual 600"): ${miss.map(l => l.name).join(', ')}.`);
      R.actual = { units: act, rows: lines.map(l => { const b = l.cost(act); return { name: l.name, budget: b, actual: l.actual, diff: b - l.actual }; }) };
      R.actual.budget = sum(R.actual.rows, r => r.budget); R.actual.total = sum(R.actual.rows, r => r.actual); R.actual.diff = R.actual.budget - R.actual.total;
    }
    return R;
  }

  /* ---------------------------------------------------------------- flexible: frames */
  const lvHead = (R, lv) => (lv.pct != null ? `${qf(lv.pct)}% (${qf(lv.units)})` : `${qf(lv.units)} ${R.unit}`);
  function flexTable(R, n, extra) {
    const head = ['Particulars', 'Nature'].concat(R.levels.map(lv => lvHead(R, lv) + ' ₹'));
    const rows = R.lines.slice(0, n).map(l => [l.name, KIND[l.kind]].concat(l.at.map(rs)));
    const cells = {};
    if (n > 0 && n <= R.lines.length && !extra) R.levels.forEach((lv, i) => (cells[(n - 1) + ',' + (i + 2)] = 'hl'));
    if (extra >= 1) { rows.push(['**Total cost**', ''].concat(R.total.map(t => `**${rs(t)}**`))); rows.push([`Cost per ${R.unit.replace(/s$/, '')}`, ''].concat(R.perUnit.map(qf))); R.levels.forEach((lv, i) => (cells[(rows.length - 2) + ',' + (i + 2)] = 'hl')); }
    if (extra >= 2 && R.sales) { rows.push(['Sales', ''].concat(R.sales.map(rs))); rows.push(['**Profit**', ''].concat(R.profit.map(p => `**${rs(p)}**`))); R.levels.forEach((lv, i) => (cells[(rows.length - 1) + ',' + (i + 2)] = R.profit[i] >= 0 ? 'ok' : 'bad')); }
    return { type: 'table', title: `Flexible budget${R.cap > 0 ? ` (capacity ${qf(R.cap)} ${R.unit})` : ''}`, head, rows, cells, align: head.map((h, i) => (i < 2 ? 'left' : 'right')) };
  }
  /** a round tick step for a range: 1, 2, 2.5 or 5 × a power of ten, about n ticks */
  function niceStep(max, n) { const raw = max / n, mag = 10 ** Math.floor(Math.log10(raw)), f = raw / mag; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag; }
  const ticks = (max, step) => Array.from({ length: Math.round(max / step) + 1 }, (_, i) => { const v = +(i * step).toFixed(6); return [v, qf(v)]; });   // [value, label]: Indian grouping on the axis
  function flexPlot(R) {
    const xs = niceStep(Math.max(...R.levels.map(l => l.units), R.actual ? R.actual.units : 0) * 1.1, 5);
    const xmax = Math.ceil((Math.max(...R.levels.map(l => l.units), R.actual ? R.actual.units : 0) * 1.05) / xs) * xs, N = 160, pts = [];
    for (let k = 0; k <= N; k++) { const x = (xmax * k) / N; pts.push([+x.toFixed(4), +R.cost(Math.max(x, 1e-9)).toFixed(2)]); }
    const series = [{ label: 'total cost', pts, color: 'd' }];
    if (R.sales) series.unshift({ label: 'sales', pts: [[0, 0], [xmax, xmax * R.price]], color: 'a' });
    const fixed0 = R.cost(1e-9);
    series.push({ label: 'cost at zero activity', pts: [[0, fixed0], [xmax, fixed0]], color: 'mute', dash: true });
    const top = Math.max(...pts.map(p => p[1]), R.sales ? xmax * R.price : 0) * 1.04, ys = niceStep(top, 5), ymax = Math.ceil(top / ys) * ys;
    const last = R.levels.length - 1;
    return { type: 'plot', title: 'Total cost against activity', x: [0, xmax], y: [0, ymax], xticks: ticks(xmax, xs), yticks: ticks(ymax, ys), xlabel: R.unit, ylabel: '₹', legend: 'top-left', series,
      points: R.levels.map((lv, i) => Object.assign({ x: lv.units, y: R.total[i] }, i === 0 || i === last ? { label: rs(R.total[i]), pos: i === 0 ? 'below' : 'above' } : {})) };
  }
  function lineCaption(R, l) {
    const lv = R.levels, xs = lv.map(v => v.units), ex = i => `${qf(xs[i])} → ₹${rs(l.at[i])}`;
    const all = lv.map((v, i) => ex(i)).join('; ');
    switch (l.kind) {
      case 'variable': return `**${l.name}** is **variable**: ${l.total ? `₹${qf(l.given)} at ${qf(R.base)} ${R.unit} is ${inrU(l.rate)} a unit` : `${inrU(l.rate)} a unit`}, so it grows in proportion to activity (${all}).`;
      case 'sales': return `**${l.name}** is ${qf(l.pct)}% of sales: ${inrU(l.rate)} a unit at a price of ${inr(R.price)}, so it behaves as a **variable** cost (${all}).`;
      case 'step': return `**${l.name}** is a **step** cost: ${inr(l.amount)} for each block of ${qf(l.size)} ${R.unit} or part of one (${lv.map((v, i) => `${qf(xs[i])} need ${plural(l.blocks(xs[i]), 'block')}`).join(', ')}): ${lv.map((v, i) => '₹' + rs(l.at[i])).join(', ')}.`;
      case 'fixed': return `**${l.name}** is **fixed**: ${inr(l.amount)} whatever the activity${l.steps.length ? `, until it steps up: ${l.steps.map(st => (st.rel ? `${st.sign || '+'}${qf(Math.abs(st.v))}%` : inr(st.v)) + ` above ${st.atText}`).join(', ')} (${all})` : ' (within the range budgeted)'}.`;
      case 'semi':
        if (l.split === 'steps') return `**${l.name}** is **semi-variable** in steps: ${inr(l.amount)} until ${l.steps.map(st => (st.rel ? `${st.sign || '+'}${qf(Math.abs(st.v))}%` : inr(st.v)) + ` above ${st.atText}`).join(', ')} (${all}).`;
        if (l.split === 'highlow') return `**${l.name}** is **semi-variable**, so split it by the **high-low method**: variable rate = change in cost ÷ change in activity = (${inr(l.c2)} − ${inr(l.c1)}) ÷ (${qf(l.l2)} − ${qf(R.base)}) = ${inrU(l.rate)} a unit; fixed part = ${inr(l.c1)} − ${qf(R.base)} × ${inrU(l.rate)} = ${inr(l.fixed)}. Then fixed + rate × activity: ${all}.`;
        return `**${l.name}** is **semi-variable**: ${inr(l.c1)} at ${qf(R.base)} ${R.unit}, ${l.split === 'pct' ? `${qf(l.fixedPct)}% fixed` : `fixed part ${inr(l.fixed)}`}. Split it first: the fixed ${inr(l.fixed)} stays at every level; the variable ${inr(l.c1 - l.fixed)} ÷ ${qf(R.base)} = ${inrU(l.rate)} a unit. Then ${all}.`;
      default: return '';
    }
  }
  function flexFrames(R) {
    const F = [{ caption: `A **flexible budget** is a series of fixed budgets, one for each level of activity: ${R.levels.map(lv => lvHead(R, lv)).join(', ')}. Each cost is budgeted by how it behaves${R.base > 0 ? `; the figures given are for ${qf(R.base)} ${R.unit}` : ''}.`, view: [flexTable(R, 0)] }];
    R.lines.forEach((l, i) => F.push({ caption: lineCaption(R, l), view: [flexTable(R, i + 1)] }));
    const lo = 0, hi = R.levels.length - 1;
    F.push({ caption: `**Total cost** at each level, and the **cost per ${R.unit.replace(/s$/, '')}**: ${R.levels.map((lv, i) => `${inr(R.total[i])} ÷ ${qf(lv.units)} = ${inrU(R.perUnit[i])}`).join('; ')}.${hi > lo && R.perUnit[hi] < R.perUnit[lo] - EPS ? ' The cost per unit falls as activity rises: the fixed costs are spread over more units.' : ''}`, view: [flexTable(R, R.lines.length, 1)] });
    if (R.sales) F.push({ caption: `**Sales** at ${inr(R.price)} a unit, and **profit** = sales − total cost: ${R.levels.map((lv, i) => `${inr(R.sales[i])} − ${inr(R.total[i])} = ${rs(R.profit[i])}`).join('; ')}.`, view: [flexTable(R, R.lines.length, 2)] });
    F.push({ caption: `On a chart the total cost starts at the cost of zero activity (${inr(R.cost(1e-9))}, the fixed costs) and rises with activity${R.lines.some(l => l.kind === 'step' || (l.steps && l.steps.length)) ? ', jumping wherever a step cost adds a block' : ''}; the dots are the budgeted levels.`, view: [flexPlot(R), flexTable(R, R.lines.length, 2)] });
    if (R.actual) {
      const A = R.actual, t = { type: 'table', title: `Actual against the flexible budget at the actual activity (${qf(A.units)} ${R.unit})`, head: ['Particulars', 'Flexible budget ₹', 'Actual ₹', 'Difference'],
        rows: A.rows.map(r => [r.name, rs(r.budget), rs(r.actual), Math.abs(r.diff) < 0.005 ? 'Nil' : `${qf(Math.abs(r.diff))} ${r.diff > 0 ? 'F' : 'A'}`]).concat([['**Total**', `**${rs(A.budget)}**`, `**${rs(A.total)}**`, `**${Math.abs(A.diff) < 0.005 ? 'Nil' : qf(Math.abs(A.diff)) + (A.diff > 0 ? ' F' : ' A')}**`]]),
        cells: Object.fromEntries(A.rows.map((r, i) => [i + ',3', Math.abs(r.diff) < 0.005 ? 'mute' : r.diff > 0 ? 'ok' : 'bad'])), align: ['left', 'right', 'right', 'right'] };
      F.push({ caption: `**Budgetary control**: compare the actual costs with the budget **flexed to the actual activity** (${qf(A.units)} ${R.unit}), not with the original plan. Allowed ${inr(A.budget)}, spent ${inr(A.total)}: ${A.diff < -0.005 ? `**${inr(-A.diff)} overspent** (adverse)` : A.diff > 0.005 ? `**${inr(A.diff)} saved** (favourable)` : 'exactly on budget'}.`, view: [t] });
    }
    return F;
  }

  /* ================================================================== cash budget */
  const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  function parseMonths(text) {
    const ms = String(text == null ? '' : text).split(/[\s,;]+/).map(x => x.trim()).filter(Boolean);
    if (ms.length < 1) throw new Error('Type the month names, history first, e.g. "Apr May Jun Jul Aug Sep".');
    if (ms.length > 12) throw new Error(`At most 12 months (you typed ${ms.length}).`);
    if (new Set(ms.map(m => m.toLowerCase())).size !== ms.length) throw new Error('Every month name must be different.');
    return ms;
  }
  /** pattern '0 80 10 8' or '20 (2% discount), 50, 28': % of a month's amount paid in that month, the next, … -> [{p, disc}] */
  function parsePattern(s, where) {
    const out = [], re = /(\d+(?:\.\d+)?)\s*%?\s*(?:\(\s*(?:less\s+)?(\d+(?:\.\d+)?)\s*%\s*(?:cash\s+)?discount\s*\))?/gi;
    let m;
    while ((m = re.exec(s))) out.push({ p: +m[1], disc: m[2] ? +m[2] : 0 });
    if (!out.length) throw new Error(`${where}: give the pattern as %s, e.g. "collected 0 80 10 8".`);
    if (out.length > 7) throw new Error(`${where}: a pattern can spread over at most 7 months.`);
    const t = sum(out, x => x.p);
    if (t > 100 + 1e-6) throw new Error(`${where}: the pattern adds up to ${qf(t)}%, more than 100%.`);
    return out;
  }
  /** a flow 'Credit sales: in 22,50,000 22,50,000 …; collected 0 80 10 8' or 'Tax: out Mar 1,00,000' */
  function parseFlow(raw, months, line) {
    const at = `Line ${line}`, m = /^\s*([^:]+?)\s*:\s*(.+?)\s*$/.exec(raw);
    if (!m) throw new Error(`${at}: write the item, a colon, then "in" or "out" and its amounts, e.g. "Rent: out 50000 50000 50000".`);
    const name = m[1].trim(), where = `${at} (${name})`;
    const parts = m[2].split(';').map(x => x.trim()).filter(Boolean);
    const d = /^(in|receipts?|out|payments?)\b\s*(.*)$/i.exec(parts[0]);
    if (!d) throw new Error(`${where}: say "in" (a receipt) or "out" (a payment) before the amounts.`);
    const dir = /^(in|receipt)/i.test(d[1]) ? 'in' : 'out', body = d[2].replace(/₹/g, '');
    const amounts = months.map(() => 0);
    const keyed = new RegExp('([A-Za-z]{3,})\\s*[:=]?\\s*' + NUM, 'g');
    const lower = months.map(x => x.toLowerCase());
    let km, keyedAny = false;
    while ((km = keyed.exec(body))) {
      const w = km[1].toLowerCase(), i = lower.findIndex(x => x === w || x.startsWith(w) || w.startsWith(x));
      if (i < 0) throw new Error(`${where}: "${km[1]}" is not one of the months (${months.join(' ')}).`);
      amounts[i] += toNum(km[2]); keyedAny = true;
    }
    if (!keyedAny) {
      const nums = (body.match(new RegExp(NUM, 'g')) || []).map(toNum);
      if (!nums.length) throw new Error(`${where}: give its amounts, one for each month in order, or by month ("Jun 20,00,000").`);
      if (nums.length > months.length) throw new Error(`${where}: ${nums.length} amounts but only ${months.length} months.`);
      nums.forEach((x, i) => (amounts[i] = x));
    }
    let pattern = [{ p: 100, disc: 0 }], pword = '';
    parts.slice(1).forEach(p => {
      const pm = /^(collected|received|paid|lag|pattern|spread)\b\s*(.*)$/i.exec(p);
      if (!pm) throw new Error(`${where}: after ";" write the pattern, e.g. "collected 0 80 10 8" or "paid 75 25".`);
      pattern = parsePattern(pm[2], where); pword = pm[1].toLowerCase();
    });
    return { name, dir, amounts, pattern, pword, lost: 100 - sum(pattern, x => x.p) };
  }
  function cashBudget(text, o) {
    const months = parseMonths(o.months), hist = Math.round(nz(o.hist));
    if (hist < 0 || hist >= months.length) throw new Error(`The months before the budget must be from 0 to ${months.length - 1}: at least one month must be budgeted.`);
    const raw = String(text == null ? '' : text).split('\n').map(l => l.trim()).filter(l => l && l[0] !== '#');
    if (!raw.length) throw new Error('Add at least one receipt or payment, e.g. "Sales: in 50000 60000 70000".');
    if (raw.length > 14) throw new Error(`At most 14 flows (you have ${raw.length}).`);
    const flows = raw.map((r, i) => parseFlow(r, months, i + 1));
    if (new Set(flows.map(f => f.name.toLowerCase())).size !== flows.length) throw new Error('Give every receipt and payment a different name.');
    const B = months.slice(hist), open0 = nz(o.open), minBal = nz(o.minBal);
    flows.forEach(f => {
      f.cash = B.map((_, j) => { const t = hist + j; return sum(f.pattern.map((pt, k) => (t - k >= 0 ? (f.amounts[t - k] * pt.p) / 100 * (1 - pt.disc / 100) : 0))); });
      /* the working note: which earlier month pays how much into which budget month */
      f.note = months.map((mn, s) => ({ month: mn, amount: f.amounts[s], parts: B.map((_, j) => { const k = hist + j - s; return k >= 0 && k < f.pattern.length && f.pattern[k].p > 0 ? (f.amounts[s] * f.pattern[k].p) / 100 * (1 - f.pattern[k].disc / 100) : null; }) }))
        .filter(r => r.parts.some(x => x != null && Math.abs(x) > EPS));
      f.disc = B.map((_, j) => { const t = hist + j; return sum(f.pattern.map((pt, k) => (t - k >= 0 ? (f.amounts[t - k] * pt.p) / 100 * (pt.disc / 100) : 0))); });
    });
    const ins = flows.filter(f => f.dir === 'in'), outs = flows.filter(f => f.dir === 'out');
    const rec = B.map((_, j) => sum(ins, f => f.cash[j])), pay = B.map((_, j) => sum(outs, f => f.cash[j]));
    const opening = [], closing = [];
    B.forEach((_, j) => { opening[j] = j ? closing[j - 1] : open0; closing[j] = opening[j] + rec[j] - pay[j]; });
    const short = closing.map(c => (minBal > 0 ? Math.max(0, minBal - c) : Math.max(0, -c)));
    return { months, hist, B, flows, ins, outs, rec, pay, net: B.map((_, j) => rec[j] - pay[j]), opening, closing, minBal, short, open0 };
  }

  /* ---------------------------------------------------------------- cash: frames */
  function cashTable(C, nFlows, stage) {
    const head = ['Particulars'].concat(C.B.map(m => m + ' ₹'));
    const shown = new Set(C.flows.slice(0, nFlows));
    const rows = [], cells = {}, hl = i => C.B.forEach((_, j) => (cells[i + ',' + (j + 1)] = 'hl'));
    const last = C.flows[nFlows - 1];
    rows.push(['**Receipts**'].concat(C.B.map(() => '')));
    const cell = x => (Math.abs(x) < 0.005 ? '—' : rs(x));
    C.ins.forEach(f => { if (shown.has(f)) { rows.push([f.name].concat(f.cash.map(cell))); if (f === last && stage === 0) hl(rows.length - 1); } });
    if (stage >= 1) rows.push(['**Total receipts (A)**'].concat(C.rec.map(x => `**${rs(x)}**`)));
    rows.push(['**Payments**'].concat(C.B.map(() => '')));
    C.outs.forEach(f => { if (shown.has(f)) { rows.push([f.name].concat(f.cash.map(cell))); if (f === last && stage === 0) hl(rows.length - 1); } });
    if (stage >= 1) {
      rows.push(['**Total payments (B)**'].concat(C.pay.map(x => `**${rs(x)}**`)));
      rows.push(['Net cash flow (A − B)'].concat(C.net.map(rs)));
      const k = stage - 1;                                              // closing balances shown for the first k months
      rows.push(['Opening balance'].concat(C.B.map((_, j) => (j < Math.max(1, k) ? rs(C.opening[j]) : ''))));
      rows.push(['**Closing balance**'].concat(C.B.map((_, j) => (j < k ? `**${rs(C.closing[j])}**` : ''))));
      C.B.forEach((_, j) => { if (j < k) cells[(rows.length - 1) + ',' + (j + 1)] = C.closing[j] < -0.005 ? 'bad' : 'ok'; });
      if (k >= C.B.length && stage > C.B.length && (C.minBal > 0 || C.short.some(x => x > 0.005))) {
        rows.push([C.minBal > 0 ? `Short of the ${inr(C.minBal)} minimum` : 'Short of cash (overdraft)'].concat(C.short.map(x => (x > 0.005 ? rs(x) : '—'))));
        C.B.forEach((_, j) => { if (C.short[j] > 0.005) cells[(rows.length - 1) + ',' + (j + 1)] = 'bad'; });
      }
    } else {
      rows.push(['Opening balance'].concat(C.B.map((_, j) => (j ? '' : rs(C.opening[0])))));
    }
    return { type: 'table', title: `Cash budget: ${C.B[0]} to ${C.B[C.B.length - 1]}`, head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  /** the balances alone, month by month (the lesson embed's view of the closing frames: the full budget is the second view) */
  function balTable(C, k, shortRow) {
    const head = ['Balances ₹'].concat(C.B), cells = {};
    const rows = [['Opening'].concat(C.B.map((_, j) => (j < Math.max(1, k) ? rs(C.opening[j]) : ''))), ['Add: receipts'].concat(C.rec.map(rs)), ['Less: payments'].concat(C.pay.map(rs)),
      ['**Closing**'].concat(C.B.map((_, j) => (j < k ? `**${rs(C.closing[j])}**` : '')))];
    C.B.forEach((_, j) => { if (j < k) cells['3,' + (j + 1)] = C.closing[j] < -0.005 ? 'bad' : 'ok'; });
    if (shortRow) { rows.push([C.minBal > 0 ? 'Short of the minimum' : 'Overdraft needed'].concat(C.short.map(x => (x > 0.005 ? rs(x) : '—')))); C.B.forEach((_, j) => { if (C.short[j] > 0.005) cells['4,' + (j + 1)] = 'bad'; }); }
    return { type: 'table', title: 'Cash balances', head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  function noteTable(C, f) {
    const head = ['Month', 'Amount ₹'].concat(C.B.map(m => m + ' ₹'));
    const rows = f.note.map(r => [r.month, rs(r.amount)].concat(r.parts.map(x => (x == null ? '' : rs(x)))));
    rows.push(['**Total**', ''].concat(f.cash.map(x => `**${rs(x)}**`)));
    return { type: 'table', title: `Working note: ${f.name}`, head, rows, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  const pctList = pt => pt.map((x, k) => `${qf(x.p)}% ${k === 0 ? 'in the month' : k === 1 ? 'the next month' : `${k} months later`}${x.disc ? ` (less a ${qf(x.disc)}% discount)` : ''}`).filter((s, k) => pt[k].p > 0).join(', ');
  function flowCaption(C, f) {
    const verb = f.dir === 'in' ? (f.pword === 'collected' || f.pword === 'received' ? 'collected' : 'received') : 'paid';
    if (f.pattern.length === 1 && f.pattern[0].p === 100 && !f.pattern[0].disc) return `**${f.name}** is ${verb} in the month itself: ${C.B.map((m, j) => `${m} ${inr(f.cash[j])}`).join(', ')}.`;
    const j0 = C.B.length - 1, t = C.hist + j0, src = f.pattern.map((pt, k) => (t - k >= 0 && pt.p > 0 && f.amounts[t - k] ? `${qf(pt.p)}% of ${C.months[t - k]}'s ${inr(f.amounts[t - k])}` : null)).filter(Boolean);
    let s = `**${f.name}** is ${verb} ${pctList(f.pattern)}. So ${C.B[j0]} ${f.dir === 'in' ? 'receives' : 'pays'} ${src.length ? src.join(' + ') : 'nothing'} = ${inr(f.cash[j0])}${f.disc.some(x => x > 0.005) ? ' after discount' : ''}.`;
    if (f.lost > 1e-6) s += ` The other ${qf(f.lost)}% is ${f.dir === 'in' ? 'never collected (bad debts)' : 'not paid within these months'}.`;
    if (f.disc.some(x => x > 0.005)) s += ` Cash discount allowed: ${C.B.map((m, j) => `${m} ${inr(f.disc[j])}`).join(', ')}: a cost, but no cash moves for it.`;
    return s;
  }
  function cashFrames(C) {
    const F = [{ caption: `A **cash budget** lists the cash expected in and out month by month, ${C.B[0]} to ${C.B[C.B.length - 1]}, starting from an opening balance of ${inr(C.open0)}. Only cash counts: depreciation and other non-cash items stay out; capital receipts and payments go in.`, view: [cashTable(C, 0, 0)] }];
    C.flows.forEach((f, i) => {
      const lag = !(f.pattern.length === 1 && f.pattern[0].p === 100 && !f.pattern[0].disc);
      F.push({ caption: flowCaption(C, f), view: (lag ? [noteTable(C, f)] : []).concat([cashTable(C, i + 1, 0)]) });
    });
    F.push({ caption: `Add up each month: **total receipts** ${C.B.map((m, j) => `${m} ${inr(C.rec[j])}`).join(', ')}; **total payments** ${C.B.map((m, j) => `${m} ${inr(C.pay[j])}`).join(', ')}.`, view: [cashTable(C, C.flows.length, 1)] });
    C.B.forEach((m, j) => F.push({ caption: `**${m}**: opening ${rs(C.opening[j])} + receipts ${rs(C.rec[j])} − payments ${rs(C.pay[j])} = closing **${rs(C.closing[j])}**${j < C.B.length - 1 ? `, which is ${C.B[j + 1]}'s opening balance` : ''}.${C.closing[j] < -0.005 ? ' A negative balance (in brackets) means an overdraft is needed.' : ''}`, view: [balTable(C, j + 1, false), cashTable(C, C.flows.length, j + 2)] }));
    if (C.minBal > 0 || C.short.some(x => x > 0.005)) {
      const worst = C.short.indexOf(Math.max(...C.short));
      F.push({ caption: C.short.some(x => x > 0.005) ? `${C.minBal > 0 ? `Against the minimum balance of ${inr(C.minBal)}` : 'Below zero'}, the business falls short in ${C.B.filter((_, j) => C.short[j] > 0.005).join(', ')}; the most it must borrow is **${inr(C.short[worst])}** (${C.B[worst]}). Arrange that finance before the month comes: that is the point of a cash budget.` : `Every closing balance stays above the minimum of ${inr(C.minBal)}: no borrowing is needed.`, view: [balTable(C, C.B.length, true), cashTable(C, C.flows.length, C.B.length + 2)] });
    }
    return F;
  }

  /* ================================================================== functional budgets: production -> material usage -> purchases */
  function functionalBudget(prod, bom, mats, o) {
    const P = (prod || []).map((r, i) => ({ name: String(r[0] || '').trim() || 'Product ' + (i + 1), sales: nz(r[1]), open: nz(r[2]), close: nz(r[3]) })).filter(p => p.sales || p.open || p.close);
    if (!P.length) throw new Error('Add at least one product with its budgeted sales.');
    if (new Set(P.map(p => p.name.toLowerCase())).size !== P.length) throw new Error('Give every product a different name.');
    P.forEach(p => { if (p.sales < 0 || p.open < 0 || p.close < 0) throw new Error(`${p.name}: sales and stocks cannot be negative.`); p.need = p.sales + p.close; p.prod = p.need - p.open; if (p.prod < -EPS) throw new Error(`${p.name}: the opening stock is more than sales plus closing stock, so production would be negative.`); });
    const Mt = (mats || []).map((r, i) => ({ name: String(r[0] || '').trim() || 'Material ' + (i + 1), price: nz(r[1]), open: nz(r[2]), close: nz(r[3]) }));
    if (!Mt.length) throw new Error('Add at least one material with its price.');
    if (new Set(Mt.map(m => m.name.toLowerCase())).size !== Mt.length) throw new Error('Give every material a different name.');
    const pk = new Map(P.map(p => [p.name.toLowerCase(), p])), mk = new Map(Mt.map(m => [m.name.toLowerCase(), m]));
    const use = {};                                                      // use[material][product] = quantity per unit
    (bom || []).forEach((r, i) => {
      const mn = String(r[0] || '').trim(), pn = String(r[1] || '').trim(), q = nz(r[2]);
      if (!mn && !pn && !q) return;
      const m = mk.get(mn.toLowerCase()), p = pk.get(pn.toLowerCase());
      if (!m) throw new Error(`Material per unit, row ${i + 1}: "${mn}" is not in the materials table.`);
      if (!p) throw new Error(`Material per unit, row ${i + 1}: "${pn}" is not in the products table.`);
      if (q < 0) throw new Error(`Material per unit, row ${i + 1}: the quantity cannot be negative.`);
      use[m.name] = use[m.name] || {}; use[m.name][p.name] = (use[m.name][p.name] || 0) + q;
    });
    const closePct = nz(o.closePct);
    Mt.forEach(m => {
      m.per = P.map(p => (use[m.name] && use[m.name][p.name]) || 0); m.usage = P.map((p, j) => p.prod * m.per[j]); m.totalUse = sum(m.usage);
      if (closePct > 0) m.close = (m.totalUse * closePct) / 100;
      m.need = m.totalUse + m.close; m.buy = m.need - m.open; m.value = m.buy * m.price;
      if (m.buy < -EPS) throw new Error(`${m.name}: the opening stock covers more than usage plus closing stock, so purchases would be negative.`);
    });
    return { P, M: Mt, closePct, value: sum(Mt, m => m.value) };
  }
  function prodTable(R, k) {
    const head = ['Particulars'].concat(R.P.map(p => p.name)), cells = {};
    const rows = [['Budgeted sales'].concat(R.P.map(p => qf(p.sales)))];
    if (k >= 1) rows.push(['Add: closing stock'].concat(R.P.map(p => qf(p.close))), ['Total requirement'].concat(R.P.map(p => qf(p.need))));
    if (k >= 2) { rows.push(['Less: opening stock'].concat(R.P.map(p => '(' + qf(p.open) + ')')), ['**Production**'].concat(R.P.map(p => `**${qf(p.prod)}**`))); R.P.forEach((p, j) => (cells['4,' + (j + 1)] = 'hl')); }
    return { type: 'table', title: 'Production budget (units)', head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  function useTable(R, n) {
    const head = ['Material'].concat(R.P.map(p => p.name + ' (qty × per unit)'), ['Total usage']), cells = {};
    const rows = R.M.map(m => [m.name].concat(R.P.map((p, j) => (j < n ? (m.per[j] ? `${qf(p.prod)} × ${qf(m.per[j])} = ${qf(m.usage[j])}` : '—') : '')), [n >= R.P.length ? `**${qf(m.totalUse)}**` : '']));
    if (n > 0) R.M.forEach((m, i) => (cells[i + ',' + n] = 'hl'));
    return { type: 'table', title: 'Material usage budget (quantity)', head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  function buyTable(R, k) {
    const head = ['Particulars'].concat(R.M.map(m => m.name)), cells = {};
    const rows = [['Usage in production'].concat(R.M.map(m => qf(m.totalUse)))];
    if (k >= 1) rows.push([R.closePct > 0 ? `Add: closing stock (${qf(R.closePct)}% of usage)` : 'Add: closing stock'].concat(R.M.map(m => qf(m.close))), ['Total requirement'].concat(R.M.map(m => qf(m.need))));
    if (k >= 2) { rows.push(['Less: opening stock'].concat(R.M.map(m => '(' + qf(m.open) + ')')), ['**Quantity to buy**'].concat(R.M.map(m => `**${qf(m.buy)}**`))); R.M.forEach((m, j) => (cells['4,' + (j + 1)] = 'hl')); }
    if (k >= 3) { rows.push(['Price ₹'].concat(R.M.map(m => qf(m.price))), ['**Purchase cost ₹**'].concat(R.M.map(m => `**${qf(m.value)}**`))); R.M.forEach((m, j) => (cells['6,' + (j + 1)] = 'ok')); }
    return { type: 'table', title: `Material purchase budget${k >= 3 ? ` (total ${inr(R.value)})` : ''}`, head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  function funcFrames(R) {
    const F = [];
    F.push({ caption: `Budgets follow the **key factor**, here sales. Start the **production budget** with the units to be sold: ${R.P.map(p => `${p.name} ${qf(p.sales)}`).join(', ')}.`, view: [prodTable(R, 0)] });
    F.push({ caption: `Add the **closing stock** wanted at the end: those units must be made too. ${R.P.map(p => `${p.name} ${qf(p.sales)} + ${qf(p.close)} = ${qf(p.need)}`).join('; ')}.`, view: [prodTable(R, 1)] });
    F.push({ caption: `Less the **opening stock**, already made: **production = sales + closing stock − opening stock**. ${R.P.map(p => `${p.name} ${qf(p.need)} − ${qf(p.open)} = ${qf(p.prod)}`).join('; ')}.`, view: [prodTable(R, 2)] });
    R.P.forEach((p, j) => F.push({ caption: `**Material usage** for ${p.name}: its production × the material per unit. ${R.M.filter(m => m.per[j]).map(m => `${m.name} ${qf(p.prod)} × ${qf(m.per[j])} = ${qf(m.usage[j])}`).join('; ') || 'it uses none of these materials'}.`, view: [prodTable(R, 2), useTable(R, j + 1)] }));
    F.push({ caption: `The **purchase budget** starts from the total usage: ${R.M.map(m => `${m.name} ${qf(m.totalUse)}`).join(', ')}; add the closing stock of material${R.closePct > 0 ? ` (${qf(R.closePct)}% of usage)` : ''}.`, view: [useTable(R, R.P.length), buyTable(R, 1)] });
    F.push({ caption: `Less the opening stock: **purchases = usage + closing stock − opening stock**. ${R.M.map(m => `${m.name} ${qf(m.need)} − ${qf(m.open)} = ${qf(m.buy)}`).join('; ')}.`, view: [useTable(R, R.P.length), buyTable(R, 2)] });
    F.push({ caption: `Value the purchases at their prices: ${R.M.map(m => `${m.name} ${qf(m.buy)} × ${inrU(m.price)} = ${inr(m.value)}`).join('; ')}. Total purchases **${inr(R.value)}**, which feed the cash budget as payments to suppliers.`, view: [buyTable(R, 3), prodTable(R, 2)] });
    return F;
  }

  /* ================================================================== compute */
  const MODES = [['flexible', 'Flexible budget'], ['cash', 'Cash budget'], ['functional', 'Production and purchases']];
  let lastMode = 'flexible';
  function compute(v) {
    const mode = MODES.some(m => m[0] === v.mode) ? v.mode : 'flexible';
    let res;
    if (mode === 'flexible') {
      const R = flexibleBudget(v.lines, { cap: v.cap, base: v.base, price: v.price, levels: v.levels, unit: v.unit, actLevel: v.actLevel });
      const L = R.levels, lo = 0, hi = L.length - 1, u = R.unit.replace(/s$/, '');
      const stats = [{ label: `Total cost at ${lvHead(R, L[lo])}`, value: inr(R.total[lo]) }];
      if (hi > lo) stats.push({ label: `Total cost at ${lvHead(R, L[hi])}`, value: inr(R.total[hi]) });
      stats.push({ label: `Cost per ${u} at ${lvHead(R, L[lo])}`, value: inrU(R.perUnit[lo]), hint: 'total cost ÷ activity' });
      if (hi > lo) stats.push({ label: `Cost per ${u} at ${lvHead(R, L[hi])}`, value: inrU(R.perUnit[hi]), hint: 'total cost ÷ activity' });
      if (R.sales) stats.push({ label: `Profit at ${lvHead(R, L[hi])}`, value: inr(R.profit[hi]), hint: 'sales − total cost', tone: R.profit[hi] >= 0 ? 'ok' : 'bad' });
      if (R.actual) stats.push({ label: 'Actual against flexible budget', value: Math.abs(R.actual.diff) < 0.005 ? 'Nil' : `${inr(Math.abs(R.actual.diff))} ${R.actual.diff > 0 ? 'F' : 'A'}`, hint: 'flexible budget at the actual activity − actual cost', tone: R.actual.diff < -0.005 ? 'bad' : 'ok' });
      res = { frames: flexFrames(R), sim: { mode, R }, stats: stats.slice(0, 6),
        table: { head: ['Cost line', 'Fixed part ₹', 'Variable ₹ a unit', 'How it was read'], rows: R.lines.map(l => [l.name, l.kind === 'fixed' || (l.kind === 'semi' && l.split === 'steps') ? qf(l.amount) + (l.steps.length ? ' (steps)' : '') : l.kind === 'semi' ? qf(l.fixed) : l.kind === 'step' ? 'steps' : '0', l.kind === 'variable' || l.kind === 'sales' || (l.kind === 'semi' && l.split !== 'steps') ? qf(l.rate) : '0', KIND[l.kind] + (l.split === 'highlow' ? ', high-low' : l.split === 'pct' ? `, ${qf(l.fixedPct)}% fixed` : l.split === 'amount' ? ', fixed part given' : '')]) },
        note: '**Conventions.** Fixed costs stay the same at every level unless a step-up is typed. A semi-variable cost is split into its fixed part and a variable rate a unit before it is flexed. A step cost is charged for every block begun (a part of a block costs a whole one). Percentages of sales are variable costs at a constant selling price.' };
    } else if (mode === 'cash') {
      const C = cashBudget(v.flows, { months: v.months, hist: v.hist, open: v.open, minBal: v.minBal });
      const n = C.B.length, lowI = C.closing.indexOf(Math.min(...C.closing));
      const stats = [{ label: `Closing balance, ${C.B[n - 1]}`, value: inr(C.closing[n - 1]), tone: C.closing[n - 1] < -0.005 ? 'bad' : 'ok' },
        { label: `Lowest closing balance (${C.B[lowI]})`, value: inr(C.closing[lowI]), tone: C.closing[lowI] < -0.005 ? 'bad' : '' },
        { label: 'Total receipts', value: inr(sum(C.rec)) }, { label: 'Total payments', value: inr(sum(C.pay)) }];
      if (C.minBal > 0 || C.short.some(x => x > 0.005)) stats.push({ label: C.minBal > 0 ? 'Most borrowing needed' : 'Largest overdraft', value: inr(Math.max(...C.short)), hint: C.minBal > 0 ? 'minimum balance − closing balance' : 'cash below zero', tone: Math.max(...C.short) > 0.005 ? 'bad' : 'ok' });
      res = { frames: cashFrames(C), sim: { mode, C }, stats,
        table: { head: ['Month', 'Receipts', 'Payments', 'Closing balance'], rows: C.B.map((m, j) => [m, qf(C.rec[j]), qf(C.pay[j]), (C.closing[j] < -0.005 ? '−' : '') + qf(Math.abs(C.closing[j]))]) },
        note: `**Conventions.** A pattern gives the % of each month's amount paid in that month, the next month and so on; what it leaves out of 100% is never received (bad debts) or falls outside these months. A discount reduces the cash of that part. The first ${plural(C.hist, 'month')} only feed the lags; the budget runs ${C.B[0]} to ${C.B[n - 1]}.` };
    } else {
      const R = functionalBudget(v.fProd, v.fBom, v.fMat, { closePct: v.fClosePct });
      const stats = R.P.slice(0, 3).map(p => ({ label: `Production of ${p.name}`, value: qf(p.prod) + ' units', hint: 'sales + closing − opening stock' }))
        .concat(R.M.slice(0, 2).map(m => ({ label: `${m.name} to buy`, value: qf(m.buy), hint: 'usage + closing − opening stock' })), [{ label: 'Total purchase cost', value: inr(R.value) }]).slice(0, 6);
      res = { frames: funcFrames(R), sim: { mode, F: R }, stats,
        table: { head: ['Material', 'Usage', 'To buy', 'Cost ₹'], rows: R.M.map(m => [m.name, qf(m.totalUse), qf(m.buy), qf(m.value)]) },
        note: '**Conventions.** Production = sales + closing stock − opening stock of finished goods. Purchases = usage + closing stock − opening stock of materials. Closing material stock is taken from the table unless a % of usage is given.' };
    }
    lastMode = mode;
    return res;
  }

  /* ================================================================== presets */
  const TAPRI_FLEX = ['Potatoes and flour: variable 6', 'Frying oil: variable 2', "Cooks' wages: variable 3", 'Gas and power: semi 160000, 25% fixed',
    'Maintenance: semi 50000, 58000 at 100000', 'Factory rent: fixed 120000', 'Supervisors: fixed 80000, +25% above 90%', 'Delivery vans: step 15000 per 25000'].join('\n');
  const TAPRI_CASH = ['Sales: in 20,00,000 22,00,000 25,00,000 30,00,000 45,00,000 28,00,000; collected 20 (2% discount) 50 28',
    'Purchases: out 12,00,000 13,00,000 15,00,000 22,00,000 14,00,000 12,00,000; paid 0 60 40', 'Wages: out 3,00,000 3,00,000 3,20,000 3,60,000 4,00,000 3,40,000; paid 75 25',
    'Overheads: out 2,00,000 2,00,000 2,20,000 2,40,000 2,60,000 2,20,000; paid 0 100', 'Diwali advertising: out Sep 4,00,000', 'Kulhad kiln: out Oct 12,00,000'].join('\n');
  const TAPRI_FUNC = { fProd: [['Masala', 40000, 6000, 8000], ['Elaichi', 25000, 5000, 3000]], fBom: [['Tea', 'Masala', 0.4], ['Tea', 'Elaichi', 0.35], ['Milk', 'Masala', 0.5], ['Milk', 'Elaichi', 0.55], ['Spices', 'Masala', 0.1], ['Spices', 'Elaichi', 0.1]],
    fMat: [['Tea', 300, 2000, 0], ['Milk', 200, 3000, 0], ['Spices', 900, 800, 0]], fClosePct: 10 };
  const DEF = Object.assign({ mode: 'flexible', unit: 'samosas', cap: 100000, base: 80000, levels: '60%, 80%, 100%', price: 20, actLevel: 0, lines: TAPRI_FLEX,
    months: 'Jun Jul Aug Sep Oct Nov', hist: 2, open: 200000, minBal: 100000, flows: TAPRI_CASH }, TAPRI_FUNC);
  const flex = (o, lines) => Object.assign({ mode: 'flexible', unit: 'units', cap: 0, base: 0, price: 0, actLevel: 0 }, o, { lines: lines.join('\n') });
  const presets = [
    { label: 'Tapri samosa factory: flexible budget at 60%, 80% and 100%', values: Object.assign({}, DEF, { mode: 'flexible' }) },
    { label: 'Tapri Tea Co.: cash budget for the Diwali season', values: Object.assign({}, DEF, { mode: 'cash' }) },
    { label: 'Tapri Tea Co.: production and purchase budget for two premixes', values: Object.assign({}, DEF, { mode: 'functional' }) },
    { label: 'ICAI PYQ September 2024, Q3(b) (Savi Ltd): flexible budget at 60%, 80% and 100%', values: flex({ cap: 120000, base: 96000, levels: '60%, 80%, 100%', price: 120 },
      ['Direct variable cost: variable 20', 'Factory overheads: semi 8,40,000, 20% fixed', 'Administrative overheads: fixed 20,60,000', 'Sales commission: 2% of sales', 'Transportation: step 4000 per 4000']) },
    { label: 'ICAI PYQ May 2025, Q5(c): a college trip for 300 to 1,200 students', values: flex({ unit: 'students', levels: '300 600 900 1200' },
      ['Breakfast: variable 55', 'Lunch: variable 120', 'Evening tea and snacks: variable 40', 'Zoo entrance: variable 25', 'Bus hire: step 6000 per 50', 'Special permit fees: step 500 per 50',
        "Teachers' allowance: step 2000 per 50", 'Museum block entrance: fixed 2000, 3000 above 300, 3500 above 900', 'Prizes: fixed 2200, 2400 above 300, 2500 above 900']) },
    { label: 'ICAI MTP May 2025 Series II, Q5(b) (Bricks & Cement): cash budget for July to September', values: { mode: 'cash', months: 'Apr May Jun Jul Aug Sep', hist: 3, open: 135000, minBal: 0, flows: [
      'Cash sales: in 5,40,000 5,40,000 5,85,000 6,75,000 7,20,000 8,10,000', 'Credit sales: in 22,50,000 22,50,000 22,50,000 23,40,000 23,40,000 25,20,000; collected 0 80 10 8',
      'Credit purchases: out 15,30,000 16,20,000 16,20,000 18,00,000 18,00,000 18,00,000; paid 0 75 25', 'Other operating costs: out 8,10,000 8,10,000 8,10,000 10,98,000 11,07,000 11,07,000',
      'Pallet jacks: out Jul 9,00,000; paid 0 25 25 25 25'].join('\n') } },
    { label: 'ICAI MTP January 2025 Series I, Q4(b) (Anu Ltd, toys made two months before sale): cash budget for January to June', values: { mode: 'cash', months: 'Nov Dec Jan Feb Mar Apr May Jun', hist: 2, open: 50000, minBal: 0, flows: [
      'Credit sales: in 30,00,000 30,00,000 30,00,000 37,50,000 45,00,000 60,00,000 57,00,000 66,00,000; collected 0 50 50',
      'Materials for the month\'s production: out 10,00,000 12,50,000 15,00,000 20,00,000 19,00,000 22,00,000 22,00,000 23,00,000; paid 0 0 100',
      'Variable overheads of production: out 4,00,000 5,00,000 6,00,000 8,00,000 7,60,000 11,00,000 11,00,000 11,50,000; paid 0 100',
      'Wages of production: out 8,00,000 10,00,000 12,00,000 16,00,000 19,00,000 22,00,000 22,00,000 23,00,000; paid 75 25',
      'Sale of freehold property: in Jun 20,00,000', 'New machine: out Jun 5,00,000', 'Corporation tax: out Mar 1,00,000'].join('\n') } },
    { label: 'ICAI MTP May 2025 Series I, Q4(b): products X and Y, materials A and B', values: { mode: 'functional', fProd: [['X', 64000, 0, 2000], ['Y', 112000, 4000, 0]],
      fBom: [['A', 'X', 24], ['A', 'Y', 12], ['B', 'X', 12], ['B', 'Y', 9]], fMat: [['A', 18.75, 180000, 0], ['B', 27, 120000, 0]], fClosePct: 5 } },
    { label: 'Study Material Illustration 1: semi-variable costs that step up above 85% and 95%', values: flex({ unit: 'hours', cap: 10000, base: 7000, levels: '70%, 80%, 90%, 100%' },
      ['Variable expenses: variable 1260 in total', 'Semi-variable expenses: semi 1200, +10% above 85%, +20% above 95%', 'Fixed expenses: fixed 1800']) },
    { label: 'Study Material Illustration 3 (Action Plan Manufacturers): January at 6,000 units against actual', values: flex({ base: 8000, levels: '6000 8000 10000', actLevel: 6000 },
      ['Salary of foreman: fixed 1000, actual 1000', 'Indirect labour: variable 720 in total, actual 600', 'Indirect material: variable 800 in total, actual 700', 'Repairs and maintenance: semi 600, 650 at 10000, actual 600',
        'Power: semi 800, 875 at 10000, actual 740', 'Tools consumed: variable 320 in total, actual 300', 'Rates and taxes: fixed 150, actual 150', 'Depreciation: fixed 800, actual 800', 'Insurance: fixed 100, actual 100']) },
    { label: 'Study Material practical problem 3 (K Ltd): bags of X, two raw materials and empty bags', values: { mode: 'functional', fProd: [['X', 150000, 45000, 33000]],
      fBom: [['Y', 'X', 2.5], ['Z', 'X', 7.5], ['Empty bag', 'X', 1]], fMat: [['Y', 160, 96000, 78000], ['Z', 30, 171000, 141000], ['Empty bag', 110, 111000, 84000]], fClosePct: 0 } }
  ];

  /* ================================================================== challenge */
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  function genFlex(r) {
    const cap = pick(r, [10000, 20000, 50000, 100000]), basePct = pick(r, [60, 70, 80]), base = (cap * basePct) / 100;
    const levels = pick(r, [[60, 80, 100], [50, 75, 100], [70, 80, 90], [60, 70, 80, 90]]);
    const lines = [`Direct materials: variable ${ri(r, 4, 40)}`, `Direct labour: variable ${ri(r, 2, 20)}`];
    const semiFixed = ri(r, 2, 9) * 10000, semiRate = ri(r, 1, 6);
    lines.push(r() < 0.5 ? `Power: semi ${semiFixed + semiRate * base}, ${semiFixed + semiRate * cap} at ${cap}` : `Maintenance: semi ${semiFixed + semiRate * base}, fixed ${semiFixed}`);
    lines.push(`Rent and salaries: fixed ${ri(r, 5, 30) * 10000}`);
    if (r() < 0.5) lines.push(`Delivery: step ${ri(r, 2, 8) * 1000} per ${cap / 10}`);
    const ask = pick(r, ['total', 'total', 'semi', 'unit']);
    const at = pick(r, levels);
    return { mode: 'flexible', unit: 'units', cap, base, levels: levels.map(x => x + '%').join(', '), price: 0, actLevel: 0, lines: lines.join('\n'), ask, askAt: at };
  }
  function genCash(r) {
    const months = 'Jan Feb Mar Apr May', hist = 2;
    const s = Array.from({ length: 5 }, () => ri(r, 20, 60) * 10000), pu = Array.from({ length: 5 }, () => ri(r, 10, 40) * 10000), wg = Array.from({ length: 5 }, () => ri(r, 4, 12) * 10000);
    const cashP = pick(r, [0, 10, 20]), l1 = pick(r, [40, 50, 60]), l2 = 100 - cashP - l1;
    const flows = [`Sales: in ${s.join(' ')}; collected ${cashP} ${l1} ${l2}`, `Purchases: out ${pu.join(' ')}; paid ${pick(r, ['0 100', '0 50 50', '0 60 40'])}`, `Wages: out ${wg.join(' ')}; paid ${pick(r, ['100', '75 25', '50 50'])}`];
    if (r() < 0.6) flows.push(`Machinery: out ${pick(r, ['Mar', 'Apr', 'May'])} ${ri(r, 5, 30) * 10000}`);
    if (r() < 0.4) flows.push(`Sale of old van: in ${pick(r, ['Mar', 'Apr'])} ${ri(r, 2, 10) * 10000}`);
    return { mode: 'cash', months, hist, open: ri(r, 0, 20) * 10000, minBal: 0, flows: flows.join('\n'), ask: pick(r, ['close', 'close', 'sales']), askAt: ri(r, 0, 2) };
  }
  function genFunc(r) {
    const n = ri(r, 1, 2), names = ['P', 'Q'];
    const fProd = Array.from({ length: n }, (_, i) => { const sales = ri(r, 10, 80) * 1000; return [names[i], sales, ri(r, 1, 10) * 500, ri(r, 1, 10) * 500]; });
    const mats = ['M', 'N'], fBom = [], fMat = mats.map(m => [m, ri(r, 2, 40) * 5, ri(r, 1, 20) * 1000, ri(r, 1, 20) * 1000]);
    mats.forEach(m => fProd.forEach(p => fBom.push([m, p[0], ri(r, 1, 6)])));
    fProd.forEach(p => { if (p[2] > p[1] + p[3]) p[2] = p[1]; });
    return { mode: 'functional', fProd, fBom, fMat, fClosePct: 0, ask: pick(r, ['prod', 'buy', 'value']), askAt: 0 };
  }
  function answerOf(res, v) {
    const S = res.sim;
    if (S.mode === 'flexible') {
      const R = S.R, i = R.levels.findIndex(lv => Math.abs(lv.pct - v.askAt) < 1e-6);
      if (i < 0) return undefined;
      if (v.ask === 'semi') { const l = R.lines.find(x => x.kind === 'semi'); return l ? l.at[i] : R.total[i]; }
      if (v.ask === 'unit') return Math.round(R.perUnit[i] * 100) / 100;
      return R.total[i];
    }
    if (S.mode === 'cash') { const C = S.C; return v.ask === 'sales' ? C.flows[0].cash[v.askAt] : C.closing[v.askAt]; }
    const F = S.F;
    return v.ask === 'prod' ? F.P[0].prod : v.ask === 'buy' ? F.M[0].buy : F.value;
  }
  function askText(res, v) {
    const S = res.sim;
    if (S.mode === 'flexible') {
      const l = S.R.lines.find(x => x.kind === 'semi');
      return v.ask === 'semi' ? `the budgeted **${l.name.toLowerCase()}** at **${v.askAt}%** of capacity` : v.ask === 'unit' ? `the budgeted **cost per unit** at **${v.askAt}%** of capacity (two decimals)` : `the budgeted **total cost** at **${v.askAt}%** of capacity`;
    }
    if (S.mode === 'cash') return v.ask === 'sales' ? `the cash **received from sales in ${S.C.B[v.askAt]}**` : `the **closing cash balance at the end of ${S.C.B[v.askAt]}** (negative for an overdraft)`;
    return v.ask === 'prod' ? `the **production of ${S.F.P[0].name}** in units` : v.ask === 'buy' ? `the **quantity of ${S.F.M[0].name} to buy**` : 'the **total cost of material purchases** in ₹';
  }

  const def = {
    id: 'budget', title: 'Budget Lab',
    blurb: 'Build a flexible budget at several activity levels, a month-by-month cash budget with lags, or a purchase budget.',
    controls: [
      { id: 'mode', type: 'select', label: 'Budget', value: 'flexible', options: MODES },
      { id: 'unit', type: 'text', label: 'Activity measured in', short: 'Activity in', value: DEF.unit, show: v => v.mode === 'flexible' },
      { id: 'cap', type: 'number', label: 'Activity at 100% capacity (0 = levels in units only)', short: 'Capacity', value: DEF.cap, min: 0, max: 1e12, step: 'any', show: v => v.mode === 'flexible' },
      { id: 'base', type: 'number', label: 'Activity at which the costs are given (0 = not needed)', short: 'Costs given at', value: DEF.base, min: 0, max: 1e12, step: 'any', show: v => v.mode === 'flexible',
        help: 'The level the given figures belong to, e.g. 96000 for "currently working at 80%, 96,000 units". Semi-variable splits and "in total" variable costs use it.' },
      { id: 'levels', type: 'text', label: 'Budget at these levels (% of capacity, or units)', short: 'Levels', value: DEF.levels, placeholder: 'e.g. 60%, 80%, 100%  or  300 600 900', show: v => v.mode === 'flexible' },
      { id: 'price', type: 'number', label: 'Selling price a unit (0 = costs only)', short: 'Price', value: DEF.price, min: 0, max: 1e9, step: 'any', show: v => v.mode === 'flexible' },
      { id: 'lines', type: 'textarea', label: 'Cost lines: "item: how it behaves", one a line', short: 'Costs', rows: 9, value: DEF.lines, show: v => v.mode === 'flexible',
        help: 'variable 20 (₹ a unit) or variable 720 in total · semi 840000, 20% fixed · semi 600, fixed 400 · semi 800, 875 at 10000 (high-low) · fixed 120000, +25% above 90% · fixed 2000, 3000 above 300 (slabs) · step 6500 per 50 · 2% of sales · add ", actual 600" to compare with actual.' },
      { id: 'actLevel', type: 'number', label: 'Actual activity, to compare actual costs (0 = no comparison)', short: 'Actual activity', value: DEF.actLevel, min: 0, max: 1e12, step: 'any', show: v => v.mode === 'flexible' },
      { id: 'months', type: 'text', label: 'Months, earliest first (the first ones feed the lags)', short: 'Months', value: DEF.months, show: v => v.mode === 'cash' },
      { id: 'hist', type: 'number', label: 'How many of them come before the budget', short: 'Months before the budget', value: DEF.hist, min: 0, max: 11, show: v => v.mode === 'cash' },
      { id: 'flows', type: 'textarea', label: 'Receipts and payments: "item: in or out, amounts; pattern"', short: 'Flows', rows: 8, value: DEF.flows, show: v => v.mode === 'cash',
        help: 'Amounts for every month in order (Sales: in 20,00,000 22,00,000 …) or by month (Tax: out Mar 1,00,000). Then the % paid in the month, the next, …: "; collected 0 80 10 8" (the rest is bad debts), "; paid 75 25", "; collected 20 (2% discount) 50 30".' },
      { id: 'open', type: 'number', label: 'Opening cash balance (₹, negative for an overdraft)', short: 'Opening balance', value: DEF.open, min: -1e12, max: 1e12, step: 'any', show: v => v.mode === 'cash' },
      { id: 'minBal', type: 'number', label: 'Minimum cash balance to keep (₹, 0 = none)', short: 'Minimum balance', value: DEF.minBal, min: 0, max: 1e12, step: 'any', show: v => v.mode === 'cash' },
      { id: 'fProd', type: 'table', label: 'Products: sales and finished stock (units)', short: 'Products', max: 4, show: v => v.mode === 'functional', rows: DEF.fProd.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Product', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'sales', label: 'Sales', type: 'number', min: 0, max: 1e12, def: 1000 }, { id: 'open', label: 'Opening', type: 'number', min: 0, max: 1e12, def: 0 }, { id: 'close', label: 'Closing', type: 'number', min: 0, max: 1e12, def: 0 }] },
      { id: 'fBom', type: 'table', label: 'Material per unit of product', short: 'Material per unit', max: 12, show: v => v.mode === 'functional', rows: DEF.fBom.map(r => r.slice()),
        cols: [{ id: 'mat', label: 'Material', type: 'text', auto: () => '' }, { id: 'prod', label: 'Product', type: 'text', auto: () => '' }, { id: 'qty', label: 'Qty a unit', type: 'number', min: 0, max: 1e9, def: 1 }] },
      { id: 'fMat', type: 'table', label: 'Materials: price and stock', short: 'Materials', max: 5, show: v => v.mode === 'functional', rows: DEF.fMat.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Material', type: 'text', auto: n => 'M' + (n + 1) }, { id: 'price', label: 'Price ₹', type: 'number', min: 0, max: 1e9, def: 10 }, { id: 'open', label: 'Opening', type: 'number', min: 0, max: 1e12, def: 0 }, { id: 'close', label: 'Closing', type: 'number', min: 0, max: 1e12, def: 0 }] },
      { id: 'fClosePct', type: 'number', label: 'Closing material stock as % of usage (0 = as in the table)', short: 'Closing material % of usage', value: DEF.fClosePct, min: 0, max: 500, step: 'any', show: v => v.mode === 'functional' }
    ],
    presets, compute,
    challenge: {
      title: 'Find a budgeted figure',
      gen: r => (lastMode === 'cash' ? genCash(r) : lastMode === 'functional' ? genFunc(r) : genFlex(r)),
      prompt: (v, res) => `Find ${askText(res, v)} from the data shown.${v.mode === 'cash' ? ' Type a negative balance with a minus sign.' : ''}`,
      solve: (res, v) => answerOf(res, v),
      tol: 1, unit: '', kind: 'num', signed: (v) => v.mode === 'cash',
      view: (res, v) => {
        if (v.mode === 'flexible') return [{ type: 'table', title: `Costs at ${qf(v.base)} units (capacity ${qf(v.cap)} units)`, head: ['Cost line'], rows: String(v.lines).split('\n').map(x => [x]) }];
        if (v.mode === 'cash') return [{ type: 'table', title: `Months ${v.months} (the first ${v.hist} only feed the lags); opening balance ${inr(v.open)}`, head: ['Receipt or payment'], rows: String(v.flows).split('\n').map(x => [x]) }];
        return [{ type: 'table', title: 'Products (units)', head: ['Product', 'Sales', 'Opening stock', 'Closing stock'], rows: v.fProd.map(p => [p[0], qf(p[1]), qf(p[2]), qf(p[3])]) },
          { type: 'table', title: 'Material per unit', head: ['Material', 'Product', 'Quantity'], rows: v.fBom.map(b => [b[0], b[1], qf(b[2])]) },
          { type: 'table', title: 'Materials', head: ['Material', 'Price ₹', 'Opening stock', 'Closing stock'], rows: v.fMat.map(m => [m[0], qf(m[1]), qf(m[2]), qf(m[3])]) }];
      },
      explain(res, v) {
        const S = res.sim;
        if (S.mode === 'flexible') {
          const R = S.R, i = R.levels.findIndex(lv => Math.abs(lv.pct - v.askAt) < 1e-6), x = R.levels[i].units;
          return `At ${v.askAt}% the activity is ${qf(x)} units. ` + R.lines.map(l => `${l.name} ${inr(l.at[i])}`).join(', ') + `: total ${inr(R.total[i])}, ${inrU(R.perUnit[i])} a unit.` + (R.lines.find(l => l.kind === 'semi' && l.split !== 'steps') ? ` (${R.lines.filter(l => l.kind === 'semi').map(l => `${l.name}: fixed ${inr(l.fixed)} + ${inrU(l.rate)} a unit`).join('; ')}.)` : '');
        }
        if (S.mode === 'cash') {
          const C = S.C, j = v.askAt;
          if (v.ask === 'sales') return flowCaption(Object.assign({}, C, { B: C.B.slice(0, j + 1) }), Object.assign({}, C.flows[0], { cash: C.flows[0].cash.slice(0, j + 1) })).replace(/\*\*/g, '');
          return C.B.slice(0, j + 1).map((m, k) => `${m}: ${rs(C.opening[k])} + ${rs(C.rec[k])} − ${rs(C.pay[k])} = ${rs(C.closing[k])}`).join('; ') + '.';
        }
        const F = S.F;
        return `Production of ${F.P[0].name} = ${qf(F.P[0].sales)} + ${qf(F.P[0].close)} − ${qf(F.P[0].open)} = ${qf(F.P[0].prod)}. ` + F.M.map(m => `${m.name}: usage ${qf(m.totalUse)} + ${qf(m.close)} − ${qf(m.open)} = ${qf(m.buy)} × ${inrU(m.price)} = ${inr(m.value)}`).join('; ') + `; total ${inr(F.value)}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { flexibleBudget, cashBudget, functionalBudget, parseLine, parseFlow, parseLevels, parsePattern, compute, def };
  g.__lab_def_budget = def;
})(typeof window !== 'undefined' ? window : globalThis);
