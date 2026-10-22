#!/usr/bin/env node
/* Render one lesson markdown file to a standalone HTML page using the real CSS (for previews / screenshots).
   Usage: node tools/render_lesson_html.js content/subjects/os/os.sched.rr.md out.html [dark] */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
globalThis.GA = {};
globalThis.katex = require(path.join(root, 'vendor/katex/katex.min.js'));
const md = require(path.join(root, 'app/js/core/md.js'));
require(path.join(root, 'app/js/viz/diagram.js'));
const [src, out, theme] = process.argv.slice(2);
const raw = fs.readFileSync(src, 'utf8');
const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
const meta = {}; (fm ? fm[1] : '').split('\n').forEach(l => { const i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^## Flashcards[\s\S]*$/m, '');
const html = md.render(body, { sections: true, lessonId: meta.id || 'preview' });
const css = ['vendor/fonts/fonts.css', 'vendor/katex/katex.min.css', 'app/css/base.css', 'app/css/components.css', 'app/css/lesson.css'].map(f => `<link rel="stylesheet" href="file://${path.join(root, f)}">`).join('');
fs.writeFileSync(out, `<!doctype html><html data-theme="${theme === 'dark' ? 'dark' : 'light'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${css}<style>body{background:var(--bg)} .pg{max-width:760px;margin:0 auto;padding:28px 24px 60px} h1.t{font-size:34px;margin:0 0 6px;letter-spacing:-.03em} .sum{font:400 18px/1.5 var(--font-read);color:var(--ink-2);margin:0 0 18px}</style></head><body><div class="pg"><h1 class="t">${md.esc(meta.title || '')}</h1><p class="sum">${md.esc(meta.summary || '')}</p><div class="md lesson" data-depth="3">${html.replace(/<details class="rev/g, '<details open class="rev')}</div></div></body></html>`);
