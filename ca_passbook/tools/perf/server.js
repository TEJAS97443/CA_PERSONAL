#!/usr/bin/env node
/* PassBook — a local static server for testing the hosted copy (tools/perf; owner WP16; audit P1-58, owner decision D13).

     node tools/perf/server.js <site dir> [--port 8787] [--cert cert.pem --key key.pem] [--enc br|gzip|none]

   It serves a site build (build.py --site) the way a static host would: brotli or gzip, ETag revalidation (304), a default
   'max-age=0, must-revalidate' and the copy's own _headers rules (Netlify / Cloudflare Pages format); HTTP/2 over TLS when given a certificate
   (the measured budgets need it: tools/perf/hosted.js budget makes a throw-away one), HTTP/1.1 otherwise.
   It listens on 127.0.0.1 only and has no option to listen anywhere else: it is for this machine's browsers and the harness, never for sharing.
   Publishing is the owner's step (HOSTING.md).
   Test hooks: GET /__down?on=1 drops every other request (the host is unreachable) until /__down?on=0; GET /__log returns and clears the
   request log [[path, status, bytes, encoding]]. As a module: serve(dir, {port, cert, key, enc, warm}) → Promise of {port, url, close(), down(on), log()}. */
const http = require('http'), http2 = require('http2'), fs = require('fs'), path = require('path'), zlib = require('zlib'), crypto = require('crypto');

const HOST = '127.0.0.1';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8' };
const COMPRESS = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.svg', '.txt']);

/** the rules of a _headers file: [{re, headers: [[name, value]]}] in file order */
function parseHeaders(text) {
  const rules = [];
  let cur = null;
  for (const raw of String(text || '').split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (!/^\s/.test(raw)) { cur = { pat: raw.trim(), re: new RegExp('^' + raw.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'), headers: [] }; rules.push(cur); continue; }
    const m = /^\s+([^:]+):\s*(.*)$/.exec(raw);
    if (cur && m) cur.headers.push([m[1].trim().toLowerCase(), m[2].trim()]);
  }
  return rules;
}
/** the headers the rules give a request path (every matching rule applies; a later one wins a repeated name) */
function headersFor(rules, pathname) {
  const out = {};
  for (const r of rules) if (r.re.test(pathname)) for (const [k, v] of r.headers) out[k] = v;
  return out;
}

function serve(dir, opts = {}) {
  const ROOT = path.resolve(dir), memo = new Map(), LOG = [];
  let down = false, rules = [], rulesAt = 0;
  const loadRules = () => {
    const f = path.join(ROOT, '_headers');
    try { const st = fs.statSync(f); if (st.mtimeMs !== rulesAt) { rulesAt = st.mtimeMs; rules = parseHeaders(fs.readFileSync(f, 'utf8')); } } catch (e) { rules = []; }
    return rules;
  };
  const enc = opts.enc || 'br';
  function entry(abs) {
    const st = fs.statSync(abs), k = abs + ':' + st.mtimeMs + ':' + st.size;
    if (memo.has(k)) return memo.get(k);
    const raw = fs.readFileSync(abs), ext = path.extname(abs);
    const e = { raw, ext, mtime: st.mtime, etag: '"' + crypto.createHash('sha1').update(raw).digest('hex').slice(0, 16) + '"' };
    if (COMPRESS.has(ext)) { e.gz = zlib.gzipSync(raw, { level: 9 }); e.br = zlib.brotliCompressSync(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }); }
    memo.set(k, e);
    return e;
  }
  function handle(req, res) {
    let u;
    try { u = new URL(req.url || '/', 'http://' + HOST); } catch (e) { res.writeHead(400); res.end(); return; }
    let p;
    try { p = decodeURIComponent(u.pathname); } catch (e) { res.writeHead(400); res.end(); return; }
    if (p === '/__down') { down = u.searchParams.get('on') === '1'; res.writeHead(200, { 'content-type': 'text/plain', 'cache-control': 'no-store' }); res.end('down=' + down); return; }
    if (p === '/__log') { res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(LOG.splice(0))); return; }
    if (down) { (res.stream ? res.stream : req.socket).destroy(); return; }
    if (p.endsWith('/')) p += 'index.html';
    const abs = path.join(ROOT, p);
    if (!abs.startsWith(ROOT + path.sep) || path.basename(abs).startsWith('.') && path.basename(abs) !== '.nojekyll') { res.writeHead(404); res.end(); LOG.push([p, 404, 0]); return; }
    let e;
    try { if (!fs.statSync(abs).isFile()) throw new Error('dir'); e = entry(abs); } catch (err) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('not found'); LOG.push([p, 404, 0]); return; }
    const h = Object.assign({ 'content-type': TYPES[e.ext] || 'application/octet-stream', 'cache-control': 'public, max-age=0, must-revalidate' },
      headersFor(loadRules(), u.pathname), { etag: e.etag, 'last-modified': e.mtime.toUTCString(), vary: 'Accept-Encoding' });
    if (req.headers['if-none-match'] === e.etag) { res.writeHead(304, h); res.end(); LOG.push([p, 304, 0]); return; }
    const ae = String(req.headers['accept-encoding'] || '');
    let body = e.raw, ce = '';
    if (e.br && enc === 'br' && /\bbr\b/.test(ae)) { body = e.br; ce = 'br'; }
    else if (e.gz && enc !== 'none' && /\bgzip\b/.test(ae)) { body = e.gz; ce = 'gzip'; }
    if (ce) h['content-encoding'] = ce;
    h['content-length'] = String(body.length);
    res.writeHead(200, h);
    res.end(req.method === 'HEAD' ? undefined : body);
    LOG.push([p, 200, body.length, ce || '-']);
  }
  if (opts.warm) {                     // compress every file up front, so a timed first request never waits for brotli-11 (a real host serves it ready)
    const walk = d => { for (const n of fs.readdirSync(d)) { const f = path.join(d, n); if (fs.statSync(f).isDirectory()) walk(f); else entry(f); } };
    walk(ROOT);
  }
  const srv = opts.cert ? http2.createSecureServer({ key: fs.readFileSync(opts.key), cert: fs.readFileSync(opts.cert), allowHTTP1: true }, handle) : http.createServer(handle);
  return new Promise((resolve, reject) => {
    srv.once('error', reject);
    srv.listen(opts.port || 0, HOST, () => {
      const port = srv.address().port, url = `${opts.cert ? 'https' : 'http'}://${opts.cert ? 'localhost' : HOST}:${port}/`;
      const sockets = new Set();
      srv.on('connection', s => { sockets.add(s); s.on('close', () => sockets.delete(s)); });
      srv.on('session', s => { sockets.add(s); s.on('close', () => sockets.delete(s)); });
      resolve({ port, url, log: () => LOG.splice(0), down: on => { down = !!on; if (on) for (const s of sockets) s.destroy(); },
        close: () => new Promise(r => { for (const s of sockets) s.destroy(); srv.close(() => r()); }) });
    });
  });
}

if (require.main === module) {
  const a = process.argv.slice(2), opt = k => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : null; };
  const dir = a.find((x, i) => !x.startsWith('--') && (i === 0 || !a[i - 1].startsWith('--')));
  if (!dir || !fs.existsSync(path.join(dir, 'index.html'))) { console.error('usage: node tools/perf/server.js <site dir> [--port N] [--cert c.pem --key k.pem] [--enc br|gzip|none]'); process.exit(2); }
  serve(dir, { port: +opt('--port') || 8787, cert: opt('--cert'), key: opt('--key'), enc: opt('--enc') || 'br' })
    .then(s => console.log(`serving ${path.resolve(dir)} at ${s.url} (this machine only)`), e => { console.error(e.message); process.exit(1); });
}
module.exports = { serve, parseHeaders, headersFor };
