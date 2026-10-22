/* PassBook — content catalogue and lazy loaders. The manifest (small) is loaded up front; lesson text, question text,
   solutions and flashcards load on demand as <script> files, so everything works from file://.

   Loaders (docs/ARCHITECTURE.md §10.11, P1-59): lesson(id), paper(id), question(qid), questions(qids), solution(qid), cardsOf(subject),
   solutionsOf(subject), searchPostings() and lessonsOf(subject) reject with an Error carrying `file` when a file fails to load or does not
   register what it should. They resolve null only for an unknown id or a question without a solution. Callers that want a quiet fallback
   keep their own .catch; views show GA.ui.loadFailed. U.loadScript forgets a failed source, so a retry really re-requests it.
   Lesson text (P1-60): with manifest.lessonFiles === 'split' each lesson is its own file, data/lessons/<subject>/<id>.js
   (GAD.reg('lesson', id, record)); otherwise the subject's file. Card files stay per subject. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || require('./util.js');

  const TYPES = ['MCQ', 'MSQ', 'NAT'];
  const DIFFS = ['easy', 'medium', 'hard'];
  /* question flag bits (build.py); MTA, CHECKED and DISPUTE are new in the audit build (P0-04, P2-77): read them when present */
  const FLAG = { FIG: 1, SOL: 2, KEY: 4, SPECIAL: 8, REVIEW: 16, GROUP: 32, LEGACY: 64, MTA: 128, CHECKED: 256, DISPUTE: 512 };

  /** Build the in-memory catalogue D from the manifest object. Pure — also used by tests. */
  function buildCatalogue(M) {
    const D = { built: M.built, subjects: M.syllabus.subjects, syllabusSource: M.syllabus, nodes: {}, subjectById: {}, topicMarks: M.topicMarks || {}, labs: M.labs || [] };
    D.subjects.forEach(s => {
      D.subjectById[s.id] = s;
      D.nodes[s.id] = Object.assign(s, { kind: 'subject' });
      s.topics.forEach(t => {
        t.subject = s.id; t.kind = 'topic'; D.nodes[t.id] = t;
        t.subtopics.forEach(n => { n.kind = 'sub'; D.nodes[n.id] = n; });
      });
    });
    D.lessons = M.lessons;
    D.lessonById = Object.fromEntries(D.lessons.map(l => [l.id, l]));
    D.cards = M.cards.map(([id, lesson]) => { const l = D.lessonById[lesson]; return { id, lesson, subject: l.subject, topic: l.topic }; });
    D.papers = M.papers;
    D.paperById = Object.fromEntries(D.papers.map(p => [p.id, p]));
    const c = M.pyq.cols;
    D.questions = M.pyq.rows.map(r => {
      const o = {}; c.forEach((k, i) => (o[k] = r[i]));
      const p = D.papers[o.paper], f = o.flags || 0;
      return { id: o.id, paper: p.id, year: p.year, set: p.set, section: o.sec === 0 ? 'GA' : 'CS', no: o.no, marks: o.marks, type: TYPES[o.type],
               subject: o.subject || '?', topic: o.topic, subtopic: o.subtopic, diff: o.diff >= 0 ? DIFFS[o.diff] : null, flags: o.flags,
               hasFig: !!(f & FLAG.FIG), hasSol: !!(f & FLAG.SOL), hasKey: !!(f & FLAG.KEY), special: !!(f & FLAG.SPECIAL), review: !!(f & FLAG.REVIEW),
               grouped: !!(f & FLAG.GROUP), legacy: !!(f & FLAG.LEGACY), mta: !!(f & FLAG.MTA), checked: !!(f & FLAG.CHECKED), disputed: !!(f & FLAG.DISPUTE) };
    });
    D.qById = Object.fromEntries(D.questions.map(q => [q.id, q]));
    D.years = U.uniq(D.papers.map(p => p.year)).sort((a, b) => b - a);
    D.nodeSubject = id => { const n = D.nodes[id]; return n ? (n.kind === 'subject' ? n.id : n.subject) : null; };
    D.name = id => (D.nodes[id] ? D.nodes[id].name : id);
    // build fields of the audit build (WP13; each is optional until it ships): the exam calendar, the search aliases, the official results,
    // content hashes for versioned URLs, the per-lesson split and card-id aliases (§10.5, §10.11)
    D.exam = M.exam && typeof M.exam === 'object' ? M.exam : undefined;
    D.search = M.search && typeof M.search === 'object' ? M.search : null;
    D.results = Array.isArray(M.results) ? M.results : [];
    D.files = M.files && typeof M.files === 'object' ? M.files : null;
    D.ver = M.ver || null;
    D.lessonFiles = M.lessonFiles || null;
    D.cardAliases = M.cardAliases && typeof M.cardAliases === 'object' ? M.cardAliases : null;
    D.sections = M.sections && typeof M.sections === 'object' ? M.sections : null;    // content/sections.json (lesson section names and depths)
    return D;
  }

  const onFile = () => !!(g.location && g.location.protocol === 'file:');
  /** an Error that says which file failed (callers and GA.ui.loadFailed read err.file) */
  function loadError(file, message) { const e = new Error(message || 'Could not load ' + file); e.file = file; e.loadFailed = true; return e; }
  const known = (map, id) => !!(Data.D && map && Object.prototype.hasOwnProperty.call(map, id));

  const Data = {
    TYPES, DIFFS, FLAG, buildCatalogue, loadError, D: null,
    init() {
      const M = g.GAD && g.GAD.manifest && g.GAD.manifest.main;
      if (!M) throw loadError('data/manifest.js', onFile() ? 'data/manifest.js is missing — run `python3 build.py`.' : 'data/manifest.js did not load.');
      Data.D = buildCatalogue(M);
      return Data.D;
    },
    _load(ns, key, file) {
      const have = () => g.GAD && g.GAD[ns] && g.GAD[ns][key];
      if (have()) return Promise.resolve(g.GAD[ns][key]);
      return Promise.resolve().then(() => U.loadScript(file)).then(
        () => { if (!have()) throw loadError(file, `${file} did not register ${ns}.${key}`); return g.GAD[ns][key]; },
        e => { throw loadError(file, (e && e.message) || 'Failed to load ' + file); });
    },
    /** one subject's lesson file (kept while it exists for old callers; lesson(id) is the loader to use) */
    lessonsOf(subject) { return known(Data.D.subjectById, subject) ? Data._load('lessons', subject, `data/lessons/${subject}.js`) : Promise.resolve(null); },
    async lesson(id) {
      const l = Data.D.lessonById[id];
      if (!l) return null;
      if (Data.D.lessonFiles === 'split') return Data._load('lesson', id, `data/lessons/${l.subject}/${id}.js`);
      const file = `data/lessons/${l.subject}.js`, all = await Data._load('lessons', l.subject, file);
      if (!all[id]) throw loadError(file, `${file} has no lesson ${id}`);
      return all[id];
    },
    cardsOf(subject) { return known(Data.D.subjectById, subject) ? Data._load('cards', subject, `data/cards/${subject}.js`) : Promise.resolve(null); },
    solutionsOf(subject) { return known(Data.D.subjectById, subject) ? Data._load('sol', subject, `data/sol/${subject}.js`) : Promise.resolve(null); },
    /** all questions of a paper with their full text; each record gets the catalogue fields merged in */
    async paper(id) {
      if (!known(Data.D.paperById, id)) return null;
      const raw = await Data._load('pyq', id, `data/pyq/${id}.js`);
      return raw.map(r => Object.assign({}, Data.D.qById[r.id] || {}, r));
    },
    async question(qid) {
      const meta = Data.D.qById[qid];
      if (!meta) return null;
      const list = await Data.paper(meta.paper);
      return (list && list.find(q => q.id === qid)) || null;
    },
    async questions(qids) {
      const by = U.groupBy(qids.filter(id => Data.D.qById[id]), id => Data.D.qById[id].paper);
      const res = {};
      await Promise.all(Object.keys(by).map(async p => { ((await Data.paper(p)) || []).forEach(q => (res[q.id] = q)); }));
      return qids.map(id => res[id]).filter(Boolean);
    },
    async solution(qid) {
      const q = Data.D.qById[qid];
      if (!q || !q.hasSol || !known(Data.D.subjectById, q.subject)) return null;
      const s = await Data.solutionsOf(q.subject);
      return (s && s[qid]) || null;
    },
    /** a figure's URL; versioned (?v=<sha8>) when the build ships content hashes (P1-58), harmless on file:// */
    figUrl(f) {
      const p = `data/figs/${f}`, v = Data.D && Data.D.files && Data.D.files[p];
      return v ? p + '?v=' + v : p;
    },
    searchPostings() { return Data._load('search', 'pyq', 'data/search-pyq.js'); }
  };
  GA.data = Data;
  if (typeof module !== 'undefined' && module.exports) module.exports = Data;
})(typeof window !== 'undefined' ? window : globalThis);
