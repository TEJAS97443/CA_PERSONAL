/* views/settings.js (owner WP6): the pure helpers behind /settings and /about. The trust page counts keyed papers the same way the Tests hub
   does (P0-21), a key printed inside its question paper is shown as such, and a backup is checked before it can replace anything
   (P1-49, P1-51). */
globalThis.GA = globalThis.GA || {};
const path = require('path');
require('../app/js/core/util.js');
const L = require('../app/js/views/settings.js');
const Data = require('../app/js/core/data.js');
globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
if (!GAD.manifest) require(path.join(__dirname, '..', 'data/manifest.js'));
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(GAD.manifest.main)));

test('about: keyed papers are counted like the Tests hub (every question keyed), with the keyed question total', () => {
  const A = L.aboutCounts(D);
  const hub = D.papers.filter(p => p.keyed === p.n).length;          // views/test.js: "N with a complete official key"
  assert.equal(A.keyedPapers, hub, 'About and /test agree');
  assert.equal(A.keyedQuestions, D.papers.reduce((a, p) => a + (p.keyed || 0), 0));
  assert.equal(A.papers, D.papers.length); assert.equal(A.questions, D.questions.length);
  assert.ok(A.keyedPapers > D.papers.filter(p => p.src && p.src.key).length || D.papers.every(p => !p.keyed || (p.src && p.src.key)), 'a key printed inside a question paper still counts');
  assert.deepEqual(A.unkeyed, D.papers.filter(p => !p.keyed).map(p => p.year).sort((a, b) => a - b));
});

test('about: a key printed inside its question paper is shown as such, never as missing', () => {
  const qp = { url: 'https://example.org/paper.pdf', sha256: 'a'.repeat(64), retrieved: '2026-10-20' };
  const p20 = { year: 2025, keyed: 10, n: 10, keySrc: 'paper', src: { qp, key: Object.assign({}, qp, { page: 17, note: 'answers on pp. 17–18' }) } };
  const k = L.keyCell(p20);
  assert.equal(k.kind, 'paper');
  assert.ok(k.url && k.url.indexOf(p20.src.qp.url) === 0, 'links the question-paper PDF');
  assert.ok(/#page=17$/.test(k.url), 'opens at the key page');
  assert.equal(L.keyCell({ keyed: 0, n: 85, src: { qp: { url: 'x' } }, keyNote: 'never published' }).kind, 'none');
  const withFile = D.papers.find(p => p.src && p.src.key && p.keySrc !== 'paper');
  if (withFile) assert.equal(L.keyCell(withFile).kind, 'file');
});

test('backup checks: only PassBook files are read, a demo file never replaces the main profile, counts describe both sides', () => {
  const main = { profile: 'main' }, demo = { profile: 'demo' };
  assert.equal(L.readBackup('not json', main).error, 'This file is not a PassBook backup');
  assert.equal(L.readBackup(JSON.stringify({ app: 'other', state: {} }), main).error, 'This file is not a PassBook backup');
  assert.equal(L.readBackup(JSON.stringify({ app: 'passbook', state: [] }), main).error, 'This file is not a PassBook backup');
  assert.ok(/demo profile/.test(L.readBackup(JSON.stringify({ app: 'passbook', profile: 'demo', state: {} }), main).error));
  assert.ok(L.readBackup(JSON.stringify({ app: 'passbook', profile: 'demo', state: {} }), demo).d);
  const c = L.countsOf({ q: { a: { n: 2 }, b: { n: 0 }, c: null }, lessons: { x: { done: 1 }, y: { done: null } }, tests: [{}, {}], cards: { k: {} } });
  assert.deepEqual(c, { questions: 1, lessons: 1, tests: 2, cards: 1 });
  assert.deepEqual(L.countsOf({ q: null, lessons: 'x', tests: null, cards: [] }), { questions: 0, lessons: 0, tests: 0, cards: 0 }, 'a damaged state never throws');
});

test('P2-49: the backup nudge waits for 7 active days without a backup, 3 in iOS Safari; never once a backup exists', () => {
  const st = (lastExport) => ({ profile: { lastExport: lastExport || null } });
  assert.equal(L.backupNudge(st(), 6, false), null);
  assert.deepEqual(L.backupNudge(st(), 7, false), { days: 7, need: 7 });
  assert.deepEqual(L.backupNudge(st(), 3, true), { days: 3, need: 3 }, 'iOS Safari may clear a site after 7 days away');
  assert.equal(L.backupNudge(st(Date.now()), 40, false), null, 'backed up: no nudge');
});

test('P2-35 / D11: the qualifying-mark categories come from the latest sourced CS result; the choice defaults to General', () => {
  const C = L.categoriesOf(D, { profile: {} });
  if (!D.results || !D.results.length) { assert.equal(C, null); return; }
  const latest = D.results.filter(r => r.paper === 'CS').sort((a, b) => +b.exam.match(/\d{4}/)[0] - +a.exam.match(/\d{4}/)[0])[0];
  assert.equal(C.exam, latest.exam); assert.deepEqual(C.cats, Object.keys(latest.qualifying));
  assert.equal(C.pick, 'General');
  const other = C.cats.find(k => k !== 'General');
  assert.equal(L.categoriesOf(D, { profile: { category: other } }).pick, other);
  assert.equal(L.categoriesOf(D, { profile: { category: 'made up' } }).pick, 'General', 'an unknown stored value falls back');
  assert.equal(L.categoriesOf({ results: [] }, { profile: {} }), null);
});

test('P2-48: the answer-key disputes are listed (paper, printed number, subject), newest first; the cycle days read as one phrase', () => {
  const Ins = require('../app/js/core/insights.js'), I = Ins.build(D, GAD.manifest.main.stats);
  const rows = L.disputeRows(D, I), want = I.disputes();
  assert.equal(rows.length, want.length, 'every disputed question, none resolved');
  rows.forEach(r => { assert.ok(/Q\d+$/.test(r.label), r.label); assert.ok(r.href.indexOf('#/q/') === 0); });
  for (let i = 1; i < rows.length; i++) assert.ok(rows[i - 1].year >= rows[i].year, 'newest first');
  assert.deepEqual(L.disputeRows(D, null), []);
  assert.equal(L.daysTxt(['2027-02-06', '2027-02-07', '2027-02-13', '2027-02-14', '2027-02-20', '2027-02-21']), '6–7, 13–14 and 20–21 Feb 2027');
  assert.equal(L.daysTxt(['2027-02-06']), '6 Feb 2027');
  assert.equal(L.daysTxt(['2027-01-08', '2027-01-10', '2027-01-12']), '8, 10 and 12 Jan 2027', 'the Group II paper days');
  assert.equal(L.daysTxt(['2028-01-30', '2028-01-31', '2028-02-01']), '30 Jan–1 Feb 2028');
  assert.equal(L.daysTxt([]), '');
});

test('P1-58 / P2-49: the hosted copy\'s lines in Your data follow GA.pwa.status() (§10.12), and say only what it reports', () => {
  const txt = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  // before the hosted copy (navigator.storage.persisted() only): one line, 'In this browser'
  const plain = L.pwaLines({ persisted: false }, { chars: 167936, touch: true, canAsk: true });
  assert.ok(/^In this browser: progress 164 KB · Not protected: the browser may clear it if the phone runs out of space/.test(txt(plain)), txt(plain));
  assert.ok(/id="st-keep"/.test(plain) && !/pwa-restart|pwa-all|offline copy/.test(plain), 'the ask button, nothing of the hosted copy');
  assert.ok(/This browser does not say/.test(txt(L.pwaLines({ persisted: null }, { chars: 10 }))), 'unknown is never shown as protected');
  // with GA.pwa: offline copy size, protection, the update row only while one waits, the opt-in with its sizes when status() gives them
  const st = { installed: false, update: false, persisted: true, cached: { bytes: 5767168, files: 69 }, all: { download: 8178892, bytes: 54525952, files: 812 } };
  const on = L.pwaLines(st, { pwa: true, chars: 167936, touch: true, canAsk: true, saveAll: true });
  assert.ok(/^On this phone: progress 164 KB · offline copy 5\.5 MB · Protected/.test(txt(on)), txt(on));
  assert.ok(!/st-keep/.test(on), 'protected: no ask button');
  assert.ok(!/Update ready/.test(on), 'no update waiting: no row');
  assert.ok(/Save everything for offline · 7\.8 MB download · about 52 MB on this phone/.test(txt(on)), txt(on));
  const upd = L.pwaLines(Object.assign({}, st, { update: true }), { pwa: true, chars: 1, touch: false, saveAll: true });
  assert.ok(/Update ready · Restart/.test(txt(upd)) && /id="pwa-restart"/.test(upd), 'the update row with its Restart button');
  assert.ok(/^On this computer:/.test(txt(upd)) && /on this computer/.test(txt(upd)), 'a desktop is not called a phone');
  // no sizes from status(): the bare button; everything cached: said so, no button; no saveAll(): no row; nothing cached yet: said so
  assert.ok(/Save everything for offline<\/button><\/p>$/.test(L.pwaLines({ persisted: true, cached: { bytes: 1, files: 1 } }, { pwa: true, saveAll: true })));
  const full = L.pwaLines(Object.assign({}, st, { cached: { bytes: 54525952, files: 812 } }), { pwa: true, saveAll: true });
  assert.ok(/Everything is saved for offline\./.test(full) && !/pwa-all/.test(full) && /offline copy 52 MB/.test(txt(full)));
  assert.ok(!/pwa-all|Everything/.test(L.pwaLines(st, { pwa: true, saveAll: false })), 'no saveAll(): no opt-in');
  assert.ok(/offline copy not saved yet/.test(txt(L.pwaLines({ persisted: true }, { pwa: true }))), 'nothing cached: never a made-up size');
  assert.ok(!/progress/.test(txt(L.pwaLines({ persisted: true }, { pwa: true }))), 'no usage figure: no progress size');
});
