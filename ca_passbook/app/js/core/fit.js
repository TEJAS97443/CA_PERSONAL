/* PassBook — GA.fit: the one legibility pass for rendered content (owner: WP8; audit P0-17, P1-11, P1-12, P1-13, P1-54, P2-60, P2-67).
   Lessons, question cards and their worked solutions, lab stages and the home widgets all run it, so a wide formula, figure or table never widens
   the page and never shrinks below a readable size:
     figures   a diagram keeps at least 80 % of its drawn width; gantt, plot, memory and layers figures are redrawn at the column's width
               (the kit's phone layout, from the spec md.js keeps); any other wide figure scrolls in its card under 'Swipe sideways or tap to
               enlarge →' and opens at natural size in a dialog (Close, Esc, Back)
     maths     inline maths wider than its line becomes its own scroll box; display maths steps down to 85 % (75 % in a column under 600 px),
               and what is still too wide gets a right-edge fade, the swipe line and a keyboard stop
     tables    a prose table (md.js data-prose) becomes row cards under 600 px; any other wide table scrolls with a sticky first column, the
               fade and the swipe line
     code      a 'text' code block wider than its box fades at the right edge, says it scrolls and is a keyboard stop (programs wrap, P2-19)
     names     maths inside a label, button, link, summary, heading or column header gets its words (GA.md.speak) and loses its MathML
               there, because Chrome leaves MathML out of a control's name (P0-18)
     ids       a drawing whose ids an earlier element already uses gets its own, so its arrowheads never point into a hidden copy (P2-63)
   Every pass reads all it needs first and writes afterwards (one layout, P1-11), skips formulas too short to overflow, and is idempotent;
   a pass whose reads set a web font loading (KaTeX fetches a font the first time a formula needs it) runs again once the fonts are ready.

   Contract (docs/ARCHITECTURE.md §10.9):
     GA.fit.figures(root)   GA.fit.maths(root)   GA.fit.tables(root)   GA.fit.all(root, opts) -> number of elements changed
       opts.grow (lab stages, P2-60): a small tree or graph may grow up to that many times its drawn size (at most 2)
     GA.fit.code(root)   GA.fit.names(root)   (both inside all)
     GA.fit.watch(el, opts) -> stop()  one ResizeObserver on el: all(el, opts) again when its width moves by 8 px or more, or its content
                                     grows or shrinks (a solution loads, a fold opens), debounced
   Lab internals (.ga-lab-embed) are left alone unless root is inside the lab (its stage). The cue styles live in app/css/content.css.
   A block marked .fit-late (md.js: the lesson's self-check, which the lesson page moves after the part it lands in was fitted) is fitted by
   the next all() pass wherever it is, and keeps the mark until it has been laid out.
   GA.fit.plan holds the pure decisions (tested in tests/md.test.js). Classic script, UMD: index.html loads it after md.js; require() in Node
   returns the module (no DOM needed for the plans). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const doc = typeof document !== 'undefined' ? document : null;

  /* ============================================================ decisions (pure) */
  const MIN_SCALE = 0.8;         // a figure never drawn below 80 % of its size: its labels would drop under ~9 px
  const PHONE = 600;             // a column narrower than this gets the phone rules (row cards, the 75 % maths floor)
  const RELAYOUT_MIN = 240;      // the narrowest width the diagram kit is asked to draw at
  const STEP = 8;                // px: width changes smaller than this are ignored (re-layout, watch)

  /** {W: drawn width, base: the kit's own min-width, avail, relayout: the kit can redraw it, fitW: width it was last redrawn at}
      -> {mode: 'skip' | 'fit' | 'relayout' | 'wide', w?, minWidth?, wide?, same?} */
  function planFigure(o) {
    const W = +o.W || 0, avail = +o.avail || 0, base = +o.base || 0;
    if (!(avail > 0) || !(W > 0)) return { mode: 'skip' };
    const need = Math.max(base, Math.round(W * MIN_SCALE));
    if (avail >= need - 1) return { mode: 'fit' };
    if (o.relayout) {
      const w = Math.max(RELAYOUT_MIN, Math.floor(avail));
      const fitW = +o.fitW || 0;
      if (fitW && Math.abs(fitW - w) < STEP && fitW <= avail + 1) return { mode: 'relayout', w: fitW, same: true, wide: false };
      return { mode: 'relayout', w, wide: w > avail + 1 };
    }
    return { mode: 'wide', minWidth: need };
  }
  /** {natural: width at 100 %, avail, phone} -> {scale, wide}: shrink to fit down to the floor, then scroll */
  function planMaths(o) {
    const natural = +o.natural || 0, avail = +o.avail || 0;
    if (!(avail > 0) || !(natural > 0) || natural <= avail + 1) return { scale: 1, wide: false };
    const floor = o.phone ? 0.75 : 0.85, r = Math.floor((avail / natural) * 100) / 100;
    return r >= floor ? { scale: r, wide: false } : { scale: floor, wide: true };
  }
  /** {natural, avail, prose, cols, rowH: mean row height as a table, cards: shown as cards now} -> 'skip' | 'fit' | 'wide' | 'cards'.
      A prose table becomes cards in a column under 600 px when, as a table, it would scroll, has four or more columns, or its rows run past
      about four lines; once cards, it stays cards until the column is 600 px or wider. */
  function planTable(o) {
    const natural = +o.natural || 0, avail = +o.avail || 0;
    if (!(avail > 0)) return 'skip';
    if (o.prose && avail < PHONE && (o.cards || natural > avail + 1 || (+o.cols || 0) >= 4 || (+o.rowH || 0) > 92)) return 'cards';
    return natural > avail + 1 ? 'wide' : 'fit';
  }
  /** true when TeX this short cannot be wider than `px`: one source character draws at most ~1.2 em (a capital or a relation with its
      spacing). Lets the maths pass skip most formulas without measuring them (P1-11). */
  const texFits = (texLen, em, px) => texLen * 1.2 * em < px;

  const Fit = { plan: { figure: planFigure, maths: planMaths, table: planTable, texFits, MIN_SCALE, PHONE } };

  if (doc) {
    /* ============================================================ helpers */
    const touch = () => (GA.ui && typeof GA.ui.touch === 'boolean' ? GA.ui.touch : !!(g.matchMedia && g.matchMedia('(hover: none) and (pointer: coarse)').matches));
    const skipLab = (el, root) => { const lab = el.closest('.ga-lab-embed'); return !!lab && !lab.contains(root); };
    const padX = el => { const cs = getComputedStyle(el); return (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0); };
    // a scroll box that got .fit-x: fade its right edge until the reader reaches the end (one listener for the whole page)
    const atEnd = el => el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    const edge = el => el.classList.toggle('fit-end', atEnd(el));
    // a box a pass just made scroll: its end is known after the next layout, so it is read then (all queued boxes, then the writes) and never
    // in the middle of a pass's writes (P1-11)
    let endQ = [];
    const endSoon = el => {
      if (endQ.push(el) > 1) return;
      (g.requestAnimationFrame || (f => setTimeout(f, 16)))(() => { const q = endQ; endQ = []; const ends = q.map(x => x.isConnected && atEnd(x)); q.forEach((x, i) => x.classList.toggle('fit-end', !!ends[i])); });
    };
    doc.addEventListener('scroll', e => { const t = e.target; if (t && t.classList && (t.classList.contains('fit-x') || t.classList.contains('m-wide'))) edge(t); }, { capture: true, passive: true });
    // a box that scrolls sideways: a keyboard stop (and a name when it is a plain wrapper); fade = the right-edge fade (tables, maths)
    const scrollable = (el, on, label, fade = true) => {
      if (on) {
        if (fade) el.classList.add('fit-x');
        if (!el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '0'); el.dataset.fitTab = '1'; }
        if (label && !el.hasAttribute('aria-label')) { el.setAttribute('role', 'group'); el.setAttribute('aria-label', label); el.dataset.fitLabel = '1'; }
      } else if (el.classList.contains('fit-x') || el.dataset.fitTab) {
        el.classList.remove('fit-x', 'fit-end');
        if (el.dataset.fitTab) { el.removeAttribute('tabindex'); delete el.dataset.fitTab; }
        if (el.dataset.fitLabel) { el.removeAttribute('role'); el.removeAttribute('aria-label'); delete el.dataset.fitLabel; }
      }
    };
    const parse = html => { const t = doc.createElement('template'); t.innerHTML = html; return t.content.firstElementChild; };

    /* ============================================================ figures */
    const kept = new WeakMap();     // figure -> the svg as first drawn (restored when the column widens again)
    let idSeq = 0;
    /** a drawing whose ids (arrowheads, clips, hatches) an earlier element on the page already uses gets its own (P2-63): the kit names them
        from what is drawn, so two identical drawings share them, and the second loses its arrowheads while the first sits in a closed fold */
    function ownIds(svg, suffix) {
      const els = svg.querySelectorAll('[id]');
      if (!els.length) return false;
      const map = {};
      els.forEach(el => { if (suffix || doc.getElementById(el.id) !== el) map[el.id] = el.id + '-' + (suffix || 'f' + (++idSeq).toString(36)); });
      const ids = Object.keys(map);
      if (!ids.length) return false;
      ids.forEach(id => { const el = svg.querySelector(`[id="${id}"]`); if (el) el.id = map[id]; });
      const re = new RegExp('#(' + ids.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\w-])', 'g');
      [svg, ...svg.querySelectorAll('*')].forEach(el => [...el.attributes].forEach(a => { if (a.value.indexOf('#') >= 0 && a.name !== 'id') { const v = a.value.replace(re, (m, id) => '#' + map[id]); if (v !== a.value) el.setAttribute(a.name, v); } }));
      return true;
    }
    function readFigures(root, jobs, opts) {
      const grow = Math.max(1, Math.min(2, +((opts && opts.grow) || 1)));
      root.querySelectorAll('figure.dg').forEach(fig => {
        if (skipLab(fig, root)) return;
        const svg = fig.querySelector(':scope > svg.dgs[width]');
        if (!svg) return;
        if (svg.querySelector('[id]')) jobs.push(() => ownIds(svg));
        const avail = fig.clientWidth - padX(fig);
        if (!(avail > 0)) return;                                           // hidden (a closed fold, another depth): fitted when it opens
        if (svg.dataset.mw == null) svg.dataset.mw = svg.style.minWidth || '';
        const W = +(fig.dataset.w0 || svg.getAttribute('width'));
        const canRe = !!(fig.dataset.spec && GA.diagram && GA.diagram.render);
        const plan = planFigure({ W, base: parseFloat(svg.dataset.mw) || 0, avail, relayout: canRe, fitW: +fig.dataset.fitw || 0 });
        // a lab stage may let a small tree or graph grow to fill its box (P2-60): up to `grow` times its drawn size
        const kind = svg.getAttribute('data-dg') || fig.dataset.diagram || '';
        const up = grow > 1 && plan.mode === 'fit' && (kind === 'tree' || kind === 'graph') ? Math.floor(Math.min(avail, W * grow)) : 0;
        jobs.push(() => applyFigure(fig, svg, W, plan) | growFigure(svg, up > W + 8 ? up : 0));
      });
    }
    function growFigure(svg, w) {
      const cur = svg.dataset.grown || '';
      if (String(w || '') === cur) return false;
      if (w) { if (!cur) svg.dataset.gmw = svg.style.maxWidth || ''; svg.style.width = w + 'px'; svg.style.maxWidth = '100%'; svg.dataset.grown = String(w); }
      else { svg.style.width = ''; svg.style.maxWidth = svg.dataset.gmw || ''; delete svg.dataset.grown; delete svg.dataset.gmw; }
      return true;
    }
    function applyFigure(fig, svg, W, plan) {
      if (plan.mode === 'skip') return false;
      let changed = false;
      if (plan.mode === 'relayout') {
        if (!plan.same) {
          let spec = null;
          try { spec = JSON.parse(fig.dataset.spec); } catch (e) { spec = null; }
          let html = '';
          // w0: the width the spec draws at on a desktop, for kinds that keep its scale when they wrap (a horizontal memory map)
          try { html = spec ? GA.diagram.render(Object.assign({}, spec, { phone: true, w: plan.w, w0: spec.w })) : ''; } catch (e) { html = ''; }
          const el = html ? parse(html) : null;
          if (el) {
            if (!kept.has(fig)) kept.set(fig, svg.outerHTML);
            if (!fig.dataset.w0) fig.dataset.w0 = String(W);
            el.dataset.mw = el.style.minWidth || '';
            svg.replaceWith(el); svg = el;
            fig.dataset.fitw = String(plan.w);
            changed = true;
          } else return applyFigure(fig, svg, W, { mode: 'wide', minWidth: Math.round(W * MIN_SCALE) });
        }
        changed = wideFigure(fig, svg, plan.wide ? plan.w : 0) || changed;
        return changed;
      }
      if (fig.dataset.fitw && kept.has(fig)) {                             // wider again: back to the figure as drawn
        const el = parse(kept.get(fig));
        if (el) { el.dataset.mw = el.style.minWidth || ''; svg.replaceWith(el); svg = el; changed = true; }
        delete fig.dataset.fitw;
      }
      return wideFigure(fig, svg, plan.mode === 'wide' ? plan.minWidth : 0) || changed;
    }
    function wideFigure(fig, svg, minWidth) {
      const on = minWidth > 0, mw = on ? minWidth + 'px' : svg.dataset.mw || '';
      let changed = false;
      if (svg.style.minWidth !== mw) { svg.style.minWidth = mw; changed = true; }
      if (fig.classList.contains('dg-wide') !== on) { fig.classList.toggle('dg-wide', on); changed = true; }
      let cue = fig.querySelector(':scope > .dg-cue');
      if (on && !cue) {
        cue = doc.createElement('button');
        cue.type = 'button'; cue.className = 'dg-cue'; cue.setAttribute('data-fit-zoom', '');
        const tt = fig.querySelector(':scope > .dg-tt');                     // under the figure's title (P2-18), above the drawing
        fig.insertBefore(cue, tt ? tt.nextSibling : fig.firstChild);
        changed = true;
      }
      if (on) { const t = touch() ? 'Swipe sideways or tap to enlarge →' : 'Scroll sideways or click to enlarge →'; if (cue.textContent !== t) cue.textContent = t; }
      else if (cue) { cue.remove(); changed = true; }
      scrollable(fig, on, '', false);
      return changed;
    }

    /* tap to enlarge: the figure at its drawn size in a dialog (Close, Esc, Back through GA.ui.overlay when the shell has it) */
    function zoom(fig, from) {
      const svg = fig.querySelector(':scope > svg.dgs');
      if (!svg || typeof HTMLDialogElement === 'undefined') return;
      const W = +svg.getAttribute('width') || svg.getBoundingClientRect().width;
      const name = svg.getAttribute('aria-label') || 'Figure';
      const dlg = doc.createElement('dialog');
      dlg.className = 'fit-zoom';
      dlg.setAttribute('aria-label', name);
      dlg.innerHTML = `<div class="fit-zoom-bar"><b></b><button type="button" class="btn sm" data-fit-close autofocus>Close</button></div><div class="fit-zoom-b" tabindex="0"><figure class="dg fit-zoom-f"></figure></div>`;
      dlg.querySelector('.fit-zoom-bar b').textContent = name;
      const f = dlg.querySelector('.fit-zoom-f'), copy = svg.cloneNode(true);
      copy.style.minWidth = ''; copy.style.width = W + 'px'; copy.style.maxWidth = 'none';
      ownIds(copy, 'z');                                                    // the copy's arrowheads are its own, not the page figure's
      f.appendChild(copy);
      const cap = fig.querySelector(':scope > figcaption');
      if (cap) f.appendChild(cap.cloneNode(true));
      doc.body.appendChild(dlg);
      const ov = GA.ui && GA.ui.overlay && typeof GA.ui.overlay.push === 'function' ? GA.ui.overlay : null;
      let id = null, byBack = false;
      if (ov) { try { id = ov.push({ id: 'fit-zoom', close: () => { byBack = true; if (dlg.open) dlg.close(); } }); } catch (e) { id = null; } }
      dlg.addEventListener('close', () => {
        if (ov && id != null && !byBack) { try { ov.pop(id); } catch (e) { /* already gone */ } }
        dlg.remove();
        if (from && from.isConnected) { try { from.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      }, { once: true });
      dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-fit-close]')) dlg.close(); });
      dlg.showModal();
    }
    doc.addEventListener('click', e => {
      const t = e.target;
      if (!t || !t.closest) return;
      const cue = t.closest('figure.dg.dg-wide > .dg-cue'), pic = cue ? null : t.closest('figure.dg.dg-wide > svg.dgs');
      const fig = (cue || pic) && (cue || pic).parentElement;
      if (!fig || fig.closest('.fit-zoom')) return;
      e.preventDefault();
      zoom(fig, cue || fig);
    });

    /* ============================================================ maths */
    function readMaths(root, jobs) {
      const cs = getComputedStyle(root), fpx = parseFloat(cs.fontSize) || 16, rootW = root.clientWidth || 0;
      // display maths: the .m.md element is the scroll box; formulas whose TeX is too short to overflow are not measured
      root.querySelectorAll('span.m.md').forEach(el => {
        if (skipLab(el, root) || el.closest('.tw')) return;
        const scale = +el.dataset.fs || 1, tex = el.getAttribute('data-tex') || '';
        if (scale === 1 && !el.classList.contains('fit-x') && rootW && texFits(tex.length, fpx * 1.55, rootW * 0.6) && !el.closest('.cols, .qz-opts, .qc-o')) return;
        const avail = el.clientWidth;
        if (!(avail > 0)) return;
        const sw = el.scrollWidth, over = sw > avail + 1;
        const natural = over ? sw / scale : +el.dataset.nw || (scale === 1 ? sw : sw / scale);
        const phone = avail < PHONE;
        const plan = planMaths({ natural, avail, phone });
        jobs.push(() => applyDisplay(el, plan, over ? natural : 0));
      });
      // inline maths that runs past the right edge of its line becomes its own scroll box (one that wraps between its parts is fine as it is)
      const boxes = new Map();
      const boxW = box => {
        if (!boxes.has(box)) { const cs = getComputedStyle(box), pr = parseFloat(cs.paddingRight) || 0, r = box.getBoundingClientRect(); boxes.set(box, { w: box.clientWidth - padX(box), right: r.right - pr - (parseFloat(cs.borderRightWidth) || 0) }); }
        return boxes.get(box);
      };
      const iem = fpx * 1.35, wideRoot = Math.max(120, rootW * 0.55);
      root.querySelectorAll('span.m:not(.md)').forEach(el => {
        const wide = el.classList.contains('m-wide'), n = (el.getAttribute('data-tex') || '').length;
        if (!wide && texFits(n, iem, 120)) return;                         // short enough for any box: no DOM work at all (most formulas)
        if (!wide && texFits(n, iem, wideRoot) && !el.closest('.cols, .qz-opts, .qc-opts, .steps')) return;
        if (skipLab(el, root) || el.closest('.tw, .mblock, .m.md')) return;
        const box = el.parentElement && el.parentElement.closest('p, li, td, th, dd, .co-b, .qz-t, .qz-s, .rev-b, .qc-t, figcaption, h1, h2, h3, h4, summary, label, div');
        if (!box) return;
        const bw = boxW(box), avail = bw.w;
        if (!(avail > 0)) return;
        let on;
        if (wide) on = el.scrollWidth > avail + 1;
        else { const rs = el.getClientRects(); if (!rs.length) return; on = [...rs].some(r => r.right > bw.right + 1); }
        // a box that scrolls fades at its right edge until its end is reached (content.css, like display maths): .fit-end
        if (on !== wide) jobs.push(() => { el.classList.toggle('m-wide', on); el.classList.remove('fit-end'); if (on) { if (!el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '0'); el.dataset.fitTab = '1'; } endSoon(el); } else if (el.dataset.fitTab) { el.removeAttribute('tabindex'); delete el.dataset.fitTab; } return true; });
        else if (on) { const end = atEnd(el); if (end !== el.classList.contains('fit-end')) jobs.push(() => { el.classList.toggle('fit-end', end); return true; }); }
      });
    }
    /* the scale applies to the formula's own size: content.css sizes its .katex-display children by --fit-fs. A percentage on the .m.md itself
       would resolve against its parent, which is not the size it was measured at (lesson.css sets .md to 18 px, so a formula in a 15 px
       solution measured at 18 px came out at 75 % of 15 px, and a 97 % desktop step still overflowed) */
    function applyDisplay(el, plan, nw) {
      let changed = false;
      if (nw) el.dataset.nw = String(Math.round(nw));
      const cur = +el.dataset.fs || 1;
      if (el.style.fontSize) { el.style.fontSize = ''; changed = true; }
      if (Math.abs(cur - plan.scale) >= 0.01) {
        if (plan.scale >= 0.995) { el.style.removeProperty('--fit-fs'); delete el.dataset.fs; }
        else { el.style.setProperty('--fit-fs', String(plan.scale)); el.dataset.fs = String(plan.scale); }
        changed = true;
      }
      const was = el.classList.contains('fit-x');
      if (was !== plan.wide) changed = true;
      scrollable(el, plan.wide, 'Wide formula: scroll sideways to read it all');
      if (plan.wide) endSoon(el);
      return changed;
    }

    /* ============================================================ tables */
    function readTables(root, jobs) {
      root.querySelectorAll('.tw').forEach(tw => {
        if (skipLab(tw, root)) return;
        const table = tw.querySelector(':scope > table');
        if (!table) return;
        const avail = tw.clientWidth;
        if (!(avail > 0)) return;
        const cards = tw.classList.contains('tw-cards'), prose = tw.hasAttribute('data-prose');
        const box = !cards && getComputedStyle(table).display === 'block' ? table : tw;      // a card sheet may make the table its own scroll box
        const natural = cards ? +tw.dataset.nw || 0 : Math.max(box.scrollWidth, table.scrollWidth);
        const head = table.tHead && table.tHead.rows[0], rows = table.rows.length || 1;
        const plan = planTable({ natural, avail: box === table ? table.clientWidth || avail : avail, prose, cards, cols: head ? head.cells.length : 0, rowH: prose && !cards ? table.offsetHeight / rows : 0 });
        jobs.push(() => applyTable(tw, table, box, plan, cards ? 0 : natural));
      });
    }
    function applyTable(tw, table, box, plan, natural) {
      if (plan === 'skip') return false;
      let changed = false;
      if (natural) tw.dataset.nw = String(Math.round(natural));
      const cards = plan === 'cards';
      if (cards && !tw.dataset.cards) { cardLabels(table); tw.dataset.cards = '1'; }
      if (tw.classList.contains('tw-cards') !== cards) { tw.classList.toggle('tw-cards', cards); changed = true; }
      const wide = plan === 'wide';
      if (tw.classList.contains('tw-x') !== wide) { tw.classList.toggle('tw-x', wide); changed = true; }
      const other = box === tw ? table : tw;
      scrollable(other, false);
      scrollable(box, wide, box === tw ? 'Wide table: scroll sideways to read it all' : '');
      if (wide) endSoon(box);
      return changed;
    }
    /** row cards: each body cell gets its column's header (the rendered header, hidden from screen readers, which keep the table roles) */
    function cardLabels(table) {
      const head = table.tHead && table.tHead.rows[0] ? [...table.tHead.rows[0].cells] : [];
      table.setAttribute('role', 'table');
      [...table.children].forEach(sec => { if (/^T(HEAD|BODY|FOOT)$/.test(sec.tagName)) sec.setAttribute('role', 'rowgroup'); });
      head.forEach(th => th.setAttribute('role', 'columnheader'));
      if (table.tHead) [...table.tHead.rows].forEach(tr => tr.setAttribute('role', 'row'));
      [...table.tBodies].forEach(tb => [...tb.rows].forEach(tr => {
        tr.setAttribute('role', 'row');
        [...tr.cells].forEach((td, i) => {
          td.setAttribute('role', td.tagName === 'TH' ? 'rowheader' : 'cell');
          const h = head[i];
          if (!h || !h.textContent.trim() || td.querySelector(':scope > .tw-lab')) return;
          const lab = doc.createElement('span');
          lab.className = 'tw-lab'; lab.setAttribute('aria-hidden', 'true'); lab.innerHTML = h.innerHTML;
          lab.querySelectorAll('[id]').forEach(x => x.removeAttribute('id'));
          td.insertBefore(lab, td.firstChild);
        });
      }));
    }

    /* ============================================================ code */
    /* a 'text' block (a table of bits, program output, a grammar) keeps its columns; when it is wider than its box it fades at the right edge
       until the end is reached, says it scrolls, and is a keyboard stop (P2-19). Programs wrap their lines instead (md.js .code-w). */
    function readCode(root, jobs) {
      root.querySelectorAll('.code > pre').forEach(pre => {
        if (skipLab(pre, root)) return;
        const box = pre.parentElement, w = pre.clientWidth;
        if (!(w > 0)) return;
        const on = pre.scrollWidth > w + 1;
        if (on === box.classList.contains('code-x') && on === pre.classList.contains('fit-x')) return;
        jobs.push(() => { box.classList.toggle('code-x', on); scrollable(pre, on, 'Wide code: scroll sideways to read it all'); if (on) endSoon(pre); return true; });
      });
    }

    /* ============================================================ names */
    /* maths inside a control's label (an option, a button, a link, a summary, a heading, a column header): Chrome leaves MathML out of the
       name it computes, so a radio labelled with maths alone was named 'A' (P0-18). The MathML is hidden there and the formula's words
       (GA.md.speak) stand in; a name is flat text anyway. md.js already writes self-check options this way (data-said). */
    const NAMED = ':is(label, button, summary, a, legend, th, h1, h2, h3, h4, h5, h6, [role="button"], [role="link"], [role="tab"], [role="radio"], [role="checkbox"], [role="option"], [role="menuitem"], [role="switch"], [role="columnheader"]) .m[data-tex]:not([data-said])';
    function readNames(root, jobs) {
      const speak = GA.md && GA.md.speak;
      if (!speak) return;
      const list = root.querySelectorAll(NAMED);                         // the label may be root itself or sit outside it
      if (!list.length) return;
      jobs.push(() => {
        list.forEach(m => {
          m.querySelectorAll('.katex-mathml').forEach(x => x.setAttribute('aria-hidden', 'true'));
          const sr = doc.createElement('span');
          sr.className = 'sr m-say'; sr.textContent = ' ' + speak(m.getAttribute('data-tex') || '') + ' ';
          m.appendChild(sr); m.dataset.said = '1';
        });
        return true;
      });
    }

    /* ============================================================ passes */
    /* a block md.js marks fit-late (the lesson's self-check: the lesson page moves it into Worked examples after that part was fitted) is
       fitted by the next all() pass wherever it is on the page, and keeps the mark until it has been laid out (a hidden depth, a closed fold) */
    const late = doc.getElementsByClassName('fit-late');
    /* KaTeX loads a font the first time a formula needs it (delimiter sizes, bold, AMS: often as a fold first shows a formula); until it
       arrives the formula draws in a fallback, so the widths a pass read can be off by a few px (a cases brace: 327 px drawn in a 324 px box
       after a 0.85 step). A pass whose reads set a font loading runs again on its roots once the fonts are ready (all of them, once). */
    const again = new Map();                                                // root -> opts of its last pass
    const clean = new WeakMap();                                            // root -> number of its last full pass with every font in
    let waiting = false, seq = 0;
    // a full pass over r or an element holding it ran, with the fonts in, after pass number `mark` (a host's own fonts.ready re-fit)
    const covered = (r, mark) => { for (let a = r; a; a = a.parentElement) if ((clean.get(a) || 0) > mark) return true; return false; };
    const afterFonts = (roots, opts) => {
      roots.forEach(r => again.set(r, opts));
      if (waiting || !doc.fonts.ready || typeof doc.fonts.ready.then !== 'function') return;
      waiting = true;
      doc.fonts.ready.then(() => {
        const mark = seq;
        setTimeout(() => {                                                  // after the host's own fonts.ready handlers
          waiting = false;
          const list = [...again].filter(([r]) => r.isConnected && !covered(r, mark));
          again.clear();
          list.forEach(([r, o]) => { if (!list.some(([p]) => p !== r && p.contains(r))) run(r, ALL, o, true); });
        }, 0);
      });
    };
    const run = (root, readers, opts, withLate) => {
      if (!root || !root.querySelectorAll || !root.isConnected) return 0;
      const no = ++seq;
      const roots = [root], seen = [];
      if (withLate && late.length) {
        [...late].forEach(el => {
          if (!el.isConnected) return;
          seen.push(el);
          if (root.contains(el)) return;                                   // fitted with root
          if (el.contains(root)) roots[0] = el; else roots.push(el);
        });
      }
      const jobs = [];
      readers.forEach(r => roots.forEach(rt => r(rt, jobs, opts)));       // every read first (one layout) ...
      const laid = seen.filter(el => el.offsetWidth > 0);                  // (read with the rest, before any write)
      const fonts = !!(doc.fonts && doc.fonts.status === 'loading');       // the reads above made the browser fetch a font
      let n = 0;
      jobs.forEach(j => { try { if (j()) n++; } catch (e) { /* one odd element never stops the pass */ } });   // ... then every write
      laid.forEach(el => el.classList.remove('fit-late'));
      if (fonts) afterFonts(roots, opts);
      else if (readers === ALL) roots.forEach(r => clean.set(r, no));
      return n;
    };
    const ALL = [readFigures, readMaths, readTables, readCode, readNames];
    Fit.figures = (root, opts) => run(root, [readFigures], opts);
    Fit.maths = root => run(root, [readMaths]);
    Fit.tables = root => run(root, [readTables]);
    Fit.code = root => run(root, [readCode]);
    Fit.names = root => run(root, [readNames]);
    /** all(root, {grow}): grow > 1 lets small trees and graphs grow up to that many times their drawn size (lab stages, P2-60) */
    Fit.all = (root, opts) => run(root, ALL, opts, true);
    Fit.zoom = fig => zoom(fig, fig);

    Fit.watch = (el, opts) => {
      if (!el || !el.addEventListener) return () => {};
      let timer = 0, w = -1, h = -1;
      const go = () => { timer = 0; if (el.isConnected) Fit.all(el, opts); };
      const soon = ms => { clearTimeout(timer); timer = setTimeout(go, ms); };
      let ro = null;
      if (typeof ResizeObserver === 'function') {
        ro = new ResizeObserver(entries => {
          const r = entries[entries.length - 1].contentRect, nw = Math.round(r.width), nh = Math.round(r.height);
          if (!nw) { w = -1; return; }                                      // hidden: nothing to measure; fit again when it shows
          const first = w < 0, dw = Math.abs(nw - w), dh = Math.abs(nh - h);
          if (!first && dw < STEP && dh < 2) return;
          if (first || dw >= STEP) w = nw;
          h = nh;
          soon(first ? 0 : 80);
        });
        ro.observe(el);
      } else soon(0);
      const onToggle = () => soon(0);                                       // a fold inside opened: fit what it shows
      el.addEventListener('toggle', onToggle, true);
      return () => { if (ro) ro.disconnect(); clearTimeout(timer); el.removeEventListener('toggle', onToggle, true); };
    };
  }

  g.GA.fit = Fit;
  if (typeof module !== 'undefined' && module.exports) module.exports = Fit;
})(typeof window !== 'undefined' ? window : globalThis);
