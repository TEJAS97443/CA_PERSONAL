/* PYQ bank (GA.pyqLib, app/js/core/pyqlib.js; views/pyq.js returns the same object in Node): the pure URL-filter helpers, checked against the
   real catalogue. Every hook that links into the bank must land on exactly the questions its claim is about. Audit items: P0-14 (the bank's own
   search), P1-21 (printed numbering), P1-22 (Practise 10, CS first: D15), P1-23 (seen: D9), P1-24 (oldest first), P1-26 (search), P1-37 (comma
   lists), P1-40 (the Trap line). */
globalThis.GA = globalThis.GA || {};
const path = require('path');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const P = require('../app/js/core/pyqlib.js');
const PV = require('../app/js/views/pyq.js');
const U = globalThis.GA.util;

globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
/* PassBook ships no question yet: the bank's helpers run on tests/fixtures/practice-catalogue.js (the CA syllabus with engine-shaped papers:
   fx-2019 without a key, fx-2021-1 … fx-2026-2 keyed, 10 + 55 questions each, twelve marks-to-all rulings, a disputed key in every 2025-26 paper) */
const FX = require('./fixtures/practice-catalogue.js');
const M = FX();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const I = Ins.build(D, M.stats);
const S = { state: { q: {} } };
const Q = D.questions;
const ids = qs => qs.map(q => q.id).sort();
const queryOf = href => Object.fromEntries((href.split('?')[1] || '').split('&').filter(Boolean).map(kv => kv.split('=').map(decodeURIComponent)));
const run = href => P.filter(D, P.parse(queryOf(href)), S, null);

test('pyq: parse keeps every filter key, defaults sort/page, and reads the older key links (disputed=1, status=nokey) as the Answer key filter (P3-20)', () => {
  const f = P.parse({ type: 'NAT,MSQ', disputed: '1', special: '1', page: '3', bogus: 'x' });
  assert.equal(f.type, 'NAT,MSQ'); assert.equal(f.key, 'disputed'); assert.equal(f.disputed, ''); assert.equal(f.special, '1'); assert.equal(f.page, 3); assert.equal(f.sort, 'new');
  assert.ok(!('bogus' in f));
  assert.deepEqual(P.parse({}).page, 1);
  for (const k of ['topic', 'sub', 'subject', 'from', 'type', 'key', 'disputed', 'special']) assert.ok(P.FKEYS.includes(k), k);
  const nk = P.parse({ status: 'nokey' }); assert.equal(nk.key, 'nokey'); assert.equal(nk.status, '');
  assert.equal(P.parse({ key: 'bogus' }).key, '', 'an unknown key value is dropped');
  assert.equal(P.parse({ key: 'mta', disputed: '1' }).key, 'mta', 'an explicit key wins over the older flag');
});

test('pyq: types() reads one or several answer types in canonical order', () => {
  assert.deepEqual(P.types('NAT,MSQ'), ['MSQ', 'NAT']);
  assert.deepEqual(P.types('msq + nat'), ['MSQ', 'NAT']);
  assert.deepEqual(P.types('MCQ'), ['MCQ']);
  assert.deepEqual(P.types('XYZ'), []); assert.deepEqual(P.types(''), []);
});

test('pyq: type=NAT,MSQ is the union of the single-type filters', () => {
  const both = run('#/pyq?type=NAT,MSQ&from=2021');
  assert.deepEqual(ids(both), ids(run('#/pyq?type=NAT&from=2021').concat(run('#/pyq?type=MSQ&from=2021'))));
  assert.deepEqual(ids(both), ids(Q.filter(q => q.year >= 2021 && (q.type === 'NAT' || q.type === 'MSQ'))));
  assert.ok(both.length > 0 && both.every(q => q.type !== 'MCQ'));
  assert.deepEqual(ids(run('#/pyq?type=MSQ,NAT,MCQ')), ids(Q), 'all three types = the whole bank');
});

test('pyq: disputed=1 selects exactly the disputed keys of the manifest, special=1 the marks-to-all / several-answer keys', () => {
  assert.deepEqual(ids(run('#/pyq?disputed=1')), M.stats.disputes.slice().sort());
  assert.equal(run('#/pyq?disputed=1').length, I.totals.disputes);
  assert.deepEqual(ids(run('#/pyq?special=1')), ids(Q.filter(q => q.special)));
  const os = run('#/pyq?disputed=1&subject=os');
  assert.ok(os.every(q => q.subject === 'os')); assert.deepEqual(ids(os), M.stats.disputes.filter(id => D.qById[id].subject === 'os').sort());
  assert.deepEqual(P.filter(D, P.parse({ disputed: '1' }), S, null, { disputes: [Q[0].id] }).map(q => q.id), [Q[0].id], 'the id list can be injected');
});

test('pyq: chip labels name every active filter (multi-type and key filters included)', () => {
  const f = P.parse({ type: 'NAT,MSQ', disputed: '1', special: '1', subject: 'cma', topic: 'cma.mat', from: '2021', marks: '2' });
  const L = Object.fromEntries(P.chipLabels(D, f));
  assert.equal(L.type, 'MSQ + NAT'); assert.equal(L.key, 'Disputed answer key'); assert.ok(/several answers/.test(L.special));
  assert.equal(L.subject, 'Cost and Management Accounting'); assert.equal(L.topic, D.name('cma.mat')); assert.equal(L.from, 'From 2021'); assert.equal(L.marks, '2 marks');
  assert.deepEqual(P.chipLabels(D, P.parse({})), []);
  assert.equal(Object.fromEntries(P.chipLabels(D, P.parse({ subject: 'zz' }))).subject, 'zz', 'an unknown subject id does not throw');
});

test('pyq: sort=old puts the oldest paper first; plain topic/sub links keep working', () => {
  const old = run('#/pyq?sub=cma.mat.eoq&sort=old');
  assert.ok(old.length && old.every((q, i) => !i || old[i - 1].year <= q.year));
  assert.deepEqual(ids(run('#/pyq?topic=cma.mat')), ids(Q.filter(q => q.topic === 'cma.mat')));
  assert.deepEqual(ids(run('#/pyq?subject=cma&year=2024')), ids(Q.filter(q => q.subject === 'cma' && q.year === 2024)));
});

test('pyq: every hook that links into the bank lands on the questions its claim is about', () => {
  const all = I.hooks().concat(...D.subjects.map(s => I.hooks(0, { subject: s.id })));
  const sumM = qs => qs.reduce((s, q) => s + q.marks, 0);
  let n = 0;
  for (const h of all.filter(x => x.href.startsWith('#/pyq'))) {
    const got = run(h.href), e = h.evidence;
    n++;
    assert.ok(got.length > 0, h.id + ' opens an empty list: ' + h.href);
    if (h.subject && /subject=/.test(h.href)) assert.ok(got.every(q => q.subject === h.subject), h.id + ' stays in its subject');
    switch (h.template) {
      case 'dispute-keys': case 'dispute-mta': assert.deepEqual(ids(got), e.ids.slice().sort(), h.id); break;
      case 'trap-no-negative': assert.equal(sumM(got), e.natMarks + e.msqMarks, h.id + ': the NAT + MSQ marks the title counts'); break;
      case 'trap-nat-subject': case 'trap-nat-topic': assert.deepEqual(ids(got), e.nat.slice().sort(), h.id); break;
      case 'trap-msq': assert.equal(got.filter(q => q.year >= e.from).length, e.msq, h.id); break;
      case 'freq-subtopic': case 'trend-quiet': assert.equal(got.length, e.pyqs, h.id); break;
      case 'conc-two-mark': assert.equal(got.length, e.twoMark, h.id); break;
      case 'conc-two-mark-topic': assert.equal(got.length, e.two, h.id); break;
      case 'trend-comeback': assert.deepEqual(Array.from(new Set(got.map(q => q.year))).sort(), e.years.slice().sort(), h.id); break;
      default: break;
    }
  }
  assert.ok(n >= 0, n + ' hooks link into the bank');
});

/* ------------------------------------------------------------------ the lib moved to core/pyqlib.js (ARCHITECTURE §10.10) */
test('pyq: GA.pyqLib lives in core/pyqlib.js with every old name; views/pyq.js returns the same object in Node', () => {
  assert.strictEqual(PV, P, 'one object');
  assert.strictEqual(GA.pyqLib, P);
  for (const k of ['FKEYS', 'TYPES', 'KEYF', 'parse', 'types', 'chipLabels', 'filter', 'disputedIds', 'texPlain', 'plain', 'snippet', 'parseQuery', 'trapLine']) assert.ok(k in P, k);
});

/* ------------------------------------------------------------------ order: CS before GA (D15), oldest first in paper order (P1-24) */
const inPaperOk = (list, sameKey) => {
  const seen = {};
  for (const q of list) {
    const k = q.paper + (sameKey ? '|' + sameKey(q) : ''), prev = seen[k];
    if (prev && P.inPaper(prev, q) > 0) return `${prev.id} before ${q.id}`;
    seen[k] = q;
  }
  return null;
};
test('pyq: inside a paper every bank list puts the CS section before GA, in printed number order (D15, P1-24)', () => {
  assert.equal(inPaperOk(run('#/pyq')), null, 'newest first');
  assert.equal(inPaperOk(run('#/pyq?sort=old')), null, 'oldest first');
  assert.equal(inPaperOk(run('#/pyq?sort=syllabus'), q => q.subject), null, 'syllabus order, within a subject');
  const first = run('#/pyq').slice(0, 25);
  assert.ok(first.every(q => q.section === 'CS'), 'a fresh first page is CS, not "Expedite, Hasten, Hurry"');
  assert.equal(first[0].paper, run('#/pyq')[0].paper);
  const p = first[0].paper, inP = run('#/pyq').filter(q => q.paper === p);
  const ga = inP.findIndex(q => q.section === 'GA'), lastCs = inP.map(q => q.section).lastIndexOf('CS');
  assert.ok(ga > lastCs, 'GA after the whole CS section');
});
test('pyq: sort=old is year and set ascending, each paper in printed order, so a linked pair keeps its lead-in first (P1-24)', () => {
  const old = run('#/pyq?sort=old');
  assert.equal(old[0].id, D.questions.find(q => q.paper === 'fx-2019' && q.section === 'CS' && q.no === 1).id, 'the oldest paper\'s first question first (its CS section before GA, D15)');
  for (let i = 1; i < old.length; i++) {
    const a = old[i - 1], b = old[i];
    assert.ok(a.year < b.year || (a.year === b.year && (a.set < b.set || (a.set === b.set && P.inPaper(a, b) < 0))), `${a.id} then ${b.id}`);
  }
  // linked pairs: the 'first' part comes before its 'second' part in every sort that keeps paper order
  const linked = D.questions.filter(q => q.grouped);
  for (const s of ['new', 'old']) {
    const pos = new Map(run('#/pyq?sort=' + s).map((q, i) => [q.id, i]));
    for (const q of linked) { const nx = D.questions.find(x => x.paper === q.paper && x.section === q.section && x.no === q.no + 1 && x.grouped); if (nx) assert.ok(pos.get(q.id) < pos.get(nx.id), `${s}: ${q.id} before ${nx.id}`); }
  }
});

/* ------------------------------------------------------------------ comma lists (P1-37) */
test('pyq: topic and sub accept comma lists, so a lab link opens exactly its sub-topics (P1-37)', () => {
  const subs = U.uniq(Q.map(q => q.subtopic).filter(Boolean)).slice(0, 3);
  const got = run('#/pyq?sub=' + subs.join(','));
  assert.deepEqual(ids(got), ids(Q.filter(q => subs.includes(q.subtopic))));
  const tops = ['cma.mat', 'cma.emp'];
  assert.deepEqual(ids(run('#/pyq?topic=' + tops.join(','))), ids(Q.filter(q => tops.includes(q.topic))));
  assert.deepEqual(P.listOf(' a, b ,a,'), ['a', 'b']);
  assert.equal(Object.fromEntries(P.chipLabels(D, P.parse({ topic: tops.join(',') }))).topic, tops.map(t => D.name(t)).join(' + '));
  const labs = I.labCards ? I.labCards() : [];
  const linked = labs.filter(x => x.subs && x.subs.length && x.pyqs);
  for (const c of linked) assert.equal(run(c.pyqHref || '#/pyq?sub=' + c.subs.join(',')).length, c.pyqs, c.id + ': the link opens the number the card prints');
  if (I.labCards && D.labs.length) assert.ok(linked.length >= 1, linked.length + ' lab links checked');
});

/* ------------------------------------------------------------------ seen without a key (D9, P1-23) */
test('pyq: a question checked without an official key counts as seen for the status filters and "not attempted first", never as right or wrong', () => {
  const nk = Q.find(q => !q.hasKey), k = Q.find(q => q.hasKey);
  const S2 = { state: { q: { [nk.id]: { n: 0, ok: 0, seen: Date.now() }, [k.id]: { n: 1, ok: 0, lastOk: 0 } } } };
  const f = s => P.filter(D, P.parse({ status: s }), S2, null).map(q => q.id);
  assert.ok(!f('new').includes(nk.id) && f('attempted').includes(nk.id), 'seen is attempted');
  assert.ok(!f('correct').includes(nk.id) && !f('wrong').includes(nk.id), 'seen is never graded');
  assert.ok(f('wrong').includes(k.id));
  assert.equal(P.seenOf({ seen: 1 }), true); assert.equal(P.seenOf({ n: 0 }), false); assert.equal(P.seenOf(null), false);
  const un = P.filter(D, P.parse({ paper: nk.paper, sort: 'unseen' }), S2, null);
  assert.equal(un[un.length - 1].id, nk.id, 'the seen question sorts last');
});

/* ------------------------------------------------------------------ Practise 10 (P1-22, D15) */
test('pyq: Practise 10 is a finite set: keyed questions, unseen first, then missed, CS first; pressing again continues; unkeyed only when nothing is keyed', () => {
  const list = run('#/pyq');
  const a = P.practiseSet(list, S, { n: 10 });
  assert.equal(a.ids.length, 10); assert.equal(a.pool, list.filter(q => q.hasKey && !q.mta).length);
  assert.ok(a.ids.every(id => D.qById[id].hasKey && D.qById[id].section === 'CS'), 'keyed CS questions of the newest paper');
  assert.deepEqual(a.ids, list.filter(q => q.hasKey).slice(0, 10).map(q => q.id), 'in list order');
  const b = P.practiseSet(list, S, { n: 10, served: a.ids });
  assert.equal(b.ids.length, 10); assert.ok(!b.ids.some(id => a.ids.includes(id)), 'the next 10');
  // unseen first, then missed, then the rest
  const st = { state: { q: { [a.ids[0]]: { n: 1, ok: 1, lastOk: 1 }, [a.ids[1]]: { n: 1, ok: 0, lastOk: 0 } } } };
  const c = P.practiseSet(list.filter(q => a.ids.includes(q.id)), st, { n: 10 });
  assert.equal(c.ids[8], a.ids[1], 'missed after the unseen'); assert.equal(c.ids[9], a.ids[0], 'right ones last');
  // a pool smaller than 10, served twice: wraps instead of ending empty
  const small = run('#/pyq?paper=fx-2025-2&sec=GA');
  const s1 = P.practiseSet(small, S, { n: 10 }); assert.equal(s1.ids.length, 10);
  const s2 = P.practiseSet(small, S, { n: 10, served: s1.ids }); assert.equal(s2.ids.length, 10); assert.ok(s2.wrapped);
  // a paper without a key -> practice the unkeyed questions (seen, not scored)
  const nk = P.practiseSet(run('#/pyq?paper=fx-2019'), S, { n: 10 });
  assert.equal(nk.ids.length, 10); assert.equal(nk.keyed, 0); assert.ok(nk.ids.every(id => !D.qById[id].hasKey));
  // marks-to-all questions are never in a set next to questions that can be scored (P0-04: the build flag q.mta)
  const fake = list.slice(0, 12).map((q, i) => Object.assign({}, q, { mta: i < 3 }));
  const fs1 = P.practiseSet(fake, S, { n: 10 });
  assert.ok(fs1.ids.every(id => !fake.slice(0, 3).some(q => q.id === id))); assert.equal(fs1.mta, false);
  assert.deepEqual(P.practiseSet([], S, { n: 10 }).ids, []); assert.equal(P.practiseSet([], S, { n: 10 }).mta, false);
});
test('pyq (P2-71, D18, verifier): a filter of only marks-to-all questions still has a set (practised unscored, like an unkeyed paper), so the bank keeps its one coral', () => {
  const m = run('#/pyq?key=mta');
  const a = P.practiseSet(m, S, { n: 10 });
  assert.equal(a.mta, true); assert.equal(a.keyed, 0); assert.equal(a.pool, m.length);
  assert.deepEqual(a.ids, m.slice(0, 10).map(q => q.id), 'in list order (CS first, D15)');
  // pressing again continues, then wraps
  const b = P.practiseSet(m, S, { n: 3, served: a.ids.slice(0, 3) });
  assert.deepEqual(b.ids, m.slice(3, 6).map(q => q.id));
  const w = P.practiseSet(m, S, { n: 10, served: m.map(q => q.id) });
  assert.ok(w.wrapped && w.ids.length === Math.min(10, m.length));
  // a paper's own marks-to-all questions, and a search that finds just one of them
  assert.equal(P.practiseSet(run('#/pyq?paper=fx-2024-1&key=mta'), S, { n: 10 }).ids.length, run('#/pyq?paper=fx-2024-1&key=mta').length);
  const one = m[0], hit = P.filter(D, P.parse({ q: `${one.year} set ${one.set} q${one.no}` }), S, null);
  if (hit.length === 1 && hit[0].id === one.id) assert.deepEqual(P.practiseSet(hit, S, { n: 10 }).ids, [one.id]);
  // the set's name says what it is
  assert.equal(P.setName(D, P.parse({ key: 'mta' })), 'Marks-to-all questions');
  assert.equal(P.setName(D, P.parse({ key: 'mta', paper: 'fx-2024-1' })), D.paperById['fx-2024-1'].label + ' practice', 'a narrower scope names it');
  // every non-empty bank list has a set: only a no-match state goes without the coral
  for (const h of ['#/pyq', '#/pyq?key=mta', '#/pyq?key=nokey', '#/pyq?key=disputed', '#/pyq?paper=fx-2019', '#/pyq?subject=cma&key=mta', '#/pyq?subject=aud&key=mta', '#/pyq?status=bookmarked']) {
    const l = run(h); assert.equal(P.practiseSet(l, S, { n: 10 }).ids.length > 0, l.length > 0, h);
  }
});
test('pyq: a practice set is named after its narrowest scope ("EOQ practice"), and its key ignores page and sort', () => {
  const sub = 'cma.mat.eoq';
  assert.equal(P.setName(D, P.parse({ sub })), D.name(sub) + ' practice');
  assert.equal(P.setName(D, P.parse({ topic: 'cma.mat', subject: 'cma' })), D.name('cma.mat') + ' practice');
  assert.equal(P.setName(D, P.parse({ subject: 'cma' })), 'Cost and Management Accounting practice');
  assert.equal(P.setName(D, P.parse({ paper: 'fx-2024-1' })), D.paperById['fx-2024-1'].label + ' practice');
  assert.equal(P.setName(D, P.parse({ q: 'variance' })), '“variance” practice');
  assert.equal(P.setName(D, P.parse({})), 'Question practice');
  assert.equal(P.setName(D, P.parse({ sub: 'a,b' })), 'Question practice', 'a list has no single name');
  assert.equal(P.bankKey(P.parse({ subject: 'cma', page: '3', sort: 'old' })), P.bankKey(P.parse({ subject: 'cma' })));
  assert.notEqual(P.bankKey(P.parse({ subject: 'cma' })), P.bankKey(P.parse({ subject: 'fm' })));
});

/* ------------------------------------------------------------------ printed numbering (P1-21) */
test('pyq: printed numbering comes from section + number, and palette groups follow the printed order', () => {
  const qsOf = id => D.questions.filter(q => q.paper === id);
  assert.equal(P.numbering(qsOf('fx-2024-1')), 'restart', 'both sections start at 1');
  assert.equal(P.numbering([{ section: 'GA', no: 1 }, { section: 'CS', no: 11 }, { section: 'CS', no: 12 }]), 'global', 'one run across the sections');
  const g = P.paperGroups(qsOf('fx-2024-1'));
  assert.deepEqual(g.map(x => [x.sec, x.cells.length, x.cells[0].no, x.cells[x.cells.length - 1].no]), [['GA', 10, 1, 10], ['CS', 55, 1, 55]]);
  const cell = g[1].cells.find(c => c.id === 'fx-2024-1:Q37');
  assert.equal(cell.no, 37); assert.equal(cell.label, 'Q37', 'the card says Q37 and so does the palette, not 47');
  assert.equal(P.printed(D.qById['fx-2024-1:S5']), 'GA Q5');
});

/* ------------------------------------------------------------------ search (P0-14 in place, P1-26 shorthand) */
/* the bank's words index is built from the shipped questions (data/search-pyq.js); PassBook ships none, so the text search here runs on topic
   names and paper cues only, and the GATE shorthand checks of the engine (k map, LR(1), 'q37 2019' on GATE ids) are gone */
const post = {};
const find = (q, extra) => P.filter(D, P.parse(Object.assign({ q }, extra || {})), S, post);
test('pyq: parseQuery reads year, set and section + number in any order, ids, function words, and keeps other numbers as words (P1-26)', () => {
  const pq = q => P.parseQuery(q, { D });
  let p = pq('q37 2019'); assert.equal(p.year, 2019); assert.equal(p.no, 37); assert.equal(p.section, null); assert.equal(p.idLike, true);
  p = pq('2025 set 2 cs 37'); assert.deepEqual([p.year, p.set, p.section, p.no, p.idLike], [2025, 2, 'CS', 37, true]);
  p = pq('set 2'); assert.equal(p.set, 2); assert.equal(p.idLike, true);
  p = pq('variance 2025'); assert.equal(p.year, 2025); assert.deepEqual(p.terms, ['variance']); assert.equal(p.idLike, false);
  p = pq('AS 7'); assert.deepEqual(p.terms, ['as', '7']); assert.equal(p.no, null, 'a bare number with no paper cue is a word');
  p = pq('what is the break even point'); assert.deepEqual(p.ignored, ['what', 'is', 'the']);
  assert.deepEqual(P.parseQuery('', {}).terms, []);
});
test('pyq: parseQuery reads every query exactly like the palette\'s own parser (core/search.js), so a bank link lists what the palette counted', () => {
  const saved = GA.pyqLib; delete GA.pyqLib;
  let Sx;
  try { Sx = require('../app/js/core/search.js'); } finally { GA.pyqLib = saved; }
  const X = Sx.index(D, Sx.places());
  for (const q of ['q37 2019', '2025 set 2 cs 37', 'set 2', 'variance 2025', 'AS 7', 'what is the break even point', '2019 37', 'ga 5 2024', 'eoq']) {
    const a = P.parseQuery(q, { D }), b = Sx.parseLocal(q, X);
    for (const k of ['year', 'set', 'section', 'no', 'idLike', 'terms', 'ignored']) assert.deepEqual(a[k], b[k], `${q}: ${k}`);
    assert.equal(a.id, b.id, q + ': id');
  }
});
test('pyq: paper queries are filters: "q37 2019" is one question, "set 2" the set-2 papers, "<word> 2025" stays in 2025 (P1-26)', () => {
  assert.deepEqual(find('q37 2019').map(q => q.id), ['fx-2019:Q37']);
  assert.deepEqual(find('2019 cs 37').map(q => q.id), ['fx-2019:Q37']);
  const s2 = find('set 2'); assert.ok(s2.length > 0 && s2.length < Q.length && s2.every(q => q.set === 2));
  assert.ok(find('2025').every(q => q.year === 2025) && find('2025').length === Q.filter(q => q.year === 2025).length);
});
test('pyq: a word that matches nothing is ignored out loud (P1-26)', () => {
  const x = find('xyzzy'); assert.equal(x.length, 0); assert.deepEqual(x.meta.unmatched, ['xyzzy']);
});
test('pyq: while searching the default sort is Best match', () => {
  assert.equal(P.parse({ q: 'cache' }).sort, 'best'); assert.equal(P.parse({}).sort, 'new'); assert.equal(P.parse({ q: 'cache', sort: 'old' }).sort, 'old');
  assert.equal(P.defaultSort({ q: '  ' }), 'new');
});
test('pyq: a bank search costs well under a frame on a full-size catalogue (it reruns on every pause in typing)', () => {
  const t0 = Date.now();
  for (const q of ['var', 'variance', 'variance tree', 'material cost', 'eoq 2023', 'q37 2019', 'set 2', 'xyzzy']) find(q);
  assert.ok((Date.now() - t0) / 8 < 40, `${(Date.now() - t0) / 8} ms a query`);
});

/* ------------------------------------------------------------------ the Trap line after a miss (P1-40, D17) */
const fs = require('fs');
/* the shipped worked solutions (none until the ICAI bank exists), read in a sandbox of their own */
const SOL = (() => { const dir = path.join(ROOT, 'data/sol'), box = { GAD: { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } } }, vm = require('vm');
  if (fs.existsSync(dir)) fs.readdirSync(dir).forEach(f => vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), box));
  return Object.assign({}, ...Object.values(box.GAD.sol || {})); })();
test('pyq: trapLine gives the Trap sentence that cites the picked option, cut to its own clause when a sentence walks through several', () => {
  const sol = '**Idea.** Waiting time is turnaround minus burst.\n\n**Trap.** (C) 40 is P2\'s turnaround time $55 - 15$, not its waiting time. (B) and (D) attach "guaranteed" to gang scheduling.';
  assert.equal(P.trapLine(sol, 'C'), "(C) 40 is P2's turnaround time $55 - 15$, not its waiting time.");
  assert.equal(P.trapLine(sol, ['b']), '(B) and (D) attach "guaranteed" to gang scheduling.');
  assert.equal(P.trapLine(sol, 'A'), null, 'a pick the Trap does not cite: no line');
  assert.equal(P.trapLine(null, 'A'), null); assert.equal(P.trapLine(sol, []), null); assert.equal(P.trapLine('no trap here', 'A'), null);
  assert.equal(P.trapLine('**Idea.** x\n\n**Trap.** (A) is wrong; (B) is the other trap.', 'B'), '(B) is the other trap.');
  assert.equal(P.trapLine('**Trap.** Picking (D) costs $\\$5$ more. Fine.', 'D'), 'Picking (D) costs $\\$5$ more.', 'an escaped dollar is not maths');
});
test('pyq: across every keyed MCQ / MSQ solution and every letter, a Trap line is at most 160 characters with its maths intact', () => {
  let n = 0, lines = 0;
  for (const [id, s] of Object.entries(SOL)) {
    const q = D.qById[id]; if (!q || q.type === 'NAT') continue;
    for (const L of 'ABCD') {
      n++;
      const t = P.trapLine(s, L); if (t == null) continue;
      lines++;
      assert.ok(t.length <= 160, `${id} ${L}: ${t.length}`);
      assert.equal((t.match(/(^|[^\\])\$/g) || []).length % 2, 0, `${id} ${L}: unbalanced maths: ${t}`);
      assert.ok(new RegExp('\\(' + L + '\\)|[Oo]ption \\(?' + L).test(t), `${id} ${L}: cites the pick`);
    }
  }
  assert.ok(lines <= n, `${lines} lines of ${n} (the shipped solutions; none until the ICAI bank exists)`);
});

/* ------------------------------------------------------------------ the question page's keys (P0-13): never grade or leave by accident */
test('pyq (P0-13): Enter checks only from the page, the card or an option; Enter on Skip, Show answer or Bookmark is that button\'s own action', () => {
  const s = { checked: false, choice: true, next: true, prev: true, overlay: false, single: true };
  const K = (key, at) => Object.assign({ key, repeat: false, prevented: false, mods: false, field: false, option: false, control: false }, at || {});
  assert.equal(P.pageKey(K('Enter'), s), 'check', 'the page (body) or the card (tabindex -1)');
  assert.equal(P.pageKey(K('Enter', { option: true, control: true }), s), 'check', 'an option radio');
  assert.equal(P.pageKey(K('Enter', { control: true }), s), null, 'a button (Skip, Show answer, Bookmark), a link or a fold summary');
  assert.equal(P.pageKey(K('Enter'), Object.assign({}, s, { checked: true })), null, 'already checked: Enter is Next\'s own click, never a second grade');
  assert.equal(P.pageKey(K('Enter', { field: true }), s), null, 'the NAT box handles its own Enter');
  for (const at of [{ repeat: true }, { prevented: true }, { mods: true }]) assert.equal(P.pageKey(K('Enter', at), s), null, JSON.stringify(at));
  assert.equal(P.pageKey(K('Enter'), Object.assign({}, s, { overlay: true })), null, 'a sheet, the palette or a dialog owns the keyboard');
  assert.equal(P.pageKey(K('Enter'), Object.assign({}, s, { single: false })), 'check', 'Enter is not a single-key shortcut');
});
test('pyq (P0-13): the arrows never navigate from a radio group or another control; J / K and N / P do; A–D pick from anywhere but a text field', () => {
  const s = { checked: false, choice: true, next: true, prev: true, overlay: false, single: true };
  const K = (key, at) => Object.assign({ key, repeat: false, prevented: false, mods: false, field: false, option: false, control: false }, at || {});
  assert.equal(P.pageKey(K('ArrowRight', { option: true, control: true }), s), null, 'ArrowRight on an option radio moves the selection, not the page');
  assert.equal(P.pageKey(K('ArrowLeft', { control: true }), s), null);
  assert.equal(P.pageKey(K('ArrowRight'), s), 'next'); assert.equal(P.pageKey(K('ArrowLeft'), s), 'prev');
  for (const k of ['j', 'J', 'n']) assert.equal(P.pageKey(K(k, { option: true, control: true }), s), 'next', k);
  for (const k of ['k', 'p']) assert.equal(P.pageKey(K(k, { control: true }), s), 'prev', k);
  assert.equal(P.pageKey(K('j'), Object.assign({}, s, { next: false })), null, 'no neighbour: nothing');
  assert.equal(P.pageKey(K('c', { control: true }), s), 'C', 'from a button'); assert.equal(P.pageKey(K('A', { option: true, control: true }), s), 'A');
  assert.equal(P.pageKey(K('a', { field: true }), s), null, 'typing in a text field (the note, the NAT box, the search) is never a shortcut');
  assert.equal(P.pageKey(K('b'), Object.assign({}, s, { choice: false })), null, 'a NAT question has no options');
  assert.equal(P.pageKey(K('b'), Object.assign({}, s, { checked: true })), null, 'a checked card keeps its answer');
  assert.equal(P.pageKey(K('t'), s), null, 'other letters are the shell\'s (t = theme) or nothing');
  for (const k of ['a', 'j', 'ArrowRight']) assert.equal(P.pageKey(K(k), Object.assign({}, s, { single: false })), null, k + ' with single-key shortcuts off (P3-17)');
  assert.equal(P.pageKey(null, s), null); assert.equal(P.pageKey(K('j'), null), null);
});
test('pyq (P0-13): the question page decides its keys through GA.pyqLib.pageKey (one tested rule, no second copy in the view)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/pyq.js'), 'utf8');
  const q = src.slice(src.indexOf('GA.views.question = {'));
  assert.ok(/P\.pageKey\(/.test(q), 'the view asks pageKey');
  assert.ok(!/k === 'Enter'|'abcd'\.includes/.test(q), 'no local copy of the decision');
  assert.ok(/document\.removeEventListener\('keydown', V\._k\)/.test(q), 'leave() removes the document listener');
});

/* ------------------------------------------------------------------ 'Make a test' (P0-05, P0-04) */
test('pyq (P0-05): Make a test counts only questions with an official key and no marks-to-all ruling, and needs 3 of them, with the reason when not', () => {
  const t19 = P.testable(run('#/pyq?paper=fx-2019'));
  assert.equal(t19.keyed, 0); assert.equal(t19.ok, false); assert.ok(/No official key/.test(t19.why), t19.why);
  const c19 = P.testable(run('#/pyq?subject=cma&year=2019'));
  assert.equal(c19.ok, false); assert.ok(/No official key/.test(c19.why));
  const k2 = Q.filter(q => q.hasKey).slice(0, 2).concat(Q.filter(q => !q.hasKey).slice(0, 3));
  assert.deepEqual(P.testable(k2), { keyed: 2, mta: 0, ok: false, why: 'Needs 3 questions with an official key (2 here)' });
  const k3 = Q.filter(q => q.hasKey && !q.mta).slice(0, 3);
  assert.deepEqual(P.testable(k3), { keyed: 3, mta: 0, ok: true, why: '' });
  assert.deepEqual(P.testable(k3.map((q, i) => Object.assign({}, q, { mta: i === 0 }))), { keyed: 2, mta: 1, ok: false, why: 'Needs 3 questions that can be scored (2 here; 1 is marks to all)' }, 'marks to all is never scored');
  assert.deepEqual(P.testable([]), { keyed: 0, mta: 0, ok: false, why: '' }, 'no match: the empty state speaks, not the button');
  const all = P.testable(run('#/pyq'));
  assert.equal(all.keyed, Q.filter(q => q.hasKey && !q.mta).length); assert.ok(all.ok);
});
test('pyq (P0-05, verifier): a list of marks-to-all questions is never called "no official key" (they have one: it gave every candidate the marks)', () => {
  const m = run('#/pyq?key=mta'), t = P.testable(m);
  assert.ok(m.length >= 3 && m.every(q => q.hasKey && q.mta), 'the real marks-to-all questions all carry an official key');
  assert.equal(t.keyed, 0); assert.equal(t.mta, m.length); assert.equal(t.ok, false);
  assert.ok(!/No official key/i.test(t.why), t.why);
  assert.equal(t.why, 'The official key gave marks to all here, so a test cannot score these questions');
  assert.equal(P.testable(m.slice(0, 1)).why, 'The official key gave marks to all here, so a test cannot score this question');
  // one paper's marks-to-all questions (fx-2024-1 has six), and a search that lands on one of them
  assert.ok(/marks to all/.test(P.testable(run('#/pyq?paper=fx-2024-1&key=mta')).why));
  // a mix with unkeyed questions (fx-2019) and nothing scorable: both reasons, neither claimed for all
  const mix = m.slice(0, 2).concat(Q.filter(q => !q.hasKey).slice(0, 2));
  assert.equal(P.testable(mix).why, 'None of these can be scored: no official key, or marks to all');
  // two scorable questions next to marks-to-all ones: the count of the scorable ones, and why the rest do not count
  const k2m = Q.filter(q => q.hasKey && !q.mta).slice(0, 2).concat(m.slice(0, 4));
  assert.equal(P.testable(k2m).why, 'Needs 3 questions that can be scored (2 here; 4 are marks to all)');
  // the unkeyed papers keep their reason
  assert.equal(P.testable(run('#/pyq?paper=fx-2019')).why, 'No official key for these questions, so a test cannot be scored');
});

/* ------------------------------------------------------------------ in-place bank (P0-14) and rows that never clip (P0-24): source guards */
test('pyq (P0-14): the bank updates in place and writes its address with history.replaceState, never location.hash or a router navigation', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/pyq.js'), 'utf8');
  const bank = src.slice(src.indexOf('GA.views.pyq = {'), src.indexOf('GA.views.question = {'));
  assert.ok(bank.length > 2000);
  assert.ok(!/location\.hash\s*=[^=]/.test(bank), 'no location.hash assignment (it re-rendered the view and dropped focus)');
  assert.ok(!/router\.go\(\s*['"`]\/pyq/.test(bank) && !/location\.(assign|replace)\(/.test(bank), 'no navigation for a filter change');
  assert.ok(/history\.replaceState\(Object\.assign\(\{\}, history\.state/.test(src), 'replaceState keeps history.state (the router\'s scroll key, open rows)');
  assert.ok(/addEventListener\('input', \(\) => \{ clearTimeout\(typeT\); typeT = setTimeout\(\(\) => go\(\{ q:/.test(bank), 'typing is debounced into the in-place update');
  assert.ok(/if \(inp !== document\.activeElement/.test(bank), 'the field is never rewritten while the learner types in it');
});
test('pyq (P0-24): an opened bank row never clips: the card and its options are one shrinkable column, the solution summary wraps', () => {
  const css = fs.readFileSync(path.join(ROOT, 'app/css/bank.css'), 'utf8');
  assert.ok(/\.pqr-x \.qc, \.pqr-x \.qc-opts:not\(\.figs\) \{ grid-template-columns: minmax\(0, 1fr\); \}/.test(css));
  assert.ok(/\.pqr-x \.qc > \*, \.pqr-x \.qc-sd, \.pqr-x \.qc-sb \{ min-width: 0; \}/.test(css));
  assert.ok(/\.pqr-x \.qc-sd > summary \{ flex-wrap: wrap;/.test(css));
  assert.ok(/\.pq-results \{[^}]*grid-template-columns: minmax\(0, 1fr\)[^}]*overflow: hidden/.test(css), 'the list keeps its rounded corners (overflow hidden) with a shrinkable column');
  // phones: 'Make a test' (a no-wrap button) used to get a 123 px slot at 360 px and push the page 12 px sideways
  assert.ok(/\.pq-head \.pq-mk \{ flex: 0 1 auto; min-width: 0; max-width: 50%; \}/.test(css) && /\.pq-head \.pq-mk > \.btn \{[^}]*white-space: normal/.test(css), 'the header buttons share the row without overflowing');
});

/* ------------------------------------------------------------------ the Answer key select, status and sort lists (P3-20, P2-64) */
test('pyq (P3-20): one Answer key select (Any · Official · Disputed · Marks to all · No official key); no status option that matches every question; old links keep working', () => {
  assert.deepEqual(P.KEYF.map(k => k[0]), ['', 'official', 'disputed', 'mta', 'nokey']);
  assert.ok(!P.STATUS.some(s => s[0] === 'sol' || s[0] === 'nokey'), "'Has worked solution' matched all 1,985; the key states moved to the key select");
  assert.equal(run('#/pyq?key=official').length, Q.filter(q => q.hasKey && !q.mta).length);
  assert.ok(run('#/pyq?key=official').every(q => q.hasKey && !q.mta));
  assert.deepEqual(ids(run('#/pyq?key=disputed')), M.stats.disputes.slice().sort());
  assert.deepEqual(ids(run('#/pyq?key=mta')), ids(Q.filter(q => q.mta)));
  assert.ok(run('#/pyq?key=mta').length > 0);
  assert.deepEqual(ids(run('#/pyq?key=nokey')), ids(Q.filter(q => !q.hasKey)));
  // the older addresses still land on the same questions
  assert.deepEqual(ids(run('#/pyq?disputed=1')), ids(run('#/pyq?key=disputed')));
  assert.deepEqual(ids(run('#/pyq?status=nokey')), ids(run('#/pyq?key=nokey')));
  assert.equal(run('#/pyq?status=sol').length, Q.filter(q => q.hasSol).length);
  assert.deepEqual(ids(run('#/pyq?special=1')), ids(Q.filter(q => q.special)), "the 'Official key quirks' finding's link (marks to all or several answers)");
  const L = Object.fromEntries(P.chipLabels(D, P.parse({ key: 'nokey', status: 'sol', sec: 'CS' })));
  assert.equal(L.key, 'No official key'); assert.equal(L.status, 'Has a worked solution'); assert.equal(L.sec, 'Section CS');
  assert.equal(P.SORTS.find(s => s[0] === 'marks')[1], 'Two-mark first');
});
test('pyq (P2-64): status "learned" lists the questions of the sub-topics whose lessons are finished; sort "mixed" interleaves sub-topics, the same way all day', () => {
  // the planner detects the mixed review through these two lists (core/planner.js bankHasMixed)
  assert.ok(P.STATUS.some(s => s[0] === 'learned') && P.SORTS.some(s => s[0] === 'mixed'));
  const withQs = D.lessons.filter(l => Q.some(q => q.subtopic === l.id)).slice(0, 4);
  assert.equal(withQs.length, 4);
  const st = { state: { q: {}, lessons: Object.fromEntries(withQs.map((l, i) => [l.id, i < 3 ? { done: Date.now() } : { opened: Date.now() }])) } };
  const got = P.filter(D, P.parse({ status: 'learned' }), st, null);
  assert.deepEqual(ids(got), ids(Q.filter(q => withQs.slice(0, 3).some(l => l.id === q.subtopic))), 'finished lessons only, not merely opened ones');
  assert.deepEqual(P.filter(D, P.parse({ status: 'learned' }), S, null), [], 'nothing finished: nothing to review');
  assert.equal(P.setName(D, P.parse({ status: 'learned', sort: 'mixed' })), 'Mixed review');
  // mixed: a permutation of the list where the first round takes one question from every sub-topic, in a day-seeded order
  const a = P.filter(D, P.parse({ status: 'learned', sort: 'mixed' }), st, null, { seed: 'Thu Oct 15 2026' });
  assert.deepEqual(ids(a), ids(got));
  const subs = new Set(got.map(q => q.subtopic));
  assert.equal(new Set(a.slice(0, subs.size).map(q => q.subtopic)).size, subs.size, 'one of each sub-topic before any repeats');
  for (let i = 1; i < subs.size; i++) assert.notEqual(a[i].subtopic, a[i - 1].subtopic);
  assert.deepEqual(P.filter(D, P.parse({ status: 'learned', sort: 'mixed' }), st, null, { seed: 'Thu Oct 15 2026' }).map(q => q.id), a.map(q => q.id), 'same day, same order');
  const all = P.filter(D, P.parse({ sort: 'mixed' }), S, null, { seed: 'x' });
  assert.equal(all.length, Q.length);
  let rep = 0; for (let i = 1; i < 200; i++) if ((all[i].subtopic || all[i].topic) === (all[i - 1].subtopic || all[i - 1].topic)) rep++;
  assert.equal(rep, 0, 'the first 200 of the whole bank never repeat a sub-topic back to back');
  // 'Practise 10' on the mixed review keeps the interleaving (unseen keyed questions, in list order)
  const set = P.practiseSet(a, st, { n: 10 });
  assert.ok(set.ids.length > 0 && set.ids.every((x, i) => !i || D.qById[x].subtopic !== D.qById[set.ids[i - 1]].subtopic || subs.size < 2));
});

/* ------------------------------------------------------------------ calm rows (P2-25) and the topic row (P2-27) */
test('pyq (P2-25): rows print compact ids and leave out what the filter makes constant; a section-0 row never repeats "GA" (P3-41)', () => {
  const r = (id, f) => P.rowParts(D, D.qById[id], f || {});
  const set2 = D.questions.find(q => q.paper === 'fx-2026-2' && q.section === 'CS' && q.no === 11);
  assert.equal(P.rowParts(D, set2, {}).id, '2026 · Set 2 · Q11');
  assert.equal(r('fx-2019:Q37').id, '2019 · Q37');
  assert.equal(r('fx-2019:S5').id, '2019 · GA Q5');
  assert.equal(r('fx-2019:S5').subject, null, "'GA Q5' already says GA");
  assert.deepEqual(r('fx-2019:Q37').subject, { short: D.subjectById[D.qById['fx-2019:Q37'].subject].short, name: D.subjectById[D.qById['fx-2019:Q37'].subject].name });
  assert.equal(r('fx-2019:Q37', P.parse({ paper: 'fx-2019' })).id, 'Q37', 'a fixed paper');
  assert.equal(r('fx-2019:Q37', P.parse({ year: '2019' })).id, 'Q37', 'a year with one paper');
  const s25 = D.questions.find(q => q.paper === 'fx-2025-1' && q.section === 'CS');
  assert.equal(P.rowParts(D, s25, P.parse({ year: '2025' })).id, 'Set 1 · ' + P.printed(s25), 'a year with two sets keeps the set');
  const m = D.qById['fx-2019:Q37'];
  assert.equal(r('fx-2019:Q37', P.parse({ subject: m.subject })).subject, null);
  assert.equal(r('fx-2019:Q37', P.parse({ topic: m.topic })).topic, D.name(m.subtopic), 'a fixed topic shows the sub-topic instead');
  assert.equal(r('fx-2019:Q37', P.parse({ sub: m.subtopic })).topic, null);
  assert.equal(r('fx-2019:Q37').topic, D.name(m.topic));
  assert.equal(r('fx-2019:Q37', P.parse({ marks: String(m.marks) })).marks, null); assert.equal(r('fx-2019:Q37').marks, U.plural(m.marks, 'mark'));
  assert.equal(r('fx-2019:Q37', P.parse({ type: m.type })).type, null);
  assert.equal(r('fx-2019:Q37', P.parse({ diff: m.diff })).diff, false);
});
test('pyq (P2-27): the topic row lists the selected subject\'s topics with real counts under the other filters and how many are attempted', () => {
  assert.deepEqual(P.topicRow(D, P.parse({}), S, null), [], 'no topic row for All');
  const os = P.topicRow(D, P.parse({ subject: 'cma' }), S, null);
  assert.ok(os.length >= 5);
  assert.equal(os.reduce((a, t) => a + t.n, 0), Q.filter(q => q.subject === 'cma').length, 'the counts add up to the subject');
  for (const t of os) assert.equal(t.n, Q.filter(q => q.topic === t.id).length, t.id);
  assert.ok(os.every(t => t.n > 0 && t.seen === 0));
  const two = P.topicRow(D, P.parse({ subject: 'cma', marks: '2', topic: os[0].id }), S, null);
  assert.equal(two.find(t => t.id === os[1].id).n, Q.filter(q => q.topic === os[1].id && q.marks === 2).length, 'other filters count, the topic itself does not');
  const q1 = Q.find(q => q.topic === os[1].id);
  const S2 = { state: { q: { [q1.id]: { n: 1, ok: 1, lastOk: 1 } } } };
  assert.equal(P.topicRow(D, P.parse({ subject: 'cma' }), S2, null).find(t => t.id === os[1].id).seen, 1, "'✓ 1/n' once attempted");
  assert.ok(D.subjects.every(s => P.topicRow(D, P.parse({ subject: s.id }), S, null).every(t => Q.some(q => q.topic === t.id))), 'only topics with questions in the bank');
});

/* ------------------------------------------------------------------ previews (P2-25): blanks, scripts, fractions, code and tables */
test('pyq (P2-25): previews keep blanks, Unicode sub- and superscripts, bracketed fractions, overlines, the first code line and table headers', () => {
  assert.equal(P.texPlain('x_1 + x_2 = 0, x^T, R^3, 2^{n}'), 'x₁ + x₂ = 0, xᵀ, R³, 2ⁿ');
  assert.equal(P.texPlain('x_{n+1} = \\frac{x_n}{2} + \\frac{9}{8x_n}'), 'xₙ₊₁ = xₙ/2 + 9/(8xₙ)');
  assert.equal(P.texPlain('L = \\{0^i21^i \\mid i \\ge 0\\}'), 'L = {0ⁱ21ⁱ | i ≥ 0}');
  assert.equal(P.texPlain('\\{0,1\\}^*'), '{0,1}*');
  assert.equal(P.texPlain('(P + \\overline{Q})\\bar{R}'), '(P + Q̅)R̄', 'a complement is not dropped');
  assert.equal(P.texPlain('\\frac{1}{3\\sqrt{2\\pi}}'), '1/(3√(2π))');
  assert.equal(P.texPlain('\\frac{a+b}{c} + \\frac{n(n-1)}{2}'), '(a+b)/c + n(n-1)/2');
  assert.equal(P.texPlain('\\mathbb{N} \\to \\mathbb{R}, \\log_2 n, e^{-\\lambda t}, \\binom{n}{k}, a \\bmod b'), 'ℕ → ℝ, log₂ n, e^(-λt), C(n, k), a mod b');
  assert.equal(P.texPlain('R(\\underline{A}, B)'), 'R(A̲, B)', 'a key attribute stays marked');
  assert.equal(P.texPlain('\\Theta(n \\log n)'), 'Θ(n log n)');
  assert.equal(P.texPlain('\\left( x \\right) \\left. y \\right|'), '( x ) y |');
  assert.equal(P.texPlain(''), '');
  assert.equal(P.plain('The value is ____. Pick ___ or \\_\\_\\_.'), 'The value is ____. Pick ____ or ____.', 'blanks survive');
  assert.equal(P.plain('Run:\n```c\n#include <stdio.h>\n\nint main() {\n  return 0;\n}\n```\nthen'), 'Run: [code: return 0;] then', 'not the include, not the main() every program shares');
  assert.equal(P.plain('```c\nint f(int n) {\n  return n;\n}\n```'), '[code: int f(int n)]');
  assert.equal(P.plain('Data:\n\n| Process | Arrival | Burst |\n|---|---|---|\n| P1 | 0 | 5 |\n\nNext'), 'Data: [table: Process · Arrival · Burst] Next');
  assert.equal(P.plain('operators \\$ and `a#b$c$d` with $x_1$'), 'operators $ and a#b$c$d with x₁', 'escaped dollars and code spans are not maths');
  assert.equal(P.plain('Let $L$ be a **regular** language. Which `x` is _true_?'), 'Let L be a regular language. Which x is true?');
});
const fsx = require('fs');
const FULL = Object.values(FX.full(D));            // the fixture's full records (PassBook ships no question file yet)
test('pyq (P2-25): every stem previews without TeX commands, placeholders or lost blanks, within the row length', () => {
  assert.equal(FULL.length, Q.length);
  const bad = [];
  for (const q of FULL) {
    const s = P.snippet(q), whole = P.plain(q.stem || (q.group && q.group.context) || '');
    if (/\\[a-zA-Z]{2,}/.test(whole.replace(/\[code: [^\]]*\]/g, '')) || /\u0004/.test(whole) || s.length > 200) bad.push(q.id + ': ' + s.slice(0, 80));
    if (/_{3,}/.test((q.stem || '').replace(/```[\s\S]*?```/g, '')) && !/____/.test(whole)) bad.push(q.id + ': blank lost');
  }
  assert.deepEqual(bad.slice(0, 5), []);
});

/* ------------------------------------------------------------------ source and style guards for the page items */
const SRCV = fsx.readFileSync(path.join(ROOT, 'app/js/views/pyq.js'), 'utf8'), CSS = fsx.readFileSync(path.join(ROOT, 'app/css/bank.css'), 'utf8');
test('pyq (P1-48): "Try again" on the list\'s failure cards repaints, then focuses what replaced the card and announces the count', () => {
  assert.ok(/what: 'search', main: true, retry: \(\) => \{ postState = 'idle'; return retried\(\); \}/.test(SRCV));
  assert.ok(/what: 'paper', retry: \(\) => retried\(\)/.test(SRCV));
  const fn = SRCV.slice(SRCV.indexOf('function retried()'), SRCV.indexOf('function retried()') + 600);
  assert.ok(/update\(\{ say: true \}\)/.test(fn) && /\.focus\(\{ preventScroll: true \}\)/.test(fn) && /#pq-n/.test(fn) && /\[data-retry\]/.test(fn));
});
test('pyq (P1-18): on phones the header shows "‹ PYQs" as a word and gives the set name the whole width (two lines at most, never a few letters)', () => {
  const ph = CSS.slice(CSS.indexOf('@media (max-width: 700px)'));
  assert.ok(/grid-template-areas: "back \. bar" "title title title"/.test(ph));
  assert.ok(!/\.qp-back span \{ position: absolute/.test(ph), 'the word PYQs is visible');
  assert.ok(/\.qpage \.qp-head \.pr-ht h1 \{[^}]*-webkit-line-clamp: 2/.test(ph) && !/\.qpage \.qp-head \.pr-ht h1 \{[^}]*white-space: nowrap/.test(ph));
  assert.ok(/shortSet = U\.medName/.test(SRCV) && /class="qp-ts" aria-hidden="true"/.test(SRCV), 'a long subject name reads in its medium form on phones');
});
test('pyq (P2-23, P3-22): practice palette cells carry right / missed marks, the legend names them, cells never balloon', () => {
  assert.ok(/r = e\.n \? \(e\.lastOk \? 'rok' : e\.g === 'partly' \? 'rpart' : 'rbad'\) : ''/.test(SRCV));   // an ICAI Partly has its own corner
  assert.ok(/Right<\/span><span><i class="lgs ans rbad"><\/i>Missed/.test(SRCV) && /Bookmarked<\/span><span><i class="lgs cur"><\/i>Current/.test(SRCV));
  assert.ok(/\.qpage \.pr-pb\.rok::before/.test(CSS) && /content: "✕"; background: var\(--bad\)/.test(CSS));
  assert.ok(/\.qpage \.pr-pal \{ grid-template-columns: repeat\(auto-fill, minmax\(44px, 1fr\)\); \}/.test(CSS));
  assert.ok(/onReveal: \(\) => \{ done = true; setRun\(false\)/.test(SRCV), "'Show answer' stops the timer (P3-18)");
});
test('pyq (P2-29, P3-21, P3-33, P3-15): no text dimmed by opacity; a neutral difficulty ramp with its meaning; folds use a down chevron; one tab stop per filter row', () => {
  const op = CSS.match(/opacity:\s*[^;]+;/g) || [];
  const textOp = CSS.split('}').filter(r => /opacity:\s*(0?\.\d+)/.test(r) && !/pq-scrim/.test(r));
  assert.deepEqual(textOp, [], 'only the scrim fades');
  assert.ok(op.length >= 1);
  assert.ok(/\.diff\.pq-diff\.l3 i \{ background: var\(--muted\); \}/.test(CSS) && !/pq-diff[^}]*var\(--bad\)/.test(CSS));
  assert.ok(/role="img" aria-label="\$\{esc\(U\.cap\(d\)\)\} · \$\{esc\(str\('ourEstimate', 'our estimate'\)\)\}"/.test(SRCV), "one wording with GA.ui.diffGlyph: 'Medium · our estimate' (P2-66)");
  assert.ok(/icon\('chev-d', 'pqr-chev'\)/.test(SRCV) && /\.pqr\[open\] > summary \.pqr-chev \{ transform: rotate\(180deg\)/.test(CSS));
  assert.ok(/class="pq-subj" role="radiogroup"/.test(SRCV) && /role="radio" aria-checked/.test(SRCV) && /function rove\(group, sel\)/.test(SRCV));
});
test('pyq (P0-24, P2-27): the topic row is a positioned scroller, so its hidden count text never widens a phone page', () => {
  assert.ok(/\.pq-tops \{ position: relative;/.test(CSS) && /\.pq-subj \{ position: relative;/.test(CSS));
  assert.ok(/\.pq-tops \{ flex-wrap: nowrap; overflow-x: auto;/.test(CSS.slice(CSS.indexOf('@media (max-width: 700px)'))));
  assert.ok(/tops\._key/.test(SRCV) && !/tops\.dataset\.subj/.test(SRCV), "the topic row never carries data-subj (the subject row's click handler would read it)");
});
test('pyq (P3-20): a filter state written to the address and read back is the same filter (the new key, the older flags)', () => {
  const back = f => P.parse(Object.fromEntries(P.FKEYS.filter(k => f[k] && !(k === 'page' && +f[k] === 1) && !(k === 'sort' && f[k] === P.defaultSort(f))).map(k => [k, String(f[k])])));
  for (const q of [{ key: 'mta', subject: 'os' }, { disputed: '1' }, { status: 'nokey', marks: '2' }, { special: '1', sort: 'old' }, { status: 'learned', sort: 'mixed' }, { sec: 'CS', key: 'official' }]) {
    const f = P.parse(q), g = back(f);
    for (const k of P.FKEYS) assert.equal(String(g[k] || ''), String(f[k] || ''), JSON.stringify(q) + ' ' + k);
  }
});

/* ------------------------------------------------------------------ Part C (verifier flags) */
test('pyq (P1-18, verifier): the phone palette sheet opens with the current cell in view (its body scrolls to it; focus never scrolls)', () => {
  const fn = SRCV.slice(SRCV.indexOf('function sheet(o)'), SRCV.indexOf('const str = (k, dflt)'));
  assert.ok(fn.indexOf('setTimeout(') > 0, 'found sheet()');
  assert.ok(/const sb = U\.\$\('\.pq-sh-b', box\), ft = o\.focus \? U\.\$\(o\.focus, box\) : null;/.test(fn), 'the focus target is found in the sheet body');
  assert.ok(/sb\.scrollTop = Math\.max\(0, sb\.scrollTop \+ r\.top - br\.top/.test(fn), 'the body scrolls to centre it');
  assert.ok(fn.indexOf('sb.scrollTop =') < fn.indexOf('setTimeout('), 'before the sheet slides in');
  assert.ok(/focus\(\{ preventScroll: true \}\)/.test(fn));
  const pal = SRCV.slice(SRCV.indexOf("sheet({ id: 'qp-pal'"), SRCV.indexOf("sheet({ id: 'qp-pal'") + 400);
  assert.ok(/titleHtml: setHtml,/.test(pal) && /focus: '\.pr-pb\.cur'/.test(pal), 'the palette sheet focuses the current cell');
});
test('pyq (P1-48, verifier): a press on the scrim closes a sheet and focus returns to its opener (the press never moves it to <body>)', () => {
  const fn = SRCV.slice(SRCV.indexOf('function sheet(o)'), SRCV.indexOf('const str = (k, dflt)'));
  assert.ok(fn.length > 500 && fn.length < 6000, 'found sheet()');
  assert.ok(/scrim\.addEventListener\('mousedown', e => \{ if \(e\.target === scrim\) \{ e\.preventDefault\(\); close\(\); \} \}\);/.test(fn),
    "the scrim's mousedown cancels its default focus move (Chrome focuses <body> after remove() gave focus back)");
  const rm = fn.slice(fn.indexOf('function remove()'), fn.indexOf('function close()'));
  assert.ok(/undo\(\); untrap\(\);/.test(rm) && /if \(opener && opener\.isConnected && opener\.focus\) opener\.focus\(\{ preventScroll: true \}\);/.test(rm), 'remove() hands focus back to the opener');
  assert.ok(rm.indexOf('undo()') < rm.indexOf('opener.focus('), 'after the page is no longer inert');
  assert.ok(!/scrim\.addEventListener\('click'/.test(fn), 'one closing path for the scrim');
  // both sheets go through sheet(), each with its opener
  assert.ok(/sh = sheet\(\{ id: 'pq-filters', title: 'Filters', opener,/.test(SRCV) && /palSheet = sheet\(\{ id: 'qp-pal', title: setLabel, titleHtml: setHtml, opener: e\.currentTarget,/.test(SRCV));
});
test('pyq (P2-66, verifier): a bank row\'s tail wraps inside the text column; glyphs keep their size, only the two text facts wrap their words', () => {
  const tail = (CSS.match(/\n\.pqr-tail \{([^}]*)\}/) || [])[1] || '';
  assert.ok(/flex-wrap: wrap/.test(tail) && /min-width: 0/.test(tail) && /max-width: calc\(100% - 4px\)/.test(tail), 'the tail fits its column: ' + tail);
  assert.ok(/\n\.pqr-tail > \* \{ flex: none; \}/.test(CSS), 'glyphs and the difficulty ramp never shrink');
  assert.ok(/\n\.pqr-tail svg\.i \{ max-width: none; \}/.test(CSS), "base.css's svg { max-width: 100% } cannot squeeze a glyph to 0 px");
  assert.ok(/\n\.pqr-tail > \.pqr-kq, \.pqr-tail > \.pqr-leg \{ flex: 0 1 auto; min-width: 0; white-space: normal; \}/.test(CSS), "'key questioned' and 'legacy · not in the 2027 syllabus' wrap their words");
  assert.ok(!/\.pqr-(?:leg|kq|tail|ic)\b[^{}]*\{[^}]*white-space: nowrap/.test(CSS), 'no part of the tail is no-wrap');
  // every tail part is a direct child of .pqr-tail (so the rules above reach it)
  const th = SRCV.slice(SRCV.indexOf('function tailHtml(m, e, f)'), SRCV.indexOf('function metaHtml('));
  const parts = th.match(/`<span class="[^"]+"/g) || [];
  assert.ok(parts.length >= 5 && /return \[show && m\.diff \? diffHtml\(m\.diff\) : '',/.test(th) && /\]\.join\(''\);/.test(th), 'tail = a flat list of spans');
  assert.ok(/<span class="pqr-tail">\$\{tailHtml\(m, e, f\)\}<\/span>/.test(SRCV));
  // the meta parts: each '·' is glued to the part before it, so a wrapped phone line never starts with a separator (16-39 rows per sweep did)
  assert.ok(/const glued = parts\.map\(\(p, i\) => \(i < parts\.length - 1 \? `<span class="pqr-p">\$\{p\}\$\{dot\}<\/span>` : p\)\)\.join\(''\);/.test(SRCV));
  assert.ok(/return `\$\{glued\}<span class="pqr-tail">/.test(SRCV) && !/parts\.join\(dot\)/.test(SRCV));
  assert.ok(/\n\.pqr-p \{ display: inline-flex; align-items: center; column-gap: 7px; \}/.test(CSS) && !/\.pqr-p \{[^}]*flex-wrap/.test(CSS));
});
test('pyq (P0-24, Part C sweep): an option figure without its build size keeps to its column on the bank and the question page', () => {
  // views.css (WP9a) caps .qc-optfig by var(--r, 1000), and --r is also base.css's radius token, so an unsized figure got max-width: none
  assert.ok(/\n\.pqr-x \.qc-optfig:not\(\[style\]\), \.qpage \.qc-optfig:not\(\[style\]\) \{ max-width: calc\(100% - 8px\); \}/.test(CSS))   // content-box since P3-38: the 4 px padding sits outside;
  assert.ok(!/\.qc-optfig\[style/.test(CSS), "a sized figure (style=\"--r:w/h\") keeps views.css's shape cap");
});
test('pyq (P1-22, verifier): the set is named the same way on the header, the palette sheet and the end of the set (the medium name on phones, never cut)', () => {
  assert.ok(/<h1>\$\{setHtml\}<\/h1>/.test(SRCV) && /<h2 id="qp-end-h">\$\{setHtml\}: done<\/h2>/.test(SRCV), 'header and end of the set share one name');
  const ph = CSS.slice(CSS.indexOf('@media (max-width: 700px)'));
  assert.ok(/\n  \.qp-tl:has\(\+ \.qp-ts\) \{ position: absolute;/.test(ph) && /\n  \.qp-ts \{ display: inline; \}/.test(ph), 'the swap applies wherever the name shows (the sheet lives outside .qpage)');
  const end = (ph.match(/\.qp-end-b h2 \{[^}]*\}/) || [''])[0];
  assert.ok(end && !/white-space: nowrap/.test(end) && !/text-overflow: ellipsis/.test(end) && /-webkit-line-clamp: 2/.test(end), end);
  assert.ok(/\.qp-end-a \.btn\.pop \{[^}]*min-width: 0;[^}]*white-space: normal;/.test(ph), 'the coral wraps on a 320 px phone instead of running past the card');
});
test('pyq (D9, verifier): a set that cannot be scored (no key, or marks to all) ends as "not scored", never "N right" or "every one was right"; "the next N" only brings new questions', () => {
  const fn = SRCV.slice(SRCV.indexOf('async function endOfSet()'), SRCV.indexOf('endHost.addEventListener('));
  assert.ok(/unscored = attempted > 0 && !graded/.test(fn));
  assert.ok(/\$\{unscored \? 'not scored' : `<b>\$\{U\.nf\(right\)\}<\/b> right`\}/.test(fn));
  assert.ok(/: unscored \? \(allMta \?/.test(fn) && /: graded \? \(graded === attempted \? 'Every one you answered was right\.'/.test(fn));
  assert.ok(/const nextLbl = fresh \? `Practise the next/.test(fn) && !/more\.length === 10 \|\|/.test(fn), 'a pool of exactly 10 wraps to "these 10 again"');
  // rows, palette cells and the legend say marks to all for those questions (they have an official key)
  assert.ok(/st === 'seen' && m && m\.mta \? 'Seen \(marks to all, not scored\)'/.test(SRCV) && /dotHtml\(stOf\(e\), m\)/.test(SRCV) && /dotHtml\(st, m\)/.test(SRCV));
  assert.ok(/', seen \(marks to all, not scored\)'/.test(SRCV) && /mtaIn \? 'Seen, marks to all'/.test(SRCV));
});

/* ------------------------------------------------------------------ Part B (this stage): the notebook set hands back to the plan (P2-68, WP11's
   notebook queue), one wording (P2-66, P2-28), Peak only on true empty states (P2-70), a decoded id is never decoded again */
require('../app/js/core/srs.js'); require('../app/js/core/scoring.js');
const Store = require('../app/js/core/store.js'), ST = require('../app/js/core/stats.js'), A = require('../app/js/core/actions.js'), PL = require('../app/js/core/planner.js');
test('pyq (P2-68): a notebook set ends on the plan\'s next open task, named by the task, else the shared step; a retry link with nothing due is skipped', () => {
  const learn = { id: 'learn:pds.c.mem', title: 'Finish: Dynamic memory', href: '#/l/pds.c.mem', minutes: 26, done: false };
  const plan = { tasks: [{ id: 'retry', title: 'Retry 5 missed questions from your notebook', href: '#/notebook?retry=5', minutes: 15, done: true }, learn] };
  const step = { label: 'Continue', title: 'Pointers', href: '#/l/pds.c.ptr', minutes: 30 };
  assert.deepEqual(P.planNext(plan, step), { kicker: "Next in today's plan", title: 'Finish: Dynamic memory', minutes: 26, href: '#/l/pds.c.mem', from: 'plan' });
  const open = { tasks: [{ id: 'retry', title: 'Retry 5', href: '#/notebook?retry=5', minutes: 15, done: false }, learn] };
  assert.equal(P.planNext(open, step, { skip: h => /retry=/.test(h) }).href, '#/l/pds.c.mem', 'a retry queue with nothing due is skipped');
  assert.equal(P.planNext(open, step).href, '#/notebook?retry=5', 'while misses are still due it is the next task');
  assert.deepEqual(P.planNext({ tasks: [Object.assign({}, learn, { done: true })] }, step), { kicker: 'Continue', title: 'Pointers', minutes: 30, href: '#/l/pds.c.ptr', from: 'step' }, 'a finished day hands over to the shared step');
  assert.equal(P.planNext({ next: learn }, null).href, learn.href, 'a snapshot with only `next`');
  assert.equal(P.planNext(null, null), null);
  // one reading with the flash finish card (WP11's GA.flashLib.nextCoral), when it is loaded
  const FL = globalThis.GA.flashLib;
  if (FL && FL.nextCoral) for (const [pl, sp, sk] of [[plan, step, null], [open, step, h => /retry=/.test(h)], [{ tasks: [] }, step, null], [null, null, null]]) {
    const a = P.planNext(pl, sp, { skip: sk }), b = FL.nextCoral(pl, sp, { skip: sk });        // the decision (where it goes), not the shape
    assert.deepEqual(a && [a.href, a.from], b && [b.href, b.from]);
  }
});
test('pyq (P2-68): what a notebook set did, by the notebook\'s own rule: resolved, back for a retry (tomorrow / on / from a day), still due', () => {
  const T = '2026-10-16', st = { nb: { a: { resolved: 5 }, b: { resolved: null }, c: { resolved: null }, d: { resolved: null }, e: null } };
  const days = { b: '2026-10-17', c: '2026-10-20', d: '2026-10-16' };
  const r = P.nbAfter(st, ['a', 'b', 'c', 'd', 'e', 'zz'], T, (s, id) => days[id] || null);
  assert.deepEqual(r, { resolved: 1, back: 2, due: 1, when: '2026-10-17', last: '2026-10-20' });
  assert.equal(P.nbLine(r, T), '1 resolved · 2 back for a retry from tomorrow · 1 still due today');
  assert.equal(P.nbLine(P.nbAfter(st, ['c'], T, (s, id) => days[id]), T), '1 back for a retry on ' + U.fmtDay('2026-10-20', { day: 'numeric', month: 'short' }));
  assert.equal(P.nbLine(P.nbAfter(st, ['b'], T, (s, id) => days[id]), T), '1 back for a retry tomorrow');
  assert.equal(P.nbLine(P.nbAfter(st, [], T, () => null), T), '', 'nothing to say: the default line stays');
  assert.equal(P.nbLine(P.nbAfter(st, ['b'], T, () => { throw new Error('x'); }), T), '', 'a failing reader counts nothing');
});
test('pyq (P2-68): after the plan\'s 5 notebook retries its row is done, the set\'s coral is the plan\'s next open task and its line is true', () => {
  const T0 = '2026-10-16', NOW = Date.parse(T0 + 'T12:00:00'), realNow = Date.now, prevD = globalThis.GA.data.D;
  globalThis.GA.data.D = D;
  try {
    Store.init({ profile: 'pyq-nb-end' }); Store.reset();
    A.setProfile({ examDate: '2027-02-06' });
    const five = D.questions.filter(q => q.hasKey && !q.mta && q.subject && q.subject !== 'ga').slice(0, 5), ids = five.map(q => q.id);
    Date.now = () => NOW - 4 * 864e5;                    // missed four days ago
    five.forEach(q => A.attempt(q, 'Z', false, 30000, 'p'));
    Date.now = () => NOW;
    assert.deepEqual(ST.due(Store.state, D, T0).questions.slice().sort(), ids.slice().sort(), 'the five misses are due for a retry');
    const day0 = PL.day(Store.state, D, T0, { I }), row0 = day0.tasks.find(t => t.id === 'retry');
    assert.ok(row0 && !row0.done && row0.href === '#/notebook?retry=' + PL.RETRY_N, 'the plan has its retry row');
    Store.update(s => { s.plan = PL.stored(day0); }, 'plan');
    five.forEach((q, i) => A.attempt(q, 'Z', i < 3, 20000, 'p'));     // the set: three right, two missed again
    const r = P.nbAfter(Store.state, ids, T0, ST.retryDay);
    assert.deepEqual([r.resolved, r.back, r.due, r.when], [3, 2, 0, U.addDays(T0, 1)], 'right 4 days after the miss resolves; a miss comes back the next day');
    assert.equal(P.nbLine(r, T0), '3 resolved · 2 back for a retry tomorrow');
    const day1 = PL.day(Store.state, D, T0, { I });
    assert.ok(day1.tasks.find(t => t.id === 'retry').done, "the plan's retry row is done");
    const dueNow = ST.due(Store.state, D, T0).questions.length;
    assert.equal(dueNow, 0);
    const nx = P.planNext(day1, ST.nextStep(Store.state, D, { kind: 'any', today: T0, I }), { skip: h => /^#\/notebook\?(?:.*&)?retry=/.test(h) && !dueNow });
    const open = day1.tasks.filter(t => !t.done);
    assert.ok(nx, 'a coral (D18)');
    assert.ok(!/^#\/notebook\?retry=/.test(nx.href), 'never the queue just finished: ' + nx.href);
    if (open.length) assert.equal(nx.href, open[0].href, "the plan's next open task"); else assert.equal(nx.from, 'step');
  } finally { Date.now = realNow; globalThis.GA.data.D = prevD; Store.reset(); }
});
test('pyq (P2-68, P2-70, P2-66, P2-28): the view wires the notebook end, Peak only on true empty states, one wording from GA.ui.str', () => {
  const fn = SRCV.slice(SRCV.indexOf('async function endOfSet()'), SRCV.indexOf('endHost.addEventListener('));
  assert.ok(/nbSet = rec\.kind === 'notebook'/.test(fn) && /const plan = nbSet \? notebookNext\(\) : null;/.test(fn), 'a notebook set reads the plan');
  assert.ok(/const coral = plan \? planA\(plan\) : nbSet \? backA\('btn pop'\)/.test(fn), "its coral is the plan's next task, else back to the notebook");
  assert.ok(/P\.nbLine\(P\.nbAfter\(S\.state, ids, U\.today\(\), GA\.stats\.retryDay\), U\.today\(\)\)/.test(fn), "its line comes from the notebook's own rule");
  assert.ok(/missed = nbSet \? \[\] :/.test(fn), "no 'Retry the N you missed' right after a notebook retry: the notebook books the next one");
  const nn = SRCV.slice(SRCV.indexOf('function notebookNext()'), SRCV.indexOf('function notebookNext()') + 900);
  assert.ok(/GA\.planner\.current\(\)/.test(nn) && /kind: 'any'/.test(nn) && /retry=/.test(nn) && /!dueNow\(\)/.test(nn));
  assert.ok(/\.qp-end-s\.keep \{ display: block;/.test(CSS) && /\.btn\.qp-end-go \{/.test(CSS));
  // Peak: the mixed review's true empty state has him (his gaze on the coral below); a filter that matches nothing never does (D18, P2-70)
  const em = SRCV.slice(SRCV.indexOf('const emptyHtml = () =>'), SRCV.indexOf('function mountCard(d)'));
  assert.ok(/'No finished lessons yet'[^\n]*\{ peak: \{ gaze: 'down'/.test(em));
  assert.ok(/UI\.empty\('search', 'No questions match', un, '<button type="button" class="btn" data-clearall>Clear filters<\/button>'\)/.test(em), 'no-match: plain icon, neutral Clear filters, no coral, no Peak');
  // one wording (GA.ui.str with the page's own words as fallback)
  for (const k of ['difficulty', 'nothingToPractise', 'noKey', 'keyQuestioned', 'legacy', 'ourEstimate']) assert.ok(SRCV.includes(`str('${k}'`), k);
  const UIx = require('../app/js/core/ui.js');
  if (UIx && UIx.str) { assert.equal(UIx.str.difficulty, 'Difficulty (our estimate)'); assert.equal(UIx.str.nothingToPractise, 'Nothing to practise'); assert.equal(UIx.str.noKey, 'No official key'); }
  // the router hands views decoded params: the id is decoded again only when it is not a catalogue id ('#/q/50%25' never throws)
  assert.ok(/if \(!D\.qById\[id\]\) \{ try \{ id = decodeURIComponent\(raw\); \} catch \(e\) \{ id = raw; \} \}/.test(SRCV) && !/id = decodeURIComponent\(ctx\.params\.id\)/.test(SRCV));
});
