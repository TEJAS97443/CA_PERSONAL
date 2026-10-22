#!/usr/bin/env node
/* Deep lint of lesson markdown: renders every lesson with the real renderer (md.js + diagram.js + vendored KaTeX) and reports
   broken math, broken diagrams, malformed quizzes and unknown lab embeds. Output lines start with ERROR or WARN (consumed by build.py).
   Usage: node tools/lint_content.js [--long N] [file.md ...]   (default: every lesson under content/subjects)
     --long N   also list display formulas of N or more TeX characters that have no top-level \qquad to split at (candidates for splitting
                into rows on a phone, CONTENT_GUIDE §3 Maths); for authors, never run by build.py */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
globalThis.GA = globalThis.GA || {};   // keep a host's GA when required in-process (tests/diagram.test.js); a fresh {} wiped GA.util for later test files
globalThis.katex = require(path.join(root, 'vendor/katex/katex.min.js'));
const md = require(path.join(root, 'app/js/core/md.js'));
require(path.join(root, 'app/js/viz/diagram.js'));
const ML = require(path.join(root, 'tools/buildlib/mathlint.js'));
// KaTeX's own 'No character metrics' console line is replaced by the glyph warning at the end (P3-37)
const warn0 = console.warn;
console.warn = function (m) { if (typeof m === 'string' && /^No character metrics for /.test(m)) return; return warn0.apply(console, arguments); };
const log0 = console.log;   // KaTeX's strict-mode notes about a known glyph (₹ in \text{}) go to console.log in some builds: keep the lint's output clean
console.log = function (m) { if (typeof m === 'string' && /^No character metrics for /.test(m)) return; return log0.apply(console, arguments); };

const argv = process.argv.slice(2), li = argv.indexOf('--long');
const LONG = li >= 0 ? +argv[li + 1] || 120 : 0;
if (li >= 0) argv.splice(li, /^\d+$/.test(argv[li + 1] || '') ? 2 : 1);
let files = argv;
if (!files.length) {
  const base = path.join(root, 'content', 'subjects');
  if (fs.existsSync(base)) for (const d of fs.readdirSync(base)) { const dd = path.join(base, d); if (fs.statSync(dd).isDirectory()) for (const f of fs.readdirSync(dd)) if (f.endsWith('.md')) files.push(path.join(dd, f)); }
}
const labs = new Set(JSON.parse(fs.readFileSync(path.join(root, 'content', 'labs.json'), 'utf8')).map(l => l.id));
const TABLE_COLOURS = new Set(['a', 'b', 'c', 'd', 'ok', 'bad', 'hl', 'mute']);
for (const f of fs.readdirSync(path.join(root, 'app', 'css'))) if (f.endsWith('.css')) for (const m of fs.readFileSync(path.join(root, 'app', 'css', f), 'utf8').matchAll(/\.tc-([a-z0-9]+)/g)) TABLE_COLOURS.add(m[1]);
let errors = 0;
const out = (kind, file, msg) => { if (kind === 'ERROR') errors++; console.log(`${kind} ${path.relative(root, file)}: ${msg}`); };

/* Container fences that will not render as written: [{line (0-based body line), why, msg}] (messages number lines from off + 1).
   First the structure the author meant, by a stack of open containers (as build.py --check reads it):
     same      an opener inside an open container with the same number of colons: md.js closes the outer one at the inner one's closer
     mismatch  a closer whose colons match an outer container while an inner one is still open
     stray     a closer with no container open; unclosed: an opener never closed
     inverted  an inner container with MORE colons than the one round it (renders, but CONTENT_GUIDE §3 wants the outer one to have more): WARN
   Then md.js itself (block(): an opener closes at the FIRST later line of exactly as many colons), walked the same way: a ":::" line it
   leaves as text, or a bare closer it pairs with a later one (a "Note" box round everything between), is reported when the structure check
   found nothing (it is usually that problem's echo), and a fence indented under a list item (md.js reads it as the item's text) always. */
function fenceProblems(lines, off) {
  off = off || 0;
  const L = n => n + 1 + off, out = [], OPEN = /^(:{3,})\s*([a-z][a-z0-9-]*)?\s*(.*)$/;
  const say = (line, why, msg) => { if (!out.some(o => o.line === line && o.why === why)) out.push({ line, why, msg }); };
  // 1. the meant structure
  const st = []; let code = null;
  lines.forEach((l, i) => {
    const t = l.trim();
    if (code) { if (t.startsWith(code)) code = null; return; }
    const c = /^(`{3,}|~{3,})/.exec(t); if (c) { code = c[1]; return; }
    const m = /^(:{3,})\s*([a-z][a-z0-9-]*)?/.exec(t); if (!m) return;
    const n = m[1].length, top = st[st.length - 1];
    if (m[2]) {
      if (top && top.n === n) say(i, 'same', `\`${m[1]} ${m[2]}\` is opened inside \`${':'.repeat(n)} ${top.kind}\` (line ${L(top.line)}) with the same number of colons, so it closes the ${top.kind} early and the rest shows as raw text; give the OUTER container more colons (CONTENT_GUIDE §3)`);
      else if (top && n > top.n) say(i, 'inverted', `\`${m[1]} ${m[2]}\` has more colons than the \`${':'.repeat(top.n)} ${top.kind}\` round it (line ${L(top.line)}); it renders, but the outer container should have the more colons (CONTENT_GUIDE §3)`);
      st.push({ n, kind: m[2], line: i });
      return;
    }
    if (top && top.n === n) { st.pop(); return; }
    const k = st.map(x => x.n).lastIndexOf(n);
    if (k >= 0) { say(i, 'mismatch', `this \`${m[1]}\` closes the \`${m[1]} ${st[k].kind}\` of line ${L(st[k].line)} while the \`${':'.repeat(top.n)} ${top.kind}\` of line ${L(top.line)} is still open (its closer needs ${top.n} colons)`); st.length = k; }
    else say(i, 'stray', `a closing \`${m[1]}\` with no \`${m[1]}\` container open: it shows as text, or pairs with a later \`${m[1]}\` and boxes everything between as a "Note"`);
  });
  st.forEach(x => say(x.line, 'unclosed', `\`${':'.repeat(x.n)} ${x.kind}\` is never closed (a line of exactly ${x.n} colons): it shows as text`));
  const meant = out.some(o => o.why !== 'inverted');
  // 2. md.js's own reading
  const closeAt = (ls, i, n) => { for (let j = i + 1; j < ls.length; j++) if (new RegExp('^:{' + n + '}\\s*$').test(ls[j].trim())) return j; return -1; };
  const LIST = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/, sep = l => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(l) && l.includes('-');
  function walk(ls, base) {
    let i = 0;
    while (i < ls.length) {
      const t = ls[i].trim();
      if (!t) { i++; continue; }
      let m = /^(`{3,}|~{3,})/.exec(t);
      if (m) { i++; while (i < ls.length && !ls[i].trim().startsWith(m[1])) i++; i++; continue; }
      m = OPEN.exec(t);
      if (m && (m[2] || !/^:{3,}\s/.test(t))) {
        const n = m[1].length, j = closeAt(ls, i, n);
        if (j > 0) {
          if (!m[2] && !meant) say(base + i, 'bare', `md.js pairs this closing \`${m[1]}\` with the one on line ${L(base + j)} and draws everything between inside a "Note" box`);
          const kind = (m[2] || 'note').toLowerCase(), inner = ls.slice(i + 1, j);
          if (kind === 'cols') { let k0 = 0; inner.forEach((l, k) => { if (/^-{3,}\s*$/.test(l.trim())) { walk(inner.slice(k0, k), base + i + 1 + k0); k0 = k + 1; } }); walk(inner.slice(k0), base + i + 1 + k0); }
          else if (!/^(diagram|quiz|lab|pyq)$/.test(kind)) walk(inner, base + i + 1);
          i = j + 1; continue;
        }
        if (!meant) say(base + i, 'text', `md.js finds no closing \`${m[1]}\` for \`${t.slice(0, 40)}\`, so it shows as text`);
        i++; continue;
      }
      if (LIST.test(ls[i])) {                                         // md.js parseList: an indented line continues the item as text
        const b0 = LIST.exec(ls[i])[1].length; i++;
        while (i < ls.length) {
          const l = ls[i], lm = LIST.exec(l);
          if (lm) { if (lm[1].length < b0) break; i++; continue; }
          if (l.trim() && /^\s{2,}\S/.test(l)) { if (/^:{3,}/.test(l.trim())) say(base + i, 'list', `the indented \`${l.trim().slice(0, 40)}\` is read as more text of the list item above it; start the container at the margin, after a blank line`); i++; continue; }
          break;
        }
        continue;
      }
      if (t.startsWith('>')) { const q = [], b1 = i; while (i < ls.length && ls[i].trim().startsWith('>')) q.push(ls[i++].trim().replace(/^>\s?/, '')); walk(q, base + b1); continue; }
      if (t.includes('|') && i + 1 < ls.length && sep(ls[i + 1])) { i += 2; while (i < ls.length && ls[i].trim() && ls[i].includes('|')) i++; continue; }
      i++;
    }
  }
  walk(lines, 0);
  return out.sort((a, b) => a.line - b.line);
}
/* the container tree of a lesson body: [{n, kind, title, open, close, children}] by line index (fenced code skipped) */
function containerTree(lines) {
  const top = { n: Infinity, kind: null, children: [] }, stack = [top];
  let fence = null;
  lines.forEach((l, i) => {
    const t = l.trim();
    if (fence) { if (t.startsWith(fence)) fence = null; return; }
    const f = /^(```+|~~~+)/.exec(t);
    if (f) { fence = f[1]; return; }
    const m = /^(:{3,})\s*([a-z][a-z0-9-]*)?\s*(.*)$/.exec(t);
    if (!m) return;
    const n = m[1].length;
    if (m[2]) { const c = { n, kind: m[2], title: m[3].trim(), open: i, close: -1, children: [] }; stack[stack.length - 1].children.push(c); stack.push(c); return; }
    while (stack.length > 1 && stack[stack.length - 1].n !== n) stack.pop();
    if (stack.length > 1) stack.pop().close = i;
  });
  return top.children;
}
/* P1-15: a worked example must not give its answer away before the attempt. Between a prompt that asks something and its answer fold, a
   diagram may only be the GIVEN: the prompt hands it over ('the graph below', 'this DFA', 'produced the chart below', or the line just above
   it ends in ':'), or its spec says "given": true. Only the first diagram above the fold can be handed over by the prompt's words; a second
   one needs its own ':' line or the flag. A given's title and caption must not state the result either: a number neither the prompt nor the
   picture contains ('weight 8', '21 days'), a path or cycle (A → B → C), a conclusion ('so it is self-dual', 'worked out below'), or a
   drawn answer (a circuit's highlighted path, K-map groups). Anything else is an output or working diagram (the Gantt chart a prompt asks
   for, the finished table, the result tree): it belongs inside the fold, as the first block of the working (::::: example > :::: answer >
   ::: diagram). "given": true is the author's word that the numbers in the picture's words are the given's, so only the number checks skip
   it (a conclusion, a listed path, a drawn answer, an unexplained mark or an asked-for count is still flagged). Text or a diagram after the
   fold shows while the fold is closed, so it is flagged too. */
const ASKS = /\?|\b(find|draw|sketch|schedule[ds]?|construct|compute|calculate|determine|work out|what|which|when|where|who|how|write|list|give|evaluate|express|convert|decide|count|trace|track|minimi[sz]e|simplify|reali[sz]e|apply|run|fill|step through|show|prove|classify|compare|identify|name|estimate|derive|choose|rank|match|complete|rewrite|design|insert|delete|read)\b/i;
const PIC = String.raw`(?:charts?|schedules?|diagrams?|pictures?|figures?|drawings?|graphs?|dags?|trees?|tables?|maps?|k-?maps?|circuits?|networks?|grids?|machines?|dfas?|nfas?|pdas?|automat(?:on|a)|nets?|views?|pieces?|candidates|series|plots?|curves?|layouts?|memory|arrays?|boards?|clocks?|waveforms?|waves?|instances?|relations?|schemas?|topology|cascade|path)`;
const GIVEN = new RegExp(String.raw`\b(?:the|a|an|this|these|that)\s+(?:[\w’'+-]+\s+){0,3}?${PIC}\s+(?:below|above|shown|drawn|pictured|here)\b` +
  String.raw`|\b(?:as|is|are)\s+(?:shown|drawn|pictured)\b|\b(?:this|these)\s+(?:[\w’'+-]+\s+){0,3}?${PIC}\b|\bthe following\s+(?:[\w’'+-]+\s+){0,3}?${PIC}\b` +
  String.raw`|\bproduced the chart\b|\bread (?:off )?the chart\b|\bgiven (?:chart|schedule|graph|table|tree|circuit|figure|network)\b`, 'i');
const CONCLUDES = /\b(?:so|therefore|hence|thus)\b|\bworked out below\b|\b(?:method|working|answer|solution|reasoning|steps?) below\b|\b(?:see|explained) below\b/i;
const NUMWORD = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, third: 3, fourth: 4,
  fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10, single: 1, twice: 2 };
const numbers = t => new Set((String(t).match(/\d+(?:\.\d+)?/g) || []).map(x => String(+x)));
const fenceLine = l => /^\s*:{3,}/.test(l);
/** the words a diagram shows besides its title and caption (labels, notes, cell values): numbers drawn in the given picture are given too */
function drawnText(spec) {
  const out = [];
  const walk = (o, k) => { if (k === 'title' || k === 'caption' || k === 'alt') return; if (typeof o === 'string' || typeof o === 'number') { if (!/^(x|y|w|h|r|at|u|size|gapX|gapY|grid|cell)$/.test(k || '')) out.push(String(o)); return; }
    if (Array.isArray(o)) { o.forEach(v => walk(v, k)); return; } if (o && typeof o === 'object') for (const [kk, v] of Object.entries(o)) walk(v, kk); };
  walk(spec, null);
  return out.join(' ');
}
/** why a given diagram's own words or marks state the result, or ''. For a flagged given ("given": true) the author vouches for its numbers,
    but a drawn answer, a conclusion ('so it is an inverter') or a listed path is still the working */
function statesResult(spec, prompt, flagged) {
  const words = [spec.title, spec.caption].filter(Boolean).join(' ');
  if (spec.type === 'circuit' && Array.isArray(spec.path) && spec.path.length) return 'it highlights a path';
  if (spec.type === 'kmap' && Array.isArray(spec.groups) && spec.groups.length) return 'it draws the groups';
  if (!words) return '';
  const c = CONCLUDES.exec(words);
  if (c) return `its words conclude ("${c[0]}")`;
  if ((words.match(/→|->/g) || []).length >= 2) return 'its words list a path or cycle';
  if (flagged) return '';
  const known = new Set([...numbers(prompt), ...numbers(drawnText(spec))]);
  for (const n of numbers(words)) if (!known.has(n)) return `its words state ${n}, which the prompt does not give`;
  for (const m of words.toLowerCase().matchAll(/\b[a-z]+\b/g)) {
    const v = NUMWORD[m[0]];
    if (v != null && !known.has(String(v)) && !new RegExp(`\\b${m[0]}\\b`, 'i').test(prompt)) return `its words state "${m[0]}", which the prompt does not give`;
  }
  return '';
}
/* P1-15 (part C): a given may not single anything out by colour or line style unless its words say what the mark means. A fill, colour or
   highlight on some of a graph's or tree's nodes or edges, on an array's cells or a table's cells or rows, or a dashed edge among solid ones,
   needs a legend in the prompt, the title or the caption that names it ('Teal edges are assignments, orange edges are requests', 'Shaded:
   the start', 'Colours mark the regions'). Unexplained, a mark is the working's first step at best (the unreachable state filled, its
   edges dashed) and the answer at worst (the two loop headers filled, the NP-complete problems in one colour). Every element in its own
   colour (each block of a flow graph, grey for ENTRY and EXIT) singles nothing out, and neither does one colour on every element.
   "given": true does not skip this check: the verifier found these marks on flagged givens. */
const LEGEND = { blue: t => /\bblue\b/.test(t.replace(/\b(?:sky|light)[ -]blue\b/g, ' ')), 'sky blue': t => /\b(?:sky|light)[ -]blue\b/.test(t),
  teal: t => /\bteal\b/.test(t), amber: t => /\b(?:amber|yellow)\b/.test(t), orange: t => /\borange\b/.test(t), violet: t => /\b(?:violet|purple)\b/.test(t),
  green: t => /\bgreen\b/.test(t), pink: t => /\b(?:pink|magenta)\b/.test(t), rose: t => /\b(?:rose|red|crimson)\b/.test(t),
  grey: t => /\b(?:gr[ae]y|greyed|muted|faded)\b/.test(t), dashed: t => /\b(?:dashed|dotted|broken)\b/.test(t) };
const LEGEND_ANY = /\bcolou?rs?\s+(?:mark|show|tell|stand|code)|\bcolou?r(?:ed|-coded)\s+by\b|\b(?:each|own|one)\s+colou?r\b|\bcolou?r-coded\b/;
const LEGEND_ONE = /\b(?:shaded|filled|highlighted|marked)\b/;
/** the marks of a given that single out part of it: [{mark, what, ids}] (mark: a colour name or 'dashed') */
function givenMarks(spec) {
  const nm = (v, table) => (v == null || v === false ? null : typeof v === 'number' ? PALETTE[KEYS8[((v % 8) + 8) % 8]] : (table ? TABLE_PALETTE : PALETTE)[v] || null);
  const cats = [];
  if (spec.type === 'graph') {
    cats.push({ what: 'nodes', els: (spec.nodes || []).map(n => [String(n.label != null ? n.label : n.id).split('\n')[0], nm(n.fill != null ? n.fill : n.color)]) });
    cats.push({ what: 'edges', els: (spec.edges || []).map(e => [`${e.from}–${e.to}`, nm(e.color)]) });
    cats.push({ what: 'edges', els: (spec.edges || []).map(e => [`${e.from}–${e.to}`, /dash|dot/.test(String(e.style || '')) || e.dash === true ? 'dashed' : null]) });
  } else if (spec.type === 'tree') {
    const nodes = [], edges = [], hl = new Set([].concat(spec.hl || []).map(String));
    const walk = (n, parent) => { if (!n || typeof n !== 'object') return; const id = String(n.label != null ? n.label : n.id != null ? n.id : '?');
      nodes.push([id, nm(n.color) || (n.hl || hl.has(id) || hl.has(String(n.id)) ? 'amber' : null)]); if (parent) edges.push([`${parent}–${id}`, nm(n.edgeColor)]);
      (n.children || []).forEach(k => walk(k, id)); };
    walk(spec.root, null);
    cats.push({ what: 'nodes', els: nodes }, { what: 'edges', els: edges });
  } else if (spec.type === 'array') {
    cats.push({ what: 'cells', els: (spec.cells || []).map((c, i) => [String(c && typeof c === 'object' ? c.v : c), nm(c && typeof c === 'object' ? c.hl : null)]) });
  } else if (spec.type === 'table' && (spec.cells || spec.rowClass)) {
    const n = (spec.rows || []).length * Math.max(1, (spec.head || []).length || ((spec.rows || [])[0] || []).length);
    const els = Object.entries(spec.cells || {}).filter(([, v]) => TABLE_PALETTE[v]).map(([k, v]) => [k, nm(v, true)]);
    while (els.length < n) els.push(['', null]);
    cats.push({ what: 'cells', els });
    if (spec.rowClass && typeof spec.rowClass === 'object') cats.push({ what: 'rows', els: (spec.rows || []).map((r, i) => [String(i), spec.rowClass[i] === 'hl' ? 'amber' : null]) });
  }
  const marks = [];
  for (const { what, els } of cats) {
    const on = els.filter(e => e[1]);
    if (!on.length) continue;
    const groups = new Map(); on.forEach(([id, c]) => groups.set(c, [...(groups.get(c) || []), id]));
    if (on.length === els.length && (groups.size === 1 || [...groups].every(([c, ids]) => c === 'grey' || ids.length === 1))) continue;   // uniform, or every element its own colour
    for (const [mark, ids] of groups) marks.push({ mark, what, ids });
  }
  return marks;
}
/** the marks of a given that no word in the prompt, title or caption explains, as a phrase ('orange nodes 8; dashed edges 8–3'), or '' */
function unexplainedMarks(spec, prompt) {
  // one mark on one element the prompt names ('from S', 'the edge A–B') only restates the prompt: the start vertex, the edge asked about
  // (a bare number is no name: '8 states' does not name state 8)
  const named = id => String(id).split('–').every(x => /[A-Za-z]/.test(x) && new RegExp(String.raw`(?:^|[^\w])${x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\w])`).test(String(prompt || '')));
  const kind = m => m.what + (m.mark === 'dashed' ? ':dash' : ''), all = givenMarks(spec), per = new Map();
  all.forEach(m => per.set(kind(m), (per.get(kind(m)) || 0) + 1));
  const marks = all.filter(m => !(per.get(kind(m)) === 1 && m.ids.length === 1 && named(m.ids[0])));
  if (!marks.length) return '';
  const t = ' ' + [prompt, spec.title, spec.caption].filter(Boolean).join(' ').toLowerCase().replace(/\$[^$]*\$/g, ' ') + ' ';
  if (LEGEND_ANY.test(t)) return '';
  // 'shaded', 'highlighted' … explain the marks of a part that carries one colour only
  const colours = new Map(); marks.filter(m => m.mark !== 'dashed').forEach(m => colours.set(m.what, (colours.get(m.what) || 0) + 1));
  const open = marks.filter(m => !(LEGEND[m.mark] && LEGEND[m.mark](t)) && !(m.mark !== 'dashed' && colours.get(m.what) === 1 && LEGEND_ONE.test(t)));
  return open.map(m => `${m.mark} ${m.what} ${m.ids.slice(0, 4).join(', ')}${m.ids.length > 4 ? ', …' : ''}`).join('; ');
}
/** a count the prompt asks for ('How many tuples …?') that a given's own labels state ('∪ (5 tuples)'), or '' */
function countGiven(spec, prompt) {
  const labels = drawnText(spec), p = String(prompt || '');
  for (const m of p.matchAll(/\bhow many\s+(?:different\s+|distinct\s+)?([a-z]{3,})/gi)) {
    const w = m[1].toLowerCase(), noun = `(?:${[...new Set([w.replace(/s$/, ''), w.replace(/es$/, '')])].join('|')})(?:e?s)?`;   // tuples: tuple, tuples
    const hit = new RegExp(String.raw`\b(\d+)\s+${noun}\b`, 'i').exec(labels);
    if (hit && !new RegExp(String.raw`\b${hit[1]}\s+${noun}\b`, 'i').test(p)) return `its labels state "${hit[0]}", the count the prompt asks for`;
  }
  return '';
}
function answerAboveFold(lines) {
  const found = [];
  const descend = (c, fn) => c.children.forEach(k => { fn(k); descend(k, fn); });
  const visit = cs => cs.forEach(c => {
    if (c.kind === 'example') {
      const folds = c.children.filter(k => /^(answer|solution|details)$/.test(k.kind)), fold = folds[0];
      if (fold) {
        const above = [];
        descend(c, d => { if (d.kind === 'diagram' && d.open < fold.open && d.close >= 0 && !(d.open > fold.open && d.close < fold.close)) above.push(d); });
        above.sort((a, b) => a.open - b.open);
        const inDiagram = i => above.some(d => i >= d.open && i <= d.close);
        const promptLines = []; for (let i = c.open + 1; i < fold.open; i++) if (!inDiagram(i) && !fenceLine(lines[i])) promptLines.push(lines[i]);
        const prompt = promptLines.join(' ');
        const asks = ASKS.test(prompt);
        above.forEach((d, idx) => {
          let spec = null; try { spec = JSON.parse(lines.slice(d.open + 1, d.close).join('\n')); } catch (e) { return; }
          if (!spec || !asks) return;
          if (d.title && !spec.title) spec = { ...spec, title: d.title };
          let j = d.open - 1; while (j > c.open && (!lines[j].trim() || fenceLine(lines[j]))) j--;
          const colon = j > c.open && /:\s*$/.test(lines[j]) && !inDiagram(j);
          const flagged = spec.given === true, referred = colon || (idx === 0 && GIVEN.test(prompt)) || /^(?:the\s+)?given\b/i.test(spec.title || '');
          const base = { line: d.open + 1, example: c.title, diagram: d.title || spec.title || spec.type, type: spec.type };
          if (!flagged && !referred) { found.push({ ...base, why: 'not-given' }); return; }
          const r = statesResult(spec, prompt + ' ' + drawnText(spec), flagged) || countGiven(spec, prompt);
          if (r) found.push({ ...base, why: 'states-result', detail: r });
          const m = unexplainedMarks(spec, prompt);
          if (m) found.push({ ...base, why: 'unexplained-marks', detail: m });
        });
        // what follows the last fold shows while the folds are closed
        const last = folds[folds.length - 1];
        for (let i = last.close + 1; i < c.close; i++) if (lines[i].trim() && !fenceLine(lines[i])) { found.push({ line: i + 1, example: c.title, diagram: null, type: null, why: 'after-fold' }); break; }
      }
    }
    visit(c.children);
  });
  visit(containerTree(lines));
  return found;
}
/* P2-20: colour words in a diagram's title and caption must name colours the diagram draws, in the v3 palette's names (CONTENT_GUIDE §4):
   a blue, b teal, c amber, d orange, e sky blue, f violet, g green, h pink; ok green, bad rose (red), warn amber, mute grey; table cells
   a green, b rose, c and hl amber, d blue. --viz-d is a burnt orange since P2-06 (#C2410C light, #F97316 dark: never the CTA coral), so
   'orange' names d and only d, and 'rose' / 'red' name bad (and table b) only. 'indigo' is never drawn (it was the old palette's a); a bare
   'blue' is ambiguous once both blues are drawn (say 'sky blue' for e). Parts a type colours by position when they carry no colour (Gantt
   processes, memory blocks, layers, bit fields, plot series and vectors, K-map groups, flow nodes by kind, a circuit's highlighted path,
   shaded Venn regions, highlighted tree nodes) count as drawn. */
const PALETTE = { a: 'blue', b: 'teal', c: 'amber', d: 'orange', e: 'sky blue', f: 'violet', g: 'green', h: 'pink', ok: 'green', bad: 'rose', warn: 'amber', mute: 'grey' };
const TABLE_PALETTE = { a: 'green', b: 'rose', c: 'amber', hl: 'amber', d: 'blue', ok: 'green', bad: 'rose', mute: 'grey' };
const KEYS8 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
function drawnColours(spec) {
  const out = new Set();
  const add = (v, table) => { const n = typeof v === 'number' ? PALETTE[KEYS8[((v % 8) + 8) % 8]] : typeof v === 'string' ? (table ? TABLE_PALETTE : PALETTE)[v] : null; if (n) out.add(n); };
  const walk = o => {
    if (Array.isArray(o)) return o.forEach(walk);
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (o.type === 'table' && (k === 'cells' || k === 'rowClass')) { if (v && typeof v === 'object') Object.values(v).forEach(x => add(x, true)); else add(v, true); continue; }
      if (/^(color|colour|fill|hl|stroke|pathColor|edgeColor)$/.test(k)) { if (v && typeof v === 'object') Object.values(v).forEach(x => add(x)); else add(v); continue; }
      if (k === 'colors' || k === 'laneColors') { Object.values(v || {}).forEach(x => add(x)); continue; }
      if (v && typeof v === 'object') walk(v);
    }
  };
  walk(spec);
  const byPos = (list, own) => (Array.isArray(list) ? list : []).forEach((x, i) => { if (x && own(x) == null) add(KEYS8[i % 8]); });
  switch (spec.type) {
    case 'gantt': {
      const procs = [];
      (spec.blocks || []).forEach(b => { if (b.p !== 'idle' && !procs.includes(b.p)) procs.push(b.p); });
      (spec.arrivals || []).forEach(a => { if (!procs.includes(a.p)) procs.push(a.p); });
      procs.forEach((p, i) => { if (!(spec.colors && spec.colors[p] != null)) add(KEYS8[i % 8]); });
      break;
    }
    case 'memory': byPos(spec.blocks, b => (b.kind === 'free' || b.kind === 'hole' ? 'mute' : b.color)); break;
    case 'layers': byPos(spec.layers, l => l.color); break;
    case 'bits': byPos(spec.fields, f => f.color); break;
    case 'plot': byPos(spec.series, x => x.color); byPos(spec.vectors, x => x.color); break;
    case 'kmap': byPos(spec.groups, g => g.color); break;
    case 'flow': (spec.nodes || []).forEach(n => { if (n.color == null) add(n.kind === 'decision' ? 'c' : n.kind === 'start' || n.kind === 'end' ? 'e' : 'a'); }); break;
    case 'circuit': if (Array.isArray(spec.path) && spec.path.length && spec.pathColor == null) add('bad'); break;
    case 'venn': if (spec.shade && spec.color == null) add('a'); break;
    case 'tree': if ((Array.isArray(spec.hl) && spec.hl.length) || /"hl":\s*true/.test(JSON.stringify(spec.root || spec))) add('c'); break;
    default: break;
  }
  return out;
}
/** the colour words of a title or caption that the drawing does not back up: [{word, why}] */
function colourWordProblems(text, drawn) {
  const t = ' ' + String(text || '').toLowerCase().replace(/\$[^$]*\$/g, ' ') + ' ', bad = [];
  if (/\bindigo\b/.test(t)) bad.push({ word: 'indigo', why: 'the v3 palette has no indigo (a draws blue)' });
  if (/\b(?:balls?|socks?|marbles?|beads?|cards?|pens?|hats?|flags?)\b/.test(t)) return bad;   // the colours of things in the problem ('5 red and 7 blue balls'), not of the drawing
  const need = (word, names) => { if (!names.some(n => drawn.has(n))) bad.push({ word, why: `the diagram draws no ${names.join(' or ')}` }); };
  if (/\b(?:sky|light)[ -]blue\b/.test(t)) need('sky blue', ['sky blue']);
  if (/\b(?:dark blue|cobalt)\b/.test(t)) need('dark blue', ['blue']);
  const bare = t.replace(/\b(?:sky|light|dark)[ -]blue\b/g, ' ');
  if (/\bblue\b/.test(bare)) {
    if (drawn.has('blue') && drawn.has('sky blue') && bare === t) bad.push({ word: 'blue', why: 'the diagram draws both blue (a) and sky blue (e); say which ("sky blue" for e)' });
    else need('blue', ['blue', 'sky blue']);
  }
  for (const [re, word, names] of [[/\bteal\b/, 'teal', ['teal']], [/\b(?:amber|yellow)\b/, 'amber', ['amber']], [/\borange\b/, 'orange', ['orange']],
    [/\b(?:rose|red|crimson)\b/, 'rose', ['rose']], [/\b(?:violet|purple)\b/, 'violet', ['violet']], [/\bgreen\b/, 'green', ['green']],
    [/\b(?:pink|magenta)\b/, 'pink', ['pink', 'rose']]]) if (re.test(t)) need(word, names);
  // d was rose in the old palette: a rose or red caption over orange parts is the old name
  for (const p of bad) if (p.word === 'rose' && drawn.has('orange')) p.why += '; d draws orange since v3, so call those parts orange';
  return bad;
}
if (require.main !== module) { module.exports = { containerTree, fenceProblems, answerAboveFold, drawnColours, colourWordProblems, givenMarks, unexplainedMarks, countGiven }; return; }

const seenTex = [];   // [[file, tex]] of every formula, for the glyph report (P3-37)
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
  let html;
  try { html = md.render(body, { sections: true, lessonId: path.basename(file, '.md') }); }
  catch (e) { out('ERROR', file, 'renderer threw: ' + e.message); continue; }
  for (const m of html.matchAll(/class="m-err" title="([^"]*)">([^<]*)</g)) out('ERROR', file, `math does not parse: ${m[2].slice(0, 70)} — ${m[1].slice(0, 90)}`);
  // P0-17: a display formula a top-level \qquad cannot split into rows that wrap on a phone (md.js then draws it as one wide row, which shrinks
  // and scrolls); --long N adds long formulas with nothing to split at
  for (const f of ML.displayFindings(md, html, { long: LONG })) {
    const at = ML.lineOf(body, f.tex);
    out('WARN', file, `display formula${at ? ' at body line ' + at : ''} "${ML.clip(f.tex)}": ${f.why} (CONTENT_GUIDE §3 Maths)`);
  }
  for (const f of ML.formulas(html)) seenTex.push([file, f.tex]);
  for (const m of html.matchAll(/Diagram error<\/b><\/div><div class="co-b"><code>([^<]*)</g)) out('ERROR', file, 'diagram: ' + m[1]);
  if (/m-raw/.test(html)) out('ERROR', file, 'KaTeX not loaded while linting');
  // a "$" still visible after rendering means some maths was not recognised (space just inside $…$, newline inside, unescaped currency)
  {
    const real = globalThis.katex; globalThis.katex = { renderToString: () => '\u27e6M\u27e7' };
    let h2 = ''; try { h2 = md.render(body.replace(/\\\$/g, '\u2983D\u2984'), { sections: true, lessonId: path.basename(file, '.md') }); } finally { globalThis.katex = real; }
    // a drawing's title (div.dg-tt, HTML since P2-18) and its screen-reader description (div.dg-sr, P3-14) repeat its labels, where a "$" is
    // literal by design (the LL(1) end marker, MIPS registers): they are skipped like the drawing itself
    const visible = h2.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<div class="[^"]*\bdg-(?:sr|tt)\b[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<code>[\s\S]*?<\/code>/g, '').replace(/<[^>]+>/g, '');
    const at = visible.indexOf('$');
    if (at >= 0) out('ERROR', file, `a "$" is shown literally, so some maths was not recognised (no space just inside $…$, no line break inside, \\$ for money): …${visible.slice(Math.max(0, at - 40), at + 40).replace(/\n/g, ' ')}…`);
  }
  // quizzes
  for (const m of body.matchAll(/^(:{3,})\s*quiz[^\n]*\n([\s\S]*?)^\1\s*$/gm)) {
    const qs = md.parseQuiz(m[2]);
    if (!qs.length) out('ERROR', file, 'quiz block has no questions (start each with "Q: ")');
    qs.forEach((q, i) => {
      if (q.opts.length) {
        if (q.opts.length < 3) out('ERROR', file, `quiz Q${i + 1}: needs at least 3 options`);
        if (!q.opts.some(o => o.ok)) out('ERROR', file, `quiz Q${i + 1}: no option marked [x]`);
        if (!q.exp.trim()) out('WARN', file, `quiz Q${i + 1}: no explanation (> …)`);
      } else if (!q.ans || isNaN(parseFloat(q.ans))) out('ERROR', file, `quiz Q${i + 1}: NAT question needs "= number"`);
    });
  }
  for (const m of body.matchAll(/^:{3,}\s*lab\s+([a-z0-9-]+)/gm)) if (!labs.has(m[1])) out('ERROR', file, `lab embed "${m[1]}" is not in content/labs.json`);
  // colour names: table cells / rowClass take a|b|c|d|ok|bad|hl|mute (or a tc-* class a lab stylesheet defines); other "color" keys a-h|ok|bad|warn|mute
  for (const m of body.matchAll(/^(:{3,})\s*diagram[^\n]*\n([\s\S]*?)\n\1\s*$/gm)) {
    let spec; try { spec = JSON.parse(m[2]); } catch (e) { continue; }
    const at = 'diagram at body line ' + body.slice(0, m.index).split('\n').length;
    {
      const head = /^:{3,}\s*diagram([^\n]*)/.exec(m[0]), words = [(head && head[1].trim()) || spec.title || '', spec.caption || ''].join(' ');
      // P3-14: a drawing's accessible name is its alt, else its title; with neither (and no caption) a screen reader hears only the type
      // (a table is HTML, so its cells read out anyway)
      if (!words.trim() && !spec.alt && spec.type !== 'table') out('WARN', file, `${at}: a ${spec.type || 'diagram'} with no title, caption or alt; screen readers hear only "${spec.type || 'diagram'}" (give it a title after ::: diagram, a caption, or "alt")`);
      for (const p of colourWordProblems(words, drawnColours(spec))) out('WARN', file, `${at}: the title or caption says "${p.word}", but ${p.why} (CONTENT_GUIDE §4 names the colours)`);
    }
    const walk = o => {
      if (Array.isArray(o)) return o.forEach(walk);
      if (!o || typeof o !== 'object') return;
      if (o.type === 'table') {
        for (const [k, v] of Object.entries(o.cells || {})) if (!TABLE_COLOURS.has(v)) out('ERROR', file, `${at}: table cell ${k} colour "${v}" is not one of a, b, c, d, ok, bad, hl, mute (it renders uncoloured)`);
        if (o.rowClass && typeof o.rowClass === 'object') for (const [k, v] of Object.entries(o.rowClass)) if (v && v !== 'hl') out('ERROR', file, `${at}: table rowClass ${k} "${v}" is not "hl"`);
      }
      for (const [k, v] of Object.entries(o)) {
        if ((k === 'color' || k === 'colour') && typeof v === 'string' && !/^([a-h]|ok|bad|warn|mute)$/.test(v)) out('ERROR', file, `${at}: colour "${v}" is not a-h, ok, bad, warn or mute`);
        if (v && typeof v === 'object') walk(v);
      }
    };
    walk(spec);
  }
  for (const w of answerAboveFold(body.split('\n'))) {
    const fix = 'move it into the fold as the first block of the working (::::: example > :::: answer > ::: diagram)';
    if (w.why === 'after-fold') out('WARN', file, `example "${w.example}": text after its answer fold (body line ${w.line}) shows while the fold is closed; move it inside the fold`);
    else if (w.why === 'states-result') out('WARN', file, `example "${w.example}": the given diagram "${w.diagram}" (body line ${w.line}) gives the result away: ${w.detail}; keep the given plain and ${fix}, or add "given": true to its spec if its words only restate the given`);
    else if (w.why === 'unexplained-marks') out('WARN', file, `example "${w.example}": the given diagram "${w.diagram}" (body line ${w.line}) singles out parts that no word explains (${w.detail}); draw the given plain and put the marked copy in the fold, or say in the prompt, title or caption what each mark means ("Teal edges are assignments")`);
    else out('WARN', file, `example "${w.example}": the ${w.type} "${w.diagram}" (body line ${w.line}) sits between the prompt and the answer fold, but the prompt does not hand it over as the given; if it shows the answer or the working, ${fix}; if it is the given, say so in the prompt ("the graph below") or add "given": true to its spec`);
  }
  // P2-20: no lesson names the old palette's indigo, in a caption or in the text around a diagram (a draws blue)
  {
    const prose = body.replace(/```[\s\S]*?```/g, '').replace(/^(:{3,})\s*diagram[^\n]*\n[\s\S]*?\n\1\s*$/gm, '');
    const at = /^.*\bindigo\b.*$/im.exec(prose);
    if (at) out('WARN', file, `the text says "indigo", a colour the v3 diagrams never draw (a is blue, e is sky blue): …${at[0].trim().slice(0, 90)}…`);
  }
  // fences md.js does not render as written (wrongly nested containers, ":::" lines left as text): line numbers count the whole file
  {
    const fmN = raw.length - body.length ? raw.slice(0, raw.length - body.length).split('\n').length - 1 : 0, fp = fenceProblems(body.split('\n'), fmN);
    fp.forEach(p => out(p.why === 'inverted' ? 'WARN' : 'ERROR', file, `line ${p.line + 1 + fmN}: ${p.msg}`));
    // and what the reader would see: a ":::" left in the rendered text (outside code) that the walk above did not explain
    if (!fp.some(p => p.why !== 'inverted')) {
      const vis = html.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code>[\s\S]*?<\/code>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '\n');
      const hit = /(?:^|\n)[ \t]*(:{3,}[^\n]{0,40})/.exec(vis);
      if (hit) out('ERROR', file, `"${hit[1].trim()}" shows as text in the rendered lesson (a container fence md.js did not read)`);
    }
  }
  const unclosed = (body.match(/^:{3,}\s*[a-z]/gm) || []).length, closed = (body.match(/^:{3,}\s*$/gm) || []).length;
  if (unclosed !== closed) out('ERROR', file, `container fences unbalanced: ${unclosed} opened, ${closed} closed`);
  if (/\s<[a-z]+[ >]/.test(body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, ''))) out('WARN', file, 'raw HTML in markdown is escaped, not rendered');
}
// P3-37: a character KaTeX has no metrics for is drawn from a system font: it may show as a box on some phones and warns on the console. The
// outer-join signs ⟕ ⟖ ⟗ are known and accepted (mathlint.js KNOWN); any other one is named with the lessons that use it.
for (const g of ML.glyphReport(md, seenTex)) {
  if (g.known) continue;
  const where = g.where.map(f => path.relative(root, f));
  out('WARN', g.where[0] || path.join(root, 'content', 'subjects'), `KaTeX has no metrics for "${g.glyph}" (${g.code}) in ${g.n} formula(s)${where.length > 1 ? ' (also ' + where.slice(1, 4).join(', ') + (where.length > 4 ? ', …' : '') + ')' : ''}: it is drawn from a system font and may show as a box on some phones; use a KaTeX command or words (CONTENT_GUIDE §3 Maths)`);
}
if (!files.length) console.log('WARN no lessons found');
process.exit(errors ? 1 : 0);
