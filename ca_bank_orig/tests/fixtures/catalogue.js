/* A deterministic catalogue for the core unit tests (store, stats, next steps, lesson helpers). Not a .test.js file.

   The shipped manifest (data/manifest.js) gives the real CA syllabus, exam calendar and lesson sections; this module adds synthetic lessons
   for every sub-topic (needs = the previous sub-topic of its chapter; minutes 10 + its position), three flashcards each and a small synthetic
   MCQ bank (two papers per ICAI paper, sixteen keyed questions each), so the logic tests never depend on how far the lesson writers have got
   or on the ICAI question bank, which a later job designs. Lesson and card ids are real syllabus ids; question ids are 'fx-<subject>-<year>:Q<n>'
   and never ship.

     const FX = require('./fixtures/catalogue.js');
     FX.manifest()        the manifest object (a fresh deep copy every call)
     FX.catalogue()       data.js buildCatalogue(manifest()) (needs app/js/core/util.js and data.js loaded, as data.js itself requires)
     FX.register(GAD)     register the fixture's manifest, paper, lesson and card files with a GAD registry (loaders then need no files)
     FX.real()            the shipped manifest, untouched (for the tests that are about the shipped data)                                  */
'use strict';
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..', '..');

let shipped = null;
function real() {
  if (shipped) return JSON.parse(JSON.stringify(shipped));
  const box = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } };
  const src = fs.readFileSync(path.join(ROOT, 'data', 'manifest.js'), 'utf8');
  new Function('GAD', src)(box);           // the manifest file only calls GAD.reg(...)
  shipped = box.manifest.main;
  return JSON.parse(JSON.stringify(shipped));
}

const TYPE = { MCQ: 0 };
const FLAG = { SOL: 2, KEY: 4 };

/** tools/buildlib/lessons.py words(), the build's word count (lesson.js readWords must agree with it) */
function words(md) {
  md = md.replace(/```[\s\S]*?```/g, ' ').replace(/::: *diagram[\s\S]*?\n:::/g, ' ').replace(/\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g, ' x ');
  return (md.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
}
const SAMPLE = () => fs.readFileSync(path.join(__dirname, 'lesson-sample.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^## Flashcards[\s\S]*$/m, '').trim();

function manifest() {
  const M = real(), sampleWords = words(SAMPLE());
  const lessons = [], cards = [];
  for (const s of M.syllabus.subjects) for (const t of s.topics) t.subtopics.forEach((n, i) => {
    lessons.push({ id: n.id, title: n.name, subject: s.id, topic: t.id, minutes: 10 + (i % 7), summary: 'Fixture lesson: ' + n.name + '.',
      tier: n.tier, status: n.status, needs: i ? [t.subtopics[i - 1].id] : [], tags: [], labs: [], cards: 3, words: sampleWords, pyq: [] });
    for (let k = 0; k < 3; k++) cards.push([n.id + '#fx' + k, n.id]);
  });
  const papers = [], rows = [], cols = ['id', 'paper', 'sec', 'no', 'marks', 'type', 'subject', 'topic', 'subtopic', 'diff', 'flags'];
  for (const s of M.syllabus.subjects) for (const year of [2025, 2026]) {
    const pid = `fx-${s.id}-${year}`, subs = [].concat(...s.topics.map(t => t.subtopics.map(n => [t.id, n.id])));
    const pi = papers.length;
    let marks = 0;
    for (let no = 1; no <= 16; no++) {
      const [topic, sub] = subs[Math.floor((no - 1) / 2) % subs.length], m = no % 3 ? 1 : 2;      // two a paper on each of the first 8 sub-topics
      marks += m;
      rows.push([`${pid}:Q${no}`, pi, 1, no, m, TYPE.MCQ, s.id, topic, sub, no % 3, FLAG.KEY | FLAG.SOL]);
    }
    papers.push({ id: pid, year, set: 1, label: `Fixture ${s.paper || s.id} ${year}`, organiser: 'ICAI', n: 16, ga: 0, cs: 16, marks, minutes: 180,
      keyed: 16, verified: 16, review: 0, pending: 0, numbering: 'global', src: {}, keySrc: 'file' });
  }
  const topicMarks = {};
  for (const r of rows) for (const k of [r[7], r[8]]) topicMarks[k] = (topicMarks[k] || 0) + r[4];
  Object.assign(M, { lessons, cards, papers, pyq: { cols, rows }, topicMarks, cardAliases: {},
    stats: { diagrams: {}, quiz: Object.fromEntries(lessons.map(l => [l.id, 4])), embeds: {}, disputes: [] } });
  return M;
}

/** register the fixture as if its data files had loaded: GAD.manifest.main, GAD.pyq[<paper>] (full MCQ records, key 'A'), GAD.lesson[<id>]
    (the fixture lesson's text under each title) and GAD.cards[<subject>], so GA.data's loaders resolve without files (Node tests, the demo seeder) */
function register(GAD) {
  const M = manifest(), sample = SAMPLE();
  GAD.reg('manifest', 'main', M);
  const byPaper = {};
  M.pyq.rows.forEach(r => { const p = M.papers[r[1]]; (byPaper[p.id] = byPaper[p.id] || []).push({ id: r[0], section: 'CS', no: r[3], marks: r[4], type: 'MCQ',
    stem: 'Fixture question ' + r[3] + ' on ' + r[8] + '.', options: ['First', 'Second', 'Third', 'Fourth'], answer: { kind: 'single', value: 'A' }, key_raw: 'A' }); });
  Object.keys(byPaper).forEach(pid => GAD.reg('pyq', pid, byPaper[pid]));
  M.lessons.forEach(l => GAD.reg('lesson', l.id, { id: l.id, title: l.title, md: sample }));
  const decks = {};
  M.cards.forEach(([id, lid]) => { const l = M.lessons.find(x => x.id === lid); (decks[l.subject] = decks[l.subject] || []).push({ id, lesson: lid, front: 'Fixture card ' + id, back: 'Answer' }); });
  Object.keys(decks).forEach(sid => GAD.reg('cards', sid, decks[sid]));
  return M;
}

function catalogue() {
  const GA = globalThis.GA;
  if (!GA || !GA.data || !GA.data.buildCatalogue) throw new Error('load app/js/core/util.js and data.js before FX.catalogue()');
  return GA.data.buildCatalogue(manifest());
}

module.exports = { manifest, catalogue, register, real, words, ROOT };
