/* PassBook — everything that changes learner state goes through here, so the dashboard has a single, testable source of truth.
   Other modules are read at call time (GA.stats, GA.engage, GA.data load after this file), so every new contract API degrades to today's behaviour. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');
  const Store = GA.store || require('./store.js');
  const SRS = GA.srs || require('./srs.js');
  const DAYKEY = /^\d{4}-\d{2}-\d{2}$/;
  const LAB_DAY_CAP = 10;                       // D8: lab challenge XP for at most 10 solves a day (mirrors GA.engage.XP.labDayCap)

  const day = () => U.today();
  const actDay = (s, d) => (s.act[d || day()] = s.act[d || day()] || { s: 0, q: 0, c: 0, l: 0 });
  const newQ = () => ({ n: 0, ok: 0, last: 0, lastOk: null, firstOk: null, ms: null, streak: 0, bm: 0 });
  const qOf = (s, qid) => (s.q[qid] = s.q[qid] || newQ());
  const newLesson = () => ({ first: Date.now(), last: Date.now(), done: null, secs: 0, visits: 1, quiz: {} });
  const okId = id => typeof id === 'string' && id.trim() !== '' && !/^(undefined|null|NaN)$/.test(id);

  /* ---------------- the review cap (P0-26) ----------------
     The days left come from the shared exam date (GA.stats.exam, P1-46; until it exists, the stored profile date). SRS.capFor is the one cap rule:
     none when no exam is ahead or with one day or less left (natural spacing after GATE, on purpose), else max(1, floor(days / 2)). */
  function daysLeft(s, today) {
    const ST = GA.stats, D = GA.data && GA.data.D;
    if (ST && typeof ST.exam === 'function') { try { const E = ST.exam(s, D && D.exam, today); return E && typeof E.daysLeft === 'number' ? E.daysLeft : null; } catch (e) { /* fall through */ } }
    const d = s.profile && s.profile.examDate;
    return typeof d === 'string' && DAYKEY.test(d) ? U.daysBetween(today, d) : null;
  }
  function capFor(n) {
    if (typeof SRS.capFor === 'function') return SRS.capFor(n);
    return n == null || n <= 1 ? null : Math.max(1, Math.floor(n / 2));
  }
  /** SRS options for a review today: {cap} (§10.5; srs.js has read it since wave 1, so the old {maxIvl} name is no longer passed); {} = no cap */
  function srsOpts(s, today) { const c = capFor(daysLeft(s, today)); return c == null ? {} : { cap: c }; }

  /* ---------------- the one note per question (P1-27): q[id].note, which the card, the notebook and the bank all read */
  function writeNote(s, qid, text) {
    const t = typeof text === 'string' ? text.replace(/\s+$/, '') : '';
    if (t.trim()) qOf(s, qid).note = t;
    else if (s.q[qid]) delete s.q[qid].note;
  }

  /* ---------------- the notebook's spacing (P2-41, D8) ----------------
     A miss stamps nb.missed; a right answer resolves an open entry only when it comes RESOLVE_GAP or more study days after the last miss, so two
     right answers minutes after a miss no longer close it. GA.stats.resolvesMiss is the one rule (stats.js loads after this file); until it is
     there, the same rule runs here: the last miss is nb.missed, else the newest wrong row of the log, else the entry's first miss. */
  const RESOLVE_GAP = 3;                        // mirrors GA.stats.RETRY.resolve
  const stamp = t => typeof t === 'number' && isFinite(t) && t > 0;
  function resolvesMiss(s, qid, now) {
    const ST = GA.stats;
    if (ST && typeof ST.resolvesMiss === 'function') { try { return !!ST.resolvesMiss(s, qid, now); } catch (e) { /* fall through */ } }
    const n = s.nb[qid];
    if (!n || n.resolved) return false;
    let t = stamp(n.missed) ? n.missed : null;
    for (let i = s.log.length - 1; t == null && i >= 0; i--) { const r = s.log[i]; if (r[1] === qid && r[2] === 0 && stamp(r[0])) t = r[0]; }
    if (t == null && stamp(n.added)) t = n.added;
    return t == null || U.daysBetween(U.dayOf(t), U.dayOf(now)) >= RESOLVE_GAP;
  }

  /** lab challenge solves that earned XP today ('l' rows with ok); the log is chronological, so read back until the day changes */
  function labSolvesToday(s, today) {
    const E = GA.engage;
    if (E && typeof E.labSolvesOn === 'function') return E.labSolvesOn(s, today);
    const b = U.dayBounds(today);
    let n = 0;
    for (let i = s.log.length - 1; i >= 0 && s.log[i][0] >= b[0]; i--) { const r = s.log[i]; if (r[0] < b[1] && r[4] === 'l' && r[2]) n++; }
    return n;
  }

  const A = {
    /* ---------------- lessons ---------------- */
    visitLesson(id) {
      Store.update(s => {
        const l = (s.lessons[id] = s.lessons[id] || { first: Date.now(), last: 0, done: null, secs: 0, visits: 0, quiz: {} });
        l.last = Date.now(); l.visits++;
      }, 'lesson');
    },
    setLessonDone(id, done) {
      Store.update(s => {
        const l = (s.lessons[id] = s.lessons[id] || newLesson());
        const was = !!l.done;
        l.done = done ? Date.now() : null;
        if (done && !was) actDay(s).l++;
        if (!done && was) actDay(s).l = Math.max(0, actDay(s).l - 1);
      }, 'lesson');
    },
    /** the section the reader is in (P1-01): lessons[id].at = {h, t}; h = the current heading's id (null clears it). The lesson view calls it when the
        heading changes, never in the first 20 s of a visit, so a peek saves no position. */
    setLessonAt(id, h) {
      if (!okId(id)) return;
      Store.update(s => {
        const l = (s.lessons[id] = s.lessons[id] || newLesson());
        if (h == null || String(h).trim() === '') delete l.at; else l.at = { h: String(h), t: Date.now() };
      }, 'at');
    },
    recordLessonQuiz(lessonId, k, ok) {
      Store.update(s => {
        const l = (s.lessons[lessonId] = s.lessons[lessonId] || newLesson());
        const e = (l.quiz[k] = l.quiz[k] || { n: 0, ok: 0, last: 0 });
        e.n++; if (ok) e.ok++; e.last = Date.now();
        s.log.push([Date.now(), lessonId + '#' + k, ok ? 1 : 0, null, 'z']);
        actDay(s).q++;
      }, 'quiz');
    },

    /* ---------------- questions ---------------- */
    /** One answered question (practice, revision or test). q = {id, marks, type}; ok = true/false (null if ungraded: use setSeen instead).
        opts.hint: the learner opened the Hint first (P2-64): the log row carries 'h', so a right answer earns the later-correct XP. */
    attempt(q, resp, ok, ms, mode, opts) {
      if (ok == null || !q || !okId(q.id)) return;
      const hint = !!(opts && opts.hint) && (mode || 'p') !== 't';
      /* an ICAI descriptive item is self-graded (docs/ICAI_BANK.md §6): opts.grade 'got' (ok), 'partly' or 'missed' (both misses: the notebook
         and the review schedule bring them back; Partly reviews as SM-2 'hard', Missed as 'again'); opts.mine = the learner's own answer text */
      const grade = opts && (opts.grade === 'got' || opts.grade === 'partly' || opts.grade === 'missed') ? opts.grade : null;
      Store.update(s => {
        const now = Date.now(), today = day();
        const e = qOf(s, q.id);
        e.n++; if (ok) e.ok++;
        if (e.firstOk == null) e.firstOk = ok ? 1 : 0;
        e.lastOk = ok ? 1 : 0; e.last = now;
        if (grade) e.g = grade; else delete e.g;
        if (opts && typeof opts.mine === 'string') { const t = opts.mine.replace(/\s+$/, '').slice(0, 4000); if (t.trim()) e.mine = t; }
        e.streak = ok ? (e.streak || 0) + 1 : 0;
        if (ms != null) e.ms = e.ms == null ? ms : Math.round(0.6 * e.ms + 0.4 * ms);
        const g = grade === 'missed' ? 0 : grade === 'partly' ? 1 : SRS.gradeFromAttempt(ok, ms, q.marks, !!(q.icai || q.label));
        e.srs = SRS.review(e.srs || SRS.fresh(today), g, today, srsOpts(s, today));
        const row = [now, q.id, ok ? 1 : 0, ms == null ? null : Math.round(ms), mode || 'p'];
        if (hint) row.push('h');
        else if (grade === 'partly') row.push('pt');
        s.log.push(row);
        actDay(s).q++;
        // error notebook (P2-41, D8): a miss opens (or re-opens) an entry and stamps when; a right answer 3 or more days after the last miss closes it
        if (!ok) {
          const n = s.nb[q.id];
          if (!n) s.nb[q.id] = { reason: null, added: now, resolved: null, misses: 1, missed: now };
          else { n.resolved = null; n.misses = (n.misses || 0) + 1; n.missed = now; }
        } else if (s.nb[q.id] && !s.nb[q.id].resolved && resolvesMiss(s, q.id, now)) s.nb[q.id].resolved = now;
      }, 'attempt');
    },
    /** a checked answer that cannot be graded (no official key: the 2007–2010 papers, D9 / P1-23): q[id].seen = now. Never touches n, ok, the
        schedule, the notebook, the day's activity or XP; the palette, set counts and the bank dot read e.n || e.seen as 'seen'. */
    setSeen(qid) {
      if (!okId(qid)) return;
      Store.update(s => { qOf(s, qid).seen = Date.now(); }, 'seen');
    },
    /** bookmark a question (D5: 'Bookmark' outside the runner); returns how many questions are bookmarked now (the toast's 'Bookmarked · N', P2-65) */
    setBookmark(qid, on) {
      if (!okId(qid)) return null;
      Store.update(s => { qOf(s, qid).bm = on ? 1 : 0; }, 'bm');
      const q = Store.state.q;
      let n = 0; for (const k in q) if (q[k] && q[k].bm) n++;
      return n;
    },
    /** the learner's own answer to an ICAI descriptive item (q[id].mine, at most 4,000 characters, this device only); blank deletes it */
    setMine(qid, text) {
      if (!okId(qid)) return;
      const t = typeof text === 'string' ? text.replace(/\s+$/, '').slice(0, 4000) : '';
      Store.update(s => { if (t.trim()) qOf(s, qid).mine = t; else if (s.q[qid]) delete s.q[qid].mine; }, 'mine');
    },
    /** the one note per question (P1-27): empty or blank text deletes it */
    setNote(qid, text) { if (!okId(qid)) return; Store.update(s => writeNote(s, qid, text), 'note'); },

    /* ---------------- error notebook ---------------- */
    /** patch a notebook entry (reason, resolved, …); a `note` in the patch goes to the one note store (setNote) */
    notebookSet(qid, patch) {
      if (!okId(qid)) return;
      const p = Object.assign({}, patch || {});
      const hasNote = Object.prototype.hasOwnProperty.call(p, 'note'), note = p.note;
      delete p.note;
      Store.update(s => {
        const n = (s.nb[qid] = s.nb[qid] || { reason: null, added: Date.now(), resolved: null, misses: 0 });
        Object.assign(n, p);
        if (hasNote) writeNote(s, qid, note);
      }, hasNote && Object.keys(p).length === 0 ? 'note' : 'nb');
    },
    notebookRemove(qid) { Store.update(s => { delete s.nb[qid]; }, 'nb'); },

    /* ---------------- flashcards ---------------- */
    /** grade one card (0 Again … 3 Easy). Ignores an unknown card id (P0-02: a finished session must not log phantom reviews) and returns null then. */
    reviewCard(cardId, grade) {
      if (!okId(cardId) || /^\d+$/.test(cardId) || !(grade === 0 || grade === 1 || grade === 2 || grade === 3)) return null;
      const D = GA.data && GA.data.D;
      if (D && Array.isArray(D.cards) && D.cards.length) {
        const ix = D._cardIds || (D._cardIds = new Set(D.cards.map(c => c.id)));
        if (!ix.has(cardId)) return null;
      }
      Store.update(s => {
        const today = day(), prev = s.cards[cardId];
        s.cards[cardId] = SRS.review(prev || SRS.fresh(today), grade, today, srsOpts(s, today));
        actDay(s).c++;
      }, 'card');
      return Store.state.cards[cardId];
    },

    /* ---------------- tests ---------------- */
    /** t: {id, kind, title, started, finished, limitMs, qids, responses, times, score, max, correct, wrong, skipped, negative, attempted, bySubject, bySection}
        A test id that is already stored is ignored (P0-02: a re-entrant Submit or time-up while Submit is open). Returns true when it was stored. */
    finishTest(t, questions) {
      if (!t || typeof t !== 'object' || t.id == null) return false;
      if ((Store.state.tests || []).some(x => x && x.id === t.id)) return false;
      Store.update(s => { s.tests.push(t); }, 'test');
      // record each graded answer as an attempt (mode 't')
      const SC = GA.scoring || require('./scoring.js');
      (questions || []).forEach(q => {
        if (!q) return;
        const r = t.responses && t.responses[q.id];
        const st = t.states && t.states[q.id];
        if (st === 'excess') return;                         // an ICAI choice the sitting did not count
        const m = SC.mark(q, r);
        // an ICAI descriptive item marked in the sitting: full marks Got it, some Partly, none Missed (docs/ICAI_BANK.md §7)
        if (q.type === 'DESC') {
          if (m.state === 'correct' || m.state === 'partial' || m.state === 'wrong') {
            const g = m.state === 'correct' ? 'got' : m.state === 'partial' ? 'partly' : 'missed';
            A.attempt(q, r, g === 'got', t.times && t.times[q.id], 't', { grade: g, mine: r && typeof r.t === 'string' ? r.t : undefined });
          }
          return;
        }
        if (m.state === 'correct' || m.state === 'wrong') A.attempt(q, r, m.state === 'correct', t.times && t.times[q.id], 't');
      });
      return true;
    },

    /** an ICAI sitting's self-marking (docs/ICAI_BANK.md §7): marks = {qid: marks given} for its descriptive answers. The stored record is
        re-scored with the paper's choices (GA.testgen.icaiRecord) and each newly marked answer becomes an attempt: full marks Got it, some
        Partly, none Missed (so Partly and Missed reach the notebook and the review schedule). questions = the test's records. Returns the
        updated record, or null for an unknown test. */
    markTest(id, marks, questions) {
      const t = (Store.state.tests || []).find(x => x && x.id === id);
      if (!t || !marks || typeof marks !== 'object') return null;
      const TG = GA.testgen || require('./testgen.js'), SC = GA.scoring || require('./scoring.js'), D = GA.data && GA.data.D;
      const byId = Object.fromEntries((questions || []).map(q => [q.id, q]));
      const fresh = [];
      Store.update(s => {
        const rec = s.tests.find(x => x && x.id === id);
        rec.responses = rec.responses || {};
        rec.graded = rec.graded || {};
        Object.keys(marks).forEach(qid => {
          const q = byId[qid], raw = marks[qid], v = Number(raw);
          if (!q || q.type !== 'DESC') return;
          // an item without marks (an RTP's) is graded Got it / Partly / Missed instead of marked
          if (typeof raw === 'string' && SC.GRADES.includes(raw)) { const r = Object.assign({}, rec.responses[qid] || { done: true }, { g: raw }); delete r.m; rec.responses[qid] = r; }
          else if (isFinite(v)) rec.responses[qid] = Object.assign({}, rec.responses[qid] || { done: true }, { m: SC.selfMarks({ m: v }, q.marks || 0) });
          else return;
          if (!rec.graded[qid]) { rec.graded[qid] = 1; fresh.push(qid); }
        });
        if (D) TG.icaiRecord(D, rec, (rec.qids || []).map(x => byId[x]).filter(Boolean));
        rec.pendingMarks = rec.pending || 0;
        rec.markedAt = Date.now();
      }, 'test');
      const rec = (Store.state.tests || []).find(x => x && x.id === id);
      fresh.forEach(qid => {
        const q = byId[qid], r = rec.responses[qid], g = r.g && r.m == null ? r.g : SC.gradeOfMarks(r.m, q.marks || 0);
        if (g && rec.states[qid] !== 'excess') A.attempt(q, r, g === 'got', rec.times && rec.times[qid], 't', { grade: g, mine: typeof r.t === 'string' ? r.t : undefined });
      });
      return rec;
    },

    /* ---------------- time on task ---------------- */
    addActive(secs, lessonId) {
      if (!(secs > 0)) return;
      Store.update(s => {
        actDay(s).s += secs;
        if (lessonId && s.lessons[lessonId]) s.lessons[lessonId].secs += secs;
      }, 'time');
    },

    /* ---------------- labs ---------------- */
    labRun(labId) { Store.update(s => { const l = (s.labs[labId] = s.labs[labId] || { runs: 0, ch: { n: 0, ok: 0 } }); l.runs++; l.at = Date.now(); actDay(s); }, 'lab'); },   // at: the last use, for /labs' 'Continue where you left off' (P2-59)
    /** one checked lab challenge. opts.peek: the learner looked at the answer first. XP (D8): a solve earns it only without Peek and for at most
        LAB_DAY_CAP solves a day, decided now and kept in the row's mode ('l' earns, 'lx' does not), so the XP ledger never changes afterwards. */
    labChallenge(labId, ok, opts) {
      const peek = !!(opts && opts.peek);
      Store.update(s => {
        const today = day();
        const l = (s.labs[labId] = s.labs[labId] || { runs: 0, ch: { n: 0, ok: 0 } });
        l.ch.n++; if (ok) l.ch.ok++; l.at = Date.now();
        if (peek) l.ch.peek = (l.ch.peek || 0) + 1;
        const earns = !!ok && !peek && labSolvesToday(s, today) < LAB_DAY_CAP;
        s.log.push([Date.now(), 'lab:' + labId, ok ? 1 : 0, null, ok && !earns ? 'lx' : 'l']);
        actDay(s).q++;
      }, 'lab');
    },

    /* ---------------- settings and planner ---------------- */
    /** patch the profile. A valid examDate also sets examSet (choosing a date is setting it, P1-46); examDate: null clears both (no date stored:
        GA.stats.exam then counts to the exam calendar). Writes route, focus, examDate, examSet and dayStart. */
    setProfile(patch) {
      if (!patch || typeof patch !== 'object') return;
      const p = Object.assign({}, patch);
      const has = k => Object.prototype.hasOwnProperty.call(p, k);
      if (has('examDate')) {
        if (typeof p.examDate === 'string' && DAYKEY.test(p.examDate)) { if (!has('examSet')) p.examSet = true; }
        else if (p.examDate == null) { p.examDate = null; p.examSet = false; }
        else delete p.examDate;
      }
      // the hour a study day starts (P3-28): 0–6; null goes back to the default (4 a.m.)
      let dayStart;
      if (has('dayStart')) { dayStart = Number.isInteger(p.dayStart) && p.dayStart >= 0 && p.dayStart <= 6 ? p.dayStart : p.dayStart == null ? null : undefined; delete p.dayStart; }
      Store.update(s => {
        Object.assign(s.profile, p);
        if (dayStart === null) delete s.profile.dayStart; else if (dayStart !== undefined) s.profile.dayStart = dayStart;
      }, 'profile');
    },
    setGoals(patch) { Store.update(s => { Object.assign(s.profile.goals, patch); }, 'profile'); },
    /** a one-off UI flag: state.seen[key] = value (dismissed cards, once-per-boot milestone toasts). The old setSeen(k, v). */
    setFlag(k, v) { if (!okId(k)) return; Store.update(s => { s.seen[k] = v == null ? Date.now() : v; }, 'flag'); },
    /** several flags in one write, values as given (null included): the milestone marks of P2-38 */
    setFlags(patch) {
      if (!patch || typeof patch !== 'object') return;
      const keys = Object.keys(patch).filter(okId);
      if (keys.length) Store.update(s => { keys.forEach(k => { s.seen[k] = patch[k] === undefined ? null : patch[k]; }); }, 'flag');
    },
    /** the planner's day snapshot (P0-19, GA.planner.day): state.plan = snapshot | null */
    setPlan(snapshot) { Store.update(s => { s.plan = snapshot && typeof snapshot === 'object' && !Array.isArray(snapshot) ? snapshot : null; }, 'plan'); },
    /** Settings' Export calls this once the download or share has resolved (P2-49): profile.lastExport = when */
    lastExport(when) { Store.update(s => { s.profile.lastExport = typeof when === 'number' && isFinite(when) ? when : Date.now(); }, 'profile'); },
    _capFor: capFor, _daysLeft: daysLeft, LAB_DAY_CAP
  };

  /* ---------------- engagement: the streak-freeze tick ----------------
     GA.engage.tick runs once when the store is initialised at boot (Store 'ready', inside Shell.boot before anything renders), so missed days between the
     last active day and yesterday consume streak freezes; again after an import, and when a tab left open comes back on a new day. Self-installing:
     the shell does not call it. At boot GA.engage.boot then says the one thing worth a toast (the freezes used, else a milestone: P2-38). */
  let tickedFor = null;
  A.engageTick = function (why) {
    const E = GA.engage;
    if (!E || typeof E.tick !== 'function') return [];
    const today = day();
    if (why === 'visible' && tickedFor === today) return [];
    tickedFor = today;
    let used = [];
    try { used = E.tick(Store, today) || []; } catch (e) { if (typeof console !== 'undefined') console.error(e); }
    if (typeof document !== 'undefined') {
      try {
        if (why === 'boot' && typeof E.boot === 'function') { E.boot(used); if (typeof E.watch === 'function') E.watch(Store); }
        else if (used.length && GA.ui && GA.ui.toast) {
          const when = used.length === 1 && used[0] === U.addDays(today, -1) ? 'yesterday' : used.map(k => U.fmtDay(k, { weekday: 'short', day: 'numeric', month: 'short' })).join(' and ');
          GA.ui.toast(`Streak saved: ${used.length === 1 ? 'a freeze' : used.length + ' freezes'} covered ${when}.`, 'ok');
        }
      } catch (e) { if (typeof console !== 'undefined') console.error(e); }
    }
    return used;
  };

  /* ---------------- keeping the storage (P2-49) ----------------
     On a hosted copy the browser may clear this site's storage under pressure. navigator.storage.persist() is asked once the learner has something to
     lose (the first finished lesson or the 10th answer), again when the app is installed or runs installed; GA.store.persist() asks only where the
     browser decides silently. Never on file://, never for the demo profile. */
  let persistAsked = false;
  const web = () => typeof location !== 'undefined' && !!location && /^https?:$/.test(location.protocol);
  const standalone = () => typeof navigator !== 'undefined' && (!!navigator.standalone || (typeof matchMedia === 'function' && matchMedia('(display-mode: standalone)').matches));
  function worthKeeping(s) {
    if (!s) return false;
    for (const id in s.lessons || {}) if (s.lessons[id] && s.lessons[id].done) return true;
    let n = 0; for (const id in s.q || {}) { n += (s.q[id] && s.q[id].n) | 0; if (n >= 10) return true; }
    return false;
  }
  A.maybePersist = function (why) {
    if (!web() || typeof Store.persist !== 'function' || Store.profile === 'demo') return false;
    if (why !== 'installed' && (persistAsked || !(standalone() || worthKeeping(Store.state)))) return false;
    persistAsked = true;
    try { Store.persist().catch(() => null); } catch (e) { /* the browser cannot say */ }
    return true;
  };

  if (Store.on) {
    Store.on('ready', () => { A.engageTick('boot'); persistAsked = false; A.maybePersist('boot'); });
    Store.on('change', tag => {
      if (tag === 'import') A.engageTick('import');
      if (!persistAsked && (tag === 'lesson' || tag === 'attempt' || tag === 'test' || tag === 'import')) A.maybePersist(tag);
    });
  }
  if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', () => { if (!document.hidden) A.engageTick('visible'); });
  if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('appinstalled', () => A.maybePersist('installed'));

  GA.actions = A;
  if (typeof module !== 'undefined' && module.exports) module.exports = A;
})(typeof window !== 'undefined' ? window : globalThis);
