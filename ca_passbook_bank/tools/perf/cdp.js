/* PassBook — a minimal Chrome DevTools Protocol client for the hosted-copy harness (tools/perf; owner WP16, moved from the audit's
   _audit/ev/gap-hosted/harness). Flat sessions over the WebSocket of a headless Chrome it starts itself. Needs Node 20 with
   --experimental-websocket (or Node 22+). Chrome gets a private profile and a private TMPDIR, both removed by close(): headless Chrome otherwise
   leaves ~0.6 MB in the shared temp folder on every launch. */
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const CH = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

/** start Chrome on a free-ish port with a throw-away profile; extra = more command-line switches */
async function launch({ port = 9300 + Math.floor(Math.random() * 600), extra = [], scratch } = {}) {
  const base = fs.mkdtempSync(path.join(scratch || os.tmpdir(), 'cdp-'));
  const dir = path.join(base, 'profile'), tmp = path.join(base, 'tmp');
  fs.mkdirSync(dir); fs.mkdirSync(tmp);
  const args = ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', `--remote-debugging-port=${port}`,
    `--user-data-dir=${dir}`, '--disable-background-networking', '--disable-component-update', '--disable-sync', '--metrics-recording-only',
    '--disable-features=Translate,OptimizationHints,MediaRouter', ...extra, 'about:blank'];
  const proc = spawn(CH, args, { stdio: 'ignore', env: Object.assign({}, process.env, { TMPDIR: tmp }) });
  let ws = null;
  for (let i = 0; i < 100 && !ws; i++) {
    await sleep(150);
    try { const r = await fetch(`http://127.0.0.1:${port}/json/version`); ws = (await r.json()).webSocketDebuggerUrl; } catch (e) { /* not up yet */ }
  }
  if (!ws) { try { proc.kill('SIGKILL'); } catch (e) { /* gone */ } fs.rmSync(base, { recursive: true, force: true }); throw new Error('chrome did not start'); }
  const c = await connect(ws);
  c.proc = proc;
  const close = c.close;
  c.close = async () => { close(); await sleep(400); fs.rmSync(base, { recursive: true, force: true }); };
  return c;
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    let id = 0;
    const pend = new Map(), ls = [];
    const c = {
      send(method, params = {}, sessionId) {
        const m = { id: ++id, method, params };
        if (sessionId) m.sessionId = sessionId;
        ws.send(JSON.stringify(m));
        return new Promise((res, rej) => {
          pend.set(m.id, { res, rej, method });
          setTimeout(() => { if (pend.has(m.id)) { pend.delete(m.id); rej(new Error('timeout ' + method)); } }, 200000);
        });
      },
      on(fn) { ls.push(fn); return () => { const i = ls.indexOf(fn); if (i >= 0) ls.splice(i, 1); }; },
      close() { try { ws.close(); } catch (e) { /* closed */ } if (c.proc) try { c.proc.kill('SIGKILL'); } catch (e) { /* gone */ } }
    };
    ws.onopen = () => resolve(c);
    ws.onerror = e => reject(e);
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); if (m.error) p.rej(new Error(p.method + ': ' + m.error.message)); else p.res(m.result); }
      else if (m.method) for (const f of ls.slice()) f(m);
    };
  });
}
module.exports = { launch, connect, sleep, CH };
