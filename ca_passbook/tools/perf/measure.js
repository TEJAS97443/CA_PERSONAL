/* PassBook — timing the hosted copy on a phone (tools/perf; owner WP16; audit P1-58, P1-60; moved and adapted from the audit's
   _audit/ev/gap-hosted/harness/measure.js). Chrome at 390 × 844 with an Android UA, CPU slowed 4x, DevTools network presets (applied to the page and
   to its service worker, whose own fetches the page's emulation does not cover), times read from the page's own clock: a MutationObserver marks
   the moment each selector first appears.

   budget(site): the three launch budgets of P1-58, each the median of 3 runs (REPS=n to change) in a fresh Chrome profile, served over HTTP/2 + TLS with brotli from
   127.0.0.1 (a throw-away certificate made with openssl, trusted only by that Chrome through --ignore-certificate-errors-spki-list):
     first visit, Home on Fast 4G                   ≤ 1.5 s   (no worker yet)
     repeat visit, Home on Slow 4G with the worker  ≤ 1.0 s
     first lesson on Slow 4G with the worker        ≤ 2.0 s   (the lesson's own file, not yet cached; its view is in the precached shell)
   Run it as: node --experimental-websocket tools/perf/hosted.js budget [site] */
const fs = require('fs'), path = require('path'), os = require('os'), { execSync } = require('child_process');
const { serve } = require('./server');
const { launch, sleep } = require('./cdp');

const NETS = {
  fast4g: { latency: 165, downloadThroughput: 9e6 * 0.9 / 8, uploadThroughput: 1.5e6 * 0.9 / 8 },
  slow4g: { latency: 562.5, downloadThroughput: 1.6e6 * 0.9 / 8, uploadThroughput: 750e3 * 0.9 / 8 },
  '3g': { latency: 2000, downloadThroughput: 500e3 * 0.8 / 8, uploadThroughput: 500e3 * 0.8 / 8 },
  none: { latency: 0, downloadThroughput: -1, uploadThroughput: -1 }
};
const REPS = +process.env.REPS || 3;
const BUDGET = [['first visit: Home on Fast 4G (no worker yet)', 'first', 1500], ['repeat visit: Home on Slow 4G with the worker', 'repeat', 1000],
  ['first lesson on Slow 4G with the worker', 'lesson', 2000]];
const UA = 'Mozilla/5.0 (Linux; Android 14; 23021RAA2Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Mobile Safari/537.36';
const MARKS = [['home', '.hm-hero'], ['lesson', '[data-view="lesson"] #lesson-body .lsec']];
const REC = `(() => { if (window.top !== window) return; const M = window.__m = { marks: {} };
  const W = ${JSON.stringify(MARKS)}, check = () => { const t = performance.now(); for (const [k, s] of W) if (!(k in M.marks) && document.querySelector(s)) M.marks[k] = t; };
  new MutationObserver(check).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }); })();`;

/** a self-signed certificate for localhost in dir → {cert, key, spki} (openssl is part of macOS and every Linux) */
function certificate(dir) {
  const cert = path.join(dir, 'cert.pem'), key = path.join(dir, 'key.pem');
  execSync(`openssl req -x509 -newkey rsa:2048 -nodes -keyout "${key}" -out "${cert}" -days 2 -subj /CN=localhost -addext subjectAltName=DNS:localhost`, { stdio: 'ignore' });
  const spki = execSync(`openssl x509 -in "${cert}" -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64`).toString().trim();
  return { cert, key, spki };
}
const median = a => { const s = a.filter(x => x >= 0).sort((x, y) => x - y); if (!s.length) return -1; const m = s.length >> 1; return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };

/** one Chrome: throttled tabs, the service worker's sessions throttled alike */
async function browser(scratch, spki) {
  const c = await launch({ scratch, extra: [`--ignore-certificate-errors-spki-list=${spki}`, '--host-resolver-rules=MAP localhost 127.0.0.1'] });
  let net = NETS.none;
  const workers = new Set();
  c.on(m => {
    if (m.method !== 'Target.attachedToTarget' || m.sessionId) return;
    const sid = m.params.sessionId;
    if (m.params.targetInfo.type === 'service_worker') {
      workers.add(sid);
      (async () => { await c.send('Network.enable', {}, sid); await c.send('Network.emulateNetworkConditions', Object.assign({ offline: false }, net), sid); await c.send('Runtime.runIfWaitingForDebugger', {}, sid); })().catch(() => {});
    } else c.send('Runtime.runIfWaitingForDebugger', {}, sid).catch(() => {});
  });
  await c.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true, filter: [{ type: 'service_worker', exclude: false }, { exclude: true }] });
  const B = { c, page: null };
  B.net = async name => { net = NETS[name]; for (const sid of [B.page && B.page.s, ...workers].filter(Boolean)) await c.send('Network.emulateNetworkConditions', Object.assign({ offline: false }, net), sid).catch(() => {}); };
  B.open = async (name, cpu) => {
    if (B.page) { await c.send('Target.closeTarget', { targetId: B.page.targetId }).catch(() => {}); await sleep(1500); }
    net = NETS[name];
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId: s } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    for (const [m, p] of [['Network.enable', {}], ['Page.enable', {}], ['Runtime.enable', {}], ['Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true }],
      ['Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }], ['Emulation.setUserAgentOverride', { userAgent: UA, platform: 'Linux armv8l' }],
      ['Network.emulateNetworkConditions', Object.assign({ offline: false }, net)], ['Emulation.setCPUThrottlingRate', { rate: cpu }], ['Page.addScriptToEvaluateOnNewDocument', { source: REC }]]) await c.send(m, p, s);
    for (const sid of workers) await c.send('Network.emulateNetworkConditions', Object.assign({ offline: false }, net), sid).catch(() => {});
    B.page = { targetId, s };
  };
  B.ev = async (expr, timeout = 60000) => { const r = await c.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, timeout }, B.page.s); return r.result && r.result.value; };
  B.until = async (expr, ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { try { const v = await B.ev(expr, 5000); if (v) return v; } catch (e) { /* navigating */ } await sleep(100); } return false; };
  return B;
}

async function budget(site, { ok }) {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'ga-budget-'));
  const tls = certificate(scratch), srv = await serve(site, { port: 0, cert: tls.cert, key: tls.key, enc: 'br', warm: true });
  const base = srv.url, times = { first: [], repeat: [], lesson: [] };
  try {
    for (let rep = 0; rep < REPS; rep++) {
      const B = await browser(scratch, tls.spki);
      try {
        await B.open('fast4g', 4);                                    // a first visit: nothing cached, no worker
        await B.c.send('Page.navigate', { url: base + 'index.html#/' }, B.page.s);
        times.first.push(Math.round(await B.until('window.__m && window.__m.marks.home', 60000) || -1));
        await B.net('none');                                          // let the worker install and precache the shell
        await B.until(`navigator.serviceWorker.controller && caches.open('pb-files').then(c => c.keys()).then(k => k.length > 80)`, 90000);
        await sleep(1000);
        await B.open('slow4g', 4);                                    // a repeat visit, the worker answering
        await B.c.send('Page.navigate', { url: base + 'index.html#/' }, B.page.s);
        times.repeat.push(Math.round(await B.until('window.__m && window.__m.marks.home', 60000) || -1));
        await sleep(1500);
        const id = await B.ev('GA.data.D.lessons.filter(l => l.subject === "algo")[3].id');
        const ms = await B.ev(`new Promise(res => { const t0 = performance.now(), sel = '[data-view="lesson"] #lesson-body .lsec';
          const done = () => { if (document.querySelector(sel) && GA.router.current.path === ${JSON.stringify('/l/')} + ${JSON.stringify(id)}) { mo.disconnect(); res(Math.round(performance.now() - t0)); } };
          const mo = new MutationObserver(done); mo.observe(document, { childList: true, subtree: true }); location.hash = '#/l/' + ${JSON.stringify(id)};
          setTimeout(() => { mo.disconnect(); res(-1); }, 60000); })`, 70000);
        times.lesson.push(ms);
      } finally { await B.c.close(); }
    }
    for (const [label, k, limit] of BUDGET) {
      const m = median(times[k]);
      ok(`budget: ${label}: ${(m / 1000).toFixed(2)} s (limit ${(limit / 1000).toFixed(1)} s; runs ${times[k].join(', ')} ms)`, m >= 0 && m <= limit);
    }
  } finally { await srv.close(); fs.rmSync(scratch, { recursive: true, force: true }); }
}
module.exports = { budget, NETS, certificate, browser, median };
