/* PassBook — My progress (/progress), owner WP6. Page plan (_audit/PROPOSAL.md §3 /progress): what to do now before the archive.
   Returning learner: 1. header + the coral = the shared next step (GA.stats.nextStep kind 'any': Continue, Resume test while one is live, the
   season's step) 2. KPI strip (lessons done; zero tiles become links) 3. Act now: Revision due + Fix these first + 'Open today's plan'
   4. Your habit (D10): streak · best · freezes · level bar · 12-week calendar · PassBook Wrapped once recap() is ready, the page's one solid cobalt
   surface 5. subject mastery in a stable marks order (untouched subjects folded) 6. test analytics 7. ICAI question-bank progress by year (from 20 answers; both hidden while the bank is empty).
   Fresh profile (GA.stats.hasProgress false: time on a page alone never counts, P0-22): one start card with Peak whose coral is the same
   step Home names (D1, P0-08; the diagnostic lives on Home and Tests, P1-56) and a note on what appears later.
   Every number comes from GA.stats / GA.engage on the learner's own state; nothing is decorative or invented. Styles: hubs.css (.pg-*, .hb-*).
   The page root is .hb.pg-page, never a bare 'pg' class: tests.css owns '.pg' (the exam palette's status glyphs), and a root named 'pg' took
   on their inline-grid, muted colour and outline. */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = n => GA.icon(n), C = GA.charts;
  GA.views = GA.views || {};
  const plural = (n, w, p) => `${U.nf(n)} ${n === 1 ? w : p || w + 's'}`;
  const glyph = id => (C && C.subj ? C.subj(id) : icon('book'));
  const pct = x => Math.round((x || 0) * 100) + '%';
  const medName = n => (U.medName ? U.medName(n) : String(n));

  /** the one "has this learner done anything on purpose" predicate (GA.stats.hasProgress, P0-22); never time alone */
  function hasProgress(s) {
    if (GA.stats.hasProgress) return GA.stats.hasProgress(s);
    if (GA.planner && GA.planner.hasProgress) return GA.planner.hasProgress(s);
    return !!(s.live || Object.keys(s.lessons).length || Object.keys(s.q).length || s.tests.length || Object.keys(s.cards).length || Object.keys(s.labs || {}).length);
  }
  /** the shared next step (P0-08); before WP4's nextStep: the next lesson in progress or in order */
  function nextStepOf(s, D, I) {
    if (!D.lessons.length) return { kind: 'syllabus', label: 'Lessons are being written', title: 'Open the syllabus', href: '#/syllabus', reason: '' };
    if (GA.stats.nextStep) { try { const n = GA.stats.nextStep(s, D, { kind: 'any', I: I || undefined }); if (n) return n; } catch (e) { /* fall back */ } }
    const id = GA.stats.nextLessons(s, D, 1).all[0], L = id && D.lessonById[id];
    if (!L) return D.questions.length ? Object.assign({ kind: 'mock', label: 'Take a full mock', title: 'A full-length mock', href: '#/test?new=mock', reason: '' }, GA.ui && GA.ui.fullStep ? GA.ui.fullStep(D) : {})
      : D.lessons.length ? { kind: 'cards', label: 'Flashcards', title: 'Review your flashcards', href: '#/flash', reason: '' }
        : { kind: 'syllabus', label: 'Lessons are being written', title: 'Open the syllabus', href: '#/syllabus', reason: '' };
    const going = !!(s.lessons[id] && s.lessons[id].visits);
    return { kind: 'lesson', label: going ? 'Continue' : 'Next up', title: L.title, id, subject: L.subject, minutes: L.minutes, reason: '', href: '#/l/' + id };
  }
  /** a two-line coral: kicker (label · subject · minutes, or the live test's state) above the target */
  function coral(ns, D, extra) {
    const sj = ns.subject && D.subjectById[ns.subject];
    const kicker = ns.kind === 'test' ? [ns.label, ns.reason].filter(Boolean).join(' · ') : [ns.label, sj ? medName(sj.name) : null, ns.minutes ? ns.minutes + ' min' : null].filter(Boolean).join(' · ');
    return `<a class="btn pop lg hb-go${extra ? ' ' + extra : ''}" href="${esc(ns.href)}"><span><small>${esc(kicker)}</small>${esc(ns.title || ns.label)}</span>${icon('arrow-r')}</a>`;
  }
  /** '80 days to Paper 4 (Fri 8 Jan)' from the shared exam date (P1-46; an assumed date says so · Set it) */
  function examLine(s, D, today) {
    const E = GA.planner && GA.planner.examOf ? GA.planner.examOf(s, D, today) : null;
    if (!E || !E.date) return E && E.label ? `${esc(E.label)} dates are not out yet · <a class="hb-link sm" href="#/plan?set=exam">Pick a target date</a>` : '';
    const n = E.daysLeft, lab = esc(E.paper && E.paper.name ? `${E.paper.name} (${U.fmtDay(E.date, { weekday: 'short', day: 'numeric', month: 'short' })})` : E.label);
    const main = n > 1 ? `<b>${U.nf(n)}</b> days to ${lab}` : esc(U.untilExam ? U.untilExam(E) : (n === 1 ? E.label + ' is tomorrow' : n === 0 ? E.label + ' is today' : E.label + ' was on ' + U.fmtDay(E.date)));
    if (n < 0) return main;
    const note = E.basis === 'assumed' ? ` <span class="hb-nw">(${!E.cycle || (E.cycle.days || [])[0] === E.date ? 'first' : 'next'} exam day, assumed · <a class="hb-link sm" href="#/plan?set=exam">Set it</a>)</span>` : '';
    return main + note;
  }

  /** after the exam (P2-72, the 'done' season): one line with the season's real counts, from the first active day to the exam day */
  function seasonLine(s, D, today) {
    let sea = null, E = null;
    try { E = GA.planner.examOf(s, D, today); sea = GA.stats.season ? GA.stats.season(s, D.exam, today) : GA.planner.seasonFrom(E, s); } catch (e) { sea = null; }
    if (sea !== 'done' || !E || !E.last || !E.last.date) return '';
    const end = U.parseDay(U.addDays(E.last.date, 1)).getTime(), before = t => typeof t === 'number' && t < end;
    const days = Object.keys(s.act || {}).filter(k => k <= E.last.date && GA.stats.dayActive && GA.stats.dayActive(s.act[k])).length;
    const answers = (s.log || []).filter(r => r && before(r[0]) && /^[ptr]$/.test(r[4] || 'p')).length;
    const lessons = Object.values(s.lessons || {}).filter(e => e && before(e.done)).length, tests = (s.tests || []).filter(t => t && before(t.finished)).length;
    const bits = [days ? U.plural(days, 'active day') : '', answers ? U.plural(answers, 'answer') : '', lessons ? `${U.plural(lessons, 'lesson')} finished` : '', tests ? `${U.plural(tests, 'test')} finished` : ''].filter(Boolean);
    // a date the learner set with no matching cycle is labelled 'your exam': 'Your exam season', never 'Your your exam season'
    const lbl = String(E.last.label || '').replace(/^your\s+/i, '') || 'exam';
    return bits.length ? `<p class="hb-sub pg-seasonl">Your ${esc(lbl)} season: ${esc(bits.join(' · '))}.</p>` : '';
  }
  function head(S, D, today, fresh, ns) {
    const s = S.state, ex = examLine(s, D, today);
    let sub;
    if (fresh) sub = `Nothing recorded yet${ex ? ' · ' + ex : ''}.`;
    else {
      const done = D.lessons.filter(l => s.lessons[l.id] && s.lessons[l.id].done).length, ov = GA.stats.overall(s, D, today);
      const qs = ov.attempted ? ` · <b>${U.nf(ov.attempted)}</b> ${ov.attempted === 1 ? 'question' : 'questions'} attempted, ${pct(ov.acc)} right` : D.questions.length ? ' · no ICAI question attempted yet' : '';
      sub = `<b>${U.nf(done)}</b> of ${U.nf(D.lessons.length)} lessons done${qs}${ex ? ' · ' + ex : ''}. <a class="hb-link sm" href="#/about#mastery">How the numbers are defined</a>`;
    }
    return `<header class="hb-head"><div class="hb-head-t"><h1>My progress</h1><p class="hb-sub">${sub}</p>${fresh ? '' : seasonLine(s, D, today)}</div>${fresh ? '' : `<div class="hb-acts">${coral(ns, D)}</div>`}</header>`;
  }

  /* ------------------------------------------------------------------ fresh profile: one first step, the same one Home names (P1-56, D1) */
  function startCard(ns, D) {
    // Tick at 64 px; aimPeak() turns its gaze to the coral once the card is laid out (beside him, or under the text when the card wraps)
    const face = GA.mascot && GA.mascot.svg ? `<span class="hb-mascot" aria-hidden="true">${GA.mascot.svg({ size: 64, gaze: 'right', mood: 'idle' })}</span>` : `<span class="hb-ic lg">${icon('chart')}</span>`;
    const why = ns.reason ? ` ${esc(ns.reason.charAt(0).toUpperCase() + ns.reason.slice(1))}.` : '';
    return `<section class="hb-card hb-empty pg-start" aria-labelledby="pg-start-h">${face}<div class="grow"><h2 id="pg-start-h">Your record starts with one lesson</h2>
      <p>Lessons you finish, questions you answer, cards you review and tests you sit fill this page, all kept in this browser.${why}</p></div>
      <div class="hb-acts">${coral(ns, D)}<a class="hb-link" href="#/syllabus">or pick a paper ${icon('arrow-r')}</a></div></section>`;
  }
  /** Tick's gaze on the coral of the start card, as laid out: under it 'down', beside it 'right' (CONTENT_GUIDE §2b) */
  function aimPeak(out) {
    const m = U.$('.pg-start .hb-mascot', out), c = U.$('.pg-start .btn.pop', out);
    if (!m || !c || !GA.mascot || !GA.mascot.svg) return;
    const a = m.getBoundingClientRect(), b = c.getBoundingClientRect();
    if (!a.width || !b.width) return;
    const hx = b.left >= a.right ? b.left - a.right : 0, vy = b.top >= a.bottom - 4 ? b.top - a.bottom : 0;
    const gaze = vy > 0 && vy >= hx ? 'down' : 'right';
    if (!m.querySelector(`svg.g-${gaze}`)) m.innerHTML = GA.mascot.svg({ size: 64, gaze, mood: 'idle' });
  }
  const bankOn = () => !!(GA.data && GA.data.D && GA.data.D.questions && GA.data.D.questions.length);
  function laterCard() {
    return `<section class="hb-card pg-later-card"><div class="hb-card-h"><span class="hb-ic">${icon('chart')}</span><div class="grow"><h2>What appears here later</h2><p>Your study streak with a 12-week calendar, paper mastery, revision due, the chapters to fix first and test analytics${bankOn() ? '' : ' once ICAI questions are in the bank'}, and, after a few active days, your PassBook Wrapped recap. Each is computed from your own activity; nothing is shown before it is real.</p></div></div></section>`;
  }

  /* ------------------------------------------------------------------ KPI strip (zero tiles become links, P2-42) */
  function kpis(S, D, today, subj, ns) {
    const s = S.state, ov = GA.stats.overall(s, D, today), rec = GA.stats.recentAccuracy(s, 7, today), TT = testsOf(s, D), tr = TT.full;
    const done = D.lessons.filter(l => s.lessons[l.id] && s.lessons[l.id].done).length, total = D.lessons.length;
    const touched = subj.filter(x => x.mastery != null), avgM = touched.length ? U.mean(touched.map(x => x.mastery)) : null;
    const best = tr.length ? Math.max(...tr.map(t => t.pct)) : null, last = tr[tr.length - 1];
    const bank = D.questions.length > 0, cardsSeen = D.cards.filter(c => s.cards && s.cards[c.id]).length;
    const labsTried = D.labs.filter(l => s.labs && s.labs[l.id]).length;
    const ring = (p, t) => C.ring({ size: 62, stroke: 7, pct: p, text: t });
    const tile = (href, inner) => (href ? `<a class="hb-card tight pg-kpi" href="${esc(href)}">${inner}</a>` : `<div class="hb-card tight pg-kpi">${inner}</div>`);
    const lessonHref = ns && ns.kind === 'lesson' ? ns.href : '#/syllabus';
    return `<section class="pg-kpis" aria-label="Summary">
      ${tile(done ? null : lessonHref, `${ring(total ? done / total : 0, total ? pct(done / total) : '–')}<div><b>${U.nf(done)}<small>/ ${U.nf(total)}</small></b><span>${done ? 'lessons done' : 'lessons done · start your first'}</span></div>`)}
      ${tile(touched.length ? null : '#/syllabus', `${ring(avgM || 0, avgM == null ? '–' : pct(avgM))}<div><b>${touched.length}<small>/ ${subj.length}</small></b><span>${touched.length ? 'papers started · average mastery' : 'papers started · pick one'}</span></div>`)}
      ${bank ? tile(ov.attempted ? null : '#/pyq', `${ring(ov.attempted ? ov.acc : 0, ov.attempted ? pct(ov.acc) : '–')}<div><b>${U.nf(ov.attempted)}<small>/ ${U.nf(D.questions.length)}</small></b><span>${ov.attempted ? `questions attempted · accuracy${rec.n ? ` · last 7 days ${pct(rec.acc)}` : ''}` : 'questions attempted · open the bank'}</span></div>`)
        : tile(cardsSeen ? null : '#/flash', `${ring(D.cards.length ? cardsSeen / D.cards.length : 0, D.cards.length ? pct(cardsSeen / D.cards.length) : '–')}<div><b>${U.nf(cardsSeen)}<small>/ ${U.nf(D.cards.length)}</small></b><span>${cardsSeen ? 'flashcards started' : 'flashcards started · open the deck'}</span></div>`)}
      ${bank || TT.all.length ? tile(TT.all.length ? null : '#/test', `${ring(last ? last.pct : TT.last ? TT.last.pct : 0, last ? pct(last.pct) : TT.last ? pct(TT.last.pct) : '–')}<div><b>${TT.all.length || TT.n}</b><span>${TT.all.length ? `${TT.all.length === 1 ? 'test' : 'tests'} finished · ${last ? `latest full-length ${pct(last.pct)}${best != null && tr.length > 1 ? `, best ${pct(best)}` : ''}` : `latest ${pct(TT.last.pct)}`}` : TT.n ? `${TT.n === 1 ? 'test' : 'tests'} finished · none with marks to score` : 'tests finished · papers and mocks'}</span></div>`)
        : tile(labsTried ? null : '#/labs', `${ring(D.labs.length ? labsTried / D.labs.length : 0, D.labs.length ? pct(labsTried / D.labs.length) : '–')}<div><b>${U.nf(labsTried)}<small>/ ${U.nf(D.labs.length)}</small></b><span>${labsTried ? 'labs tried' : D.labs.length ? 'labs tried · open one' : 'labs tried · the first labs are being built'}</span></div>`)}
    </section>`;
  }

  /* ------------------------------------------------------------------ Act now */
  function dueCard(S, D, today) {
    const due = GA.stats.due(S.state, D, today);
    const one = (n, a, b) => (n === 1 ? a : b);
    const rows = [[one(due.cardIds.length, 'Flashcard due', 'Flashcards due'), due.cardIds.length, '#/flash/all'], [one(due.questions.length, 'Missed question to retry', 'Missed questions to retry'), due.questions.length, '#/notebook?retry=5'], [one(due.lessons.length, 'Lesson to revisit', 'Lessons to revisit'), due.lessons.length, due.lessons[0] ? '#/l/' + due.lessons[0] : '#/syllabus']];
    const total = rows.reduce((a, r) => a + r[1], 0);
    return `<section class="hb-card" aria-labelledby="pg-due-h"><div class="hb-card-h"><div class="grow"><h2 id="pg-due-h">Revision due</h2><p>Spaced repetition: each item comes back just before you would forget it</p></div></div>
      ${total ? `<div class="pg-due">${rows.map(r => `<a class="${r[1] ? 'has' : ''}" href="${r[2]}"><b>${U.nf(r[1])}</b><span>${r[0]}</span></a>`).join('')}</div>`
        : `<p class="pg-later">Nothing due today. Finished lessons, missed questions and flashcards you have studied are scheduled here automatically.${due.newCards ? ` ${due.newCards === 1 ? 'One flashcard is' : U.nf(due.newCards) + ' flashcards are'} ready whenever you want to start them.` : ''}</p>`}</section>`;
  }
  function weakCard(S, D, today) {
    const w = GA.stats.weakTopics(S.state, D, today, { limit: 5 });
    return `<section class="hb-card" aria-labelledby="pg-weak-h"><div class="hb-card-h"><div class="grow"><h2 id="pg-weak-h">Fix these first</h2><p>Ranked by the marks you are likely to lose: how often ICAI asks a topic × how often you miss it</p></div></div>
      ${w.length ? `<div class="pg-list">${w.map(x => `<a class="pg-li" href="#/pyq?topic=${encodeURIComponent(x.id)}"><span class="hb-ic sm">${glyph(x.subject)}</span><div><b>${esc(x.name)}</b><small>${esc(x.subjectName)} · ${x.correct}/${x.attempted} correct</small></div><span class="pg-v${(x.accWeighted != null ? x.accWeighted : x.acc) < 0.5 ? ' low' : ''}">${pct(x.accWeighted != null ? x.accWeighted : x.acc)}</span>${icon('arrow-r')}</a>`).join('')}</div>`
        : D.questions.length ? '<p class="pg-later">Once you have answered three or more questions in a topic, the topics most likely to cost you marks are listed here.</p>'
          : `<p class="pg-later">${esc((GA.ui && GA.ui.str && GA.ui.str.bankEmpty) || 'ICAI past papers, RTPs and MTPs are being added')}. Once they are, the topics most likely to cost you marks are listed here.</p>`}</section>`;
  }
  function actNow(S, D, today) {
    const v = GA.planner && GA.planner.current ? GA.planner.current() : null;
    const plan = v && v.tasks.length ? (v.done ? "Today's plan is done" : `Today's plan · ${v.left} of ${plural(v.tasks.length, 'task')} left`) : "Open today's plan";
    return `<section class="pg-act" aria-labelledby="pg-act-h"><div class="hb-sh"><div><h2 id="pg-act-h">Act now</h2><p>What is due today and where you lose the most marks.</p></div><a class="hb-link" href="#/plan">${esc(plan)} ${icon('arrow-r')}</a></div>
      <div class="hb-2">${dueCard(S, D, today)}${weakCard(S, D, today)}</div></section>`;
  }

  /* ------------------------------------------------------------------ Your habit (D10): the page's one solid cobalt surface */
  function habitCard(S, D, today) {
    const E = GA.engage;
    if (!E || typeof E.compute !== 'function') return '';
    const st = S.state, c = E.compute(st, D, today), s = c.streak;     // no level / XP bar (2026-10-18 theme): the habit card is the streak and the calendar
    const hm = GA.stats.heatmap(st, 12, today);
    const frozen = new Set([].concat(s.frozen || [], (st.eng && Array.isArray(st.eng.frozen) ? st.eng.frozen : [])));
    let rc = null; try { rc = E.recap ? E.recap(st, D, today) : null; } catch (e) { rc = null; }
    const active = hm.cells.filter(x => !x.future && x.level > 0).length, days = hm.cells.filter(x => !x.future).length;
    const tip = x => {
      if (x.future) return '';
      const a = x.a || {}, bits = [a.q ? plural(a.q, 'question') : '', a.c ? plural(a.c, 'card') : '', a.l ? plural(a.l, 'lesson') : '', a.s >= 60 ? Math.round(a.s / 60) + ' min' : ''].filter(Boolean);
      return `${U.fmtDay(x.day, { weekday: 'short', day: 'numeric', month: 'short' })}\n${frozen.has(x.day) ? 'Streak freeze used' : bits.length ? bits.join(' · ') : 'No study'}`;
    };
    const cells = hm.cells.map(x => `<i class="l${x.future ? 'x' : x.level}${frozen.has(x.day) ? ' fz' : ''}${x.day === today ? ' td' : ''}"${x.future ? '' : ` data-ftip="${esc(tip(x))}"`}></i>`).join('');
    const status = s.current ? (s.activeToday ? 'Today counts' : 'Not yet active today') : 'Study today to start one';
    return `<section class="hb-card pg-habit" aria-labelledby="pg-habit-h">
      <div class="pg-hb-l"><h2 id="pg-habit-h">Your habit</h2>
        <div class="pg-hb-streak"><span class="pg-hb-fl" aria-hidden="true">${E.icons && E.icons.flame ? E.icons.flame : icon('flame')}</span><b>${U.nf(s.current)}</b><span>${s.current === 1 ? 'day' : 'days'} in a row</span></div>
        <ul class="pg-hb-facts"><li><span>Best</span><b>${plural(s.best, 'day')}</b></li><li><span>Freezes saved</span><b>${U.nf(s.freezes || 0)} of ${U.nf(s.cap || 2)}</b></li><li><span>Today</span><b>${esc(status)}</b></li></ul>
      </div>
      <div class="pg-hb-r"><div class="pg-cal" role="img" aria-label="${esc(`Active on ${active} of the last ${days} days`)}">${cells}</div>
        <p class="pg-cal-k"><span>Active on <b>${U.nf(active)}</b> of the last ${U.nf(days)} days</span><span class="pg-cal-legend" aria-hidden="true">Less <i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> More <i class="l0 fz"></i> freeze</span></p>
        ${rc ? `<a class="hb-link sm" href="${esc(rc.href)}">Open PassBook Wrapped ${icon('arrow-r')}</a>` : ''}</div></section>`;
  }

  /* ------------------------------------------------------------------ subject mastery: a stable marks order, untouched subjects folded */
  function masteryCard(subj, D, I) {
    const per = id => { const r = I && I.subject ? I.subject(id) : null; return r ? (typeof r.perPaper === 'number' ? r.perPaper : r.marksPerPaper || 0) : 0; };
    const rows = subj.slice().sort((a, b) => per(b.id) - per(a.id) || D.subjects.findIndex(s => s.id === a.id) - D.subjects.findIndex(s => s.id === b.id));
    const started = rows.filter(x => x.mastery != null), rest = rows.filter(x => x.mastery == null);
    const tile = x => {
      const a = x.pyq, m = x.mastery;
      const meta = [x.lessons.total ? `${x.lessons.done}/${x.lessons.total} lessons` : 'no lessons yet', a.attempted ? `${pct(a.acc)} right` : a.total ? `${U.nf(a.total)} questions` : ''].filter(Boolean).join(' · ');
      return `<a class="pg-mt" href="#/s/${x.id}" aria-label="${esc(`${x.name}: ${pct(m)} mastery, ${meta}`)}">${C.ring({ size: 48, stroke: 5, pct: m || 0, text: pct(m) })}
        <span class="t"><b>${esc(x.name)}</b><small>${meta}</small></span></a>`;
    };
    return `<section class="hb-card" aria-labelledby="pg-mt-h"><div class="hb-card-h"><div class="grow"><h2 id="pg-mt-h">Paper mastery</h2><p>${started.length} of ${rows.length} papers started, in order of the paper's marks. A blend of lessons finished, question accuracy (recent answers count more${bankOn() ? '' : '; once ICAI questions are in the bank'}) and flashcard retention</p></div></div>
      ${started.length ? `<div class="pg-mts">${started.map(tile).join('')}</div>` : ''}
      ${rest.length ? `<details class="pg-fold"${started.length ? '' : ' open'}><summary>${U.nf(rest.length)} not started · pick one ${icon('chev-d', 'chev')}</summary><div class="pg-notyet">${rest.map(x => `<a class="hb-chip" href="#/s/${x.id}">${glyph(x.id)}${esc(medName(x.name))}</a>`).join('')}</div></details>` : ''}</section>`;
  }

  /* ------------------------------------------------------------------ test analytics (P2-34, P2-35, D11) */
  /** the scored tests: the trend compares like with like (full-length papers and mocks only, P2-34); the last test of any kind is shown beside it */
  function testsOf(st, D) {
    const T = GA.stats.testTrend;
    let all = [], n = 0;
    try { const rows = T(st, D, { all: true }); n = rows.length; all = rows.filter(t => t.scored !== false && t.max > 0); } catch (e) { all = []; }
    const flagged = all.every(t => typeof t.full === 'boolean');   // an older stats.js without the flag: every scored test is charted
    // n: every finished sitting, scored or not (an RTP's MCQ drill has no marks to score: ICAI prints none on an RTP)
    return { all, n, full: flagged ? all.filter(t => t.full) : all, last: all[all.length - 1] || null };
  }
  const yearOf = r => { const m = /\d{4}/.exec(String(r && r.exam)); return m ? +m[0] : 0; };
  /** D11: the latest official CS qualifying mark with a sourced report, for the learner's category (Settings, default General), as a share of
      the marks: one labelled reference line, never a prediction */
  function qualifying(st, D) {
    const rs = (D.results || []).filter(r => r && r.paper === 'CS' && r.qualifying && r.outOf > 0).sort((a, b) => yearOf(b) - yearOf(a));
    const r = rs[0];
    if (!r) return null;
    const cats = Object.keys(r.qualifying), want = st.profile && st.profile.category;
    const cat = cats.indexOf(want) >= 0 ? want : cats.indexOf('General') >= 0 ? 'General' : cats[0];
    const q = r.qualifying[cat];
    if (typeof q !== 'number' || !isFinite(q)) return null;
    // the in-chart label stays short so the score line leaves it room (P2-33); the line under the chart names the exam, the category and the source
    return { v: q / r.outOf, label: `Qualifying: ${U.fmtMarks(q)}${r.outOf === 100 ? '' : ' of ' + r.outOf}`, exam: r.exam, cat, q, outOf: r.outOf, url: r.source && r.source.url };
  }
  function mocksCard(S, D) {
    const st = S.state, T = testsOf(st, D), full = T.full, last = T.last;
    if (!last) return D.questions.length ? `<section class="hb-card"><div class="hb-card-h"><span class="hb-ic">${icon('timer')}</span><div class="grow"><h2>Test analytics</h2><p>When you sit a past paper or a mock under exam conditions, its score, accuracy and time used are charted here.</p></div><a class="btn sm" href="#/test">Papers and mocks</a></div></section>` : '';
    const Q = qualifying(st, D), short = T.all.length - full.length;
    const avg3 = full.length ? U.mean(full.slice(-3).map(t => t.pct)) : null;
    const sub = [full.length ? `${plural(full.length, 'full-length sitting')} · last ${Math.min(3, full.length)} average ${pct(avg3)}` : 'No full-length sitting yet', short ? plural(short, 'short test') : ''].filter(Boolean).join(' · ');
    const chart = full.length
      ? `<div class="pg-chart" id="pg-chart"></div>${Q ? `<p class="pg-ref">The dashed line is the official ${esc(Q.exam)} CS qualifying mark for ${esc(Q.cat)}: ${esc(U.fmtMarks(Q.q))} of ${esc(Q.outOf)}${Q.url ? ` (<a href="${esc(Q.url)}" target="_blank" rel="noopener">source</a>)` : ''}. A reference, not a prediction. <a href="#/settings#st-exam-h">Change category</a></p>` : ''}`
      : `<p class="pg-later">The score trend compares full-length papers and mocks only, so a short test is not charted against a 3-hour paper. Sit one under exam conditions to start it.</p>`;
    return `<section class="hb-card"><div class="hb-card-h"><div class="grow"><h2>Test analytics</h2><p>${esc(sub)}</p></div><a class="btn sm" href="#/test">All tests</a></div>
      <div class="pg-mock"><div class="pg-trend">${chart}</div>
      <div class="pg-last"><div class="k">Last test</div><h4>${esc(last.title)}</h4><div class="sc">${U.fmtMarks(last.score)}<small> / ${last.max}</small></div>
        <ul><li><span>Accuracy</span><b>${last.accuracy == null ? '–' : pct(last.accuracy)}</b></li><li><span>Attempted</span><b>${pct(last.attemptRate)}</b></li>${last.negative ? `<li><span>Lost to negatives</span><b>${U.fmtMarks(last.negative)}</b></li>` : ''}<li><span>Time used</span><b>${esc(U.hm ? U.hm(last.minutes) : last.minutes + ' min')}</b></li></ul>
        <a class="hb-link sm" href="#/test/result/${encodeURIComponent(last.id)}">Full analysis ${icon('arrow-r')}</a></div></div></section>`;
  }
  /** after the page is drawn: the trend chart at its card's width (P2-33), drawn again when that width changes */
  function drawCharts(out, S, D) {
    const host = U.$('#pg-chart', out);
    if (!host || !C.fit) return;
    const st = S.state, full = testsOf(st, D).full, Q = qualifying(st, D);
    const n0 = full.length - Math.min(10, full.length);
    const pts = full.slice(-10).map((t, i) => ({ x: '#' + (n0 + i + 1), y: Math.max(0, t.pct), tip: `${t.title}: ${U.fmtMarks(t.score)}/${t.max} (${pct(t.pct)})` }));
    const yMax = Math.min(1, Math.max(0.6, Q ? Q.v + 0.15 : 0, ...pts.map(p => p.y + 0.05)));
    const aria = `Scores of your last ${plural(pts.length, 'full-length sitting')}, as a share of the marks${Q ? `; dashed line: the official ${Q.exam} CS qualifying mark for ${Q.cat}, ${U.fmtMarks(Q.q)} of ${Q.outOf}` : ''}`;
    C.fit(host, w => C.line(pts, { w, h: 180, px: true, yMax, refs: Q ? [{ v: Q.v, label: Q.label }] : [], aria }));
  }

  /* the year chart needs some answers to say anything: from 20 (P2-42) */
  /* the ICAI bank's chart is by attempt (Sep 2026, May 2026 ...): RTPs, MTPs and the exam paper of an attempt share its column; the label is
     the month's letter and the year ('S26'), the tip and the link name it in full (docs/ICAI_BANK.md §7) */
  const ATT_L = { jan: 'J', may: 'M', jun: 'Jn', jul: 'Jl', sep: 'S', nov: 'N', dec: 'D' };
  function icaiBankCard(S, D) {
    const P = GA.pyqLib, by = {}, name = a => (P && P.attemptName ? P.attemptName(a) : a), ord = a => (P && P.attemptOrd ? P.attemptOrd(a) : 0);
    D.questions.forEach(q => { if (q.alt) return; const k = q.attempt || 'other', r = (by[k] = by[k] || { t: 0, a: 0, c: 0 }); r.t++; const e = S.state.q[q.id]; if (e && e.n) { r.a++; if (e.lastOk) r.c++; } });
    const keys = Object.keys(by).sort((a, b) => ord(a) - ord(b)), rows = Object.values(by);
    const tot = U.sum(rows.map(r => r.t)), att = U.sum(rows.map(r => r.a)), max = Math.max(...rows.map(r => r.t), 1);
    const headH = `<div class="hb-card-h"><div class="grow"><h2>ICAI question bank</h2><p>${U.nf(att)} of ${U.nf(tot)} questions attempted, from ${plural(D.papers.length, 'ICAI document')}</p></div><a class="btn sm" href="#/pyq">Open bank</a></div>`;
    if (att < 20) return `<section class="hb-card">${headH}<p class="pg-later">The attempt-by-attempt chart appears after 20 answers${att ? ` (you have ${U.nf(att)})` : ''}.</p></section>`;
    const lab = k => { const m = /^([a-z]{3})(\d{4})$/.exec(k); return m ? (ATT_L[m[1]] || m[1][0].toUpperCase()) + m[2].slice(2) : '–'; };
    return `<section class="hb-card">${headH}
      <div class="pg-yrs">${keys.map(k => { const r = by[k], n = name(k), t = `${n}: ${r.a} of ${r.t} attempted, ${r.c} correct`; return `<a class="pg-yr" href="#/pyq?attempt=${encodeURIComponent(k)}" data-ftip="${esc(`${n}\n${r.a} of ${r.t} attempted · ${r.c} correct`)}" aria-label="${esc(t)}"><span class="c" style="height:${Math.max(6, (r.t / max) * 100)}%"><i style="height:${r.t ? (r.a / r.t) * 100 : 0}%"><i style="height:${r.a ? (r.c / r.a) * 100 : 0}%"></i></i></span><span>${lab(k)}</span></a>`; }).join('')}</div>
      <div class="pg-legend"><span><i style="background:var(--surface-3)"></i>in the bank</span><span><i style="background:color-mix(in srgb, var(--accent) 38%, var(--surface))"></i>attempted</span><span><i style="background:var(--accent)"></i>last answer right</span></div></section>`;
  }
  function bankCard(S, D) {
    if (!D.questions.length) return '';                       // no ICAI bank yet: the card comes back with it
    if (D.questions.every(q => q.icai)) return icaiBankCard(S, D);
    const years = D.years.slice().sort((a, b) => a - b), by = {};
    D.questions.forEach(q => { const r = (by[q.year] = by[q.year] || { t: 0, a: 0, c: 0 }); r.t++; const e = S.state.q[q.id]; if (e && e.n) { r.a++; if (e.lastOk) r.c++; } });
    const tot = D.questions.length, att = Object.values(by).reduce((a, r) => a + r.a, 0), max = Math.max(...Object.values(by).map(r => r.t), 1);
    const headH = `<div class="hb-card-h"><div class="grow"><h2>ICAI question bank</h2><p>${U.nf(att)} of ${U.nf(tot)} questions attempted across ${D.papers.length} ICAI papers</p></div><a class="btn sm" href="#/pyq">Open bank</a></div>`;
    if (att < 20) return `<section class="hb-card">${headH}<p class="pg-later">The year-by-year chart appears after 20 answers${att ? ` (you have ${U.nf(att)})` : ''}.</p></section>`;
    return `<section class="hb-card">${headH}
      <div class="pg-yrs">${years.map(y => { const r = by[y] || { t: 0, a: 0, c: 0 }, t = `${y}: ${r.a} of ${r.t} attempted, ${r.c} correct`; return `<a class="pg-yr" href="#/pyq?year=${y}" data-ftip="${esc(`${y}\n${r.a} of ${r.t} attempted · ${r.c} correct`)}" aria-label="${esc(t)}"><span class="c" style="height:${Math.max(6, (r.t / max) * 100)}%"><i style="height:${r.t ? (r.a / r.t) * 100 : 0}%"><i style="height:${r.a ? (r.c / r.a) * 100 : 0}%"></i></i></span><span>${String(y).slice(2)}</span></a>`; }).join('')}</div>
      <div class="pg-legend"><span><i style="background:var(--surface-3)"></i>in the bank</span><span><i style="background:color-mix(in srgb, var(--accent) 38%, var(--surface))"></i>attempted</span><span><i style="background:var(--accent)"></i>last answer correct</span></div></section>`;
  }

  GA.views.progress = {
    enter(ctx, out) {
      const S = GA.store, D = GA.data.D, today = U.today();
      GA.shell.crumbs([['My progress', '#/progress']]);
      const I = GA.insights && GA.insights.get ? GA.insights.get() : null;
      const fresh = !hasProgress(S.state), ns = nextStepOf(S.state, D, I);
      if (fresh) {
        out.innerHTML = `<div class="hb pg-page fresh">${head(S, D, today, true, ns)}${startCard(ns, D)}${laterCard()}
          <p class="pg-foot">Computed from your own activity in this browser (${esc(S.profile === 'demo' ? 'demo profile' : 'main profile')}). <a href="#/settings">Back it up or move it</a>.</p></div>`;
        aimPeak(out);
        return;
      }
      const subj = GA.stats.subjects(S.state, D, today);
      out.innerHTML = `<div class="hb pg-page">
        ${head(S, D, today, false, ns)}
        ${kpis(S, D, today, subj, ns)}
        ${actNow(S, D, today)}
        ${habitCard(S, D, today)}
        <div class="pg-flow">${masteryCard(subj, D, I)}${(() => { const pair = mocksCard(S, D) + bankCard(S, D); return pair ? `<div class="pg-pair">${pair}</div>` : ''; })()}</div>
        <p class="pg-foot">Computed from your own activity in this browser (${esc(S.profile === 'demo' ? 'demo profile' : 'main profile')}). <a href="#/settings">Back it up or move it</a>.</p>
      </div>`;
      drawCharts(out, S, D);
      requestAnimationFrame(() => { const y = U.$('.pg-yrs', out); if (y) y.scrollLeft = y.scrollWidth; });   // a narrow year chart opens on the latest year (P2-54)
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
