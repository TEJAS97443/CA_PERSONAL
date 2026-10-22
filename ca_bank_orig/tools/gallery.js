#!/usr/bin/env node
/* Build docs/diagram-gallery.html from docs/diagram-examples.json — the visual reference for lesson authors, rendered with the real CSS. */
const fs = require('fs'), path = require('path');
globalThis.GA = {};
require('../app/js/core/md.js'); const D = require('../app/js/viz/diagram.js');
const ex = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'docs', 'diagram-examples.json'), 'utf8'));
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const body = ex.map(e => `<section class="gx"><h3>${esc(e.name)}</h3><p class="muted">${esc(e.note)}</p><figure class="dg">${D.render(e.spec)}${e.spec.caption ? `<figcaption>${esc(e.spec.caption)}</figcaption>` : ''}</figure><details><summary>JSON</summary><pre>${esc(JSON.stringify(e.spec, null, 1))}</pre></details></section>`).join('\n');
fs.writeFileSync(path.join(__dirname, '..', 'docs', 'diagram-gallery.html'), `<!doctype html><meta charset="utf-8"><title>Diagram gallery</title><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="../vendor/fonts/fonts.css"><link rel="stylesheet" href="../app/css/base.css"><link rel="stylesheet" href="../app/css/components.css"><link rel="stylesheet" href="../app/css/lesson.css">
<style>body{padding:28px;max-width:860px;margin:auto} .gx{margin:0 0 34px} h1{margin-bottom:18px} pre{background:var(--surface-3);padding:12px;border-radius:10px;overflow:auto;font-size:12px}</style>
<script>(function(){var t=new URLSearchParams(location.search).get('theme');if(t)document.documentElement.setAttribute('data-theme',t)})()</script>
<h1>Diagram gallery</h1><p class="muted">Every lesson diagram is a JSON spec inside <code>::: diagram</code>. See docs/CONTENT_GUIDE.md.</p>${body}`);
console.log('docs/diagram-gallery.html written (' + ex.length + ' diagrams)');
