/* PassBook — content insights. Pure, memoised functions of the catalogue D (GA.data.D) plus the small manifest `stats` block
   (diagrams / quiz questions / lab embeds per lesson, disputed question ids) that build.py writes. They power the home page, the content
   map and the subject pages. Nothing here reads the learner's state or the DOM, and nothing is invented: every number is recomputed from
   the question bank and the lessons, and every hook carries `evidence` so tests/insights.test.js can re-derive its headline.

   API (FRONTEND_SPEC.md §7):
     GA.insights.build(D, stats) -> I          GA.insights.get() -> I for GA.data.D + GAD.manifest.main.stats (after boot)
     I.totals                                  {lessons, cards, diagrams, quizzes, labs, labEmbeds, papers, questions, years:[min,max], marks, disputes, ...}
     I.subjects                                [{id, name, short, hue, area, official, lessons, minutes, cards, pyqs, marks, marksPerPaper, share,
                                                 trend:[{year, marks, papers}], topics:[{id, name, pyqs, marks, papers, lessons, ...}], topTopics, labs, firstLesson, ...}]
     I.subject(id)                             one row of I.subjects
     I.topicFrequency(limit, {subject, section}) topics ranked by distinct papers asked (+ marks, years)       I.subtopicFrequency(limit, opts) same per sub-topic
     I.yearSubject()                           {years, subjects:[ids], cells[yearIdx][subjectIdx] = average marks per paper that year, sums, papers, max}
     I.yearTopic(subject|null)                 {years, topics:[ids], cells[yearIdx][topicIdx], sums, papers, max}
     I.order(subject|null)                     lesson ids in learning order (every in-scope prerequisite before the lesson; syllabus order otherwise)
     I.graph(subject|null)                     {nodes:[{id,title,subject,topic,minutes,tier,level}], edges:[{from,to}], levels, external, cycles}
     I.paths({weak})                           [From zero, Crash course, Weak-subject rescue, Last 30 days] -> {id,title,blurb,lessons,minutes,pyqs,marks,share,href,...}
     I.path(id) / I.rescue(subject) / I.cover(fraction, {subject})
     I.pathNav(pathId, lessonId, isDone?)      {id, title, step, steps, prev, next, current, done, minutesLeft, start} or null (lesson page path bar)
     I.labCards()                              labs with subject, blurb, tags, embeddedIn:[lessonIds], embeds, pyqs, marks, papers, featured
     I.hooks(n, {subject, kinds})              [{id, kind, kicker, stat:{value,unit}, title, body, href, subject, evidence}]
     I.lessonInfo(id), I.disputes(), I.exampleLesson()

   Definitions. A subject is an ICAI paper (syllabus.txt: cma Paper 4, aud Paper 5, fm Paper 6A, sm Paper 6B) with fixed marks (100, 100, 50,
   50): paperMarks, examShare and the subject weights (marksPerPaper, perPaper, share, csShare, ranking) come from those marks, not from a
   question count. The question-bank figures (pyqs, marks, papers, trend, years, hooks, paths by marks) are computed from D.questions, which is
   empty until the ICAI bank is built: then they are 0 / [] / null and the screens hide what they would say. The section logic (CS / GA) and
   the trend windows are the GATE engine's and only matter once a bank exists. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');

  const KINDS = ['frequency', 'concentration', 'trend', 'trap', 'dispute', 'lab', 'path'];
  const WINDOW = 7;               // years in each trend window
  const RECENT = 5;               // "recent" = the last five years in the bank
  const LAST30_MIN = 30 * 60;     // Last 30 days path: an hour a day

  const r1 = x => Math.round(x * 10) / 10;
  const r2 = x => Math.round(x * 100) / 100;
  const pc = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  const hours = min => (min >= 600 ? Math.round(min / 60) : Math.round(min / 6) / 10);
  const span = (a, b) => (a === b ? String(a) : a + '–' + b);
  const and = xs => (xs.length <= 2 ? xs.join(' and ') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]);
  const pl = (n, w, ws) => U.nf(n) + ' ' + (n === 1 ? w : ws || w + 's');
  const sumOf = (o, f) => Object.values(o || {}).reduce((s, v) => s + f(v), 0);
  /* honest words for a share a/b, never overstating it: hook headings name the finding in words and leave the number to the big digit (P1-52) */
  const shareWords = (a, b) => (!b ? 'some' : a >= b ? 'all' : 4 * a > 3 * b ? 'over three quarters' : 3 * a > 2 * b ? 'over two thirds' : 2 * a > b ? 'over half'
    : 2 * a === b ? 'half' : 3 * a > b ? 'over a third' : 4 * a > b ? 'over a quarter' : 5 * a >= b ? 'at least a fifth' : 'some');
  const ofThe = w => (w === 'all' ? 'All the' : w === 'over half' ? 'Over half the' : w === 'half' ? 'Half the' : U.cap(w) + ' of the');

  const CACHE = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  /* An ICAI bank (docs/ICAI_BANK.md): the facts here are what ICAI's past EXAM papers say (how often a topic is set, its marks a paper, its
     years), so they are counted over the exam papers' items only: RTPs and MTPs are ICAI's practice material, not evidence of what the exam
     sets. The view keeps every other part of the catalogue (lessons, labs, cards); its items read as one technical section. With no exam paper
     in the bank yet every question figure is zero, as before the bank existed. Counts of all ICAI items (for practice) are read from D itself. */
  const EXAM = typeof WeakMap === 'function' ? new WeakMap() : null;
  function examView(D) {
    if (!(D && D.questions && D.questions.length && D.questions.every(q => q.icai))) return D;
    if (EXAM && EXAM.has(D)) return EXAM.get(D);
    const papers = (D.papers || []).filter(p => p.kind === 'pyq'), keep = new Set(papers.map(p => p.id));
    const questions = D.questions.filter(q => keep.has(q.paper) && !q.alt).map(q => Object.assign({}, q, { section: 'CS' }));
    const v = Object.create(D);
    Object.assign(v, { questions, papers, qById: Object.fromEntries(questions.map(q => [q.id, q])), paperById: Object.fromEntries(papers.map(p => [p.id, p])),
      years: U.uniq(papers.map(p => p.year)).sort((a, b) => b - a), icaiExam: true });
    if (EXAM) EXAM.set(D, v);
    return v;
  }
  function build(D, stats) {
    if (!D || !D.questions || !D.lessons) throw new Error('insights: catalogue D is missing');
    D = examView(D);
    const key = stats || null;
    let m = CACHE && CACHE.get(D);
    if (!m) { m = new Map(); if (CACHE) CACHE.set(D, m); }
    if (!m.has(key)) m.set(key, make(D, key));
    return m.get(key);
  }

  function make(D0, X) {
    const st = X || {};
    // partial catalogues (unit tests of other modules) may omit papers, labs, cards or nodes
    const D = Object.assign(Object.create(D0), { papers: D0.papers || [], labs: D0.labs || [], cards: D0.cards || [], nodes: D0.nodes || {}, qById: D0.qById || {} });
    const Q = D.questions;
    const P = D.papers.slice().sort((a, b) => a.year - b.year || a.set - b.set);
    const years = U.uniq(P.map(p => p.year)).sort((a, b) => a - b);
    const Y0 = years[0], Y1 = years[years.length - 1];
    const paperById = Object.fromEntries(P.map(p => [p.id, p]));
    const name = id => (D.nodes && D.nodes[id] ? D.nodes[id].name : id);
    const subjById = Object.fromEntries(D.subjects.map(s => [s.id, s]));

    /* syllabus order for every node id (tie-breaks everywhere, so results are deterministic) */
    const ORD = {};
    let k = 0;
    D.subjects.forEach(s => { ORD[s.id] = k++; s.topics.forEach(t => { ORD[t.id] = k++; t.subtopics.forEach(n => { ORD[n.id] = k++; }); }); });
    const ix = id => (id in ORD ? ORD[id] : 1e9);
    const byOrd = (a, b) => ix(a) - ix(b);

    const lessonBy = {};
    D.lessons.forEach(l => { lessonBy[l.id] = l; });
    const L = D.lessons.slice().sort((a, b) => byOrd(a.id, b.id));
    const lessonsBy = U.groupBy(L, l => l.subject);
    const lessonsByTopic = U.groupBy(L, l => l.topic);
    const cardsBy = U.countBy(D.cards, c => c.subject);
    const qBySubject = U.groupBy(Q, q => q.subject);
    const qByTopic = U.groupBy(Q.filter(q => q.topic), q => q.topic);
    const qBySub = U.groupBy(Q.filter(q => q.subtopic), q => q.subtopic);
    const marks = qs => qs.reduce((s, q) => s + (q.marks || 0), 0);

    /* a subject's section decides which papers it could appear in (General Aptitude only exists in papers with a GA section) */
    const secOf = sid => { const qs = qBySubject[sid] || []; return sid === 'ga' || (qs.length && qs.every(q => q.section === 'GA')) ? 'GA' : 'CS'; };
    const secPapers = { GA: new Set(), CS: new Set() };
    Q.forEach(q => (secPapers[q.section] || (secPapers[q.section] = new Set())).add(q.paper));
    const papersWith = sec => P.filter(p => secPapers[sec] && secPapers[sec].has(p.id));
    /* the papers a subject could appear in: on an ICAI bank the exam papers of its own ICAI paper (a document lists its subjects: P4 [cma],
       P6 [fm, sm]), never every paper of the group (a Costing topic is not 'asked in 10 of 47 papers' when 36 of them are Audit and FM/SM) */
    const ICAI = !!D.icaiExam;
    const papersOfSubject = sid => (ICAI ? P.filter(p => Array.isArray(p.subjects) ? p.subjects.includes(sid) : (qBySubject[sid] || []).some(q => q.paper === p.id)) : papersWith(secOf(sid)));

    function agg(qs) {
      const papers = new Set(), ys = new Set(), types = { MCQ: 0, MSQ: 0, NAT: 0 };
      let m = 0, m1 = 0, m2 = 0;
      for (const q of qs) { papers.add(q.paper); ys.add(q.year); types[q.type] = (types[q.type] || 0) + 1; m += q.marks || 0; if (q.marks === 1) m1++; else if (q.marks === 2) m2++; }
      const py = id => (paperById[id] || { year: 0, set: 0 });
      return { pyqs: qs.length, marks: m, papers: Array.from(papers).sort((a, b) => (py(a).year - py(b).year) || (py(a).set - py(b).set)),
               years: Array.from(ys).sort((a, b) => a - b), types, one: m1, two: m2 };
    }

    /* ------------------------------------------------------------ node records */
    const topicRec = {}, subRec = {};
    D.subjects.forEach(s => s.topics.forEach(t => {
      const a = agg(qByTopic[t.id] || []), ls = lessonsByTopic[t.id] || [];
      topicRec[t.id] = { id: t.id, name: t.name, subject: s.id, status: t.status, pyqs: a.pyqs, marks: a.marks, papers: a.papers.length, years: a.years.length,
                         paperIds: a.papers, yearList: a.years, firstYear: a.years[0] || null, lastYear: a.years[a.years.length - 1] || null,
                         types: a.types, lessons: ls.length, minutes: U.sum(ls.map(l => l.minutes || 0)) };
      t.subtopics.forEach(n => {
        const b = agg(qBySub[n.id] || []);
        subRec[n.id] = { id: n.id, name: n.name, subject: s.id, topic: t.id, tier: n.tier, status: n.status, lesson: lessonBy[n.id] ? n.id : null, pyqs: b.pyqs, marks: b.marks,
                         papers: b.papers.length, years: b.years.length, paperIds: b.papers, yearList: b.years, firstYear: b.years[0] || null, lastYear: b.years[b.years.length - 1] || null, types: b.types };
      });
    }));
    const lessonMarks = {}, lessonPyqs = {};
    L.forEach(l => { const qs = qBySub[l.id] || []; lessonMarks[l.id] = marks(qs); lessonPyqs[l.id] = qs.length; });

    /* ------------------------------------------------------------ totals */
    const embedsOf = st.embeds || null;
    const totalMarks = marks(Q), csMarks = marks(Q.filter(q => q.section === 'CS'));
    const totals = {
      lessons: D.lessons.length, cards: D.cards.length,
      diagrams: st.diagrams ? sumOf(st.diagrams, v => v) : null,
      quizzes: st.quiz ? sumOf(st.quiz, v => v) : null,
      labs: D.labs.length,
      labEmbeds: embedsOf ? sumOf(embedsOf, v => v.length) : null,
      papers: P.length, questions: Q.length, years: [Y0, Y1], marks: totalMarks,
      disputes: st.disputes ? st.disputes.length : null,
      // extras
      yearCount: years.length, subjects: D.subjects.length, topics: D.subjects.reduce((n, s) => n + s.topics.length, 0),
      subtopics: D.subjects.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subtopics.length, 0), 0),
      minutes: U.sum(D.lessons.map(l => l.minutes || 0)), hours: Math.round(U.sum(D.lessons.map(l => l.minutes || 0)) / 60),
      solved: Q.filter(q => q.hasSol).length, csMarks, gaMarks: totalMarks - csMarks,
      readyLabs: D.labs.filter(l => l.status !== 'planned').length,
      lessonsWithLabs: embedsOf ? Object.keys(embedsOf).length : D.lessons.filter(l => (l.labs || []).length).length
    };

    /* ------------------------------------------------------------ learning order, prerequisite graph */
    const memo = {};
    const once = (key, f) => (key in memo ? memo[key] : (memo[key] = f()));
    function order(subject) { return once('order:' + (subject || ''), () => orderOf(subject)).slice(); }
    /* in-pool prerequisites first, syllabus order otherwise; lessons outside the 2027 syllabus text (status legacy or extra) come last as one
       group (P2-08), unless an in-syllabus lesson needs one, in which case the prerequisite still comes first */
    function orderOf(subject) {
      const pool = subject ? lessonsBy[subject] || [] : L;
      const inPool = new Set(pool.map(l => l.id)), out = [], seen = {};
      const visit = id => {
        if (seen[id]) return;               // 1 = on the stack (a cycle is cut here), 2 = done
        seen[id] = 1;
        (lessonBy[id].needs || []).filter(n => inPool.has(n)).sort(byOrd).forEach(visit);
        seen[id] = 2; out.push(id);
      };
      const inSyl = l => !l.status || l.status === 'in';
      pool.filter(inSyl).forEach(l => visit(l.id));
      pool.filter(l => !inSyl(l)).forEach(l => visit(l.id));
      return out;
    }

    function graph(subject) {
      const pool = subject ? lessonsBy[subject] || [] : L;
      const inPool = new Set(pool.map(l => l.id));
      const edges = [], external = [], preds = {}, succ = {}, indeg = {};
      pool.forEach(l => { preds[l.id] = []; succ[l.id] = []; indeg[l.id] = 0; });
      pool.forEach(l => U.uniq(l.needs || []).forEach(n => {
        if (!lessonBy[n] || n === l.id) return;
        if (!inPool.has(n)) { external.push({ from: n, to: l.id }); return; }
        edges.push({ from: n, to: l.id }); preds[l.id].push(n); succ[n].push(l.id); indeg[l.id]++;
      }));
      // longest-path layering (Kahn); when only cycles remain, release the earliest remaining lesson in syllabus order
      const level = {}, left = new Set(inPool);
      let ready = pool.filter(l => !indeg[l.id]).map(l => l.id), cycles = 0;
      while (left.size) {
        if (!ready.length) { ready = [Array.from(left).sort(byOrd)[0]]; cycles++; }
        const id = ready.shift();
        if (!left.has(id)) continue;
        left.delete(id);
        level[id] = preds[id].reduce((m, p) => (p in level ? Math.max(m, level[p] + 1) : m), 0);
        succ[id].forEach(d => { if (--indeg[d] === 0) ready.push(d); });
      }
      const nodes = pool.map(l => ({ id: l.id, title: l.title, subject: l.subject, topic: l.topic, minutes: l.minutes, tier: l.tier, level: level[l.id] }))
        .sort((a, b) => a.level - b.level || byOrd(a.id, b.id));
      return { nodes, edges, external, levels: nodes.length ? Math.max(...nodes.map(n => n.level)) + 1 : 0, cycles };
    }

    /* transitive dependents of every lesson (lessons that need it directly or through others) */
    let depMemo = null;
    function dependents() {
      if (depMemo) return depMemo;
      const succ = {};
      L.forEach(l => (l.needs || []).forEach(n => { if (lessonBy[n] && n !== l.id) (succ[n] = succ[n] || []).push(l.id); }));
      depMemo = {};
      L.forEach(l => {
        const seen = new Set(), stack = (succ[l.id] || []).slice();
        while (stack.length) { const x = stack.pop(); if (x === l.id || seen.has(x)) continue; seen.add(x); (succ[x] || []).forEach(y => stack.push(y)); }
        depMemo[l.id] = Array.from(seen).sort(byOrd);
      });
      return depMemo;
    }

    /* ------------------------------------------------------------ greedy coverage (marks per lesson-minute, prerequisites first) */
    /* ancestors(scope)[id] = the lesson's transitive prerequisites then the lesson itself, prerequisites first (DFS post-order, cycle-safe).
       scope '' follows every prerequisite; a subject id follows only prerequisites inside that subject. */
    const ancMemo = {};
    function ancestors(scope) {
      if (ancMemo[scope]) return ancMemo[scope];
      const ok = n => lessonBy[n] && (!scope || lessonBy[n].subject === scope);
      const needs = {};
      L.forEach(l => { needs[l.id] = U.uniq((l.needs || []).filter(n => n !== l.id && ok(n))).sort(byOrd); });
      const out = {};
      L.forEach(l => {
        if (scope && l.subject !== scope) return;
        const list = [], seen = new Set();
        const visit = x => { if (seen.has(x)) return; seen.add(x); needs[x].forEach(visit); list.push(x); };
        visit(l.id);
        out[l.id] = list;
      });
      return (ancMemo[scope] = out);
    }
    /* greedy cover: repeatedly take the lesson whose (lesson + not-yet-taken prerequisites) bundle has the most weight per minute.
       Runs are resumable, so the 50 % and 80 % covers share one run (the picks do not depend on the target). */
    function runner(o) {
      const w = o.weights, anc = ancestors(o.scope || ''), chosen = new Set(), seq = [], steps = [];
      const cands = o.pool.filter(id => (w[id] || 0) > 0 && anc[id]);
      const R = { seq, steps, got: 0, minutes: 0, done: false };
      R.step = () => {
        let best = null;
        for (const id of cands) {
          if (chosen.has(id)) continue;
          let cost = 0, gain = 0;
          for (const x of anc[id]) if (!chosen.has(x)) { cost += lessonBy[x].minutes || 0; gain += w[x] || 0; }
          if (o.budget != null && R.minutes + cost > o.budget) continue;
          const r = gain / Math.max(1, cost);
          if (!best || r > best.r + 1e-12 || (Math.abs(r - best.r) <= 1e-12 && (gain > best.gain || (gain === best.gain && ix(id) < ix(best.id))))) best = { id, cost, gain, r };
        }
        if (!best) { R.done = true; return false; }
        anc[best.id].forEach(x => { if (!chosen.has(x)) { chosen.add(x); seq.push(x); } });
        R.got += best.gain; R.minutes += best.cost;
        steps.push({ n: seq.length, got: R.got, minutes: R.minutes });
        return true;
      };
      R.until = target => { while (!R.done && (target == null || R.got < target)) R.step(); return R; };
      return R;
    }
    function greedy(o) { const R = runner(o).until(o.target); return { lessons: R.seq.slice(), minutes: R.minutes, weight: R.got }; }
    const weightsOf = qs => { const w = {}; qs.forEach(q => { if (q.subtopic && lessonBy[q.subtopic]) w[q.subtopic] = (w[q.subtopic] || 0) + (q.marks || 0); }); return w; };
    function pathStats(ids) {
      const set = new Set(ids), qs = Q.filter(q => set.has(q.subtopic));
      return { minutes: U.sum(ids.map(id => lessonBy[id].minutes || 0)), pyqs: qs.length, marks: marks(qs) };
    }
    /** a greedy route (marks per minute, prerequisites first) to `fraction` of all PYQ marks, or of one subject's marks (in-subject prerequisites only) */
    function cover(fraction, opts) {
      const sid = opts && opts.subject;
      return once('cover:' + fraction + ':' + (sid || ''), () => {
        const qs = sid ? qBySubject[sid] || [] : Q;
        const total = marks(qs);
        const R = once('runner:' + (sid || ''), () => runner({ weights: weightsOf(qs), pool: (sid ? lessonsBy[sid] || [] : L).map(l => l.id), scope: sid || '' }));
        R.until(fraction * total);
        const s = R.steps.find(x => x.got >= fraction * total) || R.steps[R.steps.length - 1] || { n: 0, got: 0, minutes: 0 };
        const lessons = R.seq.slice(0, s.n);
        const assumes = sid ? U.uniq(lessons.flatMap(id => (lessonBy[id].needs || []).filter(n => lessonBy[n] && lessonBy[n].subject !== sid))).sort(byOrd) : [];
        return { lessons, minutes: s.minutes, marks: s.got, total, fraction, share: total ? s.got / total : 0, assumes };
      });
    }

    const lessonHref = (id, path) => '#/l/' + id + (path ? '?path=' + encodeURIComponent(path) : '');
    function mkPath(id, title, blurb, ids, extra) {
      const s = pathStats(ids);
      return Object.assign({ id, title, blurb, lessons: ids, minutes: s.minutes, hours: hours(s.minutes), pyqs: s.pyqs, marks: s.marks, share: totalMarks ? s.marks / totalMarks : 0,
                             href: ids.length ? lessonHref(ids[0], id) : '#/syllabus' }, extra || {});
    }
    /* a subject's fast track (path id 'rescue:<subject>', kept so saved URLs work; P1-06, P1-52): the greedy route to half of the subject's
       PYQ marks. saves = the share of the subject's reading time it skips; subject pages show the link only when saves >= 0.25 (worth). */
    function rescue(sid) {
      return once('rescue:' + sid, () => {
        const s = subjById[sid];
        if (!s) return null;
        const c = cover(0.5, { subject: sid });
        const subjectMinutes = U.sum((lessonsBy[sid] || []).map(l => l.minutes || 0));
        const p = mkPath('rescue:' + sid, 'Fast track: ' + s.name,
          `The ${s.name} lessons with the most ICAI question marks per minute first, prerequisites inside the subject included, until they cover ${pc(c.marks, c.total)}% of its marks.`,
          c.lessons, { subject: sid, subjectMarks: c.marks, subjectTotal: c.total, subjectShare: c.share, assumes: c.assumes, subjectMinutes });
        p.saves = subjectMinutes ? 1 - p.minutes / subjectMinutes : 0;
        p.worth = p.lessons.length > 0 && p.saves >= 0.25;
        return p;
      });
    }
    function pathList(opts) {
      const weak = (opts && opts.weak && subjById[opts.weak]) ? opts.weak : bigSubject();
      return [path('zero'), path('crash'), rescue(weak), path('last30')];
    }
    /** where a lesson sits in a path (for the lesson page's path bar): null when the path id is unknown or the lesson is not on it.
        isDone(id) (optional) is the learner's done-state; links keep ?path= so the next lesson stays on the path. */
    function pathNav(pid, lessonId, isDone) {
      const p = typeof pid === 'string' && pid ? path(pid) : null;
      const i = p && p.lessons ? p.lessons.indexOf(lessonId) : -1;
      if (i < 0) return null;
      const done = id => !!(isDone && isDone(id));
      const item = id => (id ? { id, title: lessonBy[id].title, minutes: lessonBy[id].minutes || 0, href: lessonHref(id, p.id), done: done(id) } : null);
      const left = p.lessons.filter(id => !done(id));
      return { id: p.id, title: p.title, step: i + 1, steps: p.lessons.length, prev: item(p.lessons[i - 1]), next: item(p.lessons[i + 1]),
               current: item(lessonId), done: p.lessons.length - left.length, minutesLeft: U.sum(left.map(id => lessonBy[id].minutes || 0)), start: p.href };
    }
    function path(id) {
      if (typeof id !== 'string') return null;
      if (/^rescue:/.test(id)) return rescue(id.slice(7));
      return once('path:' + id, () => {
        if (id === 'zero') {
          const ids = order(null);
          return mkPath('zero', 'From zero', `All ${ids.length} lessons in an order where nothing is used before it is taught.`, ids);
        }
        if (id === 'crash') {
          const c = cover(0.5);
          return mkPath('crash', 'Crash course', `A short route to half of all ${U.nf(totalMarks)} ICAI question marks: the lessons with the most marks per minute first, prerequisites included.`,
            c.lessons, { target: 0.5 });
        }
        if (id === 'cover80') {
          const c = cover(0.8);
          return mkPath('cover80', '80% of the marks', `A route to 80% of all ${U.nf(totalMarks)} ICAI question marks: the lessons with the most marks per minute first, prerequisites included.`,
            c.lessons, { target: 0.8 });
        }
        if (id === 'last30') {
          const from = years[Math.max(0, years.length - RECENT)];
          const recentQs = Q.filter(q => q.year >= from);
          const res = greedy({ weights: weightsOf(recentQs), pool: L.map(l => l.id), budget: LAST30_MIN });
          return mkPath('last30', 'Last 30 days', `An hour a day for 30 days: the lessons with the most marks per minute in the ICAI questions of ${span(from, Y1)}, prerequisites included.`,
            res.lessons, { budget: LAST30_MIN, from, to: Y1, recentMarks: res.weight, recentTotal: marks(recentQs) });
        }
        return null;
      });
    }

    /* ------------------------------------------------------------ subjects */
    /* the like-for-like marks a paper (P1-03): in each paper that has the section, the subject's share of the section's in-syllabus marks,
       averaged over those papers and scaled to the section's size today (CS 85, GA 15). The 150-mark papers of 2007–08 and questions on
       topics outside the 2027 syllabus text (q.legacy) no longer inflate it, and the CS subjects sum to 85. */
    const SECTION_MARKS = { CS: 85, GA: 15 };
    const likeForLike = (() => {
      const out = {};
      for (const sec of Object.keys(SECTION_MARKS)) {
        const ps = papersWith(sec);
        if (!ps.length) continue;
        const sums = {};
        ps.forEach(p => {
          const qs = Q.filter(q => q.paper === p.id && q.section === sec && !q.legacy), tot = marks(qs);
          if (!tot) return;
          const bySub = {};
          qs.forEach(q => (bySub[q.subject] = (bySub[q.subject] || 0) + (q.marks || 0)));
          Object.keys(bySub).forEach(sid => (sums[sid] = (sums[sid] || 0) + bySub[sid] / tot));
        });
        Object.keys(sums).forEach(sid => { if (secOf(sid) === sec) out[sid] = (sums[sid] / ps.length) * SECTION_MARKS[sec]; });
      }
      return out;
    })();
    const sinceRecent = years[Math.max(0, years.length - RECENT)];
    /* CA Inter: a subject is an ICAI paper with fixed marks (syllabus.txt `marks=`: cma 100, aud 100, fm 50, sm 50; Paper 6 = 6A + 6B). Those marks,
       not past-question counts, size and weight the subjects everywhere (bento, rankings, planner shares, labs order). */
    const groupMarks = U.sum(D.subjects.map(s => +s.marks || 0));
    const subjects = D.subjects.map(s => {
      const qs = qBySubject[s.id] || [], a = agg(qs), ls = lessonsBy[s.id] || [];
      const sec = secOf(s.id), avail = papersOfSubject(s.id);
      const recentP = avail.filter(p => p.year >= sinceRecent), recentM = marks(qs.filter(q => q.year >= sinceRecent));
      const trend = years.map(y => {
        const ps = avail.filter(p => p.year === y);
        return { year: y, marks: ps.length ? r2(marks(qs.filter(q => q.year === y)) / ps.length) : 0, papers: ps.length };
      });
      const topics = s.topics.map(t => topicRec[t.id]);
      const topTopics = topics.filter(t => t.pyqs).slice().sort((x, y) => y.papers - x.papers || y.marks - x.marks || byOrd(x.id, y.id)).slice(0, 3);
      const ord = order(s.id);
      return {
        id: s.id, name: s.name, short: s.short, hue: s.hue, area: s.area, official: s.official, section: sec,
        lessons: ls.length, minutes: U.sum(ls.map(l => l.minutes || 0)), hours: hours(U.sum(ls.map(l => l.minutes || 0))), cards: cardsBy[s.id] || 0,
        pyqs: a.pyqs, marks: a.marks, papers: avail.length, papersAsked: a.papers.length,
        paper: s.paper || '', paperMarks: +s.marks || 0, examShare: groupMarks ? (+s.marks || 0) / groupMarks : 0,
        marksPerPaper: +s.marks || (avail.length ? r2(a.marks / avail.length) : 0), recentPerPaper: recentP.length ? r2(recentM / recentP.length) : 0,
        perPaper: +s.marks || r2(likeForLike[s.id] || 0),
        /* csShare (P1-03, audit part C): the subject's like-for-like share of the CS section, perPaper over the section's 85 (unrounded; the
           CS subjects sum to 1). The subject hero prints it beside the rank, which comes from perPaper, so the two now agree; the raw share of
           every banked mark (150-mark papers and out-of-syllabus questions included) stays in `share`. */
        share: groupMarks ? (+s.marks || 0) / groupMarks : totalMarks ? a.marks / totalMarks : 0,
        csShare: groupMarks ? (+s.marks || 0) / groupMarks : sec === 'CS' && csMarks ? (likeForLike[s.id] || 0) / SECTION_MARKS.CS : null,
        trend, topics, topTopics, labs: D.labs.filter(l => l.subject === s.id).map(l => l.id),
        firstLesson: ord[0] || null, order: ord, types: a.types,
        subtopics: s.topics.reduce((n, t) => n + t.subtopics.length, 0)
      };
    });
    const subjectRow = Object.fromEntries(subjects.map(s => [s.id, s]));
    /* nextStep's ranking (P0-08 rules 4–5): CS subjects by the like-for-like marks a paper (unrounded; syllabus order breaks ties), then GA */
    const weightOf = id => (groupMarks ? +(subjectRow[id].paperMarks || 0) : likeForLike[id] || 0);     // CA: the paper's marks
    const ranking = subjects.filter(s => s.section === 'CS').slice().sort((a, b) => weightOf(b.id) - weightOf(a.id) || byOrd(a.id, b.id))
      .concat(subjects.filter(s => s.section !== 'CS')).map(s => s.id);
    function bigSubject() { return ranking.find(id => subjectRow[id].section === 'CS') || ranking[0]; }

    /* ------------------------------------------------------------ frequency, matrices */
    const scopeFilter = opts => r => (!opts || !opts.subject || r.subject === opts.subject) && (!opts || !opts.section || (secOf(r.subject) === opts.section));
    const rankFreq = (a, b) => b.papers - a.papers || b.marks - a.marks || byOrd(a.id, b.id);
    const freqRow = r => ({ id: r.id, name: r.name, subject: r.subject, topic: r.topic, papers: r.papers, totalPapers: papersOfSubject(r.subject).length,
                            years: r.yearList, yearCount: r.years, pyqs: r.pyqs, marks: r.marks, firstYear: r.firstYear, lastYear: r.lastYear });
    function topicFrequency(limit, opts) {
      const rows = Object.values(topicRec).filter(r => r.pyqs && scopeFilter(opts)(r)).sort(rankFreq).map(freqRow);
      return limit ? rows.slice(0, limit) : rows;
    }
    function subtopicFrequency(limit, opts) {
      const rows = Object.values(subRec).filter(r => r.pyqs && scopeFilter(opts)(r)).sort(rankFreq).map(freqRow);
      return limit ? rows.slice(0, limit) : rows;
    }
    function matrix(ids, keyOf) {
      const yi = Object.fromEntries(years.map((y, i) => [y, i])), ci = Object.fromEntries(ids.map((id, i) => [id, i]));
      const sums = years.map(() => ids.map(() => 0));
      Q.forEach(q => { const c = ci[keyOf(q)]; if (c != null) sums[yi[q.year]][c] += q.marks || 0; });
      const papers = years.map(y => P.filter(p => p.year === y).length);
      const cells = sums.map((row, i) => row.map(v => r2(v / papers[i])));
      return { years: years.slice(), sums, papers, cells, max: Math.max(0, ...cells.flat()) };
    }
    function yearSubject() {
      return once('ys', () => { const ids = D.subjects.map(s => s.id); const m = matrix(ids, q => q.subject); m.subjects = ids; return m; });
    }
    function yearTopic(subject) {
      return once('yt:' + (subject || ''), () => {
        const ids = [];
        D.subjects.forEach(s => { if (!subject || s.id === subject) s.topics.forEach(t => ids.push(t.id)); });
        const m = matrix(ids, q => q.topic); m.topics = ids; m.subject = subject || null; return m;
      });
    }

    /* ------------------------------------------------------------ labs */
    const embeddedIn = labId => {
      if (embedsOf) return Object.keys(embedsOf).filter(lid => embedsOf[lid].includes(labId)).sort(byOrd);
      return L.filter(l => (l.labs || []).includes(labId)).map(l => l.id);
    };
    const embedCount = labId => (embedsOf ? sumOf(embedsOf, v => v.filter(x => x === labId).length) : embeddedIn(labId).length);
    /* what a lab simulates (P1-37): the sub-topics of the lessons that embed it, within its topics, or a reviewed `subtopics` list in
       content/labs.json. Its PYQ numbers count only those sub-topics, so 'Practise these 30' opens exactly 30 (#/pyq?sub=a,b). */
    function labSubs(l) {
      if (Array.isArray(l.subtopics) && l.subtopics.length) return U.uniq(l.subtopics.filter(id => subRec[id])).sort(byOrd);
      const topics = l.topics || [];
      return embeddedIn(l.id).filter(id => lessonBy[id] && topics.includes(lessonBy[id].topic)).sort(byOrd);
    }
    function labCards() {
      return once('labs', () => {
        const rows = D.labs.map((l, i) => {
          const subs = labSubs(l), in_ = new Set(subs), a = agg(Q.filter(q => in_.has(q.subtopic)));
          const s = subjById[l.subject] || {};
          return { id: l.id, title: l.title, subject: l.subject, subjectName: s.name || l.subject, hue: s.hue, blurb: l.blurb, tags: l.keywords || [], topics: l.topics || [],
                   status: l.status || 'ready', embeddedIn: embeddedIn(l.id), embeds: embedCount(l.id), subs, pyqs: a.pyqs, marks: a.marks, papers: a.papers.length,
                   paperIds: a.papers, pyqHref: subs.length ? '#/pyq?sub=' + subs.join(',') : null, featured: false, href: '#/lab/' + l.id, _i: i };
        });
        const top = rows.slice().sort((a, b) => b.marks - a.marks || b.papers - a.papers || a._i - b._i)[0];
        if (top) top.featured = true;
        return rows.sort((a, b) => (b.featured - a.featured) || b.marks - a.marks || a._i - b._i).map(r => { delete r._i; return r; });
      });
    }

    /* ------------------------------------------------------------ lessons */
    function lessonInfo(id) {
      const l = lessonBy[id];
      if (!l) return null;
      const r = subRec[id] || {};
      return { id, title: l.title, subject: l.subject, topic: l.topic, minutes: l.minutes, tier: l.tier, pyqs: lessonPyqs[id], marks: lessonMarks[id], papers: r.papers || 0,
               years: r.yearList || [], cards: l.cards || 0, diagrams: st.diagrams ? st.diagrams[id] || 0 : null, quiz: st.quiz ? st.quiz[id] || 0 : null,
               labs: embedsOf ? U.uniq(embedsOf[id] || []) : (l.labs || []), embeds: embedsOf ? (embedsOf[id] || []).length : (l.labs || []).length,
               pyqEmbeds: (l.pyq || []).length, needs: (l.needs || []).filter(n => lessonBy[n]), dependents: dependents()[id].length };
    }
    /** a real lesson that shows every part of the format (lab embed, diagrams, quiz, PYQ embeds, flashcards): the one with the most PYQ marks */
    function exampleLesson() {
      return once('example', () => {
        const ok = L.map(l => lessonInfo(l.id)).filter(x => x.embeds && x.diagrams !== 0 && x.quiz !== 0 && x.pyqEmbeds && x.cards);
        ok.sort((a, b) => b.marks - a.marks || byOrd(a.id, b.id));
        return ok[0] || lessonInfo(L[0] && L[0].id);
      });
    }
    function disputes() {
      return (st.disputes || []).filter(id => D.qById[id]).map(id => { const q = D.qById[id]; return { id, paper: q.paper, year: q.year, subject: q.subject, topic: q.topic, href: '#/q/' + encodeURIComponent(id) }; });
    }

    /* ------------------------------------------------------------ hooks */
    function ctxOf(sid) {
      const s = sid ? subjById[sid] : null;
      const qs = sid ? qBySubject[sid] || [] : Q;
      return { sid: sid || null, s, row: sid ? subjectRow[sid] : null, Q: qs, CSQ: qs.filter(q => q.section === 'CS'),
               topics: Object.values(topicRec).filter(t => !sid || t.subject === sid).sort((a, b) => byOrd(a.id, b.id)),
               subs: Object.values(subRec).filter(t => !sid || t.subject === sid).sort((a, b) => byOrd(a.id, b.id)),
               lessons: sid ? lessonsBy[sid] || [] : L };
    }
    const papersFor = sid => (sid ? papersOfSubject(sid) : papersWith(secOf(sid)));
    const yearsFor = sid => U.uniq(papersFor(sid).map(p => p.year)).sort((a, b) => a - b);
    const topLessonOfTopic = tid => (lessonsByTopic[tid] || []).slice().sort((a, b) => lessonMarks[b.id] - lessonMarks[a.id] || byOrd(a.id, b.id))[0];
    const H = (tpl, C, kind, o) => Object.assign({ id: tpl + (C.sid ? '@' + C.sid : ''), template: tpl, kind, subject: C.sid || o.subject || null }, o, { subject: C.sid || o.subject || null });

    function runStreak(ys) {         // longest run of consecutive calendar years, every one of them in the bank
      const set = new Set(ys); let best = { run: 0, from: null, to: null };
      for (const y of ys) {
        if (set.has(y - 1)) continue;
        let e = y; while (set.has(e + 1)) e++;
        if (e - y + 1 > best.run) best = { run: e - y + 1, from: y, to: e };
      }
      return best;
    }

    const T = {};
    T['freq-years'] = C => {
      const rows = C.topics.filter(t => t.pyqs).sort((a, b) => b.years - a.years || b.papers - a.papers || b.marks - a.marks || byOrd(a.id, b.id));
      const t = rows[0];
      if (!t) return null;
      const ys = yearsFor(t.subject), all = t.years === ys.length, les = topLessonOfTopic(t.id);
      if (t.years < 0.6 * ys.length) return null;
      return H('freq-years', C, 'frequency', {
        kicker: all ? 'Asked every year' : 'Asked almost every year', stat: { value: t.years, unit: 'of ' + ys.length + ' years' },
        title: all ? `${t.name} has been asked in every year since ${ys[0]}` : `${t.name}: asked in most years since ${ys[0]}`,
        body: `${pl(t.pyqs, 'question')} worth ${U.nf(t.marks)} marks, in ${t.papers} of ${papersFor(t.subject).length} papers (${span(t.firstYear, t.lastYear)}).`,
        href: les ? lessonHref(les.id) : '#/pyq?topic=' + t.id, subject: t.subject,
        evidence: { topic: t.id, years: t.yearList, totalYears: ys.length, papers: t.paperIds, pyqs: t.pyqs, marks: t.marks }
      });
    };
    T['freq-papers'] = C => {
      const first = T['freq-years'](C);
      const rows = C.topics.filter(t => t.pyqs && (C.sid ? true : secOf(t.subject) === 'CS') && (!first || t.id !== first.evidence.topic)).sort(rankFreq);
      const t = rows[0];
      if (!t) return null;
      const tot = papersFor(t.subject).length;
      if (t.papers < 0.5 * tot) return null;
      const les = topLessonOfTopic(t.id);
      return H('freq-papers', C, 'frequency', {
        kicker: t.papers === tot ? 'In every paper' : 'In almost every paper', stat: { value: t.papers, unit: 'of ' + tot + ' papers' },
        title: t.papers === tot ? `${t.name}: asked in every paper` : 2 * t.papers > tot ? `${t.name}: asked in most papers` : `${t.name}: asked in half of the papers`,
        body: `${pl(t.pyqs, 'question')} and ${U.nf(t.marks)} marks between ${t.firstYear} and ${t.lastYear}.`,
        href: les ? lessonHref(les.id) : '#/pyq?topic=' + t.id, subject: t.subject,
        evidence: { topic: t.id, papers: t.paperIds, totalPapers: tot, pyqs: t.pyqs, marks: t.marks }
      });
    };
    /* the lesson with the most PYQ marks per minute of reading in scope (ties: more marks, then syllabus order) */
    const bestValue = C => C.lessons.filter(l => lessonMarks[l.id] > 0 && l.minutes > 0)
      .map(l => ({ l, r: lessonMarks[l.id] / l.minutes })).sort((a, b) => b.r - a.r || lessonMarks[b.l.id] - lessonMarks[a.l.id] || byOrd(a.l.id, b.l.id))[0] || null;
    T['freq-subtopic'] = C => {
      const t = C.subs.filter(x => x.pyqs && (C.sid ? true : secOf(x.subject) === 'CS')).sort(rankFreq)[0];
      if (!t || t.papers < 5) return null;
      const best = bestValue(C), les = t.lesson ? lessonBy[t.lesson] : null, same = !!(best && les && best.l.id === les.id);
      return H('freq-subtopic', C, 'frequency', {
        kicker: C.sid ? 'Most asked in ' + C.s.short : 'Most-asked sub-topic', stat: { value: t.papers, unit: 'papers' },
        title: `${t.name}: one idea, ${pl(t.pyqs, 'question')}`,
        body: `Asked since ${t.firstYear}, ${U.nf(t.marks)} marks in all. ` +
          (same ? `Its ${les.minutes}-minute lesson returns more question marks per minute than any other${C.sid ? ' ' + C.s.short : ''} lesson.` : 'Every version side by side, oldest first.'),
        href: '#/pyq?sub=' + t.id + '&sort=old', subject: t.subject,
        evidence: { subtopic: t.id, papers: t.paperIds, pyqs: t.pyqs, marks: t.marks, bestValue: same ? les.id : null }
      });
    };
    T['freq-streak'] = C => {
      const rows = C.subs.filter(x => x.pyqs).map(x => Object.assign({ x }, runStreak(x.yearList))).sort((a, b) => b.run - a.run || b.x.marks - a.x.marks || byOrd(a.x.id, b.x.id));
      const r = rows[0];
      if (!r || r.run < 5) return null;
      const n = (qBySub[r.x.id] || []).filter(q => q.year >= r.from && q.year <= r.to).length;
      return H('freq-streak', C, 'frequency', {
        kicker: 'Longest streak', stat: { value: r.run, unit: 'years in a row' },
        title: `${r.x.name}: asked every year from ${r.from} to ${r.to}`,
        body: `${pl(n, 'question')} in that run${r.to === Y1 ? ', and still going' : ''}.`,
        href: r.x.lesson ? lessonHref(r.x.lesson) : '#/pyq?sub=' + r.x.id, subject: r.x.subject,
        evidence: { subtopic: r.x.id, from: r.from, to: r.to, run: r.run, years: r.x.yearList, questions: n }
      });
    };
    /* the longest live streak: the sub-topic asked in the most consecutive GATE years up to the latest one (CS only on the global page) */
    const liveRun = x => { const ys = yearsFor(x.subject); let k = 0; for (let i = ys.length - 1; i >= 0 && x.yearList.includes(ys[i]); i--) k++; return k; };
    T['freq-recent'] = C => {
      const rows = C.subs.filter(x => x.pyqs && (C.sid || secOf(x.subject) === 'CS')).map(x => ({ x, k: liveRun(x) })).filter(o => o.k)
        .sort((a, b) => b.k - a.k || b.x.marks - a.x.marks || byOrd(a.x.id, b.x.id));
      const r = rows[0];
      if (!r || r.k < (C.sid ? 4 : 5)) return null;
      const ys = yearsFor(r.x.subject), from = ys[ys.length - r.k];
      const n = (qBySub[r.x.id] || []).filter(q => q.year >= from).length;
      const ties = rows.filter(o => o !== r && o.k === r.k), next = rows.find(o => o.k < r.k) || null;
      const tail = ties.length ? `${and(ties.map(o => o.x.name))} ${ties.length === 1 ? 'is' : 'are'} on the same run.`
        : next ? `Next-longest live run in ${C.sid ? C.s.short : 'Group II'}: ${next.x.name}, ${pl(next.k, 'year')}.` : '';
      return H('freq-recent', C, 'frequency', {
        kicker: 'Still on a streak', stat: { value: r.k, unit: 'years running' },
        title: `Asked in every year since ${from}: ${r.x.name}`,
        body: `${pl(n, 'question')} in ${span(from, Y1)}, at least one every year. ${tail}`.trim(),
        href: r.x.lesson ? lessonHref(r.x.lesson) : '#/pyq?sub=' + r.x.id, subject: r.x.subject,
        evidence: { subtopic: r.x.id, from, to: Y1, run: r.k, years: r.x.yearList, questions: n, ties: ties.map(o => o.x.id), next: next ? next.x.id : null, nextRun: next ? next.k : null }
      });
    };
    T['freq-once'] = C => {
      const one = C.subs.filter(x => x.papers === 1);
      if (one.length < (C.sid ? 2 : 3)) return null;
      const old = one.slice().sort((a, b) => a.firstYear - b.firstYear || b.marks - a.marks || byOrd(a.id, b.id))[0];
      const since = papersFor(old.subject).filter(p => p.year > old.firstYear).length;
      return H('freq-once', C, 'frequency', {
        kicker: 'Asked once, then gone', stat: { value: one.length, unit: 'sub-topics' },
        title: 'Sub-topics ICAI has asked in exactly one paper',
        body: `The oldest one-off: ${old.name}, ${old.firstYear}. Not asked again in the ${since} papers since.`,
        href: old.lesson ? lessonHref(old.lesson) : '#/pyq?sub=' + old.id,
        evidence: { subtopics: one.map(x => x.id), oldest: old.id, year: old.firstYear, papersSince: since }
      });
    };
    T['conc-subjects'] = C => {
      // an ICAI bank: the papers' weights are ICAI's fixed marks (100 / 100 / 50 / 50), not a pattern in the questions banked so far
      if (C.sid || ICAI) return null;
      const rows = subjects.filter(s => s.section === 'CS').slice().sort((a, b) => b.marks - a.marks || byOrd(a.id, b.id));
      let acc = 0; const pick = [];
      for (const s of rows) { if (acc >= csMarks / 2) break; pick.push(s); acc += s.marks; }
      if (!pick.length || pick.length > rows.length / 2) return null;
      const p = pc(acc, csMarks);
      return H('conc-subjects', C, 'concentration', {
        kicker: 'Where the marks are', stat: { value: p, unit: '%' },
        title: `${pick.length} of ${rows.length} papers carry ${2 * acc > csMarks ? 'more than half' : 'half'} of the question marks`,
        body: `${and(pick.map(s => s.name))}: ${U.nf(acc)} of ${U.nf(csMarks)} question marks in ${P.length} papers.`,
        href: '#/map?lens=syllabus',
        evidence: { subjects: pick.map(s => s.id), marks: acc, csMarks, of: rows.length }
      });
    };
    T['conc-topics'] = C => {
      const rows = C.topics.filter(t => C.sid || secOf(t.subject) === 'CS').slice().sort((a, b) => b.marks - a.marks || byOrd(a.id, b.id));
      const total = U.sum(rows.map(t => t.marks));
      let acc = 0; const pick = [];
      for (const t of rows) { if (acc >= total / 2) break; pick.push(t); acc += t.marks; }
      if (!total || pick.length > 0.4 * rows.length) return null;
      const p = pc(acc, total), who = C.sid ? C.s.short + ' chapters' : 'chapters';
      return H('conc-topics', C, 'concentration', {
        kicker: 'Concentrated marks', stat: { value: pick.length, unit: 'of ' + rows.length + ' topics' },
        title: `${ofThe(shareWords(acc, total))} ${C.sid ? C.s.short : 'question'} marks sit in ${pick.length === 1 ? 'one chapter' : 'these chapters'}`,
        body: `${pick.length > 4 ? pick.slice(0, 4).map(t => t.name).join(', ') + ' and ' + (pick.length - 4) + ' more' : and(pick.map(t => t.name))}: ${U.nf(acc)} of ${U.nf(total)} marks.`,
        href: C.sid ? '#/s/' + C.sid : '#/map?lens=syllabus',
        evidence: { topics: pick.map(t => t.id), marks: acc, total, of: rows.length }
      });
    };
    T['conc-two-mark'] = C => {
      const qs = C.Q, two = qs.filter(q => q.marks === 2), m = marks(qs), m2 = marks(two);
      if (!qs.length || m2 < 0.6 * m) return null;
      return H('conc-two-mark', C, 'concentration', {
        kicker: '1 mark or 2', stat: { value: pc(m2, m), unit: '%' },
        title: `2-mark questions: ${pc(two.length, qs.length)}% of the ${C.sid ? C.s.short + ' ' : ''}questions, most of the marks`,
        body: `${U.nf(two.length)} of ${U.nf(qs.length)} questions are worth 2 marks, and a wrong 2-mark MCQ costs 2/3 of a mark.`,
        href: '#/pyq?marks=2' + (C.sid ? '&subject=' + C.sid : ''),
        evidence: { twoMark: two.length, questions: qs.length, twoMarks: m2, marks: m }
      });
    };
    /* the topic whose questions are most often 2-markers (among topics with enough questions to mean something) */
    T['conc-two-mark-topic'] = C => {
      const min = C.sid ? 10 : 20;
      const rows = C.topics.filter(t => t.pyqs >= min).map(t => ({ t, two: (qByTopic[t.id] || []).filter(q => q.marks === 2).length }))
        .sort((a, b) => b.two / b.t.pyqs - a.two / a.t.pyqs || b.t.pyqs - a.t.pyqs || byOrd(a.t.id, b.t.id));
      const r = rows[0];
      if (!r || r.two < 0.75 * r.t.pyqs) return null;
      return H('conc-two-mark-topic', C, 'concentration', {
        kicker: 'Mostly 2-markers', stat: { value: pc(r.two, r.t.pyqs), unit: '% worth 2 marks' },
        title: `${r.t.name}: ${r.two} of ${r.t.pyqs} questions were worth 2 marks`,
        body: `No ${C.sid ? C.s.short + ' ' : ''}topic with ${min} or more questions has a higher share of 2-markers, and a wrong 2-mark MCQ costs 2/3 of a mark.`,
        href: '#/pyq?topic=' + r.t.id + '&marks=2', subject: r.t.subject,
        evidence: { topic: r.t.id, two: r.two, pyqs: r.t.pyqs, min }
      });
    };
    /* the fewest top sub-topics (by marks) that together outweigh the biggest whole subject */
    T['conc-top-subs'] = C => {
      if (C.sid) return null;
      const rows = C.subs.filter(x => x.marks).sort((a, b) => b.marks - a.marks || byOrd(a.id, b.id));
      const big = subjects.slice().sort((a, b) => b.marks - a.marks || byOrd(a.id, b.id))[0];
      let acc = 0, k = 0;
      while (k < rows.length && acc <= big.marks) acc += rows[k++].marks;
      if (acc <= big.marks || k > 20) return null;
      return H('conc-top-subs', C, 'concentration', {
        kicker: 'Heavy hitters', stat: { value: acc, unit: 'marks' },
        title: `${k} sub-topics carry more marks than any whole subject`,
        body: `The top ${k} of ${C.subs.length} sub-topics hold ${pc(acc, totalMarks)}% of all ${U.nf(totalMarks)} question marks; the biggest paper, ${big.name}, has ${U.nf(big.marks)}.`,
        href: '#/map?lens=syllabus',
        evidence: { subtopics: rows.slice(0, k).map(x => x.id), marks: acc, total: totalMarks, subject: big.id, subjectMarks: big.marks, of: C.subs.length }
      });
    };
    T['conc-ga'] = C => {
      if (C.sid) return null;
      const ps = P.filter(p => p.ga > 0), set = new Set(ps.map(p => p.id));
      if (!ps.length) return null;
      const inPs = Q.filter(q => set.has(q.paper));
      const ga = marks(inPs.filter(q => q.section === 'GA')) / ps.length;
      const per = subjects.filter(s => s.section === 'CS').map(s => ({ id: s.id, name: s.name, v: marks(inPs.filter(q => q.subject === s.id)) / ps.length })).sort((a, b) => b.v - a.v);
      if (!per.length || ga <= per[0].v) return null;
      return H('conc-ga', C, 'concentration', {
        kicker: 'General Aptitude', stat: { value: r1(ga), unit: 'marks per paper' },
        title: 'General Aptitude outweighs every CS subject',
        body: `In the ${ps.length} papers with a GA section, the biggest CS subject, ${per[0].name}, averaged ${r1(per[0].v)}.`,
        href: '#/s/ga', subject: 'ga',
        evidence: { papers: ps.map(p => p.id), gaPerPaper: ga, top: per[0].id, topPerPaper: per[0].v }
      });
    };
    const trendRows = once.bind(null, 'trendRows', () => {
      const early = years.slice(0, WINDOW), late = years.slice(-WINDOW);
      if (years.length < 2 * WINDOW) return null;
      const inW = (w, q) => q.section === 'CS' && q.year >= w[0] && q.year <= w[w.length - 1];
      const eq = Q.filter(q => inW(early, q)), lq = Q.filter(q => inW(late, q)), em = marks(eq), lm = marks(lq);
      const rows = subjects.filter(s => s.section === 'CS').map(s => {
        const a = marks(eq.filter(q => q.subject === s.id)), b = marks(lq.filter(q => q.subject === s.id));
        return { id: s.id, name: s.name, a, b, sa: em ? (100 * a) / em : 0, sb: lm ? (100 * b) / lm : 0 };
      });
      rows.forEach(r => (r.d = r.sb - r.sa));
      return { early: [early[0], early[early.length - 1]], late: [late[0], late[late.length - 1]], em, lm,
               ep: P.filter(p => p.year >= early[0] && p.year <= early[early.length - 1]).length, lp: P.filter(p => p.year >= late[0] && p.year <= late[late.length - 1]).length, rows };
    });
    const trendHook = (tpl, C, r, W) => {
      const up = r.d > 0;
      return H(tpl, C, 'trend', {
        kicker: up ? 'Rising weight' : 'Falling weight', stat: { value: r1(Math.abs(r.d)), unit: up ? 'points up' : 'points down' },
        title: `${r.name} went ${up ? 'up' : 'down'} from ${r1(r.sa)}% to ${r1(r.sb)}% of the question marks`,
        body: `Share of the question marks in ${span(W.early[0], W.early[1])} (${W.ep} papers) vs ${span(W.late[0], W.late[1])} (${W.lp} papers).`,
        href: '#/s/' + r.id, subject: r.id,
        evidence: { subject: r.id, early: W.early, late: W.late, earlyMarks: r.a, earlyTotal: W.em, lateMarks: r.b, lateTotal: W.lm }
      });
    };
    T['trend-fall'] = C => {
      const W = trendRows(); if (C.sid || !W) return null;
      const r = W.rows.slice().sort((a, b) => a.d - b.d)[0];
      return r && r.d <= -1 ? trendHook('trend-fall', C, r, W) : null;
    };
    T['trend-rise'] = C => {
      const W = trendRows(); if (C.sid || !W) return null;
      const r = W.rows.slice().sort((a, b) => b.d - a.d)[0];
      return r && r.d >= 1 ? trendHook('trend-rise', C, r, W) : null;
    };
    T['trend-subject'] = C => {
      const W = trendRows(); if (!C.sid || !W) return null;
      const r = W.rows.find(x => x.id === C.sid);
      return r && Math.abs(r.d) >= 1 ? trendHook('trend-subject', C, r, W) : null;
    };
    T['trend-comeback'] = C => {
      let best = null;
      C.subs.forEach(x => { for (let i = 1; i < x.yearList.length; i++) { const gap = x.yearList[i] - x.yearList[i - 1] - 1; if (!best || gap > best.gap || (gap === best.gap && x.yearList[i] > best.to)) best = { x, gap, from: x.yearList[i - 1], to: x.yearList[i] }; } });
      if (!best || best.gap < 6) return null;
      return H('trend-comeback', C, 'trend', {
        kicker: 'The comeback', stat: { value: best.gap, unit: 'years away' },
        title: `${best.x.name}: gone for years, then back`,
        body: `Asked in ${best.from}, absent ${span(best.from + 1, best.to - 1)}, then back in ${best.to}.`,
        href: '#/pyq?sub=' + best.x.id + '&sort=old', subject: best.x.subject,
        evidence: { subtopic: best.x.id, years: best.x.yearList, from: best.from, to: best.to, gap: best.gap }
      });
    };
    /* a sub-topic still named in the 2027 syllabus that GATE has not asked for years (longest silence, then most questions) */
    T['trend-quiet'] = C => {
      const min = C.sid ? 4 : 5;
      const rows = C.subs.filter(x => x.status === 'in' && x.pyqs >= min).map(x => ({ x, silent: yearsFor(x.subject).filter(y => y > x.lastYear).length }))
        .filter(o => o.silent >= 5).sort((a, b) => b.silent - a.silent || b.x.pyqs - a.x.pyqs || byOrd(a.x.id, b.x.id));
      const r = rows[0];
      if (!r) return null;
      const since = papersFor(r.x.subject).filter(p => p.year > r.x.lastYear).length;
      return H('trend-quiet', C, 'trend', {
        kicker: 'Gone quiet', stat: { value: r.silent, unit: 'years silent' },
        title: `Still in the syllabus, not asked since ${r.x.lastYear}`,
        body: `${r.x.name}. ${pl(r.x.pyqs, 'question')} in ${span(r.x.firstYear, r.x.lastYear)}, then none in the ${since} papers since.`,
        href: '#/pyq?sub=' + r.x.id + '&sort=old', subject: r.x.subject,
        evidence: { subtopic: r.x.id, years: r.x.yearList, last: r.x.lastYear, silent: r.silent, papersSince: since, pyqs: r.x.pyqs }
      });
    };
    /* sub-topics that appeared for the first time in the last five GATE years */
    T['trend-new'] = C => {
      const ys = C.sid ? yearsFor(C.sid) : years, from = years[Math.max(0, years.length - RECENT)];
      if (!ys.length || from <= ys[0]) return null;
      const rows = C.subs.filter(x => x.pyqs && x.firstYear >= from).sort((a, b) => b.pyqs - a.pyqs || b.marks - a.marks || byOrd(a.id, b.id));
      if (rows.length < (C.sid ? 2 : 3)) return null;
      const top = rows[0], lead = top.pyqs > rows[1].pyqs;
      return H('trend-new', C, 'trend', {
        kicker: 'New on the paper', stat: { value: rows.length, unit: 'sub-topics' },
        title: `Sub-topics ICAI asked for the first time in ${span(from, Y1)}`,
        body: `None of them came up in ${span(ys[0], from - 1)}. ` + (lead ? `Leading the newcomers with ${pl(top.pyqs, 'question')}: ${top.name}.` : `Among them: ${top.name}.`),
        href: top.lesson ? lessonHref(top.lesson) : '#/pyq?sub=' + top.id,
        evidence: { from, to: Y1, before: [ys[0], from - 1], subtopics: rows.map(x => x.id), top: top.id }
      });
    };
    const firstYearOf = type => { const ys = Q.filter(q => q.type === type).map(q => q.year); return ys.length ? Math.min(...ys) : null; };
    T['trap-no-negative'] = C => {
      const from = firstYearOf('MSQ') || firstYearOf('NAT');
      if (!from) return null;
      const qs = C.Q.filter(q => q.year >= from), m = marks(qs), nat = marks(qs.filter(q => q.type === 'NAT')), msq = marks(qs.filter(q => q.type === 'MSQ'));
      if (!m || nat + msq < 0.2 * m) return null;
      return H('trap-no-negative', C, 'trap', {
        kicker: 'Negative marking', stat: { value: pc(nat + msq, m), unit: '%' },
        title: `${ofThe(shareWords(nat + msq, m))} ${C.sid ? C.s.name + ' marks' : 'marks'} carry no negative marking`,
        body: `Since ${from}, NAT (${U.nf(nat)} marks) and MSQ (${U.nf(msq)} marks) score zero when wrong, never less. Only the ${U.nf(m - nat - msq)} MCQ marks are penalised.`,
        href: '#/pyq?type=NAT,MSQ&from=' + from + (C.sid ? '&subject=' + C.sid : ''),
        evidence: { from, marks: m, natMarks: nat, msqMarks: msq }
      });
    };
    T['trap-msq'] = C => {
      const from = firstYearOf('MSQ');
      if (C.sid || !from) return null;
      const ps = P.filter(p => p.year >= from), n = Q.filter(q => q.type === 'MSQ' && q.year >= from).length;
      return H('trap-msq', C, 'trap', {
        kicker: 'All or nothing', stat: { value: r1(n / ps.length), unit: 'MSQs per paper' },
        title: `Multiple-select questions since ${from}: no partial marks`,
        body: `${n} MSQs in ${ps.length} papers. Every correct option and no wrong one, or zero marks; no negative marking.`,
        href: '#/pyq?type=MSQ',
        evidence: { from, papers: ps.map(p => p.id), msq: n }
      });
    };
    /* global only: the subject whose marks since NAT arrived are most often numerical-answer */
    T['trap-nat-subject'] = C => {
      const from = firstYearOf('NAT');
      if (C.sid || !from) return null;
      const rows = subjects.map(s => { const qs = (qBySubject[s.id] || []).filter(q => q.year >= from), nat = qs.filter(q => q.type === 'NAT'); return { s, qs, nat, m: marks(qs), nm: marks(nat) }; })
        .filter(o => o.qs.length >= 20).sort((a, b) => b.nm / b.m - a.nm / a.m || b.m - a.m || byOrd(a.s.id, b.s.id));
      const r = rows[0];
      if (!r || r.nm < 0.5 * r.m) return null;
      const sq = Q.filter(q => q.year >= from && q.section === r.s.section), sm = marks(sq), sn = marks(sq.filter(q => q.type === 'NAT'));
      return H('trap-nat-subject', C, 'trap', {
        kicker: 'Most numerical subject', stat: { value: pc(r.nm, r.m), unit: '% numerical' },
        title: `${r.s.name}: ${2 * r.nm > r.m ? 'most' : 'half'} of its marks since ${from} were numerical-answer`,
        body: `${r.nat.length} of ${r.qs.length} questions came with no options to pick from. Across the ${r.s.section} section it was ${pc(sn, sm)}% of the marks.`,
        href: '#/pyq?subject=' + r.s.id + '&type=NAT&from=' + from, subject: r.s.id,
        evidence: { subject: r.s.id, from, nat: r.nat.map(q => q.id), all: r.qs.map(q => q.id), natMarks: r.nm, marks: r.m, section: r.s.section, sectionNat: sn, sectionMarks: sm }
      });
    };
    T['trap-nat-topic'] = C => {
      const from = firstYearOf('NAT');
      if (!from) return null;
      const skip = C.sid ? null : T['trap-nat-subject'](C);          // the global page already has that subject's NAT card
      const rows = C.topics.filter(t => !skip || t.subject !== skip.evidence.subject)
        .map(t => { const qs = (qByTopic[t.id] || []).filter(q => q.year >= from); return { t, all: qs, nat: qs.filter(q => q.type === 'NAT') }; })
        .filter(r => r.all.length >= 10).sort((a, b) => b.nat.length / b.all.length - a.nat.length / a.all.length || b.all.length - a.all.length || byOrd(a.t.id, b.t.id));
      const r = rows[0];
      if (!r || r.nat.length < 0.5 * r.all.length) return null;
      return H('trap-nat-topic', C, 'trap', {
        kicker: 'No options to lean on', stat: { value: pc(r.nat.length, r.all.length), unit: '% numerical' },
        title: `${r.t.name}: ${r.nat.length} of ${r.all.length} questions since ${from} were numerical`,
        body: 'Numerical-answer questions give you no options to eliminate or work back from. Practise computing the exact value.',
        href: '#/pyq?topic=' + r.t.id + '&type=NAT', subject: r.t.subject,
        evidence: { topic: r.t.id, from, nat: r.nat.map(q => q.id), all: r.all.map(q => q.id) }
      });
    };
    T['dispute-keys'] = C => {
      const ids = (st.disputes || []).filter(id => D.qById[id] && (!C.sid || D.qById[id].subject === C.sid));
      if (!ids.length) return null;
      return H('dispute-keys', C, 'dispute', {
        kicker: 'Answer keys, questioned', stat: { value: ids.length, unit: ids.length === 1 ? 'question' : 'questions' },
        title: 'Where the official answer key is arguable',
        body: `Each worked solution sets out both readings, and scores still follow the official key.`,
        href: ids.length === 1 ? '#/q/' + encodeURIComponent(ids[0]) : '#/pyq?disputed=1' + (C.sid ? '&subject=' + C.sid : '') + '&sort=old',
        evidence: { ids }
      });
    };
    T['dispute-mta'] = C => {
      const ids = C.Q.filter(q => q.special).map(q => q.id);
      if (!ids.length) return null;
      return H('dispute-mta', C, 'dispute', {
        kicker: 'Official key quirks', stat: { value: ids.length, unit: ids.length === 1 ? 'question' : 'questions' },
        title: 'Where ICAI gave marks to all or accepted more than one answer',
        body: 'Each one is scored exactly as the official key says: marks to all, or any of the accepted answers.',
        href: ids.length === 1 ? '#/q/' + encodeURIComponent(ids[0]) : '#/pyq?special=1' + (C.sid ? '&subject=' + C.sid : '') + '&sort=old',
        evidence: { ids }
      });
    };
    T['lab-top'] = C => {
      const l = labCards().filter(x => !C.sid || x.subject === C.sid).slice().sort((a, b) => b.marks - a.marks || b.papers - a.papers)[0];
      if (!l || !l.marks) return null;
      const tot = papersFor(l.subject).length;
      const who = l.papers === tot ? 'Every paper has' : 2 * l.papers > tot ? 'Most papers have' : 2 * l.papers === tot ? 'Half of the papers have' : 'Some papers have';
      return H('lab-top', C, 'lab', {
        kicker: 'Interactive lab', stat: { value: l.papers, unit: 'of ' + tot + ' papers' },
        title: `${who} asked what the ${l.title} simulates`,
        body: `${pl(l.pyqs, 'question')} and ${U.nf(l.marks)} marks on the ${l.subs.length === 1 ? 'sub-topic' : pl(l.subs.length, 'sub-topic')} it simulates. Run your own input and step through it.`,
        href: l.href, subject: l.subject,
        evidence: { lab: l.id, topics: l.topics, subtopics: l.subs, papers: l.paperIds, pyqs: l.pyqs, marks: l.marks, totalPapers: tot }
      });
    };
    T['lab-coverage'] = C => {
      const labs = labCards().filter(x => !C.sid || x.subject === C.sid);
      if (!labs.length) return null;
      const subs = new Set(labs.flatMap(l => l.subs)), m = marks(C.Q.filter(q => subs.has(q.subtopic))), tot = marks(C.Q);
      if (!tot || m < 0.2 * tot) return null;
      return H('lab-coverage', C, 'lab', {
        kicker: 'Learn by breaking things', stat: { value: pc(m, tot), unit: '%' },
        title: `${C.sid ? C.s.name + ' marks' : 'Question marks'} you can simulate step by step`,
        body: `${pl(labs.length, 'lab')} ${labs.length === 1 ? 'covers' : 'cover'} ${U.nf(m)} of ${U.nf(tot)} marks, with your own inputs.`,
        href: '#/labs',
        evidence: { labs: labs.map(l => l.id), subtopics: Array.from(subs).sort(byOrd), marks: m, total: tot }
      });
    };
    T['lab-embed'] = C => {
      if (C.sid) return null;
      const l = labCards().slice().sort((a, b) => b.embeddedIn.length - a.embeddedIn.length || b.embeds - a.embeds)[0];
      if (!l || l.embeddedIn.length < 3) return null;
      return H('lab-embed', C, 'lab', {
        kicker: 'Built into the lessons', stat: { value: l.embeddedIn.length, unit: 'lessons' },
        title: `The ${l.title} sits inside the lessons that teach it`,
        body: `Embedded ${pl(l.embeds, 'time')}, so you meet it right where each idea is taught.`,
        href: l.href, subject: l.subject,
        evidence: { lab: l.id, lessons: l.embeddedIn, embeds: l.embeds }
      });
    };
    /* the fast track to half the marks (P1-52): titled from the real share it reaches; suppressed when it needs more than 60% of the reading
       time, because then it is no shortcut */
    T['path-half'] = C => {
      const c = C.sid ? cover(0.5, { subject: C.sid }) : cover(0.5);
      if (!c.total || c.marks < c.total / 2) return null;
      const scopeMin = U.sum(C.lessons.map(l => l.minutes || 0));
      if (!scopeMin || c.minutes > 0.6 * scopeMin) return null;
      const h = hours(c.minutes);
      return H('path-half', C, 'path', {
        kicker: 'Fast track', stat: { value: h, unit: 'hours' },
        title: `${pc(c.marks, c.total)}% of ${C.sid ? C.s.name : 'all question'} marks in ${h} hours of lessons`,
        body: `${pl(c.lessons.length, 'lesson')} of ${C.lessons.length}, ranked by marks per minute, prerequisites ${C.sid ? 'within the subject ' : ''}included.`,
        href: c.lessons.length ? lessonHref(c.lessons[0], C.sid ? 'rescue:' + C.sid : 'crash') : '#/syllabus',
        evidence: { lessons: c.lessons, minutes: c.minutes, marks: c.marks, total: c.total, scopeMinutes: scopeMin }
      });
    };
    T['path-80'] = C => {
      if (C.sid) return null;
      const c = cover(0.8);
      if (!c.total || c.marks < 0.8 * c.total) return null;
      const h = hours(c.minutes);
      return H('path-80', C, 'path', {
        kicker: 'The 80% plan', stat: { value: h, unit: 'hours' },
        title: `${pc(c.marks, c.total)}% of all question marks in ${h} hours of lessons`,
        body: `${pl(c.lessons.length, 'lesson')} of ${totals.lessons}, ranked by marks per minute, prerequisites included.`,
        href: c.lessons.length ? lessonHref(c.lessons[0], 'cover80') : '#/syllabus',
        evidence: { lessons: c.lessons, minutes: c.minutes, marks: c.marks, total: c.total }
      });
    };
    T['path-gateway'] = C => {
      const dep = dependents();
      const l = C.lessons.slice().sort((a, b) => dep[b.id].length - dep[a.id].length || byOrd(a.id, b.id))[0];
      if (!l || dep[l.id].length < 5) return null;
      return H('path-gateway', C, 'path', {
        kicker: 'Start here', stat: { value: dep[l.id].length, unit: 'lessons depend on it' },
        title: `Read this one early: ${l.title}`,
        body: `Each of them needs it, directly or through other lessons; no other${C.sid ? ' ' + C.s.short : ''} lesson has more depending on it. Read it early.`,
        href: lessonHref(l.id), subject: l.subject,
        evidence: { lesson: l.id, dependents: dep[l.id] }
      });
    };
    T['path-value'] = C => {
      const b = bestValue(C);
      if (!b || lessonPyqs[b.l.id] < 3) return null;
      const f = T['freq-subtopic'](C);
      if (f && f.evidence.bestValue === b.l.id) return null;           // that card already makes this point
      const m = lessonMarks[b.l.id], r = subRec[b.l.id] || {};
      return H('path-value', C, 'path', {
        kicker: 'Best marks per minute', stat: { value: m, unit: 'marks in ' + b.l.minutes + ' min' },
        title: `${b.l.title}: the most question marks per minute of reading`,
        body: `${pl(lessonPyqs[b.l.id], 'question')} in ${pl(r.papers || 0, 'paper')}. No other${C.sid ? ' ' + C.s.short : ''} lesson returns more.`,
        href: lessonHref(b.l.id), subject: b.l.subject,
        evidence: { lesson: b.l.id, marks: m, minutes: b.l.minutes, pyqs: lessonPyqs[b.l.id], papers: r.paperIds || [] }
      });
    };
    T['path-zero-pyq'] = C => {
      if (!Q.length) return null;                                     // no ICAI bank yet: "no question in 0 papers" would say nothing
      const ls = C.lessons.filter(l => !lessonPyqs[l.id]);
      if (ls.length < (C.sid ? 1 : 3)) return null;
      const min = U.sum(ls.map(l => l.minutes || 0)), inSyl = ls.filter(l => l.status === 'in').length;
      const tot = C.sid ? papersFor(C.sid).length : P.length;
      return H('path-zero-pyq', C, 'path', {
        kicker: 'Short on time?', stat: { value: ls.length, unit: ls.length === 1 ? 'lesson' : 'lessons' },
        title: `Lessons with no ICAI question in ${tot} papers`,
        body: `${hours(min)} hours of reading to postpone in a crash course. ` + (inSyl ? `${inSyl} of them ${inSyl === 1 ? 'is' : 'are'} in the syllabus, so postpone, don't drop.` : 'None of them is named in the syllabus.'),
        href: C.sid ? '#/s/' + C.sid : '#/syllabus',
        evidence: { lessons: ls.map(l => l.id), minutes: min, inSyllabus: inSyl }
      });
    };

    /* the first six are six different kinds (the home grid opens with them); the first eight fill the grid before "Show more" */
    /* CA Inter: the GATE-marking templates (trap-no-negative, trap-msq, trap-nat-*, conc-two-mark*, conc-ga, dispute-mta) describe MCQ/MSQ/NAT
       papers with negative marking and a GA section; ICAI papers have none of that, so they are kept out of the orders (the templates stay for
       the ICAI bank's designer to adapt or delete). Every other hook needs real ICAI questions and returns null until the bank has them. */
    const ORDER_ALL = ['freq-years', 'conc-subjects', 'trend-fall', 'lab-top', 'dispute-keys', 'path-half', 'conc-top-subs',
      'freq-subtopic', 'trend-quiet', 'trend-rise', 'path-value', 'freq-recent', 'freq-streak', 'path-gateway',
      'trend-new', 'lab-coverage', 'freq-papers', 'path-80', 'trend-comeback', 'freq-once',
      'conc-topics', 'path-zero-pyq', 'lab-embed'];
    const ORDER_SUBJECT = ['freq-years', 'conc-topics', 'trend-subject', 'lab-top', 'path-half', 'freq-subtopic', 'path-value', 'trend-quiet',
      'dispute-keys', 'freq-streak', 'freq-papers', 'path-gateway', 'freq-recent', 'trend-new',
      'lab-coverage', 'trend-comeback', 'freq-once', 'path-zero-pyq'];
    function allHooks(sid) {
      return once('hooks:' + (sid || ''), () => {
        const C = ctxOf(sid);
        return (sid ? ORDER_SUBJECT : ORDER_ALL).map(t => T[t](C)).filter(Boolean);
      });
    }
    function hooks(n, opts) {
      const o = opts || {};
      if (o.subject && !subjById[o.subject]) return [];
      let hs = allHooks(o.subject || null);
      if (o.kinds) hs = hs.filter(h => o.kinds.includes(h.kind));
      if (o.exclude) hs = hs.filter(h => !o.exclude.includes(h.id) && !o.exclude.includes(h.template));
      return n ? hs.slice(0, n) : hs.slice();
    }

    return {
      totals, subjects, subject: id => subjectRow[id] || null, ranking,
      topicFrequency, subtopicFrequency, yearSubject, yearTopic, order, graph,
      paths: pathList, path, pathNav, rescue, cover, labCards, hooks, templates: Object.keys(T), kinds: KINDS,
      lessonInfo, disputes, exampleLesson, dependents: id => (dependents()[id] || []).slice(),
      topic: id => topicRec[id] || null, subtopic: id => subRec[id] || null
    };
  }

  const Insights = {
    KINDS, build, examView,
    /** the insights of the live catalogue (after GA.data.init()) */
    get() {
      const D = GA.data && GA.data.D;
      if (!D) return null;
      const M = g.GAD && g.GAD.manifest && g.GAD.manifest.main;
      return build(D, (M && M.stats) || null);
    }
  };
  GA.insights = Insights;
  if (typeof module !== 'undefined' && module.exports) module.exports = Insights;
})(typeof window !== 'undefined' ? window : globalThis);
