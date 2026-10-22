/* PassBook — labs hub (/labs) and the lab page frame (/lab/:id). Owner: WP12 Labs (docs/ARCHITECTURE.md §4b "Labs").
   Every number is real: content facts from GA.insights.labCards() (PYQs, marks and papers of the sub-topics each lab simulates — the
   sub-topics of the lessons that embed it, within its topics, P1-37 — and the lessons it is built into), the learner's own record from
   GA.store.state.labs ({runs, ch:{n, ok}}). Subject identity = glyph (GA.charts.subj) + name, no subject colours.
   /labs        one-line header, subject filter (?subject=, kept with replaceState; GA.ui.roving), the featured card in a cobalt frame with its
                live thumbnail on its own surface tile and the screen's one .pop CTA (D21): for a returning learner the lab lastLab finds, its
                eyebrow saying only what the store knows ('Continue where you left off' needs a lab record time; else 'Your last lab
                challenge' or 'Your most-opened lab'), else the most-asked lab of the filter; then 'All' grouped by subject (h2 per subject,
                most marks first, packed into the card columns in page order), cards with an h3, the lab's one blurb, its numbers and the
                learner's record (P2-59); a subject with no lab gets a true empty state whose coral practises its PYQs (P2-70).
   /lab/:id     GA.lab.mount(...) draws the lab (app/js/labs/framework.js: header with the one coral 'Test yourself', stage, tiles, inputs,
                results); this view restyles its eyebrow (subject glyph + name), adds the real-data meta line, keeps ?ex=<question id> for a
                loaded GATE example, and adds "From the papers" (GATE rows: solve first, then see it in the lab, and an exact 'Practise these N')
                , "Built into these lessons" and "More <subject> labs" (<= 3) below; the meta line points to From the papers, whose
                numerals carry the counts once (P2-57). Styles: app/css/labs.css (.lb-*). */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = (n, c) => GA.icon(n, c), UI = GA.ui;
  const glyph = (id, c) => (GA.charts && GA.charts.subj ? GA.charts.subj(id, c) : icon('flask', c));
  const pl = (n, w, ws) => U.plural ? U.plural(n, w, ws) : `${U.nf(n)} ${n === 1 ? w : ws || w + 's'}`;

  /** lab cards from the insights (falls back to the raw catalogue when insights are unavailable) */
  function cards(D) {
    const I = GA.insights && GA.insights.get && GA.insights.get();
    if (I && I.labCards) return I.labCards();
    return D.labs.map(l => ({ id: l.id, title: l.title, subject: l.subject, subjectName: (D.subjectById[l.subject] || {}).name || l.subject, blurb: l.blurb, topics: l.topics || [],
      status: l.status || 'ready', embeddedIn: [], embeds: 0, subs: [], pyqs: 0, marks: 0, papers: 0, pyqHref: null, href: '#/lab/' + l.id }));
  }
  /** the learner's record for a lab, or null when there is nothing to show */
  function mine(st, id) {
    const r = st.labs && st.labs[id];
    if (!r) return null;
    const ch = r.ch || { n: 0, ok: 0 };
    return r.runs || ch.n ? { runs: r.runs || 0, n: ch.n || 0, ok: ch.ok || 0 } : null;
  }
  /** a returning learner's lab for the featured slot, and what the store lets us say about it: {c, by}, null for a profile with no lab record
      (fresh profiles see the most-asked lab). The label must be true (real data only), so:
        by 'time'   the lab with the newest record time (l.at, ms, stamped on every open and check when the store keeps one; a challenge row
                    of the log counts too): the lab used last, 'Continue where you left off'
        by 'test'   no record times: the lab of the newest challenge row ('lab:<id>'). Opening and stepping a lab leave no time, so this is
                    the last lab the learner tested themselves in, not necessarily the last one used: 'Your last lab challenge'
        by 'opened' no challenge either: the lab opened most often, 'Your most-opened lab' */
  function lastLab(st, list) {
    const labs = (st && st.labs) || {}, log = (st && st.log) || [];
    let best = null, bt = 0, timed = false;
    list.forEach(c => { const r = labs[c.id]; if (r && +r.at > 0) { timed = true; if (+r.at > bt) { bt = +r.at; best = c; } } });
    let lc = null, lt = -1;                                          // the newest challenge row (by its time; ties: the later row)
    log.forEach(row => { const k = row && row[1]; if (typeof k !== 'string' || k.indexOf('lab:') !== 0 || !(+row[0] >= lt)) return;
      const c = list.find(x => x.id === k.slice(4)); if (c) { lc = c; lt = +row[0]; } });
    if (timed) return lt > bt ? { c: lc, by: 'time' } : { c: best, by: 'time' };
    if (lc) return { c: lc, by: 'test' };
    const opened = list.map(c => [c, mine(st, c.id)]).filter(x => x[1] && x[1].runs).sort((a, b) => b[1].runs - a[1].runs);
    return opened.length ? { c: opened[0][0], by: 'opened' } : null;
  }
  /** the line under the From the papers rows: '1 more ICAI example is …', '3 more ICAI examples are …' */
  const moreEx = k => `${U.nf(k)} more ICAI ${k === 1 ? 'example is' : 'examples are'} in the lab's Examples list.`;
  const CONT = { time: ['Continue where you left off', 'Continue the lab'], test: ['Your last lab challenge', 'Back to the lab'], opened: ['Your most-opened lab', 'Back to the lab'] };
  const mineHtml = m => (!m ? '' : `<span class="lb-mine">${m.n ? `<span class="hb-chip${m.ok ? ' ok' : ''}">${icon(m.ok ? 'check' : 'target')}${m.ok} of ${m.n} solved</span>` : ''}${m.runs ? `<span class="hb-chip">${icon('play')}opened ${pl(m.runs, 'time')}</span>` : ''}</span>`);
  const metaHtml = c => {
    const parts = [];
    if (c.pyqs) parts.push(`<span><b>${U.nf(c.pyqs)}</b> questions</span>`, `<span><b>${U.nf(c.marks)}</b> marks</span>`);
    if (c.embeddedIn && c.embeddedIn.length) parts.push(`<span>in ${pl(c.embeddedIn.length, 'lesson')}</span>`);
    return parts.length ? `<p class="hb-meta lb-m">${parts.join('')}</p>` : '';
  };

  let labsCleanup = null;
  GA.views.labs = {
    enter(ctx, out) {
      const D = GA.data.D, st = GA.store.state, all = cards(D), totalPapers = D.papers.length, bank = D.questions.length > 0;
      // out of the exam papers of the lab's own ICAI paper (insights count a lab's papers over exam papers only), never every RTP and MTP of the group
      const icaiB = bank && D.questions.every(q => q.icai);
      const papersFor = c => (icaiB ? D.papers.filter(p => p.kind === 'pyq' && (!Array.isArray(p.subjects) || p.subjects.includes(c.subject))).length : totalPapers);
      const marksOf = sid => +((D.subjectById[sid] || {}).marks || 0), ordOf = sid => D.subjects.findIndex(x => x.id === sid);
      const ready = all.filter(l => l.status !== 'planned');
      const lessons = U.uniq(ready.flatMap(l => l.embeddedIn || [])).length, embeds = ready.reduce((a, l) => a + (l.embeds || 0), 0);
      const runs = ready.map(l => mine(st, l.id)).filter(Boolean), opened = runs.length, solved = runs.reduce((a, m) => a + m.ok, 0), tried = runs.reduce((a, m) => a + m.n, 0);
      const subs = D.subjects.map(s => ({ s, n: all.filter(l => l.subject === s.id).length })).filter(x => x.n);
      let cur = subs.some(x => x.s.id === ctx.query.subject) ? ctx.query.subject : '';
      /* a paper with no lab yet: a true empty state with the real next step as its coral (P2-70, D18) */
      let none = !cur && ctx.query.subject && D.subjectById[ctx.query.subject] ? D.subjectById[ctx.query.subject] : null;

      /* the header is one line (P2-59): what the labs are, where they are used, and the learner's own count */
      const sub = (ready.length ? pl(ready.length, 'step-through simulator') : 'No lab is ready yet') + `${ready.length < all.length ? ` (${all.length - ready.length} ${ready.length ? 'more ' : ''}coming)` : ''}` +
        (lessons ? `, built into <b>${U.nf(lessons)}</b> lessons` : '') + (opened ? ` · you have opened <b>${opened}</b>${tried ? `, solved <b>${solved}</b> of ${pl(tried, 'challenge')}` : ''}` : '') + '.';
      out.innerHTML = `<div class="hb lb">
        <header class="hb-head"><div class="hb-head-t">
          <h1>Labs</h1><p class="hb-sub">${sub}</p></div></header>
        <div class="lb-bar"${all.length ? '' : ' hidden'}><div class="hb-seg lb-filter" role="radiogroup" aria-label="Show labs for a paper">
          <button type="button" role="radio" data-s="" aria-checked="${!cur && !none}"${!cur && !none ? ' class="on"' : ''}>All <em>${all.length}</em></button>
          ${subs.map(({ s, n }) => `<button type="button" role="radio" data-s="${s.id}" aria-checked="${cur === s.id}"${cur === s.id ? ' class="on"' : ''} title="${esc(s.name)}">${glyph(s.id)}<span>${esc(s.short)}</span><em>${n}</em></button>`).join('')}</div>
          <p class="lb-count" id="lb-count" role="status" aria-live="polite"></p></div>
        <div class="lb-list" id="lb-grid"></div></div>`;
      const grid = U.$('#lb-grid', out), count = U.$('#lb-count', out);
      const last = lastLab(st, ready), cont = last && last.c;        // a returning learner's featured slot (lastLab says how we know it)

      /* a card: an h3 title, the one blurb (P2-59), 'n PYQs · in n lessons' and the learner's record. Inside a subject group the subject is the
         group's heading, so the card drops it (and the shared subject glyph: eight OS cards with one icon told nothing apart) */
      const card = c => {
        const open = c.status !== 'planned', m = mine(st, c.id), tag = open ? `a href="${esc(c.href)}"` : 'div';
        return `<${tag} class="hb-card lb-card${open ? '' : ' planned'}" data-id="${esc(c.id)}"><span class="lb-h"><span class="lb-t"><h3 class="lb-tt">${esc(c.title)}</h3></span>${open ? '' : '<span class="hb-chip">Coming soon</span>'}${open ? icon('chev-r', 'lb-go') : ''}</span><span class="lb-p">${esc(c.blurb || '')}</span>
          <span class="lb-f">${metaHtml(c)}${mineHtml(m)}</span></${open ? 'a' : 'div'}>`;
      };
      /* featured (D21): a cobalt frame; 'Continue' with the learner's record for a returning learner, else the most-asked lab; its live
         thumbnail on its own surface tile; the screen's one coral above the four numbers on every width */
      const featured = (c, isCont) => {
        const open = c.status !== 'planned', m = mine(st, c.id), L = (c.embeddedIn || []).length;
        const sj = D.subjectById[c.subject] || {}, nT = (c.topics || []).length;
        const nums = bank ? [[U.nf(c.pyqs), c.pyqs === 1 ? 'question it covers' : 'questions it covers'], [U.nf(c.marks), 'marks in ICAI papers'], [`${c.papers}<small>/${papersFor(c)}</small>`, 'papers asked them'], [U.nf(L), L === 1 ? 'lesson uses it' : 'lessons use it']]
          : [[U.nf(+sj.marks || 0), `marks in ${sj.paper ? sj.paper.replace(/^P/, 'Paper ') : 'the paper'}`], [U.nf(nT), nT === 1 ? 'chapter it simulates' : 'chapters it simulates'], [U.nf(L), L === 1 ? 'lesson uses it' : 'lessons use it']];
        const say = isCont ? CONT[last.by] : null;
        const eb = say ? say[0] : bank ? (cur ? `Most asked in ${esc(c.subjectName)}` : 'Most asked in ICAI papers') : 'A lab to try';
        return `<section class="hb-card lb-card lb-feat" data-id="${esc(c.id)}" aria-labelledby="lb-feat-t">
          <div class="lb-ft"><p class="lb-eb">${eb}</p>
            <span class="lb-h"><span class="hb-ic lg">${glyph(c.subject)}</span><span class="lb-t"><h2 class="lb-tt" id="lb-feat-t">${open ? `<a href="${esc(c.href)}">${esc(c.title)}</a>` : esc(c.title)}</h2><small>${esc(c.subjectName)}</small></span></span>
            <p class="lb-p">${esc(c.blurb || '')}</p>
            <div class="lb-cta">${open ? `<a class="btn pop lg" href="${esc(c.href)}">${icon('play')}${say ? say[1] : 'Open the lab'}</a>` : ''}${mineHtml(m)}</div></div>
          ${open ? `<div class="lb-pv" data-pv="${esc(c.id)}" aria-hidden="true"><div class="lab lb-pvlab"><div class="lab-view"></div></div><span class="lb-pv-k">${icon('play')}<span>Hover or tap to run the default example</span></span></div>` : ''}
          <div class="lb-nums">${nums.map(([b, s2]) => `<div><b>${b}</b><span>${esc(s2)}</span></div>`).join('')}</div></section>`;
      };
      /* 'All' is grouped by subject (P2-59): an h2 per subject (glyph, name, count), the subjects with the most marks first; a subject filter
         shows that subject's labs without a heading of their own */
      const render = () => {
        if (none) {
          const n = U.uniq(ready.map(l => l.subject)).length;
          grid.innerHTML = bank ? UI.empty('flask', `No lab for ${esc(none.name)} yet`, `The ${U.nf(ready.length)} labs cover ${pl(n, 'paper')}. Practise ${esc(none.short || none.name)} with ICAI questions.`,
            `<a class="btn pop" href="${esc(GA.router.href('/pyq', { subject: none.id }))}">${icon('target')}<span>Practise ${esc(none.short || none.name)} questions</span></a>`, { peak: { gaze: 'down' } })
            : UI.empty('flask', `No lab for ${esc(none.name)} yet`, `${ready.length ? `The ${U.nf(ready.length)} labs cover ${pl(n, 'paper')}. ` : ''}Read the ${esc(none.short || none.name)} lessons meanwhile.`,
              `<a class="btn pop" href="#/s/${esc(none.id)}">${icon('book')}<span>Open ${esc(none.name)}</span></a>`, { peak: { gaze: 'down' } });
          count.textContent = `No lab for ${none.name}`;
          preview(null);
          return;
        }
        const list = all.filter(l => !cur || l.subject === cur);
        if (!list.length) {                         // no lab at all yet: one honest empty state (D18: a real next step)
          grid.innerHTML = UI.empty('flask', 'No labs yet', 'The first labs are being built: each one runs a costing, audit or finance method on your own numbers, step by step.', '<a class="btn pop" href="#/syllabus">Open Learn</a>', { peak: { gaze: 'down' } });
          count.textContent = ''; preview(null); return;
        }
        const feat = (cont && list.includes(cont) ? cont : null) || list.find(l => l.status !== 'planned');
        const rest = list.filter(l => l !== feat);
        let html = feat ? featured(feat, feat === cont) : '';
        if (cur) html += rest.length ? `<div class="lb-grid">${rest.map(card).join('')}</div>` : '';
        else {
          html += '<div class="lb-gs">';
          /* every subject lists all its labs, the featured one included, so a group is never one short */
          /* papers with the most marks first (Paper 4 and 5 before 6A and 6B), then syllabus order */
          const groups = U.uniq(list.map(c => c.subject)).map(sid => ({ sid, labs: list.filter(c => c.subject === sid), marks: marksOf(sid) }))
            .sort((a, b) => b.marks - a.marks || ordOf(a.sid) - ordOf(b.sid));
          html += groups.map(gr => { const s2 = D.subjectById[gr.sid] || { name: gr.sid }, n = list.filter(c => c.subject === gr.sid).length;
            /* a one-lab section is one card wide: its heading uses the medium name ('Programming & DS'), the full name stays for screen readers */
            const nm = gr.labs.length === 1 && U.medName && U.medName(s2.name) !== s2.name ? `<span aria-hidden="true">${esc(U.medName(s2.name))}</span><span class="sr">${esc(s2.name)}</span>` : esc(s2.name);
            return `<section class="lb-g n${Math.min(4, gr.labs.length)}" aria-labelledby="lb-g-${esc(gr.sid)}"><h2 class="lb-gh" id="lb-g-${esc(gr.sid)}"><span class="hb-ic sm">${glyph(gr.sid)}</span><span class="lb-gn">${nm} <em>${pl(n, 'lab')}</em></span></h2><div class="lb-grid">${gr.labs.map(card).join('')}</div></section>`; }).join('');
          html += '</div>';
        }
        grid.innerHTML = html || UI.empty('flask', 'No labs yet', 'The first labs are being built: each one runs a costing, audit or finance method on your own numbers, step by step.', '<a class="btn pop" href="#/syllabus">Open Learn</a>', { peak: { gaze: 'down' } });   // D18: a real next step
        const sname = cur ? D.subjectById[cur].name : '';
        count.textContent = !list.length ? '' : cur ? `${pl(list.length, 'lab')} for ${sname}` : `${pl(list.length, 'lab')} in ${pl(U.uniq(list.map(c => c.subject)).length, 'paper')}, the papers with the most marks first`;
        preview(U.$('.lb-pv', grid));
      };
      /* the featured card's live thumbnail: the lab's own default example (its first figure), last step at rest; it steps through the
         frames only while hovered / focused / tapped (spec: lab previews animate on user action only; reduced motion keeps it still) */
      let pvStop = null;
      const preview = async box => {
        if (pvStop) { pvStop(); pvStop = null; }
        if (!box) return;
        const id = box.dataset.pv;
        try { await U.loadScript('app/js/labs/framework.js'); await U.loadScript('app/js/labs/' + id + '.js'); } catch (e) { box.remove(); return; }
        if (!box.isConnected || !(GA.lab && GA.lab.get(id)) || !GA.diagram) { if (box.isConnected) box.remove(); return; }
        let frames;
        try { frames = GA.lab.compute(id, {}).frames.filter(f => (f.view || []).length); } catch (e) { frames = []; }
        if (!frames.length) { box.remove(); return; }
        const view = U.$('.lab-view', box), cap = U.$('.lb-pv-k span', box);
        const draw = i => {
          const v = frames[i].view[0];
          try { view.innerHTML = v.html != null ? `<div class="lab-html">${v.html}</div>` : `<figure class="dg">${GA.diagram.render(v)}</figure>`; } catch (e) { view.innerHTML = ''; }
          if (cap && timer) cap.textContent = `Step ${i + 1} of ${frames.length}`;
        };
        let timer = null, k = frames.length - 1;
        const reduced = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const stop = () => { if (timer) clearInterval(timer); timer = null; box.classList.remove('play'); k = frames.length - 1; draw(k); if (cap) cap.textContent = 'Hover or tap to run the default example'; };
        const play = () => {
          if (timer || reduced() || frames.length < 2) return;
          box.classList.add('play'); k = 0; timer = setInterval(() => { if (k >= frames.length - 1) { clearInterval(timer); timer = null; return; } k++; draw(k); }, Math.max(260, Math.min(700, 5200 / frames.length)));
          draw(k);
        };
        draw(k);
        const card = box.closest('.lb-card');
        const on = () => play(), off = () => stop();
        card.addEventListener('pointerenter', on); card.addEventListener('focusin', on); card.addEventListener('pointerleave', off); card.addEventListener('focusout', off);
        box.addEventListener('click', () => (timer ? stop() : play()));
        pvStop = () => { if (timer) clearInterval(timer); timer = null; };
      };
      const setCur = id => {
        cur = id; none = null;
        U.$$('.lb-filter [data-s]', out).forEach(b => { const on = b.dataset.s === cur; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
        render();
        const h = GA.router.href('/labs', { subject: cur });
        if (location.hash !== h) try { history.replaceState(history.state, '', location.href.split('#')[0] + h); } catch (e) { /* URL state is a nicety */ }
      };
      render();
      const seg = U.$('.lb-filter', out);
      U.on(seg, 'click', '[data-s]', (e, b) => setCur(b.dataset.s));
      /* one tab stop for the subject filter; arrows, Home and End move and select (P3-15: the shared GA.ui.roving, else the same keys here) */
      let unrove = null;
      if (UI.roving) unrove = UI.roving(seg, { items: '[data-s]' });
      else seg.addEventListener('keydown', e => {
        if (!/^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) return;
        const bs = U.$$('[data-s]', seg), i = bs.findIndex(b => b.dataset.s === cur);
        const j = e.key === 'Home' ? 0 : e.key === 'End' ? bs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length;
        e.preventDefault(); setCur(bs[j].dataset.s); bs[j].focus();
      });
      const on = U.$('.lb-filter .on', out); if (on && cur) on.scrollIntoView({ block: 'nearest', inline: 'center' });
      GA.shell.crumbs([['Labs', '#/labs']]);
      labsCleanup = () => { if (pvStop) pvStop(); pvStop = null; if (unrove) unrove(); };
    },
    leave() { if (labsCleanup) labsCleanup(); labsCleanup = null; },
    _pure: { lastLab, CONT, moreEx }                                 // Node tests (tests/labs-gallery.test.js)
  };

  /** the 'From the papers' rows of a lab: its ICAI examples, newest year first, at most `n` (each: solve the question, then see it in the lab) */
  function paperRows(id, n) {
    const def = GA.lab && GA.lab.get(id);
    if (!def || !GA.lab.examples) return { rows: [], total: 0 };
    const D = GA.data.D, gate = GA.lab.examples(def).gate.filter(r => r.pyq.some(q => !D.qById || D.qById[q]));
    const year = r => +((/cs-(\d{4})/.exec(r.pyq[0]) || [])[1] || 0);
    const seen = new Set(), rows = [];
    for (const r of gate.slice().sort((a, b) => year(b) - year(a) || a.i - b.i)) { if (seen.has(r.pyq[0])) continue; seen.add(r.pyq[0]); rows.push(r); }
    return { rows: rows.slice(0, n), total: rows.length };
  }

  GA.views.lab = {
    async enter(ctx, out) {
      const D = GA.data.D, id = ctx.params.id, meta = D.labs.find(l => l.id === id);
      GA.shell.crumbs([['Labs', '#/labs'], [meta ? meta.title : id, '#/lab/' + id]]);
      if (!meta || meta.status === 'planned') {
        /* an unknown id gets the shell's not-found card (P3-31) when it has one; else the same shape here: Tick and the coral way back (P2-70, D18) */
        if (!meta && GA.shell && typeof GA.shell.notFound === 'function') { GA.shell.notFound({ kind: 'lab', id, back: { href: '#/labs', label: 'Go to Labs' } }); return; }
        out.innerHTML = UI.empty('flask', meta ? 'This lab is coming soon' : 'Not found', meta ? esc(meta.blurb) : `No lab has the address “${esc(id)}”. The ${U.nf(D.labs.filter(l => l.status !== 'planned').length)} labs are all on the Labs page.`, '<a class="btn pop" href="#/labs">Go to Labs</a>', { peak: { gaze: 'down', mood: 'think' } });
        if (!meta && typeof document !== 'undefined') document.title = 'Not found · PassBook';
        return;
      }
      try { await U.loadScript('app/js/labs/framework.js'); await U.loadScript('app/js/labs/' + id + '.js'); }
      catch (e) { if (ctx.stale()) return; if (UI.loadFailed) UI.loadFailed(out, { what: 'lab' }); else out.innerHTML = UI.empty('alert', 'This lab did not load', esc(e.message), '<a class="btn pop" href="#/labs">Go to Labs</a>'); return; }
      if (ctx.stale()) return;
      let cfg = {}; try { cfg = ctx.query.cfg ? JSON.parse(ctx.query.cfg) : {}; } catch (e) { /* ignore bad cfg */ }
      const c = cards(D).find(x => x.id === id) || {}, s = D.subjectById[meta.subject] || { name: meta.subject, id: meta.subject };
      out.innerHTML = `<div class="hb lb-page"><nav data-crumbs></nav><div id="lab-host"></div><div class="lb-more" id="lb-more"></div></div>`;
      /* a loaded ICAI example keeps ?ex=<question id> in the URL (P1-38), so the address names the paper and Back / a shared link restore it */
      const setEx = ex => {
        const q = Object.assign({}, ctx.query); delete q.cfg; if (ex) q.ex = ex; else delete q.ex;
        const h = GA.router.href('/lab/' + id, q);
        if (location.hash !== h) try { history.replaceState(history.state, '', location.href.split('#')[0] + h); } catch (e) { /* URL state is a nicety */ }
      };
      GA.views.lab._h = GA.lab.mount(U.$('#lab-host', out), id, { cfg, ex: ctx.query.ex, onExample: setEx });
      GA.shell.crumbs([['Labs', '#/labs'], [meta.title, '#/lab/' + id]]);
      const host = U.$('#lab-host', out), hd = U.$('.lab-h', host);
      if (hd) {
        hd.classList.add('lb-head');
        const eb = U.$('.eyebrow', hd);
        if (eb) eb.outerHTML = `<div class="hb-eb lb-eb"><a href="#/s/${esc(s.id)}" class="lb-subj"><span class="hb-ic sm">${glyph(s.id)}</span>${esc(s.name)}</a><span aria-hidden="true">·</span><span>Interactive lab</span></div>`;
        const p = U.$('.lab-blurb', hd) || U.$('.lab-ht > p', hd);
        const m = mine(GA.store.state, id), bits = [];
        /* numbers once (P2-57): the PYQ counts live in 'From the papers' below (its numerals); the meta line points there */
        if (c.pyqs) bits.push(`<span><button type="button" class="lb-jump" data-jump="lb-pyq-h">From the papers ${icon('chev-d')}</button></span>`);
        if (c.embeddedIn && c.embeddedIn.length) bits.push(`<span>built into ${pl(c.embeddedIn.length, 'lesson')}</span>`);
        if (m && m.n) bits.push(`<span class="lb-you${m.ok ? '' : ' none'}">${icon(m.ok ? 'check' : 'target')}you solved ${m.ok} of ${pl(m.n, 'challenge')}</span>`);
        if (p && bits.length) p.insertAdjacentHTML('afterend', `<p class="hb-meta lb-hm">${bits.join('')}</p>`);
      }
      /* below the lab: the ICAI questions it was built from, and the lessons that embed it */
      U.on(out, 'click', '[data-jump]', (e, b) => {                  // 'From the papers' in the meta line: scroll to it, its heading takes focus
        const h = document.getElementById(b.dataset.jump); if (!h) return;
        const calm = !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
        h.setAttribute('tabindex', '-1'); h.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' }); h.focus({ preventScroll: true });
      });
      const L = id2 => D.lessonById[id2], ls = (c.embeddedIn || []).filter(L);
      const subNames = (c.subs || []).map(x => D.nodes && D.nodes[x] ? D.nodes[x].name : '').filter(Boolean);
      const P = paperRows(id, 5);
      const more = U.$('#lb-more', out);
      const disputes = ((g.GAD && g.GAD.manifest && g.GAD.manifest.main && g.GAD.manifest.main.stats) || {}).disputes || [];
      const rowHtml = r => {
        const q = D.qById ? D.qById[r.pyq[0]] : null, dis = (q && q.disputed) || disputes.includes(r.pyq[0]);
        return `<li><span class="lb-pr-t"><b>${esc(GA.lab.pyqLabel(r.pyq))}${dis ? ` <span class="lab-ex-d">${icon('alert')}answer questioned</span>` : ''}</b><span>${esc((r.group ? r.group + ' · ' : '') + r.text)}</span></span>
          <span class="lb-pr-a">${q || !D.qById ? `<a href="#/q/${encodeURIComponent(r.pyq[0])}">Solve first</a>` : ''}<a href="${esc(GA.router.href('/lab/' + id, { ex: r.pyq[0] }))}">See it in the lab</a></span></li>`;
      };
      const practise = c.pyqs && c.pyqHref ? `<a class="hb-link" href="${esc(c.pyqHref)}">Practise these ${U.nf(c.pyqs)} ${icon('arrow-r')}</a>` : '';
      /* the page never dead-ends (P2-57): up to 3 more labs of this subject, the most-asked first */
      const sib = cards(D).filter(x => x.subject === meta.subject && x.id !== id && x.status !== 'planned').sort((a, b) => (b.pyqs || 0) - (a.pyqs || 0)).slice(0, 3);
      const sibHtml = sib.length ? `<section class="hb-card lb-sib" aria-labelledby="lb-sib-h"><div class="hb-card-h"><div class="grow"><h2 id="lb-sib-h">More ${esc(s.name)} labs</h2></div></div>
          <ul class="lb-ul">${sib.map(x => `<li><a href="${esc(x.href)}"><span class="hb-ic sm mute">${glyph(x.subject)}</span><span><b>${esc(x.title)}</b><small>${x.pyqs ? `${U.nf(x.pyqs)} questions` : esc(x.subjectName || '')}${x.embeddedIn && x.embeddedIn.length ? ` · in ${pl(x.embeddedIn.length, 'lesson')}` : ''}</small></span>${icon('chev-r')}</a></li>`).join('')}</ul></section>` : '';
      if (ls.length || c.pyqs || P.rows.length || sib.length) more.innerHTML = `<div class="lb-more-g">
        ${c.pyqs || P.rows.length ? `<section class="hb-card lb-pyq" aria-labelledby="lb-pyq-h"><div class="hb-card-h"><div class="grow"><h2 id="lb-pyq-h">From the papers</h2><p>${subNames.length ? esc(subNames.join(' · ')) : 'The ICAI questions this lab was built from'}</p></div></div>
          ${c.pyqs ? `<div class="lb-pq"><div><b>${U.nf(c.pyqs)}</b><span>questions</span></div><div><b>${U.nf(c.marks)}</b><span>marks</span></div><div><b>${c.papers}<small>/${D.questions.length && D.questions.every(q => q.icai) ? D.papers.filter(p => p.kind === 'pyq' && (!Array.isArray(p.subjects) || p.subjects.includes(c.subject))).length : D.papers.length}</small></b><span>exam papers</span></div></div>` : ''}
          ${P.rows.length ? `<ul class="lb-pr">${P.rows.map(rowHtml).join('')}</ul>${P.total > P.rows.length ? `<p class="lb-pr-n">${moreEx(P.total - P.rows.length)}</p>` : ''}` : ''}
          ${practise}</section>` : ''}
        ${ls.length ? `<section class="hb-card lb-uses" aria-labelledby="lb-uses-h"><div class="hb-card-h"><div class="grow"><h2 id="lb-uses-h">Built into ${ls.length === 1 ? 'this lesson' : `these ${ls.length} lessons`}</h2><p>Each one embeds the lab next to the idea it explains.</p></div></div>
          <ul class="lb-ul">${ls.map(x => { const l = L(x); return `<li><a href="#/l/${esc(x)}"><span class="hb-ic sm mute">${icon('book')}</span><span><b>${esc(l.title)}</b><small>${esc((D.subjectById[l.subject] || {}).short || '')}${D.nodes && D.nodes[l.topic] ? ' · ' + esc(D.nodes[l.topic].name) : ''} · ${l.minutes} min</small></span>${icon('chev-r')}</a></li>`; }).join('')}</ul></section>` : ''}${sibHtml}</div>`;
    },
    leave() { if (GA.views.lab._h) GA.views.lab._h.stop(); GA.views.lab._h = null; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
