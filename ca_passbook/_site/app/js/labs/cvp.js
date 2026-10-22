/* PassBook — CVP Lab (Paper 4, Marginal Costing, cma.mc). Owner: lab-c5.
   Three modes, one pure compute(values) -> {frames, stats, table, note}:
     bep    — break-even chart, contribution break-even chart or profit-volume chart for one product: BEP (units, ₹), cash BEP, margin of
              safety, angle of incidence, sales for a target profit (₹ or % of sales, before or after tax) and what-if changes (price,
              variable cost, fixed cost and volume sliders, in %), the old lines kept dashed beside the new ones;
     multi  — multi-product break-even with a sales mix in units (composite contribution per unit and per batch) or in sales value
              (composite P/V ratio), the BEP split per product, the check that contribution at the BEP equals the fixed cost, and the
              multi-product profit graph (products in descending P/V ratio, ICAI SM 14.8.6 Illustration 6);
     absorb — marginal vs absorption costing profit period by period with stock changes: both ICAI income statements line by line,
              under/over absorption, and the reconciliation (difference = fixed overhead in closing stock − in opening stock).
   Pure helpers exported for Node: single, mix, absorb, compute, def (tests/lab-cvp.test.js). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || {};
  const r2 = x => Math.round(x * 100) / 100;
  const r4 = x => Math.round(x * 1e4) / 1e4;
  const nf = n => (U.nf ? U.nf(r2(n)) : String(r2(n)));
  const inr = n => (U.inr ? U.inr(n) : (n < 0 ? '−₹' : '₹') + Math.abs(r2(n)));
  const pct = x => (Math.round(x * 10000) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '%';
  const minus = s => String(s).replace(/^-/, '−');
  const num = x => { if (typeof x === 'number') return x; const s = String(x == null ? '' : x).replace(/[₹,\s]/g, '').replace(/[−–]/g, '-'); return s === '' ? NaN : Number(s); };
  const sgn = (x, w) => (x >= 0 ? w[0] : w[1]);
  const plural = (n, w) => `${nf(n)} ${w}`;

  /* ================================================================== pure: one product */
  /** the CVP numbers for one product. o: {price, vc, fixed, dep, units, target, tkind ('amount'|'pct'), tax (0–1)} */
  function single(o) {
    const price = +o.price, vc = +o.vc, fixed = +o.fixed, dep = +(o.dep || 0), units = +(o.units || 0), tax = +(o.tax || 0);
    if (!(price > 0)) throw new Error('Enter a selling price above zero.');
    if (!(vc >= 0)) throw new Error('The variable cost per unit cannot be negative.');
    if (!(price > vc)) throw new Error('The selling price must be higher than the variable cost per unit, or no volume ever breaks even.');
    if (!(fixed >= 0)) throw new Error('The fixed cost cannot be negative.');
    if (dep < 0 || dep > fixed) throw new Error('The non-cash part (depreciation) must lie between 0 and the fixed cost.');
    if (!(tax >= 0 && tax < 1)) throw new Error('The tax rate must be from 0 to 99%.');
    const c = price - vc, pv = c / price;
    const S = { price, vc, fixed, dep, units, c, pv, vcr: vc / price, bepU: fixed / c, bepS: fixed / pv, cashBepU: (fixed - dep) / c, cashBepS: (fixed - dep) / pv,
      sales: units * price, contribution: units * c, profit: units * c - fixed };
    S.mosU = units - S.bepU; S.mosS = S.mosU * price; S.mosPct = units > 0 ? S.mosU / units : null;
    const t = +(o.target || 0);
    S.tax = tax; S.tkind = o.tkind === 'pct' ? 'pct' : 'amount'; S.target = t > 0 ? t : 0;
    if (S.target) {
      if (S.tkind === 'amount') {
        S.preTax = t / (1 - tax);
        S.tU = (fixed + S.preTax) / c; S.tS = S.tU * price;
      } else {
        const r = t / 100;                                   // profit after tax = r × sales: (1 − tax)(pv·S − F) = r·S
        if (!((1 - tax) * pv > r)) throw new Error(`A profit of ${pct(r)} of sales${tax ? ' after tax' : ''} is not reachable: each rupee of sales contributes only ${pct(pv * (1 - tax))}${tax ? ' after tax' : ''}.`);
        S.tS = (1 - tax) * fixed / ((1 - tax) * pv - r); S.tU = S.tS / price; S.preTax = S.tS * pv - fixed;
      }
    }
    return S;
  }

  /* ================================================================== pure: a sales mix */
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /** multi-product break-even. products: [{name, price, vc, w}], basis 'units' (w = units in the mix) or 'value' (w = share of sales value);
      expected: total units (units basis) or total ₹ sales (value basis), 0 = none */
  function mix(products, basis, fixed, expected) {
    if (!products.length) throw new Error('Add at least one product.');
    if (products.length > 8) throw new Error('At most 8 products.');
    products.forEach(p => {
      if (!(p.price > 0)) throw new Error(`${p.name}: enter a selling price above zero.`);
      if (!(p.vc >= 0)) throw new Error(`${p.name}: the variable cost cannot be negative.`);
      if (!(p.w >= 0)) throw new Error(`${p.name}: the mix figure cannot be negative.`);
    });
    if (!(fixed >= 0)) throw new Error('The fixed cost cannot be negative.');
    const W = products.reduce((a, p) => a + p.w, 0);
    if (!(W > 0)) throw new Error('Give the sales mix: at least one product needs a mix figure above zero.');
    const units = basis !== 'value';
    const rows = products.map(p => {
      const c = p.price - p.vc, pv = c / p.price, share = p.w / W;
      return { name: p.name, price: p.price, vc: p.vc, w: p.w, share, c, pv, wc: units ? c * share : pv * share };
    });
    const M = { basis: units ? 'units' : 'value', fixed, rows, W };
    if (units) {
      M.cu = rows.reduce((a, r) => a + r.wc, 0);                       // composite contribution per unit of the mix
      M.pu = rows.reduce((a, r) => a + r.price * r.share, 0);          // composite price per unit
      if (!(M.cu > 0)) throw new Error('The mix earns no contribution per unit, so it can never break even.');
      M.pv = M.cu / M.pu;
      M.bepU = fixed / M.cu; M.bepS = M.bepU * M.pu;
      rows.forEach(r => { r.bepU = M.bepU * r.share; r.bepS = r.bepU * r.price; });
      const ints = rows.every(r => Number.isInteger(r.w) && r.w >= 0) && rows.some(r => r.w > 0);
      if (ints) {                                                       // the batch view: one batch = the mix in its lowest whole numbers
        const gg = rows.reduce((a, r) => (r.w ? gcd(a, r.w) : a), 0);
        M.batch = rows.map(r => r.w / gg); M.batchN = M.batch.reduce((a, b) => a + b, 0);
        M.cb = rows.reduce((a, r, i) => a + r.c * M.batch[i], 0); M.bepB = fixed / M.cb;
      }
    } else {
      M.pv = rows.reduce((a, r) => a + r.wc, 0);                       // composite P/V ratio (contribution per rupee of sales)
      if (!(M.pv > 0)) throw new Error('The mix earns no contribution per rupee of sales, so it can never break even.');
      M.bepS = fixed / M.pv;
      rows.forEach(r => { r.bepS = M.bepS * r.share; r.bepU = r.bepS / r.price; });
      M.bepU = rows.reduce((a, r) => a + r.bepU, 0);
    }
    rows.forEach(r => { r.cAtBep = r.bepU * r.c; });
    M.check = rows.reduce((a, r) => a + r.cAtBep, 0);                   // = fixed cost
    const E = +(expected || 0);
    if (E > 0) {
      if (units) { M.expU = E; rows.forEach(r => { r.expU = E * r.share; r.expS = r.expU * r.price; }); M.expS = rows.reduce((a, r) => a + r.expS, 0); }
      else { M.expS = E; rows.forEach(r => { r.expS = E * r.share; r.expU = r.expS / r.price; }); M.expU = rows.reduce((a, r) => a + r.expU, 0); }
      M.contribution = rows.reduce((a, r) => a + r.expU * r.c, 0);
      M.profit = M.contribution - fixed;
      M.mosS = M.expS - M.bepS; M.mosPct = M.mosS / M.expS;
    }
    return M;
  }

  /* ================================================================== pure: marginal vs absorption costing */
  /** o: {price, vcp, vcs, fop, normal, basis ('normal'|'actual'), fos, open, periods:[{name, prod, sold}]}. Stock moves first in, first out;
      the opening stock of the first period carries the first period's unit costs. Returns one record per period. */
  function absorb(o) {
    const price = +o.price, vcp = +o.vcp, vcs = +(o.vcs || 0), fop = +o.fop, fos = +(o.fos || 0), open = +(o.open || 0), basis = o.basis === 'actual' ? 'actual' : 'normal';
    const P = o.periods || [];
    if (!P.length) throw new Error('Add at least one period.');
    if (P.length > 6) throw new Error('At most 6 periods.');
    [['selling price', price], ['variable production cost', vcp], ['variable selling cost', vcs], ['fixed production overhead', fop], ['fixed selling and administration cost', fos], ['opening stock', open]]
      .forEach(([n, x]) => { if (!(x >= 0)) throw new Error(`The ${n} cannot be negative.`); });
    let rate0 = null;
    if (basis === 'normal') {
      if (!(+o.normal > 0)) throw new Error('Enter the normal capacity per period (the absorption rate is fixed overhead ÷ normal capacity).');
      rate0 = fop / +o.normal;
    }
    let layers = [];                                                    // FIFO stock layers {u, rate}
    const out = [];
    P.forEach((p, i) => {
      const prod = +p.prod, sold = +p.sold, name = p.name;
      if (!(prod >= 0) || !(sold >= 0)) throw new Error(`${name}: production and sales cannot be negative.`);
      const rate = basis === 'normal' ? rate0 : prod > 0 ? fop / prod : null;
      if (rate === null) throw new Error(`${name}: with the rate based on actual production, the period must produce something (the rate is fixed overhead ÷ units produced).`);
      if (i === 0 && open > 0) layers = [{ u: open, rate }];
      const openU = layers.reduce((a, l) => a + l.u, 0), openFix = layers.reduce((a, l) => a + l.u * l.rate, 0);
      if (sold > openU + prod + 1e-9) throw new Error(`${name}: ${nf(sold)} units cannot be sold from ${nf(openU)} in stock plus ${nf(prod)} produced.`);
      const lay = layers.map(l => ({ u: l.u, rate: l.rate })).concat(prod > 0 ? [{ u: prod, rate }] : []);
      let need = sold;
      for (const l of lay) { const take = Math.min(l.u, need); l.u -= take; need -= take; if (need <= 1e-12) break; }
      layers = lay.filter(l => l.u > 1e-9);
      const closeU = layers.reduce((a, l) => a + l.u, 0), closeFix = layers.reduce((a, l) => a + l.u * l.rate, 0);
      const sales = sold * price, absorbed = prod * rate, under = fop - absorbed;
      const A = { sales, varProd: prod * vcp, fixAbs: absorbed, cop: prod * (vcp + rate), openV: openU * vcp + openFix, closeV: closeU * vcp + closeFix };
      A.cogs = A.cop + A.openV - A.closeV; A.adj = A.cogs + under; A.sellVar = sold * vcs; A.sellFix = fos; A.cos = A.adj + A.sellVar + fos; A.profit = sales - A.cos;
      const M = { sales, varProd: prod * vcp, openV: openU * vcp, closeV: closeU * vcp };
      M.vcogs = M.varProd + M.openV - M.closeV; M.sellVar = sold * vcs; M.tvc = M.vcogs + M.sellVar; M.contribution = sales - M.tvc; M.fixProd = fop; M.fixSell = fos; M.profit = M.contribution - fop - fos;
      out.push({ name, prod, sold, openU, closeU, rate, openFix, closeFix, under, A, M, diff: A.profit - M.profit });
    });
    return { basis, rate0, periods: out, totA: out.reduce((a, p) => a + p.A.profit, 0), totM: out.reduce((a, p) => a + p.M.profit, 0) };
  }

  /* ================================================================== drawing helpers */
  function niceStep(raw) {
    if (!(raw > 0)) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  }
  const tidy = v => +v.toPrecision(10);
  /** a padded axis [lo, hi] with ticks every nice step, labelled in Indian grouping */
  function axisOf(lo, hi, n) {
    if (!(hi > lo)) hi = lo + 1;
    const st = niceStep((hi - lo) / (n || 5)), a = tidy(Math.floor(lo / st + 1e-9) * st), b = tidy(Math.ceil(hi / st - 1e-9) * st), ticks = [];
    for (let v = a, k = 0; v <= b + st / 2 && k < 30; v = tidy(v + st), k++) ticks.push([v, minus(nf(v))]);
    return { lo: a, hi: b, ticks };
  }
  /** ₹ on a chart: rupees, lakh or crore so tick labels stay short */
  const scaleOf = m => (m >= 1e11 ? { k: 1e7, u: '₹ crore' } : m >= 1e9 ? { k: 1e5, u: '₹ lakh' } : { k: 1, u: '₹' });
  const ln = (label, a, b, color, more) => Object.assign({ label, pts: [a, b], color }, more || {});

  /* ================================================================== mode: break-even (one product) */
  function computeBep(v) {
    const base = single({ price: num(v.price), vc: num(v.vc), fixed: num(v.fixed), dep: num(v.dep) || 0, units: num(v.units) || 0, target: num(v.target) || 0, tkind: v.tkind, tax: (num(v.tax) || 0) / 100 });
    const d = k => (num(v[k]) || 0) / 100;
    const what = d('dPrice') || d('dVc') || d('dFixed') || d('dUnits');
    const S = what ? single({ price: base.price * (1 + d('dPrice')), vc: base.vc * (1 + d('dVc')), fixed: base.fixed * (1 + d('dFixed')), dep: base.dep * (1 + d('dFixed')), units: base.units * (1 + d('dUnits')),
      target: base.target, tkind: base.tkind, tax: base.tax }) : base;
    const un = String(v.uname || '').trim() || 'units';
    const chart = v.chart === 'pv' ? 'pv' : v.chart === 'contrib' ? 'contrib' : 'be';
    const has = { mos: base.units > 0, target: !!base.target, cash: base.dep > 0, what: !!what };

    /* the axes cover the BEP, the budget, the target and the changed figures, with room to spare */
    const xNeed = Math.max(base.bepU, base.units, S.bepU, S.units, base.target ? base.tU : 0, S.target ? S.tU : 0, 1) * 1.25;
    const XA = axisOf(0, xNeed, 5), xmax = XA.hi;
    const frames = [];
    const U1 = x => `${nf(x)} ${un}`;
    const up = x => (Number.isInteger(r4(x)) ? '' : ` (round up: ${nf(Math.ceil(x - 1e-9))} ${un})`);

    if (chart !== 'pv') {
      const yNeed = Math.max(base.price, S.price) * xmax;
      const sc = scaleOf(yNeed), K = sc.k, YA = axisOf(0, yNeed / K, 5);
      const sl = (s, x) => [x, s.price * x / K], tc = (s, x) => [x, (s.fixed + s.vc * x) / K];
      const spec = (o) => {
        const s = o.s || base, series = [], regions = [], points = [], vectors = [];
        if (o.old) {                                                   // the lines before the what-if change, dashed
          series.push(ln('before', sl(base, 0), sl(base, xmax), 'mute', { dash: true }));
          series.push(ln('', tc(base, 0), tc(base, xmax), 'mute', { dash: true, legend: false }));
        }
        series.push(ln('sales', sl(s, 0), sl(s, xmax), 'a'));
        if (o.fc && chart === 'be') series.push(ln('fixed cost', [0, s.fixed / K], [xmax, s.fixed / K], 'c', { dash: true }));
        if (o.fc && chart === 'contrib') series.push(ln('variable cost', [0, 0], [xmax, s.vc * xmax / K], 'c', { dash: true }));
        if (o.tc) series.push(ln('total cost', tc(s, 0), tc(s, xmax), 'd'));
        if (o.cash) series.push(ln('cash cost', [0, (s.fixed - s.dep) / K], [xmax, (s.fixed - s.dep + s.vc * xmax) / K], 'e', { dash: true }));
        if (o.areas) {
          if (s.bepU > 0) regions.push({ pts: [tc(s, 0), [s.bepU, s.bepS / K], sl(s, 0)], color: 'bad', label: 'loss', hatch: true });
          regions.push({ pts: [[s.bepU, s.bepS / K], sl(s, xmax), tc(s, xmax)], color: 'ok' });
          const xp = xmax * 0.94, yp = (s.price * xp + s.fixed + s.vc * xp) / 2 / K;   // the label sits between the lines, clear of the budget and target marks
          regions.push({ pts: [[xp, yp], [xp, yp], [xp, yp]], fill: false, color: 'ok', label: 'profit' });
        }
        if (o.angle) { const dx = (xmax - s.bepU) * 0.22; regions.push({ pts: [[s.bepU, s.bepS / K], sl(s, s.bepU + dx), tc(s, s.bepU + dx)], color: 'warn', label: 'θ' }); }
        if (o.contribArea && chart === 'contrib') regions.push({ pts: [[0, 0], sl(s, xmax), [xmax, s.vc * xmax / K]], color: 'b', label: 'contribution', fill: true });
        if (o.bep) points.push({ x: r4(s.bepU), y: r4(s.bepS / K), label: `BEP ${nf(s.bepU)}`, pos: 'left' });
        if (o.cash) points.push({ x: r4(s.cashBepU), y: r4(s.cashBepS / K), label: `cash BEP ${nf(s.cashBepU)}`, pos: 'right', color: 'e' });
        if (o.mos && s.units > 0) {
          series.push(ln('', [s.units, 0], [s.units, s.sales / K], 'mute', { dash: true, legend: false }));
          points.push({ x: r4(s.units), y: r4(s.sales / K), label: `budget ${nf(s.units)}`, pos: Math.abs(s.units - s.bepU) < xmax * 0.15 ? 'right' : 'left' });
          if (Math.abs(s.mosU) > xmax * 0.02) vectors.push({ from: [r4(s.bepU), r4(YA.hi * 0.05)], to: [r4(s.units), r4(YA.hi * 0.05)], label: 'margin of safety', color: s.mosU >= 0 ? 'ok' : 'bad', pos: 'above' });
        }
        if (o.target && s.target) points.push({ x: r4(s.tU), y: r4(s.tS / K), label: `target ${nf(s.tU)}`, pos: o.mos && s.units > 0 && Math.abs(s.tU - s.units) < xmax * 0.15 ? 'below' : 'left', color: 'f' });
        return { type: 'plot', title: chart === 'contrib' ? 'Contribution break-even chart' : 'Break-even chart', w: 640, h: 340, x: [0, xmax], y: [0, YA.hi], xticks: XA.ticks, yticks: YA.ticks,
          xlabel: `${un} sold`, ylabel: `cost and revenue (${sc.u})`, legend: 'top-left', series, regions, points, vectors, clip: true };
      };
      const fcWord = chart === 'contrib' ? 'variable cost' : 'fixed cost';
      frames.push({ caption: `**Sales line.** Revenue starts at zero and rises by ${inr(base.price)} for every unit sold, so it is a straight line from the origin.`, view: [spec({})] });
      frames.push({ caption: chart === 'contrib'
        ? `**Variable cost line.** Variable cost is nil at zero activity and rises by ${inr(base.vc)} a unit, so it also starts at the origin. The gap between the sales and variable cost lines is the contribution.`
        : `**Fixed cost line.** Fixed cost stays at ${inr(base.fixed)} whatever the volume (within the relevant range): a horizontal line.`, view: [spec({ fc: 1 })] });
      frames.push({ caption: `**Total cost line.** Total cost = ${inr(base.fixed)} + ${inr(base.vc)} × units: it starts at the fixed cost and climbs more slowly than sales. Each unit adds ${inr(base.price)} of revenue but only ${inr(base.vc)} of cost, a **contribution of ${inr(base.c)}** (P/V ratio ${pct(base.pv)}).`, view: [spec({ fc: 1, tc: 1, contribArea: chart === 'contrib' })] });
      frames.push({ caption: `**Break-even point.** The lines cross where the contributions have paid the whole fixed cost: ${inr(base.fixed)} ÷ ${inr(base.c)} = **${U1(base.bepU)}**${up(base.bepU)}, i.e. sales of ${inr(base.fixed)} ÷ ${pct(base.pv)} = **${inr(base.bepS)}**.`, view: [spec({ fc: 1, tc: 1, bep: 1 })] });
      frames.push({ caption: `**Loss and profit areas.** Left of the BEP total cost is above sales (loss); right of it every extra unit adds ${inr(base.c)} of profit, so the profit wedge widens.`, view: [spec({ fc: 1, tc: 1, bep: 1, areas: 1 })] });
      frames.push({ caption: `**Angle of incidence (θ).** The angle at the BEP between the sales line and the total cost line shows the rate at which profit is earned once fixed costs are covered: the higher the P/V ratio (here ${pct(base.pv)}), the wider the angle. ICAI uses it as an indicator, not a number to compute.`, view: [spec({ fc: 1, tc: 1, bep: 1, areas: 1, angle: 1 })] });
      let last = { fc: 1, tc: 1, bep: 1, areas: 1, angle: 1 };
      if (has.mos) {
        last = Object.assign({}, last, { mos: 1 });
        frames.push({ caption: base.mosU >= 0
          ? `**Margin of safety.** Budgeted sales of ${U1(base.units)} are ${U1(base.mosU)} past the BEP: MoS ${inr(base.mosS)} = **${pct(base.mosPct)} of sales**. Profit = MoS × P/V ratio = ${inr(base.mosS)} × ${pct(base.pv)} = **${inr(base.profit)}**.`
          : `**Margin of safety.** Budgeted sales of ${U1(base.units)} fall ${U1(-base.mosU)} short of the BEP: the margin of safety is negative (${pct(base.mosPct)}) and the result is a **loss of ${inr(-base.profit)}**.`, view: [spec(last)] });
      }
      if (has.cash) {
        last = Object.assign({}, last, { cash: 1 });
        frames.push({ caption: `**Cash break-even point.** Depreciation (${inr(base.dep)}) needs no cash, so only ${inr(base.fixed - base.dep)} of fixed cost must be met in cash: cash BEP = ${inr(base.fixed - base.dep)} ÷ ${inr(base.c)} = **${U1(base.cashBepU)}**${up(base.cashBepU)}.`, view: [spec(last)] });
      }
      if (has.target) {
        last = Object.assign({}, last, { target: 1 });
        frames.push({ caption: targetCaption(base, U1, up), view: [spec(last)] });
      }
      if (has.what) frames.push({ caption: whatCaption(base, S, U1), view: [spec(Object.assign({}, last, { s: S, old: 1 })), compareTable(base, S, un)] });
    } else {
      /* profit-volume chart: x = sales in ₹, y = profit; the slope of the profit line is the P/V ratio */
      const sMax = Math.max(base.price, S.price) * xmax, sc = scaleOf(Math.max(sMax, base.fixed, S.fixed)), K = sc.k;
      const SA = axisOf(0, sMax / K, 5);
      const pAt = (s, sales) => sales * s.pv - s.fixed;
      const yLo = -Math.max(base.fixed, S.fixed) * 1.1, yHi = Math.max(pAt(base, SA.hi * K), pAt(S, SA.hi * K), base.fixed * 0.2);
      const YA = axisOf(yLo / K, yHi / K, 6);
      const pl = (s, sales) => [sales / K, pAt(s, sales) / K];
      const spec = o => {
        const s = o.s || base, series = [], points = [], regions = [], vectors = [];
        if (o.old) series.push(ln('before', pl(base, 0), pl(base, SA.hi * K), 'mute', { dash: true }));
        if (o.line) series.push(ln('profit line', pl(s, 0), pl(s, SA.hi * K), 'a'));
        points.push({ x: 0, y: r4(-s.fixed / K), label: `loss at nil sales −${nf(s.fixed / K)}`, pos: 'right', color: 'bad' });
        if (o.areas) {
          if (s.bepS > 0) regions.push({ pts: [[0, 0], [0, -s.fixed / K], [s.bepS / K, 0]], color: 'bad', label: 'loss', hatch: true });
          regions.push({ pts: [[s.bepS / K, 0], pl(s, SA.hi * K), [SA.hi, 0]], color: 'ok' });
          const xp = SA.hi * 0.94, yp = pAt(s, xp * K) / 2 / K;
          if (yp > 0) regions.push({ pts: [[xp, yp], [xp, yp], [xp, yp]], fill: false, color: 'ok', label: 'profit' });
        }
        if (o.bep) points.push({ x: r4(s.bepS / K), y: 0, label: `BEP ${nf(s.bepS / K)}`, pos: 'below' });
        if (o.mos && s.units > 0) {
          points.push({ x: r4(s.sales / K), y: r4(s.profit / K), label: `budget: ${minus(nf(s.profit / K))}`, pos: 'left' });
          if (Math.abs(s.mosS) > SA.hi * K * 0.02) vectors.push({ from: [r4(s.bepS / K), r4(YA.hi * 0.12)], to: [r4(s.sales / K), r4(YA.hi * 0.12)], label: 'margin of safety', color: s.mosS >= 0 ? 'ok' : 'bad', pos: 'above' });
        }
        if (o.target && s.target) points.push({ x: r4(s.tS / K), y: r4(s.preTax / K), label: `target ${nf(s.preTax / K)}`, pos: 'left', color: 'f' });
        return { type: 'plot', title: 'Profit-volume chart', w: 640, h: 340, x: [0, SA.hi], y: [YA.lo, YA.hi], xticks: SA.ticks, yticks: YA.ticks,
          xlabel: `sales (${sc.u})`, ylabel: `profit / loss (${sc.u})`, legend: 'top-left', series, points, regions, vectors, clip: true };
      };
      frames.push({ caption: `**Profit-volume chart.** The horizontal axis is sales; the vertical axis is profit, with the zero-profit line across the middle. At nil sales the loss equals the fixed cost, **${inr(base.fixed)}**.`, view: [spec({})] });
      frames.push({ caption: `**Profit line.** Every rupee of sales adds ${pct(base.pv)} (the P/V ratio) to profit, so the line rises from −${inr(base.fixed)} with slope ${pct(base.pv)}.`, view: [spec({ line: 1 })] });
      frames.push({ caption: `**Break-even point.** The profit line crosses zero at sales of ${inr(base.fixed)} ÷ ${pct(base.pv)} = **${inr(base.bepS)}** (${U1(base.bepU)}).`, view: [spec({ line: 1, bep: 1 })] });
      frames.push({ caption: `**Loss and profit areas.** Below the BEP the line is under the axis (loss); above it, profit grows by ${pct(base.pv)} of every extra rupee of sales.`, view: [spec({ line: 1, bep: 1, areas: 1 })] });
      let last = { line: 1, bep: 1, areas: 1 };
      if (has.mos) {
        last = Object.assign({}, last, { mos: 1 });
        frames.push({ caption: base.mosU >= 0
          ? `**Margin of safety.** Budgeted sales ${inr(base.sales)} − BEP ${inr(base.bepS)} = **${inr(base.mosS)}** (${pct(base.mosPct)}); profit = ${inr(base.mosS)} × ${pct(base.pv)} = **${inr(base.profit)}**.`
          : `**Margin of safety.** Budgeted sales ${inr(base.sales)} are below the BEP: MoS is negative and the loss is **${inr(-base.profit)}**.`, view: [spec(last)] });
      }
      if (has.target) { last = Object.assign({}, last, { target: 1 }); frames.push({ caption: targetCaption(base, U1, up), view: [spec(last)] }); }
      if (has.what) frames.push({ caption: whatCaption(base, S, U1), view: [spec(Object.assign({}, last, { s: S, old: 1 })), compareTable(base, S, un)] });
    }

    const stats = [
      { label: 'Contribution per unit', value: inr(S.c), hint: 'selling price − variable cost per unit' },
      { label: 'P/V ratio', value: pct(S.pv), hint: 'contribution ÷ sales × 100' },
      { label: `Break-even (${un})`, value: nf(S.bepU), hint: 'fixed cost ÷ contribution per unit' },
      { label: 'Break-even sales', value: inr(S.bepS), hint: 'fixed cost ÷ P/V ratio' }
    ];
    if (S.units > 0) stats.push({ label: 'Margin of safety', value: pct(S.mosPct), hint: '(sales − break-even sales) ÷ sales', tone: S.mosU < 0 ? 'bad' : '' }, { label: S.profit >= 0 ? 'Profit' : 'Loss', value: inr(Math.abs(S.profit)), hint: 'contribution − fixed cost = MoS × P/V ratio', tone: S.profit < 0 ? 'bad' : '' });
    if (S.target && stats.length < 6) stats.push({ label: 'Sales for the target', value: inr(S.tS), hint: '(fixed cost + target profit before tax) ÷ P/V ratio' });
    const rows = [['Contribution per unit', 'price − variable cost', inr(S.c)], ['P/V ratio', 'contribution ÷ sales', pct(S.pv)],
      ['Break-even point', 'fixed cost ÷ contribution per unit', U1(S.bepU)], ['Break-even sales', 'fixed cost ÷ P/V ratio', inr(S.bepS)]];
    if (S.dep > 0) rows.push(['Cash break-even point', '(fixed cost − depreciation) ÷ contribution per unit', U1(S.cashBepU)]);
    if (S.units > 0) rows.push(['Sales', 'units × price', inr(S.sales)], ['Margin of safety', 'sales − break-even sales', `${inr(S.mosS)} (${U1(S.mosU)})`], ['Margin of safety ratio', 'MoS ÷ sales', pct(S.mosPct)],
      [S.profit >= 0 ? 'Profit' : 'Loss', 'units × contribution − fixed cost', inr(S.profit)]);
    if (S.target) rows.push(['Sales for the target profit', S.tkind === 'pct' ? (S.tax ? '(1 − t) × F ÷ ((1 − t) × P/V − r)' : 'fixed cost ÷ (P/V ratio − target %)') : '(fixed cost + target before tax) ÷ P/V ratio', `${inr(S.tS)} (${U1(S.tU)})`]);
    return {
      frames, stats, sim: { base, S, what: !!what },
      table: { head: ['Measure', 'Formula', 'Value'], rows: rows.map(r => r.map(x => minus(x))) },
      note: `**Conventions.** One product, a constant selling price and variable cost per unit, and fixed cost constant for the period (ICAI's CVP assumptions). Break-even units are shown to two decimals; to break even you must sell the next whole unit. The angle of incidence is drawn, not measured: its size depends on the chart's scales.${what ? ' What-if changes apply to the inputs above; the tiles and results show the figures after the change.' : ''}`
    };
  }
  function targetCaption(s, U1, up) {
    if (s.tkind === 'pct') return `**Sales for the target.** Profit${s.tax ? ' after tax' : ''} is to be ${s.target}% of sales: ${s.tax ? `(1 − ${pct(s.tax)}) × (${pct(s.pv)} × S − ${inr(s.fixed)}) = ${s.target}% × S, so S` : `${pct(s.pv)} × S − ${inr(s.fixed)} = ${s.target}% × S, so S = ${inr(s.fixed)} ÷ (${pct(s.pv)} − ${s.target}%)`} = **${inr(s.tS)}** (${U1(s.tU)}).`;
    const pre = s.tax ? `A profit of ${inr(s.target)} after tax at ${pct(s.tax)} needs ${inr(s.target)} ÷ (1 − ${pct(s.tax)}) = ${inr(s.preTax)} before tax. ` : '';
    return `**Sales for the target.** ${pre}Contribution must cover the fixed cost and the profit: (${inr(s.fixed)} + ${inr(s.preTax)}) ÷ ${inr(s.c)} = **${U1(s.tU)}**${up(s.tU)}, i.e. sales of **${inr(s.tS)}**.`;
  }
  function whatCaption(b, s, U1) {
    const ch = [];
    if (s.price !== b.price) ch.push(`price ${inr(b.price)} → ${inr(s.price)}`);
    if (s.vc !== b.vc) ch.push(`variable cost ${inr(b.vc)} → ${inr(s.vc)}`);
    if (s.fixed !== b.fixed) ch.push(`fixed cost ${inr(b.fixed)} → ${inr(s.fixed)}`);
    if (s.units !== b.units) ch.push(`volume ${U1(b.units)} → ${U1(s.units)}`);
    const p = s.units > 0 ? ` Profit moves from ${inr(b.profit)} to **${inr(s.profit)}** (${s.profit >= b.profit ? '+' : '−'}${inr(Math.abs(s.profit - b.profit))}).` : '';
    const pvW = s.pv > b.pv + 1e-12 ? 'rises' : s.pv < b.pv - 1e-12 ? 'falls' : 'does not change';
    return `**What if: ${ch.join(', ')}.** The P/V ratio ${pvW} (${pct(b.pv)} → ${pct(s.pv)}), so the break-even point moves from ${U1(b.bepU)} to **${U1(s.bepU)}** (${inr(b.bepS)} → ${inr(s.bepS)}).${p} The dashed lines are the old ones.`;
  }
  function compareTable(b, s, un) {
    const row = (m, f, x, y) => [m, f(x), f(y), x === y ? '—' : (y > x ? '+' : '−') + f(Math.abs(y - x)).replace(/^−/, '')];
    const rows = [row('Selling price', inr, b.price, s.price), row('Variable cost per unit', inr, b.vc, s.vc), row('Contribution per unit', inr, b.c, s.c), row('Fixed cost', inr, b.fixed, s.fixed),
      ['P/V ratio', pct(b.pv), pct(s.pv), s.pv === b.pv ? '—' : (s.pv > b.pv ? '+' : '−') + pct(Math.abs(s.pv - b.pv))], row(`Break-even (${un})`, nf, b.bepU, s.bepU), row('Break-even sales', inr, b.bepS, s.bepS)];
    if (b.units > 0) rows.push(row(`Sales (${un})`, nf, b.units, s.units), row('Profit', inr, b.profit, s.profit));
    return { type: 'table', title: 'Before and after the change', head: ['Measure', 'Before', 'After', 'Change'], rows: rows.map(r => r.map(minus)), align: ['left', 'right', 'right', 'right'] };
  }

  /* ================================================================== mode: sales mix */
  function readProducts(rows) {
    return (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'P' + (i + 1), price: num(r[1]), vc: num(r[2]), w: num(r[3]) }));
  }
  function computeMulti(v) {
    const basis = v.basis === 'value' ? 'value' : 'units';
    const prods = readProducts(v.mixProducts);
    const fixed = num(v.mfixed), E = num(basis === 'units' ? v.mixUnits : v.mixValue) || 0;
    const M = mix(prods, basis, fixed, E);
    const units = basis === 'units', R = M.rows;
    const frames = [];
    const head = units ? ['Product', 'Price', 'Variable cost', 'Contribution / unit', 'P/V ratio', 'Mix (units)', 'Share', 'Weighted contribution'] : ['Product', 'Price', 'Variable cost', 'Contribution / unit', 'P/V ratio', 'Mix (% of sales)', 'Share', 'Contribution per ₹ of sales'];
    const prodRow = r => [r.name, inr(r.price), inr(r.vc), minus(inr(r.c)), minus(pct(r.pv)), nf(r.w), pct(r.share), units ? minus(inr(r4(r.wc))) : minus(pct(r.wc))];
    const t1 = (n, total, hl) => {
      const rows = R.slice(0, n).map(prodRow), cells = {};
      if (total) rows.push(['**Composite**', '', '', '', units ? pct(M.pv) : '', nf(M.W), '100%', units ? `**${inr(r4(M.cu))}**` : `**${pct(M.pv)}**`]);
      if (hl != null) for (let k = 0; k < head.length; k++) cells[hl + ',' + k] = 'hl';
      R.slice(0, n).forEach((r, i) => { if (r.c < 0) cells[i + ',3'] = 'bad'; });
      return { type: 'table', title: units ? 'Composite contribution per unit of the mix' : 'Composite P/V ratio of the mix', head, rows, cells, align: ['left', 'right', 'right', 'right', 'right', 'right', 'right', 'right'] };
    };
    R.forEach((r, i) => frames.push({ caption: i === 0
      ? `**${r.name}.** Contribution = ${inr(r.price)} − ${inr(r.vc)} = ${minus(inr(r.c))} a unit (P/V ${minus(pct(r.pv))}). ${units ? `It is ${nf(r.w)} of every ${nf(M.W)} units sold, a share of ${pct(r.share)}, so it adds ${minus(inr(r4(r.wc)))} to each composite unit.` : `It is ${pct(r.share)} of sales value, so it adds ${minus(pct(r.pv))} × ${pct(r.share)} = ${minus(pct(r.wc))} to each rupee of sales.`}`
      : `**${r.name}.** Contribution ${minus(inr(r.c))} a unit (P/V ${minus(pct(r.pv))}); weight ${pct(r.share)}, so it adds ${units ? minus(inr(r4(r.wc))) : minus(pct(r.wc))}.${r.c < 0 ? ' Its contribution is negative: the other products must carry it.' : ''}`, view: [t1(i + 1, false, i)] }));
    const batchTxt = units && M.batch && M.batch.length > 1 ? ` One batch (${R.map((r, i) => `${nf(M.batch[i])} ${r.name}`).join(' + ')}) contributes ${inr(M.cb)}.` : '';
    frames.push({ caption: units
      ? `**Composite contribution.** The mix sells as one product earning the weighted average: **${inr(r4(M.cu))} per unit** of the mix.${batchTxt}`
      : `**Composite P/V ratio.** Each rupee of mixed sales contributes the weighted average, **${pct(M.pv)}**.`, view: [t1(R.length, true, R.length)] });
    const t2 = (n, check) => {
      const rows = R.slice(0, n).map(r => [r.name, nf(r.bepU), inr(r.bepS), minus(inr(r.cAtBep))]), cells = {};
      if (check) { rows.push(['**Total**', nf(M.bepU), inr(M.bepS), `**${inr(M.check)}** = fixed cost ✓`]); for (let k = 0; k < 4; k++) cells[n + ',' + k] = 'ok'; }
      else if (n) for (let k = 0; k < 4; k++) cells[(n - 1) + ',' + k] = 'hl';
      return { type: 'table', title: 'Break-even point split by the mix', head: ['Product', 'BEP (units)', 'BEP sales', 'Contribution at BEP'], rows, cells, align: ['left', 'right', 'right', 'right'] };
    };
    frames.push({ caption: units
      ? `**Composite break-even point.** ${inr(fixed)} ÷ ${inr(r4(M.cu))} = **${nf(M.bepU)} units** of the mix${M.batch && M.batch.length > 1 ? ` (= ${inr(fixed)} ÷ ${inr(M.cb)} = ${nf(M.bepB)} batches)` : ''}, sales ${inr(M.bepS)}.`
      : `**Composite break-even sales.** ${inr(fixed)} ÷ ${pct(M.pv)} = **${inr(M.bepS)}**.`, view: [t1(R.length, true, null), t2(0, false)] });
    R.forEach((r, i) => frames.push({ caption: units
      ? `**${r.name} at break-even:** ${nf(M.bepU)} × ${pct(r.share)} = **${nf(r.bepU)} units** (${inr(r.bepS)}).`
      : `**${r.name} at break-even:** ${inr(M.bepS)} × ${pct(r.share)} = **${inr(r.bepS)}**, i.e. ${nf(r.bepU)} units at ${inr(r.price)}.`, view: [t2(i + 1, false)] }));
    frames.push({ caption: `**Check.** At the break-even mix the products' contributions add up to ${inr(M.check)}, exactly the fixed cost: no profit, no loss. The BEP holds only while the mix stays as given; a richer mix (more of the high P/V products) lowers it.`, view: [t2(R.length, true)] });
    if (E > 0) {
      const sc = scaleOf(Math.max(M.expS, fixed)), K = sc.k;
      const order = R.slice().sort((a, b) => b.pv - a.pv);
      let cs = 0, cp = -fixed;
      const pts = [[0, -fixed / K]], marks = [];
      order.forEach(r => { cs += r.expS; cp += r.expU * r.c; pts.push([r4(cs / K), r4(cp / K)]); marks.push({ x: r4(cs / K), y: r4(cp / K), label: r.name, pos: 'above' }); });
      const yLo = Math.min(-fixed, ...pts.map(p => p[1] * K)) * 1.12, yHi = Math.max(fixed * 0.25, ...pts.map(p => p[1] * K)) * 1.15;
      const XA = axisOf(0, M.expS / K * 1.05, 5), YA = axisOf(yLo / K, yHi / K, 6);
      const plot = { type: 'plot', title: 'Profit graph of the mix (products in descending P/V ratio)', w: 640, h: 330, x: [0, XA.hi], y: [YA.lo, YA.hi], xticks: XA.ticks, yticks: YA.ticks,
        xlabel: `cumulative sales (${sc.u})`, ylabel: `profit / loss (${sc.u})`, legend: 'bottom-right', clip: true,
        series: [{ label: 'product by product', pts, color: 'a', dots: true }, { label: 'whole mix', pts: [[0, -fixed / K], [r4(M.expS / K), r4(M.profit / K)]], color: 'd', dash: true }],
        points: marks.concat([{ x: r4(M.bepS / K), y: 0, label: `BEP ${nf(M.bepS / K)}`, pos: 'below', color: 'd' }]) };
      frames.push({ caption: `**At the expected sales** of ${units ? `${nf(M.expU)} units (${inr(M.expS)})` : inr(M.expS)}: contribution ${inr(M.contribution)} − fixed ${inr(fixed)} = **${M.profit >= 0 ? 'profit' : 'loss'} ${inr(Math.abs(M.profit))}**; margin of safety ${inr(M.mosS)} (${pct(M.mosPct)}). The solid line adds the products one by one, best P/V first; the dashed line is the mix as a whole, crossing zero at the composite BEP.`, view: [plot] });
    }
    const stats = units
      ? [{ label: 'Composite contribution / unit', value: inr(r4(M.cu)), hint: 'Σ contribution × share of units' }, { label: 'Composite BEP (units)', value: nf(M.bepU), hint: 'fixed cost ÷ composite contribution' }]
      : [{ label: 'Composite P/V ratio', value: pct(M.pv), hint: 'Σ P/V ratio × share of sales value' }, { label: 'Break-even sales', value: inr(M.bepS), hint: 'fixed cost ÷ composite P/V ratio' }];
    if (units && M.batch && M.batch.length > 1) stats.push({ label: 'Break-even batches', value: nf(M.bepB), hint: 'fixed cost ÷ contribution per batch' });
    stats.push(units ? { label: 'Break-even sales', value: inr(M.bepS), hint: 'composite BEP × composite price' } : { label: 'Composite BEP (units)', value: nf(M.bepU), hint: 'Σ BEP sales ÷ price' });
    if (E > 0) stats.push({ label: M.profit >= 0 ? 'Profit' : 'Loss', value: inr(Math.abs(M.profit)), hint: 'contribution − fixed cost', tone: M.profit < 0 ? 'bad' : '' }, { label: 'Margin of safety', value: pct(M.mosPct), hint: '(sales − break-even sales) ÷ sales' });
    const rows = R.map(r => [r.name, minus(inr(r.c)), minus(pct(r.pv)), pct(r.share), nf(r.bepU), inr(r.bepS)].concat(E > 0 ? [nf(r.expU), inr(r.expS)] : []));
    rows.push({ cls: 'avgrow', cells: ['Mix', units ? inr(r4(M.cu)) : '', pct(M.pv), '100%', nf(M.bepU), inr(M.bepS)].concat(E > 0 ? [nf(M.expU), inr(M.expS)] : []) });
    return {
      frames, stats, sim: M,
      table: { head: ['Product', 'Contribution / unit', 'P/V ratio', units ? 'Share of units' : 'Share of sales', 'BEP units', 'BEP sales'].concat(E > 0 ? ['Expected units', 'Expected sales'] : []), rows },
      note: `**Conventions.** The sales mix stays constant as volume changes (ICAI's CVP assumption 5). ${units ? 'A mix in units weights each product\'s contribution per unit by its share of units sold.' : 'A mix in sales value weights each product\'s P/V ratio by its share of sales value.'} Common fixed costs are shared by the whole mix. Units are shown to two decimals.`
    };
  }

  /* ================================================================== mode: marginal vs absorption */
  function readPeriods(rows) {
    return (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'Period ' + (i + 1), prod: num(r[1]), sold: num(r[2]) }));
  }
  function computeAbsorb(v) {
    const o = { price: num(v.aprice), vcp: num(v.vcp), vcs: num(v.vcs) || 0, fop: num(v.fop), normal: num(v.normal), basis: v.basisA, fos: num(v.fos) || 0, open: num(v.open) || 0, periods: readPeriods(v.absPeriods) };
    const A = absorb(o), P = A.periods, frames = [];
    const al = ['left', 'right', 'right'];
    const stmt = (title, lines, n, cells) => ({ type: 'table', title, head: ['Particulars', '₹', '₹'], rows: lines.slice(0, n).map(l => l.map(minus)), cells: cells || {}, align: al });
    const hlRow = (n, tone) => { const c = {}; for (let k = 0; k < 3; k++) c[(n - 1) + ',' + k] = tone || 'hl'; return c; };
    P.forEach((p, i) => {
      const rate = p.rate, a = p.A, m = p.M, rateTxt = A.basis === 'normal' ? `${inr(rate)} a unit (${inr(o.fop)} ÷ ${nf(o.normal)} units of normal capacity)` : `${inr(rate)} a unit (${inr(o.fop)} ÷ ${nf(p.prod)} units actually produced)`;
      frames.push({ caption: `**${p.name}: stock.** Opening ${nf(p.openU)} + produced ${nf(p.prod)} − sold ${nf(p.sold)} = closing **${nf(p.closeU)}** units. ${p.closeU > p.openU ? 'Stock rises, so absorption costing will carry some of this period\'s fixed overhead forward.' : p.closeU < p.openU ? 'Stock falls, so absorption costing releases fixed overhead brought in from earlier periods.' : 'Stock is unchanged.'}`,
        view: [{ type: 'table', title: `${p.name}: units`, head: ['Opening stock', '+ Produced', '− Sold', '= Closing stock'], rows: [[nf(p.openU), nf(p.prod), nf(p.sold), nf(p.closeU)]], align: ['right', 'right', 'right', 'right'] }] });
      const AL = [
        ['Sales', '', inr(a.sales)],
        ['Variable production cost', inr(a.varProd), ''],
        ['Fixed production overhead absorbed', inr(a.fixAbs), ''],
        ['Cost of production', '', inr(a.cop)],
        ['Add: opening stock', '', inr(a.openV)],
        ['Less: closing stock', '', '(' + inr(a.closeV) + ')'],
        ['Cost of goods sold', '', inr(a.cogs)],
        [p.under >= 0 ? 'Add: under-absorbed fixed overhead' : 'Less: over-absorbed fixed overhead', '', Math.abs(p.under) < 1e-9 ? '—' : p.under > 0 ? inr(p.under) : '(' + inr(-p.under) + ')'],
        ['Variable selling cost', inr(a.sellVar), ''],
        ['Fixed selling and administration', inr(a.sellFix), inr(a.sellVar + a.sellFix)],
        ['Cost of sales', '', inr(a.cos)],
        ['**Profit (absorption costing)**', '', `**${inr(a.profit)}**`]];
      const tA = `${p.name}: absorption costing`;
      frames.push({ caption: `**Absorption costing, ${p.name}.** Each unit produced carries variable cost ${inr(o.vcp)} plus fixed overhead at ${rateTxt}: cost of production ${nf(p.prod)} × ${inr(o.vcp + rate)} = ${inr(a.cop)}.`, view: [stmt(tA, AL, 4, hlRow(4))] });
      frames.push({ caption: `**Stocks at full cost.** Opening stock ${inr(a.openV)} comes in and closing stock of ${nf(p.closeU)} units goes out at ${inr(a.closeV)} (fixed overhead in it: ${inr(p.closeFix)}), leaving cost of goods sold ${inr(a.cogs)}.`, view: [stmt(tA, AL, 7, hlRow(7))] });
      frames.push({ caption: Math.abs(p.under) < 1e-9 ? `**No under- or over-absorption:** the overhead absorbed (${inr(a.fixAbs)}) equals the overhead incurred.` : p.under > 0
        ? `**Under-absorption.** Only ${nf(p.prod)} × ${inr(rate)} = ${inr(a.fixAbs)} was absorbed against ${inr(o.fop)} incurred: the shortfall of ${inr(p.under)} is charged to this period.`
        : `**Over-absorption.** ${nf(p.prod)} × ${inr(rate)} = ${inr(a.fixAbs)} was absorbed against ${inr(o.fop)} incurred: the excess of ${inr(-p.under)} is credited back.`, view: [stmt(tA, AL, 8, hlRow(8))] });
      frames.push({ caption: `**Selling costs and profit.** Selling and administration costs are period costs under both methods. Absorption costing profit: **${inr(a.profit)}**.`, view: [stmt(tA, AL, 12, hlRow(12, a.profit >= 0 ? 'ok' : 'bad'))] });
      const ML = [
        ['Sales', '', inr(m.sales)],
        ['Variable production cost', inr(m.varProd), ''],
        ['Add: opening stock (at variable cost)', inr(m.openV), ''],
        ['Less: closing stock (at variable cost)', '(' + inr(m.closeV) + ')', ''],
        ['Variable cost of goods sold', '', inr(m.vcogs)],
        ['Add: variable selling cost', '', inr(m.sellVar)],
        ['Contribution', '', inr(m.contribution)],
        ['Less: fixed production overhead (incurred)', inr(m.fixProd), ''],
        ['Less: fixed selling and administration', inr(m.fixSell), '(' + inr(m.fixProd + m.fixSell) + ')'],
        ['**Profit (marginal costing)**', '', `**${inr(m.profit)}**`]];
      const tM = `${p.name}: marginal costing`;
      frames.push({ caption: `**Marginal costing, ${p.name}.** Stocks carry only variable production cost (${inr(o.vcp)} a unit): variable cost of goods sold ${inr(m.vcogs)}.`, view: [stmt(tM, ML, 5, hlRow(5))] });
      frames.push({ caption: `**Contribution.** Sales ${inr(m.sales)} − variable cost of goods sold − variable selling cost = contribution ${inr(m.contribution)}.`, view: [stmt(tM, ML, 7, hlRow(7))] });
      frames.push({ caption: `**All fixed costs are period costs.** The whole ${inr(o.fop)} of fixed production overhead is charged this period, whatever was produced. Marginal costing profit: **${inr(m.profit)}**.`, view: [stmt(tM, ML, 10, hlRow(10, m.profit >= 0 ? 'ok' : 'bad'))] });
      const rec = [['Profit as per absorption costing', inr(a.profit)], ['Add: fixed overhead in opening stock', inr(p.openFix)], ['Less: fixed overhead in closing stock', '(' + inr(p.closeFix) + ')'], ['**Profit as per marginal costing**', `**${inr(m.profit)}**`]];
      const why = Math.abs(p.diff) < 0.005 ? 'The two profits agree: the fixed overhead in closing stock equals that in opening stock.'
        : p.diff > 0 ? `Absorption profit is higher by ${inr(p.diff)}: production exceeded sales, so ${inr(p.closeFix - p.openFix)} more fixed overhead went into stock than came out of it.`
          : `Marginal profit is higher by ${inr(-p.diff)}: sales exceeded production, so absorption costing charged ${inr(p.openFix - p.closeFix)} of fixed overhead brought forward in opening stock.`;
      frames.push({ caption: `**Reconciliation, ${p.name}.** ${why}`, view: [{ type: 'table', title: `${p.name}: reconciliation`, head: ['Particulars', '₹'], rows: rec.map(r => r.map(minus)), cells: { '3,0': 'ok', '3,1': 'ok' }, align: ['left', 'right'] }] });
    });
    /* the summary: profits side by side, period by period */
    const vals = P.flatMap(p => [p.A.profit, p.M.profit]);
    const sc = scaleOf(Math.max(...vals.map(Math.abs), 1)), K = sc.k;
    const YA = axisOf(Math.min(0, ...vals) / K * 1.15, Math.max(0, ...vals) / K * 1.15, 5);
    const bars = { type: 'plot', title: 'Profit under each method', w: 640, h: 300, x: [0.4, P.length + 0.6], y: [YA.lo, YA.hi], xticks: P.map((p, i) => [i + 1, p.name]), yticks: YA.ticks, ylabel: `profit (${sc.u})`, legend: 'top-left',
      series: [{ label: 'absorption', bars: true, bw: 0.34, color: 'a', pts: P.map((p, i) => [i + 1 - 0.18, r4(p.A.profit / K)]) }, { label: 'marginal', bars: true, bw: 0.34, color: 'd', pts: P.map((p, i) => [i + 1 + 0.18, r4(p.M.profit / K)]) }] };
    const sumRows = P.map(p => [p.name, nf(p.prod), nf(p.sold), nf(p.closeU), inr(p.A.profit), inr(p.M.profit), (p.diff >= 0 ? '' : '−') + inr(Math.abs(p.diff)), inr(p.closeFix - p.openFix)].map(minus));
    if (P.length > 1) sumRows.push(['**Total**', nf(P.reduce((x, p) => x + p.prod, 0)), nf(P.reduce((x, p) => x + p.sold, 0)), nf(P[P.length - 1].closeU), `**${inr(A.totA)}**`, `**${inr(A.totM)}**`, inr(A.totA - A.totM), inr(P[P.length - 1].closeFix - P[0].openFix)].map(minus));
    const sumT = { type: 'table', title: 'Summary', head: ['Period', 'Produced', 'Sold', 'Closing stock', 'Absorption profit', 'Marginal profit', 'Difference', 'Δ fixed OH in stock'], rows: sumRows, align: ['left', 'right', 'right', 'right', 'right', 'right', 'right', 'right'] };
    const endSame = Math.abs(P[P.length - 1].closeFix - P[0].openFix) < 0.005;
    frames.push({ caption: `**Summary.** In every period, absorption profit − marginal profit = fixed overhead in closing stock − fixed overhead in opening stock.${P.length > 1 ? endSame ? ' Stock ends where it began, so over all the periods the two methods report the same total profit.' : ` Over all the periods the totals differ by ${inr(Math.abs(A.totA - A.totM))}, the change in fixed overhead held in stock.` : ''}`, view: [bars, sumT] });
    const p0 = P[0];
    const stats = [
      { label: `Absorption profit${P.length > 1 ? ' (total)' : ''}`, value: inr(A.totA), hint: 'fixed production overhead absorbed into stock' },
      { label: `Marginal profit${P.length > 1 ? ' (total)' : ''}`, value: inr(A.totM), hint: 'all fixed costs charged in the period' },
      { label: 'Difference', value: minus((A.totA - A.totM >= 0 ? '' : '-') + inr(Math.abs(A.totA - A.totM))), hint: 'fixed overhead in closing stock − in opening stock' },
      { label: A.basis === 'normal' ? 'Absorption rate' : `Absorption rate (${p0.name})`, value: inr(p0.rate), hint: A.basis === 'normal' ? 'fixed production overhead ÷ normal capacity' : 'fixed production overhead ÷ actual production' }
    ];
    if (A.basis === 'normal') { const u = P.reduce((x, p) => x + p.under, 0); stats.push({ label: u >= 0 ? 'Under-absorbed (total)' : 'Over-absorbed (total)', value: inr(Math.abs(u)), hint: 'overhead incurred − overhead absorbed' }); }
    return {
      frames, stats, sim: A,
      table: { head: ['Period', 'Opening stock', 'Produced', 'Sold', 'Closing stock', 'Absorption profit', 'Marginal profit', 'Difference'], rows: P.map(p => [p.name, nf(p.openU), nf(p.prod), nf(p.sold), nf(p.closeU), inr(p.A.profit), inr(p.M.profit), (p.diff < 0 ? '−' : '') + inr(Math.abs(p.diff))].map(minus)) },
      note: `**Conventions.** Absorption costing values stock at variable production cost plus fixed production overhead at ${A.basis === 'normal' ? 'a predetermined rate on normal capacity; the difference between overhead incurred and absorbed is adjusted as under- or over-absorption in the same period' : 'the period\'s actual rate (overhead ÷ units produced), so nothing is under- or over-absorbed'}. Marginal costing values stock at variable production cost only and charges all fixed costs to the period. Stock leaves first in, first out; opening stock at the start carries the first period's unit costs. Actual fixed costs equal the budget, and selling and administration costs are always period costs.`
    };
  }

  /* ================================================================== compute + definition */
  let lastMode = 'bep';
  function compute(v) {
    const mode = v.mode === 'multi' ? 'multi' : v.mode === 'absorb' ? 'absorb' : 'bep';
    const r = mode === 'multi' ? computeMulti(v) : mode === 'absorb' ? computeAbsorb(v) : computeBep(v);
    lastMode = mode;
    return r;
  }

  const MODES = [['bep', 'Break-even (one product)'], ['multi', 'Sales mix (several products)'], ['absorb', 'Marginal vs absorption profit']];
  const isM = m => v => (v.mode || 'bep') === m;
  const WHAT = (id, label, short) => ({ id, type: 'range', label: `${label} (0 = no change)`, short, value: 0, min: -50, max: 50, step: 0.25, show: isM('bep') });
  const controls = [
    { id: 'mode', type: 'select', label: 'What to explore', value: 'bep', options: MODES },
    { id: 'chart', type: 'seg', label: 'Chart', value: 'be', options: [['be', 'Break-even'], ['contrib', 'Contribution'], ['pv', 'P/V']], show: isM('bep') },
    { id: 'price', type: 'number', label: 'Selling price per unit (₹)', short: 'Price', value: 100, min: 0, max: 1e9, step: 'any', show: isM('bep') },
    { id: 'vc', type: 'number', label: 'Variable cost per unit (₹)', short: 'Variable cost', value: 60, min: 0, max: 1e9, step: 'any', show: isM('bep') },
    { id: 'fixed', type: 'number', label: 'Fixed cost for the period (₹)', short: 'Fixed cost', value: 200000, min: 0, max: 1e13, step: 'any', show: isM('bep') },
    { id: 'dep', type: 'number', label: 'of which non-cash, e.g. depreciation (₹; 0 = none)', short: 'Non-cash fixed cost', value: 0, min: 0, max: 1e13, step: 'any', show: isM('bep') },
    { id: 'units', type: 'number', label: 'Budgeted sales in units (0 = none)', short: 'Budgeted sales', value: 8000, min: 0, max: 1e10, step: 'any', show: isM('bep') },
    { id: 'uname', type: 'text', label: 'One unit is called (plural)', short: 'Unit', value: 'boxes', placeholder: 'units', show: isM('bep') },
    { id: 'target', type: 'number', label: 'Target profit (0 = none)', short: 'Target profit', value: 100000, min: 0, max: 1e13, step: 'any', reshow: true, show: isM('bep'),
      help: 'An amount in ₹, or a percentage of sales if you choose that below.' },
    { id: 'tkind', type: 'select', label: 'The target is', short: 'Target is', value: 'amount', options: [['amount', 'an amount in ₹'], ['pct', 'a % of sales']], show: v => isM('bep')(v) && num(v.target) > 0 },
    { id: 'tax', type: 'number', label: 'Tax on profit, % (0 = target is before tax)', short: 'Tax', value: 0, min: 0, max: 99, step: 'any', show: v => isM('bep')(v) && num(v.target) > 0 },
    WHAT('dPrice', 'What if the price changes by %', 'Price change %'),
    WHAT('dVc', 'What if the variable cost changes by %', 'Variable cost change %'),
    WHAT('dFixed', 'What if the fixed cost changes by %', 'Fixed cost change %'),
    WHAT('dUnits', 'What if the volume changes by %', 'Volume change %'),
    { id: 'mfixed', type: 'number', label: 'Common fixed cost for the period (₹)', short: 'Fixed cost', value: 430000, min: 0, max: 1e13, step: 'any', show: isM('multi') },
    { id: 'basis', type: 'seg', label: 'The sales mix is given in', value: 'units', options: [['units', 'units'], ['value', 'sales value']], show: isM('multi') },
    { id: 'mixProducts', type: 'table', label: 'Products (mix = units in the mix, or % of sales value)', short: 'Products', max: 6, show: isM('multi'),
      rows: [['Premix', 100, 60, 2], ['Chai', 30, 12, 5], ['Samosa', 50, 35, 3]],
      cols: [{ id: 'name', label: 'Name', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'price', label: 'Price', type: 'number', min: 0, def: 100 }, { id: 'vc', label: 'VC', type: 'number', min: 0, def: 60 }, { id: 'mix', label: 'Mix', type: 'number', min: 0, def: 1 }] },
    { id: 'mixUnits', type: 'number', label: 'Expected total sales in units (0 = none)', short: 'Expected units', value: 30000, min: 0, max: 1e10, step: 'any', show: v => isM('multi')(v) && v.basis !== 'value' },
    { id: 'mixValue', type: 'number', label: 'Expected total sales in ₹ (0 = none)', short: 'Expected sales', value: 0, min: 0, max: 1e13, step: 'any', show: v => isM('multi')(v) && v.basis === 'value' },
    { id: 'aprice', type: 'number', label: 'Selling price per unit (₹)', short: 'Price', value: 50, min: 0, max: 1e9, step: 'any', show: isM('absorb') },
    { id: 'vcp', type: 'number', label: 'Variable production cost per unit (₹)', short: 'Variable production cost', value: 20, min: 0, max: 1e9, step: 'any', show: isM('absorb') },
    { id: 'vcs', type: 'number', label: 'Variable selling cost per unit sold (₹)', short: 'Variable selling cost', value: 5, min: 0, max: 1e9, step: 'any', show: isM('absorb') },
    { id: 'fop', type: 'number', label: 'Fixed production overhead per period (₹)', short: 'Fixed production overhead', value: 120000, min: 0, max: 1e13, step: 'any', show: isM('absorb') },
    { id: 'basisA', type: 'seg', label: 'Absorption rate based on', value: 'normal', options: [['normal', 'normal capacity'], ['actual', 'actual output']], show: isM('absorb') },
    { id: 'normal', type: 'number', label: 'Normal capacity per period (units)', short: 'Normal capacity', value: 10000, min: 0, max: 1e10, step: 'any', show: v => isM('absorb')(v) && v.basisA !== 'actual' },
    { id: 'fos', type: 'number', label: 'Fixed selling and administration per period (₹)', short: 'Fixed selling and admin', value: 60000, min: 0, max: 1e13, step: 'any', show: isM('absorb') },
    { id: 'open', type: 'number', label: 'Stock at the start of the first period, units (0 = none)', short: 'Opening stock', value: 0, min: 0, max: 1e10, step: 'any', show: isM('absorb') },
    { id: 'absPeriods', type: 'table', label: 'Periods (units produced and sold)', short: 'Periods', max: 6, show: isM('absorb'),
      rows: [['Q1', 12000, 9000], ['Q2', 9000, 11000], ['Q3', 10000, 10000], ['Q4', 8000, 9000]],
      cols: [{ id: 'name', label: 'Period', type: 'text', auto: n => 'P' + (n + 1) }, { id: 'prod', label: 'Produced', type: 'number', min: 0, def: 1000 }, { id: 'sold', label: 'Sold', type: 'number', min: 0, def: 1000 }] }
  ];

  const presets = [
    { label: 'Lesson example · Tapri chai premix: ₹100 a box, ₹60 variable, ₹2,00,000 fixed, 8,000 boxes', values: { mode: 'bep', price: 100, vc: 60, fixed: 200000, units: 8000, uname: 'boxes', target: 100000 } },
    { label: 'Study Material Example 3 · ABC Ltd: ₹500 price, ₹300 variable, ₹2,00,000 fixed a month, 1,700 units forecast', values: { mode: 'bep', price: 500, vc: 300, fixed: 200000, units: 1700, uname: 'units', target: 0 } },
    { label: 'Study Material Illustration 1 · MNP Ltd: break-even and cash break-even (depreciation ₹15,00,000)', values: { mode: 'bep', price: 37.5, vc: 17.5, fixed: 3500000, dep: 1500000, units: 275000, uname: 'units', target: 0 } },
    { label: 'PYQ Sep 2025 Case Scenario II · JMS Ltd mineral water: break-even sales, and profit if sales fall 10%', values: { mode: 'bep', price: 75, vc: 57, fixed: 468000, units: 36000, uname: 'units', target: 0, dUnits: -10 } },
    { label: 'RTP May 2024 Q11 · A Ltd product R: break-even sales, margin of safety, profit at 10% lower sales', values: { mode: 'bep', price: 185, vc: 86.2, fixed: 369000, units: 5000, uname: 'units', target: 0, dUnits: -10 } },
    { label: 'RTP May 2025 Q18 · Gourmet chocolates: cartons for a 20% after-tax return, then the price-cut plan', values: { mode: 'bep', price: 24, vc: 11, fixed: 800000, units: 70000, uname: 'cartons', target: 150000, tkind: 'amount', tax: 40, dPrice: -6.25, dFixed: 18.75, dUnits: 20 } },
    { label: 'Study Material Illustration 2 · ₹30 price, ₹15 variable, ₹1,50,000 fixed: sales for a ₹20,000 profit (P/V chart)', values: { mode: 'bep', chart: 'pv', price: 30, vc: 15, fixed: 150000, units: 0, uname: 'units', target: 20000 } },
    { label: 'Lesson example · Tapri mix of premix, kulhad chai and samosa (2 : 5 : 3 by units)', values: { mode: 'multi', basis: 'units', mfixed: 430000, mixProducts: [['Premix', 100, 60, 2], ['Kulhad chai', 30, 12, 5], ['Samosa', 50, 35, 3]], mixUnits: 30000 } },
    { label: 'RTP May 2025 Q7 · PR Ltd: ball pens and gel pens, composite break-even batches', values: { mode: 'multi', basis: 'units', mfixed: 336000, mixProducts: [['Ball pen', 150, 90, 6000], ['Gel pen', 100, 60, 3600]], mixUnits: 9600 } },
    { label: 'RTP Sep 2024 Q17(ii) · RS Ltd: products X and Y sold 5 : 3, break-even units', values: { mode: 'multi', basis: 'units', mfixed: 2800000, mixProducts: [['X', 100, 60, 5], ['Y', 150, 100, 3]], mixUnits: 0 } },
    { label: 'RTP Sep 2026 Q15 · XYX Ltd existing mix: composite P/V ratio and break-even sales', values: { mode: 'multi', basis: 'value', mfixed: 180000, mixProducts: [['A', 30, 15, 35], ['B', 40, 20, 35], ['C', 20, 12, 30]], mixValue: 600000 } },
    { label: 'RTP Sep 2026 Q15 · XYX Ltd proposed mix with product P in place of C', values: { mode: 'multi', basis: 'value', mfixed: 180000, mixProducts: [['A', 30, 15, 50], ['B', 40, 20, 25], ['P', 30, 15, 25]], mixValue: 640000 } },
    { label: 'Study Material Problem 20 · Prisha Ltd existing mix (40 : 35 : 25 of sales)', values: { mode: 'multi', basis: 'value', mfixed: 1800000, mixProducts: [['A', 300, 150, 40], ['B', 400, 200, 35], ['C', 200, 120, 25]], mixValue: 6000000 } },
    { label: 'Lesson example · Tapri samosa factory, four quarters (stock up, then down)', values: { mode: 'absorb', aprice: 50, vcp: 20, vcs: 5, fop: 120000, basisA: 'normal', normal: 10000, fos: 60000, open: 0, absPeriods: [['Q1', 12000, 9000], ['Q2', 9000, 11000], ['Q3', 10000, 10000], ['Q4', 8000, 9000]] } },
    { label: 'Study Material Illustration 14 · Wonder Ltd ZEST: first quarter, 220 made and 160 sold', values: { mode: 'absorb', aprice: 2000, vcp: 800, vcs: 400, fop: 40000, basisA: 'normal', normal: 200, fos: 60000, open: 0, absPeriods: [['Quarter 1', 220, 160]] } },
    { label: 'MTP May 2025 Series 1 Q5(a) · RN Ltd: first quarter, 1,210 made and 880 sold', values: { mode: 'absorb', aprice: 2000, vcp: 800, vcs: 400, fop: 220000, basisA: 'normal', normal: 1100, fos: 330000, open: 0, absPeriods: [['Quarter 1', 1210, 880]] } },
    { label: 'MTP May 2024 Series 1 Q4(a) · AB Ltd: April, May and June statements and reconciliation', values: { mode: 'absorb', aprice: 2050, vcp: 1380, vcs: 0, fop: 500000, basisA: 'normal', normal: 5000, fos: 95000, open: 0, absPeriods: [['April', 4600, 4200], ['May', 4400, 4500], ['June', 5500, 5200]] } },
    { label: 'Tapri premix with opening stock, rate on actual production', values: { mode: 'absorb', aprice: 100, vcp: 45, vcs: 5, fop: 300000, basisA: 'actual', normal: 10000, fos: 100000, open: 2000, absPeriods: [['Year 1', 12000, 10000], ['Year 2', 10000, 13000]] } }
  ];

  /* ---------------------------------------------------------------- Test yourself */
  const pickOf = (r, xs) => xs[Math.floor(r() * xs.length) % xs.length];
  const int = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const NAMES = ['Tapri', 'Kulhad', 'Chaiwala', 'Masala', 'Elaichi', 'Adrak'];
  const challenge = {
    title: 'Solve a CVP problem',
    gen(r) {
      if (lastMode === 'multi') {
        const basis = r() < 0.5 ? 'units' : 'value', n = int(r, 2, 3);
        const products = Array.from({ length: n }, (_, i) => { const vc = 10 * int(r, 2, 12), c = 5 * int(r, 2, 10); return [['A', 'B', 'C'][i], vc + c, vc, basis === 'units' ? int(r, 1, 5) : 10 * int(r, 1, 6)]; });
        const M = mix(readProducts(products), basis, 1, 0);
        const fixed = basis === 'units' ? Math.round(M.cu * 1000 * int(r, 2, 40)) : 1000 * int(r, 50, 900);
        return { mode: 'multi', basis, mixProducts: products, mfixed: fixed, mixUnits: 0, mixValue: 0, ask: basis === 'units' ? 'bepU' : 'bepS' };
      }
      if (lastMode === 'absorb') {
        const vcp = 5 * int(r, 4, 20), rate = int(r, 2, 12), normal = 1000 * int(r, 5, 20), prod = normal + 100 * int(r, -20, 20), sold = Math.max(100, prod + 100 * int(r, -25, 15));
        return { mode: 'absorb', aprice: vcp + rate + 5 * int(r, 4, 20), vcp, vcs: int(r, 0, 5), fop: rate * normal, basisA: 'normal', normal, fos: 1000 * int(r, 20, 90), open: 0, absPeriods: [['Q1', prod, Math.min(sold, prod)]], ask: r() < 0.5 ? 'diff' : 'absP' };
      }
      const vc = 5 * int(r, 4, 40), c = 5 * int(r, 1, 16), bep = 100 * int(r, 10, 300), fixed = c * bep;
      const units = bep + 100 * int(r, -5, 200), ask = pickOf(r, ['bepU', 'bepS', 'mos', 'tU']);
      const target = ask === 'tU' ? c * 100 * int(r, 5, 200) : 0;
      return { mode: 'bep', chart: 'be', price: vc + c, vc, fixed, dep: 0, units: ask === 'mos' ? Math.max(units, bep + 100) : units, uname: 'units', target, tkind: 'amount', tax: 0, dPrice: 0, dVc: 0, dFixed: 0, dUnits: 0, ask, nm: pickOf(r, NAMES) };
    },
    prompt(v) {
      if (v.mode === 'multi') {
        const ps = readProducts(v.mixProducts).map(p => `${p.name} (price ₹${nf(p.price)}, variable cost ₹${nf(p.vc)}, mix ${nf(p.w)}${v.basis === 'value' ? '%' : ''})`).join(', ');
        return `Products ${ps}; the mix is in ${v.basis === 'value' ? '% of sales value' : 'units'}. Common fixed cost ₹${nf(v.mfixed)}. ${v.ask === 'bepU' ? 'How many units **in total** must be sold to break even? (to 2 decimals)' : 'What are the **break-even sales in ₹**? (nearest rupee)'}`;
      }
      if (v.mode === 'absorb') {
        const p = readPeriods(v.absPeriods)[0];
        return `Price ₹${nf(v.aprice)}, variable production cost ₹${nf(v.vcp)} and variable selling cost ₹${nf(v.vcs)} a unit; fixed production overhead ₹${nf(v.fop)} a quarter, absorbed on a normal capacity of ${nf(v.normal)} units; fixed selling and administration ₹${nf(v.fos)}. No opening stock; ${nf(p.prod)} units produced and ${nf(p.sold)} sold. ${v.ask === 'diff' ? 'By how much does the **absorption costing profit exceed the marginal costing profit**? (₹)' : 'What is the **profit under absorption costing**? (₹; negative for a loss)'}`;
      }
      const head = `A product sells at ₹${nf(v.price)} with a variable cost of ₹${nf(v.vc)} a unit; fixed costs are ₹${nf(v.fixed)}.`;
      return head + ({ bepU: ' What is the **break-even point in units**?', bepS: ' What are the **break-even sales in ₹**?', mos: ` Budgeted sales are ${nf(v.units)} units. What is the **margin of safety as a % of sales**? (2 decimals)`, tU: ` How many units must be sold to earn a **profit of ₹${nf(v.target)}**?` })[v.ask];
    },
    solve(res, v) {
      if (v.mode === 'multi') return v.ask === 'bepU' ? r2(res.sim.bepU) : Math.round(res.sim.bepS);
      if (v.mode === 'absorb') return v.ask === 'diff' ? Math.round(res.sim.totA - res.sim.totM) : Math.round(res.sim.totA);
      const s = res.sim.base;
      return { bepU: r2(s.bepU), bepS: Math.round(s.bepS), mos: r2(s.mosPct * 100), tU: r2(s.tU) }[v.ask];
    },
    tol: 0.011,
    kind: 'num',
    signed: v => v.mode === 'absorb',
    unit: '',
    view(res, v) {
      if (v.mode === 'multi') return [{ type: 'table', title: 'Given', head: ['Product', 'Price', 'Variable cost', v.basis === 'value' ? 'Mix (% of sales)' : 'Mix (units)'], rows: readProducts(v.mixProducts).map(p => [p.name, inr(p.price), inr(p.vc), nf(p.w)]), align: ['left', 'right', 'right', 'right'] }];
      if (v.mode === 'absorb') return [res.frames[0].view[0]];
      return null;
    },
    explain(res, v) {
      if (v.mode === 'multi') { const M = res.sim; return M.basis === 'units' ? `Composite contribution = ${M.rows.map(x => `${inr(x.c)} × ${pct(x.share)}`).join(' + ')} = ${inr(r4(M.cu))}; BEP = ${inr(v.mfixed)} ÷ ${inr(r4(M.cu))} = **${nf(M.bepU)} units**.` : `Composite P/V = ${M.rows.map(x => `${pct(x.pv)} × ${pct(x.share)}`).join(' + ')} = ${pct(M.pv)}; break-even sales = ${inr(v.mfixed)} ÷ ${pct(M.pv)} = **${inr(M.bepS)}**.`; }
      if (v.mode === 'absorb') { const p = res.sim.periods[0]; return `Closing stock ${nf(p.closeU)} units carry ${inr(p.rate)} of fixed overhead each = ${inr(p.closeFix)}, so absorption profit (${inr(p.A.profit)}) exceeds marginal profit (${inr(p.M.profit)}) by **${inr(p.diff)}**.`; }
      const s = res.sim.base;
      return ({ bepU: `Contribution = ${inr(s.price)} − ${inr(s.vc)} = ${inr(s.c)}; BEP = ${inr(s.fixed)} ÷ ${inr(s.c)} = **${nf(s.bepU)} units**.`, bepS: `P/V ratio = ${inr(s.c)} ÷ ${inr(s.price)} = ${pct(s.pv)}; break-even sales = ${inr(s.fixed)} ÷ ${pct(s.pv)} = **${inr(s.bepS)}**.`,
        mos: `BEP = ${inr(s.fixed)} ÷ ${inr(s.c)} = ${nf(s.bepU)} units; MoS = (${nf(s.units)} − ${nf(s.bepU)}) ÷ ${nf(s.units)} = **${pct(s.mosPct)}**.`, tU: `Units = (fixed cost + target) ÷ contribution = (${inr(s.fixed)} + ${inr(s.target)}) ÷ ${inr(s.c)} = **${nf(s.tU)}**.` })[v.ask];
    }
  };

  const def = {
    id: 'cvp', title: 'CVP Lab',
    blurb: 'Watch the break-even chart move as price, variable cost and fixed cost change; then sales mixes and absorption profits.',
    controls, presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { single, mix, absorb, compute, def, axisOf, scaleOf };
  g.__lab_def_cvp = def;
})(typeof window !== 'undefined' ? window : globalThis);
