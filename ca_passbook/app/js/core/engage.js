/* PassBook — engagement layer: streak with freezes, XP and levels, cards due, the PassBook Wrapped numbers, milestones, the Me header's status lines
   and the top-nav chips.
   Pure core (Node-testable): compute(state, D, today) and wrapped(state, D, range) only read the learner's own state and the catalogue.
   Nothing is stored except the streak bookkeeping in state.eng ({frozen: [day keys], gate: [day keys]}), written by tick() once at boot, and the
   milestone marks in state.seen ('ms:*', P2-38).
   XP is derived from the attempt log, lessons, act days and tests every time, never stored, and every event is counted once:
     lesson completed 50 · practice question: first correct answer 10, later correct 3, wrong 1 (modes p and r; answers given inside a test earn through
     the test instead; an answer given after a Hint earns the later-correct 3 and leaves the 10 for the first unaided one, P2-64) · flashcard
     review 1 (at most 60 a day) · lab challenge solved 15 (without Peek, at most 10 solves a day: decided when the solve is recorded, see
     actions.labChallenge) · finished test 100 + 1 per whole mark scored, once per test id, only with at least one graded answer and 10 % of its
     questions answered (D8 option 2; a paper with no official key is 'Not scored' and earns nothing, P0-05). xpFor() is the same rules for one
     event, for the inline '+N XP' lines.
   Days are study days (U.dayOf: they start at profile.dayStart, default 4 a.m., P3-28). The streak's day maths maps day keys to integer day numbers
   through Date.UTC, so DST and the machine's zone never shift a day.
   Exam days (P2-73; internal names keep 'gate'): sitting a paper never costs the streak. Each exam day and the day after bridge a run (no freeze
   used, the run not lengthened) for a learner-set date that is an exam day of a cycle, else every official paper day of the calendar (CA Inter
   Group II: Papers 4, 5 and 6 on 8, 10 and 12 January 2027); never an assumed date. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');
  const ST = GA.stats || require('./stats.js');

  const XP = { lesson: 50, pyqFirst: 10, pyqAgain: 3, pyqWrong: 1, card: 1, cardDayCap: 60, lab: 15, labDayCap: 10, test: 100, testMinShare: 0.1, perMark: 1, level: 500 };
  const FREEZE = { every: 7, cap: 2 };
  const PYQ_XP_MODES = { p: 1, r: 1 };          // practice + revision earn per-answer XP
  const HINT_MODES = { ph: 1, rh: 1 };          // the archive's hinted practice answers (store.trimLog folds a row flagged 'h' under its mode + 'h')
  const ANSWER_MODES = { p: 1, r: 1, t: 1 };     // every question answer the learner gave (Wrapped counts these)
  const ARCH_ANSWER_MODES = { p: 1, r: 1, t: 1, ph: 1, rh: 1 };
  const KINDS = ['lessons', 'pyq', 'cards', 'labs', 'tests'];
  const MIN = { best: 6, hardest: 4 };            // answers needed before Wrapped names a strongest subject / toughest topic
  const RUN_NEWS = 3;                            // a streak that ends is mentioned from this length on
  /** the Ascent names over the 500-XP levels (P3-30, D14): a label only, no new mechanics */
  const LEVEL_NAMES = [[60, 'Signed off'], [35, 'Audited'], [20, 'Balance sheet'], [10, 'Trial balance'], [5, 'Working notes'], [1, 'Rough work']];   // a set of books, from rough work to signed off

  /* ------------------------------------------------------------------ day maths (timezone-free) */
  const DAY = 864e5, KEY = /^\d{4}-\d{2}-\d{2}$/;
  const isKey = k => typeof k === 'string' && KEY.test(k);
  const dnum = k => Math.round(Date.UTC(+k.slice(0, 4), +k.slice(5, 7) - 1, +k.slice(8, 10)) / DAY);
  const dkey = n => new Date(n * DAY).toISOString().slice(0, 10);
  const addDays = (k, n) => dkey(dnum(k) + n);
  const between = (a, b) => dnum(b) - dnum(a);
  const weekday = k => (new Date(dnum(k) * DAY).getUTCDay() + 6) % 7;   // 0 = Monday
  const weekStart = k => dkey(dnum(k) - weekday(k));
  const monthStart = k => k.slice(0, 8) + '01';
  /** the study day of a timestamp (U.dayOf); consecutive calls with nearby timestamps reuse the last answer */
  function dayOfFactory() {
    let lo = 1, hi = 0, key = null;
    return t => {
      if (t >= lo && t < hi) return key;
      const k = U.dayOf(t); if (!k) return null;
      const b = U.dayBounds(k); key = k; lo = b[0]; hi = b[1];
      return key;
    };
  }
  const D_ = { isKey, dnum, dkey, addDays, between, weekday, weekStart, monthStart };

  /* ------------------------------------------------------------------ exam days (P2-73) */
  const liveExam = () => (GA.data && GA.data.D ? GA.data.D.exam : undefined);
  const cyclesOf = X => {
    const src = X && Array.isArray(X.cycles) && X.cycles.length ? X : ST.EXAM_FALLBACK;
    return src && Array.isArray(src.cycles) ? src.cycles.filter(c => c && Array.isArray(c.days)) : [];
  };
  const gateOf = s => ((s && s.eng && Array.isArray(s.eng.gate)) ? s.eng.gate : []).filter(isKey);
  function examOf(state, X, today) {
    try { return typeof ST.exam === 'function' ? ST.exam(state, X, today) : null; } catch (e) { return null; }
  }
  /** the exam days that bridge a streak: a learner-set date that is one of a cycle's exam days, else every cycle's official paper days
      (content/exam.json `papers`). An assumed date (an exam day with no paper published for it) never does. */
  function gateExams(state, X, today) {
    const xs = X === undefined ? liveExam() : X, cycles = cyclesOf(xs), E = examOf(state, xs, isKey(today) ? today : U.today());
    if (E && E.set) return isKey(E.date) && cycles.some(c => c.days.indexOf(E.date) >= 0) ? [E.date] : [];
    const out = [];
    cycles.forEach(c => { const pd = c.papers ? [].concat(...Object.values(c.papers).filter(Array.isArray)).filter(isKey) : []; pd.forEach(d => { if (out.indexOf(d) < 0) out.push(d); }); });   // every official paper day (P4, P5, P6)
    return out;
  }
  /** every bridging day: each exam day and the day after, plus the ones already recorded in state.eng.gate (so a later date change keeps them) */
  function gateDays(state, X, today) {
    const out = new Set(gateOf(state));
    gateExams(state, X, today).forEach(d => { out.add(d); out.add(addDays(d, 1)); });
    return Array.from(out).sort();
  }
  const gateNums = (state, X, today) => new Set(gateDays(state, X, today).map(dnum));
  /** the paper written on an exam day ('Paper 4'), from the calendar; 'your exam' when the day has no single paper */
  function paperName(X, day) {
    const xs = X === undefined ? liveExam() : X;
    for (const c of cyclesOf(xs)) {
      if (c.days.indexOf(day) < 0) continue;
      const p = typeof ST.paperOf === 'function' ? ST.paperOf(c, day) : null;
      if (p && p.name) return p.name;
    }
    return 'your exam';
  }
  /** the streak's line around the exam (P2-73), for a bridging date only: the eve, exam day and the day after; '' otherwise. The eve's line
      starts 'Tomorrow'; the others ('Paper 4 today: …', 'Paper 4 was yesterday: …') say the streak is already safe */
  function gateLine(state, X, today) {
    today = isKey(today) ? today : U.today();
    const ex = gateExams(state, X, today), cap = t => t.charAt(0).toUpperCase() + t.slice(1);
    if (ex.indexOf(today) >= 0) return `${cap(paperName(X, today))} today: your streak is safe today and tomorrow.`;
    if (ex.indexOf(addDays(today, 1)) >= 0) return `Tomorrow is ${paperName(X, addDays(today, 1))}: your streak is safe tomorrow and the day after.`;
    if (ex.indexOf(addDays(today, -1)) >= 0) return `${cap(paperName(X, addDays(today, -1)))} was yesterday: your streak is safe today too.`;
    return '';
  }
  /** true for a line that says today is already covered (exam day or the day after), not the eve's */
  const gateSafe = line => !!line && !/^Tomorrow/.test(line);

  /* ------------------------------------------------------------------ streak with freezes */
  const actOf = s => (s && s.act) || {};
  const frozenOf = s => ((s && s.eng && Array.isArray(s.eng.frozen)) ? s.eng.frozen : []).filter(isKey);
  function activeNums(state, upto) {
    const act = actOf(state), out = [];
    for (const k in act) if (isKey(k) && ST.dayActive(act[k])) { const n = dnum(k); if (upto == null || n <= upto) out.push(n); }
    return out.sort((a, b) => a - b);
  }
  const NONE = new Set();

  /** Replay the calendar from the first active day to `endN` (inclusive). An idle `todayN` never breaks a run (the day is not over).
      An exam day (`gate`, day numbers) keeps a run alive without a freeze. A day in state.eng.frozen bridges the run only while a freeze is held;
      one freeze is earned on every 7th active day of a run (hold at most 2). Bridged days keep the run alive but do not lengthen it. */
  function walk(state, endN, todayN, gate) {
    const days = activeNums(state, endN), on = new Set(days), fz = new Set(frozenOf(state).map(dnum)), gt = gate || NONE;
    const r = { run: 0, best: 0, held: 0, earned: 0, chain: [], gchain: [], valid: new Set(), gate: new Set(), start: null, last: null, longest: null };
    if (!days.length) return r;
    for (let d = days[0]; d <= endN; d++) {
      if (on.has(d)) {
        if (!r.run) { r.start = d; r.chain = []; r.gchain = []; }
        r.run++; r.last = d;
        if (r.run > r.best) { r.best = r.run; r.longest = { from: r.start, to: d }; }
        if (r.run % FREEZE.every === 0 && r.held < FREEZE.cap) { r.held++; r.earned++; }
      } else if (d === todayN) { /* still today */ }
      else if (r.run && gt.has(d)) { r.gchain.push(d); r.gate.add(d); }
      else if (r.run && r.held && fz.has(d)) { r.held--; r.chain.push(d); r.valid.add(d); }
      else { r.run = 0; r.chain = []; r.gchain = []; r.start = null; }
    }
    return r;
  }

  function streak(state, today, X) {
    const t = dnum(today), gt = gateNums(state, X, today), w = walk(state, t, t, gt), cur = w.run;
    const activeToday = ST.dayActive(actOf(state)[today]);
    return {
      current: cur, best: w.best, activeToday, atRisk: cur > 0 && !activeToday && !gt.has(t),
      freezes: w.held, cap: FREEZE.cap, every: FREEZE.every, earned: w.earned,
      frozen: w.chain.map(dkey),                                   // the frozen days inside the current streak
      gate: w.gchain.map(dkey),                                    // the exam days inside it (P2-73)
      nextFreezeIn: w.held >= FREEZE.cap ? null : FREEZE.every - (cur % FREEZE.every),
      since: cur && w.start != null ? dkey(w.start) : null, last: w.last != null ? dkey(w.last) : null,
      longest: w.longest ? { from: dkey(w.longest.from), to: dkey(w.longest.to) } : null
    };
  }

  /** The days tick() would freeze now: the missed days between the last active day and yesterday, but only when the freezes held cover every one
      of them (a gap too long to bridge breaks the streak and the freezes are kept for the next one). Exam days need no freeze; already-frozen days
      are not counted twice. */
  function freezePlan(state, today, X) {
    const t = dnum(today), days = activeNums(state, t - 1);
    if (!days.length) return [];
    const L = days[days.length - 1];
    if (L >= t - 1) return [];
    const gt = gateNums(state, X, today), w = walk(state, L, t, gt);
    if (!w.run) return [];
    const fz = new Set(frozenOf(state).map(dnum));
    let held = w.held; const need = [];
    for (let d = L + 1; d < t; d++) { if (gt.has(d)) continue; if (fz.has(d) && held) held--; else need.push(d); }
    return need.length && need.length <= held ? need.map(dkey) : [];
  }
  function normEng(e) {
    const out = Object.assign({ v: 1 }, e && typeof e === 'object' && !Array.isArray(e) ? e : {});
    out.frozen = frozenOf({ eng: e });
    if (out.gate != null) out.gate = gateOf({ eng: e });
    return out;
  }

  /** Persist the freezes consumed since the last visit, and the exam days that have passed (call once at boot; idempotent). Returns the days frozen now. */
  function tick(store, today, X) {
    today = isKey(today) ? today : U.today();
    const s = store && store.state; if (!s) return [];
    const need = freezePlan(s, today, X);
    const had = new Set(gateOf(s)), keep = gateDays(s, X, today).filter(k => k < today && !had.has(k));
    if (!need.length && !keep.length) return [];
    store.update(st => {
      const e = (st.eng = normEng(st.eng));
      if (need.length) e.frozen = U.uniq(e.frozen.concat(need)).sort();
      if (keep.length) e.gate = U.uniq(gateOf(st).concat(keep)).sort();
    }, 'eng');
    return need;
  }

  /* ------------------------------------------------------------------ XP */
  const zero = () => ({ lessons: 0, pyq: 0, cards: 0, labs: 0, tests: 0 });
  function sortedLog(state) {
    const log = (state && state.log) || [];
    for (let i = 1; i < log.length; i++) if (log[i][0] < log[i - 1][0]) return log.slice().sort((a, b) => a[0] - b[0]);
    return log;
  }
  const archOf = s => (s && s.logArch && s.logArch.m) || {};
  const LAB_MODES = { l: 1, lx: 1 };              // every checked lab challenge; only 'l' rows with ok earn XP ('lx': Peek used or past the day's cap)
  const hinted = r => r[5] === 'h';

  /** a stored test record, read for XP and Wrapped (P0-05, P3-27): graded answers, answers, questions, whether anything in it could be graded, and
      its score, graded-only max, % of marks and accuracy (correct ÷ (correct + wrong)). GA.scoring.summary (WP10) is the reader; without it, the
      stored fields (states first). */
  function testInfo(t) {
    const SC = GA.scoring;
    if (SC && typeof SC.summary === 'function') {
      try {
        const m = SC.summary(t, GA.data && GA.data.D);
        if (m) return { graded: (m.correct | 0) + (m.wrong | 0), answered: m.attempted | 0, total: m.total | 0, scored: m.scored !== false,
          score: m.score, max: m.max, pct: m.pct == null ? null : m.pct, accuracy: m.accuracy == null ? null : m.accuracy, full: !!m.full, negative: m.negative || 0 };
      } catch (e) { /* fall back to the stored fields */ }
    }
    const st = t.states && typeof t.states === 'object' ? Object.values(t.states) : null, has = st && st.length;
    const total = +t.total > 0 ? +t.total : has ? st.length : Array.isArray(t.qids) ? t.qids.length : 0;
    const graded = has ? st.filter(x => x === 'correct' || x === 'wrong').length
      : ('correct' in t || 'wrong' in t) ? Math.max(0, +t.correct || 0) + Math.max(0, +t.wrong || 0) : Math.max(0, +t.attempted || 0);
    const ungraded = has ? st.filter(x => x === 'ungraded').length : Math.max(0, +t.ungraded || 0);
    const scored = !(total > 0 && ungraded >= total), score = scored ? +t.score || 0 : 0, max = scored ? +t.max || 0 : 0;
    const right = has ? st.filter(x => x === 'correct').length : +t.correct || 0, wrong = has ? st.filter(x => x === 'wrong').length : +t.wrong || 0;
    return { graded, answered: Math.max(0, +t.attempted || 0), total, scored, score, max, pct: scored && max > 0 ? score / max : null,
      accuracy: right + wrong ? right / (right + wrong) : null, full: t.kind === 'paper' || t.kind === 'mock', negative: +t.negative || 0 };
  }
  /** D8 option 2: a test earns its XP only with at least one graded answer and 10 % of its questions answered */
  function testEarns(t) {
    const i = testInfo(t);
    return i.scored && i.graded >= 1 && i.answered > 0 && !(i.total > 0 && i.answered < XP.testMinShare * i.total);
  }
  const testXp = t => (testEarns(t) ? XP.test + XP.perMark * Math.floor(Math.max(0, +t.score || 0)) : 0);
  /** finished test records, each id once (the first record wins: P0-02's duplicates never earn twice) */
  function uniqueTests(state) {
    const seen = new Set(), out = [];
    for (const t of (state && state.tests) || []) {
      if (!t || !t.finished) continue;
      if (t.id != null) { if (seen.has(t.id)) continue; seen.add(t.id); }
      out.push(t);
    }
    return out;
  }
  /** lab challenge solves that earned XP on study day `day` (the cap of D8 counts these) */
  function labSolvesOn(state, day) {
    const log = sortedLog(state), b = U.dayBounds(day);
    let n = 0;
    for (let i = log.length - 1; i >= 0 && log[i][0] >= b[0]; i--) if (log[i][0] < b[1] && log[i][4] === 'l' && log[i][2]) n++;
    return n;
  }

  /** Every XP event, bucketed by study day. `undated` holds XP whose day is unknown (rows the store folded into logArch). */
  function ledger(state) {
    const days = {}, total = zero(), undated = zero(), dayOf = dayOfFactory();
    const add = (day, kind, n) => { if (!n) return; total[kind] += n; if (day) (days[day] = days[day] || zero())[kind] += n; else undated[kind] += n; };
    for (const id in (state && state.lessons) || {}) {
      const l = state.lessons[id];
      if (l && l.done) add(typeof l.done === 'number' ? dayOf(l.done) : null, 'lessons', XP.lesson);
    }
    const arch = archOf(state), hadOk = {};
    const archQ = {};
    for (const m in PYQ_XP_MODES) for (const id in arch[m] || {}) { const e = (archQ[id] = archQ[id] || [0, 0]); e[0] += arch[m][id][0] || 0; e[1] += arch[m][id][1] || 0; }
    for (const id in archQ) { const [n, ok] = archQ[id]; add(null, 'pyq', ok > 0 ? XP.pyqFirst + XP.pyqAgain * (ok - 1) + XP.pyqWrong * (n - ok) : XP.pyqWrong * n); if (ok > 0) hadOk[id] = 1; }
    for (const m in HINT_MODES) for (const id in arch[m] || {}) { const n = arch[m][id][0] || 0, ok = arch[m][id][1] || 0; add(null, 'pyq', XP.pyqAgain * ok + XP.pyqWrong * (n - ok)); }
    for (const id in arch.l || {}) add(null, 'labs', XP.lab * (arch.l[id][1] || 0));
    for (const r of sortedLog(state)) {
      const m = r[4] || 'p', id = r[1];
      if (PYQ_XP_MODES[m]) {
        if (!r[2]) add(dayOf(r[0]), 'pyq', XP.pyqWrong);
        else if (hinted(r)) add(dayOf(r[0]), 'pyq', XP.pyqAgain);
        else { add(dayOf(r[0]), 'pyq', hadOk[id] ? XP.pyqAgain : XP.pyqFirst); hadOk[id] = 1; }
      } else if (m === 'l' && r[2]) add(dayOf(r[0]), 'labs', XP.lab);
    }
    const act = actOf(state);
    for (const k in act) if (isKey(k) && act[k]) add(k, 'cards', XP.card * Math.min(XP.cardDayCap, Math.max(0, act[k].c | 0)));
    for (const t of uniqueTests(state)) add(dayOf(t.finished), 'tests', testXp(t));
    return { days, total, undated };
  }
  const sumKinds = o => KINDS.reduce((s, k) => s + (o[k] || 0), 0);
  function levelName(n) { for (const [from, name] of LEVEL_NAMES) if (n >= from) return name; return LEVEL_NAMES[LEVEL_NAMES.length - 1][1]; }
  function levelOf(total) {
    const n = Math.floor(total / XP.level) + 1, from = (n - 1) * XP.level, to = n * XP.level;
    return { n, from, to, pct: (total - from) / XP.level, toNext: to - total, name: levelName(n) };
  }
  function xpOf(state, today) {
    const L = ledger(state), t = dnum(today);
    let week = 0;
    for (let i = 0; i < 7; i++) { const d = L.days[dkey(t - i)]; if (d) week += sumKinds(d); }
    const total = sumKinds(L.total);
    return { total, today: L.days[today] ? sumKinds(L.days[today]) : 0, week, byKind: L.total, _ledger: L };
  }

  /* ------------------------------------------------------------------ compute */
  function compute(state, D, today) {
    today = isKey(today) ? today : U.today();
    const st = streak(state, today, D ? D.exam : undefined), x = xpOf(state, today);
    let due = { cards: 0, lessons: 0, questions: 0 };
    if (D && D.cards && D.lessons) { const d = ST.due(state, D, today); due = { cards: d.cards, lessons: d.lessons.length, questions: d.questions.length }; }
    const xp = { total: x.total, today: x.today, week: x.week, byKind: x.byKind };
    return { today, streak: st, xp, due, level: levelOf(x.total), fresh: !st.best && !x.total };
  }

  /** The XP that recording one event now would add (P2-38): call it with the state BEFORE the action is recorded. kind 'pyq' (id = question id,
      ok = right: a practice answer; opts.hint: answered after the Hint, P2-64), 'lesson' (completing lesson id), 'card' (one review), 'lab' (a
      checked challenge; opts.peek forfeits it), or 'test' (id = a stored test id: what the ledger credits that test). Same rules as ledger(), so an
      inline '+N XP' always adds up to the total. */
  function xpFor(state, kind, id, ok, opts) {
    const o = opts || {}, today = isKey(o.today) ? o.today : U.today();
    if (!state) return 0;
    if (kind === 'pyq') return ok == null ? 0 : !ok ? XP.pyqWrong : o.hint || practisedRight(state, id) ? XP.pyqAgain : XP.pyqFirst;
    if (kind === 'lesson') { const l = state.lessons && state.lessons[id]; return l && l.done ? 0 : XP.lesson; }
    if (kind === 'card') { const a = actOf(state)[today]; return Math.max(0, (a && a.c) | 0) < XP.cardDayCap ? XP.card : 0; }
    if (kind === 'lab') return ok && !o.peek && labSolvesOn(state, today) < XP.labDayCap ? XP.lab : 0;
    if (kind === 'test') { const t = uniqueTests(state).find(x => x.id === id); return t ? testXp(t) : 0; }
    return 0;
  }
  /** has this question had a right, unaided practice or revision answer (the first one earns 10, later ones 3) */
  function practisedRight(state, id) {
    const arch = archOf(state);
    for (const m in PYQ_XP_MODES) if (arch[m] && arch[m][id] && arch[m][id][1] > 0) return true;
    const log = (state && state.log) || [];
    for (let i = 0; i < log.length; i++) { const r = log[i]; if (r[1] === id && r[2] && !hinted(r) && PYQ_XP_MODES[r[4] || 'p']) return true; }
    return false;
  }

  /* ------------------------------------------------------------------ PassBook Wrapped */
  function firstDay(state) {
    let m = null;
    const take = k => { if (k && (m == null || k < m)) m = k; };
    for (const k in actOf(state)) if (isKey(k)) take(k);
    const log = (state && state.log) || [];
    if (log.length) take(U.dayOf(sortedLog(state)[0][0]));
    for (const t of (state && state.tests) || []) if (t && t.finished) take(U.dayOf(t.started || t.finished));
    for (const id in (state && state.lessons) || {}) { const l = state.lessons[id]; if (l && typeof l.first === 'number') take(U.dayOf(l.first)); }
    return m;
  }
  const isFull = t => t && (t.kind === 'mock' || t.kind === 'paper');
  /** the last full-length (else any) scored test and the stretch before it; a sitting nothing in which could be graded is 'Not scored' and never recapped */
  function lastMock(state) {
    const tests = uniqueTests(state).filter(t => testInfo(t).scored).sort((a, b) => a.finished - b.finished);
    if (!tests.length) return null;
    const pool = tests.some(isFull) ? tests.filter(isFull) : tests;
    const t = pool[pool.length - 1], prev = pool[pool.length - 2] || null;
    const first = firstDay(state);
    const to = U.dayOf(t.finished);
    let from = prev ? addDays(U.dayOf(prev.finished), 1) : (first || to);
    if (from > to) from = to;
    return { test: t, prev, from, to, full: isFull(t), pool };
  }
  /** from exam day to 30 days after (GA.stats.season 'day' or 'done', P2-72): the season, first active day → exam day */
  function seasonRange(state, today, X, first) {
    if (typeof ST.season !== 'function' || typeof ST.exam !== 'function') return null;
    const xs = X === undefined ? liveExam() : X;
    let sz, E;
    try { sz = ST.season(state, xs, today); E = ST.exam(state, xs, today); } catch (e) { return null; }
    if ((sz !== 'day' && sz !== 'done') || !E) return null;
    const on = sz === 'day' ? { date: E.date, label: E.label } : E.last;
    if (!on || !isKey(on.date)) return null;
    const label = U.cap(on.label || 'your exam');
    return { key: 'season', label: label + ' season', from: first && first < on.date ? first : on.date, to: on.date, season: sz,
      exam: { date: on.date, label, yours: !!E.set } };
  }
  /** the picker's ranges: this week (Mon-today), this month, all time, and the stretch that led up to the last mock (when there is one). From exam
      day to 30 days after, the exam season takes this week's place (P2-72). X = D.exam (the live catalogue's when left out). */
  function ranges(state, today, X) {
    today = isKey(today) ? today : U.today();
    const first = firstDay(state) || today;
    const r = [
      seasonRange(state, today, X, first) || { key: 'week', label: 'This week', from: weekStart(today), to: today },
      { key: 'month', label: 'This month', from: monthStart(today), to: today },
      { key: 'all', label: 'All time', from: first < today ? first : today, to: today }
    ];
    const m = lastMock(state);
    if (m) r.push({ key: 'mock', label: m.full ? 'Last mock' : 'Last test', from: m.from, to: m.to, test: m.test.id });
    return r;
  }
  const nodeName = (D, id) => (D && D.nodes && D.nodes[id] ? D.nodes[id].name : D && typeof D.name === 'function' ? D.name(id) : id);
  const topicSubject = (D, id) => {
    if (D && typeof D.nodeSubject === 'function') return D.nodeSubject(id);
    const s = D && (D.subjects || []).find(x => (x.topics || []).some(t => t.id === id));
    return s ? s.id : null;
  };
  const subj = (D, id) => {
    const s = D && (D.subjectById ? D.subjectById[id] : (D.subjects || []).find(x => x.id === id));
    return s ? { id, name: s.name, short: s.short || s.name } : { id, name: id, short: id };
  };

  /** Recap numbers for the inclusive day range {from, to} (default: all time up to today). Only real data; each part is null/0 when absent. */
  function wrapped(state, D, o) {
    o = o || {};
    const today = isKey(o.today) ? o.today : U.today();
    const first = firstDay(state) || today;
    const from = isKey(o.from) ? o.from : first, to = isKey(o.to) ? o.to : today;
    const fN = dnum(from), tN = dnum(to), inR = k => { if (!k) return false; const n = dnum(k); return n >= fN && n <= tN; };
    const allTime = fN <= dnum(first) && tN >= dnum(today);
    const act = actOf(state), dayOf = dayOfFactory(), X = D ? D.exam : undefined;

    // time, cards, active days, the biggest day
    let secs = 0, cards = 0, activeDays = 0, top = null;
    for (const k in act) {
      if (!isKey(k) || !inR(k)) continue;
      const a = act[k] || {};
      secs += Math.max(0, +a.s || 0); cards += Math.max(0, a.c | 0);
      if (ST.dayActive(a)) activeDays++;
      if ((+a.s || 0) > 0 && (!top || a.s > top.secs || (a.s === top.secs && k < top.day))) top = { day: k, secs: a.s, q: a.q | 0 };
    }
    // lessons finished in range
    const lessonIds = [];
    for (const id in (state && state.lessons) || {}) { const l = state.lessons[id]; if (l && typeof l.done === 'number' && inR(dayOf(l.done))) lessonIds.push(id); }
    // the answer log
    const arch = archOf(state), seen = {};
    for (const m in ARCH_ANSWER_MODES) for (const id in arch[m] || {}) seen[id] = 1;
    const pyq = { answered: 0, correct: 0, acc: null, distinct: 0, firstTry: { n: 0, ok: 0, acc: null } };
    const distinct = new Set(), bySub = {}, byTop = {}, hours = new Array(24).fill(0), lab = { n: 0, ok: 0, labs: new Set() };
    const tally = (m, k, ok, n) => { const e = (m[k] = m[k] || { n: 0, ok: 0 }); e.n += n; e.ok += ok; };
    const meta = id => (D && D.qById ? D.qById[id] : null);
    for (const r of sortedLog(state)) {
      const m = r[4] || 'p', id = r[1];
      const isFirst = ANSWER_MODES[m] && !seen[id];
      if (ANSWER_MODES[m]) seen[id] = 1;
      const day = dayOf(r[0]);
      if (!inR(day)) continue;
      if (ANSWER_MODES[m]) {
        pyq.answered++; if (r[2]) pyq.correct++; distinct.add(id);
        if (isFirst) { pyq.firstTry.n++; if (r[2]) pyq.firstTry.ok++; }
        hours[new Date(r[0]).getHours()]++;
        const q = meta(id);
        if (q && q.subject && q.subject !== '?') tally(bySub, q.subject, r[2] ? 1 : 0, 1);
        if (q && q.topic) tally(byTop, q.topic, r[2] ? 1 : 0, 1);
      } else if (LAB_MODES[m]) { lab.n++; if (r[2]) lab.ok++; lab.labs.add(String(id).replace(/^lab:/, '')); }
    }
    if (allTime) {                      // rows the store folded away are older than the log: they belong to "all time" only
      for (const m in ARCH_ANSWER_MODES) for (const id in arch[m] || {}) {
        const [n, ok] = arch[m][id]; pyq.answered += n; pyq.correct += ok; distinct.add(id);
        const q = meta(id);
        if (q && q.subject && q.subject !== '?') tally(bySub, q.subject, ok, n);
        if (q && q.topic) tally(byTop, q.topic, ok, n);
      }
      for (const m in LAB_MODES) for (const id in arch[m] || {}) { lab.n += arch[m][id][0]; lab.ok += arch[m][id][1]; lab.labs.add(String(id).replace(/^lab:/, '')); }
    }
    pyq.distinct = distinct.size;
    pyq.acc = pyq.answered ? pyq.correct / pyq.answered : null;
    pyq.firstTry.acc = pyq.firstTry.n ? pyq.firstTry.ok / pyq.firstTry.n : null;
    const rank = (m, min, dir) => Object.entries(m).filter(([, e]) => e.n >= min).map(([k, e]) => ({ id: k, n: e.n, ok: e.ok, acc: e.ok / e.n }))
      .sort((a, b) => dir * (b.acc - a.acc) || b.n - a.n || (a.id < b.id ? -1 : 1));
    const bs = rank(bySub, MIN.best, 1)[0] || null;
    const best = bs ? Object.assign(subj(D, bs.id), { n: bs.n, ok: bs.ok, acc: bs.acc }) : null;
    const ht = rank(byTop, MIN.hardest, -1).filter(x => x.acc < 1)[0] || null;
    const hardest = ht ? { id: ht.id, name: nodeName(D, ht.id), subject: topicSubject(D, ht.id), n: ht.n, ok: ht.ok, acc: ht.acc } : null;
    let peak = null; hours.forEach((n, h) => { if (n && (!peak || n > peak.n)) peak = { hour: h, n }; });
    const subjects = Object.entries(bySub).map(([k, e]) => Object.assign(subj(D, k), { n: e.n, ok: e.ok, acc: e.ok / e.n })).sort((a, b) => b.n - a.n || (a.id < b.id ? -1 : 1));

    // longest streak inside the range (frozen and exam days that really bridged a streak keep it alive; an idle today does not break it), the day series
    const st = streak(state, today, X), w = walk(state, dnum(today), dnum(today), gateNums(state, X, today)), on = new Set(activeNums(state, tN)), qByDay = {};
    for (const r of sortedLog(state)) if (ANSWER_MODES[r[4] || 'p']) { const k = dayOf(r[0]); qByDay[k] = (qByDay[k] || 0) + 1; }
    let run = 0, longest = 0;
    const series = [];
    for (let d = fN; d <= tN; d++) {
      const k = dkey(d), a = act[k];
      if (on.has(d)) { run++; if (run > longest) longest = run; }
      else if (w.valid.has(d) || w.gate.has(d) || d === dnum(today)) { /* bridged */ }
      else run = 0;
      if (tN - d < 371) series.push({ day: k, active: on.has(d), frozen: w.valid.has(d), gate: w.gate.has(d), minutes: a ? Math.round((+a.s || 0) / 60) : 0, answers: qByDay[k] || 0, future: d > dnum(today) });
    }
    // tests finished in range ('Not scored' sittings are listed, but carry no score: P0-05), read through GA.scoring.summary (P3-27)
    const tests = uniqueTests(state).filter(t => inR(dayOf(t.finished))).sort((a, b) => a.finished - b.finished)
      .map(t => { const i = testInfo(t), sc = i.scored; return { id: t.id, kind: t.kind, title: t.title, scored: sc, full: i.full, score: sc ? i.score : null, max: i.max || 0,
        pct: sc ? i.pct : null, accuracy: sc ? i.accuracy : null, at: t.finished }; });
    // XP earned in range
    const L = ledger(state);
    let xp = 0; const xpBy = zero();
    for (const k in L.days) if (inR(k)) KINDS.forEach(x => { xpBy[x] += L.days[k][x]; xp += L.days[k][x]; });
    if (allTime) KINDS.forEach(x => { xpBy[x] += L.undated[x]; xp += L.undated[x]; });

    // the recapped test, against the scored sittings of its kind before it (full-length only when it is one: P0-05, P2-34)
    let mock = null, trend = [];
    const lm = lastMock(state);
    if (lm && inR(lm.to)) {
      const i = testInfo(lm.test), ip = lm.prev ? testInfo(lm.prev) : null;
      mock = { id: lm.test.id, title: lm.test.title, kind: lm.test.kind, full: lm.full, score: i.score, max: i.max || 0, pct: i.pct,
               accuracy: i.accuracy, prevPct: ip ? ip.pct : null, delta: ip && i.pct != null && ip.pct != null ? i.pct - ip.pct : null,
               negative: i.negative, minutes: lm.test.started ? Math.round((lm.test.finished - lm.test.started) / 60000) : null };
      trend = lm.pool.map(t => { const ti = testInfo(t); return { id: t.id, title: t.title, pct: ti.pct || 0, score: ti.score, max: ti.max || 0, at: t.finished }; });
    }
    const labRuns = allTime ? Object.values((state && state.labs) || {}).reduce((s, l) => s + ((l && l.runs) | 0), 0) : null;
    const enough = activeDays >= 2 && (pyq.answered >= 10 || lessonIds.length >= 1 || cards >= 20 || tests.length >= 1);
    return {
      from, to, days: tN - fN + 1, allTime, activeDays, minutes: Math.round(secs / 60), topDay: top ? { day: top.day, minutes: Math.round(top.secs / 60), q: top.q } : null,
      lessons: lessonIds.length, lessonIds, pyq, best, hardest, subjects, peakHour: peak, series,
      streak: longest, current: { n: st.current, since: st.since, best: st.best },
      frozen: Array.from(w.valid).filter(d => d >= fN && d <= tN).sort((a, b) => a - b).map(dkey),
      gate: Array.from(w.gate).filter(d => d >= fN && d <= tN).sort((a, b) => a - b).map(dkey),
      labs: { runs: labRuns, challenges: lab.n, solved: lab.ok, distinct: lab.labs.size }, cards,
      xp, xpBy, tests, mock, trend, enough
    };
  }

  /** the story's slides for one recap, in order: the one slide model, so a teaser can draw one bar per slide (P3-05) and wrapped.js builds the same list */
  function slideKeys(w) {
    if (!w || !w.enough) return [];
    const k = ['intro'];
    if (w.minutes > 0) k.push('time');
    if (w.pyq.answered > 0) k.push('pyq');
    if (w.best || w.hardest) k.push('subjects');
    if (w.lessons || w.labs.solved || w.labs.runs || w.cards) k.push('learn');
    if (w.streak || w.xp) k.push('streak');
    if (w.mock) k.push('mock');
    k.push('summary');
    return k;
  }
  /** what a recap still needs (P2-36): active days still to come and how far the work is from the bar (10 question answers, a lesson, 20 card reviews or
      a test) */
  function gapOf(w) {
    const days = Math.max(0, 2 - ((w && w.activeDays) | 0));
    const work = !!w && (w.pyq.answered >= 10 || w.lessons >= 1 || w.cards >= 20 || w.tests.length >= 1);
    return { days, work, pyq: w ? Math.max(0, 10 - w.pyq.answered) : 10, cards: w ? Math.max(0, 20 - w.cards) : 20, ready: !days && work };
  }

  /** The single Wrapped gate (P2-36): the headline recap, this month when it has a story, else all time; in the weeks after the exam ('done'), the
      season first (P2-72). null while there is not enough data. opts.range asks for one range ('mock': the run-up to the last mock, P2-69).
      With no state it reads the live store (memoised like current()). → {range, href, w, slides: n, keys} | null */
  function recap(state, D, today, opts) {
    if (state == null) return memoLive('recap:' + ((opts && opts.range) || ''), L => recap(L.S.state, L.D, L.today, opts));
    today = isKey(today) ? today : U.today();
    const R = ranges(state, today, D ? D.exam : undefined), want = opts && opts.range;
    const order = want ? [want] : R.some(r => r.key === 'season' && r.season === 'done') ? ['season', 'month', 'all'] : ['month', 'all'];
    for (const key of order) {
      const r = R.find(x => x.key === key); if (!r) continue;
      const w = wrapped(state, D, Object.assign({ today }, r));
      if (w.enough) { const keys = slideKeys(w); return { range: r, href: '#/wrapped?range=' + r.key, w, slides: keys.length, keys }; }
    }
    return null;
  }

  /* ------------------------------------------------------------------ milestones (P2-38): a level reached, a freeze earned, a run that ended */
  const ZERO_MARKS = { level: 1, freeze: 0, run: null };
  const MK = { level: 'ms:level', freeze: 'ms:freeze', run: 'ms:run', on: 'ms:v' };
  function levelNews(c) { const l = c.level; return `Level ${l.n} reached · ${l.name}. ${U.nf(l.toNext)} XP to level ${l.n + 1}.`; }
  function freezeNews(c) {
    const f = c.streak.freezes;
    return `Streak freeze earned for ${FREEZE.every} active days in a row. You hold ${f}${f >= FREEZE.cap ? ', the most you can' : ''}; each one covers a missed day.`;
  }
  function runNews(rm, c) {
    const best = c.streak.best;
    return `Your ${U.nf(rm.n)}-day streak ran until ${U.fmtDay(rm.last, { day: 'numeric', month: 'short' })}.` + (rm.n >= best ? ' It is still your best.' : ` Your best is ${U.plural(best, 'day')}.`);
  }
  /** What the learner has not heard about yet, against the marks in state.seen ('ms:level', 'ms:freeze', 'ms:run'; a missing mark counts as base's
      value, default the zero state): {news: [{kind: 'level' | 'freeze' | 'run', text, set: {mark: value}}] (most important first), quiet: {mark:
      value} (updates that announce nothing: a run that grew, a smaller number after an import)}. A run's end is news only from RUN_NEWS days. */
  function milestones(state, D, today, base, cNow) {
    today = isKey(today) ? today : U.today();
    const c = cNow || compute(state, D, today), seen = (state && state.seen) || {}, b = base || ZERO_MARKS, news = [], quiet = {};
    const mark = k => (seen[MK[k]] !== undefined ? seen[MK[k]] : b[k]);
    const lv = c.level.n, lm = mark('level');
    if (typeof lm !== 'number' || lv < lm) quiet[MK.level] = lv;
    else if (lv > lm) news.push({ kind: 'level', text: levelNews(c), set: { [MK.level]: lv } });
    const fe = c.streak.earned, fm = mark('freeze');
    if (typeof fm !== 'number' || fe < fm) quiet[MK.freeze] = fe;
    else if (fe > fm) news.push({ kind: 'freeze', text: freezeNews(c), set: { [MK.freeze]: fe } });
    const rm = mark('run'), cur = c.streak.current ? { since: c.streak.since, n: c.streak.current, last: c.streak.last } : null;
    const okRun = rm && typeof rm === 'object' && isKey(rm.since) && isKey(rm.last) && rm.n > 0;
    if (okRun && (!cur || cur.since !== rm.since)) {                       // the marked run is over
      if (rm.n >= RUN_NEWS) news.push({ kind: 'run', text: runNews(rm, c), set: { [MK.run]: cur } });
      else quiet[MK.run] = cur;
    } else if (cur && (!okRun || rm.n !== cur.n || rm.last !== cur.last)) quiet[MK.run] = cur;   // the same run grew (or a first run began)
    else if (!cur && rm != null && !okRun) quiet[MK.run] = null;          // an unreadable mark
    return { news, quiet };
  }
  /** the marks a learner starts from when this feature first sees their profile: what they already have (nothing old is announced) */
  function baseline(state, D, today, cNow) {
    const c = cNow || compute(state, D, today);
    return { [MK.level]: c.level.n, [MK.freeze]: c.streak.earned, [MK.run]: c.streak.current ? { since: c.streak.since, n: c.streak.current, last: c.streak.last } : null, [MK.on]: 1 };
  }

  /* ------------------------------------------------------------------ the Me header (P2-38, P2-49, P2-75) */
  /** 'Not backed up yet · 23 active days · Export' after 7 active days without a backup (3 in iOS Safari when the app is not installed), counted
      since the last backup ('Last backup 12 Oct · 9 active days since · Export'); null otherwise and on the demo profile. env = {ios, standalone, demo} */
  function backupNudge(state, today, env) {
    env = env || {};
    if (env.demo) return null;
    today = isKey(today) ? today : U.today();
    const p = (state && state.profile) || {}, last = typeof p.lastExport === 'number' && isFinite(p.lastExport) ? p.lastExport : null;
    const since = last ? U.dayOf(last) : null, act = actOf(state);
    let n = 0;
    for (const k in act) if (isKey(k) && k <= today && ST.dayActive(act[k]) && (!since || k > since)) n++;
    if (n < (env.ios && !env.standalone ? 3 : 7)) return null;
    const lead = last ? `Last backup ${U.fmtDay(since, { day: 'numeric', month: 'short' })} · ${U.plural(n, 'active day')} since` : `Not backed up yet · ${U.plural(n, 'active day')}`;
    return { kind: 'backup', text: lead + ' · Export', lead, act: 'Export', action: 'export', days: n, last };
  }
  /** the Me sheet's status lines, in order: [{kind, text, href?, action?, lead?, act?}]. 'Level 7 · Working notes · 148 XP to level 8' and '23-day
      streak · 2 freezes saved' for a profile with XP; the backup nudge; on a hosted copy (env.web) with nothing done yet, the line for a learner
      moving devices. A line with an action splits into lead + act, so the shell can draw act as the link or button ('Export' runs
      GA.shell.exportBackup; href '#/settings' for the import). */
  function meLinesOf(state, D, today, env) {
    env = env || {};
    const c = compute(state, D, today), out = [];
    if (c.xp.total > 0) {
      const l = c.level;
      out.push({ kind: 'level', text: `Level ${l.n} · ${l.name} · ${U.nf(l.toNext)} XP to level ${l.n + 1}`, href: '#/progress' });
      if (c.streak.current > 0) out.push({ kind: 'streak', text: `${U.nf(c.streak.current)}-day streak` + (c.streak.freezes ? ` · ${U.plural(c.streak.freezes, 'freeze')} saved` : '') });
    }
    const b = backupNudge(state, today, env); if (b) out.push(b);
    const started = typeof ST.hasProgress === 'function' ? ST.hasProgress(state) : !c.fresh;
    if (env.web && !env.demo && !started) {
      const lead = 'Progress is saved in this browser · Studied on another device?';
      out.push({ kind: 'import', text: lead + ' Import your backup', lead, act: 'Import your backup', href: '#/settings' });
    }
    return out;
  }

  /* ------------------------------------------------------------------ the live store: results memoised until the store changes or the day rolls over */
  let ver = 0, hookedStore = null;
  const memos = {};
  const QUIET = { at: 1, note: 1, bm: 1, flag: 1, plan: 1, seen: 1 };       // changes that move no streak, XP, due count or recap
  function memoLive(slot, fn) {
    const S = GA.store; if (!S || !S.state) return null;
    if (hookedStore !== S && S.on) { hookedStore = S; S.on('change', tag => { if (!QUIET[tag]) ver++; }); }
    const D = GA.data && GA.data.D, today = U.today(), k = today + '|' + ver + '|' + (D ? 1 : 0), m = memos[slot];
    if (!m || m.k !== k || m.state !== S.state) memos[slot] = { k, state: S.state, v: fn({ S, D, today }) };
    return memos[slot].v;
  }

  const E = { XP, FREEZE, MIN, LEVEL_NAMES, compute, recap, xpFor, streak, tick, freezePlan, ledger, levelOf, levelName, wrapped, ranges, lastMock, firstDay,
              labSolvesOn, testInfo, testEarns, slideKeys, gapOf, gateExams, gateDays, gateLine, milestones, baseline, backupNudge, meLinesOf,
              day: D_, _walk: walk };
  /** compute() for the live store, memoised until the store changes or the day rolls over: {streak, xp, due, level, fresh} (the chips, the Me header) */
  E.current = () => memoLive('current', L => compute(L.S.state, L.D, L.today));

  /* ------------------------------------------------------------------ browser: device facts, Me lines, milestone toasts, the top-nav chips */
  if (typeof document !== 'undefined') {
    /** what the Me lines depend on outside the state: a hosted copy, iOS Safari, an installed app, the demo profile */
    function env() {
      const N = typeof navigator !== 'undefined' ? navigator : {}, ua = String(N.userAgent || '');
      const ios = (/iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && N.maxTouchPoints > 1)) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
      const standalone = !!(N.standalone || (typeof matchMedia === 'function' && matchMedia('(display-mode: standalone)').matches));
      return { web: /^https?:$/.test(location.protocol), ios, standalone, demo: !!(GA.store && GA.store.profile === 'demo') };
    }
    E.env = env;
    /** the Me header's lines for the live store (WP1 renders them). While a level line is shown there, the phone bar drops its 'Lv' chip (P2-38). */
    E.meLines = function () {
      const lines = memoLive('me', L => meLinesOf(L.S.state, L.D, L.today, env())) || [];
      document.documentElement.toggleAttribute('data-eg-me', lines.some(l => l.kind === 'level'));
      gateMenu();
      return lines;
    };
    /** P2-36: the one Wrapped gate (recap()) also covers the shell's static Me-menu item. With no recap yet the root carries data-eg-norecap and
        engage.css hides that item, as every other Wrapped link waits; /wrapped itself stays reachable with its honest empty state. The attribute
        only ever hides, so without this file the item simply shows. Run on every chips paint and whenever the Me menu paints its lines. */
    function gateMenu() {
      if (!GA.store || !GA.store.state) return;
      document.documentElement.toggleAttribute('data-eg-norecap', !E.recap());
    }
    E.gateMenu = gateMenu;

    /* milestone toasts: at most one toast a session (the boot's freeze notice counts), with Tick's 28 px head, never in exam mode. What cannot be said
       now waits in the marks for the next boot. */
    let said = false, zeroBase = false;
    const inExam = () => !!(document.body && document.body.classList.contains('in-exam'));
    const setMarks = patch => { if (GA.actions && typeof GA.actions.setFlags === 'function') GA.actions.setFlags(patch); };
    function say(text, peak) { if (!GA.ui || typeof GA.ui.toast !== 'function') return false; GA.ui.toast(text, 'ok', peak ? { peak: true } : undefined); said = true; return true; }
    /** the marks' base for this profile: the zero state for a learner this feature saw start, else their current numbers (written once, quietly).
        true when the marks can be compared now. */
    function ensureBase(S, D, today, c) {
      const s = S.state;
      if (s.seen && s.seen[MK.on]) return true;
      if (c.fresh) { zeroBase = true; return false; }
      if (zeroBase) { setMarks({ [MK.on]: 1 }); return true; }
      setMarks(baseline(s, D, today, c));
      return false;
    }
    function check(S, kinds) {
      const D = GA.data && GA.data.D, today = U.today(), c = E.current();
      if (!c || !ensureBase(S, D, today, c)) return;
      const ms = milestones(S.state, D, today, null, c);
      if (Object.keys(ms.quiet).length) setMarks(ms.quiet);
      // level-ups are never announced (2026-10-18 theme: no XP or levels on screen); freezes and streak runs still are
      const n = ms.news.find(x => x.kind !== 'level' && (!kinds || kinds.indexOf(x.kind) >= 0));
      if (!n || said || inExam()) return;
      if (say(n.text, true)) setMarks(n.set);
    }
    /** at boot, after the freeze tick (actions.engageTick): freezes used are the boot's one toast; else the most important milestone. A boot that had
        to repair saved data, or cannot save, says nothing more. */
    E.boot = function (used) {
      const S = GA.store; if (!S || !S.state) return;
      if (S.issue || S.saveError) said = true;
      if (used && used.length) {
        const today = U.today();
        const when = used.length === 1 && used[0] === U.addDays(today, -1) ? 'yesterday' : used.map(k => U.fmtDay(k, { weekday: 'short', day: 'numeric', month: 'short' })).join(' and ');
        said = true;
        setTimeout(() => { if (GA.ui && GA.ui.toast) GA.ui.toast(`Streak saved: ${used.length === 1 ? 'a freeze' : used.length + ' freezes'} covered ${when}.`, 'ok'); }, 1200);
      }
      setTimeout(() => { try { check(S); } catch (e) { console.error(e); } }, 1300);
    };
    /** in a session: the moment an action reaches a new level or earns a freeze (a run's end is only news at boot) */
    E.watch = function (S) {
      if (!S || !S.on || E._watching === S) return;
      E._watching = S;
      E.current();                                  // the memo's own change hook goes first, so check() reads fresh numbers
      let timeAt = 0;
      S.on('change', tag => {
        if (QUIET[tag] || tag === 'eng' || tag === 'demo') return;
        if (tag === 'import' || tag === 'reset') { zeroBase = false; return; }
        if (tag === 'time') { if (Date.now() - timeAt < 60000) return; timeAt = Date.now(); }   // time on task can make today count: once a minute
        try { check(S, ['level', 'freeze']); } catch (e) { console.error(e); }
      });
    };

    let prev = null;
    const esc = s => U.esc(s), nf = n => U.nf(n);
    const ICON = {
      flame: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.5c-4 0-6.5-2.7-6.5-6.3 0-3.7 3-5.6 3.5-9.7 2.6 1.5 4 3.6 4 6 1-.6 1.6-1.8 1.7-3 2 1.6 3.8 4 3.8 6.8 0 3.6-2.5 6.2-6.5 6.2z"/></svg>',
      snow: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5v19M4 7l16 10M20 7 4 17M9.5 4 12 6.5 14.5 4M9.5 20l2.5-2.5 2.5 2.5"/></svg>',
      bolt: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/></svg>',
      cards: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 7V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg>',
      check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
      cal: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>'
    };
    E.icons = ICON;
    const days = n => (n === 1 ? '1 day' : nf(n) + ' days');
    function streakChip(c, bump, gline) {
      const s = c.streak, fz = s.freezes;
      const status = s.activeToday ? `${ICON.check}<span>Today counts. Come back tomorrow to make it ${days(s.current + 1)}.</span>`
        : gateSafe(gline) ? `${ICON.check}<span>${esc(gline)}</span>`
        : `<span>Not yet today: answer a question, review cards or study 10 minutes to keep it.</span>`;
      const next = s.nextFreezeIn == null ? `You hold the most freezes you can (${s.cap}).` : `Next freeze in ${days(s.nextFreezeIn).replace('day', 'active day')}.`;
      const label = `Streak: ${days(s.current)}${s.activeToday || gline ? '' : ', not yet active today'}. ${fz ? fz + ' streak freeze' + (fz > 1 ? 's' : '') + ' saved.' : 'No streak freezes saved.'}${gline ? ' ' + gline : ''}`;
      return `<span class="eg-chip-w"><button class="eg-chip eg-streak${s.activeToday ? '' : ' idle'}${bump ? ' bump' : ''}" type="button" data-eg="streak" aria-expanded="false" aria-label="${esc(label)}" aria-describedby="eg-tip-streak">` +
        `${ICON.flame}<b class="num">${nf(s.current)}</b><span class="eg-u">${s.current === 1 ? 'day' : 'days'}</span>${fz ? `<span class="eg-fz" aria-hidden="true">${ICON.snow}${fz}</span>` : ''}</button>` +
        `<span class="eg-tip" role="tooltip" id="eg-tip-streak"><b class="eg-tt">${nf(s.current)}-day streak</b><span class="eg-tl">Best: ${days(s.best)}${s.since ? ` · since ${esc(U.fmtDay(s.since, { day: 'numeric', month: 'short' }))}` : ''}</span>` +
        `<span class="eg-tl eg-st">${status}</span>` +
        (gline && !gateSafe(gline) ? `<span class="eg-tl">${ICON.cal}<span>${esc(gline)}</span></span>` : '') +
        `<span class="eg-tl eg-fzl">${ICON.snow}<span><b>${fz} freeze${fz === 1 ? '' : 's'} saved.</b> A freeze covers one missed day. You earn one every ${s.every} active days in a row. ${next}</span></span>` +
        (s.frozen.length ? `<span class="eg-tl muted">Saved by a freeze: ${s.frozen.slice(-3).map(k => esc(U.fmtDay(k, { day: 'numeric', month: 'short' }))).join(', ')}</span>` : '') +
        (s.gate.length ? `<span class="eg-tl muted">Kept by exam days: ${s.gate.slice(-2).map(k => esc(U.fmtDay(k, { day: 'numeric', month: 'short' }))).join(', ')}</span>` : '') +
        `</span></span>`;
    }
    function xpChip(c, bump) {
      const x = c.xp, l = c.level, pct = Math.round(l.pct * 100), rc = E.recap();   // the Wrapped link only once there is a recap (P2-36)
      // the name starts with the chip's visible text ('Lv 7', '3,340 XP'), so voice control can say what it sees (P3-06)
      const label = `Lv ${l.n}, ${nf(x.total)} XP: level ${l.n}, ${l.name}. ${nf(l.toNext)} XP to level ${l.n + 1}.`;
      const row = (k, n) => `<span class="eg-xr"><span>${k}</span><b class="num">${nf(n)}</b></span>`;
      return `<span class="eg-chip-w"><button class="eg-chip eg-xp${bump ? ' bump' : ''}" type="button" data-eg="xp" aria-expanded="false" aria-label="${esc(label)}" aria-describedby="eg-tip-xp">` +
        `${ICON.bolt}<span class="eg-lv">Lv <b class="num">${l.n}</b></span><span class="eg-xpn num">${nf(x.total)} XP</span></button>` +
        `<span class="eg-tip" role="tooltip" id="eg-tip-xp"><b class="eg-tt">Level ${l.n} · ${esc(l.name)} · ${nf(x.total)} XP</b>` +
        `<span class="eg-meter" aria-hidden="true"><i style="width:${pct}%"></i></span><span class="eg-tl muted">${nf(l.toNext)} XP to level ${l.n + 1}</span>` +
        `<span class="eg-xrs">${row('Today', x.today)}${row('Last 7 days', x.week)}</span>` +
        `<span class="eg-tl muted">${(GA.ui && GA.ui.bankIsEmpty && GA.ui.bankIsEmpty()) ? 'Lesson 50 · card 1 (up to 60 a day) · lab challenge 15 (up to 10 a day)' : 'Lesson 50 · first right question 10, again 3, a miss 1 · card 1 (up to 60 a day) · lab challenge 15 (up to 10 a day) · test 100 + marks'}</span>` +
        (rc ? `<a class="eg-tl eg-link" href="${esc(rc.href)}">See your PassBook Wrapped →</a>` : '') + `</span></span>`;
    }
    function dueChip(c, bump) {
      const n = c.due.cards;
      return `<a class="eg-chip eg-due${bump ? ' bump' : ''}" href="#/flash" aria-label="Flashcards: ${nf(n)} due for review" title="${nf(n)} flashcard${n === 1 ? '' : 's'} due today">${ICON.cards}<b class="num">${n > 999 ? '999+' : nf(n)}</b><span class="eg-u">due</span></a>`;
    }
    function closeTips(except) { document.querySelectorAll('.eg-chip[aria-expanded="true"]').forEach(b => { if (b !== except) { b.setAttribute('aria-expanded', 'false'); b.parentElement.classList.remove('open'); } }); }
    let docHooked = false;
    function hookDoc() {
      if (docHooked) return; docHooked = true;
      document.addEventListener('click', e => {
        const b = e.target.closest && e.target.closest('.eg-chip[data-eg]');
        if (b) { const o = b.getAttribute('aria-expanded') !== 'true'; closeTips(b); b.setAttribute('aria-expanded', String(o)); b.parentElement.classList.toggle('open', o); return; }
        if (!(e.target.closest && e.target.closest('.eg-tip'))) closeTips();
        else if (e.target.closest('a')) closeTips();
      });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.eg-chip[aria-expanded="true"]')) { const b = document.querySelector('.eg-chip[aria-expanded="true"]'); closeTips(); b.focus(); } });
      addEventListener('hashchange', () => closeTips());
    }
    /** Fill the shell's chips slot: streak, XP and cards due. Each chip hides when it would show zero, so a fresh profile sees nothing. */
    E.renderChips = function (el) {
      if (!el) return;
      const c = E.current();
      el.classList.add('eg-chips');
      if (!c) { el.innerHTML = ''; el.hidden = true; return; }
      hookDoc(); gateMenu();
      const gline = memoLive('gate', L => gateLine(L.S.state, L.D ? L.D.exam : undefined, L.today)) || '';
      const open = el.querySelector('.eg-chip[aria-expanded="true"]'), openKey = open && open.dataset.eg;
      const was = prev; prev = { s: c.streak.current, x: c.xp.total, d: c.due.cards };
      const up = (k, v) => was && v > was[k];
      const parts = [];
      if (c.streak.current > 0) parts.push(streakChip(c, up('s', c.streak.current), gline));
      if (c.xp.total > 0) parts.push(xpChip(c, up('x', c.xp.total)));
      if (c.due.cards > 0) parts.push(dueChip(c, false));
      el.innerHTML = parts.join('');
      el.hidden = !parts.length;
      el.setAttribute('aria-label', 'Your streak, XP and cards due');
      if (openKey) { const b = el.querySelector(`.eg-chip[data-eg="${openKey}"]`); if (b) { b.setAttribute('aria-expanded', 'true'); b.parentElement.classList.add('open'); } }
    };
  }

  GA.engage = E;
  if (typeof module !== 'undefined' && module.exports) module.exports = E;
})(typeof window !== 'undefined' ? window : globalThis);
