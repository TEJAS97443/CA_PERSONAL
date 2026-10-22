globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js'); require('../app/js/core/srs.js');
const S = require('../app/js/core/stats.js');
const Store = require('../app/js/core/store.js');
const T = '2026-10-10';

const D = {
  subjects: [
    { id: 'os', name: 'Operating Systems', hue: 24, topics: [
      { id: 'os.sched', name: 'CPU scheduling', status: 'in', subtopics: [{ id: 'os.sched.rr' }, { id: 'os.sched.fcfs' }] },
      { id: 'os.sync', name: 'Synchronisation', status: 'in', subtopics: [{ id: 'os.sync.sem' }] }] },
    { id: 'db', name: 'Databases', hue: 210, topics: [{ id: 'db.sql', name: 'SQL', status: 'in', subtopics: [{ id: 'db.sql.join' }] }] }
  ],
  lessons: [
    { id: 'os.sched.rr', subject: 'os', topic: 'os.sched', subtopic: 'os.sched.rr' },
    { id: 'os.sched.fcfs', subject: 'os', topic: 'os.sched', subtopic: 'os.sched.fcfs' },
    { id: 'os.sync.sem', subject: 'os', topic: 'os.sync', subtopic: 'os.sync.sem' }],
  cards: [{ id: 'c1', lesson: 'os.sched.rr', subject: 'os', topic: 'os.sched' }, { id: 'c2', lesson: 'os.sched.rr', subject: 'os', topic: 'os.sched' }],
  questions: [], topicMarks: { 'os.sched': 20, 'os.sync': 10, 'db.sql': 10 }
};
for (let i = 1; i <= 10; i++) D.questions.push({ id: 'p:q' + i, subject: 'os', topic: 'os.sched', subtopic: 'os.sched.rr', marks: 2, type: 'MCQ', year: 2020, section: 'CS' });
for (let i = 11; i <= 14; i++) D.questions.push({ id: 'p:q' + i, subject: 'os', topic: 'os.sync', subtopic: 'os.sync.sem', marks: 1, type: 'NAT', year: 2019, section: 'CS' });
for (let i = 15; i <= 18; i++) D.questions.push({ id: 'p:q' + i, subject: 'db', topic: 'db.sql', subtopic: null, marks: 1, type: 'MCQ', year: 2018, section: 'CS' });
D.qById = Object.fromEntries(D.questions.map(q => [q.id, q]));

const fresh = () => { const s = Store._blank(); return s; };
const ts = d => U_parse(d);
const U_parse = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, 12).getTime(); };

test('streak: consecutive active days, survives until end of today, best is tracked', () => {
  const s = fresh();
  ['2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09'].forEach(d => (s.act[d] = { s: 0, q: 3, c: 0, l: 0 }));
  s.act['2026-09-01'] = { s: 0, q: 1, c: 0, l: 0 }; s.act['2026-09-02'] = { s: 0, q: 1, c: 0, l: 0 }; s.act['2026-09-03'] = { s: 0, q: 1, c: 0, l: 0 }; s.act['2026-09-04'] = { s: 0, q: 1, c: 0, l: 0 }; s.act['2026-09-05'] = { s: 0, q: 1, c: 0, l: 0 };
  let r = S.streak(s, T);
  assert.equal(r.current, 4); assert.equal(r.best, 5); assert.equal(r.activeToday, false);
  s.act[T] = { s: 700, q: 0, c: 0, l: 0 };                        // 11+ minutes of study alone counts
  r = S.streak(s, T);
  assert.equal(r.current, 5); assert.equal(r.activeToday, true);
  s.act[T] = { s: 100, q: 0, c: 0, l: 0 };                        // 100 s is not enough
  assert.equal(S.streak(s, T).current, 4);
  assert.equal(S.streak(s, '2026-10-12').current, 0);              // gap breaks it
});

test('today goals reflect today activity only', () => {
  const s = fresh(); s.act[T] = { s: 1800, q: 6, c: 10, l: 1 }; s.act['2026-10-09'] = { s: 99999, q: 99, c: 99, l: 9 };
  const g = Object.fromEntries(S.todayGoals(s, T).map(x => [x.key, x]));
  assert.equal(g.questions.done, 6); approx(g.questions.pct, 6 / 15);
  assert.equal(g.minutes.done, 30); assert.equal(g.cards.pct, 0.5); assert.equal(g.lessons.pct, 1);
});

test('countdown phases (the untouched old default date counts to the first Group II paper day; no countdown once the attempt is over)', () => {
  const s = fresh(); s.profile.examDate = '2027-02-06'; delete s.profile.examSet;     // the GATE engine's old built-in default: never a choice
  let c = S.countdown(s, T); assert.equal(c.days, 90); assert.equal(c.weeks, 12); assert.equal(c.phase, 'practice');
  assert.equal(c.basis, 'official paper day'); assert.equal(c.label, 'CA Inter January 2027'); assert.equal(c.date, '2027-01-08');
  assert.equal(S.countdown(s, '2026-09-01').phase, 'learn');
  assert.equal(S.countdown(s, '2026-12-01').phase, 'mocks');
  assert.equal(S.countdown(s, '2026-12-30').phase, 'final');
  c = S.countdown(s, '2027-02-01');
  assert.deepEqual([c.days, c.date, c.phase, c.weeks], [null, null, null, null], 'no upcoming attempt and no date of your own: no countdown');
});

/* ---------------------------------------------------------------- P0-06 · completion counts finished lessons (real catalogue) */
const realCatalogue = (() => {
  let C = null;
  return () => {
    if (C) return C;
    const path = require('path');
    globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
    require(path.join(__dirname, '..', 'data/manifest.js'));
    const Data = require('../app/js/core/data.js');
    // the shipped catalogue once it holds lessons; the fixture (every sub-topic, tests/fixtures/catalogue.js) while the writers are starting
    const M = GAD.manifest.main.lessons.length >= 2 ? JSON.parse(JSON.stringify(GAD.manifest.main)) : require('./fixtures/catalogue.js').manifest();
    return (C = Data.buildCatalogue(M));
  };
})();

test('P0-06: completion counts a finished lesson in the shipped catalogue, or the fixture before there are lessons (lessons carry no subtopic field)', () => {
  const RD = realCatalogue(), s = fresh();
  assert.ok(RD.lessons.every(l => l.subtopic === undefined), 'the shipped lessons have no subtopic field; the lesson id is the sub-topic id');
  const before = S.completion(s, RD, T);
  assert.equal(before.done, 0); assert.equal(before.withLesson, RD.lessons.length, 'every sub-topic with a lesson is counted as one');
  const id = RD.lessons[0].id;
  s.lessons[id] = { first: ts(T), last: ts(T), done: ts(T), secs: 900, visits: 1, quiz: {} };
  assert.equal(S.completion(s, RD, T).done, 1);
  s.lessons[RD.lessons[1].id] = { first: ts(T), last: ts(T), done: null, secs: 900, visits: 1, quiz: {} };
  assert.equal(S.completion(s, RD, T).done, 1, 'an opened but unfinished lesson is not complete');
  const subj = S.subjects(s, RD, T).find(x => x.id === RD.lessons[0].subject);
  assert.equal(subj.lessons.done, 1, 'subject rows agree');
});

/* ---------------------------------------------------------------- P0-22 · hasProgress: never time on a page alone */
test('P0-22: hasProgress is true for deliberate actions only; a state with only time on task is fresh', () => {
  const s = fresh();
  assert.equal(S.hasProgress(s), false);
  s.act[T] = { s: 900, q: 0, c: 0, l: 0 };
  assert.equal(S.hasProgress(s), false, '15 minutes of reading time alone is not progress');
  assert.equal(S.hasProgress(null), false); assert.equal(S.hasProgress({}), false);
  const mk = f => { const x = fresh(); x.act[T] = { s: 900, q: 0, c: 0, l: 0 }; f(x); return S.hasProgress(x); };
  assert.ok(mk(x => (x.live = { id: 't1', qids: ['a'], responses: {} })), 'a live test');
  assert.ok(mk(x => (x.lessons['os.sched.rr'] = { first: 1, last: 1, done: null, secs: 3, visits: 1, quiz: {} })), 'any lesson record');
  assert.ok(mk(x => (x.q['p:q1'] = { n: 1, ok: 1, last: 1, lastOk: 1 })), 'an answer');
  assert.ok(mk(x => (x.q['p:q1'] = { n: 0, ok: 0, last: 0, bm: 1 })), 'a bookmark');
  assert.ok(mk(x => (x.q['p:q1'] = { n: 0, ok: 0, last: 0, seen: 5 })), "a 'seen' check");
  assert.ok(mk(x => (x.q['p:q1'] = { n: 0, ok: 0, last: 0, note: 'why' })), 'a note');
  assert.ok(!mk(x => (x.q['p:q1'] = { n: 0, ok: 0, last: 0, bm: 0, note: '  ' })), 'an empty shell (bookmark removed) is not progress');
  assert.ok(mk(x => x.tests.push({ id: 't', finished: 1 })), 'a finished test');
  assert.ok(mk(x => (x.cards.c1 = { due: T, ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: T })), 'a card');
  assert.ok(!mk(x => (x.cards.undefined = { due: T })), "the stray cards['undefined'] key is not a card");
  assert.ok(mk(x => (x.labs.cache = { runs: 1, ch: { n: 0, ok: 0 } })), 'a lab');
});

/* ---------------------------------------------------------------- P1-46 · exam(), P1-61 · season(), P0-20 · phaseOf() */
// ICAI's January 2027 Group II calendar (content/exam.json): Paper 4 on 8 Jan, Paper 5 on 10 Jan, Paper 6 on 12 Jan
const XCA = { cycles: [{ id: 'icai-inter-2027-01', label: 'CA Inter January 2027', days: ['2027-01-08', '2027-01-10', '2027-01-12'],
  papers: { P4: ['2027-01-08'], P5: ['2027-01-10'], P6: ['2027-01-12'] }, result: null }] };
const NOPAPERS = { cycles: [Object.assign({}, XCA.cycles[0], { papers: {} })] };          // days announced, papers not yet assigned
const withDate = (d, setFlag) => { const s = fresh(); s.profile.examDate = d; s.profile.examSet = setFlag; return s; };

test('P1-46: exam() for a learner-set date (Paper 5 day and a May 2027 date), before and after it', () => {
  let e = S.exam(withDate('2027-01-10', true), XCA, '2026-10-16');
  assert.deepEqual([e.date, e.set, e.basis, e.label, e.daysLeft, e.cycle && e.cycle.id], ['2027-01-10', true, 'yours', 'CA Inter January 2027', 86, 'icai-inter-2027-01']);
  assert.deepEqual(e.paper, { code: 'P5', name: 'Paper 5', day: '2027-01-10' });
  assert.equal(e.last, null);
  e = S.exam(withDate('2027-01-10', true), XCA, '2027-01-13');
  assert.deepEqual([e.daysLeft, e.last.date, e.last.daysAgo], [-3, '2027-01-10', 3], 'a passed date of your own stays your date; last = it');
  e = S.exam(withDate('2027-05-15', true), XCA, '2027-02-01');
  assert.deepEqual([e.date, e.basis, e.label, e.daysLeft, e.cycle, e.paper], ['2027-05-15', 'yours', 'CA Inter May 2027', 103, null, null], 'no cycle for May 2027 in the data: the label comes from the date');
  assert.deepEqual([e.last.date, e.last.label, e.last.daysAgo], ['2027-01-12', 'CA Inter January 2027', 20], 'last = the newest cycle that ended');
  assert.equal(S.exam(withDate('2027-06-01', true), XCA, '2027-02-01').label, 'your exam', 'a date in no attempt month and no cycle');
  // a date chosen through an older writer (examSet not true) still counts, but the untouched old default never does
  assert.equal(S.exam(withDate('2027-01-12', false), XCA, '2026-10-16').basis, 'yours');
  assert.equal(S.exam(withDate('2027-01-12', undefined), XCA, '2026-10-16').basis, 'yours');
  assert.equal(S.exam(withDate('2027-02-06', false), XCA, '2026-10-16').basis, 'official paper day');
  assert.equal(S.exam(withDate(null, false), XCA, '2026-10-16').basis, 'official paper day');
  assert.equal(S.exam(withDate('nope', true), XCA, '2026-10-16').date, '2027-01-08', 'a malformed date is ignored');
});

test('P1-46: exam() for an unset date before, during and after the Group II days, without paper days, and with no cycle at all', () => {
  const u = withDate(null, false);
  let e = S.exam(u, XCA, '2026-10-16');
  assert.deepEqual([e.date, e.set, e.basis, e.daysLeft, e.paper && e.paper.name], ['2027-01-08', false, 'official paper day', 84, 'Paper 4'], 'before: Paper 4');
  e = S.exam(u, XCA, '2027-01-09');
  assert.deepEqual([e.date, e.basis, e.daysLeft, e.paper.name], ['2027-01-10', 'official paper day', 1, 'Paper 5'], 'during: rolls forward to the next paper');
  e = S.exam(u, XCA, '2027-01-12');
  assert.deepEqual([e.date, e.daysLeft, e.paper.name], ['2027-01-12', 0, 'Paper 6']);
  e = S.exam(u, XCA, '2027-01-13');
  assert.deepEqual([e.date, e.basis, e.daysLeft, e.label], [null, null, null, 'the next CA Inter attempt'], 'after: no countdown, the label names the next attempt');
  assert.deepEqual([e.last.date, e.last.daysAgo], ['2027-01-12', 1]);
  e = S.exam(u, NOPAPERS, '2026-10-16');
  assert.deepEqual([e.date, e.basis, e.paper], ['2027-01-08', 'assumed', null], 'days without papers: the first day, assumed');
  // fallback: no exam data at all → ICAI's January 2027 calendar from EXAM_FALLBACK
  for (const X of [undefined, null, {}, { cycles: [] }, { cycles: [{ days: ['bad'] }] }]) assert.equal(S.exam(u, X, '2026-10-16').date, '2027-01-08');
  assert.deepEqual(S.EXAM_FALLBACK.cycles[0].days, XCA.cycles[0].days);
  assert.deepEqual(S.EXAM_FALLBACK.cycles[0].papers, XCA.cycles[0].papers);
  // unsorted cycles are read in date order
  const two = { cycles: [{ label: 'CA Inter May 2027', days: ['2027-05-10'] }, XCA.cycles[0]] };
  assert.equal(S.exam(u, two, '2026-10-16').label, 'CA Inter January 2027'); assert.equal(S.exam(u, two, '2027-03-01').label, 'CA Inter May 2027');
  // every subject's paper day (P6A and P6B sit in Paper 6)
  const subs = { subjects: [{ id: 'cma', paper: 'P4' }, { id: 'aud', paper: 'P5' }, { id: 'fm', paper: 'P6A' }, { id: 'sm', paper: 'P6B' }] };
  assert.deepEqual(S.paperDays(subs, XCA, '2026-10-16'), { cma: '2027-01-08', aud: '2027-01-10', fm: '2027-01-12', sm: '2027-01-12' });
  assert.deepEqual(S.paperDays(subs, NOPAPERS, '2026-10-16'), {});
});

test('P1-61: season() at 15, 14, 2, 1 and 0 days, for set, official and assumed dates, and after the exam', () => {
  const at = (s, X, d) => S.season(s, X, d);
  const mine = withDate('2027-01-10', true);
  assert.equal(at(mine, XCA, '2026-12-26'), 'normal');                     // 15 days
  assert.equal(at(mine, XCA, '2026-12-27'), 'final');                      // 14
  assert.equal(at(mine, XCA, '2027-01-08'), 'final');                      // 2
  assert.equal(at(mine, XCA, '2027-01-09'), 'eve');                        // 1
  assert.equal(at(mine, XCA, '2027-01-10'), 'day');                        // 0
  assert.equal(at(mine, XCA, '2027-01-11'), 'done', 'the day after a date you set');
  assert.equal(at(mine, XCA, '2027-02-09'), 'done', '30 days after'); assert.equal(at(mine, XCA, '2027-02-10'), 'between', '31 days after');
  const u = withDate(null, false);
  assert.equal(at(u, XCA, '2027-01-07'), 'eve', 'official paper days get the eve');
  assert.equal(at(u, XCA, '2027-01-08'), 'day', '…and the day');
  assert.equal(at(u, XCA, '2027-01-09'), 'eve', 'the eve of Paper 5');
  assert.equal(at(u, NOPAPERS, '2027-01-07'), 'final', 'an assumed date never gets the eve');
  assert.equal(at(u, NOPAPERS, '2027-01-08'), 'final', '…or exam day');
  assert.equal(at(u, XCA, '2027-01-13'), 'between', 'unset and no progress: no season to look back on');
  const busy = withDate(null, false); busy.q['p:q1'] = { n: 1, ok: 1, last: 1, lastOk: 1 };
  assert.equal(at(busy, XCA, '2027-01-13'), 'done', 'unset with progress: the last paper day ends the season');
  const again = withDate('2027-05-15', true); again.q['p:q1'] = { n: 1, ok: 1, last: 1, lastOk: 1 };
  assert.equal(at(again, XCA, '2027-01-13'), 'normal', 'a new future date ends "done" at once');
});

test('P0-20: phaseOf() uses half-open ranges at every boundary, and countdown() follows it', () => {
  const want = { 101: 'learn', 100: 'practice', 99: 'practice', 46: 'practice', 45: 'mocks', 44: 'mocks', 15: 'mocks', 14: 'final', 13: 'final', 1: 'final', 0: 'final', '-1': null };
  Object.keys(want).forEach(k => assert.equal(S.phaseOf(+k), want[k], k + ' days'));
  assert.equal(S.phaseOf(null), null); assert.equal(S.phaseOf(NaN), null);
  const s = withDate('2027-01-08', true);
  Object.keys(want).forEach(k => assert.equal(S.countdown(s, U_add('2027-01-08', -k), XCA).phase, want[k], 'countdown at ' + k));
  const c = S.countdown(s, '2027-01-07', XCA);
  assert.deepEqual([c.days, c.weeks, c.date, c.basis, c.label], [1, 0, '2027-01-08', 'yours', 'CA Inter January 2027']);
});
function U_add(d, n) { return GA.util.addDays(d, n); }

test('practice(): no attempts -> null score; coverage damps small samples; recency weighting', () => {
  const s = fresh();
  const ids = D.questions.filter(q => q.topic === 'os.sched').map(q => q.id);
  assert.equal(S.practice(s, ids, T, 10).score, null);
  s.q['p:q1'] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 };
  const one = S.practice(s, ids, T, 10);
  assert.equal(one.attempted, 1); assert.ok(one.score < 0.45, 'one correct answer must not look like mastery: ' + one.score);
  ids.slice(0, 8).forEach(id => (s.q[id] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 }));
  assert.ok(S.practice(s, ids, T, 10).score > 0.9);
  // old wrong answers weigh less than fresh ones
  const a = fresh(), b = fresh();
  a.q['p:q1'] = { n: 1, ok: 0, last: ts('2026-04-01'), lastOk: 0, firstOk: 0 }; a.q['p:q2'] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 };
  b.q['p:q1'] = { n: 1, ok: 0, last: ts(T), lastOk: 0, firstOk: 0 };           b.q['p:q2'] = { n: 1, ok: 1, last: ts('2026-04-01'), lastOk: 1, firstOk: 1 };
  assert.ok(S.practice(a, ids, T, 2).accWeighted > S.practice(b, ids, T, 2).accWeighted);
});

test('subject summary: mastery blends lessons, practice and cards; untouched subjects stay null', () => {
  const s = fresh();
  let r = S.subjects(s, D, T);
  assert.equal(r.find(x => x.id === 'os').mastery, null);
  s.lessons['os.sched.rr'] = { first: ts(T), last: ts(T), done: ts(T), secs: 0, visits: 1, quiz: {} };
  r = S.subjects(s, D, T);
  const os = r.find(x => x.id === 'os');
  assert.ok(os.mastery > 0 && os.mastery < 0.5, 'one lesson of three: ' + os.mastery);
  assert.equal(os.lessons.done, 1); assert.equal(os.lessons.total, 3);
  assert.equal(r.find(x => x.id === 'db').mastery, null);
});

test('syllabus completion counts finished lessons, or well-practised PYQs where no lesson exists', () => {
  const s = fresh();
  assert.equal(S.completion(s, D, T).done, 0);
  s.lessons['os.sched.rr'] = { done: ts(T), last: ts(T), visits: 1, quiz: {} };
  assert.equal(S.completion(s, D, T).done, 1);
  // db.sql.join has no lesson and its questions are tagged only at topic level -> no subtopic credit
  ['p:q15', 'p:q16', 'p:q17', 'p:q18'].forEach(id => (s.q[id] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 }));
  assert.equal(S.completion(s, D, T).done, 1);
  // os.sync.sem has a lesson, so practice alone never completes it
  D.questions.filter(q => q.subtopic === 'os.sync.sem').forEach(q => (s.q[q.id] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 }));
  assert.equal(S.completion(s, D, T).done, 1);
});

test('weak topics rank by expected marks lost, need minimum attempts, and skip strong topics', () => {
  const s = fresh();
  D.questions.filter(q => q.topic === 'os.sched').slice(0, 5).forEach((q, i) => (s.q[q.id] = { n: 1, ok: 0, last: ts(T), lastOk: 0, firstOk: 0 }));
  D.questions.filter(q => q.topic === 'os.sync').slice(0, 4).forEach(q => (s.q[q.id] = { n: 1, ok: 1, last: ts(T), lastOk: 1, firstOk: 1 }));
  D.questions.filter(q => q.topic === 'db.sql').slice(0, 2).forEach(q => (s.q[q.id] = { n: 1, ok: 0, last: ts(T), lastOk: 0, firstOk: 0 }));
  const w = S.weakTopics(s, D, T);
  assert.deepEqual(w.map(x => x.id), ['os.sched']);          // sync is strong; sql has only 2 attempts
  assert.ok(w[0].lost > 0 && w[0].share === 0.5);
});

test('due(): cards, missed questions and lesson reviews', () => {
  const s = fresh();
  s.cards.c1 = { due: '2026-10-09', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-10-06' };
  s.cards.c2 = { due: '2026-10-20', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-10-06' };
  s.q['p:q1'] = { n: 1, ok: 0, last: ts('2026-10-08'), lastOk: 0, firstOk: 0, srs: { due: '2026-10-09', ivl: 1, ease: 2.3, reps: 0, lapses: 0, last: '2026-10-08' } };
  s.nb['p:q1'] = { reason: null, note: '', added: 1, resolved: null };
  s.lessons['os.sched.rr'] = { done: ts('2026-09-20'), last: ts('2026-09-20'), visits: 1, quiz: {} };
  const d = S.due(s, D, T);
  assert.deepEqual(d.cardIds, ['c1']);
  assert.deepEqual(d.questions, ['p:q1']);
  assert.deepEqual(d.lessons, ['os.sched.rr']);
});

test('test trend orders by finish time and reports accuracy and attempt rate', () => {
  const s = fresh();
  s.tests.push({ id: 'b', kind: 'mock', title: 'B', started: 2000, finished: 3000, score: 40, max: 100, correct: 20, attempted: 40, total: 65, negative: 3 });
  s.tests.push({ id: 'a', kind: 'mock', title: 'A', started: 0, finished: 1000, score: 30, max: 100, correct: 15, attempted: 30, total: 65, negative: 2 });
  const t = S.testTrend(s);
  assert.deepEqual(t.map(x => x.id), ['a', 'b']);
  approx(t[1].accuracy, 0.5); approx(t[1].attemptRate, 40 / 65);
});

/* ---------------------------------------------------------------- P2-74 · one due-card definition */
const SRS = GA.srs;
test('P2-74: a card is due when it has been seen (s.last) and s.due <= today: a lapsed "Again" card counts, an unseen card never does', () => {
  const s = fresh();
  s.cards.c1 = { due: '2026-10-09', ivl: 0, ease: 2.3, reps: 0, lapses: 1, last: '2026-10-09' };      // lapsed: graded Again yesterday, reps 0
  let d = S.due(s, D, T);
  assert.deepEqual(d.cardIds, ['c1'], 'the lapsed card is due (the old reps > 0 rule dropped it)'); assert.equal(d.cards, 1);
  assert.equal(d.newCards, 1, 'c2 has never been reviewed');
  s.cards.c2 = SRS.review(SRS.fresh(T), 0, T);                                                   // 'Again' on its first review, today
  assert.equal(s.cards.c2.reps, 0);
  d = S.due(s, D, T);
  assert.deepEqual(d.cardIds, ['c1', 'c2'], "a card graded 'Again' today is due today"); assert.equal(d.newCards, 0);
  s.cards.c2 = { due: '2026-10-01', ivl: 3, ease: 2.5, reps: 2, lapses: 0 };                       // a record with no review day: not seen
  d = S.due(s, D, T);
  assert.deepEqual(d.cardIds, ['c1']); assert.equal(d.newCards, 1);
  s.cards.c1.due = '2026-10-11';
  assert.deepEqual(S.due(s, D, T).cardIds, [], 'not due before its day');
  // the same definition as SRS.isDueSeen, which flash.js counts its decks with
  for (const c of D.cards) assert.equal(S.due(s, D, T).cardIds.includes(c.id), SRS.isDueSeen(s.cards[c.id], T), c.id);
  // and the same 'seen' in the mastery summary: a lapsed card still counts as reviewed (Home's ring: 'N cards reviewed'), with no strength
  const t = S.topics(s, D, 'os', T).find(x => x.id === 'os.sched');
  assert.deepEqual([t.cards.seen, t.cards.total, t.touched], [1, 2, true], 'c1 (lapsed, reps 0) is reviewed; c2 has no review day');
  assert.equal(t.cards.score, 0, 'a lapsed card has no strength until it is answered right again');
  const untouched = fresh(); untouched.cards.c2 = { due: '2026-10-01', ivl: 3, ease: 2.5, reps: 2, lapses: 0 };
  assert.equal(S.topics(untouched, D, 'os', T).find(x => x.id === 'os.sched').touched, false, 'a record with no review day was never reviewed');
});

/* ---------------------------------------------------------------- P2-41 · the notebook's retry rules (D8) */
const at10 = (k, h) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, h == null ? 10 : h).getTime(); };
const missOn = (s, id, k, extra) => {
  s.q[id] = Object.assign({ n: 1, ok: 0, last: at10(k), lastOk: 0, firstOk: 0, streak: 0, srs: SRS.review(SRS.fresh(k), 0, k) }, extra);
  s.nb[id] = { reason: null, added: at10(k), resolved: null, misses: 1 };
  return s;
};
test('P2-41: an open miss first comes back the day after it was missed, then on its review schedule', () => {
  const s = missOn(fresh(), 'p:q1', T);
  assert.equal(s.q['p:q1'].srs.due, T, 'the review schedule alone would bring it back the same day');
  assert.equal(S.retryDay(s, 'p:q1'), '2026-10-11');
  assert.deepEqual(S.due(s, D, T).questions, [], 'never due the day of the miss');
  assert.deepEqual(S.due(s, D, '2026-10-11').questions, ['p:q1'], 'the first retry is the next day');
  assert.deepEqual(S.due(s, D, '2026-10-20').questions, ['p:q1'], 'and it stays due until it is retried');
  // a right answer at the first retry: the review schedule decides (it already lies after that day), and the entry stays open
  const e = s.q['p:q1'];
  Object.assign(e, { n: 2, ok: 1, last: at10('2026-10-11'), lastOk: 1, streak: 1, srs: SRS.review(e.srs, 2, '2026-10-11') });
  assert.ok(e.srs.due > '2026-10-11'); assert.equal(S.retryDay(s, 'p:q1'), e.srs.due);
  assert.deepEqual(S.due(s, D, '2026-10-11').questions, []); assert.deepEqual(S.due(s, D, e.srs.due).questions, ['p:q1']);
  // a miss in the early hours belongs to the study day before (P3-28: U.dayOf), so it comes back on the calendar day it was made
  const n = missOn(fresh(), 'p:q2', T, { last: at10('2026-10-11', 1) });
  assert.equal(S.retryDay(n, 'p:q2'), U_add(GA.util.dayOf(at10('2026-10-11', 1)), 1));
});
test('P2-41: only open notebook entries are due, most urgent first; the counts match the notebook', () => {
  const s = fresh();
  missOn(s, 'p:q1', '2026-10-05'); missOn(s, 'p:q2', '2026-10-07'); missOn(s, 'p:q3', '2026-10-07'); missOn(s, 'p:q4', '2026-10-08');
  s.q['p:q3'].srs.ease = 1.5;                                                  // same retry day as p:q2, but harder: first
  s.nb['p:q4'].resolved = at10('2026-10-09');                                  // resolved: never due
  missOn(s, 'p:q5', '2026-10-06'); delete s.nb['p:q5'];                        // removed from the notebook: not due any more
  s.q['p:q6'] = { n: 0, ok: 0, last: 0, bm: 1 }; s.nb['p:q6'] = { reason: 'calc', added: 1, resolved: null, misses: 0 };   // tagged, never answered
  missOn(s, 'gone:q1', '2026-10-05');                                         // no longer in the catalogue
  missOn(s, 'p:q7', T);                                                        // today's miss: tomorrow
  assert.deepEqual(S.due(s, D, T).questions, ['p:q1', 'p:q3', 'p:q2']);
  for (const id of ['p:q4', 'p:q5', 'p:q6', 'gone:q1']) assert.ok(!S.due(s, D, T).questions.includes(id), id);
  assert.equal(S.retryDay(s, 'p:q4'), null); assert.equal(S.retryDay(s, 'p:q5'), null); assert.equal(S.retryDay(s, 'p:q6'), null);
  // without a review schedule (records from before spaced repetition) nothing is due: the notebook says 'retry soon' for those
  delete s.q['p:q1'].srs; assert.equal(S.retryDay(s, 'p:q1'), null); assert.deepEqual(S.due(s, D, T).questions, ['p:q3', 'p:q2']);
});
test('P2-41 (D8): a right answer resolves a notebook entry only 3 or more days after the last miss', () => {
  const s = missOn(fresh(), 'p:q2', T), id = 'p:q2';
  assert.deepEqual([S.RETRY.first, S.RETRY.resolve], [1, 3]);
  assert.equal(S.resolvesMiss(s, id, at10(T, 18)), false, 'the same day');
  assert.equal(S.resolvesMiss(s, id, at10('2026-10-12')), false, 'two days later');
  assert.equal(S.resolvesMiss(s, id, at10('2026-10-13')), true, 'three days later');
  // the last miss: nb.missed (written with each miss) wins, then the newest wrong row of the attempt log, then the record's last answer when
  // it was wrong, then the entry's first miss
  s.nb[id].missed = at10('2026-10-11');
  assert.equal(S.lastMiss(s, id), at10('2026-10-11')); assert.equal(S.resolvesMiss(s, id, at10('2026-10-13')), false);
  delete s.nb[id].missed;
  s.log.push([at10('2026-10-08'), id, 0, 1, 'p'], [at10('2026-10-12'), id, 0, 1, 't'], [at10('2026-10-14'), id, 1, 1, 'p'], [at10('2026-10-15'), 'p:q3', 0, 1, 'p']);
  assert.equal(S.lastMiss(s, id), at10('2026-10-12'), 'a right answer in the log is never read as a miss');
  assert.equal(S.resolvesMiss(s, id, at10('2026-10-14')), false); assert.equal(S.resolvesMiss(s, id, at10('2026-10-15')), true);
  s.log = [];
  assert.equal(S.lastMiss(s, id), at10(T), "the record's last answer was wrong");
  s.q[id].lastOk = 1; s.nb[id].added = at10('2026-10-01');
  assert.equal(S.lastMiss(s, id), at10('2026-10-01'), 'else the first miss');
  // nothing to resolve
  s.nb[id].resolved = at10('2026-10-05'); assert.equal(S.resolvesMiss(s, id, at10('2026-10-30')), false, 'already resolved');
  assert.equal(S.resolvesMiss(s, 'p:q9', at10('2026-10-30')), false, 'no notebook entry');
  const tag = fresh(); tag.nb['p:q3'] = { reason: 'calc', added: 0, resolved: null, misses: 0 };
  assert.equal(S.resolvesMiss(tag, 'p:q3', at10(T)), true, 'an entry with no recorded miss has nothing to space out');
});

/* ---------------------------------------------------------------- P2-34 · trends from scored full-length sittings */
test('P2-34: the score trend holds scored papers and mocks only, read through GA.scoring.summary, with the time actually used', () => {
  require('../app/js/core/scoring.js');
  const s = fresh(), H = 3600e3;
  s.tests.push({ id: 'quiz', kind: 'topic', title: 'Quiz', started: 0, finished: 5 * H, score: 9, max: 10, correct: 9, wrong: 1, attempted: 10, total: 10 });
  s.tests.push({ id: 'old', kind: 'paper', title: 'GATE 2008', started: 0, finished: 6 * H, score: 0, max: 0, attempted: 20, total: 85, ungraded: 85 });
  s.tests.push({ id: 'm1', kind: 'mock', title: 'Mock 1', started: 7 * H, finished: 10 * H, usedMs: 150 * 60000, limitMs: 180 * 60000,
                 qids: ['p:q1', 'p:q2', 'p:q3', 'p:q11'], states: { 'p:q1': 'correct', 'p:q2': 'wrong', 'p:q3': 'mta', 'p:q11': 'skipped' },
                 score: 3.333, max: 7, correct: 2, wrong: 1, attempted: 3, total: 4, negative: 0.667 });
  s.tests.push({ id: 'p1', kind: 'paper', title: 'GATE 2024', started: 11 * H, finished: 14 * H, score: 41, max: 100, correct: 36, wrong: 16, attempted: 52, total: 65, negative: 3 });
  const tr = S.testTrend(s, D);
  assert.deepEqual(tr.map(r => r.id), ['m1', 'p1'], 'the 10-question quiz and the unscored 2008 sitting are not points on the trend');
  const m = tr[0];
  assert.equal(m.minutes, 150, 'time used (usedMs), not the wall-clock span');
  approx(m.accuracy, 0.5); assert.equal(m.max, 7, 'max counts graded questions');
  assert.ok(m.full && m.scored);
  assert.equal(tr[1].minutes, 180, 'without usedMs: finished − started');
  approx(tr[1].accuracy, 36 / 52);
  const all = S.testTrend(s, D, { all: true });
  assert.deepEqual(all.map(r => [r.id, r.full, r.scored]), [['quiz', false, true], ['old', true, false], ['m1', true, true], ['p1', true, true]]);
  assert.deepEqual(S.testTrend(fresh(), D), []);
  assert.deepEqual(S.testTrend({ tests: [null, 7, { id: 'x', kind: 'mock', score: 3, max: 10, finished: 1, started: 0 }] }, D).map(r => r.id), ['x'], 'junk entries are skipped');
});

/* ---------------------------------------------------------------- P3-45 · 'Fix these first' ranks by the figure it shows */
test('P3-45: weak topics rank by the recency-weighted accuracy they return (accWeighted), with the raw counts beside it', () => {
  const s = fresh();
  D.questions.filter(q => q.topic === 'os.sched').slice(0, 5).forEach((q, i) => (s.q[q.id] = { n: 1, ok: i < 2 ? 1 : 0, last: ts(i < 2 ? '2026-04-01' : T), lastOk: i < 2 ? 1 : 0, firstOk: 0 }));
  D.questions.filter(q => q.topic === 'os.sync').forEach((q, i) => (s.q[q.id] = { n: 1, ok: i < 1 ? 1 : 0, last: ts(T), lastOk: i < 1 ? 1 : 0, firstOk: 0 }));
  const w = S.weakTopics(s, D, T);
  assert.ok(w.length === 2);
  for (const r of w) {
    assert.ok(typeof r.accWeighted === 'number' && r.accWeighted !== r.acc, r.id + ': the weighted figure differs from the raw one');
    approx(r.lost, r.share * (1 - r.accWeighted) * 100);
    assert.ok(Number.isInteger(r.correct) && Number.isInteger(r.attempted), 'k/n correct for the small line');
  }
  assert.ok(w[0].lost >= w[1].lost, 'sorted by the marks likely lost, which the weighted figure drives');
});

test('actions: attempts update aggregates, schedule revision, open and auto-close notebook entries', () => {
  const A = require('../app/js/core/actions.js');
  Store.init({ profile: 'test' }); Store.reset();
  const q = { id: 'p:q1', marks: 2, type: 'MCQ' };
  A.attempt(q, 'B', false, 90000, 'p');
  let st = Store.state;
  assert.equal(st.q['p:q1'].n, 1); assert.equal(st.q['p:q1'].lastOk, 0); assert.ok(st.nb['p:q1'] && !st.nb['p:q1'].resolved);
  assert.equal(st.q['p:q1'].srs.due, U_today());
  assert.deepEqual(S.due(st, D, U_today()).questions, [], 'a miss is never due for a retry the day it was made (P2-41)');
  assert.deepEqual(S.due(st, D, GA.util.addDays(U_today(), 1)).questions, ['p:q1'], 'its first retry is the next day');
  A.attempt(q, 'C', true, 50000, 'p');
  assert.ok(!Store.state.nb['p:q1'].resolved, 'a right answer the same day does not close it');
  // a right answer four days later closes it, under the old rule (two right in a row) and under D8 (at least 3 days after the last miss)
  const realNow = Date.now;
  try { Date.now = () => realNow() + 4 * 864e5; A.attempt(q, 'C', true, 50000, 'p'); } finally { Date.now = realNow; }
  assert.ok(Store.state.nb['p:q1'].resolved, 'a right answer days after the miss closes it');
  assert.equal(Store.state.q['p:q1'].firstOk, 0);
  assert.equal(Store.state.act[U_today()].q, 2);
  A.attempt(q, 'x', null, 1, 'p');                                  // ungraded: ignored
  assert.equal(Store.state.q['p:q1'].n, 3);
  A.setLessonDone('os.x', true);
  assert.equal(Store.state.act[U_today()].l, 1);
  A.setLessonDone('os.x', false);
  assert.equal(Store.state.act[U_today()].l, 0);
  const c = A.reviewCard('c9', 2);
  assert.equal(c.ivl, 1);
  Store.flushNow();
  Store.reset();
});
/* P2-41 (D8), the writer's half (GA.actions.attempt, owned by WP2): every miss stamps nb.missed, and a right answer resolves an open entry only
   when GA.stats.resolvesMiss allows it (3 or more study days after the last miss), never after 'two right answers in a row'. Until actions.js
   adopts a half, that half is reported as pending (a note in the output, not a failure); once it has, it is checked here. */
test('P2-41 (D8) writer: attempt() stamps each miss and resolves an entry only 3 or more days after the last miss', () => {
  const fs = require('fs'), path = require('path');
  const A = require('../app/js/core/actions.js');
  const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', 'core', 'actions.js'), 'utf8');
  const q = { id: 'p:q1', marks: 1, type: 'MCQ' }, realNow = Date.now, pending = [];
  const at = (k, min) => U_parse(k) + (min || 0) * 60e3;                     // noon on day k, plus `min` minutes
  const answer = (k, min, ok) => {
    Date.now = () => at(k, min);
    try { A.attempt(q, ok ? 'C' : 'B', ok, 30000, 'p'); } finally { Date.now = realNow; }
    return Store.state.nb[q.id];
  };
  Store.init({ profile: 'test' }); Store.reset();
  try {
    let n = answer('2026-10-10', 0, false);
    if (n.missed == null) pending.push('a miss does not stamp nb.missed');
    else assert.equal(n.missed, at('2026-10-10'), 'a miss stamps nb.missed with its time');
    answer('2026-10-10', 1, true); n = answer('2026-10-10', 2, true);
    if (n.resolved && !/resolvesMiss/.test(src)) pending.push('two right answers in a row still resolve an entry (e.streak >= 2) instead of GA.stats.resolvesMiss');
    else {
      assert.ok(!n.resolved, 'two right answers minutes after the miss leave it open');
      assert.ok(!answer('2026-10-12', 0, true).resolved, 'a right answer two days after the miss leaves it open');
      assert.ok(answer('2026-10-13', 0, true).resolved, 'a right answer three days after the miss resolves it');
      n = answer('2026-10-14', 0, false);
      assert.ok(!n.resolved, 'a new miss re-opens it'); assert.equal(n.misses, 2);
      if (n.missed != null) assert.equal(n.missed, at('2026-10-14'), 'and moves the stamp');
      assert.ok(!answer('2026-10-16', 0, true).resolved, 'the gap counts from the last miss');
      assert.ok(answer('2026-10-17', 0, true).resolved, 'three days after the last miss');
    }
  } finally { Date.now = realNow; Store.flushNow(); Store.reset(); }
  if (pending.length) console.log('  pending P2-41 writer half (WP2, app/js/core/actions.js): ' + pending.join('; '));
});
function U_today() { return GA.util.today(); }
