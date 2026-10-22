/* PassBook — Joint and By-Products Lab (cma.joint; ICAI Study Material Paper 4, Chapter 11).
   Three modes, all pure and Node-testable (`require('app/js/labs/joint.js')` exposes the helpers and compute):
     apportion  the joint cost split by one method, statement row by row, then every method the Study Material lists side by side:
                physical units (= average unit cost), sales value at split-off (market value at separation), net realisable value,
                sales value after further processing, constant gross margin % NRV, contribution margin, technical estimates
     further    sell at split-off or process further: incremental revenue against incremental cost, product by product; the best plan
     byprod     a by-product's net realisable value and its three treatments: other income, a credit to the joint cost before apportioning
                (ICAI's usual answer), or a share of the joint cost as if it were a joint product
   Conventions (stated in each result's note): the base is units produced; NRV = sales after further processing − further processing
   cost − selling costs (− a normal profit margin when one is given); sales value at split-off is gross; incremental cost = further cost +
   selling costs after − selling costs at split-off. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : '₹' + n);

  /* ================================================================== small pure helpers */
  function num(x) {
    if (typeof x === 'number') return x;
    const s = String(x == null ? '' : x).replace(/[₹,\s%]/g, '').replace(/[−–]/g, '-');
    return s === '' ? NaN : Number(s);
  }
  const num0 = x => { const n = num(x); return Number.isFinite(n) ? n : 0; };
  const clean = x => (Math.abs(x) < 1e-9 ? 0 : x);
  const money = (x, rupees) => clean(rupees ? Math.round(x + 1e-9 * Math.sign(x)) : Math.round(x * 100 + 1e-7 * Math.sign(x)) / 100);
  /** an amount in a table cell: Indian grouping, paise only when there are some; a negative in brackets, as ICAI prints it */
  const amt = x => { const v = clean(x); const s = Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: 2 }); return v < 0 ? `(${s})` : s; };
  const un = x => clean(Math.round(x * 100) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const pc = x => `${+(+x).toFixed(2)}%`;
  /** a price or a cost per unit: whole rupees, or up to four decimals */
  const per = x => { const near = k => Math.abs(x - Math.round(x * 10 ** k) / 10 ** k) < 5e-7; const d = near(0) ? 0 : near(2) ? 2 : near(3) ? 3 : 2; return (x < 0 ? '−' : '') + '₹' + Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d }); };
  const sum = a => a.reduce((s, x) => s + x, 0);
  /** a ratio in lowest whole terms when the bases allow it (3 : 4 : 2), else percentages */
  function ratioText(xs) {
    const ok = xs.every(x => x > 0 && Math.abs(x - Math.round(x)) < 1e-6);
    if (ok) {
      const gcd = (a, b) => (b ? gcd(b, a % b) : a), gg = xs.map(Math.round).reduce(gcd);
      const r = xs.map(x => Math.round(x) / gg);
      if (r.every(x => x <= 999)) return r.join(' : ');
    }
    const t = sum(xs);
    return xs.map(x => pc(Math.round((x / t) * 10000) / 100)).join(' : ');
  }
  /** shares of `total` in proportion to `w`, rounded (to the rupee or paisa) with the largest remainder so they add up exactly */
  function split(total, w, rupees) {
    const W = sum(w);
    if (!(W > 0)) throw new Error('The basis of apportionment adds up to nothing.');
    const raw = w.map(x => (total * x) / W), unit = rupees ? 1 : 0.01;
    const r = raw.map(x => Math.floor(x / unit + 1e-7) * unit);
    let left = Math.round((total - sum(r)) / unit);
    raw.map((x, i) => [x - r[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { r[i] += unit; left--; } });
    return r.map(x => clean(Math.round(x / unit) * unit));
  }

  /* ================================================================== products */
  /** the split-off table [name, units, price a unit (0 = no market at split-off), selling costs ₹ if sold there] and the further-processing
      table [name, further cost ₹, units out (0 = the same), price a unit after, selling costs ₹ after] → one record per product */
  function products(rows, frows, margin) {
    const P = [], by = new Map();
    (rows || []).forEach((r, i) => {
      const name = String(r && r[0] != null ? r[0] : '').trim();
      if (!name) throw new Error(`Row ${i + 1} of the joint products needs a name.`);
      if (by.has(name.toLowerCase())) throw new Error(`Two products are called "${name}".`);
      const units = num0(r[1]), price = num0(r[2]), sellS = num0(r[3]);
      if (!(units > 0)) throw new Error(`${name}: give the units produced at the split-off (more than 0).`);
      if (price < 0 || sellS < 0) throw new Error(`${name}: prices and costs cannot be negative.`);
      const p = { name, units, price, sellS, split: price > 0 ? units * price : null, further: null };
      P.push(p); by.set(name.toLowerCase(), p);
    });
    if (P.length < 2) throw new Error('A joint process gives at least two joint products: add another row.');
    (frows || []).forEach((r, i) => {
      const name = String(r && r[0] != null ? r[0] : '').trim();
      if (!name && !num0(r[1]) && !num0(r[3])) return;
      const p = by.get(name.toLowerCase());
      if (!p) throw new Error(`Further-processing row ${i + 1} names "${name}", which is not one of the joint products.`);
      if (p.further) throw new Error(`${p.name} has two further-processing rows.`);
      const cost = num0(r[1]), uOut = num0(r[2]), price = num0(r[3]), sell = num0(r[4]);
      if (cost < 0 || uOut < 0 || price < 0 || sell < 0) throw new Error(`${p.name}: further-processing figures cannot be negative.`);
      if (!(price > 0)) throw new Error(`${p.name}: give the selling price after further processing.`);
      p.further = { cost, units: uOut > 0 ? uOut : p.units, price, sell, sales: (uOut > 0 ? uOut : p.units) * price };
    });
    P.forEach(p => {
      if (p.split == null && !p.further) throw new Error(`${p.name} has no price at split-off and no further processing: give one of them.`);
      p.finalSales = p.further ? p.further.sales : p.split;
      p.sep = p.further ? p.further.cost + p.further.sell : p.sellS;            // separable costs on the way to the final sale
      p.marginAmt = (margin / 100) * p.finalSales;
      p.nrv = p.finalSales - p.sep - p.marginAmt;
    });
    return P;
  }

  const METHODS = [
    ['physical', 'Physical units (= average unit cost)'],
    ['sales', 'Sales value at split-off'],
    ['nrv', 'Net realisable value (NRV)'],
    ['final', 'Sales value after further processing'],
    ['cgm', 'Constant gross margin % (NRV)'],
    ['contrib', 'Contribution margin'],
    ['tech', 'Technical estimates']
  ];
  const MNAME = Object.fromEntries(METHODS);
  const SHORT = { physical: 'Physical units', sales: 'Sales value at split-off', nrv: 'NRV', final: 'Sales after further processing', cgm: 'Constant gross margin', contrib: 'Contribution margin', tech: 'Technical estimates' };

  /** one method's apportionment of `J` over products P → {shares, basis, rows (the statement), na (why it cannot apply)} */
  function apportion(method, J, P, o) {
    const rupees = o.rupees !== false, M = x => money(x, rupees), names = P.map(p => p.name);
    const out = { method, shares: null, rows: [], na: null, ratio: null };
    const row = (label, cells, opt) => out.rows.push(Object.assign({ label, cells }, opt || {}));
    const total = cells => sum(cells.map(c => (typeof c === 'number' ? c : 0)));
    const byBasis = (basis, label, fmt) => {
      if (basis.some(b => !(b > 0))) { out.na = `${label} must be positive for every product`; return; }
      out.ratio = ratioText(basis);
      out.shares = split(J, basis, rupees);
      row('Ratio', basis.map(b => pc(Math.round((b / sum(basis)) * 10000) / 100)), { tot: out.ratio, why: `the joint cost is shared in the ratio ${out.ratio}` });
      row('Joint cost apportioned', out.shares, { money: true, tot: J, key: true });
    };
    if (method === 'physical') {
      const u = P.map(p => p.units);
      row('Units produced at split-off', u.map(un), { tot: un(sum(u)) });
      byBasis(u, 'Units');
      if (out.shares) row('Joint cost per unit', P.map((p, i) => per(out.shares[i] / p.units)), { tot: per(J / sum(u)) });
    } else if (method === 'sales') {
      if (P.some(p => p.split == null)) { out.na = `${P.filter(p => p.split == null).map(p => p.name).join(', ')} cannot be sold at split-off`; return out; }
      row('Units × price at split-off', P.map(p => `${un(p.units)} × ${per(p.price)}`));
      row('Sales value at split-off', P.map(p => p.split), { money: true, tot: sum(P.map(p => p.split)) });
      byBasis(P.map(p => p.split), 'Sales value at split-off');
    } else if (method === 'nrv') {
      row('Sales value after further processing', P.map(p => p.finalSales), { money: true, tot: sum(P.map(p => p.finalSales)) });
      if (P.some(p => p.further && p.further.cost)) row('Less: further processing cost', P.map(p => (p.further ? -p.further.cost : 0)), { money: true, tot: -sum(P.map(p => (p.further ? p.further.cost : 0))) });
      if (P.some(p => (p.further ? p.further.sell : p.sellS))) row('Less: selling and distribution costs', P.map(p => -(p.further ? p.further.sell : p.sellS)), { money: true, tot: -sum(P.map(p => (p.further ? p.further.sell : p.sellS))) });
      if (o.margin) row(`Less: normal profit margin (${pc(o.margin)} of sales)`, P.map(p => -p.marginAmt), { money: true, tot: -sum(P.map(p => p.marginAmt)) });
      row('Net realisable value at split-off', P.map(p => p.nrv), { money: true, tot: sum(P.map(p => p.nrv)) });
      byBasis(P.map(p => p.nrv), 'NRV');
    } else if (method === 'final') {
      row('Sales value after further processing', P.map(p => p.finalSales), { money: true, tot: sum(P.map(p => p.finalSales)) });
      byBasis(P.map(p => p.finalSales), 'Final sales value');
    } else if (method === 'cgm') {
      const S = sum(P.map(p => p.finalSales)), sep = sum(P.map(p => p.sep)), gm = (S - J - sep) / S;
      out.gm = gm;
      row('Sales value after further processing', P.map(p => p.finalSales), { money: true, tot: S });
      row(`Less: gross margin at ${pc(Math.round(gm * 10000) / 100)}`, P.map(p => -M(p.finalSales * gm)), { money: true, tot: -M(S * gm), why: `the whole output earns (${inr(S)} − joint ${inr(J)} − separable ${inr(sep)}) ÷ ${inr(S)} = ${pc(Math.round(gm * 10000) / 100)}, and every product is made to earn the same %` });
      row('Cost of goods sold', P.map(p => M(p.finalSales * (1 - gm))), { money: true, tot: M(S * (1 - gm)) });
      row('Less: separable costs (further processing and selling)', P.map(p => -p.sep), { money: true, tot: -sep });
      const raw = P.map(p => p.finalSales * (1 - gm) - p.sep), sh = raw.map(M);
      const d = M(J - sum(sh)); if (d) { const k = sh.indexOf(Math.max(...sh)); sh[k] = M(sh[k] + d); }
      out.shares = sh;
      row('Joint cost apportioned', sh, { money: true, tot: J, key: true });
      if (sh.some(x => x < 0)) out.warn = 'a product gets a negative share: its separable costs exceed its sales less the margin';
    } else if (method === 'contrib') {
      const V = o.varCost;
      if (!(V > 0)) { out.na = 'give the variable part of the joint cost'; return out; }
      if (V > J + 1e-9) throw new Error('The variable part of the joint cost cannot be more than the joint cost.');
      const useSplit = P.every(p => p.split != null);
      const sales = P.map(p => (useSplit ? p.split : p.finalSales - p.sep));
      const vShare = split(V, P.map(p => p.units), rupees), contrib = sales.map((s, i) => s - vShare[i]);
      row(useSplit ? 'Sales value at split-off' : 'Sales after further processing, less further costs', sales, { money: true, tot: sum(sales) });
      row('Less: variable joint cost (by units)', vShare.map(x => -x), { money: true, tot: -V, why: `the variable ${inr(V)} follows the units, ${ratioText(P.map(p => p.units))}` });
      row('Contribution', contrib, { money: true, tot: sum(contrib) });
      if (contrib.some(c => !(c > 0))) { out.na = 'a product has no positive contribution'; return out; }
      const fShare = split(J - V, contrib, rupees);
      row('Fixed joint cost (by contribution)', fShare, { money: true, tot: J - V, why: `the fixed ${inr(J - V)} follows the contributions, ${ratioText(contrib)}` });
      out.shares = vShare.map((x, i) => M(x + fShare[i])); out.ratio = ratioText(contrib);
      row('Joint cost apportioned (variable + fixed)', out.shares, { money: true, tot: J, key: true });
    } else if (method === 'tech') {
      const parts = String(o.techRatio == null ? '' : o.techRatio).split(/[\s,;:/]+/).filter(Boolean).map(num);
      if (!parts.length) { out.na = 'give the technical estimate weights'; return out; }
      if (parts.length !== P.length || parts.some(x => !(x > 0))) { out.na = `give ${P.length} positive weights, one per product (${names.join(', ')}), e.g. ${P.map((p, i) => P.length - i).join(':')}`; return out; }
      row('Technical estimate (weight)', parts.map(x => String(x)), { tot: ratioText(parts) });
      byBasis(parts, 'Weights');
    }
    if (out.shares) row('Joint cost per unit', P.map((p, i) => per(out.shares[i] / p.units)), { tot: '' });
    return out;
  }

  /* ---- drawing */
  /** the statement as a table: rows of the method, products across, a Total column; rows after `upto` are blank */
  function statement(title, P, rows, upto, hl) {
    const head = ['Particulars'].concat(P.map(p => p.name), ['Total']);
    const cell = (r, c) => (r.money ? amt(c) : c == null ? '' : String(c));
    const body = rows.map((r, i) => (i < upto ? [r.key ? `**${r.label}**` : r.label].concat(r.cells.map(c => (r.key ? `**${cell(r, c)}**` : cell(r, c))), [r.tot == null ? '' : r.key ? `**${cell(r, r.tot)}**` : cell(r, r.tot)]) : [r.label].concat(P.map(() => ''), [''])));
    const cells = {};
    if (hl != null && hl < body.length) for (let c = 0; c < head.length; c++) cells[`${hl},${c}`] = 'hl';
    return { type: 'table', title, head, rows: body, cells, align: ['left'].concat(head.slice(1).map(() => 'right')) };
  }
  /** the split-off as a tree: the joint cost at the top, a branch per product; shares and ratios appear when known */
  function splitTree(J, P, shares, label, extra) {
    const kids = P.map((p, i) => Object.assign({ label: shares ? `${p.name}\n${inr(shares[i])}` : `${p.name}\n${un(p.units)} units`, color: 'abcdefgh'[i % 8] },
      shares && sum(shares) ? { edge: pc(Math.round((shares[i] / sum(shares)) * 1000) / 10), note: `${per(shares[i] / p.units)} a unit` } : {}));
    if (extra) kids.push(extra);
    return { type: 'tree', title: label || 'The split-off point', root: { label: `Joint process\n${inr(J)}`, color: 'mute', children: kids } };
  }

  /* ================================================================== mode 1: apportion */
  function allMethods(J, P, o, focus) {
    return METHODS.filter(([m]) => m !== 'tech' || focus === 'tech').map(([m, name]) => { let r; try { r = apportion(m, J, P, o); } catch (e) { r = { method: m, na: e.message, shares: null }; } return Object.assign(r, { name }); });
  }
  /** every usable method side by side (the ones that cannot apply are named in the caption, with the reason) */
  function compareTable(J, P, all, focus) {
    const ok = all.filter(r => r.shares);
    const rows = ok.map(r => ({ cls: r.method === focus ? 'avgrow' : '', cells: [SHORT[r.method]].concat(r.shares.map(amt), [amt(sum(r.shares))]) }));
    return { head: ['Method'].concat(P.map(p => p.name), ['Total']), rows, na: all.filter(r => !r.shares).map(r => `${SHORT[r.method].toLowerCase().replace('nrv', 'NRV')} (${r.na})`) };
  }
  function computeApportion(v, P, J, o) {
    const m = MNAME[v.method] ? v.method : 'physical', A = apportion(m, J, P, o);
    if (A.na) throw new Error(`${MNAME[m]} cannot be used here: ${A.na}. Pick another method.`);
    const frames = [], title = `Apportionment of ${inr(J)} · ${MNAME[m]}`;
    const intro = {
      physical: 'Physical units: every unit carries the same joint cost, so each product\'s share follows its output (the average unit cost method gives the same answer).',
      sales: 'Sales value at split-off (market value at the point of separation): a product that is worth more at the split-off carries more of the cost.',
      nrv: 'Net realisable value: work back from the final sales value, taking off what is still to be spent after the split-off, to what each product is worth at the split-off.',
      final: 'Sales value after further processing: the shares follow the final sales values, ignoring the costs still to be incurred (unfair when they differ a lot).',
      cgm: 'Constant gross margin % NRV: every product is made to earn the same gross margin % as the whole output, and its joint cost is what is left.',
      contrib: 'Contribution margin: the variable joint cost follows the units; the fixed joint cost follows each product\'s contribution.',
      tech: 'Technical estimates: the engineers\' estimate of what each product draws from the joint process sets the ratio.'
    }[m];
    frames.push({ caption: `**${inr(J)}** was spent before the split-off; until then the products cannot be told apart. ${intro}`, view: [splitTree(J, P, null), statement(title, P, A.rows, 0)] });
    A.rows.forEach((r, i) => {
      const list = r.cells.map((c, j) => `${P[j].name} ${r.money ? inr(c) : c}`).join(', ');
      let why = r.why ? `**${r.label}**: ${r.why}.` : `**${r.label}**: ${list}.`;
      if (r.label.startsWith('Sales value after')) why = `**${r.label}** = units × final price: ${P.map(p => `${p.name} ${inr(p.finalSales)}`).join(', ')}.`;
      else if (r.label.startsWith('Sales value at split')) why = `**${r.label}** = units × price at split-off: ${P.map(p => `${p.name} ${inr(p.split)}`).join(', ')}.`;
      else if (r.label.startsWith('Units produced')) why = `**Units produced** at the split-off: ${P.map(p => `${p.name} ${un(p.units)}`).join(', ')}.`;
      else if (r.label.startsWith('Less: further')) why = '**Less the further processing cost**: it is spent after the split-off, so it is not part of what the product was worth there.';
      else if (r.label.startsWith('Less: selling')) why = '**Less the selling and distribution costs** that are still to be spent to make the sale.';
      else if (r.label.startsWith('Less: normal profit')) why = `**Less the normal profit margin** (${pc(o.margin)} of sales) that the later stages are expected to earn.`;
      else if (r.label.startsWith('Net realisable')) why = `**NRV at split-off**: ${P.map(p => `${p.name} ${inr(p.nrv)}`).join(', ')}. These are the bases.`;
      else if (r.label === 'Joint cost apportioned' || r.key) why = `**Joint cost apportioned**: ${P.map((p, i) => `${p.name} ${inr(A.shares[i])}`).join(', ')}; together ${inr(J)}.`;
      else if (r.label === 'Joint cost per unit') why = `**Joint cost per unit**: ${P.map((p, i) => `${p.name} ${per(A.shares[i] / p.units)}`).join(', ')}.`;
      else if (r.label === 'Ratio' && !r.why) why = `**Ratio** ${A.ratio}.`;
      const shown = A.rows.slice(0, i + 1).some(x => x.key) ? A.shares : null;
      frames.push({ caption: why, view: [splitTree(J, P, shown), statement(title, P, A.rows, i + 1, i)] });
    });
    const all = allMethods(J, P, o, m);
    const cmp = compareTable(J, P, all, m);
    frames.push({ caption: `Every method side by side. They give different shares of the same ${inr(J)}${A.warn ? ` (here ${A.warn})` : ''}: the method changes the product costs and profits, never the total. ICAI usually names the method; NRV is the one to use when some products are processed further.${cmp.na.length ? ` Not usable here: ${cmp.na.join('; ')}.` : ''}`,
      view: [splitTree(J, P, A.shares), { type: 'table', title: 'Joint cost apportioned, every method (₹)', head: cmp.head, rows: cmp.rows.map(r => r.cells), cells: Object.fromEntries(cmp.rows.flatMap((r, i) => (r.cls ? cmp.head.map((h, c) => [`${i},${c}`, 'hl']) : []))), align: ['left'].concat(cmp.head.slice(1).map(() => 'right')) }] });
    return {
      frames, sim: { P, J, A, all, method: m }, mode: 'apportion',
      stats: P.slice(0, 5).map((p, i) => ({ label: `Joint cost to ${p.name}`, value: inr(A.shares[i]), hint: `${MNAME[m]}; ${per(A.shares[i] / p.units)} a unit` }))
        .concat([m === 'physical' ? { label: 'Average joint cost a unit', value: per(J / sum(P.map(p => p.units))), hint: 'joint cost ÷ total units produced' } : m === 'cgm' ? { label: 'Constant gross margin', value: pc(Math.round(A.gm * 10000) / 100), hint: '(final sales − joint cost − separable costs) ÷ final sales' } : { label: 'Ratio of apportionment', value: A.ratio || '—', hint: MNAME[m] }]).slice(0, 6),
      table: { head: cmp.head, rows: cmp.rows }
    };
  }

  /* ================================================================== mode 2: process further? */
  function decide(P, J, other, o) {
    const rupees = o.rupees !== false, M = x => money(x, rupees);
    const rows = P.map(p => {
      if (!p.further) return { p, kind: 'none', verdict: 'Sell at split-off (no further processing offered)' };
      if (p.split == null) return { p, kind: 'must', verdict: 'Process further (no market at split-off)' };
      const incRev = M(p.further.sales - p.split), incCost = M(p.further.cost + p.further.sell - p.sellS), inc = M(incRev - incCost);
      return { p, kind: 'choice', incRev, incCost, inc, further: inc > 0, verdict: inc > 0 ? 'Process further' : inc < 0 ? 'Sell at split-off' : 'Indifferent (no gain either way)' };
    });
    const profit = choose => M(sum(rows.map(r => {
      const f = r.kind === 'must' || (r.kind === 'choice' && choose(r));
      return f ? r.p.further.sales - r.p.further.cost - r.p.further.sell : r.p.split - r.p.sellS;
    })) - J - other);
    return { rows, splitAll: profit(() => false), furtherAll: profit(() => true), best: profit(r => r.inc > 0) };
  }
  function computeFurther(v, P, J, o) {
    const other = num0(v.otherFixed), D = decide(P, J, other, o);
    const ch = D.rows.filter(r => r.kind === 'choice');
    if (!ch.length && !D.rows.some(r => r.kind === 'must')) throw new Error('No product has a further-processing option: fill the further-processing table.');
    const frames = [], head = ['Particulars'].concat(D.rows.map(r => r.p.name));
    const lines = [['Sales at split-off', r => (r.p.split == null ? 'no market' : amt(r.p.split))], ['Sales after further processing', r => (r.p.further ? `${un(r.p.further.units)} × ${per(r.p.further.price)} = ${amt(r.p.further.sales)}` : '—')],
      ['Incremental revenue', r => (r.kind === 'choice' ? amt(r.incRev) : '—')], ['Further processing cost', r => (r.p.further ? amt(r.p.further.cost) : '—')],
      ['Extra selling costs (after − at split-off)', r => (r.kind === 'choice' ? amt(r.p.further.sell - r.p.sellS) : '—')], ['Incremental cost', r => (r.kind === 'choice' ? amt(r.incCost) : '—')],
      ['Incremental profit (loss)', r => (r.kind === 'choice' ? `**${amt(r.inc)}**` : '—')], ['Decision', r => `**${r.verdict.replace(/ \(.*\)$/, '')}**`]];
    const table = (done, stage) => {
      const cells = {};
      const rows = lines.map(([lab, f], li) => [lab].concat(D.rows.map((r, ci) => {
        const k = done.get(r) || 0, show = li < 2 ? k >= 1 || r.kind !== 'choice' : li < 6 ? k >= 2 : k >= 3;
        if (show && li >= 6 && r.kind === 'choice') cells[`${li},${ci + 1}`] = r.inc > 0 ? 'ok' : r.inc < 0 ? 'bad' : 'hl';
        return show || r.kind !== 'choice' ? f(r) : '';
      })));
      if (stage != null) for (let li = 0; li < lines.length; li++) if (!cells[`${li},${stage + 1}`]) cells[`${li},${stage + 1}`] = 'hl';
      return { type: 'table', title: 'Process further? (₹)', head, rows, cells, align: ['left'].concat(D.rows.map(() => 'right')) };
    };
    const bars = upto => {
      const shown = ch.filter((r, i) => i < upto);
      const ys = ch.flatMap(r => [r.incRev, r.incCost]), top = Math.max(1, ...ys) * 1.18;
      return { type: 'plot', title: 'Incremental revenue vs incremental cost', w: 560, h: 260, x: [-0.6, ch.length - 0.4], y: [Math.min(0, ...ys) * 1.18, top], legend: 'top-right', xticks: ch.map((r, i) => [i, r.p.name]),
        series: [{ label: 'incremental revenue', bars: true, color: 'a', bw: 0.34, values: true, pts: shown.map(r => [ch.indexOf(r) - 0.18, r.incRev, amt(r.incRev)]) },
          { label: 'incremental cost', bars: true, color: 'd', bw: 0.34, values: true, pts: shown.map(r => [ch.indexOf(r) + 0.18, r.incCost, amt(r.incCost)]) }] };
    };
    const done = new Map();
    frames.push({ caption: `The joint cost (${inr(J)}) is already spent when the products split off, whatever is decided next, so it is **irrelevant to the decision**. Only what changes counts: the extra revenue from processing further against the extra cost.`, view: [table(done), ...(ch.length ? [bars(0)] : [])] });
    ch.forEach((r, i) => {
      const p = r.p;
      done.set(r, 1);
      frames.push({ caption: `**${p.name}**: sold at split-off it fetches ${inr(p.split)}; processed further, ${un(p.further.units)} × ${per(p.further.price)} = ${inr(p.further.sales)}. Incremental revenue **${inr(r.incRev)}**.`, view: [table(done, D.rows.indexOf(r)), bars(i)] });
      done.set(r, 2);
      frames.push({ caption: `**${p.name}**: further processing costs ${inr(p.further.cost)}${p.further.sell || p.sellS ? `, and selling costs move from ${inr(p.sellS)} to ${inr(p.further.sell)}` : ''}: incremental cost **${inr(r.incCost)}**.`, view: [table(done, D.rows.indexOf(r)), bars(i + 1)] });
      done.set(r, 3);
      frames.push({ caption: `**${p.name}**: ${inr(r.incRev)} − ${inr(r.incCost)} = **${inr(r.inc)}** ${r.inc > 0 ? 'more profit: **process further**' : r.inc < 0 ? 'less profit: **sell at split-off**' : ': no difference either way'}.`, view: [table(done, D.rows.indexOf(r)), bars(i + 1)] });
    });
    const planRows = [['Sell every product at split-off', D.splitAll], ['Process every product further', D.furtherAll], ['Best plan: process further only where it pays', D.best]];
    const must = D.rows.filter(r => r.kind === 'must').map(r => r.p.name);
    frames.push({ caption: `The best plan processes further **${ch.filter(r => r.inc > 0).map(r => r.p.name).concat(must).join(', ') || 'nothing'}** and sells the rest at split-off: profit **${inr(D.best)}**${other ? ` after the joint cost and other fixed costs of ${inr(other)}` : ' after the joint cost'}.${must.length ? ` (${must.join(', ')} cannot be sold at split-off, so it is processed in every plan.)` : ''}`,
      view: [table(done), { type: 'table', title: 'Total profit under each plan (₹)', head: ['Plan', 'Profit'], rows: planRows.map(([a, b], i) => [i === 2 ? `**${a}**` : a, i === 2 ? `**${amt(b)}**` : amt(b)]), cells: { '2,0': 'ok', '2,1': 'ok' }, align: ['left', 'right'] }] });
    return {
      frames, sim: { P, J, D }, mode: 'further',
      stats: ch.slice(0, 4).map(r => ({ label: `${r.p.name}: ${r.inc > 0 ? 'process further' : r.inc < 0 ? 'sell at split-off' : 'indifferent'}`, value: inr(r.inc), tone: r.inc > 0 ? 'ok' : r.inc < 0 ? 'bad' : '', hint: 'incremental revenue − incremental cost' }))
        .concat([{ label: 'Profit, best plan', value: inr(D.best), hint: 'sales − separable costs − joint cost − other fixed costs' }]).slice(0, 6),
      table: { head: ['Product', 'Incremental revenue', 'Incremental cost', 'Incremental profit', 'Decision'], rows: D.rows.map(r => [r.p.name, r.kind === 'choice' ? amt(r.incRev) : '—', r.kind === 'choice' ? amt(r.incCost) : '—', r.kind === 'choice' ? amt(r.inc) : '—', r.verdict]) }
    };
  }

  /* ================================================================== mode 3: by-product */
  function byproduct(v, P, J, o) {
    const rupees = o.rupees !== false, M = x => money(x, rupees);
    const name = String(v.byName == null ? '' : v.byName).trim() || 'By-product', units = num0(v.byUnits), price = num0(v.byPrice), cost = num0(v.byCost);
    if (!(units > 0) || !(price > 0)) throw new Error('Give the by-product\'s units and selling price (both more than 0).');
    if (cost < 0) throw new Error('The by-product\'s own costs cannot be negative.');
    const sales = M(units * price), marginAmt = M((o.margin / 100) * sales), nrv = M(sales - cost - marginAmt);
    if (nrv < 0) throw new Error(`${name} costs more to finish and sell than it fetches: its NRV is negative, so it is not worth recovering.`);
    if (nrv >= J) throw new Error(`${name}'s NRV (${inr(nrv)}) is not smaller than the joint cost: treat it as a joint product.`);
    const m = MNAME[v.method] ? v.method : 'physical';
    const t1 = apportion(m, J, P, o), t2 = apportion(m, M(J - nrv), P, o);
    if (t1.na || t2.na) throw new Error(`${MNAME[m]} cannot be used here: ${t1.na || t2.na}. Pick another method.`);
    /* treatment 3: the by-product takes a share as a joint product (for the bases that it has) */
    let t3 = null;
    const bp = { name, units, price, sellS: cost, split: cost ? null : sales, finalSales: sales, sep: cost, marginAmt, nrv, further: cost ? { cost: 0, sell: cost, units, price, sales } : null };
    if (['physical', 'sales', 'nrv', 'final'].includes(m)) {
      const Q = P.concat([Object.assign({}, bp, m === 'sales' && cost ? { split: nrv, price: nrv / units } : {})]);
      const r = apportion(m, J, Q, o);
      if (!r.na) t3 = r;
    }
    return { name, units, price, cost, sales, marginAmt, nrv, m, t1, t2, t3, netJ: M(J - nrv) };
  }
  function computeByprod(v, P, J, o) {
    const B = byproduct(v, P, J, o), frames = [], m = B.m;
    const byTable = k => ({ type: 'table', title: `${B.name}: net realisable value`, head: ['Particulars', '₹'], align: ['left', 'right'],
      rows: [[`Sales (${un(B.units)} × ${per(B.price)})`, k >= 1 ? amt(B.sales) : ''], ['Less: its further processing and selling costs', k >= 1 ? amt(-B.cost) : '']].concat(o.margin ? [[`Less: normal profit margin (${pc(o.margin)} of sales)`, k >= 1 ? amt(-B.marginAmt) : '']] : [], [['**Net realisable value**', k >= 1 ? `**${amt(B.nrv)}**` : '']]) });
    const extra = { label: `${B.name}\n${un(B.units)} units`, color: 'mute', note: 'by-product' };
    frames.push({ caption: `**${B.name}** comes out of the same process, but its value is small next to the main products: it is a **by-product**. First find what it is worth at the split-off.`, view: [splitTree(J, P, null, null, extra), byTable(0)] });
    frames.push({ caption: `NRV of ${B.name} = sales ${inr(B.sales)} − its own costs ${inr(B.cost)}${o.margin ? ` − margin ${inr(B.marginAmt)}` : ''} = **${inr(B.nrv)}**.`, view: [splitTree(J, P, null, null, extra), byTable(1)] });
    const st = (A, title, Jx) => statement(title, P, A.rows, A.rows.length, A.rows.findIndex(r => r.key));
    frames.push({ caption: `**Treatment 1 · other income** (small value): the main products bear the whole ${inr(J)}; the by-product's sales are credited to the Costing P&L.`,
      view: [splitTree(J, P, B.t1.shares, null, Object.assign({}, extra, { note: `${inr(B.sales)} to Costing P&L` })), st(B.t1, `Treatment 1 · ${MNAME[m]} on ${inr(J)}`)] });
    frames.push({ caption: `**Treatment 2 · NRV credited to the joint cost** (the Study Material's net realisable value method, ICAI's usual answer): ${inr(J)} − ${inr(B.nrv)} = **${inr(B.netJ)}** is apportioned among the main products.`,
      view: [splitTree(B.netJ, P, B.t2.shares, `Net joint cost ${inr(J)} − ${inr(B.nrv)}`, Object.assign({}, extra, { note: `NRV ${inr(B.nrv)} credited` })), st(B.t2, `Treatment 2 · ${MNAME[m]} on ${inr(B.netJ)}`)] });
    if (B.t3) {
      const Q = P.concat([{ name: B.name, units: B.units }]);
      frames.push({ caption: `**Treatment 3 · as a joint product** (when its value is considerable): ${B.name} takes its own share, ${inr(B.t3.shares[B.t3.shares.length - 1])}, and the main products share the rest.`,
        view: [splitTree(J, Q, B.t3.shares), statement(`Treatment 3 · ${MNAME[m]} on ${inr(J)}, ${B.name} included`, Q, B.t3.rows, B.t3.rows.length, B.t3.rows.findIndex(r => r.key))] });
    }
    const cmpHead = ['Treatment'].concat(P.map(p => p.name), [B.name]);
    const cmpRows = [['1 · other income'].concat(B.t1.shares.map(amt), [`${amt(B.sales)} income`]), ['2 · NRV credited to joint cost'].concat(B.t2.shares.map(amt), [`${amt(B.nrv)} credit`])]
      .concat(B.t3 ? [['3 · as a joint product'].concat(B.t3.shares.map(amt))] : []);
    frames.push({ caption: `The treatments side by side: crediting the NRV lowers every main product's cost; treating ${B.name} as a joint product moves cost onto it. ${B.t3 ? '' : `(Treatment 3 needs a basis the by-product has: physical units, sales value or NRV.) `}Unless told otherwise, credit the NRV (treatment 2).`,
      view: [{ type: 'table', title: 'Joint cost borne by each product (₹)', head: cmpHead, rows: cmpRows, cells: Object.fromEntries(cmpHead.map((h, c) => [`1,${c}`, 'hl'])), align: ['left'].concat(cmpHead.slice(1).map(() => 'right')) }] });
    return {
      frames, sim: Object.assign({ P, J }, B), mode: 'byprod',
      stats: [{ label: `NRV of ${B.name}`, value: inr(B.nrv), hint: 'sales − its own further processing and selling costs' + (o.margin ? ' − margin' : '') }, { label: 'Net joint cost (treatment 2)', value: inr(B.netJ), hint: 'joint cost − NRV of the by-product' }]
        .concat(P.slice(0, 4).map((p, i) => ({ label: `${p.name} (treatment 2)`, value: inr(B.t2.shares[i]), hint: `${per(B.t2.shares[i] / p.units)} a unit` }))),
      table: { head: cmpHead, rows: cmpRows }
    };
  }

  function compute(v) {
    const margin = num0(v.margin);
    if (margin < 0 || margin >= 100) throw new Error('The profit margin must be a percentage from 0 to below 100.');
    const J = num0(v.jointCost);
    if (!(J > 0)) throw new Error('Give the joint cost up to the split-off point (more than 0).');
    const P = products(v.products, v.further, margin), o = { rupees: v.rupees !== false, margin, varCost: num0(v.varCost), techRatio: v.techRatio };
    const r = v.mode === 'further' ? computeFurther(v, P, J, o) : v.mode === 'byprod' ? computeByprod(v, P, J, o) : computeApportion(v, P, J, o);
    r.note = `**Conventions.** Shares follow units produced at the split-off, not units sold. Sales value at split-off is gross; NRV = sales after further processing − further processing cost − selling costs${margin ? ` − a ${pc(margin)} normal profit margin` : ''}. A product with no further processing has its split-off sales as its final sales. Incremental cost = further processing cost + selling costs after − selling costs at split-off. Shares are ${o.rupees ? 'rounded to the rupee' : 'kept to the paisa'} and add up to the joint cost.`;
    return r;
  }

  /* ================================================================== presets */
  const presets = [
    { label: 'Tapri chai blends: Assam, Darjeeling and dust from one batch (NRV)', values: { mode: 'apportion', method: 'nrv', jointCost: 600000, margin: 0,
      products: [['Assam leaf', 6000, 90, 0], ['Darjeeling leaf', 2000, 0, 0], ['Tea dust', 4000, 55, 0]], further: [['Assam leaf', 120000, 0, 140, 20000], ['Darjeeling leaf', 80000, 0, 360, 40000], ['Tea dust', 60000, 0, 65, 0]] } },
    { label: 'Tapri chai blends: process Assam and Darjeeling further?', values: { mode: 'further', jointCost: 600000, margin: 0, otherFixed: 0,
      products: [['Assam leaf', 6000, 90, 20000], ['Darjeeling leaf', 2000, 0, 0], ['Tea dust', 4000, 55, 0]], further: [['Assam leaf', 120000, 0, 120, 40000], ['Darjeeling leaf', 80000, 0, 360, 40000], ['Tea dust', 60000, 0, 65, 0]] } },
    { label: 'Tapri samosa line: crumbs as a by-product', values: { mode: 'byprod', method: 'sales', jointCost: 250000, margin: 0, byName: 'Crumbs', byUnits: 1000, byPrice: 12, byCost: 2000,
      products: [['Samosa', 30000, 6, 0], ['Kachori', 10000, 7, 0]], further: [] } },
    { label: 'ICAI Study Material Ch. 11, Illustration 4: Caustic Soda and Chlorine', values: { mode: 'apportion', method: 'nrv', jointCost: 100000, margin: 0,
      products: [['Caustic Soda', 1200, 50, 0], ['Chlorine', 800, 75, 0]], further: [['Chlorine', 20000, 500, 200, 0]] } },
    { label: 'ICAI Study Material Ch. 11, Illustration 3 (contribution margin method)', values: { mode: 'apportion', method: 'contrib', jointCost: 8300, varCost: 4400, margin: 0,
      products: [['A', 100, 60, 0], ['B', 120, 30, 0]], further: [] } },
    { label: 'ICAI Study Material Ch. 11, Case Scenario (Pokemon Chocolates, constant gross margin)', values: { mode: 'apportion', method: 'cgm', jointCost: 712500, margin: 0, rupees: false,
      products: [['Chocolate-powder liquor base', 300, 997.5, 0], ['Milk-chocolate liquor base', 450, 1235, 0]], further: [['Chocolate-powder liquor base', 302812.5, 3000, 190, 0], ['Milk-chocolate liquor base', 623437.5, 5100, 237.5, 0]] } },
    { label: 'ICAI past paper May 2025, Q(b): Aroma Park Ltd. perfumes (NRV)', values: { mode: 'apportion', method: 'nrv', jointCost: 600000, margin: 0,
      products: [['Floral', 5000, 0, 0], ['Oriental', 3000, 0, 0], ['Cologne', 2000, 0, 0]], further: [['Floral', 200000, 0, 80, 0], ['Oriental', 240000, 0, 200, 0], ['Cologne', 200000, 0, 300, 0]] } },
    { label: 'ICAI past paper May 2024, Q1(b): products A and B (contribution margin)', values: { mode: 'apportion', method: 'contrib', jointCost: 60000, varCost: 36000, margin: 0,
      products: [['A', 2000, 20, 0], ['B', 4000, 15, 0]], further: [['B', 12000, 3920, 18, 0]] } },
    { label: 'ICAI past paper May 2024, Q1(b)(ii): process B further?', values: { mode: 'further', jointCost: 60000, varCost: 36000, margin: 0, otherFixed: 0,
      products: [['A', 2000, 20, 0], ['B', 4000, 15, 0]], further: [['B', 12000, 3920, 18, 0]] } },
    { label: 'ICAI RTP January 2026, Q15: P, Q and C (further processing)', values: { mode: 'further', jointCost: 1288000, margin: 0, otherFixed: 0,
      products: [['P', 18000, 50, 0], ['Q', 10000, 40, 0], ['C', 54000, 10, 0]], further: [['P', 180000, 0, 72, 0], ['Q', 150000, 0, 50, 0], ['C', 108000, 0, 18, 0]] } },
    { label: 'ICAI past paper May 2026, Q3(a): Apex Chemicals, A or A-Prime', values: { mode: 'further', jointCost: 2840000, margin: 0, otherFixed: 0,
      products: [['A', 64800, 45, 30000], ['B', 43200, 45, 26000]], further: [['A', 540000, 51840, 75, 22000]] } },
    { label: 'ICAI past paper Jan 2026, Q1(b): ECO Cotton, Cotton Linters as by-product', values: { mode: 'byprod', method: 'sales', jointCost: 146100, margin: 0, byName: 'Cotton Linters', byUnits: 300, byPrice: 10, byCost: 900,
      products: [['Cotton Fibre', 2800, 90, 0], ['Cotton Seed', 1800, 60, 0]], further: [['Cotton Fibre', 25200, 0, 110, 14000], ['Cotton Seed', 10800, 0, 67, 3600]] } },
    { label: 'ICAI past paper Jan 2026, Q1(b)(ii)–(iii): process Cotton Fibre and Cotton Seed further? (joint cost net of the by-product)', values: { mode: 'further', jointCost: 144000, margin: 0, otherFixed: 0,
      products: [['Cotton Fibre', 2800, 90, 0], ['Cotton Seed', 1800, 60, 0]], further: [['Cotton Fibre', 25200, 0, 110, 14000], ['Cotton Seed', 10800, 0, 67, 3600]] } },
    { label: 'ICAI Study Material Ch. 11, Practical Problem 4: X, Y, Z and by-product B (NRV less 20 % margin)', values: { mode: 'byprod', method: 'nrv', jointCost: 90800, margin: 20, byName: 'B', byUnits: 1000, byPrice: 1, byCost: 0,
      products: [['X', 8000, 0, 0], ['Y', 6000, 0, 0], ['Z', 4000, 0, 0]], further: [['X', 40000, 0, 13.75, 0], ['Y', 24000, 0, 8.75, 0], ['Z', 10000, 0, 7.5, 0]] } }
  ];

  /* ================================================================== challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const ri = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  /** a fresh problem whose answer is a whole rupee: the joint cost is a round fraction of the chosen method's basis, and the by-product's
      NRV a smaller round fraction of it, so the shares before and after crediting the by-product are whole rupees too */
  function gen(r) {
    const n = r() < 0.6 ? 2 : 3, names = pick(r, [['Leaf', 'Dust', 'Fannings'], ['A', 'B', 'C'], ['Kulhad', 'Cup', 'Saucer'], ['P', 'Q', 'R']]).slice(0, n);
    const units = names.map(() => ri(r, 10, 90) * 100), price = names.map(() => ri(r, 2, 20) * 5);
    /* further processing costs from 60 % to 150 % of the extra revenue, so 'process further?' is a real question either way */
    const fcost = (i, fp) => Math.max(500, Math.round((units[i] * (fp - price[i]) * pick(r, [0.6, 0.75, 0.9, 1.1, 1.25, 1.5])) / 500) * 500);
    const furt = names.map((nm, i) => { if (r() >= 0.75) return null; const fp = price[i] + ri(r, 1, 8) * 5; return [nm, fcost(i, fp), 0, fp, 0]; }).filter(Boolean);
    if (!furt.length) furt.push([names[0], fcost(0, price[0] + 10), 0, price[0] + 10, 0]);
    furt.forEach(f => { const i = names.indexOf(f[0]); if (units[i] * (f[3] - price[i]) === f[1]) f[1] += 500; });   // no ties: a further-processing gain is never exactly nil
    const method = pick(r, ['physical', 'sales', 'nrv', 'final', 'contrib']), f = pick(r, [0.4, 0.5, 0.6, 0.75, 0.8]);
    const fr = i => furt.find(x => x[0] === names[i]);
    let basis = units.map((u, i) => (method === 'physical' ? u : method === 'sales' ? u * price[i] : method === 'final' ? (fr(i) ? u * fr(i)[3] : u * price[i]) : 0));
    if (method === 'nrv') { furt.forEach(x => { const i = names.indexOf(x[0]); if (units[i] * x[3] - x[1] <= 0) x[1] = 1000; }); basis = units.map((u, i) => (fr(i) ? u * fr(i)[3] - fr(i)[1] : u * price[i])); }
    let J, varCost = 0, base;
    if (method === 'contrib') { const vc = ri(r, 1, 3); varCost = sum(units) * vc; base = sum(units.map((u, i) => u * price[i] - u * vc)); J = varCost + base * f; }
    else if (method === 'physical') { const c = ri(r, 4, 30); base = sum(units); J = base * c; }
    else { base = sum(basis); J = base * f; }
    /* the by-product: NRV = base × g (physical: g rupees a unit), sold at a price that divides it */
    const g = method === 'physical' ? pick(r, [1, 2, 3]) : pick(r, [0.05, 0.1, 0.2]), byNRV = Math.round(base * g);
    const bp = byNRV % 10 === 0 ? 10 : byNRV % 5 === 0 ? 5 : byNRV % 2 === 0 ? 2 : 1, withCost = r() < 0.5;
    const by = { byName: 'Waste', byUnits: byNRV / bp, byPrice: bp + (withCost ? 1 : 0), byCost: withCost ? byNRV / bp : 0 };
    return Object.assign({ products: names.map((nm, i) => [nm, units[i], price[i], 0]), further: furt, method, jointCost: J, varCost, margin: 0, otherFixed: 0, rupees: true, techRatio: '',
      ask: ri(r, 0, n - 1), askKind: r() < 0.5 ? 'yesno' : 'num' }, by);
  }
  /** the test state's picture: the given data only */
  function givenView(v) {
    const t = [{ type: 'table', title: `Joint cost ₹${num0(v.jointCost).toLocaleString('en-IN', { maximumFractionDigits: 2 })}${v.method === 'contrib' && v.mode !== 'further' ? `, of which variable ₹${num0(v.varCost).toLocaleString('en-IN')}` : ''}: products at split-off`, head: ['Product', 'Units', 'Price at split-off', 'Selling costs ₹'],
      rows: (v.products || []).map(p => [p[0], un(num0(p[1])), num0(p[2]) ? per(num0(p[2])) : 'no market', amt(num0(p[3]))]), align: ['left', 'right', 'right', 'right'] }];
    if ((v.further || []).length) t.push({ type: 'table', title: 'Further processing', head: ['Product', 'Further cost ₹', 'Units after', 'Price after', 'Selling costs ₹'], rows: v.further.map(f => [f[0], amt(num0(f[1])), num0(f[2]) ? un(num0(f[2])) : 'same', per(num0(f[3])), amt(num0(f[4]))]), align: ['left', 'right', 'right', 'right', 'right'] });
    if (v.mode === 'byprod') t.push({ type: 'table', title: `By-product: ${v.byName}`, head: ['Units', 'Price', 'Its own costs ₹'], rows: [[un(num0(v.byUnits)), per(num0(v.byPrice)), amt(num0(v.byCost))]], align: ['right', 'right', 'right'] });
    return t;
  }
  const askOf = (v, res) => {
    const P = res.sim.P, i = Math.min(+v.ask || 0, P.length - 1);
    if (res.mode === 'further') {
      const ch = res.sim.D.rows.filter(r => r.kind === 'choice'), r = ch[i % ch.length];
      return { r, yes: v.askKind === 'yesno', name: r.p.name };
    }
    return { i, name: P[i].name };
  };

  const def = {
    id: 'joint', title: 'Joint and By-Products Lab',
    blurb: 'Split a joint cost by units, sales value and NRV side by side, then decide what to process further.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to explore', value: 'apportion', options: [['apportion', 'Apportion the joint cost'], ['further', 'Sell or process further?'], ['byprod', 'Treat a by-product']] },
      { id: 'jointCost', type: 'number', label: 'Joint cost up to the split-off point (₹)', short: 'Joint cost', value: 600000, min: 0, max: 1e10 },
      { id: 'method', type: 'select', label: 'Method of apportionment', short: 'Method', value: 'nrv', options: METHODS, show: v => v.mode !== 'further' },
      { id: 'varCost', type: 'number', label: 'Of the joint cost, the variable part (₹)', short: 'Variable joint cost', value: 0, min: 0, max: 1e10, show: v => v.mode !== 'further' && v.method === 'contrib' },
      { id: 'techRatio', type: 'text', label: 'Technical estimate weights, one per product', short: 'Weights', value: '3:1:1', placeholder: 'e.g. 3:2:1', show: v => v.mode !== 'further' && v.method === 'tech' },
      { id: 'margin', type: 'number', label: 'Normal profit margin taken off for NRV (% of sales; 0 = none)', short: 'Profit margin %', value: 0, min: 0, max: 99, show: v => v.mode === 'byprod' || (v.mode !== 'further' && v.method === 'nrv') },
      { id: 'products', type: 'table', label: 'Joint products at split-off: units, price (0 = no market), selling costs ₹', short: 'Products', max: 6,
        help: 'One row per joint product, units produced at the split-off. Price 0 means it cannot be sold until it is processed further. Selling costs are the total selling and distribution costs if it is sold at the split-off.',
        rows: [['Assam leaf', 6000, 90, 0], ['Darjeeling leaf', 2000, 0, 0], ['Tea dust', 4000, 55, 0]],
        cols: [{ id: 'name', label: 'Product', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'u', label: 'Units', type: 'number', min: 0, def: 1000 }, { id: 'p', label: 'Price ₹', type: 'number', min: 0, def: 10 }, { id: 's', label: 'Selling ₹', type: 'number', min: 0, def: 0 }] },
      { id: 'further', type: 'table', label: 'Further processing: cost ₹, units out (0 = same), price after, selling costs ₹', short: 'Further processing', max: 6, minRows: 0,
        help: 'Only the products that can be processed further. Units out can differ from the split-off units (a loss in processing, or kg into litres). Selling costs are the totals after further processing.',
        rows: [['Assam leaf', 120000, 0, 140, 20000], ['Darjeeling leaf', 80000, 0, 360, 40000], ['Tea dust', 60000, 0, 65, 0]],
        cols: [{ id: 'name', label: 'Product', type: 'text', auto: () => '' }, { id: 'c', label: 'Cost ₹', type: 'number', min: 0, def: 0 }, { id: 'u', label: 'Units', type: 'number', min: 0, def: 0 }, { id: 'p', label: 'Price ₹', type: 'number', min: 0, def: 0 }, { id: 's', label: 'Selling ₹', type: 'number', min: 0, def: 0 }] },
      { id: 'otherFixed', type: 'number', label: 'Other fixed costs, outside the joint cost (₹)', short: 'Other fixed costs', value: 0, min: 0, max: 1e10, show: v => v.mode === 'further' },
      { id: 'byName', type: 'text', label: 'By-product', value: 'Tea fluff', show: v => v.mode === 'byprod' },
      { id: 'byUnits', type: 'number', label: 'By-product units', value: 500, min: 0, max: 1e9, show: v => v.mode === 'byprod' },
      { id: 'byPrice', type: 'number', label: 'By-product selling price a unit (₹)', short: 'By-product price', value: 8, min: 0, max: 1e7, show: v => v.mode === 'byprod' },
      { id: 'byCost', type: 'number', label: 'By-product\'s own processing and selling costs (₹)', short: 'By-product costs', value: 1000, min: 0, max: 1e9, show: v => v.mode === 'byprod' },
      { id: 'rupees', type: 'toggle', label: 'Round amounts to the rupee', short: 'To the rupee', value: true }
    ],
    presets, compute,
    challenge: {
      title: 'Share the joint cost',
      gen,
      kind: (v, res) => (res.mode === 'further' ? (v.askKind === 'yesno' ? 'yesno' : 'signed') : 'num'),
      prompt: (v, res) => {
        const a = askOf(v, res);
        if (res.mode === 'further') return a.yes ? `Joint cost ₹${amt(res.sim.J)}. Should **${a.name}** be processed further? (Compare incremental revenue with incremental cost.)` : `Joint cost ₹${amt(res.sim.J)}. By how much does processing **${a.name}** further change the profit, in ₹? (Type a minus for a fall.)`;
        if (res.mode === 'byprod') return `The joint cost is ₹${amt(res.sim.J)}. Credit the by-product's NRV to the joint cost, then apportion the rest by **${MNAME[res.sim.m].toLowerCase()}**: what is **${a.name}**'s share, in ₹?`;
        return `Joint cost ₹${amt(res.sim.J)}${res.sim.method === 'contrib' ? ` (variable ₹${amt(v.varCost)})` : ''}. Using **${MNAME[res.sim.method].toLowerCase()}**, how much joint cost goes to **${a.name}**, in ₹?`;
      },
      solve: (res, v) => {
        const a = askOf(v, res);
        if (res.mode === 'further') return a.yes ? (a.r.inc > 0 ? 'yes' : 'no') : a.r.inc;
        if (res.mode === 'byprod') return res.sim.t2.shares[a.i];
        return res.sim.A.shares[a.i];
      },
      tol: 0.5, unit: '₹',
      view: (res, v) => givenView(v),
      explain: (res, v) => {
        const a = askOf(v, res);
        if (res.mode === 'further') { const r = a.r; return `Incremental revenue ${inr(r.incRev)} (${inr(r.p.further.sales)} − ${inr(r.p.split)}) − incremental cost ${inr(r.incCost)} = ${inr(r.inc)}: ${r.inc > 0 ? 'process further' : 'sell at split-off'}. The joint cost is irrelevant.`; }
        if (res.mode === 'byprod') return `NRV of ${res.sim.name} = ${inr(res.sim.nrv)}; net joint cost ${inr(res.sim.netJ)}; ${a.name} gets ${inr(res.sim.t2.shares[a.i])}.`;
        const A = res.sim.A;
        return `${MNAME[res.sim.method]}: ${A.ratio ? `ratio ${A.ratio}; ` : ''}${res.sim.P.map((p, i) => `${p.name} ${inr(A.shares[i])}`).join(', ')}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, split, ratioText, products, apportion, decide, byproduct, compute, gen, METHODS, def };
  g.__lab_def_joint = def;
})(typeof window !== 'undefined' ? window : globalThis);
