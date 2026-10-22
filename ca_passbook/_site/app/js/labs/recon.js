/* PassBook — Cost-Financial Reconciliation Lab (cma.sys.recon; ICAI Study Material Paper 4, Chapter 7 §4).
   Pure and Node-testable (`require('app/js/labs/recon.js')` exposes the helpers and compute). Each item is entered the way questions give
   it: what it is (an expense or charge, an income, the opening stock or the closing stock) and its amount in the cost accounts and in the
   financial accounts (0 where an account does not have it). Its effect on the financial profit, measured from the costing profit, is
     expense or charge   cost − financial      (charged more in the financial accounts → the financial profit is lower)
     income              financial − cost
     opening stock       cost − financial      (a bigger opening stock means a bigger cost of sales)
     closing stock       financial − cost      (a bigger closing stock means a smaller cost of sales)
   Three layouts, as the Study Material and ICAI's answers use them: a reconciliation statement from the profit as per cost accounts
   (Add / Less), the same from the profit as per financial accounts (the signs reverse), and a Memorandum Reconciliation Account. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : '₹' + n);

  function num(x) {
    if (typeof x === 'number') return x;
    const s = String(x == null ? '' : x).replace(/[₹,\s]/g, '').replace(/[−–]/g, '-').replace(/^\((.*)\)$/, '-$1');
    return s === '' ? NaN : Number(s);
  }
  const num0 = x => { const n = num(x); return Number.isFinite(n) ? n : 0; };
  const clean = x => (Math.abs(x) < 1e-9 ? 0 : x);
  const r2 = x => clean(Math.round(x * 100 + 1e-7 * Math.sign(x)) / 100);
  /** an amount in a statement: Indian grouping; a loss in brackets, as ICAI prints it */
  const amt = x => { const v = clean(x); const s = Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: 2 }); return v < 0 ? `(${s})` : s; };
  const signed = x => (x < 0 ? '−' : '') + inr(Math.abs(x)).replace('−', '');
  const sum = a => a.reduce((s, x) => s + x, 0);

  /* ================================================================== items */
  const KINDS = { E: 'expense or charge', I: 'income', OS: 'opening stock', CS: 'closing stock' };
  /** the kind typed in the table: E / I / OS / CS, or words (expense, overhead, income, opening, closing …) */
  function kindOf(x) {
    const s = String(x == null ? '' : x).trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!s) return null;
    const st = w => s.startsWith(w);
    if (s === 'os' || s === 'o' || st('open')) return 'OS';
    if (s === 'cs' || s === 'c' || st('clos')) return 'CS';
    if (s === 'i' || ['inc', 'gain', 'rev', 'cr'].some(st)) return 'I';
    if (s === 'e' || ['exp', 'charge', 'cost', 'loss', 'oh', 'overhead', 'dep', 'debit', 'dr'].some(st)) return 'E';
    return null;
  }
  /** one row [item, kind, in cost accounts ₹, in financial accounts ₹] → {name, kind, cost, fin, d}: d = its effect on the financial profit
      measured from the costing profit */
  function parseItems(rows) {
    const out = [];
    (rows || []).forEach((r, i) => {
      const name = String(r && r[0] != null ? r[0] : '').trim(), cost = num0(r[2]), fin = num0(r[3]);
      if (!name && !cost && !fin) return;
      const kind = kindOf(r[1]);
      if (!kind) throw new Error(`Item ${i + 1}${name ? ` (${name})` : ''}: its kind must be E (expense or charge), I (income), OS (opening stock) or CS (closing stock).`);
      if (cost < 0 || fin < 0) throw new Error(`Item ${i + 1} (${name || 'unnamed'}): enter amounts as positive figures; the kind decides the sign.`);
      const d = r2(kind === 'E' || kind === 'OS' ? cost - fin : fin - cost);
      out.push({ i, name: name || `Item ${i + 1}`, kind, cost, fin, d });
    });
    return out;
  }
  /** why an item moves the profit, in words (the Study Material's causes of difference, §4.1); starts in lower case, after the item's name */
  function reason(it) {
    const { kind, cost, fin, name } = it, diff = Math.abs(cost - fin);
    const told = /\b(under|over)[-\s]?(absorb|recover|charg|valu)|undercharg|overcharg|overvalu|undervalu/i.test(name);   // the name already says which way
    const both = `${inr(cost)} in the cost accounts, ${inr(fin)} in the financial accounts`;
    const oh = /overhead|\boh\b|expenses/i.test(name);
    if (kind === 'E') {
      if (told) return fin > cost ? `the financial accounts carry ${inr(diff)} more of it than the cost accounts, so the financial profit is lower` : `the cost accounts carry ${inr(diff)} more of it than the financial accounts, so the financial profit is higher`;
      if (!cost) return 'charged **only in the financial accounts** (a purely financial item, not a cost of making and selling), so the financial profit is lower';
      if (!fin) return 'charged **only in the cost accounts** (a notional cost that is never paid), so the financial profit is higher';
      if (oh) return fin > cost ? `**under-absorbed** in the cost accounts (${inr(cost)} absorbed, ${inr(fin)} incurred), so the financial profit is lower` : `**over-absorbed** in the cost accounts (${inr(cost)} absorbed, ${inr(fin)} incurred), so the financial profit is higher`;
      return fin > cost ? `charged more in the financial accounts (${both}), so the financial profit is lower` : `charged more in the cost accounts (${both}), so the financial profit is higher`;
    }
    if (kind === 'I') {
      if (!cost && !told) return 'income **only in the financial accounts** (the cost accounts record only making and selling), so the financial profit is higher';
      return fin > cost ? `credited ${inr(diff)} more in the financial accounts, so the financial profit is higher` : `credited ${inr(diff)} more in the cost accounts, so the financial profit is lower`;
    }
    const sb = told || !cost || !fin ? `by ${inr(diff)}` : `(${both})`;
    if (kind === 'OS') return cost > fin ? `valued **higher in the cost accounts** ${sb}: a bigger opening stock means a bigger cost of sales there, so the costing profit is lower and the financial profit higher`
      : `valued **higher in the financial accounts** ${sb}: a bigger opening stock means a bigger cost of sales there, so the financial profit is lower`;
    return fin > cost ? `valued **higher in the financial accounts** ${sb}: a bigger closing stock means a smaller cost of sales there, so the financial profit is higher`
      : `valued **higher in the cost accounts** ${sb}: it inflates the costing profit, so the financial profit is lower`;
  }
  /** the statement's description of an item: its name, and the two figures when both accounts have it */
  const desc = it => (it.cost && it.fin ? `${it.name} (${inr(Math.max(it.cost, it.fin))} − ${inr(Math.min(it.cost, it.fin))})` : it.name);

  /** the reconciliation: start profit, items, layout → the ordered lines, totals and the reconciled profit */
  function reconcile(start, items, layout) {
    const fromFin = layout === 'fin', s = fromFin ? -1 : 1;              // from the financial profit every effect reverses
    const eff = items.map(it => Object.assign({}, it, { e: r2(s * it.d) }));
    const add = eff.filter(x => x.e > 0), less = eff.filter(x => x.e < 0), nil = eff.filter(x => x.e === 0);
    const A = r2(sum(add.map(x => x.e))), Lx = r2(-sum(less.map(x => x.e)));
    return { start, layout, add, less, nil, A, L: Lx, mid: r2(start + A), end: r2(start + A - Lx), order: add.concat(less) };
  }

  /* ================================================================== drawing */
  const START = { cost: 'Profit as per Cost Accounts', fin: 'Profit as per Financial Accounts', memo: 'Profit as per Cost Accounts' };
  const END = { cost: 'Profit as per Financial Accounts', fin: 'Profit as per Cost Accounts', memo: 'Profit as per Financial Accounts' };
  const pl = (label, x) => (x < 0 ? label.replace('Profit', 'Loss') : label);
  /** the reconciliation statement after `k` items (in statement order), ICAI's layout: amounts in the first column, group totals in the second */
  function statement(R, k, hl) {
    const rows = [], cells = {};
    const mark = (i, t) => { for (let c = 0; c < 3; c++) cells[`${i},${c}`] = t; };
    rows.push([`**${pl(START[R.layout], R.start)}**`, '', `**${amt(R.start)}**`]);
    const shownAdd = R.add.slice(0, Math.min(k, R.add.length)), shownLess = R.less.slice(0, Math.max(0, k - R.add.length));
    shownAdd.forEach((x, j) => { rows.push([`${j ? '' : 'Add: '}${desc(x)}`, amt(x.e), j === R.add.length - 1 ? amt(R.A) : '']); if (x === hl) mark(rows.length - 1, 'ok'); });
    if (R.add.length && shownAdd.length === R.add.length) rows.push(['', '', amt(R.mid)]);
    shownLess.forEach((x, j) => { rows.push([`${j ? '' : 'Less: '}${desc(x)}`, amt(-x.e), j === R.less.length - 1 ? `(${amt(R.L)})` : '']); if (x === hl) mark(rows.length - 1, 'bad'); });
    if (k >= R.order.length) { rows.push([`**${pl(END[R.layout], R.end)}**`, '', `**${amt(R.end)}**`]); mark(rows.length - 1, 'hl'); }
    return { type: 'table', title: 'Statement of Reconciliation (₹)', head: ['Particulars', '₹', '₹'], rows, cells, align: ['left', 'right', 'right'] };
  }
  /** round tick values for an amount axis: about five steps of 1, 2 or 5 × a power of ten, labelled with Indian grouping */
  function ticks(lo, hi) {
    const raw = (hi - lo) / 5 || 1, p = 10 ** Math.floor(Math.log10(raw)), step = [1, 2, 5, 10].map(m => m * p).find(x => x >= raw);
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push([clean(v), amt(clean(v)).replace(/^\((.*)\)$/, '−$1')]);
    return out;
  }
  /** the walk from one profit to the other as a sideways waterfall: the starting and the reconciled profit in blue, each item a bar from the
      running figure before it to the one after it, green when it raises the profit, rose when it lowers it; rows run top to bottom */
  function waterfall(R, k) {
    const steps = R.order.slice(0, k), n = R.order.length, regions = [], Yr = i => n + 2 - i;   // row i (0 = start … n + 1 = end) → y
    const bar = (x0, x1, i, color) => regions.push({ pts: [[Math.min(x0, x1), Yr(i) - 0.32], [Math.max(x0, x1), Yr(i) - 0.32], [Math.max(x0, x1), Yr(i) + 0.32], [Math.min(x0, x1), Yr(i) + 0.32]], color, outline: true });
    const run2 = R.order.reduce((acc, x) => { acc.push(r2(acc[acc.length - 1] + x.e)); return acc; }, [R.start]);
    let lo = Math.min(...run2, R.end), hi = Math.max(...run2, R.end);
    /* the walk is what matters: when every figure is a profit and the items are small beside it, the axis starts near the smallest figure
       (its ticks say where); otherwise it includes zero */
    const zoom = lo > 0 && hi - lo < 0.6 * hi, span = hi - lo || Math.abs(hi) || 1;
    if (!zoom) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    const x0 = zoom ? lo - span * 0.35 : lo - (hi - lo || 1) * 0.06, x1 = hi + (hi - lo || 1) * 0.06, from = zoom ? x0 : 0;
    bar(from, R.start, 0, 'a');
    let run = R.start;
    steps.forEach((x, i) => { const b = run; run = r2(run + x.e); bar(b, run, i + 1, x.e > 0 ? 'ok' : 'bad'); });
    if (k >= n) bar(from, R.end, n + 1, 'a');
    const short = s => (s.length > 26 ? s.slice(0, 25).trim() + '…' : s);
    const yt = [[Yr(0), pl(START[R.layout], R.start).replace(' as per ', ' · ').replace(' Accounts', '')]].concat(R.order.map((x, i) => [Yr(i + 1), `${x.e > 0 ? '+' : '−'} ${short(x.name)}`]), [[Yr(n + 1), pl(END[R.layout], R.end).replace(' as per ', ' · ').replace(' Accounts', '')]]);
    return { type: 'plot', title: `From ${pl(START[R.layout], R.start).toLowerCase()} to ${pl(END[R.layout], R.end).toLowerCase()}`, w: 640, h: Math.max(200, 70 + 30 * (n + 2)), legend: 'none',
      x: [x0, x1], y: [0.4, n + 2.6], yticks: yt, xticks: ticks(x0, x1), regions, series: x0 < 0 ? [{ pts: [[0, 0.4], [0, n + 2.6]], color: 'mute', dash: true, legend: false }] : [] };
  }
  /** the Memorandum Reconciliation Account (two-sided), with a phone twin stacked Dr then Cr (labs.css, block 'lab: recon') */
  function memoAccount(R, k, hl) {
    const dr = [], cr = [];
    (R.start >= 0 ? cr : dr).push({ p: `${R.start >= 0 ? 'By Net Profit' : 'To Net Loss'} as per Cost Accounts`, v: Math.abs(R.start) });
    R.order.slice(0, k).forEach(x => (x.e > 0 ? cr : dr).push({ p: `${x.e > 0 ? 'By' : 'To'} ${desc(x)}`, v: Math.abs(x.e), hl: x === hl, t: x.e > 0 ? 'ok' : 'bad' }));
    let total = null;
    if (k >= R.order.length) {
      if (R.end >= 0) dr.push({ p: 'To Net Profit as per Financial Accounts', v: R.end, hl: true, t: 'hl' }); else cr.push({ p: 'By Net Loss as per Financial Accounts', v: -R.end, hl: true, t: 'hl' });
      total = r2(sum(dr.map(x => x.v)));
    }
    const n = Math.max(dr.length, cr.length), rows = [], cells = {};
    for (let i = 0; i < n; i++) {
      const a = dr[i], b = cr[i];
      rows.push([a ? a.p : '', a ? amt(a.v) : '', b ? b.p : '', b ? amt(b.v) : '']);
      if (a && a.hl) { cells[`${i},0`] = a.t; cells[`${i},1`] = a.t; }
      if (b && b.hl) { cells[`${i},2`] = b.t; cells[`${i},3`] = b.t; }
    }
    if (total != null) rows.push(['**Total**', `**${amt(total)}**`, '**Total**', `**${amt(total)}**`]);
    const wide = { type: 'table', title: 'Memorandum Reconciliation Account', head: ['Dr. Particulars', '₹', 'Cr. Particulars', '₹'], rows, cells, align: ['left', 'right', 'left', 'right'] };
    const D = GA.diagram;
    if (!D || typeof D.render !== 'function') return [wide];
    const nr = [], nc = {};
    const side = (label, list) => {
      nr.push([`**${label}**`, '']);
      list.forEach(x => { nr.push([x.p, amt(x.v)]); if (x.hl) { nc[`${nr.length - 1},0`] = x.t; nc[`${nr.length - 1},1`] = x.t; } });
      if (!list.length) nr.push(['—', '']);
      if (total != null) nr.push(['**Total**', `**${amt(total)}**`]);
    };
    side('Dr. (debit side)', dr); side('Cr. (credit side)', cr);
    const narrow = { type: 'table', title: 'Memorandum Reconciliation Account', head: ['Particulars', '₹'], rows: nr, cells: nc, align: ['left', 'right'] };
    const fig = t => `<figure class="dg" data-diagram="table">${D.render(t)}</figure>`;
    return [{ html: `<div class="rc-acc rc-wide">${fig(wide)}</div>` }, { html: `<div class="rc-acc rc-narrow">${fig(narrow)}</div>` }];
  }

  /* ================================================================== compute */
  function compute(v) {
    const layout = v.layout === 'fin' || v.layout === 'memo' ? v.layout : 'cost';
    const items = parseItems(v.items);
    if (!items.length) throw new Error('Add at least one item that differs between the two sets of accounts.');
    const start = num0(layout === 'fin' ? v.finProfit : v.costProfit);
    const R = reconcile(start, items, layout);
    const memo = layout === 'memo', n = R.order.length;
    const view = (k, hl) => (memo ? memoAccount(R, k, hl).concat([waterfall(R, k)]) : [statement(R, k, hl), waterfall(R, k)]);
    const sAcc = { cost: 'cost', fin: 'financial', memo: 'cost' }[layout], eAcc = { cost: 'financial', fin: 'cost', memo: 'financial' }[layout];
    const frames = [{ caption: `Start from the ${pl('profit', R.start)} as per **${sAcc} accounts**, ${signed(R.start)}. Each item that the two sets of accounts treat differently moves it, until it becomes the ${eAcc} accounts' figure. ${memo ? 'In the memorandum account the starting profit sits on the credit side (a loss on the debit side); items that raise the profit are credits ("By"), items that lower it are debits ("To").' : `Items that raise the ${eAcc} profit are **added**, items that lower it are **deducted**.`}`, view: view(0) }];
    R.order.forEach((x, k) => {
      const why = reason(x), dir = x.e > 0;
      const flip = layout === 'fin' ? ` Starting from the financial profit the sign reverses: the costing profit is ${dir ? 'higher' : 'lower'}, so **${dir ? 'add' : 'deduct'}** ${inr(Math.abs(x.e))}.` : '';
      const verb = memo ? (dir ? `It goes on the **credit** side ("By"): ${inr(x.e)}.` : `It goes on the **debit** side ("To"): ${inr(-x.e)}.`) : dir ? `**Add** ${inr(x.e)}.` : `**Less** ${inr(-x.e)}.`;
      frames.push({ caption: `**${x.name}**: ${why}. ${layout === 'fin' ? flip.trim() : verb}`, view: view(k + 1, x) });
    });
    if (R.nil.length) frames.push({ caption: `${R.nil.map(x => `**${x.name}**`).join(', ')} ${R.nil.length === 1 ? 'is' : 'are'} the same in both sets of accounts: no adjustment.`, view: view(n) });
    const endCap = memo ? `The account balances with the ${R.end >= 0 ? '**net profit as per financial accounts** on the debit side' : '**net loss as per financial accounts** on the credit side'}: **${signed(R.end)}**.`
      : `${pl(START[layout], R.start)} ${signed(R.start)} + ${inr(R.A)} − ${inr(R.L)} = **${pl(END[layout], R.end)}: ${signed(R.end)}**.`;
    frames.push({ caption: `${endCap} Check: it must equal the ${eAcc} accounts' own figure.`, view: view(n) });

    const tableRows = items.map(it => { const e = r2((layout === 'fin' ? -1 : 1) * it.d); return [it.name, KINDS[it.kind], it.cost ? inr(it.cost) : '—', it.fin ? inr(it.fin) : '—', e > 0 ? (memo ? 'Cr (By)' : 'Add') : e < 0 ? (memo ? 'Dr (To)' : 'Less') : 'no adjustment', amt(Math.abs(e))]; });
    return {
      frames, sim: R, layout,
      stats: [
        { label: pl(START[layout], R.start), value: signed(R.start), hint: 'the figure the reconciliation starts from' },
        { label: memo ? 'Credits (raise the profit)' : 'Added', value: inr(R.A), tone: 'ok', hint: `items that make the ${eAcc} profit higher` },
        { label: memo ? 'Debits (lower the profit)' : 'Deducted', value: inr(R.L), tone: 'bad', hint: `items that make the ${eAcc} profit lower` },
        { label: pl(END[layout], R.end), value: signed(R.end), hint: 'start + added − deducted' }
      ],
      table: { head: ['Item', 'Kind', 'Cost accounts', 'Financial accounts', 'Treatment', '₹'], rows: tableRows },
      note: `**Conventions.** Each item is entered with its amount in the cost accounts and in the financial accounts (0 where an account does not have it). An expense or charge moves the financial profit by (cost − financial), an income by (financial − cost), opening stock by (cost − financial) and closing stock by (financial − cost). ${layout === 'fin' ? 'Starting from the financial profit every sign reverses.' : 'Starting from the costing profit, a positive effect is added and a negative one deducted.'} A loss is shown in brackets.`
    };
  }

  /* ================================================================== presets */
  const I = (name, kind, cost, fin) => [name, kind, cost, fin];
  const presets = [
    { label: 'Tapri Tea Co.: costing profit to financial profit', values: { layout: 'cost', costProfit: 1250000, items: [
      I('Works overheads (absorbed vs actual)', 'E', 840000, 905000), I('Office overheads (absorbed vs actual)', 'E', 310000, 286000), I('Interest on bank loan', 'E', 0, 72000), I('Notional rent of the owned Indore factory', 'E', 120000, 0),
      I('Dividend from mutual fund', 'I', 0, 18000), I('Closing stock of premix', 'CS', 465000, 440000), I('Opening stock of premix', 'OS', 390000, 372000)] } },
    { label: 'Tapri Tea Co.: the same, starting from the financial profit', values: { layout: 'fin', finProfit: 1268000, items: [
      I('Works overheads (absorbed vs actual)', 'E', 840000, 905000), I('Office overheads (absorbed vs actual)', 'E', 310000, 286000), I('Interest on bank loan', 'E', 0, 72000), I('Notional rent of the owned Indore factory', 'E', 120000, 0),
      I('Dividend from mutual fund', 'I', 0, 18000), I('Closing stock of premix', 'CS', 465000, 440000), I('Opening stock of premix', 'OS', 390000, 372000)] } },
    { label: 'Tapri Tea Co.: a memorandum reconciliation account', values: { layout: 'memo', costProfit: 1250000, items: [
      I('Works overheads (absorbed vs actual)', 'E', 840000, 905000), I('Office overheads (absorbed vs actual)', 'E', 310000, 286000), I('Interest on bank loan', 'E', 0, 72000), I('Notional rent of the owned Indore factory', 'E', 120000, 0),
      I('Dividend from mutual fund', 'I', 0, 18000), I('Closing stock of premix', 'CS', 465000, 440000), I('Opening stock of premix', 'OS', 390000, 372000)] } },
    { label: 'ICAI Study Material Ch. 7, Illustration 6: ABC Manufacturing Co. Ltd.', values: { layout: 'cost', costProfit: 300000, items: [
      I('Factory overheads', 'E', 500000, 450000), I('Selling and distribution overheads', 'E', 200000, 180000), I('Closing stock of finished goods', 'CS', 123000, 150000),
      I('Administration overheads', 'E', 193000, 260000), I('Goodwill written off', 'E', 0, 200000), I('Interest on loan', 'E', 0, 20000)] } },
    { label: 'ICAI Study Material Ch. 7, Illustration 7: from the financial loss', values: { layout: 'fin', finProfit: -3000, items: [I('Overheads (absorbed vs incurred)', 'E', 120000, 143000)] } },
    { label: 'ICAI Study Material Ch. 7, Illustration 8: material consumption differs', values: { layout: 'cost', costProfit: 565160, items: [
      I('Direct material consumption', 'E', 5600000, 5000000), I('Factory overheads', 'E', 1720000, 1600000), I('Administrative overheads', 'E', 720000, 700000), I('Selling and distribution overheads', 'E', 960000, 960000),
      I('Dividends received', 'I', 0, 100000), I('Interest received on deposits', 'I', 0, 20000), I('Bad debts', 'E', 0, 80000), I('Preliminary expenses written off', 'E', 0, 40000), I('Legal charges', 'E', 0, 10000), I('Closing stock of finished goods', 'CS', 325160, 320000)] } },
    { label: 'ICAI Study Material Ch. 7, Practical Problem 5: H.K. Piano Company (memorandum account)', values: { layout: 'memo', costProfit: -328000, items: [
      I('Factory overheads under-recovered', 'E', 0, 6000), I('Administration overheads over-recovered', 'E', 4000, 0), I('Depreciation', 'E', 130000, 120000), I('Interest on investment not included in costs', 'I', 0, 20000),
      I('Income-tax provided', 'E', 0, 120000), I('Transfer fees (credit in financial books)', 'I', 0, 2000), I('Stores adjustment (credit in financial books)', 'I', 0, 2000)] } },
    { label: 'ICAI MTP Jan 2026 (Series I), Q3(b): memorandum account from a costing loss', values: { layout: 'memo', costProfit: -315000, items: [
      I('Factory overheads under-absorbed', 'E', 0, 8000), I('Administration overheads over-absorbed', 'E', 5000, 0), I('Depreciation', 'E', 90000, 75000), I('Interest on investments (not in cost accounts)', 'I', 0, 25000),
      I('Income-tax provided', 'E', 0, 80000), I('Transfer fees (credit in financial accounts)', 'I', 0, 3000), I('Preliminary expenses written off', 'E', 0, 5000), I('Overvaluation of closing stock of finished goods in cost accounts', 'CS', 10000, 0)] } },
    { label: 'ICAI MTP Sep 2024 (Series I): costing loss, stocks valued differently (memorandum account)', values: { layout: 'memo', costProfit: -48700, items: [
      I('Factory overheads under-absorbed', 'E', 0, 30500), I('Administrative overheads over-absorbed', 'E', 65000, 0), I('Depreciation', 'E', 270000, 225000), I('Income-tax provision', 'E', 0, 52400),
      I('Transfer fee (credited in financial accounts)', 'I', 0, 10200), I('Obsolescence loss', 'E', 0, 20700), I('Notional rent of own premises', 'E', 49000, 0), I('Opening stock', 'OS', 138000, 115000), I('Closing stock', 'CS', 122000, 112500)] } },
    { label: 'ICAI MTP May 2026 (Series II): a costing profit that reconciles to a financial loss', values: { layout: 'cost', costProfit: 251839, items: [
      I('Selling and distribution overheads', 'E', 112200, 88000), I('Closing stock of finished goods', 'CS', 74567, 82160), I('Rent received', 'I', 0, 96000), I('Interest received', 'I', 0, 27000),
      I('Administrative overheads', 'E', 335178, 410000), I('Factory overheads', 'E', 305000, 345000), I('Goodwill written off', 'E', 0, 120000), I('Interest paid', 'E', 0, 96000), I('Bad debts', 'E', 0, 35000), I('Loss on obsolete inventory', 'E', 0, 42000)] } },
    { label: 'ICAI MTP Jan 2025 (Series II), Q4(c): expenses under-charged in cost accounts', values: { layout: 'cost', costProfit: 777150, items: [
      I('Factory expenses under-charged', 'E', 0, 235500), I('Administrative expenses under-charged', 'E', 0, 117750), I('Selling and distribution expenses under-charged', 'E', 0, 31400), I('Income from interest and dividends', 'I', 0, 235500)] } }
  ];

  /* ================================================================== challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const ri = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  const POOL = [
    r => I('Interest on debentures', 'E', 0, ri(r, 4, 60) * 1000), r => I('Goodwill written off', 'E', 0, ri(r, 10, 90) * 1000), r => I('Income-tax provided', 'E', 0, ri(r, 10, 99) * 1000),
    r => I('Preliminary expenses written off', 'E', 0, ri(r, 2, 20) * 1000), r => I('Loss on sale of machinery', 'E', 0, ri(r, 2, 40) * 1000), r => I('Donations', 'E', 0, ri(r, 1, 15) * 1000),
    r => I('Dividend received', 'I', 0, ri(r, 2, 40) * 1000), r => I('Interest on bank deposit', 'I', 0, ri(r, 2, 30) * 1000), r => I('Transfer fees received', 'I', 0, ri(r, 1, 9) * 500),
    r => I('Profit on sale of investments', 'I', 0, ri(r, 2, 50) * 1000), r => I('Notional rent of own premises', 'E', ri(r, 6, 60) * 1000, 0), r => I('Notional interest on capital', 'E', ri(r, 5, 50) * 1000, 0),
    r => { const a = ri(r, 100, 900) * 1000; return I('Factory overheads (absorbed vs actual)', 'E', a, a + ri(r, -40, 40) * 1000 || a + 5000); },
    r => { const a = ri(r, 50, 400) * 1000; return I('Administration overheads (absorbed vs actual)', 'E', a, a + ri(r, -30, 30) * 1000 || a - 3000); },
    r => { const a = ri(r, 40, 300) * 1000; return I('Selling overheads (recovered vs actual)', 'E', a, a + ri(r, -20, 20) * 1000 || a + 2000); },
    r => { const a = ri(r, 50, 300) * 1000; return I('Depreciation', 'E', a, a + ri(r, -25, 25) * 1000 || a - 4000); },
    r => { const a = ri(r, 50, 500) * 1000; return I('Opening stock of finished goods', 'OS', a, a + ri(r, -30, 30) * 1000 || a - 6000); },
    r => { const a = ri(r, 50, 500) * 1000; return I('Closing stock of finished goods', 'CS', a, a + ri(r, -30, 30) * 1000 || a + 7000); }
  ];
  function gen(r) {
    const idx = [];
    const n = ri(r, 4, 7);
    while (idx.length < n) { const k = Math.floor(r() * POOL.length); if (!idx.includes(k)) idx.push(k); }
    const items = idx.map(k => POOL[k](r));
    const p = ri(r, -80, 400) * 1000 + pick(r, [0, 500]);
    return { items, costProfit: p, finProfit: p, ask: r() < 0.6 ? 'end' : 'item', askItem: ri(r, 0, n - 1) };
  }
  const def = {
    id: 'recon', title: 'Cost-Financial Reconciliation Lab',
    blurb: 'Build a reconciliation of costing and financial profit item by item, with the reason each is added or deducted.',
    controls: [
      { id: 'layout', type: 'select', label: 'Layout', value: 'cost', options: [['cost', 'Statement from the costing profit'], ['fin', 'Statement from the financial profit'], ['memo', 'Memorandum Reconciliation Account']] },
      { id: 'costProfit', type: 'number', label: 'Profit as per cost accounts (₹; minus for a loss)', short: 'Costing profit', value: 1250000, min: -1e11, max: 1e11, show: v => v.layout !== 'fin' },
      { id: 'finProfit', type: 'number', label: 'Profit as per financial accounts (₹; minus for a loss)', short: 'Financial profit', value: 1268000, min: -1e11, max: 1e11, show: v => v.layout === 'fin' },
      { id: 'items', type: 'table', label: 'Items: kind (E expense, I income, OS opening stock, CS closing stock), amount in cost accounts, in financial accounts', short: 'Items', max: 14,
        help: 'Kind E: an expense, loss or charge (overheads, depreciation, interest paid, income tax, goodwill written off, notional rent). I: an income (dividends, interest or rent received, transfer fees). OS / CS: the opening or closing stock. Put 0 where an account does not have the item; a question that gives only the difference ("factory overheads under-absorbed ₹8,000") is entered as 0 in the cost accounts and 8,000 in the financial accounts.',
        rows: presets[0].values.items.map(x => x.slice()),
        cols: [{ id: 'name', label: 'Item', type: 'text', auto: () => '' }, { id: 'kind', label: 'Kind', type: 'text', auto: () => 'E' }, { id: 'cost', label: 'Cost a/c ₹', type: 'number', min: 0, def: 0 }, { id: 'fin', label: 'Fin. a/c ₹', type: 'number', min: 0, def: 0 }] }
    ],
    presets, compute,
    challenge: {
      title: 'Reconcile the profits',
      gen,
      kind: 'signed', signed: true,
      prompt: (v, res) => {
        const R = res.sim, from = R.layout === 'fin' ? 'financial' : 'cost', to = R.layout === 'fin' ? 'cost' : 'financial';
        if (v.ask === 'item') { const it = res.sim.order.concat(res.sim.nil).find(x => x.i === v.askItem) || res.sim.order[0]; return `Profit as per ${from} accounts ₹${amt(R.start)}. In reconciling it to the ${to} accounts' profit, by how much does **${it.name}** change it, in ₹? (Type a minus if it is deducted.)`; }
        return `Profit as per ${from} accounts ₹${amt(R.start)}. With the items in the table, what is the **profit as per ${to} accounts**, in ₹? (Type a minus for a loss.)`;
      },
      solve: (res, v) => {
        if (v.ask === 'item') { const it = res.sim.order.concat(res.sim.nil).find(x => x.i === v.askItem) || res.sim.order[0]; return it.e; }
        return res.sim.end;
      },
      tol: 0.5, unit: '₹',
      view: (res, v) => [{ type: 'table', title: 'Items that differ between the two sets of accounts', head: ['Item', 'Kind', 'Cost accounts ₹', 'Financial accounts ₹'], rows: (v.items || []).map(x => [x[0], KINDS[kindOf(x[1])] || x[1], x[2] ? amt(num0(x[2])) : '—', x[3] ? amt(num0(x[3])) : '—']), align: ['left', 'left', 'right', 'right'] }],
      explain: (res, v) => {
        const R = res.sim;
        return `${pl(START[R.layout], R.start)} ${signed(R.start)}; add ${R.add.map(x => `${x.name} ${inr(x.e)}`).join(', ') || 'nothing'}; less ${R.less.map(x => `${x.name} ${inr(-x.e)}`).join(', ') || 'nothing'}; ${pl(END[R.layout], R.end).toLowerCase()} = ${signed(R.end)}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, kindOf, parseItems, reason, reconcile, compute, gen, def };
  g.__lab_def_recon = def;
})(typeof window !== 'undefined' ? window : globalThis);
