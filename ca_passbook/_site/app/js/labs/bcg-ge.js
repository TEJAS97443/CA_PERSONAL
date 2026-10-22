/* PassBook — Portfolio Matrices Lab (bcg-ge): the BCG growth-share matrix and the GE nine-cell ("stop-light") grid of ICAI's Strategic
   Management Study Material, chapter 4 (4.4.3, 4.4.3.1 and 4.4.4, printed pages 4.27-4.32).
   Pure part: bcgClassify(units, opts), geClassify(units), parseLevel(text, axis) and compute(values). UI part: the register() call at the bottom.
   Conventions (stated in every result's note):
   - BCG: relative market share = own share / largest rival's share (or typed as a multiple), high from 1× by default; market growth high from
     10 % a year by default (the Study Material gives no cut-off; both lines are inputs). High share is drawn on the LEFT, as in the
     Study Material's figure, on a log scale (10× … 1× … 0.1× of the cut-off).
   - BCG post-identification strategies (SM 4.4.3.1 lists Build, Hold, Harvest, Divest without pairing them): the pairing used is ICAI's own,
     from the Suggested Answers of RTP May 2026 Q14 and MTP January 2025 Series II: Stars → Build, Question marks → Hold, Cash cows → Harvest,
     Dogs → Divest (PYQ January 2025 Q5(c) accepts Build or Hold for a Star).
   - GE: the nine cells and their colours exactly as the figure on page 4.31; a level may be typed as a word or as a score from 1 to 5
     (thirds: below 2.33 low / weak, below 3.67 medium / average, else high / strong). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const r2 = x => Math.round(x * 100) / 100;
  const num = x => { const s = String(x == null ? '' : x).replace(/[,\s₹%×x]/gi, ''); return s === '' ? NaN : Number(s); };
  const cr = n => '₹' + (Math.abs(n) >= 1000 ? Number(r2(n)).toLocaleString('en-IN') : r2(n)) + ' cr';
  const times = x => (x >= 10 ? String(Math.round(x * 10) / 10) : x >= 1 ? String(r2(x)) : String(Math.round(x * 1000) / 1000)) + '×';
  const pct = x => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(r2(x)) + '%';
  let lastMode = 'bcg';                       // the mode of the last good compute: challenge.gen follows it (framework: problem())

  /* ================================================================ BCG growth-share matrix */
  const QUAD = {
    star: { key: 'star', name: 'Star', plural: 'Stars', strategy: 'Build', color: 'ok',
      what: 'high relative share in a high-growth market',
      why: 'Stars are growing rapidly and represent the best opportunities for expansion; they need heavy investment to maintain their position and finance their growth, so the strategy is **Build** (ICAI also accepts Hold: never Harvest or Divest a Star). When the market\'s growth slows, a Star becomes a Cash cow.' },
    qm: { key: 'qm', name: 'Question mark', plural: 'Question marks', strategy: 'Hold', color: 'warn',
      what: 'low relative share in a high-growth market',
      why: 'Question marks (problem children, wildcats) need a lot of cash to hold their share and generate little; ICAI\'s answers pair them with **Hold**, investing heavily so the best of them can be turned into Stars. Left unattended they become cash traps.' },
    cow: { key: 'cow', name: 'Cash cow', plural: 'Cash cows', strategy: 'Harvest', color: 'a',
      what: 'high relative share in a low-growth market',
      why: 'Cash cows are established and successful, generate cash, have low costs and need less investment to keep their share, so the strategy is **Harvest**: take the cash and use it for Stars and Question marks.' },
    dog: { key: 'dog', name: 'Dog', plural: 'Dogs', strategy: 'Divest', color: 'bad',
      what: 'low relative share in a low-growth market',
      why: 'Dogs may generate enough cash to maintain themselves but do not have much future; the Study Material says Dogs should be minimised by divestment or liquidation, so the strategy is **Divest**.' }
  };
  const QUADS = ['star', 'qm', 'cow', 'dog'];

  function names(list, what) {
    const seen = new Set();
    list.forEach(u => {
      if (!u.name) throw new Error(`Give every ${what} a name.`);
      const k = u.name.toLowerCase();
      if (seen.has(k)) throw new Error(`Give every ${what} a different name ("${u.name}" appears twice).`);
      seen.add(k);
    });
  }
  /** units: [{name, revenue, share, rival?, growth}] (share = own %, rival = largest rival's %; or share = relative share × when opts.rel);
      opts: {rel, cutShare, cutGrowth} → the units with rms, highShare, highGrowth, quad and strategy */
  function bcgClassify(units, opts) {
    const o = opts || {}, rel = !!o.rel, cutS = o.cutShare == null ? 1 : +o.cutShare, cutG = o.cutGrowth == null ? 10 : +o.cutGrowth;
    if (!(cutS > 0)) throw new Error('The high-share line must be a relative share above 0 (1× is the usual line).');
    if (!isFinite(cutG)) throw new Error('Type the market growth rate from which growth counts as high (10% is the usual line).');
    if (!units.length) throw new Error('Add at least one SBU.');
    if (units.length > 8) throw new Error('At most 8 SBUs fit on the matrix.');
    names(units, 'SBU');
    return units.map(u => {
      const n = u.name;
      if (!(u.revenue > 0)) throw new Error(`${n}: revenue must be more than 0 (it sets the size of the bubble).`);
      if (!isFinite(u.growth) || u.growth < -100) throw new Error(`${n}: type the market growth rate in % a year (−20 for a market shrinking by 20%).`);
      let rms;
      if (rel) {
        if (!(u.share > 0)) throw new Error(`${n}: the relative market share must be more than 0 (0.5× = half the leader's share).`);
        rms = u.share;
      } else {
        if (!(u.share > 0 && u.share <= 100)) throw new Error(`${n}: its market share must be between 0 and 100%.`);
        if (!(u.rival > 0 && u.rival <= 100)) throw new Error(`${n}: the largest rival's share must be between 0 and 100%.`);
        if (u.share + u.rival > 100 + 1e-9) throw new Error(`${n}: its share and its largest rival's share add up to more than 100%.`);
        rms = u.share / u.rival;
      }
      const highShare = rms >= cutS - 1e-12, highGrowth = u.growth >= cutG - 1e-12;
      const quad = highGrowth ? (highShare ? 'star' : 'qm') : (highShare ? 'cow' : 'dog');
      return Object.assign({}, u, { rms, highShare, highGrowth, quad, strategy: QUAD[quad].strategy });
    });
  }

  /* the BCG drawing (shapes): x 0-10 (high share on the left, log scale around the cut-off), y 0-8 (growth, the cut-off at 4) */
  function bcgScale(list, cutS, cutG) {
    const gs = list.map(u => u.growth), up5 = x => Math.ceil(x / 5) * 5;
    const hi = cutG + Math.max(10, up5((Math.max(...gs, cutG) - cutG) * 1.3 + 2)), lo = cutG - Math.max(10, up5((cutG - Math.min(...gs, cutG)) * 1.15 + 2));
    const X = u => { const t = Math.max(-1, Math.min(1, Math.log10(u.rms / cutS))); let x = 5 - 5 * t; x = u.highShare ? Math.min(x, 4.7) : Math.max(x, 5.3); return Math.max(0.5, Math.min(9.5, x)); };
    // bubbles stay under their quadrant's title band (the top 0.8 of each quadrant)
    const Y = u => { let y = u.growth >= cutG ? 4 + (4 * (u.growth - cutG)) / (hi - cutG) : (4 * (u.growth - lo)) / (cutG - lo); y = u.highGrowth ? Math.max(4.45, Math.min(y, 6.85)) : Math.max(0.45, Math.min(y, 2.85)); return y; };
    return { hi, lo, X, Y, off: u => Math.abs(Math.log10(u.rms / cutS)) > 1 };
  }
  function bcgFigure(list, opt) {
    const o = opt || {}, S = o.scale, cutS = o.cutS, cutG = o.cutG, show = o.show || [], blank = !!o.blank;
    const items = [];
    const quadRect = { star: [0, 4], qm: [5, 4], cow: [0, 0], dog: [5, 0] };
    QUADS.forEach(k => { const [x, y] = quadRect[k]; items.push({ kind: 'rect', at: [x, y], w: 5, h: 4, fill: blank ? 'mute' : QUAD[k].color, color: 'mute', width: 1 }); });
    if (!blank) QUADS.forEach(k => { const [x, y] = quadRect[k]; items.push({ kind: 'text', at: [x + 0.25, y + 3.62], t: QUAD[k].plural, anchor: 'start', size: 13.5, color: QUAD[k].color }); });
    if (o.hlQuad && !blank) { const [x, y] = quadRect[o.hlQuad]; items.push({ kind: 'rect', at: [x + 0.06, y + 0.06], w: 4.88, h: 3.88, color: QUAD[o.hlQuad].color, width: 3 }); }
    // axes: share ticks under the box (high on the left), growth ticks at its left
    items.push({ kind: 'text', at: [0, -0.42], t: times(cutS * 10), size: 12.5, bold: false }, { kind: 'text', at: [5, -0.42], t: times(cutS), size: 12.5 },
      { kind: 'text', at: [10, -0.42], t: times(cutS / 10), size: 12.5, bold: false });
    items.push({ kind: 'text', at: [5, -1.02], t: 'Relative market share (log scale): high ← → low', size: 12.5, bold: false });
    items.push({ kind: 'text', at: [-0.2, 8], t: pct(S.hi), anchor: 'end', size: 12.5, bold: false }, { kind: 'text', at: [-0.2, 4], t: pct(cutG), anchor: 'end', size: 12.5 },
      { kind: 'text', at: [-0.2, 0], t: pct(S.lo), anchor: 'end', size: 12.5, bold: false });
    items.push({ kind: 'text', at: [0, 8.45], t: 'Market growth rate (% a year)', anchor: 'start', size: 12.5, bold: false });
    if (o.guide) {                                                 // the SBU being read: dashed guides to its share and its growth
      const u = o.guide, x = S.X(u), y = S.Y(u);
      items.push({ kind: 'line', pts: [[x, 0], [x, 8]], color: 'h', dash: true, width: 1.4 }, { kind: 'line', pts: [[0, y], [10, y]], color: 'h', dash: true, width: 1.4 });
      items.push({ kind: 'circle', c: [x, y], r: 0.13, fill: 'h', solid: true, color: 'h' });
    }
    const maxRev = Math.max(...list.map(u => u.revenue));
    show.forEach(u => {
      const x = S.X(u), y = S.Y(u), r = Math.max(0.24, 0.75 * Math.sqrt(u.revenue / maxRev)), c = QUAD[u.quad].color;
      items.push({ kind: 'circle', c: [x, y], r, fill: c, solid: true, color: c, width: 1.6 });
      // the name goes on the side with more room inside the bubble's own quadrant
      const left0 = u.highShare ? 0 : 5, right = x - left0 < 2.5;
      items.push({ kind: 'text', at: [right ? x + r + 0.14 : x - r - 0.14, y], t: u.name, anchor: right ? 'start' : 'end', size: 12.5 });
    });
    return { type: 'shapes', alt: 'BCG growth-share matrix: relative market share across (high on the left), market growth up; ' + (show.length ? show.map(u => `${u.name} in ${QUAD[u.quad].plural}`).join(', ') : 'no SBU placed yet'), u: 35, w: 460, items };
  }

  function computeBCG(v) {
    const rel = v.shareMode === 'rel';
    const rows = rel ? v.unitsRel : v.units;
    if (!Array.isArray(rows) || !rows.length) throw new Error('Add at least one SBU.');
    const units = rows.map((r, i) => rel
      ? { name: String(r[0] == null ? '' : r[0]).trim() || 'SBU ' + (i + 1), revenue: num(r[1]), share: num(r[2]), growth: num(r[3]) }
      : { name: String(r[0] == null ? '' : r[0]).trim() || 'SBU ' + (i + 1), revenue: num(r[1]), share: num(r[2]), rival: num(r[3]), growth: num(r[4]) });
    const cutS = num(v.cutShare), cutG = num(v.cutGrowth);
    const list = bcgClassify(units, { rel, cutShare: cutS, cutGrowth: cutG });
    const S = bcgScale(list, cutS, cutG);
    const fig = o => bcgFigure(list, Object.assign({ scale: S, cutS, cutG }, o));
    const frames = [{ caption: `The BCG matrix plots each SBU by two things only. Up the side: the **market growth rate**, a measure of market attractiveness (high from ${pct(cutG)} here). Across: the **relative market share**, a measure of the company's strength, with **high share on the left** as in the Study Material's figure. Bubble size = revenue.`, view: [fig({})] }];
    const shown = [];
    list.forEach((u, i) => {
      const shareTxt = rel ? `its relative market share is **${times(u.rms)}**` : `relative market share = its share ÷ its largest rival's share = ${r2(u.share)} ÷ ${r2(u.rival)} = **${times(u.rms)}**`;
      const off = S.off(u) ? ' (off the drawn scale, shown at the edge)' : '';
      frames.push({ caption: `**${u.name}**: ${shareTxt}${off}, ${u.highShare ? 'at or above' : 'below'} the ${times(cutS)} line, so its share is **${u.highShare ? 'high' : 'low'}**. Its market grows ${pct(u.growth)} a year, ${u.highGrowth ? 'at or above' : 'below'} the ${pct(cutG)} line: **${u.highGrowth ? 'high' : 'low'} growth**.`,
        view: [fig({ show: shown.slice(), guide: u })] });
      shown.push(u);
      const Q = QUAD[u.quad];
      frames.push({ caption: `${u.highShare ? 'High' : 'Low'} share and ${u.highGrowth ? 'high' : 'low'} growth make **${u.name}** a **${Q.name}** (${Q.what}). ${Q.why}`,
        view: [fig({ show: shown.slice(), hlQuad: u.quad })] });
    });
    const count = k => list.filter(u => u.quad === k).length;
    const totalRev = list.reduce((s, u) => s + u.revenue, 0), rev = k => list.filter(u => u.quad === k).reduce((s, u) => s + u.revenue, 0);
    const bal = count('cow') ? `The Cash cows (${Math.round((100 * rev('cow')) / totalRev)}% of revenue) generate the cash that the Stars and Question marks need` : 'There is **no Cash cow** to fund the Stars and Question marks: the portfolio needs cash from outside';
    frames.push({ caption: `The whole portfolio: ${QUADS.map(k => `${count(k)} ${count(k) === 1 ? QUAD[k].name : QUAD[k].plural}`).join(', ')}. ${bal}; Dogs should be minimised. The point of the matrix is resource allocation: channel cash from cash-rich businesses to the ones with the greatest potential.`,
      view: [fig({ show: list })] });
    const rowsOut = list.map(u => rel ? [u.name, cr(u.revenue), times(u.rms), pct(u.growth), QUAD[u.quad].name, u.strategy]
      : [u.name, cr(u.revenue), r2(u.share) + '%', r2(u.rival) + '%', times(u.rms), pct(u.growth), QUAD[u.quad].name, u.strategy]);
    return {
      frames, sim: { mode: 'bcg', list, cutS, cutG },
      stats: QUADS.map(k => ({ label: QUAD[k].plural, value: String(count(k)), hint: `${QUAD[k].what}: ${QUAD[k].strategy}`, tone: k === 'star' ? 'ok' : k === 'dog' && count(k) ? 'bad' : '' })),
      table: { head: rel ? ['SBU', 'Revenue', 'Relative share', 'Market growth', 'Quadrant', 'Strategy'] : ['SBU', 'Revenue', 'Share', "Largest rival's share", 'Relative share', 'Market growth', 'Quadrant', 'Strategy'], rows: rowsOut },
      note: `**Conventions.** ${rel ? 'Relative market share is typed as a multiple of the largest rival\'s share.' : 'Relative market share = the SBU\'s market share ÷ the largest rival\'s share (for the market leader, the next-largest firm).'} Share counts as high from ${times(cutS)} and growth from ${pct(cutG)} a year; the Study Material gives no cut-off, so both lines are inputs. Strategies follow ICAI's Suggested Answers (RTP May 2026 Q14): Stars Build, Question marks Hold, Cash cows Harvest, Dogs Divest. **Limits (SM 4.4.3):** the matrix can be difficult, time-consuming and costly to implement, SBUs and market share are hard to define and measure, and it classifies today's businesses but gives little advice for future planning.`
    };
  }

  /* ================================================================ GE nine-cell matrix */
  const GE_ROWS = ['high', 'medium', 'low'], GE_COLS = ['strong', 'average', 'weak'];
  const ROW_NAME = { high: 'High', medium: 'Medium', low: 'Low' }, COL_NAME = { strong: 'Strong', average: 'Average', weak: 'Weak' };
  /* the figure on page 4.31: rows market attractiveness (high → low), columns business strength (strong → weak) */
  const GE_CELL = {
    high: { strong: 'green', average: 'green', weak: 'yellow' },
    medium: { strong: 'green', average: 'yellow', weak: 'red' },
    low: { strong: 'yellow', average: 'red', weak: 'red' }
  };
  const ZONE = {
    green: { name: 'Green', strategy: 'Invest/Expand', color: 'ok', why: 'the business is at an advantageous position; to reap the benefits, the strategic decision can be to **expand, to invest and grow**' },
    yellow: { name: 'Yellow (amber)', strategy: 'Select/Earn', color: 'warn', why: 'the business needs **caution**: managerial discretion is called for in making the strategic choices, investing selectively and earning from what it has' },
    red: { name: 'Red', strategy: 'Harvest/Divest', color: 'bad', why: 'the business will eventually lead to losses that make things difficult, so the appropriate strategy is **retrenchment, divestment or liquidation**' }
  };
  const ZONES = ['green', 'yellow', 'red'];
  const LOW_AVG = '**Exam note (low attractiveness, average strength):** the Study Material\'s figure puts this cell in the red Harvest/Divest zone; ICAI\'s RTP for September 2026 (Q14) placed such a division in the yellow zone with selective investment, and harvesting or divestment if its prospects stay weak. Draw the grid as the Study Material does and mention the selective option.';
  const LEVEL_WORDS = {
    attr: { high: 'high', h: 'high', medium: 'medium', med: 'medium', m: 'medium', moderate: 'medium', low: 'low', l: 'low' },
    str: { strong: 'strong', s: 'strong', high: 'strong', h: 'strong', average: 'average', avg: 'average', a: 'average', medium: 'average', med: 'average', m: 'average', moderate: 'average', weak: 'weak', w: 'weak', low: 'weak', l: 'weak' }
  };
  /** a typed level: a word (high / medium / low; strong / average / weak, or their first letters) or a score from 1 to 5 → {level, score} */
  function parseLevel(text, axis) {
    const t = String(text == null ? '' : text).trim().toLowerCase();
    const words = LEVEL_WORDS[axis];
    if (words[t]) return { level: words[t], score: null };
    const n = Number(t.replace(',', '.'));
    if (t !== '' && isFinite(n)) {
      if (n < 1 || n > 5) throw new Error(`A score must be from 1 (lowest) to 5 (highest); "${text}" is not.`);
      const band = n < 7 / 3 ? 2 : n < 11 / 3 ? 1 : 0;
      return { level: (axis === 'attr' ? GE_ROWS : GE_COLS)[band], score: n };
    }
    return null;
  }
  function geClassify(units) {
    if (!units.length) throw new Error('Add at least one SBU.');
    if (units.length > 9) throw new Error('At most 9 SBUs fit on the grid.');
    names(units, 'SBU');
    return units.map(u => {
      const a = parseLevel(u.attr, 'attr'), s = parseLevel(u.str, 'str');
      if (!a) throw new Error(`${u.name}: type market attractiveness as High, Medium or Low (or a score from 1 to 5).`);
      if (!s) throw new Error(`${u.name}: type business strength as Strong, Average or Weak (or a score from 1 to 5).`);
      if (u.revenue != null && isFinite(u.revenue) && u.revenue < 0) throw new Error(`${u.name}: revenue cannot be negative (0 = draw all bubbles the same size).`);
      const zone = GE_CELL[a.level][s.level];
      return Object.assign({}, u, { a, s, row: a.level, col: s.level, zone, strategy: ZONE[zone].strategy });
    });
  }
  const CW = 3.4, CH = 2.4;
  function geFigure(list, opt) {
    const o = opt || {}, show = o.show || [], blank = !!o.blank, items = [];
    GE_ROWS.forEach((rk, ri) => GE_COLS.forEach((ck, ci) => {
      const x = ci * CW, y = (2 - ri) * CH, z = ZONE[GE_CELL[rk][ck]];
      items.push({ kind: 'rect', at: [x, y], w: CW, h: CH, fill: blank ? 'mute' : z.color, color: 'mute', width: 1 });
      if (!blank) items.push({ kind: 'text', at: [x + 0.18, y + CH - 0.38], t: z.strategy, anchor: 'start', size: 12.5, color: z.color });
    }));
    if (o.hlRow) { const ri = GE_ROWS.indexOf(o.hlRow); items.push({ kind: 'rect', at: [0.05, (2 - ri) * CH + 0.05], w: 3 * CW - 0.1, h: CH - 0.1, color: 'h', dash: true, width: 2.4 }); }
    if (o.hlCell) { const ri = GE_ROWS.indexOf(o.hlCell[0]), ci = GE_COLS.indexOf(o.hlCell[1]); items.push({ kind: 'rect', at: [ci * CW + 0.06, (2 - ri) * CH + 0.06], w: CW - 0.12, h: CH - 0.12, color: ZONE[GE_CELL[o.hlCell[0]][o.hlCell[1]]].color, width: 3 }); }
    GE_COLS.forEach((ck, ci) => items.push({ kind: 'text', at: [ci * CW + CW / 2, 3 * CH + 0.38], t: COL_NAME[ck], size: 12.5 }));
    items.push({ kind: 'text', at: [1.5 * CW, 3 * CH + 0.98], t: 'Business strength', size: 13 });
    GE_ROWS.forEach((rk, ri) => items.push({ kind: 'text', at: [-0.18, (2 - ri) * CH + CH / 2], t: ROW_NAME[rk], anchor: 'end', size: 12.5 }));
    items.push({ kind: 'text', at: [-0.18, -0.42], t: 'Market attractiveness ↑', anchor: 'start', size: 12.5, bold: false });
    const revs = list.map(u => (isFinite(u.revenue) && u.revenue > 0 ? u.revenue : 0)), maxRev = Math.max(0, ...revs);
    const seen = {};
    show.forEach(u => {
      const ri = GE_ROWS.indexOf(u.row), ci = GE_COLS.indexOf(u.col);
      let x = u.s.score != null ? ((5 - u.s.score) / 4) * 3 * CW : ci * CW + CW / 2, y = u.a.score != null ? ((u.a.score - 1) / 4) * 3 * CH : (2 - ri) * CH + CH / 2 - 0.05;
      const key = ri + ',' + ci, k = (seen[key] = (seen[key] || 0) + 1) - 1;
      if (u.s.score == null && u.a.score == null && k) { x += [0, -0.85, 0.85, -0.85, 0.85][k % 5]; y += [0, 0.45, 0.45, -0.5, -0.5][k % 5]; }
      const rv = isFinite(u.revenue) && u.revenue > 0 ? u.revenue : 0, r = maxRev > 0 && rv > 0 ? Math.max(0.2, 0.42 * Math.sqrt(rv / maxRev)) : 0.3;
      x = Math.max(ci * CW + 0.45, Math.min((ci + 1) * CW - 0.45, x)); y = Math.max((2 - ri) * CH + r + 0.62, Math.min((2 - ri) * CH + CH - 0.62 - r, y));
      const c = ZONE[u.zone].color;
      items.push({ kind: 'circle', c: [x, y], r, fill: c, solid: true, color: c, width: 1.6 });
      items.push({ kind: 'text', at: [x, y - r - 0.3], t: u.name, size: 12.5 });
    });
    return { type: 'shapes', alt: 'GE nine-cell grid: business strength across (strong on the left), market attractiveness up' + (show.length ? '; ' + show.map(u => `${u.name} in ${ROW_NAME[u.row]} × ${COL_NAME[u.col]}`).join(', ') : ''), u: 35, w: 460, items };
  }
  const lvlTxt = (L, axis) => (L.score != null ? `score ${r2(L.score)} → **${axis === 'attr' ? ROW_NAME[L.level].toLowerCase() : COL_NAME[L.level].toLowerCase()}**` : `**${axis === 'attr' ? ROW_NAME[L.level].toLowerCase() : COL_NAME[L.level].toLowerCase()}**`);
  function computeGE(v) {
    const rows = v.geUnits;
    if (!Array.isArray(rows) || !rows.length) throw new Error('Add at least one SBU.');
    const units = rows.map((r, i) => ({ name: String(r[0] == null ? '' : r[0]).trim() || 'SBU ' + (i + 1), attr: r[1], str: r[2], revenue: num(r[3]) }));
    const list = geClassify(units);
    const fig = o => geFigure(list, o);
    const frames = [{ caption: 'GE\'s **nine-cell (stop-light) matrix** rates each SBU on two broad factors. Up the side: **market attractiveness** (market size, growth, industry profitability, competitive intensity, pricing trends, risk …). Across: **business strength** (market share, margin, brand image, customer loyalty, cost position, management calibre …), strong on the left. Green means go, yellow caution, red stop.', view: [fig({})] }];
    const shown = [];
    list.forEach(u => {
      frames.push({ caption: `**${u.name}**: market attractiveness ${lvlTxt(u.a, 'attr')}, so it sits in the **${ROW_NAME[u.row]}** row; business strength ${lvlTxt(u.s, 'str')}, so the **${COL_NAME[u.col]}** column.`, view: [fig({ show: shown.slice(), hlRow: u.row })] });
      shown.push(u);
      const Z = ZONE[u.zone];
      frames.push({ caption: `${ROW_NAME[u.row]} attractiveness × ${COL_NAME[u.col].toLowerCase()} strength is a **${Z.name.toLowerCase()}** cell: **${Z.strategy}**. In the Study Material's words, ${Z.why}.${u.row === 'low' && u.col === 'average' ? ' (ICAI\'s RTP for September 2026 called this cell yellow: see the exam note under the results.)' : ''}`, view: [fig({ show: shown.slice(), hlCell: [u.row, u.col] })] });
    });
    const count = z => list.filter(u => u.zone === z).length;
    const zoneTxt = z => `${count(z)} in ${ZONE[z].name.split(' ')[0].toLowerCase()} (${ZONE[z].strategy})`;
    frames.push({ caption: `${list.length === 1 ? 'The SBU is' : `All ${list.length} SBUs are`} placed: ${ZONES.map(zoneTxt).join(', ')}. Unlike BCG, GE weighs many factors: market attractiveness replaces market growth, and competitive strength replaces market share.`, view: [fig({ show: list })] });
    const remark = list.some(u => u.row === 'low' && u.col === 'average') ? ' ' + LOW_AVG : '';
    return {
      frames, sim: { mode: 'ge', list },
      stats: ZONES.map(z => ({ label: `${ZONE[z].name}: ${ZONE[z].strategy}`, value: String(count(z)), hint: ZONE[z].why.replace(/\*\*/g, ''), tone: ZONE[z].color === 'ok' ? 'ok' : ZONE[z].color === 'bad' && count(z) ? 'bad' : '' })),
      table: { head: ['SBU', 'Market attractiveness', 'Business strength', 'Zone', 'Strategy'],
        rows: list.map(u => [u.name, ROW_NAME[u.row] + (u.a.score != null ? ` (${r2(u.a.score)})` : ''), COL_NAME[u.col] + (u.s.score != null ? ` (${r2(u.s.score)})` : ''), ZONE[u.zone].name, u.strategy]) },
      note: `**Conventions.** The nine cells and their colours are those of the Study Material's figure (page 4.31). A level may be typed as a word or as a score from 1 to 5: below 2.33 is low or weak, below 3.67 medium or average, the rest high or strong (the Study Material gives no scale). Bubble size is revenue when it is given.${remark}`
    };
  }

  function compute(v) {
    const r = v.mode === 'ge' ? computeGE(v) : computeBCG(v);
    lastMode = v.mode === 'ge' ? 'ge' : 'bcg';
    return r;
  }

  /* ================================================================ presets and the challenge */
  const TAPRI = [['Chai premix', 420, 34, 18, 6], ['Kulhad cafés', 260, 22, 14, 24], ['Delivery app', 60, 4, 31, 38], ['Samosa factory', 90, 6, 28, 3]];
  const TAPRI_GE = [['Kulhad cafés', 'High', 'Strong', 260], ['Chai premix', 'Medium', 'Strong', 420], ['Delivery app', 'High', 'Weak', 60], ['Cold chain', 'Medium', 'Average', 45], ['Samosa factory', 'Low', 'Average', 90]];
  const presets = [
    { label: 'Tapri\'s four businesses (shares in %)', values: { mode: 'bcg', shareMode: 'pct', units: TAPRI, cutGrowth: 10, cutShare: 1 } },
    { label: 'SM Test Your Knowledge, Descriptive Q2 · Soorya Ltd. in a two-firm industry (data)', values: { mode: 'bcg', shareMode: 'pct', cutGrowth: 10, cutShare: 1,
      units: [['A', 6, 80, 20, 15], ['B', 4, 40, 60, 10], ['C', 2, 60, 40, -20], ['D', 0.5, 5, 95, -10]] } },
    { label: 'Relative shares given as multiples (BrewBucks India)', values: { mode: 'bcg', shareMode: 'rel', cutGrowth: 10, cutShare: 1,
      unitsRel: [['Espresso bars', 310, 2.4, 7], ['Cold brew cans', 45, 0.3, 26], ['Merchandise', 30, 0.2, 2], ['Drive-thrus', 120, 1.3, 19]] } },
    { label: 'Tapri\'s businesses on the GE nine-cell grid', values: { mode: 'ge', geUnits: TAPRI_GE } },
    { label: 'Modelled on RTP January 2025 Q13 (InnovaTech) · AI solutions and legacy software', values: { mode: 'ge', geUnits: [['AI solutions', 'High', 'Strong', 0], ['Legacy software', 'Low', 'Weak', 0]] } },
    { label: 'RTP September 2026 Q14 (data) · EcoBuild: medium strength, low market attractiveness', values: { mode: 'ge', geUnits: [['EcoBuild division', 'Low', 'Average', 0]] } },
    { label: 'Scores from 1 to 5 instead of words (Tapri\'s new ideas)', values: { mode: 'ge', geUnits: [['Tea tourism', '4.4', '1.8', 0], ['Kulhad export', '3.1', '3.9', 0], ['Masala oats', '1.6', '2.6', 0]] } }
  ];

  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const BCG_CHOICES = ['Star', 'Question mark', 'Cash cow', 'Dog'], BCG_STRATS = ['Build', 'Hold', 'Harvest', 'Divest'], GE_CHOICES = ['Invest/Expand', 'Select/Earn', 'Harvest/Divest'];
  const challenge = {
    title: 'Place the SBU',
    gen(r) {
      if (lastMode === 'ge') {
        const nm = ['Alpha', 'Beta', 'Gamma'], useScore = r() < 0.35;
        const geUnits = nm.map(n => {
          if (useScore) { const sc = () => String(Math.round((1.2 + r() * 3.6) * 10) / 10); return [n, sc(), sc(), 0]; }
          return [n, pick(r, ['High', 'Medium', 'Low']), pick(r, ['Strong', 'Average', 'Weak']), 0];
        });
        return { mode: 'ge', geUnits, ask: Math.floor(r() * 3) % 3 };
      }
      const units = ['P', 'Q', 'R', 'S'].map(n => {
        let share, rival, growth, guard = 0;
        do { share = 5 + Math.floor(r() * 50); rival = 5 + Math.floor(r() * Math.max(1, 90 - share)); growth = -8 + Math.floor(r() * 36); }
        while ((Math.abs(share / rival - 1) < 0.12 || growth === 10 || share + rival > 100) && ++guard < 50);
        return [n, 10 + 10 * Math.floor(r() * 30), share, rival, growth];
      });
      return { mode: 'bcg', shareMode: 'pct', units, cutGrowth: 10, cutShare: 1, ask: Math.floor(r() * 4) % 4, askWhat: r() < 0.5 ? 'quad' : 'strategy' };
    },
    prompt(v, res) {
      const u = res.sim.list[v.ask || 0];
      if (res.sim.mode === 'ge') return `SBU **${u.name}** has market attractiveness **${String(u.attr).trim()}** and business strength **${String(u.str).trim()}**${u.a.score != null || u.s.score != null ? ' (scores out of 5)' : ''}. Which strategy does the GE nine-cell matrix give it?`;
      const ask = v.askWhat === 'strategy' ? 'Which post-identification strategy do ICAI\'s answers pair with it?' : 'In which BCG quadrant does it fall?';
      return `SBU **${u.name}** holds ${u.share}% of its market; its largest rival holds ${u.rival}%. The market grows ${pct(u.growth)} a year. Relative share is high from 1× and growth from 10%. ${ask}`;
    },
    solve(res, v) {
      const u = res.sim.list[v.ask || 0];
      if (res.sim.mode === 'ge') return u.strategy;
      return v.askWhat === 'strategy' ? u.strategy : QUAD[u.quad].name;
    },
    kind: 'choice',
    choices: (v, res) => (res && res.sim.mode === 'ge' ? GE_CHOICES : v.askWhat === 'strategy' ? BCG_STRATS : BCG_CHOICES),
    view(res) {
      if (res.sim.mode === 'ge') return [geFigure(res.sim.list, { blank: true })];
      return [bcgFigure(res.sim.list, { scale: bcgScale(res.sim.list, res.sim.cutS, res.sim.cutG), cutS: res.sim.cutS, cutG: res.sim.cutG, blank: true })];
    },
    explain(res, v) {
      const u = res.sim.list[v.ask || 0];
      if (res.sim.mode === 'ge') { const Z = ZONE[u.zone]; return `${u.name}: ${ROW_NAME[u.row].toLowerCase()} market attractiveness and ${COL_NAME[u.col].toLowerCase()} business strength. The ${ROW_NAME[u.row]} × ${COL_NAME[u.col]} cell is ${Z.name.toLowerCase()}: **${Z.strategy}**, because ${Z.why}.`; }
      const Q = QUAD[u.quad];
      return `Relative share = ${u.share} ÷ ${u.rival} = ${times(u.rms)} (${u.highShare ? 'high' : 'low'}); growth ${pct(u.growth)} (${u.highGrowth ? 'high' : 'low'}). So ${u.name} is a **${Q.name}** and the strategy is **${Q.strategy}**. ${Q.why}`;
    }
  };

  const def = {
    id: 'bcg-ge', title: 'Portfolio Matrices Lab',
    blurb: 'Place SBUs on the BCG growth-share matrix and the GE nine-cell grid, and read off the strategy for each.',
    controls: [
      { id: 'mode', type: 'seg', label: 'Matrix', value: 'bcg', options: [['bcg', 'BCG growth-share'], ['ge', 'GE nine-cell']] },
      { id: 'shareMode', type: 'seg', label: 'Market share is given as', short: 'Share given as', value: 'pct', options: [['pct', 'Own and rival %'], ['rel', 'Relative (×)']], show: v => v.mode !== 'ge' },
      { id: 'units', type: 'table', label: 'SBUs (revenue in ₹ crore; shares and growth in %)', short: 'SBUs', max: 8, rows: TAPRI, show: v => v.mode !== 'ge' && v.shareMode !== 'rel',
        cols: [{ id: 'name', label: 'SBU', type: 'text', auto: n => 'SBU ' + (n + 1) }, { id: 'rev', label: 'Revenue', type: 'number', min: 0, max: 1e7, def: 100 },
          { id: 'share', label: 'Share', type: 'number', min: 0, max: 100, def: 10 }, { id: 'rival', label: 'Rival', type: 'number', min: 0, max: 100, def: 20 },
          { id: 'growth', label: 'Growth', type: 'number', min: -100, max: 1000, def: 5 }],
        help: 'Share = the SBU\'s own market share; Rival = the largest rival\'s share (for the leader, the next-largest firm). Growth = the market\'s growth rate a year (negative if it shrinks).' },
      { id: 'unitsRel', type: 'table', label: 'SBUs (revenue in ₹ crore; relative share ×; growth in %)', short: 'SBUs', max: 8, rows: [['Espresso bars', 310, 2.4, 7], ['Cold brew cans', 45, 0.3, 26]], show: v => v.mode !== 'ge' && v.shareMode === 'rel',
        cols: [{ id: 'name', label: 'SBU', type: 'text', auto: n => 'SBU ' + (n + 1) }, { id: 'rev', label: 'Revenue', type: 'number', min: 0, max: 1e7, def: 100 },
          { id: 'rms', label: 'Rel. share', type: 'number', min: 0, max: 100, def: 1 }, { id: 'growth', label: 'Growth', type: 'number', min: -100, max: 1000, def: 5 }] },
      { id: 'cutGrowth', type: 'number', label: 'High market growth from (% a year)', short: 'High growth from', value: 10, min: -50, max: 200, show: v => v.mode !== 'ge' },
      { id: 'cutShare', type: 'number', label: 'High relative share from (×)', short: 'High share from', value: 1, min: 0.1, max: 10, step: 0.1, show: v => v.mode !== 'ge' },
      { id: 'geUnits', type: 'table', label: 'SBUs (attractiveness and strength as words or scores 1–5; revenue in ₹ crore, 0 = same size)', short: 'SBUs', max: 9, rows: TAPRI_GE, show: v => v.mode === 'ge',
        cols: [{ id: 'name', label: 'SBU', type: 'text', auto: n => 'SBU ' + (n + 1) }, { id: 'attr', label: 'Attract.', type: 'text', auto: () => 'Medium' },
          { id: 'str', label: 'Strength', type: 'text', auto: () => 'Average' }, { id: 'rev', label: 'Revenue', type: 'number', min: 0, max: 1e7, def: 0 }],
        help: 'Market attractiveness: High, Medium or Low. Business strength: Strong, Average or Weak. Or type a score from 1 to 5 for either.' }
    ],
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { bcgClassify, geClassify, parseLevel, compute, def, QUAD, ZONE, GE_CELL };
  g.__lab_def_bcg_ge = def;
})(typeof window !== 'undefined' ? window : globalThis);
