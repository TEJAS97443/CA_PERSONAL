/* PassBook — the question card, shared by the question bank, the question page, lessons, tests (exam + review) and the error notebook.
   GA.qcard.create(q, {mode, onChange, onCheck, onRetry, onReveal, resp, number, attemptMode, cta, progress, prev, next, mark, state, paperShown, navReplace,
     hint, heading}) -> {el, getResponse, setResponse, lock, reveal, check, checked, destroy}
   modes: 'practice' (check -> feedback), 'exam' (no feedback, reports changes), 'review' (static: your answer vs official), 'embed' (compact, practice)
   presentation options (behaviour is the same without them):
     cta        'pop' makes "Check answer" (and, after checking, "Next") the screen's one coral action, docked above the phone tab bar; default cobalt
     progress   {i, n, label, chip} draws "i of n" with a bar under the header (the question page and the runner); on phones the header line carries
                "i/n" unless chip: true (the page shows its own 'Q n/N' chip)
     prev/next  {href, label, end} put Previous / Skip / Next into the card (the question page); they replace the history entry (navReplace: false
                keeps a new entry), an `end` link (leaving the set) adds one
     mark       true puts the bookmark into the toolbar as "Bookmark" (D5: "Mark for review" is only the runner's per-test flag)
     state      review mode: the stored per-question state of the test (scoreAll: 'notevaluated', 'mta', 'ungraded', …) wins over a fresh mark
     paperShown the page already names this question's paper (the question page in paper order): the phone header line then starts at 'Q11'
     onReveal   called after 'Show answer' (a peek records nothing)
     hint       true: the pre-check 'Show answer' slot starts as 'Hint' (P2-64); default on for the question page (practice + cta 'pop')
     heading    the id line's heading level (P3-06); default 2 on the question page (under the set name), none elsewhere (lessons, rows, results)
   Behaviour (audit 2026-10-16, WP9a): one radio group per card (P0-01); Enter on a button inside the card never grades, and an option's arrow keys
   stay with its radio group (P0-13); a NAT box holds only a number in the making, with a ± key on touch screens (P0-16); content never widens the
   card and GA.fit keeps maths, tables and figures legible (P0-24, P1-54); one worked-solution fold that opens by itself after a miss, a peek or on
   a questioned key (P1-19, P2-24); after a check the verdict (a correct answer) or the fold title (a miss, a peek) is scrolled just into view,
   below the sticky top bar and above whatever is docked at the bottom: the card's Next, the tab bar, a page's own dock such as the end of a set
   (P1-18, P1-22); a missing answer is said on a line under the options, never in a toast over the docked main action; dark-safe scanned figures
   (P1-20); "i of n" (P1-21); no-key and marks-to-all questions are practice only, record a 'seen' check and show our worked answer (P1-23, D9);
   after a miss the correct option is filled green, the banner is neutral and a Trap line says why (P1-40, D17 option C); one note per question
   (P1-27); focus stays on the same or the next control and the verdict is announced (P1-48); touch-safe info tips (P1-55); a solution that does
   not arrive says so and can be retried (P1-59).
   Part B (P2/P3): the answering line sits above the options ('Pick one · −2/3 if wrong', P3-18) and names the option group (P3-06); 'Answer shown ·
   not counted'; a right answer says what it earned ('Correct · +2 marks · +10 XP', GA.engage.xpFor, P2-38); a questioned key gets one warn line
   and opens the solution (P2-24); the build's key note is a 'How we read the key' disclosure in the source footer once the answer shows; the
   honesty facts are text: 'Medium · our estimate' on a neutral ramp, 'not in the current syllabus', the badge explained in the solution's
   first line, the organiser named for the key (P2-66, P2-28, P3-21); the badge comes from the catalogue's CHECKED / DISPUTE bits, so the subject's
   solution file loads only after Check, Show answer or the Hint, or in review (P2-77); the Hint (P2-64); 'Bookmarked · N' (P2-65); 'Report a
   problem' through GA.ui.report when it exists, else the card's own copy-only dialog (P3-48, D16); stem tables sized to their content (P2-26);
   figure options two-up (P3-22); folds open with a down chevron (P3-33); dimmed options keep AA contrast (P2-29). After Part B: the note toast
   names the notebook only when it lists the question; a solution brought by Try again still opens after a miss; true minus signs in the answer
   line; in paper order the phone line leaves the paper to the page h1. Part C: lesson references in the hint, the worked solution and the Trap
   line read as the lesson's title, never its raw id (labelRefs); the note and report dialogs leave first focus to GA.ui.modal (the dialog itself
   on touch screens, so the keyboard does not open over Save / Copy report; P1-47); the NAT box's placeholder fits beside the ± key ('Your answer').
   GA.qcard.markingNote(q) is the marking rule sentence of the engine's MCQ / MSQ / NAT model (the ICAI bank job replaces it) (data-aware: linked pairs, marks to all, no key). GA.qcard.lib holds the pure decisions
   (tests/practice.test.js). GA.qcard.fx = {burst, shake, buzz, calm}: the feedback effects, shared with the flashcards. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);
  const esc = U.esc;
  const L = 'ABCD';
  // core modules are read when used (this file also loads in Node for the tests, where only util and scoring are present)
  const icon = (n, c) => (GA.icon ? GA.icon(n, c) : '');
  const SC = () => GA.scoring;
  const MD = () => GA.md;
  const UI = () => GA.ui || {};
  const DATA = () => GA.data;

  /* ---- feedback effects (rule 8: on user action, <= 300-600 ms, off under reduced motion) ---- */
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function burst(target) {
    if (calm() || !target || !target.getBoundingClientRect) return;
    const r = target.getBoundingClientRect(), b = document.createElement('div');
    b.className = 'qc-burst'; b.setAttribute('aria-hidden', 'true');
    b.style.left = (r.left + r.width / 2) + 'px'; b.style.top = (r.top + r.height / 2) + 'px';
    let h = '<b></b>';
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2 + Math.random() * 0.4, d = 30 + Math.random() * 26; h += `<i style="--x:${(Math.cos(a) * d).toFixed(1)}px;--y:${(Math.sin(a) * d).toFixed(1)}px"></i>`; }
    b.innerHTML = h; document.body.appendChild(b); setTimeout(() => b.remove(), 760);
  }
  function shake(el) { if (calm() || !el) return; el.classList.remove('qc-shake'); void el.offsetWidth; el.classList.add('qc-shake'); setTimeout(() => el.classList.remove('qc-shake'), 480); }
  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p || 15); } catch (e) { /* iOS Safari ignores it */ } }

  /* ================================================================== pure decisions (GA.qcard.lib; tests/practice.test.js) */
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const fmt = n => U.fmtMarks(n);
  /** a number's sign as a true minus, as the learner's own answer shows it: '-2' -> '−2', '-0.5 to -0.4' -> '−0.5 to −0.4'; letters untouched */
  const minus = s => String(s == null ? '' : s).replace(/(^|[^\w.])-(?=\.?\d)/g, '$1−');
  const pen = m => (m === 1 ? '1/3' : '2/3');
  const linked = (q, role) => !!(q && q.group && q.group.kind === 'linked' && q.group.role === role);
  /** the shared wording table (GA.ui.str, P2-28 / P2-66) when it exists, else this file's own words */
  const str = (k, d) => { const t = UI().str; return t && typeof t[k] === 'string' && t[k] ? t[k] : d; };
  /** the paper row of a question (browser: the catalogue; Node: none) */
  const paperOf = q => { const d = GA.data && GA.data.D; return d && q && q.paper && d.paperById ? d.paperById[q.paper] || null : null; };
  /** who published the key, as the start of a phrase (P2-28: the paper's own organiser): "ICAI's" | "the" */
  const keyOwner = p => (p && p.organiser ? `${p.organiser}'s` : 'the');

  /** 'keyed' | 'mta' (the official key gave marks to all) | 'nokey'. Reads the full record's answer, else the catalogue flags (hasKey, mta);
      a bare {type, marks} counts as keyed. */
  function kindOf(q) {
    if (!q) return 'keyed';
    if (q.answer !== undefined) return !q.answer ? 'nokey' : q.answer.kind === 'mta' ? 'mta' : 'keyed';
    if (q.mta) return 'mta';
    if (q.hasKey === false) return 'nokey';
    return 'keyed';
  }
  /** the option letters a response picks, sorted: 'B' -> ['B'], ['C', 'a'] -> ['A', 'C'], null / '' / [] / '148' -> [] */
  function picksOf(r) {
    if (r == null) return [];
    const a = Array.isArray(r) ? r : String(r).split(/[\s,;]+/);
    return U.uniq(a.map(x => String(x).trim().toUpperCase()).filter(x => /^[A-D]$/.test(x))).sort();
  }
  /** the option letters an official answer accepts (single, multi, and the letter alternatives of 'oneof'); [] for NAT ranges, marks to all, no key */
  function keyLetters(a) {
    if (!a) return [];
    if (a.kind === 'single') return [String(a.value).toUpperCase()];
    if (a.kind === 'multi') return a.value.map(x => String(x).toUpperCase()).sort();
    if (a.kind === 'oneof') return U.uniq([].concat(...a.alts.map(keyLetters))).sort();
    return [];
  }

  /** a NAT box's text kept to what the on-screen keypad allows: digits, one '.', a leading minus (a typographic minus counts as one); a comma is dropped,
      never read as a decimal point. GA.scoring.natClean (WP10) is the shared rule; this is the same rule for when it is not loaded. */
  function natClean(s) {
    const S = SC();
    if (S && typeof S.natClean === 'function') return S.natClean(s);
    let out = '', dot = false;
    for (const ch of String(s == null ? '' : s).replace(/[−‒–]/g, '-')) {
      if (ch >= '0' && ch <= '9') out += ch;
      else if (ch === '.' && !dot) { out += ch; dot = true; }
      else if (ch === '-' && !out) out += ch;
    }
    return out;
  }
  /** the number a NAT entry stands for, or null. A comma never counts (GA.scoring.parseNat would read '0,75' as 75). */
  function natValue(s) {
    const t = String(s == null ? '' : s).trim().replace(/[−‒–]/g, '-');
    if (!t || /,/.test(t)) return null;
    const S = SC();
    if (S && typeof S.parseNat === 'function') return S.parseNat(t);
    return /^-?(\d+\.?\d*|\.\d+)$/.test(t) && isFinite(+t) ? +t : null;
  }
  /** what a NAT box holds: {clean, value, why}; why = 'comma' | 'chars' (a key was refused) | 'partial' ('-' or '.') | null */
  function natRead(raw) {
    const s = String(raw == null ? '' : raw), clean = natClean(s), value = natValue(clean);
    const why = /,/.test(s) ? 'comma' : clean !== s.replace(/[−‒–]/g, '-') ? 'chars' : clean && value == null ? 'partial' : null;
    return { clean, value, why };
  }

  /** our blind-solved answer from the solution's check record (c.blind): {text, letters} for options, {text, num} for a NAT; null without one */
  function blindOf(q, c) {
    const b = c && c.blind != null ? String(c.blind).trim() : '';
    if (!b) return null;
    if (q.type === 'NAT') { const v = natValue(b); return { text: v == null ? b : fmt(v), num: v }; }
    const letters = picksOf(b.split(/[\s,;]+/));
    return letters.length ? { text: letters.join(', '), letters } : null;
  }
  /** is the response the same as our worked answer: true / false, or null when either is missing */
  function sameAsBlind(q, r, blind) {
    if (!blind || r == null || (Array.isArray(r) && !r.length)) return null;
    if (q.type === 'NAT') { const v = natValue(r); return blind.num != null && v != null ? Math.abs(v - blind.num) < 1e-9 : null; }
    const p = picksOf(r);
    return p.length === blind.letters.length && p.every((x, i) => x === blind.letters[i]);
  }

  /** one practice check: the engine's MCQ / MSQ / NAT marking, with a wrong second answer of a linked pair at 0 (scoreAll gives it no negative marks; P0-04) */
  function markOf(q, r) {
    const m = Object.assign({}, SC().mark(q, r));
    if (m.state === 'wrong' && linked(q, 'second')) { m.score = 0; m.negative = 0; }
    return m;
  }
  /** the wording of a check's marks: '+2 marks', '−1/3 mark', '0 marks (no negative marking)', '0 marks' */
  function marksText(q, m) {
    if (m.score > 0) return `+${fmt(m.score)} mark${m.score === 1 ? '' : 's'}`;
    if (m.score < 0) return q.type === 'MCQ' && (q.marks === 1 || q.marks === 2) ? `−${pen(q.marks)} mark` : `−${fmt(-m.score)} marks`;
    if (m.state === 'wrong') return linked(q, 'second') ? '0 marks (second part of a linked pair: no negative marking)' : '0 marks (no negative marking)';
    return '0 marks';
  }

  /** the answering line above the options (P3-18): how to answer, then what a wrong answer costs. True for linked pairs, marks to all and papers
      without a key (P0-04, P1-23): 'Pick one · −2/3 if wrong', 'Pick one or more · no negative marking, no partial credit', 'Type a number · …' */
  function hintText(q) {
    const k = kindOf(q), how = q.type === 'MSQ' ? 'Pick one or more' : q.type === 'NAT' ? 'Type a number' : 'Pick one';
    if (k === 'nokey') return `${how} · practice only, not scored (no official key for this paper)`;
    if (k === 'mta') return `${how} · practice only, not scored (the official key gave marks to all)`;
    if (q.type === 'MSQ') return `${how} · no negative marking, no partial credit`;
    if (q.type === 'NAT') return `${how} · no negative marking`;
    if (linked(q, 'second')) return `${how} · no negative marking (second part of a linked pair)`;
    return q.marks ? `${how} · −${pen(q.marks)} if wrong` : how;
  }

  /** the marking rule for this question (the engine's MCQ / MSQ / NAT model; the ICAI bank job replaces it), as one plain sentence (the question page's and the runner's marking panel). Data-aware (P0-04):
      a linked pair's second part has no negative marking, marks to all and papers without a key are not scored here (2007–08 papers cost 0.25 / 0.5). */
  function markingNote(q) {
    const m = q.marks || 1, k = kindOf(q), type = q.type || 'MCQ';
    if (k === 'nokey') {
      const old = q.year && q.year <= 2008;
      const exam = type !== 'MCQ' ? '' : linked(q, 'second') ? ' In the exam this second part of a linked pair carried no negative marking.'
        : ` In the exam a wrong answer cost <b class="n">−${old ? (m === 1 ? '0.25' : '0.5') : pen(m)}</b>.`;
      return `${m}-mark ${type}: no official key was published for this paper, so it is practice only and nothing is scored here.${exam}`;
    }
    if (k === 'mta') return `${m}-mark ${type}: ${esc(keyOwner(paperOf(q)))} official key gave <b class="p">+${m}</b> to every candidate (marks to all), so nothing is scored here.`;
    if (type === 'MSQ') return `${m}-mark MSQ: <b class="p">+${m}</b> only if you pick exactly the right options. No partial credit, no negative marking.`;
    if (type === 'NAT') return `${m}-mark NAT: <b class="p">+${m}</b> if your number is inside the key's range, <b>0</b> otherwise. No negative marking.`;
    if (linked(q, 'second')) return `${m}-mark MCQ, second part of a linked pair: <b class="p">+${m}</b> if right, <b>0</b> if wrong or skipped (no negative marking). In the exam it is evaluated only when the first part is right.`;
    const base = `${m}-mark MCQ: <b class="p">+${m}</b> if right, <b class="n">−${pen(m)}</b> if wrong, <b>0</b> if you skip it.`;
    return linked(q, 'first') ? base + ' First part of a linked pair: in the exam the second part counts only if this one is right.' : base;
  }

  /** each option's look after a reveal (D17 option C). keyed: a pick is 'ok' or 'bad'; an unpicked correct option is 'ok' (filled green) after a miss
      or a peek on a single-answer question, 'miss' (dashed) when an MSQ missed it or the answer was right (another accepted option); the rest 'dim'.
      No key / marks to all: our worked answer is 'ours' (a dashed neutral outline, never a fill), the others 'dim' (the pick keeps its selection).
      o = {correct: the whole response was right, blind: blindOf(...)} -> {A: 'ok' | 'bad' | 'miss' | 'ours' | 'dim' | '', …} */
  function optionStates(q, r, o) {
    o = o || {};
    const out = {}, letters = (q.options || []).map((t, i) => L[i]), picks = picksOf(r), k = kindOf(q);
    if (q.type === 'NAT') return out;
    if (k === 'keyed') {
      const key = keyLetters(q.answer);
      letters.forEach(x => {
        const c = key.includes(x), p = picks.includes(x);
        out[x] = p ? (c ? 'ok' : 'bad') : !c ? 'dim' : o.correct || (q.type === 'MSQ' && picks.length) ? 'miss' : 'ok';
      });
    } else {
      const ours = (o.blind && o.blind.letters) || [];
      letters.forEach(x => { out[x] = ours.includes(x) ? 'ours' : picks.includes(x) ? '' : ours.length || picks.length ? 'dim' : ''; });
    }
    return out;
  }

  /** the feedback block after a check, a peek or in review: {cls, html, say, open}. cls = the banner tone; html = the banner ('Title · detail'),
      then the official / our answer line and the dispute line; say = the short announcement (P1-48); open = the worked solution should open by
      itself (a miss, a peek, a questioned key, no key and not ours; P1-19, P2-24).
      o = {peek, state (review: the stored state), blind, keyNote, trap (HTML of the Trap line, D17), xp: {n, again, hint} (P2-38: a correct practice
      answer only), dispute (HTML of disputeLine), paper (its organiser names the key, P2-28)} */
  function feedback(q, r, m, o) {
    o = o || {};
    const k = kindOf(q), st = o.state || m.state;
    const youTxt = r == null || (Array.isArray(r) && !r.length) ? '' : Array.isArray(r) ? picksOf(r).join(', ') : q.type === 'NAT' ? minus(r) : String(r);
    // 'Correct · +2 marks · +10 XP' (P2-38, P3-18): the verdict, then what it cost or earned; `extra` follows on a line of its own (the Trap, D17)
    const banner = (cls, ic, title, parts, extra) => { const p = (parts || []).filter(Boolean); return `<div class="qc-v ${cls}">${icon(ic)}<div><b>${title}</b>${p.length ? ` <span>· ${p.join(' · ')}</span>` : ''}${extra || ''}</div></div>`; };
    // the official answer writes its minus the way the learner's answer does ('Official answer −2' beside 'Your answer −2')
    const ans = minus(SC().describe(q.answer));
    const official = () => `<div class="qc-off"><span>Official answer <b>${esc(ans)}</b></span>${youTxt ? `<span class="qc-you">Your answer <b>${esc(youTxt)}</b></span>` : ''}</div>`;
    const disp = o.dispute || '';
    // no official key (2007–2010) or marks to all: practice only, never ok/bad colours; our worked answer when we have one (P1-23, D9)
    if (k !== 'keyed' || st === 'ungraded' || st === 'mta') {
      const b = o.blind, same = sameAsBlind(q, r, b), mta = k === 'mta' || st === 'mta';
      const title = mta ? 'Marks to all' : str('noKey', 'No official key');
      const why = mta ? `${U.cap(keyOwner(o.paper))} official key gave every candidate the marks, so this is practice only, not scored` : 'practice only, not scored';
      let line = '';
      if (b) {
        const yours = same === true ? `<span class="qc-same ok">same as yours ${icon('check')}</span>`
          : same === false ? `<span class="qc-same">yours <b>${esc(youTxt)}</b> ${icon('x')} · not an official key</span>` : '';
        line = `<div class="qc-off qc-ours"><span>Our worked answer <b>${esc(b.text)}</b></span>${yours ? ` <span class="qc-sep" aria-hidden="true">·</span> ${yours}` : ''}</div>`;
      } else if (k === 'nokey' && o.keyNote) line = `<div class="qc-off"><span>${esc(o.keyNote)}.</span></div>`;
      const sayOurs = b ? ` Our worked answer: ${b.text}${same === true ? ', same as yours' : same === false ? `; yours is ${youTxt}` : ''}.` : '';
      return { cls: 'muted', html: banner('muted', 'info', title, [esc(why)]) + line, say: `${title}. ${U.cap(why)}.${sayOurs}`, open: !!o.peek || same === false };
    }
    if (o.peek) { const as = str('answerShown', 'Answer shown · not counted').split(' · '); return { cls: 'muted', html: banner('muted', 'eye', esc(as[0]), as.slice(1).map(esc)) + official() + disp, say: `${as[0]}: ${ans}. ${U.cap(as.slice(1).join(', ') || 'not counted')}.`, open: true }; }
    if (st === 'correct') {
      const t = marksText(q, m), x = o.xp && o.xp.n > 0 ? o.xp : null, title = x && x.again ? str('correctAgain', 'Correct again') : str('correct', 'Correct');
      return { cls: 'ok', html: banner('ok', 'check', title, [esc(t), x ? `+${x.n} XP${x.hint ? ' (hint used)' : ''}` : '']) + official() + disp,
        say: `${title}. ${t}.${x ? ` +${x.n} XP.` : ''}`, open: !!disp };
    }
    if (st === 'skipped') return { cls: 'warn', html: banner('warn', 'alert', 'Not attempted', ['0 marks']) + official() + disp, say: `Not attempted. The answer is ${ans}.`, open: !!disp };
    if (st === 'notevaluated') return { cls: 'warn', html: banner('warn', 'alert', 'Not evaluated', ['linked-answer rule: the first answer of the pair was wrong or skipped']) + official() + disp, say: 'Not evaluated: the first answer of the linked pair was wrong or skipped.', open: true };
    // a miss (D17 option C): a neutral banner with the --bad cross and the penalty; the Trap line says why the pick was tempting
    const t = marksText(q, m);
    const trap = o.trap ? `<span class="qc-trap"><b>Trap:</b> ${o.trap}</span>` : '';
    const nq = str('notQuite', 'Not quite');
    return { cls: 'miss', html: banner('miss', 'x', nq, [esc(t)], trap) + official() + disp, say: `${nq}. ${t}. The answer is ${ans}.`, open: true };
  }

  /** a worked solution's own final answer: the text of its last '**Answer: …**' ('C', '6'), or '' */
  function solAnswer(s) {
    const all = String(s || '').match(/\*\*Answer:?\s*([^*]+?)\s*\*\*/g);
    return all ? all[all.length - 1].replace(/^\*\*Answer:?\s*/, '').replace(/\s*\*\*$/, '').trim() : '';
  }
  /** what our worked solution argues for on a questioned key: our independent (blind) answer, but only when the solution's final answer is that
      same answer (some disputed solutions teach the key's reading, or none of the options); '' otherwise */
  function oursOf(q, sol) {
    const c = sol && sol.c, b = c ? blindOf(q, c) : null, fin = solAnswer(sol && sol.s);
    if (!b || !fin || fin.length > 12) return '';
    if (q.type === 'NAT') { const v = natValue(fin.replace(/\s+/g, '')); return v != null && b.num != null && Math.abs(v - b.num) < 1e-9 ? b.text : ''; }
    const L = U.uniq(fin.match(/\b[A-D]\b/g) || []).sort();
    return L.length && b.letters && L.join() === b.letters.join() ? b.text : '';
  }
  /** the line under the answer on a questioned key (P2-24), after Check, a peek and in review. It names what our worked solution argues for when
      that is clear (oursOf), never says which reading is right, and says that scores follow the official key. o = {mode, peek} */
  function disputeLine(q, sol, o) {
    o = o || {};
    const ours = oursOf(q, sol);
    const graded = o.peek ? 'answers are graded' : o.mode === 'review' ? 'you were graded' : 'you are graded';
    const text = ours ? `Our worked solution argues for <b>${esc(ours)}</b>; ${graded} against the official key.`
      : `The worked solution sets out both readings; ${graded} against the official key.`;
    return `<div class="qc-disp">${icon('alert')}<span><b>This key is questioned.</b> ${text} <a href="#/about#ab-disp-h">All disputed keys</a></span></div>`;
  }

  /** should a Trap line show (D17): after Check on a keyed, undisputed MCQ or MSQ that was answered wrong, never in the runner or for a NAT */
  const trapWanted = (q, m, mode, c) => kindOf(q) === 'keyed' && m.state === 'wrong' && (q.type === 'MCQ' || q.type === 'MSQ') && mode !== 'exam' && mode !== 'review' && !(c && c.dispute) && !q.disputed;
  /** the Trap line for these picks from GA.pyqLib.trapLine (WP9b, §10.10) when it is loaded; null otherwise */
  function trapFor(sol, picks) {
    const f = GA.pyqLib && GA.pyqLib.trapLine;
    if (typeof f !== 'function' || !sol) return null;
    try {
      const t = f(sol.s != null ? sol.s : sol, picks);
      return t ? String(t) : null;
    } catch (e) { return null; }
  }

  /* ---- lesson references: solution text cites a lesson as '[[coa.cache.mapping]]', which md.js would show as the raw id. The card names it by
     the lesson's title instead ('[[coa.cache.mapping|Direct, associative and set-associative mapping]]', a link to the lesson); a reference with
     no known title is dropped with the brackets, the 'see' and the punctuation that only framed it ---- */
  // an unnamed reference becomes REF1; each one dropped leaves a CUT, where the spacing is mended (only there: the rest of the text is untouched)
  const REF1 = '\u0001', CUT = '\u0002', REFS = '\u0001(?:[ \\t]*(?:,|;|&|\\band\\b|\\bor\\b)[ \\t]*\u0001)*';
  const RE_DROP = [
    [new RegExp(`[ \\t]*\\([ \\t]*(?:see(?:[ \\t]+also)?[ \\t]+)?${REFS}[ \\t]*\\)`, 'gi'), CUT],                  // ' ([[a]])', ' (see [[a]], [[b]])'
    [new RegExp(`(^|[.!?](?:\\*\\*)?[ \\t]+)See(?:[ \\t]+also)?[ \\t]+${REFS}[ \\t]*[.;]?`, 'gm'), '$1' + CUT],   // 'See [[a]].' as a sentence of its own
    [new RegExp(`[ \\t]*,?[ \\t]*\\bsee(?:[ \\t]+also)?[ \\t]+${REFS}`, 'gi'), CUT],                                // ', see [[a]]'
    [new RegExp(`[ \\t]*${REFS}`, 'g'), CUT]                                                                      // ' [[a]]'
  ];
  // a reference as md.js reads it, after code spans and maths (skipped here as there: '$M[[R2] + 20]$' is maths): a lesson id (it has a dot),
  // 'q:<question id>' or 'lab:<lab id>'. Group 1: a code span's backticks; group 2: the reference's id
  const RE_REF = /(`+)[\s\S]*?[^`]\1(?!`)|\$\$[\s\S]+?\$\$|(?<![\\$])\$(?!\s)(?:[^$\\\n]|\\.)+?(?<!\s)\$(?!\d)|\[\[((?:q:|lab:)[a-z0-9_.\-:#]+|[a-z0-9_-]+\.[a-z0-9_.\-#]+)\]\]/gi;
  /** md with each unlabelled [[id]] named titleOf(id) ('[[id|Title]]'); a reference titleOf cannot name (every one, without titleOf) is dropped.
      Labelled references ('[[id|text]]'), code, maths and text without references come back unchanged. */
  function labelRefs(md, titleOf) {
    let s = String(md == null ? '' : md);
    if (s.indexOf('[[') < 0) return s;
    const name = id => {
      if (typeof titleOf !== 'function') return '';
      try { const t = titleOf(id); return t ? String(t).replace(/[[\]|\u0001\u0002]/g, '').replace(/\s+/g, ' ').trim() : ''; } catch (e) { return ''; }
    };
    let dropped = false;
    s = s.replace(RE_REF, (m, tick, id) => {
      if (id === undefined) return m;   // code or maths
      const t = name(id);
      if (t) return `[[${id}|${t}]]`;
      dropped = true;
      return REF1;
    });
    if (!dropped) return s;
    for (const [re, to] of RE_DROP) s = s.replace(re, to);
    return s.replace(/\([ \t]*\u0002+[ \t]*[,;][ \t]*/g, '(').replace(/[ \t]*[,;][ \t]*\u0002+[ \t]*\)/g, ')')   // a list that loses one of its items
      .replace(/[ \t]*\u0002+[ \t]*(?=[.,;:!?)\]]|\n|$)/g, '')      // 'tag + offset ([[a]]).' -> 'tag + offset.'
      .replace(/(^|\n)[ \t]*\u0002+[ \t]*/g, '$1')                    // a line that started with the reference
      .replace(/[ \t]*\u0002+[ \t]*/g, ' ');                          // 'the index ([[a]]) decides' -> 'the index decides'
  }

  /* ---- the Hint (P2-64): the worked solution's Idea paragraph, between 'stuck' and 'Show answer'; never one that gives the answer away ---- */
  /** the Markdown of a solution's opening '**Idea.** …' paragraph (without its label), or '' */
  function ideaOf(s) {
    const m = /^\s*\*\*Idea[.:]?\*\*[ \t]*([\s\S]*?)(?:\n[ \t]*\n|$)/.exec(String(s || ''));
    return m ? m[1].trim() : '';
  }
  /** a Markdown / TeX snippet as lower-case words and numbers, for the leak test ('$x = 12$' -> 'x = 12') */
  const flat = t => String(t || '').replace(/\\(?:text|mathrm|mathbf|mathit|operatorname|textbf|emph)\{([^{}]*)\}/g, ' $1 ').replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[$*_`{}~^\\]/g, ' ').replace(/−/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();
  /** the numbers a text states ('-0.5', '12', '1,000' -> 1000) */
  const numsIn = t => { const out = [], re = /(^|[^\w.])(-?\d+(?:,\d{3})*(?:\.\d+)?)(?!\w)/g; let m; while ((m = re.exec(t))) out.push(+m[2].replace(/,/g, '')); return out; };
  /** the ranges an official NAT answer accepts */
  const rangesOf = a => (!a ? [] : a.kind === 'range' ? [[a.min, a.max]] : a.kind === 'oneof' ? [].concat(...a.alts.map(rangesOf)) : []);
  /** does an Idea paragraph give the answer away (P2-64): it names a correct option's letter ('(C)', 'option C', '**C**', 'answer is C'), states
      a correct option's own words (4+ characters) or number, or states a number inside the NAT key's range. Without a key, our worked answer counts. */
  function givesAway(q, idea, blind) {
    const raw = String(idea || ''), txt = flat(raw), k = kindOf(q);
    const letters = k === 'keyed' ? keyLetters(q.answer) : (blind && blind.letters) || [];
    for (const x of letters) {
      if (new RegExp(`\\(\\s*${x}\\s*\\)|\\b[Oo]ptions?\\s+(?:[A-D]\\s*(?:,|and|or|&)\\s*)*${x}\\b|\\*\\*\\s*${x}\\s*\\*\\*|\\b[Aa]nswer(?:\\s+is)?\\s*:?\\s*\\(?${x}\\b`).test(raw)) return true;
      const opt = flat((q.options || [])[L.indexOf(x)]);
      if (!opt) continue;
      if (/^-?\d+(?:\.\d+)?$/.test(opt)) { if (numsIn(txt).some(n => Math.abs(n - +opt) < 1e-9)) return true; }
      else if (opt.length >= 4) { const i = txt.indexOf(opt); if (i >= 0 && !/[a-z0-9]/.test(txt.charAt(i - 1) || ' ') && !/[a-z0-9]/.test(txt.charAt(i + opt.length) || ' ')) return true; }
    }
    if (q.type === 'NAT') {
      const rs = k === 'keyed' ? rangesOf(q.answer) : blind && blind.num != null ? [[blind.num, blind.num]] : [];
      if (rs.length && numsIn(txt).some(n => rs.some(([lo, hi]) => n >= lo - 1e-9 && n <= hi + 1e-9))) return true;
    }
    return false;
  }
  /** the hint for a question from its worked solution: {md} (the Idea paragraph), or null when there is none or it would give the answer away.
      Its lesson references are named by titleOf (labelRefs); the leak test reads what the learner would see, so a title that names an answer
      drops the references instead of the hint */
  function hintOf(q, sol, titleOf) {
    const idea = ideaOf(sol && sol.s != null ? sol.s : sol);
    if (!idea) return null;
    const b = sol && sol.c ? blindOf(q, sol.c) : null, bare = labelRefs(idea, null);
    if (!bare.trim() || givesAway(q, bare, b)) return null;
    const named = titleOf ? labelRefs(idea, titleOf) : bare;
    // a named reference reads as its title (its id is only the link's address)
    return { md: named !== bare && givesAway(q, named.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1'), b) ? bare : named };
  }

  /** the paper and number in the phone header's one line: 'Q11' when the page names the paper, else '2021 Set 1 · Q11' / '2019 · GA Q5' */
  function shortId(q, paper, paperShown) {
    const ql = `${q.section === 'GA' ? 'GA ' : ''}Q${q.no}`;
    if (paperShown || !paper) return ql;
    const set = /\bSet\s*(\d+)/i.exec(paper.label || '');
    return `${paper.year}${set ? ' Set ' + set[1] : ''} · ${ql}`;
  }

  /** what an Enter or an arrow key inside the card means (P0-13): {check: Enter may grade (an option input, the card itself or the NAT box),
      own: the card consumes the key (arrows on an option: the radio group moves its selection), nat: Enter in the NAT box}. t = {tag, type, cls} */
  function keyRole(key, t) {
    const tag = String((t && t.tag) || '').toUpperCase(), type = String((t && t.type) || '').toLowerCase();
    const opt = tag === 'INPUT' && (type === 'radio' || type === 'checkbox');
    const nat = tag === 'INPUT' && !opt;
    const control = !opt && !nat && (/^(BUTTON|A|SUMMARY|TEXTAREA|SELECT|DETAILS)$/.test(tag) || (t && t.role === 'button'));
    if (key === 'Enter') return { check: !control, own: nat, nat };
    if (/^Arrow(Left|Right|Up|Down)$/.test(key)) return { check: false, own: opt, nat: false };
    return { check: false, own: false, nat: false };
  }

  /** the toast after a note is saved (P1-27): the error notebook is named only when it lists this question (it lists the questions you missed);
      otherwise the bank's 'Has my note' status finds it again */
  function noteToast(text, inNotebook) {
    if (!String(text == null ? '' : text).trim()) return 'Note deleted';
    return inNotebook ? 'Note saved · it shows on this question and in your error notebook' : 'Note saved · it shows on this question and in Questions › Has my note';
  }

  /** the copy-only problem report (P3-48, D16) as plain text: the question and its id, its paper, the build date and the learner's own words.
      Nothing is sent or stored. o = {label: '<paper> · Q37', paper: '<paper> · <organiser> · question paper page 12', built, words} */
  function reportText(q, o) {
    o = o || {};
    const words = String(o.words == null ? '' : o.words).trim();
    return ['PassBook · problem report', `Question: ${o.label || 'Q' + q.no} (id ${q.id})`, o.paper ? `Paper: ${o.paper}` : '', o.built ? `Data: built ${o.built}` : '',
      `What looks wrong: ${words ? (/\n/.test(words) ? '\n' + words : words) : '(not described)'}`].filter(Boolean).join('\n');
  }
  /** the line when the browser refuses to copy the report (P3-48): how to copy the selected text on this device, touch wording on touch screens
      (P3-40: no keyboard hints there) */
  function copyHint(touch, mac) {
    return `This browser blocked copying. The report is selected above: ${touch ? 'press and hold it, then choose Copy.' : `press ${mac ? '⌘C' : 'Ctrl+C'} to copy it.`}`;
  }

  /** how far to scroll (px, 0 for none) so that a box's bottom edge ends inside the visible band {top, bottom} while its top edge stays inside it:
      the verdict and the fold title after a check, above the docked Next, the tab bar or a page's end-of-set panel (P1-18, P1-19, P1-22) */
  function scrollNeed(bottomEdge, topEdge, band) {
    const by = Math.min(bottomEdge - band.bottom, topEdge - band.top);
    return by > 1 ? Math.round(by) : 0;
  }

  /* ================================================================== the card */
  function srcLine(q) {
    const p = DATA().D.paperById[q.paper];
    if (!p) return '';
    const link = (k, label) => (p.src && p.src[k] ? `<a href="${esc(p.src[k].wayback ? `https://web.archive.org/web/${p.src[k].wayback}/${p.src[k].url}` : p.src[k].url)}${k === 'qp' && q.page ? '#page=' + q.page : ''}" target="_blank" rel="noopener">${label}${icon('external')}</a>` : '');
    return `<span class="qc-srcl">${icon('shield')} Official source · ${esc(p.organiser)} · ${link('qp', 'question paper')}${p.src && p.src.key ? ' · ' + link('key', 'answer key') : ''}</span>`;
  }

  /** the provenance badge: [cls, icon, text, explanation]. c = the solution's check record ({agrees, blind, dispute}) or the same read from the
      catalogue's CHECKED / DISPUTE bits (flagCheck, P2-77); p = the paper row, whose organiser names the key (P2-28) */
  function badgeOf(kind, c, p) {
    const org = p && p.organiser, ran = org ? `${org}` : 'The examining body';
    if (c && c.dispute) return ['warn', 'alert', str('keyQuestioned', 'key questioned'), 'Our independent solution disagrees with the official key; the worked solution sets out both readings and what the key chose, and scores follow the official key'];
    if (kind === 'mta') return ['', 'info', 'marks to all', `${U.cap(keyOwner(p))} official key gave every candidate the marks for this question, so it is practice only here`];
    if (kind === 'nokey') return c && c.blind ? ['', 'info', 'our answer', `${ran} published no answer key for this paper; this answer comes from our own worked solution and is not scored`] : ['', 'info', 'no official key', `${ran} published no answer key for this paper, so answers are not scored`];
    if (c && c.agrees) return ['ok', 'check', 'official key · cross-checked', `${org || 'The examining body'} published this answer, and our independent solution reached the same answer`];
    return ['', 'shield', 'official key', org ? `${org} published this answer${p.year ? ` with the ${p.year} paper` : ''}` : 'The examining body published this answer'];
  }
  /** the badge's state from the catalogue's flag bits (P2-77: no solution file needed to draw it): CHECKED = our solution agrees with the key, or our
      worked answer when there is no key; DISPUTE = the key is questioned */
  const flagCheck = (meta, kind) => ({ dispute: !!(meta && meta.disputed), agrees: kind === 'keyed' && !!(meta && meta.checked), blind: kind === 'nokey' && meta && meta.checked ? 'ours' : null });
  /** does this build carry the CHECKED / DISPUTE bits (an older build has none set) */
  let flagD = null, flagK = false;
  const flagsKnown = D => { if (D !== flagD) { flagD = D; flagK = !!(D && D.questions && D.questions.some(x => x.checked || x.disputed)); } return flagK; };
  /** the badge as a touch-safe info tip (P1-55: a real button whose tap, focus or hover shows the explanation), or plain text inside a summary */
  function badgeHtml(b, plain) {
    const label = `${icon(b[1])}<span>${b[2]}</span>`;
    if (plain || !UI().infoTip) return `<span class="qc-badge ${b[0]}">${label}${plain ? '' : `<span class="sr">: ${esc(b[3])}</span>`}</span>`;
    return UI().infoTip(b[3], { html: label, cls: 'qc-badge ' + b[0], label: 'Provenance' });
  }
  /** a short piece of calm text that explains itself on tap, focus or hover (P1-55) */
  const tipText = (html, text, cls) => (UI().infoTip ? UI().infoTip(text, { html, cls: cls || 'txt' }) : `<span class="${cls || ''}" title="${esc(text)}">${html}</span>`);

  let seq = 0;
  function create(q, o) {
    o = o || {};
    const mode = o.mode || 'practice';
    const D = DATA().D, meta = D.qById[q.id] || {}, paper = D.paperById[q.paper];
    const S = GA.store, A = GA.actions, ui = UI();
    const st = S.state.q[q.id];
    const kind = kindOf(q);
    const uid = 'qc' + (++seq) + '-' + U.uid();
    const el = U.h('article.qc', { 'data-qid': q.id, 'data-mode': mode, 'data-type': q.type, 'data-kind': kind });
    if (o.cta === 'pop' && mode === 'practice') el.setAttribute('data-dock', '');
    const subj = meta.subject && meta.subject !== '?' ? D.subjectById[meta.subject] : null;
    const topic = meta.topic ? D.nodes[meta.topic] : null;
    const mt = `${plural(q.marks, 'mark')} · ${q.type}`;
    const showBadge = mode === 'practice' || mode === 'review';
    const sep = '<i aria-hidden="true">·</i>';
    const qName = `${q.section === 'GA' ? 'GA ' : ''}question ${q.no}`;
    // the honesty facts as text (P2-66): 'Medium · our estimate' with a neutral ramp (P3-21), 'not in the current syllabus'
    const diffHtml = d => { const l = { easy: 1, medium: 2, hard: 3 }[d]; return l ? `<span class="qc-diff"><span class="diff qc-dg l${l}" aria-hidden="true"><i></i><i></i><i></i></span><span>${esc(U.cap(d))} · ${esc(str('ourEstimate', 'our estimate'))}</span></span>` : ''; };
    // the sub line: subject · topic · (marks · type unless the progress row shows them) · difficulty, then calm warnings
    const subParts = withMt => {
      const s = [];
      if (subj) s.push(`<a href="#/s/${subj.id}">${esc(subj.name)}</a>`);
      else if (meta.subject === '?') s.push('Unclassified');
      if (topic) s.push(`<a href="#/pyq?topic=${topic.id}">${esc(topic.name)}</a>`);
      if (withMt) s.push(mt);
      if (meta.diff) s.push(diffHtml(meta.diff));
      return s.join(sep);
    };
    const warns = [];
    if (meta.legacy) warns.push(`<span class="qc-warn">${icon('info')}<span>${esc(str('legacy', 'not in the current syllabus'))}</span></span>`);
    if (q.review) warns.push(tipText(`${icon('alert')}transcription under review`, typeof q.review === 'string' ? q.review : 'This transcription is being re-checked against the official paper', 'txt qc-warn'));
    const histHtml = e => (e && e.n ? tipText(`${icon(e.lastOk ? 'check' : 'x')} ${e.ok}/${e.n}`, `Your attempts: ${e.ok} right of ${e.n}`, `txt qc-hist ${e.lastOk ? 'ok' : 'bad'}`) : '');
    const num = o.number != null ? `<span class="qc-n">${o.number}</span>` : '';
    const P = o.progress;
    const prog = P ? `<div class="qc-prog"><span>${P.i} of ${P.n}</span><span class="qc-tr" aria-hidden="true"><i style="width:${Math.max(2, Math.round(100 * (parseInt(String(P.i).replace(/\D/g, ''), 10) || 0) / Math.max(1, parseInt(String(P.n).replace(/\D/g, ''), 10) || 1)))}%"></i></span><span>${mt}</span>${P.label ? `<span class="qc-pl">${esc(P.label)}</span>` : ''}</div>` : '';
    // the provenance badge from the catalogue's flag bits (P2-77): the solution file loads only after Check / Show answer / Hint, or in review
    const flagsOk = flagsKnown(D);
    const badge0 = badgeOf(kind, flagsOk ? flagCheck(meta, kind) : null, paper);
    // a figure keeps its box before it loads when the build gives its size (P3-38); an option's figure also carries its shape (--r = w / h), so
    // views.css can cap its width where the 200 px height cap binds and the box never grows wider than the figure
    const dims = (f, shape) => { const w = +(f.w || f.width), h = +(f.h || f.height); return w > 0 && h > 0 ? ` width="${Math.round(w)}" height="${Math.round(h)}"${shape ? ` style="--r:${+(w / h).toFixed(4)}"` : ''}` : ''; };
    const fig = f => `<figure class="qc-fig"${f.tone ? ` data-tone="${esc(f.tone)}"` : ''}><img src="${DATA().figUrl(f.file)}" alt="${esc(f.alt)}" loading="lazy"${dims(f)}></figure>`;
    // the card's id line is the question page's h2 under the set name (P3-06); elsewhere (bank rows, lessons, results) the page's own outline holds
    const hl = o.heading != null ? +o.heading : mode === 'practice' && o.cta === 'pop' ? 2 : 0;
    // the phone line: its paper part is its own span, so the question page in paper order (whose h1 names the paper) can hide it in CSS (P1-18)
    const sid = shortId(q, paper, o.paperShown), sq = shortId(q, paper, true);
    const sidHtml = sid !== sq && sid.endsWith(sq) ? `<span class="qc-idp">${esc(sid.slice(0, sid.length - sq.length))}</span>${esc(sq)}` : esc(sid);
    const idLink = `<a href="#/q/${encodeURIComponent(q.id)}"><span class="qc-idf">${esc(ui.paperLabel ? ui.paperLabel(q) : q.paper)} · ${esc(ui.qLabel ? ui.qLabel(q) : 'Q' + q.no)}</span><span class="qc-ids">${sidHtml} · ${mt}</span></a>`;
    // 'Report a problem' (P3-48): GA.ui.report's sheet, else the card's own copy-only dialog (reportSheet); never in the runner
    const canReport = mode !== 'exam' && (typeof ui.report === 'function' || typeof ui.modal === 'function');
    el.innerHTML = `<header class="qc-h">${num}${subj ? `<a class="qc-subj" href="#/s/${subj.id}" aria-label="${esc(subj.name)}">${esc(subj.short)}</a>` : meta.section === 'GA' || q.section === 'GA' ? '<span class="qc-subj">GA</span>' : ''}
      <div class="qc-idw"><div class="qc-id">${hl >= 1 && hl <= 6 ? `<h${hl} class="qc-hd">${idLink}</h${hl}>` : idLink}<span class="qc-hw">${histHtml(st)}</span></div>
        <div class="qc-sub">${subParts(!P)}${warns.join('')}</div></div>
      ${P && mode !== 'exam' && !P.chip ? `<span class="qc-pc"><span aria-hidden="true">${P.i}/${P.n}</span><span class="sr">${P.i} of ${P.n}</span></span>` : ''}
      ${showBadge ? `<span class="qc-bw">${badgeHtml(badge0)}</span>` : ''}
      ${mode !== 'exam' && !o.mark ? `<button type="button" class="btn icon sm ghost qc-bm" aria-pressed="${st && st.bm ? 'true' : 'false'}" aria-label="Bookmark" data-tip="Bookmark">${icon('bookmark')}</button>` : ''}</header>
      ${prog}
      ${q.group ? `<div class="qc-ctx md ui"><span class="qc-ctx-t">${q.group.kind === 'linked' ? `Linked-answer question${q.group.role === 'second' ? ' · part 2' : q.group.role === 'first' ? ' · part 1' : ''}` : q.group.kind === 'passage' ? 'Passage' : 'Common data'}</span>${MD().render(q.group.context || '', { br: true })}</div>` : ''}
      <div class="qc-body md ui">${MD().render(q.stem || '', { br: true })}</div>
      ${(q.figures || []).filter(f => !/^opt:/.test(f.where || '')).map(fig).join('')}
      <div class="qc-in"></div>
      <div class="qc-hb" hidden></div>
      <div class="qc-fb" hidden tabindex="-1"></div><div class="qc-sol"></div><div class="qc-my" hidden></div>
      ${mode !== 'exam' ? `<div class="qc-meta">${subParts(false)}${warns.join('')}${showBadge ? `<span class="qc-bw">${badgeHtml(badge0)}</span>` : ''}</div>` : ''}
      ${mode === 'practice' || mode === 'embed' ? '<div class="qc-foot"><div class="qc-bar" role="group" aria-label="Question actions"></div><div class="qc-act"></div></div>' : ''}
      <footer class="qc-src">${srcLine(q)}${canReport ? `<button type="button" class="qc-rep" data-a="report">${icon('flag')}<span>Report a problem</span></button>` : ''}<div class="qc-kn" hidden></div></footer>`;

    /* ---- answer inputs: the answering line above them (P3-18), the options as one named group (P0-01, P3-06) ---- */
    const inEl = U.$('.qc-in', el);
    let resp = o.resp != null ? o.resp : null, locked = mode === 'review';
    const optFig = k => (q.figures || []).find(f => f.where === 'opt:' + k);
    const hint = hintText(q);
    const hintLine = tag => (hint ? `<${tag} class="qc-hint" id="${uid}-h">${hint}</${tag}>` : '');
    let natIn = null, natMsg = null, commaHold = false;   // commaHold: a comma was refused and no point typed since, so the number is not trusted yet
    if (q.type === 'MCQ' || q.type === 'MSQ') {
      const multi = q.type === 'MSQ';
      const anyFig = (q.options || []).some((t, i) => optFig(L[i]));
      // P0-01: one name for the whole card, so the options are one radio group (a second click replaces the first answer)
      inEl.innerHTML = `${hintLine('div')}<div class="qc-opts${anyFig ? ' figs' : ''}" role="${multi ? 'group' : 'radiogroup'}" aria-label="Options for ${esc(qName)}" aria-describedby="${hint ? `${uid}-h ` : ''}${uid}-n">${(q.options || []).map((t, i) => {
        const k = L[i], fg = optFig(k);
        return `<label class="qc-o" data-k="${k}"><input type="${multi ? 'checkbox' : 'radio'}" name="${uid}" value="${k}"><span class="qc-k">${k}</span><span class="qc-t md ui">${/\n|^\s*```|^\s*\|/.test(t || '') ? MD().render(t, { br: true }) : MD().inline(t || '', { br: true })}${fg ? `<img class="qc-optfig" src="${DATA().figUrl(fg.file)}" alt="${esc(fg.alt)}" loading="lazy"${fg.tone ? ` data-tone="${esc(fg.tone)}"` : ''}${dims(fg, true)}>` : ''}</span><svg class="i qc-mk y" aria-hidden="true"><use href="#i-check"/></svg><svg class="i qc-mk x" aria-hidden="true"><use href="#i-x"/></svg></label>`;
      }).join('')}</div><p class="qc-need" id="${uid}-n" aria-live="polite"></p>`;
    } else {
      // the placeholder stays short: beside the ± key on a 360 px phone or in a lesson the box is about 240 px wide (the answering line above it
      // already says 'Type a number')
      inEl.innerHTML = `<div class="qc-nat">${hintLine('span')}<div class="qc-natw"><input class="input" type="text" inputmode="decimal" enterkeyhint="done" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Your answer" aria-label="Numerical answer for ${esc(qName)}" aria-describedby="${uid}-m${hint ? ` ${uid}-h` : ''}"><button type="button" class="qc-pm" data-a="pm" aria-label="Add or remove the minus sign">±</button></div>
        <span class="qc-nat-msg" id="${uid}-m" aria-live="polite"></span></div>`;
      natIn = U.$('.qc-nat input', el); natMsg = U.$('.qc-nat-msg', el);
    }
    const natSay = (text, bad) => { if (!natMsg) return; if (natMsg.textContent !== text) natMsg.textContent = text || ''; U.$('.qc-nat', el).classList.toggle('bad', !!(bad && text)); };
    /** an answer is missing: say so on a line under the options, never in a toast over the docked main action (P1-18) */
    const needSay = text => { const n = U.$('.qc-need', el); if (n && n.textContent !== text) n.textContent = text || ''; };
    const sel = () => U.$$('.qc-o', el).forEach(l => l.classList.toggle('sel', l.querySelector('input').checked));
    const setResp = r => {
      resp = r;
      if (q.type === 'NAT') { if (natIn) { natIn.value = r == null ? '' : natClean(r); natSay(''); commaHold = false; } }
      else U.$$('.qc-o input', el).forEach(i => (i.checked = Array.isArray(r) ? r.includes(i.value) : r === i.value));
      sel(); needSay('');
    };
    /** the response: an option letter, a sorted list of letters (MSQ), or a NAT number as text; null when nothing (or no real number) is given (P0-16) */
    const getResp = () => {
      if (q.type === 'NAT') { const n = natRead(natIn ? natIn.value : ''); return n.value == null || commaHold ? null : n.clean.replace(/^(-?)\./, (x, s) => s + '0.'); }
      const chosen = U.$$('.qc-o input:checked', el).map(i => i.value);
      if (q.type === 'MSQ') return chosen.length ? chosen.sort() : null;
      return chosen[0] || null;
    };
    el.addEventListener('change', e => { if (locked || !e.target.closest('.qc-o')) return; resp = getResp(); sel(); needSay(''); if (o.onChange) o.onChange(resp); });
    if (natIn) natIn.addEventListener('input', () => {
      if (locked) return;
      const v = natIn.value, n = natRead(v);
      if (n.clean !== v) {
        const at = natIn.selectionStart == null ? v.length : natIn.selectionStart, caret = natClean(v.slice(0, at)).length;
        natIn.value = n.clean;
        try { natIn.setSelectionRange(caret, caret); } catch (err) { /* not focused */ }
      }
      // a refused comma is named until a point is typed or the box is emptied: '0,75' never quietly becomes 75 (P0-16)
      if (n.why === 'comma') commaHold = true;
      else if (!n.clean || /\./.test(n.clean)) commaHold = false;
      natSay(n.why === 'comma' || commaHold ? 'Use a decimal point (.), not a comma.' : n.why === 'chars' ? 'Only digits, one decimal point and a leading minus.' : '', !!n.why || commaHold);
      resp = getResp(); if (o.onChange) o.onChange(resp);
    });
    if (resp != null) setResp(resp);

    /* ---- state ---- */
    const fb = U.$('.qc-fb', el), sol = U.$('.qc-sol', el), my = U.$('.qc-my', el), bar = U.$('.qc-bar', el), act = U.$('.qc-act', el), hb = U.$('.qc-hb', el), kn = U.$('.qc-kn', el);
    let t0 = Date.now(), checked = false, peeked = false, lastM = null, solP = null, solV, trapHtml = null, stopFit = null, xpInfo = null, saidV = null;
    const solution = () => (solP = solP || Promise.resolve().then(() => DATA().solution(q.id)).then(s => (solV = s || null), err => { solP = null; throw err; }));
    /** what a reference in solution text is called: a lesson's title, a lab's title, a question's paper and number; '' when unknown (dropped) */
    const refTitle = id => {
      if (/^q:/.test(id)) { const x = D.qById[id.slice(2)]; return x ? `${ui.paperLabel ? ui.paperLabel(x) : x.paper} · ${ui.qLabel ? ui.qLabel(x) : 'Q' + x.no}` : ''; }
      if (/^lab:/.test(id)) { const lb = (D.labs || []).find(x => x.id === id.slice(4)); return lb ? lb.title : ''; }
      const l = D.lessonById && D.lessonById[id.split('#')[0]];
      return l ? l.title : '';
    };
    const refs = md => labelRefs(md, refTitle);
    const blind = () => (solV && solV.c ? blindOf(q, solV.c) : null);
    const disputed = () => kind === 'keyed' && !!(meta.disputed || q.disputed || (solV && solV.c && solV.c.dispute));
    function lock(v) { locked = v !== false; U.$$('input, .qc-pm', inEl).forEach(i => (i.disabled = locked)); el.classList.toggle('locked', locked); }

    /** 'How we read the key' (P2-24): the build's note on how the official key was read, in the source footer once the answer is shown */
    function paintKeyNote(on) {
      if (!kn) return;
      if (!on || !q.key_note) { kn.hidden = true; kn.innerHTML = ''; return; }
      if (kn.firstChild) return;   // keep an open disclosure open across repaints
      kn.innerHTML = `<details class="qc-knd" data-loaded="1"><summary><span>How we read the key</span><svg class="i qc-chev" aria-hidden="true"><use href="#i-chev-d"/></svg></summary><p>${esc(q.key_note)}</p></details>`;
      kn.hidden = false;
    }
    /** paint the options and the feedback from the current state (a check, a peek, review, or the solution arriving) */
    function paint(r) {
      const m = lastM;
      const fbk = feedback(q, r, m, { peek: peeked, state: mode === 'review' ? o.state : null, blind: blind(), keyNote: paper && paper.keyNote, trap: trapHtml, xp: xpInfo, paper,
        dispute: disputed() ? disputeLine(q, solV, { mode, peek: peeked }) : '' });
      const states = optionStates(q, peeked ? null : r, { correct: m.state === 'correct', blind: blind() });
      U.$$('.qc-o', el).forEach(l => { const s = states[l.dataset.k] || ''; ['ok', 'bad', 'miss', 'dim', 'ours'].forEach(c => l.classList.toggle(c, s === c)); });
      fb.innerHTML = fbk.html; fb.hidden = false;
      fb.dataset.state = fbk.cls;
      inEl.dataset.state = kind === 'keyed' && !peeked ? (o.state && mode === 'review' ? o.state : m.state) : 'ungraded';
      paintKeyNote(true);
      return fbk;
    }
    /** reveal the answer for response r (review mode, or a peek with r = null); returns the mark */
    function reveal(r) {
      lastM = mode === 'review' && o.state === 'notevaluated' ? { score: 0, state: 'notevaluated', negative: 0 } : markOf(q, r);
      lastM.fb = paint(r);
      return lastM;
    }
    /** the header badge from the solution's own check record, when it says more than the catalogue did */
    function redrawBadge(c) {
      if (!showBadge || !c) return;
      const b = badgeOf(kind, c, paper);
      U.$$('.qc-bw', el).forEach(w => { if (!w.textContent.includes(b[2])) w.innerHTML = badgeHtml(b); });
    }

    /* ---- the worked solution: one fold, opened by itself after a miss, a peek or on a questioned key (P1-19, P2-24); a file that did not arrive
       says so (P1-59). Its first line explains a badge that is more than a plain official key (P2-66) ---- */
    let autoOpen = false, gen = 0;   // gen: a Try again while the solution is still loading must not show it on the fresh question
    async function loadSolution(retried) {
      sol.innerHTML = '';
      const my = gen;
      let s;
      try { s = await solution(); }
      catch (err) {
        if (my !== gen) return;
        // the fold this miss or peek would have opened (P1-19): a Try again that brings the file opens it then, with focus on its title
        const reopen = autoOpen || !!(retried && retried.open);
        if (ui.loadFailed) ui.loadFailed(sol, { what: 'solution', main: false, retry: () => loadSolution({ open: reopen }) });
        else sol.innerHTML = `<div class="qc-nosol" role="status">${icon('alert')} The worked solution did not load. Check your connection, then open this question again.</div>`;
        // meanwhile the verdict and the failure card are what this miss shows
        if (checked && autoOpen) { autoOpen = false; bringUp(sol.getBoundingClientRect().bottom, fb.hidden ? sol.getBoundingClientRect().top : fb.getBoundingClientRect().top); }
        return;
      }
      if (my !== gen || !checked) return;
      if (retried && retried.open) autoOpen = true;
      const c = s && s.c;
      if (s) {
        // the header carries the provenance badge in practice and review; embeds (lessons) name it on the fold. Every mode explains it in the
        // solution's first line, except a plain official key (P2-66)
        const b = c ? badgeOf(kind, c, paper) : null;
        const why = b && (b[0] || kind !== 'keyed') ? `<p class="qc-why">${icon(b[1])}<span><b>${U.cap(b[2])}.</b> ${esc(b[3])}.</span></p>` : '';
        // data-loaded: pages that open rows on a capture-phase 'toggle' (the result page, lesson PYQ lists) skip folds marked as loaded
        sol.innerHTML = `<details class="qc-sd" data-loaded="1"><summary>${icon('bulb')}<span>Worked solution</span>${b && !showBadge ? badgeHtml(b, true) : ''}<svg class="i qc-chev" aria-hidden="true"><use href="#i-chev-d"/></svg></summary><div class="qc-sb md ui">${why}${MD().render(refs(s.s), {})}</div></details>`;
        redrawBadge(c);
        // a Try again inside the failure card removed the focused button: focus goes to the fold's title, unless the learner has moved on
        if (retried) { const a = document.activeElement, sm = U.$('.qc-sd > summary', sol); if (sm && (!a || a === document.body || !a.isConnected)) sm.focus({ preventScroll: true }); }
      } else if (meta.subject && meta.subject !== '?') sol.innerHTML = `<div class="qc-nosol">${icon('info')} No worked solution written for this question yet${kind === 'keyed' ? ': the official key above is exact' : ''}.</div>`;
      // the answer loop may need what the solution says: our worked answer (no key, marks to all), what it argues on a questioned key (P2-24) and
      // the Trap line (D17)
      if (checked && lastM) {
        if (kind !== 'keyed') {
          const f = paint(peeked ? null : resp); autoOpen = autoOpen || f.open;
          if (mode !== 'review' && f.say !== saidV && ui.say) { saidV = f.say; ui.say(f.say); }   // our worked answer arrived: say the fuller verdict once
        } else if (disputed()) paint(peeked ? null : resp);
        else if (!trapHtml && trapWanted(q, lastM, mode, c)) {
          const t = trapFor(s, picksOf(resp));
          if (t) { trapHtml = MD().inline(refs(t), {}); paint(resp); }
        }
      }
      // a miss or a peek scrolls once, when its fold opens; with no fold to open, the verdict is kept in view instead
      if (autoOpen) { if (U.$('.qc-sd', sol)) openFold(); else { autoOpen = false; keepVerdict(); } }
      if (GA.fit && GA.fit.all && el.isConnected) GA.fit.all(sol);
    }
    function openFold() {
      const d = U.$('.qc-sd', sol);
      if (!d || d.open) return;
      autoOpen = false;
      setTimeout(() => {
        if (!d.isConnected || d.open || !checked) return;
        d.open = true;
        // bring the fold's title into view above whatever is docked at the bottom, without moving the verdict under the top bar
        const r = d.querySelector('summary').getBoundingClientRect();
        bringUp(r.bottom, fb.hidden ? r.top : Math.min(r.top, fb.getBoundingClientRect().top));
      }, 300);
    }

    /* ---- keep the answer loop in view (P1-18, P1-19, P1-22): between the sticky top bar and whatever is docked at the bottom of the screen ---- */
    /** the visible band for this card: {top, bottom} in viewport px. Bottom docks: the card's own main action, the phone tab bar, and anything a page
        docks over the card's lower half (the question page's end-of-set panel, a toast), found by hit-testing up from the bottom edge */
    function viewBand() {
      const vh = g.innerHeight || 0, vw = g.innerWidth || 0;
      const box = x => (x && x.getClientRects().length ? x.getBoundingClientRect() : null);
      let top = 0, bottom = vh;
      U.$$('.topbar, .save-warn').forEach(x => { const b = box(x); if (b && b.height && b.bottom < vh / 2) top = Math.max(top, b.bottom); });
      const above = (x, pad) => { const b = box(x); if (b && b.height && b.top < vh && b.top > vh / 2) bottom = Math.min(bottom, b.top - pad); };
      if (act && el.hasAttribute('data-dock')) above(act, 12);   // its soft fade reaches 14 px above it
      above(document.querySelector('.tabbar'), 0);
      const r = el.getBoundingClientRect(), cx = Math.round(Math.min(vw - 2, Math.max(2, r.left + r.width / 2)));
      if (document.elementFromPoint) {
        for (let y = Math.round(Math.min(bottom, r.bottom)) - 2; y > Math.max(vh / 2, r.top + 2); y -= 6) {
          const t = document.elementFromPoint(cx, y);
          if (t && !el.contains(t) && !t.closest('.toasts')) bottom = Math.min(bottom, y);   // painted over the card here: a page's own dock (gaps between docks are skipped)
        }
      }
      return { top: top + 8, bottom: bottom - 8 };
    }
    /** scroll the least needed so that `bottomEdge` ends inside the band, never moving `topEdge` above the band's top (viewport px) */
    function bringUp(bottomEdge, topEdge) {
      if (mode === 'review' || !el.isConnected) return;
      const by = scrollNeed(bottomEdge, topEdge, viewBand());
      if (by) g.scrollBy({ top: by, behavior: calm() ? 'auto' : 'smooth' });
    }
    const keepBox = x => { if (x && x.getClientRects().length) { const r = x.getBoundingClientRect(); bringUp(r.bottom, r.top); } };
    /** after a check that opens no fold (a correct answer): the verdict and the official answer stay in view above the docked Next. Measured at
        rest: the verdict may still be rising into place (its entrance starts 12 px low) */
    function keepVerdict() {
      if (fb.hidden || !checked) return;
      const r = fb.getBoundingClientRect(), m = /^matrix\(([^)]+)\)$/.exec(getComputedStyle(fb).transform || ''), dy = m ? +m[1].split(',')[5] || 0 : 0;
      bringUp(r.bottom - dy, r.top - dy);
    }

    /* ---- the Hint (P2-64): on the question page it takes the pre-check 'Show answer' slot; once shown (or when this question has none that keeps
       the answer back) the slot is 'Show answer' again. A right answer after the hint earns the later-correct XP ---- */
    const hintOn = (o.hint != null ? !!o.hint : mode === 'practice' && o.cta === 'pop') && !!meta.hasSol;
    let hinted = false, hintSt = null;   // hintSt: null (not asked) | 'loading' | 'shown' | 'none' (none that keeps the answer back) | 'failed'
    // the hint as spoken text; a named reference is read as its title
    const plainOf = md => {
      const Lb = GA.pyqLib;
      try { if (Lb && typeof Lb.plain === 'function') return Lb.plain(md); } catch (e) { /* fall through */ }
      return String(md || '').replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1').replace(/\[\[[^\]]*\]\]/g, '').replace(/[*_`$\\]/g, '');
    };
    async function showHint(fromKey) {
      if (!hintOn || checked || hintSt === 'loading') return;
      hintSt = 'loading'; renderBar('hint');
      let s = null;
      try { s = await solution(); }
      catch (err) {
        if (checked) return;
        hintSt = 'failed';
        if (ui.loadFailed) ui.loadFailed(hb, { what: 'solution', main: false, retry: () => { hintSt = null; hb.hidden = true; return showHint(); } });
        else hb.innerHTML = `<p class="qc-hb-none" role="status">${icon('alert')}<span>The hint did not load. Show answer opens the official answer.</span></p>`;
        hb.hidden = false; renderBar('hint'); settleHint(fromKey, 'The hint did not load.');
        return;
      }
      if (checked) return;
      const h = s ? hintOf(q, s, refTitle) : null;
      if (h) { hinted = true; hintSt = 'shown'; hb.innerHTML = `<div class="qc-hb-h">${icon('bulb')}<b>Hint</b></div><div class="qc-hb-b md ui">${MD().render(h.md, {})}</div>`; }
      else {
        hintSt = 'none';
        hb.innerHTML = `<p class="qc-hb-none">${icon('info')}<span>${s && ideaOf(s.s) ? 'No separate hint for this question: its key idea would give the answer away.' : 'No hint written for this question yet.'} Show answer opens the worked solution.</span></p>`;
      }
      hb.hidden = false;
      if (GA.fit && GA.fit.all) GA.fit.all(hb);
      renderBar('hint');
      settleHint(fromKey, h ? 'Hint: ' + plainOf(h.md) : 'No separate hint for this question.');
    }
    /** after the Hint: focus stays in the slot (now 'Show answer'), the hint is read out and kept in view above the docked main action */
    function settleHint(fromKey, say) {
      if (fromKey) { const rv = U.$('[data-a="reveal"]', el); if (rv) rv.focus({ preventScroll: true }); }
      if (ui.say) ui.say(say);
      keepBox(hb);
    }

    /* ---- your note (P1-27: one note per question, q[id].note) ---- */
    const noteOf = () => (S.state.q[q.id] || {}).note || '';
    function paintNote() {
      const n = noteOf();
      if (!n || !(checked || mode === 'review')) { my.hidden = true; my.innerHTML = ''; return; }
      my.hidden = false;
      my.innerHTML = `<div class="qc-my-h">${icon('edit')}<span>Your note</span>${mode !== 'review' && mode !== 'exam' ? '<button type="button" class="btn sm ghost" data-a="note">Edit</button>' : ''}</div><p>${esc(n)}</p>`;
    }
    function editNote(opener) {
      const cur = noteOf(), id = uid + '-nt';
      ui.modal({ title: 'Your note', onclose: () => setTimeout(() => { const t = opener && opener.isConnected ? opener : U.$('[data-a="note"]', el); if (t) t.focus({ preventScroll: true }); }, 0),
        // first focus is GA.ui.modal's rule (P1-47): the field on a desktop, the dialog itself on a touch screen, where focusing the field would
        // open the keyboard over Save
        body: `<label class="sr" for="${id}">Your note on ${esc(ui.paperLabel ? ui.paperLabel(q) : q.paper)} · ${esc(ui.qLabel ? ui.qLabel(q) : 'Q' + q.no)}</label><textarea class="input" rows="5" id="${id}" placeholder="What tripped you up? What should you remember?">${esc(cur)}</textarea>`,
        actions: [{ label: 'Cancel' }, { label: 'Save', kind: 'primary', onclick: b2 => {
          const v = U.$('#' + id, b2).value;
          A.setNote(q.id, v);
          ui.toast(noteToast(v, !!(S.state.nb && S.state.nb[q.id])), 'ok');
          paintNote(); noteLabels();
        } }] });
    }
    const noteLabels = () => U.$$('.qc-bar [data-a="note"] span', el).forEach(s => (s.textContent = noteOf() ? 'Your note' : 'Note'));

    /* ---- 'Report a problem' (P3-48, D16): the shell's GA.ui.report sheet when it exists, else this copy-only dialog: the question, its id, its
       paper, the build date and the learner's words, copied as plain text. No network, nothing stored ---- */
    function reportSheet(opener) {
      const id = uid + '-rp', label = `${ui.paperLabel ? ui.paperLabel(q) : q.paper} · ${ui.qLabel ? ui.qLabel(q) : 'Q' + q.no}`, built = D.built || '';
      const paperTxt = paper ? [paper.label, paper.organiser, q.page ? `question paper page ${q.page}` : ''].filter(Boolean).join(' · ') : q.paper;
      let m = null, busy = false;
      const copy = async box => {
        if (busy) return;
        busy = true;
        try { await copyOnce(box); } finally { busy = false; }
      };
      const copyOnce = async box => {
        const text = reportText(q, { label, paper: paperTxt, built, words: U.$('#' + id, box).value }), st = U.$('.qc-rp-st', box);
        let done = false;
        try { if (g.navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') { await navigator.clipboard.writeText(text); done = true; } } catch (err) { done = false; }
        if (!done) {
          // the browser keeps its clipboard API to itself here (an older browser, a page opened from a file): copy from a selected box instead
          let out = U.$('.qc-rp-out', box);
          if (!out) { out = document.createElement('textarea'); out.className = 'input qc-rp-out'; out.readOnly = true; out.rows = 6; out.setAttribute('aria-label', 'Your report'); st.before(out); }
          out.value = text; out.focus({ preventScroll: true }); out.select();
          try { done = !!(document.execCommand && document.execCommand('copy')); } catch (err) { done = false; }
          if (!done) { st.textContent = copyHint(!!ui.touch, /Mac|iPhone|iPad/.test((g.navigator && (navigator.platform || navigator.userAgent)) || '')); return; }
        }
        if (m) m.close();
        ui.toast('Report copied · paste it into a message or an email', 'ok');
      };
      m = ui.modal({ title: 'Report a problem', onclose: () => setTimeout(() => { if (opener && opener.isConnected) opener.focus({ preventScroll: true }); }, 0),
        // first focus: GA.ui.modal's rule, as in the note dialog (on touch screens the keyboard would cover Copy report; P1-47)
        body: `<p class="qc-rp-for">${esc(label)} · ${esc(q.id)}${built ? ` · data ${esc(built)}` : ''}</p><label class="qc-rp-l" for="${id}">What looks wrong?</label><textarea class="input" rows="4" id="${id}" placeholder="For example: the key says C, but the working shows B."></textarea><p class="qc-rp-n">Nothing is sent from this app. Copy puts the report on your clipboard, ready to paste into a message or an email.</p><p class="qc-rp-st" role="status" aria-live="polite"></p>`,
        actions: [{ label: 'Cancel' }, { label: 'Copy report', kind: 'primary', onclick: box => { copy(box); return false; } }] });
    }
    /** a bookmark set or cleared: the toast names the count and where to find them all (P2-65, D5, P2-12) */
    function bookmark(on) {
      const n = A.setBookmark(q.id, on);
      ui.toast(on ? `Bookmarked${typeof n === 'number' && n > 0 ? ` · ${U.nf ? U.nf(n) : n}` : ''} · find them in Questions › Bookmarked` : 'Bookmark removed');
    }

    /* ---- check ---- */
    function feel(m) {
      if (mode === 'review') return;
      const r = getResp(), k0 = Array.isArray(r) ? r[0] : r;
      if (m.state === 'correct') { buzz(15); burst(q.type === 'NAT' ? natIn : U.$(`.qc-o[data-k="${k0}"] .qc-k`, el)); }
      else if (m.state === 'wrong') { buzz([20, 40, 20]); shake(q.type === 'NAT' ? U.$('.qc-nat', el) : U.$(`.qc-o[data-k="${k0}"]`, el)); }
    }
    /** the XP this right answer earns, from the engine that awards it (P2-38): read before the attempt is recorded; none in a test or on a miss */
    function xpOf(ok) {
      const E = GA.engage;
      if (kind !== 'keyed' || ok !== true || !E || typeof E.xpFor !== 'function' || (o.attemptMode || 'p') === 't') return null;
      let n = 0;
      try { n = E.xpFor(S.state, 'pyq', q.id, true, { hint: hinted }); } catch (err) { n = 0; }
      return n > 0 ? { n, hint: hinted, again: !hinted && !!(E.XP && n === E.XP.pyqAgain) } : null;
    }
    function check() {
      if (checked || mode === 'exam' || mode === 'review') return;
      const r = getResp();
      if (r == null) {
        if (q.type === 'NAT') {
          // only a real number is graded (P0-16): anything else is explained, never marked wrong
          const raw = natIn ? natIn.value.trim() : '';
          natSay(commaHold ? 'Use a decimal point (.), not a comma: type 0.75, not 0,75.' : raw ? 'Type a number like 12 or −0.5' : 'Type your answer first: a number like 12 or −0.5', true);
          shake(U.$('.qc-nat', el));
          if (natIn) natIn.focus({ preventScroll: true });
        } else {
          needSay(q.type === 'MSQ' ? 'Choose at least one option first.' : 'Choose an answer first.');
          shake(U.$('.qc-opts', el));
          const first = U.$('.qc-o input', el); if (first) first.focus({ preventScroll: true });
          keepBox(U.$('.qc-need', el));
        }
        return;
      }
      resp = r;
      const ms = Date.now() - t0;
      lastM = markOf(q, r);
      const ok = kind === 'keyed' ? lastM.state === 'correct' : null;
      xpInfo = xpOf(ok);
      checked = true; lock(true);
      hb.hidden = true;   // the worked solution starts with the same idea
      const f = paint(r);
      autoOpen = f.open;
      // a keyed answer is an attempt; a question without a usable key records a 'seen' check only (D9: no score, no XP, no notebook, no schedule)
      if (kind === 'keyed') A.attempt({ id: q.id, marks: q.marks, type: q.type }, r, ok, ms, o.attemptMode || 'p', { hint: hinted });
      else if (A.setSeen) A.setSeen(q.id);
      if (o.onCheck) o.onCheck({ resp: r, mark: lastM, ok, ms });
      feel(lastM);
      renderBar('check');
      paintNote();
      loadSolution();
      const hw = U.$('.qc-hw', el); if (hw && kind === 'keyed') hw.innerHTML = histHtml(S.state.q[q.id]);
      settleFocus(f);
      // a correct answer opens no fold: keep its verdict in view, after the page has docked anything of its own (the end of a set, P1-22)
      if (!f.open) setTimeout(keepVerdict, 40);
    }
    function peek() {
      if (checked || mode === 'exam' || mode === 'review') return;
      peeked = true; checked = true; xpInfo = null;
      lastM = markOf(q, null);
      lock(true);
      hb.hidden = true;
      const f = paint(null);
      autoOpen = true;
      renderBar('reveal');
      paintNote();
      loadSolution();
      if (o.onReveal) o.onReveal({ mark: lastM });
      settleFocus(f);
    }
    function retry() {
      gen++; checked = false; peeked = false; lastM = null; trapHtml = null; autoOpen = false; xpInfo = null; saidV = null;
      lock(false); setResp(null);
      fb.hidden = true; fb.innerHTML = ''; sol.innerHTML = ''; delete inEl.dataset.state;
      paintKeyNote(false);
      if (hintSt === 'shown' || hintSt === 'none') hb.hidden = false;
      U.$$('.qc-o', el).forEach(l => l.classList.remove('ok', 'bad', 'miss', 'dim', 'ours'));
      t0 = Date.now(); renderBar(); paintNote();
      if (o.onRetry) o.onRetry();
      const first = U.$('.qc-o input, .qc-nat input', el); if (first) first.focus({ preventScroll: true });
    }
    /** after a check or a peek: focus the next logical control (Next), else the verdict, and announce the verdict (P1-48) */
    function settleFocus(f) {
      saidV = f.say;
      const next = act && U.$('[data-a="next"]', act);
      if (next) { next.focus({ preventScroll: true }); if (ui.say) ui.say(f.say); }
      else if (el.contains(document.activeElement) || document.activeElement === document.body) fb.focus({ preventScroll: true });
      else if (ui.say) ui.say(f.say);
    }

    /* ---- the toolbar and the main action (P1-18: on phones the main action docks above the tab bar; the toolbar stays in flow) ---- */
    function renderBar(from) {
      if (!bar) return;
      const had = document.activeElement && el.contains(document.activeElement) ? document.activeElement.dataset.a : null;
      const pop = o.cta === 'pop', main = pop ? 'pop' : 'primary';
      const bmOn = !!(S.state.q[q.id] || {}).bm;
      const markB = o.mark ? `<button type="button" class="btn sm qc-mark" data-a="mark" aria-pressed="${bmOn}">${icon('bookmark')}<span>${bmOn ? 'Bookmarked' : 'Bookmark'}</span></button>` : '';
      const noteB = `<button type="button" class="btn sm ghost" data-a="note">${icon('edit')}<span>${noteOf() ? 'Your note' : 'Note'}</span></button>`;
      const nav = (x, a, label, ic) => (x ? `<a class="btn sm${a === 'skip' ? ' ghost' : ''}" href="${esc(x.href)}" data-a="${a}" rel="${a === 'prev' ? 'prev' : 'next'}">${ic === 'l' ? icon('arrow-l') : ''}<span>${esc(label)}</span>${ic === 'r' ? icon('arrow-r') : ''}</a>` : '');
      // the pre-check slot: 'Hint' until it has been asked for (P2-64), then 'Show answer'
      const slot = hintOn && (hintSt == null || hintSt === 'loading')
        ? `<button type="button" class="btn sm ghost" data-a="hint"${hintSt === 'loading' ? ' aria-disabled="true" aria-busy="true"' : ''}>${icon('bulb')}<span>Hint</span></button>`
        : `<button type="button" class="btn sm ghost" data-a="reveal">${icon('eye')}<span>Show answer</span></button>`;
      const left = checked
        ? `${kind === 'keyed' ? `<button type="button" class="btn sm" data-a="retry">${icon('refresh')}<span>Try again</span></button>` : ''}${noteB}${markB}`
        : `${markB}${slot}${noteB}`;
      const right = checked ? nav(o.prev, 'prev', 'Previous', 'l') : `${nav(o.prev, 'prev', 'Previous', 'l')}${o.next && !o.next.end ? nav(o.next, 'skip', 'Skip', 'r') : ''}`;
      bar.innerHTML = `<div class="qc-bl">${left}</div>${right ? `<div class="qc-br">${right}</div>` : ''}`;
      act.innerHTML = checked
        ? (o.next ? `<a class="btn ${main}" href="${esc(o.next.href)}" data-a="next" rel="next"${o.next.end ? ' data-end' : ''}><span>${esc(o.next.label || 'Next question')}</span>${icon('arrow-r')}</a>` : '')
        : `<button type="button" class="btn ${main}" data-a="check">Check answer</button>`;
      // keep focus on the same control, or the next logical one (P1-48); the Hint hands its focus to 'Show answer' (settleHint)
      if (had && (!from || from === 'hint')) { const same = U.$(`[data-a="${had}"]`, el); if (same) same.focus({ preventScroll: true }); }
    }

    /* ---- events ---- */
    U.on(el, 'click', '[data-a]', (e, b) => {
      const a = b.dataset.a;
      if (a === 'check') check();
      else if (a === 'reveal') peek();
      else if (a === 'hint') { if (b.getAttribute('aria-disabled') !== 'true') showHint(document.activeElement === b); }
      else if (a === 'retry') retry();
      else if (a === 'note') editNote(b);
      else if (a === 'report') { if (typeof ui.report === 'function') ui.report({ kind: 'question', id: q.id, from: b }); else if (typeof ui.modal === 'function') reportSheet(b); }
      else if (a === 'pm') {
        if (!natIn || natIn.disabled) return;
        natIn.value = natIn.value.startsWith('-') ? natIn.value.slice(1) : '-' + natIn.value;
        natIn.dispatchEvent(new Event('input', { bubbles: true }));
        try { natIn.focus({ preventScroll: true }); natIn.setSelectionRange(natIn.value.length, natIn.value.length); } catch (err) { /* ignore */ }
      } else if (a === 'mark') {
        const on = !((S.state.q[q.id] || {}).bm);
        bookmark(on);
        b.setAttribute('aria-pressed', String(on)); U.$('span', b).textContent = on ? 'Bookmarked' : 'Bookmark';
      } else if ((a === 'prev' || a === 'next' || a === 'skip') && b.tagName === 'A' && o.navReplace !== false && !b.hasAttribute('data-end')) {
        // moving through a set replaces the history entry, so Back leaves the set instead of stepping through it (P1-47)
        if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const h = b.getAttribute('href');
        if (!h || h[0] !== '#') return;
        e.preventDefault();
        const go = () => location.replace(h), ov = GA.ui && GA.ui.overlay;
        if (ov && ov.busy && ov.busy()) ov.after(go); else go();
      }
    });
    // ± keeps the on-screen keyboard open: the button never takes focus from the box
    if (natIn) ['pointerdown', 'mousedown'].forEach(t => el.addEventListener(t, e => { if (e.target.closest && e.target.closest('.qc-pm')) e.preventDefault(); }));
    const bm = U.$('.qc-bm', el);
    if (bm) bm.addEventListener('click', () => { const on = bm.getAttribute('aria-pressed') !== 'true'; bookmark(on); bm.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    // keys (P0-13): the card remembers the key being dispatched, so a page shortcut that calls check() during Enter on a button inside the card
    // (Skip, Show answer, Hint, Bookmark, a link, the fold) or during a key repeat does nothing; Enter in the NAT box checks; an option's arrows stay
    // with its radio group (they never reach a page's 'next question' shortcut)
    let kd = null;
    el.addEventListener('keydown', e => {
      const t = e.target, role = keyRole(e.key, { tag: t.tagName, type: t.type, role: t.getAttribute && t.getAttribute('role') });
      kd = { check: role.check && !e.repeat };
      setTimeout(() => { kd = null; }, 0);
      if (e.defaultPrevented) return;
      if (role.nat && t === natIn && mode !== 'exam') { e.preventDefault(); if (!e.repeat) check(); return; }
      if (role.own) e.stopPropagation();
    });

    // an older build without the CHECKED / DISPUTE bits: the badge still needs the solution's check record (practice and review)
    if (!flagsOk && showBadge && meta.hasSol) solution().then(s => { if (s && s.c) redrawBadge(s.c); }, () => { /* the fold says so when it is opened */ });

    // legibility (P1-54): one ResizeObserver per card re-fits maths, tables and figures when the width changes, a solution loads or a fold opens
    if (GA.fit && typeof GA.fit.watch === 'function') stopFit = GA.fit.watch(el);

    if (mode === 'review') {
      lock(true); checked = true;
      lastM = reveal(o.resp);
      autoOpen = lastM.fb.open && (lastM.state !== 'correct' || disputed());
      paintNote();
      loadSolution();
    } else renderBar();

    const api = {
      el, getResponse: getResp, setResponse: setResp, lock, reveal,
      /** grade the current response. Called by a page shortcut, it does nothing while Enter on a button or a link inside the card is being
          dispatched, or for a repeated key (P0-13) */
      check() { if (kd && !kd.check) return; check(); },
      get checked() { return checked; },
      /** stop the card's fit observer (optional: a detached card is collected with it) */
      destroy() { if (stopFit) { stopFit(); stopFit = null; } }
    };
    return api;
  }

  const lib = { kindOf, picksOf, keyLetters, natClean, natValue, natRead, blindOf, sameAsBlind, markOf, marksText, hintText, optionStates, feedback, trapWanted, trapFor,
    solAnswer, oursOf, disputeLine, labelRefs, ideaOf, givesAway, hintOf, shortId, keyRole, badgeOf, flagCheck, scrollNeed, noteToast, minus, reportText, copyHint };
  GA.qcard = { create, markingNote, lib, fx: { burst, shake, buzz, calm } };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.qcard;
})(typeof window !== 'undefined' ? window : globalThis);
