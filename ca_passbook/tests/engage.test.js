/* GA.engage (streak with freezes, XP, Wrapped numbers), the boot tick, store v2 migration + log archive, the mascot and the Wrapped slide model. */
globalThis.GA = globalThis.GA || {};
const U = require('../app/js/core/util.js'); require('../app/js/core/srs.js'); require('../app/js/core/scoring.js');
const Store = require('../app/js/core/store.js');
const ST = require('../app/js/core/stats.js');
const A = require('../app/js/core/actions.js');
const E = require('../app/js/core/engage.js');
const M = require('../app/js/core/mascot.js');
const WV = require('../app/js/views/wrapped.js');
const cp = require('child_process'), path = require('path');

const T = '2026-10-15';                                    // a Thursday
const day = (k, n) => E.day.addDays(k, n);
const fresh = () => Store._blank();
const on = (s, k, o) => (s.act[k] = Object.assign({ s: 0, q: 1, c: 0, l: 0 }, o || {}));
const runDays = (s, end, n) => { for (let i = 0; i < n; i++) on(s, day(end, -i)); };
const fakeStore = s => ({ state: s, n: 0, update(fn) { this.n++; fn(this.state); } });
const at = (k, h) => U.parseDay(k).getTime() + (h == null ? 12 : h) * 3600e3;   // local hour h of day k
/** a stored test record as the runner writes it (testgen.summarise): the counts follow its per-question states */
function rec(id, states, extra) {
  const v = Object.values(states), n = x => v.filter(y => y === x).length;
  return Object.assign({ id, kind: 'topic', title: id, started: Date.now() - 3600e3, finished: Date.now(), score: 0, max: v.length,
    attempted: n('correct') + n('wrong'), correct: n('correct') + n('mta'), wrong: n('wrong'), skipped: n('skipped'), ungraded: n('ungraded'), total: v.length, states }, extra || {});
}
const states = (n, f) => Object.fromEntries(Array.from({ length: n }, (_, i) => ['q' + i, typeof f === 'function' ? f(i) : f]));

/* ------------------------------------------------------------------ day maths */
test('engage day maths: UTC day numbers agree with the local-calendar helpers across months, leap years and DST', () => {
  let k = '2023-12-20';
  for (let i = 0; i < 1600; i++) {
    const n = E.day.addDays(k, 1);
    assert.equal(n, U.addDays(k, 1), k);
    assert.equal(E.day.between(k, n), 1);
    assert.equal(E.day.dkey(E.day.dnum(k)), k);
    k = n;
  }
  assert.equal(E.day.addDays('2024-02-28', 1), '2024-02-29'); assert.equal(E.day.addDays('2025-02-28', 1), '2025-03-01');
  assert.equal(E.day.addDays('2026-12-31', 1), '2027-01-01'); assert.equal(E.day.addDays('2026-01-01', -1), '2025-12-31');
  assert.equal(E.day.between('2026-01-01', '2027-01-01'), 365); assert.equal(E.day.between('2024-01-01', '2025-01-01'), 366);
  assert.equal(E.day.weekStart(T), '2026-10-12'); assert.equal(E.day.weekStart('2026-10-12'), '2026-10-12'); assert.equal(E.day.weekStart('2026-10-18'), '2026-10-12');
  assert.equal(E.day.monthStart(T), '2026-10-01'); assert.equal(E.day.weekday('2026-10-18'), 6);
});

/* ------------------------------------------------------------------ streak */
test('streak: empty and fresh profiles show nothing', () => {
  const s = fresh(), r = E.streak(s, T);
  assert.equal(r.current, 0); assert.equal(r.best, 0); assert.equal(r.freezes, 0); assert.equal(r.activeToday, false); assert.equal(r.atRisk, false);
  assert.equal(r.nextFreezeIn, 7); assert.deepEqual(r.frozen, []);
  const c = E.compute(s, null, T);
  assert.equal(c.fresh, true); assert.equal(c.xp.total, 0); assert.equal(c.level.n, 1);
});

test('streak: an idle today never breaks it (survives until the day ends), a missed past day does', () => {
  const s = fresh(); runDays(s, day(T, -1), 5);
  let r = E.streak(s, T);
  assert.equal(r.current, 5); assert.equal(r.activeToday, false); assert.equal(r.atRisk, true); assert.equal(r.since, day(T, -5));
  on(s, T); r = E.streak(s, T);
  assert.equal(r.current, 6); assert.equal(r.activeToday, true); assert.equal(r.atRisk, false);
  assert.equal(E.streak(s, day(T, 2)).current, 0);                     // tomorrow passed without study: gone (no freeze held yet)
  const g = fresh(); runDays(g, day(T, -1), 3); runDays(g, day(T, -5), 2);
  r = E.streak(g, T); assert.equal(r.current, 3); assert.equal(r.best, 3);
});

test('streak: a day counts with any answer, card or lesson, or 10 minutes of study (GA.stats.dayActive)', () => {
  const s = fresh();
  s.act[day(T, -2)] = { s: 600, q: 0, c: 0, l: 0 }; s.act[day(T, -1)] = { s: 0, q: 0, c: 1, l: 0 }; s.act[T] = { s: 599, q: 0, c: 0, l: 0 };
  const r = E.streak(s, T);
  assert.equal(r.current, 2); assert.equal(r.activeToday, false);
});

test('streak: one freeze earned on every 7th active day of a run, held at most 2', () => {
  const s = fresh(); runDays(s, T, 6);
  assert.equal(E.streak(s, T).freezes, 0); assert.equal(E.streak(s, T).nextFreezeIn, 1);
  on(s, day(T, -6)); assert.equal(E.streak(s, T).freezes, 1); assert.equal(E.streak(s, T).nextFreezeIn, 7);
  runDays(s, T, 13); assert.equal(E.streak(s, T).freezes, 1); assert.equal(E.streak(s, T).nextFreezeIn, 1);
  runDays(s, T, 14); assert.equal(E.streak(s, T).freezes, 2); assert.equal(E.streak(s, T).nextFreezeIn, null);
  runDays(s, T, 40); const r = E.streak(s, T);
  assert.equal(r.freezes, 2, 'capped'); assert.equal(r.current, 40); assert.equal(r.best, 40);
});

test('tick: a missed day is covered by a held freeze; the streak survives but does not grow on the frozen day', () => {
  const s = fresh(); runDays(s, day(T, -2), 10);                      // T-11 .. T-2 active, T-1 missed
  assert.equal(E.streak(s, T).current, 0, 'before the tick the gap breaks it');
  assert.deepEqual(E.freezePlan(s, T), [day(T, -1)]);
  const st = fakeStore(s);
  assert.deepEqual(E.tick(st, T), [day(T, -1)]);
  assert.deepEqual(s.eng.frozen, [day(T, -1)]);
  let r = E.streak(s, T);
  assert.equal(r.current, 10); assert.equal(r.freezes, 0); assert.deepEqual(r.frozen, [day(T, -1)]); assert.equal(r.atRisk, true);
  on(s, T); r = E.streak(s, T);
  assert.equal(r.current, 11); assert.equal(r.nextFreezeIn, 3);
  assert.deepEqual(E.tick(st, T), [], 'idempotent'); assert.equal(st.n, 1); assert.deepEqual(s.eng.frozen, [day(T, -1)]);
});

test('tick: two missed days with two freezes are both covered; a gap longer than the freezes held breaks the streak and keeps them', () => {
  const s = fresh(); runDays(s, day(T, -3), 14);
  assert.deepEqual(E.tick(fakeStore(s), T), [day(T, -2), day(T, -1)]);
  let r = E.streak(s, T); assert.equal(r.current, 14); assert.equal(r.freezes, 0);
  const g = fresh(); runDays(g, day(T, -4), 14);                      // 3 missed days, 2 freezes
  assert.deepEqual(E.freezePlan(g, T), []);
  assert.deepEqual(E.tick(fakeStore(g), T), []);
  r = E.streak(g, T); assert.equal(r.current, 0); assert.equal(r.freezes, 2, 'kept for the next streak'); assert.equal(r.best, 14);
  on(g, T); r = E.streak(g, T); assert.equal(r.current, 1); assert.equal(r.freezes, 2);
});

test('tick: nothing to do when yesterday was active, when there is no history, or when no freeze is held', () => {
  const s = fresh(); runDays(s, day(T, -1), 9); assert.deepEqual(E.freezePlan(s, T), []);
  assert.deepEqual(E.freezePlan(fresh(), T), []);
  const g = fresh(); runDays(g, day(T, -2), 6); assert.deepEqual(E.freezePlan(g, T), []);
  const st = fakeStore(g); E.tick(st, T); assert.equal(st.n, 0, 'no write');
});

test('tick: a freeze used yesterday does not count twice; when the next gap cannot be covered the streak ends', () => {
  const s = fresh(); runDays(s, day(T, -3), 7);                       // one freeze held
  assert.deepEqual(E.tick(fakeStore(s), day(T, -1)), [day(T, -2)], 'boot yesterday froze the day before');
  assert.equal(E.streak(s, day(T, -1)).current, 7);
  assert.deepEqual(E.freezePlan(s, T), [], 'T-1 also missed: no freeze left');
  const r = E.streak(s, T); assert.equal(r.current, 0); assert.equal(r.freezes, 0); assert.equal(r.best, 7);
});

test('streak: frozen days only bridge while a freeze is really held; today and active days are never consumed', () => {
  const s = fresh(); runDays(s, day(T, -4), 3); s.eng.frozen = [day(T, -3), day(T, -2), day(T, -1)];
  assert.equal(E.streak(s, T).current, 0, 'tampered bookkeeping cannot invent freezes');
  const g = fresh(); runDays(g, day(T, -1), 7); g.eng.frozen = [T];
  assert.equal(E.streak(g, T).freezes, 1); assert.deepEqual(E.streak(g, T).frozen, []);
  const h = fresh(); runDays(h, day(T, -1), 8); h.eng.frozen = [day(T, -1)];
  assert.equal(E.streak(h, T).freezes, 1, 'an active day marked frozen keeps its freeze');
  s.eng.frozen = ['junk', 42, null, '2026-13-x'];
  assert.doesNotThrow(() => E.streak(s, T));
});

test('streak: day maths is timezone-free (same answers in UTC+14, UTC-11, US and Lord Howe DST)', () => {
  const script = `
    globalThis.GA = {}; const R = ${JSON.stringify(path.join(__dirname, '..', 'app', 'js', 'core'))} + '/';
    require(R + 'util.js'); require(R + 'srs.js'); require(R + 'stats.js'); const E = require(R + 'engage.js'), S = require(R + 'store.js'), U = GA.util;
    const out = [];
    for (const T of ['2026-03-08', '2026-03-09', '2026-03-29', '2026-04-05', '2026-10-04', '2026-10-25', '2026-11-01', '2026-11-02', '2027-01-01']) {
      const s = S._blank();
      for (let i = 2; i < 16; i++) s.act[E.day.addDays(T, -i)] = { s: 0, q: 1, c: 0, l: 0 };
      s.act[E.day.addDays(T, -20)] = { s: 0, q: 1, c: 0, l: 0 };
      const plan = E.freezePlan(s, T); s.eng.frozen = plan.slice();
      const r = E.streak(s, T);
      s.lessons.x = { done: U.parseDay(E.day.addDays(T, -3)).getTime() + 12 * 3600e3 };
      out.push([T, plan, r.current, r.best, r.freezes, r.nextFreezeIn, r.since, E.day.weekStart(T), E.day.between('2026-01-01', T), Object.keys(E.ledger(s).days).sort().join()]);
    }
    process.stdout.write(JSON.stringify(out));`;
  const runs = ['UTC', 'Pacific/Kiritimati', 'Pacific/Pago_Pago', 'America/New_York', 'Australia/Lord_Howe', 'Asia/Kolkata']
    .map(TZ => cp.execFileSync(process.execPath, ['-e', script], { env: Object.assign({}, process.env, { TZ }) }).toString());
  runs.forEach((r, i) => assert.equal(r, runs[0], 'zone #' + i));
  const first = JSON.parse(runs[0]);
  assert.equal(first[0][2], 14); assert.deepEqual(first[0][1], [E.day.addDays('2026-03-08', -1)]);
});

/* ------------------------------------------------------------------ XP */
test('XP: lesson 50 once, PYQ practice first-correct 10 / again 3 / wrong 1, per question', () => {
  const s = fresh();
  s.lessons.a = { done: at(T), visits: 1 }; s.lessons.b = { done: null, visits: 3 };
  s.log.push([at(T, 9), 'q1', 0, 1, 'p'], [at(T, 9.1), 'q1', 1, 1, 'p'], [at(T, 9.2), 'q1', 1, 1, 'r'], [at(T, 9.3), 'q1', 0, 1, 'p'], [at(T, 9.4), 'q2', 1, 1, 'p']);
  const c = E.compute(s, null, T);
  assert.equal(c.xp.byKind.lessons, 50);
  assert.equal(c.xp.byKind.pyq, 1 + 10 + 3 + 1 + 10);
  assert.equal(c.xp.total, 75); assert.equal(c.xp.today, 75); assert.equal(c.xp.week, 75);
  s.lessons.a.done = at(T, 13);                                        // re-marking the same lesson done is still one lesson
  assert.equal(E.compute(s, null, T).xp.byKind.lessons, 50);
});

test('XP: answers given inside a test earn through the test (100 + whole marks), never twice', () => {
  Store.init({ profile: 'engage-xp' }); Store.reset();
  const q = { id: 'cs-2020:CS1', marks: 2, type: 'MCQ', answer: { kind: 'single', value: 'B' } };
  A.finishTest(rec('t1', { [q.id]: 'correct' }, { kind: 'paper', responses: { [q.id]: 'B' }, score: 2, max: 2 }), [q]);
  const s = Store.state, today = U.today();
  assert.equal(s.log.filter(r => r[4] === 't').length, 1, 'the answer is in the log as a test answer');
  let c = E.compute(s, null, today);
  assert.equal(c.xp.byKind.pyq, 0); assert.equal(c.xp.byKind.tests, 102); assert.equal(c.xp.total, 102);
  A.attempt(q, 'B', true, 30000, 'p');                                 // later practice of the same question: its first practice success
  c = E.compute(s, null, today);
  assert.equal(c.xp.byKind.pyq, 10); assert.equal(c.xp.total, 112);
  s.tests.push(rec('t2', states(3, 'wrong'), { score: -1.67 }), rec('t3', states(5, 'skipped'), { score: 0 }), rec('t4', states(30, i => (i < 25 ? 'correct' : 'wrong')), { score: 37.67 }));
  assert.equal(E.compute(s, null, today).xp.byKind.tests, 102 + 100 + 0 + 137, 'negative score adds no marks; an empty test earns nothing; marks are floored');
  Store.flushNow();
});

test('XP: flashcards 1 each but at most 60 a day; lab challenges 15 when solved; levels every 500', () => {
  const s = fresh();
  s.act[T] = { s: 0, q: 0, c: 75, l: 0 }; s.act[day(T, -1)] = { s: 0, q: 0, c: 12, l: 0 };
  s.log.push([at(T, 8), 'lab:cpu-sched', 1, null, 'l'], [at(T, 8.1), 'lab:cpu-sched', 0, null, 'l'], [at(T, 8.2), 'lab:paging', 1, null, 'l'], [at(T, 8.3), 'os.x#2', 1, null, 'z']);
  const c = E.compute(s, null, T);
  assert.equal(c.xp.byKind.cards, 72); assert.equal(c.xp.byKind.labs, 30); assert.equal(c.xp.byKind.pyq, 0, 'lesson self-checks are not PYQs');
  assert.equal(c.xp.today, 60 + 30); assert.equal(c.xp.week, 102);
  assert.deepEqual(E.levelOf(0), { n: 1, from: 0, to: 500, pct: 0, toNext: 500, name: 'Rough work' });
  assert.equal(E.levelOf(499).n, 1); assert.equal(E.levelOf(500).n, 2); assert.equal(E.levelOf(1240).n, 3); assert.equal(E.levelOf(1240).toNext, 260);
});

test('XP: today and the last 7 days are windows over local days; an unsorted log gives the same totals', () => {
  const s = fresh();
  s.log.push([at(day(T, -7), 10), 'a', 1, 1, 'p'], [at(day(T, -6), 10), 'b', 1, 1, 'p'], [at(T, 23.5), 'c', 0, 1, 'p'], [at(day(T, -1), 0.2), 'a', 1, 1, 'p']);
  let c = E.compute(s, null, T);
  assert.equal(c.xp.today, 1); assert.equal(c.xp.week, 10 + 1 + 3); assert.equal(c.xp.total, 24);
  s.log.reverse(); c = E.compute(s, null, T);
  assert.equal(c.xp.total, 24); assert.equal(c.xp.byKind.pyq, 24, '"first correct" follows time, not array order');
});

test('XP: rows the store trims off a long log are archived, so totals never go down', () => {
  const s = fresh(), N = Store.LOG_CAP + 250;
  for (let i = 0; i < N; i++) s.log.push([at(day(T, -60), 0) + i * 1000, 'q' + (i % 400), i % 3 ? 1 : 0, 1000, i % 50 === 0 ? 't' : i % 70 === 0 ? 'l' : 'p']);
  const before = E.compute(s, null, T).xp, wb = E.wrapped(s, null, { today: T });
  Store._trimLog(s);
  assert.equal(s.log.length, Store.LOG_CAP); assert.equal(s.logArch.n, 250);
  const after = E.compute(s, null, T).xp, wa = E.wrapped(s, null, { today: T });
  assert.deepEqual(after.byKind, before.byKind); assert.equal(after.total, before.total);
  assert.equal(wa.pyq.answered, wb.pyq.answered); assert.equal(wa.pyq.correct, wb.pyq.correct); assert.equal(wa.labs.solved, wb.labs.solved); assert.equal(wa.xp, wb.xp);
  Store._trimLog(s); assert.equal(s.logArch.n, 250, 'no-op under the cap');
});

/* ------------------------------------------------------------------ Wrapped */
const D = {
  subjects: [
    { id: 'os', name: 'Operating Systems', short: 'OS', topics: [{ id: 'os.sched', name: 'CPU scheduling', subtopics: [{ id: 'os.sched.rr' }] }, { id: 'os.vm', name: 'Virtual memory', subtopics: [{ id: 'os.vm.pg' }] }] },
    { id: 'db', name: 'Databases', short: 'DB', topics: [{ id: 'db.sql', name: 'SQL', subtopics: [{ id: 'db.sql.join' }] }] }],
  lessons: [{ id: 'os.sched.rr', subject: 'os', topic: 'os.sched', subtopic: 'os.sched.rr' }, { id: 'os.vm.pg', subject: 'os', topic: 'os.vm', subtopic: 'os.vm.pg' }, { id: 'db.sql.join', subject: 'db', topic: 'db.sql', subtopic: 'db.sql.join' }],
  cards: [{ id: 'c1', lesson: 'os.sched.rr', subject: 'os', topic: 'os.sched' }], questions: [], topicMarks: {}
};
['os.sched', 'os.vm', 'db.sql'].forEach((t, j) => { for (let i = 0; i < 8; i++) D.questions.push({ id: `${t}:${i}`, subject: t.split('.')[0], topic: t, subtopic: null, marks: 1, type: 'MCQ' }); });
D.qById = Object.fromEntries(D.questions.map(q => [q.id, q]));
D.lessonById = Object.fromEntries(D.lessons.map(l => [l.id, l]));
D.subjectById = Object.fromEntries(D.subjects.map(s => [s.id, s]));
D.nodes = {}; D.subjects.forEach(s => { D.nodes[s.id] = s; s.topics.forEach(t => { D.nodes[t.id] = Object.assign(t, { subject: s.id }); }); });
D.nodeSubject = id => (D.nodes[id] ? D.nodes[id].subject || id : null);

/** 20 days of synthetic study ending today; deterministic */
function story() {
  const s = fresh(), rnd = U.rng(7);
  for (let d = 19; d >= 0; d--) {
    if (d === 5 || d === 11) continue;
    const k = day(T, -d);
    s.act[k] = { s: 900 + d * 60, q: 0, c: d % 4, l: 0 };
    for (let i = 0; i < 6; i++) {
      const q = D.questions[Math.floor(rnd() * D.questions.length)], ok = q.topic === 'os.vm' ? (rnd() < 0.2 ? 1 : 0) : q.subject === 'db' ? (rnd() < 0.85 ? 1 : 0) : (rnd() < 0.6 ? 1 : 0);
      s.log.push([at(k, 8 + i * 0.3 + (d % 3) * 6), q.id, ok, 40000, i === 5 && d % 7 === 0 ? 'r' : 'p']); s.act[k].q++;
    }
    if (d % 6 === 0) { s.log.push([at(k, 19), 'lab:paging', d % 12 ? 1 : 0, null, 'l']); s.act[k].q++; }
  }
  s.lessons['os.sched.rr'] = { first: at(day(T, -15)), done: at(day(T, -15), 20), visits: 1 };
  s.lessons['db.sql.join'] = { first: at(day(T, -2)), done: at(day(T, -2), 21), visits: 2 };
  s.lessons['os.vm.pg'] = { first: at(day(T, -1)), done: null, visits: 1 };
  s.labs.paging = { runs: 5, ch: { n: 4, ok: 2 } };
  s.tests.push({ id: 'm1', kind: 'mock', title: 'Mock 1', started: at(day(T, -12), 10), finished: at(day(T, -12), 13), score: 30.33, max: 100, attempted: 50, correct: 30, negative: 4.67 },
    { id: 'q1', kind: 'topic', title: 'Quiz', started: at(day(T, -8), 10), finished: at(day(T, -8), 10.3), score: 6, max: 10, attempted: 8, correct: 6, negative: 0 },
    { id: 'm2', kind: 'paper', title: 'GATE 2024 CS · Set 1', started: at(day(T, -3), 10), finished: at(day(T, -3), 13), score: 41, max: 100, attempted: 52, correct: 36, negative: 3 });
  return s;
}

test('Wrapped: every number recomputed independently from the raw state', () => {
  const s = story(), from = day(T, -9), to = T;
  const w = E.wrapped(s, D, { from, to, today: T });
  const inR = k => k >= from && k <= to;
  const acts = Object.entries(s.act).filter(([k]) => inR(k));
  assert.equal(w.days, 10);
  assert.equal(w.activeDays, acts.filter(([, a]) => ST.dayActive(a)).length);
  assert.equal(w.minutes, Math.round(acts.reduce((t, [, a]) => t + a.s, 0) / 60));
  assert.equal(w.cards, acts.reduce((t, [, a]) => t + a.c, 0));
  const rows = s.log.filter(r => inR(U.dayOf(r[0])) && /^[prt]$/.test(r[4]));
  assert.equal(w.pyq.answered, rows.length); assert.equal(w.pyq.correct, rows.filter(r => r[2]).length);
  approx(w.pyq.acc, rows.filter(r => r[2]).length / rows.length);
  assert.equal(w.pyq.distinct, new Set(rows.map(r => r[1])).size);
  const firstSeen = {}; s.log.slice().sort((a, b) => a[0] - b[0]).filter(r => /^[prt]$/.test(r[4])).forEach(r => { if (!(r[1] in firstSeen)) firstSeen[r[1]] = r; });
  const firsts = Object.values(firstSeen).filter(r => inR(U.dayOf(r[0])));
  assert.equal(w.pyq.firstTry.n, firsts.length); assert.equal(w.pyq.firstTry.ok, firsts.filter(r => r[2]).length);
  // strongest subject / toughest topic by hand
  const agg = key => { const m = {}; rows.forEach(r => { const k = key(D.qById[r[1]]); (m[k] = m[k] || { n: 0, ok: 0 }).n++; if (r[2]) m[k].ok++; }); return m; };
  const bs = Object.entries(agg(q => q.subject)).filter(([, e]) => e.n >= E.MIN.best).sort((a, b) => b[1].ok / b[1].n - a[1].ok / a[1].n || b[1].n - a[1].n)[0];
  assert.equal(w.best.id, bs[0]); assert.equal(w.best.n, bs[1].n); assert.equal(w.best.short, D.subjectById[bs[0]].short);
  const ht = Object.entries(agg(q => q.topic)).filter(([, e]) => e.n >= E.MIN.hardest && e.ok < e.n).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n || b[1].n - a[1].n)[0];
  assert.equal(w.hardest.id, ht[0]); assert.equal(w.hardest.name, D.nodes[ht[0]].name); assert.equal(w.hardest.subject, 'os');
  assert.equal(w.lessons, Object.values(s.lessons).filter(l => l.done && inR(U.dayOf(l.done))).length);
  const labRows = s.log.filter(r => r[4] === 'l' && inR(U.dayOf(r[0])));
  assert.equal(w.labs.challenges, labRows.length); assert.equal(w.labs.solved, labRows.filter(r => r[2]).length); assert.equal(w.labs.runs, null, 'runs have no dates');
  assert.deepEqual(w.tests.map(t => t.id), s.tests.filter(t => inR(U.dayOf(t.finished))).map(t => t.id));
  // longest streak inside the range: missed day T-5 splits it into 4 (T-9..T-6) and 5 (T-4..T)
  assert.equal(w.streak, 5);
  // XP in range = the ledger's days in range
  const L = E.ledger(s); let xp = 0; for (const k in L.days) if (inR(k)) for (const x in L.days[k]) xp += L.days[k][x];
  assert.equal(w.xp, xp);
  assert.equal(w.series.length, 10); assert.equal(w.series.filter(x => x.active).length, w.activeDays);
  assert.equal(w.enough, true);
  // all time = everything; its XP equals the live total
  const all = E.wrapped(s, D, { today: T });
  assert.equal(all.allTime, true); assert.equal(all.xp, E.compute(s, D, T).xp.total); assert.equal(all.labs.runs, 5);
  assert.equal(all.pyq.answered, s.log.filter(r => /^[prt]$/.test(r[4])).length);
});

test('Wrapped ranges: Monday week, calendar month, all time, and the run-up to the last full-length test', () => {
  const s = story(), R = E.ranges(s, T);
  const by = Object.fromEntries(R.map(r => [r.key, r]));
  assert.deepEqual([by.week.from, by.week.to], ['2026-10-12', T]);
  assert.deepEqual([by.month.from, by.month.to], ['2026-10-01', T]);
  assert.equal(by.all.from, day(T, -19));
  assert.equal(by.mock.test, 'm2', 'the latest mock or paper, not the topic quiz');
  assert.deepEqual([by.mock.from, by.mock.to], [day(T, -11), day(T, -3)]);
  const w = E.wrapped(s, D, Object.assign({ today: T }, by.mock));
  assert.equal(w.mock.id, 'm2'); approx(w.mock.pct, 0.41); approx(w.mock.prevPct, 0.3033); approx(w.mock.delta, 0.41 - 0.3033);
  assert.equal(E.wrapped(s, D, Object.assign({ today: T }, by.week)).mock.id, 'm2', 'Monday T-3 is in this week');
  assert.equal(E.wrapped(s, D, { from: day(T, -2), to: T, today: T }).mock, null, 'outside the range: no mock slide');
  const q = fresh(); q.tests.push({ id: 'x', kind: 'topic', finished: at(T, 9), started: at(T, 8.8), score: 3, max: 5, attempted: 5, correct: 3 });
  const rq = E.ranges(q, T).find(r => r.key === 'mock'); assert.equal(rq.label, 'Last test');
  assert.equal(E.ranges(fresh(), T).some(r => r.key === 'mock'), false);
});

test('Wrapped: honest empty state until there is enough; frozen days inside the range are listed', () => {
  const s = fresh();
  let w = E.wrapped(s, D, { today: T });
  assert.equal(w.enough, false); assert.equal(w.activeDays, 0); assert.equal(w.pyq.acc, null); assert.equal(w.best, null); assert.equal(w.mock, null);
  assert.deepEqual(WV._slides(w, { key: 'all', label: 'All time' }), []);
  runDays(s, day(T, -1), 1); w = E.wrapped(s, D, { today: T }); assert.equal(w.enough, false, 'one day is not a story');
  runDays(s, day(T, -3), 8); s.act[T] = { s: 0, q: 0, c: 25, l: 0 };
  w = E.wrapped(s, D, { today: T }); assert.equal(w.enough, true, 'two active days and 20 card reviews');
  const g = fresh(); runDays(g, day(T, -2), 9); E.tick(fakeStore(g), T);
  w = E.wrapped(g, D, { today: T }); assert.deepEqual(w.frozen, [day(T, -1)]); assert.equal(w.streak, 9);
});

test('Wrapped slides: only real, non-zero slides; the summary tiles and the numbers table carry the same values', () => {
  const s = story(), r = { key: 'month', label: 'This month', from: '2026-10-01', to: T };
  const w = E.wrapped(s, D, Object.assign({ today: T }, r));
  const list = WV._slides(w, r, { level: 3, today: T, trend: ST.testTrend(s), lessonsTotal: 3, lessonsDone: 2 });
  const keys = list.map(x => x.key);
  assert.deepEqual(keys, ['intro', 'time', 'pyq', 'subjects', 'learn', 'streak', 'mock', 'summary']);
  assert.equal(list[0].big, w.activeDays); assert.equal(list[2].big, w.pyq.answered);
  const sm = list[list.length - 1].summary;
  assert.equal(sm.hero.v, U.nf(w.pyq.answered)); assert.ok(sm.tiles.length <= 6);
  assert.ok(sm.tiles.some(t => t.k === 'right' && t.v === Math.round(w.pyq.acc * 100) + '%'));
  const facts = Object.fromEntries(WV._facts(w));
  assert.equal(facts['Lessons finished'], U.nf(w.lessons)); assert.equal(facts['Cards reviewed'], U.nf(w.cards));
  assert.ok(list.find(x => x.key === 'mock').fig.includes('<svg'), 'the mock slide charts every finished test');
  // a learner with only flashcards: no PYQ, subject or mock slides
  const c = fresh(); runDays(c, T, 3); Object.keys(c.act).forEach(k => (c.act[k] = { s: 300, q: 0, c: 12, l: 0 }));
  const wc = E.wrapped(c, D, { today: T }), lc = WV._slides(wc, { key: 'all', label: 'All time' }).map(x => x.key);
  assert.deepEqual(lc, ['intro', 'time', 'learn', 'streak', 'summary']);
  assert.equal(WV._summary(wc, { label: 'All time' }).hero.k, 'active days');
  assert.equal(WV._fmt.hm(59), '59 min'); assert.equal(WV._fmt.hm(60), '1 h'); assert.equal(WV._fmt.hm(640), '10 h 40 min');
  assert.equal(WV._fmt.hourName(0), 'midnight'); assert.equal(WV._fmt.hourName(21), '9 pm');
  assert.equal(WV._fmt.span('2026-10-01', '2026-10-15'), '1 – 15 Oct 2026');
});

/* ------------------------------------------------------------------ store v2+ (v3 itself: tests/store.test.js), the boot hook, the demo */
test('store v2: a v1 document gains state.eng and logArch; bad bookkeeping is cleaned; nothing else changes', () => {
  const v1 = { v: 1, created: 1, profile: { name: 'x', examDate: '2027-02-06', goals: { questions: 9 } }, lessons: { a: { done: 5 } }, q: {}, log: [[1, 'q', 1, 1, 'p']], tests: [], cards: {}, nb: {}, act: { '2026-10-01': { s: 0, q: 1, c: 0, l: 0 } }, plan: null, live: null, labs: {}, seen: {} };
  const s = Store._migrate(JSON.parse(JSON.stringify(v1)));
  assert.equal(s.v, Store.VERSION); assert.equal(Store.VERSION, 3);
  assert.deepEqual(s.eng, { v: 1, frozen: [] }); assert.equal(s.logArch, null);
  assert.deepEqual(s.lessons, v1.lessons); assert.deepEqual(s.act, v1.act); assert.equal(s.profile.goals.questions, 9); assert.equal(s.profile.goals.cards, 20);
  const t = Store._migrate({ v: 2, eng: { v: 1, frozen: ['2026-10-02', 'nope', 7, '2026-10-01', '2026-10-02'] }, logArch: 'junk', profile: { goals: {} } });
  assert.deepEqual(t.eng.frozen, ['2026-10-01', '2026-10-02']); assert.equal(t.logArch, null);
  assert.deepEqual(Store._migrate({ eng: [1, 2], profile: {} }).eng, { v: 1, frozen: [] });
  assert.deepEqual(Store._blank().eng, { v: 1, frozen: [] });
});

test('boot hook: store init fires "ready", actions.js runs the freeze tick before anything renders', () => {
  const today = U.today();
  Store.init({ profile: 'engage-boot' }); Store.reset();
  Store.update(s => { for (let i = 2; i < 10; i++) s.act[U.addDays(today, -i)] = { s: 0, q: 2, c: 0, l: 0 }; }, 'test');
  Store.flushNow();
  let ready = 0; const off = Store.on('ready', () => ready++);
  Store.init({ profile: 'engage-boot' });
  off();
  assert.equal(ready, 1);
  assert.deepEqual(Store.state.eng.frozen, [U.addDays(today, -1)], 'yesterday was covered at boot');
  assert.equal(E.streak(Store.state, today).current, 8);
  assert.deepEqual(A.engageTick('visible'), [], 'a second tick the same day does nothing');
  Store.init({ profile: 'main' });
});

test('demo seed: a live streak bridged by a real freeze, XP from every source, and a Wrapped worth showing', () => {
  const script = `
    const R = ${JSON.stringify(path.join(__dirname, '..'))} + '/';
    globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } }; globalThis.GA = {};
    { const FX = require(R + 'tests/fixtures/catalogue.js'), NS = require(R + 'tests/next-states.js');     // the shipped catalogue once it is rich enough, else the fixture
      if (NS.enough(FX.real())) require(R + 'data/manifest.js'); else FX.register(GAD); }
    ['util', 'srs', 'scoring', 'store', 'actions', 'stats', 'testgen', 'data', 'engage'].forEach(m => require(R + 'app/js/core/' + m + '.js'));
    GA.util.loadScript = src => { require(R + src); return Promise.resolve(); };
    const D = GA.data.init(), S = GA.store; S.init({ profile: 'demo' }); require(R + 'app/js/core/demo.js');
    GA.demo.seed(S, D).then(() => {
      const t = GA.util.today(), c = GA.engage.compute(S.state, D, t), w = GA.engage.wrapped(S.state, D, Object.assign({ today: t }, GA.engage.ranges(S.state, t).find(r => r.key === 'month')));
      process.stdout.write(JSON.stringify({ t, c, frozen: S.state.eng.frozen, enough: w.enough, lab: w.labs.solved, labs: D.labs.filter(l => l.status === 'ready').length, mock: !!GA.engage.ranges(S.state, t).find(r => r.key === 'mock') }));
    });`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script]).toString());
  assert.ok(r.c.streak.current >= 16, 'streak ' + r.c.streak.current); assert.equal(r.c.streak.activeToday, true);
  assert.deepEqual(r.frozen, [E.day.addDays(r.t, -9)]); assert.ok(r.c.streak.frozen.includes(E.day.addDays(r.t, -9)));
  for (const k of ['lessons', 'pyq', 'cards', 'labs', 'tests']) if (k !== 'labs' || r.labs) assert.ok(r.c.xp.byKind[k] > 0, 'XP from ' + k);   // lab XP once there is a lab
  assert.ok(r.c.level.n >= 2); assert.ok(r.enough); assert.ok(r.mock);
});

/* ------------------------------------------------------------------ mascot */
test('mascot: original SVG, decorative unless labelled, pupils follow the gaze, moods change the face', () => {
  const s = M.svg({ size: 64, gaze: 'right', mood: 'happy' });
  assert.ok(/^<svg class="mascot m-happy g-right"/.test(s)); assert.ok(s.includes('viewBox="0 0 100 100"')); assert.ok(s.includes('aria-hidden="true"'));
  assert.ok(M.svg({ label: 'Tick, waving' }).includes('role="img" aria-label="Tick, waving"'));
  assert.equal(M.NAME, 'Tick', 'the mascot is Tick, an auditor\'s tick mark');
  assert.ok(M.shapes({}).some(x => x.part === 'body' && /^M[\d.]+ [\d.]+L[\d.]+ [\d.]+L[\d.]+ [\d.]+$/.test(x.d)), 'its body is one check-mark stroke');
  assert.ok(M.svg({ mood: 'nope', gaze: 'nope' }).includes('m-idle g-left'), 'falls back');
  assert.ok(M.svg({ mood: 'think' }).includes('g-up'), 'thinking looks up');
  const px = g => +/^M([\d.]+)/.exec(M.shapes({ gaze: g }).find(x => x.part === 'pupil').d)[1];
  assert.ok(px('left') < px('center') && px('center') < px('right'));
  const py = g => +/^M[\d.]+ ([\d.]+)/.exec(M.shapes({ gaze: g }).find(x => x.part === 'pupil').d)[1];
  assert.ok(py('up') < py('center') && py('center') < py('down'));
  assert.ok(M.shapes({ mood: 'happy' }).some(x => x.part === 'tongue')); assert.ok(M.shapes({ mood: 'think' }).some(x => x.part === 'brow'));
  M.shapes({ mood: 'happy', gaze: 'down' }).forEach(x => { assert.ok(M.FALLBACK[x.fill || x.stroke], x.part); });
  assert.equal(M.canvasColor('color(srgb 1 0 0.5 / 0.5)'), 'rgba(255,0,128,0.5)'); assert.equal(M.canvasColor('rgb(1, 2, 3)'), 'rgb(1, 2, 3)');
  assert.ok(!/<script|on\w+=/i.test(M.svg({ label: '"><script>x</script>' })), 'labels are escaped');
});

/* ------------------------------------------------------------------ P0-05, D8: test XP and 'Not scored' sittings */
test('P0-05 + D8: a sitting with no official key is Not scored (no XP, never the recapped mock); test XP needs a graded answer and 10 % answered, once per id', () => {
  const s = fresh(), t0 = at(T, 9);
  // a 2007 paper: every question ungraded, 60 of 85 answered
  s.tests.push(rec('u2007', states(85, 'ungraded'), { kind: 'paper', title: 'GATE 2007 CS', started: t0, finished: t0 + 3 * 3600e3, max: 150, attempted: 60 }));
  assert.equal(E.testInfo(s.tests[0]).scored, false);
  assert.equal(E.ledger(s).total.tests, 0, 'no +100 XP for a paper nobody can grade');
  assert.equal(E.xpFor(s, 'test', 'u2007'), 0);
  assert.equal(E.lastMock(s), null); assert.equal(E.ranges(s, T).some(r => r.key === 'mock'), false);
  let w = E.wrapped(s, D, { today: T });
  assert.equal(w.tests.length, 1); assert.equal(w.tests[0].scored, false); assert.equal(w.tests[0].pct, null); assert.equal(w.tests[0].score, null); assert.equal(w.mock, null);
  assert.equal(Object.fromEntries(WV._facts(w))['Tests finished'], '1 (1 not scored)');
  // a keyed mock with 1 of 65 answered: below 10 %
  s.tests.push(rec('m1', states(65, i => (i === 0 ? 'correct' : 'skipped')), { kind: 'mock', started: t0, finished: t0 + 4 * 3600e3, score: 2, max: 100 }));
  assert.equal(E.ledger(s).total.tests, 0, '1 answer of 65 earns nothing');
  // 7 of 65 answered (3 right, 4 wrong): 100 + 4 whole marks
  s.tests.push(rec('m2', states(65, i => (i < 3 ? 'correct' : i < 7 ? 'wrong' : 'skipped')), { kind: 'mock', started: t0, finished: t0 + 5 * 3600e3, score: 4.67, max: 100 }));
  assert.equal(E.ledger(s).total.tests, 104); assert.equal(E.xpFor(s, 'test', 'm2'), 104);
  // marks to all on an empty sitting is not a graded answer
  s.tests.push(rec('m3', states(65, i => (i < 2 ? 'mta' : 'skipped')), { kind: 'mock', finished: t0 + 6 * 3600e3, score: 2, attempted: 0 }));
  assert.equal(E.ledger(s).total.tests, 104);
  // the same record stored twice earns once
  s.tests.push(Object.assign({}, s.tests[2]));
  assert.equal(E.ledger(s).total.tests, 104);
  assert.notEqual(E.lastMock(s).test.id, 'u2007', 'the recapped mock is a scored one');
  w = E.wrapped(s, D, { today: T });
  assert.equal(w.tests.length, 4, 'listed once each');
  assert.equal(w.tests.find(t => t.id === 'u2007').scored, false); assert.equal(w.tests.find(t => t.id === 'm2').scored, true);
});

/* ------------------------------------------------------------------ xpFor: one source for the inline XP lines (P2-38) */
test('xpFor: the XP shown for each event equals what the ledger adds when it is recorded (pyq, lesson, card, test)', () => {
  Store.init({ profile: 'engage-xpfor' }); Store.reset();
  const total = () => E.compute(Store.state, null, U.today()).xp.total;
  const q = { id: 'cs-2019:CS4', marks: 1, type: 'MCQ' }, seen = [];
  for (const ok of [false, true, true, false, true]) {
    const want = E.xpFor(Store.state, 'pyq', q.id, ok), before = total();
    A.attempt(q, 'A', ok, 30000, 'p');
    assert.equal(total() - before, want); seen.push(want);
  }
  assert.deepEqual(seen, [1, 10, 3, 1, 3]);
  assert.equal(E.xpFor(Store.state, 'pyq', q.id, null), 0, 'an unkeyed check earns nothing');
  assert.equal(E.xpFor(Store.state, 'lesson', 'os.x'), 50);
  let before = total(); A.setLessonDone('os.x', true); assert.equal(total() - before, 50);
  assert.equal(E.xpFor(Store.state, 'lesson', 'os.x'), 0, 'already done');
  Store.update(s => { s.act[U.today()].c = 59; });
  assert.equal(E.xpFor(Store.state, 'card', 'c1'), 1);
  before = total(); A.reviewCard('c1', 2); assert.equal(total() - before, 1);
  assert.equal(E.xpFor(Store.state, 'card', 'c2'), 0, 'the 61st review of the day');
  before = total(); A.reviewCard('c2', 2); assert.equal(total() - before, 0);
  const tq = { id: 'cs-2020:CS9', marks: 2, type: 'MCQ', answer: { kind: 'single', value: 'C' } };
  A.finishTest(rec('tx', { [tq.id]: 'correct' }, { responses: { [tq.id]: 'C' }, score: 2, max: 2 }), [tq]);
  assert.equal(E.xpFor(Store.state, 'test', 'tx'), 102); assert.equal(E.xpFor(Store.state, 'test', 'nope'), 0);
  Store.flushNow();
});

/* ------------------------------------------------------------------ recap(): the single Wrapped gate (P2-36) */
test('recap(): with no arguments it reads the live store, memoised per change; null until there is a story; the XP tip links only then', () => {
  Store.init({ profile: 'engage-recap' }); Store.reset();
  assert.equal(E.recap(), null);
  Store.update(s => { for (let i = 1; i <= 3; i++) s.act[U.addDays(U.today(), -i)] = { s: 0, q: 0, c: 25, l: 0 }; });
  const r = E.recap();
  assert.ok(r && r.w.enough); assert.equal(r.href, '#/wrapped?range=' + r.range.key);
  assert.equal(E.recap(), r, 'memoised until the store changes');
  A.setLessonAt('os.x', 'h2'); assert.equal(E.recap(), r, 'a saved reading position changes no number');
  A.setLessonDone('os.x', true); assert.notEqual(E.recap(), r);
  assert.deepEqual(E.recap(Store.state, null, U.today()).range, E.recap().range, 'the pure form agrees');
  Store.flushNow();
});

/* ------------------------------------------------------------------ P1-44: Wrapped says what it computed */
test('P1-44: the toughest-topic line states its rule (lowest accuracy among topics answered 4 or more times), never "the most marks left to give"', () => {
  const s = story(), r = { key: 'all', label: 'All time' };
  const w = E.wrapped(s, D, Object.assign({ today: T }, r));
  const list = WV._slides(w, r, { level: 2, today: T, trend: ST.testTrend(s), lessonsTotal: 3, lessonsDone: 2 });
  const line = list.find(x => x.key === 'subjects').lines.find(l => /Toughest topic/.test(l));
  assert.ok(line.includes(`<b>${w.hardest.name}</b>, ${w.hardest.ok} of ${w.hardest.n} right`));
  assert.ok(/your lowest accuracy among the topics you answered 4 or more times\.$/.test(line), line);
  assert.ok(!/marks left/.test(JSON.stringify(list)), 'no claim about marks that was never computed');
  // the rule holds against the raw log
  const by = {};
  s.log.filter(x => /^[prt]$/.test(x[4])).forEach(x => { const t = D.qById[x[1]].topic; (by[t] = by[t] || { n: 0, ok: 0 }).n++; if (x[2]) by[t].ok++; });
  const eligible = Object.entries(by).filter(([, e]) => e.n >= E.MIN.hardest && e.ok < e.n);
  const low = Math.min(...eligible.map(([, e]) => e.ok / e.n));
  approx(w.hardest.acc, low);
  // one topic only: the lone 'Toughest topic' slide states the rule too
  const lone = WV._slides(Object.assign({}, w, { best: null }), r, {}).find(x => x.key === 'subjects');
  assert.ok(lone.lines.some(l => /lowest accuracy among the topics you answered 4 or more times/.test(l)));
});

/* ------------------------------------------------------------------ P2-73: sitting a paper never costs the streak (CA Inter Group II: 8, 10, 12 Jan 2027) */
const X27 = ST.EXAM_FALLBACK;
const setDate = (s, d) => { s.profile.examDate = d; s.profile.examSet = true; return s; };
test('P2-73: every official paper day and the day after bridge a run (no freeze used, not lengthened); a learner-set exam day bridges itself only', () => {
  // an unset learner: Papers 4, 5 and 6 (8, 10, 12 Jan) and each day after them keep a 6-day run alive with no freeze
  const u6 = fresh(); runDays(u6, '2027-01-07', 6);                                  // 2–7 Jan active
  let r = E.streak(u6, '2027-01-14', X27);
  assert.equal(r.current, 6, 'the run waits over the papers'); assert.equal(r.freezes, 0);
  assert.deepEqual(r.gate, ['2027-01-08', '2027-01-09', '2027-01-10', '2027-01-11', '2027-01-12', '2027-01-13']); assert.deepEqual(r.frozen, []);
  assert.deepEqual(E.freezePlan(u6, '2027-01-14', X27), [], 'nothing to freeze');
  on(u6, '2027-01-14'); assert.equal(E.streak(u6, '2027-01-14', X27).current, 7, 'exam days keep the run but do not lengthen it');
  assert.deepEqual(E.gateExams(fresh(), X27, '2027-01-05'), ['2027-01-08', '2027-01-10', '2027-01-12'], 'the official paper days');
  // a learner-set date that is an exam day: that day and the next bridge
  const six = setDate(fresh(), '2027-01-10'); runDays(six, '2027-01-09', 6);
  r = E.streak(six, '2027-01-12', X27);
  assert.equal(r.current, 6); assert.deepEqual(r.gate, ['2027-01-10', '2027-01-11']);
  const ten = setDate(fresh(), '2027-01-10'); runDays(ten, '2027-01-09', 10);
  r = E.streak(ten, '2027-01-12', X27);
  assert.equal(r.current, 10); assert.equal(r.freezes, 1, 'the freeze earned on day 7 is still held'); assert.deepEqual(E.freezePlan(ten, '2027-01-12', X27), []);
  const off = setDate(fresh(), '2027-01-09'); runDays(off, '2027-01-08', 6);
  assert.deepEqual(E.gateExams(off, X27, '2027-01-11'), [], 'a learner date that is not an exam day is not exempt');
  // a calendar with no paper published for its days: the date is assumed, nothing bridges
  const X0 = { cycles: [Object.assign({}, X27.cycles[0], { papers: {} })] };
  assert.deepEqual(E.gateExams(fresh(), X0, '2027-01-05'), [], 'an assumed exam day is never exempt');
  const a6 = fresh(); runDays(a6, '2027-01-07', 6);
  assert.equal(E.streak(a6, '2027-01-11', X0).current, 0, 'assumed: the gap breaks a run with no freeze');
});

test('P2-73: tick keeps the exam days that have passed, so a later date change keeps the old bridge', () => {
  const s = fresh(); runDays(s, '2027-01-07', 9);
  assert.equal(E.streak(s, '2027-01-09', X27).current, 9); assert.deepEqual(E.streak(s, '2027-01-09', X27).gate, ['2027-01-08']);
  const st = fakeStore(s);
  assert.deepEqual(E.tick(st, '2027-01-09', X27), [], 'no freeze needed'); assert.deepEqual(s.eng.gate, ['2027-01-08']); assert.equal(st.n, 1);
  E.tick(st, '2027-01-09', X27); assert.equal(st.n, 1, 'idempotent');
  setDate(s, '2027-05-14');
  assert.equal(E.streak(s, '2027-01-09', X27).current, 9, 'recorded exam days still bridge after the date changes');
  assert.deepEqual(Store._migrate(JSON.parse(JSON.stringify(s))).eng.gate, ['2027-01-08'], 'the store keeps eng.gate');
  const old = setDate(fresh(), '2027-01-10'); runDays(old, '2027-01-09', 10); old.eng.frozen = ['2027-01-10'];
  assert.equal(E.streak(old, '2027-01-11', X27).freezes, 1, 'a freeze an older version spent on the exam day is given back');
});

test('P2-73: Wrapped marks exam days (never as frozen days); the eve, the paper day and the day after say the streak is safe', () => {
  const s = setDate(fresh(), '2027-01-10'); runDays(s, '2027-01-09', 10); on(s, '2027-01-12');
  const w = E.wrapped(s, { exam: X27 }, { from: '2026-12-20', to: '2027-01-12', today: '2027-01-12' });
  assert.deepEqual(w.gate, ['2027-01-10', '2027-01-11']); assert.deepEqual(w.frozen, []);
  assert.deepEqual(w.series.filter(x => x.gate).map(x => x.day), ['2027-01-10', '2027-01-11']);
  assert.ok(w.series.every(x => !(x.gate && x.frozen)));
  assert.equal(w.streak, 11, 'the run inside the range continues over the exam');
  assert.equal(Object.fromEntries(WV._facts(w, { key: 'month' }, '2027-01-12'))['Exam days'], '10 Jan, 11 Jan', 'the numbers table lists them');
  assert.equal(E.gateLine(s, X27, '2027-01-09'), 'Tomorrow is Paper 5: your streak is safe tomorrow and the day after.');
  assert.equal(E.gateLine(s, X27, '2027-01-10'), 'Paper 5 today: your streak is safe today and tomorrow.');
  assert.equal(E.gateLine(s, X27, '2027-01-11'), 'Paper 5 was yesterday: your streak is safe today too.');
  assert.equal(E.gateLine(s, X27, '2027-01-13'), '');
  assert.equal(E.gateLine(fresh(), X27, '2027-01-07'), 'Tomorrow is Paper 4: your streak is safe tomorrow and the day after.', 'every official paper day, for an unset learner');
  assert.equal(E.gateLine(fresh(), X27, '2027-01-12'), 'Paper 6 today: your streak is safe today and tomorrow.', 'Papers 6A and 6B are one Paper 6');
  assert.equal(E.gateLine(fresh(), { cycles: [Object.assign({}, X27.cycles[0], { papers: {} })] }, '2027-01-07'), '', 'no line for an assumed date');
  assert.equal(E.streak(s, '2027-01-10', X27).atRisk, false, 'exam day is never "at risk"');
});

/* ------------------------------------------------------------------ P2-72: the exam season */
/** n days of real study ending at `end`: 4 answers and 12 minutes a day */
function studied(s, end, n) {
  for (let i = 0; i < n; i++) {
    const k = day(end, -i); s.act[k] = { s: 720, q: 4, c: 0, l: 0 };
    for (let j = 0; j < 4; j++) { const id = D.questions[(i * 4 + j) % D.questions.length].id; s.log.push([at(k, 9 + j * 0.1), id, j % 2, 30000, 'p']); s.q[id] = s.q[id] || { n: 0, ok: 0 }; s.q[id].n++; }
  }
  s.log.sort((a, b) => a[0] - b[0]);
  return s;
}
const DX = Object.assign({}, D, { exam: X27 });
test('P2-72: from exam day to 30 days after, a "CA Inter January 2027 season" range takes this week\'s place; recap() leads with it once the exam is over', () => {
  const s = studied(setDate(fresh(), '2027-01-08'), '2027-01-07', 18);
  const keys = t => E.ranges(s, t, X27).map(r => r.key);
  assert.deepEqual(keys('2027-01-07'), ['week', 'month', 'all']);
  assert.deepEqual(keys('2027-01-08'), ['season', 'month', 'all'], 'exam day');
  const sz = E.ranges(s, '2027-01-09', X27)[0];
  assert.deepEqual([sz.key, sz.label, sz.from, sz.to, sz.season, sz.exam.yours], ['season', 'CA Inter January 2027 season', '2026-12-21', '2027-01-08', 'done', true]);
  const rc = E.recap(s, DX, '2027-01-09');
  assert.equal(rc.range.key, 'season', 'the day after'); assert.equal(rc.href, '#/wrapped?range=season');
  assert.equal(E.recap(s, DX, '2027-01-08').range.key, 'month', 'on exam day the headline recap is still the month');
  assert.deepEqual(keys('2027-02-07'), ['season', 'month', 'all'], '+30 days');
  assert.equal(E.recap(s, DX, '2027-02-07').range.key, 'season');
  assert.deepEqual(keys('2027-02-08'), ['week', 'month', 'all'], '+31 days: the week is back');
  const later = JSON.parse(JSON.stringify(s)); setDate(later, '2027-05-14');
  assert.deepEqual(E.ranges(later, '2027-01-09', X27).map(r => r.key), ['week', 'month', 'all'], 'right after a new date is set the season ends');
  const w = E.wrapped(s, DX, Object.assign({ today: '2027-01-09' }, sz)), list = WV._slides(w, sz, { today: '2027-01-09' });
  assert.equal(list[list.length - 1].kicker, 'You sat CA Inter January 2027 on 8 Jan', 'only for a date the learner set');
  assert.ok(list[0].lines.some(l => /on the way to CA Inter January 2027\./.test(l)), 'the season intro line');
  const u = studied(fresh(), '2027-01-12', 20), uz = E.ranges(u, '2027-01-14', X27)[0];
  assert.deepEqual([uz.key, uz.to, uz.exam.yours], ['season', '2027-01-12', false], 'unset: the season ends with the last paper');
  const ul = WV._slides(E.wrapped(u, DX, Object.assign({ today: '2027-01-14' }, uz)), uz, {});
  assert.equal(ul[ul.length - 1].kicker, 'CA Inter January 2027 is over');
});

test('P2-72 / P2-36: the intro line follows the range length; the run is named for its range and the live streak stands beside it', () => {
  const s = studied(fresh(), T, 40), R = Object.fromEntries(E.ranges(s, T).map(r => [r.key, r]));
  const intro = r => WV._slides(E.wrapped(s, D, Object.assign({ today: T }, r)), r, { today: T })[0].lines[1];
  assert.ok(/Habits start exactly like this\.$/.test(intro(R.week)), intro(R.week));
  assert.ok(/A month is long enough for a habit to stick\.$/.test(intro(R.month)));
  assert.ok(/Seasons are built one day at a time\.$/.test(intro(R.all)));
  const ww = E.wrapped(s, D, Object.assign({ today: T }, R.week)), f = Object.fromEntries(WV._facts(ww, R.week, T));
  assert.equal(f['Longest run this week'], '4 days', 'Monday to Thursday');
  assert.equal(f['Current streak'], `40 days, since ${U.fmtDay(day(T, -39), { day: 'numeric', month: 'short' })}`);
  const sl = WV._slides(ww, R.week, { today: T, level: 2 }).find(x => x.key === 'streak');
  assert.equal(sl.rows[0].label, 'days: your longest run this week');
  assert.ok(sl.lines.some(l => /^Current streak: <b>40 days<\/b>, since /.test(l)));
  const wa = E.wrapped(s, D, Object.assign({ today: T }, R.all));
  assert.ok(!WV._slides(wa, R.all, { today: T }).find(x => x.key === 'streak').lines.some(l => /Current streak/.test(l)), 'all time: the longest streak is the current one, said once');
  assert.ok(Object.fromEntries(WV._facts(wa, R.all, T))['Longest streak']);
});

/* ------------------------------------------------------------------ P2-36: the empty state names the real gap */
test('P2-36: the Wrapped empty state\'s coral is the real gap ("Answer 5 more questions"), another range with a story wins, and the line says what is left', () => {
  const s = fresh(); runDays(s, day(T, -1), 2);
  for (let i = 0; i < 5; i++) s.log.push([at(day(T, -1), 9 + i * 0.1), D.questions[i].id, 1, 20000, 'p']);
  const w = E.wrapped(s, D, { today: T }), all = { key: 'all', label: 'All time' };
  assert.equal(w.enough, false); assert.deepEqual(E.gapOf(w), { days: 0, work: false, pyq: 5, cards: 20, ready: false });
  let m = WV._empty(w, all, [], s, D, T);
  assert.deepEqual(m.cta, { href: '#/pyq?practise=5', text: 'Answer 5 more questions' });
  assert.equal(m.line, 'Still to go: 5 more question answers (or a finished lesson, 20 card reviews or a test).');
  // no ICAI bank yet: questions and tests are never offered as a way in; the coral opens the syllabus when there is no lesson step either
  const D0 = Object.assign({}, D, { questions: [], qById: {} }), real0 = ST.nextStep;
  try {
    ST.nextStep = () => ({ kind: 'mock', label: 'Take a full mock', href: '#/test?new=mock' });
    const e0 = WV._empty(E.wrapped(fresh(), D0, { today: T }), all, [], fresh(), D0, T);
    assert.deepEqual(e0.cta, { href: '#/syllabus', text: 'Open the syllabus', syllabus: true }, 'never a mock or a question while the bank is empty');
    const c0 = fresh(); runDays(c0, day(T, -1), 1); c0.cards = {};
    assert.equal(WV._empty(E.wrapped(c0, D0, { today: T }), all, [], c0, D0, T).line, 'Still to go: one more active day and a finished lesson or 20 card reviews.');
  } finally { ST.nextStep = real0; }
  m = WV._empty(w, { key: 'week', label: 'This week' }, [{ key: 'month', label: 'This month' }], s, D, T);
  assert.deepEqual(m.cta, { to: 'month', text: 'Show this month' });
  const one = fresh(); on(one, T); for (let i = 0; i < 12; i++) one.log.push([at(T, 9 + i * 0.05), D.questions[i].id, 1, 20000, 'p']);
  const w1 = E.wrapped(one, D, { today: T }), g1 = E.gapOf(w1);
  assert.deepEqual([g1.days, g1.work], [1, true]);
  assert.equal(WV._empty(w1, all, [], one, D, T).line, 'Still to go: one more active day (tomorrow, at the earliest).');
  const none = E.wrapped(fresh(), D, { today: T }), mn = WV._empty(none, all, [], fresh(), D, T);
  assert.ok(/^#\//.test(mn.cta.href) && mn.cta.text, 'a real next step even with nothing at all');
  // a lesson step is D1's two-line coral (its label wraps inside the button instead of widening a phone page: verifier, Part A)
  const real = ST.nextStep;
  try {
    ST.nextStep = () => ({ kind: 'lesson', rule: 'start', label: 'Start here', title: 'Break-even point', id: 'cma.mc.bep', subject: 'os', minutes: 16, href: '#/l/cma.mc.bep' });
    assert.deepEqual(WV._empty(none, all, [], fresh(), D, T).cta,
      { href: '#/l/cma.mc.bep', text: 'Start here · Break-even point', kicker: 'Start here · Operating Systems · 16\u00a0min', title: 'Break-even point' });
    ST.nextStep = () => ({ kind: 'mock', label: 'Start a full mock', href: '#/test?new=mock' });
    assert.deepEqual(WV._empty(none, all, [], fresh(), D, T).cta, { href: '#/test?new=mock', text: 'Start a full mock' }, 'a step without a title stays one line');
  } finally { ST.nextStep = real; }
});

/* ------------------------------------------------------------------ P0-05 (verifier): the Last-mock trend */
test('P0-05: the Last-mock slide charts scored sittings only (a Not-scored paper is never a 0 % bar), and only full-length ones for a full mock', () => {
  const s = story();
  s.tests.push(rec('u2007', states(85, 'ungraded'), { kind: 'paper', title: 'GATE 2007 CS', started: at(day(T, -1), 10), finished: at(day(T, -1), 13), max: 150, attempted: 60 }));
  const w = E.wrapped(s, D, { today: T });
  assert.equal(w.mock.id, 'm2', 'the recapped one is the last scored full-length sitting');
  assert.deepEqual(w.trend.map(p => p.id), ['m1', 'm2'], 'no topic quiz beside a full paper, no unscored paper');
  const fig = WV._slides(w, { key: 'all', label: 'All time' }, { today: T }).find(x => x.key === 'mock').fig;
  assert.equal((fig.match(/<rect /g) || []).length, 2, 'one bar per scored sitting'); assert.ok(!/>0%</.test(fig), fig);
  const q = fresh(), sit = h => ({ started: at(T, h - 0.5), finished: at(T, h) });
  q.tests.push(rec('a', states(4, 'correct'), Object.assign({ score: 4, max: 4 }, sit(9))), rec('b', states(4, 'ungraded'), sit(10)), rec('c', states(4, i => (i ? 'correct' : 'wrong')), Object.assign({ score: 2.67, max: 4 }, sit(11))));
  assert.deepEqual(E.wrapped(q, D, { today: T }).trend.map(p => p.id), ['a', 'c'], 'short tests: every scored one, never the unscored');
});

/* ------------------------------------------------------------------ P3-05: one slide model */
test('P3-05: recap() counts the slides of the story it opens (GA.engage.slideKeys), so the home teaser draws one honest bar per slide', () => {
  const s = story(), rc = E.recap(s, D, T);
  const list = WV._slides(rc.w, rc.range, { today: T, level: 2 });
  assert.equal(rc.slides, list.length); assert.deepEqual(rc.keys, list.map(x => x.key));
  const c = fresh(); runDays(c, T, 3); Object.keys(c.act).forEach(k => (c.act[k] = { s: 300, q: 0, c: 12, l: 0 }));
  const rcc = E.recap(c, D, T);
  assert.deepEqual(rcc.keys, ['intro', 'time', 'learn', 'streak', 'summary']); assert.equal(rcc.slides, WV._slides(rcc.w, rcc.range, {}).length);
});

/* ------------------------------------------------------------------ P2-38: milestones and the Me header */
test('P2-38: a level reached, a freeze earned and a run that ended are news once (marks in state.seen); a profile seen for the first time is baselined quietly', () => {
  const s = fresh();
  for (let i = 0; i < 10; i++) s.lessons['l' + i] = { done: at(T, 9), visits: 1 };
  let m = E.milestones(s, null, T);
  assert.deepEqual(m.news.map(x => x.kind), ['level']); assert.equal(m.news[0].text, 'Level 2 reached · Rough work. 500 XP to level 3.');
  Object.assign(s.seen, m.news[0].set, m.quiet);
  assert.deepEqual(E.milestones(s, null, T).news, [], 'said once');
  runDays(s, T, 7); m = E.milestones(s, null, T);
  assert.deepEqual(m.news.map(x => x.kind), ['freeze']);
  assert.equal(m.news[0].text, 'Streak freeze earned for 7 active days in a row. You hold 1; each one covers a missed day.');
  Object.assign(s.seen, m.news[0].set, m.quiet);
  assert.deepEqual(s.seen['ms:run'], { since: day(T, -6), n: 7, last: T }, 'the run is followed quietly');
  m = E.milestones(s, null, day(T, 3));
  assert.deepEqual(m.news.map(x => x.kind), ['run']);
  assert.equal(m.news[0].text, `Your 7-day streak ran until ${U.fmtDay(T, { day: 'numeric', month: 'short' })}. It is still your best.`);
  assert.equal(m.news[0].set['ms:run'], null);
  const short = fresh(); runDays(short, T, 2); short.seen = { 'ms:v': 1, 'ms:level': 1, 'ms:freeze': 0, 'ms:run': { since: day(T, -1), n: 2, last: T } };
  m = E.milestones(short, null, day(T, 3)); assert.deepEqual(m.news, [], 'a 2-day run ending is not news'); assert.equal(m.quiet['ms:run'], null);
  const b = E.baseline(s, null, day(T, 3)), s2 = JSON.parse(JSON.stringify(s)); s2.seen = b;
  assert.deepEqual(E.milestones(s2, null, day(T, 3)).news, [], 'a first look announces nothing old');
  assert.equal(b['ms:v'], 1);
});

test('P2-38 / P2-49 / P2-75: Me header lines: level and streak once there is XP, the backup nudge after 7 active days (3 in iOS Safari), the import line on an empty hosted copy', () => {
  const s = fresh(); for (let i = 0; i < 10; i++) s.lessons['l' + i] = { done: at(T, 9), visits: 1 }; runDays(s, T, 9);
  const L = E.meLinesOf(s, null, T, {});
  assert.deepEqual(L.map(x => x.kind), ['level', 'streak', 'backup']);
  assert.equal(L[0].text, 'Level 2 · Rough work · 500 XP to level 3'); assert.equal(L[1].text, '9-day streak · 1 freeze saved');
  assert.equal(L[2].text, 'Not backed up yet · 9 active days · Export'); assert.equal(L[2].action, 'export');
  assert.deepEqual([L[2].lead, L[2].act], ['Not backed up yet · 9 active days', 'Export'], 'the shell draws act as the button');
  s.profile.lastExport = at(day(T, -3), 20);
  assert.equal(E.backupNudge(s, T, {}), null, '3 active days since the backup');
  assert.equal(E.backupNudge(s, T, { ios: true }).text, `Last backup ${U.fmtDay(day(T, -3), { day: 'numeric', month: 'short' })} · 3 active days since · Export`);
  assert.equal(E.backupNudge(s, T, { ios: true, standalone: true }), null, 'installed: the 7-day rule');
  s.profile.lastExport = null; assert.equal(E.backupNudge(s, T, { demo: true }), null, 'never on the demo profile');
  assert.deepEqual(E.meLinesOf(fresh(), null, T, { web: true }).map(x => x.kind), ['import']);
  assert.equal(E.meLinesOf(fresh(), null, T, { web: true })[0].text, 'Progress is saved in this browser · Studied on another device? Import your backup');
  assert.deepEqual(E.meLinesOf(fresh(), null, T, {}), [], 'file:// and a fresh profile: nothing to say');
});

test('P3-30: level names (a set of books, from rough work to signed off) ride along with the level number', () => {
  assert.deepEqual([1, 4, 5, 9, 10, 19, 20, 34, 35, 59, 60, 120].map(E.levelName),
    ['Rough work', 'Rough work', 'Working notes', 'Working notes', 'Trial balance', 'Trial balance', 'Balance sheet', 'Balance sheet', 'Audited', 'Audited', 'Signed off', 'Signed off']);
  assert.equal(E.levelOf(2600).name, 'Working notes'); assert.equal(E.levelOf(0).name, 'Rough work');
  const sl = WV._slides(E.wrapped(story(), D, { today: T }), { key: 'all', label: 'All time' }, { today: T, level: 7 }).find(x => x.key === 'streak');
  assert.ok(sl.rows.some(r => r.label === 'XP earned · level 7 now, Working notes'));
});

/* ------------------------------------------------------------------ P2-64: hinted answers */
test('P2-64: an answer after the Hint earns the later-correct 3 and leaves the 10 for the first unaided one; the log archive keeps hinted rows apart', () => {
  Store.init({ profile: 'engage-hint' }); Store.reset();
  const q = { id: 'cs-2018:CS7', marks: 1, type: 'MCQ' }, total = () => E.compute(Store.state, null, U.today()).xp.total;
  assert.equal(E.xpFor(Store.state, 'pyq', q.id, true, { hint: true }), 3);
  let b = total(); A.attempt(q, 'A', true, 20000, 'p', { hint: true }); assert.equal(total() - b, 3);
  assert.equal(Store.state.log[Store.state.log.length - 1][5], 'h');
  assert.equal(E.xpFor(Store.state, 'pyq', q.id, true), 10, 'the first unaided right answer still earns 10');
  b = total(); A.attempt(q, 'A', true, 20000, 'p'); assert.equal(total() - b, 10);
  assert.equal(E.xpFor(Store.state, 'pyq', q.id, false, { hint: true }), 1, 'a miss earns 1 either way');
  A.attempt(q, 'A', true, 1000, 't', { hint: true }); assert.equal(Store.state.log[Store.state.log.length - 1].length, 5, 'no hint flag inside a test');
  const s = fresh(); for (let i = 0; i < Store.LOG_CAP + 30; i++) s.log.push([at(day(T, -50)) + i * 1000, 'h' + (i % 40), i % 5 ? 1 : 0, 1000, 'p'].concat(i % 3 ? [] : ['h']));
  const before = E.compute(s, null, T).xp.total; Store._trimLog(s);
  assert.equal(E.compute(s, null, T).xp.total, before, 'trimming changes no total'); assert.ok(s.logArch.m.ph && s.logArch.m.p);
  assert.equal(E.wrapped(s, null, { today: T }).pyq.answered, Store.LOG_CAP + 30, 'Wrapped still counts every answer');
  Store.flushNow();
});

/* ------------------------------------------------------------------ P3-28: the study day */
test('P3-28: the study day starts at 4 a.m.: 23:50 and 00:30 are one day, 03:59 still that day, 04:00 the next; the same in six time zones and across DST', () => {
  const script = `
    globalThis.GA = {}; const R = ${JSON.stringify(path.join(__dirname, '..', 'app', 'js', 'core'))} + '/';
    const U = require(R + 'util.js'); require(R + 'srs.js'); require(R + 'stats.js'); const E = require(R + 'engage.js'), S = require(R + 'store.js'), A = require(R + 'actions.js');
    const at = (k, h, m) => { const [y, mo, d] = k.split('-').map(Number); return new Date(y, mo - 1, d, h, m || 0).getTime(); };
    const out = [], realNow = Date.now;
    for (const k of ['2026-03-07', '2026-03-28', '2026-10-03', '2026-10-31', '2027-02-05']) {
      const n = E.day.addDays(k, 1), t = [at(k, 23, 50), at(n, 0, 30), at(n, 3, 59), at(n, 4, 0)];
      Date.now = () => t[1]; const today = U.today();
      S.init({ profile: 'p328-' + k }); S.reset(); A.addActive(300); A.setLessonDone('os.x', true); const actKeys = Object.keys(S.state.act);
      Date.now = realNow;
      const s = S._blank(); t.forEach((x, i) => s.log.push([x, 'q' + i, 1, 1000, 'p']));
      U._dayStart = 0; const midnight = t.map(U.dayOf); U._dayStart = null;
      const [ny, nm, nd] = n.split('-').map(Number), keys = [t.map(x => U.dayKey(x)), U.dayKey(new Date(ny, nm - 1, nd)), U.dayKey(new Date(t[1])), U.fmtWhen(t[1])];
      out.push([k, t.map(U.dayOf), today, actKeys, Object.keys(E.ledger(s).days).sort(), midnight, new Date(U.parseDay(k)).getHours(), U.addDays(k, 1), U.daysBetween(k, E.day.addDays(k, 30)), U.dayBounds(k)[0] === U.parseDay(k).getTime(), keys]);
    }
    process.stdout.write(JSON.stringify(out));`;
  const zones = ['UTC', 'Pacific/Kiritimati', 'Pacific/Pago_Pago', 'America/New_York', 'Australia/Lord_Howe', 'Asia/Kolkata'];
  const runs = zones.map(TZ => cp.execFileSync(process.execPath, ['-e', script], { env: Object.assign({}, process.env, { TZ }) }).toString());
  runs.forEach((r, i) => assert.equal(r, runs[0], 'zone ' + zones[i]));
  JSON.parse(runs[0]).forEach(([k, days, today, actKeys, ledgerDays, midnight, hour, next, span30, bounds, keys]) => {
    const n = E.day.addDays(k, 1);
    assert.deepEqual(days, [k, k, k, n], k + ': 23:50, 00:30, 03:59 | 04:00');
    assert.equal(today, k, 'at 00:30 it is still the study day before'); assert.deepEqual(actKeys, [k], 'the act day follows the study day');
    assert.deepEqual(ledgerDays, [k, n]); assert.deepEqual(midnight, [k, n, n, n], 'dayStart 0: the calendar day');
    assert.equal(hour, 4); assert.equal(next, n); assert.equal(span30, 30); assert.equal(bounds, true);
    // every module that dates an event through U.dayKey(time stamp) agrees with U.today() after midnight; a Date is its calendar day
    assert.deepEqual(keys[0], days, 'U.dayKey(t) = U.dayOf(t)'); assert.equal(keys[1], n, 'a midnight Date keeps its calendar day');
    assert.equal(keys[2], n); assert.equal(keys[3], U.fmtDay(n) + ', 00:30', 'fmtWhen shows the calendar date beside the clock');
  });
});

/* ------------------------------------------------------------------ P3-27: one format per number */
test('P3-27: U.hm, U.pctMarks, a true minus sign in fmtMarks, fixed month names (Sep, never Sept) and fmtWhen', () => {
  assert.equal(U.hm(0), '0 min'); assert.equal(U.hm(45), '45 min'); assert.equal(U.hm(60), '1 h'); assert.equal(U.hm(640), '10 h 40 min'); assert.equal(WV._fmt.hm(640), U.hm(640));
  assert.equal(U.pctMarks(43.67, 100), '44%'); assert.equal(U.pctMarks(-3.33, 100), '−3%'); assert.equal(U.pctMarks(-0.2, 100), '0%'); assert.equal(U.pctMarks(1, 0), '—');
  assert.equal(U.fmtMarks(-1.67), '−1.67'); assert.equal(U.fmtMarks(43.67), '43.67'); assert.equal(U.fmtMarks(2), '2'); assert.equal(U.fmtMarks(-1e-12), '0'); assert.equal(U.fmtMarks(0.5), '0.5');
  assert.equal(U.fmtDay('2026-09-24'), '24 Sep 2026'); assert.equal(U.fmtDay('2026-09-24', { day: 'numeric', month: 'short' }), '24 Sep');
  assert.equal(U.fmtDay('2026-09-24', { weekday: 'short', day: 'numeric', month: 'short' }), 'Thu 24 Sep');
  assert.equal(U.fmtDay('2026-09-24', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }), 'Thu 24 Sep 2026');
  assert.equal(U.fmtDay('2027-02-06', { weekday: 'long', day: 'numeric', month: 'long' }), 'Saturday 6 February');
  assert.equal(U.fmtDay('2027-02-06', { month: 'long', year: 'numeric' }), 'February 2027');
  assert.equal(WV._fmt.span('2026-09-24', '2026-10-02'), '24 Sep – 2 Oct 2026');
  assert.equal(U.fmtWhen(new Date(2026, 9, 12, 12, 45).getTime()), '12 Oct 2026, 12:45'); assert.equal(U.fmtWhen(new Date(2026, 9, 12, 9, 5).getTime(), { year: false }), '12 Oct, 09:05');
  // Wrapped's test bars label each sitting with U.pctMarks: a negative score reads '−3%' (an empty bar), never '0%'
  const fig = WV._testsFig([{ id: 'a', pct: 0.4367, score: 43.67, max: 100 }, { id: 'b', pct: -0.0333, score: -3.33, max: 100 }], 'b');
  assert.ok(/>44%</.test(fig) && />−3%</.test(fig) && !/>0%</.test(fig), fig);
});

/* ------------------------------------------------------------------ P3-39 (Part C): a figure reads or makes way; a full slide drops details */
test('P3-39: a figure is drawn only at 70 % of its full-width size or more with labels of 8 px or more, never as a sliver', () => {
  const R = WV._figRule;
  assert.deepEqual(WV.FIG, { scale: 0.7, label: 8 });
  // the verifier's 360x640 slivers: a 292 px wide figure left 29, 13 and 3 px of height makes way
  assert.equal(R(292, 29, 0, 374, 160, 12.5), false, 'subjects'); assert.equal(R(292, 13, 0, 374, 207, 12), false, 'learning'); assert.equal(R(292, 3, 0, 374, 140, 12), false, 'last mock');
  assert.equal(R(307, 77, 0, 374, 172, 12), false, '375x667 dots at 54 %');
  assert.equal(R(318, 136, 0, 374, 160, 12.5), true, 'full size on a 390 px phone');
  assert.equal(R(374, 99, 0, 374, 140, 12), true, 'a short laptop: 71 %, labels 8.5 px');
  assert.equal(R(374, 117, 0, 374, 207, 12), false, '57 % is too small');
  // the label rule: a 12-unit label at full width on a 320 px phone is 8.1 px, so that figure shows only at full size
  assert.equal(R(252, 101, 0, 374, 150, 12), true); assert.equal(R(252, 95, 0, 374, 150, 12), false);
  // the intro calendar is at most 340 px wide; a figure without labels follows the size rule alone
  assert.equal(R(374, 107, 340, 374, 160, 13), true); assert.equal(R(374, 100, 0, 374, 172, 0), false); assert.equal(R(374, 125, 0, 374, 172, 0), true);
  assert.equal(R(0, 100, 0, 374, 160, 12), false, 'no width'); assert.equal(R(300, -5, 0, 374, 160, 12), false, 'no room');
});
test('P3-39: every figure states its smallest label (12 units or more); only details may go on a short card, never the line a link stands on', () => {
  const s = story(), w = E.wrapped(s, D, { today: T }), list = WV._slides(w, { key: 'all', label: 'All time' }, { today: T, lessonsTotal: 40, lessonsDone: 2 });
  const figs = list.filter(x => x.fig);
  assert.ok(figs.length >= 4, figs.map(x => x.key).join());
  for (const x of figs) {
    const fs = +(/data-fs="([\d.]+)"/.exec(x.fig) || [])[1], sizes = (x.fig.match(/font-size="[\d.]+"/g) || []).map(t => +t.slice(11, -1));
    assert.ok(sizes.length, x.key + ' has labels');
    assert.equal(fs, Math.min(...sizes), x.key + ': data-fs is its smallest label'); assert.ok(fs >= 12, x.key + ': ' + fs);
  }
  for (const x of list) {
    for (const k of x.drop || []) assert.ok(k >= 0 && k < x.lines.length, x.key + ': drop index ' + k);
    assert.equal(new Set(x.drop || []).size, (x.drop || []).length, x.key + ': no index twice');
  }
  const by = k => list.find(x => x.key === k);
  const sub = by('subjects'); assert.ok(sub.link && sub.lines.length === 2 && sub.drop.indexOf(1) < 0, 'the toughest-topic line, which the Practise link stands on, stays');
  const mock = by('mock'); assert.deepEqual(mock.drop, [2, 1], 'the accuracy line goes first, then the change; the title stays');
  assert.ok(by('intro').drop.indexOf(0) < 0, 'the dates line stays (short phones hide the subtitle)');
  // the HTML marks the droppable lines in order
  const html = WV._slideHTML ? WV._slideHTML(mock, 0, 1) : null;
  if (html) assert.ok(/<li data-drop="1">[^<]*<b>/.test(html) && /<li data-drop="0">\d+%/.test(html), html);
});

/* ------------------------------------------------------------------ P2-36 (Part C): the Me menu's Wrapped item uses the same gate */
test('P2-36: with no recap the root carries data-eg-norecap (engage.css hides the Me menu\'s Wrapped item); a recap removes it', () => {
  const fs = require('fs');
  const script = `
    const attrs = {};
    globalThis.document = { documentElement: { toggleAttribute(k, on) { if (on) attrs[k] = ''; else delete attrs[k]; return !!on; } }, addEventListener() {}, querySelector() { return null; } };
    const R = ${JSON.stringify(path.join(__dirname, '..'))} + '/';
    globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } }; globalThis.GA = {};
    { const FX = require(R + 'tests/fixtures/catalogue.js'), NS = require(R + 'tests/next-states.js');
      if (NS.enough(FX.real())) require(R + 'data/manifest.js'); else FX.register(GAD); }
    ['util', 'srs', 'scoring', 'store', 'actions', 'stats', 'data', 'engage'].forEach(m => require(R + 'app/js/core/' + m + '.js'));
    const D = GA.data.init(), S = GA.store, E = GA.engage, U = GA.util;
    S.init({ profile: 'p236' }); S.reset();
    E.gateMenu(); const fresh = 'data-eg-norecap' in attrs;
    const qs = D.questions.filter(q => q.hasKey).slice(0, 12), today = U.today(), y = U.addDays(today, -1);
    S.update(s => {
      [y, today].forEach((k, j) => { s.act[k] = { s: 1200, q: 6, c: 0, l: 0 }; for (let i = 0; i < 6; i++) s.log.push([+U.parseDay(k) + 5 * 3600e3 + i * 60e3, qs[j * 6 + i].id, 1, 30000, 'p']); });
    }, 'test');
    E.gateMenu(); const after = 'data-eg-norecap' in attrs;
    S.flushNow(); S.reset();
    process.stdout.write(JSON.stringify({ fresh, after, recap: !!E.recap(S.state, D, today) }));`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script]).toString());
  assert.equal(r.fresh, true, 'a fresh profile: the item waits');
  assert.equal(r.after, false, 'two active days with 12 answers: the item shows');
  const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'engage.css'), 'utf8');
  assert.ok(/\[data-eg-norecap\]\s+\.me-menu a\.mi\[data-href="\/wrapped"\]\s*\{\s*display:\s*none/.test(css), 'engage.css hides only that item');
});
test('Wrapped: the subjects figure always shows the strongest subject the slide names, solid', () => {
  const sub = (id, n, ok) => ({ id, name: id.toUpperCase(), short: id.toUpperCase(), n, ok, acc: ok / n });
  const w = { subjects: [sub('a', 30, 12), sub('b', 25, 10), sub('c', 20, 9), sub('d', 18, 7), sub('e', 15, 6), sub('la', 7, 6)], best: sub('la', 7, 6), hardest: null,
    pyq: { answered: 115, distinct: 100, correct: 50, acc: 0.43, firstTry: { n: 0 } }, enough: true, days: 7, activeDays: 3, from: T, to: T, minutes: 0, labs: { solved: 0, runs: 0 }, tests: [] };
  const fig = WV._slides(w, { key: 'all', label: 'All time' }, { today: T }).find(x => x.key === 'subjects').fig;
  assert.ok(/>LA</.test(fig), 'the strongest subject is drawn'); assert.equal((fig.match(/>[A-Z]+</g) || []).length, 5, 'still five rows');
  assert.ok(/>LA<\/text><rect[^>]*\/><rect[^>]*opacity="1"/.test(fig), 'and it is the solid one');
});
test('Wrapped: the season label is one inline item (the picker\'s flex gap never splits its words); the last slide lights its progress bar', () => {
  const lab = WV._rangeLabel;
  assert.equal(lab({ key: 'season', label: 'CA Inter January 2027 season' }), '<span>CA Inter January 2027<span class="wr-rl"> season</span></span>', 'one child of the button');
  assert.equal(lab({ key: 'season', label: 'Your exam season' }), '<span>Your exam<span class="wr-rl"> season</span></span>');
  assert.equal(lab({ key: 'month', label: 'This month' }), 'This month', 'other ranges are plain text');
  assert.equal(lab({ key: 'season', label: 'A <b> season' }), '<span>A &lt;b&gt;<span class="wr-rl"> season</span></span>', 'escaped');
  const css = require('fs').readFileSync(path.join(__dirname, '..', 'app', 'css', 'engage.css'), 'utf8');
  assert.ok(/\.wr-card\.last \.wr-seg\.now i::after\s*\{\s*animation:\s*none;\s*width:\s*100%/.test(css), 'the story stops on its last slide with a full bar');
  assert.ok(/\.wr-slide:not\(:has\(\.wr-masc\)\) \.wr-k\s*\{\s*max-width:\s*none/.test(css), 'the kicker keeps clear of Tick only where Tick is');
});
test('P2-38: the milestone toast keeps Tick\'s head at 28 px beside a long line (the span never shrinks, the svg is not capped by it)', () => {
  const css = require('fs').readFileSync(path.join(__dirname, '..', 'app', 'css', 'engage.css'), 'utf8');
  assert.ok(/\.toast \.t-peak\s*\{[^}]*flex:\s*none/.test(css), 'the head span is not a shrinking flex item');
  assert.ok(/\.toast \.t-peak svg\.mascot\s*\{[^}]*max-width:\s*none/.test(css), 'and base.css\'s svg max-width: 100% does not follow the span');
  assert.ok(/width="28" height="28"/.test(M.svg({ size: 28, mood: 'happy', gaze: 'right' })), 'the head is drawn at 28 px');
});
