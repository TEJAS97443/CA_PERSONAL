/* PassBook — marking scheme. Pure functions, unit-tested (tests/scoring.test.js).
   PassBook fork: this is the engine's original objective-question marking (GATE's rules below), kept as machinery. ICAI papers have no
   negative marking and are mostly descriptive; the ICAI bank job adds their rules (MCQs of Papers 5 and 6: +1 or +2, no negative marking;
   descriptive answers: marked against ICAI's suggested answers by the learner) behind the same mark(q, response) contract.

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
  /** is `resp` an answer to q at all? Options: anything chosen; NAT: a real number (text that does not parse is no answer, P0-16) */
  function answered(q, resp) {
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
    const marks = q.marks || 1;
    if (!q.answer) return { score: 0, state: 'ungraded', negative: 0 };
    if (q.answer.kind === 'mta') return { score: marks, state: 'mta', negative: 0 };
    if (!answered(q, resp)) return { score: 0, state: 'skipped', negative: 0 };
    if (isCorrect(q.answer, resp, q.type)) return { score: marks, state: 'correct', negative: 0 };
    const neg = q.type === 'MCQ' && linkedRole(q) !== 'second' ? marks / 3 : 0;
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
    let score = 0, max = 0, correct = 0, wrong = 0, skipped = 0, negative = 0, ungraded = 0, mta = 0, mtaMarks = 0, notEvaluated = 0;
    for (const q of questions) {
      const r = res[q.id];
      if (r.state !== 'ungraded') max += q.marks || 0;
      score += r.score;
      negative += r.negative;
      if (r.state === 'correct') correct++;
      else if (r.state === 'mta') { mta++; mtaMarks += q.marks || 0; }
      else if (r.state === 'wrong') wrong++;
      else if (r.state === 'ungraded') ungraded++;
      else if (r.state === 'notevaluated') notEvaluated++;
      else skipped++;
    }
    const attempted = questions.filter(q => answered(q, responses[q.id])).length;
    return { results: res, score, max, correct, wrong, skipped, negative, ungraded, mta, mtaMarks, notEvaluated, attempted, total: questions.length };
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
    let correct, wrong, skipped, mta, notEvaluated, ungraded, mtaMarks = 0, max, scored;
    if (st && ids.length) {
      correct = wrong = skipped = mta = notEvaluated = ungraded = 0;
      let graded = 0, known = true;
      for (const id of ids) {
        const s = st[id], m = by && by[id] ? by[id].marks || 0 : null;
        if (m == null) known = false;
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
      max = !scored ? 0 : by && known ? graded : typeof t.max === 'number' ? t.max : null;
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
    const g2 = correct + wrong;
    return {
      score, max, correct, wrong, skipped, mta, mtaMarks, notEvaluated, ungraded, attempted, total,
      accuracy: g2 ? correct / g2 : null, scored, full: isFull(t), pct: scored && max > 0 ? score / max : null,
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
    const n = x => { const s = (Math.round(x * 1e6) / 1e6).toString(); return s; };
    const one = a => a.kind === 'single' ? a.value : a.kind === 'multi' ? a.value.join(', ') : a.kind === 'range' ? (a.min === a.max ? n(a.min) : `${n(a.min)} to ${n(a.max)}`) : '';
    if (answer.kind === 'mta') return 'Marks to all';
    if (answer.kind === 'oneof') return answer.alts.map(one).join(' or ');
    return one(answer);
  }

  GA.scoring = { parseNat, natClean, answered, isCorrect, mark, scoreAll, summary, isFull, fullSittings, standing, describe, norm };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.scoring;
})(typeof window !== 'undefined' ? window : globalThis);
