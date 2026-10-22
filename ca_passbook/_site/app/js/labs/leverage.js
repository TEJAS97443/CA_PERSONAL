/* PassBook — Leverage and EBIT-EPS Lab (Paper 6A: fm.lev, fm.cs).
   Pure part: statement(o) -> the profitability statement (sales to EPS) with DOL, DFL, DCL and both break-even points;
              planOf(base, plan, t), epsAt(plan, ebit, t), indifference(a, b, t) for the EBIT-EPS analysis of financing plans.
   UI part: the def object and GA.lab.register(def) at the bottom.
   Node-testable: require('app/js/labs/leverage.js') exposes {statement, planOf, epsAt, indifference, compute, def}.
   Formulas as in the ICAI Study Material, Paper 6A (July 2024 edition): ch. 6 §2.3 (profitability statement), §3.1 DOL = contribution ÷ EBIT,
   §3.3 MOS = 1 ÷ DOL, §4.1 DFL = EBIT ÷ [(EBIT − interest) − preference dividend ÷ (1 − t)], §5.1 DCL = DOL × DFL; ch. 5 §5.2 financial
   break-even point = interest + preference dividend ÷ (1 − t), indifference point (EBIT − I₁)(1 − t) [− P₁] ÷ E₁ = (EBIT − I₂)(1 − t) [− P₂] ÷ E₂. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const UT = () => GA.util || {};
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const sg = (x, d) => (x < 0 ? '−' : '') + grp(Math.abs(x), d);                    // a signed number with Indian grouping (−1,25,000.5)
  const inr = n => (UT().inr ? UT().inr(n) : (n < 0 ? '−' : '') + '₹' + grp(Math.abs(Math.round(n * 100) / 100)));
  const r2 = x => (x < 0 ? -1 : 1) * Math.round(Math.abs(x) * 100 + 1e-7) / 100;   // half away from zero, as ICAI rounds (28.125 → 28.13)
  const r3 = x => (x < 0 ? -1 : 1) * Math.round(Math.abs(x) * 1000 + 1e-7) / 1000;
  const r4 = x => Math.round(x * 1e4) / 1e4;
  const pct = x => (x > 0 ? '+' : '') + sg(r2(x)) + '%';
  const f2 = x => (x < 0 ? '−' : '') + Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });   // EPS, MPS: two decimals always
  const rs2 = x => (x < 0 ? '−₹' : '₹') + f2(Math.abs(x));
  const pu = x => (Number.isInteger(+x) ? grp(x) : f2(x));                          // a per-unit amount: ₹20, ₹12.50
  const lvTxt = x => (Number.isFinite(x) ? sg(r3(x), 3) : 'undefined');            // leverages to three decimals, as ICAI prints them (1.875)
  const ROMAN = ['I', 'II', 'III', 'IV'];
  const tiny = (x, scale) => Math.abs(x) <= 1e-9 * Math.max(1, Math.abs(scale));

  /* ================================================================== pure helpers */
  /** a forgiving amount: '12,50,000', ' 4.5 ', '₹ 30 000' → number; '' or junk → NaN */
  function amt(x) {
    if (typeof x === 'number') return x;
    const s = String(x == null ? '' : x).replace(/[₹,\s_]/g, '').replace(/[−–—]/g, '-');
    return s === '' ? NaN : Number(s);
  }

  /** the profitability statement of SM ch. 6 §2.3. o = {sales, vc, fixed, interest, prefDiv, tax (a fraction), shares} */
  function statement(o) {
    const t = o.tax, sales = o.sales, vc = o.vc, F = o.fixed, I = o.interest || 0, Dp = o.prefDiv || 0, N = o.shares;
    if (!(sales > 0)) throw new Error('Sales must be more than zero.');
    if (!(vc >= 0)) throw new Error('Variable cost cannot be negative.');
    if (!(vc < sales)) throw new Error('Variable cost must be less than sales, or there is no contribution to cover the fixed cost.');
    if (!(F >= 0)) throw new Error('Fixed operating cost cannot be negative.');
    if (!(I >= 0) || !(Dp >= 0)) throw new Error('Interest and preference dividend cannot be negative.');
    if (!(t >= 0 && t < 1)) throw new Error('The tax rate must be at least 0% and below 100%.');
    if (!(N > 0)) throw new Error('Enter the number of equity shares (more than zero).');
    const C = sales - vc, EBIT = C - F, EBT = EBIT - I, tax = EBT * t, PAT = EBT - tax, E = PAT - Dp, EPS = E / N;
    const fbep = I + Dp / (1 - t);                          // financial break-even point: the EBIT at which EPS is zero
    const den = EBIT - fbep;                                // = EBT − Dp ÷ (1 − t)
    const DOL = tiny(EBIT, sales) ? NaN : C / EBIT;
    const DFL = tiny(den, sales) ? NaN : EBIT / den;
    const DCL = tiny(den, sales) ? NaN : C / den;
    const pv = C / sales, bep = F / pv;                     // operating break-even sales (₹)
    return { sales, vc, C, F, EBIT, I, EBT, tax, t, PAT, Dp, E, N, EPS, fbep, DOL, DFL, DCL, pv, bep, mos: (sales - bep) / sales };
  }

  /** one financing plan on top of the existing structure. base = {shares, interest, prefDiv}; p = {name, eq, price, debt, drate, pref, prate, pe} */
  function planOf(base, p, t) {
    const eq = p.eq || 0, debt = p.debt || 0, pref = p.pref || 0, drate = p.drate || 0, prate = p.prate || 0;
    if (eq < 0 || debt < 0 || pref < 0) throw new Error(`${p.name}: amounts cannot be negative.`);
    if (eq > 0 && !(p.price > 0)) throw new Error(`${p.name}: give the issue price per new equity share (face value plus any premium).`);
    if (!(drate >= 0 && drate <= 100) || !(prate >= 0 && prate <= 100)) throw new Error(`${p.name}: rates are percentages from 0 to 100.`);
    const newShares = eq > 0 ? eq / p.price : 0, N = (base.shares || 0) + newShares;
    if (!(N > 0)) throw new Error(`${p.name} leaves no equity shares: give existing shares or new equity.`);
    const newInt = debt * drate / 100, newPref = pref * prate / 100;
    const I = (base.interest || 0) + newInt, P = (base.prefDiv || 0) + newPref;
    return { name: p.name, eq, price: p.price, debt, drate, pref, prate, pe: p.pe > 0 ? p.pe : 0, newShares, N, newInt, newPref, I, P,
      fbep: I + P / (1 - t), slope: (1 - t) / N };
  }
  /** EPS of a plan at a given EBIT: [(EBIT − I)(1 − t) − P] ÷ N */
  const epsAt = (pl, ebit, t) => ((ebit - pl.I) * (1 - t) - pl.P) / pl.N;
  /** the EBIT at which two plans give the same EPS. kind: 'point' (x, eps), 'none' (same shares, different charges: one plan always wins) or 'all' */
  function indifference(a, b, t) {
    if (Math.abs(a.N - b.N) <= 1e-9 * Math.max(a.N, b.N)) {
      return Math.abs(a.fbep - b.fbep) <= 1e-6 * Math.max(1, a.fbep, b.fbep) ? { kind: 'all' } : { kind: 'none', better: a.fbep < b.fbep ? a.name : b.name };
    }
    const x = (b.N * a.fbep - a.N * b.fbep) / (b.N - a.N);   // (EBIT − B₁)(1 − t) ÷ N₁ = (EBIT − B₂)(1 − t) ÷ N₂, B = financial BEP
    return { kind: 'point', x, eps: epsAt(a, x, t), steeper: a.N < b.N ? a.name : b.name, flatter: a.N < b.N ? b.name : a.name };
  }

  /* ================================================================== drawing helpers */
  /** an axis scale for rupee amounts: lakh when the numbers are large */
  const scaleOf = m => (m >= 1e5 ? { d: 1e5, lab: '₹ lakh', w: v => grp(r2(v / 1e5)) + ' lakh' } : { d: 1, lab: '₹', w: v => grp(r2(v)) });
  /** "nice" upper bound for a positive number */
  const nice = x => { if (!(x > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; };
  /** a round top for an axis range: 1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8 or 10 × a power of ten, at or above x */
  const niceTop = x => { if (!(x > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return ([1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(k => m <= k + 1e-9) || 10) * p; };
  /** round tick values for an axis from lo to hi (about n steps, always through 0 when 0 is inside) */
  function ticksFor(lo, hi, n) {
    const st = nice((hi - lo) / (n || 5)), out = [];
    for (let x = Math.ceil(lo / st - 1e-9) * st; x <= hi + 1e-9 * st; x += st) { const y = +(Math.abs(x) < st * 1e-9 ? 0 : x).toPrecision(12); out.push([y, sg(y, 4)]); }
    return out;
  }

  /* ================================================================== mode 1: leverages from the profitability statement */
  function computeLev(v) {
    const unit = v.input !== 'total';
    let sales, vc, sDesc, vDesc;
    if (unit) {
      const q = amt(v.units), p = amt(v.price), u = amt(v.vcu);
      if (!(q > 0)) throw new Error('Enter the units sold (more than zero).');
      if (!(p > 0)) throw new Error('Enter the selling price per unit (more than zero).');
      if (!(u >= 0)) throw new Error('Variable cost per unit cannot be negative.');
      if (!(u < p)) throw new Error('The selling price must be higher than the variable cost per unit.');
      sales = q * p; vc = q * u; sDesc = `${grp(q)} × ₹${pu(p)}`; vDesc = `${grp(q)} × ₹${pu(u)}`;
    } else {
      const s = amt(v.sales), r = amt(v.vcr);
      if (!(s > 0)) throw new Error('Enter the sales (more than zero).');
      if (!(r >= 0 && r < 100)) throw new Error('The variable cost ratio is a percentage of sales from 0 to below 100.');
      sales = s; vc = s * r / 100; sDesc = ''; vDesc = `${grp(r)}% of sales`;
    }
    const debt = amt(v.debt) || 0, rate = amt(v.rate) || 0, pref = amt(v.pref) || 0, prate = amt(v.prate) || 0, taxP = amt(v.tax), ch = amt(v.change) || 0;
    if (debt < 0 || pref < 0) throw new Error('Debt and preference capital cannot be negative.');
    if (!(rate >= 0 && rate <= 100) || !(prate >= 0 && prate <= 100)) throw new Error('Interest and dividend rates are percentages from 0 to 100.');
    if (!(taxP >= 0 && taxP < 100)) throw new Error('The tax rate must be at least 0% and below 100%.');
    if (!(ch >= -100 && ch <= 1000)) throw new Error('The change in sales is a percentage from −100 to 1,000.');
    const S = statement({ sales, vc, fixed: amt(v.fixed), interest: debt * rate / 100, prefDiv: pref * prate / 100, tax: taxP / 100, shares: amt(v.shares) });
    const k = 1 + ch / 100;
    const A = ch ? statement({ sales: sales * k, vc: vc * k, fixed: S.F, interest: S.I, prefDiv: S.Dp, tax: S.t, shares: S.N }) : null;
    const chg = (a, b, scale) => (tiny(a, scale) ? NaN : (b - a) / a * 100);          // ICAI's % change, on the starting figure (a negative base flips the sign)
    const dEBIT = A ? chg(S.EBIT, A.EBIT, sales) : 0, dEPS = A ? chg(S.EPS, A.EPS, 1) : 0;
    const hasP = S.Dp > 0;
    const nm = String(v.firm || '').trim() || 'the firm', Nm = nm[0].toUpperCase() + nm.slice(1);

    /* the statement's lines, in ICAI's order (SM ch. 6 §2.3); deductions are labelled "Less:" */
    const L = [
      { k: 'sales', lab: `Sales${sDesc ? ` (${sDesc})` : ''}`, a: S.sales, b: A && A.sales, hl: 0,
        cap: `Start at the top line: sales ${sDesc ? `= ${sDesc} = ` : 'of '}${inr(S.sales)}. Every leverage measures how a change here travels down the statement to EPS.` },
      { k: 'vc', lab: `Less: Variable cost (${vDesc})`, a: S.vc, b: A && A.vc,
        cap: `Variable cost (${vDesc}) = ${inr(S.vc)}. It moves in step with sales, so it changes by the same percentage as sales.` },
      { k: 'c', lab: 'Contribution', a: S.C, b: A && A.C, hl: 1,
        cap: `Contribution = sales − variable cost = ${inr(S.C)} (P/V ratio ${sg(r2(S.pv * 100))}%). It too moves in step with sales.` },
      { k: 'f', lab: 'Less: Fixed operating cost', a: S.F, b: A && A.F,
        cap: `Fixed operating cost of ${inr(S.F)} stays the same whatever the sales. This fixed cost is the source of **operating leverage**.` },
      { k: 'ebit', lab: 'EBIT (operating profit)', a: S.EBIT, b: A && A.EBIT, hl: 1,
        cap: `EBIT = contribution − fixed cost = ${inr(S.EBIT)}.` + (S.F > 0 ? ' Because the fixed cost does not move, EBIT changes by a bigger percentage than sales.' : ' With no fixed cost, EBIT changes by exactly the same percentage as sales.') },
      { k: 'int', lab: S.I > 0 ? `Less: Interest (${grp(rate)}% × ₹${grp(debt)})` : 'Less: Interest', a: S.I, b: A && A.I,
        cap: S.I > 0 ? `Interest = ${grp(rate)}% × ${inr(debt)} = ${inr(S.I)}: a fixed financial charge, payable whatever the EBIT. It is the source of **financial leverage**.` : 'There is no debt, so no interest: nothing fixed sits between EBIT and the shareholders yet.' },
      { k: 'ebt', lab: 'EBT (profit before tax)', a: S.EBT, b: A && A.EBT, hl: 1, cap: `EBT = EBIT − interest = ${inr(S.EBT)}.` },
      { k: 'tax', lab: `Less: Tax @ ${grp(taxP)}%`, a: S.tax, b: A && A.tax,
        cap: `Tax at ${grp(taxP)}% of EBT = ${inr(S.tax)}.` + (S.EBT < 0 ? ' EBT is a loss, so the tax is a credit (shown negative): tax is a flat rate on EBT here.' : '') },
      { k: 'pat', lab: 'PAT (profit after tax)', a: S.PAT, b: A && A.PAT, hl: 1, cap: `PAT = EBT − tax = ${inr(S.PAT)}.` }
    ];
    if (hasP) {
      L.push({ k: 'pd', lab: `Less: Preference dividend (${grp(prate)}% × ₹${grp(pref)})`, a: S.Dp, b: A && A.Dp,
        cap: `Preference dividend = ${grp(prate)}% × ${inr(pref)} = ${inr(S.Dp)}. It is paid out of PAT (not tax-deductible), so it is a second fixed charge ahead of the equity shareholders.` });
      L.push({ k: 'e', lab: 'Earnings for equity shareholders', a: S.E, b: A && A.E, hl: 1, cap: `Earnings available to equity shareholders = PAT − preference dividend = ${inr(S.E)}.` });
    }
    L.push({ k: 'n', lab: 'No. of equity shares', a: S.N, b: A && A.N, n: true, cap: `${grp(S.N)} equity shares share these earnings.` });
    L.push({ k: 'eps', lab: 'EPS (₹)', a: S.EPS, b: A && A.EPS, hl: 2, eps: true, cap: `EPS = ${inr(S.E)} ÷ ${grp(S.N)} = **${rs2(S.EPS)}**.` });

    const fmtCell = (ln, x) => (ln.eps ? f2(x) : ln.n ? grp(x) : sg(r2(x)));
    const stmt = (upto, opt) => {
      opt = opt || {};
      const rows = L.slice(0, upto).map(ln => {
        const r = [ln.hl ? `**${ln.lab}**` : ln.lab, fmtCell(ln, ln.a)];
        if (opt.after) { r.push(fmtCell(ln, ln.b)); r.push(ln.k === 'n' || tiny(ln.a, ln.eps ? 1 : sales) ? '—' : ln.k === 'f' || ln.k === 'int' || ln.k === 'pd' ? '0%' : pct((ln.b - ln.a) / ln.a * 100)); }
        return r;
      });
      const cells = {};
      L.slice(0, upto).forEach((ln, i) => {
        if (ln.hl) for (let c = 0; c < rows[i].length; c++) cells[i + ',' + c] = ln.hl === 2 ? 'b' : 'hl';
        if ((opt.mark || []).includes(ln.k)) for (let c = 0; c < rows[i].length; c++) cells[i + ',' + c] = 'a';
      });
      if (upto > 0 && !opt.after) cells[(upto - 1) + ',1'] = cells[(upto - 1) + ',1'] || 'd';
      const head = ['Particulars', '₹'].concat(opt.after ? [`After ${pct(ch)} sales`, 'Change'] : []);
      return { type: 'table', title: `Profitability statement of ${nm}`, head, rows, cells, align: ['left', 'right', 'right', 'right'] };
    };
    /* the leverage working: Measure | Formula | Value (a formula table: phones stack its rows) */
    const dflF = hasP ? `EBIT ÷ [EBT − Dp ÷ (1 − t)] = ${grp(r2(S.EBIT))} ÷ (${grp(r2(S.EBT))} − ${grp(r2(S.Dp))} ÷ ${sg(r2(1 - S.t))})` : `EBIT ÷ EBT = ${sg(r2(S.EBIT))} ÷ ${sg(r2(S.EBT))}`;
    const levRows = [
      ['DOL', `Contribution ÷ EBIT = ${sg(r2(S.C))} ÷ ${sg(r2(S.EBIT))}`, lvTxt(S.DOL)],
      ['DFL', dflF, lvTxt(S.DFL)],
      ['DCL', `DOL × DFL = contribution ÷ ${hasP ? '[EBT − Dp ÷ (1 − t)]' : 'EBT'}`, lvTxt(S.DCL)]
    ];
    const levT = n => ({ type: 'table', title: 'Degrees of leverage', head: ['Measure', 'Formula', 'Value'], rows: levRows.slice(0, n), cells: { [(n - 1) + ',2']: 'd' }, align: ['left', 'left', 'right'] });

    /* the SM's DOL and DFL curves (ch. 6 p. 6.11 and p. 6.19): undefined at the break-even point, near 1 far above it */
    const curve = (kind) => {
      const X0 = kind === 'dol' ? S.bep : S.fbep, here = kind === 'dol' ? S.sales : S.EBIT, val = kind === 'dol' ? S.DOL : S.DFL;
      const top = Math.max(here, X0) * 1.6 || 1, sc = scaleOf(top), xm = niceTop(top / sc.d) * sc.d;
      const f = kind === 'dol' ? x => (x * S.pv) / (x * S.pv - S.F) : x => x / (x - S.fbep);
      const yHi = Math.min(25, Math.max(6, Number.isFinite(val) ? Math.ceil(Math.abs(val) * 1.4) : 6)), yLo = -Math.min(10, Math.max(4, Math.round(yHi / 2)));
      const left = [], right = [], N = 70;
      if (X0 > 0) for (let i = 0; i <= N; i++) { const x = (X0 * i) / N * 0.995; left.push([x / sc.d, f(x)]); }
      for (let i = 0; i <= N; i++) { const x = X0 + ((xm - X0) * Math.pow(i / N, 2)) + (X0 > 0 ? X0 * 0.005 : xm * 0.002); if (x <= xm) right.push([x / sc.d, f(x)]); }
      const series = [{ label: kind === 'dol' ? 'DOL' : 'DFL', pts: right, color: kind === 'dol' ? 'a' : 'c' }];
      if (left.length > 1) series.push({ label: 'below break-even', pts: left, color: kind === 'dol' ? 'a' : 'c', legend: false });
      if (X0 > 0) series.push({ label: 'break-even', pts: [[X0 / sc.d, yLo], [X0 / sc.d, yHi]], color: 'mute', dash: true, legend: false });
      series.push({ label: 'leverage 1', pts: [[0, 1], [xm / sc.d, 1]], color: 'mute', dash: true, legend: false });
      const points = Number.isFinite(val) && val <= yHi && val >= yLo ? [{ x: here / sc.d, y: val, label: `${kind === 'dol' ? 'DOL' : 'DFL'} ${lvTxt(val)}`, pos: 'right', color: 'd' }] : [];
      if (X0 > 0) points.push({ x: X0 / sc.d, y: yLo * 0.8, label: kind === 'dol' ? 'break-even sales' : 'financial BEP', pos: 'right', color: 'mute' });
      return { type: 'plot', title: kind === 'dol' ? 'DOL at each level of sales' : 'DFL at each level of EBIT', x: [0, xm / sc.d], y: [yLo, yHi], clip: true, legend: 'top-right',
        xticks: ticksFor(0, xm / sc.d, 5), yticks: ticksFor(yLo, yHi, 6),
        xlabel: (kind === 'dol' ? 'sales' : 'EBIT') + ` (${sc.lab})`, ylabel: kind === 'dol' ? 'DOL' : 'DFL', series, points, h: 280 };
    };
    /* the magnification: % change in sales → EBIT → EPS as bars */
    const bars = n => {
      const vals = [ch, dEBIT, dEPS].map(x => (Number.isFinite(x) ? x : 0));
      const hi = Math.max(0, ...vals), lo = Math.min(0, ...vals);                 // the axis stays put while the bars appear
      const span = Math.max(Math.abs(ch) * 1.2, hi - lo) || 1;
      const series = ['Sales', 'EBIT', 'EPS'].slice(0, n).map((lab, i) => ({ label: lab, bars: true, values: true, color: 'abc'[i], bw: 0.55, pts: [[i + 1, vals[i], pct(vals[i])]] }));
      const y0 = lo < 0 ? lo - span * 0.15 : 0, y1 = hi > 0 ? hi + span * 0.18 : span * 0.05;
      return { type: 'plot', title: `Sales ${pct(ch)}, then × DOL ${lvTxt(S.DOL)} for EBIT, × DFL ${lvTxt(S.DFL)} for EPS`, x: [0.4, 3.6], y: [y0, y1], h: 230, legend: 'none', yticks: ticksFor(y0, y1, 4).map(([y, l]) => [y, l + '%']),
        xticks: [[1, 'Sales'], [2, 'EBIT'], [3, 'EPS']], ylabel: '% change', series };
    };

    const n0 = L.length;
    const frames = [];
    L.forEach((ln, i) => frames.push({ caption: ln.cap, view: [stmt(i + 1)] }));
    const neg = S.EBIT < 0;
    const dolCap = Number.isFinite(S.DOL)
      ? `**DOL = contribution ÷ EBIT = ${inr(S.C)} ÷ ${inr(S.EBIT)} = ${lvTxt(S.DOL)}**: ` + (neg ? `negative, because ${nm} is operating below its break-even sales of ${inr(S.bep)}, so EBIT is a loss.`
        : S.F === 0 ? 'with no fixed operating cost there is no operating leverage: EBIT moves exactly with sales.' : `a 1% change in sales changes EBIT by ${lvTxt(S.DOL)}%, in the same direction. The margin of safety is 1 ÷ DOL = ${sg(r2(S.mos * 100))}% of sales.`)
      : `EBIT is zero: ${nm} sits exactly at its break-even sales, where DOL is undefined (infinite).`;
    frames.push({ caption: dolCap, view: [levT(1), stmt(n0, { mark: ['c', 'ebit'] })] });
    frames.push({ caption: `DOL is not a fixed number. It is undefined at the break-even sales of ${inr(S.bep)} (EBIT = 0), very large just above it, and falls towards 1 as sales grow; below break-even it is negative. ${Nm} sits at sales of ${inr(S.sales)}${Number.isFinite(S.DOL) ? `, DOL ${lvTxt(S.DOL)}` : ''}.`, view: [curve('dol')] });
    const dflCap = Number.isFinite(S.DFL)
      ? (hasP ? `**DFL = EBIT ÷ [EBT − preference dividend ÷ (1 − t)] = ${inr(S.EBIT)} ÷ (${inr(S.EBT)} − ${inr(S.Dp)} ÷ ${sg(r2(1 - S.t))}) = ${lvTxt(S.DFL)}**. The preference dividend is grossed up by (1 − t) because it is paid out of after-tax profit.`
        : `**DFL = EBIT ÷ EBT = ${inr(S.EBIT)} ÷ ${inr(S.EBT)} = ${lvTxt(S.DFL)}**.`) + (S.I === 0 && S.Dp === 0 ? ' With no interest or preference dividend there is no financial leverage: EPS moves exactly with EBIT.' : S.DFL < 0 ? ' It is negative: EBIT is below the financial break-even point, so EPS is negative.' : ` A 1% change in EBIT changes EPS by ${lvTxt(S.DFL)}%, because the fixed financial charges do not move.`)
      : `EBIT equals the financial break-even point (${inr(S.fbep)}), so EPS is zero and DFL is undefined (infinite).`;
    frames.push({ caption: dflCap, view: [levT(2), stmt(n0, { mark: hasP ? ['ebit', 'ebt', 'pd'] : ['ebit', 'ebt'] })] });
    frames.push({ caption: `The **financial break-even point** = interest + preference dividend ÷ (1 − t) = ${inr(S.fbep)} is the EBIT at which EPS is zero. DFL is undefined there and falls towards 1 as EBIT rises above it; ${nm} has EBIT of ${inr(S.EBIT)}${Number.isFinite(S.DFL) ? `, DFL ${lvTxt(S.DFL)}` : ''}.`, view: [curve('dfl')] });
    const dclCap = Number.isFinite(S.DCL)
      ? `**DCL = DOL × DFL = ${lvTxt(S.DOL)} × ${lvTxt(S.DFL)} = ${lvTxt(S.DCL)}** (= contribution ÷ ${hasP ? '[EBT − Dp ÷ (1 − t)]' : 'EBT'}): a 1% change in sales changes EPS by ${lvTxt(S.DCL)}%. ` +
        (S.DOL > 2.5 && S.DFL > 2 ? 'High DOL with high DFL is the riskiest combination.' : S.DOL <= 2.5 && S.DFL > 2 ? 'Low DOL with high DFL: the Study Material calls this the best combination.' : 'It measures the total (business plus financial) risk.')
      : 'EPS is zero here, so DCL is undefined.';
    frames.push({ caption: dclCap, view: [levT(3), stmt(n0, { mark: hasP ? ['c', 'ebt', 'pd'] : ['c', 'ebt'] })] });
    if (A) {
      frames.push({ caption: `Now change sales by **${pct(ch)}**. Contribution changes by the same ${pct(ch)} because it is proportional to sales; the fixed cost does not change.`, view: [bars(1), levT(3)] });
      const negE = S.EBIT < 0 ? ' EBIT starts as a loss, so the percentage is measured on a negative base: its sign shows the direction of the move against that base, not a rise or fall in profit.' : '';
      const negP = S.EPS < 0 && S.EBIT >= 0 ? ' EPS starts negative, so the percentage is measured on a negative base and its sign flips.' : '';
      frames.push({ caption: `So EBIT changes by DOL × ${pct(ch)} = ${lvTxt(S.DOL)} × ${sg(ch)}% = **${pct(dEBIT)}**: ${S.F > 0 ? 'the fixed cost magnifies the change.' : 'with no fixed cost there is no magnification.'}${negE}`, view: [bars(2), levT(3)] });
      frames.push({ caption: `And EPS changes by DFL × ${pct(dEBIT)} = DCL × ${pct(ch)} = **${pct(dEPS)}**: ${S.fbep > 0 ? 'the fixed financial charges magnify it again.' : 'with no fixed financial charges, EPS moves exactly with EBIT.'}${negP}`, view: [bars(3), levT(3)] });
      frames.push({ caption: `Check by redoing the statement at sales of ${inr(A.sales)}: EBIT ${inr(A.EBIT)} (${pct(dEBIT)}) and EPS ${rs2(A.EPS)} (${pct(dEPS)}), exactly what the leverages predicted. The leverages are measured at the starting level of sales.`, view: [bars(3), stmt(n0, { after: true })] });
    }

    const stats = [
      { label: 'Operating leverage (DOL)', value: lvTxt(S.DOL), hint: 'contribution ÷ EBIT' },
      { label: 'Financial leverage (DFL)', value: lvTxt(S.DFL), hint: hasP ? 'EBIT ÷ [EBT − preference dividend ÷ (1 − t)]' : 'EBIT ÷ EBT' },
      { label: 'Combined leverage (DCL)', value: lvTxt(S.DCL), hint: 'DOL × DFL' },
      { label: 'EPS', value: rs2(S.EPS), hint: 'earnings for equity shareholders ÷ number of equity shares' }
    ];
    if (A) stats.push({ label: `EPS change for ${pct(ch)} sales`, value: Number.isFinite(dEPS) ? pct(dEPS) : '—', hint: 'DCL × % change in sales' });
    if (!A) stats.push({ label: 'Financial break-even EBIT', value: inr(S.fbep), hint: 'interest + preference dividend ÷ (1 − t)' });
    const head = ['Particulars', 'Now (₹)'].concat(A ? [`After ${pct(ch)} sales (₹)`, 'Change'] : []);
    const st = stmt(n0, { after: !!A });
    const rows = st.rows.map(r => r.map(c => String(c).replace(/\*\*/g, '')));
    rows.push(['DOL', lvTxt(S.DOL)].concat(A ? [lvTxt(A.DOL), ''] : []), ['DFL', lvTxt(S.DFL)].concat(A ? [lvTxt(A.DFL), ''] : []), ['DCL', lvTxt(S.DCL)].concat(A ? [lvTxt(A.DCL), ''] : []));
    return {
      frames, stats, table: { head, rows },
      note: '**Conventions.** A change in sales is a change in volume at the same price and variable cost per unit, with fixed costs unchanged. DOL = contribution ÷ EBIT, DFL = EBIT ÷ [EBT − preference dividend ÷ (1 − t)] and DCL = DOL × DFL, measured at the starting level of sales, as in the Study Material. Tax is a flat rate on EBT, so a loss gets a tax credit and EPS moves in a straight line with EBIT. Figures are shown to two decimals; the working keeps every digit.' +
        (A ? ` **At the new level of sales** the leverages are DOL ${lvTxt(A.DOL)}, DFL ${lvTxt(A.DFL)} and DCL ${lvTxt(A.DCL)}: every level of sales has its own leverage.` : ''),
      sim: { mode: 'lev', S, A, dEBIT, dEPS, ch, sales, vc,
        blank: Object.assign(stmt(n0), { rows: stmt(n0).rows.map(r => [r[0], '']), cells: {}, title: `Profitability statement of ${nm}: fill it in` }) }
    };
  }

  /* ================================================================== mode 2: EBIT-EPS analysis of financing plans */
  function readPlans(v) {
    const rows = Array.isArray(v.plans) ? v.plans : [];
    const out = rows.map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'Plan ' + ROMAN[i], eq: amt(r[1]) || 0, price: amt(r[2]) || 0, debt: amt(r[3]) || 0, drate: amt(r[4]) || 0, pref: amt(r[5]) || 0, prate: amt(r[6]) || 0, pe: amt(r[7]) || 0 }));
    if (out.length < 2) throw new Error('Give at least two financing plans to compare.');
    if (out.length > 4) throw new Error('Compare at most four plans at a time.');
    if (new Set(out.map(p => p.name.toLowerCase())).size !== out.length) throw new Error('Give every plan a different name.');
    return out;
  }
  function computeEps(v) {
    const taxP = amt(v.tax), t = taxP / 100;
    if (!(taxP >= 0 && taxP < 100)) throw new Error('The tax rate must be at least 0% and below 100%.');
    const shares = amt(v.xshares) || 0, debt = amt(v.xdebt) || 0, rate = amt(v.xrate) || 0, pref = amt(v.xpref) || 0, prate = amt(v.xprate) || 0, ebit = amt(v.ebit);
    if (shares < 0 || debt < 0 || pref < 0) throw new Error('Existing shares, debt and preference capital cannot be negative.');
    if (!(rate >= 0 && rate <= 100) || !(prate >= 0 && prate <= 100)) throw new Error('Interest and dividend rates are percentages from 0 to 100.');
    if (!Number.isFinite(ebit)) throw new Error('Enter the expected EBIT.');
    const base = { shares, interest: debt * rate / 100, prefDiv: pref * prate / 100 };
    const P = readPlans(v).map(p => planOf(base, p, t));
    const nP = P.length, hasPref = P.some(p => p.P > 0), hasPE = P.some(p => p.pe > 0);
    const eps = P.map(p => epsAt(p, ebit, t)), mps = P.map((p, i) => (p.pe > 0 ? eps[i] * p.pe : NaN));
    const pairs = [];
    for (let i = 0; i < nP; i++) for (let j = i + 1; j < nP; j++) pairs.push(Object.assign({ i, j }, indifference(P[i], P[j], t)));
    const fmt2 = f2;
    const best = (arr, ok) => { let b = -1; arr.forEach((x, i) => { if (ok(i) && (b < 0 || x > arr[b] + 1e-9)) b = i; }); return b; };
    const bEps = best(eps, () => true), tie = eps.filter(x => Math.abs(x - eps[bEps]) <= 1e-9).length > 1;
    const bMps = hasPE ? best(mps, i => P[i].pe > 0) : -1;

    /* the plans as given (the first frame) */
    const exist = [];
    if (shares > 0) exist.push(`${grp(shares)} shares`);
    if (debt > 0) exist.push(`${grp(rate)}% debt ₹${grp(debt)}`);
    if (pref > 0) exist.push(`${grp(prate)}% preference ₹${grp(pref)}`);
    const given = {
      type: 'table', title: 'Financing plans' + (exist.length ? ` (existing: ${exist.join(', ')})` : ''), head: ['New funds'].concat(P.map(p => p.name)),
      rows: [['New equity (₹)'].concat(P.map(p => (p.eq ? grp(p.eq) : '—'))), ['Issue price per share (₹)'].concat(P.map(p => (p.eq ? grp(p.price) : '—'))),
        ['New debt (₹)'].concat(P.map(p => (p.debt ? grp(p.debt) : '—'))), ['Interest rate'].concat(P.map(p => (p.debt ? grp(p.drate) + '%' : '—')))]
        .concat(hasPref || P.some(p => p.pref) ? [['New preference (₹)'].concat(P.map(p => (p.pref ? grp(p.pref) : '—'))), ['Dividend rate'].concat(P.map(p => (p.pref ? grp(p.prate) + '%' : '—')))] : [])
        .concat(hasPE ? [['P/E ratio'].concat(P.map(p => (p.pe ? grp(p.pe) : '—')))] : []),
      align: ['left'].concat(P.map(() => 'right'))
    };
    /* the EPS statement, row by row (SM ch. 5 Illustration 11's layout) */
    const R = [
      { lab: 'EBIT', vals: P.map(() => ebit), hl: 1, cap: `Start every plan at the same expected EBIT of ${inr(ebit)}: the financing changes who shares the EBIT, not the EBIT itself.` },
      { lab: 'Less: Interest', vals: P.map(p => p.I), cap: `Interest = ${base.interest ? `existing ${inr(base.interest)} (${grp(rate)}% × ${inr(debt)}) + ` : ''}new debt: ${P.map(p => `${p.name} ${inr(p.newInt)}${p.debt ? ` (${grp(p.drate)}% × ${inr(p.debt)})` : ''}`).join('; ')}. More debt means more fixed interest.` },
      { lab: 'EBT', vals: P.map(p => ebit - p.I), hl: 1, cap: 'EBT = EBIT − interest.' },
      { lab: `Less: Tax @ ${grp(taxP)}%`, vals: P.map(p => (ebit - p.I) * t), cap: `Interest is tax-deductible, so the plans with more debt pay less tax: ${P.map(p => `${p.name} ${inr((ebit - p.I) * t)}`).join(', ')}.` },
      { lab: 'PAT', vals: P.map(p => (ebit - p.I) * (1 - t)), hl: 1, cap: 'PAT = EBT − tax.' }
    ];
    if (hasPref) {
      R.push({ lab: 'Less: Preference dividend', vals: P.map(p => p.P), cap: `Preference dividend comes out of PAT and is not tax-deductible: ${P.map(p => `${p.name} ${inr(p.P)}`).join(', ')}.` });
      R.push({ lab: 'Earnings for equity shareholders', vals: P.map(p => (ebit - p.I) * (1 - t) - p.P), hl: 1, cap: 'Earnings available to equity shareholders = PAT − preference dividend.' });
    }
    R.push({ lab: 'No. of equity shares', vals: P.map(p => p.N), n: true, cap: `Shares = ${shares ? `existing ${grp(shares)} + ` : ''}new equity ÷ issue price: ${P.map(p => `${p.name} ${p.eq ? `${inr(p.eq)} ÷ ₹${grp(p.price)} = ${grp(r2(p.newShares))}` : 'none'}${shares ? ` → ${grp(r2(p.N))}` : ''}`).join('; ')}.` });
    R.push({ lab: 'EPS (₹)', vals: eps, hl: 2, eps: true, cap: `EPS = earnings ÷ shares: ${P.map((p, i) => `${p.name} ${rs2(eps[i])}`).join(', ')}. ` + (tie ? 'At this EBIT the best plans tie.' : `At this EBIT **${P[bEps].name}** gives the highest EPS.`) });
    if (hasPE) {
      R.push({ lab: 'P/E ratio', vals: P.map(p => p.pe), n: true, pe: true, cap: 'The market prices each plan with its own P/E ratio: more debt, more risk, usually a lower P/E.' });
      R.push({ lab: 'MPS (₹)', vals: mps, hl: 2, eps: true, cap: `MPS = EPS × P/E: ${P.map((p, i) => `${p.name} ${p.pe ? rs2(mps[i]) : '—'}`).join(', ')}. ` + (bMps >= 0 ? `**${P[bMps].name}** gives the highest market price, the Study Material's test (wealth = MPS).` : '') });
    }
    R.push({ lab: 'Financial BEP (₹)', vals: P.map(p => p.fbep), cap: `Financial break-even point = interest + preference dividend ÷ (1 − t): the EBIT at which EPS is zero. ${P.map(p => `${p.name} ${inr(p.fbep)}`).join(', ')}.` });
    const cellOf = (r, x) => (r.pe ? (x ? grp(x) : '—') : r.eps ? (Number.isFinite(x) ? fmt2(x) : '—') : r.n ? grp(r2(x)) : sg(r2(x)));
    const epsT = upto => {
      const rows = R.slice(0, upto).map(r => [r.hl ? `**${r.lab}**` : r.lab].concat(r.vals.map(x => cellOf(r, x))));
      const cells = {};
      R.slice(0, upto).forEach((r, i) => { if (r.hl) for (let c = 0; c <= nP; c++) cells[i + ',' + c] = r.hl === 2 ? 'b' : 'hl'; });
      if (upto > 0) for (let c = 1; c <= nP; c++) cells[(upto - 1) + ',' + c] = cells[(upto - 1) + ',' + c] === 'b' ? 'b' : 'd';
      return { type: 'table', title: `EPS under each plan at EBIT ${inr(ebit)}`, head: ['Particulars'].concat(P.map(p => p.name)), rows, cells, align: ['left'].concat(P.map(() => 'right')) };
    };

    /* the EBIT-EPS chart: one straight line per plan, crossing the x-axis at its financial BEP */
    const xs = [ebit, ...P.map(p => p.fbep), ...pairs.filter(q => q.kind === 'point' && q.x > 0).map(q => q.x)];
    const sc = scaleOf(Math.max(...xs.map(Math.abs))), xm = niceTop(Math.max(...xs) * 1.25 / sc.d) * sc.d;
    const yv = P.flatMap(p => [epsAt(p, 0, t), epsAt(p, xm, t)]);
    const yLo = Math.min(0, ...yv), yHi = Math.max(0, ...yv), pad = (yHi - yLo) * 0.06 || 1;
    const chart = (nLines, nPairs, final) => {
      const series = P.slice(0, nLines).map((p, i) => ({ label: p.name, pts: [[0, epsAt(p, 0, t)], [xm / sc.d, epsAt(p, xm, t)]], color: 'abcd'[i] }));
      series.push({ label: 'expected EBIT', pts: [[ebit / sc.d, yLo - pad], [ebit / sc.d, yHi + pad]], color: 'mute', dash: true, legend: false });
      /* each plan's financial BEP is a dot on the x-axis; only the line just drawn names it (close BEPs would print over each other) */
      const points = P.slice(0, nLines).map((p, i) => Object.assign({ x: p.fbep / sc.d, y: 0, color: 'abcd'[i] }, i === nLines - 1 && !nPairs && !final ? { label: `financial BEP ${sc.w(p.fbep)}`, pos: 'below' } : {}));
      pairs.slice(0, nPairs).forEach((q, k) => { if (q.kind === 'point' && q.x >= 0 && q.x <= xm) points.push({ x: q.x / sc.d, y: q.eps, label: `${P[q.i].name} = ${P[q.j].name}: ${sc.w(q.x)}`, pos: k % 2 ? 'right' : 'left', color: 'd' }); });
      if (final) eps.forEach((e, i) => points.push(Object.assign({ x: ebit / sc.d, y: e, color: 'abcd'[i] }, i === bEps ? { label: `${P[i].name}: ${rs2(e)}`, pos: 'right' } : {})));
      return { type: 'plot', title: 'EBIT-EPS chart', x: [0, xm / sc.d], y: [yLo - pad, yHi + pad], xlabel: `EBIT (${sc.lab})`, ylabel: 'EPS (₹)', legend: 'top-left', clip: true,
        xticks: ticksFor(0, xm / sc.d, 5), yticks: ticksFor(yLo - pad, yHi + pad, 5), series, points, h: 300 };
    };

    const names = P.map(p => p.name).join(', ').replace(/, ([^,]*)$/, ' and $1');
    const frames = [{ caption: `${nP} ways to raise the funds: ${names}. Every plan earns the same EBIT; they differ in how many shares share it and in the fixed interest and preference dividend paid before the equity shareholders.`, view: [given] }];
    R.forEach((r, k) => frames.push({ caption: r.cap, view: [epsT(k + 1)] }));
    P.forEach((p, i) => frames.push({ caption: `${p.name}'s EPS line crosses zero at its financial BEP (${inr(p.fbep)}) and rises ₹${sg(r4(p.slope * sc.d), 4)} for every ${sc.d > 1 ? '₹1 lakh' : '₹1'} of EBIT, that is (1 − t) ÷ shares: ${p.N < Math.max(...P.map(q => q.N)) ? 'fewer shares, a steeper line.' : 'the most shares, the flattest line.'}`, view: [chart(i + 1, 0)] }));
    pairs.forEach((q, k) => {
      const a = P[q.i], b = P[q.j];
      let cap;
      if (q.kind === 'all') cap = `${a.name} and ${b.name} have the same shares and the same financial BEP: they give the same EPS at every EBIT, so every EBIT is an indifference point.`;
      else if (q.kind === 'none') cap = `${a.name} and ${b.name} have the same number of shares, so their lines are parallel and never meet: there is **no indifference point**. ${q.better} has the lower fixed charges and gives the higher EPS at every EBIT.`;
      else if (q.x < 0) cap = `${a.name} and ${b.name} would give the same EPS only at a negative EBIT (${inr(q.x)}), so at every positive EBIT ${q.steeper} (fewer shares) gives the higher EPS.`;
      else cap = `**Indifference point, ${a.name} vs ${b.name}**: (EBIT − I₁)(1 − t) − P₁ over N₁ equals the same for ${b.name} at EBIT = **${inr(q.x)}**, where both give EPS ${rs2(q.eps)}. Below it ${q.flatter} (more shares, lower fixed charges) gives the higher EPS; above it ${q.steeper} (the steeper line) does.`;
      frames.push({ caption: cap, view: [chart(nP, k + 1)] });
    });
    const fin = `At the expected EBIT of ${inr(ebit)}, ` + (tie ? 'the best plans give the same EPS.' : `**${P[bEps].name}** gives the highest EPS (${rs2(eps[bEps])}).`) + (bMps >= 0 ? ` On market price per share **${P[bMps].name}** is best (${rs2(mps[bMps])})${bMps === bEps ? '' : ': the higher EPS carries a lower P/E'}.` : '');
    frames.push({ caption: fin, view: [chart(nP, pairs.length, true), epsT(R.length)] });

    const stats = P.slice(0, 4).map((p, i) => ({ label: `EPS, ${p.name}`, value: rs2(eps[i]), hint: '[(EBIT − interest)(1 − t) − preference dividend] ÷ shares' }));
    const q0 = pairs[0];
    stats.push({ label: `Indifference EBIT, ${P[0].name} vs ${P[1].name}`, value: q0.kind === 'point' ? inr(q0.x) : q0.kind === 'all' ? 'every EBIT' : 'none', hint: 'the EBIT at which both plans give the same EPS' });
    if (stats.length < 6) stats.push({ label: hasPE ? 'Highest MPS' : 'Highest EPS', value: hasPE && bMps >= 0 ? P[bMps].name : tie ? 'tie' : P[bEps].name, hint: hasPE ? 'MPS = EPS × P/E' : 'at the expected EBIT' });
    const table = { head: ['Particulars'].concat(P.map(p => p.name)), rows: R.map(r => [r.lab].concat(r.vals.map(x => cellOf(r, x)))) };
    const rem = pairs.map(q => `${P[q.i].name} vs ${P[q.j].name}: ` + (q.kind === 'point' ? `EBIT ${inr(q.x)}, EPS ${rs2(q.eps)}` : q.kind === 'all' ? 'the same EPS at every EBIT' : `none (${q.better} is better at every EBIT)`)).join('; ');
    return {
      frames, stats, table,
      note: '**Conventions.** New equity shares = amount raised ÷ issue price (face value plus premium). Interest and preference dividend add the existing charges to the new ones. EPS = [(EBIT − interest)(1 − t) − preference dividend] ÷ equity shares, the financial BEP = interest + preference dividend ÷ (1 − t), and the indifference point is the EBIT at which two plans give the same EPS (Study Material ch. 5 §5.2). Tax is a flat rate on EBT. ' +
        `**Indifference points.** ${rem}.`,
      sim: { mode: 'ebiteps', plans: P, eps, mps, pairs, ebit, t, bEps, bMps }
    };
  }

  function compute(v) { return v.mode === 'ebiteps' ? computeEps(v) : computeLev(v); }

  /* ================================================================== presets */
  const LEV = { mode: 'lev', change: 0, pref: 0, prate: 0 };
  const EPS = { mode: 'ebiteps', xpref: 0, xprate: 0 };
  const presets = [
    { label: 'Tapri Tea Co.: Dev\'s premix line and a 10% sales push', values: Object.assign({}, LEV, { firm: 'Tapri Tea Co.', input: 'unit', units: 200000, price: 150, vcu: 90, fixed: 6000000, debt: 20000000, rate: 12, tax: 25, shares: 1000000, change: 10 }) },
    { label: 'PYQ Jan 2025, Q1(b): EXIM Ltd\'s EPS and its three leverages', values: Object.assign({}, LEV, { firm: 'EXIM Ltd', input: 'total', sales: 20000000, vcr: 70, fixed: 1600000, debt: 4000000, rate: 12.5, tax: 30, shares: 20000, change: 0 }) },
    { label: 'PYQ May 2024, Q1(b): Alpha Ltd, if sales fall by 15%', values: Object.assign({}, LEV, { firm: 'Alpha Ltd', input: 'unit', units: 5000000, price: 20, vcu: 12.5, fixed: 17500000, debt: 7500000, rate: 15, tax: 20, shares: 25000, change: -15 }) },
    { label: 'Study Material Illustration 3: sales up by ₹6,00,000', values: Object.assign({}, LEV, { firm: 'the firm', input: 'unit', units: 24000, price: 100, vcu: 50, fixed: 1000000, debt: 1000000, rate: 10, tax: 50, shares: 10000, change: 25 }) },
    { label: 'Tapri Tea Co. in a bad year: below break-even', values: Object.assign({}, LEV, { firm: 'Tapri Tea Co.', input: 'unit', units: 90000, price: 150, vcu: 90, fixed: 6000000, debt: 20000000, rate: 12, tax: 25, shares: 1000000, change: 10 }) },
    { label: 'Tapri Tea Co. with 9% preference shares', values: Object.assign({}, LEV, { firm: 'Tapri Tea Co.', input: 'unit', units: 200000, price: 150, vcu: 90, fixed: 6000000, debt: 10000000, rate: 12, pref: 5000000, prate: 9, tax: 25, shares: 1000000, change: -5 }) },
    { label: 'PYQ Jan 2025, MCQs 1–5: Coral Ltd\'s two plans for ₹100 lakh', values: Object.assign({}, EPS, { xshares: 1000000, xdebt: 3000000, xrate: 15, tax: 30, ebit: 7600000,
      plans: [['Plan I', 3000000, 25, 7000000, 13, 0, 0, 12], ['Plan II', 1000000, 25, 5000000, 13, 4000000, 7.15, 15]] }) },
    { label: 'MTP May 2025 (Series I), Q3(a): Perfact Ltd\'s indifference point and financial BEPs', values: Object.assign({}, EPS, { xshares: 0, xdebt: 0, xrate: 0, tax: 25, ebit: 600000,
      plans: [['Plan (i)', 1800000, 10, 900000, 14, 0, 0, 0], ['Plan (ii)', 1500000, 10, 700000, 14, 500000, 16, 0]] }) },
    { label: 'Study Material Illustration 11: equity, debt or preference shares', values: Object.assign({}, EPS, { xshares: 100000, xdebt: 0, xrate: 0, tax: 50, ebit: 312500,
      plans: [['Equity', 250000, 10, 0, 0, 0, 0, 0], ['Debt', 0, 10, 250000, 8, 0, 0, 0], ['Preference', 0, 10, 0, 0, 250000, 8, 0]] }) },
    { label: 'Tapri Tea Co.: three ways to fund 40 new kulhad cafés', values: Object.assign({}, EPS, { xshares: 1000000, xdebt: 10000000, xrate: 10, tax: 25, ebit: 12000000,
      plans: [['All equity', 20000000, 50, 0, 0, 0, 0, 16], ['Half and half', 10000000, 50, 10000000, 11, 0, 0, 15], ['All debt', 0, 50, 20000000, 13, 0, 0, 12]] }) }
  ];

  /* ================================================================== the challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  function gen(r) {
    /* leverages: nice numbers, so every leverage ends in at most three decimals (as ICAI's do) */
    const units = pick(r, [10, 20, 25, 40, 50, 80, 100]) * 1000, price = pick(r, [20, 25, 40, 50, 80, 100, 120, 150, 200]);
    const vr = pick(r, [40, 50, 60, 70, 75]), C = units * price * (1 - vr / 100);
    const dol = pick(r, [1.25, 1.5, 2, 2.5, 3, 4, 5]), ebit = C / dol, dfl = pick(r, [1.25, 1.5, 2, 2.5, 1.6]);
    const rate = pick(r, [8, 10, 12, 12.5, 15, 20]), interest = ebit - ebit / dfl, total = r() < 0.5;
    const lev = {
      input: total ? 'total' : 'unit', units, price, vcu: price * vr / 100, sales: units * price, vcr: vr, fixed: C - ebit, debt: Math.round(interest / rate * 100), rate,
      pref: 0, prate: 0, shares: pick(r, [10, 20, 25, 50, 100]) * 1000, change: pick(r, [-20, -15, -10, -8, 5, 7, 8, 10, 12, 15, 20, 25]), firm: 'the firm',
      askLev: pick(r, ['dol', 'dfl', 'dcl', 'eps', 'ebitch', 'epsch'])
    };
    /* EBIT-EPS: an existing structure and two plans for the same amount */
    const need = pick(r, [20, 25, 40, 50, 60, 80, 100]) * 1e5, price2 = pick(r, [10, 20, 25, 40, 50]);
    const e1 = pick(r, [1, 0.8, 0.75, 0.6]), e2 = pick(r, [0.5, 0.4, 0.3, 0.25, 0]), dr = pick(r, [10, 12, 13, 14, 15]);
    const withPref = r() < 0.4, pr = pick(r, [8, 9, 10, 12]);
    const p2pref = withPref && e2 < 0.5 ? 0.25 : 0;
    const plans = [['Plan I', need * e1, price2, need * (1 - e1), dr, 0, 0, 0], ['Plan II', need * e2, price2, need * (1 - e2 - p2pref), dr, need * p2pref, p2pref ? pr : 0, 0]];
    const eps = {
      xshares: pick(r, [0, 1, 2, 5, 10]) * 1e5, xdebt: pick(r, [0, 0, 10, 20, 30]) * 1e5, xrate: pick(r, [10, 12, 15]), xpref: 0, xprate: 0, tax: pick(r, [20, 25, 30, 40, 50]), plans,
      ebit: 0, askEps: pick(r, ['ind', 'ind', 'eps', 'fbep']), askPlan: r() < 0.5 ? 0 : 1
    };
    if (eps.xdebt === 0) eps.xrate = 0;
    if (eps.xshares === 0 && plans[1][1] === 0) { plans[1][1] = need * 0.25; plans[1][3] -= need * 0.25; }   // a new company needs some equity in every plan
    /* the expected EBIT: a round figure clear of the indifference point (so "which plan is better" is never a tie) */
    const t = eps.tax / 100, base = { shares: eps.xshares, interest: eps.xdebt * eps.xrate / 100, prefDiv: 0 };
    const P = plans.map(p => planOf(base, { name: p[0], eq: p[1], price: p[2], debt: p[3], drate: p[4], pref: p[5], prate: p[6], pe: 0 }, t));
    const q = indifference(P[0], P[1], t), anchor = q.kind === 'point' && q.x > 0 ? q.x : Math.max(P[0].fbep, P[1].fbep) * 2;
    eps.ebit = Math.round(anchor * pick(r, [0.7, 1.3, 1.5, 2]) / 1e4) * 1e4;
    return Object.assign(lev, eps);
  }
  const askOf = v => (v.mode === 'ebiteps' ? v.askEps || 'ind' : v.askLev || 'dcl');
  function solve(res, v) {
    const s = res.sim, a = askOf(v);
    if (s.mode === 'lev') {
      const S = s.S;
      return { dol: S.DOL, dfl: S.DFL, dcl: S.DCL, eps: S.EPS, ebitch: s.dEBIT, epsch: s.dEPS }[a];
    }
    const k = Math.min(v.askPlan || 0, s.plans.length - 1);
    if (a === 'eps') return s.eps[k];
    if (a === 'fbep') return s.plans[k].fbep / 1e5;
    const q = s.pairs[0];
    return q.kind === 'point' ? q.x / 1e5 : null;
  }
  function prompt(v, res) {
    const a = askOf(v), s = res && res.sim;
    if (v.mode !== 'ebiteps') {
      const how = v.input === 'total' ? `Sales ₹${grp(v.sales)}, variable cost ${grp(v.vcr)}% of sales` : `${grp(v.units)} units sold at ₹${grp(v.price)}, variable cost ₹${grp(v.vcu)} a unit`;
      const data = `${how}, fixed operating cost ₹${grp(v.fixed)}, ${grp(v.rate)}% debt of ₹${grp(v.debt)}, tax ${grp(v.tax)}%, ${grp(v.shares)} equity shares.`;
      const q = { dol: 'What is the **degree of operating leverage**?', dfl: 'What is the **degree of financial leverage**?', dcl: 'What is the **degree of combined leverage**?', eps: 'What is the **EPS** (₹)?',
        ebitch: `If sales change by ${pct(v.change)}, by what **percentage does EBIT change**? (Type a fall as a negative number.)`, epsch: `If sales change by ${pct(v.change)}, by what **percentage does EPS change**? (Type a fall as a negative number.)` }[a];
      return `${data} ${q} Two decimals.`;
    }
    const pl = (v.plans || []).map(p => `**${p[0]}**: ${p[1] ? `equity ₹${grp(p[1])} at ₹${grp(p[2])} a share` : 'no new equity'}${p[3] ? `, ${grp(p[4])}% debt ₹${grp(p[3])}` : ''}${p[5] ? `, ${grp(p[6])}% preference ₹${grp(p[5])}` : ''}`).join('; ');
    const ex = [v.xshares ? `${grp(v.xshares)} equity shares` : '', v.xdebt ? `${grp(v.xrate)}% debt of ₹${grp(v.xdebt)}` : ''].filter(Boolean).join(' and ');
    const k = Math.min(v.askPlan || 0, (v.plans || []).length - 1), nm = (v.plans[k] || [])[0];
    const q = a === 'eps' ? `What is the **EPS of ${nm}** (₹, two decimals) at the expected EBIT?` : a === 'fbep' ? `What is the **financial break-even point of ${nm}**, in ₹ lakh (two decimals)?` : `At what **EBIT** do the two plans give the **same EPS**? Answer in ₹ lakh (two decimals).`;
    return `${ex ? `Existing: ${ex}. ` : 'A new company. '}${pl}. Tax ${grp(v.tax)}%, expected EBIT ₹${grp(v.ebit)}. ${q}`;
  }
  function explain(res, v) {
    const s = res.sim, a = askOf(v);
    if (s.mode === 'lev') {
      const S = s.S;
      const head = `Contribution ${inr(S.C)}, EBIT ${inr(S.EBIT)}, EBT ${inr(S.EBT)}.`;
      return head + ' ' + ({
        dol: `DOL = contribution ÷ EBIT = ${grp(r2(S.C))} ÷ ${grp(r2(S.EBIT))} = **${lvTxt(S.DOL)}**.`,
        dfl: `DFL = EBIT ÷ EBT = ${grp(r2(S.EBIT))} ÷ ${grp(r2(S.EBT))} = **${lvTxt(S.DFL)}**.`,
        dcl: `DCL = DOL × DFL = ${lvTxt(S.DOL)} × ${lvTxt(S.DFL)} = contribution ÷ EBT = **${lvTxt(S.DCL)}**.`,
        eps: `PAT = EBT × (1 − ${grp(S.t * 100)}%) = ${inr(S.PAT)}; EPS = ${inr(S.PAT)} ÷ ${grp(S.N)} = **${rs2(S.EPS)}**.`,
        ebitch: `% change in EBIT = DOL × % change in sales = ${lvTxt(S.DOL)} × ${sg(s.ch)}% = **${pct(s.dEBIT)}**.`,
        epsch: `% change in EPS = DCL × % change in sales = ${lvTxt(S.DCL)} × ${sg(s.ch)}% = **${pct(s.dEPS)}** (DCL = ${lvTxt(S.DOL)} × ${lvTxt(S.DFL)}).`
      }[a]);
    }
    const P = s.plans, k = Math.min(v.askPlan || 0, P.length - 1), p = P[k];
    const line = pl => `${pl.name}: shares ${grp(r2(pl.N))}, interest ${inr(pl.I)}${pl.P ? `, preference dividend ${inr(pl.P)}` : ''}, financial BEP ${inr(pl.fbep)}`;
    if (a === 'eps') return `${line(p)}. EPS = [(${grp(s.ebit)} − ${grp(r2(p.I))}) × ${sg(r2(1 - s.t))}${p.P ? ` − ${grp(r2(p.P))}` : ''}] ÷ ${grp(r2(p.N))} = **${rs2(s.eps[k])}**.`;
    if (a === 'fbep') return `Financial BEP = interest + preference dividend ÷ (1 − t) = ${inr(p.I)}${p.P ? ` + ${inr(p.P)} ÷ ${sg(r2(1 - s.t))}` : ''} = ${inr(p.fbep)} = **${sg(r2(p.fbep / 1e5))} lakh**.`;
    const q = s.pairs[0], A = P[0], B = P[1];
    return `${line(A)}; ${line(B)}. Setting the EPS equal: (EBIT − ${grp(r2(A.fbep))}) ÷ ${grp(r2(A.N))} = (EBIT − ${grp(r2(B.fbep))}) ÷ ${grp(r2(B.N))}, so EBIT = (${grp(r2(B.N))} × ${grp(r2(A.fbep))} − ${grp(r2(A.N))} × ${grp(r2(B.fbep))}) ÷ (${grp(r2(B.N))} − ${grp(r2(A.N))}) = ${inr(q.x)} = **${sg(r2(q.x / 1e5))} lakh** (EPS ${rs2(q.eps)} under both).`;
  }

  /* ================================================================== the definition */
  const isLev = v => v.mode !== 'ebiteps', isEps = v => v.mode === 'ebiteps';
  const def = {
    id: 'leverage', title: 'Leverage and EBIT-EPS Lab',
    blurb: 'Build the statement from sales to EPS, read DOL, DFL and DCL, and find where two financing plans give the same EPS.',
    controls: [
      { id: 'mode', type: 'seg', label: 'What to explore', value: 'lev', options: [['lev', 'Leverages'], ['ebiteps', 'EBIT-EPS plans']] },
      { id: 'firm', type: 'text', label: 'Company name (for the captions)', short: 'Company', value: 'Tapri Tea Co.', show: isLev },
      { id: 'input', type: 'seg', label: 'Sales given as', value: 'unit', options: [['unit', 'Units × price'], ['total', 'Total and VC %']], show: isLev },
      { id: 'units', type: 'number', label: 'Units sold', value: 200000, min: 0, max: 1e10, show: v => isLev(v) && v.input !== 'total' },
      { id: 'price', type: 'number', label: 'Selling price per unit (₹)', short: 'Price', value: 150, min: 0, max: 1e8, show: v => isLev(v) && v.input !== 'total' },
      { id: 'vcu', type: 'number', label: 'Variable cost per unit (₹)', short: 'VC per unit', value: 90, min: 0, max: 1e8, show: v => isLev(v) && v.input !== 'total' },
      { id: 'sales', type: 'number', label: 'Sales (₹)', value: 30000000, min: 0, max: 1e13, show: v => isLev(v) && v.input === 'total' },
      { id: 'vcr', type: 'number', label: 'Variable cost (% of sales)', short: 'VC %', value: 60, min: 0, max: 99.99, show: v => isLev(v) && v.input === 'total' },
      { id: 'fixed', type: 'number', label: 'Fixed operating cost (₹, excluding interest)', short: 'Fixed cost', value: 6000000, min: 0, max: 1e13, show: isLev },
      { id: 'debt', type: 'number', label: 'Debt (₹; 0 = none)', short: 'Debt', value: 20000000, min: 0, max: 1e13, show: isLev },
      { id: 'rate', type: 'number', label: 'Interest rate on the debt (%; 0 = no interest)', short: 'Interest rate', value: 12, min: 0, max: 100, show: isLev },
      { id: 'pref', type: 'number', label: 'Preference share capital (₹; 0 = none)', short: 'Preference capital', value: 0, min: 0, max: 1e13, show: isLev },
      { id: 'prate', type: 'number', label: 'Preference dividend rate (%; 0 = none)', short: 'Preference rate', value: 0, min: 0, max: 100, show: isLev },
      { id: 'shares', type: 'number', label: 'Number of equity shares', short: 'Equity shares', value: 1000000, min: 0, max: 1e10, show: isLev },
      { id: 'xshares', type: 'number', label: 'Existing equity shares (number; 0 = a new company)', short: 'Existing shares', value: 1000000, min: 0, max: 1e10, show: isEps },
      { id: 'xdebt', type: 'number', label: 'Existing debt (₹; 0 = none)', short: 'Existing debt', value: 10000000, min: 0, max: 1e13, show: isEps },
      { id: 'xrate', type: 'number', label: 'Interest rate on existing debt (%; 0 = no interest)', short: 'Existing rate', value: 10, min: 0, max: 100, show: isEps },
      { id: 'xpref', type: 'number', label: 'Existing preference capital (₹; 0 = none)', short: 'Existing preference', value: 0, min: 0, max: 1e13, show: isEps },
      { id: 'xprate', type: 'number', label: 'Dividend rate on existing preference capital (%; 0 = none)', short: 'Existing preference rate', value: 0, min: 0, max: 100, show: isEps },
      { id: 'tax', type: 'number', label: 'Tax rate (%)', short: 'Tax', value: 25, min: 0, max: 99.99 },
      { id: 'change', type: 'number', label: 'Change in sales to test (%; negative for a fall; 0 = no test)', short: 'Change in sales', value: 10, min: -100, max: 1000, show: isLev, help: 'The lab redoes the statement at the changed sales and checks that EBIT and EPS move by DOL × and DCL × this percentage. 0 skips the check.' },
      { id: 'ebit', type: 'number', label: 'Expected EBIT (₹)', value: 12000000, min: -1e13, max: 1e13, show: isEps },
      { id: 'plans', type: 'table', label: 'Financing plans (new funds)', max: 4, show: isEps,
        rows: [['All equity', 20000000, 50, 0, 0, 0, 0, 16], ['Half and half', 10000000, 50, 10000000, 11, 0, 0, 15], ['All debt', 0, 50, 20000000, 13, 0, 0, 12]],
        cols: [{ id: 'name', label: 'Plan', type: 'text', auto: n => 'Plan ' + (ROMAN[n] || n + 1) }, { id: 'eq', label: 'Equity ₹', type: 'number', min: 0, def: 0 },
          { id: 'price', label: 'Price ₹', type: 'number', min: 0, def: 10 }, { id: 'debt', label: 'Debt ₹', type: 'number', min: 0, def: 0 },
          { id: 'drate', label: 'Debt %', type: 'number', min: 0, max: 100, def: 10 }, { id: 'pref', label: 'Pref ₹', type: 'number', min: 0, def: 0 },
          { id: 'prate', label: 'Pref %', type: 'number', min: 0, max: 100, def: 0 }, { id: 'pe', label: 'P/E', type: 'number', min: 0, max: 200, def: 0 }],
        help: 'One row per plan: the new equity raised and its issue price (face value plus premium), new debt and its interest rate, new preference capital and its dividend rate, and the P/E ratio the market would give (0 = not given).' }
    ],
    presets, compute,
    challenge: {
      title: 'Work out the leverage or the plan',
      gen, solve, prompt, explain,
      tol: 0.011, unit: '',
      kind: 'num',
      view: (res, v) => (res && res.sim && res.sim.mode === 'lev' ? [res.sim.blank] : res && res.frames ? res.frames[0].view : null),   // the statement's empty lines, never a computed amount
      signed: (v, res) => { const w = solve(res, v); return typeof w === 'number' && w < 0; }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { amt, statement, planOf, epsAt, indifference, compute, def, presets };
  g.__lab_def_leverage = def;
})(typeof window !== 'undefined' ? window : globalThis);
