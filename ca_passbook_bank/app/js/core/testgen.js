/* PassBook — building tests from the question bank. Pure and seeded, so a mock is reproducible and unit-testable.
   A test is {kind, title, qids, limitMs}; the runner adds the live state.
   PassBook fork: the blueprints below are the engine's original ones (the GATE pattern: 10 aptitude + 25 one-mark + 30 two-mark questions,
   MCQ / MSQ / NAT). PassBook ships no question yet, so the tests hub never calls them (views/test.js emptyHub). The ICAI bank job replaces
   mock / blueprint / diagnostic with ICAI's paper patterns (descriptive questions with sub-parts; the 30-mark MCQ part of Papers 5 and 6;
   no negative marking) and keeps the {kind, title, qids, limitMs} contract. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');
  const MIN_PER_MARK = 1.8;                         // 180 minutes for 100 marks (also ICAI's: 3 hours a 100-mark paper)

  const marksOf = (D, ids) => ids.reduce((a, id) => a + (D.qById[id] ? D.qById[id].marks : 0), 0);
  const limit = (D, ids) => Math.round(marksOf(D, ids) * MIN_PER_MARK * 60000);
  /* marks to all (P0-04): the official key gave every candidate the marks, so a pool that drew one would hand out free marks (73 of 200 mocks
     scored 1 / 100 with no answer). The build's MTA bit (q.mta) says exactly which; until a build ships it, the SPECIAL bit (marks to all or
     several accepted answers, 17 questions) stands in, which also leaves out the 7 'one of' keys. */
  const mtaOf = D => (D && D.questions && D.questions.some(q => q.mta) ? q => !!q.mta : q => !!(q.mta || q.special));
  const usableWith = (D, o) => { const isMta = mtaOf(D); return q => q.hasKey && !q.grouped && !q.review && !isMta(q) && (o.includeLegacy || !q.legacy); };

  /** the printed order of a paper's questions (D15: sittings keep the paper's order). Most papers print General Aptitude first; GATE 2010–13
      and 2017 printed it last, as Q56–Q65 after the technical section, so the section that carries the lower numbers comes first. */
  function printedOrder(qs) {
    const ga = qs.filter(q => q.section === 'GA').sort((a, b) => a.no - b.no), cs = qs.filter(q => q.section !== 'GA').sort((a, b) => a.no - b.no);
    const gaLast = ga.length && cs.length && ga[0].no > cs[cs.length - 1].no;
    return gaLast ? cs.concat(ga) : ga.concat(cs);
  }

  /** the whole paper exactly as printed, on the paper's own clock (p.minutes: 180 for every GATE CS paper, also the 150-mark ones of 2007–08).
      keyed = how many of its questions the official key grades; a paper with none (2007–2010) is practised untimed, never sat (P0-05). */
  function fromPaper(D, paperId) {
    const p = D.paperById[paperId];
    const qs = printedOrder(D.questions.filter(q => q.paper === paperId));
    const ids = qs.map(q => q.id);
    const minutes = p && p.minutes > 0 ? p.minutes : 180;
    return { kind: 'paper', title: (p ? p.label : paperId) + ' — full paper', paper: paperId, qids: ids, limitMs: minutes * 60000, keyed: qs.filter(q => q.hasKey).length };
  }

  /** largest-remainder allocation of `total` integer units to weights */
  function allocate(weights, total) {
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    const raw = weights.map(w => (w / sum) * total), base = raw.map(Math.floor);
    let left = total - base.reduce((a, b) => a + b, 0);
    const order = raw.map((r, i) => [r - base[i], i]).sort((a, b) => b[0] - a[0]);
    for (let k = 0; left > 0 && order.length; k++, left--) base[order[k % order.length][1]]++;
    return base;
  }

  /* ------------------------------------------------------------------ the full-length mock (P1-29, P1-03, P1-31) */
  /** the paper's blocks in printed order since 2014: aptitude (5 one-mark, 5 two-mark), then technical (25 one-mark, 30 two-mark) */
  const BLUEPRINT = [{ sec: 'GA', marks: 1, n: 5 }, { sec: 'GA', marks: 2, n: 5 }, { sec: 'CS', marks: 1, n: 25 }, { sec: 'CS', marks: 2, n: 30 }];
  const TYPE_ORDER = ['MCQ', 'MSQ', 'NAT'];            // inside each block the papers print MCQs, then MSQs, then NATs
  const PATTERN_SINCE = 2021;                           // the current pattern (MSQs) starts with GATE 2021
  const SECTION_MARKS = { CS: 85, GA: 15 };
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /** the like-for-like marks a paper (P1-03, the same formula as GA.insights' perPaper): in every paper with a technical section, each subject's
      share of its in-syllabus technical marks, averaged over those papers and scaled to 85. The 150-mark papers and topics outside the 2027
      syllabus do not inflate it. → {subjectId: marks} */
  function likeForLike(D) {
    const byPaper = U.groupBy(D.questions.filter(q => q.section === 'CS'), q => q.paper);
    const sums = {};
    let papers = 0;
    for (const p of Object.keys(byPaper)) {
      papers++;
      const qs = byPaper[p].filter(q => !q.legacy), tot = qs.reduce((a, q) => a + (q.marks || 0), 0);
      if (!tot) continue;
      qs.forEach(q => (sums[q.subject] = (sums[q.subject] || 0) + (q.marks || 0) / tot));
    }
    const out = {};
    Object.keys(sums).forEach(s => (out[s] = papers ? (sums[s] / papers) * SECTION_MARKS.CS : 0));
    return out;
  }
  /** the recent papers' MCQ / MSQ / NAT mix of one block, scaled to its size (CS one-mark about 11 / 8 / 6, two-mark 11 / 8 / 11) */
  function typeMix(D, sec, marks, n, since) {
    const of = qs => qs.filter(q => q.section === sec && q.marks === marks);
    let src = of(D.questions.filter(q => q.year >= (since || PATTERN_SINCE)));
    if (!src.length) src = of(D.questions);
    const counts = TYPE_ORDER.map(t => src.filter(q => q.type === t).length);
    const a = counts.some(Boolean) ? allocate(counts, n) : [n, 0, 0];
    return Object.fromEntries(TYPE_ORDER.map((t, i) => [t, a[i]]));
  }
  /** the mock's blueprint as the hub draws it: blocks with their type mix, the total marks and minutes */
  function blueprint(D) {
    const blocks = BLUEPRINT.map(b => Object.assign({}, b, { mix: typeMix(D, b.sec, b.marks, b.n) }));
    const marks = blocks.reduce((a, b) => a + b.n * b.marks, 0);
    const years = U.uniq(D.questions.filter(q => q.year >= PATTERN_SINCE).map(q => q.year)).sort();
    return { blocks, questions: blocks.reduce((a, b) => a + b.n, 0), marks, minutes: Math.round(marks * MIN_PER_MARK), since: years[0] || null, until: years[years.length - 1] || null };
  }
  function weighted(items, w, rnd) {
    const tot = w.reduce((a, b) => a + b, 0);
    if (!(tot > 0)) return items[Math.floor(rnd() * items.length)];
    let r = rnd() * tot;
    for (let i = 0; i < items.length; i++) { r -= w[i]; if (r < 0) return items[i]; }
    return items[items.length - 1];
  }
  /** one block: the type mix (capped by what the pool has), subjects in proportion to their weights, the scarcest type first so the plentiful
      MCQs fill what each subject still needs; then printed type order with the subjects shuffled inside each type, so position never gives the
      subject away */
  function fillBlock(D, b, pool, used, rnd, fresh, weights) {
    const B = pool.filter(q => q.section === b.sec && q.marks === b.marks && !used.has(q.id));
    const mix = typeMix(D, b.sec, b.marks, b.n), tq = Object.assign({}, mix);
    const avail = Object.fromEntries(TYPE_ORDER.map(t => [t, B.filter(q => q.type === t).length]));
    let short = 0;
    TYPE_ORDER.forEach(t => { if (tq[t] > avail[t]) { short += tq[t] - avail[t]; tq[t] = avail[t]; } });
    while (short > 0) { const t = TYPE_ORDER.filter(x => avail[x] > tq[x]).sort((x, y) => mix[y] - mix[x])[0]; if (!t) break; tq[t]++; short--; }
    const subOf = q => (b.sec === 'GA' ? '*' : q.subject);
    const subs = b.sec === 'GA' ? ['*'] : U.uniq(B.map(q => q.subject)).sort();
    const quota = {};
    const al = allocate(subs.map(s => (b.sec === 'GA' ? 1 : Math.max(0, weights[s] || 0))), b.n);
    subs.forEach((s, i) => (quota[s] = al[i]));
    const lists = {};
    for (const q of B) (lists[subOf(q) + '|' + q.type] = lists[subOf(q) + '|' + q.type] || []).push(q);
    Object.keys(lists).forEach(k => { const L = lists[k]; lists[k] = U.shuffle(L.filter(fresh), rnd).concat(U.shuffle(L.filter(q => !fresh(q)), rnd)); });
    const taken = {}, picked = [];
    const scarce = TYPE_ORDER.slice().sort((x, y) => (avail[x] / Math.max(1, tq[x])) - (avail[y] / Math.max(1, tq[y])) || TYPE_ORDER.indexOf(x) - TYPE_ORDER.indexOf(y));
    for (const t of scarce) {
      for (let k = 0; k < tq[t]; k++) {
        const cands = subs.filter(s => (lists[s + '|' + t] || []).length);
        if (!cands.length) break;
        const def = s => quota[s] - (taken[s] || 0), pos = cands.filter(s => def(s) > 0), from = pos.length ? pos : cands;
        const s = weighted(from, from.map(x => (pos.length ? def(x) : 1)), rnd);
        const q = lists[s + '|' + t].shift();
        used.add(q.id); picked.push(q); taken[s] = (taken[s] || 0) + 1;
      }
    }
    // a pool too small for the block: top up with whatever is left in it
    if (picked.length < b.n) {
      const rest = U.shuffle(B.filter(q => !used.has(q.id) && fresh(q)), rnd).concat(U.shuffle(B.filter(q => !used.has(q.id) && !fresh(q)), rnd));
      rest.slice(0, b.n - picked.length).forEach(q => { used.add(q.id); picked.push(q); });
    }
    return [].concat(...TYPE_ORDER.map(t => U.shuffle(picked.filter(q => q.type === t), rnd)));
  }
  /** a mock's name (P1-31): 'Mock 4 · 15 Oct', numbered after the learner's finished mocks (the seed stays in the record) */
  function mockTitle(o) {
    const n = o.number != null ? o.number : 1 + (((o.state && o.state.tests) || []).filter(t => t && t.kind === 'mock').length);
    const d = new Date(o.now != null ? o.now : Date.now());
    return `Mock ${n} · ${d.getDate()} ${MON[d.getMonth()]}`;
  }

  /** Full-length mock built like the papers since 2021: 10 GA (5 x 1 + 5 x 2) + 55 technical (25 x 1 + 30 x 2) in printed block order, each block
      in the recent papers' MCQ / MSQ / NAT mix, technical subjects weighted by the like-for-like marks a paper (o.weights, else likeForLike),
      subjects interleaved inside each block. opts: {seed, excludeAttempted, includeLegacy, state, weights, number, now} */
  function mock(D, o) {
    o = Object.assign({ seed: 1, excludeAttempted: false, includeLegacy: false }, o || {});
    const rnd = U.rng(o.seed), st = (o.state && o.state.q) || {};
    const pool = D.questions.filter(usableWith(D, o));
    const fresh = q => !(o.excludeAttempted && st[q.id] && st[q.id].n);
    const weights = o.weights && typeof o.weights === 'object' ? o.weights : likeForLike(D);
    const used = new Set(), out = [];
    BLUEPRINT.forEach(b => out.push(...fillBlock(D, b, pool, used, rnd, fresh, weights)));
    const ids = out.map(q => q.id);
    const ga = out.filter(q => q.section === 'GA').length, cs1 = out.filter(q => q.section === 'CS' && q.marks === 1).length, cs2 = out.filter(q => q.section === 'CS' && q.marks === 2).length;
    return { kind: 'mock', title: mockTitle(o), qids: ids, limitMs: limit(D, ids), seed: o.seed, complete: ga === 10 && cs1 === 25 && cs2 === 30 };
  }

  /** the 10-question warm-up for the eve and exam day (P1-61): one-mark MCQs and NATs, easy first, 2 aptitude and one each from the 8 technical
      subjects with the most marks a paper, unseen first; a calm 15-minute clock. opts: {seed, state, includeLegacy} */
  function warmup(D, o) {
    o = Object.assign({ seed: 7, includeLegacy: false }, o || {});
    const rnd = U.rng(o.seed), st = (o.state && o.state.q) || {}, ok = usableWith(D, o);
    const pool = D.questions.filter(q => ok(q) && q.marks === 1 && q.type !== 'MSQ');
    const rank = q => (q.diff === 'easy' ? 0 : q.diff === 'medium' ? 1 : q.diff ? 3 : 2) + (st[q.id] && st[q.id].n ? 0.5 : 0);
    const best = list => { const sh = U.shuffle(list, rnd); return sh.sort((a, b) => rank(a) - rank(b))[0] || null; };
    const used = new Set(), out = [];
    const take = list => { const q = best(list.filter(x => !used.has(x.id))); if (q) { used.add(q.id); out.push(q); } };
    take(pool.filter(q => q.section === 'GA')); take(pool.filter(q => q.section === 'GA'));
    const w = likeForLike(D), subs = Object.keys(w).filter(s => s !== 'ga').sort((a, b) => w[b] - w[a]).slice(0, 8);
    subs.forEach(s => take(pool.filter(q => q.section === 'CS' && q.subject === s)));
    while (out.length < 10) { const n = out.length; take(pool.filter(q => q.section === 'CS')); if (out.length === n) break; }
    const ids = out.map(q => q.id);
    return { kind: 'warmup', title: `Warm-up · ${ids.length} questions`, qids: ids, limitMs: WARMUP_MIN * 60000, seed: o.seed };
  }
  const WARMUP_MIN = 15;

  /** is a topic outside the 2027 syllabus text (status 'extra' or 'legacy')? Its own test then includes its out-of-syllabus questions (P2-31) */
  const topicOutside = (D, topic) => { const t = topic && D && D.nodes ? D.nodes[topic] : null; return !!(t && t.status && t.status !== 'in'); };
  /** the questions a subject or topic test can draw (P2-31): usable, keyed, not marks to all; a topic outside the syllabus counts its legacy
      questions too. o = {subject, topic, includeLegacy} */
  function topicPool(D, o) {
    o = o || {};
    const ok = usableWith(D, { includeLegacy: !!o.includeLegacy || (!!o.topic && topicOutside(D, o.topic)) });
    return D.questions.filter(q => ok(q) && (o.topic ? q.topic === o.topic : q.subject === o.subject));
  }
  /** the hub's topic options with their usable counts (P2-31): {whole: n, topics: [{id, name, n, outside}]} in syllabus order; a topic with 0 is
      shown disabled, never silently a smaller test */
  function topicCounts(D, subject, o) {
    const sj = D.subjectById && D.subjectById[subject];
    const whole = topicPool(D, Object.assign({}, o, { subject, topic: null })).length;
    const topics = ((sj && sj.topics) || []).map(t => ({ id: t.id, name: t.name, n: topicPool(D, Object.assign({}, o, { subject, topic: t.id })).length, outside: topicOutside(D, t.id) }));
    return { whole, topics };
  }
  /** the sizes a subject or topic test offers for a pool of `pool` usable questions: each size up to the pool, and the first size that takes all
      of it (a pool of 7 offers only '10', which builds 7) → [{n, real, on}] */
  function sizesFor(pool, sizes) {
    sizes = sizes || [10, 20, 30];
    let covered = false;
    return sizes.map(n => { const on = !covered && pool > 0; if (n >= pool) covered = true; return { n, real: Math.min(n, pool), on }; });
  }

  /** n questions from one subject (or topic): about 40% one-mark, 60% two-mark, newest unattempted first */
  function subject(D, o) {
    o = Object.assign({ n: 20, seed: 1, includeLegacy: false }, o);
    const rnd = U.rng(o.seed), st = (o.state && o.state.q) || {};
    let pool = topicPool(D, o);
    const fresh = U.shuffle(pool.filter(q => !(st[q.id] && st[q.id].n)), rnd), seen = U.shuffle(pool.filter(q => st[q.id] && st[q.id].n), rnd);
    const ordered = fresh.concat(seen);
    const one = ordered.filter(q => q.marks === 1), two = ordered.filter(q => q.marks === 2);
    const w1 = Math.min(one.length, Math.round(o.n * 0.4)), w2 = Math.min(two.length, o.n - w1);
    let sel = one.slice(0, w1).concat(two.slice(0, w2));
    if (sel.length < o.n) { const have = new Set(sel.map(q => q.id)); sel = sel.concat(ordered.filter(q => !have.has(q.id)).slice(0, o.n - sel.length)); }
    const ids = U.shuffle(sel, rnd).map(q => q.id);
    const name = o.topic ? D.name(o.topic) : D.subjectById[o.subject].name;
    return { kind: o.topic ? 'topic' : 'subject', title: `${name} · ${ids.length} questions`, qids: ids, limitMs: limit(D, ids), subject: o.subject, topic: o.topic || null };
  }

  /** 10-question diagnostic across the biggest subjects: one 1-mark and one 2-mark aptitude question, then one question from each of the 8
      technical subjects with the most marks a paper (P2-31). A new seed each time (the hub passes Date.now()), questions the learner has not seen
      first, and the subjects rotate: the starting subject and which ones get the 2-mark question move with the seed, so a second diagnostic is
      a different check. Always 10 questions · 15 marks · 27 minutes when the bank has them. opts: {seed, state, includeLegacy} */
  /* the engine's diagnostic took one question from each of 8 fixed subjects; PassBook has four papers, so the list is empty and the slots are
     filled from the subjects by weight, cycling when there are fewer than 8 (two questions a paper) */
  const DIAG_SUBJECTS = [];
  function diagnostic(D, o) {
    o = Object.assign({ seed: 11 }, o);
    const rnd = U.rng(o.seed), st = (o.state && o.state.q) || {}, pool = D.questions.filter(usableWith(D, o)), used = new Set(), out = [];
    const seen = q => !!(st[q.id] && (st[q.id].n || st[q.id].seen));
    const pickOne = (list, m) => {
      const c = list.filter(q => q.marks === m && !used.has(q.id));
      const q = U.shuffle(c.filter(x => !seen(x)), rnd)[0] || U.shuffle(c, rnd)[0];
      if (q) { used.add(q.id); out.push(q); }
    };
    pickOne(pool.filter(q => q.section === 'GA'), 1); pickOne(pool.filter(q => q.section === 'GA'), 2);
    const w = likeForLike(D), have = DIAG_SUBJECTS.filter(s => pool.some(q => q.subject === s));
    const base = have.length >= 8 ? have : U.uniq(have.concat(Object.keys(w).filter(s => s !== 'ga' && pool.some(q => q.subject === s)).sort((a, b) => w[b] - w[a])));
    const subs = base.length >= 8 ? base.slice(0, 8) : base.length ? Array.from({ length: 8 }, (_, i) => base[i % base.length]) : [];
    const s0 = Math.abs(Math.floor(o.seed)) || 0, off = s0 % Math.max(1, subs.length), flip = Math.floor(s0 / Math.max(1, subs.length)) % 2;
    subs.slice(off).concat(subs.slice(0, off)).forEach((s, i) => pickOne(pool.filter(q => q.subject === s && q.section !== 'GA'), (i + flip) % 2 ? 2 : 1));
    const ids = out.map(q => q.id);
    return { kind: 'diagnostic', title: 'Diagnostic · 10 questions', qids: ids, limitMs: limit(D, ids), seed: o.seed };
  }

  /* ------------------------------------------------------------------ the runner's palette and Submit summary (P1-28) */
  /** a question's palette status in a live test, GATE's five: 'ans' answered, 'am' answered and marked for review, 'mk' marked without an
      answer, 'na' visited but not answered, 'nv' not visited. An answer is a response GA.scoring.answered accepts (a NAT box whose text is not
      a number holds no answer, P0-16). */
  function status(q, lv) {
    const SC = GA.scoring || require('./scoring.js');
    const id = q.id, r = lv && lv.responses ? lv.responses[id] : null, mk = !!(lv && lv.marked && lv.marked[id]);
    const a = r != null && SC.answered(q, r);
    return a && mk ? 'am' : mk ? 'mk' : a ? 'ans' : lv && lv.visited && lv.visited[id] ? 'na' : 'nv';
  }
  /** the Submit summary per section ('GA', 'CS') in the order the test prints them, and in total: the five statuses plus answered = ans + am
      (both are evaluated) and unanswered = na + nv + mk, so answered + unanswered = the questions (the old dialog left 'marked' out of both) */
  function counts(questions, lv) {
    const blank = () => ({ total: 0, ans: 0, am: 0, mk: 0, na: 0, nv: 0 });
    const by = {}, all = blank(), secs = [];
    (questions || []).forEach(q => {
      const s = q.icai ? (q.sub ? q.sub + ':' : '') + q.section : q.section === 'GA' ? 'GA' : 'CS', k = status(q, lv);
      if (!by[s]) { by[s] = blank(); secs.push(s); }
      by[s][k]++; by[s].total++; all[k]++; all.total++;
    });
    const fin = e => Object.assign(e, { answered: e.ans + e.am, unanswered: e.na + e.nv + e.mk });
    return { sections: secs.map(s => Object.assign({ sec: s }, fin(by[s]))), total: fin(all) };
  }

  /* ------------------------------------------------------------------ GATE CBT answers in a full-length sitting (D7, P2-30) */
  /** do full-length sittings save answers only with Save & Next? Papers and mocks do by default (D7); short tests autosave */
  const cbtDefault = kind => kind === 'paper' || kind === 'mock';
  /** one answer action in a sitting that follows GATE's computer-based test. draft = the current, unsaved selection (undefined: untouched since
      the question opened; null: nothing selected). Mutates lv.responses and lv.marked:
        'save'  Save & Next: the draft becomes the answer (none clears it) and the review mark goes (the last action sets the status)
        'mark'  Mark for Review & Next: the draft is saved and the question marked (answered & marked questions are evaluated)
        'clear' Clear Response: no answer; a review mark stays
        'leave' moving away by the palette, Previous, a section tab or a key: an unsaved draft is dropped, as in GATE
      → {saved, lost}: lost = the dropped draft differed from the saved answer (the runner then says so) */
  function commit(lv, q, action, draft) {
    const SC = GA.scoring || require('./scoring.js');
    lv.responses = lv.responses || {}; lv.marked = lv.marked || {};
    const id = q.id, touched = draft !== undefined, real = touched && draft != null && SC.answered(q, draft);
    if (action === 'save' || action === 'mark') {
      if (touched) { if (real) lv.responses[id] = Array.isArray(draft) ? draft.slice() : draft; else delete lv.responses[id]; }
      if (action === 'mark') lv.marked[id] = true; else delete lv.marked[id];
      return { saved: touched, lost: false };
    }
    if (action === 'clear') { delete lv.responses[id]; return { saved: true, lost: false }; }
    const key = r => (r == null || !SC.answered(q, r) ? null : JSON.stringify(SC.norm(r)));
    return { saved: false, lost: touched && key(real ? draft : null) !== key(lv.responses[id]) };
  }

  /** a test's own blueprint, for the briefing card (P2-30): its sections in printed order with their questions, marks and mark values, the
      MCQ / MSQ / NAT mix, linked pairs and questions without a key. questions = the test's records (or catalogue rows). */
  function blueprintOf(questions) {
    const secs = [], by = {};
    let linked = 0, ungraded = 0;
    (questions || []).forEach(q => {
      const s = q.icai ? (q.sub ? q.sub + ':' : '') + q.section : q.section === 'GA' ? 'GA' : 'CS';
      if (!by[s]) { by[s] = { sec: s, n: 0, marks: 0, byMarks: {}, types: { MCQ: 0, MSQ: 0, NAT: 0, DESC: 0 } }; secs.push(s); }
      const e = by[s];
      e.n++; e.marks += q.marks || 0; e.byMarks[q.marks || 1] = (e.byMarks[q.marks || 1] || 0) + 1;
      if (e.types[q.type] != null) e.types[q.type]++;
      if (q.group && q.group.kind === 'linked' && q.group.role === 'second') linked++;
      if (q.type !== 'DESC' && (q.hasKey === false || q.answer === null)) ungraded++;
    });
    const sections = secs.map(s => by[s]);
    return { sections, questions: sections.reduce((a, s) => a + s.n, 0), marks: sections.reduce((a, s) => a + s.marks, 0), linked, ungraded };
  }

  /** time per question against its budget (1.8 minutes per mark; P2-33), in test order: [{id, i, ms, budget, ratio}] */
  function timeVsBudget(qids, byId, times) {
    return (qids || []).map((id, i) => {
      const q = byId && byId[id], budget = ((q && q.marks) || 1) * MIN_PER_MARK * 60000, ms = Math.max(0, (times && times[id]) || 0);
      return { id, i, ms, budget, ratio: budget ? ms / budget : 0 };
    });
  }
  /** the n questions that took longest against their budget (phones show these instead of the chart) */
  const slowest = (rows, n) => (rows || []).filter(r => r.ms > 0).sort((a, b) => b.ratio - a.ratio || b.ms - a.ms).slice(0, n == null ? 5 : n);

  /* ------------------------------------------------------------------ the Tests hub's start-here hero (P1-30, P1-56, P1-61, D21) */
  /** what the hub's one coral offers, from the learner's own state. o = {season, phase, cardsSeen}: GA.stats.season, GA.stats.phaseOf(days
      left) and whether any flashcard has been reviewed (nextStep's exam-day rule).
      → {kind: 'resume' (a live test: no hero, Resume is the coral) | 'warmcards' | 'warmup' | 'mock' | 'diagnostic', id?}
      Exam day: 'Warm up · 10 cards you know' once a card has been reviewed, else the 10-question warm-up; the eve: the warm-up; the final
      fortnight and the Mocks phase: the next full mock, never the diagnostic; otherwise the diagnostic until a first test is finished, then
      the next full mock. The diagnostic never decides the next lesson (P1-56). */
  function offer(state, o) {
    o = o || {};
    const st = state || {}, lv = st.live && st.live.id ? st.live : null;
    if (lv) return { kind: 'resume', id: lv.id };
    const sea = o.season || 'normal';
    if (sea === 'day') return { kind: o.cardsSeen ? 'warmcards' : 'warmup' };
    if (sea === 'eve') return { kind: 'warmup' };
    if (sea === 'final' || o.phase === 'mocks' || o.phase === 'final') return { kind: 'mock' };
    return { kind: (Array.isArray(st.tests) ? st.tests : []).length ? 'mock' : 'diagnostic' };
  }

  /* ------------------------------------------------------------------ ICAI sittings and drills (docs/ICAI_BANK.md §7) */
  const icaiOf = D => !!(D && D.questions && D.questions.length && D.questions.every(q => q.icai));
  /** the choice rule of a paper's section ('all' for a one-section paper; P6: 'fm' / 'sm'), from the build's paper row */
  const choiceFn = p => sub => (p && p.choice ? p.choice[sub] || p.choice.all || null : null);
  /** the maximum marks of a set of ICAI items under a paper's choices: every MCQ, the compulsory questions and the n largest of each group,
      an OR pair once (GA.scoring.applyChoice with every item answered in full) */
  function icaiMax(qs, p) {
    const SC = GA.scoring || require('./scoring.js');
    const res = {};
    (qs || []).forEach(q => { res[q.id] = { score: q.marks || 0, state: 'correct', negative: 0 }; });
    return SC.applyChoice(qs, res, choiceFn(p)).max;
  }
  /** an ICAI document sat as a paper (§7): its items in ICAI's order on ICAI's clock (3 hours; one Paper 6 section 90 minutes). o.sub: 'fm' / 'sm'
      sits one section of a Paper 6 document -> {kind: 'paper', icai, title, paper, sub, qids, limitMs, max, keyed} */
  function icaiPaper(D, paperId, o) {
    o = o || {};
    const p = D.paperById[paperId];
    let qs = D.questions.filter(q => q.paper === paperId).sort((a, b) => (a.ord || 0) - (b.ord || 0));
    const subs = U.uniq(qs.map(q => q.subject));
    const one = o.sub && subs.length > 1 ? D.questions.filter(q => q.paper === paperId && q.subject === o.sub).length : 0;
    if (one) qs = qs.filter(q => q.subject === o.sub);
    const minutes = one ? Math.round(((p && p.minutes) || 180) / 2) : (p && p.minutes) || 180;
    const sj = one && D.subjectById[o.sub] ? ' · ' + D.subjectById[o.sub].name : '';
    return { kind: 'paper', icai: true, title: `${p ? p.title || p.label : paperId}${sj}`, paper: paperId, sub: one ? o.sub : null, qids: qs.map(q => q.id), limitMs: minutes * 60000,
      max: icaiMax(qs, p), keyed: qs.filter(q => q.hasKey || q.type === 'DESC').length };
  }
  /** the time an ICAI item gets in a drill: 1.8 minutes a mark (ICAI's 3 hours for 100 marks); an RTP item, which prints no marks, as a 2-mark MCQ
      or a 5-mark descriptive part */
  const icaiMs = q => ((q.marks || (q.type === 'DESC' ? 5 : 2)) * MIN_PER_MARK * 60000);
  /** a drill of ICAI items from one paper (subject) or chapter (§5): MCQs only by default (auto-marked), o.desc adds descriptive items with
      ICAI's answer (self-marked after Submit); unseen first, then missed, then the rest, shuffled inside each group. o = {subject, topic, n, seed,
      state, desc} -> {kind: 'subject' | 'topic', icai, title, qids, limitMs, subject, topic} */
  function icaiDrill(D, o) {
    o = Object.assign({ n: 10, seed: 1 }, o || {});
    const rnd = U.rng(o.seed), st = (o.state && o.state.q) || {};
    const ok = q => q.icai && !q.oos && (q.type === 'MCQ' ? q.hasKey : !!o.desc && q.hasAns) && (o.topic ? q.topic === o.topic : !o.subject || q.subject === o.subject);
    const pool = D.questions.filter(ok);
    const grp = q => { const e = st[q.id]; return !(e && (e.n || e.seen)) ? 0 : e.n && !e.lastOk ? 1 : 2; };
    const ordered = [0, 1, 2].map(k => U.shuffle(pool.filter(q => grp(q) === k), rnd)).flat().slice(0, o.n);
    // a case's MCQs stay together and in ICAI's order, so its stem reads once in the run
    const ids = ordered.sort((a, b) => (a.paper === b.paper ? (a.ord || 0) - (b.ord || 0) : 0)).map(q => q.id);
    const name = o.topic ? D.name(o.topic) : D.subjectById[o.subject] ? D.subjectById[o.subject].name : 'Group II';
    return { kind: o.topic ? 'topic' : 'subject', icai: true, title: `${name} · ${ids.length} ${o.desc ? 'ICAI items' : 'ICAI MCQs'}`, qids: ids,
      limitMs: Math.round(ordered.reduce((a, q) => a + icaiMs(q), 0)), subject: o.subject || null, topic: o.topic || null };
  }
  /** an ICAI sitting's record after Submit, and again after self-marking (§7): the engine's record, then the paper's choices applied to the
      per-item states (an excess question or the second of an OR pair is 'excess': not counted, out of the maximum), the score and maximum
      recomputed, and the number of answered descriptive items still waiting for their marks (pending) */
  function icaiRecord(D, rec, questions) {
    const SC = GA.scoring || require('./scoring.js');
    const res = {};
    questions.forEach(q => { res[q.id] = SC.mark(q, (rec.responses || {})[q.id]); });
    const p = rec.paper ? D.paperById[rec.paper] : null;
    const ch = SC.applyChoice(questions, res, choiceFn(rec.kind === 'paper' ? p : null));
    const states = {}; let score = 0, correct = 0, wrong = 0, skipped = 0, partial = 0, pending = 0, excess = 0, ungraded = 0;
    questions.forEach(q => {
      const r = res[q.id]; states[q.id] = r.state; score += r.score || 0;
      if (r.state === 'correct') correct++; else if (r.state === 'wrong') wrong++; else if (r.state === 'partial') partial++;
      else if (r.state === 'pending') pending++; else if (r.state === 'excess') excess++; else if (r.state === 'ungraded') ungraded++; else skipped++;
    });
    const max = rec.kind === 'paper' ? ch.max : questions.reduce((a, q) => a + (res[q.id].state === 'ungraded' || res[q.id].state === 'excess' ? 0 : q.marks || 0), 0);
    return Object.assign(rec, { icai: true, states, score: Math.round(score * 1000) / 1000, max, correct, wrong, skipped, partial, pending, excess, ungraded, negative: 0,
      choiceNote: ch.excess.length ? `More questions were answered than the paper allows; PassBook counted the first ones in paper order (${ch.excess.length} not counted).` : null,
      bySubject: groups(questions, states, rec.responses, rec.times, q => q.subject || '?'), bySection: groups(questions, states, rec.responses, rec.times, q => (q.sub ? q.sub + ':' : '') + q.section) });
  }

  function custom(D, ids, title) {
    const ok = ids.filter(id => D.qById[id]);
    return { kind: 'custom', title: title || `Custom test · ${ok.length} questions`, qids: ok, limitMs: limit(D, ok) };
  }

  /** per-group totals of a test from its per-question states (the result page's 'By subject', and summarise's bySubject / bySection).
      questions: the test's question records (or catalogue rows); states: {qid: state}; responses, times: the record's maps. Marks to all is
      its own count (mta), never 'correct'; max counts graded questions only (P0-04, P0-05). */
  function groups(questions, states, responses, times, key) {
    const SC = GA.scoring || require('./scoring.js');
    const o = {};
    questions.forEach(q => {
      const k = key(q), s = states[q.id];
      const e = (o[k] = o[k] || { total: 0, attempted: 0, correct: 0, wrong: 0, skipped: 0, mta: 0, notEvaluated: 0, ungraded: 0, score: 0, max: 0, lost: 0, ms: 0 });
      e.total++; e.ms += (times && times[q.id]) || 0;
      if (s !== 'ungraded' && s !== 'excess') e.max += q.marks || 0;
      if (responses && SC.answered(q, responses[q.id])) e.attempted++;
      if (q.type === 'DESC' && (s === 'correct' || s === 'partial' || s === 'wrong')) {          // an ICAI descriptive item: the marks given
        const m = SC.mark(q, responses && responses[q.id]);
        e[s === 'partial' ? 'partial' : s === 'correct' ? 'correct' : 'wrong'] = (e[s === 'partial' ? 'partial' : s === 'correct' ? 'correct' : 'wrong'] || 0) + 1;
        e.score += m.score || 0;
      } else if (s === 'excess' || s === 'pending') e[s] = (e[s] || 0) + 1;
      else if (s === 'correct') { e.correct++; e.score += q.marks || 0; }
      else if (s === 'mta') { e.mta++; e.score += q.marks || 0; }
      else if (s === 'wrong') { e.wrong++; const neg = q.type === 'MCQ' && !q.icai && !(q.group && q.group.kind === 'linked' && q.group.role === 'second') ? (q.marks || 1) / 3 : 0; e.score -= neg; e.lost += neg; }
      else if (s === 'notevaluated') e.notEvaluated++;
      else if (s === 'ungraded') e.ungraded++;
      else e.skipped++;
    });
    Object.values(o).forEach(e => { e.score = Math.round(e.score * 1000) / 1000; e.lost = Math.round(e.lost * 1000) / 1000; });
    return o;
  }

  /** Turn per-question scoring into the stored test record. questions = the records that could be loaded (the demo passes keyed ones only);
      a question of the test that is not among them is not graded. */
  function summarise(D, test, live, questions) {
    const SC = GA.scoring || require('./scoring.js');
    const res = SC.scoreAll(questions, live.responses || {});
    const states = Object.fromEntries(Object.entries(res.results).map(([k, v]) => [k, v.state]));
    return {
      id: live.id, kind: test.kind, title: test.title, paper: test.paper || null, seed: test.seed != null ? test.seed : null,
      started: live.startedAt, finished: Date.now(), limitMs: test.limitMs, usedMs: live.elapsedMs,
      pausedMs: Math.max(0, Math.round(live.pausedMs || 0)), cbt: !!live.cbt,
      qids: test.qids, responses: live.responses, times: live.times, marked: live.marked,
      score: Math.round(res.score * 1000) / 1000, max: res.max, correct: res.correct, wrong: res.wrong, skipped: res.skipped, ungraded: res.ungraded,
      mta: res.mta, mtaMarks: res.mtaMarks, notEvaluated: res.notEvaluated,
      negative: Math.round(res.negative * 1000) / 1000, attempted: res.attempted, total: res.total,
      bySubject: groups(questions, states, live.responses, live.times, q => q.subject || '?'), bySection: groups(questions, states, live.responses, live.times, q => q.section),
      states
    };
  }

  GA.testgen = { MIN_PER_MARK, WARMUP_MIN, BLUEPRINT, PATTERN_SINCE, DIAG_SUBJECTS, fromPaper, printedOrder, mock, blueprint, typeMix, likeForLike, mockTitle, warmup, subject, diagnostic, custom,
    icaiOf, icaiMax, icaiPaper, icaiDrill, icaiMs, icaiRecord, choiceFn,
    summarise, groups, allocate, limit, usableWith, mtaOf, status, counts, offer, topicPool, topicCounts, topicOutside, sizesFor, cbtDefault, commit, blueprintOf, timeVsBudget, slowest };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.testgen;
})(typeof window !== 'undefined' ? window : globalThis);
