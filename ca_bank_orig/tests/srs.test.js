globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const S = require('../app/js/core/srs.js');
const U = GA.util;
const T = '2026-10-10';

test('first successful reviews grow 1d -> 3d -> ease-multiplied', () => {
  let c = S.fresh(T);
  c = S.review(c, 2, T);
  assert.equal(c.ivl, 1); assert.equal(c.due, '2026-10-11'); assert.equal(c.reps, 1);
  c = S.review(c, 2, '2026-10-11');
  assert.equal(c.ivl, 3); assert.equal(c.due, '2026-10-14');
  c = S.review(c, 2, '2026-10-14');
  assert.equal(c.ivl, Math.round(3 * 2.5)); // 8 (7.5 rounds up)
  const c2 = S.review(c, 2, c.due);
  assert.ok(c2.ivl > c.ivl);
});
test('Again resets to relearning today, adds a lapse and lowers ease', () => {
  let c = { due: T, ivl: 20, ease: 2.5, reps: 5, lapses: 0, last: '2026-09-20' };
  const n = S.review(c, 0, T);
  assert.equal(n.due, T); assert.equal(n.ivl, 0); assert.equal(n.reps, 0); assert.equal(n.lapses, 1);
  assert.equal(n.ease, 2.3);
  assert.deepEqual(c, { due: T, ivl: 20, ease: 2.5, reps: 5, lapses: 0, last: '2026-09-20' }, 'input must not be mutated');
});
test('ease is clamped to [1.3, 3.0]', () => {
  let c = { due: T, ivl: 10, ease: 1.35, reps: 4, lapses: 0, last: '2026-09-30' };
  assert.equal(S.review(c, 0, T).ease, 1.3);
  assert.equal(S.review(c, 1, T).ease, 1.3);
  c = { due: T, ivl: 10, ease: 2.95, reps: 4, lapses: 0, last: '2026-09-30' };
  assert.equal(S.review(c, 3, T).ease, 3.0);
});
test('Hard < Good < Easy for mature cards; every on-time success strictly increases the interval', () => {
  const c = { due: T, ivl: 10, ease: 2.5, reps: 4, lapses: 0, last: '2026-09-30' };
  const [a, h, gd, e] = S.preview(c, T);
  assert.equal(a, 0);
  assert.ok(h > 10 && h < gd && gd < e, `${h} ${gd} ${e}`);
});
test('due / new / seen / mature predicates', () => {
  assert.ok(S.isDue(null, T));
  assert.ok(S.isDue({ due: T }, T));
  assert.ok(!S.isDue({ due: '2026-10-11' }, T));
  assert.ok(S.isNew(S.fresh(T)));
  assert.ok(S.isMature({ ivl: 21 })); assert.ok(!S.isMature({ ivl: 20 }));
  assert.ok(!S.isSeen(null) && !S.isSeen(S.fresh(T)) && S.isSeen({ last: T }));
  const lapsed = S.review({ due: T, ivl: 9, ease: 2.5, reps: 3, lapses: 0, last: '2026-10-01' }, 0, T);
  assert.ok(S.isDueSeen(lapsed, T), "a card marked 'Again' is due (P2-74)");
  assert.ok(!S.isDueSeen(S.fresh(T), T), 'a new card is not due');
});
test('strength decays with time since last review and grows with maturity', () => {
  const c = { due: '2026-10-20', ivl: 10, ease: 2.5, reps: 4, lapses: 0, last: '2026-10-10' };
  const s0 = S.strength(c, '2026-10-10'), s10 = S.strength(c, '2026-10-20'), s40 = S.strength(c, '2026-11-19');
  assert.ok(s0 > s10 && s10 > s40);
  assert.ok(S.strength({ ...c, ivl: 60 }, '2026-10-10') > s0);
  assert.equal(S.strength(S.fresh(T), T), 0);
});
test('grade from a practice attempt', () => {
  assert.equal(S.gradeFromAttempt(false, 10000, 1), 0);
  assert.equal(S.gradeFromAttempt(true, 100000, 1), 1);   // slow
  assert.equal(S.gradeFromAttempt(true, 40000, 1), 2);
  assert.equal(S.gradeFromAttempt(true, 20000, 1), 3);    // fast
  assert.equal(S.gradeFromAttempt(true, null, 2), 2);
});
test('first: the day a card was first reviewed is kept through later reviews (the daily new-card cap counts it)', () => {
  let c = S.review(S.fresh(T), 0, T);
  assert.equal(c.first, T, 'an Again on a new card still introduces it');
  c = S.review(c, 2, T); c = S.review(c, 2, '2026-10-11'); c = S.review(c, 0, '2026-10-14');
  assert.equal(c.first, T);
  assert.equal(S.firstDay(c), T);
  const old = S.review({ due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-10-07' }, 2, T);
  assert.ok(!('first' in old) && S.firstDay(old) === null, 'a state from before `first` existed stays unknown, not "today"');
});

/* ---------------------------------------------------------------- the exam cap (audit P0-26) */
test('P0-26 capFor: no cap without an exam ahead or with a day or less left; else max(1, floor(days / 2))', () => {
  for (const d of [null, undefined, NaN, Infinity, -400, -30, -1, 0, 1, '12']) assert.equal(S.capFor(d), null, String(d));
  assert.equal(S.capFor(2), 1); assert.equal(S.capFor(3), 1); assert.equal(S.capFor(4), 2); assert.equal(S.capFor(5), 2);
  assert.equal(S.capFor(14), 7); assert.equal(S.capFor(114), 57); assert.equal(S.capFor(1.5), 1, 'only one day or less means no cap');
  for (let d = 2; d <= 400; d++) assert.ok(S.capFor(d) >= 1 && S.capFor(d) <= d / 2, `cap ${S.capFor(d)} for ${d} days`);
});
test('P0-26: Good x6 after the exam follows natural spacing: 1, 3, 8, 20, 50, 125 (no 3-day cap after GATE)', () => {
  const exam = '2027-02-06';
  let day = '2027-02-07', c = S.fresh(day);
  const ivls = [];
  for (let i = 0; i < 6; i++) {
    const cap = S.capFor(U.daysBetween(day, exam));          // negative: the exam is behind us
    assert.equal(cap, null);
    c = S.review(c, 2, day, { cap });
    ivls.push(c.ivl);
    assert.equal(U.daysBetween(day, c.due), c.ivl, 'the due date is the earned interval');
    day = c.due;
  }
  assert.deepEqual(ivls, [1, 3, 8, 20, 50, 125]);
});
test('P0-26: the cap brings only the due date forward; the earned interval (and so maturity) is kept', () => {
  const c = { due: T, ivl: 60, ease: 2.5, reps: 6, lapses: 0, last: '2026-08-11' };
  const n = S.review(c, 3, T, { cap: 30 });
  assert.equal(n.ivl, Math.round(60 * 2.5 * 1.3), 'earned SM-2 interval');
  const gap = U.daysBetween(T, n.due);
  assert.ok(gap <= 30 && gap >= 30 - S.spreadMax(30), 'due = today + cap, spread at most 10 % earlier (P2-37): ' + gap);
  assert.ok(S.isMature(n));
  const m = S.review(c, 2, T, { maxIvl: 30 });                   // the transition name caps the due date only
  assert.equal(m.ivl, 150); assert.equal(m.due, S.review(c, 2, T, { cap: 30 }).due);
  for (let cap = 1; cap <= 10; cap++) assert.equal(S.review(c, 2, T, { cap }).due, U.addDays(T, cap), 'a cap of 10 days or less is exact: ' + cap);
  assert.equal(S.review(c, 0, T, { cap: 30 }).due, T, 'Again is due today, cap or not');
  assert.equal(S.review(S.fresh(T), 3, T, { cap: 1 }).due, '2026-10-11', 'a 4-day first interval under a 1-day cap is due tomorrow');
});
test('P0-26: an early review grows from the elapsed days but never below the earned interval', () => {
  // earned 50 days, reviewed 10 days later because of the cap
  const c = { due: '2026-10-10', ivl: 50, ease: 2.5, reps: 5, lapses: 0, last: '2026-09-30' };
  for (const g of [1, 2, 3]) assert.equal(S.review(c, g, T).ivl, 50, `grade ${g}: 10 elapsed days earn less than 50, so 50 is kept`);
  const late = { ...c, last: '2026-07-01' };                     // 101 days elapsed: not early, normal growth
  assert.equal(S.review(late, 2, T).ivl, 125);
  const half = { ...c, last: '2026-08-20' };                     // 51 elapsed? no: 51 >= 50, on time
  assert.equal(S.review(half, 2, T).ivl, 125);
  const e30 = { ...c, ivl: 60, last: '2026-09-10' };              // 30 elapsed of 60: Good grows from 30 -> 75 > 60
  assert.equal(S.review(e30, 2, T).ivl, 75);
  // same-day re-review (Quick 20 right after learning): no growth, no loss
  const today = S.review(S.fresh(T), 2, T);
  const again = S.review(today, 2, T);
  assert.equal(again.ivl, today.ivl); assert.equal(again.due, today.due);
});
test('P0-26: the four previews equal the stored gaps for every day from 30 days after to 60 days before the exam', () => {
  const exam = '2027-02-06';
  const cards = [
    S.fresh(T),
    { due: T, ivl: 0, ease: 2.3, reps: 0, lapses: 1, last: '2026-10-09' },
    { due: T, ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: '2026-10-09' },
    { due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-10-07' },
    { due: T, ivl: 25, ease: 2.6, reps: 5, lapses: 0, last: '2026-09-15' },
    { due: T, ivl: 125, ease: 2.5, reps: 7, lapses: 0, last: '2026-09-15' }
  ];
  for (let dl = -30; dl <= 60; dl++) {
    const today = U.addDays(exam, -dl), cap = S.capFor(dl);
    for (const c0 of cards) {
      const c = { ...c0, due: today };
      const pv = S.preview(c, today, { cap });
      for (let g = 0; g < 4; g++) {
        const st = S.review(c, g, today, { cap });
        assert.equal(pv[g], U.daysBetween(today, st.due), `${dl} days left, grade ${g}`);
        if (cap != null) assert.ok(pv[g] <= cap, 'never past the cap');
        if (dl > 1) assert.ok(st.due < exam, 'seen again before the exam');
      }
    }
  }
});
test('P0-26: in a season simulation mature cards never drop in the last 41 days before the exam', () => {
  const exam = '2027-02-06', start = U.addDays(exam, -150), cards = {};
  let day = start, made = 0;
  const mature = [];
  for (let i = 0; day <= U.addDays(exam, 130); i++, day = U.addDays(start, i)) {
    const cap = S.capFor(U.daysBetween(day, exam));
    if (day < U.addDays(exam, -14)) for (let k = 0; k < 8 && made < 600; k++) cards['c' + made++] = null;   // 8 new cards a day until the final fortnight
    for (const id of Object.keys(cards)) {
      const c = cards[id];
      if (c && c.due > day) continue;
      // a deterministic learner: mostly Good, an occasional Hard, one Again in nine on new cards
      const h = (id.length * 31 + made + i) % 9;
      const g = !c ? (h === 0 ? 0 : 2) : h === 1 ? 1 : 2;
      const prev = c;
      cards[id] = S.review(c || S.fresh(day), g, day, { cap });
      if (cards[id].due === day) cards[id] = S.review(cards[id], 2, day, { cap });   // relearn the Again in the same session
      // everything is seen again before the exam, except a mature card the cap had already pulled forward and that was answered Good or
      // Easy in the final fortnight: it may skip the rest (P2-37)
      const skips = cap != null && cap <= S.FINAL_CAP && g >= 2 && S.pulledForward(prev);
      if (U.daysBetween(day, exam) > 1 && !skips) assert.ok(cards[id].due < exam, 'everything is seen again before the exam');
    }
    mature.push({ day, n: Object.values(cards).filter(S.isMature).length });
  }
  const tail = mature.filter(m => m.day >= U.addDays(exam, -41) && m.day <= exam);
  assert.equal(tail.length, 42);
  for (let i = 1; i < tail.length; i++) assert.ok(tail[i].n >= tail[i - 1].n, `mature fell from ${tail[i - 1].n} to ${tail[i].n} on ${tail[i].day}`);
  assert.ok(tail[tail.length - 1].n > 100, 'a real share of the cards is mature by the exam: ' + tail[tail.length - 1].n);
  // after the exam the cap is gone: nothing comes back every 3 days
  const after = Object.values(cards).filter(c => c.last > exam && c.reps >= 3);
  assert.ok(after.length > 50, 'cards come back after the exam: ' + after.length);
  assert.ok(after.every(c => U.daysBetween(c.last, c.due) === c.ivl && c.ivl > 3), 'natural spacing after GATE, no 3-day loop');
});

/* ---------------------------------------------------------------- the final-fortnight load (audit P2-37, D8) */
test('P2-37: a capped due date spreads up to 10 % earlier, by a hash of the review (same review, same day); caps of 10 days or less are exact', () => {
  assert.equal(S.spreadMax(10), 0); assert.equal(S.spreadMax(11), 1); assert.equal(S.spreadMax(30), 2); assert.equal(S.spreadMax(57), 5);
  for (let cap = 1; cap <= 400; cap++) assert.ok(S.spreadMax(cap) <= 0.1 * cap, 'at most 10 % of the cap: ' + cap);
  const offsets = new Set();
  for (let i = 0; i < 60; i++) {
    const c = { due: T, ivl: 40 + i, ease: 2.5, reps: 5, lapses: i % 3, last: U.addDays(T, -(40 + i)) };
    const a = S.review(c, 2, T, { cap: 30 }), b = S.review({ ...c }, 2, T, { cap: 30 });
    assert.equal(a.due, b.due, 'the same review gives the same day');
    const gap = U.daysBetween(T, a.due);
    assert.ok(gap >= 28 && gap <= 30, 'within 10 % of the 30-day cap: ' + gap);
    assert.equal(a.ivl, S.review(c, 2, T).ivl, 'the earned interval never moves');
    offsets.add(30 - gap);
  }
  assert.ok(offsets.size >= 2, 'cards capped on one day do not all land on one day: ' + [...offsets]);
  // an uncapped interval never moves (spreading belongs to the cap), and neither does a cap that does not bind
  const young = { due: T, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: U.addDays(T, -3) };
  assert.equal(S.review(young, 2, T, { cap: 30 }).due, U.addDays(T, 8), 'an 8-day interval under a 30-day cap is not capped, so not spread');
  assert.equal(S.review({ ...young, ivl: 60, reps: 6, last: U.addDays(T, -60) }, 2, T).due, U.addDays(T, 150), 'no cap: natural spacing to the day');
});
test('P2-37: a mature card the cap already pulled forward may skip the rest of the final fortnight when answered Good or Easy', () => {
  // earned 50 days, but the cap brought it back after 10: pulled forward
  const pulled = { due: T, ivl: 50, ease: 2.5, reps: 6, lapses: 0, last: U.addDays(T, -10) };
  assert.ok(S.pulledForward(pulled));
  for (const g of [2, 3]) for (let cap = 1; cap <= S.FINAL_CAP; cap++) {
    const n = S.review(pulled, g, T, { cap });
    assert.equal(U.daysBetween(T, n.due), n.ivl, `grade ${g}, cap ${cap}: natural spacing (the exam lies inside its earned interval)`);
    assert.deepEqual(S.preview(pulled, T, { cap })[g], n.ivl, 'the button label says so');
  }
  assert.equal(S.review(pulled, 2, T, { cap: 8 }).due, U.addDays(T, 8), 'more than 15 days left: still capped');
  assert.equal(S.review(pulled, 1, T, { cap: 5 }).due, U.addDays(T, 5), 'Hard keeps the cap');
  assert.equal(S.review(pulled, 0, T, { cap: 5 }).due, T, 'Again relearns today');
  // the reviews the cap rule pins elsewhere are unchanged: an on-time mature card (its gap equals its interval) is not pulled forward
  const onTime = { due: T, ivl: 30, ease: 2.5, reps: 5, lapses: 0, last: U.addDays(T, -30) };
  assert.ok(!S.pulledForward(onTime));
  assert.equal(S.review(onTime, 2, T, { cap: 5 }).due, U.addDays(T, 5)); assert.equal(S.review(onTime, 2, T, { cap: 2 }).due, U.addDays(T, 2));
  // a young card is never let off: it still needs the cap's reviews
  const youngPulled = { due: T, ivl: 15, ease: 2.5, reps: 4, lapses: 0, last: U.addDays(T, -5) };
  assert.ok(!S.pulledForward(youngPulled));
  assert.equal(S.review(youngPulled, 3, T, { cap: 3 }).due, U.addDays(T, 3));
  assert.ok(!S.pulledForward(null) && !S.pulledForward(S.fresh(T)));
});
test('P2-37: the daily review limit comes from the daily minutes (half of them, 0.5 min a review, at least 20); reviewsOn counts reviews, not introductions', () => {
  assert.equal(S.reviewLimit(90), 90); assert.equal(S.reviewLimit(240), 240); assert.equal(S.reviewLimit(30), 30); assert.equal(S.reviewLimit(15), 20);
  for (const bad of [undefined, null, 0, -5, NaN, '90']) assert.equal(S.reviewLimit(bad), 90, 'unset: the default 90 minutes: ' + bad);
  const cards = {
    a: { due: '2026-10-12', ivl: 2, ease: 2.5, reps: 2, lapses: 0, last: T, first: '2026-10-01' },   // reviewed today
    b: { due: '2026-10-11', ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: T, first: T },              // introduced today: not a review
    c: { due: '2026-10-13', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: T },                        // an old state without `first`
    d: { due: '2026-10-12', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-10-09', first: '2026-10-01' }
  };
  assert.equal(S.reviewsOn(cards, T), 2); assert.equal(S.reviewsOn(cards, '2026-10-09'), 1); assert.equal(S.reviewsOn(null, T), 0);
});
test('P2-37: season replay of a 970-card deck reviewed in full every day: the last days no longer re-review the whole deck', () => {
  const exam = '2027-02-06', start = U.addDays(exam, -150), cards = {}, load = {};
  let made = 0, seed = 12345;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let i = 0; i <= 150; i++) {
    const day = U.addDays(start, i), dl = U.daysBetween(day, exam), cap = S.capFor(dl);
    if (dl > 14) for (let k = 0; k < 20 && made < 970; k++) cards['c' + made++] = null;   // 20 new cards a day until the final fortnight
    let n = 0;
    for (const id of Object.keys(cards)) {
      const c = cards[id];
      if (c && c.due > day) continue;
      if (c) n++;
      const g = rnd() < 0.1 ? 0 : rnd() < 0.06 ? 1 : 2;
      cards[id] = S.review(c || S.fresh(day), g, day, { cap });
      if (cards[id].due === day) cards[id] = S.review(cards[id], 2, day, { cap });
    }
    load[dl] = n;
  }
  const deck = Object.keys(cards).length;
  assert.equal(deck, 970);
  // before P2-37 the cap sent every card to the last two days (970 and 970 reviews); now about a fifth of the deck (137, 220, 220)
  for (const dl of [3, 2, 1]) assert.ok(load[dl] < deck * 0.3, `${dl} days left: ${load[dl]} of ${deck} reviews`);
  const mature = Object.values(cards).filter(S.isMature).length;
  assert.ok(mature > deck / 2, 'most of the deck is mature by the exam: ' + mature);
});

/* ---------------------------------------------------------------- audit part C (WP11): one share of the due cards, one text for the rule */
test('P2-37 (part C): dayShare is today\'s share of the due cards: at most the limit minus the reviews already made, in the final season only', () => {
  const day = '2027-01-28', cards = {};
  for (let i = 0; i < 26; i++) cards['r' + i] = { due: '2027-02-01', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: day, first: '2027-01-02' };   // reviewed today
  for (let i = 0; i < 3; i++) cards['n' + i] = { due: '2027-01-29', ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: day, first: day };            // introduced today
  const st = { profile: { goals: { minutes: 60 } }, cards };
  // the verifier's state: the final fortnight, 150 due, 60 minutes a day, 26 reviews made: '150 due · 34 today'
  assert.deepEqual(S.dayShare(st, 150, day, 'final'), { on: true, limit: 60, used: 26, left: 34, minutes: 60, due: 150, today: 34, over: 116 });
  assert.deepEqual([S.dayShare(st, 20, day, 'final').today, S.dayShare(st, 20, day, 'final').over], [20, 0], 'under the limit: every due card');
  assert.equal(S.dayShare(st, new Array(40).fill('id'), day, 'final').today, 34, 'the due id list counts as its length');
  for (const season of ['normal', 'between', 'done', 'eve', 'day', undefined]) {
    const x = S.dayShare(st, 150, day, season);
    assert.deepEqual([x.on, x.today, x.over, x.left], [false, 150, 0, Infinity], 'no limit outside the final season: ' + season);
  }
  for (const bad of [NaN, -3, '12', null, undefined, Infinity]) assert.equal(S.dayShare(st, bad, day, 'final').today, 0, 'no due count: ' + bad);
  assert.equal(S.dayShare({ cards: {} }, 500, day, 'final').limit, 90, 'unset daily time: the default 90 minutes');
  assert.equal(S.dayShare({ profile: { goals: { minutes: 15 } }, cards: {} }, 500, day, 'final').limit, 20, 'never below 20');
  assert.equal(S.dayShare(null, 5, day, 'final').today, 5);
  // reviewing the share ends the day's reviews (today 0: the plan's card row can be ticked) while the rest stays due
  for (let i = 0; i < 34; i++) cards['d' + i] = S.review({ due: day, ivl: 4, ease: 2.5, reps: 3, lapses: 0, last: '2027-01-24', first: '2027-01-02' }, 2, day, { cap: S.capFor(9) });
  const done = S.dayShare(st, 116, day, 'final');
  assert.deepEqual([done.used, done.left, done.today, done.over], [60, 0, 0, 116]);
  assert.equal(S.minutesOf({ profile: { goals: { minutes: 45 } } }), 45); assert.equal(S.minutesOf({ profile: { goals: { minutes: 0 } } }), 90); assert.equal(S.minutesOf(null), 90);
  assert.deepEqual(S.limitWords(60), { n: 60, time: 'half of your 60 minutes' });
  assert.deepEqual(S.limitWords(15), { n: 20, time: 'about 10 minutes' }, 'where the floor of 20 binds the words say so');
});
test('P2-37 (part C): capText says only what review() does, every day from 5 days after to three years before the exam', () => {
  const exam = '2027-02-06';
  const H = [null, { ivl: 0, ease: 2.3, reps: 0, lapses: 1, back: 1 }, { ivl: 1, ease: 2.5, reps: 1, lapses: 0, back: 1 }, { ivl: 8, ease: 2.5, reps: 3, lapses: 0, back: 8 },
    { ivl: 15, ease: 2.5, reps: 4, lapses: 0, back: 5 }, { ivl: 30, ease: 2.5, reps: 5, lapses: 0, back: 4 }, { ivl: 50, ease: 2.6, reps: 6, lapses: 0, back: 12 },
    { ivl: 125, ease: 2.5, reps: 7, lapses: 0, back: 125 }, { ivl: 300, ease: 2.5, reps: 8, lapses: 0, back: 300 }, { ivl: S.MAX_IVL, ease: 2.5, reps: 9, lapses: 0, back: S.MAX_IVL }];
  // the longest gap review() stores today: a card at the 365-day ceiling answered Easy, over a few reviews (a capped date may spread up to a
  // tenth earlier by a hash of the review, so one review alone may land short of the cap)
  const longest = (day, cap, N) => {
    let best = 0;
    for (let k = 0; k < 400 && best < N; k++) best = Math.max(best, U.daysBetween(day, S.review({ due: day, ivl: S.MAX_IVL, ease: 2.5, reps: 9, lapses: k, last: U.addDays(day, -S.MAX_IVL) }, 3, day, { cap }).due));
    return best;
  };
  let skips = 0, far = 0;
  for (let dl = -5; dl <= 1100; dl++) {
    const day = U.addDays(exam, -dl), cap = S.capFor(dl), T = S.capText({ daysLeft: dl, label: 'GATE 2027' }, 90);
    const within = /^Right now cards come back within (\d+) days?, before GATE 2027; ones you know well may wait until after it\.$/.exec(T.now);
    const every = /^Right now the longest gap is (\d+) days?, so every card you review today comes back before GATE 2027\.$/.exec(T.now);
    if (every) {
      // 'the longest gap is N days' names a gap review() really stores: never the cap where the cap is longer than the 365-day ceiling
      const N = +every[1];
      assert.ok(N <= S.MAX_IVL && N <= cap, `${dl} days: 'the longest gap is ${N} days' (cap ${cap}, ceiling ${S.MAX_IVL})`);
      assert.equal(longest(day, cap, N), N, `${dl} days: 'the longest gap is ${N} days' is the longest gap stored`);
      if (cap > S.MAX_IVL) far++;
    }
    for (const h of H) for (let g = 0; g < 4; g++) {
      const base = h ? { due: day, ivl: h.ivl, ease: h.ease, reps: h.reps, lapses: h.lapses, last: U.addDays(day, -h.back) } : null;
      const n = S.review(base, g, day, { cap }), gap = U.daysBetween(day, n.due);
      const skip = cap != null && cap <= S.FINAL_CAP && g >= 2 && S.pulledForward(base);
      if (every) assert.ok(gap < dl && gap <= +every[1], `${dl} days: 'the longest gap is ${every[1]} days … every card … before' but gap ${gap}`);
      else if (within) {
        if (skip) { skips++; assert.ok(gap > dl, `${dl} days: a well-known card that skips comes back after the exam (gap ${gap})`); }
        else assert.ok(gap <= +within[1] && gap < dl, `${dl} days: 'within ${within[1]} days' but gap ${gap}`);
      } else if (/^Tomorrow is GATE 2027/.test(T.now)) { if (g > 0) assert.ok(gap >= dl, `the eve: reviews come back on or after the exam day (gap ${gap})`); }
      else assert.deepEqual(n, S.review(base, g, day), `${dl} days: 'natural spacing' means no cap`);
      // the rule paragraph: every gap is capped at half the days left, except the skip it names (15 days out or fewer)
      if (cap != null && !skip) assert.ok(gap <= Math.floor(dl / 2), `${dl} days: gap ${gap} over half the days left`);
      if (skip) assert.ok(dl <= 15, 'the skip starts 15 days out');
    }
    assert.equal(!!within, dl >= 2 && dl <= 15, 'the hedged sentence exactly where the skip applies: ' + dl);
    assert.equal(!!every, dl >= 16, 'the full promise only where no card may skip: ' + dl);
  }
  assert.ok(skips > 0, 'the exception the sentence names really happens');
  assert.equal(far, 1100 - 731, 'exams 732+ days away (a cap longer than the 365-day ceiling) are covered');
  // the verifier's case: a learner-set 2029-06-12 seen on 2026-10-17 is 969 days away (a cap of 484 days that never binds)
  assert.equal(S.capText({ daysLeft: 969, label: 'your exam' }).now, 'Right now the longest gap is 365 days, so every card you review today comes back before your exam.');
  assert.deepEqual([729, 730, 731, 732, 733].map(d => +/longest gap is (\d+) days/.exec(S.capText({ daysLeft: d }).now)[1]), [364, 365, 365, 365, 365], 'the cap until it passes the ceiling');
  const R = S.capText({ daysLeft: 9, label: 'GATE 2027' }, 60).rule;
  assert.ok(!/never scheduled later|every card you review today/.test(R), 'the paragraph makes no promise without its exception');
  assert.ok(/capped at half the days left/.test(R) && /From 15 days out the cap skips a card you know well \(an interval of 21 days or more\)/.test(R) && /comes back after the exam/.test(R), R);
  assert.ok(/at most 60 cards \(half of your 60 minutes\)/.test(R) && /the rest stay due/.test(R), 'the daily limit with the learner\'s own numbers: ' + R);
  assert.ok(/at most 90 cards \(half of your 90 minutes\)/.test(S.capText({ daysLeft: 9 }).rule), 'unset daily time: 90 minutes');
  assert.equal(S.capText({ daysLeft: 0, label: 'your exam' }).now, 'Your exam is today: reviews follow their natural spacing.');
  assert.equal(S.capText(null).now, 'No exam ahead: reviews follow their natural spacing.');
  assert.ok(!/!/.test(R + S.capText({ daysLeft: 30, label: 'GATE 2027' }).now), 'tone guide: no exclamation marks');
});
test('P2-68 with P1-61 (resume): roundDone: a Quick 20 (exam day: the 10-card warm-up) is one round a day from the final fortnight on', () => {
  const day = '2027-02-05', cards = {};
  const add = (n, o) => { for (let i = 0; i < n; i++) cards['c' + Object.keys(cards).length] = Object.assign({ due: '2027-02-08', ivl: 3, ease: 2.5, reps: 3, lapses: 0, last: day, first: '2027-01-01' }, o || {}); };
  const st = { cards };
  assert.deepEqual(S.ROUND, { quick: 20, warm: 10 });
  add(19);
  assert.equal(S.reviewsOn(cards, day), 19);
  assert.deepEqual(['final', 'eve', 'day'].map(se => S.roundDone(st, day, se)), [false, false, true], '19 reviews: the warm-up (10) is done, a Quick 20 is not');
  add(5, { first: day });                                                       // five cards introduced today: new cards are not reviews
  assert.equal(S.roundDone(st, day, 'eve'), false);
  add(1);
  assert.deepEqual(['final', 'eve', 'day', 'normal', 'between', 'done'].map(se => S.roundDone(st, day, se)), [true, true, true, false, false, false], 'never outside the run-up');
  assert.equal(S.roundDone(st, '2027-02-06', 'day'), false, 'a new day starts a new round');
  assert.equal(S.roundDone(null, day, 'eve'), false); assert.equal(S.roundDone({}, day, 'day'), false);
});
