/* Lesson page (app/js/views/lesson.js): the pure helpers behind "Why it matters", the key-ideas box, the related-PYQs link, the footer's
   next lesson and the subject's end, the saved position and the reading-progress maths. Checked against the real catalogue and every shipped lesson. */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const MDR = require('../app/js/core/md.js');
const L = require('../app/js/views/lesson.js');

globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
require(path.join(ROOT, 'data/manifest.js'));
/* the shipped catalogue once the writers have shipped enough lessons for the footer and route tests; until then the fixture catalogue
   (every CA sub-topic, tests/fixtures/catalogue.js) with the fixture lesson's text (tests/fixtures/lesson-sample.md) under each title */
const FX = require('./fixtures/catalogue.js');
let NS = null; try { NS = require('./next-states.js'); } catch (e) { NS = null; }
const SHIPPED = NS ? NS.enough(GAD.manifest.main) : GAD.manifest.main.lessons.length >= 40;   // the same rule as the shared learner states
const M = SHIPPED ? GAD.manifest.main : FX.manifest();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const I = Ins.build(D, M.stats);
// lesson text: one file per lesson (data/lessons/<subject>/<id>.js, P1-60)
if (SHIPPED) (function load(dir) { fs.readdirSync(dir, { withFileTypes: true }).forEach(f => { const p = path.join(dir, f.name); if (f.isDirectory()) load(p); else if (f.name.endsWith('.js')) require(p); }); })(path.join(ROOT, 'data/lessons'));
const SAMPLE = fs.readFileSync(path.join(__dirname, 'fixtures', 'lesson-sample.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^## Flashcards[\s\S]*$/m, '').trim();
const MD = id => { if (!SHIPPED) return SAMPLE; const l = D.lessonById[id], bySubj = GAD.lessons && GAD.lessons[l.subject], one = GAD.lesson && GAD.lesson[id]; return ((bySubj && bySubj[id]) || one).md; };
let S = null; try { S = require('../app/js/core/stats.js'); } catch (e) { S = null; }
const blank = () => (NS ? NS.blank() : { profile: { route: null, focus: null }, lessons: {}, q: {}, log: [], tests: [], cards: {}, nb: {}, act: {}, labs: {}, seen: {} });
const doneAt = (st, id) => (st.lessons[id] = { first: 1, last: 2, done: 3, secs: 900, visits: 1, quiz: {} });
const MAIN = I.ranking[0], SECOND = I.ranking[1];                       // Paper 4 and Paper 5 (the GATE version used os / cn)

test('lesson: section() returns the markdown under one H2 and ignores ## inside code fences', () => {
  const md = '## A\none\n```\n## not a heading\n```\n## Recap\n* x\n* y\n## Flashcards\nQ:: q';
  assert.equal(L.section(md, 'Recap'), '* x\n* y');
  assert.match(L.section(md, 'A'), /## not a heading/);
  assert.equal(L.section(md, 'Missing'), '');
  assert.deepEqual(L.sections(md).map(s => s.title), ['A', 'Recap', 'Flashcards']);
});

test('lesson: sentences() never splits inside maths, code, bold, brackets or after e.g.', () => {
  assert.deepEqual(L.sentences('One $a. B$ two. Three'), ['One $a. B$ two.', 'Three']);
  assert.deepEqual(L.sentences('Use `x. Y` here. Next one.'), ['Use `x. Y` here.', 'Next one.']);
  assert.deepEqual(L.sentences('**Bold. Still** bold. After.'), ['**Bold. Still** bold.', 'After.']);
  assert.deepEqual(L.sentences('See (Fig. 2. Left) now. Done.'), ['See (Fig. 2. Left) now.', 'Done.']);
  assert.deepEqual(L.sentences('Many, e.g. Banker. Then more.'), ['Many, e.g. Banker.', 'Then more.']);
  assert.deepEqual(L.sentences('Value 0.5 is half. 2 more.'), ['Value 0.5 is half.', '2 more.']);
});

test('lesson: keyIdeas() takes the first three Recap bullets, shortened to a sentence when long', () => {
  const md = '## In plain words\nHello there. More.\n## Recap\n* Short one.\n* ' + 'Long first sentence that goes on for a while about pages and frames. '.repeat(1) + 'And a second sentence that pushes the bullet well past the limit of one line in the box, so it is cut. Third.\n* Third bullet.\n* Fourth bullet.';
  const k = L.keyIdeas(md, 3);
  assert.equal(k.length, 3);
  assert.equal(k[0], 'Short one.');
  assert.equal(k[1], 'Long first sentence that goes on for a while about pages and frames.');
  assert.equal(k[2], 'Third bullet.');
  // no recap list: the first sentence of each teaching section
  const k2 = L.keyIdeas('## In plain words\nFirst idea here. More.\n## How it works\n::: analogy\nskip me\n:::\nSecond idea. Then x.\n## Practice\nNot this.', 3);
  assert.deepEqual(k2, ['First idea here.', 'Second idea.']);
});

test('lesson: every shipped lesson gets three key ideas, each real text from its Recap', () => {
  let n = 0;
  for (const l of D.lessons) {
    const md = MD(l.id), rec = L.section(md, 'Recap'), k = L.keyIdeas(md, 3);
    assert.equal(k.length, 3, l.id);
    k.forEach(t => {
      assert.ok(t.length >= 12, l.id + ': ' + t);
      assert.ok(rec.replace(/\s+/g, ' ').includes(t.replace(/\.$/, '')), l.id + ' idea is not from its recap: ' + t);
      assert.equal((t.replace(/\\\$/g, '').match(/\$/g) || []).length % 2, 0, l.id + ' cuts a formula: ' + t);
    });
    n++;
  }
  assert.equal(n, D.lessons.length);
});

test('lesson: why() uses the sub-topic\'s own questions, recomputed independently from the bank', () => {
  let sub = 0, subj = 0, out = 0;
  for (const l of D.lessons) {
    const f = L.why(I, l), qs = D.questions.filter(q => q.subtopic === l.id);
    assert.equal(f.deps, I.dependents(l.id).length, l.id + ': the lessons built on it');
    if (l.status !== 'in') {
      // outside the 2027 syllabus text: its own status and numbers, never the subject's (P2-08)
      out++;
      assert.equal(f.scope, 'out', l.id);
      assert.equal(f.status, l.status, l.id);
      assert.equal(f.pyqs, qs.length, l.id);
      const h = L.whyHtml(f);
      assert.match(h, l.status === 'legacy' ? /Not in the current ICAI syllabus \(an earlier syllabus named it\)\./ : /Not named in the ICAI syllabus text\./, l.id);
      assert.ok(qs.length ? h.includes(`asked it <b>${qs.length}</b> time`) : /No ICAI question is tagged to it yet\./.test(h), l.id + ': ' + h);
      assert.ok(!h.includes(D.subjectById[l.subject].name), l.id + ' cites its subject: ' + h);
      continue;
    }
    if (qs.length) {
      sub++;
      assert.equal(f.scope, 'sub', l.id);
      assert.equal(f.pyqs, qs.length, l.id);
      assert.equal(f.papers, new Set(qs.map(q => q.paper)).size, l.id);
      assert.equal(f.marks, qs.reduce((s, q) => s + q.marks, 0), l.id);
      assert.equal(f.last, Math.max(...qs.map(q => q.year)), l.id);
      assert.ok(f.papers <= f.of, l.id);
    } else {
      subj++;
      const sq = D.questions.filter(q => q.subject === l.subject);
      assert.equal(f.scope, 'subject', l.id);
      assert.equal(f.pyqs, sq.length, l.id);
      assert.equal(f.papers, new Set(sq.map(q => q.paper)).size, l.id);
      // 'marks a paper' is the like-for-like number Home, /syllabus and the subject hero show, not the raw average (P1-03)
      const s = I.subject(l.subject);
      assert.equal(f.perPaper, s.perPaper != null ? s.perPaper : s.marksPerPaper, l.id + ': marks a paper');
      if (!f.deps || f.deps < 5) assert.ok(L.whyHtml(f).includes(`<b>${Math.round(f.perPaper * 10) / 10}</b> marks a paper`), l.id);
    }
    const h = L.whyHtml(f);
    assert.ok(!/undefined|NaN|null/.test(h), l.id + ': ' + h);
  }
  assert.ok(sub > 0 && subj > 0 && out === D.lessons.filter(l => l.status !== 'in').length, `${sub} sub-topic lines, ${subj} subject fallbacks, ${out} outside the syllabus`);
});

test('lesson: whyHtml() wording, singulars and escaping', () => {
  assert.equal(L.whyHtml({ scope: 'sub', pyqs: 1, papers: 1, of: 30, marks: 2, last: 2019, first: 2019 }), '<b>1</b> past question in <b>1 of 30</b> papers, worth <b>2</b> marks; asked in <b>2019</b>.');
  assert.match(L.whyHtml({ scope: 'sub', pyqs: 1, papers: 1, of: 30, marks: 1, last: 2023, first: 2023 }), /worth <b>1<\/b> mark; asked/);
  assert.match(L.whyHtml({ scope: 'subject', name: 'Algorithms', pyqs: 179, papers: 30, of: 30, perPaper: 9.63 }), /<b>9.6<\/b> marks a paper/);
  assert.match(L.whyHtml({ scope: 'sub', pyqs: 16, papers: 14, of: 30, marks: 27, last: 2025, first: 2008 }), /last asked in <b>2025<\/b>/);
  assert.match(L.whyHtml({ scope: 'subject', name: 'A & B', pyqs: 152, papers: 30, of: 30, perPaper: 8.3 }), /<b>A &amp; B<\/b> has <b>152<\/b> past questions in <b>30 of 30<\/b> papers, <b>8.3<\/b> marks a paper\./);
  assert.equal(L.whyHtml(null), '');
  // foundations (P3-12): 5 or more lessons built on it replace the subject's numbers, and follow a one- or two-question line
  assert.equal(L.whyHtml({ scope: 'subject', name: 'Auditing and Ethics', pyqs: 152, papers: 30, of: 30, perPaper: 8.3, deps: 48 }), '<b>48</b> later lessons build on it.');
  // no ICAI bank yet: the paper's own facts (its marks and exam day), never a question count
  assert.equal(L.whyHtml({ scope: 'paper', name: 'Cost and Management Accounting', paper: 'P4', marks: 100, day: '2027-01-08', deps: 0 }), 'Part of <b>Paper 4</b> (<b>100</b> marks), written on <b>Fri 8 Jan</b>.');
  assert.equal(L.whyHtml({ scope: 'paper', name: 'Financial Management', paper: 'P6A', marks: 50, day: null, deps: 6 }), 'Part of <b>Paper 6A</b> (<b>50</b> marks, half of the 100-mark Paper 6). <b>6</b> later lessons build on it.');
  assert.match(L.whyHtml({ scope: 'subject', name: 'Audit', pyqs: 152, papers: 30, of: 30, perPaper: 8.3, deps: 4 }), /^Not asked on its own yet, but <b>Audit<\/b> has/);
  assert.equal(L.whyHtml({ scope: 'sub', pyqs: 1, papers: 1, of: 30, marks: 2, last: 2019, first: 2019, deps: 45 }), '<b>1</b> past question in <b>1 of 30</b> papers, worth <b>2</b> marks; asked in <b>2019</b>. <b>45</b> later lessons build on it.');
  assert.ok(!/build on it/.test(L.whyHtml({ scope: 'sub', pyqs: 3, papers: 3, of: 30, marks: 4, last: 2019, first: 2010, deps: 45 })), 'three questions speak for themselves');
  assert.equal(L.whyHtml({ scope: 'out', status: 'legacy', pyqs: 0, deps: 0 }), '<span class="lsn-why-k">Not in the current ICAI syllabus (an earlier syllabus named it).</span> No ICAI question is tagged to it yet.');
  assert.equal(L.whyHtml({ scope: 'out', status: 'extra', pyqs: 7, papers: 6, of: 30, marks: 12, last: 2015, first: 2008, deps: 0 }),
    '<span class="lsn-why-k">Not named in the ICAI syllabus text.</span> Past papers asked it <b>7</b> times, in <b>6 of 30</b> papers, worth <b>12</b> marks; last asked in <b>2015</b>.');
});

test('lesson: practiceLink() counts exactly what the bank filter will show', () => {
  for (const l of D.lessons) {
    const p = L.practiceLink(I, l), q = new URLSearchParams(p.href.split('?')[1]);
    const shown = D.questions.filter(x => (!q.get('subject') || x.subject === q.get('subject')) && (!q.get('topic') || x.topic === q.get('topic')) && (!q.get('sub') || x.subtopic === q.get('sub')));
    assert.equal(p.n, shown.length, l.id + ' ' + p.href);
    assert.equal(q.get('subject'), l.subject);
  }
});

test('lesson: neighbours() follows syllabus order across subjects', () => {
  const order = [];
  D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => { if (D.lessonById[n.id]) order.push(n.id); })));
  assert.deepEqual(L.neighbours(D, order[0]), { prev: undefined, next: order[1] });
  assert.deepEqual(L.neighbours(D, order[5]), { prev: order[4], next: order[6] });
  assert.equal(L.neighbours(D, order[order.length - 1]).next, undefined);
  assert.deepEqual(L.neighbours(D, 'no.such.id'), { prev: undefined, next: undefined });
});

test('lesson: progressOf() is 0 at the start, 1 when the end reaches the bottom, clamped', () => {
  approx(L.progressOf({ top: 64, height: 5000 }, 64, 1000), 0);
  approx(L.progressOf({ top: 300, height: 5000 }, 64, 1000), 0);
  approx(L.progressOf({ top: 64 - 4064, height: 5000 }, 64, 1000), 1);           // bottom edge at 1000
  approx(L.progressOf({ top: 64 - 2032, height: 5000 }, 64, 1000), 0.5);
  approx(L.progressOf({ top: -9000, height: 5000 }, 64, 1000), 1);
  approx(L.progressOf({ top: 100, height: 300 }, 64, 1000), 0);                 // shorter than the screen
  approx(L.progressOf({ top: 10, height: 300 }, 64, 1000), 1);
});

test('lesson: depth levels and labels (Quick / Exam / Deep, content/sections.json)', () => {
  assert.deepEqual(L.DEPTHS.map(d => d[1]), ['Quick', 'Exam', 'Deep']);
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/sections.json'), 'utf8'));
  assert.deepEqual(L.DEPTHS.map(d => d[1]), cfg.depths.map(d => d[1]), 'the defaults are the shipped table');
  assert.equal(L.LEVEL['in-plain-words'], 1); assert.equal(L.LEVEL.recap, 1); assert.equal(L.LEVEL['under-the-hood'], 3);
});

/* ---------------------------------------------------------------- the footer: learning order, route, subject end (P0-08, P1-02, P1-06, P1-08) */
test('lesson: orderOf() is I.order per subject and place() numbers the step, the topic position and the plain neighbours', () => {
  for (const s of D.subjects) {
    const ids = L.orderOf(D, I, s.id);
    assert.deepEqual(ids, I.order(s.id), s.id);
    assert.ok(ids.every(id => D.lessonById[id].subject === s.id), s.id);
    ids.forEach((id, i) => {
      const p = L.place(D, I, id), topic = ids.filter(x => D.lessonById[x].topic === D.lessonById[id].topic);
      assert.equal(p.step, i + 1, id); assert.equal(p.steps, ids.length, id);
      assert.equal(p.inTopic, topic.indexOf(id) + 1, id); assert.equal(p.ofTopic, topic.length, id);
      assert.equal(p.prev, i ? ids[i - 1] : null, id + ': no Previous on a subject\'s first lesson');
      assert.equal(p.succ, ids[i + 1] || null, id);
    });
  }
  assert.equal(L.place(D, I, 'no.such.lesson'), null);
});

test('lesson: after() never targets a done lesson, skips only finished ones, stays in its group and ends at the subject\'s end', () => {
  const rnd = (() => { let a = 7; return () => ((a = (a * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff); })();
  for (let trial = 0; trial < 4; trial++) {
    const st = blank();
    D.lessons.forEach(l => { if (rnd() < [0, 0.3, 0.6, 0.9][trial]) doneAt(st, l.id); });
    for (const l of D.lessons) {
      const r = L.after(st, D, I, l.id, null), ord = I.order(l.subject), i = ord.indexOf(l.id), grp = l.status === 'in';
      const left = ord.slice(i + 1).filter(x => (D.lessonById[x].status === 'in') === grp && !L.isDone(st, x));
      if (!left.length) { assert.equal(r, null, l.id + ' should end'); continue; }
      assert.equal(r.on, 'subject');
      assert.equal(r.id, left[0], l.id);
      assert.ok(!L.isDone(st, r.id), l.id + ': targets a done lesson');
      ord.slice(i + 1, ord.indexOf(r.id)).forEach(x => assert.ok(L.isDone(st, x) || (D.lessonById[x].status === 'in') !== grp, l.id + ' skips the unread ' + x));
    }
  }
});

test('lesson: walking a subject by the footer from its first lesson meets every prerequisite first', () => {
  for (const s of D.subjects) {
    const st = blank(), ord = I.order(s.id).filter(x => D.lessonById[x].status === 'in');
    let cur = ord[0], n = 0;
    while (cur) {
      D.lessonById[cur].needs.filter(x => D.lessonById[x] && D.lessonById[x].subject === s.id && D.lessonById[x].status === 'in')
        .forEach(x => assert.ok(L.isDone(st, x), `${s.id}: the footer opens ${cur} before its prerequisite ${x}`));
      doneAt(st, cur); n++;
      const r = L.after(st, D, I, cur, null);
      cur = r && r.id;
      assert.ok(n <= ord.length, s.id + ': the walk loops');
    }
    assert.equal(n, ord.length, s.id + ': the footer chain reads every in-syllabus lesson once');
  }
});

test('lesson: on a route the footer follows the route, the URL\'s path wins over profile.route, and a finished route hands over to the subject', () => {
  const crash = I.path('crash').lessons, st = blank();
  assert.equal(L.routeOf(I, st, crash[0], ''), null, 'no route chosen');
  st.profile.route = 'crash';
  const r = L.routeOf(I, st, crash[0], '');
  assert.equal(r.id, 'crash'); assert.equal(r.url, false); assert.deepEqual(r.lessons, crash);
  assert.deepEqual(L.after(st, D, I, crash[0], r), { id: crash[1], on: 'route' });
  doneAt(st, crash[1]);
  assert.deepEqual(L.after(st, D, I, crash[0], r), { id: crash[2], on: 'route' }, 'skips the finished route lesson');
  const z = L.routeOf(I, st, crash[0], 'zero');
  assert.equal(z.id, 'zero'); assert.equal(z.url, true);
  assert.equal(L.routeOf(I, st, crash[0], 'no-such-route'), null);
  const outside = D.lessons.find(l => crash.indexOf(l.id) < 0);
  assert.equal(L.routeOf(I, st, outside.id, 'crash'), null, 'a route that does not list the lesson is not followed');
  const last = crash[crash.length - 1], rl = L.routeOf(I, blank(), last, 'crash'), a = L.after(blank(), D, I, last, rl);
  assert.ok(!a || a.on === 'subject', 'past the route\'s last lesson the subject order takes over');
});

test('lesson: the local footer rule agrees with GA.stats.nextStep scope "after:" (12 learner states, every lesson)', () => {
  if (!S || typeof S.nextStep !== 'function' || !NS) return;            // the shared rule is not here yet: nothing to agree with
  const states = NS.states(D, I);
  let n = 0;
  for (const c of states) {
    for (const l of D.lessons) {
      const route = L.routeOf(I, c.state, l.id, ''), mine = L.after(c.state, D, I, l.id, route);
      const s = S.nextStep(c.state, D, { kind: 'lesson', scope: 'after:' + l.id, I, today: c.today });
      assert.equal(s ? s.id : null, mine ? mine.id : null, `${c.name}: after ${l.id}`);
      if (mine) assert.ok(!L.isDone(c.state, mine.id), `${c.name}: after ${l.id} targets a done lesson`);
      n++;
    }
  }
  assert.ok(n >= 11 * D.lessons.length, n + ' checks');
});

test('lesson: on the demo learner\'s touched lessons the footer coral never targets a done lesson', () => {
  if (!NS || !NS.demoState) return;
  const demo = NS.demoState(NS.TODAY);
  if (!demo) return;
  const touched = Object.keys(demo.lessons).filter(id => D.lessonById[id]);
  assert.ok(touched.length >= 5, touched.length + ' touched');
  touched.forEach(id => { const r = L.after(demo, D, I, id, L.routeOf(I, demo, id, '')); if (r) assert.ok(!L.isDone(demo, r.id), id + ' -> ' + r.id); });
});

test('lesson: tally() counts the subject\'s understood lessons, answered self-checks and tried PYQs from the learner\'s own records', () => {
  const st = blank(), os = D.lessons.filter(l => l.subject === MAIN), oq = D.questions.filter(q => q.subject === MAIN);
  const total = os.reduce((n, l) => n + I.lessonInfo(l.id).quiz, 0);
  assert.equal(total, os.reduce((n, l) => n + (M.stats.quiz[l.id] || 0), 0), 'the subject\'s self-check count is the manifest\'s');
  assert.deepEqual(L.tally(st, D, MAIN), { lessons: os.length, done: 0, checks: 0, right: 0, checksTotal: null, pyqs: oq.length, tried: 0 });
  assert.equal(L.tally(st, D, MAIN, I).checksTotal, total);
  doneAt(st, os[0].id); doneAt(st, os[1].id);
  st.lessons[os[0].id].quiz = { 0: { n: 2, ok: 1, last: 1 }, 1: { n: 1, ok: 0, last: 1 } };
  st.q[oq[0].id] = { n: 1, ok: 1 }; st.q[oq[1].id] = { n: 0, seen: 5 };
  st.q[D.questions.find(q => q.subject === SECOND).id] = { n: 3, ok: 3 };              // another subject does not count
  assert.deepEqual(L.tally(st, D, MAIN), { lessons: os.length, done: 2, checks: 2, right: 1, checksTotal: null, pyqs: oq.length, tried: 2 });
});

test('lesson: nextSubject() hands over in the shared ranking (CS by marks a paper, never GA), skipping finished subjects', () => {
  const rank = (Array.isArray(I.ranking) && I.ranking.length ? I.ranking : I.subjects.slice().sort((a, b) => (b.perPaper || b.marksPerPaper) - (a.perPaper || a.marksPerPaper)).map(s => s.id))
    .filter(id => (I.subject(id) || {}).section === 'CS');
  const st = blank();
  for (let i = 0; i < rank.length; i++) {
    const ns = L.nextSubject(st, D, I, rank[i]);
    assert.equal(ns.id, rank[(i + 1) % rank.length], rank[i]);
    assert.equal(ns.lesson, I.order(ns.id).find(x => D.lessonById[x].status === 'in'), rank[i] + ': the next subject opens at its first lesson');
  }
  const nx = rank[(rank.indexOf(SECOND) + 1) % rank.length];
  D.lessons.filter(l => l.subject === nx).forEach(l => doneAt(st, l.id));
  assert.notEqual(L.nextSubject(st, D, I, SECOND).id, nx, 'a finished subject is skipped');
  D.lessons.forEach(l => doneAt(st, l.id));
  assert.equal(L.nextSubject(st, D, I, SECOND), null, 'nothing left');
});

test('lesson: the header and section-bar wording (needsLine, barText, flagTip) is plain and number-true', () => {
  assert.equal(L.needsLine([{ done: true }, { done: false }]), 'Builds on 2 lessons · 1 done');
  assert.equal(L.needsLine([{ done: false }]), 'Builds on 1 lesson');
  assert.equal(L.barText('How it works', 'Multi-level page tables', 2, 8), 'How it works › Multi-level page tables · 2/8');
  assert.equal(L.barText('Recap', '', 8, 8), 'Recap · 8/8');
  assert.match(L.flagTip('legacy', { pyqs: 7, lastYear: 2015 }), /^Not in the current ICAI syllabus \(an earlier syllabus named it\)\. Asked 7 times in ICAI papers, last in 2015\.$/);
  assert.match(L.flagTip('extra', { pyqs: 1, lastYear: 2009 }), /Not named in the ICAI syllabus text\. Asked 1 time in ICAI papers, last in 2009\./);
  assert.match(L.flagTip('extra', null), /No ICAI question is tagged to this sub-topic yet/);
  for (const l of D.lessons.filter(x => x.status !== 'in')) {
    const sub = I.subtopic(l.id), tip = L.flagTip(l.status, sub);
    assert.ok(!/undefined|NaN|null/.test(tip), l.id + ': ' + tip);
    if (sub && sub.pyqs) assert.ok(tip.includes(`Asked ${sub.pyqs} time`), l.id);
  }
});

test('lesson: headWords() ids are the rendered heading ids, and minutesLeft() shrinks to the end of every lesson', () => {
  let heads = 0;
  for (const l of D.lessons) {
    const md = MD(l.id), hw = L.headWords(md), html = MDR.render(md, { sections: true, lessonId: l.id });
    const ids = new Set([...html.matchAll(/<h[23] id="([^"]+)"/g)].map(m => m[1]));
    hw.slice(1).forEach(h => assert.ok(ids.has(h.id), l.id + ': no rendered heading ' + h.id));
    assert.equal(hw.length - 1, ids.size, l.id + ': every ## / ### heading is counted once');
    let prev = Infinity;
    hw.slice(1).forEach(h => { const m = L.minutesLeft(md, h.id, l.minutes); assert.ok(m >= 1 && m <= l.minutes && m <= prev, `${l.id}#${h.id}: ${m}`); prev = m; heads++; });
    assert.equal(L.minutesLeft(md, 'no-such-heading', l.minutes), null);
  }
  assert.ok(heads >= D.lessons.length, heads + ' headings');
});

test('lesson: a checked option shows and says its outcome (P0-18, D17): the missed answer of a one-answer check is filled, MSQ stays dashed', () => {
  assert.deepEqual(L.optionMark('mcq', true, true), { cls: 'ok', say: 'Your answer, correct: ' });
  assert.deepEqual(L.optionMark('mcq', false, true), { cls: 'bad', say: 'Your answer, wrong: ' });
  assert.deepEqual(L.optionMark('mcq', true, false), { cls: 'ok', say: 'Correct answer, not selected: ' });
  assert.deepEqual(L.optionMark('msq', true, false), { cls: 'miss', say: 'Correct answer, not selected: ' });
  assert.deepEqual(L.optionMark('mcq', false, false), { cls: 'dim', say: '' });
  // the outcome is a hidden prefix inside the label, never an aria-label rebuilt from textContent (which reads maths as 'xyxyxy')
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/lesson.js'), 'utf8');
  assert.ok(!/setAttribute\('aria-label',[^)]*textContent/.test(src), 'lesson.js builds an aria-label from textContent');
});


/* ---------------------------------------------------------------- the progressive render (P1-11): parts and pieces give the HTML of the whole */
test('lesson: rendering a lesson part by part, and a part piece by piece, gives exactly the HTML of rendering it whole', () => {
  let parts = 0, split = 0;
  for (const l of D.lessons) {
    const md = MD(l.id), o = { sections: true, lessonId: l.id }, ps = L.chunks(md);
    assert.equal(ps.map(p => p.md).join('\n').trim(), md.replace(/\r\n?/g, '\n').trim(), l.id + ': the parts are the lesson');
    const whole = MDR.render(md, o).replace(/\n/g, '');
    assert.equal(ps.map(p => MDR.render(p.md, o)).join('').replace(/\n/g, ''), whole, l.id + ': parts');
    ps.forEach(p => {
      parts++;
      if (!p.sec) return;
      assert.equal(p.sec, MDR.slug(p.title), l.id);
      const pc = L.pieces(p.md);
      if (pc.length > 1) split++;
      assert.equal(pc.join('\n'), p.md, l.id + '#' + p.sec + ': the pieces are the part');
      const head = MDR.render(pc[0], o).replace(/\n/g, ''), rest = pc.slice(1).map(x => MDR.render(x, o)).join('').replace(/\n/g, '');
      assert.ok(head.endsWith('</section>'), l.id + '#' + p.sec);
      assert.equal(head.slice(0, -'</section>'.length) + rest + '</section>', MDR.render(p.md, o).replace(/\n/g, ''), l.id + '#' + p.sec + ': pieces');
    });
  }
  assert.ok(parts >= D.lessons.length && split >= 1, `${parts} parts, ${split} split into pieces`);
});

/* ---------------------------------------------------------------- the section bar's name speaks a heading's maths (P1-09 verifier flag) */
test('lesson: speakMd() / speakTex() turn a heading into words for its label; every heading with maths keeps its numbers and letters', () => {
  assert.equal(L.speakMd('How big is big? One machine, $10^9$ steps a second'), 'How big is big? One machine, 10 to the 9 steps a second');
  assert.equal(L.speakMd('Design 1: $a^n b^n$, a counter'), 'Design 1: a to the n b to the n, a counter');
  assert.equal(L.speakMd('Counting the edges twice: $n_0 = n_2 + 1$'), 'Counting the edges twice: n sub 0 = n sub 2 + 1');
  assert.equal(L.speakMd('Is a string in $L^*$?'), 'Is a string in L star?');
  assert.equal(L.speakMd('Design 2: $ww^R$, guessing the middle'), 'Design 2: ww reversed, guessing the middle');
  assert.equal(L.speakMd('First proof: $\\{a^nb^nc^n : n \\ge 0\\}$'), 'First proof: {a to the n b to the n c to the n: n ≥ 0}');
  assert.equal(L.speakMd('Reading $\\mu$ and $\\sigma$ off a formula'), 'Reading μ and σ off a formula');
  assert.equal(L.speakMd('**Bold**, `code` and [[os.mem.tlb|the TLB]]'), 'Bold, code and the TLB');
  assert.equal(L.speakTex('\\frac{1}{2}'), '1 over 2');
  assert.equal(L.speakTex('2^{-1}'), '2 to the -1');
  let n = 0;
  for (const l of D.lessons) {
    L.headWords(MD(l.id)).slice(1).filter(h => /\$/.test(h.title)).forEach(h => {
      const s = L.speakMd(h.title);
      n++;
      assert.ok(!/[\\$^_]/.test(s), `${l.id}#${h.id}: '${s}' still has TeX in it`);
      const digits = t => (t.match(/\d/g) || []).join('');
      assert.equal(digits(s), digits(h.title.replace(/\\[a-zA-Z]+/g, '')), `${l.id}#${h.id}: the digits survive in order`);
    });
  }
  assert.ok(n >= 1, n + ' headings with maths');
});

/* ---------------------------------------------------------------- Part B helpers (P2-14, P2-15, P2-16, P2-17, P2-09, P2-11, P2-66, P3-47) */
test('lesson: levelMinutes() splits the lesson\'s minutes by the words each depth shows, with the build\'s own word count', () => {
  let uth = 0;
  for (const l of D.lessons) {
    const md = MD(l.id), lm = L.levelMinutes(md, l.minutes);
    assert.equal(L.readWords(md), l.words, l.id + ': the same count as tools/buildlib/lessons.py words()');
    assert.equal(lm.by[2], l.minutes, l.id + ': Deep is the whole lesson');
    assert.ok(lm.by[0] >= 1 && lm.by[0] <= lm.by[1] && lm.by[1] <= lm.by[2], l.id + ': ' + lm.by);
    assert.ok(lm.by[0] < lm.by[1], l.id + ': Intuition is shorter than Standard');
    if (lm.sec['under-the-hood']) { uth++; assert.ok(lm.sec['under-the-hood'] >= 1 && lm.sec['under-the-hood'] <= l.minutes, l.id); }
    Object.keys(lm.sec).forEach(k => assert.ok(L.chunks(md).some(p => p.sec === k), l.id + ': ' + k));
  }
  assert.ok(uth >= 1, uth + ' lessons with a deep-dive');
  assert.deepEqual(L.levelMinutes('## In plain words\none two three four\n## How it works\n' + 'w '.repeat(12) + '\n## Under the hood\n' + 'w '.repeat(4), 10).by, [2, 8, 10]);
  assert.deepEqual(L.levelMinutes('', 0).by, [0, 0, 0]);
});

test('lesson: allNeeds() is every prerequisite behind a lesson, once, never itself; durText() prints the map\'s durations', () => {
  const dfs = id => { const seen = new Set(), go = x => (D.lessonById[x].needs || []).forEach(n => { if (D.lessonById[n] && n !== id && !seen.has(n)) { seen.add(n); go(n); } }); go(id); return seen; };
  let longer = 0;
  for (const l of D.lessons) {
    const a = L.allNeeds(D, l.id), ref = dfs(l.id);
    assert.equal(new Set(a).size, a.length, l.id + ': no repeats');
    assert.ok(!a.includes(l.id), l.id);
    assert.deepEqual(new Set(a), ref, l.id + ': the transitive prerequisites');
    (l.needs || []).filter(n => D.lessonById[n]).forEach(n => assert.ok(a.includes(n), l.id + ' lists its direct need ' + n));
    if (a.length > (l.needs || []).filter(n => D.lessonById[n]).length) longer++;
  }
  assert.ok(longer >= 1, longer + ' lessons get the "Everything to learn first" link');
  assert.equal(L.durText(45), '45 min'); assert.equal(L.durText(89), '89 min'); assert.equal(L.durText(96), '1.6 h'); assert.equal(L.durText(762), '13 h'); assert.equal(L.durText(599), '10 h');
});

test('lesson: quizLast() takes the newest answer from the log, else the counts; scoreText() and lastText() wording', () => {
  const st = blank();
  st.lessons['x.y'] = { quiz: { 0: { n: 2, ok: 1 }, 1: { n: 1, ok: 0 }, 2: { n: 3, ok: 3 }, 3: { n: 2, ok: 1 } } };
  st.log = [[1, 'x.y#0', 1, null, 'z'], [2, 'x.y#0', 0, null, 'z'], [3, 'x.y#1', 1, null, 'z'], [4, 'q:1', 1, null, 'p'], [5, 'x.yz#2', 0, null, 'z']];
  assert.deepEqual(L.quizLast(st, 'x.y'), { 0: false, 1: true, 2: true, 3: true });   // 3: one of two right with no log row: counted right
  assert.deepEqual(L.quizLast(blank(), 'x.y'), {});
  assert.equal(L.scoreText(5, 0, 0), '5 questions'); assert.equal(L.scoreText(1, 0, 0), '1 question');
  assert.equal(L.scoreText(5, 2, 1), '1 of 2 right · 3 to go'); assert.equal(L.scoreText(5, 5, 4), '4 of 5 right');
  assert.equal(L.lastText({ 0: true, 1: false, 7: true }, 5), 'Last time: 1 of 2 right');
  assert.equal(L.lastText({}, 5), '');
});

test('lesson: pyqOrder() puts the picked questions easy to hard, then newest first; practiceSet() is the Related PYQs link\'s set', () => {
  const R = { easy: 1, medium: 2, hard: 3 };
  for (const l of D.lessons) {
    const ids = l.pyq || [], o = L.pyqOrder(D, ids);
    assert.deepEqual(o.slice().sort(), ids.filter(id => D.qById[id]).sort(), l.id + ': the same questions');
    for (let i = 1; i < o.length; i++) {
      const a = D.qById[o[i - 1]], b = D.qById[o[i]];
      assert.ok(R[a.diff] < R[b.diff] || (R[a.diff] === R[b.diff] && a.year >= b.year), `${l.id}: ${a.id} before ${b.id}`);
    }
    const pl = L.practiceLink(I, l), ps = L.practiceSet(blank(), D, l, pl);
    assert.equal(ps.n, pl.n, l.id + ': the link counts what it opens');
    assert.equal(ps.solved, 0, l.id);
  }
  assert.deepEqual(L.pyqOrder(D, ['no:such', null]), []);
  const l = D.lessons.find(x => D.questions.filter(q => q.subtopic === x.id).length >= 3), pl = L.practiceLink(I, l), st = blank();
  const qs = D.questions.filter(q => q.subtopic === l.id);
  st.q[qs[0].id] = { n: 2, lastOk: true }; st.q[qs[1].id] = { n: 1, lastOk: false }; st.q[qs[2].id] = { seen: 5 };
  assert.deepEqual(L.practiceSet(st, D, l, pl), { n: pl.n, solved: 1 });
});

test('lesson: group labels, the tier label (D14) and the outside-syllabus status words are plain and one per status', () => {
  assert.equal(L.groupLabel('mistake', 5), '5 common mistakes'); assert.equal(L.groupLabel('trick', 1), '1 trick'); assert.equal(L.groupLabel('formula', 3), '3 formulas');
  assert.equal(L.groupLabel('analogy', 2), null, 'analogies stay as they are');
  assert.equal(L.tierLabel('standard'), 'Extended'); assert.equal(L.tierLabel('core'), 'Core'); assert.equal(L.tierLabel('advanced'), 'Advanced');
  assert.equal(L.tierLabel('standard', { tier: { standard: 'Wider' } }), 'Wider', 'the shell\'s string table wins');
  assert.equal(L.flagLabel('legacy'), 'Not in the current syllabus');
  assert.equal(L.flagLabel('legacy', { legacy: 'not in the current syllabus' }), 'Not in the current syllabus');
  assert.equal(L.flagLabel('extra'), 'Outside the ICAI syllabus text');
  // a delegated click selector must never match the body's own state attributes (body[data-full] once switched every click to Deep)
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/lesson.js'), 'utf8');
  const delegated = [...src.matchAll(/U\.on\((?:root|body), 'click', '([^']+)'/g)].map(m => m[1]);
  ['[data-full]', '[data-depth]', '[data-lv]', '[data-part]', '[data-sec]'].forEach(sel => assert.ok(!delegated.includes(sel), 'delegated on ' + sel));
});

test('lesson: reportText() is the copy-only report (P3-48, D16): the lesson and its id, the build date and the learner\'s words', () => {
  const l = D.lessons.find(x => x.id === 'os.mem.paging') || D.lessons[0];
  const t = L.reportText({ id: l.id, title: l.title, built: '2026-10-17', words: '  In Worked examples the second\nstep says 12 frames.  ' });
  assert.deepEqual(t.split('\n'), ['PassBook · problem report', `Lesson: ${l.title} (id ${l.id})`, 'Data: built 2026-10-17',
    'What looks wrong: ', 'In Worked examples the second', 'step says 12 frames.']);
  assert.equal(L.reportText({ id: l.id, title: l.title, words: ' ' }), `PassBook · problem report\nLesson: ${l.title} (id ${l.id})\nWhat looks wrong: (not described)`, 'no date, no words');
  assert.equal(L.reportText({ id: 'x.y', words: 'one line' }).split('\n')[1], 'Lesson: x.y (id x.y)', 'a lesson without a title still names its id');
  assert.ok(!/https?:|fetch|XMLHttpRequest|sendBeacon/.test(fs.readFileSync(path.join(ROOT, 'app/js/views/lesson.js'), 'utf8').match(/const reportSheet[\s\S]*?\n      };/)[0]), 'the dialog never sends anything');
});

test('lesson: the PYQ header link keeps its underline on its words, never on the "·" before it, and drops the dot on a line of its own', () => {
  const css = fs.readFileSync(path.join(ROOT, 'app/css/lesson.css'), 'utf8');
  const rule = sel => { const m = css.match(new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}')); return m ? m[1] : ''; };
  assert.match(rule('.ga-pyq-embed > header > .pq-all'), /text-decoration:\s*none/, 'an inline-flex link would hand .md a\'s underline to its ::before and the margin');
  assert.match(rule('.ga-pyq-embed > header > .pq-all > span'), /text-decoration:\s*underline/, 'the words carry the underline');
  assert.match(rule('.ga-pyq-embed > header > span + .pq-all::before'), /content:\s*"·"/);
  assert.match(css, /@media screen \{\s*\.ga-pyq-embed > header > span \+ \.pq-all\.pq-own::before \{ display: none; \}\s*\.ga-pyq-embed > header > \.pq-all\.pq-own \{ margin-right: var\(--pq-sep/,
    'screen only: print lays the header out afresh, with the dot');
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/lesson.js'), 'utf8');
  const fit = src.match(/function fitAll\(el\) \{[\s\S]*?\n  \}/)[0];
  assert.ok(fit.indexOf('pyqHeads(el)') > -1 && fit.indexOf('pyqHeads(el)') < fit.indexOf('GA.fit.all(el)'), 'measured before GA.fit writes (one batched pass, P1-11)');
  assert.equal((fit.match(/heads\(\)/g) || []).length, 3, 'written on every way out of fitAll');
});

test('lesson: readAt() saves the reading position only once the visit moves off where it landed, never the first section, never in a peek (P1-01)', () => {
  const l = D.lessons.find(x => x.id === 'os.mem.paging') || D.lessons[0];
  const hw = L.headWords(MD(l.id)).slice(1).filter(h => h.lv === 2), first = hw[0].id, a = hw[2].id, b = hw[3].id;
  // one visit: steps [heading, ms on the page, landed?]; the result is what each step (the last one = leaving) would save
  const visit = (steps, saved) => {
    let s = { start: null, moved: false };
    return steps.map(([h, ms, landed]) => { const r = L.readAt(s, { h, ms, landed: landed !== false, first, saved: saved || null }); s = { start: r.start, moved: r.moved }; return r.save; });
  };
  assert.deepEqual(visit([[first, 0], [first, 23000]]), [null, null], 'a fresh profile, 23 s at the top: nothing saved (the P0-08 peek rule holds)');
  assert.deepEqual(visit([[first, 0], [first, 23000]], a), [null, null], 'staying on the header never replaces a real saved place');
  assert.deepEqual(visit([[first, 0], [a, 5000], [a, 8000]]), [null, null, null], 'a peek (< 20 s) saves nothing');
  assert.deepEqual(visit([[first, 0], [a, 10000], [a, 23000]]), [null, null, a], 'reading on past the top saves the heading after 20 s');
  assert.deepEqual(visit([[first, 0], [a, 10000], [a, 23000]], a), [null, null, null], 'the heading already saved is not written again');
  assert.deepEqual(visit([[first, 0], [a, 21000], [first, 40000]]), [null, a, null], 'the first section is never saved, even after the visit moved');
  // Back's restored place or a '#heading': the start follows the page while it lands, so a visit that stays there saves nothing
  assert.deepEqual(visit([[first, 0, false], [a, 300, false], [a, 25000]]), [null, null, null], 'landing on a heading is not moving');
  assert.deepEqual(visit([[first, 0, false], [a, 300, false], [a, 25000], [b, 30000]]), [null, null, null, b], 'moving on from the landing saves');
  assert.deepEqual(visit([[a, 0, false], [b, 22000], [a, 40000]]), [null, b, a], 'once moved, coming back to the landing heading saves it');
  const h3 = L.headWords(MD(l.id)).find((h, i, all) => h.lv === 3 && all.slice(1, i).every(x => x.lv === 3 || x.id === first));
  if (h3) assert.deepEqual(visit([[first, 0], [h3.id, 25000]]), [null, h3.id], 'a sub-heading of the first section is a real place');
  assert.equal(L.readAt(null, { h: null, ms: 99999, landed: true }).save, null);
  // the view: the visit lands on Back and on an anchor, the first section is the first rendered one, and leaving goes through the same rule
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/lesson.js'), 'utf8');
  assert.match(src, /let landed = !\(\(rc && rc\.back\) \|\| pend\)/);
  assert.match(src, /readAt\(rs, \{ h, landed, first: H\[0\] \? H\[0\]\.h\.id : null, saved: savedH, ms: Date\.now\(\) - t0 \}\)/);
  assert.ok(!/wantH/.test(src), 'no path saves a heading outside readAt');
});
