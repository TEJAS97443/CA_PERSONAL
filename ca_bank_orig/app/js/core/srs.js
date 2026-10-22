/* PassBook — spaced repetition (SM-2 family, day granularity). Pure, unit-tested (tests/srs.test.js).
   A card/item state: {due:'YYYY-MM-DD', ivl:days, ease:1.3..3, reps, lapses, last:'YYYY-MM-DD'|null, first?:'YYYY-MM-DD'}
   Grades: 0 Again, 1 Hard, 2 Good, 3 Easy.

   The exam cap (audit P0-26, docs/ARCHITECTURE.md §10.5). SRS.capFor(daysLeft) is the one cap rule, used by card reviews, question retries and the
   flash previews, so a button's label is the stored gap by construction:
     * no cap when no exam is ahead, or with one day or less left (the eve, exam day and after it: reviews follow natural spacing, on purpose);
     * otherwise max(1, floor(daysLeft / 2)), so everything comes back before the exam.
   `ivl` is the EARNED interval and the cap never overwrites it: the cap only brings the due date forward. Maturity (`isMature`), `strength` and
   the 'mature' tile read the earned interval, so a capped final stretch no longer wipes maturity. An early review (one made before the earned
   interval is up: a capped due date, Quick 20, a warm-up) grows from the days that really elapsed, but never below the earned interval.
   `first` is the day a card was first reviewed: the daily new-card cap counts it (D8, P1-41). Old states without it stay valid.

   The final-fortnight load (audit P2-37, D8). Halving the cap pulls every card back again and again as the exam nears (970 of 970 cards due on
   each of the last two days in a season replay; 220 with these rules). Three rules keep it bounded. The first two live in review(), so previews
   still equal what is stored; spreading never moves a cap of 10 days or less, and the skip frees only a mature card the cap had already pulled
   forward, so an on-time review still gets exactly the cap above:
     * spreading: a due date the cap brought forward moves up to 10 % earlier (whole days, so only caps of 11+ days), by a hash of the review
       itself, so cards capped on the same day do not all land on the same later day;
     * a mature card may skip a review in the final fortnight: answered Good or Easy under a cap of FINAL_CAP days or less (15 or fewer days
       left), a card with an earned interval of 21+ days whose due date a cap had already brought forward keeps its natural spacing, because the
       exam lies inside its earned interval;
     * a daily review limit from the daily minutes (reviewLimit, reviewsOn): the flashcard hub's 'Review N due' takes at most that many in the
       final fortnight, weakest first; the rest stay due (views/flash.js).
   Shared with every screen that names a card count or explains the rule (audit part C):
     * dayShare(state, due, day, season): today's share of the due cards, the one count behind every 'Review N due' (the hub and its session;
       the planner's card row, the shared next step and the palette read it too), so a row never promises more than its session serves and a
       day whose reviews are done can be ticked ('150 due · 34 today');
     * capText(E, minutes): the rule in words, {now, rule}, for the /flash header and the About page, kept next to the rule so that a
       sentence never promises more than review() does;
     * roundDone(state, day, season): from the final fortnight on, a Quick 20 (exam day: the 10-card warm-up) is one round a day; once
       done, the screens that offer it hand over to the plan (P2-68). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = g.GA && g.GA.util ? g.GA.util : (typeof require === 'function' ? require('./util.js') : null);

  const GRADES = ['Again', 'Hard', 'Good', 'Easy'];
  const MIN_EASE = 1.3, MAX_EASE = 3.0;
  const MAX_IVL = 365;                         // the longest natural gap (a ceiling on the earned interval; not an exam cap)
  const MATURE = 21;                           // an earned interval of 21+ days: 'learned well'
  const FINAL_CAP = 7;                         // a cap of a week or less: 15 or fewer days to the exam (the final fortnight)
  const SPREAD = 0.1;                          // capped due dates spread up to 10 % earlier (P2-37)
  const MIN_PER_CARD = 0.5;                    // minutes one review takes: the planner's, nextStep's and the hub's estimate
  const LIMIT_SHARE = 0.5;                     // in the final fortnight reviews may fill half of the daily minutes
  const LIMIT_MIN = 20, LIMIT_MAX = 1000, MINUTES = 90;   // MINUTES: the store's default daily time
  const DAY = /^\d{4}-\d{2}-\d{2}$/;
  const isDay = d => typeof d === 'string' && DAY.test(d);
  /** a stable 32-bit hash (FNV-1a): the spread of a capped due date depends only on the review, never on chance */
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
  /** how many days earlier a capped due date may move: up to 10 % of the cap in whole days (0 for caps of 10 days or less) */
  const spreadMax = cap => Math.max(0, Math.floor((cap - 1) * SPREAD));

  function fresh(today) { return { due: today, ivl: 0, ease: 2.5, reps: 0, lapses: 0, last: null }; }

  /** The one exam cap (P0-26): a day cap, or null for no cap. `daysLeft` = GA.stats.exam(state, D.exam, today).daysLeft (null: no date). */
  function capFor(daysLeft) {
    if (typeof daysLeft !== 'number' || !isFinite(daysLeft) || daysLeft <= 1) return null;
    return Math.max(1, Math.floor(daysLeft / 2));
  }
  /** the cap a caller passed: {cap}, or during the transition the old name {maxIvl}, which now caps the due date only (never the interval) */
  function capOf(o) {
    const v = o && o.cap != null ? o.cap : o && o.maxIvl != null ? o.maxIvl : null;
    return typeof v === 'number' && isFinite(v) ? Math.max(1, Math.floor(v)) : null;
  }
  /** a mature card (earned interval 21+ days) whose stored due date a cap brought forward: the gap it got is shorter than the interval it earned */
  function pulledForward(c) {
    const ivl = Math.max(0, Math.round(+(c && c.ivl) || 0));
    return !!c && ivl >= MATURE && isDay(c.last) && isDay(c.due) && U.daysBetween(c.last, c.due) < ivl;
  }

  /** The final fortnight's daily review limit (P2-37, D8): the reviews that fit in half of the daily minutes (profile.goals.minutes, 90 when
      unset), at 0.5 min each, never below 20: 90 min a day -> 90 reviews. The flashcard hub applies it in the final season only. */
  function reviewLimit(minutes) {
    const m = typeof minutes === 'number' && isFinite(minutes) && minutes > 0 ? minutes : MINUTES;
    return Math.max(LIMIT_MIN, Math.min(LIMIT_MAX, Math.round((m * LIMIT_SHARE) / MIN_PER_CARD)));
  }
  /** reviews made on `day`: cards learned before that day and reviewed on it (a card introduced that day counts against the new-card cap
      instead). `cards` = state.cards. */
  function reviewsOn(cards, day) {
    let n = 0;
    for (const k in cards || {}) { const c = cards[k]; if (c && c.last === day && firstDay(c) !== day) n++; }
    return n;
  }
  /** Today's bounded card round is done (P2-68 with P1-61, D20): from the final fortnight on a Quick 20 (exam day: the 10-card warm-up) is one
      round a day, done once the cards reviewed on `day` (reviewsOn: cards learned before that day) reach its size, ROUND.quick or ROUND.warm.
      The /flash hub, its empty screens and its finish card then hand the coral to the plan instead of offering the round again; the shared
      next step and the planner's card row can read the same rule. Always false in other seasons (normal, between, done). */
  const ROUND = { quick: 20, warm: 10 };
  function roundDone(state, day, season) {
    if (season !== 'final' && season !== 'eve' && season !== 'day') return false;
    return reviewsOn(state && state.cards, day) >= (season === 'day' ? ROUND.warm : ROUND.quick);
  }
  /** the daily minutes of a profile (profile.goals.minutes), or the store's default 90 when unset or invalid */
  function minutesOf(state) {
    const g0 = state && state.profile && state.profile.goals, m = g0 && g0.minutes;
    return typeof m === 'number' && isFinite(m) && m > 0 ? m : MINUTES;
  }
  /** Today's share of the due cards (P2-37, D8): the one count behind every 'Review N due'. state = the app state (state.cards and
      state.profile.goals.minutes); due = the due-card count, GA.stats.due(...).cards, or its id list; day = today; season =
      GA.stats.season(...). In the final season at most reviewLimit(daily minutes) reviews a day: today = min(due, limit - reviews already
      made today), and the rest (over) stay due for tomorrow; in every other season today = due. A day's card reviews are done when today
      is 0: none due, or the day's limit reached. → {on, limit, used, left, minutes, due, today, over}; left is Infinity outside the final
      season. Consumers: the hub, its '#/flash/all' session and its finish card (views/flash.js); the planner's card row and its judge
      (title, target and done), nextStep's final 'Review' rule and the palette's due row. */
  function dayShare(state, due, day, season) {
    const raw = Array.isArray(due) ? due.length : due;
    const n = typeof raw === 'number' && isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
    const minutes = minutesOf(state), on = season === 'final', limit = reviewLimit(minutes), used = reviewsOn(state && state.cards, day);
    const left = on ? Math.max(0, limit - used) : Infinity, today = Math.min(n, left);
    return { on, limit, used, left, minutes, due: n, today, over: n - today };
  }
  /** the daily review limit in words for `minutes` a day: {n, time}: n = reviewLimit(minutes); time = 'half of your 60 minutes', or for a
      daily time under 20 minutes (where the floor of 20 reviews binds) 'about 10 minutes' */
  function limitWords(minutes) {
    const m = typeof minutes === 'number' && isFinite(minutes) && minutes > 0 ? minutes : MINUTES, n = reviewLimit(m);
    return { n, time: n === Math.round((m * LIMIT_SHARE) / MIN_PER_CARD) ? `half of your ${U.nf(m)} minutes` : `about ${U.nf(Math.ceil(n * MIN_PER_CARD))} minutes` };
  }
  const cap1 = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  /** The cap rule in words (P0-26, P2-37), for the /flash header and the About page's method note. E = GA.stats.exam(...) ({daysLeft,
      label}); minutes = profile.goals.minutes (for the daily review limit). → {now, rule}, plain text (callers escape it):
        now  = what the rule means today, one sentence ('Right now the longest gap is 57 days, so every card you review today comes back
               before Paper 4.'); the longest gap is the cap or, where the cap is longer (an exam 732+ days away), MAX_IVL: review() never
               stores more than 365 days, so a far exam never reads 'the longest gap is 484 days'; from 15 days out, where a well-known card
               may keep its natural spacing, it never claims every card;
        rule = how the schedule treats the exam, with the final-fortnight exceptions (the mature skip and the daily review limit).
      tests/srs.test.js checks each sentence against review() from 5 days after to three years before the exam, so the words cannot promise
      more than the schedule does. */
  function capText(E, minutes) {
    const dl = E && typeof E.daysLeft === 'number' && isFinite(E.daysLeft) ? E.daysLeft : null, cap = capFor(dl), lbl = (E && E.paper && E.paper.name) || (E && E.label) || 'the exam';
    let now;
    if (cap != null && cap <= FINAL_CAP) now = `Right now cards come back within ${U.plural(cap, 'day')}, before ${lbl}; ones you know well may wait until after it.`;
    else if (cap != null) now = `Right now the longest gap is ${U.plural(Math.min(cap, MAX_IVL), 'day')}, so every card you review today comes back before ${lbl}.`;
    else if (dl === 1) now = `Tomorrow is ${lbl}: cards you review today come back after it.`;
    else if (dl === 0) now = `${cap1(lbl)} is today: reviews follow their natural spacing.`;     // 'Your exam is today', never 'your exam is today'
    else now = 'No exam ahead: reviews follow their natural spacing.';
    const L = limitWords(minutes);
    const rule = 'While your exam is more than a day away, each new gap is capped at half the days left, so cards come back before it; ' +
      'dates the cap brings forward may come up to a tenth earlier, so cards capped on the same day do not all return together. ' +
      'The interval you earned is kept, so a capped card still counts as learned. ' +
      `From ${2 * FINAL_CAP + 1} days out the cap skips a card you know well (an interval of ${MATURE} days or more) that it already brought back early: ` +
      'answered Good or Easy, it keeps its natural spacing and comes back after the exam. ' +
      `In the final fortnight your daily review takes at most ${U.plural(L.n, 'card')} (${L.time}), the ones you know least first; the rest stay due for the next day.`;
    return { now, rule };
  }

  /** next state after answering with `grade` on day `today`; pure (does not mutate `c`). opts: {cap} (from capFor) */
  function review(c, grade, today, opts) {
    const cap = capOf(opts);
    const n = Object.assign(fresh(today), c || {});
    let ivl = Math.max(0, Math.round(+n.ivl || 0)), ease = +n.ease || 2.5, reps = Math.max(0, n.reps | 0), lapses = Math.max(0, n.lapses | 0);
    const ivl0 = ivl;
    const seenBefore = isDay(n.last);
    const elapsed = seenBefore ? Math.max(0, U.daysBetween(n.last, today)) : null;
    if (grade === 0) {                       // forgot: relearn today, penalise ease, shrink interval
      if (reps > 0) lapses++;
      ease = Math.max(MIN_EASE, ease - 0.2);
      reps = 0;
      ivl = 0;
    } else {
      const mult = grade === 1 ? 1.2 : grade === 2 ? ease : ease * 1.3;
      if (reps > 0 && elapsed != null && elapsed < ivl) {
        // early review: credit only the days that really elapsed, and never lose the interval already earned
        ivl = Math.max(ivl, Math.round(elapsed * mult));
      } else if (reps === 0) ivl = grade === 1 ? 1 : grade === 2 ? 1 : 4;
      else if (reps === 1) ivl = grade === 1 ? 2 : grade === 2 ? 3 : 7;
      else ivl = Math.max(ivl + 1, Math.round(ivl * mult));
      if (grade === 1) ease = Math.max(MIN_EASE, ease - 0.15);
      if (grade === 3) ease = Math.min(MAX_EASE, ease + 0.15);
      reps++;
    }
    ivl = Math.min(ivl, MAX_IVL);
    // P2-37: a mature card the cap already pulled forward, answered Good or Easy in the final fortnight, keeps its natural spacing
    const capped = cap != null && cap <= FINAL_CAP && grade >= 2 && pulledForward(n) ? null : cap;
    let gap = ivl === 0 ? 0 : capped == null ? ivl : Math.min(ivl, capped);
    if (capped != null && gap === capped && capped < ivl) {
      // P2-37: spread a due date the cap brought forward up to 10 % earlier, by a hash of this review (same inputs, same day)
      const m = spreadMax(capped);
      if (m > 0) gap -= hash([n.due, ivl0, n.ease, n.reps, n.lapses, n.last, n.first, grade, today, capped].join('|')) % (m + 1);
    }
    const out = { due: gap === 0 ? today : U.addDays(today, gap), ivl, ease: Math.round(ease * 100) / 100, reps, lapses, last: today };
    const first = isDay(n.first) ? n.first : !seenBefore ? today : null;
    if (first) out.first = first;
    return out;
  }

  /** What each button would schedule, for the labels under Again/Hard/Good/Easy: the four day gaps [again, hard, good, easy], each equal to the
      gap review() stores with the same options, so a label is never a promise the schedule breaks. */
  function preview(c, today, opts) { return [0, 1, 2, 3].map(gr => U.daysBetween(today, review(c || fresh(today), gr, today, opts).due)); }

  const isDue = (c, today) => !c || c.due <= today;
  const isNew = c => !c || c.reps === 0 && c.last == null;
  /** seen at least once (the one 'due' definition counts only seen cards, so a lapsed 'Again' card still counts; P2-74) */
  const isSeen = c => !!c && isDay(c.last);
  /** due today among seen cards: s.last set and s.due <= today */
  const isDueSeen = (c, today) => isSeen(c) && c.due <= today;
  const isMature = c => !!c && c.ivl >= MATURE;
  /** the day this card was first reviewed, or null when unknown (states written before `first` existed) */
  const firstDay = c => (c && isDay(c.first) ? c.first : null);

  /** 0..1 estimate of how well the card is still remembered today (forgetting-curve proxy). */
  function strength(c, today) {
    if (!c || !c.last || c.reps === 0) return 0;
    const el = Math.max(0, U.daysBetween(c.last, today));
    const s = Math.max(1, c.ivl);
    const recall = Math.pow(0.9, el / s);            // 90% recall at the scheduled interval
    const maturity = Math.min(1, Math.log2(1 + c.ivl) / Math.log2(1 + 60));   // 60-day interval = fully consolidated
    return Math.round(recall * (0.35 + 0.65 * maturity) * 1000) / 1000;
  }

  /** Map a practice outcome on a question to a grade: wrong -> Again; right-but-slow -> Hard; right -> Good; right & fast -> Easy. */
  function gradeFromAttempt(ok, ms, marks) {
    if (!ok) return 0;
    const target = (marks === 2 ? 120 : 60) * 1000;      // a time target per question (the old 1-2 mark model; the ICAI bank will set its own)
    if (ms == null) return 2;
    if (ms > 1.6 * target) return 1;
    if (ms < 0.5 * target) return 3;
    return 2;
  }

  /** Sort due items: oldest due first, then lowest ease. */
  const byUrgency = (a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.ease - b.ease);

  GA.srs = { GRADES, MAX_IVL, MATURE, FINAL_CAP, MIN_PER_CARD, ROUND, fresh, capFor, review, preview, pulledForward, reviewLimit, reviewsOn, roundDone,
             spreadMax, minutesOf, dayShare, limitWords, capText, isDue, isNew, isSeen, isDueSeen, isMature, firstDay, strength, gradeFromAttempt, byUrgency };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.srs;
})(typeof window !== 'undefined' ? window : globalThis);
