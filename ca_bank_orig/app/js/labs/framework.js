/* PassBook — interactive lab framework (owner: WP12 Labs; docs/ARCHITECTURE.md §4b "Labs" and §10.13).

   A lab is a pure `compute(values) -> {frames, stats, table}` plus a declarative list of controls. The framework builds the UI: the stage
   (drawing, caption, player), the result tiles and table, the inputs (with examples and Reset), and an optional challenge ("Test yourself").
   A frame's `view` is a list of diagram specs (app/js/viz/diagram.js — gantt, graph, tree, table, memory, array, seq, flow, …) and/or
   {html} blocks, so labs never draw SVG by hand.

   GA.lab.register({
     id, title, blurb,
     controls: [ {id, type:'select'|'number'|'range'|'toggle'|'text'|'seg'|'table'|'textarea', label, value, help?, show?(values),
                  short?  (the label in the 'Given' line when the label is long),
                  options (select / seg): [[value, label, group?, question id?]]  (a select groups consecutive options of one group;
                  a question id prints the option the paper's way, 'GATE 2013 CS · Q39 — label'),
                  examples?: true  (a select of programs: choosing a GATE one loads the preset tagged with it, chip and ?ex= included), ...}, … ],
     presets:  [ {label, values:{…}, pyq?} ]   a GATE example names its question(s) in a leading tag, '[cs-2015-3:CS36] Address · last host of …',
                                               or in pyq: 'cs-2015-3:CS36'; the label states only the question, never its result (P1-38)
     compute(values) -> { frames:[{caption, view:[…], hl?}], stats:[{label, value, hint?, tone?}], table?:{head, rows}, note? }   // PURE; throws Error('message') on bad input
     challenge: { title?, prompt(values, result), gen(rng) -> values, solve(result, values) -> number|string, tol?, unit?, explain?(result, values) -> markdown,
                  kind?: string | (values, result) -> 'num' | 'signed' | 'bits' | 'digits' | 'hex' | 'ip' | 'cidr' | 'set' | 'based' | 'text' | 'yesno' | 'choice',
                  signed?: boolean | (values, result) -> boolean,  choices?(values, result) -> ['1NF', …],  keys?(values) -> inputmode,
                  view?(result, values) -> [diagram specs] | null }     // the test state's picture; null = none (formula labs whose first frame is the working)
   })
   GA.lab.mount(host, id, {cfg, compact, ex, onExample})  /  GA.lab.mountEmbed(host, id, cfg)

   Page layout (P1-36): header (title, blurb, the one coral) → stage (question bar while testing, example chip, drawing, caption, player
   sticky to the stage's bottom) → result tiles → inputs (examples picker, fields, Reset; a collapsed 'Edit inputs' with the actual values
   below 900 px, a sticky left column above it, sticky only when all of it fits: ctlFits, measured again whenever the column's height
   changes, e.g. when a compute adds 'How this lab counts') → results. Lesson embeds (compact, P1-16): a 'Given:' line with
   'Change the inputs' (collapsed) → stage → at most 4 tiles → 'Show the numbers' (collapsed results and conventions) → 'Open full lab →'.
   DOM order is the reading order, so focus follows it.

   Test state (P0-09): 'Test yourself' draws a new problem and locks the lab at the problem's first frame (or challenge.view) with no caption,
   the player and the inputs inert, the tiles and results hidden; the question is a bar at the top of the stage, focused, with Check as the
   screen's coral (the header button turns into a ghost 'Back to exploring'). The answer box follows the problem's kind (a decimal pad, a
   ± key for signed numbers on touch screens, text, or Yes / No buttons), its text is normalised before comparing, and an unreadable answer
   is never graded: a comma typed in a number box is refused and holds grading back until a point is typed or the box is emptied
   (typedEdit), so '0,75' is never read as 75. Check (or Peek, which forfeits the XP) reveals everything and jumps to the last frame. A solve earns XP only without
   Peek and within the daily cap (actions.labChallenge decides, D8).
   Runs (P0-10): a full lab page records one run when it opens; a lesson embed records one only on its first real interaction.
   Part B (P2-57 … P2-63): every draw runs GA.fit on the stage (phone re-layout of gantt / plot / memory / layers, a 10 px label floor per
   drawing, sticky first columns, formula tables stacked on phones); a note's conventions become 'How this lab counts' at the foot of the
   inputs (notesOf; hidden while testing), its remarks stay with the results; results right-align number columns only; the player reads
   |◀ ‹ ▶ › ▶|; the lab's keys work only on the lab, its stage and caption; Yes / No answers rove (GA.ui.roving). Lesson embeds stay within
   700 px at rest (viewBudget / viewPlan: fold, shrink by at most 8 %, or clip under 'Show the whole drawing').                       */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util, esc = U.esc;
  const labs = {};
  const L = (GA.lab = { labs });
  const icon = (n, c) => (GA.icon ? GA.icon(n, c) : '');
  const inline = s => (GA.md && GA.md.inline ? GA.md.inline(s) : esc(s));
  let mounts = 0;
  /* a lesson embed is at most EMBED_H px tall at rest (P1-16): its drawing gets what the head, Given line, caption, player, tiles and footer
     leave of it (never less than the floor), shows the views that fit and clips a taller one under 'Show the whole drawing' */
  const EMBED_H = 698, VIEW_MIN = 185, VIEW_MIN_PHONE = 210, ZOOM_MIN = 0.92;   // 698: 2 px under the target for sub-pixel rounding

  L.register = def => { labs[def.id] = def; return def; };
  L.get = id => labs[id];

  /* ================================================================== pure helpers (Node-tested: tests/labs-*.test.js) */
  function defaults(def) {
    const v = {};
    (def.controls || []).forEach(c => (v[c.id] = c.type === 'table' ? c.rows.map(r => r.slice()) : c.value));
    return v;
  }
  function parseNum(x, c) {
    let n = parseFloat(x);
    if (isNaN(n)) n = c.min != null ? c.min : 0;
    if (c.min != null) n = Math.max(c.min, n);
    if (c.max != null) n = Math.min(c.max, n);
    return c.int === false ? n : Math.round(n * 1e6) / 1e6;
  }
  /** run every control's show() once, as drawing the inputs does: some labs normalise their values there (numrep, sql) */
  function prepare(def, v) {
    (def.controls || []).forEach(c => { if (c.show) { try { c.show(v); } catch (e) { /* a bad value shows up as a compute error */ } } });
    return v;
  }
  /** a new challenge problem from `seed`: the lab's gen() follows the mode being explored, so the current values are computed first */
  function problem(def, values, seed) {
    const ch = def.challenge;
    try { def.compute(prepare(def, Object.assign({}, values))); } catch (e) { /* the lab keeps the mode of its last good compute */ }
    let last = null;
    for (let k = 0; k < 6; k++) {
      try {
        const v = prepare(def, Object.assign({}, values, ch.gen(U.rng(((seed >>> 0) + k * 7919) >>> 0 || 1))));
        const result = def.compute(v), want = ch.solve(result, v);
        if (want === undefined || want === null || (typeof want === 'number' && isNaN(want))) throw new Error('no answer');
        return { values: v, result, want };
      } catch (e) { last = e; }
    }
    throw last || new Error('No problem could be made');
  }

  /** the answer box of a problem: its kind (keyboard, filter, comparison), the button choices and the tolerance. The lab declares the kind
      from the problem (challenge.kind / signed / choices); only the answer's type (number or yes/no) is a fallback, never its value */
  function answerSpec(def, v, res, want) {
    const ch = (def && def.challenge) || {};
    let kind = typeof ch.kind === 'function' ? ch.kind(v, res) : ch.kind;
    if (!kind) kind = typeof want === 'number' ? 'num' : /^(yes|no)$/i.test(String(want)) ? 'yesno' : 'text';
    if (kind === 'num') { const s = typeof ch.signed === 'function' ? ch.signed(v, res) : ch.signed; if (s) kind = 'signed'; }
    let choices = null;
    if (kind === 'yesno') choices = [['yes', 'Yes'], ['no', 'No']];
    else if (kind === 'choice') choices = ((ch.choices && ch.choices(v, res)) || []).map(c => (Array.isArray(c) ? [String(c[0]), String(c[1])] : [String(c), String(c)]));
    const keys = typeof ch.keys === 'function' ? ch.keys(v, res) : ch.keys || null;   // an inputmode override, e.g. 'decimal' for a base-8 answer
    return { kind, choices, keys, unit: ch.unit || '', tol: ch.tol != null ? ch.tol : 0.01 };
  }
  const MINUS = /[−‒–—]/g;
  const NUMERIC = { num: 1, signed: 1 };
  /** a typed number the way a GATE answer box reads it: digits, one '.', a leading minus; ∞ / inf for an infinite distance. null = unreadable */
  function numOf(raw) {
    const s = String(raw == null ? '' : raw).trim().replace(MINUS, '-').replace(/^\+/, '').replace(/\s+/g, '');
    if (/^-?(∞|inf|infinity)$/i.test(s)) return s[0] === '-' ? -Infinity : Infinity;
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    const x = Number(s);
    return Number.isFinite(x) ? x : null;
  }
  const ipOf = s => {
    const p = s.split('.');
    if (p.length !== 4 || p.some(x => !/^\d{1,3}$/.test(x) || +x > 255)) return null;
    return p.map(Number).join('.');
  };
  /** the comparable form of a typed answer for its kind (P0-09: 'BAD' matches 'ABD' for a set; '0x1f' matches '1F'); null = unreadable */
  function normAnswer(kind, raw) {
    if (raw == null) return null;
    if (NUMERIC[kind]) return typeof raw === 'number' ? raw : numOf(raw);
    let s = String(raw).trim();
    if (s.normalize) s = s.normalize('NFKC');
    if (!s) return null;
    switch (kind) {
      case 'bits': s = s.replace(/[\s,]/g, ''); return /^[01]+$/.test(s) ? s : null;
      case 'digits': s = s.replace(/[\s,]/g, ''); return /^\d+$/.test(s) ? s : null;
      case 'hex': s = s.replace(/\s/g, '').replace(/^0x/i, '').replace(/h$/i, '').toUpperCase(); return /^[0-9A-F]+$/.test(s) ? s.replace(/^0+(?=.)/, '') : null;
      case 'ip': return ipOf(s.replace(/\s/g, ''));
      case 'cidr': { const m = /^([\d.]+)\/(\d{1,2})$/.exec(s.replace(/\s/g, '')); if (!m || +m[2] > 32) return null; const ip = ipOf(m[1]); return ip ? ip + '/' + +m[2] : null; }
      case 'set': { s = s.replace(/[\s,{}()]/g, '').toUpperCase(); if (!/^[A-Z0-9']+$/.test(s)) return null; return Array.from(new Set(s.match(/[A-Z0-9]'?/g))).sort().join(''); }
      case 'based': {
        s = s.replace(/[\s_]/g, '').toUpperCase().replace(MINUS, '-');
        const m = /^(-?)([0-9A-Z]*)(?:\.([0-9A-Z]*))?$/.exec(s);
        if (!m || (!m[2] && !m[3])) return null;
        const int = m[2].replace(/^0+(?=.)/, '') || '0', frac = (m[3] || '').replace(/0+$/, '');
        return m[1] + int + (frac ? '.' + frac : '');
      }
      case 'yesno': s = s.toLowerCase(); return /^(y|yes|true)$/.test(s) ? 'yes' : /^(n|no|false)$/.test(s) ? 'no' : null;
      case 'choice': return s.toUpperCase().replace(/\s+/g, '');
      default: return s.toLowerCase().replace(/^["'“‘]+|["'”’]+$/g, '').replace(/\s+/g, ' ');
    }
  }
  /* the number box's lines, worded like the question card's, the lesson self-check's and Home's (P0-16) */
  const NAT_SAY = {
    comma: 'Use a decimal point (.), not a comma.',
    commaCheck: 'Use a decimal point (.), not a comma: type 0.75, not 0,75.',
    signed: 'Only digits, one decimal point and a leading minus.',
    num: 'Only digits and one decimal point.'
  };
  /** why a typed answer could not be read (nothing is graded then) */
  function whyNot(kind, raw) {
    const s = String(raw == null ? '' : raw).trim();
    if (!s) return kind === 'yesno' || kind === 'choice' ? 'Pick an answer first.' : 'Type your answer first.';
    if (NUMERIC[kind]) return /,/.test(s) ? NAT_SAY.commaCheck : kind === 'signed' ? 'Type a number like 12 or −0.5.' : 'Type a number like 12 or 0.5.';
    return { bits: 'Type the bits, like 1011.', digits: 'Type the digits, like 312.', hex: 'Type hex digits, like 3FA2.', ip: 'Type an address like 10.0.0.1.',
      cidr: 'Type a prefix like 10.0.0.0/24.', set: 'Type the attributes, like ABD.', based: 'Type just the digits, like 1A3 or 101.01.' }[kind] || 'Type your answer.';
  }
  /** grade a typed answer: {valid, ok, msg}. valid false = unreadable (never recorded). hold = a comma was refused in a number box and
      no point typed since (typedEdit): the number is not the learner's yet, so it is not graded (P0-16) */
  function check(spec, raw, want, hold) {
    if (hold && NUMERIC[spec.kind]) return { valid: false, ok: false, msg: NAT_SAY.commaCheck };
    const got = normAnswer(spec.kind, raw);
    if (got === null || got === '') return { valid: false, ok: false, msg: whyNot(spec.kind, raw) };
    if (NUMERIC[spec.kind]) {
      const w = typeof want === 'number' ? want : numOf(want);
      if (w === null) return { valid: true, ok: false };
      const ok = w === got || (Number.isFinite(w) && Number.isFinite(got) && Math.abs(got - w) <= (spec.tol || 0) + 1e-9);
      return { valid: true, ok };
    }
    const w = normAnswer(spec.kind, typeof want === 'number' ? String(want) : want);
    return { valid: true, ok: w !== null && got === w };
  }
  /** what a box of this kind accepts while typing (P0-16: digits, one '.', a leading minus for signed numbers; a comma is dropped, never read) */
  function cleanTyped(kind, text) {
    const t = String(text == null ? '' : text);
    if (NUMERIC[kind]) {
      const nc = GA.scoring && GA.scoring.natClean;
      let out = nc ? nc(t) : (() => { let o = '', dot = false; for (const ch of t.replace(MINUS, '-')) { if (ch >= '0' && ch <= '9') o += ch; else if (ch === '.' && !dot) { dot = true; o += ch; } else if (ch === '-' && !o) o += ch; } return o; })();
      if (kind === 'num') out = out.replace(/-/g, '');
      return out;
    }
    if (kind === 'bits') return t.replace(/[^01 ]/g, '');
    if (kind === 'digits') return t.replace(/[^0-9 ,]/g, '');
    if (kind === 'ip') return t.replace(/[^0-9.]/g, '');
    return t;
  }
  /** one edit of the answer box, pure (P0-16): raw = the box's text after the edit, hold = the previous edit's hold → {text, hold, warn}.
      A number box keeps digits, one '.' and (signed answers only) a leading minus. A refused comma holds grading back until a point is
      typed or the box is emptied, so '0,75', typed key by key or pasted, never quietly becomes 75 (the question card's commaHold) */
  function typedEdit(kind, raw, hold) {
    const s = String(raw == null ? '' : raw), text = cleanTyped(kind, s);
    if (!NUMERIC[kind]) return { text, hold: false, warn: '' };
    const comma = s.indexOf(',') >= 0, bare = s.replace(/,/g, '').replace(MINUS, '-');
    const h = comma ? true : !text || text.indexOf('.') >= 0 ? false : !!hold;
    return { text, hold: h, warn: h ? NAT_SAY.comma : cleanTyped(kind, bare) !== bare ? NAT_SAY[kind] : '' };
  }
  /** an answer as the verdict prints it: numbers to 3 decimals, ∞, Yes / No */
  function shown(want, tol) { return typeof want === 'number' ? (Number.isFinite(want) ? String(+want.toFixed(tol != null && tol < 0.001 ? 10 : 3)) : (want < 0 ? '−∞' : '∞')) : /^(yes|no)$/i.test(String(want)) ? U.cap(String(want).toLowerCase()) : String(want); }
  /** the test state's picture: challenge.view(result, values) when the lab declares one (null = none), else the problem's first frame */
  function testView(def, v, res) {
    const ch = (def && def.challenge) || {};
    if (typeof ch.view === 'function') { const x = ch.view(res, v); if (x !== undefined) return x; }
    return (res && res.frames && res.frames[0] && res.frames[0].view) || [];
  }
  /** the drawing's height budget in a lesson embed: what EMBED_H leaves after everything else (`chrome` px), never below the floor (P1-16) */
  function viewBudget(chrome, phone) { return Math.max(phone ? VIEW_MIN_PHONE : VIEW_MIN, Math.round(EMBED_H - (+chrome || 0))); }
  /** how a drawing `h` px tall meets its budget: as drawn ({}), a little smaller ({zoom}: at most 8 % off, desktops only, so labels stay
      above 10 px; a few px of clip would only hide the drawing under 'Show the whole drawing'), or clipped ({clip: true}) */
  function viewPlan(h, budget, phone) {
    if (!budget || !(h > budget)) return {};
    const z = Math.floor((budget / h) * 100) / 100;
    return !phone && z >= ZOOM_MIN ? { zoom: z } : { clip: true };
  }
  /** how many of a frame's views (their drawn heights, in order) a lesson embed shows: views while they fit `budget`, always at least one that
      is drawn; a height of 0 is a twin hidden at this width (wide / narrow layouts) and costs nothing (P1-16) */
  function fitCount(hs, budget) {
    let cum = 0, k = 0, shown = 0;
    for (const h of hs) { if (h > 0 && shown && cum + h > budget) break; if (h > 0) shown++; cum += h; k++; }
    return Math.max(1, k);
  }
  /** the lab page's inputs column sticks only when all of it fits (P1-36): h = its height, nav = the room the top bar takes (--nav-h),
      vh = the window's height; the column sticks 12 px under the bar and keeps 12 px clear above the window's bottom */
  function ctlFits(h, nav, vh) { return h > 0 && (+nav || 0) + 12 + h + 12 <= vh; }
  /** P0-10: a full lab page records one run when it opens; a lesson embed records one on its first real interaction, never on mount */
  function runTracker(record, compact) {
    let n = 0;
    const once = () => { if (!n) { n = 1; record(); } };
    return { mount() { if (!compact) once(); }, touch: once, get runs() { return n; } };
  }

  /* ---------------------------------------------------------------- presets and GATE examples (P1-38) */
  const QID = /^cs-\d{4}(?:-\d)?:(?:CS|GA|Q)\d+$/;
  /** {pyq: [question ids], group, text} of a preset: '[cs-2009:Q59, cs-2009:Q60] Max-heap · two deletions from 25 14 16 13 10 8 12' */
  function presetInfo(p) {
    let label = String((p && p.label) || ''), ids = [];
    const m = /^\[([^\]]+)\]\s*/.exec(label);
    if (m && m[1].split(/\s*,\s*/).every(x => QID.test(x))) { ids = m[1].split(/\s*,\s*/); label = label.slice(m[0].length); }
    if (p && p.pyq) ids = [].concat(p.pyq);
    const gm = /^([^·:]{1,26}?) · (.+)$/.exec(label);
    return { pyq: ids, group: gm ? gm[1].trim() : '', text: gm ? gm[2].trim() : label.trim() };
  }
  /** 'GATE 2015 CS · Set 3 · Q36' for cs-2015-3:CS36; 'GATE 2012 CS · Q42' for cs-2012:Q42; a linked pair 'GATE 2009 CS · Q59–60' */
  function pyqLabel(ids) {
    ids = [].concat(ids || []).filter(Boolean);
    if (!ids.length) return '';
    const parse = id => { const m = /^cs-(\d{4})(?:-(\d))?:(CS|GA|Q)(\d+)$/.exec(id); return m ? { y: m[1], set: m[2] || '', sec: m[3] === 'GA' ? 'GA ' : '', no: +m[4] } : null; };
    const a = parse(ids[0]);
    if (!a) return ids.join(', ');
    const nos = ids.map(parse).filter(Boolean).map(x => x.no);
    const q = nos.length > 1 && nos.every((n, i) => !i || n === nos[i - 1] + 1) ? `Q${nos[0]}–${nos[nos.length - 1]}` : nos.map(n => 'Q' + n).join(', ');
    return `GATE ${a.y} CS${a.set ? ` · Set ${a.set}` : ''} · ${a.sec}${q}`;
  }
  /** the examples picker's rows: GATE papers first (their order as authored), then the other examples */
  function examples(def) {
    const rows = (def.presets || []).map((p, i) => Object.assign({ i }, presetInfo(p)));
    const gate = rows.filter(r => r.pyq.length), other = rows.filter(r => !r.pyq.length);
    return { gate, other };
  }
  const exText = r => (r.group ? r.group + ' · ' : '') + r.text;
  /** the GATE example a program list's choice stands for: the first tagged preset that sets control `cid` to `value` (-1 = none) */
  function gatePresetFor(def, cid, value) {
    const r = examples(def).gate.find(x => { const p = def.presets[x.i]; return p && p.values && cid in p.values && String(p.values[cid]) === String(value); });
    return r ? r.i : -1;
  }

  /* ---------------------------------------------------------------- the 'Given:' line (P1-16) and the 'Edit inputs' summary (P1-36) */
  const shortLabel = s => { const t = String(s || '').split(/\s[(—–]|[,;:]\s|\s\(/)[0].trim(); return t.length > 34 ? t.slice(0, 33).trim() + '…' : t; };
  const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trim() + '…' : s);
  /** the actual inputs as short parts: 'Round Robin', 'Time quantum q: 3', 'Variables: 4', 'Processes: P1 0 7 1 · P2 1 4 1'. The first
      control names the mode, so its choice stands alone; a later choice keeps its label ('4' alone would not say what it is), or the
      control's own `short` label. Parts that say nothing are left out: a later choice of 'none', a number at the '(0 = …)' default its label
      declares, the 'More options' switch, and '#' comment lines of a text box */
  function given(def, v) {
    const out = [];
    (def.controls || []).forEach((c, ci) => {
      if (!c.label || (c.show && !c.show(v))) return;
      const x = v[c.id], lab = c.short || shortLabel(c.label);
      if (c.type === 'select' || c.type === 'seg') {
        const o = (c.options || []).find(o => String(o[0]) === String(x));
        if (o && String(o[1]).trim() && !(ci && /^(none)?$/i.test(String(o[0])))) out.push(ci ? `${lab}: ${clip(String(o[1]), 40)}` : clip(String(o[1]), 40));
      }
      else if (c.type === 'toggle') { if (x && !/^more options$/i.test(c.label)) out.push(lab); }
      else if (c.type === 'number' || c.type === 'range') { if (!(+x === 0 && /\b0 = /.test(c.label))) out.push(`${lab}: ${x}`); }
      else if (c.type === 'text') { const t = String(x == null ? '' : x).trim(); if (t) out.push(`${lab}: ${clip(t, 60)}`); }
      else if (c.type === 'textarea') { const ls = String(x == null ? '' : x).split('\n').map(l => l.trim()).filter(l => l && l[0] !== '#'); if (ls.length) out.push(`${lab}: ${clip(ls.join(' ¶ '), 70)}`); }
      else if (c.type === 'table' && Array.isArray(x)) out.push(`${lab}: ${clip(x.map(r => r.join(' ')).join(' · '), 90)}`);
    });
    return out;
  }

  /* ---------------------------------------------------------------- a result's note: conventions vs the result's own remarks (P2-57) */
  /* a lab's `note` mixes how it counts ('**Conventions.** …', '**Forwarding:** …', 'Cylinders are numbered …') with remarks on this result
     ('P O Q N M R is a possible BFS order ✓', 'Window too big …'). The conventions become neutral 'How this lab counts' bullets at the foot
     of the inputs (they stay visible while testing, so the leak test reads them too); the remarks stay with the results, hidden until checked */
  const CONV_RE = /^(?:\*\*(?:[^*]*\bconventions?\b[^*]*|MLFQ rules used here|What is counted|Relational algebra here|Model|Method|Rules used|How it is read|Closure|Keys|Minimal cover|Equivalence|Chase|Normal forms|BCNF decomposition|3NF synthesis[^*]*|Branches|Forwarding|No forwarding|Memory|Hierarchical|Simultaneous|Miss types[^*]*|3 duplicate ACKs|Losses|Timeout)[.:]?\*\*|(?:Conventions?|Scan convention):|Cylinders are numbered|Frames start empty|Minimal state counts include|Only subsets reachable)/i;
  const CONV_LEAD = /^(?:\*\*(?:[^*]*\bconventions?\b[^*]*|MLFQ rules used here|What is counted|Relational algebra here|Model|Method|Rules used)[.:]?\*\*|(?:Conventions?|Scan convention):)\s*/i;
  /** {conv: [markdown bullets], rest: markdown}: a generic paragraph ('Conventions.') becomes one bullet per sentence, a labelled rule
      ('**Forwarding:** …') one bullet that keeps its label */
  function notesOf(note) {
    const conv = [], rest = [];
    String(note == null ? '' : note).trim().split(/(?<=[.!?)])\s+(?=\*\*[^*\s][^*]{0,60}\*\*)/).map(x => x.trim()).filter(Boolean).forEach(seg => {
      if (!CONV_RE.test(seg)) { rest.push(seg); return; }
      if (CONV_LEAD.test(seg)) seg.replace(CONV_LEAD, '').split(/(?<=[.!?])\s+(?=[A-Z(“"$*¬])/).map(x => x.trim()).filter(Boolean).forEach(x => conv.push(x));
      else conv.push(seg);
    });
    return { conv, rest: rest.join(' ') };
  }

  /* ================================================================== controls */
  /** a select's options: [value, label, group?, question id?]. Consecutive options of one group share an <optgroup>; a GATE program reads
      the way the paper prints it, 'GATE 2013 CS · Q39 — ExitX / EntryY' (P1-38), while the Given line keeps the plain label */
  function optionsHtml(opts, cur) {
    let html = '', grp = null;
    (opts || []).forEach(o => {
      const g2 = o[2] || null;
      if (g2 !== grp) { if (grp) html += '</optgroup>'; if (g2) html += `<optgroup label="${esc(g2)}">`; grp = g2; }
      const text = o[3] ? `${pyqLabel([o[3]])} — ${o[1]}` : o[1];
      html += `<option value="${esc(o[0])}"${String(o[0]) === String(cur) ? ' selected' : ''}>${esc(text)}</option>`;
    });
    return html + (grp ? '</optgroup>' : '');
  }
  /** a number field's keyboard: the decimal pad, unless the field takes negative numbers (hashing's c1 and c2, sync's start value): an
      iPhone's decimal pad has no minus key, so those keep type=number's own keyboard, which has one (P0-16's rule for lab inputs) */
  const numMode = c => (c && c.min != null && +c.min >= 0 ? ' inputmode="decimal"' : '');
  function controlHtml(c, v, pid, help) {
    const id = pid + 'c-' + c.id, hid = c.help ? pid + 'ch-' + c.id : '';
    /* help (P1-55): GA.ui.infoTip's touch-safe <button data-ftip>; the same shape without it, never a mouse-only title */
    const tip = c.help ? (GA.ui && GA.ui.infoTip ? GA.ui.infoTip(c.help, { label: c.label }) : `<button type="button" class="itip" data-ftip="${esc(c.help)}">${icon('info')}<span class="sr">${esc(c.label + ': ' + c.help)}</span></button>`) : '';
    const desc = c.help ? `<span class="sr" id="${hid}">${esc(c.help)}</span>` : '';
    const db = hid ? ` aria-describedby="${hid}"` : '';
    const head = (forId, text) => `<div class="field-h">${forId ? `<label for="${forId}">${text}</label>` : `<span class="lbl" id="${id}-l">${text}</span>`}${tip}</div>`;
    switch (c.type) {
      case 'select': return `<div class="field" data-c="${c.id}">${head(id, esc(c.label))}<select class="input" id="${id}"${db}>${optionsHtml(c.options, v[c.id])}</select>${desc}</div>`;
      case 'seg': return `<div class="field" data-c="${c.id}">${head('', esc(c.label))}<div class="seg" role="group" aria-labelledby="${id}-l"${db}>${c.options.map(o => { const on = String(o[0]) === String(v[c.id]); return `<button type="button" data-v="${esc(o[0])}" aria-pressed="${on}" class="${on ? 'on' : ''}">${esc(o[1])}</button>`; }).join('')}</div>${desc}</div>`;
      case 'number': return `<div class="field" data-c="${c.id}">${head(id, esc(c.label))}<input class="input" type="number"${numMode(c)} id="${id}" value="${esc(v[c.id])}"${c.min != null ? ` min="${c.min}"` : ''}${c.max != null ? ` max="${c.max}"` : ''}${c.step ? ` step="${c.step}"` : ''}${db}>${desc}</div>`;
      case 'range': return `<div class="field" data-c="${c.id}">${head(id, `${esc(c.label)} <b class="rv">${esc(v[c.id])}</b>`)}<input type="range" id="${id}" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${esc(v[c.id])}"${db}>${desc}</div>`;
      case 'toggle': return `<div class="field row" data-c="${c.id}"><label class="switch"><input type="checkbox" id="${id}"${v[c.id] ? ' checked' : ''}${db}><span></span></label><label for="${id}">${esc(c.label)}</label>${tip}${desc}</div>`;
      case 'text': return `<div class="field" data-c="${c.id}">${head(id, esc(c.label))}<input class="input mono" type="text" id="${id}" value="${esc(v[c.id])}" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="${esc(c.placeholder || '')}"${db}>${desc}</div>`;
      case 'textarea': return `<div class="field" data-c="${c.id}">${head(id, esc(c.label))}<textarea class="input mono" id="${id}" rows="${c.rows || 4}" spellcheck="false" autocapitalize="off" placeholder="${esc(c.placeholder || '')}"${db}>${esc(v[c.id])}</textarea>${desc}</div>`;
      case 'table': {
        const rows = v[c.id];
        return `<div class="field" data-c="${c.id}">${head('', esc(c.label))}<div class="ltab"><table aria-labelledby="${id}-l"${db}><thead><tr>${c.cols.map(k => `<th scope="col">${esc(k.label)}</th>`).join('')}<th><span class="sr">Remove</span></th></tr></thead><tbody>${rows.map((r, ri) => `<tr>${c.cols.map((k, ci) => `<td><input class="input sm" data-r="${ri}" data-k="${ci}" type="${k.type === 'number' ? 'number' : 'text'}"${k.type === 'number' ? numMode(k) : ' autocapitalize="off" spellcheck="false"'} aria-label="${esc(`${k.label}, row ${ri + 1}`)}" value="${esc(r[ci])}"${k.min != null ? ` min="${k.min}"` : ''}${k.max != null ? ` max="${k.max}"` : ''}></td>`).join('')}<td><button type="button" class="btn icon sm ghost" data-del="${ri}" aria-label="Remove row ${ri + 1}">×</button></td></tr>`).join('')}</tbody></table><button type="button" class="btn sm" data-add="1">+ Add row</button></div>${desc}</div>`;
      }
      default: return '';
    }
  }

  /* ================================================================== stage */
  /** a frame's views as HTML. A figure names its kind and, for kinds the kit can redraw at a column's width (gantt, plot, memory, layers),
      keeps its spec, as lesson figures do (md.js), so GA.fit re-lays it out on a phone instead of shrinking its labels (P2-60) */
  function viewHtml(view) {
    const D = GA.diagram;
    return (view || []).map(v => {
      if (v.html != null) return `<div class="lab-html">${legibleAll(String(v.html))}</div>`;
      try {
        let svg = D.render(v);
        const W = +((/^<svg\b[^>]*?\swidth="([\d.]+)"/.exec(svg) || [])[1] || 0);
        const keep = D.canRelayout && W > 340 && D.canRelayout(v) ? ` data-spec="${esc(JSON.stringify(v))}"` : '';
        svg = legible(svg, W);
        const fx = v.type === 'table' && formulaHead(v.head) ? ' lab-fx' : '';
        return `<figure class="dg${fx}" data-diagram="${esc(v.type || '')}"${keep}>${svg}${v.caption ? `<figcaption>${esc(v.caption)}</figcaption>` : ''}</figure>`;
      } catch (e) { return `<div class="lab-err">Diagram error: ${esc(e.message)}</div>`; }
    }).join('');
  }
  /** the narrowest a drawing may be drawn so its smallest label stays at 10 px or more (P2-60): GA.fit takes an inline min-width as the
      drawing's own floor, so a phone scrolls it sideways (with the cue) instead of shrinking its labels to 7 px. 0 = no floor needed */
  function labelFloor(svg, W) {
    if (!(W > 0)) return 0;
    let min = Infinity;
    for (const m of String(svg).matchAll(/<text\b[^>]*?\sfont-size="([\d.]+)"[^>]*>\s*(?:<tspan\b[^>]*>)?\s*[^<\s]/g)) min = Math.min(min, +m[1]);
    if (!Number.isFinite(min) || min >= 12.5) return 0;                // 12.5 px drawn stays at 10 px even at GA.fit's 80 % floor
    return Math.ceil(W * Math.min(1, 10 / min));
  }
  function legible(svg, W) {
    const need = labelFloor(svg, W);
    if (!need) return svg;
    return svg.replace(/^<svg\b[^>]*>/, tag => {
      const m = /\sstyle="([^"]*)"/.exec(tag), own = m ? +((/min-width:\s*([\d.]+)px/.exec(m[1]) || [])[1] || 0) : 0;
      if (own >= need) return tag;
      const css = `min-width:${need}px`;
      return m ? tag.replace(m[0], ` style="${m[1].replace(/;?\s*min-width:[^;]*/, '')};${css}"`) : tag.replace(/^<svg\b/, `<svg style="${css}"`);
    });
  }
  /** the same floor for every drawing inside a lab's own {html} block (tcp-window's time lines, B+ trees, …) */
  const legibleAll = html => (html.indexOf('<svg') < 0 ? html : html.replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/g, svg => legible(svg, +((/^<svg\b[^>]*?\swidth="([\d.]+)"/.exec(svg) || [])[1] || 0))));
  /** a three-column 'Quantity | Formula | Value' table: phones stack each row (name and value, the formula under them) instead of cutting
      the value column off (P2-60) */
  const formulaHead = head => Array.isArray(head) && head.length === 3 && /formula/i.test(String(head[1]));
  /** a lesson embed's tile grows from a width that fits its value (a short number shares its row with three others, a long order of visits
      gets a row of its own): no tile wraps its value into a tall column (P1-16) */
  const tileBasis = s => {
    const v = [...String(s.value == null ? '' : s.value)].length * 8.6, word = Math.max(0, ...String(s.label || '').split(/\s+/).map(w => [...w].length)) * 6.7;   // the label's longest word never sticks out
    return Math.round(Math.min(340, Math.max(64, 22 + v, 22 + word)));
  };
  const tileHtml = (s, basis) => {
    const hint = s.hint ? String(s.hint) : '';
    const st = basis ? ` style="flex-basis: ${basis}px"` : '';
    const inner = `<b>${esc(s.value)}</b><span>${esc(s.label)}</span>${hint ? `<span class="sr">. ${esc(hint)}</span>` : ''}`;
    return hint ? `<button type="button" class="lab-stat ${esc(s.tone || '')}" data-ftip="${esc(hint)}"${st}>${inner}</button>` : `<div class="lab-stat ${esc(s.tone || '')}"${st}>${inner}</div>`;
  };
  /** which columns of a results table hold numbers (right-aligned); text columns read left to right (P2-57). A column is numeric when every
      filled cell is a number, a count with a unit, a fraction or a dash */
  const NUMCELL = /^(?:[−–-]?[\d][\d,]*(?:\.\d+)?(?:\s?(?:%|ms|µs|ns|s|B|KB|MB|GB|bits?|bytes?|units?|×))?|[−–-]?\d+\s?\/\s?\d+|[—–-]|∞|[≈~]\s?[\d.]+)$/;
  function numericCols(t) {
    const rows = (t.rows || []).map(r => r.cells || r), n = (t.head || []).length;
    return Array.from({ length: n }, (_, i) => { const xs = rows.map(r => String(r[i] == null ? '' : r[i]).trim()).filter(x => x !== ''); return xs.length > 0 && xs.some(x => /\d/.test(x)) && xs.every(x => NUMCELL.test(x)); });
  }
  const tableHtml = t => {
    const num = numericCols(t), cl = i => (i && num[i] ? ' class="r"' : '');
    return `<div class="card${formulaHead(t.head) ? ' lab-fx' : ''}"><div class="tw"><table class="t"><thead><tr>${t.head.map((h, i) => `<th${cl(i)} scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr${r.cls ? ` class="${esc(r.cls)}"` : ''}>${(r.cells || r).map((c, i) => `<td${cl(i)}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  };
  const PLAYER = `<button class="btn icon sm" type="button" data-p="first" aria-label="First step" data-tip="First step (Home)">${icon('step-b')}</button><button class="btn icon sm" type="button" data-p="prev" aria-label="Previous step" data-tip="Back (←)">${icon('chev-l')}</button><button class="btn icon primary" type="button" data-p="play" aria-label="Play" data-tip="Play / pause (space)">${icon('play')}</button><button class="btn icon sm" type="button" data-p="next" aria-label="Next step" data-tip="Forward (→)">${icon('chev-r')}</button><button class="btn icon sm" type="button" data-p="last" aria-label="Last step" data-tip="Final state (End)">${icon('step-f')}</button>
      <input type="range" class="lab-scrub" min="0" max="0" value="0" aria-label="Step"><span class="lab-n" aria-hidden="true"></span><div class="seg lab-speed" role="group" aria-label="Speed"><button type="button" data-s="0.5" aria-pressed="false">½×</button><button type="button" data-s="1" class="on" aria-pressed="true">1×</button><button type="button" data-s="2" aria-pressed="false">2×</button><button type="button" data-s="4" aria-pressed="false">4×</button></div>`;

  /* ================================================================== mount */
  L.mount = function (host, id, o) {
    o = o || {};
    const def = labs[id];
    if (!def) { host.innerHTML = `<div class="empty"><b>Lab not found</b><p>${esc(id)}</p></div>`; return null; }
    const compact = !!o.compact, full = !compact, ch = full ? def.challenge : null;
    const pid = compact ? `lb${++mounts}-` : '';          // compact mounts can repeat on one lesson page: their ids get a prefix (P2-63)
    let values = Object.assign(defaults(def), o.cfg || {});
    (def.controls || []).forEach(c => { if (c.type === 'table' && Array.isArray(values[c.id])) values[c.id] = values[c.id].map(r => r.slice()); });
    let result = null, idx = 0, timer = null, speed = 1, chal = null, exRow = null, editOpen = false;
    let vk = 0, allv = false, budget = 0, vw = 0;            // compact: how many of a frame's views show (0 = not measured yet), 'show all' on, the drawing's budget, the width measured at
    const runs = runTracker(() => { if (GA.actions && GA.actions.labRun) GA.actions.labRun(id); }, compact);
    const ex = examples(def);

    host.classList.add('lab');
    if (compact) host.classList.add('compact');
    const picker = full && (def.presets || []).length ? `<div class="field lab-pick-ex"><label for="lab-preset">Examples</label><select class="input" id="lab-preset"><option value="">Load an example…</option>${
      ex.gate.length ? `<optgroup label="From ICAI papers (${ex.gate.length})">${ex.gate.map(r => `<option value="${r.i}">${esc(pyqLabel(r.pyq) + ' — ' + exText(r))}</option>`).join('')}</optgroup>` : ''}${
      ex.other.length ? `<optgroup label="${ex.gate.length ? `More examples (${ex.other.length})` : `Examples (${ex.other.length})`}">${ex.other.map(r => `<option value="${r.i}">${esc(exText(r))}</option>`).join('')}</optgroup>` : ''}</select></div>` : '';
    const reset = `<div class="btns lab-reset-row"><button class="btn sm ghost" type="button" id="${pid}lab-reset">${icon('undo')}<span>Reset</span></button></div>`;
    const panel = `<div class="lab-controls card pad" id="${pid}lab-controls"><div class="lab-ctl-h">${full ? '<h2 class="lab-ctl-t" id="lab-ctl-t">Inputs</h2>' : '<p class="lab-ctl-t">Inputs</p>'}<p class="lab-lock" hidden>${icon('lock')}Locked while you test yourself</p></div>${picker}<div class="lab-fields"></div>${reset}${full ? '<div class="lab-conv" hidden></div>' : ''}</div>`;
    const stage = `<section class="card lab-stage" aria-label="${esc(def.title)}: the drawing">
        ${ch ? `<div class="lab-chal" id="lab-chal" role="group" aria-labelledby="lab-chal-t" hidden></div>` : ''}
        ${full ? '<div class="lab-ex" hidden></div>' : ''}
        <div class="lab-view" id="${pid}lab-view"></div>${compact ? `<button type="button" class="lab-whole" aria-controls="${pid}lab-view" hidden>${icon('chev-d')}<span>Show the whole drawing</span></button>` : ''}
        <div class="lab-cap" id="${pid}lab-cap" aria-live="polite"></div>
        <div class="lab-player" id="${pid}lab-player">${PLAYER}${compact ? `<button type="button" class="btn sm ghost lab-allv" aria-expanded="false" aria-controls="${pid}lab-view" hidden></button>` : ''}</div></section>`;
    if (full) {
      host.innerHTML = `<header class="lab-h"><div class="lab-ht"><div class="eyebrow">Interactive lab</div><h1>${esc(def.title)}</h1><p class="muted lab-blurb">${esc(def.blurb || '')}</p></div>${ch ? `<div class="btns lab-cta"><button class="btn pop" type="button" id="lab-rand">${icon('target')}<span>Test yourself</span></button></div>` : ''}</header>
      <div class="lab-body">${stage}
        <div class="lab-hid card" hidden>${icon('lock')}<div><b>Hidden until you check</b><span>The result tiles and the table appear with your answer.</span></div></div>
        <div class="lab-stats" id="lab-stats"></div>
        <section class="lab-ctl" aria-labelledby="lab-ctl-t"><button type="button" class="lab-edit" aria-expanded="false" aria-controls="lab-controls"><span class="lab-edit-t">${icon('edit')}<b>Edit inputs</b></span><span class="lab-given"></span>${icon('chev-d', 'lab-edit-c')}</button>${panel}</section>
        <div class="lab-res" id="lab-res"></div></div>`;
    } else {
      host.innerHTML = `<div class="lab-gv"><p><b>Given</b> <span class="lab-given"></span></p><button type="button" class="btn sm ghost lab-edit" aria-expanded="false" aria-controls="${pid}lab-controls">${icon('edit')}<span>Change<span class="lab-gv-x"> the inputs</span></span></button></div>
        ${panel}${stage}
        <div class="lab-stats" id="${pid}lab-stats"></div>
        <div class="lab-foot"><details class="lab-more"><summary>Show the numbers</summary><div class="lab-stats lab-stats-x"></div><div class="lab-res" id="${pid}lab-res"></div></details>
        <p class="lab-open"><a href="#/lab/${esc(id)}">Open full lab ${icon('arrow-r')}</a></p></div>`;
    }
    const $ = s => host.querySelector(s);
    const view = $('.lab-view'), cap = $('.lab-cap'), player = $('.lab-player'), scrub = $('.lab-scrub'), nEl = $('.lab-n');
    const stats = $('.lab-stats'), res = $('.lab-res'), fields = $('.lab-fields'), ctlPanel = $('.lab-controls'), editBtn = $('.lab-edit');
    const ctl = full ? $('.lab-ctl') : ctlPanel, hid = $('.lab-hid'), statsX = $('.lab-stats-x'), openA = $('.lab-open a'), bar = $('#lab-chal'), exChip = $('.lab-ex');
    const rand = $('#lab-rand'), more = $('.lab-more'), allBtn = $('.lab-allv'), whole = $('.lab-whole'), convEl = $('.lab-conv');
    let editBefore = null;                                     // the 'Edit inputs' state to restore after a test
    let unrove = null;                                         // the roving focus of the answer's choices (P3-15)
    if (compact) ctlPanel.hidden = true;

    /* ---------------- inputs */
    function drawControls() {
      fields.innerHTML = (def.controls || []).map(c => (c.show && !c.show(values) ? '' : controlHtml(c, values, pid))).join('');
      drawGiven();
      fitCtl();
    }
    function drawGiven() {
      const parts = given(def, values), txt = parts.join(' · ');
      host.querySelectorAll('.lab-given').forEach(el => { el.textContent = txt; });
      if (openA) openA.setAttribute('href', `#/lab/${id}?cfg=${encodeURIComponent(JSON.stringify(values))}`);
    }
    function setEdit(open) {
      editOpen = !!open;
      if (editBtn) editBtn.setAttribute('aria-expanded', String(editOpen));
      if (full) ctl.classList.toggle('open', editOpen); else ctlPanel.hidden = !editOpen;
      fitCtl();
    }
    /* desktop: the inputs column is sticky only when all of it fits the window under the top bar (P1-36); never a scroller of its own.
       Measured again whenever the column changes height (its 'How this lab counts' arrives with each compute, the lock line while testing,
       a resized text box, late fonts: the ResizeObserver below), not only when the fields are drawn */
    function fitCtl() {
      if (!full || !ctl || typeof innerHeight === 'undefined') return;
      const root = g.document && g.document.documentElement, cs = root && g.getComputedStyle ? g.getComputedStyle(root) : null;
      const nav = cs ? parseFloat(cs.getPropertyValue('--nav-h')) : NaN;
      ctl.classList.toggle('stick', ctlFits(ctl.offsetHeight, Number.isFinite(nav) ? nav : 68, innerHeight));
    }
    function read(c, el) {
      const t = c.type;
      if (t === 'toggle') return el.checked;
      if (t === 'number') return parseNum(el.value, c);
      if (t === 'range') return parseFloat(el.value);
      return el.value;
    }

    /* ---------------- compute and draw */
    const testing = () => !!(chal && !chal.done && !chal.peek);
    const recompute = () => {
      try { result = def.compute(values); }
      catch (e) {
        result = null; stop();
        view.innerHTML = `<div class="lab-err">${icon('alert')} ${esc(e.message)}</div>`; stats.innerHTML = ''; if (statsX) statsX.innerHTML = ''; res.innerHTML = '';
        cap.textContent = ''; player.classList.add('off'); if (allBtn) allBtn.hidden = true;
        if (convEl) { convEl.innerHTML = ''; convEl.hidden = true; }
        fitCtl();
        return;
      }
      player.classList.remove('off');
      vk = 0;
      const n = result.frames.length;
      idx = o.autoplay ? 0 : n - 1;
      scrub.max = n - 1;
      const S = result.stats || [];
      if (compact) {
        stats.innerHTML = S.slice(0, 4).map(t => tileHtml(t, tileBasis(t))).join(''); statsX.innerHTML = S.slice(4).map(t => tileHtml(t)).join(''); statsX.hidden = S.length <= 4;
      }
      else stats.innerHTML = S.map(tileHtml).join('');
      const N = notesOf(result.note);
      const conv = N.conv.length ? `${full ? '<h3 class="lab-conv-h">' : '<p class="lab-conv-h">'}How this lab counts${full ? '</h3>' : '</p>'}<ul>${N.conv.map(b => `<li>${inline(b)}</li>`).join('')}</ul>` : '';
      if (convEl) { convEl.innerHTML = conv; convEl.hidden = !conv || testing(); }
      fitCtl();                                                  // the conventions just changed the column's height
      res.innerHTML = (N.rest ? `<div class="lab-note">${inline(N.rest)}</div>` : '') + (result.table ? tableHtml(result.table) : '') + (!convEl && conv ? `<div class="lab-conv">${conv}</div>` : '');
      fit(res);
      if (more) more.hidden = !result.note && !result.table && S.length <= 4;
      if (chal && !chal.done && !chal.peek) idx = 0;
      draw();
      if (o.autoplay) play();
    };
    /* the shared legibility pass (GA.fit, WP8; P2-60): a figure keeps at least 80 % of its drawn size and scrolls under 'Swipe sideways'
       instead, gantt / plot / memory / layers figures redraw at the column's width, wide tables get the sticky first column and the cue;
       on the lab page a small tree or graph may grow to 1.5 times its size. Without GA.fit the drawing stays as drawn */
    function fit(el) {
      if (!el) return;
      /* a formula table that phones stack (CSS display: grid on its rows) keeps its table roles explicitly, as GA.fit's row cards do */
      el.querySelectorAll('.lab-fx table.t:not([role])').forEach(t => {
        t.setAttribute('role', 'table');
        t.querySelectorAll(':scope > thead, :scope > tbody').forEach(x => x.setAttribute('role', 'rowgroup'));
        t.querySelectorAll('tr').forEach(tr => tr.setAttribute('role', 'row'));
        t.querySelectorAll('thead th').forEach(x => x.setAttribute('role', 'columnheader'));
        t.querySelectorAll('tbody th').forEach(x => x.setAttribute('role', 'rowheader'));
        t.querySelectorAll('td').forEach(x => x.setAttribute('role', 'cell'));
      });
      if (!GA.fit || typeof GA.fit.all !== 'function') return;
      try { GA.fit.all(el, full ? { grow: 1.5 } : {}); } catch (e) { /* a figure the pass cannot read stays as drawn */ }
    }
    function draw() {
      if (!result) return;
      const locked = testing(), n = result.frames.length;
      if (locked) {
        const tv = testView(def, values, result);
        view.innerHTML = tv && tv.length ? viewHtml(tv) : `<div class="lab-ph">${icon('lock')}<b>Hidden until you check</b><span>Work it out from the inputs; the drawing appears with your answer.</span></div>`;
        cap.innerHTML = '';
      } else {
        const fr = result.frames[idx];
        view.innerHTML = viewHtml(fr.view);
        cap.innerHTML = fr.caption ? inline(fr.caption) : '';
      }
      fit(view);
      if (compact && !locked) fitViews();
      scrub.value = locked ? 0 : idx;
      nEl.textContent = locked ? '' : `${idx + 1} / ${n}`;
      const pb = $('[data-p="play"]'); pb.innerHTML = icon(timer ? 'pause' : 'play'); pb.setAttribute('aria-label', timer ? 'Pause' : 'Play');
    }
    /* compact (P1-16): a frame shows its views in order while they fit the drawing's budget (always at least one), and a shown view still
       taller than the budget is clipped under 'Show the whole drawing'. The budget and the count are measured once per compute (and again
       when the embed's width changes), on the first drawn frame that has a laid-out view, so stepping never makes a view come and go */
    function fitViews() {
      /* the views in the order they are seen: a twin for another width is hidden (display: none) or parked off screen (position: absolute,
         1 px; it keeps arrowhead markers alive) and is no view of its own; a phone twin may come first on screen although it is last in the DOM */
      const items = Array.from(view.children).map(c => {
        const cs = g.getComputedStyle ? g.getComputedStyle(c) : null, r = c.getBoundingClientRect();
        const off = c.classList.contains('lab-vx') ? false : !!cs && (cs.display === 'none' || cs.position === 'absolute') || r.width <= 2 || r.height <= 2;
        return { c, h: off ? 0 : r.height, top: r.top, off };
      });
      const seen = items.filter(x => !x.off).sort((a, b) => a.top - b.top);
      if (!vk && seen.length) {
        view.style.maxHeight = ''; view.style.zoom = '';
        const box = (host.closest && host.closest('.ga-lab-embed')) || host;
        const chrome = box.getBoundingClientRect().height - view.getBoundingClientRect().height;
        budget = viewBudget(chrome, typeof innerWidth === 'number' && innerWidth <= 700);
        vk = fitCount(seen.map(x => x.h), budget); vw = host.clientWidth;
      }
      let extra = 0;
      seen.forEach((x, i) => {
        if (!vk || i < vk) return;
        extra++;
        /* a folded view moves off screen (inert, aria-hidden) rather than display: none: a marker inside a display: none subtree stops
           drawing for every later drawing that points at it (GA.fit gives repeated drawings their own ids, P2-63; this keeps older ones safe) */
        if (!allv) { x.c.classList.add('lab-vx'); x.c.setAttribute('inert', ''); x.c.setAttribute('aria-hidden', 'true'); }
      });
      view.style.maxHeight = ''; view.style.zoom = '';
      const plan = vk ? viewPlan(view.scrollHeight, budget, typeof innerWidth === 'number' && innerWidth <= 700) : {};
      const tall = !!plan.clip, clip = tall && !allv;
      view.classList.toggle('lab-clip', clip);
      view.style.maxHeight = clip ? budget + 'px' : '';
      if (plan.zoom) view.style.zoom = String(plan.zoom);
      if (whole) whole.hidden = !clip;
      if (allBtn) {
        allBtn.hidden = !(extra || (allv && tall));
        allBtn.setAttribute('aria-expanded', String(allv));
        allBtn.innerHTML = `${icon(allv ? 'chev-u' : 'chev-d')}<span>${allv ? 'Show less' : `${extra} more ${extra === 1 ? 'view' : 'views'}`}</span>`;
        allBtn.setAttribute('aria-label', allv ? 'Show less of this step' : `Show ${extra} more ${extra === 1 ? 'view' : 'views'} of this step${tall ? ' and the whole drawing' : ''}`);
      }
      if (whole) whole.setAttribute('aria-expanded', 'false');
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } cap.setAttribute('aria-live', 'polite'); const pb = $('[data-p="play"]'); if (pb) { pb.innerHTML = icon('play'); pb.setAttribute('aria-label', 'Play'); } }
    function play() {
      if (!result || testing()) return;
      if (timer) { stop(); return; }
      if (idx >= result.frames.length - 1) idx = 0;
      cap.setAttribute('aria-live', 'off');                    // a playing caption is not read out step by step
      timer = setInterval(() => { if (idx >= result.frames.length - 1) { stop(); draw(); return; } idx++; draw(); }, 900 / speed);
      draw();
    }
    const step = a => {
      if (!result || testing()) return;
      const n = result.frames.length;
      stop();
      idx = a === 'first' ? 0 : a === 'last' ? n - 1 : a === 'prev' ? Math.max(0, idx - 1) : Math.min(n - 1, idx + 1);
      draw();
    };

    /* ---------------- the test state (P0-09) */
    function lockState() {
      const t = testing(), wasHidden = res.hidden;
      host.classList.toggle('testing', !!chal);
      host.classList.toggle('locked', t);
      [player, ctlPanel].forEach(el => { if (!el) return; if (t) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
      const lk = $('.lab-lock'); if (lk) lk.hidden = !t;
      stats.hidden = t; res.hidden = t; if (hid) hid.hidden = !t;
      if (convEl) convEl.hidden = t || !convEl.innerHTML;          // some conventions name the result (a total, a normal form): hidden while asking
      if (wasHidden && !t) fit(res);                             // the results were drawn while hidden: fit them now that they show
      if (rand) {
        rand.classList.toggle('pop', !chal); rand.classList.toggle('ghost', !!chal);
        rand.innerHTML = chal ? `${icon('arrow-l')}<span>Back to exploring</span>` : `${icon('target')}<span>Test yourself</span>`;
      }
      if (bar) bar.hidden = !chal;
      fitCtl();                                                  // the lock line and the hidden conventions change the column's height
    }
    function newChallenge(focus) {
      let P;
      try { P = problem(def, values, (Math.random() * 2 ** 31) >>> 0); }
      catch (e) { if (GA.ui && GA.ui.toast) GA.ui.toast('Could not make a problem from these inputs: ' + e.message, 'bad'); return; }
      stop();
      values = P.values;
      chal = { want: P.want, spec: answerSpec(def, values, P.result, P.want), done: false, peek: false, pick: null, typed: '', hold: false };
      if (exRow && o.onExample) o.onExample(null);
      exRow = null; drawEx();
      if (full && editBefore === null) { editBefore = editOpen; setEdit(true); }   // the inputs are part of the problem: on phones they open (read-only)
      drawControls(); recompute(); lockState(); drawChal();
      if (focus) {
        const st = $('.lab-stage');
        const calm = !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
        if (st && st.scrollIntoView) st.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' });
        const q = $('#lab-chal-q'); if (q) q.focus({ preventScroll: true });
      }
    }
    /** leave the test state (values stay as the problem left them, to explore) */
    function quitChallenge() {
      chal = null;
      if (unrove) { unrove(); unrove = null; }
      if (bar) { bar.innerHTML = ''; bar.hidden = true; }
      if (editBefore !== null) { setEdit(editBefore); editBefore = null; }
    }
    function endChallenge() { stop(); quitChallenge(); lockState(); recompute(); }
    function answerHtml(spec) {
      const dis = chal.done ? ' disabled' : '';
      if (spec.choices) return `<div class="seg lab-pick" role="radiogroup" aria-labelledby="lab-chal-q">${spec.choices.map(([v, t]) => { const on = chal.pick === v; return `<button type="button" role="radio" data-pick="${esc(v)}" aria-checked="${on}" class="${on ? 'on' : ''}"${dis}>${esc(t)}</button>`; }).join('')}</div>`;
      const im = spec.keys || (NUMERIC[spec.kind] || spec.kind === 'ip' ? 'decimal' : spec.kind === 'bits' || spec.kind === 'digits' ? 'numeric' : 'text');
      const ph = 'Your answer' + (spec.unit ? ` (${spec.unit})` : '');
      const pm = spec.kind === 'signed' ? `<button type="button" class="btn lab-pm" data-pm aria-label="Add or remove the minus sign"${dis}>±</button>` : '';
      return `<span class="lab-ans-w"><input class="input lab-ans" id="chal-a" inputmode="${im}" enterkeyhint="done" autocomplete="off" autocapitalize="${spec.kind === 'set' || spec.kind === 'hex' ? 'characters' : 'off'}" spellcheck="false" aria-labelledby="lab-chal-q" aria-describedby="chal-msg" placeholder="${esc(ph)}" value="${esc(chal.typed)}"${dis}>${pm}</span>`;
    }
    function drawChal() {
      if (!bar || !chal) return;
      const spec = chal.spec, q = def.challenge.prompt(values, result);
      const verdict = chal.done ? resultHtml() : '';
      bar.innerHTML = `<div class="lab-chal-h"><span class="lab-chal-t" id="lab-chal-t">${icon('target')}${esc(def.challenge.title && def.challenge.title !== 'Your turn' ? def.challenge.title : 'Test yourself')}</span>${chal.peek && !chal.done ? '<span class="lab-chal-pk">Peeked · this one earns no XP</span>' : ''}</div>
        <p class="lab-chal-q" id="lab-chal-q" tabindex="-1">${inline(q)}</p>
        <div class="lab-chal-a">${answerHtml(spec)}${chal.done ? '' : `<button class="btn pop" id="chal-go" type="button">${icon('check')}<span>Check</span></button>`}</div>
        <p class="lab-chal-m" id="chal-msg" aria-live="polite">${chal.hold && !chal.done ? esc(NAT_SAY.comma) : ''}</p>
        <div class="lab-chal-r" id="chal-res">${verdict}</div>
        <div class="lab-chal-f">${chal.done ? `<button class="btn pop" id="chal-new" type="button">${icon('shuffle')}<span>Next problem</span></button>` : `${chal.peek ? '' : `<button class="btn ghost sm" id="chal-peek" type="button">${icon('eye')}<span>Peek · no XP</span></button>`}<button class="btn ghost sm" id="chal-new" type="button">${icon('shuffle')}<span>New problem</span></button>`}</div>`;
      /* Yes / No and other choices: one tab stop, arrows move and pick (P3-15, the shared GA.ui.roving) */
      if (unrove) { unrove(); unrove = null; }
      const pk = $('.lab-pick');
      if (pk && GA.ui && GA.ui.roving && !chal.done) unrove = GA.ui.roving(pk, { items: '[role="radio"]' });
    }
    function resultHtml() {
      const ok = chal.ok, ch2 = def.challenge, unit = ch2.unit ? ' ' + esc(ch2.unit) : '';
      const xp = ok && chal.xp > 0 ? ` · +${chal.xp} XP` : '';
      const why = ok && chal.xp === 0 ? (chal.peek ? ' · no XP after a peek' : ' · XP is capped at 10 solves a day') : '';
      let ex = '';
      try { ex = ch2.explain ? `<div class="md ui sm lab-chal-x">${GA.md.render(ch2.explain(result, values))}</div>` : ''; } catch (e) { ex = ''; }
      return `<div class="qc-v ${ok ? 'ok' : 'bad'} lab-verdict">${icon(ok ? 'check' : 'x')}<b>${ok ? 'Solved' : 'Not quite'}${xp}</b><span>${ok ? '' : 'Answer: '}<b class="lab-want">${esc(shown(chal.want, chal.spec.tol))}</b>${unit}${why}</span></div>${ex}`;
    }
    function grade() {
      if (!chal || chal.done) return;
      const box = $('#chal-a'), msg = $('#chal-msg');
      const raw = chal.spec.choices ? chal.pick : box ? box.value : '';
      const r = check(chal.spec, raw, chal.want, chal.hold);
      if (!r.valid) {
        if (msg) msg.textContent = r.msg;
        if (box) box.focus({ preventScroll: true });
        if (GA.ui && GA.ui.shake) GA.ui.shake(box ? box.closest('.lab-ans-w') : $('.lab-pick'));
        return;
      }
      const st = GA.store && GA.store.state;
      chal.xp = GA.engage && GA.engage.xpFor && st ? (r.ok ? GA.engage.xpFor(st, 'lab', id, true, { peek: chal.peek }) : 0) : null;
      if (GA.actions && GA.actions.labChallenge) GA.actions.labChallenge(id, r.ok, { peek: chal.peek });
      runs.touch();
      chal.done = true; chal.ok = r.ok; chal.typed = box ? box.value : '';
      lockState();
      if (result) { idx = result.frames.length - 1; draw(); }
      drawChal();
      const v = $('.lab-verdict');
      if (r.ok) { if (GA.ui && GA.ui.burst) GA.ui.burst(v ? v.querySelector('svg') || v : bar); if (GA.ui && GA.ui.buzz) GA.ui.buzz(15); }
      else { if (GA.ui && GA.ui.shake) GA.ui.shake(v || bar); if (GA.ui && GA.ui.buzz) GA.ui.buzz([20, 40, 20]); }
      if (GA.ui && GA.ui.say) GA.ui.say(r.ok ? 'Solved.' : 'Not quite. The answer is ' + shown(chal.want, chal.spec.tol) + '.');
      const nb = $('#chal-new'); if (nb) nb.focus({ preventScroll: true });
    }
    function peek() {
      if (!chal || chal.done) return;
      chal.peek = true; chal.typed = ($('#chal-a') || {}).value || '';
      lockState(); idx = 0; draw(); drawChal();
      const a = $('#chal-a') || $('.lab-pick [role="radio"]'); if (a) a.focus({ preventScroll: true });
    }

    /* ---------------- examples (P1-38): the chip names the paper and links the question; the view keeps ?ex= in the URL */
    function drawEx() {
      if (!exChip) return;
      if (!exRow || !exRow.pyq.length) { exChip.hidden = true; exChip.innerHTML = ''; return; }
      const D = GA.data && GA.data.D, q0 = exRow.pyq[0], q = D && D.qById ? D.qById[q0] : null;
      const M = g.GAD && g.GAD.manifest && g.GAD.manifest.main, disputed = (q && q.disputed) || !!(M && M.stats && (M.stats.disputes || []).includes(q0));
      exChip.innerHTML = `<span class="lab-ex-k">${icon('flag')}${esc(pyqLabel(exRow.pyq))}</span><span class="lab-ex-t">${esc(exText(exRow))}</span>${disputed ? `<span class="lab-ex-d">${icon('alert')}key questioned</span>` : ''}${q || !D ? `<a class="lab-ex-a" href="#/q/${encodeURIComponent(q0)}">Solve it first ${icon('arrow-r')}</a>` : ''}`;
      exChip.hidden = false;
    }
    function loadPreset(i, quiet) {
      const p = (def.presets || [])[i]; if (!p) return false;
      stop(); quitChallenge(); clearTimeout(host._t);
      values = Object.assign(defaults(def), p.values);
      const info = presetInfo(p);
      exRow = info.pyq.length ? Object.assign({ i }, info) : null;
      drawEx(); drawControls(); recompute(); lockState();
      if (!quiet && o.onExample) o.onExample(exRow ? exRow.pyq[0] : null);
      return true;
    }
    function edited() {
      runs.touch();
      if (exRow) { exRow = null; drawEx(); if (o.onExample) o.onExample(null); }
      if (chal && (chal.done || chal.peek)) endChallenge();
    }

    /* ---------------- events */
    drawControls(); recompute(); lockState();
    if (o.ex) { const r = ex.gate.find(x => x.pyq.includes(o.ex)); if (r) loadPreset(r.i, true); }
    if (editBtn) editBtn.addEventListener('click', () => setEdit(!editOpen));
    host.addEventListener('input', e => {
      const t = e.target;
      if (t.id === 'chal-a' && chal) {
        const v = t.value, E = typedEdit(chal.spec.kind, v, chal.hold), msg = $('#chal-msg');
        if (E.text !== v) {                                     // keep the caret where the learner was typing
          const at = t.selectionStart == null ? v.length : t.selectionStart, caret = cleanTyped(chal.spec.kind, v.slice(0, at)).length;
          t.value = E.text;
          try { t.setSelectionRange(caret, caret); } catch (err) { /* not focused */ }
        }
        chal.hold = E.hold;
        if (msg) msg.textContent = E.warn;
        return;
      }
      if (t === scrub) { if (testing()) return; stop(); idx = +t.value; draw(); runs.touch(); return; }
      const f = t.closest('.field'); if (!f || !fields.contains(f)) return;
      const c = (def.controls || []).find(x => x.id === f.dataset.c); if (!c) return;
      if (c.type === 'table') { const r = +t.dataset.r, k = +t.dataset.k; if (isNaN(r)) return; const col = c.cols[k]; values[c.id][r][k] = col.type === 'number' ? parseNum(t.value, col) : t.value; }
      else values[c.id] = read(c, t);
      if (c.type === 'range') { const rv = f.querySelector('.rv'); if (rv) rv.textContent = values[c.id]; }
      edited();
      clearTimeout(host._t); host._t = setTimeout(() => { if (c.reshow) drawControls(); else drawGiven(); recompute(); }, 90);
    });
    host.addEventListener('change', e => {
      if (e.target.id === 'lab-preset') { const s = e.target; if (s.value !== '') loadPreset(+s.value); s.value = ''; runs.touch(); return; }
      const f = e.target.closest('.field'); if (!f || !fields.contains(f)) return;
      const c = (def.controls || []).find(x => x.id === f.dataset.c);
      /* a select that lists programs (examples: true): choosing a GATE one loads it as that paper's example (chip, ?ex=), as the picker does */
      if (c && c.type === 'select') values[c.id] = read(c, e.target);          // 'change' may arrive without its 'input' (scripts, some keyboards)
      const gp = c && c.examples && full ? gatePresetFor(def, c.id, values[c.id]) : -1;
      if (gp >= 0) { runs.touch(); loadPreset(gp); return; }
      if (c && (c.type === 'select' || c.type === 'toggle')) { edited(); drawControls(); recompute(); }
    });
    host.addEventListener('click', e => {
      const t = e.target.closest ? e.target.closest('button, a') : null;
      if (!t || !host.contains(t)) return;
      if (t.matches('.lab-fields .seg [data-v]')) { const f = t.closest('.field'), c = def.controls.find(x => x.id === f.dataset.c); values[c.id] = isNaN(+t.dataset.v) || t.dataset.v === '' ? t.dataset.v : +t.dataset.v; edited(); drawControls(); recompute(); return; }
      if (t.matches('[data-add]')) { const c = def.controls.find(x => x.id === t.closest('.field').dataset.c); if (values[c.id].length >= (c.max || 12)) return; values[c.id].push(c.cols.map((k, i) => (k.type === 'number' ? (k.def != null ? k.def : 0) : (k.auto ? k.auto(values[c.id].length) : '')))); edited(); drawControls(); recompute(); return; }
      if (t.matches('[data-del]')) { const c = def.controls.find(x => x.id === t.closest('.field').dataset.c); if (values[c.id].length <= (c.minRows || 1)) return; values[c.id].splice(+t.dataset.del, 1); edited(); drawControls(); recompute(); return; }
      if (t.matches('[data-p]')) { if (!result || testing()) return; runs.touch(); if (t.dataset.p === 'play') play(); else step(t.dataset.p); return; }
      if (t === allBtn || t === whole) { allv = t === whole ? true : !allv; runs.touch(); draw(); if (t === whole && allBtn && !allBtn.hidden) allBtn.focus({ preventScroll: true }); return; }
      if (t.matches('.lab-speed [data-s]')) { speed = +t.dataset.s; host.querySelectorAll('.lab-speed button').forEach(x => { const on = x === t; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); }); if (timer) { stop(); play(); } return; }
      if (t.id === pid + 'lab-reset') { stop(); quitChallenge(); values = Object.assign(defaults(def), o.cfg || {}); exRow = null; drawEx(); if (o.onExample) o.onExample(null); runs.touch(); drawControls(); recompute(); lockState(); return; }
      if (t.id === 'lab-rand') { if (chal) endChallenge(); else newChallenge(true); return; }
      if (t.id === 'chal-go') { grade(); return; }
      if (t.id === 'chal-new') { newChallenge(true); return; }
      if (t.id === 'chal-peek') { peek(); return; }
      if (t.matches('[data-pick]') && chal && !chal.done) { chal.pick = t.dataset.pick; host.querySelectorAll('[data-pick]').forEach(b => { const on = b === t; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); }); const m = $('#chal-msg'); if (m) m.textContent = ''; return; }
      if (t.matches('[data-pm]') && chal && !chal.done) {
        const a = $('#chal-a'); if (!a) return;
        a.value = a.value.startsWith('-') ? a.value.slice(1) : '-' + a.value;
        a.focus({ preventScroll: true });
        try { a.setSelectionRange(a.value.length, a.value.length); } catch (err) { /* ignore */ }
        return;
      }
    });
    /* ± never takes the focus from the box, so a phone's number pad stays open while the sign flips */
    const keepBox = e => { if (e.target && e.target.closest && e.target.closest('[data-pm]')) e.preventDefault(); };
    host.addEventListener('pointerdown', keepBox);
    host.addEventListener('mousedown', keepBox);
    host.addEventListener('keydown', e => {
      if (e.target.id === 'chal-a' && e.key === 'Enter') { e.preventDefault(); grade(); return; }
      /* P2-58: the lab's own keys work only on the lab itself (its focus ring), its stage and its caption; every control keeps its native
         keys (a slider steps once, Space presses a segment or 'Add row', arrows move inside a select or a text box) */
      const t = e.target;
      if (/^(INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY|OPTION|LABEL)$/.test(t.tagName) || t.isContentEditable || (t.closest && t.closest('[role="radiogroup"], [role="group"], .lab-chal, .lab-controls, .lab-foot'))) return;
      if (!(t === host || (t.closest && t.closest('.lab-stage')))) return;
      if (!result || testing() || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === ' ') { e.preventDefault(); runs.touch(); play(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End') { e.preventDefault(); runs.touch(); step({ ArrowRight: 'next', ArrowLeft: 'prev', Home: 'first', End: 'last' }[e.key]); }
    });
    let rt = 0;
    const onResize = () => { fitCtl(); clearTimeout(rt); rt = setTimeout(() => { fit(view); fit(res); }, 120); };
    if (full && typeof addEventListener === 'function') addEventListener('resize', onResize);
    /* compact: a new width (a phone turned, a column opened) means new heights, so the drawing's budget is measured again */
    let ro = null;
    if (compact && typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(() => { const w = host.clientWidth; if (vk && w && Math.abs(w - vw) >= 8) { vk = 0; draw(); } });
      ro.observe(host);
    }
    /* the lab page: any change of the inputs column's height decides again whether it may stick (P1-36; sticking never changes its size) */
    if (full && ctl && typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(() => fitCtl());
      ro.observe(ctl);
    }
    host.tabIndex = 0;
    runs.mount();
    const destroy = () => { stop(); clearTimeout(rt); if (ro) ro.disconnect(); if (unrove) unrove(); if (full && typeof removeEventListener === 'function') removeEventListener('resize', onResize); };
    return { values: () => values, stop: destroy, destroy, runs: () => runs.runs, testing: () => !!chal, example: () => (exRow ? exRow.pyq[0] : null) };
  };
  L.mountEmbed = async function (host, id, cfg) {
    if (!labs[id]) await U.loadScript('app/js/labs/' + id + '.js');
    return L.mount(host, id, { cfg, compact: true });
  };
  L.compute = (id, values) => labs[id].compute(Object.assign(defaults(labs[id]), values || {}));
  L.defaults = id => defaults(labs[id]);
  Object.assign(L, { _defaults: defaults, prepare, problem, answerSpec, normAnswer, check, cleanTyped, typedEdit, numOf, whyNot, shown, testView, runTracker, ctlFits, numMode, controlHtml, fitCount, presetInfo, pyqLabel, examples, gatePresetFor, optionsHtml, given, viewBudget, viewPlan, tileBasis, labelFloor, legible, formulaHead, viewHtml, notesOf, numericCols, tableHtml });
  if (typeof module !== 'undefined' && module.exports) module.exports = L;
})(typeof window !== 'undefined' ? window : globalThis);
