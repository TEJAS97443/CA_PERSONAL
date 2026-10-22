/* PassBook — Home ("/"), v3 (docs/FRONTEND_V3_SPEC.md §3), audit waves A and B (WP3), adapted for CA Intermediate Group II.
   An app home, not a sales page. Its hero is the shared next step (GA.stats.nextStep, kind 'any': ARCHITECTURE §10.3), computed as if no test
   were in progress: a sitting is resumed from the Tests hub, never from Home.
     first run (no lesson written yet, or the step is 'Start here' and no test is finished): "Start where the marks are." with the two papers
       that carry the most marks, a two-line coral "Start here · <paper> · <min> / <first lesson>" (or "Open the syllabus" while no lesson
       exists), an "or pick a paper" link, and beside it the four papers with their marks and exam days (or, once the ICAI question bank
       exists, a playable question);
     otherwise the lesson to continue or start next (its most legible diagram, P1-34), or in the final stretch, on the eve, on exam day and
       after the exam the season's step (D20, P1-61). Its CTA is the screen's one coral button.
   Then the sections in one of two orders (sections(), P1-35 and D2):
     first run   hero · number strip (catalogue totals) · papers by weight · practice · what the papers say · try a lab · footer
     returning   hero · my numbers ('12 / 120 lessons done') · practice · papers by weight · findings · labs · footer
   Every section hides itself while its data is empty and comes back once there is data: practice and the findings need ICAI questions
   (GA.ui.bankIsEmpty), the labs section needs a ready lab, the strip shows only counts that are not zero. Nothing claims a number that is
   not real. No mascot and no Wrapped teaser on Home: the recap stays at #/wrapped (Me menu).
   The inline question widgets (first-run hero, question of the day) grade with GA.scoring, record like the bank (mode 'p') and are only drawn
   once the bank holds questions (the ICAI question model is a later job; the widgets assume MCQ / NAT records).
   Phones (≤ 700 px) get the compact layout of P2-01. Every number comes from GA.data.D, GA.insights, GA.stats, GA.engage, GA.testgen or the
   learner's own state. Styles: app/css/home.css (.hm-*). The pure helpers at the top load in Node (tests/home.test.js). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);

  /* ================================================================== pure helpers (no DOM) */

  /** the call to action that matches where a deep link goes */
  function ctaFor(href) {
    const h = String(href || '');
    if (/^#\/l\//.test(h)) return /[?&]path=/.test(h) ? 'Start the fast track' : 'Open the lesson';
    if (/^#\/lab\//.test(h)) return 'Open the lab';
    if (/^#\/labs\b/.test(h)) return 'Browse the labs';
    if (/^#\/q\//.test(h)) return 'See the question';
    if (/^#\/pyq\b/.test(h)) return /disputed=1/.test(h) ? 'See the disputes' : /type=/.test(h) ? 'See those questions' : 'See the questions';
    if (/^#\/s\//.test(h)) return 'Open the subject';
    if (/^#\/map\b/.test(h)) return 'Open the map';
    if (/^#\/syllabus\b/.test(h)) return 'Open the syllabus';
    return 'Open';
  }

  /** a hook stat as display parts: {value:'51%', unit:'', glued:true} or {value:'20', unit:'of 20 years', glued:false} */
  function statParts(stat) {
    const v = stat && typeof stat.value === 'number' ? stat.value : 0, unit = (stat && stat.unit) || '';
    const value = Number.isInteger(v) ? U.nf(v) : String(Math.round(v * 10) / 10);
    const glued = /^%/.test(unit);
    return { value: glued ? value + '%' : value, unit: glued ? unit.slice(1).trim() : unit, glued };
  }
  /** the small words after a finding's big number: its unit, or for a bare percentage the window it was counted over ("since 2021") */
  function statNote(h) {
    const p = statParts(h.stat), e = h.evidence || {};
    if (p.unit) return p.unit;
    return p.glued && e.from != null && (e.to == null || e.to === e.from) ? 'since ' + e.from : '';
  }

  /** a small visual of a hook's evidence (shapes only; every number stays in the hook's own text). ctx: {years, papers:[{id,year,ga}], subjects, totals, yearOf(qid)} */
  function hookViz(h, ctx) {
    const e = h.evidence || {}, years = ctx.years || [], y0 = years[0], y1 = years[years.length - 1];
    if (h.template === 'conc-subjects' && Array.isArray(e.subjects)) {
      const on = new Set(e.subjects);
      const parts = (ctx.subjects || []).filter(s => s.section === 'CS' && s.marks > 0).slice().sort((a, b) => b.marks - a.marks).map(s => ({ id: s.id, v: s.marks, on: on.has(s.id) }));
      return parts.length ? { type: 'stack', parts } : null;
    }
    if (e.natMarks != null && e.msqMarks != null && e.marks > 0) {           // no-negative-marking share: NAT | MSQ | the rest (MCQ)
      const rest = e.marks - e.natMarks - e.msqMarks;
      return rest >= 0 ? { type: 'split', parts: [{ k: 'NAT', v: e.natMarks }, { k: 'MSQ', v: e.msqMarks }, { k: 'MCQ', v: rest }] } : null;
    }
    if (h.kind === 'trend' && e.earlyTotal && e.lateTotal && e.early && e.late) {
      const a = e.earlyMarks / e.earlyTotal, b = e.lateMarks / e.lateTotal, m = Math.max(a, b) || 1;
      return { type: 'bars', rows: [{ label: e.early[0] + '–' + e.early[1], w: a / m }, { label: e.late[0] + '–' + e.late[1], w: b / m, on: true }] };
    }
    if (Array.isArray(e.years) && e.years.length && years.length) {
      const set = new Set(e.years), run = e.from != null && e.to != null && h.template === 'freq-streak' ? [e.from, e.to] : null;
      return { type: 'ticks', unit: 'year', cells: years.map(y => ({ on: set.has(y), run: !!run && y >= run[0] && y <= run[1] })), cap: [y0, y1] };
    }
    if (Array.isArray(e.papers) && e.papers.length && ctx.papers && ctx.papers.length) {
      const set = new Set(e.papers), ga = h.subject === 'ga', pool = ctx.papers.filter(p => !ga || p.ga > 0);
      return { type: 'ticks', unit: 'paper', cells: pool.map(p => ({ on: set.has(p.id) })), cap: [pool[0].year, pool[pool.length - 1].year] };
    }
    if (h.template === 'dispute-keys' && Array.isArray(e.ids) && ctx.yearOf && years.length) {
      const set = new Set(e.ids.map(ctx.yearOf));
      return { type: 'ticks', unit: 'year', cells: years.map(y => ({ on: set.has(y) })), cap: [y0, y1] };
    }
    if (/^path-(half|80)$/.test(h.template) && e.minutes && ctx.totals && ctx.totals.minutes) {   // share of the reading time vs share of the marks
      const rows = [{ k: 'time', w: Math.min(1, e.minutes / ctx.totals.minutes) }];
      if (e.marks != null && e.total) rows.push({ k: 'marks', w: Math.min(1, e.marks / e.total) });
      return rows.length > 1 ? { type: 'duo', rows } : { type: 'meter', v: rows[0].w };
    }
    if (h.stat && /^%/.test(h.stat.unit) && h.stat.value >= 0 && h.stat.value <= 100) return { type: 'meter', v: h.stat.value / 100 };
    return null;
  }

  /** the four findings: the mockup's four kinds when the bank has them, then the first hooks of kinds not yet shown */
  const FIND_PREF = ['freq-years', 'trap-no-negative', 'path-half', 'dispute-keys'];
  function pickFindings(hooks, n) {
    const k = n || 4, out = [];
    FIND_PREF.forEach(t => { const h = hooks.find(x => x.template === t); if (h && out.length < k) out.push(h); });
    hooks.forEach(h => { if (out.length < k && !out.includes(h) && !out.some(o => o.kind === h.kind)) out.push(h); });
    hooks.forEach(h => { if (out.length < k && !out.includes(h)) out.push(h); });
    return out;
  }

  /* ---------------- once a day (P3-01, P3-46): a seed from the study day, so a day's picks stay put and the next day's differ */
  /** a 32-bit seed from a day key (FNV-1a) */
  function daySeed(day) { let h = 2166136261; for (const ch of String(day || '')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  /** a small seeded random generator (mulberry32): rng(seed)() -> [0, 1) */
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  /** a copy of list in an order drawn from rnd (Fisher-Yates) */
  function shuffled(list, rnd) { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /** the findings for a returning learner (P3-01): rotated once a day (seeded by the day key); two of the four about the hero's subject when
      it has hooks (different kinds first), the other two never about it (other subjects or the whole paper, kinds not yet shown first); the
      subject's own hooks fill in only when the bank has too few others. Without a day (a first run) the mockup's four from pickFindings.
      o = {day, subject, n = 4} */
  function dailyFindings(hooks, o) {
    o = o || {};
    const k = o.n || 4;
    if (!o.day) return pickFindings(hooks, k);
    const rnd = rng(daySeed('find|' + o.day)), out = [], kinds = new Set();
    const add = h => { out.push(h); kinds.add(h.kind); };
    const about = h => !!o.subject && h.subject === o.subject;
    const mine = shuffled(hooks.filter(about), rnd);
    mine.forEach(h => { if (out.length < Math.min(2, k) && !kinds.has(h.kind)) add(h); });
    mine.forEach(h => { if (out.length < Math.min(2, k) && !out.includes(h)) add(h); });
    const rest = shuffled(hooks.filter(h => !about(h)), rnd);
    rest.forEach(h => { if (out.length < k && !kinds.has(h.kind)) add(h); });
    rest.forEach(h => { if (out.length < k && !out.includes(h)) add(h); });
    mine.forEach(h => { if (out.length < k && !out.includes(h)) add(h); });
    return out;
  }

  /** real progress = something the learner did on purpose (time on a page alone never counts). GA.stats.hasProgress is the one definition
      (P0-22, ARCHITECTURE §10.3); the copy below is today's rule, used only until that lands. */
  function hasProgress(s) {
    const ST = GA.stats;
    if (ST && typeof ST.hasProgress === 'function') return !!ST.hasProgress(s);
    if (!s) return false;
    const n = o => (o ? Object.keys(o).length : 0);
    return !!(s.live || n(s.lessons) || n(s.q) || (s.tests && s.tests.length) || n(s.cards) || n(s.labs));
  }

  /* ---------------- the next step (P0-08) */
  /** a subject's weight: the ICAI paper's marks (insights paperMarks: 100 for Papers 4 and 5, 50 for 6A and 6B), else the older per-paper metric */
  const perPaper = row => (row && +row.paperMarks > 0 ? +row.paperMarks : row && typeof row.perPaper === 'number' ? row.perPaper : row ? row.marksPerPaper || 0 : 0);
  /** the papers, most marks first: nextStep's own ranking (I.ranking, WP4) when it exists, else by the paper's marks (insights paperMarks;
      ties keep syllabus order). (The 'CS' section is the insights' internal name for every examined subject.) */
  function csRank(I) {
    const cs = I.subjects.filter(s => s.section === 'CS'), isCS = new Set(cs.map(s => s.id));
    if (Array.isArray(I.ranking) && I.ranking.length) return I.ranking.filter(id => isCS.has(id));
    return cs.slice().sort((a, b) => perPaper(b) - perPaper(a)).map(s => s.id);
  }
  const subjName = (D, id) => ((D.subjectById[id] || {}).name || id);
  const isLiveTest = s => !!(s && s.live && s.live.id);
  const finishedTests = s => ((s && s.tests) || []).filter(t => t && t.finished).length;
  /** a lesson record is real reading when it is done, has 2 minutes on the page, a self-check answered or a saved position; anything else is a peek */
  const isReal = r => !!r && !!(r.done || (r.secs || 0) >= 120 || (r.quiz && Object.keys(r.quiz).some(k => r.quiz[k] && r.quiz[k].n)) || r.at);

  /** a stand-in for GA.stats.nextStep (kind 'any', scope 'all') until WP4 lands it: the same precedence without routes and seasons
      (1 a live test, 3a Continue the newest real unfinished lesson, 3c the current subject's next lesson with a hand-over when it is finished,
      3d Start here = the top paper's first lesson, 3e every lesson done = a full mock). Never an input: question answers, cards, labs, peeks. */
  function localStep(s, D, I, o) {
    o = o || {};
    if (isLiveTest(s)) {
      const lv = s.live, ids = lv.qids || [], a = ids.filter(id => lv.responses && lv.responses[id] != null).length;
      const left = lv.limitMs ? U.clock(Math.max(0, lv.limitMs - (lv.elapsedMs || 0))) + ' left' : '';
      return { kind: 'test', rule: 'live', label: 'Resume test', title: lv.title || 'Your test', id: lv.id, subject: null, minutes: null,
               reason: [ids.length ? `${a} of ${ids.length} answered` : '', left].filter(Boolean).join(' · '), href: '#/test/run/' + lv.id, season: 'normal' };
    }
    const L = (s && s.lessons) || {}, done = id => !!(L[id] && L[id].done);
    const when = r => r.last || r.first || r.done || 0;
    const recs = Object.keys(L).filter(id => D.lessonById[id] && isReal(L[id])).sort((a, b) => when(L[b]) - when(L[a]));
    const top = recs[0];
    const lessonStep = (id, label, rule, reason) => {
      const l = D.lessonById[id], at = L[id] && L[id].at && L[id].at.h;
      return { kind: 'lesson', rule, label, title: l.title, id, subject: l.subject, minutes: l.minutes || null, reason: reason || '',
               href: '#/l/' + id + '?focus=1' + (at ? '#' + at : ''), season: 'normal' };
    };
    const why = id => { const x = I.lessonInfo(id) || {}, row = I.subject(D.lessonById[id].subject) || {};
      return x.pyqs ? `${U.plural(x.pyqs, 'ICAI question')} in ${x.papers} of ${row.papers || I.totals.papers} papers` : ''; };
    if (top && !done(top)) return lessonStep(top, 'Continue', 'continue', '');
    const firstOpen = sid => (I.order(sid) || []).find(id => D.lessonById[id] && !done(id) && (D.lessonById[id].status || 'in') === 'in');
    const rank = csRank(I).concat(I.subjects.filter(x => x.section !== 'CS').map(x => x.id));
    const focus = s && s.profile && s.profile.focus && D.subjectById[s.profile.focus] ? s.profile.focus : top ? D.lessonById[top].subject : null;
    if (focus) {
      const id = firstOpen(focus);
      if (id) return lessonStep(id, 'Next up', 'subject', top && D.lessonById[top].subject === focus ? 'after ' + D.lessonById[top].title : why(id));
      for (const sid of rank) {
        if (sid === focus) continue;
        const nid = firstOpen(sid);
        if (nid) return lessonStep(nid, 'Next up', 'subject', `${subjName(D, focus)} done · next: ${subjName(D, sid)}`);
      }
    } else {
      const sid = rank[0], id = sid && (I.order(sid) || [])[0];
      if (id && D.lessonById[id]) return lessonStep(id, 'Start here', 'start', why(id));
    }
    return Object.assign({ kind: 'mock', rule: 'end', label: 'Take a full mock', title: 'A full-length mock', id: null, subject: null, minutes: 180,
             reason: 'Every lesson in the syllabus is done', href: '#/test?new=mock', season: 'normal' }, GA.ui && GA.ui.fullStep ? GA.ui.fullStep(D) : {});
  }

  /** true while the build ships no question: the ICAI bank is not built yet (GA.ui.bankIsEmpty; the same rule in Node) */
  const bankEmpty = D => (GA.ui && typeof GA.ui.bankIsEmpty === 'function' ? GA.ui.bankIsEmpty(D) : !(D && Array.isArray(D.questions) && D.questions.length));
  /** a step Home can really offer: with no question bank a test or question step (a full mock once every lesson is done, a retry, a warm-up)
      becomes the flashcards (or the syllabus when there are none), so the coral never opens an empty screen */
  function honestStep(step, D) {
    if (!step || !bankEmpty(D) || !/^#\/(test|pyq|q)\b/.test(String(step.href || ''))) return step;
    const cards = !!(D && D.cards && D.cards.length);
    const end = step.rule === 'end';
    return Object.assign({}, step, { kind: 'task', label: cards ? 'Review flashcards' : 'Open the syllabus', title: end ? 'Every lesson so far is done' : cards ? 'Your flashcards' : 'The syllabus',
                                     reason: end ? 'more lessons are being added' : '', href: cards ? '#/flash' : '#/syllabus', minutes: null, id: null, subject: null });
  }
  /** the shared next step for Home: GA.stats.nextStep(state, D, {kind 'any', scope 'all'}) when it exists, else localStep. o = {today, now, ST} */
  function stepFor(s, D, I, o) {
    o = o || {};
    const ST = o.ST || GA.stats, today = o.today || U.today();
    // Home is the study front door: a test in progress is resumed from the Tests hub (its own panel there), never from Home's hero
    const st = s && s.live ? Object.assign({}, s, { live: null }) : s;
    if (ST && typeof ST.nextStep === 'function') {
      try { const r = ST.nextStep(st, D, { kind: 'any', scope: 'all', today, I }); if (r && r.href) return honestStep(r, D); }
      catch (e) { if (g.console) console.warn('home: nextStep', e); }
    }
    return honestStep(localStep(st, D, I, o), D);
  }
  /** Home's first-run hero shows while the shared step is 'Start here' and no test is finished (P0-08, P0-22); a test in progress lives on the Tests hub */
  function isFirstRun(s, step) { return !!step && step.rule === 'start' && !finishedTests(s); }

  /** the page order (P1-35, D2): returning learners get their practice row right under the hero and their numbers; a first visit reads
      what the site is (hero, totals), then the syllabus by weight, then how to practise, then the evidence and the labs */
  const ORDER = {
    first: ['hero', 'strip', 'bento', 'practice', 'findings', 'labs', 'footer'],
    returning: ['hero', 'strip', 'practice', 'bento', 'findings', 'labs', 'footer']
  };
  function sections(s, step) { return ORDER[isFirstRun(s, step) ? 'first' : 'returning'].slice(); }
  /** the sections this catalogue can fill: practice and the findings need ICAI questions (the labs section hides itself with no ready lab) */
  function sectionsFor(firstRun, D) {
    const bank = !bankEmpty(D);
    return ORDER[firstRun ? 'first' : 'returning'].filter(k => bank || (k !== 'practice' && k !== 'findings'));
  }

  /* ---------------- exam season (P1-61, D20) */
  /** the countdown words: U.untilExam (WP2) when it exists, else the same wording from an exam() result */
  function untilExam(E) {
    if (U.untilExam) return U.untilExam(E) || '';
    if (!E || E.daysLeft == null || !E.label) return '';
    const n = E.daysLeft;
    if (n === 0) return `${E.label} is today`;
    if (n === 1) return `${E.label} is tomorrow`;
    if (n > 1) return `${U.nf(n)} days to ${E.label}`;
    return E.date ? `${E.label} was on ${U.fmtDay(E.date, { day: 'numeric', month: 'short' })}` : '';
  }
  /** a session step's headline: 'Retry 5 missed questions', 'Review 12 due cards', 'Quick 20: cards you know least' */
  function taskTitle(st) {
    const t = st.title || '', L = st.label || '';
    if (!t || t === L) return L;
    if (/^(Retry|Review)$/.test(L)) return `${L} ${t}`;
    if (/^(Quick 20|Warm up)$/.test(L)) return `${L}: ${t}`;
    return t;
  }

  /** 'P4' -> 'Paper 4', 'P6A' -> 'Paper 6A' */
  const paperLabel = code => (/^P\d+[AB]?$/.test(String(code || '')) ? 'Paper ' + String(code).slice(1) : String(code || ''));
  /** 'Papers 4, 5 and 6' from the subjects' paper codes (6A and 6B are one Paper 6), else 'N papers' */
  function papersText(subjects) {
    const codes = U.uniq((subjects || []).map(x => String(x.paper || '').replace(/^P(\d+)[AB]$/, 'P$1')).filter(c => /^P\d+$/.test(c))).map(c => c.slice(1));
    if (!codes.length) return U.plural((subjects || []).length, 'paper');
    return codes.length === 1 ? 'Paper ' + codes[0] : 'Papers ' + codes.slice(0, -1).join(', ') + ' and ' + codes[codes.length - 1];
  }
  /** the group's marks and the pass rule (manifest syllabus.pass: 40 in each paper, 50 % of the aggregate) → {total, paper, all, six} */
  function groupFacts(I, D) {
    const total = U.sum((I.subjects || []).map(x => +x.paperMarks || 0)), ps = (D && D.syllabusSource && D.syllabusSource.pass) || {};
    return { total, paper: +ps.paper || null, all: total && +ps.aggregate ? Math.round((total * ps.aggregate) / 100) : null,
             six: (I.subjects || []).some(x => /^P6[AB]$/.test(x.paper || '')) };
  }
  /** the four papers of the first-run hero, in syllabus order: [{id, paper, label, name, marks, day, days}] (day = its exam day from
      GA.stats.paperDays, days = days left; null when the calendar has no paper day for it) */
  function papersModel(I, D, today, ST) {
    let pd = {};
    try { pd = (ST && typeof ST.paperDays === 'function' && ST.paperDays(D, D && D.exam, today)) || {}; } catch (e) { pd = {}; }
    return (I.subjects || []).map(x => ({ id: x.id, paper: x.paper || '', label: paperLabel(x.paper), name: x.name, marks: +x.paperMarks || 0, day: pd[x.id] || null,
                                          days: pd[x.id] ? U.daysBetween(today, pd[x.id]) : null }));
  }
  /** first-run hero copy (P1-32, D1, P1-03): the two papers with the most marks, and the coral = the shared step's 'Start here'; with no lesson
      written yet the coral opens the syllabus. o = {exam: GA.stats.exam()} */
  function firstRunModel(I, D, step, o) {
    o = o || {};
    const rank = csRank(I).map(id => I.subject(id)), [a, b] = rank;
    const sj = step && D.subjectById[step.subject];
    const mins = step && step.minutes ? step.minutes + ' min' : '';
    const ptxt = papersText(I.subjects), cd = o.exam ? untilExam(o.exam) : '';
    return {
      first: true, kind: 'first', step, rule: step ? step.rule : 'start', season: (step && step.season) || 'normal',
      href: step ? step.href : '#/syllabus', cta: step ? step.label : 'Open the syllabus', id: step ? step.id : null,
      eyebrow: ['CA Inter Group II', cd && !/was on/.test(cd) ? cd : ptxt].join(' · '),
      title: 'Start where the marks are.',
      top: [a, b].filter(Boolean),
      kicker: step ? [step.label, sj ? medName(sj.name) : '', mins].filter(Boolean).join(' · ') : `${ptxt} · ${U.plural(I.totals.subtopics || 0, 'sub-topic')}`,
      line: step ? step.title : 'Open the syllabus',
      alt: { href: '#/#hm-subjects', label: 'or pick a paper' },
      pool: [a, b].filter(Boolean).map(x => x.id),                                              // the try-one question's papers (P1-33)
      noLessons: !(D.lessons && D.lessons.length)
    };
  }

  /** everything the hero prints, from the shared next step and real state only. o = {step, now, today, exam: GA.stats.exam(), season} */
  function heroModel(s, D, I, o) {
    o = o || {};
    const now = o.now == null ? Date.now() : o.now, today = o.today || U.dayKey(now);
    const step = o.step || stepFor(s, D, I, { now, today });
    if (!(D.lessons && D.lessons.length)) return firstRunModel(I, D, null, { exam: o.exam });    // no lesson written yet: the first-run hero, coral to the syllabus
    if (!step) return null;
    if (isFirstRun(s, step)) return firstRunModel(I, D, step, { exam: o.exam });
    const E = o.exam || null, season = o.season || step.season || 'normal';
    const m = { first: false, kind: 'task', step, rule: step.rule || '', season, href: step.href, cta: step.label, title: taskTitle(step), eyebrow: 'Up next',
                lead: '', rest: '', when: '', note: null, segs: null, marks: 0, papers: 0, pyqs: 0, totalPapers: 0, years: [], diagrams: 0, figure: 'stats',
                id: step.id || null, subject: step.subject || null, alt: null, mood: 'idle' };
    if (step.kind === 'lesson' && step.id && D.lessonById[step.id]) {
      const id = step.id, l = D.lessonById[id], sj = D.subjectById[l.subject] || { name: l.subject }, info = (I && I.lessonInfo(id)) || {}, rec = ((s && s.lessons) || {})[id];
      const cont = step.rule === 'continue' || step.label === 'Continue';
      Object.assign(m, { kind: 'lesson', title: l.title, subject: l.subject, id, eyebrow: step.label + ' · ' + sj.name, cta: cont ? 'Resume' : step.label === 'Revise' ? 'Revise' : 'Start' });
      const quizN = info.quiz || 0, qd = rec && rec.quiz ? Math.min(quizN, Object.keys(rec.quiz).filter(k => rec.quiz[k] && rec.quiz[k].n).length) : 0;
      m.segs = quizN ? { total: quizN, done: qd } : null;
      m.lead = quizN ? `${qd} of ${quizN} self-checks` : `${U.cap(l.tier || 'core')} lesson`;
      const spent = rec ? Math.floor((rec.secs || 0) / 60) : 0, mins = l.minutes || 0;
      m.rest = cont && spent >= 1 && mins ? (mins - spent >= 1 ? `about ${mins - spent} min left` : `${spent} min read so far`) : `${mins} min read`;
      if (cont && rec && (rec.last || rec.first)) m.when = 'opened ' + U.ago(rec.last || rec.first, now);
      else if (step.reason) m.when = step.reason;
      m.marks = info.marks || 0; m.papers = info.papers || 0; m.pyqs = info.pyqs || 0;
      const row = I && I.subject(l.subject);
      m.totalPapers = row ? row.papers : 0; m.years = info.years || []; m.diagrams = info.diagrams || 0;
      m.figure = 'diagram';
      m.alt = { href: '#/s/' + l.subject, label: 'More in ' + medName(sj.name) };
    } else {
      m.lead = U.cap(step.reason || '');        // a session, not a lesson: Retry, Review, Quick 20, Warm up, a full mock, the season recap, a new exam date
    }
    // the season follows the exam calendar (D20); the hero keeps its slot and markup
    const cd = untilExam(E);
    if (season === 'final') {
      m.eyebrow = (cd ? cd + ' · ' : '') + 'final stretch';
      if (E && E.basis === 'assumed' && E.daysLeft != null && E.daysLeft >= 0 && E.daysLeft <= 1) {
        const w = E.daysLeft === 0 ? 'today' : 'tomorrow';
        m.note = { text: `${E.label || 'Your exam'} starts ${w}. Is your paper ${w}?`, link: 'Set your date', href: '#/plan?set=exam' };
      }
    } else if (season === 'eve' || season === 'day') {
      const eve = season === 'eve', when = E && E.date ? U.fmtDay(E.date, { weekday: 'long', day: 'numeric', month: 'long' }) : '';
      const pn = E && E.paper && E.paper.name ? E.paper.name : '', tm = E && E.cycle && E.cycle.time;
      const clock = t => { const m2 = /^(\d{2}):(\d{2})$/.exec(t || ''); if (!m2) return ''; const h = +m2[1], mi = m2[2]; return `${h > 12 ? h - 12 : h}${mi === '00' ? '' : '.' + mi} ${h >= 12 ? 'PM' : 'AM'}`; };
      const hours = tm && clock(tm.start) && clock(tm.end) ? `${clock(tm.start).replace(/ PM$/, '')} to ${clock(tm.end)}${tm.zone ? ' ' + tm.zone : ''}` : '';
      Object.assign(m, { kind: 'task', figure: 'stats', alt: null, segs: null, marks: 0, title: eve ? `${pn || 'Your exam'} is tomorrow.` : pn ? `${pn} is today.` : 'It’s exam day.',
                         eyebrow: [E && E.label ? U.cap(E.label) : 'Exam', when].filter(Boolean).join(' · '), mood: eve ? 'idle' : 'happy', cta: step.label });
      m.lead = step.label; m.rest = step.title && step.title !== step.label ? step.title : ''; m.when = '';
      m.note = eve ? { text: 'Before you sleep: admit card printed, the ID it asks for, centre address and reporting time checked.' }
                   : { text: hours ? `The paper runs ${hours}${tm.reading && clock(tm.reading) ? `, with reading time from ${clock(tm.reading)}` : ''}.` : 'The warm-up is optional.' };
    } else if (season === 'done') {
      const last = (E && E.last) || null, lbl = U.cap((last && last.label) || (E && E.label) || 'Your exam');
      m.eyebrow = U.cap(cd || (last ? untilExam({ date: last.date, daysLeft: -last.daysAgo, label: last.label }) : '')) || 'After the exam';
      if (m.kind === 'task') { m.title = `${lbl} is over.`; m.lead = ''; m.rest = ''; }
      const res = last && last.cycle && last.cycle.result;
      if (res && res >= today) m.note = { text: `Results due ${U.fmtDay(res)} (official schedule; dates can change).` };
    }
    return m;
  }

  /** the number strip (P2-02). A first run: the catalogue's totals, only those that are not zero (lessons written, the syllabus's sub-topics while
      lessons are still being written, ICAI questions, past papers, labs, flashcards; at most 5). A returning learner: their own counts over the
      totals ('12 / 120 lessons done', with a thin bar), where a count of zero keeps the catalogue cell; no flashcards cell, because 'due' lives
      in the nav chip. Each item: {k, n, of (null for a catalogue cell), label, yr (a year range kept on one line), href} */
  function stripItems(I, s, D, o) {
    const T = I.totals, mine = !!(o && o.mine), yr = T.years && T.years[0] != null && T.years[1] != null ? span(T.years[0], T.years[1]) : '';
    const done = Object.keys(s.lessons || {}).filter(id => s.lessons[id] && s.lessons[id].done && D.lessonById[id]).length;
    const tried = Object.keys(s.q || {}).filter(id => s.q[id] && s.q[id].n && D.qById[id]).length;
    const sat = U.uniq((s.tests || []).filter(t => t && t.paper && D.paperById[t.paper]).map(t => t.paper)).length;
    const labs = Object.keys(s.labs || {}).filter(id => s.labs[id] && (s.labs[id].runs || (s.labs[id].ch && s.labs[id].ch.n))).length;
    // an ICAI bank (docs/ICAI_BANK.md): every ICAI item and document counts here (insights count only the exam papers' items)
    const icai = !!(D.questions && D.questions.length && D.questions.every(q => q.icai));
    const nq = icai ? D.questions.length : T.questions, np = icai ? D.papers.length : T.papers;
    const subs = !nq && (T.subtopics || 0) > (T.lessons || 0) ? T.subtopics : 0;       // the syllabus's size while lessons are still being written
    const all = [
      { k: 'lessons', n: T.lessons, label: 'lessons', href: '#/syllabus', own: done, ownLabel: 'lessons done' },
      { k: 'subtopics', n: subs, label: 'sub-topics in the syllabus', href: '#/syllabus', own: 0 },
      { k: 'pyqs', n: nq, label: 'ICAI questions', href: '#/pyq', own: tried, ownLabel: 'questions attempted' },
      { k: 'papers', n: np, label: icai ? 'ICAI documents' : 'past papers', yr: icai ? '' : yr, href: '#/test', own: sat, ownLabel: 'papers sat' },
      { k: 'labs', n: T.readyLabs != null ? T.readyLabs : T.labs, label: 'interactive labs', href: '#/labs', own: labs, ownLabel: 'labs tried' },   // ready labs only: a planned one is not there yet
      { k: 'cards', n: T.cards, label: 'flashcards', href: '#/flash', own: 0 }
    ].filter(x => x.n > 0);
    const one = (n, l) => (n === 1 ? l.replace(/^(\w+)s\b/, '$1') : l);           // '1 lesson', '1 ICAI question', '1 interactive lab'
    const one2 = (n, l) => (n === 1 ? l.replace(/s(?= |$)/, '') : l);
    const cat = x => ({ k: x.k, n: x.n, of: null, label: x.k === 'labs' || x.k === 'pyqs' || x.k === 'papers' ? one2(x.n, x.label) : one(x.n, x.label), yr: x.yr || '', href: x.href });
    if (!mine) return all.slice(0, 5).map(cat);
    return all.filter(x => x.k !== 'cards').slice(0, 5).map(x => (x.own > 0 ? { k: x.k, n: x.own, of: x.n, label: x.ownLabel, yr: '', href: x.href } : cat(x)));
  }

  /* ---------------- subject bento */
  const SIZES = ['xl', 'xl', 'l', 'l', 'm', 'm', 'm', 'm', 'm', 'm', 's', 's'];
  /** tiles by marks a paper (the like-for-like metric once it exists, P1-03), biggest first; size by rank (xl xl l l m×6 s s xs…, which packs a
      12-column grid), k = share of the top value */
  function bentoTiles(subjects) {
    const order = new Map(subjects.map((s, i) => [s.id, i]));
    const rows = subjects.slice().sort((a, b) => perPaper(b) - perPaper(a) || order.get(a.id) - order.get(b.id));
    const max = perPaper(rows[0]) || 1;
    return rows.map((s, i) => ({ s, size: SIZES[i] || 'xs', k: Math.round((perPaper(s) / max) * 1000) / 1000, v: perPaper(s) }));
  }
  const SPAN = { xl: [4, 4], l: [4, 2], m: [3, 2], s: [2, 2], xs: [2, 1] };
  /** a middle-length subject name for narrow tiles ("Programming & DS", "CO & Architecture"); short names pass through. U.medName once WP2 moves it there */
  const MED = [[/\bData Structures\b/, 'DS'], [/^Computer Organization\b/, 'CO'], [/\bMathematics\b/, 'Maths'], [/\bStatistics\b/, 'Stats']];
  function medName(name) {
    if (U.medName && U.medName !== medName) return U.medName(name);
    let m = String(name); if (m.length <= 18) return m; MED.forEach(([re, r]) => (m = m.replace(re, r))); return m;
  }
  /** a subject's ring (P3-02): an empty track and no label until the learner answers a question or reviews a card in it; then 'Started' (tip
      '1 answer · 1 right') until there is real evidence (EVIDENCE: 5 questions answered, a lesson finished or 10 cards reviewed); then the mastery
      percentage (GA.stats: lessons, practice accuracy and flashcards, weighted by marks). row = one GA.stats.subjects() row.
      → {p, label, state: 'new' | 'started' | 'mastery', fresh, tip} */
  const EVIDENCE = { pyq: 5, lessons: 1, cards: 10 };
  function ringOf(row) {
    const L = (row && row.lessons) || { done: 0, total: 0 }, P = (row && row.pyq) || {}, C = (row && row.cards) || {};
    const att = P.attempted || 0, ok = P.correct || 0, seen = C.seen || 0, done = L.done || 0;
    const real = !!row && row.mastery != null && (att >= EVIDENCE.pyq || done >= EVIDENCE.lessons || seen >= EVIDENCE.cards);
    if (real) {
      const p = Math.max(0, Math.min(100, Math.round(row.mastery * 100)));
      const tip = `Mastery ${p}% · ${done} of ${L.total} lessons done` + (att ? ` · ${U.plural(att, 'question')} attempted` : '') + (seen ? ` · ${U.plural(seen, 'card')} reviewed` : '');
      return { p, label: p + '%', state: 'mastery', fresh: false, tip };
    }
    if (att || seen || done) {
      const tip = [att ? `${U.plural(att, 'answer')} · ${U.nf(ok)} right` : '', seen ? `${U.plural(seen, 'card')} reviewed` : '', done ? `${U.plural(done, 'lesson')} done` : ''].filter(Boolean).join(' · ');
      return { p: 0, label: 'Started', state: 'started', fresh: false, tip: 'Started: ' + tip };
    }
    return { p: 0, label: '', state: 'new', fresh: true, tip: 'Not started' };
  }

  /** the three labs Home shows (P3-01): a first run gets the pool's first three; a returning learner's untried labs come first (pool order),
      so a lab already run gives way to one not tried yet. pool = the ready labs' ids (insights labCards order), tried = a Set of the lab ids they ran */
  function pickLabs(pool, tried, returning, n) {
    const k = n || 3;
    if (!returning || !tried || !tried.size) return pool.slice(0, k);
    return pool.filter(id => !tried.has(id)).concat(pool.filter(id => tried.has(id))).slice(0, k);
  }

  /* ---------------- the inline questions */
  /** catalogue rows that can be answered inline: keyed, no figure, not grouped, no special or disputed key, MCQ or NAT (the ICAI bank's
      descriptive questions never qualify; its MCQs do once they are keyed) */
  function isCandidate(m) {
    return !!m && m.hasKey && !m.hasFig && !m.grouped && !m.special && !m.review && !m.legacy && !m.disputed && !m.mta &&
      (m.type === 'MCQ' || m.type === 'NAT') && !!m.subject && m.subject !== '?';
  }
  /** the first-run question (P1-33): an easy 1-mark question from the top two papers. pool = subject ids */
  function isFirstRunQ(m, pool) { return isCandidate(m) && m.marks === 1 && m.diff === 'easy' && (!pool || !pool.length || pool.includes(m.subject)); }
  /** a full question record short enough for the home card: a short plain stem, four short options (MCQ) or one range (NAT) */
  function isShort(q, o) {
    const max = (o && o.stem) || 360;
    if (!q || !q.answer || typeof q.stem !== 'string' || (q.figures && q.figures.length) || q.group) return false;
    const s = q.stem;
    if (!s.trim() || s.length > max || /```|^\s*\||!\[|:::/m.test(s) || (s.match(/\n/g) || []).length > 3) return false;
    if (q.type === 'MCQ') {
      const op = q.options || [];
      return q.answer.kind === 'single' && op.length === 4 && op.every(t => typeof t === 'string' && t.trim() && t.length <= 80 && !/\n|```|!\[/.test(t));
    }
    return q.type === 'NAT' && q.answer.kind === 'range';
  }
  /** one item of list, preferring questions the learner has not attempted; avoid = Set of ids not to repeat */
  function pickQuestion(list, s, rnd, avoid) {
    const pool = list.filter(x => !(avoid && avoid.has(x.id)));
    const fresh = pool.filter(x => !(s && s.q && s.q[x.id] && s.q[x.id].n));
    const from = fresh.length ? fresh : pool;
    return from.length ? from[Math.floor((rnd || Math.random)() * from.length)] : null;
  }
  /* ---------------- the question of the day (P3-46, D12): Home's random question starts each study day on the same seeded pick, then shuffles */
  const QOTD_FLAG = 'hm:qotd', QOTD_KEEP = 6;
  /** the flag in state.seen: 'YYYY-MM-DD|<the day's question id>' and, after a second '|', the questions of the days before (newest first,
      comma-separated, at most QOTD_KEEP) → {day, id, prev} | null */
  function qotdParse(s) {
    const v = s && s.seen && s.seen[QOTD_FLAG], m = typeof v === 'string' ? /^(\d{4}-\d{2}-\d{2})\|([^|]+)(?:\|(.*))?$/.exec(v) : null;
    return m ? { day: m[1], id: m[2], prev: (m[3] || '').split(',').filter(Boolean) } : null;
  }
  /** the day's question as remembered in state.seen, when it is today's */
  function qotdSaved(s, day) { const f = qotdParse(s); return f && f.day === day ? f.id : null; }
  /** the questions of the day of earlier days, newest first (at most QOTD_KEEP); the same before and after today's pick is saved */
  function qotdRecent(s, day) {
    const f = qotdParse(s); if (!f) return [];
    return U.uniq(f.day < day ? [f.id].concat(f.prev) : f.prev).slice(0, QOTD_KEEP);
  }
  /** the flag's value that remembers today's pick and the days before it */
  function qotdValue(s, day, id) { const prev = qotdRecent(s, day).filter(x => x !== id); return day + '|' + id + (prev.length ? '|' + prev.join(',') : ''); }
  /** the day's order of inline questions, the same all study day (nothing the learner does today moves it). Tiers: the sub-topics of lessons
      finished before today, their topics, their subjects, the subjects of lessons opened before today, then every question; questions not
      answered before today and not the question of an earlier day (qotdRecent) come first (tier by tier), then the others, so a question of
      the day left unanswered gives way the next day; each group is shuffled by the day's seed. metas = isCandidate rows, start = the study
      day's first ms. The view shows the first one that is short enough (qotdPick). */
  function qotdOrder(metas, s, day, start, D) {
    const L = (s && s.lessons) || {}, Q = (s && s.q) || {}, before = new Set(qotdRecent(s, day));
    ((s && s.log) || []).forEach(r => { if (Array.isArray(r) && r[0] < start) before.add(r[1]); });
    Object.keys(Q).forEach(id => { const e = Q[id]; if (e && e.n && (e.last || 0) < start) before.add(id); });
    const les = id => (D.lessonById && D.lessonById[id]) || null;
    const done = Object.keys(L).filter(id => les(id) && L[id] && L[id].done && L[id].done < start);
    const opened = Object.keys(L).filter(id => les(id) && L[id] && (L[id].first || L[id].last || L[id].done || Infinity) < start);
    const sub = new Set(done), top = new Set(done.map(id => les(id).topic)), sj = new Set(done.map(id => les(id).subject)), sj2 = new Set(opened.map(id => les(id).subject));
    const tier = m => (sub.has(m.subtopic) ? 0 : top.has(m.topic) ? 1 : sj.has(m.subject) ? 2 : sj2.has(m.subject) ? 3 : 4);
    const fresh = [[], [], [], [], []], old = [[], [], [], [], []];
    (metas || []).forEach(m => (before.has(m.id) ? old : fresh)[tier(m)].push(m));
    const rnd = rng(daySeed('qotd|' + day));
    return fresh.concat(old).reduce((acc, g) => acc.concat(shuffled(g, rnd)), []);
  }
  /** how many paper files each round of the day's walk may fetch, all of a round in parallel (P2-79): at most 5 files in 2 round trips, and
      only on the first visit of a study day (the pick is remembered) */
  const QOTD_ROUNDS = [2, 3];
  /** the question of the day from the day's order (P3-46): the first question in the order that is short enough for the card (isShort needs
      the full record, so the paper files are fetched round by round: each round takes the papers of the next questions in the order, together).
      When the budget is spent, the first short question in the order among the papers already fetched: every paper holds short questions,
      so the day always gets its own question (from the highest tier those papers reach, e.g. the subject of the finished lessons when their
      own questions are long C programs). load(paperId) → full records (a promise); short(record) → boolean. Deterministic for a given order.
      → Promise<{q, papers, rounds}> (q null when nothing loaded holds a short question) */
  async function qotdPick(order, load, short, rounds) {
    const R = rounds || QOTD_ROUNDS, got = new Map();
    let r = 0;
    const fetch = async from => {
      const need = [];
      for (let j = from; j < order.length && need.length < R[r]; j++) { const p = order[j].paper; if (!got.has(p) && need.indexOf(p) < 0) need.push(p); }
      r++;
      const lists = await Promise.all(need.map(p => Promise.resolve().then(() => load(p)).catch(() => null)));
      need.forEach((p, k) => got.set(p, new Map((Array.isArray(lists[k]) ? lists[k] : []).map(x => [x.id, x]))));
    };
    const done = q => ({ q, papers: got.size, rounds: r });
    for (let i = 0; i < order.length; i++) {
      const m = order[i];
      if (!got.has(m.paper)) { if (r >= R.length) break; await fetch(i); if (!got.has(m.paper)) break; }
      const q = got.get(m.paper).get(m.id);
      if (q && short(q)) return done(q);
    }
    for (const m of order) { const L = got.get(m.paper), q = L && L.get(m.id); if (q && short(q)) return done(q); }
    return done(null);
  }
  /** the lesson behind a question (every short candidate maps to its sub-topic's lesson) for 'Learn this' (P1-33) */
  function lessonFor(D, m) { const l = m && (D.lessonById[m.subtopic] || null); return l ? { id: l.id, title: l.title, minutes: l.minutes, href: '#/l/' + l.id } : null; }
  /** a NAT box keeps digits, one '.', and one leading minus (the exam keypad's set; P0-16). GA.scoring.natClean (WP10) when it exists.
      A comma is never read as a decimal point: it is refused, and the box asks for a point instead */
  function cleanNat(text) {
    const SC = GA.scoring;
    if (SC && typeof SC.natClean === 'function' && SC.natClean !== cleanNat) return SC.natClean(text);
    const t = String(text == null ? '' : text).replace(/[−‒–—]/g, '-');
    let out = '', dot = false;
    for (const ch of t) {
      if (ch >= '0' && ch <= '9') out += ch;
      else if (ch === '.' && !dot) { dot = true; out += ch; }
      else if (ch === '-' && !out) out += ch;
    }
    return out;
  }

  /** the NAT box's lines (P0-16), worded like the question card's */
  const NAT_MSG = {
    hint: 'Numerical answer: type a number.',
    comma: 'Use a decimal point (.), not a comma.',
    chars: 'Only digits, one decimal point and a leading minus.',
    commaCheck: 'Use a decimal point (.), not a comma: type 0.75, not 0,75.',
    notNumber: 'Type a number like 12 or −0.5.'
  };
  /** one edit of a NAT box (P0-16), pure: raw = the box's text after the edit, hold = the previous edit's hold. The box keeps only digits, one
      '.' and a leading minus; a refused comma holds grading back until a point is typed or the box is emptied, so '0,75' typed key by key
      never quietly becomes 75 (the question card's commaHold). → {text, hold, warn} (warn = the line to show, '' for the normal hint) */
  function natInput(raw, hold) {
    const s = String(raw == null ? '' : raw).replace(/[−‒–—]/g, '-'), comma = s.indexOf(',') >= 0;
    const text = cleanNat(s), bare = s.replace(/,/g, '');
    const h = comma ? true : !text || text.indexOf('.') >= 0 ? false : !!hold;
    return { text, hold: h, warn: h ? NAT_MSG.comma : cleanNat(bare) !== bare ? NAT_MSG.chars : '' };
  }
  /** why a NAT entry cannot be graded yet (P0-16), or null when it parses: a comma is never read as a decimal point, also after it was
      refused (hold, from natInput) */
  function natProblem(raw, hold) {
    const t = String(raw == null ? '' : raw).trim();
    if (hold || /,/.test(t)) return NAT_MSG.commaCheck;
    const SC = GA.scoring, v = SC && typeof SC.parseNat === 'function' ? SC.parseNat(t) : (/^-?(\d+\.?\d*|\.\d+)$/.test(t.replace(/−/g, '-')) ? Number(t.replace(/−/g, '-')) : null);
    return v == null || !isFinite(v) ? NAT_MSG.notNumber : null;
  }

  /* ---------------- mocks and the diagnostic */
  /** the scored full-length sittings of a test history (papers and mocks), oldest first, read through GA.scoring.summary (P2-34, ARCHITECTURE
      §10.13): [{t, m: {score, max}}]. A 10-question quiz or the diagnostic never sits on the line with a 3-hour paper. */
  function fullSittings(tests, D) {
    const SC = GA.scoring;
    if (SC && typeof SC.fullSittings === 'function') return SC.fullSittings(tests, D);
    return (Array.isArray(tests) ? tests : []).filter(t => t && t.finished && (t.kind === 'paper' || t.kind === 'mock') && t.max > 0)
      .map(t => ({ t, m: { score: +t.score || 0, max: t.max } })).sort((a, b) => (a.t.finished || 0) - (b.t.finished || 0));
  }
  /** sparkline points for the learner's last scored full-length sittings (share of the marks, oldest first). tests = state.tests */
  function sparkModel(tests, D, n) {
    const all = fullSittings(tests, D), rows = all.slice(-(n || 6));
    let mk = all.slice(0, all.length - rows.length).filter(x => x.t.kind === 'mock').length;
    const pts = rows.map(({ t, m }) => {
      const p = D && t.paper ? D.paperById[t.paper] : null;
      if (t.kind === 'mock') mk++;
      const sc = +m.score || 0, pct = U.pctMarks ? U.pctMarks(sc, m.max) : Math.round((100 * sc) / m.max) + '%';      // the one percent format (P3-27)
      return { v: Math.round(Math.max(0, sc / m.max) * 1000) / 10, pct, label: t.kind === 'mock' ? `mock ${mk}` : p ? String(p.year) + (p.set > 1 || D.papers.filter(x => x.year === p.year).length > 1 ? '·' + p.set : '') : 'paper' };
    });
    const top = Math.max(60, Math.ceil((Math.max(0, ...pts.map(p => p.v)) * 1.15) / 10) * 10);
    return { pts, top };
  }
  function mockFacts(D, TG) {
    try {
      const t = TG.mock(D, { seed: 1 }), marks = t.qids.reduce((a, id) => a + (D.qById[id] ? D.qById[id].marks : 0), 0);
      return { n: t.qids.length, marks, hours: Math.round((t.limitMs / 36e5) * 10) / 10, complete: !!t.complete };
    } catch (e) { return null; }
  }
  /** the diagnostic as the generator builds it (P1-31, P1-56): questions, marks, the time limit and how many subjects it samples */
  function diagFacts(D, TG) {
    try {
      const t = TG.diagnostic(D, {}), qs = t.qids.map(id => D.qById[id]).filter(Boolean);
      return { n: qs.length, marks: qs.reduce((a, q) => a + (q.marks || 0), 0), minutes: Math.round(t.limitMs / 60000), subjects: U.uniq(qs.map(q => q.subject)).length };
    } catch (e) { return null; }
  }

  /* ---------------- hero figures */
  const DG_RE = /^:::[ \t]*diagram[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm;
  /** every ::: diagram block of a lesson's Markdown, in order: [{title, spec, section}] (section = the H2 above it); unparsable specs are skipped */
  function diagramsOf(md) {
    const src = String(md || ''), out = [], re = new RegExp(DG_RE.source, 'gm');
    let m;
    while ((m = re.exec(src))) {
      let spec;
      try { spec = JSON.parse(m[2]); } catch (e) { continue; }
      const hs = src.slice(0, m.index).match(/^##[ \t]+(.+)$/gm);
      out.push({ title: m[1].trim() || spec.title || '', spec, section: hs ? hs[hs.length - 1].replace(/^##[ \t]+/, '').trim() : '' });
    }
    return out;
  }
  /** the first drawable ::: diagram block of a lesson's Markdown: {title, spec, section} or null */
  function firstDiagram(md) { return diagramsOf(md)[0] || null; }
  /** the natural size of a kit drawing from its <svg viewBox width>; null for HTML output (tables) */
  function svgSize(html) {
    const head = /^\s*<svg\b[^>]*>/.exec(String(html || ''));
    if (!head) return null;
    const vb = /viewBox="\s*[-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)\s*"/.exec(head[0]), wa = /\swidth="([\d.]+)"/.exec(head[0]), ha = /\sheight="([\d.]+)"/.exec(head[0]);
    if (!vb) return wa && ha ? { w: +wa[1], h: +ha[1] } : null;
    const vw = +vb[1], vh = +vb[2], w = wa ? +wa[1] : vw;
    return vw > 0 && vh > 0 ? { w, h: ha ? +ha[1] : (vh * w) / vw } : null;
  }
  /** the median size of a kit drawing's text labels, in px at its natural size (font-size is in viewBox units), or null without text */
  function labelPx(html) {
    const src = String(html || ''), head = /^\s*<svg\b[^>]*>/.exec(src);
    if (!head) return null;
    const vb = /viewBox="\s*[-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)/.exec(head[0]), wa = /\swidth="([\d.]+)"/.exec(head[0]);
    const k = vb && wa && +vb[1] > 0 ? +wa[1] / +vb[1] : 1;
    const a = Array.from(src.matchAll(/<text\b[^>]*?\sfont-size="([\d.]+)"/g), m => +m[1] * k).filter(x => x > 0).sort((x, y) => x - y);
    if (!a.length) return null;
    const m = a.length >> 1;
    return Math.round((a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2) * 100) / 100;
  }
  /** P1-34: which of a lesson's drawings the hero shows, and at what scale. cands = [{w, h, font}] in lesson order (w/h null for an HTML
      table; font = labelPx, optional), box = {w, h}. The most legible drawing: the first that fits at 0.85x or more and whose labels, drawn,
      are 10 px or more (drawn at 1.3x at most), thin strips after the others; else, of those that fit at 0.85x or more, the one with the
      largest labels (a real figure before a thin strip, the earlier one on a tie); else the first one at 0.8x or more, anchored top-left and
      cropped with a fade ('continues in the lesson'). → {i, scale, mode: 'fit' | 'crop', fit} | null */
  const FIT = { min: 0.85, max: 1.3, crop: 0.8, thin: 3.2, label: 10 };
  function bestDiagram(cands, box) {
    if (!cands || !cands.length || !box || !(box.w > 0) || !(box.h > 0)) return null;
    const known = c => !!c && c.w > 0 && c.h > 0, thin = c => c.w / c.h > FIT.thin, fitOf = c => Math.min(box.w / c.w, box.h / c.h);
    const r3 = x => Math.round(x * 1000) / 1000, idx = cands.map((_, i) => i);
    const order = idx.filter(i => known(cands[i]) && !thin(cands[i])).concat(idx.filter(i => known(cands[i]) && thin(cands[i])));
    const legible = (c, f) => !(c.font > 0) || c.font * Math.min(f, FIT.max) >= FIT.label - 1e-9;
    for (const i of order) { const f = fitOf(cands[i]); if (f >= FIT.min && legible(cands[i], f)) return { i, scale: r3(Math.min(f, FIT.max)), mode: 'fit', fit: r3(f) }; }
    const lab = i => (cands[i].font || 0) * Math.min(fitOf(cands[i]), FIT.max);
    const fitting = order.filter(i => fitOf(cands[i]) >= FIT.min), pool = fitting.filter(i => !thin(cands[i])).length ? fitting.filter(i => !thin(cands[i])) : fitting;
    if (pool.length) {                                       // nothing that fits has 10 px labels: the one with the largest (a real figure before a strip)
      const i = pool.reduce((a, b) => (lab(b) > lab(a) + 1e-9 ? b : a)), f = fitOf(cands[i]);
      return { i, scale: r3(Math.min(f, FIT.max)), mode: 'fit', fit: r3(f) };
    }
    if (!order.length) return { i: 0, scale: 1, mode: 'crop', fit: null };       // only HTML tables: their own size, measured in the page
    const i = order[0], f = fitOf(cands[i]), sc = Math.max(FIT.crop, Math.min(1, f));
    return { i, scale: r3(sc), mode: sc > f + 1e-9 ? 'crop' : 'fit', fit: r3(f) };
  }

  /** what a recap's longest run is called, as on the Wrapped screen (P2-36): the streak chip counts the whole run, a recap only its range */
  const RUN_LABEL = { week: 'longest run this week', month: 'longest run this month', all: 'longest streak', mock: 'longest run before the mock', season: 'longest run this season' };
  /** the Wrapped card's words from one GA.engage.recap() result (P2-36, P3-05, P3-27): the same headline number as the recap's own story
      ('questions answered' are raw answers), one bar per slide of that recap, the range it opens. → null without a recap */
  function wrapModel(rc, today) {
    if (!rc || !rc.w) return null;
    const w = rc.w, r = rc.range || {}, P = w.pyq || {}, n = P.answered || 0, ft = P.firstTry && P.firstTry.acc, best = w.best, mins = w.minutes || 0;
    const range = r.key === 'month' && today ? U.MONTHS[+String(today).slice(5, 7) - 1] || r.label : r.label || 'All time';
    const big = n ? [n, n === 1 ? 'question answered' : 'questions answered'] : w.lessons ? [w.lessons, w.lessons === 1 ? 'lesson finished' : 'lessons finished'] : [w.activeDays || 0, (w.activeDays || 0) === 1 ? 'active day' : 'active days'];
    const lines = [];
    if (ft != null && P.firstTry.n >= 5) lines.push({ b: Math.round(ft * 100) + '%', t: 'right on the first try' });
    if (best && (best.name || best.short)) lines.push({ b: best.name ? medName(best.name) : best.short, t: 'was your top subject' });
    if (mins) lines.push({ b: U.hm ? U.hm(mins) : mins + ' min', t: 'of focused study' });
    if (w.streak > 1) lines.push({ b: U.plural(w.streak, 'day'), t: ': your ' + (RUN_LABEL[r.key] || 'longest streak'), glue: true });
    return { range, href: rc.href || '#/wrapped', bars: Math.max(1, rc.slides || (rc.keys || []).length || 1), big, lines: lines.slice(0, 3) };
  }
  const span = (a, b) => (a === b ? String(a) : a + '–' + b);
  const fx1 = x => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : (Math.round(x * 10) / 10).toFixed(1));

  const Lib = { ctaFor, statParts, statNote, hookViz, pickFindings, daySeed, rng, shuffled, dailyFindings, hasProgress, perPaper, csRank, isReal, localStep, stepFor, isFirstRun, ORDER, sections, sectionsFor,
    untilExam, taskTitle, heroModel, firstRunModel, paperLabel, papersText, groupFacts, papersModel, bankEmpty, honestStep, stripItems, bentoTiles, SPAN, medName, EVIDENCE, ringOf, pickLabs, isCandidate, isFirstRunQ, isShort,
    pickQuestion, QOTD_FLAG, QOTD_KEEP, qotdParse, qotdSaved, qotdRecent, qotdValue, qotdOrder, QOTD_ROUNDS, qotdPick, lessonFor, cleanNat, NAT_MSG, natInput, natProblem, fullSittings, sparkModel, RUN_LABEL, wrapModel, mockFacts, diagFacts, diagramsOf, firstDiagram, svgSize, labelPx, FIT, bestDiagram, span, fx1 };
  GA.homeLib = Lib;
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
  if (typeof document === 'undefined') return;

  /* ================================================================== view */
  const esc = U.esc, nf = U.nf, icon = (n, c) => GA.icon(n, c);
  const reduced = () => (GA.reveal && GA.reveal.reduced ? GA.reveal.reduced() : !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const phone = () => !!(g.matchMedia && g.matchMedia('(max-width: 700px)').matches);
  const touch = () => (GA.ui && typeof GA.ui.touch === 'boolean' ? GA.ui.touch : !!(g.matchMedia && g.matchMedia('(hover: none) and (pointer: coarse)').matches));
  const safe = (f, d) => { try { const v = f(); return v == null ? d : v; } catch (e) { if (g.console) console.warn('home:', e); return d; } };
  const buzz = () => { try { if (navigator.vibrate) navigator.vibrate(15); } catch (e) { /* not supported */ } };
  /** announce through the shell's one live-region pair (GA.ui.say, WP1); without it the feedback line is its own small status region */
  const say = (text, level) => { if (GA.ui && typeof GA.ui.say === 'function') safe(() => GA.ui.say(text, level || 'polite')); };
  const hasSay = () => !!(GA.ui && typeof GA.ui.say === 'function');
  /** the words of rendered markup for an announcement: a formula reads as its TeX source, never twice (KaTeX also draws an aria-hidden copy) */
  const plainText = html => {
    const t = document.createElement('template'); t.innerHTML = html; const d = t.content;                 // inert: nothing in it loads or runs
    d.querySelectorAll('[data-tex]').forEach(k => k.replaceWith(document.createTextNode(k.getAttribute('data-tex'))));
    d.querySelectorAll('.katex').forEach(k => { const a = k.querySelector('annotation'), ml = k.querySelector('.katex-mathml'); k.replaceWith(document.createTextNode(a ? a.textContent : ml ? ml.textContent : '')); });
    d.querySelectorAll('[aria-hidden="true"], svg').forEach(x => x.remove());
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  };
  /* small line icons the shared sprite does not have (from the mockup) */
  const IC = {
    replay: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/>',
    heat: '<rect x="0" y="7" width="3" height="6" rx="1"/><rect x="5" y="4" width="3" height="9" rx="1"/><rect x="10" y="0" width="3" height="13" rx="1"/>'
  };
  const ic = (k, cls) => `<svg class="i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg>`;
  const heatGlyph = lo => `<svg class="hm-hg" viewBox="0 0 13 13" aria-hidden="true">${IC.heat.replace(/(<rect x="10")/, lo ? '$1 class="lo"' : '$1')}</svg>`;

  let first = true;                 // count-ups, ring fills and the sparkline draw run once per session (rule 8)
  let live = [];                    // cleanup for the current visit
  let gen = 0;                      // bumps on every enter/leave so late async results never write into a page that is gone
  const later = (fn, ms) => { const id = setTimeout(fn, ms); live.push(() => clearTimeout(id)); return id; };

  /** a section head: a small label, the title, one short line, and the section's link (2026-10-18 layout: every section reads as its own band) */
  const head = (id, title, lead, link, kick) => `<div class="hm-sec-h"><div>${kick ? `<p class="hm-kick">${esc(kick)}</p>` : ''}<h2 id="${id}">${esc(title)}</h2>${lead ? `<p>${lead}</p>` : ''}</div>${link ? `<a class="hm-link" href="${link[0]}">${esc(link[1])}${icon('arrow-r')}</a>` : ''}</div>`;

  /* ------------------------------------------------------------------ 1. hero */
  function segsHtml(sg) {
    if (!sg) return '';
    return `<div class="hm-segs" role="img" aria-label="${esc(`${sg.done} of ${sg.total} self-check questions answered`)}">${Array.from({ length: sg.total }, (_, i) => `<i class="${i < sg.done ? 'done' : ''}" style="--k:${i}"></i>`).join('')}</div>`;
  }
  function heroReturning(m) {
    const meta = [m.lead ? `<b>${esc(m.lead)}</b>` : '', esc(m.rest), esc(m.when)].filter(Boolean).join(' · ');
    const chip = m.marks ? `<span class="hm-heat" title="${esc(`Asked in ${m.papers} of ${m.totalPapers} papers: ${U.plural(m.pyqs || 0, 'question')}`)}">${heatGlyph(m.marks < 10)}${esc(U.plural(m.marks, 'mark'))} in ICAI papers</span>` : '';
    const note = m.note ? `<p class="hm-note">${esc(m.note.text)}${m.note.href ? ` <a class="hm-link sm" href="${esc(m.note.href)}">${esc(m.note.link)}${icon('arrow-r')}</a>` : ''}</p>` : '';
    return `<section class="hm-hero hm-st" style="--i:0" aria-labelledby="hm-h1" data-kind="${esc(m.kind)}" data-season="${esc(m.season)}">
      <div class="hm-hero-l">
        <p class="hm-eyebrow"><span class="dot" aria-hidden="true"></span>${esc(m.eyebrow)}</p>
        <h1 id="hm-h1">${esc(m.title)}</h1>
        ${meta ? `<p class="hm-meta">${meta}</p>` : ''}
        ${m.alt ? `<p class="hm-more"><a class="hm-link sm" href="${esc(m.alt.href)}">${esc(m.alt.label)}${icon('arrow-r')}</a></p>` : ''}
        ${note}
        ${segsHtml(m.segs)}
        ${chip ? `<div class="hm-chiprow">${chip}</div>` : ''}
        <div class="hm-cta-row">
          <a class="btn pop lg hm-cta" href="${esc(m.href)}" id="hm-resume"><span>${esc(m.cta)}</span>${icon('arrow-r')}</a>
        </div>
      </div>
      <div class="hm-hero-r" id="hm-fig">${figureShell(m)}</div>
    </section>`;
  }
  function heroFirst(m) {
    const [a, b] = m.top, D = GA.data.D, I = GA.insights.get(), G = groupFacts(I, D), bank = !bankEmpty(D);
    const eq = a && b && perPaper(a) === perPaper(b);
    const share = a && b && G.total ? `, ${fx1(perPaper(a) + perPaper(b))} of the ${G.total} in Group II` : '';
    const lead = a && b ? `${esc(a.name)} and ${esc(b.name)} carry ${eq ? `<b>${fx1(perPaper(a))}</b> marks each` : `<b>${fx1(perPaper(a))}</b> and <b>${fx1(perPaper(b))}</b> marks`}${share}.` +
      (bank ? '<span class="hm-nophone" id="hm-try-lead"> Or try a real ICAI question first, right here.</span>' : m.noLessons ? '<span class="hm-nophone"> The lessons are being written; the syllabus shows every sub-topic.</span>' : '') : '';
    return `<section class="hm-hero hm-first hm-st" style="--i:0" aria-labelledby="hm-h1">
      <div class="hm-hero-l">
        <p class="hm-eyebrow"><span class="dot" aria-hidden="true"></span>${esc(m.eyebrow)}</p>
        <h1 id="hm-h1">${esc(m.title)}</h1>
        ${lead ? `<p class="hm-meta">${lead}</p>` : ''}
        <div class="hm-cta-row">
          <a class="btn pop lg hm-cta hm-cta2" href="${esc(m.href)}" id="hm-start"><span class="hm-cta-t"><small>${esc(m.kicker)}</small><span>${esc(m.line)}</span></span>${icon('arrow-r')}</a>
          <a class="btn lg hm-alt" href="${esc(m.alt.href)}" id="hm-pick">${esc(U.cap(m.alt.label.replace(/^or /, '')))}</a>
        </div>
      </div>
      ${bank ? `<div class="hm-hero-r hm-try">
        <div class="hm-cap"><h2 class="hm-cap-t" id="hm-try-h">Try a real ICAI question</h2></div>
        <div class="hm-qcard" id="hm-try" data-pool="${esc(m.pool.join(','))}">${qSkeleton()}</div>
      </div>` : papersCard(I, D, G)}
    </section>`;
  }
  /** the first-run hero's right panel while there are no ICAI questions: the papers with their marks and exam days, the hours and the pass rule */
  function papersCard(I, D, G) {
    const today = U.today(), rows = papersModel(I, D, today, GA.stats);
    const cyc = safe(() => GA.stats.exam(GA.store.state, D.exam, today).cycle, null), tm = cyc && cyc.time;
    const clock = t => { const x = /^(\d{2}):(\d{2})$/.exec(t || ''); if (!x) return ''; const h = +x[1]; return `${h > 12 ? h - 12 : h}${x[2] === '00' ? '' : '.' + x[2]} ${h >= 12 ? 'PM' : 'AM'}`; };
    const hours = tm && clock(tm.start) && clock(tm.end) ? `Each paper ${clock(tm.start).replace(/ PM$/, '')} to ${clock(tm.end)}${tm.zone ? ' ' + tm.zone : ''}${clock(tm.reading) ? `, reading time from ${clock(tm.reading)}` : ''}.` : '';
    const pass = G.paper && G.all ? ` You pass with ${G.paper} in each paper and ${G.all} of ${G.total} in all.` : '';
    const day = d => U.fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short' });
    return `<div class="hm-hero-r hm-papers">
        <div class="hm-cap"><h2 class="hm-cap-t" id="hm-pp-h">${esc(cyc && cyc.label ? cyc.label : 'Your papers')}</h2></div>
        <ul class="hm-pp" aria-labelledby="hm-pp-h">${rows.map(r => `<li><a class="hm-pp-r" href="#/s/${esc(r.id)}">
          <span class="hm-pp-c mono">${esc(r.paper.replace(/^P/, ''))}</span>
          <span class="hm-pp-t"><b>${esc(r.name)}</b><span>${esc(r.label)} · ${esc(U.plural(r.marks, 'mark'))}</span></span>
          <span class="hm-pp-d">${r.day ? `<b>${esc(day(r.day))}</b><span>${r.days > 1 ? esc(U.plural(r.days, 'day')) : r.days === 1 ? 'tomorrow' : r.days === 0 ? 'today' : 'done'}</span>` : ''}</span></a></li>`).join('')}</ul>
        ${hours || pass ? `<p class="hm-pp-f">${esc([hours, pass.trim()].filter(Boolean).join(' '))}</p>` : ''}
      </div>`;
  }

  /* hero figures: the lesson's most legible diagram (and, once the ICAI bank exists, the exam years that asked its sub-topic) */
  function figureShell(m) {
    if (m.figure === 'diagram') {
      const yrs = m.years || [], all = (GA.data.D.years || []).slice().sort((a, b) => a - b);
      const years = all.length ? `<div class="hm-stepcap"><span class="n">${yrs.length}/${all.length}</span><span>${yrs.length ? `exam years that asked this sub-topic${m.marks ? `, ${esc(U.plural(m.marks, 'mark'))} in all` : ''}` : 'Not asked in an ICAI paper yet: groundwork for what is'}</span></div>
        <div class="hm-yticks" aria-hidden="true">${all.map(y => `<i class="${yrs.includes(y) ? 'on' : ''}" title="${y}"></i>`).join('')}</div>` : '';
      return `<div class="hm-cap"><span id="hm-fig-t">Inside this lesson</span><button class="hm-replay" type="button" id="hm-replay" hidden>${ic('replay')}Replay</button></div>
        <div class="hm-figbox" id="hm-figbox"><div class="hm-figload" aria-hidden="true"><i></i><i></i><i></i></div></div>${years}`;
    }
    // 'So far': the learner's numbers that the strip under the hero does not already show (lessons and questions are there, P2-02)
    const s = GA.store.state, act = s.act || {}, ST = GA.stats;
    const days = Object.keys(act).filter(k => (ST && typeof ST.dayActive === 'function' ? ST.dayActive(act[k]) : act[k] && act[k].q + act[k].c + act[k].l > 0)).length;
    const seenCard = GA.srs && typeof GA.srs.isSeen === 'function' ? GA.srs.isSeen : c => !!c && (c.reps > 0 || !!c.last);   // 'reviewed' = SRS.isSeen (an 'Again' card counts too), as GA.stats and /flash count it
    const cards = Object.keys(s.cards || {}).filter(id => seenCard(s.cards[id])).length;
    const tests = (s.tests || []).filter(t => t && t.finished).length, D = GA.data.D;
    const labs = Object.keys(s.labs || {}).filter(id => s.labs[id] && (s.labs[id].runs || (s.labs[id].ch && s.labs[id].ch.n))).length;
    const w = (n, one, many) => (n === 1 ? one : many);
    // the third number: tests once there are ICAI questions to sit, else labs tried while there are labs (never a count that cannot move)
    const third = !bankEmpty(D) ? `<div><b>${nf(tests)}</b><span>${w(tests, 'test finished', 'tests finished')}</span></div>`
      : (D.labs || []).length ? `<div><b>${nf(labs)}</b><span>${w(labs, 'lab tried', 'labs tried')}</span></div>` : '';
    return `<div class="hm-cap"><span>So far</span></div><div class="hm-figstats"><div><b>${nf(days)}</b><span>${w(days, 'active day', 'active days')}</span></div><div><b>${nf(cards)}</b><span>${w(cards, 'card reviewed', 'cards reviewed')}</span></div>${third}</div>`;
  }
  const BOX_H = 260, BOX_MAX = 300, BOX_STACK = 260;   // the drawing's height budget (P1-34): the room the panel already has (at least 260 px, which
                                                     // home.css reserves, at most 300), or 260 px when the hero stacks (≤ 980 px) and nothing beside it sets the height
  async function loadDiagram(out, m, my, play) {
    const box = U.$('#hm-figbox', out); if (!box) return;
    const L = await Promise.resolve(safe(() => GA.data.lesson(m.id), null)).catch(() => null);
    if (my !== gen || !box.isConnected) return;
    const all = L ? diagramsOf(L.md) : [], render = GA.diagram && GA.diagram.render;
    const cands = render ? all.map(d => { const html = safe(() => render(d.spec), ''); return Object.assign({ d, html, font: labelPx(html) }, svgSize(html) || { w: null, h: null }); }).filter(c => c.html) : [];
    if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).catch(() => null);
    if (my !== gen || !box.isConnected) return;
    measureOverhang(box, cands);
    const px = (st, k) => parseFloat(st[k]) || 0, bs = getComputedStyle(box);
    const room = box.clientHeight - px(bs, 'paddingTop') - px(bs, 'paddingBottom') - 24;       // minus the 'k of N diagrams' line
    // the width is measured on the figure the drawing goes into (P1-34): whatever padding a sheet gives figure.dg is already taken off
    box.innerHTML = '<figure class="hm-dg dg" aria-hidden="true"></figure>';
    const probe = U.$('.hm-dg', box), ps = getComputedStyle(probe);
    const bw = Math.max(120, Math.floor(probe.clientWidth - px(ps, 'paddingLeft') - px(ps, 'paddingRight') - px(ps, 'borderLeftWidth') - px(ps, 'borderRightWidth')));
    const stacked = !!(g.matchMedia && g.matchMedia('(max-width: 980px)').matches);
    const bh = stacked ? BOX_STACK : Math.max(BOX_H, Math.min(BOX_MAX, room));
    const pick = bestDiagram(cands, { w: bw, h: bh });
    if (!pick) { box.innerHTML = `<div class="hm-figempty">${icon('book')}<span>${esc(m.title)}</span></div>`; return; }
    const c = cands[pick.i], d = c.d, t = U.$('#hm-fig-t', out);
    if (t) t.innerHTML = `Inside this lesson <span class="mono">· ${esc(d.title || d.section || '')}</span>`;
    box.innerHTML = `<figure class="hm-dg dg dg-${esc(d.spec.type || 'x')}">${c.html}</figure><span class="hm-dgn"></span>`;
    const fig = U.$('.hm-dg', box), root = U.$('svg.dgs', fig);
    let mode = pick.mode;
    if (root && c.pad) {                                     // labels that run past the drawing's own frame get room inside it, so nothing is cut off
      const vb = root.viewBox && root.viewBox.baseVal, k = vb && vb.width && c.w0 ? vb.width / c.w0 : 1;
      if (vb && vb.width) root.setAttribute('viewBox', [vb.x - c.pad.l * k, vb.y - c.pad.t * k, vb.width + (c.pad.l + c.pad.r) * k, vb.height + (c.pad.t + c.pad.b) * k].map(x => Math.round(x * 10) / 10).join(' '));
    }
    if (root && c.w) {                                       // drawn at its chosen scale: never squeezed to unreadable labels, never blown up past 1.3x,
      const dw = pick.mode === 'fit' ? Math.min(bw, Math.floor(c.w * pick.scale)) : Math.round(c.w * pick.scale);   // and a fitted one never wider than its figure
      Object.assign(root.style, { width: dw + 'px', height: Math.round((c.h * dw) / c.w) + 'px', minWidth: '0', maxHeight: 'none' });
      root.style.setProperty('max-width', 'none', 'important');        // over lesson.css's tree rule (max-width: 100% !important)
    } else if (fig) {                                        // an HTML table: its own size; crop when it is bigger than the box
      mode = fig.scrollWidth > bw + 2 || fig.scrollHeight > bh + 2 ? 'crop' : 'fit';
    }
    if (mode === 'crop' && fig) fig.style.height = Math.round(bh) + 'px';
    if (mode === 'crop' && root && c.w * pick.scale <= bw + 1) box.classList.add('dg-crop-y');   // only too tall: centred, faded at the bottom
    const where = [cands.length > 1 ? `${pick.i + 1} of ${cands.length} diagrams` : '', d.section ? `from “${d.section}”` : '', mode === 'crop' ? 'continues in the lesson' : ''].filter(Boolean);
    U.$('.hm-dgn', box).textContent = where.join(' · ');
    box.classList.add('dg-' + mode); box.dataset.scale = String(pick.scale);
    if (root) Array.from(root.children).forEach((x, i, arr) => x.style.setProperty('--k', String(Math.floor((i * 14) / Math.max(1, arr.length)))));
    const rp = U.$('#hm-replay', out); if (rp) rp.hidden = reduced() || !root;
    if (play && root) diagramPlay(out);
  }
  /** how far each drawing's text runs past its own viewBox (the kit lets a long label overhang its frame), measured once in the page at the
      natural size: c.pad = {l, t, r, b} in px, and c.w / c.h grow by it so the pick and the drawn size cover the whole drawing (P1-34) */
  function measureOverhang(box, cands) {
    const meas = document.createElement('figure');
    meas.className = 'hm-dg dg'; meas.setAttribute('aria-hidden', 'true');
    meas.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;width:max-content;max-width:none;overflow:visible;padding:0;margin:0';
    box.appendChild(meas);
    for (const c of cands) {
      if (!c.w || !c.h) continue;
      meas.innerHTML = c.html;
      const sv = meas.querySelector('svg'); if (!sv) continue;
      sv.style.cssText = `width:${c.w}px;height:${c.h}px;max-width:none;min-width:0;max-height:none`;
      const r = sv.getBoundingClientRect(); let l = 0, t = 0, rt = 0, b = 0;
      sv.querySelectorAll('text').forEach(x => { const q = x.getBoundingClientRect(); if (!q.width && !q.height) return; l = Math.max(l, r.left - q.left); rt = Math.max(rt, q.right - r.right); t = Math.max(t, r.top - q.top); b = Math.max(b, q.bottom - r.bottom); });
      const pad = { l: Math.ceil(l > 0.5 ? l + 2 : 0), t: Math.ceil(t > 0.5 ? t + 2 : 0), r: Math.ceil(rt > 0.5 ? rt + 2 : 0), b: Math.ceil(b > 0.5 ? b + 2 : 0) };
      if (pad.l || pad.t || pad.r || pad.b) Object.assign(c, { pad, w0: c.w, h0: c.h, w: c.w + pad.l + pad.r, h: c.h + pad.t + pad.b });
    }
    meas.remove();
  }
  function diagramPlay(out) {
    const box = U.$('#hm-figbox', out); if (!box || reduced()) return;
    box.classList.remove('play'); void box.offsetWidth; box.classList.add('play');
  }

  /* ------------------------------------------------------------------ 2. number strip */
  function strip(I, s, D, mine) {
    const items = stripItems(I, s, D, { mine });
    if (items.length < 2) return '';                    // one number alone is not a strip (the first-run coral already names the syllabus's size)
    return `<ul class="hm-stats hm-st${items.length === 4 ? ' four' : ' n' + items.length}" style="--i:1" aria-label="${mine ? 'Your numbers' : 'What is inside'}">${items.map(x => {
      const lab = esc(x.label) + (x.yr ? `, <span class="hm-nw">${esc(x.yr)}</span>` : '');
      if (x.of == null) return `<li><a class="hm-stat" href="${x.href}"><b class="num"${first ? ` data-count="${nf(x.n)}"` : ''}>${nf(x.n)}</b><span>${lab}</span></a></li>`;
      const w = Math.max(1.5, Math.min(100, (100 * x.n) / x.of)).toFixed(1);
      return `<li><a class="hm-stat mine" href="${x.href}" aria-label="${esc(`${nf(x.n)} of ${nf(x.of)} ${x.label}`)}"><b class="num"><span${first ? ` data-count="${nf(x.n)}"` : ''}>${nf(x.n)}</span><small>/ ${nf(x.of)}</small></b><span>${lab}</span><i class="hm-sbar" aria-hidden="true"><i style="width:${w}%"></i></i></a></li>`;
    }).join('')}</ul>`;
  }

  /* ------------------------------------------------------------------ 3. papers by weight: a ranked list (2026-10-18; was the bento) */
  function bento(I, s, D, T, i) {
    const rows = Object.fromEntries(safe(() => GA.stats.subjects(s, D, U.today()), []).map(r => [r.id, r]));
    const ranked = bentoTiles(I.subjects), top = ranked.length ? ranked[0].v : 1, G = groupFacts(I, D);
    const pd = safe(() => GA.stats.paperDays(D, D.exam, U.today()), {}) || {};
    const day = d => U.fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short' });
    const row = ({ s: sj, v }, n) => {
      const r = ringOf(rows[sj.id]), t = sj.topTopics && sj.topTopics[0], pl = paperLabel(sj.paper), ex = pd[sj.id];
      // the ring: an empty track until there is evidence, 'Started' after a first answer, then the percentage (P3-02)
      const ring = `<span class="hm-ring ${r.state}" title="${esc(r.tip)}"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="tr" cx="22" cy="22" r="17"/><circle class="pr" cx="22" cy="22" r="17" pathLength="100" data-p="${r.p}" style="stroke-dashoffset:${first ? 100 : 100 - r.p}"/></svg>${r.label ? `<b aria-hidden="true">${r.label}</b>` : ''}</span>`;
      const sub = [pl, sj.lessons ? U.plural(sj.lessons, 'lesson') : '', ex ? 'exam ' + day(ex) : ''].filter(Boolean);     // the most-asked topic stays in the row's name
      const label = `${n + 1}. ${sj.name}${pl ? ', ' + pl : ''}: ${U.plural(v, 'mark')}${sj.lessons ? ', ' + U.plural(sj.lessons, 'lesson') : ''}${ex ? ', exam on ' + day(ex) : ''}. ${r.tip}.`;
      const w = Math.max(4, Math.min(100, (100 * v) / (top || 1))).toFixed(1);
      const R = Math.ceil(ranked.length / 2), end = n === R - 1 || n === ranked.length - 1;      // the last row of each column draws no rule
      return `<li${end ? ' class="end"' : ''}><a class="hm-rk" href="#/s/${sj.id}" aria-label="${esc(label)}">
        <span class="hm-rk-n num" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>
        <span class="hm-rk-t"><span class="hm-nm">${esc(sj.name)}</span><span class="hm-rk-s">${esc(sub.join(' · '))}</span></span>
        <span class="hm-rk-bar" aria-hidden="true"><i style="width:${w}%"></i></span>
        <span class="hm-rk-v"><b class="num">${fx1(v)}</b><span>marks</span></span>${ring}</a></li>`;
    };
    const cap = G.total ? `Group II is ${G.total} marks${G.six ? '; Papers 6A and 6B are the two halves of Paper 6' : ''}.` +
      (G.paper && G.all ? `<span class="hm-nophone"> You pass with ${G.paper} in each paper and ${G.all} in all.</span>` : '') : 'Ranked by the marks each paper carries.';
    return `<section class="hm-sec hm-st" style="--i:${i}" id="hm-subjects" aria-labelledby="hm-subj-h" tabindex="-1">
      ${head('hm-subj-h', 'Papers by weight', cap, ['#/syllabus', 'Full syllabus'], 'Syllabus')}
      <ol class="hm-rank" style="--rows:${Math.ceil(ranked.length / 2)}">${ranked.map(row).join('')}</ol>
    </section>`;
  }

  /* ------------------------------------------------------------------ 4. what the papers say */
  /* the visuals carry their own key (P3-04): the year range under ticks, 'NAT · MSQ · MCQ' under a split, a label on each bar */
  const pc0 = w => Math.round(w * 100) + '%';
  function vizHtml(v) {
    if (!v) return '';
    const cap = c => (c && c[0] != null ? `<span class="hm-vcap"><span>${esc(c[0])}</span>${c[1] != null && c[1] !== c[0] ? `<span>${esc(c[1])}</span>` : ''}</span>` : '');
    const bar = (cls, w, lab) => `<span class="hm-vrow"><em>${esc(lab)}</em><span class="${cls}"><i style="width:${(w * 100).toFixed(1)}%"></i></span></span>`;
    if (v.type === 'ticks') return `<span class="hm-vbox" aria-hidden="true"><span class="hm-ticks${v.unit === 'paper' ? ' p' : ''}">${v.cells.map(c => `<i class="${c.on ? 'on' : ''}${c.run ? ' run' : ''}"></i>`).join('')}</span>${cap(v.cap)}</span>`;
    if (v.type === 'split') return `<span class="hm-vbox" aria-hidden="true"><span class="hm-split">${v.parts.map(p => `<i class="${p.k.toLowerCase()}" style="flex:${p.v}"></i>`).join('')}</span><span class="hm-vcap leg">${v.parts.map(p => `<span><i class="${p.k.toLowerCase()}"></i>${esc(p.k)}</span>`).join('')}</span></span>`;
    if (v.type === 'duo') return `<span class="hm-vbox hm-duo" aria-hidden="true">${v.rows.map(r => bar(r.k, r.w, `${r.k === 'time' ? 'reading time' : 'marks'} ${pc0(r.w)}`)).join('')}</span>`;
    if (v.type === 'meter') return `<span class="hm-vbox hm-duo" aria-hidden="true"><span class="hm-vrow"><span class="marks"><i style="width:${(v.v * 100).toFixed(1)}%"></i></span></span></span>`;
    if (v.type === 'stack') return `<span class="hm-vbox" aria-hidden="true"><span class="hm-split stack">${v.parts.map(p => `<i class="${p.on ? 'on' : ''}" style="flex:${p.v}"></i>`).join('')}</span></span>`;
    if (v.type === 'bars') return `<span class="hm-vbox hm-duo" aria-hidden="true">${v.rows.map(r => bar(r.on ? 'marks' : 'time', r.w, r.label)).join('')}</span>`;
    return '';
  }
  /** the findings section: its head now and four placeholders; the cards fill in after the first paint, when the section nears the screen (P2-56) */
  function findings(I, D, T, i) {
    return `<section class="hm-sec hm-st" style="--i:${i}" id="hm-find" aria-labelledby="hm-find-h">
      ${head('hm-find-h', 'What the papers say', T.questions ? `Patterns counted from ${nf(T.questions)} questions in ${U.plural(T.papers, T.papers === 1 ? 'ICAI exam paper' : 'ICAI exam paper')}.`
        : 'How the lessons build on each other. Exam patterns appear here once ICAI’s past exam papers are in the bank (RTPs and MTPs are practice, not evidence of the exam).', ['#/map?lens=exam', 'Exam map'], 'From the papers')}
      <div class="hm-finds" id="hm-finds" aria-busy="true">${'<div class="hm-find hm-fsk" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'.repeat(4)}</div>
    </section>`;
  }
  function fillFindings(out, I, D, T, o) {
    const box = U.$('#hm-finds', out); if (!box || !box.hasAttribute('aria-busy')) return;
    const years = D.years.slice().sort((a, b) => a - b);
    const ctx = { years, papers: D.papers.slice().sort((a, b) => a.year - b.year || a.set - b.set).map(p => ({ id: p.id, year: p.year, ga: p.ga })), subjects: I.subjects, totals: T, yearOf: id => (D.qById[id] ? D.qById[id].year : null) };
    const hs = safe(() => dailyFindings(I.hooks(), o), []);
    if (!hs.length) { const sec = box.closest('section'); if (sec) sec.remove(); return; }
    box.innerHTML = hs.map(h => { const st = statParts(h.stat), note = statNote(h);
      return `<a class="hm-find" href="${h.href}" data-hook="${esc(h.id)}"><span class="hm-d"><b class="num">${esc(st.value)}</b>${note ? `<span>${esc(note)}</span>` : ''}</span>
        <span class="hm-viz">${vizHtml(hookViz(h, ctx))}</span><h3>${esc(h.title)}</h3><p>${esc(h.body)}</p><span class="hm-go"><span>${ctaFor(h.href)}</span>${icon('arrow-r')}</span></a>`; }).join('');
    box.removeAttribute('aria-busy');
  }

  /* ------------------------------------------------------------------ 5. try a lab */
  /** Try a lab (P2-04, P3-01): up to three ready labs from the catalogue (insights labCards order), each a plain card with its paper, its blurb
      and the lessons it is built into; a returning learner sees labs they have not tried first. The section hides while no lab is ready.
      o = {returning, tried: Set of lab ids} */
  function labs(I, T, i, o) {
    o = o || {};
    const cards = safe(() => I.labCards(), []).filter(c => c.status !== 'planned'), byId = new Map(cards.map(c => [c.id, c]));
    const pick = pickLabs(cards.map(c => c.id), o.tried, o.returning, 3).map(id => byId.get(id));
    if (!pick.length) return '';
    const n = cards.length, D = GA.data.D;
    const lead = `${U.plural(n, 'step-through simulator')}${T.lessonsWithLabs ? ', built into the lessons' : ''}. Change the inputs and watch every step.`;
    return `<section class="hm-sec hm-st" style="--i:${i}" id="hm-labs" aria-labelledby="hm-labs-h">
      ${head('hm-labs-h', 'Try a lab', lead, ['#/labs', n > 1 ? `All ${n} labs` : 'Labs'], 'Interactive labs')}
      <div class="hm-labs${pick.length < 3 ? ' n' + pick.length : ''}">${pick.map(c => { const name = c.title.replace(/\s+Lab$/, ''), sj = D.subjectById[c.subject] || {}, pl = paperLabel(sj.paper);
        const inL = c.embeddedIn && c.embeddedIn.length ? U.plural(c.embeddedIn.length, 'lesson') : '';
        return `<a class="hm-lab hm-lab-p" href="${c.href}" data-lab="${esc(c.id)}" aria-label="${esc(`${c.title}, ${c.subjectName}. ${c.blurb || ''} Open the lab.`)}">
          <div class="hm-lab-top"><span class="ic">${icon('flask')}</span><div><h3>${esc(name)}</h3><p class="hm-lab-sub">${esc([pl, c.subjectName].filter(Boolean).join(' · '))}</p></div></div>
          ${c.blurb ? `<p class="hm-lab-b">${esc(c.blurb)}</p>` : ''}
          <p class="hm-what">${inL ? `Built into ${esc(inL)} · ` : ''}<span class="hm-go"><span>Open the lab</span>${icon('arrow-r')}</span></p></a>`; }).join('')}</div>
    </section>`;
  }

  /* ------------------------------------------------------------------ 6. practice: a question · tests (the diagnostic or the next mock); only with an ICAI bank */
  const qSkeleton = () => '<div class="hm-qsk" aria-hidden="true"><i style="width:46%"></i><i></i><i></i><i style="width:70%"></i><b></b><b></b><b></b><b></b></div>';
  function practiceRow(I, s, D, firstRun, i, hero) {
    let rq = '';
    if (!firstRun) {                      // the question of the day; once it is answered today, the card is a random question (D12)
      const today = U.today(), start = U.dayBounds(today)[0], kept = qotdSaved(s, today), e = kept && s.q ? s.q[kept] : null;
      const done = !!(e && e.n && (e.last || 0) >= start);
      rq = `<div class="hm-card hm-rq"><div class="hm-rq-h"><h3 id="hm-rq-h">${done ? 'Random question' : 'Question of the day'}</h3><button class="btn sm" type="button" id="hm-shuffle">${icon('shuffle')}<span>Shuffle</span></button></div>
          <div class="hm-qcard" id="hm-rq" data-mode="${done ? 'random' : 'qotd'}">${qSkeleton()}</div></div>`;
    }
    const cards = [rq, testsCard(s, D, hero)].filter(Boolean);
    const ph = firstRun ? head('hm-prac-h', 'See where you stand', 'Real ICAI questions, timed and marked.', ['#/test', 'All tests'], 'Practice')
                        : head('hm-prac-h', 'Today’s practice', 'One question a day, and your next test.', ['#/test', 'All tests'], 'Today');
    return `<section class="hm-sec hm-st hm-prac" style="--i:${i}" aria-labelledby="hm-prac-h">${ph}
      <div class="hm-duo-row${cards.length === 1 ? ' solo' : ''}${firstRun ? ' first' : ''}" id="hm-duo">${cards.join('')}</div>
    </section>`;
  }
  let FACTS = null, DIAG = null;
  /** the tests card (P1-31): the diagnostic for a learner with no finished test, else the next full mock and the score
      sparkline. The season changes it (P1-61, D20): the final fortnight offers the full mock, never the diagnostic; the eve and exam day a
      10-question warm-up (none when the hero already is that warm-up). */
  /** the tests card with an ICAI bank (docs/ICAI_BANK.md §7): the eve and exam day a 10-MCQ warm-up; otherwise the next ICAI paper to sit, or,
      while the bank holds no MTP or past paper, ICAI's newest RTP to practise in ICAI's order */
  function icaiTestsCard(s, D, hero) {
    const sea = (hero && hero.season) || 'normal';
    if (sea === 'eve' || sea === 'day') {
      if (hero && /new=warmup/.test(hero.href || '')) return '';
      return `<div class="hm-card hm-mock hm-warm"><p class="hm-tag mono">Tests &amp; mocks</p><h3>Warm up · 10 ICAI MCQs</h3><p class="hm-diag-l">A light start, no new topics.</p>
        <div class="hm-mock-a"><a class="btn primary" href="#/test?new=warmup">${icon('timer')}<span>Start the warm-up</span></a><a class="hm-link sm" href="#/test">All tests${icon('arrow-r')}</a></div></div>`;
    }
    const sat = id => (s.tests || []).some(t => t && t.paper === id);
    const can = D.papers.filter(p => p.sittable).sort((a, b) => b.year - a.year || b.set - a.set), next = can.find(p => !sat(p.id)) || can[0];
    if (next) {
      const qs = D.questions.filter(q => q.paper === next.id), max = GA.testgen && GA.testgen.icaiMax ? GA.testgen.icaiMax(qs, next) : next.marks;
      return `<div class="hm-card hm-mock hm-diag"><div class="hm-diag-t"><p class="hm-tag mono">Tests &amp; mocks</p><h3>Sit ${esc(next.title || next.label)}</h3>
        <p class="hm-diag-l">ICAI’s own paper on ICAI’s clock. MCQs mark themselves; you mark your written answers against ICAI’s.</p></div>
        <div class="hm-facts"><span><b>${qs.length}</b>items</span><span><b>${max}</b>marks</span><span><b>${Math.round((next.minutes || 180) / 60)} h</b>limit</span></div>
        <div class="hm-mock-a"><a class="btn primary" href="#/test?new=mock">${icon('timer')}<span>Sit the paper</span></a><a class="hm-link sm" href="#/test">All ICAI papers${icon('arrow-r')}</a></div></div>`;
    }
    const r = D.papers.slice().sort((a, b) => b.year - a.year || b.set - a.set)[0];
    if (!r) return '';
    const qs = D.questions.filter(q => q.paper === r.id).sort((a, b) => (a.ord || 0) - (b.ord || 0));
    return `<div class="hm-card hm-mock hm-diag"><div class="hm-diag-t"><p class="hm-tag mono">ICAI’s questions</p><h3>Practise ${esc(r.title || r.label)}</h3>
      <p class="hm-diag-l">ICAI’s own questions and answers, in ICAI’s order. MTPs and past papers, which you can sit as timed papers, are being added.</p></div>
      <div class="hm-facts"><span><b>${qs.length}</b>items</span><span><b>${qs.filter(q => q.type === 'MCQ').length}</b>MCQs</span><span><b>${qs.filter(q => q.type === 'DESC').length}</b>descriptive</span></div>
      <div class="hm-mock-a"><a class="btn primary" href="#/q/${encodeURIComponent(qs[0].id)}">${icon('play')}<span>Start in ICAI’s order</span></a><a class="hm-link sm" href="#/pyq">All ICAI questions${icon('arrow-r')}</a></div></div>`;
  }
  function testsCard(s, D, hero) {
    if (D.questions.length && D.questions.every(q => q.icai)) return icaiTestsCard(s, D, hero);
    const sea = (hero && hero.season) || 'normal';
    if (sea === 'eve' || sea === 'day') {
      if (hero && hero.href === '#/test?new=warmup') return '';
      return `<div class="hm-card hm-mock hm-warm"><p class="hm-tag mono">Tests &amp; mocks</p>
        <h3>Warm up · 10 questions</h3><p class="hm-diag-l">A light start, no new topics.</p>
        <div class="hm-mock-a"><a class="btn primary" href="#/test?new=warmup">${icon('timer')}<span>Start the warm-up</span></a><a class="hm-link sm" href="#/test">All tests${icon('arrow-r')}</a></div>
      </div>`;
    }
    if (sea === 'final') return mocks(s, D);
    if (!finishedTests(s)) {
      if (!DIAG && GA.testgen) DIAG = diagFacts(D, GA.testgen);   // (the season cases above return first)
      const F = DIAG;
      if (F && F.n) {
        return `<div class="hm-card hm-mock hm-diag"><div class="hm-diag-t"><p class="hm-tag mono">Tests &amp; mocks</p>
          <h3>Start with the diagnostic</h3>
          <p class="hm-diag-l">Real ICAI questions from ${U.plural(F.subjects, 'paper')}: see where you stand.</p></div>
          <div class="hm-facts"><span><b>${F.n}</b>questions</span><span><b>${F.marks}</b>marks</span><span><b>${F.minutes} min</b>limit</span></div>
          <div class="hm-mock-a"><a class="btn primary" href="#/test?new=diagnostic">${icon('timer')}<span>Start the diagnostic</span></a><a class="hm-link sm" href="#/test">Full mocks and past papers${icon('arrow-r')}</a></div>
        </div>`;
      }
    }
    return mocks(s, D);
  }
  function mocks(s, D) {
    const tr = fullSittings(s.tests, D), mk = (s.tests || []).filter(t => t && t.finished && t.kind === 'mock').length;
    if (!FACTS && GA.testgen) FACTS = mockFacts(D, GA.testgen);
    const F = FACTS || { n: 65, marks: 100, hours: 3 };
    const hrs = F.hours === Math.round(F.hours) ? F.hours + ' h' : fx1(F.hours) + ' h';
    let spark = '';
    if (tr.length) {
      const M = sparkModel(s.tests, D, 6), n = M.pts.length, W = 300, X = i => (n === 1 ? W / 2 : 24 + (i * (W - 48)) / (n - 1)), Y = v => 74 - (v / M.top) * 60;
      const pts = M.pts.map((p, i) => [X(i), Y(p.v)]), d = 'M' + pts.map(p => p.map(x => x.toFixed(1)).join(' ')).join(' L');
      spark = `<div class="hm-spark"><svg viewBox="0 0 300 98" role="img" aria-label="${esc(`Your last ${n === 1 ? 'full-length sitting' : n + ' full-length sittings'}, share of the marks: ${M.pts.map(p => p.label + ' ' + p.pct).join(', ')}`)}">
        ${n > 1 ? `<path class="ar" d="${d} L${pts[n - 1][0].toFixed(1)} 78 L${pts[0][0].toFixed(1)} 78 Z"/><path class="ln${first ? '' : ' go'}" d="${d}"/>` : ''}
        ${M.pts.map((p, i) => `<circle class="pt" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="5"/><text class="v" x="${pts[i][0].toFixed(1)}" y="${(pts[i][1] - 11).toFixed(1)}" text-anchor="middle">${esc(p.pct)}</text><text x="${pts[i][0].toFixed(1)}" y="94" text-anchor="middle">${esc(p.label)}</text>`).join('')}
      </svg></div>`;
    }
    return `<div class="hm-card hm-mock"><p class="hm-tag mono">Tests &amp; mocks</p>
      <h3>${mk || tr.length ? `Next: Full mock ${mk + 1}` : 'Your first full mock'}</h3>
      <div class="hm-facts"><span><b>${F.n}</b>questions</span><span><b>${F.marks}</b>marks</span><span><b>${hrs}</b>time limit</span></div>
      ${spark || '<p class="hm-empty">Your scores on full mocks and past papers show here, one point per sitting.</p>'}
      <div class="hm-mock-a"><a class="btn primary" href="#/test?new=mock">${icon('timer')}<span>Start mock</span></a><a class="hm-link sm" href="#/test">Past papers${icon('arrow-r')}</a></div>
    </div>`;
  }
  /* ---- the inline question widget (first-run hero + the question of the day) */
  const LET = 'ABCD';
  let DISP = null;                  // disputed keys (manifest stats.disputes): never asked inline
  function qMeta(q) {
    const D = GA.data.D, m = D.qById[q.id] || {}, p = D.paperById[m.paper];
    const where = (p ? p.label.replace(/\s+CS$/, '').replace(/\s+CS\s+·\s+/, ' · ') : m.paper) + ' · ' + (GA.ui && GA.ui.qLabel ? GA.ui.qLabel(m) : 'Q' + m.no);
    return { where, topic: m.topic ? D.name(m.topic) : '', type: m.type, marks: m.marks };
  }
  const SOL_CAP = 420;              // desktop: a long worked solution is capped here with a fade and 'Read the full solution' (phones: no cap; P1-33)
  function capSolution(det) {
    const body = U.$('.hm-sol-b', det); if (!body) return;
    const over = !phone() && body.scrollHeight > SOL_CAP + 48;
    det.classList.toggle('cap', over);
  }
  function mountQuestion(box, q, o) {
    o = o || {};
    const MD = GA.md, D = GA.data.D, meta = D.qById[q.id] || {}, mt = qMeta(q), t0 = Date.now(), uid = 'hmq' + (++mountQuestion.n), pm = touch();
    box.dataset.done = '';
    // P3-06: the options are one named group ('Options for <paper> · Q2') described by the marks line and the marking rule
    const cost = '';                    // ICAI's MCQs carry no negative marking (a marking rule, when the bank has one, comes from GA.qcard.markingNote)
    // phones (P2-01): before an answer, 'Open in bank' sits at the end of this meta line instead of a footer row of its own
    box.innerHTML = `<div class="hm-qmeta mono"><b>${esc(mt.where)}</b>${mt.topic ? `<span>${esc(mt.topic)}</span>` : ''}<span id="${uid}-mk">${esc(U.plural(mt.marks, 'mark'))} · ${esc(mt.type)}${cost}</span><a class="hm-link sm hm-qbank" href="#/q/${encodeURIComponent(q.id)}">Open in bank${icon('arrow-r')}</a></div>
      <div class="hm-qstem md ui">${MD.render(q.stem, { br: true })}</div>
      ${q.type === 'MCQ' ? `<div class="hm-opts" role="group" aria-label="${esc('Options for ' + mt.where)}" aria-describedby="${uid}-mk">${q.options.map((t, i) => `<button class="hm-op" type="button" data-k="${LET[i]}"><span class="k">${LET[i]}</span><span class="t md ui">${MD.inline(t, { br: true })}</span>${icon('check', 'mk y')}${icon('x', 'mk x')}</button>`).join('')}</div>`
        : `<div class="hm-nat">${pm ? '<button class="btn hm-pm" type="button" data-pm aria-label="Switch the sign: minus or plus">±</button>' : ''}<input class="input" type="text" inputmode="decimal" enterkeyhint="done" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${esc('Your numerical answer to ' + mt.where)}" aria-describedby="${uid}-h ${uid}-mk" placeholder="Your answer"><button class="btn primary" type="button" data-nat>Check</button></div><p class="hm-hint" id="${uid}-h">${NAT_MSG.hint}</p>`}
      <div class="hm-fb" tabindex="-1"${hasSay() ? '' : ' role="status"'}></div>
      <div class="hm-qfoot"><a class="hm-link sm" href="#/q/${encodeURIComponent(q.id)}">Open in bank${icon('arrow-r')}</a></div>`;
    if (GA.fit && typeof GA.fit.all === 'function') safe(() => GA.fit.all(box));
    let solP = null;
    const solution = () => (solP = solP || Promise.resolve(safe(() => GA.data.solution(q.id), null)).catch(() => null));
    const inp = U.$('.hm-nat input', box), hint = U.$('.hm-hint', box);
    let hold = false;                                            // a refused comma, and no point typed since: the number is not trusted yet (P0-16)
    const nudge = text => {                                      // a NAT entry that is not a number is never graded (P0-16)
      const nat = U.$('.hm-nat', box);
      if (GA.ui && GA.ui.shake) GA.ui.shake(nat); else if (!reduced() && nat) { nat.classList.remove('hm-shake'); void nat.offsetWidth; nat.classList.add('hm-shake'); }
      if (hint) { hint.textContent = text; hint.classList.add('warn'); }
      if (hasSay()) say(text, 'assertive'); else if (GA.ui && GA.ui.toast) GA.ui.toast(text);
      if (inp) inp.focus({ preventScroll: true });
    };
    const judge = resp => {
      if (box.dataset.done) return;
      if (q.type === 'NAT') {
        const raw = String(resp == null ? '' : resp).trim(), why = natProblem(raw, hold);
        if (why) return nudge(why);
        resp = raw;
      }
      const m = GA.scoring.mark(q, resp), ok = m.state === 'correct';
      box.dataset.done = '1';
      GA.actions.attempt({ id: q.id, marks: q.marks, type: q.type }, resp, ok, Date.now() - t0, 'p');
      if (GA.ui && GA.ui.buzz) GA.ui.buzz(15); else buzz();
      const key = GA.scoring.describe(q.answer);
      U.$$('.hm-op', box).forEach(b => { b.disabled = true; const k = b.dataset.k; b.classList.add(k === q.answer.value ? 'ok' : k === resp ? 'bad' : 'dim'); if (k === resp) b.setAttribute('aria-pressed', 'true'); });
      if (inp) { inp.disabled = true; inp.classList.add(ok ? 'ok' : 'bad'); }
      U.$$('[data-nat], [data-pm]', box).forEach(b => (b.disabled = true));
      if (hint) hint.classList.remove('warn');
      const fb = U.$('.hm-fb', box), target = q.type === 'NAT' ? U.$('.hm-nat', box) : U.$(`.hm-op[data-k="${resp}"]`, box);
      if (ok) {
        const at = U.$('.k', target) || target; if (GA.ui && GA.ui.burst) GA.ui.burst(at); else burst(at);
        fb.className = 'hm-fb ok on'; fb.innerHTML = `${icon('check')}<div><p><b>Correct.</b> ${q.marks ? `${esc(U.plural(q.marks, 'mark'))}${(GA.store.state.q[q.id] || {}).n > 1 ? '' : ', first try'}.` : (GA.store.state.q[q.id] || {}).n > 1 ? '' : 'First try.'}</p></div>`;
      } else {
        if (target && GA.ui && GA.ui.shake) GA.ui.shake(target);
        else if (!reduced() && target) { target.classList.remove('hm-shake'); void target.offsetWidth; target.classList.add('hm-shake'); }
        fb.className = 'hm-fb bad on';                            // D17 option C: a neutral banner with the ✕; the pick keeps its fill, the right answer is filled green
        fb.innerHTML = `${icon('x')}<div><p><b>Not quite.</b> The official answer is <b>${esc(key)}</b>.</p></div>`;
      }
      // answered footer (P1-33): the card's Worked-solution fold (its chev-d chevron, which views.css turns over when open: P3-33;
      // arrow-r is for links), Learn this, and Another question in the hero
      const foot = U.$('.hm-qfoot', box), les = lessonFor(D, meta), parts = [];
      if (les) parts.push(`<a class="hm-link sm hm-learn" href="${esc(les.href)}">Learn this: ${esc(les.title)} · ${les.minutes} min${icon('arrow-r')}</a>`);
      if (o.hero) parts.push(`<button class="btn sm hm-another" type="button" data-hm="another">${icon('shuffle')}<span>Another question</span></button>`);
      else parts.push(`<a class="hm-link sm" href="#/q/${encodeURIComponent(q.id)}">Open in bank${icon('arrow-r')}</a>`);
      foot.innerHTML = `${meta.hasSol ? `<details class="qc-sd hm-sol"><summary>${icon('bulb')}<span>Worked solution</span>${icon('chev-d', 'qc-chev')}</summary><div class="qc-sb md ui hm-sol-b"></div><a class="hm-link sm hm-sol-more" href="#/q/${encodeURIComponent(q.id)}">Read the full solution${icon('arrow-r')}</a></details>` : ''}<div class="hm-qacts">${parts.join('')}</div>`;
      const det = U.$('.hm-sol', foot);
      const fill = async () => {
        const body = U.$('.hm-sol-b', det); if (!body || body.dataset.ready) return;
        body.dataset.ready = '1'; body.innerHTML = '<span class="hm-qsk"><i></i><i style="width:60%"></i></span>';
        const sol = await solution();
        if (!box.isConnected) return;
        body.innerHTML = sol && sol.s ? GA.md.render(sol.s, {}) : '<p>No worked solution yet; the official key above is exact.</p>';
        if (GA.fit && typeof GA.fit.all === 'function') safe(() => GA.fit.all(body));     // P1-54: the shared fit pass once the solution is in
        capSolution(det);
      };
      if (det) det.addEventListener('toggle', () => { if (det.open) fill(); });
      // P1-40 / D17: after a miss on a keyed MCQ, the Trap sentence that names the picked option (GA.pyqLib.trapLine, WP9b); never on NAT or a disputed key
      const tl = GA.pyqLib && typeof GA.pyqLib.trapLine === 'function' ? GA.pyqLib.trapLine : null;
      const verdict = plainText(fb.innerHTML);
      fb.focus({ preventScroll: true });                          // P1-48: focus lands on the result, not on the page body
      if (!ok && q.type === 'MCQ' && tl && meta.hasSol && !meta.disputed && !(DISP && DISP.has(q.id))) {
        let said = false;                                         // one announcement: the verdict with its Trap line, or the verdict alone if the solution is slow
        const t = setTimeout(() => { said = true; say(verdict); }, 900);
        solution().then(sol => {
          const line = sol && box.isConnected ? safe(() => tl(sol.s, [resp]), null) || safe(() => tl(sol, [resp]), null) : null;
          let extra = '';
          if (line && typeof line === 'string') {
            const p = U.h('p.hm-trap'); p.innerHTML = `<b>Trap.</b> ${GA.md.inline(line)}`;
            const w = U.$('div', fb); if (w) w.append(p);
            extra = ' ' + plainText(p.innerHTML);
          }
          if (!said) { clearTimeout(t); say(verdict + extra); } else if (extra) say(extra.trim());
        });
      } else say(verdict);
      if (o.after) o.after(ok);
    };
    box.onclick = e => {
      const b = e.target.closest('.hm-op'); if (b && box.contains(b)) return judge(b.dataset.k);
      if (e.target.closest('[data-nat]')) return judge(inp ? inp.value : '');
      if (e.target.closest('[data-pm]') && inp && !inp.disabled) {
        const v = inp.value.trim(); inp.value = v.charAt(0) === '-' ? v.slice(1) : '-' + v;
        inp.dispatchEvent(new Event('input')); inp.focus({ preventScroll: true });     // through the same filter, so it remembers the new value
      }
    };
    if (inp) {
      inp.addEventListener('input', () => {
        if (inp.disabled) return;
        // only digits, one '.', and a leading minus get in (the refused key is dropped where it was typed, the caret stays put); a refused comma
        // keeps its line and holds grading back until a point is typed or the box is emptied, so '0,75' never quietly becomes 75
        const v = inp.value, n = natInput(v, hold);
        if (n.text !== v) {
          const at = inp.selectionStart == null ? v.length : inp.selectionStart, caret = cleanNat(v.slice(0, at).replace(/[−‒–—]/g, '-')).length;
          inp.value = n.text;
          try { inp.setSelectionRange(caret, caret); } catch (err) { /* not focused */ }
        }
        hold = n.hold;
        if (hint) { hint.textContent = n.warn || NAT_MSG.hint; hint.classList.toggle('warn', !!n.warn); }
      });
      inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); judge(inp.value); } };
    }
  }
  mountQuestion.n = 0;
  function burst(el) {
    return;                                        // no confetti on a public study site (2026-10-18 theme); the answer's own state shows the result
    if (reduced() || !el || !el.getBoundingClientRect) return;
    const r = el.getBoundingClientRect(), b = document.createElement('div');
    b.className = 'hm-burst'; b.setAttribute('aria-hidden', 'true');
    b.style.left = (r.left + r.width / 2) + 'px'; b.style.top = (r.top + r.height / 2) + 'px';
    let h = '<b></b>';
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2 + Math.random() * 0.4, d = 30 + Math.random() * 26; h += `<i style="--x:${(Math.cos(a) * d).toFixed(1)}px;--y:${(Math.sin(a) * d).toFixed(1)}px"></i>`; }
    b.innerHTML = h; document.body.appendChild(b); setTimeout(() => b.remove(), 760);
  }
  const shown = new Set();          // ids shown this session (shuffle never repeats until the pool runs dry)
  let CANDS = null, CSET = null, LOADERR = null;
  function candidates() {
    const D = GA.data.D;
    if (!DISP) DISP = new Set(safe(() => GA.insights.get().disputes().map(x => x.id), []));
    if (!CANDS) { CANDS = D.questions.filter(m => isCandidate(m) && !DISP.has(m.id)); CSET = new Set(CANDS.map(m => m.id)); }
    return CANDS;
  }
  /** a paper's questions, remembering a failed load (an offline hosted copy) so the widget can say so honestly (P1-59) */
  const paperOf = id => Promise.resolve().then(() => GA.data.paper(id)).then(l => l || [], e => { LOADERR = e || new Error('load'); return []; });
  /** a question for a widget. o = {pool: [subject ids] for the first-run question, only: a question id (the ?try= dev aid)} */
  async function findQuestion(avoid, o) {
    o = o || {};
    const D = GA.data.D, s = GA.store.state;
    candidates();
    if (o.only && D.qById[o.only] && D.qById[o.only].type !== 'MSQ') {
      const one = await Promise.resolve(safe(() => GA.data.question(o.only), null)).catch(() => null);
      if (one && one.answer && (one.type === 'MCQ' ? (one.options || []).length === 4 && one.answer.kind === 'single' : one.answer.kind === 'range')) return one;
    }
    const ok = m => (o.pool ? isFirstRunQ(m, o.pool) : true);
    const tried = new Set(), pool0 = CANDS.filter(ok);
    for (let i = 0; i < 6; i++) {
      const meta = pickQuestion(pool0.filter(m => !tried.has(m.paper)), s, Math.random, avoid);
      if (!meta) break;
      tried.add(meta.paper);
      const list = await paperOf(meta.paper);
      const pool = list.filter(q => CSET.has(q.id) && ok(D.qById[q.id]) && isShort(q));
      const q = pickQuestion(pool, s, Math.random, avoid);
      if (q) return q;
    }
    return null;
  }
  /** the question of the day (P3-46, D12): the one remembered for today (one paper file), else today's pick from today's order (qotdOrder +
      qotdPick: at most 5 paper files in 2 parallel rounds, P2-79), which is then remembered in state.seen, so every later visit of the day
      shows it again even when the pools move. null when no file arrived */
  async function findQotd() {
    const D = GA.data.D, s = GA.store.state, today = U.today(), start = U.dayBounds(today)[0];
    candidates();
    const kept = qotdSaved(s, today);
    if (kept && CSET.has(kept)) { const q = (await paperOf(D.qById[kept].paper)).find(x => x.id === kept); if (q && isShort(q)) return q; }
    const { q } = await qotdPick(qotdOrder(CANDS, s, today, start, D), paperOf, x => CSET.has(x.id) && isShort(x));
    if (q && kept !== q.id && GA.actions && typeof GA.actions.setFlag === 'function') safe(() => GA.actions.setFlag(QOTD_FLAG, qotdValue(s, today, q.id)));
    return q || null;
  }
  async function loadQuestion(out, box, my, o) {
    if (!box) return;
    o = o || {};
    const avoid = new Set(shown), refocus = box.contains(document.activeElement) || !!o.refocus;
    U.$$('.hm-qcard[data-qid]', out).forEach(b => avoid.add(b.dataset.qid));
    LOADERR = null;
    let q = o.qotd && !o.only ? await findQotd() : null;
    const daily = !!q;
    if (!q) q = await findQuestion(avoid, o);
    if (!q && shown.size) { shown.clear(); q = await findQuestion(new Set(U.$$('.hm-qcard[data-qid]', out).map(b => b.dataset.qid)), o); }
    if (my !== gen || !box.isConnected) return;
    if (o.qotd && !daily && q) {                  // not the day's pick (a pinned ?try= question, or no file of the day's order arrived): say so
      box.dataset.mode = 'random'; const h = U.$('#hm-rq-h', out); if (h) h.textContent = 'Random question';
    }
    if (!q) {
      if (o.hero && !LOADERR && !shown.size) {             // the first-run pool holds no question for the card: the papers panel takes its place
        const host = box.closest('.hm-try'), lead = U.$('#hm-try-lead', out), I = GA.insights.get(), D = GA.data.D;
        if (host) { host.outerHTML = papersCard(I, D, groupFacts(I, D)); if (lead) lead.remove(); return; }
      }
      if (LOADERR && GA.ui && typeof GA.ui.loadFailed === 'function') {   // a file that did not arrive: the shell's honest card, with Try again
        safe(() => GA.ui.loadFailed(box, { what: 'question', retry: () => { box.innerHTML = qSkeleton(); loadQuestion(out, box, gen, o); } }));
        return;
      }
      box.innerHTML = `<p class="hm-empty">No question could be loaded here. <a class="hm-link sm" href="#/pyq">Open the question bank${icon('arrow-r')}</a></p>`; return;
    }
    shown.add(q.id); box.dataset.qid = q.id;
    mountQuestion(box, q, { hero: !!o.hero });
    if (refocus) { const f = U.$('.hm-op, .hm-nat input', box); if (f) f.focus({ preventScroll: true }); }
    if (o.after) o.after(q);
  }

  /* ------------------------------------------------------------------ behaviour */
  function wire(out, m, my, ctx, x) {
    const $ = s => U.$(s, out), once = first;
    // count-ups (GA.reveal handles [data-count]) and ring fills: first visit of the session only
    if (first) {
      later(() => U.$$('.hm-ring .pr', out).forEach(c => { c.style.strokeDashoffset = String(100 - +c.dataset.p); }), reduced() ? 0 : 350);
      later(() => { const ln = $('.hm-spark .ln'); if (ln) ln.classList.add('go'); }, reduced() ? 0 : 500);
      first = false;
    }
    // hero figure
    if (m && m.figure === 'diagram') {           // phones hide the figure panel: load and measure the lesson's drawings only once it can show
      const mq = g.matchMedia ? g.matchMedia('(max-width: 700px)') : null;
      if (!mq || !mq.matches) loadDiagram(out, m, my, once);
      else if (mq.addEventListener) {
        const on = () => { if (!mq.matches && my === gen) { mq.removeEventListener('change', on); loadDiagram(out, m, my, false); } };
        mq.addEventListener('change', on); live.push(() => mq.removeEventListener('change', on));
      }
    }
    U.on(out, 'click', '#hm-replay', e => { if (my !== gen) return; e.preventDefault(); diagramPlay(out); });
    // first run: "or pick a paper" scrolls to the ranked papers (a real link to #/#hm-subjects, so it also opens in a new tab)
    const pk = $('#hm-pick');
    if (pk) pk.addEventListener('click', e => {
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const t = $('#hm-subjects'); if (t) { t.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); t.focus({ preventScroll: true }); }
    });
    // the inline questions load one after the other (the second avoids the first one's question); ?try=<id> pins the first one (a screenshot and self-test aid)
    const only = ctx && ctx.query && ctx.query.try ? String(ctx.query.try) : '';
    const tryBox = $('#hm-try'), rq = $('#hm-rq');
    const queue = [];
    const pool = tryBox ? String(tryBox.dataset.pool || '').split(',').filter(Boolean) : null;
    if (tryBox) queue.push(() => loadQuestion(out, tryBox, my, { hero: true, pool, only }));
    if (rq) queue.push(() => loadQuestion(out, rq, my, { only: tryBox ? '' : only, qotd: rq.dataset.mode === 'qotd' }));
    (async () => { for (const f of queue) await f(); })();
    [tryBox, rq].forEach(b => { if (b && GA.fit && typeof GA.fit.watch === 'function') { const stop = safe(() => GA.fit.watch(b), null); if (typeof stop === 'function') live.push(stop); } });
    const sh = $('#hm-shuffle');
    if (sh && rq) sh.addEventListener('click', () => {
      rq.removeAttribute('data-qid'); rq.innerHTML = qSkeleton();
      if (rq.dataset.mode === 'qotd') { rq.dataset.mode = 'random'; const h = $('#hm-rq-h'); if (h) h.textContent = 'Random question'; }   // after the day's pick, the shuffle (D12)
      loadQuestion(out, rq, gen, { after: () => { if (!reduced()) { rq.classList.remove('hm-rise'); void rq.offsetWidth; rq.classList.add('hm-rise'); } } });
    });
    U.on(out, 'click', '[data-hm="another"]', () => {
      if (!tryBox || my !== gen) return;                          // a handler from an earlier visit (if the host were reused) does nothing
      tryBox.removeAttribute('data-qid'); tryBox.innerHTML = qSkeleton();
      loadQuestion(out, tryBox, gen, { hero: true, pool, refocus: true, after: () => { if (!reduced()) { tryBox.classList.remove('hm-rise'); void tryBox.offsetWidth; tryBox.classList.add('hm-rise'); } } });
    });
    // a capped worked solution re-checks its cap when the layout changes width (phones never cap)
    const recap = U.debounce(() => U.$$('.hm-sol[open]', out).forEach(capSolution), 150);
    g.addEventListener('resize', recap); live.push(() => g.removeEventListener('resize', recap));
    // What the papers say fills in after the first paint (P2-56): when it nears the screen, or when the browser is idle
    const fsec = $('#hm-find');
    if (fsec && x) {
      const fill = () => { if (my === gen && fsec.isConnected) fillFindings(out, x.I, x.D, x.T, x.fo); };
      if (GA.reveal && typeof GA.reveal.whenVisible === 'function') { const stop = safe(() => GA.reveal.whenVisible(fsec, fill, { margin: 700 }), null); if (typeof stop === 'function') live.push(stop); }
      if (typeof g.requestIdleCallback === 'function') { const id = g.requestIdleCallback(fill, { timeout: 1500 }); live.push(() => g.cancelIdleCallback(id)); }
      else later(fill, 400);
    }
  }

  function footer(I, D) {
    const src = I.totals.papers ? `Questions from ${U.plural(I.totals.papers, 'ICAI paper')} · ` : 'Syllabus and exam dates from ICAI · ';
    return `<p class="hm-foot">${src}data ${esc(D.built)} · your progress stays in this browser · not affiliated with ICAI · <a href="#/about">Sources and method</a></p>`;
  }

  GA.views = GA.views || {};
  GA.views.home = {
    enter(ctx, out) {
      const D = GA.data.D, I = GA.insights.get(), S = GA.store, s = S.state, T = I.totals, today = U.today();
      if (GA.shell && GA.shell.crumbs) GA.shell.crumbs([['Home', '#/']]);
      if (GA.shell && GA.shell.layout) GA.shell.layout(null);
      live.forEach(f => f()); live = []; const my = ++gen;
      const step = safe(() => stepFor(s, D, I, { today }), null);
      const exam = GA.stats && typeof GA.stats.exam === 'function' ? safe(() => GA.stats.exam(s, D.exam, today), null) : null;
      const m = safe(() => heroModel(s, D, I, { step, today, exam }), null) || firstRunModel(I, D, null, { exam });
      const firstRun = !!m.first;
      // sections with no data hide themselves: practice and the findings need ICAI questions; labs() returns '' with no ready lab
      const order = sectionsFor(firstRun, D);
      const enterAnim = first && !reduced();
      const tried = new Set(Object.keys(s.labs || {}).filter(id => s.labs[id] && (s.labs[id].runs || (s.labs[id].ch && s.labs[id].ch.n))));
      const fo = firstRun ? {} : { day: today, subject: m.subject || null };      // a returning learner's findings rotate daily (P3-01)
      const part = (k, i) => k === 'bento' ? bento(I, s, D, T, i) : k === 'findings' ? findings(I, D, T, i) : k === 'labs' ? labs(I, T, i, { returning: !firstRun, tried })
        : k === 'practice' ? practiceRow(I, s, D, firstRun, i, m) : k === 'footer' ? footer(I, D) : '';
      out.innerHTML = `<div class="hm${enterAnim ? ' hm-enter' : ''}${firstRun ? ' hm-is-first' : ''}">
        <div class="hm-top">${firstRun ? heroFirst(m) : heroReturning(m)}${strip(I, s, D, !firstRun && !m.noLessons)}</div>
        ${order.filter(k => k !== 'hero' && k !== 'strip').map((k, i) => part(k, i + 2)).join('')}
      </div>`;
      wire(out, firstRun ? null : m, my, ctx, { I, D, T, fo });
    },
    leave() { live.forEach(f => f()); live = []; gen++; U.$$('.hm-burst').forEach(b => b.remove()); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
