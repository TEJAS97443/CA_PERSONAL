#!/usr/bin/env node
/* PassBook PDFs: build the print HTML of one PDF from the lessons (normally run by tools/pdf/make_pdfs.py).
   Usage: node tools/pdf/build_html.js <paper: cma|aud|fm|sm> <kind: notes|full|cards> <size: phone|a4> <out.html> [pages.json]
   pages.json = {"<lesson or chapter id>": <page>} from the previous print (make_pdfs.py reads the PDF outline); without it the contents
   page shows "00" in every number slot, so the second build lays out exactly as the first.
   The lessons are rendered by the app's own renderer (app/js/core/md.js, KaTeX, app/js/viz/diagram.js) with the app's stylesheets plus
   tools/pdf/print.css; tools/pdf/fit.js is inlined to fit wide tables, formulas and figures to the page before Chrome prints.
   Prints a JSON summary on stdout (lessons, cards, the outline order make_pdfs.py maps page numbers by). */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const R = p => path.join(ROOT, p);
globalThis.GA = {};
globalThis.katex = require(R('vendor/katex/katex.min.js'));
const md = require(R('app/js/core/md.js'));
require(R('app/js/viz/diagram.js'));
require(R('app/js/core/icons.js'));
const esc = md.esc;

/* ------------------------------------------------------------------ syllabus and lessons */
function syllabus() {
  const papers = [];
  let P = null, C = null;
  for (const raw of fs.readFileSync(R('content/syllabus/syllabus.txt'), 'utf8').split('\n')) {
    const line = raw.trimEnd();
    if (!line.trim() || (line.trimStart().startsWith('#') && !line.startsWith('##'))) continue;
    if (line.startsWith('@subject')) {
      const parts = line.slice(8).split('|').map(s => s.trim());
      const kv = {}; parts.slice(2).forEach(p => { const i = p.indexOf('='); if (i > 0) kv[p.slice(0, i)] = p.slice(i + 1); });
      P = { id: parts[0], name: parts[1], paper: kv.paper || parts[0].toUpperCase(), short: kv.short || '', marks: +kv.marks || 0, chapters: [] };
      papers.push(P);
    } else if (line.startsWith('## ') && P) {
      const parts = line.slice(3).split('|').map(s => s.trim());
      C = { id: parts[0], name: parts[1], lessons: [] };
      P.chapters.push(C);
    } else if (line.startsWith('- ') && C) {
      const parts = line.slice(2).split('|').map(s => s.trim());
      C.lessons.push({ id: parts[0], name: parts[1] });
    }
  }
  return papers;
}

function loadLesson(paper, id) {
  const file = R(`content/subjects/${paper}/${id}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  const meta = {};
  (fm ? fm[1] : '').split('\n').forEach(l => {
    const i = l.indexOf(':');
    if (i > 0) { let v = l.slice(i + 1).trim(); if (v.length >= 2 && v[0] === v[v.length - 1] && /["']/.test(v[0])) v = v.slice(1, -1); meta[l.slice(0, i).trim()] = v; }
  });
  const body = raw.slice(fm ? fm[0].length : 0);
  const secs = splitSections(body);
  const fc = secs.find(s => s.name === 'Flashcards');
  const cards = [];
  if (fc) {   // the build's rule (tools/buildlib/lessons.py extract_cards)
    const re = /^Q::\s*([\s\S]+?)\n+A::\s*([\s\S]+?)(?=\n\s*\n|\nQ::|$(?![\s\S]))/gm;
    let m; while ((m = re.exec(fc.md))) cards.push({ q: m[1].trim(), a: m[2].trim() });
  }
  return { id, meta, title: meta.title || id, summary: meta.summary || '', labs: (meta.labs || '').split(',').map(s => s.trim()).filter(Boolean),
    secs: secs.filter(s => s.name && s.name !== 'Flashcards'), cards };
}

/** the body split at its top-level "## " headings (an H2 inside a code fence or a ::: block never splits; md.js sections() rule) */
function splitSections(src) {
  const OPEN = /^(:{3,})\s*([a-z][a-z0-9-]*)?\s*(.*)$/;
  const out = [];
  let cur = { name: '', lines: [] }, fence = null, box = 0;
  for (const l of src.replace(/\r\n?/g, '\n').split('\n')) {
    const t = l.trim();
    if (fence) { if (t.startsWith(fence)) fence = null; cur.lines.push(l); continue; }
    if (box) { if (new RegExp('^:{' + box + '}\\s*$').test(t)) box = 0; cur.lines.push(l); continue; }
    const f = /^(`{3,}|~{3,})/.exec(t);
    if (f) { fence = f[1]; cur.lines.push(l); continue; }
    const c = OPEN.exec(t);
    if (c && c[1].length >= 3 && c[2]) { box = c[1].length; cur.lines.push(l); continue; }
    const h = /^##\s+(\S.*?)\s*$/.exec(t);
    if (h && !t.startsWith('###')) { out.push(cur); cur = { name: h[1], lines: [] }; continue; }
    cur.lines.push(l);
  }
  out.push(cur);
  return out.map(s => ({ name: s.name, md: s.lines.join('\n').trim() })).filter(s => s.name || s.md);
}

/** top-level `::: kind title` containers of a markdown string: [{kind, title, inner, start, end}] */
function containers(src, kind) {
  const out = [], re = new RegExp('^(:{3,})\\s*' + kind + '\\b[ \\t]*(.*)\\n([\\s\\S]*?)^\\1\\s*$', 'gm');
  let m; while ((m = re.exec(src))) out.push({ title: m[2].trim(), inner: m[3], start: m.index, end: m.index + m[0].length });
  return out;
}

/* ------------------------------------------------------------------ rendering one lesson's markdown for print */
const LAB = (title) => `<p class="lab-note"><span>Interactive version:</span> PassBook app, lesson ${esc(title)}</p>`;

function makeCtx(paperIds) { return { inDoc: new Set(paperIds) }; }

/** markdown -> print HTML: inner headings become plain styled lines (the PDF outline is chapters > lessons [> sections]), answers open,
    labs a one-line note, quizzes the print quiz (answers collected for the key), cross references jump inside this PDF or are plain text */
function renderMd(src, L, ctx, quizzes) {
  let s = src;
  // quizzes out first (their markdown is parsed by md.parseQuiz), then labs; both stand on their own paragraph
  const qs = [];
  s = s.replace(/^(:{3,})\s*quiz\b[ \t]*(.*)\n([\s\S]*?)^\1\s*$/gm, (m, c, title, inner) => { qs.push({ title: title.trim(), items: md.parseQuiz(inner) }); return `\n\n@@QUIZ${qs.length - 1}@@\n\n`; });
  s = s.replace(/^(:{3,})\s*lab\b[^\n]*\n[\s\S]*?^\1\s*$/gm, '\n\n@@LAB@@\n\n');
  s = s.replace(/^(:{3,})\s*pyq\b[^\n]*\n[\s\S]*?^\1\s*$/gm, '');
  let h = md.block(s, { lessonId: L.id });
  h = post(h, L, ctx);
  h = h.replace(/<p>@@LAB@@<\/p>(\s*<p>@@LAB@@<\/p>)*/g, LAB(L.title));
  h = h.replace(/<p>@@QUIZ(\d+)@@<\/p>/g, (m, i) => {
    const q = qs[+i], base = quizzes.reduce((n, x) => n + x.items.length, 0);
    quizzes.push(q);
    return printQuiz(q, base, L, ctx);
  });
  return h;
}

function post(h, L, ctx) {
  // headings inside a lesson: styled lines, not headings (keeps the outline to the levels the PDF wants)
  h = h.replace(/<h([1-4]) id="[^"]*"(?: data-sec="[^"]*")?>([\s\S]*?)<\/h\1>/g, (m, n, t) => `<div class="hx hx${n}">${t}</div>`);
  // answers and solutions open, labelled as what they are
  h = h.replace(/<details class="rev rev-(answer|solution|details)"><summary>([\s\S]*?)<\/summary>/g, (m, k, label) => {
    let t = label.replace(/^\s*show\s+/i, '');
    t = t.charAt(0).toUpperCase() + t.slice(1);
    return `<details open class="rev rev-${k}"><summary>${t}</summary>`;
  });
  // cross references: inside this PDF they jump, elsewhere they are plain text
  h = h.replace(/<a class="xref" href="#\/l\/([^"]+)" data-ref="[^"]*">([\s\S]*?)<\/a>/g, (m, id, label) =>
    ctx.inDoc.has(id) ? `<a class="xref" href="#L-${esc(id)}">${label}</a>` : `<span class="xref-x">${label}</span>`);
  h = h.replace(/<a class="xref x[ql]" href="#\/[^"]*">([\s\S]*?)<\/a>/g, '<span class="xref-x">$1</span>');
  // the screen-reader copy of each drawing is not needed on paper
  h = h.replace(/<div class="sr dg-sr">[\s\S]*?<\/div>(?=<figcaption|<\/figure>)/g, '');
  return h;
}

const OPT = 'ABCDEFGH';
function printQuiz(q, base, L, ctx) {
  const items = q.items.map((it, k) => {
    const n = base + k + 1, multi = it.opts.filter(x => x.ok).length > 1;
    const stem = post(md.inline(it.stem, { lessonId: L.id, br: true }), L, ctx);
    const opts = it.opts.length
      ? `<ol class="pq-o">${it.opts.map((x, j) => `<li><span class="pq-k">${OPT[j]}</span><span>${post(md.inline(x.t, { lessonId: L.id }), L, ctx)}</span></li>`).join('')}</ol>${multi ? '<p class="pq-hint">More than one answer may be right.</p>' : ''}`
      : '<p class="pq-nat">Answer: <span></span></p>';
    return `<li class="pq-q"><div class="pq-s"><span class="pq-n">${n}</span><div>${stem}</div></div>${opts}</li>`;
  }).join('');
  const t = q.title && !/^\s*check yourself\s*$/i.test(q.title) ? ' · ' + md.inline(q.title) : '';
  return `<section class="pq"><div class="pq-h">Check yourself${t}</div><ol class="pq-l">${items}</ol><p class="pq-see">Answers: the answer key at the end of this lesson.</p></section>`;
}

function answerKey(quizzes, L, ctx) {
  let n = 0;
  const rows = [];
  quizzes.forEach(q => q.items.forEach(it => {
    n++;
    const ok = it.opts.map((x, j) => (x.ok ? j : -1)).filter(j => j >= 0);
    const key = it.opts.length ? ok.map(j => `<b>${OPT[j]}</b> ${post(md.inline(it.opts[j].t, { lessonId: L.id }), L, ctx)}`).join('<span class="ak-sep">; </span>')
      : `<b>${esc(String(it.ans || '').replace('..', ' to '))}</b>`;
    const exp = it.exp ? post(md.block(it.exp, { lessonId: L.id }), L, ctx) : '';
    rows.push(`<li><div class="ak-a"><span class="pq-n">${n}</span><div class="ak-k">${key}</div></div>${exp ? `<div class="ak-e">${exp}</div>` : ''}</li>`);
  }));
  return rows.length ? `<section class="akey"><div class="akey-h">Answer key · Check yourself</div><ol class="ak-l">${rows.join('')}</ol></section>` : '';
}

/* ------------------------------------------------------------------ the three kinds of PDF */
function sec(L, name) { const s = L.secs.find(x => x.name === name); return s ? s.md : null; }

function shortNotes(L, ctx) {
  const parts = [], quizzes = [];
  const plain = sec(L, 'In plain words');
  if (plain) containers(plain, 'key').forEach(k => parts.push(renderMd(`::: key ${k.title}\n${k.inner}:::`, L, ctx, quizzes)));
  const add = (name, html) => { if (html && html.trim()) parts.push(`<section class="sn-sec"><div class="sn-h">${esc(name)}</div>${html}</section>`); };
  for (const name of ['Formats and formulas', 'Answer frame']) { const m = sec(L, name); if (m) add(name, renderMd(m, L, ctx, quizzes)); }
  const mist = sec(L, 'Common mistakes');
  if (mist) {
    const items = containers(mist, 'mistake').map(x => {
      const i = x.inner.search(/\*\*Fix:?\*\*:?/);
      const fix = i >= 0 ? x.inner.slice(i) : x.inner;
      return `<li><span class="co-t">${post(md.inline(x.title, { lessonId: L.id }), L, ctx)}</span><div class="co-b">${renderMd(fix.trim(), L, ctx, quizzes)}</div></li>`;
    });
    if (items.length) add('Common mistakes', `<aside class="co co-mistake co-grp"><div class="co-h">${GA.icon('alert')}<b>Common mistakes and their fixes</b></div><ol class="co-l">${items.join('')}</ol></aside>`);
  }
  const rec = sec(L, 'Recap');
  if (rec) add('Recap', renderMd(rec, L, ctx, quizzes));
  if (L.labs.length) parts.push(LAB(L.title));
  return parts.join('\n');
}

function fullLesson(L, ctx) {
  const quizzes = [];
  const out = L.secs.filter(s => s.name !== 'Under the hood').map(s =>
    `<section class="lsec"><h3 class="sec-h">${esc(s.name)}</h3>${renderMd(s.md, L, ctx, quizzes)}</section>`);
  out.push(answerKey(quizzes, L, ctx));
  return out.join('\n');
}

function cardList(L, ctx, start) {
  return L.cards.map((c, i) => `<div class="fc"><div class="fc-q"><span class="fc-n">${start + i}</span><div>${post(md.inline(c.q, { lessonId: L.id, br: true }), L, ctx)}</div></div>` +
    `<div class="fc-a"><span class="fc-k" title="Answer">A</span><div>${post(md.block(c.a, { lessonId: L.id }), L, ctx)}</div></div></div>`).join('');
}

/* ------------------------------------------------------------------ the document */
const KIND = {
  notes: { name: 'Short Notes', what: 'For every lesson, in syllabus order: the key idea, the formats and formulas, the answer frame, the common mistakes with their fixes, and the recap.' },
  full: { name: 'Full Lessons', what: 'Every lesson as the app\'s Exam view (all sections except Under the hood), worked examples with their working shown, and the self-check with its answer key at the end of each lesson.' },
  cards: { name: 'Revision Cards', what: 'Every flashcard of every lesson, chapter by chapter: the question, then its answer. Cover the answer, say it, then check.' }
};
/** page sizes in mm and the print scale: the page is laid out at (text width / scale) CSS px, so a phone page reads like the app on a phone */
const SIZES = { phone: { w: 110, h: 196, mt: 8, mb: 11, ms: 6, scale: 0.85 }, a4: { w: 210, h: 297, mt: 14, mb: 16, ms: 16, scale: 0.8 } };
const PAPER_NO = { P4: 'Paper 4', P5: 'Paper 5', P6A: 'Paper 6A', P6B: 'Paper 6B' };

function build(paperId, kind, size, pages) {
  const P = syllabus().find(p => p.id === paperId);
  if (!P) throw new Error('unknown paper ' + paperId);
  const lessons = [];
  P.chapters.forEach((C, ci) => C.lessons.forEach((s, li) => { const L = loadLesson(paperId, s.id); if (L) { L.no = `${ci + 1}.${li + 1}`; L.chapter = C; lessons.push(L); } }));
  const byId = new Map(lessons.map(L => [L.id, L]));
  const ctx = makeCtx(lessons.map(L => L.id));
  const pg = id => (pages ? String(pages[id] != null ? pages[id] : '?') : '00');
  const outline = [];
  let body = '', nCards = 0, missing = [];
  P.chapters.forEach((C, ci) => {
    const ls = C.lessons.map(s => byId.get(s.id)).filter(Boolean);
    C.lessons.forEach(s => { if (!byId.has(s.id)) missing.push(s.id); });
    if (!ls.length) return;
    if (kind === 'cards' && !ls.some(L => L.cards.length)) return;
    outline.push({ level: 1, id: C.id, title: C.name });
    let inner = '';
    let k = 1;
    ls.forEach(L => {
      if (kind === 'cards') {
        if (!L.cards.length) return;
        outline.push({ level: 2, id: L.id, title: L.title });
        inner += `<article class="ls ls-cards" id="L-${esc(L.id)}"><h2 class="ls-h"><span class="ls-n">${L.no}</span> ${md.inline(L.title)}</h2>${cardList(L, ctx, k)}</article>`;
        k += L.cards.length; nCards += L.cards.length;
        return;
      }
      outline.push({ level: 2, id: L.id, title: L.title });
      if (kind === 'full') L.secs.filter(s => s.name !== 'Under the hood').forEach(s => outline.push({ level: 3, id: L.id + '/' + s.name, title: s.name }));
      const content = kind === 'notes' ? shortNotes(L, ctx) : fullLesson(L, ctx);
      inner += `<article class="ls ls-${kind}" id="L-${esc(L.id)}"><h2 class="ls-h"><span class="ls-n">${L.no}</span> ${md.inline(L.title)}</h2>` +
        (kind === 'full' && L.summary ? `<p class="ls-sum">${md.inline(L.summary)}</p>` : '') + `<div class="md lesson">${content}</div></article>`;
    });
    body += `<section class="ch" id="C-${esc(C.id)}"><h1 class="ch-h"><span class="ch-n">Chapter ${ci + 1}</span>${esc(C.name)}</h1>${inner}</section>`;
  });

  // contents: chapters with their lessons, page numbers from the previous print
  const toc = [];
  P.chapters.forEach((C, ci) => {
    const ls = C.lessons.map(s => byId.get(s.id)).filter(L => L && (kind !== 'cards' || L.cards.length));
    if (!ls.length) return;
    toc.push(`<li class="toc-c"><a href="#C-${esc(C.id)}"><span class="toc-t"><b>${ci + 1}</b><span>${esc(C.name)}</span></span><span class="toc-p">${pg(C.id)}</span></a>` +
      `<ol>${ls.map(L => `<li><a href="#L-${esc(L.id)}"><span class="toc-t"><b>${L.no}</b><span>${md.inline(L.title)}</span></span><span class="toc-p">${pg(L.id)}</span></a></li>`).join('')}</ol></li>`);
  });
  const K = KIND[kind], SZ = SIZES[size];
  const label = `${PAPER_NO[P.paper] || P.paper} ${P.name}`;
  const sizeName = size === 'a4' ? 'A4' : 'phone';
  const date = process.env.PDF_DATE || new Date().toISOString().slice(0, 10);
  const nLessons = lessons.length;
  const count = kind === 'cards' ? `${nCards} cards from ${lessons.filter(L => L.cards.length).length} lessons` : `${nLessons} lessons in ${P.chapters.filter(C => C.lessons.some(s => byId.has(s.id))).length} chapters`;
  const cover = `<section class="cover"><div class="cv-brand">PassBook · CA Intermediate · Group II</div><div class="cv-paper">${esc(PAPER_NO[P.paper] || P.paper)}</div>` +
    `<div class="cv-title">${esc(P.name)}</div><div class="cv-kind">${esc(K.name)}</div><p class="cv-what">${esc(K.what)}</p>` +
    `<p class="cv-meta">${esc(count)} · ${esc(sizeName)} edition · made ${esc(date)} from the PassBook lessons</p>` +
    `<p class="cv-note">The labs (step-through simulators) are not printed: open the lesson in the PassBook app for the interactive version.</p></section>`;
  const tocHtml = `<nav class="toc"><div class="toc-h">Contents</div><ol class="toc-l">${toc.join('')}</ol></nav>`;

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">${Object.keys(GA.icons).map(k => `<symbol id="i-${k}" viewBox="0 0 24 24">${GA.icons[k]}</symbol>`).join('')}</svg>`;
  const css = ['vendor/fonts/fonts.css', 'vendor/katex/katex.min.css', 'app/css/base.css', 'app/css/components.css', 'app/css/lesson.css', 'app/css/content.css', 'tools/pdf/print.css']
    .map(f => `<link rel="stylesheet" href="${'file://' + R(f)}">`).join('');
  const scripts = `<script src="file://${R('app/js/viz/diagram.js')}"></script><script>${fs.readFileSync(path.join(__dirname, 'fit.js'), 'utf8')}</script>`;
  const html = `<!doctype html><html lang="en-IN" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${esc(label)} · ${esc(K.name)}${size === 'a4' && kind === 'full' ? ' (A4)' : ''}</title>${css}${scripts}</head>` +
    `<body class="pdf pdf-${size} kind-${kind}" data-ph="${Math.floor((SZ.h - SZ.mt - SZ.mb) * 96 / 25.4 / SZ.scale)}">${sprite}${cover}${tocHtml}<main>${body}</main></body></html>`;
  return { html, outline, lessons: nLessons, cards: nCards, missing, label, kind: K.name, size: SZ };
}

if (require.main === module) {
  const [paper, kind, size, out, pagesFile] = process.argv.slice(2);
  if (!paper || !KIND[kind] || !/^(phone|a4)$/.test(size || '') || !out) {
    console.error('usage: node tools/pdf/build_html.js <cma|aud|fm|sm> <notes|full|cards> <phone|a4> <out.html> [pages.json]');
    process.exit(2);
  }
  const pages = pagesFile ? JSON.parse(fs.readFileSync(pagesFile, 'utf8')) : null;
  const r = build(paper, kind, size, pages);
  fs.writeFileSync(out, r.html);
  process.stdout.write(JSON.stringify({ out, bytes: Buffer.byteLength(r.html), lessons: r.lessons, cards: r.cards, missing: r.missing, label: r.label, kind: r.kind, size: r.size, outline: r.outline }) + '\n');
}
module.exports = { build, syllabus, loadLesson, splitSections, SIZES };
