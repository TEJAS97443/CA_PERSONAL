/* PassBook — Incentive Plans Lab (Paper 4, Employee Cost: lessons cma.emp.incentives and cma.emp.turnover). Owner: job lab-c1.
   Two modes, chosen by the first control:
     plans     earnings under time rate, piece rate, Halsey (50% or any share) and Rowan for a job, built plan by plan; the bonus and the
               effective hourly rate as the time saved varies (plots) with the job marked and the point where Halsey and Rowan pay the
               same; the Study Material's table of earnings at each time taken; labour (and factory) cost per unit
     turnover  employee turnover by the separation, replacement and flux methods (with or without new joinings), from the counts or
               worked back from given rates, and the equivalent annual rate
   Verified against the ICAI Study Material (Paper 4, chapter 3: §8 Illustrations 6–11, §11 Illustration 14) and ICAI Suggested
   Answers (PYQ Jan 2025 Q2(b), PYQ May 2025 Q2(b) and Q1(c), PYQ Sep 2024 MCQs 13–14, MTP May 2024 S-II Q1(c), PYQ May 2026 Q4(b),
   RTP Sep 2024 Q8, MTP Jan 2025 S-I MCQ 11; old scheme RTP May 2020 Q2): tests/lab-incentives.test.js.
   Pure part: plans, turnoverCounts, turnoverRates, compute. Node: require(...) -> {…, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;
  const r2 = x => Math.round((x + (x >= 0 ? 1e-9 : -1e-9)) * 100) / 100;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const nf = x => grp(r2(x));
  const inr = x => { const v = r2(x), a = Math.abs(v); return (v < 0 ? '−' : '') + '₹' + a.toLocaleString('en-IN', Number.isInteger(a) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const pc = x => grp(Math.round(x * 100) / 100) + '%';
  const tm = x => (Number.isInteger(r2(x)) ? grp(r2(x)) : r2(x).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));   // table money: 900 · 787.50
  const hrs = x => `${nf(x)} hour${Math.abs(x - 1) < EPS ? '' : 's'}`;
  function amt(x, what, opt) {
    opt = opt || {};
    const s = String(x == null ? '' : x).replace(/[₹,\s%]/g, '');
    const n = s === '' ? NaN : Number(s);
    if (!Number.isFinite(n)) throw new Error(`${what}: “${String(x).trim()}” is not a number.`);
    if (n < 0) throw new Error(`${what} cannot be negative.`);
    if (opt.pos && !(n > 0)) throw new Error(`${what} must be more than 0.`);
    return n;
  }

  /* ================================================================ incentive plans (ICAI SM §8) */
  /** S = time allowed (hours), T = time taken, R = hourly rate, p = Halsey share (0.5 = 50%), N = units, pr = piece rate a unit */
  function halsey(S, T, R, p) { const saved = Math.max(0, S - T); return { basic: T * R, bonus: p * saved * R, earn: T * R + p * saved * R }; }
  function rowan(S, T, R) { const saved = Math.max(0, S - T); const bonus = S > 0 ? (saved / S) * T * R : 0; return { basic: T * R, bonus, earn: T * R + bonus }; }
  function plans(o) {
    const { S, T, R, p, N, pr } = o;
    if (!(S > 0)) throw new Error('The time allowed (standard time) must be more than 0 hours.');
    if (!(T > 0)) throw new Error('The time taken must be more than 0 hours.');
    if (!(R > 0)) throw new Error('The hourly time rate must be more than ₹0.');
    if (!(p > 0 && p <= 1)) throw new Error('The Halsey share of the time saved must be between 1% and 100%.');
    const time = { earn: T * R, basic: T * R, bonus: 0 }, piece = { earn: N * pr, basic: N * pr, bonus: 0 };
    const H = halsey(S, T, R, p), W = rowan(S, T, R);
    const out = { S, T, R, p, N, pr, saved: Math.max(0, S - T), over: T > S + EPS, time, piece, halsey: H, rowan: W };
    ['time', 'piece', 'halsey', 'rowan'].forEach(k => { out[k].rate = out[k].earn / T; out[k].perUnit = N > 0 ? out[k].earn / N : null; });
    out.equalT = p * S;                                      // Halsey (share p) and Rowan pay the same bonus when T = p × S
    out.rowanPeak = S / 2;                                   // Rowan's bonus is largest when half the time is saved
    return out;
  }

  /* ================================================================ employee turnover (ICAI SM §11) */
  const PERIODS = { year: [12, 'year'], half: [6, 'half-year'], quarter: [3, 'quarter'], month: [1, 'month'], days: [null, 'period'] };
  const annualOf = (rate, per, days) => (per === 'days' ? (rate * 365) / days : (rate * 12) / PERIODS[per][0]);
  function turnoverCounts(o) {
    const sep = o.left + o.disch, acc = o.repl + o.newj;
    let close = o.close, avg;
    if (o.avgGiven > 0) avg = o.avgGiven;
    else {
      if (!(o.open >= 0)) throw new Error('Give the number of employees at the start of the period.');
      if (!(close > 0)) close = o.open - sep + acc;            // closing worked out from the flows (PYQ Sep 2024 MCQ 14)
      if (close < 0) throw new Error('More employees left than there were: check the counts.');
      avg = (o.open + close) / 2;
    }
    if (!(avg > 0)) throw new Error('The average number of employees must be above 0.');
    const r = { avg, close, closeDerived: !(o.close > 0) && !(o.avgGiven > 0), sep, acc, repl: o.repl, newj: o.newj,
      sepRate: (sep / avg) * 100, replRate: (o.repl / avg) * 100, newRate: (o.newj / avg) * 100, flux: ((sep + o.repl) / avg) * 100, fluxAcc: ((sep + acc) / avg) * 100 };
    return r;
  }
  /** worked backwards (SM Illustration 14 and ICAI's favourite): rates in %, any of the counts or the average. Flux is read as
      (separations + accessions) ÷ average, as ICAI's answers do */
  function turnoverRates(o) {
    let avg = o.avgGiven > 0 ? o.avgGiven : null, how = 'given';
    if (avg == null && o.cRepl > 0 && o.rRepl > 0) { avg = o.cRepl / (o.rRepl / 100); how = 'repl'; }
    if (avg == null && o.cSep > 0 && o.rSep > 0) { avg = o.cSep / (o.rSep / 100); how = 'sep'; }
    if (!(avg > 0)) throw new Error('To work back, give the average number of employees, or the number replaced with the replacement rate, or the number separated with the separation rate.');
    const R = o.cRepl > 0 ? o.cRepl : o.rRepl > 0 ? (o.rRepl / 100) * avg : null;
    const Sx = o.cSep > 0 ? o.cSep : o.rSep > 0 ? (o.rSep / 100) * avg : null;
    if (R == null) throw new Error('Give the number replaced or the replacement rate.');
    if (Sx == null) throw new Error('Give the number separated (left and discharged) or the separation rate.');
    let A = null, N = null;
    if (o.rFlux > 0) { A = (o.rFlux / 100) * avg - Sx; N = A - R; if (A < -EPS) throw new Error(`A flux rate of ${pc(o.rFlux)} is lower than the separation rate alone; check the rates.`); if (N < -1e-6) throw new Error(`The flux rate gives ${nf(A)} joinings, fewer than the ${nf(R)} replacements; check the rates.`); }
    const res = { avg, how, repl: R, sep: Sx, acc: A, newj: N, replRate: (R / avg) * 100, sepRate: (Sx / avg) * 100 };
    res.flux = A != null ? o.rFlux : ((Sx + R) / avg) * 100;
    res.fluxSR = ((Sx + R) / avg) * 100;
    return res;
  }

  /* ================================================================ drawing helpers */
  function niceStep(span, n) { const raw = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(raw || 1))); for (const m of [1, 2, 2.5, 5, 10]) if (m * mag >= raw - EPS) return m * mag; return 10 * mag; }
  function axis(lo, hi, n) { const st = niceStep(hi - lo, n), a = Math.floor(lo / st + EPS) * st, b = Math.ceil(hi / st - EPS) * st, t = []; for (let v = a; v <= b + st / 2; v += st) t.push([+v.toFixed(6), grp(+v.toFixed(6))]); return { range: [a, b], ticks: t }; }
  const sample = (f, x0, x1, N) => { const out = []; for (let k = 0; k <= N; k++) { const x = x0 + ((x1 - x0) * k) / N, y = f(x); if (Number.isFinite(y)) out.push([+x.toFixed(5), +y.toFixed(5)]); } return out; };
  const MODES = [['plans', 'Incentive plans'], ['turnover', 'Turnover']];
  let lastMode = 'plans';

  /* ================================================================ mode: incentive plans */
  function computePlans(v) {
    const N = amt(v.units, 'Units produced', { pos: true }), s = amt(v.std, 'Standard time a unit', { pos: true }), S = N * s;
    const T = amt(v.taken, 'Time taken', { pos: true }), R = amt(v.rate, 'Hourly time rate', { pos: true }), p = amt(v.share, 'Halsey share', { pos: true }) / 100;
    const prIn = amt(v.piece, 'Piece rate'), pr = prIn > 0 ? prIn : s * R;
    const mat = amt(v.mat, 'Material a unit'), oh = amt(v.oh, 'Overhead an hour');
    const P = plans({ S, T, R, p, N, pr });
    const H = P.halsey, W = P.rowan, sv = P.saved, pp = Math.round(p * 1000) / 10;
    const unit = N === 1 ? 'job' : 'unit';
    /* the plots run over the whole range of time saved: 0 (no saving) to all of the time allowed */
    const xmax = S, xs = axis(0, xmax, 6);
    const bonusMax = Math.max(p * S * R, (S * R) / 4, H.bonus, W.bonus);
    const yb = axis(0, bonusMax * 1.12, 5);
    const xeq = (1 - p) * S;                                  // the time saved at which the two bonuses meet
    const savePt = Math.min(sv, xmax);
    const bonusPlot = k => {
      const se = [{ label: `Halsey ${pp}%`, color: 'a', pts: [[0, 0], [S, p * S * R]] }];
      if (k >= 2) se.push({ label: 'Rowan', color: 'd', pts: sample(x => ((S - x) / S) * x * R, 0, S, 120) });
      /* the job's two bonuses: the higher one labelled to the left, the lower to the right, so neither sits on the meeting point's label */
      const hiH = H.bonus >= W.bonus;
      const pts = [{ x: r2(savePt), y: r2(H.bonus), label: `Halsey ${inr(H.bonus)}`, pos: hiH ? 'left' : 'right', color: 'a' }];
      if (k >= 2) pts.push({ x: r2(savePt), y: r2(W.bonus), label: `Rowan ${inr(W.bonus)}`, pos: hiH ? 'right' : 'left', color: 'd' });
      if (k >= 3) pts.push({ x: r2(xeq), y: r2(p * xeq * R), label: `equal at ${nf(P.equalT)} h taken`, pos: 'above' });
      if (k >= 3 && Math.abs(xeq - S / 2) > S * 0.04) pts.push({ x: r2(S / 2), y: r2((S * R) / 4), label: 'Rowan peak', pos: 'above' });
      se.push({ pts: [[savePt, 0], [savePt, Math.max(H.bonus, W.bonus)]], color: 'mute', dash: true, legend: false });
      return { type: 'plot', title: 'Bonus as the time saved grows', alt: `Halsey bonus rises in a straight line; Rowan's rises then falls; they meet when ${nf(P.equalT)} hours are taken`, w: 560, h: 300,
        x: xs.range, y: yb.range, xticks: xs.ticks, yticks: yb.ticks, xlabel: `time saved (hours, of ${nf(S)} allowed)`, ylabel: 'bonus (₹)', legend: 'top-left', clip: true, series: se, points: pts };
    };
    const xr = Math.min(0.8 * S, Math.max(savePt * 1.15, 0.6 * S)), xr2 = axis(0, xr, 6);
    const effAt = x => ({ time: R, piece: (N * pr) / (S - x), halsey: R + (p * R * x) / (S - x), rowan: R * (1 + x / S) });
    const ytop = Math.max(effAt(xr).rowan, Math.min(effAt(xr).halsey, 3 * R), H.rate, W.rate, P.piece.rate) * 1.1;
    const ye = axis(0, ytop, 5);
    const ratePlot = () => ({
      type: 'plot', title: 'Effective hourly rate as the time saved grows', alt: 'Time rate stays flat; piece rate and Halsey climb steeply; Rowan rises in a straight line towards double the time rate', w: 560, h: 300,
      x: xr2.range, y: ye.range, xticks: xr2.ticks, yticks: ye.ticks, xlabel: 'time saved (hours)', ylabel: 'earnings an hour worked (₹)', legend: 'outside', clip: true,
      series: [{ label: 'time rate', color: 'mute', pts: [[0, R], [xr2.range[1], R]] }, { label: 'piece rate', color: 'c', pts: sample(x => effAt(x).piece, 0, Math.min(xr2.range[1], S * 0.95), 120) },
        { label: `Halsey ${pp}%`, color: 'a', pts: sample(x => effAt(x).halsey, 0, Math.min(xr2.range[1], S * 0.95), 120) }, { label: 'Rowan', color: 'd', pts: sample(x => effAt(x).rowan, 0, xr2.range[1], 60) },
        { pts: [[savePt, 0], [savePt, ye.range[1]]], color: 'mute', dash: true, legend: false }],
      points: [{ x: r2(savePt), y: r2(H.rate), label: `Halsey ${inr(H.rate)}`, pos: H.rate >= W.rate ? 'above' : 'below', color: 'a' }, { x: r2(savePt), y: r2(W.rate), label: `Rowan ${inr(W.rate)}`, pos: W.rate > H.rate ? 'above' : 'below', color: 'd' }]
    });
    /* the Study Material's statement (Illustration 9): earnings at each time taken, with this job's row marked */
    const grid = []; for (let k = 8; k >= 1; k--) grid.push((S * k) / 8);
    if (!grid.some(t => Math.abs(t - T) < EPS) && T <= S) grid.push(T);
    grid.sort((a, b) => b - a);
    const cells = {};
    const trows = grid.map((t, i) => {
      const h = halsey(S, t, R, p), w = rowan(S, t, R);
      if (Math.abs(t - T) < EPS) for (let c = 0; c < 9; c++) cells[`${i},${c}`] = 'hl';
      if (Math.abs(t - P.equalT) < EPS) { cells[`${i},3`] = cells[`${i},3`] || 'ok'; cells[`${i},4`] = cells[`${i},4`] || 'ok'; }
      return [nf(t), nf(S - t), tm(t * R), tm(h.bonus), tm(w.bonus), tm(h.earn), tm(w.earn), tm(h.earn / t), tm(w.earn / t)];
    });
    const table = { type: 'table', title: `Earnings at each time taken (time allowed ${nf(S)} hours, ₹${grp(R)} an hour)`, head: ['Taken (h)', 'Saved', 'Time wages', 'Halsey bonus', 'Rowan bonus', 'Halsey total', 'Rowan total', 'Halsey ₹/h', 'Rowan ₹/h'], rows: trows, cells, align: Array(9).fill('right') };
    const sumRows = [['Time rate', 'hours worked × rate', inr(P.time.earn), inr(P.time.rate), inr(P.time.perUnit)], ['Piece rate', `${nf(N)} × ${inr(pr)}`, inr(P.piece.earn), inr(P.piece.rate), inr(P.piece.perUnit)],
      [`Halsey ${pp}%`, `${inr(H.basic)} + ${inr(H.bonus)} bonus`, inr(H.earn), inr(H.rate), inr(H.earn / N)], ['Rowan', `${inr(W.basic)} + ${inr(W.bonus)} bonus`, inr(W.earn), inr(W.rate), inr(W.earn / N)]];
    const plansTable = k => ({ type: 'table', title: 'Earnings under each plan', head: ['Plan', 'Working', 'Earnings', 'Per hour', `Per ${unit}`], rows: sumRows.slice(0, k), align: ['left', 'left', 'right', 'right', 'right'] });
    const allowed = N === 1 ? `${hrs(S)} allowed` : `${nf(N)} units × ${hrs(s)} = ${hrs(S)} allowed`;
    const frames = [
      { caption: `**The job.** ${allowed}; the worker takes ${hrs(T)}${P.over ? ', more than allowed, so no time is saved' : `, saving ${hrs(sv)} (${pc((sv / S) * 100)} of the time allowed)`}; the time rate is ${inr(R)} an hour.`, view: [{ type: 'table', title: 'The data', head: ['Item', 'Value'], rows: [['Time allowed (standard time)', hrs(S)], ['Time taken', hrs(T)], ['Time saved', hrs(sv)], ['Time rate', `${inr(R)} an hour`], ['Piece rate', `${inr(pr)} a ${unit}${prIn > 0 ? '' : ' (standard time × time rate)'}`]], align: ['left', 'right'] }] },
      { caption: `**Time rate: hours worked × rate** = ${nf(T)} × ${inr(R)} = **${inr(P.time.earn)}**. The worker is paid for time, whatever the output, so the employer keeps all the gain from the ${hrs(sv)} saved.`, view: [plansTable(1)] },
      { caption: `**Piece rate: units × rate** = ${nf(N)} × ${inr(pr)} = **${inr(P.piece.earn)}**. Pay follows output, not time: the worker keeps the whole saving${sv > 0 ? `, so earnings an hour rise to ${inr(P.piece.rate)}` : ''}.`, view: [plansTable(2)] },
      { caption: P.over ? `**Halsey: no time saved, so no bonus.** The time wage is guaranteed: ${nf(T)} × ${inr(R)} = **${inr(H.earn)}**.` : `**Halsey: time wages + ${pp}% of the time saved × rate** = ${nf(T)} × ${inr(R)} + ${pp}% × ${nf(sv)} × ${inr(R)} = ${inr(H.basic)} + ${inr(H.bonus)} = **${inr(H.earn)}**. The saving is shared: ${pp}% to the worker, the rest to the employer.`, view: [plansTable(3)] },
      { caption: P.over ? `**Rowan: no time saved, so no bonus.** The time wage is guaranteed: **${inr(W.earn)}**.` : `**Rowan: time wages + (time saved ÷ time allowed) × time wages** = ${inr(W.basic)} + (${nf(sv)} ÷ ${nf(S)}) × ${inr(W.basic)} = ${inr(W.basic)} + ${inr(W.bonus)} = **${inr(W.earn)}**. The bonus is the share of time saved in the time allowed, applied to the wages earned.`, view: [plansTable(4)] },
      { caption: `**The Study Material's statement** (Illustration 9) for this job: bonus, earnings and earnings an hour at each time taken${T <= S ? `; this job's row is marked` : ''}. Read down the Rowan bonus column to see it rise and fall.`, view: [table] },
      { caption: `**Bonus as the time saved grows.** Halsey's bonus grows in a straight line. Rowan's grows, peaks when half the time is saved (bonus ${inr((S * R) / 4)}), then shrinks, so racing gains nothing and quality is protected.`, view: [bonusPlot(2), plansTable(4)] },
      { caption: `**Where they meet.** Halsey ${pp}% and Rowan pay the same bonus when the time taken is ${pp}% of the time allowed: ${nf(P.equalT)} hours (time saved ${nf(xeq)}). ${P.over ? '' : T > P.equalT + EPS ? `This job took longer than that, so **Rowan pays more** (${inr(W.bonus)} against ${inr(H.bonus)}).` : T < P.equalT - EPS ? `This job took less than that, so **Halsey pays more** (${inr(H.bonus)} against ${inr(W.bonus)}).` : 'This job is exactly there.'}`, view: [bonusPlot(3), plansTable(4)] },
      { caption: `**Earnings an hour worked.** Time rate stays at ${inr(R)}. Rowan rises in a straight line but can never double the time rate, even if standards are set loosely; Halsey and piece rate keep climbing as the saving grows. This job: Halsey ${inr(H.rate)}, Rowan ${inr(W.rate)} an hour.`, view: [ratePlot(), plansTable(4)] }
    ];
    const extra = mat > 0 || oh > 0;
    if (extra) {
      const fc = e => mat * N + e + oh * T;
      const rows = [['Time rate', P.time.earn], ['Piece rate', P.piece.earn], [`Halsey ${pp}%`, H.earn], ['Rowan', W.earn]].map(([k, e]) => [k, inr(mat * N), inr(e), inr(oh * T), inr(fc(e)), inr(fc(e) / N)]);
      frames.push({ caption: `**Factory cost${N > 1 ? ' per unit' : ''}.** Material ${inr(mat * N)} + wages and bonus + factory overhead ${nf(T)} hours × ${inr(oh)} = ${inr(oh * T)}. Overhead charged on hours worked falls as time is saved, which is part of the employer's gain.`, view: [{ type: 'table', title: 'Factory cost under each plan', head: ['Plan', 'Material', 'Wages + bonus', 'Overhead', 'Factory cost', `Per ${unit}`], rows, align: ['left', 'right', 'right', 'right', 'right', 'right'] }, plansTable(4)] });
    }
    const verdict = P.over ? `No time is saved, so both plans pay the guaranteed time wage, ${inr(H.earn)}.` : Math.abs(H.earn - W.earn) < 0.005 ? `Halsey and Rowan pay the same here, ${inr(H.earn)}.` : W.earn > H.earn ? `**Rowan pays ${inr(W.earn - H.earn)} more** (${inr(W.earn)} against ${inr(H.earn)}): less than ${pc(100 - pp)} of the time was saved.` : `**Halsey pays ${inr(H.earn - W.earn)} more** (${inr(H.earn)} against ${inr(W.earn)}): more than ${pc(100 - pp)} of the time was saved.`;
    frames.push({ caption: `**This job.** ${verdict} Earnings an hour: time rate ${inr(R)}, Halsey ${inr(H.rate)}, Rowan ${inr(W.rate)}, piece rate ${inr(P.piece.rate)}.`, view: [bonusPlot(3), ratePlot(), plansTable(4)] });
    const stats = [{ label: `Earnings: Halsey ${pp}%`, value: inr(H.earn), hint: 'T × R + share × time saved × R' },
      { label: 'Earnings: Rowan', value: inr(W.earn), hint: 'T × R + (time saved ÷ time allowed) × T × R' }, { label: 'Per hour: Halsey', value: inr(H.rate), hint: 'earnings ÷ time taken' },
      { label: 'Per hour: Rowan', value: inr(W.rate), hint: 'earnings ÷ time taken' }, { label: 'Halsey = Rowan at time taken', value: `${nf(P.equalT)} h`, hint: `${pp}% of the time allowed; time saved here ${nf(sv)} h` }];
    return {
      frames, stats, sim: Object.assign({ mode: 'plans', mat, oh, fc: extra ? e => mat * N + e + oh * T : null }, P),
      table: { head: ['Plan', 'Working', 'Earnings', 'Per hour', `Per ${unit}`], rows: sumRows },
      note: `**Conventions.** Time allowed = units × standard time a unit. The time wage is guaranteed under Halsey and Rowan, so no saving means no bonus, never a cut. Halsey bonus = share × time saved × rate (50% unless another share is set). Rowan bonus = (time saved ÷ time allowed) × time taken × rate. ${prIn > 0 ? 'The piece rate is as given.' : 'The piece rate is standard time × time rate, so a worker who just meets the standard earns the time wage.'} Earnings an hour = earnings ÷ time taken; per ${unit} = earnings ÷ ${N === 1 ? 'the job' : 'units'}.`
    };
  }

  /* ================================================================ mode: employee turnover */
  function computeTurnover(v) {
    const per = PERIODS[v.period] ? v.period : 'year', days = amt(v.days, 'Days in the period'), [, pname] = PERIODS[per];
    if (per === 'days' && !(days > 0)) throw new Error('Give the number of days in the period.');
    const ann = r => annualOf(r, per, days), annTxt = per === 'days' ? `× 365 ÷ ${nf(days)}` : `× 12 ÷ ${PERIODS[per][0]}`;
    const isYear = per === 'year';
    const bars = (items, title) => {
      const top = Math.max(...items.map(i => i[1]), 1), ys = axis(0, top * 1.2, 5);
      return { type: 'plot', title, alt: items.map(i => `${i[0]} ${pc(i[1])}`).join(', '), w: 560, h: 260, x: [-0.6, items.length - 0.4], y: ys.range, yticks: ys.ticks.map(t => [t[0], t[1] + '%']), xticks: items.map((it, i) => [i, it[0]]), legend: 'none',
        series: [{ label: 'rate', bars: true, values: true, color: 'b', pts: items.map((it, i) => [i, +it[1].toFixed(4), pc(it[1])]) }] };
    };
    let frames, stats, sim, table, note;
    if (v.tbasis === 'rates') {
      const X = turnoverRates({ avgGiven: amt(v.kAvg, 'Average employees'), cRepl: amt(v.kRepl, 'Employees replaced'), cSep: amt(v.kSep, 'Employees separated'), rRepl: amt(v.rRepl, 'Replacement rate'), rSep: amt(v.rSep, 'Separation rate'), rFlux: amt(v.rFlux, 'Flux rate') });
      const avgWhy = X.how === 'repl' ? `replacement rate = replaced ÷ average, so average = ${nf(X.repl)} ÷ ${pc(v.rRepl)} = **${nf(X.avg)}**` : X.how === 'sep' ? `separation rate = separations ÷ average, so average = ${nf(X.sep)} ÷ ${pc(v.rSep)} = **${nf(X.avg)}**` : `the average is given: **${nf(X.avg)}**`;
      const rows = [['Average employees on roll', nf(X.avg)], ['Replaced', nf(X.repl)], ['Left and discharged (separations)', nf(X.sep)]].concat(X.acc != null ? [['Recruited and joined (accessions)', nf(X.acc)], ['of which new joinings (expansion)', nf(X.newj)]] : []);
      const tab = k => ({ type: 'table', title: 'Worked back from the rates', head: ['Item', 'Number'], rows: rows.slice(0, k), align: ['left', 'right'] });
      frames = [
        { caption: `**Working back.** Every turnover rate has the same denominator, the average number of employees on roll, so one known number and its rate give the average, and the average turns every other rate into a number.`, view: [{ type: 'table', title: 'Given', head: ['Item', 'Value'], rows: [['Flux rate', v.rFlux > 0 ? pc(v.rFlux) : '—'], ['Replacement rate', v.rRepl > 0 ? pc(v.rRepl) : '—'], ['Separation rate', v.rSep > 0 ? pc(v.rSep) : '—'], ['Replaced', v.kRepl > 0 ? nf(v.kRepl) : '—'], ['Separated', v.kSep > 0 ? nf(v.kSep) : '—'], ['Average on roll', v.kAvg > 0 ? nf(v.kAvg) : '—']], align: ['left', 'right'] }] },
        { caption: `**The average:** ${avgWhy}.`, view: [tab(1)] },
        { caption: `**Replaced** = replacement rate × average${v.kRepl > 0 ? ': given, ' + nf(X.repl) : ` = ${pc(v.rRepl)} × ${nf(X.avg)} = **${nf(X.repl)}**`}. **Separated** (left and discharged) = separation rate × average${v.kSep > 0 ? ': given, ' + nf(X.sep) : ` = ${pc(v.rSep)} × ${nf(X.avg)} = **${nf(X.sep)}**`}.`, view: [tab(3)] }
      ];
      if (X.acc != null) frames.push({ caption: `**Recruited and joined.** Flux = (separations + accessions) ÷ average, so accessions = ${pc(v.rFlux)} × ${nf(X.avg)} − ${nf(X.sep)} = **${nf(X.acc)}**: ${nf(X.repl)} replacements and ${nf(X.newj)} new joinings.`, view: [tab(5)] });
      else frames.push({ caption: `**Flux** (no flux rate given) = (separations + replacements) ÷ average = (${nf(X.sep)} + ${nf(X.repl)}) ÷ ${nf(X.avg)} = **${pc(X.fluxSR)}**.`, view: [tab(3)] });
      const items = [['Separation', X.sepRate], ['Replacement', X.replRate], ['Flux', X.flux]];
      frames.push({ caption: isYear ? `**The three rates** side by side. The period is a year, so they are already annual.` : `**Equivalent annual rates** = rate for the ${pname} ${annTxt}: separation ${pc(ann(X.sepRate))}, replacement ${pc(ann(X.replRate))}, flux ${pc(ann(X.flux))}.`, view: [bars(items.map(i => [i[0], isYear ? i[1] : ann(i[1])]), isYear ? 'Turnover rates' : 'Equivalent annual turnover rates'), tab(rows.length)] });
      stats = [{ label: 'Average employees on roll', value: nf(X.avg), hint: X.how === 'repl' ? 'replaced ÷ replacement rate' : X.how === 'sep' ? 'separated ÷ separation rate' : 'given' }, { label: 'Replaced', value: nf(X.repl) }, { label: 'Left and discharged', value: nf(X.sep) }];
      if (X.acc != null) stats.push({ label: 'Recruited and joined', value: nf(X.acc), hint: 'flux rate × average − separations' });
      stats.push({ label: isYear ? 'Flux rate' : 'Flux rate, annual', value: pc(isYear ? X.flux : ann(X.flux)), hint: isYear ? '(separations + accessions) ÷ average' : `rate for the ${pname} ${annTxt}` });
      sim = Object.assign({ mode: 'turnover', basis: 'rates', annual: { sep: ann(X.sepRate), repl: ann(X.replRate), flux: ann(X.flux) } }, X);
      table = { head: ['Item', 'Number'], rows };
      note = `**Conventions.** Every rate is a number ÷ the average employees on roll × 100. Worked back, the flux rate is read as (separations + accessions) ÷ average, as ICAI's answers do; accessions are replacements plus new joinings. Equivalent annual rate = rate for the period ${per === 'days' ? '× 365 ÷ days in the period' : '× 12 ÷ months in the period'}.`;
    } else {
      const C = turnoverCounts({ open: amt(v.open, 'Employees at the start'), close: amt(v.close, 'Employees at the end'), avgGiven: amt(v.avg, 'Average employees'), left: amt(v.left, 'Employees who left'), disch: amt(v.disch, 'Employees discharged'), repl: amt(v.repl, 'Employees replaced'), newj: amt(v.newj, 'New joinings') });
      if (C.repl > C.sep + EPS) throw new Error(`Replacements (${nf(C.repl)}) cannot exceed the employees who left or were discharged (${nf(C.sep)}): extra hires are new joinings.`);
      const move = { type: 'table', title: 'The workforce in the period', head: ['Item', 'Employees'], rows: [['At the start', v.avg > 0 ? '—' : nf(+v.open)], ['Less: left', nf(+v.left)], ['Less: discharged', nf(+v.disch)], ['Add: replacements', nf(C.repl)], ['Add: new joinings (expansion)', nf(C.newj)], ['At the end', v.avg > 0 ? '—' : nf(C.close) + (C.closeDerived ? ' (worked out)' : '')]], align: ['left', 'right'] };
      const lines = [['Average on roll', v.avg > 0 ? 'given' : `(${nf(+v.open)} + ${nf(C.close)}) ÷ 2`, nf(C.avg)], ['Separation method', `${nf(C.sep)} ÷ ${nf(C.avg)} × 100`, pc(C.sepRate)], ['Replacement method', `${nf(C.repl)} ÷ ${nf(C.avg)} × 100`, pc(C.replRate)],
        ['Flux method', `(${nf(C.sep)} + ${nf(C.repl)}) ÷ ${nf(C.avg)} × 100`, pc(C.flux)]].concat(C.newj > 0 ? [['New recruitment', `${nf(C.newj)} ÷ ${nf(C.avg)} × 100`, pc(C.newRate)], ['Flux with new joinings', `(${nf(C.sep)} + ${nf(C.acc)}) ÷ ${nf(C.avg)} × 100`, pc(C.fluxAcc)]] : []);
      const work = k => ({ type: 'table', title: 'Turnover rates', head: ['Measure', 'Formula', 'Value'], rows: lines.slice(0, k), align: ['left', 'left', 'right'] });
      frames = [
        { caption: `**The workforce.** ${nf(C.sep)} employees separated (${nf(+v.left)} left, ${nf(+v.disch)} discharged); ${nf(C.repl)} were replaced${C.newj > 0 ? ` and ${nf(C.newj)} joined for expansion` : ', and no one joined for expansion'}.${C.closeDerived ? ` The closing number is worked out: ${nf(+v.open)} − ${nf(C.sep)} + ${nf(C.acc)} = ${nf(C.close)}.` : ''}`, view: [move] },
        { caption: v.avg > 0 ? `**The average on roll is given: ${nf(C.avg)}.** Every rate divides by it.` : `**Average employees on roll = (start + end) ÷ 2** = (${nf(+v.open)} + ${nf(C.close)}) ÷ 2 = **${nf(C.avg)}**. Every turnover rate divides by this.`, view: [work(1)] },
        { caption: `**Separation method** = separations ÷ average × 100 = ${nf(C.sep)} ÷ ${nf(C.avg)} = **${pc(C.sepRate)}**: how many of the workforce were lost, whether or not they were replaced.`, view: [work(2)] },
        { caption: `**Replacement method** = replacements ÷ average × 100 = ${nf(C.repl)} ÷ ${nf(C.avg)} = **${pc(C.replRate)}**. New hires for expansion are not replacements, so they are left out.`, view: [work(3)] },
        { caption: `**Flux method** = (separations + replacements) ÷ average × 100 = (${nf(C.sep)} + ${nf(C.repl)}) ÷ ${nf(C.avg)} = **${pc(C.flux)}**: both the outflow and the inflow that replaced it.`, view: [work(4)] }
      ];
      if (C.newj > 0) frames.push({ caption: `**With new joinings.** Some accountants count every joiner, since newcomers change the workforce too: accessions = ${nf(C.repl)} + ${nf(C.newj)} = ${nf(C.acc)}, and flux = (${nf(C.sep)} + ${nf(C.acc)}) ÷ ${nf(C.avg)} = **${pc(C.fluxAcc)}**. New recruitment alone is ${pc(C.newRate)}.`, view: [work(6)] });
      const items = [['Separation', C.sepRate], ['Replacement', C.replRate], ['Flux', C.flux]].concat(C.newj > 0 ? [['Flux + new', C.fluxAcc]] : []);
      frames.push({ caption: isYear ? `**The rates side by side.** The period is a year, so these are already annual rates.` : `**Equivalent annual rates** = rate for the ${pname} ${annTxt}: separation ${pc(ann(C.sepRate))}, replacement ${pc(ann(C.replRate))}, flux ${pc(ann(C.flux))}${C.newj > 0 ? `, flux with new joinings ${pc(ann(C.fluxAcc))}` : ''}.`, view: [bars(items.map(i => [i[0], isYear ? i[1] : ann(i[1])]), isYear ? 'Turnover rates' : 'Equivalent annual turnover rates'), work(lines.length)] });
      stats = [{ label: 'Average employees on roll', value: nf(C.avg), hint: '(start + end) ÷ 2' }, { label: 'Separation rate', value: pc(C.sepRate), hint: 'separations ÷ average × 100' }, { label: 'Replacement rate', value: pc(C.replRate), hint: 'replacements ÷ average × 100' },
        { label: 'Flux rate', value: pc(C.flux), hint: '(separations + replacements) ÷ average × 100' }];
      if (C.newj > 0) stats.push({ label: 'Flux with new joinings', value: pc(C.fluxAcc), hint: '(separations + accessions) ÷ average × 100' });
      if (!isYear) stats.push({ label: 'Flux rate, annual', value: pc(ann(C.flux)), hint: `rate for the ${pname} ${annTxt}` });
      sim = Object.assign({ mode: 'turnover', basis: 'counts', annual: { sep: ann(C.sepRate), repl: ann(C.replRate), flux: ann(C.flux), fluxAcc: ann(C.fluxAcc) } }, C);
      table = { head: ['Measure', 'Formula', 'Value'], rows: lines };
      note = `**Conventions.** Separations = employees who left + those discharged. Replacements exclude hires for expansion, which are new joinings; accessions = replacements + new joinings. Average on roll = (start + end) ÷ 2${C.closeDerived ? ', the end worked out as start − separations + accessions' : ''}. Flux uses separations + replacements; the line with new joinings uses separations + accessions. Equivalent annual rate = rate for the period ${per === 'days' ? '× 365 ÷ days in the period' : '× 12 ÷ months in the period'}.`;
    }
    return { frames, stats: stats.slice(0, 6), sim, table, note };
  }

  function compute(v) {
    lastMode = v.mode === 'turnover' ? 'turnover' : 'plans';
    return lastMode === 'turnover' ? computeTurnover(v) : computePlans(v);
  }

  /* ================================================================ controls, presets, challenge */
  const isP = v => v.mode !== 'turnover', isT = v => v.mode === 'turnover', cnt = v => isT(v) && v.tbasis !== 'rates', rts = v => isT(v) && v.tbasis === 'rates';
  const controls = [
    { id: 'mode', type: 'seg', label: 'What to explore', value: 'plans', options: MODES },
    { id: 'units', type: 'number', label: 'Units produced (1 = one job)', short: 'Units', value: 50, min: 0, max: 1e7, show: isP },
    { id: 'std', type: 'number', label: 'Standard time a unit (hours)', short: 'Standard time a unit', value: 0.2, min: 0, max: 1e5, show: isP },
    { id: 'taken', type: 'number', label: 'Time taken in all (hours)', short: 'Time taken', value: 7, min: 0, max: 1e7, show: isP },
    { id: 'rate', type: 'number', label: 'Time rate (₹ an hour)', short: 'Time rate', value: 90, min: 0, max: 1e6, show: isP },
    { id: 'share', type: 'number', label: 'Halsey share of the time saved (%)', short: 'Halsey share %', value: 50, min: 1, max: 100, show: isP },
    { id: 'piece', type: 'number', label: 'Piece rate (₹ a unit; 0 = standard time × time rate)', short: 'Piece rate', value: 0, min: 0, max: 1e7, show: isP },
    { id: 'mat', type: 'number', label: 'Material (₹ a unit; 0 = leave out)', short: 'Material a unit', value: 0, min: 0, max: 1e9, show: isP },
    { id: 'oh', type: 'number', label: 'Factory overhead (₹ an hour worked; 0 = leave out)', short: 'Overhead an hour', value: 0, min: 0, max: 1e6, show: isP },
    { id: 'tbasis', type: 'seg', label: 'Start from', value: 'counts', options: [['counts', 'The numbers'], ['rates', 'Work back']], show: isT },
    { id: 'open', type: 'number', label: 'Employees at the start', short: 'At the start', value: 480, min: 0, max: 1e7, show: cnt },
    { id: 'close', type: 'number', label: 'Employees at the end (0 = work it out)', short: 'At the end', value: 520, min: 0, max: 1e7, show: cnt },
    { id: 'avg', type: 'number', label: 'Average employees on roll (0 = from start and end)', short: 'Average on roll', value: 0, min: 0, max: 1e7, show: cnt },
    { id: 'left', type: 'number', label: 'Employees who left (resigned)', short: 'Left', value: 30, min: 0, max: 1e7, show: cnt },
    { id: 'disch', type: 'number', label: 'Employees discharged', short: 'Discharged', value: 6, min: 0, max: 1e7, show: cnt },
    { id: 'repl', type: 'number', label: 'Employees replaced', short: 'Replaced', value: 28, min: 0, max: 1e7, show: cnt },
    { id: 'newj', type: 'number', label: 'New joinings for expansion', short: 'New joinings', value: 48, min: 0, max: 1e7, show: cnt },
    { id: 'rFlux', type: 'number', label: 'Flux rate (%; 0 = not given)', short: 'Flux rate %', value: 10, min: 0, max: 1000, show: rts },
    { id: 'rRepl', type: 'number', label: 'Replacement rate (%; 0 = not given)', short: 'Replacement rate %', value: 5, min: 0, max: 1000, show: rts },
    { id: 'rSep', type: 'number', label: 'Separation rate (%; 0 = not given)', short: 'Separation rate %', value: 3, min: 0, max: 1000, show: rts },
    { id: 'kRepl', type: 'number', label: 'Number replaced (0 = not given)', short: 'Replaced', value: 30, min: 0, max: 1e7, show: rts },
    { id: 'kSep', type: 'number', label: 'Number left and discharged (0 = not given)', short: 'Separated', value: 0, min: 0, max: 1e7, show: rts },
    { id: 'kAvg', type: 'number', label: 'Average employees on roll (0 = not given)', short: 'Average on roll', value: 0, min: 0, max: 1e7, show: rts },
    { id: 'period', type: 'select', label: 'The figures are for a', short: 'Period', value: 'year', options: [['year', 'year'], ['half', 'half-year'], ['quarter', 'quarter'], ['month', 'month'], ['days', 'number of days']], show: isT },
    { id: 'days', type: 'number', label: 'Days in the period', short: 'Days', value: 90, min: 0, max: 3660, show: v => isT(v) && v.period === 'days' }
  ];
  const P = (label, values) => ({ label, values });
  const job = (units, std, taken, rate, more) => Object.assign({ mode: 'plans', units, std, taken, rate, share: 50, piece: 0, mat: 0, oh: 0 }, more || {});
  const tc = more => Object.assign({ mode: 'turnover', tbasis: 'counts', open: 0, close: 0, avg: 0, left: 0, disch: 0, repl: 0, newj: 0, period: 'year', days: 90 }, more);
  const tr = more => Object.assign({ mode: 'turnover', tbasis: 'rates', kAvg: 0, kSep: 0, kRepl: 0, rFlux: 0, rRepl: 0, rSep: 0, period: 'year', days: 90 }, more);
  const presets = [
    P('Tapri premix packing: 50 crates at 12 minutes each, done in 7 hours', job(50, 0.2, 7, 90)),
    P('Study Material Illustrations 6 and 7: 8 hours allowed, 6 taken, ₹60 an hour', job(1, 8, 6, 60)),
    P('Study Material Illustration 9: 8 hours allowed at ₹8, the statement hour by hour', job(1, 8, 4, 8)),
    P('Study Material Illustration 8: workman A, 30 of 50 hours, with material and overhead', job(1, 50, 30, 20, { mat: 2500, oh: 5 })),
    P('Study Material Illustration 10 / MTP May 2024 Series II, Q1(c): 3 of 4 hours at ₹30', job(1, 4, 3, 30)),
    P('PYQ Jan 2025, Q2(b) (data): 9 hours allowed, 6 taken, ₹25 an hour', job(1, 9, 6, 25)),
    P('PYQ May 2025, Q2(b) (data): 128 workers, 12,500 units at 2.5 hours, 25,600 hours worked', job(12500, 2.5, 25600, 30)),
    P('PYQ Sep 2024, MCQ 13 (data): Raj on Rowan, 90 of 150 hours at ₹30', job(1, 150, 90, 30)),
    P('Tapri cafés: staff turnover for the year, with expansion hiring', tc({ open: 480, close: 520, left: 30, disch: 6, repl: 28, newj: 48 })),
    P('Old-scheme RTP May 2020, Q2 (data): 3,600 to 3,790 workers, 350 recruited', tc({ open: 3600, close: 3790, left: 40, disch: 120, repl: 150, newj: 200 })),
    P('PYQ Sep 2024, MCQ 14 (data): 150 workers, 30 resigned, 5 discharged, 15 replaced', tc({ open: 150, left: 30, disch: 5, repl: 15 })),
    P('Study Material Illustration 14: a quarter at 10%, 5% and 3%, 30 replaced', tr({ rFlux: 10, rRepl: 5, rSep: 3, kRepl: 30, period: 'quarter' })),
    P('PYQ May 2026, Q4(b) (data): a quarter at 12%, 6% and 4%, 54 replaced', tr({ rFlux: 12, rRepl: 6, rSep: 4, kRepl: 54, period: 'quarter' })),
    P('RTP Sep 2024, Q8 (data): a quarter at 14%, 8% and 6%, 36 replaced', tr({ rFlux: 14, rRepl: 8, rSep: 6, kRepl: 36, period: 'quarter' })),
    P('MTP Jan 2025 Series I, MCQ 11 (data): 200 on roll at 9%, 15% and 30%', tr({ kAvg: 200, rFlux: 30, rRepl: 15, rSep: 9 })),
    P('PYQ May 2025, Q1(c) (data): 28 separated at 3.5%, 78 replaced', tr({ kSep: 28, rSep: 3.5, kRepl: 78 }))
  ];

  /* ---------------------------------------------------------------- challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const ASK = { halsey: 'earnings under the Halsey plan', rowan: 'earnings under the Rowan plan', hrate: 'effective hourly rate under the Halsey plan', wrate: 'effective hourly rate under the Rowan plan', equal: 'time taken (hours) at which Halsey and Rowan pay the same bonus' };
  function genPlans(r) {
    const S = pick(r, [4, 5, 6, 8, 9, 10, 12, 16, 20, 24, 40, 48, 50]), T = Math.max(1, Math.round(S * (0.3 + r() * 0.65))), R = pick(r, [20, 25, 30, 40, 50, 60, 75, 80, 100, 120]);
    const share = r() < 0.75 ? 50 : pick(r, [30, 40, 60]);
    return { mode: 'plans', units: 1, std: S, taken: Math.min(T, S - 1), rate: R, share, piece: 0, mat: 0, oh: 0, ask: pick(r, ['halsey', 'rowan', 'rowan', 'hrate', 'wrate', 'equal']) };
  }
  function genTurnover(r) {
    if (r() < 0.5) {
      const avg = 50 * (4 + Math.floor(r() * 30)), sep = Math.max(2, Math.round(avg * (0.02 + r() * 0.1))), repl = Math.max(1, Math.round(sep * (0.4 + r() * 0.6))), newj = r() < 0.5 ? Math.round(avg * r() * 0.08) : 0;
      const open = Math.round(avg - (repl + newj - sep) / 2), left = Math.round(sep * 0.7);
      return { mode: 'turnover', tbasis: 'counts', open, close: open - sep + repl + newj, avg: 0, left, disch: sep - left, repl, newj, period: 'year', days: 90, ask: pick(r, ['sep', 'repl', 'flux']) };
    }
    const avg = 100 * (2 + Math.floor(r() * 15)), rSep = pick(r, [2, 3, 4, 5, 6, 8, 9]), rRepl = rSep + pick(r, [0, 1, 2, 3, 4, 6]), rFlux = rSep + rRepl + pick(r, [0, 2, 3, 5, 6, 10]);
    return { mode: 'turnover', tbasis: 'rates', kAvg: 0, kSep: 0, kRepl: (avg * rRepl) / 100, rFlux, rRepl, rSep, period: pick(r, ['year', 'quarter']), days: 90, ask: pick(r, ['avg', 'sep', 'acc']) };
  }
  const TAS = { sep: 'separation rate (%)', repl: 'replacement rate (%)', flux: 'flux rate (%), separations + replacements', avg: 'average number of employees on roll', acc: 'number of employees recruited and joined (accessions)' };
  const challenge = {
    title: 'Work it out',
    gen(r) { return lastMode === 'turnover' ? genTurnover(r) : genPlans(r); },
    prompt(v) {
      if (v.mode === 'turnover') {
        if (v.tbasis === 'rates') return `Turnover rates for the ${PERIODS[v.period][1]}: flux ${pc(v.rFlux)} (separations + accessions), replacement ${pc(v.rRepl)}, separation ${pc(v.rSep)}; ${nf(v.kRepl)} employees were replaced. What is the **${TAS[v.ask]}**?`;
        return `${nf(v.open)} employees at the start of the year and ${nf(v.close)} at the end; ${nf(v.left)} left, ${nf(v.disch)} were discharged, ${nf(v.repl)} were replaced${v.newj ? ` and ${nf(v.newj)} joined for expansion` : ''}. What is the **${TAS[v.ask]}**? (Two decimals.)`;
      }
      return `Time allowed ${hrs(v.std)}, time taken ${hrs(v.taken)}, time rate ₹${grp(v.rate)} an hour${v.share !== 50 ? `, Halsey share ${v.share}% of the time saved` : ''}. What is the **${ASK[v.ask]}**${v.ask === 'equal' ? '' : ' (₹)'}?`;
    },
    solve(res, v) {
      const s = res.sim;
      if (s.mode === 'turnover') { if (s.basis === 'rates') return v.ask === 'avg' ? s.avg : v.ask === 'sep' ? s.sep : s.acc; return r2(v.ask === 'sep' ? s.sepRate : v.ask === 'repl' ? s.replRate : s.flux); }
      return r2(v.ask === 'halsey' ? s.halsey.earn : v.ask === 'rowan' ? s.rowan.earn : v.ask === 'hrate' ? s.halsey.rate : v.ask === 'wrate' ? s.rowan.rate : s.equalT);
    },
    tol: 0.01, unit: '', kind: 'num',
    view: () => null,
    explain(res, v) {
      const s = res.sim;
      if (s.mode === 'turnover') {
        if (s.basis === 'rates') return `Average = ${nf(s.repl)} ÷ ${pc(v.rRepl)} = ${nf(s.avg)}; separations = ${pc(v.rSep)} × ${nf(s.avg)} = ${nf(s.sep)}; accessions = ${pc(v.rFlux)} × ${nf(s.avg)} − ${nf(s.sep)} = ${nf(s.acc)}.`;
        return `Average = (${nf(v.open)} + ${nf(s.close)}) ÷ 2 = ${nf(s.avg)}. Separation ${nf(s.sep)} ÷ ${nf(s.avg)} = ${pc(s.sepRate)}; replacement ${pc(s.replRate)}; flux (${nf(s.sep)} + ${nf(s.repl)}) ÷ ${nf(s.avg)} = ${pc(s.flux)}.`;
      }
      return `Time saved ${nf(s.saved)}. Halsey: ${nf(s.T)} × ₹${grp(s.R)} + ${grp(s.p * 100)}% × ${nf(s.saved)} × ₹${grp(s.R)} = ${inr(s.halsey.earn)} (${inr(s.halsey.rate)} an hour). Rowan: ${inr(s.rowan.basic)} + ${nf(s.saved)}/${nf(s.S)} × ${inr(s.rowan.basic)} = ${inr(s.rowan.earn)} (${inr(s.rowan.rate)} an hour). Equal bonus at ${nf(s.equalT)} hours taken.`;
    }
  };

  const def = {
    id: 'incentives', title: 'Incentive Plans Lab',
    blurb: 'Compute earnings under time rate, piece rate, Halsey and Rowan as time saved grows, and the employee turnover rates.',
    controls, presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { halsey, rowan, plans, turnoverCounts, turnoverRates, annualOf, compute, def };
  g.__lab_def_incentives = def;
})(typeof window !== 'undefined' ? window : globalThis);
