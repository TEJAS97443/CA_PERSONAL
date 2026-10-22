/* PassBook — GA.pyqLib: the pure question-bank helpers shared by the bank (views/pyq.js), the command palette (core/search.js), lesson PYQ rows and the
   notebook (owner: WP9b; audit P0-14, P1-21, P1-22, P1-23, P1-24, P1-26, P1-37, P1-40, D9, D15). Contract: docs/ARCHITECTURE.md §10.10.

   Moved from views/pyq.js with every name (FKEYS, TYPES, KEYF, parse, types, chipLabels, filter, disputedIds, texPlain, plain, snippet); views/pyq.js
   uses this same object and never reassigns it. Added:
     parseQuery(text, {alias, stop})  one parser for the bank and the palette: year, set and section + number in any order ('q37 2019', '2019 set 3 cs 37'),
                                      exact ids, function words in `ignored`; `terms` are the learner's words, normalised like the palette's index
                                      (LR(1) -> lr1, banker's -> banker), with their alias expansions in `alts` (kmap -> ['karnaugh'])
     filter(...) with f.q             the bank's text search on parseQuery: postings + topic and sub-topic names, subject codes (os, dbms), aliases, word
                                      starts only for words of 3 letters or fewer, one-letter typos forgiven in words of 5+ letters, a word that matches
                                      nothing is reported as ignored, and 'Partial matches' when no question has every word. Results carry .meta.
     sorts                            CS before GA inside a paper in every bank list (D15); 'old' is year and set ascending in the same in-paper order
                                      (P1-24); 'best' ranks by relevance while searching (the default sort then)
     topic / sub                      accept comma lists (#/pyq?sub=a,b; P1-37)
     seen                             a checked question without an official key counts as seen (q[id].seen, D9): status filters and 'unseen' read it
     practiseSet, setName, bankKey    'Practise 10' (P1-22): the next finite set of a filter, keyed first (unseen, then missed); a list of only
                                      marks-to-all questions practises them unscored ({mta: true}), so that screen keeps its one coral (D18)
     testable(list)                   'Make a test' needs 3 questions with an official key (P0-05): {keyed, mta, ok, why}; why names marks to all
                                      when that is the reason (never 'no official key' for questions that have one)
     pageKey(k, s)                    the question page's key decision (P0-13): 'check' | 'next' | 'prev' | 'A'…'D' | null
     numbering, printed, paperGroups  printed numbering (P1-21): derived from q.section + q.no, never from paper.numbering (cs-2015-3 is mislabelled)
     trapLine(solution, picks)        the Trap sentence(s) that cite the picked option(s), at most 160 characters (P1-40, D17)
   Part B (P2/P3):
     key=official|disputed|mta|nokey  the one Answer key filter (P3-20); parse() reads the older disputed=1 and status=nokey as it (special=1 stays)
     status 'learned', sort 'mixed'   the mixed review of finished lessons (P2-64; the planner links #/pyq?status=learned&sort=mixed): learnedSubs,
                                      mixedOrder (one question per sub-topic in turn, day-seeded)
     rowParts(D, m, f), shortPaper    a calm row's compact parts without what the filter makes constant (P2-25, P3-41)
     topicRow(D, f, S, post)          the topic row under a selected subject: real counts and attempted counts (P2-27)
     texPlain / plain / snippet       readable previews (P2-25): Unicode scripts, bracketed fractions, overlines, blanks, first code line, table header
     planNext, nbAfter, nbLine        the end of a notebook retry set (P2-68): the plan's next open task as the coral, else the shared next step,
                                      and what the set did ('1 resolved · 4 back for a retry from tomorrow') from GA.stats.retryDay
   Classic script, UMD: index.html loads it at boot (after util.js, above core/search.js, its first consumer); require() in Node returns this object. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('./util.js') : null);
  const Lib = {};

  /* ================================================================== URL filter state */
  const TYPES = ['MCQ', 'MSQ', 'NAT', 'DESC'];          // DESC: an ICAI descriptive item (docs/ICAI_BANK.md)
  /* the 'My status' select (P3-20: no option that matches everything; the key states moved to the Answer key select). 'learned' = questions on the
     sub-topics of lessons the learner has finished: the mixed review of P2-64 (the planner links #/pyq?status=learned&sort=mixed) */
  const STATUS = [['', 'Any status'], ['new', 'Not attempted'], ['attempted', 'Attempted'], ['correct', 'Right or got it last time'], ['wrong', 'Missed or partly last time'], ['bookmarked', 'Bookmarked'], ['noted', 'Has my note'], ['learned', 'From lessons I finished']];
  /** the ICAI bank's own status words (docs/ICAI_BANK.md §5): status=missed / got read as the engine's wrong / correct */
  const STATUS_ALIAS = { missed: 'wrong', got: 'correct', partly: 'wrong' };
  /* the ICAI bank's document filters (docs/ICAI_BANK.md §5): kind, attempt, scheme; oos=hide leaves out items marked out of syllabus */
  const KINDS = [['', 'All kinds'], ['pyq', 'Past exam papers'], ['rtp', 'RTPs'], ['mtp', 'MTPs']];
  const KIND_CHIP = { pyq: 'Past exam papers', rtp: 'RTPs', mtp: 'MTPs' };
  const MON = { jan: 'Jan', may: 'May', jun: 'Jun', jul: 'Jul', sep: 'Sep', nov: 'Nov', dec: 'Dec' };
  /** 'sep2026' -> 'Sep 2026' */
  const attemptName = a => { const m = /^([a-z]{3})(\d{4})$/.exec(String(a || '')); return m ? `${MON[m[1]] || m[1]} ${m[2]}` : String(a || ''); };
  /** an attempt's order key: 'sep2026' -> 202609 */
  const attemptOrd = a => { const m = /^([a-z]{3})(\d{4})$/.exec(String(a || '')); const mm = { jan: 1, may: 5, jun: 6, jul: 7, sep: 9, nov: 11, dec: 12 }; return m ? +m[2] * 100 + (mm[m[1]] || 0) : 0; };
  /** can an item be practised for a score: a keyed MCQ, or an ICAI descriptive item whose answer ICAI has published (self-graded) */
  const scorable = q => !!q && (q.type === 'DESC' ? !!q.hasAns : !!q.hasKey && !q.mta);
  /** status values older links still carry (P3-20: old URL keys keep working): their chip labels */
  const STATUS_OLD = { sol: 'Has a worked solution' };
  /* the one Answer key select (P3-20): any · scored by the official key · disputed · marks to all · no official key (2007–2010) */
  const KEYF = [['', 'Any'], ['official', 'Official key'], ['disputed', 'Disputed key'], ['mta', 'Marks to all'], ['nokey', 'No official key']];
  const KEY_CHIP = { official: 'Official key', disputed: 'Disputed answer key', mta: 'Key: marks to all', nokey: 'No official key' };
  const FKEYS = ['q', 'subject', 'topic', 'sub', 'year', 'from', 'to', 'paper', 'type', 'marks', 'sec', 'diff', 'status', 'key', 'syl', 'disputed', 'special', 'kind', 'attempt', 'scheme', 'oos', 'sort', 'page'];
  const SORTS = [['best', 'Best match'], ['new', 'Newest first'], ['old', 'Oldest first'], ['syllabus', 'Syllabus order'], ['marks', 'Two-mark first'], ['diff', 'Hardest first'], ['unseen', 'Not attempted first'], ['weak', 'Missed first'], ['mixed', 'Mixed topics'], ['rand', 'Shuffled']];
  /** the sort a filter state gets when the URL names none: 'best' while searching, else 'new' */
  const defaultSort = f => (f && String(f.q || '').trim() ? 'best' : 'new');
  /** the filter state of a query. Older links keep working (P3-20): disputed=1 reads as key=disputed and status=nokey as key=nokey (special=1, marks to
      all or several answers accepted, stays its own filter: the 'Official key quirks' finding links it) */
  const parse = query => {
    const f = {}; FKEYS.forEach(k => (f[k] = (query && query[k]) || ''));
    if (f.disputed && !f.key) f.key = 'disputed';
    if (f.status === 'nokey') { if (!f.key) f.key = 'nokey'; f.status = ''; }
    if (f.key && !KEYF.some(k => k[0] === f.key)) f.key = '';
    if (STATUS_ALIAS[f.status]) f.status = STATUS_ALIAS[f.status];
    if (f.kind && !KIND_CHIP[f.kind]) f.kind = '';
    if (f.scheme && f.scheme !== 'new' && f.scheme !== 'old') f.scheme = '';
    f.disputed = '';
    f.sort = f.sort || defaultSort(f); f.page = +f.page || 1;
    return f;
  };
  /** the answer types a `type` filter asks for, in canonical order ('NAT,MSQ' -> ['MSQ','NAT']); unknown names are ignored */
  const types = v => { const set = new Set(String(v || '').toUpperCase().split(/[\s,+]+/).filter(Boolean)); return TYPES.filter(t => set.has(t)); };
  /** a comma list filter value ('os.mem.paging,os.mem.tlb') as ids, in order, without blanks or repeats (P1-37) */
  const listOf = v => { const out = []; String(v || '').split(',').map(s => s.trim()).filter(Boolean).forEach(s => { if (!out.includes(s)) out.push(s); }); return out; };
  /** disputed question ids: the manifest stats block (the same list GA.insights counts) */
  const disputedIds = () => { const M = g.GAD && g.GAD.manifest && g.GAD.manifest.main; return (M && M.stats && M.stats.disputes) || []; };
  /** seen (D9, P1-23): answered, or checked without an official key (q[id].seen). Accuracy and the due lists never read it. */
  const seenOf = e => !!(e && ((e.n || 0) > 0 || e.seen));
  /** the sub-topics of the lessons this learner has finished (the 'learned' status, P2-64; the same reading as the planner's mixed-review row) */
  function learnedSubs(state, D) {
    const r = new Set(), L = (state && state.lessons) || {};
    Object.keys(L).forEach(id => { const l = D && D.lessonById && D.lessonById[id]; if (l && L[id] && L[id].done) r.add(l.subtopic || l.id); });
    return r;
  }

  /** labels of the active filters, in display order: [[key, label]] (the view turns each into a removable chip) */
  function chipLabels(D, f) {
    const out = [], add = (k, l) => out.push([k, l]);
    const names = v => { const ids = listOf(v), n = ids.map(id => D.name(id)); return n.length > 3 ? `${n.slice(0, 2).join(' + ')} + ${n.length - 2} more` : n.join(' + '); };
    if (f.q) add('q', `“${f.q}”`);
    if (f.subject) add('subject', D.subjectById[f.subject] ? D.subjectById[f.subject].name : f.subject === '?' ? 'Unclassified' : f.subject);
    if (f.topic) add('topic', names(f.topic)); if (f.sub) add('sub', names(f.sub));
    if (f.year) add('year', 'Year ' + f.year); if (f.from) add('from', 'From ' + f.from); if (f.to) add('to', 'To ' + f.to);
    if (f.paper) add('paper', D.paperById[f.paper] ? D.paperById[f.paper].label : f.paper);
    if (f.type) { const ts = types(f.type); add('type', ts.length ? ts.map(t => (t === 'DESC' ? 'Descriptive' : t)).join(' + ') : f.type); }
    if (f.marks) add('marks', U.plural(+f.marks || 0, 'mark')); if (f.sec) add('sec', 'Section ' + f.sec); if (f.diff) add('diff', U.cap(f.diff) + ' (our estimate)');
    if (f.status) { const s = STATUS.find(x => x[0] === f.status); add('status', s ? s[1] : STATUS_OLD[f.status] || f.status); }
    if (f.key) add('key', KEY_CHIP[f.key] || f.key);
    if (f.syl) add('syl', 'In the current syllabus');
    if (f.disputed) add('disputed', 'Disputed answer key');
    if (f.special) add('special', 'Key: marks to all or several answers');
    if (f.kind) add('kind', KIND_CHIP[f.kind] || f.kind);
    if (f.attempt) add('attempt', attemptName(f.attempt));
    if (f.scheme) add('scheme', f.scheme === 'old' ? 'Old scheme (2019–2023)' : 'New scheme');
    if (f.oos) add('oos', 'In the current syllabus');
    return out;
  }

  /* ================================================================== one normalisation for the index and the query (same rules as core/search.js) */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/ε/g, ' epsilon ').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’‘`´]/g, "'").replace(/([a-z0-9])'s\b/g, '$1').replace(/'/g, '')
      .replace(/([a-z]+)\s*\((\d+)\)/g, '$1$2')          // LR(1) -> lr1, LL(1) -> ll1
      .replace(/\b([a-z])\+/g, '$1plus ')                // B+ tree -> bplus tree
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  const words = s => { const n = norm(s); return n ? n.split(' ') : []; };
  /* function words, dropped from every query (listed in `ignored`) */
  const QSTOP = new Set('a an the and or of in on for to with vs versus is are what how why which does do about explain gate pyq pyqs'.split(' '));
  /* the build's own stop list (tools/buildlib/pyq.py STOP; D.search.stop extends it): never in the postings, so a query word in it can only match topic names */
  const BUILD_STOP = new Set('the and for that this with from are was were which following what given have has not but all any can will one two out into than then its their there these those each between under over only also about more most such when where while whose they them been being does did our your you let consider shown below above statements statement true false correct incorrect option options number value values'.split(' '));
  /* subject codes and course names -> subject id (the codes and names of D.subjects are added at run time) */
  const SUBJ = { dbms: 'db', rdbms: 'db', daa: 'algo', ada: 'algo', ds: 'pds', dsa: 'pds', 'data structures': 'pds', 'data structure': 'pds', co: 'coa',
    'computer organization': 'coa', 'computer organisation': 'coa', 'computer architecture': 'coa', flat: 'toc', automata: 'toc', compiler: 'cd', compilers: 'cd',
    networks: 'cn', networking: 'cn', 'operating system': 'os', 'discrete maths': 'dm', 'discrete math': 'dm', discrete: 'dm', 'digital electronics': 'dl', de: 'dl',
    calculus: 'calc', probability: 'ps', statistics: 'ps', aptitude: 'ga', 'general aptitude': 'ga' };
  /* shorthand -> what the papers and the syllabus write (a term matches when any alternative does); the build's table (D.search.alias) extends it */
  const ALT = { kmap: ['karnaugh'], kmaps: ['karnaugh'], 'k map': ['karnaugh'], dp: ['dynamic programming'], bfs: ['breadth first'], dfs: ['depth first'],
    mst: ['spanning tree'], sssp: ['shortest path'], apsp: ['all pairs shortest'], bst: ['binary search tree'], bsts: ['binary search tree'], lru: ['least recently used'],
    fcfs: ['first come first served'], sjf: ['shortest job first'], srtf: ['shortest remaining'], rr: ['round robin'], cfg: ['context free grammar'], cfgs: ['context free grammar'],
    cfl: ['context free'], cfls: ['context free'], pda: ['pushdown'], tm: ['turing machine'], gbn: ['go back n'], '2pl': ['two phase locking'], er: ['entity relationship'],
    fd: ['functional dependenc'], fds: ['functional dependenc'], mvd: ['multivalued dependenc'], lr1: ['clr1'], clr: ['clr1'], lalr: ['lalr1'], slr: ['slr1'],
    ll: ['ll1'], np: ['np complete'], ieee754: ['ieee 754'], fsm: ['finite state machine'], rtos: ['real time'], ipc: ['message passing'], acid: ['acid properties'],
    'go back n': ['gbn', 'sliding window'], bankers: ['banker'], kruskals: ['kruskal'], prims: ['prim'], dijkstras: ['dijkstra'] };
  const catalogue = () => (GA.data && GA.data.D) || null;
  function altTable(alias) {
    const a = Object.assign({}, ALT);
    if (alias && typeof alias === 'object') for (const k in alias) { const v = [].concat(alias[k] || []).map(String).filter(Boolean); const nk = norm(k); if (nk && v.length) a[nk] = U.uniq((a[nk] || []).concat(v)); }
    return a;
  }
  const subjMemo = new WeakMap();
  function subjTable(D) {
    if (!D || !D.subjects) return SUBJ;
    if (subjMemo.has(D)) return subjMemo.get(D);
    const t = Object.assign({}, SUBJ);
    D.subjects.forEach(s => { t[s.id] = s.id; t[norm(s.short)] = s.id; t[norm(s.name)] = s.id; });
    subjMemo.set(D, t);
    return t;
  }

  /** parse a search text: {year, set, section: 'GA' | 'CS' | null, no, id, idLike, terms, ignored, alts}. The same reading as the palette's own parser
      (core/search.js parseLocal), so a bank link built from the learner's words lists what the palette counted. o = {alias, stop} (D.search), o.D the catalogue. */
  function parseQuery(text, o) {
    o = o || {};
    const D = o.D || catalogue();
    const B = (D && D.search) || {};
    const A = altTable(o.alias || B.alias), SJ = subjTable(D);
    // only function words leave the query; the build's stop words (o.stop / D.search.stop) are never in the postings, so the matcher skips them
    // there but still lets them match topic names and titles (the palette's rule too)
    const stop = QSTOP;
    const raw = String(text == null ? '' : text).trim();
    const out = { year: null, set: null, section: null, no: null, id: null, idLike: false, terms: [], ignored: [], alts: {}, kind: null, attempt: null };
    const compact = raw.replace(/\s+/g, '').toLowerCase();
    if (/^[no]-p\d-(pyq|rtp|mtp)-[a-z]{3}\d{4}(-s[12])?-[a-z0-9-]+$/.test(compact) && D && D.qById && D.qById[compact]) { out.id = compact; out.idLike = true; return out; }
    if (/^(cs|ga)-\d{4}(-\d)?:(cs|ga|q)?\d{1,3}$/.test(compact)) {
      let id = null;
      if (D && D.questions) { const hit = D.questions.find(q => q.id.toLowerCase() === compact); id = hit ? hit.id : null; }
      else id = compact.replace(/:(cs|ga|q)?/, (m, p) => ':' + (p ? p.toUpperCase() : 'Q'));
      if (id) { out.id = id; out.idLike = true; return out; }
    }
    const toks = words(raw), rest = [];
    let cue = false;
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i], nx = toks[i + 1];
      let m;
      if (/^(19|20)\d\d$/.test(t)) { out.year = +t; cue = true; }
      else if (t === 'set' && nx && /^\d$/.test(nx)) { out.set = +nx; i++; cue = true; }
      else if ((m = /^set(\d)$/.exec(t))) { out.set = +m[1]; cue = true; }
      else if ((m = /^(q|cs|ga)(\d{1,2})$/.exec(t))) { out.section = m[1] === 'q' ? null : m[1].toUpperCase(); out.no = +m[2]; cue = true; }
      else if ((t === 'q' || t === 'cs' || t === 'ga') && nx && /^\d{1,2}$/.test(nx)) { out.section = t === 'q' ? null : t.toUpperCase(); out.no = +nx; i++; cue = true; }
      else if (t === 'cs' && (out.year || (nx && /^(19|20)\d\d$/.test(nx)) || (toks[i - 1] && /^(19|20)\d\d$/.test(toks[i - 1])))) { cue = true; }      // 'gate 2019 cs': the paper's name
      else if (D && D.questions && D.questions.some(q => q.icai) && /^(rtp|rtps|mtp|mtps)$/.test(t)) { out.kind = t.slice(0, 3); cue = true; }    // ICAI documents (docs/ICAI_BANK.md)
      else if (D && D.questions && D.questions.some(q => q.icai) && /^(jan|january|may|jun|june|jul|july|sep|sept|september|nov|november|dec|december)$/.test(t) && nx && /^(19|20)\d\d$/.test(nx)) { out.attempt = t.slice(0, 3) + nx; out.year = +nx; i++; cue = true; }
      else if (stop.has(t)) out.ignored.push(t);
      else rest.push(t);
    }
    // a bare 1-2 digit number is a question number only next to a paper cue ('2019 37'); otherwise it is a word ('ieee 754' keeps 754)
    for (let i = rest.length - 1; i >= 0; i--) if (cue && out.no == null && /^\d{1,2}$/.test(rest[i])) { out.no = +rest[i]; rest.splice(i, 1); }
    // two- and three-word shorthand ('k map', 'operating system', 'go back n') reads as one term
    for (let i = 0; i < rest.length; i++) {
      const two = rest[i] + ' ' + (rest[i + 1] || ''), three = two + ' ' + (rest[i + 2] || '');
      if (rest[i + 2] && (SJ[three] || A[three])) { out.terms.push(three); i += 2; }
      else if (rest[i + 1] && (SJ[two] || A[two])) { out.terms.push(two); i++; }
      else out.terms.push(rest[i]);
    }
    out.terms.forEach(t => { if (A[t] && A[t].length) out.alts[t] = A[t].slice(); });
    out.idLike = !!(out.year || out.set || out.no != null || out.kind || out.attempt) && !out.terms.length;
    return out;
  }

  /* ================================================================== the bank's text search */
  /** plural stems (whole words only: 'labs' -> lab, never label) and, for long words, the word's start ('segmentation' -> segment…, 'scheduling' -> schedul…) */
  const STEM = t => {
    const out = [], x = w => { const a = [w]; a.exact = true; out.push(a); }, start = w => out.push([w]);
    if (t.length >= 4 && /[^s]s$/.test(t)) x(t.slice(0, -1));
    if (t.length >= 6 && /(ch|sh|ss|x|z)es$/.test(t)) x(t.slice(0, -2));
    let m;
    if ((m = /^([a-z]{5,})ations?$/.exec(t))) start(m[1]);
    else if ((m = /^([a-z]{5,})ing$/.exec(t))) start(m[1]);
    return out;
  };
  function ed1(a, b) {                                 // edit distance <= 1
    if (a === b) return true;
    const la = a.length, lb = b.length; if (Math.abs(la - lb) > 1) return false;
    let i = 0, j = 0, d = 0;
    while (i < la && j < lb) { if (a[i] === b[j]) { i++; j++; continue; } if (++d > 1) return false; if (la > lb) i++; else if (lb > la) j++; else { i++; j++; } }
    return d + (la - i) + (lb - j) <= 1;
  }
  /** one word against one word: exact, or a word start for 3+ letters (never inside a word; 1-2 letter words match whole words only) */
  const wordHit = (a, w, exact) => w === a || (!exact && a.length >= 3 && w.startsWith(a));
  /** a list of words (an alternative) against a name's words: a phrase matches as consecutive words, its last word possibly a start */
  function altHit(alt, ws) {
    if (alt.length === 1) return ws.some(w => wordHit(alt[0], w, alt.exact));
    for (let i = 0; i + alt.length <= ws.length; i++) {
      let ok = true;
      for (let j = 0; j < alt.length && ok; j++) ok = j === alt.length - 1 ? wordHit(alt[j], ws[i + j]) : ws[i + j] === alt[j];
      if (ok) return true;
    }
    return false;
  }
  /* per catalogue: question index by id and normalised topic / sub-topic names */
  const qMemo = new WeakMap();
  function qIndex(D) {
    let m = qMemo.get(D);
    if (!m) {
      const nm = id => (id && D.nodes && D.nodes[id] ? words(D.nodes[id].name) : []);
      const nodeWords = {};
      const w = id => (id ? (nodeWords[id] = nodeWords[id] || nm(id)) : []);
      m = { idx: new Map(D.questions.map((q, i) => [q.id, i])), names: D.questions.map(q => [w(q.topic), w(q.subtopic)]), vocab: null, hits: new Map(), hitsNoPost: new Map(), post: null };
      qMemo.set(D, m);
    }
    return m;
  }
  /** postings of one word: the union over keys equal to it or (3+ letters, unless exact) starting with it */
  function postWord(a, post, keys, exact) {
    const hit = new Set();
    if (post[a]) post[a].forEach(i => hit.add(i));
    if (!exact && a.length >= 3) for (const k of keys) if (k !== a && k.startsWith(a)) post[k].forEach(i => hit.add(i));
    return hit;
  }
  /** postings of an alternative: its indexable words intersected (a phrase whose words are mostly too short to index is left to the names) */
  function postAlt(alt, post, keys, stop) {
    const ix = alt.map(a => (a.length >= 3 && !BUILD_STOP.has(a) && !(stop && stop.has(a)) ? a : /^[a-z]{3,}\d+$/.test(a) ? a.replace(/\d+$/, '') : null)).filter(Boolean);
    if (!ix.length || (alt.length > 1 && ix.length < 2 && ix.length < alt.length)) return null;
    let acc = null;
    for (const a of ix) { const h = postWord(a, post, keys, alt.exact); acc = acc ? new Set([...acc].filter(i => h.has(i))) : h; }
    return acc;
  }
  /** the questions one term reaches: {any: Set of question indexes, names: Set (reached through topic / sub-topic names), fixed: the word it was read as} */
  function termHits(D, term, alts, post) {
    const M = qIndex(D);
    if (post && M.post !== post) { M.post = post; M.hits = new Map(); M.vocab = null; }
    const cache = post ? M.hits : M.hitsNoPost, ck = term + '|' + (alts || []).join('/');
    if (cache.has(ck)) return cache.get(ck);
    const keys = post ? Object.keys(post) : [];
    const SJ = subjTable(D), subject = SJ[term] || null;
    const stop = D.search && Array.isArray(D.search.stop) ? new Set(D.search.stop.map(norm)) : null;
    const run = list => {
      const any = new Set(), names = new Set();
      for (const alt of list) {
        const p = post ? postAlt(alt, post, keys, stop) : null;
        if (p) p.forEach(i => any.add(i));
        M.names.forEach((nw, i) => { if (altHit(alt, nw[0]) || altHit(alt, nw[1])) { any.add(i); names.add(i); } });
      }
      if (subject) D.questions.forEach((q, i) => { if (q.subject === subject) any.add(i); });
      return { any, names };
    };
    const own = [words(term)];
    (alts || []).forEach(a => { const w = words(a); if (w.length) own.push(w); });
    STEM(term).forEach(a => own.push(a));
    let r = run(own), fixed = null;
    // a one-letter typo in a word of 5+ letters that matches nothing ('dijkstara'): read it as the nearest indexed word
    if (!r.any.size && term.length >= 5 && !/\s/.test(term)) {
      if (!M.vocab) { const v = new Set(keys); M.names.forEach(nw => nw.forEach(ws => ws.forEach(w => v.add(w)))); M.vocab = [...v]; }
      const near = M.vocab.filter(w => Math.abs(w.length - term.length) <= 1 && ed1(w, term)).slice(0, 6);
      if (near.length) { r = run(near.map(w => { const a = [w]; a.exact = true; return a; })); if (r.any.size) fixed = near[0]; }
    }
    const out = { any: r.any, names: r.names, fixed };
    cache.set(ck, out);
    return out;
  }
  /** the text part of a filter: the questions of qs that the words of `text` select, with .meta {P, terms (matched), ignored (function words and
      words that match nothing), unmatched (the latter: 'Ignored: lr'), fixed (typo readings), partial, score (id -> [terms, via names]), noIndex} */
  function textSearch(D, qs, text, post) {
    const P = parseQuery(text, { D });
    const meta = { P, ignored: P.ignored.slice(), unmatched: [], fixed: [], partial: false, score: null, noIndex: !post, terms: [] };
    let list = qs.filter(q => (!P.year || q.year === P.year) && (!P.set || q.set === P.set) && (!P.section || q.section === P.section) && (P.no == null || q.no === P.no)
      && (!P.kind || q.kind === P.kind) && (!P.attempt || q.attempt === P.attempt));
    if (P.id) return { list: list.filter(q => q.id === P.id), meta };
    const terms = P.terms.filter(t => t.replace(/\s+/g, '').length >= 2);       // one letter on its own is never searchable
    if (!terms.length) return { list: P.idLike ? list : [], meta };
    const M = qIndex(D), hits = [];
    terms.forEach(t => {
      const h = termHits(D, t, P.alts[t], post);
      if (h.any.size) { hits.push(h); meta.terms.push(t); if (h.fixed) meta.fixed.push(h.fixed); }
      else { meta.ignored.push(t); meta.unmatched.push(t); }
    });
    if (!hits.length) return { list: P.year || P.set || P.no != null || P.kind || P.attempt ? list : [], meta };
    const N = hits.length, score = new Map();
    list.forEach(q => {
      const i = M.idx.get(q.id);
      let n = 0, tn = 0;
      hits.forEach(h => { if (h.any.has(i)) { n++; if (h.names.has(i)) tn++; } });
      if (n) score.set(q.id, [n, tn]);
    });
    meta.score = score;
    let out = list.filter(q => score.has(q.id) && score.get(q.id)[0] === N);
    if (!out.length && N > 1) {
      out = list.filter(q => { const s = score.get(q.id); return s && (s[0] >= Math.max(1, N - 1) || s[0] >= Math.ceil(N / 2)); });
      meta.partial = out.length > 0;
    }
    return { list: out, meta };
  }

  /* ================================================================== filter + sort */
  /** in-paper order with the CS section before GA (D15): CS by number, then GA by number */
  const inPaper = (a, b) => (a.icai && b.icai && a.paper === b.paper ? (a.ord || 0) - (b.ord || 0) : a.section === b.section ? a.no - b.no : a.section === 'CS' ? -1 : 1);
  /** ICAI documents of one attempt: exam papers, then RTPs, then MTPs (Series I first) */
  const KIND_ORD = { pyq: 0, rtp: 1, mtp: 2 };
  const docOrd = (a, b) => (a.paper === b.paper ? 0 : (KIND_ORD[a.kind] - KIND_ORD[b.kind]) || (a.paper < b.paper ? -1 : 1));
  /** the bank's base order: newest paper first, then CS before GA, then by number (ICAI: newest attempt first, its documents together, each in
      ICAI's order) */
  const base = (a, b) => b.year - a.year || (a.icai && b.icai ? Math.floor(b.set / 10) - Math.floor(a.set / 10) || docOrd(a, b) : b.set - a.set) || inPaper(a, b);

  /** the questions a filter state selects, sorted. S is the store (S.state.q, and S.state.lessons for 'learned'); post = search postings (word ->
      question indexes); opts.disputes overrides the disputed ids (tests), opts.seed the day seed of the mixed and shuffled orders. The result is an
      array; with a search text it carries .meta (see textSearch). */
  function filter(D, f, S, post, opts) {
    let qs = D.questions;
    const st = (S && S.state && S.state.q) || {};
    const disputed = () => new Set((opts && opts.disputes) || disputedIds());
    if (f.subject) qs = qs.filter(q => q.subject === f.subject);
    if (f.topic) { const ids = new Set(listOf(f.topic)); qs = qs.filter(q => ids.has(q.topic)); }
    if (f.sub) { const ids = new Set(listOf(f.sub)); qs = qs.filter(q => ids.has(q.subtopic) || (q.icai && q.tags && q.tags.some(t => ids.has(t)))); }   // an ICAI item counts for every sub-topic it is tagged with
    if (f.year) qs = qs.filter(q => String(q.year) === String(f.year));
    if (f.from) qs = qs.filter(q => q.year >= +f.from);
    if (f.to) qs = qs.filter(q => q.year <= +f.to);
    if (f.paper) qs = qs.filter(q => q.paper === f.paper);
    if (f.type) { const ts = new Set(types(f.type)); qs = qs.filter(q => ts.has(q.type)); }
    // the manifest's dispute list (the one GA.insights counts); the catalogue's DISPUTE bit when a build has no list
    if (f.disputed || f.key === 'disputed') { const ids = disputed(); qs = qs.filter(q => (ids.size || (opts && opts.disputes) ? ids.has(q.id) : !!q.disputed)); }
    if (f.key === 'official') qs = qs.filter(q => q.hasKey && !q.mta);
    if (f.key === 'mta') qs = qs.filter(q => q.mta);
    if (f.key === 'nokey') qs = qs.filter(q => !q.hasKey);
    if (f.special) qs = qs.filter(q => q.special);
    if (f.kind) qs = qs.filter(q => q.kind === f.kind);
    if (f.attempt) qs = qs.filter(q => q.attempt === f.attempt);
    if (f.scheme) qs = qs.filter(q => (q.scheme || 'new') === f.scheme);
    if (f.oos) qs = qs.filter(q => !q.oos);
    if (f.marks) qs = qs.filter(q => String(q.marks) === String(f.marks));
    if (f.sec) qs = qs.filter(q => q.section === f.sec);
    if (f.diff) qs = qs.filter(q => (q.diff || 'none') === f.diff);
    if (f.syl === '2027') qs = qs.filter(q => !q.legacy);
    if (f.status) {
      const learned = f.status === 'learned' ? learnedSubs(S && S.state, D) : null;
      qs = qs.filter(q => {
        const e = st[q.id];
        switch (f.status) {
          case 'new': return !seenOf(e);
          case 'attempted': return seenOf(e);
          case 'correct': return !!(e && e.n > 0 && e.lastOk);
          case 'wrong': return !!(e && e.n > 0 && !e.lastOk);
          case 'bookmarked': return !!(e && e.bm);
          case 'noted': return !!(e && e.note);
          case 'learned': return !!q.subtopic && learned.has(q.subtopic);
          case 'sol': return q.hasSol;
          case 'nokey': return !q.hasKey;
          default: return true;
        }
      });
    }
    let meta = null;
    if (f.q && String(f.q).trim()) { const r = textSearch(D, qs, f.q, post || null); qs = r.list; meta = r.meta; }
    const ord = {}; D.subjects.forEach((s, i) => (ord[s.id] = i));
    const rank = { hard: 0, medium: 1, easy: 2 };
    const sc = id => (meta && meta.score && meta.score.get(id)) || [0, 0];
    const sorters = {
      new: base, old: (a, b) => a.year - b.year || (a.icai && b.icai ? Math.floor(a.set / 10) - Math.floor(b.set / 10) || docOrd(a, b) : a.set - b.set) || inPaper(a, b),
      syllabus: (a, b) => (ord[a.subject] ?? 99) - (ord[b.subject] ?? 99) || base(a, b),
      marks: (a, b) => b.marks - a.marks || base(a, b), diff: (a, b) => (rank[a.diff] ?? 3) - (rank[b.diff] ?? 3) || base(a, b),
      unseen: (a, b) => (seenOf(st[a.id]) ? 1 : 0) - (seenOf(st[b.id]) ? 1 : 0) || base(a, b),
      weak: (a, b) => ((st[b.id] && st[b.id].n && !st[b.id].lastOk) ? 1 : 0) - ((st[a.id] && st[a.id].n && !st[a.id].lastOk) ? 1 : 0) || base(a, b),
      // relevance: words matched, matched through topic names, keyed, in the syllabus, then the base order (the palette's question order)
      best: (a, b) => { const x = sc(a.id), y = sc(b.id); return y[0] - x[0] || y[1] - x[1] || (b.hasKey - a.hasKey) || (a.legacy - b.legacy) || base(a, b); }
    };
    qs = qs.slice();
    const seed = (opts && opts.seed) || new Date().toDateString();
    if (f.sort === 'rand') { const rnd = U.rng(U.hash('pyq' + seed)), keyOf = {}; qs.forEach(q => (keyOf[q.id] = rnd())); qs.sort((a, b) => keyOf[a.id] - keyOf[b.id]); }
    else if (f.sort === 'mixed') qs = mixedOrder(qs, seed);
    else qs.sort(sorters[f.sort] || base);
    if (meta) Object.defineProperty(qs, 'meta', { value: meta, enumerable: false });
    return qs;
  }
  /** interleaved practice (P2-64, 'Mixed topics'): one question from each sub-topic in turn, the sub-topics in a day-seeded order and each one newest
      first, so neighbours rarely share a method and you practise choosing it. The same day gives the same order (pages stay put). */
  function mixedOrder(list, seed) {
    const groups = new Map();
    list.slice().sort(base).forEach(q => { const k = q.subtopic || q.topic || q.subject || '?'; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(q); });
    const keys = [...groups.keys()].sort((a, b) => U.hash('mixed|' + seed + '|' + a) - U.hash('mixed|' + seed + '|' + b) || (a < b ? -1 : 1));
    const out = [], lists = keys.map(k => groups.get(k));
    for (let r = 0; out.length < list.length; r++) lists.forEach(g => { if (g[r]) out.push(g[r]); });
    return out;
  }

  /* ================================================================== practice sets (P1-22) */
  /** a stable key for a filter state (page, sort and search spacing aside): 'Practise 10' continues per key */
  function bankKey(f) { return FKEYS.filter(k => k !== 'page' && k !== 'sort' && f[k]).map(k => k + '=' + String(f[k]).trim().toLowerCase()).join('&') || 'all'; }
  /** the next 'Practise 10' of a sorted filter list: questions with an official key first (unkeyed only when the list has none; marks-to-all
      questions only when the list has nothing else, practised unscored like an unkeyed paper: D9, D18), unseen first, then missed, then the rest,
      each group in list order; ids already served by this filter are skipped until the pool runs out.
      -> {ids, pool (questions the set draws from), keyed, wrapped, mta (true: the set draws on marks-to-all questions only, none is scored)} */
  function practiseSet(list, S, o) {
    o = o || {};
    const n = o.n || 10, st = (S && S.state && S.state.q) || {}, served = new Set(o.served || []);
    const usable = list.filter(q => !q.mta), mta = !usable.length && list.length > 0;
    const keyed = usable.filter(q => (q.icai ? scorable(q) : q.hasKey)), pool = keyed.length ? keyed : mta ? list : usable;
    const grp = q => { const e = st[q.id]; return !seenOf(e) ? 0 : e.n > 0 && !e.lastOk ? 1 : 2; };
    const ordered = pool.map((q, i) => [q, grp(q), i]).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(x => x[0]);
    let pick = ordered.filter(q => !served.has(q.id)).slice(0, n), wrapped = false;
    if (pick.length < n && served.size) { wrapped = true; const have = new Set(pick.map(q => q.id)); pick = pick.concat(ordered.filter(q => !have.has(q.id)).slice(0, n - pick.length)); }
    return { ids: pick.map(q => q.id), pool: pool.length, keyed: keyed.length, wrapped, mta };
  }
  /** a practice set's name (the mockup's 'Cache memory practice'): the narrowest single scope of the filter */
  function setName(D, f) {
    const one = v => { const ids = listOf(v); return ids.length === 1 ? ids[0] : null; };
    const sub = one(f.sub), topic = one(f.topic);
    if (sub && D.nodes[sub]) return D.name(sub) + ' practice';
    if (topic && D.nodes[topic]) return D.name(topic) + ' practice';
    if (f.paper && D.paperById[f.paper]) return D.paperById[f.paper].label + ' practice';
    if (f.kind && KIND_CHIP[f.kind]) return (f.attempt ? KIND_CHIP[f.kind].replace(/s$/, '') + ' ' + attemptName(f.attempt) : KIND_CHIP[f.kind]) + ' practice';
    if (f.subject && D.subjectById[f.subject]) return D.subjectById[f.subject].name + ' practice';
    if (f.status === 'bookmarked') return 'Bookmarked questions';
    if (f.status === 'wrong') return 'Missed questions';
    if (f.status === 'learned') return 'Mixed review';
    if (f.key === 'mta') return 'Marks-to-all questions';
    if (f.q && String(f.q).trim()) return `“${String(f.q).trim()}” practice`;
    return 'Question practice';
  }

  /* ================================================================== the calm rows (P2-25, P2-27) */
  /** a paper's name in a compact row: 'GATE 2026 CS · Set 2' -> '2026 · Set 2', 'GATE 2019 CS' -> '2019' */
  const shortPaper = label => String(label || '').replace(/^GATE\s+/i, '').replace(/\s+CS\b/, '').replace(/\s+/g, ' ').trim();
  /** what a bank row prints, in the spec's order (paper · Q · subject · topic · marks · type), leaving out what the filter already makes constant
      (P2-25): a fixed paper drops the paper ('Q37'), a fixed year the year ('Set 2 · Q11'), a fixed subject its code, a fixed topic its name (the
      sub-topic shows instead), fixed marks or a single type their text, a fixed difficulty the glyph. An aptitude row never repeats 'GA' (its label
      already says 'GA Q5', P3-41). -> {id, subject: {short, name} | null, topic: name | null, marks: '2 marks' | null, type: 'MCQ' | null, diff: bool} */
  function rowParts(D, m, f) {
    f = f || {};
    const p = D.paperById[m.paper], label = printed(m);
    let paper = shortPaper(p ? p.label : m.paper);
    if (f.paper || (f.year && D.papers.filter(x => String(x.year) === String(f.year)).length === 1)) paper = '';
    else if (f.year) paper = paper.replace(/^\d{4}\s*·?\s*/, '');
    const sj = m.subject && D.subjectById[m.subject];
    const subject = !f.subject && sj && m.section !== 'GA' ? { short: sj.short, name: sj.name } : null;
    const subs = listOf(f.sub), tops = listOf(f.topic), subName = () => (m.subtopic && D.nodes[m.subtopic] ? D.name(m.subtopic) : null);
    const topic = subs.length === 1 ? null : subs.length > 1 || tops.length === 1 ? subName() : m.topic ? D.name(m.topic) : null;
    return {
      id: paper ? paper + ' · ' + label : label, subject, topic,
      marks: f.marks || (m.icai && !m.marks) ? null : U.plural(m.marks, 'mark'),
      type: types(f.type).length === 1 ? null : m.type === 'DESC' ? 'Descriptive' : m.type,
      diff: !f.diff && !!m.diff
    };
  }
  /** the topic row under a selected subject (P2-27): the subject's topics that have questions in the bank, each with its count under the other
      filters and how many of those the learner has seen -> [{id, name, n, seen}] (n 0: greyed); [] when no single subject is selected */
  function topicRow(D, f, S, post) {
    const sj = f && f.subject && D.subjectById[f.subject];
    if (!sj) return [];
    const st = (S && S.state && S.state.q) || {}, n = {}, seen = {};
    filter(D, Object.assign({}, f, { topic: '', sub: '', page: 1, sort: 'new' }), S, post).forEach(q => { n[q.topic] = (n[q.topic] || 0) + 1; if (seenOf(st[q.id])) seen[q.topic] = (seen[q.topic] || 0) + 1; });
    const inBank = new Set(D.questions.filter(q => q.subject === sj.id).map(q => q.topic));
    return (sj.topics || []).filter(t => inBank.has(t.id)).map(t => ({ id: t.id, name: t.name, n: n[t.id] || 0, seen: seen[t.id] || 0 }));
  }

  /** 'Make a test' from a filtered list (P0-05, P0-04): only questions with an official key and no marks-to-all ruling can be scored, and a test
      needs at least 3 of them -> {keyed, mta, ok, why} (why = the reason shown under the disabled button, '' when it can run or the list is empty).
      The reason says what is true of the list: marks-to-all questions have an official key (it gave every candidate the marks), so a list of them
      is never called 'no official key'. */
  function testable(list) {
    const qs = list || [], keyed = qs.filter(q => (q.icai ? scorable(q) : q.hasKey && !q.mta)).length, mta = qs.filter(q => q.mta).length, ok = keyed >= 3;
    const unkeyed = qs.length - keyed - mta;
    const why = ok || !qs.length ? ''
      : keyed ? (mta ? `Needs 3 questions that can be scored (${keyed} here; ${mta} ${mta === 1 ? 'is' : 'are'} marks to all)` : `Needs 3 questions with an official key (${keyed} here)`)
      : !mta ? 'No official key for these questions, so a test cannot be scored'
      : !unkeyed ? `The official key gave marks to all here, so a test cannot score ${mta === 1 ? 'this question' : 'these questions'}`
      : 'None of these can be scored: no official key, or marks to all';
    return { keyed, mta, ok, why };
  }

  /* ================================================================== the end of a notebook retry set (P2-68, WP11's notebook queue) */
  /** the coral of a finished notebook retry set: the day plan's next open task, named by the task ('Next in today's plan · 26 min' / 'Finish:
      Dynamic memory'), else the shared next step. The same reading as the flash finish card (GA.flashLib.nextCoral), so the daily loop hands back
      to the plan from both. plan = GA.planner.current() (its tasks carry `done`), step = GA.stats.nextStep(state, D, {kind: 'any'});
      o.skip(href) is true for a link that would open nothing now (the notebook's retry queue with nothing due)
      -> {kicker, title, minutes, href, from: 'plan' | 'step'} | null */
  function planNext(plan, step, o) {
    o = o || {};
    const skip = h => !h || (typeof o.skip === 'function' && !!o.skip(h));
    const open = plan ? (Array.isArray(plan.tasks) ? plan.tasks.filter(t => t && !t.done) : plan.next ? [plan.next] : []) : [];
    const t = open.find(x => !skip(x.href));
    if (t) return { kicker: "Next in today's plan", title: t.title || '', minutes: t.minutes || null, href: t.href, from: 'plan' };
    if (step && !skip(step.href)) return { kicker: step.label || 'Next', title: step.title || '', minutes: step.minutes || null, href: step.href, from: 'step' };
    return null;
  }
  /** what a finished notebook retry set did, read from the store after it with the notebook's own rule (retryDay = GA.stats.retryDay):
      {resolved: entries a right answer resolved, back: open entries now booked for a later retry, when / last: the first and last of those days,
       due: entries still due today (skipped ones)}; an entry without a schedule counts in none of them */
  function nbAfter(state, ids, today, retryDay) {
    const nb = (state && state.nb) || {}, later = [];
    let resolved = 0, due = 0;
    (ids || []).forEach(id => {
      const n = nb[id];
      if (!n || typeof n !== 'object') return;
      if (n.resolved) { resolved++; return; }
      let d = null; try { d = typeof retryDay === 'function' ? retryDay(state, id) : null; } catch (e) { d = null; }
      if (typeof d !== 'string') return;
      if (d > today) later.push(d); else due++;
    });
    later.sort();
    return { resolved, back: later.length, due, when: later[0] || null, last: later[later.length - 1] || null };
  }
  /** nbAfter as one line: '1 resolved · 4 back for a retry from tomorrow · 1 still due today' ('' when there is nothing to say) */
  function nbLine(r, today) {
    if (!r) return '';
    const day = d => (d === U.addDays(today, 1) ? 'tomorrow' : U.fmtDay(d, { day: 'numeric', month: 'short' }));
    const parts = [];
    if (r.resolved) parts.push(`${U.nf(r.resolved)} resolved`);
    if (r.back) parts.push(`${U.nf(r.back)} back for a retry ${r.when === r.last ? (r.when === U.addDays(today, 1) ? 'tomorrow' : 'on ' + day(r.when)) : 'from ' + day(r.when)}`);
    if (r.due) parts.push(`${U.nf(r.due)} still due today`);
    return parts.join(' · ');
  }

  /* ================================================================== the question page's keys (P0-13) */
  /** what a keydown on /q/:id asks for, or null to leave the key to the browser and the card. Never grades or leaves the question by accident:
      k = {key, repeat, prevented, mods (Meta, Ctrl or Alt held), field (a text field, select, textarea or editable text has focus),
           option (an option's radio / checkbox has focus), control (any control has focus: link, button, summary, input, tab …)}
      s = {checked, choice (MCQ or MSQ), next, prev (a neighbour exists), overlay (a sheet, the palette or a dialog is open),
           single (single-key shortcuts on; false = the learner turned them off, P3-17)}
      -> 'check' | 'next' | 'prev' | 'A'…'D' | null. Enter checks only from the page, the card or an option (Enter on Skip, Show answer or
      Bookmark is that button's own action); the arrows never navigate from a radio group or another control (J / K and N / P do); A–D pick an
      option from anywhere but a text field. */
  function pageKey(k, s) {
    if (!k || !s || k.prevented || k.repeat || k.mods || s.overlay || k.field) return null;
    const key = k.key && k.key.length === 1 ? k.key.toLowerCase() : k.key || '';
    if (key === 'Enter') return !s.checked && (k.option || !k.control) ? 'check' : null;
    if (s.single === false) return null;
    if (key.length === 1 && 'abcd'.includes(key)) return s.choice && !s.checked ? key.toUpperCase() : null;
    if ((key === 'j' || key === 'n' || (key === 'ArrowRight' && !k.control)) && s.next) return 'next';
    if ((key === 'k' || key === 'p' || (key === 'ArrowLeft' && !k.control)) && s.prev) return 'prev';
    return null;
  }

  /* ================================================================== printed numbering (P1-21) */
  /** a paper's numbering read from its questions: 'restart' when both sections start at 1 (GA 1–10, CS 1–55), else 'global' (one run 1–65) */
  function numbering(qs) {
    const ga = qs.filter(q => q.section === 'GA'), cs = qs.filter(q => q.section === 'CS');
    return ga.length && cs.length && Math.min(...ga.map(q => q.no)) === 1 && Math.min(...cs.map(q => q.no)) === 1 ? 'restart' : 'global';
  }
  /** the label printed on the paper: 'Q37' (CS, or any global number), 'GA Q5' (an aptitude question) */
  const printed = q => (q.label ? q.label : `${q.section === 'GA' ? 'GA ' : ''}Q${q.no}`);
  /** an ICAI item's palette text: 'Q5(a)' -> '5(a)', 'MCQ 3' -> '3' */
  const cellText = q => String(q.label || q.no).replace(/^Q/, '').replace(/^MCQ\s*/, '');
  const PART_NAME = { I: 'Part I · MCQs', II: 'Part II · Descriptive' };
  const SUB_NAME = { fm: '6A FM', sm: '6B SM' };
  /** a paper's questions (in printed order) as palette groups: consecutive runs of one section, each cell labelled with its printed number
      -> [{sec, title, cells: [{id, no, label}]}] */
  function paperGroups(qs) {
    const out = [];
    if (qs.length && qs.every(q => q.icai)) {
      // ICAI's parts (P6: per section), each cell its printed number
      qs.forEach(q => {
        const sec = (q.sub ? q.sub + ':' : '') + q.section;
        let gr = out[out.length - 1];
        if (!gr || gr.sec !== sec) { gr = { sec, title: (q.sub ? SUB_NAME[q.sub] + ' · ' : '') + (PART_NAME[q.section] || q.section), cells: [] }; out.push(gr); }
        gr.cells.push({ id: q.id, no: cellText(q), label: printed(q) });
      });
      return out;
    }
    qs.forEach(q => {
      let gr = out[out.length - 1];
      if (!gr || gr.sec !== q.section) { gr = { sec: q.section, title: q.section === 'GA' ? 'General Aptitude' : 'Technical', cells: [] }; out.push(gr); }
      gr.cells.push({ id: q.id, no: q.no, label: printed(q) });
    });
    return out;
  }

  /* ================================================================== the Trap line after a miss (P1-40, D17) */
  /** split text at sentence ends (or at ';' when `semi`), never inside $…$ maths, a decimal point or brackets */
  function splitAt(text, semi) {
    const out = [];
    let cur = '', math = false, depth = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      cur += c;
      if (c === '$' && text[i - 1] !== '\\') math = !math;       // an escaped \$ is a dollar sign, not maths
      if (math) continue;
      if (c === '(' || c === '[') depth++;
      else if ((c === ')' || c === ']') && depth > 0) depth--;
      if (depth) continue;
      const nx = text[i + 1], nx2 = text[i + 2];
      const end = semi ? c === ';' && nx === ' ' : /[.?!]/.test(c) && nx === ' ' && nx2 && /[A-Z(“"'*]/.test(nx2) && !/\b(e\.g|i\.e|vs|etc|resp|approx|cf)\.$/i.test(cur);
      if (end) { out.push(cur.trim()); cur = ''; }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  const cited = (s, L) => new RegExp('\\(' + L + '\\)|\\b[Oo]ption \\(?' + L + '\\b').test(s);
  /** cut to at most n characters at a word boundary outside $…$ maths, with an ellipsis */
  function cap(s, n) {
    if (s.length <= n) return s;
    let math = false, cut = -1;
    for (let i = 0; i < Math.min(s.length, n - 1); i++) { if (s[i] === '$' && s[i - 1] !== '\\') math = !math; else if (s[i] === ' ' && !math) cut = i; }
    return (cut > 0 ? s.slice(0, cut) : s.slice(0, n - 1)).replace(/[\s,;:(]+$/, '') + '…';
  }
  /** the sentence(s) of a worked solution's Trap paragraph that cite the picked option letter(s) ('C' or ['A', 'C']), at most 160 characters and
      ready for MD.inline; a sentence that walks through several options is cut to the clauses about the picks. null when none cites them. */
  function trapLine(solution, picks) {
    const s = solution && (typeof solution === 'string' ? solution : solution.s);
    if (!s) return null;
    const letters = U.uniq([].concat(picks == null ? [] : picks).map(x => String(x).trim().toUpperCase()).filter(x => /^[A-D]$/.test(x)));
    if (!letters.length) return null;
    const m = /(?:^|\n)[ \t]*\*\*Trap[^*\n]*\*\*[ \t]*([^\n]+(?:\n(?![ \t]*\n)(?![ \t]*\*\*[A-Z])[^\n]+)*)/.exec(s);
    if (!m) return null;
    const para = m[1].replace(/\s+/g, ' ').trim(), out = [];
    for (const sen of splitAt(para, false)) {
      if (!letters.some(L => cited(sen, L))) continue;
      const others = 'ABCD'.split('').filter(L => !letters.includes(L) && cited(sen, L));
      const parts = others.length ? splitAt(sen, true) : [sen];
      const keep = parts.length > 1 ? parts.filter(p => letters.some(L => cited(p, L))) : parts;
      keep.forEach(p => out.push(/[.?!…]$/.test(p) ? p : p.replace(/[;,:]$/, '') + '.'));
    }
    if (!out.length) return null;
    let line = '';
    for (const p of out) { const next = line ? line + ' ' + p : p; if (next.length > 160) { if (!line) line = cap(p, 160); break; } line = next; }
    // a clause too long to show whole must still name the pick after the cut, else there is no line
    return line && letters.some(L => cited(line, L)) ? line : null;
  }

  /* ================================================================== plain-text previews (P2-25): bank rows, the question page's 'More on' list, lesson
     PYQ rows and the notebook. Inline TeX becomes readable Unicode ('x_1^T' -> 'x₁ᵀ', '\frac{9}{8x_n}' -> '9/(8xₙ)', '\overline{L}' -> 'L̅',
     '\mathbb{N}' -> 'ℕ') instead of vanishing or misreading, a blank stays a blank ('____'), a code block shows its first real line and a table its
     header row, Markdown punctuation goes, and long text is cut at a word with an ellipsis. */
  const SYM = { le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', lt: '<', gt: '>', times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓',
    in: '∈', notin: '∉', ni: '∋', cup: '∪', cap: '∩', bigcup: '⋃', bigcap: '⋂', setminus: '∖', backslash: '\\', subseteq: '⊆', subset: '⊂', subsetneq: '⊊',
    supseteq: '⊇', supset: '⊃', to: '→', rightarrow: '→', longrightarrow: '⟶', Rightarrow: '⇒', Longrightarrow: '⟹', implies: '⇒', leftarrow: '←',
    longleftarrow: '⟵', Leftarrow: '⇐', leftrightarrow: '↔', Leftrightarrow: '⇔', iff: '⇔', uparrow: '↑', downarrow: '↓', mapsto: '↦', infty: '∞',
    alpha: 'α', beta: 'β', gamma: 'γ', Gamma: 'Γ', delta: 'δ', Delta: 'Δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', vartheta: 'ϑ',
    Theta: 'Θ', iota: 'ι', kappa: 'κ', lambda: 'λ', Lambda: 'Λ', mu: 'μ', nu: 'ν', xi: 'ξ', Xi: 'Ξ', pi: 'π', Pi: 'Π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ',
    tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ', Phi: 'Φ', chi: 'χ', psi: 'ψ', Psi: 'Ψ', omega: 'ω', Omega: 'Ω', ell: 'ℓ', aleph: 'ℵ',
    lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉', langle: '⟨', rangle: '⟩', ldots: '…', dots: '…', cdots: '⋯', vdots: '⋮',
    neg: '¬', lnot: '¬', land: '∧', wedge: '∧', lor: '∨', vee: '∨', oplus: '⊕', otimes: '⊗', odot: '⊙', forall: '∀', exists: '∃', emptyset: '∅', varnothing: '∅',
    sum: 'Σ', prod: 'Π', int: '∫', equiv: '≡', approx: '≈', sim: '∼', simeq: '≃', cong: '≅', propto: '∝', mid: '|', nmid: '∤', vert: '|', perp: '⊥', bot: '⊥',
    top: '⊤', prec: '≺', preceq: '⪯', preccurlyeq: '≼', succ: '≻', bowtie: '⋈', circ: '∘', bullet: '•', star: '⋆', ast: '*', prime: '′', angle: '∠', square: '□',
    lozenge: '◊', triangle: '△', partial: '∂', nabla: '∇', models: '⊨', vdash: '⊢', colon: ':', bmod: 'mod', mod: 'mod', quad: ' ', qquad: ' ',
    left: '', right: '', big: '', Big: '', bigg: '', Bigg: '', bigl: '', bigr: '', Bigl: '', Bigr: '', displaystyle: '', textstyle: '', scriptstyle: '',
    limits: '', nolimits: '', rm: '', it: '', bf: '', '{': '{', '}': '}', '%': '%', '$': '$', '#': '#', '&': '&', '_': '_', '|': '‖', ',': ' ', ';': ' ',
    ':': ' ', '!': '', ' ': ' ', '\\': '; ' };
  const UNWRAP = new Set('text textit textbf textrm textsf texttt textup textnormal mathrm mathit mathbf mathsf mathtt mathcal mathfrak mathscr operatorname boldsymbol bm boxed mbox hbox emph mathop overbrace underbrace'.split(' '));
  const ACCENT = { overline: '̅', bar: '̄', underline: '̲', hat: '̂', widehat: '̂', tilde: '̃', widetilde: '̃', vec: '⃗', dot: '̇', ddot: '̈' };
  const BB = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', P: 'ℙ' };
  const SUP = {}, SUB = {};
  ['0123456789+-−=()', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾'].reduce((a, b) => [...a].forEach((c, i) => (SUP[c] = [...b][i])));
  ['abcdefghijklmnoprstuvwxyz', 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ'].reduce((a, b) => [...a].forEach((c, i) => (SUP[c] = [...b][i])));
  ['ABDEGHIJKLMNOPRTUVW', 'ᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ'].reduce((a, b) => [...a].forEach((c, i) => (SUP[c] = [...b][i])));
  Object.assign(SUP, { '*': '*', '∗': '*', '′': '′', "'": '′', '∘': '°', θ: 'ᶿ', β: 'ᵝ', γ: 'ᵞ', δ: 'ᵟ', φ: 'ᵠ', χ: 'ᵡ' });
  ['0123456789+-−=()', '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎'].reduce((a, b) => [...a].forEach((c, i) => (SUB[c] = [...b][i])));
  ['aehijklmnoprstuvx', 'ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ'].reduce((a, b) => [...a].forEach((c, i) => (SUB[c] = [...b][i])));
  Object.assign(SUB, { β: 'ᵦ', γ: 'ᵧ', ρ: 'ᵨ', φ: 'ᵩ', χ: 'ᵪ' });
  /** a sub- or superscript as Unicode when every character has a form ('n+1' -> 'ⁿ⁺¹'), else '^(…)' / '_…' so nothing misreads */
  function script(op, t) {
    const x = t.replace(/\s+/g, ''), map = op === '^' ? SUP : SUB, ch = [...x];
    if (!ch.length) return '';
    if (ch.every(c => map[c])) return ch.map(c => map[c]).join('');
    if (op === '^') return ch.length === 1 ? '^' + x : '^(' + x + ')';
    return '_' + x;
  }
  /** the argument at s[i]: a {…} group or one token (a command or a character) -> [raw text, end] | null */
  function arg(s, i) {
    while (s[i] === ' ') i++;
    if (i >= s.length) return null;
    if (s[i] === '{') { let d = 1, j = i + 1; while (j < s.length && d) { if (s[j] === '\\') { j += 2; continue; } if (s[j] === '{') d++; else if (s[j] === '}') d--; j++; } return d ? null : [s.slice(i + 1, j - 1), j]; }
    if (s[i] === '\\') { const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i)); return m ? [m[0], i + m[0].length] : null; }
    if (s[i] === '}') return null;
    return [s[i], i + 1];
  }
  /** a fraction part that reads unambiguously without brackets: a number, one letter (with its scripts), a bracketed or single-symbol group */
  const atom = t => /^-?\d+(\.\d+)?$/.test(t) || /^[A-Za-zα-ωΑ-Ωℓ][̀-ͯ⃗]*[²³¹⁰-₟ᴬ-ᵪᶜ-ᶿ′*°]*$/u.test(t)
    || (/^\(.*\)$/.test(t) && !/\)\s*[^)]*\(/.test(t.slice(1, -1))) || /^[√∞π]?[A-Za-z0-9]$/.test(t);
  const topLevel = (t, re) => { let d = 0; for (const c of t) { if ('([{⌊⌈⟨'.includes(c)) d++; else if (')]}⌋⌉⟩'.includes(c)) d--; else if (!d && re.test(c)) return true; } return false; };
  const accent = (t, mark) => (/\S/.test(t) ? [...t].map(c => (/\s/.test(c) ? c : c + mark)).join('') : mark === '̲' ? '____' : '');
  /** TeX (math mode) -> plain Unicode text */
  function tex(s) {
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === '\\') {
        const m = /^\\([a-zA-Z]+|.)/s.exec(s.slice(i));
        if (!m) { i++; continue; }
        const name = m[1]; i += m[0].length;
        const one = () => { const a = arg(s, i); if (a) i = a[1]; return a ? a[0] : null; };
        if (UNWRAP.has(name)) { const a = one(); if (a != null) out += tex(a); continue; }
        if (ACCENT[name]) { const a = one(); if (a != null) out += accent(tex(a), ACCENT[name]); continue; }
        if (name === 'mathbb') { const a = one(); if (a != null) out += [...tex(a)].map(x => BB[x] || x).join(''); continue; }
        if (/^[dt]?frac$/.test(name) || /^[dt]?binom$/.test(name)) {
          const a = one(), b = a != null ? one() : null;
          if (b == null) continue;
          const x = tex(a).trim(), y = tex(b).trim();
          if (/binom$/.test(name)) { out += `C(${x}, ${y})`; continue; }
          out += (topLevel(x, /[+\-−±\s/,]/) ? '(' + x + ')' : x) + '/' + (atom(y) ? y : '(' + y + ')');
          continue;
        }
        if (name === 'sqrt') {
          let idx = '';
          if (s[i] === '[') { const j = s.indexOf(']', i); if (j > 0) { idx = tex(s.slice(i + 1, j)); i = j + 1; } }
          const a = one(); if (a == null) continue;
          const x = tex(a).trim();
          out += (idx ? script('^', idx) : '') + '√' + (atom(x) ? x : '(' + x + ')');
          continue;
        }
        if (name === 'underset' || name === 'overset' || name === 'stackrel') { const a = one(), b = a != null ? one() : null; if (b != null) out += tex(b) + ' (' + tex(a).trim() + ')'; continue; }
        if (name === 'substack') { const a = one(); if (a != null) out += tex(a.replace(/\\\\/g, ', ')); continue; }
        if (/^(hspace|vspace|phantom|hphantom|vphantom)$/.test(name)) { one(); out += ' '; continue; }
        if (name === 'color') { one(); continue; }
        if (name === 'textcolor') { one(); const b = one(); if (b != null) out += tex(b); continue; }
        if (name === 'pmod') { const a = one(); if (a != null) out += ' (mod ' + tex(a).trim() + ')'; continue; }
        if (name === 'begin') { const env = one(); if (/^(array|tabular)$/.test(env || '')) one(); out += ' '; continue; }
        if (name === 'end') { one(); out += ' '; continue; }
        if ((name === 'left' || name === 'right') && s[i] === '.') { i++; continue; }
        out += SYM[name] != null ? SYM[name] : /^[a-zA-Z]+$/.test(name) ? (/[A-Za-z0-9]$/.test(out) ? ' ' : '') + name + (/^[A-Za-z0-9]/.test(s[i] || '') ? ' ' : '') : name;
        continue;
      }
      if (c === '^' || c === '_') { const a = arg(s, i + 1); if (a) { out += script(c, tex(a[0])); i = a[1]; continue; } }
      if (c === '{') { const a = arg(s, i); if (a) { out += tex(a[0]); i = a[1]; continue; } }
      if (c === '}') { i++; continue; }
      out += c === '&' || c === '~' ? ' ' : c;
      i++;
    }
    return out;
  }
  const texPlain = s => tex(String(s || '')).replace(/\s+/g, ' ').replace(/\s+([;,])/g, '$1').trim();
  const cutAt = (t, n) => (t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '').replace(/[\s,;:(]+$/, '') + '…' : t);
  /** a code block's first real line, for '[code: …]': not an #include, a comment, a lone brace or the 'int main(…)' every program shares */
  const firstCode = body => cutAt((String(body).split('\n').map(l => l.trim()).find(l => l && !/^#\s*include\b/.test(l) && !/^[{}();]+$/.test(l) && !/^(\/\/|\/\*|\*)/.test(l)
    && !/^(?:(?:int|void)\s+)?main\s*\([^)]*\)\s*\{?$/.test(l)) || '').replace(/\s*\{$/, ''), 60);
  /** a Markdown table's header cells, for '[table: Process · Arrival · Burst]' */
  function tableHead(block) {
    const rows = block.split('\n').map(r => r.trim()).filter(r => /^\|.*\|$/.test(r) && !/^\|[\s:|-]+\|$/.test(r));
    const cells = rows.length ? rows[0].replace(/^\||\|$/g, '').split('|').map(x => plain(x)).filter(Boolean) : [];
    return cutAt(cells.join(' · '), 70);
  }
  function plain(src) {
    const keep = [], hold = t => { keep.push(t); return `\u0004${keep.length - 1}\u0004`; };
    let out = String(src || '')
      .replace(/```[^\n]*\n?([\s\S]*?)```/g, (m, body) => { const l = firstCode(body); return ' ' + hold(l ? `[code: ${l}]` : '[code]') + ' '; })
      .replace(/(?:^[ \t]*\|.*\|[ \t]*(?:\n|$))+/gm, m => { const h = tableHead(m); return ' ' + hold(h ? `[table: ${h}]` : '[table]') + ' '; })
      .replace(/`([^`\n]+)`/g, (m, x) => hold(x))                                          // inline code keeps its '$' and '_' ('a#b$c$d')
      .replace(/\\\$/g, () => hold('$'))                                                  // an escaped dollar is a dollar, not maths
      .replace(/(?:\\_){3,}|_{3,}/g, () => hold('____'))                                  // a blank survives the emphasis rules below
      .replace(/\$\$([\s\S]*?)\$\$/g, (m, x) => ' ' + hold(texPlain(x)) + ' ').replace(/\$([^$\n]+)\$/g, (m, x) => hold(texPlain(x)))
      .replace(/^:{3,}.*$/gm, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => b || a).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*|__|~~|`/g, '').replace(/(^|[\s([])[*_]([^*_\n]+)[*_](?=\s|$|[.,;:!?)\]])/g, '$1$2').replace(/^#+\s*/gm, '').replace(/^>\s?/gm, '').replace(/<br\s*\/?>/gi, ' ');
    for (let k = 0; k < 4 && /\u0004\d+\u0004/.test(out); k++) out = out.replace(/\u0004(\d+)\u0004/g, (m, i) => keep[+i]);
    return out.replace(/\s+/g, ' ').trim();
  }
  function snippet(q, n) {
    n = n || 190;
    const x = plain(q.stem || (q.group && q.group.context) || '');
    if (x.length <= n + 10) return x;
    const cut = x.slice(0, n), sp = cut.lastIndexOf(' ');
    return (sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:.(]+$/, '') + '…';
  }
  /* ---------------------------------------------------------------- the empty ICAI bank (PassBook fork)
     The GATE question model (MCQ / MSQ / NAT records in data/pyq/<paper>.js, D.questions index rows, keys and worked solutions) is kept as the
     machinery; PassBook ships no question until the ICAI bank job designs it (descriptive questions with sub-parts, suggested answers, the
     30-mark MCQ part of Papers 5 and 6). Until then every question screen asks isEmpty(D) and shows GA.ui.bankEmptyCard with emptyStep's one
     real next step. Where the bank plugs in: build.py (tools/buildlib/pyq.py) -> manifest.papers + manifest.pyq.rows -> D.papers / D.questions
     (data.js buildCatalogue: {id, paper, sec, no, marks, type, subject, topic, subtopic, diff, flags}); GA.data.paper(id) / question(qid) /
     questions(qids) / solution(qid) load the full records; views/qcard.js GA.qcard.create(q, {mode}) draws one; core/testgen.js builds sets;
     core/scoring.js GA.scoring.mark(q, response) marks one. */
  /** true while the build ships no question at all */
  function isEmpty(D) {
    if (GA.ui && typeof GA.ui.bankIsEmpty === 'function') return GA.ui.bankIsEmpty(D);
    return !D || !Array.isArray(D.questions) || D.questions.length === 0;
  }
  /** the one real next step of an empty question screen: the shared next lesson, else the syllabus. -> {href, label, title, minutes} */
  function emptyStep(state, D) {
    let s = null;
    try { s = GA.stats && typeof GA.stats.nextLesson === 'function' && state && D ? GA.stats.nextLesson(state, D, {}) : null; } catch (e) { s = null; }
    if (s && s.href && s.title) return { href: s.href, label: 'Next lesson', title: s.title, minutes: s.minutes || null };
    return { href: '#/syllabus', label: 'Go to Learn', title: 'The Group II syllabus', minutes: null };
  }

  Object.assign(Lib, {
    isEmpty, emptyStep,
    FKEYS, TYPES, KEYF, STATUS, SORTS, parse, types, chipLabels, filter, disputedIds, texPlain, plain, snippet,
    parseQuery, trapLine, defaultSort, listOf, seenOf, inPaper, base, bankKey, practiseSet, setName, testable, pageKey, numbering, printed, paperGroups,
    learnedSubs, mixedOrder, rowParts, shortPaper, topicRow, KEY_CHIP, planNext, nbAfter, nbLine,
    KINDS, KIND_CHIP, STATUS_ALIAS, attemptName, attemptOrd, scorable, cellText,
    norm, words, ed1, _textSearch: textSearch, _termHits: termHits
  });
  GA.pyqLib = Lib;
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
})(typeof window !== 'undefined' ? window : globalThis);
