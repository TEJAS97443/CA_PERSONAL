#!/usr/bin/env node
/* PassBook PDFs: the ICAI Question Bank of one paper, chapter by chapter and sub-topic by sub-topic (normally run by tools/pdf/make_qbank.py).
   Usage: node tools/pdf/qbank_html.js <paper: cma|aud|fm|sm> <size: phone|a4> <out.html> [pages.json]
   Reads the built bank (data/manifest.js + data/pyq/*.js, i.e. after build.py), never bank/items directly, so the PDF shows exactly what
   the app ships. ICAI's words are not touched: stems, options and answers go through the app's own Markdown renderer (md.js + KaTeX).
   What is PassBook's: the arrangement (the primary sub-topic tag), the merging of questions ICAI printed word for word in more than one
   document (printed once, with an "Also asked in" line), the counts and the labelled notes.
   A case scenario stays whole: its questions first, then ICAI's answers in ICAI's order (the case's working, then each item's answer).
   Order inside a sub-topic: past exam papers, then RTPs, then MTPs; newest attempt first; ICAI's order inside a document.
   Out-of-syllabus items (ICAI's flag or a topic that left the syllabus) go to an appendix at the end.
   Prints a JSON summary on stdout (the outline order make_qbank.py maps page numbers by, the counts). */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const R = p => path.join(ROOT, p);
globalThis.GA = {};
globalThis.katex = require(R('vendor/katex/katex.min.js'));
const md = require(R('app/js/core/md.js'));
require(R('app/js/core/icons.js'));
const { syllabus, SIZES } = require('./build_html.js');
const esc = md.esc;

/* ------------------------------------------------------------------ the built bank */
function loadBank() {
  let M = null;
  const recs = {};
  globalThis.GAD = { reg: (k, id, v) => { if (k === 'manifest') M = v; else if (k === 'pyq') recs[id] = v; } };
  // the data files are this project's own build output (GAD.reg(...) calls)
  new Function(fs.readFileSync(R('data/manifest.js'), 'utf8'))();
  for (const f of fs.readdirSync(R('data/pyq')).filter(f => f.endsWith('.js'))) new Function(fs.readFileSync(R('data/pyq/' + f), 'utf8'))();
  const cols = M.pyq.cols;
  const rows = M.pyq.rows.map(r => Object.fromEntries(cols.map((c, i) => [c, r[i]])));
  const byId = {};
  for (const a of Object.values(recs)) for (const x of a) byId[x.id] = x;
  const papers = Object.fromEntries(M.papers.map(p => [p.id, p]));
  return { M, rows, byId, papers };
}

const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const when = a => { const m = /^([a-z]{3})(\d{4})$/.exec(a || ''); return m ? +m[2] * 12 + (MON[m[1]] || 0) : 0; };
const KIND_RANK = { pyq: 0, rtp: 1, mtp: 2 };
const KIND_NAME = { pyq: 'Exam', rtp: 'RTP', mtp: 'MTP' };
const OPT = 'ABCD';
const norm = s => String(s || '').toLowerCase().replace(/<br>/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();

/** a document's short name for the "Also asked in" line and the card header: "Exam May 2025", "MTP Jan 2026 S-II", "Old P3 RTP Nov 2019" */
function docName(p) {
  const att = /^([a-z]{3})(\d{4})$/.exec(p.attempt || '');
  const a = att ? att[1][0].toUpperCase() + att[1].slice(1) + ' ' + att[2] : p.attempt;
  const s = p.series ? ' S-' + (p.series === 's1' ? 'I' : 'II') : '';
  return `${p.scheme === 'old' ? p.paperCode + ' ' : ''}${KIND_NAME[p.kind] || p.kind.toUpperCase()} ${a}${s}`;
}

/** an item's printed label without the document: "Q3(a)", "MCQ 4" (Paper 6 labels keep their section out: the book is one section) */
const itemLabel = x => String(x.label || ('Q' + x.no)).replace(/\s+/g, ' ').trim();

/** our notes worth a student's time: why an item is out of (or still in) the syllabus, an old law the Study Material has replaced, an irregular
    ICAI key. The rest of the bank's notes are transcription bookkeeping (ICAI's typos kept as printed, page and layout notes) and stay out. */
const NOTE_KEEP = /syllabus|study material|superseded|caro 2016|repealed|omitted|no longer|withdrawn|answer key|icai's key|icai’s key|accepts (either|both)|either (option|answer)|no option/i;
const NOTE_DROP = /check\.py|text layer|transcri|tags? by|tagged|flagged|bucketed|\bSPEC\b|mcq_answer|chapter mapped|sm-qbank|sm-import|sm-tags|sm-bank-fix|accept(ed)?:|re-joined|(q|qfile|paperfile|afile),? p\.|the figure q|alt text|\b(see|as for|as in) [qo]-?\w*\d|the key is icai's answer key|sm study material|appears only in/i;
function studentNote(note) {
  if (!note) return '';
  const keep = String(note).split(/;\s+/).map(s => s.trim()).filter(Boolean).filter(s => NOTE_KEEP.test(s) && !NOTE_DROP.test(s))
    .map(s => s.replace(/^Ours(\s*\([^)]*\))?:\s*/i, '').replace(/^(Old scheme, out of syllabus|Out of syllabus) \((old scheme, )?ours\):/i, 'Out of syllabus (old scheme):'))
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));
  return keep.length ? keep.join('; ').replace(/([^.])$/, '$1.') : '';
}

/* ------------------------------------------------------------------ units: one standalone item, or one case with its items */
function buildUnits(B, subject) {
  const units = new Map();
  const rows = B.rows.filter(r => r.subject === subject);
  for (const r of rows) {
    const x = B.byId[r.id];
    if (!x) throw new Error('no record for ' + r.id);
    const p = typeof r.paper === 'number' ? B.M.papers[r.paper] : B.papers[r.paper];
    if (!p || !r.id.startsWith(p.id + '-')) throw new Error('no paper for ' + r.id);
    const key = x.group ? x.group.id : x.id;
    if (!units.has(key)) units.set(key, { key, p, group: x.group || null, items: [] });
    units.get(key).items.push({ x, r });
  }
  const out = [...units.values()];
  for (const u of out) {
    u.items.sort((a, b) => (a.x.ord || 0) - (b.x.ord || 0));
    const live = u.items.filter(i => !(i.r.flags & 1024));
    u.oos = live.length === 0;
    // the unit's home: the sub-topic most of its in-syllabus items are tagged to (the first item's on a tie)
    const pool = live.length ? live : u.items;
    const count = new Map();
    pool.forEach(i => { const s = i.r.subtopic || i.r.topic || ''; count.set(s, (count.get(s) || 0) + 1); });
    let best = pool[0].r.subtopic || pool[0].r.topic || '', bn = 0;
    pool.forEach(i => { const s = i.r.subtopic || i.r.topic || ''; if (count.get(s) > bn) { best = s; bn = count.get(s); } });
    u.sub = best;
    u.topic = (pool.find(i => (i.r.subtopic || i.r.topic) === best) || pool[0]).r.topic || '';
    u.sort = [KIND_RANK[u.p.kind] ?? 9, -when(u.p.attempt), u.p.series || '', u.p.id, u.items[0].x.ord || 0];
    u.sig = norm(u.group && u.group.context) + '|' + u.items.map(i => norm(i.x.stem) + '/' + norm((i.x.options || []).join(' '))).join('|');
    u.hasAns = u.items.some(i => i.x.ans || i.x.answer) || !!(u.group && u.group.answer);
    u.asig = norm(u.group && u.group.answer) + '|' + u.items.map(i => norm(i.x.ans) + '/' + (i.x.key_raw || '')).join('|');
    u.marks = u.items.reduce((n, i) => n + (+i.x.marks || 0), 0);
  }
  const cmp = (a, b) => { for (let k = 0; k < a.sort.length; k++) { if (a.sort[k] < b.sort[k]) return -1; if (a.sort[k] > b.sort[k]) return 1; } return 0; };
  out.sort(cmp);
  // ICAI's repeats: the same case and items word for word AND the same answer word for word are printed once (the first in book order), the
  // rest listed under "Also asked in". A copy with no published answer yet (Sep 2026) joins the first answered copy. Where ICAI answered the
  // same question differently in two documents, both are printed, each pointing at the other ("twins"), so no ICAI answer is hidden.
  const bySig = new Map();
  for (const u of out) { if (!bySig.has(u.sig)) bySig.set(u.sig, []); bySig.get(u.sig).push(u); }
  const shown = [];
  for (const same of bySig.values()) {
    const clusters = [];
    for (const u of same.filter(v => v.hasAns)) {
      const c = clusters.find(k => k[0].asig === u.asig);
      if (c) c.push(u); else clusters.push([u]);
    }
    const unanswered = same.filter(v => !v.hasAns);
    if (clusters.length) clusters[0].push(...unanswered); else clusters.push(unanswered);
    const reps = clusters.map(c => { c.sort(cmp); const r = c.find(v => v.hasAns) || c[0]; r.also = c.filter(v => v !== r); r.oos = c.every(v => v.oos); return r; });
    reps.forEach(r => { r.twins = reps.filter(t => t !== r); shown.push(r); });
  }
  shown.sort(cmp);
  return { all: out, shown };
}

/* ------------------------------------------------------------------ rendering */
function post(h) {
  h = h.replace(/<h([1-6])( [^>]*)?>([\s\S]*?)<\/h\1>/g, (m, n, a, t) => `<div class="hx hx${Math.min(4, +n)}">${t}</div>`);
  h = h.replace(/<a class="xref[^"]*" href="[^"]*"[^>]*>([\s\S]*?)<\/a>/g, '<span class="xref-x">$1</span>');
  return h;
}
const block = s => post(md.render(String(s || ''), { br: true }));
const inl = s => post(/\n|^\s*```|^\s*\|/.test(s || '') ? md.render(s, { br: true }) : md.inline(s || '', { br: true }));
const figHtml = f => `<figure class="qb-fig"><img src="file://${R('data/figs/' + f.file)}" alt="${esc(f.alt || '')}"${f.w && f.h ? ` width="${f.w}" height="${f.h}"` : ''}></figure>`;
const figs = (x, where) => (x.figures || []).filter(f => (where === 'q' ? !/^opt:/.test(f.where || '') && f.where !== 'answer' : f.where === where)).map(figHtml).join('');

function keyText(x) {
  const k = x.key_raw;
  if (!k) return '';
  if (k === 'unpublished') return 'ICAI has not published the key yet.';
  if (k === 'none') return 'ICAI’s key gives none of the four options.';
  if (/\//.test(k)) return `ICAI accepts ${k.split('/').map(c => '(' + c + ')').join(' or ')}.`;
  return `(${k})`;
}

function noAnswerText(p) {
  if (p.answers === 'unpublished') return 'ICAI has not published its answers to this paper yet.';
  if (p.answers === 'unavailable') return 'ICAI’s answers to this paper are no longer available online.';
  return 'ICAI printed no answer for this part.';
}

const marksPill = x => (x.marks ? `<span class="qb-mk">${x.marks} mark${x.marks === 1 ? '' : 's'}</span>` : '');
const typePill = x => (x.type === 'MCQ' ? '<span class="qb-ty">MCQ</span>' : '');

function questionHtml(x, inCase) {
  const opts = x.type === 'MCQ' && (x.options || []).length
    ? `<ol class="qb-o">${x.options.map((t, i) => {
      const fg = (x.figures || []).find(f => f.where === 'opt:' + OPT[i]);
      return `<li><span class="qb-ok">${OPT[i]}</span><div>${inl(t)}${fg ? figHtml(fg) : ''}</div></li>`;
    }).join('')}</ol>` : '';
  const head = inCase ? `<div class="qb-ih"><span class="qb-il">${esc(itemLabel(x))}</span>${marksPill(x)}${x.oos ? '<span class="qb-oosp">out of syllabus</span>' : ''}</div>` : '';
  return `<div class="qb-q${inCase ? ' qb-q-in' : ''}">${head}<div class="md qb-st">${block(x.stem)}</div>${figs(x, 'q')}${opts}</div>`;
}

function answerOf(x, p, withLabel) {
  const parts = [];
  if (x.ans) parts.push(`<div class="md">${block(x.ans)}</div>`);
  else if (x.type === 'MCQ' && x.key_raw) parts.push(`<p class="qb-key">Answer key: <b>${esc(keyText(x))}</b></p>`);
  else parts.push(`<p class="qb-none">${esc(noAnswerText(p))}</p>`);
  // a past paper's MCQ whose answer is only the key table: its working is the key
  if (x.ans && x.type === 'MCQ' && x.key_raw && !new RegExp('\\(' + x.key_raw.replace('/', '|') + '\\)').test(x.ans)) parts.unshift(`<p class="qb-key">Answer key: <b>${esc(keyText(x))}</b></p>`);
  parts.push(figs(x, 'answer'));
  const note = studentNote(x.note);
  if (note) parts.push(`<p class="qb-note"><b>PassBook’s note:</b> ${esc(note)}</p>`);
  return `<div class="qb-ai">${withLabel ? `<div class="qb-al">${esc(itemLabel(x))}</div>` : ''}${parts.join('')}</div>`;
}

function srcLine(u) {
  const pg = u.items.map(i => i.x.pg || {});
  const qp = [...new Set(pg.map(g => g.cq || g.q).filter(Boolean))].join(', ');
  const ap = [...new Set(pg.map(g => g.a).filter(Boolean))].join(', ');
  return `<div class="qb-src">ICAI · ${esc(u.p.title || u.p.label)}${qp ? ` · question p. ${esc(qp)}` : ''}${ap ? ` · answer p. ${esc(ap)}` : ''}</div>`;
}

function unitHtml(u, n) {
  const p = u.p, multi = u.items.length > 1 || !!u.group;
  const first = u.items[0].x;
  const kindCls = 'k-' + p.kind;
  const what = multi ? `${u.group && u.group.label ? esc(u.group.label) : 'Case scenario'} · ${esc(u.items.length > 1 ? `${itemLabel(first)} to ${itemLabel(u.items[u.items.length - 1].x)}` : itemLabel(first))}`
    : esc(itemLabel(first));
  const marks = multi ? (u.marks ? `<span class="qb-mk">${u.marks} marks</span>` : '') : marksPill(first);
  const pills = `<span class="qb-kind ${kindCls}">${esc(KIND_NAME[p.kind])}</span><span class="qb-doc">${esc(docName(p).replace(/^(Old P\d )?(Exam|RTP|MTP) /, '$1'))}</span>` +
    `<span class="qb-lbl">${what}</span>${marks}${multi ? '' : typePill(first)}${p.scheme === 'old' ? '<span class="qb-old">old scheme</span>' : ''}`;
  const also = u.also && u.also.length
    ? `<div class="qb-also"><b>Also asked in</b> ${u.also.map(a => esc(docName(a.p) + ' ' + (a.items.length > 1 ? itemLabel(a.items[0].x) + '–' + itemLabel(a.items[a.items.length - 1].x).replace(/^(MCQ |Q)/, '') : itemLabel(a.items[0].x)))).join(' · ')}</div>` : '';
  const twins = u.twins && u.twins.length
    ? `<div class="qb-also qb-twin"><b>Same question, different ICAI answer:</b> ${u.twins.map(t => `<a href="#U${t.num}">#${t.num} ${esc(docName(t.p))}</a>`).join(' · ')}</div>` : '';
  let body = '';
  if (u.group) body += `<div class="qb-case"><div class="qb-cl">${u.group.label ? esc(u.group.label) : 'Case scenario'}</div><div class="md">${block(u.group.context)}</div></div>`;
  u.items.forEach(i => { i.x.oos = !!(i.r.flags & 1024) && !u.oos; body += questionHtml(i.x, multi); });
  let ans = '';
  if (u.group && u.group.answer) ans += `<div class="qb-ai"><div class="qb-al">ICAI’s working for this case</div><div class="md">${block(u.group.answer)}</div></div>`;
  u.items.forEach(i => { ans += answerOf(i.x, p, multi); });
  return `<article class="qb-u" id="U${n}"><div class="qb-h"><span class="qb-n">${n}</span><div class="qb-hp">${pills}</div></div>${also}${twins}${body}` +
    `<div class="qb-a"><div class="qb-at">ICAI’s answer${multi && u.items.length > 1 ? 's' : ''}</div>${ans}</div>${srcLine(u)}</article>`;
}

/* ------------------------------------------------------------------ the document */
const PAPER_NO = { P4: 'Paper 4', P5: 'Paper 5', P6A: 'Paper 6A', P6B: 'Paper 6B' };

function build(subject, size, pages) {
  const P = syllabus().find(p => p.id === subject);
  if (!P) throw new Error('unknown paper ' + subject);
  const B = loadBank();
  const { all, shown } = buildUnits(B, subject);
  const pg = id => (pages ? String(pages[id] != null ? pages[id] : '?') : '00');
  const chOf = {}, subName = {};
  P.chapters.forEach((C, ci) => { chOf[C.id] = ci; C.lessons.forEach(s => { chOf[s.id] = ci; subName[s.id] = s.name; }); });

  const live = shown.filter(u => !u.oos), oos = shown.filter(u => u.oos);
  const inSub = new Map();
  for (const u of live) {
    const home = subName[u.sub] ? u.sub : (chOf[u.sub] != null ? u.sub : '');
    if (!inSub.has(home)) inSub.set(home, []);
    inSub.get(home).push(u);
  }
  const unknown = [...inSub.keys()].filter(k => chOf[k] == null);
  if (unknown.length) throw new Error('units tagged outside the syllabus: ' + unknown.join(', '));

  // sightings per sub-topic: every document that asked it (repeats included), for the counts and the "most asked" table
  const docsOf = new Map(), examOf = new Map();
  for (const u of all) {
    if (u.oos) continue;
    const rep = shown.find(s => s === u || (s.also || []).includes(u));
    const home = rep ? rep.sub : u.sub;
    if (!docsOf.has(home)) { docsOf.set(home, new Set()); examOf.set(home, new Set()); }
    docsOf.get(home).add(u.p.id);
    if (u.p.kind === 'pyq') examOf.get(home).add(u.p.id);
  }

  const outline = [];
  let body = '', n = 0;
  const counts = { units: 0, items: 0, mcq: 0, desc: 0, merged: 0, twins: 0, oosUnits: oos.length };
  const subLine = id => {
    const us = inSub.get(id) || [];
    const d = docsOf.get(id) ? docsOf.get(id).size : 0, e = examOf.get(id) ? examOf.get(id).size : 0;
    const q = us.reduce((k, u) => k + u.items.length, 0);
    return `${q} question${q === 1 ? '' : 's'} · asked in ${d} ICAI document${d === 1 ? '' : 's'}${e ? ` · ${e} exam paper${e === 1 ? '' : 's'}` : ''}`;
  };
  const renderUnits = us => us.map(u => {
    counts.units++; counts.items += u.items.length; counts.merged += (u.also || []).length; counts.twins += (u.twins || []).length ? 1 : 0;
    u.items.forEach(i => { if (i.x.type === 'MCQ') counts.mcq++; else counts.desc++; });
    return unitHtml(u, u.num);
  }).join('');
  // the out-of-syllabus groups, by the chapter they were nearest to (or none); then every card's number, in book order, before any card is
  // drawn (a card names its twins by number, before or after it)
  const oosGroups = new Map();
  for (const u of oos) {
    const ci = chOf[u.sub] != null ? chOf[u.sub] : chOf[u.topic] != null ? chOf[u.topic] : -1;
    if (!oosGroups.has(ci)) oosGroups.set(ci, []);
    oosGroups.get(ci).push(u);
  }
  const oosOrder = [...oosGroups.keys()].sort((a, b) => (a < 0) - (b < 0) || a - b);
  P.chapters.forEach(C => [C.id, ...C.lessons.map(s => s.id)].forEach(id => (inSub.get(id) || []).forEach(u => { u.num = ++n; })));
  oosOrder.forEach(ci => oosGroups.get(ci).forEach(u => { u.num = ++n; }));

  const tocRows = [];
  P.chapters.forEach((C, ci) => {
    const subs = [...(inSub.has(C.id) ? [{ id: C.id, name: 'Across the chapter' }] : []), ...C.lessons.filter(s => inSub.has(s.id))];
    if (!subs.length) return;
    outline.push({ level: 1, id: C.id, title: C.name });
    let inner = '';
    subs.forEach((s, si) => {
      const sid = s.id === C.id ? C.id + '/all' : s.id;
      outline.push({ level: 2, id: sid, title: s.name });
      inner += `<section class="qb-sub" id="S-${esc(sid)}"><h2 class="qb-sh"><span class="ls-n">${ci + 1}.${si + 1}</span> ${md.inline(s.name)}</h2>` +
        `<p class="qb-sl">${esc(subLine(s.id))}</p>${renderUnits(inSub.get(s.id))}</section>`;
    });
    body += `<section class="ch" id="C-${esc(C.id)}"><h1 class="ch-h"><span class="ch-n">Chapter ${ci + 1}</span>${esc(C.name)}</h1>${inner}</section>`;
    tocRows.push(`<li class="toc-c"><a href="#C-${esc(C.id)}"><span class="toc-t"><b>${ci + 1}</b><span>${esc(C.name)}</span></span><span class="toc-p">${pg(C.id)}</span></a>` +
      `<ol>${subs.map((s, si) => { const sid = s.id === C.id ? C.id + '/all' : s.id; return `<li><a href="#S-${esc(sid)}"><span class="toc-t"><b>${ci + 1}.${si + 1}</b><span>${md.inline(s.name)}</span></span><span class="toc-p">${pg(sid)}</span></a></li>`; }).join('')}</ol></li>`);
  });

  // the appendix: out-of-syllabus questions, by the chapter they were nearest to (or none)
  if (oos.length) {
    const groups = oosGroups, order = oosOrder;
    outline.push({ level: 1, id: 'oos', title: 'Appendix: out of syllabus', raw: true });
    let inner = '';
    const rows = [];
    order.forEach((ci, k) => {
      const name = ci >= 0 ? `Near Chapter ${ci + 1}: ${P.chapters[ci].name}` : 'Topics no longer in the syllabus';
      const sid = 'oos/' + (ci >= 0 ? P.chapters[ci].id : 'none');
      outline.push({ level: 2, id: sid, title: name, raw: true });
      const us = groups.get(ci);
      inner += `<section class="qb-sub" id="S-${esc(sid)}"><h2 class="qb-sh"><span class="ls-n">A.${k + 1}</span> ${esc(name)}</h2>` +
        `<p class="qb-sl">${us.reduce((q, u) => q + u.items.length, 0)} questions ICAI marks out of syllabus, or whose topic has left the syllabus. For reference only.</p>${renderUnits(us)}</section>`;
      rows.push(`<li><a href="#S-${esc(sid)}"><span class="toc-t"><b>A.${k + 1}</b><span>${esc(name)}</span></span><span class="toc-p">${pg(sid)}</span></a></li>`);
    });
    body += `<section class="ch qb-oos" id="C-oos"><h1 class="ch-h"><span class="ch-n">Appendix</span>Out of syllabus</h1>` +
      `<p class="qb-intro">Old-scheme questions on topics the January 2027 syllabus no longer has, and items ICAI itself marks out of syllabus. Skip them unless you are curious.</p>${inner}</section>`;
    tocRows.push(`<li class="toc-c"><a href="#C-oos"><span class="toc-t"><b>A</b><span>Appendix: out of syllabus</span></span><span class="toc-p">${pg('oos')}</span></a><ol>${rows.join('')}</ol></li>`);
  }

  // front matter: what is inside, the most asked sub-topics, the documents by attempt
  const docs = [...new Set(all.map(u => u.p.id))].map(id => B.papers[id]);
  const label = `${PAPER_NO[P.paper] || P.paper} ${P.name}`;
  const date = process.env.PDF_DATE || new Date().toISOString().slice(0, 10);
  const nNew = docs.filter(p => p.scheme === 'new').length, nOld = docs.length - nNew;
  const span = (() => { const w = docs.map(p => when(p.attempt)).filter(Boolean); const f = v => `${Object.keys(MON)[(v - 1) % 12][0].toUpperCase()}${Object.keys(MON)[(v - 1) % 12].slice(1)} ${Math.floor((v - 1) / 12)}`; return `${f(Math.min(...w))} to ${f(Math.max(...w))}`; })();
  const sizeName = size === 'a4' ? 'A4' : 'phone';
  const cover = `<section class="cover"><div class="cv-brand">PassBook · CA Intermediate · Group II</div><div class="cv-paper">${esc(PAPER_NO[P.paper] || P.paper)}</div>` +
    `<div class="cv-title">${esc(P.name)}</div><div class="cv-kind">ICAI Question Bank</div>` +
    `<p class="cv-what">Every ICAI past-exam, RTP and MTP question for this paper, ${esc(span)}, sorted by chapter and sub-topic, each with ICAI’s own answer, word for word.</p>` +
    `<p class="cv-meta">${counts.items.toLocaleString('en-IN')} questions (${counts.mcq.toLocaleString('en-IN')} MCQs, ${counts.desc.toLocaleString('en-IN')} descriptive) from ${docs.length} ICAI documents · ${esc(sizeName)} edition · made ${esc(date)}</p>` +
    `<p class="cv-note">Questions and answers © The Institute of Chartered Accountants of India, reproduced for personal study.</p></section>`;

  const top = [...docsOf.entries()].filter(([id]) => subName[id]).sort((a, b) => b[1].size - a[1].size || (examOf.get(b[0]).size - examOf.get(a[0]).size)).slice(0, 15);
  const topRows = top.map(([id, d], k) => `<tr><td>${k + 1}</td><td>${md.inline(subName[id])}<span class="qb-tc">Ch ${chOf[id] + 1}</span></td><td>${d.size}</td><td>${examOf.get(id).size}</td></tr>`).join('');
  const atts = [...new Set(docs.map(p => p.scheme + '|' + p.attempt))].sort((a, b) => when(b.split('|')[1]) - when(a.split('|')[1]) || (a < b ? 1 : -1));
  const covRows = atts.map(k => {
    const [sch, att] = k.split('|');
    const ds = docs.filter(p => p.scheme === sch && p.attempt === att);
    const c = kd => { const xs = ds.filter(p => p.kind === kd); return xs.length ? (kd === 'mtp' ? xs.map(p => p.series === 's2' ? 'II' : 'I').sort().join(', ') : '✓' + (kd === 'pyq' && xs[0].answers !== 'published' ? '*' : '')) : '–'; };
    const p0 = ds[0];
    return `<tr><td>${esc(p0.attemptLabel || att)}${sch === 'old' ? ` <span class="qb-tc">${esc(p0.paperCode)}</span>` : ''}</td><td>${c('pyq')}</td><td>${c('rtp')}</td><td>${c('mtp')}</td></tr>`;
  }).join('');
  const front = `<section class="qb-front">
    <div class="qb-fh">How this book works</div>
    <ul class="qb-how">
      <li><b>Sorted by the syllabus.</b> Chapters and sub-topics follow the January 2027 syllabus (PassBook’s lessons). Each question sits under the sub-topic it mainly tests. That placement is PassBook’s judgement, most of all for old-scheme papers, which used different chapters.</li>
      <li><b>Order inside a sub-topic:</b> exam papers first, then RTPs, then MTPs, newest attempt first.</li>
      <li><b>Every card</b> shows where it comes from (${'<span class="qb-kind k-pyq">Exam</span> <span class="qb-kind k-rtp">RTP</span> <span class="qb-kind k-mtp">MTP</span>'}), the attempt, ICAI’s question number and marks. RTPs print no marks. <span class="qb-old">old scheme</span> marks papers from before May 2024.</li>
      <li><b>Questions ICAI repeated</b> word for word, with the same answer, are printed once. The other documents are listed under <i>Also asked in</i> (${counts.merged.toLocaleString('en-IN')} repeats). Where ICAI answered the same question differently in two documents, both are printed, and each card points to the other: <i>Same question, different ICAI answer</i>.</li>
      <li><b>A case scenario</b> stays together: the case, all its questions, then ICAI’s answers in ICAI’s order.</li>
      <li><b>ICAI’s words, unchanged.</b> Questions, options and answers are copied from ICAI’s PDFs. Each card ends with the PDF pages. Lines marked <i>PassBook’s note</i> are ours: why a question is out of syllabus, or where the Study Material now teaches a newer law (CARO 2020 for CARO 2016, say). ICAI’s own slips are kept as printed.</li>
      <li><b>Missing answers.</b> ICAI has not yet published Suggested Answers for the September 2026 exam (marked * below), and one old MTP’s answers are no longer online. Those questions appear without an answer.</li>
      <li><b>Out of syllabus</b> questions are in an appendix at the end${oos.length ? ` (${oos.reduce((q, u) => q + u.items.length, 0)})` : ''}, so they never get in the way.</li>
    </ul>
    <div class="qb-fh">Most asked sub-topics</div>
    <p class="qb-fp">How many separate ICAI documents asked about each sub-topic (repeats counted in every document that printed them). Revise the top rows first.</p>
    <div class="md"><div class="tw"><table class="qb-tt"><thead><tr><th>#</th><th>Sub-topic</th><th style="text-align:right">Documents</th><th style="text-align:right">Exams</th></tr></thead><tbody>${topRows}</tbody></table></div></div>
    <div class="qb-fh">Documents in this book</div>
    <p class="qb-fp">${nNew} new-scheme${nOld ? ` and ${nOld} old-scheme` : ''} ICAI documents. A dash means ICAI published none for that attempt, or it is not in the bank.</p>
    <div class="md"><div class="tw"><table class="qb-tt qb-cov"><thead><tr><th>Attempt</th><th>Exam</th><th>RTP</th><th>MTP</th></tr></thead><tbody>${covRows}</tbody></table></div></div>
  </section>`;
  const tocHtml = `<nav class="toc"><div class="toc-h">Contents</div><ol class="toc-l">${tocRows.join('')}</ol></nav>`;

  const SZ = SIZES[size];
  const css = ['vendor/fonts/fonts.css', 'vendor/katex/katex.min.css', 'app/css/base.css', 'app/css/components.css', 'app/css/lesson.css', 'app/css/content.css', 'tools/pdf/print.css', 'tools/pdf/qbank.css']
    .map(f => `<link rel="stylesheet" href="${'file://' + R(f)}">`).join('');
  const scripts = ['fit.js', 'qbank_fit.js'].map(f => `<script>${fs.readFileSync(path.join(__dirname, f), 'utf8')}</script>`).join('');
  const html = `<!doctype html><html lang="en-IN" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${esc(label)} · ICAI Question Bank</title>${css}${scripts}</head>` +
    `<body class="pdf pdf-${size} kind-qbank" data-ph="${Math.floor((SZ.h - SZ.mt - SZ.mb) * 96 / 25.4 / SZ.scale)}">${cover}${front}${tocHtml}<main>${body}</main></body></html>`;
  return { html, outline, label, kind: 'ICAI Question Bank', size: SZ, counts: Object.assign(counts, { docs: docs.length, shownItems: counts.items, rawItems: all.reduce((k, u) => k + u.items.length, 0) }), missing: [] };
}

if (require.main === module) {
  const [paper, size, out, pagesFile] = process.argv.slice(2);
  if (!paper || !/^(phone|a4)$/.test(size || '') || !out) {
    console.error('usage: node tools/pdf/qbank_html.js <cma|aud|fm|sm> <phone|a4> <out.html> [pages.json]');
    process.exit(2);
  }
  const pages = pagesFile ? JSON.parse(fs.readFileSync(pagesFile, 'utf8')) : null;
  const r = build(paper, size, pages);
  fs.writeFileSync(out, r.html);
  process.stdout.write(JSON.stringify({ out, bytes: Buffer.byteLength(r.html), label: r.label, kind: r.kind, size: r.size, counts: r.counts, missing: r.missing, outline: r.outline }) + '\n');
}
module.exports = { build, loadBank, buildUnits, studentNote };
