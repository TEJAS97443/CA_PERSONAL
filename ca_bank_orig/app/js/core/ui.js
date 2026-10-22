/* PassBook — shared UI helpers: toasts, modals, theme, keyboard shortcuts, active-time tracker, small HTML builders, and the shell services of the
   audit contract (docs/ARCHITECTURE.md §10.2): GA.ui.say (one persistent pair of live regions), GA.ui.overlay (one stack for sheets, the palette and
   dialogs, tied to browser history so Back closes the top one), GA.ui.touch, GA.ui.loadFailed and UI.empty's {peak, say}; Part B: GA.ui.str (the
   shared wording table, P2-28 / P2-66), GA.ui.singleKeys (P3-17), GA.ui.roving (P3-15), GA.ui.pageKeys (the '?' help's 'On this page', P2-46),
   GA.ui.studyRoute (what counts as focused study, P3-44) and the browser bar colour that follows the chosen theme (P2-51).
   Classic script; the pure parts (the overlay stack with an injected history, the load-failure wording) also load in Node for tests/shell.test.js. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('./util.js') : null);
  const esc = U.esc, icon = n => (GA.icon ? GA.icon(n) : '');
  const hasDOM = typeof document !== 'undefined' && typeof g.addEventListener === 'function';

  const UI = {};

  /* ---- announcements (P1-48): one persistent polite + assertive pair; toasts, route changes and changed counts all speak through it ---- */
  const live = {};
  function liveEl(level) {
    if (live[level] && live[level].isConnected) return live[level];
    const el = document.createElement('div');
    el.className = 'sr ga-live'; el.id = 'ga-live-' + level;
    el.setAttribute('aria-live', level); el.setAttribute('aria-atomic', 'true');
    if (level === 'assertive') el.setAttribute('role', 'alert'); else el.setAttribute('role', 'status');
    document.body.append(el);
    return (live[level] = el);
  }
  const sayT = {};
  UI.say = (text, level) => {
    if (!hasDOM || !document.body) return;
    const lv = level === 'assertive' ? 'assertive' : 'polite', el = liveEl(lv), msg = String(text == null ? '' : text).trim();
    clearTimeout(sayT[lv]);                                       // a burst (typing in a search box) is read once, as its last words
    el.textContent = '';
    if (msg) sayT[lv] = setTimeout(() => { el.textContent = msg; }, lv === 'assertive' ? 40 : 250);   // a fresh change, so the same words are read again
  };

  /* ---- toasts: visual only (the announcement goes through UI.say, a region that already exists, so screen readers do not miss it) ---- */
  UI.toast = (msg, kind, o) => {
    let host = U.$('.toasts');
    if (!host) { host = U.h('div.toasts', { 'aria-hidden': 'true' }); document.body.append(host); }
    const peak = o && o.peak && GA.mascot && GA.mascot.svg ? `<span class="t-peak">${GA.mascot.svg({ size: 28, mood: 'happy', gaze: 'right' })}</span>` : '';
    const el = U.h('div.toast' + (kind ? '.' + kind : ''), { html: `${peak || (kind === 'ok' ? icon('check') : kind === 'bad' ? icon('alert') : icon('info'))}<span>${esc(msg)}</span>` });
    host.append(el);
    UI.say(msg, kind === 'bad' ? 'assertive' : 'polite');
    setTimeout(() => { el.style.transition = 'opacity .25s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 260); }, 3200);
  };

  /* ---- the overlay stack (P1-47) ----
     push({id, close}) adds a history entry for the overlay (or reuses a stale one), so the phone's Back closes the top overlay instead of the page.
     pop(id?) closes the top overlay from code and consumes its entry with history.back(), deferred by one task and skipped when the code that closed
     it has already navigated (a back() still in flight would undo that navigation: measured in Chrome). While a back() is in flight, new pushes wait
     and GA.router.go waits (after()). clear() drops every overlay without touching history (route changes). Links inside an overlay navigate with
     location.replace (follow()). close() callbacks only remove their overlay. */
  function makeOverlays(env) {
    const H = env.history, stack = [];
    let n = 0, inflight = null, queue = [], waiters = [];
    const st = () => { try { return H.state; } catch (e) { return null; } };
    const curKey = () => { const s = st(); return s && s.ov ? s.ov : null; };
    const known = k => stack.some(e => e.key === k);
    function write(e) {
      const s = Object.assign({}, st() || {}, { ov: e.key });
      try {
        // a stale overlay entry (its overlay closed without consuming it) is reused instead of piling up history steps
        if (curKey() && !known(curKey())) H.replaceState(s, ''); else H.pushState(s, '');
        e.pushed = true;
      } catch (err) { e.pushed = false; }
    }
    function settle() {
      inflight = null;
      const q = queue; queue = [];
      q.forEach(e => { if (stack.includes(e)) write(e); });
      const w = waiters; waiters = [];
      w.forEach(fn => { try { fn(); } catch (err) { if (typeof console !== 'undefined') console.error(err); } });
    }
    function closeEntry(e) { const i = stack.indexOf(e); if (i >= 0) stack.splice(i, 1); queue = queue.filter(x => x !== e); try { e.close(); } catch (err) { if (typeof console !== 'undefined') console.error(err); } }
    const O = {
      push(o) {
        const e = { id: (o && o.id) || 'ov' + (++n), close: (o && o.close) || (() => {}), key: 'ov' + Date.now().toString(36) + '-' + (++n), pushed: false, kind: (o && o.kind) || '' };
        stack.push(e);
        if (inflight) queue.push(e); else write(e);
        return e.id;
      },
      /** close the top overlay (only when it is `id`, if given) and consume its history entry; resolves once the entry is consumed */
      pop(id) {
        const e = stack[stack.length - 1];
        if (!e || (id != null && e.id !== id)) {
          // not on top: close it where it is, without touching history (its entry is under another overlay's)
          const x = id != null && stack.find(s => s.id === id);
          if (x) closeEntry(x);
          return Promise.resolve(false);
        }
        closeEntry(e);
        if (!e.pushed) return Promise.resolve(true);
        return new Promise(res => {
          env.setTimeout(() => {
            if (curKey() !== e.key || inflight) { res(true); return; }      // code navigated (or replaced the entry) first: nothing to consume
            inflight = { key: e.key, href: env.href(), t: env.now() };
            waiters.push(() => res(true));
            env.setTimeout(() => { if (inflight && inflight.key === e.key) settle(); }, 1000);   // safety: a popstate that never comes
            try { H.back(); } catch (err) { settle(); }
          }, 0);
        });
      },
      top: () => (stack.length ? stack[stack.length - 1].id : null),
      kindOnTop: () => (stack.length ? stack[stack.length - 1].kind : null),
      has: id => stack.some(e => e.id === id),
      size: () => stack.length,
      /** drop every overlay (top first) without touching history: a route change */
      clear() { while (stack.length) closeEntry(stack[stack.length - 1]); queue = []; },
      /** true while a history.back() of ours is in flight */
      busy: () => !!inflight,
      /** run fn once no back() of ours is in flight (GA.router.go uses it, so a navigation is never undone) */
      after(fn) { if (inflight) waiters.push(fn); else fn(); },
      /** a link inside the top overlay: replace the overlay's history entry with the destination, then drop the overlays */
      follow(href) {
        const top = stack[stack.length - 1];
        const mine = top && curKey() === top.key;
        O.clear();
        if (mine) env.replace(href); else env.assign(href);
      },
      /** the browser moved through history (popstate) */
      onPop() {
        if (inflight && env.href() === inflight.href) { settle(); return; }
        if (inflight) settle();
        // Chrome fires popstate for every hash navigation too: a fresh entry (state null, before the router keys it) is a navigation, not a move
        // through history; the shell closes overlays when the path changes, so a sheet survives a replace() on its own screen (live filters)
        if (st() == null) return;
        const k = curKey(), i = k ? stack.findIndex(e => e.key === k) : -1;
        while (stack.length > i + 1) closeEntry(stack[stack.length - 1]);
      }
    };
    return O;
  }
  UI._makeOverlays = makeOverlays;
  if (hasDOM && g.history) {
    UI.overlay = makeOverlays({
      history: g.history, setTimeout: (f, ms) => setTimeout(f, ms), now: () => Date.now(), href: () => location.href,
      replace: h => location.replace(h), assign: h => { location.hash = h.replace(/^#/, ''); }
    });
    addEventListener('popstate', () => UI.overlay.onPop());
  } else {
    UI.overlay = makeOverlays({ history: { state: null, pushState() {}, replaceState() {}, back() {} }, setTimeout: (f) => f(), now: () => 0, href: () => '', replace() {}, assign() {} });
  }

  /* ---- isolation for dialogs (P1-48): everything outside the dialog is inert while it is open, Tab wraps inside it ---- */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), summary';
  const visible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  UI.focusables = root => U.$$(FOCUSABLE, root).filter(el => visible(el) && !el.closest('[inert]'));
  /** make every top-level node except `el` (and the live regions, toasts and tooltip) inert; returns undo() */
  UI.isolate = function (el) {
    if (!hasDOM) return () => {};
    const changed = [];
    for (const c of Array.from(document.body.children)) {
      if (c === el || c.contains(el) || c.tagName === 'SCRIPT' || c.classList.contains('toasts') || c.classList.contains('ga-live') || c.classList.contains('ftip')) continue;
      if (!c.inert) { c.inert = true; changed.push(c); }
    }
    return () => changed.forEach(c => { c.inert = false; });
  };
  /** keep Tab inside root (a second line of defence where inert is not supported) */
  UI.trap = function (root) {
    const onKey = e => {
      if (e.key !== 'Tab') return;
      const f = UI.focusables(root); if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || a === root || !root.contains(a))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !root.contains(a))) { e.preventDefault(); first.focus(); }
    };
    root.addEventListener('keydown', onKey);
    return () => root.removeEventListener('keydown', onKey);
  };

  /* ---- modal ---- */
  let modalN = 0;
  UI.modal = function (o) {
    const prev = document.activeElement;
    const tid = 'm-t-' + (++modalN);
    const body = U.h('div.modal' + (o.wide ? '.wide' : ''), Object.assign({ role: 'dialog', 'aria-modal': 'true', tabindex: '-1' }, o.title ? { 'aria-labelledby': tid } : { 'aria-label': 'Dialog' }));
    if (o.title) body.append(U.h('h2.m-title', { id: tid }, o.title));          // the dialog's title is its h2 (P3-06)
    const content = U.h('div', { html: typeof o.body === 'string' ? o.body : '' });
    if (o.body && o.body.nodeType) content.append(o.body);
    body.append(content);
    const scrim = U.h('div.scrim', body);
    let closed = false, undo = () => {}, untrap = () => {}, ovId = null;
    const onKey = e => { if (e.key === 'Escape' && UI.overlay.top() === ovId) { e.stopPropagation(); e.preventDefault(); close(null); } };
    const remove = () => { if (!scrim.isConnected) return; scrim.remove(); document.removeEventListener('keydown', onKey, true); undo(); untrap(); if (prev && prev.focus && prev.isConnected) prev.focus({ preventScroll: true }); };
    const close = v => {
      if (closed) return; closed = true;
      remove();
      if (ovId && UI.overlay.has(ovId)) UI.overlay.pop(ovId);
      if (o.onclose) o.onclose(v);
    };
    document.addEventListener('keydown', onKey, true);     // Escape closes the top dialog only, wherever focus is
    scrim.addEventListener('mousedown', e => { if (e.target === scrim) close(null); });
    // links inside a dialog replace its history entry (Back then returns to the page the dialog was opened on)
    body.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); closed = true; remove(); if (o.onclose) o.onclose(null); UI.overlay.follow(a.getAttribute('href')); });
    if (o.actions) {
      const bar = U.h('div.m-actions');
      o.actions.forEach(a => bar.append(U.h('button.btn' + (a.kind ? '.' + a.kind : ''), { type: 'button', onclick: () => { const r = a.onclick ? a.onclick(body) : true; if (r !== false) close(a.value); } }, a.label)));
      body.append(bar);
    }
    document.body.append(scrim);
    undo = UI.isolate(scrim); untrap = UI.trap(body);
    ovId = UI.overlay.push({ kind: 'modal', close: () => { if (!closed) { closed = true; remove(); if (o.onclose) o.onclose(null); } } });
    // touch devices: focus the dialog itself, so the on-screen keyboard does not cover the dialog's own buttons; elsewhere the first control
    const pick = o.focus ? (typeof o.focus === 'string' ? body.querySelector(o.focus) : o.focus) : (UI.touch ? null : body.querySelector('input,select,textarea,button'));
    setTimeout(() => { if (!closed) (pick || body).focus({ preventScroll: true }); }, 30);
    return { close, el: body };
  };
  UI.confirm = (msg, o) => new Promise(res => {
    o = o || {};
    UI.modal({ title: o.title || 'Are you sure?', body: `<p class="muted" style="margin:6px 0 0">${msg}</p>`, onclose: v => res(v === true),
      actions: [{ label: o.cancel || 'Cancel', value: false }, { label: o.ok || 'Confirm', kind: o.danger ? 'bad' : 'primary', value: true }] });
  });

  /* ---- theme: the learner picks 'auto' (follows prefers-color-scheme, the default), 'light' or 'dark'; ?theme= forces one for this page load ---- */
  let forced = false;
  const sysDark = () => !!(g.matchMedia && g.matchMedia('(prefers-color-scheme: dark)').matches);
  UI.applyTheme = (pref, force) => {
    if (force) forced = pref === 'dark' || pref === 'light';
    const t = pref === 'dark' || pref === 'light' ? pref : (sysDark() ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
    paintBar(pref === 'dark' || pref === 'light' ? t : null);
    return t;
  };
  /** the browser bar colour (P2-51): a chosen theme paints both theme-color metas with that theme's --bg; Auto restores their two media values */
  function paintBar(t) {
    if (!hasDOM) return;
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    if (!metas.length) return;
    const bg = t ? (getComputedStyle(document.documentElement).getPropertyValue('--bg') || '').trim() : '';
    metas.forEach(m => {
      if (m.dataset.auto == null) m.dataset.auto = m.getAttribute('content') || '';
      m.setAttribute('content', t && bg ? bg : m.dataset.auto);
    });
  }
  /** the stored preference: 'auto' | 'light' | 'dark' */
  UI.themePref = () => { const p = GA.store && GA.store.state && GA.store.state.profile && GA.store.state.profile.theme; return p === 'dark' || p === 'light' ? p : 'auto'; };
  UI.setTheme = pref => {
    pref = pref === 'dark' || pref === 'light' ? pref : 'auto';
    forced = false;
    GA.actions.setProfile({ theme: pref });
    return UI.applyTheme(pref);
  };
  /** t / the nav button: flip what is on screen and remember it explicitly */
  UI.toggleTheme = () => UI.setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  /** follow the system setting live while the preference is 'auto' (called once at boot) */
  UI.watchTheme = () => {
    if (!g.matchMedia || UI._watching) return;
    UI._watching = true;
    const mq = g.matchMedia('(prefers-color-scheme: dark)'), on = () => { if (!forced && UI.themePref() === 'auto') UI.applyTheme('auto'); };
    if (mq.addEventListener) mq.addEventListener('change', on); else if (mq.addListener) mq.addListener(on);
  };

  /** true on touch-first devices ('Tap …' copy, no key hints; P3-40), read at render time */
  Object.defineProperty(UI, 'touch', { enumerable: true, get: () => !!(g.matchMedia && g.matchMedia('(hover: none) and (pointer: coarse)').matches) });

  /* ---- keyboard shortcuts: UI.key('g d', fn, 'description', {group}). Nothing fires while a dialog, the palette or a sheet is open (they own the
     keyboard). Single-key shortcuts ('t', '/', 'g' then a letter, '?') can be turned off in Settings (P3-17, WCAG 2.1.4): Mod+K and Escape always work. ---- */
  const keymap = [];
  let seq = '', seqT = null;
  UI.key = (combo, fn, desc, o) => keymap.push({ combo, fn, desc, group: (o && o.group) || (/^g \S$/.test(combo) ? 'go' : 'any') });
  UI.keys = () => keymap.filter(k => k.desc);
  /** false when the learner turned single-key shortcuts off (Settings writes profile.keys = false); views' own key handlers honour it too */
  UI.singleKeys = () => { const p = GA.store && GA.store.state && GA.store.state.profile; return !(p && p.keys === false); };
  /** the current screen's own keys for the '?' help ('On this page', P2-46): a view calls pageKeys([[combo, description], …]) in enter(); the shell
      clears them on every navigation. With no argument it returns them. */
  let pageKeyList = [];
  UI.pageKeys = list => {
    if (list === undefined) return pageKeyList.slice();
    pageKeyList = Array.isArray(list) ? list.filter(k => Array.isArray(k) && k[0] && k[1]).map(k => [String(k[0]), String(k[1])]) : [];
    return pageKeyList.slice();
  };
  if (hasDOM) document.addEventListener('keydown', e => {
    const t = e.target;
    const typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) && !(t.type === 'checkbox' || t.type === 'radio' || t.type === 'range');
    const mod = e.metaKey || e.ctrlKey;
    if (UI.overlay.size() && e.key !== 'Escape') { seq = ''; return; }
    let k = e.key;
    if (mod && !/^(Meta|Control|Shift|Alt)$/.test(e.key)) k = (e.shiftKey ? 'Shift+' : '') + 'Mod+' + e.key.toLowerCase();
    else if (typing) return;
    else if (!UI.singleKeys()) { seq = ''; return; }
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); }
    const combos = keymap.filter(m => m.combo === k || m.combo === (seq ? seq + ' ' + k : null));
    if (combos.length) { e.preventDefault(); seq = ''; combos.forEach(m => m.fn(e)); return; }
    if (!mod && !e.altKey && keymap.some(m => m.combo.startsWith(k + ' '))) { seq = k; clearTimeout(seqT); seqT = setTimeout(() => (seq = ''), 900); }
    else seq = '';
  });

  /* ---- time on task: counts seconds only while the tab is visible, the learner is interacting, and the screen is a study screen (P3-44) ---- */
  /** true for the screens where time is focused study: a lesson, a question, the bank, the test runner, a flash session, a lab, the notebook (and the
      revision sheet once it exists); hubs, Home, progress and settings are browsing */
  UI.studyRoute = path => {
    const p = String(path || '').split('?')[0];
    return /^\/(l|q|lab|rev)\/[^/]+/.test(p) || /^\/(pyq|notebook)\/?$/.test(p) || /^\/test\/run\/[^/]+/.test(p) || /^\/flash\/[^/]+/.test(p);
  };
  UI.trackTime = () => {
    let last = Date.now(), acc = 0, lesson = null;
    ['pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'].forEach(ev => addEventListener(ev, () => (last = Date.now()), { passive: true }));
    UI.setTimedLesson = id => { lesson = id; };
    const here = () => (GA.router && GA.router.current && GA.router.current.path) || '';
    setInterval(() => {
      if (document.hidden || Date.now() - last > 60000 || !UI.studyRoute(here())) return;
      acc += 5;
      if (acc >= 15) { GA.actions.addActive(acc, lesson); acc = 0; }
    }, 5000);
    addEventListener('pagehide', () => { if (acc) GA.actions.addActive(acc, lesson); });
  };

  /* ---- feedback (spec rule 8: motion only as feedback; all three are no-ops with reduced motion / without support) ---- */
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  /** a short success burst centred on el (a correct answer) */
  UI.burst = el => {
    if (!el || calm() || !el.getBoundingClientRect) return;
    const r = el.getBoundingClientRect(), b = document.createElement('div');
    b.className = 'burst'; b.setAttribute('aria-hidden', 'true');
    b.style.left = (r.left + r.width / 2) + 'px'; b.style.top = (r.top + r.height / 2) + 'px';
    let h = '<b></b>';
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2 + Math.random() * 0.4, d = 30 + Math.random() * 26; h += `<i style="--x:${(Math.cos(a) * d).toFixed(1)}px;--y:${(Math.sin(a) * d).toFixed(1)}px"></i>`; }
    b.innerHTML = h; document.body.append(b); setTimeout(() => b.remove(), 760);
  };
  /** a short horizontal shake of el (a wrong answer) */
  UI.shake = el => { if (!el || calm()) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 460); };
  /** a 15 ms haptic tick where the platform supports it (Android; iOS Safari ignores it) */
  UI.buzz = (ms) => { try { if (g.navigator && g.navigator.vibrate) g.navigator.vibrate(ms || 15); } catch (e) { /* not supported */ } };

  /* ---- roving focus (P3-15): one tab stop for a radio-like group; arrows, Home and End move focus and selection ----
     GA.ui.roving(group, {items, orientation: 'horizontal' | 'vertical' | 'both', select = true}) → destroy(); destroy.refresh() re-reads the selection.
     The selected item (aria-checked / aria-pressed / aria-selected = true, or .on) holds tabindex 0; moving clicks the item, so the group's own click
     handler does the selecting. Items may be re-rendered: the group is watched and the tab stop follows. */
  UI.roving = function (group, o) {
    if (!hasDOM || !group) { const d = () => {}; d.refresh = () => {}; return d; }
    o = o || {};
    const sel = o.items || '[role="radio"], button', orient = o.orientation || 'horizontal';
    const all = () => U.$$(sel, group);
    const live = () => all().filter(el => !el.disabled && el.getAttribute('aria-disabled') !== 'true' && el.getClientRects().length);
    const isOn = el => ['aria-checked', 'aria-pressed', 'aria-selected'].some(a => el.getAttribute(a) === 'true') || el.classList.contains('on');
    const refresh = () => { const L = all(); const cur = L.find(isOn) || L.find(el => el === document.activeElement) || L[0]; L.forEach(el => el.setAttribute('tabindex', el === cur ? '0' : '-1')); };
    const PREV = orient === 'vertical' ? ['ArrowUp'] : orient === 'both' ? ['ArrowLeft', 'ArrowUp'] : ['ArrowLeft'];
    const NEXT = orient === 'vertical' ? ['ArrowDown'] : orient === 'both' ? ['ArrowRight', 'ArrowDown'] : ['ArrowRight'];
    const onKey = e => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const L = live(), i = L.indexOf(document.activeElement);
      if (i < 0 || !L.length) return;
      const j = PREV.includes(e.key) ? (i - 1 + L.length) % L.length : NEXT.includes(e.key) ? (i + 1) % L.length : e.key === 'Home' ? 0 : e.key === 'End' ? L.length - 1 : null;
      if (j == null) return;
      e.preventDefault(); e.stopPropagation();
      let t = L[j];
      t.focus();
      if (o.select !== false && !isOn(t)) {
        t.click();
        if (!t.isConnected) { const N = live(); t = N[j] || N[N.length - 1]; if (t) t.focus(); }   // the group re-rendered on select
      }
      refresh();
    };
    group.addEventListener('keydown', onKey);
    group.addEventListener('click', () => setTimeout(refresh, 0));
    const mo = typeof MutationObserver === 'function' ? new MutationObserver(() => refresh()) : null;
    if (mo) mo.observe(group, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-checked', 'aria-pressed', 'aria-selected', 'class'] });
    refresh();
    const destroy = () => { group.removeEventListener('keydown', onKey); if (mo) mo.disconnect(); all().forEach(el => el.removeAttribute('tabindex')); };
    destroy.refresh = refresh;
    return destroy;
  };

  /* ---- the shared wording table (P2-28, P2-66): one wording per status, answer and toast. Views read a key and keep their own words until it
     exists (strings only; the functions build the toasts that carry numbers). Copy only: no key, dispute outcome or 'Master theorem' wording here. ---- */
  const plural = (n, w) => (U.plural ? U.plural(n, w) : n + ' ' + w + (n === 1 ? '' : 's'));
  UI.str = Object.freeze({
    ourEstimate: 'our estimate', difficulty: 'Difficulty (our estimate)',
    legacy: 'not in the current syllabus',
    bankEmpty: 'ICAI past papers, RTPs and MTPs are being added',                 // the one empty state of every question screen (no ICAI bank yet)
    bankEmptyLine: 'Until they are, practise with the self-checks and flashcards in each lesson.',
    noKey: 'No official key', keyQuestioned: 'key questioned',
    tier: Object.freeze({ core: 'Core', standard: 'Extended', advanced: 'Advanced' }),
    nothingToPractise: 'Nothing to practise',
    answerShown: 'Answer shown · not counted',
    correct: 'Correct', correctAgain: 'Correct again', notQuite: 'Not quite',
    marks: n => (n === 1 ? '1 mark' : `${n} marks`),
    backupDownloaded: name => `Backup downloaded: ${name}`,
    backupReady: size => `Backup file ready · ${size}`,
    imported: (q, l, t) => `Progress imported: ${plural(q || 0, 'question')}, ${plural(l || 0, 'lesson')}, ${plural(t || 0, 'test')}`,
    freezeCovered: (when, left, n) => `Streak saved: ${(n || 1) === 1 ? 'a freeze' : n + ' freezes'} covered ${when}.` + (left != null ? ` ${left === 0 ? 'No freezes' : plural(left, 'freeze')} left.` : '')
  });

  /* ---- html builders ---- */
  UI.subjChip = (id, o) => {
    const s = GA.data.D.subjectById[id];
    if (!s) return id === '?' ? '<span class="chip sm">Unclassified</span>' : '';
    return `<a class="chip subj${o && o.sm ? ' sm' : ''}" style="--h:${s.hue}" href="#/s/${id}">${esc(o && o.short ? s.short : s.name)}</a>`;
  };
  /** an empty / finished / failed state. opts.peak (true | {gaze, mood}) puts Tick, the mascot (64 px), above the title, opts.say gives it a one-line
      bubble. Tick belongs on not-found and true empty or finished states only; filter no-match states and load errors keep the plain icon (P2-70). */
  UI.empty = (ic, title, text, actions, opts) => {
    const pk = opts && opts.peak && GA.mascot && GA.mascot.svg ? GA.mascot.svg(Object.assign({ size: 64, gaze: 'down', mood: 'idle' }, typeof opts.peak === 'object' ? opts.peak : {})) : '';
    const top = pk ? `<div class="em-peak mascot-say ms-left">${pk}${opts.say ? `<p class="ms-bubble">${esc(opts.say)}</p>` : ''}</div>` : `<div class="em-i">${icon(ic)}</div>`;
    return `<div class="empty">${top}<b>${title}</b>${text ? `<p>${text}</p>` : ''}${actions ? `<div class="btns" style="justify-content:center;margin-top:6px">${actions}</div>` : ''}</div>`;
  };

  /** true when the build shipped no ICAI question (the bank is not built yet): every question screen then shows UI.bankEmptyCard() */
  UI.bankIsEmpty = D => { const d = D || (GA.data && GA.data.D); return !d || !Array.isArray(d.questions) || d.questions.length === 0; };
  /** the one honest empty state for the question bank, tests and lesson practice while there are no ICAI questions (opts.cta: an extra
      action's HTML, e.g. the screen's one coral to a lesson; opts.peak as in UI.empty) */
  UI.bankEmptyCard = opts => `<div class="bank-empty">${UI.empty('target', esc(UI.str.bankEmpty), esc(UI.str.bankEmptyLine), opts && opts.cta ? opts.cta : '', opts)}</div>`;

  /* ---- load failures (P1-59): one honest card for a file that did not arrive ---- */
  const FAILED = { lesson: 'This lesson did not load', question: 'This question did not load', solution: 'The worked solution did not load', paper: 'This paper did not load',
    cards: 'These flashcards did not load', search: 'Search index did not load', lab: 'This lab did not load', test: 'This test did not load', view: 'This screen did not load' };
  /** the card's two lines for a failure of kind `what`; online = navigator.onLine, protocol = location.protocol */
  UI.loadFailedText = (what, online, protocol) => ({
    title: FAILED[what] || FAILED.view,
    line: online === false ? 'You are offline. Connect to the internet, then try again.'
      : protocol === 'file:' ? 'A file the app needs could not be read from this folder. Try again; if it keeps failing, run build.py in the project folder to rebuild the data files.'
      : 'The file did not arrive. Check your connection, then try again.'
  });
  /** replace el's content with the failure card; 'Try again' runs retry (default: re-resolve the route, which re-requests the file).
      It is the screen's coral only when the card fills the view (o.main, or el is the view host), so a failed fold never adds a second coral. */
  UI.loadFailed = function (el, o) {
    if (!el) return el;
    o = o || {};
    const t = UI.loadFailedText(o.what, typeof navigator !== 'undefined' ? navigator.onLine : true, typeof location !== 'undefined' ? location.protocol : '');
    const main = o.main != null ? !!o.main : !!(el.id === 'view' || (el.classList && el.classList.contains('vh')));
    el.innerHTML = `<div class="load-failed" role="alert">${UI.empty('alert', esc(t.title), esc(t.line), `<button type="button" class="btn${main ? ' pop' : ''}" data-retry>${icon('refresh')}<span>Try again</span></button>`)}</div>`;
    const b = el.querySelector('[data-retry]');
    if (b) b.addEventListener('click', () => { b.disabled = true; const r = o.retry || (() => GA.router.resolve()); Promise.resolve().then(r).catch(err => { if (typeof console !== 'undefined') console.error(err); UI.loadFailed(el, o); }); });
    return el;
  };

  /** an info trigger for the one touch-safe tip (P1-55): a real <button> carrying data-ftip, with the text as its (visually hidden) name, so a tap,
      a keyboard and a screen reader all get it. o.label prefixes the hidden name ('Provenance: …'); o.html replaces the ⓘ icon (e.g. a badge). */
  UI.infoTip = (text, o) => {
    o = o || {};
    const t = String(text == null ? '' : text);
    return `<button type="button" class="itip${o.cls ? ' ' + esc(o.cls) : ''}" data-ftip="${esc(t)}">${o.html != null ? o.html : icon('info')}<span class="sr">${esc((o.label ? o.label + ': ' : '') + t.replace(/\n/g, '. '))}</span></button>`;
  };
  /** three bars for a difficulty, worded as the shared table says it (P2-66: 'Medium · our estimate') */
  UI.diffGlyph = d => { const l = { easy: 1, medium: 2, hard: 3 }[d]; return l ? `<span class="diff l${l}" role="img" aria-label="${U.cap(d)} · ${UI.str.ourEstimate}"><i></i><i></i><i></i></span>` : ''; };
  UI.pct = (x, d = 0) => (x == null ? '—' : (x * 100).toFixed(d) + '%');
  UI.masteryColor = m => (m == null ? 'var(--faint)' : m >= 0.7 ? 'var(--ok)' : m >= 0.4 ? 'var(--warn)' : 'var(--bad)');
  UI.bar = (pct, cls, h) => `<div class="bar ${cls || ''}"${h != null ? ` style="--h:${h}"` : ''}><i style="width:${Math.round(U.clamp(pct, 0, 1) * 100)}%"></i></div>`;
  UI.qLabel = q => `${q.section === 'GA' ? 'GA ' : ''}Q${q.no}`;
  UI.paperLabel = q => { const p = GA.data.D.paperById[q.paper]; return p ? p.label : q.paper; };

  GA.ui = UI;
  if (typeof module !== 'undefined' && module.exports) module.exports = UI;
})(typeof window !== 'undefined' ? window : globalThis);
