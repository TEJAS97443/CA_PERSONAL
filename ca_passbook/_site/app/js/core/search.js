/* PassBook — command palette (⌘K / '/'): one search box for lessons, the syllabus, labs, ICAI questions (by id or words, once the bank has them) and places.

   Ranking (audit P0-23): groups in the mockup's order — Best match (an exact title, a subject code or a course name), Lessons (5), Questions (4, then
   'All N … in the bank'), Labs, Topics & subjects, Jump to; a query that names a paper or a question number ('2019 cs 37', 'q37 2019', 'set 3') lists
   Questions first. Question rows are ranked by relevance (words matched, topic and sub-topic names, keyed, in the syllabus, newest) and read
   'GATE 2019 CS · Q37 · <sub-topic>' / '<topic> · 1 mark · MCQ'.
   Shorthand (P1-26): one normalisation for the index and the query (LR(1) → lr1, banker's → banker, go-back-n → go back n), subject codes and
   course names (os, dbms, toc, daa, coa …), a short alias table (kmap → karnaugh, dp → dynamic programming …), tokens of 3 letters or fewer match
   word starts only (toc never matches proTOCols), one-letter typos are forgiven for words of 5+ letters (dijkstara), and when no row has every word
   the palette says 'Partial matches' instead of nothing. The query parser is GA.pyqLib.parseQuery when it exists (shared with the bank), else the
   local one below with the same output. Questions come from the bank's own filter when GA.pyqLib is loaded (bankSet: the rows are the first of
   the list #/pyq?q=<the words> shows and 'All N' is its size, Part C); the local question matcher is the fallback without the lib.
   Empty query: row 1 is the shared next step (GA.stats.nextStep, kind 'any'; P0-08) with Home's label.
   Classic script; the pure part (index, parse, query, empty rows) also loads in Node for tests/search.test.js. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('./util.js') : null);
  const esc = U.esc;
  const hasDOM = typeof document !== 'undefined' && typeof g.addEventListener === 'function';

  /* ------------------------------------------------------------------ one normalisation for index and query */
  /* US and British spellings read as one word (P1-26): the lessons write 'normalisation', 'colouring', 'analyse', learners type either. The palette's
     own index and the query both take the British form (canon); norm() itself stays the shared normalisation of the build and the bank
     (tools/buildlib/textnorm.py = pyqlib.norm = search.norm), so the PYQ postings keep each paper's spelling and question lookups try both. */
  const SPELL = [
    [/\b([a-z]{3,})iz(e|es|ed|ing|er|ers|ation|ations|ational|able|ability|abilities)\b/g, '$1is$2'],
    [/\b([a-z]+)yz(e|es|ed|ing|er|ers)\b/g, '$1ys$2'],
    [/\b(col|behavi|neighb|fav|hon|flav|hum|rum|endeav)or(s|ed|ing|ings|ful|less|al|ally|ite|ites|able|ability|hood|hoods)?\b/g, '$1our$2'],
    [/\bcenter(s)?\b/g, 'centre$1'], [/\bcentered\b/g, 'centred'], [/\bcentering\b/g, 'centring'],
    [/\b(model|label|travel|cancel|signal|channel|level|tunnel|dial|total|equal|fuel)(ed|ing|er|ers)\b/g, '$1l$2'],
    [/\bgrey\b/g, 'gray'], [/\b(acknowledg|judg)ment(s)?\b/g, '$1ement$2'],
    [/\b(catal|anal|dial)ogue(s)?\b/g, '$1og$2'], [/\bdisc(s)?\b/g, 'disk$1'], [/\bprogramme(s)?\b/g, 'program$1'], [/\bfiber(s)?\b/g, 'fibre$1']
  ];
  const UNSPELL = [
    [/^([a-z]{3,})is(e|es|ed|ing|er|ers|ation|ations|ational|able|ability|abilities)$/, '$1iz$2'],
    [/^([a-z]+)ys(e|es|ed|ing|er|ers)$/, '$1yz$2'],
    [/^(col|behavi|neighb|fav|hon|flav|hum|rum|endeav)our(s|ed|ing|ings|ful|less|al|ally|ite|ites|able|ability|hood|hoods)?$/, '$1or$2'],
    [/^centre(s)?$/, 'center$1'], [/^centred$/, 'centered'], [/^centring$/, 'centering'],
    [/^(model|label|travel|cancel|signal|channel|level|tunnel|dial|total|equal|fuel)l(ed|ing|er|ers)$/, '$1$2'],
    [/^gray$/, 'grey'], [/^(acknowledg|judg)ement(s)?$/, '$1ment$2'],
    [/^(catal|anal|dial)og(s)?$/, '$1ogue$2'], [/^disk(s)?$/, 'disc$1'], [/^program(s)?$/, 'programme$1'], [/^fibre(s)?$/, 'fiber$1']
  ];
  /** the other spelling of a normalised word ('normalisation' -> 'normalization', 'colour' -> 'color'), or null */
  function otherSpelling(w) { for (const [re, to] of UNSPELL) if (re.test(w)) return w.replace(re, to); return null; }
  function norm(s) {
    let n = String(s == null ? '' : s).toLowerCase().replace(/ε/g, ' epsilon ').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’‘`´]/g, "'").replace(/([a-z0-9])'s\b/g, '$1').replace(/'/g, '')
      .replace(/([a-z]+)\s*\((\d+)\)/g, '$1$2')          // LR(1) -> lr1, LL(1) -> ll1
      .replace(/\b([a-z])\+/g, '$1plus ')                // B+ tree -> bplus tree
      .replace(/[^a-z0-9]+/g, ' ').trim();
    return n;
  }
  /** norm() plus one spelling for US and British words: the palette's own index rows and the query */
  function canon(s) { let n = norm(s); for (const [re, to] of SPELL) n = n.replace(re, to); return n; }
  const words = s => { const n = canon(s); return n ? n.split(' ') : []; };

  /* function words dropped from every query; the bank's own stop list (build) is dropped only where questions are matched */
  const QSTOP = new Set('a an the and or of in on for to with vs versus is are what how why which does do about explain icai pyq pyqs'.split(' '));
  const BUILD_STOP = new Set('the and for that this with from are was were which following what given have has not but all any can will one two out into than then its their there these those each between under over only also about more most such when where while whose they them been being does did our your you let consider shown below above statements statement true false correct incorrect option options number value values'.split(' '));
  /* subject codes and course names -> subject id (codes and names also come from D.subjects); a soft match: a row of that subject counts, its text still ranks */
  const SUBJ = { costing: 'cma', 'cost accounting': 'cma', 'management accounting': 'cma', 'cost and management accounting': 'cma', p4: 'cma',
    audit: 'aud', auditing: 'aud', 'auditing and ethics': 'aud', p5: 'aud', 'financial management': 'fm', p6a: 'fm',
    'strategic management': 'sm', strategy: 'sm', p6b: 'sm' };
  /* shorthand -> what the lessons and papers write (a term matches if any alternative does) */
  const ALT = { kmap: ['karnaugh'], kmaps: ['karnaugh'], 'k map': ['karnaugh'], dp: ['dynamic programming'], bfs: ['breadth first'], dfs: ['depth first'],
    mst: ['spanning tree'], sssp: ['shortest path'], apsp: ['all pairs shortest'], bst: ['binary search tree'], bsts: ['binary search tree'], lru: ['least recently used'],
    fcfs: ['first come first served'], sjf: ['shortest job first'], srtf: ['shortest remaining'], rr: ['round robin'], cfg: ['context free grammar'], cfgs: ['context free grammar'],
    cfl: ['context free'], cfls: ['context free'], pda: ['pushdown'], tm: ['turing machine'], gbn: ['go back n'], '2pl': ['two phase locking'], er: ['entity relationship'],
    fd: ['functional dependenc'], fds: ['functional dependenc'], mvd: ['multivalued dependenc'], lr1: ['clr1'], clr: ['clr1'], lalr: ['lalr1'], slr: ['slr1'],
    ll: ['ll1'], np: ['np complete'], ieee754: ['ieee 754'], fsm: ['finite state machine'], rtos: ['real time'], ipc: ['message passing'], acid: ['acid properties'],
    normalisation: ['bcnf', '3nf', '4nf'], normalise: ['bcnf', '3nf', '4nf'],          // (the engine's GATE shorthand above is harmless: no CA lesson uses it)
    /* CA Inter shorthand */
    bep: ['break even'], cvp: ['cost volume profit'], eoq: ['economic order quantity'], mos: ['margin of safety'], npv: ['net present value'],
    irr: ['internal rate of return'], mirr: ['modified internal rate'], arr: ['accounting rate of return'], wacc: ['weighted average cost of capital'],
    ebit: ['earnings before interest'], eps: ['earnings per share'], dol: ['operating leverage'], dfl: ['financial leverage'], dcl: ['combined leverage'],
    abc: ['activity based'], zbb: ['zero base'], wip: ['work in progress'], caro: ['companies auditor'], npa: ['non performing'], npas: ['non performing'],
    tcwg: ['those charged with governance'], kam: ['key audit matter'], kams: ['key audit matters'], ifc: ['internal financial controls'], sqc: ['standard on quality control'],
    pestle: ['pestle'], swot: ['swot'], bcg: ['boston consulting'], adl: ['arthur d little'] };

  /* ------------------------------------------------------------------ the index */
  /** a row with its normalised fields: title, tags, topic, body */
  function mkRow(r) { r.f = { title: words(r.t), tags: words(r.tags || ''), topic: words(r.topic || ''), body: words(r.body || '') }; r.nt = r.f.title.join(' '); return r; }
  /** the place rows ('Jump to'); rebuilt per palette visit because GATE Wrapped's gate and the device can change */
  const placeRows = list => (list || []).map(p => mkRow(Object.assign({ ty: 'Action' }, p)));
  function lessonCtx(D, l) { const s = D.subjectById[l.subject]; return (s ? s.name : '') + (l.minutes ? ` · ${l.minutes} min` : ''); }
  /** rows for every lesson, topic, subject, lab and place, with normalised fields; vocab = every indexed word (for typo matching) */
  function index(D, places) {
    const rows = [], ord = {};
    let k = 0;
    D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => { ord[n.id] = k++; })));
    const add = r => { rows.push(mkRow(r)); return r; };
    D.lessons.forEach(l => add({ ty: 'Lesson', t: l.title, c: lessonCtx(D, l), href: `#/l/${l.id}`, subject: l.subject, id: l.id, legacy: l.status && l.status !== 'in', ord: ord[l.id] != null ? ord[l.id] : 9999,
      tags: (l.tags || []).join(' '), topic: D.name(l.topic), body: l.summary || '' }));
    D.subjects.forEach((s, si) => {
      const n = D.lessons.filter(l => l.subject === s.id).length;
      add({ ty: 'Subject', t: s.name, c: `${s.paper ? String(s.paper).replace(/^P/, 'Paper ') + ' · ' : ''}${U.plural(n, 'lesson')} · ${U.plural(s.topics.length, 'chapter')}`, href: `#/s/${s.id}`, subject: s.id, ord: si, tags: s.short + ' ' + s.id + (s.paper ? ' ' + s.paper + ' paper ' + String(s.paper).slice(1) : ''), body: s.official || '' });
      s.topics.forEach((t, ti) => add({ ty: 'Topic', t: t.name, c: s.name, href: `#/s/${s.id}?t=${t.id}`, subject: s.id, ord: si * 100 + ti, legacy: t.status && t.status !== 'in', body: t.syl || '' }));
      // each subject's formula sheet (P1-53): 'os formulas', 'dbms formula sheet', 'toc revision' land on /rev/<subject>
      add({ ty: 'Action', t: `Formula sheet: ${s.name}`, c: 'Recap, formulas and key ideas on one page', href: `#/rev/${s.id}`, subject: s.id, ord: 9000 + si, tags: `formula formulas sheet revision revise recap handbook ${s.short} ${s.id}` });
    });
    (D.labs || []).forEach(l => add({ ty: 'Lab', t: l.title, c: ((D.subjectById[l.subject] || {}).name || '') + (l.status === 'planned' ? ' · coming soon' : ''), href: `#/lab/${l.id}`, subject: l.subject, tags: (l.keywords || []).join(' '), body: l.blurb || '' }));
    placeRows(places).forEach(r => rows.push(r));
    const vocab = new Set();
    rows.forEach(r => Object.values(r.f).forEach(ws => ws.forEach(w => vocab.add(w))));
    // subject codes and names, for the Best match and the soft subject match
    const subjAlias = Object.assign({}, SUBJ);
    D.subjects.forEach(s => { subjAlias[s.id] = s.id; subjAlias[canon(s.short)] = s.id; subjAlias[canon(s.name)] = s.id; });
    // the build's alias table and stop words (manifest.search -> D.search, WP13) extend the palette's own, once they ship
    const alt = Object.assign({}, ALT), stop = new Set(BUILD_STOP), B = D.search || {};
    if (B.alias && typeof B.alias === 'object') for (const k in B.alias) { const v = [].concat(B.alias[k] || []).map(String); const nk = canon(k); if (nk && v.length) alt[nk] = U.uniq((alt[nk] || []).concat(v)); }
    if (Array.isArray(B.stop)) B.stop.forEach(w => { stop.add(norm(w)); stop.add(canon(w)); });
    return { rows, vocab, subjAlias, alt, stop, D, qNames: null };
  }
  /** the topic and sub-topic names of every question, normalised (built once, on the first word query) */
  function questionNames(X) {
    if (X.qNames) return X.qNames;
    const D = X.D, nm = id => (id && D.nodes[id] ? D.nodes[id].name : '');
    return (X.qNames = D.questions.map(q => words(nm(q.topic) + ' ' + nm(q.subtopic))));
  }

  /* ------------------------------------------------------------------ the query */
  const STEM = t => { const out = []; if (t.length >= 4 && /[^s]s$/.test(t)) out.push(t.slice(0, -1)); if (t.length >= 6 && /(ch|sh|ss|x|z)es$/.test(t)) out.push(t.slice(0, -2)); return out; };
  function ed1(a, b) {                                 // edit distance <= 1
    if (a === b) return true;
    const la = a.length, lb = b.length; if (Math.abs(la - lb) > 1) return false;
    let i = 0, j = 0, d = 0;
    while (i < la && j < lb) { if (a[i] === b[j]) { i++; j++; continue; } if (++d > 1) return false; if (la > lb) i++; else if (lb > la) j++; else { i++; j++; } }
    return d + (la - i) + (lb - j) <= 1;
  }
  /** a term with its alternatives (each alternative is a list of words) and the subject it may name */
  function term(raw, X) {
    const alts = [words(raw)];
    ((X.alt || ALT)[raw] || []).forEach(a => { const w = words(a); w.alias = true; alts.push(w); });
    STEM(raw).forEach(s => { const a = [s]; a.exact = true; alts.push(a); });     // a plural's stem matches whole words only ('labs' -> lab, never label)
    const subject = X.subjAlias[raw] || null;
    return { raw, alts, subject, fuzzy: null };
  }
  /** the local parser (same output as GA.pyqLib.parseQuery): {year, set, section, no, id, idLike, terms, ignored} */
  function parseLocal(text, X) {
    const D = X.D, raw = String(text || '').trim(), out = { year: null, set: null, section: null, no: null, id: null, idLike: false, terms: [], ignored: [] };
    const compact = raw.replace(/\s+/g, '').toLowerCase();
    if (/^(cs|ga)-\d{4}(-\d)?:(cs|ga|q)?\d{1,3}$/.test(compact)) {
      if (!X.qLower) { X.qLower = {}; D.questions.forEach(q => { X.qLower[q.id.toLowerCase()] = q.id; }); }
      out.id = X.qLower[compact] || null;
      if (out.id) { out.idLike = true; return out; }
    }
    const toks = words(raw).filter(Boolean);
    const rest = [];
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
      else if (QSTOP.has(t)) out.ignored.push(t);
      else rest.push(t);
    }
    // a bare 1-2 digit number is a question number only next to a paper cue ('2019 37'); otherwise it is a word ('ieee 754' keeps 754)
    for (let i = rest.length - 1; i >= 0; i--) if (cue && out.no == null && /^\d{1,2}$/.test(rest[i])) { out.no = +rest[i]; rest.splice(i, 1); }
    // two-word shorthand ('k map', 'operating system') reads as one term
    for (let i = 0; i < rest.length; i++) {
      const two = rest[i] + ' ' + (rest[i + 1] || ''), three = two + ' ' + (rest[i + 2] || '');
      const A = X.alt || ALT;
      if (rest[i + 2] && (X.subjAlias[three] || A[three])) { out.terms.push(three); i += 2; }
      else if (rest[i + 1] && (X.subjAlias[two] || A[two])) { out.terms.push(two); i++; }
      else out.terms.push(rest[i]);
    }
    out.idLike = !!(out.year || out.set || out.no != null) && !out.terms.length;
    return out;
  }
  function parse(text, X) {
    const L = GA.pyqLib;
    let p = null;
    if (L && typeof L.parseQuery === 'function') {
      try { p = L.parseQuery(text, X.D.search || undefined); } catch (e) { p = null; }
    }
    if (!p) p = parseLocal(text, X);
    else {
      // the shared parser: keep its paper fields and terms, add an exact id when one was typed
      const loc = parseLocal(text, X);
      p = Object.assign({ id: loc.id, ignored: [] }, p);
      if (loc.id) { p.id = loc.id; p.idLike = true; }
      p.terms = (p.terms || []).map(t => canon(t)).filter(Boolean);
      // subject codes and course names stay terms even if the shared parser expanded them into words ('os' -> 'operating systems')
      const subj = loc.terms.filter(t => X.subjAlias[t]);
      if (subj.length && loc.terms.length === subj.length) p.terms = subj.slice();
      else subj.forEach(t => { if (!p.terms.includes(t)) p.terms.push(t); });
    }
    p.terms = p.terms.map(t => term(t, X));
    return p;
  }

  const FW = { title: 12, topic: 8, tags: 6, body: 2 };
  /** how well one alternative (a list of words) matches a list of words: 1 exact word, .85 word start (3+ letters), .4 inside a word (4+ letters), 0 none.
      Words of 1–2 letters (os, dp, ds) match whole words only, so 'os' never lights OSI and 'dp' never DPDA. */
  const wordHit = (a, w, exact) => (w === a ? 1 : exact ? 0 : a.length >= 3 && w.startsWith(a) ? 0.85 : a.length >= 4 && w.includes(a) ? 0.4 : 0);
  function altHit(alt, ws) {
    if (alt.length === 1) { let best = 0; for (const w of ws) { const h = wordHit(alt[0], w, alt.exact); if (h > best) best = h; if (best === 1) break; } return best; }
    // a phrase ('dynamic programming', 'go back n') matches only as consecutive words, the last one possibly a prefix
    let best = 0;
    for (let i = 0; i + alt.length <= ws.length; i++) {
      let t = 0;
      for (let j = 0; j < alt.length; j++) { const h = j === alt.length - 1 ? wordHit(alt[j], ws[i + j]) : (ws[i + j] === alt[j] ? 1 : 0); if (!h) { t = 0; break; } t += h; }
      if (t) best = Math.max(best, t / alt.length);
    }
    return best;
  }
  /** true when the words of alt appear as consecutive whole words of ws (plural: 'gate' is also a whole word of 'logic gates') */
  const same = (a, w, plural) => w === a || (plural && (w === a + 's' || w === a + 'es' || (a.length > 3 && a.endsWith('s') && w === a.slice(0, -1))));
  function wholeIn(alt, ws, plural) {
    for (let i = 0; i + alt.length <= ws.length; i++) { let j = 0; while (j < alt.length && same(alt[j], ws[i + j], plural)) j++; if (j === alt.length) return true; }
    return false;
  }
  /** score one row against the terms: {s, n} = score and number of terms matched */
  function scoreRow(r, terms, X) {
    let s = 0, n = 0;
    for (const t of terms) {
      let best = 0;
      for (const alt of t.alts.concat(t.fuzzy || [])) {
        const f = t.fuzzy && t.fuzzy.includes(alt) ? 0.8 : alt.alias ? 0.9 : alt.exact ? 0.95 : 1;      // the learner's own word first, then shorthand, plural stems, typos
        for (const k in FW) { const h = altHit(alt, r.f[k]); if (h) best = Math.max(best, FW[k] * h * f + (k === 'title' && r.f.title[0] && r.f.title[0].startsWith(alt[0]) ? 2 : 0)); }
      }
      if (t.subject && r.subject === t.subject) best = Math.max(best, r.ty === 'Subject' ? 30 : 5);
      if (best) { s += best; n++; }
    }
    return { s, n };
  }
  /** postings of one alternative: union over keys equal to (or, for 4+ letters, starting with) each word, intersected across its words */
  function postOf(alt, post, keys, stop) {
    let acc = null;
    for (const a of alt) {
      if (a.length < 3 || (stop || BUILD_STOP).has(a)) continue;
      const hit = new Set();
      for (const w of [a, otherSpelling(a)]) {            // the papers keep their own spelling: 'normalisation' also finds 'normalization'
        if (!w) continue;
        if (post[w]) post[w].forEach(i => hit.add(i));
        if (w.length >= 4 && !alt.exact) for (const k of keys) if (k !== w && k.startsWith(w)) post[k].forEach(i => hit.add(i));
      }
      acc = acc ? new Set([...acc].filter(i => hit.has(i))) : hit;
    }
    return acc;
  }
  /** question matches: [{q, n (terms matched), tn (via topic names), i}] for the word terms, within the paper fields */
  function questions(X, P, post) {
    const D = X.D, qs = D.questions, keys = post ? Object.keys(post) : [];
    const within = q => (!P.year || q.year === P.year) && (!P.set || q.set === P.set) && (!P.section || q.section === P.section) && (P.no == null || q.no === P.no);
    if (P.id) return [{ q: D.qById[P.id], n: 1, tn: 0, i: qs.indexOf(D.qById[P.id]) }];
    const text = P.terms.filter(t => t.raw.length >= 2);
    if (!text.length) return P.idLike ? qs.map((q, i) => ({ q, n: 0, tn: 0, i })).filter(x => within(x.q)) : [];
    const names = questionNames(X), hits = new Map();
    text.forEach((t, ti) => {
      const via = new Set(), byName = new Set();
      for (const alt of t.alts.concat(t.fuzzy || [])) {
        const p = post ? postOf(alt, post, keys, X.stop) : null;
        if (p) p.forEach(i => via.add(i));
        names.forEach((ws, i) => { if (altHit(alt, ws)) { via.add(i); byName.add(i); } });
      }
      if (t.subject) qs.forEach((q, i) => { if (q.subject === t.subject) via.add(i); });
      via.forEach(i => { const e = hits.get(i) || { n: 0, tn: 0, terms: new Set() }; if (!e.terms.has(ti)) { e.terms.add(ti); e.n++; } if (byName.has(i)) e.tn++; hits.set(i, e); });
    });
    const out = [];
    hits.forEach((e, i) => { const q = qs[i]; if (q && within(q)) out.push({ q, n: e.n, tn: e.tn, i }); });
    return out;
  }
  /** what the learner did with a question: 'ok' (last answer right), 'bad' (last answer wrong), 'seen' (checked without a key), '' (untouched) */
  function qState(st, id) {
    const e = st && st.q && st.q[id];
    if (!e) return '';
    if (e.n) return e.lastOk ? 'ok' : 'bad';
    return e.seen ? 'seen' : '';
  }
  /** relevance, then keyed, then not yet tried by this learner (P3-19), then in the syllabus, newest, CS before GA */
  const qOrderOf = st => (a, b) => b.n - a.n || b.tn - a.tn || (b.q.hasKey - a.q.hasKey) || ((qState(st, a.q.id) ? 1 : 0) - (qState(st, b.q.id) ? 1 : 0)) || (a.q.legacy - b.q.legacy) ||
    b.q.year - a.q.year || b.q.set - a.q.set || (a.q.section === b.q.section ? a.q.no - b.q.no : a.q.section === 'CS' ? -1 : 1);
  const qOrder = qOrderOf(null);
  function qRow(D, q, label, st) {
    const p = D.paperById[q.paper], nm = id => (id && D.nodes[id] ? D.nodes[id].name : '');
    const qn = q.label || (q.section === 'GA' ? 'GA ' : '') + 'Q' + q.no, sub = nm(q.subtopic) || nm(q.topic);
    // an ICAI item (docs/ICAI_BANK.md §7): its printed label, no '0 marks' where the document prints none, 'Descriptive', and 'no answer' only
    // where ICAI published none
    const c = q.icai ? [nm(q.topic) || (D.subjectById[q.subject] || {}).name || '', q.marks ? U.plural(q.marks, 'mark') : '', q.type === 'DESC' ? 'Descriptive' : q.type, q.hasKey || q.hasAns ? '' : 'no ICAI answer']
      : [nm(q.topic) || (D.subjectById[q.subject] || {}).name || '', U.plural(q.marks, 'mark'), q.type, q.hasKey ? '' : 'no official key'];
    return { ty: 'PYQ', t: `${p ? p.label : q.paper} · ${qn}${sub ? ' · ' + sub : ''}`, c: c.filter(Boolean).join(' · '),
      href: `#/q/${encodeURIComponent(q.id)}`, id: q.id, label, st: qState(st, q.id) };
  }
  /** the Questions group from the bank's own filter (Part C): GA.pyqLib.filter on the filters of the link #/pyq?q=<the learner's words>, the call
      the bank makes for that address on the same postings, so the rows listed here are that list's first ones and 'All N' is its size: the row
      always opens the questions above it and the rest of them, never a different set (the palette's own shorthand and spellings stay with
      lessons, topics and labs). -> {list: [{q, n, tn}], partial, ready, link} or null without the lib. ready = false while the postings the bank
      searches are not here (it waits for them, or says they did not load), so the row states no count then. */
  function bankSet(text, X, post) {
    const L = GA.pyqLib;
    if (!L || typeof L.filter !== 'function' || typeof L.parse !== 'function') return null;
    const f = { q: String(text).trim() };
    let qs;
    try { qs = L.filter(X.D, L.parse(Object.assign({}, f)), null, post || null); } catch (e) { return null; }
    if (!Array.isArray(qs)) return null;
    const m = qs.meta || {}, sc = m.score && typeof m.score.get === 'function' ? m.score : null;
    const list = qs.filter(q => q && q.id).map(q => { const s = sc ? sc.get(q.id) : null; return { q, n: s ? s[0] : 0, tn: s ? s[1] : 0 }; });
    // the bank needs its postings for any word of 2+ letters (views/pyq.js needsPost); paper fields alone ('2019', 'set 3') never wait
    const words = !!(m.P && !m.P.id && (m.P.terms || []).some(t => String(t).replace(/\s+/g, '').length >= 2));
    return { list, partial: !!m.partial, ready: !!post || !words, link: { href: '#/pyq?q=' + encodeURIComponent(f.q), f } };
  }
  /** without the bank's lib: a link with the structured filters the local reading gives */
  function bankLink(P, text, X) {
    const f = {}, ws = [];
    const raw = ' ' + norm(text) + ' ';
    const typed = w => { const o = otherSpelling(w); return o && raw.includes(' ' + o + ' ') && !raw.includes(' ' + w + ' ') ? o : w; };
    P.terms.forEach(t => { if (t.subject && !f.subject) { f.subject = t.subject; return; } const a = t.alts.find(x => x.every(w => w.length >= 3)); if (a) ws.push(a.map(typed).join(' ')); });
    if (ws.length) f.q = ws.join(' ');
    if (P.year) f.year = String(P.year);
    if (P.section) f.sec = P.section;
    if (P.year && P.set) { const pp = X.D.papers.find(p => p.year === P.year && p.set === P.set); if (pp) { f.paper = pp.id; delete f.year; } }
    const qs = Object.entries(f).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    return { href: '#/pyq' + (qs ? '?' + qs : ''), f };
  }
  /** without the bank's lib: a count only for plain filters (a subject, a year, a paper); words get none, the bank matches them its own way */
  function bankCount(link, X) {
    if (link.f.q) return null;
    const D = X.D;
    return D.questions.filter(q => (!link.f.subject || q.subject === link.f.subject) && (!link.f.year || String(q.year) === link.f.year) && (!link.f.paper || q.paper === link.f.paper) && (!link.f.sec || q.section === link.f.sec)).length;
  }

  /** the bank row's words: what the link matches, with the count only when it is the bank's own ('All 61 questions matching “cache”') */
  function moreLabel(link, n, X) {
    const f = link.f, D = X.D, bits = [];
    const words = f.q ? `matching “${String(f.q).trim()}”` : '';
    const subj = f.subject && D.subjectById[f.subject] ? D.subjectById[f.subject].name : '';
    const from = f.paper && D.paperById[f.paper] ? `in ${D.paperById[f.paper].label}` : f.year ? `from ${f.year}` : '';
    if (words) bits.push(words); if (from) bits.push(from);
    const noun = (subj ? subj + ' ' : '') + (n === 1 ? 'question' : 'questions');
    return n != null ? `All ${U.nf(n)} ${noun}${bits.length ? ' ' + bits.join(' ') : ''}` : `Open the ${noun}${bits.length ? ' ' + bits.join(' ') : ''} in the bank`;
  }
  const GROUPS = [['best', 'Best match'], ['Lesson', 'Lessons'], ['PYQ', 'Questions'], ['Lab', 'Labs'], ['Topic', 'Chapters & papers'], ['Action', 'Jump to']];
  const CAP = { Lesson: 5, PYQ: 4, Lab: 3, Topic: 4, Action: 4 };
  /** run a query: {groups: [[key, title, rows]], partial, note, P}. filter = 'all' | 'lesson' | 'topic' | 'pyq' | 'lab' | 'action' */
  function query(X, text, o) {
    o = o || {};
    const filter = o.filter || 'all', post = o.post || null, D = X.D;
    const P = parse(text, X);
    const nq = canon(text);
    // a query of function words only ('pyq', 'gate') reads them as plain words rather than finding nothing
    if (!P.terms.length && !P.idLike && !P.id && (P.ignored || []).length) P.terms = P.ignored.map(w => term(canon(w), X)).filter(t => t.raw);
    if (!P.terms.length && !P.idLike && !P.id) return { groups: [], partial: false, note: '', P };
    // typo forgiveness: a 5+ letter word that matches nothing anywhere borrows the indexed words one edit away
    const fixed = [];
    for (const t of P.terms) {
      if (t.raw.length < 5 || t.subject) continue;
      const known = [...X.vocab].some(w => w.startsWith(t.raw) || (t.raw.length >= 4 && w.includes(t.raw))) || (post && Object.keys(post).some(k => k.startsWith(t.raw)));
      if (known) continue;
      const near = [...X.vocab].filter(w => Math.abs(w.length - t.raw.length) <= 1 && ed1(w, t.raw));
      if (post) Object.keys(post).forEach(k => { if (Math.abs(k.length - t.raw.length) <= 1 && ed1(k, t.raw) && !near.includes(k)) near.push(k); });
      if (near.length) { t.fuzzy = near.slice(0, 6).map(w => [w]); fixed.push(near[0]); }
    }
    const N = P.terms.length;
    // rows (lessons, topics, subjects, labs, places)
    const scored = [];
    for (const r of X.rows) {
      const want = filter === 'all' || filter === 'pyq' ? true : filter === 'topic' ? r.ty === 'Topic' || r.ty === 'Subject' : r.ty.toLowerCase() === filter;
      if (!want || filter === 'pyq' || !N) continue;
      const { s, n } = scoreRow(r, P.terms, X);
      if (!n) continue;
      scored.push({ r, s: s + (r.nt === nq ? 20 : nq.includes(' ') && r.nt.includes(nq) ? 10 : 0) - (r.legacy ? 1 : 0), n });
    }
    const full = scored.filter(x => x.n === N);
    const partial = !full.length && N > 1;
    const pool = (partial ? scored.filter(x => x.n >= Math.max(1, N - 1) || x.n >= Math.ceil(N / 2)) : full)
      .sort((a, b) => b.n - a.n || b.s - a.s || (a.r.ord != null && b.r.ord != null ? a.r.ord - b.r.ord : 0) || a.r.t.length - b.r.t.length);
    // the Best match: an exact title, or the subject a code / course name names
    let best = null;
    if (!partial && filter === 'all') {
      const sub = P.terms.length === 1 && P.terms[0].subject;
      // a place the query names ('sources', 'exam date', 'shortcuts', 'wrapped', 'recap'): its name starts with the query or holds it as a phrase, or
      // every word is a whole word of its name or tags; never when a lesson, topic or lab title has every word too ('gate' means logic gates there)
      const placeNamed = x => x.r.ty === 'Action' && ((nq.length >= 4 && (x.r.nt.startsWith(nq) || (nq.includes(' ') && x.r.nt.includes(nq))))
        || P.terms.every(t => t.alts.some(a => wholeIn(a, x.r.f.title) || wholeIn(a, x.r.f.tags))));
      const contentNamed = pool.some(y => y.r.ty !== 'Action' && P.terms.every(t => t.alts.some(a => wholeIn(a, y.r.f.title, true))));
      best = (sub && pool.find(x => x.r.ty === 'Subject' && x.r.subject === sub)) || pool.find(x => x.r.nt === nq || x.r.nt === nq + 's' || x.r.nt + 's' === nq)
        || (!contentNamed && pool.find(placeNamed)) || null;
    }
    // questions: the bank's own list for the bank link when its lib is loaded (bankSet), else the palette's local matcher
    let qrows = [], qtotal = 0, link = null, qcount = null, qPartial = false;
    if (filter === 'all' || filter === 'pyq') {
      const B = P.id ? null : bankSet(text, X, post);
      let listQ;
      if (B) { listQ = B.list; qPartial = B.partial; }
      else {
        const hits = questions(X, P, post);
        const nText = P.terms.filter(t => t.raw.length >= 2).length;
        const fullQ = hits.filter(h => P.id || P.idLike || h.n === nText);
        qPartial = !fullQ.length && hits.length > 0 && nText > 1;
        listQ = fullQ.length ? fullQ : hits;
      }
      listQ = listQ.slice().sort(o.state ? qOrderOf(o.state) : qOrder);
      qtotal = listQ.length;
      qrows = listQ.slice(0, filter === 'pyq' ? 40 : P.idLike || P.id ? 8 : CAP.PYQ).map(h => qRow(D, h.q, undefined, o.state));
      const more = qtotal > qrows.length || filter === 'all';
      if (B) {
        // the bank's list, never for a question number the rows already show in full ('2019 cs 37'); 'q37' (one per paper) gets its row
        if (qtotal && more && !(P.no != null && qtotal <= qrows.length)) { link = B.link; qcount = B.ready ? qtotal : null; }
      } else {
        // 'All N in the bank' only when the bank can show the same set: words or a subject, a year, or a year and set (one paper); never for one question
        const expressible = P.terms.length || P.year;
        if (qtotal && !P.id && P.no == null && expressible && more) { link = bankLink(P, text, X); qcount = bankCount(link, X); }
      }
      if (P.id && qrows.length && filter === 'all') { best = { r: Object.assign(qrows[0], { ty: 'PYQ' }) }; qrows = []; }
    }
    const by = {};
    for (const x of pool) { if (best && x.r === best.r) continue; const k = x.r.ty === 'Subject' ? 'Topic' : x.r.ty; (by[k] = by[k] || []).push(x.r); }
    const cap = k => (filter === 'all' ? CAP[k] : 40);
    const groups = [];
    const push = (k, title, list) => { if (list && list.length) groups.push([k, title, list]); };
    if (best) push('best', 'Best match', [best.r]);
    const qGroup = () => {
      if (!(D && D.questions && D.questions.length)) return;        // no ICAI question in the build: no Questions group at all (no error, no 'All N' row)
      const list = qrows.slice();
      if (link && qtotal && (filter === 'all' || filter === 'pyq')) list.push({ ty: 'More', t: moreLabel(link, qcount, X), c: '', href: link.href, more: true });
      if (o.postFailed && P.terms.length && !P.id) list.push({ ty: 'Offline', t: 'Question search is offline', c: 'Try again', retry: true });
      push('PYQ', qPartial ? 'Questions · partial matches' : 'Questions', list);
    };
    if (P.idLike || P.id) qGroup();
    for (const [k, title] of GROUPS.slice(1)) {
      if (k === 'PYQ') { if (!(P.idLike || P.id)) qGroup(); continue; }
      const list = (by[k] || []).slice(0, cap(k));
      push(k, partial ? title + ' · partial matches' : title, list);
    }
    // papers for a query that names a year or a set but no question
    if (P.idLike && !P.id && P.no == null && (filter === 'all' || filter === 'pyq')) {
      const ps = D.papers.filter(p => (!P.year || p.year === P.year) && (!P.set || p.set === P.set)).sort((a, b) => b.year - a.year || a.set - b.set).slice(0, 6);
      if (ps.length) groups.unshift(['Paper', 'Papers', ps.map(p => ({ ty: 'Paper', t: p.label, c: `${U.plural(p.n, 'question')} · ${p.marks} marks${p.keyed === p.n ? '' : p.keyed ? ` · key for ${p.keyed}` : ' · no official key'}`, href: `#/pyq?paper=${p.id}` }))]);
    }
    const note = fixed.length ? `Showing results for “${fixed.join(', ')}”` : '';
    return { groups, partial, note, P };
  }

  /* ------------------------------------------------------------------ the empty palette */
  /** a lesson record that is real reading (nextStep's rule: done, 2+ minutes, a self-check answered or a saved position), not a peek */
  const real = l => !!l && (l.done || (l.secs || 0) >= 120 || (l.quiz && Object.keys(l.quiz).length) || l.at);
  const routeOf = h => String(h || '').replace(/^#/, '').split('?')[0].split('#')[0];
  /** the most-asked CS topics: topics of the 2027 syllabus outside General Aptitude, by how many past questions they have (once per catalogue) */
  const topMemo = typeof WeakMap === 'function' ? new WeakMap() : null;
  function topTopics(D) {
    if (topMemo && topMemo.has(D)) return topMemo.get(D);
    const n = {};
    (D.questions || []).forEach(q => { if (q.topic && q.subject !== 'ga') n[q.topic] = (n[q.topic] || 0) + 1; });
    const list = [];
    (D.subjects || []).forEach(s => { if (s.id === 'ga') return; (s.topics || []).forEach(t => { if (n[t.id] && !(t.status && t.status !== 'in')) list.push({ s, t, n: n[t.id] }); }); });
    list.sort((a, b) => b.n - a.n || String(a.t.name).localeCompare(String(b.t.name)));
    if (topMemo) topMemo.set(D, list);
    return list;
  }
  /** the empty palette (P2-46), in groups: row 1 = the shared next step (kind 'any') with Home's label and reason; Due now (cards, the notebook's
      batch; hidden at 0); up to 2 other lessons in progress (peeks excluded); the 5 most-asked chapters with their question counts; the places that are
      not in the nav bar. Each row carries its group key. */
  function emptyRows(state, D, places, today) {
    const out = [];
    today = today || U.today();
    let step = null;
    try { if (GA.stats && typeof GA.stats.nextStep === 'function') step = GA.stats.nextStep(state, D, { kind: 'any', scope: 'all', today }); } catch (e) { step = null; }
    if (step && step.href) out.push({ ty: 'Next', k: step.label, t: step.title || step.label, c: step.reason || '', href: step.href, step: true, group: 'next' });
    const stepAt = step ? routeOf(step.href) : '';
    try {
      const d = GA.stats && typeof GA.stats.due === 'function' ? GA.stats.due(state, D, today) : null;
      const cards = d ? (typeof d.cards === 'number' ? d.cards : (d.cardIds || []).length) : 0, nb = d && Array.isArray(d.questions) ? d.questions.length : 0;
      // P2-37: today's share of the due cards (SRS.dayShare), the count the /flash hub, its session, the plan and the shared step name; in the
      // final fortnight the row goes once the day's review limit is reached
      let share = cards, over = 0;
      try {
        if (cards && GA.srs && typeof GA.srs.dayShare === 'function' && GA.stats && typeof GA.stats.season === 'function') {
          const sh = GA.srs.dayShare(state, cards, today, GA.stats.season(state, D.exam, today));
          if (sh && typeof sh.today === 'number') { share = sh.today; over = sh.over || 0; }
        }
      } catch (e) { share = cards; over = 0; }
      if (share && stepAt !== '/flash/all') out.push({ ty: 'Due', t: `Review ${U.plural(share, 'due card')}`, c: over ? `Flashcards · today's ${U.nf(share)} of ${U.nf(cards)} due` : 'Flashcards', href: '#/flash/all', group: 'due' });
      if (nb && stepAt !== '/notebook') out.push({ ty: 'Due', t: `Retry ${U.plural(Math.min(5, nb), 'missed question')}`, c: nb > 5 ? `Error notebook · the most urgent 5 of ${U.nf(nb)} due` : 'Error notebook · due today', href: '#/notebook?retry=5', group: 'due' });
    } catch (e) { /* no due counts */ }
    try {
      const ls = Object.entries(state.lessons || {}).filter(([id, l]) => D.lessonById[id] && l && !l.done && real(l) && !(step && step.id === id))
        .sort((a, b) => (b[1].last || 0) - (a[1].last || 0)).slice(0, step ? 2 : 3);
      ls.forEach(([id]) => { const l = D.lessonById[id]; out.push({ ty: 'Continue', t: l.title, c: lessonCtx(D, l), href: `#/l/${l.id}`, group: 'progress' }); });
    } catch (e) { /* malformed progress: no rows */ }
    try { topTopics(D).slice(0, 5).forEach(({ s, t, n }) => out.push({ ty: 'Topic', t: t.name, c: `${s.name} · ${U.plural(n, 'question')}`, href: `#/s/${s.id}?t=${t.id}`, group: 'top' })); } catch (e) { /* no topics */ }
    // the Go to group lists what the Me menu lists: GATE Wrapped only once there is a recap (typing 'wrapped' still finds it)
    (places || []).filter(p => p.home && !p.waits).forEach(p => out.push(Object.assign({ ty: 'Action', group: 'go' }, p)));
    return out;
  }
  const EMPTY_GROUPS = [['next', ''], ['due', 'Due now'], ['progress', 'In progress'], ['top', 'Most-asked chapters'], ['go', 'Go to']];
  /** the empty palette's rows as titled groups, in order */
  const emptyGroups = rows => EMPTY_GROUPS.map(([k, title]) => [k, title, rows.filter(r => (r.group || 'go') === k)]).filter(g => g[2].length);

  /* places for 'Jump to' (and the empty palette's `home` ones); hrefs navigate (inside the palette they replace its history entry), fn rows act in place */
  function places() {
    // GATE Wrapped is always a place (P1-26 names a Wrapped jump-to): with a recap (GA.engage.recap, the one gate, P2-36) it opens that range; without
    // one it says so and opens the page that tells what a recap still needs (the Me-menu row waits for the recap)
    let rc = null;
    try { rc = GA.engage && typeof GA.engage.recap === 'function' ? GA.engage.recap() : null; } catch (e) { rc = null; }
    const D = GA.data && GA.data.D, ps = D && Array.isArray(D.papers) ? D.papers : null, ys = ps && ps.length ? ps.map(p => p.year) : null;
    const bankLine = GA.ui && GA.ui.str && GA.ui.str.bankEmpty ? GA.ui.str.bankEmpty : 'ICAI past papers, RTPs and MTPs are being added';
    const papers = ys ? `${U.plural(ps.length, 'ICAI paper')}, ${Math.min(...ys)}–${Math.max(...ys)}` : bankLine;
    // the places carry the tab labels (P2-12: Learn, PYQs, Tests, Map); the Me pages follow the Me menu's order (planner first)
    return [
      { t: 'Home', c: 'Your next step', href: '#/', tags: 'home start' },
      { t: 'Learn', c: 'Syllabus, papers and lessons', href: '#/syllabus', tags: 'syllabus subjects papers chapters learn lessons' },
      { t: 'Questions', c: papers, href: '#/pyq', tags: 'pyq pyqs questions papers past papers rtp mtp icai bank' },
      { t: 'Tests', c: ys ? 'Past papers and full mocks' : 'Timed tests from ICAI papers, once they are added', href: '#/test', tags: 'test tests mock mocks exam timed diagnostic' },
      { t: 'Labs', c: 'Step-through simulators', href: '#/labs', tags: 'lab labs simulator interactive' },
      { t: 'Map', c: 'The whole syllabus on one page', href: '#/map', tags: 'map content overview tree prerequisites' },
      { t: 'Planner', c: 'Today’s plan', href: '#/plan', tags: 'plan planner schedule today goals', home: true },
      { t: 'Flashcards', c: 'Spaced repetition', href: '#/flash', tags: 'flash flashcards cards srs revision review', home: true },
      { t: 'Error notebook', c: 'Questions you missed', href: '#/notebook', tags: 'notebook mistakes wrong errors', home: true },
      { t: 'Formula sheets', c: 'Recap, formulas and key ideas, one page per paper', href: '#/rev', tags: 'formula formulas sheet sheets revision revise recap handbook cheat', home: true },
      { t: 'My progress', c: 'Mastery, weak topics, revision due', href: '#/progress', tags: 'progress dashboard stats analytics', home: true },
      { t: 'PassBook Wrapped', c: rc ? (rc.range && rc.range.label ? 'Your recap · ' + rc.range.label : 'Your recap') : 'Your recap · not ready yet', href: rc && rc.href ? rc.href : '#/wrapped', tags: 'wrapped recap story summary review', home: true, waits: !rc },
      { t: 'Settings', c: 'Goals, backup, theme', href: '#/settings', tags: 'settings export import backup reset theme goals', home: true },
      { t: 'Sources & method', c: 'The ICAI syllabus, Study Material and exam dates', href: '#/about', tags: 'sources method about provenance icai study material syllabus official', home: true },
      { t: 'Set exam date & daily time', c: 'Planner', href: '#/plan?set=exam', tags: 'exam date icai countdown daily time minutes paper' },
      { t: 'Keyboard shortcuts', c: 'Every key', fn: 'keys', tags: 'keyboard shortcuts keys help hotkeys', desk: true },
      { t: 'Toggle dark mode', c: 'Theme', fn: 'theme', tags: 'light dark theme mode' }
    ];
  }

  const S = { norm, canon, words, otherSpelling, index, parse, parseLocal, query, emptyRows, emptyGroups, topTopics, places, qState, ed1, ALT, SUBJ };

  /* ------------------------------------------------------------------ the palette (DOM) */
  if (hasDOM) {
    let X = null, post = null, postFailed = false, root = null, sel = 0, shown = [], filter = 'all', opener = null, ovId = null, undo = () => {}, untrap = () => {};
    const ICON = { Next: 'play', Continue: 'play', Due: 'clock', PYQ: 'target', Lesson: 'book', Subject: 'layers', Topic: 'list', Lab: 'flask', Action: 'arrow-r', Paper: 'layers', More: 'arrow-r', Offline: 'alert' };
    const ST = { ok: 'Answered right', bad: 'Missed last time', seen: 'Seen' };
    const loadPost = () => {
      postFailed = false;
      return GA.data.searchPostings().then(p => {
        const D0 = GA.data && GA.data.D, empty = !(D0 && D0.questions && D0.questions.length);
        if (p && typeof p === 'object' && Object.keys(p).length) post = p; else if (empty) post = {}; else postFailed = true;   // an empty bank has empty postings, not a failure
      }, () => { postFailed = true; }).then(() => { if (root) paint(); });
    };
    function hl(text, P) {
      if (!P || !P.terms) return esc(text);
      const low = text.toLowerCase(), marks = [];
      P.terms.forEach(t => t.alts.concat(t.fuzzy || []).forEach(alt => alt.forEach(w => [w, w && otherSpelling(w)].forEach(a => {
        if (!a || a.length < 2) return;
        let j = -1;
        while ((j = low.indexOf(a, j + 1)) >= 0) { const start = j === 0 || !/[a-z0-9]/.test(low[j - 1]); if (start || a.length >= 4) { marks.push([j, j + a.length]); break; } }
      }))));
      marks.sort((a, b) => a[0] - b[0]);
      let out = '', at = 0;
      for (const [a, b] of marks) { if (a < at) continue; out += esc(text.slice(at, a)) + '<mark>' + esc(text.slice(a, b)) + '</mark>'; at = b; }
      return out + esc(text.slice(at));
    }
    /** the field's hint, the longest that fits (a phone's narrow field would cut 'Search lessons, PYQs, labs… or “2019 cs 37”' mid-word) */
    const HINTS = ['Search lessons, chapters, labs…', 'Search lessons, labs…', 'Search lessons…', 'Lessons, labs…', 'Search'];
    function fitHint(inp) {
      try {
        const cs = getComputedStyle(inp), room = inp.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - 2;
        const c = document.createElement('canvas').getContext('2d');
        if (!c || !(room > 0)) return;
        c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        inp.placeholder = HINTS.find(h => c.measureText(h).width <= room) || HINTS[HINTS.length - 1];
      } catch (e) { /* keep the long hint */ }
    }
    let pl = [];
    /** this visit's places (GATE Wrapped's gate and the device can change between visits) */
    function freshPlaces() {
      pl = places().filter(p => !(p.desk && GA.ui.touch));
      if (!X) X = index(GA.data.D, pl);
      else X.rows = X.rows.filter(r => r.ty !== 'Action').concat(placeRows(pl));
    }
    function run(q) {
      if (!X) freshPlaces();
      if (!q.trim()) return { groups: emptyGroups(emptyRows(GA.store.state, GA.data.D, pl)), P: null };
      return query(X, q, { filter, post, postFailed, state: GA.store.state });
    }
    /* a question row's one-line snippet of its stem (P3-19), from GA.pyqLib.snippet once the question's paper file has arrived; kept for the session */
    const snips = new Map(), SNIP_N = 12;
    const snipOf = id => (snips.has(id) ? snips.get(id) : undefined);
    function fillSnips(ids) {
      const L = GA.pyqLib, want = ids.filter(id => !snips.has(id));
      if (!want.length || !L || typeof L.snippet !== 'function' || !GA.data || typeof GA.data.questions !== 'function') return;
      want.forEach(id => snips.set(id, null));                      // asked for: never twice
      Promise.resolve(GA.data.questions(want)).then(list => {
        (list || []).forEach(q => { if (q && q.id) snips.set(q.id, String(L.snippet(q, 120) || '')); });
        if (!root) return;
        U.$$('.snip[data-snip]', root).forEach(el => { const s = snips.get(el.dataset.snip); if (s) { el.textContent = s; el.removeAttribute('data-snip'); } });
      }, () => { /* the paper did not arrive: rows keep their two lines */ });
    }
    function paint() {
      const inp = U.$('#pq', root), q = inp.value;
      const res = run(q);
      shown = [].concat(...res.groups.map(gr => gr[2])); sel = Math.min(sel, Math.max(0, shown.length - 1));
      let i = 0;
      const ask = [];
      const row = r => {
        const k = i++;
        const nm = r.ty === 'Next' ? `<b class="pk">${esc(r.k)}</b> ${esc(r.t)}` : r.ty === 'PYQ' || r.ty === 'Paper' || r.more ? esc(r.t) : hl(r.t, res.P);
        const dot = r.st && ST[r.st] ? `<i class="pdot ${r.st}" aria-hidden="true"></i><span class="sr">${ST[r.st]}. </span>` : '';
        let snip = '';
        if (r.ty === 'PYQ' && r.id) {
          const s = snipOf(r.id);
          if (s) snip = `<span class="snip">${esc(s)}</span>`;
          else if (s === null || ask.length < SNIP_N) { if (s === undefined) ask.push(r.id); snip = `<span class="snip" data-snip="${esc(r.id)}"></span>`; }   // null: on its way
        }
        return `<a class="pitem${k === sel ? ' sel' : ''}${r.more ? ' more' : ''}" role="option" aria-selected="${k === sel}" id="pi-${k}" data-i="${k}" href="${r.href || '#'}"><span class="ic">${GA.icon(ICON[r.ty] || 'search')}</span><span class="ty">${esc(r.ty)}</span><span class="nm">${nm}</span><span class="ctx">${dot}${esc(r.c || '')}</span>${snip}</a>`;
      };
      const head = res.note ? `<p class="pnote">${esc(res.note)}</p>` : '';
      U.$('#pres', root).innerHTML = shown.length ? head + res.groups.map(([k, title, list]) => (title ? `<div class="grp" role="presentation">${esc(title)}</div>` : '') + list.map(row).join('')).join('')
        : `<div class="empty"><b>No matches for “${esc(q)}”</b><p>Try a topic (“joint products”), a Standard (“SA 705”), an ICAI document (“rtp sep 2026 q5”) or a concept (“materiality”).</p></div>`;
      if (shown.length) inp.setAttribute('aria-activedescendant', 'pi-' + sel); else inp.removeAttribute('aria-activedescendant');
      if (q.trim()) GA.ui.say(shown.length ? `${U.plural(shown.length, 'result')}` : 'No matches');
      if (ask.length) fillSnips(ask);
    }
    /** take the chosen row: a link replaces the palette's history entry (Back returns to the page the palette was opened on) */
    function go(i) {
      const r = shown[i]; if (!r) return;
      if (r.retry) { loadPost(); return; }
      if (r.fn) { close(); if (r.fn === 'theme') GA.ui.toggleTheme(); else if (r.fn === 'keys') GA.shell.shortcuts(); return; }
      if (!r.href) return;
      if (r.href === location.hash) { close(); return; }
      remove(false);
      GA.ui.overlay.follow(r.href);
    }
    function remove(restore) {
      if (!root) return;
      root.remove(); root = null; undo(); untrap();
      if (restore && opener && opener.isConnected && opener.focus) opener.focus({ preventScroll: true });
      opener = null;
    }
    /** close from code (Escape, Cancel, the scrim): consumes the palette's history entry and gives focus back to the opener */
    function close() { if (!root) return; const id = ovId; remove(true); if (id && GA.ui.overlay.has(id)) GA.ui.overlay.pop(id); }

    function open(prefill, from) {
      if (root) return;
      opener = from || (document.activeElement && document.activeElement !== document.body ? document.activeElement : null);
      if (!post) loadPost();
      freshPlaces();
      filter = 'all'; sel = 0;
      root = U.h('div.palette', { onmousedown: e => { if (e.target === root) close(); } },
        U.h('div.pbox', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Search' },
          U.h('div.pin', { html: GA.icon('search') + '<input id="pq" type="text" placeholder="Search lessons, chapters, labs…" autocomplete="off" spellcheck="false" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="pres" aria-autocomplete="list" enterkeyhint="go"><kbd>esc</kbd><button type="button" class="pcancel" data-pcancel>Cancel</button>' }),
          U.h('div.pfilters', { id: 'pf', role: 'radiogroup', 'aria-label': 'Show' }),
          U.h('div.pres', { id: 'pres', role: 'listbox', 'aria-label': 'Results' }),
          U.h('div.pfoot', { html: '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span>' })));
      document.body.append(root);
      undo = GA.ui.isolate(root); untrap = GA.ui.trap(root);
      const me = root;
      ovId = GA.ui.overlay.push({ id: 'palette', kind: 'palette', close: () => { if (root === me) remove(true); } });
      const pf = U.$('#pf', root);
      // the type tabs are one radio group: one tab stop, arrows move (P3-15); a mouse pick returns to the field, a keyboard pick stays on the tab
      pf.innerHTML = [['all', 'All'], ['lesson', 'Lessons'], ['topic', 'Topics'], ['pyq', 'Questions'], ['lab', 'Labs'], ['action', 'Jump to']].map(([k, l]) => `<button class="chip" data-f="${k}" type="button" role="radio" aria-checked="false">${l}</button>`).join('');
      const markF = () => U.$$('[data-f]', pf).forEach(b => { const on = b.dataset.f === filter; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
      // while the tabs can scroll further right, their edge fades (P3-50)
      const edge = () => pf.classList.toggle('more-r', pf.scrollWidth - pf.clientWidth - pf.scrollLeft > 2);
      markF();
      pf.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; filter = b.dataset.f; sel = 0; markF(); paint(); if (e.detail) U.$('#pq', root).focus(); });
      pf.addEventListener('scroll', edge, { passive: true });
      if (GA.ui.roving) GA.ui.roving(pf, { items: '[role="radio"]' });
      requestAnimationFrame(edge);
      const inp = U.$('#pq', root);
      fitHint(inp);
      if (prefill) inp.value = prefill;
      inp.addEventListener('input', () => { sel = 0; paint(); });
      root.addEventListener('keydown', e => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
        if (e.target !== inp) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % Math.max(1, shown.length); paint(); const el = U.$('.pitem.sel', root); if (el) el.scrollIntoView({ block: 'nearest' }); }
        else if (e.key === 'Enter') { e.preventDefault(); go(sel); }
      });
      U.$('[data-pcancel]', root).addEventListener('click', () => close());
      U.$('#pres', root).addEventListener('click', e => { const a = e.target.closest('.pitem'); if (a) { e.preventDefault(); go(+a.dataset.i); } });
      U.$('#pres', root).addEventListener('mousemove', e => { const a = e.target.closest('.pitem'); if (a && +a.dataset.i !== sel) { sel = +a.dataset.i; U.$$('.pitem', root).forEach((x, i) => { x.classList.toggle('sel', i === sel); x.setAttribute('aria-selected', String(i === sel)); }); U.$('#pq', root).setAttribute('aria-activedescendant', 'pi-' + sel); } });
      paint();
      setTimeout(() => { if (root === me) inp.focus(); }, 0);
    }
    S.open = open; S.close = close;
    S._run = q => run(q);
    Object.defineProperty(S, 'isOpen', { get: () => !!root });
  } else {
    S.open = S.close = () => {};
  }

  GA.search = S;
  if (typeof module !== 'undefined' && module.exports) module.exports = S;
})(typeof window !== 'undefined' ? window : globalThis);
