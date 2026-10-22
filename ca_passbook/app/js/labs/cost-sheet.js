/* PassBook — Cost Sheet Lab (Paper 4, cma.sheet). The ICAI cost sheet (Study Material ch. 6, specimen format §4.1 and treatment of items
   §4.2) built line by line from the items of a question: each item is classified to its head (or the student sets the head), then direct
   materials consumed → prime cost → works overheads → work-in-process → works cost → quality control, R&D, administration (production),
   scrap, primary packing → cost of production → finished goods → cost of goods sold → administration, selling, distribution, secondary
   packing, interest → cost of sales → profit → sales, with a per-unit column. Quotation mode prices an order on overhead rates taken from
   the last period (or given), with profit as a % of cost or of sales.
   Pure part: classify(), sheet(), quote(); compute(values) -> {frames, stats, table, note}. Node: require() it. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  /* ------------------------------------------------------------------ numbers */
  const fmt = (x, dp) => {
    if (x == null || !isFinite(x)) return '—';
    const d = dp == null ? 0 : dp, r = Math.round(x * Math.pow(10, d) + (x >= 0 ? 1e-7 : -1e-7)) / Math.pow(10, d);
    return (r < 0 ? '−' : '') + Math.abs(r).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  const whole = x => Math.abs(x - Math.round(x)) < 1e-6;
  const amt = x => fmt(x, whole(x) ? 0 : 2);
  const rs = x => (x < 0 ? '−₹' + amt(-x) : '₹' + amt(x));
  const r2 = x => Math.round(x * 100 + (x >= 0 ? 1e-7 : -1e-7)) / 100;
  const pc = x => `${+(+x).toFixed(3)}%`;
  const sum = a => a.reduce((s, x) => s + x, 0);
  const INDIAN = /^\d{1,2}(,\d{2})*,\d{3}(\.\d+)?$/, WESTERN = /^\d{1,3}(,\d{3})+(\.\d+)?$/;
  function num(x) {
    if (typeof x === 'number') return x;
    let s = String(x == null ? '' : x).trim().replace(/₹|rs\.?|inr/gi, '').replace(/[()]/g, '').trim();
    if (s === '') return NaN;
    if (/^[-–—]$|^nil$/i.test(s)) return 0;
    s = s.replace(/\s+/g, '');
    if (s.indexOf(',') >= 0) { if (INDIAN.test(s) || WESTERN.test(s)) s = s.replace(/,/g, ''); else return NaN; }
    return /^[-−]?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s.replace('−', '-')) : NaN;
  }
  const blank = x => String(x == null ? '' : x).trim() === '';

  /* ------------------------------------------------------------------ the heads of a cost sheet (SM §4.1, the specimen's lines) */
  const HEAD = {
    'rm-open': ['Opening stock of raw materials', 'materials'], 'rm-add': ['Purchases and additions', 'materials'], 'rm-less': ['Less: returns, discounts', 'materials'],
    'rm-close': ['Closing stock of raw materials', 'materials'], labour: ['Direct employee (labour) cost', 'labour'], dexp: ['Direct expenses', 'dexp'],
    foh: ['Works / factory overheads', 'foh'], 'wip-open': ['Opening work-in-process', 'wip'], 'wip-close': ['Closing work-in-process', 'wip'],
    qc: ['Quality control cost', 'qc'], rd: ['Research and development cost', 'rd'], 'admin-prod': ['Administration overheads (production)', 'adminp'],
    scrap: ['Credit for scrap / recoveries', 'scrap'], pack1: ['Primary packing cost', 'pack1'], 'fg-open': ['Opening stock of finished goods', 'fg'], 'fg-close': ['Closing stock of finished goods', 'fg'],
    admin: ['Administration overheads (general)', 'admin'], selling: ['Selling overheads', 'selling'], dist: ['Distribution overheads', 'dist'], pack2: ['Secondary packing cost', 'pack2'],
    interest: ['Interest and finance charges', 'interest'], sales: ['Sales', 'sales'], 'sales-less': ['Less: sales returns', 'sales'], excl: ['Not part of cost', 'excl'],
    works: ['Added at works cost', 'works'], 'sell-direct': ['Direct selling costs of the order', 'selldir']
  };
  /** the head a student types: forgiving aliases → a head code, or null */
  const ALIAS = [
    [/^(works?$|works?\s*cost|added at works|rectif|rework)/, 'works'], [/^(sell-direct|selling\s*direct|direct\s*selling|packaging|transport)/, 'sell-direct'],
    [/^(opening|open)\s*(raw|rm|material)/, 'rm-open'], [/^(closing|close)\s*(raw|rm|material)/, 'rm-close'], [/^(opening|open)\s*(wip|work)/, 'wip-open'], [/^(closing|close)\s*(wip|work)/, 'wip-close'],
    [/^(opening|open)\s*(fg|finished)/, 'fg-open'], [/^(closing|close)\s*(fg|finished)/, 'fg-close'], [/^(less|purchase\s*return|return|discount)/, 'rm-less'],
    [/^(purchase|material|raw|dm|rm)/, 'rm-add'], [/^(labour|labor|wage|direct\s*(labour|labor|employee|wage)|employee|dl)/, 'labour'], [/^(direct\s*exp|dexp|de\b|expense)/, 'dexp'],
    [/^(foh|factory|works?\s*(oh|overhead)|works overheads|production\s*overhead|poh)/, 'foh'], [/^(qc|quality)/, 'qc'], [/^(rd|r\s*&\s*d|research)/, 'rd'],
    [/^(admin\w*\s*\(?\s*prod|admin-prod|production\s*admin|adminp)/, 'admin-prod'], [/^(scrap|credit|recover)/, 'scrap'], [/^(primary|pack1)/, 'pack1'], [/^(secondary|pack2|packing)/, 'pack2'],
    [/^(admin|office|general)/, 'admin'], [/^(sell|marketing)/, 'selling'], [/^(dist|deliver)/, 'dist'], [/^(interest|finance)/, 'interest'],
    [/^(sales\s*return|return\s*inward|sales-less)/, 'sales-less'], [/^(sales|revenue|turnover)/, 'sales'], [/^(excl|exclude|not|none|abnormal|ignore)/, 'excl'],
];
  function headOf(text) { const t = String(text == null ? '' : text).trim().toLowerCase(); if (!t) return null; if (HEAD[t]) return t; const a = ALIAS.find(([re]) => re.test(t)); return a ? a[1] : undefined; }

  /** an item's head from its words, as ICAI classifies it (SM §3, §4.2 and Illustration 3); [head, why] */
  const RULES = [
    [/^(gross |net )?sales\b(?!.*(commission|office|staff|promotion|travel|manager|expense|overhead|return|tax))|^turnover|sales revenue/, 'sales', 'revenue, not a cost'],
    [/sales returns?|returns? inward/, 'sales-less', 'returns reduce sales'],
    [/(gst|igst|cgst|sgst|vat|duty|tax).*(itc|input tax credit|credit).*(available|eligible|availed|allowed)|(itc|input tax credit).*(available|eligible|availed)|eligible for (itc|input)/, 'excl', 'GST that can be claimed back as input tax credit is not a cost'],
    [/penalt|\bfines?\b|damages|demurrage|income.?tax|dividend|donation|charity|transfer to reserve|preliminary|goodwill|loss on sale of (asset|investment|machine)|capital (loss|expenditure)|abnormal|strike|lock.?out|pandemic|covid|accident|flood|fire loss|theft/, 'excl', 'penalties, fines, appropriations and abnormal costs are not part of cost (SM §4.2)'],
    [/scrap|sale of waste|waste (sold|realis)|realis(ed|able) value|by-?product/, 'scrap', 'the realisable value of scrap reduces the cost of production'],
    [/interest|finance charge|financing charge|bank charge|loan processing/, 'interest', 'interest and finance charges are shown as a separate item of cost of sales, never in cost of production (SM §4.2(iv))'],
    [/opening.*(raw|material)|(raw|material).*opening|(raw|material).*(1st|first|beginning)/, 'rm-open', ''], [/closing.*(raw|material)|(raw|material).*closing|(raw|material).*(31st|end)/, 'rm-close', ''],
    [/opening.*(wip|work.in|semi)|(wip|work.in).*opening/, 'wip-open', ''], [/closing.*(wip|work.in|semi)|(wip|work.in).*closing/, 'wip-close', ''],
    [/opening.*(finished|\bfg\b)|(finished|\bfg\b).*opening/, 'fg-open', ''], [/closing.*(finished|\bfg\b)|(finished|\bfg\b).*closing/, 'fg-close', ''],
    [/primary pack|pack.*(primary|essential|preserve|quality|hold)/, 'pack1', 'primary packing holds and preserves the product, so it is part of the cost of production'],
    [/pack/, 'pack2', 'secondary packing (for transport, display or re-distribution) is a distribution cost'],
    [/quality|inspection|testing (lab|staff|charge)/, 'qc', 'quality control is part of the cost of production'],
    [/research|r\s*&\s*d\b|development cost/, 'rd', 'process-related research and development is part of the cost of production'],
    [/administration of (the )?factory|factory administration|production control|admin\w*.*(relat\w* to|of) (production|factory|works)|admin\w* \(production\)/, 'admin-prod', 'administration relating to production is part of the cost of production; general administration is not'],
    [/\bsales\b|selling|salesm|advertis|publicity|promotion|marketing|commission|showroom|show room|bad debt|catalogue|website|after.?sales|free sample|exhibition/, 'selling', 'selling costs are added after cost of goods sold, to reach cost of sales'],
    [/distribut|deliver|carriage out|freight out|outward|warehous|transit insurance|dispatch|despatch/, 'dist', 'distribution costs make the goods available to customers: added after cost of goods sold'],
    [/office|admin|director|audit|legal|general manager|accounts|accountant|\bfinance\b|secretar|stationery|postage|telephone|corporate|managing|chairman|official|share transfer/, 'admin', 'general administration runs the business as a whole: added after cost of goods sold, not part of cost of production'],
    [/royalt|job (work|charge)|mould|pattern|patent|technical|know.?how|power (&|and) fuel|power consumed|\bfuel\b|diesel|utilit|hire charge|hiring|special (design|drawing|equipment|frame|tool)|design charge|sub.?contract/, 'dexp', 'expenses traced directly to production are direct expenses, part of prime cost'],
    [/indirect|canteen|welfare|recreation|creche|medical (centre|facilit)/, 'foh', 'indirect costs of production (indirect labour, canteen and welfare) are works overheads'],
    [/wage|worker|labou?r|employee|\bpf\b|provident|\besi|gratuity|leave encash|overtime|bonus|incentive/, 'labour', 'pay and benefits of the workers who make the product are direct employee cost'],
    [/factory|works|plant|machin|production|supervis|foreman|stores|spares|consumable|depreciation|repair|maintenance|insurance|\brent\b|rates|light|heat|power|pollution|engineering|tool|canteen|welfare|lease/, 'foh', 'indirect costs of running the factory are works overheads'],
    [/purchase return|returns? outward|return.*purchase|trade discount|rebate on purchase/, 'rm-less', 'purchase returns and trade discounts reduce the cost of materials'],
    [/material|raw|purchase|freight|carriage in|inward|octroi|custom|import|gst|duty/, 'rm-add', 'materials and every cost of bringing them in (freight inwards, non-creditable taxes) are direct material cost']];
  function classify(label) {
    const t = String(label == null ? '' : label).toLowerCase();
    const r = RULES.find(([re]) => re.test(t));
    return r ? { head: r[1], why: r[2], auto: true } : { head: 'foh', why: 'not recognised, so treated as a works overhead: set its head if it belongs elsewhere', auto: true, guess: true };
  }

  function parseItems(rows, allowed) {
    const out = [];
    (rows || []).forEach((r, i) => {
      let label = String(r[0] == null ? '' : r[0]).trim(), h = String(r[2] == null ? '' : r[2]).trim();
      const a = String(r[1] == null ? '' : r[1]).trim(), m = /^(.*?)\s*\[([^\]]+)\]\s*$/.exec(label);
      if (m) { label = m[1].trim(); if (!h) h = m[2].trim(); }                // 'Gas and power [direct expenses]': the head written after the item
      if (!label && !a && !h) return;
      const name = label || 'Item ' + (i + 1);
      const v = num(a);
      if (isNaN(v)) throw new Error(`${name}: the amount must be a number, like 4,80,000.`);
      if (v < 0) throw new Error(`${name}: enter the amount without a minus; its head decides whether it is added or deducted.`);
      let c;
      if (h) { const code = headOf(h); if (!code) throw new Error(`${name}: "${h}" is not a head. Use, for example: purchases, closing raw materials, labour, direct expenses, factory, opening WIP, quality, R&D, admin production, scrap, primary packing, closing finished goods, admin, selling, distribution, secondary packing, interest, sales, exclude.`); c = { head: code, why: '', auto: false }; }
      else c = classify(name);
      if (allowed && !allowed.includes(c.head)) throw new Error(`${name}: in an order's estimate use only materials, labour, direct expenses, "works" (added at works cost) or "selling direct" items; overheads come from the rates.`);
      out.push({ label: name, amount: v, head: c.head, why: c.why, auto: c.auto, guess: !!c.guess });
    });
    if (out.length > 60) throw new Error('At most 60 items.');
    return out;
  }

  /* ------------------------------------------------------------------ the cost sheet */
  /** rows {label, inner, total, unit, kind: 'item'|'head'|'sub'|'adj'|'key', head, why, item} in the order of ICAI's specimen; totals */
  function sheet(items, o) {
    const by = h => items.filter(it => it.head === h), tot = h => sum(by(h).map(it => it.amount));
    const prod = +o.produced > 0 ? +o.produced : null, sold = +o.sold > 0 ? +o.sold : null;
    const rows = [], T = {};
    const pu = (x, per) => (per ? x / per : null);
    const block = (head, title, sign, opts) => {                     // the items of one head, then its total on the head's line
      const its = by(head);
      if (!its.length) return 0;
      const t = sum(its.map(it => it.amount));
      if (its.length > 1 || (opts && opts.list)) its.forEach(it => rows.push({ kind: 'item', label: it.label, inner: sign * it.amount, head, why: it.why, item: it }));
      const one = its.length === 1 && !(opts && opts.list) ? its[0].label.replace(/^(add|less):\s*/i, '') : null;
      const shown = one && one.toLowerCase() !== title.toLowerCase() && (title + one).length <= 64 ? `${title} (${one[0].toLowerCase() + one.slice(1)})` : title;
      rows.push({ kind: 'head', label: (sign < 0 ? 'Less: ' : opts && opts.add ? 'Add: ' : '') + shown, total: sign * t, head, why: its.length === 1 ? its[0].why : '', item: its.length === 1 ? its[0] : null, label1: null, per: opts && opts.per });
      return sign * t;
    };
    /* 1. direct materials consumed */
    const hasStock = by('rm-open').length || by('rm-close').length || by('rm-less').length;
    if (hasStock) {
      [['rm-open', 1, ''], ['rm-add', 1, 'Add: '], ['rm-less', -1, 'Less: '], ['rm-close', -1, 'Less: ']].forEach(([h, s, pre]) =>
        by(h).forEach(it => rows.push({ kind: 'item', label: pre + it.label.replace(/^(add|less):\s*/i, ''), inner: s * it.amount, head: h, why: it.why, item: it })));
    } else by('rm-add').forEach(it => { if (by('rm-add').length > 1) rows.push({ kind: 'item', label: it.label, inner: it.amount, head: 'rm-add', why: it.why, item: it }); });
    T.material = tot('rm-open') + tot('rm-add') - tot('rm-less') - tot('rm-close');
    if (items.some(it => /^rm-/.test(it.head))) rows.push({ kind: 'head', label: 'Direct materials consumed', total: T.material, head: 'materials', item: !hasStock && by('rm-add').length === 1 ? by('rm-add')[0] : null, label1: !hasStock && by('rm-add').length === 1 ? by('rm-add')[0].label : null, per: 'p' });
    T.labour = block('labour', 'Direct employee (labour) cost', 1, { per: 'p' });
    T.dexp = block('dexp', 'Direct expenses', 1, { per: 'p' });
    T.prime = T.material + T.labour + T.dexp;
    rows.push({ kind: 'sub', label: 'Prime cost', total: T.prime, key: 'prime', per: 'p' });
    T.foh = block('foh', 'Works / factory overheads', 1, { add: true, per: 'p' });
    const wip = by('wip-open').length || by('wip-close').length;
    T.gross = T.prime + T.foh;
    if (wip) {
      rows.push({ kind: 'sub', label: 'Gross works cost', total: T.gross, key: 'gross', per: 'p' });
      by('wip-open').forEach(it => rows.push({ kind: 'adj', label: 'Add: opening work-in-process', total: it.amount, head: 'wip-open', item: it }));
      by('wip-close').forEach(it => rows.push({ kind: 'adj', label: 'Less: closing work-in-process', total: -it.amount, head: 'wip-close', item: it }));
    }
    T.works = T.gross + tot('wip-open') - tot('wip-close');
    rows.push({ kind: 'sub', label: 'Works / factory cost', total: T.works, key: 'works', per: 'p' });
    T.qc = block('qc', 'Quality control cost', 1, { add: true, per: 'p' });
    T.rd = block('rd', 'Research and development cost', 1, { add: true, per: 'p' });
    T.adminp = block('admin-prod', 'Administration overheads (production)', 1, { add: true, per: 'p' });
    T.scrap = -block('scrap', 'Credit for scrap / recoveries', -1, { per: 'p' });
    T.pack1 = block('pack1', 'Primary packing cost', 1, { add: true, per: 'p' });
    T.cop = T.works + T.qc + T.rd + T.adminp - T.scrap + T.pack1;
    rows.push({ kind: 'sub', label: 'Cost of production', total: T.cop, key: 'cop', per: 'p' });
    /* finished goods: given, or the closing units valued at this period's cost of production per unit (FIFO: opening stock is sold first) */
    T.fgOpen = tot('fg-open');
    by('fg-open').forEach(it => rows.push({ kind: 'adj', label: 'Add: opening stock of finished goods', total: it.amount, head: 'fg-open', item: it }));
    let fgClose = tot('fg-close'), fgAuto = null;
    if (!by('fg-close').length && prod && sold != null) {
      const open = +o.fgOpenUnits > 0 ? +o.fgOpenUnits : 0, closeU = open + prod - sold;
      if (closeU < -1e-9) throw new Error(`Units sold (${fmt(sold)}) are more than the opening stock (${fmt(open)}) plus the units produced (${fmt(prod)}).`);
      if (closeU > 1e-9) {
        const fromNew = Math.min(closeU, prod), fromOld = closeU - fromNew, copU = r2(T.cop / prod);
        if (fromOld > 1e-9 && !(open > 0 && T.fgOpen > 0)) throw new Error('Some closing stock comes from the opening stock: give the opening stock of finished goods as an item too.');
        fgClose = fromNew * copU + (fromOld > 0 ? (T.fgOpen / open) * fromOld : 0);
        fgAuto = { units: closeU, fromNew, fromOld, copU };
        rows.push({ kind: 'adj', label: `Less: closing stock of finished goods (${fmt(closeU)} units)`, total: -fgClose, head: 'fg-close', auto: fgAuto });
      }
    } else by('fg-close').forEach(it => rows.push({ kind: 'adj', label: 'Less: closing stock of finished goods', total: -it.amount, head: 'fg-close', item: it }));
    T.fgClose = fgClose;
    T.cogs = T.cop + T.fgOpen - fgClose;
    rows.push({ kind: 'sub', label: 'Cost of goods sold', total: T.cogs, key: 'cogs', per: 's' });
    T.admin = block('admin', 'Administration overheads (general)', 1, { add: true, per: 's' });
    T.selling = block('selling', 'Selling overheads', 1, { add: true, per: 's' });
    T.dist = block('dist', 'Distribution overheads', 1, { add: true, per: 's' });
    T.pack2 = block('pack2', 'Secondary packing cost', 1, { add: true, per: 's' });
    T.interest = block('interest', 'Interest and finance charges', 1, { add: true, per: 's' });
    T.cos = T.cogs + T.admin + T.selling + T.dist + T.pack2 + T.interest;
    rows.push({ kind: 'sub', label: 'Cost of sales', total: T.cos, key: 'cos', per: 's' });
    /* profit: from the sales, or a % on cost or on sales */
    const salesItems = by('sales');
    T.salesGross = tot('sales'); T.returns = tot('sales-less');
    if (salesItems.length) {
      T.sales = T.salesGross - T.returns; T.profit = T.sales - T.cos; T.profitHow = 'sales';
    } else if (o.profitPct != null && isFinite(o.profitPct) && o.profitOn !== 'past') {
      const p = +o.profitPct;
      if (o.profitOn === 'sales' && !(p < 100)) throw new Error('A profit on sales must be below 100%.');
      T.profit = o.profitOn === 'sales' ? (T.cos * p) / (100 - p) : (T.cos * p) / 100; T.sales = T.cos + T.profit; T.profitHow = o.profitOn === 'sales' ? 'onSales' : 'onCost'; T.p = p;
    }
    if (T.sales != null) {
      rows.push({ kind: 'key', label: T.profit < 0 ? 'Loss' : 'Profit', total: T.profit, key: 'profit', per: 's' });
      if (T.returns) { rows.push({ kind: 'item', label: 'Gross sales', inner: T.salesGross, head: 'sales' }); rows.push({ kind: 'item', label: 'Less: sales returns', inner: -T.returns, head: 'sales-less' }); }
      rows.push({ kind: 'key', label: T.returns ? 'Net sales' : 'Sales', total: T.sales, key: 'sales', per: 's' });
    }
    rows.forEach(r => { const per = r.per === 'p' ? prod : r.per === 's' ? sold : null; r.unit = r.total != null && per ? pu(r.total, per) : null; });
    return { rows, T, prod, sold, fgAuto, excluded: by('excl'), works: by('works'), selldir: by('sell-direct') };
  }

  /* ------------------------------------------------------------------ the quotation */
  const BASE = { dl: 'direct labour', prime: 'prime cost', dm: 'direct materials', works: 'works cost', cop: 'cost of production' };
  function quote(past, job, o) {
    const dp = o.pctDp === '2' ? 2 : o.pctDp === '3' ? 3 : null, rnd = x => (dp == null ? x : Math.round(x * Math.pow(10, dp) + 1e-9) / Math.pow(10, dp));
    const R = {};
    if (o.rates === 'past') {
      const P = past.T, adminAll = P.adminp + P.admin, sd = P.selling + P.dist + P.pack2;
      const pb = { dl: P.labour, prime: P.prime, dm: P.material, works: P.works };
      pb.cop = P.works + adminAll;
      const one = (key, oh, base, adj) => {
        if (!(pb[base] > 0)) throw new Error(`Last period's ${BASE[base]} is nil, so a rate on it cannot be set.`);
        const nOH = oh * (1 + (+adj || 0) / 100);
        R[key] = { oh, adj: +adj || 0, nOH, base, baseAmt: pb[base], pct: rnd((nOH / pb[base]) * 100) };
      };
      one('foh', P.foh, o.fohBase, o.adjFoh); one('adm', adminAll, o.admBase, o.adjAdm); one('sd', sd, o.sdBase, o.adjSd);
      if (o.profitOn === 'past') {
        if (past.T.sales == null) throw new Error('"Same profit as last period" needs last period\'s sales among its items.');
        R.profit = { pct: rnd((past.T.profit / past.T.cos) * 100), on: 'cost', past: true, sales: past.T.sales, profit: past.T.profit, cos: past.T.cos };
      }
    } else {
      [['foh', o.fohPct, o.fohBase], ['adm', o.admPct, o.admBase], ['sd', o.sdPct, o.sdBase]].forEach(([k, p, b]) => { const v = blank(p) ? 0 : +p; if (!isFinite(v) || v < 0) throw new Error('Overhead rates must be percentages of 0 or more.'); R[k] = { pct: v, base: b, given: true }; });
      if (o.profitOn === 'past') throw new Error('"Same profit as last period" needs rates from last period: choose that, or a profit % on cost or on sales.');
    }
    if (!R.profit) {
      const p = blank(o.profitPct) ? 0 : +o.profitPct;
      if (!isFinite(p) || p < 0 || (o.profitOn === 'sales' && p >= 100)) throw new Error('The profit must be a percentage (below 100% when it is on sales).');
      R.profit = { pct: p, on: o.profitOn === 'sales' ? 'sales' : 'cost' };
    }
    const by = h => job.filter(it => it.head === h), tot = h => sum(by(h).map(it => it.amount));
    const Q = {};
    Q.dm = tot('rm-add') + tot('rm-open') - tot('rm-less') - tot('rm-close'); Q.dl = tot('labour'); Q.de = tot('dexp'); Q.prime = Q.dm + Q.dl + Q.de;
    const baseOf = (b, at) => (b === 'dl' ? Q.dl : b === 'dm' ? Q.dm : b === 'prime' ? Q.prime : b === 'works' ? Q.works : Q.cop);
    Q.foh = (R.foh.pct / 100) * baseOf(R.foh.base); Q.extraWorks = tot('works');
    Q.works = Q.prime + Q.foh + Q.extraWorks;
    Q.adm = (R.adm.pct / 100) * baseOf(R.adm.base); Q.cop = Q.works + Q.adm;
    Q.sd = (R.sd.pct / 100) * baseOf(R.sd.base); Q.extraSell = tot('sell-direct');
    Q.total = Q.cop + Q.sd + Q.extraSell;
    Q.profit = R.profit.on === 'sales' ? (Q.total * R.profit.pct) / (100 - R.profit.pct) : (Q.total * R.profit.pct) / 100;
    Q.price = Q.total + Q.profit;
    return { R, Q };
  }

  /* ------------------------------------------------------------------ frames */
  const WHY_LINE = {
    prime: 'Prime cost is the direct cost: materials consumed + direct employee cost + direct expenses.',
    gross: 'Gross works cost = prime cost + works overheads, before the work-in-process adjustment.',
    works: 'Works (factory) cost is the cost of the goods completed in the factory this period.',
    cop: 'Cost of production adds the production-related costs after the factory (quality control, process R&D, production administration, primary packing) and deducts scrap.',
    cogs: 'Cost of goods sold is the cost of production of the goods actually sold: opening finished goods added, closing finished goods deducted.',
    cos: 'Cost of sales (total cost) adds the costs of running and selling: general administration, selling and distribution, and interest as a separate item.',
    profit: '', sales: ''
  };
  const LINE_WHY = {
    'rm-open': 'opening raw materials are available for use, so they add to the materials consumed', 'rm-close': 'closing raw materials were not used, so they are deducted',
    'wip-open': 'opening work-in-process was started last period and completed now, so its cost is added', 'wip-close': 'closing work-in-process is not finished, so its cost is deducted to leave the cost of goods completed',
    'fg-open': 'opening finished goods are sold first (FIFO), so their cost joins the cost of goods sold', 'fg-close': 'closing finished goods are not sold, so their cost is deducted'
  };
  let lastMode = 'sheet';                                             // the mode being explored: a new test problem follows it (framework: problem())
  function compute(v) {
    const mode = v.mode === 'quote' ? 'quote' : 'sheet';
    lastMode = mode;
    const items = parseItems(v.sheetItems);
    const S = sheet(items, { produced: v.produced, sold: v.sold, fgOpenUnits: v.fgOpenUnits, profitOn: v.profitOn, profitPct: blank(v.profitPct) ? null : +v.profitPct });
    const dpU = 2, frames = [];
    const unitCol = !!S.prod;
    const head = ['Particulars', '₹', '₹'].concat(unitCol ? ['Per unit (₹)'] : []);
    /* an item row shows while its block is being built and on the frame of its total; then the block folds into its total line, so the
       sheet stays short enough for a lesson embed or a phone and the line being added is always in view */
    const closeAt = S.rows.map((r, i) => { if (r.kind !== 'item') return i; let j = i; while (j < S.rows.length && S.rows[j].kind === 'item') j++; return j; });
    const WIN = 5;                                                     // lines on show while the sheet is building (a lesson embed's drawing holds about six rows)
    const sheetTable = (k, hl, title, all) => {
      const rows = [], cells = {};
      let shown = S.rows.slice(0, k).filter((r, i) => r.kind !== 'item' || closeAt[i] >= k - 1 || i === hl);
      if (!all && shown.length > WIN + 1) {
        const hidden = shown.slice(0, shown.length - WIN), lastSub = hidden.filter(r => r.kind === 'sub' || r.kind === 'key').pop();
        rows.push([`*⋮ ${hidden.length} earlier line${hidden.length > 1 ? 's' : ''}${lastSub ? `, up to ${lastSub.label.toLowerCase()}` : ''}*`, '', lastSub ? amt(lastSub.total) : ''].concat(unitCol ? [''] : []));
        for (let c = 0; c < head.length; c++) cells['0,' + c] = 'mute';
        shown = shown.slice(shown.length - WIN);
      }
      shown.forEach(r => {
        const i = rows.length, orig = S.rows.indexOf(r);
        const bold = r.kind === 'sub' || r.kind === 'key';
        rows.push([bold ? `**${r.label}**` : r.kind === 'item' ? `  ${r.label}` : r.label, r.inner != null ? (r.inner < 0 ? `(${amt(-r.inner)})` : amt(r.inner)) : '', r.total != null ? (r.total < 0 ? `(${amt(-r.total)})` : bold ? `**${amt(r.total)}**` : amt(r.total)) : '']
          .concat(unitCol ? [r.unit != null ? (r.unit < 0 ? `(${fmt(-r.unit, dpU)})` : fmt(r.unit, dpU)) : r.kind === 'adj' ? '—' : ''] : []));
        if (bold) cells[i + ',0'] = r.kind === 'key' ? 'ok' : 'd';
        if (orig === hl) for (let c = 1; c < head.length; c++) cells[i + ',' + c] = 'hl';
      });
      return { type: 'table', title: title || `Cost sheet${S.prod ? ` (output ${fmt(S.prod)} units${S.sold != null && S.sold !== S.prod ? `, sold ${fmt(S.sold)}` : ''})` : ''}`, head, rows, cells, align: ['left', 'right', 'right'].concat(unitCol ? ['right'] : []) };
    };
    if (mode === 'sheet') {
      frames.push({ caption: `**The cost sheet** arranges costs by function, line by line, in ICAI's order: materials, labour and direct expenses (prime cost), then the factory, then production, then selling. Each item goes to its head; press ▶ to watch the sheet build.${S.excluded.length ? ` ${S.excluded.length} item${S.excluded.length > 1 ? 's are' : ' is'} left out as not part of cost.` : ''}`, view: [sheetTable(0)] });
      S.rows.forEach((r, i) => {
        let cap;
        const perTxt = r.unit != null ? ` (₹${fmt(Math.abs(r.unit), 2)} per unit ${r.per === 'p' ? 'produced' : 'sold'})` : '';
        if (r.kind === 'sub' || r.kind === 'key') {
          if (r.key === 'profit') cap = S.T.profitHow === 'sales' ? `**${r.label}** = sales ${rs(S.T.sales)} − cost of sales ${rs(S.T.cos)} = **${rs(Math.abs(S.T.profit))}**${perTxt}.` :
            S.T.profitHow === 'onSales' ? `**Profit** is ${S.T.p}% of sales, which is ${pc((S.T.p / (100 - S.T.p)) * 100)} of cost: ${rs(S.T.cos)} × ${S.T.p} ⁄ ${100 - S.T.p} = **${rs(S.T.profit)}**${perTxt}.` : `**Profit** is ${S.T.p}% of cost: ${rs(S.T.cos)} × ${S.T.p}% = **${rs(S.T.profit)}**${perTxt}.`;
          else if (r.key === 'sales') cap = S.T.profitHow === 'sales' ? `**Sales** ${rs(S.T.sales)}${S.T.returns ? ` (net of returns of ${rs(S.T.returns)})` : ''}: the sheet closes, cost of sales + profit = sales.` : `**Sales** = cost of sales + profit = **${rs(S.T.sales)}**${perTxt}.`;
          else cap = `**${r.label}: ${rs(r.total)}**${perTxt}. ${WHY_LINE[r.key] || ''}`;
        } else if (r.kind === 'adj') {
          if (r.auto) { const A = r.auto; cap = `**Closing finished goods**: ${fmt(A.units)} units are left (opening ${fmt(+v.fgOpenUnits || 0)} + produced ${fmt(S.prod)} − sold ${fmt(S.sold)}). Under FIFO they come from this period's production, valued at the cost of production per unit, ₹${fmt(A.copU, 2)}${A.fromOld ? ` (${fmt(A.fromOld)} units from the opening stock at its own rate)` : ''}: **${rs(-r.total)}** is deducted because these goods are not sold.`; }
          else cap = `**${r.label.replace(/^(Add|Less): /, '')}** ${rs(Math.abs(r.total))}: ${LINE_WHY[r.head] || ''}.`;
        } else if (r.kind === 'item') cap = `**${r.label.replace(/^\s+|^Less: /g, '')}** ${rs(Math.abs(r.inner))} → ${HEAD[r.head] ? HEAD[r.head][0].toLowerCase() : r.head}${r.why ? `: ${r.why}` : LINE_WHY[r.head] ? `: ${LINE_WHY[r.head]}` : ''}.${r.item && r.item.guess ? ' (Not recognised: set its head if it belongs elsewhere.)' : ''}`;
        else cap = `**${r.label.replace(/^(Add|Less): /, '')}**${r.label1 && r.label1.toLowerCase() !== r.label.replace(/^(Add|Less): /, '').toLowerCase() ? ` (${r.label1})` : ''} ${rs(Math.abs(r.total))}${perTxt}${r.why ? `: ${r.why}` : ''}.`;
        frames.push({ caption: cap, view: [sheetTable(i + 1, i, null, i === S.rows.length - 1)] });
      });
      if (S.excluded.length) frames.push({ caption: `**Not part of cost** (SM §4.2): ${S.excluded.map(it => `${it.label} ${rs(it.amount)}${it.why ? ` — ${it.why}` : ''}`).join('; ')}.`,
        view: [sheetTable(S.rows.length, null, null, true), { type: 'table', title: 'Left out of the cost sheet', head: ['Item', '₹', 'Why'], rows: S.excluded.map(it => [it.label, amt(it.amount), it.why || 'not part of cost']), cells: Object.fromEntries(S.excluded.map((it, i) => [i + ',0', 'mute'])), align: ['left', 'right', 'left'] }] });
    }

    let Qr = null;
    if (mode === 'quote') {
      const job = parseItems(v.order, ['rm-add', 'rm-open', 'rm-less', 'rm-close', 'labour', 'dexp', 'works', 'sell-direct']);
      Qr = quote(S, job, { rates: v.rates === 'given' ? 'given' : 'past', fohBase: BASE[v.fohBase] ? v.fohBase : 'dl', admBase: v.admBase === 'prime' ? 'prime' : 'works', sdBase: v.sdBase === 'works' ? 'works' : 'cop',
        adjFoh: v.adjFoh, adjAdm: v.adjAdm, adjSd: v.adjSd, fohPct: v.fohPct, admPct: v.admPct, sdPct: v.sdPct, profitOn: v.profitOn, profitPct: v.profitPct, pctDp: v.pctDp });
      const { R, Q } = Qr, word = { foh: 'Works overheads', adm: 'Administration overheads', sd: 'Selling and distribution overheads' };
      const rateRows = k => ['foh', 'adm', 'sd'].slice(0, k).map(key => { const r = R[key]; return [word[key], r.given ? '—' : amt(r.nOH), r.given ? '—' : `${amt(r.baseAmt)} (${BASE[r.base]})`, `**${pc(r.pct)}** of ${BASE[r.base]}`]; });
      const rateView = k => ({ type: 'table', title: R.foh.given ? 'Overhead rates (given)' : 'Overhead rates from last period', head: ['Overhead', 'Amount (₹)', 'Base (₹)', 'Rate'], rows: rateRows(k), cells: k ? { [(k - 1) + ',3']: 'hl' } : {}, align: ['left', 'right', 'right', 'left'] });
      frames.push({ caption: `**Quotation (estimated cost sheet).** An order is priced before it is made: its direct costs are estimated, and overheads are added at rates ${R.foh.given ? 'given in the question' : `worked out from last period's cost sheet (prime cost ${rs(S.T.prime)}, works cost ${rs(S.T.works)})`}. Then profit is added to reach the price.`, view: [rateView(0)] });
      ['foh', 'adm', 'sd'].forEach((key, k) => {
        const r = R[key];
        const cap = r.given ? `**${word[key]}** are recovered at ${pc(r.pct)} of ${BASE[r.base]} (given).` :
          `**${word[key]}**: last period ${rs(r.oh)}${r.adj ? `, ${r.adj > 0 ? 'up' : 'down'} ${Math.abs(r.adj)}% this year = ${rs(r.nOH)}` : ''} on a ${BASE[r.base]} of ${rs(r.baseAmt)}, so the rate is ${rs(r.nOH)} ÷ ${rs(r.baseAmt)} = **${pc(r.pct)} of ${BASE[r.base]}**.${r.oh === 0 ? ' (None last period.)' : ''}`;
        frames.push({ caption: cap, view: [rateView(k + 1)] });
      });
      const qrows = [];
      const add = (label, val, kind, why) => qrows.push({ label, val, kind, why });
      job.filter(it => /^rm-/.test(it.head)).forEach(it => add(it.head === 'rm-less' || it.head === 'rm-close' ? `Less: ${it.label}` : it.label, it.head === 'rm-less' || it.head === 'rm-close' ? -it.amount : it.amount, 'item', 'estimated direct materials for the order'));
      if (job.filter(it => /^rm-/.test(it.head)).length > 1) add('Direct materials', Q.dm, 'head');
      job.filter(it => it.head === 'labour').forEach(it => add(it.label, it.amount, 'item', 'estimated direct labour'));
      job.filter(it => it.head === 'dexp').forEach(it => add(it.label, it.amount, 'item', 'a direct expense of the order'));
      add('Prime cost', Q.prime, 'sub', 'materials + labour + direct expenses of the order');
      add(`Add: works overheads (${pc(R.foh.pct)} of ${BASE[R.foh.base]})`, Q.foh, 'item', `${pc(R.foh.pct)} × ${rs(R.foh.base === 'dl' ? Q.dl : R.foh.base === 'dm' ? Q.dm : Q.prime)}`);
      job.filter(it => it.head === 'works').forEach(it => add(`Add: ${it.label}`, it.amount, 'item', 'a cost of this order added at works cost (for example a normal rectification)'));
      add('Works cost', Q.works, 'sub', 'prime cost + works overheads');
      if (Q.adm || R.adm.pct) { add(`Add: administration overheads (${pc(R.adm.pct)} of ${BASE[R.adm.base]})`, Q.adm, 'item', `${pc(R.adm.pct)} × ${rs(R.adm.base === 'prime' ? Q.prime : Q.works)}`); add('Cost of production', Q.cop, 'sub', 'works cost + administration overheads'); }
      add(`Add: selling and distribution overheads (${pc(R.sd.pct)} of ${BASE[R.sd.base]})`, Q.sd, 'item', `${pc(R.sd.pct)} × ${rs(R.sd.base === 'works' ? Q.works : Q.cop)}`);
      job.filter(it => it.head === 'sell-direct').forEach(it => add(`Add: ${it.label}`, it.amount, 'item', 'a selling or delivery cost of this order alone, added in full'));
      add('Total cost (cost of sales)', Q.total, 'sub', 'everything the order will cost');
      const pOn = R.profit.on === 'sales', pp = R.profit.pct;
      add(`Add: profit (${pc(pp)} on ${pOn ? 'price' : 'cost'})`, Q.profit, 'item', pOn ? `${pc(pp)} of the price is ${pc((pp / (100 - pp)) * 100)} of cost: ${rs(Q.total)} × ${pp} ⁄ ${+(100 - pp).toFixed(3)}` : `${rs(Q.total)} × ${pc(pp)}`);
      add('Price to be quoted', Q.price, 'key', 'total cost + profit');
      const qTable = k => {
        const cells = {};
        qrows.slice(0, k).forEach((r, i) => { if (r.kind === 'sub' || r.kind === 'key') cells[i + ',0'] = r.kind === 'key' ? 'ok' : 'd'; });
        if (k) cells[(k - 1) + ',1'] = 'hl';
        let rows = qrows.slice(0, k).map(r => [r.kind === 'sub' || r.kind === 'key' ? `**${r.label}**` : r.label, r.val < 0 ? `(${amt(-r.val)})` : r.kind === 'sub' || r.kind === 'key' ? `**${amt(r.val)}**` : amt(r.val)]);
        if (k < qrows.length && rows.length > WIN + 1) {                // the same rolling window while the estimate builds
          const cut = rows.length - WIN, lastSub = qrows.slice(0, cut).filter(r => r.kind === 'sub').pop(), c2 = {};
          Object.keys(cells).forEach(key => { const [ri, ci] = key.split(',').map(Number); if (ri >= cut) c2[(ri - cut + 1) + ',' + ci] = cells[key]; });
          rows = [[`*⋮ ${cut} earlier line${cut > 1 ? 's' : ''}${lastSub ? `, up to ${lastSub.label.toLowerCase()}` : ''}*`, lastSub ? amt(lastSub.val) : '']].concat(rows.slice(cut));
          return { type: 'table', title: 'Estimated cost sheet for the order', head: ['Particulars', '₹'], rows, cells: Object.assign({ '0,0': 'mute', '0,1': 'mute' }, c2), align: ['left', 'right'] };
        }
        return { type: 'table', title: 'Estimated cost sheet for the order', head: ['Particulars', '₹'], rows, cells, align: ['left', 'right'] };
      };
      if (R.profit.past) frames.push({ caption: `**Profit as last period**: ${rs(R.profit.profit)} on a cost of sales of ${rs(R.profit.cos)} is ${pc(R.profit.pct)} on cost (the same ${pc((R.profit.profit / R.profit.sales) * 100)} on sales).`, view: [rateView(3)] });
      qrows.forEach((r, k) => frames.push({ caption: `**${r.label.replace(/^Add: /, '')}**: ${rs(r.val)}${r.why ? ` — ${r.why}` : ''}.${r.kind === 'key' ? ` (Profit is ${pc((Q.profit / Q.price) * 100)} of the price and ${pc((Q.profit / Q.total) * 100)} of cost.)` : ''}`, view: [qTable(k + 1)] }));
    }

    /* tiles, results, conventions */
    const T = S.T, stats = [];
    if (mode === 'sheet') {
      const tile = (label, x, per, hint) => stats.push({ label: label + (per ? ` · ₹${fmt(x / per, 2)} a unit` : ''), value: rs(x), hint });
      tile('Prime cost', T.prime, S.prod, 'materials consumed + direct labour + direct expenses');
      tile('Works cost', T.works, S.prod, 'prime cost + works overheads ± work-in-process');
      tile('Cost of production', T.cop, S.prod, 'works cost + QC + R&D + production admin − scrap + primary packing');
      tile('Cost of goods sold', T.cogs, S.sold, 'cost of production ± finished goods');
      tile('Cost of sales', T.cos, S.sold, 'COGS + admin + selling + distribution + interest');
      if (T.profit != null) tile(T.profit < 0 ? 'Loss' : 'Profit', Math.abs(T.profit), S.sold, 'sales − cost of sales');
    } else {
      const Q = Qr.Q;
      stats.push({ label: `Works overheads, % of ${BASE[Qr.R.foh.base]}`, value: pc(Qr.R.foh.pct), hint: 'overheads ÷ base' });
      stats.push({ label: 'Prime cost', value: rs(Q.prime) }, { label: 'Cost of production', value: rs(Q.cop) }, { label: 'Total cost', value: rs(Q.total) }, { label: 'Price to be quoted', value: rs(Q.price), hint: 'total cost + profit' });
    }
    const table = mode === 'sheet' ? { head: ['Line', 'Total (₹)'].concat(unitCol ? ['Per unit (₹)'] : []), rows: S.rows.filter(r => r.kind === 'sub' || r.kind === 'key').map(r => [r.label, amt(r.total)].concat(unitCol ? [r.unit != null ? fmt(r.unit, 2) : '—'] : [])) }
      : { head: ['Line', '₹'], rows: [['Prime cost', amt(Qr.Q.prime)], ['Works cost', amt(Qr.Q.works)], ['Cost of production', amt(Qr.Q.cop)], ['Total cost', amt(Qr.Q.total)], ['Profit', amt(Qr.Q.profit)], ['Price to be quoted', amt(Qr.Q.price)]] };
    const note = mode === 'sheet' ? `**Conventions.** Lines follow ICAI's specimen cost sheet (SM ch. 6 §4.1). An item with no head is classified by its words (SM §3, §4.2): set the head to override. GST with input tax credit, penalties, fines and abnormal costs are left out; interest is a separate item of cost of sales. Per unit: up to cost of production per unit produced, from cost of goods sold per unit sold. Closing finished goods, when not given, are the units left (opening + produced − sold) at this period's cost of production per unit to paise (FIFO). With no sales item, profit is a % on cost or on sales.`
      : `**Conventions.** Rates from last period: works overheads ÷ ${BASE[Qr.R.foh.base]}; administration ÷ ${BASE[Qr.R.adm.base]}; selling and distribution ÷ ${BASE[Qr.R.sd.base]}, each after the change in overheads given. Works cost = prime cost + works overheads (+ costs added at works cost); cost of production = works cost + administration; total cost adds selling and distribution and the order's own selling costs. Profit on price p% = p ⁄ (100 − p) of cost.${v.pctDp === '2' || v.pctDp === '3' ? ` Rates are rounded to ${v.pctDp} decimals of a percent, as the answer does.` : ''}`;
    return { frames, stats: stats.slice(0, 6), table, note, sim: { mode, S, T, Q: Qr && Qr.Q, R: Qr && Qr.R, items } };
  }

  /* ------------------------------------------------------------------ inputs, examples, challenge */
  const TAPRI = {
    mode: 'sheet', produced: 20000, sold: 18000, fgOpenUnits: 0, profitOn: 'sales', profitPct: '', rates: 'past', fohBase: 'dl', admBase: 'works', sdBase: 'cop', adjFoh: 0, adjAdm: 0, adjSd: 0, fohPct: '', admPct: '', sdPct: '', pctDp: 'exact', order: [],
    sheetItems: [['Opening stock of raw materials (potato, maida, spices)', '1,20,000'], ['Raw materials purchased', '9,40,000'], ['Freight inwards', '18,000'], ['GST paid on purchases (ITC available)', '1,69,200'], ['Closing stock of raw materials', '78,000'],
      ['Wages paid to frying-line workers', '3,10,000'], ['Employer\'s PF and ESI on workers\' wages', '37,200'], ['Gas and power used for frying [direct expenses]', '64,000'],
      ['Depreciation of factory and fryers', '75,000'], ['Salary of the shift supervisor', '42,000'], ['Stores and spares consumed', '21,800'], ['Opening work-in-process', '30,000'], ['Closing work-in-process', '24,000'],
      ['Quality testing in the food-safety lab', '26,000'], ['Sale of scrap dough and oil cake', '9,000'], ['Food-grade trays [primary packing]', '58,000'],
      ['Office rent and accounts staff', '88,000'], ['Audit fee', '25,000'], ['Advertisement and sales commission', '96,000'], ['Delivery vans: fuel and drivers', '72,000'], ['Cartons for transport [secondary packing]', '22,000'],
      ['Interest on the cold-chain loan', '30,000'], ['Penalty for late GST filing', '5,000'], ['Sales (18,000 trays × ₹120)', '21,60,000']]
  };
  const Q0 = { produced: 0, sold: 0, fgOpenUnits: 0, adjFoh: 0, adjAdm: 0, adjSd: 0, fohPct: '', admPct: '', sdPct: '', pctDp: 'exact' };
  const presets = [
    { label: 'Tapri samosa factory, Indore: a month\'s cost sheet with stocks, scrap, packing and items left out', values: TAPRI },
    { label: 'Tapri: price a 2,000-tray order for a railway caterer on last month\'s rates (profit 20% on price)', values: Object.assign({}, Q0, { mode: 'quote', rates: 'past', fohBase: 'dl', admBase: 'works', sdBase: 'cop', profitOn: 'sales', profitPct: '20',
      sheetItems: [['Direct materials [materials]', '10,00,000'], ['Direct wages [labour]', '3,47,200'], ['Gas and power for frying [direct expenses]', '64,000'], ['Factory overheads [factory]', '1,38,800'], ['Administration overheads [admin]', '1,13,000'], ['Selling and distribution overheads [selling]', '1,90,000']],
      order: [['Raw materials for 2,000 trays [materials]', '1,05,000'], ['Direct wages [labour]', '34,000'], ['Gas and power [direct expenses]', '7,000'], ['Insulated boxes and delivery to the station [selling direct]', '6,500']] }) },
    { label: 'SM Illustration 1: a standard product, machine hour rate for overheads, closing finished goods', values: Object.assign({}, Q0, { mode: 'sheet', produced: 4000, sold: 3600, profitOn: 'sales', profitPct: '', order: [],
      sheetItems: [['Raw materials', '1,80,000'], ['Direct wages', '90,000'], ['Factory overheads (10,000 hours × ₹8)', '80,000'], ['Administration overheads (general)', '35,000'], ['Selling overheads (3,600 units × ₹5)', '18,000'], ['Sales (3,600 units × ₹125) [sales]', '4,50,000']] }) },
    { label: 'SM Illustration 2 (ABC Corporation): stocks of materials, work-in-process and finished goods', values: Object.assign({}, Q0, { mode: 'sheet', profitOn: 'sales', profitPct: '', order: [],
      sheetItems: [['Opening stock of raw materials', '60,000'], ['Purchase of raw materials', '4,80,000'], ['Closing stock of raw materials', '50,000'], ['Wages paid [labour]', '2,40,000'], ['Factory overheads', '1,00,000'],
        ['Opening work-in-process', '12,000'], ['Closing work-in-process', '15,000'], ['Administration overheads (related to production)', '50,000'], ['Opening stock of finished goods', '90,000'], ['Closing stock of finished goods', '1,10,000'],
        ['Selling and distribution overheads', '25,000'], ['Sales', '10,00,000']] }) },
    { label: 'SM Illustration 3 (Arnav Ispat Udyog): 45 items to classify, from raw materials to interest', values: Object.assign({}, Q0, { mode: 'sheet', profitOn: 'cost', profitPct: '', order: [],
      sheetItems: [['Raw materials purchased', '10,00,00,000'], ['GST paid on purchases (eligible for input tax credit)', '1,80,00,000'], ['Freight inwards', '11,20,600'], ['Wages paid to factory workers', '29,20,000'],
        ['Contribution towards employees\' PF and ESIS', '3,60,000'], ['Production bonus paid to factory workers', '2,90,000'], ['Royalty paid for production', '1,72,600'], ['Power and fuel', '4,62,000'],
        ['Moulds and patterns (₹8,96,000 over two years: amortised)', '4,48,000'], ['Job charges paid to job workers', '8,12,000'], ['Stores and spares consumed', '1,12,000'], ['Depreciation on factory building', '84,000'],
        ['Depreciation on office building', '56,000'], ['Depreciation on plant and machinery', '1,26,000'], ['Depreciation on delivery vehicles', '86,000'], ['Salary paid to supervisors', '1,26,000'],
        ['Repairs and maintenance of plant and machinery', '48,000'], ['Repairs and maintenance of sales office building', '18,000'], ['Repairs and maintenance of vehicles used by directors', '19,600'],
        ['Insurance of plant and machinery', '31,200'], ['Insurance of factory building', '18,100'], ['Insurance of stock of raw materials and WIP', '36,000'], ['Expenses for quality control check activities', '19,600'],
        ['Salary paid to quality control staff', '96,200'], ['R&D for improvement in the production process', '18,200'], ['Pollution control, engineering and maintenance', '26,600'], ['Expenses for administration of factory work', '1,18,600'],
        ['Salary: production control manager', '9,60,000'], ['Salary: finance and accounts manager', '9,18,000'], ['Salary: sales and marketing manager', '10,12,000'], ['Salary paid to the General Manager', '12,56,000'],
        ['Primary packing necessary to maintain quality', '96,000'], ['Packing for re-distribution of finished goods', '1,12,000'], ['Interest and finance charges (non-equity funds)', '7,20,000'], ['Fee paid to auditors', '1,80,000'],
        ['Fee paid to legal advisors', '1,20,000'], ['Fee paid to independent directors', '2,20,000'], ['Performance bonus paid to sales staff', '1,80,000'], ['Opening stock of raw materials', '18,00,000'],
        ['Opening work-in-process', '9,20,000'], ['Opening stock of finished goods', '11,00,000'], ['Closing stock of raw materials', '9,60,000'], ['Closing work-in-process', '8,70,000'], ['Closing stock of finished goods', '18,00,000'],
        ['Scrap and waste sold', '86,000']] }) },
    { label: 'Exam Jan 2026 Q2(a) (Dhol Makers): closing stock by FIFO, profit 20% on sales', values: Object.assign({}, Q0, { mode: 'sheet', produced: 5000, sold: 6000, fgOpenUnits: 2000, profitOn: 'sales', profitPct: '20', order: [],
      sheetItems: [['Raw material consumed (worked back from the cost of production) [materials]', '15,00,000'], ['Direct labour wages', '6,00,000'], ['Hire of specific equipment (600 labour hours × ₹315) [direct expenses]', '1,89,000'], ['Fee paid for technical assistance', '1,26,000'],
        ['Lease rent of production assets', '1,20,000'], ['Pollution control and maintenance', '93,400'], ['Quality control check activities', '70,000'], ['Primary packing cost', '51,600'],
        ['Opening stock of finished goods (2,000 units)', '10,10,000'], ['Selling and distribution overheads (₹25 × 6,000 sold) [selling]', '1,50,000']] }) },
    { label: 'Exam Jan 2025 Q4(b) (LMN Foods): rates from 2023, quotation for a bulk order at 20% profit on sales', values: Object.assign({}, Q0, { mode: 'quote', rates: 'past', fohBase: 'dl', admBase: 'works', sdBase: 'cop', profitOn: 'sales', profitPct: '20',
      sheetItems: [['Opening inventory of raw materials', '2,00,000'], ['Raw material purchases', '12,00,000'], ['Closing inventory of raw materials', '2,50,000'], ['Labour costs [labour]', '5,00,000'], ['Production overheads [factory]', '2,50,000'], ['Marketing and distribution expenses [selling]', '1,52,000']],
      order: [['Estimated raw material cost [materials]', '3,00,000'], ['Estimated labour cost [labour]', '1,50,000'], ['Packaging and transportation [selling direct]', '49,400']] }) },
    { label: 'MTP Sep 2026 Series I Q2(a) (Riya Engineering, Job No. 707): given rates, a normal rectification, 20% profit on price', values: Object.assign({}, Q0, { mode: 'quote', rates: 'given', fohBase: 'dl', admBase: 'works', sdBase: 'cop', fohPct: '60', admPct: '10', sdPct: '8', profitOn: 'sales', profitPct: '20', sheetItems: [],
      order: [['Direct materials issued [materials]', '45,000'], ['Less: materials returned to stores [less]', '3,000'], ['Direct labour (250 hours × ₹80) [labour]', '20,000'], ['Direct expenses [direct expenses]', '6,000'],
        ['Rectification (normal): material [works]', '1,200'], ['Rectification (normal): labour 15 hours × ₹80 [works]', '1,200']] }) },
    { label: 'RTP Jan 2026 Q13: last year\'s rates with factory overheads −10% and S&D +20%, same profit % as last year', values: Object.assign({}, Q0, { mode: 'quote', rates: 'past', fohBase: 'dl', admBase: 'works', sdBase: 'works', adjFoh: -10, adjAdm: 0, adjSd: 20, profitOn: 'past', profitPct: '', pctDp: '3',
      sheetItems: [['Direct materials [materials]', '12,50,000'], ['Direct wages [labour]', '9,80,000'], ['Factory overheads [factory]', '5,75,000'], ['Administration overheads [admin]', '5,40,000'], ['Selling and distribution overheads [selling]', '6,30,000'], ['Sales (cost of sales ₹39,75,000 + profit ₹8,25,000) [sales]', '48,00,000']],
      order: [['Direct materials [materials]', '3,20,000'], ['Direct labour [labour]', '2,10,000']] }) }
  ];

  /* the challenge */
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const L = x => x.toLocaleString('en-IN');
  const ASK = { prime: 'prime cost', works: 'works (factory) cost', cop: 'cost of production', cogs: 'cost of goods sold', cos: 'cost of sales', profit: 'profit' };
  function gen(r, mode) {
    if (mode === 'quote') {
      const dm = ri(r, 20, 90) * 1000, dl = ri(r, 10, 60) * 1000, past = { dm: ri(r, 40, 120) * 10000, dl: ri(r, 20, 80) * 10000 };
      const fohPct = [40, 50, 60, 75, 80, 100, 120][ri(r, 0, 6)], admPct = [5, 8, 10, 12, 15][ri(r, 0, 4)], sdPct = [4, 5, 6, 8, 10][ri(r, 0, 4)];
      const foh = (past.dl * fohPct) / 100, works = past.dm + past.dl + foh, adm = (works * admPct) / 100, sd = ((works + adm) * sdPct) / 100;
      const on = r() < 0.5 ? 'cost' : 'sales', p = on === 'cost' ? [10, 15, 20, 25][ri(r, 0, 3)] : [10, 20, 25][ri(r, 0, 2)];
      return { mode: 'quote', rates: 'past', fohBase: 'dl', admBase: 'works', sdBase: 'cop', adjFoh: 0, adjAdm: 0, adjSd: 0, profitOn: on, profitPct: String(p), pctDp: 'exact', produced: 0, sold: 0, fgOpenUnits: 0,
        sheetItems: [['Direct materials [materials]', L(past.dm)], ['Direct wages [labour]', L(past.dl)], ['Factory overheads [factory]', L(foh)], ['Administration overheads [admin]', L(adm)], ['Selling and distribution overheads [selling]', L(sd)]],
        order: [['Direct materials [materials]', L(dm)], ['Direct labour [labour]', L(dl)]], _ask: 'price' };
    }
    const k = n => ri(r, 1, n) * 1000;
    const items = [['Opening stock of raw materials [opening raw materials]', L(k(40))], ['Raw materials purchased [materials]', L(k(400) + 100000)], ['Closing stock of raw materials [closing raw materials]', L(k(30))],
      ['Direct wages [labour]', L(k(200) + 50000)], ['Direct expenses [direct expenses]', L(k(30))], ['Factory overheads [factory]', L(k(120))], ['Opening work-in-process [opening WIP]', L(k(20))],
      ['Closing work-in-process [closing WIP]', L(k(20))], ['Quality control [quality]', L(k(15))], ['Scrap sold [scrap]', L(k(5))], ['Primary packing [primary packing]', L(k(10))],
      ['Opening stock of finished goods [opening finished goods]', L(k(60))], ['Closing stock of finished goods [closing finished goods]', L(k(60))], ['Administration overheads (general) [admin]', L(k(50))],
      ['Selling overheads [selling]', L(k(40))], ['Distribution overheads [distribution]', L(k(30))]];
    const pick = items.filter((it, i) => i < 4 || r() < 0.7);
    const ask = ['prime', 'works', 'cop', 'cogs', 'cos', 'profit'][ri(r, 0, 5)];
    const T = sheet(parseItems(pick), {}).T;
    pick.push(['Sales [sales]', L(Math.round((T.cos * (1 + ri(r, 5, 30) / 100)) / 1000) * 1000)]);
    return { mode: 'sheet', produced: 0, sold: 0, fgOpenUnits: 0, profitOn: 'sales', profitPct: '', sheetItems: pick, order: [], _ask: ask };
  }

  const ITEM_COLS = [{ id: 'i', label: 'Item [head]', type: 'text' }, { id: 'a', label: 'Amount ₹', type: 'text' }];
  const def = {
    id: 'cost-sheet', title: 'Cost Sheet Lab',
    blurb: 'Build the ICAI cost sheet line by line, from materials consumed to cost of sales and profit, and price an order.',
    controls: [
      { id: 'mode', type: 'seg', label: 'Prepare', value: 'sheet', options: [['sheet', 'Cost sheet'], ['quote', 'Quotation']] },
      { id: 'sheetItems', type: 'table', label: 'The period\'s items, a head in [brackets] if you want to set it (in quotation mode: last period\'s figures, which set the rates)', short: 'Items', max: 60, rows: TAPRI.sheetItems, cols: ITEM_COLS,
        help: 'Without [a head] the lab classifies the item by its words. Heads: purchases, opening / closing raw materials, labour, direct expenses, factory, opening / closing WIP, quality, R&D, admin production, scrap, primary packing, opening / closing finished goods, admin, selling, distribution, secondary packing, interest, sales, exclude.' },
      { id: 'produced', type: 'number', label: 'Units produced (0 = no per-unit column)', short: 'Units produced', value: TAPRI.produced, min: 0, max: 1e9, show: v => v.mode !== 'quote' },
      { id: 'sold', type: 'number', label: 'Units sold', value: TAPRI.sold, min: 0, max: 1e9, show: v => v.mode !== 'quote' },
      { id: 'fgOpenUnits', type: 'number', label: 'Opening finished goods (units), to value the closing stock when it is not given', short: 'Opening FG units', value: 0, min: 0, max: 1e9, show: v => v.mode !== 'quote' },
      { id: 'rates', type: 'seg', label: 'Overhead rates', value: 'past', options: [['past', 'From last period'], ['given', 'Given']], show: v => v.mode === 'quote' },
      { id: 'fohBase', type: 'select', label: 'Works overheads recovered on', value: 'dl', options: [['dl', 'Direct labour'], ['prime', 'Prime cost'], ['dm', 'Direct materials']], show: v => v.mode === 'quote' },
      { id: 'admBase', type: 'select', label: 'Administration overheads recovered on', value: 'works', options: [['works', 'Works cost'], ['prime', 'Prime cost']], show: v => v.mode === 'quote' },
      { id: 'sdBase', type: 'select', label: 'Selling and distribution overheads recovered on', value: 'cop', options: [['cop', 'Cost of production'], ['works', 'Works cost']], show: v => v.mode === 'quote' },
      { id: 'fohPct', type: 'text', label: 'Works overheads, % of its base', value: '', placeholder: 'e.g. 60', show: v => v.mode === 'quote' && v.rates === 'given' },
      { id: 'admPct', type: 'text', label: 'Administration overheads, % of its base', value: '', placeholder: 'e.g. 10', show: v => v.mode === 'quote' && v.rates === 'given' },
      { id: 'sdPct', type: 'text', label: 'Selling and distribution overheads, % of its base', value: '', placeholder: 'e.g. 8', show: v => v.mode === 'quote' && v.rates === 'given' },
      { id: 'adjFoh', type: 'number', label: 'Change in works overheads this year (%)', short: 'Works OH change %', value: 0, min: -100, max: 1000, show: v => v.mode === 'quote' && v.rates !== 'given' },
      { id: 'adjAdm', type: 'number', label: 'Change in administration overheads (%)', short: 'Admin OH change %', value: 0, min: -100, max: 1000, show: v => v.mode === 'quote' && v.rates !== 'given' },
      { id: 'adjSd', type: 'number', label: 'Change in selling and distribution overheads (%)', short: 'S&D change %', value: 0, min: -100, max: 1000, show: v => v.mode === 'quote' && v.rates !== 'given' },
      { id: 'pctDp', type: 'select', label: 'Round the rates', value: 'exact', options: [['exact', 'No (exact)'], ['3', 'To 3 decimals of a %'], ['2', 'To 2 decimals of a %']], show: v => v.mode === 'quote' },
      { id: 'order', type: 'table', label: 'The order\'s estimated costs, each with a head in [brackets]: materials, less, labour, direct expenses, works (added at works cost), selling direct', short: 'Order', max: 12, rows: [], cols: ITEM_COLS, show: v => v.mode === 'quote' },
      { id: 'profitOn', type: 'select', label: 'Profit', value: 'sales', options: [['cost', '% on cost'], ['sales', '% on sales (price)'], ['past', 'Same % as last period']],
        help: 'Used when the items have no sales figure (cost sheet) and for a quotation.' },
      { id: 'profitPct', type: 'text', label: 'Profit %', value: '', placeholder: 'e.g. 20', show: v => v.profitOn !== 'past' }
    ],
    presets, compute,
    challenge: {
      title: 'Fill the cost sheet',
      gen: r => gen(r, lastMode),
      prompt: (v, res) => v.mode === 'quote'
        ? `Using last period's figures, works overheads are recovered as a % of direct wages, administration as a % of works cost, and selling and distribution as a % of cost of production. With profit at ${v.profitPct}% on ${v.profitOn === 'sales' ? 'the price' : 'cost'}, **what price should be quoted for the order (₹)?**`
        : `Prepare the cost sheet from these items. **What is the ${ASK[v._ask]} (₹)?**`,
      solve: (res, v) => (v.mode === 'quote' ? Math.round(res.sim.Q.price * 100) / 100 : Math.round(res.sim.T[v._ask] * 100) / 100),
      tol: 1, unit: '₹', kind: 'num',
      view: (res, v) => [{ type: 'table', title: v.mode === 'quote' ? 'Last period' : 'Items of the period', head: ['Item', '₹'], rows: (v.sheetItems || []).map(it => [it[0], it[1]]), align: ['left', 'right'] }]
        .concat(v.mode === 'quote' ? [{ type: 'table', title: 'The order', head: ['Item', '₹'], rows: (v.order || []).map(it => [it[0], it[1]]), align: ['left', 'right'] }] : []),
      explain: (res, v) => {
        const T = res.sim.T;
        if (v.mode === 'quote') { const Q = res.sim.Q, R = res.sim.R; return `Rates: works ${pc(R.foh.pct)} of direct labour, administration ${pc(R.adm.pct)} of works cost, S&D ${pc(R.sd.pct)} of cost of production. Prime ${rs(Q.prime)} + works OH ${rs(Q.foh)} = works ${rs(Q.works)}; + admin ${rs(Q.adm)} = COP ${rs(Q.cop)}; + S&D ${rs(Q.sd)} = total ${rs(Q.total)}; + profit ${rs(Q.profit)} = **${rs(Q.price)}**.`; }
        return `Materials consumed ${rs(T.material)} + labour ${rs(T.labour)} + direct expenses ${rs(T.dexp)} = prime ${rs(T.prime)}; + works OH ${rs(T.foh)} ± WIP = works ${rs(T.works)}; + QC/R&D/admin(prod) − scrap + primary packing = COP ${rs(T.cop)}; ± finished goods = COGS ${rs(T.cogs)}; + admin, selling, distribution = cost of sales ${rs(T.cos)}; profit ${rs(T.profit)}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, classify, headOf, parseItems, sheet, quote, compute, def, presets, gen };
  g.__lab_def_cost_sheet = def;
})(typeof window !== 'undefined' ? window : globalThis);
