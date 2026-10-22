#!/usr/bin/env node
/* Static site generator for "The Firm" — CA Inter Group II short notes.
   Reads content/*.md written against spec/_style.md and emits self-contained HTML.
   No dependencies:  node build.js  */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONTENT = path.join(ROOT, 'content');

/* ===================================================================== pages */

const PAGES = [
  {
    slug: 'desk-costing', num: '4', nav: 'The Costing Desk',
    title: 'The Costing Desk', kicker: 'Paper 4 · 100 marks',
    question: 'What did it cost, and how do you defend the number?',
    lede: 'Cost and Management Accounting. Cost sheets, material and employee cost, overheads, the four methods of costing, and the three control techniques — standard costing, marginal costing and budgets.',
    build: 'Cost and Management Accounting',
    concepts: 'Cost sheets · material and employee cost · overheads and ABC · reconciliation · job, batch, process and service costing · standard costing variances · CVP and marginal costing · budgetary control',
    why: 'The most numerical paper in the group, and the most reliably scoring one if the formats are automatic.',
    files: ['p4-1-overview', 'p4-2-ascertainment', 'p4-3-methods', 'p4-4-control'],
  },
  {
    slug: 'desk-audit', num: '5', nav: 'The Audit Desk',
    title: 'The Audit Desk', kicker: 'Paper 5 · 100 marks',
    question: 'What evidence would convince a stranger who assumes you are wrong?',
    lede: 'Auditing and Ethics. Eleven units from the nature of audit through risk, evidence, documentation and the report — anchored on the Standards on Auditing the syllabus names, and closing on professional ethics.',
    build: 'Auditing and Ethics',
    concepts: 'SA 200 · SA 300 planning · risk and materiality (SA 315, 320, 330) · evidence (SA 500, 501, 505, 510, 520, 530, 550, 610) · audit of items · SA 230 · completion (SA 450, 560, 570, 580, 260, 265) · reports (SA 700, 701, 705, 706, 710, CARO) · entities · banks · ethics (SA 210, 220, SQC 1)',
    why: 'Theory-heavy and language-sensitive: marks come from using the Standard’s own vocabulary.',
    files: ['p5-1-nature', 'p5-2-planning', 'p5-3-risk', 'p5-4-evidence', 'p5-5-items',
            'p5-6-documentation', 'p5-7-completion', 'p5-8-report', 'p5-9-entities',
            'p5-10-banks', 'p5-11-ethics'],
  },
  {
    slug: 'desk-treasury', num: '6A', nav: 'The Treasury Desk',
    title: 'The Treasury Desk', kicker: 'Paper 6A · 50 marks',
    question: 'Is this worth funding, and with whose money?',
    lede: 'Financial Management. Ratios, sources of finance and cost of capital, capital structure and leverage, investment appraisal and dividend policy, and the working capital cycle.',
    build: 'Financial Management',
    concepts: 'Ratio analysis · sources of finance · cost of capital and WACC · capital structure theories · leverages · payback, ARR, NPV, IRR, MIRR, PI · dividend models (Walter, Gordon, MM) · working capital cycle · receivables, payables, cash',
    why: 'Formula-dense but bounded: the same dozen formulas answer most of the paper.',
    files: ['p6a-1-analysis', 'p6a-2-financing', 'p6a-3-investment', 'p6a-4-working-capital'],
  },
  {
    slug: 'desk-boardroom', num: '6B', nav: 'The Boardroom',
    title: 'The Boardroom', kicker: 'Paper 6B · 50 marks',
    question: 'Where are we going, and what makes that defensible?',
    lede: 'Strategic Management. Strategic intent and levels, external and internal analysis, the choice of strategy and the matrices that structure it, then implementation, control and performance measures.',
    build: 'Strategic Management',
    concepts: 'Vision, mission, goals, values · strategic levels · PESTLE · Porter’s Five Forces · value chain and PLC · Mendelow · SWOT · generic strategies · Ansoff, ADL, BCG, GE matrices · digital transformation · structure and culture · strategic control',
    why: 'Shortest syllabus in the group and the easiest to score on with clean, framework-led answers.',
    files: ['p6b-1-intro', 'p6b-2-external', 'p6b-3-internal', 'p6b-4-choices', 'p6b-5-implementation'],
  },
];

const UPCOMING = [];

/* ========================================================= concept tracker */

const TRACKER = [
  ['Paper 4 — Overview & cost sheets', [
    ['c4-scope', 'Objectives and scope of cost & management accounting', ''],
    ['c4-rel', 'Cost vs financial vs management accounting vs FM', ''],
    ['c4-terms', 'Cost terms, cost centres, cost units', ''],
    ['c4-redctrl', 'Cost reduction vs cost control', ''],
    ['c4-behaviour', 'Fixed, variable, semi-variable and step costs', ''],
    ['c4-digital', 'Digital costing', ''],
    ['c4-sheet', 'Cost sheet format — manufacturing', ''],
    ['c4-sheet-svc', 'Cost sheet format — service sector', ''],
  ]],
  ['Paper 4 — Ascertainment of cost', [
    ['c4-mat-val', 'Valuation of receipts, issues and closing stock', ''],
    ['c4-eoq', 'EOQ and optimum order quantity', ''],
    ['c4-levels', 'Stock levels: minimum, maximum, re-order, safety', ''],
    ['c4-abc', 'ABC, FSN, HML, VED, JIT', ''],
    ['c4-losses', 'Waste, scrap, spoilage, defectives, obsolescence', ''],
    ['c4-gem-erp', 'GeM, ERP costing, tender and quotation', ''],
    ['c4-wages', 'Elements of wages; overtime and idle time treatment', ''],
    ['c4-turnover', 'Employee turnover — methods, causes, effects', ''],
    ['c4-incentive', 'Halsey and Rowan premium bonus plans', ''],
    ['c4-direct-exp', 'Direct expenses and their treatment', ''],
    ['c4-oh-alloc', 'Allocation, apportionment, absorption of overheads', ''],
    ['c4-oh-secondary', 'Primary and secondary distribution', ''],
    ['c4-oh-admin', 'Administration and selling & distribution overheads', ''],
    ['c4-rnd', 'Treatment of R&D cost', ''],
    ['c4-abc-costing', 'Activity Based Costing', ''],
    ['c4-recon', 'Cost–financial reconciliation (non-integrated)', ''],
    ['c4-integrated', 'Integrated vs non-integrated accounting', ''],
  ]],
  ['Paper 4 — Methods of costing', [
    ['c4-unit', 'Single output / unit costing', ''],
    ['c4-job', 'Job costing', ''],
    ['c4-batch', 'Batch costing and economic batch quantity', ''],
    ['c4-process', 'Process costing; normal and abnormal loss/gain', ''],
    ['c4-equiv', 'Equivalent units and WIP valuation', ''],
    ['c4-interprocess', 'Inter-process profit', ''],
    ['c4-joint', 'Joint products — apportioning joint cost', ''],
    ['c4-byproduct', 'By-products — treatment of cost', ''],
    ['c4-service', 'Service sector costing and pricing', ''],
  ]],
  ['Paper 4 — Cost control & analysis', [
    ['c4-std-set', 'Setting standards; types of standards', ''],
    ['c4-var-mat', 'Material cost variances', ''],
    ['c4-var-lab', 'Labour cost variances', ''],
    ['c4-var-voh', 'Variable overhead variances', ''],
    ['c4-var-foh', 'Fixed overhead variances', ''],
    ['c4-cvp', 'CVP, BEP, margin of safety, angle of incidence', ''],
    ['c4-pv-chart', 'Break-even and profit-volume charts', ''],
    ['c4-abs-vs-mar', 'Marginal vs absorption costing reconciliation', ''],
    ['c4-decisions', 'Make or buy, discontinuation, key factor', ''],
    ['c4-multi-bep', 'Multiproduct break-even analysis', ''],
    ['c4-budget', 'Budget manual, budget setting, monitoring', ''],
    ['c4-flexible', 'Flexible and functional budgets', ''],
    ['c4-cash-master', 'Cash budget and master budget', ''],
    ['c4-zbb', 'ZBB, performance budget, control ratios', ''],
  ]],
  ['Paper 5 — Nature, planning, risk', [
    ['c5-sa200', 'SA 200 — objectives and conduct of an audit', ''],
    ['c5-limits', 'Inherent limitations of an audit', ''],
    ['c5-qualities', 'Qualities of an auditor; scope of audit', ''],
    ['c5-sa300', 'SA 300 — strategy, plan and audit programme', ''],
    ['c5-risk', 'Audit risk = inherent x control x detection', ''],
    ['c5-sa320', 'SA 320 — materiality and performance materiality', ''],
    ['c5-sa315', 'SA 315 — identifying and assessing RoMM', ''],
    ['c5-ic', 'Internal control: evaluation and testing', ''],
    ['c5-sa330', 'SA 330 — responses to assessed risks', ''],
    ['c5-digital', 'Digital audit, IT risks, IFC, data analytics', ''],
  ]],
  ['Paper 5 — Evidence & items', [
    ['c5-sa500', 'SA 500 — sufficient appropriate audit evidence', ''],
    ['c5-assertions', 'Assertions and audit trail', ''],
    ['c5-sa530', 'SA 530 — audit sampling', ''],
    ['c5-sa501', 'SA 501 — inventory, litigation, segment information', ''],
    ['c5-sa505', 'SA 505 — external confirmations', ''],
    ['c5-sa510', 'SA 510 — opening balances', ''],
    ['c5-sa520', 'SA 520 — analytical procedures', ''],
    ['c5-sa550', 'SA 550 — related parties', ''],
    ['c5-sa610', 'SA 610 — using the work of internal auditors', ''],
    ['c5-ifc-icofr', 'IFC vs ICOFR', ''],
    ['c5-items-rev', 'Audit of revenue and other income items', ''],
    ['c5-items-exp', 'Audit of purchases and expense items', ''],
    ['c5-items-liab', 'Audit of share capital, borrowings, payables, provisions', ''],
    ['c5-items-assets', 'Audit of PPE, intangibles, receivables, inventory, cash', ''],
    ['c5-contingent', 'Audit of contingent liabilities', ''],
  ]],
  ['Paper 5 — Completion & reporting', [
    ['c5-sa230', 'SA 230 — audit documentation, ownership, custody', ''],
    ['c5-sa560', 'SA 560 — subsequent events', ''],
    ['c5-sa570', 'SA 570 — going concern', ''],
    ['c5-sa450', 'SA 450 — evaluation of misstatements', ''],
    ['c5-sa580', 'SA 580 — written representations', ''],
    ['c5-sa260', 'SA 260 / SA 265 — communication with TCWG', ''],
    ['c5-sa700', 'SA 700 — forming an opinion; report elements', ''],
    ['c5-sa701', 'SA 701 — key audit matters', ''],
    ['c5-sa705', 'SA 705 — qualified, adverse, disclaimer', ''],
    ['c5-sa706', 'SA 706 — EOM and Other Matter paragraphs', ''],
    ['c5-sa710', 'SA 710 — comparative information', ''],
    ['c5-caro', 'CARO and Companies Act reporting requirements', ''],
    ['c5-branch', 'Branch audit and joint audit', ''],
  ]],
  ['Paper 5 — Entities, banks, ethics', [
    ['c5-govt', 'Government and local body audit', ''],
    ['c5-npo', 'NPOs, trusts and societies', ''],
    ['c5-firms', 'Partnership firms and LLPs', ''],
    ['c5-undertakings', 'Educational institutions, hotels, clubs, hospitals', ''],
    ['c5-coop', 'Co-operative societies audit', ''],
    ['c5-banks', 'Bank audit: revenue items, advances, NPAs', ''],
    ['c5-ethics-principles', 'Five fundamental principles of professional ethics', ''],
    ['c5-threats', 'Five threats to independence and safeguards', ''],
    ['c5-skepticism', 'Professional skepticism', ''],
    ['c5-sa210', 'SA 210 — terms of engagement, preconditions', ''],
    ['c5-sqc1', 'SQC 1 and SA 220 — quality control', ''],
  ]],
  ['Paper 6A — Financial Management', [
    ['c6a-objective', 'Profit vs wealth maximisation; value creation', ''],
    ['c6a-roles', 'Financial manager vs financial controller', ''],
    ['c6a-distress', 'Financial distress and insolvency', ''],
    ['c6a-ratios', 'Calculation and interpretation of ratios', ''],
    ['c6a-ratio-limits', 'Limitations of ratio analysis', ''],
    ['c6a-sources-lt', 'Long-term sources of finance', ''],
    ['c6a-sources-st', 'Short-term sources of finance', ''],
    ['c6a-contemporary', 'P2P, crowd funding, start-up and venture funding', ''],
    ['c6a-lease', 'Lease financing, sale and lease back, convertible debt', ''],
    ['c6a-koc', 'Cost of individual components of capital', ''],
    ['c6a-wacc', 'WACC and marginal cost of capital', ''],
    ['c6a-capstruct', 'Determinants and design of optimum capital structure', ''],
    ['c6a-theories', 'Capital structure theories; relevance vs irrelevance', ''],
    ['c6a-ebit-eps', 'EBIT-EPS and breakeven-EBIT analysis', ''],
    ['c6a-cap', 'Over and under capitalisation', ''],
    ['c6a-lev', 'Operating, financial and combined leverage', ''],
    ['c6a-payback', 'Payback and discounted payback', ''],
    ['c6a-arr', 'Accounting rate of return', ''],
    ['c6a-npv', 'NPV, capital rationing, equivalent annual cost', ''],
    ['c6a-irr', 'IRR, its limitations, multiple IRRs', ''],
    ['c6a-mirr', 'MIRR — process and strengths', ''],
    ['c6a-pi', 'Profitability index', ''],
    ['c6a-div-forms', 'Cash dividend, bonus, stock split, buy back', ''],
    ['c6a-div-models', 'Walter, Gordon and MM', ''],
    ['c6a-wc-cycle', 'Operating and cash conversion cycle', ''],
    ['c6a-wc-assess', 'Assessment of working capital requirement', ''],
    ['c6a-receivables', 'Receivables and credit management', ''],
    ['c6a-factoring', 'Factoring and forfaiting', ''],
    ['c6a-payables', 'Management of payables', ''],
    ['c6a-cash', 'Cash and treasury management', ''],
    ['c6a-banking', 'Banking norms of working capital finance', ''],
  ]],
  ['Paper 6B — Strategic Management', [
    ['c6b-nature', 'Meaning, nature, importance and limitations', ''],
    ['c6b-intent', 'Vision, mission, goals, values', ''],
    ['c6b-levels', 'Network, corporate, business, functional levels', ''],
    ['c6b-pestle', 'PESTLE analysis', ''],
    ['c6b-industry', 'Defining the industry: value chain and PLC', ''],
    ['c6b-fiveforces', 'Porter’s Five Forces', ''],
    ['c6b-customers', 'Understanding customers, markets and competition', ''],
    ['c6b-mendelow', 'Mendelow’s stakeholder model', ''],
    ['c6b-drivers', 'Strategic drivers', ''],
    ['c6b-resources', 'Role of resources and capabilities', ''],
    ['c6b-swot', 'SWOT — combining external and internal', ''],
    ['c6b-generic', 'Porter’s generic strategies', ''],
    ['c6b-choices', 'Concentric, conglomerate, integration, turnaround, divestiture', ''],
    ['c6b-ansoff', 'Ansoff’s matrix', ''],
    ['c6b-bcg', 'BCG matrix', ''],
    ['c6b-adl-ge', 'ADL and GE matrices', ''],
    ['c6b-impl', 'Formulation vs implementation; linkages and issues', ''],
    ['c6b-digital', 'Strategic change through digital transformation', ''],
    ['c6b-structure', 'Organisation structure (hard) and culture (soft)', ''],
    ['c6b-leadership', 'Strategic leadership', ''],
    ['c6b-control', 'Strategic control and performance measures', ''],
  ]],
];

/* ================================================================== inline */

const SENT = String.fromCharCode(1);
const SENT_RE = new RegExp(SENT + '(\\d+)' + SENT, 'g');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(src) {
  let s = esc(src);
  const code = [];
  s = s.replace(/`([^`]+)`/g, (_m, c) => { code.push(c); return SENT + (code.length - 1) + SENT; });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/ -- /g, ' &mdash; ');
  s = s.replace(/ --$/, ' &mdash;');
  s = s.replace(/->/g, '&rarr;');
  s = s.replace(SENT_RE, (_m, i) => '<code>' + code[+i] + '</code>');
  return s;
}

/* =========================================================== highlighting */

const JAVA_RE = new RegExp([
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)',
  '("(?:[^"\\\\\\n]|\\\\.)*")',
  "('(?:[^'\\\\\\n]|\\\\.)*')",
  '(@[A-Za-z_]\\w*)',
  '\\b(abstract|assert|break|case|catch|class|continue|default|do|else|enum|extends|final|finally|for|if|implements|import|instanceof|interface|new|non-sealed|package|permits|private|protected|public|record|return|sealed|static|super|switch|synchronized|this|throw|throws|transient|try|var|volatile|while|yield)\\b',
  '\\b(int|long|double|float|boolean|char|byte|short|void)\\b',
  '\\b(true|false|null)\\b',
  '\\b(\\d[\\d_]*(?:\\.\\d+)?[lLdDfF]?)\\b',
  '\\b([A-Z][A-Za-z0-9_]*)\\b',
  '\\b([a-z_]\\w*)(?=\\s*\\()',
].join('|'), 'g');

const SQL_RE = new RegExp([
  '(--[^\\n]*)',
  "('(?:[^'\\\\\\n]|\\\\.)*')",
  '\\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|NOT|NULL|JOIN|LEFT|INNER|OUTER|ON|GROUP|ORDER|BY|LIMIT|OFFSET|SET|VALUES|INTO|CREATE|TABLE|INDEX|UNIQUE|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|CHECK|ALTER|ADD|DROP|BEGIN|COMMIT|ROLLBACK|RETURNING|DESC|ASC|AS|DISTINCT|COUNT|SUM|MAX|MIN|COALESCE|EXISTS|IN|CASE|WHEN|THEN|ELSE|END|WITH|PARTITION|DEFAULT|CASCADE|IF)\\b',
  '\\b(bigint|integer|smallint|text|varchar|uuid|timestamptz|timestamp|boolean|numeric|jsonb|bytea|char|date|serial)\\b',
  '\\b(\\d+)\\b',
  '(:[a-z_]\\w*)',
].join('|'), 'gi');

function highlightJava(src) {
  return esc(src).replace(JAVA_RE, (m, cmt, str, chr, ann, kw, prim, lit, num, cls, meth) => {
    if (cmt) return '<span class="c">' + m + '</span>';
    if (str || chr) return '<span class="s">' + m + '</span>';
    if (ann) return '<span class="an">' + m + '</span>';
    if (kw) return '<span class="k">' + m + '</span>';
    if (prim) return '<span class="kt">' + m + '</span>';
    if (lit) return '<span class="lit">' + m + '</span>';
    if (num) return '<span class="n">' + m + '</span>';
    if (cls) return '<span class="ty">' + m + '</span>';
    if (meth) return '<span class="fn">' + m + '</span>';
    return m;
  });
}

function highlightSql(src) {
  return esc(src).replace(SQL_RE, (m, cmt, str, kw, ty, num, bind) => {
    if (cmt) return '<span class="c">' + m + '</span>';
    if (str) return '<span class="s">' + m + '</span>';
    if (kw) return '<span class="k">' + m + '</span>';
    if (ty) return '<span class="kt">' + m + '</span>';
    if (num) return '<span class="n">' + m + '</span>';
    if (bind) return '<span class="lit">' + m + '</span>';
    return m;
  });
}

/* ================================================================ helpers */

function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* =========================================================== block parser */

const FENCE = /^```(\w*)\s*$/;
const DIRECTIVE = /^:::([a-z]+)(?:\s+(.*))?$/;
const CLOSE = /^:::\s*$/;
const HEADING = /^(#{2,4})\s+(.*?)\s*#*$/;
const LIST = /^(\s*)([-*]|\d+[.)])\s+(.*)$/;
const HR = /^(-{3,}|\*{3,}|_{3,})\s*$/;
const ROW = /^@([a-z0-9]+):\s*(.*)$/;

const SLATE_LABEL = {
  env: 'Set', cast: 'Cast', face: 'Faces', cam: 'Camera',
  light: 'Light', beat: 'Beat', a11y: 'In words',
};
const DECISION_LABEL = {
  trigger: 'Trigger', semantics: 'Semantics', path: 'On the path', owns: 'Owns',
  remove: 'If removed', alts: 'Alternatives', choice: 'Choice', cost: 'Cost & limits',
  new: 'New problems', revisit: 'Revisit when',
};
const ESTIMATE_LABEL = { given: 'Given', ask: 'Attempt it', work: 'Solution', sanity: 'Check' };
const INCIDENT_LABEL = {
  symptom: 'Symptom', signal: 'Signals', ask: 'Diagnose it', diagnosis: 'Root cause',
  invariant: 'Invariant broken', contain: 'Containment', recover: 'Recovery', prevent: 'Prevention',
};
const EVOLVE_LABEL = { first: 'First pass', challenge: 'The challenge', fix: 'The fix', cost: 'What it cost' };
const TRANSFER_LABEL = { to: 'Also applies to', stops: 'Where it stops' };
const FORMULA_LABEL = { what: 'Measures', formula: 'Formula', terms: 'Terms', watch: 'Watch out' };

const SEALED_FROM = { decision: 'alts', estimate: 'work', incident: 'diagnosis' };

function readFence(lines, i) {
  const lang = lines[i].match(FENCE)[1];
  const body = [];
  i++;
  while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
  return [lang, body.join('\n'), i + 1];
}

function renderCode(lang, body) {
  if (lang === 'arch') return '<pre class="arch">' + esc(body) + '</pre>';
  if (lang === 'board') return '<pre class="board">' + esc(body) + '</pre>';
  const inner = lang === 'java' ? highlightJava(body) : lang === 'sql' ? highlightSql(body) : esc(body);
  const label = lang && lang !== 'text' ? '<span class="code-lang">' + esc(lang) + '</span>' : '';
  return '<div class="code">' + label + '<pre><code>' + inner + '</code></pre></div>';
}

function collect(lines, i) {
  const inner = [];
  i++;
  while (i < lines.length) {
    if (FENCE.test(lines[i])) {
      const [, , next] = readFence(lines, i);
      for (let k = i; k < next; k++) inner.push(lines[k]);
      i = next;
      continue;
    }
    if (CLOSE.test(lines[i])) return [inner, i + 1];
    inner.push(lines[i++]);
  }
  return [inner, i];
}

function parseRows(inner) {
  const rows = [];
  let cur = null;
  for (const line of inner) {
    const m = line.match(ROW);
    if (m) {
      if (cur) rows.push(cur);
      cur = { key: m[1], lines: [m[2]] };
    } else if (cur) {
      cur.lines.push(line);
    } else if (line.trim()) {
      cur = { key: '_', lines: [line] };
    }
  }
  if (cur) rows.push(cur);
  return rows;
}

/* --------------------------------------------------------------- renderers */

function renderSlate(title, inner) {
  const rows = parseRows(inner);
  const body = rows.map((r) => {
    const label = SLATE_LABEL[r.key] || r.key;
    const cls = 'slate-row' + (r.key === 'a11y' ? ' a11y' : r.key === 'beat' ? ' beat' : '');
    return '<div class="' + cls + ' slate-k">' + label + '</div>' +
           '<div class="' + cls + ' slate-v">' + inline(r.lines.join(' ').trim()) + '</div>';
  }).join('\n');
  return '<figure class="slate">\n<div class="slate-bar"><span class="slate-tag">Scene</span>' +
    '<span class="slate-title">' + inline(title || '') + '</span></div>\n' +
    '<div class="slate-body">' + body + '</div>\n</figure>';
}

const WHO = { P: ['p', 'Principal'], Y: ['y', 'You'], N: ['n', 'Margin note'] };

function renderDialogue(inner) {
  const turns = [];
  let cur = null;
  for (const line of inner) {
    const m = line.match(/^@([PYN]):\s*(.*)$/);
    if (m) {
      if (cur) turns.push(cur);
      cur = { who: m[1], lines: [m[2]] };
    } else if (cur) cur.lines.push(line);
  }
  if (cur) turns.push(cur);
  return '<div class="dialogue">\n' + turns.map((t) => {
    const [cls, name] = WHO[t.who];
    const paras = t.lines.join('\n').split(/\n\s*\n/).filter((p) => p.trim())
      .map((p) => '<p>' + inline(p.replace(/\n/g, ' ').trim()) + '</p>').join('');
    return '<div class="turn ' + cls + '"><div class="turn-who">' + name + '</div>' +
      '<div class="turn-what">' + paras + '</div></div>';
  }).join('\n') + '\n</div>';
}

function renderLadder(question, inner) {
  const TIER = { weak: ['weak', 'Would lose marks'], good: ['good', 'Passing'], great: ['great', 'Full marks'] };
  const rows = parseRows(inner).filter((r) => TIER[r.key]);
  const id = 'g' + hash('ladder' + question);
  const tiers = rows.map((r) => {
    const [cls, label] = TIER[r.key];
    return '<div class="tier ' + cls + '"><div class="tier-label">' + label + '</div>' +
      '<div class="tier-body">' + renderBlocks(r.lines, null) + '</div></div>';
  }).join('\n');
  return '<details class="gate" data-id="' + id + '">\n<summary><span class="gate-seal">&#10022;</span>' +
    '<span class="gate-q"><span class="gate-kind">Answer ladder</span>' +
    '<span class="gate-text">' + inline(question) + '</span>' +
    '<span class="gate-hint">Answer it yourself first, then see the three tiers</span></span></summary>\n' +
    '<div class="gate-inner"><div class="ladder">' + tiers + '</div></div>\n</details>';
}

function renderGate(kind, question, bodyLines, opts) {
  opts = opts || {};
  const id = 'g' + hash(kind + question);
  const sealed = opts.sealed ? ' sealed' : '';
  const kindLabel = opts.label || 'Quick recall';
  const hint = opts.hint || 'Answer it in your head first';
  return '<details class="gate' + sealed + '" data-id="' + id + '">\n' +
    '<summary><span class="gate-seal">&#10022;</span><span class="gate-q">' +
    '<span class="gate-kind">' + kindLabel + '</span>' +
    '<span class="gate-text">' + inline(question) + '</span>' +
    '<span class="gate-hint">' + hint + '</span></span></summary>\n' +
    '<div class="gate-inner">' + renderBlocks(bodyLines, null) + '</div>\n</details>';
}

function renderAttempt(prompt, bodyLines) {
  const id = 'g' + hash('attempt' + prompt);
  const gate = '<details class="gate sealed" data-id="' + id + '">\n' +
    '<summary><span class="gate-seal">&#10022;</span><span class="gate-q">' +
    '<span class="gate-kind">Model answer</span>' +
    '<span class="gate-text">Compare against what a full-mark answer contains</span>' +
    '<span class="gate-hint">Write above to unseal</span></span></summary>\n' +
    '<div class="gate-inner">' + renderBlocks(bodyLines, null) + '</div>\n</details>';

  return '<section class="attempt-block callout key" data-id="' + id + '">\n' +
    '<span class="callout-label">Practise it</span>\n' +
    '<span class="callout-title">' + inline(prompt) + '</span>\n' +
    '<div class="attempt-work" data-for="' + id + '" data-min="60">' +
    '<textarea placeholder="Write your answer here. Saved on this machine only."></textarea>' +
    '<div class="attempt-foot"><button class="btn-unseal">Sealed</button>' +
    '<span class="attempt-count"></span>' +
    '<button class="btn-skip">Stuck &mdash; show me</button></div></div>\n' +
    gate + '\n</section>';
}

function renderRowCallout(kind, title, inner) {
  const LABELS = { decision: DECISION_LABEL, estimate: ESTIMATE_LABEL, incident: INCIDENT_LABEL,
    evolve: EVOLVE_LABEL, transfer: TRANSFER_LABEL, formula: FORMULA_LABEL };
  const LABEL_TEXT = { decision: 'Choice of method', estimate: 'Worked problem', incident: 'Case study',
    evolve: 'How it developed', transfer: 'Also applies to', formula: 'Formula' };
  const map = LABELS[kind] || {};
  const rows = parseRows(inner);
  const sealFrom = SEALED_FROM[kind];
  const open = [], hidden = [];
  let sealing = false;
  for (const r of rows) {
    if (sealFrom && r.key === sealFrom) sealing = true;
    (sealing ? hidden : open).push(r);
  }
  const rowsHtml = (list) => !list.length ? '' : '<div class="rows">' + list.map((r) =>
    '<div class="row-k">' + (map[r.key] || r.key) + '</div><div class="row-v">' +
    renderBlocks(r.lines, null) + '</div>').join('') + '</div>';

  let out = '<div class="callout ' + kind + '">\n<span class="callout-label">' +
    (LABEL_TEXT[kind] || kind) + '</span>\n';
  if (title) out += '<span class="callout-title">' + inline(title) + '</span>\n';
  out += rowsHtml(open);
  out += '</div>';

  if (hidden.length) {
    const FALLBACK_Q = {
      decision: 'Which method, and why that one?',
      estimate: 'Work it yourself before you open this',
      incident: 'What is wrong here, and what would you do?',
    };
    const SEAL_LABEL = {
      decision: 'Comparison &amp; verdict',
      estimate: 'The solution',
      incident: 'The answer',
    };
    const ask = open.find((r) => r.key === 'ask');
    const q = ask ? ask.lines.join(' ').trim() : (FALLBACK_Q[kind] || 'The answer');
    out += '\n' + renderGate(kind + (title || ''), q, [], {
      label: SEAL_LABEL[kind] || LABEL_TEXT[kind],
      hint: 'Commit to an answer, then open this',
    }).replace('<div class="gate-inner"></div>', '<div class="gate-inner">' + rowsHtml(hidden) + '</div>');
  }
  return out;
}

function renderPlainCallout(kind, title, inner) {
  const LABEL = { key: 'Remember this', trap: 'Exam trap' };
  return '<div class="callout ' + kind + '">\n<span class="callout-label">' +
    (LABEL[kind] || kind) + '</span>\n' +
    (title ? '<span class="callout-title">' + inline(title) + '</span>\n' : '') +
    renderBlocks(inner, null) + '</div>';
}

/* ------------------------------------------------------------- main walker */

function renderBlocks(lines, toc) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (FENCE.test(line)) {
      const [lang, body, next] = readFence(lines, i);
      out.push(renderCode(lang, body));
      i = next;
      continue;
    }

    const d = line.match(DIRECTIVE);
    if (d) {
      const kind = d[1];
      const title = (d[2] || '').trim();
      const [inner, next] = collect(lines, i);
      i = next;
      switch (kind) {
        case 'scene': out.push(renderSlate(title, inner)); break;
        case 'dialogue': out.push(renderDialogue(inner)); break;
        case 'think': out.push(renderGate('think', title, inner, {})); break;
        case 'attempt': out.push(renderAttempt(title, inner)); break;
        case 'ladder': out.push(renderLadder(title, inner)); break;
        case 'key':
        case 'trap': out.push(renderPlainCallout(kind, title, inner)); break;
        case 'decision':
        case 'estimate':
        case 'incident':
        case 'evolve':
        case 'formula':
        case 'transfer': out.push(renderRowCallout(kind, title, inner)); break;
        case 'checkpoint':
          out.push('<section class="checkpoint"><span class="callout-label">Revision checklist</span>' +
            renderBlocks(inner, toc) + '</section>');
          break;
        default:
          console.warn('  ! unknown directive :::' + kind);
          out.push(renderBlocks(inner, toc));
      }
      continue;
    }

    const h = line.match(HEADING);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const id = slugify(text);
      if (toc) toc.push({ level, text, id });
      const anchor = level <= 3 ? '<a class="headerlink" href="#' + id + '">&#167;</a>' : '';
      out.push('<h' + level + ' id="' + id + '">' + inline(text) + anchor + '</h' + level + '>');
      i++;
      continue;
    }

    if (HR.test(line)) { out.push('<hr>'); i++; continue; }

    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push('<div class="tw"><table><thead><tr>' +
        head.map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
        body.map((r) => '<tr>' + r.map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') +
        '</tbody></table></div>');
      continue;
    }

    if (/^>\s?/.test(line)) {
      const q = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push('<blockquote>' + renderBlocks(q, null) + '</blockquote>');
      continue;
    }

    const l = line.match(LIST);
    if (l) {
      const ordered = /\d/.test(l[2]);
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(LIST);
        if (!m) {
          if (lines[i].trim() && items.length && /^\s{2,}/.test(lines[i])) {
            items[items.length - 1].push(lines[i].trim());
            i++;
            continue;
          }
          break;
        }
        items.push([m[3]]);
        i++;
      }
      out.push('<' + (ordered ? 'ol' : 'ul') + '>' +
        items.map((it) => '<li>' + inline(it.join(' ')) + '</li>').join('') +
        '</' + (ordered ? 'ol' : 'ul') + '>');
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !FENCE.test(lines[i]) && !DIRECTIVE.test(lines[i]) &&
      !HEADING.test(lines[i]) && !HR.test(lines[i]) && !LIST.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) && !/^\|/.test(lines[i]) && !CLOSE.test(lines[i])) {
      para.push(lines[i++]);
    }
    if (para.length) out.push('<p>' + inline(para.join(' ')) + '</p>');
    else i++;
  }
  return out.join('\n');
}

/* ============================================================ page shells */

const FONTS = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

const HEAD = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="The Firm — CA Intermediate Group II short notes: Cost and Management Accounting, Auditing and Ethics, Financial Management, Strategic Management.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>`;

function sidebar(activeSlug, toc) {
  const written = PAGES.map((p) => {
    const active = p.slug === activeSlug;
    let s = '<a class="' + (active ? 'active' : '') + '" href="' + p.slug + '.html">' +
      '<span class="toc-num">' + p.num + '</span><span class="toc-title">' + p.nav + '</span></a>';
    if (active && toc) {
      const h2 = toc.filter((t) => t.level === 2);
      if (h2.length) s += '<div class="subtoc">' + h2.map((t) =>
        '<a href="#' + t.id + '">' + esc(t.text) + '</a>').join('') + '</div>';
    }
    return s;
  }).join('\n    ');

  const soon = UPCOMING.length ? UPCOMING.map((p) => '<a class="locked"><span class="toc-num">' + p.num +
    '</span><span class="toc-title">' + p.nav + '</span><span class="toc-soon">soon</span></a>').join('\n    ') : '';

  return `<button id="menu-toggle" aria-label="Toggle navigation">&#9776;</button>
<aside id="sidebar">
  <a class="brand" href="index.html">
    <span class="brand-kicker">CA Inter &middot; Group II</span>
    <span class="brand-title">The Firm</span>
    <span class="brand-sub">Four desks &middot; short notes</span>
  </a>
  <div class="toolbar">
    <button id="reveal-all" class="tool">Reveal everything</button>
    <button id="export-notebook" class="tool">Export my notebook</button>
  </div>
  <nav class="toc">
    <a href="index.html"><span class="toc-num">&mdash;</span><span class="toc-title">How to read this</span></a>
    ${written}
    ${soon}
    <div class="toc-group">Reference</div>
    <a class="${activeSlug === 'tracker' ? 'active' : ''}" href="tracker.html"><span class="toc-num">&#9635;</span><span class="toc-title">Revision tracker</span></a>
  </nav>
  <div class="sidebar-foot">Answers are sealed on purpose.<br>Attempt first, then open.</div>
</aside>`;
}

function pager(idx) {
  const prev = idx > 0 ? PAGES[idx - 1] : null;
  const next = idx < PAGES.length - 1 ? PAGES[idx + 1] : null;
  let s = '<nav class="pager">';
  s += prev
    ? '<a class="pager-link prev" href="' + prev.slug + '.html"><span class="pager-dir">&larr; Previous</span><span class="pager-name">' + prev.nav + '</span></a>'
    : '<a class="pager-link prev" href="index.html"><span class="pager-dir">&larr; Previous</span><span class="pager-name">How to read this</span></a>';
  s += next
    ? '<a class="pager-link next" href="' + next.slug + '.html"><span class="pager-dir">Next &rarr;</span><span class="pager-name">' + next.nav + '</span></a>'
    : '<a class="pager-link next" href="tracker.html"><span class="pager-dir">Next &rarr;</span><span class="pager-name">Revision tracker</span></a>';
  return s + '</nav>';
}

function buildPage(page, idx) {
  const toc = [];
  const bodies = page.files.map((f) => {
    const file = path.join(CONTENT, f + '.md');
    if (!fs.existsSync(file)) { console.warn('  ! missing content/' + f + '.md'); return ''; }
    const raw = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    return renderBlocks(raw.split(/\r?\n/), toc);
  });

  const body = bodies.filter(Boolean).join('\n<hr class="seam">\n');
  const gates = (body.match(/details class="gate/g) || []).length;
  const attempts = (body.match(/class="attempt-work"/g) || []).length;
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  const html = `${HEAD(page.title + ' &middot; The Firm')}
<body>
<div id="progress"></div>
${sidebar(page.slug, toc)}
<main>
  <article class="chapter">
    <header class="phase-head">
      <span class="phase-kicker">${page.kicker}</span>
      <h1>${page.title}</h1>
      <p class="phase-q">${page.question}</p>
      <p class="phase-lede">${page.lede}</p>
      <div class="phase-meta">
        <span><strong>${toc.filter((t) => t.level === 2).length}</strong>sections</span>
        <span><strong>${attempts}</strong>attempts</span>
        <span><strong>${gates}</strong>sealed answers</span>
        <span><strong>${words.toLocaleString()}</strong>words</span>
      </div>
    </header>
${body}
    ${pager(idx)}
  </article>
</main>
<script src="assets/app.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, page.slug + '.html'), html);
  console.log('  ' + page.slug + '.html   ' + String(words).padStart(6) + ' words · ' +
    attempts + ' attempts · ' + gates + ' gates');
  return { ...page, words, gates, attempts, sections: toc.filter((t) => t.level === 2).length };
}

/* ---------------------------------------------------------- tracker page */

function buildTracker() {
  const cols = ['Read', 'Worked a sum', 'Can write it cold', 'Past-paper proven'];
  let rows = '';
  let total = 0;
  for (const [group, items] of TRACKER) {
    rows += '<tr class="phase-row"><td colspan="6">' + group + '</td></tr>\n';
    for (const [id, name, ev] of items) {
      total++;
      rows += '<tr><td class="c-name">' + inline(name) + '</td>' +
        cols.map((_c, k) => '<td><button class="pill" data-row="' + id + '" data-col="' + k +
          '" aria-label="' + cols[k] + '"></button></td>').join('') +
        '<td class="c-ev">' + inline(ev) + '</td></tr>\n';
    }
  }

  const html = `${HEAD('Revision tracker &middot; The Firm')}
<body>
<div id="progress"></div>
${sidebar('tracker', null)}
<main>
  <article class="chapter">
    <header class="phase-head">
      <span class="phase-kicker">Reference</span>
      <h1>Revision tracker</h1>
      <p class="phase-q">Reading a topic is not knowing it. Evidence is.</p>
      <p class="phase-lede">Every examinable topic in Group II, in ICAI syllabus order. Click a dot to record how far you have actually got. Status is stored on this machine only. Downgrade a row the moment a past-paper question exposes a gap &mdash; that is the whole point of tracking it.</p>
    </header>

    <h2 id="how-to-use-it">How to use it</h2>
    <p>The four columns are a ladder, not a checklist. Clicking a column fills everything to its left; clicking a lit column switches it and everything right of it back off.</p>
    <div class="tw"><table><thead><tr><th class="c-name">Level</th><th>Means</th></tr></thead><tbody>
      <tr><td class="c-name"><strong>Read</strong></td><td>You have read the topic once. Worth almost nothing on its own.</td></tr>
      <tr><td class="c-name"><strong>Worked a sum</strong></td><td>You did a problem or wrote the format out yourself, with the book shut. For theory topics: you wrote the answer, not read it.</td></tr>
      <tr><td class="c-name"><strong>Can write it cold</strong></td><td>Blank paper, no prompt, correct format and correct terminology. For audit, that means the Standard&rsquo;s own vocabulary.</td></tr>
      <tr><td class="c-name"><strong>Past-paper proven</strong></td><td>You got it right in an actual ICAI past paper, RTP or MTP question under time, weeks after first reading it.</td></tr>
    </tbody></table></div>

    <h2 id="the-inventory">The 149 topics</h2>
    <div class="tracker-tools"><span id="trk-count">0 of ${total} topics touched</span></div>
    <div class="tw"><table class="trk"><thead><tr>
      <th class="c-name">Concept</th>${cols.map((c) => '<th>' + c + '</th>').join('')}<th class="c-ev">Evidence</th>
    </tr></thead><tbody>
${rows}
    </tbody></table></div>
    <p style="margin-top:26px">Nothing here is graded by these notes. The one rule that matters: <strong>if you could not reproduce it tomorrow on blank paper under time, it is not ready.</strong></p>
    ${pager(PAGES.length)}
  </article>
</main>
<script src="assets/app.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, 'tracker.html'), html);
  console.log('  tracker.html    ' + total + ' topics');
  return total;
}

/* ------------------------------------------------------------ landing page */

function buildIndex(built, conceptCount) {
  const roadmap = built.map((p) =>
    `      <a class="rm" href="${p.slug}.html">
        <span class="rm-num">${p.num}</span>
        <span><span class="rm-name">${p.nav}</span><span class="rm-build">${p.build}</span>
          <span class="rm-badge ready">written</span><span data-progress-for="${p.slug}" class="rm-badge soon" style="border:none"></span></span>
        <span class="rm-why"><b>Why:</b> ${p.why}<br><b>Concepts:</b> ${p.concepts}</span>
      </a>`).join('\n') + '\n' +
    UPCOMING.map((p) =>
      `      <div class="rm soon">
        <span class="rm-num">${p.num}</span>
        <span><span class="rm-name">${p.nav}</span><span class="rm-build">${p.build}</span>
          <span class="rm-badge soon">not yet written</span>${p.interview ? '<span class="rm-badge iv">interview after</span>' : ''}</span>
        <span class="rm-why"><b>Why:</b> ${p.why}</span>
      </div>`).join('\n');

  const cards = built.map((p) => `      <a class="card" href="${p.slug}.html">
        <span class="card-num">PHASE ${p.num}</span>
        <span class="card-title">${p.title}</span>
        <span class="card-blurb">${p.lede}</span>
        <span class="card-foot"><span>${p.sections} sections</span><span>${p.attempts} attempts</span><span>${p.words.toLocaleString()} words</span></span>
        <span class="card-go">Open the phase &rarr;</span>
      </a>`).join('\n');

  const totalWords = built.reduce((a, p) => a + p.words, 0);
  const totalAttempts = built.reduce((a, p) => a + p.attempts, 0);

  const html = `${HEAD('The Firm · CA Intermediate Group II short notes')}
<body class="landing">
<div id="progress"></div>
<header class="hero">
  <div class="hero-inner">
    <span class="hero-kicker">CA Intermediate &middot; Group II &middot; short notes</span>
    <h1>The<br><em>Firm</em></h1>
    <p class="hero-sub">Four desks, one signature. Cost, audit, treasury, boardroom.</p>
    <p class="hero-desc">You are in articleship, rotating through the four desks that Group II actually examines. Every topic here is traced to <strong>ICAI's own syllabus PDFs</strong>, downloaded on 10 September 2026 and kept in <code>syllabus-pdfs/</code> so you can check any claim against the source. Nothing outside the syllabus is taught, and every answer is sealed until you have attempted it &mdash; because reading a solution and producing one are not the same skill, and only one of them is examined.</p>
    <div class="hero-cta">
      <a class="btn primary" href="desk-costing.html">Start at the Costing Desk &rarr;</a>
      <a class="btn ghost" href="#roadmap">All four desks</a>
      <a class="btn ghost" href="tracker.html">Revision tracker</a>
    </div>
    <div class="hero-stats">
      <div><strong>4</strong><span>papers</span></div>
      <div><strong>300</strong><span>marks</span></div>
      <div><strong>${conceptCount}</strong><span>tracked topics</span></div>
      <div><strong>${totalAttempts}</strong><span>sealed attempts</span></div>
      <div><strong>${totalWords.toLocaleString()}</strong><span>words</span></div>
    </div>
  </div>
</header>

<main class="landing-main">
  <section>
    <h2 class="section-title">Read this before the notes</h2>
    <p class="section-note">Three things decide whether short notes help you or quietly hurt you. All three are printed in ICAI's syllabus itself, and all three are easy to ignore.</p>
    <div class="howto">
      <div><span class="ht-tag d">Study Guidelines rule</span><p>ICAI states for every paper that the <strong>specific inclusions and exclusions in each topic are set every year by way of Study Guidelines</strong>. These notes cannot know your attempt's exclusions. Pull the Guidelines for your sitting and cross off what is out.</p></div>
      <div><span class="ht-tag v">Standards move</span><p>For Auditing, ICAI states that if new legislation or Standards on Auditing replace existing ones, the syllabus automatically picks up the new provisions from a notified date. Verify every SA number against the current Study Material before you rely on it.</p></div>
      <div><span class="ht-tag y">Notes are second</span><p>Short notes are for <em>revision and recall</em>, not first learning. They are a compression of the ICAI Study Material, and compression loses exactly the worked detail that carries marks. Read the module first; come here to keep it.</p></div>
      <div><span class="ht-tag g">Pass mark</span><p><strong>40 in every paper and 50% in aggregate</strong> &mdash; 150 out of 300 for Group II, with nothing below 40. The aggregate rule is why a strong Paper 4 can carry a shaky Paper 5, and why no paper can be abandoned.</p></div>
      <div><span class="ht-tag v">Formats earn marks</span><p>In Paper 4 the cost sheet, reconciliation and variance layouts are marks in themselves. In Paper 5 the Standard's own vocabulary is the mark. Write formats out by hand until they are automatic; that is what the sealed gates are for.</p></div>
      <div><span class="ht-tag d">Verify, don't trust</span><p>These notes were assembled against the syllabus, not the full Study Material. Where a number, section or Standard reference matters, the notes say so and tell you to confirm it. Treat any unflagged specific as needing one check.</p></div>
    </div>
  </section>

  <section id="roadmap">
    <h2 class="section-title">The four desks</h2>
    <p class="section-note">In ICAI's paper order. Papers 4 and 5 are 100 marks each; Paper 6 is split 50 for Financial Management and 50 for Strategic Management.</p>
    <div class="roadmap">
${roadmap}
    </div>
  </section>

  <section>
    <h2 class="section-title">Every desk</h2>
    <div class="card-grid">
${cards}
    </div>
  </section>
</main>

<footer class="site-foot">
  <p>The Firm &middot; CA Intermediate Group II &middot; syllabus traced to <a href="https://www.icai.org/post/syllabus-nset-intermediate">icai.org</a>, source PDFs in <code>syllabus-pdfs/</code> &middot; not affiliated with ICAI</p>
</footer>
<script src="assets/app.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, 'index.html'), html);
  console.log('  index.html');
}

/* =================================================================== main */

module.exports = { renderBlocks, inline, PAGES, TRACKER };

if (require.main === module) {
  console.log('Building The Firm...');
  const built = PAGES.map(buildPage);
  const concepts = buildTracker();
  buildIndex(built, concepts);
  const w = built.reduce((a, p) => a + p.words, 0);
  console.log('Done. ' + w.toLocaleString() + ' words across ' + built.length + ' desks.');
}
