/* core/planner.js (owner WP6): the one phase function and the road (P0-20), the day's snapshot that completes (P0-19), one recipe per phase
   and season (P1-45, P1-61), the pace line and 'Add one more task' (D18). Small synthetic catalogue for the mechanics, the real one for the
   recipes and the agreement with the shared next step (docs/ARCHITECTURE.md §10.3, §10.8). */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
require('../app/js/core/util.js'); require('../app/js/core/srs.js');
const Stats = require('../app/js/core/stats.js');
const P = require('../app/js/core/planner.js'); const Store = require('../app/js/core/store.js');
const U = GA.util;
const T = '2026-10-10';
const at = (day, h) => new Date(day + 'T' + String(h == null ? 12 : h).padStart(2, '0') + ':00:00').getTime();   // local time on that day
const NOW = at(T);

/* ---- a small catalogue for the mechanics ---- */
const D = {
  subjects: [{ id: 'os', name: 'OS', hue: 1, topics: [{ id: 'os.a', name: 'A', status: 'in', subtopics: [{ id: 'os.a.x' }, { id: 'os.a.y' }] }] }, { id: 'db', name: 'DB', hue: 2, topics: [{ id: 'db.a', name: 'A', status: 'in', subtopics: [{ id: 'db.a.x' }] }] }, { id: 'cn', name: 'CN', hue: 3, topics: [{ id: 'cn.a', name: 'A', status: 'in', subtopics: [{ id: 'cn.a.x' }] }] }],
  lessons: [{ id: 'os.a.x', title: 'OS lesson', subject: 'os', topic: 'os.a', minutes: 15, needs: [], tier: 'core', status: 'in' }, { id: 'os.a.y', title: 'OS lesson two', subject: 'os', topic: 'os.a', minutes: 20, needs: ['os.a.x'], tier: 'core', status: 'in' }],
  cards: [{ id: 'os.a.x#1', lesson: 'os.a.x', subject: 'os', topic: 'os.a' }], questions: [], topicMarks: {}
};
D.lessonById = Object.fromEntries(D.lessons.map(l => [l.id, l])); D.subjectById = Object.fromEntries(D.subjects.map(s => [s.id, s]));
D.nodes = {}; D.subjects.forEach(s => { D.nodes[s.id] = s; s.topics.forEach(t => { D.nodes[t.id] = t; t.subtopics.forEach(n => (D.nodes[n.id] = n)); }); });
for (let i = 0; i < 30; i++) D.questions.push({ id: 'os:' + i, subject: 'os', topic: 'os.a', subtopic: i < 6 ? 'os.a.x' : null, marks: 2, hasKey: true });
for (let i = 0; i < 10; i++) D.questions.push({ id: 'db:' + i, subject: 'db', topic: 'db.a', subtopic: null, marks: 2, hasKey: true });
for (let i = 0; i < 20; i++) D.questions.push({ id: 'cn:' + i, subject: 'cn', topic: 'cn.a', subtopic: null, marks: 2, hasKey: true });
D.qById = Object.fromEntries(D.questions.map(q => [q.id, q]));
/* a synthetic exam cycle with exam days but no published paper days, so the 'assumed date' mechanics stay tested (the shipped CA cycle
   names every Group II paper day: see the CA tests at the end of this file) */
const TEST_CYCLE = { id: 'test-2027', label: 'Test exam 2027', organiser: 'Test', days: ['2027-02-06', '2027-02-07', '2027-02-13', '2027-02-14', '2027-02-20', '2027-02-21'], papers: {}, result: '2027-03-19', source: 'https://example.org', checked: '2026-10-16' };
D.exam = { cycles: [TEST_CYCLE] };
const fresh = (examDate, set) => { const s = Store._blank(); s.profile.examDate = examDate || '2027-02-06'; s.profile.examSet = set == null ? !!examDate : set; return s; };
const E = (today, date, basis) => { const dl = date ? U.daysBetween(today, date) : null; return { date, set: basis === 'yours', basis: date ? basis || 'yours' : null, label: 'Test exam 2027', cycle: null, daysLeft: dl, last: dl != null && dl < 0 ? { date, label: 'Test exam 2027', cycle: null, daysAgo: -dl } : null }; };
const noI = { I: null };

/* ================================================================ the one phase function and the road (P0-20) */
test('phaseOf: half-open ranges at every boundary (learn > 100, practise 46–100, mocks 15–45, final 0–14, nothing after the exam)', () => {
  const want = { 101: 'learn', 100: 'practice', 99: 'practice', 46: 'practice', 45: 'mocks', 44: 'mocks', 15: 'mocks', 14: 'final', 13: 'final', 1: 'final', 0: 'final', '-1': null };
  for (const [d, id] of Object.entries(want)) assert.equal(P.phaseOf(+d), id, d + ' days');
  assert.equal(P.phaseOf(null), null);
});

test('road: for today at each boundary the current phase matches phaseOf, ranges never share a day, and only days left are counted', () => {
  const X = '2027-02-06';
  for (const d of [101, 100, 99, 46, 45, 44, 15, 14, 13, 1, 0]) {
    const today = U.addDays(X, -d), ph = P.phases(today, X);
    assert.deepEqual(ph.map(p => p.id), ['learn', 'practice', 'mocks', 'final'], d + ' days');
    const cur = ph.filter(p => p.current);
    assert.equal(cur.length, 1, 'one current phase at ' + d);
    assert.equal(cur[0].id, P.phaseOf(d), 'road and phaseOf agree at ' + d + ' days');
    assert.equal(cur[0].from, today, 'the current phase starts today (clamped) at ' + d);
    const lo = { learn: 101, practice: 46, mocks: 15, final: 0 }[cur[0].id];
    assert.equal(cur[0].days, d - lo + 1, 'days left in the phase at ' + d);
    assert.deepEqual([1, 2, 3].map(i => U.daysBetween(ph[i - 1].to, ph[i].to)), [55, 31, 15], 'contiguous, no shared boundary day (practise 55, mocks 31, final 15 days)');
    ph.forEach(p => { if (p.state === 'done') { assert.ok(p.to < today, 'a past phase ended before today'); assert.equal(p.days, 0); } if (p.state === 'ahead') assert.ok(p.from > today); });
    ph.filter(p => p.from && p.to).forEach(p => assert.ok(p.from <= p.to, `${p.id} ${p.from} → ${p.to} is not inverted (${d} days)`));
  }
  const ph = P.phases('2026-10-30', X);                   // the audit's example: 99 days left
  assert.equal(ph[0].state, 'done'); assert.equal(ph[0].to, '2026-10-28');
  assert.equal(ph[1].state, 'current'); assert.equal(ph[1].to, '2026-12-22'); assert.equal(ph[1].days, 54);
  assert.deepEqual([ph[2].from, ph[2].to, ph[2].days], ['2026-12-23', '2027-01-22', 31]);
  assert.deepEqual([ph[3].from, ph[3].to, ph[3].days], ['2027-01-23', '2027-02-06', 15]);
  assert.ok(P.phases('2027-02-07', X).every(p => p.state === 'done'), 'after the exam every phase is done');
  assert.deepEqual(P.phases(T, null), [], 'no exam date, no road');
});

test('road spans: the bar lengths add up to the days from the season start to the exam', () => {
  const ph = P.phases('2026-10-30', '2027-02-06', { start: '2026-09-01' });
  assert.equal(ph.reduce((a, p) => a + p.span, 0), U.daysBetween('2026-09-01', '2027-02-06') + 1);
  assert.equal(P.phases('2026-10-30', '2027-02-06').find(p => p.id === 'learn').span, 0, 'a learner who starts after the learn phase sees no learn segment');
});

test('one phase on the phase-change days: header (build.phase), road, weekly table and the checklist agree', () => {
  const X = '2027-02-06';
  for (const today of ['2026-10-29', '2026-12-23', '2027-01-23']) {
    const s = fresh(X, true), b = P.build(s, D, today, noI);
    const d = U.daysBetween(today, X);
    assert.equal(b.phase, P.phaseOf(d), today);
    assert.equal(b.current.id, b.phase, 'road ' + today);
    assert.equal(b.weeks[0].phase, b.phase, 'weekly table ' + today);
    if (b.phase === 'mocks') assert.ok(b.day.tasks.some(t => t.kind === 'mock'), 'the mock phase asks for a mock on its first day');
    if (b.phase === 'practice') assert.ok(!b.day.tasks.some(t => t.kind === 'mock'), 'no mock while the header says Practise');
  }
});

test('weekly table: weeks are consecutive, end on exam day and carry the phase of their first day', () => {
  const s = fresh('2027-02-06', true), b = P.build(s, D, T, noI);
  assert.equal(b.weeks[0].from, T); assert.equal(b.weeks[1].from, '2026-10-17');
  assert.equal(b.weeks[b.weeks.length - 1].to, '2027-02-06', 'the last row reaches exam day');
  b.weeks.forEach(w => assert.equal(w.phase, P.phaseOf(U.daysBetween(w.from, '2027-02-06'))));
});

/* ================================================================ weights */
test('marks shares add to 1, track the bank, and switch to the like-for-like marks a paper when it exists (P1-03)', () => {
  const sh = P.shares(D, null); approx(sh.os + sh.db + sh.cn, 1); approx(sh.os, 0.5);
  const I = { subjects: [{ id: 'os', perPaper: 6 }, { id: 'db', perPaper: 3 }, { id: 'cn', perPaper: 1 }] };
  const s2 = P.shares(D, I); approx(s2.os, 0.6); approx(s2.cn, 0.1);
});
test('weekly focus puts the high-yield weak subject first and rotates as it improves', () => {
  const s = fresh(); const f = P.weeklyFocus(s, D, T, 6, noI);
  assert.equal(f[0][0], 'os');
  assert.ok(f.some(w => w.includes('cn')) && f.some(w => w.includes('db')), 'other subjects get a turn');
  assert.ok(new Set(f.map(w => w[0])).size >= 2, 'the lead subject changes over the weeks');
});
test('while learning, subjects without any lesson are down-weighted', () => {
  const av = P.availability(D); approx(av.os, 1); approx(av.db, 0.4);
});

/* ================================================================ the day's snapshot (P0-19) */
test("today's plan: revision first, then the next lesson, then practice; the first open task is the plan's next", () => {
  const s = fresh();
  s.q['os:7'] = { n: 1, ok: 0, last: NOW - 3 * 864e5, lastOk: 0, srs: { due: T, ivl: 0, ease: 2.3, reps: 0, lapses: 0, last: T } }; s.nb['os:7'] = { reason: null, resolved: null, added: NOW - 3 * 864e5 };
  const v = P.day(s, D, T, noI);
  assert.equal(v.tasks[0].kind, 'revise'); assert.equal(v.tasks[0].id, 'retry');
  assert.ok(v.tasks.some(t => t.kind === 'learn' && t.lesson === 'os.a.x'));
  assert.ok(v.tasks.some(t => t.kind === 'practice'));
  assert.equal(v.next.id, 'retry'); assert.equal(v.left, v.tasks.length); assert.equal(v.fresh, true);
  assert.equal(v.tasks.find(t => t.id === 'retry').href, '#/notebook?retry=5', 'rows open their exact session (§10.4)');
});

test('P0-19: a finished row ticks instead of being swapped, and the day can be completed', () => {
  const s = fresh();
  const v0 = P.day(s, D, T, noI);
  s.plan = P.stored(v0);                                    // what current() keeps in state.plan
  const ids = v0.tasks.map(t => t.id);
  // do everything on the list, the way the learner would
  s.lessons['os.a.x'] = { first: NOW, last: NOW, done: NOW + 1000, secs: 900, visits: 1, quiz: {} };
  for (const t of v0.tasks.filter(t => t.kind === 'practice')) {
    const f = q => (t.scope.sub ? q.subtopic === t.scope.sub : t.scope.topic ? q.topic === t.scope.topic : q.subject === t.scope.subject);
    D.questions.filter(f).slice(0, t.target).forEach((q, i) => s.log.push([NOW + 2000 + i, q.id, 1, 30000, 'p']));
  }
  const v1 = P.day(s, D, T, noI);
  assert.equal(v1.fresh, false, 'same day, exam date, minutes and route: the stored list is kept');
  assert.deepEqual(v1.tasks.map(t => t.id), ids, 'no row is replaced by another');
  assert.ok(v1.tasks.every(t => t.done), JSON.stringify(v1.tasks.map(t => [t.id, t.done, t.progress])));
  assert.equal(v1.done, true); assert.equal(v1.left, 0); assert.equal(v1.next, null);
  const pr = v1.tasks.find(t => t.kind === 'practice'); assert.equal(pr.progress, pr.target + '/' + pr.target);
});

test('P0-19: the list is rebuilt only when the day, the exam date, the daily minutes or the route change', () => {
  const s = fresh(); s.plan = P.stored(P.day(s, D, T, noI));
  assert.equal(P.day(s, D, T, noI).fresh, false);
  assert.equal(P.day(s, D, U.addDays(T, 1), noI).fresh, true, 'a new day');
  s.profile.goals.minutes = 60; assert.equal(P.day(s, D, T, noI).fresh, true, 'new daily minutes');
  s.profile.goals.minutes = 90; s.profile.examDate = '2027-02-13'; assert.equal(P.day(s, D, T, noI).fresh, true, 'new exam date');
  s.profile.examDate = '2027-02-06'; s.profile.route = 'crash'; assert.equal(P.day(s, D, T, noI).fresh, true, 'new route');
  s.profile.route = null; assert.equal(P.day(s, D, T, noI).fresh, false, 'back to the stored key');
  s.plan = { day: T, tasks: 'junk' }; assert.equal(P.day(s, D, T, noI).fresh, true, 'a malformed stored plan is rebuilt, never trusted');
});

test('judging rows from state: cards (reviewed with none due), retries (past misses answered today), mock and re-read', () => {
  const s = fresh();
  s.cards['os.a.x#1'] = { due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -3) };
  for (let i = 0; i < 6; i++) { const id = 'cn:' + i; s.q[id] = { n: 1, ok: 0, last: NOW - 5 * 864e5, lastOk: 0, srs: { due: T, ivl: 1, ease: 2.3, reps: 0, lapses: 1, last: U.addDays(T, -5) } }; s.nb[id] = { reason: null, resolved: null, added: NOW - 5 * 864e5 }; }
  s.lessons['os.a.x'] = { first: NOW - 30 * 864e5, last: NOW - 20 * 864e5, done: NOW - 20 * 864e5, secs: 600, visits: 1, quiz: {} };
  const v = P.day(s, D, T, noI); s.plan = P.stored(v);
  const row = (x, id) => x.tasks.find(t => t.id === id);
  assert.ok(row(v, 'cards') && row(v, 'retry') && row(v, 'reread:os.a.x'), v.tasks.map(t => t.id).join());
  assert.equal(row(v, 'retry').target, 5);
  // review the card (now due later), retry three past misses and a brand-new miss, open the lesson again
  s.cards['os.a.x#1'] = { due: U.addDays(T, 6), ivl: 6, ease: 2.5, reps: 3, lapses: 0, last: T }; s.act[T] = { s: 0, q: 4, c: 1, l: 0 };
  ['cn:0', 'cn:1', 'cn:2'].forEach((id, i) => s.log.push([NOW + i, id, 1, 30000, 'p']));
  s.log.push([NOW + 9, 'db:1', 0, 30000, 'p']); s.nb['db:1'] = { reason: null, resolved: null, added: NOW + 9 };
  s.lessons['os.a.x'].last = NOW + 50;
  const v2 = P.day(s, D, T, noI);
  assert.equal(v2.fresh, false);
  assert.equal(row(v2, 'cards').done, true);
  assert.equal(row(v2, 'retry').progress, '3/5', 'a miss made today is not a retry');
  assert.equal(row(v2, 'retry').done, false);
  assert.equal(row(v2, 'reread:os.a.x').done, true);
});

test('the mock phase plans a mock when none was sat in the last three days, and a finished mock ticks it', () => {
  const s = fresh('2026-11-20', true);                     // 41 days: mock tests
  const v = P.day(s, D, T, noI);
  assert.ok(v.tasks.some(t => t.kind === 'mock'));
  assert.ok(!v.tasks.some(t => t.kind === 'learn'), 'a mock day does not also plan lessons and PYQs');
  assert.ok(/longer than your 1\.5 h a day/.test(v.tasks.find(t => t.kind === 'mock').why), 'says plainly that 3 hours is more than the daily time');
  s.plan = P.stored(v); s.tests.push({ id: 't1', kind: 'mock', started: NOW, finished: NOW + 1000 });
  assert.equal(P.day(s, D, T, noI).tasks.find(t => t.kind === 'mock').done, true);
  const s2 = fresh('2026-11-20', true); s2.tests.push({ id: 't0', kind: 'mock', started: NOW - 864e5, finished: NOW - 864e5 + 1000 });
  assert.ok(!P.day(s2, D, T, noI).tasks.some(t => t.kind === 'mock'), 'a mock yesterday: not again today');
});

/* ---- P1-45 (Part C, verifier): a mock day and a same-day rebuild never plan more than the daily time ---- */
const withRevision = s => {                               // one due card, six misses due for a retry, a lesson due for a re-read
  s.cards['os.a.x#1'] = { due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -3) };
  for (let i = 0; i < 6; i++) { const id = 'cn:' + i; s.q[id] = { n: 1, ok: 0, last: NOW - 5 * 864e5, lastOk: 0, srs: { due: T, ivl: 1, ease: 2.3, reps: 0, lapses: 1, last: U.addDays(T, -5) } }; s.nb[id] = { reason: null, resolved: null, added: NOW - 5 * 864e5 }; }
  s.lessons['os.a.x'] = { first: NOW - 30 * 864e5, last: NOW - 20 * 864e5, done: NOW - 20 * 864e5, secs: 600, visits: 1, quiz: {} };
  return s;
};
test('P1-45 (Part C): a mock day fits the daily time: the full mock when it fits, else a part of it; revision only beside it', () => {
  for (const m of [30, 45, 60, 90, 150, 180, 204, 240]) {
    const s = withRevision(fresh('2026-11-20', true)); s.profile.goals.minutes = m;   // 41 days: mock tests
    const v = P.day(s, D, T, noI), mk = v.tasks.find(t => t.kind === 'mock');
    assert.ok(mk, m + ' min: a mock day');
    assert.ok(v.minutesPlanned <= m, `${v.minutesPlanned} of ${m} min planned`);
    assert.equal(mk.minutes, Math.min(180, m), m + ' min');
    assert.ok(!v.tasks.some(t => t.kind === 'learn' || t.kind === 'practice'), 'a mock day plans no lessons or PYQs');
    if (m < 180) {
      assert.equal(mk.title, `Start a full mock: sit for ${P.minTxt(m)}, then pause`);
      assert.ok(new RegExp(`longer than your ${P.minTxt(m).replace('.', '\\.')} a day: sit it in ${Math.ceil(180 / m)} parts`).test(mk.why), mk.why);
      assert.equal(v.tasks.length, 1, 'the part takes the whole daily time: revision waits a day');
    } else assert.equal(mk.title, 'Sit a full-length mock (3 hours)');
    if (m >= 204) assert.deepEqual(v.tasks.map(t => t.id), ['cards', 'retry', 'reread:os.a.x', 'mock'], 'revision first when it fits beside the mock');
    if (m === 180) assert.deepEqual(v.tasks.map(t => t.id), ['mock']);
  }
  const s = fresh('2026-11-20', true); s.profile.goals.minutes = 20;   // shorter than any part: an ordinary day, said in the header
  assert.ok(!P.day(s, D, T, noI).tasks.some(t => t.kind === 'mock'));
  assert.equal(P.phaseLine('mocks', 20), P.PHASE_TXT.mocksNone);
  assert.equal(P.phaseLine('mocks', 90), P.PHASE_TXT.mocksSplit); assert.equal(P.phaseLine('mocks', 180), P.PHASE_TXT.mocks); assert.equal(P.phaseLine('learn', 90), P.PHASE_TXT.learn);
});

test('P1-45 (Part C): a part of a mock is judged by the clock of the test in progress; the next day continues it until it is submitted', () => {
  const s = fresh('2026-11-20', true); s.profile.goals.minutes = 60;
  const v0 = P.day(s, D, T, noI); s.plan = P.stored(v0);
  const mk0 = v0.tasks.find(t => t.kind === 'mock');
  assert.equal(mk0.minutes, 60); assert.equal(mk0.href, '#/test?new=mock');
  s.live = { id: 'L1', kind: 'mock', title: 'Mock 1 · 10 Oct', qids: ['os:1', 'os:2', 'os:3'], responses: { 'os:1': 'A', 'os:2': '' }, limitMs: 180 * 60000, elapsedMs: 25 * 60000 };
  let j = P.day(s, D, T, noI).tasks.find(t => t.kind === 'mock');
  assert.equal(j.done, false); assert.equal(j.progress, '25/60 min');
  s.live.elapsedMs = 60 * 60000;
  assert.equal(P.day(s, D, T, noI).tasks.find(t => t.kind === 'mock').done, true, "today's part is done once the clock shows 60 minutes");
  const T1 = U.addDays(T, 1), v1 = P.day(s, D, T1, noI), mk1 = v1.tasks.find(t => t.kind === 'mock');
  assert.equal(mk1.title, 'Continue your mock: sit for 60 min (2 h left)'); assert.equal(mk1.href, '#/test/run/L1', 'opens the test in progress');
  assert.ok(/Mock 1 · 10 Oct: 1 of 3 answered/.test(mk1.why), mk1.why);
  assert.ok(v1.minutesPlanned <= 60 && !v1.tasks.some(t => t.kind === 'learn'), v1.tasks.map(t => t.id).join());
  s.live.elapsedMs = 130 * 60000;                          // more than planned on day 2: day 3 finishes what is left
  const T2 = U.addDays(T, 2), mk2 = P.day(s, D, T2, noI).tasks.find(t => t.kind === 'mock');
  assert.equal(mk2.title, 'Finish your mock (50 min left)'); assert.equal(mk2.minutes, 50);
  s.plan = P.stored(P.day(s, D, T2, noI));
  s.tests.push({ id: 'L1', kind: 'mock', started: NOW, finished: at(T2, 11), qids: [] }); s.live = null;
  assert.equal(P.day(s, D, T2, noI).tasks.find(t => t.kind === 'mock').done, true, 'submitted: ticked');
  assert.ok([1, 2].every(k => !P.day(s, D, U.addDays(T2, k), noI).tasks.some(t => t.kind === 'mock')), 'two days of lessons after a mock');
  assert.ok(P.day(s, D, U.addDays(T2, 3), noI).tasks.some(t => t.kind === 'mock'), 'then the next mock day');
  // the final stretch: a mock in progress comes first (the shared step's first rule is the test in progress), the chain follows if it fits
  const f = withRevision(fresh(U.addDays(T, 10), true));
  f.live = { id: 'L2', kind: 'mock', title: 'Mock 2', qids: [], responses: {}, limitMs: 180 * 60000, elapsedMs: 100 * 60000 };
  const vf = P.day(f, D, T, noI);
  assert.equal(vf.season, 'final');
  assert.equal(vf.tasks[0].title, 'Finish your mock (80 min left)'); assert.equal(vf.tasks[0].href, '#/test/run/L2');
  assert.ok(vf.minutesPlanned <= 90, vf.minutesPlanned + ' min'); assert.equal(vf.next.href, '#/test/run/L2');
  assert.equal(P.lessonDays(45, 2), 31 - 16, 'at 90 min a day a mock takes 2 days: 2 of every 4 mock-phase days');
  assert.equal(P.lessonDays(45, 0), 31, 'no mock planned: every day before the final fortnight has lessons');
  assert.deepEqual([240, 180, 150, 90, 60, 45, 30, 20].map(P.mockParts), [1, 1, 2, 2, 3, 4, 6, 0]);
});

test('P1-45 (Part C): a same-day rebuild counts the rows already done against the daily time, the caps and the one re-read', () => {
  for (const [m0, m1] of [[150, 90], [90, 150], [90, 60], [60, 150]]) {
    const s = withRevision(fresh('2027-02-06', true)); s.profile.goals = { questions: 15, cards: 20, minutes: m0, lessons: 2 };
    const v0 = P.day(s, D, T, noI); s.plan = P.stored(v0);
    // the learner does the revision and the lesson, then changes the daily time
    s.cards['os.a.x#1'] = { due: U.addDays(T, 6), ivl: 6, ease: 2.5, reps: 3, lapses: 0, last: T }; s.act[T] = { s: 0, q: 5, c: 1, l: 1 };
    v0.tasks.find(t => t.id === 'retry').qids.forEach((id, i) => s.log.push([NOW + i, id, 1, 30000, 'p']));
    s.lessons['os.a.x'].last = NOW + 50;
    const ln = v0.tasks.find(t => t.kind === 'learn'); if (ln) s.lessons[ln.lesson] = { first: NOW, last: NOW, done: NOW + 99, secs: 900, visits: 1, quiz: {} };
    s.profile.goals.minutes = m1;
    const v1 = P.day(s, D, T, noI);
    assert.equal(v1.fresh, true);
    assert.ok(v1.minutesPlanned <= m1, `${m0} → ${m1} min: ${v1.minutesPlanned} planned (${v1.tasks.map(t => t.id + '=' + t.minutes).join(' ')})`);
    assert.ok(v0.tasks.filter(t => ['cards', 'retry', 'reread:os.a.x', ln && ln.id].includes(t.id)).every(t => v1.tasks.find(x => x.id === t.id && x.done)), 'what was done stays, ticked');
    assert.ok(v1.tasks.filter(t => t.id.indexOf('reread:') === 0).length <= 1, 'one re-read a day');
    assert.ok(v1.tasks.filter(t => t.kind === 'learn').length <= 2, "'Lessons a day' counts the lesson already finished");
    assert.ok(v1.tasks.filter(t => t.kind === 'practice').reduce((a, t) => a + t.target, 0) <= 15, "'Questions a day' holds");
  }
});

test('P1-45 (Part C): revision longer than the daily time is planned and said; nothing new is added beside it', () => {
  const s = withRevision(fresh('2027-02-06', true)); s.profile.goals.minutes = 20;     // 24 min of revision due
  const v = P.day(s, D, T, noI);
  assert.deepEqual(v.tasks.map(t => t.kind), ['revise', 'revise', 'revise']);
  assert.ok(v.notes.some(n => n === "Today's revision takes 24 min, more than your 20 min a day, so nothing new is planned."), v.notes.join(' | '));
  const p = P.build(s, D, T, noI).pace;
  assert.equal(p.perDayLessons, 0); assert.ok(p.cap > 0, "the pace line says revision leaves no time (not 'Lessons a day is 0')");
  const s2 = withRevision(fresh('2027-02-06', true)); s2.profile.goals.minutes = 40;    // 24 min of revision + the 20-minute next lesson: 44 > 40
  const v2 = P.day(s2, D, T, noI);
  assert.ok(!v2.tasks.some(t => t.kind === 'learn') && v2.minutesPlanned <= 40 && !v2.notes.length, v2.tasks.map(t => t.id + '=' + t.minutes).join(' '));
  assert.deepEqual(v2.tasks.filter(t => t.kind === 'practice').map(t => t.target), [4], 'no lesson fits: a short set of the week\'s focus fills the 16 minutes left');
  s2.profile.goals.minutes = 45; s2.plan = null;
  const v3 = P.day(s2, D, T, noI);
  assert.ok(v3.tasks.some(t => t.lesson === 'os.a.y' && t.kind === 'learn') && v3.minutesPlanned <= 45, v3.tasks.map(t => t.id + '=' + t.minutes).join(' '));
  for (const m of [10, 30, 45, 60]) { const f = fresh('2027-02-06', true); f.profile.goals.minutes = m; const x = P.day(f, D, T, noI); assert.ok(x.minutesPlanned <= m && x.tasks.length > 0, `${m} min: ${x.minutesPlanned} planned`); }
});

test('budget: lessons and practice fill the daily minutes; "Lessons a day" caps the learn rows; nothing is planned past the budget but revision', () => {
  const s = fresh(); s.profile.goals = { questions: 15, cards: 20, minutes: 90, lessons: 2 };
  const v = P.day(s, D, T, noI);
  assert.ok(v.minutesPlanned <= 90, v.minutesPlanned + ' min planned of 90');
  assert.ok(v.tasks.filter(t => t.kind === 'learn').length <= 2);
  s.profile.goals.lessons = 0; s.plan = null;
  assert.ok(!P.day(s, D, T, noI).tasks.some(t => t.kind === 'learn'), '0 lessons a day: no learn rows');
});

test('practice reasons are honest for a fresh profile: no "weak subject" claims without answers', () => {
  const v = P.day(fresh(), D, T, noI), pr = v.tasks.filter(t => t.kind === 'practice');
  assert.ok(pr.length >= 1);
  assert.ok(pr.every(t => !/weak/i.test(t.why)), pr.map(t => t.why).join(' | '));
  assert.ok(pr.some(t => /The most marks of any paper you have not started|past questions on/.test(t.why)));
});

/* ================================================================ seasons (P1-61, D20) */
test('final stretch: no new lessons, the chain order (finish, re-read, retry, cards, quick 20, mock) and a "no new topics" note', () => {
  const s = fresh(U.addDays(T, 10), true);
  const v = P.day(s, D, T, noI);
  assert.equal(v.season, 'final');
  assert.ok(!v.tasks.some(t => t.kind === 'learn'), 'nothing unopened is planned');
  assert.ok(/no new topics/i.test(P.PHASE_TXT.final), "the header's plan line says it");
  assert.ok(!v.notes.some(n => /no new topics/i.test(n)), 'stated once (P2-39): the header line, not a second note in Today');
  // a started lesson comes first; then the due re-read; cards are reviewed before Quick 20 can appear
  s.lessons['os.a.y'] = { first: NOW - 864e5, last: NOW - 864e5, done: null, secs: 400, visits: 2, quiz: {} };
  s.lessons['os.a.x'] = { first: NOW - 30 * 864e5, last: NOW - 20 * 864e5, done: NOW - 20 * 864e5, secs: 600, visits: 1, quiz: {} };
  s.cards['os.a.x#1'] = { due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -3) };
  const step = { kind: 'lesson', rule: 'continue', label: 'Continue', title: 'OS lesson two', id: 'os.a.y', subject: 'os', minutes: 20, reason: '', href: '#/l/os.a.y' };
  const v2 = P.day(s, D, T, { I: null, nextStep: () => step });
  assert.deepEqual(v2.tasks.slice(0, 3).map(t => t.id), ['learn:os.a.y', 'reread:os.a.x', 'cards']);
  assert.equal(v2.tasks[0].title, 'Finish: OS lesson two');
  assert.ok(!v2.tasks.some(t => t.id === 'quick20'), 'Quick 20 only when no cards are due');
});

test('final stretch at 14 and 2 days: no new lessons; at 15 days lessons still come', () => {
  for (const d of [14, 2]) {
    const v = P.day(fresh(U.addDays(T, d), true), D, T, noI);
    assert.equal(v.season, 'final', d + ' days');
    assert.ok(!v.tasks.some(t => t.kind === 'learn'), 'no unopened lesson at ' + d + ' days');
  }
  const v15 = P.day(fresh(U.addDays(T, 15), true), D, T, noI);
  assert.equal(v15.season, 'normal');
  assert.ok(v15.tasks.some(t => t.kind === 'mock' || t.kind === 'learn'), 'the mock phase still plans a mock or a lesson at 15 days');
});

test('the eve: Quick 20, the top notebook misses and the admit-card note, nothing new; an assumed date gets no eve mode', () => {
  const s = fresh(U.addDays(T, 1), true);
  s.cards['os.a.x#1'] = { due: U.addDays(T, 3), ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -1) };
  for (let i = 0; i < 7; i++) { const id = 'cn:' + i; s.q[id] = { n: 1, ok: 0, last: NOW - 2 * 864e5, lastOk: 0, srs: { due: T, ivl: 1, ease: 2.3, reps: 0, lapses: 1, last: U.addDays(T, -2) } }; s.nb[id] = { reason: null, resolved: null, added: NOW - 2 * 864e5 }; }
  const v = P.day(s, D, T, noI);
  assert.equal(v.season, 'eve');
  assert.deepEqual(v.tasks.map(t => t.id), ['quick20', 'retry']);
  assert.equal(v.tasks[0].href, '#/flash/all?mode=quick'); assert.equal(v.tasks[1].title, 'Retry your top 5 notebook misses');
  assert.ok(v.minutesPlanned <= 25, v.minutesPlanned + ' min on the eve');
  assert.ok(v.notes.some(n => /admit card printed/.test(n)));
  const a = fresh(U.addDays(T, 1), false);                  // the same date, never chosen by the learner
  a.profile.examDate = U.addDays(T, 1);
  assert.equal(P.day(a, D, T, { I: null, E: E(T, U.addDays(T, 1), 'assumed') }).season, 'final', 'an assumed date stays in the final-stretch mode');
});

test('exam day: no tasks, an optional warm-up; after the exam: no tasks', () => {
  const s = fresh(T, true);
  const v = P.day(s, D, T, noI);
  assert.equal(v.season, 'day'); assert.equal(v.tasks.length, 0); assert.equal(v.empty, true); assert.equal(v.left, 0);
  assert.ok(v.warmup && /^Warm up: 10 questions/.test(v.warmup.title) && v.warmup.href === '#/test?new=warmup');
  s.cards['os.a.x#1'] = { due: U.addDays(T, 4), ivl: 4, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -1) }; s.plan = null;
  assert.equal(P.day(s, D, T, noI).warmup.href, '#/flash/all?mode=warm', 'with reviewed cards the warm-up is 10 cards you know');
  assert.ok(v.notes.some(n => /^It's exam day\. Nothing new to study today\.$/.test(n)), v.notes.join(' | '));
  const after = P.day(fresh(U.addDays(T, -3), true), D, T, noI);
  assert.equal(after.season, 'done'); assert.equal(after.tasks.length, 0);
  assert.equal(P.day(fresh(U.addDays(T, -60), true), D, T, noI).season, 'between');
});

test('after the exam (P2-72): done the day after and at +30 days, between cycles from +31; a new future date brings the plan back', () => {
  for (const [ago, want] of [[1, 'done'], [30, 'done'], [31, 'between']]) {
    const v = P.day(fresh(U.addDays(T, -ago), true), D, T, noI);
    assert.equal(v.season, want, ago + ' days after');
    assert.equal(v.tasks.length, 0);
  }
  const s = fresh(U.addDays(T, -2), true); s.plan = P.stored(P.day(s, D, T, noI));
  s.profile.examDate = '2028-02-05';
  const v = P.day(s, D, T, noI);
  assert.equal(v.fresh, true); assert.equal(v.season, 'normal'); assert.ok(v.tasks.length > 0, 'Today returns once a new date is set');
});

test('exam fallback (until GA.stats.exam): the untouched old default is assumed, any chosen date is the learner\'s', () => {
  const a = Store._blank(); a.profile.examDate = '2027-02-06'; delete a.profile.examSet;
  assert.equal(P.examOf(a, D, T).basis, 'assumed');
  a.profile.examSet = true; assert.equal(P.examOf(a, D, T).basis, 'yours');
  const b = Store._blank(); b.profile.examDate = '2028-02-05'; delete b.profile.examSet;
  const e = P.examOf(b, D, T); assert.equal(e.basis, 'yours'); assert.equal(e.label, 'your exam', 'a February date outside any cycle is no CA attempt');
  assert.equal(P.labelFor('2027-09-01', null), 'CA Inter September 2027', 'the label follows the date, not a hard-coded year');
  assert.equal(P.labelFor('2028-01-10', null), 'CA Inter January 2028');
  assert.equal(P.labelFor('2027-02-13', P.LOCAL_CYCLE), 'CA Inter January 2027', 'a cycle names itself');
  assert.equal(P.labelFor('2027-03-02', null), 'your exam');
});

test('P1-61 (verifier): confirming an assumed date on the eve or exam day rebuilds the list for the new season', () => {
  const T1 = '2027-02-05';
  const s = fresh();                                    // the untouched default date: assumed
  s.cards['os.a.x#1'] = { due: T1, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T1, -3) };
  const v0 = P.day(s, D, T1, noI);
  assert.equal(v0.season, 'final', 'an assumed date the day before stays in the final stretch');
  s.plan = P.stored(v0);
  s.profile.examSet = true;                             // 'Set your date': the same day, now chosen
  const v1 = P.day(s, D, T1, noI);
  assert.equal(v1.season, 'eve'); assert.equal(v1.fresh, true, 'the season is part of the key');
  assert.ok(v1.notes.some(n => /admit card printed/.test(n)), 'the eve note');
  assert.ok(v1.minutesPlanned <= 25 && v1.tasks.some(t => t.id === 'quick20'), v1.tasks.map(t => t.id).join());
  s.plan = P.stored(v1); assert.equal(P.day(s, D, T1, noI).fresh, false, 'then the eve list stays');
  // exam day: final -> day (the warm-up, no open task) -> 'Not sure yet' -> a final list again, never empty and never the exam-day note
  const T2 = '2027-02-06', d = fresh();
  d.plan = P.stored(P.day(d, D, T2, noI)); assert.equal(d.plan.season, 'final');
  d.profile.examSet = true;
  const v2 = P.day(d, D, T2, noI);
  assert.equal(v2.season, 'day'); assert.ok(v2.warmup, 'the optional warm-up (the coral)'); assert.equal(v2.left, 0);
  assert.equal(v2.season, P.day(Object.assign({}, d, { plan: null }), D, T2, noI).season, 'day() reports the live season, never a stored one');
  d.plan = P.stored(v2); d.profile.examDate = null; d.profile.examSet = false;
  const v3 = P.day(d, D, T2, noI);
  assert.equal(v3.season, 'final'); assert.ok(v3.left > 0, 'an open task, so the page has its coral (D18)');
  assert.ok(!v3.notes.some(n => /exam day|is today/.test(n)));
  assert.ok(v3.tasks.every(t => t.kind !== 'mock'), 'no 3-hour mock on a day that may be the exam day');
});

test('P0-19 (Part B): a same-day rebuild keeps the rows already done; the caps are part of the key, older snapshots without them are kept', () => {
  const s = fresh('2027-02-06', true);
  const v0 = P.day(s, D, T, noI); s.plan = P.stored(v0);
  const learn = v0.tasks.find(t => t.kind === 'learn');
  s.lessons[learn.lesson] = { first: NOW, last: NOW, done: NOW, secs: 900, visits: 1, quiz: {} };
  s.profile.goals.minutes = 60;
  const v1 = P.day(s, D, T, noI);
  assert.equal(v1.fresh, true);
  const kept = v1.tasks.filter(t => t.id === learn.id);
  assert.equal(kept.length, 1); assert.ok(kept[0].done, 'the lesson finished today stays on the list, ticked');
  s.plan = P.stored(v1);
  s.profile.goals.lessons = 2; assert.equal(P.day(s, D, T, noI).fresh, true, "new 'Lessons a day'");
  s.profile.goals.lessons = 1; s.profile.goals.questions = 30; assert.equal(P.day(s, D, T, noI).fresh, true, "new 'Questions a day'");
  s.profile.goals.questions = 15;
  const old = P.stored(P.day(s, D, T, noI)); delete old.lessons; delete old.questions; s.plan = old;
  assert.equal(P.day(s, D, T, noI).fresh, false, 'a Part A snapshot (no caps in its key) is not rebuilt');
  assert.ok(['season', 'lessons', 'questions'].every(k => k in P.stored(P.day(s, D, T, noI))), 'the stored snapshot carries the whole key');
});

test('P2-72 (verifier): after a sat exam the next exam is the next cycle, never the remaining days of the same one', () => {
  const s = fresh('2027-02-06', true), today = '2027-02-08';
  const E = Stats.exam(s, D.exam, today);
  assert.equal(E.daysLeft, -2);
  assert.equal(P.nextCycle(D, E, today), null, 'the test cycle still has 13–21 Feb, but the learner sat it on 6 Feb');
  assert.equal(P.nextLabel(D, E, today), 'The next CA Inter attempt', "'The next CA Inter attempt dates are not out yet'");
  const b = P.build(s, D, today, noI);
  assert.equal(b.season, 'done'); assert.equal(b.next.cycle, null); assert.equal(b.next.label, 'The next CA Inter attempt');
  const u = fresh(), Eu = Stats.exam(u, D.exam, today);
  assert.equal(P.nextCycle(D, Eu, today).id, 'test-2027', 'a learner who has not chosen can still pick a remaining day');
  const l = fresh('2027-02-13', true);
  assert.equal(P.nextCycle(D, Stats.exam(l, D.exam, today), today).id, 'test-2027', 'a chosen day still ahead keeps its cycle');
  const X2 = { cycles: [TEST_CYCLE, { id: 'test-2028', label: 'Test exam 2028', organiser: 'Test', days: ['2028-02-05', '2028-02-06'], papers: {}, result: null, source: 'https://example.org', checked: '2027-08-01' }] };
  const D2 = Object.assign({}, D, { exam: X2 });
  assert.equal(P.nextCycle(D2, Stats.exam(s, X2, today), today).id, 'test-2028', 'once published, the next cycle is offered');
  assert.equal(P.nextLabel(D2, Stats.exam(s, X2, today), today), 'Test exam 2028');
});

test('final stretch never leaves a day empty: a light warm-up when the paper may be today or tomorrow, else one practice set', () => {
  const T3 = '2027-01-30', s = fresh('2027-02-06', true);
  s.tests.push({ id: 't1', kind: 'mock', title: 'Mock 1', started: at(U.addDays(T3, -1), 9), finished: at(U.addDays(T3, -1), 12), qids: [], score: 40, max: 100 });
  const v = P.day(s, D, T3, noI);
  assert.equal(v.season, 'final');
  assert.ok(v.tasks.length >= 1 && v.tasks.every(t => t.kind !== 'learn' && t.kind !== 'mock'), v.tasks.map(t => t.id).join());
  assert.equal(v.tasks[0].kind, 'practice', 'a mock yesterday: one practice set instead of a second mock');
  const a = fresh(), w = P.day(a, D, '2027-02-05', noI);
  assert.deepEqual(w.tasks.map(t => t.id), ['warmtest'], 'assumed date tomorrow, nothing due: the 10-question warm-up');
});

/* ================================================================ 'Add one more task' and the pace line */
test("'Add one more task' offers a new open row, never one already on the list", () => {
  const s = fresh(); const v = P.day(s, D, T, noI);
  const t = P.more(s, D, T, v, noI);
  assert.ok(t && !v.tasks.some(x => x.id === t.id) && t.extra === 1, JSON.stringify(t));
  const day = P.day(fresh(T, true), D, T, noI);
  assert.equal(P.more(fresh(T, true), D, T, day, noI), null, 'exam day: nothing to add');
});

test('pace line: lessons left, their hours, the lessons a day the recipe really plans, the days that takes and the lesson days left', () => {
  const s = fresh('2027-02-06', true);
  const p = P.pace(s, D, T, noI);
  assert.equal(p.lessonsLeft, 2); assert.equal(p.minutesLeft, 35);
  assert.equal(p.cap, 1); assert.equal(p.perDayLessons, 1, "'Lessons a day' (default 1) caps the pace like it caps the list"); assert.equal(p.perDay, 18, 'minutes of that one lesson (average left)');
  assert.equal(p.daysNeeded, 2); assert.equal(p.daysLeft, 119); assert.equal(p.learnDays, 119 - 14 - 16, 'mock days of the mock phase excluded (at 90 min a day a mock takes 2 of every 4 days)');
  s.profile.goals.minutes = 180; assert.equal(P.pace(s, D, T, noI).learnDays, 119 - 14 - 11, 'a mock that fits the day: one day in three');
  s.profile.goals.minutes = 90;
  assert.equal(p.fits, true); assert.equal(p.suggest, null); assert.equal(p.more, null);
  s.lessons['os.a.x'] = { done: NOW }; assert.equal(P.pace(s, D, T, noI).lessonsLeft, 1);
});

test('P1-45: lessonsPerDay mirrors the recipe (first lesson always, more while revision + lessons + 20 min of practice fit); lessonDays excludes mock days', () => {
  assert.equal(P.lessonsPerDay(1, 90, 0, 26), 1);
  assert.equal(P.lessonsPerDay(6, 90, 0, 26), 2, '2 × 26 + 20 ≤ 90');
  assert.equal(P.lessonsPerDay(6, 90, 27, 26), 1, "today's revision shares the day");
  assert.equal(P.lessonsPerDay(3, 30, 0, 26), 1, 'the first lesson even when it is longer than the time left for lessons');
  assert.equal(P.lessonsPerDay(0, 90, 0, 26), 0, "'Lessons a day' 0 plans none");
  assert.equal(P.lessonsPerDay(3, 90, 95, 26), 0, 'revision alone fills the day: no lesson (the recipe adds none)');
  assert.equal(P.lessonsPerDay(3, 30, 10, 26), 0, 'Part C: the first lesson only when it fits beside the revision');
  assert.equal(P.lessonsPerDay(3, 30, 10, 26, 18), 1, "the shared next step's own minutes decide (18 + 10 ≤ 30)");
  assert.equal(P.lessonDays(113), 99 - 11); assert.equal(P.lessonDays(45), 31 - 11); assert.equal(P.lessonDays(20), 6 - 2);
  assert.equal(P.lessonDays(15), 0); assert.equal(P.lessonDays(14), 0); assert.equal(P.lessonDays(null), null);
});


/* ================================================================ the real catalogue: recipes and the shared next step */
/* the shipped catalogue once it has enough lessons and ICAI questions, else the fixture (tests/next-states.js NS.catalogue(): the real CA
   syllabus and exam calendar, a lesson for every sub-topic, a small synthetic MCQ bank) */
const Data = require('../app/js/core/data.js'), Ins = require('../app/js/core/insights.js');
const NSC = require('./next-states.js').catalogue();
const RD = NSC.D, RI = NSC.I;

test('P2-64: every other Learn-phase day the second set is a mixed review of finished lessons, once the bank has it', () => {
  const s = fresh('2027-02-06', true); s.profile.goals.minutes = 180; s.profile.goals.questions = 30;
  const withPyq = RD.lessons.filter(l => RD.questions.filter(q => q.hasKey && q.subtopic === (l.subtopic || l.id)).length >= 4).slice(0, 3);
  assert.equal(withPyq.length, 3);
  withPyq.forEach(l => (s.lessons[l.id] = { first: NOW - 864e5, last: NOW - 864e5, done: NOW - 864e5, secs: 900, visits: 1, quiz: {} }));
  const odd = '2026-10-11', even = '2026-10-12';
  const row = (t, mixed) => P.day(Object.assign({}, s, { plan: null }), RD, t, { I: RI, mixed }).tasks.find(x => x.id === 'prac:learned');
  const r = row(odd, true);
  assert.ok(r, 'a mixed-review row on an odd day');
  assert.ok(/^#\/pyq\?status=learned&sort=mixed&practise=\d+$/.test(r.href), r.href);
  assert.ok(!row(even, true), 'the week\'s focus keeps the other days');
  assert.ok(!row(odd, false), 'without the bank\'s status and sort there is no such row');
  // judged from today's answers on finished lessons' sub-topics
  const subs = new Set(withPyq.map(l => l.subtopic || l.id)), q = RD.questions.find(x => x.hasKey && subs.has(x.subtopic));
  const s2 = Object.assign({}, s, { plan: null, log: [[at(odd, 15), q.id, 1, 30, 'p']] });
  const v = P.day(s2, RD, odd, { I: RI, mixed: true }), j = v.tasks.find(x => x.id === 'prac:learned');
  assert.equal(j.progress, `1/${j.target}`);
});

test('P1-45 (verifier): the pace line and the list agree; a route that does not fit says so and offers the lessons a day that would', () => {
  const s = fresh('2027-02-06', true);
  const b = P.build(s, RD, T, { I: RI }), p = b.pace;
  const learnRows = b.day.tasks.filter(t => t.kind === 'learn').length;
  assert.equal(p.perDayLessons, learnRows, 'the pace counts the lessons the day really holds');
  assert.equal(p.daysNeeded, Math.ceil(RD.lessons.length / p.perDayLessons));
  assert.equal(p.fits, false, `${p.lessonsLeft} lessons at ${p.perDayLessons} a day in ${p.learnDays} lesson days`);
  assert.ok(p.suggest && p.suggest.id === 'crash', 'the Crash course is offered');
  // 3 lessons a day and 4 h: the list holds what the line says
  const s3 = fresh('2027-02-06', true); s3.profile.goals.lessons = 3; s3.profile.goals.minutes = 240;
  const b3 = P.build(s3, RD, T, { I: RI });
  assert.equal(b3.pace.perDayLessons, b3.day.tasks.filter(t => t.kind === 'learn').length);
  // the '80% of the marks' route (182 lessons): one a day does not fit in the lesson days left; two a day do, within 90 minutes
  const r = fresh('2027-02-06', true); r.profile.route = 'cover80';
  const pr = P.build(r, RD, T, { I: RI }).pace, R = RI.path('cover80');
  if (R && R.lessons && R.lessons.length > pr.learnDays) {
    assert.equal(pr.fits, false, 'one lesson a day: ' + pr.daysNeeded + ' days > ' + pr.learnDays);
    const k = Math.ceil(pr.lessonsLeft / pr.learnDays);
    if (P.lessonsPerDay(k, 90, 0, pr.minutesLeft / pr.lessonsLeft) >= k) assert.deepEqual(pr.more && pr.more.n, k, 'the smallest lessons a day that fits');
    assert.ok(pr.suggest && pr.suggest.id === 'crash', 'the shorter Crash course is offered on the 80% route too');
  }
  // 'Lessons a day' 0: no lessons are planned, the line says it never fits, and one lesson a day is offered when that is enough
  const z = fresh('2027-02-06', true); z.profile.goals.lessons = 0;
  const pz = P.pace(z, D, T, noI);
  assert.equal(pz.perDayLessons, 0); assert.equal(pz.daysNeeded, null); assert.equal(pz.fits, false); assert.deepEqual(pz.more, { n: 1, minutes: 18 });
  assert.ok(!P.day(z, D, T, noI).tasks.some(t => t.kind === 'learn'));
});

test('real catalogue, Learn phase: the planned lesson is followed by its own sub-topic PYQs, then the week\'s focus', () => {
  const s = fresh('2027-02-06', true);
  const v = P.day(s, RD, T, { I: RI });
  const learn = v.tasks.filter(t => t.kind === 'learn'), prac = v.tasks.filter(t => t.kind === 'practice');
  assert.ok(learn.length >= 1 && prac.length >= 1, v.tasks.map(t => t.id).join());
  const l = RD.lessonById[learn[0].lesson];
  assert.ok(prac[0].scope.sub === l.id || prac[0].scope.topic === l.topic, 'the first practice row is the planned lesson\'s own PYQs');
  assert.ok(/practise=\d+/.test(prac[0].href));
  assert.ok(v.minutesPlanned <= 90, v.minutesPlanned + ' min');
  const p = P.pace(s, RD, T, { I: RI });
  assert.equal(p.lessonsLeft, RD.lessons.length);
  assert.equal(p.minutesLeft, RD.lessons.reduce((a, x) => a + x.minutes, 0));
  assert.ok(p.fits === p.daysNeeded <= p.learnDays);
  if (!p.fits) assert.ok(p.suggest && p.suggest.id === 'crash' && p.suggest.hours > 0, 'when the syllabus does not fit, the Crash course is offered');
});

test('real catalogue: the first learn row is the shared next step, and the next rows stay in its subject (P1-45)', () => {
  const s = fresh('2027-02-06', true); s.profile.goals.lessons = 3; s.profile.goals.minutes = 240;
  const lid = RI.order('fm')[1], L = RD.lessonById[lid];
  const step = { kind: 'lesson', rule: 'subject', label: 'Next up', title: L.title, id: lid, subject: 'fm', minutes: L.minutes, reason: 'after the first lesson', href: '#/l/' + lid + '?focus=1' };
  const v = P.day(s, RD, T, { I: RI, nextStep: (st, d, o) => (o.kind === 'lesson' ? step : null) });
  const learn = v.tasks.filter(t => t.kind === 'learn');
  assert.equal(learn[0].lesson, lid); assert.equal(learn[0].href, '#/l/' + lid + '?focus=1', 'the row opens exactly what Home opens');
  assert.equal(learn[0].why, 'after the first lesson');
  assert.ok(learn.length >= 2 && learn.every(t => RD.lessonById[t.lesson].subject === 'fm'), learn.map(t => t.lesson).join());
  const ord = RI.order('fm'); assert.ok(ord.indexOf(learn[1].lesson) > ord.indexOf(lid), 'in the learning order');
});

test('P1-06 (verifier): Recommended names the lesson the plan starts with once the route is cleared, even while a route is set', () => {
  const s = fresh('2027-02-06', true), none = Stats.nextStep(s, RD, { kind: 'lesson', today: T, I: RI });
  assert.ok(none && none.id, 'a fresh learner has a next lesson');
  for (const r of ['crash', 'cover80', 'last30', 'zero']) {
    const R = RI.path(r);
    if (!R || !R.lessons || !R.lessons.length) continue;
    const st = fresh('2027-02-06', true); st.profile.route = r;
    const rec = P.recommended(st, RD, T, { I: RI });
    assert.equal(st.profile.route, r, 'the state is not changed');
    assert.ok(rec && rec.rule !== 'route', r + ': not the route\'s lesson (' + (rec && rec.rule) + ')');
    assert.equal(rec.id, none.id, r + ': the same step as with no route');
    // tapping Recommended clears the route: the plan's first lesson is the one the chip named
    const cleared = Object.assign({}, st, { plan: null, profile: Object.assign({}, st.profile, { route: null }) });
    const first = P.day(cleared, RD, T, { I: RI }).tasks.find(t => t.kind === 'learn');
    assert.equal(first && first.lesson, rec.id, r + ': the plan after Recommended starts with ' + rec.title);
    if (r === 'crash') assert.notEqual(Stats.nextStep(st, RD, { kind: 'lesson', today: T, I: RI }).id, rec.id, 'the route names a different lesson here');
  }
  // one lesson finished, nothing open: Recommended is the subject's next lesson ('Next up'), the route still names its own
  const f = fresh('2027-02-06', true); f.lessons[none.id] = { first: NOW - 864e5, last: NOW - 864e5, done: NOW - 864e5, secs: 900, visits: 1, quiz: {} };
  const after = Stats.nextStep(f, RD, { kind: 'lesson', today: T, I: RI });
  f.profile.route = 'crash';
  const rf = P.recommended(f, RD, T, { I: RI }), onRoute = Stats.nextStep(f, RD, { kind: 'lesson', today: T, I: RI });
  assert.equal(rf.id, after.id); assert.equal(rf.rule, 'subject'); assert.equal(onRoute.rule, 'route');
  assert.notEqual(onRoute.id, rf.id, 'the route\'s lesson differs from the recommended one');
  const fc = Object.assign({}, f, { plan: null, profile: Object.assign({}, f.profile, { route: null }) });
  assert.equal((P.day(fc, RD, T, { I: RI }).tasks.find(t => t.kind === 'learn') || {}).lesson, rf.id);
  // a lesson in progress beats the route both ways: Recommended is Continue on it
  const g2 = fresh('2027-02-06', true), lid = RI.path('crash').lessons[3];
  g2.profile.route = 'crash'; g2.lessons[lid] = { first: NOW - 3600e3, last: NOW - 3600e3, secs: 600, visits: 1, quiz: {} };
  const rc = P.recommended(g2, RD, T, { I: RI });
  assert.equal(rc && rc.id, lid); assert.equal(rc.label, 'Continue');
  // no route chosen: the shared next step itself; without a next-step function, the planner's own fallback, also with the route cleared
  assert.equal(P.recommended(s, RD, T, { I: RI }).id, none.id);
  const c2 = fresh('2027-02-06', true); c2.profile.route = 'crash';
  assert.equal(P.recommended(c2, RD, T, { I: RI, nextStep: null }).id, none.id);
  assert.equal(P.recommended(null, RD, T), null);
});

test('12 learner states (tests/next-states.js, WP4): the first learn row equals nextStep, and finishing it keeps the subject', () => {
  const file = path.join(__dirname, 'next-states.js');
  if (!fs.existsSync(file) || typeof Stats.nextStep !== 'function') return;   // lands with WP4 (§10.3); checked again once it does
  const today = '2026-10-16', list = require(file).states(RD, RI, today);
  for (const { name, state, today: t } of list) {
    const day = t || today, ns = Stats.nextStep(state, RD, { kind: 'lesson', today: day, I: RI }), v = P.day(state, RD, day, { I: RI });
    const first = v.tasks.find(x => x.kind === 'learn');
    if (v.season === 'normal') {
      if (ns && ns.id) assert.equal(first && first.lesson, ns.id, name);
      else assert.ok(!first, name);
    } else {
      const any = Stats.nextStep(state, RD, { kind: 'any', today: day, I: RI });
      if (any && any.id && v.next && v.next.lesson) assert.equal(v.next.lesson, any.id, name + ': the plan\'s next task is the step Home names');
    }
    if (first && ns && ns.rule === 'subject') {
      const s2 = JSON.parse(JSON.stringify(state)), when = U.parseDay(day).getTime() + 12 * 3600e3;
      s2.lessons[first.lesson] = Object.assign({ first: when, last: when, secs: 900, visits: 1, quiz: {} }, s2.lessons[first.lesson] || {}, { done: when });
      const n2 = Stats.nextStep(s2, RD, { kind: 'lesson', today: day, I: RI });
      const left = RI.order(ns.subject).some(id => id !== first.lesson && !(s2.lessons[id] && s2.lessons[id].done) && RD.lessonById[id].status === 'in');
      if (n2 && left) assert.equal(n2.subject, ns.subject, name + ': finishing the planned lesson keeps the current subject');
    }
  }
});

test('P2-72: the season record counts lessons finished, PYQ answers and tests finished per phase, up to the exam the plan counted to', () => {
  const s = fresh('2027-02-06', true);
  s.lessons['os.a.x'] = { done: at('2026-12-01') };                                   // Practise: 29 Oct → 22 Dec
  s.log.push([at('2027-01-10'), 'os:1', 1, 30000, 'p']);                                // Mock tests: 23 Dec → 22 Jan
  s.log.push([at('2027-02-01'), 'os:2', 0, 30000, 'p'], [at('2027-02-06', 9), 'os:3', 1, 30000, 'p']);   // Final stretch, exam day included
  s.log.push([at('2027-02-08'), 'os:4', 1, 30000, 'p'], [at('2027-01-20'), 'lab:x', 1, null, 'l']);      // after the exam; a lab run is no answer
  s.tests.push({ id: 't1', kind: 'mock', finished: at('2027-01-15') });
  const today = '2027-02-10', Ex = P.examOf(s, D, today);
  assert.equal(Ex.last && Ex.last.date, '2027-02-06');
  const r = P.seasonRecord(s, Ex);
  assert.deepEqual(r.map(x => [x.id, x.from, x.to, x.lessons, x.answers, x.tests]), [
    ['learn', null, '2026-10-28', 0, 0, 0], ['practice', '2026-10-29', '2026-12-22', 1, 0, 0], ['mocks', '2026-12-23', '2027-01-22', 0, 1, 1], ['final', '2027-01-23', '2027-02-06', 0, 2, 0]]);
  // no date set: the phases the plan counted to are those of the cycle's first exam day, and the final stretch runs to its last one
  const cycle = { id: 'gate-2027', label: 'GATE 2027', days: ['2027-02-06', '2027-02-07', '2027-02-13', '2027-02-14', '2027-02-20', '2027-02-21'], result: '2027-03-19' };
  const u = fresh(null, false); u.profile.examDate = null;
  u.log.push([at('2027-02-15'), 'os:5', 1, 30000, 'p'], [at('2026-12-20'), 'os:6', 1, 30000, 'p']);
  u.q['os:5'] = { n: 1, ok: 1, lastOk: true, last: at('2027-02-15') }; u.q['os:6'] = { n: 1, ok: 1, lastOk: true, last: at('2026-12-20') };
  const Eu = { date: null, set: false, basis: null, label: 'GATE 2028', cycle: null, daysLeft: null, last: { date: '2027-02-21', label: 'GATE 2027', cycle, daysAgo: 8 } };
  const ru = P.seasonRecord(u, Eu);
  assert.deepEqual(ru.map(x => [x.id, x.from, x.to, x.answers]), [['learn', null, '2026-10-28', 0], ['practice', '2026-10-29', '2026-12-22', 1], ['mocks', '2026-12-23', '2027-01-22', 0], ['final', '2027-01-23', '2027-02-21', 1]]);
  // nothing recorded in the season, no exam behind, no history: no record
  assert.equal(P.seasonRecord(fresh('2027-02-06', true), Ex), null);
  assert.equal(P.seasonRecord(s, Object.assign({}, Ex, { last: null })), null);
  const late = fresh('2027-02-06', true); late.log.push([at('2027-02-09'), 'os:7', 1, 30000, 'p']); late.q['os:7'] = { n: 1, ok: 1, lastOk: true, last: at('2027-02-09') };
  assert.equal(P.seasonRecord(late, Ex), null, 'only answers after the exam: nothing to show for the season');
});

/* ================================================================ CA Inter: the Group II paper days and an empty ICAI bank */
const FXP = require('./fixtures/catalogue.js');
const CA = (() => { const M0 = FXP.real(); return Data.buildCatalogue(JSON.parse(JSON.stringify(M0))); })();     // the shipped catalogue (no ICAI question yet)
const CAQ = Object.assign(Object.create(CA), { questions: [], qById: {} });            // the same, with the bank forced empty
const CAX = CA.exam && CA.exam.cycles && CA.exam.cycles.length ? CA.exam : Stats.EXAM_FALLBACK;

test('CA: unset, the plan counts to the next Group II paper day (official), and the countdown moves on after each paper', () => {
  const c = CAX.cycles.find(x => x.papers && x.papers.P4), s = Store._blank();
  assert.ok(c, 'the January 2027 cycle names each paper day');
  const E1 = P.examOf(s, Object.assign({}, CAQ, { exam: CAX }), '2026-10-20');
  assert.equal(E1.date, c.papers.P4[0]); assert.equal(E1.basis, 'official paper day'); assert.equal(E1.paper.name, 'Paper 4');
  const E2 = P.examOf(s, Object.assign({}, CAQ, { exam: CAX }), U.addDays(c.papers.P4[0], 1));
  assert.equal(E2.date, c.papers.P5[0], 'the day after Paper 4 counts to Paper 5'); assert.equal(E2.paper.name, 'Paper 5');
  assert.equal(P.phaseOf(U.daysBetween('2026-10-20', c.papers.P4[0])), 'practice', '80 days out is the Practise phase');
});

test('CA: with no ICAI question the plan holds no mock, no warm-up test and no practice set, in every phase', () => {
  const D0 = Object.assign({}, CAQ, { exam: CAX, lessons: D.lessons, lessonById: D.lessonById, cards: D.cards, subjects: CA.subjects, subjectById: CA.subjectById, nodes: CA.nodes });
  const c = CAX.cycles[0], p4 = c.papers.P4[0];
  for (const back of [90, 40, 20, 5, 1, 0]) {
    const today = U.addDays(p4, -back), s = Store._blank();
    const v = P.day(s, D0, today, { I: null });
    assert.ok(v.tasks.every(t => t.kind !== 'mock' && t.kind !== 'practice' && t.id !== 'warmtest'), `${back} days out: ${v.tasks.map(t => t.id).join()}`);
    assert.ok(!v.tasks.some(t => /#\/(pyq|test)/.test(t.href || '')), `${back} days out: nothing opens the empty bank`);
    if (v.warmup) assert.ok(!/#\/test/.test(v.warmup.href), 'the exam-day warm-up is cards, never a test');
  }
  const day = P.day(Store._blank(), D0, p4, { I: null });
  assert.equal(day.season, 'day');
  assert.ok(day.notes.some(n => /^Paper 4 is today, 2 PM to 5 PM \(reading time from 1\.45 PM\)\. Nothing new to study today\.$/.test(n)), day.notes.join(' | '));
});

test('CA: the empty-bank phase lines promise no ICAI question and no mock', () => {
  for (const id of ['learn', 'practice', 'mocks', 'final']) {
    const t = P.phaseLine(id, 90, false);
    assert.ok(t && !/\bGATE\b|\bPYQ/.test(t), id + ': ' + t);
    assert.ok(!/a full 3-hour mock every third day/.test(t), id + ': no mock is promised');
  }
  assert.ok(/ICAI questions/.test(P.phaseLine('learn', 90, true)), 'with a bank the line names its questions');
  assert.equal(P.nextLabel(Object.assign({}, CAQ, { exam: { cycles: [] } }), { set: false }, '2027-02-01'), 'The next CA Inter attempt');
});
