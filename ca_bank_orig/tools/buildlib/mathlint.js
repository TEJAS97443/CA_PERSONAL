/* The maths checks tools/lint_content.js (lessons, run by build.py) and tools/check_math.js (any lesson or PYQ JSON) share. They read the
   markup the site's own renderer (app/js/core/md.js) produced, so they check exactly what a learner sees:
     formulas(html)            every formula of rendered markup: [{tex, display}] (from data-tex, which holds the TeX as written)
     displayFindings(md, html) P0-17: display formulas a top-level \qquad cannot split into rows that wrap on a phone (GA.md.displayLint);
                               opts.long = N also names display formulas of N or more TeX characters with nothing to split at (for authors)
     glyphReport(md, seen)     P3-37: the characters KaTeX has no metrics for (GA.md.glyphs: KaTeX draws them from a system font, which may
                               show a box on some phones and warns on the console); seen = [[where, tex]] attributes each to its formulas.
                               The outer-join signs of the database lessons are known and accepted (md.js keeps their warning off the
                               console; no Android or Windows box seen): known: true. Any other character is a finding.
   Both helpers feature-detect md.js's functions, so an older renderer simply skips the check. */
'use strict';

const KNOWN = { '⟕': 'left outer join', '⟖': 'right outer join', '⟗': 'full outer join', '₹': 'rupee sign (CONTENT_GUIDE §3: \\text{₹} in maths)' };

const unesc = s => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** every formula of rendered markup, in order: [{tex, display}] (a display formula split into rows still counts once) */
function formulas(html) {
  const out = [];
  for (const m of String(html || '').matchAll(/<span class="m( md)?(?: [^"]*)?" data-tex="([^"]*)"/g)) out.push({ tex: unesc(m[2]), display: !!m[1] });
  return out;
}

/** P0-17: [{tex, why}] for the display formulas of rendered markup that GA.md.displayLint names */
function displayFindings(md, html, opts) {
  if (!md || typeof md.displayLint !== 'function') return [];
  const out = [], o = opts && opts.long ? { long: +opts.long } : undefined;
  for (const f of formulas(html)) {
    if (!f.display) continue;
    const why = md.displayLint(f.tex, o);
    if (why) out.push({ tex: f.tex, why });
  }
  return out;
}

/** P3-37: [{glyph, code, name, known, n, where}] for every character KaTeX had no metrics for so far, most formulas first; n = formulas in
    seen that hold it, where = their distinct places in first-seen order */
function glyphReport(md, seen) {
  if (!md || typeof md.glyphs !== 'function') return [];
  return md.glyphs().map(g => {
    const hits = (seen || []).filter(([, tex]) => String(tex).includes(g));
    const where = [...new Set(hits.map(([w]) => w))];
    const code = 'U+' + g.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    return { glyph: g, code, name: KNOWN[g] || null, known: Object.prototype.hasOwnProperty.call(KNOWN, g), n: hits.length, where };
  }).sort((a, b) => b.n - a.n || a.code.localeCompare(b.code));
}

/** the body line (1-based) where a formula's TeX starts in its source, or null */
function lineOf(src, tex) {
  const s = String(src || ''), t = String(tex || '');
  let at = t ? s.indexOf(t) : -1;
  if (at < 0 && t.length > 24) at = s.indexOf(t.slice(0, 24));
  return at < 0 ? null : s.slice(0, at).split('\n').length;
}

const clip = (t, n = 60) => { const s = String(t).replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

module.exports = { KNOWN, unesc, formulas, displayFindings, glyphReport, lineOf, clip };
