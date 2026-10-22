/* PassBook — in-browser end-to-end self-test (index.html?selftest=1&profile=selftest). Drives the real UI and writes PASS/FAIL lines into <pre id="selftest">.
   Run it headlessly with tools/smoke.py. It only ever uses the throw-away 'selftest' profile. */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, S = GA.store, D = () => GA.data.D;
  const out = [], errors = [];
  g.addEventListener('error', e => errors.push(String(e.message)));
  g.addEventListener('unhandledrejection', e => errors.push('promise: ' + String(e.reason && e.reason.message || e.reason)));
  const ok = (name, cond, extra) => out.push((cond ? 'PASS ' : 'FAIL ') + name + (!cond && extra ? ' — ' + extra : ''));
  const info = msg => out.push('INFO ' + msg);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const view = () => document.getElementById('view');
  /** the ICAI bank is not built yet: question flows are checked only once it ships (GA.ui.bankIsEmpty); SUBJ = the first paper (cma) */
  const bankOn = () => !(GA.ui && GA.ui.bankIsEmpty ? GA.ui.bankIsEmpty(D()) : !D().questions.length);
  const SUBJ = () => (D().subjects[0] || {}).id || 'cma';
  /** the bank holds ICAI items (docs/ICAI_BANK.md): the ICAI flows below run instead of the engine's GATE ones */
  const icaiOn = () => bankOn() && D().questions.every(q => q.icai);
  async function go(hash, settle) {
    const p = new Promise(res => { const off = GA.router.on('after', () => { off(); res(); }); setTimeout(res, 4000); });
    if (location.hash === '#' + hash) GA.router.resolve(); else location.hash = hash;
    await p; await wait(settle || 120);
  }
  const click = el => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  const healthy = (name, minLen) => {
    const t = view().textContent || '';
    ok(name + ': renders', t.length > (minLen || 80) && !/Something went wrong|ran into a problem|\b(Page|Lesson|Question|Paper|Deck|Lab|Test|Subject|Topic) not found\b/.test(t), t.slice(0, 120));
    const pops = [...document.querySelectorAll('.btn.pop')].filter(b => b.getClientRects().length && getComputedStyle(b).visibility !== 'hidden' && !b.closest('[hidden], .me-menu'));
    const noMatch = !!view().querySelector('[data-nomatch]') || [...view().querySelectorAll('button, a')].some(b => b.getClientRects().length && /^\s*Clear filters\s*$/.test(b.textContent));
    ok(name + ': exactly one coral (.pop) CTA (D18)', noMatch ? pops.length <= 1 : pops.length === 1, pops.length ? pops.map(b => b.textContent.trim().slice(0, 30)).join(' | ') : 'no coral on this screen');
    ok(name + ': no NaN/undefined', !/\bNaN\b|undefined|\[object/.test(view().innerHTML.replace(/data-[a-z-]+="[^"]*"/g, '')), (view().innerHTML.match(/.{30}(NaN|undefined|\[object).{30}/) || [''])[0]);
  };

  /* the shared next step (P0-08): every global coral names the same target as GA.stats.nextStep (kind 'any': Home, /progress, palette row 1;
     kind 'lesson': the /syllabus header). Compared by route (query and anchor aside). */
  const shown = b => b.getClientRects().length && getComputedStyle(b).visibility !== 'hidden' && !b.closest('[hidden], .me-menu');
  const routeOf = h => String(h || '').replace(/^#/, '').split('?')[0].split('#')[0];
  /** really on screen: not display:none, not in a closed <details>, not content-visibility hidden */
  const seen = e => (e.checkVisibility ? e.checkVisibility({ visibilityProperty: true }) : !!e.getClientRects().length);
  async function corals(when) {
    const N = GA.stats && GA.stats.nextStep;
    if (typeof N !== 'function') { info('next step: GA.stats.nextStep is not loaded, so the coral agreement is not checked'); return; }
    const any = N(S.state, D(), { kind: 'any', scope: 'all', today: U.today() }), les = N(S.state, D(), { kind: 'lesson', scope: 'all', today: U.today() });
    const noLessons = !D().lessons.length;          // the writers have shipped nothing yet: there is no lesson step to agree with on /syllabus
    await go('/', 300);
    GA.search.open(); await wait(80);
    const r1 = document.querySelector('#pres .pitem');
    ok(`next step (${when}): palette row 1 = nextStep(any) (P0-08)`, !!r1 && !!any && routeOf(r1.getAttribute('href')) === routeOf(any.href), (r1 && r1.getAttribute('href')) + ' vs ' + (any && any.href));
    GA.search.close(); await wait(60);
    for (const [r, step, kind] of [['/', any, 'any'], ['/progress', any, 'any']].concat(noLessons ? [] : [['/syllabus', les, 'lesson']])) {
      await go(r, 300);
      const c = [...document.querySelectorAll('#view .btn.pop')].filter(shown)[0], h = c && c.getAttribute('href');
      ok(`next step (${when}): the ${r} coral = nextStep(${kind}) (P0-08)`, !!step && !!h && routeOf(h) === routeOf(step.href), `${h || (c ? 'a button' : 'no coral')} vs ${step ? step.href : 'no step'}`);
    }
  }

  /* opened states (P0-24): a question card at 360 px with its answer shown and every fold open never pushes content past its own edge,
     except inside a box that scrolls */
  const pastEdge = (root, box) => { const cr = box.getBoundingClientRect(); return [...root.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); if (!r.width || r.right <= cr.right + 1 || e.closest('.katex-mathml, .sr') || (e.parentElement && e.parentElement.closest('.hide-tail'))) return false; for (let p = e.parentElement; p && p !== box; p = p.parentElement) { const ox = getComputedStyle(p).overflowX; if (ox === 'auto' || ox === 'scroll') return false; } return true; }); };
  const label = e => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/)[0] : '') + '[r=' + Math.round(e.getBoundingClientRect().right) + ']';
  async function openStates() {
    if (!GA.qcard) await U.loadScript('app/js/views/qcard.js');
    // an ICAI bank: its widest items (the longest answers: wide working tables) in every mode the card has
    const wide = icaiOn() ? D().questions.slice().sort((a, b) => (b.flags & 32) - (a.flags & 32)) : [];
    const mcq = wide.find(x => x.type === 'MCQ' && x.grouped), desc = wide.filter(x => x.type === 'DESC' && x.hasAns);
    const cases = icaiOn() ? [[mcq && mcq.id, 'practice'], [desc[0] && desc[0].id, 'practice'], [desc[1] && desc[1].id, 'exam'], [mcq && mcq.id, 'embed'], [desc[2] && desc[2].id, 'review']].filter(c => c[0])
      : [['cs-2017-2:Q5', 'practice'], ['cs-2026-1:Q27', 'practice'], ['cs-2007:Q77', 'practice'], ['cs-2013:Q50', 'practice'], ['cs-2020:CS37', 'exam'], ['cs-2007:Q29', 'embed'], ['cs-2014-1:CS3', 'review']];
    const box = document.createElement('div'); box.style.cssText = 'position:absolute;left:-9999px;top:0;width:360px'; document.body.append(box);
    for (const [id, mode] of cases) {
      if (!D().qById[id]) { info('open states: ' + id + ' is not in the bank'); continue; }
      let q = null; try { q = await GA.data.question(id); } catch (e) { q = null; }
      if (!q) { ok('open states: ' + id + ' loads', false); continue; }
      box.innerHTML = '';
      const card = GA.qcard.create(q, { mode, resp: mode === 'review' && q.type === 'DESC' ? { t: 'An answer.', m: 1 } : undefined, state: mode === 'review' && q.type === 'DESC' ? 'partial' : undefined }); box.append(card.el);
      const show = card.el.querySelector(q.type === 'DESC' ? '[data-a="check"]' : '[data-a="reveal"]'); if (show && mode !== 'exam') click(show);
      for (let t = 0; t < 30 && mode !== 'exam' && !card.el.querySelector('details'); t++) await wait(100);
      const folds = card.el.querySelectorAll('details');
      folds.forEach(d => { d.open = true; });
      await wait(150);
      if (mode !== 'exam' && !folds.length) { ok(`open states: ${id} (${mode}) shows its ${q.icai ? 'ICAI answer' : 'worked solution'}`, false, 'no answer fold after Show answer'); continue; }
      const bad = pastEdge(card.el, card.el);
      ok(`open states: ${id} (${mode}) at 360 px, answer shown and folds open, stays inside the card (P0-24)`, !bad.length, bad.length + ' past the edge: ' + bad.slice(0, 3).map(label).join(', '));
    }
    box.remove();
    // the dev aid behind these checks (?probe=1&open=1): on the real question page the Show answer slot reads 'Hint' first (P2-64), so the probe
    // presses Hint, then Show answer, then opens the folds; the worked solution must end up open
    if (D().qById['cs-2017-2:Q5']) {
      await go('/q/' + encodeURIComponent('cs-2017-2:Q5'), 700);
      const hadHint = !!view().querySelector('[data-a="hint"]');
      const n = await GA.shell._openAll();
      const sd = view().querySelector('.qc-sd');
      ok('probe: &open=1 presses Hint, then Show answer, and opens the worked solution (P0-24)', (!hadHint || n.hint >= 1) && n.reveal >= 1 && !!sd && sd.open && !view().querySelector('[data-a="hint"], [data-a="reveal"]'),
        `hint ${n.hint} (shown ${hadHint}), show answer ${n.reveal}, folds ${n.details}, solution ${sd ? (sd.open ? 'open' : 'closed') : 'missing'}`);
    }
    // the same for a Home PYQ widget: answer it, open its worked solution, nothing may end past the widget outside a scroll box. The widget is
    // pinned (#/?try=<id>, Home's dev aid) to the long-option question cs-2014-1:CS29, so the check does not depend on the day's pick
    await go(D().qById['cs-2014-1:CS29'] ? '/?try=' + encodeURIComponent('cs-2014-1:CS29') : '/', 700);
    const w = document.querySelector('#hm-try, #hm-rq');
    if (!w) { info('open states: no Home PYQ widget on this screen'); return; }
    for (let t = 0; t < 40 && !w.querySelector('.hm-op, .hm-nat input'); t++) await wait(100);
    const op = w.querySelector('.hm-op'), nat = w.querySelector('.hm-nat input');
    if (op) click(op); else if (nat) { nat.value = '1'; nat.dispatchEvent(new Event('input', { bubbles: true })); const b = w.querySelector('[data-nat]'); if (b) click(b); }
    else { info('open states: the Home widget shows no question'); return; }
    await wait(200);
    const det = w.querySelector('details');
    if (!det) { info('open states: the Home question has no worked solution'); return; }
    det.open = true;
    for (let t = 0; t < 30 && /hm-qsk|^\s*$/.test(((w.querySelector('.hm-sol-b') || {}).innerHTML) || ''); t++) await wait(100);
    await wait(150);
    const bad = pastEdge(w, w);
    ok(`open states: the Home widget (${w.dataset.qid || w.id}) with its solution open stays inside it (P0-24)`, !bad.length, bad.length + ' past the edge: ' + bad.slice(0, 3).map(label).join(', '));
  }

  /** the fold line: the sticky top bar's bottom, or 0 where the bar scrolls away (screens under 500 px tall in landscape, P2-55) */
  const barLine = () => { const tb = document.querySelector('.topbar'); return getComputedStyle(tb).position === 'sticky' ? Math.max(0, tb.getBoundingClientRect().bottom) : 0; };
  const settle = () => new Promise(res => { const off = GA.router.on('after', () => { off(); setTimeout(res, 150); }); setTimeout(res, 4000); });
  const kdOn = (el, key) => el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  /* the shell's P1 behaviour: Back keeps your place (P1-01), overlays live on history (P1-47), focus and announcements (P1-48), honest failures (P1-59, P1-51) */
  async function shellP1() {
    // P1-01: a new page starts at the top, Back returns to the place you left
    await go('/s/' + SUBJ(), 600);
    const room = document.documentElement.scrollHeight - innerHeight;
    if (room > 600 && ![...view().querySelectorAll('a[href^="#/l/"]')].some(seen)) info('scroll: /s/' + SUBJ() + ' has no lesson link yet, so Back is not checked');
    else if (room > 600) {
      scrollTo(0, Math.min(1400, room - 20)); await wait(400);
      // the reading place = the last heading above the fold and how far past it the reader is (what the router saves)
      const place = () => { const line = barLine() + 8; let h = null; for (const e of view().querySelectorAll('h1[id], h2[id], h3[id], h4[id], [data-anchor][id]')) { const t = e.getBoundingClientRect().top; if (t <= line && e.getClientRects().length) h = [e.id, Math.round(line - t)]; } return h; };
      const y0 = scrollY, p0 = place(), link = [...view().querySelectorAll('a[href^="#/l/"]')].find(seen);
      const p1 = settle(); click(link); await p1;
      ok('scroll: a new page starts at the top (P1-01)', scrollY < 5, 'scrollY ' + scrollY);
      const p2 = settle(); history.back(); await p2; await wait(600);
      const p3 = place();
      ok('scroll: Back returns to the place you left (P1-01)', location.hash === '#/s/' + SUBJ() && (p0 ? !!p3 && p3[0] === p0[0] && Math.abs(p3[1] - p0[1]) < 30 : Math.abs(scrollY - y0) < 30), `at ${location.hash}: ${JSON.stringify(p3)} vs ${JSON.stringify(p0)} (scrollY ${scrollY} vs ${y0})`);
    } else info('scroll: /s/' + SUBJ() + ' is too short here to test Back');
    // an anchor wins over both: #/l/<id>#<heading>
    { const l = D().lessons.find(x => x.subject === SUBJ()) || D().lessons[0];
      if (!l) info('scroll: no lesson shipped yet, so the anchor landing is not checked');
      else { await go('/l/' + l.id, 700);
      const h = [...view().querySelectorAll('h2[id], h3[id]')].filter(seen)[3];
      if (h) { const id = h.id, p = settle();
        { const h1 = view().querySelector('h1'); if (h1) { if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); } }   // where a navigation from the view leaves focus
        location.hash = '#/l/' + l.id + '#' + id; await p; await wait(500);
        const el = document.getElementById(id), top = el ? el.getBoundingClientRect().top : -1, bar = barLine();
        ok('scroll: an in-page anchor lands its heading under the top bar (P1-01)', top >= bar - 2 && top < bar + 60, `heading top ${Math.round(top)}, bar ${Math.round(bar)}`);
        ok('focus: an anchor link moves focus to its heading, so Tab goes on from there (P1-01, P1-48)', !!el && document.activeElement === el, document.activeElement && (document.activeElement.id || document.activeElement.tagName)); }
      else info('scroll: the lesson has no headings with ids'); } }

    // P1-47: overlays live on history; Back closes the top one, links inside replace its step
    await go('/pyq', 400);
    const h0 = location.hash;
    GA.search.open(); await wait(60);
    ok('overlays: opening the palette adds its own history step (P1-47)', !!(history.state && history.state.ov) && GA.search.isOpen);
    history.back(); await wait(400);
    ok('overlays: Back closes the palette and stays on the page (P1-47)', !GA.search.isOpen && location.hash === h0 && !(history.state && history.state.ov), location.hash);
    GA.search.open(); await wait(60); kdOn(document.getElementById('pq'), 'Escape'); await wait(400);
    { const p = settle(); location.hash = '#/labs'; await p; const p2 = settle(); history.back(); await p2; await wait(200);
      ok('overlays: a palette closed with Escape leaves no extra Back step (P1-47)', location.hash === h0 && !(history.state && history.state.ov), `${location.hash} ${JSON.stringify(history.state)}`); }
    GA.shell.menu(true); await wait(60);
    { const L = history.length, p = settle(); click(document.querySelector('#me-menu a[href="#/plan"]')); await p;
      ok('overlays: a Me-menu link replaces the menu step (P1-47)', location.hash === '#/plan' && history.length === L && !document.querySelector('.shell.me-open'), `${location.hash} len ${history.length} vs ${L}`);
      const p2 = settle(); history.back(); await p2;
      ok('overlays: Back from there returns to the page the menu was opened on (P1-47)', location.hash === h0, location.hash); }
    GA.shell.shortcuts(); await wait(60);
    history.back(); await wait(400);
    ok('overlays: Back closes a dialog, not the page (P1-47)', !document.querySelector('.scrim') && location.hash === h0, location.hash);
    GA.shell.menu(true); await wait(60); history.back(); await wait(400);
    ok('overlays: Back closes the Me sheet, not the page (P1-47)', !document.querySelector('.shell.me-open') && location.hash === h0, location.hash);

    // P1-48: focus follows the action; the page behind a dialog is inert; one pair of live regions speaks
    await go('/syllabus', 400);
    { const a = document.createElement('a'); a.href = '#/labs'; a.textContent = 'Labs (selftest link)'; view().prepend(a);
      a.focus(); const p = settle(); click(a); await p; await wait(100);
      const f = document.activeElement;
      ok('focus: a link inside the view hands focus to the new view\'s heading (P1-48)', location.hash === '#/labs' && !!f && view().contains(f) && f.matches('h1, [data-focus]'), `${location.hash}: ${f ? f.tagName + '.' + f.className : 'none'}`); }
    { const opener = document.getElementById('open-search'); opener.focus(); click(opener); await wait(80);
      ok('focus: the page behind the palette is inert (P1-48)', document.getElementById('app').inert === true);
      kdOn(document.getElementById('pq'), 'Escape'); await wait(120);
      ok('focus: closing the palette gives focus back to its opener (P1-48)', document.activeElement === opener && !document.getElementById('app').inert, document.activeElement && document.activeElement.id);
      GA.shell.shortcuts(); await wait(80);
      const dlg = document.querySelector('.scrim .modal');
      ok('focus: a dialog keeps focus inside it and the page behind is inert (P1-48)', !!dlg && dlg.contains(document.activeElement) && document.getElementById('app').inert === true);
      kdOn(document.activeElement, 'Escape'); await wait(120);
      ok('focus: Escape closes the dialog and focus returns (P1-48)', !document.querySelector('.scrim') && !document.getElementById('app').inert); await wait(300); }
    GA.ui.say('Selftest announcement'); await wait(450);
    ok('announce: one persistent polite region speaks GA.ui.say (P1-48)', document.querySelectorAll('#ga-live-polite').length === 1 && document.getElementById('ga-live-polite').textContent === 'Selftest announcement');
    GA.ui.toast('Selftest toast'); await wait(450);
    ok('announce: toasts speak through it, never through fresh live regions (P1-48)', !document.querySelector('.toast[role], .toasts [aria-live], .toast[aria-live]') && document.getElementById('ga-live-polite').textContent === 'Selftest toast');

    // P1-59: one honest load-failure card; P1-51: the router's error card always offers the saved data
    { const d = document.createElement('div'); view().append(d); let again = 0;
      GA.ui.loadFailed(d, { what: 'lesson', retry: () => { again++; } });
      ok('load failure: one card, title by kind, Try again (not a second coral) (P1-59)', /This lesson did not load/.test(d.textContent) && !!d.querySelector('[data-retry]') && !d.querySelector('.btn.pop'));
      ok('load failure: build.py is named only for a copy opened from a folder (P1-59)', (location.protocol === 'file:') === /build\.py/.test(d.textContent));
      click(d.querySelector('[data-retry]')); await wait(40); ok('load failure: Try again retries (P1-59)', again === 1); d.remove(); }
    if (!GA.router._selftestRoute) { GA.router._selftestRoute = true; GA.router.add('/selftest-throws', { enter() { throw new Error('a view threw (selftest)'); } }); }
    await go('/selftest-throws', 200);
    ok('errors: a view that throws gets one card with Try again as the coral (P1-51)', !!view().querySelector('.err-card') && view().querySelectorAll('.btn.pop').length === 1);
    ok('errors: the error card offers Download my saved data (P1-51)', typeof S.rawText !== 'function' || !!view().querySelector('[data-err="save"]'));

    // P1-46: the Me header says when the exam date is assumed, with 'Set it'
    if (GA.stats && typeof GA.stats.exam === 'function') {
      const E = GA.stats.exam(S.state, D().exam, U.today());
      GA.shell.menu(true); await wait(80);
      const st = document.querySelector('#me-status a[href="#/plan?set=exam"]');
      ok('me menu: an assumed exam date is said so, with Set it (P1-46)', E.basis === 'assumed' ? !!st && /assumed/.test(st.textContent) : !st || E.basis !== 'yours', `basis ${E.basis}`);
      GA.shell.menu(false); await wait(300);
    } else info('me menu: GA.stats.exam is not loaded, the assumed-date line is not checked');

    // P0-24: the ?probe=1 report counts real clipping only: display:contents, table row groups, KaTeX's glyph boxes and SVG drawings never clip
    { const fx = document.createElement('div'); fx.style.cssText = 'position:absolute;left:0;top:0;width:300px';
      fx.innerHTML = '<section style="display:contents;overflow:hidden"><p style="width:200px;margin:0">fits</p></section>' +
        '<div style="width:100px;overflow:hidden"><p style="width:240px;margin:0">cut</p></div>' +
        '<div style="width:100px;overflow-x:auto"><p style="width:240px;margin:0">scrolls</p></div>' +
        '<span class="katex"><span class="hide-tail" style="display:block;width:50px"><i style="display:block;width:120px">glyph</i></span></span>' +
        '<table style="width:280px"><tbody style="overflow:hidden"><tr><td>row</td></tr></tbody></table>' +
        '<svg width="60" height="20" viewBox="0 0 60 20"><rect x="40" width="200" height="20"/></svg>';
      document.body.append(fx);
      const rep = GA.shell._overflow(fx, innerWidth);
      ok('probe: only real clipping counts as clipped (display:contents, table rows, KaTeX glyphs, SVG drawings never clip) (P0-24)',
        rep.clipped.length === 1 && rep.clipped[0].textContent === 'cut' && !rep.page.length, `clipped: ${rep.clipped.map(e => e.tagName + ':' + e.textContent).join(', ')}; page ${rep.page.length}`);
      fx.remove(); }

    // P1-55: a click (or tap) pins the info tip with aria-describedby; a press outside closes it
    { await go('/', 300); const host = document.createElement('div'); host.innerHTML = GA.ui.infoTip('Selftest tip\nsecond line', { label: 'About' }); view().append(host);
      const b = host.querySelector('.itip'); click(b); await wait(60);
      const tip = document.getElementById('ga-ftip');
      ok('tips: a click pins the info tip and describes the trigger (P1-55)', !!tip && tip.classList.contains('on') && b.getAttribute('aria-describedby') === 'ga-ftip' && /Selftest tip/.test(tip.textContent));
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); await wait(40);
      ok('tips: a press outside closes it (P1-55)', !tip.classList.contains('on') && !b.hasAttribute('aria-describedby'));
      ok('tips: the trigger is a real button named by its text (P1-55)', b.tagName === 'BUTTON' && b.type === 'button' && /About: Selftest tip/.test(b.textContent));
      host.remove(); }
  }

  /* the shell's Part B: the Me menu, the tab bar, single-key shortcuts, the help, not-found, the bar colour, the empty palette (P2/P3 items) */
  async function shellP2() {
    // P2-45 (D6): Me is lit on Tests and Map; P2-48: Sources & method in the Me menu; P3-29: neutral badges
    for (const [r, k] of [['/test', 'me'], ['/map', 'me'], ['/pyq', '/pyq'], ['/s/' + SUBJ(), '/syllabus']].concat(D().lessons[0] ? [['/l/' + D().lessons[0].id, '/syllabus']] : [], [['/about', 'me']])) {
      await go(r, 200);
      const on = [...document.querySelectorAll('.tabbar .tb-tab.on')].map(a => a.dataset.href);
      ok(`tab bar: ${r} lights ${k === 'me' ? 'Me' : k} (P2-45)`, on.length === 1 && on[0] === k, on.join(','));
    }
    // P2-45: a tap on the lit tab scrolls to the top; the next tap goes to that tab's first screen
    { await go('/s/' + SUBJ(), 400); scrollTo(0, 600); await wait(200);
      const t = document.querySelector('.tabbar a.tb-tab[data-href="/syllabus"]'), was = scrollY, real = window.scrollTo;
      let asked = null; window.scrollTo = function (o) { asked = o; return real.apply(this, arguments); };   // headless Chrome does not run smooth scrolls
      try { click(t); await wait(100); } finally { window.scrollTo = real; }
      const top = !!asked && asked.top === 0 && location.hash === '#/s/' + SUBJ();
      real.call(window, 0, 0); await wait(60);
      const p = settle(); click(t); await p;
      ok('tab bar: a tap on the lit tab scrolls to the top, the next tap goes to its first screen (P2-45)', was > 100 && top && location.hash === '#/syllabus', `from ${was}: asked ${JSON.stringify(asked)}, ${location.hash}`); }
    ok('me menu: Sources & method is in the menu, the planner first (P2-48, P2-40)', !!document.querySelector('#me-menu a.mi[href="#/about"]') && document.querySelector('#me-menu a.mi:not(.me-more a)').getAttribute('href') === '#/plan');
    // P2-49 / P2-75: GA.engage.meLines' backup nudge is a real Export button, the moving-devices line links Settings (stubbed lines: the state needs 7 days)
    if (GA.engage && typeof GA.engage.meLines === 'function') {
      const real = GA.engage.meLines;
      GA.engage.meLines = () => [{ kind: 'backup', text: 'Not backed up yet · 9 active days · Export', lead: 'Not backed up yet · 9 active days', act: 'Export', action: 'export' },
        { kind: 'import', text: 'Progress is saved in this browser · Studied on another device? Import your backup', lead: 'Progress is saved in this browser · Studied on another device?', act: 'Import your backup', href: '#/settings' }];
      try {
        GA.shell.menu(true); await wait(80);
        const b = document.querySelector('#me-status button[data-me-act="export"]'), a = document.querySelector('#me-status a[href="#/settings"]');
        ok('me menu: the backup nudge is an Export button and the import line links Settings (P2-49, P2-75)', !!b && /Not backed up yet · 9 active days · Export/.test(b.textContent) && !!a && /Import your backup/.test(a.textContent));
      } finally { GA.engage.meLines = real; GA.shell.menu(false); await wait(300); }
    }
    ok('me menu: the phone group is labelled More with Tests and Map (P2-45, P2-12)', /More/.test((document.getElementById('me-more-l') || {}).textContent || '') && !!document.querySelector('.me-more a[href="#/test"]') && /^Tests$/.test(document.querySelector('.me-more a[href="#/test"]').textContent.trim()));
    { const b = document.querySelector('.mi-n'); b.hidden = false; b.textContent = '3'; const bg = getComputedStyle(b).backgroundColor, pop = getComputedStyle(document.querySelector('.btn.pop') || document.body).backgroundColor;
      ok('me menu: badges are neutral, never a second coral (P3-29)', !document.querySelector('.btn.pop') || bg !== pop, bg + ' vs ' + pop); b.hidden = true; b.textContent = ''; }
    // P3-17: with single-key shortcuts off, g-keys and '/' do nothing; Mod+K still opens search
    { const kd = (k, o) => document.dispatchEvent(new KeyboardEvent('keydown', Object.assign({ key: k, bubbles: true, cancelable: true }, o || {})));
      await go('/pyq', 200);
      GA.actions.setProfile({ keys: false }); await wait(30);
      kd('g'); kd('h'); await wait(250);
      ok('keys: single-key shortcuts can be turned off (P3-17)', location.hash === '#/pyq' && GA.ui.singleKeys() === false, location.hash);
      kd('k', { ctrlKey: true }); await wait(80);
      ok('keys: Ctrl/⌘ K still opens search with single keys off (P3-17)', GA.search.isOpen);
      GA.search.close(); await wait(300);
      GA.actions.setProfile({ keys: true }); await wait(30); }
    // P3-06: a button's name holds what it shows (WCAG 2.5.3): the search button's label, the avatar's 'ME' or initials
    { const sb = document.getElementById('open-search'), vis = (sb.querySelector('span') || {}).textContent || '', av = document.getElementById('me-btn');
      const nm = s => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
      ok('names: the search button and the avatar say what they show (P3-06)', !!vis && nm(sb.getAttribute('aria-label')).includes(nm(vis)) && nm(av.getAttribute('aria-label')).includes(nm(av.textContent)),
        `${sb.getAttribute('aria-label')} / ${vis}; ${av.getAttribute('aria-label')} / ${av.textContent}`); }
    // P2-46: the '?' help lists Anywhere (with ⌘/Ctrl K) and Go to (with the tab labels)
    { GA.shell.shortcuts(); await wait(80);
      const m = document.querySelector('.scrim .modal'), hs = m ? [...m.querySelectorAll('.ks-h')].map(h => h.textContent) : [];
      ok('help: Anywhere and Go to sections, ⌘/Ctrl K listed, tab labels used (P2-46, P2-12)', hs.includes('Anywhere') && hs.includes('Go to') && /(⌘|Ctrl)\s*K/.test(m.textContent) && /Learn/.test(m.textContent) && /Questions/.test(m.textContent), hs.join(','));
      ok('help: the dialog title is an h2 that names it (P3-06)', !!m && !!m.querySelector('h2.m-title') && m.getAttribute('aria-labelledby') === m.querySelector('h2.m-title').id);
      history.back(); await wait(400); }
    // P2-46: 'On this page' names a control by its words, never with its hidden key digit glued on ('Syllabus map', not 'Syllabus map1'), and a
    // view's registered keys print alternatives as words between keys ('← / →')
    { await go('/map', 500);
      const tabs = [...document.querySelectorAll('#view [aria-keyshortcuts]')].filter(e => e.getClientRects().length), rows = GA.shell._pageRows();
      const want = tabs.map(t => [...t.childNodes].filter(c => !(c.nodeType === 1 && (c.matches('kbd, svg') || c.getAttribute('aria-hidden') === 'true'))).map(c => c.textContent).join('').replace(/\s+/g, ' ').trim());
      ok('help: the map\'s page keys read 1 · Syllabus map, without the key glued on (P2-46)', !!rows.length && rows.length === tabs.length && rows.every((r, i) => r[1] === want[i] && !/\d$/.test(r[1]) && /^<kbd>\d<\/kbd>$/.test(r[0])),
        rows.map(r => r[0].replace(/<\/?kbd>/g, '') + ' ' + r[1]).join(' · '));
      GA.ui.pageKeys([['Space', 'Play or pause'], ['ArrowLeft / ArrowRight', 'Step back or forward'], ['Home / End', 'First or last step']]);
      const reg = GA.shell._pageRows();
      ok('help: registered page keys print alternatives between keys as words (P2-46)', reg.length === 3 && reg[1][0] === '<kbd>←</kbd> / <kbd>→</kbd>' && reg[2][0] === '<kbd>Home</kbd> / <kbd>End</kbd>' && reg[0][0] === '<kbd>Space</kbd>',
        reg.map(r => r[0]).join(' | '));
      GA.ui.pageKeys([]); }
    // the empty palette (P2-46): row 1 the next step; the most-asked CS topics with their counts; places not in the bar; no Due group at 0
    { await go('/', 300); GA.search.open(); await wait(80);
      const grp = [...document.querySelectorAll('#pres .grp')].map(g => g.textContent);
      const due = GA.stats.due(S.state, D(), U.today());
      ok('palette: empty groups are Most-asked chapters (with an ICAI bank) and Go to; Due now only with something due (P2-46)', grp.includes('Most-asked chapters') === bankOn() && grp.includes('Go to') && (grp.includes('Due now') === !!((due.cards || 0) + (due.questions || []).length)), grp.join(' | '));
      // P3-15: the type tabs are one radio group with one tab stop; an arrow moves the selection
      const tabs = [...document.querySelectorAll('#pf [role="radio"]')];
      ok('palette: the type tabs have one tab stop (P3-15)', tabs.length === 6 && tabs.filter(t => t.tabIndex === 0).length === 1);
      tabs[0].focus(); tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })); await wait(40);
      const now = [...document.querySelectorAll('#pf [role="radio"]')];
      ok('palette: an arrow moves focus and selection along the tabs (P3-15)', now[1].getAttribute('aria-checked') === 'true' && document.activeElement === now[1] && now[1].tabIndex === 0);
      GA.search.close(); await wait(300); }
    // P3-19: question rows carry a state dot and a one-line snippet of the question once its paper has arrived
    if (!bankOn()) info('palette: no ICAI bank yet, so question rows (P3-19, Part C) are not checked');
    else { GA.search.open(); await wait(60);
      const inp = document.getElementById('pq'); inp.value = icaiOn() ? 'overhead' : 'cache'; inp.dispatchEvent(new Event('input'));
      for (let t = 0; t < 40 && !document.querySelector('#pres .pitem .snip:not(:empty)'); t++) await wait(100);
      const s = document.querySelector('#pres .pitem .snip:not(:empty)');
      ok('palette: question rows carry a one-line snippet of the question (P3-19)', !!s && s.textContent.length > 20 && getComputedStyle(s).whiteSpace === 'nowrap', s ? s.textContent.slice(0, 60) : 'no snippet');
      GA.search.close(); await wait(300); }
    // Part C (P0-23): the Questions group is the bank's own list: every row is in what its 'All N' row opens, and the bank page says N
    // ('normalization' listed four normal-form rows and opened four others; 'cache lab' four cache-only rows and 'All 2'; 'lab' two rows and 'All 90')
    if (bankOn()) { let pl = null;
      try { pl = await GA.data.searchPostings(); } catch (e) { pl = null; }
      for (const q of pl ? (icaiOn() ? ['overhead', 'process costing', 'cost'] : ['normalization', 'cache lab', 'lab']) : []) {
        await go('/', 200); GA.search.open(); await wait(60);
        const inp = document.getElementById('pq'); inp.value = q; inp.dispatchEvent(new Event('input'));
        let more = null;
        for (let t = 0; t < 40; t++) { more = document.querySelector('#pres .pitem.more'); if (more && /^All /.test(more.querySelector('.nm').textContent)) break; await wait(100); }
        const rows = [...document.querySelectorAll('#pres .pitem[href^="#/q/"]')].map(a => decodeURIComponent(a.getAttribute('href').slice(4)));
        const label = more ? more.querySelector('.nm').textContent : '', href = more ? more.getAttribute('href') : '';
        const n = +(((/^All ([\d,]+) /.exec(label) || [])[1]) || '-1').replace(/,/g, '');
        const lib = GA.pyqLib.filter(D(), GA.pyqLib.parse({ q }), S, pl), ids = new Set(lib.map(x => x.id));
        if (more) click(more); else GA.search.close();
        let bankN = -1;
        for (let t = 0; t < 50; t++) { const b = location.hash === href && view().querySelector('#pq-n b'); if (b) { bankN = +b.textContent.replace(/\D/g, ''); break; } await wait(100); }
        const page = [...view().querySelectorAll('details.pqr[data-id]')].map(d => d.dataset.id);
        ok(`palette: '${q}' lists only questions its 'All N' row opens, and the bank shows N (Part C)`, !!more && rows.length > 0 && rows.every(id => ids.has(id) && (lib.length > 25 || page.includes(id))) && n === lib.length && n === bankN,
          `rows ${rows.join(',')} · '${label}' · bank ${bankN} · lib ${lib.length} · not in the bank: ${rows.filter(id => !ids.has(id)).join(',')}`);
      }
      if (!pl) info('palette Part C check skipped: the search postings did not load'); }
    // P3-31: one not-found card for an unknown id, with its coral back link and the title 'Not found · PassBook'
    { await go('/', 200);
      GA.shell.notFound({ kind: 'lesson', id: 'no.such.lesson', back: { href: '#/syllabus', label: 'Go to Learn' } }); await wait(40);
      const pops = [...view().querySelectorAll('.btn.pop')];
      ok('not found: GA.shell.notFound draws one card with back as the coral (P3-31, D18)', !!view().querySelector('.nf h1') && /Lesson not found/.test(view().textContent) && pops.length === 1 && pops[0].getAttribute('href') === '#/syllabus');
      ok('not found: the title reads Not found · PassBook (P3-31)', document.title === 'Not found · PassBook', document.title);
      await go('/no/such/place', 150);
      ok('not found: an unknown path uses the same card and title (P3-31)', !!view().querySelector('.nf h1') && document.title === 'Not found · PassBook', document.title); }
    // P2-51: a chosen theme colours the browser bar; Auto restores the two media values
    { const metas = () => [...document.querySelectorAll('meta[name="theme-color"]')].map(m => m.getAttribute('content'));
      const was = GA.ui.themePref();
      GA.ui.setTheme('dark'); const dk = metas();
      GA.ui.setTheme('light'); const lt = metas();
      GA.ui.setTheme('auto'); const au = metas();
      ok('theme: the browser bar follows a chosen theme and Auto restores it (P2-51)', dk.every(c => c === '#0D0F13') && lt.every(c => c === '#F6F7F9') && au.join() === '#F6F7F9,#0D0F13', [dk, lt, au].map(x => x.join('/')).join(' · '));
      GA.ui.setTheme(was); }
    // P2-55: focus never lands under the tab bar or the top bar
    { const cs = getComputedStyle(document.documentElement), tb = document.querySelector('.topbar'), sticky = getComputedStyle(tb).position === 'sticky';
      const short = matchMedia('(max-height: 500px) and (orientation: landscape)').matches;
      info(`viewport ${innerWidth}x${innerHeight}: the top bar ${sticky ? 'sticks' : 'scrolls away'}`);
      ok('insets: html scroll padding clears the top bar and the tab bar (P2-55)', parseFloat(cs.scrollPaddingTop) >= (sticky ? tb.offsetHeight : 0) + 12 - 1 && parseFloat(cs.scrollPaddingBottom) >= 12, cs.scrollPaddingTop + ' / ' + cs.scrollPaddingBottom);
      ok('insets: on a short landscape screen the top bar scrolls away, elsewhere it sticks (P2-55)', sticky === !short, `sticky ${sticky}, short landscape ${short}`);
      const nh = parseFloat(cs.getPropertyValue('--nav-h'));
      ok('insets: --nav-h (and --topbar) is the room the bar takes: its height while it sticks, 0 where it scrolls away (P2-55)', Math.abs(nh - (sticky ? tb.offsetHeight : 0)) <= 1 && cs.getPropertyValue('--topbar') === cs.getPropertyValue('--nav-h'), `--nav-h ${cs.getPropertyValue('--nav-h')}, --topbar ${cs.getPropertyValue('--topbar')}, bar ${tb.offsetHeight}px`); }
    // P3-44: browsing does not count as focused study
    ok('time: only study screens count as focused study (P3-44)', GA.ui.studyRoute('/l/x') && GA.ui.studyRoute('/pyq') && !GA.ui.studyRoute('/') && !GA.ui.studyRoute('/progress'));
  }

  /* nav fit (tools/smoke.py runs this at 704, 764, 768, 780 px and more, fresh and demo; P2-44): the bar's last item stays inside its right padding,
     and no fold is taken that was not needed */
  async function navFit() {
    try {
      if (/seeddemo/.test(location.search)) for (let t = 0; t < 80 && !(document.getElementById('tb-chips') || {}).childElementCount; t++) await wait(100);
      await wait(500);
      const bar = document.querySelector('.topbar'), n = +bar.dataset.fit || 0, w = innerWidth;
      const kids = [...bar.children].filter(c => c.getBoundingClientRect().width), last = kids[kids.length - 1];
      const room = Math.round(bar.getBoundingClientRect().right - parseFloat(getComputedStyle(bar).paddingRight) - last.getBoundingClientRect().right);
      ok(`nav fit at ${w} px${/demo/.test(location.search) ? ' (demo)' : ''}: the last item stays inside the bar's padding (P2-44)`, !GA.shell._over(bar), `room ${room}px, fit-${n}`);
      let minimal = true;
      if (n > 0) { bar.classList.remove('fit-' + n); minimal = GA.shell._over(bar); bar.classList.add('fit-' + n); }
      ok(`nav fit at ${w} px${/demo/.test(location.search) ? ' (demo)' : ''}: no fold beyond what it needs (fit-${n}) (P2-44)`, minimal);
      ok(`nav fit at ${w} px${/demo/.test(location.search) ? ' (demo)' : ''}: the top bar sticks on a ${innerHeight} px tall screen and --nav-h is its height (P2-55)`, getComputedStyle(bar).position === 'sticky' && Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) - bar.offsetHeight) <= 1, getComputedStyle(document.documentElement).getPropertyValue('--nav-h') + ' vs ' + bar.offsetHeight);
      info(`nav fit at ${w} px: fit-${n}, ${room}px to spare, brand name ${getComputedStyle(bar.querySelector('.brand .bt')).display !== 'none' ? 'shown' : 'folded'}, search label ${getComputedStyle(bar.querySelector('.tb-search span')).display !== 'none' ? 'shown' : 'folded'}`);
    } catch (e) { out.push('FAIL exception: ' + e.message); }
    const pre = document.createElement('pre'); pre.id = 'selftest'; pre.textContent = out.join('\n') + '\nDONE'; document.body.append(pre);
  }

  /* D18 / P2-71: the states that used to end with no coral, seeded in this throw-away profile: every not-found screen, a notebook with open
     entries and none due, a deck with every card started and none due, a finished day plan, and every syllabus lesson done. Each gets exactly one
     coral. It runs last: it marks every lesson done. */
  async function seeded() {
    const popsNow = () => [...document.querySelectorAll('.btn.pop')].filter(shown);
    // not found, for every kind of id (P3-31): the shared card, its title and one coral
    for (const r of ['/l/no.such.lesson', '/s/nosuch', '/flash/nosuch', '/lab/nosuch'].concat(bankOn() ? ['/q/' + encodeURIComponent('no-such:Q99'), '/test/result/nosuch'] : [])) {
      await go(r, 250);
      const pops = popsNow();
      ok(`seeded: ${r} is the shared not-found card with one coral (P3-31, D18)`, !!view().querySelector('.nf h1') && pops.length === 1 && document.title === 'Not found · PassBook', `${pops.length} corals, title '${document.title}'`);
    }
    // a notebook with open entries and nothing due today (a miss comes back tomorrow at the earliest)
    { const open = () => Object.keys(S.state.nb).filter(id => S.state.nb[id] && !S.state.nb[id].resolved);
      if (!open().length) D().questions.filter(x => x.hasKey && x.section === 'CS').slice(0, 2).forEach(x => GA.actions.attempt(x, null, false, 60000, 'p'));
      const due = (GA.stats.due(S.state, D(), U.today()).questions || []).length;
      if (open().length && !due) { await go('/notebook', 400); healthy('seeded: notebook with open entries, none due');
        const c = popsNow()[0]; ok('seeded: with nothing due the notebook\'s coral practises new questions (D18)', !!c && /Practise/.test(c.textContent), c ? c.textContent.trim() : 'no coral'); }
      else if (!bankOn()) { await go('/notebook', 400); healthy('seeded: notebook with no ICAI bank'); }
      else info(`seeded: the notebook holds ${open().length} open and ${due} due entries, so 'none due' is not checked`); }
    // a deck with every card started and none due: its finish state
    { const l = D().lessons.find(x => D().cards.some(c => c.lesson === x.id));
      if (l) {
        D().cards.filter(c => c.lesson === l.id).forEach(c => GA.actions.reviewCard(c.id, 2));
        await go('/flash/' + encodeURIComponent(l.id), 500); healthy(`seeded: a deck with every card started and none due (${l.id})`, 40);
        ok('seeded: the finished deck says it is caught up (D18)', /caught up/i.test(view().textContent), view().textContent.trim().slice(0, 100));
      } }
    // a finished day plan: today's list cut to its first lesson row, and that lesson finished
    { const v = GA.planner && typeof GA.planner.current === 'function' ? GA.planner.current() : null, t = v && v.tasks.find(x => x.kind === 'learn' && x.lesson);
      if (t && typeof GA.planner.stored === 'function') {
        const snap = GA.planner.stored(v); snap.tasks = snap.tasks.filter(x => x.id === t.id);
        GA.actions.setPlan(snap); GA.actions.setLessonDone(t.lesson, true);
        await go('/plan', 400); healthy('seeded: a finished day plan');
        ok('seeded: the finished plan says so (D18)', /plan is done/i.test(view().textContent), view().textContent.slice(0, 120));
      } else info('seeded: today\'s plan has no lesson row, so the finished plan is not checked'); }
    // every syllabus lesson done
    D().lessons.forEach(l => { if (!(S.state.lessons[l.id] || {}).done) GA.actions.setLessonDone(l.id, true); });
    for (const r of ['/', '/syllabus', '/progress', '/map', '/s/' + SUBJ()]) { await go(r, 500); healthy('seeded: every lesson done, ' + r); }
    if (D().lessons.length) { await go('/syllabus', 300); const c = popsNow()[0];
      ok('seeded: with every lesson done the Learn coral is a full mock (an ICAI paper, or ICAI practice while none can be sat), or the flashcards while there is no ICAI bank (D18)', !!c && (icaiOn() ? /paper|practise|RTP/i : bankOn() ? /mock/i : /flashcard|mock/i).test(c.textContent), c ? c.textContent.trim() : 'no coral'); }
  }

  /* the PYQ bank and question page (WP9b). P0-14: the bank's search types in place. P0-13: on /q/:id a key never grades or leaves by
     accident: Enter on Bookmark, Hint, Show answer or Skip is that control's own action (the browser's activation is played by enter()),
     the arrows never leave from a radio or a button, A-D pick from a button, an auto-repeat Enter does nothing, Enter on the page checks once,
     J / K move without adding history steps. */
  async function pyqPages() {
    const kd = (el, key, o) => el.dispatchEvent(new KeyboardEvent('keydown', Object.assign({ key, bubbles: true, cancelable: true }, o || {})));
    const enter = el => { el.focus(); if (kd(el, 'Enter')) el.click(); };   // Enter on a focused button or link activates it unless a handler took the key
    const rec = id => JSON.stringify(S.state.q[id] || null), tries = id => (S.state.q[id] || {}).n || 0;
    const bar = a => view().querySelector(`.qc [data-a="${a}"]`), theme = () => document.documentElement.getAttribute('data-theme');
    const qOf = () => new URLSearchParams(location.hash.split('?')[1] || '').get('q');
    await go('/pyq', 400);
    { const inp = document.getElementById('pq-q'), head = view().querySelector('.pq-head'), th = theme(), n0 = history.length;
      const type = async s => { for (const ch of s) { if (kd(inp, ch)) { inp.value += ch; inp.dispatchEvent(new Event('input', { bubbles: true })); } await wait(25); } };
      inp.focus(); await type('dead'); await wait(500); await type('lock tree'); await wait(700);
      ok('bank: the search types in place: same field, focus and header (P0-14)', document.getElementById('pq-q') === inp && document.activeElement === inp && inp.value === 'deadlock tree' && view().querySelector('.pq-head') === head && scrollY === 0,
        `focus ${document.activeElement && (document.activeElement.id || document.activeElement.tagName)}, value '${inp.value}', header ${view().querySelector('.pq-head') === head ? 'same' : 'new'}, y ${scrollY}`);
      ok('bank: typing fires no shortcut and adds no history step (P0-14)', theme() === th && history.length === n0 && qOf() === 'deadlock tree',
        `theme ${th} -> ${theme()}, history ${n0} -> ${history.length}, ${location.hash}`); }
    if (GA.ui.singleKeys && !GA.ui.singleKeys()) { info('question keys: single-key shortcuts are off, so P0-13 is not checked'); return; }
    const used = new Set();
    const land = async need => {        // a fresh keyed CS MCQ whose page has these controls
      for (const x of D().questions) {
        if (used.size > 15) break;
        if (used.has(x.id) || !x.hasKey || x.type !== 'MCQ' || (!x.icai && x.section !== 'CS') || S.state.q[x.id]) continue;
        used.add(x.id); await go('/q/' + encodeURIComponent(x.id), 600);
        if (need.every(a => bar(a)) && view().querySelector('.qc-o[data-k="C"] input')) return x;
      }
      info('question keys: no fresh keyed MCQ with ' + need.join(', ') + ', so part of P0-13 is not checked'); return null;
    };
    const x = await land(['check', 'skip', 'mark']);
    if (x) { const h0 = location.hash, n0 = history.length;
      enter(bar('mark')); await wait(80); const bm = !!(S.state.q[x.id] || {}).bm;
      enter(bar('mark')); await wait(80);
      ok('question: Enter on Bookmark bookmarks and never checks (P0-13)', bm && tries(x.id) === 0 && !!bar('check') && location.hash === h0, `bookmarked ${bm}, attempts ${tries(x.id)}, ${location.hash}`);
      const r0 = rec(x.id);
      if (bar('hint')) { enter(bar('hint')); for (let i = 0; i < 30 && !bar('reveal'); i++) await wait(100); }
      const rv = bar('reveal'); if (rv) { enter(rv); await wait(200); }
      ok('question: Enter on Hint and Show answer leaves state.q unchanged (P0-13)', !!rv && !bar('check') && rec(x.id) === r0 && location.hash === h0 && history.length === n0,
        `${rv ? 'answer shown ' + !bar('check') : 'no Show answer'}, ${r0} -> ${rec(x.id)}, ${location.hash}, history ${n0} -> ${history.length}`); }
    const y = await land(['check', 'skip']);
    if (y) { const r0 = rec(y.id), h0 = location.hash, n0 = history.length;
      enter(bar('skip')); await wait(700);
      ok('question: Enter on Skip moves on and leaves state.q unchanged (P0-13)', rec(y.id) === r0 && /^#\/q\//.test(location.hash) && location.hash !== h0 && history.length === n0,
        `${h0} -> ${location.hash}, history ${n0} -> ${history.length}, ${r0} -> ${rec(y.id)}`); }
    const z = await land(['check', 'skip', 'prev']);
    if (z) { const h0 = location.hash, n0 = history.length, A = view().querySelector('.qc-o[data-k="A"] input'), C = view().querySelector('.qc-o[data-k="C"] input');
      A.focus(); kd(A, 'ArrowRight'); bar('skip').focus(); kd(bar('skip'), 'ArrowRight'); kd(bar('prev'), 'ArrowLeft'); await wait(400);
      ok('question: the arrows never leave from a radio or a button (P0-13)', location.hash === h0, location.hash);
      const b = bar('mark') || bar('note'); b.focus(); kd(b, 'c'); await wait(80);
      ok('question: C picks option C with focus on a button, and does not check (P0-13)', C.checked && tries(z.id) === 0 && !!bar('check'), `C ${C.checked}, attempts ${tries(z.id)}`);
      kd(document.body, 'Enter', { repeat: true }); await wait(100); const t0 = tries(z.id);
      kd(document.body, 'Enter'); await wait(200); const t1 = tries(z.id);
      kd(document.body, 'Enter'); await wait(200);
      ok('question: an auto-repeat Enter does nothing; Enter on the page checks once (P0-13)', t0 === 0 && t1 === 1 && tries(z.id) === 1 && location.hash === h0, `repeat ${t0}, first ${t1}, second ${tries(z.id)}, ${location.hash}`);
      kd(document.body, 'j'); await wait(600); const h1 = location.hash;
      kd(document.body, 'k'); await wait(600);
      ok('question: J and K move through the paper without adding history steps (P0-13)', h1 !== h0 && /^#\/q\//.test(h1) && location.hash === h0 && history.length === n0, `${h0} -> ${h1} -> ${location.hash}, history ${n0} -> ${history.length}`); }
  }

  /* ---------------------------------------------------------------- the ICAI bank (docs/ICAI_BANK.md §5–§7) */
  /** a descriptive item self-graded on its page; a lesson's 'ICAI asked this'; the bank's ICAI filters */
  async function icaiFlows() {
    const dq = D().questions.find(x => x.type === 'DESC' && x.hasAns && !S.state.q[x.id]);
    if (!dq) { info('icai: no descriptive item with ICAI\'s answer, so self-grading is not checked'); return; }
    await go('/q/' + encodeURIComponent(dq.id), 600); healthy('icai: descriptive question page');
    const main = view().querySelector('.qc [data-a="check"]');
    ok('icai: a descriptive item\'s main action is Show ICAI\'s answer', !!main && /Show ICAI/.test(main.textContent), main ? main.textContent : 'none');
    const box = view().querySelector('.qc-mine'); if (box) { box.value = 'My own answer (self-test).'; box.dispatchEvent(new Event('input', { bubbles: true })); }
    click(main); await wait(500);
    const fold = view().querySelector('.qc-icai'), gb = view().querySelectorAll('[data-a="grade"]');
    ok('icai: Show ICAI\'s answer opens ICAI\'s answer and the Got it / Partly / Missed buttons, and records nothing yet', !!fold && fold.open && gb.length === 3 && !(S.state.q[dq.id] && S.state.q[dq.id].n),
      `${fold ? 'fold ' + (fold.open ? 'open' : 'closed') : 'no fold'}, ${gb.length} grade buttons`);
    ok('icai: the answer shown is ICAI\'s own text, labelled with its document and page', !!fold && /ICAI.s answer/.test(fold.textContent) && /p\. \d/.test(fold.textContent), fold ? fold.textContent.slice(0, 80) : '');
    healthy('icai: answer shown');
    click(view().querySelector('[data-a="grade"][data-g="partly"]')); await wait(300);
    const e = S.state.q[dq.id] || {};
    ok('icai: Partly is a miss: recorded, kept in the notebook, back for revision (docs/ICAI_BANK.md §6)', e.n === 1 && e.g === 'partly' && e.lastOk === 0 && !!(S.state.nb[dq.id] && !S.state.nb[dq.id].resolved) && !!e.srs && e.mine === 'My own answer (self-test).',
      JSON.stringify({ n: e.n, g: e.g, nb: !!S.state.nb[dq.id], mine: e.mine }));
    ok('icai: after the grade Next is the one coral', !!view().querySelector('.qc [data-a="next"].pop') || !view().querySelector('.qc [data-a="next"]'));
    const row = GA.stats && GA.stats.retryDay ? GA.stats.retryDay(S.state, dq.id) : null;
    ok('icai: a Partly comes back for a retry from tomorrow', !!row && row > U.today(), String(row));
    // the bank's ICAI filters and states
    await go('/pyq?type=DESC&status=missed', 500); healthy('icai: bank, descriptive, missed or partly');
    ok('icai: status=missed lists the Partly item with its own state dot', !!view().querySelector(`.pqr[data-id="${dq.id}"] .pqr-st.part`), view().textContent.slice(0, 120));
    await go('/pyq?kind=rtp', 400); ok('icai: kind=rtp filters to RTPs', [...document.querySelectorAll('.pqr')].every(r => D().qById[r.dataset.id] && D().qById[r.dataset.id].kind === 'rtp') && document.querySelectorAll('.pqr').length > 0);
    // a lesson's 'ICAI asked this'
    const les = D().lessons.find(l => D().questions.some(x => x.subtopic === l.id || (x.tags || []).includes(l.id)));
    if (les) {
      await go('/l/' + les.id, 800);
      for (let t = 0; t < 60 && !document.querySelector('#lesson-body[data-full]'); t++) await wait(50);
      const blk = view().querySelector('.lsn-icai[data-ids]');
      ok('icai: the lesson lists the ICAI items tagged to it (ICAI asked this, with the documents)', !!blk && blk.querySelectorAll('.pq-row').length >= 1 && !!blk.querySelector('.lsn-icai-att'), blk ? blk.textContent.slice(0, 100) : 'no block');
      ok('icai: the lesson says why it matters from ICAI\'s documents', /ICAI asked it/.test((view().querySelector('.lsn-why') || {}).textContent || ''), ((view().querySelector('.lsn-why') || {}).textContent || '').slice(0, 100));
    } else info('icai: no lesson is tagged by an ICAI item yet');
  }
  /** the tests hub with an ICAI bank: an MCQ drill end to end, then a document sat as a paper with a descriptive answer self-marked */
  async function icaiTests() {
    await go('/test', 400); healthy('icai: tests hub');
    const sub = document.getElementById('t-sub');
    if (sub && !sub.disabled) {
      click(sub); await wait(1500);
      ok('icai: the MCQ drill opens the runner', /\/test\/run\//.test(location.hash) && !!document.querySelector('.exam .pal'), location.hash);
      const first = document.querySelector('.qc-o input'); if (first) first.click();
      await wait(100); click(document.getElementById('next')); await wait(150);
      ok('icai: the palette shows an answered question', !!document.querySelector('.pb.ans'));
      click(document.querySelector('[data-end]')); await wait(250);
      const yes = [...document.querySelectorAll('.scrim .btn')].find(b => /Submit/.test(b.textContent)); if (yes) click(yes);
      await wait(1500);
      ok('icai: an MCQ drill goes straight to its result (nothing to self-mark)', /\/test\/result\//.test(location.hash) && /Question review/.test(view().textContent), location.hash);
      healthy('icai: drill result');
      ok('icai: no negative marking in the result', !/−⅓|−⅔|negative marking: −/.test(view().textContent));
    } else info('icai: no MCQ drill is possible yet');
    // a document with descriptive items sat as a paper (the hub's ?new=paper link): briefing, a descriptive answer, Submit, self-marking, result
    const doc = D().papers.find(p => D().questions.some(x => x.paper === p.id && x.type === 'DESC' && x.hasAns));
    if (!doc) { info('icai: no document with descriptive items, so the sitting is not checked'); return; }
    await go('/test?new=paper&paper=' + doc.id, 1800);
    ok('icai: ?new=paper opens the briefing of that document', /\/test\/run\//.test(location.hash) && !!document.getElementById('xb-go'), location.hash);
    healthy('icai: briefing');
    ok('icai: the briefing says ICAI marks no negative', /no negative marking/.test(view().textContent) && !document.getElementById('xb-cbt'));
    click(document.getElementById('xb-go')); await wait(500);
    const lv = S.state.live, di = lv ? lv.qids.findIndex(id => D().qById[id] && D().qById[id].type === 'DESC') : -1;
    if (di >= 0) { click(document.querySelector(`[data-go="${di}"]`)); await wait(300); }
    const tick = document.querySelector('.qc-done input'), ta = document.querySelector('.qc-mine');
    ok('icai: a descriptive item in the runner has the answer box and the "answered on paper" tick', !!tick && !!ta);
    if (tick) { tick.click(); await wait(100); }
    ok('icai: the tick makes it answered', !!document.querySelector('.pb.ans'));
    click(document.querySelector('[data-end]')); await wait(250);
    const yes2 = [...document.querySelectorAll('.scrim .btn')].find(b => /Submit/.test(b.textContent)); if (yes2) click(yes2);
    await wait(1800);
    ok('icai: Submit with a descriptive answer opens self-marking', /\/test\/mark\//.test(location.hash) && !!view().querySelector('.tm-item'), location.hash);
    healthy('icai: self-marking');
    const t0 = S.state.tests[S.state.tests.length - 1];
    ok('icai: the sitting waits for its marks', !!t0 && t0.icai && t0.pendingMarks >= 1, t0 ? String(t0.pendingMarks) : 'no record');
    view().querySelectorAll('.tm-item').forEach((it, k) => {
      const half = it.querySelector('.tm-q [data-set]:nth-child(2)'), part = it.querySelector('[data-g="partly"]'), zero = it.querySelector('[data-set="0"]'), miss = it.querySelector('[data-g="missed"]');
      if (!k) { if (half) click(half); else if (part) click(part); } else { if (zero) click(zero); else if (miss) click(miss); }
    });
    click(document.getElementById('tm-go')); await wait(1500);
    const t1 = S.state.tests.find(x => x.id === (t0 && t0.id));
    ok('icai: Finish marking opens the result with the marks counted', /\/test\/result\//.test(location.hash) && !!t1 && t1.pendingMarks === 0, location.hash);
    healthy('icai: sitting result');
    const did = lv ? lv.qids[di] : null;
    ok('icai: a self-marked answer reaches the question record (half marks, or Partly, = Partly)', !did || (S.state.q[did] || {}).g === 'partly', did ? JSON.stringify(S.state.q[did] || null).slice(0, 80) : '');
  }

  /** the self-test resets its profile first, so it never runs in the learner's own ('main'): the shell gives ?selftest=1 the 'selftest' profile */
  const guard = () => { if (S.profile === 'main') throw new Error('the self-test resets its profile, so it does not run in your own progress: open index.html?selftest=1&profile=selftest'); };
  async function run() {
    try {
      guard();
      S.reset();
      ok('boot: top nav + phone tab bar + Me menu', !!document.querySelector('.topbar .brand') && document.querySelectorAll('.topbar .tn-a').length === 6 && !!document.querySelector('.tabbar') && !!document.getElementById('me-menu'));
      ok('boot: no sidebar', !document.querySelector('.sidebar'));
      await corals('fresh');
      await go('/', 300); healthy('home');
      ok('home: nav marks Home active', !!document.querySelector('.tn a.tn-a.on[href="#/"]') && document.querySelectorAll('.tn a.on').length === 1);
      await go('/progress', 200); healthy('progress (new user)');
      { const pops = [...view().querySelectorAll('.btn.pop')].filter(shown), t = view().textContent;
        ok('progress: calm start for a new learner (one start card, no goals wall)', !/Today.s goals/i.test(t) && pops.length === 1, `${pops.length} corals; ${(t.match(/Today.s goals/i) || ['no goals wall'])[0]}`); }
      for (const r of ['/map', '/map?lens=prereq', '/map?lens=exam', '/syllabus', '/pyq', '/test', '/test?new=mock', '/flash', '/notebook', '/plan', '/labs', '/settings', '/about'].concat(GA.shell.has('/rev') ? ['/rev', '/rev/' + SUBJ()] : [])) { await go(r, 200); healthy('route ' + r); }
      // with sittable ICAI papers, /test?new=mock opens the next paper's briefing: a live sitting the next checks must not inherit
      if (bankOn() && S.state.live) { ok('route /test?new=mock: an ICAI bank opens a paper sitting (its briefing)', /\/test\/run\//.test(location.hash) || !!S.state.live); S.update(s => { s.live = null; }, 'selftest'); }
      if (!bankOn()) {    // no ICAI bank yet: the bank, a question page and the tests hub each show the one honest empty state, and no test starts
        for (const r of ['/pyq', '/q/' + encodeURIComponent('no-such:Q1'), '/test', '/test?new=diagnostic']) {
          await go(r, 300);
          ok(`bank empty: ${r} says ICAI past papers, RTPs and MTPs are being added`, /ICAI past papers, RTPs and MTPs are being added/.test(view().textContent), view().textContent.slice(0, 120));
        }
        ok('bank empty: no test was started', !S.state.live && !(S.state.tests || []).length);
      }
      await go('/wrapped', 300); healthy('route /wrapped');
      ok('wrapped: fresh profile gets the honest empty state (no slides, one coral CTA)', !!view().querySelector('.wr-empty .wr-need') && !view().querySelector('.wr-slide, .wr-story') &&
        view().querySelectorAll('.btn.pop').length === 1 && /two active days/.test(view().textContent), view().textContent.slice(0, 160));
      await go('/no/such/page', 150);
      ok('404: a real page (heading, one coral Home CTA, no tab lit)', !!view().querySelector('.nf h1') && view().querySelectorAll('.btn.pop[href="#/"]').length === 1 && !document.querySelector('.tn a.on'));
      await go('/q/cs-2019%3ACS37%zz', 150);
      ok('404: an address that cannot be decoded gets the not-found card, not an error (P3-36)', !!view().querySelector('.nf h1') && !/Something went wrong|URI malformed/.test(view().textContent), view().textContent.slice(0, 100));
      // an id with a '%' in it ('#/q/50%25' decodes to '50%'): a view that decodes it once more must not end in the error card either
      await go('/q/50%25', 200);
      if (bankOn()) ok('404: an id holding a stray % gets the not-found card, not an error (P3-36)', !!view().querySelector('.nf h1') && !view().querySelector('.err-card') && document.title === 'Not found · PassBook', view().textContent.slice(0, 100));
      else ok('404: an id holding a stray % gets the bank\'s empty state, not an error (P3-36)', !view().querySelector('.err-card') && /being added/.test(view().textContent), view().textContent.slice(0, 100));
      await go('/wrapped', 150);
      ok('nav: Me pages light no tab, the avatar instead', !document.querySelector('.tn a.on') && document.getElementById('me-btn').classList.contains('on'));
      for (const s of D().subjects) { await go('/s/' + s.id); healthy('subject ' + s.id, 150); }
      const les = D().lessons[0];
      if (les) {
        await go('/l/' + les.id, 500);
        for (let t = 0; t < 60 && !document.querySelector('#lesson-body[data-full]'); t++) await wait(50);
        healthy('lesson ' + les.id, 500);
        ok('nav: a lesson lights Learn', !!document.querySelector('.tn a.tn-a.on[href="#/syllabus"]'));
        ok('crumbs: shown for a lesson (under the nav or in the page header)', [...document.querySelectorAll('.tb-crumbs, [data-crumbs]')].some(e => e.querySelector('a') && e.offsetParent !== null));
        ok('lesson: sections + outline', document.querySelectorAll('.lsec').length >= 5 && document.querySelectorAll('#outline a').length >= 4);
        ok('lesson: diagrams drawn', document.querySelectorAll('svg.dgs').length >= 1);
        { const rec = g.GAD && g.GAD.lesson && g.GAD.lesson[les.id], tex = rec ? (rec.md.match(/\$[^$\n]+\$/g) || []).length : 4;   // a theory lesson may have no maths
          ok('lesson: math rendered', document.querySelectorAll('.katex').length >= Math.min(3, tex), `${document.querySelectorAll('.katex').length} formulas drawn, ${tex} in the text`); }
        const qz = [...document.querySelectorAll('.ga-quiz .qz-q')].find(x => x.dataset.key && x.querySelector(`input[value="${x.dataset.key[0]}"]`));
        if (qz) { const inp = qz.querySelector(`input[value="${qz.dataset.key[0]}"]`); inp.click(); click(qz.querySelector('[data-qz="check"]')); await wait(60); ok('lesson quiz: answer recorded', Object.keys((S.state.lessons[les.id] || {}).quiz || {}).length === 1); }
        else info('lesson quiz: ' + les.id + ' has no choice question, so the quiz record is not checked');
        click(document.getElementById('done')); await wait(300);
        ok('lesson: mark complete', !!(S.state.lessons[les.id] || {}).done);
        await corals('a lesson done');
      }
      // question practice flow (only once the ICAI bank ships)
      const q = bankOn() ? D().questions.find(x => x.hasKey && x.type === 'MCQ' && (x.icai || x.section === 'CS')) : null;
      if (!q) info('practice: no ICAI bank yet, so the question page, the bank filters and the test runner are not checked');
      else {
      await go('/q/' + encodeURIComponent(q.id), 500); healthy('question page');
      // P0-01 (WP9a): a single-answer card is one radio group: A then C leaves only C, and C is the response the card hands its page
      {
        const opts = () => [...view().querySelectorAll('.qc-o input')], [a, , c] = opts();
        if (a && c) {
          a.click(); c.click(); await wait(30);
          const on = opts().filter(i => i.checked).map(i => i.value), names = new Set(opts().map(i => i.name));
          ok('question: the options are one radio group, A then C leaves only C (P0-01)', opts().every(i => i.type === 'radio') && names.size === 1 && !names.has('') && on.length === 1 && on[0] === c.value,
            `checked ${on.join(',') || 'none'} · ${names.size} name(s)`);
        }
        if (!GA.qcard) await U.loadScript('app/js/views/qcard.js');
        let full = null; try { full = await GA.data.question(q.id); } catch (e) { full = null; }
        if (full) {    // the same pair on a card of its own in exam mode (the runner's path; it records nothing)
          const box = document.createElement('div'); box.style.cssText = 'position:absolute;left:-9999px;top:0;width:360px'; document.body.append(box);
          const card = GA.qcard.create(full, { mode: 'exam' }); box.append(card.el);
          const [x, , y] = [...card.el.querySelectorAll('.qc-o input')];
          if (x && y) { x.click(); y.click(); }
          ok('question: getResponse() after A then C is C (P0-01)', !!y && card.getResponse() === y.value, String(card.getResponse()));
          if (card.destroy) card.destroy(); box.remove();
        }
      }
      const opt = document.querySelector('.qc-o input'); opt.click(); click(document.querySelector('[data-a="check"]')); await wait(100);
      ok('question: attempt stored', !!S.state.q[q.id] && S.state.q[q.id].n === 1);
      ok('question: feedback shown', !document.querySelector('.qc-fb').hidden);
      ok('question: activity counted', (S.state.act[U.today()] || {}).q >= 1);
      await go('/pyq?subject=' + q.subject, 600); healthy('bank filtered');
      ok('bank: rows listed', document.querySelectorAll('.pqr').length > 0);
      if (icaiOn()) {
        // an RTP is one document per paper and attempt, so 'rtp september 2026 q5' in its subject names one question (MTPs come in two series
        // and every paper has one for the attempt: the words alone match all of them, which is right for a search but not for this check)
        const p0 = D().papers.find(p => p.kind === 'rtp') || D().papers[0], q0 = D().questions.find(x => x.paper === p0.id && x.label && /^Q\d+$/.test(x.label));
        if (q0) { await go('/pyq?subject=' + q0.subject + '&q=' + encodeURIComponent(`${p0.kind} ${(p0.attemptLabel || '').toLowerCase()} q${q0.no}`), 500); ok('bank: a document search ("rtp september 2026 q5") lists that question', document.querySelectorAll('.pqr').length >= 1 && document.querySelectorAll('.pqr').length <= 3 && !!view().querySelector(`.pqr[data-id="${q0.id}"]`), document.querySelectorAll('.pqr').length + ' rows'); }
        await icaiFlows();
      } else { await go('/pyq?q=' + encodeURIComponent('2019 cs 37'), 400); ok('bank: id search', document.querySelectorAll('.pqr').length <= 2); }
      await pyqPages();
      }
      // flashcards
      if (D().cards.length) {
        const reviews = () => (S.state.act[U.today()] || {}).c || 0;
        await go('/flash/all?mode=new', 400); healthy('flash session');
        { const fc = document.getElementById('fcard'); if (fc) fc.scrollIntoView({ block: 'center' }); }
        click(document.getElementById('show')); await wait(700);
        { const fc = document.getElementById('fcard'), r = fc && fc.getBoundingClientRect(), hit = r && document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          let m = null; try { m = fc && new DOMMatrix(getComputedStyle(fc).transform); } catch (e) { m = null; }
          ok('flash: Show answer turns the card to its answer side (P0-25)', !!hit && !!hit.closest('.fs-back') && !!m && Math.abs(m.m11 + 1) < 0.02 && Math.abs(m.m33 + 1) < 0.02,
            `centre hits ${hit ? label(hit) : 'nothing'}, transform ${fc ? getComputedStyle(fc).transform : '-'}`); }
        click(document.querySelector('[data-g="2"]')); await wait(80);
        ok('flash: grade stored', Object.keys(S.state.cards).length === 1);
        // P0-02: a second session must not inherit the first one's handlers (each visit gets a fresh view host)
        const r0 = reviews();
        await go('/flash', 200); await go('/flash/all?mode=new', 400);
        click(document.getElementById('show')); await wait(50);
        click(document.querySelector('[data-g="2"]')); await wait(80);
        ok('flash: a second session records one review per tap (P0-02)', reviews() === r0 + 1, `reviews +${reviews() - r0}`);
        ok('shell: each visit renders into a fresh view host (P0-02)', view().children.length === 1 && view().firstElementChild.classList.contains('vh') && view().firstElementChild.dataset.view === 'flash');
      }
      // tests (only once the ICAI bank ships)
      if (icaiOn()) await icaiTests();
      else if (bankOn()) {
      await go('/test', 300);
      click(document.getElementById('t-diag')); await wait(1200);
      ok('test: runner opened', /\/test\/run\//.test(location.hash) && !!document.querySelector('.exam .pal'), location.hash);
      // P2-43: a live test is left only through the runner: the brand is no link, g-keys do nothing, no crumb leads out
      { const kd = k => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })), h = location.hash; await wait(60);
        ok('exam: the brand is not a link while a test runs (P2-43)', !document.querySelector('.topbar .brand').hasAttribute('href'));
        kd('g'); kd('h'); await wait(250);
        ok('exam: g-keys never leave a live test (P2-43)', location.hash === h, location.hash);
        ok('exam: no breadcrumb leads out of a live test (P2-43)', ![...document.querySelectorAll('.crumbs-row a, #view [data-crumbs] a, #view .tb-crumbs a')].some(seen));
        // '?' in a test lists the runner's own keys, read as text (never a raw '&amp;'), and says go-to keys are off
        GA.shell.shortcuts(); await wait(80);
        { const m = document.querySelector('.scrim .modal'), hs = m ? [...m.querySelectorAll('.ks-h')].map(x => x.textContent) : [];
          ok('exam: the help lists this page\'s keys as plain words and says go-to keys are off (P2-43, P2-46)', hs.includes('On this page') && !hs.includes('Go to') && !!m && !/&(amp|lt|gt|quot);/.test(m.textContent) && /off while a test runs/.test(m.textContent), m ? m.textContent.slice(0, 160) : 'no dialog'); }
        history.back(); await wait(400); }
      const first = document.querySelector('.qc-o input, .qc-nat input'); if (first) { first.type === 'text' ? (first.value = '3', first.dispatchEvent(new Event('input', { bubbles: true }))) : first.click(); }
      await wait(100); click(document.getElementById('next')); await wait(100);
      ok('test: palette shows an answered question', !!document.querySelector('.pb.ans'));
      // P0-02: leave the runner and resume it, then submit: one dialog, one stored record
      const runHash = location.hash;
      await go('/test', 300); await go(runHash.slice(1), 600);
      ok('test: the runner resumes after leaving it', !!document.querySelector('.exam .pal') && !!S.state.live, location.hash);
      const endBtn = document.querySelector('[data-end]') || document.getElementById('end');
      click(endBtn); await wait(200);
      ok('test: a resumed runner opens one Submit dialog (P0-02)', document.querySelectorAll('.scrim').length === 1, document.querySelectorAll('.scrim').length + ' dialogs');
      const yes = [...document.querySelectorAll('.scrim .btn')].find(b => /Submit/.test(b.textContent)); if (yes) click(yes);
      await wait(1500);
      ok('test: result page', /\/test\/result\//.test(location.hash) && /Question review/.test(view().textContent), location.hash);
      ok('test: stored', S.state.tests.length === 1 && S.state.live == null);
      healthy('test result');
      await go('/progress', 200); ok('progress: mock analytics after a test', /Last test/.test(view().textContent));
      }
      // labs
      const lab = D().labs.find(l => l.status !== 'planned');
      if (lab) { await go('/lab/' + lab.id, 800); ok('lab ' + lab.id + ': stage drawn', !!document.querySelector('.lab-view svg, .lab-view table, .lab-view .lab-html')); ok('lab: stats', document.querySelectorAll('.lab-stat').length >= 2); const rb = document.getElementById('lab-rand'); if (rb) { click(rb); await wait(200); ok('lab: challenge opens', !document.getElementById('lab-chal').hidden); } }
      // saving fails loudly (P0-12): one persistent warning under the nav until a save succeeds
      { const e = new Error('QuotaExceededError (selftest)'); e.kind = 'quota'; S.emit('error', e); await wait(60);
        const b = document.getElementById('save-warn');
        ok('save failure: one persistent warning under the nav with Export backup (P0-12)', !!b && !b.hidden && b.getAttribute('role') === 'alert' && /not being saved/i.test(b.textContent) && !!b.querySelector('[data-save="export"]'), b ? b.textContent.trim().slice(0, 90) : 'no banner');
        await go('/pyq', 300); ok('save failure: the warning stays on the next screen', !document.getElementById('save-warn').hidden);
        S.emit('saved', { recovered: true }); await wait(40);
        ok('save failure: the next good save clears it', document.getElementById('save-warn').hidden); }
      await openStates();
      // search palette
      await go('/', 100); GA.search.open(); await wait(50);
      const inp = document.getElementById('pq'); inp.value = les ? les.title.split(' ')[0] : 'process'; inp.dispatchEvent(new Event('input')); await wait(80);
      ok('search: results', document.querySelectorAll('.pitem').length > 0); GA.search.close();
      // shell: shortcuts and the mobile drawer
      { const kd = k => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
        kd('g'); kd('g'); await wait(250); ok('keys: g g opens my progress', location.hash === '#/progress', location.hash);
        kd('g'); kd('h'); await wait(250); ok('keys: g h opens home', location.hash === '#/', location.hash);
        GA.shell.menu(true); ok('me menu: opens', document.querySelector('.shell').classList.contains('me-open') && document.getElementById('me-btn').getAttribute('aria-expanded') === 'true');
        ok('me menu: lists flashcards, notebook, planner, progress, wrapped, settings', ['/flash', '/notebook', '/plan', '/progress', '/wrapped', '/settings'].every(h => document.querySelector(`#me-menu a[href="#${h}"]`)));
        kd('Escape'); ok('me menu: Escape closes it', !document.querySelector('.shell').classList.contains('me-open') && document.getElementById('me-btn').getAttribute('aria-expanded') === 'false');
        click(document.getElementById('me-btn')); await wait(40); click(document.querySelector('#me-menu a[href="#/plan"]')); await wait(400);
        ok('me menu: an item navigates and closes the menu', location.hash === '#/plan' && !document.querySelector('.shell').classList.contains('me-open'), location.hash); }
      await shellP1();
      await shellP2();
      // settings / theme
      { const ed = U.addDays(U.today(), 150); GA.actions.setProfile({ examDate: ed }); ok('settings: exam date drives countdown', GA.stats.countdown(S.state, U.today()).days === 150, ed); }   // relative date: a fixed one stops passing as the real date approaches it
      { const before = document.documentElement.dataset.theme; GA.ui.toggleTheme(); ok('theme: toggles', ['dark', 'light'].includes(document.documentElement.dataset.theme) && document.documentElement.dataset.theme !== before); GA.ui.toggleTheme();
        GA.ui.setTheme('auto'); ok('theme: auto follows the system', S.state.profile.theme === 'auto' && document.documentElement.dataset.theme === (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')); }
      ok('export: valid JSON', JSON.parse(S.exportJSON()).app === 'passbook');
      // demo seeder
      if (S.profile === 'demo') { await U.loadScript('app/js/core/demo.js'); await GA.demo.seed(S, D()); await go('/progress', 300); healthy('progress (demo data)', 300); ok('demo: streak > 0', GA.stats.streak(S.state, U.today()).current > 0); }
      await seeded();
      ok('no uncaught JS errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      info(`time: the run took ${Math.round(performance.now() / 1000)} s of page time (tools/smoke.py's budget is its virtual-time limit)`);
    } catch (e) { out.push('FAIL exception: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')); }
    const pre = document.createElement('pre'); pre.id = 'selftest'; pre.textContent = out.join('\n') + '\nDONE'; document.body.append(pre);
  }
  /* the touch pass (tools/smoke.py runs Chrome as a touch-first device: coarse pointer, no hover) */
  async function touchRun() {
    try {
      guard();
      S.reset();
      ok('touch: GA.ui.touch is true on a coarse pointer without hover', GA.ui.touch === true);
      // P1-50: every focusable text field is at least 16 px, or iPhone Safari zooms the page on focus
      const FIELDS = 'input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]):not([type=file]):not([type=button]):not([type=submit]):not([type=color]):not([readonly]), select, textarea';
      const nat = D().questions.find(x => x.type === 'NAT' && x.hasKey), lab = D().labs.find(l => l.status !== 'planned');
      const routes = ['/pyq', '/syllabus', '/map', '/test', '/settings', '/notebook', '/plan', '/flash'].concat(nat ? ['/q/' + encodeURIComponent(nat.id)] : [], lab ? ['/lab/' + lab.id] : []);
      for (const r of routes) {
        await go(r, 600);
        const small = [...view().querySelectorAll(FIELDS)].filter(seen).filter(f => parseFloat(getComputedStyle(f).fontSize) < 15.95);
        ok(`touch: fields on ${r} are 16 px or more (P1-50)`, !small.length, small.slice(0, 4).map(f => `${f.tagName.toLowerCase()}${f.id ? '#' + f.id : ''}${f.className ? '.' + String(f.className).split(' ').join('.') : ''}=${getComputedStyle(f).fontSize}`).join(', '));
      }
      GA.search.open(); await wait(80);
      { const inp = document.getElementById('pq'), c = document.querySelector('.pcancel'), k = document.querySelector('.pin kbd');
        ok('touch: the palette field is 16 px or more (P1-50)', parseFloat(getComputedStyle(inp).fontSize) >= 16);
        ok('touch: the palette has a 44 px Cancel and no esc label (P1-47)', !!c && c.offsetHeight >= 44 && (!k || !seen(k)));
        click(c); await wait(400);
        ok('touch: Cancel closes the palette and consumes its Back step (P1-47)', !GA.search.isOpen && !(history.state && history.state.ov)); }
      // P1-47: a dialog with a field focuses the dialog, so the keyboard does not cover its own buttons
      { const m = GA.ui.modal({ title: 'Selftest dialog', body: '<input class="input" id="st-field">', actions: [{ label: 'Close' }] }); await wait(80);
        ok('touch: a dialog focuses itself, not its first field (P1-47)', document.activeElement === m.el, document.activeElement && document.activeElement.tagName);
        ok('touch: the dialog field is 16 px or more (P1-50)', parseFloat(getComputedStyle(document.getElementById('st-field')).fontSize) >= 16);
        m.close(); await wait(400); }
      // P1-55: a tap opens the info tip and keeps it; a touch never opens it by hovering; a tap outside closes it
      { await go('/', 300); const host = document.createElement('div'); host.innerHTML = GA.ui.infoTip('Selftest tip on touch'); view().append(host);
        const b = host.querySelector('.itip'), tip = () => document.getElementById('ga-ftip');
        b.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'touch' })); await wait(30);
        ok('touch: a finger passing over never opens a tip (P1-55)', !tip() || !tip().classList.contains('on'));
        click(b); await wait(60);
        ok('touch: a tap opens the tip and keeps it (P1-55)', !!tip() && tip().classList.contains('on') && b.getAttribute('aria-describedby') === 'ga-ftip');
        ok('touch: the trigger is at least 44 px to hit (P1-55)', (() => { const r = b.getBoundingClientRect(), a = getComputedStyle(b, '::before'); return Math.max(r.width, parseFloat(a.width) || 0) >= 44 && Math.max(r.height, parseFloat(a.height) || 0) >= 44; })());
        document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' })); await wait(40);
        ok('touch: a tap outside closes it (P1-55)', !tip().classList.contains('on'));
        host.remove(); }
      // P3-40: no key hints on a touch-first device
      { const q2 = D().questions.find(x => x.hasKey && x.type === 'MCQ' && x.section === 'CS');
        for (const r of ['/flash/all?mode=new'].concat(q2 ? ['/q/' + encodeURIComponent(q2.id)] : [], ['/'])) {
          await go(r, 600);
          const hints = [...document.querySelectorAll('#view .pr-keys, #view kbd, .topbar kbd, .me-menu kbd')].filter(seen);
          ok(`touch: no key hints on ${r} (P3-40)`, !hints.length, hints.slice(0, 3).map(label).join(', '));
        } }
      ok('touch: no uncaught JS errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    } catch (e) { out.push('FAIL exception: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')); }
    const pre = document.createElement('pre'); pre.id = 'selftest'; pre.textContent = out.join('\n') + '\nDONE'; document.body.append(pre);
  }

  g.__selftest = run;
  window.addEventListener('load', () => setTimeout(/[?&]navfit=1/.test(location.search) ? navFit : /[?&]touch=1/.test(location.search) ? touchRun : run, 400));
})(typeof window !== 'undefined' ? window : globalThis);
