/* PassBook — Capital Structure Theories Lab (Paper 6A, chapter 5: Financing Decisions - Capital Structure).
   Pure part: solve(mode, inputs) for the NI, NOI, MM 1958 and MM 1963 valuations at one debt level, sweep() over a grid of leverage,
   traditional(rows, …) for a schedule of Kd and Ke, arbitrage(…) for MM's switch between two identical firms.   UI part: def + register.
   Node-testable: require('app/js/labs/cap-structure.js') exposes {solve, sweep, traditional, arbitrage, compute, def}.
   Formulas follow the ICAI Study Material (July 2024 edition, ch. 5):
     NI      S = (EBIT − I) / Ke, V = S + D, Ko = EBIT / V                                  (Illustrations 1, 2)
     NOI     V = EBIT / Ko, S = V − D, Ke = (EBIT − I) / S                                  (Illustration 4)
     MM 1958 Vl = Vu = NOI / Ko, Ke = Ko + (Ko − Kd) D / S                                  (Practical problems 7, 8(a), 9)
     MM 1963 Vl = Vu + t D, Ke = Keu + (Keu − Kd)(1 − t) D / S, Ko = Keu (1 − t D / V)      (Illustration 10, problem 8(b))
     Arbitrage: sell the dearer firm's shares, borrow (or lend) in proportion, buy the cheaper firm's shares (Illustrations 6 – 9) */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  /* ------------------------------------------------------------------ number formats (₹ with Indian grouping, % to two decimals) */
  const EPS = 1e-9;
  const r2 = x => Math.round(x * 100) / 100;
  const grp = (n, d) => Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  /** money: whole rupees from ₹1,00,000 up (the Study Material rounds S to the rupee), else up to two decimals; '₹ lakh' keeps two decimals */
  function money(n, unit) {
    if (!Number.isFinite(n)) return '—';
    const neg = n < 0 ? '−' : '', a = Math.abs(n);
    if (unit === 'lakh') return `${neg}₹${grp(r2(a), 2)} lakh`;
    return neg + '₹' + grp(a >= 1e5 ? Math.round(a) : r2(a), 2);
  }
  const pc = x => (Number.isFinite(x) ? (x * 100).toFixed(2) + '%' : '—');          // a computed rate
  const gv = x => +(+x).toFixed(4) + '%';                                            // a given rate, as typed (16%, 12.5%)
  const pp = x => +(x * 100).toFixed(2) + '%';                                       // a share (D/V) without trailing zeros

  /* ------------------------------------------------------------------ the four valuations at one debt level */
  /** p: {ebit, kd, ke, ko, keu, t, vu?, debt?, share?} with rates as fractions; share = D/V (0 ≤ share < 1) replaces debt when given.
      Returns {D, I, NI, S, V, Ke, Kd, Kdt, Ko, share, Vu, TB, EBT, tax, ebit}. Throws Error('plain message') on input that has no answer. */
  function solve(mode, p) {
    const kd = +p.kd, t = mode === 'mmtax' ? +p.t : 0;
    const byShare = p.share != null;
    const sh = byShare ? +p.share : null;
    if (byShare && !(sh >= 0 && sh < 1)) throw new Error('Debt as a share of firm value must be at least 0% and below 100%.');
    if (!byShare && !(+p.debt >= 0)) throw new Error('Debt cannot be negative.');
    if (!(kd > 0)) throw new Error('Give the interest rate on debt (Kd) as a positive percentage.');
    let ebit = +p.ebit, D, V, S, Vu = null, TB = 0;
    if (mode === 'ni') {
      const ke = +p.ke;
      if (!(ke > 0)) throw new Error('Give the equity capitalisation rate Ke as a positive percentage.');
      if (!(kd < ke)) throw new Error('Under the NI approach debt is the cheaper source: make Kd lower than Ke.');
      if (!(ebit > 0)) throw new Error('EBIT must be positive.');
      if (byShare) { V = ebit / (ke * (1 - sh) + kd * sh); D = sh * V; S = V - D; }
      else {
        D = +p.debt;
        if (!(ebit - kd * D > EPS)) throw new Error(`The interest (${gv(kd * 100)} of the debt) would swallow the whole EBIT: reduce the debt below ${money(ebit / kd)}.`);
        S = (ebit - kd * D) / ke; V = S + D;
      }
      const I = kd * D, NI = ebit - I;
      return { mode, ebit, D, I, NI, EBT: NI, tax: 0, S, V, Ke: ke, Kd: kd, Kdt: kd, Ko: ebit / V, share: D / V, Vu, TB };
    }
    if (mode === 'noi' || mode === 'mm') {
      const ko = +p.ko;
      if (!(ko > 0)) throw new Error('Give the overall capitalisation rate Ko as a positive percentage.');
      if (!(kd < ko)) throw new Error('Debt is the cheaper source in these approaches: make Kd lower than Ko.');
      if (!(ebit > 0)) throw new Error('EBIT must be positive.');
      V = ebit / ko; Vu = V;
      D = byShare ? sh * V : +p.debt;
      if (!(V - D > EPS)) throw new Error(`The debt must be less than the value of the firm (EBIT ÷ Ko = ${money(V)}).`);
      S = V - D;
      const I = kd * D, NI = ebit - I;
      return { mode, ebit, D, I, NI, EBT: NI, tax: 0, S, V, Ke: NI / S, Kd: kd, Kdt: kd, Ko: ko, share: D / V, Vu, TB };
    }
    if (mode === 'mmtax') {
      const keu = +p.keu;
      if (!(keu > 0)) throw new Error('Give the cost of equity of the unlevered firm (Keu) as a positive percentage.');
      if (!(t >= 0 && t < 1)) throw new Error('The tax rate must be at least 0% and below 100%.');
      if (!(kd < keu)) throw new Error('Debt is the cheaper source: make Kd lower than Keu.');
      if (p.vu != null) { Vu = +p.vu; if (!(Vu > 0)) throw new Error('The value of the unlevered firm must be positive.'); ebit = Vu * keu / (1 - t); }
      else { if (!(ebit > 0)) throw new Error('EBIT must be positive.'); Vu = ebit * (1 - t) / keu; }
      if (byShare) { V = Vu / (1 - t * sh); D = sh * V; }
      else { D = +p.debt; V = Vu + t * D; }
      TB = t * D; S = V - D;
      if (!(S > EPS)) throw new Error(`The debt is too large: the levered firm's equity would be worth nothing (keep the debt below ${money(Vu / (1 - t))}).`);
      const I = kd * D, EBT = ebit - I, tax = t * EBT, NI = EBT - tax, Kdt = kd * (1 - t);
      const Ke = NI / S;
      return { mode, ebit, D, I, NI, EBT, tax, S, V, Ke, Kd: kd, Kdt, Ko: Ke * S / V + Kdt * D / V, share: D / V, Vu, TB };
    }
    throw new Error('Unknown approach: ' + mode);
  }

  /** the leverage grid of the charts: D/V = 0, 10 %, … up to 80 % (further when the chosen debt lies beyond), plus the chosen share */
  function sweep(mode, p, chosen) {
    const top = Math.min(0.95, Math.max(0.8, Math.ceil((chosen - 1e-9) * 10) / 10));
    const xs = [];
    for (let k = 0; k / 10 <= top + 1e-9; k++) xs.push(k / 10);
    const at = xs.findIndex(x => Math.abs(x - chosen) < 0.004);     // the chosen level replaces a grid point it nearly matches
    if (at >= 0) xs[at] = chosen; else xs.push(chosen);
    xs.sort((a, b) => a - b);
    return xs.map(x => Object.assign(solve(mode, Object.assign({}, p, { share: x, debt: null })), { mine: x === chosen }));
  }

  /** Traditional approach (Illustration 3; MTP May 2025 Series 2 Q2(b)): rows [[debt, kd%, ke%], …]. basis 'market': S = (EBIT − I)/Ke,
      V = S + D, Ko = EBIT/V; basis 'book': weights D/C and (C − D)/C on a fixed capital C. mm: the Ke MM would require at each level,
      Ko = EBIT/C (book) or the all-equity Ke (market), E = C − D (book) or V0 − D (market). Optimum = the first row with the lowest Ko */
  function traditional(rows, o) {
    const basis = o.basis === 'book' ? 'book' : 'market', ebit = +o.ebit, C = +o.cap;
    if (!rows.length) throw new Error('Add at least two debt levels to the schedule.');
    if (rows.length < 2) throw new Error('The traditional approach compares debt levels: add at least two rows.');
    if (basis === 'market' && !(ebit > 0)) throw new Error('EBIT must be positive.');
    if (basis === 'book' && !(C > 0)) throw new Error('Give the total (book) capital, a positive amount.');
    const out = rows.map((r, i) => {
      const D = +r[0], kd = +r[1] / 100, ke = +r[2] / 100;
      if (!(D >= 0)) throw new Error(`Row ${i + 1}: debt cannot be negative.`);
      if (!(ke > 0)) throw new Error(`Row ${i + 1}: give the cost of equity Ke as a positive percentage.`);
      if (D > 0 && !(kd > 0)) throw new Error(`Row ${i + 1}: give the interest rate on the debt.`);
      if (basis === 'book') {
        if (!(D < C)) throw new Error(`Row ${i + 1}: debt must be less than the total capital ${money(C)}.`);
        const wd = D / C, we = 1 - wd;
        return { D, kd: D > 0 ? kd : null, ke, wd, we, E: C - D, Ko: ke * we + (D > 0 ? kd * wd : 0), share: wd };
      }
      const I = D > 0 ? kd * D : 0, NI = ebit - I;
      if (!(NI > EPS)) throw new Error(`Row ${i + 1}: the interest ${money(I)} leaves nothing for the equity holders out of EBIT ${money(ebit)}.`);
      const S = NI / ke, V = S + D;
      return { D, kd: D > 0 ? kd : null, ke, I, NI, S, V, E: S, Ko: ebit / V, share: D / V, we: S / V, wd: D / V };
    });
    for (let i = 1; i < out.length; i++) if (!(out[i].D > out[i - 1].D)) throw new Error('List the debt levels from the smallest to the largest, each larger than the one before.');
    let best = 0;
    out.forEach((r, i) => { if (r.Ko < out[best].Ko - 1e-12) best = i; });
    let mm = null;
    if (o.mm) {
      const base = basis === 'book' ? C : out[0].D === 0 ? out[0].V : null;
      if (base) {
        const ko = basis === 'book' ? ebit / C : out[0].ke;
        if (basis === 'book' && !(ebit > 0)) throw new Error('MM needs the EBIT (net operating income): give a positive EBIT.');
        mm = { ko, base, rows: out.map(r => { const E = base - r.D; return { D: r.D, E, kd: r.kd, ke: r.D > 0 ? ko + (ko - r.kd) * r.D / E : ko, de: r.D / E }; }) };
        if (mm.rows.some(r => r.D > 0 && !(r.E > EPS))) throw new Error('Under MM the debt must stay below the value of the firm.');
      }
    }
    return { basis, rows: out, best, mm };
  }

  /** MM arbitrage between a levered firm L and an unlevered firm U with the same EBIT (no tax). method 'all' invests all the proceeds
      (Illustrations 7, 9: the increase in annual income); 'same' keeps the same income and frees cash (Illustrations 6, 8). alpha = the
      investor's share of the over-valued firm. */
  function arbitrage(p) {
    const ebit = +p.ebit, D = +p.debt, kd = +p.kd, kL = +p.keL, kU = +p.keU, a = +p.alpha, method = p.method === 'same' ? 'same' : 'all';
    if (!(ebit > 0)) throw new Error('EBIT must be positive.');
    if (!(D > 0)) throw new Error('The levered firm needs some debt.');
    if (!(kd > 0)) throw new Error('Give the interest rate on debt as a positive percentage.');
    if (!(kL > 0) || !(kU > 0)) throw new Error('Give both costs of equity as positive percentages.');
    if (!(a > 0 && a <= 1)) throw new Error("The investor's holding must be more than 0% and at most 100%.");
    const I = kd * D, NIL = ebit - I;
    if (!(NIL > EPS)) throw new Error(`The interest ${money(I)} swallows the levered firm's EBIT: reduce its debt.`);
    const SL = NIL / kL, VL = SL + D, SU = ebit / kU, VU = SU;
    const r = { ebit, D, kd, kL, kU, alpha: a, method, I, NIL, SL, VL, SU, VU };
    if (Math.abs(VL - VU) < 0.005) return Object.assign(r, { dir: 'none', gain: 0, surplus: 0 });
    if (VL > VU) {                                        // L is dear: sell L, borrow α·D (personal leverage), buy U
      const sell = a * SL, borrow = a * D, before = a * NIL;
      if (method === 'all') {
        const buy = sell + borrow, incU = buy * kU, interest = borrow * kd, after = incU - interest;
        return Object.assign(r, { dir: 'LtoU', sell, borrow, buy, incU, interest, after, before, gain: after - before, surplus: 0 });
      }
      const funds = sell + borrow, buy = a * VU, surplus = funds - buy, incU = a * ebit, interest = borrow * kd, after = incU - interest;
      return Object.assign(r, { dir: 'LtoU', sell, borrow, funds, buy, incU, interest, after, before, gain: 0, surplus });
    }
    const sell = a * SU, before = sell * kU;              // U is dear: sell U, buy L's shares and lend in L's proportions
    if (method === 'all') {
      const lend = sell * D / VL, buyE = sell * SL / VL, incE = buyE * kL, incD = lend * kd, after = incE + incD;
      return Object.assign(r, { dir: 'UtoL', sell, lend, buyE, incE, incD, after, before, gain: after - before, surplus: 0 });
    }
    const buyE = a * SL, lend = a * D, cost = buyE + lend, surplus = sell - cost, incE = a * NIL, incD = lend * kd, after = incE + incD;
    return Object.assign(r, { dir: 'UtoL', sell, lend, buyE, cost, incE, incD, after, before, gain: 0, surplus });
  }

  /* ------------------------------------------------------------------ drawing helpers */
  const NAMES = { ni: 'Net Income (NI) approach', noi: 'Net Operating Income (NOI) approach', trad: 'Traditional approach', mm: 'MM 1958 (without tax)', mmtax: 'MM 1963 (with corporate tax)', arb: 'MM arbitrage' };
  const niceStep = x => { const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; };
  function axisPct(maxY) {
    const step = maxY > 40 ? 10 : maxY > 16 ? 5 : 2, top = Math.max(step, Math.ceil((maxY * 1.08) / step) * step);
    const ticks = []; for (let v = 0; v <= top + 1e-9; v += step) ticks.push([v, v + '%']);
    return { y: [0, top], yticks: ticks };
  }
  const xAxis = (top, book) => {
    const T = Math.round(top * 100), ticks = []; for (let v = 0; v <= T; v += 10) ticks.push([v, v + '%']);
    return { x: [0, T], xticks: ticks, xlabel: book ? 'debt as % of the book capital (D/C)' : 'debt as % of firm value (D/V)' };
  };
  function costPlot(pts, o) {
    const A = axisPct(o.maxY), X = xAxis(o.top, o.book);
    const series = [
      { label: 'Ke (equity)', color: 'd', dots: true, pts: pts.ke },
      { label: 'Ko (overall)', color: 'a', dots: true, pts: pts.ko },
      { label: o.kdLabel || 'Kd (debt)', color: 'b', dots: true, pts: pts.kd }
    ];
    if (pts.mm) series.push({ label: 'Ke under MM', color: 'c', dash: true, dots: true, pts: pts.mm });
    return Object.assign({ type: 'plot', title: o.title || 'Cost of capital as debt replaces equity', alt: 'Ke, Kd and Ko plotted against leverage', w: 560, h: 290, ylabel: 'cost of capital', legend: 'top-left', clip: true, series, points: o.points || [] }, A, X);
  }
  function valuePlot(pts, o) {
    const X = xAxis(o.top, false), step = niceStep(Math.max(o.maxV, 1) * 1.1 / 5), top = Math.ceil((o.maxV * 1.08) / step) * step;
    const ticks = []; for (let v = 0; v <= top + 1e-6; v += step) ticks.push([v, o.unit === 'lakh' ? grp(v, 2) : '₹' + grp(v, 0)]);
    return Object.assign({ type: 'plot', title: 'Value of the firm and of its equity', alt: 'V and S plotted against leverage', w: 560, h: 270, ylabel: o.unit === 'lakh' ? '₹ lakh' : undefined, legend: 'bottom-left', clip: true,
      y: [0, top], yticks: ticks, series: [{ label: 'V = S + D', color: 'a', dots: true, pts: pts.v }, { label: 'S (equity)', color: 'd', dots: true, pts: pts.s }], points: o.points || [] }, X);
  }
  const ptsOf = (rows, k) => rows.map(r => [r.share * 100, r[k] * 100]);
  /** a statement table: rows [item, formula, value]; the newest row (k) highlighted */
  function stmt(title, rows, k) {
    const cells = {};
    if (k != null && k >= 0) [0, 1, 2].forEach(c => (cells[k + ',' + c] = 'hl'));
    return { type: 'table', title, head: ['Item', 'Formula', 'Value'], rows: rows.map(r => r.slice(0, 3)), cells, align: ['left', 'left', 'right'] };
  }

  /* ------------------------------------------------------------------ scalar modes: NI, NOI, MM 1958, MM 1963 */
  function rateInputs(v) {
    const p = { ebit: +v.ebit, kd: +v.kd / 100, ke: +v.ke / 100, ko: +v.ko / 100, keu: +v.keu / 100, t: +v.tax / 100 };
    if (v.mode === 'mmtax' && v.start === 'vu') { p.vu = +v.vu; p.ebit = null; }
    if (v.dmode === 'pct') p.share = +v.share / 100; else p.debt = +v.debt;
    return p;
  }
  function statementRows(R, v) {
    const u = v.unit, m = x => money(x, u), mode = v.mode, pct = v.dmode === 'pct';
    const rows = [];                       // [item, formula, value, caption, given?]
    const add = (item, f, val, cap, given) => rows.push([item, f, val, cap, !!given]);
    if (mode === 'ni') {
      add('EBIT', 'given', m(R.ebit), '', true);
      add('Equity capitalisation rate Ke', 'given', gv(v.ke), '', true);
      add('Interest rate on debt Kd', 'given', gv(v.kd), '', true);
      if (pct) {
        add('Debt as a share of value D/V', 'given', gv(v.share), '', true);
        add('Value of the firm V', 'EBIT ÷ [Ke × (1 − D/V) + Kd × D/V]', m(R.V), `Under the NI approach Ke and Kd stay fixed, so Ko is simply their mix: ${gv(v.ke)} × ${pp(1 - R.share)} + ${gv(v.kd)} × ${pp(R.share)}, and V = EBIT ÷ that = **${m(R.V)}**.`);
        add('Market value of debt D', 'D/V × V', m(R.D), `${pp(R.share)} of ${m(R.V)} is debt: **${m(R.D)}**.`);
      } else add('Market value of debt D', 'given', m(R.D), '', true);
      add('Less: interest on debt', `${gv(v.kd)} × ${m(R.D)}`, m(R.I), `Interest is a fixed charge, paid before the equity holders get anything: ${gv(v.kd)} × ${m(R.D)} = **${m(R.I)}**.`);
      add('Earnings for equity holders (NI)', 'EBIT − interest', m(R.NI), `What is left is the net income for equity: ${m(R.ebit)} − ${m(R.I)} = **${m(R.NI)}** (no tax in this approach, and all of it is paid out).`);
      add('Market value of equity S', 'NI ÷ Ke', m(R.S), `The NI approach says the market capitalises the equity earnings at the same ${gv(v.ke)} whatever the debt, so S = ${m(R.NI)} ÷ ${gv(v.ke)} = **${m(R.S)}**.`);
      if (!pct) add('Value of the firm V', 'S + D', m(R.V), `The firm is worth its equity plus its debt: V = ${m(R.S)} + ${m(R.D)} = **${m(R.V)}**.`);
      add('Overall cost of capital Ko', 'EBIT ÷ V', pc(R.Ko), `Ko = EBIT ÷ V = ${m(R.ebit)} ÷ ${m(R.V)} = **${pc(R.Ko)}**: below Ke because ${pp(R.share)} of the firm is financed by debt costing only ${gv(v.kd)}.`);
      return rows;
    }
    if (mode === 'noi' || mode === 'mm') {
      const mmL = mode === 'mm';
      add(mmL ? 'Net operating income (NOI = EBIT)' : 'EBIT (net operating income)', 'given', m(R.ebit), '', true);
      add(mmL ? 'Ko (= Ke of an unlevered firm, same risk class)' : 'Overall capitalisation rate Ko', 'given', gv(v.ko), '', true);
      add('Interest rate on debt Kd', 'given', gv(v.kd), '', true);
      if (pct) add('Debt as a share of value D/V', 'given', gv(v.share), '', true);
      else add('Market value of debt D', 'given', m(R.D), '', true);
      add(mmL ? 'Value of the firm VL = Vu' : 'Value of the firm V', 'EBIT ÷ Ko', m(R.V), mmL
        ? `MM proposition I: in a perfect market without tax a firm is worth its NOI capitalised at its risk class's rate, debt or no debt: ${m(R.ebit)} ÷ ${gv(v.ko)} = **${m(R.V)}**.`
        : `The NOI approach capitalises the whole operating income at Ko, so the mix of debt and equity does not enter: V = ${m(R.ebit)} ÷ ${gv(v.ko)} = **${m(R.V)}**.`);
      if (pct) add('Market value of debt D', 'D/V × V', m(R.D), `${pp(R.share)} of ${m(R.V)} is debt: **${m(R.D)}**.`);
      add('Market value of equity S', 'V − D', m(R.S), `Equity is the residue: S = ${m(R.V)} − ${m(R.D)} = **${m(R.S)}**.`);
      add('Less: interest on debt', `${gv(v.kd)} × ${m(R.D)}`, m(R.I), `Interest comes off first: ${gv(v.kd)} × ${m(R.D)} = **${m(R.I)}**.`);
      add('Earnings for equity holders', 'EBIT − interest', m(R.NI), `The equity holders get ${m(R.ebit)} − ${m(R.I)} = **${m(R.NI)}**.`);
      add('Cost of equity Ke', 'earnings for equity ÷ S', pc(R.Ke), `Ke = ${m(R.NI)} ÷ ${m(R.S)} = **${pc(R.Ke)}**, higher than Ko: the equity holders now carry the financial risk of the fixed interest.`);
      add('Check: Ke = Ko + (Ko − Kd) × D/S', `${gv(v.ko)} + ${pp(R.Ko - R.Kd)} × ${r2(R.D / R.S).toFixed(2)}`, pc(R.Ko + (R.Ko - R.Kd) * R.D / R.S),
        `The same Ke from ${mmL ? 'MM proposition II' : 'the NOI relation'}: Ko plus a premium (Ko − Kd) for every rupee of debt per rupee of equity = **${pc(R.Ko + (R.Ko - R.Kd) * R.D / R.S)}**.`);
      add('Overall cost of capital Ko', 'Ke × S/V + Kd × D/V', pc(R.Ke * R.S / R.V + R.Kd * R.D / R.V), `Weighting back: ${pc(R.Ke)} × ${pp(R.S / R.V)} + ${gv(v.kd)} × ${pp(R.share)} = **${pc(R.Ke * R.S / R.V + R.Kd * R.D / R.V)}**, the Ko we started from: leverage changed Ke, not Ko.`);
      return rows;
    }
    /* MM 1963 */
    const t = v.tax;
    if (v.start === 'vu') {
      add('Value of the unlevered firm Vu', 'given', m(R.Vu), '', true);
      add('Cost of equity of the unlevered firm Keu', 'given', gv(v.keu), '', true);
      add('Tax rate t', 'given', gv(t), '', true);
      add('Earnings after tax of the unlevered firm', 'Vu × Keu', m(R.Vu * (+v.keu / 100)), `With a 100% payout the unlevered firm's equity is its earnings capitalised at Keu, so its earnings after tax are ${m(R.Vu)} × ${gv(v.keu)} = **${m(R.Vu * (+v.keu / 100))}**.`);
      add('EBIT', 'EAT ÷ (1 − t)', m(R.ebit), `Gross up for tax: EBIT = ${m(R.Vu * (+v.keu / 100))} ÷ (1 − ${gv(t)}) = **${m(R.ebit)}**, the same for both firms.`);
    } else {
      add('EBIT', 'given', m(R.ebit), '', true);
      add('Cost of equity of the unlevered firm Keu', 'given', gv(v.keu), '', true);
      add('Tax rate t', 'given', gv(t), '', true);
      add('Value of the unlevered firm Vu', 'EBIT × (1 − t) ÷ Keu', m(R.Vu), `An all-equity firm keeps ${m(R.ebit * (1 - t / 100))} after tax and the market capitalises it at Keu: Vu = **${m(R.Vu)}**.`);
    }
    add('Interest rate on debt Kd', 'given', gv(v.kd), '', true);
    if (pct) {
      add('Debt as a share of value D/V', 'given', gv(v.share), '', true);
      add('Value of the levered firm VL', 'Vu ÷ (1 − t × D/V)', m(R.V), `VL = Vu + t × D and D = (D/V) × VL, so VL = ${m(R.Vu)} ÷ (1 − ${gv(t)} × ${pp(R.share)}) = **${m(R.V)}**.`);
      add('Debt D', 'D/V × VL', m(R.D), `${pp(R.share)} of ${m(R.V)} is debt: **${m(R.D)}**.`);
      add('Tax advantage of debt', 't × D', m(R.TB), `Interest is tax-deductible, so (debt taken as permanent) the government in effect pays ${gv(t)} of the debt's cost: tax shield = ${gv(t)} × ${m(R.D)} = **${m(R.TB)}**.`);
    } else {
      add('Debt D', 'given', m(R.D), '', true);
      add('Tax advantage of debt', 't × D', m(R.TB), `Interest is tax-deductible, so (debt taken as permanent) the present value of the tax saved is t × D = ${gv(t)} × ${m(R.D)} = **${m(R.TB)}**.`);
      add('Value of the levered firm VL', 'Vu + t × D', m(R.V), `MM 1963: VL = Vu + tax advantage = ${m(R.Vu)} + ${m(R.TB)} = **${m(R.V)}**: debt now adds value.`);
    }
    add('Market value of equity S', 'VL − D', m(R.S), `S = ${m(R.V)} − ${m(R.D)} = **${m(R.S)}**.`);
    add('Less: interest on debt', `${gv(v.kd)} × ${m(R.D)}`, m(R.I), `Interest ${gv(v.kd)} × ${m(R.D)} = **${m(R.I)}** comes off before tax.`);
    add('Earnings before tax', 'EBIT − interest', m(R.EBT), `EBT = ${m(R.ebit)} − ${m(R.I)} = **${m(R.EBT)}**.`);
    add('Less: tax', `${gv(t)} × EBT`, m(R.tax), `Tax at ${gv(t)} of EBT = **${m(R.tax)}**: lower than the unlevered firm's because the interest is deductible.`);
    add('Income for equity holders', 'EBT − tax', m(R.NI), `Left for the equity holders: **${m(R.NI)}**.`);
    add('Cost of equity Ke', 'income for equity ÷ S', pc(R.Ke), `Ke = ${m(R.NI)} ÷ ${m(R.S)} = **${pc(R.Ke)}**; the formula Keu + (Keu − Kd)(1 − t) × D/S gives the same.`);
    add('After-tax cost of debt', 'Kd × (1 − t)', pc(R.Kdt), `Each rupee of interest costs only ${pp(1 - t / 100)} of a rupee after tax: ${gv(v.kd)} × (1 − ${gv(t)}) = **${pc(R.Kdt)}**.`);
    add('Overall cost of capital Ko', 'Ke × S/V + Kd(1 − t) × D/V', pc(R.Ko), `Ko = ${pc(R.Ke)} × ${pp(R.S / R.V)} + ${pc(R.Kdt)} × ${pp(R.share)} = **${pc(R.Ko)}**, the same as Keu × (1 − t × D/V): below Keu because of the tax shield.`);
    return rows;
  }

  function sweepCaption(mode, r, prev, v, first) {
    const u = v.unit, m = x => money(x, u), at = `**D/V = ${pp(r.share)}**`;
    if (mode === 'ni') {
      if (first) return `Now hold EBIT, Ke and Kd fixed and change only the mix. ${at}: an all-equity firm, so Ko = Ke = ${gv(v.ke)} and V = EBIT ÷ Ke = ${m(r.V)}.`;
      return `${at}: Ko = ${gv(v.ke)} × ${pp(1 - r.share)} + ${gv(v.kd)} × ${pp(r.share)} = ${pc(r.Ko)} and V = EBIT ÷ Ko = ${m(r.V)}. More of the cheap debt and an unchanged Ke: Ko falls and V rises.`;
    }
    if (mode === 'noi' || mode === 'mm') {
      if (first) return `Now hold EBIT, Ko and Kd fixed and change only the mix. ${at}: all equity, so Ke = Ko = ${gv(v.ko)} and V = ${m(r.V)}.`;
      return mode === 'mm'
        ? `${at}: V stays ${m(r.V)}; Ke = Ko + (Ko − Kd) × D/S = ${gv(v.ko)} + ${pp(r.Ko - r.Kd)} × ${r2(r.D / r.S).toFixed(2)} = ${pc(r.Ke)}. If a levered firm were priced higher, investors would sell it, borrow on their own account and buy the unlevered one (arbitrage) until the values matched.`
        : `${at}: V stays EBIT ÷ Ko = ${m(r.V)}, so S = V − D = ${m(r.S)}; the equity holders now carry interest, and Ke rises to ${pc(r.Ke)}. The cheaper debt is exactly offset by the dearer equity: Ko stays ${gv(v.ko)}.`;
    }
    const t = v.tax;
    if (first) return `Now hold EBIT, Keu, Kd and the tax rate fixed and change only the mix. ${at}: the unlevered firm, V = Vu = ${m(r.V)} and Ko = Keu = ${gv(v.keu)}.`;
    return `${at}: VL = Vu ÷ (1 − ${gv(t)} × ${pp(r.share)}) = ${m(r.V)}; Ko = Keu × (1 − t × D/V) = ${pc(r.Ko)}; Ke = Keu + (Keu − Kd)(1 − t) × D/S = ${pc(r.Ke)}. Each step adds tax shield, so V keeps rising and Ko keeps falling.`;
  }

  function computeScalar(v) {
    const mode = v.mode, R = solve(mode, rateInputs(v)), u = v.unit, m = x => money(x, u);
    const p = rateInputs(v);
    const S = sweep(mode, p, R.share);
    const top = S[S.length - 1].share > 0.8 + 1e-9 ? Math.ceil(S[S.length - 1].share * 10) / 10 : 0.8;
    const yTop = Math.max(0.8, Math.min(R.share, 0.9));               // a near-100% debt would flatten the chart: the axis stops at 90%
    const maxY = Math.max(...S.filter(r => r.share <= yTop + 1e-9).map(r => Math.max(r.Ke, r.Kd))) * 100;
    const maxV = Math.max(...S.map(r => r.V));
    const kdLabel = mode === 'mmtax' ? 'Kd after tax' : 'Kd (debt)';
    const kdKey = mode === 'mmtax' ? 'Kdt' : 'Kd';
    const plotsUpTo = (n, mark) => {
      const rows = S.slice(0, n);
      const pts = { ke: ptsOf(rows, 'Ke'), ko: ptsOf(rows, 'Ko'), kd: ptsOf(rows.filter(r => r.share > 0 || mode !== 'mmtax'), kdKey) };
      const pos = R.share < 0.15 ? 'right' : R.share > 0.6 ? 'left' : 'below';
      const cp = { maxY, top, kdLabel, points: mark ? [{ x: R.share * 100, y: R.Ko * 100, label: `Ko ${pc(R.Ko)}`, pos }] : [] };
      const vp = { maxV, top, unit: u, points: mark ? [{ x: R.share * 100, y: R.V, label: `V ${m(R.V)}`, pos }] : [] };
      return [costPlot(pts, cp), valuePlot({ v: rows.map(r => [r.share * 100, r.V]), s: rows.map(r => [r.share * 100, r.S]) }, vp)];
    };
    const rows = statementRows(R, v);
    const title = `${NAMES[mode]}: the statement at your debt`;
    const nGiven = rows.filter(r => r[4]).length;
    const frames = [];
    const view0 = stmt(title, rows.filter(r => r[4]).map(r => r.slice(0, 3)), null);
    frames.push({ caption: `**${NAMES[mode]}.** ${{ ni: 'Debt and equity have fixed costs (Kd and Ke) whatever the mix, so cheaper debt lowers Ko and lifts the value.', noi: 'The market values the firm as a whole at Ko, so the mix is irrelevant: any saving from cheap debt is eaten by a dearer equity.', mm: 'Perfect markets, no tax: value and Ko do not depend on the mix, and arbitrage enforces it.', mmtax: 'With corporate tax, interest saves tax, so debt adds a tax shield of t × D to the value.' }[mode]} Press ▶ to build the statement line by line, as in the ICAI answer.`, view: [view0] });
    const shownRows = rows.filter(r => r[4]).map(r => r.slice(0, 3));
    rows.forEach(r => {
      if (r[4]) return;
      shownRows.push(r.slice(0, 3));
      frames.push({ caption: r[3], view: [stmt(title, shownRows.slice(), shownRows.length - 1)] });
    });
    const sweepRows = [];
    S.forEach((r, i) => {
      sweepRows.push(r);
      const tbl = sweepTable(sweepRows, mode, u, true);
      frames.push({ caption: sweepCaption(mode, r, S[i - 1], v, i === 0) + (r.mine ? ' ← this is your debt level.' : ''), view: plotsUpTo(i + 1, false).concat([tbl]) });
    });
    const conclusion = {
      ni: `**NI approach:** Ko falls and V rises all the way, so the theory says use as much debt as possible. At your debt (D/V = ${pp(R.share)}) V = **${m(R.V)}** and Ko = **${pc(R.Ko)}**.`,
      noi: `**NOI approach:** V and Ko are flat lines and Ke climbs: the capital structure is irrelevant. At your debt Ke = **${pc(R.Ke)}**, S = **${m(R.S)}**, V = **${m(R.V)}**.`,
      mm: `**MM without tax:** V and Ko do not move with leverage; Ke rises linearly with D/S. At your debt Ke = **${pc(R.Ke)}**, S = **${m(R.S)}**, V = **${m(R.V)}**, Ko = **${pc(R.Ko)}**.`,
      mmtax: `**MM with tax:** the tax shield makes VL = Vu + tD rise and Ko fall with debt. At your debt VL = **${m(R.V)}** (Vu ${m(R.Vu)} + shield ${m(R.TB)}), Ke = **${pc(R.Ke)}**, Ko = **${pc(R.Ko)}**.`
    }[mode];
    frames.push({ caption: conclusion, view: plotsUpTo(S.length, true).concat([stmt(title, rows.map(r => r.slice(0, 3)), null)]) });
    const stats = [];
    if (mode === 'mmtax') {
      stats.push({ label: 'Value of the levered firm', value: m(R.V), hint: 'VL = Vu + t × D' });
      stats.push({ label: 'Tax advantage t × D', value: m(R.TB), hint: 'present value of the tax shield on permanent debt' });
    } else stats.push({ label: 'Value of the firm V', value: m(R.V), hint: mode === 'ni' ? 'V = S + D, S = (EBIT − I) ÷ Ke' : 'V = EBIT ÷ Ko' });
    stats.push({ label: 'Market value of equity S', value: m(R.S), hint: mode === 'ni' ? 'S = (EBIT − interest) ÷ Ke' : 'S = V − D' });
    stats.push({ label: 'Cost of equity Ke', value: pc(R.Ke), hint: mode === 'ni' ? 'given: constant under NI' : mode === 'mmtax' ? 'Keu + (Keu − Kd)(1 − t) × D/S' : 'Ko + (Ko − Kd) × D/S' });
    stats.push({ label: 'Overall cost of capital Ko', value: pc(R.Ko), hint: mode === 'mmtax' ? 'Keu × (1 − t × D/V)' : 'EBIT ÷ V' });
    stats.push({ label: 'Debt in the mix D/V', value: pp(R.share), hint: 'market value of debt ÷ value of the firm' });
    return { frames, stats, table: sweepTable(S, mode, u, false), note: noteFor(mode), sim: { mode, R, sweep: S }, given: [view0] };
  }
  function sweepTable(rows, mode, u, forStage) {
    const head = ['D/V', 'Debt D', 'Equity S', 'Value V', 'Ke', mode === 'mmtax' ? 'Kd after tax' : 'Kd', 'Ko'];
    const body = rows.map(r => {
      const cells = [pp(r.share), money(r.D, u), money(r.S, u), money(r.V, u), pc(r.Ke), pc(mode === 'mmtax' ? r.Kdt : r.Kd), pc(r.Ko)];
      return forStage ? cells : r.mine ? { cls: 'avgrow', cells } : cells;
    });
    if (!forStage) return { head, rows: body };
    const cells = {};
    rows.forEach((r, i) => { if (r.mine) cells[i + ',0'] = 'hl'; });
    cells[(rows.length - 1) + ',6'] = 'a';
    return { type: 'table', title: 'The same firm at each level of debt', head, rows: body, cells, align: ['right', 'right', 'right', 'right', 'right', 'right', 'right'] };
  }

  /* ------------------------------------------------------------------ traditional schedule */
  function computeTrad(v) {
    const u = v.unit, m = x => money(x, u), book = v.basis === 'book';
    const rowsIn = (v.sched || []).filter(r => r && r.some(x => String(x).trim() !== '')).map(r => [+r[0], +r[1], +r[2]]);
    const T = traditional(rowsIn, { basis: v.basis, ebit: +v.ebit, cap: +v.cap, mm: !!v.mmcmp });
    const R = T.rows, best = R[T.best];
    const top = Math.max(0.3, Math.ceil(Math.max(...R.map(r => r.share)) * 10 - 1e-9) / 10);
    const maxY = Math.max(...R.map(r => Math.max(r.ke, r.kd || 0)), ...(T.mm ? T.mm.rows.map(r => r.ke) : [0])) * 100;
    const maxV = book ? 0 : Math.max(...R.map(r => r.V));
    const head = book ? ['Debt', 'D/C', 'Kd', 'Ke', 'Ke × We', 'Kd × Wd', 'Ko'] : ['Debt', 'Interest', 'Equity S', 'Value V', 'D/V', 'Kd', 'Ke', 'Ko'];
    const rowCells = r => book
      ? [m(r.D), pp(r.wd), r.kd == null ? '—' : gv(r.kd * 100), gv(r.ke * 100), (r.ke * r.we * 100).toFixed(2) + '%', r.kd == null ? '—' : (r.kd * r.wd * 100).toFixed(2) + '%', pc(r.Ko)]
      : [m(r.D), m(r.I), m(r.S), m(r.V), pp(r.share), r.kd == null ? '—' : gv(r.kd * 100), gv(r.ke * 100), pc(r.Ko)];
    const sched = (n, hlRow, bestRow) => {
      const cells = {};
      if (hlRow != null) head.forEach((_, c) => (cells[hlRow + ',' + c] = 'hl'));
      if (bestRow != null) head.forEach((_, c) => (cells[bestRow + ',' + c] = 'ok'));
      return { type: 'table', title: book ? `Traditional approach: WACC at book weights (capital ${m(+v.cap)})` : 'Traditional approach: value and WACC at each level of debt', head, rows: R.slice(0, n).map(rowCells), cells, align: head.map((_, i) => (i ? 'right' : 'left')) };
    };
    const given0 = { type: 'table', title: 'The schedule (given)', head: ['Debt', 'Kd', 'Ke'], rows: R.map(r => [m(r.D), r.kd == null ? '—' : gv(r.kd * 100), gv(r.ke * 100)]), align: ['left', 'right', 'right'] };
    const plots = (n, mmN, mark) => {
      const rows = R.slice(0, n);
      const pts = { ke: rows.map(r => [r.share * 100, r.ke * 100]), ko: rows.map(r => [r.share * 100, r.Ko * 100]), kd: rows.filter(r => r.kd != null).map(r => [r.share * 100, r.kd * 100]) };
      if (T.mm && mmN) pts.mm = T.mm.rows.slice(0, mmN).map((r, i) => [R[i].share * 100, r.ke * 100]);
      const out = [costPlot(pts, { maxY, top, book, title: 'Ke, Kd and Ko along the schedule', points: mark ? [{ x: best.share * 100, y: best.Ko * 100, label: `lowest Ko ${pc(best.Ko)}`, pos: best.share > 0.5 ? 'left' : 'below' }] : [] })];
      if (!book) out.push(valuePlot({ v: rows.map(r => [r.share * 100, r.V]), s: rows.map(r => [r.share * 100, r.S]) }, { maxV, top, unit: u, points: mark ? [{ x: best.share * 100, y: best.V, label: `highest V ${m(best.V)}`, pos: best.share > 0.5 ? 'left' : 'below' }] : [] }));
      return out;
    };
    const frames = [{ caption: `**Traditional approach.** Up to a point debt is cheap and equity holders hardly react, so Ko falls; beyond it both Kd and Ke climb and Ko rises again. ${book ? 'Weights are book values of a fixed capital.' : 'Each level is valued as the market would: S = (EBIT − interest) ÷ Ke, V = S + D, Ko = EBIT ÷ V.'} Press ▶ to work down the schedule.`, view: [given0] }];
    let lo = 0;
    R.forEach((r, i) => {
      const lower = i === 0 || r.Ko < R[lo].Ko - 1e-12;
      let cap;
      if (book) cap = `**Debt ${m(r.D)}** is ${pp(r.wd)} of the capital: Ko = ${gv(r.ke * 100)} × ${(r.we).toFixed(2)}${r.kd == null ? '' : ` + ${gv(r.kd * 100)} × ${r.wd.toFixed(2)}`} = **${pc(r.Ko)}**.`;
      else cap = r.D === 0 ? `**No debt:** the equity earns the whole EBIT ${m(r.ebit || +v.ebit)}, S = ${m(r.NI)} ÷ ${gv(r.ke * 100)} = ${m(r.S)} = V, so **Ko = Ke = ${pc(r.Ko)}**.`
        : `**Debt ${m(r.D)}** at ${gv(r.kd * 100)}: interest ${m(r.I)}, S = ${m(r.NI)} ÷ ${gv(r.ke * 100)} = ${m(r.S)}, V = ${m(r.V)}, **Ko = ${pc(r.Ko)}**.`;
      if (i > 0) cap += lower ? ' Lower than before: the cheaper debt still outweighs the rise in the rates.' : r.Ko > R[i - 1].Ko + 1e-12 ? ' Ko rises: lenders and equity holders now charge more for the extra financial risk than the cheap debt saves.' : ' Ko is no lower than the best level so far.';
      if (lower) lo = i;
      frames.push({ caption: cap, view: plots(i + 1, 0, false).concat([sched(i + 1, i, null)]) });
    });
    if (T.mm) {
      T.mm.rows.forEach((r, i) => {
        const cap = i === 0 ? `**MM for comparison:** Ko would stay ${pc(T.mm.ko)} (EBIT ÷ ${book ? 'capital' : 'the all-equity value'}) at every level, with Ke rising to absorb all the risk. No debt: Ke = Ko = ${pc(T.mm.ko)}.`
          : `**MM at debt ${m(r.D)}:** Ke = Ko + (Ko − Kd) × D/E = ${pc(T.mm.ko)} + (${pc(T.mm.ko)} − ${gv(r.kd * 100)}) × ${r.de.toFixed(4)} = **${pc(r.ke)}**.`;
        frames.push({ caption: cap, view: plots(R.length, i + 1, false).concat([mmTable(T, i + 1, m)]) });
      });
    }
    const why = book ? `(D/C = ${pp(best.wd)})` : `(D/V = ${pp(best.share)})`;
    frames.push({ caption: `**Optimum capital structure:** debt **${m(best.D)}** ${why}, where Ko is lowest (**${pc(best.Ko)}**)${book ? '' : ` and the value of the firm highest (**${m(best.V)}**)`}. Below it, more debt still lowers Ko; above it, the rising Kd and Ke push Ko back up.`, view: plots(R.length, T.mm ? T.mm.rows.length : 0, true).concat([sched(R.length, null, T.best)]).concat(T.mm ? [mmTable(T, T.mm.rows.length, m)] : []) });
    const stats = [{ label: 'Optimum debt', value: m(best.D), hint: 'the level with the lowest Ko' }, { label: 'Lowest Ko', value: pc(best.Ko), hint: book ? 'Ke × We + Kd × Wd (book weights)' : 'EBIT ÷ V' }];
    if (!book) stats.push({ label: 'Highest value V', value: m(best.V), hint: 'S + D at the optimum' });
    stats.push({ label: book ? 'Debt share at optimum D/C' : 'Debt share at optimum D/V', value: pp(best.share) });
    const table = { head, rows: R.map((r, i) => (i === T.best ? { cls: 'avgrow', cells: rowCells(r) } : rowCells(r))) };
    if (T.mm) { table.head = head.concat(['Ke under MM']); table.rows = R.map((r, i) => { const c = rowCells(r).concat([pc(T.mm.rows[i].ke)]); return i === T.best ? { cls: 'avgrow', cells: c } : c; }); }
    let note = noteFor('trad', book);
    if (v.mmcmp && !T.mm) note += ' The MM column needs a first row with no debt (the all-equity firm sets Ko when weights are market values).';
    return { frames, stats, table, note, sim: { mode: 'trad', T, best }, given: [given0] };
  }
  function mmTable(T, n, m) {
    return { type: 'table', title: `MM: Ke = Ko + (Ko − Kd) × D/E with Ko = ${pc(T.mm.ko)}`, head: ['Debt', 'Equity E', 'D/E', 'Kd', 'Ke under MM'], rows: T.mm.rows.slice(0, n).map(r => [m(r.D), m(r.E), r.de.toFixed(4), r.kd == null ? '—' : gv(r.kd * 100), pc(r.ke)]),
      cells: { [(n - 1) + ',4']: 'hl' }, align: ['left', 'right', 'right', 'right', 'right'] };
  }

  /* ------------------------------------------------------------------ arbitrage */
  function computeArb(v) {
    const u = v.unit, m = x => money(x, u);
    const A = arbitrage({ ebit: +v.ebit, debt: +v.debtLev, kd: +v.kd / 100, keL: +v.keLev / 100, keU: +v.keUnlev / 100, alpha: +v.hold / 100, method: v.switch });
    const al = pp(A.alpha);
    const valRows = [
      ['EBIT', m(A.ebit), m(A.ebit)],
      [`Less: interest (${gv(v.kd)} × ${m(A.D)})`, m(A.I), 'Nil'],
      ['Earnings for equity holders', m(A.NIL), m(A.ebit)],
      ['Ke', gv(v.keLev), gv(v.keUnlev)],
      ['Value of equity S (earnings ÷ Ke)', m(A.SL), m(A.SU)],
      ['Debt D', m(A.D), 'Nil'],
      ['Value of firm V = S + D', m(A.VL), m(A.VU)]
    ];
    const valTable = (n, hl, verdict) => {
      const cells = {};
      if (hl) hl.forEach(i => [0, 1, 2].forEach(c => (cells[i + ',' + c] = 'hl')));
      if (verdict && A.dir !== 'none') cells['6,' + (A.dir === 'LtoU' ? 1 : 2)] = 'bad';
      return { type: 'table', title: 'Valuation of the two firms', head: ['Particulars', 'Levered firm', 'Unlevered firm'], rows: valRows.slice(0, n), cells, align: ['left', 'right', 'right'] };
    };
    const given0 = { type: 'table', title: 'Two firms, same EBIT and business risk (given)', head: ['Particulars', 'Levered firm', 'Unlevered firm'],
      rows: [['EBIT', m(A.ebit), m(A.ebit)], ['Debt', `${m(A.D)} at ${gv(v.kd)}`, 'Nil'], ['Ke', gv(v.keLev), gv(v.keUnlev)], ["Investor's holding", A.dir === 'UtoL' ? '—' : al, A.dir === 'UtoL' ? al : '—']], align: ['left', 'right', 'right'] };
    const frames = [{ caption: `**MM arbitrage.** Two firms with the same EBIT and business risk should be worth the same; if the market prices one higher, its shareholders can switch and do better, and their switching restores the balance. Press ▶ to value the firms and follow the investor.`, view: [given0] }];
    frames.push({ caption: `Both firms earn EBIT ${m(A.ebit)}. The levered firm first pays interest ${gv(v.kd)} × ${m(A.D)} = ${m(A.I)}, leaving **${m(A.NIL)}** for its equity holders; the unlevered firm's equity gets all ${m(A.ebit)}.`, view: [valTable(3, [1, 2])] });
    frames.push({ caption: `The market capitalises each firm's equity earnings at its own Ke: S(L) = ${m(A.NIL)} ÷ ${gv(v.keLev)} = **${m(A.SL)}**, S(U) = ${m(A.ebit)} ÷ ${gv(v.keUnlev)} = **${m(A.SU)}**.`, view: [valTable(5, [3, 4])] });
    const dear = A.dir === 'LtoU' ? 'levered' : 'unlevered', cheap = A.dir === 'LtoU' ? 'unlevered' : 'levered';
    if (A.dir === 'none') {
      frames.push({ caption: `V(L) = ${m(A.VL)} = V(U): the two firms are already worth the same, which is exactly MM's equilibrium. No investor can gain by switching.`, view: [valTable(7, [5, 6])] });
      return { frames, stats: [{ label: 'Value of levered firm', value: m(A.VL) }, { label: 'Value of unlevered firm', value: m(A.VU) }, { label: 'Gain from switching', value: m(0) }], table: { head: ['Particulars', 'Levered firm', 'Unlevered firm'], rows: valRows }, note: noteFor('arb'), sim: { mode: 'arb', A }, given: [given0] };
    }
    frames.push({ caption: `V = S + D: levered **${m(A.VL)}**, unlevered **${m(A.VU)}**. The ${dear} firm is valued higher for the same EBIT and risk, so it is over-valued: the investor holding ${al} of its shares should switch to the ${cheap} firm.`, view: [valTable(7, [5, 6], true)] });
    const lanes = ['Levered firm', 'Investor', 'Unlevered firm'];
    const LN = A.dir === 'LtoU' ? 'Levered firm' : 'Unlevered firm', OTHER = A.dir === 'LtoU' ? 'Unlevered firm' : 'Levered firm';
    const ev = [], mv = [];
    const step = (cap, e, rowsAdd) => {
      if (e) ev.push(...[].concat(e));
      if (rowsAdd) mv.push(...rowsAdd);
      const cells = {}; for (let i = mv.length - (rowsAdd ? rowsAdd.length : 0); i < mv.length; i++) [0, 1, 2].forEach(c => (cells[i + ',' + c] = 'hl'));
      frames.push({ caption: cap, view: [{ type: 'seq', title: "The investor's switch", lanes, events: ev.slice(), laneColors: { 'Levered firm': 'd', Investor: 'a', 'Unlevered firm': 'b' }, w: 480 },
        { type: 'table', title: A.method === 'all' ? 'Investment and change in return' : 'Same income, less money', head: ['Step', 'Formula', 'Amount'], rows: mv.slice(), cells, align: ['left', 'left', 'right'] }, valTable(7, null, true)] });
    };
    if (A.dir === 'LtoU') {
      step(`**Sell** the ${al} stake in the levered firm: ${al} × ${m(A.SL)} = **${m(A.sell)}**.`, { from: 'Investor', to: LN, text: `sells ${al}: ${m(A.sell)}` }, [['Sell shares in the levered firm', `${m(A.SL)} × ${al}`, m(A.sell)]]);
      step(`**Borrow** ${al} of the levered firm's debt on personal account: ${al} × ${m(A.D)} = **${m(A.borrow)}** at ${gv(v.kd)}. Personal leverage replaces the firm's leverage, so the investor's financial risk stays the same.`, { lane: 'Investor', text: `borrows ${m(A.borrow)} at ${gv(v.kd)}` }, [['Borrow (personal leverage)', `${m(A.D)} × ${al}`, m(A.borrow)]]);
      if (A.method === 'all') {
        step(`**Buy** shares of the unlevered firm with all the money: ${m(A.sell)} + ${m(A.borrow)} = **${m(A.buy)}**.`, { from: 'Investor', to: OTHER, text: `buys shares: ${m(A.buy)}` }, [['Buy shares in the unlevered firm', 'sale + loan', m(A.buy)]]);
        step(`The unlevered shares earn ${gv(v.keUnlev)}: ${m(A.buy)} × ${gv(v.keUnlev)} = ${m(A.incU)}; less interest on the loan ${m(A.borrow)} × ${gv(v.kd)} = ${m(A.interest)}; **net ${m(A.after)}**.`, [{ from: OTHER, to: 'Investor', text: `earns ${m(A.incU)}` }, { lane: 'Investor', text: `pays interest ${m(A.interest)}` }],
          [['Income from the unlevered shares', `${m(A.buy)} × ${gv(v.keUnlev)}`, m(A.incU)], ['Less: interest on the loan', `${m(A.borrow)} × ${gv(v.kd)}`, m(A.interest)], ['Net income after the switch', 'income − interest', m(A.after)]]);
        step(`Before the switch the stake earned ${m(A.sell)} × ${gv(v.keLev)} = ${m(A.before)}. Same risk, more income: the investor gains **${m(A.gain)}** a year.`, { lane: 'Investor', text: `${m(A.after)} vs ${m(A.before)}`, kind: 'ok' },
          [['Less: income from the levered firm before', `${m(A.sell)} × ${gv(v.keLev)}`, m(A.before)], ['Increase in annual income', 'after − before', m(A.gain)]]);
      } else {
        step(`**Buy** ${al} of the unlevered firm: ${al} × ${m(A.VU)} = **${m(A.buy)}**, out of the ${m(A.funds)} raised; **${m(A.surplus)}** is left over.`, { from: 'Investor', to: OTHER, text: `buys ${al}: ${m(A.buy)}` },
          [['Total money raised', 'sale + loan', m(A.funds)], [`Buy ${al} of the unlevered firm`, `${m(A.VU)} × ${al}`, m(A.buy)], ['Surplus cash', 'raised − invested', m(A.surplus)]]);
        step(`Income: ${al} of the unlevered firm's ${m(A.ebit)} = ${m(A.incU)}, less interest ${m(A.borrow)} × ${gv(v.kd)} = ${m(A.interest)}: **${m(A.after)}**, exactly what the levered stake earned (${al} × ${m(A.NIL)}). Same income, same risk, and **${m(A.surplus)}** of cash to spare.`,
          [{ from: OTHER, to: 'Investor', text: `earns ${m(A.incU)}` }, { lane: 'Investor', text: `keeps ${m(A.surplus)} spare`, kind: 'ok' }],
          [['Income from the unlevered shares', `${m(A.ebit)} × ${al}`, m(A.incU)], ['Less: interest on the loan', `${m(A.borrow)} × ${gv(v.kd)}`, m(A.interest)], ['Income after the switch (same as before)', `${m(A.NIL)} × ${al}`, m(A.after)]]);
      }
    } else {
      step(`**Sell** the ${al} stake in the unlevered firm: ${al} × ${m(A.SU)} = **${m(A.sell)}**.`, { from: 'Investor', to: LN, text: `sells ${al}: ${m(A.sell)}` }, [['Sell shares in the unlevered firm', `${m(A.SU)} × ${al}`, m(A.sell)]]);
      if (A.method === 'all') {
        const dv = A.D / A.VL;
        step(`To keep the unlevered firm's (zero) financial risk, hold the levered firm's debt and equity in its own proportions, ${m(A.D)} : ${m(A.SL)}: **lend ${pp(dv)}** of the money (${m(A.lend)}) at ${gv(v.kd)} and **buy shares** with ${pp(1 - dv)} (${m(A.buyE)}).`,
          [{ lane: 'Investor', text: `lends ${m(A.lend)} at ${gv(v.kd)}` }, { from: 'Investor', to: OTHER, text: `buys shares: ${m(A.buyE)}` }],
          [['Lend money', `${m(A.sell)} × ${pp(dv)}`, m(A.lend)], ['Buy shares in the levered firm', `${m(A.sell)} × ${pp(1 - dv)}`, m(A.buyE)]]);
        step(`Income: shares ${m(A.buyE)} × ${gv(v.keLev)} = ${m(A.incE)}, interest received ${m(A.lend)} × ${gv(v.kd)} = ${m(A.incD)}: **${m(A.after)}** in all.`, [{ from: OTHER, to: 'Investor', text: `earns ${m(A.incE)}` }, { lane: 'Investor', text: `interest in ${m(A.incD)}` }],
          [['Income from the levered shares', `${m(A.buyE)} × ${gv(v.keLev)}`, m(A.incE)], ['Interest on money lent', `${m(A.lend)} × ${gv(v.kd)}`, m(A.incD)], ['Total income after the switch', 'shares + interest', m(A.after)]]);
        step(`Before, the stake earned ${m(A.sell)} × ${gv(v.keUnlev)} = ${m(A.before)}. The switch adds **${m(A.gain)}** a year at the same risk.`, { lane: 'Investor', text: `${m(A.after)} vs ${m(A.before)}`, kind: 'ok' },
          [['Less: income from the unlevered firm before', `${m(A.sell)} × ${gv(v.keUnlev)}`, m(A.before)], ['Increase in annual income', 'after − before', m(A.gain)]]);
      } else {
        step(`**Buy** ${al} of the levered firm's equity (${m(A.buyE)}) and ${al} of its debt (${m(A.lend)}), so the investor owns ${al} of the whole firm: cost **${m(A.cost)}**, leaving **${m(A.surplus)}** spare.`,
          [{ from: 'Investor', to: OTHER, text: `buys ${al} of S and D: ${m(A.cost)}` }],
          [[`Buy ${al} of the levered firm's equity`, `${m(A.SL)} × ${al}`, m(A.buyE)], [`Buy ${al} of its debt (lend)`, `${m(A.D)} × ${al}`, m(A.lend)], ['Surplus cash', 'sale − cost', m(A.surplus)]]);
        step(`Income: interest ${m(A.lend)} × ${gv(v.kd)} = ${m(A.incD)} plus ${al} of the equity earnings ${m(A.NIL)} = ${m(A.incE)}: **${m(A.after)}**, the same as the old ${al} of ${m(A.ebit)}. Same income, and **${m(A.surplus)}** freed.`,
          [{ from: OTHER, to: 'Investor', text: `earns ${m(A.after)}` }, { lane: 'Investor', text: `keeps ${m(A.surplus)} spare`, kind: 'ok' }],
          [['Interest on the debt held', `${m(A.lend)} × ${gv(v.kd)}`, m(A.incD)], ["Share of the levered firm's equity earnings", `${m(A.NIL)} × ${al}`, m(A.incE)], ['Income after the switch (same as before)', 'interest + share', m(A.after)]]);
      }
    }
    step(`**Equilibrium:** every holder of the ${dear} firm does the same, so its share price falls while the ${cheap} firm's rises, until V(L) = V(U). That is MM's behavioural proof that, without taxes, the capital structure cannot change the value of the firm.`,
      { note: `selling ${dear} and buying ${cheap} until V(L) = V(U)`, over: lanes }, null);
    const stats = [{ label: 'Value of levered firm', value: m(A.VL), hint: 'S + D, S = (EBIT − interest) ÷ Ke' }, { label: 'Value of unlevered firm', value: m(A.VU), hint: 'EBIT ÷ Ke' }];
    if (A.method === 'all') stats.push({ label: 'Increase in annual income', value: m(A.gain), hint: 'income after the switch − income before' });
    else stats.push({ label: 'Surplus cash freed', value: m(A.surplus), hint: 'money raised − cost of the same income' });
    stats.push({ label: 'Income after the switch', value: m(A.after) });
    return { frames, stats, table: { head: ['Step', 'Formula', 'Amount'], rows: mv }, note: noteFor('arb'), sim: { mode: 'arb', A }, given: [given0] };
  }

  /* ------------------------------------------------------------------ notes */
  function noteFor(mode, book) {
    if (mode === 'arb') return '**Conventions.** No taxes and perfect markets, as in MM 1958. Each share earns its firm\'s Ke on its market value (100% payout), and the investor borrows or lends at the firm\'s interest rate. The investor holds shares of the over-valued firm; the lab finds which firm that is from the two values. With "invests all" the answer is the increase in annual income (Illustrations 7 and 9); with "keeps the income" it is the cash left over (Illustrations 6 and 8).';
    if (mode === 'mmtax') return '**Conventions.** MM 1963: value of the levered firm = value of the unlevered firm + t × D (the debt is taken as permanent). Ke = Keu + (Keu − Kd)(1 − t) × D/S with Kd before tax, and Ko uses the after-tax cost of debt Kd(1 − t), as in the Study Material. Debt is valued at its book amount. The charts vary D/V with EBIT, Keu, Kd and the tax rate fixed.';
    if (mode === 'mm') return '**Conventions.** MM 1958: perfect capital markets, no taxes and a 100% payout. Ko is the cost of equity of an unlevered firm in the same risk class. Debt is valued at its book amount. The charts vary D/V with EBIT, Ko and Kd fixed.';
    if (mode === 'trad') return '**Conventions.** No taxes and a 100% payout, as the Study Material assumes for these theories. ' + (book ? 'Book weights: debt ÷ total capital and equity ÷ total capital, the capital being fixed (Illustration 3, MTP May 2025 Series 2).' : 'Market weights: S = (EBIT − interest) ÷ Ke at each level, V = S + D and Ko = EBIT ÷ V.') + ' The optimum is the level with the lowest Ko; on a tie the smaller debt is taken.';
    return '**Conventions.** No taxes and a 100% payout, as the Study Material assumes for these theories. Debt is valued at its book amount and costs its interest rate Kd. The charts vary D/V with EBIT and the given rates fixed.';
  }

  /* ------------------------------------------------------------------ compute */
  let lastMode = 'ni';
  function compute(v) {
    const mode = NAMES[v.mode] ? v.mode : 'ni';
    const out = mode === 'trad' ? computeTrad(v) : mode === 'arb' ? computeArb(v) : computeScalar(Object.assign({}, v, { mode }));
    lastMode = mode;
    return out;
  }

  /* ------------------------------------------------------------------ presets */
  const L = 100000;
  const presets = [
    { label: 'Tapri Tea Co. Ltd: Dev Malhotra prices ₹30 lakh of 10% debentures under the NI approach', values: { mode: 'ni', unit: 'rs', ebit: 8 * L, kd: 10, ke: 16, dmode: 'amt', debt: 30 * L } },
    { label: 'Study Material Illustration 1 (Rupa Ltd): NI approach, value of the firm and Ko', values: { mode: 'ni', unit: 'rs', ebit: 5 * L, kd: 10, ke: 16, dmode: 'amt', debt: 20 * L } },
    { label: 'Study Material Illustration 4 (Amita Ltd): NOI approach, value of the firm and Ke', values: { mode: 'noi', unit: 'rs', ebit: 5 * L, kd: 10, ko: 15, dmode: 'amt', debt: 15 * L } },
    { label: 'Study Material Illustration 5 (Alpha Ltd, 50% debt in a no-tax world): implied cost of equity', values: { mode: 'mm', unit: 'rs', ebit: 3.6 * L, kd: 8, ko: 18, dmode: 'pct', share: 50 } },
    { label: 'RTP May 2026 Q6(a) / RTP Sep 2024 Q7(a) (A Ltd and B Ltd): MM without tax', values: { mode: 'mm', unit: 'rs', ebit: 18 * L, kd: 12, ko: 18, dmode: 'amt', debt: 54 * L } },
    { label: 'Practical problem 7 (Sanghmani Ltd, one-third debt): cost of equity under MM', values: { mode: 'mm', unit: 'rs', ebit: 16 * L, kd: 10, ko: 16, dmode: 'pct', share: 33.3333 } },
    { label: 'RTP May 2026 Q6(b) (A Ltd and B Ltd): MM with 40% tax', values: { mode: 'mmtax', unit: 'rs', start: 'ebit', ebit: 18 * L, keu: 18, kd: 12, tax: 40, dmode: 'amt', debt: 54 * L } },
    { label: 'PYQ May 2025 Q3(b) (Z Ltd buys back ₹300 lakh of equity with 12% debentures): MM with tax', values: { mode: 'mmtax', unit: 'lakh', start: 'vu', vu: 1400, keu: 18, kd: 12, tax: 30, dmode: 'amt', debt: 300 } },
    { label: 'Study Material Illustration 10 (Blue Ltd, ₹275 lakh of 15% debentures): MM with tax', values: { mode: 'mmtax', unit: 'lakh', start: 'vu', vu: 1750, keu: 20, kd: 15, tax: 30, dmode: 'amt', debt: 275 } },
    { label: 'RTP Sep 2024 Q6 (ABC Ltd and XYZ Ltd, tax advantage 25%): equity value, Ke and WACC', values: { mode: 'mmtax', unit: 'rs', start: 'vu', vu: 1000 * L, keu: 20, kd: 10, tax: 25, dmode: 'amt', debt: 400 * L } },
    { label: 'MTP May 2025 Series 2 Q2(b) (Zordon Ltd): traditional approach at book values, with MM', values: { mode: 'trad', unit: 'rs', basis: 'book', ebit: 5 * L, cap: 50 * L, mmcmp: true,
      sched: [[0, 0, 10], [5 * L, 6, 10.5], [10 * L, 6, 11], [15 * L, 6.2, 11.3], [20 * L, 7, 12.4], [25 * L, 7.5, 13.5], [30 * L, 8, 16]] } },
    { label: 'Study Material Illustration 3: optimal capital structure from seven options', values: { mode: 'trad', unit: 'rs', basis: 'book', ebit: 13 * L, cap: 100 * L, mmcmp: false,
      sched: [[0, 11, 13], [10 * L, 11, 13], [20 * L, 11.6, 14], [30 * L, 12, 15], [40 * L, 13, 16], [50 * L, 15, 18], [60 * L, 18, 20]] } },
    { label: 'Practical problem 9 (Leo Ltd): equity capitalisation rate under MM at book values', values: { mode: 'trad', unit: 'rs', basis: 'book', ebit: 21.6 * L, cap: 120 * L, mmcmp: true,
      sched: [[0, 0, 12], [10 * L, 7, 12.5], [20 * L, 7, 13], [30 * L, 7.5, 13.5], [40 * L, 7.5, 14], [50 * L, 8, 15], [60 * L, 8.5, 16], [70 * L, 9, 17], [80 * L, 10, 20]] } },
    { label: 'Tapri Tea Co. Ltd: Dev tests six debt levels at market values (traditional approach)', values: { mode: 'trad', unit: 'rs', basis: 'market', ebit: 8 * L, mmcmp: false,
      sched: [[0, 0, 12], [10 * L, 8, 12.4], [20 * L, 8.5, 13], [30 * L, 9.5, 14.5], [40 * L, 11, 17], [50 * L, 13, 21]] } },
    { label: 'PYQ May 2024 Q2(b): a 12% holder of the levered firm switches (invest all the proceeds)', values: { mode: 'arb', unit: 'rs', ebit: 25000, debtLev: 75000, kd: 8, keLev: 12.5, keUnlev: 12.5, hold: 12, switch: 'all' } },
    { label: 'PYQ May 2024 Q2(b), second method: keep the same income and free cash', values: { mode: 'arb', unit: 'rs', ebit: 25000, debtLev: 75000, kd: 8, keLev: 12.5, keUnlev: 12.5, hold: 12, switch: 'same' } },
    { label: 'RTP May 2024 Q3 / MTP Sep 2026 Series 1 Q1(a): a 20% holder of the levered firm switches', values: { mode: 'arb', unit: 'rs', ebit: 45000, debtLev: 150000, kd: 10, keLev: 12.5, keUnlev: 12.5, hold: 20, switch: 'all' } },
    { label: 'Study Material Illustration 9: the unlevered firm is dearer, a 15% holder switches and lends', values: { mode: 'arb', unit: 'rs', ebit: 30000, debtLev: 100000, kd: 10, keLev: 20, keUnlev: 12.5, hold: 15, switch: 'all' } },
    { label: 'Study Material Illustration 8 (U Ltd and L Ltd): same income from a cheaper levered firm', values: { mode: 'arb', unit: 'rs', ebit: 20000, debtLev: 100000, kd: 7, keLev: 18, keUnlev: 10, hold: 10, switch: 'same' } }
  ];

  /* ------------------------------------------------------------------ challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const near = x => Math.abs(x - Math.round(x)) < 0.3 || Math.abs(x - Math.round(x)) > 0.7;   // a rupee answer that rounds one way only
  function gen(r) {
    const mode = lastMode;
    for (let k = 0; k < 60; k++) {
      let v;
      if (mode === 'ni' || mode === 'noi' || mode === 'mm') {
        const ebit = pick(r, [2, 3, 4, 5, 6, 8, 9, 10, 12]) * L, kd = pick(r, [8, 9, 10, 11, 12]);
        const rate = kd + pick(r, [3, 4, 5, 6, 8]);
        v = { mode, unit: 'rs', ebit, kd, ke: rate, ko: rate, dmode: 'amt', debt: pick(r, [5, 10, 15, 20, 25, 30]) * L, q: pick(r, mode === 'ni' ? ['v', 'ko'] : ['ke', 's']) };
        if (mode === 'mm' && r() < 0.35) { v.dmode = 'pct'; v.share = pick(r, [20, 25, 40, 50, 60]); v.q = 'ke'; }
      } else if (mode === 'mmtax') {
        const keu = pick(r, [15, 16, 18, 20]), t = pick(r, [25, 30, 40]), kd = pick(r, [8, 10, 12]);
        v = { mode, unit: 'lakh', start: 'vu', vu: pick(r, [500, 800, 1000, 1200, 1400, 1500, 2000]), keu, kd, tax: t, dmode: 'amt', debt: pick(r, [100, 150, 200, 250, 300, 400]), q: pick(r, ['v', 'ke', 'ko']) };
        if (r() < 0.4) { v.unit = 'rs'; v.start = 'ebit'; v.ebit = pick(r, [6, 9, 12, 15, 18]) * L; v.debt = pick(r, [10, 20, 30, 40]) * L; }
      } else if (mode === 'trad') {
        const book = r() < 0.5, n = 6, step = pick(r, [5, 10]) * L, kd0 = pick(r, [6, 7, 8]), ke0 = pick(r, [10, 11, 12, 13]);
        const a = pick(r, [0.2, 0.3, 0.4, 0.5]), b = pick(r, [0.2, 0.25, 0.3, 0.4]);
        const sched = Array.from({ length: n }, (_, i) => [i * step, i ? +(kd0 + 0.5 * Math.max(0, i - 2) + 0.25 * Math.max(0, i - 3)).toFixed(2) : 0, +(ke0 + a * i + b * i * i).toFixed(2)]);
        v = { mode, unit: 'rs', basis: book ? 'book' : 'market', cap: 10 * step, ebit: pick(r, [1.2, 1.5, 2]) * 10 * step * ke0 / 100 / 1.2, mmcmp: false, sched, q: pick(r, ['debt', 'ko']) };
        v.ebit = Math.round(v.ebit / 1000) * 1000;
      } else {
        const ebit = pick(r, [20, 25, 30, 40, 45, 50, 60]) * 1000, D = pick(r, [50, 75, 100, 150]) * 1000, kd = pick(r, [6, 7, 8, 10]);
        const keU = pick(r, [10, 12.5, 15]), keL = r() < 0.5 ? keU : +(keU + pick(r, [1, 2, 2.5, 5, 7.5, 8])).toFixed(1);
        v = { mode, unit: 'rs', ebit, debtLev: D, kd, keLev: keL, keUnlev: keU, hold: pick(r, [5, 10, 12, 15, 20, 25]), switch: r() < 0.6 ? 'all' : 'same' };
      }
      try {
        const res = compute(v), want = solveCh(res, v);
        if (want == null || !Number.isFinite(want) || want <= 0) continue;
        if (mode === 'arb' && res.sim.A.dir === 'none') continue;
        if (mode === 'trad') {                                    // a clear, interior optimum
          const T = res.sim.T, ko = T.rows.map(x => x.Ko).slice().sort((x, y) => x - y);
          if (T.best === 0 || T.best === T.rows.length - 1 || ko[1] - ko[0] < 0.0005) continue;
        }
        const exact = rawCh(res, v);
        if (askMoney(v) && v.unit !== 'lakh' && !near(exact)) continue;
        return v;
      } catch (e) { /* draw again */ }
    }
    return presets[{ ni: 1, noi: 2, mm: 4, mmtax: 7, trad: 10, arb: 14 }[mode]].values;
  }
  const askMoney = v => (v.mode === 'ni' && v.q === 'v') || ((v.mode === 'noi' || v.mode === 'mm') && v.q === 's') || (v.mode === 'mmtax' && v.q === 'v') || (v.mode === 'trad' && v.q === 'debt') || v.mode === 'arb';
  function qOf(res, v) {
    const s = res.sim;
    if (s.mode === 'arb') return v.switch === 'same' ? 'surplus' : 'gain';
    if (s.mode === 'trad') return v.q === 'ko' ? 'ko' : 'debt';
    if (s.mode === 'ni') return v.q === 'ko' ? 'ko' : 'v';
    if (s.mode === 'mmtax') return v.q === 'ke' || v.q === 'ko' ? v.q : 'v';
    return v.q === 's' ? 's' : 'ke';
  }
  function rawCh(res, v) {
    const s = res.sim, q = qOf(res, v);
    if (s.mode === 'arb') return q === 'surplus' ? s.A.surplus : s.A.gain;
    if (s.mode === 'trad') return q === 'ko' ? s.best.Ko * 100 : s.best.D;
    const R = s.R;
    return { v: R.V, s: R.S, ke: R.Ke * 100, ko: R.Ko * 100 }[q];
  }
  function solveCh(res, v) {
    const x = rawCh(res, v), q = qOf(res, v);
    if (q === 'ke' || q === 'ko') return r2(x);
    return v.unit === 'lakh' ? r2(x) : Math.round(x);
  }
  function prompt(v, res) {
    const u = v.unit, m = x => money(x, u), q = qOf(res, v), s = res.sim;
    const unitTxt = u === 'lakh' ? '(₹ lakh, two decimals)' : '(nearest rupee)';
    const debtTxt = v.dmode === 'pct' ? `debt makes up ${gv(v.share)} of the firm's market value` : `the firm has ${m(+v.debt)} of debt`;
    if (s.mode === 'ni') return `Under the **NI approach**: EBIT ${m(+v.ebit)}, ${debtTxt} at ${gv(v.kd)}, equity capitalisation rate ${gv(v.ke)}, no tax. What is ${q === 'ko' ? 'the **overall cost of capital Ko** (%, two decimals)' : `the **value of the firm** ${unitTxt}`}?`;
    if (s.mode === 'noi') return `Under the **NOI approach**: EBIT ${m(+v.ebit)}, overall capitalisation rate ${gv(v.ko)}, ${debtTxt} at ${gv(v.kd)}, no tax. What is ${q === 's' ? `the **market value of equity** ${unitTxt}` : 'the **cost of equity Ke** (%, two decimals)'}?`;
    if (s.mode === 'mm') return `By **MM without tax**: a levered firm earns NOI ${m(+v.ebit)}; ${debtTxt} at ${gv(v.kd)}; an identical all-equity firm has a cost of equity of ${gv(v.ko)}. What is the levered firm's ${q === 's' ? `**market value of equity** ${unitTxt}` : '**cost of equity Ke** (%, two decimals)'}?`;
    if (s.mode === 'mmtax') {
      const base = v.start === 'vu' ? `An all-equity firm is worth ${m(+v.vu)} at a cost of equity of ${gv(v.keu)}; it replaces ${m(+v.debt)} of equity with ${gv(v.kd)} debentures` : `Firm EBIT ${m(+v.ebit)}; an unlevered twin has a cost of equity of ${gv(v.keu)}; the levered firm has ${m(+v.debt)} of ${gv(v.kd)} debt`;
      return `By **MM with corporate tax** at ${gv(v.tax)}: ${base}. What is the levered firm's ${q === 'v' ? `**market value** ${unitTxt}` : q === 'ke' ? '**cost of equity Ke** (%, two decimals)' : '**overall cost of capital Ko** (%, two decimals)'}?`;
    }
    if (s.mode === 'trad') return `Under the **traditional approach**, weights at ${v.basis === 'book' ? `book values of a fixed capital of ${m(+v.cap)}` : `market values (EBIT ${m(+v.ebit)}, S = earnings for equity ÷ Ke)`} and no tax: for the schedule of debt, Kd and Ke given, ${q === 'ko' ? 'what is the **lowest overall cost of capital** (%, two decimals)?' : 'how much **debt** gives the optimum capital structure (₹)?'}`;
    const A = s.A, firm = A.dir === 'LtoU' ? 'levered' : 'unlevered';
    return `Two firms with the same business risk each earn EBIT ${m(A.ebit)}; the levered firm has ${m(A.D)} of ${gv(v.kd)} debt and Ke ${gv(v.keLev)}, the unlevered firm Ke ${gv(v.keUnlev)}; no tax. An investor holds ${gv(v.hold)} of the **${firm}** firm's shares and can borrow or lend at ${gv(v.kd)}. ${q === 'surplus' ? 'If the investor switches and keeps the same income, how much **cash is left over** (nearest rupee)?' : 'If the investor switches, investing all the proceeds at the same risk, by how much does the **annual income rise** (nearest rupee)?'}`;
  }
  function explain(res, v) {
    const s = res.sim, m = x => money(x, v.unit);
    if (s.mode === 'arb') {
      const A = s.A;
      if (A.dir === 'LtoU') return `V(L) = ${m(A.SL)} + ${m(A.D)} = ${m(A.VL)} > V(U) = ${m(A.VU)}. Sell ${pp(A.alpha)} of L for ${m(A.sell)}, borrow ${m(A.borrow)}. ` + (A.method === 'all' ? `Buy U shares for ${m(A.buy)}: income ${m(A.incU)} − interest ${m(A.interest)} = ${m(A.after)} vs ${m(A.before)} before: gain **${m(A.gain)}**.` : `Buy ${pp(A.alpha)} of U for ${m(A.buy)}: surplus **${m(A.surplus)}**, income unchanged at ${m(A.after)}.`);
      return `V(U) = ${m(A.VU)} > V(L) = ${m(A.SL)} + ${m(A.D)} = ${m(A.VL)}. Sell ${pp(A.alpha)} of U for ${m(A.sell)}. ` + (A.method === 'all' ? `Lend ${m(A.lend)}, buy L shares for ${m(A.buyE)}: income ${m(A.incE)} + ${m(A.incD)} = ${m(A.after)} vs ${m(A.before)}: gain **${m(A.gain)}**.` : `Buy ${pp(A.alpha)} of L's equity and debt for ${m(A.cost)}: surplus **${m(A.surplus)}**, income unchanged at ${m(A.after)}.`);
    }
    if (s.mode === 'trad') return `Ko at each level: ${s.T.rows.map(r => `${m(r.D)} → ${pc(r.Ko)}`).join('; ')}. The lowest is **${pc(s.best.Ko)}** at debt **${m(s.best.D)}**.`;
    const R = s.R;
    if (s.mode === 'ni') return `Interest ${m(R.I)}, NI = ${m(R.NI)}, S = NI ÷ Ke = ${m(R.S)}, V = S + D = **${m(R.V)}**, Ko = EBIT ÷ V = **${pc(R.Ko)}**.`;
    if (s.mode === 'mmtax') return `Vu = ${m(R.Vu)}, VL = Vu + t × D = ${m(R.Vu)} + ${m(R.TB)} = **${m(R.V)}**; S = ${m(R.S)}; income for equity ${m(R.NI)}, so Ke = **${pc(R.Ke)}**; Ko = Keu × (1 − t × D/V) = **${pc(R.Ko)}**.`;
    return `V = EBIT ÷ Ko = ${m(R.V)}, S = V − D = **${m(R.S)}**, earnings for equity ${m(R.NI)}, Ke = ${m(R.NI)} ÷ ${m(R.S)} = **${pc(R.Ke)}** (= Ko + (Ko − Kd) × D/S).`;
  }

  /* ------------------------------------------------------------------ the definition */
  const modeIs = (...ms) => v => ms.includes(v.mode);
  const scalar = modeIs('ni', 'noi', 'mm', 'mmtax');
  const def = {
    id: 'cap-structure', title: 'Capital Structure Theories Lab',
    blurb: 'Watch Ke, Kd, Ko and the value of the firm move with debt under NI, NOI, traditional and MM, and run MM arbitrage.',
    controls: [
      { id: 'mode', type: 'select', label: 'Theory', value: 'ni', options: [['ni', 'Net Income (NI) approach'], ['noi', 'Net Operating Income (NOI)'], ['trad', 'Traditional approach'], ['mm', 'MM 1958: without tax'], ['mmtax', 'MM 1963: with corporate tax'], ['arb', 'MM arbitrage']] },
      { id: 'unit', type: 'seg', label: 'Amounts in', value: 'rs', options: [['rs', '₹'], ['lakh', '₹ lakh']] },
      { id: 'start', type: 'seg', label: 'Start from', value: 'ebit', options: [['ebit', 'EBIT'], ['vu', 'Value of the unlevered firm']], show: modeIs('mmtax') },
      { id: 'vu', type: 'number', label: 'Value of the unlevered firm Vu', value: 1400, min: 0, max: 1e13, show: v => v.mode === 'mmtax' && v.start === 'vu' },
      { id: 'ebit', type: 'number', label: 'EBIT (net operating income)', short: 'EBIT', value: 800000, min: 0, max: 1e13,
        show: v => (v.mode === 'mmtax' ? v.start !== 'vu' : v.mode === 'trad' ? v.basis !== 'book' || !!v.mmcmp : true),
        help: 'Earnings before interest and tax. The theories assume it stays the same whatever the capital structure.' },
      { id: 'basis', type: 'seg', label: 'Weights', value: 'market', options: [['market', 'market values'], ['book', 'book values']], show: modeIs('trad'),
        help: 'Market values: S = (EBIT − interest) ÷ Ke at each level (Illustration 2). Book values: debt and equity as shares of a fixed capital (Illustration 3, MTP May 2025).' },
      { id: 'cap', type: 'number', label: 'Total capital (book)', short: 'Capital', value: 5000000, min: 0, max: 1e13, show: v => v.mode === 'trad' && v.basis === 'book' },
      { id: 'sched', type: 'table', label: 'Schedule: debt, its interest rate and the cost of equity at that debt', short: 'Schedule', max: 12, show: modeIs('trad'),
        rows: [[0, 0, 12], [1000000, 8, 12.4], [2000000, 8.5, 13], [3000000, 9.5, 14.5], [4000000, 11, 17], [5000000, 13, 21]],
        cols: [{ id: 'd', label: 'Debt (₹)', type: 'number', min: 0, max: 1e13, def: 0 }, { id: 'kd', label: 'Kd %', type: 'number', min: 0, max: 60, def: 10 }, { id: 'ke', label: 'Ke %', type: 'number', min: 0, max: 80, def: 15 }] },
      { id: 'mmcmp', type: 'toggle', label: 'Also show the Ke that MM would require at each debt level', short: 'MM comparison', value: false, show: modeIs('trad') },
      { id: 'kd', type: 'number', label: 'Interest rate on debt Kd (%)', short: 'Kd %', value: 10, min: 0, max: 60, int: false, show: v => v.mode !== 'trad',
        help: 'Before tax. In the arbitrage mode it is also the rate at which the investor borrows or lends.' },
      { id: 'ke', type: 'number', label: 'Equity capitalisation rate Ke (%)', short: 'Ke %', value: 16, min: 0, max: 80, int: false, show: modeIs('ni') },
      { id: 'ko', type: 'number', label: 'Overall capitalisation rate Ko (%)', short: 'Ko %', value: 14, min: 0, max: 80, int: false, show: modeIs('noi', 'mm'),
        help: 'Under MM this is the cost of equity of an unlevered firm in the same risk class.' },
      { id: 'keu', type: 'number', label: 'Cost of equity of the unlevered firm Keu (%)', short: 'Keu %', value: 16, min: 0, max: 80, int: false, show: modeIs('mmtax') },
      { id: 'tax', type: 'number', label: 'Corporate tax rate t (%)', short: 'Tax %', value: 25, min: 0, max: 90, int: false, show: modeIs('mmtax') },
      { id: 'dmode', type: 'seg', label: 'Debt given as', value: 'amt', options: [['amt', 'an amount'], ['pct', '% of firm value']], show: scalar },
      { id: 'debt', type: 'number', label: 'Debt D', value: 3000000, min: 0, max: 1e13, show: v => scalar(v) && v.dmode !== 'pct' },
      { id: 'share', type: 'number', label: 'Debt as % of the firm\'s market value (D/V)', short: 'D/V %', value: 40, min: 0, max: 95, int: false, show: v => scalar(v) && v.dmode === 'pct' },
      { id: 'debtLev', type: 'number', label: 'Debt of the levered firm', short: 'Levered debt', value: 3000000, min: 0, max: 1e13, show: modeIs('arb') },
      { id: 'keLev', type: 'number', label: 'Ke of the levered firm (%)', short: 'Ke levered %', value: 16, min: 0, max: 80, int: false, show: modeIs('arb') },
      { id: 'keUnlev', type: 'number', label: 'Ke of the unlevered firm (%)', short: 'Ke unlevered %', value: 14, min: 0, max: 80, int: false, show: modeIs('arb') },
      { id: 'hold', type: 'number', label: 'Investor\'s holding in the over-valued firm (%)', short: 'Holding %', value: 10, min: 0, max: 100, int: false, show: modeIs('arb') },
      { id: 'switch', type: 'seg', label: 'On switching, the investor', short: 'Switch', value: 'all', options: [['all', 'invests all'], ['same', 'keeps the income']], show: modeIs('arb'),
        help: 'Invests all: sell, borrow (or lend) in proportion and invest everything; the answer is the increase in annual income. Keeps the income: buy just enough to earn the same income; the answer is the cash left over.' }
    ],
    presets, compute,
    challenge: {
      title: 'Value the firm',
      gen, prompt, explain,
      solve: (res, v) => solveCh(res, v),
      tol: 0.01, kind: 'num',
      unit: '',
      view: res => res.given
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { solve, sweep, traditional, arbitrage, compute, def, money };
  g.__lab_def_cap_structure = def;
})(typeof window !== 'undefined' ? window : globalThis);
