/* PassBook — the planner (owner WP6; contract: docs/ARCHITECTURE.md §10.8). Pure functions of (state, catalogue, today), plus one
   browser convenience, GA.planner.current(), that keeps the day's list fixed in state.plan.

   * The day (P0-19): GA.planner.day(state, D, today) builds today's list once and stores it as a snapshot ({day, examDate, minutes, route,
     season, lessons, questions}); every later call re-judges each row from what the learner did (the lesson finished today, cards reviewed with
     none due, N retries today, N answers in that scope today, a mock finished today). A finished row ticks instead of being swapped for a new
     one; the list is rebuilt only when the day, the exam date, the daily minutes, the route, the season (an assumed date confirmed on the eve
     or exam day, P1-61) or the 'Lessons a day' / 'Questions a day' caps change, and a same-day rebuild keeps the rows already done.
   * One phase function (P0-20): learn > 100 days left · practise 46–100 · mocks 15–45 · final 0–14 (GA.stats.phaseOf once WP4 lands, else the
     same ranges here). The header, the road, the weekly table and the checklist all read it, so they can never name different phases.
   * One recipe per phase and season (P1-45, P1-61, D20): revision first; learn rows from the shared next step (GA.stats.nextStep, kind
     'lesson') then the same subject's next lessons in the learning order; practice rows from the planned lesson's sub-topic and the week's
     focus (every other Learn-phase day a mixed review of finished lessons, once the bank has it, P2-64); no new lessons in the final stretch;
     light revision on the eve; nothing to study on exam day; after the exam the next exam (P2-72: the cycle after the one the learner sat).
   * An honest pace line (P1-45): lessons left, their hours, how many lessons a day the planner really schedules ('Lessons a day', within the
     daily time), how many days that takes, and how many lesson days are left before the final fortnight (mock days excluded).
   * Rows fit the daily time (P1-45, Part C): nothing is planned past it except revision that is due (a note says when that alone is longer).
     The first lesson and every practice set are added only when they fit. A mock day plans the full mock only when it fits; when the daily
     time is shorter, the mock is sat in parts of the daily time (the runner's clock runs only while the test is open), each part judged by the
     clock of the test in progress, and revision is added only while it fits beside it. A same-day rebuild counts the rows already done against
     the time and the caps.

   Exam date and season come from GA.stats.exam / GA.stats.season (WP4, §10.5). Until those land, a small private fallback reads the stored
   profile date the way the contract describes, so nothing here depends on the order in which packages merge. Every function takes an
   optional last argument `o` ({I, E, season, nextStep, due}) so Node tests can pin each input. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');
  const STATS = GA.stats || require('./stats.js');

  const SNAP_V = 1;                      // the stored snapshot's shape
  const LEGACY_DEFAULT = '2027-02-06';   // the old hard-coded default exam date: untouched, it counts as "not set" (§10.5)
  const MIN = { card: 0.5, retry: 3, reread: 8, question: 4, mock: 180, quick: 10, warmCards: 5, warmTest: 15 };
  const RETRY_N = 5;                     // the notebook retry queue (§10.4 '#/notebook?retry=5')
  const PRACTICE_RESERVE = 20;           // minutes kept for practice when lessons are planned
  const MOCK_EVERY = 3;                  // days between full mocks in the mock phase
  const MOCK_SIT_MIN = 30;               // the shortest part a mock is planned in when the daily time is shorter than the mock
  const GOALS = { questions: 15, cards: 20, minutes: 90, lessons: 1 };   // the store's defaults, for a profile without goals

  /* the CA Inter January 2027 Group II cycle (ICAI's announcement of 23 Sep 2026, checked 20 Oct 2026): used only until GA.stats.exam / D.exam exist */
  const LOCAL_CYCLE = { id: 'icai-inter-2027-01', label: 'CA Inter January 2027', organiser: 'ICAI', group: 'Group II', days: ['2027-01-08', '2027-01-10', '2027-01-12'],
    papers: { P4: ['2027-01-08'], P5: ['2027-01-10'], P6: ['2027-01-12'] }, result: null, source: 'https://resource.cdn.icai.org/94359exam-aps6372-stu-iff-jan2027.pdf',
    checked: '2026-10-20', note: "Dates as announced by ICAI; the paper on each day follows ICAI's Group II order. Verify on icai.org and your admit card." };

  /** minutes for people: '70 min' · '1.5 h' · '2 h' · '39 h' (minutes below 90, never '2.0 h') */
  const minTxt = m => { m = Math.round(m || 0); return m < 90 ? m + ' min' : m >= 600 ? Math.round(m / 60) + ' h' : (m / 60).toFixed(1).replace(/\.0$/, '') + ' h'; };
  const PHASES = [['learn', 'Learn'], ['practice', 'Practise'], ['mocks', 'Mock tests'], ['final', 'Final stretch']];
  const PHASE_LABEL = Object.fromEntries(PHASES);
  /* what each phase's list is made of: the planner's header line (P1-45 reworded the Learn text: it no longer promises every topic; P2-39: the
     plan line is stated once, in the header) */
  const PHASE_TXT = {
    learn: 'Learn phase: each lesson in learning order, then its own ICAI questions, with revision first.',
    practice: 'Practise phase: ICAI questions lead, on the topics that cost you marks, while lessons go on and your notebook is cleared.',
    mocks: 'Mock tests phase: a full 3-hour mock every third day under exam conditions, with revision and lessons between them.',
    final: 'Final stretch: no new topics. Notebook retries, flashcards and re-reads of what you have learned.',
    /* the mock phase when the daily time is shorter than a full mock (P1-45: the list never plans more than the daily time) */
    mocksSplit: 'Mock tests phase: a full 3-hour mock sat in parts that fit your daily time, then two days of revision and lessons before the next one.',
    mocksNone: 'Mock tests phase: ICAI questions, lessons and revision within your daily time. A full mock takes 3 hours: sit one from Tests on a day with 3 free hours.'
  };
  /* the same phases while the ICAI question bank is empty: lessons, self-checks, flashcards and revision only (no questions, no mocks) */
  const PHASE_TXT_EMPTY = {
    learn: 'Learn phase: each lesson in learning order, with its self-check and flashcards, and revision first.',
    practice: 'Practise phase: lessons go on in learning order, with flashcards and re-reads first. ICAI questions join once the bank has them.',
    mocks: 'Mock tests phase: there are no ICAI papers in the bank yet, so these days go to revision, flashcards and the lessons still left.',
    final: 'Final stretch: no new topics. Flashcards and re-reads of what you have learned.'
  };
  /** how many days one full mock takes at `minutes` a day: 1 when it fits, else its parts; 0 when the day is too short to plan a part */
  const mockParts = minutes => (minutes >= MIN.mock ? 1 : minutes >= MOCK_SIT_MIN ? Math.ceil(MIN.mock / minutes) : 0);
  /** the header's plan line for a phase (P2-39: stated once), with the mock phase worded for the daily time */
  const phaseLine = (id, minutes, bank) => (bank === false ? PHASE_TXT_EMPTY[id] || ''
    : id === 'mocks' && minutes != null && minutes < MIN.mock ? (mockParts(minutes) ? PHASE_TXT.mocksSplit : PHASE_TXT.mocksNone) : PHASE_TXT[id] || '');
  const LESSONS_MAX = 6;                 // the most lessons a day's list ever holds
  /** '14:00' -> '2 PM', '13:45' -> '1.45 PM' (ICAI's own way of writing exam times) */
  const clock = hm => { const m = /^(\d{1,2}):(\d{2})$/.exec(String(hm || '')); if (!m) return String(hm || ''); const h = +m[1], h12 = h % 12 || 12; return `${h12}${m[2] === '00' ? '' : '.' + m[2]} ${h < 12 ? 'AM' : 'PM'}`; };
  const isDay = k => typeof k === 'string' && /^\d{4}-\d\d-\d\d$/.test(k);

  /* ------------------------------------------------------------------ the shared inputs (WP4's helpers when present) */
  /** the one phase function: 'learn' | 'practice' | 'mocks' | 'final' | null (no exam ahead) */
  function phaseOf(daysLeft) {
    if (typeof STATS.phaseOf === 'function') return STATS.phaseOf(daysLeft);
    if (daysLeft == null || !(daysLeft >= 0)) return null;
    return daysLeft <= 14 ? 'final' : daysLeft <= 45 ? 'mocks' : daysLeft <= 100 ? 'practice' : 'learn';
  }
  function cyclesOf(D) {
    const X = D && D.exam;
    if (X && Array.isArray(X.cycles) && X.cycles.length) return X.cycles;
    const F = STATS.EXAM_FALLBACK;
    return F && Array.isArray(F.cycles) && F.cycles.length ? F.cycles : [LOCAL_CYCLE];
  }
  function cycleFor(D, date) {
    if (!isDay(date)) return null;
    const cs = cyclesOf(D);
    return cs.find(c => (c.days || []).includes(date)) || cs.find(c => (c.days || [])[0] && c.days[0].slice(0, 4) === date.slice(0, 4)) || null;
  }
  function labelFor(date, cycle) {
    if (cycle && cycle.label) return cycle.label;
    if (!isDay(date)) return 'your exam';
    const m = +date.slice(5, 7);
    const MON = { 1: 'January', 5: 'May', 9: 'September' };
    return MON[m] ? `CA Inter ${MON[m]} ${date.slice(0, 4)}` : 'your exam';
  }
  const firstOf = c => (c.days || []).slice().sort()[0] || '';
  /** The next exam a learner can still choose a day in (P2-72): the first cycle with a day on or after today, skipping the cycle of an exam the
      learner has already sat (a set date that has passed: a learner who set 8 Jan and sat it is not offered 10–12 Jan of the same attempt). */
  function nextCycle(D, E, today) {
    const sat = E && E.set && isDay(E.date) && E.daysLeft != null && E.daysLeft < 0 ? E.date : null;
    const satC = sat ? cycleFor(D, sat) : null;
    return cyclesOf(D).slice().sort((a, b) => (firstOf(a) < firstOf(b) ? -1 : firstOf(a) > firstOf(b) ? 1 : 0))
      .find(c => (c.days || []).some(d => d >= today) && c !== satC && !(sat && ((c.days || []).includes(sat) || firstOf(c) <= sat))) || null;
  }
  /** the next exam's name: its cycle's label, else 'The next CA Inter attempt' (ICAI announces each attempt's dates separately) */
  function nextLabel(D, E, today) {
    const c = nextCycle(D, E, today);
    if (c && c.label) return c.label;
    const ys = cyclesOf(D).map(x => +firstOf(x).slice(0, 4)).filter(y => y > 0);
    if (E && E.last && isDay(E.last.date)) ys.push(+E.last.date.slice(0, 4));
    if (E && E.set && isDay(E.date) && E.daysLeft < 0) ys.push(+E.date.slice(0, 4));
    return 'The next CA Inter attempt';
  }
  /** profile.examSet, read the way §10.5's sequencing note says (an unmigrated profile counts any date but the old default as set) */
  function examSet(p) { return !!p && (p.examSet === true || (p.examSet === undefined && isDay(p.examDate) && p.examDate !== LEGACY_DEFAULT)); }

  /** GA.stats.exam(state, D.exam, today) → {date, set, basis, label, cycle, daysLeft, last}; a private fallback until WP4 lands */
  function examOf(state, D, today) {
    if (typeof STATS.exam === 'function') { try { const E = STATS.exam(state, D && D.exam, today); if (E) return E; } catch (e) { /* fall back */ } }
    const p = (state && state.profile) || {}, date = isDay(p.examDate) ? p.examDate : null, set = examSet(p);
    const cycle = cycleFor(D, date), label = labelFor(date, cycle), daysLeft = date ? U.daysBetween(today, date) : null;
    return { date, set, basis: date ? (set ? 'yours' : 'assumed') : null, label, cycle, daysLeft,
             last: daysLeft != null && daysLeft < 0 ? { date, label, cycle, daysAgo: -daysLeft } : null };
  }
  /** the season of an exam result (§10.5), computed from E itself */
  function seasonFrom(E, state) {
    const dl = E && E.daysLeft, firm = !!E && (E.basis === 'yours' || E.basis === 'official paper day');
    if (dl != null && dl >= 0) return dl === 0 && firm ? 'day' : dl === 1 && firm ? 'eve' : dl <= 14 ? 'final' : 'normal';
    const ago = E && E.last ? E.last.daysAgo : null;
    return ago >= 1 && ago <= 30 && ((E && E.set) || hasProgress(state)) ? 'done' : 'between';
  }
  function seasonOf(state, D, today, E) {
    if (typeof STATS.season === 'function') { try { const s = STATS.season(state, D && D.exam, today); if (s) return s; } catch (e) { /* fall back */ } }
    return seasonFrom(E, state);
  }
  /** GA.stats.hasProgress: something done on purpose (never time on a page alone, P0-22) */
  function hasProgress(state) {
    if (typeof STATS.hasProgress === 'function') return !!STATS.hasProgress(state);
    const n = o => !!o && typeof o === 'object' && Object.keys(o).length > 0;
    return !!state && (!!(state.live && state.live.id) || n(state.lessons) || n(state.q) || (Array.isArray(state.tests) && state.tests.length > 0) || n(state.cards) || n(state.labs));
  }
  function insightsOf(D) {
    try {
      const IN = GA.insights;
      if (!IN) return null;
      if (GA.data && GA.data.D === D && IN.get) return IN.get();
      return IN.build ? IN.build(D, null) : null;
    } catch (e) { return null; }
  }
  const lessonOf = (D, id) => (D.lessonById && D.lessonById[id]) || null;
  const doneLesson = (state, id) => !!(state.lessons[id] && state.lessons[id].done);
  /** the bank's mixed review of what you have learned (P2-64, WP9b): status 'learned' and sort 'mixed', once GA.pyqLib lists them */
  function bankHasMixed() {
    const L = GA.pyqLib, has = (list, id) => Array.isArray(list) && list.some(x => (Array.isArray(x) ? x[0] : x && x.id) === id);
    return !!L && has(L.STATUS, 'learned') && has(L.SORTS, 'mixed');
  }
  /** the sub-topics of the lessons this learner has finished (the 'learned' scope of the mixed review) */
  function learnedSubs(state, D) {
    const r = new Set();
    Object.keys(state.lessons || {}).forEach(id => { const l = lessonOf(D, id); if (l && doneLesson(state, id)) r.add(l.subtopic || l.id); });
    return r;
  }

  /** the shared next step, kind 'lesson' (P0-08); without WP4's nextStep: today's rule (the newest lesson in progress, else the next one) */
  function lessonStep(state, D, today, ctx) {
    const NS = ctx.nextStep;
    if (typeof NS === 'function') {
      try { const s = NS(state, D, { kind: 'lesson', scope: 'all', today, I: ctx.I || undefined }); return s && s.id && lessonOf(D, s.id) ? s : null; }
      catch (e) { return null; }
    }
    const nl = STATS.nextLessons ? STATS.nextLessons(state, D, 1) : { all: [], inProgress: [] };
    const id = nl.all[0], l = id && lessonOf(D, id);
    if (!l) return null;
    const going = (nl.inProgress || []).includes(id);
    return { kind: 'lesson', rule: going ? 'continue' : 'subject', label: going ? 'Continue' : 'Next up', title: l.title, id, subject: l.subject, minutes: l.minutes || null, reason: '', href: '#/l/' + id };
  }
  /** The 'Recommended' starting point (P1-06, P1-46): the lesson today's list starts with once no route is chosen, i.e. the shared next step
      (kind 'lesson') on the same state with profile.route cleared, so the chip names what tapping it plans even while a route is set (with a
      route, nextStep names the route's lesson). The state itself is not changed. null when no lesson is next. o = {I, nextStep} as elsewhere. */
  function recommended(state, D, today, o) {
    o = o || {};
    if (!state || !D) return null;
    const p = state.profile || {};
    const S = p.route ? Object.assign({}, state, { profile: Object.assign({}, p, { route: null }) }) : state;
    const nextStep = o.nextStep !== undefined ? o.nextStep : (typeof STATS.nextStep === 'function' ? STATS.nextStep : null);
    return lessonStep(S, D, today || U.today(), { nextStep, I: o.I !== undefined ? o.I : insightsOf(D) });
  }
  /** a lesson consumer in the final season may only revise or continue: the step counts only when it is one of those */
  const finalSafe = s => !!s && (s.rule === 'continue' || s.label === 'Continue' || s.label === 'Revise');

  /* ------------------------------------------------------------------ the road (P0-20) */
  /** The four phases for an exam date, each clamped to what is left from today: {id, label, from, to, days, state: 'done'|'current'|'ahead', current}.
      `days` counts only days still ahead (today included) for the current phase, the whole phase for later ones, and 0 for finished ones.
      o.start (optional) = the first day of the learner's season, for the bar's real lengths (`span`). */
  function phases(today, examDate, o) {
    if (!isDay(examDate) || !isDay(today)) return [];
    const d = U.daysBetween(today, examDate), N = Math.max(d, 0) + 160;
    const lo = {}, hi = {};
    for (let dl = 0; dl <= N; dl++) { const id = phaseOf(dl); if (!id) continue; if (lo[id] == null) lo[id] = dl; hi[id] = dl; }
    const start = o && isDay(o.start) && o.start < today ? o.start : today;
    return PHASES.filter(([id]) => lo[id] != null).map(([id, label]) => {
      const open = id === 'learn' || hi[id] >= N;             // the learn phase has no fixed start
      const from0 = open ? null : U.addDays(examDate, -hi[id]), to = U.addDays(examDate, -lo[id]);
      const state = to < today ? 'done' : from0 && from0 > today ? 'ahead' : 'current';
      const from = state === 'current' ? today : from0;
      const days = state === 'done' ? 0 : U.daysBetween(from, to) + 1;
      const sFrom = from0 && from0 > start ? from0 : start;
      const span = sFrom <= to ? U.daysBetween(sFrom, to) + 1 : 0;   // days of this phase inside [start, exam]
      return { id, label, from, to, days, state, current: state === 'current', past: state === 'done', span };
    });
  }

  /* ------------------------------------------------------------------ weights and the weekly focus */
  /** each subject's share of the marks: the like-for-like marks a paper when WP4's metric is there (P1-03), else the raw share of the bank */
  function shares(D, I) {
    const rows = I && Array.isArray(I.subjects) ? I.subjects : null;
    if (rows && rows.length && rows.every(r => typeof r.perPaper === 'number')) {
      const tot = rows.reduce((a, r) => a + Math.max(0, r.perPaper), 0), r = {};
      D.subjects.forEach(s => { const x = rows.find(y => y.id === s.id); r[s.id] = tot ? Math.max(0, (x && x.perPaper) || 0) / tot : 1 / D.subjects.length; });
      return r;
    }
    const per = {}; let tot = 0;
    D.questions.forEach(q => { if (q.subject && q.subject !== '?') { per[q.subject] = (per[q.subject] || 0) + q.marks; tot += q.marks; } });
    const r = {}; D.subjects.forEach(s => (r[s.id] = tot ? (per[s.id] || 0) / tot : 1 / D.subjects.length));
    return r;
  }

  /** While learning, lean towards subjects that actually have lessons: 40% weight with none written, up to 100% when all are. */
  function availability(D) {
    const r = {};
    D.subjects.forEach(s => { const n = s.topics.reduce((a, t) => a + t.subtopics.length, 0) || 1; r[s.id] = 0.4 + 0.6 * (D.lessons.filter(l => l.subject === s.id).length / n); });
    return r;
  }

  /** the practice focus for the next `weeks` weeks: share of marks × (1 − mastery), nudging mastery up after each simulated week */
  function weeklyFocus(state, D, today, weeks, o) {
    o = o || {};
    const I = o.I !== undefined ? o.I : insightsOf(D);
    const sh = shares(D, I), sum = STATS.subjects(state, D, today), mast = {}, av = availability(D);
    const dl = o.daysLeft !== undefined ? o.daysLeft : examOf(state, D, today).daysLeft;
    const learnWeeks = dl == null ? 0 : Math.max(0, Math.ceil((dl - 100) / 7));
    sum.forEach(s => (mast[s.id] = s.mastery == null ? 0 : s.mastery));
    const out = [];
    for (let w = 0; w < weeks; w++) {
      const pri = D.subjects.map(s => ({ id: s.id, p: sh[s.id] * (1 - mast[s.id]) * (w < learnWeeks ? av[s.id] : 1) })).sort((a, b) => b.p - a.p);
      const pick = pri.slice(0, 3);
      pick.forEach((x, i) => { mast[x.id] = Math.min(0.95, mast[x.id] + (i === 0 ? 0.14 : 0.08)); });
      out.push(pick.map(x => x.id));
    }
    return out;
  }

  /* ------------------------------------------------------------------ one context for a day */
  function context(state, D, today, o) {
    o = o || {};
    const I = o.I !== undefined ? o.I : insightsOf(D);
    const E = o.E || examOf(state, D, today);
    const season = o.season || (o.E ? seasonFrom(E, state) : seasonOf(state, D, today, E));
    const g0 = (state.profile && state.profile.goals) || {}, goals = {};
    Object.keys(GOALS).forEach(k => (goals[k] = typeof g0[k] === 'number' && g0[k] >= 0 ? g0[k] : GOALS[k]));
    const minutes = Math.round(goals.minutes);
    const nextStep = o.nextStep !== undefined ? o.nextStep : (typeof STATS.nextStep === 'function' ? STATS.nextStep : null);
    const c = { state, D, today, I, E, season, phase: phaseOf(E.daysLeft), due: o.due || STATS.due(state, D, today), goals, minutes,
                lessonsCap: Math.max(0, Math.min(LESSONS_MAX, Math.round(goals.lessons))), questionsCap: Math.max(0, Math.round(goals.questions)),
                route: (state.profile && state.profile.route) || null, nextStep, mixed: o.mixed !== undefined ? !!o.mixed : bankHasMixed(), _subj: null,
                bank: o.bank !== undefined ? !!o.bank : !!(D.questions && D.questions.length),     // no ICAI bank yet: no mock, warm-up test or practice set
                // an ICAI bank can be sat only once it holds an MTP or a past paper (docs/ICAI_BANK.md §7); before that a mock day plans no sitting
                sit: o.sit !== undefined ? !!o.sit : !(D.questions && D.questions.length && D.questions.every(q => q.icai)) || (D.papers || []).some(p => p.sittable) };
    c.subj = () => c._subj || (c._subj = STATS.subjects(state, D, today));
    return c;
  }

  const dayBounds = today => { const a = U.parseDay(today).getTime(); return [a, U.parseDay(U.addDays(today, 1)).getTime()]; };
  const isFull = t => !!t && (t.kind === 'mock' || t.kind === 'paper');
  function lastFull(state) { return (state.tests || []).filter(t => isFull(t) && t.finished).sort((a, b) => b.finished - a.finished)[0] || null; }
  const reviewedAny = state => Object.values(state.cards || {}).some(c => c && (c.reps > 0 || c.last));
  /** the questions a practice set can mark: a key (the engine's), or for an ICAI item ICAI's key or answer and in the syllabus (pyqlib.scorable) */
  const markable = q => (q.icai ? !q.oos && (q.type === 'DESC' ? !!q.hasAns : !!q.hasKey) : q.hasKey !== false);
  const keyedIn = (D, f) => D.questions.filter(q => markable(q) && f(q)).length;
  /** a practice row's scope as a question test: one sub-topic, one topic, one subject, or (sc.learned) the sub-topics of finished lessons */
  const scopeTest = (D, sc, state) => {
    if (sc.learned) { const subs = state ? learnedSubs(state, D) : new Set(); return q => !!q.subtopic && subs.has(q.subtopic); }
    // an ICAI item counts for every sub-topic it is tagged with, as the bank's filter does
    return q => (sc.sub ? q.subtopic === sc.sub || (q.icai && (q.tags || []).includes(sc.sub)) : sc.topic ? q.topic === sc.topic : q.subject === sc.subject);
  };
  const scopeHref = (sc, n) => '#/pyq?' + (sc.learned ? 'status=learned&sort=mixed' : sc.sub ? 'sub=' + encodeURIComponent(sc.sub) : sc.topic ? 'topic=' + encodeURIComponent(sc.topic) : 'subject=' + encodeURIComponent(sc.subject)) + '&practise=' + n;
  const plural = (n, w, p) => `${U.nf(n)} ${n === 1 ? w : p || w + 's'}`;
  const nameOf = (D, id) => (D.nodes && D.nodes[id] && D.nodes[id].name) || (D.subjectById[id] && D.subjectById[id].name) || id;

  /* ------------------------------------------------------------------ rows */
  /** today's share of the due cards (P2-37): SRS.dayShare, the count the /flash hub, its '#/flash/all' session, the shared step and the palette
      name. Outside the final fortnight it is every due card; in it, at most the daily review limit (half the daily minutes), the rest wait for
      tomorrow. Without GA.srs (a Node test that loads no srs.js) every due card. */
  function cardShare(c) {
    const n = c.due.cardIds.length, SRS = GA.srs;
    if (SRS && typeof SRS.dayShare === 'function') { try { const sh = SRS.dayShare(c.state, n, c.today, c.season); if (sh && typeof sh.today === 'number') return sh; } catch (e) { /* every due card */ } }
    return { due: n, today: n, over: 0 };
  }
  function cardsRow(c) {
    const sh = cardShare(c), n = sh.today;
    return n ? { id: 'cards', kind: 'revise', title: `Review ${plural(n, 'due flashcard')}`, minutes: Math.max(1, Math.ceil(n * MIN.card)), href: '#/flash/all', target: n,
                 why: sh.over ? `Today's share of the ${U.nf(sh.due)} due; the rest stay due for tomorrow.` : 'Scheduled for today: each card comes back just before you would forget it.' } : null;
  }
  function retryRow(c, title) {
    const q = c.due.questions, n = Math.min(RETRY_N, q.length);
    return n ? { id: 'retry', kind: 'revise', title: title || `Retry ${plural(n, 'missed question')} from your notebook`, minutes: n * MIN.retry, href: '#/notebook?retry=' + RETRY_N, target: n,
                 qids: q.slice(0, n), why: q.length > n ? `The ${n} most urgent of ${U.nf(q.length)} due for a retry.` : `${plural(q.length, 'miss', 'misses')} due for a retry.` } : null;
  }
  function rereadRow(c) {
    const id = c.due.lessons[0], l = id && lessonOf(c.D, id);
    return l ? { id: 'reread:' + id, kind: 'revise', title: `Re-read: ${l.title}`, minutes: MIN.reread, href: '#/l/' + id, lesson: id, why: 'You finished it a while ago; one fast re-read keeps it.' } : null;
  }
  function learnRow(c, l, step, routeTitle) {
    const e = c.state.lessons[l.id];
    const going = step ? (step.rule === 'continue' || step.label === 'Continue') : !!(e && (e.secs >= 120 || e.at));   // a peek is not "in progress"
    const sj = c.D.subjectById[l.subject];
    const why = step && step.reason ? step.reason : `${sj ? sj.name : l.subject}${going ? ' · in progress' : routeTitle ? ' · next on the ' + routeTitle : ' · next in the learning order'}`;
    return { id: 'learn:' + l.id, kind: 'learn', title: `${going ? 'Finish' : 'Learn'}: ${l.title}`, minutes: l.minutes || 20, href: (step && step.href) || '#/l/' + l.id, lesson: l.id, subject: l.subject, why };
  }
  /** the full mock or past paper the learner has started and not submitted (state.live; the runner's clock runs only while it is open), or null */
  const liveFull = state => { const lv = state && state.live; return lv && typeof lv === 'object' && lv.id && isFull(lv) ? lv : null; };
  const answered = r => r != null && r !== '' && !(Array.isArray(r) && !r.length);
  /** A mock day's row (P1-45: the list fits the daily time). The full mock when it fits in `avail` minutes (default: the daily time); otherwise one
      part of `avail` minutes, since the runner's clock runs only while the test is open; with a full test already started (lv), the rest of it,
      in parts the same way. `sit` = the minutes its clock shows once today's part is done (the judge reads the live test's clock); `test` = the
      live test's id. null when less than half an hour is free for a part. */
  function mockRow(c, lv, avail) {
    if (!lv && (c.bank === false || c.sit === false)) return null;   // a mock is built from the ICAI bank: none until it has a paper to sit
    const lim = lv && lv.limitMs > 0 ? Math.round(lv.limitMs / 60000) : MIN.mock;
    const ran = lv ? Math.min(lim, Math.floor((lv.elapsedMs || 0) / 60000)) : 0, left = Math.max(1, lim - ran);
    const mins = Math.min(left, Math.max(0, Math.floor(avail == null ? c.minutes : avail)));
    if (mins < left && mins < MOCK_SIT_MIN) return null;
    const last = lastFull(c.state), age = last ? U.daysBetween(U.dayKey(last.finished), c.today) : null;
    const before = last ? `Last full test ${age === 0 ? 'today' : age === 1 ? 'yesterday' : age + ' days ago'}.` : 'You have not sat a full test yet.';
    const noun = lv && lv.kind === 'paper' ? 'paper' : 'mock', href = lv ? '#/test/run/' + lv.id : '#/test?new=mock';
    let title, why;
    if (lv && ran > 0) {
      const ids = Array.isArray(lv.qids) ? lv.qids : [], a = ids.filter(id => answered(lv.responses && lv.responses[id])).length;
      title = mins >= left ? `Finish your ${noun} (${minTxt(left)} left)` : `Continue your ${noun}: sit for ${minTxt(mins)} (${minTxt(left)} left)`;
      why = `${lv.title || 'Your test'}${ids.length ? `: ${a} of ${ids.length} answered` : ''}. Its clock runs only while the test is open${mins < left ? ", so stop when today's time is up" : ''}.`;
    } else if (mins >= left) {
      title = lim === MIN.mock ? `Sit ${lv ? 'your' : 'a'} full-length ${noun} (3 hours)` : `Sit ${lv ? 'your' : 'a'} full-length ${noun} (${minTxt(lim)})`;
      why = before;
    } else {
      const parts = Math.ceil(left / Math.max(mins, 1));
      title = `Start ${lv ? 'your' : 'a'} full ${noun}: sit for ${minTxt(mins)}, then pause`;
      why = `A full ${noun} takes ${minTxt(lim)}, longer than your ${minTxt(c.minutes)} a day: sit it in ${parts} parts. Its clock runs only while the test is open. ${before}`;
    }
    return { id: 'mock', kind: 'mock', title, minutes: mins, href, sit: ran + mins, test: lv ? lv.id : undefined, why };
  }
  function practiceRow(c, sc, n, why, title) {
    const D = c.D, avail = keyedIn(D, scopeTest(D, sc, c.state));
    const k = Math.min(n, avail);
    if (k < 1) return null;
    const key = sc.learned ? 'learned' : sc.sub ? 'sub:' + sc.sub : sc.topic ? 'topic:' + sc.topic : 'subject:' + sc.subject;
    return { id: 'prac:' + key, kind: 'practice', title: title ? title(k) : `Solve ${plural(k, nameOf(D, sc.subject) + ' question')}`, minutes: k * MIN.question, href: scopeHref(sc, k), target: k, scope: sc, why };
  }
  /** why a focus subject: real evidence when there is some, else the marks it carries */
  function focusWhy(c, sid) {
    const D = c.D, rows = c.subj(), row = rows.find(s => s.id === sid), P = row && row.pyq;
    if (P && P.attempted >= 5) return `${Math.round(P.acc * 100)}% right so far in ${plural(P.attempted, 'question')}; it carries many marks.`;
    const sh = shares(D, c.I), untouched = D.subjects.filter(s => { const r = rows.find(x => x.id === s.id); return !r || r.mastery == null; });
    if (untouched.some(s => s.id === sid) && untouched.every(s => (sh[s.id] || 0) <= (sh[sid] || 0) + 1e-12)) return 'The most marks of any paper you have not started.';
    return P && P.attempted ? `${plural(P.attempted, 'question')} tried so far; it carries many marks.` : 'One of the papers with the most marks.';
  }

  /** the note for a day whose due revision alone is longer than the daily time (P1-45: the list says so instead of planning past it) */
  const fullDay = (m, budget) => `Today's revision takes ${minTxt(m)}, more than your ${minTxt(budget)} a day, so nothing new is planned.`;

  /** a mixed-review day (P2-64): the bank offers it, it is an odd day (so the week's focus keeps the other days), and at least 3 finished
      lessons carry 10 or more keyed PYQs between them */
  function mixedDay(c) {
    if (!c.mixed || Math.abs(U.daysBetween('2026-01-01', c.today)) % 2 !== 1) return false;
    const subs = learnedSubs(c.state, c.D);
    return subs.size >= 3 && keyedIn(c.D, q => !!q.subtopic && subs.has(q.subtopic)) >= 10;
  }

  /** the rows of one day, by season and phase (no judging) */
  function recipe(c) {
    // c.keep: the rows a same-day rebuild keeps (done already). They start the list, so the time they took, 'Lessons a day' and 'Questions a
    // day' count them (P1-45: a rebuild never plans more than the daily time), and a re-read done today is the day's one re-read.
    const S = c.state, D = c.D, rows = (c.keep || []).slice(), notes = [], kept = rows.length > 0;
    let warmup = null;
    const used = () => rows.reduce((a, t) => a + (t.minutes || 0), 0);
    const oneSet = () => Math.max(1, Math.min(10, Math.floor(c.minutes / MIN.question)));   // a fallback practice set sized to the daily time
    const reread = id => id.indexOf('reread:') === 0;
    /** add a row once (by id; one re-read a day); returns it, or null when it was not added */
    const add = t => { if (!t || rows.some(x => x.id === t.id || (reread(t.id) && reread(x.id)))) return null; rows.push(t); return t; };
    const reviewed = reviewedAny(S);

    if (c.season === 'day') {
      warmup = reviewed || !c.bank ? (reviewed || (D.cards && D.cards.length) ? { id: 'warm', kind: 'warmup', title: 'Warm up: 10 cards you know', minutes: MIN.warmCards, href: '#/flash/all?mode=warm', target: 10, why: 'Optional: five calm minutes before you leave.' } : null)
        : { id: 'warmtest', kind: 'warmup', title: 'Warm up: 10 questions', minutes: MIN.warmTest, href: '#/test?new=warmup', why: 'Optional: ten easy questions to get going.' };
      const pn = c.E && c.E.paper && c.E.paper.name, tm = c.E && c.E.cycle && c.E.cycle.time;
      return { tasks: [], notes: [`${pn ? pn + ' is today' : "It's exam day"}${tm && tm.start ? `, ${clock(tm.start)} to ${clock(tm.end)}${tm.reading ? ` (reading time from ${clock(tm.reading)})` : ''}` : ''}. Nothing new to study today.`], warmup };
    }
    if (c.season === 'done' || c.season === 'between') return { tasks: [], notes: [], warmup: null };

    if (c.season === 'eve') {
      if (c.due.cardIds.length || reviewed) add({ id: 'quick20', kind: 'revise', title: 'Quick 20: your shakiest due cards', minutes: MIN.quick, href: '#/flash/all?mode=quick', target: 20, why: 'Light revision only: the cards you are most likely to forget.' });
      add(retryRow(c, `Retry your top ${Math.min(RETRY_N, c.due.questions.length)} notebook ${Math.min(RETRY_N, c.due.questions.length) === 1 ? 'miss' : 'misses'}`));
      if (!rows.length && c.bank) add({ id: 'warmtest', kind: 'warmup', title: 'Warm up: 10 questions', minutes: MIN.warmTest, href: '#/test?new=warmup', why: 'Ten questions to stay sharp, then rest.' });
      notes.push('Before you sleep: admit card printed, the ID it asks for, centre address and reporting time checked.');
      return { tasks: rows, notes, warmup: null };
    }

    if (c.season === 'final') {
      // a full mock already started comes first (the shared step's first rule is the test in progress), in a part that fits the daily time;
      // the chain's rows then follow only while they fit beside it (and after a rebuild, only while they fit the time that is left)
      const lv = liveFull(S), cont = lv ? add(mockRow(c, lv, c.minutes - used())) : null;
      const fit = t => (t && (!(cont || kept) || used() + (t.minutes || 0) <= c.minutes) ? add(t) : null);   // a rebuild: only what fits
      // the shared next step's chain, in its order (§10.3 rule 2 'final'), so the first open task is the step Home names
      const st = lessonStep(S, D, c.today, c);
      if (finalSafe(st) && (st.rule === 'continue' || st.label === 'Continue')) fit(learnRow(c, lessonOf(D, st.id), st));
      fit(rereadRow(c));
      fit(retryRow(c));
      fit(cardsRow(c));
      if (!c.due.cardIds.length && reviewed) fit({ id: 'quick20', kind: 'revise', title: 'Quick 20: cards you know least', minutes: MIN.quick, href: '#/flash/all?mode=quick', target: 20, why: 'No cards are due: a short round on your weakest ones.' });
      // … else a full mock (the chain's last rule; never on a day that may itself be an exam day: an assumed date 0–1 days out), or the part of
      // it that fits the daily time, then PYQs on the topic most likely to cost marks while the daily minutes allow. 'No new topics' is the
      // header's plan line (P2-39: stated once).
      if (!kept && used() > c.minutes) notes.push(fullDay(used(), c.minutes));
      const last = lastFull(S), age = last ? U.daysBetween(U.dayKey(last.finished), c.today) : null;
      if (!rows.length && (age == null || age >= MOCK_EVERY) && c.E.daysLeft >= 2) add(mockRow(c, null, c.minutes - used()));
      const w = (STATS.weakTopics(S, D, c.today, { limit: 1 }) || [])[0], room = Math.floor(Math.max(0, c.minutes - used()) / MIN.question);
      if (w && room >= 5) add(practiceRow(c, { topic: w.id, subject: w.subject }, Math.min(10, room), `${Math.round(w.acc * 100)}% right in ${plural(w.attempted, 'question')}: the topic most likely to cost you marks.`, n => `Practise ${w.name}: ${plural(n, 'question')}`));
      // never an empty day before the exam (D18): a light warm-up when the paper may be today or tomorrow, else one practice set
      if (!rows.length && c.E.daysLeft <= 1 && c.bank) add({ id: 'warmtest', kind: 'warmup', title: 'Warm up: 10 questions', minutes: MIN.warmTest, href: '#/test?new=warmup', why: 'Nothing is due: ten questions to stay sharp, nothing new.' });
      if (!rows.length) { const wf = weeklyFocus(S, D, c.today, 1, { I: c.I, daysLeft: c.E.daysLeft })[0] || []; if (wf[0]) add(practiceRow(c, { subject: wf[0] }, oneSet(), 'Nothing is due: one set of past questions on the subject worth the most marks to you now.')); }
      return { tasks: rows.filter(Boolean), notes, warmup: null };
    }

    /* normal season: one recipe per phase */
    const budget = c.minutes;
    const lastF = lastFull(S), age = lastF ? U.daysBetween(U.dayKey(lastF.finished), c.today) : null;
    const lv = c.phase === 'mocks' ? liveFull(S) : null;
    if (c.phase === 'mocks' && (lv || age == null || age >= MOCK_EVERY)) {
      // a mock day (P1-45: never more than the daily time): the full mock when it fits, else the part of it that does (a mock already started
      // goes on), and revision only while it fits beside it; no lessons or PYQs. Less than half an hour free: an ordinary day.
      const m = mockRow(c, lv, budget - used());
      if (m) {
        let left = budget - used() - m.minutes;
        [cardsRow(c), retryRow(c), rereadRow(c)].forEach(r => { if (r && r.minutes <= left && add(r)) left -= r.minutes; });
        add(m);
        return { tasks: rows, notes, warmup: null };
      }
    }
    // revision first: all of it on a fresh list (it is due today, whatever the time); after a rebuild only while it fits the time that is left
    [cardsRow(c), retryRow(c), rereadRow(c)].forEach(r => { if (r && (!kept || used() + r.minutes <= budget)) add(r); });
    if (!kept && used() > budget) notes.push(fullDay(used(), budget));

    // learn rows: the shared next step first, then the same subject's next lessons in the learning order (never a different subject); a lesson
    // already finished today (kept by a rebuild) counts towards 'Lessons a day'
    const lessonsCap = c.lessonsCap;
    const st = lessonStep(S, D, c.today, c), first = st && lessonOf(D, st.id);
    const learnt = rows.filter(t => t.kind === 'learn').map(t => t.lesson);
    // the first lesson is the shared next step (P0-08: the lesson Home names), planned when it fits beside today's revision
    if (first && learnt.length < lessonsCap && used() + (first.minutes || 20) <= budget && add(learnRow(c, first, st))) learnt.push(first.id);
    if (first && learnt.length) {
      // on a chosen route the next rows follow the route; otherwise the same subject's learning order (P1-06, P1-45)
      const R = st.rule === 'route' && c.route && c.I && c.I.path ? c.I.path(c.route) : null;
      const ord = R && Array.isArray(R.lessons) ? R.lessons : c.I && c.I.order ? c.I.order(first.subject) : D.lessons.filter(l => l.subject === first.subject).map(l => l.id);
      for (const id of ord.slice(ord.indexOf(first.id) + 1)) {
        if (learnt.length >= lessonsCap) break;
        const l = lessonOf(D, id);
        if (!l || doneLesson(S, id) || (!R && l.status && l.status !== 'in')) continue;
        if (used() + (l.minutes || 20) > budget - PRACTICE_RESERVE) break;
        add(learnRow(c, l, null, R ? (R.id === 'crash' ? 'Crash course' : R.title) : null)); learnt.push(id);
      }
    }
    // practice rows: the planned lesson's own PYQs in the Learn phase, the worst topic in the Practise phase, then the week's focus; the
    // questions of practice rows kept by a rebuild count towards 'Questions a day'
    const qCap = c.questionsCap;
    let qLeft = Math.max(0, qCap - rows.filter(t => t.kind === 'practice').reduce((a, t) => a + (t.target || 0), 0));
    const room = () => Math.floor(Math.max(0, budget - used()) / MIN.question);
    const take = n => Math.min(n, qLeft, room());          // never past the daily time (P1-45)
    const leadRow = rows.find(t => t.kind === 'learn'), lead = leadRow ? lessonOf(D, leadRow.lesson) : null;   // today's planned lesson (if one fits)
    if (c.phase === 'learn' && lead && qLeft > 0) {
      const sub = lead.subtopic || lead.id, hasSub = keyedIn(D, q => q.subtopic === sub || (q.icai && (q.tags || []).includes(sub))) > 0;
      const sc = hasSub ? { sub, subject: lead.subject } : { topic: lead.topic, subject: lead.subject };
      const k = take(10), name = hasSub ? (lessonOf(D, sub) || lead).title : nameOf(D, lead.topic);
      const r = k >= 3 ? practiceRow(c, sc, k, `Right after the lesson: the past questions on ${hasSub ? 'this sub-topic' : 'its topic'}.`, n => `Solve ${plural(n, 'question')} on ${name}`) : null;
      if (add(r)) qLeft -= r.target;
    }
    if (c.phase === 'practice' && qLeft > 0) {
      const w = (STATS.weakTopics(S, D, c.today, { limit: 1 }) || [])[0];
      const k = w ? take(10) : 0;
      const r = k >= 5 ? practiceRow(c, { topic: w.id, subject: w.subject }, k, `${Math.round(w.acc * 100)}% right in ${plural(w.attempted, 'question')}: the topic most likely to cost you marks.`, n => `Practise ${w.name}: ${plural(n, 'question')}`) : null;
      if (add(r)) qLeft -= r.target;
    }
    // every other Learn-phase day the second set is a mixed review of the lessons already finished (P2-64: interleaving), once the bank has it
    if (c.phase === 'learn' && qLeft >= 5 && room() >= 5 && mixedDay(c)) {
      const r = practiceRow(c, { learned: true }, Math.min(10, qLeft, room()), 'Mixed review: past questions from lessons you have finished, shuffled, so you practise choosing the method.', n => `Mixed review: ${plural(n, 'PYQ')} from your finished lessons`);
      if (add(r)) qLeft -= r.target;
    }
    // the week's focus subject; on a day with no lesson (none fits beside the revision) even a short set fills the time that is left
    const minSet = learnt.length ? 5 : 3;
    if (qLeft >= minSet && room() >= minSet) {
      const wf = weeklyFocus(S, D, c.today, 1, { I: c.I, daysLeft: c.E.daysLeft })[0] || [];
      const sid = wf[0];
      if (sid) { const r = practiceRow(c, { subject: sid }, Math.min(10, qLeft, room()), focusWhy(c, sid)); if (add(r)) qLeft -= r.target; }
    }
    if (!rows.length) { const wf = weeklyFocus(S, D, c.today, 1, { I: c.I, daysLeft: c.E.daysLeft })[0] || []; if (wf[0]) add(practiceRow(c, { subject: wf[0] }, oneSet(), focusWhy(c, wf[0]))); }
    if (!rows.length && c.phase) add(mockRow(c, null, budget - used()));
    return { tasks: rows, notes, warmup: null };
  }

  /* ------------------------------------------------------------------ judging a row from state */
  function judge(t, c) {
    const S = c.state, today = c.today, r = Object.assign({}, t, { done: false, progress: null });
    const [a, b] = c.bounds || dayBounds(today), inDay = ts => typeof ts === 'number' && ts >= a && ts < b;
    const rows = c.todayLog || (c.todayLog = (S.log || []).filter(x => x && inDay(x[0]) && /^[ptr]$/.test(x[4] || 'p')));
    const cardsToday = ((S.act || {})[today] || {}).c || 0;
    if (t.kind === 'learn') { const e = S.lessons[t.lesson]; r.done = !!(e && e.done && inDay(e.done)); }
    else if (t.id.indexOf('reread:') === 0) { const e = S.lessons[t.lesson]; r.done = !!(e && inDay(e.last)); }
    else if (t.id === 'cards') { const now = cardShare(c).today; r.done = cardsToday > 0 && now === 0; r.progress = `${Math.max(0, Math.min(t.target, t.target - now))}/${t.target}`; }
    else if (t.id === 'retry') {
      const seen = new Set();
      rows.forEach(x => { const n = S.nb[x[1]]; if (n && !(inDay(n.added) && !(t.qids || []).includes(x[1]))) seen.add(x[1]); });
      const k = seen.size; r.done = k >= t.target; r.progress = `${Math.min(k, t.target)}/${t.target}`;
    }
    else if (t.kind === 'practice' && t.scope) {
      const f = scopeTest(c.D, t.scope, S), qb = c.D.qById || {};
      const k = rows.filter(x => qb[x[1]] && f(qb[x[1]])).length;
      r.done = k >= t.target; r.progress = `${Math.min(k, t.target)}/${t.target}`;
    }
    else if (t.kind === 'mock') {
      // a full test submitted today; or, for a part of one (t.sit, P1-45), its clock reaching the minutes planned for today's part
      r.done = (S.tests || []).some(x => isFull(x) && inDay(x.finished));
      const lv = !r.done && t.sit ? liveFull(S) : null;
      if (lv) {
        const ran = (lv.elapsedMs || 0) / 60000, goal = t.test && lv.id !== t.test ? t.minutes : t.sit, from = Math.max(0, goal - t.minutes);
        r.done = ran >= goal - 0.5;
        if (!r.done) r.progress = `${Math.max(0, Math.min(t.minutes, Math.floor(ran - from)))}/${t.minutes} min`;
      }
    }
    else if (t.id === 'quick20' || t.id === 'warm') { r.done = cardsToday >= t.target; r.progress = `${Math.min(cardsToday, t.target)}/${t.target}`; }
    else if (t.id === 'warmtest') r.done = (S.tests || []).some(x => inDay(x.finished));
    return r;
  }

  /* ------------------------------------------------------------------ the day (P0-19) */
  const stripRow = t => { const o = {}; ['id', 'kind', 'title', 'minutes', 'href', 'why', 'target', 'scope', 'lesson', 'subject', 'qids', 'sit', 'test', 'extra'].forEach(k => { if (t[k] != null) o[k] = t[k]; }); return o; };
  function validSnap(p) { return !!p && typeof p === 'object' && p.v === SNAP_V && isDay(p.day) && Array.isArray(p.tasks) && p.tasks.every(t => t && typeof t.id === 'string' && typeof t.href === 'string'); }
  /* the snapshot's key: what the list is built from. The season is part of it (P1-61): an assumed exam date confirmed on the eve or on exam day
     changes the recipe (final stretch → eve or exam day) without changing the date. A key field missing from an older stored snapshot (the caps,
     before Part B) does not force a rebuild. */
  const KEY = ['day', 'examDate', 'minutes', 'route', 'season', 'lessons', 'questions'];
  const sameKey = (p, k) => KEY.every(f => (f === 'lessons' || f === 'questions') && p[f] === undefined ? true : (p[f] == null ? null : p[f]) === (k[f] == null ? null : k[f]));
  /** a same-day rebuild keeps what is already done (P0-19: a finished row never disappears) and drops open rows the new recipe no longer has;
      the recipe was given the kept rows (c.keep), so the new rows fit the time and the caps that are left */
  function merge(keep, rows) {
    const ids = new Set(keep.map(t => t.id));
    return keep.concat(rows.filter(t => !ids.has(t.id)));
  }

  /** The day's snapshot (§10.8): {day, examDate, minutes, route, season, lessons, questions, phase, tasks, notes, warmup, left, next, done, empty,
      minutesPlanned, fresh}. `season` is always the live season (never a stored one). */
  function day(state, D, today, o) {
    const c = context(state, D, today, o);
    c.bounds = dayBounds(today);
    const key = { day: today, examDate: c.E.date || null, minutes: c.minutes, route: c.route, season: c.season, lessons: c.lessonsCap, questions: c.questionsCap };
    const old = state.plan, ok = validSnap(old);
    let base, fresh = false;
    if (ok && sameKey(old, key)) base = old;
    else {
      c.keep = ok && old.day === today ? old.tasks.filter(t => judge(t, c).done).map(stripRow) : [];
      const r = recipe(c), rows = r.tasks.filter(Boolean).map(stripRow);
      base = Object.assign({ v: SNAP_V }, key, { tasks: c.keep.length ? merge(c.keep, rows) : rows, notes: r.notes, warmup: r.warmup ? stripRow(r.warmup) : null });
      fresh = true;
    }
    const tasks = base.tasks.map(t => judge(t, c));
    const open = tasks.filter(t => !t.done);
    return Object.assign({ v: SNAP_V }, key, { phase: c.phase,
             tasks, notes: (base.notes || []).slice(), warmup: base.warmup ? judge(base.warmup, c) : null,
             left: open.length, next: open[0] || null, done: tasks.length > 0 && !open.length, empty: !tasks.length,
             minutesPlanned: tasks.reduce((a, t) => a + (t.minutes || 0), 0), fresh });
  }
  /** what is kept in state.plan (rows without their judged fields) */
  function stored(v) {
    const o = { v: SNAP_V };
    KEY.forEach(f => { if (v[f] !== undefined) o[f] = v[f]; });
    return Object.assign(o, { tasks: v.tasks.map(stripRow), notes: v.notes || [], warmup: v.warmup ? stripRow(v.warmup) : null });
  }

  /** 'Add one more task' (D18): one more open row for a finished day, or null when there is nothing sensible left */
  function more(state, D, today, v, o) {
    const c = context(state, D, today, o);
    const have = new Set((v && v.tasks || []).map(t => t.id)), ok = t => t && !have.has(t.id);
    const reviewed = reviewedAny(state);
    const quick = { id: 'quick20', kind: 'revise', title: 'Quick 20: cards you know least', minutes: MIN.quick, href: '#/flash/all?mode=quick', target: 20, why: 'A short round on your weakest cards.' };
    const wf = weeklyFocus(state, D, today, 1, { I: c.I, daysLeft: c.E.daysLeft })[0] || [];
    const cands = [];
    if (c.season === 'normal') {
      const st = lessonStep(state, D, today, c), l = st && lessonOf(D, st.id);
      if (l && !doneLesson(state, l.id)) cands.push(learnRow(c, l, st));
      wf.forEach(sid => cands.push(practiceRow(c, { subject: sid }, 10, focusWhy(c, sid))));
      if (reviewed) cands.push(quick);
    } else if (c.season === 'final' || c.season === 'eve') {
      if (reviewed) cands.push(quick);
      cands.push(retryRow(c));
      const w = (STATS.weakTopics(state, D, today, { limit: 1 }) || [])[0];
      if (w) cands.push(practiceRow(c, { topic: w.id, subject: w.subject }, 10, 'The topic most likely to cost you marks.', n => `Practise ${w.name}: ${plural(n, 'question')}`));
      wf.forEach(sid => cands.push(practiceRow(c, { subject: sid }, 10, focusWhy(c, sid))));
    }
    const t = cands.find(ok);
    if (!t) return null;
    const x = stripRow(t); x.extra = 1;
    if (have.has(x.id)) return null;
    return x;
  }

  /* ------------------------------------------------------------------ the pace line (P1-45) */
  /** How many lessons a day's list really holds (the recipe's own rule): none at 'Lessons a day' 0 or when the first lesson (`first` minutes, the
      shared next step's; else `avg`) does not fit beside the revision; else the first, then more of about `avg` minutes each while the revision,
      the lessons and the 20 minutes kept for practice fit. */
  function lessonsPerDay(cap, minutes, rev, avg, first) {
    const f = first > 0 ? first : avg > 0 ? avg : 0;
    if (!(cap > 0) || !(rev + f <= minutes) || !(rev < minutes)) return 0;
    if (!(avg > 0)) return cap;
    return Math.max(1, Math.min(cap, Math.floor((minutes - PRACTICE_RESERVE - rev) / avg)));
  }
  /** the days left for new lessons: every day before the final fortnight except the mock-phase mock days. `parts` = the days one mock takes
      (mockParts: 1 when it fits the daily time, so one day in three from 45 days out; 2 at 90 min a day, so 2 days in 4; 0 when none is planned) */
  function lessonDays(dl, parts) {
    if (dl == null || !(dl >= 0)) return null;
    const k = parts == null ? 1 : Math.max(0, Math.round(parts));
    const before = Math.max(0, dl - 14), mocksAhead = Math.max(0, Math.min(dl, 45) - 15 + 1);
    return Math.max(0, before - (k ? Math.ceil((mocksAhead * k) / (k + MOCK_EVERY - 1)) : 0));
  }
  /** {lessonsLeft, minutesLeft, cap, perDayLessons, perDay (minutes), daysNeeded, daysLeft, learnDays, fits, route, suggest, more, allDone}.
      o.revMinutes: the revision on today's list (the time the lessons share the day with; build() passes it). `suggest` = the Crash course when
      it is shorter than what is left; `more` = {n, minutes}, the smallest 'Lessons a day' that fits before the final fortnight within the daily
      time. Never invented: every number is the recipe's own. */
  function pace(state, D, today, o) {
    const c = context(state, D, today, o);
    const P = c.route && c.I && c.I.path ? c.I.path(c.route) : null;
    const pool = P && Array.isArray(P.lessons) ? P.lessons : D.lessons.map(l => l.id);
    const left = pool.filter(id => lessonOf(D, id) && !doneLesson(state, id));
    const minutesLeft = left.reduce((a, id) => a + (lessonOf(D, id).minutes || 0), 0);
    const rev = o && typeof o.revMinutes === 'number' && o.revMinutes > 0 ? o.revMinutes : 0;
    const avg = left.length ? minutesLeft / left.length : 0;
    const st = left.length ? lessonStep(state, D, today, c) : null, fl = st && lessonOf(D, st.id), first = fl ? fl.minutes || 20 : 0;   // the recipe's first lesson
    const cap = c.lessonsCap, n = lessonsPerDay(cap, c.minutes, rev, avg, first);
    const daysNeeded = n ? Math.ceil(left.length / n) : null;
    const dl = c.E.daysLeft, learnDays = lessonDays(dl, mockParts(c.minutes));
    const fits = !left.length || learnDays == null || (daysNeeded != null && daysNeeded <= learnDays);
    let suggest = null, more = null;
    if (!fits && learnDays > 0) {
      for (let k = Math.max(1, n + 1); k <= LESSONS_MAX; k++) {
        if (Math.ceil(left.length / k) > learnDays) continue;
        if (lessonsPerDay(k, c.minutes, rev, avg, first) >= k) more = { n: k, minutes: Math.round(k * avg) };
        break;
      }
    }
    if (!fits && c.route !== 'crash' && c.I && c.I.path) {
      const cr = c.I.path('crash');
      if (cr && cr.lessons && cr.lessons.length) {
        const crIds = cr.lessons.filter(id => lessonOf(D, id) && !doneLesson(state, id));
        const crLeft = crIds.reduce((a, id) => a + ((lessonOf(D, id) || {}).minutes || 0), 0);
        if (crLeft < minutesLeft) suggest = { id: 'crash', title: 'Crash course', hours: Math.round(crLeft / 60), share: cr.share || null, lessons: cr.lessons.length, left: crIds.length };
      }
    }
    return { lessonsLeft: left.length, minutesLeft, cap, perDayLessons: n, perDay: Math.round(n * avg), daysNeeded, daysLeft: dl, learnDays, fits, allDone: !left.length,
             route: P ? { id: P.id, title: P.title, total: pool.length, done: pool.length - left.length } : null, suggest, more };
  }

  /* ------------------------------------------------------------------ after the exam: the season as a record (P2-72) */
  /** 'Your season': the four phases of the season that ended, from the learner's own records: [{id, label, from (null for Learn), to, lessons,
      answers, tests}] (lessons finished, PYQ answers, tests finished in each phase), or null with no exam behind or nothing recorded in it.
      The phases are the ones the plan counted to: the learner's own date; with no date set, the cycle's first exam day (the date assumed until
      then), the final stretch going on to the last exam day (inside the exam window the plan stayed in it). */
  function seasonRecord(state, E) {
    const end = E && E.last && E.last.date;
    if (!isDay(end) || !hasProgress(state)) return null;
    const cy = E.last.cycle, d0 = !E.set && cy && (cy.days || []).slice().sort()[0], anchor = isDay(d0) && d0 <= end ? d0 : end;
    const ms = k => U.parseDay(k).getTime(), log = state.log || [];
    const rows = phases(U.addDays(anchor, -400), anchor).map(p => {
      const to = p.id === 'final' && end > p.to ? end : p.to;
      const a = p.id === 'learn' ? -Infinity : ms(p.from), b = ms(U.addDays(to, 1)), inR = t => typeof t === 'number' && t >= a && t < b;
      return { id: p.id, label: p.label, from: p.id === 'learn' ? null : p.from, to,
               lessons: Object.values(state.lessons || {}).filter(e => e && inR(e.done)).length,
               answers: log.filter(r => r && inR(r[0]) && /^[ptr]$/.test(r[4] || 'p')).length,
               tests: (state.tests || []).filter(x => x && inR(x.finished)).length };
    });
    return rows.some(r => r.lessons || r.answers || r.tests) ? rows : null;
  }

  /* ------------------------------------------------------------------ the page model */
  function firstDayOf(state, today) {
    let m = today;
    const take = k => { if (isDay(k) && k < m) m = k; };
    if (state.created) take(U.dayKey(state.created));
    Object.keys(state.act || {}).forEach(take);
    return m;
  }
  /** everything /plan draws: {exam, season, phase, phases, current, weeks, day, pace, shares} */
  function build(state, D, today, o) {
    o = o || {};
    const c = context(state, D, today, o);
    const E = c.E, dl = E.daysLeft;
    const ph = dl != null && dl >= 0 ? phases(today, E.date, { start: firstDayOf(state, today) }) : [];
    const nW = dl != null && dl >= 0 ? Math.max(1, Math.ceil((dl + 1) / 7)) : 0;
    const focus = nW ? weeklyFocus(state, D, today, nW, { I: c.I, daysLeft: dl }) : [];
    const left = {}, mins = {};
    D.lessons.forEach(l => { if (!doneLesson(state, l.id)) { left[l.subject] = (left[l.subject] || 0) + 1; mins[l.subject] = (mins[l.subject] || 0) + (l.minutes || 0); } });
    const weeks = focus.map((ids, i) => {
      const from = U.addDays(today, i * 7);
      let to = U.addDays(from, 6); if (E.date && to > E.date) to = E.date;
      const phase = phaseOf(U.daysBetween(from, E.date));
      return { n: i + 1, from, to, phase, subjects: ids, lessonsLeft: ids.reduce((a, id) => a + (left[id] || 0), 0), minutesLeft: ids.reduce((a, id) => a + (mins[id] || 0), 0), mock: phase === 'mocks' || phase === 'final' };
    });
    const v = day(state, D, today, Object.assign({}, o, { I: c.I, E, season: c.season, due: c.due, nextStep: c.nextStep }));
    const rev = v.tasks.filter(t => t.kind === 'revise' && !t.extra).reduce((a, t) => a + (t.minutes || 0), 0);
    return { exam: E, season: c.season, phase: c.phase, phases: ph, current: ph.find(p => p.current) || null, weeks, day: v, today: v.tasks,
             pace: pace(state, D, today, Object.assign({}, o, { I: c.I, E, season: c.season, due: c.due, revMinutes: rev })), shares: shares(D, c.I),
             countdown: { days: dl, date: E.date, phase: c.phase }, next: { cycle: nextCycle(D, E, today), label: nextLabel(D, E, today) } };
  }
  /** compat: the judged rows of today's list */
  function todayTasks(state, D, today, o) { return day(state, D, today, o).tasks; }

  /* ------------------------------------------------------------------ browser: the live day, kept in state.plan */
  let memo = null, ver = 0, hooked = false, lastSaved = null;
  function persist(v) {
    const snap = stored(v), sig = JSON.stringify(snap);
    if (sig === lastSaved) return false;           // asked once already: never loop if the store keeps a different shape
    lastSaved = sig;
    const A = GA.actions, S = GA.store;
    if (A && typeof A.setPlan === 'function') A.setPlan(snap);
    else if (S && typeof S.update === 'function') S.update(s => { s.plan = snap; }, 'plan');
    return true;
  }
  /** day() for the live store, memoised per store change; a freshly built list is stored so it stays fixed for the day */
  function current() {
    const S = GA.store, D = GA.data && GA.data.D;
    if (!S || !S.state || !D) return null;
    if (!hooked && S.on) { hooked = true; S.on('change', () => { ver++; }); }
    const today = U.today(), k = today + '|' + ver;
    if (memo && memo.k === k && memo.state === S.state) return memo.v;
    let v;
    try { v = day(S.state, D, today); } catch (e) { if (typeof console !== 'undefined') console.error('planner:', e); return null; }
    memo = { k, state: S.state, v };
    if (v.fresh) persist(v);
    return v;
  }
  /** append one more task to today's list (the done state's coral); returns the new day or null */
  function addOne() {
    const S = GA.store, D = GA.data && GA.data.D, v = current();
    if (!S || !D || !v) return null;
    const t = more(S.state, D, U.today(), v);
    if (!t) return null;
    const snap = stored(v); snap.tasks.push(t);
    lastSaved = null;
    const A = GA.actions;
    if (A && typeof A.setPlan === 'function') A.setPlan(snap); else S.update(s => { s.plan = snap; }, 'plan');
    memo = null;
    return current();
  }

  GA.planner = { SNAP_V, MIN, RETRY_N, PHASES, PHASE_LABEL, PHASE_TXT, LESSONS_MAX, LOCAL_CYCLE, minTxt, phaseOf, phases, shares, availability, weeklyFocus, day, judge, more, pace,
                 lessonsPerDay, lessonDays, mockParts, phaseLine, build, todayTasks, examOf, seasonFrom, seasonOf, cyclesOf, cycleFor, labelFor, nextCycle, nextLabel, hasProgress, stored, seasonRecord,
                 recommended, current, addOne, _context: context };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.planner;
})(typeof window !== 'undefined' ? window : globalThis);
