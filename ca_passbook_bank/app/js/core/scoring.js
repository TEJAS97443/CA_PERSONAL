/* PassBook — marking scheme. Pure functions, unit-tested (tests/scoring.test.js).
   PassBook: an ICAI item (docs/ICAI_BANK.md §6) has no negative marking, a descriptive item is self-marked against ICAI's answer (descMark),
   and a paper sitting honours the paper's choices (applyChoice). The GATE rules below stay for engine-shaped records (the test fixtures).

   GATE CS marking (as announced in each year's brochure and printed on the question paper):
     MCQ   1 mark  : wrong answer -1/3        2 marks : wrong answer -2/3        unattempted 0
           (the 150-mark papers of 2007–08 cost 0.25 / 0.5; they have no official key, so the app never scores them)
     MSQ   all-or-nothing, no negative marking, no partial credit (introduced 2021)
     NAT   no negative marking; the key gives an inclusive range (or several alternatives). Only a real number is an answer: the exam's
           keypad allows digits, one '.' and a leading minus, so a comma or any other character is never read (P0-16)
     MTA   "marks to all": every candidate receives the full marks, attempted or not. It is its own bucket, never 'correct' (P0-04)
   Pre-2014 papers contain linked-answer pairs: a wrong answer to the *first* question of the pair costs the usual negative
   marks, the second question is then not evaluated, and a wrong second answer carries no negative marks (also when it is checked alone).

   Stored test records are read through summary(t, D) (docs/ARCHITECTURE.md §10.13): the counts come from the per-question states at read time,
   so records written before the audit fixes read correctly too (marks to all and 'not evaluated' apart, a paper with no key 'Not scored'). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;
  const MINUS = /[−‒–—]/g;               // typographic minus signs and dashes count as '-'

  /** Parse a NAT entry the way the exam's virtual keypad would allow: digits, one '.', optional leading '-'. A comma is never read (null). */
  function parseNat(raw) {
    if (raw == null) return null;
    const s = String(raw).trim().replace(MINUS, '-');
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    const v = Number(s);
    return Number.isFinite(v) ? v : null;
  }
  /** a NAT box's text kept to what the on-screen keypad allows: digits, one '.', a leading minus (P0-16). A comma is dropped, never read as a
      decimal point (the boxes say 'Use a decimal point'). Shared by the question card, the lesson self-check, Home's PYQ and lab challenges. */
  function natClean(text) {
    let out = '', dot = false;
    for (const ch of String(text == null ? '' : text).replace(MINUS, '-')) {
      if (ch >= '0' && ch <= '9') out += ch;
      else if (ch === '.' && !dot) { dot = true; out += ch; }
      else if (ch === '-' && !out) out += ch;
    }
    return out;
  }
  const norm = r => {
    if (r == null) return null;
    if (Array.isArray(r)) return r.length ? r.map(x => String(x).toUpperCase()).sort() : null;
    const s = String(r).trim();
    return s === '' ? null : s;
  };
  /* ---------------- ICAI (docs/ICAI_BANK.md §6) ----------------
     An ICAI bank item (q.icai from the catalogue, or a record with a printed label) has no negative marking. A descriptive item (type 'DESC')
     is self-marked against ICAI's answer: resp = {t: the learner's own answer text, done: 'I answered this on paper', g: 'got' | 'partly' |
     'missed' (practice), m: marks given (a sitting's self-marking, 0 … the item's marks in halves)}. */
  const isIcai = q => !!(q && (q.icai || q.label));
  const isDesc = q => !!(q && q.type === 'DESC');
  const GRADES = ['got', 'partly', 'missed'];
  /** did the learner attempt a descriptive item (wrote something, ticked 'answered on paper', or already marked it) */
  function descAttempted(resp) {
    if (!resp || typeof resp !== 'object' || Array.isArray(resp)) return false;
    return !!(String(resp.t || '').trim() || resp.done || GRADES.includes(resp.g) || (typeof resp.m === 'number' && isFinite(resp.m)));
  }
  /** a self-mark as a number of marks, clamped to 0 … max and to halves; null when none is given */
  function selfMarks(resp, max) {
    if (!resp || typeof resp.m !== 'number' || !isFinite(resp.m)) return null;
    const m = Math.round(Math.max(0, resp.m) * 2) / 2;
    return max > 0 ? Math.min(max, m) : m;
  }
  /** a descriptive item's marks: {score, state, negative: 0, self: true}; state 'correct' (full marks / Got it), 'partial' (some marks / Partly),
      'wrong' (0 / Missed), 'pending' (attempted, not yet self-marked) or 'skipped' */
  function descMark(q, resp) {
    const max = (q && q.marks) || 0;
    if (!descAttempted(resp)) return { score: 0, state: 'skipped', negative: 0 };
    const m = selfMarks(resp, max);
    if (m != null) return { score: m, state: max > 0 && m >= max ? 'correct' : m > 0 ? 'partial' : 'wrong', negative: 0, self: true };
    if (resp.g === 'got') return { score: max, state: 'correct', negative: 0, self: true };
    if (resp.g === 'partly') return { score: max / 2, state: 'partial', negative: 0, self: true };
    if (resp.g === 'missed') return { score: 0, state: 'wrong', negative: 0, self: true };
    return { score: 0, state: 'pending', negative: 0 };
  }
  /** the grade a self-mark stands for in the notebook and the review schedule: full marks 'got', some 'partly', none 'missed' */
  const gradeOfMarks = (m, max) => (m == null ? null : max > 0 && m >= max ? 'got' : m > 0 ? 'partly' : 'missed');

  /** is `resp` an answer to q at all? Options: anything chosen; NAT: a real number (text that does not parse is no answer, P0-16); a descriptive
      item: anything written, ticked or marked */
  function answered(q, resp) {
    if (isDesc(q)) return descAttempted(resp);
    if (norm(resp) === null) return false;
    return !(q && q.type === 'NAT') || Array.isArray(resp) || parseNat(resp) !== null;
  }
  const linkedRole = q => (q && q.group && q.group.kind === 'linked' ? q.group.role : null);

  function matchBasic(a, resp, type) {
    if (a.kind === 'single') {            // an MSQ response arrives as an array; a one-letter key must still match a one-element selection
      const r = Array.isArray(resp) ? (resp.length === 1 ? resp[0] : null) : resp;
      return typeof r === 'string' && r.toUpperCase() === a.value;
    }
    if (a.kind === 'multi') {
      const set = Array.isArray(resp) ? resp.map(x => String(x).toUpperCase()).sort() : typeof resp === 'string' ? resp.toUpperCase().split('').sort() : [];
      return set.length === a.value.length && set.every((x, i) => x === a.value[i]);
    }
    if (a.kind === 'range') { const v = parseNat(resp); return v !== null && v >= a.min - EPS && v <= a.max + EPS; }
    return false;
  }

  /** Is `resp` correct for this answer key? Returns true / false, or null if the question has no official key. */
  function isCorrect(answer, resp, type) {
    if (!answer) return null;
    if (answer.kind === 'mta') return true;
    const r = norm(resp);
    if (r === null) return false;
    const alts = answer.kind === 'oneof' ? answer.alts : [answer];
    return alts.some(a => matchBasic(a, resp, type));
  }

  /** Marks for one question. resp: 'B' | ['A','C'] | '3.5' | null. Returns {score, state, negative}
      state: 'correct' | 'wrong' | 'skipped' | 'mta' | 'ungraded'   (ungraded = no official key available).
      The second question of a linked pair never costs negative marks (scoreAll also applies 'not evaluated'). */
  function mark(q, resp) {
    if (isDesc(q)) return descMark(q, resp);
    const marks = q.marks || 1;
    if (!q.answer) return { score: 0, state: 'ungraded', negative: 0 };
    if (q.answer.kind === 'mta') return { score: marks, state: 'mta', negative: 0 };
    if (!answered(q, resp)) return { score: 0, state: 'skipped', negative: 0 };
    if (isCorrect(q.answer, resp, q.type)) return { score: marks, state: 'correct', negative: 0 };
    const neg = q.type === 'MCQ' && linkedRole(q) !== 'second' && !isIcai(q) ? marks / 3 : 0;      // ICAI: no negative marking
    return { score: -neg, state: 'wrong', negative: neg };
  }

  /** Score a whole attempt. questions: array in paper order; responses: {qid: resp}.
      Applies the linked-answer rule. Returns per-question results and totals; marks to all (mta, mtaMarks) and 'not evaluated' (notEvaluated)
      are their own buckets, and max counts graded questions only (a question without a key is not out of anything). */
  function scoreAll(questions, responses) {
    responses = responses || {};
    const res = {};
    for (const q of questions) res[q.id] = mark(q, responses[q.id]);
    // linked pairs: the second is not evaluated when the first was wrong or skipped (in any order of the list)
    for (const q of questions) {
      const gr = q.group;
      if (!gr || gr.kind !== 'linked' || gr.role !== 'second') continue;
      const first = questions.find(x => x.group && x.group.kind === 'linked' && x.group.id === gr.id && x.group.role === 'first');
      const fr = first ? res[first.id] : null;
      const own = res[q.id].state;                     // no key, or marks to all for everyone: the rule does not apply
      if (fr && (fr.state === 'wrong' || fr.state === 'skipped') && own !== 'ungraded' && own !== 'mta') res[q.id] = { score: 0, state: 'notevaluated', negative: 0 };
    }
    let score = 0, max = 0, correct = 0, wrong = 0, skipped = 0, negative = 0, ungraded = 0, mta = 0, mtaMarks = 0, notEvaluated = 0, partial = 0, pending = 0;
    for (const q of questions) {
      const r = res[q.id];
      if (r.state !== 'ungraded') max += q.marks || 0;
      score += r.score;
      negative += r.negative;
      if (r.state === 'partial') partial++;
      else if (r.state === 'pending') pending++;
      else if (r.state === 'correct') correct++;
      else if (r.state === 'mta') { mta++; mtaMarks += q.marks || 0; }
      else if (r.state === 'wrong') wrong++;
      else if (r.state === 'ungraded') ungraded++;
      else if (r.state === 'notevaluated') notEvaluated++;
      else skipped++;
    }
    const attempted = questions.filter(q => answered(q, responses[q.id])).length;
    return { results: res, score, max, correct, wrong, skipped, negative, ungraded, mta, mtaMarks, notEvaluated, partial, pending, attempted, total: questions.length };
  }

  /* ---------------- ICAI paper sittings: the paper's choices (docs/ICAI_BANK.md §7) ----------------
     choice = {all} | {compulsory: [question numbers], groups: [{n, of: [question numbers]}]} for Part II (the build's parse of 'q1; any 4 of q2-q6');
     an OR alternative (q.alt = the id of the item it replaces) counts once. A paper's descriptive marks then count: every compulsory question, and in
     each group the first n questions the learner attempted in paper order (PassBook's rule when more were answered than allowed; ICAI's papers say
     only how many to answer). Part I (MCQs) is always compulsory. */
  /** the descriptive questions of a sitting by number, in paper order: {no: {no, items: [q], marks (OR alternatives once)}} */
  function questionsByNo(questions) {
    const by = {}, order = [];
    (questions || []).forEach(q => {
      if (!isDesc(q)) return;
      const k = (q.sub ? q.sub + ':' : '') + q.no;
      if (!by[k]) { by[k] = { key: k, no: q.no, sub: q.sub || null, items: [], marks: 0 }; order.push(k); }
      by[k].items.push(q);
      if (!q.alt) by[k].marks += q.marks || 0;
    });
    return { by, order };
  }
  /** apply a paper's choice rules to per-item results (in place): items of questions beyond the allowed number become 'excess' (score 0, out of
      the maximum), and of an OR pair only one item counts (the one answered; if both, the first) -> {max, counted: [question keys], excess: [keys]}.
      choiceOf(sub) gives the rule for a section ('all' for a one-section paper; P6: 'fm' / 'sm'); questions without a rule all count. */
  function applyChoice(questions, results, choiceOf) {
    const { by, order } = questionsByNo(questions);
    const attempted = k => by[k].items.some(q => results[q.id] && results[q.id].state !== 'skipped');
    const counted = [], excess = [];
    const groups = {};
    order.forEach(k => { const sub = by[k].sub || 'all'; (groups[sub] = groups[sub] || []).push(k); });
    let max = 0;
    (questions || []).forEach(q => { if (!isDesc(q) && results[q.id] && results[q.id].state !== 'ungraded') max += q.marks || 0; });
    Object.keys(groups).forEach(sub => {
      const keys = groups[sub], rule = typeof choiceOf === 'function' ? choiceOf(sub) : null;
      const take = new Set();
      if (!rule || rule.all) keys.forEach(k => take.add(k));
      else {
        keys.forEach(k => { if ((rule.compulsory || []).includes(by[k].no)) take.add(k); });
        (rule.groups || []).forEach(g => {
          const inG = keys.filter(k => g.of.includes(by[k].no));
          const tried = inG.filter(attempted).slice(0, g.n);
          tried.forEach(k => take.add(k));
          // the maximum counts n questions of the group even when fewer were attempted: the largest ones (ICAI's papers give them equal marks)
          const best = inG.map(k => by[k].marks).sort((a, b) => b - a).slice(0, g.n);
          max += best.reduce((a, b) => a + b, 0) - tried.reduce((a, k) => a + by[k].marks, 0);
        });
        keys.filter(k => !(rule.compulsory || []).includes(by[k].no) && !(rule.groups || []).some(g => g.of.includes(by[k].no))).forEach(k => take.add(k));
      }
      keys.forEach(k => {
        if (!take.has(k)) { by[k].items.forEach(q => { if (results[q.id] && results[q.id].state !== 'skipped') { results[q.id] = { score: 0, state: 'excess', negative: 0 }; } }); if (attempted(k)) excess.push(k); return; }
        counted.push(k);
        max += by[k].marks;
        // an OR pair: the alternative that was answered counts; both answered, the first in paper order
        by[k].items.filter(q => q.alt).forEach(q => {
          const main = by[k].items.find(x => x.id === q.alt);
          if (!main || !results[q.id] || !results[main.id]) return;
          const a = results[main.id].state !== 'skipped', b = results[q.id].state !== 'skipped';
          if (a && b) results[q.id] = { score: 0, state: 'excess', negative: 0 };
          else if (!a && !b) results[q.id] = { score: 0, state: 'skipped', negative: 0, alt: true };
        });
      });
    });
    return { max, counted, excess };
  }

  /** a paper or mock sitting (the full-length kinds: trends, best and 'latest' read only these, P2-34) */
  const isFull = t => !!t && (t.kind === 'paper' || t.kind === 'mock');

  /** A stored test record read at read time (§10.13; P0-04, P0-05): {score, max, correct, wrong, skipped, mta, mtaMarks, notEvaluated, ungraded,
      attempted, total, accuracy, scored, full, pct, missed, negative}. Counts come from t.states, so old records (where 'correct' included marks
      to all and 'skipped' included 'not evaluated') read correctly; max counts graded questions only (from D.qById when given); accuracy =
      correct ÷ (correct + wrong), null without a graded answer; scored = false when nothing in the test could be graded ('Not scored' everywhere). */
  function summary(t, D) {
    if (!t || typeof t !== 'object') return null;
    const st = t.states && typeof t.states === 'object' ? t.states : null;
    const ids = Array.isArray(t.qids) && t.qids.length ? t.qids : st ? Object.keys(st) : [];
    const by = D && D.qById ? D.qById : null;
    const num = x => (typeof x === 'number' && isFinite(x) ? x : 0);
    let correct, wrong, skipped, mta, notEvaluated, ungraded, mtaMarks = 0, max, scored, partial = 0, excess = 0;
    if (st && ids.length) {
      correct = wrong = skipped = mta = notEvaluated = ungraded = 0;
      let graded = 0, known = true;
      for (const id of ids) {
        const s = st[id], m = by && by[id] ? by[id].marks || 0 : null;
        if (m == null) known = false;
        if (s === 'partial' || s === 'pending') { partial += s === 'partial' ? 1 : 0; wrong += s === 'pending' ? 1 : 0; if (m != null) graded += m; continue; }
        if (s === 'excess') { excess++; continue; }
        if (s === 'correct') correct++;
        else if (s === 'wrong') wrong++;
        else if (s === 'mta') { mta++; mtaMarks += m || 0; }
        else if (s === 'notevaluated') notEvaluated++;
        else if (s === 'skipped') skipped++;
        else ungraded++;                                 // 'ungraded', or a question the record never graded (its file did not load)
        if (s && s !== 'ungraded' && m != null) graded += m;
      }
      scored = ungraded < ids.length;                    // something in it could be graded
      // max: graded questions only. With the catalogue we add them up; without it the stored max (graded-only since the fix) stands
      max = !scored ? 0 : t.icai && typeof t.max === 'number' ? t.max : by && known ? graded : typeof t.max === 'number' ? t.max : null;   // an ICAI sitting stores its choice-aware maximum
      if (t.icai && max === 0) scored = false;            // ICAI items that print no marks (an RTP's): graded, never a score out of 0
      if (!(by && known) && typeof t.mtaMarks === 'number') mtaMarks = t.mtaMarks;
    } else {
      correct = num(t.correct); wrong = num(t.wrong); skipped = num(t.skipped); ungraded = num(t.ungraded);
      mta = num(t.mta); notEvaluated = num(t.notEvaluated); mtaMarks = num(t.mtaMarks);
      max = typeof t.max === 'number' ? t.max : null;
      const tot = num(t.total);
      scored = !(tot > 0 && ungraded >= tot) && !(max != null && max <= 0);
      if (!scored) max = 0;
    }
    const total = ids.length || num(t.total);
    let attempted = num(t.attempted);
    if (typeof t.attempted !== 'number' && t.responses && typeof t.responses === 'object') attempted = ids.filter(id => norm(t.responses[id]) !== null).length;
    const score = scored ? num(t.score) : 0;
    const g2 = correct + wrong + partial;
    return {
      score, max, correct, wrong, skipped, mta, mtaMarks, notEvaluated, ungraded, attempted, total, partial, excess,
      accuracy: g2 ? (correct + partial / 2) / g2 : null, scored, full: isFull(t), pct: scored && max > 0 ? score / max : null,
      missed: wrong + skipped, negative: num(t.negative)
    };
  }

  /** the scored full-length sittings of a test history, oldest first, each read through summary(): [{t, m}] (P1-30, P2-34). Trends, 'best'
      and 'last full-length' read only these, so a 10-question quiz never sits on the same line as a 3-hour paper, and an unkeyed sitting
      ('Not scored') is never a point on it. */
  function fullSittings(tests, D) {
    return (Array.isArray(tests) ? tests : []).filter(t => t && typeof t === 'object' && isFull(t))
      .map(t => ({ t, m: summary(t, D) })).filter(x => x.m && x.m.scored && x.m.max > 0)
      .sort((a, b) => (a.t.finished || 0) - (b.t.finished || 0));
  }

  /** where one sitting stands among the learner's scored full-length sittings (P2-69, P2-34) → null when it is not one of them, else
      {n: how many there are, i: its place by date (0 = the first), first, best, prev, delta, deltaPts}:
        best   its share of the marks is the highest of all of them (ties count) and there are at least two
        prev   {t, m} of the full-length sitting just before it, or null
        delta  marks against prev when both are out of the same marks, else null; deltaPts the difference in percentage points otherwise */
  function standing(tests, id, D) {
    const fulls = fullSittings(tests, D), i = fulls.findIndex(x => x.t.id === id);
    if (i < 0) return null;
    const me = fulls[i], prev = i > 0 ? fulls[i - 1] : null, top = Math.max(...fulls.map(x => x.m.pct));
    const r3 = x => Math.round(x * 1000) / 1000;
    return {
      n: fulls.length, i, first: i === 0, best: fulls.length > 1 && me.m.pct >= top - EPS, prev,
      delta: prev && prev.m.max === me.m.max ? r3(me.m.score - prev.m.score) : null,
      deltaPts: prev && prev.m.max !== me.m.max ? Math.round(100 * (me.m.pct - prev.m.pct)) : null
    };
  }

  /** Human-readable version of an official answer: "C", "A, C", "3.7 to 3.8", "C or D", "Marks to all". */
  function describe(answer) {
    if (!answer) return 'not available';
    if (answer.kind === 'oneof' && answer.alts.every(a => a.kind === 'single')) return answer.alts.map(a => a.value).join(' or ');
    const n = x => { const s = (Math.round(x * 1e6) / 1e6).toString(); return s; };
    const one = a => a.kind === 'single' ? a.value : a.kind === 'multi' ? a.value.join(', ') : a.kind === 'range' ? (a.min === a.max ? n(a.min) : `${n(a.min)} to ${n(a.max)}`) : '';
    if (answer.kind === 'mta') return 'Marks to all';
    if (answer.kind === 'oneof') return answer.alts.map(one).join(' or ');
    return one(answer);
  }

  GA.scoring = { parseNat, natClean, answered, isCorrect, mark, scoreAll, summary, isFull, fullSittings, standing, describe, norm,
    isIcai, isDesc, GRADES, descAttempted, selfMarks, descMark, gradeOfMarks, questionsByNo, applyChoice };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.scoring;
})(typeof window !== 'undefined' ? window : globalThis);
