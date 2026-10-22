#!/usr/bin/env node
/* PassBook PDFs: print HTML files to PDF with the system's headless Chrome over the DevTools pipe (no Playwright, no network).
   Usage: node tools/pdf/print_pdf.js jobs.json       (normally run by tools/pdf/make_pdfs.py)
   jobs.json: [{html, pdf, w, h, mt, mb, ms, scale, label}]   sizes in mm, scale = Chrome's print scale; label = the footer's left text.
   Per job: the page is laid out at the PDF's text width with print media, window.__pdfFit() (tools/pdf/fit.js, inlined by build_html.js)
   fits wide tables, formulas and figures, and then Chrome prints with a page-number footer and a document outline (the PDF bookmarks).
   Prints one line of JSON per job on stdout: {pdf, ms, fit: <the fit report>}. */
'use strict';
const fs = require('fs'), os = require('os'), path = require('path');
const { spawn } = require('child_process');

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAR = Math.max(1, +(process.env.PDF_PAR || 3));
const MM_IN = 1 / 25.4, MM_PX = 96 / 25.4;

function launch() {
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-pdf-chrome-'));
  const args = ['--headless=new', '--remote-debugging-pipe', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--disable-extensions', '--hide-scrollbars', '--mute-audio', '--allow-file-access-from-files', '--disable-background-networking',
    '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows',
    `--user-data-dir=${prof}`, 'about:blank'];
  const ch = spawn(CHROME, args, { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'], env: Object.assign({}, process.env, { TMPDIR: prof }) });
  let err = '';
  ch.stderr.on('data', d => { err = (err + d).slice(-4000); });
  const out = ch.stdio[3], inp = ch.stdio[4];
  let seq = 0, buf = '';
  const wait = new Map(), listeners = [];
  inp.on('data', d => {
    buf += d.toString('utf8');
    let k;
    while ((k = buf.indexOf('\0')) >= 0) {
      const msg = JSON.parse(buf.slice(0, k));
      buf = buf.slice(k + 1);
      if (msg.id != null && wait.has(msg.id)) {
        const w = wait.get(msg.id); wait.delete(msg.id);
        if (msg.error) w.reject(new Error(w.method + ': ' + JSON.stringify(msg.error))); else w.resolve(msg.result);
      } else if (msg.method) listeners.slice().forEach(f => f(msg));
    }
  });
  const send = (method, params, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq;
    wait.set(id, { resolve, reject, method });
    out.write(JSON.stringify(Object.assign({ id, method, params: params || {} }, sessionId ? { sessionId } : {})) + '\0');
  });
  const on = f => { listeners.push(f); return () => { const i = listeners.indexOf(f); if (i >= 0) listeners.splice(i, 1); }; };
  const close = async () => {
    try { await Promise.race([send('Browser.close'), new Promise(r => setTimeout(r, 3000))]); } catch (e) { /* gone */ }
    try { ch.kill('SIGKILL'); } catch (e) { /* gone */ }
    for (let i = 0; i < 10; i++) {        // Chrome may still be writing its profile for a moment after it exits
      try { fs.rmSync(prof, { recursive: true, force: true }); break; } catch (e) { await new Promise(r => setTimeout(r, 300)); }
    }
  };
  ch.on('exit', code => { for (const w of wait.values()) w.reject(new Error('chrome exited ' + code + '\n' + err)); wait.clear(); });
  return { send, on, close };
}

async function printOne(cdp, job) {
  const t0 = Date.now();
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  try {
    await s('Page.enable');
    await s('Runtime.enable');
    const logs = [];
    const off = cdp.on(msg => {
      if (msg.sessionId !== sessionId) return;
      if (msg.method === 'Runtime.exceptionThrown') logs.push('exception: ' + JSON.stringify(msg.params.exceptionDetails).slice(0, 400));
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') logs.push('console: ' + msg.params.args.map(a => a.value || a.description || '').join(' ').slice(0, 300));
    });
    const scale = job.scale || 1, textW = Math.floor((job.w - 2 * job.ms) * MM_PX / scale);
    await s('Emulation.setDeviceMetricsOverride', { width: textW, height: 1000, deviceScaleFactor: 1, mobile: false });
    await s('Emulation.setEmulatedMedia', { media: 'print' });
    const loaded = new Promise(res => { const o = cdp.on(m => { if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') { o(); res(); } }); });
    await s('Page.navigate', { url: 'file://' + path.resolve(job.html) });
    await loaded;
    const r = await s('Runtime.evaluate', { expression: 'window.__pdfFit ? window.__pdfFit() : {none: true}', awaitPromise: true, returnByValue: true });
    const fit = r.result && r.result.value;
    const foot = `<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:${job.w > 150 ? 8 : 6.5}px;color:#6b7280;padding:0 ${job.ms}mm;display:flex;justify-content:space-between">` +
      `<span>${job.label.replace(/[<&]/g, c => (c === '<' ? '&lt;' : '&amp;'))}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;
    const pr = await s('Page.printToPDF', {
      paperWidth: job.w * MM_IN, paperHeight: job.h * MM_IN,
      marginTop: job.mt * MM_IN, marginBottom: job.mb * MM_IN, marginLeft: job.ms * MM_IN, marginRight: job.ms * MM_IN,
      printBackground: true, preferCSSPageSize: false, scale, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: foot,
      generateDocumentOutline: true, generateTaggedPDF: true, transferMode: 'ReturnAsStream'
    });
    const fd = fs.openSync(job.pdf + '.part', 'w');
    for (;;) {
      const c = await s('IO.read', { handle: pr.stream, size: 4 << 20 });
      if (c.data) fs.writeSync(fd, Buffer.from(c.data, c.base64Encoded ? 'base64' : 'utf8'));
      if (c.eof) break;
    }
    fs.closeSync(fd);
    await s('IO.close', { handle: pr.stream });
    fs.renameSync(job.pdf + '.part', job.pdf);
    off();
    return { pdf: job.pdf, ms: Date.now() - t0, fit, logs };
  } finally {
    await cdp.send('Target.closeTarget', { targetId }).catch(() => {});
  }
}

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const cdp = launch();
  let next = 0, failed = 0;
  const worker = async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      try { process.stdout.write(JSON.stringify(await printOne(cdp, job)) + '\n'); }
      catch (e) { failed++; process.stdout.write(JSON.stringify({ pdf: job.pdf, error: String(e && e.stack || e).slice(0, 2000) }) + '\n'); }
    }
  };
  await Promise.all(Array.from({ length: Math.min(PAR, jobs.length) }, worker));
  await cdp.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
