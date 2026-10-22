/* PassBook — Cost of Capital Lab (fm.coc; ICAI Study Material, Paper 6A, Chapter 4 "Cost of Capital", §5–10).
   Pure part: the component costs (kdIrred, kdApprox, kpApprox, bondNPV, ytm, keGrowth, keCAPM), wacc, mcc and compute.
   UI part: the register() call at the bottom.   Node-testable: require('app/js/labs/wacc.js') -> {…helpers, compute, def}.

   Formulas as the Study Material prints them (rates as decimals inside, % in the controls):
     Kd irredeemable  I(1 − t) / NP                                 Kp irredeemable  PD / NP
     Kd redeemable    [I(1 − t) + (RV − NP)/n] / [(RV + NP)/2]      Kp redeemable    [PD + (RV − NP)/n] / [(RV + NP)/2]
                      or [I + (RV − NP)/n](1 − t) / [(RV + NP)/2] when the discount / premium is tax-deductible too
     YTM (present value method): NP = I(1 − t) × PVAF(r, n) + RV × PVIF(r, n), solved by two trial rates and interpolation
                      IRR = L + NPV_L / (NPV_L − NPV_H) × (H − L)
     Convertible      RV = the higher of the cash redemption value and the conversion value (shares × P0 × FVIF(g, n))
     Ke growth        D1 / P0 + g (Kr: market price; a new issue: D1 / (P0 − F) + g);  dividend price D / P0;  earnings price E / P0
     CAPM             Ke = Rf + β(Rm − Rf)
     WACC             Σ weight × after-tax cost, with book-value and market-value weights
     MCC              break point = the amount of a source available at a cost ÷ its proportion; MCC in each range of new funds
   Table factors: ICAI's present value tables give factors to 3 decimals (an annuity factor is rounded once, like the PVAF table:
   7.722 at 5% for 10 years); the 'factors' control also offers 4 decimals and exact. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const round = (x, d) => Math.round((x + Math.sign(x) * 1e-12) * 10 ** d) / 10 ** d;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  const rs = x => { const v = round(x, 2), whole = Math.abs(v - Math.round(v)) < 1e-9; return (v < 0 ? '−' : '') + '₹' + grp(Math.abs(v), whole ? 0 : 2); };
  const rsx = x => (x < 0 ? `(${rs(-x)})` : rs(x));            // ICAI's brackets for a negative amount
  const num = (x, d = 4) => { const v = round(x, d); return (v < 0 ? '−' : '') + Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: d }); };
  const pc = (x, d = 2) => num(x * 100, d) + '%';
  const pk = x => round(x * 100, 2).toFixed(2) + '%';            // a computed cost the way ICAI prints it: 8.30%, 12.00%
  const fx = (x, dp) => (dp === 'exact' ? num(x, 4) : x.toFixed(+dp));   // a factor as the table prints it: 0.621, 7.722
  const DPS = { 3: 3, 4: 4, exact: null };

  /* ================================================================== factors */
  const rnd = (x, dp) => (DPS[dp] == null ? x : round(x, DPS[dp]));
  const pvif = (r, t, dp) => rnd(1 / Math.pow(1 + r, t), dp);
  const pvaf = (r, n, dp) => rnd(r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r, dp);
  const fvif = (r, n, dp) => rnd(Math.pow(1 + r, n), dp);

  /* ================================================================== component costs (pure) */
  function kdIrred(I, t, NP) { if (!(NP > 0)) throw new Error('The net proceeds must be more than ₹0.'); return (I * (1 - t)) / NP; }
  /** the approximation formula; deductible = the discount / premium is also tax-deductible */
  function kdApprox(I, t, NP, RV, n, deductible) {
    if (!(NP > 0)) throw new Error('The net proceeds must be more than ₹0.');
    if (!(n > 0)) throw new Error('Enter the years to redemption (more than 0).');
    const amort = (RV - NP) / n, avg = (RV + NP) / 2;
    return deductible ? ((I + amort) * (1 - t)) / avg : (I * (1 - t) + amort) / avg;
  }
  function kpApprox(PD, NP, RV, n) { return kdApprox(PD, 0, NP, RV, n, false); }
  /** NPV of buying the bond at NP: −NP + cf × PVAF(r, n) + RV × PVIF(r, n), with the table factors */
  function bondNPV(NP, cf, RV, n, r, dp) {
    const A = pvaf(r, n, dp), V = pvif(r, n, dp), pvI = cf * A, pvR = RV * V;
    return { r, A, V, pvI, pvR, npv: pvI + pvR - NP };
  }
  /** the exact IRR of the bond flows (exact factors, bisection) */
  function exactIRR(NP, cf, RV, n) {
    const f = r => -NP + cf * (r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r) + RV * Math.pow(1 + r, -n);
    let lo = -0.99, hi = 10;
    if (f(lo) * f(hi) > 0) return null;
    for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; }
    return (lo + hi) / 2;
  }
  /** two trial rates (whole %, or the ones given) and ICAI's interpolation */
  function ytm(NP, cf, RV, n, dp, lo, hi) {
    let L = lo > 0 ? lo / 100 : null, H = hi > 0 ? hi / 100 : null, auto = !(L && H);
    if (auto) {
      const ex = exactIRR(NP, cf, RV, n);
      if (ex == null || ex <= 0) throw new Error('These cash flows have no positive yield: the net proceeds are more than the interest and redemption put together.');
      let a = Math.max(1, Math.floor(ex * 100));
      while (a > 1 && bondNPV(NP, cf, RV, n, a / 100, dp).npv < 0) a--;
      while (bondNPV(NP, cf, RV, n, (a + 1) / 100, dp).npv >= 0 && a < 99) a++;
      L = a / 100; H = (a + 1) / 100;
    }
    if (!(H > L)) throw new Error('The higher trial rate must be above the lower one.');
    const A = bondNPV(NP, cf, RV, n, L, dp), B = bondNPV(NP, cf, RV, n, H, dp);
    if (Math.abs(A.npv - B.npv) < 1e-12) throw new Error('The NPVs at the two trial rates are equal; pick two rates further apart.');
    const irr = L + (A.npv / (A.npv - B.npv)) * (H - L);
    return { L, H, A, B, irr, auto, brackets: A.npv >= 0 && B.npv <= 0, exact: exactIRR(NP, cf, RV, n) };
  }
  function keGrowth(D1, P, gr) { if (!(P > 0)) throw new Error('The price (net of flotation) must be more than ₹0.'); return D1 / P + gr; }
  function keCAPM(rf, beta, rm) { return rf + beta * (rm - rf); }
  /** WACC: rows [{name, value, cost}] -> {total, rows: [{…, w, wk}], wacc} */
  function wacc(rows) {
    const total = rows.reduce((s, r) => s + r.value, 0);
    if (!(total > 0)) throw new Error('Enter at least one source with a value above ₹0.');
    const out = rows.map(r => Object.assign({}, r, { w: r.value / total, wk: (r.value / total) * r.cost }));
    return { total, rows: out, wacc: out.reduce((s, r) => s + r.wk, 0) };
  }
  /** MCC: rows [{name, w (fraction), k1, limit (₹ of this source at k1, 0 = none), k2}] -> break points and the MCC in each range */
  function mcc(rows) {
    const W = rows.reduce((s, r) => s + r.w, 0);
    if (!(Math.abs(W - 1) < 1e-6)) throw new Error(`The proportions must add up to 100% (they add up to ${num(W * 100, 4)}%).`);
    const breaks = rows.map((r, i) => (r.limit > 0 && r.w > 0 ? { i, name: r.name, limit: r.limit, w: r.w, at: r.limit / r.w } : null)).filter(Boolean).sort((a, b) => a.at - b.at || a.i - b.i);
    const cuts = [0].concat(breaks.map(b => b.at)).filter((x, j, a) => j === 0 || x > a[j - 1] + 1e-9);
    const ranges = cuts.map((from, j) => {
      const to = j + 1 < cuts.length ? cuts[j + 1] : null, mid = to == null ? from + 1 : (from + to) / 2;
      const costs = rows.map(r => (r.limit > 0 && r.w * mid > r.limit + 1e-9 ? r.k2 : r.k1));
      return { from, to, costs, mcc: rows.reduce((s, r, k) => s + r.w * costs[k], 0) };
    });
    return { breaks, ranges };
  }

  /* ================================================================== shared drawings */
  const fml = (title, rows) => ({ type: 'table', title, head: ['Quantity', 'Formula', 'Value'], rows: rows.map(r => r.slice()), align: ['left', 'left', 'right'] });   // a copy: the working grows frame by frame
  const niceTop = x => { if (!(x > 0)) return 10; const p = 10 ** Math.floor(Math.log10(x)), m = x / p; return (m <= 1 ? 1 : m <= 1.5 ? 1.5 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 3 ? 3 : m <= 4 ? 4 : m <= 5 ? 5 : m <= 6 ? 6 : m <= 8 ? 8 : 10) * p; };
  /** ticks at a round step from a to b: [[value, label], …] */
  function ticksOf(a, b, n, fmt) {
    const step = niceTop((b - a) / (n || 5)), out = [];
    for (let x = Math.ceil(a / step - 1e-9) * step; x <= b + 1e-9; x += step) { const v = round(x, 6) + 0; out.push([v, fmt ? fmt(v) : String(v)]); }   // + 0: no '−0' label
    return { step, ticks: out };
  }
  /** the issuer's cash flows as bars: + the net proceeds now, − the after-tax interest (or dividend) each year, − the redemption value at the end */
  function flowsPlot(title, NP, cf, RV, n, perpetual) {
    const N = perpetual ? 6 : Math.min(n, 30);
    const pts = [[0, round(NP, 4), rs(NP)]];
    for (let t = 1; t <= N; t++) { const last = !perpetual && t === n, y = -(cf + (last ? RV : 0)); pts.push([t, round(y, 4), t === 1 || last ? rsx(y) : '']); }
    const lo = Math.min(0, ...pts.map(p => p[1])), hi = Math.max(0, ...pts.map(p => p[1]));
    const step = niceTop((hi - lo) / 4.5), y0 = Math.floor((lo * 1.15) / step) * step, y1 = Math.ceil((hi * 1.15) / step) * step;
    const yticks = []; for (let y = y0; y <= y1 + 1e-9; y += step) yticks.push([round(y, 6), (y < 0 ? '−' : '') + grp(Math.abs(round(y, 6)), 0)]);
    return { type: 'plot', title, alt: title + ': money received now (up) and paid out each year (down)', w: 560, h: 240, x: [-0.7, N + 0.7], y: [y0, y1], yticks,
      xticks: Array.from({ length: N + 1 }, (_, t) => [t, perpetual && t === N ? N + ' …' : String(t)]), xlabel: perpetual ? 'year (for ever)' : 'year', ylabel: '₹ per unit', legend: 'none',
      series: [{ label: 'cash flow', bars: true, values: true, color: 'a', pts }] };
  }

  /* ---------------------------------------------------------------- bonds: debt and preference shares */
  function netProceeds(v) {
    const P = +v.issue, fp = +v.flotPct / 100, fr = +v.flotRs;
    if (!(P > 0)) throw new Error('The issue price (or current market price) must be more than ₹0.');
    const NP = P - P * fp - fr;
    if (!(NP > 0)) throw new Error('The flotation cost is larger than the price: the net proceeds would be ₹0 or less.');
    return { P, fp, fr, NP, row: ['Net proceeds NP', fp || fr ? `${rs(P)}${fp ? ` − ${pc(fp)} × ${rs(P)}` : ''}${fr ? ` − ${rs(fr)}` : ''}` : 'issue price (no flotation cost)', rs(NP)] };
  }
  function computeBond(v, kind) {
    const debt = kind === 'debt', type = debt ? v.dtype : v.ptype, face = +v.face, rate = (debt ? +v.coupon : +v.prate) / 100, t = debt ? +v.tax / 100 : 0;
    const method = debt ? v.method : v.pmethod, dp = v.factors || '3';
    if (!(face > 0)) throw new Error('The face value must be more than ₹0.');
    if (rate < 0) throw new Error('The rate cannot be negative.');
    if (debt && (t < 0 || t >= 1)) throw new Error('The tax rate must be between 0% and 99%.');
    const N = netProceeds(v), NP = N.NP, I = rate * face, cf = I * (1 - t);
    const word = debt ? 'interest' : 'dividend', sym = debt ? 'Kd' : 'Kp', Iname = debt ? 'I' : 'PD';
    const what = debt ? (type === 'conv' ? 'Convertible debenture' : type === 'red' ? 'Redeemable debenture' : 'Irredeemable debenture') : (type === 'red' ? 'Redeemable preference share' : 'Irredeemable preference share');
    const rows = [[debt ? 'Interest I' : 'Preference dividend PD', `${pc(rate)} × ${rs(face)}`, rs(I)]];
    if (debt) rows.push(['After-tax interest I(1 − t)', `${rs(I)} × (1 − ${num(t, 4)})`, rs(cf)]);
    rows.push(N.row);
    const frames = [], stats = [];
    const given = [['Face value', '', rs(face)], [debt ? 'Coupon rate' : 'Dividend rate', '', pc(rate)], ['Issue price / market price', '', rs(N.P)]];
    if (N.fp || N.fr) given.push(['Flotation cost', '', [N.fp ? pc(N.fp) : '', N.fr ? rs(N.fr) : ''].filter(Boolean).join(' + ')]);
    if (debt) given.push(['Tax rate', 't', pc(t)]);
    if (type === 'irred') {
      const K = cf / NP;
      const plot = flowsPlot(`${what}: cash flows of the company`, NP, cf, 0, 0, true);
      frames.push({ caption: `**${what}**: the company gets ${rs(NP)} now and pays ${debt ? `interest of ${rs(I)}, which costs it ${rs(cf)} after the tax it saves,` : `a dividend of ${rs(I)} (not tax-deductible)`} every year for ever. Its cost is that yearly payment as a rate on the money received.`, view: [plot, fml(what, given)] });
      frames.push({ caption: debt ? `Interest is a tax-deductible expense, so each ${rs(I)} of interest saves ${rs(I * t)} of tax: the company really pays I(1 − t) = ${rs(cf)}.` : `The preference dividend is paid out of profit after tax, so there is no tax saving: the yearly cost is the full ${rs(I)}.`, view: [plot, fml('Working', rows.slice(0, debt ? 2 : 1))] });
      frames.push({ caption: `The money actually received: ${N.fp || N.fr ? `the price ${rs(N.P)} less the flotation cost leaves NP = ${rs(NP)}` : `NP = ${rs(NP)} (no flotation cost; for an existing issue this is the market price)`}.`, view: [plot, fml('Working', rows)] });
      rows.push([sym, debt ? 'I(1 − t) / NP' : 'PD / NP', `${rs(cf)} / ${rs(NP)} = **${pk(K)}**`]);
      frames.push({ caption: `A perpetuity: ${sym} = ${debt ? 'I(1 − t)' : 'PD'} / NP = ${rs(cf)} / ${rs(NP)} = **${pk(K)}** (${K.toFixed(4)}).`, view: [plot, fml('Working', rows)] });
      stats.push({ label: sym, value: pk(K), hint: debt ? 'I(1 − t) / NP' : 'PD / NP' }, { label: debt ? 'After-tax interest' : 'Dividend', value: rs(cf) }, { label: 'Net proceeds', value: rs(NP) });
      return { frames, stats, part: kind, cost: K, NP, cf, table: { head: ['Item', 'Value'], rows: rows.map(r => [r[0], r[2].replace(/\*\*/g, '')]) },
        note: '**Conventions.** Net proceeds = issue price less flotation cost; for an existing issue the current market price is used. Costs are after tax (only interest is tax-deductible).' };
    }
    const n = +v.years;
    if (!(n > 0)) throw new Error('Enter the years to redemption (more than 0).');
    let RV = +v.rv, conv = null;
    if (!(RV > 0)) throw new Error('The redemption value must be more than ₹0.');
    given.push(['Years to redemption', 'n', num(n)]);
    if (type === 'conv') {
      const ratio = +v.ratio, sp = +v.sprice, gr = +v.sgrowth / 100;
      if (!(ratio > 0 && sp > 0)) throw new Error('Enter the shares per debenture and today\'s share price.');
      const F = fvif(gr, n, dp), Pn = sp * F, cv = ratio * Pn;
      conv = { ratio, sp, gr, F, Pn, cv, cash: RV, take: cv > RV ? 'convert' : 'cash' };
      given.push(['Cash redemption value', '', rs(RV)], ['Conversion value', `${num(ratio)} × ${rs(sp)} × FVIF(${pc(gr)}, ${num(n)}) ${fx(F, dp)}`, rs(cv)]);
      RV = Math.max(RV, cv);
    } else given.push(['Redemption value', 'RV', rs(RV)]);
    const plot = flowsPlot(`${what}: cash flows of the company`, NP, cf, RV, n, false);
    const intro = `**${what}**: the company gets ${rs(NP)} now, pays ${debt ? `${rs(cf)} of interest after tax` : `a dividend of ${rs(cf)}`} each year for ${num(n)} years and repays ${rs(RV)} at the end. ${sym} is the yearly rate this money costs.`;
    if (conv) frames.push({ caption: `${intro} At maturity holders take the better of ${rs(conv.cash)} in cash and ${num(conv.ratio)} shares worth ${rs(conv.sp)} × ${fx(conv.F, dp)} = ${rs(conv.Pn)} each, that is ${rs(conv.cv)}: they will ${conv.take === 'convert' ? 'convert, so RV = ' + rs(conv.cv) : 'take the cash, so RV = ' + rs(conv.cash)}.`, view: [plot, fml(what, given)] });
    else frames.push({ caption: intro, view: [plot, fml(what, given)] });
    frames.push({ caption: debt ? `Interest is tax-deductible: each ${rs(I)} of interest costs only I(1 − t) = ${rs(cf)}.` : `The preference dividend comes out of profit after tax: no tax saving, the yearly cost is ${rs(I)}.`, view: [plot, fml('Working', rows.slice(0, debt ? 2 : 1))] });
    frames.push({ caption: `Money actually received: NP = ${rs(NP)}${N.fp || N.fr ? ' after the flotation cost' : ''}. ${RV > NP ? `It is ${rs(RV - NP)} less than the ${rs(RV)} to be repaid: that gap is an extra cost.` : RV < NP ? `It is ${rs(NP - RV)} more than the ${rs(RV)} to be repaid: that gap is a gain that lowers the cost.` : 'It equals the redemption value.'}`, view: [plot, fml('Working', rows)] });
    let K, res = { part: kind, NP, cf, RV, n, conv };
    if (method === 'ytm') {
      const Y = ytm(NP, cf, RV, n, dp, +v.lo, +v.hi);
      const tab = (A, B) => {
        const head = ['Year', 'Cash flow (₹)', `Factor @ ${pc(A.r)}`, 'PV (₹)'].concat(B ? [`Factor @ ${pc(B.r)}`, 'PV (₹)'] : []);
        const r0 = ['0', rsx(-NP), '1.000', rsx(-NP)].concat(B ? ['1.000', rsx(-NP)] : []);
        const r1 = [`1 to ${num(n)}`, rs(cf), fx(A.A, dp), rs(A.pvI)].concat(B ? [fx(B.A, dp), rs(B.pvI)] : []);
        const r2 = [num(n), rs(RV), fx(A.V, dp), rs(A.pvR)].concat(B ? [fx(B.V, dp), rs(B.pvR)] : []);
        const r3 = ['NPV', '', '', `**${rsx(A.npv)}**`].concat(B ? ['', `**${rsx(B.npv)}**`] : []);
        return { type: 'table', title: `NPV of the ${debt ? 'debenture' : 'preference share'} at the trial rates`, head, rows: [r0, r1, r2, r3], align: head.map((_, i) => (i ? 'right' : 'left')) };
      };
      const lo = Math.max(0, Y.L * 100 - 3), hi = Y.H * 100 + 3;
      const exactNPV = r => -NP + cf * (r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r) + RV * Math.pow(1 + r, -n);
      const curve = []; for (let i = 0; i <= 60; i++) { const x = lo + ((hi - lo) * i) / 60; curve.push([round(x, 4), round(exactNPV(x / 100), 4)]); }
      const ys = curve.map(p => p[1]).concat([Y.A.npv, Y.B.npv]), ystep = niceTop(Math.max(...ys.map(Math.abs)) * 1.1 / 2), top = 2 * ystep;
      const yt = [-2, -1, 0, 1, 2].map(k => [k * ystep, (k < 0 ? '−' : '') + num(Math.abs(k * ystep), 2)]), xt = ticksOf(lo, hi, 6, x => num(x, 2)).ticks;
      const npvPlot = (stage) => ({ type: 'plot', title: 'NPV against the discount rate', alt: 'NPV of the flows at each rate; it crosses zero at the yield', w: 560, h: 250, x: [lo, hi], y: [-top, top], xticks: xt, yticks: yt, xlabel: 'discount rate (%)', ylabel: 'NPV (₹)', legend: 'bottom-left', clip: true,
        series: [{ label: 'NPV (exact factors)', pts: curve, color: 'mute' }].concat(stage >= 2 ? [{ label: 'interpolation line', pts: [[Y.L * 100, round(Y.A.npv, 4)], [Y.H * 100, round(Y.B.npv, 4)]].concat(Y.brackets ? [] : [[Y.irr * 100, 0]]), color: 'a' }] : []),
        points: [{ x: Y.L * 100, y: round(Y.A.npv, 4), label: rsx(Y.A.npv), color: 'a' }].concat(stage >= 1 ? [{ x: Y.H * 100, y: round(Y.B.npv, 4), label: rsx(Y.B.npv), color: 'a', pos: 'below' }] : [], stage >= 2 ? [{ x: round(Y.irr * 100, 4), y: 0, label: pk(Y.irr), color: 'ok', pos: 'above' }] : []) });
      const why = Y.auto ? `The trial rates are the two whole percentages around the yield (${pc(Y.L, 0)} and ${pc(Y.H, 0)}); ICAI's questions usually name their own pair.` : `The trial rates are ${pc(Y.L)} and ${pc(Y.H)}.`;
      frames.push({ caption: `**Present value (YTM) method**: find the rate at which the PV of what the company pays equals what it receives, NP = ${Iname === 'I' ? 'I(1 − t)' : 'PD'} × PVAF(r, n) + RV × PVIF(r, n). ${why} At ${pc(Y.L)}: PV = ${rs(cf)} × ${fx(Y.A.A, dp)} + ${rs(RV)} × ${fx(Y.A.V, dp)} = ${rs(Y.A.pvI + Y.A.pvR)}, so NPV = **${rsx(Y.A.npv)}**.`, view: [npvPlot(0), tab(Y.A)] });
      frames.push({ caption: `At ${pc(Y.H)}: PV = ${rs(cf)} × ${fx(Y.B.A, dp)} + ${rs(RV)} × ${fx(Y.B.V, dp)} = ${rs(Y.B.pvI + Y.B.pvR)}, NPV = **${rsx(Y.B.npv)}**. ${Y.brackets ? 'One NPV is positive and the other negative, so the yield lies between the two rates.' : 'Both NPVs have the same sign, so the yield is outside these rates: the formula extrapolates (pick rates on either side of zero).'}`, view: [npvPlot(1), tab(Y.A, Y.B)] });
      K = Y.irr;
      frames.push({ caption: `Interpolate along the straight line between the two points: ${sym} = ${pc(Y.L)} + ${num(Y.A.npv, 2)} / (${num(Y.A.npv, 2)} − (${num(Y.B.npv, 2)})) × (${pc(Y.H)} − ${pc(Y.L)}) = **${pk(K)}**.${Y.exact != null ? ` The true yield (where the curve crosses zero) is ${pk(Y.exact)}: the straight line ${Math.abs(Y.exact - K) < 0.00005 ? 'is right on it' : `is ${pc(Math.abs(K - Y.exact), 2)} ${K > Y.exact ? 'above' : 'below'} it, because the NPV curve bends`}.` : ''}`, view: [npvPlot(2), tab(Y.A, Y.B)] });
      Object.assign(res, { ytm: Y });
      stats.push({ label: `${sym} (YTM)`, value: pk(K), hint: 'L + NPV_L / (NPV_L − NPV_H) × (H − L)' }, { label: `NPV at ${pc(Y.L)}`, value: rsx(Y.A.npv) }, { label: `NPV at ${pc(Y.H)}`, value: rsx(Y.B.npv) }, { label: 'True yield (exact)', value: Y.exact == null ? '—' : pk(Y.exact), hint: 'the rate where NPV = 0 with unrounded factors' });
    } else {
      const ded = debt && method === 'approx2', amort = (RV - NP) / n, avg = (RV + NP) / 2;
      rows.push(['Yearly share of the gap (RV − NP) / n', `(${rs(RV)} − ${rs(NP)}) / ${num(n)}`, rsx(amort)]);
      frames.push({ caption: `Spread the gap over the ${num(n)} years: (RV − NP) / n = ${rsx(amort)} a year${amort > 0 ? ', added to the yearly cost' : amort < 0 ? ', which reduces the yearly cost' : ''}.${ded ? ' Here the discount / premium is tax-deductible too, so it is also reduced by (1 − t).' : ''}`, view: [plot, fml('Working', rows)] });
      rows.push(['Average funds (RV + NP) / 2', `(${rs(RV)} + ${rs(NP)}) / 2`, rs(avg)]);
      frames.push({ caption: `The money outstanding falls (or rises) from NP to RV over the life, so the formula uses the average, (RV + NP) / 2 = ${rs(avg)}.`, view: [plot, fml('Working', rows)] });
      K = debt ? kdApprox(I, t, NP, RV, n, ded) : kpApprox(I, NP, RV, n);
      const f = ded ? '[I + (RV − NP)/n](1 − t) / [(RV + NP)/2]' : debt ? '[I(1 − t) + (RV − NP)/n] / [(RV + NP)/2]' : '[PD + (RV − NP)/n] / [(RV + NP)/2]';
      const top = ded ? `(${rs(I)} ${amort < 0 ? '−' : '+'} ${rs(Math.abs(amort))}) × ${num(1 - t, 4)}` : `${rs(cf)} ${amort < 0 ? '−' : '+'} ${rs(Math.abs(amort))}`;
      rows.push([sym, f, `${ded ? rs((I + amort) * (1 - t)) : rs(cf + amort)} / ${rs(avg)} = **${pk(K)}**`]);
      const ex = exactIRR(NP, cf, RV, n);
      frames.push({ caption: `${sym} = ${f} = (${top}) / ${rs(avg)} = **${pk(K)}** (${K.toFixed(4)}).${ex != null && !ded ? ` A check by the present value method: the true yield of these flows is ${pk(ex)}; the approximation is close when RV and NP are close.` : ''}`, view: [plot, fml('Working', rows)] });
      Object.assign(res, { exact: ex });
      stats.push({ label: sym + (debt ? ' (after tax)' : ''), value: pk(K), hint: f }, { label: 'Net proceeds', value: rs(NP) }, { label: 'Redemption value', value: rs(RV) }, { label: 'True yield (exact)', value: ex == null ? '—' : pk(ex), hint: 'the IRR of the same flows, for comparison' });
    }
    res.cost = K;
    return Object.assign(res, { frames, stats,
      table: { head: ['Item', 'Value'], rows: rows.map(r => [r[0], String(r[2]).replace(/\*\*/g, '')]) },
      note: `**Conventions.** Net proceeds = issue price less flotation cost (for an existing issue, the current market price). ${debt ? 'Only the interest is tax-deductible unless the method says the discount / premium is too. ' : 'Preference dividends are not tax-deductible. '}Present value factors: ${dp === 'exact' ? 'exact' : dp + ' decimals, as in ICAI\'s tables (the annuity factor is rounded once, like the PVAF table)'}.` });
  }

  /* ---------------------------------------------------------------- equity and retained earnings */
  function computeEquity(v) {
    const ap = v.approach || 'growth', frames = [], stats = [];
    if (ap === 'capm') {
      const rf = +v.rf / 100, beta = +v.beta, mrp = v.rmkind === 'mrp' ? +v.rm / 100 : +v.rm / 100 - rf, rm = rf + mrp;
      const K = keCAPM(rf, beta, rm);
      const xmax = Math.max(2, Math.ceil((beta + 0.5) * 2) / 2), top = niceTop(Math.max(rf + xmax * mrp, rf, K) * 100 * 1.1);
      const sml = s => ({ type: 'plot', title: 'Security market line', alt: 'Required return against beta: a straight line from the risk-free rate through the market', w: 520, h: 280, x: [-0.25, xmax], y: [Math.min(0, (rf + xmax * mrp) * 100), top], xlabel: 'beta β', ylabel: 'required return (%)', legend: 'none',
        xticks: ticksOf(0, xmax, 5, x => num(x, 2)).ticks,
        series: s >= 2 ? [{ label: 'SML', pts: [[0, round(rf * 100, 4)], [xmax, round((rf + xmax * mrp) * 100, 4)]], color: 'a' }] : [],
        points: [{ x: 0, y: round(rf * 100, 4), label: 'Rf ' + pc(rf), color: 'b', pos: 'below' }].concat(s >= 1 ? [{ x: 1, y: round(rm * 100, 4), label: 'market ' + pc(rm), color: 'b', pos: 'below' }] : [], s >= 3 ? [{ x: beta, y: round(K * 100, 4), label: `β ${num(beta)}: ${pk(K)}`, color: 'ok', pos: 'above' }] : []) });
      const rows = [['Risk-free rate', 'Rf', pc(rf)], ['Market return', 'Rm', pc(rm)], ['Market risk premium', 'Rm − Rf', pc(mrp)], ['Beta', 'β', num(beta)]];
      frames.push({ caption: `**CAPM**: shareholders want the risk-free rate for waiting plus a premium for the market risk they cannot diversify away. A government security pays Rf = ${pc(rf)} with no risk (β = 0).`, view: [sml(0), fml('CAPM inputs', rows.slice(0, 1))] });
      frames.push({ caption: `The whole market has β = 1 and returns Rm = ${pc(rm)}: a market risk premium of Rm − Rf = ${pc(mrp)}.`, view: [sml(1), fml('CAPM inputs', rows.slice(0, 3))] });
      frames.push({ caption: `The security market line joins them: every extra unit of beta adds ${pc(mrp)} to the required return.`, view: [sml(2), fml('CAPM inputs', rows)] });
      const out = rows.concat([['Cost of equity', 'Ke = Rf + β(Rm − Rf)', `${pc(rf)} + ${num(beta)} × ${pc(mrp)} = **${pk(K)}**`]]);
      frames.push({ caption: `With β = ${num(beta)}: Ke = Rf + β(Rm − Rf) = ${pc(rf)} + ${num(beta)} × ${pc(mrp)} = **${pk(K)}**. ${beta > 1 ? 'More volatile than the market, so more than Rm.' : beta < 1 ? 'Less volatile than the market, so less than Rm.' : 'Exactly as risky as the market.'} The same rate serves for retained earnings (Kr) under CAPM.`, view: [sml(3), fml('CAPM', out)] });
      stats.push({ label: 'Ke (CAPM)', value: pk(K), hint: 'Rf + β(Rm − Rf)' }, { label: 'Market risk premium', value: pc(mrp), hint: 'Rm − Rf' }, { label: 'Beta', value: num(beta) });
      return { frames, stats, part: 'equity', approach: ap, cost: K, ke: K, kr: K, table: { head: ['Item', 'Value'], rows: out.map(r => [r[0], r[2].replace(/\*\*/g, '')]) },
        note: '**Conventions.** CAPM gives the cost of equity from risk alone; flotation costs do not enter it, so Kr = Ke here.' };
    }
    const P = +v.price, gr = ap === 'growth' ? +v.g / 100 : 0, NI = +v.newIssue > 0 ? +v.newIssue : P, F = +v.flotE;
    if (!(P > 0)) throw new Error('The current market price P0 must be more than ₹0.');
    if (NI - F <= 0) throw new Error('The flotation cost is larger than the issue price of the new shares.');
    let D1, base;
    if (ap === 'ep') { D1 = +v.eps; base = 'E'; }
    else if (ap === 'dp') { D1 = +v.div; base = 'D'; }
    else { D1 = v.dkind === 'd0' ? +v.div * (1 + gr) : +v.div; base = 'D1'; }
    if (!(D1 > 0)) throw new Error(ap === 'ep' ? 'Enter the earnings per share (more than ₹0).' : 'Enter the dividend per share (more than ₹0).');
    const kr = D1 / P + gr, ke = D1 / (NI - F) + gr, fresh = NI !== P || F > 0;
    const name = ap === 'ep' ? 'Earnings price approach' : ap === 'dp' ? 'Dividend price approach' : 'Dividend growth (Gordon) approach';
    const rows = [];
    if (ap === 'growth' && v.dkind === 'd0') rows.push(['Next dividend', 'D1 = D0(1 + g)', `${rs(+v.div)} × ${num(1 + gr, 4)} = ${rs(D1)}`]);
    else rows.push([ap === 'ep' ? 'Earnings per share' : ap === 'dp' ? 'Dividend per share (constant)' : 'Next dividend D1', base, rs(D1)]);
    const bars = s => ({ type: 'plot', title: 'What the shareholders require', alt: 'Bars: the cost of retained earnings and of new equity, split into yield and growth', w: 460, h: 250, x: [-0.6, (fresh ? 1 : 0) + 0.6], y: [0, niceTop(Math.max(kr, ke) * 100 * 1.15)],
      xticks: [[0, 'Kr (retained earnings)']].concat(fresh ? [[1, 'Ke (new shares)']] : []), ylabel: '%', legend: gr > 0 ? 'top-left' : 'none',
      series: [{ label: ap === 'ep' ? 'earnings yield E/P' : 'dividend yield D/P', bars: true, values: true, color: 'a', pts: [[0, round(kr * 100, 4), pk(kr)]].concat(fresh && s >= 2 ? [[1, round(ke * 100, 4), pk(ke)]] : []) }]
        .concat(gr > 0 ? [{ label: 'growth g', bars: true, color: 'c', pts: [[0, round(gr * 100, 4)]].concat(fresh && s >= 2 ? [[1, round(gr * 100, 4)]] : []) }] : []) });
    frames.push({ caption: `**${name}**: ${ap === 'ep' ? 'shareholders are taken to expect the earnings per share, distributed or not, on the price they pay' : ap === 'dp' ? 'a constant dividend for ever, so its cost is the dividend as a rate on the price' : 'the dividend grows at g for ever, so shareholders earn the dividend yield plus the growth'}. Market price P0 = ${rs(P)}.`, view: [fml(name, rows.slice(0, 1).concat([['Market price', 'P0', rs(P)]]).concat(gr ? [['Growth rate', 'g', pc(gr)]] : []))] });
    rows.push(['Market price', 'P0', rs(P)]);
    rows.push(['Yield on the market price', `${base} / P0`, `${rs(D1)} / ${rs(P)} = ${pc(D1 / P)}`]);
    frames.push({ caption: `${ap === 'growth' && v.dkind === 'd0' ? `The formula needs next year's dividend: D1 = D0(1 + g) = ${rs(+v.div)} × ${num(1 + gr, 4)} = ${rs(D1)}. ` : ''}On today's price the yield is ${base} / P0 = ${rs(D1)} / ${rs(P)} = ${pc(D1 / P)}.`, view: [bars(0), fml('Working', rows)] });
    rows.push(['Cost of retained earnings', ap === 'growth' ? 'Kr = D1 / P0 + g' : `Kr = ${base} / P0`, `**${pk(kr)}**`]);
    frames.push({ caption: `Retained earnings belong to the shareholders, so they cost what shareholders require on the market price, with no flotation cost: Kr = ${ap === 'growth' ? `${pc(D1 / P)} + ${pc(gr)}` : pc(D1 / P)} = **${pk(kr)}**.`, view: [bars(1), fml('Working', rows)] });
    if (fresh) {
      rows.push(['Net proceeds of a new share', 'issue price − flotation', `${rs(NI)} − ${rs(F)} = ${rs(NI - F)}`]);
      rows.push(['Cost of new equity', ap === 'growth' ? 'Ke = D1 / (P0 − F) + g' : `Ke = ${base} / (P0 − F)`, `${rs(D1)} / ${rs(NI - F)}${gr ? ' + ' + pc(gr) : ''} = **${pk(ke)}**`]);
      frames.push({ caption: `A new share brings in only ${rs(NI)} − ${rs(F)} = ${rs(NI - F)}, but its holder expects the same ${base === 'E' ? 'earnings' : 'dividend'}: Ke = ${rs(D1)} / ${rs(NI - F)}${gr ? ' + ' + pc(gr) : ''} = **${pk(ke)}**, higher than Kr. That is why retained earnings are the cheaper equity.`, view: [bars(2), fml('Working', rows)] });
    }
    stats.push({ label: 'Kr (retained earnings)', value: pk(kr), hint: ap === 'growth' ? 'D1 / P0 + g' : base + ' / P0' }, { label: 'Ke (new equity)', value: pk(ke), hint: ap === 'growth' ? 'D1 / (P0 − F) + g' : base + ' / (P0 − F)' });
    if (ap === 'growth') stats.push({ label: 'D1', value: rs(D1), hint: 'D0 × (1 + g)' }, { label: 'Dividend yield', value: pc(D1 / P), hint: 'D1 / P0' });
    return { frames, stats, part: 'equity', approach: ap, cost: fresh ? ke : kr, ke, kr, D1, fresh, table: { head: ['Item', 'Value'], rows: rows.map(r => [r[0], r[2].replace(/\*\*/g, '')]) },
      note: '**Conventions.** Kr uses the current market price and no flotation cost; a new issue uses the issue price less flotation (ICAI: P = net proceeds for Ke, the market price for Kr). With no new issue price and no flotation cost, Ke = Kr.' };
  }

  /* ---------------------------------------------------------------- WACC: book and market weights */
  const parseRows = rows => (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'Source ' + (i + 1), bv: +r[1] || 0, mv: +r[2] || 0, cost: (+r[3] || 0) / 100 })).filter(r => r.bv > 0 || r.mv > 0);
  const RE = /retained|reserve|surplus/i, EQ = /equity/i;
  function computeWACC(v) {
    const src = parseRows(v.sources);
    if (!src.length) throw new Error('Add at least one source of finance with a book or market value.');
    if (src.some(r => r.cost < 0)) throw new Error('A cost of capital cannot be negative.');
    let split = null;
    if (v.splitRE) {
      const re = src.filter(r => RE.test(r.name)), eq = src.filter(r => EQ.test(r.name) && !RE.test(r.name));
      if (!re.length || !eq.length) throw new Error('To split the market value of equity, name one row "Equity …" and one "Retained earnings" (or "Reserves").');
      const mvE = eq.reduce((s, r) => s + r.mv, 0) + re.reduce((s, r) => s + r.mv, 0), bvAll = eq.concat(re).reduce((s, r) => s + r.bv, 0);
      if (!(bvAll > 0)) throw new Error('Give the equity and retained earnings rows their book values: the market value is split in that ratio.');
      eq.concat(re).forEach(r => { r.mvOwn = r.mv; r.mv = (mvE * r.bv) / bvAll; });
      split = { mvE, bvAll, names: eq.concat(re).map(r => r.name) };
    }
    const B = wacc(src.map(r => ({ name: r.name, value: r.bv, cost: r.cost }))), M = wacc(src.map(r => ({ name: r.name, value: r.mv, cost: r.cost })));
    const t = (W, title, upto) => ({ type: 'table', title, head: ['Source', title.indexOf('Book') === 0 ? 'Book value (₹)' : 'Market value (₹)', 'Weight', 'Cost', 'Weight × cost'],
      rows: W.rows.map(r => [r.name, rs(r.value), upto >= 1 ? num(r.w, 4) : '', pc(r.cost), upto >= 3 ? num(r.wk, 4) : '']).concat([['Total', rs(W.total), upto >= 1 ? '1' : '', '', upto >= 4 ? `**${num(W.wacc, 4)} = ${pk(W.wacc)}**` : '']]),
      align: ['left', 'right', 'right', 'right', 'right'], cells: upto >= 4 ? { [`${W.rows.length},4`]: 'ok' } : {} });
    const xs = src.map((_, i) => i);
    const bars = { type: 'plot', title: 'Weights: book against market', alt: 'Grouped bars: the weight of each source under book and market values', w: 560, h: 250, x: [-0.6, src.length - 0.4], y: [0, niceTop(Math.max(...B.rows.map(r => r.w), ...M.rows.map(r => r.w)) * 100 * 1.15)],
      xticks: src.map((r, i) => [i, r.name.length > 16 ? r.name.slice(0, 15) + '…' : r.name]), ylabel: 'weight (%)', legend: 'top-left',
      series: [{ label: 'book value', bars: true, bw: 0.34, values: true, color: 'b', pts: xs.map(i => [i - 0.19, round(B.rows[i].w * 100, 4), pc(B.rows[i].w, 1)]) },
        { label: 'market value', bars: true, bw: 0.34, values: true, color: 'a', pts: xs.map(i => [i + 0.19, round(M.rows[i].w * 100, 4), pc(M.rows[i].w, 1)]) }] };
    const frames = [];
    const srcTab = { type: 'table', title: 'Sources of finance', head: ['Source', 'Book value (₹)', 'Market value (₹)', 'Cost after tax'], rows: src.map(r => [r.name, rs(r.bv), rs(r.mv) + (split && r.mvOwn != null ? ' *' : ''), pc(r.cost)]), align: ['left', 'right', 'right', 'right'] };
    frames.push({ caption: `**WACC** is the average cost of all the money the firm uses, each source weighted by its share. The weights can come from the balance sheet (book values) or from what the securities sell for today (market values).${split ? ` Retained earnings have no market price of their own: the market value of the equity, ${rs(split.mvE)}, is split between ${split.names.join(' and ')} in the ratio of their book values (*).` : ''}`, view: [srcTab] });
    frames.push({ caption: `**Book-value weights**: each source's book value over the total, ${rs(B.total)}: ${B.rows.map(r => `${r.name} ${num(r.w, 4)}`).join(', ')}.`, view: [t(B, 'Book-value weights', 1)] });
    const byCost = src.slice().sort((a, b) => a.cost - b.cost), cheap = byCost[0], dear = byCost[byCost.length - 1];
    frames.push({ caption: `Each weight is multiplied by that source's after-tax cost${src.length > 1 ? `: here ${cheap.name} is the cheapest at ${pc(cheap.cost)}${/deb|loan|bond|debt/i.test(cheap.name) ? ' (interest saves tax)' : ''} and ${dear.name} the dearest at ${pc(dear.cost)}` : ''}.`, view: [t(B, 'Book-value weights', 3)] });
    frames.push({ caption: `Adding the products: WACC on book-value weights = **${pk(B.wacc)}**.`, view: [t(B, 'Book-value weights', 4)] });
    frames.push({ caption: `**Market-value weights**: the same sources at today's prices, total ${rs(M.total)}: ${M.rows.map(r => `${r.name} ${num(r.w, 4)}`).join(', ')}.`, view: [t(B, 'Book-value weights', 4), t(M, 'Market-value weights', 1)] });
    frames.push({ caption: 'Multiply by the same after-tax costs: only the weights have changed.', view: [t(B, 'Book-value weights', 4), t(M, 'Market-value weights', 3)] });
    const up = M.wacc > B.wacc + 1e-9, dn = M.wacc < B.wacc - 1e-9;
    const moved = src.map((r, i) => ({ name: r.name, cost: r.cost, d: M.rows[i].w - B.rows[i].w, wb: B.rows[i].w, wm: M.rows[i].w })).sort((a, b) => b.d - a.d)[0];
    const shift = moved && moved.d > 0.0005 ? ` At market prices ${moved.name} weighs ${num(moved.wm, 4)} instead of ${num(moved.wb, 4)}; ${moved.cost > B.wacc ? 'it costs more than the book-weight average, so the average rises' : 'it costs less than the book-weight average, so the average falls'}.` : '';
    frames.push({ caption: `WACC on market-value weights = **${pk(M.wacc)}**, ${up ? 'higher' : dn ? 'lower' : 'the same as on book values'}${up || dn ? ` than the ${pk(B.wacc)} on book values` : ''}.${shift} The Study Material prefers market weights: they reflect what the money costs today.`, view: [bars, t(B, 'Book-value weights', 4), t(M, 'Market-value weights', 4)] });
    const stats = [{ label: 'WACC (book weights)', value: pk(B.wacc), hint: 'Σ book weight × after-tax cost' }, { label: 'WACC (market weights)', value: pk(M.wacc), hint: 'Σ market weight × after-tax cost' },
      { label: 'Total book value', value: rs(B.total) }, { label: 'Total market value', value: rs(M.total) }];
    return { frames, stats, part: 'wacc', book: B, market: M, split, cost: M.wacc,
      table: { head: ['Source', 'Book weight', 'Market weight', 'Cost'], rows: src.map((r, i) => [r.name, num(B.rows[i].w, 4), num(M.rows[i].w, 4), pc(r.cost)]).concat([['WACC', pk(B.wacc), pk(M.wacc), '']]) },
      note: '**Conventions.** Costs are entered after tax. Weights are shown to 4 decimals; the WACC uses the unrounded weights, so a hand table built from rounded weights can differ in the last decimal.' };
  }

  /* ---------------------------------------------------------------- marginal cost of capital */
  const parseMCC = rows => (rows || []).map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'Source ' + (i + 1), w: (+r[1] || 0) / 100, k1: (+r[2] || 0) / 100, limit: +r[3] || 0, k2: (r[4] === '' || r[4] == null ? +r[2] : +r[4]) / 100 })).filter(r => r.w > 0);
  function computeMCC(v) {
    const rows = parseMCC(v.mcc);
    if (!rows.length) throw new Error('Add the sources with their proportions of new capital.');
    const M = mcc(rows), frames = [];
    const plan = upto => ({ type: 'table', title: 'The financing plan', head: ['Source', 'Proportion', 'Cost', 'Available at that cost', 'Then'],
      rows: rows.map(r => [r.name, pc(r.w), pc(r.k1), r.limit > 0 ? rs(r.limit) : 'no limit', r.limit > 0 ? pc(r.k2) : '—']), align: ['left', 'right', 'right', 'right', 'right'] });
    const last = M.breaks.length ? M.breaks[M.breaks.length - 1].at : 0, xmax = niceTop((last || 100000) * 1.5);
    const step = n => {
      const pts = [];
      M.ranges.slice(0, n).forEach(rg => { const to = rg.to == null ? xmax : rg.to; pts.push([round(rg.from, 2), round(rg.mcc * 100, 4)], [round(to, 2), round(rg.mcc * 100, 4)]); });
      const ys = M.ranges.map(r => r.mcc * 100), lo = Math.min(...ys), hi = Math.max(...ys), pad = Math.max(0.5, (hi - lo) * 0.4);
      const Yt = ticksOf(Math.max(0, lo - pad), hi + pad, 4, y => num(y, 2) + '%'), y0 = Yt.ticks[0][0] - (Yt.ticks[0][0] > lo - pad ? Yt.step : 0), y1 = Yt.ticks[Yt.ticks.length - 1][0] + (Yt.ticks[Yt.ticks.length - 1][0] < hi + pad ? Yt.step : 0);
      const yt = ticksOf(Math.max(0, y0), y1, 4, y => num(y, 2) + '%').ticks;
      return { type: 'plot', title: 'Marginal cost of capital schedule', alt: 'A step line: the cost of each extra rupee of new capital against the total raised', w: 560, h: 250, x: [0, xmax], y: [Math.max(0, y0), y1], xlabel: 'total new capital (₹)', ylabel: 'MCC', legend: 'none',
        xticks: ticksOf(0, xmax, 5, x => grp(x, 0)).ticks, yticks: yt,
        series: n ? [{ label: 'MCC', pts, color: 'a' }] : [], points: M.breaks.slice(0, Math.max(0, n - 1)).map(b => ({ x: round(b.at, 2), y: round(M.ranges.find(r => Math.abs(r.from - b.at) < 1e-6).mcc * 100, 4), label: rs(b.at), color: 'd', pos: 'above' })) };
    };
    const rtab = n => ({ type: 'table', title: 'MCC in each range of new capital', head: ['New capital (₹)'].concat(rows.map(r => r.name.length > 14 ? r.name.slice(0, 13) + '…' : r.name), ['MCC']),
      rows: M.ranges.slice(0, n).map(rg => [`${rs(rg.from)} – ${rg.to == null ? 'above' : rs(rg.to)}`].concat(rg.costs.map(c => pc(c)), [`**${pk(rg.mcc)}**`])), align: ['left'].concat(rows.map(() => 'right'), ['right']) });
    frames.push({ caption: `**Marginal cost of capital**: the cost of each new rupee, raised in the fixed proportions ${rows.map(r => `${r.name} ${pc(r.w, 0)}`).join(', ')}. A source that runs out of its cheap tranche makes every later rupee dearer.`, view: [step(0), plan()] });
    M.breaks.forEach(b => {
      const r = rows[b.i];
      frames.push({ caption: `**Break point** for ${r.name}: ${rs(b.limit)} is available at ${pc(r.k1)} and it is ${pc(r.w)} of every rupee raised, so it runs out when the total reaches ${rs(b.limit)} / ${num(r.w, 4)} = **${rs(b.at)}**. Beyond that it costs ${pc(r.k2)}.`, view: [step(0), plan()] });
    });
    M.ranges.forEach((rg, j) => {
      frames.push({ caption: `${rg.to == null ? `Above ${rs(rg.from)}` : `From ${rs(rg.from)} to ${rs(rg.to)}`}: MCC = ${rows.map((r, k) => `${num(r.w, 4)} × ${pc(rg.costs[k])}`).join(' + ')} = **${pk(rg.mcc)}**.${j ? ` It steps up from ${pk(M.ranges[j - 1].mcc)} because ${rows.filter((r, k) => rg.costs[k] !== M.ranges[j - 1].costs[k]).map(r => r.name).join(' and ')} now costs more.` : ''}`, view: [step(j + 1), rtab(j + 1)] });
    });
    const stats = M.ranges.slice(0, 3).map((rg, j) => ({ label: rg.to == null ? (j ? `MCC above ${rs(rg.from)}` : 'MCC') : `MCC up to ${rs(rg.to)}`, value: pk(rg.mcc), hint: 'Σ proportion × cost in this range' }))
      .concat(M.breaks.length ? [{ label: 'First break point', value: rs(M.breaks[0].at), hint: 'amount available at the lower cost ÷ proportion' }] : []);
    return { frames, stats, part: 'mcc', schedule: M, cost: M.ranges[0].mcc,
      table: { head: ['New capital (₹)', 'MCC'], rows: M.ranges.map(rg => [`${rs(rg.from)} – ${rg.to == null ? 'above' : rs(rg.to)}`, pk(rg.mcc)]) },
      note: '**Conventions.** Proportions are the target capital structure (marginal weights) and must add up to 100%. A source\'s limit is the amount of that source available at its first cost (for equity, the retained earnings); beyond it the second cost applies. Costs are after tax.' };
  }

  let lastPart = 'debt';
  function compute(v) {
    const part = ['debt', 'pref', 'equity', 'wacc', 'mcc'].indexOf(v.part) >= 0 ? v.part : 'debt';
    lastPart = part;
    if (part === 'pref') return computeBond(v, 'pref');
    if (part === 'equity') return computeEquity(v);
    if (part === 'wacc') return computeWACC(v);
    if (part === 'mcc') return computeMCC(v);
    return computeBond(v, 'debt');
  }

  /* ================================================================== the lab */
  const is = (...ps) => v => ps.indexOf(v.part) >= 0;
  const bondRed = v => (v.part === 'debt' && v.dtype !== 'irred') || (v.part === 'pref' && v.ptype === 'red');
  const bondYTM = v => bondRed(v) && (v.part === 'debt' ? v.method === 'ytm' : v.pmethod === 'ytm');
  const eq = (...aps) => v => v.part === 'equity' && aps.indexOf(v.approach) >= 0;
  const SM17 = [['10% Debentures', 500000, 525000, 6.89], ['5% Preference shares', 500000, 550000, 4.08], ['Equity shares', 1000000, 2400000, 10]];
  const SM18 = [['Debentures', 15, 8.33, 0, ''], ['Preference shares', 5, 12, 0, ''], ['Equity (retained earnings, then new shares)', 80, 15, 11800, 15.9]];
  const bond = (o) => Object.assign({ face: 100, issue: 100, flotPct: 0, flotRs: 0, rv: 100, years: 5, lo: 0, hi: 0, factors: '3' }, o);
  const presets = [
    { label: 'Study Material Ill. 2 · 10% debenture issued at a 10% premium, redeemed at par in 5 years, tax 35%', values: bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 110, rv: 100, years: 5, tax: 35, method: 'approx' }) },
    { label: 'Study Material Ill. 3 · existing 10% debenture at ₹80, par in 5 years, tax 35%', values: bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 80, rv: 100, years: 5, tax: 35, method: 'approx' }) },
    { label: 'Study Material Example 2 · the same debenture by the YTM method, 10% and 15%', values: bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 80, rv: 100, years: 5, tax: 35, method: 'ytm', lo: 10, hi: 15 }) },
    { label: 'Study Material Ill. 17 · 10% debentures at ₹105 less 4% flotation, 10 years, tax 30% (YTM 5% and 7%)', values: bond({ part: 'debt', dtype: 'red', coupon: 10, issue: 105, flotPct: 4, rv: 100, years: 10, tax: 30, method: 'ytm', lo: 5, hi: 7 }) },
    { label: 'PYQ May 2026 Q2(b) · Z Ltd: 8% convertible debenture at ₹85, 5 shares or a 5% premium (YTM 10% and 12%)', values: bond({ part: 'debt', dtype: 'conv', coupon: 8, issue: 85, rv: 105, years: 5, tax: 30, method: 'ytm', lo: 10, hi: 12, ratio: 5, sprice: 16, sgrowth: 7 }) },
    { label: 'PYQ Jan 2025 Q2(a) · CMC Ltd: 10% convertible debenture at ₹108, 4 shares in 6 years (approximation)', values: bond({ part: 'debt', dtype: 'conv', coupon: 10, issue: 108, rv: 100, years: 6, tax: 30, method: 'approx', ratio: 4, sprice: 55, sgrowth: 6, factors: 'exact' }) },
    { label: 'Study Material Ill. 1 · Sona Ltd: 12% irredeemable debentures quoted at ₹94, tax 35%', values: bond({ part: 'debt', dtype: 'irred', coupon: 12, issue: 94, tax: 35 }) },
    { label: 'Study Material Ill. 8 · 10% preference shares issued at ₹95, redeemable at par in 10 years', values: bond({ part: 'pref', ptype: 'red', prate: 10, issue: 95, rv: 100, years: 10, pmethod: 'approx' }) },
    { label: 'PYQ May 2025 Q2(a) · B Ltd: 10% preference share of ₹1,000, redeemable at ₹1,065.40 in 3 years (YTM 10% and 14%)', values: bond({ part: 'pref', ptype: 'red', face: 1000, prate: 10, issue: 1000, rv: 1065.4, years: 3, pmethod: 'ytm', lo: 10, hi: 14 }) },
    { label: 'Study Material Ill. 7 · R Energy: ₹12 preferred dividend, issued at ₹100 less 3% flotation', values: bond({ part: 'pref', ptype: 'irred', prate: 12, issue: 100, flotPct: 3 }) },
    { label: 'Study Material Ill. 13 · market price ₹200, new issue at ₹190 less ₹5, D1 ₹10, g 5%: Ke and Kr', values: { part: 'equity', approach: 'growth', dkind: 'd1', div: 10, g: 5, price: 200, newIssue: 190, flotE: 5 } },
    { label: 'PYQ Sep 2025 Q1(a) · RSA Ltd: D0 ₹2, g 5%, new issue at ₹60 less ₹4 flotation', values: { part: 'equity', approach: 'growth', dkind: 'd0', div: 2, g: 5, price: 60, newIssue: 60, flotE: 4 } },
    { label: 'Study Material Ill. 12 · H Ltd: Rf 10%, β 1.75, Rm 15% (CAPM)', values: { part: 'equity', approach: 'capm', rf: 10, beta: 1.75, rmkind: 'rm', rm: 15 } },
    { label: 'PYQ Jan 2025 Q2(a) · CMC Ltd: Rf 4.5%, β 1.5, equity risk premium 9% (CAPM)', values: { part: 'equity', approach: 'capm', rf: 4.5, beta: 1.5, rmkind: 'mrp', rm: 9 } },
    { label: 'Study Material Ill. 17 · WACC with book and market weights (debentures, preference, equity)', values: { part: 'wacc', sources: SM17, splitRE: false } },
    { label: 'PYQ Jan 2025 Q2(a) · CMC Ltd: WACC on market values', values: { part: 'wacc', splitRE: false, sources: [['Equity share capital', 20000000, 110000000, 18], ['10% Convertible debentures', 10000000, 10800000, 19.53], ['12% Bank term loan', 2500000, 2500000, 8.4]] } },
    { label: 'Study Material Ill. 16 · market value of equity split between shares and retained earnings', values: { part: 'wacc', splitRE: true, sources: [['Equity shares', 500000, 2500000, 10.41], ['Retained earnings', 1500000, 0, 10]] } },
    { label: 'Study Material Ill. 18 · ABC Ltd: MCC before and after the ₹11,800 of retained earnings run out', values: { part: 'mcc', mcc: SM18 } },
    { label: 'RTP May 2024 Q2 · MCC with ₹3,02,300 of retained earnings, then new shares at ₹22', values: { part: 'mcc', mcc: [['14% Debentures', 15, 7.07, 0, ''], ['12% Preference shares', 5, 12.63, 0, ''], ['Equity (retained earnings, then new shares)', 80, 16, 302300, 17.87]] } },
    { label: 'Tapri Tea · Dev\'s café expansion: debt in two tranches, then new equity', values: { part: 'mcc', mcc: [['Bank loan', 30, 7, 600000, 8.4], ['Debentures', 20, 7.7, 0, ''], ['Equity (retained earnings, then new shares)', 50, 14, 1500000, 15.5]] } },
    { label: 'Tapri Tea · samosa-factory debentures: 9% at ₹96 less 2%, repaid at ₹105 in 7 years', values: bond({ part: 'debt', dtype: 'red', coupon: 9, issue: 96, flotPct: 2, rv: 105, years: 7, tax: 25, method: 'approx' }) }
  ];

  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const def = {
    id: 'wacc', title: 'Cost of Capital Lab',
    blurb: 'Build Kd, Kp, Ke and Kr step by step, then WACC on book and market weights and the marginal cost of capital schedule.',
    controls: [
      { id: 'part', type: 'select', label: 'What to work out', value: 'debt', options: [['debt', 'Cost of debt (Kd)'], ['pref', 'Cost of preference (Kp)'], ['equity', 'Cost of equity (Ke, Kr)'], ['wacc', 'WACC: book and market'], ['mcc', 'Marginal cost of capital']] },
      { id: 'dtype', type: 'select', label: 'Debenture', value: 'red', options: [['irred', 'Irredeemable'], ['red', 'Redeemable'], ['conv', 'Convertible']], show: is('debt') },
      { id: 'ptype', type: 'seg', label: 'Preference shares', value: 'red', options: [['irred', 'Irredeemable'], ['red', 'Redeemable']], show: is('pref') },
      { id: 'face', type: 'number', label: 'Face value per unit (₹)', short: 'Face value', value: 100, min: 0.01, max: 1e7, step: 0.01, show: is('debt', 'pref') },
      { id: 'coupon', type: 'number', label: 'Coupon (interest) rate (%)', short: 'Coupon', value: 10, min: 0, max: 100, step: 0.01, show: is('debt') },
      { id: 'prate', type: 'number', label: 'Preference dividend rate (%)', short: 'Dividend rate', value: 10, min: 0, max: 100, step: 0.01, show: is('pref') },
      { id: 'issue', type: 'number', label: 'Issue price, or market price for an existing issue (₹)', short: 'Price', value: 110, min: 0.01, max: 1e7, step: 0.01, show: is('debt', 'pref') },
      { id: 'flotPct', type: 'number', label: 'Flotation cost, % of the price (0 = none)', short: 'Flotation %', value: 0, min: 0, max: 99, step: 0.01, show: is('debt', 'pref') },
      { id: 'flotRs', type: 'number', label: 'Flotation cost per unit, ₹ (0 = none)', short: 'Flotation ₹', value: 0, min: 0, max: 1e7, step: 0.01, show: is('debt', 'pref') },
      { id: 'rv', type: 'number', label: 'Redemption value per unit (₹)', short: 'RV', value: 100, min: 0.01, max: 1e7, step: 0.01, show: bondRed },
      { id: 'years', type: 'number', label: 'Years to redemption n', short: 'n', value: 5, min: 0.5, max: 60, step: 0.5, show: bondRed },
      { id: 'ratio', type: 'number', label: 'Equity shares per debenture on conversion', short: 'Shares per debenture', value: 4, min: 0.01, max: 1e5, step: 0.01, show: v => v.part === 'debt' && v.dtype === 'conv' },
      { id: 'sprice', type: 'number', label: 'Share price today (₹)', short: 'Share price', value: 55, min: 0.01, max: 1e7, step: 0.01, show: v => v.part === 'debt' && v.dtype === 'conv' },
      { id: 'sgrowth', type: 'number', label: 'Growth in the share price (% a year)', short: 'Share growth', value: 6, min: 0, max: 100, step: 0.01, show: v => v.part === 'debt' && v.dtype === 'conv' },
      { id: 'tax', type: 'number', label: 'Tax rate (%)', short: 'Tax', value: 35, min: 0, max: 99, step: 0.01, show: is('debt') },
      { id: 'method', type: 'select', label: 'Method', value: 'approx', options: [['approx', 'Approximation formula'], ['approx2', 'Approximation, premium deductible too'], ['ytm', 'YTM: two trial rates']], show: v => v.part === 'debt' && v.dtype !== 'irred' },
      { id: 'pmethod', type: 'select', label: 'Method', value: 'approx', options: [['approx', 'Approximation formula'], ['ytm', 'YTM: two trial rates']], show: v => v.part === 'pref' && v.ptype === 'red' },
      { id: 'lo', type: 'number', label: 'Lower trial rate, % (0 = automatic)', short: 'Lower rate', value: 0, min: 0, max: 99, step: 0.5, show: bondYTM },
      { id: 'hi', type: 'number', label: 'Higher trial rate, % (0 = automatic)', short: 'Higher rate', value: 0, min: 0, max: 99, step: 0.5, show: bondYTM },
      { id: 'factors', type: 'select', label: 'Present value factors', value: '3', options: [['3', '3 decimals (ICAI tables)'], ['4', '4 decimals'], ['exact', 'Exact']], show: v => bondYTM(v) || (v.part === 'debt' && v.dtype === 'conv') },
      { id: 'approach', type: 'select', label: 'Approach', value: 'growth', options: [['growth', 'Dividend growth: D1/P0 + g'], ['dp', 'Dividend price: D/P0'], ['ep', 'Earnings price: E/P0'], ['capm', 'CAPM: Rf + β(Rm − Rf)']], show: is('equity') },
      { id: 'dkind', type: 'seg', label: 'The dividend given is', value: 'd1', options: [['d0', 'D0: just paid'], ['d1', 'D1: next year\'s']], show: eq('growth') },
      { id: 'div', type: 'number', label: 'Dividend per share (₹)', short: 'Dividend', value: 10, min: 0, max: 1e6, step: 0.01, show: eq('growth', 'dp') },
      { id: 'eps', type: 'number', label: 'Earnings per share (₹)', short: 'EPS', value: 20, min: 0, max: 1e6, step: 0.01, show: eq('ep') },
      { id: 'g', type: 'number', label: 'Growth rate g (%)', short: 'g', value: 5, min: 0, max: 100, step: 0.01, show: eq('growth') },
      { id: 'price', type: 'number', label: 'Current market price P0 (₹)', short: 'P0', value: 200, min: 0.01, max: 1e7, step: 0.01, show: eq('growth', 'dp', 'ep') },
      { id: 'newIssue', type: 'number', label: 'Issue price of new shares, ₹ (0 = the market price)', short: 'New issue at', value: 190, min: 0, max: 1e7, step: 0.01, show: eq('growth', 'dp', 'ep') },
      { id: 'flotE', type: 'number', label: 'Flotation cost per new share, ₹ (0 = none)', short: 'Flotation', value: 5, min: 0, max: 1e7, step: 0.01, show: eq('growth', 'dp', 'ep') },
      { id: 'rf', type: 'number', label: 'Risk-free rate Rf (%)', short: 'Rf', value: 10, min: 0, max: 100, step: 0.01, show: eq('capm') },
      { id: 'beta', type: 'number', label: 'Beta β', short: 'β', value: 1.75, min: 0, max: 10, step: 0.01, show: eq('capm') },
      { id: 'rmkind', type: 'seg', label: 'Market figure given: return Rm or premium Rm − Rf', value: 'rm', options: [['rm', 'Rm'], ['mrp', 'Rm − Rf']], show: eq('capm') },
      { id: 'rm', type: 'number', label: 'Market return or risk premium (%)', short: 'Market', value: 15, min: 0, max: 100, step: 0.01, show: eq('capm') },
      { id: 'sources', type: 'table', label: 'Sources of finance', max: 8, rows: SM17, show: is('wacc'),
        cols: [{ id: 'name', label: 'Source', type: 'text', auto: n => 'Source ' + (n + 1) }, { id: 'bv', label: 'Book ₹', type: 'number', min: 0, def: 0 }, { id: 'mv', label: 'Market ₹', type: 'number', min: 0, def: 0 }, { id: 'k', label: 'Cost %', type: 'number', min: 0, max: 100, def: 10 }] },
      { id: 'splitRE', type: 'toggle', label: 'Split the market value of equity between equity shares and retained earnings in their book ratio', short: 'Equity market value split', value: false, show: is('wacc'),
        help: 'Retained earnings have no market price. ICAI shares the market value of the equity shares between the "Equity …" and "Retained earnings" rows in the ratio of their book values.' },
      { id: 'mcc', type: 'table', label: 'New capital: proportion, cost, how much is available at that cost (0 = no limit), cost beyond', max: 6, rows: SM18, show: is('mcc'),
        cols: [{ id: 'name', label: 'Source', type: 'text', auto: n => 'Source ' + (n + 1) }, { id: 'w', label: 'Share %', type: 'number', min: 0, max: 100, def: 0 }, { id: 'k1', label: 'Cost %', type: 'number', min: 0, max: 100, def: 10 }, { id: 'lim', label: 'Up to ₹', type: 'number', min: 0, def: 0 }, { id: 'k2', label: 'Then %', type: 'number', min: 0, max: 100, def: 12 }] }
    ],
    presets, compute,
    challenge: {
      title: 'Find the cost',
      gen(r) {
        const part = lastPart, tax = pick(r, [25, 30, 35, 40]);
        if (part === 'debt' || part === 'pref') {
          const face = pick(r, [100, 100, 100, 1000]), red = r() < 0.8, years = pick(r, [3, 4, 5, 6, 8, 10]);
          const issue = round(face * pick(r, [0.85, 0.9, 0.92, 0.95, 0.96, 0.98, 1, 1.02, 1.05, 1.1]), 2), rv = round(face * pick(r, [1, 1, 1, 1.05, 1.1]), 2);
          const o = { face, issue, flotPct: pick(r, [0, 0, 2, 3, 4]), flotRs: 0, rv, years, tax, lo: 0, hi: 0, factors: '3' };
          if (part === 'debt') Object.assign(o, { dtype: red ? 'red' : 'irred', coupon: pick(r, [8, 9, 10, 11, 12, 14]), method: pick(r, ['approx', 'approx', 'ytm']) });
          else Object.assign(o, { ptype: red ? 'red' : 'irred', prate: pick(r, [8, 9, 10, 11, 12]), pmethod: pick(r, ['approx', 'approx', 'ytm']) });
          return o;
        }
        if (part === 'equity') {
          const ap = pick(r, ['growth', 'growth', 'capm', 'dp', 'ep']);
          return { approach: ap, dkind: pick(r, ['d0', 'd1']), div: pick(r, [1, 1.5, 2, 2.5, 3, 4, 5]), g: pick(r, [3, 4, 5, 6, 8, 10]), price: pick(r, [20, 25, 40, 50, 60, 80, 100]), newIssue: 0, flotE: pick(r, [0, 0, 1, 2, 3]),
            eps: pick(r, [4, 5, 6, 8, 10]), rf: pick(r, [5, 6, 7, 8, 10]), beta: pick(r, [0.8, 1, 1.2, 1.5, 1.75, 2]), rmkind: pick(r, ['rm', 'mrp']), rm: pick(r, [6, 8, 12, 14, 15]), ask: pick(r, ['ke', 'kr']) };
        }
        if (part === 'wacc') {
          const d = pick(r, [2, 3, 4, 5]) * 100000, p = pick(r, [1, 2, 3]) * 100000, e = pick(r, [5, 6, 8, 10]) * 100000;
          return { splitRE: false, ask: pick(r, ['book', 'market']), sources: [['Debentures', d, round(d * pick(r, [0.95, 1, 1.05]), 0), pick(r, [6, 7, 7.5, 8, 8.4])], ['Preference shares', p, round(p * pick(r, [0.9, 1, 1.1]), 0), pick(r, [9, 10, 11, 12])], ['Equity shares', e, e * pick(r, [1.5, 2, 2.5, 3]), pick(r, [12, 14, 15, 16, 18])]] };
        }
        // equity 40–80% and its retained earnings a multiple of ₹1,20,000, so the break point is a whole number of rupees
        const we = pick(r, [40, 50, 60, 75, 80]), wp = pick(r, [0, 5, 10].filter(x => x < 100 - we)), wd = 100 - we - wp;
        return { ask: pick(r, ['first', 'break', 'after']), mcc: [['Debt', wd, pick(r, [6, 7, 7.5, 8]), 0, ''], ['Preference shares', wp, pick(r, [10, 11, 12]), 0, ''], ['Equity (retained earnings, then new shares)', we, pick(r, [14, 15, 16]), pick(r, [1, 2, 3, 5]) * 120000, pick(r, [17, 18])]].filter(x => x[1] > 0) };
      },
      prompt(v, res) {
        if (res.part === 'debt' || res.part === 'pref') {
          const debt = res.part === 'debt', red = debt ? v.dtype !== 'irred' : v.ptype === 'red';
          const what = debt ? `${v.coupon}% ${red ? 'redeemable' : 'irredeemable'} debentures of ₹${v.face}` : `${v.prate}% ${red ? 'redeemable' : 'irredeemable'} preference shares of ₹${v.face}`;
          const how = !red ? '' : (debt ? v.method : v.pmethod) === 'ytm' ? ` by the **present value (YTM) method**, interpolating between ${pc(res.ytm.L)} and ${pc(res.ytm.H)} with 3-decimal table factors` : ' by the **approximation formula**';
          return `${what} are issued at ₹${v.issue}${+v.flotPct ? ` less ${v.flotPct}% flotation cost` : ''}${red ? `, redeemable at ₹${v.rv} after ${v.years} years` : ''}${debt ? `; tax rate ${v.tax}%` : ''}. What is the ${debt ? '**after-tax cost of debt**' : '**cost of preference shares**'}${how}? (%, two decimals)`;
        }
        if (res.part === 'equity') {
          if (v.approach === 'capm') return `Risk-free rate ${v.rf}%, beta ${v.beta}, ${v.rmkind === 'mrp' ? `market risk premium ${v.rm}%` : `market return ${v.rm}%`}. What is the **cost of equity by CAPM**? (%, two decimals)`;
          const given = v.approach === 'ep' ? `EPS ₹${v.eps}` : v.approach === 'dp' ? `a constant dividend of ₹${v.div}` : `${v.dkind === 'd0' ? 'a dividend just paid' : 'a dividend expected next year'} of ₹${v.div}, growing at ${v.g}% a year`;
          const fl = +v.flotE ? `; new shares would cost ₹${v.flotE} a share to float` : '';
          const want = v.ask === 'kr' || !res.fresh ? '**cost of retained earnings (Kr)**' : '**cost of new equity (Ke)**';
          return `Market price ₹${v.price}, ${given}${fl}. Using the ${v.approach === 'ep' ? 'earnings price' : v.approach === 'dp' ? 'dividend price' : 'dividend growth'} approach, what is the ${want}? (%, two decimals)`;
        }
        if (res.part === 'wacc') return `Sources (book value, market value, after-tax cost): ${v.sources.map(s => `${s[0]} ₹${GA.util ? GA.util.nf(s[1]) : s[1]}, ₹${GA.util ? GA.util.nf(s[2]) : s[2]}, ${s[3]}%`).join('; ')}. What is the **WACC using ${v.ask === 'book' ? 'book' : 'market'}-value weights**? (%, two decimals)`;
        const plan = v.mcc.map(s => `${s[0]} ${s[1]}% at ${s[2]}%${+s[3] ? ` (₹${GA.util ? GA.util.nf(s[3]) : s[3]} available, then ${s[4]}%)` : ''}`).join('; ');
        return `New capital is raised as: ${plan}. ${v.ask === 'break' ? 'At what **total new capital** does the marginal cost of capital first rise? (₹)' : v.ask === 'after' ? 'What is the **marginal cost of capital beyond the break point**? (%, two decimals)' : 'What is the **marginal cost of capital before the break point**? (%, two decimals)'}`;
      },
      solve(res, v) {
        if (res.part === 'equity' && res.fresh && v.ask === 'kr') return round(res.kr * 100, 2);
        if (res.part === 'equity') return round((res.fresh && v.ask !== 'kr' ? res.ke : res.kr) * 100, 2);
        if (res.part === 'wacc') return round((v.ask === 'book' ? res.book.wacc : res.market.wacc) * 100, 2);
        if (res.part === 'mcc') { const M = res.schedule; return v.ask === 'break' ? (M.breaks.length ? round(M.breaks[0].at, 0) : null) : v.ask === 'after' ? round(M.ranges[M.ranges.length - 1].mcc * 100, 2) : round(M.ranges[0].mcc * 100, 2); }
        return round(res.cost * 100, 2);
      },
      tol: 0.011, kind: 'num',
      view: (res) => (res.part === 'debt' || res.part === 'pref' ? [res.frames[0].view[1]] : res.part === 'equity' ? res.frames[0].view.filter(x => x.type !== 'plot') : [res.frames[0].view[res.frames[0].view.length - 1]]),
      explain(res) { return res.frames[res.frames.length - 1].caption; }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { pvif, pvaf, fvif, kdIrred, kdApprox, kpApprox, bondNPV, exactIRR, ytm, keGrowth, keCAPM, wacc, mcc, compute, def };
  g.__lab_def_wacc = def;
})(typeof window !== 'undefined' ? window : globalThis);
