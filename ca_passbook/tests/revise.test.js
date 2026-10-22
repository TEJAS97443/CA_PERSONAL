/* The revision sheets (app/js/views/revise.js, audit P1-53, D12a): the pure helpers behind /rev and /rev/:subject. The lesson cutter is checked
   on hand-made markdown and against every shipped lesson with independent counts; the sheet's rows against the one learning order and the
   last30 route; the address options round-trip; /rev's coral agrees with the shared next step in the 12 learner states (docs/ARCHITECTURE.md §10.3). */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js'); require('../app/js/core/srs.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const MD = require('../app/js/core/md.js');
let S = null; try { S = require('../app/js/core/stats.js'); } catch (e) { S = null; }
let NS = null; try { NS = require('./next-states.js'); } catch (e) { NS = null; }
const R = require('../app/js/views/revise.js');

/* the fixture catalogue (tests/fixtures/catalogue.js): a lesson for every CA sub-topic, each with the fixture lesson's text, and a small
   synthetic MCQ bank; the shipped lessons are cut as well (whatever the writers have shipped so far) */
const FX = require('./fixtures/catalogue.js');
const G = { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
const M = FX.register(G);
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const I = Ins.build(D, M.stats);
const mdOf = id => G.lesson[id].md;
const shipped = (() => {                                       // data/lessons/<paper>/<id>.js, read in a registry of their own
  const box = { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } }, dir = path.join(ROOT, 'data/lessons');
  if (fs.existsSync(dir)) (function load(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(f => { const p = path.join(d, f.name); if (f.isDirectory()) load(p); else if (f.name.endsWith('.js')) new Function('GAD', fs.readFileSync(p, 'utf8'))(box); }); })(dir);
  return Object.values(box.lesson || {});
})();

/* ---------------------------------------------------------------- independent raw counts (line scans, not the cutter) */
const lines = md => md.replace(/\r\n?/g, '\n').split('\n');
const boxCount = (md, kind) => lines(md).filter(l => new RegExp('^:{3,}\\s*' + kind + '\\b', 'i').test(l.trim())).length;
const sectionOf = (md, name) => { const out = []; let on = false, fence = false; for (const l of lines(md)) { if (/^\s*(```|~~~)/.test(l)) fence = !fence; if (!fence && /^##\s/.test(l)) { if (on) break; on = l.replace(/^##\s+/, '').trim().toLowerCase() === name; continue; } if (on) out.push(l); } return out.join('\n'); };
const bulletsOf = md => lines(md).filter(l => /^([*+-]|\d+[.)])\s+\S/.test(l)).length;

const SAMPLE = [
  '## In plain words', 'Intro.', '', '::: key', 'The **one** idea.', ':::', '',
  '## How it works', '::: formula Early one', '$a = b$', ':::', '', '```c', '::: formula not a box (inside code)', '## not a heading', '```', '',
  '## Formats and formulas', 'Lead line.', '', '| a | b |', '|---|---|', '| 1 | 2 |', '', '::: formula Main', '$$x^2$$', ':::', '',
  '::: definition Term', 'Meaning.', ':::', '', '::: lab sort {"algo":"merge"}', ':::', '', 'Tail fact.', '',
  '## Exam angle', '::: trick First', 'T1 body.', ':::', '', '::: trick Second', 'T2 body.', ':::', '', '::: exam What ICAI asks', '* RTP May 2026', ':::', '',
  '## Answer frame', '::: exam Not a trick box', 'An exam box outside the Exam angle is not on the sheet.', ':::', '',
  '## Common mistakes', '::: mistake Only one', 'M body.', ':::', '',
  '## Practice', '::: quiz Check yourself', 'Q?', ':::', '',
  '## Recap', '', '* First point with $x$.', '* Second point', '  continued line', '- Third point', '', '```', '* not a point', '```'
].join('\n');

test('revise: extract() cuts a lesson with md.js\'s rules (fences never split, boxes close on their own colons)', () => {
  const p = R.extract(SAMPLE);
  assert.equal(p.key.length, 1);
  assert.match(p.key[0], /^::: key\nThe \*\*one\*\* idea\.\n:::$/);
  assert.deepEqual(p.items.map(x => x.kind + ':' + (x.title || x.src.split('\n')[0])), ['formula:Early one', 'fact:Lead line.', 'formula:Main', 'fact:::: definition Term']);
  const facts = p.items.filter(x => x.kind === 'fact');
  assert.match(facts[0].src, /\| 1 \| 2 \|/, 'the table before the formula box is a fact chunk');
  assert.match(facts[1].src, /Meaning\.[\s\S]*Tail fact\./, 'a definition and the prose after it stay together, in order');
  assert.ok(!facts.some(f => /::: lab/.test(f.src)), 'a lab embed is never part of the sheet');
  assert.deepEqual(p.tricks.map(t => t.title + '=' + t.inner), ['First=T1 body.', 'Second=T2 body.']);
  assert.equal(p.exam.length, 1, "the Exam angle section's 'What ICAI asks' box, never an exam box of another section");
  const old = R.extract(SAMPLE.replace('## Formats and formulas', '## Formulas and facts').replace('## Exam angle', '## GATE tricks'));
  assert.deepEqual([old.items.length, old.tricks.length, old.exam.length], [p.items.length, p.tricks.length, p.exam.length], 'the engine\'s older section names still cut the same');
  assert.deepEqual(p.mistakes.map(t => t.title), ['Only one']);
  assert.equal(p.bullets, 3, 'top-level points only: a continuation line and a list inside a code fence do not count');
  assert.match(p.recap, /^\* First point/);
  assert.equal(R.countBullets('1. one\n2) two\n   * nested\nplain'), 2);
  const none = R.extract('');
  assert.deepEqual([none.key.length, none.items.length, none.recap, none.bullets], [0, 0, '', 0]);
});

test('revise: every lesson cuts cleanly (fixture and shipped): one key idea, its formula boxes, tricks and mistakes, a Recap with points', () => {
  let formulas = 0, bullets = 0, keys = 0, tricks = 0, mistakes = 0;
  const all = D.lessons.map(l => ({ id: l.id, md: mdOf(l.id) })).concat(shipped.map(x => ({ id: 'shipped ' + x.id, md: x.md })));
  for (const l of all) {
    const md = l.md, p = R.extract(md);
    assert.equal(p.key.length, 1, l.id + ': one key idea box');
    assert.equal(p.items.filter(x => x.kind === 'formula').length, boxCount(md, 'formula'), l.id + ': every formula box, wherever it sits');
    assert.equal(p.tricks.length, boxCount(md, 'trick'), l.id + ': every GATE trick');
    assert.equal(p.mistakes.length, boxCount(md, 'mistake'), l.id + ': every common mistake');
    assert.equal(p.bullets, bulletsOf(sectionOf(md, 'recap')), l.id + ': the Recap points');
    assert.ok(p.bullets >= 1, l.id + ': the Recap has points');
    const ff = sectionOf(md, 'formats and formulas');
    if (/\|.*\|/.test(ff)) assert.ok(p.items.some(x => x.kind === 'fact' && /\|.*\|/.test(x.src)) || /^:{3,}\s*formula[\s\S]*\|/m.test(ff), l.id + ': the section\'s tables are in its facts');
    p.items.filter(x => x.kind === 'fact').forEach(x => assert.ok(!/^:{3,}\s*(lab|quiz|pyq)\b/m.test(x.src), l.id + ': no embed among the facts'));
    formulas += p.items.filter(x => x.kind === 'formula').length; bullets += p.bullets; keys += p.key.length; tricks += p.tricks.length; mistakes += p.mistakes.length;
  }
  assert.equal(keys, all.length, 'one key idea per lesson');
  assert.ok(formulas >= D.lessons.length && bullets >= D.lessons.length && mistakes >= D.lessons.length, `${formulas} formulas, ${bullets} points, ${mistakes} mistakes`);
});

test('revise: plan() lists a subject in its one learning order, numbered, with the last30 route and the outside-syllabus group', () => {
  const l30 = new Set(I.path('last30').lessons);
  let all = 0;
  for (const s of D.subjects) {
    const P = R.plan(D, I, s.id);
    assert.deepEqual(P.rows.map(r => r.id), I.order(s.id), s.id + ': I.order');
    assert.deepEqual(P.rows.map(r => r.n), P.rows.map((r, i) => i + 1));
    P.rows.forEach(r => {
      const info = I.lessonInfo(r.id);
      assert.equal(r.title, D.lessonById[r.id].title);
      assert.equal(r.pyqs, info.pyqs || 0); assert.equal(r.papers, info.papers || 0);
      assert.equal(r.last30, l30.has(r.id));
      assert.equal(r.topic, D.nodes[D.lessonById[r.id].topic].name);
    });
    assert.equal(P.last30, P.rows.filter(r => l30.has(r.id)).length);
    const out = P.rows.filter(r => r.status !== 'in').length;
    assert.equal(P.outside, out);
    if (P.outsideFrom >= 0) assert.ok(P.rows.slice(P.outsideFrom).every(r => r.status !== 'in') && P.rows.length - P.outsideFrom === out, s.id + ': the group really is last');
    else assert.ok(!out || P.rows.slice(P.rows.length - out).some(r => r.status === 'in'), s.id + ': no group note unless they are the last ones');
    all += P.rows.length;
  }
  assert.equal(all, D.lessons.length, 'the paper sheets hold every lesson once');
  assert.equal(R.plan(D, I, 'nosuch'), null);
  assert.equal(R.plan(D, I, '__proto__'), null, 'no prototype key is a subject');
  assert.equal(R.plan(D, I, 'cma').last30, I.path('last30').lessons.filter(id => D.lessonById[id].subject === 'cma').length);
});

test('revise: the address carries the filter and the toggles, and comes back to the same options', () => {
  const o = R.options({}, { route: null }, true);
  assert.deepEqual(o, { only: 'all', facts: false, tricks: false, mistakes: false, def: 'all' });
  assert.equal(R.hrefOf('os', o), '#/rev/os');
  const on = R.options({ only: 'last30', tricks: '1', mistakes: 'true' }, null, true);
  assert.deepEqual([on.only, on.facts, on.tricks, on.mistakes], ['last30', false, true, true]);
  assert.equal(R.hrefOf('os', on), '#/rev/os?only=last30&tricks=1&mistakes=1');
  // a learner on the Last 30 days route starts there; choosing all is then written down
  const mine = R.options({}, { route: 'last30' }, true);
  assert.equal(mine.only, 'last30'); assert.equal(R.hrefOf('os', mine), '#/rev/os');
  assert.equal(R.hrefOf('os', Object.assign({}, mine, { only: 'all' })), '#/rev/os?only=all');
  assert.equal(R.options({ only: 'all' }, { route: 'last30' }, true).only, 'all');
  // a subject with no Last 30 days lessons never filters to nothing
  assert.equal(R.options({ only: 'last30' }, { route: 'last30' }, false).only, 'all');
  assert.equal(R.options({ only: 'bogus' }, null, true).only, 'all');
  // round trip through the router's own parser
  const Rt = { parse: h => { const q = {}; const i = h.indexOf('?'); (i < 0 ? '' : h.slice(i + 1)).split('&').filter(Boolean).forEach(kv => { const [k, v] = kv.split('='); q[k] = v; }); return q; } };
  for (const x of [on, mine, { only: 'all', facts: true, tricks: false, mistakes: true, def: 'all' }]) {
    const back = R.options(Rt.parse(R.hrefOf('db', x)), { route: x.def === 'last30' ? 'last30' : null }, true);
    assert.deepEqual([back.only, back.facts, back.tricks, back.mistakes], [x.only, x.facts, x.tricks, x.mistakes]);
  }
});

test('revise: every lesson heading has a unique anchor the shell can scroll to (#/rev/<subject>#<anchor>)', () => {
  const ANCHOR = /^(#\/[^#]*?)#([A-Za-z][\w-]*)$/;                    // shell.js's in-page anchor pattern
  const seen = new Set();
  for (const l of D.lessons) {
    const a = R.anchorOf(l.id);
    assert.ok(ANCHOR.test('#/rev/' + l.subject + '#' + a), a);
    assert.ok(!seen.has(a), 'unique: ' + a); seen.add(a);
  }
});

test('revise: /rev lists the four papers in syllabus order with real counts', () => {
  const st = NS ? NS.blank() : { lessons: {} };
  const rows = R.index(D, I, st);
  assert.deepEqual(rows.map(r => r.id), D.subjects.map(s => s.id));
  assert.deepEqual(rows.map(r => r.id), ['cma', 'aud', 'fm', 'sm']);
  assert.equal(rows.reduce((a, r) => a + r.lessons, 0), D.lessons.length);
  rows.forEach(r => { assert.equal(r.pyqs, I.subject(r.id).pyqs); assert.equal(r.done, 0); assert.equal(r.last30, R.plan(D, I, r.id).last30); });
  const aud = I.order('aud');
  st.lessons[aud[0]] = { done: 1 }; st.lessons[aud[1]] = { done: null, secs: 300 };
  assert.equal(R.index(D, I, st).find(r => r.id === 'aud').done, 1, 'only finished lessons count as understood');
});

test('revise: /rev\'s coral opens the sheet of the shared next step\'s subject, with a true kicker', () => {
  assert.deepEqual(R.pick(D, I, { subject: 'cma', label: 'Start here', rule: 'start' }), { subject: 'cma', kicker: 'Start here' });
  assert.equal(R.pick(D, I, { subject: 'aud', label: 'Continue', rule: 'continue' }).kicker, 'Your current paper');
  assert.equal(R.pick(D, I, { subject: 'aud', label: 'Next up', rule: 'subject' }).kicker, 'Your current paper');
  assert.equal(R.pick(D, I, { subject: 'fm', label: 'Next up', rule: 'route' }).kicker, 'Next on your route');
  assert.equal(R.pick(D, I, { subject: 'sm', label: 'Revise', rule: 'final' }).kicker, 'Due for a re-read');
  assert.deepEqual(R.pick(D, I, null), { subject: 'cma', kicker: 'Paper 4 · 100 marks' }, 'everything done: the paper with the most marks, named with them');
  assert.equal(R.pick(D, I, { subject: 'nosuch', label: 'Continue' }).kicker, 'Paper 4 · 100 marks');
  if (!S || !NS || !S.nextStep) return;
  // the 12 learner states: the coral names the subject of nextStep(kind 'lesson')
  for (const c of NS.states(D, I)) {
    const step = S.nextStep(c.state, D, { kind: 'lesson', today: c.today, I }), p = R.pick(D, I, step);
    assert.equal(p.subject, step ? step.subject : p.subject, c.name);
    if (c.expect && c.expect.lesson) assert.equal(p.subject, D.lessonById[c.expect.lesson.id].subject, c.name + ': ' + c.expect.lesson.id);
  }
});

test('revise: a lesson body holds its key idea, formula boxes and Recap; facts, tricks and mistakes wait behind their toggles', () => {
  const p = R.extract(SAMPLE);
  const h = R.bodyHtml(p, MD, {});
  assert.equal((h.match(/class="co co-key"/g) || []).length, 1);
  assert.equal((h.match(/class="co co-formula"/g) || []).length, 2);
  assert.match(h, /<section class="rv-rc"><h3 class="rv-h">Recap<\/h3><ul>/);
  assert.equal((h.match(/<div class="rv-fact" data-fact="\d+"><\/div>/g) || []).length, 2, 'two empty fact slots, in place');
  assert.match(h, /<div class="rv-x rv-x-tricks" data-x="tricks"><\/div>/); assert.match(h, /<div class="rv-x rv-x-mistakes" data-x="mistakes"><\/div>/);
  assert.ok(h.indexOf('co-formula') < h.indexOf('data-fact="1"') && h.indexOf('data-fact="1"') < h.lastIndexOf('co-formula'), 'the facts keep their place between the formula boxes');
  const all = R.bodyHtml(p, MD, { facts: true, tricks: true, mistakes: true });
  assert.match(all, /<div class="rv-fact" data-fact="1" data-done="1"><p>Lead line\.<\/p>[\s\S]*?<table/, 'facts drawn at once when switched on');
  assert.match(all, /co co-trick co-grp" aria-label="2 tricks"/);
  assert.match(all, /co co-exam/);
  assert.match(all, /<aside class="co co-mistake">/, 'one mistake stays a single box');
  assert.ok(!/undefined|NaN|\[object/.test(all));
  assert.equal(R.partHtml(p, 'fact', MD, 0), '', 'item 0 is a formula, not a fact');
  // a lesson without tricks or mistakes gets no empty slots
  const bare = R.extract('## In plain words\n::: key\nk\n:::\n## Recap\n* r');
  assert.ok(!/rv-x/.test(R.bodyHtml(bare, MD, {})));
  assert.equal(R.bodyHtml(null, MD, {}), '');
});

test('revise: grouped boxes, the facts line and the contents use the shared words', () => {
  const g1 = R.groupHtml('trick', '1 trick', [{ title: 'Only', inner: 'body' }], MD);
  assert.match(g1, /^<aside class="co co-trick">/);
  const g3 = R.groupHtml('mistake', '3 common mistakes', [{ title: 'A', inner: 'a' }, { title: 'B', inner: 'b' }, { title: '', inner: 'c' }], MD);
  assert.equal((g3.match(/<li>/g) || []).length, 3); assert.match(g3, /aria-label="3 common mistakes"/);
  assert.equal(R.groupHtml('trick', 'x', [], MD), '');
  const row = { id: 'cma.mc.bep', n: 31, title: 'Break-even point', topic: 'Marginal Costing', minutes: 22, status: 'in', pyqs: 1, papers: 1, last30: true };
  const m1 = R.metaHtml(row, false, null);
  assert.match(m1, /<a href="#\/pyq\?sub=cma\.mc\.bep">Asked 1 time<\/a> in 1 paper/);
  assert.ok(!/Understood|rv-flag/.test(m1));
  assert.match(R.metaHtml(Object.assign({}, row, { pyqs: 7, papers: 6 }), true, null), /Asked 7 times<\/a> in 6 papers[\s\S]*Understood/);
  assert.match(R.metaHtml(Object.assign({}, row, { pyqs: 0 }), false, null), /Not asked in an ICAI paper yet/);
  assert.ok(!/asked/i.test(R.metaHtml(Object.assign({}, row, { pyqs: 0 }), false, null, false)), 'no word about the bank while it is empty');
  assert.match(R.metaHtml(Object.assign({}, row, { status: 'legacy' }), false, { legacy: 'not in the current syllabus' }), /rv-flag">not in the current syllabus/);
  assert.match(R.metaHtml(Object.assign({}, row, { status: 'extra' }), false, null), /not named in the syllabus/);
  const a = R.articleHtml(row, false, null);
  assert.match(a, /<h2 id="rv-cma-mc-bep"><span class="rv-n" aria-hidden="true">31<\/span><a href="#\/l\/cma\.mc\.bep">Break-even point<\/a><\/h2>/);
  assert.match(a, /data-l30="1"/); assert.match(a, /aria-busy="true"/);
  const P = R.plan(D, I, 'cma'), toc = R.tocHtml(P);
  assert.equal((toc.match(/<li /g) || []).length, P.rows.length);
  assert.match(toc, /href="#\/rev\/cma#rv-cma-mc-bep" data-go="rv-cma-mc-bep"/);
});

test('revise: the view keeps the contract (GA.views.revise.enter/leave) and its sheet uses tokens only, with print rules', () => {
  assert.equal(typeof R.view.enter, 'function'); assert.equal(typeof R.view.leave, 'function');
  assert.equal(GA.views.revise, R.view);
  const css = fs.readFileSync(path.join(ROOT, 'app/css/revise.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/#[0-9a-f]{3,8}\b/i.test(css), 'no raw hex colours (tokens only)');
  assert.ok(!/rgba?\(/.test(css), 'no raw colour functions');
  assert.match(css, /@media print\s*\{[\s\S]*\.rv-bar[\s\S]*display:\s*none/);
  assert.ok(!/(^|[\s,}])\.rv(?=[\s:{,.])/.test(css), "no bare '.rv' rule (labs use b.rv for slider values)");
  const js = fs.readFileSync(path.join(ROOT, 'app/js/views/revise.js'), 'utf8');
  assert.equal((js.match(/btn pop/g) || []).length, 5, 'one coral on /rev, one on a sheet: its question, flashcard or lessons form, and one on an empty sheet (D18)');
  assert.ok(!/master|slave|whitelist|blacklist/i.test(js.replace(/Master theorem/g, '')), 'inclusive language');
});
