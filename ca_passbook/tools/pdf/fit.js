/* PassBook PDFs: the print fit pass (inlined into each PDF's HTML by tools/pdf/build_html.js; tools/pdf/print_pdf.js calls it before printing).
   Paper cannot scroll, so everything wider than its column is made to fit (the app's GA.fit scrolls instead):
     figures  redrawn by the diagram kit at the column's width when the kind can re-lay out (plot, flow, layers, gantt, memory, tree), else
              scaled down by the SVG's own viewBox
     tables   a prose table on a phone page becomes row cards (each value under its column's name, as in the app); any other wide table
              is zoomed down until it fits (never below 50 %, then its cells may break inside words)
     maths    a display formula wider than its column is zoomed down until it fits
   Returns a report: {relaid, scaled: [figures drawn under 75 %], cards, zoomed: [tables], maths: [formulas], over: [anything still too wide]} */
(function () {
  'use strict';
  const px = v => parseFloat(v) || 0;
  const inner = el => { const cs = getComputedStyle(el); return el.clientWidth - px(cs.paddingLeft) - px(cs.paddingRight); };
  const where = el => { const a = el.closest('article.ls'); return a ? a.id.replace(/^L-/, '') : '?'; };

  function figures(rep) {
    document.querySelectorAll('figure.dg').forEach(fig => {
      let svg = fig.querySelector(':scope > svg.dgs');
      if (!svg) return;
      const avail = Math.floor(inner(fig));
      const W = +svg.getAttribute('width') || 0;
      if (!(avail > 0 && W > 0)) return;
      if (W > avail + 1 && fig.dataset.spec && window.GA && GA.diagram) {
        try {
          const spec = JSON.parse(fig.dataset.spec);
          const t = document.createElement('template');
          t.innerHTML = GA.diagram.render(Object.assign({}, spec, { phone: true, w: Math.max(240, avail), w0: spec.w }));
          const el = t.content.firstElementChild;
          if (el && el.tagName.toLowerCase() === 'svg') { svg.replaceWith(el); svg = el; rep.relaid++; }
        } catch (e) { rep.errors.push(where(fig) + ': relayout ' + e.message); }
      }
      fig.removeAttribute('data-spec');
      const W2 = +svg.getAttribute('width') || W;
      if (W2 > avail + 1 && W2 * 0.75 > avail) rep.scaled.push(where(fig) + ' ' + (svg.getAttribute('data-dg') || '') + ' ' + Math.round(avail / W2 * 100) + '%');
    });
  }

  function cardLabels(table) {
    const head = table.tHead && table.tHead.rows[0] ? [...table.tHead.rows[0].cells] : [];
    [...table.tBodies].forEach(tb => [...tb.rows].forEach(tr => [...tr.cells].forEach((td, i) => {
      const h = head[i];
      if (!h || !h.textContent.trim() || td.querySelector(':scope > .tw-lab')) return;
      const lab = document.createElement('span');
      lab.className = 'tw-lab'; lab.innerHTML = h.innerHTML;
      td.insertBefore(lab, td.firstChild);
    })));
  }

  function tables(rep, phone) {
    document.querySelectorAll('.tw').forEach(tw => {
      const table = tw.querySelector(':scope > table');
      if (!table) return;
      const avail = tw.clientWidth;
      if (!(avail > 0)) return;
      const natural = Math.max(tw.scrollWidth, table.scrollWidth);
      const cols = table.tHead && table.tHead.rows[0] ? table.tHead.rows[0].cells.length : 0;
      const rows = table.rows.length || 1;
      const prose = tw.hasAttribute('data-prose');
      // the app's rule (GA.fit planTable): a prose table in a column under 600 px becomes cards when it would scroll, has 4+ columns or tall rows
      if (phone && prose && cols && (natural > avail + 1 || cols >= 4 || table.offsetHeight / rows > 92)) {
        cardLabels(table); tw.classList.add('tw-cards'); rep.cards++;
        return;
      }
      if (natural <= avail + 1) return;
      const wide = () => table.getBoundingClientRect().width > avail + 1;
      let z = Math.max(0.5, Math.floor(avail / natural * 100) / 100);
      table.style.zoom = z;
      while (z > 0.5 && wide()) { z = Math.round((z - 0.02) * 100) / 100; table.style.zoom = z; }
      if (wide()) tw.classList.add('tw-break');
      rep.zoomed.push(where(tw) + ' ' + cols + 'col ' + Math.round(z * 100) + '%');
    });
  }

  function maths(rep) {
    document.querySelectorAll('.md .mblock, .md .m.md').forEach(el => {
      if (el.parentElement && el.parentElement.closest('.mblock, .m.md')) return;      // the inner .m of a .mblock: fitted with it
      const avail = inner(el), k = el.querySelector('.katex-display, .mrows, .katex') || el;
      const natural = Math.max(el.scrollWidth, k.scrollWidth);
      if (!(avail > 0) || natural <= avail + 1) return;
      let z = Math.max(0.45, Math.floor(avail / natural * 100) / 100);
      el.style.zoom = z;
      while (z > 0.45 && k.getBoundingClientRect().width > avail + 1) { z = Math.round((z - 0.02) * 100) / 100; el.style.zoom = z; }
      rep.maths.push(where(el) + ' ' + Math.round(z * 100) + '%');
    });
  }

  function overflow(rep) {
    const limit = document.documentElement.clientWidth + 1;
    document.querySelectorAll('main *').forEach(el => {
      if (rep.over.length >= 20) return;
      const r = el.getBoundingClientRect();
      if (r.width && r.right > limit && !el.closest('.katex-mathml') && !(el.ownerSVGElement)) rep.over.push(where(el) + ' ' + el.tagName.toLowerCase() + '.' + String(el.className && el.className.baseVal != null ? el.className.baseVal : el.className).slice(0, 40) + ' ' + Math.round(r.right - limit) + 'px');
    });
  }

  /** boxes that fit in 70 % of a page are kept whole (a longer one would leave a near-empty page behind it) */
  function keep(rep) {
    const ph = +document.body.dataset.ph || 0;
    if (!ph) return;
    document.querySelectorAll('.md .co, .md .tw:not(.tw-cards), .steps > li, .cols > div, .rev, .ex-b > .tw, .pq-q, .ak-l > li, .fc, .co-l > li, .md .code, .md blockquote').forEach(el => {
      const h = el.getBoundingClientRect().height;
      if (h > 0 && h <= ph * 0.7) el.classList.add('pdf-keep'); else if (h > ph * 0.7) rep.long++;
    });
    // a line that introduces what follows ("Where the information goes:") stays with it
    document.querySelectorAll('.md p').forEach(p => { if (/:\s*$/.test(p.textContent) && p.nextElementSibling) p.classList.add('pdf-lead'); });
  }

  window.__pdfFit = async function () {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const rep = { relaid: 0, scaled: [], cards: 0, zoomed: [], maths: [], over: [], errors: [], long: 0 };
    const phone = document.body.classList.contains('pdf-phone');
    figures(rep);
    tables(rep, phone);
    maths(rep);
    if (document.fonts && document.fonts.ready) await document.fonts.ready;    // a formula may have asked for one more KaTeX font
    keep(rep);
    overflow(rep);
    return rep;
  };
})();
