/* PassBook — lesson reader (frontend v3, FRONTEND_V3_SPEC.md §4; audit WP7, docs/ARCHITECTURE.md §10).
   A slim reading-progress bar, the header (crumb, title, summary, meta with the current depth's minutes + depth levels, 'Continue at' for
   returning readers, "Why it matters" from the question bank (dependents for foundations, a plain status line outside the syllabus), key
   ideas from the lesson's own Recap, 'Builds on' and 'Everything to learn first'), the contents (H2s with the current section's H3s: a sticky rail
   above 1000 px, a slim section bar that slides in on scroll-up and opens the same list as a sheet at 1000 px and below), one reading column
   rendered in parts (the first section at once, the rest a ### piece per task; runs of one kind of side-box become one labelled list; 'Check
   yourself' moves to the end of Worked examples; the deep-dive keeps a closed row at Standard), PYQ rows with stems, and a footer: a closing line
   at Intuition, the finish card (Mark as understood with the self-check result, the next lesson in the learning order as the screen's one .pop
   CTA, or the subject's end), Previous and where you are, then related PYQs, labs and a flip flashcard. Printing opens the folds and shows the
   check answers. GA.lessonLib holds the pure helpers (tests/lesson.test.js); GA.widgets the hydrators other views may reuse. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);
  /* the section depths and the depth switch's labels come from content/sections.json (manifest.sections, built by tools/buildlib/lessons.py);
     these defaults are the same table, for Node tests and an older manifest */
  const LEVEL = { 'in-plain-words': 1, 'recap': 1, 'under-the-hood': 3 };      // everything else is level 2
  const DEPTHS = [[1, 'Quick', 'Plain words and the recap: the short-notes view'], [2, 'Exam', 'Everything you need for full marks'], [3, 'Deep', 'The full lesson, including the finer points']];
  (function fromManifest() {
    const S = GA.data && GA.data.D && GA.data.D.sections;
    if (!S) return;
    if (S.level && typeof S.level === 'object') { Object.keys(LEVEL).forEach(k => delete LEVEL[k]); Object.assign(LEVEL, S.level); }
    if (Array.isArray(S.depths) && S.depths.length === 3) S.depths.forEach((d, i) => { DEPTHS[i] = d; });
  })();
  const NO_IDEAS = /^(practice|flashcards|recap|worked examples|exam angle|answer frame)$/i;   // sections whose first sentence is not a key idea

  /* ============================================================ pure helpers */
  /** the markdown under "## <name>" (up to the next "## " heading), or '' */
  function section(md, name) {
    const lines = String(md || '').replace(/\r\n?/g, '\n').split('\n'), out = [];
    let on = false, fence = false;
    for (const l of lines) {
      if (/^\s*(```|~~~)/.test(l)) fence = !fence;
      if (!fence && /^##\s/.test(l)) { if (on) break; on = l.replace(/^##\s+/, '').trim().toLowerCase() === String(name).toLowerCase(); continue; }
      if (on) out.push(l);
    }
    return out.join('\n').trim();
  }
  /** the H2 headings of a lesson with their markdown */
  function sections(md) {
    const res = [], lines = String(md || '').replace(/\r\n?/g, '\n').split('\n');
    let cur = null, fence = false;
    for (const l of lines) {
      if (/^\s*(```|~~~)/.test(l)) fence = !fence;
      if (!fence && /^##\s/.test(l)) { cur = { title: l.replace(/^##\s+/, '').trim(), md: [] }; res.push(cur); continue; }
      if (cur) cur.md.push(l);
    }
    return res.map(s => ({ title: s.title, md: s.md.join('\n').trim() }));
  }
  const ABBR = /(?:^|[\s(])(?:e\.g|i\.e|vs|etc|cf|approx|Fig|Eq|No|al|resp|viz|Mr|Dr|St)$/;
  /** split prose into sentences; never inside $maths$, `code`, **bold**, (brackets) or [[links]], never after "e.g." and friends */
  function sentences(s) {
    s = String(s || '').replace(/\s+/g, ' ').trim();
    const out = [];
    let start = 0, math = false, code = false, bold = false, par = 0, link = 0;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === '\\') { i++; continue; }
      if (code) { if (c === '`') code = false; continue; }
      if (c === '`') { code = true; continue; }
      if (c === '$') { math = !math; continue; }
      if (math) continue;
      if (c === '*' && s[i + 1] === '*') { bold = !bold; i++; continue; }
      if (c === '[' && s[i + 1] === '[') { link++; i++; continue; }
      if (c === ']' && s[i + 1] === ']' && link) { link--; i++; continue; }
      if (c === '(') par++; else if (c === ')' && par) par--;
      if ((c === '.' || c === '!' || c === '?') && !bold && !par && !link && s[i + 1] === ' ') {
        const next = s.slice(i + 2, i + 4);
        if (!/^(?:[A-Z0-9$*(\["'`]|\\)/.test(next)) continue;
        if (c === '.' && ABBR.test(s.slice(Math.max(0, i - 8), i))) continue;
        out.push(s.slice(start, i + 1).trim()); start = i + 2;
      }
    }
    if (start < s.length) out.push(s.slice(start).trim());
    return out.filter(Boolean);
  }
  /** roughly how many characters a markdown snippet shows (TeX source is longer than what KaTeX draws) */
  const shownLen = s => String(s || '').replace(/\$[^$]*\$/g, m => 'x'.repeat(Math.ceil(m.length / 2.5))).replace(/\*\*|`/g, '').replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1').length;
  /** one key idea: the whole bullet when short, else its first sentence (at a "; " clause when that sentence is still long) */
  function trimIdea(s, max) {
    max = max || 150;
    s = String(s || '').replace(/\s+/g, ' ').trim();
    if (shownLen(s) <= max) return s;
    const ss = sentences(s);
    let t = ss[0] || s;
    if (ss.length > 1 && shownLen(t) < 40 && shownLen(t + ' ' + ss[1]) <= max + 30) t = t + ' ' + ss[1];
    if (shownLen(t) > max + 50) {
      const cut = clauseCut(t);
      if (cut && shownLen(cut) >= 50) t = cut;
    }
    return t;
  }
  /** the text before the first "; " that is outside maths and code, ending in a full stop; null if there is none */
  function clauseCut(t) {
    let math = false, code = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (c === '\\') { i++; continue; }
      if (c === '`') code = !code; else if (!code && c === '$') math = !math;
      else if (!math && !code && c === ';' && t[i + 1] === ' ') return t.slice(0, i).trim() + '.';
    }
    return null;
  }
  /** top-level bullets of a markdown list (continuation lines joined) */
  function bullets(md) {
    const items = [];
    String(md || '').split('\n').forEach(l => {
      const m = /^[*-]\s+(.*)$/.exec(l) || /^\d+[.)]\s+(.*)$/.exec(l);
      if (m) items.push(m[1].trim());
      else if (items.length && /^\s{2,}\S/.test(l) && !/^\s+([*-]|\d+[.)])\s/.test(l)) items[items.length - 1] += ' ' + l.trim();
      else if (items.length && !l.trim()) items.push(null);
    });
    return items.filter(Boolean);
  }
  /** first prose paragraph of a section's markdown (skips containers, lists, tables, maths, code, sub-headings) */
  function firstPara(md) {
    const lines = String(md || '').split('\n'), buf = [];
    let skip = 0, fence = false;
    for (const l of lines) {
      const t = l.trim();
      if (/^(```|~~~)/.test(t)) { fence = !fence; continue; }
      if (fence) continue;
      if (/^:{3,}\s*[a-z]/i.test(t)) { skip++; continue; }
      if (/^:{3,}\s*$/.test(t)) { if (skip) skip--; continue; }
      if (skip) continue;
      if (!t) { if (buf.length) break; continue; }
      if (/^(#|[*-]\s|\d+[.)]\s|\||\$\$|>)/.test(t)) { if (buf.length) break; continue; }
      buf.push(t);
    }
    return buf.join(' ');
  }
  /** up to n key ideas (inline markdown): the first bullets of the Recap, else the first sentence of each section */
  function keyIdeas(md, n) {
    n = n || 3;
    const rec = bullets(section(md, 'Recap'));
    if (rec.length) return rec.slice(0, n).map(b => trimIdea(b));
    const recP = sentences(firstPara(section(md, 'Recap')));
    if (recP.length >= n) return recP.slice(0, n).map(b => trimIdea(b));
    return sections(md).filter(s => !NO_IDEAS.test(s.title)).map(s => sentences(firstPara(s.md))[0]).filter(Boolean).slice(0, n).map(b => trimIdea(b));
  }
  /** the facts behind "Why it matters": this sub-topic's questions, else the subject's; a lesson outside the syllabus text states its
      status with its own numbers (P2-08), never the subject's; `deps` = the lessons that build on it (I.dependents, P3-12) */
  function why(I, meta, D) {
    if (!I || !meta) return null;
    let deps = 0;
    if (typeof I.dependents === 'function') { try { deps = (I.dependents(meta.id) || []).length; } catch (e) { deps = 0; } }
    const ic = D ? icaiWhy(D, meta) : null;
    if (ic) return Object.assign(ic, { deps });
    // an ICAI bank counts its own way (above): the engine's per-paper question figures below would mix RTPs, MTPs and exam papers
    const icaiBank = !!(D && D.questions && D.questions.length && D.questions.every(q => q.icai));
    const subj = I.subject && I.subject(meta.subject), sub = I.subtopic && I.subtopic(meta.id);
    const of = subj ? subj.papers : (I.totals ? I.totals.papers : 0);
    const own = sub && sub.pyqs && !icaiBank ? { pyqs: sub.pyqs, papers: sub.papers, of, marks: sub.marks, last: sub.lastYear, first: sub.firstYear } : { pyqs: 0 };
    if (meta.status && meta.status !== 'in') return Object.assign({ scope: 'out', status: meta.status, deps }, own);
    if (sub && sub.pyqs && !icaiBank) return Object.assign({ scope: 'sub', deps }, own);
    // marks a paper = the like-for-like perPaper that Home, /syllabus and the subject hero show (P1-03); the raw average only on an older insights
    if (subj && subj.pyqs && !icaiBank) return { scope: 'subject', name: subj.name, pyqs: subj.pyqs, papers: subj.papersAsked, of: subj.papers, perPaper: subj.perPaper != null ? subj.perPaper : subj.marksPerPaper, deps };
    // CA: no question bank yet, so the facts are the paper's own (its marks and exam day) plus what builds on the lesson
    if (subj && subj.paperMarks) return { scope: 'paper', name: subj.name, paper: subj.paper, marks: subj.paperMarks, day: paperDay(meta.subject), deps };
    return deps >= 5 ? { scope: 'subject', name: '', pyqs: 0, deps } : null;
  }
  /** an ICAI bank's facts for "Why it matters" (docs/ICAI_BANK.md §5): the ICAI items tagged to this sub-topic (primary or secondary tag), how
      many exam papers, RTPs and MTPs asked it, the marks in the exam papers and the last attempt -> {scope: 'icai', ...} | null (no item yet, or
      no ICAI bank: the caller's facts stand) */
  function icaiWhy(D, meta) {
    const qs = (D.questions || []).filter(q => q.icai && (q.subtopic === meta.id || (q.tags || []).includes(meta.id)));
    if (!qs.length || !(D.questions || []).every(q => q.icai)) return null;
    const docs = U.uniq(qs.map(q => q.paper)).map(id => D.paperById[id]).filter(Boolean);
    const exams = docs.filter(p => p.kind === 'pyq'), allExams = (D.papers || []).filter(p => p.kind === 'pyq' && (p.subjects || []).includes(meta.subject));
    const last = docs.slice().sort((a, b) => b.year - a.year || b.set - a.set)[0];
    return { scope: 'icai', items: qs.length, docs: docs.length, exams: exams.length, examsOf: allExams.length, rtps: docs.filter(p => p.kind === 'rtp').length,
      mtps: docs.filter(p => p.kind === 'mtp').length, examMarks: qs.filter(q => q.kind === 'pyq' && !q.alt).reduce((a, q) => a + (q.marks || 0), 0),
      last: last ? last.attemptLabel || last.label : null, lastDoc: last ? last.label : null, status: meta.status, deps: 0 };
  }
  /** the subject's exam day from the calendar (GA.stats.paperDays), or null */
  function paperDay(subject) {
    try { const D = GA.data && GA.data.D, f = GA.stats && GA.stats.paperDays; return D && f ? f(D, D.exam, U.today(), GA.store && GA.store.state) [subject] || null : null; } catch (e) { return null; }
  }
  /** the status line of a lesson outside the syllabus text, one wording per status (shared with flagTip) */
  const OUT_LINE = { legacy: 'Not in the current ICAI syllabus (an earlier syllabus named it).', extra: 'Not named in the ICAI syllabus text.' };
  /** the sentence for why(); numbers bold, names escaped. A foundation lesson with 5 or more lessons built on it says so (P3-12): instead of
      the subject's numbers when it has no question of its own, after the sentence when it has one or two */
  function whyHtml(f) {
    if (!f) return '';
    if (f.scope === 'icai') {
      const b = x => `<b>${U.esc(x)}</b>`, nf = U.nf, pl = (n, w) => `${b(nf(n))} ${w}${n === 1 ? '' : 's'}`;
      const where = [f.exams ? `${b(f.exams + (f.examsOf ? ' of ' + f.examsOf : ''))} exam paper${(f.examsOf || f.exams) === 1 ? '' : 's'}${f.examMarks ? ` (${b(nf(f.examMarks))} marks)` : ''}` : '',
        f.rtps ? pl(f.rtps, 'RTP') : '', f.mtps ? pl(f.mtps, 'MTP') : ''].filter(Boolean);
      const list = where.length > 1 ? where.slice(0, -1).join(', ') + ' and ' + where[where.length - 1] : where[0] || '';
      return `ICAI asked it ${pl(f.items, 'time')}${f.docs === 1 ? `, in ${b(f.lastDoc)}` : `, in ${list}; last in ${b(f.last)}`}${f.docs === 1 ? '' : ''}.`;
    }
    const esc0 = x => U.esc(x);
    const b = x => `<b>${U.esc(x)}</b>`, nf = U.nf, q = n => (n === 1 ? 'past question' : 'past questions');
    const built = f.deps >= 5 ? `${b(nf(f.deps))} later lessons build on it` : '';
    const asked = () => `${b(f.papers + ' of ' + f.of)} papers, worth ${b(U.fmtMarks(f.marks))} mark${f.marks === 1 ? '' : 's'}` +
      (f.last ? `; ${f.first && f.first !== f.last && f.pyqs > 1 ? 'last asked' : 'asked'} in ${b(f.last)}` : '');
    if (f.scope === 'out') {
      return `<span class="lsn-why-k">${OUT_LINE[f.status] || OUT_LINE.extra}</span> ` +
        (f.pyqs ? `Past papers asked it ${b(nf(f.pyqs))} time${f.pyqs === 1 ? '' : 's'}, in ${asked()}.` : 'No ICAI question is tagged to it yet.');
    }
    if (f.scope === 'paper') {
      const pn = /^P(\d)([AB]?)$/.exec(f.paper || ''), name = pn ? `Paper ${pn[1]}${pn[2]}` : esc0(f.name);
      const day = f.day && U.fmtDay ? U.fmtDay(f.day, { weekday: 'short', day: 'numeric', month: 'short' }) : '';
      const of6 = pn && pn[2] ? `, half of the 100-mark Paper ${pn[1]}` : '';
      return `Part of ${b(name)} (${b(nf(f.marks))} marks${of6})${day ? `, written on ${b(day)}` : ''}.` + (built ? ` ${U.cap(built)}.` : '');
    }
    if (f.scope === 'sub') return `${b(nf(f.pyqs))} ${q(f.pyqs)} in ${asked()}.` + (built && f.pyqs <= 2 ? ` ${U.cap(built)}.` : '');
    if (built) return `${U.cap(built)}.`;
    return `Not asked on its own yet, but ${b(f.name)} has ${b(nf(f.pyqs))} ${q(f.pyqs)} in ${b(f.papers + ' of ' + f.of)} papers, ${b(String(Math.round(f.perPaper * 10) / 10))} marks a paper.`;
  }
  /** the "Related PYQs" link: this sub-topic's questions in the bank, else its topic's, else its subject's. An ICAI bank (D given, or the
      app's) counts from the bank itself, every document and every item tagged to the sub-topic as primary or secondary tag, exactly what
      the bank's filter shows (the insights count exam papers only: docs/ICAI_BANK.md §7) */
  function practiceLink(I, meta, D) {
    const s = meta.subject, t = meta.topic;
    const Dx = D || (GA.data && GA.data.D) || null;
    if (Dx && Dx.questions && Dx.questions.length && Dx.questions.every(q => q.icai)) {
      const inS = Dx.questions.filter(q => q.subject === s);
      const nSub = inS.filter(q => q.subtopic === meta.id || (q.tags || []).includes(meta.id)).length;
      if (nSub) return { href: `#/pyq?subject=${s}&sub=${meta.id}`, n: nSub, scope: 'sub', note: 'on this sub-topic' };
      const nTop = inS.filter(q => q.topic === t).length, tn = Dx.nodes && Dx.nodes[t] ? Dx.nodes[t].name : '';
      if (nTop) return { href: `#/pyq?subject=${s}&topic=${t}`, n: nTop, scope: 'topic', note: tn ? 'in ' + tn : '' };
      const sj = Dx.subjectById && Dx.subjectById[s];
      return { href: `#/pyq?subject=${s}`, n: inS.length, scope: 'subject', note: sj ? 'in ' + sj.name : '' };
    }
    const sub = I && I.subtopic ? I.subtopic(meta.id) : null, top = I && I.topic ? I.topic(t) : null, subj = I && I.subject ? I.subject(s) : null;
    if (sub && sub.pyqs) return { href: `#/pyq?subject=${s}&topic=${t}&sub=${meta.id}`, n: sub.pyqs, scope: 'sub', note: 'on this sub-topic' };
    if (top && top.pyqs) return { href: `#/pyq?subject=${s}&topic=${t}`, n: top.pyqs, scope: 'topic', note: 'in ' + top.name };
    return { href: `#/pyq?subject=${s}`, n: subj ? subj.pyqs : 0, scope: 'subject', note: subj ? 'in ' + subj.name : '' };
  }
  /** previous / next lesson in syllabus order (kept for old callers; the footer follows the learning order, see after()) */
  function neighbours(D, id) {
    const order = [];
    D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => { if (D.lessonById[n.id]) order.push(n.id); })));
    const i = order.indexOf(id);
    return i < 0 ? { prev: undefined, next: undefined } : { prev: order[i - 1], next: order[i + 1] };
  }
  /** reading progress 0..1 of a block whose rect is r, with the viewport from `top` (below the nav) to `h` */
  function progressOf(r, top, h) {
    const span = r.height - (h - top);
    if (span <= 0) return r.top <= top ? 1 : 0;
    return Math.min(1, Math.max(0, (top - r.top) / span));
  }

  /* ------------------------------------------------------------ learning order, the footer's target, the subject's end (P0-08, P1-02, P1-06, P1-08) */
  const isDone = (st, id) => !!(st && st.lessons && st.lessons[id] && st.lessons[id].done);
  /** a subject's lessons in learning order: I.order(subject) (in-subject prerequisites first; ARCHITECTURE §10.3), else syllabus order */
  function orderOf(D, I, subject) {
    let ids = null;
    if (I && typeof I.order === 'function') { try { ids = I.order(subject); } catch (e) { ids = null; } }
    if (!ids || !ids.length) { ids = []; const s = D.subjectById[subject]; if (s) s.topics.forEach(t => t.subtopics.forEach(n => ids.push(n.id))); }
    return ids.filter(x => D.lessonById[x] && D.lessonById[x].subject === subject);
  }
  /** where a lesson sits: step k of N in its subject's learning order, k of n among its topic's lessons, and its plain neighbours in that order */
  function place(D, I, id) {
    const m = D.lessonById[id];
    if (!m) return null;
    const ids = orderOf(D, I, m.subject), i = ids.indexOf(id), top = ids.filter(x => D.lessonById[x].topic === m.topic);
    return { id, subject: m.subject, topic: m.topic, ids, step: i + 1, steps: ids.length, inTopic: top.indexOf(id) + 1, ofTopic: top.length,
             prev: i > 0 ? ids[i - 1] : null, succ: i >= 0 && i + 1 < ids.length ? ids[i + 1] : null };
  }
  /** the route the footer follows (P1-06): the URL's ?path=, else the learner's chosen route (profile.route), when that route lists the lesson */
  function routeOf(I, st, id, urlPath) {
    const pid = urlPath || (st && st.profile && st.profile.route) || null;
    if (!pid || !I || typeof I.path !== 'function') return null;
    let p = null;
    try { p = I.path(String(pid)); } catch (e) { p = null; }
    return p && Array.isArray(p.lessons) && p.lessons.indexOf(id) >= 0 ? { id: p.id || String(pid), title: p.title, lessons: p.lessons, url: !!urlPath } : null;
  }
  const inSyl = m => !m.status || m.status === 'in';
  /** the footer's target, the shared next step's scope 'after:<id>' (ARCHITECTURE §10.3, GA.stats.nextStep): on the route, the route's next
      not-done lesson after this one; else (no route, or nothing unread after it on the route) the next not-done lesson after it in its subject's
      learning order, within its group (the in-syllabus lessons, or the outside-2027 group that I.order puts last); null at the subject's end
      (the footer then shows the end card). Returns {id, on: 'route' | 'subject'} or null. */
  function after(st, D, I, id, route) {
    const m = D.lessonById[id];
    if (!m) return null;
    if (route) {
      const i = route.lessons.indexOf(id);
      if (i >= 0) for (let k = i + 1; k < route.lessons.length; k++) { const x = route.lessons[k]; if (D.lessonById[x] && !isDone(st, x)) return { id: x, on: 'route' }; }
    }
    const ord = orderOf(D, I, m.subject), i = ord.indexOf(id), grp = inSyl(m);
    for (let k = i + 1; k < ord.length; k++) { const x = ord[k]; if (inSyl(D.lessonById[x]) === grp && !isDone(st, x)) return { id: x, on: 'subject' }; }
    return null;
  }
  /** the numbers on 'End of <Subject>', all from the learner's own records: lessons understood, self-checks right (of those answered; with
      I, also how many the subject's lessons hold), PYQs tried */
  function tally(st, D, sid, I) {
    const ls = D.lessons.filter(l => l.subject === sid);
    let checks = 0, right = 0;
    ls.forEach(l => { const r = st.lessons && st.lessons[l.id]; if (r && r.quiz) Object.values(r.quiz).forEach(e => { if (e && e.n) { checks++; if (e.ok) right++; } }); });
    const qs = D.questions.filter(q => q.subject === sid);
    const tried = qs.filter(q => { const e = st.q && st.q[q.id]; return !!(e && (e.n || e.seen)); }).length;
    let checksTotal = null;
    if (I && typeof I.lessonInfo === 'function') { const n = ls.map(l => { const x = I.lessonInfo(l.id); return x ? x.quiz : null; }); if (n.every(x => typeof x === 'number')) checksTotal = n.reduce((a, b) => a + b, 0); }
    return { lessons: ls.length, done: ls.filter(l => isDone(st, l.id)).length, checks, right, checksTotal, pyqs: qs.length, tried };
  }
  /** the subject after `sid` in the shared next step's ranking (CS subjects by marks a paper, never GA; ARCHITECTURE §10.3 rule d) that still has
      an in-syllabus lesson to read, with that lesson; null when every subject is finished */
  function nextSubject(st, D, I, sid) {
    const secOf = id => { const r = I && I.subject ? I.subject(id) : null; return (r && r.section) || (id === 'ga' ? 'GA' : 'CS'); };
    const rank = (I && Array.isArray(I.ranking) && I.ranking.length ? I.ranking.filter(id => D.subjectById[id] && secOf(id) === 'CS').map(id => D.subjectById[id])
      : ((I && I.subjects) || []).map((s, i) => ({ s, i, v: s.perPaper != null ? s.perPaper : (s.marksPerPaper || 0) }))
        .filter(x => (x.s.section || (x.s.id === 'ga' ? 'GA' : 'CS')) === 'CS').sort((a, b) => b.v - a.v || a.i - b.i).map(x => x.s));
    const n = rank.length, at = rank.findIndex(s => s.id === sid);
    for (let k = 1; k <= n; k++) {
      const s = rank[(at + k + n) % n];
      if (!s || s.id === sid) continue;
      const first = orderOf(D, I, s.id).find(x => D.lessonById[x].status === 'in' && !isDone(st, x));
      if (first) return { id: s.id, name: s.name, lesson: first };
    }
    return null;
  }
  /** the one-line 'Builds on' of the phone header (P1-10) */
  function needsLine(needs) {
    const n = needs.length, d = needs.filter(x => x.done).length;
    return `Builds on ${n} lesson${n === 1 ? '' : 's'}${d ? ` · ${d} done` : ''}`;
  }
  /** a lesson's transitive prerequisites in every subject, nearest first (cycle-safe), for 'Everything to learn first' (P2-11) */
  function allNeeds(D, id) {
    const seen = new Set([id]), out = [], queue = ((D.lessonById[id] || {}).needs || []).slice();
    while (queue.length) { const x = queue.shift(); if (seen.has(x) || !D.lessonById[x]) continue; seen.add(x); out.push(x); (D.lessonById[x].needs || []).forEach(y => queue.push(y)); }
    return out;
  }
  /** the content map's duration words ('45 min', '12.7 h', '11 h'), so this line and the map's panel print the same number */
  const durText = m => (m < 90 ? Math.round(m) + ' min' : String(m >= 600 ? Math.round(m / 60) : Math.round(m / 6) / 10) + ' h');
  /** the tier label (D14: the 'standard' tier reads 'Extended'; GA.ui.str.tier wins once the shell ships it) */
  const TIER = { core: 'Core', standard: 'Extended', advanced: 'Advanced' };
  const tierLabel = (t, STR) => (STR && STR.tier && STR.tier[t]) || TIER[t] || U.cap(String(t || ''));
  /** the meta row's plain status words for a lesson outside the syllabus text (P2-66: text, not a tip; one wording per status) */
  const flagLabel = (status, STR) => (status === 'legacy' ? (STR && STR.legacy ? U.cap(STR.legacy) : 'Not in the current syllabus') : 'Outside the ICAI syllabus text');

  /* ------------------------------------------------------------ depth levels: minutes from the words each level shows (P2-14) */
  /** the build's word count (tools/buildlib/lessons.py words()): code, diagrams and maths are not words */
  const readWords = md => (String(md || '').replace(/```[\s\S]*?```/g, ' ').replace(/::: *diagram[\s\S]*?\n:::/g, ' ').replace(/\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g, ' x ')
    .match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
  /** minutes at each depth in proportion to its words: {by: [Intuition, Standard, Deep], sec: {<H2 id>: minutes}}; Deep is the lesson's minutes */
  function levelMinutes(md, minutes) {
    const ps = chunks(md), w = [0, 0, 0], sec = {}, m = Math.max(0, +minutes || 0);
    const per = ps.map(p => { const n = readWords(p.md); w[(p.sec ? LEVEL[p.sec] || 2 : 1) - 1] += n; return n; });
    const total = w[0] + w[1] + w[2], at = n => (total && m ? Math.max(1, Math.round((m * n) / total)) : m);
    ps.forEach((p, i) => { if (p.sec) sec[p.sec] = at(per[i]); });
    return { by: [at(w[0]), Math.min(m, at(w[0] + w[1])), m], sec };
  }

  /* ------------------------------------------------------------ Check yourself: this visit and last time (P2-15) */
  /** the last outcome of each self-check of a lesson, {k: true | false}: the newest answer in the log wins, else the stored counts decide */
  function quizLast(st, id) {
    const out = {}, rec = st && st.lessons && st.lessons[id], pre = id + '#';
    ((st && st.log) || []).forEach(r => { if (r && r[4] === 'z' && typeof r[1] === 'string' && r[1].startsWith(pre)) out[r[1].slice(pre.length)] = r[2] === 1; });
    if (rec && rec.quiz) Object.keys(rec.quiz).forEach(k => { const e = rec.quiz[k]; if (!(k in out) && e && e.n) out[k] = e.ok > 0 && e.ok * 2 >= e.n; });
    return out;
  }
  /** the quiz's score line: '5 questions' · '1 of 2 right · 3 to go' · '4 of 5 right' */
  function scoreText(total, answered, right) {
    if (!answered) return `${total} question${total === 1 ? '' : 's'}`;
    return `${right} of ${answered} right` + (answered < total ? ` · ${total - answered} to go` : '');
  }
  /** 'Last time: 1 of 2 right' over the questions on the page (k < total); '' with no earlier answer */
  function lastText(last, total) {
    const ks = Object.keys(last || {}).filter(k => +k < total);
    return ks.length ? `Last time: ${ks.filter(k => last[k]).length} of ${ks.length} right` : '';
  }

  /* ------------------------------------------------------------ the lesson's PYQs (P2-16, P3-47) */
  const DIFF = { easy: 1, medium: 2, hard: 3 };
  /** the picked questions easy -> hard, then newest first (then paper and number, for a stable order); unknown ids dropped */
  function pyqOrder(D, ids) {
    const m = id => D.qById[id], cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
    return (ids || []).filter(m).slice().sort((a, b) => (DIFF[m(a).diff] || 2) - (DIFF[m(b).diff] || 2) || m(b).year - m(a).year || cmp(m(a).paper, m(b).paper) || m(a).no - m(b).no);
  }
  /** the lesson's ICAI practice (docs/ICAI_BANK.md §5, 'ICAI asked this'): the ICAI items tagged to this lesson's sub-topic (as primary or
      secondary tag), the documents that asked them (newest first) and how many the learner has got right -> {ids, n, attempts: [label],
      docs, got, tried, bank: items in the whole bank, docsInBank} */
  function icaiPractice(st, D, id) {
    const qs = (D.questions || []).filter(q => q.icai && (q.subtopic === id || (q.tags || []).includes(id)));
    const docs = U.uniq(qs.map(q => q.paper)).map(p => D.paperById[p]).filter(Boolean).sort((a, b) => b.year - a.year || b.set - a.set || (a.id < b.id ? -1 : 1));
    const e = q => (st && st.q && st.q[q.id]) || null;
    return { ids: qs.map(q => q.id), n: qs.length, attempts: docs.map(p => p.label), docs: docs.length,
      got: qs.filter(q => { const x = e(q); return !!(x && x.n && x.lastOk); }).length, tried: qs.filter(q => { const x = e(q); return !!(x && (x.n || x.seen)); }).length,
      bank: (D.questions || []).filter(q => q.icai).length, docsInBank: (D.papers || []).length };
  }
  /** the questions the 'Related PYQs' link opens (the bank's filter behind practiceLink) and how many the learner last answered right */
  function practiceSet(st, D, meta, pl) {
    // an ICAI item counts for every sub-topic it is tagged with, whatever its primary chapter (the bank's own filter, pyqlib)
    const onSub = q => q.subtopic === meta.id || (q.icai && (q.tags || []).includes(meta.id));
    const qs = D.questions.filter(q => q.subject === meta.subject && (pl.scope === 'subject' || (pl.scope === 'sub' && q.icai) || q.topic === meta.topic) && (pl.scope !== 'sub' || onSub(q)));
    return { n: qs.length, solved: qs.filter(q => { const e = st && st.q && st.q[q.id]; return !!(e && e.n && e.lastOk); }).length };
  }

  /* ------------------------------------------------------------ side-boxes: a run of one kind becomes one labelled box (P2-17) */
  const GROUP = { mistake: ['common mistake', 'common mistakes'], trick: ['trick', 'tricks'], tip: ['tip', 'tips'], definition: ['definition', 'definitions'],
    formula: ['formula', 'formulas'], note: ['note', 'notes'], key: ['key idea', 'key ideas'] };
  const groupLabel = (kind, n) => (GROUP[kind] ? `${n} ${GROUP[kind][n === 1 ? 0 : 1]}` : null);

  /* ------------------------------------------------------------ headings: the saved position and 'about N min left' (P1-01), the section bar (P1-09) */
  const slugOf = s => (GA.md && GA.md.slug ? GA.md.slug(s) : String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  /** the lesson's ## and ### headings in order, each with the words up to the next heading (ids as md.js makes them); [0] is the text before the first */
  function headWords(md) {
    const out = [{ id: null, lv: 0, title: '', words: 0 }];
    let fence = false;
    String(md || '').replace(/\r\n?/g, '\n').split('\n').forEach(l => {
      const t = l.trim();
      if (/^(```|~~~)/.test(t)) fence = !fence;
      const m = !fence && /^(#{2,3})\s+(.*?)\s*#*$/.exec(t);
      if (m) { out.push({ id: slugOf(m[2]), lv: m[1].length, title: m[2], words: 0 }); return; }
      out[out.length - 1].words += (t.match(/\S+/g) || []).length;
    });
    return out;
  }
  /** the lesson split at its ## headings (outside code fences), so the page can render the first sections at once and the rest a moment
      later (P1-11): [{md, sec: the H2's id or null for any text before the first H2, title}]. Rendering the parts one by one gives exactly the
      HTML of rendering the whole (tests/lesson.test.js). */
  function chunks(md) {
    const out = [{ md: [], sec: null, title: null }];
    let fence = false;
    String(md || '').replace(/\r\n?/g, '\n').split('\n').forEach(l => {
      if (/^\s*(```|~~~)/.test(l)) fence = !fence;
      const m = !fence && /^##\s+(.*?)\s*#*\s*$/.exec(l);
      if (m) out.push({ md: [], sec: slugOf(m[1].trim()), title: m[1].trim() });
      out[out.length - 1].md.push(l);
    });
    return out.map(c => ({ md: c.md.join('\n'), sec: c.sec, title: c.title })).filter((c, i) => i > 0 || c.md.trim());
  }
  /** one H2 part split at its ### headings (outside code fences and ::: boxes): the first piece renders the section, each later piece renders
      the HTML that follows inside it, exactly as rendering the part whole (tests/lesson.test.js) */
  function pieces(md) {
    const out = [[]];
    let fence = false, box = 0;
    String(md || '').split('\n').forEach(l => {
      const t = l.trim();
      if (/^(```|~~~)/.test(t)) fence = !fence;
      if (!fence) { if (/^:{3,}\s*[a-z]/i.test(t)) box++; else if (/^:{3,}\s*$/.test(t) && box) box--; }
      if (!fence && !box && /^###\s/.test(t) && out[out.length - 1].length) out.push([]);
      out[out.length - 1].push(l);
    });
    return out.map(x => x.join('\n'));
  }
  /** minutes left from heading `h` to the end, in proportion to the words (null for an unknown heading) */
  function minutesLeft(md, h, minutes) {
    const hw = headWords(md), i = hw.findIndex(x => x.id === h), total = hw.reduce((s, x) => s + x.words, 0);
    if (i < 1 || !total || !minutes) return null;
    const left = hw.slice(i).reduce((s, x) => s + x.words, 0);
    return Math.max(1, Math.round((minutes * left) / total));
  }
  /** the section bar's text: 'How it works › Multi-level page tables · 2/8' */
  function barText(h2, h3, k, n) { return (h2 || '') + (h3 ? ' › ' + h3 : '') + (n ? ` · ${k}/${n}` : ''); }
  /* a heading's words for an accessible name. Chrome leaves KaTeX's MathML out of a button's name, and the drawn text reads '$10^9$' as '109',
     so the maths of a heading is spoken from its TeX: '10 to the 9', 'n sub 0', 'L star', 'a to the n b to the n', symbols as Unicode */
  const SAY = { ge: '≥', geq: '≥', le: '≤', leq: '≤', ne: '≠', neq: '≠', mapsto: '↦', to: '→', rightarrow: '→', Rightarrow: '⇒', leftarrow: '←', times: '×', cdot: '·',
    in: '∈', notin: '∉', cup: '∪', cap: '∩', infty: '∞', emptyset: '∅', varnothing: '∅', ldots: '…', dots: '…', cdots: '…', subseteq: '⊆', subset: '⊂', forall: 'for all',
    exists: 'there exists', neg: 'not', land: 'and', lor: 'or', oplus: '⊕', equiv: '≡', approx: '≈', sim: '∼', mid: '|', pm: '±', lceil: '⌈', rceil: '⌉', lfloor: '⌊',
    rfloor: '⌋', bmod: 'mod', pmod: 'mod', mod: 'mod', log: 'log', ln: 'ln', lg: 'lg', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ',
    phi: 'φ', varphi: 'φ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Omega: 'Ω' };
  function speakTex(tex) {
    const sup = x => (x === '*' ? ' star ' : x === 'R' ? ' reversed ' : x === '2' ? ' squared ' : x === '3' ? ' cubed ' : ' to the ' + x + ' ');
    return String(tex || '')
      .replace(/\\([{}#%&$_])/g, (m, c) => ({ '{': '\u0001', '}': '\u0002', _: '\u0003' })[c] || c)
      .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, ' $1 over $2 ')
      .replace(/\\(?:mathrm|mathbf|mathit|mathsf|mathtt|text|textbf|textit|operatorname|mathcal|mathbb|boldsymbol)\s*\{([^{}]*)\}/g, '$1')
      .replace(/\\(?:left|right|big|Big|bigg|Bigg|displaystyle)(?![a-zA-Z])/g, '').replace(/\\[,;:! ]|\\q?quad(?![a-zA-Z])/g, ' ')
      .replace(/\^\s*\{([^{}]*)\}|\^\s*(\\[a-zA-Z]+|.)/g, (m, a, b) => sup((a != null ? a : b).trim()))
      .replace(/_\s*\{([^{}]*)\}|_\s*(\\[a-zA-Z]+|.)/g, (m, a, b) => ' sub ' + (a != null ? a : b).trim() + ' ')
      .replace(/\\([a-zA-Z]+)/g, (m, w) => (SAY[w] != null ? ' ' + SAY[w] + ' ' : w))
      .replace(/[{}]/g, '').replace(/\u0001/g, '{').replace(/\u0002/g, '}').replace(/\u0003/g, '_')
      .replace(/\s+/g, ' ').replace(/\s+([,.;:)}])/g, '$1').replace(/([({])\s+/g, '$1').trim();
  }
  /** a markdown heading as plain words for a label: its maths spoken (speakTex), emphasis and code marks dropped, [[links]] to their text */
  function speakMd(md) {
    return String(md || '').replace(/\$([^$]+)\$/g, (m, x) => ' ' + speakTex(x) + ' ').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => b || a)
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|__|`/g, '').replace(/(^|\s)[*_]([^*_]+)[*_](?=\s|$|[.,;:!?])/g, '$1$2')
      .replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  }
  /** the tip behind an outside-the-syllabus flag, from real numbers (P1-55, P2-08) */
  function flagTip(status, sub) {
    const asked = sub && sub.pyqs ? `Asked ${sub.pyqs} time${sub.pyqs === 1 ? '' : 's'} in ICAI papers${sub.lastYear ? `, last in ${sub.lastYear}` : ''}.` : 'No ICAI question is tagged to this sub-topic yet.';
    return status === 'legacy' ? `${OUT_LINE.legacy} ${asked}` : `${OUT_LINE.extra} ${asked}`;
  }

  /** the copy-only problem report of a lesson (P3-48, D16) as plain text, in the question card's format: the lesson and its id, the build date
      and the learner's own words (they say where: the report is opened from the end of the page). Nothing is sent or stored. o = {id, title, built, words} */
  function reportText(o) {
    o = o || {};
    const words = String(o.words == null ? '' : o.words).trim();
    return ['PassBook · problem report', `Lesson: ${o.title || o.id} (id ${o.id})`, o.built ? `Data: built ${o.built}` : '',
      `What looks wrong: ${words ? (/\n/.test(words) ? '\n' + words : words) : '(not described)'}`].filter(Boolean).join('\n');
  }

  /** the saved reading position (P1-01, ARCHITECTURE §10.6: saved only when the current heading changes), one step per heading the page notes;
      s = {start, moved} carries through the visit. While the visit is still landing (Back's restored place or a '#heading', which the router and
      the shell hold for ~1.5 s, until the learner's first input) the start follows the page; after that the visit has moved once its heading
      differs from the start. Only a visit that has moved saves, and never the first section (a long look at the header is not reading: it must
      not count as a place to resume, nor replace a real saved one), never the heading already saved, never in the first 20 s (a peek).
      o = {h, landed, first, saved, ms} -> {start, moved, save: the heading id to save, or null} */
  function readAt(s, o) {
    s = s || {}; o = o || {};
    const h = o.h || null;
    let start = s.start || null, moved = !!s.moved;
    if (h && !moved) { if (!o.landed || !start) start = h; else if (h !== start) moved = true; }
    return { start, moved, save: moved && h && h !== o.first && h !== o.saved && o.ms >= 20000 ? h : null };
  }

  /** how a checked option shows (D17, P1-40) and what a screen reader hears first (P0-18: a hidden prefix inside the label, never an aria-label
      built from textContent, which read maths as 'xyxyxy'): after a miss on a one-answer question the right option is filled like a correct
      pick; missed MSQ options stay dashed */
  function optionMark(kind, isKey, isPick) {
    if (isKey && isPick) return { cls: 'ok', say: 'Your answer, correct: ' };
    if (isPick) return { cls: 'bad', say: 'Your answer, wrong: ' };
    if (isKey) return kind === 'msq' ? { cls: 'miss', say: 'Correct answer, not selected: ' } : { cls: 'ok', say: 'Correct answer, not selected: ' };
    return { cls: 'dim', say: '' };
  }

  const Lib = { LEVEL, DEPTHS, optionMark, section, sections, sentences, trimIdea, bullets, firstPara, keyIdeas, why, whyHtml, practiceLink, neighbours, progressOf, shownLen,
    isDone, orderOf, place, routeOf, after, tally, nextSubject, needsLine, headWords, chunks, pieces, minutesLeft, barText, speakTex, speakMd, flagTip,
    allNeeds, durText, tierLabel, flagLabel, readWords, levelMinutes, quizLast, scoreText, lastText, pyqOrder, practiceSet, groupLabel, reportText, readAt, icaiPractice, icaiWhy };
  GA.lessonLib = Lib;
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
  if (typeof document === 'undefined') return;

  /* ============================================================ feedback (burst on correct, shake on wrong, a short buzz on phones) */
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* not supported */ } }
  function burst(el) {
    if (!el || calm()) return;
    const r = el.getBoundingClientRect(), b = document.createElement('div');
    b.className = 'lsn-burst'; b.setAttribute('aria-hidden', 'true');
    b.style.left = (r.left + r.width / 2) + 'px'; b.style.top = (r.top + r.height / 2) + 'px';
    let h = '<b></b>';
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2 + Math.random() * 0.4, d = 30 + Math.random() * 26; h += `<i style="--x:${(Math.cos(a) * d).toFixed(1)}px;--y:${(Math.sin(a) * d).toFixed(1)}px"></i>`; }
    b.innerHTML = h; document.body.appendChild(b); setTimeout(() => b.remove(), 760);
  }
  function shake(el) { if (!el || calm()) return; el.classList.remove('lsn-shake'); void el.offsetWidth; el.classList.add('lsn-shake'); setTimeout(() => el.classList.remove('lsn-shake'), 460); }

  /* ============================================================ widgets */
  function parseNatKey(k) { const m = /^(-?[\d.]+)\s*\.\.\s*(-?[\d.]+)$/.exec(k); return m ? [parseFloat(m[1]), parseFloat(m[2])] : [parseFloat(k), parseFloat(k)]; }
  let qzSeq = 0;                                                             // ids for the quiz's labels (unique on the page)
  /** Check yourself. The score line counts this visit ('1 of 2 right · 3 to go'); before the first answer it says how it went last time
      ('Last time: 1 of 2 right') and each question's number carries last time's ✓ / ✕ (P2-15). Every check fires 'qz-change' on the quiz.
      Semantics (P3-06): the quiz is a region named by its 'Check yourself' label; each question's options are one group named 'Options for
      question n' (a radiogroup for one answer), described by 'Select all that apply' when more than one can be right. */
  function hydrateQuiz(root, lessonId) {
    const icon = GA.icon, UI = GA.ui, A = GA.actions, qzs = U.$$('.ga-quiz', root);
    if (!qzs.length) return;
    const last = quizLast(GA.store && GA.store.state, lessonId);              // reads the log once, only where there is a quiz
    qzs.forEach(qz => {
      const lb = U.$(':scope > header > b', qz);
      if (lb && !qz.hasAttribute('aria-labelledby')) { if (!lb.id) lb.id = 'qz-l' + ++qzSeq; qz.setAttribute('aria-labelledby', lb.id); }
      const total = qz.querySelectorAll('.qz-q').length, before = lastText(last, total);
      const upd = () => {
        const done = qz.querySelectorAll('.qz-q[data-done]').length, ok = qz.querySelectorAll('.qz-q[data-ok="1"]').length;
        U.$('.qz-score', qz).textContent = !done && before ? before : scoreText(total, done, ok);
      };
      upd();
      U.$$('.qz-q', qz).forEach(q => {
        const k = q.dataset.k, n = U.$('.qz-n', q);
        if (n && k in last && !U.$('.qz-last', n)) {
          n.classList.add('has-last');
          n.insertAdjacentHTML('beforeend', `<span class="qz-last ${last[k] ? 'ok' : 'bad'}" aria-hidden="true">${icon(last[k] ? 'check' : 'x')}</span><span class="sr">, last time ${last[k] ? 'right' : 'wrong'}</span>`);
        }
        const btn = U.$('[data-qz="check"]', q);
        if (btn) { btn.classList.add('primary'); btn.innerHTML = 'Check'; }
        if (q.dataset.kind === 'msq' && !U.$('.qz-hint', q)) U.$('.qz-opts', q).insertAdjacentHTML('beforebegin', '<p class="qz-hint">Select all that apply</p>');
        const og = U.$('.qz-opts', q);
        if (og && !og.hasAttribute('role')) {
          og.setAttribute('role', q.dataset.kind === 'msq' ? 'group' : 'radiogroup');
          og.setAttribute('aria-label', `Options for question ${+k + 1}`);
          const hint = U.$('.qz-hint', q);
          if (hint) { if (!hint.id) hint.id = 'qz-h' + ++qzSeq; og.setAttribute('aria-describedby', hint.id); }
        }
        const nat = U.$('.qz-nat input', q);
        if (nat) nat.addEventListener('keydown', e => { if (e.key === 'Enter' && btn && !btn.disabled) { e.preventDefault(); btn.click(); } });
        // the result takes focus after Check (the button hides itself), so it is read once from there rather than also as a live region (P1-48)
        const res = U.$('.qz-res', q);
        if (res) { res.removeAttribute('aria-live'); res.tabIndex = -1; }
      });
      U.on(qz, 'click', '[data-qz="check"]', (e, b) => {
        const q = b.closest('.qz-q'), k = +q.dataset.k, kind = q.dataset.kind, key = q.dataset.key;
        if (q.dataset.done) return;
        let ok, picked;
        if (kind === 'nat') {
          // a NAT answer counts only when it parses as a number (P0-16): GA.scoring's rule when it is loaded; a comma is never a decimal point
          const raw = U.$('.qz-nat input', q).value.trim(), SC = GA.scoring;
          const v = SC && typeof SC.parseNat === 'function' ? SC.parseNat(raw) : (/^-?(\d+\.?\d*|\.\d+)$/.test(raw) ? +raw : null);
          if (v == null || !isFinite(v)) { UI.toast('Type a number like 12 or -0.5 first.'); return; }
          const [lo, hi] = parseNatKey(key); ok = v >= lo - 1e-6 && v <= hi + 1e-6;
        } else {
          picked = U.$$('input:checked', q).map(i => i.value).sort().join('');
          if (!picked) { UI.toast(kind === 'msq' ? 'Pick at least one option first.' : 'Pick an option first.'); return; }
          ok = picked === key.split('').sort().join('');
          U.$$('.qz-o', q).forEach(l => {
            const v = l.querySelector('input').value, isKey = key.includes(v), isPick = picked.includes(v), mark = optionMark(kind, isKey, isPick);
            ['ok', 'bad', 'miss', 'dim'].forEach(c => l.classList.toggle(c, mark.cls === c));
            if (isKey || isPick) l.insertAdjacentHTML('beforeend', `<span class="qz-mk" aria-hidden="true">${icon(isKey ? 'check' : 'x')}</span>`);
            if (mark.say) { const t = U.$('.qz-t', l) || l; t.insertAdjacentHTML('afterbegin', `<span class="sr">${mark.say}</span>`); }
          });
        }
        q.dataset.done = '1'; q.dataset.ok = ok ? '1' : '0';
        U.$$('input', q).forEach(i => (i.disabled = true)); b.disabled = true;
        const res = U.$('.qz-res', q);
        res.className = 'qz-res ' + (ok ? 'ok' : 'bad');
        res.innerHTML = ok ? `${icon('check')}<span>Correct</span>` : `${icon('x')}<span>Not quite${kind === 'nat' ? ` · answer: ${U.esc(key.replace('..', ' to '))}` : ` · answer: ${U.esc(key.split('').join(', '))}`}</span>`;
        const ex = U.$('.qz-exp', q); if (ex.textContent.trim()) { ex.hidden = false; ex.classList.add(ok ? 'ok' : 'bad'); }
        if (ok) { burst(kind === 'nat' ? U.$('.qz-nat input', q) : (U.$('.qz-o.ok .qz-k', q) || b)); buzz(15); }
        else { shake(kind === 'nat' ? U.$('.qz-nat', q) : U.$('.qz-opts', q)); buzz([20, 40, 20]); }
        A.recordLessonQuiz(lessonId, k, ok);
        { const n = U.$('.qz-n', q); if (n) { n.classList.remove('has-last'); U.$$('.qz-last, .sr', n).forEach(x => x.remove()); } }   // this answer replaces last time's
        upd();
        try { qz.dispatchEvent(new CustomEvent('qz-change', { bubbles: true })); } catch (err) { /* old browsers */ }
        try { res.focus({ preventScroll: true }); } catch (err) { res.focus(); }
      });
    });
  }

  /** '::: pyq' embeds: calm rows that open the question in place (P2-16, P2-21). A row: paper · Q, marks · type · difficulty (our estimate)
      and the learner's state, then a one-line stem once the papers have loaded (when the embed comes near); easy to hard, then newest first.
      With ctx.pl (the lesson's practiceLink) the header names both counts: '6 picked for this lesson · 16 on this sub-topic →'. */
  function hydratePyq(root, ctx) {
    const icon = GA.icon, UI = GA.ui, esc = U.esc, D = GA.data.D;
    for (const box of U.$$('.ga-pyq-embed', root)) {
      const ids = box.dataset.ids.split(/\s+/).filter(Boolean);
      const list = U.$('.pq-list', box), head = U.$(':scope > header', box), cnt = head && U.$(':scope > span', head);
      const have = pyqOrder(D, ids);
      if (!have.length) { list.innerHTML = `<p class="pq-none">${icon('info')} ${esc(UI && UI.str && UI.str.bankEmpty ? UI.str.bankEmpty : 'ICAI past papers, RTPs and MTPs are being added')}.</p>`; if (cnt) cnt.remove(); continue; }
      const pl = ctx && ctx.pl;
      if (cnt && !box.classList.contains('lsn-icai')) { cnt.className = 'pq-n'; cnt.textContent = have.length + (have.length < ids.length ? ` of ${ids.length}` : '') + (pl ? ' picked for this lesson' : ''); }
      if (head && pl && pl.n > have.length) head.insertAdjacentHTML('beforeend', `<a class="pq-all" href="${esc(pl.href)}"><span>${U.nf(pl.n)} ${esc(pl.scope === 'sub' ? 'on this sub-topic' : pl.note)}</span>${icon('arrow-r')}</a>`);
      list.innerHTML = have.map(id => {
        const m = D.qById[id], e = GA.store.state.q[id];
        const st = e && e.n ? (e.lastOk ? 'ok' : e.g === 'partly' ? 'part' : 'bad') : e && e.seen ? 'seen' : '';
        const state = st ? `<span class="pq-st ${st}">${icon(st === 'ok' ? 'check' : st === 'bad' ? 'x' : st === 'part' ? 'minus' : 'eye')}${st === 'ok' ? (e.g ? 'got it' : 'solved') : st === 'bad' ? 'missed' : st === 'part' ? 'partly' : 'seen'}</span>` : '';
        const df = DIFF[m.diff] ? ` · <span class="pq-d">${U.cap(m.diff)}<span class="sr"> (our estimate)</span></span>` : '';
        // an ICAI item (docs/ICAI_BANK.md): '5 marks · Descriptive', and an RTP item says it carries no marks
        const mt = m.icai ? `${m.marks ? `${m.marks} mark${m.marks === 1 ? '' : 's'}` : 'no marks (RTP)'} · ${m.type === 'DESC' ? 'Descriptive' : 'MCQ'}` : `${m.marks} mark${m.marks === 1 ? '' : 's'} · ${m.type}`;
        return `<details class="pq-row" data-id="${esc(id)}"><summary><span class="pq-l"><b>${esc(UI.paperLabel(m))}</b> · ${esc(UI.qLabel(m))}</span>` +
          `<span class="pq-mt"><span class="pq-m">${mt}${df}</span>${state}</span>${icon('chev-d')}<span class="pq-s"></span></summary><div class="pq-b"></div></details>`;
      }).join('');
      // the stems: the papers load when the embed comes near (one file per paper, cached by GA.data); a failure leaves the rows as they are
      const stems = () => Promise.resolve(GA.data.questions(have)).then(qs => {
        if (!box.isConnected) return;
        const by = {}; (qs || []).forEach(q => (by[q.id] = q));
        const L = GA.pyqLib, snip = q => (L && typeof L.snippet === 'function' ? L.snippet(q, 160) : String(q.stem || '').replace(/[`*]|\$/g, '').replace(/\s+/g, ' ').slice(0, 160));
        U.$$('.pq-row', list).forEach(d => { const q = by[d.dataset.id], s = U.$('.pq-s', d); if (q && s) s.textContent = snip(q) + (q.grouped && !q.stem ? ' (shared passage)' : ''); });
        box.classList.add('has-stems');
      }).catch(() => box.classList.add('no-stems'));
      if (GA.reveal && GA.reveal.whenVisible) { const cancel = GA.reveal.whenVisible(box, stems, { margin: 700 }); if (ctx && ctx.track && typeof cancel === 'function') ctx.track(cancel); }
      else box.classList.add('no-stems');
      list.addEventListener('toggle', async e => {
        const d = e.target; if (!d.open || d.dataset.loaded || !d.classList.contains('pq-row')) return; d.dataset.loaded = '1';   // the PYQ rows only, never an embedded card's own folds
        const host = U.$('.pq-b', d);
        let q = null;
        try { q = (await GA.data.questions([d.dataset.id]))[0]; }
        catch (err) {
          // a file that did not arrive (P1-59): say so in the row, quietly (the lesson's one coral stays the footer's), and let the learner retry
          delete d.dataset.loaded;
          const off = typeof navigator !== 'undefined' && navigator.onLine === false;
          host.innerHTML = `<p class="pq-none" role="status">${icon('alert')}<span>This question did not load${off ? ': you seem to be offline' : ''}.</span> <button type="button" class="btn sm" data-pq-retry>Try again</button></p>`;
          return;
        }
        if (q && GA.qcard) { host.innerHTML = ''; host.append(GA.qcard.create(q, { mode: 'embed' }).el); }
      }, true);
      U.on(list, 'click', '[data-pq-retry]', (e, b) => { const d = b.closest('details'); if (!d) return; d.open = false; requestAnimationFrame(() => { d.open = true; }); });
    }
  }

  /** side-boxes of one kind that follow each other directly in a section (or a piece of one) become one labelled box holding a numbered
      hairline list with bold titles: '5 common mistakes' with the --bad edge, '4 GATE tricks' with the --ok edge; a single box stays as it is
      (P2-17; RESEARCH rule 12 keeps the label). Nodes move, so anything inside them keeps its listeners. */
  function groupBoxes(root) {
    const top = el => el.parentNode === root || (el.parentElement && el.parentElement.classList.contains('lsec'));
    U.$$('aside.co:not(.co-grp)', root).forEach(a => {
      if (!a.parentNode || !top(a)) return;
      const kind = (/(?:^|\s)co-([a-z]+)(?:\s|$)/.exec(a.className) || [])[1], same = x => !!x && x.matches(`aside.co.co-${kind}:not(.co-grp)`);
      if (!GROUP[kind] || same(a.previousElementSibling)) return;                      // only the first box of a run starts a group
      const run = [a];
      for (let x = a.nextElementSibling; same(x); x = x.nextElementSibling) run.push(x);
      if (run.length < 2) return;
      const box = document.createElement('aside'), ic = U.$(':scope > .co-h > svg', a), label = groupLabel(kind, run.length);
      box.className = `co co-${kind} co-grp`;
      box.setAttribute('aria-label', label);
      box.innerHTML = `<div class="co-h">${ic ? ic.outerHTML : ''}<b>${U.esc(label)}</b></div><ol class="co-l"></ol>`;
      const ol = box.lastElementChild;
      run.forEach(x => {
        const li = document.createElement('li'), t = U.$(':scope > .co-h > .co-t', x), b = U.$(':scope > .co-b', x);
        if (t) li.append(t);
        if (b) li.append(b);
        ol.append(li);
      });
      a.before(box); run.forEach(x => x.remove());
    });
  }

  /** labs mount when they come near the viewport (nothing animates until the learner presses play). The lab's name and the lesson's 'Try it'
      line stay on top as the embed's own head (P1-16); the lab mounts into the slot below it, which before mounting holds a card with the
      'Open the full lab' link. */
  function hydrateLabs(root, track) {
    const icon = GA.icon, esc = U.esc;
    U.$$('.ga-lab-embed', root).forEach(box => {
      const id = box.dataset.lab, lab = GA.data.D.labs.find(l => l.id === id);
      let cfg = {}; try { cfg = JSON.parse(box.dataset.cfg || '{}'); } catch (e) { /* ignore */ }
      const cap = box.querySelector('.lab-cap');
      if (!lab) { box.innerHTML = ''; return; }
      const planned = lab.status === 'planned';
      const open = `<a class="btn sm" href="#/lab/${esc(id)}?cfg=${encodeURIComponent(JSON.stringify(cfg))}">${icon('external')}<span>Open the full lab</span></a>`;
      box.innerHTML = `<div class="lab-eh"><span class="lab-ico" aria-hidden="true">${icon('flask')}</span><div class="lab-t"><small>Interactive lab</small><b>${esc(lab.title)}</b>` +
        `${cap ? `<span class="lab-try">${cap.innerHTML}</span>` : `<span>${esc(lab.blurb || '')}</span>`}</div>${planned ? '<span class="lab-soon">Coming soon</span>' : ''}</div>` +
        (planned ? '' : `<div class="lab-slot"><div class="lab-card">${open}</div></div>`);
      if (planned) return;
      const slot = U.$('.lab-slot', box);
      const mount = async () => {
        try {
          await U.loadScript('app/js/labs/framework.js');
          if (!slot.isConnected || !GA.lab || !GA.lab.mountEmbed) return;
          const h = await GA.lab.mountEmbed(slot, id, cfg);           // it replaces the slot's card with the lab
          if (h && h.destroy && track) track(() => h.destroy());
        } catch (e) { /* the card with the 'Open the full lab' link remains */ }
      };
      if (GA.reveal && GA.reveal.whenVisible) { const cancel = GA.reveal.whenVisible(box, mount, { margin: 600 }); if (track && typeof cancel === 'function') track(cancel); }
      else mount();
    });
  }

  /* ============================================================ path bar (#/l/:id?path=<path id>, from the home page's "Start path") */
  /** where this lesson sits on the path, with the learner's done-state; null (no bar) for an unknown path or a lesson that is not on it */
  function pathOf(pid, id, st) {
    if (!pid || !GA.insights || !GA.insights.get) return null;
    try { const I = GA.insights.get(); return I && I.pathNav ? I.pathNav(String(pid), id, x => !!(st.lessons[x] && st.lessons[x].done)) : null; }
    catch (e) { return null; }
  }
  /** one line above the breadcrumb, 'Path · Crash course by marks · step 2 of 91' over a 4 px bar (P3-11); Previous and Next live in the footer */
  function pathBar(nav) {
    if (!nav) return '';
    const icon = GA.icon, esc = U.esc;
    const pct = nav.steps ? (100 * nav.done) / nav.steps : 0;
    return `<div class="lsn-path"><p class="lsn-path-t">${icon('compass')}<span><b>Path</b> · ${esc(nav.title)} · step ${nav.step} of ${nav.steps}${nav.done ? ` · ${nav.done} done` : ''}</span></p>
      <span class="lsn-path-m" role="img" aria-label="${esc(`${nav.done} of ${nav.steps} lessons on this path done`)}"><i style="width:${pct.toFixed(1)}%"></i></span></div>`;
  }

  /* ============================================================ the nav above the page (whatever the shell draws): its bottom edge */
  let navEl = null;
  function navBottom() {
    if (!navEl || !navEl.isConnected) {
      navEl = null;
      const els = document.elementsFromPoint ? document.elementsFromPoint(Math.max(1, innerWidth / 2), 2) : [];
      for (const el of els) {
        let x = el;
        while (x && x !== document.body && x !== document.documentElement) {
          const p = getComputedStyle(x).position;
          if ((p === 'sticky' || p === 'fixed') && !x.classList.contains('lsn-readbar') && !x.closest('.lsn-sbar-w, .lsn-sheet-root')) { navEl = x; break; }
          x = x.parentElement;
        }
        if (navEl) break;
      }
    }
    if (navEl) { const r = navEl.getBoundingClientRect(); if (r.top <= 2 && r.bottom > 0 && r.bottom < 200) return Math.round(r.bottom); }
    return 0;
  }

  /* ============================================================ wide figures on narrow screens: never shrink a diagram below 80 % of its
     drawn size (its labels would drop under ~9 px); it scrolls sideways inside its own card instead (FRONTEND_V3_SPEC.md §0).
     GA.fit (core/fit.js, ARCHITECTURE §10.9) is the shared pass once it exists; until then these local passes run, reads first and writes
     after, so one call costs one layout instead of one per element (P1-11). */
  const MIN_SCALE = 0.8;
  function fitFigures(root) {
    const plan = U.$$('figure.dg > svg.dgs[width]', root).map(svg => {
      if (svg.closest('.ga-lab-embed')) return null;                          // lab internals are the lab frame's business
      const W = +svg.getAttribute('width'), fig = svg.parentElement;
      if (!W) return null;
      const mw = svg.dataset.mw != null ? svg.dataset.mw : svg.style.minWidth || '';
      const need = Math.max(parseFloat(mw) || 0, Math.round(W * MIN_SCALE));
      const cs = getComputedStyle(fig), avail = fig.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return { svg, fig, mw, need, wide: avail > 0 && avail < need - 1 };
    }).filter(Boolean);
    plan.forEach(p => { p.svg.dataset.mw = p.mw; p.svg.style.minWidth = p.wide ? p.need + 'px' : p.mw; p.fig.classList.toggle('dg-wide', p.wide); });
  }

  /** inline maths wider than its line (a long \\dfrac on a phone) becomes its own scrolling box instead of widening the page. Above 600 px only
      long formulas can overflow the 690 px column, so short ones are not measured there. */
  function fitMaths(root) {
    const wideScreen = typeof innerWidth === 'number' && innerWidth >= 600;
    const tex = m => m.getAttribute('data-tex') || m.getAttribute('aria-label') || '';
    const cand = U.$$('span.m:not(.md)', root).filter(m => !m.closest('.ga-lab-embed, .tw, .mblock') && (!wideScreen || tex(m).length > 60));
    U.$$('span.m.m-wide', root).forEach(m => m.classList.remove('m-wide'));
    const wide = cand.filter(m => { const box = m.parentElement && m.parentElement.closest('p, li, td, th, .co-b, .qz-t, .qz-s, .rev-b, div'); return box && m.getBoundingClientRect().width > box.clientWidth + 1; });
    wide.forEach(m => m.classList.add('m-wide'));
  }
  /** the PYQ header's '·' separates its two counts only while they share a line: when the '16 on this sub-topic →' link starts a line of its
      own (most headers at 360 px), it drops the dot (.pq-own) and keeps the dot's width as a right margin, so it never slides back beside the
      count without one. Measured with the dot in place; a header that is not laid out (a hidden depth) keeps its state. Reads now, and the
      returned function writes, so fitAll stays one batched pass (P1-11). */
  function pyqHeads(el) {
    const links = U.$$('.ga-pyq-embed > header > span + .pq-all', el);
    if (!links.length) return () => {};
    const had = links.map(a => a.classList.contains('pq-own'));
    links.forEach((a, i) => { if (had[i]) a.classList.remove('pq-own'); });
    const plan = links.map(a => {
      const words = a.firstElementChild, ar = a.getBoundingClientRect(), cr = a.previousElementSibling.getBoundingClientRect();
      if (!words || !ar.width || !cr.width) return null;
      return { own: ar.top >= cr.bottom - 1, sep: Math.max(0, words.getBoundingClientRect().left - ar.left) };
    });
    return () => links.forEach((a, i) => {
      const p = plan[i];
      if (!p) { if (had[i]) a.classList.add('pq-own'); return; }
      if (p.own) a.style.setProperty('--pq-sep', p.sep.toFixed(2) + 'px');
      a.classList.toggle('pq-own', p.own);
    });
  }

  /** the one fit entry point of the page: the shared GA.fit when it is there, else the local passes. After GA.fit, one additive check keeps
      the page from scrolling sideways: an inline formula that still runs past its line (one unbreakable \\dfrac on a phone) gets the same
      .m-wide scroll box (ARCHITECTURE §10.9); nothing GA.fit set is undone. The PYQ headers' separators are measured first and set last. */
  function fitAll(el) {
    if (!el) return;
    const heads = pyqHeads(el);
    if (GA.fit && typeof GA.fit.all === 'function') {
      try { GA.fit.all(el); } catch (e) { fitFigures(el); fitMaths(el); heads(); return; }
      const wideScreen = typeof innerWidth === 'number' && innerWidth >= 600, tex = m => m.getAttribute('data-tex') || m.getAttribute('aria-label') || '';
      const hits = U.$$('span.m:not(.md):not(.m-wide)', el).filter(m => !m.closest('.ga-lab-embed, .tw, .mblock, .m.md') && (!wideScreen || tex(m).length > 60)).filter(m => {
        const box = m.parentElement && m.parentElement.closest('p, li, td, th, dd, .co-b, .qz-t, .qz-s, .rev-b, figcaption, h1, h2, h3, h4, summary, label, div');
        return box && m.getBoundingClientRect().right > box.getBoundingClientRect().right + 1;
      });
      hits.forEach(m => { m.classList.add('m-wide'); if (!m.hasAttribute('tabindex')) { m.setAttribute('tabindex', '0'); m.dataset.fitTab = '1'; } });
      heads();
      return;
    }
    fitFigures(el); fitMaths(el); heads();
  }

  /* ============================================================ flip flashcard (footer). The card is not a button itself (a button's name
     would hide its text from screen readers): a real button below the faces flips it (aria-expanded), the hidden face is inert, and the
     answer is announced when it shows (P2-22). A tap anywhere on the card flips it too. */
  function flipCard(host, cards, lessonId) {
    const icon = GA.icon, MD = GA.md, UI = GA.ui;
    const touch = !!(UI && UI.touch);
    const lab = on => (touch ? (on ? 'Tap to flip back' : 'Tap to flip') : (on ? 'Back to the question' : 'Show the answer'));
    let i = 0;
    const draw = () => {
      const c = cards[i];
      host.innerHTML = `<div class="lsn-flip">
          <div class="lsn-flip-in">
            <div class="lsn-fc front"><small>Flashcard ${i + 1} of ${cards.length}</small><div class="lsn-fc-t">${MD.inline(c.front)}</div></div>
            <div class="lsn-fc back" id="lsn-fc-back" inert><small>Answer</small><div class="lsn-fc-t">${MD.inline(c.back)}</div></div>
          </div>
          <button type="button" class="lsn-fc-tap" aria-expanded="false" aria-controls="lsn-fc-back">${lab(false)}</button></div>
        ${cards.length > 1 ? `<div class="lsn-flip-bar"><button type="button" class="btn sm ghost" data-fc="next">${icon('refresh')}<span>Another card</span></button></div>` : ''}`;
      const f = U.$('.lsn-flip', host), tap = U.$('.lsn-fc-tap', f), front = U.$('.front', f), back = U.$('.back', f);
      const toggle = () => {
        const on = !f.classList.contains('on');
        f.classList.toggle('on', on);
        front.inert = on; back.inert = !on;
        tap.setAttribute('aria-expanded', String(on)); tap.textContent = lab(on);
        if (on && UI && typeof UI.say === 'function') UI.say('Answer: ' + speakMd(c.back));
      };
      tap.addEventListener('click', e => { e.stopPropagation(); toggle(); });
      f.addEventListener('click', e => { if (!e.target.closest('a, button')) toggle(); });
      const nx = U.$('[data-fc="next"]', host);
      if (nx) nx.addEventListener('click', () => {
        i = (i + 1) % cards.length; draw();
        const nf = U.$('.lsn-flip', host); if (nf && !calm()) nf.classList.add('lsn-rise');
        const again = U.$('[data-fc="next"]', host); if (again) again.focus({ preventScroll: true });          // the redraw must not drop focus (P1-48)
      });
    };
    draw();
  }

  /* ============================================================ page */
  let live = [];                                                    // cleanup functions for leave()
  const track = f => live.push(f);
  const safe = (f, d) => { try { return f(); } catch (e) { return d; } };
  /** a heading's text without the hidden MathML copy KaTeX may add */
  const plain = el => { const c = el.cloneNode(true); c.querySelectorAll('.katex-mathml, .sr, annotation').forEach(x => x.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };

  /** the footer's target (P0-08): the shared next step with scope 'after:<id>' (ARCHITECTURE §10.3) when GA.stats has it, checked against the
      learning order; otherwise the same rule from GA.lessonLib.after(). -> {id, on: 'route' | 'subject', href?} or null */
  function footTarget(st, D, I, id, route, urlPath) {
    const mine = after(st, D, I, id, route), S = GA.stats;
    if (S && typeof S.nextStep === 'function') {
      const s = safe(() => S.nextStep(st, D, { kind: 'lesson', scope: 'after:' + id, I, route: urlPath || undefined }), undefined);
      if (s === null && !mine) return null;
      if (s && s.id && D.lessonById[s.id] && !isDone(st, s.id)) {
        const on = s.rule === 'route' && route ? 'route' : 'subject', seq = on === 'route' ? route.lessons : orderOf(D, I, D.lessonById[id].subject);
        if (seq.indexOf(s.id) > seq.indexOf(id)) return { id: s.id, on, href: typeof s.href === 'string' ? s.href : null };
      }
    }
    return mine;
  }

  /** a lesson whose file did not arrive (P1-59): the shared failure card when the shell has it, else an honest card with 'Try again' */
  function failed(out, meta, err) {
    const UI = GA.ui;
    if (UI && typeof UI.loadFailed === 'function') { try { UI.loadFailed(out, { what: 'lesson', retry: () => GA.router.resolve() }); return; } catch (e) { /* the card below */ } }
    // plain words (P3-42): the build hint only on file:, where the learner runs the app from its own folder (P1-59)
    const off = typeof navigator !== 'undefined' && navigator.onLine === false, dev = typeof location !== 'undefined' && location.protocol === 'file:';
    const text = off ? 'You seem to be offline. Connect, then try again.'
      : dev ? 'Its file is missing from this copy of the app. Run build.py, then try again.' : 'Its file did not arrive. Try again in a moment.';
    out.innerHTML = UI.empty('alert', 'This lesson did not load', text, '<button type="button" class="btn pop" data-retry>Try again</button>');
    const b = out.querySelector('[data-retry]');
    if (b) b.addEventListener('click', () => GA.router.resolve());
  }

  GA.views.lesson = {
    async enter(ctx, out) {
      const icon = GA.icon, esc = U.esc, MD = GA.md, UI = GA.ui, A = GA.actions;
      const D = GA.data.D, query = ctx.query || {};
      // '#/l/<id>#<heading>': the shell takes the heading off before the router sees it; if it could not (an id starting with a digit), do it here
      let id = String(ctx.params.id || ''), anchor = null;
      { const k = id.indexOf('#'); if (k >= 0) { anchor = id.slice(k + 1) || null; id = id.slice(0, k); } }
      const qv = k => { const v = query[k]; if (v == null) return ''; const s = String(v), j = s.indexOf('#'); if (j < 0) return s; anchor = anchor || s.slice(j + 1) || null; return s.slice(0, j); };
      const urlPath = qv('path'), wantFocus = qv('focus') === '1';
      const meta = D.lessonById[id];
      if (!meta) {
        const n = D.nodes[id];
        if (n) { GA.router.go(n.kind === 'sub' ? `/s/${n.subject}` : '/syllabus', n.kind === 'sub' ? { t: n.topic } : null, true); return; }
        if (GA.shell && typeof GA.shell.notFound === 'function') { GA.shell.notFound({ kind: 'lesson', id, back: { href: '#/syllabus', label: 'Open Learn' } }); return; }
        GA.shell.crumbs([['Learn', '#/syllabus'], ['Lesson not found', '#/l/' + id]]);
        out.innerHTML = UI.empty('book', 'Lesson not found', 'No lesson has this address. It may be from an older version of the app.', '<a class="btn pop" href="#/syllabus">Open Learn</a>');
        return;
      }
      const subj = D.subjectById[meta.subject], topic = D.nodes[meta.topic];
      const crumbs = [['Learn', '#/syllabus'], [subj.name, '#/s/' + subj.id], [topic.name, '#/s/' + subj.id + '?t=' + topic.id], [meta.title, '#/l/' + id]];
      GA.shell.crumbs(crumbs);
      let lesson = null, err = null;
      try { lesson = await GA.data.lesson(id); } catch (e) { err = e; }
      if (ctx.stale()) return;
      if (!lesson) { failed(out, meta, err); return; }
      A.visitLesson(id);
      // the current subject moves only when the learner chose this lesson from a subject page, a next-step coral or a route (ARCHITECTURE §10.3)
      if ((wantFocus || urlPath) && A.setProfile && (GA.store.state.profile || {}).focus !== meta.subject) A.setProfile({ focus: meta.subject });
      const st = GA.store.state, ls = st.lessons[id] || {};
      const depth = +(st.profile.depth || 2);
      const nCards = D.cards.filter(c => c.lesson === id).length;
      const I = GA.insights && GA.insights.get ? safe(() => GA.insights.get(), null) : null;
      const route = routeOf(I, st, id, urlPath);
      const pnav = route ? pathOf(route.id, id, st) : null;
      const pos = place(D, I, id);
      const facts = why(I, meta, D), pl = practiceLink(I, meta, D);
      const bankOn = !(UI && typeof UI.bankIsEmpty === 'function' ? UI.bankIsEmpty(D) : !(D.questions && D.questions.length));   // ICAI bank shipped?
      const ideas = keyIdeas(lesson.md, 3);
      const needs = meta.needs.map(n => (D.lessonById[n] ? { id: n, t: D.lessonById[n].title, done: isDone(st, n) } : null)).filter(Boolean);
      /* the body renders in parts (P1-11): the first section with the header, the rest one ### piece per task right after (body[data-full]
         marks the end); everything at once when returning (Back, reload) so the saved place exists, and up to the section of a pending
         '#heading'. Sections the reading depth hides render when they are first shown. */
      const parts = chunks(lesson.md), ropts = { sections: true, lessonId: id };
      const lvOf = q => (q.sec ? LEVEL[q.sec] || 2 : 1);
      const partOf = {}; parts.forEach((q, i) => headWords(q.md).slice(1).forEach(h => { if (!(h.id in partOf)) partOf[h.id] = i; }));
      const rc = GA.router && GA.router.current, pend = safe(() => (GA.router.pendingAnchor ? GA.router.pendingAnchor() : null), null) || anchor;
      let upto = rc && rc.back ? parts.length : Math.min(parts.length, parts.findIndex(q => q.sec) + 1 || 1);
      if (pend && partOf[pend] != null) upto = Math.max(upto, partOf[pend] + 1);
      const partHtml = i => (lvOf(parts[i]) > depth ? `<section class="lsec" id="s-${esc(parts[i].sec)}" data-sec="${esc(parts[i].sec)}" data-defer="${i}"></section>` : MD.render(parts[i].md, ropts));
      const html = parts.slice(0, upto).map((q, i) => partHtml(i)).join('');
      const labs = (meta.labs || []).map(l => D.labs.find(x => x.id === l)).filter(Boolean);
      const STR = (UI && UI.str) || {}, tierName = t => tierLabel(t, STR);
      const hw = headWords(lesson.md), lm = levelMinutes(lesson.md, meta.minutes);
      const fontsLoading = !!(document.fonts && document.fonts.status === 'loading');
      const info = I && I.lessonInfo ? safe(() => I.lessonInfo(id), null) : null, quizN = (info && info.quiz) || 0;
      const lastQ = quizLast(st, id);
      const dayOf = t => { const k = U.dayOf ? U.dayOf(t) : null; if (!k || !U.fmtDay) return U.ago(t); const thisYear = k.slice(0, 4) === String(new Date().getFullYear()); return U.fmtDay(k, thisYear ? { day: 'numeric', month: 'short' } : undefined); };

      /* ---- header: crumb, title, summary, meta + levels, 'Continue at', why it matters, key ideas, builds on (P1-10) */
      // outside the syllabus text: the status in plain words (P2-08, P2-66); the numbers are in the line below ('Why it matters')
      const flag = meta.status !== 'in' ? `<span class="lsn-flag">${icon('info')}<span>${esc(flagLabel(meta.status, STR))}</span></span>` : '';
      // each level names its minutes, from the words it shows (P2-14); on phones they are read out, not drawn
      const levels = DEPTHS.map(d => `<button type="button" class="${d[0] === depth ? 'on' : ''}" aria-pressed="${d[0] === depth}" data-depth="${d[0]}">${d[1]}<small><span class="sr">, about </span>${lm.by[d[0] - 1]} min</small><span class="sr">: ${esc(d[2].toLowerCase())}</span></button>`).join('');
      let cont = '';
      if (ls.at && ls.at.h && !ls.done) {
        const i = hw.findIndex(x => x.id === ls.at.h), left = minutesLeft(lesson.md, ls.at.h, meta.minutes);
        if (i >= 2) cont = `<p class="lsn-cont"><a href="#/l/${esc(id)}#${esc(ls.at.h)}" data-go="${esc(ls.at.h)}">${icon('arrow-r')}<span>Continue at <b>${MD.inline(hw[i].title)}</b>${left ? ` · about ${left} min left` : ''}</span></a></p>`;
      }
      const chips = needs.map(n => `<a class="lsn-need${n.done ? ' done' : ''}" href="#/l/${n.id}">${n.done ? `${icon('check')}<span class="sr">done: </span>` : ''}<span>${esc(n.t)}</span></a>`).join('');
      // with more prerequisites behind the direct ones, the whole chain is one link to the map's prerequisite path (P2-11)
      const chain = allNeeds(D, id), chainDone = chain.filter(x => isDone(st, x)).length;
      const chainHtml = chain.length > needs.length ? `<a class="lsn-chain" href="#/map?lens=prereq&amp;node=${encodeURIComponent(id)}&amp;only=1"><span>Everything to learn first: <b>${chain.length} lessons · ${esc(durText(chain.reduce((m, x) => m + (D.lessonById[x].minutes || 0), 0)))}</b>${chainDone ? ` · ${chainDone} done` : ''}</span>${icon('arrow-r')}</a>` : '';
      const needsHtml = needs.length ? `<div class="lsn-needs"><span>Builds on</span>${chips}${chainHtml}</div>
          <details class="lsn-needs-m"><summary><span>${esc(needsLine(needs))}</span>${icon('chev-d')}</summary><div class="lsn-needs-l">${chips}${chainHtml}</div></details>` : '';

      /* ---- footer: where you are, the next lesson in the learning order (the screen's one coral) or the subject's end (P0-08, P1-02, P1-06, P1-08) */
      const tgt = footTarget(st, D, I, id, route, urlPath), target = tgt ? tgt.id : null;
      const seq = route ? route.lessons : pos.ids, at = seq.indexOf(id);
      const succ = at >= 0 && at + 1 < seq.length ? seq[at + 1] : null, prevId = at > 0 ? seq[at - 1] : null;
      const href = x => '#/l/' + x + (route ? '?path=' + encodeURIComponent(route.id) : '');          // links along a route keep it
      const nextHref = tgt ? tgt.href || (tgt.on === 'route' ? href(target) : '#/l/' + target) : null;
      const quiet = () => {
        const q = [], S = GA.store.state;
        if (succ && succ !== target) {
          const sm = D.lessonById[succ], note = isDone(st, succ) ? ` <span class="lsn-q-ok">· ${icon('check')}done</span>` : inSyl(sm) ? '' : ' <span class="lsn-q-ok">· outside the syllabus</span>';
          q.push(`<a class="lsn-q" href="${href(succ)}"><span>${route ? 'Next on the route:' : 'Next in order:'}</span> <b>${esc(sm.title)}</b>${note}</a>`);
        }
        if (route && tgt && tgt.on === 'subject') q.push(`<span class="lsn-q lsn-q-t">Nothing unread after this one on ${esc(route.title)}</span>`);
        if (!target) {
          const ns = nextSubject(S || st, D, I, meta.subject);
          if (ns) q.push(`<a class="lsn-q" href="#/l/${ns.lesson}?focus=1"><span>Next subject:</span> <b>${esc(ns.name)}</b></a>`);
          q.push(`<a class="lsn-q" href="#/s/${subj.id}"><span>Back to</span> <b>${esc(subj.name)}</b></a>`);
        }
        return q.length ? `<div class="lsn-qs">${q.join('')}</div>` : '';
      };
      const nextHtml = () => {
        const S = GA.store.state;
        if (target) {
          const t = D.lessonById[target], tp = tgt.on === 'route' ? null : place(D, I, target);
          const kicker = tgt.on === 'route' ? `Next on ${esc(route.title)} · step ${route.lessons.indexOf(target) + 1} of ${route.lessons.length}` : `Next lesson · ${tp.inTopic} of ${tp.ofTopic} in ${esc(D.nodes[t.topic].name)}`;
          return `<div class="lsn-next"><div class="lsn-next-t"><span class="lsn-k">${kicker}</span>
              <h3>${esc(t.title)}</h3><span class="lsn-next-m">${t.minutes} min · ${esc(tierName(t.tier))}</span></div>
              <a class="btn pop lg" href="${esc(nextHref)}"><span>Next lesson</span>${icon('arrow-r')}</a></div>`;
        }
        const tl = tally(S, D, meta.subject, I), all = tl.lessons > 0 && tl.done === tl.lessons;
        const rest = pos.ids.slice(pos.step), restOut = rest.length && rest.every(x => !inSyl(D.lessonById[x]));
        const kick = !rest.length ? `Last lesson in ${esc(subj.name)}` : restOut ? `Last lesson in the ${esc(subj.name)} syllabus` : `Nothing unread after this one in ${esc(subj.name)}`;
        const peak = all && GA.mascot && GA.mascot.svg ? `<span class="lsn-end-m" aria-hidden="true">${safe(() => GA.mascot.svg({ size: 64, gaze: 'right', mood: 'happy' }), '')}</span>` : '';
        return `<div class="lsn-next lsn-end${peak ? ' has-m' : ''}">${peak}<div class="lsn-next-t">
            <span class="lsn-k">${kick}</span><h3>End of ${esc(subj.name)}</h3>
            ${all ? `<p class="lsn-end-say">All ${tl.lessons} lessons understood. ${bankOn ? 'Now see how ICAI asks them.' : 'Now fix them in memory with the flashcards.'}</p>` : ''}
            <dl class="lsn-tally"><div><dt>understood</dt><dd><b>${tl.done}</b> of ${tl.lessons} lessons</dd></div>
              ${tl.checks ? `<div><dt>self-checks right</dt><dd><b>${tl.right}</b> of ${tl.checks} answered</dd></div>` : `<div><dt>self-checks answered</dt><dd><b>0</b>${tl.checksTotal ? ` of ${tl.checksTotal}` : ''}</dd></div>`}
              ${bankOn ? `<div><dt>ICAI questions tried</dt><dd><b>${U.nf(tl.tried)}</b> of ${U.nf(tl.pyqs)}</dd></div>` : ''}</dl></div>
            ${bankOn ? `<a class="btn pop lg" href="#/pyq?subject=${subj.id}"><span>Practise ${esc(U.medName ? U.medName(subj.name) : subj.name)} questions</span>${icon('arrow-r')}</a>`
              : `<a class="btn pop lg" href="#/flash/${subj.id}"><span>Review the ${esc(U.medName ? U.medName(subj.name) : subj.name)} flashcards</span>${icon('arrow-r')}</a>`}</div>`;
      };
      // Previous is a quiet one-line link right under the finish card (P2-15); where you are sits beside it (P1-08)
      const prevHtml = prevId ? `<a class="lsn-prev" href="${href(prevId)}">${icon('arrow-l')}<span>${route ? 'Previous on the route' : 'Previous'}: <b>${esc(D.lessonById[prevId].title)}</b></span></a>` : '';
      const stepHtml = route ? `Step ${at + 1} of ${seq.length} on ${esc(route.title)}` : `Step ${pos.step} of ${pos.steps} in ${esc(subj.name)}`;
      const ps = practiceSet(st, D, meta, pl);
      // 'ICAI asked this' (docs/ICAI_BANK.md §5): the ICAI items tagged to this lesson, with the documents that asked them
      const ip = bankOn ? icaiPractice(st, D, id) : null;
      const icaiHtml = !ip || !ip.bank ? '' : ip.n
        ? `<section class="ga-pyq-embed lsn-icai" data-ids="${esc(ip.ids.join(' '))}" aria-labelledby="lsn-icai-h"><header><b id="lsn-icai-h">${icon('target')} ICAI asked this</b><span>${U.plural(ip.n, 'item')}${ip.tried ? ` · ${U.nf(ip.got)} got right` : ''}</span></header>
            <p class="lsn-icai-att">${ip.attempts.slice(0, 6).map(esc).join(' · ')}${ip.attempts.length > 6 ? ` · ${ip.attempts.length - 6} more` : ''}</p>
            <div class="pq-list"></div>
            <div class="lsn-icai-f"><a class="btn" href="#/pyq?sub=${encodeURIComponent(id)}&amp;practise=${Math.min(10, ip.n)}">${icon('play')}<span>Practise ${ip.n > 10 ? 'the first 10' : ip.n === 1 ? 'it' : 'these ' + ip.n}</span></a><a class="link" href="#/pyq?sub=${encodeURIComponent(id)}">Open in the bank</a></div></section>`
        : `<div class="lsn-icai lsn-icai-none"><p>${icon('info')}<span>No ICAI item in the bank is tagged to this lesson yet. The bank holds ${U.plural(ip.bank, 'item')} from ${U.plural(ip.docsInBank, 'ICAI document')} so far; more RTPs, MTPs and past papers are being added.</span></p></div>`;
      const canReport = !!(UI && (typeof UI.report === 'function' || typeof UI.modal === 'function'));

      out.innerHTML = `<article class="lsn" style="--h:${subj.hue}" aria-labelledby="lsn-title">
          ${pathBar(pnav)}
          <header class="lsn-head">
            <nav class="lsn-crumb" data-crumbs aria-label="Breadcrumb"><a href="#/s/${subj.id}">${esc(subj.name)}</a>${icon('chev-r')}<a href="#/s/${subj.id}?t=${topic.id}">${esc(topic.name)}</a></nav>
            <h1 id="lsn-title" tabindex="-1">${esc(meta.title)}</h1>
            <p class="lsn-sum">${esc(meta.summary)}</p>
            <div class="lsn-meta"><span>${icon('clock')}<span data-lv-min>${lm.by[depth - 1]} min</span></span><span class="lsn-sep"></span><span>${esc(tierName(meta.tier))}</span>${nCards ? `<span class="lsn-sep"></span><span>${nCards} flashcard${nCards === 1 ? '' : 's'}</span>` : ''}${flag}<span class="lsn-meta-ok" data-meta-ok hidden></span>
              <div class="lsn-level" role="group" aria-label="Reading depth"><span class="lsn-level-ind" aria-hidden="true"></span>${levels}</div></div>
            ${cont}
            ${facts ? `<div class="lsn-why${facts.scope === 'out' ? ' out' : ''}"><span class="lsn-why-ic" aria-hidden="true">${icon(facts.scope === 'out' ? 'info' : 'chart')}</span><p>${facts.scope === 'out' ? '' : '<span class="lsn-why-k">Why it matters:</span> '}${whyHtml(facts)}</p></div>` : ''}
            ${ideas.length ? `<section class="lsn-ideas" aria-labelledby="lsn-ideas-h"><h2 id="lsn-ideas-h">Key ideas</h2><ol>${ideas.map(t => `<li><span>${MD.inline(t)}</span></li>`).join('')}</ol></section>` : ''}
            ${needsHtml}
          </header>
          <div class="lsn-sbar-w"><button type="button" class="lsn-sbar" aria-haspopup="dialog" aria-expanded="false" aria-label="On this page: open the contents">
            <span class="lsn-sbar-t" data-sbar-t>On this page</span><span class="lsn-sbar-n" data-sbar-n></span>${icon('list')}</button></div>
          <div class="lsn-rail"><nav class="lsn-toc" aria-label="On this page"><div class="lsn-toc-h"><span>On this page</span><span class="lsn-toc-n" data-toc-n></span></div>
            <ol id="outline" class="lsn-toc-l"></ol></nav></div>
          <div class="md lesson lsn-body" data-depth="${depth}" id="lesson-body">${html}</div>
          <footer class="lsn-foot">
            <p class="lsn-intu">You read the ${esc(DEPTHS[0][1])} version (about ${lm.by[0]} of ${lm.by[2]} min). <button type="button" class="lsn-intu-b" data-read-all>Read the full lesson</button></p>
            <section class="lsn-fin${target ? '' : ' is-end'}" aria-labelledby="lsn-fin-h"><h2 class="sr" id="lsn-fin-h">Finish this lesson</h2>
              <div class="lsn-fin-rec${ls.done ? ' is-done' : ''}"><button type="button" class="btn" id="done"></button><p class="lsn-fin-chk" data-chk></p><p class="lsn-done-t"></p></div>
              <div class="lsn-next-w">${nextHtml()}</div>
            </section>
            ${quiet()}
            ${prevHtml || stepHtml ? `<div class="lsn-foot-nav">${prevHtml}<span class="lsn-step">${stepHtml}</span></div>` : ''}
            <section class="lsn-more" aria-labelledby="lsn-more-h"><h2 class="lsn-more-h" id="lsn-more-h">Practise more</h2>
            ${icaiHtml}
            <div class="lsn-foot-g${nCards ? '' : ' no-cards'}">
              <div class="lsn-links">
                ${bankOn && pl.n && !(ip && ip.n && pl.scope === 'sub') ? `<a class="lsn-link" href="${pl.href}"><span class="lsn-link-ic">${icon('target')}</span><span class="lsn-link-t"><b>Related ICAI questions</b><small>${esc(pl.note)}${ps.solved ? ` · solved ${U.nf(ps.solved)} of ${U.nf(pl.n)}` : ''}</small></span><span class="lsn-link-n">${U.nf(pl.n)}</span></a>`
                  : `<div class="lsn-link is-wait"><span class="lsn-link-ic">${icon('target')}</span><span class="lsn-link-t"><b>ICAI questions</b><small>${esc(UI && UI.str && UI.str.bankEmpty ? UI.str.bankEmpty : 'ICAI past papers, RTPs and MTPs are being added')}</small></span></div>`}
                ${labs.map(l => `<a class="lsn-link" href="#/lab/${l.id}"><span class="lsn-link-ic">${icon('flask')}</span><span class="lsn-link-t"><b>${esc(l.title)}</b><small>Interactive lab</small></span>${icon('arrow-r')}</a>`).join('')}
                ${nCards ? `<a class="lsn-link" href="#/flash/${esc(id)}"><span class="lsn-link-ic">${icon('cards')}</span><span class="lsn-link-t"><b>This lesson's flashcards</b><small>Review them with spaced repetition</small></span><span class="lsn-link-n">${nCards}</span></a>` : ''}
              </div>
              ${nCards ? `<div class="lsn-cards" id="lsn-cards"><div class="lsn-flip-ph" aria-hidden="true"></div></div>` : ''}
            </div></section>
            ${canReport ? `<p class="lsn-rep"><button type="button" class="lsn-rep-b" data-report>${icon('flag')}<span>Report a problem with this lesson</span></button></p>` : ''}
          </footer>
        </article>`;

      const root = U.$('.lsn', out), head = U.$('.lsn-head', root), body = U.$('#lesson-body', root);
      let redrawChk = () => {};                                               // the finish card's self-check line (set once the footer is wired)
      GA.shell.crumbs(crumbs);                                       // the shell hosts them in the header's <nav data-crumbs> now that it exists
      // heading ids are anchors (contents, the saved position, '#/l/<id>#<heading>'): unique on the page, the same rule for the contents and the DOM
      const used = new Set(), idMap = {};
      const uniq = x => { let y = x, n = 2; while (used.has(y)) y = x + '-' + n++; used.add(y); return y; };
      parts.forEach((q, i) => headWords(q.md).slice(1).forEach(h => ((idMap[i] = idMap[i] || []).push([h.id, uniq(h.id)]))));
      // a heading's id on the page -> its markdown title: the section bar renders it like the contents list (maths included)
      const titleOf = {}, headCache = {};
      parts.forEach((q, i) => headWords(q.md).slice(1).forEach((h, k) => { const r = (idMap[i] || [])[k]; titleOf[r ? r[1] : h.id] = h.title; }));
      const headHtml = el => (el.id in headCache ? headCache[el.id] : (headCache[el.id] = titleOf[el.id] != null ? MD.inline(titleOf[el.id]) : esc(plain(el))));
      const headSay = el => (titleOf[el.id] != null ? speakMd(titleOf[el.id]) : plain(el));
      const H = [];                                                           // the rendered sections, in order: {sec, h, lv, subs}
      const scan = () => { H.length = 0; U.$$(':scope > .lsec', body).forEach(sec => { const h = U.$(':scope > h2', sec); if (h) H.push({ sec, h, lv: +sec.dataset.lv, subs: U.$$(':scope > h3', sec) }); }); };
      /** a part (or a piece of it) just put on the page: its level and unique heading ids; widgets are hydrated before the nodes go in */
      const markPart = (sec, i) => {
        sec.dataset.lv = lvOf(parts[i]); sec.dataset.part = i;
        const ren = idMap[i] || [];
        U.$$(':scope > h2[id], :scope > h3[id]', sec).forEach((h, k) => { const r = ren[k]; if (r && r[0] === h.id && r[1] !== h.id) h.id = r[1]; });
        // the deep-dive at Standard: a one-line closed row in its slot, 'Under the hood · 2 min · Show' (P2-14; CSS shows it at Standard only)
        if (lvOf(parts[i]) === 3 && !(sec.previousElementSibling && sec.previousElementSibling.classList.contains('lsn-uth'))) {
          sec.insertAdjacentHTML('beforebegin', `<div class="lsn-uth" data-uth="${i}"${shown.has(i) ? ' hidden' : ''}><span class="lsn-uth-t"><b>${MD.inline(parts[i].title || '')}</b> · ${lm.sec[parts[i].sec] || 1} min</span>` +
            `<button type="button" class="btn sm" data-uth-show aria-controls="${esc(sec.id)}" aria-expanded="false">Show<span class="sr"> ${esc(speakMd(parts[i].title || ''))}</span></button></div>`);
        }
      };
      /* 'Check yourself' sits at the end of Worked examples, as in the approved mockup, else first inside Practice (P2-16; view-only). The
         Practice part arrives after Worked examples, so its quiz moves before it is ever drawn in Practice. */
      const quizPart = parts.findIndex(q => /^\s*:{3,}\s*quiz\b/m.test(q.md));
      if (quizPart >= 0) partOf['lsn-check'] = quizPart;
      const moveQuiz = (root, i) => {
        U.$$('.ga-quiz', root).forEach((qz, k) => {
          if (!k && !document.getElementById('lsn-check')) { qz.id = 'lsn-check'; qz.tabIndex = -1; }
          if (!parts[i] || parts[i].sec !== 'practice' || qz.dataset.moved) return;
          qz.dataset.moved = '1';
          const we = U.$(':scope > .lsec[data-sec="worked-examples"]:not([data-defer])', body);
          if (we) { we.append(qz); return; }
          const pr = (root.matches && root.matches('.lsec') ? root : U.$('.lsec[data-sec="practice"]', root)) || U.$(':scope > .lsec[data-sec="practice"]', body), h = pr && U.$(':scope > h2', pr);
          if (h && h !== qz.previousElementSibling) h.after(qz);
        });
      };
      const hydrateIn = (root, i) => { hydrateQuiz(root, id); hydratePyq(root, { pl, track }); hydrateLabs(root, track); groupBoxes(root); moveQuiz(root, i); };
      { const im = U.$('.lsn-icai[data-ids]', root); if (im) hydratePyq(im.parentNode, { track }); }    // 'ICAI asked this' in the footer
      const shown = new Set();                                                // the deep-dive parts opened at Standard in this visit (part indices)
      U.$$(':scope > .lsec', body).forEach((sec, k) => { const i = +(sec.dataset.defer != null ? sec.dataset.defer : k + (parts[0] && !parts[0].sec ? 1 : 0)); markPart(sec, i); if (sec.dataset.defer == null) hydrateIn(sec, i); });
      scan();
      const tocItems = parts.map((q, i) => {
        if (!q.sec) return '';
        const hs = idMap[i] || [], h2 = hs[0] ? hs[0][1] : q.sec, subs = headWords(q.md).slice(1).map((h, k) => ({ h, uid: hs[k] ? hs[k][1] : h.id })).filter(x => x.h.lv === 3);
        return `<li data-lv="${lvOf(q)}" data-s="${esc(h2)}"><a href="#/l/${esc(id)}#${esc(h2)}" data-go="${esc(h2)}"><i aria-hidden="true"></i><span>${MD.inline(q.title)}</span></a>` +
          (subs.length ? `<ol class="lsn-toc-s">${subs.map(x => `<li><a href="#/l/${esc(id)}#${esc(x.uid)}" data-go="${esc(x.uid)}"><span>${MD.inline(x.h.title)}</span></a></li>`).join('')}</ol>` : '') + '</li>';
      }).join('');
      const items = tocItems;
      U.$('#outline', root).innerHTML = items;
      // 'Continue at' a section the depth hides: gone, except the deep-dive at Standard, which the jump opens in place
      { const c = U.$('.lsn-cont a', head); if (c) { const i = partOf[c.dataset.go]; if (i == null || (lvOf(parts[i]) > depth && !(depth === 2 && lvOf(parts[i]) === 3))) c.parentElement.remove(); } }

      /* ---- the rest of the body, one piece (a ### stretch) per task; ensure(i) puts every part up to i on the page at once (a jump, printing) */
      let nextPart = upto, partial = null, pumpT = 0;
      const frag = h => { const t = document.createElement('template'); t.innerHTML = h; return t.content; };
      const startPart = i => {                                              // part i's first piece at the end of the body (parts arrive in order)
        if (lvOf(parts[i]) > depth) { const f = frag(partHtml(i)), ph = f.firstElementChild; if (ph) { body.append(f); markPart(ph, i); } return null; }
        const ps = pieces(parts[i].md), f = frag(MD.render(ps[0], ropts)), sec = f.firstElementChild;
        if (!sec) return null;
        hydrateIn(f, i); body.append(f); markPart(sec, i);
        if (ps.length > 1) partial = { i, sec, rest: ps.slice(1) };
        return sec;
      };
      const addPiece = () => {                                              // the next piece of the part being put on the page
        const p = partial, f = frag(MD.render(p.rest.shift(), ropts));
        hydrateIn(f, p.i); p.sec.append(f); markPart(p.sec, p.i);
        if (!p.rest.length) partial = null;
        return p.sec;
      };
      const full = () => { if (!partial && nextPart >= parts.length && !body.hasAttribute('data-full')) { body.setAttribute('data-full', ''); redrawChk(); } };   // every part is on the page
      const ensure = i => {
        const added = new Set();
        while (partial && partial.i <= i) added.add(addPiece());
        while (nextPart <= i && nextPart < parts.length) { const sec = startPart(nextPart++); if (sec) added.add(sec); while (partial) added.add(addPiece()); }
        if (added.size) { scan(); lastKey = ''; added.forEach(x => fitAll(x)); }
        full();
      };
      const pump = () => {
        pumpT = 0;
        if (!body.isConnected) return;
        let sec = null;
        if (partial) sec = addPiece(); else if (nextPart < parts.length) sec = startPart(nextPart++); else return;
        scan(); lastKey = '';
        if (sec) requestAnimationFrame(() => { if (sec.isConnected) fitAll(sec); onScroll(); });
        if (partial || nextPart < parts.length) pumpT = setTimeout(pump, 16); else full();
      };
      if (nextPart < parts.length) pumpT = setTimeout(pump, 0); else full();
      track(() => clearTimeout(pumpT));
      /** depth-hidden parts render when the depth first shows them (or, for the deep-dive at Standard, when its row is opened) */
      const renderPh = ph => {
        const i = +ph.dataset.defer, tmp = document.createElement('div'); tmp.innerHTML = MD.render(parts[i].md, ropts);
        const sec = tmp.firstElementChild; if (!sec) return ph;
        if (ph.classList.contains('lsn-shown')) sec.classList.add('lsn-shown');
        hydrateIn(sec, i); ph.replaceWith(sec); markPart(sec, i); fitAll(sec);
        return sec;
      };
      const showDeferred = d => {
        U.$$(':scope > .lsec[data-defer]', body).forEach(ph => { if (lvOf(parts[+ph.dataset.defer]) <= d) renderPh(ph); });
        scan(); lastKey = '';
      };
      /** open the deep-dive in place at Standard (this visit only; the depth stays): its row goes, the section and its contents entry show */
      const reveal = (sec, focus) => {
        if (!sec) return null;
        if (sec.dataset.defer != null) sec = renderPh(sec);
        sec.classList.add('lsn-shown'); shown.add(+sec.dataset.part);
        const row = sec.previousElementSibling; if (row && row.classList.contains('lsn-uth')) row.hidden = true;
        applyLv(+body.dataset.depth); scan(); fitAll(sec); lastKey = ''; tick();
        const h = U.$(':scope > h2', sec);
        if (focus && h) { if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
        return sec;
      };
      U.on(body, 'click', '[data-uth-show]', (e, b) => { const row = b.closest('.lsn-uth'); reveal(row && row.nextElementSibling, true); });

      /* ---- jumps (contents, the section sheet, 'Continue at'): scroll to the heading and move focus there (P1-09, P1-48) */
      let quietUntil = 0;
      /* the jump is instant and then held on the heading for ~1.5 s while labs, cards and figures above it finish growing (a smooth scroll
         aims at where the heading was when it started); any wheel, touch, key or pointer of the learner's lets go at once */
      let unhold = null;
      const hold = t => {
        if (unhold) unhold();
        let n = 0, timer = 0;
        const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
        const quit = () => { clearTimeout(timer); evs.forEach(ev => removeEventListener(ev, quit, true)); if (unhold === quit) unhold = null; };
        const step = () => {
          if (!t.isConnected) return quit();
          const d = t.getBoundingClientRect().top - (parseFloat(getComputedStyle(t).scrollMarginTop) || 0);
          if (Math.abs(d) > 2) { quietUntil = Date.now() + 300; scrollBy(0, d); }
          if (++n < 15) timer = setTimeout(step, 100); else quit();
        };
        evs.forEach(ev => addEventListener(ev, quit, { capture: true, passive: true }));
        unhold = quit; timer = setTimeout(step, 100);
      };
      track(() => { if (unhold) unhold(); });
      const jump = hid => {
        if (hid && partOf[hid] != null) {
          const pi = partOf[hid];
          ensure(pi);
          // a heading inside the deep-dive at Standard (a saved place, an anchor): open it in place first
          if (lvOf(parts[pi]) === 3 && +body.dataset.depth === 2) { const sec = U.$(`:scope > .lsec[data-part="${pi}"]`, body); if (sec && !sec.classList.contains('lsn-shown')) reveal(sec, false); }
        }
        const t = hid && document.getElementById(hid);
        if (!t || !body.contains(t)) return false;
        quietUntil = Date.now() + 900;                                   // a scroll the page makes must not pop the section bar
        if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
        t.scrollIntoView({ block: 'start' });
        try { t.focus({ preventScroll: true }); } catch (e) { /* old browsers */ }
        hold(t);
        return true;
      };
      U.on(root, 'click', '[data-go]', (e, a) => { e.preventDefault(); jump(a.dataset.go); });

      /* ---- depth (Intuition / Standard / Deep) with a sliding marker; newly shown sections get the fit pass (P2-67) */
      const lv = U.$('.lsn-level', root), ind = U.$('.lsn-level-ind', root);
      const place_ = () => { const on = U.$('button.on', lv); if (!on || !on.offsetWidth) return; ind.style.transform = `translateX(${on.offsetLeft - 4}px)`; ind.style.width = on.offsetWidth + 'px'; };
      const lists = () => [U.$('#outline', root)].concat(sheet ? [U.$('.lsn-toc-l', sheet)] : []).filter(Boolean);
      const applyLv = d => lists().forEach(ol => U.$$(':scope > li', ol).forEach(li => (li.hidden = +li.dataset.lv > d && !(d === 2 && shown.has(partOf[li.dataset.s])))));
      /* measure: false while the page is being built, so the first frame does one read-then-write pass instead of one per step (P1-11) */
      const applyDepth = (d, refit, measure = true) => {
        body.dataset.depth = d;
        U.$$('.lsn-level [data-depth]', root).forEach(x => { const on = +x.dataset.depth === d; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
        { const m = U.$('[data-lv-min]', root); if (m) m.textContent = lm.by[d - 1] + ' min'; }      // the meta row's minutes follow the depth (P2-14)
        redrawChk();
        applyLv(d);
        if (U.$(':scope > .lsec[data-defer]', body)) showDeferred(d);
        if (refit) fitAll(body);
        if (measure) { place_(); lastKey = ''; tick(); }
      };
      U.on(root, 'click', '.lsn-level [data-depth]', (e, b) => {
        const d = +b.dataset.depth; if (+body.dataset.depth === d) return;
        A.setProfile({ depth: d }); applyDepth(d, true);
        if (!calm()) { body.classList.remove('lsn-rise'); void body.offsetWidth; body.classList.add('lsn-rise'); }
      });
      // the closing line at Intuition: 'Read the full lesson' switches to Deep and goes to the first section that Intuition left out (P2-14)
      U.on(root, 'click', '[data-read-all]', () => {
        A.setProfile({ depth: 3 }); applyDepth(3, true);
        const first = H.find(x => x.lv >= 2);
        if (first) jump(first.h.id);
      });
      body.addEventListener('toggle', e => { const dt = e.target; if (dt && dt.tagName === 'DETAILS' && dt.open) requestAnimationFrame(() => { if (dt.isConnected) fitAll(dt); }); }, true);

      /* ---- the section bar (<= 1000 px, D3) and its contents sheet */
      const sbarW = U.$('.lsn-sbar-w', root), sbar = U.$('.lsn-sbar', root), sbarT = U.$('[data-sbar-t]', root), sbarN = U.$('[data-sbar-n]', root);
      /** a transformed ancestor would pin the fixed bar to itself instead of the viewport: then the bar moves to <body> (its listeners go with it).
          Run in the first frame, after the page has been laid out once anyway. */
      const keepBarFixed = () => {
        for (let x = sbarW.parentElement; x && x !== document.body; x = x.parentElement) {
          const cs = getComputedStyle(x);
          if (cs.transform !== 'none' || cs.filter !== 'none' || cs.perspective !== 'none' || /paint|layout|strict|content/.test(cs.contain || '') || /transform/.test(cs.willChange || '')) { document.body.append(sbarW); track(() => sbarW.remove()); break; }
        }
      };
      let sheet = null, sheetFrom = null, ovId = null, inerted = false;
      const onSheetKey = e => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); dismiss(); return; }
        if (e.key !== 'Tab' || !sheet) return;
        const f = U.$$('a[href], button:not([disabled])', sheet).filter(x => x.getClientRects().length);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      function closeSheet(restore) {
        if (!sheet) return;
        sheet.remove(); sheet = null; ovId = null;
        document.documentElement.classList.remove('lsn-lock');
        if (inerted) { const app = document.getElementById('app'); if (app) app.removeAttribute('inert'); inerted = false; }
        sbar.setAttribute('aria-expanded', 'false'); sbarOn = true; sbar.classList.add('on');
        // measure again before focus comes back: the section bar and the reading bar sit under the top bar at once, not after the next scroll
        if (body.isConnected) { lastKey = ''; tick(); }
        if (restore !== false && sheetFrom && sheetFrom.isConnected) { try { sheetFrom.focus({ preventScroll: true }); } catch (e) { /* gone */ } }
      }
      function dismiss(forJump) {
        if (!sheet) return;
        if (ovId != null && UI.overlay && typeof UI.overlay.pop === 'function') safe(() => UI.overlay.pop(ovId));
        closeSheet(!forJump);
      }
      function openSheet() {
        if (sheet) return;
        sheetFrom = document.activeElement && document.activeElement !== document.body ? document.activeElement : sbar;   // focus comes back here
        sheet = document.createElement('div');
        sheet.className = 'lsn-sheet-root';
        sheet.innerHTML = `<div class="lsn-scrim" data-close></div><div class="lsn-sheet" role="dialog" aria-modal="true" aria-labelledby="lsn-sheet-h">
            <div class="lsn-sheet-grab" aria-hidden="true"></div>
            <div class="lsn-sheet-h"><h2 id="lsn-sheet-h">On this page</h2><span class="lsn-toc-n" data-toc-n></span><button type="button" class="btn icon sm ghost" data-close aria-label="Close the contents">${icon('x')}</button></div>
            <ol class="lsn-toc-l">${items}</ol></div>`;
        document.body.append(sheet);
        applyLv(+body.dataset.depth);
        document.documentElement.classList.add('lsn-lock');
        const app = document.getElementById('app'); if (app && !app.hasAttribute('inert')) { app.setAttribute('inert', ''); inerted = true; }
        sbar.setAttribute('aria-expanded', 'true');
        U.on(sheet, 'click', '[data-close]', () => dismiss());
        U.on(sheet, 'click', '[data-go]', (e, a) => { e.preventDefault(); const go = a.dataset.go; dismiss(true); setTimeout(() => jump(go), 60); });
        sheet.addEventListener('keydown', onSheetKey);
        if (UI.overlay && typeof UI.overlay.push === 'function') { const r = safe(() => UI.overlay.push({ id: 'lsn-toc', close: () => closeSheet() }), null); ovId = r == null ? null : r; }
        lastKey = ''; tick();
        requestAnimationFrame(() => { if (!sheet) return; const c = U.$('a[aria-current]', sheet) || U.$('a[data-go]', sheet); if (c) { c.scrollIntoView({ block: 'nearest' }); c.focus({ preventScroll: true }); } });
      }
      sbar.addEventListener('click', openSheet);
      track(() => closeSheet(false));

      /* ---- reading progress: the bar under the nav, the contents, the current section, the section bar, the saved position (P1-01) */
      const bar = document.createElement('div');
      bar.className = 'lsn-readbar'; bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-label', 'Reading progress'); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', '100');
      bar.innerHTML = '<i></i>';
      document.body.appendChild(bar);
      track(() => bar.remove());
      const t0 = Date.now();
      /* the saved position (readAt): only once the visit has moved off the heading it landed on, never the first section, never in the first 20 s.
         A visit lands where it opens: the top, or Back's place / a '#heading' that the router and the shell hold for ~1.5 s, so on those the start
         follows the page until the learner's first wheel, touch, key or pointer, or 3 s */
      let savedH = (ls.at && ls.at.h) || null, curH = null, saveT = 0, rs = { start: null, moved: false };
      let landed = !((rc && rc.back) || pend), landT = 0;
      const LAND = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
      const unland = () => { clearTimeout(landT); LAND.forEach(ev => removeEventListener(ev, land, true)); };
      const land = () => { landed = true; unland(); };
      if (!landed) { LAND.forEach(ev => addEventListener(ev, land, { capture: true, passive: true })); landT = setTimeout(land, 3000); }
      const atNow = h => readAt(rs, { h, landed, first: H[0] ? H[0].h.id : null, saved: savedH, ms: Date.now() - t0 });
      const flushAt = () => { clearTimeout(saveT); saveT = 0; const r = curH && A.setLessonAt ? atNow(curH) : null; if (r && r.save) { A.setLessonAt(id, r.save); savedH = r.save; } };
      const noteHeading = h => {
        if (!A.setLessonAt || !h) return;
        curH = h;
        const r = atNow(h); rs = { start: r.start, moved: r.moved };
        if (r.save && !saveT) saveT = setTimeout(flushAt, 1500);
      };
      track(unland); track(flushAt);
      let raf = 0, lastKey = '', lastY = null, upAcc = 0, downAcc = 0, sbarOn = false;              // lastY is read in the first tick: scrollY forces a layout
      function paint(vis, k, cur, h3) {
        const idx = {}; vis.forEach((x, i) => (idx[x.h.id] = i));
        const curId = cur ? cur.h.id : null, here = h3 ? h3.id : curId;
        lists().forEach(ol => {
          U.$$(':scope > li', ol).forEach(li => {
            const i = idx[li.dataset.s], on = li.dataset.s === curId, a = li.firstElementChild;
            li.classList.toggle('open', on); a.classList.toggle('cur', on); a.classList.toggle('seen', i != null && i < k);
          });
          U.$$('a[data-go]', ol).forEach(a => { if (a.dataset.go === here) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
          U.$$('.lsn-toc-s a', ol).forEach(a => a.classList.toggle('cur', !!h3 && a.dataset.go === h3.id));
        });
        const n = vis.length ? `${k + 1} of ${vis.length}` : '';
        U.$$('[data-toc-n]', root).concat(sheet ? U.$$('[data-toc-n]', sheet) : []).forEach(x => (x.textContent = n));
        // the bar shows the headings as the contents list does (maths through MD.inline, never flattened text: '$10^9$' must not show '109');
        // its name starts with the words it shows (label in name, P3-06), the maths spoken from the TeX (a button's name leaves KaTeX's MathML out)
        sbarT.innerHTML = cur ? `<b>${headHtml(cur.h)}</b>${h3 ? `<span> › ${headHtml(h3)}</span>` : ''}` : '<b>On this page</b>';
        sbarN.textContent = vis.length ? `${k + 1}/${vis.length}` : '';
        sbar.setAttribute('aria-label', cur ? `${headSay(cur.h)}${h3 ? ', ' + headSay(h3) : ''}, section ${k + 1} of ${vis.length}. Open the contents` : 'On this page: open the contents');
      }
      function tick() {
        raf = 0;
        if (!body.isConnected) return;
        // reads first ...
        const top = navBottom(), h = innerHeight, y = scrollY;
        const p = progressOf(body.getBoundingClientRect(), top, h);
        const dd = +body.dataset.depth, vis = H.filter(x => x.lv <= dd || (dd === 2 && x.sec.classList.contains('lsn-shown'))), line = top + Math.min(160, h * 0.3);
        let k = 0;
        vis.forEach((x, i) => { if (x.sec.getBoundingClientRect().top <= line) k = i; });
        if (p >= 0.999) k = Math.max(0, vis.length - 1);
        const cur = vis[k] || null;
        let h3 = null;
        if (cur) for (const s of cur.subs) { if (s.getBoundingClientRect().top <= line) h3 = s; else break; }
        const headGone = head.getBoundingClientRect().bottom < top + 8;
        // ... then writes
        root.style.setProperty('--lsn-top', top + 'px');
        bar.style.top = top + 'px';
        bar.firstChild.style.transform = `scaleX(${p.toFixed(4)})`;
        bar.setAttribute('aria-valuenow', String(Math.round(p * 100)));
        const key = (cur ? cur.h.id : '') + '|' + (h3 ? h3.id : '') + '|' + k + '|' + vis.length;
        if (key !== lastKey) { lastKey = key; paint(vis, k, cur, h3); }
        // the section bar shows on scroll-up once the header is out of view and hides on scroll-down (D3); never because the page scrolled itself
        const dy = lastY == null ? 0 : y - lastY; lastY = y;
        if (Date.now() >= quietUntil) { if (dy < 0) { upAcc -= dy; downAcc = 0; } else if (dy > 0) { downAcc += dy; upAcc = 0; } }
        if (sheet) sbarOn = true; else if (!headGone) sbarOn = false; else if (upAcc > 24) sbarOn = true; else if (downAcc > 12) sbarOn = false;
        sbar.style.top = (top + 4) + 'px';
        sbar.classList.toggle('on', sbarOn);
        if (cur) noteHeading(here(cur, h3));
      }
      const here = (cur, h3) => (h3 || cur.h).id;
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
      document.addEventListener('scroll', onScroll, { passive: true, capture: true });
      addEventListener('resize', onScroll, { passive: true });
      const onResize = U.debounce(() => { place_(); fitAll(root); }, 120); addEventListener('resize', onResize);
      track(() => { document.removeEventListener('scroll', onScroll, { capture: true }); removeEventListener('resize', onScroll); removeEventListener('resize', onResize); if (raf) cancelAnimationFrame(raf); });
      applyDepth(depth, false, false);
      // the first frame: one fit pass over the whole page (header maths, body, footer), then the measurements that need layout anyway (P1-11)
      let firstFrame = requestAnimationFrame(() => {
        firstFrame = 0;
        if (!body.isConnected) return;
        fitAll(root); keepBarFixed(); place_(); lastKey = ''; tick();
        requestAnimationFrame(() => root.classList.add('ready'));
      });
      track(() => { if (firstFrame) cancelAnimationFrame(firstFrame); });
      // web fonts change text widths: fit again only when they were still loading when the page was built
      // (document.fonts.ready itself forces a layout in Chrome, so it is only touched when fonts were loading)
      if (fontsLoading) document.fonts.ready.then(() => { if (!body.isConnected) return; place_(); fitAll(root); lastKey = ''; tick(); });

      /* ---- the finish card (P2-15): Mark as understood with this lesson's self-check result, the next step beside it. It updates in place
         (no re-render, so the reader keeps their place); the end card's numbers and the header's '✓ Understood · 12 Oct' follow. */
      const doneBtn = U.$('#done', root), doneBox = U.$('.lsn-fin-rec', root), chk = U.$('[data-chk]', root), metaOk = U.$('[data-meta-ok]', root);
      const drawChk = () => {
        const qq = U.$$('.ga-quiz .qz-q', body), total = qq.length || quizN;
        if (!total) { chk.hidden = true; return; }
        const done = qq.filter(q => q.dataset.done).length, right = qq.filter(q => q.dataset.ok === '1').length, lt = lastText(lastQ, total);
        chk.hidden = false;
        const lvl = +body.dataset.depth >= 2, qs = `${total} question${total === 1 ? '' : 's'}`;       // at Intuition the checks are not on the page
        chk.innerHTML = done ? `<span class="lsn-chk-k">Check yourself:</span> <b>${esc(scoreText(total, done, right))}</b>`
          : lt ? `<span class="lsn-chk-k">Check yourself</span> · ${esc(lt)}${lvl ? ` · <a href="#/l/${esc(id)}" data-go="lsn-check">Try them again</a>` : ''}`
          : lvl ? `<a href="#/l/${esc(id)}" data-go="lsn-check">Check yourself first: ${qs}</a>` : `<span class="lsn-chk-k">Check yourself:</span> ${qs} in the ${esc(DEPTHS[1][1])} version`;
      };
      const drawDone = () => {
        const l = GA.store.state.lessons[id] || {};
        doneBox.classList.toggle('is-done', !!l.done);
        doneBtn.innerHTML = l.done ? `${icon('check')}<span>Understood</span>` : `${icon('check')}<span>Mark as understood</span>`;
        U.$('.lsn-done-t', root).innerHTML = l.done ? `Finished ${esc(U.ago(l.done))}. <button type="button" class="lsn-undo" data-undo>Undo</button>` : 'Only tick it when you could teach it to a friend.';
        if (metaOk) { metaOk.hidden = !l.done; metaOk.innerHTML = l.done ? `${icon('check')}<span>Understood · ${esc(dayOf(l.done))}</span>` : ''; }
        if (!target) { const w = U.$('.lsn-next-w', root); if (w) w.innerHTML = nextHtml(); }
      };
      drawDone(); drawChk(); redrawChk = drawChk;
      root.addEventListener('qz-change', drawChk);
      doneBtn.addEventListener('click', () => {
        const was = !!(GA.store.state.lessons[id] || {}).done;
        if (was) return;
        // XP is shown where it is earned (P2-38): GA.engage.xpFor on the state before the action, only when it adds something
        const E = GA.engage, xp = E && typeof E.xpFor === 'function' ? +safe(() => E.xpFor(GA.store.state, 'lesson', id, true), 0) || 0 : 0;
        A.setLessonDone(id, true); drawDone(); burst(doneBtn); buzz(15);
        UI.toast(xp > 0 ? `Understood · +${xp} XP` : 'Marked as understood', 'ok');
      });
      U.on(root, 'click', '[data-undo]', () => { A.setLessonDone(id, false); drawDone(); doneBtn.focus({ preventScroll: true }); });

      /* ---- 'Report a problem' (P3-48, D16): the shell's GA.ui.report when it exists, else a copy-only dialog like the question card's: the
         lesson, its id, the build date and the learner's words, copied as plain text. No network, nothing stored. */
      const reportSheet = opener => {
        const fid = 'lsn-rp-w', built = D.built || '';
        let m = null, busy = false;
        const copyOnce = async box => {
          const text = reportText({ id, title: meta.title, built, words: U.$('#' + fid, box).value }), st = U.$('.lsn-rp-st', box);
          let done = false;
          try { if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') { await navigator.clipboard.writeText(text); done = true; } } catch (err) { done = false; }
          if (!done) {
            // the browser keeps its clipboard API to itself here (an older browser, a page opened from a file): copy from a selected box instead
            let out = U.$('.lsn-rp-out', box);
            if (!out) { out = document.createElement('textarea'); out.className = 'input lsn-rp-out'; out.readOnly = true; out.rows = 6; out.setAttribute('aria-label', 'Your report'); st.before(out); }
            out.value = text; out.focus({ preventScroll: true }); out.select();
            try { done = !!(document.execCommand && document.execCommand('copy')); } catch (err) { done = false; }
            if (!done) { st.textContent = 'This browser blocked copying. The report is selected above: press Ctrl+C, or on a phone press and hold, then Copy.'; return; }
          }
          if (m) m.close();
          UI.toast('Report copied · paste it into a message or an email', 'ok');
        };
        const copy = async box => { if (busy) return; busy = true; try { await copyOnce(box); } finally { busy = false; } };
        m = UI.modal({ title: 'Report a problem', onclose: () => setTimeout(() => { if (opener && opener.isConnected) opener.focus({ preventScroll: true }); }, 0),
          body: `<p class="lsn-rp-for"><b>${esc(meta.title)}</b> · ${esc(id)}</p>` +
            `<label class="lsn-rp-l" for="${fid}">What looks wrong, and where?</label><textarea class="input" rows="4" id="${fid}" placeholder="For example: in Worked examples, the second step does not follow from the first."></textarea>` +
            '<p class="lsn-rp-n">Nothing is sent from this app. Copy puts the report on your clipboard, ready to paste into a message or an email.</p><p class="lsn-rp-st" role="status" aria-live="polite"></p>',
          focus: '#' + fid,
          actions: [{ label: 'Cancel' }, { label: 'Copy report', kind: 'primary', onclick: box => { copy(box); return false; } }] });
      };
      U.on(root, 'click', '[data-report]', (e, b) => {
        if (UI && typeof UI.report === 'function') { safe(() => UI.report({ kind: 'lesson', id, from: b })); return; }
        if (UI && typeof UI.modal === 'function') reportSheet(b);
      });

      /* ---- footer flip card: this lesson's flashcards (loaded on demand) */
      const cardHost = U.$('#lsn-cards', root);
      if (cardHost) {
        const fill = () => GA.data.cardsOf(meta.subject).then(all => {
          if (!cardHost.isConnected) return;
          const cs = (all || []).filter(c => c.lesson === id);
          if (cs.length) flipCard(cardHost, cs, id);
          else cardHost.remove();
        }).catch(() => { if (cardHost.isConnected) cardHost.remove(); });
        if (GA.reveal && GA.reveal.whenVisible) track(GA.reveal.whenVisible(cardHost, fill, { margin: 800 }) || (() => {})); else fill();
      }

      /* ---- printing (P1-17): every fold open, the answers of unanswered checks shown; restored afterwards */
      let printed = null;
      const beforePrint = () => {
        if (printed) return;
        ensure(parts.length - 1);                                             // the parts that are still on their way
        printed = { open: [], exp: [], keys: [], notes: [], theme: null };
        // paper is white: a dark-theme print would set near-white text on it, so the page prints in the light theme and switches back after
        const de = document.documentElement;
        if (de.getAttribute('data-theme') === 'dark') { printed.theme = 'dark'; de.setAttribute('data-theme', 'light'); }
        U.$$('details', root).forEach(d => { if (!d.open && !d.closest('.ga-pyq-embed, .lsn-needs-m')) { d.open = true; printed.open.push(d); } });
        U.$$('.qz-q:not([data-done])', body).forEach(q => {
          const ex = U.$('.qz-exp', q), key = q.dataset.key || '';
          if (ex && ex.hidden && ex.textContent.trim()) { ex.hidden = false; printed.exp.push(ex); }
          if (q.dataset.kind === 'nat') { const n = document.createElement('p'); n.className = 'qz-pa'; n.textContent = 'Answer: ' + key.replace('..', ' to '); (U.$('.qz-bar', q) || q).after(n); printed.notes.push(n); }
          else U.$$('.qz-o', q).forEach(l => { const inp = l.querySelector('input'); if (inp && key.includes(inp.value)) { l.classList.add('pk'); printed.keys.push(l); } });
        });
      };
      const afterPrint = () => {
        if (!printed) return;
        printed.open.forEach(d => (d.open = false)); printed.exp.forEach(x => (x.hidden = true)); printed.keys.forEach(l => l.classList.remove('pk')); printed.notes.forEach(n => n.remove());
        if (printed.theme && document.documentElement.getAttribute('data-theme') === 'light') document.documentElement.setAttribute('data-theme', printed.theme);
        printed = null;
      };
      addEventListener('beforeprint', beforePrint); addEventListener('afterprint', afterPrint);
      track(() => { removeEventListener('beforeprint', beforePrint); removeEventListener('afterprint', afterPrint); afterPrint(); });

      if (UI.setTimedLesson) UI.setTimedLesson(id);
      // an anchor the router will scroll to ('#/l/<id>#<heading>', Home's Resume) inside the deep-dive at Standard: open it first, so it is there
      if (pend && !anchor && partOf[pend] != null && depth === 2 && lvOf(parts[partOf[pend]]) === 3) safe(() => reveal(U.$(`:scope > .lsec[data-part="${partOf[pend]}"]`, body), false));
      if (anchor) requestAnimationFrame(() => jump(anchor));

      /* ---- the next lesson's own file arrives while the learner reads, once lessons ship one file each (P1-60) */
      const split = D.lessonFiles === 'split' || !!(g.GAD && g.GAD.manifest && g.GAD.manifest.main && g.GAD.manifest.main.lessonFiles === 'split');
      if (target && split) {
        const go = () => { if (body.isConnected) Promise.resolve(GA.data.lesson(target)).catch(() => {}); };
        if (g.requestIdleCallback) { const hI = g.requestIdleCallback(go, { timeout: 5000 }); track(() => g.cancelIdleCallback && g.cancelIdleCallback(hI)); }
        else { const hT = setTimeout(go, 1500); track(() => clearTimeout(hT)); }
      }
    },
    leave() {
      live.forEach(f => { try { f(); } catch (e) { /* already gone */ } }); live = [];
      if (GA.ui && GA.ui.setTimedLesson) GA.ui.setTimedLesson(null);
    }
  };
  GA.widgets = { hydrateQuiz, hydratePyq, hydrateLabs };
})(typeof window !== 'undefined' ? window : globalThis);
