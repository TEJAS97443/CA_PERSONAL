/* PassBook — application shell (v3): top nav with a sliding active marker, Me menu (a bottom sheet on phones), phone bottom tab bar,
   breadcrumbs under the nav, route table, keyboard shortcuts, boot. Spec: docs/FRONTEND_V3_SPEC.md §2; audit contract: docs/ARCHITECTURE.md §10.2.
   The tables at the top (NAV, ME, TABBAR, MORE, ALSO, ROUTES, FILE, DEPS, GO_KEYS) are plain data; tests/shell.test.js checks them against the view
   files on disk.
   Part B of the audit: the Me menu leads with the planner and carries neutral badges that show the size of today's step (P2-40, P3-29), Sources &
   method (P2-48), a 'More' group on phones with Me lit on Tests and Map (P2-45), and a header of real status lines (level, streak, assumed exam
   date, backup, moving devices; P2-38, P1-46, P2-49, P2-75) or the demo profile's own (P3-32); a live test cannot be left by g-keys, the logo or a
   crumb (P2-43); the nav folds in one order from its widest state (P2-44); a view's file, its dependencies and its data load together (P2-79);
   the '?' help lists this page's keys, the keys that work anywhere and the go-to keys (P2-46); GA.shell.notFound is the one not-found card (P3-31).
   Wave 2 (WP16): the revision sheets' routes /rev and /rev/:subject (WP15's view, under Learn) with a 'Formula sheets' row in the Me menu; on a
   hosted copy (GA.pwa, app/js/core/pwa.js) the 'Update ready · Restart' line in the Me header and an 'Install app' row when the browser offers it. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util, icon = n => GA.icon(n), esc = s => U.esc(s);
  GA.views = GA.views || {};
  const Shell = (GA.shell = {});
  let refreshT = null, crumbParts = [];

  /* top nav tabs: [href, icon, label] */
  const NAV = [['/', 'home', 'Home'], ['/syllabus', 'book', 'Learn'], ['/pyq', 'target', 'Questions'], ['/test', 'timer', 'Tests'], ['/labs', 'flask', 'Labs'], ['/map', 'map', 'Map']];
  /* the Me menu: [href, icon, label, badge key]. The planner, the daily loop, comes first (P2-40); badges are neutral (P3-29) */
  const ME = [['/plan', 'calendar', 'Planner', 'plan'], ['/flash', 'cards', 'Flashcards', 'cards'], ['/notebook', 'notebook', 'Error notebook', 'nb'], ['/progress', 'gauge', 'My progress'],
    ['/wrapped', 'award', 'PassBook Wrapped'], ['/settings', 'settings', 'Settings'], ['/about', 'info', 'Sources & method']];
  /* Me-menu rows for pages that live under a nav tab (lit there, like MORE): the revision sheets belong to Learn (D12a, WP15), after the notebook */
  const STUDY = [['/rev', 'sigma', 'Formula sheets']];
  /* phone bottom tab bar (<= 700 px): four routes + the Me sheet */
  const TABBAR = [['/', 'home', 'Home'], ['/syllabus', 'book', 'Learn'], ['/pyq', 'target', 'Questions'], ['/labs', 'flask', 'Labs'], ['me', 'user', 'Me']];
  /* on phones Tests and Map live in the Me sheet's 'More' group, and the Me tab is lit on their pages (D6) */
  const MORE = [['/test', 'timer', 'Tests'], ['/map', 'map', 'Map']];
  /* extra path prefixes that light up a nav item (a lesson belongs to Learn, a question to the bank, a lab to the labs) */
  const ALSO = { '/syllabus': ['/s', '/l', '/rev'], '/pyq': ['/q'], '/labs': ['/lab'] };
  /* [pattern, view key] in match order */
  const ROUTES = [['/', 'home'], ['/map', 'map'], ['/progress', 'progress'], ['/syllabus', 'syllabus'], ['/s/:subject', 'subject'], ['/l/:id', 'lesson'],
    ['/rev', 'revise'], ['/rev/:subject', 'revise'], ['/pyq', 'pyq'], ['/q/:id', 'question'], ['/test', 'testhub'], ['/test/run/:id', 'testrun'], ['/test/result/:id', 'testresult'], ['/test/mark/:id', 'testmark'], ['/flash', 'flash'], ['/flash/:deck', 'flash'],
    ['/notebook', 'notebook'], ['/plan', 'plan'], ['/labs', 'labs'], ['/lab/:id', 'lab'], ['/wrapped', 'wrapped'], ['/settings', 'settings'], ['/about', 'about']];
  /* view key -> file in app/js/views/ (several views share one file) */
  const FILE = { home: 'home', map: 'map', progress: 'progress', syllabus: 'syllabus', subject: 'syllabus', lesson: 'lesson', pyq: 'pyq', question: 'pyq',
    testhub: 'test', testrun: 'test', testresult: 'test', testmark: 'test', flash: 'flash', notebook: 'notebook', plan: 'plan', labs: 'labs', lab: 'labs', wrapped: 'wrapped', settings: 'settings', about: 'settings',
    revise: 'revise' };
  const DEPS = { lesson: ['qcard'], pyq: ['qcard'], question: ['qcard'], testrun: ['qcard'], testresult: ['qcard'], testmark: ['qcard'], notebook: ['qcard'] };
  /* "g x" jumps, named by the tab labels (P2-12). 'g p' was taken by the question bank long ago, so My progress is 'g g'. */
  const GO_KEYS = [['g h', '/', 'Go to Home'], ['g s', '/syllabus', 'Go to Learn'], ['g p', '/pyq', 'Go to Questions'], ['g t', '/test', 'Go to Tests'], ['g l', '/labs', 'Go to Labs'],
    ['g m', '/map', 'Go to Map'], ['g r', '/plan', 'Go to Planner'], ['g f', '/flash', 'Go to Flashcards'], ['g n', '/notebook', 'Go to Error notebook'],
    ['g g', '/progress', 'Go to My progress'], ['g w', '/wrapped', 'Go to PassBook Wrapped'], ['g ,', '/settings', 'Go to Settings']];

  const isActive = (route, href) => {
    const hit = p => (p === '/' ? route === '/' : route === p || route.startsWith(p + '/'));
    return hit(href) || (ALSO[href] || []).some(hit);
  };
  /** the nav tab that owns a route (null for the Me pages) */
  const tabOf = route => { const t = NAV.find(([href]) => isActive(route, href)); return t ? t[0] : null; };
  const inMe = route => ME.some(([href]) => isActive(route, href));
  /** the phone tab bar's lit tab for a route: its own tab, else 'me' for the Me pages and the 'More' pages (Tests, Map), else null */
  const barTabOf = route => { const t = tabOf(route); return t && TABBAR.some(([h]) => h === t) ? t : (inMe(route) || MORE.some(([h]) => isActive(route, h)) ? 'me' : null); };
  const compiled = ROUTES.map(([pat]) => new RegExp('^' + pat.replace(/\/:[a-z]+/gi, '/[^/]+') + '/?$'));
  /** true when a route matches path (wave-1 owners prepare links to wave-2 screens with it: GA.shell.has('/rev/os')) */
  Shell.has = path => { const p = String(path || '').replace(/^#/, '').split('?')[0].split('#')[0] || '/'; return compiled.some(re => re.test(p)); };

  const LOGO = '<svg class="mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.8 9.8 17.2 19 7.2"/></svg>';     // the auditor's tick
  const AUTO = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" fill="currentColor" stroke="none"/></svg>';
  const MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');
  let curPath = null;                                 // the path on screen
  const route = () => curPath || (GA.router.current && GA.router.current.path) || '/';
  /** run fn and never let a malformed saved state stop the shell (P1-51): the shell must keep drawing so Settings, Import and Reset stay reachable */
  const safe = (fn, fallback) => { try { return fn(); } catch (e) { if (typeof console !== 'undefined') console.error('shell:', e); return fallback; } };
  /** a live test owns the screen (the runner sets body.in-exam) */
  const inExam = () => !!(typeof document !== 'undefined' && document.body && document.body.classList.contains('in-exam'));

  /* ------------------------------------------------------------------ breadcrumbs (small, under the nav; a view may host them in its own header with <nav data-crumbs>) */
  function paintCrumbs() {
    const parts = crumbParts, row = U.$('.crumbs-row');
    const host = U.$('#view [data-crumbs]');
    const html = parts.length > 1 ? parts.map((p, i) => (i === parts.length - 1 ? `<b aria-current="page">${esc(p[0])}</b>` : `<a href="${p[1]}">${esc(p[0])}</a>${icon('chev-r')}`)).join('') : '';
    if (host) { host.classList.add('tb-crumbs'); host.setAttribute('aria-label', 'Breadcrumb'); host.innerHTML = html; }
    const own = U.$('.crumbs-row .tb-crumbs');
    if (own) own.innerHTML = host ? '' : html;
    if (row) row.hidden = !!host || !html;
  }
  Shell.crumbs = parts => {
    crumbParts = parts || [];
    paintCrumbs();
    const last = crumbParts.length ? crumbParts[crumbParts.length - 1][0] : '';
    document.title = (last && last !== 'Home' ? last + ' · ' : '') + 'PassBook';
  };

  /** page layout for the current view: null (padded, max 1240 px) or 'bleed' (edge to edge; use .sec inside). Reset on every navigation. */
  Shell.layout = mode => {
    const v = U.$('#view'), sh = U.$('.shell');
    if (!v) return;
    if (mode) { v.dataset.layout = mode; if (sh) sh.dataset.layout = mode; } else { delete v.dataset.layout; if (sh) delete sh.dataset.layout; }
  };

  /** the Me menu's badges: the size of today's step, never a running total (P3-29). cards = flashcards due; nb = today's retry batch, min(5, due);
      plan = the planner day's open tasks (GA.planner.current().left; 0 hides it) */
  function counts() {
    return safe(() => {
      const s = GA.store.state, d = GA.stats.due(s, GA.data.D, U.today()) || {};
      const cards = typeof d.cards === 'number' ? d.cards : d.cardIds ? d.cardIds.length : 0;
      const nbAll = Array.isArray(d.questions) ? d.questions.length : 0;
      let plan = 0;
      try { const P = GA.planner && typeof GA.planner.current === 'function' ? GA.planner.current() : null; plan = P && P.left > 0 ? P.left : 0; } catch (e) { plan = 0; }
      return { cards, nb: Math.min(5, nbAll), nbAll, plan };
    }, { cards: 0, nb: 0, nbAll: 0, plan: 0 });
  }

  /* ------------------------------------------------------------------ active state: tabs, sliding marker, tab bar, avatar */
  function placeMarker() {
    const nav = U.$('.tn'), ind = U.$('.tn-ind');
    if (!nav || !ind) return;
    const on = U.$('.tn-a.on', nav);
    if (!on || !on.offsetWidth) { ind.style.opacity = '0'; return; }
    const jump = ind.dataset.href !== on.dataset.href && ind.style.opacity === '1' ? false : true;   // slide only when the active tab changes; re-fits jump
    if (jump) ind.style.transition = 'none';
    ind.style.opacity = '1'; ind.style.width = on.offsetWidth + 'px'; ind.style.transform = `translateX(${on.offsetLeft}px)`;
    ind.dataset.href = on.dataset.href;
    if (jump) { void ind.offsetWidth; ind.style.transition = ''; }
  }
  function markActive() {
    const r = route(), tab = tabOf(r), me = inMe(r), bar = barTabOf(r);
    U.$$('.tn-a').forEach(a => { const on = a.dataset.href === tab; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    U.$$('.tabbar .tb-tab').forEach(a => { const k = a.dataset.href, on = k === 'me' ? bar === 'me' || isOpen() : k === bar && !isOpen(); a.classList.toggle('on', on); if (on && k !== 'me') a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    U.$$('.me-menu .mi[data-href]').forEach(a => { const on = isActive(r, a.dataset.href); a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const av = U.$('#me-btn'); if (av) av.classList.toggle('on', me);
    placeMarker();
  }

  /* ------------------------------------------------------------------ the Me header, badges, chips, avatar (debounced; runs on every store change and navigation) */
  const ST_ICON = { level: 'bolt', streak: 'flame', exam: 'calendar', backup: 'download', import: 'upload', install: 'download', demo: 'eye', update: 'refresh' };
  /** the exam-date line (P1-46): an assumed date is said so, with 'Set it'; null when the date is the learner's own */
  function examLine() {
    const S = GA.stats;
    if (!S || typeof S.exam !== 'function') return null;
    const E = S.exam(GA.store.state, GA.data.D.exam, U.today());
    if (E && E.basis === 'assumed') return { kind: 'exam', lead: `${E.label || 'Exam'} date assumed`, act: 'Set it', href: '#/plan?set=exam' };
    if (E && !E.date && !E.set) return { kind: 'exam', lead: `${E.label || 'Next exam'} dates are not out yet`, act: 'Pick a target date', href: '#/plan?set=exam' };
    return null;
  }
  /** iOS Safari on a hosted copy, not installed (P2-75): how to install, and that the installed app keeps its own progress */
  function installLine() {
    const env = GA.engage && typeof GA.engage.env === 'function' ? GA.engage.env() : null;
    if (!env || !env.web || !env.ios || env.standalone || env.demo) return null;
    return { kind: 'install', text: 'Install: Share → Add to Home Screen. The installed app keeps its own progress, so export here first.' };
  }
  /** a hosted copy's waiting update (P1-58): 'Update ready · Restart', or while a test is in progress when it will apply (GA.pwa.line()) */
  function updateLine() { return GA.pwa && typeof GA.pwa.line === 'function' ? safe(() => GA.pwa.line(), null) : null; }
  /** the Me header's status lines, in order: level and streak (GA.engage.meLines), the exam date, the backup nudge, the moving-devices line, the iOS
      install row, a hosted copy's waiting update; [] when there is nothing to say (the header then keeps its one static line) */
  function meStatus() {
    return safe(() => {
      const eng = GA.engage && typeof GA.engage.meLines === 'function' ? safe(() => GA.engage.meLines(), []) || [] : [];
      const head = eng.filter(l => l.kind === 'streak'), rest = eng.filter(l => l.kind !== 'level' && l.kind !== 'streak');   // no level line (2026-10-18)
      return head.concat([examLine()], rest, [installLine(), updateLine()]).filter(Boolean);
    }, []);
  }
  /** one status line: a link (href), an action button ('Export' runs the backup), or plain text */
  function lineHTML(l) {
    const ic = icon(ST_ICON[l.kind] || 'info');
    if (l.act && (l.href || l.action)) {
      const lead = esc(l.lead || String(l.text || '').replace(new RegExp('\\s*·?\\s*' + String(l.act).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'), ''));
      if (l.href) return `<a class="me-st" href="${esc(l.href)}" role="menuitem">${ic}<span>${lead} · <u>${esc(l.act)}</u></span></a>`;
      return `<button type="button" class="me-st" role="menuitem" data-me-act="${esc(l.action)}">${ic}<span>${lead} · <u>${esc(l.act)}</u></span></button>`;
    }
    if (l.href) return `<a class="me-st" href="${esc(l.href)}" role="menuitem">${ic}<span>${esc(l.text)}</span></a>`;
    return `<p class="me-st plain">${ic}<span>${esc(l.text)}</span></p>`;
  }
  /** the demo profile's own header (P3-32): what it holds, and the way back to your own progress */
  function demoState() {
    const st = GA.store.state, has = GA.stats && typeof GA.stats.hasProgress === 'function' ? !!safe(() => GA.stats.hasProgress(st), false) : true;
    return { has, label: has ? 'Demo profile · sample data' : 'Demo profile · empty' };
  }
  function paintMenu() {
    const c = counts();
    U.$$('.me-menu [data-badge]').forEach(el => {
      const k = el.dataset.badge, n = c[k] || 0;
      const say = !n ? '' : k === 'cards' ? `${U.plural(n, 'card')} due today` : k === 'nb' ? `${U.plural(n, 'question')} to retry today${c.nbAll > n ? ` (${U.nf(c.nbAll)} due in all)` : ''}` : `${U.plural(n, 'task')} left on today’s plan`;
      // the number for the eye, its words for a screen reader ('Flashcards, 10 cards due today', not 'Flashcards 10')
      const html = n ? `<span aria-hidden="true">${esc(k === 'plan' ? `${U.nf(n)} left` : U.nf(n))}</span><span class="sr">, ${esc(say)}</span>` : '';
      if (el.innerHTML !== html) el.innerHTML = html;
      el.hidden = !n;
      el.title = say;
    });
    U.$$('.me-menu [data-theme-pick]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.themePick === safe(() => GA.ui.themePref(), 'auto'))));
    const inst = U.$('#me-install'); if (inst) inst.hidden = !(GA.pwa && GA.pwa.installable);       // only when the browser offers its install prompt
    const who = U.$('#me-who'); if (!who) return;
    const demo = GA.store.profile === 'demo', lines = meStatus();
    let sub = 'Progress is saved in this browser', extra = '';
    if (demo) {
      const d = safe(demoState, { has: true });
      sub = d.has ? 'Sample data, kept apart from your real progress' : 'Empty: nothing recorded in this profile yet';
      extra = `<a class="me-st" role="menuitem" href="${esc(location.pathname)}#/">${icon('arrow-l')}<span><u>Leave demo profile</u></span></a>`;
    }
    const html = `<b>${demo ? 'Demo profile' : 'Your space'}</b>${lines.length && !demo ? '' : `<span>${esc(sub)}</span>`}` +
      (lines.length || extra ? `<div class="me-status" id="me-status">${extra}${lines.map(lineHTML).join('')}</div>` : '');
    if (who.dataset.html !== html) { who.innerHTML = html; who.dataset.html = html; }       // unchanged lines keep focus where it is
  }
  function paintAvatar() {
    const av = U.$('#me-btn .av'), name = safe(() => String(GA.store.state.profile.name || '').trim(), '');
    const ini = name ? name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() : 'ME';
    if (av) av.textContent = ini;
    // the button's name holds what it shows (P3-06, WCAG 2.5.3): 'ME' or the initials, then what the menu holds
    const btn = U.$('#me-btn'), label = `${ini === 'ME' ? 'Me' : ini + ', Me'}: planner, flashcards, notebook, progress, settings`;
    if (btn && btn.getAttribute('aria-label') !== label) btn.setAttribute('aria-label', label);
    const bar = U.$('.topbar');
    if (bar && GA.store.profile === 'demo') bar.dataset.demoLabel = safe(demoState, { label: 'Demo profile' }).label;
  }
  /* what the chips show; reading time alone can flip "active today" (10 minutes), so 'time' store changes repaint only when this changes */
  let chipSig = '', chipHTML = null;
  function chipsSig() {
    try { const c = GA.engage && GA.engage.current && GA.engage.current(); return c ? [c.streak.current, c.streak.activeToday, c.streak.freezes, c.xp.total, c.due.cards].join('|') : ''; } catch (e) { return ''; }
  }
  /** the chips slot stays empty (2026-10-18 UI refresh): no streak, XP or level chips in the top bar of a public study site. The Me menu keeps
      the streak and level lines and the Flashcards badge the cards due. true when the slot changed (the nav then re-fits) */
  function paintChips() {
    const el = U.$('#tb-chips'), bar = U.$('.topbar');
    if (!el) return false;
    chipSig = chipsSig();
    if (el.innerHTML) el.innerHTML = '';
    if (bar) bar.toggleAttribute('data-chips', false);
    const changed = el.innerHTML !== chipHTML; chipHTML = el.innerHTML;
    return changed;
  }

  /* ------------------------------------------------------------------ fitting the nav (P2-44): one fold order, run from the widest state
     chip labels compact → tab icons → the theme button (the Me menu keeps the picker) → the search label → the brand name → tighter tabs → the XP
     chip (the Me header shows the level) → the cards-due chip (the Flashcards badge shows it). A step is taken only while the bar's last item would
     pass the bar's right padding (or the bar scrolls); the 700 px phone switch stays in CSS. */
  const FIT = ['fit-1', 'fit-2', 'fit-3', 'fit-4', 'fit-5', 'fit-6', 'fit-7', 'fit-8'];
  function over(bar) {
    const cs = getComputedStyle(bar), limit = bar.getBoundingClientRect().right - (parseFloat(cs.paddingRight) || 0) + 0.5;
    let edge = 0;
    for (const c of bar.children) { const r = c.getBoundingClientRect(); if (r.width) edge = Math.max(edge, r.right); }
    return edge > limit || bar.scrollWidth > bar.clientWidth + 1;
  }
  function fit() {
    const bar = U.$('.topbar');
    if (!bar) return;
    bar.classList.remove(...FIT);
    let n = 0;
    for (const c of FIT) { if (!over(bar)) break; bar.classList.add(c); n++; }
    bar.dataset.fit = String(n);
  }
  Shell._over = over; Shell._fit = fit;
  function repaint() {
    safe(paintAvatar); const moved = safe(paintChips, true), first = !U.$('.topbar[data-fit]');
    // the Me header's lines also tell the phone bar to drop its 'Lv' chip once the header carries the level (GA.engage sets data-eg-me); the
    // level line can only appear when the chips change (the first XP), so it is asked then, at boot and whenever the menu paints
    if (moved || first) safe(() => GA.engage && typeof GA.engage.meLines === 'function' && GA.engage.meLines());
    if (moved || first) safe(fit);
    safe(markActive); safe(paintSave);
    if (isOpen()) safe(paintMenu);
  }
  function refresh() { clearTimeout(refreshT); refreshT = setTimeout(repaint, 120); }
  Shell.refresh = refresh;
  /* 'time' changes (time on task, every few seconds while reading) are throttled to one chip check a minute */
  let timeAt = 0, timeT = null;
  function onTime() {
    if (timeT) return;
    timeT = setTimeout(() => { timeT = null; timeAt = Date.now(); if (chipsSig() !== chipSig) { if (safe(paintChips, true)) safe(fit); safe(placeMarker); } }, Math.max(0, 60000 - (Date.now() - timeAt)));
  }
  Shell._onTime = onTime;

  /* ------------------------------------------------------------------ downloads (backups, saved data) without a network: a Blob link */
  Shell.download = function (name, text, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text == null ? '' : String(text)], { type: type || 'application/json' }));
    a.download = name; a.hidden = true; document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  };
  const stamp = () => U.today();
  /** Export backup: the same JSON Settings exports (the banner, the Me header's backup nudge) */
  Shell.exportBackup = function () {
    const name = `passbook-backup-${stamp()}.json`;
    Shell.download(name, GA.store.exportJSON());
    if (GA.actions && typeof GA.actions.lastExport === 'function') safe(() => GA.actions.lastExport());
    const S = GA.ui && GA.ui.str;
    GA.ui.toast(S && typeof S.backupDownloaded === 'function' ? S.backupDownloaded(name) : 'Backup downloaded: ' + name, 'ok');
  };

  /* ------------------------------------------------------------------ saving failed (P0-12): one persistent warning under the nav until a save succeeds */
  let saveFailed = null;                 // the Error of the last refused write, until a write succeeds
  /** the banner's sentence for a refused write (the store's Error carries .kind: quota | blocked | write | held) */
  function saveLine(kind) {
    const local = location.protocol === 'file:';
    if (kind === 'blocked') return 'This browser does not let this page store data (private browsing, or storage is blocked in its settings).';
    if (kind === 'held') return 'Your saved progress could not be read and there is no room to keep a copy of it. Download it, then free some space.';
    if (kind === 'write') return 'The browser refused to write it.';
    return local ? 'This browser’s storage for local pages is full.' : 'This browser’s storage for this site is full.';
  }
  function paintSave() {
    const el = U.$('#save-warn');
    if (!el) return;
    const err = saveFailed || (GA.store && GA.store.saveError) || null, on = !!err;
    el.hidden = !on;
    document.documentElement.classList.toggle('save-off', on);
    const kind = on ? String(err.kind || 'quota') : '';
    if (!on || el.dataset.kind === kind) return;
    el.dataset.kind = kind;
    const S = GA.store || {}, free = typeof S.usage === 'function' && kind !== 'blocked', raw = kind === 'held' && typeof S.rawText === 'function';
    el.innerHTML = `<div class="sw-in">${icon('alert')}<p><b>Progress is not being saved.</b> ${esc(saveLine(kind))}${kind === 'held' ? '' : ' Export a backup now so nothing is lost.'}</p>
      <div class="sw-a">${raw ? `<button type="button" class="btn sm primary" data-save="raw">${icon('download')}<span>Download my saved data</span></button>` : `<button type="button" class="btn sm primary" data-save="export">${icon('download')}<span>Export backup</span></button>`}${free ? '<button type="button" class="btn sm" data-save="free">Free space</button>' : ''}</div></div>`;
  }
  function freeSpace() {
    const S = GA.store, u = safe(() => S.usage(), null);
    const spare = u && Array.isArray(u.keys) ? u.keys.filter(k => k && k.kind && k.kind !== 'state') : [];
    const size = ch => (ch >= 1e6 ? (ch / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(ch / 1e3)) + ' KB');
    const what = { 'before-import': 'Copy kept before an import', corrupt: 'Saved data that could not be read', other: 'Other PassBook data' };
    if (!spare.length) {
      GA.ui.modal({ title: 'Nothing spare to delete', body: '<p class="muted" style="margin:6px 0 0">This app keeps no spare copies in this browser. Export a backup, then free space in the browser’s own settings (site data or local files).</p>', actions: [{ label: 'Close', kind: 'primary' }] });
      return;
    }
    const rows = spare.map(k => `<tr><td>${esc(what[k.kind] || what.other)}</td><td class="r nw">${size(k.chars || 0)}</td></tr>`).join('');
    GA.ui.modal({ title: 'Free space', body: `<p class="muted" style="margin:6px 0 10px">These copies are kept by this app in this browser. Download them first if you might want them, then delete them so saving can work again.</p><div class="tw"><table class="t compact"><caption class="sr">Spare copies kept in this browser</caption><thead class="sr"><tr><th>Copy</th><th>Size</th></tr></thead><tbody>${rows}</tbody></table></div>`,
      actions: [{ label: 'Download them', onclick: () => { Shell.download(`passbook-spare-copies-${stamp()}.json`, JSON.stringify(Object.fromEntries(spare.map(k => [k.key, safe(() => (typeof S.keyText === 'function' ? S.keyText(k.key) : localStorage.getItem(k.key)), null)])), null, 1)); return false; } },
        { label: 'Delete them', kind: 'bad', onclick: () => { safe(() => S.dropKeys(spare.map(k => k.key))); safe(() => S.flushNow()); refresh(); GA.ui.toast('Spare copies deleted. Saving again…'); } }] });
  }

  /* ------------------------------------------------------------------ Me menu (a dropdown on desktop, a bottom sheet on phones); one entry on the overlay stack */
  let lastOpener = null, meOv = null;
  const isOpen = () => !!U.$('.shell.me-open');
  const items = () => U.$$('.me-menu [role^="menuitem"]').filter(x => x.offsetParent !== null);
  /** show or hide the menu; touches nothing else (the overlay stack calls it on Back) */
  function setMenu(open, opener) {
    const sh = U.$('.shell');
    if (!sh || open === isOpen()) return;
    sh.classList.toggle('me-open', open);
    U.$$('[aria-controls="me-menu"]').forEach(b => b.setAttribute('aria-expanded', String(open)));
    const m = U.$('#me-menu');
    m.style.transform = '';
    if (open) {
      lastOpener = opener || U.$('#me-btn');
      m.removeAttribute('inert');
      safe(paintMenu);
      document.documentElement.classList.toggle('me-lock', innerWidth <= 700);
      setTimeout(() => { const f = U.$('.mi.on', m) || items().find(x => x.classList.contains('mi')) || items()[0]; if (f) f.focus({ preventScroll: true }); }, 30);
    } else {
      m.setAttribute('inert', '');
      document.documentElement.classList.remove('me-lock');
      if (m.contains(document.activeElement) && lastOpener && lastOpener.offsetParent !== null) lastOpener.focus({ preventScroll: true });
    }
    markActive();
  }
  function menu(open, opener) {
    if (open === isOpen()) return;
    if (open) { setMenu(true, opener); meOv = GA.ui.overlay.push({ id: 'me', kind: 'sheet', close: () => setMenu(false) }); }
    else if (meOv && GA.ui.overlay.has(meOv)) GA.ui.overlay.pop(meOv);
    else setMenu(false);
  }
  Shell.menu = menu;
  Shell.drawer = open => menu(open);          // the old sidebar drawer API, kept so callers do not break

  function menuHTML() {
    const mi = ([href, ic, label, badge]) => `<a class="mi" role="menuitem" href="#${href}" data-href="${href}">${icon(ic)}<span>${esc(label)}</span>${badge ? `<em class="mi-n" data-badge="${badge}" hidden></em>` : ''}</a>`;
    const demo = GA.store.profile === 'demo';
    // the study group: the Me pages up to PassBook Wrapped, with the formula sheets (STUDY) after the error notebook while their route exists
    const study = ME.slice(0, 5), at = study.findIndex(r => r[0] === '/notebook') + 1;
    study.splice(at > 0 ? at : study.length, 0, ...STUDY.filter(r => Shell.has(r[0])));
    return `<div class="me-grab" aria-hidden="true"><i></i></div>
      <div class="me-who" id="me-who" role="none"><b>${demo ? 'Demo profile' : 'Your space'}</b><span>${demo ? 'Sample data, kept apart from your real progress' : 'Progress is saved in this browser'}</span></div>
      <div class="me-more" role="group" aria-labelledby="me-more-l"><span class="me-gl" id="me-more-l" aria-hidden="true">More</span>${MORE.map(mi).join('')}<hr role="separator"></div>
      ${study.map(mi).join('')}<hr role="separator">${ME.slice(5).map(mi).join('')}
      ${GA.pwa ? `<button class="mi me-install" role="menuitem" type="button" id="me-install" hidden>${icon('download')}<span>Install app</span></button>` : ''}
      <button class="mi me-keys" role="menuitem" type="button" id="me-keys">${icon('keyboard')}<span>Keyboard shortcuts</span><kbd>?</kbd></button>
      <div class="me-theme" role="group" aria-label="Theme"><span class="lbl" aria-hidden="true">Theme</span><div class="seg sm">
        <button type="button" role="menuitemradio" data-theme-pick="auto" aria-checked="false">${AUTO}Auto</button>
        <button type="button" role="menuitemradio" data-theme-pick="light" aria-checked="false">${icon('sun')}Light</button>
        <button type="button" role="menuitemradio" data-theme-pick="dark" aria-checked="false">${icon('moon')}Dark</button></div></div>`;
  }
  /* the phone sheet's grabber drags it down to close (P1-47) */
  function dragToClose(m) {
    const grab = U.$('.me-grab', m);
    if (!grab) return;
    let y0 = null, dy = 0;
    grab.addEventListener('pointerdown', e => { if (innerWidth > 700) return; y0 = e.clientY; dy = 0; grab.setPointerCapture(e.pointerId); m.style.transition = 'none'; });
    grab.addEventListener('pointermove', e => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); m.style.transform = `translateY(${dy}px)`; });
    const end = () => { if (y0 == null) return; y0 = null; m.style.transition = ''; if (dy > Math.min(90, m.offsetHeight * 0.25)) menu(false); else m.style.transform = ''; };
    grab.addEventListener('pointerup', end); grab.addEventListener('pointercancel', end);
  }

  /* ------------------------------------------------------------------ exam mode (P2-43): a live test is left only through the runner's own controls */
  function examMode() {
    const b = U.$('.topbar .brand'); if (!b) return;
    if (inExam()) { if (b.hasAttribute('href')) { b.removeAttribute('href'); b.removeAttribute('aria-label'); safe(fit); safe(placeMarker); } }       // not a link while a test runs
    else if (!b.hasAttribute('href')) { b.setAttribute('href', '#/'); b.setAttribute('aria-label', 'PassBook, home'); safe(fit); safe(placeMarker); }
  }

  Shell.build = function () {
    const app = U.$('#app');
    const tabs = NAV.map(([href, ic, label]) => `<a class="tn-a" href="#${href}" data-href="${href}">${icon(ic)}<span>${esc(label)}</span></a>`).join('');
    const bar = TABBAR.map(([href, ic, label]) => href === 'me'
      ? `<button class="tb-tab" type="button" data-href="me" id="me-tab" aria-haspopup="menu" aria-controls="me-menu" aria-expanded="false">${icon(ic)}<span>${label}</span></button>`
      : `<a class="tb-tab" href="#${href}" data-href="${href}">${icon(ic)}<span>${label}</span></a>`).join('');
    app.innerHTML = `<a class="skip" href="#view" id="skip">Skip to content</a><div class="backdrop" aria-hidden="true"></div><div class="shell">
      <header class="topbar" id="topbar">
        <a class="brand" href="#/" aria-label="PassBook, home"><span class="logo">${LOGO}</span><span class="bt">PassBook</span></a>
        <nav class="tn" aria-label="Main"><span class="tn-ind" aria-hidden="true"></span>${tabs}</nav>
        <div class="tb-chips" id="tb-chips" hidden></div>
        <button class="tb-search" type="button" id="open-search" aria-label="Search or jump to" aria-describedby="open-search-d" aria-keyshortcuts="/ Control+K Meta+K">${icon('search')}<span>Search or jump to…</span><kbd>${MAC ? '⌘K' : 'Ctrl K'}</kbd><i class="sr" id="open-search-d">Lessons, topics, questions, labs and places</i></button>
        <button class="tb-btn" type="button" id="theme" aria-label="Toggle dark or light theme" data-tip="Theme (t)"><span class="moon">${icon('moon')}</span><span class="sun">${icon('sun')}</span></button>
        <button class="me-btn" type="button" id="me-btn" aria-haspopup="menu" aria-controls="me-menu" aria-expanded="false" aria-label="Me: planner, flashcards, notebook, progress, settings"><span class="av">ME</span></button>
      </header>
      <div class="save-warn" id="save-warn" role="alert" hidden></div>
      <div class="me-scrim" aria-hidden="true"></div>
      <div class="me-menu" id="me-menu" role="menu" aria-label="Me" inert>${menuHTML()}</div>
      <div class="crumbs-row" hidden><nav class="tb-crumbs" aria-label="Breadcrumb"></nav></div>
      <main id="view" tabindex="-1"></main>
      <nav class="tabbar" aria-label="Main (phone)">${bar}</nav>
    </div>`;
    U.on(app, 'click', '#skip', e => { e.preventDefault(); U.$('#view').focus(); });
    U.on(app, 'click', '#theme', () => GA.ui.toggleTheme());
    U.on(app, 'click', '#open-search', (e, b) => GA.search.open('', b));
    U.on(app, 'click', '#me-btn', (e, b) => menu(!isOpen(), b));
    U.on(app, 'click', '#me-tab', (e, b) => menu(!isOpen(), b));
    U.on(app, 'click', '.me-scrim', () => menu(false));
    // a link in the Me menu replaces the menu's history entry, so Back returns to the page the menu was opened on
    U.on(app, 'click', '.me-menu a[href^="#"]', (e, a) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); GA.ui.overlay.follow(a.getAttribute('href')); });
    U.on(app, 'click', '#me-keys', () => { menu(false); Shell.shortcuts(); });
    U.on(app, 'click', '[data-me-act]', (e, b) => {
      const k = b.dataset.meAct; menu(false);
      if (k === 'export') Shell.exportBackup();
      // a hosted copy's update (P1-58): never while a test is in progress, so a refusal says why
      else if (k === 'restart' && GA.pwa) Promise.resolve().then(() => GA.pwa.restart()).catch(err => GA.ui.toast((err && err.message) || 'The update could not start.', 'bad'));
    });
    U.on(app, 'click', '#me-install', () => { menu(false); if (GA.pwa && GA.pwa.install) GA.pwa.install().catch(() => false); });
    U.on(app, 'click', '[data-theme-pick]', (e, b) => { GA.ui.setTheme(b.dataset.themePick); safe(paintMenu); });
    U.on(app, 'click', '[data-save]', (e, b) => { const k = b.dataset.save; if (k === 'export') Shell.exportBackup(); else if (k === 'raw') Shell.download(`passbook-saved-data-${stamp()}.json`, GA.store.rawText()); else freeSpace(); });
    // the phone tab bar (P2-45): a tap on the lit tab scrolls to the top; a second tap (already at the top) goes to that tab's first screen
    U.on(app, 'click', '.tabbar a.tb-tab', (e, a) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || !a.classList.contains('on')) return;
      e.preventDefault();
      if ((scrollY || 0) > 4) scrollTo({ top: 0, behavior: GA.reveal && GA.reveal.reduced && GA.reveal.reduced() ? 'auto' : 'smooth' });
      else if (route() !== a.dataset.href) GA.router.go(a.dataset.href);
    });
    document.addEventListener('pointerdown', e => { if (isOpen() && !e.target.closest('#me-menu, #me-btn, #me-tab')) menu(false); }, true);
    document.addEventListener('keydown', e => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); menu(false); return; }
      const list = items(), i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); const n = list.length; if (n) list[((i < 0 ? (e.key === 'ArrowDown' ? -1 : 0) : i) + (e.key === 'ArrowDown' ? 1 : -1) + n) % n].focus(); }
      else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); const t = e.key === 'Home' ? list[0] : list[list.length - 1]; if (t) t.focus(); }
      else if (e.key === 'Tab') menu(false);
    }, true);
    dragToClose(U.$('#me-menu'));
    addEventListener('resize', U.debounce(() => { safe(fit); safe(placeMarker); if (isOpen()) document.documentElement.classList.toggle('me-lock', innerWidth <= 700); }, 80));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { safe(fit); safe(placeMarker); });
    if (typeof MutationObserver === 'function') new MutationObserver(() => safe(examMode)).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    GA.router.mount(U.$('#view'));
    if (GA.reveal) GA.reveal.auto(U.$('#view'));
    repaint();
  };

  /* ------------------------------------------------------------------ the '?' help (P2-46): On this page · Anywhere · Go to (two columns) */
  /* a combo as keys: 'g l' is a sequence, 'Mod+K' a chord; between two keys '/', 'or' and '–' are words, not keys (a view's pageKeys may say
     'ArrowLeft / ArrowRight' or 'Home / End'); arrow and Escape names print as the keys show them */
  const KEYNAME = { ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', Escape: 'Esc' };
  const kb = c => {
    const mod = /^(Shift\+)?Mod\+/.test(c), parts = String(c).replace(/^Shift\+/, '⇧ ').replace('Mod+', (MAC ? '⌘' : 'Ctrl') + ' ').split(' ').filter(Boolean);
    return parts.map((k, i) => (i > 0 && i < parts.length - 1 && /^(\/|or|–)$/.test(k) ? esc(k) : `<kbd>${esc(KEYNAME[k] || (mod && k.length === 1 ? k.toUpperCase() : k))}</kbd>`)).join(' ');
  };
  /** a control's name as the help prints it (P2-46): aria-label, else aria-labelledby, else the words it shows, without what is hidden from
      assistive tech (the lens tabs' <kbd aria-hidden>1</kbd>), icons, key hints and its own description */
  function nameOf(el) {
    const words = (node, skip) => {
      let s = '';
      for (const c of node.childNodes) {
        if (c.nodeType === 3) s += c.nodeValue;
        else if (c.nodeType === 1 && !c.matches('kbd, svg, script, style, [aria-hidden="true"], [hidden]') && !(c.id && skip.has(c.id))) {
          const gap = /^(inline|contents)/.test(getComputedStyle(c).display) ? '' : ' ';      // block children are separate words, inline ones run on
          s += gap + words(c, skip) + gap;
        }
      }
      return s;
    };
    const al = el.getAttribute('aria-label');
    if (al && al.trim()) return al.replace(/\s+/g, ' ').trim();
    const by = (el.getAttribute('aria-labelledby') || '').split(/\s+/).map(id => id && document.getElementById(id)).filter(Boolean);
    const named = by.map(x => words(x, new Set())).join(' ').replace(/\s+/g, ' ').trim();
    if (named) return named;
    return words(el, new Set((el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean))).replace(/\s+/g, ' ').trim();
  }
  Shell._nameOf = nameOf;
  /** this screen's own keys: what the view registered (GA.ui.pageKeys), else its controls' aria-keyshortcuts, else the key line it shows (.pr-keys) */
  function pageRows() {
    const v = U.$('#view');
    const reg = GA.ui && typeof GA.ui.pageKeys === 'function' ? GA.ui.pageKeys() : [];
    if (reg.length) return reg.map(([c, d]) => [kb(c), esc(d)]);
    if (!v) return [];
    const own = U.$$('[aria-keyshortcuts]', v).filter(el => el.getClientRects().length).map(el => {
      const name = nameOf(el);
      return [el.getAttribute('aria-keyshortcuts').split(/\s+/).filter(Boolean).map(k => `<kbd>${esc(KEYNAME[k] || k)}</kbd>`).join(' or '), esc(name)];
    }).filter(r => r[1]);
    if (own.length) return own;
    // the line on screen, else one the layout tucked away (the runner's palette drawer on a small screen: its keys still work)
    const lines = U.$$('.pr-keys', v), line = lines.find(el => el.getClientRects().length) || lines.find(el => !el.closest('[hidden]'));
    if (!line) return [];
    // 'Keys: <kbd>A</kbd>–<kbd>D</kbd> choose · <kbd>Enter</kbd> check · …' → one row per part (the view's own words). The words are read as
    // text (an '&' in 'Save & next' arrives as '&amp;' in the line's HTML) and escaped once.
    const text = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };
    return line.innerHTML.replace(/^\s*Keys:\s*/i, '').split(/\s*·\s*/).map(part => {
      const m = /^((?:\s*<kbd[^>]*>[^<]*<\/kbd>\s*(?:–|-|\/|or)?\s*)+)([\s\S]*)$/.exec(part);
      if (!m) return null;
      const keys = m[1].replace(/<kbd[^>]*>([^<]*)<\/kbd>/g, (x, k) => `<kbd>${k}</kbd>`).replace(/\s+/g, ' ').trim();
      const desc = text(m[2]).replace(/\s+/g, ' ').trim();
      return desc ? [keys, esc(U.cap ? U.cap(desc) : desc)] : null;
    }).filter(Boolean);
  }
  Shell._pageRows = pageRows;
  Shell.shortcuts = function () {
    const ui = GA.ui, exam = inExam(), single = typeof ui.singleKeys !== 'function' || ui.singleKeys();
    const keys = ui.keys();
    const table = (cap, rows, cls) => rows.length ? `<table class="t keys${cls ? ' ' + cls : ''}"><caption class="sr">${esc(cap)}</caption><thead class="sr"><tr><th>Keys</th><th>Action</th></tr></thead><tbody>${rows.map(([k, d]) => `<tr><td>${k}</td><td>${d}</td></tr>`).join('')}</tbody></table>` : '';
    // Anywhere: one row per action ('⌘ K · /  Search'); single-key rows only while they work; search is off during a test
    const any = [];
    keys.filter(k => k.group !== 'go' && !(exam && /search/i.test(k.desc))).forEach(k => {
      if (!single && !/^(Shift\+)?Mod\+/.test(k.combo)) return;
      const row = any.find(r => r.desc === k.desc);
      if (row) row.k += ' · ' + kb(k.combo); else any.push({ k: kb(k.combo), desc: k.desc });
    });
    const anyRows = any.map(r => [r.k, esc(r.desc)]).concat([[kb('Esc'), 'Close a dialog, the search or the menu']]);
    const goRows = exam || !single ? [] : keys.filter(k => k.group === 'go').map(k => [kb(k.combo), esc(k.desc.replace(/^Go to /, ''))]);
    const page = pageRows();
    const sec = (h, body) => (body ? `<section class="ks-sec"><h3 class="ks-h">${esc(h)}</h3>${body}</section>` : '');
    const note = exam ? '<p class="ks-note">Go-to keys and search are off while a test runs, so it is never left by accident.</p>'
      : !single ? '<p class="ks-note">Single-key shortcuts are off. <a class="link" href="#/settings">Turn them on in Settings</a>; ⌘/Ctrl K and Esc always work.</p>' : '';
    ui.modal({ title: 'Keyboard shortcuts', wide: goRows.length > 0, body: `<div class="ks">${sec('On this page', table('Keys on this page', page))}${sec('Anywhere', table('Keys that work anywhere', anyRows))}${sec('Go to', table('Go-to keys: press g, then the letter', goRows, 'ks-cols'))}</div>${note}`,
      actions: [{ label: 'Close', kind: 'primary' }] });
  };

  /* ------------------------------------------------------------------ not found (P3-31): one card for an unknown path or id, in the app's language */
  const NF = { page: 'Page not found', lesson: 'Lesson not found', question: 'Question not found', paper: 'Paper not found', deck: 'Deck not found', lab: 'Lab not found',
    test: 'Test not found', subject: 'Subject not found', topic: 'Topic not found' };
  /* a way back to a tab's first screen is named by the tab (P2-12): 'Go to Learn', 'Go to Questions', 'Go to Tests', with the tab's icon */
  const TAB_BACK = Object.fromEntries(NAV.map(([h, ic, l]) => ['#' + h, { label: 'Go to ' + l, icon: ic }]));
  /** GA.shell.notFound({kind, id, back: {href, label, icon}}): renders into the current view host. Tick (the mascot), a real heading, `back` as the screen's one
      coral (default Home; a tab's first screen is always 'Go to <tab>'), and search; the page title reads 'Not found · PassBook' */
  Shell.notFound = function (o) {
    o = o || {};
    const v = U.$('#view'); if (!v) return;
    const host = o.el || U.$(':scope > .vh', v) || v;
    const kind = NF[o.kind] ? o.kind : 'page', id = o.id == null ? '' : String(o.id);
    const asked = o.back && o.back.href ? o.back : { href: '#/' }, back = Object.assign({}, asked, TAB_BACK[asked.href] || {});
    const m = GA.mascot && GA.mascot.svg ? GA.mascot.svg({ size: 64, gaze: 'down', mood: 'think' }) : '';      // Tick at 64 px on not-found (P2-70)
    const what = kind === 'page' ? `Nothing lives at <code>${esc('#' + id)}</code>.` : id ? `Nothing in the app has the id <code>${esc(id)}</code>.` : 'There is nothing at this address.';
    host.innerHTML = `<section class="nf card" aria-labelledby="nf-h"><div class="nf-m">${m}</div><h1 id="nf-h">${NF[kind]}</h1>
      <p>${what} The link may be from an older version of the app, or mistyped.</p>
      <div class="nf-a"><a class="btn pop" href="${esc(back.href)}">${icon(back.icon || 'arrow-l')}<span>${esc(back.label || 'Go back')}</span></a><button type="button" class="btn ghost" data-nf="search">${icon('search')}<span>Search the app</span></button></div></section>`;
    const b = host.querySelector('[data-nf="search"]'); if (b) b.addEventListener('click', () => GA.search.open(kind === 'page' ? '' : id, b));
    if (o.crumbs) Shell.crumbs(o.crumbs);
    document.title = 'Not found · PassBook';
    return host;
  };

  /** a fresh host element for one visit of a view (P0-02): #view gets a new child each time, so every listener a view delegates on `out`
      dies with the visit instead of stacking on the persistent outlet (two Submit dialogs, double-graded flashcards, leaked nodes) */
  function freshHost(outlet, name) {
    const host = document.createElement('div');
    host.className = 'vh'; host.dataset.view = name;
    outlet.replaceChildren(host);
    return host;
  }
  Shell._freshHost = freshHost;

  /* P2-79: a route's data starts with its view file, not after it; the loaders cache, so the view's own call reuses the request. A failure is the
     view's to report (the prefetch swallows it). On http(s) the lesson page's two serif faces start loading too, through document.fonts: that
     loads the very @font-face rules of fonts.css, so each face is fetched once. (A <link rel=preload> added by script is not matched while the
     sheets sit in <body>, P2-78: Chrome fetched each face twice, about 100 KB, and warned 'preloaded but not used'.) file:// starts nothing extra. */
  const PREFETCH = {
    lesson: p => GA.data.lesson && GA.data.lesson(p.id),
    question: p => GA.data.question && GA.data.question(p.id)
  };
  /** the lesson text's faces as document.fonts.load() asks for them: family and styles exactly as vendor/fonts/fonts.css declares them */
  const SERIF = ['400 1em "Source Serif 4"', 'italic 400 1em "Source Serif 4"'];
  let serifAsked = false;
  function prefetch(name, ctx) {
    const f = PREFETCH[name];
    if (f) { const r = safe(() => f(ctx.params || {}), null); if (r && typeof r.catch === 'function') r.catch(() => {}); }
    const fonts = document.fonts;
    if (name === 'lesson' && !serifAsked && /^https?:$/.test(location.protocol) && fonts && typeof fonts.load === 'function') {
      serifAsked = true;
      SERIF.forEach(font => { const r = safe(() => fonts.load(font), null); if (r && typeof r.catch === 'function') r.catch(() => {}); });
    }
  }
  Shell.routes = function () {
    const V = GA.views, R = GA.router;
    const lazy = name => ({
      enter: async (ctx, outlet) => {
        Shell.layout(null);
        const out = freshHost(outlet, name);
        prefetch(name, ctx);
        // the view's file and its dependencies in one round trip (P2-79); views use their dependencies only when they run
        const need = (DEPS[name] || []).map(d => 'app/js/views/' + d + '.js');
        if (!V[name]) { need.push('app/js/views/' + FILE[name] + '.js'); out.innerHTML = '<div class="empty"><span class="sk" style="width:220px;height:14px"></span></div>'; }
        await Promise.all(need.map(src => U.loadScript(src)));
        if (!V[name]) throw new Error('view "' + name + '" is not loaded');
        if (ctx.stale && ctx.stale()) return;         // the learner moved on while the view file loaded: never start a view nobody will leave()
        out.innerHTML = '';
        return V[name].enter(ctx, out);
      },
      leave: () => V[name] && V[name].leave && V[name].leave()
    });
    ROUTES.forEach(([pat, name]) => R.add(pat, lazy(name)));
    let shownPath = null;
    R.on('before', cur => {
      const path = cur && cur.path;
      if (path !== shownPath) GA.ui.overlay.clear();          // a new screen: sheets, the palette and dialogs of the old one close (their entries stay as plain steps)
      if (GA.ui.pageKeys) GA.ui.pageKeys([]);                 // the old screen's own keys leave with it
      curPath = path; crumbParts = []; paintCrumbs(); if (isOpen()) setMenu(false); markActive();
    });
    R.on('after', cur => {
      curPath = cur && cur.path; shownPath = curPath;
      if (cur && cur.pat === '404') { GA.ui.overlay.clear(); Shell.layout(null); Shell.crumbs([]); Shell.notFound({ kind: 'page', id: cur.path }); }
      if (isOpen()) setMenu(false);
      paintCrumbs(); refresh(); toAnchor();
    });
  };

  /* in-page anchors inside a hash route ("#/about#mastery", "#/l/<id>#<heading>"): the router only knows "/about", so the anchor is taken off before it
     resolves (this listener is registered before the router's) and scrolled to, below the sticky top bar, once the view has rendered; it is re-applied
     while lazy figures above it grow, and it wins over Back's saved position */
  let anchor = null;
  const ANCHOR = /^(#\/[^#]*?)#([A-Za-z][\w-]*)$/;
  function takeAnchor() { const m = ANCHOR.exec(location.hash); if (m) { anchor = m[2]; history.replaceState(history.state, '', m[1]); } }
  function toAnchor() {
    if (!anchor) return;
    const id = anchor; anchor = null;
    // below the sticky top bar; where the bar scrolls away (short landscape screens, P2-55) there is nothing to clear
    const y = () => { const el = document.getElementById(id); if (!el) return null; const tb = U.$('.topbar'), off = tb && getComputedStyle(tb).position === 'sticky' ? tb.offsetHeight : 0; return Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - off - 16)); };
    requestAnimationFrame(() => {
      const t = y(); if (t == null) return;
      scrollTo({ top: t }); if (GA.router.settle) GA.router.settle(y);
      // keyboard readers go on from the anchor, not from the page title the router just focused (P1-01 with P1-48): a Resume or
      // '#/l/<id>#<heading>' link used to leave focus on the h1, so the first Tab jumped back to the top. Only when the router placed focus
      // (on the view's h1 or [data-focus]); a first load, with focus nowhere yet, keeps the browser's own start.
      const el = document.getElementById(id), ae = document.activeElement, v = U.$('#view');
      if (el && v && v.contains(el) && ae && ae !== el && v.contains(ae) && ae.matches('h1, [data-focus]')) {
        if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
        try { el.focus({ preventScroll: true }); } catch (e) { /* detached */ }
      }
    });
  }

  /** the store profile an address asks for: ?profile=<name>, else 'main'; a self-test without a profile runs in the throw-away 'selftest' profile,
      never in the learner's own (the self-test starts by resetting its profile) */
  const profileOf = q => q.get('profile') || (q.has('selftest') ? 'selftest' : 'main');
  Shell.profileOf = profileOf;

  Shell.boot = function () {
    const q = new URLSearchParams(location.search);
    // P1-51: listen before init, so a profile that cannot be read is reported once the shell has drawn
    let unread = null;
    const said = { corrupt: 'Saved progress could not be read; it was kept aside and you are starting fresh.', repaired: 'Some saved entries could not be read; they were kept aside and the rest of your progress is here.' };
    const tell = k => { if (U.$('.shell')) GA.ui.toast(said[k], 'bad'); else unread = unread || k; };
    GA.store.on('corrupt', () => tell('corrupt'));
    GA.store.on('repaired', () => tell('repaired'));
    GA.store.on('error', e => { saveFailed = e || new Error('not saved'); safe(paintSave); });
    GA.store.on('saved', () => { saveFailed = null; safe(paintSave); });
    GA.store.init({ profile: profileOf(q) });
    GA.data.init();
    GA.ui.applyTheme(safe(() => GA.store.state.profile.theme, 'auto'));
    if (q.get('theme')) GA.ui.applyTheme(q.get('theme'), true);
    GA.ui.watchTheme();
    Shell.build();
    if (unread) { const k = unread; setTimeout(() => GA.ui.toast(said[k], 'bad'), 600); }
    Shell.routes();
    GA.store.on('change', tag => { if (tag !== 'time') refresh(); else onTime(); });
    if (GA.pwa && typeof GA.pwa.on === 'function') {
      // the Me header and its install row follow the hosted copy (P1-58). A screen that asked for a file of a newer build gets one toast once
      // that build is ready, so the learner knows why it did not open and how to fix it
      let stale = false, told = false;
      GA.pwa.on('installable', refresh);
      GA.pwa.on('stale', () => { stale = true; });
      GA.pwa.on('update', on => { refresh(); if (on && stale && !told && !inExam()) { told = true; GA.ui.toast('A newer version of the app is ready. Restart it from the Me menu, then open this again.'); } });
    }
    const ui = GA.ui, search = () => { if (!inExam()) GA.search.open(); };
    ui.key('Mod+k', search, 'Search lessons, topics and questions'); ui.key('/', search, 'Search lessons, topics and questions');
    ui.key('t', () => ui.toggleTheme(), 'Toggle dark / light');
    // go-to keys never leave a live test (P2-43)
    GO_KEYS.forEach(([combo, path, desc]) => ui.key(combo, () => { if (!inExam()) GA.router.go(path); }, desc, { group: 'go' }));
    ui.key('g d', () => { if (!inExam()) GA.router.go('/progress'); });          // the old "go to dashboard"; kept working, not advertised
    ui.key('?', () => Shell.shortcuts(), 'Show this help');
    ui.trackTime();
    GA.router.pendingAnchor = () => anchor;
    addEventListener('hashchange', takeAnchor); takeAnchor();
    GA.router.start();
    if (q.get('open')) setTimeout(() => {           // dev aid for screenshots: ?open=me | search (&q=cache) | keys | toast | savefail
      const o = q.get('open');
      if (o === 'me') menu(true); else if (o === 'search') GA.search.open(q.get('q') || ''); else if (o === 'keys') Shell.shortcuts();
      else if (o === 'toast') { GA.ui.toast('Saved. Your notebook has 3 open entries.', 'ok'); GA.ui.toast('That answer is not in the key range.', 'bad'); }
      else if (o === 'savefail') { const e = new Error('QuotaExceededError (simulated)'); e.kind = q.get('kind') || 'quota'; GA.store.emit('error', e); }
    }, 900);
    if (q.get('probe')) setTimeout(() => probe(q.get('open') === '1' || q.get('fold') === 'open'), 7000);
    if (q.get('profile') === 'demo') {
      document.body.dataset.demo = '1';
      if (q.get('seeddemo')) U.loadScript('app/js/core/demo.js').then(() => GA.demo.seed(GA.store, GA.data.D))
        .then(() => (q.get('seedlive') ? GA.demo.live(GA.store, GA.data.D, q.get('seedlive') === '1' ? null : q.get('seedlive')).then(id => GA.router.go('/test/run/' + id)) : GA.router.resolve()));
    }
  };

  /* dev aid (?probe=1, used with tools/shot.sh at phone widths): report what overflows the screen. 'page' = widens the page (the page scrolls sideways),
     'clipped' = cut off by an overflow:hidden box with no way to scroll it into view, 'scrolls inside' = wider than the screen inside its own scroll box
     (fine). With &open=1 every Hint and Show answer is pressed and every fold (<details>, 'Worked solution') opened first, because overflow mostly
     appears in opened states (P0-24); the first line says how many of each it opened. */
  /* overflow clips only on a real box: never on display:contents (no box at all), inline boxes, or table rows and row groups; KaTeX's glyph parts
     and visually hidden boxes clip on purpose, and an SVG's own viewport clips its drawing by design */
  const NOBOX = /^(contents|inline|none|table-row|table-row-group|table-header-group|table-footer-group|table-column|table-column-group)$/;
  const DELIBERATE = '.hide-tail, .stretchy, .halfarrow-left, .halfarrow-right, .brace-left, .brace-center, .brace-right, .pstrut';
  function overflowReport(root, w) {
    const out = { page: [], clipped: [], inside: [] };
    const scrollBox = cs => /(auto|scroll)/.test(cs.overflowX);
    for (const e of root.querySelectorAll('*')) {
      const r = e.getBoundingClientRect();
      if (!r.width || e.ownerSVGElement || e.closest('.me-menu, .probe-out, .sr, .katex-mathml, script, style, [hidden]')) continue;
      let rightLimit = w, kind = 'page';
      for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.overflowX === 'visible' || NOBOX.test(cs.display)) continue;
        if (scrollBox(cs)) { kind = 'inside'; break; }
        const pr = p.getBoundingClientRect();
        if (p.matches(DELIBERATE) || pr.width <= 2 || pr.height <= 2) { kind = 'fine'; break; }   /* a visually hidden 1-2 px clip box (row-card table heads) hides on purpose */
        if (r.right > pr.right + 1) { kind = 'clipped'; rightLimit = pr.right; }
        break;
      }
      if (kind === 'fine') continue;
      if (kind === 'clipped') { out.clipped.push(e); continue; }
      if (r.right > rightLimit + 1) (kind === 'inside' ? out.inside : out.page).push(e);
    }
    return out;
  }
  Shell._overflow = overflowReport;
  /** the opened states the probe measures (P0-24): every Hint first (on the question page it holds the Show answer slot until it has been asked
      for, P2-64), then every Show answer, then every fold. Each press loads a file, so a step waits for its buttons to turn over; a fold that mounts
      more cards when it opens (lesson PYQ rows, the result review) gets another round. -> {hint, reveal, details}: how many were pressed or opened */
  async function openAll(root) {
    root = root || U.$('#view');
    const n = { hint: 0, reveal: 0, details: 0 };
    if (!root) return n;
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const live = sel => U.$$(sel, root).filter(b => b.getAttribute('aria-disabled') !== 'true' && !b.disabled && b.getClientRects().length);
    for (let round = 0; round < 3; round++) {
      const hints = live('[data-a="hint"]');
      hints.forEach(b => b.click()); n.hint += hints.length;
      // a Hint turns into Show answer once its file is in (or has failed); the card redraws its bar meanwhile, so the page is polled, not the button
      for (let t = 0; t < 50 && hints.length && U.$$('[data-a="hint"]', root).length; t++) await wait(100);
      const shows = live('[data-a="reveal"]');
      shows.forEach(b => b.click()); n.reveal += shows.length;
      if (shows.length) await wait(1500);        // the worked solutions load after Show answer
      const folds = U.$$('details', root).filter(d => !d.open);
      folds.forEach(d => { d.open = true; }); n.details += folds.length;
      if (folds.length) await wait(300);
      if (!hints.length && !shows.length && !folds.length) break;
    }
    return n;
  }
  Shell._openAll = openAll;
  async function probe(openFolds) {
    let opened = null;
    if (openFolds) opened = await openAll();    // opened states: every hint, every answer, every fold
    const w = innerWidth, rep = overflowReport(document.body, w);
    const name = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return `${e.tagName.toLowerCase()}${typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/)[0] : ''}[w=${Math.round(r.width)},r=${Math.round(r.right)},d=${cs.display},ox=${cs.overflowX}]`; };
    const chainOf = e => { const c = []; for (let x = e; x && x !== document.body && c.length < 10; x = x.parentElement) c.push(name(x)); return c.join(' < '); };
    const deepest = list => (list.length ? chainOf(list[list.length - 1]) : '');
    const d = document.createElement('pre'); d.className = 'probe-out';
    d.style.cssText = 'position:fixed;left:0;top:64px;z-index:99999;margin:0;background:#000d;color:#0f0;font:11px/1.3 monospace;padding:6px;max-width:100vw;white-space:pre-wrap';
    d.textContent = `innerWidth=${w} scrollWidth=${document.documentElement.scrollWidth}${opened ? ` (opened: hint ${opened.hint} · show answer ${opened.reveal} · folds ${opened.details})` : ''}\n` +
      `page=${rep.page.length} clipped=${rep.clipped.length} scrolls-inside=${rep.inside.length}\n` +
      (rep.page.length ? 'page: ' + deepest(rep.page) + '\n' : '') + (rep.clipped.length ? 'clipped: ' + deepest(rep.clipped) + '\n' : '') + (!rep.page.length && !rep.clipped.length ? 'no overflow' : '');
    document.body.append(d);
  }

  Shell._tables = { NAV, ME, STUDY, TABBAR, MORE, ALSO, ROUTES, FILE, DEPS, GO_KEYS, isActive, tabOf, barTabOf, ANCHOR, SERIF };
  if (typeof module !== 'undefined' && module.exports) module.exports = Shell._tables;
})(typeof window !== 'undefined' ? window : globalThis);
