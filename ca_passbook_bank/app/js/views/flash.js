/* PassBook — flashcards with spaced repetition: the hub (/flash) and review sessions (/flash/:deck). Scheduling lives in core/srs.js; state in
   store.cards. Styles: app/css/retention.css. Audit wave 1 (WP11; _audit/PROPOSAL.md + DECISIONS.md, contract docs/ARCHITECTURE.md §10.4–10.5):
     * decks: 'all', a subject, a topic or a lesson; every lesson deck resolves (P0-07).
     * sessions (§10.4): #/flash/all = 'Review N due', due cards only (P1-41); #/flash/<deck> = its due cards, then its new cards within the daily
       new-card cap; ?mode=new = 'Learn 10 new from your lessons' (finished, then opened, then the next planned lessons, in the one learning order);
       ?mode=quick = 'Quick 20' (the cards you know least, due ones first); ?mode=warm = 'Warm up: 10 cards you know' (exam day). The daily cap is
       profile.goals.cards, labelled 'New flashcards a day' (D8). A mode is dropped from the URL once its queue is built, so Back never repeats it.
     * the one exam cap SRS.capFor on the shared exam date: a button's label is the stored gap (P0-26); the header's spacing note follows the season.
     * the hub's coral follows the season (P1-61, D20): 'Review N due' (with minutes) or 'Learn 10 new'; the final fortnight 'Review N due' or
       'Quick 20'; the eve 'Quick 20: your shakiest due cards'; exam day the optional warm-up; 'Learn 10 new' is neutral beside a review and hidden on
       the eve and exam day. A state with nothing to do gets a coral from a real next step (the plan's next task, else the shared next step; D18).
     * the flip shows the answer side (P0-25); a finished session ignores keys and stale taps (P0-02); focus goes to Show, then Good, then the finish
       coral, and the answer is announced (P1-48); a card file that does not arrive gets the load-failure card, never 'All caught up' (P1-59).
     * the finish card: '+N XP · today counts (streak S) · K of these come back tomorrow' (a weekday line once a day when most cards went well),
       a tally of the unique cards, a coral that hands back to the plan, and a neutral second action named by what it opens (P2-68, P2-70).
   Audit part B: the final fortnight's daily review limit (P2-37: 'Review N due' takes at most SRS.reviewLimit(daily minutes) a day, the cards
   you know least first and mature ones last; the rest stay due, '48 due · 30 today'; ?mode=more = 20 more beyond the limit); empty screens take
   their coral by season (P1-61: never 'Learn 10 new' in the final fortnight); the answer is spoken from the card's text, so maths is read once
   (P1-48); the hub's due number is GA.stats.due (P2-74); unique titles ('Operating Systems flashcards', P2-12); the not-found card is the shell's
   (P3-31). The pure helpers at the top load in Node (tests/flash.test.js); APIs another package owns are feature-detected (ARCHITECTURE §10, rule 1).
   Audit part C: today's share of the due cards is SRS.dayShare and the header's spacing note SRS.capText, the rules in core/srs.js that the
   planner's card row, the shared next step, the palette and the About page can read too, so every 'Review N due' names the cards its session
   serves and every sentence about the cap says what review() does.
   Resume (part B re-run): the answer is announced through WP8's GA.md.textOf (the rendered answer, each formula once in the app's maths words:
   P1-48 with P0-18), the card's Markdown as text only without it. A Quick 20 or the warm-up is one round a day (SRS.roundDone): once it is
   done the hub, empty screens and the finish card hand the coral to the plan (skipLink also passes over the round just finished, which the
   plan or the shared step may still name), the eve and exam day end on today's plan, and every second action is named by what it opens (P2-68). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);
  const SRS = GA.srs || (typeof require === 'function' ? require('../core/srs.js') : null);
  const DAYKEY = /^\d{4}-\d{2}-\d{2}$/;
  const NEW_BATCH = 10, QUICK_N = 20, WARM_N = 10, DAY_CAP = 20, MIN_PER_CARD = 0.5;   // MIN_PER_CARD: the planner's and nextStep's estimate
  const MODES = ['new', 'quick', 'warm', 'more'];
  const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  /** the finish card's weekday line (P2-70, D19: light wit on a finished state only, once a day, when most of the session went well) */
  const QUIPS = ['A good use of a Sunday.', 'Monday, off to a good start.', 'Tuesday, handled.', 'Midweek, and on schedule.', 'Thursday, filed away.', 'Friday, sorted.', 'Saturday well spent.'];
  const cap1 = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  /* ================================================================== pure helpers (no DOM) */

  /** What a deck id names (P0-07): 'all' (every card), a subject, a lesson, or a topic. Lesson ids are also sub-topic node ids, so a lesson is
      matched before the node table (which used to swallow it as a topic with no cards). null for an unknown id. */
  function deckOf(D, deck) {
    if (!D || typeof deck !== 'string' || !deck) return null;
    if (deck === 'all') return { kind: 'all', id: 'all', name: 'All decks', cards: D.cards };
    if (D.subjectById && D.subjectById[deck]) return { kind: 'subject', id: deck, name: D.subjectById[deck].name, cards: D.cards.filter(c => c.subject === deck) };
    if (D.lessonById && D.lessonById[deck]) return { kind: 'lesson', id: deck, name: D.lessonById[deck].title, cards: D.cards.filter(c => c.lesson === deck) };
    const n = D.nodes && D.nodes[deck];
    if (n && n.kind === 'topic') return { kind: 'topic', id: deck, name: n.name, cards: D.cards.filter(c => c.topic === deck) };
    return null;
  }
  const deckCards = (D, deck) => { const d = deckOf(D, deck); return d ? d.cards : []; };

  /** the exam the app counts to (GA.stats.exam, P1-46), or a minimal stand-in from the stored date until it exists */
  function examOf(state, D, today) {
    const ST = GA.stats;
    if (ST && typeof ST.exam === 'function') { try { const E = ST.exam(state, D && D.exam, today); if (E) return E; } catch (e) { /* fall through */ } }
    const d = state && state.profile && state.profile.examDate;
    const ok = typeof d === 'string' && DAYKEY.test(d);
    return { date: ok ? d : null, label: 'your exam', daysLeft: ok ? U.daysBetween(today, d) : null, basis: ok ? 'yours' : null };
  }
  /** the season (GA.stats.season, P1-61): normal | final | eve | day | done | between */
  function seasonOf(state, D, today) {
    const ST = GA.stats;
    if (ST && typeof ST.season === 'function') { try { return ST.season(state, D && D.exam, today) || 'normal'; } catch (e) { /* fall through */ } }
    return 'normal';
  }
  /** the one review cap today (P0-26): the same rule and the same days left as GA.actions.reviewCard, so a preview is the stored gap */
  const capNow = (state, D, today) => SRS.capFor(examOf(state, D, today).daysLeft);
  /** the four gaps [again, hard, good, easy] the buttons show for one card */
  function previewFor(state, D, cardId, today) {
    const st = state && state.cards && state.cards[cardId];
    return SRS.preview(st || SRS.fresh(today), today, { cap: capNow(state, D, today) });
  }
  /** a gap in days as a button label: exact days, so the label is what is stored ('1 year' is the longest natural gap) */
  const gapLabel = d => (d <= 0 ? '<10 min' : d === 1 ? '1 day' : d < SRS.MAX_IVL ? U.nf(d) + ' days' : '1 year');
  /** the header's spacing note, in season (P0-26, P2-37): SRS.capText's `now`, the sentence the About page prints too ('…comes back before
      Paper 4' / '…within 7 days, before Paper 4; ones you know well may wait until after it' / 'Tomorrow is Paper 4: …after it') */
  const capNote = E => SRS.capText(E).now;
  /** when a day comes, in words: 'today', 'tomorrow', 'on Thursday' (within a week), else 'on 24 Oct' */
  function backOn(day, today) {
    const d = U.daysBetween(today, day);
    if (d <= 0) return 'today';
    if (d === 1) return 'tomorrow';
    if (d <= 6) return 'on ' + DOW[U.parseDay(day).getDay()];
    return 'on ' + U.fmtDay(day, { day: 'numeric', month: 'short' });
  }
  /** '9 cards come back on Thursday.' from {day, n} (the next due day of the cards you have studied), or '' */
  const comesBack = (nd, today) => (nd && nd.n ? `${U.plural(nd.n, 'card')} ${nd.n === 1 ? 'comes' : 'come'} back ${backOn(nd.day, today)}.` : '');
  /** the answer as plain text from the card's Markdown, each formula once ('n²', 'Θ(n log n)'): the fallback of the session's announcement
      when GA.md.textOf is missing (the view speaks the rendered answer through it: answerWords). Never the rendered node's textContent:
      KaTeX writes every formula twice (MathML plus an aria-hidden copy), so that text doubled the maths. */
  function spokenAnswer(md) {
    const P = GA.pyqLib;
    if (P && typeof P.plain === 'function') { try { return P.plain(md); } catch (e) { /* fall through */ } }
    return String(md || '').replace(/\$+([^$]*)\$+/g, '$1').replace(/\\([a-zA-Z]+)/g, '$1').replace(/[*_`#>{}]/g, '').replace(/\s+/g, ' ').trim();
  }
  /** the text of a rendered node as a screen reader would hear it: without aria-hidden copies (KaTeX's visual HTML), TeX annotations or the
      'Answer' kicker, a line break as a space */
  const plainOf = el => {
    if (!el || !el.cloneNode) return '';
    const d = el.cloneNode(true);
    d.querySelectorAll('[aria-hidden="true"], annotation, .fs-ak').forEach(x => x.remove());
    d.querySelectorAll('br').forEach(b => b.replaceWith(' '));
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  };
  /** the answer as the announcement says it (P1-48, with WP8's P0-18 words): the rendered answer `el` through GA.md.textOf, so each formula
      is said once and in the words the app uses for maths everywhere ('n (n plus 1) over 2 … n squared'), with no 'Answer' kicker and a line
      break as a space. It reads what is drawn (emphasis, code, escapes), which the Markdown cannot always tell. Without GA.md.textOf the
      card's Markdown `md` as text (spokenAnswer), else the node's text without its aria-hidden copies. Needs only the node's own DOM methods
      (cloneNode, querySelectorAll), so Node tests can pass a small stand-in. */
  function answerWords(el, md) {
    const M = GA.md;
    if (el && el.cloneNode && M && typeof M.textOf === 'function') {
      try {
        const c = el.cloneNode(true);
        c.querySelectorAll('.fs-ak').forEach(x => x.remove());
        c.querySelectorAll('br').forEach(b => b.replaceWith(' '));
        const t = M.textOf(c); if (t) return t;
      } catch (e) { /* fall through */ }
    }
    return spokenAnswer(md) || plainOf(el);
  }
  const minutesFor = n => Math.max(1, Math.ceil(n * MIN_PER_CARD));
  /** the daily new-card cap: profile.goals.cards, labelled 'New flashcards a day' in Settings (D8, P2-40) */
  function dayCap(state) {
    const v = state && state.profile && state.profile.goals && state.profile.goals.cards;
    return typeof v === 'number' && isFinite(v) && v >= 0 ? Math.min(500, Math.floor(v)) : DAY_CAP;
  }
  /** cards first reviewed today (SRS records the day a card is introduced) */
  function newToday(state, today) { let n = 0; const cs = (state && state.cards) || {}; for (const k in cs) if (SRS.firstDay(cs[k]) === today) n++; return n; }
  /** per-deck numbers with the one 'due' definition: seen (s.last) and s.due <= today, so a lapsed 'Again' card counts (P2-74) */
  function counts(state, cards, today) {
    let nw = 0, due = 0, learned = 0, mature = 0;
    for (const c of cards) { const s = state.cards[c.id]; if (!SRS.isSeen(s)) nw++; else { learned++; if (s.due <= today) due++; if (SRS.isMature(s)) mature++; } }
    return { total: cards.length, nw, due, learned, mature };
  }
  function cardsByLesson(D) {
    if (D._cardsByLesson) return D._cardsByLesson;
    const m = {}; for (const c of D.cards) (m[c.lesson] = m[c.lesson] || []).push(c);
    return (D._cardsByLesson = m);
  }
  /** a lesson record that is real reading (§10.3): done, two minutes or more, a self-check answered, or a saved position; a peek is not */
  const realRead = r => !!r && (!!r.done || (r.secs || 0) >= 120 || (!!r.quiz && Object.keys(r.quiz).length > 0) || !!r.at);
  const orderOf = (D, I, subject) => (I && typeof I.order === 'function' ? I.order(subject || null) : D.lessons.filter(l => !subject || l.subject === subject).map(l => l.id));
  /** where 'Learn 10 new from your lessons' draws from (P1-41): lessons you finished, then lessons you opened, then the next planned lessons
      (the shared next step, then on through its subject and the one learning order); each group in the learning order (I.order) */
  function newPool(state, D, today, I) {
    const order = orderOf(D, I, null), rank = new Map(order.map((id, i) => [id, i]));
    const byRank = (a, b) => (rank.has(a) ? rank.get(a) : 1e9) - (rank.has(b) ? rank.get(b) : 1e9);
    const recs = (state && state.lessons) || {}, finished = [], opened = [];
    for (const id in recs) { if (!D.lessonById[id]) continue; const r = recs[id]; if (r && r.done) finished.push(id); else if (realRead(r)) opened.push(id); }
    finished.sort(byRank); opened.sort(byRank);
    const taken = new Set(finished.concat(opened)), planned = [];
    const push = id => { if (D.lessonById[id] && !taken.has(id)) { taken.add(id); planned.push(id); } };
    let step = null;
    try { step = GA.stats && typeof GA.stats.nextLesson === 'function' ? GA.stats.nextLesson(state, D, { today, I }) : null; } catch (e) { step = null; }
    if (step && step.id && D.lessonById[step.id]) {
      push(step.id);
      const sub = orderOf(D, I, D.lessonById[step.id].subject), i = sub.indexOf(step.id);
      sub.slice(i + 1).forEach(id => { if (!(recs[id] && recs[id].done)) push(id); });
    }
    order.forEach(id => { if (!(recs[id] && recs[id].done)) push(id); });
    return { finished, opened, planned };
  }
  /** up to n never-seen card ids from these lessons, in lesson order and each lesson's own card order */
  function newFrom(state, D, lessonIds, n) {
    const by = cardsByLesson(D), out = [];
    if (n <= 0) return out;
    for (const id of lessonIds) for (const c of by[id] || []) { if (!SRS.isSeen(state.cards[c.id])) { out.push(c.id); if (out.length >= n) return out; } }
    return out;
  }
  /** the lessons of one deck in learning order */
  function deckLessons(D, dk, I) {
    if (dk.kind === 'lesson') return [dk.id];
    const subj = dk.kind === 'subject' ? dk.id : dk.kind === 'topic' ? D.nodes[dk.id].subject : null;
    const ids = orderOf(D, I, subj);
    return dk.kind === 'topic' ? ids.filter(id => D.lessonById[id] && D.lessonById[id].topic === dk.id) : ids;
  }
  const lessonTitle = (D, id) => (D.lessonById[id] ? D.lessonById[id].title : id);
  /** the final fortnight's daily review limit (P2-37, D8): {on, limit, used, left, minutes}. `on` only in the final season (2–14 days to the
      exam): there the cap pulls cards back every few days, so 'Review N due' takes at most SRS.reviewLimit(daily minutes) reviews a day.
      The rule is SRS.dayShare, which the planner's card row, the shared next step and the palette read too (one count everywhere). */
  function limitOf(state, today, season) {
    const sh = SRS.dayShare(state, 0, today, season);
    return { on: sh.on, limit: sh.limit, used: sh.used, left: sh.left, minutes: sh.minutes };
  }
  /** the limit in words for the 'That's today's reviews' line: 'up to 60 cards a day, half of your 60 minutes' (SRS.limitWords) */
  const limitLine = L => { const w = SRS.limitWords(L && L.minutes); return `In the final stretch you review up to ${U.plural(w.n, 'card')} a day, ${w.time}.`; };
  /** Today's bounded card round is done (P2-68 with P1-61, D20): SRS.roundDone, the rule core/srs.js keeps for every screen that offers the
      round. From the final fortnight on a Quick 20 (exam day: the 10-card warm-up) is one round a day; once the cards you reviewed today
      (new cards do not count) reach its size, the hub, an empty screen and the finish card hand the coral back to the plan. */
  function roundDone(state, today, season) {
    if (typeof SRS.roundDone === 'function') return SRS.roundDone(state, today, season);
    if (season !== 'final' && season !== 'eve' && season !== 'day') return false;
    return SRS.reviewsOn(state && state.cards, today) >= (season === 'day' ? WARM_N : QUICK_N);
  }
  /** the final fortnight's order (P2-37): the cards you know least first and the ones you know well (mature) after all the others, so they are
      the ones that wait when the day's limit is reached ('mature cards may skip a review in the last 14 days') */
  const weakFirst = (S, str) => (a, b) => (SRS.isMature(S[a]) ? 1 : 0) - (SRS.isMature(S[b]) ? 1 : 0) || str[a] - str[b] || SRS.byUrgency(S[a], S[b]);

  /** The session a link opens (§10.4): {kind: 'due' | 'deck' | 'new' | 'quick' | 'warm' | 'more' | 'missing', ids, title, sub, due, dueAll,
      over, fresh, left, cap, limit, season, empty: null | 'nothing-due' | 'limit' | 'cap' | 'no-new' | 'none-seen' | 'deck-done',
      nextDue: {day, n} | null}. dueAll = every due card of the deck; over = due cards past the final fortnight's limit (they stay due). */
  function queueFor(state, D, today, o) {
    o = o || {};
    const deck = o.deck || 'all', mode = MODES.indexOf(o.mode) >= 0 ? o.mode : '', dk = deckOf(D, deck);
    if (!dk) return { kind: 'missing', ids: [], deck, mode, title: 'No such deck', sub: '', empty: 'missing' };
    const cap = dayCap(state), left = Math.max(0, cap - newToday(state, today));
    const S = state.cards, seen = dk.cards.filter(c => SRS.isSeen(S[c.id])).map(c => c.id);
    // the one due definition (P2-74): seen and s.due <= today (SRS.isDueSeen, as GA.stats.due counts them)
    const dueIds = seen.filter(id => SRS.isDueSeen(S[id], today)).sort((a, b) => SRS.byUrgency(S[a], S[b]));
    const strength = {}; seen.forEach(id => (strength[id] = SRS.strength(S[id], today)));
    const later = seen.filter(id => S[id].due > today).map(id => S[id].due).sort();
    const nextDue = later.length ? { day: later[0], n: later.filter(d => d === later[0]).length } : null;
    const nameOf = dk.kind === 'all' ? '' : dk.name;
    const season = o.season || seasonOf(state, D, today), lim = limitOf(state, today, season);
    const base = { deck, mode, cap, left, nextDue, deckName: dk.name, deckKind: dk.kind, season, limit: lim, dueAll: dueIds.length, over: 0 };
    if (mode === 'more') {
      // 'Review 20 more' (P2-37): the next due cards past the day's limit, the ones you know least first in the final fortnight
      const ids = (lim.on ? dueIds.slice().sort(weakFirst(S, strength)) : dueIds).slice(0, QUICK_N);
      return Object.assign(base, { kind: 'more', ids, due: ids.length, fresh: 0, title: 'More due cards' + (nameOf ? ' · ' + nameOf : ''),
        sub: ids.length ? `${U.nf(ids.length)} of ${U.plural(dueIds.length, 'due card')} · about ${U.nf(minutesFor(ids.length))} min` : '', empty: ids.length ? null : 'nothing-due' });
    }
    if (mode === 'quick') {
      const weak = (a, b) => strength[a] - strength[b] || SRS.byUrgency(S[a], S[b]);
      const ids = dueIds.slice().sort(weak).concat(seen.filter(id => S[id].due > today).sort(weak)).slice(0, QUICK_N);
      return Object.assign(base, { kind: 'quick', ids, due: Math.min(ids.length, dueIds.length), title: 'Quick 20' + (nameOf ? ' · ' + nameOf : ''),
        sub: dueIds.length ? 'your shakiest due cards first, then the ones you know least' : 'the cards you know least', empty: ids.length ? null : 'none-seen' });
    }
    if (mode === 'warm') {
      const ids = seen.slice().sort((a, b) => strength[b] - strength[a] || (S[b].ivl - S[a].ivl)).slice(0, WARM_N);
      return Object.assign(base, { kind: 'warm', ids, due: 0, title: 'Warm up' + (nameOf ? ' · ' + nameOf : ''), sub: U.plural(ids.length, 'card') + ' you know well', empty: ids.length ? null : 'none-seen' });
    }
    if (mode === 'new') {
      const n = Math.min(NEW_BATCH, left);
      let lessons;
      if (dk.kind === 'all') { const P = newPool(state, D, today, o.I); lessons = P.finished.concat(P.opened, P.planned); }
      else lessons = deckLessons(D, dk, o.I);
      const ids = newFrom(state, D, lessons, n), from = U.uniq(ids.map(id => D.cards.find(c => c.id === id).lesson));
      const anyNew = dk.cards.some(c => !SRS.isSeen(S[c.id]));
      return Object.assign(base, { kind: 'new', ids, due: 0, fresh: ids.length, from, title: dk.kind === 'all' ? 'New from your lessons' : nameOf,
        sub: ids.length ? `${U.plural(ids.length, 'new card')} from ${lessonTitle(D, from[0])}${from.length > 1 ? ` and ${U.plural(from.length - 1, 'more lesson')}` : ''}` : '',
        empty: ids.length ? null : left <= 0 ? 'cap' : anyNew ? 'no-new' : 'no-new' });
    }
    if (dk.kind === 'all') {
      // due cards only (§10.4, P1-41). The wave-1 transition that served 'Learn 10 new' here when nothing was due is gone now that every reader
      // (the self-test included) opens new cards with ?mode=new; an empty round says so and its coral is 'Learn 10 new from your lessons'
      // the final fortnight (P2-37): today's share (SRS.dayShare, the count the plan and the shared step name), the cards you know least
      // first; the rest stay due for tomorrow
      const sh = SRS.dayShare(state, dueIds.length, today, season);
      const ids = sh.on ? dueIds.slice().sort(weakFirst(S, strength)).slice(0, sh.today) : dueIds, over = dueIds.length - ids.length;
      const mins = `about ${U.nf(minutesFor(ids.length))} min`;
      return Object.assign(base, { kind: 'due', ids, due: ids.length, over, fresh: 0, title: 'Due today',
        sub: !ids.length ? '' : over ? `${U.nf(ids.length)} of ${U.nf(dueIds.length)} due today, the ones you know least first · ${mins}` : `${U.plural(ids.length, 'card')} · ${mins}`,
        empty: ids.length ? null : dueIds.length ? 'limit' : 'nothing-due' });
    }
    // one deck: its due cards, then its new cards within the daily cap
    const fresh = newFrom(state, D, deckLessons(D, dk, o.I), left);
    const ids = dueIds.concat(fresh), anyNew = dk.cards.some(c => !SRS.isSeen(S[c.id]));
    return Object.assign(base, { kind: 'deck', ids, due: dueIds.length, fresh: fresh.length, title: dk.name,
      sub: [dueIds.length ? `${U.nf(dueIds.length)} due` : '', fresh.length ? `${U.nf(fresh.length)} new` : ''].filter(Boolean).join(' · '),
      empty: ids.length ? null : anyNew && left <= 0 ? 'cap' : 'deck-done' });
  }
  /** the href of a session: '#/flash/<deck>' plus its mode */
  const sessionHref = (deck, mode) => '#/flash/' + encodeURIComponent(deck || 'all') + (MODES.indexOf(mode) >= 0 ? '?mode=' + mode : '');

  /** the due count of every card through GA.stats.due, the one definition the chip, the badges, the planner and the strip read (P2-74) */
  function dueCount(state, D, today, fallback) {
    const ST = GA.stats;
    if (ST && typeof ST.due === 'function') { try { const d = ST.due(state, D, today); if (d && typeof d.cards === 'number') return d.cards; } catch (e) { /* fall through */ } }
    return fallback;
  }
  /** The hub (/flash): numbers, the season's coral and the neutral second action (P1-41, P1-61, P2-37). coral null = nothing to do here: the
      view puts the plan's next task or the shared next step on the coral (D18) and shows `done` ({title, text, change}) beside it.
      head = [[number, words]] for the header line ('48 due · 30 today · 40 of 2,901 learned'); newLine = 'cap' | 'count' | 'upto' | null, the
      new-card line under the coral, shown only where new cards are offered (never on the eve or exam day, P1-61). */
  function hubModel(state, D, today, o) {
    o = o || {};
    const season = o.season || seasonOf(state, D, today), E = o.exam || examOf(state, D, today);
    const all = counts(state, D.cards, today), cap = dayCap(state), nt = newToday(state, today), left = Math.max(0, cap - nt);
    all.due = dueCount(state, D, today, all.due);
    const reviewedToday = ((state.act || {})[today] || {}).c || 0;
    const seen = all.learned > 0, lim = limitOf(state, today, season);
    // today's share of the due cards (P2-37): SRS.dayShare, the one count the plan's card row, the shared step and the palette name too
    const share = SRS.dayShare(state, all.due, today, season), todayN = share.today, over = share.over;
    const learnQ = all.nw > 0 && left > 0 && season !== 'eve' && season !== 'day' ? queueFor(state, D, today, { deck: 'all', mode: 'new', I: o.I, season }) : null;
    const learn = learnQ && learnQ.ids.length ? { kind: 'new', label: `Learn ${U.nf(learnQ.ids.length)} new from your lessons`, sub: 'from ' + lessonTitle(D, learnQ.from[0]), href: sessionHref('all', 'new') } : null;
    const mins = n => `about ${U.nf(minutesFor(n))} min`;
    const review = todayN ? { kind: 'due', label: `Review ${U.nf(todayN)} due`, sub: over ? `${U.nf(todayN)} of ${U.nf(all.due)} today · ${mins(todayN)}` : mins(todayN), href: sessionHref('all') } : null;
    const more = lim.on && !todayN && all.due ? { kind: 'more', label: `Review ${U.nf(Math.min(QUICK_N, all.due))} more`, href: sessionHref('all', 'more') } : null;
    const quick = seen ? { kind: 'quick', label: 'Quick 20: cards you know least', sub: 'about 10 min', href: sessionHref('all', 'quick') } : null;
    // one bounded round a day from the final fortnight on (P2-68): once it is done the coral goes back to the plan (the view's next step)
    const rd = roundDone(state, today, season), reviewsNow = SRS.reviewsOn(state.cards, today);
    let coral = null, secondary = null;
    if (season === 'day') coral = seen && !rd ? { kind: 'warm', label: 'Warm up: 10 cards you know', sub: 'optional · about 5 min', href: sessionHref('all', 'warm') } : null;
    else if (season === 'eve') coral = seen && !rd ? { kind: 'quick', label: 'Quick 20: your shakiest due cards', sub: 'about 10 min', href: sessionHref('all', 'quick') } : null;
    else if (season === 'final') {
      coral = review || (all.due || rd ? null : quick);
      secondary = more || learn || (rd && quick && !all.due ? { kind: 'quick', label: 'Another Quick 20', href: quick.href } : null);
    }
    else { coral = review || learn; secondary = review ? learn : null; }
    // the next day a studied card comes back, for 'Nothing due today. 9 cards come back on Thursday.'
    const later = []; for (const c of D.cards) { const st = state.cards[c.id]; if (SRS.isSeen(st) && st.due > today) later.push(st.due); }
    later.sort();
    const nextDue = later.length ? { day: later[0], n: later.filter(d => d === later[0]).length } : null;
    const back = comesBack(nextDue, today);
    let done = null;
    if (!coral) {
      if (more) done = { title: "That's today's reviews.", text: `${U.nf(all.due)} more ${all.due === 1 ? 'is' : 'are'} due and wait for tomorrow, the ones you know least first. ${limitLine(lim)}`, change: '#/plan?set=exam' };
      else if (rd && season === 'day') done = { title: 'Warm-up done.', text: 'Good luck today.' };
      else if (rd && season === 'eve') done = { title: "That's today's cards.", text: all.due ? `The other ${U.plural(all.due, 'due card')} can wait until after ${(E && ((E.paper && E.paper.name) || E.label)) || 'the exam'}.` : 'Nothing else is due.' };
      else if (rd && season === 'final') done = { title: 'Nothing due today.', text: [`${U.plural(reviewsNow, 'card')} reviewed today.`, back].filter(Boolean).join(' ') };
      else if (all.nw && left <= 0 && season !== 'eve' && season !== 'day') done = { title: "That's today's new cards.", text: ['Nothing is due either, so you are done here for today.', back].filter(Boolean).join(' ') };
      else if (all.nw) done = { title: 'Nothing due today.', text: [back, season === 'final' ? 'New cards are optional in the final stretch.' : ''].filter(Boolean).join(' ') || 'Reviews come back on their own schedule.' };
      else done = { title: 'All caught up.', text: ['Nothing is due and every card is started.', back].filter(Boolean).join(' ') };
    }
    const head = !seen && !reviewedToday ? null
      : lim.on && over && todayN ? [[all.due, 'due'], [todayN, 'today'], [all.learned, `of ${U.nf(all.total)} learned`]]
      : lim.on && more ? [[all.due, "due · today's reviews done"], [all.learned, `of ${U.nf(all.total)} learned`]]
      : [[all.due, 'due today'], [all.learned, `of ${U.nf(all.total)} learned`]];
    const offersNew = season === 'normal' || season === 'between' || season === 'done' || (season === 'final' && !!learn && secondary === learn);
    const newLine = !all.nw || !offersNew ? null : left <= 0 ? 'cap' : nt ? 'count' : 'upto';
    const dueSubjects = D.subjects.map(s => ({ s, n: counts(state, D.cards.filter(c => c.subject === s.id), today).due })).filter(x => x.n);
    return { season, exam: E, all, cap, newToday: nt, left, reviewedToday, coral, secondary, capNote: capNote(E), fresh: !seen && !reviewedToday, limit: lim,
             today: todayN, over, nextDue, done, head, newLine,
             dueIn: dueSubjects.length === 1 ? `${U.nf(dueSubjects[0].n)} due in ${dueSubjects[0].s.name}` : dueSubjects.length ? `${U.nf(all.due)} due in ${U.plural(dueSubjects.length, 'subject')}` : '' };
  }
  /** a deck's one-line numbers: 'not started', '40 learned · 7 due', 'all 8 learned' */
  function deckLine(st) {
    if (!st.learned) return 'not started';
    const parts = [st.learned === st.total ? `all ${U.nf(st.total)} learned` : `${U.nf(st.learned)} learned`];
    if (st.due) parts.push(`${U.nf(st.due)} due`);
    return parts.join(' · ');
  }

  /** The finish card (P1-41, P2-70): per unique card its outcome (relearned when it got an Again in this session), XP from GA.engage.xpFor
      summed before each review, the streak after it, and how many come back tomorrow: '+11 XP · today counts (streak 24) · 7 of these come back
      tomorrow'. reviews = [{id, g, xp}] in order; state = the state after the session; o.quip = the weekday line is still free today (it is
      shown once a day, and only when Good plus Easy are at least half of the cards). */
  function finishModel(reviews, state, today, streak, o) {
    o = o || {};
    const by = {}, order = [];
    for (const r of reviews) { if (!by[r.id]) { by[r.id] = { again: false, last: null }; order.push(r.id); } if (r.g === 0) by[r.id].again = true; by[r.id].last = r.g; }
    const tally = { relearned: 0, hard: 0, good: 0, easy: 0 };
    order.forEach(id => { const b = by[id]; if (b.again) tally.relearned++; else tally[['relearned', 'hard', 'good', 'easy'][b.last]]++; });
    const tomorrow = U.addDays(today, 1);
    const dues = order.map(id => state.cards[id] && state.cards[id].due).filter(Boolean);
    const back = dues.filter(d => d === tomorrow).length, later = dues.filter(d => d > today).sort()[0] || null;
    const xp = reviews.reduce((a, r) => a + (r.xp || 0), 0), n = order.length;
    const parts = [];
    if (xp > 0) parts.push(`+${U.nf(xp)} XP`);
    if (streak && streak.activeToday && streak.current > 0) parts.push(`today counts (streak ${U.nf(streak.current)})`);
    if (back) parts.push(back === n ? (n === 1 ? 'it comes back tomorrow' : `all ${U.nf(n)} come back tomorrow`) : `${U.nf(back)} of these ${back === 1 ? 'comes' : 'come'} back tomorrow`);
    else if (later) parts.push(`${n === 1 ? 'it comes' : 'the first comes'} back ${backOn(later, today)}`);
    const quip = o.quip && n > 0 && (tally.good + tally.easy) * 2 >= n ? QUIPS[U.parseDay(today).getDay()] : null;
    return { cards: n, reviews: reviews.length, tally, xp, back, later, line: parts.join(' · '), quip };
  }
  /** the finish card's weekday line is free today (P2-70, D19): once a day (state.seen.flashQuip), and never on the eve or exam day, which stay
      calm (D20) */
  const quipOn = (state, today, season) => season !== 'eve' && season !== 'day' && !(state && state.seen && state.seen.flashQuip === today);
  /** An empty session's actions by season (D18, P1-61): {coral: {kicker, title, minutes, href} | null, neutral: {label, href} | null}.
      coral null = the view takes the plan's next task or the shared next step. New cards are the coral only outside the final fortnight, a
      neutral link inside it, and never offered on the eve or exam day; the final fortnight's limit offers 'Review 20 more' (P2-37). Once
      today's Quick 20 or warm-up is done (roundDone), the round is no longer the coral: the plan's next task is (P2-68). */
  function emptyActions(state, D, today, Q, o) {
    o = o || {};
    const season = o.season || (Q && Q.season) || seasonOf(state, D, today), I = o.I;
    if (!Q || Q.empty === 'missing') return { coral: null, neutral: null };
    if (Q.empty === 'limit') return { coral: null, neutral: { label: `Review ${U.nf(Math.min(QUICK_N, Q.dueAll || 0))} more`, href: sessionHref('all', 'more') } };
    const learnQ = season !== 'eve' && season !== 'day' && Q.empty !== 'cap' ? queueFor(state, D, today, { deck: 'all', mode: 'new', I, season }) : null;
    const learn = learnQ && learnQ.ids.length ? { kicker: 'New cards', title: `Learn ${U.nf(learnQ.ids.length)} new from your lessons`, minutes: minutesFor(learnQ.ids.length), href: sessionHref('all', 'new') } : null;
    const round = (mode, kicker, title, minutes) => (Q.kind !== mode && queueFor(state, D, today, { deck: 'all', mode, I, season }).ids.length ? { kicker, title, minutes, href: sessionHref('all', mode) } : null);
    const rd = roundDone(state, today, season);
    if (season === 'final') {
      const q = round('quick', 'Quick 20', 'Cards you know least', 10);
      return { coral: rd ? null : q, neutral: learn ? { label: learn.title, href: learn.href } : rd && q ? { label: 'Another Quick 20', href: q.href } : null };
    }
    if (season === 'eve') return { coral: rd ? null : round('quick', 'Quick 20', 'Your shakiest due cards', 10), neutral: null };
    if (season === 'day') return { coral: rd ? null : round('warm', 'Warm up', '10 cards you know', 5), neutral: null };
    return { coral: learn, neutral: null };
  }
  /** The finish card's neutral second action (P2-68): another round of the same session while it still has cards, named by what it opens
      ('Review 3 due' for Again cards still due, 'Learn 10 new from your lessons' where '#/flash/all' now serves new cards, 'Another round' of a
      deck), or null. Never after Quick 20 or the warm-up (one bounded round each) and never on the eve or exam day; once the final
      fortnight's limit is reached while cards are still due, 'Review 20 more'. */
  function againOf(state, D, today, Q, o) {
    o = o || {};
    if (!Q || Q.kind === 'quick' || Q.kind === 'warm' || Q.kind === 'missing') return null;
    const season = o.season || seasonOf(state, D, today);
    if (season === 'eve' || season === 'day') return null;
    const next = queueFor(state, D, today, { deck: Q.deck, mode: Q.mode, I: o.I, season }), n = next.ids.length;
    if (n) {
      if (next.kind === 'more') return { label: `Review ${U.nf(n)} more`, href: sessionHref(Q.deck, 'more') };
      if (next.kind === 'due') return { label: `Review ${U.nf(n)} due`, href: sessionHref(Q.deck) };
      if (next.kind === 'new' && Q.deck === 'all') return { label: `Learn ${U.nf(n)} new from your lessons`, href: sessionHref('all', 'new') };
      return { label: 'Another round', href: sessionHref(Q.deck, Q.mode) };
    }
    if (next.empty === 'limit') return { label: `Review ${U.nf(Math.min(QUICK_N, next.dueAll))} more`, href: sessionHref('all', 'more') };
    // a due round with nothing left, outside the final fortnight: the new cards, asked for by name ('#/flash/all' itself is due-only, §10.4)
    if (Q.deck === 'all' && Q.kind === 'due' && season !== 'final') {
      const nq = queueFor(state, D, today, { deck: 'all', mode: 'new', I: o.I, season });
      if (nq.ids.length) return { label: `Learn ${U.nf(nq.ids.length)} new from your lessons`, href: sessionHref('all', 'new') };
    }
    return null;
  }
  /** A link the coral of a finished or empty flash screen must pass over (D18, P2-68): a flash round that would open nothing; a Quick 20 or
      warm-up once today's round is done (roundDone); the round just finished (o.done = its queue: the plan's still-open card row or the
      shared step would otherwise repeat it). Other links are never skipped. */
  function skipLink(state, D, today, h, o) {
    o = o || {};
    const p = parseSession(h);
    if (!p) return false;
    const season = o.season || seasonOf(state, D, today);
    const Q = queueFor(state, D, today, { deck: p.deck, mode: p.mode, I: o.I, season });
    if (!Q.ids.length) return true;
    if ((p.mode === 'quick' || p.mode === 'warm') && roundDone(state, today, season)) return true;
    const d = o.done;
    if (d && (d.kind === 'quick' || d.kind === 'warm') && p.deck === d.deck && p.mode === d.mode) return true;
    return false;
  }
  /** a session's document title, unique per deck (P2-12): 'Operating Systems flashcards', 'Flashcards due today', 'Quick 20 flashcards'.
      Q = the queue it opens: a queue of new cards is titled by what it serves, as its h1 is ('New from your lessons'). */
  function sessionTitle(dk, mode, Q) {
    if (!dk) return 'Not found';
    if (Q && Q.kind === 'new') mode = 'new';
    if (dk.kind === 'all') return { new: 'New flashcards from your lessons', quick: 'Quick 20 flashcards', warm: 'Warm-up flashcards', more: 'More due flashcards' }[mode] || 'Flashcards due today';
    return dk.name + ' flashcards';
  }
  /** The coral of a finished or empty screen (D18; P2-68 with P1-41): the day snapshot's next open task, named by the task ('Next: Finish Dynamic
      memory · 26 min'), else the shared next step. plan = GA.planner day snapshot, step = GA.stats.nextStep(kind 'any'); o.skip(href) is true for a
      link that would open an empty session (a flash round with nothing left), so the coral never leads to a dead end. */
  function nextCoral(plan, step, o) {
    o = o || {};
    const skip = h => !h || (typeof o.skip === 'function' && o.skip(h));
    const open = plan ? (Array.isArray(plan.tasks) ? plan.tasks.filter(t => t && !t.done) : plan.next ? [plan.next] : []) : [];
    const t = open.find(x => !skip(x.href));
    if (t) return { kicker: "Next in today's plan", title: t.title, minutes: t.minutes || null, href: t.href, from: 'plan' };
    if (step && !skip(step.href)) return { kicker: step.label, title: step.title, minutes: step.minutes || null, href: step.href, from: 'step' };
    return null;
  }
  /** The last real step when the plan and the shared step only point at card rounds that are empty or done now (D18): in the final fortnight,
      questions on the topic most likely to cost marks (the planner's final practice row, never a new topic); on the eve and exam day today's plan,
      whose card says what is left ('Light revision, then sleep'; 'Eat, reach the centre early…'), never 40 minutes of new practice; else a
      lesson to read. */
  function fallbackStep(state, D, today, season) {
    if (season === 'eve') return { kicker: 'Light revision, then sleep', title: "Open today's plan", minutes: null, href: '#/plan', from: 'fallback' };
    if (season === 'day') return { kicker: 'Exam day', title: "Open today's plan", minutes: null, href: '#/plan', from: 'fallback' };
    if (season === 'final') {
      let w = null;
      try { w = GA.stats && typeof GA.stats.weakTopics === 'function' ? (GA.stats.weakTopics(state, D, today, { limit: 1 }) || [])[0] : null; } catch (e) { w = null; }
      const P = GA.pyqLib;
      if (P && P.isEmpty && P.isEmpty(D)) {          // no ICAI bank yet: revise a lesson instead of practising questions that do not exist
        const st = P.emptyStep(state, D);
        return { kicker: 'Revise', title: st.label === 'Next lesson' && st.title ? st.title : 'Open a lesson', minutes: st.minutes || null, href: st.href, from: 'fallback' };
      }
      return w && w.id ? { kicker: 'Practice', title: `Practise ${w.name}: 10 questions`, minutes: 40, href: '#/pyq?topic=' + encodeURIComponent(w.id) + '&practise=10', from: 'fallback' }
        : { kicker: 'Practice', title: 'Practise 10 questions', minutes: 40, href: '#/pyq?practise=10', from: 'fallback' };
    }
    return { kicker: 'Learn', title: 'Open a lesson', minutes: null, href: '#/syllabus', from: 'fallback' };
  }
  /** the deck and mode of a flash session link, or null for any other link */
  function parseSession(h) {
    const m = /^#\/flash\/([^?#]+)(?:\?(?:.*&)?mode=(\w+))?/.exec(String(h || ''));
    return m ? { deck: decodeURIComponent(m[1]), mode: MODES.indexOf(m[2]) >= 0 ? m[2] : '' } : null;
  }

  const Lib = { NEW_BATCH, QUICK_N, WARM_N, DAY_CAP, MODES, QUIPS, deckOf, deckCards, examOf, seasonOf, capNow, previewFor, gapLabel, capNote, backOn, comesBack,
                spokenAnswer, plainOf, answerWords, minutesFor, dayCap, newToday, counts, realRead, newPool, newFrom, deckLessons, limitOf, queueFor, sessionHref, parseSession,
                dueCount, hubModel, deckLine, finishModel, quipOn, emptyActions, againOf, skipLink, roundDone, sessionTitle, nextCoral, fallbackStep };
  GA.flashLib = Lib;
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
  if (typeof document === 'undefined') return;

  /* ================================================================== the view (browser only) */
  const esc = U.esc, icon = GA.icon, UI = GA.ui, DATA = GA.data, MD = GA.md, C = GA.charts;
  const sIcon = id => (C && C.subj ? C.subj(id) : '');
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const insights = () => { try { return GA.insights && GA.insights.get ? GA.insights.get() : null; } catch (e) { return null; } };
  const say = (t, lvl) => { if (UI && typeof UI.say === 'function') UI.say(t, lvl); };
  const inView = out => { const a = document.activeElement; return !a || a === document.body || out.contains(a); };
  const focusOn = (el, out) => { if (el && inView(out)) try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } };
  const singleKeysOn = () => !(UI && typeof UI.singleKeys === 'function' && UI.singleKeys() === false);

  /** a two-line coral or neutral CTA: kicker + one small line */
  const cta = (c, cls) => `<a class="btn ${cls || ''} lg fl-cta" href="${esc(c.href)}"><span class="fl-cta-k">${esc(c.label)}</span>${c.sub ? `<small>${esc(c.sub)}</small>` : ''}</a>`;
  /** the real next step for a screen with nothing to do (D18): the plan's next open task, else the shared next step, passing over flash links
      that are empty, done for today or the round just finished (skipLink; done = the finished session's queue) */
  function nextStepCoral(S, D, done) {
    let plan = null, step = null;
    const I = insights() || undefined, today = U.today();
    try { plan = GA.planner && typeof GA.planner.current === 'function' ? GA.planner.current() : null; } catch (e) { plan = null; }
    try { step = GA.stats && typeof GA.stats.nextStep === 'function' ? GA.stats.nextStep(S.state, D, { kind: 'any', I }) : null; } catch (e) { step = null; }
    return nextCoral(plan, step, { skip: h => skipLink(S.state, D, today, h, { I, done }) });
  }
  /** a next-step coral in the app's two-line form (as on /plan and /progress): a small kicker with the minutes, then what it opens */
  const coralHtml = n => `<a class="btn pop lg hb-go" href="${esc(n.href)}"><span><small>${esc(n.kicker)}${n.minutes ? ' · ' + esc(U.nf(Math.round(n.minutes)) + ' min') : ''}</small>${esc(n.title || n.kicker)}</span>${icon('arrow-r')}</a>`;

  GA.views.flash = {
    async enter(ctx, out) {
      const D = DATA.D, S = GA.store, today = U.today(), deck = ctx.params.deck, mode = MODES.indexOf(ctx.query.mode) >= 0 ? ctx.query.mode : '';
      const dk = deck ? deckOf(D, deck) : null;
      if (!deck) { GA.shell.crumbs([['Flashcards', '#/flash']]); return hub(out, D, S, today); }
      await session(ctx, out, D, S, today, deck, mode, dk);
    },
    leave() { if (GA.views.flash._k) document.removeEventListener('keydown', GA.views.flash._k); GA.views.flash._k = null; }
  };

  /* ------------------------------------------------------------------ the hub */
  function hub(out, D, S, today) {
    const I = insights(), st = S.state;
    const M = hubModel(st, D, today, { I: I || undefined });
    const lessonsWith = D.lessons.filter(l => (cardsByLesson(D)[l.id] || []).length);
    const quietSeason = M.season === 'eve' || M.season === 'day' || M.season === 'final';
    // the coral: the season's session, else the real next step (D18)
    const nx = M.coral ? null : nextStepCoral(S, D) || fallbackStep(st, D, today, M.season);
    const coral = M.coral ? cta(M.coral, 'pop') : coralHtml(nx);
    const second = M.secondary ? `<a class="btn ghost fl-new" href="${esc(M.secondary.href)}">${icon(M.secondary.kind === 'new' ? 'plus' : 'refresh')}<span>${esc(M.secondary.label)}</span></a>` : '';
    const assumed = M.exam && M.exam.basis === 'assumed' && M.exam.date ? ` <a class="link fl-set" href="#/plan?set=exam">${esc(cap1(M.exam.label))} date assumed · Set it</a>` : '';
    const head = !M.all.total ? 'No cards yet: each lesson brings its own, and they appear here as lessons are published.'
      : M.fresh || !M.head
      ? `<b>${U.nf(M.all.total)}</b> ${M.all.total === 1 ? 'card' : 'cards'} waiting, from ${U.plural(lessonsWith.length, 'lesson')}. ${esc(M.capNote)}${assumed}`
      : `${M.head.map(([n, w]) => `<b>${U.nf(n)}</b> ${esc(w)}`).join(' · ')}. ${esc(M.capNote)}${assumed}`;
    // the review card: a first-run card, or the number strip (big numerals stay: the approved bold layer) + the coral
    const capLine = M.newLine === 'cap' ? `<span class="pr-sub">${U.plural(M.cap, 'new card')} today, your daily limit · <a class="link" href="#/settings">change it</a></span>`
      : M.newLine === 'count' ? `<span class="pr-sub">${U.nf(M.newToday)} of ${U.plural(M.cap, 'new card')} today</span>`
      : M.newLine === 'upto' ? `<span class="pr-sub">Up to ${U.plural(M.cap, 'new card')} a day</span>` : '';
    const doneMsg = M.done ? `<div class="fl-dm"><b>${esc(M.done.title)}</b><span>${esc(M.done.text)}${M.done.change ? ` <a class="link" href="${esc(M.done.change)}">Change your daily time</a>` : ''}</span></div>` : '';
    const calmTxt = { final: ['The final stretch is for revision', 'You have not studied any flashcards yet. New cards are optional now: the plan\'s revision comes first.'],
      eve: [`${cap1((M.exam && ((M.exam.paper && M.exam.paper.name) || M.exam.label)) || 'the exam')} is tomorrow.`, 'No flashcards to warm up with: light revision, then sleep.'], day: ["It's exam day.", 'Nothing to study today. Good luck.'] }[M.season]
      || ['New cards are off', `New flashcards a day is set to ${U.nf(M.cap)} in Settings.`];
    const tiles = [[M.all.due, 'due now'], quietSeason ? null : [M.newToday, `new today (of ${U.nf(M.cap)})`], [M.reviewedToday, 'reviewed today'], [M.all.mature, 'learned well (21+ days)']].filter(Boolean);
    const review = !M.all.total ? `<div class="pr-empty">${UI.empty('cards', 'No flashcards yet', 'Cards come from the "Flashcards" section of each lesson. As lessons are published, their cards appear here.', `<a class="btn pop" href="#/syllabus">Open a lesson</a>`)}</div>`
      : M.fresh && M.coral && M.coral.kind === 'new' ? `<section class="fl-today fl-first" aria-label="Start"><div class="fl-ft"><b>Start with ${esc(M.coral.label.replace(/^Learn /, '').replace(/ from your lessons$/, ''))} cards</b><span>New cards come from your lessons, in the order you learn them, up to ${U.plural(M.cap, 'new card')} a day. Grade each one honestly and the schedule does the rest: what you know comes back later, what you missed comes back soon.</span></div>
          <div class="fl-go">${coral}${capLine}</div></section>`
      : M.fresh ? `<section class="fl-today fl-first" aria-label="Today"><div class="fl-ft"><b>${esc(calmTxt[0])}</b><span>${esc(calmTxt[1])}</span></div><div class="fl-go">${coral}${second}</div></section>`
      : `<section class="fl-today" aria-label="Today"><div class="fl-strip" style="--n:${tiles.length}">${tiles.map(([v, l]) => `<div><b class="num">${U.nf(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>
          <div class="fl-go">${doneMsg}${coral}${second}${capLine}</div></section>`;
    // your lessons' decks: the lessons you opened most recently that have cards (up to 6)
    const recent = Object.entries(st.lessons || {}).filter(([id, r]) => r && D.lessonById[id] && (cardsByLesson(D)[id] || []).length).sort((a, b) => (b[1].last || 0) - (a[1].last || 0)).slice(0, 6).map(([id]) => id);
    const subj = D.subjects.map(s => ({ s, st: counts(st, D.cards.filter(c => c.subject === s.id), today) })).filter(x => x.st.total);
    const deckCard = (href, ic, name, c, sub) => `<a class="deck${c.learned ? '' : ' ns'}" href="${href}"><div class="dk-h"><span class="dk-ic">${ic}</span><span class="dk-n"><b>${esc(name)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span>${c.due ? `<span class="dk-due">${U.nf(c.due)} due</span>` : ''}</div><div class="dk-s"><span><b>${U.nf(c.total)}</b> ${c.total === 1 ? 'card' : 'cards'}</span><span>${esc(deckLine(c))}</span></div>${UI.bar(c.total ? c.learned / c.total : 0, 'thin')}</a>`;
    out.innerHTML = `<div class="fl pr-page"><header class="pr-head"><div class="pr-ht"><h1>Flashcards</h1><p>${head}</p></div></header>
      ${review}
      ${recent.length ? `<section aria-labelledby="fl-h-r"><div class="pr-sec-h"><div><h2 id="fl-h-r">Your lessons' decks</h2><p>The lessons you opened most recently</p></div></div><div class="decks">${recent.map(id => { const l = D.lessonById[id], c = counts(st, cardsByLesson(D)[id], today); return deckCard('#/flash/' + encodeURIComponent(id), sIcon(l.subject) || esc(D.subjectById[l.subject].short), l.title, c, D.subjectById[l.subject].short); }).join('')}</div></section>` : ''}
      ${subj.length ? `<section aria-labelledby="fl-h-d"><div class="pr-sec-h"><div><h2 id="fl-h-d">Subject decks</h2><p>${esc(M.dueIn || 'One per subject')}</p></div></div><div class="decks">${subj.map(({ s, st: c }) => deckCard('#/flash/' + s.id, sIcon(s.id) || esc(s.short), s.name, c, '')).join('')}</div></section>` : ''}
      ${lessonsWith.length ? `<section aria-labelledby="fl-h-l"><details class="pr-panel fl-les" id="fl-les"><summary><div><h2 id="fl-h-l">All ${U.nf(lessonsWith.length)} lesson decks</h2><p>Study one lesson's cards: its due cards, then its new ones</p></div><svg class="i pqr-chev" aria-hidden="true"><use href="#i-chev-d"/></svg></summary><div class="fl-lw"></div></details></section>` : ''}</div>`;
    // the 334 lesson rows are drawn when the fold first opens, then filtered in place
    const fold = U.$('#fl-les', out);
    if (fold) fold.addEventListener('toggle', () => { if (fold.open && !fold.dataset.drawn) { fold.dataset.drawn = '1'; drawLessons(U.$('.fl-lw', fold), D, st, today, I); } });
  }
  function drawLessons(box, D, st, today, I) {
    const by = cardsByLesson(D);
    const rows = D.subjects.map(s => {
      const ids = orderOf(D, I, s.id).filter(id => (by[id] || []).length);
      if (!ids.length) return '';
      return `<div class="fl-lg" data-g="${s.id}"><h3>${sIcon(s.id)}<span>${esc(s.name)}</span></h3><ul>${ids.map(id => { const l = D.lessonById[id], c = counts(st, by[id], today);
        return `<li data-k="${esc((l.title + ' ' + s.name + ' ' + s.short).toLowerCase())}"><a class="fl-lr" href="#/flash/${encodeURIComponent(id)}"><span class="fl-lt">${esc(l.title)}</span><span class="fl-lm">${c.due ? `<b class="dk-due">${U.nf(c.due)} due</b>` : ''}<span>${esc(c.learned ? `${U.nf(c.learned)} of ${U.nf(c.total)} learned` : `${U.nf(c.total)} cards · not started`)}</span></span></a></li>`; }).join('')}</ul></div>`;
    }).join('');
    box.innerHTML = `<label class="fl-find"><span class="sr">Find a lesson deck</span><svg class="i" aria-hidden="true"><use href="#i-search"/></svg><input class="input" type="search" placeholder="Find a lesson deck" autocomplete="off" spellcheck="false"></label><div class="fl-ll">${rows}</div><p class="fl-none muted" hidden>No lesson deck matches.</p>`;
    const inp = U.$('input', box), none = U.$('.fl-none', box);
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase(); let any = false;
      U.$$('.fl-lg', box).forEach(gr => { let n = 0; U.$$('li', gr).forEach(li => { const on = !q || li.dataset.k.indexOf(q) >= 0; li.hidden = !on; if (on) n++; }); gr.hidden = !n; if (n) any = true; });
      none.hidden = any;
    });
  }

  /* ------------------------------------------------------------------ a session */
  async function session(ctx, out, D, S, today, deck, mode, dk) {
    GA.shell.crumbs([['Flashcards', '#/flash'], [dk ? Q0title(D, dk, mode) : 'Not found', sessionHref(deck, mode)]]);
    if (!dk) {
      // P3-31: the shared not-found card when the shell has it; until then the shell's own 404 card, with 'All decks' as the coral
      if (GA.shell && typeof GA.shell.notFound === 'function') { GA.shell.notFound({ kind: 'deck', id: deck, back: { href: '#/flash', label: 'All decks' } }); return; }
      const pk = GA.mascot && GA.mascot.svg ? GA.mascot.svg({ size: 104, gaze: 'down', mood: 'think' }) : '';
      out.innerHTML = `<section class="nf card" aria-labelledby="nf-h"><div class="nf-m">${pk}</div><h1 id="nf-h">Deck not found</h1>
        <p>No subject, topic or lesson has the id <code>${esc(deck)}</code>. The link may be from an older version of the app, or mistyped.</p>
        <div class="nf-a"><a class="btn pop" href="#/flash">${icon('cards')}<span>All decks</span></a></div></section>`;
      return;
    }
    const I = insights() || undefined;
    const Q = queueFor(S.state, D, today, { deck, mode, I });
    GA.shell.crumbs([['Flashcards', '#/flash'], [Q.title || dk.name, sessionHref(deck, mode)]]);
    document.title = sessionTitle(dk, mode, Q) + ' · PassBook';     // unique per deck and named by what it serves (P2-12); the router announces it
    // a mode is acted on once: the address drops it, so Back or a reload does not start another round (§10.4); not before the cards loaded,
    // so 'Try again' after a failed load retries the same session
    const dropMode = () => { if (mode) try { history.replaceState(history.state, '', location.href.split('#')[0] + sessionHref(deck)); } catch (e) { /* file:// quirks */ } };
    const here = sessionHref(deck, mode);
    if (!Q.ids.length) { dropMode(); return emptySession(out, D, S, Q, here); }
    const text = {};
    try {
      const subjects = U.uniq(Q.ids.map(id => (D.cards.find(c => c.id === id) || {}).subject).filter(Boolean));
      (await Promise.all(subjects.map(s => DATA.cardsOf(s)))).forEach(list => (list || []).forEach(c => { if (c && c.id) text[c.id] = c; }));
    } catch (e) {
      if (ctx.stale()) return;
      if (UI && typeof UI.loadFailed === 'function') UI.loadFailed(out, { what: 'cards', main: true });
      else out.innerHTML = `<div class="pr-page"><div class="pr-empty">${UI.empty('alert', 'These flashcards did not load', 'Try again.', '<button class="btn pop" type="button" onclick="GA.router.resolve()">Try again</button>')}</div></div>`;
      return;
    }
    if (ctx.stale()) return;
    const missing = Q.ids.filter(id => !text[id]);
    if (missing.length) { if (UI && typeof UI.loadFailed === 'function') UI.loadFailed(out, { what: 'cards', main: true }); return; }   // never a silent 'All caught up' (P1-59)
    dropMode();
    run(out, D, S, today, Q, text, here);
  }

  const Q0title = (D, dk, mode) => (dk.kind === 'all' ? ({ new: 'New from your lessons', quick: 'Quick 20', warm: 'Warm up', more: 'More due cards' })[mode] || 'Due today' : dk.name);
  function emptySession(out, D, S, Q, here) {
    const today = U.today(), back = comesBack(Q.nextDue, today), L = Q.limit || {};
    const msg = {
      'nothing-due': ['Nothing due today', back || 'Reviews come back on their own schedule.'],
      'limit': ["That's today's reviews", `${U.nf(Q.dueAll)} more ${Q.dueAll === 1 ? 'is' : 'are'} due and wait for tomorrow, the ones you know least first. ${limitLine(L)}`],
      'cap': ["That's today's new cards", `You started ${U.plural(Q.cap, 'new card')} today, your daily limit (Settings: New flashcards a day). ${back}`],
      'no-new': ['Every card here is started', `There are no new cards left in ${Q.deckKind === 'all' ? 'your lessons' : Q.deckName}. ${back}`],
      'none-seen': ['Review a few cards first', 'Quick rounds and warm-ups use cards you have already studied.'],
      'deck-done': [`All caught up in ${Q.deckName}`, `Every card is started and none is due. ${back}`]
    }[Q.empty] || ['Nothing to study here', ''];
    // the coral is a real next step by season (D18, P1-61): new cards outside the final fortnight, Quick 20 inside it, the warm-up on exam day,
    // else the plan's next task or the shared next step; 'Learn 10 new' is only a neutral link in the final fortnight
    const A = emptyActions(S.state, D, today, Q, { I: insights() || undefined });
    const nx = A.coral || nextStepCoral(S, D) || fallbackStep(S.state, D, today, Q.season);
    const btn = coralHtml(nx);
    const links = [A.neutral ? `<a class="link" href="${esc(A.neutral.href)}">${esc(A.neutral.label)}</a>` : '', '<a class="link" href="#/flash">All decks</a>'].filter(Boolean).join(' · ');
    out.innerHTML = `<div class="fsess pr-page"><div class="fs-top"><a class="btn sm ghost" href="#/flash">${icon('arrow-l')}<span>Decks</span></a><div class="fs-prog"><div class="fs-pt"><h1 class="fs-h1">${esc(Q.title)}</h1></div></div></div>
      <div class="fs-card fs-flat"><div class="fs-face fs-front"><div class="fs-done">${UI.empty('cards', esc(msg[0]), esc(msg[1].trim()), '', { peak: { mood: 'happy', gaze: 'down' } })}</div></div></div>
      <div class="fs-btns one">${btn}</div>${links ? `<p class="fs-alt">${links}</p>` : ''}</div>`;
  }

  function run(out, D, S, today, Q, text, here) {
    let queue = Q.ids.slice();
    const total = queue.length, reviews = [], redo = {};
    let shown = false, done = 0, finished = false;
    const metaOf = id => D.cards.find(x => x.id === id);
    out.innerHTML = `<div class="fsess pr-page"><div class="fs-top"><a class="btn sm ghost" href="#/flash">${icon('arrow-l')}<span>Decks</span></a><div class="fs-prog"><div class="fs-pt"><h1 class="fs-h1">${esc(Q.title)}</h1><span id="fc" aria-hidden="true"></span></div><div class="bar"><i id="fp" style="width:0"></i></div></div></div>
      ${Q.sub ? `<p class="fs-sub">${esc(Q.sub)}</p>` : ''}
      <div class="fs-scene"><div class="fs-card" id="fcard" role="group" aria-roledescription="flashcard"></div></div><div class="fs-btns" id="fb"></div>
      <p class="pr-keys fs-keys"><kbd>Space</kbd> show answer · <kbd>1</kbd>–<kbd>4</kbd> Again / Hard / Good / Easy · <kbd>Esc</kbd> leave</p></div>`;
    const cardEl = U.$('#fcard', out), btns = U.$('#fb', out);
    if (UI && UI.touch) { const kh = U.$('.fs-keys', out); if (kh) kh.hidden = true; }
    // P0-25: the entrance animation (.fs-in) is cleared the moment it ends and before the card turns: left filling on the preserve-3d card it
    // flattened the card, so its rotateY transition never ran and Show answer drew a mirrored front
    const settle = () => cardEl.classList.remove('fs-in');
    cardEl.addEventListener('animationend', e => { if (e.target === cardEl) settle(); });
    cardEl.addEventListener('animationcancel', e => { if (e.target === cardEl) settle(); });
    function render() {
      const left = queue.length, pos = done + 1;
      U.$('#fp', out).style.width = (100 * done / (done + left)) + '%';
      U.$('#fc', out).textContent = left ? `${U.nf(done)} done · ${U.nf(left)} left` : 'finished';
      if (!left) return finish();
      const id = queue[0], c = text[id], st = S.state.cards[id], meta = metaOf(id), les = D.lessonById[meta.lesson], sj = D.subjectById[meta.subject];
      shown = false;
      const metaH = `<div class="fs-meta"><span class="fs-sj">${sIcon(sj.id)}${esc(sj.short)}</span><i aria-hidden="true">·</i><a href="#/l/${encodeURIComponent(les.id)}">${esc(les.title)}</a>${!SRS.isSeen(st) ? '<span class="fs-new">new</span>' : ''}</div>`;
      settle();
      cardEl.classList.remove('flipped');
      cardEl.setAttribute('aria-label', `Card ${U.nf(pos)} of ${U.nf(done + left)}`);
      cardEl.innerHTML = `<div class="fs-face fs-front">${metaH}<div class="fs-q md">${MD.inline(c.front, { br: true })}</div><div class="fs-tap" aria-hidden="true">${icon('refresh')}<span>${UI && UI.touch ? 'Tap the card' : 'Click the card or press Space'} to see the answer</span></div></div>
        <div class="fs-face fs-back" aria-hidden="true" inert>${metaH}<div class="fs-qs md">${MD.inline(c.front, { br: true })}</div><div class="fs-a md" id="fa" hidden><span class="fs-ak">Answer</span>${MD.inline(c.back, { br: true })}</div></div>`;
      if (!calm()) { void cardEl.offsetWidth; cardEl.classList.add('fs-in'); }
      btns.className = 'fs-btns one';
      btns.innerHTML = `<button class="btn pop lg" id="show" type="button" data-focus aria-expanded="false" aria-controls="fa">Show answer</button>`;   // a real disclosure button (P2-22)
      focusOn(U.$('#show', btns), out);
    }
    function reveal() {
      if (shown || finished || !queue.length) return; shown = true;
      settle();
      U.$('#fa', out).hidden = false;
      cardEl.classList.add('flipped');
      const fr = U.$('.fs-front', cardEl), bk = U.$('.fs-back', cardEl);
      fr.setAttribute('aria-hidden', 'true'); fr.inert = true; bk.setAttribute('aria-hidden', 'false'); bk.inert = false;
      const pv = previewFor(S.state, D, queue[0], U.today());
      btns.className = 'fs-btns';
      btns.innerHTML = ['Again', 'Hard', 'Good', 'Easy'].map((n, i) => `<button type="button" class="fg fg${i}" data-g="${i}" aria-label="${n}: comes back ${pv[i] <= 0 ? 'in this session' : 'in ' + gapLabel(pv[i])}"><b>${n}</b><span>${gapLabel(pv[i])}</span><kbd aria-hidden="true">${i + 1}</kbd></button>`).join('');
      focusOn(U.$('[data-g="2"]', btns), out);
      // each formula said once, in words (P1-48, P0-18): the rendered answer through GA.md.textOf, else the card's Markdown as text
      say('Answer: ' + answerWords(U.$('#fa', out), text[queue[0]] ? text[queue[0]].back : ''));
    }
    function grade(gr) {
      // P0-02: only a shown card of a live queue can be graded (a finished session, a stale tap or key never logs a review)
      if (!shown || finished || !queue.length || !text[queue[0]]) return;
      const id = queue[0];
      const xp = GA.engage && typeof GA.engage.xpFor === 'function' ? GA.engage.xpFor(S.state, 'card', id) : 0;   // before the review is recorded
      if (GA.actions.reviewCard(id, gr) === null) { queue.shift(); done++; render(); return; }   // not a catalogue card: skip it, never stick
      queue.shift();
      reviews.push({ id, g: gr, xp });
      if (gr === 0 && (redo[id] = (redo[id] || 0) + 1) <= 3) queue.splice(Math.min(queue.length, 4), 0, id); else done++;
      if (GA.qcard && GA.qcard.fx && gr >= 2) GA.qcard.fx.buzz(10);
      render();
    }
    function finish() {
      finished = true; shown = false;
      settle();
      cardEl.classList.remove('flipped');
      const today2 = U.today();
      let streak = null;
      try { streak = GA.engage && typeof GA.engage.compute === 'function' ? GA.engage.compute(S.state, D, today2).streak : null; } catch (e) { streak = null; }
      const season2 = seasonOf(S.state, D, today2);
      const F = finishModel(reviews, S.state, today2, streak, { quip: quipOn(S.state, today2, season2) });
      if (F.quip && GA.actions && typeof GA.actions.setFlag === 'function') GA.actions.setFlag('flashQuip', today2);   // once a day (P2-70)
      const line = [F.quip, F.line].filter(Boolean).join(' ');
      const again = againOf(S.state, D, today2, Q, { I: insights() || undefined });
      const nx = nextStepCoral(S, D, Q) || fallbackStep(S.state, D, today2, season2);
      const t = F.tally;
      cardEl.removeAttribute('aria-label');
      cardEl.innerHTML = `<div class="fs-face fs-front fs-fin"><div class="fs-done"><div class="fs-say"></div><h2 tabindex="-1">Session complete</h2><p>${U.plural(F.cards, 'card')}${F.reviews > F.cards ? ` · ${U.plural(F.reviews, 'review')}` : ''}</p>
        <div class="fs-tally"><span class="bad">${t.relearned}<small>relearned</small></span><span class="warn">${t.hard}<small>Hard</small></span><span class="ok">${t.good}<small>Good</small></span><span class="acc">${t.easy}<small>Easy</small></span></div></div></div>`;
      const sayEl = U.$('.fs-say', cardEl);
      if (line && GA.mascot && typeof GA.mascot.say === 'function') GA.mascot.say(sayEl, line, { mood: 'happy', size: 64, side: 'left', gaze: 'down' });
      else if (line) sayEl.innerHTML = `<p class="fs-line">${esc(line)}</p>`;
      else sayEl.remove();
      btns.className = 'fs-btns fin';
      btns.innerHTML = coralHtml(nx) +
        `<div class="fs-more">${again ? `<button type="button" class="btn" data-again="${esc(again.href)}">${icon('refresh')}<span>${esc(again.label)}</span></button>` : ''}<a class="btn ghost" href="#/flash">All decks</a></div>`;
      U.$('#fp', out).style.width = '100%'; const kh = U.$('.fs-keys', out); if (kh) kh.hidden = true;
      if (GA.qcard && GA.qcard.fx) GA.qcard.fx.burst(U.$('.fs-done h2', cardEl));
      focusOn(U.$('.btn.pop', btns), out);
      say(['Session complete.', line].filter(Boolean).join(' '));
    }
    U.on(out, 'click', '#show', reveal);
    U.on(out, 'click', '[data-g]', (e, b) => grade(+b.dataset.g));
    U.on(out, 'click', '[data-again]', (e, b) => { const h = b.dataset.again || sessionHref(Q.deck, Q.mode); if (location.hash === h) GA.router.resolve(); else location.hash = h; });
    cardEl.addEventListener('click', e => { if (!e.target.closest('a, button')) reveal(); });
    const key = e => {
      if (!out.isConnected) return;                       // a view host from an earlier visit never answers keys
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (UI && UI.overlay && typeof UI.overlay.top === 'function' && UI.overlay.top()) return;   // a sheet or dialog is open
      if (e.key === 'Escape') { GA.router.go('/flash'); return; }
      if (!singleKeysOn()) return;                         // single-key shortcuts turned off in Settings (P3-17)
      if (e.key === ' ' || e.key === 'Enter') { if (e.target.closest && e.target.closest('a, button')) return; e.preventDefault(); reveal(); }
      else if (/^[1-4]$/.test(e.key)) grade(+e.key - 1);
    };
    document.addEventListener('keydown', key);
    GA.views.flash._k = key;
    render();
  }
})(typeof window !== 'undefined' ? window : globalThis);
