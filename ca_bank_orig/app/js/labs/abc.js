/* PassBook — Activity Based Costing Lab (Paper 4, cma.abc). The ICAI Study Material's stages (ch. 5 §7): overheads are traced to
   activities (cost pools), a support activity is spread over the primary ones, each pool gets a cost driver and a driver rate, and products
   are charged for the drivers they use; beside it, traditional absorption on one blanket labour or machine hour rate, and the over- or
   under-costing per product with the activity that causes it.
   Pure part: parse*, pools(), abc(), traditional(); compute(values) -> {frames, stats, table, note}. Node: require() it. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;

  /* ------------------------------------------------------------------ numbers */
  const fmt = (x, dp) => {
    if (x == null || !isFinite(x)) return '—';
    const d = dp == null ? 0 : dp, r = Math.round(x * Math.pow(10, d) + (x >= 0 ? 1e-7 : -1e-7)) / Math.pow(10, d);
    return (r < 0 ? '−' : '') + Math.abs(r).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  /** an amount the way ICAI prints it: whole rupees when it is whole, else paise */
  const amt = x => fmt(x, Math.abs(x - Math.round(x)) < 1e-6 ? 0 : 2);
  const rs = x => (x < 0 ? '−₹' + amt(-x) : '₹' + amt(x));
  const rate = x => { if (x == null || !isFinite(x)) return '—'; const a = Math.abs(x); const d = a >= 100 ? 2 : a >= 1 ? 3 : 4; return fmt(x, d).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, ''); };
  const r2 = x => Math.round(x * 100 + (x >= 0 ? 1e-7 : -1e-7)) / 100;
  const pct = x => `${Math.round(x * 1000) / 10}%`;
  const sum = a => a.reduce((s, x) => s + x, 0);
  const INDIAN = /^\d{1,2}(,\d{2})*,\d{3}(\.\d+)?$/, WESTERN = /^\d{1,3}(,\d{3})+(\.\d+)?$/;
  function num(x) {
    if (typeof x === 'number') return x;
    let s = String(x == null ? '' : x).trim().replace(/₹|rs\.?|inr/gi, '').replace(/%$/, '').trim();
    if (s === '') return NaN;
    if (/^[-–—]$|^nil$/i.test(s)) return 0;
    s = s.replace(/\s+/g, '');
    if (s.indexOf(',') >= 0) { if (INDIAN.test(s) || WESTERN.test(s)) s = s.replace(/,/g, ''); else return NaN; }
    return /^[-−]?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s.replace('−', '-')) : NaN;
  }
  function numList(x) {
    const toks = String(x == null ? '' : x).replace(/₹/g, ' ').trim().split(/[\s;|:\/]+/).filter(Boolean), out = [];
    for (const t0 of toks) {
      const t = t0.replace(/%$/, '');
      if (/^[-–—]$|^nil$/i.test(t)) { out.push(0); continue; }
      if (t.indexOf(',') >= 0 && !INDIAN.test(t) && !WESTERN.test(t)) { for (const p of t.split(',').filter(Boolean)) { const n = num(p); if (isNaN(n)) return null; out.push(n); } continue; }
      const n = num(t);
      if (isNaN(n)) return null;
      out.push(n);
    }
    return out;
  }
  const blank = x => String(x == null ? '' : x).trim() === '';
  const key = s => String(s == null ? '' : s).toLowerCase().replace(/\(.*?\)/g, ' ').replace(/\bper\s+(unit|batch|run|production run|annum|year)\b|\bp\.\s?a\.?|\bfor (the )?complete production\b/g, ' ').replace(/\b(no|number|of|the|total|per|unit|units|each|for|in|a)\b\.?/g, ' ').replace(/[^a-z0-9]+/g, '').replace(/s$/, '');
  const low = s => String(s).split(' ').map(w => (w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase())).join(' ');
  const nameKey = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, '');
  /** a row's name without its scope words, for captions: 'Requisitions raised (total)' → 'Requisitions raised' */
  const clean = s => String(s == null ? '' : s).replace(/\s*\((total|p\.?\s?a\.?|per unit|per batch)\)/gi, '').replace(/\s+(per unit|per batch|per run|p\.\s?a\.?|per annum|for complete production)\b\.?/gi, '').trim();

  /* ------------------------------------------------------------------ inputs */
  /** how a row's figures count, read from its name: '… per batch' (× batches), '… (total)' / 'p.a.' / 'for complete production' (as given), else per unit */
  const SCOPE = s => { const t = String(s == null ? '' : s).toLowerCase(); return /\bper\s+(batch|run|production run|lot)\b|\ba batch\b/.test(t) ? 'batch' : /\btotal\b|\bp\.\s?a\b|per annum|complete production|for the (year|period|month)|\bin all\b/.test(t) ? 'total' : 'unit'; };
  const ROLE = [   // what a row of the product data means, from its name
    ['batch', /batch\s*size|run\s*size|lot\s*size|units?\s*(in|per)\s*(a\s*)?(batch|run)/i],
    ['lmin', /labou?r.*minute|minutes?.*labou?r/i],
    ['lh', /labou?r\s*(hour|hr)|\bdlh\b|working\s*hour|man.?hour/i],
    ['mh', /machine\s*(hour|hr)|\bmh\b/i],
    ['dm', /direct\s*material|material\s*cost|materials?\s*\(?₹/i],
    ['dl', /direct\s*labou?r|labou?r\s*cost|direct\s*wage|^\s*wages?\b/i]];
  const roleOf = label => {
    if (ROLE[0][1].test(label)) return 'batch';
    if (/₹|\bcost\b|\brs\.?\b|\bamount\b/i.test(label)) return /material/i.test(label) ? 'dm' : /labou?r|wage/i.test(label) ? 'dl' : null;   // a money row
    const r = ROLE.slice(1).find(([, re]) => re.test(label));
    if (!r) return null;
    if ((r[0] === 'dm' || r[0] === 'dl') && /\b(kg|kgs|grams?|g|litres?|ml|hours?|hrs|minutes?|qty|quantity|weight)\b/i.test(label)) return null;
    return r[0];
  };

  function parseProducts(rows) {
    if (!Array.isArray(rows) || !rows.length) throw new Error('Add at least one product.');
    const P = rows.map((r, i) => {
      const name = String(r[0] == null ? '' : r[0]).trim() || 'Product ' + (i + 1);
      const u = blank(r[1]) ? null : num(r[1]);
      if (u != null && (isNaN(u) || u <= 0)) throw new Error(`${name}: units produced must be a positive number (or blank when only totals are given).`);
      return { name, units: u, i };
    });
    if (P.length > 6) throw new Error('At most 6 products.');
    const seen = new Set();
    P.forEach(p => { const k = nameKey(p.name) || p.name; if (seen.has(k)) throw new Error(`Two products are called "${p.name}": give each a different name.`); seen.add(k); });
    return P;
  }
  function parseData(rows, P) {
    const out = [];
    (rows || []).forEach((r, i) => {
      const label = String(r[0] == null ? '' : r[0]).trim();
      if (!label && blank(r[1])) return;
      if (!label) throw new Error(`Product data row ${i + 1}: give it a name, like "Machine hours".`);
      const q = numList(r[1]);
      if (!q) throw new Error(`${label}: write one figure for each product, separated by spaces (for example 4 6 3).`);
      if (q.length !== P.length) throw new Error(`${label}: give ${P.length} figures, one for each product (${P.map(p => p.name).join(', ')}); you gave ${q.length}.`);
      if (q.some(x => x < 0)) throw new Error(`${label}: figures cannot be negative.`);
      out.push({ label, key: key(label), q, scope: SCOPE(label), role: roleOf(label) });
    });
    return out;
  }
  /** per-product facts: units, batches, direct material and labour per unit, labour and machine hours per unit (null when not given) */
  function facts(P, data) {
    const row = role => data.find(d => d.role === role);
    const perUnit = (d, j) => (d.scope === 'total' ? (P[j].units ? d.q[j] / P[j].units : null) : d.q[j]);
    const bs = row('batch'), F = P.map((p, j) => ({ units: p.units, batch: bs ? bs.q[j] : null }));
    F.forEach(f => { f.batches = f.batch && f.units ? Math.ceil(f.units / f.batch - 1e-9) : null; f.batchesExact = f.batch && f.units ? Math.abs(f.units / f.batch - Math.round(f.units / f.batch)) < 1e-9 : true; });
    const dm = row('dm'), dl = row('dl'), lh = row('lh'), lm = row('lmin'), mh = row('mh');
    F.forEach((f, j) => {
      f.dm = dm ? perUnit(dm, j) : 0; f.dl = dl ? perUnit(dl, j) : 0;
      f.dmTotal = dm ? (dm.scope === 'total' ? dm.q[j] : f.units ? dm.q[j] * f.units : null) : 0;
      f.dlTotal = dl ? (dl.scope === 'total' ? dl.q[j] : f.units ? dl.q[j] * f.units : null) : 0;
      const hrs = (d, k) => (d ? (d.scope === 'total' ? d.q[j] * k : d.scope === 'batch' ? (f.batches || 0) * d.q[j] * k : f.units ? d.q[j] * k * f.units : null) : null);
      f.lhTotal = lh ? hrs(lh, 1) : lm ? hrs(lm, 1 / 60) : null;
      f.mhTotal = mh ? hrs(mh, 1) : null;
      f.lhUnit = f.lhTotal != null && f.units ? f.lhTotal / f.units : null;
      f.mhUnit = f.mhTotal != null && f.units ? f.mhTotal / f.units : null;
    });
    return { F, has: { dm: !!dm, dl: !!dl, lh: !!(lh || lm), mh: !!mh, batch: !!bs } };
  }
  /** the driver a pool names: a product-data row, or units / batches → {label, unit (word for one driver unit), vol: [per product], how: [text]} */
  function driverOf(name, P, data, FF) {
    const raw = String(name == null ? '' : name).trim(), k = key(raw), F = FF.F;
    if (!raw || /^(support|spread|-|–|—|none)$/i.test(raw)) return null;
    const words = s => s.replace(/\(.*?\)/g, '').replace(/\b(no\.?|number of|per unit|per batch|for complete production|total)\b/gi, '').trim().replace(/\s+/g, ' ').split(' ').map(w => (w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase())).join(' ');
    const single = s => s.split(' ').map(w => (/^[a-z]{3,}s$/.test(w) && !/ss$/.test(w) ? w.replace(/ies$/, 'y').replace(/(ch|sh|x)es$/, '$1').replace(/s$/, '') : w)).join(' ');
    const unitOf = (d, many) => { const lab = clean(d.label), m = /\(([^)]*)\)/.exec(lab); const u = m ? m[1].trim() : ''; const w = u && /^[a-zA-Z]{1,6}$/.test(u) ? u.toLowerCase() : words(lab); return many ? w : single(w); };
    const d = data.find(x => x.key === k) || data.find(x => k.length >= 3 && x.key.indexOf(k) === 0) || data.find(x => x.key.length >= 3 && k.indexOf(x.key) === 0) || (k.length >= 4 && data.find(x => x.key.indexOf(k) >= 0));
    if (d && d.role !== 'batch' && d.role !== 'dm' && d.role !== 'dl') {
      const f = d.role === 'lmin' ? 1 / 60 : 1;
      const vol = P.map((p, j) => (d.scope === 'total' ? d.q[j] * f : d.scope === 'batch' ? (F[j].batches == null ? NaN : F[j].batches * d.q[j] * f) : p.units ? d.q[j] * f * p.units : NaN));
      if (vol.some(x => isNaN(x))) throw new Error(`${d.label} is given ${d.scope === 'batch' ? 'per batch, so every product needs a batch size and units' : 'per unit, so every product needs its units produced'}.`);
      const how = P.map((p, j) => (d.scope === 'total' ? `${amt(d.q[j] * f)}` : d.scope === 'batch' ? `${amt(d.q[j])} × ${amt(F[j].batches)} batches` : `${amt(d.q[j] * f)} × ${amt(p.units)} units`));
      return { label: clean(d.label), unit: d.role === 'lmin' || d.role === 'lh' ? 'labour hour' : d.role === 'mh' ? 'machine hour' : unitOf(d), units: d.role === 'lmin' || d.role === 'lh' ? 'labour hours' : d.role === 'mh' ? 'machine hours' : unitOf(d, true), vol, how, scope: d.scope };
    }
    if (/^(units?|output|production|units produced|volume)$/i.test(raw)) {
      if (P.some(p => !p.units)) throw new Error('A pool is driven by units produced: give every product its units.');
      return { label: 'Units produced', unit: 'unit', units: 'units', vol: P.map(p => p.units), how: P.map(p => `${amt(p.units)} units`), scope: 'total' };
    }
    if (/batch|run|set-?ups?|lots?/i.test(raw) && FF.has.batch) {
      if (F.some(f => f.batches == null)) throw new Error('A pool is driven by batches: give every product its units and batch size.');
      const bw = /run/i.test(raw) ? 'production run' : /set-?up/i.test(raw) ? 'set-up' : 'batch';
      return { label: 'Batches (units ÷ batch size)', unit: bw, units: bw === 'batch' ? 'batches' : bw + 's', vol: F.map(f => f.batches), how: P.map((p, j) => `${amt(p.units)} ÷ ${amt(F[j].batch)} = ${amt(F[j].batches)}${F[j].batchesExact ? '' : ' (rounded up: a part batch is still a batch)'}`), scope: 'total', batches: true };
    }
    throw new Error(`No driver called "${raw}": name a row of the product data (for example "Machine hours"), "units", or "batches" (with a "Batch size" row).`);
  }
  function parsePools(rows, P, data, FF) {
    const out = [];
    (rows || []).forEach((r, i) => {
      const label = String(r[0] == null ? '' : r[0]).trim();
      if (!label && blank(r[1]) && blank(r[2])) return;
      const name = label || 'Activity ' + (i + 1);
      const c = blank(r[1]) ? 0 : num(r[1]);
      if (isNaN(c) || c < 0) throw new Error(`${name}: the cost must be an amount, like 49,000 (0 or blank if it comes only from the overheads table).`);
      let dname = String(r[2] == null ? '' : r[2]).trim(), tot = blank(r[3]) ? null : num(r[3]);
      const m = /^(.*?)(?:\s+of|\s+out of|\s*,\s*capacity|\s+capacity|\s*÷)\s*([\d,]+(?:\.\d+)?)\s*$/i.exec(dname);
      if (m && !isNaN(num(m[2]))) { dname = m[1].trim(); tot = num(m[2]); }
      const drv = driverOf(dname, P, data, FF);
      if (tot != null && (isNaN(tot) || tot <= 0)) throw new Error(`${name}: the driver total must be a positive number (or blank to use what these products consume).`);
      out.push({ label: name, own: c, cost: c, driver: drv, total: tot, support: !drv });
    });
    if (!out.length) throw new Error('Add at least one activity cost pool.');
    if (out.length > 8) throw new Error('At most 8 activity cost pools.');
    return out;
  }
  /** overheads traced to the pools (stage 2) and support activities spread over the primary ones (stage 3), in table order */
  function parseResources(rows, pools) {
    const out = [];
    (rows || []).forEach((r, i) => {
      const label = String(r[0] == null ? '' : r[0]).trim();
      if (!label && blank(r[1]) && blank(r[2])) return;
      const name = label || 'Overhead ' + (i + 1);
      const sp = numList(r[2]);
      if (!sp || sp.length !== pools.length) throw new Error(`${name}: give ${pools.length} figures, its share to each activity in table order (${pools.map(p => p.label).join(', ')}), with - for none.`);
      if (sp.some(x => x < 0) || !(sum(sp) > 0)) throw new Error(`${name}: the shares must be positive for at least one activity.`);
      const pool = pools.findIndex(p => nameKey(p.label) === nameKey(name) || (nameKey(name).length >= 4 && nameKey(p.label).indexOf(nameKey(name)) === 0));
      if (blank(r[1])) {
        if (pool < 0 || !pools[pool].support) throw new Error(`${name}: give an amount, or name a support activity (an activity whose driver is "support") to spread its cost.`);
        if (sp[pool]) throw new Error(`${name} cannot be spread to itself.`);
        out.push({ label: name, spread: pool, w: sp });
      } else {
        const a = num(r[1]);
        if (isNaN(a) || a < 0) throw new Error(`${name}: the amount must be an amount, like 45,000.`);
        out.push({ label: name, amount: a, w: sp });
      }
    });
    return out;
  }

  /* ------------------------------------------------------------------ the costing */
  function split(amount, w) { const W = sum(w); return w.map(x => (amount * x) / W); }
  function buildPools(pools, res) {
    const steps = [];
    res.forEach(r => {
      const amount = r.spread != null ? pools[r.spread].cost : r.amount, parts = split(amount, r.w);
      parts.forEach((x, k) => (pools[k].cost += x));
      if (r.spread != null) pools[r.spread].cost -= amount;
      steps.push({ label: r.label, spread: r.spread, amount, parts, w: r.w, after: pools.map(p => p.cost) });
    });
    pools.forEach(p => { if (p.support && Math.abs(p.cost) > 0.005) throw new Error(`${p.label} is a support activity (no driver): spread its ₹${amt(p.cost)} over the other activities with a row in the overheads table (amount blank).`); });
    return steps;
  }
  function abc(P, pools, FF, o) {
    const rd = o.rates === '2' ? 2 : o.rates === '3' ? 3 : null;
    const act = pools.filter(p => !p.support).map(p => {
      const used = sum(p.driver.vol), T = p.total != null ? p.total : used;
      if (!(used > 0) && p.total == null) throw new Error(`${p.label}: the products use none of its driver (${p.driver.label}), so no rate can be set.`);
      if (p.total != null && p.total + 1e-9 < used) throw new Error(`${p.label}: the driver total ${amt(p.total)} is smaller than what these products use (${amt(used)}).`);
      const exact = p.cost / T, r = rd == null ? exact : Math.round(exact * Math.pow(10, rd) + 1e-9) / Math.pow(10, rd);
      const charges = p.driver.vol.map(v => r * v);
      return Object.assign(p, { used, T, exact, rate: r, charges, unused: T > used + 1e-9 ? p.cost - r * used : 0, leak: p.cost - r * T });
    });
    const F = FF.F;
    const prod = P.map((p, j) => {
      const oh = sum(act.map(a => a.charges[j])), u = p.units;
      let unit = null, total;
      if (o.layout === 'unit' && u) {
        const lines = [r2(F[j].dm), r2(F[j].dl)].concat(act.map(a => r2(a.charges[j] / u)));
        unit = r2(sum(lines)); total = unit * u;
      } else {
        total = (F[j].dmTotal || 0) + (F[j].dlTotal || 0) + oh;
        unit = u ? r2(total / u) : null;
      }
      return { name: p.name, units: u, oh, ohUnit: u ? oh / u : null, unit, total };
    });
    return { act, prod };
  }
  function traditional(P, pools, FF, base, o) {
    if (base !== 'lh' && base !== 'mh') return null;
    const F = FF.F, hk = base === 'lh' ? 'lhTotal' : 'mhTotal', uk = base === 'lh' ? 'lhUnit' : 'mhUnit', word = base === 'lh' ? 'labour hour' : 'machine hour';
    if (!(base === 'lh' ? FF.has.lh : FF.has.mh)) throw new Error(`Traditional absorption on ${word}s needs a "${base === 'lh' ? 'Labour hours' : 'Machine hours'}" row in the product data (or choose "ABC only").`);
    const hours = F.map(f => f[hk]), totalOH = o.tradTotal != null ? o.tradTotal : sum(pools.map(p => p.own)) + o.resTotal;
    const base0 = sum(hours), baseT = o.tradHours != null ? o.tradHours : base0;
    if (!(baseT > 0)) throw new Error(`The products have no ${word}s, so no traditional rate can be set.`);
    const R = totalOH / baseT;
    const prod = P.map((p, j) => {
      const u = p.units, ohUnit = u ? r2(R * F[j][uk]) : null, oh = R * hours[j];
      return { name: p.name, hours: hours[j], hUnit: F[j][uk], oh, ohUnit, unit: u ? r2(r2(F[j].dm) + r2(F[j].dl) + ohUnit) : null, total: (F[j].dmTotal || 0) + (F[j].dlTotal || 0) + oh };
    });
    if (o.layout === 'total') prod.forEach(p => { if (p.unit != null) { const u = P.find(x => x.name === p.name).units; p.unit = r2(p.total / u); p.ohUnit = r2(p.oh / u); } });
    return { base, word, R, totalOH, baseT, own: base0, prod, given: o.tradTotal != null || o.tradHours != null };
  }

  /* ------------------------------------------------------------------ frames */
  const BASES = { lh: 'Traditional on a labour hour rate', mh: 'Traditional on a machine hour rate', none: 'ABC only' };
  function compute(v) {
    const P = parseProducts(v.products), data = parseData(v.data, P), FF = facts(P, data), F = FF.F;
    const pools = parsePools(v.pools, P, data, FF), res = parseResources(v.resources, pools);
    const base = BASES[v.base] ? v.base : 'lh', layout = v.layout === 'total' || P.some(p => !p.units) ? 'total' : 'unit';
    const resTotal = sum(res.filter(r => r.spread == null).map(r => r.amount));
    const steps = buildPools(pools, res);
    const A = abc(P, pools, FF, { layout, rates: v.rates });
    const tt = blank(v.tradTotal) ? null : num(v.tradTotal), th = blank(v.tradHours) ? null : num(v.tradHours);
    if ((tt != null && (isNaN(tt) || tt < 0)) || (th != null && (isNaN(th) || th <= 0))) throw new Error('The traditional overheads and hours must be positive amounts (or blank to use the pools and the products\' own hours).');
    const T = traditional(P, pools, FF, base, { tradTotal: tt, tradHours: th, resTotal, layout });
    const names = P.map(p => p.name), act = A.act, frames = [];
    const al = n => ['left'].concat(Array(n).fill('right'));

    /* stage 1: the activities and their pools */
    const poolTable = (k, hl) => ({ type: 'table', title: 'Activities and cost pools', head: ['Activity (cost pool)', 'Cost (₹)', 'Cost driver'],
      rows: pools.slice(0, k == null ? pools.length : k).map(p => [p.label, amt(p.cost), p.support ? '— support activity, spread to the others' : p.driver.label]), cells: hl == null ? {} : { [hl + ',1']: 'hl' }, align: ['left', 'right', 'left'] });
    frames.push({ caption: `**Activity based costing** traces overheads to the **activities** that cause them (each activity's costs form a **cost pool**), finds what drives each activity (its **cost driver**), sets a rate per unit of driver and charges each product for the drivers it uses. ${steps.length ? 'First the overheads go to the activities.' : 'Here the activity costs are given.'}`, view: [steps.length ? resTable(0) : poolTable()] });
    function resTable(k) {
      const rows = [['Activity\'s own cost', ''].concat(pools.map(p => (p.own ? amt(p.own) : '—')))], cells = {};
      steps.slice(0, k).forEach((s, i) => {
        rows.push([s.label + (s.spread != null ? ' (support, spread)' : ''), s.spread != null ? '' : amt(s.amount)].concat(s.parts.map((x, j) => (j === s.spread ? `(${amt(s.amount)})` : x ? amt(x) : '—'))));
        if (i === k - 1) s.parts.forEach((x, j) => { if (x) cells[(i + 1) + ',' + (2 + j)] = 'hl'; if (j === s.spread) cells[(i + 1) + ',' + (2 + j)] = 'd'; });
      });
      const cur = k ? steps[k - 1].after : pools.map(p => p.own), R = rows.length;
      rows.push([k === steps.length ? '**Activity cost pools**' : '*Pools so far*', ''].concat(cur.map((x, j) => (pools[j].support && Math.abs(x) < 0.005 && k === steps.length ? '—' : k === steps.length ? `**${amt(x)}**` : amt(x)))));
      if (k === steps.length) pools.forEach((p, j) => { if (!p.support) cells[R + ',' + (2 + j)] = 'ok'; });
      return { type: 'table', title: 'Overheads traced to activity cost pools (₹)', head: ['Overhead', 'Amount'].concat(pools.map(p => p.label)), rows, cells, align: al(pools.length + 1) };
    }
    steps.forEach((s, i) => {
      const to = s.parts.map((x, j) => (x && j !== s.spread ? `${pools[j].label} ${rs(x)}` : null)).filter(Boolean).join(', ');
      const ratio = s.w.map((x, j) => (j === s.spread || !x ? null : String(+x.toFixed(4)))).filter(Boolean).join(':');
      frames.push({ caption: s.spread != null ? `**${s.label}** is a support activity: it serves the other activities, not the products. Its ${rs(s.amount)} is spread over them (${ratio}): ${to}.`
        : `**${s.label}** (${rs(s.amount)}) is traced to the activities that use it (${ratio}): ${to}.`, view: [resTable(i + 1)] });
    });

    /* stages 2-4: per activity, the driver volume, the rate, and each product's charge */
    const chargeTable = (ai, upto) => {
      const rows = [], cells = {};
      act.forEach((a, i) => {
        if (i > ai) return;
        const n = i < ai ? names.length : upto;
        rows.push([a.label, `${rate(a.rate)} / ${a.driver.unit}`].concat(names.map((_, j) => (j < n ? amt(a.charges[j]) : ''))).concat([n === names.length ? amt(sum(a.charges)) : '']));
        if (i === ai && upto > 0) cells[i + ',' + (1 + upto)] = 'hl';
      });
      if (ai === act.length - 1 && upto === names.length) {
        const R = rows.length;
        rows.push(['**ABC overheads**', ''].concat(A.prod.map(p => `**${amt(p.oh)}**`)).concat([`**${amt(sum(A.prod.map(p => p.oh)))}**`]));
        A.prod.forEach((p, j) => (cells[R + ',' + (2 + j)] = 'ok'));
        if (P.every(p => p.units)) rows.push(['Per unit', ''].concat(A.prod.map(p => fmt(p.ohUnit, 2))).concat(['']));
      }
      return { type: 'table', title: 'Overheads charged to products under ABC (₹)', head: ['Activity', 'Driver rate (₹)'].concat(names, ['Total']), rows, cells, align: ['left', 'right'].concat(names.map(() => 'right'), ['right']) };
    };
    const poolBox = (a, withRate) => ({ id: 'pool', title: a.label, note: 'cost pool', mono: false, color: 'd',
      rows: [['cost', rs(a.cost)], ['driver', a.driver.label], ['volume', `${amt(a.T)}${a.T > a.used + 1e-9 ? ' (capacity)' : ''}`]].concat(withRate ? [['rate', `₹${rate(a.rate)} per ${a.driver.unit}`]] : []).concat(a.unused && withRate ? [['not charged', rs(a.unused)]] : []) });
    const flow = (a, upto) => ({ type: 'nest', dir: 'h', boxes: [poolBox(a, upto >= 0)].concat(upto > 0 ? [{ id: 'prod', title: 'Charged to products', mono: false, color: 'a',
      rows: P.slice(0, upto).map((p, j) => [p.name, `${amt(a.driver.vol[j])} → ${rs(a.charges[j])}`]).concat(upto === P.length && a.unused ? [['not charged', `${amt(a.T - a.used)} → ${rs(a.unused)}`]] : []) }] : []),
      arrows: upto > 0 ? [{ from: 'pool', to: 'prod', straight: true }] : [] });
    act.forEach((a, ai) => {
      const vols = P.map((p, j) => `${p.name} ${a.driver.how[j]}${a.driver.scope !== 'total' || a.driver.batches ? ` = ${amt(a.driver.vol[j])}` : ''}`).join('; ');
      const why = a.T > a.used + 1e-9 ? ` The rate is set on the driver's full ${amt(a.T)} (capacity, or the whole company's volume), not on the ${amt(a.used)} these products use, so ${rs(a.unused)} is not charged to them.` : '';
      frames.push({ caption: `**${a.label}** (${rs(a.cost)}) is driven by **${low(a.driver.label)}**: ${vols}${P.length > 1 ? `, together ${amt(a.used)}` : ''}. Rate = ${rs(a.cost)} ÷ ${amt(a.T)} = **₹${rate(a.exact)} per ${a.driver.unit}**${a.rate !== a.exact ? ` (rounded to ₹${rate(a.rate)})` : ''}.${why}`,
        view: [flow(a, 0), chargeTable(ai, 0)] });
      P.forEach((p, j) => frames.push({ caption: `**${p.name}** uses ${amt(a.driver.vol[j])} ${a.driver.vol[j] === 1 ? a.driver.unit : a.driver.units} of ${low(a.label)}${a.used ? ` (${pct(a.driver.vol[j] / a.used)} of ${a.T > a.used + 1e-9 ? 'what these products use' : 'the total'})` : ''}, so it is charged ${amt(a.driver.vol[j])} × ₹${rate(a.rate)} = **${rs(a.charges[j])}**.`,
        view: [flow(a, j + 1), chargeTable(ai, j + 1)] }));
    });

    /* the ABC cost statement */
    const statement = () => {
      const unitL = layout === 'unit', rows = [], cells = {};
      const line = (label, f) => rows.push([label].concat(P.map((p, j) => f(j))));
      if (FF.has.dm) line('Direct material', j => fmt(unitL ? F[j].dm : F[j].dmTotal, 2));
      if (FF.has.dl) line('Direct labour', j => fmt(unitL ? F[j].dl : F[j].dlTotal, 2));
      act.forEach(a => line(a.label, j => fmt(unitL ? a.charges[j] / P[j].units : a.charges[j], 2)));
      const R = rows.length;
      line(unitL ? '**Cost per unit (ABC)**' : '**Total cost (ABC)**', j => `**${fmt(unitL ? A.prod[j].unit : A.prod[j].total, 2)}**`);
      P.forEach((p, j) => (cells[R + ',' + (1 + j)] = 'ok'));
      if (P.every(p => p.units)) {
        line('Units', j => amt(P[j].units));
        line(unitL ? 'Total cost' : 'Cost per unit', j => fmt(unitL ? A.prod[j].total : A.prod[j].unit, 2));
      }
      return { type: 'table', title: `Product cost under ABC (${unitL ? '₹ per unit' : '₹, totals'})`, head: ['Particulars'].concat(names), rows, cells, align: al(P.length) };
    };
    frames.push({ caption: `**Product cost under ABC**: ${FF.has.dm || FF.has.dl ? 'prime cost (direct material and labour) plus ' : ''}the overheads each product caused: ${A.prod.map(p => `${p.name} ${p.unit != null ? `₹${fmt(p.unit, 2)} a unit` : rs(p.total)}`).join(', ')}.${layout === 'unit' ? ' (Each line per unit is rounded to paise before adding, as in ICAI\'s per-unit statements.)' : ''}`, view: [statement()] });

    /* traditional absorption and the comparison */
    const cmpTable = k => ({ type: 'table', title: 'Traditional absorption vs ABC (₹ per unit)', head: ['Product', 'Traditional', 'ABC', 'Traditional costing'],
      rows: P.slice(0, k).map((p, j) => { const d = A.prod[j].unit - T.prod[j].unit; return [p.name, fmt(T.prod[j].unit, 2), fmt(A.prod[j].unit, 2), d > 0.004 ? `under-costs by ${fmt(d, 2)}` : d < -0.004 ? `over-costs by ${fmt(-d, 2)}` : 'agrees']; }),
      cells: Object.fromEntries(P.slice(0, k).map((p, j) => { const d = A.prod[j].unit - T.prod[j].unit; return [j + ',3', d > 0.004 ? 'bad' : d < -0.004 ? 'hl' : 'mute']; })), align: ['left', 'right', 'right', 'left'] });
    if (T) {
      const tradTable = () => ({ type: 'table', title: `Traditional absorption: one ${T.word} rate`, head: ['Product', `${T.word[0].toUpperCase() + T.word.slice(1)}s`, 'Overhead (₹)', 'Per unit (₹)', 'Cost per unit (₹)'],
        rows: P.map((p, j) => [p.name, amt(T.prod[j].hours), amt(T.prod[j].oh), fmt(T.prod[j].ohUnit, 2), fmt(T.prod[j].unit, 2)]), align: al(4) });
      frames.push({ caption: `**Traditional absorption** puts all the overheads in one pool and absorbs them on ${T.word}s: ${rs(T.totalOH)} ÷ ${amt(T.baseT)} ${T.word}s = **₹${rate(T.R)} per ${T.word}**${T.given ? ' (the company\'s whole overheads and hours, as the question gives them)' : ''}. Each product's overhead follows only its ${T.word}s, whatever activities it really uses.`, view: [tradTable()] });
      if (P.every(p => p.units)) P.forEach((p, j) => {
        const d = A.prod[j].unit - T.prod[j].unit, ap = A.prod[j], tp = T.prod[j];
        let reason = '';
        if (!T.given && Math.abs(d) > 0.004) {
          const shareH = T.prod[j].hours / T.own;
          const best = act.map(a => ({ a, s: a.used ? a.driver.vol[j] / a.used : 0, gap: a.charges[j] - a.cost * shareH })).filter(x => Math.sign(x.gap) === Math.sign(d)).sort((x, y) => Math.abs(y.gap) - Math.abs(x.gap))[0];
          if (best) reason = ` Mainly **${low(best.a.label)}**: ${p.name} uses ${pct(best.s)} of the ${low(best.a.driver.label)} but has ${pct(shareH)} of the ${T.word}s, so the ${T.word} rate ${d > 0 ? 'under' : 'over'}-charged it for that activity.`;
        }
        frames.push({ caption: `**${p.name}**: traditional ₹${fmt(tp.unit, 2)} a unit, ABC ₹${fmt(ap.unit, 2)}. ` + (Math.abs(d) <= 0.004 ? 'The two agree.' : `Traditional costing **${d > 0 ? 'under' : 'over'}-costs** it by ₹${fmt(Math.abs(d), 2)} a unit${d > 0 ? ', so a price set on that cost would be too low' : ', so a price set on that cost would be too high'}.`) + reason, view: [cmpTable(j + 1)] });
      });
      const sumA = sum(A.prod.map(p => p.oh)), sumT = sum(T.prod.map(p => p.oh));
      if (P.every(p => p.units)) frames.push({ caption: Math.abs(sumA - sumT) < 0.5 ? `**Same overheads, divided differently**: ABC charges ${rs(sumA)} in all, exactly what the ${T.word} rate absorbs. ABC moves cost towards the products that use the activities (often low-volume, many-batch products) and away from the high-volume ones.`
        : `ABC charges these products ${rs(sumA)} and the ${T.word} rate ${rs(sumT)}: the difference is the cost left out of the products (${act.some(a => a.unused) ? 'unused capacity or other products\' share of the drivers' : 'rounded rates'}).`, view: [cmpTable(P.length)] });
    } else if (act.some(a => a.unused)) {
      frames.push({ caption: `**Unused capacity**: rates set on capacity charge the products only for what they use; the rest, ${act.filter(a => a.unused).map(a => `${a.label} ${rs(a.unused)}`).join(', ')}, is the cost of unused capacity (${rs(sum(act.map(a => a.unused)))} in all), which management can see and act on.`, view: [chargeTable(act.length - 1, P.length)] });
    }

    /* tiles, results, conventions */
    const stats = [];
    A.prod.slice(0, 3).forEach(p => stats.push(p.unit != null ? { label: `${p.name}: ABC cost per unit`, value: '₹' + fmt(p.unit, 2), hint: 'prime cost + Σ driver rate × drivers used ÷ units' } : { label: `${p.name}: ABC overheads`, value: rs(p.oh), hint: 'Σ driver rate × drivers used' }));
    if (T) {
      stats.push({ label: `Traditional rate per ${T.word}`, value: '₹' + rate(T.R), hint: `all overheads ÷ ${T.word}s` });
      if (P.every(p => p.units)) {
        const worst = P.map((p, j) => ({ p, d: A.prod[j].unit - T.prod[j].unit })).sort((x, y) => Math.abs(y.d) - Math.abs(x.d))[0];
        if (Math.abs(worst.d) > 0.004) stats.push({ label: `Largest distortion: ${worst.p.name} ${worst.d > 0 ? 'under' : 'over'}-costed`, value: '₹' + fmt(Math.abs(worst.d), 2) + ' a unit', hint: 'ABC − traditional cost per unit' });
      }
    }
    if (!T) act.forEach(a => { if (stats.length < 6) stats.push({ label: `${a.label}: rate per ${a.driver.unit}`, value: `₹${rate(a.rate)}`, hint: 'pool cost ÷ driver volume' }); });
    const table = { head: ['Product', 'Units', 'ABC overheads (₹)', 'ABC cost per unit (₹)'].concat(T ? ['Traditional cost per unit (₹)', 'ABC − traditional (₹)'] : []),
      rows: P.map((p, j) => [p.name, p.units ? amt(p.units) : '—', amt(A.prod[j].oh), A.prod[j].unit != null ? fmt(A.prod[j].unit, 2) : '—'].concat(T ? [T.prod[j].unit != null ? fmt(T.prod[j].unit, 2) : '—', T.prod[j].unit != null && A.prod[j].unit != null ? fmt(A.prod[j].unit - T.prod[j].unit, 2) : '—'] : [])) };
    const note = `**Conventions.** Driver rates are exact${v.rates === '2' || v.rates === '3' ? `, then rounded to ${v.rates} decimals as the question's answer does` : ''}; a pool's rate uses the driver total given (capacity or the whole company's volume) or else what these products use. A driver given per unit is multiplied by the units, one given per batch by the batches (units ÷ batch size, rounded up). ` +
      (layout === 'unit' ? 'The per-unit statement rounds every line to paise before adding (ICAI\'s per-unit layout); the total is per unit × units. ' : 'The total statement adds the totals, then divides by the units (ICAI\'s total layout). ') +
      'Traditional absorption: one rate = all overheads ÷ the base hours, the overhead per unit rounded to paise. ABC − traditional is positive when traditional costing under-costs a product.';
    return { frames, stats: stats.slice(0, 6), table, note, sim: { P, F, pools, steps, act, prod: A.prod, trad: T, layout, base } };
  }

  /* ------------------------------------------------------------------ inputs, examples, challenge */
  const TAPRI = {
    base: 'lh', layout: 'unit', rates: 'exact', tradTotal: '', tradHours: '',
    products: [['Premix packs', '10,000'], ['Elaichi sachets', '4,000'], ['Frozen samosas', '2,000']],
    data: [['Direct material ₹', '40 30 25'], ['Direct labour ₹', '10 8 15'], ['Labour hours', '0.5 0.4 0.75'], ['Machine hours', '1 0.5 0.25'],
      ['Batch size', '1,000 200 100'], ['Quality tests per batch', '2 3 4'], ['Purchase orders (total)', '20 40 40']],
    pools: [['Machine set-ups', '1,32,000', 'batches'], ['Machine running', '2,44,000', 'Machine hours'], ['Quality testing', '30,000', 'Quality tests'], ['Purchasing', '34,000', 'Purchase orders']],
    resources: [['Factory supervisor\'s salary', '60,000', '30 10 50 10']]
  };
  const presets = [
    { label: 'Tapri plant, Indore: premix packs, elaichi sachets and frozen samosas (ABC vs labour hour rate)', values: TAPRI },
    { label: 'Tapri plant: the same products against a machine hour rate', values: Object.assign({}, TAPRI, { base: 'mh' }) },
    { label: 'SM Illustration 1 (ABC Ltd): products A, B and C, labour hour rate vs ABC', values: { base: 'lh', layout: 'unit', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['A', '4,000'], ['B', '3,000'], ['C', '1,600']],
      data: [['Direct material ₹', '8 12 6'], ['Direct labour ₹', '5 7.50 10'], ['Direct labour minutes', '30 45 60'], ['Material weight (kg)', '4 6 3'],
        ['Batches of material (total)', '10 5 15'], ['Machine operations', '6 3 2']],
      pools: [['Material handling', '29,100', 'Material weight'], ['Storage', '31,200', 'Batches of material'], ['Electricity', '39,150', 'Machine operations']], resources: [] } },
    { label: 'SM Illustration 2 (MST Ltd): rates on capacity and the cost of unused capacity', values: { base: 'none', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['M', ''], ['S', ''], ['T', '']], data: [['Kilowatt hours (total)', '10,000 20,000 15,000'], ['Quality inspections (total)', '3,500 2,500 3,000']],
      pools: [['Power', '2,00,000', 'Kilowatt hours of 50,000'], ['Quality inspections', '3,00,000', 'Quality inspections of 10,000']], resources: [] } },
    { label: 'SM Illustration 3 (ABC Ltd): equipment Y and Z, direct labour hours vs ABC, the cost distortion', values: { base: 'lh', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['Y', '2,500'], ['Z', '3,125']],
      data: [['Direct material ₹', '300 450'], ['Direct labour ₹', '450 600'], ['Labour hours', '3 4'], ['Orders processed (total)', '350 250'], ['Machine hours worked (total)', '23,000 27,000'], ['Inspection hours (total)', '4,000 11,000']],
      pools: [['Order processing', '2,10,000', 'Orders processed'], ['Machine processing', '8,75,000', 'Machine hours worked'], ['Inspection', '1,57,500', 'Inspection hours']], resources: [] } },
    { label: 'SM Illustration 4 (Humara-Apna bank): budgeted cost per deposit, loan and credit card account', values: { base: 'none', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['Deposits', '58,600'], ['Loans', '13,000'], ['Credit cards', '14,000']],
      data: [['ATM transactions (total)', '1,50,000 0 50,000'], ['Computer processing transactions (total)', '15,00,000 2,00,000 3,00,000'], ['Statements issued (total)', '3,50,000 50,000 1,00,000'], ['Telephone minutes (total)', '3,60,000 1,80,000 1,80,000']],
      pools: [['ATM services', '8,00,000', 'ATM transactions'], ['Computer processing', '10,00,000', 'Computer processing transactions'], ['Issuing statements', '20,00,000', 'Statements issued'], ['Customer inquiries', '3,60,000', 'Telephone minutes']], resources: [] } },
    { label: 'SM Practical Problem 1 (Woolmark Ltd): overheads split 20:30:40:10, machine hour rate vs ABC', values: { base: 'mh', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['P', '3,000'], ['Q', '5,000'], ['R', '20,000']],
      data: [['Direct material ₹', '90 80 120'], ['Direct labour ₹', '80 240 160'], ['Machine hours', '10 18 14'], ['Batch size', '150 500 1,000'], ['Purchase orders per batch', '3 10 8'], ['Inspections per batch', '5 4 3']],
      pools: [['Machine set-up', '0', 'batches'], ['Machine operation', '0', 'Machine hours'], ['Inspection', '0', 'Inspections'], ['Material procurement', '0', 'Purchase orders']],
      resources: [['Production overheads (4,00,000 MH × ₹6)', '24,00,000', '20 30 40 10']] } },
    { label: 'SM Practical Problem 5 (BABYSOFT soaps): labour hour rate vs ABC, rates to two decimals', values: { base: 'lh', layout: 'unit', rates: '2', tradTotal: '', tradHours: '',
      products: [['Gold', '4,000'], ['Pearl', '3,000'], ['Diamond', '2,000']],
      data: [['Direct material ₹', '167.50 215.50 248.50'], ['Direct labour ₹', '5 6.67 10'], ['Direct labour minutes', '30 40 60'], ['Weight (grams)', '108 106 117'], ['Machine operations', '5 5 6']],
      pools: [['Forklifting', '58,000', 'Weight'], ['Supervising', '60,000', 'Direct labour minutes'], ['Utilities', '80,000', 'Machine operations']], resources: [] } },
    { label: 'Exam Jan 2025, Case Scenario I (ABC Company, MCQs 1–5): products X, Y and Z', values: { base: 'lh', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['X', '16,000'], ['Y', '17,000'], ['Z', '15,000']],
      data: [['Direct material ₹ (3, 4, 5 kg × ₹2)', '6 8 10'], ['Direct labour ₹ (hours × ₹20)', '2 3 4'], ['Labour hours', '0.10 0.15 0.20'], ['Machine hours', '0.5 0.7 0.9'],
        ['Production runs p.a.', '50 65 60'], ['Purchase orders p.a.', '5 10 15'], ['Orders shipped p.a.', '25 35 32']],
      pools: [['Machine set-up', '49,000', 'Production runs'], ['Machine running', '64,128', 'Machine hours'], ['Purchasing', '52,050', 'Purchase orders'], ['Delivery', '46,460', 'Orders shipped']], resources: [] } },
    { label: 'Exam Sep 2024 Q3(a) (GST Ltd): a support activity, company-wide drivers and hours', values: { base: 'lh', layout: 'total', rates: 'exact', tradTotal: '2,70,000', tradHours: '72,000',
      products: [['P', '9,000'], ['Q', '7,200']],
      data: [['Direct material ₹ (total)', '72,000 50,000'], ['Direct labour ₹ (hours × ₹14.50) (total)', '11,600 8,700'], ['Labour hours (total)', '800 600'], ['Requisitions raised (total)', '180 144'], ['Production runs (total)', '144 108'], ['Quality tests (total)', '27 18']],
      pools: [['Machine maintenance', '27,000', 'support'], ['Stores receiving', '36,000', 'Requisitions raised of 5,760'], ['Production setup', '0', 'Production runs of 7,200'], ['Quality control', '0', 'Quality tests of 720']],
      resources: [['Technical staff salary', '45,000', '1 0 2 2'], ['Machine operation expenses', '1,62,000', '0 2 3 0'], ['Machine maintenance', '', '0 2 3 0']] } },
    { label: 'MTP Sep 2026 Series I Q3(a) (Silver Star Ltd): four products, machine hour rate vs ABC', values: { base: 'mh', layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: [['X', '800'], ['Y', '650'], ['Z', '500'], ['W', '550']],
      data: [['Direct material ₹', '50 55 45 60'], ['Direct labour ₹', '12 10 8 9'], ['Machine hours', '5 3.5 2.5 1.5'], ['Batch size (production run)', '25 25 25 25'],
        ['Requisitions raised (total)', '60 60 60 60'], ['Orders executed (batches of 10) (total)', '80 65 50 55']],
      pools: [['Setup', '25,000', 'production runs'], ['Store receiving', '18,000', 'Requisitions raised'], ['Inspection', '12,000', 'production runs'], ['Material handling and dispatch', '3,500', 'Orders executed']],
      resources: [['Machine operation and maintenance', '75,000', '5 3 2 0']] } }
  ];

  /* the challenge: an ABC cost per unit, or a driver rate */
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
  const SETS = [['Premix', 'Sachets', 'Samosas'], ['X', 'Y', 'Z'], ['Alpha', 'Beta', 'Gamma'], ['Kulhad', 'Mug', 'Flask']];
  function gen(r, base) {
    const n = ri(r, 2, 3), names = pick(r, SETS).slice(0, n);
    const units = names.map(() => pick(r, [1000, 2000, 4000, 5000, 8000, 10000]));
    const batch = units.map(u => pick(r, [50, 100, 200, 250, 500].filter(b => u % b === 0 && u / b <= 80)));
    const dm = names.map(() => ri(r, 10, 60)), dl = names.map(() => ri(r, 5, 30)), lh = names.map(() => ri(r, 1, 8) * 0.25), mh = names.map(() => ri(r, 1, 6) * 0.5);
    const po = names.map(() => ri(r, 4, 40)), tests = names.map(() => ri(r, 1, 5));
    const batches = units.map((u, j) => u / batch[j]);
    const Rs = pick(r, [150, 200, 250, 300, 400, 500]), Rm = pick(r, [2, 2.5, 3, 4, 5, 6]), Rp = pick(r, [300, 400, 500, 750]), Rt = pick(r, [100, 120, 150, 200]);
    const MHt = sum(mh.map((x, j) => x * units[j])), Bt = sum(batches), Pt = sum(po), Tt = sum(tests.map((x, j) => x * batches[j]));
    const L = x => x.toLocaleString('en-IN');
    const ask = r() < 0.7 ? 'unit' : 'rate', k = ri(r, 0, n - 1), pool = ri(r, 0, 3);
    return { layout: 'total', rates: 'exact', tradTotal: '', tradHours: '',
      products: names.map((nm, j) => [nm, L(units[j])]),
      data: [['Direct material ₹', dm.join(' ')], ['Direct labour ₹', dl.join(' ')], ['Labour hours', lh.join(' ')], ['Machine hours', mh.join(' ')],
        ['Batch size', batch.map(L).join(' ')], ['Purchase orders (total)', po.join(' ')], ['Quality tests per batch', tests.join(' ')]],
      pools: [['Machine set-ups', L(Rs * Bt), 'batches'], ['Machine running', L(Rm * MHt), 'Machine hours'], ['Purchasing', L(Rp * Pt), 'Purchase orders'], ['Quality testing', L(Rt * Tt), 'Quality tests']],
      resources: [], _ask: ask, _k: k, _pool: pool };
  }

  const def = {
    id: 'abc', title: 'Activity Based Costing Lab',
    blurb: 'Watch overheads flow to activities, driver rates and products, and see which products traditional costing under-costs.',
    controls: [
      { id: 'base', type: 'select', label: 'Compare with', value: 'lh', options: Object.entries(BASES) },
      { id: 'layout', type: 'seg', label: 'Cost statement', value: 'unit', options: [['unit', 'Per unit'], ['total', 'Totals']], help: 'ICAI uses both: a per-unit statement (each line per unit, rounded to paise) or totals divided by the units.' },
      { id: 'rates', type: 'select', label: 'Driver rates', value: 'exact', options: [['exact', 'Exact'], ['3', 'Rounded to 3 decimals'], ['2', 'Rounded to 2 decimals']] },
      { id: 'products', type: 'table', label: 'Products and units produced (units blank if only totals are given)', short: 'Products', max: 6, rows: TAPRI.products,
        cols: [{ id: 'p', label: 'Product', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'u', label: 'Units', type: 'text' }] },
      { id: 'data', type: 'table', label: 'Product data, one figure per product: per unit unless the name says "per batch" or "(total)"', short: 'Product data', max: 12, rows: TAPRI.data,
        help: 'Rows named Direct material ₹, Direct labour ₹, Labour hours (or Direct labour minutes), Machine hours and Batch size are read as such; any other row is driver data for the pools.',
        cols: [{ id: 'l', label: 'Particulars', type: 'text' }, { id: 'q', label: 'Figures', type: 'text' }] },
      { id: 'pools', type: 'table', label: 'Activity cost pools: cost and driver (a product-data row, units or batches; "support" for a support activity; "… of 50,000" sets the rate on a total)', short: 'Cost pools', max: 8, rows: TAPRI.pools,
        cols: [{ id: 'a', label: 'Activity', type: 'text' }, { id: 'c', label: 'Cost ₹', type: 'text' }, { id: 'd', label: 'Driver', type: 'text' }] },
      { id: 'resources', type: 'table', label: 'Overheads traced to the activities (optional): amount and share to each activity; amount blank = spread a support activity', short: 'Overheads to activities', max: 8, rows: TAPRI.resources,
        cols: [{ id: 'r', label: 'Overhead', type: 'text' }, { id: 'a', label: 'Amount ₹', type: 'text' }, { id: 'w', label: 'Shares to activities', type: 'text' }] },
      { id: 'tradTotal', type: 'text', label: 'Traditional: overheads to absorb, ₹ (blank = all the activity costs)', short: 'Traditional overheads', value: '', placeholder: 'e.g. 2,70,000', show: v => v.base !== 'none' },
      { id: 'tradHours', type: 'text', label: 'Traditional: total hours (blank = these products\' hours)', short: 'Traditional hours', value: '', placeholder: 'e.g. 72,000', show: v => v.base !== 'none' }
    ],
    presets, compute,
    challenge: {
      title: 'Cost it by activities',
      gen: r => gen(r, null),
      prompt: (v, res) => {
        const S = res.sim;
        if (v._ask === 'rate') { const a = S.act[v._pool % S.act.length]; return `Using the data, what is the **cost driver rate for ${low(a.label)}** (₹ per ${a.driver.unit})? Two decimals.`; }
        return `Under **activity based costing** (driver rates = pool cost ÷ total driver volume; batches = units ÷ batch size), what is the **cost per unit of ${S.P[v._k].name}** (₹, two decimals)?`;
      },
      solve: (res, v) => { const S = res.sim; return v._ask === 'rate' ? r2(S.act[v._pool % S.act.length].rate) : r2(S.prod[v._k].unit); },
      tol: 0.02, unit: '₹', kind: 'num',
      view: (res, v) => {
        const names = (v.products || []).map(p => p[0]);
        return [{ type: 'table', title: 'Given', head: ['Particulars'].concat(names), rows: [['Units produced'].concat((v.products || []).map(p => p[1]))].concat((v.data || []).map(d => [d[0]].concat(String(d[1]).split(/\s+/)))), align: ['left'].concat(names.map(() => 'right')) },
          { type: 'table', title: 'Activity cost pools', head: ['Activity', 'Cost (₹)', 'Driver'], rows: (v.pools || []).map(p => [p[0], p[1], p[2]]), align: ['left', 'right', 'left'] }];
      },
      explain: (res, v) => {
        const S = res.sim, j = v._k;
        const rates = S.act.map(a => `${a.label}: ${rs(a.cost)} ÷ ${amt(a.T)} = ₹${rate(a.rate)} per ${a.driver.unit}`).join('; ');
        if (v._ask === 'rate') return `${rates}.`;
        const p = S.P[j], F = S.F[j];
        const lines = S.act.map(a => `${amt(a.driver.vol[j])} × ₹${rate(a.rate)} = ${rs(a.charges[j])}`).join(' + ');
        return `Rates: ${rates}. ${p.name}'s overheads: ${lines} = ${rs(S.prod[j].oh)}. Cost = material ${rs(F.dmTotal)} + labour ${rs(F.dlTotal)} + overheads ${rs(S.prod[j].oh)} = ${rs(S.prod[j].total)}; ÷ ${amt(p.units)} units = **₹${fmt(S.prod[j].unit, 2)}** a unit.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, numList, parseProducts, parseData, facts, driverOf, parsePools, parseResources, buildPools, abc, traditional, compute, def, presets, gen };
  g.__lab_def_abc = def;
})(typeof window !== 'undefined' ? window : globalThis);
