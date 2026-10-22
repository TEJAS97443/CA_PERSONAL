/* PassBook — planner (/plan), owner WP6 (docs/ARCHITECTURE.md §10.8). Page plan (_audit/PROPOSAL.md §3 /plan):
   1. header: the plan line, stated once (P2-39: what today's list is made of in this phase; the chosen route; 'Which day is your paper?' inside
      the exam window), 'Exam date & daily time'
   2. the setup card on the first visit only (exam day · daily time · starting point; skippable; no diagnostic, P1-56)
   3. Today, the day's snapshot (P0-19): rows tick off as they are done, the first open task is the screen's one coral, a finished day gets
      Tick and the coral 'Add one more task' (D18); '84 of 90 min' once; the honest pace line (P1-45: the lessons a day the list really holds,
      one-tap fixes when the syllabus does not fit) | the solid cobalt Road card: the big day count, the date and whether it is assumed, one
      4-phase bar sized by the real phase lengths with a today marker, the phases with true dates (P0-20), 'Change the exam date'
   4. Weekly focus (this week + the next two, the rest folded)  5. How this plan is made (folded)
   Season modes (P1-61, P2-72, D20): the final fortnight (no new lessons), the eve (light revision and a checklist), exam day (nothing to
   study, an optional warm-up), after the exam (the next exam card: the cycle after the one the learner sat) and between cycles.
   '#/plan?set=exam' opens the exam date and daily time sheet (P1-46). Focus never falls to the page after a sheet closes or a chip re-draws
   the page: it goes back to the control that opened it, or to Today. Styles: hubs.css (.pl-*, .hb-*). */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = GA.icon, UI = GA.ui, DATA = GA.data, C = GA.charts;
  const KIND = { revise: ['refresh', 'Revise'], learn: ['book', 'Learn'], practice: ['target', 'Practise'], mock: ['timer', 'Mock'], warmup: ['sun', 'Warm up'] };
  /* the header's plan line per phase (the planner's own text; this copy only until an older planner.js is cached) */
  const PHASE_TXT = GA.planner.PHASE_TXT || {
    learn: 'Learn phase: each lesson in learning order, then its own ICAI questions, with revision first.',
    practice: 'Practise phase: ICAI questions lead, on the topics that cost you marks, while lessons go on and your notebook is cleared.',
    mocks: 'Mock tests phase: a full 3-hour mock every third day under exam conditions, with revision and lessons between them.',
    final: 'Final stretch: no new topics. Notebook retries, flashcards and re-reads of what you have learned.'
  };
  const MINUTE_CHIPS = [30, 45, 60, 90, 120, 180, 240];
  const LESSON_CHIPS = [1, 2, 3, 4, 5, 6];
  const minTxt = GA.planner.minTxt;   // 45 min · 1.5 h · 2 h · 39 h
  const hours = min => (min >= 600 ? Math.round(min / 60) : Math.round(min / 6) / 10);
  const day = (k, o) => U.fmtDay(k, o || { day: 'numeric', month: 'short' });
  const longDay = k => U.fmtDay(k, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const plural = (n, w, p) => `${U.nf(n)} ${n === 1 ? w : p || w + 's'}`;
  const glyph = id => (C && C.subj ? C.subj(id) : icon('book'));
  const say = (t, lvl) => { if (UI.say) UI.say(t, lvl); };
  const setFlag = (k, v) => { const A = GA.actions; if (A.setFlag) A.setFlag(k, v); else GA.store.update(s => { (s.seen = s.seen || {})[k] = v == null ? Date.now() : v; }, 'flag'); };
  const flag = k => !!(GA.store.state.seen && GA.store.state.seen[k]);
  /** choose an exam date: setting a date is choosing it (§10.5); null = not sure yet (the first remaining exam day is assumed) */
  const setExam = v => GA.actions.setProfile(v ? { examDate: v, examSet: true } : { examDate: null, examSet: false });
  /** the exam cycle whose days the learner can still choose from (P2-72: never the remaining days of an exam already sat) */
  function choosable(D, E, today) {
    const P = GA.planner;
    if (E && E.cycle && E.daysLeft != null && E.daysLeft >= 0) return E.cycle;
    return P.nextCycle ? P.nextCycle(D, E, today) : (P.cyclesOf(D).find(c => (c.days || []).some(d => d >= today)) || null);
  }
  const nextName = (D, E, today) => (GA.planner.nextLabel ? GA.planner.nextLabel(D, E, today) : (E && E.label) || 'The next CA Inter attempt');
  /** the paper written on a day of the cycle ('Paper 4'), from content/exam.json papers; '' when the day has none */
  const paperOn = (cyc, d) => { const k = cyc && cyc.papers ? Object.keys(cyc.papers).filter(x => (cyc.papers[x] || []).includes(d)) : []; return k.length === 1 ? (GA.stats.PAPER_NAME ? GA.stats.PAPER_NAME(k[0]) : k[0].replace(/^P/, 'Paper ')) : ''; };
  /** a day chip's label: 'Paper 4 · Fri 8 Jan', or the date alone */
  const dayChip = (cyc, d) => { const pn = paperOn(cyc, d), dd = U.fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short' }); return pn ? `${pn} · ${dd}` : dd; };
  const bankOk = D => !!(D && D.questions && D.questions.length);
  const firstDay = E => !E.cycle || (E.cycle.days || [])[0] === E.date;
  const inWindow = (E, today) => !!(E && E.basis === 'assumed' && E.cycle && (E.cycle.days || [])[0] <= today);

  /* ------------------------------------------------------------------ header: the plan line, once (P2-39) */
  function header(B, st, D, today, I) {
    const E = B.exam, season = B.season, cur = B.current;
    let line;
    const pName = E && E.paper && E.paper.name ? E.paper.name : (E && E.label) || 'Your paper';
    if (season === 'eve') line = `${esc(pName)} is tomorrow. Light revision, then sleep.`;
    else if (season === 'day') line = `${esc(pName)} is today.`;
    else if (season === 'done') {
      const mine = E.set && E.last && E.last.date;
      const cyc = E.last && E.last.cycle, res = cyc && cyc.result, dr = res ? U.daysBetween(today, res) : null;
      // the results day from the cycle data: ahead, today, or already past (then where to look, not a claim that they are out)
      const rl = dr == null ? '' : dr > 0 ? ` Results due ${esc(U.fmtDay(res))} (official schedule; dates can change).` : dr === 0 ? ' Results are due today (official schedule; dates can change).'
        : ` Results were due on ${esc(U.fmtDay(res))}: check the ${cyc.source ? `<a class="hb-link sm" href="${esc(cyc.source)}" target="_blank" rel="noopener">official site</a>` : 'official site'}.`;
      line = `${mine ? `You sat ${esc(E.last.label)} on ${esc(day(E.last.date))}` : `${esc((E.last && E.last.label) || 'The attempt')} is over`}.${rl}`;
    } else if (season === 'between') line = E.last && E.last.label ? `${esc(E.last.label)} is over.` : 'No exam date ahead.';
    else if (E.basis === 'assumed' && E.daysLeft <= 1) line = (inWindow(E, today) && E.daysLeft === 0
      ? `${esc(E.label)} exam days are under way. Is your paper today? <button type="button" class="pl-linkbtn" data-act="sheet">Set your date</button>`
      : `${esc(E.label)} starts ${E.daysLeft === 0 ? 'today' : 'tomorrow'}. Is your paper ${E.daysLeft === 0 ? 'today' : 'tomorrow'}? <button type="button" class="pl-linkbtn" data-act="sheet">Set your date</button>`) + ' · Final stretch: no new topics.';
    else {
      // the phase's plan line, the mock phase worded for the daily time (a mock longer than it is sat in parts, P1-45)
      const id = season === 'final' ? 'final' : cur ? cur.id : B.phase, P = GA.planner;
      line = esc((P.phaseLine ? P.phaseLine(id, B.day && B.day.minutes, bankOk(D)) : PHASE_TXT[id]) || '');
    }
    const R = st.profile.route && I && I.path ? I.path(st.profile.route) : null;
    const route = R && R.lessons ? `<p class="hb-sub pl-route">On route: <b>${esc(routeName(R))}</b> · ${U.nf(R.lessons.filter(id => st.lessons[id] && st.lessons[id].done).length)} of ${U.nf(R.lessons.length)} · <button type="button" class="pl-linkbtn" data-act="routes">Change</button></p>` : '';
    const which = inWindow(E, today) && E.cycle && season !== 'done' ? whichDay(E, today) : '';
    return `<header class="hb-head pl-head"><div class="hb-head-t"><h1>Planner</h1><p class="hb-sub">${line}</p>${route}${which}</div>
      <div class="hb-acts"><button class="btn ghost" type="button" data-act="sheet" data-opener="head">${icon('calendar')} Exam date &amp; daily time</button></div></header>`;
  }
  const routeName = R => (R.id === 'crash' ? 'Crash course' : R.id === 'cover80' ? '80% of the marks' : R.id === 'zero' ? 'Whole syllabus in order' : R.title);
  /** inside the exam window with no date chosen: 'Which day is your paper?' with the remaining days (P1-46) */
  function whichDay(E, today) {
    const left = (E.cycle.days || []).filter(d => d >= today);
    if (!left.length) return '';
    return `<div class="pl-which" role="group" aria-label="Which day is your paper?"><span>Which day is your paper?</span>${left.map(d => `<button type="button" class="pl-chip" data-exam="${d}">${esc(dayChip(E.cycle, d))}</button>`).join('')}</div>`;
  }

  /* ------------------------------------------------------------------ the setup card (first visit, P1-46) */
  const chip = (attr, v, label, on, sub) => `<button type="button" class="pl-chip${sub ? ' tall' : ''}" ${attr}="${esc(v)}" aria-pressed="${on}">${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ''}</button>`;
  /** the starting points (P1-46, P1-06): Recommended = the shared next step with no route (what tapping it plans, even while a route is set:
      GA.planner.recommended clears the route first), or one of the computed routes */
  function startingPoints(st, D, I) {
    let ns = null;
    try {
      if (GA.planner.recommended) ns = GA.planner.recommended(st, D, U.today(), { I });
      else if (GA.stats.nextStep) ns = GA.stats.nextStep(Object.assign({}, st, { profile: Object.assign({}, st.profile, { route: null }) }), D, { kind: 'lesson', I: I || undefined });
    } catch (e) { ns = null; }
    return [['', 'Recommended', ns && ns.title ? `${ns.label || 'Start here'} · ${ns.title}` : 'The next lesson in the learning order'], ['crash', 'Crash course', pathLine(I, 'crash')], ['cover80', '80% of the marks', pathLine(I, 'cover80')],
      ['last30', 'Last 30 days', pathLine(I, 'last30')], ['zero', 'Whole syllabus in order', pathLine(I, 'zero')]].filter(r => !r[0] || r[2]);
  }
  const setupTaps = { exam: false, min: false, route: false };   // this visit's taps on the setup card
  /* P1-46: the setup card belongs to the first visit only. enter() turns it on when the 'plan-setup' flag is not set and marks the flag as soon as
     the card is on the page, so a later visit never brings it back, whatever was tapped (each tap is saved at once). It stays for the rest of
     this visit, until Skip or the third tap. A first visit that cannot show it (after the exam, the eve, exam day) leaves it for the first visit
     with a plan. */
  let setupOn = false;
  function setupCard(B, st, D, I) {
    const E = B.exam, today = U.today(), cyc = choosable(D, E, today), days = cyc ? (cyc.days || []).filter(d => d >= today) : [];
    const mins = st.profile.goals.minutes, route = st.profile.route || null, routes = startingPoints(st, D, I);
    return `<section class="hb-card pl-setup" aria-labelledby="pl-setup-h"><div class="hb-card-h"><span class="hb-ic">${icon('compass')}</span><div class="grow"><h2 id="pl-setup-h">Set up your plan</h2><p>Three taps, all optional; this card is shown once. Change them later from 'Exam date &amp; daily time' and the Routes on Learn.</p></div><button type="button" class="btn ghost sm" data-act="setup-skip">Skip</button></div>
      <div class="pl-steps">
        <fieldset class="pl-step"><legend><b>1</b> Count down to</legend><div class="pl-chips">${chip('data-exam', '', cyc && cyc.papers && Object.keys(cyc.papers).length ? 'Each paper in turn' : 'Not sure yet', !E.set)}${days.map(d => chip('data-exam', d, dayChip(cyc, d), E.set && E.date === d)).join('')}</div></fieldset>
        <fieldset class="pl-step"><legend><b>2</b> Time a day</legend><div class="pl-chips">${MINUTE_CHIPS.map(m => chip('data-min', m, minTxt(m), mins === m)).join('')}</div></fieldset>
        <fieldset class="pl-step"><legend><b>3</b> Where to start</legend><div class="pl-chips">${routes.map(([id, label, sub]) => chip('data-route', id, label, (route || '') === id, sub)).join('')}</div></fieldset>
      </div></section>`;
  }
  function pathLine(I, id) {
    const p = I && I.path ? I.path(id) : null;
    if (!p || !p.lessons || !p.lessons.length) return '';
    return `${plural(p.lessons.length, 'lesson')} · ${p.hours} h${p.share ? ` · ${Math.round(p.share * 100)}% of the question marks` : ''}`;
  }

  /* ------------------------------------------------------------------ Today (P0-19) */
  function taskRow(t, isNext) {
    const k = KIND[t.kind] || KIND.learn;
    return `<a class="pl-task${t.done ? ' done' : ''}${isNext ? ' next' : ''}" href="${esc(t.href)}"><span class="hb-ic${t.done ? ' ok' : ''}">${icon(t.done ? 'check' : k[0])}</span>
      <div><b>${esc(t.title)}</b><small>${esc(t.why || '')}${t.progress && !t.done ? ' · ' + esc(t.progress) : ''}</small></div>
      <span class="r"><span>${t.done ? 'Done' : k[1]}</span><em>${esc(minTxt(t.minutes))}</em></span></a>`;
  }
  const coralOf = (t, kicker) => `<a class="btn pop hb-go" href="${esc(t.href)}"><span><small>${esc(kicker)} · ${esc(minTxt(t.minutes))}</small>${esc(t.title)}</span>${icon('arrow-r')}</a>`;
  /** the shared next step as the coral of a day with nothing on it (D18: a real next step, never a dead end) */
  function stepCoral(st, D, I) {
    let ns = null;
    try { ns = GA.stats.nextStep && D.lessons.length ? GA.stats.nextStep(st, D, { kind: 'any', I: I || undefined }) : null; } catch (e) { ns = null; }
    if (!ns || !ns.href) return bankOk(D) ? `<a class="btn pop" href="#/pyq">${icon('target')} Practise ICAI questions</a>` : D.cards.length ? `<a class="btn pop" href="#/flash">${icon('cards')} Review your flashcards</a>` : `<a class="btn pop" href="#/syllabus">${icon('book')} Open the syllabus</a>`;
    return `<a class="btn pop hb-go" href="${esc(ns.href)}"><span><small>${esc([ns.label, ns.minutes ? minTxt(ns.minutes) : ''].filter(Boolean).join(' · '))}</small>${esc(ns.title || ns.label)}</span>${icon('arrow-r')}</a>`;
  }
  function todayCard(B, st, D, I) {
    const v = B.day, budget = st.profile.goals.minutes, season = B.season;
    const doneN = v.tasks.filter(t => t.done).length, planned = v.minutesPlanned;
    let coral = '', body = '', sub;
    if (season === 'day') {
      // exam day: nothing to study; the optional warm-up is the one coral, beside Tick (its gaze on it)
      const w = v.warmup;
      sub = 'Nothing new to study today.';
      body = `<div class="pl-done pl-dayc">${peak('happy', 'right')}<div class="grow"><b>Eat, reach the centre early, and trust the work you have done.</b><p>${w && w.done ? 'Warm-up done. Good luck.' : 'If it helps you settle, a few minutes of warm-up. Optional.'}</p></div>${w ? coralOf(w, 'Optional') : ''}</div>`;
    } else {
      sub = v.tasks.length ? `${doneN} of ${plural(v.tasks.length, 'task')} done · ${planned} of your ${budget} min planned` : 'Nothing planned today';
      if (v.next) coral = coralOf(v.next, 'Next task');
      const rows = v.tasks.length ? `<span class="hb-bar anim" aria-hidden="true"><i style="width:${((100 * doneN) / v.tasks.length).toFixed(1)}%"></i></span><div class="pl-tasks">${v.tasks.map(t => taskRow(t, v.next && t.id === v.next.id)).join('')}</div>` : '';
      const notes = v.notes && v.notes.length ? `<ul class="pl-notes">${v.notes.map(n => `<li>${icon('info')}<span>${esc(n)}</span></li>`).join('')}</ul>` : '';
      let end = '';
      if (v.done) end = `<div class="pl-done">${peak('happy', 'right')}<div class="grow"><b>Today's plan is done.</b><p>${plural(v.tasks.length, 'task')} · ${minTxt(planned)}. A new list is waiting tomorrow; if you have time left, add one more.</p></div><button class="btn pop" type="button" data-act="more">${icon('plus')} Add one more task</button></div>`;
      else if (!v.tasks.length) {
        end = `<div class="pl-calm">${peak('idle', 'right')}<div class="grow"><b>Nothing to plan today.</b><p>No revision is due and there is no lesson or practice set left to suggest. Your next step is beside this.</p></div></div>`;
        coral = stepCoral(st, D, I);
      }
      // the final stretch revises what was learned: the formula sheets are its handbook (P1-53)
      const sheets = (season === 'final' || season === 'eve') && GA.shell && GA.shell.has && GA.shell.has('/rev')
        ? `<p class="pl-revl"><a class="hb-link sm" href="#/rev">${icon('sigma')} Formula sheets: each paper's recap, formulas and key ideas on one page ${icon('arrow-r')}</a></p>` : '';
      body = rows + notes + sheets + end + (season === 'normal' ? paceLine(B, st, I) : '');
    }
    return `<section class="hb-card pl-today" aria-labelledby="pl-today-h"><div class="hb-card-h"><div class="grow"><h2 id="pl-today-h">Today</h2><p>${esc(sub)}</p></div>${v.done ? '' : coral}</div>${body}</section>`;
  }
  /** Tick (64 px) on a finished or empty state; aimPeak() then turns its gaze to the coral as it is laid out (CONTENT_GUIDE §2b) */
  function peak(mood, gaze) { return GA.mascot && GA.mascot.svg ? `<span class="hb-mascot pl-peak" aria-hidden="true" data-mood="${mood}">${GA.mascot.svg({ size: 64, gaze, mood })}</span>` : ''; }
  /** his gaze on the coral of his card: under him 'down', over him 'up', beside him 'right' / 'left' (the larger gap wins on a diagonal) */
  function aimPeak(root) {
    if (!GA.mascot || !GA.mascot.svg) return;
    U.$$('.hb-mascot[data-mood]', root).forEach(m => {
      const c = U.$('.btn.pop', m.closest('section') || root);
      if (!c) return;
      const a = m.getBoundingClientRect(), b = c.getBoundingClientRect();
      if (!a.width || !b.width) return;
      const hx = b.left >= a.right ? b.left - a.right : a.left >= b.right ? a.left - b.right : 0;
      const vy = b.top >= a.bottom - 4 ? b.top - a.bottom : a.top >= b.bottom - 4 ? a.top - b.bottom : 0;
      const gaze = vy > 0 && vy >= hx ? (b.top >= a.bottom - 4 ? 'down' : 'up') : (b.left + b.right) / 2 >= (a.left + a.right) / 2 ? 'right' : 'left';
      if (!m.querySelector(`svg.g-${gaze}`)) m.innerHTML = GA.mascot.svg({ size: 64, gaze, mood: m.dataset.mood });
    });
  }

  /** the honest pace line (P1-45): 'Lessons left: 334 (146 h). At 1 lesson a day (about 26 min) that takes 334 days; about 88 days are left for
      lessons before the final fortnight. That does not fit.' + the one-tap fixes the planner computed (more lessons a day, the Crash course) */
  function paceLine(B, st, I) {
    const p = B.pace;
    if (!p) return '';
    const change = '<button type="button" class="pl-linkbtn" data-act="sheet" data-opener="pace">Change time or lessons a day</button>';
    if (!DATA.D.lessons.length) return `<p class="pl-pace">${icon('info')}<span>No lesson is written yet: new lessons join the plan as they are written.</span></p>`;
    if (p.allDone) return `<p class="pl-pace">${icon('check')}<span>${p.route ? `Every lesson on ${esc(routeName(p.route))} is done.` : 'Every lesson is done.'} The plan is now ${bankOk(DATA.D) ? 'revision, ICAI questions and mocks' : 'revision, flashcards and re-reads'}.</span></p>`;
    const what = p.route ? `Lessons left on ${esc(routeName(p.route))}` : 'Lessons left';
    const left = `${what}: <b>${U.nf(p.lessonsLeft)}</b> (${hours(p.minutesLeft)} h).`;
    const days = p.learnDays == null ? '' : p.learnDays > 0 ? ` about <b>${plural(p.learnDays, 'day')}</b> ${p.learnDays === 1 ? 'is' : 'are'} left for lessons before the final fortnight` : ' no days are left for lessons before the final fortnight';
    const at = p.perDayLessons
      ? ` At ${plural(p.perDayLessons, 'lesson')} a day (about ${minTxt(p.perDay)}) that takes <b>${plural(p.daysNeeded, 'day')}</b>;${days}.`
      : p.cap ? ` Today's revision leaves no time for a lesson;${days}.` : ` 'Lessons a day' is 0, so the plan adds no lessons;${days}.`;
    const verdict = p.fits ? '' : ' That does not fit.';
    const more = p.more ? `<button type="button" class="pl-linkbtn" data-lessons-set="${p.more.n}">Plan ${plural(p.more.n, 'lesson')} a day (about ${esc(minTxt(p.more.minutes))})</button>` : '';
    // the hours still to read on the route (lessons already finished are not counted again), beside the share of the marks the route covers
    const sug = p.suggest ? `<button type="button" class="pl-linkbtn" data-route-set="${esc(p.suggest.id)}">Follow the ${esc(p.suggest.title)} (${p.suggest.hours} h ${p.suggest.left < p.suggest.lessons ? 'left' : 'of lessons'}${p.suggest.share ? `, ${Math.round(p.suggest.share * 100)}% of the question marks` : ''})</button>` : '';
    return `<div class="pl-pace"><p>${icon('clock')}<span>${left}${at}${verdict}</span></p>
      <div class="pl-pace-a">${more}${sug}${change}</div></div>`;
  }

  /* ------------------------------------------------------------------ the Road card (P0-20, P2-39) */
  function roadCard(B, st, today) {
    const E = B.exam, ph = B.phases;
    if (!ph.length || E.daysLeft == null || E.daysLeft < 0) return '';
    const total = ph.reduce((a, p) => a + p.span, 0) || 1;
    const start = U.addDays(E.date, -(total - 1)), pos = Math.min(100, Math.max(0, (100 * U.daysBetween(start, today)) / total));
    const seg = ph.filter(p => p.span > 0).map(p => `<i class="pl-seg ${p.state}" style="flex:${p.span}" data-ftip="${esc(p.label + '\n' + (p.state === 'done' ? 'done · ended ' + day(p.to) : p.current ? plural(p.days, 'day') + ' left' : day(p.from) + ' → ' + day(p.to)))}"></i>`).join('');
    const row = p => `<li class="${p.state}"${p.current ? ' aria-current="step"' : ''}><b>${esc(p.label)}</b><span>${p.state === 'done' ? `done · ended ${esc(day(p.to))}` : p.current ? `${plural(p.days, 'day')} left · until ${esc(day(p.to))}` : `${esc(day(p.from))} → ${esc(day(p.to))} · ${plural(p.days, 'day')}`}</span></li>`;
    const basis = E.basis === 'assumed' ? `${firstDay(E) ? 'first' : 'next'} exam day, assumed` : E.basis === 'official paper day' ? 'the next Group II paper' : 'your exam day';
    const n = E.daysLeft, to = E.paper && E.paper.name ? E.paper.name : E.label;
    return `<section class="hb-card pl-road" aria-labelledby="pl-road-h"><h2 id="pl-road-h" class="sr">The road to ${esc(to)}</h2>
      <div class="big">${n === 0 ? 'Today' : U.nf(n)}<small>${n === 0 ? (E.paper ? `${esc(to)} is today` : `is a ${esc(E.label)} exam day`) : `${n === 1 ? 'day' : 'days'} to ${esc(to)}`}</small></div>
      <p class="pl-road-d">${esc(longDay(E.date))} · ${basis}${E.cycle && E.cycle.label ? ` · ${esc(E.cycle.label)}` : ''}</p>
      <div class="pl-bar" role="img" aria-label="${esc(ph.map(p => `${p.label}: ${p.state === 'done' ? 'done' : p.current ? p.days + ' days left' : p.days + ' days'}`).join('; '))}"><span class="pl-segs">${seg}</span><span class="pl-now" style="left:${pos.toFixed(2)}%" aria-hidden="true"></span></div>
      <ol class="pl-phs">${ph.map(row).join('')}</ol>
      <button type="button" class="hb-link sm" data-act="sheet" data-opener="road">Change the exam date ${icon('arrow-r')}</button></section>`;
  }

  /* ------------------------------------------------------------------ after the exam / between cycles (P2-72, P1-46) */
  function nextExamCard(B, st, D) {
    const E = B.exam, done = B.season === 'done', today = U.today();
    const up = (B.next && B.next.cycle !== undefined) ? B.next.cycle : choosable(D, E, today);
    const name = (B.next && B.next.label) || nextName(D, E, today);
    const txt = up ? `${esc(up.label)} runs ${esc(spanOf((up.days || []).filter(d => d >= today)))}. Choose your day and the plan starts again: Today, the road and the weekly focus come back.`
      : `${esc(name)} dates are not out yet. Pick a target date now and change it when ICAI announces them.`;
    return `<section class="hb-card pl-next" aria-labelledby="pl-next-h">${peak(done ? 'happy' : 'idle', 'right')}<div class="grow"><h2 id="pl-next-h">${done ? 'Next exam' : 'Your next exam'}</h2><p>${txt}</p></div>
      <button class="btn pop" type="button" data-act="sheet" data-opener="next">${icon('calendar')} ${up || done ? 'Set my next exam date' : 'Set a target date'}</button></section>`;
  }
  const spanOf = days => { const a = days[0], b = days[days.length - 1]; return a === b ? day(a) : `${day(a)} to ${day(b)}`; };
  /** 'Your season' (P2-72): the four phases of the season that ended, as a record with real counts (lessons finished, PYQ answers, tests) */
  function seasonCard(B, st) {
    const E = B.exam, rows = GA.planner.seasonRecord ? GA.planner.seasonRecord(st, E) : null;
    if (!rows) return '';
    // 'finished' for lessons and tests, 'answers' for raw answer counts (P3-27)
    const n = (k, one, many) => `<li><b>${U.nf(k)}</b> ${k === 1 ? one : many}</li>`;
    return `<section class="hb-sec" aria-labelledby="pl-season-h"><div class="hb-sh"><div><h2 id="pl-season-h">Your season</h2><p>What you did in each phase before ${esc(E.last.label)}, from your own records in this browser.</p></div></div>
      <div class="pl-season">${rows.map(r => `<div class="hb-card tight"><b>${esc(r.label)}</b><small>${r.from ? esc(day(r.from)) + ' → ' : 'until '}${esc(day(r.to))}</small><ul>${n(r.lessons, 'lesson finished', 'lessons finished')}${n(r.answers, 'answer', 'answers')}${n(r.tests, 'test finished', 'tests finished')}</ul></div>`).join('')}</div></section>`;
  }

  /* ------------------------------------------------------------------ weekly focus */
  function weeksSec(B, st, D) {
    if (!B.weeks.length) return '';
    const sum = Object.fromEntries(GA.stats.subjects(st, D, U.today()).map(x => [x.id, x]));
    const tr = w => `<tr><td><b>${w.n}</b></td><td>${esc(day(w.from))} – ${esc(day(w.to))}</td><td>${esc(GA.planner.PHASE_LABEL[w.phase] || '')}</td><td>${w.subjects.map(id => { const s = D.subjectById[id], m = sum[id]; return `<a class="hb-chip" href="#/s/${id}" aria-label="${esc(s.name + (m && m.mastery != null ? `, ${Math.round(m.mastery * 100)}% mastery` : ''))}">${glyph(id)}${esc(s.short)}${m && m.mastery != null ? ` · ${Math.round(m.mastery * 100)}%` : ''}</a>`; }).join('')}</td><td class="r">${w.lessonsLeft ? `${U.nf(w.lessonsLeft)} · ${minTxt(w.minutesLeft)}` : (bankOk(D) ? '<span class="faint">practise questions</span>' : '<span class="faint">revise</span>')}</td></tr>`;
    const head = '<thead><tr><th>Week</th><th>Dates</th><th>Phase</th><th>Focus papers</th><th class="r">Lessons left · est. time</th></tr></thead>';
    const first = B.weeks.slice(0, 3), rest = B.weeks.slice(3);
    return `<section class="hb-sec" aria-labelledby="pl-wk-h"><div class="hb-sh"><div><h2 id="pl-wk-h">Weekly focus</h2><p>The papers worth the most marks to you next, week by week: their share of Group II's marks × (1 − your mastery). They pick Today's practice rows; your lessons follow the learning order.</p></div></div>
      <div class="hb-card flush"><div class="tw"><table class="t pl-weeks">${head}<tbody>${first.map(tr).join('')}</tbody></table></div>
      ${rest.length ? `<details class="pl-more"><summary>Show all ${B.weeks.length} weeks to exam day ${icon('chev-d', 'chev')}</summary><div class="tw"><table class="t pl-weeks">${head}<tbody>${rest.map(tr).join('')}</tbody></table></div></details>` : ''}</div></section>`;
  }

  function howSec(D) {
    return `<details class="hb-card pl-how"><summary><span class="hb-ic sm">${icon('help')}</span>How this plan is made${icon('chev-d', 'chev')}</summary><div class="md ui sm">
      <p><b>Today's list</b> is built the first time you open the planner each day and then stays fixed: a finished task ticks off instead of being replaced. It is rebuilt the next day, or when you change your exam date, your daily time, 'Lessons a day', 'Questions a day' or your route, keeping what you have already done. Revision comes first (due flashcards, up to five notebook retries, a lesson due for a re-read), then the next lesson, the same one Home names, when it fits in your daily time, and more lessons from the same subject while your daily time and 'Lessons a day' allow, then past questions: in the Learn phase the questions on the lesson you just planned, in the Practise phase the topic most likely to cost you marks, then the week's focus subject. Nothing is planned past your daily time except revision that is due. On a mock day the mock comes first, and revision only while it fits beside it. A rebuild counts what you have already done against your daily time and the caps.</p>
      <p><b>Phases</b> follow the days left: Learn while more than 100 days remain, Practise from 100 to 46, Mock tests from 45 to 15 (a full mock every third day; when your daily time is shorter than its 3 hours, the mock is planned in parts of your daily time on consecutive days, since its clock runs only while the test is open, then two days of lessons), then the Final stretch for the last 14 days, when no new lessons are planned. The day before a paper is light revision; on a paper's day there is nothing new to study. Group II has three paper days, so the countdown moves on to the next paper after each one.${bankOk(D) ? '' : ' While the ICAI question bank is empty, the plan holds no practice sets and no mocks: those days go to lessons, flashcards and revision.'}</p>
      <p><b>Focus papers</b> are ranked by <i>(the paper's share of Group II's ${U.nf(U.sum(D.subjects.map(x => +x.marks || 0)))} marks: Paper 4 and Paper 5 100 each, Papers 6A and 6B 50 each) × (1 − your mastery)</i>; after each simulated week the leader's mastery is nudged up, so the focus rotates instead of repeating.</p>
      <p><b>The pace line</b> counts the lessons a day the list really holds ('Lessons a day', as many as fit in your daily time after revision and about 20 minutes kept for practice) and compares the days they take with the lesson days left: every day before the final fortnight except the mock days.</p></div></details>`;
  }

  /* ------------------------------------------------------------------ the exam date and daily time sheet (#/plan?set=exam, P1-46) */
  let sheet = null;
  function openSheet(done) {
    if (sheet) return;
    const D = DATA.D, st = GA.store.state, today = U.today(), E = GA.planner.examOf(st, D, today);
    const cyc = choosable(D, E, today), days = cyc ? (cyc.days || []).filter(d => d >= today) : [];
    const mins = st.profile.goals.minutes, les = st.profile.goals.lessons;
    const body = U.h('div.pl-sheet');
    const chip = (attr, v, label, on) => `<button type="button" class="pl-chip" ${attr}="${esc(v)}" aria-pressed="${on}">${esc(label)}</button>`;
    const mineHere = E.set && E.daysLeft != null && E.daysLeft >= 0;   // a set date that is still ahead (a passed one is not a choice for the next exam)
    const paperDays = !!(cyc && cyc.papers && Object.keys(cyc.papers).length);
    body.innerHTML = `${cyc && days.length ? `<fieldset class="pl-step"><legend>${esc(cyc.label)}: count down to</legend><div class="pl-chips">${chip('data-exam', '', paperDays ? 'Each paper in turn' : 'Not sure yet', !E.set)}${days.map(d => chip('data-exam', d, dayChip(cyc, d), mineHere && E.date === d)).join('')}</div>
        <p class="pl-src">${esc(cyc.label)}${cyc.group ? ` ${esc(cyc.group)}` : ''} paper days from <a href="${esc(cyc.source)}" target="_blank" rel="noopener">ICAI's announcement</a>${cyc.checked ? `, checked ${esc(U.fmtDay(cyc.checked))}` : ''}. ${esc(cyc.note || 'Dates as announced by ICAI; verify on icai.org')}</p></fieldset>`
        : `<p class="pl-src">${esc(nextName(D, E, today))} dates are not out yet. Pick a target date and change it when ICAI announces them.</p>`}
      <div class="pl-step"><label for="pl-date">${cyc && days.length ? 'Or pick any date' : 'Target date'}</label><input class="input" type="date" id="pl-date" min="${esc(today)}" value="${esc(mineHere ? E.date : '')}"></div>
      <fieldset class="pl-step"><legend>Time a day</legend><div class="pl-chips">${MINUTE_CHIPS.map(m => chip('data-min', m, minTxt(m), mins === m)).join('')}</div>
        <label class="pl-inline" for="pl-mins">Exact minutes <input class="input" type="number" inputmode="numeric" min="10" max="600" id="pl-mins" value="${esc(mins)}"></label></fieldset>
      <fieldset class="pl-step"><legend>Lessons a day</legend><div class="pl-chips">${LESSON_CHIPS.map(n => chip('data-les', n, String(n), les === n)).join('')}</div>
        <p class="pl-src">The most new lessons a day's list holds; your daily time still decides how many fit after revision.</p></fieldset>
      <p class="pl-saved" role="status" aria-live="polite"></p>`;
    let changed = false;
    const saved = txt => { changed = true; const el = U.$('.pl-saved', body); el.textContent = ''; setTimeout(() => (el.textContent = txt || 'Saved ✓'), 30); };
    const press = (attr, v) => U.$$(`[${attr}]`, body).forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === String(v))));
    body.addEventListener('click', e => {
      const ex = e.target.closest('[data-exam]'), mn = e.target.closest('[data-min]'), ls = e.target.closest('[data-les]');
      if (ex) { const v = ex.dataset.exam || null; setExam(v); press('data-exam', v || ''); U.$('#pl-date', body).value = v || ''; saved(v ? `Saved ✓ · ${longDay(v)}` : 'Saved ✓ · counting down to each paper in turn'); }
      if (mn) { const v = +mn.dataset.min; GA.actions.setGoals({ minutes: v }); press('data-min', v); U.$('#pl-mins', body).value = v; saved(`Saved ✓ · ${minTxt(v)} a day`); }
      if (ls) { const v = +ls.dataset.les; GA.actions.setGoals({ lessons: v }); press('data-les', v); saved(`Saved ✓ · up to ${plural(v, 'lesson')} a day`); }
    });
    U.$('#pl-date', body).addEventListener('change', e => { const v = e.target.value; if (/^\d{4}-\d\d-\d\d$/.test(v)) { setExam(v); press('data-exam', v); saved(`Saved ✓ · ${longDay(v)}`); } });
    U.$('#pl-mins', body).addEventListener('change', e => { const v = U.clamp(parseInt(e.target.value, 10) || 0, 10, 600); e.target.value = v; GA.actions.setGoals({ minutes: v }); press('data-min', v); saved(`Saved ✓ · ${minTxt(v)} a day`); });
    sheet = UI.modal({ title: 'Exam date and daily time', body, actions: [{ label: 'Done', kind: 'primary' }], onclose: () => { sheet = null; if (done) done(changed); } });
  }

  /* ------------------------------------------------------------------ the page */
  function render(out) {
    const D = DATA.D, S = GA.store, st = S.state, today = U.today();
    const I = GA.insights && GA.insights.get ? GA.insights.get() : null;
    if (GA.planner.current) GA.planner.current();              // keeps today's list in state.plan (a fresh list is stored once)
    const B = GA.planner.build(st, D, today, { I });
    const s = B.season, live = s === 'normal' || s === 'final';
    const setup = live && setupOn ? setupCard(B, st, D, I) : '';
    // on phones the setup card comes after Today, so the day's coral stays on the first screen (in the DOM too: reading order = what is shown)
    const narrow = !!(g.matchMedia && g.matchMedia('(max-width: 700px)').matches);
    let main;
    if (s === 'done' || s === 'between') main = `${nextExamCard(B, st, D)}${s === 'done' ? seasonCard(B, st) : ''}`;
    else if (s === 'eve' || s === 'day') main = `<div class="pl-top one">${todayCard(B, st, D, I)}</div>`;
    else main = `<div class="pl-top">${todayCard(B, st, D, I)}${narrow ? '' : roadCard(B, st, today)}</div>${narrow ? setup + `<div class="pl-top">${roadCard(B, st, today)}</div>` : ''}${s === 'normal' ? weeksSec(B, st, D) : ''}`;
    out.innerHTML = `<div class="hb pl" data-season="${s}">${header(B, st, D, today, I)}${narrow ? '' : setup}${main}<div class="hb-sec pl-howsec">${howSec(D)}</div></div>`;
    aimPeak(out);
  }

  /* focus after a re-draw: the control that was used (the same opener, chip or button in the new page), else Today's heading */
  const focusHead = out => { const h = U.$('#pl-today-h', out) || U.$('#pl-next-h', out) || U.$('h1', out); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } };
  function focusSel(out, sel) {
    const el = sel && U.$(sel, out);
    if (el && el.offsetParent !== null) { el.focus({ preventScroll: true }); return true; }
    focusHead(out); return false;
  }
  /** a CSS selector that finds the same control again after the page is re-drawn */
  function selOf(b) {
    if (!b || !b.getAttribute) return null;
    const esc2 = v => (g.CSS && CSS.escape ? CSS.escape(v) : String(v).replace(/["\\]/g, '\\$&'));
    for (const a of ['data-opener', 'data-act', 'data-exam', 'data-min', 'data-route', 'data-les']) {
      const v = b.getAttribute(a);
      if (v != null) return `${b.closest('.pl-setup') ? '.pl-setup ' : ''}[${a}="${esc2(v)}"]${a === 'data-act' && b.getAttribute('data-opener') == null ? ':not([data-opener])' : ''}`;
    }
    return null;
  }

  GA.views.plan = {
    enter(ctx, out) {
      GA.shell.crumbs([['Planner', '#/plan']]);
      setupTaps.exam = setupTaps.min = setupTaps.route = false;
      /* a sheet closed: re-draw only when something changed, then put focus back on its opener (the modal's own return target is gone after a
         re-draw); a sheet opened from the '?set=exam' link has no opener on this page, so focus goes to the header's button */
      const closed = sel => changed => {
        if (!out.isConnected) return;
        if (changed) render(out);
        if (changed || !document.activeElement || document.activeElement === document.body || !out.contains(document.activeElement)) focusSel(out, sel || '[data-opener="head"]');
      };
      setupOn = !flag('plan-setup');
      render(out);
      if (setupOn) { if (U.$('.pl-setup', out)) setFlag('plan-setup'); else setupOn = false; }   // shown once (P1-46)
      U.on(out, 'click', '[data-act="sheet"]', (e, b) => openSheet(closed(selOf(b))));
      U.on(out, 'click', '[data-act="more"]', (e, b) => {
        b.disabled = true;
        const v = GA.planner.addOne ? GA.planner.addOne() : null;
        if (!v) { UI.toast(bankOk(DATA.D) ? 'Nothing more to add today: practise any question set from the bank.' : 'Nothing more to add today.'); b.disabled = false; return; }
        render(out);
        const t = v.tasks[v.tasks.length - 1], row = t && U.$(`.pl-task[href="${g.CSS && CSS.escape ? CSS.escape(t.href) : t.href}"]`, out);
        say(`Added: ${t.title}`);
        if (row) row.focus({ preventScroll: false }); else focusHead(out);
      });
      U.on(out, 'click', '[data-exam]', (e, b) => { setExam(b.dataset.exam || null); tapped(out, b, 'exam'); });
      U.on(out, 'click', '[data-min]', (e, b) => { GA.actions.setGoals({ minutes: +b.dataset.min }); tapped(out, b, 'min'); });
      U.on(out, 'click', '[data-route]', (e, b) => { GA.actions.setProfile({ route: b.dataset.route || null }); tapped(out, b, 'route'); });
      U.on(out, 'click', '[data-route-set]', (e, b) => { GA.actions.setProfile({ route: b.dataset.routeSet }); render(out); focusHead(out); say('On route: Crash course. Today\'s list follows it.'); });
      U.on(out, 'click', '[data-lessons-set]', (e, b) => { const n = +b.dataset.lessonsSet; GA.actions.setGoals({ lessons: n }); render(out); focusHead(out); say(`Up to ${plural(n, 'lesson')} a day. Today's list has been updated.`); });
      U.on(out, 'click', '[data-act="setup-skip"]', () => { setupOn = false; setFlag('plan-setup'); render(out); focusHead(out); });
      U.on(out, 'click', '[data-act="routes"]', (e, b) => openRoutes(closed(selOf(b))));
      if (ctx.query && ctx.query.set === 'exam') {
        try { history.replaceState(history.state, '', location.href.split('#')[0] + '#/plan'); } catch (e) { /* the query stays: harmless */ }
        openSheet(closed('[data-opener="head"]'));
      }
    },
    leave() { if (sheet) { const s = sheet; sheet = null; s.close(); } }
  };

  /** a tap on the setup card (three taps, each saved at once: after the third the card goes; it never returns on a later visit) or on the
      header's day chips */
  function tapped(out, b, which) {
    const inSetup = !!b.closest('.pl-setup'), sel = selOf(b);
    if (inSetup) { setupTaps[which] = true; if (setupTaps.exam && setupTaps.min && setupTaps.route) { setupOn = false; setFlag('plan-setup'); say('Plan set up'); } }
    render(out);
    if (inSetup) { focusSel(out, sel); return; }
    // 'Which day is your paper?': the chips are gone once a day is chosen; Today (rebuilt for the new season) takes the focus
    if (which === 'exam') { const v = b.dataset.exam; focusHead(out); say(v ? `Exam day set: ${longDay(v)}. Today's list has been updated.` : 'No date chosen: the first remaining exam day is assumed.'); }
    else focusSel(out, sel);
  }

  /** 'Change' on the route line: the five starting points in a small sheet (Recommended clears the route, P1-06) */
  function openRoutes(done) {
    if (sheet) return;
    const st = GA.store.state, D = DATA.D, I = GA.insights && GA.insights.get ? GA.insights.get() : null, cur = st.profile.route || '';
    const body = U.h('div.pl-sheet');
    body.innerHTML = `<p class="pl-src">Your plan's lessons follow the route you pick; a lesson you have started always comes first.</p><div class="pl-chips col">${startingPoints(st, D, I).map(([id, label, sub]) => chip('data-route', id, label, cur === id, sub)).join('')}</div>`;
    let changed = false;
    body.addEventListener('click', e => { const b = e.target.closest('[data-route]'); if (!b) return; changed = (b.dataset.route || '') !== cur; GA.actions.setProfile({ route: b.dataset.route || null }); if (sheet) sheet.close(); });
    sheet = UI.modal({ title: 'Where to start', body, actions: [{ label: 'Close' }], onclose: () => { sheet = null; if (done) done(changed); } });
  }
})(typeof window !== 'undefined' ? window : globalThis);
