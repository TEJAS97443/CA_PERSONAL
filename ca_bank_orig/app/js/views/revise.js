/* PassBook — /rev and /rev/:subject: the formula sheets, one revision sheet per subject (owner: WP15, wave 2; audit P1-53, owner decision D12a).
   Named 'Formula sheets' everywhere, as the Me menu's row (WP16) says (one name per destination, P2-12).
   /rev/:subject is compiled at runtime, in the subject's one learning order (I.order), from the lessons themselves (GA.data.lesson): each lesson's
   title, 'asked N times' (I.lessonInfo), its key idea box, its formula boxes and its Recap bullets. Behind three toggles: the rest of the lesson's
   'Formulas and facts' section (its tables, definitions and figures), its GATE tricks (with the 'What GATE asks' box of that section) and its
   common mistakes. A 'Last 30 days' filter keeps the lessons of the last30 route (the default for a learner on that route). Calm reading style,
   print rules in app/css/revise.css (Print or save as PDF prints what is shown). /rev lists the 14 sheets; its one coral opens the sheet of the
   shared next step's subject. The sheet's one coral is the end card's 'Practise <Subject> PYQs' (D18), like the lesson footer's.
   Routes ['/rev', 'revise'] and ['/rev/:subject', 'revise'] and FILE.revise = 'revise' are WP16's (shell.js); until they exist nothing reaches
   this file. Contract: docs/ARCHITECTURE.md §10.12. GA.reviseLib holds the pure helpers (tests/revise.test.js). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  GA.views = GA.views || {};

  /* ============================================================ pure helpers (Node-testable) */
  /* the sections the sheet reads, by role (content/sections.json -> D.sections: role.facts 'formats-and-formulas', role.tricks 'exam-angle',
     role.recap 'recap'); the engine's older names stay accepted so an older lesson still compiles */
  const SEC_DEF = { facts: 'Formats and formulas', tricks: 'Exam angle', recap: 'Recap' };
  const SEC_OLD = { facts: ['formulas and facts'], tricks: ['gate tricks'], recap: [] };
  function secNames(role) {
    const S = GA.data && GA.data.D && GA.data.D.sections, sl = S && S.role && S.role[role];
    const name = (sl && S.names && S.names[sl]) || SEC_DEF[role];
    return new Set([String(name).toLowerCase()].concat(SEC_OLD[role] || []));
  }
  const OPEN = /^(:{3,})\s*([a-z][a-z0-9-]*)?\s*(.*)$/i;               // md.js's container opener
  /** md.js's rule: a ::: box closes at the first later line made of exactly as many colons */
  function closes(lines, i, n) {
    const re = new RegExp('^:{' + n + '}\\s*$');
    for (let j = i + 1; j < lines.length; j++) if (re.test(lines[j].trim())) return j;
    return -1;
  }
  /** top-level list items of a markdown fragment (code fences skipped): the Recap's points */
  function countBullets(md) {
    let n = 0, fence = false;
    for (const l of String(md || '').split('\n')) {
      if (/^\s*(```|~~~)/.test(l)) { fence = !fence; continue; }
      if (!fence && /^([*+-]|\d+[.)])\s+\S/.test(l)) n++;
    }
    return n;
  }
  /** one lesson's revision parts, in document order, cut with md.js's own rules (a fence or a ::: box never splits; an H2 is '## ' outside both):
      { key: [src], items: [{kind: 'formula' | 'fact', src, title}], recap: md, bullets, tricks: [{title, inner}], exam: [src], mistakes: [{title, inner}] }
      items = every formula box of the lesson plus the rest of its 'Formulas and facts' section (prose, tables, definitions, figures; never a lab,
      quiz or PYQ embed) as 'fact' chunks, so formulas alone and formulas with their facts both keep the lesson's order. */
  function extract(md) {
    const lines = String(md == null ? '' : md).replace(/\r\n?/g, '\n').split('\n');
    const out = { key: [], items: [], recap: '', bullets: 0, tricks: [], exam: [], mistakes: [] };
    const recap = [], FFS = secNames('facts'), TRS = secNames('tricks'), RCS = secNames('recap');
    const FF = '\u0001facts', TRICKS = '\u0001tricks', RECAP = '\u0001recap';   // a section's role, from its heading
    const roleOf = h => (FFS.has(h) ? FF : TRS.has(h) ? TRICKS : RCS.has(h) ? RECAP : h);
    let sec = '', fence = null, buf = [];
    const flush = () => { const s = buf.join('\n').trim(); if (s) out.items.push({ kind: 'fact', src: s, title: '' }); buf = []; };
    const keep = l => { if (sec === RECAP) recap.push(l); else if (sec === FF) buf.push(l); };
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i], t = l.trim();
      if (fence) { if (t.startsWith(fence)) fence = null; keep(l); continue; }
      const fm = /^(`{3,}|~{3,})/.exec(t);
      if (fm) { fence = fm[1]; keep(l); continue; }
      const h = /^##\s+(.+?)\s*#*$/.exec(t);
      if (h && !/^###/.test(t)) { if (sec === FF) flush(); sec = roleOf(h[1].trim().toLowerCase()); continue; }
      const m = OPEN.exec(t);
      if (m && m[2]) {
        const j = closes(lines, i, m[1].length);
        if (j > 0) {
          const kind = m[2].toLowerCase(), title = m[3].trim(), src = lines.slice(i, j + 1).join('\n'), inner = lines.slice(i + 1, j).join('\n').trim();
          if (kind === 'key') out.key.push(src);
          else if (kind === 'formula') { if (sec === FF) flush(); out.items.push({ kind: 'formula', src, title }); }
          else if (kind === 'trick') out.tricks.push({ title, inner });
          else if (kind === 'mistake') out.mistakes.push({ title, inner });
          else if (kind === 'exam' && sec === TRICKS) out.exam.push(src);
          else if (sec === FF && !/^(lab|quiz|pyq)$/.test(kind)) buf.push(src);
          else if (sec === RECAP) recap.push(src);
          i = j;
          continue;
        }
      }
      keep(l);
    }
    if (sec === FF) flush();
    out.recap = recap.join('\n').trim();
    out.bullets = countBullets(out.recap);
    return out;
  }
  /** the counts the header and the toggles print, summed over loaded lessons' parts (null = not loaded) */
  function counts(parts) {
    const c = { lessons: 0, formulas: 0, bullets: 0, tricks: 0, mistakes: 0, facts: 0 };
    (parts || []).forEach(p => {
      if (!p) return;
      c.lessons++;
      c.formulas += p.items.filter(x => x.kind === 'formula').length;
      c.bullets += p.bullets;
      c.tricks += p.tricks.length;
      c.mistakes += p.mistakes.length;
      if (p.items.some(x => x.kind === 'fact')) c.facts++;
    });
    return c;
  }
  const last30Of = I => new Set(((I && I.path && I.path('last30')) || { lessons: [] }).lessons || []);
  /** the sheet's rows: the subject's learning order (I.order, which already puts the lessons outside the 2027 syllabus text last, as one group)
      -> {subject, name, rows: [{id, n, title, topic, minutes, status, pyqs, papers, last30}], last30: count, outside: count, outsideFrom: index | -1} */
  function plan(D, I, subject) {
    const s = D && D.subjectById && Object.prototype.hasOwnProperty.call(D.subjectById, subject) ? D.subjectById[subject] : null;
    if (!s) return null;
    const l30 = last30Of(I);
    const rows = I.order(s.id).filter(id => D.lessonById[id]).map((id, i) => {
      const l = D.lessonById[id], info = I.lessonInfo ? I.lessonInfo(id) : null, tp = D.nodes && D.nodes[l.topic];
      return { id, n: i + 1, title: l.title, topic: tp ? tp.name : '', minutes: l.minutes || 0, status: l.status || 'in',
               pyqs: info ? info.pyqs || 0 : 0, papers: info ? info.papers || 0 : 0, last30: l30.has(id) };
    });
    const outside = rows.filter(r => r.status !== 'in').length, first = rows.findIndex(r => r.status !== 'in');
    // the group note says 'the last N lessons' only when they really are the last N
    const outsideFrom = outside && first === rows.length - outside ? first : -1;
    return { subject: s.id, name: s.name, rows, last30: rows.filter(r => r.last30).length, outside, outsideFrom };
  }
  /** the sheet's options from the URL query: only = 'all' | 'last30' (default 'last30' for a learner on that route, when the subject has any),
      and the three toggles. -> {only, facts, tricks, mistakes, def} (def = the default 'only', which the URL then leaves out) */
  function options(query, profile, hasLast30) {
    const q = query || {}, on = k => q[k] === '1' || q[k] === 'true';
    const def = hasLast30 && profile && profile.route === 'last30' ? 'last30' : 'all';
    let only = q.only === 'all' || q.only === 'last30' ? q.only : def;
    if (only === 'last30' && !hasLast30) only = 'all';
    return { only, facts: on('facts'), tricks: on('tricks'), mistakes: on('mistakes'), def };
  }
  /** the address of a sheet with its options (what Back and a reload come back to) */
  function hrefOf(subject, o) {
    const p = [];
    if (o && o.only && o.only !== (o.def || 'all')) p.push('only=' + o.only);
    ['facts', 'tricks', 'mistakes'].forEach(k => { if (o && o[k]) p.push(k + '=1'); });
    return '#/rev/' + encodeURIComponent(subject) + (p.length ? '?' + p.join('&') : '');
  }
  /** an anchor id for a lesson's heading: the shell's anchors accept letters, digits, '_' and '-' only (#/rev/os#rv-os-mem-tlb) */
  const anchorOf = id => 'rv-' + String(id).replace(/[^A-Za-z0-9_-]+/g, '-');

  /** /rev's subject cards: syllabus order (CS first, GA last), real counts only */
  function index(D, I, state) {
    const l30 = last30Of(I), L = (state && state.lessons) || {};
    return D.subjects.map(s => {
      const ids = I.order(s.id).filter(id => D.lessonById[id]), sub = I.subject ? I.subject(s.id) : null;
      return { id: s.id, name: s.name, lessons: ids.length, pyqs: sub ? sub.pyqs || 0 : 0, last30: ids.filter(id => l30.has(id)).length,
               done: ids.filter(id => L[id] && L[id].done).length };
    });
  }
  /** /rev's coral: the subject of the shared next lesson step (GA.stats.nextStep, kind 'lesson'), with a kicker that says why;
      with every syllabus lesson done (no step) the subject with the most marks a paper. -> {subject, kicker} */
  function pick(D, I, step) {
    if (step && step.subject && D.subjectById[step.subject]) {
      const k = step.label === 'Start here' ? 'Start here' : step.label === 'Revise' ? 'Due for a re-read' : step.rule === 'route' ? 'Next on your route' : 'Your current paper';
      return { subject: step.subject, kicker: k };
    }
    const subs = (I && I.subjects ? I.subjects : []).filter(s => D.subjectById[s.id]);
    const withL = subs.filter(s => s.lessons > 0), pool = withL.length ? withL : subs;   // a sheet with lessons first
    const top = pool.slice().sort((a, b) => (b.perPaper || 0) - (a.perPaper || 0) || D.subjects.indexOf(D.subjectById[a.id]) - D.subjects.indexOf(D.subjectById[b.id]))[0];
    const sj = top ? D.subjectById[top.id] : D.subjects[0];
    return { subject: sj.id, kicker: `${sj.paper ? sj.paper.replace(/^P/, 'Paper ') + ' · ' : ''}${nf(+sj.marks || 0)} marks` };
  }

  /* ---- HTML (strings; MD = GA.md: block() renders a markdown fragment, inline() a line) ---- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nf = n => Number(n).toLocaleString('en-IN');
  const plural = (n, w, pl) => `${nf(n)} ${n === 1 ? w : pl || w + 's'}`;
  const icon = (n, cls) => (GA.icon ? GA.icon(n, cls) : '');
  /** several boxes of one kind as one labelled box holding a numbered list (the lesson page's grouping, P2-17); one box stays a box */
  function groupHtml(kind, label, list, MD) {
    if (!list.length) return '';
    const ic = kind === 'trick' ? 'bolt' : 'alert';
    if (list.length === 1) return MD.block(`::: ${kind} ${list[0].title}\n${list[0].inner}\n:::`);
    return `<aside class="co co-${kind} co-grp" aria-label="${esc(label)}"><div class="co-h">${icon(ic)}<b>${esc(label)}</b></div><ol class="co-l">${list.map(x =>
      `<li>${x.title ? `<span class="co-t">${MD.inline(x.title)}</span>` : ''}<div class="co-b">${MD.block(x.inner)}</div></li>`).join('')}</ol></aside>`;
  }
  /** one part of a lesson that sits behind a toggle: 'facts' (item k), 'tricks' or 'mistakes' */
  function partHtml(p, which, MD, k) {
    if (!p) return '';
    if (which === 'fact') { const it = p.items[k]; return it && it.kind === 'fact' ? MD.block(it.src) : ''; }
    if (which === 'tricks') {
      const g = groupHtml('trick', plural(p.tricks.length, 'trick'), p.tricks, MD) + p.exam.map(s => MD.block(s)).join('');
      return g;
    }
    if (which === 'mistakes') return groupHtml('mistake', plural(p.mistakes.length, 'common mistake'), p.mistakes, MD);
    return '';
  }
  /** a lesson's body on the sheet: key idea, formula boxes (the section's facts as placeholders, filled when shown), the Recap, then the
      tricks and mistakes slots. o = the sheet's options: parts already switched on are rendered at once */
  function bodyHtml(p, MD, o) {
    o = o || {};
    if (!p) return '';
    const items = p.items.map((it, k) => (it.kind === 'formula' ? MD.block(it.src)
      : `<div class="rv-fact" data-fact="${k}"${o.facts ? ' data-done="1"' : ''}>${o.facts ? MD.block(it.src) : ''}</div>`)).join('');
    const recap = p.recap ? `<section class="rv-rc"><h3 class="rv-h">Recap</h3>${MD.block(p.recap)}</section>` : '';
    const slot = w => (p[w].length || (w === 'tricks' && p.exam.length) ? `<div class="rv-x rv-x-${w}" data-x="${w}"${o[w] ? ' data-done="1"' : ''}>${o[w] ? partHtml(p, w, MD) : ''}</div>` : '');
    return p.key.map(s => MD.block(s)).join('') + items + recap + slot('tricks') + slot('mistakes');
  }
  /** the meta line under a lesson's title: topic · asked N times (a link to its questions) · minutes · status · understood */
  function metaHtml(r, done, str, bank) {
    const L = (str && str.legacy) || 'not in the current syllabus';
    /* 'Asked N times' only once the ICAI bank exists (bank: false = the question bank is empty, so nothing is said about it) */
    const asked = r.pyqs ? `<span><a href="#/pyq?sub=${encodeURIComponent(r.id)}">Asked ${plural(r.pyqs, 'time')}</a> in ${plural(r.papers, 'paper')}</span>` : bank === false ? '' : '<span>Not asked in an ICAI paper yet</span>';
    const flag = r.status === 'legacy' ? `<span class="rv-flag">${esc(L)}</span>` : r.status === 'extra' ? '<span class="rv-flag">not named in the syllabus</span>' : '';
    return `<p class="rv-meta">${r.topic ? `<span>${esc(r.topic)}</span>` : ''}${asked}<span>${nf(r.minutes)} min</span>${flag}${done ? `<span class="rv-ok">${icon('check')}Understood</span>` : ''}</p>`;
  }
  /** a lesson's article; the body is filled once the lesson file is in */
  function articleHtml(r, done, str, bank) {
    const a = anchorOf(r.id);
    return `<article class="rv-l" data-i="${r.n - 1}" data-l30="${r.last30 ? 1 : 0}" aria-labelledby="${a}">
      <header class="rv-lh"><h2 id="${a}"><span class="rv-n" aria-hidden="true">${r.n}</span><a href="#/l/${encodeURIComponent(r.id)}">${esc(r.title)}</a></h2>${metaHtml(r, done, str, bank)}</header>
      <div class="rv-c md" aria-busy="true"><span class="sk rv-sk"></span><span class="sk rv-sk"></span></div></article>`;
  }
  /** the contents list (the desktop rail and the phone sheet share it) */
  function tocHtml(P) {
    return `<ol class="rv-tl">${P.rows.map(r => `<li data-l30="${r.last30 ? 1 : 0}"><a href="#/rev/${encodeURIComponent(P.subject)}#${anchorOf(r.id)}" data-go="${anchorOf(r.id)}"><span class="rv-n">${r.n}</span><span>${esc(r.title)}</span></a></li>`).join('')}</ol>`;
  }

  const Lib = { extract, countBullets, counts, plan, options, hrefOf, anchorOf, index, pick, groupHtml, partHtml, bodyHtml, metaHtml, articleHtml, tocHtml };
  GA.reviseLib = Lib;

  /* ============================================================ the view */
  const PRINT = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/></svg>';
  let gen = 0, live = [];
  const track = f => live.push(f);
  const tick = () => new Promise(r => setTimeout(r, 0));
  const now = () => (g.performance && g.performance.now ? g.performance.now() : Date.now());

  /** /rev: one sheet per paper */
  function renderIndex(ctx, out) {
    const U = GA.util, D = GA.data.D, I = GA.insights.get(), st = (GA.store && GA.store.state) || {};
    if (GA.shell && GA.shell.crumbs) GA.shell.crumbs([['Learn', '#/syllabus'], ['Formula sheets', '#/rev']]);
    const S = GA.stats, step = S && S.nextStep ? (() => { try { return S.nextStep(st, D, { kind: 'lesson', I }); } catch (e) { return null; } })() : null;
    const P = pick(D, I, step), ps = D.subjectById[P.subject];
    const rows = index(D, I, st), glyph = id => (GA.subjIcon ? GA.subjIcon(id) : icon('book'));
    const total = U.sum(rows.map(r => r.lessons));
    const card = r => `<a class="hb-card tight rv-sc" href="#/rev/${encodeURIComponent(r.id)}"><span class="hb-ic">${glyph(r.id)}</span><span class="rv-sc-t"><b>${esc(r.name)}</b>
      <small>${plural(r.lessons, 'lesson')}${r.pyqs ? ` · asked ${plural(r.pyqs, 'time')}` : ''}</small>${r.last30 ? `<small>Last 30 days: ${plural(r.last30, 'lesson')}</small>` : ''}${r.done ? `<small class="rv-sc-ok">${icon('check')}${nf(r.done)} of ${nf(r.lessons)} understood</small>` : ''}</span>${icon('chev-r')}</a>`;
    out.innerHTML = `<div class="hb rv-ix">
      <header class="hb-head"><div class="hb-head-t"><h1>Formula sheets</h1>
        <p class="hb-sub">One page per paper, compiled from the lessons in learning order: each lesson's key idea, formula boxes and recap, with its formats, exam angle and common mistakes a tap away. <b>${nf(total)}</b> ${total === 1 ? 'lesson' : 'lessons'} in <b>${nf(rows.length)}</b> papers so far; print any sheet or save it as a PDF.</p></div>
        <div class="hb-acts"><a class="btn pop hb-go" href="#/rev/${encodeURIComponent(ps.id)}"><span><small>${esc(P.kicker)}</small>${esc(ps.name)} sheet</span>${icon('arrow-r')}</a></div></header>
      <div class="hb-grid rv-subs">${rows.map(card).join('')}</div>
    </div>`;
  }

  /** /rev/:subject */
  async function renderSheet(ctx, out, id) {
    const U = GA.util, D = GA.data.D, I = GA.insights.get(), MD = GA.md, st = (GA.store && GA.store.state) || {};
    const P = plan(D, I, id);
    if (!P) {
      if (GA.shell && GA.shell.notFound) GA.shell.notFound({ kind: 'subject', id, back: { href: '#/rev', label: 'All formula sheets' } });
      return;
    }
    const s = D.subjectById[P.subject], my = ++gen, stale = () => my !== gen || !!(ctx.stale && ctx.stale());
    if (GA.shell && GA.shell.crumbs) GA.shell.crumbs([['Learn', '#/syllabus'], ['Formula sheets', '#/rev'], [s.name, '#/rev/' + s.id]]);
    if (typeof document !== 'undefined') document.title = s.name + ' formula sheet · PassBook';
    if (!P.rows.length) {                                  // no lesson of this paper written yet: an honest empty sheet, one coral back
      out.innerHTML = `<div class="hb rv-ix">${GA.ui && GA.ui.empty ? GA.ui.empty('sigma', `No ${esc(s.name)} lesson yet`, 'The sheet is compiled from the lessons; it fills in as they are written.', `<a class="btn pop" href="#/s/${esc(s.id)}">${icon('book')}<span>Open ${esc(s.name)}</span></a>`, { peak: { gaze: 'down' } }) : ''}</div>`;
      return;
    }
    const o = options(ctx.query, st.profile, P.last30 > 0);
    const L = st.lessons || {}, str = GA.ui && GA.ui.str, sub = I.subject ? I.subject(s.id) : null;
    const glyph = GA.subjIcon ? GA.subjIcon(s.id) : icon('book');
    const asked = sub && sub.pyqs ? ` Past papers asked ${esc(s.name)} <b>${nf(sub.pyqs)}</b> times, in <b>${nf(sub.papersAsked || 0)}</b> of ${nf(sub.papers || 0)} papers.` : '';
    const seg = P.last30 ? `<div class="seg rv-only" role="group" aria-label="Show"><button type="button" data-only="all" aria-pressed="${o.only === 'all'}" class="${o.only === 'all' ? 'on' : ''}">All lessons <em>${nf(P.rows.length)}</em></button><button type="button" data-only="last30" aria-pressed="${o.only === 'last30'}" class="${o.only === 'last30' ? 'on' : ''}">Last 30 days <em>${nf(P.last30)}</em></button></div>` : '';
    const lp = I.path ? I.path('last30') : null, span = lp && lp.from ? (lp.to && lp.to !== lp.from ? `${lp.from}–${lp.to}` : String(lp.from)) : '';
    const l30Line = `Last 30 days keeps the ${plural(P.last30, 'lesson')} of that route in ${esc(s.name)}: the most marks per minute${span ? ` in the ICAI questions of ${span}` : ''}, prerequisites included.`;
    const tg = (k, label) => `<button type="button" class="rv-tg" data-x="${k}" aria-pressed="${!!o[k]}"><span class="rv-box" aria-hidden="true">${icon('check')}</span><span>${label}</span><em data-n="${k}"></em></button>`;
    const outsideNote = P.outsideFrom >= 0 ? `<p class="rv-out" data-l30="${P.rows.slice(P.outsideFrom).some(r => r.last30) ? 1 : 0}">${icon('info')}<span>${P.outside === 1 ? 'The last lesson is' : `The last ${nf(P.outside)} lessons are`} outside the syllabus text: earlier syllabi named ${P.outside === 1 ? 'it' : 'them'}, or past papers asked ${P.outside === 1 ? 'it' : 'them'} anyway.</span></p>` : '';
    const list = P.rows.map((r, i) => (i === P.outsideFrom ? outsideNote : '') + articleHtml(r, !!(L[r.id] && L[r.id].done), str, D.questions.length > 0)).join('');
    out.innerHTML = `<div class="rv-sheet${o.only === 'last30' ? ' rv-30' : ''}${o.facts ? ' rv-facts' : ''}${o.tricks ? ' rv-tricks' : ''}${o.mistakes ? ' rv-mistakes' : ''}" data-subject="${esc(s.id)}">
      <header class="hb-head rv-head"><div class="hb-head-t">
        <div class="hb-eb rv-eb"><span class="hb-ic sm">${glyph}</span><span>Formula sheet</span></div>
        <h1>${esc(s.name)}</h1>
        <p class="hb-sub rv-sub">${plural(P.rows.length, 'lesson')} in learning order: each one's key idea, formula boxes and recap.<span class="rv-cn" data-counts></span>${asked}</p></div></header>
      <div class="rv-bar" role="group" aria-label="Sheet options">${seg}<div class="rv-tgs" role="group" aria-label="Also show">${tg('facts', 'Tables and facts')}${tg('tricks', 'Exam angle')}${tg('mistakes', 'Common mistakes')}</div>
        <button type="button" class="btn sm ghost rv-print" data-print>${PRINT}<span>Print<span class="rv-wide"> or save as PDF</span></span></button></div>
      ${P.last30 ? `<p class="rv-l30">${icon('info')}<span>${l30Line}</span></p>` : ''}
      <div class="rv-grid">
        <div class="rv-main">
          <details class="rv-toc"><summary>${icon('list')}<span>Contents</span><em data-tocn>${plural(o.only === 'last30' ? P.last30 : P.rows.length, 'lesson')}</em></summary>${tocHtml(P)}</details>
          <div class="rv-list">${list}</div>
          <section class="rv-end" aria-labelledby="rv-end-h"><h2 id="rv-end-h">End of the ${esc(s.name)} sheet</h2>
            ${D.questions.length ? `<p>Next: ICAI questions on ${esc(s.name)}, 10 at a time, the ones you have not seen first.</p>
            <div class="hb-acts"><a class="btn pop hb-go" href="#/pyq?subject=${encodeURIComponent(s.id)}&practise=10"><span><small>10 questions</small>Practise ${esc(s.name)} questions</span>${icon('arrow-r')}</a>`
            : (sub && sub.cards ? `<p>Next: the ${esc(s.name)} flashcards, so the formulas and lists come back before the exam.</p>
            <div class="hb-acts"><a class="btn pop hb-go" href="#/flash/${encodeURIComponent(s.id)}"><span><small>${plural(sub.cards, 'card')}</small>Review ${esc(s.name)} flashcards</span>${icon('arrow-r')}</a>`
              : `<p>Next: the ${esc(s.name)} lessons themselves.</p><div class="hb-acts"><a class="btn pop hb-go" href="#/s/${esc(s.id)}"><span><small>${plural(P.rows.length, 'lesson')}</small>Open ${esc(s.name)}</span>${icon('arrow-r')}</a>`)}
              ${D.questions.length || (sub && sub.cards) ? `<a class="btn ghost" href="#/s/${esc(s.id)}">${icon('book')}<span>Open the paper's page</span></a>` : ''}</div></section>
        </div>
        <nav class="rv-rail" aria-label="Lessons on this sheet"><p class="rv-rail-h" data-tocn>${plural(o.only === 'last30' ? P.last30 : P.rows.length, 'lesson')}</p>${tocHtml(P)}</nav>
      </div></div>`;
    const root = out.firstElementChild, listEl = U.$('.rv-list', root), arts = U.$$('.rv-l', listEl);
    let parts = new Array(P.rows.length).fill(null), failed = new Set();

    /* ---- options: the filter, the three toggles, the address ---- */
    const syncUrl = () => { try { const h = hrefOf(s.id, o); if (location.hash !== h) history.replaceState(history.state, '', h); } catch (e) { /* no history API */ } };
    const setOnly = v => {
      o.only = v === 'last30' && P.last30 ? 'last30' : 'all';
      root.classList.toggle('rv-30', o.only === 'last30');
      U.$$('[data-only]', U.$('.rv-bar', root)).forEach(b => { const on = b.dataset.only === o.only; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('on', on); });
      U.$$('[data-tocn]', root).forEach(em => (em.textContent = plural(o.only === 'last30' ? P.last30 : P.rows.length, 'lesson')));
      syncUrl();
      if (GA.ui && GA.ui.say) GA.ui.say(o.only === 'last30' ? `Showing the ${plural(P.last30, 'lesson')} of the Last 30 days route` : `Showing all ${plural(P.rows.length, 'lesson')}`);
    };
    /** render what a toggle shows, for every loaded lesson, in slices (the fit pass follows through GA.fit.watch) */
    async function fill(which) {
      const sel = which === 'facts' ? '.rv-fact:not([data-done])' : `.rv-x-${which}:not([data-done])`;
      let t0 = now();
      for (const a of arts) {
        if (stale()) return;
        const p = parts[+a.dataset.i];
        if (!p) continue;
        U.$$(sel, a).forEach(el => { el.innerHTML = which === 'facts' ? partHtml(p, 'fact', MD, +el.dataset.fact) : partHtml(p, which, MD); el.dataset.done = '1'; });
        if (now() - t0 > 24) { await tick(); t0 = now(); }
      }
      if (GA.fit && GA.fit.all) GA.fit.all(listEl);
    }
    const setPart = (k, on) => {
      o[k] = !!on;
      root.classList.toggle('rv-' + k, o[k]);
      const b = U.$(`.rv-tg[data-x="${k}"]`, root); if (b) b.setAttribute('aria-pressed', String(o[k]));
      syncUrl();
      if (o[k]) fill(k);
    };
    U.on(root, 'click', '[data-only]', (e, b) => setOnly(b.dataset.only));
    U.on(root, 'click', '.rv-tg', (e, b) => setPart(b.dataset.x, b.getAttribute('aria-pressed') !== 'true'));
    U.on(root, 'click', '[data-print]', () => { if (typeof g.print === 'function') g.print(); });
    /* contents: an in-page jump below the sticky top bar (the hash route stays the sheet's) */
    U.on(root, 'click', '[data-go]', (e, a) => {
      const t = document.getElementById(a.dataset.go);
      if (!t || !root.contains(t) || !t.getClientRects().length) return;
      e.preventDefault();
      const d = a.closest('details'); if (d) d.open = false;
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.scrollIntoView({ block: 'start' });
      try { t.focus({ preventScroll: true }); } catch (x) { /* old browsers */ }
    });

    /* ---- the lessons' text: every file at once, then each body in learning order, in slices so the page stays responsive ---- */
    const load = i => GA.data.lesson(P.rows[i].id).then(rec => { parts[i] = rec && rec.md ? extract(rec.md) : null; failed.delete(i); }, () => { parts[i] = null; failed.add(i); });
    const fillOne = i => {
      const c = U.$('.rv-c', arts[i]);
      c.removeAttribute('aria-busy');
      if (failed.has(i)) { c.innerHTML = `<p class="rv-fail">${icon('alert')}<span>Could not load this lesson file. Your progress is saved.</span> <button type="button" class="btn sm" data-retry="${i}">${icon('refresh')}<span>Try again</span></button></p>`; return; }
      c.innerHTML = parts[i] ? bodyHtml(parts[i], MD, o) : '';
    };
    const paintCounts = () => {
      const c = counts(parts), el = U.$('[data-counts]', root);
      if (el) el.innerHTML = !c.lessons ? '' : c.formulas ? ` In all, <b>${nf(c.formulas)}</b> formula ${c.formulas === 1 ? 'box' : 'boxes'} and <b>${nf(c.bullets)}</b> recap points.` : ` In all, <b>${nf(c.bullets)}</b> recap points.`;
      [['tricks', c.tricks], ['mistakes', c.mistakes]].forEach(([k, n]) => { const em = U.$(`[data-n="${k}"]`, root); if (em) em.textContent = c.lessons ? nf(n) : ''; });
    };
    U.on(root, 'click', '[data-retry]', async (e, b) => {
      const i = +b.dataset.retry; b.disabled = true;
      await load(i);
      if (stale()) return;
      fillOne(i); paintCounts();
      if (GA.fit && GA.fit.all) GA.fit.all(arts[i]);
    });
    await Promise.all(P.rows.map((r, i) => load(i)));
    if (stale()) return;
    if (failed.size === P.rows.length && GA.ui && GA.ui.loadFailed) {
      // nothing arrived (offline, or a copy without data/lessons): one failure card where the sheet would be, its Try again the one coral
      const bar = U.$('.rv-bar', root); if (bar) bar.hidden = true;
      GA.ui.loadFailed(U.$('.rv-grid', root), { what: 'view', main: true });
      return;
    }
    let t0 = now();
    for (let i = 0; i < arts.length; i++) {
      fillOne(i);
      if (i === 2 && GA.fit && GA.fit.all) GA.fit.all(listEl);        // the first screenful is fitted before the rest is drawn
      if (now() - t0 > 24) { await tick(); if (stale()) return; t0 = now(); }
    }
    paintCounts();
    if (GA.fit && GA.fit.all) GA.fit.all(listEl);
    if (GA.fit && GA.fit.watch) track(GA.fit.watch(listEl));
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!stale() && GA.fit && GA.fit.all) GA.fit.all(listEl); });

    /* ---- the rail's current lesson (wide screens only; no motion, just the mark): the last heading at or above the reading line, re-read
       whenever a heading crosses it, so a jump, Back or a filter can never leave a stale mark ---- */
    const rail = U.$('.rv-rail', root);
    if (rail && typeof IntersectionObserver === 'function' && g.matchMedia && g.matchMedia('(min-width: 1180px)').matches) {
      const links = new Map(U.$$('a[data-go]', rail).map(a => [a.dataset.go, a])), heads = U.$$('.rv-lh h2[id]', listEl);
      let cur = null;
      const mark = () => {
        let best = null;
        for (const h of heads) { if (!h.getClientRects().length) continue; if (h.getBoundingClientRect().top <= 140) best = h; else if (best) break; }
        if (!best) best = heads.find(h => h.getClientRects().length) || null;
        const a = best ? links.get(best.id) : null;
        if (a === cur) return;
        if (cur) cur.removeAttribute('aria-current');
        cur = a || null;
        if (!cur) return;
        cur.setAttribute('aria-current', 'true');
        const r = cur.getBoundingClientRect(), b = rail.getBoundingClientRect();
        if (r.top < b.top + 40 || r.bottom > b.bottom - 8) rail.scrollTop += r.top - b.top - b.height / 3;
      };
      const io = new IntersectionObserver(mark, { rootMargin: '-80px 0px -60% 0px' });
      heads.forEach(h => io.observe(h));
      U.on(root, 'click', '[data-only]', () => requestAnimationFrame(mark));
      track(() => io.disconnect());
    }
  }

  GA.views.revise = {
    enter(ctx, out) {
      const p = (ctx && ctx.params) || {};
      if (p.subject == null || p.subject === '') return renderIndex(ctx, out);
      return renderSheet(ctx, out, p.subject);
    },
    leave() { gen++; live.forEach(f => { try { f(); } catch (e) { /* already gone */ } }); live = []; }
  };
  Lib.view = GA.views.revise;

  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
})(typeof window !== 'undefined' ? window : globalThis);
