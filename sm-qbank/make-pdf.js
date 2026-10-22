/* Render site/index.html to PDF with Playwright + system Chrome.
   Run: NODE_PATH=~/nexora-automation/node_modules node make-pdf.js [--phone]

   Produces _full.pdf (footer on every page) and _cover.pdf (clean cover, no footer).
   merge-pdf.py then stitches cover page 1 onto the rest.                        */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = __dirname;
const SITE = path.join(ROOT, 'site');
const phone = process.argv.includes('--phone');

// A4 for print/tablet; a narrow page for phone reading
const SIZE = phone
  ? { width: '110mm', height: '196mm', margin: { top: '8mm', bottom: '11mm', left: '7mm', right: '7mm' } }
  : { format: 'A4', margin: { top: '17mm', bottom: '16mm', left: '15mm', right: '15mm' } };

const FOOTER = `
<style>
  #f { -webkit-print-color-adjust: exact; width: 100%;
       font: 7.4pt/1 -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
       color: #8a93a0; padding: 0 ${phone ? '7mm' : '15mm'};
       display: flex; align-items: center; }
  #f .t { letter-spacing: .06em; }
  #f .p { margin-left: auto; font-variant-numeric: tabular-nums; color: #5b646f; }
  #f .p b { color: #1f3a63; }
</style>
<div id="f">
  <span class="t">CA Intermediate &middot; Strategic Management Question Bank</span>
  <span class="p"><b class="pageNumber"></b> / <span class="totalPages"></span></span>
</div>`;

// phone edition: same content re-flowed for a 110 x 196 mm page
const PHONE_CSS = `
  @page { size: 110mm 196mm; margin: 8mm 7mm 11mm 7mm; }
  body { font-size: 9.6pt; line-height: 1.5; }
  .cover { height: 174mm; }
  .cover-rule { margin-bottom: 6mm; height: 3mm; }
  .cover-kicker { font-size: 7.4pt; margin-bottom: 4mm; }
  .cover h1 { font-size: 21pt; margin-bottom: 3mm; }
  .cover .sub { font-size: 9.8pt; margin-bottom: 4mm; }
  .cover-contents { margin-top: 2mm; }
  .cover-contents .cc-lbl { margin-bottom: 2mm; }
  .cover-contents li { font-size: 9.2pt; padding: 1.2mm 0; }
  .cover-contents .cc-foot { font-size: 7.2pt; margin-top: 2.5mm; }
  .cover-meta { grid-template-columns: 1fr 1fr; gap: 2.5mm; padding-top: 3.5mm; }
  .cover-meta .k { font-size: 6.6pt; margin-bottom: 1.2mm; }
  .cover-meta .v { font-size: 11pt; }
  .cover-meta .v small { font-size: 7.2pt; }
  .cover-note { font-size: 6.6pt; margin-top: 3.5mm; }
  .legend { grid-template-columns: 1fr; }
  .chapter-head h2 { font-size: 18pt; }
  .ch-stats { flex-wrap: wrap; gap: 3mm 6mm; }
  .ch-stats b { font-size: 11pt; }
  .fm > h2, .chapter-body > h2 { font-size: 14pt; }
  table { font-size: 7.6pt; }
  th, td { padding: 1.3mm 1.6mm; }
  .q { padding-left: 3mm; }
  .ans { padding: 2.4mm 2.6mm 1.8mm; }
  .group-head .muted { display: none; }
`;

// used only for the cover pass: hide everything that isn't the cover
const COVER_ONLY = `
  body > *:not(.cover) { display: none !important; }
  .cover { break-after: auto !important; }
`;

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  const url = 'file://' + path.join(SITE, 'index.html');
  await page.goto(url, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });

  if (phone) await page.addStyleTag({ content: PHONE_CSS });
  const base = { ...SIZE, printBackground: true, preferCSSPageSize: !phone };

  // full document, with footer. tagged/outline give a clickable chapter tree where supported.
  const fullOpts = { ...base, displayHeaderFooter: true, headerTemplate: '<span></span>',
                     footerTemplate: FOOTER, path: path.join(ROOT, '_full.pdf') };
  try {
    await page.pdf({ ...fullOpts, tagged: true, outline: true });
    console.log('  full pdf (tagged + outline)');
  } catch (e) {
    await page.pdf(fullOpts);
    console.log('  full pdf (plain — tagged/outline unsupported by this Playwright)');
  }

  // cover only, no footer
  await page.addStyleTag({ content: COVER_ONLY });
  await page.pdf({ ...base, displayHeaderFooter: false, path: path.join(ROOT, '_cover.pdf') });
  console.log('  cover pdf');

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
