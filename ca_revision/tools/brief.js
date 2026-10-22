#!/usr/bin/env node
/* brief: one revision brief per syllabus chapter for the PassBook, Out Loud writers (~/CA_PERSONAL/ca_revision/briefs/<EP>.md).
   From each lesson of the chapter (PassBook content, reviewed against the ICAI Study Material): title, summary, the key boxes of
   "In plain words", "Formats and formulas", "Exam angle", "Answer frame", the titles and fixes of "Common mistakes", and "Recap".
   Diagrams, labs, quizzes and worked-example workings are left out. Then the ICAI frequency of the chapter's sub-topics from the
   built question bank (documents, exam papers, items), and the stems of the questions ICAI repeated most.
   Usage: node ~/CA_PERSONAL/ca_revision/tools/brief.js            (writes all 40 briefs and briefs/INDEX.json) */
'use strict';
const fs = require('fs'), path = require('path');
const PB = path.join(process.env.HOME, 'CA_PERSONAL/ca_passbook');
const OUT = path.join(process.env.HOME, 'CA_PERSONAL/ca_revision', 'briefs');
const { syllabus } = require(path.join(PB, 'tools/pdf/build_html.js'));
const { loadBank, buildUnits } = require(path.join(PB, 'tools/pdf/qbank_html.js'));
const { loadLesson } = require(path.join(PB, 'tools/pdf/build_html.js'));

const PAPER = { cma: 'P4', aud: 'P5', fm: 'P6A', sm: 'P6B' };
const NAME = { cma: 'Cost and Management Accounting', aud: 'Auditing and Ethics', fm: 'Financial Management', sm: 'Strategic Management' };

/** drop containers that do not read aloud (diagram, lab, quiz, cols of pictures) and keep the text of the rest */
function clean(md) {
  let s = md;
  s = s.replace(/^(:{3,})\s*(diagram|lab|quiz|pyq|video)\b[^\n]*\n[\s\S]*?^\1\s*$/gm, '');
  s = s.replace(/^```[\s\S]*?^```\s*$/gm, '');
  s = s.replace(/^(:{3,})\s*([a-z-]+)\s*(.*)$/gm, (m, c, k, t) => (t.trim() ? `**[${k}] ${t.trim()}**` : `**[${k}]**`));
  s = s.replace(/^:{3,}\s*$/gm, '');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}
const sec = (L, name) => { const x = L.secs.find(s => s.name === name); return x ? x.md : ''; };
function keys(md) {
  const out = [], re = /^(:{3,})\s*key\b[ \t]*(.*)\n([\s\S]*?)^\1\s*$/gm;
  let m; while ((m = re.exec(md))) out.push((m[2].trim() ? `**${m[2].trim()}** ` : '') + m[3].trim());
  return out;
}
function mistakes(md) {
  const out = [], re = /^(:{3,})\s*mistake\b[ \t]*(.*)\n([\s\S]*?)^\1\s*$/gm;
  let m; while ((m = re.exec(md))) { const i = m[3].search(/\*\*Fix:?\*\*:?/); out.push(`- **${m[2].trim()}** ${(i >= 0 ? m[3].slice(i) : m[3]).replace(/\s+/g, ' ').trim()}`); }
  return out;
}

const B = loadBank();
const index = [];
for (const P of syllabus()) {
  const { all, shown } = buildUnits(B, P.id);
  const docs = new Map(), exams = new Map(), items = new Map();
  for (const u of all) {
    if (u.oos) continue;
    for (const i of u.items) {
      const s = i.r.subtopic || i.r.topic;
      if (!docs.has(s)) { docs.set(s, new Set()); exams.set(s, new Set()); items.set(s, 0); }
      docs.get(s).add(u.p.id); if (u.p.kind === 'pyq') exams.get(s).add(u.p.id); items.set(s, items.get(s) + 1);
    }
  }
  P.chapters.forEach((C, ci) => {
    const ep = `${PAPER[P.id]}-${String(ci + 1).padStart(2, '0')}`;
    const parts = [`# ${ep} · ${NAME[P.id]} (${PAPER[P.id]}) · Chapter ${ci + 1}: ${C.name}`, '',
      'Source: PassBook lessons (content reviewed against the ICAI Study Material, July 2024 edition, Reprint August 2025, applicable for January 2027).',
      'Use ONLY facts from this brief (or the full lesson files named below). Do not add facts from memory.', ''];
    const lessons = C.lessons.map(s => loadLesson(P.id, s.id)).filter(Boolean);
    parts.push('## The chapter\'s sub-topics (lessons), in syllabus order', '');
    lessons.forEach((L, li) => parts.push(`${ci + 1}.${li + 1} ${L.title} — \`~/CA_PERSONAL/ca_passbook/content/subjects/${P.id}/${L.id}.md\``));
    parts.push('', '## How often ICAI asks each sub-topic (PassBook ICAI bank: past papers, RTPs, MTPs, 2018 to Sep 2026; old-scheme papers included where the topic is still in the syllabus)', '',
      '| Sub-topic | ICAI documents | of which exam papers | items |', '|---|---:|---:|---:|');
    const ids = [C.id, ...lessons.map(L => L.id)];
    lessons.forEach(L => parts.push(`| ${L.title} | ${docs.get(L.id) ? docs.get(L.id).size : 0} | ${exams.get(L.id) ? exams.get(L.id).size : 0} | ${items.get(L.id) || 0} |`));
    const allDocs = new Set(), allExams = new Set();
    ids.forEach(id => { (docs.get(id) || []).forEach(d => allDocs.add(d)); (exams.get(id) || []).forEach(d => allExams.add(d)); });
    parts.push('', `Whole chapter: asked in ${allDocs.size} ICAI documents, ${allExams.size} of them exam papers.`, '');
    // the questions ICAI repeated most in this chapter (stems only, first ~300 characters), for the Exam angle
    const rep = shown.filter(u => !u.oos && ids.includes(u.sub)).map(u => ({ u, n: 1 + (u.also || []).length + (u.twins || []).length }))
      .sort((a, b) => b.n - a.n).filter(x => x.n > 1);
    const seen = new Set();
    rep.splice(0, rep.length, ...rep.filter(({ u }) => { const k = String((u.group && u.group.context) || u.items[0].x.stem || '').toLowerCase().replace(/[^a-z]+/g, '').slice(0, 90); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 6));
    if (rep.length) {
      parts.push('## Questions ICAI has repeated in this chapter (question text only, shortened; for the Exam angle, never read out verbatim at length)', '');
      rep.forEach(({ u, n }) => {
        const t = String((u.group && u.group.context) || u.items[0].x.stem || '').replace(/\|[^\n]*\|/g, ' ').replace(/[*#>`]/g, '').replace(/\s+/g, ' ').trim();
        parts.push(`- (${n} documents) ${t.slice(0, 300)}${t.length > 300 ? '…' : ''}`);
      });
      parts.push('');
    }
    lessons.forEach((L, li) => {
      parts.push(`---`, '', `## Lesson ${ci + 1}.${li + 1}: ${L.title}`, '', `*${L.summary}*`, '');
      const k = keys(sec(L, 'In plain words'));
      if (k.length) parts.push('### Key idea', '', ...k.map(clean), '');
      for (const name of ['Formats and formulas', 'Exam angle', 'Answer frame']) { const m = sec(L, name); if (m) parts.push(`### ${name}`, '', clean(m), ''); }
      const mi = mistakes(sec(L, 'Common mistakes'));
      if (mi.length) parts.push('### Common mistakes (title and fix)', '', ...mi.map(clean), '');
      const r = sec(L, 'Recap'); if (r) parts.push('### Recap', '', clean(r), '');
    });
    const text = parts.join('\n');
    fs.writeFileSync(path.join(OUT, `${ep}.md`), text);
    index.push({ ep, paper: PAPER[P.id], subject: P.id, chapter: ci + 1, id: C.id, name: C.name, lessons: lessons.map(L => L.id), words: text.split(/\s+/).length });
  });
}
fs.writeFileSync(path.join(OUT, 'INDEX.json'), JSON.stringify(index, null, 1));
console.log(index.map(x => `${x.ep} ${x.name} (${x.lessons.length} lessons, brief ${x.words} words)`).join('\n'));
