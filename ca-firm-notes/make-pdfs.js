/* Phone-sized PDFs of the site — same content, every sealed answer open.
   Run: NODE_PATH=<dir containing playwright> node make-pdfs.js
   Uses the system Chrome, so no browser download is needed.             */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'pdf');

// phone portrait page; the tracker is a wide table, so it gets the same page turned sideways
const PORTRAIT = { w: 110, h: 196 };
const LANDSCAPE = { w: 196, h: 110 };
const MARGIN = { top: 8, bottom: 11, side: 6 }; // mm

const PAGES = [
  { src: 'index.html', out: '0 - Start Here.pdf', label: 'The Firm · Start here' },
  { src: 'desk-costing.html', out: '1 - Paper 4 Cost and Management Accounting.pdf', label: 'Paper 4 · The Costing Desk' },
  { src: 'desk-audit.html', out: '2 - Paper 5 Auditing and Ethics.pdf', label: 'Paper 5 · The Audit Desk' },
  { src: 'desk-treasury.html', out: '3 - Paper 6A Financial Management.pdf', label: 'Paper 6A · The Treasury Desk' },
  { src: 'desk-boardroom.html', out: '4 - Paper 6B Strategic Management.pdf', label: 'Paper 6B · The Boardroom' },
  { src: 'tracker.html', out: '5 - Revision Tracker.pdf', label: 'Revision tracker', landscape: true },
];

const mmToPx = (mm) => Math.floor((mm / 25.4) * 96);

// on top of the site's own print stylesheet (ink on white, gates open, chrome dropped)
const PDF_CSS = `
  details.gate>summary{display:block!important;cursor:default;padding:12px 16px 0}
  details.gate .gate-seal,details.gate .gate-hint{display:none!important}
  details.gate .gate-kind{color:var(--signal)!important}
  .gate-inner>:first-child{margin-top:8px}
  .btn,.card-go{display:none!important}
  .trk td.c-ev,.trk th.c-ev{display:table-cell!important}
  pre{white-space:pre!important;overflow:hidden!important}
  .rows,.slate-body{grid-template-columns:minmax(0,1fr)!important}
  .rows>*,.slate-body>*{min-width:0}
  table{width:100%}
  /* on a small page, keeping every callout whole leaves half-empty pages; only keep code and rows whole */
  .callout,.checkpoint,figure.slate,details.gate{break-inside:auto!important;page-break-inside:auto!important}
  .code,pre,tr,.turn{break-inside:avoid}
`;

async function render(browser, page, spec) {
  const size = spec.landscape ? LANDSCAPE : PORTRAIT;
  await page.setViewportSize({ width: mmToPx(size.w - 2 * MARGIN.side), height: 900 });
  await page.emulateMedia({ media: 'print' });
  await page.goto('file://' + path.join(ROOT, spec.src), { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: PDF_CSS });

  // open every gate, then shrink any monospace block or table that is wider than the page
  const report = await page.evaluate(async () => {
    document.querySelectorAll('details').forEach((d) => { d.classList.remove('sealed'); d.open = true; });
    await document.fonts.ready;
    // zoom rather than font-size: the code and cell fonts are set in px on the children
    const shrunk = [];
    const fit = (el, floor) => {
      const box = el.tagName === 'TABLE' ? el.parentElement : el;
      let z = 1;
      while (box.scrollWidth > box.clientWidth + 1 && z > floor) {
        z = Math.round((z - 0.02) * 100) / 100;
        el.style.zoom = z;
      }
      if (z < 1) shrunk.push(el.tagName.toLowerCase() + ' ' + Math.round(z * 100) + '%');
    };
    document.querySelectorAll('pre').forEach((el) => fit(el, 0.4));
    document.querySelectorAll('table').forEach((el) => fit(el, 0.5));

    // anything still poking past the right edge of the page would be cut off in the PDF
    const limit = document.documentElement.clientWidth + 1;
    const over = [];
    document.querySelectorAll('main *, .landing *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > limit && !el.closest('[style*="display: none"]')) over.push(el.tagName + '.' + el.className + ' ' + Math.round(r.right));
    });
    return { shrunk, over: over.slice(0, 8) };
  });

  const file = path.join(OUT, spec.out);
  await page.pdf({
    path: file,
    width: size.w + 'mm',
    height: size.h + 'mm',
    margin: { top: MARGIN.top + 'mm', bottom: MARGIN.bottom + 'mm', left: MARGIN.side + 'mm', right: MARGIN.side + 'mm' },
    printBackground: true,
    outline: true,
    tagged: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate:
      '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:6.5px;color:#888;padding:0 6mm;display:flex;justify-content:space-between">' +
      '<span>' + spec.label + '</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
  });
  return { file, ...report };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  for (const spec of PAGES) {
    const r = await render(browser, page, spec);
    const kb = Math.round(fs.statSync(r.file).size / 1024);
    console.log(spec.out + '  ' + kb + ' KB');
    if (r.shrunk.length) console.log('  shrunk: ' + r.shrunk.join(', '));
    if (r.over.length) console.log('  STILL TOO WIDE: ' + r.over.join(' | '));
  }
  await browser.close();
})();
