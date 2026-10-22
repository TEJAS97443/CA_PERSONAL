/* Retention views (WP11): the pure helpers of app/js/views/flash.js (GA.flashLib) and app/js/views/notebook.js (GA.nbLib), checked against the
   real catalogue and against what GA.actions really stores. Audit items: P0-07 (lesson decks), P0-26 (one exam cap: a button label is the stored
   gap), P1-41 (due-only reviews, lesson-ordered new cards, the daily new-card cap), P1-43 (the notebook's compact paged list, retry 5). */
globalThis.GA = globalThis.GA || {};
const path = require('path');
const U = require('../app/js/core/util.js'); const SRS = require('../app/js/core/srs.js'); require('../app/js/core/scoring.js');
const Store = require('../app/js/core/store.js');
const ST = require('../app/js/core/stats.js');
const A = require('../app/js/core/actions.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const L = require('../app/js/views/flash.js');
globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
/* PassBook: a synthetic catalogue on the CA syllabus (tests/fixtures/practice-catalogue.js: a lesson with 8 cards on every sub-topic, engine-shaped
   papers), so the retention logic is checked whatever the content tree holds today */
const M = require('./fixtures/practice-catalogue.js')();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const I = Ins.build(D, M.stats);
const clone = o => JSON.parse(JSON.stringify(o));

/* ---------------------------------------------------------------- P0-07: every deck id resolves */
test('P0-07: every lesson deck returns that lesson\'s cards (lesson ids are also sub-topic node ids)', () => {
  const withCards = D.lessons.filter(l => D.cards.some(c => c.lesson === l.id));
  assert.equal(withCards.length, M.fixture.lessons, 'lessons with cards: ' + withCards.length);
  for (const l of withCards) {
    const d = L.deckOf(D, l.id), want = D.cards.filter(c => c.lesson === l.id).map(c => c.id);
    assert.ok(d, l.id);
    assert.equal(d.kind, 'lesson', l.id + ' is a lesson deck, not a topic');
    assert.equal(d.name, l.title);
    assert.deepEqual(d.cards.map(c => c.id), want, l.id);
    assert.ok(d.cards.length > 0, l.id + ' is not empty');
    assert.ok(D.nodes[l.id] && D.nodes[l.id].kind === 'sub', l.id + ' is also a sub-topic node (the old lookup matched it first)');
  }
  assert.equal(L.deckCards(D, withCards[0].id).length, D.cards.filter(c => c.lesson === withCards[0].id).length);
});
test('P0-07: subject, topic and "all" decks; an unknown id is no deck (never a false "empty")', () => {
  assert.equal(L.deckOf(D, 'all').cards.length, D.cards.length);
  for (const s of D.subjects) {
    const d = L.deckOf(D, s.id);
    assert.equal(d.kind, 'subject'); assert.equal(d.cards.length, D.cards.filter(c => c.subject === s.id).length);
    for (const t of s.topics) {
      const td = L.deckOf(D, t.id), n = D.cards.filter(c => c.topic === t.id).length;
      assert.equal(td.kind, 'topic', t.id); assert.equal(td.cards.length, n, t.id); assert.equal(td.name, t.name);
    }
  }
  for (const bad of ['nope', '', null, undefined, 'cma.mc.nope']) assert.equal(L.deckOf(D, bad), null, String(bad));
  assert.deepEqual(L.deckCards(D, 'nope'), []);
});

/* ---------------------------------------------------------------- P0-26: a button label is the gap reviewCard stores */
function withCatalogue(fn) {
  const prevD = GA.data.D, prevToday = U.today;
  GA.data.D = D;
  try { return fn(); } finally { U.today = prevToday; GA.data.D = prevD; }
}
const HISTORIES = [
  null,                                                               // new
  { ivl: 0, ease: 2.3, reps: 0, lapses: 1, back: 1 },                 // relearning after a lapse
  { ivl: 1, ease: 2.5, reps: 1, lapses: 0, back: 1 },                 // learnt yesterday
  { ivl: 8, ease: 2.5, reps: 3, lapses: 0, back: 8 },                 // young
  { ivl: 50, ease: 2.6, reps: 6, lapses: 0, back: 12 },               // mature, brought forward by the cap (an early review)
  { ivl: 125, ease: 2.5, reps: 7, lapses: 0, back: 125 }              // mature, on time
];
function agreeOn(exam, from, to, label) {
  withCatalogue(() => {
    Store.init({ profile: 'flash-cap' }); Store.reset();
    A.setProfile({ examDate: exam });
    const ids = D.cards.slice(0, HISTORIES.length).map(c => c.id);
    let checks = 0;
    for (let dl = from; dl <= to; dl++) {
      const day = U.addDays(exam, -dl);
      U.today = () => day;
      ids.forEach((id, i) => {
        const h = HISTORIES[i];
        const base = h ? { due: day, ivl: h.ivl, ease: h.ease, reps: h.reps, lapses: h.lapses, last: U.addDays(day, -h.back) } : null;
        for (let g = 0; g < 4; g++) {
          Store.update(s => { if (base) s.cards[id] = clone(base); else delete s.cards[id]; });
          const pv = L.previewFor(Store.state, D, id, day);
          const st = A.reviewCard(id, g);
          assert.ok(st, 'stored');
          assert.equal(pv[g], U.daysBetween(day, st.due), `${label}: ${dl} days left, history ${i}, grade ${g}: label ${pv[g]} vs stored ${U.daysBetween(day, st.due)}`);
          checks++;
        }
      });
    }
    assert.equal(checks, (to - from + 1) * HISTORIES.length * 4);
    Store.reset();
  });
}
test('P0-26: the four button gaps equal what GA.actions.reviewCard stores, every day from 30 days after to 60 days before the exam', () => {
  agreeOn('2027-01-08', -30, 60, 'shared exam date');
});
test('P0-26: the same agreement on the stored-date fallback (no GA.stats.exam) and for a January 2028 date', () => {
  const ex = ST.exam;
  try { delete GA.stats.exam; agreeOn('2027-01-10', -3, 20, 'fallback'); } finally { GA.stats.exam = ex; }
  agreeOn('2028-01-08', -2, 30, 'January 2028');
});
test('P0-26: labels are exact days; the header note follows the season', () => {
  assert.equal(L.gapLabel(0), '<10 min'); assert.equal(L.gapLabel(1), '1 day'); assert.equal(L.gapLabel(3), '3 days');
  assert.equal(L.gapLabel(125), '125 days'); assert.equal(L.gapLabel(SRS.MAX_IVL), '1 year');
  const E = (dl, label) => ({ daysLeft: dl, label: label || 'Paper 4' });
  assert.equal(L.capNote(E(114)), 'Right now the longest gap is 57 days, so every card you review today comes back before Paper 4.');
  assert.equal(L.capNote(E(16)), 'Right now the longest gap is 8 days, so every card you review today comes back before Paper 4.');
  // from 15 days out (a cap of a week or less) a mature card the cap already pulled forward may wait until after the exam (P2-37), so the
  // note never calls the cap 'the longest gap' (part C: SRS.capText, the sentence the About page prints too)
  assert.equal(L.capNote(E(15)), 'Right now cards come back within 7 days, before Paper 4; ones you know well may wait until after it.');
  assert.equal(L.capNote(E(14)), 'Right now cards come back within 7 days, before Paper 4; ones you know well may wait until after it.');
  assert.equal(L.capNote(E(2)), 'Right now cards come back within 1 day, before Paper 4; ones you know well may wait until after it.');
  for (const dl of [-3, 0, 1, 2, 9, 14, 15, 16, 114]) assert.equal(L.capNote(E(dl)), SRS.capText(E(dl)).now, 'one sentence for /flash and About: ' + dl);
  assert.equal(L.capNote(E(1)), 'Tomorrow is Paper 4: cards you review today come back after it.');
  assert.equal(L.capNote(E(0)), 'Paper 4 is today: reviews follow their natural spacing.');
  assert.equal(L.capNote(E(0, 'your exam')), 'Your exam is today: reviews follow their natural spacing.', 'a sentence never starts in lower case (P1-46)');
  assert.equal(L.capNote(E(1, 'your exam')), 'Tomorrow is your exam: cards you review today come back after it.');
  assert.equal(L.capNote(E(-3)), 'No exam ahead: reviews follow their natural spacing.');
  assert.equal(L.capNote(E(null)), 'No exam ahead: reviews follow their natural spacing.');
  // the header reads the shared exam date: a learner-set January 2028 date is labelled CA Inter January 2028, never the 2027 attempt
  const s = Store._blank(); s.profile.examDate = '2028-01-08'; s.profile.examSet = true;
  const ex = L.examOf(s, D, '2027-03-08');
  assert.equal(ex.daysLeft, U.daysBetween('2027-03-08', '2028-01-08'));
  assert.ok(/2028/.test(L.capNote(ex)), L.capNote(ex));
  // a learner-set date outside the ICAI exam months (January, May, September) with no cycle is 'your exam': on the day the note starts 'Your exam is today'
  const y = Store._blank(); y.profile.examDate = '2029-06-12'; y.profile.examSet = true;
  const ey = L.examOf(y, D, '2029-06-12');
  assert.equal(ey.label, 'your exam'); assert.equal(ey.daysLeft, 0);
  assert.equal(L.capNote(ey), 'Your exam is today: reviews follow their natural spacing.');
  // part C (verifier): 969 days before that date the cap (484 days) is longer than any gap review() stores (MAX_IVL), so the note names the
  // 365-day ceiling, never 'the longest gap is 484 days'
  const far = L.examOf(y, D, '2026-10-17');
  assert.deepEqual([far.daysLeft, SRS.capFor(far.daysLeft)], [969, 484]);
  assert.equal(L.capNote(far), 'Right now the longest gap is 365 days, so every card you review today comes back before your exam.');
});
test('P0-26 (part C): the button gaps equal what GA.actions.reviewCard stores for an exam two years away, across the 365-day ceiling', () => {
  agreeOn('2029-06-12', 725, 740, 'far exam');
});

/* ---------------------------------------------------------------- P1-41: due-only reviews, lesson-ordered new cards, the daily cap */
const T0 = '2026-10-16';
const fresh = () => Store._blank();
const seen = (due, ivl, last, extra) => Object.assign({ due, ivl, ease: 2.5, reps: ivl ? 3 : 0, lapses: 0, last }, extra || {});
const cardsOfLesson = id => D.cards.filter(c => c.lesson === id).map(c => c.id);
const firstLessonWithCards = sub => I.order(sub).find(id => cardsOfLesson(id).length);
test('P1-41: "Review N due" runs due cards only (seen and due), most urgent first; new cards never join it', () => {
  const s = fresh(), ids = D.cards.slice(0, 9).map(c => c.id);
  ids.slice(0, 7).forEach((id, i) => (s.cards[id] = seen(U.addDays(T0, -i), 3, U.addDays(T0, -i - 3))));
  s.cards[ids[7]] = seen(U.addDays(T0, 2), 5, U.addDays(T0, -3));                                  // not due yet
  s.cards[ids[8]] = SRS.review(seen(T0, 9, U.addDays(T0, -9)), 0, T0);                              // marked Again today: due, counts (P2-74)
  const q = L.queueFor(s, D, T0, { deck: 'all', I });
  assert.equal(q.kind, 'due'); assert.equal(q.ids.length, 8, 'the 7 due cards and the lapsed one, nothing new');
  assert.ok(q.ids.every(id => s.cards[id] && s.cards[id].due <= T0));
  assert.equal(q.ids[0], ids[6], 'the card due longest ago comes first');
  const M = L.hubModel(s, D, T0, { I, season: 'normal' });
  assert.equal(M.coral.label, 'Review 8 due'); assert.equal(M.coral.sub, 'about 4 min'); assert.equal(M.coral.href, '#/flash/all');
  assert.equal(M.secondary.kind, 'new', "'Learn 10 new' is the neutral twin"); assert.equal(M.secondary.href, '#/flash/all?mode=new');
  assert.equal(M.all.due, 8); assert.equal(M.all.learned, 9);
});
test('P1-41: "Learn 10 new from your lessons" draws from finished, then opened, then the next planned lessons, in learning order', () => {
  const s = fresh(), A1 = firstLessonWithCards('cma'), B1 = firstLessonWithCards('aud'), C1 = firstLessonWithCards('fm');
  s.lessons[A1] = { first: 1, last: 5, done: 5, secs: 900, visits: 2, quiz: {} };
  s.lessons[B1] = { first: 2, last: 9, done: null, secs: 400, visits: 1, quiz: {} };
  s.lessons[C1] = { first: 3, last: 10, done: null, secs: 4, visits: 1, quiz: {} };                   // a peek: not 'opened'
  const P = L.newPool(s, D, T0, I);
  assert.deepEqual(P.finished, [A1]); assert.deepEqual(P.opened, [B1]);
  assert.ok(P.planned.indexOf(C1) > 0, 'a peeked lesson is only a planned one');
  const q = L.queueFor(s, D, T0, { deck: 'all', mode: 'new', I });
  assert.equal(q.ids.length, 10);
  const a = cardsOfLesson(A1), b = cardsOfLesson(B1);
  assert.deepEqual(q.ids.slice(0, a.length), a.slice(0, 10), 'the finished lesson\'s cards first, in their own order');
  if (a.length < 10) assert.deepEqual(q.ids.slice(a.length), b.slice(0, 10 - a.length), 'then the opened lesson');
  // a fresh learner starts with the shared next step's lesson (Start here: Programming & DS), not a random card
  const f = L.queueFor(fresh(), D, T0, { deck: 'all', mode: 'new', I });
  const start = ST.nextLesson(fresh(), D, { today: T0, I }).id;
  assert.equal(D.cards.find(c => c.id === f.ids[0]).lesson, start, 'first new card comes from ' + start);
  assert.ok(f.ids.every(id => !fresh().cards[id]));
  const M = L.hubModel(fresh(), D, T0, { I, season: 'normal' });
  assert.equal(M.coral.kind, 'new'); assert.equal(M.coral.label, 'Learn 10 new from your lessons'); assert.ok(M.fresh);
  assert.equal(M.coral.sub, 'from ' + D.lessonById[start].title);
});
test('P1-41 (D8): the daily new-card cap from "New flashcards a day" bounds every session that adds new cards', () => {
  const s = fresh(); s.profile.goals.cards = 20;
  const pool = D.cards.slice(100, 140).map(c => c.id);
  pool.slice(0, 15).forEach(id => (s.cards[id] = SRS.review(SRS.fresh(T0), 2, T0)));                 // 15 introduced today
  assert.equal(L.newToday(s, T0), 15); assert.equal(L.dayCap(s), 20);
  assert.equal(L.queueFor(s, D, T0, { deck: 'all', mode: 'new', I }).ids.length, 5, 'only 5 more today');
  pool.slice(15, 20).forEach(id => (s.cards[id] = SRS.review(SRS.fresh(T0), 3, T0)));
  const q = L.queueFor(s, D, T0, { deck: 'all', mode: 'new', I });
  assert.equal(q.ids.length, 0); assert.equal(q.empty, 'cap');
  const lesson = D.cards[300].lesson;
  const dq = L.queueFor(s, D, T0, { deck: lesson, I });
  assert.equal(dq.kind, 'deck'); assert.equal(dq.fresh, 0, 'a lesson deck adds no new cards past the cap');
  const M = L.hubModel(s, D, T0, { I, season: 'normal' });
  assert.equal(M.coral, null, 'nothing due and the cap reached: the view takes the coral from the plan (D18)');
  assert.equal(M.secondary, null); assert.equal(M.left, 0);
  // yesterday's introductions do not count against today
  assert.equal(L.newToday(s, U.addDays(T0, 1)), 0);
  const s0 = fresh(); s0.profile.goals.cards = 0;
  assert.equal(L.queueFor(s0, D, T0, { deck: 'all', mode: 'new', I }).empty, 'cap', 'a cap of 0 turns new cards off');
});
test('P1-41: one deck = its due cards, then its new cards in lesson order within the cap; copy for decks', () => {
  const s = fresh(), les = firstLessonWithCards('sm'), ids = cardsOfLesson(les);
  s.cards[ids[1]] = seen(T0, 3, U.addDays(T0, -3));
  const q = L.queueFor(s, D, T0, { deck: les, I });
  assert.equal(q.ids[0], ids[1], 'the due card first');
  assert.deepEqual(q.ids.slice(1), ids.filter(id => id !== ids[1]), 'then the lesson\'s new cards in order');
  assert.equal(q.sub, `1 due · ${ids.length - 1} new`);
  assert.equal(L.deckLine({ total: 220, learned: 0, due: 0 }), 'not started');
  assert.equal(L.deckLine({ total: 314, learned: 40, due: 7 }), '40 learned · 7 due');
  assert.equal(L.deckLine({ total: 8, learned: 8, due: 0 }), 'all 8 learned');
  const alg = D.cards.filter(c => c.subject === 'sm').slice(0, 7).map(c => c.id);
  const s2 = fresh(); alg.forEach(id => (s2.cards[id] = seen(T0, 2, U.addDays(T0, -2))));
  assert.equal(L.hubModel(s2, D, T0, { I, season: 'normal' }).dueIn, '7 due in Strategic Management');
  s2.cards[D.cards.find(c => c.subject === 'cma').id] = seen(T0, 2, U.addDays(T0, -2));
  assert.equal(L.hubModel(s2, D, T0, { I, season: 'normal' }).dueIn, '8 due in 2 subjects');
});
test('P1-41: unknown and empty sessions say why, with the next due day', () => {
  assert.equal(L.queueFor(fresh(), D, T0, { deck: 'nope' }).kind, 'missing');
  const s = fresh(); s.cards[D.cards[5].id] = seen(U.addDays(T0, 3), 3, T0); s.profile.goals.cards = 0;
  const q = L.queueFor(s, D, T0, { deck: 'all', I });
  assert.equal(q.empty, 'nothing-due'); assert.deepEqual(q.nextDue, { day: U.addDays(T0, 3), n: 1 });
  assert.equal(L.queueFor(fresh(), D, T0, { deck: 'all', mode: 'quick', I }).empty, 'none-seen');
  assert.equal(L.sessionHref('all', 'quick'), '#/flash/all?mode=quick'); assert.equal(L.sessionHref('cma.mc.bep', ''), '#/flash/cma.mc.bep');
  assert.deepEqual(L.parseSession('#/flash/all?mode=warm'), { deck: 'all', mode: 'warm' }); assert.equal(L.parseSession('#/notebook?retry=5'), null);
});

/* ---------------------------------------------------------------- P1-61: the season's coral and the quick sessions */
test('P1-61: /flash coral by season: final "Review N due" or "Quick 20", eve "Quick 20", exam day the warm-up; "Learn 10 new" neutral, hidden on the eve and exam day', () => {
  const exam = '2027-01-08';
  const mk = () => { const s = fresh(); s.profile.examDate = exam; s.profile.examSet = true; return s; };
  const s = mk(); D.cards.slice(0, 30).forEach((c, i) => (s.cards[c.id] = seen(U.addDays(exam, -12 + (i % 5)), 9 + i, U.addDays(exam, -40))));
  const at = (dl, st) => L.hubModel(st || s, D, U.addDays(exam, -dl), { I });
  assert.equal(L.seasonOf(s, D, U.addDays(exam, -10)), 'final');
  let M = at(10);
  assert.equal(M.coral.kind, 'due'); assert.ok(/^Review \d+ due$/.test(M.coral.label)); assert.equal(M.secondary && M.secondary.kind, 'new', 'Learn 10 new stays a neutral link');
  const none = mk(); D.cards.slice(0, 30).forEach((c, i) => (none.cards[c.id] = seen(U.addDays(exam, 3), 20, U.addDays(exam, -15))));
  M = at(10, none);
  assert.equal(M.coral.kind, 'quick'); assert.equal(M.coral.label, 'Quick 20: cards you know least'); assert.equal(M.coral.href, '#/flash/all?mode=quick');
  M = at(1);
  assert.equal(M.season, 'eve'); assert.equal(M.coral.label, 'Quick 20: your shakiest due cards'); assert.equal(M.secondary, null, 'no new cards on the eve');
  M = at(0);
  assert.equal(M.season, 'day'); assert.equal(M.coral.label, 'Warm up: 10 cards you know'); assert.equal(M.coral.href, '#/flash/all?mode=warm'); assert.equal(M.secondary, null);
  assert.equal(at(0, mk()).coral, null, 'exam day with no cards studied: the view takes the shared step');
  assert.equal(at(1, mk()).coral, null);
  // PassBook: a profile that never set a date counts to ICAI's official Paper 4 day (basis 'official paper day', firm), so its eve is the eve too
  const u = fresh(); D.cards.slice(0, 30).forEach((c, i) => (u.cards[c.id] = seen(U.addDays(exam, 3), 20, U.addDays(exam, -15))));
  const sea = L.seasonOf(u, D, U.addDays(exam, -1));
  assert.equal(sea, 'eve', 'the official paper day on its eve: ' + sea);
});
test('P1-61: Quick 20 = the weakest seen cards, due ones first; Warm up = the 10 you know best; both write through the early-review rule', () => {
  const s = fresh(), ids = D.cards.slice(0, 40).map(c => c.id);
  ids.forEach((id, i) => (s.cards[id] = seen(i < 6 ? T0 : U.addDays(T0, 1 + (i % 9)), 2 + i * 3, U.addDays(T0, -(1 + (i % 7))))));
  const q = L.queueFor(s, D, T0, { deck: 'all', mode: 'quick', I });
  assert.equal(q.ids.length, 20); assert.deepEqual(q.ids.slice(0, 6).sort(), ids.slice(0, 6).sort(), 'the due cards first');
  const str = id => SRS.strength(s.cards[id], T0), rest = q.ids.slice(6);
  for (let i = 1; i < rest.length; i++) assert.ok(str(rest[i - 1]) <= str(rest[i]), 'weakest first');
  const w = L.queueFor(s, D, T0, { deck: 'all', mode: 'warm', I });
  assert.equal(w.ids.length, 10);
  const all = ids.map(str).sort((a, b) => b - a);
  assert.ok(w.ids.every(id => str(id) >= all[9] - 1e-9), 'the ten strongest');
  // a warm-up review of a card not yet due keeps its earned interval (P0-26 early review)
  const id = w.ids[0], before = s.cards[id], after = SRS.review(before, 2, T0, { cap: null });
  assert.ok(after.ivl >= before.ivl);
});

/* ---------------------------------------------------------------- the finish card and its coral */
test('P1-41: the finish card counts unique cards (an Again is "relearned"), XP, the streak and what comes back tomorrow', () => {
  const s = fresh(), a = D.cards[0].id, b = D.cards[1].id, c = D.cards[2].id, tomorrow = U.addDays(T0, 1);
  s.cards[a] = seen(tomorrow, 1, T0); s.cards[b] = seen(tomorrow, 1, T0); s.cards[c] = seen(U.addDays(T0, 4), 4, T0);
  const F = L.finishModel([{ id: a, g: 0, xp: 1 }, { id: b, g: 2, xp: 1 }, { id: a, g: 2, xp: 1 }, { id: c, g: 3, xp: 1 }], s, T0, { current: 24, activeToday: true });
  assert.equal(F.cards, 3); assert.equal(F.reviews, 4);
  assert.deepEqual(F.tally, { relearned: 1, hard: 0, good: 1, easy: 1 });
  assert.equal(F.back, 2); assert.equal(F.xp, 4);
  assert.equal(F.line, '+4 XP · today counts (streak 24) · 2 of these come back tomorrow', 'the tone guide\'s line (P2-70)');
  const G = L.finishModel([{ id: c, g: 3, xp: 0 }], s, T0, null);
  assert.equal(G.line, 'it comes back on Tuesday', 'no XP past the daily card cap, no invented streak; a weekday within the week');
  const H = L.finishModel([{ id: a, g: 2, xp: 1 }], s, T0, null);
  assert.equal(H.line, '+1 XP · it comes back tomorrow');
  const J = L.finishModel([{ id: a, g: 2, xp: 1 }, { id: b, g: 2, xp: 1 }], s, T0, null);
  assert.equal(J.line, '+2 XP · all 2 come back tomorrow');
});
test('P2-68 (with P1-41): the finish coral is the plan\'s next open task, named by the task; an empty flash round is skipped; else the shared step', () => {
  const plan = { tasks: [{ id: 'cards', title: 'Review 12 due flashcards', href: '#/flash/all', minutes: 6, done: false }, { id: 'learn', title: 'Finish Dynamic memory', href: '#/l/pds.c.mem#h', minutes: 26, done: false }], next: null };
  plan.next = plan.tasks[0];
  const step = { label: 'Continue', title: 'Pointers', href: '#/l/pds.c.ptr', minutes: 30 };
  const skipEmptyFlash = h => h === '#/flash/all';
  assert.deepEqual(L.nextCoral(plan, step, { skip: skipEmptyFlash }), { kicker: "Next in today's plan", title: 'Finish Dynamic memory', minutes: 26, href: '#/l/pds.c.mem#h', from: 'plan' });
  assert.equal(L.nextCoral(plan, step, {}).title, 'Review 12 due flashcards', 'a round that still has cards stays');
  assert.equal(L.nextCoral({ tasks: [{ title: 'x', href: '#/flash/all', done: true }] }, step, {}).from, 'step', 'a done day hands over to the shared step');
  assert.equal(L.nextCoral(null, null, {}), null);
  // against the real planner: after the plan's card task, the finish coral's href is the plan's next open task
  const P = require('../app/js/core/planner.js');
  const s = fresh(); s.profile.examDate = '2027-01-08'; s.profile.examSet = true;
  const ids = D.cards.slice(0, 4).map(c => c.id);
  ids.forEach(id => (s.cards[id] = seen(T0, 3, U.addDays(T0, -3))));
  const day0 = P.day(s, D, T0, { I });
  const cardRow = day0.tasks.find(t => t.id === 'cards');
  assert.ok(cardRow && cardRow.href === '#/flash/all', 'the plan has the card row');
  s.plan = P.stored(day0);
  ids.forEach(id => (s.cards[id] = SRS.review(s.cards[id], 2, T0))); s.act[T0] = { s: 0, q: 0, c: 4, l: 0 };   // the session reviewed them all
  const day1 = P.day(s, D, T0, { I });
  const skip = h => { const p = L.parseSession(h); return !!p && !L.queueFor(s, D, T0, { deck: p.deck, mode: p.mode, I }).ids.length; };
  const nx = L.nextCoral(day1, ST.nextStep(s, D, { kind: 'any', today: T0, I }), { skip });
  const open = day1.tasks.filter(t => !t.done && !skip(t.href));
  assert.ok(nx, 'a coral');
  if (open.length) assert.equal(nx.href, open[0].href, 'the plan\'s next open task'); else assert.equal(nx.from, 'step');
  assert.notEqual(nx.href, '#/flash/all', 'never the round just finished');
});

test('§10.4: #/flash/all is due cards only (the wave-1 transition is gone): with nothing due it is an empty round whose coral is Learn 10 new', () => {
  const s = fresh();
  let q = L.queueFor(s, D, T0, { deck: 'all', I, season: 'normal' });
  assert.equal(q.kind, 'due'); assert.equal(q.ids.length, 0); assert.equal(q.empty, 'nothing-due'); assert.ok(!q.fallback);
  const A = L.emptyActions(s, D, T0, q, { I, season: 'normal' });
  assert.equal(A.coral && A.coral.href, '#/flash/all?mode=new', 'the empty round offers the new cards as its coral');
  assert.equal(L.queueFor(s, D, T0, { deck: 'all', mode: 'new', I }).ids.length, 10, '?mode=new serves them');
  for (const season of ['final', 'eve', 'day']) assert.equal(L.queueFor(s, D, T0, { deck: 'all', I, season }).empty, 'nothing-due', 'no new cards by the back door in ' + season);
  s.cards[D.cards[9].id] = seen(T0, 3, U.addDays(T0, -3));
  q = L.queueFor(s, D, T0, { deck: 'all', I, season: 'normal' });
  assert.equal(q.kind, 'due'); assert.deepEqual(q.ids, [D.cards[9].id], 'one due card: due-only, no new cards appended');
});

/* ---------------------------------------------------------------- P1-43 / P1-27: the notebook (GA.nbLib) */
const NB = require('../app/js/views/notebook.js');
const NBQ = D.questions.filter(q => q.hasKey && q.subject && q.subject !== 'ga');
/** a state with notebook entries: rows = [{i, due, ease, reason, resolved, misses, last, note, nbNote}] (i indexes NBQ) */
function nbState(rows) {
  const s = fresh();
  for (const r of rows) {
    const id = NBQ[r.i].id;
    s.q[id] = { n: r.misses || 1, ok: 0, last: r.last || 1, lastOk: 0, firstOk: 0, ms: null, streak: 0, bm: 0,
                srs: { due: r.due || T0, ivl: 0, ease: r.ease || 2.5, reps: 0, lapses: 1, last: r.due || T0 } };
    if (r.note) s.q[id].note = r.note;
    s.nb[id] = { reason: r.reason === undefined ? 'concept' : r.reason, note: r.nbNote || '', added: 1, resolved: r.resolved || null, misses: r.misses || 1 };
  }
  return s;
}
const idOf = i => NBQ[i].id;
test('P1-43: 137 open misses are compact pages of 20; "Show 20 more" reaches every entry (the old list stopped at 60)', () => {
  const rows = []; for (let i = 0; i < 137; i++) rows.push({ i, due: U.addDays(T0, (i % 9) - 4), ease: 1.3 + (i % 7) / 10, last: 1000 + i, reason: i % 5 ? 'calc' : null });
  const s = nbState(rows), f = NB.parseFilter({});
  assert.equal(NB.PAGE, 20); assert.equal(NB.RETRY_N, 5);
  const list = NB.select(NB.entries(s, D), f, T0, NB.dueList(s, D, T0));
  assert.equal(list.length, 137, 'every open entry is in the list');
  let shown = NB.PAGE, pages = 1;
  while (shown < list.length) { shown += NB.PAGE; pages++; }
  assert.equal(pages, 7, '7 pages of 20'); assert.equal(list.slice(0, shown).length, 137, 'the last entry is reachable');
  assert.deepEqual(NB.filterQuery(f, 40), { n: 40 }, "'Show 20 more' keeps the page in the address"); assert.deepEqual(NB.filterQuery(f, 20), {}, 'defaults stay out of it');
  const t = NB.tally(NB.entries(s, D), T0);
  assert.deepEqual([t.open, t.resolved, t.total], [137, 0, 137]);
  assert.equal(t.due, rows.filter(r => r.due <= T0).length, 'due = open entries whose retry day has come');
});
test('P1-43: the coral retries the 5 most urgent (the planner\'s constant), the list starts with those 5, and the plan\'s "Retry 5" opens the same five', () => {
  const rows = []; for (let i = 0; i < 12; i++) rows.push({ i, due: U.addDays(T0, -(i % 4)), ease: i % 3 ? 2.5 : 1.7, last: 5000 - i });
  rows.push({ i: 12, due: U.addDays(T0, 3) }, { i: 13, due: U.addDays(T0, -9), resolved: 99 });   // not due yet; resolved (never retried)
  const s = nbState(rows);
  const due = NB.dueList(s, D, T0), ids = NB.retryIds(s, D, T0);
  assert.equal(due.length, 12, 'open and due only'); assert.ok(!due.includes(idOf(12)) && !due.includes(idOf(13)));
  assert.deepEqual(due, ST.due(s, D, T0).questions.filter(id => due.includes(id)), 'one due order: GA.stats.due (the planner reads it too)');
  assert.equal(ids.length, 5); assert.deepEqual(ids, due.slice(0, 5));
  const top = NB.select(NB.entries(s, D), NB.parseFilter({}), T0, due).slice(0, 5).map(e => e.id);
  assert.deepEqual(top, ids, "the list's first five rows are the coral's five");
  assert.deepEqual(NB.select(NB.entries(s, D), NB.parseFilter({}), T0, null, s, D).slice(0, 5).map(e => e.id), ids, 'the same order when select computes the ranks');
  const c = NB.coralOf(s, D, T0);
  assert.equal(c.kind, 'retry'); assert.deepEqual(c.ids, ids);
  assert.equal(c.title, 'Retry the 5 most urgent'); assert.equal(c.kicker, '12 due for a retry · about 15 min');
  assert.equal(NB.coralOf(nbState(rows.slice(0, 3)), D, T0).title, 'Retry the 3 missed questions');
  assert.equal(NB.coralOf(nbState(rows.slice(0, 1)), D, T0).title, 'Retry the missed question');
  const none = NB.coralOf(nbState([{ i: 0, due: U.addDays(T0, 2) }]), D, T0);
  assert.equal(none.kind, 'practise', 'nothing due: a real next step, never a dead end (D18)'); assert.ok(/practise=10/.test(none.href), none.href);
  assert.ok(/^Practise 10 new questions/.test(none.title)); assert.equal(none.kicker, 'Nothing due for a retry · about 40 min');
  // against the real planner: its retry row opens '#/notebook?retry=5' and names the same five questions
  const P = require('../app/js/core/planner.js');
  const sp = clone(s); sp.profile.examDate = '2027-01-08'; sp.profile.examSet = true;
  const row = P.day(sp, D, T0, { I }).tasks.find(t => t.id === 'retry');
  assert.ok(row, 'the plan has a retry row');
  assert.equal(row.href, '#/notebook?retry=' + NB.RETRY_N);
  if (row.qids) assert.deepEqual(row.qids, NB.retryIds(sp, D, T0, row.qids.length));
});
test('P1-43: the first five rows equal the retry queue in any notebook (ties included)', () => {
  const rnd = U.rng(43);
  for (let k = 0; k < 25; k++) {
    const rows = [], n = 3 + Math.floor(rnd() * 30);
    for (let i = 0; i < n; i++) rows.push({ i, due: U.addDays(T0, Math.floor(rnd() * 6) - 3), ease: [1.3, 2.5, 2.5, 2.8][Math.floor(rnd() * 4)], last: Math.floor(rnd() * 5), resolved: rnd() < 0.15 ? 7 : null });
    const s = nbState(rows), ids = NB.retryIds(s, D, T0);
    const top = NB.select(NB.entries(s, D), NB.parseFilter({}), T0, NB.dueList(s, D, T0)).slice(0, ids.length).map(e => e.id);
    assert.deepEqual(top, ids, 'notebook ' + k);
  }
});
test('P1-43: filters (Open / Resolved / All, subject, reason with "not tagged", three sorts) and their address', () => {
  assert.deepEqual(NB.parseFilter({ status: 'bogus', sort: 'nope' }), { status: 'open', subject: '', reason: '', sort: 'due' });
  const f = NB.parseFilter({ status: 'all', subject: 'cma', reason: 'none', sort: 'misses' });
  assert.deepEqual(NB.filterQuery(f, 20), { status: 'all', subject: 'cma', reason: 'none', sort: 'misses' });
  assert.deepEqual(NB.parseFilter(NB.filterQuery(f, 60)), f, 'the address round-trips');
  const s = nbState([{ i: 0, reason: null, misses: 4, last: 10 }, { i: 1, reason: 'calc', misses: 1, last: 30 }, { i: 2, reason: 'calc', misses: 2, last: 20, resolved: 5 }, { i: 3, reason: 'trap', misses: 3, last: 40 }]);
  const E = NB.entries(s, D), ids = l => l.map(e => e.id);
  assert.deepEqual(ids(NB.select(E, NB.parseFilter({ reason: 'none' }), T0)), [idOf(0)], "'Not tagged yet' finds the rows that say 'Tag why'");
  assert.deepEqual(ids(NB.select(E, NB.parseFilter({ status: 'resolved' }), T0)), [idOf(2)]);
  assert.equal(NB.select(E, NB.parseFilter({ status: 'all' }), T0).pop().id, idOf(2), 'resolved entries come last in All');
  assert.deepEqual(ids(NB.select(E, NB.parseFilter({ sort: 'misses' }), T0)), [idOf(0), idOf(3), idOf(1)]);
  assert.deepEqual(ids(NB.select(E, NB.parseFilter({ sort: 'recent' }), T0)), [idOf(3), idOf(1), idOf(0)]);
  const subj = NBQ[1].subject;
  assert.ok(NB.select(E, NB.parseFilter({ subject: subj, status: 'all' }), T0).every(e => e.m.subject === subj));
  assert.equal(NB.reasonLabel('none'), 'Not tagged yet'); assert.equal(NB.reasonLabel('trap'), 'Fell for a trap'); assert.equal(NB.reasonLabel('??'), 'Not tagged yet');
});
test('P1-43: rows say when each entry comes back; unknown ids and null entries are skipped', () => {
  const s = nbState([{ i: 0, due: T0 }, { i: 1, due: U.addDays(T0, 2) }, { i: 2, resolved: Date.parse('2026-10-13T10:00:00') }]);
  s.nb['cs-1999:Q1'] = { reason: null, note: '', added: 1, resolved: null, misses: 1 }; s.nb[idOf(5)] = null;
  const E = NB.entries(s, D), by = id => E.find(e => e.id === id);
  assert.equal(E.length, 3, 'only entries that name a question in the catalogue');
  assert.deepEqual(NB.whenOf(by(idOf(0)), T0, Date.parse('2026-10-16T12:00:00')), { text: 'retry now', now: true });
  assert.deepEqual(NB.whenOf(by(idOf(1)), T0, Date.parse('2026-10-16T12:00:00')), { text: 'retry ' + U.fmtDay(U.addDays(T0, 2), { day: 'numeric', month: 'short' }), now: false });
  assert.equal(NB.whenOf(by(idOf(2)), T0, Date.parse('2026-10-16T12:00:00')).text, 'resolved 3 days ago');
});
test('P1-27: the notebook shows the one note per question (q[id].note), written by setNote; the old notebook copy is never read', () => {
  const s = nbState([{ i: 0, note: 'Units: ms, not s.' }, { i: 1, nbNote: 'stale copy' }]);
  assert.equal(NB.noteOf(s, idOf(0)), 'Units: ms, not s.');
  assert.equal(NB.noteOf(s, idOf(1)), '', 'a note deleted on the card does not come back from nb[id].note');
  assert.equal(NB.noteOf(s, 'nope'), ''); assert.equal(NB.noteOf(null, idOf(0)), '');
  withCatalogue(() => {
    Store.init({ profile: 'nb-note' }); Store.reset();
    const q = NBQ[0];
    A.attempt(q, 'Z', false, 30000, 'p');
    assert.ok(Store.state.nb[q.id], 'a miss opens an entry');
    A.setNote(q.id, 'Read the question twice.');
    assert.equal(NB.noteOf(Store.state, q.id), 'Read the question twice.', 'a note saved in the notebook is the card\'s note');
    A.setNote(q.id, '   ');
    assert.equal(NB.noteOf(Store.state, q.id), '', 'blank deletes it everywhere');
    Store.reset();
  });
});

/* ---------------------------------------------------------------- audit part B (WP11): P1-48, P1-61, P2-37, P2-68, P2-74, P2-12, P2-70 */
require('../app/js/core/pyqlib.js');
const EXAM = '2027-01-08';
const examState = () => { const s = fresh(); s.profile.examDate = EXAM; s.profile.examSet = true; return s; };
const daysLeft = dl => U.addDays(EXAM, -dl);
/** the published card texts, as the session loads them (none until the lessons are written; the fixture's cards have no text) */
function cardTexts() {
  const fs = require('fs'), dir = path.join(__dirname, '..', 'data/cards');
  if (!fs.existsSync(dir)) return [];
  const box = { GAD: { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } } }, vm = require('vm');
  for (const f of fs.readdirSync(dir)) if (/\.js$/.test(f)) vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), box);
  return [].concat(...Object.values(box.GAD.cards || {}));
}
test('P1-48: the answer is spoken from the card text, each formula once as readable text (never the doubled KaTeX text)', () => {
  const tp = t => GA.pyqLib.texPlain(t);                                                                         // the bank's TeX-to-text, whatever its style
  // the verifier's two captures ('n(n+1)/2n(n+1)/2 …' and 'c>0c>0 and n0n0​ …'), and a CA formula card
  assert.equal(L.spokenAnswer('$n(n+1)/2$, a triangle, not $n^2$.'), `${tp('n(n+1)/2')}, a triangle, not ${tp('n^2')}.`);
  assert.equal(L.spokenAnswer('There exist constants $c > 0$ and $n_0$ such that $f(n) \\le c\\,g(n)$ for every $n \\ge n_0$.'),
    `There exist constants ${tp('c > 0')} and ${tp('n_0')} such that ${tp('f(n) \\le c\\,g(n)')} for every ${tp('n \\ge n_0')}.`);
  assert.equal(L.spokenAnswer('Fixed cost / contribution per unit: $\\frac{2{,}00{,}000}{40} = 5000$ units.'), `Fixed cost / contribution per unit: ${tp('\\frac{2{,}00{,}000}{40} = 5000')} units.`);
  // every published card (the lessons' Flashcards sections), whatever exists today
  for (const c of cardTexts()) {
    const said = L.spokenAnswer(c.back), tex = (c.back.match(/\$([^$\n]+)\$/g) || []).map(x => GA.pyqLib.texPlain(x.slice(1, -1)));
    assert.ok(said.length > 0, c.id);
    assert.ok(!/\$[^$\s.][^$]*\$|\\[a-zA-Z]{2,}/.test(said), `${c.id}: TeX left in "${said}"`);   // a lone $ is the parser's end marker (\$)
    for (const t of tex) if (t.length >= 3) assert.ok(!said.includes(t + t), `${c.id}: "${t}" read twice`);
  }
  // without the bank's text helper the fallback still drops TeX markup
  const P = GA.pyqLib; delete GA.pyqLib;
  try { assert.equal(L.spokenAnswer('$n^2$ steps, not $\\log n$'), 'n^2 steps, not log n'); } finally { GA.pyqLib = P; }
});
/** a small stand-in for the rendered answer's DOM (cloneNode, querySelectorAll with tag / .class / [attr] / [attr="v"] lists, remove,
    replaceWith, textContent, ownerDocument.createTextNode): enough for GA.md.textOf and the view's answerWords */
function miniDom() {
  const doc = { createTextNode: t => node('#text', {}, [], t) };
  const match = s => {
    const m = /^([a-z]*)((?:\.[\w-]+)*)((?:\[[^\]]+\])*)$/.exec(s), tag = m[1], cls = (m[2].match(/\.[\w-]+/g) || []).map(c => c.slice(1));
    const at = (m[3].match(/\[[^\]]+\]/g) || []).map(a => { const x = /^\[([\w-]+)(?:="([^"]*)")?\]$/.exec(a); return [x[1], x[2]]; });
    return k => (!tag || k.tag === tag) && cls.every(c => String(k.attrs.class || '').split(/\s+/).includes(c)) && at.every(([a, v]) => a in k.attrs && (v == null || k.attrs[a] === v));
  };
  function node(tag, attrs, kids, text) {
    const n = { tag, attrs: attrs || {}, kids: [], text: text || '', parent: null, ownerDocument: doc,
      get textContent() { return n.tag === '#text' ? n.text : n.kids.map(k => k.textContent).join(''); },
      getAttribute: k => (k in n.attrs ? n.attrs[k] : null),
      cloneNode(deep) { const c = node(n.tag, Object.assign({}, n.attrs), [], n.text); if (deep) n.kids.forEach(k => { const x = k.cloneNode(true); x.parent = c; c.kids.push(x); }); return c; },
      remove() { const p = n.parent; if (p) { p.kids.splice(p.kids.indexOf(n), 1); n.parent = null; } },
      replaceWith(x) { const r = typeof x === 'string' ? doc.createTextNode(x) : x, p = n.parent; if (!p) return; p.kids[p.kids.indexOf(n)] = r; r.parent = p; n.parent = null; },
      querySelectorAll(sel) { const ts = sel.split(',').map(s => match(s.trim())), out = []; (function walk(x) { x.kids.forEach(k => { if (k.tag !== '#text' && ts.some(t => t(k))) out.push(k); walk(k); }); })(n); return out; } };
    (kids || []).forEach(k => { k.parent = n; n.kids.push(k); });
    return n;
  }
  const t = s => doc.createTextNode(s);
  /** a formula as md.js draws it: <span class="m" data-tex> around KaTeX's MathML and its aria-hidden drawing */
  const maths = (tex, said) => node('span', { class: 'm', 'data-tex': tex }, [node('span', { class: 'katex' }, [node('span', { class: 'katex-mathml' }, [t(said)]), node('span', { class: 'katex-html', 'aria-hidden': 'true' }, [t(said)])])]);
  return { node, t, maths };
}
test('P1-48 (with P0-18): the session says the rendered answer through GA.md.textOf: each formula once, in words, no kicker, a line break is a space', () => {
  const MD = require('../app/js/core/md.js'), sp = MD.speak;
  const { node, t, maths } = miniDom();
  // the answer face as run() draws it for '$n(n+1)/2$, a triangle,\nnot $n^2$.' (MD.inline with br: true)
  const md = '$n(n+1)/2$, a triangle,\nnot $n^2$.';
  const fa = node('div', { class: 'fs-a md', id: 'fa' }, [node('span', { class: 'fs-ak' }, [t('Answer')]), maths('n(n+1)/2', 'n(n+1)/2'), t(', a triangle,'), node('br'), t('not '), maths('n^2', 'n2'), t('.')]);
  assert.ok(fa.textContent.includes('n(n+1)/2n(n+1)/2'), 'textContent doubles every formula (the verifier\'s capture)');
  const said = L.answerWords(fa, md);
  assert.equal(said, `${sp('n(n+1)/2')}, a triangle, not ${sp('n^2')}.`);
  assert.equal(said, 'n (n plus 1) over 2, a triangle, not n squared.');
  assert.ok(!/^Answer/.test(said) && !said.includes('n(n+1)/2n(n+1)/2'), said);
  assert.equal(fa.kids[0].attrs.class, 'fs-ak', 'the drawn answer is left as it is (a copy is read)');
  // without GA.md.textOf: the card's Markdown as text; without both: the node without its aria-hidden copies
  const keep = GA.md;
  try {
    GA.md = Object.assign({}, keep); delete GA.md.textOf;
    assert.equal(L.answerWords(fa, md), L.spokenAnswer(md));
    assert.equal(L.answerWords(fa, ''), 'n(n+1)/2, a triangle, not n2.', 'plainOf: MathML text once, kicker dropped, the break a space');
    GA.md = keep;
    assert.equal(L.answerWords(null, md), L.spokenAnswer(md), 'no node: the Markdown');
  } finally { GA.md = keep; }
});
test('P1-61: an empty session takes its coral by season: Quick 20 in the final fortnight (never "Learn 10 new") and on the eve, the warm-up on exam day', () => {
  const s = examState();
  D.cards.slice(0, 30).forEach(c => (s.cards[c.id] = seen(U.addDays(EXAM, 3), 20, U.addDays(EXAM, -15))));   // studied, none due
  // the verifier's state: 10 days out, '#/flash/all' with nothing due put 'Learn 10 new from your lessons' on the coral
  let day = daysLeft(10), Q = L.queueFor(s, D, day, { deck: 'all', I });
  assert.equal(Q.season, 'final'); assert.equal(Q.empty, 'nothing-due');
  let A = L.emptyActions(s, D, day, Q, { I });
  assert.equal(A.coral.href, '#/flash/all?mode=quick'); assert.equal(A.coral.title, 'Cards you know least');
  assert.deepEqual(A.neutral, { label: 'Learn 10 new from your lessons', href: '#/flash/all?mode=new' }, 'new cards: a neutral link only');
  day = daysLeft(1); A = L.emptyActions(s, D, day, L.queueFor(s, D, day, { deck: 'all', I }), { I });
  assert.equal(A.coral.href, '#/flash/all?mode=quick'); assert.equal(A.coral.title, 'Your shakiest due cards'); assert.equal(A.neutral, null, 'nothing new on the eve');
  day = daysLeft(0); A = L.emptyActions(s, D, day, L.queueFor(s, D, day, { deck: 'all', I }), { I });
  assert.equal(A.coral.href, '#/flash/all?mode=warm'); assert.equal(A.neutral, null);
  // nothing studied on the eve: no card round to offer, so the view takes the shared next step
  const e = examState(); assert.equal(L.emptyActions(e, D, daysLeft(1), L.queueFor(e, D, daysLeft(1), { deck: 'all', I }), { I }).coral, null);
  // a quick round never offers itself again
  assert.equal(L.emptyActions(e, D, daysLeft(10), L.queueFor(e, D, daysLeft(10), { deck: 'all', mode: 'quick', I }), { I }).coral, null);
  // the normal season: a finished deck hands over to new cards (D18)
  const n = fresh(), les = firstLessonWithCards('cma');
  cardsOfLesson(les).forEach(id => (n.cards[id] = seen(U.addDays(T0, 4), 4, T0)));
  const dq = L.queueFor(n, D, T0, { deck: les, I, season: 'normal' });
  assert.equal(dq.empty, 'deck-done');
  assert.equal(L.emptyActions(n, D, T0, dq, { I, season: 'normal' }).coral.href, '#/flash/all?mode=new');
  // the hub prints the new-card line only where new cards are offered: never on the eve or exam day (the verifier's '1 of 20 new cards today')
  s.cards[D.cards[40].id] = SRS.review(SRS.fresh(daysLeft(1)), 2, daysLeft(1));                                  // one new card today
  assert.equal(L.hubModel(s, D, daysLeft(1), { I }).newLine, null);
  assert.equal(L.hubModel(s, D, daysLeft(0), { I }).newLine, null);
  const fin = L.hubModel(s, D, daysLeft(10), { I });
  assert.equal(fin.coral.kind, 'quick'); assert.equal(fin.secondary.kind, 'new'); assert.equal(fin.newLine, 'upto');
  assert.equal(L.hubModel(fresh(), D, T0, { I, season: 'normal' }).newLine, 'upto');
});
/** 150 due cards 9 days before the exam with 60 minutes a day (a limit of 60): 50 mature, 100 young */
function limitState() {
  const s = examState(), day = daysLeft(9);
  s.profile.goals.minutes = 60;
  const ids = D.cards.slice(0, 150).map(c => c.id);
  ids.forEach((id, i) => (s.cards[id] = seen(U.addDays(day, -(i % 5)), i < 50 ? 30 + i : 2 + (i % 9), U.addDays(day, -(3 + (i % 11))))));
  return { s, day, ids };
}
test('P2-37 (D8): in the final fortnight "Review N due" takes at most the day\'s limit (half the daily minutes), weakest first and mature cards last; the rest stay due', () => {
  const { s, day } = limitState();
  const q = L.queueFor(s, D, day, { deck: 'all', I });
  assert.equal(q.season, 'final'); assert.equal(q.limit.limit, 60);
  assert.equal(q.ids.length, 60); assert.equal(q.dueAll, 150); assert.equal(q.over, 90);
  assert.ok(q.ids.every(id => !SRS.isMature(s.cards[id])), 'the 100 young cards come first: mature cards may skip a review');
  const str = id => SRS.strength(s.cards[id], day);
  for (let i = 1; i < q.ids.length; i++) assert.ok(str(q.ids[i - 1]) <= str(q.ids[i]) + 1e-12, 'the ones you know least first');
  assert.equal(q.sub, '60 of 150 due today, the ones you know least first · about 30 min');
  let M = L.hubModel(s, D, day, { I });
  assert.equal(M.all.due, 150); assert.equal(M.today, 60); assert.equal(M.over, 90);
  assert.equal(M.coral.label, 'Review 60 due'); assert.equal(M.coral.sub, '60 of 150 today · about 30 min');
  assert.deepEqual(M.head, [[150, 'due'], [60, 'today'], [150, `of ${U.nf(D.cards.length)} learned`]], "the hub says '150 due · 60 today'");
  // the 60 reviewed: the limit is reached, the other 90 stay due, the coral hands over, '20 more' stays one tap away
  q.ids.forEach(id => (s.cards[id] = SRS.review(s.cards[id], 2, day, { cap: SRS.capFor(9) })));
  assert.equal(SRS.reviewsOn(s.cards, day), 60);
  const q2 = L.queueFor(s, D, day, { deck: 'all', I });
  assert.equal(q2.ids.length, 0); assert.equal(q2.empty, 'limit'); assert.equal(q2.dueAll, 90);
  assert.equal(ST.due(s, D, day).cards, 90, 'over-limit cards stay due');
  M = L.hubModel(s, D, day, { I });
  assert.equal(M.coral, null, 'the plan\'s next task or the shared step takes the coral (D18)');
  assert.deepEqual([M.secondary.label, M.secondary.href], ['Review 20 more', '#/flash/all?mode=more']);
  assert.equal(M.done.title, "That's today's reviews."); assert.equal(M.done.change, '#/plan?set=exam');
  assert.ok(/90 more are due and wait for tomorrow/.test(M.done.text) && /up to 60 cards a day, half of your 60 minutes/.test(M.done.text), M.done.text);
  assert.deepEqual(L.emptyActions(s, D, day, q2, { I }), { coral: null, neutral: { label: 'Review 20 more', href: '#/flash/all?mode=more' } });
  const m = L.queueFor(s, D, day, { deck: 'all', mode: 'more', I });
  assert.equal(m.kind, 'more'); assert.equal(m.ids.length, 20); assert.ok(m.ids.every(id => s.cards[id].due <= day));
  // the limit belongs to the final fortnight only: a normal day serves every due card, most urgent first
  assert.equal(L.queueFor(s, D, day, { deck: 'all', I, season: 'normal' }).ids.length, 90);
  assert.equal(L.queueFor(limitState().s, D, day, { deck: 'all', I, season: 'normal' }).ids.length, 150);
  // a subject deck is the learner's own choice: it is not limited
  const sub = D.cards[0].subject, n = L.counts(s, D.cards.filter(c => c.subject === sub), day).due;
  assert.equal(L.queueFor(s, D, day, { deck: sub, I }).due, n);
});
test('P2-37: season replay through the hub (20 new cards a day, 90 minutes): no final-fortnight day passes the limit; the eve is a Quick 20, exam day a warm-up', () => {
  const s = examState(), start = daysLeft(110), limit = SRS.reviewLimit(90);
  s.profile.goals.minutes = 90; s.profile.goals.cards = 20;
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const run = (q, day, cap) => { for (const id of q.ids) { const g = rnd() < 0.1 ? 0 : rnd() < 0.06 ? 1 : 2; s.cards[id] = SRS.review(s.cards[id] || SRS.fresh(day), g, day, { cap }); if (g === 0) s.cards[id] = SRS.review(s.cards[id], 2, day, { cap }); } return q.ids.length; };
  const rows = [];
  for (let i = 0; i <= 110; i++) {
    const day = U.addDays(start, i), dl = U.daysBetween(day, EXAM), cap = SRS.capFor(dl);
    const M = L.hubModel(s, D, day, { I });
    let n = 0, dueAll = M.all.due;
    if (M.coral) { const p = L.parseSession(M.coral.href); n += run(L.queueFor(s, D, day, { deck: p.deck, mode: p.mode, I }), day, cap); }
    if (M.season === 'normal') for (let k = 0; k < 2; k++) run(L.queueFor(s, D, day, { deck: 'all', mode: 'new', I }), day, cap);   // 'Learn 10 new' twice
    rows.push({ dl, season: M.season, coral: M.coral && M.coral.kind, n, dueAll, mature: Object.values(s.cards).filter(SRS.isMature).length });
  }
  const final = rows.filter(r => r.season === 'final');
  assert.equal(final.length, 13, 'final fortnight: 14 to 2 days left');
  for (const r of final) assert.ok(r.n <= limit, `${r.dl} days left: ${r.n} reviews, over the limit of ${limit}`);
  assert.ok(final.some(r => r.dueAll > limit), 'the limit really binds on some day: ' + final.map(r => r.dueAll));
  const eve = rows.find(r => r.dl === 1), day0 = rows.find(r => r.dl === 0);
  assert.deepEqual([eve.season, eve.coral, eve.n], ['eve', 'quick', 20]);
  assert.deepEqual([day0.season, day0.coral], ['day', 'warm']); assert.ok(day0.n <= 10);
  for (let i = 1; i < final.length; i++) assert.ok(final[i].mature >= final[i - 1].mature, 'maturity never drops in the final fortnight');
});
test('P2-68: the finish card\'s second action is another round of the same session while it has cards; never after Quick 20 or the warm-up', () => {
  const s = fresh(), ids = D.cards.slice(0, 12).map(c => c.id), dueQ = { kind: 'due', deck: 'all', mode: '' };
  ids.forEach(id => (s.cards[id] = seen(U.addDays(T0, 2), 3, T0))); s.profile.goals.cards = 0;
  for (const kind of ['quick', 'warm']) assert.equal(L.againOf(s, D, T0, { kind, deck: 'all', mode: kind }, { I, season: 'normal' }), null, kind + ' is one round');
  assert.equal(L.againOf(s, D, T0, dueQ, { I, season: 'normal' }), null, 'nothing left: no second round');
  s.cards[ids[0]] = SRS.review(s.cards[ids[0]], 0, T0);                                                          // still due: an Again
  assert.deepEqual(L.againOf(s, D, T0, dueQ, { I, season: 'normal' }), { label: 'Review 1 due', href: '#/flash/all' }, 'named by what it opens');
  assert.equal(L.againOf(s, D, T0, dueQ, { I, season: 'eve' }), null, 'light revision on the eve');
  const n = fresh(); n.profile.goals.cards = 20;
  assert.deepEqual(L.againOf(n, D, T0, { kind: 'new', deck: 'all', mode: 'new' }, { I, season: 'normal' }), { label: 'Learn 10 new from your lessons', href: '#/flash/all?mode=new' });
  // a due round with nothing left: the new cards, asked for by name ('#/flash/all' itself is due-only)
  assert.deepEqual(L.againOf(n, D, T0, dueQ, { I, season: 'normal' }), { label: 'Learn 10 new from your lessons', href: '#/flash/all?mode=new' });
  const les = firstLessonWithCards('cma');
  assert.deepEqual(L.againOf(n, D, T0, { kind: 'deck', deck: les, mode: '' }, { I, season: 'normal' }), { label: 'Another round', href: '#/flash/' + encodeURIComponent(les) }, 'a deck: another round of it');
  n.profile.goals.cards = 0;
  assert.equal(L.againOf(n, D, T0, { kind: 'new', deck: 'all', mode: 'new' }, { I, season: 'normal' }), null, 'gone once the new-card cap is reached');
  const { s: f, day } = limitState();
  L.queueFor(f, D, day, { deck: 'all', I }).ids.forEach(id => (f.cards[id] = SRS.review(f.cards[id], 2, day, { cap: SRS.capFor(9) })));
  assert.deepEqual(L.againOf(f, D, day, dueQ, { I }), { label: 'Review 20 more', href: '#/flash/all?mode=more' }, 'the limit reached: 20 more, named');
});
test('P2-68 with P1-61 (resume): a Quick 20 or the warm-up is one round a day; once it is done the hub, an empty screen and the finish card hand back to the plan', () => {
  const s = examState();
  D.cards.slice(0, 40).forEach((c, i) => (s.cards[c.id] = seen(i < 30 ? U.addDays(EXAM, -1 - (i % 3)) : U.addDays(EXAM, 4), 3 + (i % 25), U.addDays(EXAM, -9))));
  const runRound = (day, q) => q.ids.forEach(id => (s.cards[id] = SRS.review(s.cards[id], 2, day, { cap: SRS.capFor(U.daysBetween(day, EXAM)) })));
  assert.deepEqual([L.QUICK_N, L.WARM_N], [SRS.ROUND.quick, SRS.ROUND.warm], 'the round sizes are the core rule\'s (SRS.roundDone)');
  // the eve: 'Quick 20: your shakiest due cards', then the plan (the shared step still names the Quick 20: it is passed over)
  let day = daysLeft(1), M = L.hubModel(s, D, day, { I });
  assert.equal(M.coral.label, 'Quick 20: your shakiest due cards'); assert.equal(L.roundDone(s, day, 'eve'), false);
  const q = L.queueFor(s, D, day, { deck: 'all', mode: 'quick', I });
  assert.equal(q.ids.length, 20); runRound(day, q);
  assert.equal(SRS.reviewsOn(s.cards, day), 20); assert.equal(L.roundDone(s, day, 'eve'), true);
  M = L.hubModel(s, D, day, { I });
  assert.equal(M.coral, null, 'the round is not offered again'); assert.equal(M.secondary, null);
  assert.equal(M.done.title, "That's today's cards.", 'any 20 reviews today count, so the title does not claim a Quick 20'); assert.equal(M.done.text, 'The other 10 due cards can wait until after Paper 4.');
  const skip = (h, o) => L.skipLink(s, D, day, h, Object.assign({ I }, o));
  assert.equal(skip('#/flash/all?mode=quick'), true, 'done for today'); assert.equal(skip('#/flash/all'), false, 'the 10 due cards stay a real round');
  assert.equal(skip('#/pyq?practise=10'), false, 'other links are never skipped');
  const step = ST.nextStep(s, D, { kind: 'any', today: day, I });
  const nx = L.nextCoral({ tasks: [{ title: 'Quick 20: your shakiest due cards', href: '#/flash/all?mode=quick', done: false }] }, step, { skip: h => skip(h, { done: q }) })
    || L.fallbackStep(s, D, day, 'eve');
  assert.notEqual(nx.href, '#/flash/all?mode=quick', 'the finish coral never repeats the round: ' + JSON.stringify(nx));
  if (!step || L.parseSession(step.href)) assert.deepEqual([nx.href, nx.kicker, nx.title], ['#/plan', 'Light revision, then sleep', "Open today's plan"], 'the eve ends on today\'s plan');
  const eq = L.queueFor(s, D, day, { deck: 'all', mode: 'quick', I });
  assert.deepEqual(L.emptyActions(s, D, day, Object.assign({}, eq, { empty: 'none-seen', ids: [] }), { I }), { coral: null, neutral: null });
  // exam day: the warm-up (10 cards), then 'Warm-up done. Good luck today.'
  day = daysLeft(0); M = L.hubModel(s, D, day, { I });
  assert.equal(M.coral.label, 'Warm up: 10 cards you know');
  runRound(day, L.queueFor(s, D, day, { deck: 'all', mode: 'warm', I }));
  M = L.hubModel(s, D, day, { I });
  assert.equal(M.coral, null); assert.deepEqual([M.done.title, M.done.text], ['Warm-up done.', 'Good luck today.']);
  assert.equal(L.skipLink(s, D, day, '#/flash/all?mode=warm', { I }), true);
  assert.deepEqual([L.fallbackStep(s, D, day, 'day').href, L.fallbackStep(s, D, day, 'day').kicker], ['#/plan', 'Exam day']);
  // the final fortnight with nothing due: Quick 20 until today's round is done, then the plan; new cards stay a neutral link, or 'Another Quick 20'
  const f = examState(); f.profile.goals.cards = 0;
  D.cards.slice(0, 40).forEach(c => (f.cards[c.id] = seen(U.addDays(EXAM, 3), 20, U.addDays(EXAM, -15))));
  day = daysLeft(9); M = L.hubModel(f, D, day, { I });
  assert.equal(M.coral.label, 'Quick 20: cards you know least');
  L.queueFor(f, D, day, { deck: 'all', mode: 'quick', I }).ids.forEach(id => (f.cards[id] = SRS.review(f.cards[id], 2, day, { cap: SRS.capFor(9) })));
  M = L.hubModel(f, D, day, { I });
  assert.equal(M.coral, null); assert.deepEqual([M.secondary.label, M.secondary.href], ['Another Quick 20', '#/flash/all?mode=quick']);
  assert.ok(/^20 cards reviewed today\./.test(M.done.text), M.done.text);
  const fq = L.queueFor(f, D, day, { deck: 'all', I });
  assert.deepEqual(L.emptyActions(f, D, day, fq, { I }), { coral: null, neutral: { label: 'Another Quick 20', href: '#/flash/all?mode=quick' } });
  f.profile.goals.cards = 20;
  assert.equal(L.emptyActions(f, D, day, L.queueFor(f, D, day, { deck: 'all', I }), { I }).neutral.label, 'Learn 10 new from your lessons', 'new cards stay the neutral link');
  // a round smaller than 20 (12 cards studied) is not 'done' by count, but the finish card still never repeats it
  const g = examState(); D.cards.slice(0, 12).forEach(c => (g.cards[c.id] = seen(U.addDays(EXAM, 3), 20, U.addDays(EXAM, -15))));
  const gq = L.queueFor(g, D, daysLeft(9), { deck: 'all', mode: 'quick', I });
  gq.ids.forEach(id => (g.cards[id] = SRS.review(g.cards[id], 2, daysLeft(9), { cap: SRS.capFor(9) })));
  assert.equal(L.roundDone(g, daysLeft(9), 'final'), false);
  assert.equal(L.skipLink(g, D, daysLeft(9), '#/flash/all?mode=quick', { I }), false);
  assert.equal(L.skipLink(g, D, daysLeft(9), '#/flash/all?mode=quick', { I, done: gq }), true, 'the round just finished');
  // the normal season never limits rounds; '#/flash/all' with nothing due opens an empty round, so it is passed over as a 'Review' link
  const n = fresh();
  assert.equal(L.roundDone(n, T0, 'normal'), false);
  assert.equal(L.skipLink(n, D, T0, '#/flash/all', { I, season: 'normal' }), true);
  assert.equal(L.skipLink(n, D, T0, '#/flash/all?mode=new', { I, season: 'normal' }), false);
});
test('P2-74: the hub\'s due number is GA.stats.due, the one definition (seen and due today: a lapsed "Again" card counts)', () => {
  const rnd = U.rng(74);
  for (let k = 0; k < 12; k++) {
    const s = fresh();
    D.cards.slice(k * 40, k * 40 + 160).forEach(c => {
      const r = rnd();
      if (r < 0.2) return;
      if (r < 0.35) s.cards[c.id] = SRS.review(seen(T0, 9, U.addDays(T0, -9)), 0, T0);                       // Again today: due
      else if (r < 0.45) s.cards[c.id] = { due: T0, ivl: 0, ease: 2.5, reps: 0, lapses: 0, last: null };       // never reviewed: not due
      else s.cards[c.id] = seen(U.addDays(T0, Math.floor(rnd() * 9) - 4), 3, U.addDays(T0, -3));
    });
    s.cards['cma.nope#00000000'] = seen(T0, 3, U.addDays(T0, -3));                                               // not a catalogue card
    const M = L.hubModel(s, D, T0, { I, season: 'normal' }), want = ST.due(s, D, T0);
    assert.equal(M.all.due, want.cards); assert.equal(L.counts(s, D.cards, T0).due, want.cards);
    if (want.cards) assert.deepEqual(L.queueFor(s, D, T0, { deck: 'all', I, season: 'normal' }).ids.slice().sort(), want.cardIds.slice().sort());
  }
});
test('P2-12: every session has its own title ("Cost and Management Accounting flashcards")', () => {
  const all = L.deckOf(D, 'all'), les = D.lessons.find(l => D.cards.some(c => c.lesson === l.id));
  assert.equal(L.sessionTitle(L.deckOf(D, 'cma'), ''), 'Cost and Management Accounting flashcards');
  assert.equal(L.sessionTitle(L.deckOf(D, les.id), ''), les.title + ' flashcards');
  assert.deepEqual(['', 'new', 'quick', 'warm', 'more'].map(m => L.sessionTitle(all, m)), ['Flashcards due today', 'New flashcards from your lessons', 'Quick 20 flashcards', 'Warm-up flashcards', 'More due flashcards']);
  assert.equal(L.sessionTitle(null), 'Not found');
  // a session is titled by what it serves, as its h1 is: the new cards of '?mode=new' are 'New from your lessons'
  const Q = L.queueFor(fresh(), D, T0, { deck: 'all', mode: 'new', I, season: 'normal' });
  assert.ok(Q.kind === 'new' && Q.ids.length, 'fresh profile: ?mode=new serves new cards');
  assert.equal(Q.title, 'New from your lessons');
  assert.equal(L.sessionTitle(all, '', Q), 'New flashcards from your lessons');
  assert.equal(L.sessionTitle(all, '', L.queueFor(fresh(), D, T0, { deck: 'all', I, season: 'normal' })), 'Flashcards due today', '#/flash/all with nothing due');
  const s = fresh(); s.cards[D.cards[0].id] = seen(T0, 1, U.addDays(T0, -1));
  assert.equal(L.sessionTitle(all, '', L.queueFor(s, D, T0, { deck: 'all', I, season: 'normal' })), 'Flashcards due today', 'a due round keeps its title');
  assert.equal(L.sessionTitle(L.deckOf(D, 'cma'), '', Q), 'Cost and Management Accounting flashcards', 'a deck keeps its own name');
});
test('P2-70: a weekday line once a day when Good plus Easy are at least half the cards; "9 cards come back on Thursday"', () => {
  const s = fresh(), a = D.cards[0].id, b = D.cards[1].id;
  s.cards[a] = seen(U.addDays(T0, 1), 1, T0); s.cards[b] = seen(U.addDays(T0, 1), 1, T0);
  const good = [{ id: a, g: 2 }, { id: b, g: 0 }, { id: b, g: 2 }];
  assert.equal(L.finishModel(good, s, T0, null, { quip: true }).quip, 'Friday, sorted.', '16 Oct 2026 is a Friday');
  assert.equal(L.finishModel(good, s, T0, null, { quip: false }).quip, null, 'once a day');
  // free once a day, and never on the eve or exam day (they stay calm: the verifier-era 'Saturday well spent.' before the exam)
  assert.deepEqual(['normal', 'final', 'eve', 'day', 'done'].map(se => L.quipOn(s, T0, se)), [true, true, false, false, true]);
  assert.equal(L.quipOn(Object.assign({}, s, { seen: { flashQuip: T0 } }), T0, 'normal'), false, 'already shown today');
  assert.equal(L.finishModel([{ id: a, g: 0 }, { id: a, g: 2 }, { id: b, g: 1 }], s, T0, null, { quip: true }).quip, null, 'not when most cards went badly');
  assert.equal(L.QUIPS.length, 7);
  for (const q of L.QUIPS) assert.ok(!/[!?]/.test(q) && q.split(' ').length <= 6, q);
  assert.deepEqual([0, 1, 6, 7].map(d => L.backOn(U.addDays(T0, d), T0)), ['today', 'tomorrow', 'on Thursday', 'on 23 Oct']);
  assert.equal(L.comesBack({ day: U.addDays(T0, 6), n: 9 }, T0), '9 cards come back on Thursday.');
  assert.equal(L.comesBack({ day: U.addDays(T0, 1), n: 1 }, T0), '1 card comes back tomorrow.');
  assert.equal(L.comesBack(null, T0), '');
  // the hub's nothing-due state says when cards come back
  s.profile.goals.cards = 0;
  const M = L.hubModel(s, D, T0, { I, season: 'normal' });
  assert.equal(M.coral, null); assert.equal(M.done.title, "That's today's new cards."); assert.ok(/2 cards come back tomorrow\./.test(M.done.text), M.done.text);
});
test('P2-41 (reader side): the notebook reads the retry day GA.stats.due counts with: a miss answered today comes back tomorrow, never the same day', () => {
  const now = U.parseDay(T0).getTime() + 10 * 3600e3;                                                           // 10:00 today
  const s = nbState([{ i: 0, due: T0, last: now }, { i: 1, due: T0 }, { i: 2, due: U.addDays(T0, 3) }, { i: 3, due: U.addDays(T0, -2), resolved: 5 }]);
  const E = NB.entries(s, D), by = i => E.find(e => e.id === idOf(i));
  assert.equal(by(0).r, U.addDays(T0, 1), 'missed today: tomorrow (GA.stats.retryDay)');
  assert.equal(by(0).r, ST.retryDay(s, idOf(0)));
  assert.ok(!NB.isDue(by(0), T0) && NB.isDue(by(1), T0) && !NB.isDue(by(2), T0) && !NB.isDue(by(3), T0));
  assert.deepEqual(NB.whenOf(by(0), T0, now), { text: 'retry tomorrow', now: false });
  assert.deepEqual(NB.dueList(s, D, T0), [idOf(1)]);
  assert.deepEqual(NB.dueList(s, D, T0), ST.due(s, D, T0).questions, 'the notebook, the planner and My progress count the same misses');
  // in any notebook the header's 'due for a retry today' is GA.stats.due's count
  const rnd = U.rng(41);
  for (let k = 0; k < 20; k++) {
    const rows = [];
    for (let i = 0; i < 25; i++) rows.push({ i, due: U.addDays(T0, Math.floor(rnd() * 7) - 3), last: rnd() < 0.3 ? now : 1000 + i, resolved: rnd() < 0.15 ? 9 : null });
    const st = nbState(rows);
    assert.equal(NB.tally(NB.entries(st, D), T0).due, ST.due(st, D, T0).questions.length, 'notebook ' + k);
    assert.deepEqual(NB.retryIds(st, D, T0), ST.due(st, D, T0).questions.slice(0, NB.RETRY_N));
  }
  // without GA.stats.retryDay (an older stats.js) the review day is used
  const rd = ST.retryDay;
  try { delete GA.stats.retryDay; assert.equal(NB.entries(s, D).find(e => e.id === idOf(0)).r, T0); } finally { GA.stats.retryDay = rd; }
});
test('P2-70: a cleared notebook says so, with its real count', () => {
  assert.deepEqual(NB.clearedText({ resolved: 14 }), { title: 'Notebook cleared', text: 'All 14 mistakes in it are resolved. New misses land here by themselves.' });
  assert.equal(NB.clearedText({ resolved: 1 }).text, 'Its one mistake is resolved. New misses land here by themselves.');
});
test('D18: when the plan and the shared step only point at empty card rounds, the coral falls back to a real step: questions from the final fortnight on, else a lesson', () => {
  const s = fresh();
  assert.deepEqual(['final', 'eve', 'day'].map(se => L.fallbackStep(s, D, T0, se).href), ['#/pyq?practise=10', '#/plan', '#/plan'], 'the eve and exam day: today\'s plan, never 40 minutes of practice');
  assert.equal(L.fallbackStep(s, D, T0, 'eve').title, "Open today's plan");
  assert.equal(L.fallbackStep(s, D, T0, 'final').title, 'Practise 10 questions');
  assert.equal(L.fallbackStep(s, D, T0, 'normal').href, '#/syllabus', 'outside the final stretch a lesson is a real next step');
  // with a topic you keep missing, the planner's final practice row: that topic's questions (never a new topic)
  const qs = D.questions.filter(q => q.hasKey && !q.mta && q.topic && q.subject === 'cma');
  const per = {}; qs.forEach(q => (per[q.topic] = (per[q.topic] || 0) + 1));
  const topic = Object.keys(per).sort((a, b) => per[b] - per[a])[0];             // the fixture's most-asked Paper 4 chapter
  qs.filter(q => q.topic === topic).slice(0, 6).forEach((q, i) => (s.q[q.id] = { n: 1, ok: 0, last: 1000 + i, lastOk: 0, firstOk: 0, ms: 60000, streak: 0, bm: 0 }));
  const w = (ST.weakTopics(s, D, T0, { limit: 1 }) || [])[0];
  assert.ok(w, 'a weak topic');
  const f = L.fallbackStep(s, D, T0, 'final');
  assert.equal(f.href, '#/pyq?topic=' + encodeURIComponent(w.id) + '&practise=10'); assert.equal(f.title, `Practise ${w.name}: 10 questions`);
});

/* ---------------------------------------------------------------- audit part C (WP11): one count of today's cards for every 'Review N due' */
/** the verifier's state: the final fortnight (9 days out), 150 due, 60 minutes a day and 26 reviews already made today: '150 due · 34 today' */
function shareState() {
  const { s, day } = limitState();
  D.cards.slice(150, 176).forEach(c => (s.cards[c.id] = seen(U.addDays(day, 3), 3, day, { first: U.addDays(day, -20) })));
  return { s, day };
}
test('P2-37 with P0-19 (part C): the hub, its session and its finish read SRS.dayShare; the plan\'s card row, the shared step and the palette must count the same', () => {
  const { s, day } = shareState();
  const due = ST.due(s, D, day).cards, season = L.seasonOf(s, D, day), sh = SRS.dayShare(s, due, day, season);
  assert.deepEqual([season, due, sh.limit, sh.used, sh.today, sh.over], ['final', 150, 60, 26, 34, 116]);
  const M = L.hubModel(s, D, day, { I });
  assert.deepEqual([M.today, M.over, M.coral.label, M.coral.sub], [34, 116, 'Review 34 due', '34 of 150 today · about 17 min']);
  assert.deepEqual(M.head, [[150, 'due'], [34, 'today'], [176, `of ${U.nf(D.cards.length)} learned`]]);
  const q = L.queueFor(s, D, day, { deck: 'all', I });
  assert.equal(q.ids.length, sh.today, 'the session serves the share'); assert.equal(q.over, sh.over);
  // the consumers in other packages: strict once they count SRS.dayShare's `today`; while they still count every due card the gap is
  // reported as pending (a note in the output, not a failure); any third number fails
  const P = require('../app/js/core/planner.js'), SE = require('../app/js/core/search.js'), pending = [];
  const countIn = t => +String(t || '').replace(/,/g, '').replace(/^\D*(\d+).*$/, '$1');
  const day0 = P.day(s, D, day, { I }), row = day0.tasks.find(t => t.id === 'cards');
  assert.ok(row && row.href === '#/flash/all', 'the plan has the card row');
  const step = ST.nextStep(s, D, { kind: 'any', today: day, I });
  assert.equal(step.href, '#/flash/all', 'nothing else is due: the shared step is the review');
  // the palette's own due row shows when the shared step points elsewhere: a lesson due for a re-read takes the step
  const sp = clone(s), les = firstLessonWithCards('cma'), t10 = U.parseDay(U.addDays(day, -10)).getTime();
  sp.lessons[les] = { done: t10, last: t10, visits: 1, secs: 900 };
  const pal = SE.emptyRows(sp, D, [], day).find(r => r.group === 'due' && r.href === '#/flash/all');
  assert.ok(pal, 'the palette lists the due cards');
  const owner = { 'WP6 planner.js cardsRow + judge': [], 'WP4 stats.js finalRules (d)': [], 'WP1 search.js emptyRows': [] };
  for (const [who, n, k] of [['card row target', row.target, 'WP6 planner.js cardsRow + judge'], ['card row title', countIn(row.title), 'WP6 planner.js cardsRow + judge'],
    ['step title', countIn(step.title), 'WP4 stats.js finalRules (d)'], ['due row', countIn(pal.t), 'WP1 search.js emptyRows']]) {
    if (n === sh.today) continue;
    assert.equal(n, due, `${who} counts ${n}: neither today's share (${sh.today}) nor every due card (${due})`);
    owner[k].push(`${who} ${n}`);
  }
  // the session reviews the share: the day's card reviews are done, so the plan's row can be ticked (P0-19) and nothing leads back to the review
  s.plan = P.stored(day0);
  q.ids.forEach(id => (s.cards[id] = SRS.review(s.cards[id], 2, day, { cap: SRS.capFor(9) })));
  s.act[day] = { s: 0, q: 0, c: 60, l: 0 };
  assert.equal(SRS.dayShare(s, ST.due(s, D, day).cards, day, season).today, 0);
  assert.equal(L.queueFor(s, D, day, { deck: 'all', I }).empty, 'limit');
  const day1 = P.day(s, D, day, { I }), row1 = day1.tasks.find(t => t.id === 'cards');
  if (row.target === sh.today) assert.ok(row1.done, 'the plan\'s card row is done once the share is reviewed');
  else if (!row1.done) owner['WP6 planner.js cardsRow + judge'].push(`row open at ${row1.progress} after the session`);
  const step1 = ST.nextStep(s, D, { kind: 'any', today: day, I });
  if (step1.href === '#/flash/all') owner['WP4 stats.js finalRules (d)'].push(`still '${step1.label} · ${step1.title}' at the limit`);
  for (const k in owner) if (owner[k].length) pending.push(`${k}: ${owner[k].join(', ')}`);
  const skip = h => { const p = L.parseSession(h); return !!p && !L.queueFor(s, D, day, { deck: p.deck, mode: p.mode, I }).ids.length; };
  const nx = L.nextCoral(day1, step1, { skip });
  assert.ok(!nx || nx.href !== '#/flash/all', 'the flash finish coral never leads back to the finished review');
  if (pending.length) console.log(`  pending P2-37 (count SRS.dayShare(...).today; the session serves ${sh.today} of ${due}): ` + pending.join('; '));
});
test('P2-37 /about (part C): the About page and the Settings hint say what review() does; a note until WP6 settings.js reads SRS.capText', () => {
  // WP11's side, strict: the sentences SRS.capText gives the About page for the verifier's two cases
  assert.ok(!/every card/.test(SRS.capText({ daysLeft: 9, label: 'Paper 4' }, 60).now), 'the final fortnight never promises every card');
  assert.ok(/longest gap is 365 days/.test(SRS.capText({ daysLeft: 969, label: 'your exam' }).now), 'a far exam names the 365-day ceiling');
  // the consumer (WP6): reported as pending (a note in the output, not a failure) while settings.js keeps its own copy of the sentence
  const src = require('fs').readFileSync(path.join(__dirname, '..', 'app/js/views/settings.js'), 'utf8'), notes = [];
  if (!/\bcapText\s*\(/.test(src)) notes.push("About srsSentence keeps its own 'Right now the longest gap is <cap> days, so every card … before' (484 days for a 2029-06-12 date; every card in the final fortnight)");
  if (/due reviews are not capped/.test(src)) notes.push("'New flashcards a day' hint 'due reviews are not capped' (the final fortnight's daily review limit caps them)");
  if (notes.length) console.log('  pending P2-37 (WP6 settings.js, read SRS.capText(E, SRS.minutesOf(state))): ' + notes.join('; '));
});
