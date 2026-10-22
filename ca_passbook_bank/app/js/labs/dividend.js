/* PassBook — Dividend Models Lab (fm.div.models; ICAI Study Material, Paper 6A, Chapter 8 "Dividend Decision", §8.1–8.2).
   Pure part: walterPrice, walterPayoutFor, gordonPrice, gordonRetentionFor, mm, compute.   UI part: the register() call at the bottom.
   Node-testable: require('app/js/labs/dividend.js') -> {walterPrice, walterPayoutFor, gordonPrice, gordonRetentionFor, mm, compute, def}.

   Models, as the Study Material prints them (rates as decimals inside, % in the controls):
     Walter   P = [D + (r/Ke)(E − D)] / Ke                       optimum payout: 0% if r > Ke, 100% if r < Ke, any payout if r = Ke
     Gordon   P0 = E1(1 − b) / (Ke − br), g = br, needs Ke > br  optimum payout: 0% if r > Ke, 100% if r < Ke, none if r = Ke
     MM       P0 = (P1 + D1)/(1 + Ke) -> P1 = P0(1 + Ke) − D1;  Δn = [I − (E − nD1)] / P1;  nP0 = [(n + Δn)P1 − I + E] / (1 + Ke)
   A target price can be solved backwards for the payout (Walter: SM Illustration 3, PYQ Jan 2025, PYQ May 2026; Gordon: PYQ Sep 2025). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;
  const round = (x, d) => Math.round((x + Math.sign(x) * 1e-12) * 10 ** d) / 10 ** d;
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  /** rupees: whole amounts bare (₹56, ₹20,00,000), others with two decimals (₹51.33, ₹3.50); a true minus sign */
  const rs = x => { const v = round(x, 2), whole = Math.abs(v - Math.round(v)) < 1e-9; return (v < 0 ? '−' : '') + '₹' + grp(Math.abs(v), whole ? 0 : 2); };
  /** a number with up to d decimals, trailing zeros dropped (1.2, 0.15, 85.71) */
  const num = (x, d = 4) => { const v = round(x, d); return (v < 0 ? '−' : '') + Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: d }); };
  const pc = (x, d = 2) => num(x * 100, d) + '%';                 // 0.85714 -> '85.71%'
  const dec = x => num(x, 4);                                    // 0.18 -> '0.18', 1.2 -> '1.2'
  const cnt = x => { const v = round(x, 2); return Math.abs(v - Math.round(v)) < 1e-9 ? grp(Math.round(v), 0) : grp(v, 2); };   // shares: 10,000 or 23,414.63

  /* ================================================================== the models (pure) */
  /** Walter's price for EPS E, return r, cost of equity k (decimals) and dividend per share D */
  function walterPrice(E, r, k, D) {
    if (!(k > 0)) throw new Error('The cost of equity (Ke) must be more than 0%.');
    return (D + (r / k) * (E - D)) / k;
  }
  /** the dividend per share (and payout) that gives Walter price P: P·Ke = D + (r/Ke)(E − D) -> D = (P·Ke − (r/Ke)E) / (1 − r/Ke).
      {D, payout, ok, why}: ok false when no payout from 0% to 100% gives P (or every payout does, r = Ke) */
  function walterPayoutFor(E, r, k, P) {
    const lo = Math.min(walterPrice(E, r, k, 0), walterPrice(E, r, k, E)), hi = Math.max(walterPrice(E, r, k, 0), walterPrice(E, r, k, E));
    if (Math.abs(r - k) < EPS) return Math.abs(P - E / k) < 0.005 ? { D: null, payout: null, ok: false, why: 'any' } : { D: null, payout: null, ok: false, why: 'never', lo, hi };
    const D = (P * k - (r / k) * E) / (1 - r / k), payout = D / E;
    if (payout < -1e-9 || payout > 1 + 1e-9) return { D, payout, ok: false, why: 'range', lo, hi };
    return { D, payout, ok: true };
  }
  /** Gordon's price for EPS E (taken as E1), return r, cost of equity k and retention ratio b: E(1 − b) / (Ke − br); null when Ke ≤ br */
  function gordonPrice(E, r, k, b) {
    const den = k - b * r;
    if (!(den > EPS)) return null;
    return (E * (1 - b)) / den;
  }
  /** the retention ratio that gives Gordon price P: P(Ke − br) = E(1 − b) -> b = (E − P·Ke) / (E − P·r). {b, payout, ok, why} */
  function gordonRetentionFor(E, r, k, P) {
    const den = E - P * r;
    if (Math.abs(r - k) < EPS) return Math.abs(P - E / k) < 0.005 ? { b: null, payout: null, ok: false, why: 'any' } : { b: null, payout: null, ok: false, why: 'never' };
    if (Math.abs(den) < EPS) return { b: null, payout: null, ok: false, why: 'never' };
    const b = (E - P * k) / den;
    if (b < -1e-9 || b > 1 + 1e-9 || !(k - b * r > EPS)) return { b, payout: 1 - b, ok: false, why: 'range' };
    return { b, payout: 1 - b, ok: true };
  }
  /** MM for one dividend D per share: price at the end of the year, funds to raise, new shares and the value of the firm today */
  function mm(n, P0, k, D, E, I) {
    const P1 = P0 * (1 + k) - D;
    if (!(P1 > 0)) throw new Error('The dividend is larger than the share’s value at the end of the year (P0 × (1 + Ke)); lower the dividend.');
    const retained = E - n * D, funds = I - retained, dn = funds / P1;
    const value = ((n + dn) * P1 - I + E) / (1 + k);
    return { D, P1, retained, funds, dn, value, total: n * D };
  }
  const caseOf = (r, k) => (Math.abs(r - k) < EPS ? 'eq' : r > k ? 'gt' : 'lt');
  const CASE = { gt: 'r > Ke: a growth firm', eq: 'r = Ke: a normal firm', lt: 'r < Ke: a declining firm' };

  /* ================================================================== drawings */
  const niceTop = x => { if (!(x > 0)) return 10; const p = 10 ** Math.floor(Math.log10(x)), m = x / p; return (m <= 1 ? 1 : m <= 1.5 ? 1.5 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 3 ? 3 : m <= 4 ? 4 : m <= 5 ? 5 : m <= 6 ? 6 : m <= 8 ? 8 : 10) * p; };
  const XT = [0, 25, 50, 75, 100].map(x => [x, x + '%']);
  /** a y range for prices lo..hi: from 0, or from a round number below lo when the prices sit high above 0 (so the slope shows) */
  function yRange(lo, hi) {
    const top = niceTop(hi * 1.08), step = niceTop((top - Math.min(lo, top)) / 5) || 1;
    let y0 = Math.floor((lo * 0.96) / step) * step;
    if (y0 < 0.3 * top) y0 = 0;
    return [y0, Math.max(y0 + step, Math.ceil((hi * 1.06) / step) * step)];
  }
  /** a point's label sits above it; a point close to an earlier labelled one goes below, so two labels never meet */
  function placeLabels(pts) {
    const out = [];
    pts.forEach(p => { if (p.label != null) { const near = out.some(q => q.label != null && Math.abs(q.x - p.x) < 14 && q.pos !== 'below'); out.push(Object.assign({}, p, { pos: p.x <= 2 ? undefined : near ? 'below' : 'above' })); } else out.push(p); });
    return out;
  }
  /** price-vs-payout plot: lines = [{label, pts, color, dash}], points = [{x, y, label, pos, color}] */
  function pricePlot(title, yr, lines, points) {
    return { type: 'plot', title, alt: title + ': share price against the dividend payout ratio', w: 560, h: 300, x: [0, 100], y: yr, xticks: XT, xlabel: 'dividend payout ratio', ylabel: 'price per share (₹)',
      legend: lines.length > 1 ? 'outside' : 'none', clip: true, series: lines.map(l => ({ label: l.label, pts: l.pts, color: l.color, dash: !!l.dash })), points: placeLabels(points) };
  }
  const fmlTable = (title, rows) => ({ type: 'table', title, head: ['Quantity', 'Formula', 'Value'], rows, align: ['left', 'left', 'right'] });

  /* ---------------------------------------------------------------- Walter */
  function computeWalter(v) {
    const E = +v.eps, r = +v.r / 100, k = +v.ke / 100, p = +v.payout / 100, T = +v.target || 0;
    if (!(E > 0)) throw new Error('Earnings per share (E) must be more than ₹0.');
    if (!(k > 0)) throw new Error('The cost of equity (Ke) must be more than 0%.');
    if (r < 0) throw new Error('The return on investment (r) cannot be negative.');
    const cs = caseOf(r, k), D = E * p, P = walterPrice(E, r, k, D), rk = r / k;
    const at = q => walterPrice(E, r, k, E * q);
    const delta = cs === 'eq' ? Math.max(0.02, k / 5) : Math.abs(r - k);
    const rHi = cs === 'gt' ? r : k + delta, rLo = cs === 'lt' ? r : Math.max(0, k - delta);
    const tgt = T > 0 ? walterPayoutFor(E, r, k, T) : null;
    const wl = [rHi, k, rLo, r].map(rr => [walterPrice(E, rr, k, 0), walterPrice(E, rr, k, E)]).flat().concat(T > 0 ? [T] : []);
    const top = yRange(Math.min(...wl), Math.max(...wl));
    const line = rr => [[0, walterPrice(E, rr, k, 0)], [100, walterPrice(E, rr, k, E)]];
    const own = { label: `r = ${pc(r)}${cs === 'gt' ? ' > Ke' : cs === 'lt' ? ' < Ke' : ' = Ke'}`, pts: line(r), color: cs === 'gt' ? 'a' : cs === 'lt' ? 'd' : 'b' };
    const others = ['gt', 'eq', 'lt'].filter(c => c !== cs).map(c => {
      const rr = c === 'gt' ? rHi : c === 'lt' ? rLo : k;
      return { label: c === 'eq' ? `r = Ke = ${pc(k)}` : `r = ${pc(rr)}${c === 'gt' ? ' > Ke' : ' < Ke'}`, pts: line(rr), color: 'mute', dash: true };
    });
    const grid = [0, 0.25, 0.5, 0.75, 1];
    const rowOf = q => { const d = E * q; return [pc(q), rs(d), rs(rk * (E - d)), rs(walterPrice(E, r, k, d))]; };
    const ptab = (n, extra) => ({ type: 'table', title: 'Price at each payout (Walter)', head: ['Payout', 'D (₹)', '(r/Ke)(E − D) (₹)', 'P (₹)'],
      rows: grid.slice(0, n).map(rowOf).concat(extra || []), align: ['left', 'right', 'right', 'right'] });
    const given = fmlTable('The firm (Walter)', [['EPS', 'E', rs(E)], ['Return on investment', 'r', pc(r)], ['Cost of equity', 'Ke', pc(k)], ['r / Ke', 'r ÷ Ke', dec(rk)], ['Case', 'compare r with Ke', CASE[cs]]]);
    const pts = n => grid.slice(0, n).map(q => ({ x: q * 100, y: round(at(q), 4), color: own.color }));
    const sub = q => { const d = E * q; return `P = [${rs(d)} + (${dec(r)}/${dec(k)}) × (${rs(E)} − ${rs(d)})] / ${dec(k)} = [${rs(d)} + ${rs(rk * (E - d))}] / ${dec(k)} = **${rs(walterPrice(E, r, k, d))}**`; };
    const frames = [];
    const why = cs === 'gt' ? `**r > Ke**: a rupee kept in the firm earns ${pc(r)}, more than the ${pc(k)} shareholders want, so retaining adds value (a growth firm).`
      : cs === 'lt' ? `**r < Ke**: a rupee kept in the firm earns only ${pc(r)}, less than the ${pc(k)} shareholders could earn elsewhere, so they would rather have it as dividend (a declining firm).`
        : `**r = Ke**: a rupee kept earns exactly what shareholders require, so it does not matter whether it is kept or paid out (a normal firm).`;
    frames.push({ caption: `**Walter's model**: P = [D + (r/Ke)(E − D)] / Ke. The dividend D is valued at Ke, and the retained part E − D is worth r/Ke times as much because it earns r inside the firm. Here ${why}`,
      view: [pricePlot('Walter: price vs payout', top, [], []), given] });
    grid.forEach((q, i) => frames.push({ caption: `Payout ${pc(q, 0)}: D = ${rs(E * q)}, retained E − D = ${rs(E - E * q)}. ${sub(q)}.${i === 0 ? ' Nothing is paid, so the whole price comes from the reinvested earnings.' : i === 4 ? ' Everything is paid out, so P = E / Ke.' : ''}`,
      view: [pricePlot('Walter: price vs payout', top, [], pts(i + 1)), ptab(i + 1)] }));
    const mine = { x: p * 100, y: round(P, 4), label: rs(P), color: own.color };
    frames.push({ caption: `The points lie on one straight line: P changes by ${rs(Math.abs((1 - rk) / k) * E / 100)} for each 1% of payout${cs === 'eq' ? ' (that is, not at all)' : ''}. At the given payout of ${pc(p)}: D = ${rs(D)}, so ${sub(p)}.`,
      view: [pricePlot('Walter: price vs payout', top, [own], pts(5).concat([mine])), ptab(5, grid.some(q => Math.abs(q - p) < 1e-9) ? [] : [rowOf(p)])] });
    const refTxt = others.map(o => o.label.indexOf('= Ke') >= 0 ? `with r = Ke the line is flat at E / Ke = ${rs(E / k)}` : o.label.indexOf('> Ke') >= 0 ? `with ${o.label.split(' >')[0]} it falls from ${rs(o.pts[0][1])} to ${rs(o.pts[1][1])}` : `with ${o.label.split(' <')[0]} it rises from ${rs(o.pts[0][1])} to ${rs(o.pts[1][1])}`).join('; ');
    frames.push({ caption: `The three cases side by side (dashed): ${refTxt}. All three lines meet at 100% payout, where nothing is retained and P = E / Ke = ${rs(E / k)}.`,
      view: [pricePlot('Walter: price vs payout', top, [own].concat(others), pts(5).concat([mine])), ptab(5)] });
    const opt = cs === 'gt' ? { payout: 0, P: at(0), txt: `**0%**: retain everything, because every retained rupee earns r = ${pc(r)} > Ke. Highest price ${rs(at(0))} (and the lowest, ${rs(at(1))}, at 100%).` }
      : cs === 'lt' ? { payout: 1, P: at(1), txt: `**100%**: pay everything, because a retained rupee earns only ${pc(r)} < Ke. Highest price ${rs(at(1))} (and the lowest, ${rs(at(0))}, at 0%).` }
        : { payout: null, P: E / k, txt: `**any payout**: the price is ${rs(E / k)} whatever is paid, so every payout ratio is optimum.` };
    const optPt = opt.payout == null ? [] : [{ x: opt.payout * 100, y: round(opt.P, 4), label: 'max ' + rs(opt.P), color: 'ok' }];
    frames.push({ caption: `Optimum payout under Walter: ${opt.txt}`, view: [pricePlot('Walter: price vs payout', top, [own].concat(others), pts(5).concat(optPt).concat(opt.payout === p ? [] : [mine])), ptab(5)] });
    let tgtStat = null;
    if (tgt) {
      let cap;
      const alg = `${rs(T)} × ${dec(k)} = D + ${dec(rk)} × (${rs(E)} − D), so ${num(T * k, 4)} = ${num(rk * E, 4)} ${1 - rk >= 0 ? '+' : '−'} ${num(Math.abs(1 - rk), 4)}D`;
      if (tgt.ok) cap = `**Target price ${rs(T)}**: ${alg}, giving D = ${rs(tgt.D)} and a payout of D / E = ${rs(tgt.D)} / ${rs(E)} = **${pc(tgt.payout)}** (retention ${pc(1 - tgt.payout)}).`;
      else if (tgt.why === 'any') cap = `**Target price ${rs(T)}**: with r = Ke every payout gives ${rs(E / k)}, so any payout holds the price there.`;
      else if (tgt.why === 'never') cap = `**Target price ${rs(T)}**: with r = Ke the price is ${rs(E / k)} at every payout, so no payout reaches ${rs(T)}.`;
      else cap = `**Target price ${rs(T)}**: no payout between 0% and 100% gives it (${tgt.D != null ? `the equation needs D = ${rs(tgt.D)}, a payout of ${pc(tgt.payout)}; ` : ''}Walter's prices here run from ${rs(tgt.lo)} to ${rs(tgt.hi)}).`;
      const tp = tgt.ok ? [{ x: tgt.payout * 100, y: T, label: pc(tgt.payout), color: 'e' }] : [];
      frames.push({ caption: cap, view: [pricePlot('Walter: price vs payout', top, [own].concat(others), pts(5).concat(optPt, tp)), ptab(5, tgt.ok ? [rowOf(tgt.payout)] : [])] });
      tgtStat = tgt.ok ? { label: `Payout for ${rs(T)}`, value: pc(tgt.payout), hint: 'solve P·Ke = D + (r/Ke)(E − D) for D; payout = D / E' } : { label: `Payout for ${rs(T)}`, value: tgt.why === 'any' ? 'any' : 'none', hint: 'no payout from 0% to 100% gives this price' };
    }
    const stats = [{ label: `Price at ${pc(p)} payout`, value: rs(P), hint: 'P = [D + (r/Ke)(E − D)] / Ke' },
      { label: 'Optimum payout', value: opt.payout == null ? 'any' : pc(opt.payout, 0), hint: 'r > Ke: 0% · r = Ke: any · r < Ke: 100%' },
      { label: 'Price at the optimum', value: rs(opt.P), hint: opt.payout == null ? 'E / Ke at every payout' : opt.payout ? 'P at 100% payout = E / Ke' : 'P at 0% payout = (r/Ke)E / Ke' },
      { label: 'Case', value: cs === 'gt' ? 'r > Ke' : cs === 'lt' ? 'r < Ke' : 'r = Ke', hint: CASE[cs] }].concat(tgtStat ? [tgtStat] : []);
    return { frames, stats, model: 'walter', price: P, optimum: opt.payout, optPrice: opt.P, target: tgt, case: cs, D,
      table: { head: ['Payout', 'D (₹)', 'P (₹)'], rows: grid.map(q => [pc(q, 0), rs(E * q), rs(at(q))]).concat(grid.some(q => Math.abs(q - p) < 1e-9) ? [] : [[pc(p) + ' (given)', rs(D), rs(P)]]) },
      note: '**Conventions.** E is the earnings per share for the year and D the dividend per share; r and Ke are yearly rates. Walter assumes all investment is financed from retained earnings, a constant r and Ke, no taxes and a perpetual life. Prices are rounded to the paisa.' };
  }

  /* ---------------------------------------------------------------- Gordon */
  function computeGordon(v) {
    const E = +v.eps, r = +v.r / 100, k = +v.ke / 100, p = +v.payout / 100, T = +v.target || 0, b = 1 - p;
    if (!(E > 0)) throw new Error('Earnings per share (E) must be more than ₹0.');
    if (!(k > 0)) throw new Error('The cost of equity (Ke) must be more than 0%.');
    if (r < 0) throw new Error('The return on investment (r) cannot be negative.');
    const cs = caseOf(r, k), P = gordonPrice(E, r, k, b);
    if (P == null) throw new Error(`Gordon's model needs Ke > g = b × r. At a ${pc(p)} payout, g = ${pc(b)} × ${pc(r)} = ${pc(b * r)}, not below Ke = ${pc(k)}; raise the payout above ${pc(Math.max(0, 1 - k / r))}.`);
    const bMax = r > 0 ? Math.min(1, k / r) : 1, pMin = 1 - bMax;      // payouts below pMin give g >= Ke (only when r > Ke)
    const at = q => gordonPrice(E, r, k, 1 - q);
    const delta = cs === 'eq' ? Math.max(0.02, k / 5) : Math.abs(r - k);
    const rHi = cs === 'gt' ? r : k + delta, rLo = cs === 'lt' ? r : Math.max(0, k - delta);
    const curve = rr => {
      const lo = rr > k ? 1 - k / rr : 0, out = [];
      for (let i = 0; i <= 80; i++) { const q = lo + ((1 - lo) * i) / 80; if (q <= lo + 1e-6 && rr >= k) continue; const y = gordonPrice(E, rr, k, 1 - q); if (y != null && isFinite(y)) out.push([round(q * 100, 4), round(y, 4)]); }
      return out;
    };
    const grid = [0, 0.25, 0.5, 0.75, 1];
    const valid = q => at(q) != null && !(cs === 'eq' && q === 0);
    const tgt = T > 0 ? gordonRetentionFor(E, r, k, T) : null;
    const seen = grid.filter(valid).map(at).concat([P, E / k], T > 0 ? [T] : []);
    const top = yRange(Math.min(0, ...seen), Math.max(...seen));
    const own = { label: `r = ${pc(r)}${cs === 'gt' ? ' > Ke' : cs === 'lt' ? ' < Ke' : ' = Ke'}`, pts: curve(r), color: cs === 'gt' ? 'a' : cs === 'lt' ? 'd' : 'b' };
    const others = ['gt', 'eq', 'lt'].filter(c => c !== cs).map(c => {
      const rr = c === 'gt' ? rHi : c === 'lt' ? rLo : k;
      return { label: c === 'eq' ? `r = Ke = ${pc(k)}` : `r = ${pc(rr)}${c === 'gt' ? ' > Ke' : ' < Ke'}`, pts: curve(rr), color: 'mute', dash: true };
    });
    const rowOf = q => { const bb = 1 - q, y = at(q); return [pc(q), pc(bb * r), rs(E * q), y == null || (cs === 'eq' && q === 0) ? (cs === 'eq' && q === 0 ? '0 / 0: undefined' : 'g ≥ Ke: undefined') : rs(y)]; };
    const ptab = (n, extra) => ({ type: 'table', title: 'Price at each payout (Gordon)', head: ['Payout', 'g = br', 'D = E(1 − b) (₹)', 'P0 (₹)'],
      rows: grid.slice(0, n).map(rowOf).concat(extra || []), align: ['left', 'right', 'right', 'right'] });
    const given = fmlTable('The firm (Gordon)', [['EPS (taken as E1)', 'E', rs(E)], ['Return on investment', 'r', pc(r)], ['Cost of equity', 'Ke', pc(k)], ['Growth at retention b', 'g = b × r', 'grows with b'],
      ['Highest retention allowed', 'b < Ke / r', r > k ? pc(bMax) : 'any (r ≤ Ke)'], ['Case', 'compare r with Ke', CASE[cs]]]);
    const pts = n => grid.slice(0, n).filter(valid).map(q => ({ x: q * 100, y: round(at(q), 4), color: own.color }));
    const sub = q => { const bb = 1 - q, y = at(q); return y == null ? '' : `P0 = ${rs(E)} × ${dec(q)} / (${dec(k)} − ${dec(bb)} × ${dec(r)}) = ${rs(E * q)} / ${dec(k - bb * r)} = **${rs(y)}**`; };
    const why = cs === 'gt' ? `**r > Ke**: retaining more raises growth g = br, and growth is worth more than the dividend given up (a growth firm). The formula needs Ke > br, so b must stay below Ke / r = ${pc(bMax)} (a payout above ${pc(pMin)}).`
      : cs === 'lt' ? `**r < Ke**: retained money earns less than Ke, so the growth it buys is worth less than the dividend given up (a declining firm).`
        : `**r = Ke**: growth bought by retention is worth exactly the dividend given up, so the price does not move with the payout (a normal firm).`;
    const frames = [{ caption: `**Gordon's model**: P0 = E1(1 − b) / (Ke − br). The dividend E(1 − b) grows every year at g = br, and the share is worth that growing stream discounted at Ke. ${why}`,
      view: [pricePlot("Gordon: price vs payout", top, [], []), given] }];
    grid.forEach((q, i) => {
      const y = at(q);
      const cap = cs === 'eq' && q === 0 ? `Payout 0%: no dividend is ever paid and g = r = Ke, so the formula gives 0 / 0. Gordon values only dividends, and with r = Ke any positive payout gives E / Ke = ${rs(E / k)}.`
        : y == null ? `Payout ${pc(q, 0)}: b = ${pc(1 - q, 0)}, so g = ${pc(1 - q, 0)} × ${pc(r)} = ${pc((1 - q) * r)} is not below Ke = ${pc(k)}. A dividend growing at Ke or faster has no finite value: the formula breaks down here.`
          : `Payout ${pc(q, 0)}: b = ${pc(1 - q, 0)}, g = ${pc(1 - q, 0)} × ${pc(r)} = ${pc((1 - q) * r)}. ${sub(q)}.${q === 1 ? ' With nothing retained there is no growth, so P0 = E / Ke.' : ''}`;
      frames.push({ caption: cap, view: [pricePlot('Gordon: price vs payout', top, [], pts(i + 1)), ptab(i + 1)] });
    });
    const mine = { x: p * 100, y: round(P, 4), label: rs(P), color: own.color };
    frames.push({ caption: `Joining the points gives Gordon's curve${cs === 'gt' ? `, which climbs without limit as the payout falls toward ${pc(pMin)} (growth approaching Ke)` : cs === 'lt' ? ', which rises with the payout' : ', flat at E / Ke'}. At the given payout of ${pc(p)}: b = ${pc(b)}, g = ${pc(b * r)}, ${sub(p)}.`,
      view: [pricePlot('Gordon: price vs payout', top, [own], pts(5).concat([mine])), ptab(5, grid.some(q => Math.abs(q - p) < 1e-9) ? [] : [rowOf(p)])] });
    frames.push({ caption: `The three cases (dashed lines for the other two): with r above Ke the price rises as the payout falls, with r = Ke it is flat at ${rs(E / k)}, with r below Ke it rises with the payout. All meet at 100% payout, where g = 0 and P0 = E / Ke.`,
      view: [pricePlot('Gordon: price vs payout', top, [own].concat(others), pts(5).concat([mine])), ptab(5)] });
    const opt = cs === 'gt' ? { payout: 0, txt: `**0%** (retain everything) — ICAI's conclusion for r > Ke. The formula itself stops at b = Ke / r = ${pc(bMax)}: the closer the retention gets to it, the higher the price.`, P: null }
      : cs === 'lt' ? { payout: 1, P: at(1), txt: `**100%**: every rupee retained earns less than Ke, so paying everything gives the highest price, ${rs(at(1))} = E / Ke.` }
        : { payout: null, P: E / k, txt: `**no optimum**: the price is ${rs(E / k)} at every payout.` };
    const optPt = opt.payout === 1 ? [{ x: 100, y: round(opt.P, 4), label: 'max ' + rs(opt.P), color: 'ok' }] : [];
    frames.push({ caption: `Optimum payout under Gordon: ${opt.txt}`, view: [pricePlot('Gordon: price vs payout', top, [own].concat(others), pts(5).concat(optPt, opt.payout === p ? [] : [mine])), ptab(5)] });
    let tgtStat = null;
    if (tgt) {
      let cap;
      if (tgt.ok) cap = `**Target price ${rs(T)}**: ${rs(T)} × (${dec(k)} − ${dec(r)}b) = ${rs(E)} × (1 − b), so ${num(T * k, 4)} − ${num(T * r, 4)}b = ${num(E, 4)} − ${num(E, 4)}b, giving b = ${num(E - T * k, 4)} / ${num(E - T * r, 4)} = **${pc(tgt.b)}** retention, a payout of **${pc(tgt.payout)}** and a dividend of ${rs(E * tgt.payout)} per share.`;
      else if (tgt.why === 'any') cap = `**Target price ${rs(T)}**: with r = Ke every payout gives ${rs(E / k)}.`;
      else cap = `**Target price ${rs(T)}**: no payout from 0% to 100% gives it under Gordon's model${tgt.b != null ? ` (the equation needs b = ${pc(tgt.b)}, which is outside 0–100% or makes g ≥ Ke)` : ''}.`;
      const tp = tgt.ok ? [{ x: tgt.payout * 100, y: T, label: pc(tgt.payout), color: 'e' }] : [];
      frames.push({ caption: cap, view: [pricePlot('Gordon: price vs payout', top, [own].concat(others), pts(5).concat(optPt, tp)), ptab(5, tgt.ok ? [rowOf(tgt.payout)] : [])] });
      tgtStat = tgt.ok ? { label: `Payout for ${rs(T)}`, value: pc(tgt.payout), hint: 'b = (E − P·Ke) / (E − P·r); payout = 1 − b' } : { label: `Payout for ${rs(T)}`, value: tgt.why === 'any' ? 'any' : 'none', hint: 'no payout from 0% to 100% gives this price' };
    }
    const stats = [{ label: `Price at ${pc(p)} payout`, value: rs(P), hint: 'P0 = E(1 − b) / (Ke − br)' }, { label: 'Growth g = br', value: pc(b * r), hint: 'retention ratio × return on investment' },
      { label: 'Optimum payout', value: opt.payout == null ? 'none' : pc(opt.payout, 0), hint: 'r > Ke: 0% · r = Ke: no optimum · r < Ke: 100%' },
      { label: 'Case', value: cs === 'gt' ? 'r > Ke' : cs === 'lt' ? 'r < Ke' : 'r = Ke', hint: CASE[cs] }].concat(tgtStat ? [tgtStat] : []);
    return { frames, stats, model: 'gordon', price: P, growth: b * r, optimum: opt.payout, target: tgt, case: cs,
      table: { head: ['Payout', 'Retention b', 'g = br', 'P0 (₹)'], rows: grid.map(q => { const y = at(q); return [pc(q, 0), pc(1 - q, 0), pc((1 - q) * r), y == null || (cs === 'eq' && q === 0) ? 'undefined' : rs(y)]; }).concat(grid.some(q => Math.abs(q - p) < 1e-9) ? [] : [[pc(p) + ' (given)', pc(b), pc(b * r), rs(P)]]) },
      note: "**Conventions.** The EPS given is used as E1 (next year's earnings), as in the Study Material's illustrations. Gordon assumes an all-equity firm financed by retained earnings, constant r, Ke and retention ratio b, and Ke > br. Prices are rounded to the paisa." };
  }

  /* ---------------------------------------------------------------- Modigliani–Miller */
  function computeMM(v) {
    const n = +v.shares, P0 = +v.p0, k = +v.ke / 100, D = +v.dps, E = +v.earn, I = +v.invest;
    if (!(n > 0)) throw new Error('Enter the number of shares outstanding (more than 0).');
    if (!(P0 > 0)) throw new Error('The current market price P0 must be more than ₹0.');
    if (!(k > 0)) throw new Error('The cost of equity (Ke) must be more than 0%.');
    if (D < 0 || E < 0 || I < 0) throw new Error('Dividend, earnings and investment cannot be negative.');
    const A = mm(n, P0, k, 0, E, I), B = mm(n, P0, k, D, E, I);
    const cols = ['', 'Dividend not paid', `Dividend of ${rs(D)} paid`];
    const rowsAll = [
      ['Price at the end of the year, P1 = P0(1 + Ke) − D1', `${rs(P0)} × ${num(1 + k, 4)} − 0 = ${rs(A.P1)}`, `${rs(P0)} × ${num(1 + k, 4)} − ${rs(D)} = ${rs(B.P1)}`],
      ['Earnings E', rs(E), rs(E)],
      ['Less: dividend nD1', rs(0), `${cnt(n)} × ${rs(D)} = ${rs(B.total)}`],
      ['Retained earnings E − nD1', rs(A.retained), rs(B.retained)],
      ['Investment I', rs(I), rs(I)],
      ['Funds to raise I − (E − nD1)', rs(A.funds), rs(B.funds)],
      ['New shares Δn = funds / P1', `${rs(A.funds)} / ${rs(A.P1)} = ${cnt(A.dn)}`, `${rs(B.funds)} / ${rs(B.P1)} = ${cnt(B.dn)}`],
      ['(n + Δn) × P1', rs((n + A.dn) * A.P1), rs((n + B.dn) * B.P1)],
      ['Value today nP0 = [(n + Δn)P1 − I + E] / (1 + Ke)', `${rs((n + A.dn) * A.P1 - I + E)} / ${num(1 + k, 4)} = **${rs(A.value)}**`, `${rs((n + B.dn) * B.P1 - I + E)} / ${num(1 + k, 4)} = **${rs(B.value)}**`]
    ];
    const tab = upto => ({ type: 'table', title: 'MM: the firm with and without the dividend', head: cols, rows: rowsAll.slice(0, upto), align: ['left', 'right', 'right'],
      cells: upto >= 9 ? { '8,1': 'ok', '8,2': 'ok' } : {} });
    const given = fmlTable('The firm (MM)', [['Shares outstanding', 'n', cnt(n)], ['Current price', 'P0', rs(P0)], ['Cost of equity (capitalisation rate)', 'Ke', pc(k)], ['Dividend per share, if declared', 'D1', rs(D)],
      ['Net income for the year', 'E', rs(E)], ['New investment', 'I', rs(I)]]);
    const tot = P0 * (1 + k);
    const wealth = { type: 'plot', title: 'An old shareholder at the end of the year, per share', alt: 'Bars: the share price P1, and the dividend on top of it, in the two cases', w: 460, h: 260, x: [-0.6, 1.6], y: [0, niceTop(tot * 1.12)],
      xticks: [[0, 'no dividend'], [1, 'dividend paid']], ylabel: '₹ per share', legend: 'top-right',
      series: [{ label: 'dividend D1', bars: true, values: true, color: 'e', pts: [[0, round(A.P1, 4), rs(A.P1)], [1, round(B.P1 + D, 4), `${rs(B.P1)} + ${rs(D)} = ${rs(B.P1 + D)}`]] },
        { label: 'price P1', bars: true, color: 'a', pts: [[0, round(A.P1, 4)], [1, round(B.P1, 4)]] }] };
    const frames = [
      { caption: `**Modigliani–Miller**: in a perfect market without taxes, a dividend is only cash moving from the firm's pocket to the shareholder's. Here ${cnt(n)} shares sell at ${rs(P0)}, Ke = ${pc(k)}, the firm earns ${rs(E)} and wants to invest ${rs(I)}.`, view: [given] },
      { caption: `Shareholders want Ke = ${pc(k)} a year, so P0 = (P1 + D1) / (1 + Ke). Solving for the year-end price: without a dividend P1 = ${rs(P0)} × ${num(1 + k, 4)} = ${rs(A.P1)}; with a dividend of ${rs(D)} the share is worth exactly ${rs(D)} less, ${rs(B.P1)}.`, view: [tab(1)] },
      { caption: `The investment is financed first from what is retained: earnings ${rs(E)} less the dividend paid (${rs(B.total)} if declared) leaves ${rs(A.retained)} or ${rs(B.retained)}.`, view: [tab(4)] },
      { caption: `The rest of the ${rs(I)} must come from new shares: ${rs(A.funds)} without the dividend, ${rs(B.funds)} with it — paying the dividend means raising more.${B.funds < 0 ? ' A negative amount means surplus cash: MM\'s formula then treats it as shares bought back.' : ''}`, view: [tab(6)] },
      { caption: `New shares are sold at the year-end price: Δn = ${rs(A.funds)} / ${rs(A.P1)} = ${cnt(A.dn)} shares, or ${rs(B.funds)} / ${rs(B.P1)} = ${cnt(B.dn)} shares. More shares at a lower price, after the dividend.`, view: [tab(7)] },
      { caption: `Value of the firm today: nP0 = [(n + Δn)P1 − I + E] / (1 + Ke) = **${rs(A.value)}** without the dividend and **${rs(B.value)}** with it — the same, and equal to n × P0 = ${cnt(n)} × ${rs(P0)}. Dividend policy does not change the value.`, view: [tab(9)] },
      { caption: `For an existing shareholder: without a dividend the share is worth ${rs(A.P1)} at the year end; with it, ${rs(B.P1)} plus ${rs(D)} in cash = ${rs(B.P1 + D)}. Either way ${rs(P0 * (1 + k))} per share, P0 grown at Ke: the dividend is irrelevant.`, view: [wealth, tab(9)] }
    ];
    const stats = [{ label: 'P1 if the dividend is paid', value: rs(B.P1), hint: 'P1 = P0(1 + Ke) − D1' }, { label: 'P1 if not paid', value: rs(A.P1), hint: 'P1 = P0(1 + Ke)' },
      { label: 'New shares (dividend paid)', value: cnt(B.dn), hint: 'Δn = [I − (E − nD1)] / P1' }, { label: 'New shares (not paid)', value: cnt(A.dn), hint: 'Δn = (I − E) / P1' },
      { label: 'Value of the firm (either case)', value: rs(B.value), hint: 'nP0 = [(n + Δn)P1 − I + E] / (1 + Ke)' }];
    return { frames, stats, model: 'mm', noDiv: A, div: B, value: B.value,
      table: { head: ['Item', 'Dividend not paid', 'Dividend paid'], rows: [['P1', rs(A.P1), rs(B.P1)], ['Funds to raise', rs(A.funds), rs(B.funds)], ['New shares Δn', cnt(A.dn), cnt(B.dn)], ['Value of the firm', rs(A.value), rs(B.value)]] },
      note: '**Conventions.** MM assumes perfect capital markets, no taxes, no flotation or transaction costs, a fixed investment policy financed by retained earnings and new equity, and certainty. New shares are issued at the year-end price P1; fractional shares are kept, as in ICAI\'s answers.' };
  }

  let lastModel = 'walter';
  function compute(v) {
    lastModel = v.model === 'gordon' || v.model === 'mm' ? v.model : 'walter';
    if (v.model === 'gordon') return computeGordon(v);
    if (v.model === 'mm') return computeMM(v);
    return computeWalter(v);
  }

  /* ================================================================== the lab */
  const WG = v => v.model !== 'mm', MM = v => v.model === 'mm';
  const presets = [
    { label: 'PYQ Jan 2025 Q1(c) · LP Ltd: Walter price at 50% payout, and the payout for ₹48', values: { model: 'walter', eps: 7, r: 18, ke: 15, payout: 50, target: 48 } },
    { label: 'PYQ May 2026 Q3(a) · K Ltd: Walter at 20% retention, and the retention for ₹60', values: { model: 'walter', eps: 6, r: 25, ke: 15, payout: 80, target: 60 } },
    { label: 'PYQ May 2025 Q2(b) · H Ltd: the highest and lowest Walter prices', values: { model: 'walter', eps: 3, r: 20, ke: 15, payout: 0, target: 0 } },
    { label: 'Study Material Ill. 2 · XYZ Ltd: optimum payout under Walter (r 12%, Ke 10%)', values: { model: 'walter', eps: 10, r: 12, ke: 10, payout: 25, target: 0 } },
    { label: 'Study Material Ill. 4 · XYZ Ltd: Gordon prices at 25%, 50% and 100% payout', values: { model: 'gordon', eps: 6, r: 20, ke: 16, payout: 50, target: 0 } },
    { label: 'PYQ Sep 2025 Q2(b) · Saraswati Ltd: the Gordon payout behind a ₹159.09 price', values: { model: 'gordon', eps: 10, r: 12, ke: 8, payout: 50, target: 159.09 } },
    { label: 'Study Material Ill. 1 · AB Engineering: value with and without a ₹5 dividend (MM)', values: { model: 'mm', shares: 10000, p0: 100, ke: 10, dps: 5, earn: 100000, invest: 200000 } },
    { label: 'RTP May 2024 Q6 · MCO Ltd: MM value with and without a 25% dividend', values: { model: 'mm', shares: 100000, p0: 20, ke: 15, dps: 2.5, earn: 520000, invest: 750000 } },
    { label: 'Tapri Tea · chai premix arm: r 20% > Ke 14% (Walter)', values: { model: 'walter', eps: 8.4, r: 20, ke: 14, payout: 40, target: 0 } },
    { label: 'Tapri Tea · old samosa factory: r 9% < Ke 12% (Gordon)', values: { model: 'gordon', eps: 6, r: 9, ke: 12, payout: 40, target: 0 } },
    { label: 'Tapri Tea · Dev asks MM: ₹4 dividend before the café expansion', values: { model: 'mm', shares: 500000, p0: 120, ke: 12, dps: 4, earn: 3000000, invest: 5000000 } }
  ];

  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const def = {
    id: 'dividend', title: 'Dividend Models Lab',
    blurb: 'Watch the share price move with the payout under Walter and Gordon, find the optimum, and see MM leave value unchanged.',
    controls: [
      { id: 'model', type: 'seg', label: 'Model', value: 'walter', options: [['walter', 'Walter'], ['gordon', 'Gordon'], ['mm', 'MM']] },
      { id: 'eps', type: 'number', label: 'Earnings per share E (₹)', short: 'E', value: 7, min: 0.01, max: 100000, step: 0.01, show: WG },
      { id: 'r', type: 'number', label: 'Return on investment r (%)', short: 'r', value: 18, min: 0, max: 100, step: 0.01, show: WG },
      { id: 'ke', type: 'number', label: 'Cost of equity Ke (%)', short: 'Ke', value: 15, min: 0.01, max: 100, step: 0.01 },
      { id: 'payout', type: 'number', label: 'Dividend payout ratio (%)', short: 'Payout', value: 50, min: 0, max: 100, step: 0.01, show: WG, help: 'Dividend per share as a % of EPS. Retention ratio b = 100% − payout.' },
      { id: 'target', type: 'number', label: 'Target price per share, ₹ (0 = none)', short: 'Target price', value: 48, min: 0, max: 1000000, step: 0.01, show: WG, help: 'The lab solves the model backwards for the payout that gives this price.' },
      { id: 'shares', type: 'number', label: 'Shares outstanding n', short: 'n', value: 10000, min: 1, max: 1e10, show: MM },
      { id: 'p0', type: 'number', label: 'Current market price P0 (₹)', short: 'P0', value: 100, min: 0.01, max: 1e7, step: 0.01, show: MM },
      { id: 'dps', type: 'number', label: 'Dividend per share D1, if declared (₹)', short: 'D1', value: 5, min: 0, max: 1e7, step: 0.01, show: MM },
      { id: 'earn', type: 'number', label: 'Net income for the year E (₹)', short: 'E', value: 100000, min: 0, max: 1e13, show: MM },
      { id: 'invest', type: 'number', label: 'New investment I (₹)', short: 'I', value: 200000, min: 0, max: 1e13, show: MM }
    ],
    presets, compute,
    challenge: {
      title: 'Price the share',
      gen(r) {
        const model = lastModel;                  // the mode being explored (compute ran on the current values first)
        for (let t = 0; t < 60; t++) {
          const ke = pick(r, [10, 12, 14, 15, 16, 20]), rr = ke + pick(r, [-6, -4, -3, -2, 2, 3, 4, 5, 6, 8]), E = pick(r, [3, 4, 5, 6, 7, 8, 10, 12, 15, 20]);
          const k = ke / 100, R = rr / 100, payout = pick(r, [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]);
          const ok = q => model !== 'gordon' || gordonPrice(E, R, k, 1 - q / 100) != null;
          if (!(R > 0) || !ok(payout)) continue;
          const o = { eps: E, r: rr, ke, payout, target: 0, ask: r() < 0.7 ? 'price' : 'target' };
          if (o.ask === 'target') {
            const qs = [20, 30, 40, 60, 70, 80].filter(x => Math.abs(x - payout) > 5 && ok(x));
            if (!qs.length) o.ask = 'price';
            else { const q = pick(r, qs) / 100; o.target = round(model === 'gordon' ? gordonPrice(E, R, k, 1 - q) : walterPrice(E, R, k, E * q), 2); }
          }
          o.shares = pick(r, [10000, 20000, 50000, 100000, 200000]); o.p0 = pick(r, [20, 25, 40, 50, 80, 100, 120]); o.dps = pick(r, [1, 1.5, 2, 2.5, 3, 4, 5]);
          o.earn = o.shares * pick(r, [2, 3, 4, 5, 6, 8]); o.invest = o.earn + o.shares * pick(r, [1, 2, 3, 5, 8]); o.mmAsk = pick(r, ['p1', 'dn', 'value']);
          return o;
        }
        return { eps: 10, r: 12, ke: 10, payout: 50, target: 0, ask: 'price', shares: 10000, p0: 100, dps: 5, earn: 100000, invest: 200000, mmAsk: 'p1' };
      },
      prompt(v, res) {
        if (v.model === 'mm') {
          const base = `Under the **MM hypothesis**: ${GA.util ? GA.util.nf(v.shares) : v.shares} shares at ₹${v.p0}, Ke = ${v.ke}%, net income ₹${GA.util ? GA.util.nf(v.earn) : v.earn}, new investment ₹${GA.util ? GA.util.nf(v.invest) : v.invest}, and a dividend of ₹${v.dps} per share is declared.`;
          return base + (v.mmAsk === 'p1' ? ' What is the **price per share at the end of the year** (₹, two decimals)?' : v.mmAsk === 'dn' ? ' How many **new shares** must be issued to finance the investment (two decimals)?' : ' What is the **value of the firm** today (₹)?');
        }
        const name = v.model === 'gordon' ? "Gordon's model" : "Walter's model";
        const base = `EPS ₹${v.eps}, return on investment r = ${v.r}%, cost of equity Ke = ${v.ke}%.`;
        if (v.ask === 'target') return `${base} Using **${name}**, what **payout ratio** (%, two decimals) gives a share price of ₹${v.target}?`;
        return `${base} Using **${name}**, what is the **price per share** at a payout ratio of ${v.payout}% (₹, two decimals)?`;
      },
      solve(res, v) {
        if (res.model === 'mm') return v.mmAsk === 'p1' ? round(res.div.P1, 2) : v.mmAsk === 'dn' ? round(res.div.dn, 2) : round(res.value, 2);
        if (v.ask === 'target') return res.target && res.target.ok ? round(res.target.payout * 100, 2) : null;
        return round(res.price, 2);
      },
      tol: 0.011, unit: '', kind: 'num',
      view: res => res.frames[0].view.filter(x => x.type !== 'plot'),   // the inputs only: the price axis is scaled to the answer
      explain(res, v) {
        if (res.model === 'mm') return `P1 = ${rs(v.p0)} × (1 + ${dec(v.ke / 100)}) − ${rs(v.dps)} = ${rs(res.div.P1)}; funds to raise = ${rs(v.invest)} − (${rs(v.earn)} − ${rs(res.div.total)}) = ${rs(res.div.funds)}; Δn = ${rs(res.div.funds)} / ${rs(res.div.P1)} = ${cnt(res.div.dn)}; value = ${rs(res.value)} (= n × P0).`;
        if (v.ask === 'target') return res.frames[res.frames.length - 1].caption;
        const D = v.eps * v.payout / 100, k = v.ke / 100, r = v.r / 100;
        return res.model === 'gordon' ? `b = ${pc(1 - v.payout / 100)}, g = br = ${pc(res.growth)}; P0 = ${rs(D)} / (${dec(k)} − ${dec(res.growth)}) = ${rs(res.price)}.`
          : `D = ${rs(D)}; P = [${rs(D)} + (${dec(r)}/${dec(k)})(${rs(v.eps)} − ${rs(D)})] / ${dec(k)} = ${rs(res.price)}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { walterPrice, walterPayoutFor, gordonPrice, gordonRetentionFor, mm, compute, def, _fmt: { rs, pc, num, cnt } };
  g.__lab_def_dividend = def;
})(typeof window !== 'undefined' ? window : globalThis);
