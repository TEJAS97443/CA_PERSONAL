/* A synthetic catalogue for the practice tests (tests/pyq, practice, testgen, scoring, flash): the real manifest's syllabus, exam calendar and
   section table (data/manifest.js, read in a sandbox of its own), plus made-up lessons, flashcards, papers and questions on PassBook's syllabus
   ids. Nothing here is ICAI content: the papers have the engine's original objective-question shape (a 10-question section 0 and a
   55-question section 1, MCQ / MSQ / NAT, 1 and 2 marks, official keys) so the bank, test and flashcard machinery can be exercised while the
   real ICAI bank is not built. Deterministic: the same manifest every run.

     const M = require('./fixtures/practice-catalogue.js')();     // a fresh manifest object (mutable copy)
     M.fixture = {lessons, cards, papers, questions}                // the counts, for assertions */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..', '..');

function realManifest() {
  const box = { GAD: { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } } };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', 'manifest.js'), 'utf8'), box);
  return JSON.parse(JSON.stringify(box.GAD.manifest.main));
}

/** a seeded generator (mulberry32) */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

module.exports = function practiceCatalogue(opts) {
  const o = opts || {};
  const M = realManifest();
  const r = rng(o.seed || 20270108), CARDS = o.cards || 16;
  const subs = [];
  M.syllabus.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => subs.push({ s, t, n }))));
  // a lesson on every sub-topic, 16 flashcards each (about the engine's original deck size, so long spaced-repetition replays never run out of
  // new cards), 10-30 minutes, the syllabus prerequisite left empty
  M.lessons = subs.map(({ s, t, n }, i) => ({ id: n.id, title: n.name, subject: s.id, topic: t.id, minutes: 10 + (i * 7) % 21, summary: 'Fixture lesson.',
    tier: n.tier, status: n.status, needs: [], tags: [], labs: [], cards: CARDS, words: 1500, pyq: [] }));
  M.cards = [];
  M.lessons.forEach(l => { for (let k = 0; k < CARDS; k++) M.cards.push([`${l.id}#fx${k}`, l.id]); });
  // twelve keyed papers (2021-2026, two sets a year: enough questions of every type in every subject for full mocks) and one older paper
  // without a key
  const papers = [[2019, 1, false]];
  for (let y = 2021; y <= 2026; y++) papers.push([y, 1, true], [y, 2, true]);
  const TYPE = { MCQ: 0, MSQ: 1, NAT: 2 }, FLAG = { SOL: 2, KEY: 4, SPECIAL: 8, MTA: 128, CHECKED: 256, DISPUTE: 512 };
  M.papers = []; M.pyq = { cols: ['id', 'paper', 'sec', 'no', 'marks', 'type', 'subject', 'topic', 'subtopic', 'diff', 'flags'], rows: [] };
  const disputes = [];
  papers.forEach(([year, set, keyed], pi) => {
    const multi = papers.filter(p => p[0] === year).length > 1;
    const id = `fx-${year}${multi ? '-' + set : ''}`;
    let marks = 0, ga = 0, cs = 0;
    for (let k = 0; k < 65; k++) {
      const sec = k < 10 ? 0 : 1, no = sec ? k - 9 : k + 1;
      const m = sec === 0 ? (k < 5 ? 1 : 2) : (no <= 25 ? 1 : 2);
      const type = sec === 0 ? 'MCQ' : ['MCQ', 'MCQ', 'MCQ', 'MSQ', 'NAT'][Math.floor(r() * 5)];
      const at = subs[Math.floor(r() * subs.length)];
      let flags = FLAG.SOL;
      if (keyed) flags |= FLAG.KEY | FLAG.CHECKED;
      if (keyed && year === 2024 && k % 11 === 1) { flags |= FLAG.MTA; }                // twelve marks-to-all rulings, six in each 2024 set
      if (keyed && k === 33 && year >= 2025) { flags |= FLAG.DISPUTE; flags &= ~FLAG.CHECKED; }
      const qid = `${id}:${sec ? 'Q' : 'S'}${no}`;
      if (flags & FLAG.DISPUTE) disputes.push(qid);
      M.pyq.rows.push([qid, pi, sec, no, m, TYPE[type], at.s.id, at.t.id, at.n.id, Math.floor(r() * 3), flags]);
      marks += m; if (sec) cs++; else ga++;
    }
    M.papers.push({ id, year, set, label: `${year}${multi ? ' · Set ' + set : ''}`, organiser: 'Fixture board', n: 65, ga, cs, marks, minutes: 180,
      keyed: keyed ? 65 : 0, verified: 65, review: 0, pending: 0, numbering: 'restart', src: {}, keySrc: keyed ? 'file' : null });
  });
  M.stats = Object.assign({}, M.stats || {}, { diagrams: {}, quiz: {}, embeds: {}, disputes });
  M.topicMarks = {};
  M.pyq.rows.forEach(q => { [q[7], q[8]].forEach(k => { M.topicMarks[k] = (M.topicMarks[k] || 0) + q[4]; }); });
  M.fixture = { lessons: M.lessons.length, cards: M.cards.length, papers: M.papers.length, questions: M.pyq.rows.length };
  return M;
};

/** the full question records the loaders would return (data/pyq/<paper>.js), for a catalogue D built from the fixture: a stem, four options for
    MCQ / MSQ, and an answer of the engine's shape (MCQ 'A', MSQ A + C, NAT 2, marks to all, none for an unkeyed paper) */
module.exports.full = function full(D) {
  const out = {};
  D.questions.forEach(q => {
    const answer = !q.hasKey ? null : q.mta ? { kind: 'mta' } : q.type === 'MCQ' ? { kind: 'single', value: 'A' } : q.type === 'MSQ' ? { kind: 'multi', value: ['A', 'C'] }
      : { kind: 'range', min: 2, max: 2 };
    out[q.id] = Object.assign({}, q, { stem: `Fixture question ${q.id}: which option is right?`, options: q.type === 'NAT' ? undefined : ['first', 'second', 'third', 'fourth'] },
      answer ? { answer } : {});
  });
  return out;
};
