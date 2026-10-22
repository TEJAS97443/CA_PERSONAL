/* PassBook — content-map renderer (GA.mapviz).
   Part 1 (pure, Node-tested in tests/mapviz.test.js): squarified treemap, label fitting, longest-path layering, metro lane layout,
   year binning + year x row marks matrix, trend split, the exam rows (examRows: arrows on the share series), the prerequisite lens's
   opening subject (prereqStart), the syllabus hierarchy model, constellation layout.
   Part 2 (DOM): mount(el, {mode:'mini'|'full', ...}) draws the mini constellation / treemap (home hero, home teaser, subject page)
   and the three full lenses of /map (syllabus treemap, prerequisite metro map, exam matrix). Every number comes from GA.data.D.
   Audit 2026-10-16 (WP5): the prerequisite lens opens on the learner's subject, phones get its summary first and levels folded after 3
   (P2-11); year bars and trend arrows read share of the paper (P2-13); 'Level', not 'Step' (P2-12); lab descriptions as text (P1-55);
   radio groups are one tab stop (P3-15); per-series tints validated for ΔE (P2-06); unlabelled subject-page leaves open their topic (P2-07). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  /* ================================================================== small helpers */
  const sum = a => a.reduce((s, x) => s + x, 0);
  const mean = a => (a.length ? sum(a) / a.length : 0);
  const uniq = a => Array.from(new Set(a));
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const r1 = x => Math.round(x * 10) / 10;
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC[c]);
  const nf = n => Number(n).toLocaleString('en-US');
  const fx = (x, d) => { const k = 10 ** (d == null ? 1 : d); return String(Math.round(x * k) / k); };
  const median = a => { const s = a.slice().sort((x, y) => x - y), m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : null; };
  function rng(seed) { let a = seed >>> 0 || 1; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* ================================================================== 1. squarified treemap (Bruls, Huizing & van Wijk)
     values: numbers (any order); returns one rect {x,y,w,h} per input, same order. Zero / negative values get a zero-size rect.
     The rects tile `rect` exactly (the last row absorbs float drift). */
  function squarify(values, rect) {
    const out = values.map(() => ({ x: rect.x, y: rect.y, w: 0, h: 0 }));
    const idx = values.map((v, i) => i).filter(i => values[i] > 0).sort((a, b) => values[b] - values[a] || a - b);
    const total = sum(idx.map(i => values[i]));
    if (!total || !(rect.w > 0) || !(rect.h > 0)) return out;
    let { x, y, w, h } = rect;
    const k = (w * h) / total, area = i => values[i] * k;
    const worst = (row, side) => {
      let s = 0, mx = 0, mn = Infinity;
      row.forEach(i => { const a = area(i); s += a; if (a > mx) mx = a; if (a < mn) mn = a; });
      const s2 = s * s, q = side * side;
      return Math.max((q * mx) / s2, s2 / (q * mn));
    };
    const lay = (row, last) => {
      const s = sum(row.map(area));
      if (w >= h) {
        const t = last ? w : s / h; let yy = y;
        row.forEach((i, j) => { const hh = j === row.length - 1 ? y + h - yy : area(i) / t; out[i] = { x, y: yy, w: t, h: hh }; yy += hh; });
        x += t; w -= t;
      } else {
        const t = last ? h : s / w; let xx = x;
        row.forEach((i, j) => { const ww = j === row.length - 1 ? x + w - xx : area(i) / t; out[i] = { x: xx, y, w: ww, h: t }; xx += ww; });
        y += t; h -= t;
      }
    };
    let row = [], i = 0;
    while (i < idx.length) {
      const side = Math.min(w, h), cand = row.concat(idx[i]);
      if (!row.length || worst(cand, side) <= worst(row, side)) { row = cand; i++; }
      else { lay(row, false); row = []; }
    }
    if (row.length) lay(row, true);
    return out;
  }

  /* ================================================================== 2. label fitting (measure first, never clip)
     Word wrap into the box; returns {lines, full} or null when not even `minChars` fit on one line. Widths come from o.measure(text) -> px
     when given (the DOM passes a canvas measurer for the real font), otherwise from o.charW per character.
     Lines are balanced ("Programming / in C", not "Programming in / C"). A word is never cut: a word wider than the box means no label.
     When the text needs more lines than fit, the last kept line ends in an ellipsis at a word boundary (trailing "and", "of"... dropped). */
  const STOP = /^(and|or|of|the|with|in|for|to|vs\.?|a|an|on|by|&)$/i;
  function fitLabel(text, w, h, o) {
    o = o || {};
    const cw = o.charW || 6.6, lh = o.lineH || 15, px = o.padX == null ? 8 : o.padX, py = o.padY == null ? 6 : o.padY, minC = o.minChars || 4;
    const mw = o.measure || (s => s.length * cw), W = w - 2 * px, maxL = Math.min(o.maxLines || 3, Math.floor((h - 2 * py) / lh));
    if (W < minC * (o.measure ? mw('n') : cw) - 1e-9 || maxL < 1) return null;
    /* tokens break after spaces and after hyphens / en dashes ("First-Come-First-Served" can wrap), never inside a word */
    const toks = [];
    String(text).split(/\s+/).filter(Boolean).forEach((wd, i) => {
      if (wd === '&' && toks.length && mw(toks[toks.length - 1].t + ' &') <= W) { toks[toks.length - 1].t += ' &'; return; }   // a line does not start with "&"
      wd.split(/(?<=[-–])/).forEach((p, j) => toks.push({ t: p, sp: i > 0 && j === 0 }));
    });
    if (!toks.length) return null;
    const sw = mw(' '), tw = toks.map(k => mw(k.t));
    if (tw.some(x => x > W + 1e-9)) return null;                      // no label beats a garbled one
    const wrap = lim => {
      const L = []; let cur = null;
      toks.forEach((k, i) => { const add = (k.sp ? sw : 0) + tw[i]; if (cur && cur.w + add <= lim + 1e-9) { cur.s += (k.sp ? ' ' : '') + k.t; cur.w += add; cur.b = i; } else { cur = { s: k.t, w: tw[i], a: i, b: i }; L.push(cur); } });
      return L;
    };
    let L = wrap(W);
    if (L.length <= maxL) {
      if (L.length > 1 && o.balance !== false) {                        // narrowest width that keeps the same number of lines
        let lo = Math.max(...tw), hi = W;
        for (let k = 0; k < 14 && hi - lo > 0.25; k++) { const m = (lo + hi) / 2; if (wrap(m).length <= L.length) hi = m; else lo = m; }
        L = wrap(hi);
      }
      return { lines: L.map(x => x.s), full: true };
    }
    /* too many lines: keep the first maxL, drop words from the end until "…" fits and the line does not end in a connector */
    const ell = mw('…'), keep = L.slice(0, maxL).map(x => ({ a: x.a, b: x.b }));
    const lineOf = (a, b) => { let s = '', wd = 0; for (let i = a; i <= b; i++) { s += (i > a && toks[i].sp ? ' ' : '') + toks[i].t; wd += (i > a && toks[i].sp ? sw : 0) + tw[i]; } return { s, wd }; };
    const bad = i => STOP.test(toks[i].t.replace(/[,;:·]+$/, '')) || /[-–]$/.test(toks[i].t);    // a connector, or half of "First-Come"
    for (;;) {
      const ln = keep[keep.length - 1];
      if (ln.b < ln.a) { keep.pop(); if (!keep.length) return null; continue; }
      if (lineOf(ln.a, ln.b).wd + ell <= W + 1e-9 && !bad(ln.b)) break;
      ln.b--;
    }
    const res = keep.map(x => lineOf(x.a, x.b).s);
    res[res.length - 1] = res[res.length - 1].replace(/[\s,;:·–&-]+$/, '') + '…';
    if (res.join(' ').length < minC + 1) return null;
    return { lines: res, full: false };
  }
  /** shorter forms of a long name, longest first, each a whole-word prefix: "(…)" dropped, the head before ":" / " – ",
      the first part of "A & B" / "A and B"; a cut list ("Bubble, selection and insertion sort") keeps an ellipsis: "Bubble, selection…" */
  function shortForms(name) {
    const s = String(name == null ? '' : name).replace(/\s+/g, ' ').trim(), out = [];
    const tidy = t => { t = t.replace(/[\s,;:·–—&-]+$/, '').trim(); let p; do { p = t; t = t.replace(/\s+(and|or|of|the|with|in|for|to|vs\.?|a|an|on|by)$/i, '').replace(/[\s,;:·–—&-]+$/, '').trim(); } while (t !== p); return t; };
    const add = (t, more) => { t = tidy(t); if (t.length < 3 || t === s) return; if (more) t += '…'; if (t !== s && !out.includes(t)) out.push(t); };
    const np = s.replace(/\s*\([^)]*\)/g, '').trim();
    add(np);
    [/:\s/, /\s[–—]\s/].forEach(re => { const m = np.split(re); if (m.length > 1) add(m[0]); });
    const head = t => !/:\s|\s[–—]\s/.test(t);                        // cuts that keep a "Head: ..." are worse than the head itself
    const amp = np.split(/\s(?:&|and|vs\.?|with)\s/i);
    if (amp.length > 1 && head(amp[0])) add(amp[0], /,/.test(amp[0]));
    const com = np.split(/,\s/);
    if (com.length > 1 && head(com[0]) && com[0].split(' ').length >= 2) add(com[0], true);
    return out.sort((a, b) => b.length - a.length);
  }
  /** a compact name for small spaces: common abbreviations first (Mathematics -> Maths, Organization -> Org., Data Structures -> DS),
      then the part before " & " when still longer than `max` characters */
  const ABBR = [[/\bMathematics\b/g, 'Maths'], [/\bStatistics\b/g, 'Stats'], [/\bOrgani[sz]ation\b/g, 'Org.'], [/\bArchitecture\b/g, 'Arch.'], [/\bData Structures\b/g, 'DS'],
    [/\bManagement\b/g, 'Mgmt'], [/\bAccounting\b/g, 'Acctg']];       // 'Cost and Mgmt Acctg', 'Financial Mgmt', 'Strategic Mgmt'
  function shortName(name, max) {
    max = max || 19;
    let s = String(name == null ? '' : name).replace(/\s*\([^)]*\)/g, '').trim();
    if (s.length <= max) return s;
    ABBR.forEach(([re, t]) => (s = s.replace(re, t)));
    if (s.length > max && / & /.test(s)) s = s.split(' & ')[0];
    return s;
  }
  /** the best label for a box: the full name, else the longest short form that fits whole, else a word-boundary ellipsis
      that keeps at least two words and half the name, else null (the tooltip and aria-label still carry the full name) */
  function labelFor(name, w, h, o) {
    o = o || {};
    const cands = [name].concat(shortForms(name), o.alts || []);
    for (const c of cands) { const f = fitLabel(c, w, h, o); if (f && f.full) return { lines: f.lines, text: c, full: c === name }; }
    if (o.ellipsis === false) return null;
    const f = fitLabel(name, w, h, o);
    if (f) { const kept = f.lines.join(' ').replace(/…$/, ''); if (kept.split(/\s+/).length >= 2 && kept.length >= 0.5 * String(name).length) return { lines: f.lines, text: name, full: false }; }
    return null;
  }

  /* ================================================================== 3. graphs: layering, reachability
     edges are {from, to} meaning `from` is a prerequisite of `to`. Longest-path layering (level 0 = no prerequisite in the set);
     cycle-safe: an edge that closes a cycle is ignored, so a bad `needs` list can never hang the page. */
  function index(ids, edges) {
    const set = new Set(ids), preds = {}, succs = {};
    ids.forEach(id => { preds[id] = []; succs[id] = []; });
    edges.forEach(e => { if (set.has(e.from) && set.has(e.to) && e.from !== e.to && !preds[e.to].includes(e.from)) { preds[e.to].push(e.from); succs[e.from].push(e.to); } });
    return { preds, succs };
  }
  function layer(ids, edges) {
    const { preds, succs } = index(ids, edges), level = {}, state = {};
    const visit = id => {
      if (state[id] === 2) return level[id];
      if (state[id] === 1) return -1;                     // back edge: part of a cycle, ignore it
      state[id] = 1; let m = 0;
      preds[id].forEach(p => { const lp = visit(p); if (lp >= 0) m = Math.max(m, lp + 1); });
      state[id] = 2; level[id] = m; return m;
    };
    ids.forEach(visit);
    return { level, levels: ids.length ? Math.max(...ids.map(id => level[id])) + 1 : 0, preds, succs };
  }
  function reach(adj, id) { const seen = new Set(), st = [id]; while (st.length) { const x = st.pop(); (adj[x] || []).forEach(y => { if (!seen.has(y)) { seen.add(y); st.push(y); } }); } seen.delete(id); return seen; }
  const ancestors = (G, id) => reach(G.preds, id);
  const descendants = (G, id) => reach(G.succs, id);
  /** a valid learning order: by level, then by `rank` (syllabus order) */
  function topoOrder(ids, edges, rank) { const L = layer(ids, edges); return ids.slice().sort((a, b) => L.level[a] - L.level[b] || (rank ? rank(a) - rank(b) : 0) || (a < b ? -1 : 1)); }
  /** longest chain (as an id list) in a DAG */
  function longestChain(ids, edges) {
    const L = layer(ids, edges); if (!ids.length) return [];
    let end = ids[0]; ids.forEach(id => { if (L.level[id] > L.level[end]) end = id; });
    const chain = [end];
    while (L.level[chain[0]] > 0) { const p = L.preds[chain[0]].find(x => L.level[x] === L.level[chain[0]] - 1); if (!p) break; chain.unshift(p); }
    return chain;
  }

  /* ================================================================== 4. metro layout: columns = levels, lanes = topics (or subjects)
     nodes [{id, lane, rank, level?}] (a preset level overrides the computed one); options {lanes, colW, rowH, padL, padT, padR, padB, laneGap}.
     Inside a lane a station prefers the slot of its same-lane prerequisite, so chains run as straight lines. */
  function metroLayout(nodes, edges, o) {
    o = Object.assign({ colW: 160, rowH: 44, padL: 150, padT: 24, padR: 180, padB: 24, laneGap: 14 }, o || {});
    const ids = nodes.map(n => n.id), L = layer(ids, edges), byId = {};
    nodes.forEach(n => { byId[n.id] = n; if (n.level != null) L.level[n.id] = n.level; });
    const levels = ids.length ? Math.max(...ids.map(id => L.level[id])) + 1 : 0;
    const lanes = (o.lanes || uniq(nodes.map(n => n.lane))).filter(k => nodes.some(n => n.lane === k));
    const groups = {}; lanes.forEach(k => (groups[k] = {}));
    nodes.forEach(n => { const lv = L.level[n.id]; (groups[n.lane][lv] = groups[n.lane][lv] || []).push(n.id); });
    const slot = {}, laneOut = [], pos = {};
    let y = o.padT;
    lanes.forEach(k => {
      const cap = Math.max(1, ...Object.values(groups[k]).map(a => a.length));
      if (o.align === 'center') {
        /* dense overview: columns centred in the lane, ordered by the barycentre of their neighbours (forward, backward, forward) */
        const bary = ids2 => { const s = ids2.filter(x => slot[x] != null && byId[x].lane === k).map(x => slot[x]); return s.length ? sum(s) / s.length : null; };
        const pass = (lv, nb) => {
          const grp = (groups[k][lv] || []).slice(); if (!grp.length) return;
          const key = {}; grp.forEach(id => { const b = bary(nb(id)); key[id] = b != null ? b : slot[id] != null ? slot[id] : 1e6 + byId[id].rank; });
          grp.sort((a, b) => key[a] - key[b] || byId[a].rank - byId[b].rank);
          const off = Math.floor((cap - grp.length) / 2); grp.forEach((id, i) => (slot[id] = off + i));
        };
        for (let lv = 0; lv < levels; lv++) pass(lv, id => L.preds[id]);
        for (let lv = levels - 2; lv >= 0; lv--) pass(lv, id => L.succs[id]);
        for (let lv = 1; lv < levels; lv++) pass(lv, id => L.preds[id]);
      }
      else for (let lv = 0; lv < levels; lv++) {
        const grp = (groups[k][lv] || []).slice(); if (!grp.length) continue;
        const pref = {};
        grp.forEach(id => { const ps = L.preds[id].filter(p => byId[p].lane === k && slot[p] != null).map(p => slot[p]); pref[id] = ps.length ? Math.round(median(ps)) : null; });
        grp.sort((a, b) => (pref[a] == null) - (pref[b] == null) || (pref[a] || 0) - (pref[b] || 0) || byId[a].rank - byId[b].rank);
        const used = new Set();
        grp.forEach(id => {
          const want = pref[id] == null ? 0 : clamp(pref[id], 0, cap - 1);
          let best = -1;
          for (let d = 0; d < cap && best < 0; d++) { if (want + d < cap && !used.has(want + d)) best = want + d; else if (want - d >= 0 && !used.has(want - d)) best = want - d; }
          used.add(best); slot[id] = best;
        });
      }
      laneOut.push({ key: k, y, h: cap * o.rowH, rows: cap, n: nodes.filter(n => n.lane === k).length });
      nodes.filter(n => n.lane === k).forEach(n => (pos[n.id] = { x: o.padL + L.level[n.id] * o.colW, y: y + slot[n.id] * o.rowH + (o.stationY == null ? o.rowH / 2 : o.stationY), level: L.level[n.id], slot: slot[n.id] }));
      y += cap * o.rowH + o.laneGap;
    });
    return { pos, lanes: laneOut, levels, width: o.padL + Math.max(0, levels - 1) * o.colW + o.padR, height: (laneOut.length ? y - o.laneGap : o.padT) + o.padB, preds: L.preds, succs: L.succs };
  }

  /* ================================================================== 5. years: binning, matrix, trend */
  /** split ascending years into bins of `size`, aligned so the most recent bin is full (the oldest may be shorter).
      With a range {from, to} no bin straddles its edges (audit P0-11, "partial edge bins"): the years inside the range are binned with their most
      recent bin full, the years before it with the bin next to the range full, the years after it with the bin next to the range full, so a short
      bin only ever sits at an edge (of the range or of the axis) and every bin is wholly inside or outside the range. */
  function binYears(years, size, range) {
    const ys = years.slice().sort((a, b) => a - b); if (!(size > 1)) return ys.map(y => [y]);
    const back = list => { const bins = []; for (let i = list.length; i > 0; i -= size) bins.unshift(list.slice(Math.max(0, i - size), i)); return bins; };
    const fwd = list => { const bins = []; for (let i = 0; i < list.length; i += size) bins.push(list.slice(i, i + size)); return bins; };
    if (!range || (range.from == null && range.to == null)) return back(ys);
    const lo = range.from == null ? -Infinity : range.from, hi = range.to == null ? Infinity : range.to;
    return back(ys.filter(y => y < lo)).concat(back(ys.filter(y => y >= lo && y <= hi)), fwd(ys.filter(y => y > hi)));
  }
  /** did this paper have the section a subject's questions come from? General Aptitude exists from 2010 (paper.ga = its GA question count),
      every paper has the CS section. The exam map's yearMatrix `has` (P0-11: GA = 15 marks in every paper that had it). */
  const hasSection = (subjectId, paper) => subjectId !== 'ga' || !!(paper && paper.ga);
  /** first half vs second half of a series (odd length: the middle point is left out) */
  function trendSplit(values) {
    const n = values.length, h = n >> 1;
    if (h < 1) return { first: values[0] || 0, second: values[0] || 0, delta: 0 };
    const first = mean(values.slice(0, h)), second = mean(values.slice(n - h));
    return { first, second, delta: second - first };
  }
  /** year x row marks matrix. rows: [{key, ...}] ; rowKey(q) -> row key.
      metric 'marks' (default): cell = marks per paper of that year (or bin) - multi-session years (2014: 3 papers) are averaged, never summed;
      metric 'share': cell = % of all marks of those papers (fair across the 150-mark 2007-08 papers and the 100-mark papers since).
      opts {bin, from, to, metric,
            has(row, paper) -> false when that paper had no section for the row (no General Aptitude before 2010): the paper then leaves the row's
              denominators, so a GA cell is GA marks over the papers that had a GA section;
            na(row, col) -> true when a year column cannot exist for the row (the older form of `has`, judged per year)}.
      Audit P0-11: every row summary (marks, n, avg, asked, span, last, trend, series) and annotate() come from the per-year matrix, so they never
      change with the bin size; binning only groups the per-year cells into the drawn `cols` (bins never straddle the range, see binYears). A binned
      cell sums its years that exist for the row; `part` is the share of its years that do not (GA 2007-10 at bin 4: 0.75), `naYears` lists them.
      Returns {cols (drawn), ycols (one per year), rows: [{...row, cells (per col), ycells (per year), marks, n, avg, asked, span, last, trend, series}],
      max (of the drawn cells), from, to, years, bin, metric}. */
  function yearMatrix(questions, papers, rows, rowKey, o) {
    o = o || {};
    const years = uniq(papers.map(p => p.year)).sort((a, b) => a - b), bin = Math.max(1, Math.floor(o.bin || 1));
    const from = o.from || years[0], to = o.to || years[years.length - 1], share = o.metric === 'share';
    const byYear = {}; papers.forEach(p => (byYear[p.year] = byYear[p.year] || []).push(p));
    const colOf = b => { const list = [].concat(...b.map(y => byYear[y] || []));
      return { key: b.length > 1 ? b[0] + '-' + b[b.length - 1] : String(b[0]), from: b[0], to: b[b.length - 1], years: b, papers: list.length, paperMarks: sum(list.map(p => p.marks || 0)), list }; };
    const ycols = years.map(y => colOf([y])), cols = bin > 1 ? binYears(years, bin, { from, to }).map(colOf) : ycols;
    ycols.forEach(c => (c.inRange = c.from >= from && c.to <= to));
    cols.forEach(c => (c.inRange = c.to >= from && c.from <= to));
    const ri = {}, yi = {}; rows.forEach((r, i) => (ri[r.key] = i)); years.forEach((y, j) => (yi[y] = j));
    const QY = rows.map(() => years.map(() => ({ marks: 0, n: 0 }))), QP = rows.map(() => ({}));   // row x year marks; row -> paper id -> questions
    questions.forEach(q => { const r = ri[rowKey(q)], j = yi[q.year]; if (r == null || j == null) return; QY[r][j].marks += q.marks; QY[r][j].n++; if (q.paper != null) QP[r][q.paper] = (QP[r][q.paper] || 0) + 1; });
    const cellOf = (marks, n, papersN, paperMarks, na) => ({ marks, n, v: na ? null : share ? (paperMarks ? (100 * marks) / paperMarks : 0) : papersN ? marks / papersN : 0, na, papers: na ? 0 : papersN, paperMarks: na ? 0 : paperMarks });
    let max = 0;
    const out = rows.map((r, i) => {
      /* one cell per year: the papers of that year that had the row's section (a cell with questions on the row is never n/a) */
      const ycells = ycols.map((c, j) => {
        const { marks, n } = QY[i][j], yearNA = !o.has && !!(o.na && o.na(r, c)) && !n;
        let on = yearNA ? [] : c.list.filter(p => !o.has || o.has(r, p) || QP[i][p.id] > 0);
        if (!on.length && n) on = c.list;
        return Object.assign(cellOf(marks, n, on.length, sum(on.map(p => p.marks || 0)), !on.length), { year: c.from });
      });
      /* the drawn cells: each bin sums its years that exist for the row */
      const cells = bin > 1 ? cols.map(c => {
        const ys = c.years.map(y => ycells[yi[y]]), live = ys.filter(x => !x.na), na = !live.length;
        const cell = cellOf(sum(ys.map(x => x.marks)), sum(ys.map(x => x.n)), sum(live.map(x => x.papers)), sum(live.map(x => x.paperMarks)), na);
        cell.part = na ? 0 : (ys.length - live.length) / ys.length; cell.naYears = na ? [] : ys.filter(x => x.na).map(x => x.year);
        return cell;
      }) : ycells.map(x => Object.assign({}, x, { part: 0, naYears: [] }));
      cells.forEach(x => { if (x.v > max) max = x.v; });
      /* the row's numbers: per year, inside the range, years that exist for the row */
      const inR = ycells.filter((x, j) => ycols[j].inRange && !x.na), pIn = sum(inR.map(x => x.papers)), mIn = sum(inR.map(x => x.marks)), pmIn = sum(inR.map(x => x.paperMarks));
      const askedYears = ycols.filter((c, j) => c.inRange && ycells[j].n > 0);
      return Object.assign({}, r, { cells, ycells, marks: mIn, n: sum(inR.map(x => x.n)), avg: share ? (pmIn ? (100 * mIn) / pmIn : 0) : pIn ? mIn / pIn : 0, asked: askedYears.length, span: inR.length,
        last: askedYears.length ? askedYears[askedYears.length - 1].to : null, trend: trendSplit(inR.map(x => x.v)), series: inR.map(x => x.v), trendYears: inR.map(x => x.year) });
    });
    return { cols, ycols, rows: out, max, from, to, years, bin, metric: share ? 'share' : 'marks' };
  }
  /** computed, data-backed annotations for a matrix (each with the row key so the UI can point at it).
      up/down = biggest change between the first and second half of the range; every = asked in every year of the range;
      quiet = the heaviest row not asked in the last 4+ years of the range. Always judged per year (mx.ycols), so a binned matrix
      gives exactly the notes of the unbinned one (audit P0-11). */
  function annotate(mx, o) {
    o = o || {};
    const minDelta = o.minDelta == null ? (mx.metric === 'share' ? 0.5 : 0.5) : o.minDelta, rows = mx.rows.filter(r => r.n > 0), out = [];
    const inCols = (mx.ycols || mx.cols).filter(c => c.inRange), nIn = inCols.length;
    const h = nIn >> 1, halves = h ? [[inCols[0].from, inCols[h - 1].to], [inCols[nIn - h].from, inCols[nIn - 1].to]] : null;
    /* the halves a row's trend really averages (trendSplit over its own years in the range): a General Aptitude row starts in 2010, so its
       note reads '2010–2017 vs 2019–2026', never the range's '2007–2016 vs 2017–2026' (the labels always match the values) */
    const halvesOf = r => { const ys = r.trendYears, n = ys ? ys.length : 0, k = n >> 1; return k ? [[ys[0], ys[k - 1]], [ys[n - k], ys[n - 1]]] : halves; };
    if (nIn >= 4) {
      const ok = rows.filter(r => r.span >= 4);
      const up = ok.slice().sort((a, b) => b.trend.delta - a.trend.delta)[0], dn = ok.slice().sort((a, b) => a.trend.delta - b.trend.delta)[0];
      if (up && up.trend.delta >= minDelta) out.push({ kind: 'up', key: up.key, row: up, value: up.trend.delta, halves: halvesOf(up) });
      if (dn && dn.trend.delta <= -minDelta) out.push({ kind: 'down', key: dn.key, row: dn, value: dn.trend.delta, halves: halvesOf(dn) });
    }
    const every = rows.filter(r => r.asked === r.span && r.span === nIn && nIn > 1);
    if (every.length) out.push({ kind: 'every', keys: every.map(r => r.key), rows: every, value: every.length, of: mx.rows.length });
    if (nIn >= 6) {
      const lastTo = inCols[nIn - 1].to, used = new Set(out.map(a => a.key));
      const quiet = rows.filter(r => r.last != null && r.n >= 3 && lastTo - r.last >= 4).sort((a, b) => b.marks - a.marks)[0];
      if (quiet && used.has(quiet.key)) out.splice(out.findIndex(a => a.key === quiet.key), 1);   // "gone quiet" says more than "falling to 0"
      if (quiet) out.push({ kind: 'quiet', key: quiet.key, row: quiet, value: quiet.last });
    }
    return out;
  }

  /** the exam map's rows (P0-11, P2-13): the drawn matrix in the chosen metric and bin, each row carrying the share series' trend (shTrend,
      shSeries) for its arrow and sparkline, the notes from the unbinned share matrix, rows sorted by syllabus order, average or share rise */
  function examRows(questions, papers, def, key, o) {
    const base = { from: o.from, to: o.to, has: o.has, na: o.na };
    const mx = yearMatrix(questions, papers, def, key, Object.assign({ bin: o.bin || 1, metric: o.metric }, base));
    const sh = yearMatrix(questions, papers, def, key, Object.assign({ bin: 1, metric: 'share' }, base));
    const shBy = {}; sh.rows.forEach(r => (shBy[r.key] = r));
    const rows = mx.rows.map(r => Object.assign(r, { shTrend: shBy[r.key].trend, shSeries: shBy[r.key].series }));
    if (o.sort === 'marks') rows.sort((a, b) => b.avg - a.avg); else if (o.sort === 'trend') rows.sort((a, b) => b.shTrend.delta - a.shTrend.delta);
    return { mx, sh, rows, ann: annotate(sh, { minDelta: 0.5 }) };
  }

  /* ================================================================== 5b. edge routing for the metro map + spatial keyboard navigation
     Stations sit near the top of a row with their label below; an edge runs at station height and changes rows in a gutter
     (the free strip right of a label), detouring through the corridor above a row when a straight run would cross a station. */
  function route(a, b, o) {
    const r = o.r || 6, x1 = a.x + r, x2 = b.x - r, span = b.level - a.level, gut = Math.max(18, o.colW - o.labelW - 14);
    const gx = lv => a.x + (lv - a.level) * o.colW + o.labelW + 6;
    const S = (xs, ys, xe, ye) => { const m = (xe - xs) / 2; return `C${r1(xs + m)},${r1(ys)} ${r1(xe - m)},${r1(ye)} ${r1(xe)},${r1(ye)}`; };
    const blocked = y => span > 1 && o.blocked && o.blocked(y, a.level + 1, b.level - 1);
    if (span < 1) return `M${r1(x1)},${r1(a.y)} C${r1(x1 + 40)},${r1(a.y)} ${r1(x2 - 40)},${r1(b.y)} ${r1(x2)},${r1(b.y)}`;
    if (Math.abs(a.y - b.y) < 0.5) {
      if (!blocked(a.y)) return `M${r1(x1)},${r1(a.y)}H${r1(x2)}`;
      const yb = a.y - (o.corridor || 10), g0 = gx(a.level), g1 = gx(b.level - 1);
      return `M${r1(x1)},${r1(a.y)}H${r1(g0)} ${S(g0, a.y, g0 + gut, yb)} H${r1(g1)} ${S(g1, yb, Math.min(x2, g1 + gut), b.y)} H${r1(x2)}`;
    }
    if (!blocked(a.y)) { const g1 = gx(b.level - 1); return `M${r1(x1)},${r1(a.y)}H${r1(g1)} ${S(g1, a.y, Math.min(x2, g1 + gut), b.y)} H${r1(x2)}`; }
    if (!blocked(b.y)) { const g0 = gx(a.level); return `M${r1(x1)},${r1(a.y)}H${r1(g0)} ${S(g0, a.y, g0 + gut, b.y)} H${r1(x2)}`; }
    const yc = b.y - (o.corridor || 10), g0 = gx(a.level), g1 = gx(b.level - 1);            // both rows busy: run in the free corridor above the target row
    return `M${r1(x1)},${r1(a.y)}H${r1(g0)} ${S(g0, a.y, g0 + gut, yc)} H${r1(g1)} ${S(g1, yc, Math.min(x2, g1 + gut), b.y)} H${r1(x2)}`;
  }
  /** index of the nearest rect in a direction ('left'|'right'|'up'|'down') from rects[i], or -1 */
  function spatial(rects, i, dir) {
    const a = rects[i]; if (!a) return -1;
    const ax = a.x + a.w / 2, ay = a.y + a.h / 2; let best = -1, bs = Infinity;
    rects.forEach((b, j) => {
      if (j === i || !b) return;
      const dx = b.x + b.w / 2 - ax, dy = b.y + b.h / 2 - ay;
      const along = dir === 'right' ? dx : dir === 'left' ? -dx : dir === 'down' ? dy : -dy, across = dir === 'right' || dir === 'left' ? Math.abs(dy) : Math.abs(dx);
      if (along <= 1) return;
      const s = along + across * 2; if (s < bs) { bs = s; best = j; }
    });
    return best;
  }

  /* ================================================================== 6. the syllabus model (subject > topic > sub-topic) with every count from D */
  const SIZES = { marks: 'marks', pyqs: 'questions', subs: 'sub-topics', lessons: 'lessons', minutes: 'minutes' };
  /** series colour of a subject (docs/FRONTEND_V3_SPEC.md: series colours via the --viz-* tokens, no rainbow chrome): eight tokens, one per
      subject family, so related subjects share a colour and the map never needs more than eight. Returns the token letter 'a'..'h'. */
  const SERIES = { cma: 'a', aud: 'b', fm: 'c', sm: 'e' };            // one colour per ICAI paper (Paper 6A and 6B differ: two subjects)
  const SERIES_NAME = { a: 'Paper 4 · Cost and Management Accounting', b: 'Paper 5 · Auditing and Ethics', c: 'Paper 6A · Financial Management', e: 'Paper 6B · Strategic Management' };
  function seriesOf(subjectId) { return SERIES[subjectId] || 'a'; }
  /** the inline style that carries a node's subject: --h (hue, kept for old CSS) and --sc (its --viz-* series colour) */
  const hv = x => `--h:${x && x.hue != null ? x.hue : 250};--sc:var(--viz-${(x && x.sc) || 'a'})`;
  const memo = new WeakMap();
  function model(D) {
    if (memo.has(D)) return memo.get(D);
    const nodes = {}, papersN = D.papers.length;
    let rank = 0;
    const mk = (id, kind, name, extra) => (nodes[id] = Object.assign({ id, kind, name, children: [], marks: 0, pyqs: 0, papers: new Set(), byYear: {}, lessons: 0, minutes: 0, lessonIds: [], qids: [], subs: 0, rank: rank++ }, extra));
    const root = mk('all', 'root', 'All papers', { short: 'All', hue: 250, sc: 'a', parent: null, paperMarks: D.subjects.reduce((a, s) => a + (+s.marks || 0), 0) });
    D.subjects.forEach(s => {
      const sn = mk(s.id, 'subject', s.name, { short: s.short, hue: s.hue, sc: seriesOf(s.id), area: s.area, official: s.official, parent: 'all', subject: s.id, paper: s.paper || '', paperMarks: +s.marks || 0 });
      root.children.push(sn);
      s.topics.forEach(t => {
        const tn = mk(t.id, 'topic', t.name, { hue: s.hue, sc: seriesOf(s.id), parent: s.id, subject: s.id, status: t.status, syl: t.syl });
        sn.children.push(tn);
        t.subtopics.forEach(st => tn.children.push(mk(st.id, 'sub', st.name, { hue: s.hue, sc: seriesOf(s.id), parent: t.id, subject: s.id, topic: t.id, tier: st.tier, status: st.status })));
      });
    });
    const up = (n, f) => { for (let x = n; x; x = x.parent ? nodes[x.parent] : null) f(x); };
    Object.values(nodes).forEach(n => { if (n.kind === 'sub') up(n, x => { x.subs++; }); });     // sub-topics of the syllabus: the size that needs no question bank
    D.questions.forEach(q => {
      let n = (q.subtopic && nodes[q.subtopic]) || (q.topic && nodes[q.topic]) || nodes[q.subject];
      if (!n) return;
      if (n.kind === 'topic') {                                   // tagged to a topic only: a small "rest" leaf keeps topic = sum of its leaves
        const rid = n.id + '~rest';
        if (!nodes[rid]) n.children.push(mk(rid, 'rest', 'Not tagged to a sub-topic', { hue: n.hue, sc: n.sc, parent: n.id, subject: n.subject, topic: n.id }));
        n = nodes[rid];
      }
      up(n, x => { x.marks += q.marks; x.pyqs++; x.papers.add(q.paper); x.byYear[q.year] = (x.byYear[q.year] || 0) + q.marks; x.qids.push(q.id); });
    });
    D.lessons.forEach(l => {
      const n = nodes[l.id] && nodes[l.id].kind === 'sub' ? nodes[l.id] : nodes[l.topic];
      if (!n) return;
      if (n.kind === 'sub') n.lesson = l.id;
      up(n, x => { x.lessons++; x.minutes += l.minutes || 0; x.lessonIds.push(l.id); });
    });
    const labsBy = {};
    (D.labs || []).filter(l => l.status !== 'planned').forEach(l => { (l.topics || []).concat(l.subject).forEach(k => (labsBy[k] = labsBy[k] || []).push(l)); });
    const lessonIds = D.lessons.map(l => l.id), edges = [];
    D.lessons.forEach(l => uniq(l.needs || []).forEach(n => { if (D.lessonById[n] && n !== l.id) edges.push({ from: n, to: l.id }); }));
    const G = index(lessonIds, edges);
    /* per-paper averages divide by the papers that had the subject's section (General Aptitude exists from 2010), as GA.insights does */
    const gaPapers = new Set(D.questions.filter(q => q.section === 'GA').map(q => q.paper)).size;
    const papersFor = n => (n.subject === 'ga' ? gaPapers : papersN);
    const M = { D, nodes, root, papersN, gaPapers, labsBy, edges, G, years: uniq(D.papers.map(p => p.year)).sort((a, b) => a - b),
      papersFor, perPaper: n => (papersFor(n) ? n.marks / papersFor(n) : 0), bank: D.questions.length > 0,
      value: (n, size) => (size === 'pyqs' ? n.pyqs : size === 'lessons' ? n.lessons : size === 'minutes' ? n.minutes : size === 'subs' ? n.subs : n.marks),
      rankOf: id => (nodes[id] ? nodes[id].rank : 1e6), path: id => { const p = []; for (let x = nodes[id]; x; x = x.parent ? nodes[x.parent] : null) p.unshift(x); return p; } };
    memo.set(D, M);
    return M;
  }
  /** links between top-level items (subjects, or the topics of one subject) aggregated from lesson `needs` */
  function linksOf(M, scope) {
    const key = id => { const l = M.D.lessonById[id]; return scope ? (l.subject === scope ? l.topic : null) : l.subject; };
    const agg = {};
    M.edges.forEach(e => { const a = key(e.from), b = key(e.to); if (!a || !b || a === b) return; const k = a < b ? a + '|' + b : b + '|' + a; agg[k] = (agg[k] || 0) + 1; });
    return Object.entries(agg).map(([k, w]) => { const [a, b] = k.split('|'); return { a, b, w }; });
  }

  /* ================================================================== 7. constellation layout (deterministic force simulation)
     nodes [{id, r, R?, box?}] (R = collision radius for the force phase; box = {l, r, t, b}, the node's footprint around its centre,
     e.g. the disc plus a label underneath), links [{a,b,w}] ; returns {id: {x,y}} inside w x h with padding.
     The final pass separates footprints exactly: circles of radius R, or the boxes when nodes carry them. */
  const foot = nd => nd.box || { l: nd.R || nd.r, r: nd.R || nd.r, t: nd.R || nd.r, b: nd.R || nd.r };
  function constellation(nodes, links, o) {
    o = Object.assign({ w: 600, h: 420, pad: 16, iters: 360, seed: 7, gap: 4 }, o || {});
    const rnd = rng(o.seed), n = nodes.length, cx = o.w / 2, cy = o.h / 2, P = {};
    const R = nd => nd.R || nd.r, boxed = nodes.some(nd => nd.box);
    nodes.forEach((nd, i) => { const a = (i / Math.max(1, n)) * Math.PI * 2 + rnd() * 0.3; P[nd.id] = { x: cx + Math.cos(a) * o.w * 0.3 + (rnd() - 0.5) * 8, y: cy + Math.sin(a) * o.h * 0.3 + (rnd() - 0.5) * 8, vx: 0, vy: 0 }; });
    const byId = {}; nodes.forEach(nd => (byId[nd.id] = nd));
    const L = links.filter(l => byId[l.a] && byId[l.b]), wmax = Math.max(1, ...L.map(l => l.w));
    const area = sum(nodes.map(nd => Math.PI * R(nd) * R(nd))), spread = Math.sqrt((o.w * o.h) / Math.max(area, 1));
    const keepIn = nd => { const p = P[nd.id], e = foot(nd); p.x = clamp(p.x, o.pad + e.l, Math.max(o.pad + e.l, o.w - o.pad - e.r)); p.y = clamp(p.y, o.pad + e.t, Math.max(o.pad + e.t, o.h - o.pad - e.b)); };
    for (let it = 0; it < o.iters; it++) {
      const alpha = 1 - it / o.iters, k = 0.06 * alpha + 0.01;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = nodes[i], B = nodes[j], p = P[A.id], q = P[B.id];
        let dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 0.01;
        const want = (R(A) + R(B)) * Math.min(1.9, 0.9 + spread * 0.32), push = d < want ? (want - d) / d * 0.5 : (90 * alpha) / (d * d);
        dx *= push; dy *= push; p.vx -= dx * 0.5; p.vy -= dy * 0.5; q.vx += dx * 0.5; q.vy += dy * 0.5;
      }
      L.forEach(l => {
        const p = P[l.a], q = P[l.b], A = byId[l.a], B = byId[l.b];
        const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 0.01, rest = (R(A) + R(B)) * 1.25;
        const f = ((d - rest) / d) * 0.02 * (0.4 + (0.6 * l.w) / wmax);
        p.vx += dx * f; p.vy += dy * f; q.vx -= dx * f; q.vy -= dy * f;
      });
      nodes.forEach(nd => {
        const p = P[nd.id];
        p.vx += ((cx - p.x) / o.w) * 1.4 * k * 10; p.vy += ((cy - p.y) / o.h) * 1.4 * k * 10;
        p.x += p.vx * 0.6; p.y += p.vy * 0.6; p.vx *= 0.55; p.vy *= 0.55;
        keepIn(nd);
      });
    }
    for (let it = 0; it < (boxed ? 260 : 80); it++) {                  // hard de-overlap pass
      let moved = false;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = nodes[i], B = nodes[j], p = P[A.id], q = P[B.id];
        if (!boxed) {
          const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 0.01, want = R(A) + R(B) + 2;
          if (d < want) { const m = (want - d) / d / 2; p.x -= dx * m; p.y -= dy * m; q.x += dx * m; q.y += dy * m; moved = true; }
          continue;
        }
        const a = foot(A), b = foot(B), g = o.gap;
        const ox = Math.min(p.x + a.r, q.x + b.r) - Math.max(p.x - a.l, q.x - b.l) + g, oy = Math.min(p.y + a.b, q.y + b.b) - Math.max(p.y - a.t, q.y - b.t) + g;
        if (ox <= 0 || oy <= 0) continue;
        const ca = p.x + (a.r - a.l) / 2, cb = q.x + (b.r - b.l) / 2, ma = p.y + (a.b - a.t) / 2, mb = q.y + (b.b - b.t) / 2;
        if (ox <= oy) { const m = (cb >= ca ? 1 : -1) * (ox / 2 + 0.01); p.x -= m; q.x += m; } else { const m = (mb >= ma ? 1 : -1) * (oy / 2 + 0.01); p.y -= m; q.y += m; }
        moved = true;
      }
      nodes.forEach(keepIn);
      if (!moved) break;
    }
    const res = {}; nodes.forEach(nd => (res[nd.id] = { x: r1(P[nd.id].x), y: r1(P[nd.id].y) }));
    return res;
  }
  /** how many pairs of footprints overlap (gap px apart counts as touching) plus how many leave the w x h box: 0 = a clean layout */
  function layoutClash(P, nodes, o) {
    o = Object.assign({ gap: 1, pad: 0 }, o || {});
    let bad = 0;
    nodes.forEach((A, i) => {
      const p = P[A.id], a = foot(A);
      if (o.w && (p.x - a.l < o.pad - 0.6 || p.x + a.r > o.w - o.pad + 0.6 || p.y - a.t < o.pad - 0.6 || p.y + a.b > o.h - o.pad + 0.6)) bad++;
      for (let j = i + 1; j < nodes.length; j++) {
        const B = nodes[j], q = P[B.id], b = foot(B);
        if (Math.min(p.x + a.r, q.x + b.r) - Math.max(p.x - a.l, q.x - b.l) + o.gap > 0.6 && Math.min(p.y + a.b, q.y + b.b) - Math.max(p.y - a.t, q.y - b.t) + o.gap > 0.6) bad++;
      }
    });
    return bad;
  }
  /** satellites on a golden-angle spiral around a star of radius r; sizes = satellite radii; returns [{x,y,r}] and the halo extent */
  function satellites(r, sizes, o) {
    o = o || {}; const gap = o.gap == null ? 5 : o.gap, sp = o.spread == null ? 3.4 : o.spread, ga = Math.PI * (3 - Math.sqrt(5)), out = [];
    let ext = r;
    sizes.forEach((s, k) => { const d = r + gap + s + sp * Math.sqrt(k + 0.6), a = k * ga + (o.phase || 0); out.push({ x: r1(Math.cos(a) * d), y: r1(Math.sin(a) * d), r: s }); ext = Math.max(ext, d + s); });
    return { list: out, ext };
  }

  /* ================================================================== 8. treemap view layout: the children of a view node, plus their children
     as inner cells when there is room (two levels for the overview and a subject, one level for a topic). 2 px surface gaps everywhere. */
  function tmLayout(M, V, size, W, H, o) {
    o = o || {};
    const out = [], hdr = o.mini ? 20 : 24, deep = V.kind !== 'topic' && o.depth !== 1;
    const kids = V.children.filter(c => M.value(c, size) > 0);
    const rects = squarify(kids.map(c => M.value(c, size)), { x: 0, y: 0, w: W, h: H });
    kids.forEach((c, i) => {
      const r = inset(rects[i], 1), gk = deep ? c.children.filter(k => M.value(k, size) > 0) : [];
      if (gk.length && r.h >= hdr + 20 && r.w >= 44) {
        out.push({ node: c, rect: r, role: 'group', i });
        const rr = squarify(gk.map(k => M.value(k, size)), { x: r.x + 3, y: r.y + hdr, w: r.w - 6, h: r.h - hdr - 3 });
        gk.forEach((k, j) => out.push({ node: k, rect: inset(rr[j], 1), role: 'leaf', parent: c.id, i: j }));
      } else out.push({ node: c, rect: r, role: gk.length ? 'solo' : 'leaf', i });
    });
    return out;
  }
  const inset = (r, d) => ({ x: r.x + d, y: r.y + d, w: Math.max(0, r.w - 2 * d), h: Math.max(0, r.h - 2 * d) });

  /** the map's default size: question marks once the ICAI bank has questions, else the syllabus's sub-topics (always there) */
  const defSize = M => (M && M.bank ? 'marks' : 'subs');
  /** a size the catalogue can draw: marks and questions need the bank */
  const okSize = (M, size) => (SIZES[size] && (M.bank || (size !== 'marks' && size !== 'pyqs')) ? size : defSize(M));
  const Pure = { defSize, okSize, squarify, fitLabel, shortForms, shortName, labelFor, layer, index, ancestors, descendants, topoOrder, longestChain, metroLayout, binYears, hasSection, trendSplit, yearMatrix, annotate, examRows, route, spatial,
    model, linksOf, constellation, layoutClash, satellites, tmLayout, SIZES, seriesOf, SERIES, SERIES_NAME, prereqStart };

  /* ================================================================== 9. DOM: shared pieces (only touched when mount() runs in a browser) */
  const ic = n => (GA.icon ? GA.icon(n) : '');
  const reduced = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let seqN = 0;
  const uid = p => (p || 'mv') + (++seqN).toString(36);
  function ensureCss() {
    if (typeof document === 'undefined' || document.querySelector('link[href*="css/map.css"]')) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'app/css/map.css'; document.head.appendChild(l);
  }
  const learner = () => (GA.store && GA.store.state) || null;
  const isDone = id => { const s = learner(); return !!(s && s.lessons && s.lessons[id] && s.lessons[id].done); };
  const anyDone = () => { const s = learner(); return !!(s && s.lessons && Object.keys(s.lessons).some(k => s.lessons[k] && s.lessons[k].done)); };
  /** the learner's record on a block's questions: {tried, right} (latest outcome; P3-47) */
  const youOf = n => { const s = learner(), q = (s && s.q) || {}; let tried = 0, right = 0; (n.qids || []).forEach(id => { const e = q[id]; if (e && e.n) { tried++; if (e.lastOk) right++; } }); return { tried, right }; };
  const dur = m => (m < 90 ? Math.round(m) + ' min' : fx(m / 60, m >= 600 ? 0 : 1) + ' h');
  const UNIT = { marks: ['mark', 'marks'], pyqs: ['question', 'questions'], subs: ['sub-topic', 'sub-topics'], lessons: ['lesson', 'lessons'], minutes: ['min', 'min'] };
  const NOUN = { marks: 'marks', pyqs: 'questions', subs: 'sub-topics', lessons: 'lessons', minutes: 'study time' };
  const fmtV = (v, size) => (size === 'minutes' ? dur(v) : nf(v) + ' ' + (UNIT[size] || UNIT.marks)[v === 1 ? 0 : 1]);
  const hrefOf = n => n.kind === 'subject' ? '#/s/' + n.id : n.kind === 'topic' ? '#/s/' + n.subject + '?t=' + encodeURIComponent(n.id)
    : n.kind === 'sub' ? (n.lesson ? '#/l/' + n.id : '#/pyq?sub=' + n.id) : n.kind === 'rest' ? '#/pyq?topic=' + n.topic : '#/syllabus';
  const pyqHref = n => n.kind === 'subject' ? '#/pyq?subject=' + n.id : n.kind === 'topic' ? '#/pyq?topic=' + n.id : n.kind === 'sub' ? '#/pyq?sub=' + n.id : n.kind === 'rest' ? '#/pyq?topic=' + n.topic : '#/pyq';
  const KIND = { root: 'Overview', subject: 'Paper', topic: 'Chapter', sub: 'Sub-topic', rest: 'Questions' };
  const paperLine = n => (n && n.kind === 'subject' && n.paper ? `${String(n.paper).replace(/^P/, 'Paper ')} · ${n.paperMarks} marks` : '');
  const bankEmptyLine = () => (GA.ui && GA.ui.str && GA.ui.str.bankEmpty ? GA.ui.str.bankEmpty : 'ICAI past papers, RTPs and MTPs are being added');
  const setR = (el, r) => { const s = el.style; s.left = r1(r.x) + 'px'; s.top = r1(r.y) + 'px'; s.width = Math.max(0, r1(r.w)) + 'px'; s.height = Math.max(0, r1(r.h)) + 'px'; };
  const mapR = (a, b) => r => ({ x: b.x + ((r.x - a.x) * b.w) / a.w, y: b.y + ((r.y - a.y) * b.h) / a.h, w: (r.w * b.w) / a.w, h: (r.h * b.h) / a.h });
  function hslRgb(h, s, l) { s /= 100; l /= 100; const a = s * Math.min(l, 1 - l), f = n => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }; return [f(0), f(8), f(4)]; }
  const luma = rgb => { const c = rgb.map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const lightHue = h => luma(hslRgb(h, 72, 62)) > 0.3;
  const info = n => ({ id: n.id, kind: n.kind, name: n.name, subject: n.subject || null, href: hrefOf(n) });

  /* text measurement in the real UI font (canvas, cached), so labels are fitted to what will be drawn instead of a per-character guess */
  let mctx = null, fam = null;
  const mcache = new Map();
  function measurer(font) {
    if (typeof document === 'undefined') return null;
    if (mctx === null) { try { const c = document.createElement('canvas'); mctx = (c.getContext && c.getContext('2d')) || false; } catch (e) { mctx = false; } }
    if (!mctx) return null;
    if (!fam) fam = (g.getComputedStyle && getComputedStyle(document.body || document.documentElement).fontFamily) || 'system-ui, sans-serif';
    const f = font + ' ' + fam;
    return s => { const k = f + '\u0001' + s; let v = mcache.get(k); if (v == null) { mctx.font = f; v = mctx.measureText(s).width * 1.03 + 0.5; if (mcache.size > 30000) mcache.clear(); mcache.set(k, v); } return v; };
  }
  /** run cb once the web fonts have loaded when they are still loading (labels were measured with the fallback font); returns a cancel fn */
  function afterFonts(cb) {
    const F = typeof document !== 'undefined' && document.fonts;
    if (!F || F.status === 'loaded' || !F.ready) return () => {};
    let live = true; F.ready.then(() => { if (live) { mcache.clear(); cb(); } });
    return () => { live = false; };
  }

  /** one floating tooltip per mount (values lead, labels follow) */
  function Tip() {
    const el = document.createElement('div');
    el.className = 'mv-tip'; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el);
    const place = (x, y) => {
      const r = el.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = innerHeight;
      let L = x + 14, T = y + 16;
      if (L + r.width > vw - 8) L = Math.max(8, x - r.width - 14);
      if (T + r.height > vh - 8) T = Math.max(8, y - r.height - 12);
      el.style.left = L + 'px'; el.style.top = T + 'px';
    };
    return {
      show(html, x, y) { if (el._h !== html) { el.innerHTML = html; el._h = html; } el.classList.add('on'); place(x, y); },
      near(html, node) { const b = node.getBoundingClientRect(); this.show(html, b.left + Math.min(b.width / 2, 48), b.top + Math.min(b.height, 30)); },
      hide() { el.classList.remove('on'); },
      destroy() { el.remove(); }
    };
  }
  const tipH = (val, unit, title, lines) => `<div class="mv-tv"><b>${esc(val)}</b>${unit ? ` <span>${esc(unit)}</span>` : ''}</div><div class="mv-tt">${esc(title)}</div>` +
    (lines || []).filter(Boolean).map(l => `<div class="mv-ts">${esc(l)}</div>`).join('');
  function nodeTip(M, n, size) {
    size = size || 'marks';
    const v = M.value(n, size), par = n.parent && n.parent !== 'all' ? M.nodes[n.parent] : null, pv = M.value(par || M.root, size), lines = [];
    if (n.kind !== 'root' && pv) lines.push(`${Math.round((100 * v) / pv)}% of the ${NOUN[size]} in ${par ? par.name : 'Group II'}`);
    if (paperLine(n)) lines.push(paperLine(n));
    if (size !== 'subs' && n.subs && n.kind !== 'sub') lines.push(`${nf(n.subs)} sub-topic${n.subs === 1 ? '' : 's'} in the syllabus`);
    if (n.marks && n.kind !== 'rest') lines.push((size !== 'marks' ? fmtV(n.marks, 'marks') + ' · ' : '') + fx(M.perPaper(n), 1) + ' marks per paper');
    if (M.bank) lines.push(n.pyqs ? `${nf(n.pyqs)} questions · asked in ${n.papers.size} of ${M.papersFor(n)} papers` : `Not asked in any paper ${M.years[0]}–${M.years[M.years.length - 1]}`);
    if (n.lessons) lines.push(n.kind === 'sub' ? `Lesson · ${dur(n.minutes)}${isDone(n.id) ? ' · done' : ''}` : `${nf(n.lessons)} lessons · ${dur(n.minutes)}`);
    return size === 'minutes' ? tipH(dur(v), '', n.name, lines) : tipH(nf(v), (UNIT[size] || UNIT.marks)[v === 1 ? 0 : 1], n.name, lines);
  }

  /** search-to-locate combobox */
  function Finder(wrap, items, onPick, placeholder) {
    const id = uid('mvf');
    wrap.innerHTML = `<label class="mv-find">${ic('search')}<input type="search" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="${id}" aria-label="${esc(placeholder)}" placeholder="${esc(placeholder)}" autocomplete="off" spellcheck="false"></label><ul class="mv-opts" id="${id}" role="listbox" hidden></ul>`;
    const inp = wrap.querySelector('input'), ul = wrap.querySelector('ul');
    let res = [], act = -1;
    const find = q => {
      q = q.trim().toLowerCase(); if (!q) return [];
      const sc = [];
      items.forEach(it => { const l = it.label.toLowerCase(), s = l.startsWith(q) ? 0 : l.includes(' ' + q) ? 1 : l.includes(q) ? 2 : it.alt && it.alt.toLowerCase().includes(q) ? 3 : -1; if (s >= 0) sc.push([s, it]); });
      return sc.sort((a, b) => a[0] - b[0] || a[1].label.length - b[1].label.length).slice(0, 8).map(x => x[1]);
    };
    const paint = () => {
      ul.hidden = !res.length; inp.setAttribute('aria-expanded', String(!!res.length));
      ul.innerHTML = res.map((it, i) => `<li role="option" id="${id}-${i}" data-i="${i}" aria-selected="${i === act}" class="${i === act ? 'on' : ''}" style="${hv(it)}"><i class="mv-dot"></i><span>${esc(it.label)}</span><small>${esc(it.sub || '')}</small></li>`).join('');
      if (act >= 0) inp.setAttribute('aria-activedescendant', id + '-' + act); else inp.removeAttribute('aria-activedescendant');
    };
    const pick = it => { res = []; act = -1; paint(); inp.value = ''; onPick(it); };
    inp.addEventListener('input', () => { res = find(inp.value); act = res.length ? 0 : -1; paint(); });
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (res.length) { act = (act + (e.key === 'ArrowDown' ? 1 : -1) + res.length) % res.length; paint(); } }
      else if (e.key === 'Enter' && act >= 0) { e.preventDefault(); pick(res[act]); }
      else if (e.key === 'Escape' && (res.length || inp.value)) { e.stopPropagation(); res = []; inp.value = ''; paint(); }
    });
    ul.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); pick(res[+li.dataset.i]); } });
    inp.addEventListener('blur', () => setTimeout(() => { res = []; act = -1; paint(); }, 150));
    return { input: inp };
  }
  /* radio-like groups are one tab stop each (P3-15, the WAI-ARIA radio pattern): the checked option takes Tab, arrows / Home / End move and choose */
  const seg = (key, opts, cur, label) => `<div class="seg mv-seg" data-k="${key}" role="radiogroup" aria-label="${esc(label)}">${opts.map(([v, l, i]) => `<button type="button" role="radio" data-v="${v}" aria-checked="${cur === v}" tabindex="${cur === v ? 0 : -1}" class="${cur === v ? 'on' : ''}">${i ? ic(i) : ''}<span>${esc(l)}</span></button>`).join('')}</div>`;
  const setSeg = (root, key, v) => root.querySelectorAll(`.mv-seg[data-k="${key}"] button`).forEach(b => { const on = b.dataset.v === v; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
  function segKeys(root) {
    root.addEventListener('keydown', e => {
      const b = e.target.closest && e.target.closest('.mv-seg button'); if (!b || !/^(Arrow(Left|Right|Up|Down)|Home|End)$/.test(e.key)) return;
      const all = Array.from(b.parentNode.querySelectorAll('button')), i = all.indexOf(b);
      const n = e.key === 'Home' ? all[0] : e.key === 'End' ? all[all.length - 1] : all[(i + (/Right|Down/.test(e.key) ? 1 : -1) + all.length) % all.length];
      e.preventDefault(); n.focus(); n.click();
    });
  }

  /** the share of each year's paper for one node (P2-13: marks per 100-mark paper, so the 150-mark 2007–08 papers do not win on size alone):
      thin columns whose values are touch-safe tips (GA.reveal's data-ftip, P1-55) */
  function yearBars(M, n) {
    const D = M.D, ys = M.years, pm = {};
    D.papers.forEach(p => { if (n.subject === 'ga' && !p.ga) return; pm[p.year] = (pm[p.year] || 0) + (p.marks || 0); });
    const vals = ys.map(y => (pm[y] ? (n.byYear[y] || 0) / pm[y] : null)), max = Math.max(1e-6, ...vals.filter(v => v != null));
    const pc = v => fx(100 * v, 1) + '%';
    const W = 220, H = 46, bw = W / ys.length;
    const bars = ys.map((y, i) => {
      const v = vals[i], h = v == null ? 0 : Math.max(v > 0 ? 2 : 0, (v / max) * (H - 4));
      const t = v == null ? `${y}\nNo General Aptitude section` : `${y}\n${pc(v)} of the paper\n${fx(n.byYear[y] || 0, 1)} of ${nf(pm[y])} marks`;
      return `<g data-ftip="${esc(t)}"><rect class="mv-yb-hit" x="${r1(i * bw)}" y="0" width="${r1(bw)}" height="${H}"/>${v == null ? `<rect class="mv-yb-na" x="${r1(i * bw + 1)}" y="${H - 2}" width="${r1(bw - 2)}" height="2"/>` : `<rect class="mv-yb${v ? '' : ' z'}" x="${r1(i * bw + 1)}" y="${r1(H - Math.max(h, 1.5))}" width="${r1(bw - 2)}" height="${r1(Math.max(h, 1.5))}" rx="1.5"/>`}</g>`;
    }).join('');
    const pk = vals.reduce((b, v, i) => (v != null && v > (vals[b] || 0) ? i : b), 0);
    return `<figure class="mv-yrs" style="${hv(n)}"><div class="mv-yh"><span>Share of the paper, by year</span><span>peak ${pc(vals[pk] || 0)} in ${ys[pk]}</span></div><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(`Share of each paper's marks by year for ${n.name}, ${ys[0]} to ${ys[ys.length - 1]}; highest ${pc(vals[pk] || 0)} in ${ys[pk]}`)}">${bars}</svg>
      <figcaption><span>${ys[0]}</span><span>${ys[ys.length - 1]}</span></figcaption></figure>`;
  }

  /* ---- the shared next step (P0-08, ARCHITECTURE §10.3): every coral on the map that names a lesson is GA.stats.nextStep, kind 'lesson' —
     scope 'all' on the overviews, 'subject:<id>' on a subject or topic panel. undefined = not available (old builds, Node), so the panels keep
     their own choice; null = nothing left in that scope (the panel then offers the subject's PYQs, or a full mock on the overview). */
  function stepOf(M, scope) {
    const st = GA.stats, s = learner();
    if (!s || !st || typeof st.nextStep !== 'function') return undefined;
    try { return st.nextStep(s, M.D, { kind: 'lesson', scope }) || null; } catch (e) { return undefined; }
  }
  const medN = name => (GA.util && GA.util.medName ? GA.util.medName(name) : shortName(name));
  /** tier labels (D14: the data keeps 'standard', the label reads 'Extended'); GA.ui.str.tier (WP1) wins when it exists */
  const TIER_L = { core: 'Core', standard: 'Extended', advanced: 'Advanced' };
  const tierL = t => (GA.ui && GA.ui.str && GA.ui.str.tier && GA.ui.str.tier[t]) || TIER_L[t] || t;
  /** one wording per status (P2-66), as on the Learn tab */
  const STATUS_W = { legacy: 'not in the current syllabus; named in earlier syllabi, still in past papers', extra: 'not named in the syllabus text, but asked in past papers' };
  const touchUI = () => !!(GA.ui && GA.ui.touch);
  /** the lessons of a node in the one learning order, I.order (P1-02); the map's own topological order only when the insights are not there */
  function orderIn(M, n, I) {
    const set = new Set(n.lessonIds);
    I = I || (GA.insights && GA.insights.get ? GA.insights.get() : null);
    if (I && typeof I.order === 'function' && n.subject) { const o = I.order(n.subject).filter(id => set.has(id)); if (o.length === set.size) return o; }
    return topoOrder(n.lessonIds, M.edges, M.rankOf);
  }
  /** a step as the panel's two-line coral */
  const stepBtn = (st, kicker) => `<a class="btn pop mv-go two" href="${esc(st.href)}"><span><small>${esc(kicker)}</small>${esc(st.title)}</span>${ic('arrow-r')}</a>`;
  /** a panel's coral when its scope has nothing left (D18: a done state still gets a real next step) */
  const doneBtn = (kicker, title, href) => `<a class="btn pop mv-go two" href="${esc(href)}"><span><small>${esc(kicker)}</small>${esc(title)}</span>${ic('arrow-r')}</a>`;

  /** side panel of the syllabus lens: what the node is, its marks and sub-topics (and, once the ICAI bank exists, how much ICAI asks it), where to start */
  /** a hairline row of a lesson in a panel list: status dot (done / not yet), title, minutes, optional tag ("Start here") */
  const lessonRow = (M, id, tag) => { const l = M.D.lessonById[id], dn = isDone(id);
    return `<li><a href="#/l/${id}" class="${dn ? 'done' : ''}${tag ? ' next' : ''}"><i class="mv-st${dn ? ' on' : ''}" aria-hidden="true"></i><span>${esc(l.title)}${tag ? ` <em>${tag}</em>` : ''}${dn ? '<span class="sr"> (done)</span>' : ''}</span><small>${l.minutes} min</small></a></li>`; };
  function nodePanel(M, n, size) {
    const D = M.D;
    if (n.kind === 'root') {
      const top = n.children.slice().sort((a, b) => M.value(b, size) - M.value(a, size)), max = M.value(top[0], size) || 1, tot = M.value(n, size) || 1;
      const k4 = top.slice(0, 4), k4s = Math.round((100 * sum(k4.map(x => M.value(x, size)))) / tot);
      /* the overview's coral is the shared next lesson; 'Zoom into' is a plain button on the biggest paper */
      const zoomTo = top[0], st = stepOf(M, 'all');
      const sj = st && st.id && D.lessonById[st.id] ? M.nodes[D.lessonById[st.id].subject] : null;
      const cta = st === undefined || (st === null && !D.lessons.length) ? `<button type="button" class="btn pop mv-go" data-go="${zoomTo.id}"><span>Zoom into ${esc(medN(zoomTo.name))}</span>${ic('arrow-r')}</button>`
        : (st ? stepBtn(st, `${st.label}${sj ? ' · ' + medN(sj.name) : ''}`) : M.bank ? doneBtn('Every syllabus lesson done', 'Take a full mock', '#/test?new=mock') : doneBtn('Every lesson written so far is done', 'Review your flashcards', '#/flash'))
          + `<button type="button" class="btn mv-zoom" data-go="${zoomTo.id}"><span>Zoom into ${esc(medN(zoomTo.name))}</span>${ic('arrow-r')}</button>`;
      const intro = M.bank ? `${nf(n.marks)} marks in ${nf(n.pyqs)} ICAI questions across ${M.papersN} papers, and ${nf(n.lessons)} lessons (${dur(n.minutes)}) to learn them.`
        : `${n.children.length} papers worth ${nf(n.paperMarks || 0)} marks, ${nf(n.subs)} sub-topics in the syllabus, and ${n.lessons ? `${nf(n.lessons)} ${n.lessons === 1 ? 'lesson' : 'lessons'} (${dur(n.minutes)}) written so far` : 'no lesson written yet'}.`;
      const big = top.length > 4 ? ` The four biggest papers by ${NOUN[size]} hold <b>${k4s}%</b> of the total.` : '';
      return `<p class="mv-pk">Overview${M.years.length ? `, ${M.years[0]}–${M.years[M.years.length - 1]}` : ''}</p><h2 class="mv-ph">All of Group II</h2>
        <p class="mv-pp">${intro}${big}</p>
        <ol class="mv-tops" aria-label="${esc('Papers by ' + NOUN[size])}">${top.slice(0, 8).map(s => `<li><button type="button" class="mv-top" data-go="${s.id}" style="${hv(s)}"><i class="mv-dot"></i><span>${esc(s.name)}</span><b>${esc(fmtV(M.value(s, size), size))}</b><span class="mv-tb" aria-hidden="true"><i style="width:${r1((100 * M.value(s, size)) / max)}%"></i></span></button></li>`).join('')}</ol>
        ${cta}
        <p class="mv-pm">${touchUI() ? 'Tap' : 'Select'} a block to zoom in; pick a sub-topic for its lesson, labs and questions.</p>`;
    }
    const path = M.path(n.id).filter(x => x.kind !== 'root'), parent = path.length > 1 ? path[path.length - 2] : null;
    const ord = orderIn(M, n), doneN = ord.filter(isDone).length, sjN = M.nodes[n.subject];
    /* subject and topic panels: the shared next step within the subject (P0-08); a sub-topic panel opens its own lesson */
    const st = n.kind === 'subject' || n.kind === 'topic' ? stepOf(M, 'subject:' + n.subject) : undefined;
    const start = st && st.id ? st.id : st === null ? null : ord.find(id => !isDone(id)) || ord[0];
    const labs = n.kind === 'subject' || n.kind === 'topic' ? M.labsBy[n.id] || [] : M.labsBy[n.topic] || [];
    const qs = n.qids.map(id => D.qById[id]).filter(Boolean).sort((a, b) => b.year - a.year || b.set - a.set || b.marks - a.marks || a.no - b.no).slice(0, 4);
    /* the status explained in plain text for everyone (P1-55: no hover-only title): visible word, the reason as a visually hidden copy and in the panel note */
    const why = STATUS_W[n.status] || '';                          // one wording per status (P2-66), as on the Learn tab
    const status = n.status && n.status !== 'in' ? ` · <span class="dotl warn">${esc(n.status)}</span><span class="sr"> (${why})</span>` : '';
    const sl = start ? D.lessonById[start] : null, tag = st ? st.label : doneN && doneN < ord.length ? 'Continue' : 'Start here';
    const lessonStat = [n.lessons ? dur(n.minutes) : '—', n.lessons ? `${n.lessons} lesson${n.lessons === 1 ? '' : 's'}` : 'no lesson yet'];
    const stats = M.bank ? [[nf(n.marks), n.marks === 1 ? 'mark' : 'marks'], [nf(n.pyqs), n.pyqs === 1 ? 'question' : 'questions'], [`${n.papers.size}<small>/${M.papersFor(n)}</small>`, 'papers'], lessonStat]
      : n.kind === 'subject' ? [[nf(n.paperMarks), 'marks'], [nf(n.subs), 'sub-topics'], lessonStat]
        : n.kind === 'topic' ? [[nf(n.subs), n.subs === 1 ? 'sub-topic' : 'sub-topics'], lessonStat]
          : [[esc(tierL(n.tier || '') || '—'), 'tier'], lessonStat];
    let h = `<p class="mv-pk" style="${hv(n)}"><i class="mv-dot"></i><span>${n.kind === 'subject' && n.paper ? esc(String(n.paper).replace(/^P/, 'Paper ')) : KIND[n.kind]}${parent ? ' · ' + esc(parent.name) : ''}${status}</span></p><h2 class="mv-ph">${esc(n.name)}</h2>
      <dl class="mv-ps">${stats.map(x => `<div><dd>${x[0]}</dd><dt>${x[1]}</dt></div>`).join('')}</dl>${n.status && n.status !== 'in' ? `<p class="mv-pm mv-why" aria-hidden="true">${esc(U2.cap(n.status))}: ${why}.</p>` : ''}`;
    /* where the learner stands (P3-47): questions of this block tried, and right on the latest try */
    const you = youOf(n);
    if (you.tried) h += `<p class="mv-pm mv-you"><b>You: ${you.right}/${you.tried} right</b> · ${nf(you.tried)} of these ${nf(n.pyqs)} questions tried</p>`;
    if (n.marks) h += yearBars(M, n);
    if (n.kind === 'sub' || n.kind === 'rest') {
      if (sl && ord.length === 1) h += `<a class="btn pop mv-go" href="#/l/${sl.id}"><span>${isDone(sl.id) ? 'Revisit the lesson' : 'Open the lesson'}</span><small>${sl.minutes} min</small>${ic('arrow-r')}</a>`;
      else if (sl) h += `<a class="btn pop mv-go two" href="#/l/${sl.id}"><span><small>${doneN === ord.length ? 'All done · revisit' : tag} · ${sl.minutes} min</small>${esc(sl.title)}</span>${ic('arrow-r')}</a>`;
      else if (M.bank && n.pyqs) h += doneBtn('ICAI questions', `Practise these ${nf(n.pyqs)} questions`, pyqHref(n));
      else h += doneBtn('Lesson not written yet', `Open ${sjN ? medN(sjN.name) : 'the paper'}`, '#/s/' + n.subject);
    } else if (st) h += stepBtn(st, `${st.label}${st.minutes ? ' · ' + st.minutes + ' min' : ''}`);
    else if (!ord.length) h += doneBtn('No lesson written yet', `Open ${medN(n.name)}`, hrefOf(n));
    else if (st === null) h += M.bank ? doneBtn(`Every ${sjN ? medN(sjN.name) : ''} lesson done`.replace(/\s+/g, ' '), `Practise ${sjN ? sjN.name : ''} questions`, `#/pyq?subject=${n.subject}&practise=10`)
      : doneBtn(`Every ${sjN ? medN(sjN.name) : ''} lesson written so far is done`.replace(/\s+/g, ' '), 'Review your flashcards', '#/flash');
    else if (sl) h += `<a class="btn pop mv-go two" href="#/l/${sl.id}"><span><small>${doneN === ord.length ? 'All done · revisit' : tag} · ${sl.minutes} min</small>${esc(sl.title)}</span>${ic('arrow-r')}</a>`;
    /* the node's own lessons as plain rows. A one-lesson topic keeps its row too: its coral is the subject's next step (P0-08), usually a lesson
       in another topic, so without the row the topic's own lesson had no link at all (la.det, db.rel.calc …); skipped only when the coral is it */
    const coralId = n.kind === 'sub' || n.kind === 'rest' ? (sl ? sl.id : null) : st ? st.id : st === null ? null : sl ? sl.id : null;
    if (ord.length > 1) h += `<div class="mv-sec"><h3>Lessons in learning order <small>${doneN ? `${doneN} of ${ord.length} done` : `${ord.length} lessons`}</small></h3><ol class="mv-ls">${ord.slice(0, 6).map(id => lessonRow(M, id, id === start && !isDone(id) ? tag : '')).join('')}</ol>${ord.length > 6 ? `<a class="link" href="${hrefOf(n)}">All ${ord.length} lessons ${ic('arrow-r')}</a>` : ''}</div>`;
    else if (ord.length === 1 && ord[0] !== coralId) h += `<div class="mv-sec"><h3>${n.kind === 'topic' ? 'This topic’s lesson' : 'Its lesson'}</h3><ol class="mv-ls">${lessonRow(M, ord[0], '')}</ol></div>`;
    /* each lab's description is visible text under its name (P1-55: it was a hover-only title) */
    if (labs.length) h += `<div class="mv-sec"><h3>Interactive labs</h3><ul class="mv-ls mv-labs">${labs.slice(0, 4).map(l => `<li><a href="#/lab/${l.id}">${ic('flask')}<span><span class="mv-lab-t">${esc(l.title)}</span>${l.blurb ? `<small class="mv-lab-d">${esc(l.blurb)}</small>` : ''}</span></a></li>`).join('')}</ul></div>`;
    if (qs.length) h += `<div class="mv-sec"><h3>Latest questions</h3><ul class="mv-ls mv-qs">${qs.map(q => { const p = D.paperById[q.paper]; return `<li><a href="#/q/${encodeURIComponent(q.id)}"><span>${esc(p ? p.label : q.paper)} · ${q.section === 'GA' ? 'GA ' : ''}Q${q.no}</span><small>${q.marks} mark${q.marks === 1 ? '' : 's'} · ${esc(q.type)}</small></a></li>`; }).join('')}</ul><a class="link" href="${pyqHref(n)}">All ${nf(n.pyqs)} questions ${ic('arrow-r')}</a></div>`;
    else h += M.bank ? `<p class="mv-pm">No ICAI question has been tagged here yet${n.lessons ? '; the lesson still covers it' : ''}.</p>` : `<p class="mv-pm">${esc(bankEmptyLine())}.</p>`;
    return h;
  }

  /* ================================================================== 10. treemap view (keyed cells, zoom transitions, roving focus) */
  function Treemap(host, o) {
    const M = o.M, els = new Map(), tip = o.tip;
    let V = null, rects = {}, items = [], size = defSize(M), sel = null;
    host.classList.add('tm'); if (o.mini) host.classList.add('tm-mini');
    const zoomed = () => V && V.kind === 'topic';
    function strip(n) {
      const ys = M.years, max = Math.max(1, ...ys.map(y => n.byYear[y] || 0));
      return `<svg class="tm-strip" viewBox="0 0 ${ys.length * 4} 14" preserveAspectRatio="none" aria-hidden="true">${ys.map((y, i) => { const v = n.byYear[y] || 0, hh = v ? Math.max(2, (v / max) * 13) : 1; return `<rect x="${i * 4 + 0.5}" y="${r1(14 - hh)}" width="3" height="${r1(hh)}" class="${v ? '' : 'z'}"/>`; }).join('')}</svg>`;
    }
    /* fonts here must match .tm-hd / .tm-l / .tm-v in map.css: labels are measured in them */
    const FT = o.mini ? { hd: '650 11px', l: '600 11px', lh: 13.5, px: 6, py: 5, v: '500 10.5px', vh: 14 } : { hd: '650 12px', l: '600 12px', lh: 15, px: 8, py: 6, v: '500 11px', vh: 15 };
    const FZ = { l: '620 13.5px', lh: 17, px: 10, py: 8, v: '500 12px', vh: 16 };
    const approx = cw => s => s.length * cw;
    function cellHtml(it) {
      const n = it.node, r = it.rect, v = M.value(n, size);
      if (it.role === 'group') {
        const mh = measurer(FT.hd) || approx(o.mini ? 6.1 : 6.7), mv = measurer(FT.v) || approx(6), val = fmtV(v, size), room = r.w - 2 * FT.px;
        const name = (n.kind === 'subject' ? [n.name, medN(n.name), shortName(n.name, 16), n.short] : [n.name].concat(shortForms(n.name))).filter(Boolean).find(c => mh(c) <= room) || '';
        const showV = !o.mini && name && mh(name) + 12 + mv(val) <= room;
        return `<span class="tm-hd">${name ? `<span class="tm-hn">${esc(name)}</span>` : ''}${showV ? `<span class="tm-hv">${esc(val)}</span>` : ''}</span>`;
      }
      const F = zoomed() ? FZ : FT, ml = measurer(F.l) || approx(zoomed() ? 7.3 : o.mini ? 6 : 6.5), mv = measurer(F.v) || approx(6);
      const opt = { measure: ml, lineH: F.lh, padX: F.px, padY: F.py, maxLines: zoomed() ? 4 : 3, minChars: 3 };
      const val = fmtV(v, size) + (zoomed() && r.w > 150 && n.pyqs ? ` · ${n.papers.size}/${M.papersFor(n)} papers` : ''), vfits = r.h > 40 && mv(val) <= r.w - 2 * F.px;
      /* the name matters more than the number: drop the value line before shortening or cutting the name */
      let lab = vfits ? labelFor(n.name, r.w, r.h - F.vh, opt) : null, withV = !!lab;
      if (!lab || !lab.full) { const b = labelFor(n.name, r.w, r.h, opt); if (b && (b.full || !lab)) { lab = b; withV = false; } }
      let s = '';
      it.unl = !lab;                                              // P2-07: an unlabelled leaf of the subject page's treemap opens its topic
      if (lab) {
        s += `<span class="tm-l">${lab.lines.map(esc).join('<br>')}</span>`;
        if (withV) s += `<span class="tm-v">${esc(val)}</span>`;
        if (zoomed() && r.h > lab.lines.length * F.lh + 70 && r.w > 130 && n.marks) s += strip(n);
      }
      if (n.kind === 'sub' && n.lesson && isDone(n.id) && r.w > 18 && r.h > 16) s += '<i class="tm-ck" aria-hidden="true"></i>';
      return s;
    }
    const aria = it => { const n = it.node, v = M.value(n, size), par = M.nodes[n.parent] || M.root, pv = M.value(par, size); return `${n.name}: ${fmtV(v, size)}, ${pv ? Math.round((100 * v) / pv) : 0}% of ${par.kind === 'root' ? 'Group II' : par.name}${n.kind === 'sub' && n.lesson && isDone(n.id) ? ', lesson done' : ''}.${it.role !== 'leaf' ? ' Press Enter to zoom in.' : ''}`; };
    function render(view, op) {
      op = op || {};
      if (op.size) size = op.size;
      if ('sel' in op) sel = op.sel;
      const W = host.clientWidth, H = host.clientHeight;
      if (!W || !H) return;
      const prevV = V, prev = rects, anim = op.anim && prevV && prevV !== view && !reduced();
      V = view;
      host.classList.toggle('zoom', view.kind === 'topic');
      items = tmLayout(M, view, size, W, H, { mini: o.mini, depth: o.depth });
      const next = {}; items.forEach(it => (next[it.node.id] = it.rect));
      const full = { x: 0, y: 0, w: W, h: H };
      let fwd = null, inv = null;
      if (anim && prev[view.id]) { fwd = mapR(prev[view.id], full); inv = mapR(full, prev[view.id]); }            // zoom in
      else if (anim && next[prevV.id]) { fwd = mapR(full, next[prevV.id]); inv = mapR(next[prevV.id], full); }    // zoom out
      const seen = new Set();
      items.forEach((it, k) => {
        const id = it.node.id; seen.add(id);
        let el = els.get(id);
        if (!el) { el = document.createElement(o.mini ? 'a' : 'button'); if (!o.mini) el.type = 'button'; el.dataset.id = id; els.set(id, el); host.appendChild(el); setR(el, inv ? inv(it.rect) : it.rect); if (anim) el.style.opacity = '0'; }
        el.className = `tm-n tm-${it.role} j${it.i % 3}${sel && sel.id === id ? ' sel' : ''}${it.node.kind === 'rest' ? ' rest' : ''}${it.rect.w < 30 || it.rect.h < 22 ? ' tiny' : ''}`;
        el.style.setProperty('--h', it.node.hue); el.style.setProperty('--sc', `var(--viz-${it.node.sc || 'a'})`);
        el.style.zIndex = it.role === 'group' ? 1 : 2;
        el.innerHTML = cellHtml(it);
        /* mini (the subject page): a leaf too small for its name opens its topic, not a lesson the reader cannot see named (P2-07) */
        const tgt = o.mini && it.unl && it.role === 'leaf' && it.parent && M.nodes[it.parent] ? M.nodes[it.parent] : it.node;
        el._tgt = tgt;
        if (o.mini) el.href = hrefOf(tgt);
        el.setAttribute('aria-label', aria(it) + (tgt !== it.node ? ` Opens its topic, ${tgt.name}.` : ''));
        el.tabIndex = -1; el._it = it;
      });
      els.forEach((el, id) => {
        if (seen.has(id)) return;
        els.delete(id);
        if (fwd && el._it) { el.style.zIndex = 0; el.classList.add('out'); requestAnimationFrame(() => { setR(el, fwd(el._it.rect)); el.style.opacity = '0'; }); setTimeout(() => el.remove(), 520); }
        else el.remove();
      });
      if (anim) { host.classList.add('anim'); void host.offsetWidth; clearTimeout(host._t); host._t = setTimeout(() => host.classList.remove('anim'), 560); }
      items.forEach(it => { const el = els.get(it.node.id); setR(el, it.rect); el.style.opacity = ''; });
      rects = next;
      const f = (sel && els.get(sel.id)) || (items[0] && els.get(items[0].node.id));
      if (f) f.tabIndex = 0;
    }
    function setSel(n) { sel = n; els.forEach((el, id) => el.classList.toggle('sel', !!n && n.id === id)); const f = n && els.get(n.id); if (f) { els.forEach(e => (e.tabIndex = -1)); f.tabIndex = 0; } }
    function ping(id) { const el = els.get(id); if (!el) return; el.classList.remove('ping'); void el.offsetWidth; el.classList.add('ping'); setTimeout(() => el.classList.remove('ping'), 1500); }
    const onMove = e => { const el = e.target.closest('.tm-n'); if (!el || !el._it) { tip.hide(); return; } tip.show(nodeTip(M, el._it.node, size), e.clientX, e.clientY); if (o.onHover) o.onHover(el._it.node); };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', () => { tip.hide(); if (o.onHover) o.onHover(null); });
    host.addEventListener('focusin', e => { const el = e.target.closest('.tm-n'); if (el && el._it) { tip.near(nodeTip(M, el._it.node, size), el); els.forEach(x => (x.tabIndex = -1)); el.tabIndex = 0; } });
    host.addEventListener('focusout', () => tip.hide());
    host.addEventListener('click', e => {
      const el = e.target.closest('.tm-n'); if (!el || !el._it) return;
      if (o.mini) { if (o.onSelect && o.onSelect(info(el._tgt || el._it.node)) === false) e.preventDefault(); return; }
      o.onPick(el._it.node, el._it.role);
    });
    host.addEventListener('keydown', e => {
      const el = e.target.closest('.tm-n'); if (!el) return;
      const dir = { ArrowRight: 'right', ArrowLeft: 'left', ArrowDown: 'down', ArrowUp: 'up' }[e.key];
      if (dir) { e.preventDefault(); const list = items.map(it => it.rect), i = items.findIndex(it => it.node.id === el.dataset.id), j = spatial(list, i, dir); if (j >= 0) els.get(items[j].node.id).focus(); }
      else if ((e.key === 'Escape' || e.key === 'Backspace') && o.onBack) { e.preventDefault(); o.onBack(); }
      else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); const it = e.key === 'Home' ? items[0] : items[items.length - 1]; if (it) els.get(it.node.id).focus(); }
    });
    const unF = afterFonts(() => { if (V && host.isConnected) render(V, {}); });
    return { render, setSel, ping, focusSel() { const f = (sel && els.get(sel.id)) || (items[0] && els.get(items[0].node.id)); if (f) f.focus(); }, get view() { return V; }, destroy() { unF(); } };
  }

  /* ================================================================== 11. mini mode: constellation (default) or treemap */
  /* labels: true = full names under the discs (shortened when a name cannot fit two lines), false = codes inside the discs,
     'auto' = full names, else short names ("Discrete Maths", "Computer Org."), else codes: the first that lays out with no label
     overlapping another node or leaving the box, measured in the real font. The chosen tier is on el.dataset.labels. */
  const MC = { lh: 13, font: '600 11px', gap: 5, pad: 6 };
  function MiniConstellation(el, o, M) {
    const scope = o.subject && M.nodes[o.subject] ? M.nodes[o.subject] : M.root, size = okSize(M, o.size);
    const mode = o.labels === 'auto' ? 'auto' : o.labels === false ? 'code' : 'full';
    const items = scope.children.filter(c => c.kind !== 'rest' && M.value(c, size) > 0), tip = Tip();
    let svg = null, hot = null, links = [], tier = null;
    const tipOf = c => {
      const lines = [];
      const qn = M.bank ? `${nf(c.pyqs)} questions · ` : '';
      if (c.kind === 'subject') lines.push(`${qn}${c.children.length} chapters · ${nf(c.lessons)} lessons`);
      else lines.push(`${qn}${c.children.length} sub-topics · ${dur(c.minutes)}`);
      if (M.bank) lines.push(`Asked in ${c.papers.size} of ${M.papersFor(c)} papers`);
      const ln = links.filter(l => l.a === c.id || l.b === c.id).map(l => M.nodes[l.a === c.id ? l.b : l.a]);
      if (ln.length) lines.push('Shares prerequisites with ' + ln.slice(0, 3).map(x => x.short || x.name).join(', ') + (ln.length > 3 ? ` +${ln.length - 3}` : ''));
      return tipH(fx(M.perPaper(c), 1), 'marks per paper', c.name, lines);
    };
    function plan(W, H) {
      const base = Math.min(W, H), n = items.length, vmax = Math.max(...items.map(c => M.value(c, size))), ml = measurer(MC.font) || (t => t.length * 6.3);
      links = linksOf(M, scope.kind === 'subject' ? scope.id : null).filter(l => items.some(c => c.id === l.a) && items.some(c => c.id === l.b));
      const tiers = mode === 'auto' ? ['full', 'short', 'code'] : [mode];
      let last = null;
      for (const t of tiers) {
        const named = t !== 'code', dense = n > 10;
        const rMax = base * (named ? (dense ? 0.058 : 0.085) : (dense ? 0.082 : 0.11)), rMin = Math.max(named ? 5 : 11, rMax * 0.45);
        const lw = named ? clamp(W * (t === 'full' ? 0.27 : 0.21), 60, t === 'full' ? 150 : 108) : 0;
        const fit = txt => { const f = fitLabel(txt, lw, 2 * MC.lh, { measure: ml, lineH: MC.lh, padX: 0, padY: 0, maxLines: 2, minChars: 2 }); return f && f.full ? f.lines : null; };
        let ok = true;
        const nodes = items.map((c, i) => {
          const r = rMin + (rMax - rMin) * Math.sqrt(M.value(c, size) / vmax);
          let lines = null;
          if (named) { lines = fit(t === 'full' ? c.name : shortName(c.name)); if (!lines && mode === 'auto') ok = false; if (!lines && mode === 'full') lines = fit(shortName(c.name)); }
          const w = lines ? Math.max(...lines.map(ml)) : 0, h = lines ? lines.length * MC.lh : 0, half = Math.max(r + 1, w / 2 + 3);
          return { id: c.id, r, lines, node: c, i, box: lines ? { l: half, r: half, t: r + 1, b: r + MC.gap + h + 2 } : null, R: lines ? Math.max(half, r + (MC.gap + h) / 2) : r + 3 };
        });
        if (!ok) continue;
        const P = constellation(nodes, links, { w: W, h: H, pad: MC.pad, seed: o.seed || 11, gap: 5 });
        last = { tier: t, nodes, P };
        if (mode !== 'auto' || t === 'code' || layoutClash(P, nodes, { w: W, h: H, pad: MC.pad - 1, gap: 2 }) === 0) return last;
      }
      return last;
    }
    function draw() {
      const W = Math.max(260, Math.round(el.clientWidth) || 520);
      let H = Math.round(o.height || el.clientHeight || 0); if (H < 160) H = Math.round(W * (o.aspect || 0.78));
      const pl = plan(W, H), nodes = pl.nodes, P = pl.P, wmax = Math.max(1, ...links.map(l => l.w));
      tier = pl.tier; el.dataset.labels = tier;
      const ls = links.map(l => {
        const A = P[l.a], B = P[l.b], dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, k = 0.12 * len;
        const cx = (A.x + B.x) / 2 - (dy / len) * k, cy = (A.y + B.y) / 2 + (dx / len) * k;
        return `<path class="mc-l" data-a="${l.a}" data-b="${l.b}" d="M${A.x},${A.y} Q${r1(cx)},${r1(cy)} ${B.x},${B.y}" style="stroke-width:${r1(0.75 + 1.1 * Math.sqrt(l.w / wmax))}px"/>`;
      });
      const first = nodes.slice().sort((a, b) => (P[a.id].y + P[a.id].x * 0.35) - (P[b.id].y + P[b.id].x * 0.35))[0];
      const ss = nodes.map(nd => {
        const p = P[nd.id], c = nd.node, code = c.short || '', r = nd.r, kfs = r1(clamp(r * 0.56, 8.5, 13));
        const showCode = !nd.lines && code && o.codes !== false && code.length * kfs * 0.64 <= 2 * r - 3;
        const dr = r1(clamp(r * 0.2, 2.6, 4)), dot = nd.lines || !showCode ? [0, 0] : [r1(r * 0.72), r1(-r * 0.72)];
        const lab = nd.lines ? `<text class="mc-n" y="${r1(r + MC.gap + MC.lh * 0.8)}">${nd.lines.map((t, j) => `<tspan x="0" dy="${j ? MC.lh : 0}">${esc(t)}</tspan>`).join('')}</text>` : '';
        const hit = nd.box ? `<rect class="mc-hit" x="${r1(-nd.box.l)}" y="${r1(-nd.box.t - 2)}" width="${r1(nd.box.l + nd.box.r)}" height="${r1(nd.box.t + nd.box.b + 2)}" rx="8"/>` : `<circle class="mc-hit" r="${r1(Math.max(r + 4, 14))}"/>`;
        return `<a class="mc-s" href="${hrefOf(c)}" data-id="${c.id}" tabindex="${nd === first ? 0 : -1}" style="${hv(c)};--i:${nd.i}" transform="translate(${p.x} ${p.y})" aria-label="${esc(`${c.name}: ${fx(M.perPaper(c), 1)} marks per paper, ${nf(c.pyqs)} past questions`)}">` +
          `<circle class="mc-fr" r="${r1(r + 3.5)}"/><circle class="mc-c" r="${r1(r)}"/>` +
          (showCode ? `<text class="mc-k" dy=".36em" style="font-size:${kfs}px">${esc(code)}</text>` : '') +
          `<circle class="mc-d${dot[0] ? ' edge' : ''}" cx="${dot[0]}" cy="${dot[1]}" r="${dr}"/>${lab}${hit}</a>`;
      });
      el.innerHTML = `<svg class="mc t-${tier}" viewBox="0 0 ${W} ${H}" width="100%" tabindex="-1" focusable="false" role="group" aria-roledescription="map" aria-label="${esc(scope.kind === 'root' ? `Map of the ${items.length} Group II papers, sized by ${NOUN[size]}; lines join papers that share prerequisites` : `Chapters of ${scope.name}, sized by ${NOUN[size]}`)}"><g class="mc-ls">${ls.join('')}</g><g class="mc-ss">${ss.join('')}</g></svg>`;
      svg = el.firstChild;
      wire();
    }
    function hover(id) {
      hot = id; if (!svg) return;
      const near = new Set(); if (id) links.forEach(l => { if (l.a === id) near.add(l.b); if (l.b === id) near.add(l.a); });
      svg.classList.toggle('hl', !!id);
      svg.querySelectorAll('.mc-s').forEach(s => { s.classList.toggle('on', s.dataset.id === id); s.classList.toggle('near', near.has(s.dataset.id)); });
      svg.querySelectorAll('.mc-l').forEach(p => { const on = !!id && (p.dataset.a === id || p.dataset.b === id); p.classList.toggle('on', on); if (on) p.parentNode.appendChild(p); });
    }
    function wire() {
      svg.addEventListener('pointerover', e => { const a = e.target.closest('.mc-s'); if (a && a.dataset.id !== hot) hover(a.dataset.id); });
      svg.addEventListener('pointermove', e => { const a = e.target.closest('.mc-s'); if (!a) { if (hot && !svg.contains(document.activeElement)) hover(null); tip.hide(); return; } tip.show(tipOf(M.nodes[a.dataset.id]), e.clientX, e.clientY); });
      svg.addEventListener('pointerleave', () => { hover(null); tip.hide(); });
      svg.addEventListener('focusin', e => { const a = e.target.closest('.mc-s'); if (a) { svg.querySelectorAll('.mc-s').forEach(x => x.setAttribute('tabindex', x === a ? '0' : '-1')); hover(a.dataset.id); tip.near(tipOf(M.nodes[a.dataset.id]), a); } });
      svg.addEventListener('focusout', () => { hover(null); tip.hide(); });
      svg.addEventListener('click', e => { const a = e.target.closest('.mc-s'); if (a && o.onSelect && o.onSelect(info(M.nodes[a.dataset.id])) === false) e.preventDefault(); });
      /* one tab stop (roving tabindex): arrows move to the nearest subject in that direction, Home / End jump to the first / last, Enter opens */
      svg.addEventListener('keydown', e => {
        const a = e.target.closest('.mc-s'), dir = { ArrowRight: 'right', ArrowLeft: 'left', ArrowDown: 'down', ArrowUp: 'up' }[e.key]; if (!a || (!dir && e.key !== 'Home' && e.key !== 'End')) return;
        const all = Array.from(svg.querySelectorAll('.mc-s')), rs = all.map(s => { const b = s.querySelector('.mc-c').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
        e.preventDefault();
        if (!dir) { const ord = all.map((s, i) => i).sort((i, j) => (rs[i].y + rs[i].x * 0.35) - (rs[j].y + rs[j].x * 0.35)); all[e.key === 'Home' ? ord[0] : ord[ord.length - 1]].focus(); return; }
        const j = spatial(rs, all.indexOf(a), dir); if (j >= 0) all[j].focus();
      });
    }
    draw();
    const unF = afterFonts(() => { if (svg && svg.isConnected) draw(); });
    return { redraw: draw, focus(id) { hover(id || null); }, get labels() { return tier; }, destroy() { unF(); tip.destroy(); } };
  }
  function MiniTreemap(el, o, M) {
    const scope = o.subject && M.nodes[o.subject] ? M.nodes[o.subject] : M.root, tip = Tip();
    const sz = okSize(M, o.size);
    el.innerHTML = `<div class="tm-host" role="group" aria-label="${esc(scope.kind === 'root' ? `Treemap of the Group II syllabus, sized by ${NOUN[sz]}` : `Treemap of ${scope.name}, sized by ${NOUN[sz]}`)}"></div>`;
    const host = el.firstChild;
    if (scope.kind !== 'root') host.classList.add('tm-one');          // one subject: the hue would encode nothing, so the cells are neutral
    if (o.height) host.style.height = o.height + 'px'; else if (o.aspect) host.style.aspectRatio = String(1 / o.aspect);
    const T = Treemap(host, { M, mini: true, tip, onSelect: o.onSelect });
    const draw = () => T.render(scope, { size: okSize(M, o.size) });
    draw();
    return { redraw: draw, focus(id) { T.setSel(id ? M.nodes[id] : null); }, destroy() { T.destroy(); tip.destroy(); } };
  }
  function mountMini(el, o) {
    const M = model(GA.data.D), variant = o.variant || (o.subject ? 'treemap' : 'constellation');
    el.classList.add('mv', 'mv-mini', 'mv-' + variant);
    let inst = null, dead = false, io = null, ro = null, lastW = 0, t = null;
    const start = () => { if (dead || inst) return; inst = (variant === 'treemap' ? MiniTreemap : MiniConstellation)(el, o, M); lastW = el.clientWidth; };
    if (o.lazy !== false && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); io = null; start(); } }, { rootMargin: '240px' });
      io.observe(el);
    } else start();
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => { if (!inst) return; const w = el.clientWidth; if (Math.abs(w - lastW) < 8) return; lastW = w; clearTimeout(t); t = setTimeout(() => inst && inst.redraw(), 140); });
      ro.observe(el);
    }
    return { el, setLens() {}, focus(id) { start(); if (inst) inst.focus(id); },
      destroy() { dead = true; if (io) io.disconnect(); if (ro) ro.disconnect(); clearTimeout(t); if (inst) inst.destroy(); el.innerHTML = ''; el.classList.remove('mv', 'mv-mini', 'mv-' + variant); } };
  }

  /* ================================================================== 12. lens 1: syllabus map (treemap + list, drill-down, locate, side panel) */
  function SyllabusLens(root, ctx) {
    const { M, S, emit, tip } = ctx, D = M.D;
    S.size = okSize(M, S.size);
    let at = M.nodes[S.at] || M.nodes[S.subject] || M.root;
    if (!['root', 'subject', 'topic'].includes(at.kind)) at = M.nodes[at.parent] || M.root;
    let sel = M.nodes[S.node] || null;
    root.innerHTML = `<div class="mv-bar" role="toolbar" aria-label="Syllabus map controls">
        <div class="mv-ctl"><span class="mv-lbl" id="${uid('l')}">Size by</span>${seg('size', (M.bank ? [['marks', 'Marks'], ['pyqs', 'Questions']] : []).concat([['subs', 'Sub-topics'], ['lessons', 'Lessons'], ['minutes', 'Minutes']]), S.size, 'Size blocks by')}</div>
        <div class="mv-findw"></div>
        <div class="mv-ctl mv-vt">${seg('view', [['map', 'Map', 'grid'], ['list', 'List', 'list']], S.view === 'list' ? 'list' : 'map', 'Display as')}</div></div>
      <div class="mv-grid"><div class="mv-main">
          <div class="mv-head"><nav class="mv-crumbs" aria-label="Where you are in the map"></nav><p class="mv-note"></p></div>
          <div class="mv-canvas"><div class="tm-host" role="group" aria-label="Treemap of the syllabus"></div><div class="mv-list" hidden></div></div>
          <ul class="mv-legend" aria-label="Colour key: one colour per family of subjects"></ul>
          <p class="mv-keys">Keyboard: arrow keys move between blocks, Enter zooms in or picks, Esc zooms out.</p></div>
        <aside class="mv-panel" aria-live="polite" aria-label="Details of the selected part"></aside></div>`;
    const $ = s => root.querySelector(s), host = $('.tm-host'), list = $('.mv-list'), panel = $('.mv-panel');
    const T = Treemap(host, { M, tip, onPick: (n, role) => pick(n, role), onBack: () => up() });
    const items = [];
    M.root.children.forEach(s => { items.push({ id: s.id, label: s.name, sub: s.paper ? String(s.paper).replace(/^P/, 'Paper ') : 'Paper', hue: s.hue, sc: s.sc, alt: s.short });
      s.children.forEach(t => { if (t.kind !== 'topic') return; items.push({ id: t.id, label: t.name, sub: medN(s.name) + ' · chapter', hue: s.hue, sc: s.sc });
        t.children.forEach(n => n.kind === 'sub' && items.push({ id: n.id, label: n.name, sub: medN(s.name) + ' · ' + t.name, hue: s.hue, sc: s.sc })); }); });
    Finder($('.mv-findw'), items, it => locate(it.id), 'Locate on the map…');
    const narrow = () => root.clientWidth < 640;
    const listMode = () => S.view === 'list' || narrow();
    function save() { S.at = at.kind === 'topic' ? at.id : ''; S.subject = at.kind === 'root' ? '' : at.subject; S.node = sel && sel !== at ? sel.id : ''; emit(); }
    function pick(n, role) {
      if (role === 'group' || role === 'solo') drill(n, n);
      else if (at.kind === 'root') drill(M.nodes[n.subject], n);
      else select(n);
    }
    function drill(to, s) { at = to; sel = s || to; paint(true); save(); }
    function select(n) { sel = n; T.setSel(n); paintList(); panel.innerHTML = nodePanel(M, n, S.size); save(); }
    function up() { if (at.kind === 'root') return; const from = at; at = M.nodes[at.parent] || M.root; sel = from; paint(true); save(); setTimeout(() => T.focusSel(), 30); }
    function locate(id) {
      const n = M.nodes[id]; if (!n) return;
      const target = n.kind === 'subject' ? n : n.kind === 'topic' ? M.nodes[n.subject] : M.nodes[n.topic] || M.root;
      at = target; sel = n; paint(true); save();
      setTimeout(() => { T.ping(n.id); const b = list.querySelector(`[data-id="${n.id}"]`); if (b) b.classList.add('ping'); if (!listMode()) T.focusSel(); }, reduced() ? 20 : 480);
    }
    function crumbs() {
      const p = M.path(at.id);
      $('.mv-crumbs').innerHTML = p.map((x, i) => i === p.length - 1 ? `<b aria-current="location"${x.kind === 'root' ? '' : ` style="${hv(x)}"`}>${esc(x.kind === 'root' ? 'All papers' : x.name)}</b>` : `<button type="button" data-up="${x.id}">${esc(x.kind === 'root' ? 'All papers' : x.name)}</button>${ic('chev-r')}`).join('') +
        (at.kind !== 'root' ? `<button type="button" class="mv-upb" data-up="${at.parent}" aria-label="Zoom out">${ic('arrow-l')}<span>Zoom out</span></button>` : '');
    }
    function note() {
      const scope = at.kind === 'topic' ? at.children : at.children.flatMap(c => (c.children.length ? c.children : [c]));
      const zero = scope.filter(c => c.kind !== 'rest' && M.value(c, S.size) === 0).length;
      const what = at.kind === 'topic' ? 'sub-topic' : at.kind === 'subject' ? 'sub-topic' : 'chapter';
      const area = { marks: `Area = ICAI question marks, ${M.years[0]}–${M.years[M.years.length - 1]}`, pyqs: 'Area = number of ICAI questions', subs: 'Area = number of sub-topics in the ICAI syllabus', lessons: 'Area = number of lessons written', minutes: 'Area = reading time of the lessons' }[S.size];
      const none = { marks: 'never asked', pyqs: 'never asked', subs: 'without a sub-topic', lessons: 'without a lesson', minutes: 'without a lesson' }[S.size];
      $('.mv-note').innerHTML = `${area}${zero ? ` · ${zero} ${what}${zero === 1 ? '' : 's'} ${none} ${zero === 1 ? 'is' : 'are'} hidden${S.size !== 'subs' ? '; size by Sub-topics to see every one' : ''}` : ''}`;
    }
    function paintList() {
      if (list.hidden) return;
      const kids = at.children.filter(c => M.value(c, S.size) > 0).sort((a, b) => M.value(b, S.size) - M.value(a, S.size));
      const tot = sum(kids.map(c => M.value(c, S.size))) || 1, max = kids.length ? M.value(kids[0], S.size) : 1;
      list.innerHTML = `<div class="mv-stack" aria-hidden="true">${kids.map((c, i) => `<i class="j${i % 3}" data-id="${c.id}" style="${hv(c)};flex-grow:${M.value(c, S.size)}"></i>`).join('')}</div>
        <ol class="mv-rows" aria-label="${esc((at.kind === 'root' ? 'Papers' : at.kind === 'subject' ? 'Chapters of ' + at.name : 'Sub-topics of ' + at.name) + ', largest first')}">${kids.map(c => {
          const v = M.value(c, S.size), more = at.kind !== 'topic' && c.children.some(k => M.value(k, S.size) > 0);
          return `<li><button type="button" class="mv-row${sel && sel.id === c.id ? ' sel' : ''}" data-id="${c.id}" style="${hv(c)}" aria-label="${esc(`${c.name}: ${fmtV(v, S.size)}, ${Math.round((100 * v) / tot)}%${c.kind === 'sub' && isDone(c.id) ? ', lesson done' : ''}${more ? '. Open' : ''}`)}">
            <span class="mv-rn"><i class="mv-dot"></i><span>${esc(c.name)}</span>${c.kind === 'sub' && isDone(c.id) ? '<span class="dotl ok mv-rd">done</span>' : ''}</span><span class="mv-rb"><i style="width:${r1((100 * v) / max)}%"></i></span>
            <b class="mv-rv">${esc(fmtV(v, S.size))}</b><span class="mv-rs">${Math.round((100 * v) / tot)}%</span>${more ? ic('chev-r') : '<span></span>'}</button></li>`; }).join('')}</ol>`;
    }
    /* colour key: only on the all-subjects view (inside one subject every block has the same colour) */
    const fam = {}; M.root.children.forEach(s0 => (fam[s0.sc] = fam[s0.sc] || []).push(s0));
    const legend = Object.keys(fam).sort((a, b) => fam[a][0].rank - fam[b][0].rank)
      .map(k => `<li style="--sc:var(--viz-${k})"><i class="mv-dot" aria-hidden="true"></i>${esc(fam[k].length > 1 ? SERIES_NAME[k] : fam[k][0].name)}${fam[k].length > 1 ? ` <small>${esc(fam[k].map(x => x.short).join(', '))}</small>` : ''}</li>`).join('');
    function paint(anim) {
      crumbs(); note(); setSeg(root, 'size', S.size); setSeg(root, 'view', S.view === 'list' ? 'list' : 'map');
      const lg = $('.mv-legend'); lg.hidden = at.kind !== 'root'; if (!lg.hidden && !lg.firstChild) lg.innerHTML = legend;
      const lm = listMode();
      root.classList.toggle('narrow', narrow());
      host.hidden = lm; list.hidden = !lm; $('.mv-keys').hidden = lm;
      if (lm) paintList(); else T.render(at, { size: S.size, sel, anim });
      panel.innerHTML = nodePanel(M, sel || at, S.size);
    }
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-up],[data-go],.mv-row,.mv-seg button'); if (!b) return;
      if (b.dataset.up) { const to = M.nodes[b.dataset.up] || M.root, from = at; at = to; sel = from.kind === 'root' ? null : from; paint(true); save(); }
      else if (b.dataset.go) { const n = M.nodes[b.dataset.go]; if (n) drill(n, n); }
      else if (b.classList.contains('mv-row')) { const n = M.nodes[b.dataset.id]; if (!n) return; const more = at.kind !== 'topic' && n.children.some(k => M.value(k, S.size) > 0); if (more) drill(n, n); else select(n); }
      else { const k = b.closest('.mv-seg').dataset.k; if (k === 'size' || k === 'view') { S[k] = b.dataset.v; paint(false); save(); } }
    });
    list.addEventListener('pointermove', e => { const i = e.target.closest('.mv-stack i'); if (i) tip.show(nodeTip(M, M.nodes[i.dataset.id], S.size), e.clientX, e.clientY); else tip.hide(); });
    list.addEventListener('pointerleave', () => tip.hide());
    segKeys(root);
    let lastNarrow = null, rt = null;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { const nw = narrow(); if (nw !== lastNarrow || !listMode()) { lastNarrow = nw; paint(false); } }, 120); }) : null;
    if (ro) ro.observe(root);
    paint(false); lastNarrow = narrow();
    if (sel && sel !== at) setTimeout(() => T.ping(sel.id), 300);
    return { focus: locate, destroy() { if (ro) ro.disconnect(); clearTimeout(rt); T.destroy(); } };
  }

  /* ================================================================== 13. lens 2: prerequisite metro map */
  /** the prerequisite lens's opening subject (P2-11), '' = all subjects: 'all' in the URL is an explicit All subjects choice; else a subject in
      the URL, a picked lesson's or topic's own subject, else the learner's current subject (profile.focus, else the subject of the shared next
      step, `step()` → GA.stats.nextStep), else ''. Pure: tests/mapviz.test.js */
  function prereqStart(M, S, state, step) {
    const D = M.D, isSubj = id => !!(id && M.nodes[id] && M.nodes[id].kind === 'subject');
    if (S.subject === 'all') return '';
    if (isSubj(S.subject)) return S.subject;
    if (S.node && D.lessonById[S.node]) return D.lessonById[S.node].subject;
    if (S.node && M.nodes[S.node] && M.nodes[S.node].kind === 'topic') return M.nodes[S.node].subject;
    const f = state && state.profile && typeof state.profile.focus === 'string' ? state.profile.focus : null;
    if (isSubj(f)) return f;
    const x = typeof step === 'function' ? step() : step;
    return x && isSubj(x.subject) ? x.subject : '';
  }
  function PrereqLens(root, ctx) {
    const { M, S, emit, tip } = ctx, D = M.D;
    /* P2-11: the lens opens on the learner's current subject (profile.focus, else the subject of the shared next step), never on 334 unlabelled
       dots; a lesson in the URL opens on its own subject; 'all' in the URL is an explicit 'All subjects' choice */
    let sel = D.lessonById[S.node] ? S.node : null;
    let subject = prereqStart(M, S, learner(), () => stepOf(M, 'all'));
    let only = !!(S.only && sel), lay = null, mode = 'dots', hot = null, posList = [], allLevels = false;
    root.innerHTML = `<div class="mv-bar" role="group" aria-label="Prerequisite map controls">
        <label class="mv-ctl mv-sel"><span class="mv-lbl">Paper</span><select class="input" aria-label="Paper"><option value="">All papers</option>${D.subjects.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
        <div class="mv-findw"></div>
        <div class="mv-ctl mv-vt">${seg('view', [['map', 'Map', 'grid'], ['list', 'Levels', 'list']], S.view === 'list' ? 'list' : 'map', 'Display as')}</div></div>
      <div class="mv-grid"><div class="mv-main">
          <div class="mv-head"><p class="mv-note"></p><div class="pm-legend" aria-hidden="true"><span><i class="pm-lg big"></i>core lesson</span><span><i class="pm-lg sm"></i>${esc(tierL('standard').toLowerCase())} or ${esc(tierL('advanced').toLowerCase())}</span><span><i class="pm-lg done"></i>done</span><span><i class="pm-lg ln"></i>“needs” link</span><span><i class="pm-lg ln path"></i>path to the picked lesson</span>${D.lessons.some(l => l.status === 'legacy' || l.status === 'extra') ? '<span><span class="pm-lg-out">legacy · extra</span>outside the syllabus text</span>' : ''}</div></div>
          <div class="mv-canvas"><div class="pm-scroll" tabindex="-1"></div><div class="mv-list" hidden></div></div>
          <p class="mv-keys">Keyboard: left and right arrows follow the links, up and down stay in the same level, Enter shows the path, Esc clears it.</p></div>
        <aside class="mv-panel" aria-live="polite" aria-label="Details of the selected lesson"></aside></div>`;
    const $ = s => root.querySelector(s), scroll = $('.pm-scroll'), list = $('.mv-list'), panel = $('.mv-panel'), sub = $('select');
    sub.value = subject;
    Finder($('.mv-findw'), D.lessons.map(l => ({ id: l.id, label: l.title, sub: M.nodes[l.subject].short + ' · ' + (M.nodes[l.topic] ? M.nodes[l.topic].name : ''), hue: M.nodes[l.subject].hue, sc: M.nodes[l.subject].sc, alt: M.nodes[l.id] ? M.nodes[l.id].name : '' })),
      it => { const l = D.lessonById[it.id]; if (!only && subject && l.subject !== subject) { subject = l.subject; sub.value = subject; } choose(it.id, true); }, 'Locate a lesson…');
    const narrow = () => root.clientWidth < 640, listMode = () => S.view === 'list' || narrow();
    const save = () => { S.subject = subject || 'all'; S.node = sel || ''; S.only = only ? 1 : ''; emit(); };
    const subjOf = id => M.nodes[D.lessonById[id].subject];
    /** a lesson outside the 2027 syllabus text (P2-11: marked in the map, the levels and the panel) */
    const outOf = id => { const st = D.lessonById[id].status; return st === 'legacy' || st === 'extra' ? st : ''; };

    function build() {
      if (only && sel) {
        const ids = [...ancestors(M.G, sel), sel], lanes = D.subjects.map(s => s.id).filter(s => ids.some(id => D.lessonById[id].subject === s));
        return { mode: 'label', nodes: ids.map(id => ({ id, lane: D.lessonById[id].subject, rank: M.rankOf(id) })), lanes: lanes.map(k => ({ key: k, name: M.nodes[k].name, hue: M.nodes[k].hue })) };
      }
      if (subject) {
        const S0 = M.nodes[subject], own = D.lessons.filter(l => l.subject === subject).map(l => l.id), set = new Set(own), ext = new Set();
        own.forEach(id => M.G.preds[id].forEach(p => { if (!set.has(p)) ext.add(p); }));
        const all = own.concat([...ext]), L = layer(all, M.edges);
        const nodes = own.map(id => ({ id, lane: D.lessonById[id].topic, rank: M.rankOf(id) }))
          .concat([...ext].map(id => ({ id, lane: '_ext', rank: M.rankOf(id), ext: true, level: Math.max(0, Math.min(...M.G.succs[id].filter(x => set.has(x)).map(x => L.level[x])) - 1) })));
        const lanes = (ext.size ? [{ key: '_ext', name: 'From other papers', hue: 250, ext: true }] : []).concat(S0.children.filter(t => t.kind === 'topic' && t.lessons).map(t => ({ key: t.id, name: t.name, hue: t.hue })));
        return { mode: 'label', nodes, lanes };
      }
      return { mode: 'dots', nodes: D.lessons.map(l => ({ id: l.id, lane: 'all', rank: M.rankOf(l.id) })), lanes: [{ key: 'all' }] };
    }
    const G = { colW: 166, rowH: 66, stationY: 14, labelW: 112, padL: 176, padT: 38, padR: 132, padB: 12, laneGap: 10 };
    const GD = { colW: 60, rowH: 15, padL: 26, padT: 34, padR: 26, padB: 16, laneGap: 0, align: 'center' };
    const rOf = (id, dots) => { const t = D.lessonById[id].tier; return dots ? (t === 'core' ? 4.6 : 3.6) : t === 'core' ? 6.8 : 5.4; };
    function drawMap() {
      const B = build(); mode = B.mode;
      const ids = new Set(B.nodes.map(n => n.id)), edges = M.edges.filter(e => ids.has(e.from) && ids.has(e.to));
      let opt = G;
      if (mode === 'dots') { const lv = layer([...ids], edges).levels, room = (scroll.clientWidth || 760) - GD.padL - GD.padR - 2; opt = Object.assign({}, GD, { colW: clamp(Math.floor(room / Math.max(1, lv - 1)), 34, 72) }); }
      lay = metroLayout(B.nodes, edges, Object.assign({ lanes: B.lanes.map(l => l.key) }, opt));
      const P = lay.pos, W = Math.ceil(lay.width), H = Math.ceil(lay.height), extSet = new Set(B.nodes.filter(n => n.ext).map(n => n.id));
      const occ = new Set(Object.values(P).map(p => p.level + ':' + Math.round(p.y)));
      const blocked = (y, l0, l1) => { for (let l = l0; l <= l1; l++) if (occ.has(l + ':' + Math.round(y))) return true; return false; };
      let s = `<svg class="pm pm-${mode}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(mode === 'dots' ? `Prerequisite map of all ${B.nodes.length} lessons, ${lay.levels} levels deep` : `Prerequisite map: ${B.nodes.length} lessons in ${lay.levels} levels`)}">`;
      if (mode === 'label') s += '<g class="pm-lanes">' + lay.lanes.map((ln, i) => `<rect class="pm-band${i % 2 ? ' alt' : ''}${B.lanes.find(x => x.key === ln.key).ext ? ' ext' : ''}" x="0" y="${ln.y - 5}" width="${W}" height="${ln.h + 10}"/>`).join('') + '</g>';
      s += '<g class="pm-cols">' + Array.from({ length: lay.levels }, (_, i) => `<text x="${opt.padL + i * opt.colW - (mode === 'dots' ? 0 : 6)}" y="${mode === 'dots' ? 18 : 22}" class="pm-step${mode === 'dots' ? ' c' : ''}">${mode === 'dots' ? i + 1 : 'Level ' + (i + 1)}</text>`).join('') + '</g>';
      s += '<g class="pm-edges">' + edges.map(e => {
        const a = P[e.from], b = P[e.to];
        const d = mode === 'dots' ? `M${a.x + 4},${a.y} C${r1((a.x + b.x) / 2)},${a.y} ${r1((a.x + b.x) / 2)},${b.y} ${b.x - 4},${b.y}` : route(a, b, { r: rOf(e.from), colW: G.colW, labelW: G.labelW, blocked, corridor: 9 });
        return `<path class="pm-e" data-f="${e.from}" data-t="${e.to}" d="${d}"/>`; }).join('') + '</g>';
      s += '<g class="pm-st">' + B.nodes.map(n => {
        const l = D.lessonById[n.id], p = P[n.id], sj = subjOf(n.id), r = rOf(n.id, mode === 'dots'), done = isDone(n.id);
        const cls = `pm-s t-${l.tier}${done ? ' done' : ''}${n.ext ? ' ext' : ''}${outOf(n.id) ? ' out' : ''}`;
        const out = outOf(n.id);
        const lbl = `${l.title}. ${sj.name}, ${l.minutes} minutes, ${tierL(l.tier)}${out ? `, ${out}: ${STATUS_W[out]}` : ''}${done ? ', done' : ''}. ${M.G.preds[n.id].length} prerequisites.`;
        let inner = `<circle class="pm-c" r="${r}"/>`;
        if (mode === 'label') {
          const t = fitLabel((n.ext ? sj.short + ' · ' : '') + l.title + (out ? ' · ' + out : ''), G.labelW + 16, 3 * 12.5 + 4, { charW: 5.75, lineH: 12.5, padX: 0, padY: 0, maxLines: 3, minChars: 3 });
          inner = `<rect class="pm-hit" x="${-r - 6}" y="${-r - 7}" width="${G.labelW + 18}" height="${G.rowH - 8}" rx="8"/>` + inner +
            `<text class="pm-t" x="${-r}" y="${r + 13}">${(t ? t.lines : [l.title]).map((x, j) => `<tspan x="${-r}" dy="${j ? 12.5 : 0}">${esc(x)}</tspan>`).join('')}</text>`;
        } else inner = `<circle class="pm-hit" r="9"/>` + inner;
        return `<g class="${cls}" data-id="${n.id}" transform="translate(${p.x} ${p.y})" tabindex="-1" role="button" aria-label="${esc(lbl)}">${inner}</g>`;
      }).join('') + '</g></svg>';
      const lanesH = mode !== 'label' ? '' : `<div class="pm-lanecol" style="width:${G.padL - 16}px;height:${H}px" aria-hidden="true">${lay.lanes.map((ln, i) => { const L = B.lanes.find(x => x.key === ln.key);
        return `<div class="pm-lab${i % 2 ? ' alt' : ''}${L.ext ? ' ext' : ''}" style="top:${ln.y - 5}px;height:${ln.h + 10}px"><b>${esc(L.name)}</b><small>${ln.n} lesson${ln.n === 1 ? '' : 's'}</small></div>`; }).join('')}</div>`;
      scroll.innerHTML = `<div class="pm-in" style="width:${W}px;height:${H}px">${lanesH}${s}</div>`;
      posList = B.nodes.map(n => ({ id: n.id, x: P[n.id].x, y: P[n.id].y, level: P[n.id].level }));
      const first = scroll.querySelector(sel ? `.pm-s[data-id="${sel}"]` : '.pm-s'); if (first) first.tabIndex = 0;
      highlight();
    }
    /* phones fold the level list after level 3 (P2-11): the summary and the subject picker come first, the rest is one tap away */
    const FOLD = 3;
    function paintList() {
      /* levels count the scope's own lessons (as the note and the panel do); prerequisites from other subjects come first as their own group */
      const B = build(), extIds = B.nodes.filter(n => n.ext).map(n => n.id), ids = B.nodes.filter(n => !n.ext).map(n => n.id), L = layer(ids, M.edges), steps = [];
      ids.slice().sort((a, b) => L.level[a] - L.level[b] || M.rankOf(a) - M.rankOf(b)).forEach(id => (steps[L.level[id]] = steps[L.level[id]] || []).push(id));
      const selAt = sel ? steps.findIndex(st => st && st.includes(sel)) : -1;
      const fold = narrow() && !only && !allLevels && steps.length > FOLD + 1 && selAt < FOLD;
      const shown = fold ? steps.slice(0, FOLD) : steps, rest = fold ? steps.slice(FOLD) : [], restN = rest.reduce((n, st) => n + st.length, 0);
      const row = id => { const l = D.lessonById[id], sj = subjOf(id), out = outOf(id);
        return `<li><button type="button" class="pm-li${isDone(id) ? ' done' : ''}" data-id="${id}" style="${hv(sj)}"><i class="mv-st${isDone(id) ? ' on' : ''}" aria-hidden="true"></i><span class="pm-lt">${esc(l.title)}${isDone(id) ? '<span class="sr"> (done)</span>' : ''}${out ? ` <span class="dotl warn pm-out">${out}</span><span class="sr"> (${esc(STATUS_W[out])})</span>` : ''}</span><small>${esc(medN(sj.name))} · ${l.minutes} min${l.tier && l.tier !== 'core' ? ' · ' + esc(tierL(l.tier)) : ''}</small></button></li>`; };   // the tier only when it is not core (P2-09)
      const group = (title, st, cls) => `<li class="pm-step-l${cls ? ' ' + cls : ''}"><h3>${title} <small>${st.length} lesson${st.length === 1 ? '' : 's'}</small></h3><ul>${st.map(row).join('')}</ul></li>`;
      const ext = extIds.sort((a, b) => M.rankOf(a) - M.rankOf(b)), EXT = 4, extShown = fold && !ext.includes(sel) ? ext.slice(0, EXT) : ext, extHid = ext.length - extShown.length;
      const extG = ext.length ? `<li class="pm-step-l ext"><h3>From other subjects <small>${ext.length} lesson${ext.length === 1 ? '' : 's'}</small></h3><ul>${extShown.map(row).join('')}</ul></li>` : '';
      list.innerHTML = `<ol class="pm-list">${extG}${shown.map((st, i) => group('Level ' + (i + 1), st)).join('')}</ol>` +
        (fold ? `<button type="button" class="btn pm-more" data-act="levels">${ic('chev-d')}<span>Show levels ${FOLD + 1}–${steps.length} · ${restN} more lesson${restN === 1 ? '' : 's'}${extHid ? ` and ${extHid} from other subjects` : ''}</span></button>` : '');
      highlight();
    }
    function highlight() {
      const anc = sel ? ancestors(M.G, sel) : new Set(), next = new Set(sel ? M.G.succs[sel] : []), on = id => id === sel || anc.has(id);
      const svg = scroll.querySelector('svg');
      if (svg) {
        svg.classList.toggle('has-sel', !!sel);
        svg.querySelectorAll('.pm-s').forEach(g => { const id = g.dataset.id; g.classList.toggle('sel', id === sel); g.classList.toggle('on', anc.has(id)); g.classList.toggle('next', next.has(id)); });
        svg.querySelectorAll('.pm-e').forEach(p => { p.classList.toggle('on', on(p.dataset.f) && on(p.dataset.t)); p.classList.toggle('next', p.dataset.f === sel); });
        const g = sel && svg.querySelector(`.pm-e.on, .pm-e.next`); if (g) g.parentNode.appendChild(g);       // nothing else to reorder
        svg.querySelectorAll('.pm-e.on, .pm-e.next').forEach(p => p.parentNode.appendChild(p));
      }
      list.classList.toggle('has-sel', !!sel);
      list.querySelectorAll('.pm-li').forEach(b => { const id = b.dataset.id; b.classList.toggle('sel', id === sel); b.classList.toggle('on', anc.has(id)); b.classList.toggle('next', next.has(id)); });
      panel.innerHTML = panelHtml();
      $('.mv-note').textContent = noteText();
    }
    function noteText() {
      if (only && sel) { const an = ancestors(M.G, sel), ns = new Set([...an, sel].map(id => D.lessonById[id].subject)).size; return `The ${an.size} lesson${an.size === 1 ? '' : 's'} to learn before “${D.lessonById[sel].title}”, from ${ns} paper${ns === 1 ? '' : 's'}${listMode() ? '' : ', one lane per paper'}.`; }
      const levels = ids => layer(ids, M.edges).levels, pick = touchUI() ? 'tap' : 'pick';
      if (!D.lessons.length) return 'No lesson is written yet: each new lesson appears here as a dot, joined to the lessons it builds on.';
      if (subject) { const own = D.lessons.filter(l => l.subject === subject).map(l => l.id); if (!own.length) return `${M.nodes[subject].name}: no lesson written yet.`; return `${M.nodes[subject].name}: ${own.length} lessons in ${levels(own)} levels${listMode() ? '' : ', one lane per chapter'}. Each ${listMode() ? 'level needs only the levels above it' : 'line is a “needs” link'}; ${pick} a lesson to light up its path.`; }
      return `All ${D.lessons.length} lessons and ${nf(M.edges.length)} “needs” links, ${levels(D.lessons.map(l => l.id))} levels deep. ${U2.cap(pick)} ${listMode() ? 'a lesson' : 'a dot'} to light up everything you should learn first, or choose a paper${listMode() ? '' : ' to read every title'}.`;
    }
    const pickRow = (id, note) => `<li><button type="button" data-pick="${id}"><i class="mv-st${isDone(id) ? ' on' : ''}" aria-hidden="true"></i><span>${esc(D.lessonById[id].title)}${isDone(id) ? '<span class="sr"> (done)</span>' : ''}</span><small>${note}</small></button></li>`;
    const subjRow = (k, note, label) => `<li><button type="button" data-subj="${k}" style="${hv(M.nodes[k])}"><i class="mv-dot"></i><span>${esc(label || medN(M.nodes[k].name))}</span><small>${note}</small></button></li>`;
    function panelHtml() {
      if (sel) {
        const l = D.lessonById[sel], sj = subjOf(sel), tp = M.nodes[l.topic], anc = ancestors(M.G, sel), ord = topoOrder([...anc], M.edges, M.rankOf);
        const mins = sum(ord.map(id => D.lessonById[id].minutes || 0)), dn = ord.filter(isDone).length, first = ord.find(id => !isDone(id));
        const deps = M.G.succs[sel].slice().sort((a, b) => M.rankOf(a) - M.rankOf(b)), all = descendants(M.G, sel).size, out = outOf(sel);
        const direct = M.G.preds[sel].slice().sort((a, b) => ord.indexOf(a) - ord.indexOf(b));
        /* P2-11: with more ancestors than direct needs, the whole chain is one link ('Everything to learn first: 27 lessons · 12.7 h →'), which
           shows only that path (the deep link #/map?lens=prereq&node=<id>&only=1 opens the same view) */
        const more = anc.size > direct.length;
        const allBtn = more ? `<a class="mv-all" href="#/map?lens=prereq&amp;node=${encodeURIComponent(sel)}&amp;only=1" data-act="only" aria-pressed="${only}">${only ? `<span>Show the whole map</span>` : `<span>Everything to learn first: <b>${anc.size} lessons · ${esc(dur(mins))}</b>${dn ? ` · ${dn} done` : ''}</span>`}${ic(only ? 'arrow-l' : 'arrow-r')}</a>` : '';
        return `<p class="mv-pk" style="${hv(sj)}"><i class="mv-dot"></i><span>${esc(sj.name)}${tp ? ' · ' + esc(tp.name) : ''}</span></p><h2 class="mv-ph">${esc(l.title)}</h2>
          <p class="mv-pm">${l.minutes} min · ${esc(tierL(l.tier))}${out ? ` · <span class="dotl warn">${out}</span> ${esc(STATUS_W[out])}` : ''}${isDone(sel) ? ' · <span class="dotl ok">done</span>' : ''}</p>
          <div class="btns"><a class="btn pop sm" href="#/l/${sel}">Open the lesson ${ic('arrow-r')}</a>${anc.size && !more ? `<button type="button" class="btn sm" data-act="only" aria-pressed="${only}">${only ? 'Show the whole map' : 'Only this path'}</button>` : ''}</div>
          <div class="mv-sec"><h3>Needs first <small>${direct.length ? `${direct.length} lesson${direct.length === 1 ? '' : 's'} directly` : 'nothing'}</small></h3>
          ${direct.length ? `<ol class="mv-ls">${direct.slice(0, 8).map(id => lessonRow(M, id, id === first ? 'Start here' : '')).join('')}</ol>${direct.length > 8 ? `<p class="mv-pm">and ${direct.length - 8} more</p>` : ''}${allBtn}
            ${first ? (!direct.includes(first) ? `<p class="mv-pm mv-sh">Start with the first not done:</p><ol class="mv-ls">${lessonRow(M, first, 'Start here')}</ol>` : '') : `<p class="mv-pm"><span class="dotl ok">Every prerequisite is done.</span></p>`}` : '<p class="mv-pm">No prerequisites: you can start here.</p>'}</div>
          <div class="mv-sec"><h3>Unlocks <small>${deps.length} directly · ${all} in total</small></h3>${deps.length ? `<ul class="mv-ls">${deps.slice(0, 6).map(id => pickRow(id, esc(subjOf(id).short))).join('')}</ul>` : '<p class="mv-pm">No lesson needs this one directly.</p>'}</div>`;
      }
      const pool = subject ? D.lessons.filter(l => l.subject === subject).map(l => l.id) : D.lessons.map(l => l.id), set = new Set(pool);
      const pe = M.edges.filter(e => set.has(e.from) && set.has(e.to)), L = layer(pool, pe), chain = longestChain(pool, pe);
      const roots = pool.filter(id => L.level[id] === 0).sort((a, b) => M.rankOf(a) - M.rankOf(b));
      const reachN = id => [...descendants(M.G, id)].filter(x => set.has(x)).length;
      const key = pool.map(id => [id, reachN(id)]).sort((a, b) => b[1] - a[1] || M.rankOf(a[0]) - M.rankOf(b[0])).slice(0, 5);
      const mins = sum(pool.map(id => D.lessonById[id].minutes || 0));
      /* the overview's one coral (D18): the shared next lesson, within the chosen subject when there is one (P0-08) */
      const st = stepOf(M, subject ? 'subject:' + subject : 'all'), stS = st && st.id && D.lessonById[st.id] ? M.nodes[D.lessonById[st.id].subject] : null;
      const cta = st ? stepBtn(st, `${st.label}${!subject && stS ? ' · ' + medN(stS.name) : st.minutes ? ' · ' + st.minutes + ' min' : ''}`)
        : st === null ? (!pool.length ? doneBtn('Lessons are being written', subject ? `Open ${medN(M.nodes[subject].name)}` : 'Open the syllabus', subject ? '#/s/' + subject : '#/syllabus')
          : !M.bank ? doneBtn(`Every ${subject ? medN(M.nodes[subject].name) + ' ' : ''}lesson written so far is done`, 'Review your flashcards', '#/flash')
          : subject ? doneBtn(`Every ${medN(M.nodes[subject].name)} lesson done`, `Practise ${M.nodes[subject].name} questions`, `#/pyq?subject=${subject}&practise=10`) : doneBtn('Every syllabus lesson done', 'Take a full mock', '#/test?new=mock')) : '';
      let h = `<p class="mv-pk"${subject ? ` style="${hv(M.nodes[subject])}"` : ''}>${subject ? '<i class="mv-dot"></i>' : ''}<span>Learning order · ${subject ? esc(M.nodes[subject].name) : 'all papers'}</span></p>
        <h2 class="mv-ph">${pool.length ? `${pool.length} ${pool.length === 1 ? 'lesson' : 'lessons'} in ${L.levels} ${L.levels === 1 ? 'level' : 'levels'}` : 'No lesson written yet'}</h2><p class="mv-pp">${pool.length ? `${dur(mins)} of reading, joined by ${nf(pe.length)} “needs” links.${chain.length > 1 ? ` The longest chain runs <b>${chain.length} lessons</b>, from “${esc(D.lessonById[chain[0]].title)}” to “${esc(D.lessonById[chain[chain.length - 1]].title)}”.` : ''}` : `The lessons of ${subject ? esc(M.nodes[subject].name) : 'Group II'} appear here as they are written, joined by the lessons each one needs first.`}</p>
        ${cta}
        ${key.length ? `<div class="mv-sec"><h3>Most built-on lessons <small>needed by</small></h3><ul class="mv-ls">${key.map(([id, k]) => pickRow(id, `${k} lesson${k === 1 ? '' : 's'}`)).join('')}</ul></div>` : ''}`;
      if (subject) {
        if (roots.length) h += `<div class="mv-sec"><h3>Start here <small>no prerequisite inside ${esc(M.nodes[subject].short)}</small></h3><ul class="mv-ls">${roots.slice(0, 6).map(id => pickRow(id, `${D.lessonById[id].minutes} min`)).join('')}</ul></div>`;
        const ext = {}; M.edges.forEach(e => { if (set.has(e.to) && !set.has(e.from)) { const k = D.lessonById[e.from].subject; ext[k] = (ext[k] || 0) + 1; } });
        const ek = Object.keys(ext).sort((a, b) => ext[b] - ext[a]);
        if (ek.length) h += `<div class="mv-sec"><h3>Builds on <small>“needs” links</small></h3><ul class="mv-ls mv-sj">${ek.map(k => subjRow(k, String(ext[k]))).join('')}</ul></div>`;
      } else {
        const by = U2.countBy(pool, id => D.lessonById[id].subject);
        h += `<div class="mv-sec"><h3>Pick a paper to read every title <small>lessons</small></h3><ul class="mv-ls mv-sj two">${D.subjects.map(sb => subjRow(sb.id, String(by[sb.id] || 0))).join('')}</ul></div>`;
      }
      return h;
    }
    function choose(id, scrollTo) {
      sel = id && sel === id && !scrollTo ? null : id;
      if (!sel) only = false;
      if (only) paint(); else if (listMode() && sel && !list.querySelector(`.pm-li[data-id="${sel}"]`)) paintList(); else highlight();
      if (listMode()) {
        const b = list.querySelector(`.pm-li[data-id="${sel}"]`);
        if (b && scrollTo) b.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
        else if (sel && narrow()) toPanel();         // phones: the panel above the levels holds the picked lesson's path
      } else if (sel && scrollTo) centerOn(sel);
      save();
    }
    /* phones: bring the panel (first on the page) into view below the sticky top bar */
    const toPanel = () => {
      const r = panel.getBoundingClientRect(), top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar')) || 64;
      if (r.top >= top && r.top < innerHeight * 0.5) return;
      g.scrollTo({ top: Math.max(0, r.top + g.scrollY - top - 10), behavior: reduced() ? 'auto' : 'smooth' });
    };
    function centerOn(id) {
      const p = lay && lay.pos[id]; if (!p) return;
      scroll.scrollTo({ left: Math.max(0, p.x - scroll.clientWidth / 2), top: Math.max(0, p.y - scroll.clientHeight / 2), behavior: reduced() ? 'auto' : 'smooth' });
    }
    function paint() {
      setSeg(root, 'view', S.view === 'list' ? 'list' : 'map');
      root.classList.toggle('narrow', narrow());
      const lm = listMode(); scroll.hidden = lm; list.hidden = !lm; root.querySelector('.pm-legend').hidden = lm; $('.mv-keys').hidden = lm;
      if (lm) { lay = null; paintList(); } else drawMap();
      if (sel) setTimeout(() => (lm ? null : centerOn(sel)), 60);
    }
    /* pointer: labelled stations are their own hit areas; the dense overview uses the nearest dot within 14 px */
    const nearest = e => {
      const svg = scroll.querySelector('svg'); if (!svg || !posList.length) return null;
      const b = svg.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      let best = null, bd = 196; posList.forEach(p => { const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = p.id; } });
      return best;
    };
    const tipOf = id => { const l = D.lessonById[id], sj = subjOf(id), a = ancestors(M.G, id).size, dd = descendants(M.G, id).size;
      return tipH(String(l.minutes), 'min', l.title, [`${sj.name}${M.nodes[l.topic] ? ' · ' + M.nodes[l.topic].name : ''}`, `${tierL(l.tier)}${outOf(id) ? ' · ' + outOf(id) : ''}${isDone(id) ? ' · done' : ''}`, `${a} lesson${a === 1 ? '' : 's'} to learn first · unlocks ${dd}`]); };
    const setHot = id => { if (hot === id) return; hot = id; scroll.querySelectorAll('.pm-s.hot').forEach(g => g.classList.remove('hot')); if (id) { const g = scroll.querySelector(`.pm-s[data-id="${id}"]`); if (g) g.classList.add('hot'); } };
    let drag = null;
    scroll.addEventListener('pointermove', e => {
      if (drag) { scroll.scrollLeft = drag.l - (e.clientX - drag.x); scroll.scrollTop = drag.t - (e.clientY - drag.y); if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 4) drag.moved = true; return; }
      const g0 = e.target.closest('.pm-s'), id = g0 ? g0.dataset.id : mode === 'dots' ? nearest(e) : null;
      setHot(id); scroll.classList.toggle('pt', !!id);
      if (id) tip.show(tipOf(id), e.clientX, e.clientY); else tip.hide();
    });
    scroll.addEventListener('pointerleave', () => { setHot(null); tip.hide(); });
    scroll.addEventListener('pointerdown', e => { if (e.button !== 0 || e.pointerType === 'touch' || hot) return; drag = { x: e.clientX, y: e.clientY, l: scroll.scrollLeft, t: scroll.scrollTop, moved: false }; scroll.classList.add('grab'); });
    const onUp = () => { if (drag) { scroll.classList.remove('grab'); setTimeout(() => (drag = null), 0); } };
    g.addEventListener('pointerup', onUp);
    scroll.addEventListener('click', e => {
      if (drag && drag.moved) return;
      const g0 = e.target.closest('.pm-s'), id = g0 ? g0.dataset.id : mode === 'dots' ? nearest(e) : null;
      if (id) choose(id, false); else if (sel) choose(null);
    });
    scroll.addEventListener('focusin', e => { const g0 = e.target.closest('.pm-s'); if (g0) { scroll.querySelectorAll('.pm-s').forEach(x => (x.tabIndex = -1)); g0.tabIndex = 0; tip.near(tipOf(g0.dataset.id), g0); setHot(g0.dataset.id); } });
    scroll.addEventListener('focusout', () => { tip.hide(); setHot(null); });
    scroll.addEventListener('keydown', e => {
      const g0 = e.target.closest('.pm-s'); if (!g0) return;
      const id = g0.dataset.id, me = posList.find(p => p.id === id); let to = null;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(id, false); return; }
      if (e.key === 'Escape') { if (sel) { e.preventDefault(); choose(null); } return; }
      const near = (cands, f) => cands.sort((a, b) => f(a) - f(b))[0];
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const ids = e.key === 'ArrowRight' ? M.G.succs[id] : M.G.preds[id], cands = posList.filter(p => ids.includes(p.id));
        const alt = posList.filter(p => (e.key === 'ArrowRight' ? p.level === me.level + 1 : p.level === me.level - 1));
        const c = near(cands.length ? cands : alt, p => Math.abs(p.y - me.y)); to = c && c.id;
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const c = near(posList.filter(p => p.level === me.level && (e.key === 'ArrowDown' ? p.y > me.y : p.y < me.y)), p => Math.abs(p.y - me.y)); to = c && c.id;
      } else return;
      e.preventDefault();
      if (to) { const t = scroll.querySelector(`.pm-s[data-id="${to}"]`); if (t) { t.focus(); const p = lay.pos[to]; if (p && (p.x < scroll.scrollLeft + 40 || p.x > scroll.scrollLeft + scroll.clientWidth - 160)) scroll.scrollLeft = p.x - scroll.clientWidth / 2; } }
    });
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-pick],[data-subj],[data-act],.pm-li,.mv-seg button'); if (!b) return;
      if (b.dataset.pick) { const id = b.dataset.pick; if (!only && subject && D.lessonById[id].subject !== subject && mode !== 'dots') { subject = D.lessonById[id].subject; sub.value = subject; sel = id; paint(); save(); setTimeout(() => centerOn(id), 80); } else choose(id, true); }
      else if (b.dataset.subj) { subject = b.dataset.subj; sub.value = subject; only = false; allLevels = false; paint(); save(); }
      else if (b.dataset.act === 'only') { e.preventDefault(); toggleOnly(); }
      else if (b.dataset.act === 'levels') { allLevels = true; paintList(); const nb = list.querySelectorAll('.pm-step-l:not(.ext)')[FOLD]; const f = nb && nb.querySelector('.pm-li'); if (f) f.focus({ preventScroll: true }); }
      else if (b.classList.contains('pm-li')) choose(b.dataset.id, false);
      else if (b.closest('.mv-seg').dataset.k === 'view') { S.view = b.dataset.v; paint(); save(); }
    });
    const toggleOnly = () => { if (!sel) return; only = !only; paint(); save(); setTimeout(() => { const b = panel.querySelector('[data-act="only"]'); if (b) b.focus({ preventScroll: true }); }, 0); };
    sub.addEventListener('change', () => { subject = sub.value; only = false; allLevels = false; paint(); save(); });
    segKeys(root);
    let lastNarrow = narrow(), rt = null;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { if (narrow() !== lastNarrow) { lastNarrow = narrow(); paint(); } }, 140); }) : null;
    if (ro) ro.observe(root);
    paint();
    return { focus(id) { if (D.lessonById[id]) { subject = D.lessonById[id].subject; sub.value = subject; sel = id; paint(); save(); } }, destroy() { if (ro) ro.disconnect(); clearTimeout(rt); g.removeEventListener('pointerup', onUp); } };
  }
  const U2 = { countBy: (arr, f) => arr.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {}), cap: x => (x ? x[0].toUpperCase() + x.slice(1) : x) };

  /* ================================================================== 14. lens 3: exam map (year x subject / topic matrix, brush, annotations) */
  function ExamLens(root, ctx) {
    const { M, S, emit, tip } = ctx, D = M.D, Y = M.years, Y0 = Y[0], Y1 = Y[Y.length - 1];
    /* no ICAI question bank yet: the year x paper matrix has nothing to show, so the lens says so (and one coral to the syllabus lens) */
    if (!M.bank || !Y.length) {
      const card = GA.ui && GA.ui.bankEmptyCard ? GA.ui.bankEmptyCard({ cta: '<a class="btn pop" href="#/map">Open the syllabus map</a>' })
        : `<div class="empty"><b>${esc(bankEmptyLine())}</b></div>`;
      root.innerHTML = `<div class="xm-none">${card}<p class="mv-pm">The exam map draws each paper's marks by attempt once ICAI's past papers, RTPs and MTPs are in the question bank.</p></div>`;
      return { focus() {}, destroy() {} };
    }
    let cache = null;
    S.by = S.by === 'topic' ? 'topic' : 'subject'; S.metric = S.metric === 'share' ? 'share' : 'marks';
    if (!['syllabus', 'marks', 'trend'].includes(S.sort)) S.sort = 'syllabus';
    const nodeSubj = M.nodes[S.node] ? M.nodes[S.node].subject : '';
    const biggest = () => (M.root.children.filter(s => s.id !== 'ga').sort((a, b) => b.marks - a.marks)[0] || M.root.children[0]).id;
    let subject = (M.nodes[S.subject] && M.nodes[S.subject].kind === 'subject' && S.subject) || nodeSubj || biggest(), from = clamp(+S.from || Y0, Y0, Y1), to = clamp(+S.to || Y1, Y0, Y1);
    if (from > to) [from, to] = [to, from];
    let mx = null, flashKey = M.nodes[S.node] ? (S.by === 'topic' ? (M.nodes[S.node].kind === 'topic' ? S.node : M.nodes[S.node].topic) : M.nodes[S.node].subject) : null;
    const allYears = () => from === Y0 && to === Y1;
    const presets = [['all', 'All years', Y0, Y1], ['p10', 'Last 10', Y[Math.max(0, Y.length - 10)], Y1], ['p5', 'Last 5', Y[Math.max(0, Y.length - 5)], Y1]];
    root.innerHTML = `<div class="mv-bar" role="toolbar" aria-label="Exam map controls">
        <div class="mv-ctl"><span class="mv-lbl">Rows</span>${seg('by', [['subject', 'Papers'], ['topic', 'Chapters']], S.by, 'Rows')}</div>
        <label class="mv-ctl mv-sel xm-subj"><span class="mv-lbl">Paper</span><select class="input" aria-label="Paper for chapter rows">${D.subjects.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
        <div class="mv-ctl"><span class="mv-lbl">Show</span>${seg('metric', [['marks', 'Marks per paper'], ['share', 'Share of paper']], S.metric, 'Value shown')}</div>
        <div class="mv-ctl"><span class="mv-lbl">Years</span><div class="seg xm-pre" role="group" aria-label="Year range presets">${presets.map(p => `<button type="button" data-pre="${p[0]}" aria-pressed="false">${p[1]}</button>`).join('')}</div></div>
        <label class="mv-ctl mv-sel"><span class="mv-lbl">Sort</span><select class="input xm-sort" aria-label="Sort rows"><option value="syllabus">Syllabus order</option><option value="marks">Most marks</option><option value="trend">Biggest rise</option></select></label>
        <label class="mv-ctl xm-vals"><span class="switch"><input type="checkbox" aria-label="Show values in cells"><span></span></span><span class="mv-lbl">Values</span></label></div>
      <ul class="xm-notes" aria-live="polite" aria-label="What changed in the selected years"></ul>
      <div class="xm-wrap" tabindex="-1"></div>
      <div class="xm-foot"></div>`;
    const $ = s => root.querySelector(s), wrap = $('.xm-wrap'), subSel = $('.xm-subj select'), sortSel = $('.xm-sort'), valsCb = $('.xm-vals input');
    subSel.value = subject; sortSel.value = S.sort; valsCb.checked = !!S.vals;
    const binSize = () => { const w = wrap.clientWidth; return !w ? 1 : w < 620 ? 4 : w < 1000 ? 2 : 1; };     // whole matrix visible: 4-year bins on phones, 2-year on tablets
    const rowsDef = () => (S.by === 'topic' ? M.nodes[subject].children.filter(t => t.kind === 'topic') : M.root.children).map(n => ({ key: n.id, name: n.name, short: n.short, hue: n.hue, sc: n.sc, node: n }));
    const rowKey = S2 => (S2 === 'topic' ? q => q.topic : q => q.subject);
    const has = (row, p) => hasSection(row.node.subject, p);
    const unit = () => (S.metric === 'share' ? '%' : '');
    const fmtC = v => (v == null ? '' : S.metric === 'share' ? (v >= 10 ? Math.round(v) : fx(v, 1)) : v >= 10 ? Math.round(v) : fx(v, 1));
    const colLabel = c => (c.from === c.to ? String(c.from) : `${c.from}–${String(c.to).slice(2)}`);
    const yearsTxt = ys => (ys.length === 1 ? String(ys[0]) : `${ys[0]}–${ys[ys.length - 1]}`);
    const pyqQ = (r, c) => `#/pyq?${S.by === 'topic' ? 'topic' : 'subject'}=${encodeURIComponent(r.key)}&` + (c.from === c.to ? `year=${c.from}` : `from=${c.from}&to=${c.to}`);
    /* P0-11: the notes, the per-paper column, the trend arrows and the sparklines come from the per-year matrix (yearMatrix's row numbers and
       annotate() never depend on the bin), so they read the same at every width; binning only groups the drawn cells */
    /* P2-13: the trend column (arrow, sparkline, 'Biggest rise' sort) always reads the share series, like the notes above it, so a row's arrow
       and its note never disagree and the 150-mark 2007–08 papers do not tilt the arrows */
    function compute() {
      const r = examRows(D.questions, D.papers, rowsDef(), rowKey(S.by), { from, to, has, bin: binSize(), metric: S.metric, sort: S.sort });
      mx = r.mx;
      return { rows: r.rows, ann: r.ann };
    }
    /** the trend cell: first half vs second half of the share series, in percentage points of the paper, with words for screen readers */
    const trendTxt = r => {
      if (!(r.span >= 4)) return '<span class="xm-d"></span>';
      const d = r.shTrend.delta, up = d >= 0.05, dn = d <= -0.05, v = fx(Math.abs(d), 1);
      return `<span class="xm-d"><span aria-hidden="true">${up ? '▲ ' : dn ? '▼ ' : ''}${v}</span><span class="sr">${up ? 'up' : dn ? 'down' : 'steady,'} ${v} points of the paper, first half to second half</span></span>`;
    };
    function spark(vals, hue) {
      const v = vals.filter(x => x != null); if (v.length < 2) return '';
      const w = 64, h = 18, max = Math.max(...v, 0.01), pts = v.map((x, i) => `${r1((i * (w - 4)) / (v.length - 1) + 2)},${r1(h - 2 - (x / max) * (h - 4))}`);
      return `<svg class="xm-sp" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts.join(' ')}"/><circle cx="${pts[pts.length - 1].split(',')[0]}" cy="${pts[pts.length - 1].split(',')[1]}" r="2.4"/></svg>`;
    }
    function paint() {
      const { rows, ann } = compute(), cols = mx.cols, N = cols.length, max = mx.max || 1;
      cache = rows;
      const i0 = cols.findIndex(c => c.inRange), i1 = N - 1 - cols.slice().reverse().findIndex(c => c.inRange);
      root.classList.toggle('narrow', root.clientWidth < 640); root.classList.toggle('binned', N < Y.length);
      $('.xm-subj').hidden = S.by !== 'topic';
      setSeg(root, 'by', S.by); setSeg(root, 'metric', S.metric);
      root.querySelectorAll('[data-pre]').forEach(b => { const p = presets.find(x => x[0] === b.dataset.pre); b.classList.toggle('on', p[2] === from && p[3] === to); b.setAttribute('aria-pressed', String(p[2] === from && p[3] === to)); });
      const rangeTxt = from === to ? String(from) : `${from}–${to}`;
      const what = S.metric === 'share' ? 'share of each paper’s marks' : 'marks per paper';
      wrap.innerHTML = `<table class="xm${S.vals ? ' vals' : ''}" role="grid" aria-label="${esc(`${S.by === 'topic' ? 'Chapters of ' + M.nodes[subject].name : 'Papers'} by year: ${what}`)}" style="--n:${N}">
        <thead><tr class="xm-br"><th class="xm-corner" rowspan="2" scope="col"><span>${S.by === 'topic' ? 'Chapter' : 'Paper'}</span><small>${rangeTxt}</small></th>
          <td class="xm-brush" colspan="${N}"><div class="xm-track"><div class="xm-band" style="left:${(100 * i0) / N}%;width:${(100 * (i1 - i0 + 1)) / N}%">
            <span class="xm-h" data-h="0" role="slider" tabindex="0" aria-label="First year of the range" aria-valuemin="${cols[0].from}" aria-valuemax="${cols[N - 1].from}" aria-valuenow="${cols[i0].from}" aria-valuetext="${cols[i0].from}"></span>
            <span class="xm-h" data-h="1" role="slider" tabindex="0" aria-label="Last year of the range" aria-valuemin="${cols[0].to}" aria-valuemax="${cols[N - 1].to}" aria-valuenow="${cols[i1].to}" aria-valuetext="${cols[i1].to}"></span></div></div></td>
          <th class="xm-ah" rowspan="2" scope="col">${S.metric === 'share' ? 'Share' : 'Per paper'}<small>${rangeTxt}</small></th><th class="xm-th" rowspan="2" scope="col">Trend<small>share, points</small></th></tr>
          <tr class="xm-yr">${cols.map(c => `<th scope="col" class="${c.inRange ? '' : 'out'}"><a href="#/pyq?${c.from === c.to ? 'year=' + c.from : `from=${c.from}&to=${c.to}`}" tabindex="-1" title="${esc(`${colLabel(c)}: ${c.papers} paper${c.papers === 1 ? '' : 's'}`)}">${N < Y.length ? colLabel(c) : `<span class="xm-y4">${c.from}</span><span class="xm-y2">’${String(c.from).slice(2)}</span>`}</a></th>`).join('')}</tr></thead>
        <tbody>${rows.map((r, i) => `<tr data-k="${r.key}" style="${hv(r)}" class="${r.key === flashKey ? 'flash' : ''}">
          <th scope="row"><button type="button" class="xm-rh" data-r="${i}" data-c="-1" tabindex="${i === 0 ? 0 : -1}"><i class="mv-dot"></i><span class="xm-rn"><span class="xm-nf">${esc(r.name)}</span><span class="xm-ns">${esc(shortName(r.name, 20))}</span></span><small>${nf(r.n)} Qs</small></button></th>
          ${r.cells.map((c, j) => { const p = c.na || !max ? 0 : Math.round(100 * Math.pow((c.v || 0) / max, 0.8)), part = !c.na && c.part > 0;
            return `<td class="${cols[j].inRange ? '' : 'out'}"><button type="button" class="xm-c${c.na ? ' na' : c.n ? '' : ' z'}${part ? ' part' : ''}${p > 56 && !part ? ' hi' : ''}" data-r="${i}" data-c="${j}" tabindex="-1" style="--p:${p}%${part ? `;--na:${(100 * c.part).toFixed(1)}%` : ''}"${c.n ? '' : ' aria-disabled="true"'} aria-label="${esc(cellAria(r, c, cols[j]))}">${S.vals && c.n ? fmtC(c.v) : ''}</button></td>`; }).join('')}
          <td class="xm-avg">${r.span ? fx(r.avg, 1) + unit() : '—'}</td><td class="xm-tr">${spark(r.shSeries, r.hue)}${trendTxt(r)}</td></tr>`).join('')}</tbody>
        <tfoot><tr><th scope="row">Papers</th>${cols.map(c => `<td class="${c.inRange ? '' : 'out'}">${c.papers}</td>`).join('')}<td></td><td></td></tr></tfoot></table>`;
      notes(ann, rows);
      foot(max);
      wireBrush(cols);
    }
    /* a binned cell part of whose years had no section for the row (GA 2007–10): its value covers the years that did */
    const partTxt = (c, col) => (c.part > 0 && c.naYears.length ? `${yearsTxt(col.years.filter(y => !c.naYears.includes(y)))} only; no General Aptitude section in ${yearsTxt(c.naYears)}` : '');
    function cellAria(r, c, col) {
      if (c.na) return `${r.name}, ${colLabel(col)}: no General Aptitude section ${col.from === col.to ? 'that year' : 'in those years'}`;
      if (!c.n) return `${r.name}, ${colLabel(col)}: not asked`;
      const pt = partTxt(c, col);
      return `${r.name}, ${colLabel(col)}: ${fmtC(c.v)}${S.metric === 'share' ? ' percent of the marks' : ' marks per paper'}${pt ? ` (${pt})` : ''}, ${c.n} question${c.n === 1 ? '' : 's'}. Open them.`;
    }
    function notes(ann, rows) {
      const nm = k => { const n = M.nodes[k]; return n ? n.name : k; }, rangeOf = h => (h[0] === h[1] ? String(h[0]) : `${h[0]}–${h[1]}`);
      const items = ann.map(a => {
        if (a.kind === 'up' || a.kind === 'down') return `<li><button type="button" class="xm-note ${a.kind}" data-k="${a.key}"><span class="xm-nk">${ic(a.kind === 'up' ? 'chev-u' : 'chev-d')}${a.kind === 'up' ? 'Rising' : 'Falling'}</span><b>${esc(nm(a.key))}</b><span class="xm-nd">${fx(a.row.trend.first, 1)}% → ${fx(a.row.trend.second, 1)}% of each paper’s marks <small>${rangeOf(a.halves[0])} vs ${rangeOf(a.halves[1])}</small></span></button></li>`;
        if (a.kind === 'every') return `<li><button type="button" class="xm-note every" data-k="${a.keys[0]}"><span class="xm-nk">${ic('check')}Every year</span><b>${a.value} of ${a.of} ${S.by === 'topic' ? 'topics' : 'subjects'}</b><span class="xm-nd">asked in every year ${from === to ? from : from + '–' + to} <small>${esc(a.keys.slice(0, 3).map(k => M.nodes[k].short || nm(k)).join(', '))}${a.keys.length > 3 ? ` and ${a.keys.length - 3} more` : ''}</small></span></button></li>`;
        if (a.kind === 'quiet') return `<li><button type="button" class="xm-note quiet" data-k="${a.key}"><span class="xm-nk">${ic('clock')}Gone quiet</span><b>${esc(nm(a.key))}</b><span class="xm-nd">last asked in ${a.value} <small>${nf(a.row.marks)} marks in ${rangeOf([from, a.value])}</small></span></button></li>`;
        return '';
      });
      /* the exam lens's one coral (D18): practise 10 questions from what is in view (the bank's session link, ARCHITECTURE §10.4) */
      const yr = from === to ? String(from) : `${from}–${to}`, sub = S.by === 'topic' ? M.nodes[subject] : null;
      const q = (sub ? 'subject=' + sub.id + '&' : '') + (allYears() ? '' : from === to ? `year=${from}&` : `from=${from}&to=${to}&`) + 'practise=10';
      items.push(`<li class="xm-go"><a class="btn pop mv-go two" href="#/pyq?${esc(q)}"><span><small>Practise 10 questions</small>${esc(sub ? `${sub.name}, ${yr}` : `All subjects, ${yr}`)}</span>${ic('arrow-r')}</a></li>`);
      $('.xm-notes').innerHTML = items.join('');
    }
    function foot(max) {
      const big = D.papers.filter(p => p.marks > 100).map(p => p.year), noGa = uniq(D.papers.filter(p => !p.ga).map(p => p.year));
      const ticks = [0, max / 2, max].map(v => fmtC(v) + unit());
      const era = S.metric === 'marks' && big.length && from <= Math.max(...big) ? `The ${uniq(big).join(' and ')} papers carried 150 marks; every paper since has 100. Switch to “Share of paper” to compare eras fairly. ` : '';
      const part = mx.rows.some(r => r.cells.some(c => !c.na && c.part > 0));
      $('.xm-foot').innerHTML = `<div class="xm-scale" aria-hidden="true"><span class="xm-k"><span>${ticks[0]}</span><i></i><span>${ticks[2]}</span><em>${S.metric === 'share' ? 'share of the paper’s marks' : 'marks per paper'}</em></span><span class="xm-k"><span class="xm-sw z"></span><em>not asked</em></span>${noGa.length ? `<span class="xm-k"><span class="xm-sw na"></span><em>no GA section (${noGa[0]}–${noGa[noGa.length - 1]})</em></span>` : ''}${part ? '<span class="xm-k"><span class="xm-sw part"></span><em>a GA section in only some of those years</em></span>' : ''}</div>
        <p>${era}Years with several papers (${uniq(D.papers.map(p => p.year)).filter(y => D.papers.filter(p => p.year === y).length > 1).length} of them) are averaged, not added. ${touchUI() ? 'Tap' : 'Click'} a cell for those questions.</p>`;
    }
    /* brush: drag on the track to pick a range, drag a handle to resize, drag the band to move it; arrow keys on a handle */
    function wireBrush(cols) {
      const track = $('.xm-track'), band = $('.xm-band'), N = cols.length;
      let i0 = cols.findIndex(c => c.inRange), i1 = N - 1 - cols.slice().reverse().findIndex(c => c.inRange), drag = null;
      const colAt = x => { const b = track.getBoundingClientRect(); return clamp(Math.floor(((x - b.left) / b.width) * N), 0, N - 1); };
      const show = () => { band.style.left = (100 * i0) / N + '%'; band.style.width = (100 * (i1 - i0 + 1)) / N + '%'; wrap.querySelectorAll('tr').forEach(tr => { const cells = tr.querySelectorAll(tr.classList.contains('xm-yr') ? 'th' : 'td:not(.xm-avg):not(.xm-tr):not(.xm-brush)'); cells.forEach((td, j) => td.classList.toggle('out', j < i0 || j > i1)); }); };
      const commit = () => { from = cols[i0].from; to = cols[i1].to; S.from = allYears() ? '' : from; S.to = allYears() ? '' : to; paint(); emit(); };
      track.addEventListener('pointerdown', e => {
        const c = colAt(e.clientX), h = e.target.closest('.xm-h');
        drag = h ? { m: h.dataset.h === '0' ? 'a' : 'b' } : c >= i0 && c <= i1 && !(i0 === 0 && i1 === N - 1) ? { m: 'move', off: c - i0, w: i1 - i0 } : { m: 'new', s: c };
        track.setPointerCapture(e.pointerId); move(e); e.preventDefault();
      });
      const move = e => {
        if (!drag) return; const c = colAt(e.clientX);
        if (drag.m === 'a') i0 = Math.min(c, i1); else if (drag.m === 'b') i1 = Math.max(c, i0);
        else if (drag.m === 'move') { i0 = clamp(c - drag.off, 0, N - 1 - drag.w); i1 = i0 + drag.w; } else { i0 = Math.min(drag.s, c); i1 = Math.max(drag.s, c); }
        show();
      };
      track.addEventListener('pointermove', move);
      track.addEventListener('pointerup', () => { if (drag) { drag = null; commit(); } });
      track.addEventListener('pointercancel', () => { drag = null; commit(); });
      let kt = null;
      track.querySelectorAll('.xm-h').forEach(h => h.addEventListener('keydown', e => {
        const a = h.dataset.h === '0', d = e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : 0;
        if (!d && e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        if (a) i0 = e.key === 'Home' ? 0 : e.key === 'End' ? i1 : clamp(i0 + d, 0, i1); else i1 = e.key === 'Home' ? i0 : e.key === 'End' ? N - 1 : clamp(i1 + d, i0, N - 1);
        show(); clearTimeout(kt); kt = setTimeout(() => { commit(); const n = $(`.xm-h[data-h="${a ? 0 : 1}"]`); if (n) n.focus(); }, 380);
      }));
    }
    /* cells: tooltip, click -> questions, grid keyboard */
    const look = b => { if (!cache) cache = compute().rows; const r = +b.dataset.r, c = +b.dataset.c; return { row: cache[r], cell: c >= 0 ? cache[r].cells[c] : null, col: c >= 0 ? mx.cols[c] : null }; };
    const tipOf = b => {
      const { row, cell, col } = look(b);
      if (!cell) return tipH(fx(row.avg, 1) + unit(), S.metric === 'share' ? 'of the marks' : 'marks per paper', row.name, [`${from === to ? from : from + '–' + to} · ${nf(row.n)} questions · ${nf(row.marks)} marks`, `asked in ${row.asked} of ${row.span} years`, row.span >= 4 ? `share of the paper: first half ${fx(row.shTrend.first, 1)}% → second half ${fx(row.shTrend.second, 1)}%` : '', `${touchUI() ? 'Tap' : 'Click'} for these questions`]);
      if (cell.na) return tipH('n/a', '', `${row.name} · ${colLabel(col)}`, [`No General Aptitude section ${col.from === col.to ? 'that year' : 'in those years'}`]);
      if (!cell.n) return tipH('0', S.metric === 'share' ? '%' : 'marks', `${row.name} · ${colLabel(col)}`, ['Not asked']);
      return tipH(fmtC(cell.v) + unit(), S.metric === 'share' ? 'of the marks' : 'marks per paper', `${row.name} · ${colLabel(col)}`, [`${cell.n} question${cell.n === 1 ? '' : 's'} · ${nf(cell.marks)} marks`, cell.papers > 1 ? `average of ${cell.papers} papers` : '1 paper', partTxt(cell, col), `${touchUI() ? 'Tap' : 'Click'} to open them`]);
    };
    wrap.addEventListener('pointermove', e => { const b = e.target.closest('.xm-c, .xm-rh'); if (b) tip.show(tipOf(b), e.clientX, e.clientY); else tip.hide(); });
    wrap.addEventListener('pointerleave', () => tip.hide());
    wrap.addEventListener('focusin', e => { const b = e.target.closest('.xm-c, .xm-rh'); if (b) { tip.near(tipOf(b), b); wrap.querySelectorAll('.xm-c, .xm-rh').forEach(x => (x.tabIndex = -1)); b.tabIndex = 0; } });
    wrap.addEventListener('focusout', () => tip.hide());
    wrap.addEventListener('click', e => {
      const b = e.target.closest('.xm-c, .xm-rh'); if (!b) return;
      const { row, cell, col } = look(b);
      if (!cell) { location.hash = `#/pyq?${S.by === 'topic' ? 'topic' : 'subject'}=${encodeURIComponent(row.key)}${allYears() ? '' : `&from=${from}&to=${to}`}`; return; }
      if (cell.n) location.hash = pyqQ(row, col);
    });
    wrap.addEventListener('keydown', e => {
      const b = e.target.closest('.xm-c, .xm-rh'); if (!b) return;
      let r = +b.dataset.r, c = +b.dataset.c; const R = wrap.querySelectorAll('tbody tr').length, C = mx.cols.length;
      if (e.key === 'ArrowRight') c = Math.min(C - 1, c + 1); else if (e.key === 'ArrowLeft') c = Math.max(-1, c - 1); else if (e.key === 'ArrowDown') r = Math.min(R - 1, r + 1); else if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
      else if (e.key === 'Home') c = -1; else if (e.key === 'End') c = C - 1; else return;
      e.preventDefault(); const n = wrap.querySelector(`[data-r="${r}"][data-c="${c}"]`); if (n) n.focus();
    });
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-pre], .xm-note, .mv-seg button'); if (!b) return;
      if (b.dataset.pre) { const p = presets.find(x => x[0] === b.dataset.pre); from = p[2]; to = p[3]; S.from = allYears() ? '' : from; S.to = allYears() ? '' : to; }
      else if (b.classList.contains('xm-note')) { flashKey = b.dataset.k; const tr = wrap.querySelector(`tr[data-k="${b.dataset.k}"]`); if (tr) { tr.classList.remove('flash'); void tr.offsetWidth; tr.classList.add('flash'); tr.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); const h = tr.querySelector('.xm-rh'); if (h) h.focus({ preventScroll: true }); } return; }
      else { const k = b.closest('.mv-seg').dataset.k; S[k] = b.dataset.v; if (k === 'by') S.subject = S.by === 'topic' ? subject : ''; }
      cache = null; paint(); emit();
    });
    subSel.addEventListener('change', () => { subject = subSel.value; S.subject = subject; cache = null; paint(); emit(); });
    sortSel.addEventListener('change', () => { S.sort = sortSel.value; cache = null; paint(); emit(); });
    valsCb.addEventListener('change', () => { S.vals = valsCb.checked ? 1 : ''; paint(); emit(); });
    segKeys(root);
    let lastBin = null, rt = null;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { const b = binSize(); if (b !== lastBin) { lastBin = b; paint(); } }, 140); }) : null;
    if (ro) ro.observe(wrap);
    if (S.by === 'topic') S.subject = subject;
    paint(); lastBin = binSize();
    if (flashKey) setTimeout(() => { const tr = wrap.querySelector(`tr[data-k="${flashKey}"]`); if (tr) tr.scrollIntoView({ block: 'nearest' }); }, 60);
    return { focus(id) { const n = M.nodes[id]; if (!n) return; if (n.kind === 'subject') { S.by = 'subject'; flashKey = n.id; } else { S.by = 'topic'; subject = n.subject; subSel.value = subject; S.subject = subject; flashKey = n.kind === 'topic' ? n.id : n.topic; } paint(); emit(); }, destroy() { if (ro) ro.disconnect(); clearTimeout(rt); } };
  }

  /* ================================================================== 15. mount() */
  const LENSES = { syllabus: SyllabusLens, prereq: PrereqLens, exam: ExamLens };
  const KEYS = ['lens', 'subject', 'at', 'node', 'size', 'view', 'only', 'by', 'metric', 'from', 'to', 'sort', 'vals'];
  const DEF = { lens: 'syllabus', size: '', view: 'map', by: 'subject', metric: 'marks', sort: 'syllabus' };     // size: the lens's own default (defSize)
  function cleanState(S) { const o = {}; KEYS.forEach(k => { const v = S[k]; if (v == null || v === '' || v === false || v === 0 || DEF[k] === v) return; o[k] = v === true ? 1 : v; }); return o; }
  function mountFull(el, o) {
    const M = model(GA.data.D), tip = Tip(), S = Object.assign({}, o.state || {});
    if (o.lens) S.lens = o.lens; if (o.subject) S.subject = o.subject; if (o.node) S.node = o.node;
    el.classList.add('mv', 'mv-full');
    let L = null, name = null;
    const ctx = { M, S, tip, emit: () => { if (o.onState) o.onState(cleanState(S)); } };
    function open(n) {
      if (L && L.destroy) L.destroy();
      tip.hide(); name = LENSES[n] ? n : 'syllabus'; S.lens = name;
      el.innerHTML = `<div class="mv-lens mv-${name}"></div>`;
      L = LENSES[name](el.firstChild, ctx);
    }
    open(S.lens || 'syllabus');
    return { el, get lens() { return name; }, get state() { return cleanState(S); },
      setLens(n) { if (n !== name) { open(n); ctx.emit(); } }, focus(id) { if (L && L.focus) L.focus(id); },
      destroy() { if (L && L.destroy) L.destroy(); tip.destroy(); el.innerHTML = ''; el.classList.remove('mv', 'mv-full'); } };
  }
  /** GA.mapviz.mount(el, {mode:'mini'|'full', lens, subject, node, state, onSelect, onState, variant, labels, size, aspect, height, lazy}) -> {destroy, setLens, focus} */
  function mount(el, o) {
    o = o || {};
    if (!el) throw new Error('mapviz.mount: no element');
    if (!GA.data || !GA.data.D) throw new Error('mapviz.mount: GA.data.D is not ready (call after boot)');
    ensureCss();
    return o.mode === 'full' ? mountFull(el, o) : mountMini(el, o);
  }

  GA.mapviz = Object.assign(GA.mapviz || {}, Pure, { mount, cleanState, LENSES: Object.keys(LENSES), panelOrder: orderIn, panelHtml: nodePanel });   // panelHtml: the syllabus lens's side panel as HTML (tests)
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.mapviz;
})(typeof window !== 'undefined' ? window : globalThis);
