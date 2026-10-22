/* PassBook — Content map ("/map"): the whole syllabus on one page, through three lenses drawn by GA.mapviz (app/js/core/mapviz.js).
   URL state: #/map?lens=syllabus|prereq|exam&subject=..&node=..&size=..&view=..&by=..&metric=..&from=..&to=..&sort=..&only=1&vals=1
   In-view changes use history.replaceState, so the router does not re-enter the view on every click; links from elsewhere still deep-link. */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc;
  let handle = null, onKey = null, onResize = null;

  const LENSES = [
    ['syllabus', 'Syllabus map', 'The papers, chapters and sub-topics', 'grid'],
    ['prereq', 'Prerequisites', 'What to learn first', 'layers'],
    ['exam', 'Exam map', 'What ICAI asked, attempt by attempt', 'chart']
  ];
  const icon = (n, c) => (GA.icon ? GA.icon(n, c) : '');
  const reduced = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /** the lens's how-to line, only for the prerequisite and exam lenses (P3-09: the syllabus lens's sizing rule is the subtitle and the map's own
      'Area = …' note, its how-to is in the panel). It leads with the lens's sub-label as visible text (P1-55: no hover-only titles on the tabs). */
  function copy(D, M, lens) {
    const y0 = M.years[0], y1 = M.years[M.years.length - 1], touch = !!(GA.ui && GA.ui.touch), pick = touch ? 'Tap' : 'Pick';
    const sub = (LENSES.find(l => l[0] === lens) || [])[2];
    if (lens === 'prereq' && !D.lessons.length) return null;
    if (lens === 'prereq') return { sub, text: `Every lesson lists the lessons it builds on: ${U.nf(M.edges.length)} “needs” links join the ${U.nf(D.lessons.length)} lessons into one learning order. ${pick} a lesson to light up everything to learn before it.` };
    if (lens === 'exam') return M.bank && M.years.length ? { sub, text: `Marks ICAI set on each paper's chapters from ${y0} to ${y1}. Drag across the years to compare periods; ${touch ? 'tap' : 'click'} a cell for those questions.` } : null;
    return null;
  }
  const paintCopy = (el, c) => { el.hidden = !c; const h = c ? `<b>${esc(c.sub)}.</b> ${esc(c.text)}` : ''; if (el.innerHTML !== h) el.innerHTML = h; };

  GA.views.map = {
    async enter(ctx, out) {
      if (!GA.mapviz || !GA.mapviz.mount) await U.loadScript('app/js/core/mapviz.js');
      if (ctx.stale && ctx.stale()) return;
      const D = GA.data.D, MV = GA.mapviz, M = MV.model(D), q = Object.assign({}, ctx.query);
      const lens = MV.LENSES.includes(q.lens) ? q.lens : 'syllabus';
      GA.shell.crumbs([['Map', '#/map']]);                     // the tab's label (P2-12); the H1 stays descriptive
      const topics = D.subjects.reduce((n, s) => n + s.topics.length, 0), subs = D.subjects.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subtopics.length, 0), 0);
      const y0 = M.years[0], y1 = M.years[M.years.length - 1];
      out.innerHTML = `<div class="mapv hb">
        <header class="hb-head mapv-head">
          <div class="hb-head-t"><h1 class="mapv-h">Content map</h1>
            <p class="hb-sub mapv-lead"><b>${D.subjects.length}</b> papers, <b>${topics}</b> chapters and <b>${subs}</b> sub-topics of Group II${M.icai && !M.marked ? `, sized by the <b>${U.nf(M.root.pyqs)}</b> ICAI questions from ${M.docsN === 1 ? 'one ICAI document' : `${M.docsN} ICAI documents`} (an RTP prints no marks)` : M.bank ? `, sized by the <b>${U.nf(M.root.marks)}</b> marks ICAI set in ${M.papersN} ${M.icai ? 'exam papers' : 'papers'} (${y0}–${y1})` : `, sized by the sub-topics of the ICAI syllabus; <b>${U.nf(D.lessons.length)}</b> ${D.lessons.length === 1 ? 'lesson' : 'lessons'} written so far`}.</p></div>
          <div class="mapv-tabs hb-seg" role="tablist" aria-label="Lens"><span class="mapv-ind" aria-hidden="true"></span>${LENSES.map(([id, name, sub, ic], i) => `<button type="button" role="tab" id="mapv-t-${id}" aria-controls="mapv-panel" data-lens="${id}" aria-selected="${id === lens}" tabindex="${id === lens ? 0 : -1}" class="${id === lens ? 'on' : ''}" aria-keyshortcuts="${i + 1}">${icon(ic)}<span>${name}</span><kbd aria-hidden="true">${i + 1}</kbd></button>`).join('')}</div>
        </header>
        <p class="mapv-copy" id="mapv-copy" hidden></p>
        <section class="mapv-panel" id="mapv-panel" role="tabpanel" aria-labelledby="mapv-t-${lens}"></section>
      </div>`;
      const host = U.$('#mapv-panel', out), tabs = U.$('.mapv-tabs', out);
      const copyEl = U.$('#mapv-copy', out);
      paintCopy(copyEl, copy(D, M, lens));
      const sync = st => {
        const h = GA.router.href('/map', st);
        if (location.hash !== h) history.replaceState(history.state, '', h);
        paintCopy(copyEl, copy(D, M, st.lens || 'syllabus'));
      };
      /* the sliding primary marker under the selected lens (measured, so labels of any width fit; instant on first paint and with reduced motion) */
      const ind = U.$('.mapv-ind', tabs);
      let first = true;
      const slide = () => {
        const b = tabs.querySelector('[data-lens].on'); if (!b || !ind) return;
        if (first || reduced()) ind.style.transition = 'none';
        ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`;
        if (first || reduced()) { void ind.offsetWidth; ind.style.transition = ''; }
        first = false;
      };
      slide();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (tabs.isConnected) { first = true; slide(); } });
      onResize = () => { first = true; slide(); };
      addEventListener('resize', onResize, { passive: true });
      handle = MV.mount(host, { mode: 'full', lens, state: q, onState: sync });
      const setLens = (id, focus) => {
        if (!MV.LENSES.includes(id)) return;
        tabs.querySelectorAll('[data-lens]').forEach(b => { const on = b.dataset.lens === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        host.setAttribute('aria-labelledby', 'mapv-t-' + id);
        paintCopy(copyEl, copy(D, M, id));
        handle.setLens(id);
        slide();
      };
      tabs.addEventListener('click', e => { const b = e.target.closest('[data-lens]'); if (b) setLens(b.dataset.lens); });
      tabs.addEventListener('keydown', e => {
        if (!/^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) return;
        const ids = LENSES.map(l => l[0]), i = ids.indexOf(handle.lens);
        const j = e.key === 'Home' ? 0 : e.key === 'End' ? ids.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length;
        e.preventDefault(); setLens(ids[j], true);
      });
      onKey = e => {
        const t = e.target;
        if (e.metaKey || e.ctrlKey || e.altKey || (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable))) return;
        if (/^[123]$/.test(e.key)) { e.preventDefault(); setLens(LENSES[+e.key - 1][0]); }
      };
      document.addEventListener('keydown', onKey);
    },
    leave() {
      if (onKey) document.removeEventListener('keydown', onKey);
      if (onResize) removeEventListener('resize', onResize);
      if (handle) handle.destroy();
      handle = null; onKey = null; onResize = null;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
