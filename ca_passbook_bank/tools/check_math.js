#!/usr/bin/env node
/* Render every string field of one or more JSON files (and lesson .md files) through the SITE's own markdown renderer and report:
     - math that KaTeX cannot parse,
     - "$" characters left over after rendering (math the renderer did not recognise, e.g. "$ x $" with inner spaces, "$x$5"),
     - characters KaTeX has no metrics for (audit P3-37): KaTeX draws them from a system font, which may show a box on some phones and warns
       on the console. The outer-join signs ⟕ ⟖ ⟗ of the database lessons are known and accepted (a NOTE with their count); any other one is a
       problem (use a KaTeX command or words),
     - display formulas a top-level \qquad cannot split into rows that wrap on a phone (audit P0-17, GA.md.displayLint): a NOTE, the formula
       still renders, as one wide row; --long N also notes display formulas of N or more TeX characters with nothing to split at.
   Usage: node tools/check_math.js [--long N] [pyq/parsed/cs-2019.json ...] [content/subjects/db/db.ra.ops.md ...]
          with no file: every lesson, every pyq/parsed and every pyq/meta file.      exit 1 if any problem is found (NOTE lines never fail). */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
globalThis.GA = {};
globalThis.katex = require(path.join(ROOT, 'vendor', 'katex', 'katex.min.js'));
const md = require(path.join(ROOT, 'app', 'js', 'core', 'md.js'));
const ML = require(path.join(ROOT, 'tools', 'buildlib', 'mathlint.js'));
try { require(path.join(ROOT, 'app', 'js', 'viz', 'diagram.js')); } catch (e) { /* lessons' drawings then render as code; the maths is unaffected */ }
// KaTeX's own 'No character metrics' console line is replaced by the glyph report at the end
const warn0 = console.warn;
console.warn = function (m) { if (typeof m === 'string' && /^No character metrics for /.test(m)) return; return warn0.apply(console, arguments); };

const argv = process.argv.slice(2), li = argv.indexOf('--long');
const LONG = li >= 0 ? +argv[li + 1] || 120 : 0;
if (li >= 0) argv.splice(li, /^\d+$/.test(argv[li + 1] || '') ? 2 : 1);
let files = argv;
if (!files.length) {
  const list = (dir, ext) => fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(ext)).sort().map(f => path.join(dir, f)) : [];
  const subj = path.join(ROOT, 'content', 'subjects');
  if (fs.existsSync(subj)) for (const d of fs.readdirSync(subj).sort()) if (fs.statSync(path.join(subj, d)).isDirectory()) files.push(...list(path.join(subj, d), '.md'));
  files.push(...list(path.join(ROOT, 'pyq', 'parsed'), '.json'), ...list(path.join(ROOT, 'pyq', 'meta'), '.json'));
}

function* walk(node, trail) {
  if (typeof node === 'string') yield [trail.join('.'), node];
  else if (Array.isArray(node)) for (let i = 0; i < node.length; i++) yield* walk(node[i], trail.concat(i));
  else if (node && typeof node === 'object') for (const k of Object.keys(node)) if (!['crop', 'key_raw', 'file'].includes(k)) yield* walk(node[k], trail.concat(k));
}
let bad = 0, notes = 0, total = 0;
const seen = [];   // [[place, tex]] of every formula, for the glyph report
for (const file of files) {
  const lesson = file.endsWith('.md');
  let items;
  if (lesson) items = [[path.basename(file, '.md'), { body: fs.readFileSync(file, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '') }]];
  else {
    const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
    items = Array.isArray(doc.questions) ? doc.questions.map(q => [q.id, q]) : [[path.basename(file), doc]];
  }
  const opts = id => (lesson ? { sections: true, lessonId: id } : { br: true });
  for (const [id, obj] of items) {
    for (const [where, text] of walk(obj, [])) {
      if (!text.includes('$')) continue;
      total++;
      let html;
      try { html = md.render(text, opts(id)); } catch (e) { bad++; console.log(`MATH ERROR ${id} ${where}: renderer threw ${e.message}`); continue; }
      for (const m of html.matchAll(/class="m-err" title="([^"]*)">([^<]*)</g)) { bad++; console.log(`MATH ERROR ${id} ${where}: ${m[2].slice(0, 70)} -> ${m[1].slice(0, 80)}`); }
      for (const f of ML.formulas(html)) seen.push([lesson ? id : `${id} ${where}`, f.tex]);
      for (const f of ML.displayFindings(md, html, { long: LONG })) {
        notes++;
        const at = lesson ? ML.lineOf(text, f.tex) : null;
        console.log(`MATH NOTE  ${id} ${where}${at ? ' line ' + at : ''}: display formula "${ML.clip(f.tex)}": ${f.why}`);
      }
      // second pass with a stub KaTeX: any "$" still visible in the text means a delimiter was not recognised as maths
      const real = globalThis.katex; globalThis.katex = { renderToString: () => '⟦M⟧' };
      let h2;
      try { h2 = md.render(text.replace(/\\\$/g, '⦃D⦄'), opts(id)); } finally { globalThis.katex = real; }
      const visible = h2.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<div class="[^"]*\bdg-(?:sr|tt)\b[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
        .replace(/<code>[\s\S]*?<\/code>/g, '').replace(/<[^>]+>/g, '');   // drawings and their screen-reader descriptions hold labels, not maths
      if (visible.includes('$')) { bad++; console.log(`MATH WARN  ${id} ${where}: a "$" is shown literally, so some maths was not recognised (no spaces just inside $…$; no newline inside inline $…$; use \\$ for money): ${text.slice(0, 90).replace(/\n/g, ' ')}`); }
    }
  }
}
// P3-37: the characters KaTeX had no metrics for, with the formulas that use them
for (const g of ML.glyphReport(md, seen)) {
  const at = g.where.slice(0, 4).join('; ') + (g.where.length > 4 ? `; … (${g.where.length} places)` : '');
  if (g.known) { notes++; console.log(`MATH NOTE  "${g.glyph}" (${g.code}, ${g.name}): no KaTeX metrics, drawn from a system font; known and accepted (${g.n} formula(s): ${at})`); }
  else { bad++; console.log(`MATH WARN  "${g.glyph}" (${g.code}): KaTeX has no metrics for it, so it is drawn from a system font and may show as a box on some phones; use a KaTeX command or words (${g.n} formula(s): ${at})`); }
}
console.log(`${total} text fields with maths checked, ${bad} problem${bad === 1 ? '' : 's'}${notes ? `, ${notes} note${notes === 1 ? '' : 's'}` : ''}`);
process.exit(bad ? 1 : 0);
