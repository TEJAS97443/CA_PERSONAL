/* PassBook PDFs: the question bank's extra fit step around tools/pdf/fit.js (inlined after it by tools/pdf/qbank_html.js).
   ICAI's answers put long fractions inline ($\dfrac{...}{...}$ in a sentence): fit.js zooms display maths only, so an inline formula wider
   than its line is zoomed here (never below 40 %), before and after the main pass, and the overflow report is taken again. Report entries
   name the question card (U<n>) instead of fit.js's lesson id. */
(function () {
  'use strict';
  const orig = window.__pdfFit;
  const card = el => { const u = el.closest('.qb-u'); return u ? u.id : '?'; };
  function inlineMaths() {
    let n = 0;
    document.querySelectorAll('main .m:not(.md)').forEach(el => {
      if (el.closest('.mblock, .m.md, .katex-mathml')) return;
      const box = el.parentElement && el.parentElement.closest('p, li, td, th, .md, div');
      if (!box) return;
      const cs = getComputedStyle(box);
      const right = box.getBoundingClientRect().right - (parseFloat(cs.paddingRight) || 0);
      const left = box.getBoundingClientRect().left + (parseFloat(cs.paddingLeft) || 0);
      const r = el.getBoundingClientRect();
      if (r.right <= right + 1) return;
      const avail = right - left, w = r.width / (parseFloat(el.style.zoom) || 1);
      if (!(avail > 0 && w > 0)) return;
      // a formula that fits the line once it starts a line: let it wrap there instead of shrinking
      if (w <= avail + 1 && !el.dataset.qbBlock) { el.style.display = 'inline-block'; el.dataset.qbBlock = '1'; if (el.getBoundingClientRect().right <= right + 1) { n++; return; } }
      el.style.display = 'inline-block';
      el.style.zoom = Math.max(0.4, Math.floor(avail / w * 100) / 100);
      n++;
    });
    return n;
  }
  /** fit.js turns a phone page's prose tables into row cards. That suits ICAI's "difference between" tables (words in every column), not
      its statements and workings (a column of amounts): those stay tables and are zoomed instead. */
  const NUM = /^[\s(₹\-–—+=x×%.,:/]*[\d][\d\s,.()%₹\-–—+=x×/:]*$|^\s*[-–—]*\s*$/;
  function numericTables() {
    let n = 0;
    document.querySelectorAll('main .tw[data-prose]').forEach(tw => {
      const t = tw.querySelector(':scope > table');
      if (!t) return;
      const rows = [...t.tBodies].flatMap(b => [...b.rows]);
      const cols = Math.max(0, ...rows.map(r => r.cells.length));
      for (let c = 1; c < cols; c++) {
        const cells = rows.map(r => r.cells[c]).filter(Boolean).map(td => td.textContent.trim()).filter(Boolean);
        if (cells.length && cells.filter(x => NUM.test(x)).length / cells.length >= 0.5) { tw.removeAttribute('data-prose'); n++; return; }
      }
    });
    return n;
  }
  window.__pdfFit = async function () {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const unprose = numericTables();
    const pre = inlineMaths();
    const rep = await orig();
    const post = inlineMaths();
    // ICAI's widest working tables (10+ columns) can still overflow at fit.js's 50 % floor with words broken: go on down to 30 %
    // (the PDF is vector, so a reader zooms in on them); each is listed in the report
    rep.small = [];
    const page = document.documentElement.clientWidth;
    document.querySelectorAll('main .tw > table').forEach(t => {
      const lim = () => Math.min(t.parentElement.getBoundingClientRect().right, page);
      if (t.getBoundingClientRect().right <= lim() + 1) return;
      let z = parseFloat(t.style.zoom) || 1;
      while (z > 0.3 && t.getBoundingClientRect().right > lim() + 1) { z = Math.round((z - 0.02) * 100) / 100; t.style.zoom = z; }
      rep.small.push(card(t) + ' ' + Math.round(z * 100) + '%');
    });
    // a header cell can stick out of its own table (a long unbreakable header): zoom the table until no cell passes the page edge
    const sticks = t => [...t.querySelectorAll('th, td')].some(c => c.getBoundingClientRect().right > page + 1);
    document.querySelectorAll('main .tw:not(.tw-cards) > table').forEach(t => {
      if (!sticks(t)) return;
      let z = parseFloat(t.style.zoom) || 1;
      while (z > 0.3 && sticks(t)) { z = Math.round((z - 0.02) * 100) / 100; t.style.zoom = z; }
      rep.small.push(card(t) + ' cells ' + Math.round(z * 100) + '%');
    });
    // fit.js keeps a table whole when it fits in 70 % of a page; in the bank that leaves page-sized gaps (ICAI's workings are long), so only
    // tables up to a third of a page are kept whole, the rest break between rows with their header repeated
    const ph = +document.body.dataset.ph || 0;
    rep.unkept = 0;
    if (ph) document.querySelectorAll('main .tw.pdf-keep').forEach(tw => { if (tw.getBoundingClientRect().height > ph / 3) { tw.classList.remove('pdf-keep'); rep.unkept++; } });
    const limit = document.documentElement.clientWidth + 1, over = [];
    document.querySelectorAll('main *').forEach(el => {
      if (over.length >= 20) return;
      const r = el.getBoundingClientRect();
      // a card table's header row is drawn nowhere (content.css clips it to 1 px), so it cannot stick out
      if (r.width && r.right > limit && !el.closest('.katex-mathml, .tw-cards > table > thead') && !el.ownerSVGElement) over.push(card(el) + ' ' + el.tagName.toLowerCase() + '.' + String(el.className && el.className.baseVal != null ? el.className.baseVal : el.className).slice(0, 40) + ' ' + Math.round(r.right - limit) + 'px');
    });
    rep.over = over;
    rep.inlineMaths = pre + post;
    rep.numericTables = unprose;
    rep.zoomed = (rep.zoomed || []).map(z => z.replace(/^\?/, 'table'));
    return rep;
  };
})();
