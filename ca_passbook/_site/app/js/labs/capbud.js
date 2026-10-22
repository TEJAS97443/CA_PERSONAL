/* PassBook — Capital Budgeting Lab (fm.capbud; ICAI Study Material, Paper 6A, Chapter 7 "Investment Decisions", §8–9).
   Pure part: flowsOf, pvRows, npvAt, exactNPV, irrExact, irrInterp, payback, arrOf, mirrOf, crossover, compute.
   UI part: the register() call at the bottom.   Node-testable: require('app/js/labs/capbud.js') -> {…helpers, compute, def}.

   Techniques as the Study Material teaches them:
     Payback             years until the cumulative cash flow covers the outlay; the last part-year = what is still to recover ÷ that year's inflow
     ARR                 average profit after tax ÷ initial investment, or ÷ average investment = ½(I − S) + S + working capital (and the annual version)
     NPV                 Σ CF × PVIF(k, t) − outlay;  PI = PV of inflows ÷ PV of outflows
     Discounted payback  the payback of the present values
     IRR                 two trial rates and ICAI's interpolation, IRR = L + NPV_L / (NPV_L − NPV_H) × (H − L); with equal inflows the
                         'fake payback' I / CF located in the PVAF row (Scenario 1)
     MIRR                inflows compounded at the reinvestment rate (the cost of capital) to the last year: (TV / PV of outflows)^(1/n) − 1
     NPV vs IRR          for mutually exclusive projects the NPV profiles cross at the crossover (Fisher) rate, the IRR of the difference
   PV factors as ICAI's tables print them: 3 decimals by default (also 2, 4 or exact). Year by year, a run of equal yearly inflows adds up
   the rounded factors (6.144 for 10% over 10 years); the annuity toggle uses the annuity table instead (4.111 for 12% over 6 years). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const round = (x, d) => Math.round((x + Math.sign(x) * 1e-12) * 10 ** d) / 10 ** d;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  /** rupees: whole amounts, and amounts of ₹10,000 or more, to the rupee (ICAI's working); smaller ones with paise */
  const rs = x => { const v = round(x, 2), a = Math.abs(v), whole = Math.abs(v - Math.round(v)) < 1e-9 || a >= 10000; return (v < 0 ? '−' : '') + '₹' + grp(whole ? Math.round(a) : a, whole ? 0 : 2); };
  const rsx = x => (round(x, 2) < 0 ? `(${rs(-x)})` : rs(x));
  const num = (x, d = 4) => { const v = round(x, d); return (v < 0 ? '−' : '') + Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: d }); };
  const pc = (x, d = 2) => num(x * 100, d) + '%';
  const pk = x => round(x * 100, 2).toFixed(2) + '%';
  const DPS = { 2: 2, 3: 3, 4: 4, exact: null };
  const rnd = (x, dp) => (DPS[dp] == null ? x : round(x, DPS[dp]));
  const fx = (x, dp) => (DPS[dp] == null ? num(x, 4) : x.toFixed(DPS[dp]));
  const pvif = (r, t, dp) => rnd(1 / Math.pow(1 + r, t), dp);
  const pvaf = (r, n, dp) => rnd(r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r, dp);
  const fvif = (r, n, dp) => rnd(Math.pow(1 + r, n), dp);
  const yrs = x => { const y = Math.floor(x + 1e-9), m = (x - y) * 12; return `${y} year${y === 1 ? '' : 's'}${m > 0.05 ? ` ${num(m, 1)} months` : ''}`; };

  /* ================================================================== cash flows */
  /** the project's flows from the inputs: the table's column, profits turned into cash flows (PAT + depreciation), salvage and working capital.
      Returns {cf: [CF0 … CFn], ops: the yearly flows before salvage / working capital, I, S, W, dep, pat, n} */
  function flowsOf(col, o) {
    const ops = col.map(x => +x || 0);
    while (ops.length > 2 && ops[ops.length - 1] === 0 && o.trim !== false) ops.pop();
    const n = ops.length - 1;
    if (n < 1) throw new Error('Enter at least year 0 (the outlay, as a negative number) and year 1.');
    const I = -ops[0], S = +o.salvage || 0, W = +o.wc || 0;
    let dep = null, pat = null, oper = ops.slice();
    if (o.basis === 'pat') {
      if (!(I > 0)) throw new Error('With profits after tax, year 0 must be the cost of the asset (a negative number) so that depreciation can be found.');
      dep = (I - S) / n;
      pat = ops.slice(1);
      oper = [ops[0]].concat(pat.map(p => p + dep));
    }
    const cf = oper.slice();
    cf[0] -= W; cf[n] += S + W;
    if (!cf.some(x => x < 0) || !cf.some(x => x > 0)) throw new Error('A project needs at least one outflow (negative) and one inflow (positive).');
    return { cf, oper, I, S, W, dep, pat, n };
  }
  /** equal yearly inflows from year 1 to n (before salvage and working capital), at least 2 years */
  const annuityOf = F => F.n >= 2 && F.oper.slice(1).every(x => Math.abs(x - F.oper[1]) < 1e-9) && F.oper[1] > 0 ? F.oper[1] : null;
  /** present values at rate r: rows [{t, label, cf, f, pv}] (a run of equal inflows as one '1 to n' row when the annuity factor is used) */
  function pvRows(F, r, dp, useAnnuity) {
    const A = useAnnuity && DPS[dp] != null ? annuityOf(F) : null, rows = [];
    if (A != null) {
      rows.push({ t: 0, label: '0', cf: F.cf[0], f: 1, pv: F.cf[0] });
      const f = pvaf(r, F.n, dp); rows.push({ t: -1, label: `1 to ${F.n}`, cf: A, f, pv: A * f, annuity: true });
      const extra = F.cf[F.n] - A;
      if (Math.abs(extra) > 1e-9) { const fn = pvif(r, F.n, dp); rows.push({ t: F.n, label: String(F.n), cf: extra, f: fn, pv: extra * fn, extra: true }); }
    } else F.cf.forEach((c, t) => { const f = t ? pvif(r, t, dp) : 1; rows.push({ t, label: String(t), cf: c, f, pv: c * f }); });
    const pvIn = rows.reduce((s, x) => s + (x.pv > 0 ? x.pv : 0), 0), pvOut = -rows.reduce((s, x) => s + (x.pv < 0 ? x.pv : 0), 0);
    return { r, rows, pvIn, pvOut, npv: pvIn - pvOut, pi: pvOut > 0 ? pvIn / pvOut : null, annuity: A };
  }
  const npvAt = (F, r, dp, ann) => pvRows(F, r, dp, ann).npv;
  const exactNPV = (cf, r) => cf.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
  /** every IRR of the flows in (−90%, 500%) (sign changes of the exact NPV, refined by bisection) */
  function irrExact(cf) {
    const out = [];
    let a = -0.9, fa = exactNPV(cf, a);
    for (let i = 1; i <= 1400; i++) {
      const b = -0.9 + (i * 5.9) / 1400, fb = exactNPV(cf, b);
      if (fa === 0) out.push(a);
      else if (fa * fb < 0) { let lo = a, hi = b; for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2, fm = exactNPV(cf, m); if (fa * fm <= 0) hi = m; else lo = m; } out.push((lo + hi) / 2); }
      a = b; fa = fb;
    }
    return out;
  }
  /** ICAI's IRR: NPVs at two trial rates (given, or the whole percentages around the IRR) and interpolation */
  function irrInterp(F, dp, ann, lo, hi) {
    let L = lo > 0 ? lo / 100 : null, H = hi > 0 ? hi / 100 : null;
    const auto = !(L && H), roots = irrExact(F.cf);
    if (auto) {
      const ex = roots.find(x => x > 0);
      if (ex == null) throw new Error('These cash flows have no positive IRR (the inflows never cover the outlay at any positive rate).');
      // the whole percentages a, a + 1 around the IRR whose NPVs (with the table factors) change sign, searching out from floor(IRR)
      const a0 = Math.max(1, Math.floor(ex * 100 + 1e-9)), sg = a => Math.sign(npvAt(F, a / 100, dp, ann));
      let found = null;
      for (let d = 0; d < 80 && found == null; d++) for (const a of d ? [a0 - d, a0 + d] : [a0]) if (a >= 1 && found == null && sg(a) >= 0 && sg(a + 1) < 0) found = a;
      for (let d = 0; d < 80 && found == null; d++) for (const a of d ? [a0 - d, a0 + d] : [a0]) if (a >= 1 && found == null && sg(a) * sg(a + 1) <= 0) found = a;
      const a = found == null ? a0 : found;
      L = a / 100; H = (a + 1) / 100;
    }
    if (!(H > L)) throw new Error('The higher trial rate must be above the lower one.');
    const A = pvRows(F, L, dp, ann), B = pvRows(F, H, dp, ann);
    if (Math.abs(A.npv - B.npv) < 1e-9) throw new Error('The NPVs at the two trial rates are equal; pick rates further apart.');
    const irr = L + (A.npv / (A.npv - B.npv)) * (H - L);
    return { L, H, A, B, irr, auto, brackets: Math.sign(A.npv) !== Math.sign(B.npv) || A.npv === 0 || B.npv === 0, roots, exact: roots.find(x => x > 0) != null ? roots.find(x => x > 0) : roots[0] };
  }
  /** payback of a series of flows: cumulative sums, the year it turns non-negative and the fraction of that year (even flow within the year) */
  function payback(cf) {
    const cum = []; let s = 0;
    cf.forEach(c => { s += c; cum.push(s); });
    for (let t = 1; t < cf.length; t++) if (cum[t] >= -1e-9 && cum[t - 1] < -1e-9) {
      if (cf[t] <= 0) continue;
      const need = -cum[t - 1], frac = need / cf[t];
      if (cum.slice(t).every(x => x >= -1e-9)) return { cum, year: t - 1, need, inflow: cf[t], frac, years: t - 1 + frac };
    }
    return { cum, years: null };
  }
  /** ARR: average profit after tax over (a) the initial investment, (b) the average investment ½(I − S) + S + W, (c) the annual version */
  function arrOf(F) {
    const dep = F.dep != null ? F.dep : (F.I - F.S) / F.n;
    const pat = F.pat || F.oper.slice(1).map(c => c - dep);
    const avg = pat.reduce((s, p) => s + p, 0) / F.n, avgInv = (F.I - F.S) / 2 + F.S + F.W;
    const annual = pat.map((p, i) => p / (F.I - dep * i)), annualAvg = annual.reduce((s, x) => s + x, 0) / F.n;
    return { dep, pat, avg, I: F.I, avgInv, onInitial: avg / F.I, onAverage: avg / avgInv, annual, annualAvg, opening: pat.map((_, i) => F.I - dep * i) };
  }
  /** MIRR: inflows compounded to year n at the reinvestment rate, outflows discounted at the finance rate */
  function mirrOf(cf, reinvest, finance, dp) {
    const n = cf.length - 1, rows = [];
    let tv = 0, pvOut = 0;
    cf.forEach((c, t) => {
      if (c > 0) { const f = fvif(reinvest, n - t, dp); rows.push({ t, c, f, fv: c * f }); tv += c * f; }
      else if (c < 0) { const f = t ? pvif(finance, t, dp) : 1; pvOut += -c * f; rows.push({ t, c, f, pv: -c * f, out: true }); }
    });
    if (!(pvOut > 0) || !(tv > 0)) throw new Error('MIRR needs an outflow and at least one inflow.');
    return { rows, tv, pvOut, n, ratio: tv / pvOut, mirr: Math.pow(tv / pvOut, 1 / n) - 1 };
  }
  /** crossover (Fisher) rates: the IRRs of the difference A − B (flows padded to one length) */
  function crossover(a, b) {
    const n = Math.max(a.length, b.length), d = Array.from({ length: n }, (_, t) => (a[t] || 0) - (b[t] || 0));
    return d.some(x => x > 0) && d.some(x => x < 0) ? irrExact(d) : [];
  }

  /* ================================================================== drawings */
  const niceTop = x => { if (!(x > 0)) return 10; const p = 10 ** Math.floor(Math.log10(x)), m = x / p; return (m <= 1 ? 1 : m <= 1.5 ? 1.5 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 3 ? 3 : m <= 4 ? 4 : m <= 5 ? 5 : m <= 6 ? 6 : m <= 8 ? 8 : 10) * p; };
  /** short money for axis ticks and bar labels: ₹1.2 L, ₹45 k, ₹980 */
  const short = x => { const a = Math.abs(x), s = x < 0 ? '−' : ''; return a >= 1e7 ? `${s}${num(a / 1e7, 2)} Cr` : a >= 1e5 ? `${s}${num(a / 1e5, 2)} L` : a >= 1e3 ? `${s}${num(a / 1e3, 1)} k` : `${s}${num(a, 2)}`; };
  function ticksOf(a, b, n, fmt) {
    const step = niceTop((b - a) / (n || 5)), out = [];
    for (let x = Math.ceil(a / step - 1e-9) * step; x <= b + 1e-9; x += step) { const v = round(x, 6) + 0; out.push([v, fmt ? fmt(v) : String(v)]); }
    return { step, ticks: out };
  }
  const yAxis = (lo, hi) => { const T = ticksOf(Math.min(0, lo), Math.max(0, hi), 5, short), s = T.step; const y0 = Math.floor((Math.min(0, lo) * 1.08) / s) * s, y1 = Math.ceil((Math.max(0, hi) * 1.12) / s) * s; return { y: [y0, y1], yticks: ticksOf(y0, y1, 5, short).ticks }; };
  /** cash flows (pale) with their present values (solid) appearing year by year */
  function flowBars(title, cf, pvs, upto, labels) {
    const n = cf.length - 1, ax = yAxis(Math.min(...cf), Math.max(...cf));
    const series = [{ label: 'cash flow', bars: true, bw: 0.62, values: !!labels, color: 'mute', pts: cf.map((c, t) => [t, round(c, 2), labels ? short(c) : '']) }];
    if (pvs) series.push({ label: 'present value', bars: true, bw: 0.36, values: true, color: 'a', pts: pvs.slice(0, upto + 1).map((p, t) => [t, round(p, 2), t ? short(p) : '']) });
    return { type: 'plot', title, alt: title + ': yearly cash flows as bars', w: 560, h: 240, x: [-0.6, n + 0.6], y: ax.y, yticks: ax.yticks, xticks: cf.map((_, t) => [t, String(t)]), xlabel: 'year', ylabel: '₹', legend: pvs ? 'top-right' : 'none', series };
  }
  /** an NPV profile: curves [{label, cf, color}], marks [{x (rate), y, label, color, pos}], optional chord */
  function profile(title, curves, xmax, marks, chord) {
    const pts = c => { const o = []; for (let i = 0; i <= 80; i++) { const r = (xmax * i) / 80; o.push([round(r * 100, 4), round(exactNPV(c.cf, r), 2)]); } return o; };
    const all = curves.map(pts), ys = all.flat().map(p => p[1]).concat(marks.map(m => m.y));
    const lo = Math.min(...ys), hi = Math.max(...ys), ax = yAxis(Math.max(lo, -Math.abs(hi) * 1.2), hi);
    const series = curves.map((c, i) => ({ label: c.label, pts: all[i], color: c.color }));
    if (chord) series.push({ label: 'interpolation line', pts: chord, color: 'e', dash: true });
    /* two labels close together would overprint: a later one near an earlier one moves to the other side */
    const dx = xmax * 100 * 0.12, dy = (ax.y[1] - ax.y[0]) * 0.12, placed = [];
    const shown = marks.map(m => {
      if (!m.label) return m;
      const clash = placed.some(q => Math.abs(q.x - m.x) < dx && Math.abs(q.y - m.y) < dy && (q.pos || 'above') === (m.pos || 'above'));
      const out = clash ? Object.assign({}, m, { pos: (m.pos || 'above') === 'above' ? 'below' : 'above' }) : m;
      placed.push(out); return out;
    });
    return { type: 'plot', title, alt: title + ': NPV against the discount rate; it crosses zero at the IRR', w: 560, h: 270, x: [0, xmax * 100], y: ax.y, yticks: ax.yticks, xticks: ticksOf(0, xmax * 100, 6, x => num(x, 1) + '%').ticks,
      xlabel: 'discount rate', ylabel: 'NPV (₹)', legend: curves.length + (chord ? 1 : 0) > 1 ? 'top-right' : 'none', clip: true, series, points: shown };
  }
  const pvTab = (title, P, dp, upto, extraHead) => {
    const rows = P.rows.slice(0, upto == null ? P.rows.length : upto).map(x => [x.label + (x.extra ? ' (salvage / WC)' : ''), rsx(x.cf), x.t === 0 && !x.annuity ? '1.000' : fx(x.f, dp), rsx(x.pv)]);
    const done = upto == null || upto >= P.rows.length;
    if (done) rows.push(['NPV', '', '', `**${rsx(P.npv)}**`]);
    return { type: 'table', title, head: ['Year', 'Cash flow ₹', extraHead || `Factor @ ${pc(P.r)}`, 'PV ₹'], rows, align: ['left', 'right', 'right', 'right'], cells: done ? { [`${rows.length - 1},3`]: P.npv >= 0 ? 'ok' : 'bad' } : {} };
  };

  /* ---------------------------------------------------------------- single project */
  function projectOf(v) {
    const rows = (v.flows || []).map(r => (Array.isArray(r) ? r : []));
    return flowsOf(rows.map(r => r[1]), { basis: v.basis, salvage: v.salvage, wc: v.wc });
  }
  function baseNote(dp, ann) {
    return `**Conventions.** PV factors ${dp === 'exact' ? 'exact' : `rounded to ${dp} decimals, as in ICAI's tables`}${ann ? '; equal yearly inflows use one annuity factor (the PVAF table)' : '; each year has its own factor, so a run of equal inflows adds up the rounded factors'}. Cash flows arrive at the end of each year; a part-year of payback assumes the year's flow comes in evenly. Salvage and working capital come back at the end of the last year.`;
  }
  function computeNPV(v, F) {
    const k = +v.rate / 100, dp = v.factors || '3', ann = !!v.annuity;
    const P = pvRows(F, k, dp, ann), frames = [];
    const pvYear = F.cf.map((c, t) => c * (t ? pvif(k, t, dp) : 1));
    const bars = upto => flowBars('Cash flows and their present values', F.cf, pvYear, upto, upto < 0);
    frames.push({ caption: `**Net present value**: bring every cash flow back to today at the cost of capital k = ${pc(k)} and add them up. A rupee a year away is worth 1/(1 + k) today, two years away 1/(1 + k)², and so on.${F.pat ? ` The table gives profits after tax, so each year's cash flow is PAT + depreciation ${rs(F.dep)}.` : ''}`, view: [bars(-1)] });
    if (P.annuity != null) {
      frames.push({ caption: `Year 0: the outlay ${rsx(F.cf[0])} is already in today's money (factor 1.000).`, view: [bars(0), pvTab('Present values', P, dp, 1)] });
      const a = P.rows[1];
      frames.push({ caption: `Years 1 to ${F.n} bring the same ${rs(a.cf)} every year, so one annuity factor does the job: PVAF(${pc(k)}, ${F.n}) = ${fx(a.f, dp)} (from the annuity table), PV = ${rs(a.cf)} × ${fx(a.f, dp)} = ${rs(a.pv)}.`, view: [bars(F.n), pvTab('Present values', P, dp, 2)] });
      if (P.rows[2]) frames.push({ caption: `The salvage / working capital of ${rs(P.rows[2].cf)} comes back in year ${F.n}: × ${fx(P.rows[2].f, dp)} = ${rs(P.rows[2].pv)}.`, view: [bars(F.n), pvTab('Present values', P, dp, 3)] });
    } else {
      F.cf.forEach((c, t) => {
        const f = t ? pvif(k, t, dp) : 1;
        frames.push({ caption: t === 0 ? `Year 0: ${rsx(c)} is spent today, so it counts in full (factor 1.000).` : `Year ${t}: factor 1/${num(1 + k, 4)}^${t} = ${fx(f, dp)}${dp !== 'exact' ? ' (table, ' + dp + ' decimals)' : ''}, so ${rsx(c)} is worth ${rsx(c * f)} today${t > 1 ? ` — ${pc(1 - f / pvif(k, t - 1, dp), 1)} less than a year earlier` : ''}.`,
          view: [bars(t), pvTab('Present values', P, dp, t + 1)] });
      });
    }
    frames.push({ caption: `NPV = PV of inflows ${rs(P.pvIn)} − PV of outflows ${rs(P.pvOut)} = **${rsx(P.npv)}**. ${P.npv >= 0 ? 'Positive: the project earns more than the cost of capital, so accept it.' : 'Negative: the project earns less than the cost of capital, so reject it.'}`, view: [bars(F.n), pvTab('Present values', P, dp)] });
    const pi = P.pi;
    frames.push({ caption: `Profitability index = PV of inflows ÷ PV of outflows = ${rs(P.pvIn)} ÷ ${rs(P.pvOut)} = **${num(pi, 4)}**: every rupee invested brings back ${rs(pi)} in today's money. ${pi >= 1 ? 'PI ≥ 1: accept' : 'PI < 1: reject'} — the same verdict as NPV, as always for a single project.`, view: [bars(F.n), pvTab('Present values', P, dp)] });
    return { frames, P, npv: P.npv, pi,
      stats: [{ label: `NPV at ${pc(k)}`, value: rsx(P.npv), hint: 'PV of inflows − PV of outflows', tone: P.npv >= 0 ? 'ok' : 'bad' }, { label: 'Profitability index', value: num(pi, 4), hint: 'PV of inflows ÷ PV of outflows' },
        { label: 'PV of inflows', value: rs(P.pvIn) }, { label: 'PV of outflows', value: rs(P.pvOut) }, { label: 'Decision', value: P.npv >= 0 ? 'Accept' : 'Reject', hint: 'NPV ≥ 0 (PI ≥ 1): accept' }],
      table: { head: ['Year', 'Cash flow (₹)', 'PV factor', 'PV (₹)'], rows: P.rows.map(x => [x.label, rsx(x.cf), fx(x.f, dp), rsx(x.pv)]).concat([['NPV', '', '', rsx(P.npv)]]) },
      note: baseNote(dp, ann) };
  }
  function computePayback(v, F) {
    const k = +v.rate / 100, dp = v.factors || '3', frames = [];
    const pvs = F.cf.map((c, t) => c * (t ? pvif(k, t, dp) : 1));
    const A = payback(F.cf), D = payback(pvs), R = arrOf(F);
    const cumPlot = (n1, n2) => {
      const s = [];
      const yv = A.cum.concat(D.cum);
      const ax = yAxis(Math.min(...yv), Math.max(...yv));
      if (n1 >= 0) s.push({ label: 'cumulative cash flow', pts: A.cum.slice(0, n1 + 1).map((c, t) => [t, round(c, 2)]), color: 'a', dots: true });
      if (n2 >= 0) s.push({ label: 'cumulative present value', pts: D.cum.slice(0, n2 + 1).map((c, t) => [t, round(c, 2)]), color: 'd', dots: true });
      const marks = [];
      if (n1 >= F.n && A.years != null) marks.push({ x: round(A.years, 4), y: 0, label: num(A.years, 2) + ' yrs', color: 'a', pos: 'above' });
      if (n2 >= F.n && D.years != null) marks.push({ x: round(D.years, 4), y: 0, label: num(D.years, 2) + ' yrs', color: 'd', pos: 'below' });
      return { type: 'plot', title: 'Recovering the outlay', alt: 'Cumulative cash flow by year; payback is where it crosses zero', w: 560, h: 260, x: [0, F.n], y: ax.y, yticks: ax.yticks, xticks: F.cf.map((_, t) => [t, String(t)]), xlabel: 'year', ylabel: 'cumulative (₹)', legend: s.length > 1 ? 'bottom-right' : 'none', series: s, points: marks };
    };
    const tab = (n1, n2) => ({ type: 'table', title: 'Cumulative cash flows', head: ['Year', 'Cash flow (₹)', 'Cumulative (₹)', `PV @ ${pc(k)} (₹)`, 'Cumulative PV (₹)'],
      rows: F.cf.map((c, t) => [String(t), rsx(c), t <= n1 ? rsx(A.cum[t]) : '', t <= n2 ? rsx(pvs[t]) : '', t <= n2 ? rsx(D.cum[t]) : '']), align: ['left', 'right', 'right', 'right', 'right'],
      cells: Object.assign({}, A.years != null && n1 >= A.year + 1 ? { [`${A.year + 1},2`]: 'ok' } : {}, D.years != null && n2 >= D.year + 1 ? { [`${D.year + 1},4`]: 'ok' } : {}) });
    frames.push({ caption: `**Payback**: how long until the cash that comes in has repaid the ${rs(F.I + F.W)} put in? Add up the cash flows year by year until the running total reaches zero.${F.pat ? ` (Cash flow = profit after tax + depreciation ${rs(R.dep)}.)` : ''}`, view: [cumPlot(0, -1), tab(0, -1)] });
    for (let t = 1; t <= F.n; t++) {
      const turn = A.years != null && t === A.year + 1;
      frames.push({ caption: `Year ${t}: ${rsx(F.cf[t])} comes in, the running total is ${rsx(A.cum[t])}.${turn ? ` It turns positive during this year: ${rs(A.need)} was still to recover and the year brings ${rs(A.inflow)}, so payback = ${A.year} + ${rs(A.need)}/${rs(A.inflow)} = **${num(A.years, 2)} years** (${yrs(A.years)}).` : A.cum[t] < 0 ? ` Still ${rs(-A.cum[t])} to recover.` : ''}`, view: [cumPlot(t, -1), tab(t, -1)] });
    }
    if (A.years == null) frames[frames.length - 1].caption += ' The outlay is never fully recovered: there is no payback.';
    frames.push({ caption: `**Discounted payback**: payback ignores the time value of money, so repeat it with present values at ${pc(k)}. ${D.years != null ? `The PVs cover the outlay during year ${D.year + 1}: ${D.year} + ${rs(D.need)}/${rs(D.inflow)} = **${num(D.years, 2)} years** (${yrs(D.years)}), later than the simple ${A.years != null ? num(A.years, 2) : '—'} years.` : 'The present values never cover the outlay within the project\'s life: no discounted payback (NPV is negative).'}`, view: [cumPlot(F.n, F.n), tab(F.n, F.n)] });
    const arrRows = [['Depreciation (straight line)', '(I − S) / n', `(${rs(R.I)} − ${rs(F.S)}) / ${F.n} = ${rs(R.dep)}`], ['Average profit after tax', 'Σ PAT / n', `${rs(R.pat.reduce((s, p) => s + p, 0))} / ${F.n} = ${rs(R.avg)}`],
      ['ARR on initial investment', 'average PAT ÷ I', `${rs(R.avg)} ÷ ${rs(R.I)} = **${pk(R.onInitial)}**`], ['Average investment', '½(I − S) + S + WC', `½(${rs(R.I)} − ${rs(F.S)}) + ${rs(F.S)}${F.W ? ' + ' + rs(F.W) : ''} = ${rs(R.avgInv)}`],
      ['ARR on average investment', 'average PAT ÷ average investment', `${rs(R.avg)} ÷ ${rs(R.avgInv)} = **${pk(R.onAverage)}**`], ['ARR, annual basis (average)', 'mean of PAT ÷ opening book value', `**${pk(R.annualAvg)}**`]];
    const arrTab = { type: 'table', title: 'Accounting rate of return', head: ['Quantity', 'Formula', 'Value'], rows: arrRows, align: ['left', 'left', 'right'] };
    frames.push({ caption: `**ARR** uses accounting profit, not cash: profit after tax = cash flow − depreciation of ${rs(R.dep)} a year (yearly PAT: ${R.pat.map(p => rsx(p)).join(', ')}). Average PAT ${rs(R.avg)} on the initial investment is **${pk(R.onInitial)}**; on the average investment, ${rs(R.avgInv)}, it is **${pk(R.onAverage)}** — the Study Material accepts either base if it is used for every project.`, view: [cumPlot(F.n, F.n), arrTab] });
    const stats = [{ label: 'Payback period', value: A.years == null ? 'none' : num(A.years, 2) + ' years', hint: 'whole years + amount still to recover ÷ next year\'s inflow' },
      { label: `Discounted payback @ ${pc(k)}`, value: D.years == null ? 'none' : num(D.years, 2) + ' years', hint: 'the same with present values' },
      { label: 'ARR (average investment)', value: pk(R.onAverage), hint: 'average PAT ÷ [½(I − S) + S + WC]' }, { label: 'ARR (initial investment)', value: pk(R.onInitial), hint: 'average PAT ÷ initial investment' }];
    return { frames, stats, payback: A, dpayback: D, arr: R,
      table: { head: ['Measure', 'Value'], rows: [['Payback', A.years == null ? 'none' : `${num(A.years, 2)} years (${yrs(A.years)})`], ['Discounted payback', D.years == null ? 'none' : `${num(D.years, 2)} years (${yrs(D.years)})`], ['ARR on initial investment', pk(R.onInitial)], ['ARR on average investment', pk(R.onAverage)], ['ARR, annual basis', pk(R.annualAvg)]] },
      note: baseNote(dp, false) + ' ARR: depreciation is straight line, (I − S) / n; average investment = ½(I − S) + S + working capital.' };
  }
  function computeIRR(v, F) {
    const k = +v.rate / 100, dp = v.factors || '3', ann = !!v.annuity, frames = [];
    const Y = irrInterp(F, dp, ann, +v.lo, +v.hi), ex = Y.exact;
    const xmax = Math.max(0.1, Math.ceil(Math.max(Y.H, ex || 0, k) * 1.5 * 20) / 20);
    const mk = (r, y, label, color, pos) => ({ x: round(r * 100, 4), y: round(y, 2), label, color, pos });
    const pA = mk(Y.L, Y.A.npv, rsx(Y.A.npv), 'a', 'above'), pB = mk(Y.H, Y.B.npv, rsx(Y.B.npv), 'a', 'below');
    const chord = [[round(Y.L * 100, 4), round(Y.A.npv, 2)], [round(Y.H * 100, 4), round(Y.B.npv, 2)]].concat(Y.brackets ? [] : [[round(Y.irr * 100, 4), 0]]);
    const curveOnly = (marks, withChord) => profile('NPV profile', [{ label: 'NPV', cf: F.cf, color: 'mute' }], xmax, marks, withChord ? chord : null);
    const P = s => ({ type: 'plot', title: 'NPV at the trial rates', alt: 'NPV at the two trial rates and the straight line between them', w: 560, h: 260, x: [Math.max(0, Y.L * 100 - (Y.H - Y.L) * 100), Y.H * 100 + (Y.H - Y.L) * 100],
      y: (() => { const m = Math.max(Math.abs(Y.A.npv), Math.abs(Y.B.npv)) * 1.6; return [-m, m]; })(), xlabel: 'discount rate (%)', ylabel: 'NPV (₹)', legend: 'none',
      xticks: [[round(Y.L * 100, 4), pc(Y.L)], [round(Y.H * 100, 4), pc(Y.H)]], yticks: [[0, '0']],
      series: s >= 2 ? [{ label: 'interpolation line', pts: chord, color: 'e' }] : [], points: [pA].concat(s >= 1 ? [pB] : [], s >= 2 ? [mk(Y.irr, 0, pk(Y.irr), 'ok', 'above')] : []) });
    const A = annuityOf(F);
    const fake = ann && A != null ? (F.I + F.W) / A : null;
    frames.push({ caption: `**Internal rate of return**: the discount rate at which NPV = 0, i.e. the PV of the inflows exactly equals the outlay. ICAI finds it by trial: work out NPV at two rates, one giving a positive NPV and one a negative, and interpolate.${fake != null ? ` With equal inflows of ${rs(A)}, the 'fake payback' ${rs(F.I + F.W)} / ${rs(A)} = ${num(fake, 3)} is looked up in the ${F.n}-year row of the annuity table.` : ''}`, view: [flowBars('Cash flows', F.cf, null, 0, true)] });
    const why = Y.auto ? (fake != null ? `${num(fake, 3)} lies between PVAF ${fx(Y.A.rows[1].f, dp)} at ${pc(Y.L, 0)} and ${fx(Y.B.rows[1].f, dp)} at ${pc(Y.H, 0)}, so those are the trial rates.` : `The trial rates are the two whole percentages on either side of the IRR, ${pc(Y.L, 0)} and ${pc(Y.H, 0)} (ICAI's questions often name a wider pair; set them in the inputs).`) : `Trial rates ${pc(Y.L)} and ${pc(Y.H)}.`;
    frames.push({ caption: `${why} At ${pc(Y.L)}: PV of inflows ${rs(Y.A.pvIn)} − outflows ${rs(Y.A.pvOut)} gives NPV = **${rsx(Y.A.npv)}**${Y.A.npv >= 0 ? ' (positive: the IRR is higher)' : ' (negative: the IRR is lower)'}.`, view: [P(0), pvTab(`NPV at ${pc(Y.L)}`, Y.A, dp)] });
    frames.push({ caption: `At ${pc(Y.H)}: NPV = **${rsx(Y.B.npv)}**. ${Y.brackets ? 'The sign has changed, so the IRR lies between the two rates.' : 'The sign has not changed, so the IRR is not between these rates: the formula extrapolates — pick one rate on each side of zero.'}`, view: [P(1), pvTab(`NPV at ${pc(Y.H)}`, Y.B, dp)] });
    frames.push({ caption: `Interpolate along the straight line: IRR = ${pc(Y.L)} + ${rs(Y.A.npv)} / (${rs(Y.A.npv)} − (${rsx(Y.B.npv)})) × (${pc(Y.H)} − ${pc(Y.L)}) = **${pk(Y.irr)}**.`, view: [P(2), pvTab(`NPV at ${pc(Y.H)}`, Y.B, dp)] });
    const marks = [mk(Y.L, Y.A.npv, '', 'e'), mk(Y.H, Y.B.npv, '', 'e'), mk(ex != null ? ex : Y.irr, 0, 'IRR ' + pk(ex != null ? ex : Y.irr), 'ok', 'above'), mk(k, npvAt(F, k, dp, ann), `k ${pc(k)}: ${rsx(npvAt(F, k, dp, ann))}`, 'b', 'above')];
    const multi = Y.roots.length > 1 ? ` These flows change sign more than once and have ${Y.roots.length} IRRs (${Y.roots.map(x => pk(x)).join(', ')}): the IRR rule can mislead here, so trust NPV.` : '';
    frames.push({ caption: `The whole NPV profile: NPV falls as the rate rises and crosses zero at the true IRR, ${ex != null ? pk(ex) : '—'}; the straight line ${ex != null && Math.abs(Y.irr - ex) > 0.00005 ? `gives ${pk(Y.irr)}, slightly ${Y.irr > ex ? 'high' : 'low'} because the curve bends` : 'is right on it'}. ${Y.irr >= k ? `IRR ≥ k = ${pc(k)}: accept` : `IRR < k = ${pc(k)}: reject`} (the same verdict as NPV at ${pc(k)}).${multi}`, view: [curveOnly(marks, true), pvTab(`NPV at ${pc(Y.H)}`, Y.B, dp)] });
    return { frames, irr: Y, npv: npvAt(F, k, dp, ann),
      stats: [{ label: 'IRR (interpolated)', value: pk(Y.irr), hint: 'L + NPV_L / (NPV_L − NPV_H) × (H − L)' }, { label: `NPV at ${pc(Y.L)}`, value: rsx(Y.A.npv) }, { label: `NPV at ${pc(Y.H)}`, value: rsx(Y.B.npv) },
        { label: 'IRR (exact)', value: ex == null ? '—' : pk(ex), hint: 'where the NPV curve crosses zero, unrounded factors' }, { label: 'Decision', value: Y.irr >= k ? 'Accept' : 'Reject', hint: `IRR ≥ cost of capital ${pc(k)}: accept` }],
      table: { head: ['Rate', 'PV of inflows (₹)', 'PV of outflows (₹)', 'NPV (₹)'], rows: [[pc(Y.L), rs(Y.A.pvIn), rs(Y.A.pvOut), rsx(Y.A.npv)], [pc(Y.H), rs(Y.B.pvIn), rs(Y.B.pvOut), rsx(Y.B.npv)], ['IRR', '', '', pk(Y.irr)]] },
      note: baseNote(dp, ann) };
  }
  function computeMIRR(v, F) {
    const k = +v.rate / 100, re = +v.reinvest > 0 ? +v.reinvest / 100 : k, dp = v.factors || '3', frames = [];
    const M = mirrOf(F.cf, re, k, dp), ex = irrExact(F.cf).find(x => x > 0);
    const ins = M.rows.filter(r => !r.out);
    const fvBars = upto => {
      const shown = ins.slice(0, upto), ax = yAxis(0, Math.max(...ins.map(r => r.fv), ...ins.map(r => r.c)));
      return { type: 'plot', title: `Each inflow carried to year ${M.n} at ${pc(re)}`, alt: 'Bars: each year\'s inflow and what it grows to by the last year', w: 560, h: 240, x: [0.4, M.n + 0.6], y: ax.y, yticks: ax.yticks, xticks: F.cf.map((_, t) => [t, String(t)]).slice(1), xlabel: 'year the inflow arrives', ylabel: '₹', legend: 'top-left',
        series: [{ label: 'inflow', bars: true, bw: 0.62, color: 'mute', pts: ins.map(r => [r.t, round(r.c, 2)]) }, { label: `value in year ${M.n}`, bars: true, bw: 0.36, values: true, color: 'a', pts: shown.map(r => [r.t, round(r.fv, 2), short(r.fv)]) }] };
    };
    const tab = upto => ({ type: 'table', title: `Terminal value at ${pc(re)}`, head: ['Year', 'Inflow (₹)', `Years to ${M.n}`, 'Factor (1 + r)ⁿ', `Value in year ${M.n} (₹)`],
      rows: ins.slice(0, upto).map(r => [String(r.t), rs(r.c), String(M.n - r.t), fx(r.f, dp), rs(r.fv)]).concat(upto >= ins.length ? [['Terminal value', '', '', '', `**${rs(M.tv)}**`]] : []), align: ['left', 'right', 'right', 'right', 'right'] });
    frames.push({ caption: `**MIRR** fixes IRR's reinvestment assumption: instead of assuming every inflow earns the project's own IRR, each inflow is reinvested at ${pc(re)}${re === k ? ' (the cost of capital)' : ''} until year ${M.n}. That leaves one outflow today and one inflow at the end.`, view: [fvBars(0), tab(0)] });
    ins.forEach((r, i) => frames.push({ caption: `Year ${r.t}: ${rs(r.c)} earns ${pc(re)} for ${M.n - r.t} year${M.n - r.t === 1 ? '' : 's'}: × ${fx(r.f, dp)} = ${rs(r.fv)}${M.n - r.t === 0 ? ' (received in the last year, so it stays as it is)' : ''}.`, view: [fvBars(i + 1), tab(i + 1)] }));
    const outTxt = M.rows.filter(r => r.out).map(r => r.t ? `${rs(-r.c)} in year ${r.t} × ${fx(r.f, dp)}` : `${rs(-r.c)} today`).join(' + ');
    frames.push({ caption: `Terminal value = **${rs(M.tv)}**. The outflows in today's money: ${outTxt} = ${rs(M.pvOut)}. MIRR is the rate that grows ${rs(M.pvOut)} into ${rs(M.tv)} in ${M.n} years: (${rs(M.tv)} / ${rs(M.pvOut)})^(1/${M.n}) − 1 = ${num(M.ratio, 4)}^(1/${M.n}) − 1 = **${pk(M.mirr)}**.`, view: [fvBars(ins.length), tab(ins.length)] });
    frames.push({ caption: `MIRR ${pk(M.mirr)} ${M.mirr >= k ? '≥' : '<'} k ${pc(k)}: ${M.mirr >= k ? 'accept' : 'reject'}. ${ex != null ? `The IRR is ${pk(ex)}; MIRR lies between k and the IRR because it reinvests at k, not at the IRR.` : ''}`, view: [fvBars(ins.length), tab(ins.length)] });
    return { frames, mirr: M, irrExact: ex,
      stats: [{ label: 'MIRR', value: pk(M.mirr), hint: '(terminal value ÷ PV of outflows)^(1/n) − 1' }, { label: 'Terminal value', value: rs(M.tv), hint: 'inflows compounded to the last year' }, { label: 'PV of outflows', value: rs(M.pvOut) }, { label: 'IRR (for comparison)', value: ex == null ? '—' : pk(ex) }],
      table: { head: ['Year', 'Inflow (₹)', 'Factor', 'Terminal value (₹)'], rows: ins.map(r => [String(r.t), rs(r.c), fx(r.f, dp), rs(r.fv)]).concat([['Total', '', '', rs(M.tv)]]) },
      note: baseNote(dp, false) + ' MIRR: inflows are reinvested at the reinvestment rate (default the cost of capital); outflows are discounted at the cost of capital.' };
  }

  /* ---------------------------------------------------------------- two mutually exclusive projects */
  function computeCompare(v) {
    const rows = (v.flows || []).map(r => (Array.isArray(r) ? r : []));
    const col = j => rows.map(r => r[j]);
    if (!col(2).some(x => +x)) throw new Error('Enter Project B\'s cash flows in the third column (year 0 negative) to compare two projects.');
    const FA = flowsOf(col(1), {}), FB = flowsOf(col(2), {});
    const k = +v.rate / 100, dp = v.factors || '3', ann = !!v.annuity;
    const PA = pvRows(FA, k, dp, ann), PB = pvRows(FB, k, dp, ann);
    const YA = irrInterp(FA, dp, ann, +v.lo, +v.hi), YB = irrInterp(FB, dp, ann, +v.loB, +v.hiB);
    const X = crossover(FA.cf, FB.cf).filter(x => x > 0), fisher = X.length ? X[0] : null;
    const byNPV = PA.npv >= PB.npv ? 'A' : 'B', byIRR = YA.irr >= YB.irr ? 'A' : 'B', byPI = (PA.pi || 0) >= (PB.pi || 0) ? 'A' : 'B';
    const conflict = byNPV !== byIRR;
    const n = Math.max(FA.n, FB.n);
    const flowTab = { type: 'table', title: 'Mutually exclusive projects', head: ['Year', 'Project A (₹)', 'Project B (₹)'], rows: Array.from({ length: n + 1 }, (_, t) => [String(t), t <= FA.n ? rsx(FA.cf[t]) : '—', t <= FB.n ? rsx(FB.cf[t]) : '—']), align: ['left', 'right', 'right'] };
    const both = { type: 'table', title: `Present values at ${pc(k)}`, head: ['Year', `Factor @ ${pc(k)}`, 'PV of A (₹)', 'PV of B (₹)'],
      rows: Array.from({ length: n + 1 }, (_, t) => [String(t), t ? fx(pvif(k, t, dp), dp) : '1.000', t <= FA.n ? rsx(FA.cf[t] * (t ? pvif(k, t, dp) : 1)) : '—', t <= FB.n ? rsx(FB.cf[t] * (t ? pvif(k, t, dp) : 1)) : '—']).concat([['NPV', '', `**${rsx(PA.npv)}**`, `**${rsx(PB.npv)}**`]]), align: ['left', 'right', 'right', 'right'] };
    const rank = { type: 'table', title: 'Ranking', head: ['Method', 'Project A', 'Project B', 'Prefers'], rows: [[`NPV at ${pc(k)}`, rsx(PA.npv), rsx(PB.npv), byNPV], ['IRR', pk(YA.irr), pk(YB.irr), byIRR], ['PI', num(PA.pi, 4), num(PB.pi, 4), byPI]], align: ['left', 'right', 'right', 'left'],
      cells: conflict ? { '0,3': 'ok', '1,3': 'bad' } : { '0,3': 'ok', '1,3': 'ok' } };
    const xmax = Math.max(0.1, Math.ceil(Math.max(YA.irr, YB.irr, k, fisher || 0) * 1.35 * 20) / 20);
    const mk = (r, y, label, color, pos) => ({ x: round(r * 100, 4), y: round(y, 2), label, color, pos });
    const prof = s => profile('NPV profiles', [{ label: 'Project A', cf: FA.cf, color: 'a' }, { label: 'Project B', cf: FB.cf, color: 'd' }], xmax,
      [mk(k, exactNPV(FA.cf, k), '', 'a'), mk(k, exactNPV(FB.cf, k), '', 'd')].concat(s >= 1 ? [mk(YA.exact != null ? YA.exact : YA.irr, 0, 'IRR A', 'a', 'above'), mk(YB.exact != null ? YB.exact : YB.irr, 0, 'IRR B', 'd', 'below')] : [], s >= 2 && fisher != null ? [mk(fisher, exactNPV(FA.cf, fisher), `crossover ${pk(fisher)}`, 'ok', 'above')] : []));
    const frames = [];
    frames.push({ caption: `**Mutually exclusive projects**: choosing one rules out the other, so the methods must rank them. Cost of capital k = ${pc(k)}.`, view: [flowTab] });
    frames.push({ caption: `NPV at ${pc(k)}: A **${rsx(PA.npv)}**, B **${rsx(PB.npv)}**. NPV prefers **${byNPV}**, which adds more to the shareholders' wealth.`, view: [prof(0), both] });
    const irrTxt = (Y, nm) => `IRR of ${nm}: ${pc(Y.L)} + ${rs(Y.A.npv)} / (${rs(Y.A.npv)} − (${rsx(Y.B.npv)})) × (${pc(Y.H)} − ${pc(Y.L)}) = **${pk(Y.irr)}**`;
    frames.push({ caption: `${irrTxt(YA, 'A')}; ${irrTxt(YB, 'B')}. IRR prefers **${byIRR}**${conflict ? ' — the opposite of NPV' : ', the same as NPV'}.`, view: [prof(1), rank] });
    frames.push({ caption: fisher != null ? `The two NPV profiles cross at the **crossover (Fisher) rate ${pk(fisher)}**, the IRR of the difference between the two projects' flows. ${k < fisher ? `k = ${pc(k)} is below it, so NPV and IRR disagree: at low rates the project with ${PA.npv >= PB.npv ? 'A' : 'B'}'s larger or later flows wins on NPV, while IRR favours the other.` : `k = ${pc(k)} is above it, so NPV and IRR agree.`}` : 'The NPV profiles do not cross at any positive rate, so NPV and IRR rank the projects the same way at every cost of capital.', view: [prof(2), rank] });
    const oa = Math.abs(FA.cf[0]), ob = Math.abs(FB.cf[0]);
    const why = conflict ? (FA.n !== FB.n ? 'different lives' : Math.max(oa, ob) >= 1.5 * Math.min(oa, ob) ? 'a difference in size (scale)' : 'a difference in the timing of the cash flows') : '';
    frames.push({ caption: conflict ? `**Conflict** (from ${why}): IRR assumes cash is reinvested at each project's own IRR, NPV at the cost of capital. The Study Material resolves it with NPV: choose **Project ${byNPV}**, the one that maximises shareholders' wealth.` : `No conflict: every method ranks Project **${byNPV}** first. Choose ${byNPV}.`, view: [prof(2), rank] });
    return { frames, A: { P: PA, Y: YA, F: FA }, B: { P: PB, Y: YB, F: FB }, fisher, byNPV, byIRR, byPI, conflict, choose: byNPV,
      stats: [{ label: `NPV of A at ${pc(k)}`, value: rsx(PA.npv) }, { label: `NPV of B at ${pc(k)}`, value: rsx(PB.npv) }, { label: 'IRR of A', value: pk(YA.irr), hint: 'interpolated' }, { label: 'IRR of B', value: pk(YB.irr), hint: 'interpolated' },
        { label: 'Crossover rate', value: fisher == null ? 'none' : pk(fisher), hint: 'the IRR of A − B: where the NPV profiles cross' }, { label: 'Choose', value: 'Project ' + byNPV, hint: 'the higher NPV' }],
      table: { head: ['Method', 'Project A', 'Project B', 'Prefers'], rows: rank.rows },
      note: baseNote(dp, ann) + ' Each project\'s IRR uses its own trial rates (0 = the whole percentages around it). The crossover rate is found exactly.' };
  }

  let lastMode = 'npv';
  function compute(v) {
    const mode = ['npv', 'payback', 'irr', 'mirr', 'compare'].indexOf(v.mode) >= 0 ? v.mode : 'npv';
    lastMode = mode;
    if (!(+v.rate >= 0)) throw new Error('The cost of capital cannot be negative.');
    let res;
    if (mode === 'compare') res = computeCompare(v);
    else {
      const F = projectOf(v);
      res = mode === 'payback' ? computePayback(v, F) : mode === 'irr' ? computeIRR(v, F) : mode === 'mirr' ? computeMIRR(v, F) : computeNPV(v, F);
      res.F = F;
    }
    res.mode = mode;
    return res;
  }

  /* ================================================================== the lab */
  const T = (...cols) => cols[0].map((_, t) => [String(t)].concat(cols.map(c => c[t])));
  const one = cf => T(cf), two = (a, b) => { const n = Math.max(a.length, b.length), pad = x => x.concat(Array(n - x.length).fill(0)); return T(pad(a), pad(b)); };
  const base = o => Object.assign({ rate: 10, factors: '3', annuity: false, basis: 'cfat', salvage: 0, wc: 0, lo: 0, hi: 0, loB: 0, hiB: 0, reinvest: 0 }, o);
  const ILL7 = one([-136000, 30000, 40000, 60000, 30000, 20000]);
  const presets = [
    { label: 'Study Material Ill. 3 · NPV of ₹1,00,000 returning ₹55,000, ₹80,000, ₹15,000 at 10%', values: base({ mode: 'npv', flows: one([-100000, 55000, 80000, 15000]) }) },
    { label: 'Study Material Ill. 7 · IRR of ₹1,36,000 by trial at 10% and 12%', values: base({ mode: 'irr', flows: ILL7, lo: 10, hi: 12 }) },
    { label: 'Study Material Ill. 6 · IRR of ₹10,00,000 returning ₹2,50,000 a year for 6 years (annuity table)', values: base({ mode: 'irr', annuity: true, rate: 12, flows: one([-1000000, 250000, 250000, 250000, 250000, 250000, 250000]) }) },
    { label: 'Study Material Ill. 9 · MIRR of the Ill. 7 project at 8% (4-decimal factors)', values: base({ mode: 'mirr', rate: 8, factors: '4', flows: ILL7 }) },
    { label: 'Study Material Ill. 2 · ARR on ₹10,00,000 with profits after tax and a ₹80,000 salvage', values: base({ mode: 'payback', basis: 'pat', salvage: 80000, flows: one([-1000000, 50000, 75000, 125000, 130000, 80000]) }) },
    { label: 'Study Material Ill. 10 · scale: A ₹1 lakh against B ₹3 lakh at 10% (IRR at 20% and 25%)', values: base({ mode: 'compare', flows: two([-100000, 50000, 60000, 40000], [-300000, 140000, 190000, 100000]), lo: 20, hi: 25, loB: 20, hiB: 25 }) },
    { label: 'Study Material Ill. 11 · timing: X early, Y late, at 10%', values: base({ mode: 'compare', flows: two([-250000, 200000, 100000, 50000], [-300000, 50000, 100000, 300000]), lo: 20, hi: 25, loB: 15, hiB: 20 }) },
    { label: 'PYQ May 2025 Q3(a) · NPV, PI and discounted payback at 10% (outlay that gives a 12% IRR)', values: base({ mode: 'npv', flows: one([-308640, 100000, 100000, 80000, 80000]), salvage: 50000 }) },
    { label: 'PYQ May 2025 Q3(a) · MIRR at a 10% reinvestment rate', values: base({ mode: 'mirr', flows: one([-308640, 100000, 100000, 80000, 80000]), salvage: 50000 }) },
    { label: 'PYQ Jan 2026 Q2(b) · Algo Steel: ARR on average investment and NPV at 12%', values: base({ mode: 'payback', rate: 12, basis: 'pat', salvage: 240000, flows: one([-2400000, 495000, 1095000, 945000, 795000]) }) },
    { label: 'PYQ Jan 2025 Q3(a) · SRT Ltd: NPV and PI at 18% with ₹2,50,000 working capital', values: base({ mode: 'npv', rate: 18, salvage: 100000, wc: 250000, flows: one([-2000000, 3250000, 3208000, 3320000, 3320000, 3320000]) }) },
    { label: 'RTP May 2024 Q5 · HMR Ltd: IRR by trial at 10% and 20%', values: base({ mode: 'irr', salvage: 35000, wc: 50000, lo: 10, hi: 20, flows: one([-495000].concat(Array(10).fill(97450))) }) },
    { label: 'RTP Sep 2026 Q7 · Machines I and II: NPV, IRR and discounted payback at 12%', values: base({ mode: 'compare', rate: 12, lo: 15, hi: 16, loB: 14, hiB: 15, flows: two([-1000000, 301500, 301500, 301500, 301500, 301500], [-1500000, 393500, 393500, 393500, 393500, 393500, 393500]) }) },
    { label: 'MTP May 2025 S2 Q1(a) · Project A: discounted payback with 2-decimal factors', values: base({ mode: 'payback', factors: '2', flows: one([-200000, 35000, 80000, 55000, 75000, 20000]) }) },
    { label: 'Tapri Tea · kulhad café in Pune: ₹12 lakh, rising inflows, k 14%', values: base({ mode: 'npv', rate: 14, salvage: 150000, flows: one([-1200000, 250000, 350000, 400000, 400000, 300000]) }) },
    { label: 'Tapri Tea · Dev\'s dilemma: chai-premix line (quick) or cold-chain fleet (big)', values: base({ mode: 'compare', rate: 11, flows: two([-500000, 300000, 250000, 100000, 50000], [-1500000, 200000, 500000, 700000, 800000]) }) }
  ];
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const MODES = [['npv', 'NPV and profitability index'], ['payback', 'Payback and ARR'], ['irr', 'IRR by interpolation'], ['mirr', 'MIRR'], ['compare', 'Two projects: NPV vs IRR']];
  const single = v => v.mode !== 'compare';
  const def = {
    id: 'capbud', title: 'Capital Budgeting Lab',
    blurb: 'Work out NPV, PI, payback, ARR, IRR by interpolation and MIRR, and watch NPV and IRR disagree on two projects.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to work out', value: 'npv', options: MODES },
      { id: 'flows', type: 'table', label: 'Cash flows: year 0 is the outlay (negative); column B only for two projects', short: 'Cash flows', max: 16, rows: two([-100000, 55000, 80000, 15000], [-300000, 140000, 190000, 100000]),
        cols: [{ id: 'y', label: 'Year', type: 'text', auto: n => String(n) }, { id: 'a', label: 'Project A ₹', type: 'number', def: 0 }, { id: 'b', label: 'Project B ₹', type: 'number', def: 0 }],
        show: v => { if (Array.isArray(v.flows)) v.flows.forEach((r, i) => { if (Array.isArray(r)) r[0] = String(i); }); return true; } },
      { id: 'rate', type: 'number', label: 'Cost of capital k (%)', short: 'k', value: 10, min: 0, max: 100, step: 0.01 },
      { id: 'basis', type: 'seg', label: 'Yearly figures are', value: 'cfat', options: [['cfat', 'Cash flows'], ['pat', 'Profits after tax']], show: single,
        help: 'Profits after tax (after depreciation) are turned into cash flows by adding back straight-line depreciation, (cost − salvage) / years.' },
      { id: 'salvage', type: 'number', label: 'Salvage value at the end, ₹ (0 = none)', short: 'Salvage', value: 0, min: 0, max: 1e12, show: single },
      { id: 'wc', type: 'number', label: 'Working capital: in at year 0, back at the end, ₹ (0 = none)', short: 'Working capital', value: 0, min: 0, max: 1e12, show: single },
      { id: 'factors', type: 'select', label: 'PV factors', value: '3', options: [['3', '3 decimals (ICAI tables)'], ['2', '2 decimals'], ['4', '4 decimals'], ['exact', 'Exact']] },
      { id: 'annuity', type: 'toggle', label: 'Equal yearly inflows: use one annuity factor (PVAF table)', short: 'Annuity factor', value: false, show: v => v.mode === 'npv' || v.mode === 'irr' || v.mode === 'compare',
        help: 'ICAI\'s annuity table rounds the annuity factor once (4.111 for 12%, 6 years); year-by-year rows add the rounded yearly factors (4.112). Questions use both: match the factor the question gives.' },
      { id: 'lo', type: 'number', label: 'Lower trial rate, % (0 = automatic)', short: 'Lower rate', value: 0, min: 0, max: 200, step: 0.5, show: v => v.mode === 'irr' || v.mode === 'compare' },
      { id: 'hi', type: 'number', label: 'Higher trial rate, % (0 = automatic)', short: 'Higher rate', value: 0, min: 0, max: 200, step: 0.5, show: v => v.mode === 'irr' || v.mode === 'compare' },
      { id: 'loB', type: 'number', label: 'Project B: lower trial rate, % (0 = automatic)', short: 'B lower rate', value: 0, min: 0, max: 200, step: 0.5, show: v => v.mode === 'compare' },
      { id: 'hiB', type: 'number', label: 'Project B: higher trial rate, % (0 = automatic)', short: 'B higher rate', value: 0, min: 0, max: 200, step: 0.5, show: v => v.mode === 'compare' },
      { id: 'reinvest', type: 'number', label: 'Reinvestment rate, % (0 = the cost of capital)', short: 'Reinvestment', value: 0, min: 0, max: 100, step: 0.01, show: v => v.mode === 'mirr' }
    ],
    presets, compute,
    challenge: {
      title: 'Evaluate the project',
      gen(r) {
        const mode = lastMode, n = pick(r, [3, 4, 4, 5, 5, 6]), I = pick(r, [1, 1.5, 2, 2.5, 3, 4, 5]) * 100000;
        const k = pick(r, [8, 10, 10, 12, 12, 14, 15]);
        const shape = pick(r, ['even', 'up', 'down', 'mixed']);
        const flowsFor = (II, nn, tilt) => {
          const avg = (II * pick(r, [1.15, 1.3, 1.45, 1.6])) / nn, out = [-II];
          for (let t = 1; t <= nn; t++) { const w = tilt === 'even' ? 1 : tilt === 'up' ? 0.6 + (0.8 * (t - 1)) / Math.max(1, nn - 1) : tilt === 'down' ? 1.4 - (0.8 * (t - 1)) / Math.max(1, nn - 1) : pick(r, [0.7, 0.9, 1, 1.2, 1.4]); out.push(Math.round((avg * w) / 1000) * 1000); }
          return out;
        };
        const o = { rate: k, factors: '3', annuity: false, basis: 'cfat', salvage: 0, wc: 0, lo: 0, hi: 0, loB: 0, hiB: 0, reinvest: 0, ask: pick(r, ['a', 'b']) };
        for (let tries = 0; tries < 30; tries++) {
          if (mode === 'compare') {
            const a = flowsFor(I, n, pick(r, ['down', 'even'])), b = flowsFor(I * pick(r, [1, 2, 2.5, 3]), n, pick(r, ['up', 'even']));
            const na = exactNPV(a, k / 100), nb = exactNPV(b, k / 100);
            if (Math.abs(na - nb) < 2000) continue;                       // no near-ties: the answer must not hang on rounding
            o.flows = two(a, b); return o;
          }
          const cf = flowsFor(I, n, shape), F = { cf, oper: cf, n, I, S: 0, W: 0 };
          if (mode === 'payback' && o.ask === 'b' && payback(cf.map((c, t) => c * (t ? pvif(k / 100, t, '3') : 1))).years == null) continue;
          if (mode === 'payback' && payback(cf).years == null) continue;
          if (mode === 'irr' && !(irrExact(cf).some(x => x > 0.011))) continue;
          void F;
          o.flows = one(cf).map(x => x.concat([0])); return o;
        }
        o.flows = one([-100000, 55000, 80000, 15000]).map(x => x.concat([0])); o.rate = 10;
        return o;
      },
      kind: (v, res) => (res.mode === 'compare' ? (v.ask === 'a' ? 'choice' : 'yesno') : 'num'),
      choices: () => [['A', 'Project A'], ['B', 'Project B']],
      signed: (v, res) => res.mode === 'npv' && v.ask !== 'b',
      prompt(v, res) {
        const flows = res.mode === 'compare' ? null : res.F.cf.map((c, t) => `year ${t}: ${c < 0 ? '−' : ''}₹${GA.util ? GA.util.nf(Math.abs(c)) : Math.abs(c)}`).join(', ');
        const f3 = 'Use PV factors rounded to 3 decimals.';
        if (res.mode === 'npv') return `Cash flows ${flows}; cost of capital ${v.rate}%. ${f3} What is the ${v.ask === 'b' ? '**profitability index** (two decimals)' : '**NPV** (₹)'}?`;
        if (res.mode === 'payback') return `Cash flows ${flows}; cost of capital ${v.rate}%. ${v.ask === 'b' ? `${f3} What is the **discounted payback period** (years, two decimals)?` : 'What is the **payback period** (years, two decimals)?'}`;
        if (res.mode === 'irr') return `Cash flows ${flows}. ${f3} Interpolating between **${pc(res.irr.L)} and ${pc(res.irr.H)}**, what is the **IRR** (%, two decimals)?`;
        if (res.mode === 'mirr') return `Cash flows ${flows}; cost of capital (and reinvestment rate) ${v.rate}%. Using compounding factors (1 + r)ⁿ rounded to 3 decimals, what is the **MIRR** (%, two decimals)?`;
        const fa = res.A.F.cf.join(', '), fb = res.B.F.cf.join(', ');
        return `Mutually exclusive projects, cost of capital ${v.rate}%. Cash flows (years 0, 1, 2 …) A: ${fa}. B: ${fb}. ${v.ask === 'a' ? 'Which project should be chosen?' : 'Do NPV (at the cost of capital) and IRR rank the two projects the same way?'}`;
      },
      solve(res, v) {
        if (res.mode === 'npv') return v.ask === 'b' ? round(res.pi, 2) : round(res.npv, 2);
        if (res.mode === 'payback') return v.ask === 'b' ? (res.dpayback.years == null ? null : round(res.dpayback.years, 2)) : (res.payback.years == null ? null : round(res.payback.years, 2));
        if (res.mode === 'irr') return round(res.irr.irr * 100, 2);
        if (res.mode === 'mirr') return round(res.mirr.mirr * 100, 2);
        return v.ask === 'a' ? res.choose : res.conflict ? 'no' : 'yes';
      },
      tol: 0.011, unit: '',
      view: res => (res.mode === 'compare' ? [res.frames[0].view[0]] : [flowBars('Cash flows', res.F.cf, null, 0, true)]),
      explain(res, v) { return res.frames[res.frames.length - (res.mode === 'npv' && v.ask !== 'b' ? 2 : 1)].caption; }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { pvif, pvaf, fvif, flowsOf, pvRows, npvAt, exactNPV, irrExact, irrInterp, payback, arrOf, mirrOf, crossover, compute, def };
  g.__lab_def_capbud = def;
})(typeof window !== 'undefined' ? window : globalThis);
