/* GA.stats.nextStep (P0-08) over the 12 learner states of docs/ARCHITECTURE.md §10.3, plus its scopes ('subject:', 'after:'), the season
   rules of the final stretch, the eve, exam day and after the exam (P1-61, D20), routes (P1-06) and the one learning order (P1-02).
   States come from tests/next-states.js, which the consumers' own agreement checks reuse. */
globalThis.GA = globalThis.GA || {};
const path = require('path');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js'); require('../app/js/core/srs.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const S = require('../app/js/core/stats.js');
const NS = require('./next-states.js');

// the shipped catalogue once it can carry the 12 states, else the fixture (tests/next-states.js catalogue())
const { D, I, M } = NS.catalogue();
const U = GA.util;
const STATES = NS.states(D, I);
const at = n => STATES.find(c => c.n === n);
const ns = (c, o) => S.nextStep(c.state, D, Object.assign({ today: c.today, I }, o));
const clone = o => JSON.parse(JSON.stringify(o));
const LB = D.lessonById;
const done = (st, id) => !!(st.lessons[id] && st.lessons[id].done);
/* the catalogue's own ids in place of the GATE version's literals: the top paper's learning order P (Paper 4), the crash route CR, the next
   papers in the ranking, and a lesson of the second paper that is not on the crash route */
const MAIN = I.ranking[0], SECOND = I.ranking[1], THIRD = I.ranking[2], P = I.order(MAIN), CR = I.path('crash').lessons;
const OFFROUTE = I.order(SECOND).find(id => !CR.includes(id) && LB[id].status === 'in');
/* the same catalogue with the Group II days announced but no paper assigned to a day: the date is then 'assumed' (no eve, no exam day) */
const DA = Object.assign({}, D, { exam: { cycles: (D.exam ? D.exam.cycles : []).map(c => Object.assign({}, c, { papers: {} })) } });

test('next: the fixture has all 12 learner states, and the table ids are today\'s content', () => {
  assert.equal(STATES.length, 12, 'the demo seeder ran (core/demo.js and its dependencies load): ' + STATES.map(c => c.name).join(' | '));
  assert.deepEqual(I.ranking, ['cma', 'aud', 'fm', 'sm'], 'the papers by their marks (100, 100, 50, 50), syllabus order breaking ties');
  assert.ok(I.order('cma').length >= 7 && I.path('crash').lessons.length >= 3, 'the top paper has a learning order and the crash route exists');
});

test('next: states 1–11 give the table\'s step for kind "any" and kind "lesson"', () => {
  for (const c of STATES.filter(x => x.expect)) {
    for (const kind of ['any', 'lesson']) {
      const s = ns(c, { kind }), want = c.expect[kind];
      assert.ok(s, `${c.n} ${c.name} (${kind}): a step`);
      assert.equal(s.label, want.label, `${c.n} ${c.name} (${kind}): label`);
      assert.equal(s.id, want.id, `${c.n} ${c.name} (${kind}): id`);
      assert.equal(s.season, S.season(c.state, D.exam, c.today));
    }
  }
  // the contract's table, by position in the top paper's learning order (P = I.order(I.ranking[0])) and the crash route (C)
  const P = I.order(I.ranking[0]), C = I.path('crash').lessons;
  const lit = { 1: P[0], 2: P[0], 3: P[1], 4: P[6], 5: P[6], 6: C[2], 8: P[6], 9: P[6], 10: P[6], 11: P[0] };
  Object.keys(lit).forEach(n => assert.equal(ns(at(+n)).id, lit[n], 'state ' + n));
  assert.equal(ns(at(7)).kind, 'test'); assert.equal(ns(at(7), { kind: 'lesson' }).id, P[0]);
});

test('next: state 12, the demo, continues its newest real unfinished lesson', () => {
  const c = at(12), st = c.state;
  assert.ok(Object.keys(st.lessons).length >= 5, 'the demo has lesson records');
  const real = r => r && (r.done || r.secs >= 120 || (r.quiz && Object.values(r.quiz).some(e => e && e.n > 0)) || (r.at && r.at.h));
  const stamp = r => Math.max(r.last || 0, r.first || 0, typeof r.done === 'number' ? r.done : 0);
  const newest = Object.keys(st.lessons).filter(id => LB[id] && real(st.lessons[id])).sort((a, b) => stamp(st.lessons[b]) - stamp(st.lessons[a]))[0];
  assert.ok(newest && !st.lessons[newest].done, 'the seeded demo leaves its newest lesson open (' + newest + ')');
  for (const kind of ['any', 'lesson']) { const s = ns(c, { kind }); assert.equal(s.label, 'Continue'); assert.equal(s.id, newest); }
});

test('next: every step has the contract\'s shape; lesson hrefs carry focus=1 and a saved position', () => {
  const KINDS = ['test', 'lesson', 'retry', 'cards', 'warmup', 'mock', 'season', 'date'], RULES = ['live', 'continue', 'route', 'subject', 'start', 'final', 'eve', 'day', 'done', 'end'];
  for (const c of STATES) for (const kind of ['any', 'lesson']) {
    const s = ns(c, { kind });
    for (const k of ['kind', 'rule', 'label', 'title', 'id', 'subject', 'minutes', 'reason', 'href', 'season']) assert.ok(k in s, `${c.n} ${kind}: ${k}`);
    assert.ok(KINDS.includes(s.kind) && RULES.includes(s.rule), c.n + ' kind/rule');
    assert.ok(typeof s.title === 'string' && s.title && typeof s.reason === 'string' && s.reason, c.n + ' title and reason');
    assert.ok(!/undefined|NaN|null/.test(s.title + s.reason + s.href), `${c.n}: no placeholders: ${s.title} · ${s.reason} · ${s.href}`);
    if (s.kind === 'lesson') {
      assert.equal(s.title, LB[s.id].title); assert.equal(s.subject, LB[s.id].subject); assert.equal(s.minutes, LB[s.id].minutes);
      assert.ok(new RegExp('^#/l/' + s.id.replace(/\./g, '\\.') + '\\?focus=1(&path=[^#&]+)?$').test(s.href), c.n + ' href ' + s.href);
    }
  }
  assert.equal(ns(at(7)).href, '#/test/run/diag-1'); assert.equal(ns(at(7)).reason, '3 of 10 answered · 19:00 left');
  assert.equal(ns(at(6)).href, '#/l/' + CR[2] + '?focus=1&path=crash'); assert.match(ns(at(6)).reason, /^On route: Crash course · 2 of \d+$/);
  assert.equal(ns(at(3)).reason, 'after ' + LB[P[0]].title, '"after <title>" within one subject');
  assert.match(ns(at(1)).reason, /^Paper 4 · 100 marks, written first \(8 Jan\)$/);
  assert.match(ns(at(4)).reason, /^opened (today|yesterday|\d+ days ago)$/);
  const st = clone(at(4).state); st.lessons[P[6]].at = { h: 'malloc-and-free', t: st.lessons[P[6]].last + 1000 };
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).href, '#/l/' + P[6] + '?focus=1#malloc-and-free', 'Continue opens the last section read');
});

test('next: PYQ answers, card reviews, labs, peeks and time on a page never change the step', () => {
  for (const c of STATES.filter(x => x.n !== 7 && x.n !== 12)) {
    const base = ns(c), st = clone(c.state);
    D.questions.filter(q => q.subject === SECOND).slice(0, 5).forEach(q => (st.q[q.id] = { n: 3, ok: 1, last: Date.now(), lastOk: 1, firstOk: 0 }));
    st.cards[D.cards[100].id] = { due: U.addDays(c.today, 5), ivl: 5, ease: 2.5, reps: 2, lapses: 0, last: c.today };
    st.labs.cache = { runs: 9, ch: { n: 3, ok: 2 } };
    st.act[c.today] = { s: 5400, q: 5, c: 1, l: 0 };
    const peek = I.order(SECOND)[3];
    if (!st.lessons[peek]) st.lessons[peek] = { first: Date.now() + 864e5, last: Date.now() + 864e5, done: null, secs: 30, visits: 3, quiz: {} };
    const after = S.nextStep(st, D, { today: c.today, I });
    if (base.kind === 'cards' || base.kind === 'retry') continue;     // final-stretch revision steps read cards and misses by design
    assert.equal(after.href, base.href, `${c.n} ${c.name}: ${base.href} → ${after.href}`);
  }
  const orig = clone(at(4).state); ns(at(4)); assert.deepEqual(at(4).state, orig, 'nextStep never mutates the state');
});

test('next: a started lesson beats the route, the route beats the current subject, focus picks the subject', () => {
  const st = clone(at(6).state), crash = I.path('crash').lessons;
  st.lessons[OFFROUTE] = { first: Date.now(), last: Date.now(), done: null, secs: 300, visits: 1, quiz: {} };
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).id, OFFROUTE, 'Continue beats the route');
  st.lessons[OFFROUTE].done = Date.now();
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).id, crash[2], 'then the route');
  st.profile.route = null;
  const sub = S.nextStep(st, D, { today: NS.TODAY, I });
  assert.equal(sub.rule, 'subject'); assert.equal(sub.subject, SECOND, 'no route: the newest real record\'s subject');
  st.profile.focus = THIRD;
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).id, I.order(THIRD)[0], 'profile.focus names the current subject');
  st.profile.focus = 'nope';
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).subject, SECOND, 'an unknown focus is ignored');
  st.profile.route = 'no-such-route';
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I }).subject, SECOND, 'an unknown route is ignored');
  const fin = clone(at(1).state); fin.profile.route = 'crash'; crash.forEach(id => (fin.lessons[id] = { first: 1, last: 1, done: 2, secs: 900, visits: 1, quiz: {} }));
  assert.notEqual(S.nextStep(fin, D, { today: NS.TODAY, I }).rule, 'route', 'a finished route falls through');
});

test('next: a finished subject hands over in the ranking with a computed reason; everything done ends in a full mock', () => {
  const st = NS.blank(), t = Date.now();
  I.order(MAIN).filter(id => LB[id].status === 'in').forEach((id, i) => (st.lessons[id] = { first: t + i, last: t + i, done: t + i + 1, secs: 900, visits: 1, quiz: {} }));
  const s = S.nextStep(st, D, { today: NS.TODAY, I });
  const nextSub = I.ranking[I.ranking.indexOf(MAIN) + 1];
  assert.equal(s.subject, nextSub); assert.equal(s.id, I.order(nextSub)[0]);
  assert.equal(s.reason, `${D.subjectById[MAIN].name} done · next: ${D.subjectById[nextSub].name}`);
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I, scope: 'subject:' + MAIN }), null, 'scope subject: null when the subject is finished');
  const all = NS.blank();
  D.lessons.filter(l => l.status === 'in').forEach((l, i) => (all.lessons[l.id] = { first: t + i, last: t + i, done: t + i + 1, secs: 900, visits: 1, quiz: {} }));
  const end = S.nextStep(all, D, { today: NS.TODAY, I });
  assert.deepEqual([end.kind, end.rule, end.label, end.href], ['mock', 'end', 'Take a full mock', '#/test?new=mock']);
  assert.equal(S.nextStep(all, D, { today: NS.TODAY, I, kind: 'lesson' }), null);
  assert.equal(S.nextLesson(all, D, { today: NS.TODAY, I }), null);
});

test('next: scope "subject:<id>" (subject hero, map panels): Continue within it, else its first open lesson, focus=1', () => {
  const c = at(4);
  const s = ns(c, { scope: 'subject:' + MAIN }); assert.equal(s.id, P[6]); assert.equal(s.label, 'Continue');
  const o = ns(c, { scope: 'subject:' + SECOND }); assert.equal(o.id, I.order(SECOND)[0]); assert.equal(o.label, 'Start here'); assert.equal(o.href, '#/l/' + o.id + '?focus=1');
  assert.equal(ns(at(7), { scope: 'subject:' + MAIN }).id, P[0], 'no live test in subject scope');
  assert.equal(ns(c, { scope: 'subject:nope' }), null);
  const peek = ns(at(5), { scope: 'subject:' + SECOND });
  assert.equal(peek.id, I.order(SECOND)[0], 'a peek is not Continue inside its subject either');
});

test('P1-02: the lesson footer (scope "after:") follows I.order, never targets a done lesson, has no focus=1, and keeps the route', () => {
  const demo = at(12).state;
  const touched = Object.keys(demo.lessons).filter(id => LB[id]);
  assert.ok(touched.length >= 5, 'the demo learner touched ' + touched.length + ' lessons');
  for (const id of touched) {
    const s = S.nextStep(demo, D, { today: at(12).today, I, scope: 'after:' + id });
    if (!s) continue;
    assert.ok(!done(demo, s.id), `after ${id}: the footer coral targets ${s.id}, which is done`);
    assert.equal(s.subject, LB[id].subject, 'within the subject');
    assert.ok(!/focus=1/.test(s.href), 'a footer link never moves the current subject');
    const ord = I.order(LB[id].subject); assert.ok(ord.indexOf(s.id) > ord.indexOf(id), 'after it in I.order');
  }
  // walking a subject by the footer from its first lesson reads every in-syllabus lesson once, each after its in-subject prerequisites
  for (const sub of D.subjects) {
    const st = NS.blank(), ord = I.order(sub.id), inOrd = ord.filter(id => LB[id].status === 'in'), seen = [];
    let cur = inOrd[0], guard = 0;
    while (cur && guard++ < 400) {
      (LB[cur].needs || []).filter(n => LB[n] && LB[n].subject === sub.id && LB[n].status === 'in').forEach(n => assert.ok(done(st, n), `${sub.id}: ${cur} before its prerequisite ${n}`));
      st.lessons[cur] = { first: guard, last: guard, done: guard + 1, secs: 900, visits: 1, quiz: {} }; seen.push(cur);
      const s = S.nextStep(st, D, { today: NS.TODAY, I, scope: 'after:' + cur });
      cur = s && s.id;
    }
    assert.deepEqual(seen, inOrd, sub.id + ': the footer chain is the in-syllabus learning order');
  }
  // the outside-2027 group comes last in I.order, as one group, and its footer stays inside the group
  for (const sub of D.subjects) {
    const ord = I.order(sub.id), k = ord.findIndex(id => LB[id].status !== 'in');
    if (k < 0) continue;
    assert.ok(ord.slice(k).every(id => LB[id].status !== 'in'), sub.id + ': lessons outside the 2027 syllabus text are last');
    const last = ord.filter(id => LB[id].status === 'in').pop();
    assert.equal(S.nextStep(NS.blank(), D, { today: NS.TODAY, I, scope: 'after:' + last }), null, sub.id + ': the in-syllabus sequence ends at the subject\'s end');
  }
  // on a route the footer follows the route (the URL's path wins over profile.route)
  const crash = I.path('crash').lessons, st = NS.blank();
  const r = S.nextStep(st, D, { today: NS.TODAY, I, scope: 'after:' + crash[0], route: 'crash' });
  assert.equal(r.id, crash[1]); assert.equal(r.href, '#/l/' + crash[1] + '?path=crash'); assert.equal(r.rule, 'route');
  st.profile.route = 'crash';
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I, scope: 'after:' + crash[0] }).id, crash[1], 'profile.route without ?path=');
  if (I.path('zero') && I.path('zero').lessons.indexOf(crash[0]) >= 0) assert.equal(S.nextStep(st, D, { today: NS.TODAY, I, scope: 'after:' + crash[0], route: 'zero' }).id, I.path('zero').lessons[I.path('zero').lessons.indexOf(crash[0]) + 1]);
  assert.equal(S.nextStep(st, D, { today: NS.TODAY, I, scope: 'after:not.a.lesson' }), null);
});

test('P1-61: the final stretch never names an unopened lesson; the eve, exam day and after the exam have their own step', () => {
  const T = NS.TODAY, k = n => U.addDays(T, n);
  const setDate = (st, n) => { st.profile.examDate = k(n); st.profile.examSet = true; return st; };
  // 10 days out: Continue, else Revise, else Retry 5, else Review N due, else Quick 20, else a full mock
  let st = setDate(clone(at(10).state), 10);
  assert.equal(S.nextStep(st, D, { today: T, I }).label, 'Continue');
  st = setDate(NS.blank(), 10);
  assert.deepEqual([S.nextStep(st, D, { today: T, I }).label, S.nextStep(st, D, { today: T, I }).href], ['Take a full mock', '#/test?new=mock'], 'nothing at all: a full mock, never a new lesson');
  assert.equal(S.nextStep(st, D, { today: T, I, kind: 'lesson' }).id, P[0], 'a lesson consumer still names a lesson (the planner carries "no new topics")');
  st.cards[D.cards[0].id] = { due: k(4), ivl: 4, ease: 2.5, reps: 1, lapses: 0, last: k(-1) };
  assert.deepEqual([S.nextStep(st, D, { today: T, I }).label, S.nextStep(st, D, { today: T, I }).href], ['Quick 20', '#/flash/all?mode=quick']);
  st.cards[D.cards[1].id] = { due: k(-1), ivl: 2, ease: 2.5, reps: 1, lapses: 0, last: k(-3) };
  let s = S.nextStep(st, D, { today: T, I });
  assert.deepEqual([s.kind, s.label, s.title, s.href], ['cards', 'Review', '1 due card', '#/flash/all']);
  const q = D.questions.find(x => x.subject === SECOND && x.hasKey);
  st.q[q.id] = { n: 1, ok: 0, last: Date.parse(k(-2) + 'T10:00:00'), lastOk: 0, firstOk: 0, srs: { due: k(-1), ivl: 1, ease: 2.3, reps: 0, lapses: 1, last: k(-2) } }; st.nb[q.id] = { resolved: null };
  s = S.nextStep(st, D, { today: T, I });
  assert.deepEqual([s.kind, s.label, s.title, s.href], ['retry', 'Retry', '1 missed question', '#/notebook?retry=5']);
  st.lessons[P[0]] = { first: 1, last: Date.parse(k(-20) + 'T10:00:00'), done: Date.parse(k(-20) + 'T10:30:00'), secs: 900, visits: 1, quiz: {} };
  s = S.nextStep(st, D, { today: T, I });
  assert.deepEqual([s.label, s.id, s.rule], ['Revise', P[0], 'final']);
  // eve (learner-set): Quick 20 when cards exist, else Retry, else the warm-up test; exam day: 10 cards you know, else the warm-up test
  st = setDate(clone(at(4).state), 1);
  s = S.nextStep(st, D, { today: T, I }); assert.deepEqual([s.season, s.kind, s.href], ['eve', 'warmup', '#/test?new=warmup']);
  assert.equal(S.nextStep(st, D, { today: T, I, kind: 'lesson' }).id, P[6], 'the eve, kind lesson: the final chain');
  st.cards[D.cards[0].id] = { due: k(3), ivl: 3, ease: 2.5, reps: 1, lapses: 0, last: k(-2) };
  s = S.nextStep(st, D, { today: T, I }); assert.deepEqual([s.label, s.title, s.href], ['Quick 20', 'your shakiest due cards', '#/flash/all?mode=quick']);
  st = setDate(clone(at(4).state), 0);
  s = S.nextStep(st, D, { today: T, I }); assert.deepEqual([s.season, s.label, s.href], ['day', 'Warm up', '#/test?new=warmup']);
  st.cards[D.cards[0].id] = { due: k(3), ivl: 3, ease: 2.5, reps: 1, lapses: 0, last: k(-2) };
  s = S.nextStep(st, D, { today: T, I }); assert.deepEqual([s.label, s.title, s.href], ['Warm up', '10 cards you know', '#/flash/all?mode=warm']);
  // integration (WP11's request): a bounded round already done today is never named again (SRS.roundDone): exam day then opens today's plan,
  // the eve falls through to its retry rule and the warm-up test, the final fortnight to the warm-up or the mock
  const doneRound = (st0, n) => { for (let i = 0; i < n; i++) st0.cards['rd-' + i] = { due: k(5), ivl: 5, ease: 2.5, reps: 1, lapses: 0, last: T }; return st0; };
  s = S.nextStep(doneRound(st, 10), D, { today: T, I }); assert.deepEqual([s.kind, s.label, s.href], ['plan', 'Exam day', '#/plan'], 'exam day, warm-up done');
  st = setDate(clone(at(4).state), 1); st.cards[D.cards[0].id] = { due: k(3), ivl: 3, ease: 2.5, reps: 1, lapses: 0, last: k(-2) };
  s = S.nextStep(doneRound(st, 20), D, { today: T, I }); assert.deepEqual([s.season, s.kind, s.href], ['eve', 'warmup', '#/test?new=warmup'], 'the eve, Quick 20 done');
  st = setDate(NS.blank(), 10); st.cards[D.cards[0].id] = { due: k(4), ivl: 4, ease: 2.5, reps: 1, lapses: 0, last: k(-1) };
  s = S.nextStep(doneRound(st, 20), D, { today: T, I }); assert.deepEqual([s.label, s.href], ['Take a full mock', '#/test?new=mock'], 'the final fortnight, Quick 20 done');
  // an assumed date never gets the eve or exam day
  st = clone(at(4).state);
  assert.equal(S.nextStep(st, DA, { today: '2027-01-07', I }).season, 'final');
  assert.equal(S.nextStep(st, DA, { today: '2027-01-08', I }).season, 'final');
  assert.equal(S.nextStep(st, D, { today: '2027-01-07', I }).season, 'eve', 'an official paper day has its eve');
  // … but when the paper may be today or tomorrow the chain's last rule is the 10-question warm-up, as on the plan, never a 3-hour mock
  const bare = NS.blank();
  for (const [day, w] of [['2027-01-07', 'tomorrow'], ['2027-01-08', 'today']]) {
    s = S.nextStep(bare, DA, { today: day, I });
    assert.deepEqual([s.season, s.kind, s.rule, s.label, s.title, s.href, s.reason], ['final', 'warmup', 'final', 'Warm up', '10 questions', '#/test?new=warmup', `your paper may be ${w}, so nothing heavy`], day);
  }
  assert.equal(S.nextStep(bare, DA, { today: '2027-01-06', I }).href, '#/test?new=mock', 'two days out: a full mock');
  // a live test still comes first in every season
  st = setDate(clone(at(7).state), 0);
  assert.equal(S.nextStep(st, D, { today: T, I }).label, 'Resume test');
  // after the exam: Set my next exam date (until GA.engage.recap is ready), and lessons go back to the normal rules
  st = setDate(clone(at(4).state), -3);
  const engage = GA.engage;
  try {
    GA.engage = {};                                       // recap() not there yet (or not ready): set the next date
    s = S.nextStep(st, D, { today: T, I });
    assert.deepEqual([s.season, s.kind, s.label, s.href], ['done', 'date', 'Set my next exam date', '#/plan?set=exam']);
    assert.equal(s.reason, S.exam(st, D.exam, T).last.label + ' is over');
    GA.engage = { recap: () => null };
    assert.equal(S.nextStep(st, D, { today: T, I }).label, 'Set my next exam date');
    assert.equal(S.nextStep(st, D, { today: T, I, kind: 'lesson' }).id, P[6]);
    GA.engage = { recap: () => ({ href: '#/wrapped?range=season', range: { key: 'season' } }) };
    s = S.nextStep(st, D, { today: T, I }); assert.deepEqual([s.kind, s.label, s.href], ['season', 'See your season', '#/wrapped?range=season']);
  } finally { GA.engage = engage; }
});

test('P2-37 (D8): in the final stretch "Review" names today\'s share of the due cards (SRS.dayShare); at the daily limit the card rounds end', () => {
  const T = NS.TODAY, k = n => U.addDays(T, n), SRS = GA.srs;
  if (typeof SRS.dayShare !== 'function') return;                                   // srs.js predates the share: (d) counts every due card
  // the verifier's state: 9 days to a learner-set date, 60 minutes a day (a limit of 60 reviews), 150 cards due, 26 reviewed already today
  const st = NS.blank(); st.profile.examDate = k(9); st.profile.examSet = true; st.profile.goals.minutes = 60;
  D.cards.slice(0, 150).forEach(c => (st.cards[c.id] = { due: k(-1), ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: k(-4), first: k(-20) }));
  D.cards.slice(150, 176).forEach(c => (st.cards[c.id] = { due: k(3), ivl: 3, ease: 2.5, reps: 3, lapses: 0, last: T, first: k(-20) }));
  const sh = SRS.dayShare(st, S.due(st, D, T).cards, T, S.season(st, D.exam, T));
  assert.deepEqual([sh.on, sh.limit, sh.used, sh.today, sh.over], [true, 60, 26, 34, 116]);
  let s = S.nextStep(st, D, { today: T, I });
  assert.deepEqual([s.kind, s.rule, s.label, s.title, s.minutes, s.reason, s.href], ['cards', 'final', 'Review', '34 due cards', 17, '116 more wait for tomorrow', '#/flash/all']);
  // the share reviewed: 116 cards still wait for tomorrow and none is left for today, so neither 'Review' nor 'Quick 20' (which would serve the
  // same due cards first): the chain's last rule
  D.cards.slice(0, 34).forEach(c => (st.cards[c.id] = SRS.review(st.cards[c.id], 2, T, { cap: SRS.capFor(9) })));
  assert.equal(SRS.dayShare(st, S.due(st, D, T).cards, T, 'final').today, 0);
  s = S.nextStep(st, D, { today: T, I });
  assert.deepEqual([s.kind, s.rule, s.label, s.href], ['mock', 'final', 'Take a full mock', '#/test?new=mock']);
  assert.equal(S.nextStep(st, D, { today: T, I, kind: 'lesson' }).id, P[0], 'a lesson consumer still names a lesson');
  // the next day the waiting cards are the new share; under the limit the step names every due card ('due today')
  s = S.nextStep(st, D, { today: k(1), I });
  assert.deepEqual([s.label, s.title, s.reason], ['Review', '60 due cards', '56 more wait for tomorrow']);
  const few = NS.blank(); few.profile.examDate = k(9); few.profile.examSet = true;
  D.cards.slice(0, 12).forEach(c => (few.cards[c.id] = { due: k(-1), ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: k(-4), first: k(-20) }));
  s = S.nextStep(few, D, { today: T, I });
  assert.deepEqual([s.title, s.minutes, s.reason], ['12 due cards', 6, 'due today']);
  // outside the final season the share is every due card and cards never lead the shared step
  assert.equal(S.nextStep(few, D, { today: k(-30), I }).label, 'Start here');
});

test('P2-72: from the day after the exam to 30 days after, the shared step is the season; then, or once a new date is set, the normal rules', () => {
  const mine = st => { st.profile.examDate = '2027-01-10'; st.profile.examSet = true; return st; };
  const engage = GA.engage;
  try {
    GA.engage = {};                                                                   // recap() not ready: 'Set my next exam date'
    const st = mine(clone(at(4).state));
    for (const [day, sea] of [['2027-01-11', 'done'], ['2027-01-17', 'done'], ['2027-02-09', 'done'], ['2027-02-10', 'between']]) {
      const s = S.nextStep(st, D, { today: day, I });
      assert.equal(s.season, sea, day);
      if (sea === 'done') {
        assert.deepEqual([s.kind, s.rule, s.label, s.title, s.href], ['date', 'done', 'Set my next exam date', 'Your next exam', '#/plan?set=exam'], day);
        assert.equal(s.reason, 'CA Inter January 2027 is over');
      } else assert.deepEqual([s.label, s.id], ['Continue', P[6]], day + ': no season to look back on, the normal rules');
      assert.equal(S.nextStep(st, D, { today: day, I, kind: 'lesson' }).id, P[6], day + ': a lesson consumer keeps the normal rules');
    }
    GA.engage = { recap: () => ({ href: '#/wrapped?range=season', range: { key: 'season' } }) };
    const w = S.nextStep(st, D, { today: '2027-02-09', I });
    assert.deepEqual([w.kind, w.label, w.title, w.href], ['season', 'See your season', 'CA Inter January 2027, wrapped', '#/wrapped?range=season']);
    // the day a new date is set the season is over at once
    const again = clone(st); again.profile.examDate = '2027-05-15';
    const n = S.nextStep(again, D, { today: '2027-01-11', I });
    assert.deepEqual([n.season, n.label, n.id], ['normal', 'Continue', P[6]]);
    // an unset date: the cycle's last day ends the season for a learner with progress; a fresh profile has none to look back on
    assert.equal(S.nextStep(clone(at(4).state), D, { today: '2027-01-13', I }).season, 'done');
    const f = S.nextStep(NS.blank(), D, { today: '2027-01-13', I });
    assert.deepEqual([f.season, f.label, f.id], ['between', 'Start here', P[0]]);
  } finally { GA.engage = engage; }
});

test('next: nextLesson is the kind-"lesson" wrapper, and the old nextLessons() starts with the shared next lesson', () => {
  for (const c of STATES) {
    const a = S.nextLesson(c.state, D, { today: c.today, I }), b = ns(c, { kind: 'lesson' });
    assert.deepEqual(a, b, c.n + ' wrapper');
    const nl = S.nextLessons(c.state, D, 6, { today: c.today, I });
    if (b.season === 'normal') assert.equal(nl.all[0], b.id, `${c.n} ${c.name}: nextLessons().all[0] is the shared next lesson`);
    assert.ok(nl.all.length <= 6 && new Set(nl.all).size === nl.all.length, 'unique, at most n');
    nl.all.forEach(id => assert.ok(!done(c.state, id), 'never a done lesson'));
    nl.inProgress.forEach(id => assert.ok(!done(c.state, id) && S.realLesson(c.state.lessons[id]), 'in progress = real unfinished'));
  }
  assert.ok(!S.nextLessons(at(5).state, D, 3, { today: NS.TODAY, I }).inProgress.includes(I.order(SECOND).find(id => LB[id].status === 'in')), 'a peek is not "in progress"');
  // planner rows: the shared next lesson, then the current subject in I.order
  const nl = S.nextLessons(at(3).state, D, 3, { today: NS.TODAY, I });
  assert.deepEqual(nl.all, [P[1], P[2], P[3]]);
  // partial catalogues (other modules' unit tests) still work
  const mini = { subjects: [{ id: 'os', name: 'OS', topics: [{ id: 'os.a', subtopics: [{ id: 'os.a.x' }, { id: 'os.a.y' }] }] }],   // (synthetic ids)
                 lessons: [{ id: 'os.a.y', title: 'Y', subject: 'os', topic: 'os.a', minutes: 5, needs: ['os.a.x'] }, { id: 'os.a.x', title: 'X', subject: 'os', topic: 'os.a', minutes: 5, needs: [] }], cards: [], questions: [] };
  mini.lessonById = Object.fromEntries(mini.lessons.map(l => [l.id, l])); mini.subjectById = { os: mini.subjects[0] };
  assert.deepEqual(S.nextLessons(NS.blank(), mini, 6).all, ['os.a.x', 'os.a.y'], 'prerequisites first, also without papers or labs');
  assert.equal(S.nextStep(NS.blank(), mini, { today: NS.TODAY }).id, 'os.a.x');
});

test('next: with no ICAI bank (the shipped state today) no step names a test, a mock or a past-question count', () => {
  const D0 = Object.assign({}, D, { questions: [], qById: {}, papers: [], paperById: {} });
  const k = n => U.addDays(NS.TODAY, n), I0 = Ins.build(D0, M.stats);
  const set = (st, n) => { st.profile.examDate = k(n); st.profile.examSet = true; return st; };
  const cases = [NS.blank(), set(NS.blank(), 10), set(NS.blank(), 1), set(NS.blank(), 0), set(clone(at(4).state), 10)];
  for (const st of cases) for (const kind of ['any', 'lesson']) {
    const s = S.nextStep(st, D0, { today: NS.TODAY, I: I0, kind });
    if (!s) continue;
    assert.ok(!/#\/test|#\/pyq/.test(s.href) && !['mock', 'warmup', 'retry'].includes(s.kind), JSON.stringify([s.kind, s.label, s.href]));
    assert.ok(!/question|PYQ|asked/i.test(s.reason), s.reason);
  }
  const start = S.nextStep(NS.blank(), D0, { today: NS.TODAY, I: I0 });
  assert.equal(start.rule, 'start'); assert.match(start.reason, /^Paper 4 · 100 marks, written first \(8 Jan\)$/);
  const all = NS.blank(), t = Date.now();
  D0.lessons.forEach((l, i) => (all.lessons[l.id] = { first: t + i, last: t + i, done: t + i + 1, secs: 900, visits: 1, quiz: {} }));
  const end = S.nextStep(all, D0, { today: NS.TODAY, I: I0 });
  assert.deepEqual([end.kind, end.rule, end.href], ['cards', 'end', '#/flash']);
});

test('next: with no lesson shipped yet the step is the syllabus, never "every lesson is done"', () => {
  const D0 = Object.assign({}, D, { lessons: [], lessonById: {}, cards: [], questions: [], qById: {}, papers: [], paperById: {} });
  const I0 = Ins.build(D0, { diagrams: {}, quiz: {}, embeds: {}, disputes: [] });
  const s = S.nextStep(NS.blank(), D0, { today: NS.TODAY, I: I0 });
  assert.deepEqual([s.kind, s.rule, s.label, s.href], ['browse', 'start', 'Open the syllabus', '#/syllabus']);
  assert.equal(S.nextStep(NS.blank(), D0, { today: NS.TODAY, I: I0, kind: 'lesson' }), null);
});
