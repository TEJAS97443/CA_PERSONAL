/* PassBook — synthetic learner for the DEMO profile (?profile=demo). It writes plausible weeks of activity straight into the demo
   profile's state so every screen can be explored. It never touches the main profile: seed() refuses to run anywhere else. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js'), SRS = GA.srs || require('./srs.js'), SC = GA.scoring || require('./scoring.js'), TG = GA.testgen || require('./testgen.js');

  /** a response that the official key accepts (right=true) or rejects (right=false) */
  function respond(q, right, rnd) {
    const a = q.answer; if (!a) return null;
    const one = x => x.kind === 'oneof' ? x.alts[0] : x;
    const k = one(a);
    if (right) return k.kind === 'single' ? k.value : k.kind === 'multi' ? k.value.slice() : k.kind === 'range' ? String((k.min + k.max) / 2) : 'A';
    if (q.type === 'NAT') return String(Math.round(((k.max || 1) + 7 + rnd() * 9) * 100) / 100);
    if (q.type === 'MSQ') return k.value.length > 1 ? [k.value[0]] : [k.value[0], 'ABCD'.replace(k.value[0], '')[0]].sort();
    const pool = 'ABCD'.split('').filter(c => c !== k.value); return pool[Math.floor(rnd() * pool.length)];
  }

  const REASONS = ['concept', 'calc', 'misread', 'recall', 'guess'];
  const RESOLVE_GAP = 3;                     // actions.attempt's notebook spacing (P2-41, D8: GA.stats.RETRY.resolve)
  /** local clock time `h` on day key k (the seeded study happens in the daytime, whatever the study day's start) */
  const atHour = (k, h) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, h).getTime(); };
  /** rebuild state.q and state.nb from the chronological answer log with actions.attempt's rules (counts, first/last result, streak, schedule; a
      miss opens or re-opens a notebook entry and stamps nb.missed, a right answer 3 or more study days after the last miss closes it, P2-41 / D8).
      Bookmarks and notebook reasons already chosen are kept. */
  function replay(s, D, rnd) {
    const bm = {}, why = {};
    for (const id in s.q) if (s.q[id] && s.q[id].bm) bm[id] = 1;
    for (const id in s.nb) if (s.nb[id] && s.nb[id].reason) why[id] = s.nb[id].reason;
    s.q = {}; s.nb = {};
    for (const r of s.log) {
      const mode = r[4] || 'p'; if (mode !== 'p' && mode !== 'r' && mode !== 't') continue;
      const id = r[1], ok = !!r[2], ms = r[3], day = U.dayOf(r[0]), meta = D.qById[id];
      const e = (s.q[id] = s.q[id] || { n: 0, ok: 0, last: 0, lastOk: null, firstOk: null, ms: null, streak: 0, bm: bm[id] || 0 });
      e.n++; if (ok) e.ok++;
      if (e.firstOk == null) e.firstOk = ok ? 1 : 0;
      e.lastOk = ok ? 1 : 0; e.last = r[0]; e.streak = ok ? e.streak + 1 : 0;
      if (ms != null) e.ms = e.ms == null ? ms : Math.round(0.6 * e.ms + 0.4 * ms);
      e.srs = SRS.review(e.srs || SRS.fresh(day), SRS.gradeFromAttempt(ok, ms, meta ? meta.marks : 1), day, { cap: 60 });
      if (!ok) {
        const n = s.nb[id];
        if (!n) s.nb[id] = { reason: why[id] || REASONS[Math.floor(rnd() * REASONS.length)], added: r[0], resolved: null, misses: 1, missed: r[0] };
        else { n.resolved = null; n.misses++; n.missed = r[0]; }
      } else if (s.nb[id] && !s.nb[id].resolved && U.daysBetween(U.dayOf(s.nb[id].missed || s.nb[id].added), day) >= RESOLVE_GAP) s.nb[id].resolved = r[0];
    }
  }

  async function seed(S, D, opts) {
    if (S.profile !== 'demo') throw new Error('The demo seeder only runs in the demo profile.');
    const rnd = U.rng(20261010), today = U.today();
    const DATA = GA.data;
    const keyed = D.questions.filter(q => q.hasKey && q.subject && q.subject !== '?');
    const full = {}; (await DATA.questions(keyed.map(q => q.id))).forEach(q => (full[q.id] = q));
    S.reset();
    const skill = {}; D.subjects.forEach((s, i) => (skill[s.id] = 0.35 + 0.5 * ((Math.sin(i * 2.1) + 1) / 2)));
    S.update(s => {
      s.profile.name = 'Demo learner';
      const days = 30;
      for (let d = days; d >= 0; d--) {
        const day = U.addDays(today, -d);
        const off = rnd() < 0.2;
        // some days off, but the last 16 days form a live streak: one missed day (9 days ago) that a streak freeze covers (see the tick below)
        if (d === 9 || (d > 16 && off)) continue;
        const t0 = atHour(day, 9);
        const n = d === 0 ? 6 : 6 + Math.floor(rnd() * 18);
        const act = (s.act[day] = { s: 0, q: 0, c: 0, l: 0 });
        const focus = D.subjects[Math.floor(rnd() * D.subjects.length)].id;
        for (let i = 0; i < n; i++) {
          const pool = keyed.filter(q => q.subject === (rnd() < 0.6 ? focus : D.subjects[Math.floor(rnd() * D.subjects.length)].id));
          const m = pool[Math.floor(rnd() * pool.length)]; if (!m) continue;
          const ok = rnd() < Math.min(0.95, skill[m.subject] - (m.marks === 2 ? 0.08 : 0) + (m.diff === 'hard' ? -0.1 : 0));
          const ms = Math.round((m.marks === 2 ? 110 : 55) * (0.5 + rnd()) * 1000), ts = t0 + i * 4 * 60000 + d * 0;
          const e = (s.q[m.id] = s.q[m.id] || { n: 0, ok: 0, last: 0, lastOk: null, firstOk: null, ms: null, streak: 0, bm: 0 });
          e.n++; if (ok) e.ok++; if (e.firstOk == null) e.firstOk = ok ? 1 : 0; e.lastOk = ok ? 1 : 0; e.last = ts; e.streak = ok ? e.streak + 1 : 0; e.ms = ms;
          e.srs = SRS.review(e.srs || SRS.fresh(day), SRS.gradeFromAttempt(ok, ms, m.marks), day, { cap: 60 });
          if (rnd() < 0.05) e.bm = 1;
          s.log.push([ts, m.id, ok ? 1 : 0, ms, 'p']);
          act.q++; act.s += ms / 1000 + 20;
          if (!ok && !s.nb[m.id]) s.nb[m.id] = { reason: REASONS[Math.floor(rnd() * 5)], added: ts, resolved: null, misses: 1 };
        }
        act.s += 600 + Math.floor(rnd() * 1800);
        if (rnd() < 0.35) {                                                       // read a lesson, review cards
          const les = D.lessons.filter(l => !(s.lessons[l.id] && s.lessons[l.id].done));
          if (les.length) { const l = les[Math.floor(rnd() * Math.min(3, les.length))]; s.lessons[l.id] = { first: t0, last: t0, done: rnd() < 0.8 ? t0 + 1e6 : null, secs: 600, visits: 1, quiz: {} }; if (s.lessons[l.id].done) act.l++; }
          D.cards.slice(0, 40).forEach((c, i) => { if (rnd() < 0.25) { s.cards[c.id] = SRS.review(s.cards[c.id] || SRS.fresh(day), 1 + Math.floor(rnd() * 3), day, { cap: 60 }); act.c++; } });
        }
        if (rnd() < 0.3 && d > 0) {                                             // open a lab and try a few of its challenges
          const labs = (D.labs || []).filter(l => l.status === 'ready');
          const lab = labs[Math.floor(rnd() * labs.length)];
          if (lab) {
            const L = (s.labs[lab.id] = s.labs[lab.id] || { runs: 0, ch: { n: 0, ok: 0 } }), tries = 1 + Math.floor(rnd() * 3);
            L.runs += 1 + Math.floor(rnd() * 4);
            for (let j = 0; j < tries; j++) { const ok = rnd() < 0.7; L.ch.n++; if (ok) L.ch.ok++; s.log.push([t0 + 5 * 3600e3 + j * 90e3, 'lab:' + lab.id, ok ? 1 : 0, null, 'l']); act.q++; }
          }
        }
      }
      // the demo learner is mid-lesson: its newest lesson record is left open (Home's hero and the footer then show Continue)
      const recs = Object.keys(s.lessons).map(id => [id, s.lessons[id]]).sort((a, b) => (b[1].last || 0) - (a[1].last || 0));
      if (recs.length && recs[0][1].done) { recs[0][1].done = null; recs[0][1].secs = Math.max(recs[0][1].secs || 0, 420); }
    }, 'demo');
    // three timed tests, scored by the real scoring code. Their graded answers go into the log inside the test's window (mode 't'), and the
    // question records and the notebook are then replayed from the whole log with actions.attempt's rules, so the results, the bank and the
    // notebook tell one story (P3-26)
    const when = (D.papers || []).length ? [-21, -11, -3] : [];       // no ICAI papers in the bank yet: no tests to replay
    for (let k = 0; k < when.length; k++) {
      const paper = D.papers.filter(p => p.keyed >= p.n * 0.9)[k + 2] || D.papers[k];
      if (!paper) continue;
      const tst = TG.fromPaper(D, paper.id);
      const qs = (await DATA.questions(tst.qids)).filter(q => q.answer);
      const responses = {}, times = {};
      qs.forEach(q => { const att = rnd() < 0.78; if (!att) return; const right = rnd() < Math.min(0.9, (skill[q.subject] || 0.5) - 0.05 + k * 0.05); responses[q.id] = respond(q, right, rnd); times[q.id] = Math.round((q.marks === 2 ? 120 : 60) * (0.4 + rnd()) * 1000); });
      const live = { id: 'demo' + k, startedAt: atHour(U.addDays(today, when[k]), 10), elapsedMs: 165 * 60000, responses, times, marked: {} };
      const rec = TG.summarise(D, tst, live, qs);
      rec.finished = live.startedAt + 165 * 60000; rec.started = live.startedAt;
      const day = U.addDays(today, when[k]), rows = [];
      let t = rec.started;
      qs.forEach(q => {
        const r = responses[q.id]; if (r == null) return;
        const m = SC.mark(q, r); if (m.state !== 'correct' && m.state !== 'wrong') return;
        t = Math.min(rec.finished - 1000, t + (times[q.id] || 60000));
        rows.push([t, q.id, m.state === 'correct' ? 1 : 0, times[q.id] || null, 't']);
      });
      S.update(s => {
        s.tests.push(rec);
        const act = (s.act[day] = s.act[day] || { s: 0, q: 0, c: 0, l: 0 });
        act.s += 165 * 60; act.q += rows.length;
        rows.forEach(r => s.log.push(r));
      }, 'demo');
    }
    S.update(s => { s.log.sort((a, b) => a[0] - b[0]); replay(s, D, rnd); }, 'demo');      // one chronological log, as the real app writes it
    // the boot tick as it ran on the morning after the missed day: the freeze earned by the 7 days before it covers the gap
    if (GA.engage && GA.engage.tick) GA.engage.tick(S, U.addDays(today, -8));
    S.flushNow();
  }
  /** a half-finished timed sitting of one paper, for reviewing the exam runner on screen (demo profile only) */
  async function live(S, D, paperId) {
    if (S.profile !== 'demo') throw new Error('The demo seeder only runs in the demo profile.');
    const pick = paperId || ((D.papers || []).slice().sort((a, b) => b.year - a.year || b.set - a.set).find(p => p.keyed >= p.n * 0.9) || {}).id;
    if (!pick) return null;                                                   // no paper to sit yet (the ICAI bank is empty)
    const rnd = U.rng(7), tst = TG.fromPaper(D, pick);
    const qs = (await GA.data.questions(tst.qids)).filter(q => q.answer);
    const responses = {}, visited = {}, marked = {}, times = {};
    qs.slice(0, 24).forEach((q, i) => { visited[q.id] = true; if (i % 3 !== 2) responses[q.id] = respond(q, rnd() < 0.7, rnd); if (i % 7 === 4) marked[q.id] = true; times[q.id] = 40000 + i * 3000; });
    const id = 'demolive';
    S.update(s => { s.live = { id, ...tst, startedAt: Date.now() - 52 * 60000, elapsedMs: 52 * 60000, cur: 23, responses, visited, marked, times }; }, 'live');
    S.flushNow();
    return id;
  }
  GA.demo = { seed, respond, live, _replay: replay };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.demo;
})(typeof window !== 'undefined' ? window : globalThis);
