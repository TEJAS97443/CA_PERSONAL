/* PassBook — Key Factor Lab (Paper 4, Marginal Costing, cma.mc: limiting factor and short-term decisions). Owner: lab-c5.
   Three modes, one pure compute(values) -> {frames, stats, table, note}:
     mix      — contribution per unit of the key factor, the ranking, and the best product mix filled in rank order after any minimum
                commitments, each product up to its demand (ICAI rounds a part unit down; the hours left go to the next product); the
                profit statement, and what ranking by contribution per unit would have cost;
     makebuy  — make or buy with a scarce resource: the saving per unit (purchase price − variable cost of making) per unit of the key
                factor ranks the parts; parts that cannot be bought are made first; an avoidable fixed cost of making is recovered only
                above the indifference quantity (fixed cost ÷ saving per unit), checked exactly over every choice of parts to make;
     shutdown — shut down or continue: loss if the plant runs vs the fixed costs that continue plus the costs of closing, and the
                shut-down point = (fixed cost − shut-down costs) ÷ contribution per unit, drawn as two lines crossing.
   Pure helpers exported for Node: bestMix, makeBuy, shutDown, compute, def (tests/lab-key-factor.test.js). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || {};
  const r2 = x => Math.round(x * 100) / 100;
  const r4 = x => Math.round(x * 1e4) / 1e4;
  const nf = n => (U.nf ? U.nf(r2(n)) : String(r2(n)));
  const inr = n => (U.inr ? U.inr(n) : (n < 0 ? '−₹' : '₹') + Math.abs(r2(n)));
  const minus = s => String(s).replace(/^-/, '−');
  const num = x => { if (typeof x === 'number') return x; const s = String(x == null ? '' : x).replace(/[₹,\s]/g, '').replace(/[−–]/g, '-'); return s === '' ? NaN : Number(s); };
  const EPS = 1e-9;
  const pct = x => (Math.round(x * 10000) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '%';

  /* ================================================================== pure: product mix under one key factor */
  /** products: [{name, price, vc, kf (key factor per unit), max (demand), min}], avail (key factor available), whole (round units down),
      by: 'kf' (contribution per key factor unit, the right rule) or 'unit' (contribution per unit, for the comparison) */
  function bestMix(products, avail, opts) {
    const o = opts || {}, whole = o.whole !== false, by = o.by === 'unit' ? 'unit' : 'kf';
    if (!products.length) throw new Error('Add at least one product.');
    if (products.length > 8) throw new Error('At most 8 products.');
    if (!(avail >= 0)) throw new Error('The key factor available cannot be negative.');
    const P = products.map((p, i) => {
      if (!(p.price >= 0) || !(p.vc >= 0)) throw new Error(`${p.name}: price and variable cost must be zero or more.`);
      if (!(p.kf > 0)) throw new Error(`${p.name}: each unit must use some of the key factor (more than 0).`);
      if (!(p.max >= 0) || !(p.min >= 0)) throw new Error(`${p.name}: demand and minimum cannot be negative.`);
      if (p.min > p.max + EPS) throw new Error(`${p.name}: the minimum (${nf(p.min)}) is more than the maximum demand (${nf(p.max)}).`);
      const c = p.price - p.vc;
      return { i, name: p.name, price: p.price, vc: p.vc, kf: p.kf, max: p.max, min: p.min, c, cpk: c / p.kf, need: p.max * p.kf };
    });
    const needAll = P.reduce((a, p) => a + p.need, 0), minUse = P.reduce((a, p) => a + p.min * p.kf, 0);
    if (minUse > avail + EPS) throw new Error(`The minimum commitments alone need ${nf(minUse)} of the key factor, more than the ${nf(avail)} available.`);
    const key = p => (by === 'unit' ? p.c : p.cpk);
    const order = P.filter(p => p.c > 0).sort((a, b) => key(b) - key(a) || b.c - a.c || a.i - b.i);
    P.forEach(p => { p.rank = order.indexOf(p) + 1 || null; p.units = p.min; p.used = p.min * p.kf; });
    let left = avail - minUse;
    const steps = [];
    order.forEach(p => {
      const room = p.max - p.min, can = left / p.kf, take = Math.max(0, Math.min(room, whole ? Math.floor(can + 1e-9) : can));
      p.units += take; p.used += take * p.kf; left -= take * p.kf;
      if (left < 1e-9) left = 0;
      steps.push({ i: p.i, name: p.name, take, used: take * p.kf, left, full: take >= room - EPS });
    });
    P.forEach(p => { p.contribution = p.units * p.c; });
    const contribution = P.reduce((a, p) => a + p.contribution, 0);
    return { P, order, steps, avail, needAll, minUse, limiting: needAll > avail + EPS, left, contribution, whole, by };
  }

  /* ================================================================== pure: make or buy */
  /** parts: [{name, need, vc (variable cost to make), buy (0 = cannot be bought), kf (key factor per unit, may be 0), fixed (avoidable fixed
      cost if any are made)}], avail: key factor available (0 = no limit). Exact: every choice of the parts with a fixed cost is tried */
  function makeBuy(parts, avail, opts) {
    const whole = !opts || opts.whole !== false, limit = avail > 0 ? avail : Infinity;
    if (!parts.length) throw new Error('Add at least one part.');
    if (parts.length > 8) throw new Error('At most 8 parts.');
    const P = parts.map((p, i) => {
      if (!(p.need >= 0)) throw new Error(`${p.name}: the quantity needed cannot be negative.`);
      if (!(p.vc >= 0) || !(p.buy >= 0) || !(p.kf >= 0) || !((p.fixed || 0) >= 0)) throw new Error(`${p.name}: costs and the key factor per unit must be zero or more.`);
      const can = p.buy > 0, s = can ? p.buy - p.vc : null;
      return { i, name: p.name, need: p.need, vc: p.vc, buy: p.buy, kf: p.kf, fixed: p.fixed || 0, can, s, spk: can && p.kf > 0 ? s / p.kf : null };
    });
    const must = P.filter(p => !p.can);
    const mustUse = must.reduce((a, p) => a + p.need * p.kf, 0);
    if (mustUse > limit + EPS) throw new Error(`The parts that cannot be bought need ${nf(mustUse)} of the key factor to make, more than the ${nf(avail)} available.`);
    const cand = P.filter(p => p.can && p.s > EPS);
    const rankOrder = cand.slice().sort((a, b) => (b.kf > 0 ? b.spk : Infinity) - (a.kf > 0 ? a.spk : Infinity) || b.s - a.s || a.i - b.i);
    rankOrder.forEach((p, k) => { p.rank = k + 1; });
    const fixedOnes = cand.filter(p => p.fixed > 0);
    const plan = allowed => {                                          // greedy by saving per key factor unit among the allowed parts
      let left = limit - mustUse; const made = new Map();
      rankOrder.forEach(p => {
        if (!allowed.has(p)) { made.set(p, 0); return; }
        const n = p.kf > 0 ? Math.min(p.need, whole ? Math.floor(left / p.kf + 1e-9) : left / p.kf) : p.need;
        made.set(p, Math.max(0, n)); left -= Math.max(0, n) * p.kf; if (left < 1e-9) left = 0;
      });
      const net = rankOrder.reduce((a, p) => a + made.get(p) * p.s - (made.get(p) > 0 ? p.fixed : 0), 0);
      return { made, net, left };
    };
    let best = null;
    const nF = fixedOnes.length;
    for (let mask = 0; mask < 1 << nF; mask++) {
      const allowed = new Set(cand.filter(p => !(p.fixed > 0)));
      fixedOnes.forEach((p, k) => { if (mask & (1 << k)) allowed.add(p); });
      const r = plan(allowed);
      if (!best || r.net > best.net + 1e-9) best = Object.assign(r, { allowed });
    }
    const first = plan(new Set(cand));                                 // the plain ranking, before the fixed-cost check
    P.forEach(p => {
      p.make = !p.can ? p.need : cand.includes(p) ? best.made.get(p) : 0;
      p.bought = p.need - p.make;
      p.firstMake = !p.can ? p.need : cand.includes(p) ? first.made.get(p) : 0;
      p.dropped = p.fixed > 0 && p.firstMake > 0 && p.make === 0;     // the fixed cost of making outweighs the saving
      p.indiff = p.can && p.s > EPS && p.fixed > 0 ? p.fixed / p.s : null;
      p.makeCost = p.make * p.vc + (p.make > 0 ? p.fixed : 0); p.buyCost = p.bought * p.buy; p.cost = p.makeCost + p.buyCost;
      p.allBuy = p.can ? p.need * p.buy : p.need * p.vc + (p.need > 0 ? p.fixed : 0);
    });
    const used = P.reduce((a, p) => a + p.make * p.kf, 0);
    const total = P.reduce((a, p) => a + p.cost, 0), allBuy = P.reduce((a, p) => a + p.allBuy, 0);
    return { P, must, mustUse, rankOrder, avail, limited: avail > 0, used, left: avail > 0 ? avail - used : null, total, allBuy, saving: allBuy - total, whole };
  }

  /* ================================================================== pure: shut down or continue */
  /** o: {price, vc, units, cap (0 = none), fixed (if operating), keep (fixed costs that continue when shut), extra (costs of shutting down)} */
  function shutDown(o) {
    const price = +o.price, vc = +o.vc, units = +o.units, fixed = +o.fixed, keep = +o.keep, extra = +(o.extra || 0), cap = +(o.cap || 0);
    if (!(price > vc)) throw new Error('The selling price must be higher than the variable cost per unit (otherwise every unit sold adds to the loss).');
    if (!(vc >= 0) || !(units >= 0) || !(fixed >= 0) || !(keep >= 0) || !(extra >= 0) || !(cap >= 0)) throw new Error('Costs and quantities cannot be negative.');
    if (keep > fixed + EPS) throw new Error('The fixed costs that continue after shutting down cannot be more than the fixed costs while operating.');
    const c = price - vc, shutCost = keep + extra;
    const cont = units * c - fixed, shut = -shutCost;
    const sdp = (fixed - shutCost) / c;
    return { price, vc, units, fixed, keep, extra, cap, c, shutCost, cont, shut, sdp, avoidable: fixed - keep, sales: units * price,
      decision: cont > shut + EPS ? 'continue' : cont < shut - EPS ? 'shut' : 'either', sdpPct: cap > 0 ? sdp / cap : null, unitsPct: cap > 0 ? units / cap : null };
  }

  /* ================================================================== drawing helpers */
  function niceStep(raw) { if (!(raw > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; }
  const tidy = v => +v.toPrecision(10);
  function axisOf(lo, hi, n) {
    if (!(hi > lo)) hi = lo + 1;
    const st = niceStep((hi - lo) / (n || 5)), a = tidy(Math.floor(lo / st + 1e-9) * st), b = tidy(Math.ceil(hi / st - 1e-9) * st), ticks = [];
    for (let v = a, k = 0; v <= b + st / 2 && k < 30; v = tidy(v + st), k++) ticks.push([v, minus(nf(v))]);
    return { lo: a, hi: b, ticks };
  }
  const COL = 'abcdefgh';
  /** the key factor as one bar filled left to right by what uses it */
  function bar(title, avail, blocks) {
    const used = blocks.reduce((a, b) => a + b.size, 0), free = Math.max(0, avail - used);
    const bl = blocks.filter(b => b.size > 1e-9).map(b => ({ label: b.label, note: nf(b.size) + (b.tag ? ', ' + b.tag : ''), size: b.size, color: b.color }));
    if (free > avail * 1e-6 || !bl.length) bl.push({ label: 'unused', note: nf(free), size: Math.max(free, 1e-9), kind: 'free' });
    return { type: 'memory', orientation: 'h', title, w: 640, blocks: bl };
  }
  const cellsRow = (row, n, tone, out) => { const c = out || {}; for (let k = 0; k < n; k++) c[row + ',' + k] = tone; return c; };

  /* ================================================================== mode: product mix */
  function readProducts(rows) {
    return (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'P' + (i + 1), price: num(r[1]), vc: num(r[2]), kf: num(r[3]), max: num(r[4]), min: num(r[5]) || 0 }));
  }
  function computeMix(v) {
    const kn = String(v.kfName || '').trim() || 'hours', whole = v.whole !== false;
    const prods = readProducts(v.kfProducts), avail = num(v.avail), fixed = num(v.fixed) || 0;
    if (!(fixed >= 0)) throw new Error('The fixed cost cannot be negative.');
    const R = bestMix(prods, avail, { whole }), Q = bestMix(prods, avail, { whole, by: 'unit' });
    const P = R.P, frames = [];
    const color = p => COL[p.i % 8];
    const head = ['Product', 'Price', 'Variable cost', 'Contribution / unit', `${kn} / unit`, `${kn} for full demand`, `Contribution per ${kn.replace(/s$/, '')}`, 'Rank'];
    const al = ['left', 'right', 'right', 'right', 'right', 'right', 'right', 'right'];
    const rankT = (cols, hlCol, hlRow) => {
      const rows = P.map(p => {
        const full = [p.name, inr(p.price), inr(p.vc), minus(inr(p.c)), nf(p.kf), nf(p.need), minus(inr(r4(p.cpk))), p.rank ? String(p.rank) : '—'];
        return full.map((x, k) => (k < cols ? x : ''));
      });
      const cells = {};
      if (hlCol != null) P.forEach((p, ri) => { cells[ri + ',' + hlCol] = 'hl'; });
      if (hlRow != null) cellsRow(hlRow, cols, 'hl', cells);
      P.forEach((p, ri) => { if (p.c <= 0 && cols > 3) cells[ri + ',3'] = 'bad'; });
      return { type: 'table', title: 'Ranking by contribution per unit of the key factor', head: head.slice(0, cols), rows: rows.map(r => r.slice(0, cols)), cells, align: al.slice(0, cols) };
    };
    const best = P.slice().sort((a, b) => b.c - a.c)[0];
    frames.push({ caption: `**Contribution per unit** = price − variable cost. ${best.name} earns the most per unit (${inr(best.c)}), but with ${kn} in short supply that is not the right yardstick yet.`, view: [rankT(4, 3)] });
    frames.push({ caption: R.limiting
      ? `**Is ${kn} the key factor?** Full demand needs ${nf(R.needAll)} ${kn}; only ${nf(avail)} are available, so ${kn} limit the output: they are the key (limiting) factor.`
      : `**Is ${kn} the key factor?** Full demand needs ${nf(R.needAll)} ${kn} and ${nf(avail)} are available, so every product can be made up to its demand: ${kn} do not limit anything here.`, view: [rankT(6, 5)] });
    frames.push({ caption: `**Contribution per ${kn.replace(/s$/, '')}** = contribution per unit ÷ ${kn} per unit. This is what each ${kn.replace(/s$/, '')} earns in each product: ${P.map(p => `${p.name} ${minus(inr(r4(p.cpk)))}`).join(', ')}.`, view: [rankT(7, 6)] });
    frames.push({ caption: `**Rank** by contribution per ${kn.replace(/s$/, '')}, highest first: ${R.order.map(p => p.name).join(' → ')}.${P.some(p => p.c <= 0) ? ' A product with no contribution is made only to meet a minimum.' : ''}`, view: [rankT(8, 7)] });
    const blocksAt = upto => {
      const b = [];
      P.forEach(p => { if (p.min > 0) b.push({ label: p.name, tag: 'min', size: p.min * p.kf, color: color(p) }); });
      R.steps.slice(0, upto).forEach(s => { const p = P[s.i]; if (s.used > 0) b.push({ label: p.name, size: s.used, color: color(p) }); });
      return bar(`${kn} available: ${nf(avail)}`, avail, b);
    };
    const allocT = upto => {
      const rows = [], cells = {};
      P.filter(p => p.min > 0).forEach(p => rows.push([`${p.name} (minimum)`, nf(p.min), nf(p.min * p.kf), '']));
      let left = avail - R.minUse;
      if (rows.length) rows[rows.length - 1][3] = nf(left);
      R.steps.slice(0, upto).forEach((s, k) => { left = s.left; rows.push([s.name, nf(s.take), nf(s.used), nf(s.left)]); if (k === upto - 1) cellsRow(rows.length - 1, 4, 'hl', cells); });
      return { type: 'table', title: `Allocating ${kn}`, head: ['Product', 'Units', `${kn} used`, `${kn} left`], rows, cells, align: ['left', 'right', 'right', 'right'] };
    };
    const mins = P.filter(p => p.min > 0);
    if (mins.length) frames.push({ caption: `**Minimum commitments first.** ${mins.map(p => `${p.name} ${nf(p.min)} units (${nf(p.min * p.kf)} ${kn})`).join(', ')} must be made whatever their rank, leaving ${nf(avail - R.minUse)} ${kn}.`, view: [blocksAt(0), allocT(0)] });
    R.steps.forEach((s, k) => {
      const p = P[s.i], extra = p.min > 0 ? ' more' : '';
      const why = s.take <= 0 ? `nothing is left for it` : s.full ? `its whole demand${p.min > 0 ? ' above the minimum' : ''} fits` : `only ${nf(s.take)}${extra} units fit${whole && (s.left > 0) ? ` (whole units; ${nf(s.left)} ${kn} are too few for another)` : ''}`;
      frames.push({ caption: `**${k + 1}. ${p.name}** (rank ${p.rank}): ${why}. ${nf(s.take)}${extra} units use ${nf(s.used)} ${kn}; ${nf(s.left)} ${kn} left.`, view: [blocksAt(k + 1), allocT(k + 1)] });
    });
    const stRows = R.order.concat(P.filter(p => !p.rank)).filter(p => p.units > 0 || p.rank).map(p => [p.name, `${nf(p.units)} × ${minus(inr(p.c))}`, minus(inr(p.contribution))]);
    stRows.push(['**Total contribution**', '', `**${minus(inr(R.contribution))}**`]);
    if (fixed > 0) stRows.push(['Less: fixed cost', '', '(' + inr(fixed) + ')'], ['**Profit**', '', `**${minus(inr(R.contribution - fixed))}**`]);
    const stT = { type: 'table', title: 'Best product mix: profit statement (in rank order)', head: ['Product', 'Units × contribution / unit', 'Contribution'], rows: stRows, cells: cellsRow(stRows.length - 1, 3, R.contribution - fixed >= 0 ? 'ok' : 'bad'), align: ['left', 'right', 'right'] };
    const lost = R.contribution - Q.contribution;
    const cmp = lost > 0.005 ? ` Ranking by contribution per unit instead (${Q.order.map(p => p.name).join(' → ')}) would earn only ${inr(Q.contribution)}, **${inr(lost)} less**.` : ' Here ranking by contribution per unit gives the same mix.';
    frames.push({ caption: `**Best mix:** ${P.filter(p => p.units > 0).map(p => `${p.name} ${nf(p.units)}`).join(', ')}. Total contribution ${inr(R.contribution)}${fixed > 0 ? `; less fixed cost ${inr(fixed)} = **profit ${minus(inr(R.contribution - fixed))}**` : ''}. Fixed costs do not change with the mix, so maximising contribution maximises profit.${cmp}`, view: [blocksAt(R.steps.length), stT] });
    const stats = [{ label: 'Total contribution', value: inr(R.contribution), hint: 'Σ units × contribution per unit' }];
    if (fixed > 0) stats.push({ label: R.contribution - fixed >= 0 ? 'Profit' : 'Loss', value: inr(Math.abs(R.contribution - fixed)), hint: 'total contribution − fixed cost', tone: R.contribution - fixed < 0 ? 'bad' : '' });
    if (R.order.length) stats.push({ label: 'Ranked first', value: R.order[0].name, hint: `highest contribution per ${kn.replace(/s$/, '')}: ${inr(r4(R.order[0].cpk))}` });
    stats.push({ label: `${kn} used (of ${nf(avail)})`, value: nf(avail - R.left), hint: 'the key factor consumed by the mix' });
    if (lost > 0.005) stats.push({ label: 'Lost by ranking per unit', value: inr(lost), hint: 'contribution per unit is the wrong rule when a factor is scarce', tone: 'bad' });
    return {
      frames, stats, sim: R, alt: Q,
      table: { head: ['Product', 'Contribution / unit', `Contribution per ${kn.replace(/s$/, '')}`, 'Rank', 'Units in the mix', `${kn} used`, 'Contribution'], rows: P.map(p => [p.name, minus(inr(p.c)), minus(inr(r4(p.cpk))), p.rank ? String(p.rank) : '—', nf(p.units), nf(p.used), minus(inr(p.contribution))]) },
      note: `**Conventions.** One key factor; each product can be sold up to its demand and must be made at least to its minimum. Minimums are met first, then products take the key factor in rank order of contribution per unit of it.${whole ? ' Units are whole: a part unit is dropped (as ICAI does) and what is left goes to the next product in rank.' : ' Part units are allowed.'} Fixed costs are the same for every mix.`
    };
  }

  /* ================================================================== mode: make or buy */
  function readParts(rows) {
    return (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'Part ' + (i + 1), need: num(r[1]), vc: num(r[2]), buy: num(r[3]) || 0, kf: num(r[4]) || 0, fixed: num(r[5]) || 0 }));
  }
  function computeMakeBuy(v) {
    const kn = String(v.kfName || '').trim() || 'hours', avail = num(v.bavail) || 0, whole = v.whole !== false;
    const B = makeBuy(readParts(v.kfParts), avail, { whole }), P = B.P, frames = [];
    const color = p => COL[p.i % 8];
    const head = ['Part', 'Needed', 'Variable cost to make', 'Buy price', 'Saving if made', `${kn} / unit`, `Saving per ${kn.replace(/s$/, '')}`, 'Rank'];
    const al = ['left', 'right', 'right', 'right', 'right', 'right', 'right', 'right'];
    const rankT = (cols, hlCol) => {
      const rows = P.map(p => [p.name, nf(p.need), inr(p.vc), p.can ? inr(p.buy) : 'cannot buy', p.can ? minus(inr(p.s)) : '—', nf(p.kf), p.spk != null ? minus(inr(r4(p.spk))) : p.can && p.kf === 0 ? 'no key factor' : '—', p.rank ? String(p.rank) : !p.can ? 'make' : 'buy'].slice(0, cols));
      const cells = {};
      if (hlCol != null) P.forEach((p, ri) => { cells[ri + ',' + hlCol] = 'hl'; });
      P.forEach((p, ri) => { if (p.can && p.s <= EPS && cols > 4) cells[ri + ',4'] = 'bad'; });
      return { type: 'table', title: 'Make or buy: saving per unit of the key factor', head: head.slice(0, cols), rows, cells, align: al.slice(0, cols) };
    };
    const neg = P.filter(p => p.can && p.s <= EPS);
    const noLimit = B.limited ? '' : ` With no limit on the key factor, every part that is cheaper to make is made in full${B.rankOrder.some(p => p.fixed > 0) ? ', provided its saving covers the fixed cost of making it' : ''}.`;
    frames.push({ caption: `**Relevant cost of making** = variable cost of making (plus any fixed cost that making adds); fixed overheads that go on either way are not relevant. Saving if made = buy price − variable cost.${neg.length ? ` ${neg.map(p => p.name).join(', ')} ${neg.length === 1 ? 'costs' : 'cost'} more to make than to buy: buy ${neg.length === 1 ? 'it' : 'them'} whatever happens.` : ''}${noLimit}`, view: [rankT(5, 4)] });
    if (B.limited) {
      frames.push({ caption: `**Saving per ${kn.replace(/s$/, '')}.** ${kn} are scarce (${nf(avail)} available), so each part is judged by what one ${kn.replace(/s$/, '')} spent on making it saves: ${P.filter(p => p.spk != null).map(p => `${p.name} ${inr(r4(p.spk))}`).join(', ') || 'none'}. Rank: ${B.rankOrder.map(p => p.name).join(' → ') || 'nothing worth making'}.`, view: [rankT(8, 6)] });
    }
    const blocks = (upto, list) => {
      const b = [];
      B.must.forEach(p => { if (p.need * p.kf > 0) b.push({ label: p.name, tag: 'must make', size: p.need * p.kf, color: color(p) }); });
      list.slice(0, upto).forEach(p => { if (p.make * p.kf > 0) b.push({ label: p.name, size: p.make * p.kf, color: color(p) }); });
      return bar(`${kn} available: ${nf(avail)}`, avail, b);
    };
    const plan = (rows, hl) => ({ type: 'table', title: 'Make or buy plan', head: ['Part', 'Make', 'Buy', `${kn} used`], rows: rows.map(p => [p.name, nf(p.make), nf(p.bought), nf(p.make * p.kf)]), cells: hl != null ? cellsRow(hl, 4, 'hl') : {}, align: ['left', 'right', 'right', 'right'] });
    const views = (k, list) => (B.limited ? [blocks(k, list), plan(B.must.concat(list.slice(0, k)), B.must.length + k - 1)] : [plan(B.must.concat(list.slice(0, k)), B.must.length + k - 1)]);
    if (B.must.length) frames.push({ caption: `**Parts that cannot be bought are made first:** ${B.must.map(p => `${p.name} ${nf(p.need)} units${p.kf > 0 ? ` (${nf(p.need * p.kf)} ${kn})` : ''}`).join(', ')}.${B.limited ? ` ${nf(avail - B.mustUse)} ${kn} remain.` : ''}`, view: B.limited ? [blocks(0, []), plan(B.must, B.must.length - 1)] : [plan(B.must, B.must.length - 1)] });
    const list = B.rankOrder;
    let left = avail - B.mustUse;
    list.forEach((p, k) => {
      const used = p.make * p.kf; left -= used;
      let txt;
      if (p.dropped) txt = `making it would save ${inr(p.firstMake * p.s)} on ${nf(p.firstMake)} units, but making needs a fixed cost of ${inr(p.fixed)}: buy all ${nf(p.need)}. (Making pays only above ${nf(p.indiff)} units = ${inr(p.fixed)} ÷ ${inr(p.s)}.)`;
      else if (p.make >= p.need - EPS) txt = `make all ${nf(p.need)}${p.kf > 0 ? ` (${nf(used)} ${kn})` : ''}${p.fixed > 0 ? `; the saving ${inr(p.make * p.s)} covers its fixed cost ${inr(p.fixed)}` : ''}.`;
      else if (p.make > 0) txt = `only ${nf(p.make)} units fit in the ${nf(used + left)} ${kn} left${whole ? ' (whole units)' : ''}: make ${nf(p.make)}, **buy ${nf(p.bought)}**.`;
      else txt = `no ${kn} are left: **buy all ${nf(p.need)}**.`;
      frames.push({ caption: `**${k + 1}. ${p.name}** (saving ${inr(p.s)} a unit${p.spk != null ? `, ${inr(r4(p.spk))} per ${kn.replace(/s$/, '')}` : ''}): ${txt}${B.limited ? ` ${nf(Math.max(0, left))} ${kn} left.` : ''}`, view: views(k + 1, list) });
    });
    const rows = P.map(p => [p.name, nf(p.make), nf(p.bought), minus(inr(p.makeCost)), minus(inr(p.buyCost)), minus(inr(p.cost))]);
    rows.push(['**Total**', '', '', inr(P.reduce((a, p) => a + p.makeCost, 0)), inr(P.reduce((a, p) => a + p.buyCost, 0)), `**${inr(B.total)}**`]);
    const costT = { type: 'table', title: 'Cost of the plan', head: ['Part', 'Make', 'Buy', 'Cost of making', 'Cost of buying', 'Total'], rows, cells: cellsRow(rows.length - 1, 6, 'ok'), align: ['left', 'right', 'right', 'right', 'right', 'right'] };
    frames.push({ caption: `**Cheapest plan:** ${P.map(p => `${p.name}: make ${nf(p.make)}, buy ${nf(p.bought)}`).join('; ')}. Total cost **${inr(B.total)}**, ${inr(B.saving)} less than buying everything that can be bought.`, view: (B.limited ? [blocks(list.length, list)] : []).concat([costT]) });
    const stats = [{ label: 'Total cost of the plan', value: inr(B.total), hint: 'cost of making + cost of buying' }, { label: 'Saving vs buying all', value: inr(B.saving), hint: 'what buying every part that can be bought would cost, less the plan' }];
    stats.push({ label: 'Units bought in', value: nf(P.reduce((a, p) => a + p.bought, 0)), hint: P.filter(p => p.bought > 0).map(p => `${p.name} ${nf(p.bought)}`).join(', ') || 'nothing is bought' });
    if (B.limited) stats.push({ label: `${kn} used (of ${nf(avail)})`, value: nf(B.used), hint: 'the key factor spent on making' });
    const ind = P.filter(p => p.indiff != null);
    if (ind.length) stats.push({ label: `Indifference point: ${ind[0].name}`, value: nf(ind[0].indiff), hint: 'avoidable fixed cost ÷ saving per unit: make above it, buy below it (units)' });
    return {
      frames, stats, sim: B,
      table: { head: ['Part', 'Saving / unit', `Saving per ${kn.replace(/s$/, '')}`, 'Rank', 'Make', 'Buy', 'Total cost'], rows: P.map(p => [p.name, p.can ? minus(inr(p.s)) : 'cannot buy', p.spk != null ? minus(inr(r4(p.spk))) : '—', p.rank ? String(p.rank) : !p.can ? 'make' : 'buy', nf(p.make), nf(p.bought), inr(p.cost)]) },
      note: `**Conventions.** Relevant cost of making = variable cost (plus the fixed cost that making a part adds, if any); fixed costs that continue either way are left out. Parts that cannot be bought are made first; the rest take the key factor in rank order of saving per unit of it.${whole ? ' Units made are whole; the rest is bought.' : ''} A part with an avoidable fixed cost is made only if its saving covers that cost (every choice is checked).`
    };
  }

  /* ================================================================== mode: shut down */
  function computeShut(v) {
    const S = shutDown({ price: num(v.sprice), vc: num(v.svc), units: num(v.sunits) || 0, cap: num(v.cap) || 0, fixed: num(v.sfixed), keep: num(v.keep), extra: num(v.extra) || 0 });
    const frames = [], un = String(v.suname || '').trim() || 'units';
    const L = [
      ['Sales', inr(S.sales), '—'],
      ['Less: variable cost', '(' + inr(S.units * S.vc) + ')', '—'],
      ['Contribution', inr(S.units * S.c), '—'],
      ['Less: fixed costs', '(' + inr(S.fixed) + ')', '(' + inr(S.keep) + ')'],
      ['Less: costs of shutting down', '—', '(' + inr(S.extra) + ')'],
      ['**Profit / (loss)**', `**${minus(inr(S.cont))}**`, `**${minus(inr(S.shut))}**`]];
    const st = (n, hl) => ({ type: 'table', title: 'Continue or shut down?', head: ['Particulars', 'Continue', 'Shut down'], rows: L.slice(0, n), cells: hl ? cellsRow(n - 1, 3, hl) : {}, align: ['left', 'right', 'right'] });
    frames.push({ caption: `**If the plant continues:** ${nf(S.units)} ${un} × contribution ${inr(S.c)} (${inr(S.price)} − ${inr(S.vc)}) = ${inr(S.units * S.c)}.`, view: [st(3, 'hl')] });
    frames.push({ caption: `**Fixed costs.** Running, all ${inr(S.fixed)} of fixed cost is incurred. Shut down, ${inr(S.keep)} still goes on (rent, depreciation, a skeleton staff): only ${inr(S.avoidable)} is avoided.`, view: [st(4, 'hl')] });
    frames.push({ caption: `**Costs of shutting down** (closing, maintenance, re-opening) of ${inr(S.extra)} arise only if the plant closes. Shut-down cost = ${inr(S.keep)} + ${inr(S.extra)} = **${inr(S.shutCost)}**.`, view: [st(5, 'hl')] });
    const dec = S.decision === 'continue' ? `Continuing loses less (or earns more): ${minus(inr(S.cont))} against ${minus(inr(S.shut))}. **Continue.**` : S.decision === 'shut' ? `Shutting down loses less: ${minus(inr(S.shut))} against ${minus(inr(S.cont))}. **Shut down.**` : 'Both options give the same result: the company is indifferent.';
    frames.push({ caption: `**Decision.** ${dec} The test is not "is there a loss?" but "is the loss bigger than the cost of shutting down?"`, view: [st(6, S.decision === 'shut' ? 'bad' : 'ok')] });
    const xNeed = Math.max(S.units, S.sdp > 0 ? S.sdp : 0, S.fixed / S.c, 1) * 1.25, XA = axisOf(0, xNeed, 5), xmax = XA.hi;
    const lo = Math.min(-S.fixed, S.shut, 0) * 1.12, hi = Math.max(xmax * S.c - S.fixed, S.fixed * 0.2);
    const YA = axisOf(lo, hi, 6);
    const plot = full => {
      const pts = [{ x: r4(S.units), y: r4(S.cont), label: `expected ${nf(S.units)}`, pos: 'left' }];
      if (full && S.sdp > 0) pts.push({ x: r4(S.sdp), y: r4(S.shut), label: `shut-down point ${nf(S.sdp)}`, pos: 'below', color: 'd' });
      return { type: 'plot', title: 'Result at each volume', w: 640, h: 320, x: [0, xmax], y: [YA.lo, YA.hi], xticks: XA.ticks, yticks: YA.ticks, xlabel: `${un} sold`, ylabel: 'profit / loss (₹)', legend: 'top-left', clip: true,
        series: [{ label: 'continue', pts: [[0, -S.fixed], [xmax, xmax * S.c - S.fixed]], color: 'a' }, { label: 'shut down', pts: [[0, S.shut], [xmax, S.shut]], color: 'd', dash: true }], points: pts };
    };
    frames.push({ caption: `**On a chart:** continuing gives the rising line (−${inr(S.fixed)} at nil sales, +${inr(S.c)} a unit); shutting down gives the flat line at ${minus(inr(S.shut))}, whatever the volume.`, view: [plot(false)] });
    frames.push({ caption: S.sdp > 0
      ? `**Shut-down point** = (fixed cost − shut-down cost) ÷ contribution per unit = (${inr(S.fixed)} − ${inr(S.shutCost)}) ÷ ${inr(S.c)} = **${nf(S.sdp)} ${un}**${S.cap ? ` (${pct(S.sdpPct)} of capacity)` : ''}. Below it, shut down; above it, carry on. Expected sales of ${nf(S.units)} ${un} are ${S.units > S.sdp ? 'above' : S.units < S.sdp ? 'below' : 'exactly at'} it.`
      : `**No shut-down point:** shutting down costs ${inr(S.shutCost)}, at least the whole fixed cost, so carrying on is never worse while each unit earns a contribution.`, view: [plot(true)] });
    const stats = [
      { label: 'Decision', value: S.decision === 'continue' ? 'Continue' : S.decision === 'shut' ? 'Shut down' : 'Either', hint: 'compare the loss if running with the shut-down cost', tone: S.decision === 'shut' ? 'bad' : '' },
      { label: S.cont >= 0 ? 'Profit if continued' : 'Loss if continued', value: inr(Math.abs(S.cont)), hint: 'units × contribution − fixed cost' },
      { label: 'Loss if shut down', value: inr(S.shutCost), hint: 'fixed costs that continue + costs of shutting down' },
      { label: `Shut-down point (${un})`, value: S.sdp > 0 ? nf(S.sdp) : '—', hint: '(fixed cost − shut-down cost) ÷ contribution per unit' }
    ];
    if (S.cap > 0 && S.sdp > 0) stats.push({ label: 'Shut-down point, % of capacity', value: pct(S.sdpPct), hint: 'shut-down point ÷ capacity' });
    return {
      frames, stats, sim: S,
      table: { head: ['Measure', 'Formula', 'Value'], rows: [['Contribution per unit', 'price − variable cost', inr(S.c)], ['Shut-down cost', 'fixed costs that continue + costs of shutting down', inr(S.shutCost)], ['Avoidable fixed cost', 'fixed cost − fixed costs that continue', inr(S.avoidable)],
        ['Shut-down point', '(fixed cost − shut-down cost) ÷ contribution per unit', S.sdp > 0 ? `${nf(S.sdp)} ${un}` : '—'], ['Result if continued', 'units × contribution − fixed cost', minus(inr(S.cont))], ['Result if shut down', '− shut-down cost', minus(inr(S.shut))]].map(r => r.map(minus)) },
      note: '**Conventions.** A temporary shut-down: fixed costs that continue while the plant is closed (rent, depreciation, a skeleton staff) plus the costs of closing and re-opening make up the shut-down cost. Variable costs stop with production. The shut-down point is shown to two decimals.'
    };
  }

  /* ================================================================== compute + definition */
  let lastMode = 'mix';
  function compute(v) {
    const mode = v.mode === 'makebuy' ? 'makebuy' : v.mode === 'shutdown' ? 'shutdown' : 'mix';
    const r = mode === 'makebuy' ? computeMakeBuy(v) : mode === 'shutdown' ? computeShut(v) : computeMix(v);
    lastMode = mode;
    return r;
  }
  const isM = m => v => (v.mode || 'mix') === m;
  const kfModes = v => isM('mix')(v) || isM('makebuy')(v);
  const controls = [
    { id: 'mode', type: 'select', label: 'What to decide', value: 'mix', options: [['mix', 'Product mix with a key factor'], ['makebuy', 'Make or buy'], ['shutdown', 'Shut down or continue']] },
    { id: 'kfName', type: 'text', label: 'The key factor is measured in (plural)', short: 'Key factor', value: 'kiln hours', placeholder: 'machine hours', show: kfModes },
    { id: 'avail', type: 'number', label: 'Key factor available', short: 'Available', value: 4000, min: 0, max: 1e12, step: 'any', show: isM('mix') },
    { id: 'kfProducts', type: 'table', label: 'Products (key factor per unit; maximum demand; minimum to make)', short: 'Products', max: 6, show: isM('mix'),
      rows: [['Kulhad', 120, 70, 0.5, 4000, 0], ['Teapot', 450, 250, 2.5, 1200, 200], ['Diya', 90, 54, 0.3, 3000, 0]],
      cols: [{ id: 'name', label: 'Name', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'price', label: 'Price', type: 'number', min: 0, def: 100 }, { id: 'vc', label: 'VC', type: 'number', min: 0, def: 60 },
        { id: 'kf', label: 'KF', type: 'number', min: 0, def: 1 }, { id: 'max', label: 'Max', type: 'number', min: 0, def: 1000 }, { id: 'min', label: 'Min', type: 'number', min: 0, def: 0 }] },
    { id: 'fixed', type: 'number', label: 'Fixed cost (₹; 0 = none)', short: 'Fixed cost', value: 150000, min: 0, max: 1e13, step: 'any', show: isM('mix') },
    { id: 'kfParts', type: 'table', label: 'Parts (VC = variable cost to make; buy price 0 = cannot be bought; KF = key factor per unit; fixed = extra fixed cost if made)', short: 'Parts', max: 6, show: isM('makebuy'),
      rows: [['Pastry', 50000, 4, 5.5, 0.01, 0], ['Filling', 50000, 6, 6.6, 0.02, 0], ['Chutney', 50000, 1.2, 1, 0.005, 0], ['Masala', 50000, 3, 0, 0.004, 0]],
      cols: [{ id: 'name', label: 'Name', type: 'text', auto: n => 'Part ' + (n + 1) }, { id: 'need', label: 'Need', type: 'number', min: 0, def: 1000 }, { id: 'vc', label: 'VC', type: 'number', min: 0, def: 10 },
        { id: 'buy', label: 'Buy', type: 'number', min: 0, def: 12 }, { id: 'kf', label: 'KF', type: 'number', min: 0, def: 1 }, { id: 'fixed', label: 'Fixed', type: 'number', min: 0, def: 0 }] },
    { id: 'bavail', type: 'number', label: 'Key factor available (0 = no limit)', short: 'Available', value: 1200, min: 0, max: 1e12, step: 'any', show: isM('makebuy') },
    { id: 'whole', type: 'toggle', label: 'Whole units only (a part unit is dropped)', short: 'Whole units', value: true, show: kfModes },
    { id: 'sprice', type: 'number', label: 'Selling price per unit (₹)', short: 'Price', value: 30, min: 0, max: 1e9, step: 'any', show: isM('shutdown') },
    { id: 'svc', type: 'number', label: 'Variable cost per unit (₹)', short: 'Variable cost', value: 18, min: 0, max: 1e9, step: 'any', show: isM('shutdown') },
    { id: 'sunits', type: 'number', label: 'Expected sales if it continues (units)', short: 'Expected sales', value: 15000, min: 0, max: 1e10, step: 'any', show: isM('shutdown') },
    { id: 'suname', type: 'text', label: 'One unit is called (plural)', short: 'Unit', value: 'cups', placeholder: 'units', show: isM('shutdown') },
    { id: 'cap', type: 'number', label: 'Capacity at 100%, units (0 = not given)', short: 'Capacity', value: 30000, min: 0, max: 1e10, step: 'any', show: isM('shutdown') },
    { id: 'sfixed', type: 'number', label: 'Fixed costs while operating (₹)', short: 'Fixed costs', value: 240000, min: 0, max: 1e13, step: 'any', show: isM('shutdown') },
    { id: 'keep', type: 'number', label: 'Fixed costs that continue if shut down (₹)', short: 'Continuing fixed costs', value: 100000, min: 0, max: 1e13, step: 'any', show: isM('shutdown') },
    { id: 'extra', type: 'number', label: 'Extra costs of shutting down and re-opening (₹; 0 = none)', short: 'Costs of shutting down', value: 20000, min: 0, max: 1e13, step: 'any', show: isM('shutdown') }
  ];

  const presets = [
    { label: 'Lesson example · Tapri kiln: kulhads, teapots (200 promised) and diyas on 4,000 kiln hours', values: { mode: 'mix' } },
    { label: 'RTP Sep 2025 Q16 · N.P. Ltd: products P and Q on 1,60,000 machine hours (fixed ₹9,60,000)', values: { mode: 'mix', kfName: 'machine hours', avail: 160000, fixed: 960000, kfProducts: [['P', 25, 8, 2, 60000, 0], ['Q', 50, 34, 1, 100000, 0]] } },
    { label: 'PYQ Sep 2025 Q3(b) · SM Ltd: products A and B with 1,10,000 kg of raw material', values: { mode: 'mix', kfName: 'kg of material', avail: 110000, fixed: 600000, kfProducts: [['A', 1000, 630, 10, 5000, 0], ['B', 1500, 920, 20, 3500, 0]] } },
    { label: 'PYQ May 2023 (old scheme) Q4(c) · MNP Co.: products A and B on 55,000 machine hours', values: { mode: 'mix', kfName: 'machine hours', avail: 55000, fixed: 140000, kfProducts: [['A', 180, 130, 10, 5000, 0], ['B', 175, 125, 5, 6000, 0]] } },
    { label: 'PYQ Nov 2022 (old scheme) Q4(a) · wheat, rice and maize on 210 hectares, minimum areas (figures per hectare)', values: { mode: 'mix', kfName: 'hectares', avail: 210, fixed: 2145000, kfProducts: [['Wheat', 40000, 28000, 1, 160, 100], ['Rice', 20000, 6500, 1, 50, 40], ['Maize', 25000, 15000, 1, 60, 10]] } },
    { label: 'Lesson example · Tapri samosa factory: make or buy four parts with 1,200 oven hours', values: { mode: 'makebuy', kfName: 'oven hours' } },
    { label: 'MTP Sep 2025 Series 1 Q4(a) · Apex Electronics: three smart-speaker components, 4,000 labour hours', values: { mode: 'makebuy', kfName: 'labour hours', bavail: 4000, kfParts: [['Voice module', 4000, 3400, 3700, 1.2, 0], ['Control panel', 4000, 4700, 4600, 2, 0], ['Power adapter', 4000, 2900, 3300, 3.5, 0]] } },
    { label: 'MTP Nov 2023 Series 2 (old scheme) Q5(b) · products P, Q, R can be bought in, S cannot; 8,15,000 machine hours', values: { mode: 'makebuy', kfName: 'machine hours', bavail: 815000, kfParts: [['P', 120000, 15.6, 21.36, 1.2, 0], ['Q', 186000, 18.72, 24, 1.2, 0], ['R', 171000, 39.6, 48, 2, 0], ['S', 99000, 33.48, 0, 1.8, 0]] } },
    { label: 'RTP Jan 2026 Q17 · Jupiter Ltd: empty cans for 2,25,000 cans of EXE (a new machine beyond 1,50,000)', values: { mode: 'makebuy', kfName: 'machine hours', bavail: 0, kfParts: [['Cans (present capacity)', 150000, 0.6375, 0.675, 0, 0], ['Extra cans (new machine)', 75000, 0.6375, 0.675, 0, 7500]] } },
    { label: 'Lesson example · Tapri hill-town café in the monsoon: shut or stay open?', values: { mode: 'shutdown' } },
    { label: 'PYQ Nov 2023 (old scheme) Q4(b) · R Ltd Noida plant: 60,000 units of AN, fixed cost falls by ₹2,50,000 if shut', values: { mode: 'shutdown', sprice: 15, svc: 12, sunits: 60000, suname: 'units', cap: 0, sfixed: 420000, keep: 170000, extra: 25000 } },
    { label: 'MTP Nov 2023 Series 2 (old scheme) Q1(b) · T Ltd: 95,000 units at 80% capacity, fixed cost reduced to ₹1,30,000', values: { mode: 'shutdown', sprice: 8, svc: 6, sunits: 95000, suname: 'units', cap: 118750, sfixed: 350000, keep: 130000, extra: 15000 } },
    { label: 'Study Material Problem 9(iii) · Mr. X: lock up the business? (₹100 of sales as one unit)', values: { mode: 'shutdown', sprice: 100, svc: 60, sunits: 1500, suname: 'units of ₹100 sales', cap: 0, sfixed: 80000, keep: 25000, extra: 0 } }
  ];

  /* ---------------------------------------------------------------- Test yourself */
  const int = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const NAMES = [['Kulhad', 'Teapot', 'Diya'], ['A', 'B', 'C'], ['X', 'Y', 'Z'], ['Premix', 'Rusk', 'Namkeen']];
  const challenge = {
    title: 'Make the call',
    gen(r) {
      if (lastMode === 'makebuy') {
        const nm = ['Pastry', 'Filling', 'Box'], parts = [], used = new Set();
        for (let i = 0; i < 3; i++) {
          let kf, s;
          do { kf = int(r, 1, 4); s = int(r, 1, 12); } while (used.has(s / kf));
          used.add(s / kf);
          const vc = 5 * int(r, 2, 20);
          parts.push([nm[i], 100 * int(r, 5, 30), vc, vc + s, kf, 0]);
        }
        const needAll = parts.reduce((a, p) => a + p[1] * p[4], 0), bavail = Math.round(needAll * (0.35 + r() * 0.4));
        const R = makeBuy(readParts(parts), bavail);
        const target = R.P.filter(p => p.bought > 0 && p.make > 0)[0] || R.P.filter(p => p.bought > 0)[0] || R.P[0];
        return { mode: 'makebuy', kfName: 'machine hours', bavail, kfParts: parts, whole: true, ask: r() < 0.5 ? 'total' : 'buy', part: target.name };
      }
      if (lastMode === 'shutdown') {
        const vc = int(r, 5, 40), c = int(r, 2, 15), sdp = 100 * int(r, 20, 300), shutCost = 1000 * int(r, 10, 200);
        let units = Math.max(100, sdp + 100 * int(r, -150, 150));
        if (units === sdp) units += 100;
        const extra = 1000 * int(r, 0, Math.min(40, Math.floor(shutCost / 1000)));
        return { mode: 'shutdown', sprice: vc + c, svc: vc, sunits: units, suname: 'units', cap: 0, sfixed: shutCost + sdp * c, keep: shutCost - extra, extra, ask: r() < 0.6 ? 'sdp' : 'shut' };
      }
      const names = NAMES[int(r, 0, NAMES.length - 1)], products = [], seen = new Set();
      for (let i = 0; i < 3; i++) {
        let kf, c;
        do { kf = int(r, 1, 6); c = 5 * int(r, 2, 30); } while (seen.has(c / kf));
        seen.add(c / kf);
        const vc = 10 * int(r, 2, 30);
        products.push([names[i], vc + c, vc, kf, 100 * int(r, 5, 40), 0]);
      }
      const needAll = products.reduce((a, p) => a + p[3] * p[4], 0), avail = 10 * Math.round(needAll * (0.4 + r() * 0.35) / 10);
      const R = bestMix(readProducts(products), avail);
      const part = R.P.find(p => p.units > 0 && p.units < p.max) || R.order[1] || R.P[0];
      return { mode: 'mix', kfName: 'machine hours', avail, fixed: 0, kfProducts: products, whole: true, ask: r() < 0.55 ? 'contribution' : 'units', part: part.name };
    },
    prompt(v) {
      if (v.mode === 'makebuy') {
        const ps = readParts(v.kfParts).map(p => `${p.name}: ${nf(p.need)} needed, ₹${nf(p.vc)} variable cost to make, ₹${nf(p.buy)} to buy, ${nf(p.kf)} machine hours a unit`).join('; ');
        return `${ps}. Only ${nf(v.bavail)} machine hours are available (whole units). ${v.ask === 'total' ? 'What is the **total cost** of the cheapest plan? (₹)' : `How many units of **${v.part}** should be **bought**?`}`;
      }
      if (v.mode === 'shutdown') return `Price ₹${nf(v.sprice)}, variable cost ₹${nf(v.svc)} a unit, expected sales ${nf(v.sunits)} units. Fixed costs ₹${nf(v.sfixed)} a period; if the plant shuts, ₹${nf(v.keep)} of them continue and closing costs ₹${nf(v.extra)}. ${v.ask === 'sdp' ? 'What is the **shut-down point** in units? (2 decimals)' : '**Should the plant be shut down?**'}`;
      const ps = readProducts(v.kfProducts).map(p => `${p.name}: price ₹${nf(p.price)}, variable cost ₹${nf(p.vc)}, ${nf(p.kf)} machine hours a unit, demand ${nf(p.max)}`).join('; ');
      return `${ps}. Only ${nf(v.avail)} machine hours are available (whole units). ${v.ask === 'contribution' ? 'What is the **maximum total contribution**? (₹)' : `How many units of **${v.part}** are in the best mix?`}`;
    },
    solve(res, v) {
      if (v.mode === 'makebuy') return v.ask === 'total' ? r2(res.sim.total) : res.sim.P.find(p => p.name === v.part).bought;
      if (v.mode === 'shutdown') return v.ask === 'sdp' ? r2(res.sim.sdp) : res.sim.decision === 'shut' ? 'yes' : 'no';
      return v.ask === 'contribution' ? r2(res.sim.contribution) : res.sim.P.find(p => p.name === v.part).units;
    },
    tol: 0.011,
    kind: v => (v.mode === 'shutdown' && v.ask === 'shut' ? 'yesno' : 'num'),
    view(res, v) {
      if (v.mode === 'makebuy') return [{ type: 'table', title: 'Given', head: ['Part', 'Needed', 'Variable cost to make', 'Buy price', 'Machine hours / unit'], rows: readParts(v.kfParts).map(p => [p.name, nf(p.need), inr(p.vc), inr(p.buy), nf(p.kf)]), align: ['left', 'right', 'right', 'right', 'right'] }];
      if (v.mode === 'shutdown') return null;
      return [{ type: 'table', title: 'Given', head: ['Product', 'Price', 'Variable cost', 'Machine hours / unit', 'Demand'], rows: readProducts(v.kfProducts).map(p => [p.name, inr(p.price), inr(p.vc), nf(p.kf), nf(p.max)]), align: ['left', 'right', 'right', 'right', 'right'] }];
    },
    explain(res, v) {
      if (v.mode === 'makebuy') { const B = res.sim; return `Saving per machine hour: ${B.P.map(p => `${p.name} ${inr(r4(p.spk))}`).join(', ')}; make in that order: ${B.P.map(p => `${p.name} make ${nf(p.make)}, buy ${nf(p.bought)}`).join('; ')}. Total cost **${inr(B.total)}**.`; }
      if (v.mode === 'shutdown') { const S = res.sim; return `Shut-down cost = ₹${nf(S.keep)} + ₹${nf(S.extra)} = ${inr(S.shutCost)}; shut-down point = (${inr(S.fixed)} − ${inr(S.shutCost)}) ÷ ${inr(S.c)} = **${nf(S.sdp)} units**. Expected sales ${nf(S.units)}: ${S.decision === 'shut' ? '**shut down**' : '**continue**'}.`; }
      const R = res.sim;
      return `Contribution per machine hour: ${R.P.map(p => `${p.name} ${inr(r4(p.cpk))}`).join(', ')}. Fill in that order: ${R.P.filter(p => p.units > 0).map(p => `${p.name} ${nf(p.units)}`).join(', ')}. Total contribution **${inr(R.contribution)}**.`;
    }
  };

  const def = {
    id: 'key-factor', title: 'Key Factor Lab',
    blurb: 'Fill the best product mix by contribution per unit of the key factor; then make-or-buy and shut-down calls.',
    controls, presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { bestMix, makeBuy, shutDown, compute, def };
  g.__lab_def_key_factor = def;
})(typeof window !== 'undefined' ? window : globalThis);
