#!/usr/bin/env node
/* Validates the markdown dialect in content/*.md against spec/_style.md and prints
   a content inventory. Exits non-zero on a structural error.   node lint.js  */

const fs = require('fs');
const path = require('path');

const CONTENT = path.join(__dirname, 'content');

const KNOWN = ['scene', 'dialogue', 'think', 'attempt', 'ladder', 'key', 'trap',
  'decision', 'estimate', 'incident', 'evolve', 'transfer', 'formula', 'checkpoint'];

const ROW_KINDS = {
  scene: ['env', 'cast', 'face', 'cam', 'light', 'beat', 'a11y'],
  decision: ['trigger', 'semantics', 'path', 'owns', 'remove', 'alts', 'choice', 'cost', 'new', 'revisit'],
  estimate: ['given', 'ask', 'work', 'sanity'],
  incident: ['symptom', 'signal', 'ask', 'diagnosis', 'invariant', 'contain', 'recover', 'prevent'],
  evolve: ['first', 'challenge', 'fix', 'cost'],
  transfer: ['to', 'stops'],
  ladder: ['weak', 'good', 'great'],
  formula: ['what', 'formula', 'terms', 'watch'],
};

const REQUIRED = {
  scene: ['a11y'],
  decision: ['trigger', 'revisit'],
  transfer: ['stops'],
  incident: ['symptom', 'ask', 'diagnosis'],
  estimate: ['given', 'ask', 'work'],
  ladder: ['weak', 'good', 'great'],
  formula: ['formula'],
};

const NEEDS_TITLE = ['think', 'attempt', 'ladder', 'key', 'trap', 'decision', 'estimate', 'incident', 'evolve', 'transfer', 'formula'];

let errors = 0;
let warnings = 0;

function err(file, ln, msg) { console.error('  ERROR ' + file + ':' + ln + '  ' + msg); errors++; }
function warn(file, ln, msg) { console.warn('  warn  ' + file + ':' + ln + '  ' + msg); warnings++; }

const files = fs.existsSync(CONTENT)
  ? fs.readdirSync(CONTENT).filter((f) => f.endsWith('.md')).sort()
  : [];

if (!files.length) { console.error('No content/*.md found.'); process.exit(1); }

console.log('Linting ' + files.length + ' content files...\n');

const inventory = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(CONTENT, f), 'utf8');
  const lines = raw.split(/\r?\n/);
  const counts = { attempt: 0, think: 0, ladder: 0, scene: 0, incident: 0, decision: 0, estimate: 0, formula: 0 };
  const h2 = [];
  let inFence = false;
  let open = null;
  let rows = [];

  lines.forEach((line, k) => {
    const ln = k + 1;

    if (/^```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;

    const h = line.match(/^##\s+(.+)$/);
    if (h && !open) h2.push(h[1].trim());

    const d = line.match(/^:::([a-z]+)(?:\s+(.*))?$/);
    if (d) {
      if (open) { err(f, ln, ':::' + d[1] + ' opened inside :::' + open.kind + ' (directives never nest)'); return; }
      if (!KNOWN.includes(d[1])) { err(f, ln, 'unknown directive :::' + d[1]); return; }
      if (NEEDS_TITLE.includes(d[1]) && !(d[2] || '').trim()) err(f, ln, ':::' + d[1] + ' needs text on the opener line');
      open = { kind: d[1], ln };
      rows = [];
      if (counts[d[1]] !== undefined) counts[d[1]]++;
      return;
    }

    if (/^:::\s*$/.test(line)) {
      if (!open) { err(f, ln, 'stray closing ::: with no opener'); return; }
      const req = REQUIRED[open.kind] || [];
      for (const r of req) {
        if (!rows.includes(r)) err(f, open.ln, ':::' + open.kind + ' is missing required @' + r + ':');
      }
      if (open.kind === 'transfer' && rows.filter((r) => r === 'to').length > 2) {
        warn(f, open.ln, ':::transfer has more than two @to: rows (style guide caps it at two)');
      }
      if (open.kind === 'dialogue' && !rows.length) err(f, open.ln, ':::dialogue has no @P:/@Y:/@N: turns');
      open = null;
      return;
    }

    if (open) {
      const r = line.match(/^@([A-Za-z0-9]+):/);
      if (r) {
        const key = r[1];
        rows.push(key);
        if (open.kind === 'dialogue') {
          if (!['P', 'Y', 'N'].includes(key)) err(f, ln, 'unknown speaker @' + key + ': (expected P, Y or N)');
        } else if (ROW_KINDS[open.kind] && !ROW_KINDS[open.kind].includes(key.toLowerCase())) {
          err(f, ln, '@' + key + ': is not a valid row for :::' + open.kind +
            ' (allowed: ' + ROW_KINDS[open.kind].join(', ') + ')');
        }
      }
    }
  });

  if (open) err(f, open.ln, ':::' + open.kind + ' is never closed');
  if (inFence) err(f, lines.length, 'unclosed code fence');

  const words = raw.replace(/```[\s\S]*?```/g, ' ').replace(/[#*`|>-]/g, ' ')
    .split(/\s+/).filter(Boolean).length;

  inventory.push({ f, words, counts, h2 });
}

/* ---------------------------------------------------------------- report */

let totalWords = 0, totalAttempts = 0;
for (const it of inventory) {
  totalWords += it.words;
  totalAttempts += it.counts.attempt;
  console.log('  ' + it.f.padEnd(24) + String(it.words).padStart(6) + ' words   ' +
    'attempt:' + it.counts.attempt + ' think:' + it.counts.think + ' ladder:' + it.counts.ladder +
    ' scene:' + it.counts.scene + ' incident:' + it.counts.incident +
    ' decision:' + it.counts.decision + ' estimate:' + it.counts.estimate +
    ' formula:' + it.counts.formula);
  it.h2.forEach((h) => console.log('        ## ' + h));
}

console.log('\n  ' + inventory.length + ' files · ' + totalWords.toLocaleString() + ' words · ' +
  totalAttempts + ' attempt gates');

for (const it of inventory) {
  if (it.words > 400 && it.counts.attempt === 0) {
    warn(it.f, 0, 'no :::attempt gate in ' + it.words + ' words — the style guide calls this under-written');
  }
}

/* ------------------------------------------------------------------------
   Scope guards. Paper 5 is where fabrication risk is highest, so two rules
   are enforced mechanically rather than trusted:
     1. every Standard on Auditing cited must be one the ICAI syllabus names;
     2. no CARO clause numbers, which change and must not be asserted.      */

const ALLOWED_SA = new Set(['200', '210', '220', '230', '260', '265', '300', '315', '320',
  '330', '450', '500', '501', '505', '510', '520', '530', '550', '560', '570', '580', '610',
  '700', '701', '705', '706', '710']);

let saChecked = 0;
for (const f of files) {
  const raw = fs.readFileSync(path.join(CONTENT, f), 'utf8');
  raw.split(/\r?\n/).forEach((line, k) => {
    let m;
    const re = /\bSA\s+(\d{3})/g;
    while ((m = re.exec(line)) !== null) {
      saChecked++;
      if (!ALLOWED_SA.has(m[1])) {
        err(f, k + 1, 'SA ' + m[1] + ' is not named in the ICAI syllabus (spec/syllabus-group2.md)');
      }
    }
    if (/CARO/i.test(line) && /clause\s*\(?\s*(?:[ivxlc]+|\d+)\s*\)?/i.test(line)) {
      err(f, k + 1, 'CARO clause number asserted — teach CARO without clause numbers and add a Verify line');
    }
  });
}
console.log('  ' + saChecked + ' Standard-on-Auditing citations checked against the syllabus');

console.log(errors ? '\nFAILED with ' + errors + ' error(s), ' + warnings + ' warning(s).'
  : '\nOK' + (warnings ? ' with ' + warnings + ' warning(s).' : '.'));
process.exit(errors ? 1 : 0);
