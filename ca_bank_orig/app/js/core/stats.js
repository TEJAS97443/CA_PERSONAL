/* PassBook — analytics derived from learner state + content catalogue. Pure functions: (state, D, today) -> numbers.
   Nothing here invents data: every figure is computed from `state` (what the learner did) and `D` (what the site contains).

   D (built by data.js, or by hand in tests):
     subjects  [{id,name,hue,topics:[{id,name,status,subtopics:[{id,name}]}]}]
     topicOf   {subtopicId: topicId}              subjectOf {topicId|subtopicId: subjectId}
     lessons   [{id,subject,topic,subtopic,minutes}]       lessonById
     cards     [{id,lesson,subject,topic}]
     questions [{id,subject,topic,subtopic,marks,type,year,section,status}]   qById
     topicMarks {topicId: marks asked historically}
     exam      manifest.exam = {cycles:[…]} (optional; EXAM_FALLBACK until the build ships it)

   The learning model (docs/ARCHITECTURE.md §10.3 and §10.5, owned here): hasProgress (the one "new learner" predicate), exam / season /
   phaseOf / countdown (the exam calendar), and nextStep (the one answer to "what next", with nextLesson as its kind-'lesson' wrapper).
   I below is GA.insights (I.order, I.ranking, I.path, I.lessonInfo); nextStep builds it from D when the caller does not pass it. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');
  const SRS = GA.srs || require('./srs.js');

  const HALF_LIFE = 45;            // days: an attempt's weight halves every 45 days
  const W = { lesson: 0.30, practice: 0.55, cards: 0.15 };
  const MIN_ACTIVE_SECS = 600;     // 10 minutes of focused study counts as an active day even with no recorded answers
  const REAL_SECS = 120;           // a lesson record is real reading (not a peek) from 2 minutes on, or when done, self-checked or position-saved
  const RETRY_N = 5;               // the planner's notebook retry batch (P1-43)
  const ISO = /^\d{4}-\d{2}-\d{2}$/;
  const LEGACY_DEFAULT = '2027-02-06';   // the old blank() exam date: on a profile that never chose it, it counts as unset (§10.5)
  /** the exam calendar used until the build ships manifest.exam (or whenever it has no cycles): CA Intermediate Group II, January 2027, from ICAI's
      Important Announcement No. 13-CA (EXAM)/JANUARY/2027 of 23 Sep 2026 (content/exam.json carries the same cycle with its source) */
  const EXAM_FALLBACK = { cycles: [{
    id: 'icai-inter-2027-01', label: 'CA Inter January 2027', organiser: 'ICAI', group: 'Group II',
    days: ['2027-01-08', '2027-01-10', '2027-01-12'],
    papers: { P4: ['2027-01-08'], P5: ['2027-01-10'], P6: ['2027-01-12'] }, result: null,
    time: { start: '14:00', end: '17:00', reading: '13:45', zone: 'IST' },
    source: 'https://resource.cdn.icai.org/94359exam-aps6372-stu-iff-jan2027.pdf', checked: '2026-10-20',
    note: "Dates as announced by ICAI; the paper on each day follows ICAI's Group II order. Verify on icai.org and your admit card."
  }] };
  /** 'P6A' / 'P6B' sit in one paper (Paper 6) on one day */
  const paperCode = p => String(p || '').replace(/^(P\d)[AB]$/, '$1');
  const PAPER_NAME = code => (/^P\d$/.test(code) ? 'Paper ' + code.slice(1) : code);
  /** the paper code(s) written on a day of a cycle: ['P4'] */
  const papersOn = (cycle, day) => Object.keys((cycle && cycle.papers) || {}).filter(k => Array.isArray(cycle.papers[k]) && cycle.papers[k].includes(day)).sort();

  /* ---------------------------------------------------------------- activity */
  function dayActive(a) { return !!a && (a.q + a.c + a.l > 0 || a.s >= MIN_ACTIVE_SECS); }

  function streak(state, today) {
    const act = state.act;
    let best = 0, run = 0;
    const keys = Object.keys(act).filter(k => dayActive(act[k])).sort();
    let prev = null;
    for (const k of keys) { run = prev && U.daysBetween(prev, k) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = k; }
    const activeToday = dayActive(act[today]);
    let cur = 0, d = activeToday ? today : U.addDays(today, -1);     // the streak survives until the end of today
    while (dayActive(act[d])) { cur++; d = U.addDays(d, -1); }
    return { current: cur, best, activeToday, totalDays: keys.length };
  }

  /** weeks x 7 grid ending on `today`'s week (Mon-first). level 0-4 from minutes+items. */
  function heatmap(state, weeks, today) {
    const dow = (U.parseDay(today).getDay() + 6) % 7;
    const start = U.addDays(today, -dow - (weeks - 1) * 7);
    const cells = [];
    for (let i = 0; i < weeks * 7; i++) {
      const d = U.addDays(start, i);
      const a = state.act[d];
      const score = a ? a.q + a.c * 0.5 + a.l * 5 + a.s / 300 : 0;
      cells.push({ day: d, future: d > today, score, level: !a || score <= 0 ? 0 : score < 5 ? 1 : score < 15 ? 2 : score < 35 ? 3 : 4, a: a || null });
    }
    return { cells, weeks, start };
  }

  function timeStats(state, today) {
    const sec = k => (state.act[k] ? state.act[k].s : 0);
    let week = 0;
    for (let i = 0; i < 7; i++) week += sec(U.addDays(today, -i));
    const total = Object.values(state.act).reduce((s, a) => s + a.s, 0);
    const days = Object.values(state.act).filter(dayActive).length;
    return { todayMin: Math.round(sec(today) / 60), weekMin: Math.round(week / 60), totalMin: Math.round(total / 60), avgMin: days ? Math.round(total / 60 / days) : 0 };
  }

  function todayGoals(state, today) {
    const a = state.act[today] || { s: 0, q: 0, c: 0, l: 0 }, g = state.profile.goals;
    const mk = (key, label, done, target, unit) => ({ key, label, done, target, unit, pct: target ? Math.min(1, done / target) : 1 });
    return [
      mk('questions', 'Questions', a.q, g.questions, ''),
      mk('cards', 'Flashcards', a.c, g.cards, ''),
      mk('lessons', 'Lessons', a.l, g.lessons, ''),
      mk('minutes', 'Minutes', Math.round(a.s / 60), g.minutes, 'min')
    ];
  }

  /* ---------------------------------------------------------------- progress predicate (P0-22) */
  /** true when the learner did something on purpose: a live test, any lesson record, a question record (an answer, a 'seen' check, a bookmark,
      a flag or a note), a finished test, any card record or any lab record. Time on a page alone (state.act) never counts. */
  function hasProgress(state) {
    const s = state;
    if (!s || typeof s !== 'object') return false;
    const obj = o => (o && typeof o === 'object' ? o : {});
    if (s.live && typeof s.live === 'object') return true;
    if (Object.keys(obj(s.lessons)).length) return true;
    if (Array.isArray(s.tests) && s.tests.length) return true;
    if (Object.keys(obj(s.cards)).some(k => k !== 'undefined' && s.cards[k])) return true;
    if (Object.keys(obj(s.labs)).length) return true;
    const q = obj(s.q);
    return Object.keys(q).some(k => { const e = q[k]; return !!e && (e.n > 0 || !!e.seen || !!e.bm || !!e.flag || (typeof e.note === 'string' && e.note.trim() !== '')); });
  }

  /* ---------------------------------------------------------------- exam calendar (P1-46, P1-61, P0-20) */
  const cycMemo = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
  const okCycle = c => !!c && Array.isArray(c.days) && c.days.length > 0 && c.days.every(d => typeof d === 'string' && ISO.test(d));
  const firstDay = c => c.days.reduce((m, d) => (d < m ? d : m), c.days[0]);
  const lastDay = c => c.days.reduce((m, d) => (d > m ? d : m), c.days[0]);
  /** the exam cycles of X (= D.exam), sorted by first day; the fallback when X has none */
  function cyclesOf(X) {
    const src = X && Array.isArray(X.cycles) && X.cycles.some(okCycle) ? X : EXAM_FALLBACK;
    if (cycMemo && cycMemo.has(src)) return cycMemo.get(src);
    const list = src.cycles.filter(okCycle).slice().sort((a, b) => (firstDay(a) < firstDay(b) ? -1 : firstDay(a) > firstDay(b) ? 1 : 0));
    if (cycMemo) cycMemo.set(src, list);
    return list;
  }
  const yearOfCycle = c => +firstDay(c).slice(0, 4);
  function examLabel(date, cycle) {
    if (cycle && cycle.label) return cycle.label;
    if (date && ISO.test(date)) { const m = +date.slice(5, 7); if (m === 1 || m === 5 || m === 9) return 'CA Inter ' + ['', 'January', '', '', '', 'May', '', '', '', 'September'][m] + ' ' + date.slice(0, 4); }
    return 'your exam';
  }
  /** {code: 'P4', name: 'Paper 4', day} for the paper written on `day` of `cycle`, else null */
  function paperOf(cycle, day) {
    const codes = papersOn(cycle, day);
    return codes.length === 1 ? { code: codes[0], name: PAPER_NAME(codes[0]), day } : null;
  }
  /** each subject's paper day in the cycle the learner counts to: {cma: '2027-01-08', aud: '2027-01-10', fm: '2027-01-12', sm: '2027-01-12'}
      (a subject's syllabus `paper` P6A / P6B is Paper 6); {} when the calendar has no paper days */
  function paperDays(D, X, today, state) {
    const E = exam(state || null, X === undefined ? (D && D.exam) : X, today);
    const cyc = E.cycle || cyclesOf(X === undefined ? (D && D.exam) : X).find(c => c.days.some(d => d >= (today || U.today()))) || null;
    const out = {};
    if (!cyc || !cyc.papers) return out;
    ((D && D.subjects) || []).forEach(s => { const pd = cyc.papers[paperCode(s.paper)]; if (Array.isArray(pd) && pd.length) out[s.id] = pd[0]; });
    return out;
  }
  /** the live catalogue's exam data (browser convenience for callers that do not pass X) */
  const liveExam = () => (GA.data && GA.data.D ? GA.data.D.exam : undefined);

  /** The exam day the app counts to (docs/ARCHITECTURE.md §10.5). X = D.exam ({cycles}); today = 'YYYY-MM-DD'.
      → {date, set, basis: 'yours' | 'official paper day' | 'assumed' | null, label, cycle, paper: {code, name, day} | null, daysLeft,
         last: {date, label, cycle, daysAgo} | null}. Unset, it counts to the first paper day still ahead (Paper 4 until 8 Jan, then Paper 5 …) */
  function exam(state, X, today) {
    const t = today || U.today();
    const cyc = cyclesOf(X === undefined ? liveExam() : X);
    const p = (state && state.profile) || {};
    const mine = typeof p.examDate === 'string' && ISO.test(p.examDate) ? p.examDate : null;
    // set: the learner chose the date (examSet). A stored date other than the old default also counts: the v3 store only leaves examSet false
    // on the untouched default (or null), so a different date can only come from a writer that predates examSet (unmigrated profile, an
    // older setProfile caller), and it was the learner's choice (§10.5 sequencing)
    const set = !!mine && (p.examSet === true || mine !== LEGACY_DEFAULT);
    const ended = cyc.filter(c => lastDay(c) < t), endedLast = ended[ended.length - 1] || null;
    let last = endedLast ? { date: lastDay(endedLast), label: examLabel(lastDay(endedLast), endedLast), cycle: endedLast, daysAgo: U.daysBetween(lastDay(endedLast), t) } : null;
    if (set) {
      // ICAI holds three attempts a year, so a date outside every cycle has no cycle (its label comes from its month: 'CA Inter May 2027')
      const cycle = cyc.find(c => c.days.includes(mine)) || null;
      const label = examLabel(mine, cycle), daysLeft = U.daysBetween(t, mine);
      if (daysLeft < 0) last = { date: mine, label, cycle, daysAgo: -daysLeft };
      return { date: mine, set: true, basis: 'yours', label, cycle, paper: paperOf(cycle, mine), daysLeft, last };
    }
    const next = cyc.find(c => c.days.some(d => d >= t));
    if (next) {
      const pd = [].concat(...Object.values(next.papers || {}).filter(Array.isArray)).filter(d => typeof d === 'string' && ISO.test(d) && d >= t).sort();
      const date = pd.length ? pd[0] : next.days.filter(d => d >= t).sort()[0];
      return { date, set: false, basis: pd.length ? 'official paper day' : 'assumed', label: examLabel(date, next), cycle: next, paper: paperOf(next, date), daysLeft: U.daysBetween(t, date), last };
    }
    const newest = cyc[cyc.length - 1];
    return { date: null, set: false, basis: null, label: 'the next CA Inter attempt', cycle: null, paper: null, daysLeft: null, last };
  }

  /** 'normal' | 'final' | 'eve' | 'day' | 'done' | 'between' (§10.5; the season recipes of P1-61 and P2-72 read it) */
  function season(state, X, today) {
    const t = today || U.today(), E = exam(state, X, t);
    if (E.daysLeft != null && E.daysLeft >= 0) {
      const firm = E.basis === 'yours' || E.basis === 'official paper day';
      if (firm && E.daysLeft === 0) return 'day';
      if (firm && E.daysLeft === 1) return 'eve';
      return E.daysLeft <= 14 ? 'final' : 'normal';
    }
    if (E.last && E.last.daysAgo >= 1 && E.last.daysAgo <= 30 && (E.set || hasProgress(state))) return 'done';
    return 'between';
  }

  /** the one phase function (P0-20), half-open ranges: learn > 100 days, practice 46–100, mocks 15–45, final 0–14; null with no exam ahead */
  function phaseOf(daysLeft) {
    if (daysLeft == null || !isFinite(daysLeft) || daysLeft < 0) return null;
    return daysLeft > 100 ? 'learn' : daysLeft >= 46 ? 'practice' : daysLeft >= 15 ? 'mocks' : 'final';
  }

  /** {days, weeks, phase, date, basis, label}: days and date are null when there is no exam date; phase from phaseOf (null after the exam) */
  function countdown(state, today, X) {
    const E = exam(state, X, today), days = E.daysLeft;
    return { days, weeks: days == null ? null : Math.floor(Math.max(0, days) / 7), phase: phaseOf(days), date: E.date, basis: E.basis, label: E.label };
  }

  /* ---------------------------------------------------------------- practice */
  function weight(ts, today) { const age = Math.max(0, (U.parseDay(today) - ts) / 864e5); return Math.pow(0.5, age / HALF_LIFE); }

  /** accuracy over a set of question ids using each question's latest outcome, recency-weighted, with a neutral prior */
  function practice(state, qids, today, availableCount) {
    let sw = 0, sok = 0, att = 0, cor = 0, attempts = 0, first = 0, firstN = 0;
    for (const id of qids) {
      const e = state.q[id];
      if (!e || !e.n) continue;
      att++; attempts += e.n;
      if (e.lastOk) cor++;
      if (e.firstOk != null) { firstN++; first += e.firstOk; }
      const w = weight(e.last, today);
      sw += w; sok += w * (e.lastOk ? 1 : 0);
    }
    if (!att) return { attempted: 0, correct: 0, attempts: 0, acc: null, score: null, firstTry: null };
    const acc = (sok + 0.5) / (sw + 1);
    const coverage = Math.min(1, att / Math.min(8, Math.max(1, availableCount || qids.length)));
    return { attempted: att, correct: cor, attempts, acc: cor / att, accWeighted: acc, score: acc * (0.4 + 0.6 * coverage), firstTry: firstN ? first / firstN : null };
  }

  function lessonsDone(state, lessons) {
    let done = 0, started = 0;
    for (const l of lessons) { const e = state.lessons[l.id]; if (e && e.done) done++; else if (e && e.visits) started++; }
    return { done, started, total: lessons.length };
  }

  /** cards: {total, seen, mature, score}. seen = reviewed at least once (s.last, the one 'seen' rule due() and /flash's 'learned' use, P2-74),
      so a card graded 'Again' (reps 0) still counts as reviewed; its strength is 0 until it is answered right again. */
  function cardScore(state, cards, today) {
    if (!cards.length) return { total: 0, seen: 0, mature: 0, score: null };
    let seen = 0, mature = 0, sum = 0;
    for (const c of cards) { const s = state.cards[c.id]; if (cardSeen(s)) { seen++; if (SRS.isMature(s)) mature++; sum += SRS.strength(s, today); } }
    return { total: cards.length, seen, mature, score: sum / cards.length };
  }

  function masteryOf(parts) {
    let w = 0, s = 0;
    if (parts.lesson != null) { w += W.lesson; s += W.lesson * parts.lesson; }
    if (parts.practice != null) { w += W.practice; s += W.practice * parts.practice; }
    if (parts.cards != null) { w += W.cards; s += W.cards * parts.cards; }
    return w ? s / w : null;
  }

  function index(D) {
    if (D._ix) return D._ix;
    const ix = { lessonsBy: {}, cardsBy: {}, qBy: {} };
    const add = (m, k, v) => (m[k] = m[k] || []).push(v);
    // a lesson's id is its sub-topic's id (the shipped lessons carry no `subtopic` field; P0-06), so completion counts finished lessons
    D.lessons.forEach(l => { add(ix.lessonsBy, l.subject, l); add(ix.lessonsBy, l.topic, l); add(ix.lessonsBy, l.subtopic || l.id, l); });
    D.cards.forEach(c => { add(ix.cardsBy, c.subject, c); add(ix.cardsBy, c.topic, c); });
    D.questions.forEach(q => { add(ix.qBy, q.subject, q.id); if (q.topic) add(ix.qBy, q.topic, q.id); if (q.subtopic) add(ix.qBy, q.subtopic, q.id); });
    D._ix = ix;
    return ix;
  }
  const ids = (m, k) => m[k] || [];

  /** per-topic summary for one subject */
  function topics(state, D, subjectId, today) {
    const ix = index(D);
    const sub = D.subjects.find(s => s.id === subjectId);
    return sub.topics.map(t => {
      const L = lessonsDone(state, ids(ix.lessonsBy, t.id));
      const qids = ids(ix.qBy, t.id);
      const P = practice(state, qids, today, qids.length);
      const C = cardScore(state, ids(ix.cardsBy, t.id), today);
      const parts = { lesson: L.total ? L.done / L.total : null, practice: P.score, cards: C.score };
      const marks = (D.topicMarks && D.topicMarks[t.id]) || 0;
      const touched = L.done > 0 || L.started > 0 || P.attempted > 0 || C.seen > 0;
      return { id: t.id, name: t.name, status: t.status, subtopics: t.subtopics.length, lessons: L, pyq: { total: qids.length, ...P }, cards: C, parts, touched, mastery: touched ? masteryOf(parts) : null, marks };
    });
  }

  /** per-subject summary (the dashboard's subject-mastery panel) */
  function subjects(state, D, today) {
    return D.subjects.map(s => {
      const tp = topics(state, D, s.id, today);
      const ix = index(D);
      const L = lessonsDone(state, ids(ix.lessonsBy, s.id));
      const qids = ids(ix.qBy, s.id);
      const P = practice(state, qids, today, qids.length);
      const C = cardScore(state, ids(ix.cardsBy, s.id), today);
      let w = 0, m = 0;
      for (const t of tp) { const wt = Math.max(1, t.marks); w += wt; m += wt * (t.mastery == null ? 0 : t.mastery); }
      const touched = tp.some(t => t.mastery != null);
      const nodes = s.topics.reduce((n, t) => n + t.subtopics.length, 0);
      return { id: s.id, name: s.name, hue: s.hue, area: s.area, topics: tp.length, subtopics: nodes, lessons: L, pyq: { total: qids.length, ...P }, cards: C,
               mastery: touched ? m / w : null, marks: tp.reduce((a, t) => a + t.marks, 0) };
    });
  }

  /** Syllabus completion: a sub-topic is complete when its lesson is done, or (no lesson written yet) when its PYQs are practised well. */
  function completion(state, D, today) {
    const ix = index(D);
    let done = 0, total = 0, withLesson = 0;
    D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => {
      total++;
      const ls = ids(ix.lessonsBy, n.id);
      if (ls.length) { withLesson++; if (ls.every(l => state.lessons[l.id] && state.lessons[l.id].done)) done++; return; }
      const qids = ids(ix.qBy, n.id).length ? ids(ix.qBy, n.id) : [];
      if (!qids.length) return;
      const P = practice(state, qids, today, qids.length);
      if (P.attempted >= Math.min(5, qids.length) && P.acc >= 0.6) done++;
    })));
    return { done, total, withLesson, pct: total ? done / total : 0 };
  }

  /** Topics to fix first: low accuracy on enough attempts, ranked by expected marks lost = historical share of marks x (1 - accuracy). */
  function weakTopics(state, D, today, opts) {
    const o = Object.assign({ limit: 6, minAttempts: 3 }, opts || {});
    const total = Object.values(D.topicMarks || {}).reduce((a, b) => a + b, 0) || 1;
    const rows = [];
    for (const s of D.subjects) for (const t of topics(state, D, s.id, today)) {
      const p = t.pyq;
      if (p.attempted < o.minAttempts) continue;
      const acc = p.accWeighted;
      if (acc >= 0.75) continue;
      const share = (t.marks || 1) / total;
      rows.push({ id: t.id, name: t.name, subject: s.id, subjectName: s.name, hue: s.hue, attempted: p.attempted, correct: p.correct, acc: p.acc, accWeighted: acc, marks: t.marks, share, lost: share * (1 - acc) * 100, lessons: t.lessons });
    }
    return rows.sort((a, b) => b.lost - a.lost).slice(0, o.limit);
  }

  /* ---------------------------------------------------------------- what is due (P2-74, P2-41, D8) */
  /** the one due-card definition (P2-74): a card is due when it has been seen (s.last) and s.due <= today, so a card graded 'Again' (reps 0)
      still counts. /flash, the chip, the Me badge, the planner and the home strip all read due() (flash.js counts its decks the same way). */
  const cardSeen = s => (SRS.isSeen ? SRS.isSeen(s) : !!s && typeof s.last === 'string' && ISO.test(s.last));
  const cardDue = (s, today) => (SRS.isDueSeen ? SRS.isDueSeen(s, today) : cardSeen(s) && s.due <= today);

  /* The notebook's retry rules (P2-41, D8 option 2):
       * an open miss first comes back the day after it was missed (never the same day), then on its review schedule (q.srs.due);
       * a right answer resolves the entry only when it comes at least RESOLVE_GAP days after the last miss.
     retryDay() is the reader's half (due(), the notebook's due list and retry dates); resolvesMiss() is the writer's half, which
     GA.actions.attempt calls when it records a right answer. Days are study days (U.dayOf, P3-28). */
  const FIRST_RETRY = 1, RESOLVE_GAP = 3;
  const dayOfTs = t => (typeof U.dayOf === 'function' ? U.dayOf(t) : U.dayKey(t));
  const stampOk = t => typeof t === 'number' && isFinite(t) && t > 0;
  /** the time of question qid's last miss: nb.missed (written with each miss), else the newest wrong row of the attempt log, else the
      question's last answer when that was wrong, else the entry's first miss (nb.added); null when no miss is known */
  function lastMiss(state, qid) {
    const nb = state && state.nb && state.nb[qid], e = state && state.q && state.q[qid];
    if (nb && stampOk(nb.missed)) return nb.missed;
    const log = state && Array.isArray(state.log) ? state.log : [];
    for (let i = log.length - 1; i >= 0; i--) { const r = log[i]; if (Array.isArray(r) && r[1] === qid && r[2] === 0 && stampOk(r[0])) return r[0]; }
    if (e && e.lastOk === 0 && stampOk(e.last)) return e.last;
    return nb && stampOk(nb.added) ? nb.added : null;
  }
  /** the day an open notebook entry comes back for a retry: its review day (q.srs.due), but never before the day after its last answer
      (after a miss that is the next day; after a right answer the schedule already lies later). null when the question has no open entry,
      no graded answer or no review schedule. Due for a retry today = retryDay(state, qid) <= today. */
  function retryDay(state, qid) {
    const nb = state && state.nb && state.nb[qid], e = state && state.q && state.q[qid];
    if (!nb || typeof nb !== 'object' || nb.resolved || !e || !(e.n > 0) || !e.srs || typeof e.srs.due !== 'string') return null;
    const floor = stampOk(e.last) ? U.addDays(dayOfTs(e.last), FIRST_RETRY) : null;
    return floor && floor > e.srs.due ? floor : e.srs.due;
  }
  /** D8: does a right answer at `now` (ms, default Date.now()) resolve question qid's open notebook entry? Only at least RESOLVE_GAP days
      after the last miss. Pure; the caller may pass the state before or after recording the answer (a right answer is never read as a miss). */
  function resolvesMiss(state, qid, now) {
    const nb = state && state.nb && state.nb[qid];
    if (!nb || typeof nb !== 'object' || nb.resolved) return false;
    const t = lastMiss(state, qid);
    if (t == null) return true;                          // nothing was missed: nothing to space out
    return U.daysBetween(dayOfTs(t), dayOfTs(stampOk(now) ? now : Date.now())) >= RESOLVE_GAP;
  }

  /** What is due for revision today: {cards, cardIds, newCards, questions, lessons} (ARCHITECTURE §10.3). cards = seen cards with s.due <= today
      (P2-74); questions = open notebook entries whose retry day has come, most urgent first (P2-41); lessons = finished lessons due a re-read. */
  function due(state, D, today) {
    const C = (state && state.cards) || {}, Q = (state && state.q) || {}, NB = (state && state.nb) || {};
    const cards = D.cards.filter(c => cardDue(C[c.id], today));
    const newCards = D.cards.filter(c => !cardSeen(C[c.id])).length;
    const questions = [];
    for (const id of Object.keys(Q)) {
      if (!NB[id] || !D.qById || !D.qById[id]) continue;
      const day = retryDay(state, id);
      if (day && day <= today) questions.push({ id, u: { due: day, ease: +Q[id].srs.ease || 2.5 } });
    }
    questions.sort((a, b) => SRS.byUrgency(a.u, b.u));
    // finished lessons come back for review 3, 7, 21 and 45 days after they were last opened (more visits = longer gaps)
    const lessons = D.lessons.filter(l => {
      const e = state.lessons[l.id];
      if (!e || !e.done) return false;
      const gap = [3, 7, 21, 45][Math.min(3, Math.max(0, (e.visits || 1) - 1))];
      return U.daysBetween(dayOfTs(e.last || e.done), today) >= gap;
    });
    return { cards: cards.length, cardIds: cards.map(c => c.id), newCards, questions: questions.map(x => x.id), lessons: lessons.map(l => l.id) };
  }

  /* ---------------------------------------------------------------- tests (P2-34) */
  /** the marking module for reading stored tests (GA.scoring.summary, §10.13): loaded before stats.js in the browser, required in Node */
  function scoringOf() {
    if (GA.scoring && typeof GA.scoring.summary === 'function') return GA.scoring;
    if (typeof require === 'function') { try { const m = require('./scoring.js'); if (m && typeof m.summary === 'function') return m; } catch (e) { /* not there */ } }
    return null;
  }
  const isFullKind = t => !!t && (t.kind === 'paper' || t.kind === 'mock');
  /** GA.stats.testTrend(state, D = GA.data.D, {all = false}) → the score trend, oldest first: one row per scored full-length sitting (a paper
      or a mock), so a 10-question quiz never sits on the same line as a 3-hour paper and an unscored sitting is never a point (P2-34).
      Each record is read through GA.scoring.summary (correct excludes marks to all, max counts graded questions, accuracy = correct ÷
      (correct + wrong)); minutes = the time actually used (usedMs, pauses excluded). {all: true} returns every finished test with its
      `full` and `scored` flags, for lists that show short tests with their kind. */
  function testTrend(state, D, opts) {
    const o = opts || {}, SC = scoringOf();
    const Dx = D || (GA.data && GA.data.D) || null;
    const list = (state && Array.isArray(state.tests) ? state.tests : []).filter(t => t && typeof t === 'object');
    const rows = list.slice().sort((a, b) => (a.finished || 0) - (b.finished || 0)).map(t => {
      const m = SC ? SC.summary(t, Dx) : null;
      const num = x => (typeof x === 'number' && isFinite(x) ? x : 0);
      const score = m ? m.score : num(t.score), max = m ? m.max : (typeof t.max === 'number' ? t.max : null);
      const scored = m ? !!m.scored : num(t.max) > 0;
      const attempted = m ? m.attempted : num(t.attempted), total = m ? m.total : num(t.total);
      const used = typeof t.usedMs === 'number' && isFinite(t.usedMs) && t.usedMs >= 0 ? t.usedMs : Math.max(0, num(t.finished) - num(t.started));
      // accuracy = correct ÷ (correct + wrong) when the record says what was wrong (per-question states or a wrong count); an older record
      // with neither keeps correct ÷ attempted rather than reading as 100 %
      const graded = !!(t.states && typeof t.states === 'object') || typeof t.wrong === 'number';
      return { id: t.id, kind: t.kind, title: t.title, at: t.finished, score, max, pct: max ? score / max : 0,
               accuracy: m && graded ? m.accuracy : (t.attempted ? num(t.correct) / t.attempted : null), attemptRate: total ? attempted / total : 0,
               negative: m ? m.negative : num(t.negative), minutes: Math.round(used / 60000), full: m ? !!m.full : isFullKind(t), scored };
    });
    return o.all ? rows : rows.filter(r => r.full && r.scored && r.max > 0);
  }

  /** accuracy by dimension for the Q log in `state.q` joined with the catalogue */
  function breakdown(state, D, key) {
    const out = {};
    for (const q of D.questions) {
      const e = state.q[q.id];
      const k = typeof key === 'function' ? key(q) : q[key];
      const r = (out[k] = out[k] || { total: 0, attempted: 0, correct: 0 });
      r.total++;
      if (e && e.n) { r.attempted++; if (e.lastOk) r.correct++; }
    }
    return out;
  }

  function overall(state, D, today) {
    const qids = D.questions.map(q => q.id);
    return practice(state, qids, today, qids.length);
  }

  /** accuracy over the last N days from the attempt log (all modes except lesson quizzes / labs) */
  function recentAccuracy(state, days, today) {
    const from = U.parseDay(U.addDays(today, -days + 1)).getTime();
    const rows = state.log.filter(r => r[0] >= from && /^[ptr]$/.test(r[4]));
    const ok = rows.filter(r => r[2]).length;
    return { n: rows.length, ok, acc: rows.length ? ok / rows.length : null };
  }
  function dailySeries(state, days, today, field) {
    const out = [];
    for (let i = days - 1; i >= 0; i--) { const d = U.addDays(today, -i); const a = state.act[d]; out.push({ day: d, v: a ? (field === 's' ? a.s / 60 : a[field]) : 0 }); }
    return out;
  }

  /* ---------------------------------------------------------------- the next step (P0-08, P1-02, P1-06, P1-61; ARCHITECTURE §10.3) */
  const recsOf = state => (state && state.lessons && typeof state.lessons === 'object' ? state.lessons : {});
  const quizDone = r => !!(r && r.quiz && typeof r.quiz === 'object' && Object.keys(r.quiz).some(k => { const e = r.quiz[k]; return !!e && (e.n > 0 || e.ok > 0); }));
  /** a lesson record is real reading when it is done, has 2+ minutes, a self-check answered or a saved position; anything else is a peek */
  function realLesson(r) { return !!r && typeof r === 'object' && (!!r.done || (r.secs || 0) >= REAL_SECS || quizDone(r) || !!(r.at && r.at.h)); }
  const stampOf = r => Math.max(+r.last || 0, +r.first || 0, typeof r.done === 'number' ? r.done : 0, (r.at && +r.at.t) || 0);
  const lessonDone = (state, id) => { const r = recsOf(state)[id]; return !!(r && r.done); };
  /** the newest real lesson record (peeks skipped), or null; scope: an optional subject id */
  function newestReal(state, D, subject) {
    const R = recsOf(state);
    let best = null, bt = -1;
    for (const id of Object.keys(R)) {
      const l = D.lessonById[id], r = R[id];
      if (!l || (subject && l.subject !== subject) || !realLesson(r)) continue;
      const t = stampOf(r);
      if (t > bt) { best = id; bt = t; }
    }
    return best;
  }

  /** the insights for D (I.order, I.ranking, I.path, I.lessonInfo), or a minimal syllabus-order stand-in when they cannot be built */
  function insightsOf(D) {
    let Ins = GA.insights;
    if (!Ins && typeof require === 'function') { try { Ins = require('./insights.js'); } catch (e) { Ins = null; } }
    if (Ins) {
      try {
        if (GA.data && GA.data.D === D && Ins.get) { const live = Ins.get(); if (live) return live; }
        return Ins.build(D, null);
      } catch (e) { /* a partial catalogue (tests): fall through */ }
    }
    return liteInsights(D);
  }
  const liteMemo = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
  function liteInsights(D) {
    if (liteMemo && liteMemo.has(D)) return liteMemo.get(D);
    const pos = {}; let k = 0;
    (D.subjects || []).forEach(s => (s.topics || []).forEach(t => (t.subtopics || []).forEach(n => { pos[n.id] = k++; })));
    const ix = id => (id in pos ? pos[id] : 1e9);
    const L = (D.lessons || []).slice().sort((a, b) => ix(a.id) - ix(b.id));
    const lite = {
      order: sid => L.filter(l => !sid || l.subject === sid).map(l => l.id),
      ranking: (D.subjects || []).map(s => s.id).sort((a, b) => (a === 'ga') - (b === 'ga')),
      path: () => null, lessonInfo: () => null, subject: () => null
    };
    if (liteMemo) liteMemo.set(D, lite);
    return lite;
  }
  /** nextStep's subject ranking: CS subjects by like-for-like marks a paper (P1-03), then General Aptitude */
  function rankingOf(I, D) {
    if (Array.isArray(I.ranking) && I.ranking.length) return I.ranking;
    const rows = (I.subjects || []).slice();
    if (!rows.length) return (D.subjects || []).map(s => s.id);
    const v = r => (r.perPaper != null ? r.perPaper : r.marksPerPaper || 0);
    const cs = rows.filter(r => r.section !== 'GA').sort((a, b) => v(b) - v(a)), ga = rows.filter(r => r.section === 'GA');
    return cs.concat(ga).map(r => r.id);
  }
  const statusIn = l => !l.status || l.status === 'in';

  function makeCtx(state, D, o) {
    const today = o.today || U.today(), I = o.I || insightsOf(D);
    const profile = (state && state.profile) || {};
    const subjName = id => (D.subjectById && D.subjectById[id] ? D.subjectById[id].name : id);
    // bank: the build shipped ICAI questions (a later job builds the bank); without them no step names a test, a mock or a past-question count
    return { state, D, I, today, profile, subjName, ranking: rankingOf(I, D), sea: season(state, D.exam, today), bank: !!(D.questions && D.questions.length) };
  }
  /** the first not-done in-syllabus lesson of a subject, in I.order */
  const firstOpen = (C, sid) => C.I.order(sid).find(id => C.D.lessonById[id] && statusIn(C.D.lessonById[id]) && !lessonDone(C.state, id)) || null;
  const anchorOf = (C, id) => { const r = recsOf(C.state)[id]; return r && r.at && typeof r.at.h === 'string' && r.at.h ? '#' + r.at.h : ''; };
  function lessonHref(C, id, q) {
    const qs = Object.entries(q || {}).filter(([, v]) => v != null && v !== '').map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&');
    return '#/l/' + id + (qs ? '?' + qs : '') + anchorOf(C, id);
  }
  /** one real reason a lesson is worth reading: its question reach ('7 ICAI questions in 6 of 30 papers'); '' with no bank */
  function reachOf(C, id) {
    const info = C.I.lessonInfo ? C.I.lessonInfo(id) : null, row = C.I.subject ? C.I.subject(C.D.lessonById[id].subject) : null;
    if (!C.bank) return paperLine(C, C.D.lessonById[id].subject);
    if (!info || !info.pyqs) return 'not asked on its own yet';
    return `${U.plural(info.pyqs, 'ICAI question')} in ${info.papers}${row && row.papers ? ' of ' + row.papers : ''} ${info.papers === 1 && !(row && row.papers) ? 'paper' : 'papers'}`;
  }
  /** a subject's paper as a reason: 'Paper 4 · 100 marks' (the syllabus marks; Paper 6A / 6B are halves of Paper 6) */
  function paperLine(C, sid) {
    const s = C.D.subjectById && C.D.subjectById[sid], code = s && s.paper ? String(s.paper) : '';
    const name = /^P\d[AB]?$/.test(code) ? 'Paper ' + code.slice(1) : C.subjName(sid);
    return s && s.marks ? `${name} · ${U.plural(+s.marks, 'mark')}` : name;
  }
  const agoDays = (C, ts) => { const d = Math.max(0, U.daysBetween(dayOfTs(ts), C.today)); return d === 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'; };
  function lessonStep(C, id, rule, label, reason, q) {
    const l = C.D.lessonById[id];
    return { kind: 'lesson', rule, label, title: l.title, id, subject: l.subject, minutes: l.minutes || null, reason, href: lessonHref(C, id, q), season: C.sea };
  }
  const step = (C, o) => Object.assign({ id: null, subject: null, minutes: null }, o, { season: C.sea });

  /* rule 3 (a): Continue the newest real record when it is unfinished */
  function ruleContinue(C, scopeQ) {
    const id = newestReal(C.state, C.D);
    if (!id || lessonDone(C.state, id)) return null;
    const r = recsOf(C.state)[id];
    return lessonStep(C, id, 'continue', 'Continue', 'opened ' + agoDays(C, stampOf(r)), scopeQ);
  }
  /* rule 3 (b): the chosen route's first not-done lesson, in the route's own order */
  function ruleRoute(C, scopeQ) {
    const rid = typeof C.profile.route === 'string' ? C.profile.route : null;
    const p = rid && C.I.path ? C.I.path(rid) : null;
    if (!p || !Array.isArray(p.lessons) || !p.lessons.length) return null;
    const id = p.lessons.find(x => C.D.lessonById[x] && !lessonDone(C.state, x));
    if (!id) return null;
    const done = p.lessons.filter(x => lessonDone(C.state, x)).length;
    return lessonStep(C, id, 'route', 'Next up', `On route: ${p.title} · ${U.nf(done)} of ${U.nf(p.lessons.length)}`, Object.assign({}, scopeQ, { path: p.id }));
  }
  /* rules 3 (c)–(e): the current subject's next lesson, a finished subject hands over, nothing started starts at the top CS subject */
  function ruleSubject(C, kind, scopeQ) {
    const focus = typeof C.profile.focus === 'string' && C.D.subjectById && C.D.subjectById[C.profile.focus] ? C.profile.focus : null;
    const nr = newestReal(C.state, C.D), cur = focus || (nr ? C.D.lessonById[nr].subject : null);
    if (cur) {
      const id = firstOpen(C, cur);
      if (id) {
        const prev = nr && C.D.lessonById[nr].subject === cur && lessonDone(C.state, nr) ? C.D.lessonById[nr] : null;
        return lessonStep(C, id, 'subject', 'Next up', prev ? 'after ' + prev.title : reachOf(C, id), scopeQ);
      }
      const R = C.ranking, at = R.indexOf(cur), start = at >= 0 ? at + 1 : 0;
      for (let i = 0; i < R.length; i++) {
        const sid = R[(start + i) % R.length];
        if (sid === cur) continue;
        const nx = firstOpen(C, sid);
        if (nx) return lessonStep(C, nx, 'subject', 'Next up', `${C.subjName(cur)} done · next: ${C.subjName(sid)}`, scopeQ);
      }
      return ruleEnd(C, kind);
    }
    const top = C.ranking.find(sid => sid !== 'ga' && firstOpen(C, sid)) || C.ranking.find(sid => firstOpen(C, sid));
    // no lesson shipped yet (the writers are starting): the syllabus is the next step, never "every lesson is done"
    if (!top && !(C.D.lessons || []).length) return kind === 'lesson' ? null
      : step(C, { kind: 'browse', rule: 'start', label: 'Open the syllabus', title: 'The Group II syllabus', minutes: null, reason: 'lessons are being written', href: '#/syllabus' });
    if (!top) return ruleEnd(C, kind);
    const id = firstOpen(C, top), row = C.I.subject ? C.I.subject(top) : null;
    const pp = row && (row.perPaper != null ? row.perPaper : row.marksPerPaper);
    // CA: the top paper by marks; when it is also the first paper written, say so (its day from the exam calendar)
    const pd = paperDays(C.D, C.D.exam, C.today, C.state), first = Object.values(pd).sort()[0];
    const why = row && row.paperMarks ? paperLine(C, top) + (pd[top] && pd[top] === first ? `, written first (${U.fmtDay ? U.fmtDay(pd[top], { day: 'numeric', month: 'short' }) : pd[top]})` : '')
      : pp ? `${C.subjName(top)}: ${(Math.round(pp * 10) / 10).toFixed(1)} marks a paper, the most of any paper` : reachOf(C, id);
    return lessonStep(C, id, 'start', 'Start here', top === C.ranking[0] ? why : reachOf(C, id), scopeQ);
  }
  function ruleEnd(C, kind) {
    if (kind === 'lesson') return null;
    if (!C.bank) return step(C, { kind: 'cards', rule: 'end', label: 'Review flashcards', title: 'Every deck', minutes: 15, reason: 'every lesson in the syllabus is done', href: '#/flash' });
    return step(C, { kind: 'mock', rule: 'end', label: 'Take a full mock', title: 'Full-length mock', minutes: 180, reason: 'every lesson in the syllabus is done', href: '#/test?new=mock' });
  }
  function normalRules(C, kind, scopeQ) { return ruleContinue(C, scopeQ) || ruleRoute(C, scopeQ) || ruleSubject(C, kind, scopeQ); }

  const anyCardSeen = state => Object.keys((state && state.cards) || {}).some(k => k !== 'undefined' && state.cards[k] && state.cards[k].last);
  /** the finished lesson that comes due for a re-read soonest (the kind-'lesson' fallback of the final stretch) */
  function soonestRevise(C) {
    const R = recsOf(C.state);
    let best = null, bd = null;
    for (const id of Object.keys(R)) {
      const r = R[id];
      if (!r || !r.done || !C.D.lessonById[id]) continue;
      const gap = [3, 7, 21, 45][Math.min(3, Math.max(0, (r.visits || 1) - 1))], d = U.addDays(dayOfTs(r.last || r.done), gap);
      if (bd == null || d < bd) { best = id; bd = d; }
    }
    return best;
  }
  /** today's share of the due cards (P2-37, D8): SRS.dayShare, the one count behind every 'Review N due' (the /flash hub and its '#/flash/all'
      session, the plan's card row, the palette), so the step never promises more than the session serves. In the final season it is at most
      the daily review limit minus the reviews already made today; elsewhere every due card. {today: n, over: 0} where srs.js predates it. */
  function cardShare(C, n) {
    if (typeof SRS.dayShare === 'function') { try { const sh = SRS.dayShare(C.state, n, C.today, C.sea); if (sh && typeof sh.today === 'number') return sh; } catch (e) { /* fall through */ } }
    return { today: n, over: 0, due: n };
  }
  const PER_CARD = typeof SRS.MIN_PER_CARD === 'number' ? SRS.MIN_PER_CARD : 0.5;   // minutes one review takes (the hub's and the planner's estimate)
  /* the final stretch (2–14 days left, or 0–1 with an assumed date) and the lesson half of the eve and exam day: never an unopened lesson.
     (d) names today's share of the due cards; once the day's limit is reached (cards still due, none left for today) the card rounds are over
     for the day: no Quick 20 either, since it would serve the same due cards first (the /flash hub then says "That's today's reviews."). */
  function finalRules(C, kind, scopeQ) {
    const cont = ruleContinue(C, scopeQ);
    if (cont) return cont;
    const due = dueOf(C.state, C.D, C.today);
    const rev = (due.lessons || []).find(id => C.D.lessonById[id]);
    const revStep = id => { const r = recsOf(C.state)[id]; return lessonStep(C, id, 'final', 'Revise', 'last read ' + agoDays(C, r.last || r.done), scopeQ); };
    if (rev) return revStep(rev);
    if (kind === 'lesson') { const s = soonestRevise(C); return s ? revStep(s) : normalRules(C, kind, scopeQ); }
    const nq = due.questions.length;
    if (nq) {
      const n = Math.min(RETRY_N, nq);
      return step(C, { kind: 'retry', rule: 'final', label: 'Retry', title: U.plural(n, 'missed question'), minutes: n * 3, reason: `${U.nf(nq)} due for a retry`, href: '#/notebook?retry=' + RETRY_N });
    }
    const sh = cardShare(C, due.cards);
    if (sh.today > 0) return step(C, { kind: 'cards', rule: 'final', label: 'Review', title: U.plural(sh.today, 'due card'), minutes: Math.ceil(sh.today * PER_CARD),
                                       reason: sh.over > 0 ? `${U.nf(sh.over)} more wait for tomorrow` : 'due today', href: '#/flash/all' });
    if (!due.cards && anyCardSeen(C.state) && !roundOver(C)) return step(C, { kind: 'cards', rule: 'final', label: 'Quick 20', title: 'cards you know least', minutes: 10, reason: 'a short refresh of your weakest cards', href: '#/flash/all?mode=quick' });
    // (f) a full mock, except when the paper may be today or tomorrow (an assumed date 0–1 days out; a date of your own then has its eve and
    // exam day): the 10-question warm-up, as the plan's day does, never three hours on a day that may be the exam
    const dl = exam(C.state, C.D.exam, C.today).daysLeft;
    if (dl != null && dl >= 0 && dl <= 1) return warmupTest(C, 'final', `your paper may be ${dl === 0 ? 'today' : 'tomorrow'}, so nothing heavy`);
    if (!C.bank) return normalRules(C, kind, scopeQ) || ruleEnd(C, kind);     // no ICAI papers to sit yet: keep learning
    return step(C, { kind: 'mock', rule: 'final', label: 'Take a full mock', title: 'Full-length mock', minutes: 180, reason: 'a dress rehearsal in exam conditions', href: '#/test?new=mock' });
  }
  /** the light start of the eve, exam day and a 0–1-day assumed date: 10 questions, or (no ICAI bank yet) 10 cards, or today's plan */
  const warmupTest = (C, rule, reason) => (C.bank
    ? step(C, { kind: 'warmup', rule, label: 'Warm up', title: '10 questions', minutes: 15, reason: reason || 'a light start, no new topics', href: '#/test?new=warmup' })
    : C.D.cards && C.D.cards.length ? step(C, { kind: 'cards', rule, label: 'Warm up', title: '10 cards you know', minutes: 5, reason: reason || 'a light start, no new topics', href: '#/flash/all?mode=warm' })
      : step(C, { kind: 'plan', rule, label: 'Open the plan', title: "Today's plan", reason: reason || 'a light start, no new topics', href: '#/plan' }));
  /** today's bounded card round (Quick 20 in the final fortnight and on the eve, the 10-card warm-up on exam day) is already done (SRS.roundDone,
      the rule /flash uses): the chain never names it again that day */
  const roundOver = C => { try { return typeof SRS.roundDone === 'function' && !!SRS.roundDone(C.state, C.today, C.sea); } catch (e) { return false; } };
  function seasonRules(C, kind, scopeQ) {
    const sea = C.sea;
    if (sea === 'final') return finalRules(C, kind, scopeQ);
    if (sea === 'eve' || sea === 'day') {
      if (kind === 'lesson') return finalRules(C, kind, scopeQ);
      if (sea === 'day') {
        if (anyCardSeen(C.state) && !roundOver(C)) return step(C, { kind: 'cards', rule: 'day', label: 'Warm up', title: '10 cards you know', minutes: 5, reason: "it's exam day: nothing new to study", href: '#/flash/all?mode=warm' });
        // the card warm-up done: today's plan, whose card says what is left (as /flash's own fallback does), never another round
        if (anyCardSeen(C.state)) return step(C, { kind: 'plan', rule: 'day', label: 'Exam day', title: "Open today's plan", reason: 'your warm-up is done', href: '#/plan' });
        return warmupTest(C, 'day');
      }
      const due = dueOf(C.state, C.D, C.today);
      if ((due.cards || anyCardSeen(C.state)) && !roundOver(C)) return step(C, { kind: 'cards', rule: 'eve', label: 'Quick 20', title: 'your shakiest due cards', minutes: 10, reason: 'the exam is tomorrow', href: '#/flash/all?mode=quick' });
      if (due.questions.length) {
        const n = Math.min(RETRY_N, due.questions.length);
        return step(C, { kind: 'retry', rule: 'eve', label: 'Retry', title: U.plural(n, 'missed question'), minutes: n * 3, reason: 'the exam is tomorrow', href: '#/notebook?retry=' + RETRY_N });
      }
      return warmupTest(C, 'eve');
    }
    if (sea === 'done' && kind !== 'lesson') {
      let rc = null;
      try { rc = GA.engage && typeof GA.engage.recap === 'function' ? GA.engage.recap(C.state, C.D, C.today) : null; } catch (e) { rc = null; }
      const E = exam(C.state, C.D.exam, C.today), lbl = (E.last && E.last.label) || E.label;
      if (rc && rc.href) return step(C, { kind: 'season', rule: 'done', label: 'See your season', title: lbl + ', wrapped', reason: lbl + ' is over', href: rc.href });
      return step(C, { kind: 'date', rule: 'done', label: 'Set my next exam date', title: 'Your next exam', reason: lbl + ' is over', href: '#/plan?set=exam' });
    }
    return null;
  }

  /** In-content scope 'subject:<id>': Continue within the subject, then its first not-done in-syllabus lesson; null when it is finished */
  function subjectScope(C, sid) {
    if (!C.D.subjectById || !C.D.subjectById[sid]) return null;
    const nr = newestReal(C.state, C.D, sid), q = { focus: 1 };
    if (nr && !lessonDone(C.state, nr)) return lessonStep(C, nr, 'continue', 'Continue', 'opened ' + agoDays(C, stampOf(recsOf(C.state)[nr])), q);
    const id = firstOpen(C, sid);
    if (!id) return null;
    const prev = nr ? C.D.lessonById[nr] : null;
    return lessonStep(C, id, 'subject', nr ? 'Next up' : 'Start here', prev ? 'after ' + prev.title : reachOf(C, id), q);
  }
  /** In-content scope 'after:<lessonId>' (the lesson footer): the active route's next not-done lesson, else the next not-done lesson after it in
      I.order(<its subject>) within the same group (in-syllabus lessons, or the outside-2027 group); null at the subject's end. No focus=1. */
  function afterScope(C, lid, route) {
    const l = C.D.lessonById[lid];
    if (!l) return null;
    const rid = typeof route === 'string' && route ? route : (typeof C.profile.route === 'string' ? C.profile.route : null);
    const p = rid && C.I.path ? C.I.path(rid) : null;
    if (p && Array.isArray(p.lessons)) {
      const i = p.lessons.indexOf(lid);
      if (i >= 0) {
        const nx = p.lessons.slice(i + 1).find(x => C.D.lessonById[x] && !lessonDone(C.state, x));
        if (nx) return lessonStep(C, nx, 'route', 'Next up', `On route: ${p.title}`, { path: p.id });
      }
    }
    const ord = C.I.order(l.subject), i = ord.indexOf(lid), grp = statusIn(l);
    const nx = ord.slice(i + 1).find(x => { const m = C.D.lessonById[x]; return m && statusIn(m) === grp && !lessonDone(C.state, x); });
    return nx ? lessonStep(C, nx, 'subject', 'Next up', lessonDone(C.state, lid) ? 'after ' + l.title : reachOf(C, nx), null) : null;
  }

  /** GA.stats.nextStep(state, D, {kind = 'any', scope = 'all', today = U.today(), I, route}) → step | null (§10.3).
      Precedence for scope 'all': a live test (kind 'any') → the season (final / eve / day / done) → Continue → route → current subject → Start here. */
  function nextStep(state, D, opts) {
    const o = opts || {}, kind = o.kind === 'lesson' ? 'lesson' : 'any', scope = typeof o.scope === 'string' && o.scope ? o.scope : 'all';
    if (!state || !D || !Array.isArray(D.lessons) || !D.lessonById) return null;
    const C = makeCtx(state, D, o);
    if (/^subject:/.test(scope)) return subjectScope(C, scope.slice(8));
    if (/^after:/.test(scope)) return afterScope(C, scope.slice(6), o.route);
    const scopeQ = { focus: 1 };
    const lv = state.live;
    if (kind === 'any' && lv && typeof lv === 'object' && lv.id) {
      const answered = r => r != null && r !== '' && !(Array.isArray(r) && !r.length);
      const ids = Array.isArray(lv.qids) ? lv.qids : [], a = ids.filter(id => lv.responses && answered(lv.responses[id])).length;
      const left = lv.limitMs ? Math.max(0, lv.limitMs - (lv.elapsedMs || 0)) : null;
      return step(C, { kind: 'test', rule: 'live', label: 'Resume test', title: lv.title || 'Your test', id: lv.id, minutes: left == null ? null : Math.ceil(left / 60000),
                       reason: (ids.length ? `${a} of ${ids.length} answered` : 'in progress') + (left != null ? ' · ' + U.clock(left) + ' left' : ''), href: '#/test/run/' + lv.id });
    }
    return seasonRules(C, kind, scopeQ) || normalRules(C, kind, scopeQ);
  }
  /** the kind-'lesson' wrapper: always a lesson step (or null when every in-syllabus lesson is done / the scope has nothing left) */
  function nextLesson(state, D, opts) { return nextStep(state, D, Object.assign({}, opts, { kind: 'lesson' })); }

  /** For old callers: {inProgress, ready, all}. all[0] is the shared next lesson under the normal rules (no season), followed by the same
      sequence (the route's next lessons, else the current subject in I.order, then the next subjects in the ranking); inProgress = real
      unfinished lessons, newest first (peeks skipped). No prerequisite filter: prerequisites are soft (P0-08). */
  function nextLessons(state, D, n, opts) {
    const N = n || 6, o = opts || {};
    const C = makeCtx(state, D, o);
    C.sea = 'normal';
    const R = recsOf(state);
    const inProgress = Object.keys(R).filter(id => D.lessonById[id] && realLesson(R[id]) && !R[id].done).sort((a, b) => stampOf(R[b]) - stampOf(R[a]));
    const first = normalRules(C, 'lesson', null), out = [];
    const push = id => { if (id && D.lessonById[id] && !lessonDone(state, id) && !out.includes(id)) out.push(id); };
    if (first && first.id) {
      push(first.id);
      const p = first.rule === 'route' && C.I.path ? C.I.path(C.profile.route) : null;
      if (p) p.lessons.slice(p.lessons.indexOf(first.id) + 1).forEach(push);
      const sid = D.lessonById[first.id].subject, R2 = C.ranking, at = R2.indexOf(sid);
      const seq = (at >= 0 ? [sid].concat(R2.slice(at + 1), R2.slice(0, at)) : [sid].concat(R2)).filter((x, i, a) => a.indexOf(x) === i);
      for (const s of seq) {
        if (out.length >= N) break;
        const ord = C.I.order(s).filter(id => D.lessonById[id] && statusIn(D.lessonById[id]));
        const from = s === sid ? Math.max(0, ord.indexOf(first.id)) : 0;
        ord.slice(from).forEach(push);
      }
    }
    const all = out.slice(0, N);
    return { inProgress, ready: all.filter(id => !inProgress.includes(id)), all };
  }

  const dueOf = (state, D, today) => due(state, D, today);

  const S = { nextLessons, nextStep, nextLesson, hasProgress, exam, season, phaseOf, realLesson, EXAM_FALLBACK, paperDays, paperOf, PAPER_NAME,
              retryDay, resolvesMiss, lastMiss, RETRY: { first: FIRST_RETRY, resolve: RESOLVE_GAP },
              streak, heatmap, timeStats, todayGoals, countdown, practice, lessonsDone, cardScore, masteryOf, topics, subjects, completion, weakTopics, due, testTrend, breakdown, overall, recentAccuracy, dailySeries, dayActive, W, HALF_LIFE };
  GA.stats = S;
  if (typeof module !== 'undefined' && module.exports) module.exports = S;
})(typeof window !== 'undefined' ? window : globalThis);
