#!/usr/bin/env node
/* Print every lab example (preset) as JSON for build.py, which checks the past-paper questions they cite (audit P1-38).
   A preset names its question(s) in `pyq: 'cs-2015-3:CS36'` (or a list) or in a leading tag, '[cs-2015-3:CS36] Address · …' (the framework's
   format, app/js/labs/framework.js); any other id written inside a label is an older, unstructured citation.
   Output: [{lab, i, label, pyq: [ids] | null, tag: [ids] | null}]. Usage: node tools/buildlib/lab_presets.js */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
globalThis.GA = globalThis.GA || {};
require(path.join(root, 'app/js/core/util.js'));
const defs = {};
GA.lab = { register: d => { if (d && d.id) defs[d.id] = d; return d; } };
const QID = /^cs-\d{4}(?:-\d)?:(?:CS|GA|Q)\d+$/;
const errors = [];
for (const f of fs.readdirSync(path.join(root, 'app/js/labs')).sort()) {
  if (!f.endsWith('.js') || f === 'framework.js') continue;
  const id = f.replace(/\.js$/, '');
  try { require(path.join(root, 'app/js/labs', f)); } catch (e) { errors.push(`${f}: ${e.message}`); continue; }
  const g = globalThis['__lab_def_' + id] || globalThis['__lab_def_' + id.replace(/-/g, '_')];
  if (g && g.id && !defs[g.id]) defs[g.id] = g;
}
const out = [];
for (const [lab, d] of Object.entries(defs).sort()) (d.presets || []).forEach((p, i) => {
  const label = String((p && p.label) || ''), m = /^\[([^\]]+)\]\s*/.exec(label);
  const tag = m && m[1].split(/\s*,\s*/).every(x => QID.test(x)) ? m[1].split(/\s*,\s*/) : null;
  out.push({ lab, i, label, pyq: p && p.pyq ? [].concat(p.pyq).map(String) : null, tag });
});
process.stdout.write(JSON.stringify({ presets: out, errors }));
