/* PassBook — PassBook Wrapped (/wrapped): a story-style recap of the learner's own study, made only from local data (GA.engage.wrapped).
   Slides: tap (left third back, the rest forward), arrow keys, Space to pause, progress segments; auto-advance pauses on hold, on a hidden tab and with
   prefers-reduced-motion (then it never starts). Range picker: this week, this month, all time, the stretch before the last mock (?range=); from exam
   day to 30 days after, the exam season takes this week's place and is preselected (P2-72). "Save as image" draws the summary on a <canvas> and
   downloads a PNG. Not enough data -> an honest empty state with Tick, the mascot, whose coral is the real gap (P2-36).
   Which slides exist is GA.engage.slideKeys (the one slide model, also what a teaser's story bars count); slides(), summary() and facts() are pure
   and Node-tested. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {}); GA.views = GA.views || {};
  const U = GA.util || require('../core/util.js');
  const esc = s => U.esc(s);
  const DUR = 6500;

  /* ---------------------------------------------------------------- formatting (U's shared formats, P3-27) */
  const nf = n => U.nf(Math.round(n));
  const pct = x => (x == null ? '—' : Math.round(x * 100) + '%');
  const hm = min => U.hm(min);
  const hourName = h => (h === 0 ? 'midnight' : h === 12 ? 'noon' : (h % 12) + (h < 12 ? ' am' : ' pm'));
  const dayName = k => U.fmtDay(k, { weekday: 'short', day: 'numeric', month: 'short' });
  const shortDay = k => U.fmtDay(k, { day: 'numeric', month: 'short' });
  function span(a, b) {
    const [ay, am, ad] = a.split('-').map(Number), [by, bm, bd] = b.split('-').map(Number), mo = m => U.MON[m - 1];
    if (a === b) return U.fmtDay(a, { day: 'numeric', month: 'short', year: 'numeric' });
    if (ay === by) return am === bm ? `${ad} – ${bd} ${mo(bm)} ${by}` : `${ad} ${mo(am)} – ${bd} ${mo(bm)} ${by}`;
    return `${U.fmtDay(a)} – ${U.fmtDay(b)}`;
  }
  /** what the in-range longest run is called: the streak chip counts the whole run, a recap only the days inside its range (P2-36) */
  const RUN_LABEL = { week: 'longest run this week', month: 'longest run this month', all: 'longest streak', mock: 'longest run before the mock', season: 'longest run this season' };
  const runLabel = r => RUN_LABEL[r && r.key] || 'longest run in this recap';
  const marks = x => U.fmtMarks(Math.round(x * 100) / 100);
  const plural = (n, w, pl) => `${nf(n)} ${n === 1 ? w : pl || w + 's'}`;
  function hourQuip(h) { return h >= 5 && h < 12 ? 'A morning person, apparently.' : h >= 12 && h < 17 ? 'Afternoon focus.' : h >= 17 && h < 21 ? 'The evening shift.' : 'Night owl detected.'; }
  function accQuip(a) { return a >= 0.75 ? 'The examiners should be a little worried.' : a >= 0.5 ? 'More right than wrong. Keep stacking.' : 'Every miss went into your error notebook. That is the point.'; }

  /* ---------------------------------------------------------------- small real-data figures (currentColor, decorative: the numbers are in the text) */
  const VW = 374;
  /** fs = the figure's smallest label in viewBox units (0: no labels): fitSlide hides a figure whose labels would read under FIG.label px (P3-39).
      A figure drawn a little smaller than its box keeps to the left edge, with the slide's text. */
  const svgWrap = (h, body, fs) => `<svg class="wr-fig" viewBox="0 0 ${VW} ${h}" width="${VW}" height="${h}" preserveAspectRatio="xMinYMid meet"${fs ? ` data-fs="${fs}"` : ''} aria-hidden="true" focusable="false">${body}</svg>`;
  const SNOW = (x, y, r) => { const d = []; for (let k = 0; k < 3; k++) { const a = Math.PI / 3 * k + Math.PI / 2, dx = Math.cos(a) * r, dy = Math.sin(a) * r; d.push(`M${(x - dx).toFixed(1)} ${(y - dy).toFixed(1)}L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`); } return `<path d="${d.join('')}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>`; };
  /** an exam day that kept the streak (P2-73): a ring with 'EXAM' (or 'E' in the small calendar), never a freeze's snowflake */
  const EXAMMARK = (x, y, r, tall) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r - 1).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2"/>` +
    `<text x="${x.toFixed(1)}" y="${(y + (tall ? 3.2 : 3.4)).toFixed(1)}" text-anchor="middle" font-size="${tall ? 8.6 : 9.5}" font-weight="850" fill="currentColor" font-family="Inter, sans-serif">${tall ? 'EXAM' : 'E'}</text>`;
  /** the range as a calendar of dots: filled = active, ring = idle, snowflake = a freeze covered it, 'EXAM' = an exam day kept it */
  function calendarFig(series, today) {
    if (!series || !series.length) return '';
    const E = GA.engage, wd = k => E.day.weekday(k);
    const start = E.day.addDays(series[0].day, -wd(series[0].day));
    const by = {}; series.forEach(x => (by[x.day] = x));
    const total = E.day.between(start, series[series.length - 1].day) + 1, weeks = Math.ceil(total / 7);
    const tall = weeks <= 8;
    const cols = tall ? 7 : weeks, rows = tall ? weeks : 7;
    const pitch = Math.min(tall ? 46 : 24, VW / cols), r = pitch * (tall ? 0.34 : 0.38), top = tall ? 22 : 4, h = top + rows * pitch;
    let b = tall ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => `<text x="${(i + 0.5) * pitch}" y="13" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="JetBrains Mono, monospace">${l}</text>`).join('') : '';
    for (let i = 0; i < weeks * 7; i++) {
      const k = E.day.addDays(start, i), x = by[k]; if (!x || x.future) continue;
      const wk = Math.floor(i / 7), d = i % 7, cx = ((tall ? d : wk) + 0.5) * pitch, cy = top + ((tall ? wk : d) + 0.5) * pitch;
      if (x.active) b += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="currentColor"/>`;
      else if (x.gate) b += EXAMMARK(cx, cy, r, tall);
      else if (x.frozen) b += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r - 1).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2"/>` + SNOW(cx, cy, r * 0.55);
      else b += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.8).toFixed(1)}" fill="currentColor" opacity=".2"/>`;
      if (k === today) b += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r + 3.4).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".7"/>`;
    }
    return svgWrap(h, b, tall ? 13 : 0);
  }
  /** minutes per day (per week when the range is longer than 5 weeks); the biggest bar is solid */
  function barsFig(series) {
    if (!series || !series.length) return '';
    let pts = series.map(x => ({ k: x.day, v: x.minutes }));
    if (pts.length > 35) { const wk = []; pts.forEach((p, i) => { const j = Math.floor(i / 7); (wk[j] = wk[j] || { k: p.k, v: 0 }).v += p.v; }); pts = wk; }
    const max = Math.max(1, ...pts.map(p => p.v)), n = pts.length, gap = n > 20 ? 2 : 4, bw = (VW - gap * (n - 1)) / n, H = 150;
    const top = pts.reduce((a, p, i) => (p.v > pts[a].v ? i : a), 0);
    let b = '';
    pts.forEach((p, i) => { const h = p.v ? Math.max(4, (p.v / max) * (H - 26)) : 2; b += `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(5, bw / 2).toFixed(1)}" fill="currentColor" opacity="${i === top ? 1 : p.v ? 0.45 : 0.18}"/>`; });
    const tx = Math.min(VW - 40, Math.max(40, top * (bw + gap) + bw / 2));
    b += `<text x="${tx.toFixed(1)}" y="${(H - Math.max(4, (pts[top].v / max) * (H - 26)) - 8).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" font-family="Inter, sans-serif">${esc(hm(pts[top].v))}</text>`;
    return svgWrap(H, b, 12);
  }
  /** one dot per answer (or per k answers): filled = right, ring = missed */
  function dotsFig(pyq) {
    const N = pyq.answered; if (!N) return '';
    const k = Math.max(1, Math.ceil(N / 200)), right = Math.round(pyq.correct / k), all = Math.ceil(N / k), cols = 20, pitch = VW / cols, r = pitch * 0.32;
    let b = '';
    for (let i = 0; i < all; i++) {
      const cx = ((i % cols) + 0.5) * pitch, cy = (Math.floor(i / cols) + 0.5) * pitch;
      b += i < right ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="currentColor"/>` : `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r - 1).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".6"/>`;
    }
    const h = Math.ceil(all / cols) * pitch + 22;
    b += `<text x="0" y="${(h - 4).toFixed(1)}" font-size="12" font-weight="700" fill="currentColor" font-family="JetBrains Mono, monospace">● right  ○ missed${k > 1 ? `  · one dot = ${k} answers` : ''}</text>`;
    return svgWrap(h, b, 12);
  }
  /** accuracy by subject for the most-practised subjects; the strongest one is solid (and always among the rows, as the slide names it) */
  function subjFig(w) {
    let rows = (w.subjects || []).filter(s => s.n >= 3).slice(0, 5);
    const best = w.best && !rows.some(s => s.id === w.best.id) ? (w.subjects || []).find(s => s.id === w.best.id) : null;
    if (best) rows = rows.slice(0, 4).concat(best);
    if (rows.length < 2) return '';
    const rh = 32, H = rows.length * rh, lw = 52, bw = VW - lw - 50;
    let b = '';
    rows.forEach((s, i) => {
      const y = i * rh, on = w.best && s.id === w.best.id;
      b += `<text x="0" y="${y + 20}" font-size="12.5" font-weight="800" fill="currentColor" font-family="JetBrains Mono, monospace">${esc(s.short)}</text>` +
        `<rect x="${lw}" y="${y + 8}" width="${bw}" height="14" rx="7" fill="currentColor" opacity=".16"/>` +
        `<rect x="${lw}" y="${y + 8}" width="${Math.max(6, bw * s.acc).toFixed(1)}" height="14" rx="7" fill="currentColor" opacity="${on ? 1 : 0.5}"/>` +
        `<text x="${VW}" y="${y + 20}" text-anchor="end" font-size="12.5" font-weight="${on ? 850 : 650}" fill="currentColor" font-family="Inter, sans-serif">${Math.round(s.acc * 100)}%</text>`;
    });
    return svgWrap(H, b, 12.5);
  }
  /** every lesson as a cell: bright = finished in this period, half = finished before, faint = still ahead */
  function lessonsFig(now, before, total) {
    if (!(total > 0) || !(now > 0)) return '';
    const cols = Math.ceil(Math.sqrt(total * 1.9)), pitch = VW / cols, rows = Math.ceil(total / cols), sz = pitch * 0.72;
    let b = '';
    for (let i = 0; i < total; i++) {
      const x = (i % cols) * pitch, y = Math.floor(i / cols) * pitch, op = i < now ? 1 : i < now + before ? 0.5 : 0.16;
      b += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" rx="${(sz * 0.28).toFixed(1)}" fill="currentColor" opacity="${op}"/>`;
    }
    const h = rows * pitch + 20;
    b += `<text x="0" y="${(h - 3).toFixed(1)}" font-size="12" font-weight="700" fill="currentColor" font-family="JetBrains Mono, monospace">${nf(now + before)} of ${nf(total)} lessons done</text>`;
    return svgWrap(h, b, 12);
  }
  /** where the XP came from, as one stacked bar with a legend */
  function xpFig(by) {
    const parts = [['Questions', by.pyq], ['Tests', by.tests], ['Lessons', by.lessons], ['Labs', by.labs], ['Cards', by.cards]].filter(p => p[1] > 0);
    const tot = parts.reduce((a, p) => a + p[1], 0); if (!tot || parts.length < 2) return '';
    const ops = [1, 0.72, 0.5, 0.34, 0.22];
    let x = 0, b = '', ly = 52;
    parts.forEach(([k, v], i) => {
      const w = Math.max(3, (v / tot) * VW - 3);
      b += `<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="26" rx="6" fill="currentColor" opacity="${ops[i]}"/>`;
      x += (v / tot) * VW;
      const lx = (i % 2) * 190, yy = ly + Math.floor(i / 2) * 22;
      b += `<rect x="${lx}" y="${yy - 10}" width="11" height="11" rx="3" fill="currentColor" opacity="${ops[i]}"/><text x="${lx + 18}" y="${yy}" font-size="12.5" font-weight="650" fill="currentColor" font-family="Inter, sans-serif">${k} <tspan font-weight="850">${nf(v)}</tspan></text>`;
    });
    return svgWrap(ly + Math.ceil(parts.length / 2) * 22 - 4, b, 12.5);
  }
  /** % of marks in every finished test so far; the recapped one is solid. The label is U.pctMarks, the one score-as-percent format (P3-27): a
      negative score reads '−3%' over an empty bar, never '0%' */
  function testsFig(trend, id) {
    const pts = (trend || []).slice(-8); if (pts.length < 2) return '';
    const n = pts.length, gap = 10, bw = (VW - gap * (n - 1)) / n, H = 140;
    const label = p => (typeof p.score === 'number' && p.max > 0 ? U.pctMarks(p.score, p.max) : Math.round(Math.max(0, p.pct || 0) * 100) + '%');
    let b = '';
    pts.forEach((p, i) => { const v = Math.max(0, p.pct || 0), h = Math.max(4, v * (H - 26)), on = p.id === id; b += `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="6" fill="currentColor" opacity="${on ? 1 : 0.4}"/>` +
      `<text x="${(i * (bw + gap) + bw / 2).toFixed(1)}" y="${(H - h - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="${on ? 850 : 650}" fill="currentColor" font-family="Inter, sans-serif">${esc(label(p))}</text>`; });
    return svgWrap(H, b, 12);
  }

  /* ---------------------------------------------------------------- pure models */
  /** the toughest-topic line says exactly what was computed (P1-44): the lowest accuracy among topics answered at least MIN.hardest times */
  const minHard = () => (GA.engage && GA.engage.MIN && GA.engage.MIN.hardest) || 4;
  function toughLine(h) {
    return `Toughest topic: <b>${esc(h.name)}</b>, ${nf(h.ok)} of ${nf(h.n)} right: your lowest accuracy among the topics you answered ${nf(minHard())} or more times.`;
  }
  /** an exam's name inside a sentence: 'CA Inter January 2027' or 'Paper 4' as it is, 'your exam' in lower case */
  const inSentence = label => (/^(CA |Paper )/.test(label || '') ? label : String(label || 'your exam').toLowerCase());
  /** the intro's second line, by how long the range is (P2-72): a week, a month, a season */
  function introLine(w, range) {
    if (w.days <= 1) return 'One day at a time.';
    const of = `That is <b>${nf(w.activeDays)} of ${nf(w.days)}</b> days.`;
    if (range && range.key === 'season') return `${of} Every one of them was on the way to ${esc(inSentence(range.exam && range.exam.label))}.`;
    if (w.days <= 7) return `${of} Habits start exactly like this.`;
    if (w.days <= 31) return `${of} A month is long enough for a habit to stick.`;
    return `${of} Seasons are built one day at a time.`;
  }
  /** the closing slide's kicker; after the exam it says the exam is over ('You sat CA Inter January 2027 on 12 Jan' only for a date the learner set) */
  function endKicker(range) {
    if (range && range.key === 'season' && range.exam) {
      const x = range.exam, done = range.season === 'done';
      if (!done) return `${esc(U.cap(x.label))}: your season`;
      return x.yours ? `You sat ${esc(inSentence(x.label))} on ${esc(shortDay(x.date))}` : `${esc(U.cap(x.label))} is over`;
    }
    return { week: 'That was your week', month: 'That was your month', all: 'Your story so far', mock: 'Your run-up to the mock' }[range && range.key] || 'Your recap';
  }
  /** the slides for one recap, in GA.engage.slideKeys' order (a slide is left out when its numbers would all be zero). tone 'a' = primary fill, 'b' = ink fill */
  function slides(w, range, extra) {
    extra = extra || {};
    const out = [], label = (range && range.label) || 'All time';
    if (!w || !w.enough) return out;
    const keys = GA.engage && typeof GA.engage.slideKeys === 'function' ? GA.engage.slideKeys(w) : null, has = k => !keys || keys.indexOf(k) >= 0;
    const mockLead = range && range.key === 'mock' && w.mock ? `The days before ${esc(w.mock.title)}` : esc(span(w.from, w.to));
    const L0 = [mockLead, introLine(w, range)];
    if (w.gate && w.gate.length) L0.push(`${w.gate.length === 1 ? 'An exam day' : 'Your exam days'} (${w.gate.map(k => esc(shortDay(k))).join(' and ')}) kept the streak without a freeze.`);
    out.push({ key: 'intro', tone: 'a', kicker: `PassBook Wrapped · ${esc(label)}`, big: w.activeDays, unit: w.activeDays === 1 ? 'day you showed up' : 'days you showed up',
      lines: L0, drop: [1], mascot: 'happy', fig: typeof document !== 'undefined' && GA.engage ? calendarFig(w.series, extra.today) : '' });
    if (w.minutes > 0 && has('time')) {
      const L = [];
      if (w.topDay) L.push(`Biggest day: <b>${esc(dayName(w.topDay.day))}</b>, ${esc(hm(w.topDay.minutes))}.`);
      if (w.peakHour) L.push(`Most answers around <b>${esc(hourName(w.peakHour.hour))}</b>. ${hourQuip(w.peakHour.hour)}`);
      const hh = Math.floor(w.minutes / 60), mm = w.minutes % 60;
      out.push({ key: 'time', tone: 'b', kicker: 'Time studied', bigText: hm(w.minutes), bigParts: hh ? (mm ? [[hh, 'h'], [mm, 'min']] : [[hh, 'h']]) : [[mm, 'min']], unit: 'of focused study', lines: L,
        drop: w.peakHour && L.length > 1 ? [L.length - 1] : [], fig: barsFig(w.series) });
    }
    if (w.pyq.answered > 0 && has('pyq')) {
      const L = [`<b>${plural(w.pyq.distinct, 'different question')}</b> from ICAI's papers.`,
        `<b>${pct(w.pyq.acc)}</b> right overall${w.pyq.firstTry.n ? ` · <b>${pct(w.pyq.firstTry.acc)}</b> on the first try` : ''}.`];
      if (w.pyq.answered >= 10) L.push(accQuip(w.pyq.acc));
      out.push({ key: 'pyq', tone: 'a', kicker: 'ICAI questions', big: w.pyq.answered, unit: w.pyq.answered === 1 ? 'answer' : 'answers', lines: L, drop: L.length > 2 ? [2, 0] : [0], fig: dotsFig(w.pyq) });
    }
    if ((w.best || w.hardest) && has('subjects')) {
      const L = [];
      if (w.best) L.push(`${esc(w.best.name)}: <b>${pct(w.best.acc)}</b> right over ${plural(w.best.n, 'answer')}.`);
      if (w.hardest) L.push(toughLine(w.hardest));
      out.push(w.best ? { key: 'subjects', tone: 'b', kicker: 'Subjects', bigText: w.best.short, unit: 'was your strongest subject', lines: L, drop: [0], fig: subjFig(w), link: w.hardest ? { href: '#/pyq?topic=' + encodeURIComponent(w.hardest.id), text: 'Practise ' + w.hardest.name } : null }
        : { key: 'subjects', tone: 'b', kicker: 'Toughest topic', bigText: pct(w.hardest.acc), unit: 'right in ' + w.hardest.name, lines: L, link: { href: '#/pyq?topic=' + encodeURIComponent(w.hardest.id), text: 'Practise ' + w.hardest.name } });
    }
    const rows = [];
    if (w.lessons) rows.push({ v: w.lessons, label: w.lessons === 1 ? 'lesson finished' : 'lessons finished' });
    if (w.labs.solved) rows.push({ v: w.labs.solved, label: w.labs.solved === 1 ? 'lab challenge solved' : 'lab challenges solved' });
    else if (w.labs.runs) rows.push({ v: w.labs.runs, label: w.labs.runs === 1 ? 'lab run' : 'lab runs' });
    if (w.cards) rows.push({ v: w.cards, label: w.cards === 1 ? 'flashcard reviewed' : 'flashcards reviewed' });
    if (rows.length && has('learn')) out.push({ key: 'learn', tone: 'a', kicker: 'Learning', rows, lines: [], fig: extra.lessonsTotal ? lessonsFig(w.lessons, Math.max(0, (extra.lessonsDone || 0) - w.lessons), extra.lessonsTotal) : '' });
    const r2 = [];
    if (w.streak) r2.push({ v: w.streak, label: `${w.streak === 1 ? 'day' : 'days'}: your ${runLabel(range)}` });
    const lvName = extra.levelName || (extra.level && GA.engage && GA.engage.levelName ? GA.engage.levelName(extra.level) : '');
    if (w.xp) r2.push({ v: w.xp, label: 'XP earned' + (extra.level ? ` · level ${extra.level} now${lvName ? ', ' + lvName : ''}` : '') });
    const L2 = [];
    // the live streak, when the range's longest run does not already say it (it started before the range, or it is not the longest)
    const cur = w.current, live = cur && cur.n > 0 && w.to === (extra.today || w.to);
    if (live && (cur.n !== w.streak || cur.since < w.from)) L2.push(`Current streak: <b>${plural(cur.n, 'day')}</b>, since ${esc(shortDay(cur.since))}.`);
    if (w.frozen && w.frozen.length) L2.push(`A streak freeze covered ${w.frozen.map(k => '<b>' + esc(dayName(k)) + '</b>').join(' and ')}.`);
    if (r2.length && has('streak')) out.push({ key: 'streak', tone: 'b', kicker: 'Streak and XP', rows: r2, fig: w.xpBy ? xpFig(w.xpBy) : '', lines: L2, drop: w.frozen && w.frozen.length ? [L2.length - 1] : [] });
    if (w.mock && has('mock')) {
      const m = w.mock, L = [esc(m.title)], drop = [];
      if (m.delta != null) L.push(`<b>${m.delta >= 0 ? '+' : '−'}${marks(Math.abs(m.delta) * 100)}%</b> of the marks compared with the one before.`);
      if (m.accuracy != null) { drop.push(L.length); L.push(`${pct(m.accuracy)} of your graded answers were right${m.negative ? `; ${marks(m.negative)} marks went to negative marking` : ''}.`); }
      if (m.delta != null) drop.push(1);
      // the bars: the scored sittings of the same kind (a 'Not scored' sitting is never a 0 % bar: P0-05, P2-34)
      const trend = Array.isArray(w.trend) && w.trend.length ? w.trend : (extra.trend || []);
      out.push({ key: 'mock', tone: 'a', kicker: m.full ? 'Last mock' : 'Last test', bigText: marks(m.score), unit: `out of ${marks(m.max)} marks`, lines: L, drop, fig: testsFig(trend, m.id), link: { href: '#/test/result/' + encodeURIComponent(m.id), text: 'Open the result' } });
    }
    out.push({ key: 'summary', tone: 'b', kicker: endKicker(range), summary: summary(w, range), lines: [] });
    return out;
  }

  /** the shareable summary (the last slide and the PNG): a hero number and up to six tiles, all real */
  function summary(w, range) {
    const tiles = [];
    const add = (v, k) => { if (tiles.length < 6) tiles.push({ v, k }); };
    let hero;
    if (w.pyq.answered) hero = { v: nf(w.pyq.answered), k: w.pyq.answered === 1 ? 'question answered' : 'questions answered' };
    else if (w.lessons) hero = { v: nf(w.lessons), k: w.lessons === 1 ? 'lesson finished' : 'lessons finished' };
    else hero = { v: nf(w.activeDays), k: 'active days' };
    if (w.minutes) add(hm(w.minutes), 'studied');
    add(nf(w.activeDays), w.activeDays === 1 ? 'active day' : 'active days');
    if (w.pyq.answered) add(pct(w.pyq.acc), 'right');
    if (w.lessons && hero.k.indexOf('lesson') < 0) add(nf(w.lessons), w.lessons === 1 ? 'lesson' : 'lessons');
    if (w.streak) add(nf(w.streak) + (w.streak === 1 ? ' day' : ' days'), range && range.key !== 'all' ? 'longest run' : 'longest streak');
    if (w.xp) add(nf(w.xp), 'XP');
    if (w.cards) add(nf(w.cards), 'cards');
    if (w.labs.solved) add(nf(w.labs.solved), 'lab challenges');
    const notes = [];
    if (w.best) notes.push(['Strongest', `${w.best.name} · ${pct(w.best.acc)}`]);
    if (w.hardest) notes.push(['Toughest topic', `${w.hardest.name} · ${nf(w.hardest.ok)}/${nf(w.hardest.n)}`]);
    if (w.mock) notes.push([w.mock.full ? 'Last mock' : 'Last test', `${marks(w.mock.score)} / ${marks(w.mock.max)}`]);
    return { label: (range && range.label) || 'All time', dates: span(w.from, w.to), hero, tiles, notes };
  }

  /** the numbers table beside the story (also what a screen reader gets in one place). 'answers' are raw counts, 'questions' distinct ones, tests
      'finished' (P3-27); the longest run is named for its range and the live streak sits beside it (P2-36). */
  function facts(w, range, today) {
    const rows = [['Active days', `${nf(w.activeDays)} of ${nf(w.days)}`], ['Time studied', w.minutes ? hm(w.minutes) : '—'],
      ['Question answers', w.pyq.answered ? `${nf(w.pyq.answered)} (${plural(w.pyq.distinct, 'question')})` : '—'], ['Right', w.pyq.answered ? `${pct(w.pyq.acc)} · first try ${pct(w.pyq.firstTry.acc)}` : '—'],
      ['Strongest subject', w.best ? `${w.best.name} · ${pct(w.best.acc)} of ${nf(w.best.n)}` : '—'], ['Toughest topic', w.hardest ? `${w.hardest.name} · ${nf(w.hardest.ok)} of ${nf(w.hardest.n)}` : '—'],
      ['Lessons finished', nf(w.lessons)], ['Lab challenges', w.labs.challenges ? `${nf(w.labs.solved)} solved of ${nf(w.labs.challenges)}` : '—']];
    if (w.labs.runs != null) rows.push(['Lab runs', nf(w.labs.runs)]);
    const unscored = w.tests.filter(t => t.scored === false).length;      // a sitting of a paper with no official key is not scored (P0-05)
    rows.push(['Cards reviewed', nf(w.cards)], [U.cap(runLabel(range)), w.streak ? plural(w.streak, 'day') : '—']);
    const cur = w.current;
    if (cur && cur.n > 0 && (!today || w.to === today)) rows.push(['Current streak', `${plural(cur.n, 'day')}, since ${shortDay(cur.since)}`]);
    if (w.gate && w.gate.length) rows.push(['Exam days', w.gate.map(shortDay).join(', ')]);
    rows.push(['XP earned', nf(w.xp)], ['Tests finished', nf(w.tests.length) + (unscored ? ` (${nf(unscored)} not scored)` : '')]);
    return rows;
  }

  /* ---------------------------------------------------------------- canvas image */
  function rgba(c, a) {
    const m = /rgba?\(([^)]+)\)/.exec(c || ''); if (!m) return c;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return `rgba(${p[0]},${p[1]},${p[2]},${a == null ? (p[3] == null ? 1 : p[3]) : a})`;
  }
  function tokens(root) {
    const probe = document.createElement('i'); probe.style.cssText = 'position:absolute;visibility:hidden;width:0;height:0';
    (root || document.body).append(probe);
    const read = v => { probe.style.color = ''; probe.style.color = `var(${v})`; return GA.mascot ? GA.mascot.canvasColor(getComputedStyle(probe).color) : getComputedStyle(probe).color; };
    const t = { bg: read('--accent'), ink: read('--accent-ink'), pop: read('--pop') };
    probe.remove();
    return t;
  }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function fit(ctx, text, max, font, size) { let s = size; ctx.font = font.replace('#', s); while (s > 18 && ctx.measureText(text).width > max) { s -= 2; ctx.font = font.replace('#', s); } return s; }
  /** paint the summary card (1080 x 1350) */
  function paint(canvas, sm, col, mascotCol) {
    const W = 1080, H = 1350, ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    const F = (w, s) => `${w} ${s}px Inter, system-ui, sans-serif`, M = s => `600 ${s}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.fillStyle = col.bg; ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    for (let i = 0; i < 4; i++) { ctx.fillStyle = rgba(col.ink, 0.9); roundRect(ctx, 80 + i * 235, 70, 220, 9, 4.5); ctx.fill(); }
    ctx.fillStyle = rgba(col.ink, 0.82); ctx.font = M(30); ctx.fillText(('PassBook Wrapped · ' + sm.label).toUpperCase(), 80, 160);
    ctx.fillStyle = col.ink; ctx.font = F(650, 36); ctx.fillText(sm.dates, 80, 212);
    const hs = fit(ctx, sm.hero.v, 640, F(900, '#'), 230); ctx.font = F(900, hs); ctx.fillText(sm.hero.v, 72, 448);
    ctx.font = F(800, 52); ctx.fillText(sm.hero.k, 80, 520);
    if (GA.mascot) GA.mascot.draw(ctx, { x: 800, y: 250, size: 210, mood: 'happy', gaze: 'left', colors: mascotCol });
    const cols = 3, gx = 22, gy = 22, tw = (W - 160 - gx * (cols - 1)) / cols, th = 150, y0 = 584;
    sm.tiles.forEach((t, i) => {
      const x = 80 + (i % cols) * (tw + gx), y = y0 + Math.floor(i / cols) * (th + gy);
      ctx.fillStyle = rgba(col.ink, 0.12); roundRect(ctx, x, y, tw, th, 30); ctx.fill();
      ctx.fillStyle = col.ink; const s = fit(ctx, t.v, tw - 52, F(850, '#'), 60); ctx.font = F(850, s); ctx.fillText(t.v, x + 26, y + 80);
      ctx.fillStyle = rgba(col.ink, 0.8); const ks = fit(ctx, t.k, tw - 52, F(650, '#'), 27); ctx.font = F(650, ks); ctx.fillText(t.k, x + 26, y + 122);
    });
    let y = y0 + Math.ceil(sm.tiles.length / cols) * (th + gy) + 40;
    sm.notes.slice(0, Math.max(0, Math.floor((H - 150 - y) / 88) + 1)).forEach(([k, v]) => {
      ctx.fillStyle = rgba(col.ink, 0.78); ctx.font = M(25); ctx.fillText(k.toUpperCase(), 80, y);
      ctx.fillStyle = col.ink; const s = fit(ctx, v, 920, F(750, '#'), 38); ctx.font = F(750, s); ctx.fillText(v, 80, y + 46); y += 88;
    });
    ctx.fillStyle = rgba(col.ink, 0.25); ctx.fillRect(80, H - 112, W - 160, 2);
    ctx.fillStyle = col.ink; ctx.font = F(800, 30); ctx.fillText('PassBook', 80, H - 60);
    ctx.fillStyle = rgba(col.ink, 0.78); ctx.font = F(550, 26); const tag = 'made from my own study log · CA Inter';
    ctx.fillText(tag, W - 80 - ctx.measureText(tag).width, H - 60);
    return canvas;
  }
  async function saveImage(sm, root, name) {
    try { if (document.fonts && document.fonts.load) await Promise.all(['900 64px Inter', '850 64px Inter', '800 40px Inter', '650 30px Inter', '600 30px "JetBrains Mono"'].map(f => document.fonts.load(f).catch(() => null))); } catch (e) { /* fonts optional */ }
    const canvas = paint(document.createElement('canvas'), sm, tokens(root), GA.mascot ? GA.mascot.colors(root) : null);
    const blob = await new Promise(res => (canvas.toBlob ? canvas.toBlob(res, 'image/png') : res(null)));
    const a = document.createElement('a');
    a.download = name;
    if (blob) a.href = URL.createObjectURL(blob); else a.href = canvas.toDataURL('image/png');
    document.body.append(a); a.click(); a.remove();
    if (blob) setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    return canvas;
  }

  /* ---------------------------------------------------------------- the view */
  const RM = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** a range picker label: the season's ' season' can hide on small phones ('CA Inter January 2027'; its full name stays the label). One inline wrapper, so
      the picker's flex gap never lands between the words */
  const rangeLabel = r => (r && r.key === 'season' && / season$/.test(r.label || '')
    ? `<span>${esc(r.label.replace(/ season$/, ''))}<span class="wr-rl"> season</span></span>` : esc(r && r.label));
  let live = null;     // the mounted story (timers, listeners)

  function bigHTML(s) {
    if (s.rows) return `<div class="wr-rows">${s.rows.map(r => `<div class="wr-row"><b class="num" data-n="${r.v}">${nf(r.v)}</b><span>${esc(r.label)}</span></div>`).join('')}</div>`;
    if (s.summary) {
      const m = s.summary;
      return `<div class="wr-sum"><div class="wr-sum-h"><b class="num">${esc(m.hero.v)}</b><span>${esc(m.hero.k)}</span></div>` +
        `<div class="wr-tiles">${m.tiles.map(t => `<div class="wr-tile"><b class="num">${esc(t.v)}</b><span>${esc(t.k)}</span></div>`).join('')}</div>` +
        (m.notes.length ? `<dl class="wr-notes">${m.notes.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '') + `</div>`;
    }
    const v = s.big != null ? `<b class="wr-big num" data-n="${s.big}">${nf(s.big)}</b>`
      : s.bigParts ? `<b class="wr-big num" aria-label="${esc(s.bigText)}">${s.bigParts.map(([n, u]) => `<span data-n="${n}">${nf(n)}</span><small>${esc(u)}</small>`).join(' ')}</b>`
      : `<b class="wr-big wr-bigt">${esc(s.bigText)}</b>`;
    return `${v}<span class="wr-unit">${esc(s.unit)}</span>`;
  }
  function slideHTML(s, i, n) {
    const masc = s.mascot && GA.mascot ? `<span class="wr-masc" aria-hidden="true">${GA.mascot.svg({ size: 92, mood: s.mascot, gaze: 'left' })}</span>` : '';
    return `<div class="wr-slide t-${s.tone} k-${s.key}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${esc(s.kicker.replace(/<[^>]+>/g, ''))}" data-i="${i}" hidden>` +
      `<div class="wr-k">${s.kicker}</div>${masc}${s.fig ? `<div class="wr-viz">${s.fig}</div>` : ''}<div class="wr-body">${bigHTML(s)}</div>` +
      (s.lines.length ? `<ul class="wr-lines">${s.lines.map((l, k) => `<li${s.drop && s.drop.indexOf(k) >= 0 ? ` data-drop="${s.drop.indexOf(k)}"` : ''}>${l}</li>`).join('')}</ul>` : '') +
      (s.link ? `<a class="wr-link" href="${esc(s.link.href)}">${esc(s.link.text)} <span aria-hidden="true">→</span></a>` : '') +
      (s.key === 'summary' ? `<button class="wr-replay" type="button" data-wr="replay">${GA.icon ? GA.icon('rewind') : ''}Replay</button>` : '') + `</div>`;
  }

  function stop() {
    if (!live) return;
    clearTimeout(live.timer); live.off.forEach(f => f()); live = null;
  }

  /* ---------------------------------------------------------------- fitting a slide to its card (P3-39)
     Phone cards run from about 250 to 620 px tall, so a slide's room varies. A decorative figure is drawn only where it reads: at FIG.scale of
     its full-width size or more, with its smallest label (data-fs, viewBox units) at FIG.label px or more; otherwise it makes way, never a
     shrunken sliver (the numbers and lines say the same things). When the text alone is still too tall, the summary drops its notes, then its
     last tiles, and other slides the lines their model marks as droppable, then their last rows, until nothing is cut or squeezed (every number
     is also in 'All the numbers'). Run on every slide change, when the card changes size and once the fonts are in. */
  const FIG = { scale: 0.7, label: 8 };
  const pxOf = v => parseFloat(v) || 0;
  /** the rule, pure: a figure of viewBox vbW x vbH drawn into a box w x h px (at most maxW px wide) with its smallest label fs units */
  function figRule(w, h, maxW, vbW, vbH, fs) {
    const fw = Math.min(w, maxW > 0 ? maxW : w);
    if (!(fw > 0) || !(vbW > 0) || !(vbH > 0)) return false;
    const s = Math.min(1, Math.max(0, h) / (fw * vbH / vbW));
    return s >= FIG.scale && (!fs || fs * (fw / vbW) * s >= FIG.label);
  }
  /** true / false = draw / hide the figure in this .wr-viz; null = nothing to decide (no figure, hidden by CSS, no layout yet) */
  function figFits(viz) {
    const svg = viz.querySelector('svg.wr-fig'), cs = getComputedStyle(viz), vb = svg && svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || !vb.height || cs.display === 'none') return null;
    const w = viz.clientWidth - pxOf(cs.paddingLeft) - pxOf(cs.paddingRight), h = viz.clientHeight - pxOf(cs.paddingTop) - pxOf(cs.paddingBottom);
    if (!(w > 0)) return null;
    const mw = getComputedStyle(svg).maxWidth;
    return figRule(w, h, /px$/.test(mw) ? pxOf(mw) : 0, vb.width, vb.height, +svg.getAttribute('data-fs') || 0);
  }
  function fitSlide(el) {
    if (!el || el.hidden || !el.isConnected || !el.clientHeight) return;
    // what may go when the text alone is too tall for the card, in order: the summary's notes (last first), then its last tiles (down to two); on
    // other slides the lines the model marks (data-drop: a quip or a detail the big number or 'All the numbers' already gives), then the last rows.
    // Everything comes back first, so the figure is judged against the whole text (a larger card after a smaller one).
    const drop = el.classList.contains('k-summary') ? U.$$('.wr-notes > div', el).reverse().concat(U.$$('.wr-tile', el).slice(2).reverse())
      : U.$$('.wr-lines li[data-drop]', el).sort((a, b) => a.dataset.drop - b.dataset.drop).concat(U.$$('.wr-row', el).slice(1).reverse());
    const groups = U.$$('.wr-notes, .wr-lines', el);
    drop.concat(groups).forEach(x => x.classList.remove('wr-cut'));
    const viz = el.querySelector('.wr-viz'), fits = viz ? figFits(viz) : null;
    if (fits != null) viz.classList.toggle('off', !fits);
    const limit = el.getBoundingClientRect().bottom - pxOf(getComputedStyle(el).paddingBottom) + 1;
    const over = () => { let b = 0; for (const c of el.children) if (!c.classList.contains('wr-masc')) { const r = c.getBoundingClientRect(); if (r.height) b = Math.max(b, r.bottom); } return b > limit; };
    for (const x of drop) { if (!over()) break; x.classList.add('wr-cut'); }
    groups.forEach(g => { if (g.children.length && Array.prototype.every.call(g.children, c => c.classList.contains('wr-cut'))) g.classList.add('wr-cut'); });
  }

  function mountStory(root, list, opts) {
    stop();
    const card = root.querySelector('.wr-card'), segs = root.querySelector('.wr-segs'), pause = root.querySelector('[data-wr="pause"]'), pos = root.querySelector('.wr-pos');
    const slidesEl = root.querySelector('.wr-slides');
    const st = live = { i: -1, playing: !RM() && !(opts && opts.paused), timer: null, left: DUR, t0: 0, seen: {}, off: [], hold: null };
    const n = list.length;
    segs.innerHTML = list.map((s, i) => `<button type="button" class="wr-seg" data-go="${i}" aria-label="Slide ${i + 1}: ${esc(s.kicker.replace(/<[^>]+>/g, ''))}"><i></i></button>`).join('');
    const setPlay = p => {
      st.playing = p;
      card.classList.toggle('paused', !p);
      pause.setAttribute('aria-pressed', String(!p));
      pause.innerHTML = p ? `${GA.icon ? GA.icon('pause') : ''}<span class="wr-pl">Pause</span>` : `${GA.icon ? GA.icon('play') : ''}<span class="wr-pl">Play</span>`;
      pause.setAttribute('aria-label', p ? 'Pause the slides' : 'Play the slides');
      slidesEl.setAttribute('aria-live', p ? 'off' : 'polite');
    };
    const arm = () => {
      clearTimeout(st.timer);
      if (!st.playing || st.i >= n - 1) return;
      st.t0 = Date.now();
      st.timer = setTimeout(() => go(st.i + 1, 1), st.left);
    };
    const countUp = el => {
      const v = +el.dataset.n; if (!(v > 1) || RM()) return;
      const t0 = performance.now(), d = 650, fin = () => { el.textContent = nf(v); };
      const step = () => { const k = Math.max(0, Math.min(1, (performance.now() - t0) / d)), e = 1 - Math.pow(1 - k, 3); if (k < 1 && live === st) { el.textContent = nf(v * e); requestAnimationFrame(step); } else fin(); };
      requestAnimationFrame(step);
      setTimeout(fin, d + 120);                                                  // never left half-counted (throttled frames, background tabs)
    };
    function go(i, dir) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === st.i) return;
      const first = st.i < 0;
      const prev = slidesEl.querySelector('.wr-slide.on');
      if (prev) { prev.classList.remove('on', 'in', 'back'); prev.hidden = true; }
      const el = slidesEl.querySelector(`.wr-slide[data-i="${i}"]`);
      el.hidden = false; el.classList.add('on'); el.classList.toggle('back', dir < 0);
      fitSlide(el);                                                             // before the first paint of the slide: never a sliver (P3-39)
      if (!first) { void el.offsetWidth; el.classList.add('in'); }            // slides move on navigation only; the first one is simply there
      card.className = card.className.replace(/\bt-[ab]\b/g, '').trim() + ' t-' + list[i].tone;
      st.i = i; st.left = DUR;
      U.$$('.wr-seg', segs).forEach((s, k) => { s.classList.toggle('done', k < i); s.classList.remove('now'); if (k === i) { void s.offsetWidth; s.classList.add('now'); } s.setAttribute('aria-current', k === i ? 'step' : 'false'); });
      card.classList.toggle('last', i === n - 1);
      if (pos) pos.textContent = `${i + 1} / ${n}`;
      if (!st.seen[i]) { st.seen[i] = 1; if (!first || !opts || !opts.paused) el.querySelectorAll('[data-n]').forEach(countUp); }
      root.querySelector('[data-wr="prev"]').disabled = i === 0;
      root.querySelector('[data-wr="next"]').disabled = i === n - 1;
      if (i === n - 1 && st.playing) setPlay(false);
      arm();
    }
    const toggle = () => {
      if (st.playing) { clearTimeout(st.timer); st.left = Math.max(300, st.left - (Date.now() - st.t0)); setPlay(false); }
      else { if (st.i >= n - 1) { setPlay(true); go(0, 1); return; } setPlay(true); arm(); }
    };
    st.go = go; st.toggle = toggle;
    // pointer: a short tap navigates (left third back), holding pauses until release
    const onDown = e => {
      if (e.button > 0 || e.target.closest('a,button')) return;
      st.hold = { t: Date.now(), x: e.clientX, was: st.playing };
      if (st.playing) { clearTimeout(st.timer); st.left = Math.max(300, st.left - (Date.now() - st.t0)); card.classList.add('paused'); }
    };
    const onUp = e => {
      const h = st.hold; st.hold = null;
      if (!h) return;
      if (Date.now() - h.t < 350) { const r = card.getBoundingClientRect(); go(st.i + ((e.clientX - r.left) < r.width / 3 ? -1 : 1), (e.clientX - r.left) < r.width / 3 ? -1 : 1); if (!h.was) card.classList.add('paused'); else card.classList.remove('paused'); return; }
      if (h.was) { card.classList.remove('paused'); arm(); }
    };
    const onCancel = () => { const h = st.hold; st.hold = null; if (h && h.was) { card.classList.remove('paused'); arm(); } };
    card.addEventListener('pointerdown', onDown); card.addEventListener('pointerup', onUp); card.addEventListener('pointercancel', onCancel); card.addEventListener('pointerleave', onCancel);
    const onKey = e => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (/^(input|select|textarea)$/.test(tag) || e.target.isContentEditable) return;
      if (document.querySelector('.scrim, .modal')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(st.i + 1, 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(st.i - 1, -1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0, -1); }
      else if (e.key === 'End') { e.preventDefault(); go(n - 1, 1); }
      else if ((e.key === ' ' || e.key === 'k') && !/^(button|a)$/.test(tag)) { e.preventDefault(); toggle(); }
    };
    document.addEventListener('keydown', onKey);
    const onVis = () => { if (document.hidden && st.playing) { clearTimeout(st.timer); st.left = Math.max(300, st.left - (Date.now() - st.t0)); setPlay(false); } };
    document.addEventListener('visibilitychange', onVis);
    st.off.push(() => document.removeEventListener('keydown', onKey), () => document.removeEventListener('visibilitychange', onVis));
    // the card's size changes with the window (a phone turned, a desktop window resized) and the text's once the fonts are in: fit again. Only the
    // card is observed, and fitting never changes its size, so this cannot loop.
    const refit = () => { if (live === st) fitSlide(slidesEl.querySelector('.wr-slide.on')); };
    if (typeof ResizeObserver === 'function') { const ro = new ResizeObserver(refit); ro.observe(card); st.off.push(() => ro.disconnect()); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit, () => {});
    setPlay(st.playing);
    go(opts && opts.start || 0, 1);
    return st;
  }

  function enter(ctx, out) {
    const E = GA.engage, S = GA.store, D = GA.data && GA.data.D;
    if (GA.shell && GA.shell.crumbs) GA.shell.crumbs([['PassBook Wrapped', '#/wrapped']]);
    const today = U.today(), st = S.state;
    const R = E.ranges(st, today, D ? D.exam : undefined);
    const data = {}; R.forEach(r => (data[r.key] = E.wrapped(st, D, Object.assign({ today }, r))));
    const any = R.filter(r => data[r.key].enough);
    const want = ctx && ctx.query && ctx.query.range;
    // from exam day to 30 days after, the season is preselected (P2-72); otherwise this month, else all time
    let cur = R.find(r => r.key === want) || any.find(r => r.key === 'season') || any.find(r => r.key === 'month') || any.find(r => r.key === 'all') || any[0] || R.find(r => r.key === 'all');
    const lv = E.compute(st, D, today).level, level = lv.n;
    out.innerHTML = `<div class="wr" id="wr"><header class="wr-head"><div class="wr-ht"><h1>PassBook Wrapped</h1><p class="wr-sub"></p></div>` +
      (any.length ? `<div class="seg wr-range" role="group" aria-label="Recap period">${R.map(r => `<button type="button" data-range="${r.key}" aria-pressed="${r.key === cur.key}"${data[r.key].enough ? '' : ' class="thin"'}>${rangeLabel(r)}</button>`).join('')}</div>` : '') +
      `</header><div class="wr-main"></div></div>`;
    const root = out.querySelector('#wr'), main = root.querySelector('.wr-main'), sub = root.querySelector('.wr-sub');

    function render(r) {
      stop();
      cur = r;
      const w = data[r.key];
      root.classList.toggle('has-story', !!w.enough);
      U.$$('.wr-range button', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.range === r.key)));
      sub.innerHTML = w.enough ? `${esc(span(w.from, w.to))} · ${plural(w.activeDays, 'active day')}<span class="wr-sub-x"> · made only from your own study in this browser</span>`
        : 'A story-style recap of your own study, made only from what you did in this browser.';
      if (!w.enough) {
        main.innerHTML = emptyHTML(w, r, any, st, D);
        const say = main.querySelector('.wr-say');
        // Tick only on the true empty state (nothing to wrap in any range); a quiet range beside a full one is plain text (CONTENT_GUIDE §2b)
        if (say && GA.mascot && !any.length) GA.mascot.say(say, sayText(w, r, any), { mood: 'think', side: 'left', size: 64, gaze: 'down' });
        else if (say) say.innerHTML = `<p class="wr-quiet">${esc(sayText(w, r, any))}</p>`;
        return;
      }
      const lessonsDone = Object.keys(st.lessons || {}).filter(id => st.lessons[id] && st.lessons[id].done && (!D || D.lessonById[id])).length;
      const list = slides(w, r, { level, levelName: lv.name, today, lessonsTotal: D ? D.lessons.length : 0, lessonsDone });
      main.innerHTML = `<div class="wr-grid"><section class="wr-stage" aria-label="Your recap, as slides" aria-roledescription="carousel">` +
        `<div class="wr-card t-a"><div class="wr-segs"></div><div class="wr-slides" aria-live="off">${list.map((s, i) => slideHTML(s, i, list.length)).join('')}</div></div>` +
        `<div class="wr-ctrl"><button class="btn sm ghost" type="button" data-wr="prev" aria-label="Previous slide">${GA.icon ? GA.icon('chev-l') : '‹'}</button>` +
        `<button class="btn sm" type="button" data-wr="pause"></button><button class="btn sm ghost" type="button" data-wr="next" aria-label="Next slide">${GA.icon ? GA.icon('chev-r') : '›'}</button>` +
        `<span class="grow"></span><button class="btn pop wr-save" type="button" data-wr="save">${GA.icon ? GA.icon('download') : ''}<span>Save<span class="wr-x"> as</span> image</span></button></div></section>` +
        `<aside class="wr-side card" aria-label="All the numbers"><h2>All the numbers</h2><dl class="wr-dl">${facts(w, r, today).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd class="num">${esc(v)}</dd></div>`).join('')}</dl>` +
        `<p class="wr-how">Counted from your attempt log, lessons, flashcards, labs and tests on this device. A day is active with any answer, card review or finished lesson, or 10 minutes of study. Nothing is uploaded.</p></aside></div>`;
      const at = ctx && ctx.query && /^\d+$/.test(ctx.query.slide || '') ? Math.min(list.length, +ctx.query.slide) - 1 : 0;
      mountStory(main, list, { start: Math.max(0, at), paused: !!(ctx && ctx.query && ctx.query.slide) });
      if (ctx && ctx.query) ctx.query.slide = null;                                // a deep link starts there once, paused
    }
    function sayText(w, r, any) {
      if (!any.length) return w.activeDays ? `Nothing to wrap yet, but you have started: ${plural(w.activeDays, 'active day')} so far.` : 'Nothing to wrap yet. Your first recap appears after a couple of study days.';
      return `${r.label} is quiet so far. ${any[0].label} has a story to tell.`;
    }
    root.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || !root.contains(b)) return;
      if (b.dataset.range) {
        const r = R.find(x => x.key === b.dataset.range);
        if (r && r.key !== cur.key) { render(r); try { history.replaceState(history.state, '', '#/wrapped?range=' + r.key); } catch (err) { /* file:// quirks */ } }
        return;
      }
      const a = b.dataset.wr;
      if (b.dataset.go != null && live) { live.go(+b.dataset.go, +b.dataset.go < live.i ? -1 : 1); return; }
      if (!a || !live) { if (a === 'switch') { const r = R.find(x => x.key === b.dataset.to); if (r) { render(r); try { history.replaceState(history.state, '', '#/wrapped?range=' + r.key); } catch (err) { /* ignore */ } } } return; }
      if (a === 'prev') live.go(live.i - 1, -1);
      else if (a === 'next') live.go(live.i + 1, 1);
      else if (a === 'pause') live.toggle();
      else if (a === 'replay') { if (!live.playing && !RM()) live.toggle(); else live.go(0, -1); }
      else if (a === 'save') {
        b.disabled = true;
        const sm = summary(data[cur.key], cur), name = `passbook-wrapped-${cur.key}-${today}.png`;
        saveImage(sm, main.querySelector('.wr-slide.t-a') || main.querySelector('.wr-card'), name).then(() => { if (GA.ui) GA.ui.toast(`Saved ${name}`, 'ok'); })
          .catch(err => { console.error(err); if (GA.ui) GA.ui.toast('The image could not be made in this browser.', 'bad'); })
          .finally(() => { b.disabled = false; });
      }
    });
    render(cur);
  }

  /** true while the build ships no question (the ICAI bank is not built yet): question answers and tests are then never offered as a way in */
  const noBank = D => (GA.ui && typeof GA.ui.bankIsEmpty === 'function' ? GA.ui.bankIsEmpty(D) : !(D && Array.isArray(D.questions) && D.questions.length));
  /** the work a recap needs, in words: with no question bank only a finished lesson or 20 card reviews can get there */
  const workRule = D => (noBank(D) ? ['a finished lesson or 20 card reviews', '<b>a finished lesson</b> or <b>20 card reviews</b>']
    : ['10 question answers, a finished lesson, 20 card reviews or a test', '<b>10 question answers</b>, a <b>finished lesson</b>, <b>20 card reviews</b> or a <b>test</b>']);
  /** the empty state (P2-36): what is still missing, and one coral to the real gap. Another range with a story wins ('Show this month'); else, with
      some questions answered, 'Answer 5 more questions'; else the shared lesson step; once the work is there and only a second active day is missing,
      the shared next step. A lesson step is the two-line coral of D1: kicker 'Start here · Costing · 30 min' over the lesson's title. With no
      question bank and no lesson to start, the coral opens the syllabus.
      → {cta: {to, text} | {href, text, kicker?, title?}, line} */
  function emptyModel(w, r, any, st, D, today) {
    const E = GA.engage, g = E && E.gapOf ? E.gapOf(w) : { days: 2, work: false, pyq: 10, cards: 20 };
    const need = [], bank = !noBank(D);
    const activeToday = !!(st && st.act && st.act[today] && GA.stats && GA.stats.dayActive && GA.stats.dayActive(st.act[today]));
    if (g.days) need.push(g.days === 1 ? (activeToday ? 'one more active day (tomorrow, at the earliest)' : 'one more active day') : 'two active days');
    if (!g.work) need.push(bank && w.pyq.answered > 0 ? `${plural(g.pyq, 'more question answer')} (or a finished lesson, ${w.cards ? plural(g.cards, 'more card review') : '20 card reviews'} or a test)`
      : !bank && w.cards ? `a finished lesson or ${plural(g.cards, 'more card review')}` : workRule(D)[0]);
    const started = w.activeDays > 0 || w.pyq.answered > 0 || w.cards > 0 || w.lessons > 0;      // a fresh profile reads the rule above, not a repeat of it
    const line = need.length && started ? `Still to go: ${need.join(' and ')}.` : '';
    if (any.length) return { cta: { to: any[0].key, text: 'Show ' + any[0].label.toLowerCase() }, line };
    if (bank && !g.work && w.pyq.answered > 0) return { cta: { href: '#/pyq?practise=' + Math.min(30, Math.max(1, g.pyq)), text: `Answer ${plural(g.pyq, 'more question')}` }, line };
    let step = null;
    try { step = GA.stats && GA.stats.nextStep ? GA.stats.nextStep(st, D, { kind: g.work ? 'any' : 'lesson', today }) : null; } catch (e) { step = null; }
    if (step && !bank && /^#\/(test|pyq)\b/.test(String(step.href || ''))) step = null;          // no test or question to offer yet
    if (step && step.href) {
      const cta = { href: step.href, text: step.label + (step.title ? ' · ' + step.title : '') };
      if (step.title) {
        const sub = step.subject && D && D.subjectById && D.subjectById[step.subject] ? U.medName(D.subjectById[step.subject].name) : '';
        cta.kicker = [step.label, sub, step.minutes > 0 ? U.dur(step.minutes).replace(/ /g, '\u00a0') : ''].filter(Boolean).join(' · ');   // '30 min' never splits
        cta.title = step.title;
      }
      return { cta, line };
    }
    return bank ? { cta: { href: '#/pyq?practise=10', text: 'Answer 10 questions' }, line } : { cta: { href: '#/syllabus', text: 'Open the syllabus', syllabus: true }, line };
  }
  function emptyHTML(w, r, any, st, D) {
    const bank = !noBank(D);
    const so = [`${plural(w.activeDays, 'active day')}`].concat(bank ? [`${plural(w.pyq.answered, 'question answer')}`] : [], [`${plural(w.lessons, 'lesson')} finished`, `${plural(w.cards, 'card')} reviewed`]);
    const m = emptyModel(w, r, any, st, D, U.today());
    const started = w.activeDays > 0 || w.pyq.answered > 0 || w.cards > 0 || w.lessons > 0 || w.tests.length > 0;   // a line of zeros says nothing new
    const ico = n => (GA.icon ? GA.icon(n) : '');
    const cta = m.cta.to ? `<button class="btn pop" type="button" data-wr="switch" data-to="${esc(m.cta.to)}">${esc(m.cta.text)}</button>`
      : m.cta.title ? `<a class="btn pop wr-cta2" href="${esc(m.cta.href)}"><span class="wr-cta-t"><small>${esc(m.cta.kicker)}</small><span>${esc(m.cta.title)}</span></span>${ico('arrow-r')}</a>`
      : `<a class="btn pop" href="${esc(m.cta.href)}">${esc(m.cta.text)}</a>`;
    const will = [['flame', 'Days you showed up, on a calendar'], ['clock', 'Time studied and your biggest day']].concat(
      bank ? [['target', 'Question answers, accuracy, first-try accuracy'], ['trophy', 'Your strongest subject and toughest topic']] : [],
      [['book', 'Lessons, lab challenges and flashcards'], ['bolt', 'Longest streak and XP']], bank ? [['timer', 'Your last test, against the one before']] : [], [['download', 'Save it all as an image']]);
    return `<div class="wr-egrid"><div class="wr-empty card"><div class="wr-say"></div>` +
      `<p class="wr-need">A recap appears once there are <b>two active days</b> with at least ${workRule(D)[1]}.</p>` +
      (started ? `<p class="wr-so">So far (${esc(r.label.toLowerCase())}): ${so.map(esc).join(' · ')}.${m.line && !any.length ? ' ' + esc(m.line) : ''}</p>` : '') + `<div class="wr-ecta">${cta}${any.length || m.cta.syllabus ? '' : '<a class="btn ghost" href="#/syllabus">Browse the syllabus</a>'}</div></div>` +
      `<aside class="wr-will card" aria-label="What your recap will show"><h2>What it will show</h2><ul>${will.map(([ic, t]) => `<li>${GA.icon ? GA.icon(ic) : ''}<span>${esc(t)}</span></li>`).join('')}</ul></aside></div>`;
  }

  GA.views.wrapped = { enter, leave: stop, _slides: slides, _summary: summary, _facts: facts, _empty: emptyModel, _paint: paint, _tough: toughLine, _fmt: { hm, span, hourName }, _testsFig: testsFig, _figRule: figRule, _slideHTML: slideHTML, _rangeLabel: rangeLabel, FIG };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.views.wrapped;
})(typeof window !== 'undefined' ? window : globalThis);
