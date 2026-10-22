/* PassBook — settings (/settings) and the sources page (/about), owner WP6. Page plans: _audit/PROPOSAL.md §3 /settings and /about.
   Settings leads with backing up and moving (progress exists only in this browser): Your data first, built inside its own try/catch so a damaged
   profile can still be exported, imported or undone (P1-51); Import is a real button (P1-49) that checks the file and shows both sides before
   it replaces anything; storage used comes from string lengths (P0-12); on http(s) only, the hosted copy's lines (protection, offline copy,
   'Update ready · Restart', 'Save everything for offline': pwaLines, P2-49 and P1-58); then the exam day and daily time (chips from the exam cycle, P1-46),
   appearance, the demo profile, shortcuts, and Reset last. The one coral is Export once there is progress, Import on a fresh profile (D18).
   About counts papers the way the Tests hub does: '26 papers (1,690 questions) graded against the official key' (P0-21). Styles: hubs.css (.st-*, .ab-*). */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = n => GA.icon(n), UI = GA.ui, DATA = GA.data;
  GA.views = GA.views || {};
  const GOALS = [['minutes', 'Minutes a day', 'The planner fills this much time each day.', 600], ['lessons', 'Lessons a day', 'At most this many lessons on a day’s plan (up to 6).', 6],
    ['questions', 'Questions a day', 'At most this many past questions on a day’s plan.', 500], ['cards', 'New flashcards a day', 'New cards you start each day. Due reviews have no cap, except in the final fortnight: at most half of your daily minutes.', 500]];
  const kb = n => (n < 1024 * 10 ? (Math.round((n / 1024) * 10) / 10 || 0.1) + ' KB' : n < 1024 * 1024 ? Math.round(n / 1024) + ' KB' : (Math.round((n / 1048576) * 10) / 10) + ' MB');
  const longDay = k => U.fmtDay(k, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  /** '16 Oct, 14:02' through the shared formatter (P3-27: one month spelling everywhere) */
  const when = t => (U.fmtWhen ? U.fmtWhen(t, { year: false }) : new Date(t).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }));
  /** a day key or ISO stamp as '16 Oct 2026' (P3-42: never an ISO date on screen) */
  const dateTxt = v => { const k = typeof v === 'string' ? v.slice(0, 10) : ''; return /^\d{4}-\d\d-\d\d$/.test(k) ? U.fmtDay(k) : String(v || ''); };
  const web = () => typeof location !== 'undefined' && /^https?:$/.test(location.protocol);
  /** iOS or iPadOS Safari, not installed to the home screen (P2-49: the browser may clear its storage after 7 days away) */
  function iosSafariTab() {
    const n = g.navigator || {}, ua = n.userAgent || '';
    const ios = /iP(hone|od|ad)/.test(ua) || (n.platform === 'MacIntel' && n.maxTouchPoints > 1);
    const standalone = n.standalone === true || !!(g.matchMedia && g.matchMedia('(display-mode: standalone)').matches);
    return ios && /Safari\//.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua) && !standalone;
  }
  const setExam = v => GA.actions.setProfile(v ? { examDate: v, examSet: true } : { examDate: null, examSet: false });
  const touch = () => (GA.ui && typeof GA.ui.touch === 'boolean' ? GA.ui.touch : !!(g.matchMedia && g.matchMedia('(hover: none) and (pointer: coarse)').matches));

  /* ---------------------------------------------------------------- pure helpers (Node-tested in tests/settings.test.js) */
  /** what a state holds, for the data card and the import confirmation */
  function countsOf(st) {
    const o = x => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
    const q = o(st && st.q), ls = o(st && st.lessons);
    return { questions: Object.keys(q).filter(k => q[k] && q[k].n > 0).length, lessons: Object.keys(ls).filter(k => ls[k] && ls[k].done).length,
             tests: Array.isArray(st && st.tests) ? st.tests.length : 0, cards: Object.keys(o(st && st.cards)).length };
  }
  const anyProgress = c => !!(c.questions || c.lessons || c.tests || c.cards);
  const countsLine = c => `${U.plural(c.questions, 'question')} · ${U.plural(c.lessons, 'lesson')} · ${U.plural(c.tests, 'test')}`;
  /** P2-49: the quiet 'Not backed up yet' line after 7 active days without a backup (3 in iOS Safari, which may clear a site's storage) */
  function backupNudge(st, activeDays, ios) {
    const p = (st && st.profile) || {};
    if (p.lastExport) return null;
    const need = ios ? 3 : 7;
    return activeDays >= need ? { days: activeDays, need } : null;
  }
  /** P2-35 / D11: the categories of the latest sourced official CS result (the qualifying-mark line), with the learner's choice (default General) */
  function categoriesOf(D, st) {
    const rs = ((D && D.results) || []).filter(r => r && r.paper === 'CS' && r.qualifying && typeof r.qualifying === 'object');
    const yr = r => { const m = /\d{4}/.exec(String(r.exam)); return m ? +m[0] : 0; };
    const r = rs.sort((a, b) => yr(b) - yr(a))[0];
    if (!r) return null;
    const cats = Object.keys(r.qualifying), want = st && st.profile && st.profile.category;
    return { exam: r.exam, cats, pick: cats.indexOf(want) >= 0 ? want : cats.indexOf('General') >= 0 ? 'General' : cats[0], r };
  }
  /** the trust page's counts: papers graded against an official key are counted the way the Tests hub counts them (every question keyed) */
  function aboutCounts(D) {
    const papers = D.papers || [], keyed = papers.filter(p => p.n > 0 && p.keyed === p.n);
    const years = papers.map(p => p.year).filter(Boolean);
    return { papers: papers.length, questions: (D.questions || []).length, keyedPapers: keyed.length, keyedQuestions: papers.reduce((a, p) => a + (p.keyed || 0), 0),
             fromYear: years.length ? Math.min(...years) : null, toYear: years.length ? Math.max(...years) : null,
             unkeyed: papers.filter(p => !p.keyed).map(p => p.year).sort((a, b) => a - b),
             retrieved: papers.map(p => p.src && p.src.qp && p.src.qp.retrieved).filter(Boolean).sort().pop() || null };
  }
  /** P1-58 / P2-49: the hosted copy's lines in Your data (http(s) only; file:// has none). st = GA.pwa.status() (docs/ARCHITECTURE.md §10.12:
      {persisted, update, cached: {bytes, files}}, plus the optional all: {download, bytes, files} = the whole copy, network and on the device),
      or {persisted} from navigator.storage.persisted() before the hosted copy exists. o = {pwa, chars, touch, canAsk, saveAll}.
      Lines: 'On this phone: progress N KB · offline copy N MB · Protected | Not protected: …' (+ 'Keep my progress safe' when the browser can be
      asked), 'Update ready · Restart' while an update waits, and the opt-in 'Save everything for offline · 7.8 MB download · about 52 MB on this
      phone' (sizes only when status() gives them; 'Everything is saved for offline.' once the copy holds every file). */
  function pwaLines(st, o) {
    st = st || {}; o = o || {};
    const place = o.touch ? 'phone' : 'computer', P = !!o.pwa, all = st.all && typeof st.all === 'object' ? st.all : null, c = st.cached;
    const parts = [typeof o.chars === 'number' ? `progress ${kb(o.chars)}` : '', P ? `offline copy ${c && c.bytes > 0 ? kb(c.bytes) : 'not saved yet'}` : ''].filter(Boolean);
    const prot = st.persisted === true ? 'Protected' : st.persisted === false ? `Not protected: the browser may clear it if the ${place} runs out of space; Safari also after 7 days away. Install the app or keep a backup.`
      : 'This browser does not say whether it keeps your progress: keep a backup.';
    const out = [`<p class="st-small">${P ? `On this ${place}` : 'In this browser'}: ${parts.length ? esc(parts.join(' · ')) + ' · ' : ''}${esc(prot)}${st.persisted !== true && o.canAsk ? ' <button type="button" class="pl-linkbtn" id="st-keep">Keep my progress safe</button>' : ''}</p>`];
    if (P && st.update) out.push('<p class="st-small st-upd">Update ready · <button type="button" class="pl-linkbtn" id="pwa-restart">Restart</button></p>');
    if (P && o.saveAll) {
      const done = all && all.files > 0 && c && c.files >= all.files;
      out.push(done ? '<p class="st-small">Everything is saved for offline.</p>'
        : `<p class="st-small"><button type="button" class="pl-linkbtn" id="pwa-all">Save everything for offline</button>${all && all.download > 0 ? ` · ${esc(kb(all.download))} download${all.bytes > 0 ? ` · about ${esc(kb(all.bytes))} on this ${place}` : ''}` : ''}</p>`);
    }
    return out.join('');
  }
  /** where a paper's key comes from: a key PDF, the key printed inside the question paper (GATE 2020, P0-21), or none published */
  function keyCell(p) {
    const k = p.src && p.src.key, inPaper = p.keySrc === 'paper' || (!k && p.keyed > 0);
    if (inPaper) {
      const src = k || (p.src && p.src.qp) || {};
      const page = k && k.page ? '#page=' + k.page : '';
      const pp = k && k.note ? /pp?\.\s*[\d][\d–-]*/.exec(k.note) : null;          // 'key on pp. 17–18' → 'in the question-paper PDF, pp. 17–18'
      return { kind: 'paper', url: src.url ? src.url + page : null, wayback: k ? k.wayback : null, sha: src.sha256 || null, label: 'in the question-paper PDF' + (pp ? ', ' + pp[0] : '') };
    }
    if (k) return { kind: 'file', url: k.url, wayback: k.wayback, sha: k.sha256 || null, label: 'PDF' };
    return { kind: 'none', label: p.keyNote ? 'not published' : '—' };
  }

  /* ---------------------------------------------------------------- Settings */
  function head(S, st, E) {
    const last = st.profile.lastExport;
    const exam = E && E.date ? (E.basis === 'yours' ? (E.daysLeft < 0 ? `your exam date has passed (${esc(longDay(E.date))})` : `exam date set (${esc(longDay(E.date))})`) : E.basis === 'official paper day' ? `exam date: ${esc(E.paper ? E.paper.name : 'the official paper day')} (${esc(longDay(E.date))})` : `exam date assumed (${esc(longDay(E.date))})`) : 'no exam date';
    return `<header class="hb-head st-head"><div class="hb-head-t"><h1>Settings</h1>
      <p class="hb-sub">Everything lives in this browser${S.profile === 'demo' ? ' (the demo profile)' : ''}; nothing is sent anywhere · ${exam} · last backup: <b>${last ? esc(when(last)) : 'never'}</b></p></div></header>`;
  }

  function dataCard(S, st) {
    const c = countsOf(st), has = anyProgress(c), li = S.lastImport ? S.lastImport() : null;
    const u = S.usage ? S.usage() : null, mine = u ? u.chars : S.exportJSON().length;
    const spare = u ? u.keys.filter(k => !k.live && (k.kind === 'before-import' || k.kind === 'corrupt')) : [];
    const spareChars = spare.reduce((a, k) => a + k.chars, 0);
    const active = Object.keys(st.act || {}).filter(k => GA.stats.dayActive && GA.stats.dayActive(st.act[k])).length;
    const ios = web() && iosSafariTab(), nu = has ? backupNudge(st, active, ios) : null;
    const nudge = nu ? `<p class="st-small st-nudge" id="st-nudge">${icon('info')}<span>Not backed up yet · ${U.plural(nu.days, 'active day')} of progress live only in this browser${ios ? ', and Safari may clear it after 7 days away' : ''} · <button type="button" class="pl-linkbtn" data-act="export">Export</button></span></p>` : '';
    const tiles = has ? `${nudge}<div class="st-data"><div><b>${U.nf(c.questions)}</b><span>questions attempted</span></div><div><b>${U.nf(c.tests)}</b><span>tests finished</span></div><div><b>${U.nf(c.cards)}</b><span>cards seen</span></div><div><b>${U.nf(c.lessons)}</b><span>lessons done</span></div></div>`
      : `<p class="st-p">Nothing to back up yet. Studied in another browser or on another device? Import that backup here.</p>`;
    const usage = u ? `Storage used: <b>${kb(u.chars)}</b> of about ${kb(u.quota || 5242880)}${location.protocol === 'file:' ? ' shared by every local page in this browser' : ''}${spare.length ? ` · ${spare.length === 1 ? 'one spare copy' : spare.length + ' spare copies'} ${kb(spareChars)}` : ''}.`
      : `This profile takes about <b>${kb(mine)}</b>.`;
    // on a hosted copy (http(s)): whether the browser keeps this progress (P2-49, P1-58); file:// has no such line
    const pwa = web() || GA.pwa ? `<div class="st-pwa" id="st-pwa"><p class="st-small">${GA.pwa ? `Checking this ${touch() ? 'phone' : 'computer'}'s offline copy…` : 'Checking whether this browser keeps your progress…'}</p></div>${ios ? '<p class="st-small">Install: Share → Add to Home Screen. The installed app keeps its own progress, so export here first.</p>' : ''}` : '';
    return `<section class="hb-card st-sec st-datacard" aria-labelledby="st-data-h"><div class="hb-card-h"><span class="hb-ic">${icon('shield')}</span><div class="grow"><h2 id="st-data-h">Your data: back up and move</h2><p>Your progress exists only in this browser. Export a backup now and then; to move to another browser or device, export here and import there.</p></div></div>
      ${tiles}
      <div class="hb-acts"><button class="btn${has ? ' pop' : ''}" id="exp" type="button">${icon('download')} Export backup</button>
        <button class="btn${has ? '' : ' pop'}" id="imp-btn" type="button" aria-describedby="st-imp-note">${icon('upload')} Import backup</button><input type="file" id="imp" hidden tabindex="-1" aria-hidden="true">
        ${li ? `<button class="btn ghost" id="undo-imp" type="button">${icon('undo')} Undo last import · ${esc(when(li.at))}</button>` : ''}</div>
      <p class="st-small" id="st-imp-note">Importing replaces this ${S.profile === 'demo' ? 'demo ' : ''}profile with the file's progress; the current progress is kept aside first, so the import can be undone for 7 days.</p>
      <p class="st-small st-usage">${usage}${spare.length && S.dropKeys ? ` <button type="button" class="pl-linkbtn" id="free">Free space</button>` : ''}</p>${pwa}
      <p class="st-saved" role="status" aria-live="polite" id="st-data-live"></p></section>`;
  }

  function examCard(st, D, E) {
    const P = GA.planner, today = U.today(), ahead = E && E.daysLeft != null && E.daysLeft >= 0;
    // the days a learner can still choose (P2-72: after an exam they sat, the next cycle, never the rest of the same one)
    const cyc = (ahead && E.cycle) || (P && P.nextCycle ? P.nextCycle(D, E, today) : P ? P.cyclesOf(D).find(c => (c.days || []).some(d => d >= today)) : null) || null;
    const days = cyc ? (cyc.days || []).filter(d => d >= today) : [], p = st.profile;
    const next = P && P.nextLabel ? P.nextLabel(D, E, today) : (E && E.label) || 'The next CA Inter attempt';
    const paperOn = d => { const k = cyc && cyc.papers ? Object.keys(cyc.papers).filter(x => (cyc.papers[x] || []).includes(d)) : []; return k.length === 1 ? k[0].replace(/^P/, 'Paper ') + ' · ' : ''; };
    const each = !!(cyc && cyc.papers && Object.keys(cyc.papers).length);
    const tm = cyc && cyc.time, clock = hm => { const x = /^(\d{1,2}):(\d{2})$/.exec(hm || ''); if (!x) return hm || ''; const h = +x[1]; return `${h % 12 || 12}${x[2] === '00' ? '' : '.' + x[2]} ${h < 12 ? 'AM' : 'PM'}`; };
    const chips = days.length ? `<div class="st-exams" role="group" aria-label="${esc(cyc.label)} paper days"><button type="button" aria-pressed="${!E.set}" data-exam="">${each ? 'Each paper in turn' : 'Not sure yet'}</button>${days.map(d => `<button type="button" aria-pressed="${!!(ahead && E.set && E.date === d)}" data-exam="${d}">${esc(paperOn(d) + U.fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))}</button>`).join('')}</div>
      <small>${esc(cyc.label)}${cyc.group ? ' ' + esc(cyc.group) : ''} paper days from <a href="${esc(cyc.source)}" target="_blank" rel="noopener">ICAI's announcement</a>${cyc.checked ? `, checked ${esc(U.fmtDay(cyc.checked))}` : ''}${tm ? `; every paper ${esc(clock(tm.start))} to ${esc(clock(tm.end))} ${esc(tm.zone || '')}${tm.reading ? `, reading time from ${esc(clock(tm.reading))}` : ''}` : ''}. ${esc(cyc.note || 'Dates as announced by ICAI; verify on icai.org')}${E.set ? '' : E.date ? ` Until you choose, the countdown runs to ${E.basis === 'official paper day' ? esc(E.paper ? E.paper.name : 'the next paper') : 'the first remaining exam day'} (${esc(U.fmtDay(E.date))}) and moves on after each paper.` : ''}</small>`
      : `<small>${esc(next)} dates are not out yet. Pick a target date and change it when ICAI announces them.${E && E.set && E.date && !ahead ? ` Your last exam date was ${esc(U.fmtDay(E.date))}.` : ''}</small>`;
    const C = categoriesOf(D, st);
    const cat = C ? `<div class="st-f st-cat"><span class="st-lab" id="s-cat-l">Category for the qualifying mark</span><div class="st-exams" role="radiogroup" aria-labelledby="s-cat-l" id="s-cat">${C.cats.map(k => `<button type="button" role="radio" aria-checked="${k === C.pick}" tabindex="${k === C.pick ? 0 : -1}" data-cat="${esc(k)}">${esc(k)}</button>`).join('')}</div>
      <small>My progress draws the official ${esc(C.exam)} qualifying mark for this category as one reference line on your full-length scores. It is a reference, never a prediction.</small></div>` : '';
    return `<section class="hb-card st-sec" aria-labelledby="st-exam-h"><div class="hb-card-h"><span class="hb-ic">${icon('calendar')}</span><div class="grow"><h2 id="st-exam-h">Your exam and daily time</h2><p>The countdown, the planner and the flashcard schedule follow these.</p></div></div>
      <div class="st-grid"><div class="st-f"><label for="s-exam">Exam date</label><input class="input" type="date" id="s-exam" value="${esc(ahead && E.set && E.date ? E.date : '')}">${chips}</div>
        <div class="st-f"><label for="s-name">Your name (optional)</label><input class="input" id="s-name" value="${esc(p.name)}" placeholder="Shown on your progress page" autocomplete="nickname">${cat}</div></div>
      <div class="st-grid g4">${GOALS.map(([k, l, help, max]) => `<div class="st-f"><label for="g-${k}">${l}</label><input class="input" type="number" inputmode="numeric" min="0" max="${max}" id="g-${k}" data-goal="${k}" value="${esc(p.goals[k])}" aria-describedby="g-${k}-h"><small id="g-${k}-h">${help}</small></div>`).join('')}</div>
      <p class="st-saved" role="status" aria-live="polite" id="st-exam-live"></p></section>`;
  }

  /** single-key shortcuts on? (P3-17: the learner can turn them off; GA.ui.singleKeys reads profile.keys) */
  const singleOn = () => (GA.ui && typeof GA.ui.singleKeys === 'function' ? GA.ui.singleKeys() : true);
  const tHint = () => (touch() || !singleOn() ? '' : ' Press <kbd>t</kbd> anywhere to flip it.');
  const keysSub = () => (singleOn() ? 'Press <kbd>?</kbd> anywhere for this list.' : 'Single-key shortcuts are off; ⌘/Ctrl K and Esc still work.');
  function lookCard() {
    const theme = UI.themePref ? UI.themePref() : 'auto';
    return `<section class="hb-card st-sec" aria-labelledby="st-look-h"><div class="hb-card-h"><span class="hb-ic">${icon('sun')}</span><div class="grow"><h2 id="st-look-h">Appearance</h2><p>Auto follows your device's light or dark setting as it changes.<span id="st-t-hint">${tHint()}</span></p></div></div>
      <div class="hb-seg" id="s-theme" role="radiogroup" aria-label="Theme">${[['auto', 'Auto', 'refresh'], ['light', 'Light', 'sun'], ['dark', 'Dark', 'moon']].map(([k, l, ic]) => `<button type="button" role="radio" data-t="${k}" aria-checked="${theme === k}" tabindex="${theme === k ? 0 : -1}" class="${theme === k ? 'on' : ''}">${icon(ic)} ${l}</button>`).join('')}</div></section>`;
  }

  function demoCard(S) {
    if (S.profile === 'demo') return '';
    return `<section class="hb-card st-sec st-explore" aria-labelledby="st-demo-h"><div class="hb-card-h"><span class="hb-ic">${icon('eye')}</span><div class="grow"><h2 id="st-demo-h">Just exploring?</h2><p>The demo profile is a separate sandbox with synthetic activity, so you can see your progress page, analytics and notebook populated without touching your own progress.</p></div></div>
      <div class="hb-acts"><a class="btn" href="index.html?profile=demo#/settings">${icon('eye')} Open the demo profile</a></div></section>`;
  }

  function keysCard() {
    const single = GA.ui && typeof GA.ui.singleKeys === 'function';
    return `<details class="hb-card st-sec st-keysec"${touch() ? '' : ' open'}><summary><span class="hb-ic">${icon('keyboard')}</span><span class="grow"><b>Keyboard shortcuts</b><small id="st-keys-sub">${keysSub()}</small></span>${icon('chev-d', 'chev')}</summary>
      ${single ? `<label class="st-switch"><input type="checkbox" id="s-keys"${singleOn() ? ' checked' : ''} aria-describedby="s-keys-h"><span>Single-key shortcuts: <kbd>t</kbd>, <kbd>/</kbd>, <kbd>?</kbd> and <kbd>g</kbd> then a letter</span></label>
      <p class="st-switch-h" id="s-keys-h">Turn them off if you use voice control or often press keys by accident. ⌘/Ctrl K and Esc always work.</p>
      <p class="st-saved" role="status" aria-live="polite" id="st-keys-live"></p>` : ''}
      <div class="st-keys">${UI.keys().map(k => `<div><kbd>${esc(k.combo.replace(/^(Shift\+)?Mod\+(.+)$/, (m, sh, c) => (sh ? 'Shift ' : '') + '⌘/Ctrl ' + (c.length === 1 ? c.toUpperCase() : c)))}</kbd><span>${esc(k.desc)}</span></div>`).join('')}</div></details>`;
  }

  function dangerCard() {
    return `<section class="hb-card st-sec st-danger" aria-labelledby="st-danger-h"><div class="hb-card-h"><span class="hb-ic bad">${icon('trash')}</span><div class="grow"><h2 id="st-danger-h">Reset</h2><p>Deletes every attempt, note, test, flashcard schedule and lesson tick in this profile. Export a backup first if you might want it back.</p></div>
      <button class="btn ghost st-reset" id="reset" type="button">${icon('trash')} Reset all progress</button></div></section>`;
  }

  /* exporting: a download on desktops; on phones the share sheet with a .txt (Chromium refuses JSON file shares), falling back to the download */
  async function exportBackup(S) {
    const text = S.exportJSON(), name = `passbook-${S.profile === 'main' ? '' : S.profile + '-'}backup-${U.today()}`, size = kb(text.length);
    const nav = g.navigator, wantShare = touch() && nav && nav.share && nav.canShare && typeof File === 'function';
    if (wantShare) {
      try {
        const file = new File([text], name + '.txt', { type: 'text/plain' });
        if (nav.canShare({ files: [file] })) { await nav.share({ files: [file], title: 'PassBook backup' }); return 'Backup shared · ' + size; }
      } catch (e) { if (e && e.name === 'AbortError') return null; /* otherwise fall back to the download */ }
    }
    const a = U.h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: name + '.json' });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    return 'Backup file ready · ' + size;
  }

  /** check a backup before anything is replaced: the parsed file, or an error message for the learner */
  function readBackup(text, S) {
    let d = null;
    try { d = JSON.parse(text); } catch (e) { d = null; }
    if (!d || typeof d !== 'object' || d.app !== 'passbook' || !d.state || typeof d.state !== 'object' || Array.isArray(d.state)) return { error: 'This file is not a PassBook backup' };
    if (d.profile === 'demo' && S.profile !== 'demo') return { error: 'This backup is from the demo profile, so it only imports into the demo profile.' };
    return { d };
  }

  function render(out) {
    const S = GA.store, st = S.state, D = DATA.D, today = U.today();
    let E = null;
    try { E = GA.planner ? GA.planner.examOf(st, D, today) : null; } catch (e) { E = null; }
    const safe = (name, fn) => { try { return fn(); } catch (e) { if (typeof console !== 'undefined') console.error('settings ' + name + ':', e); return `<section class="hb-card st-sec st-broken"><p>This part of Settings could not be drawn from the saved data (${esc(e.message)}). Your data card still works: export, import or undo from there.</p></section>`; } };
    const demo = S.profile === 'demo' ? `<section class="hb-card st-demo"><span class="hb-ic">${icon('info')}</span><div class="grow"><b>You are in the demo profile.</b> It is separate from your real progress and can hold sample activity so you can explore every screen.</div><div class="hb-acts"><button class="btn primary" id="seed" type="button">Generate sample activity</button><a class="btn ghost" href="index.html#/settings">Leave demo</a></div></section>` : '';
    out.innerHTML = `<div class="hb st">${safe('head', () => head(S, st, E))}<div class="st-wrap">${safe('data', () => dataCard(S, st))}${demo}${safe('exam', () => examCard(st, D, E || { set: false }))}${safe('look', lookCard)}${safe('demo', () => demoCard(S))}${safe('keys', keysCard)}${safe('reset', dangerCard)}
      <p class="st-foot"><a href="#/about">Sources, method and credits</a> · Content updated ${esc(dateTxt(D.built))}</p></div></div>`;
  }

  /** after each render, on a hosted copy only (P2-49, P1-58): whether the browser keeps this progress, from navigator.storage.persisted()
      (read-only: never a prompt) or the wave-2 GA.pwa.status(), drawn by pwaLines(); 'Keep my progress safe' asks the browser, which may show
      its own prompt. A line whose status fails goes away rather than guessing. */
  function pwaLine(out, S) {
    const el = U.$('#st-pwa', out);
    if (!el) return;
    const nav = g.navigator, SM = nav && nav.storage, u = S.usage ? S.usage() : null, P = GA.pwa;
    const status = P && P.status ? Promise.resolve().then(() => P.status())
      : Promise.resolve().then(() => (SM && typeof SM.persisted === 'function' ? SM.persisted() : null)).then(p => ({ persisted: p === true ? true : p === false ? false : null }));
    status.then(st => {
      if (!st || !el.isConnected) return;
      el.innerHTML = pwaLines(st, { pwa: !!P, chars: u ? u.chars : null, touch: touch(), canAsk: !!(S.persist && SM && typeof SM.persist === 'function'), saveAll: !!(P && typeof P.saveAll === 'function') });
    }, () => { if (el.isConnected) el.textContent = ''; });
  }
  /* 'Update ready · Restart' appears while Settings is open (GA.pwa.on('update'), §10.12): one listener for the app's lifetime, aimed at the
     Settings page on screen (none after leave()) */
  let pwaView = null, pwaHooked = false;
  function watchPwa(out) {
    pwaView = out;
    if (pwaHooked || !GA.pwa || typeof GA.pwa.on !== 'function') return;
    pwaHooked = true;
    try { GA.pwa.on('update', () => { if (pwaView && pwaView.isConnected) pwaLine(pwaView, GA.store); }); } catch (e) { pwaHooked = false; }
  }
  /** the GA.ui.roving handles of the page's radio groups (re-made after each draw, let go of on leave) */
  const roving = [];
  const stopRoving = () => { while (roving.length) { try { roving.pop()(); } catch (e) { /* already gone */ } } };
  /** one tab stop for a radio-like group: arrows, Home and End move the focus and choose (P3-15; the fallback until GA.ui.roving exists) */
  function roveKey(e, b, sel, out, pickFn) {
    const all = U.$$(sel, out), i = all.indexOf(b);
    const n = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const j = n ? (i + n + all.length) % all.length : e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : -1;
    if (j < 0) return;
    e.preventDefault(); const t = all[j]; t.focus(); pickFn(t);
  }

  GA.views.settings = {
    enter(ctx, out) {
      const S = GA.store, D = DATA.D;
      GA.shell.crumbs([['Settings', '#/settings']]);
      // the theme and category radio groups: one tab stop each; arrows, Home and End move and choose (P3-15: GA.ui.roving, else roveKey below)
      const rove = () => { stopRoving(); if (UI.roving) ['#s-theme', '#s-cat'].forEach(sel => { const grp = U.$(sel, out); if (grp) roving.push(UI.roving(grp, { items: '[role="radio"]', orientation: 'both' })); }); };
      const draw = () => { render(out); pwaLine(out, S); rove(); };
      draw();
      watchPwa(out);
      const say = (id, txt) => { const el = U.$('#' + id, out); if (!el) return; el.textContent = ''; setTimeout(() => { el.textContent = txt; }, 30); };
      const on = (type, sel, fn) => U.on(out, type, sel, (e, el) => { try { fn(e, el); } catch (err) { if (typeof console !== 'undefined') console.error('settings:', err); UI.toast(err.message, 'bad'); } });
      /* your data: export, import (a real button for the hidden file input, P1-49), undo, free space */
      on('click', '#exp', async (e, b) => {
        b.disabled = true;
        try { const msg = await exportBackup(S); if (msg) { if (GA.actions.lastExport) GA.actions.lastExport(Date.now()); else GA.actions.setProfile({ lastExport: Date.now() }); draw(); UI.toast(msg, 'ok'); const nb = U.$('#exp', out); if (nb) nb.focus(); } }
        catch (err) { UI.toast('The backup could not be made: ' + err.message, 'bad'); }
        finally { if (b.isConnected) b.disabled = false; }
      });
      on('click', '[data-act="export"]', () => { const b = U.$('#exp', out); if (b) { b.focus(); b.click(); } });
      on('click', '#st-keep', (e, b) => {
        b.disabled = true;
        S.persist({ ask: true }).then(v => { pwaLine(out, S); UI.toast(v ? 'Protected: this browser keeps your progress' : 'The browser did not agree. Keep a backup, or install the app.', v ? 'ok' : undefined); }, () => { b.disabled = false; });
      });
      on('click', '#imp-btn', () => { const inp = U.$('#imp', out); if (inp) { inp.value = ''; inp.click(); } });
      on('change', '#imp', async e => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        try {
          const text = await f.text(), r = readBackup(text, S);
          if (r.error) { UI.toast(r.error, 'bad'); return; }
          const theirs = countsOf(r.d.state), mine = countsOf(S.state);
          const from = r.d.exported && !isNaN(new Date(r.d.exported)) ? U.fmtDay(U.dayKey(new Date(r.d.exported))) : 'an unknown date';
          const msg = `<span class="st-cmp"><b>Backup from ${esc(from)}</b><span>${esc(countsLine(theirs))}</span><b>This browser now</b><span>${esc(countsLine(mine))}</span></span>The backup replaces this ${S.profile === 'demo' ? 'demo ' : ''}profile. The current progress is kept aside, so you can undo the import for 7 days.`;
          if (!(await UI.confirm(msg, { ok: 'Replace with the backup', title: 'Import this backup?' }))) return;
          let res;
          try { res = S.importJSON(text); }
          catch (err) {
            if (!err || err.code !== 'no-room') throw err;
            // no room to keep a copy of the current progress (nothing changed): Export first, then, after a second yes, the import without the copy
            const again = await UI.confirm(`${esc(err.message)}<br><br>Export a backup of this browser’s progress first (Export backup, above). Then you can import without keeping a copy here: the current progress is replaced, and Undo last import has nothing to put back.`, { ok: 'Import without a copy', title: 'No room for a copy' });
            if (!again) return;
            res = S.importJSON(text, { noCopy: true });
          }
          await GA.router.resolve();                           // toast only once the re-drawn page is there (P1-51)
          const ok = !!U.$('#view .st'), skipped = res && typeof res.repaired === 'number' ? res.repaired : 0;
          UI.toast(ok ? `Progress imported · ${countsLine(theirs)}${skipped ? ` · ${U.plural(skipped, 'damaged entry', 'damaged entries')} skipped` : ''}` : 'The backup was imported, but this page could not show it. Use Undo last import if something looks wrong.', ok ? 'ok' : 'bad');
        } catch (err) { UI.toast(err && err.message ? err.message : 'The backup could not be imported.', 'bad'); }
      });
      on('click', '#undo-imp', async () => {
        if (!(await UI.confirm('This puts back the progress you had before the last import. The imported progress is kept aside in its place.', { ok: 'Undo the import', title: 'Undo last import?' }))) return;
        if (!S.undoImport()) UI.toast('There is nothing to undo, or no room to swap the copies.', 'bad');
      });
      on('click', '#free', async () => {
        const u = S.usage(), spare = u.keys.filter(k => !k.live && (k.kind === 'before-import' || k.kind === 'corrupt'));
        if (!spare.length) return;
        const list = spare.map(k => `${k.kind === 'corrupt' ? 'Unreadable saved data kept aside' : 'Progress kept aside before an import'}${k.at ? ' · ' + when(k.at) : ''} · ${kb(k.chars)}`).join('<br>');
        if (!(await UI.confirm(`${list}<br><br>A copy is downloaded first, then these spare copies are deleted from this browser. Your current progress is not touched.`, { ok: 'Download and delete', title: 'Free space?' }))) return;
        const dump = {}; spare.forEach(k => { try { dump[k.key] = g.localStorage.getItem(k.key); } catch (err) { /* unreadable: nothing to keep */ } });
        const a = U.h('a', { href: URL.createObjectURL(new Blob([JSON.stringify({ app: 'passbook', spare: dump }, null, 1)], { type: 'application/json' })), download: `passbook-spare-copies-${U.today()}.json` });
        document.body.append(a); a.click(); a.remove();
        const n = S.dropKeys(spare.map(k => k.key)).length;
        draw(); UI.toast(`${n === 1 ? 'One spare copy' : n + ' spare copies'} deleted`, 'ok');
      });
      on('click', '#pwa-restart', (e, b) => { b.disabled = true; Promise.resolve().then(() => GA.pwa.restart()).catch(err => { UI.toast((err && err.message) || 'The update could not start.', 'bad'); if (b.isConnected) b.disabled = false; }); });
      // the opt-in full offline copy: 'Saving…' while it downloads, then the toast and the line re-drawn with the new size (or the button back)
      on('click', '#pwa-all', (e, b) => {
        b.disabled = true; b.textContent = 'Saving…';
        Promise.resolve().then(() => GA.pwa.saveAll()).then(r => { UI.toast(`Saved for offline${r && r.bytes > 0 ? ' · ' + kb(r.bytes) : ''}`, 'ok'); pwaLine(out, S); },
          err => { UI.toast((err && err.message) || 'Not everything could be saved for offline.', 'bad'); if (b.isConnected) { b.disabled = false; b.textContent = 'Save everything for offline'; } });
      });
      /* exam day, name and daily goals: every change saves at once and says so */
      const pressExam = v => U.$$('[data-exam]', out).forEach(b => b.setAttribute('aria-pressed', String((b.dataset.exam || '') === (v || ''))));
      const pick = v => { setExam(v); const ex = U.$('#s-exam', out); if (ex) ex.value = v || ''; pressExam(v); say('st-exam-live', v ? `Saved ✓ · exam date ${longDay(v)}` : 'Saved ✓ · no date chosen: the first remaining exam day is assumed'); };
      on('change', '#s-exam', e => { if (/^\d{4}-\d\d-\d\d$/.test(e.target.value)) pick(e.target.value); else if (!e.target.value) pick(null); });
      on('click', '[data-exam]', (e, b) => pick(b.dataset.exam || null));
      on('change', '#s-name', e => { GA.actions.setProfile({ name: e.target.value.trim() }); say('st-exam-live', 'Saved ✓ · name'); });
      on('change', '[data-goal]', (e, el) => { const k = el.dataset.goal, G = GOALS.find(x => x[0] === k) || [k, k, '', 500], v = U.clamp(parseInt(el.value, 10) || 0, 0, G[3]); el.value = v; GA.actions.setGoals({ [k]: v }); say('st-exam-live', `Saved ✓ · ${G[1].toLowerCase()}: ${v}`); });
      /* the qualifying-mark category (P2-35, D11): one radio group */
      const pickCat = b => { GA.actions.setProfile({ category: b.dataset.cat }); U.$$('#s-cat [data-cat]', out).forEach(x => { const on2 = x === b; x.setAttribute('aria-checked', String(on2)); x.tabIndex = on2 ? 0 : -1; }); say('st-exam-live', `Saved ✓ · category: ${b.dataset.cat}`); };
      on('click', '#s-cat [data-cat]', (e, b) => pickCat(b));
      if (!UI.roving) on('keydown', '#s-cat [data-cat]', (e, b) => roveKey(e, b, '#s-cat [data-cat]', out, pickCat));
      /* appearance: one radio group (arrows move and choose) */
      const pickTheme = b => {
        const t = b.dataset.t;
        if (UI.setTheme) UI.setTheme(t); else { GA.actions.setProfile({ theme: t }); UI.applyTheme(t); }
        U.$$('#s-theme button', out).forEach(x => { const on2 = x === b; x.classList.toggle('on', on2); x.setAttribute('aria-checked', String(on2)); x.tabIndex = on2 ? 0 : -1; });
      };
      on('click', '#s-theme [data-t]', (e, b) => pickTheme(b));
      if (!UI.roving) on('keydown', '#s-theme [data-t]', (e, b) => roveKey(e, b, '#s-theme [data-t]', out, pickTheme));
      on('change', '#s-keys', e => {
        const v = !!e.target.checked;
        GA.actions.setProfile({ keys: v });
        const sub = U.$('#st-keys-sub', out), th = U.$('#st-t-hint', out);
        if (sub) sub.innerHTML = keysSub();
        if (th) th.innerHTML = tHint();
        say('st-keys-live', v ? 'Saved ✓ · single-key shortcuts on' : 'Saved ✓ · single-key shortcuts off');
      });
      on('click', '#reset', async () => { if (await UI.confirm('This deletes every attempt, note, test, flashcard schedule and lesson tick in this profile. Export a backup first if you might want it back.', { ok: 'Delete everything', danger: true, title: 'Reset all progress?' })) { S.reset(); UI.toast('Progress reset'); GA.router.resolve(); } });
      on('click', '#seed', async (e, sd) => { sd.disabled = true; sd.textContent = 'Generating…'; await U.loadScript('app/js/core/demo.js'); await GA.demo.seed(S, D); UI.toast('Sample activity created', 'ok'); GA.router.go('/progress'); });
    },
    leave() { stopRoving(); pwaView = null; }
  };

  /* ---------------------------------------------------------------- About: sources and method */
  function srsSentence(st, D) {
    const SRS = GA.srs;
    if (!SRS || typeof SRS.capFor !== 'function') return 'uses an SM-2-style schedule with Again / Hard / Good / Easy, an ease factor between 1.3 and 3.0, and every interval capped at half the days left before your exam so that nothing is first reviewed after GATE.';
    let E = null; try { E = GA.planner.examOf(st, D, U.today()); } catch (e) { E = null; }
    // P2-37: the one wording of the cap rule (SRS.capText, checked against review() in tests/srs.test.js), with the final fortnight's exceptions
    if (typeof SRS.capText === 'function') {
      try { const T = SRS.capText(E, typeof SRS.minutesOf === 'function' ? SRS.minutesOf(st) : undefined);
        if (T && T.rule) return `uses an SM-2-style schedule with Again / Hard / Good / Easy and an ease factor between 1.3 and 3.0. ${esc(T.rule)} ${esc(T.now || '')}`.trim(); } catch (e) { /* the older sentence below */ }
    }
    const cap = E ? SRS.capFor(E.daysLeft) : null;
    const now = cap != null ? `Right now the longest gap is ${U.plural(cap, 'day')}, so every card you review today comes back before ${esc(E.label)}.`
      : E && E.daysLeft === 1 ? `Tomorrow is ${esc(E.label)}: cards you review today come back after it.` : E && E.daysLeft === 0 ? `${esc(E.label)} is today: reviews follow their natural spacing.` : 'No exam ahead: reviews follow their natural spacing.';
    return `uses an SM-2-style schedule with Again / Hard / Good / Easy and an ease factor between 1.3 and 3.0. While your exam is more than a day away, a review is never scheduled later than half the days left, so cards come back before your first paper; the interval you earned is kept, so a card capped this way still counts as learned. ${now}`;
  }

  /** the answer-key disputes (P2-48): listed, never resolved — each question with its paper, printed number and subject */
  function disputeRows(D, I) {
    let list = [];
    try { list = I && I.disputes ? I.disputes() : []; } catch (e) { list = []; }
    const P = GA.pyqLib, paper = id => (D.papers || []).find(p => p.id === id);
    return list.map(d => {
      const q = D.qById && D.qById[d.id], pp = paper(d.paper), sj = D.subjectById && D.subjectById[d.subject];
      const no = q ? (P && P.printed ? P.printed(q) : `${q.section === 'GA' ? 'GA ' : ''}Q${q.no}`) : d.id;
      return { id: d.id, href: d.href || '#/q/' + encodeURIComponent(d.id), label: `${pp ? pp.label : d.paper} · ${no}`, subject: sj ? sj.name : '', year: d.year };
    }).sort((a, b) => (b.year || 0) - (a.year || 0) || (a.label < b.label ? -1 : 1));
  }
  /** a cycle's exam days as one phrase: '6–7, 13–14 and 20–21 Feb 2027' */
  function daysTxt(days) {
    const ds = (days || []).filter(d => /^\d{4}-\d\d-\d\d$/.test(d)).sort();
    if (!ds.length) return '';
    const runs = [];
    ds.forEach(d => { const r = runs[runs.length - 1]; if (r && U.daysBetween(r[r.length - 1], d) === 1) r.push(d); else runs.push([d]); });
    const one = ds.every(d => d.slice(0, 7) === ds[0].slice(0, 7));
    const part = r => { const a = r[0], b = r[r.length - 1], da = +a.slice(8), db = +b.slice(8); return one ? (a === b ? String(da) : `${da}–${db}`) : a === b ? U.fmtDay(a, { day: 'numeric', month: 'short' }) : `${U.fmtDay(a, { day: 'numeric', month: 'short' })}–${U.fmtDay(b, { day: 'numeric', month: 'short' })}`; };
    const ps = runs.map(part), list = ps.length > 1 ? ps.slice(0, -1).join(', ') + ' and ' + ps[ps.length - 1] : ps[0];
    return one ? `${list} ${U.fmtDay(ds[0], { month: 'short', year: 'numeric' })}` : `${list} ${ds[ds.length - 1].slice(0, 4)}`;
  }

  GA.views.about = {
    enter(ctx, out) {
      const D = DATA.D, st = GA.store.state, A = aboutCounts(D);
      GA.shell.crumbs([['Sources & method', '#/about']]);
      const link = (u, t, wb) => (u ? `<a href="${esc(wb ? `https://web.archive.org/web/${wb}/${u}` : u)}" target="_blank" rel="noopener">${t}</a>` : '—');
      let I = null; try { I = GA.insights && GA.insights.get ? GA.insights.get() : null; } catch (e) { I = null; }
      const disputes = disputeRows(D, I);
      const keyTd = p => {
        const k = keyCell(p);
        if (k.kind === 'paper') return `${link(k.url, esc(k.label), k.wayback)}${k.sha ? `<br><code class="small">${esc(k.sha.slice(0, 12))}…</code>` : ''}`;
        if (k.kind === 'file') return `${link(k.url, 'PDF', k.wayback)}${k.sha ? `<br><code class="small">${esc(k.sha.slice(0, 12))}…</code>` : ''}`;
        return `<span class="muted">${esc(k.label)}</span>`;
      };
      const span = A.unkeyed.length ? (A.unkeyed.length > 1 ? `${A.unkeyed[0]}–${A.unkeyed[A.unkeyed.length - 1]}` : String(A.unkeyed[0])) : '';
      // papers: newest first, the first six, then 'Show all' (the page plan)
      const papers = D.papers.slice().sort((a, b) => b.year - a.year || b.set - a.set);
      const head = '<thead><tr><th>Paper</th><th>Organiser</th><th class="r">Q</th><th>Question paper</th><th>Answer key</th><th>Retrieved</th><th>Review status</th></tr></thead>';
      const tr = p => `<tr><td><b>${esc(p.label)}</b></td><td>${esc(p.organiser)}</td><td class="r">${p.n}</td><td>${link(p.src.qp && p.src.qp.url, 'PDF', p.src.qp && p.src.qp.wayback)}${p.src.qp ? `<br><code class="small">${esc(p.src.qp.sha256.slice(0, 12))}…</code>` : ''}</td><td>${keyTd(p)}</td><td>${esc(p.src.qp && p.src.qp.retrieved ? U.fmtDay(p.src.qp.retrieved) : '')}</td><td>${icon('check')} ${p.verified} verified${p.review ? ` · ${p.review} under review` : ''}</td></tr>`;
      const first = papers.slice(0, 6), rest = papers.slice(6);
      const cycles = GA.planner && GA.planner.cyclesOf ? GA.planner.cyclesOf(D) : [];
      const subjects = D.subjects || [], groupMarks = U.sum(subjects.map(x => +x.marks || 0));
      const sylUrl = id => ({ cma: 'https://resource.cdn.icai.org/92179bos-aps5086-int-p4.pdf', aud: 'https://resource.cdn.icai.org/92180bos-aps5086-int-p5.pdf',
        fm: 'https://resource.cdn.icai.org/92181bos-aps5086-int-p6a.pdf', sm: 'https://resource.cdn.icai.org/92182bos-aps5086-int-p6b.pdf' })[id];
      const sylList = subjects.map(x => `<li><b>${esc(x.paper ? x.paper.replace(/^P/, 'Paper ') : x.short)}</b> ${esc(x.name)}, ${U.nf(+x.marks || 0)} marks${sylUrl(x.id) ? ` · <a href="${esc(sylUrl(x.id))}" target="_blank" rel="noopener">ICAI syllabus PDF</a>` : ''}</li>`).join('');
      const tm = cycles[0] && cycles[0].time, clock = hm => { const x = /^(\d{1,2}):(\d{2})$/.exec(hm || ''); if (!x) return hm || ''; const h = +x[1]; return `${h % 12 || 12}${x[2] === '00' ? '' : '.' + x[2]} ${h < 12 ? 'AM' : 'PM'}`; };
      const paperDay = (c, d) => { const k = c.papers ? Object.keys(c.papers).filter(x => (c.papers[x] || []).includes(d)) : []; return k.length === 1 ? `${k[0].replace(/^P/, 'Paper ')} on ${U.fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}` : U.fmtDay(d); };
      const dates = cycles.map(c => `<li><b>${esc(c.label)}</b>${c.group ? ` ${esc(c.group)}` : ''}${c.organiser ? ` (${esc(c.organiser)})` : ''}: ${esc(c.days.map(d => paperDay(c, d)).join(', '))}${c.time ? `, ${esc(clock(c.time.start))} to ${esc(clock(c.time.end))} ${esc(c.time.zone || '')}${c.time.reading ? ` with reading time from ${esc(clock(c.time.reading))}` : ''}` : ''}${c.result ? `; results due ${esc(U.fmtDay(c.result))}` : ''}. From <a href="${esc(c.source)}" target="_blank" rel="noopener">ICAI's announcement</a>${c.checked ? `, checked ${esc(U.fmtDay(c.checked))}` : ''}; ${esc((c.note || 'Dates as announced by ICAI; verify on icai.org').replace(/^./, x => x.toLowerCase()))}</li>`).join('');
      const bank = A.papers > 0;
      const bankLine = (UI.str && UI.str.bankEmpty) || 'ICAI past papers, RTPs and MTPs are being added';
      const headLine = bank
        ? `<b>${A.papers}</b> ICAI papers (${A.fromYear}–${A.toYear}) · <b>${U.nf(A.questions)}</b> questions from them${disputes.length ? ` · ${U.plural(disputes.length, 'disputed answer')} listed, never changed` : ''}${A.retrieved ? ` · files retrieved ${esc(U.fmtDay(A.retrieved))}` : ''}. Every file below carries its SHA-256 fingerprint.`
        : `Lessons follow ICAI's syllabus and Study Material for CA Intermediate Group II (new scheme) · exam dates from ICAI's own announcement · ${esc(bankLine)}.`;
      out.innerHTML = `<div class="hb ab"><header class="hb-head ab-head"><div class="hb-head-t"><h1>Sources, method and credits</h1>
        <p class="hb-sub">${headLine}</p></div>
        <div class="hb-acts"><a class="btn pop" href="#/syllabus">${icon('book')} Open the syllabus</a></div></header>
        <div class="ab-wrap">
        <section class="hb-card md ui" aria-labelledby="ab-syl-h"><h2 id="ab-syl-h">The syllabus</h2><p>The app's tree of papers, chapters and sub-topics follows ICAI's syllabus for the CA Intermediate course (new scheme), Group II: ${U.nf(subjects.length)} papers worth ${U.nf(groupMarks)} marks (Paper 6 is Papers 6A and 6B together, 100 marks).</p>
          <ul class="ab-dates">${sylList}</ul>
          <p>The chapters and their order follow the ICAI Study Material for the January 2027 attempt, with ICAI's applicability notice for that attempt. <b>To pass</b> Group II you need 40 marks in each paper and 300 × 50% = 150 marks in the group's aggregate; this app states the rule and never predicts a score.</p></section>
        <section class="hb-card md ui" aria-labelledby="ab-ex-h"><h2 id="ab-ex-h">Exam dates</h2>
          ${dates ? `<ul class="ab-dates">${dates}</ul>` : '<p>No exam dates are loaded.</p>'}
          <p class="muted small">Your admit card is the final word on your paper days; set a different date in <a href="#/plan?set=exam">Exam date &amp; daily time</a>.</p></section>
        <section class="hb-card md ui" aria-labelledby="ab-src-h"><h2 id="ab-src-h">How the lessons are written</h2><p>Every lesson is written from the <b>ICAI Study Material</b> for the attempt: definitions, Standards on Auditing, lists, formats and formulas follow ICAI's wording and order, and version-sensitive facts (sections, rules, thresholds) carry a note to verify them against the Study Material and the Statutory Update for your attempt. Worked examples use this app's own company, numbers and facts, modelled on how ICAI's past papers, RTPs and MTPs ask; every number in them is computed, not typed. Self-check questions and flashcards are original.</p>
          <p><b>The ICAI question bank.</b> ${bank ? `Questions come from ICAI's own papers, RTPs and MTPs, with ICAI's suggested answers.` : `${esc(bankLine)}. Until they are, the question bank, tests and the practice parts of the lessons say so instead of showing anything made up.`}</p></section>
        ${bank && disputes.length ? `<section class="hb-card md ui ab-disp" aria-labelledby="ab-disp-h"><h2 id="ab-disp-h">Disputed answers (${disputes.length})</h2>
          <p>In ${U.plural(disputes.length, 'question')} our worked answer differs from the published one. They stay listed here and are never resolved by this site.</p>
          <ul class="ab-list">${disputes.map(d => `<li><a href="${esc(d.href)}">${esc(d.label)}</a>${d.subject ? ` <span class="muted">· ${esc(d.subject)}</span>` : ''}</li>`).join('')}</ul></section>` : ''}
        ${bank ? `<section class="hb-card flush ab-papers" aria-label="The ${A.papers} papers and their files"><div class="tw"><table class="t">${head}<tbody>${first.map(tr).join('')}</tbody></table></div>
          ${rest.length ? `<details class="pl-more"><summary>Show all ${A.papers} papers ${icon('chev-d', 'chev')}</summary><div class="tw"><table class="t">${head}<tbody>${rest.map(tr).join('')}</tbody></table></div></details>` : ''}</section>` : ''}
        <section class="hb-card md ui" id="mastery" aria-labelledby="ab-num-h"><h2 id="ab-num-h">How mastery, completion and weak topics are computed</h2>
          <p><b>Topic mastery</b> blends up to three signals, re-weighted over whichever exist: <i>lessons</i> finished in the topic (30%), <i>practice</i> (55%) and <i>flashcards</i> (15%). Practice = recency-weighted accuracy on the latest answer to each ICAI question in the topic (half-life 45 days), smoothed with a neutral prior, then scaled down while you have attempted fewer than 8 questions; while the bank is empty, practice is simply absent. Flashcard strength is the forgetting-curve estimate of the cards you have seen (unseen cards count as zero). A topic you have not touched shows no mastery at all, never a made-up number.</p>
          <p><b>Paper mastery</b> is the topic average weighted by the marks ICAI questions have given each topic (every topic counts the same while the bank is empty). <b>Syllabus completion</b> counts a sub-topic as complete when its lesson is finished${bank ? ', or, where no lesson exists yet, when you have solved its questions at 60% or better' : ''}.</p>
          <p><b>Weak topics</b> need at least 3 attempted questions and a weighted accuracy under 75%; they are ranked by <i>(topic’s share of the question marks) × (1 − accuracy)</i>, an estimate of marks you are likely to lose.</p>
          <p><b>Spaced repetition</b> ${srsSentence(st, D)}</p></section>
        <section class="hb-card md ui" aria-labelledby="ab-cr-h"><h2 id="ab-cr-h">Credits and copyright</h2><p>Maths rendered with <a href="https://katex.org" target="_blank" rel="noopener">KaTeX</a> (MIT). Typefaces: Inter, Source Serif 4 and JetBrains Mono (SIL Open Font License), self-hosted. Everything else is plain HTML, CSS and JavaScript with no network access at run time.</p>
          <p class="muted small">The syllabus, Study Material, question papers, RTPs, MTPs and suggested answers are © The Institute of Chartered Accountants of India. This project is not affiliated with or endorsed by ICAI; always confirm the syllabus, applicability and exam rules on icai.org.</p></section></div></div>`;
    }
  };

  GA.settingsLib = { aboutCounts, keyCell, countsOf, readBackup, backupNudge, categoriesOf, disputeRows, daysTxt, pwaLines };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.settingsLib;
})(typeof window !== 'undefined' ? window : globalThis);
