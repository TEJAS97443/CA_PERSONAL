/* PassBook — persistent application state. Everything the dashboard shows is derived from this object, nothing else.
   Storage: localStorage (falls back to memory when there is none, e.g. Node). One JSON document per profile, versioned, migrated and type-checked.
   Profiles: 'main' (default) and 'demo' (?profile=demo) live under different keys so demo data can never leak into real progress.

   Saving fails loudly (P0-12): a write the browser refuses (storage full, blocked) is never swallowed. flush() then emits 'error' (with the Error,
   .kind 'quota' | 'blocked' | 'write' | 'held') and sets GA.store.saveError; the next successful flush clears it ('saved' fires after every good write).
   Booting is safe (P1-51): sanitize() checks every field's type; text that cannot be read, or entries that are malformed, are kept aside first as this
   profile's one rotating ':corrupt-<time>' copy (with no room for it the text is held: never overwritten). Events that fire while nobody listens yet
   ('corrupt', 'repaired', 'error') wait for their first subscriber, so the shell may subscribe after init(). Each Import keeps one
   ':before-import-<time>' copy (only the newest; the earlier one goes once the import has landed, and copies older than 7 days at boot).
   Writes (P3-34, P3-38): one document per profile; time on task saves at most once a minute, other changes within 250 ms, everything at once while
   the page hides; '<profile>:theme' mirrors the theme for the first paint. persist() asks the browser to keep the storage (P2-49). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const VERSION = 3;                 // v2: state.eng and state.logArch. v3: one note per question (q[id].note), profile.examSet / route / focus / lastExport,
                                     //     typed sanitize, phantom card keys and duplicate test records removed
  const PREFIX = 'passbook:';             // never GATE Ascent's 'gate-ascent:' (file:// pages share one localStorage)
  const LOG_CAP = 12000;
  const LEGACY_EXAM = '2027-02-06';   // the old built-in default exam date: on a profile that never chose a date it meant "not set"; v3 stores null instead
  const UNDO_DAYS = 7;                // lastImport(): 'Undo last import' is offered for a kept-aside copy younger than this
  const QUOTA = 5242880;              // what Chromium and Safari give localStorage per origin, in UTF-16 code units (every file:// page shares one)
  const DAYKEY = /^\d{4}-\d{2}-\d{2}$/;
  const MSG = {
    notBackup: 'This file is not a PassBook backup',
    noRoomCopy: 'There is no room in this browser’s storage to keep a copy of your current progress, so nothing was imported. Export a backup of it first, then free some space.',
    noRoomImport: 'There is no room in this browser’s storage for this backup, so nothing was imported.',
    held: 'Your saved progress could not be read and there is no room to keep a copy of it, so new progress is not saved until you download it or free some space.',
    heldRepaired: 'Parts of your saved progress could not be read and there is no room to keep a copy of it, so new progress is not saved until you download it or free some space.',
    noRoomKeep: 'There is no room in this browser’s storage to keep your saved progress aside, so nothing was reset. Download it first.',
    demoBackup: 'This backup is from the demo profile, so it was not imported into your progress.'
  };
  const LAZY_MS = 60000;              // time on task saves at most once a minute (plus on hide); everything else within 250 ms (P3-34)

  /* ---------------------------------------------------------------- storage backend */
  const mem = {};
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  /** the browser's localStorage; null when there is none (Node: memory mode, not an error); false when the browser blocks it (access throws) */
  function backend() { try { return g.localStorage || null; } catch (e) { return false; } }
  function errKind(e) {
    const n = (e && e.name) || '', c = e && e.code;
    return n === 'QuotaExceededError' || n === 'NS_ERROR_DOM_QUOTA_REACHED' || c === 22 || c === 1014 || /quota/i.test(String(e && e.message)) ? 'quota' : 'write';
  }
  function storeError(kind, msg, cause) { const e = new Error(msg); e.kind = kind; if (cause) { e.name = cause.name || e.name; e.cause = cause; } return e; }
  const ls = {
    get(k) { const b = backend(); if (b) { try { return b.getItem(k); } catch (e) { /* blocked mid-session: fall through */ } } return own(mem, k) ? mem[k] : null; },
    /** true when written; otherwise an Error with .kind 'quota' | 'blocked' | 'write' (the value is never silently parked in memory) */
    set(k, v) {
      const b = backend();
      if (b === null) { mem[k] = v; return true; }
      if (b === false) { mem[k] = v; return storeError('blocked', 'This browser blocks storage for this page'); }
      try { b.setItem(k, v); return true; } catch (e) { return storeError(errKind(e), (e && e.message) || 'The browser refused to save', e); }
    },
    del(k) { delete mem[k]; const b = backend(); if (b) { try { b.removeItem(k); } catch (e) { /* ignore */ } } },
    keys() {
      const b = backend();
      if (!b) return Object.keys(mem);                                 // memory mode, or blocked storage (what this session holds)
      const out = [];
      try { for (let i = 0; i < b.length; i++) { const k = b.key(i); if (k != null) out.push(k); } } catch (e) { /* not enumerable */ }
      return out;
    }
  };
  /** what a key of this app holds: 'state' (a profile), 'before-import', 'corrupt', 'meta' (the tiny theme key read before first paint), 'other';
      null for keys of other pages */
  function kindOf(k) {
    if (typeof k !== 'string' || k.indexOf(PREFIX) !== 0) return null;
    const rest = k.slice(PREFIX.length);
    if (/:before-import-\d+$/.test(rest)) return 'before-import';
    if (/:corrupt-\d+$/.test(rest)) return 'corrupt';
    if (/^[^:]+:theme$/.test(rest)) return 'meta';
    return rest && rest.indexOf(':') < 0 ? 'state' : 'other';
  }
  const stamp = k => +((/-(\d+)$/.exec(k) || [0, 0])[1]);
  const copiesOf = (base, kind) => ls.keys().filter(k => k.indexOf(base + ':' + kind + '-') === 0 && kindOf(k) === kind).sort((a, b) => stamp(a) - stamp(b));
  /** a new copy key of this profile, newer than every existing one (two copies in one millisecond never share a key) */
  function copyKey(kind) {
    const have = copiesOf(key, kind), last = have.length ? stamp(have[have.length - 1]) : 0;
    return key + ':' + kind + '-' + Math.max(Date.now(), last + 1);
  }
  /** write `text` as a new `kind` copy; its key, or null when there was no room (nothing else is touched) */
  function writeCopy(kind, text) { const k = copyKey(kind); return ls.set(k, text) === true ? k : null; }
  /** delete this profile's other `kind` copies, once a newer one is safely written */
  function pruneCopies(kind, keep) { copiesOf(key, kind).forEach(x => { if (x !== keep) ls.del(x); }); }
  /** keep `text` aside as this profile's one `kind` copy: once it is written, the older copies of that kind go (P0-12). Returns its key, or null
      when there was no room (then nothing is deleted: only the learner's 'Free space' removes a copy that is not replaced). */
  function keepAside(kind, text) {
    const k = writeCopy(kind, text);
    if (k) pruneCopies(kind, k);
    return k;
  }

  /* ---------------------------------------------------------------- the document */
  function blank() {
    return {
      v: VERSION, created: Date.now(),
      profile: { name: '', examDate: null, examSet: false, goals: { questions: 15, cards: 20, minutes: 90, lessons: 1 }, theme: 'auto', sidebar: 'full', calc: true,
                 route: null, focus: null, lastExport: null },
      lessons: {},   // id -> {first, last, done, secs, visits, quiz: {k: {n, ok, last}}, at: {h, t}}   (at: the section the reader was in, P1-01)
      q: {},         // qid -> {n, ok, last, lastOk, firstOk, ms, streak, bm, note, seen, srs}   (note: the one note per question, P1-27; seen: an unkeyed check, D9)
      log: [],       // [t, qid, ok(1|0), ms, mode]  mode: p practice | t test | r revision | z lesson quiz | l lab challenge | lx lab challenge without XP (Peek, cap)
      tests: [],     // finished tests (see actions.finishTest); ids are unique
      cards: {},     // flashcard id -> srs state
      nb: {},        // error notebook: qid -> {reason, added, resolved, misses, missed (the last miss, P2-41)}   (its note is the question's one note, q[qid].note)
      act: {},       // study day 'YYYY-MM-DD' (U.today: from profile.dayStart, default 4 a.m.) -> {s: active seconds, q: questions attempted, c: cards reviewed, l: lessons completed}
      plan: null,    // the planner's day snapshot (actions.setPlan, P0-19)
      live: null,    // test in progress (see views/test.js)
      labs: {},      // labId -> {runs, ch: {n, ok, peek?}, at?: the last run or challenge (ms; /labs' 'Continue where you left off', P2-59)}
      seen: {},      // one-off UI flags (actions.setFlag: welcome card dismissed, once-per-boot milestone toasts, …)
      eng: blankEng(),   // engagement bookkeeping (core/engage.js): only the days a streak freeze covered; XP and streaks are always derived
      logArch: null      // when the log outgrows LOG_CAP its oldest rows are folded here ({n, upTo, m: {mode: {key: [answers, correct]}}}), so totals never shrink
    };
  }
  function blankEng() { return { v: 1, frozen: [] }; }
  const dayList = a => (Array.isArray(a) ? Array.from(new Set(a.filter(k => typeof k === 'string' && DAYKEY.test(k)))).sort() : []);
  /** eng.frozen: the days a streak freeze covered; eng.gate: the GATE days that bridged a streak (P2-73), kept once they have passed */
  function cleanEng(e) {
    const out = Object.assign(blankEng(), e && typeof e === 'object' && !Array.isArray(e) ? e : {});
    out.frozen = dayList(out.frozen);
    if (out.gate != null) out.gate = dayList(out.gate);
    return out;
  }

  /* ---------------------------------------------------------------- sanitize (P1-51): per-field types; malformed entries are dropped or reset.
     Lossless coercions (true -> 1, '3' -> 3) are silent; anything dropped or reset is reported in `rep` (paths), and load() keeps the raw text aside. */
  const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  const fin = x => typeof x === 'number' && isFinite(x);
  const numLike = x => (fin(x) ? x : typeof x === 'string' && /^-?\d+(\.\d+)?$/.test(x.trim()) ? +x : typeof x === 'boolean' ? +x : null);
  const DROP = {}, DEL = {};
  /** clean e[f] by its type; returns false when the value had to be reset or removed (damage) */
  function field(e, f, type, dflt) {
    if (!own(e, f)) return true;
    const v = e[f];
    let ok, out = v;
    switch (type) {
      case 'count': out = numLike(v); ok = out != null && out >= 0; break;                   // counts and time stamps
      case 'num': out = numLike(v); ok = out != null; break;
      case 'numOrNull': if (v === null) { ok = true; break; } out = numLike(v); ok = out != null; break;
      case 'bit': if (v === null) { ok = true; break; } out = v === true ? 1 : v === false ? 0 : v; ok = out === 0 || out === 1; break;
      case 'flag': out = v ? 1 : 0; ok = true; break;
      case 'str': if (typeof v === 'number') out = String(v); ok = typeof out === 'string'; break;
      case 'strOrNull': ok = v === null || typeof v === 'string'; break;
      case 'day': ok = typeof v === 'string' && DAYKEY.test(v); break;
      case 'dayOrNull': ok = v === null || (typeof v === 'string' && DAYKEY.test(v)); break;
      case 'obj': ok = isObj(v); break;
      case 'arr': ok = Array.isArray(v); break;
      case 'bool': out = !!v; ok = typeof v === 'boolean' || v === 0 || v === 1; break;
      default: ok = true;
    }
    if (ok) { if (out !== v) e[f] = out; return true; }
    if (dflt === DEL) delete e[f]; else e[f] = typeof dflt === 'function' ? dflt() : dflt;
    return false;
  }
  /** run clean(entry) over every value of map m; clean returns DROP, or false when it reset a field */
  function entries(m, path, clean, rep, keyOk) {
    for (const k of Object.keys(m)) {
      if (keyOk && !keyOk(k)) { delete m[k]; rep.push(path + '.' + k); continue; }
      const r = isObj(m[k]) ? clean(m[k]) : DROP;
      if (r === DROP) { delete m[k]; rep.push(path + '.' + k); } else if (r === false) rep.push(path + '.' + k);
    }
  }
  const all = (...oks) => oks.every(Boolean);
  const cleanSrs = c => isObj(c) && typeof c.due === 'string' && DAYKEY.test(c.due) &&
    all(field(c, 'ivl', 'count', 0), field(c, 'ease', 'num', 2.5), field(c, 'reps', 'count', 0), field(c, 'lapses', 'count', 0), field(c, 'last', 'dayOrNull', null));
  function cleanQ(e) {
    const oks = [field(e, 'n', 'count', 0), field(e, 'ok', 'count', 0), field(e, 'last', 'count', 0), field(e, 'lastOk', 'bit', null), field(e, 'firstOk', 'bit', null),
      field(e, 'ms', 'numOrNull', null), field(e, 'streak', 'count', 0), field(e, 'bm', 'flag', 0), field(e, 'note', 'str', DEL), field(e, 'seen', 'count', DEL)];
    if (own(e, 'srs') && !cleanSrs(e.srs)) { delete e.srs; oks.push(false); }
    return all(...oks);
  }
  function cleanLesson(e) {
    const oks = [field(e, 'first', 'count', 0), field(e, 'last', 'count', 0), field(e, 'secs', 'count', 0), field(e, 'visits', 'count', 0)];
    if (own(e, 'done') && !(e.done === null || e.done === true || fin(e.done))) { if (e.done === false) e.done = null; else { e.done = null; oks.push(false); } }
    if (own(e, 'quiz')) {
      if (!isObj(e.quiz)) { e.quiz = {}; oks.push(false); }
      else for (const k of Object.keys(e.quiz)) { const x = e.quiz[k]; if (!isObj(x)) { delete e.quiz[k]; oks.push(false); } else oks.push(field(x, 'n', 'count', 0), field(x, 'ok', 'count', 0), field(x, 'last', 'count', 0)); }
    }
    if (own(e, 'at') && !(isObj(e.at) && typeof e.at.h === 'string' && e.at.h && fin(e.at.t))) { delete e.at; oks.push(false); }
    return all(...oks);
  }
  const cleanCard = c => (typeof c.due === 'string' && DAYKEY.test(c.due) ? all(field(c, 'ivl', 'count', 0), field(c, 'ease', 'num', 2.5), field(c, 'reps', 'count', 0),
    field(c, 'lapses', 'count', 0), field(c, 'last', 'dayOrNull', null)) : DROP);
  const cleanNb = n => all(field(n, 'reason', 'strOrNull', null), field(n, 'note', 'str', ''), field(n, 'added', 'count', 0), field(n, 'resolved', 'numOrNull', null), field(n, 'misses', 'count', 0),
    field(n, 'missed', 'count', DEL));
  function cleanAct(a) { const oks = ['s', 'q', 'c', 'l'].map(f => field(a, f, 'count', 0)); ['s', 'q', 'c', 'l'].forEach(f => { if (!own(a, f)) a[f] = 0; }); return all(...oks); }
  function cleanLab(l) {
    const oks = [field(l, 'runs', 'count', 0), field(l, 'at', 'count', 0)];
    if (own(l, 'ch') && !isObj(l.ch)) { l.ch = { n: 0, ok: 0 }; oks.push(false); }
    if (isObj(l.ch)) oks.push(field(l.ch, 'n', 'count', 0), field(l.ch, 'ok', 'count', 0));
    return all(...oks);
  }
  const TEST_NUMS = ['started', 'score', 'max', 'attempted', 'correct', 'wrong', 'skipped', 'total', 'negative', 'ungraded', 'limitMs', 'usedMs'];
  function cleanTest(t, i) {
    const oks = TEST_NUMS.map(f => field(t, f, 'numOrNull', 0));
    oks.push(field(t, 'finished', 'count', 0));
    ['responses', 'times', 'marked', 'states', 'bySubject', 'bySection'].forEach(f => oks.push(field(t, f, 'obj', () => ({}))));
    oks.push(field(t, 'qids', 'arr', () => []));
    if (!(typeof t.id === 'string' && t.id) && !fin(t.id)) { t.id = 'test-' + ((fin(t.finished) && t.finished) || i); oks.push(false); }
    return all(...oks);
  }
  function cleanLog(row) {
    if (!Array.isArray(row) || row.length < 3 || !fin(row[0])) return false;
    if (typeof row[1] !== 'string') { if (fin(row[1])) row[1] = String(row[1]); else return false; }
    row[2] = row[2] ? 1 : 0;
    if (row.length > 3 && row[3] != null && !fin(row[3])) row[3] = null;
    if (row.length > 4 && typeof row[4] !== 'string') row[4] = 'p';
    if (row.length > 5 && row[5] !== 'h') row.length = 5;                // the only flag a row carries: 'h', answered after the Hint (P2-64)
    return true;
  }
  function cleanLive(v) {
    if (!isObj(v)) return false;
    if (!Array.isArray(v.qids) || !(typeof v.id === 'string' || fin(v.id))) return false;
    ['responses', 'visited', 'marked', 'times'].forEach(f => { if (own(v, f) && !isObj(v[f])) v[f] = {}; });
    return true;
  }
  function cleanProfile(p, b, rep) {
    const bad = f => rep.push('profile.' + f);
    if (!field(p, 'name', 'str', '')) bad('name');
    if (own(p, 'examDate') && !(typeof p.examDate === 'string' && DAYKEY.test(p.examDate))) {
      if (p.examDate !== null) bad('examDate');
      p.examDate = null; p.examSet = false;                                 // no date: GA.stats.exam counts to the exam calendar instead (P1-46)
    }
    if (own(p, 'examSet') && typeof p.examSet !== 'boolean') p.examSet = !!p.examSet;
    if (own(p, 'goals')) {
      if (!isObj(p.goals)) { bad('goals'); p.goals = Object.assign({}, b.profile.goals); }
      else for (const k of Object.keys(b.profile.goals)) if (!field(p.goals, k, 'count', b.profile.goals[k])) bad('goals.' + k);
    }
    if (own(p, 'theme') && ['auto', 'light', 'dark'].indexOf(p.theme) < 0) p.theme = 'auto';
    if (own(p, 'calc') && typeof p.calc !== 'boolean') p.calc = !!p.calc;
    ['route', 'focus'].forEach(f => { if (!field(p, f, 'strOrNull', null)) bad(f); });
    if (!field(p, 'lastExport', 'numOrNull', null)) bad('lastExport');
    // the hour a study day starts (P3-28): 0–6, absent = the default (4 a.m.)
    if (own(p, 'dayStart') && !(Number.isInteger(p.dayStart) && p.dayStart >= 0 && p.dayStart <= 6)) { if (p.dayStart != null) bad('dayStart'); delete p.dayStart; }
  }
  function sanitize(s, b, rep) {
    for (const k of ['lessons', 'q', 'cards', 'nb', 'act', 'labs', 'seen']) if (own(s, k) && !isObj(s[k])) { rep.push(k); s[k] = {}; }
    for (const k of ['log', 'tests']) if (own(s, k) && !Array.isArray(s[k])) { rep.push(k); s[k] = []; }
    if (own(s, 'plan') && s.plan != null && !isObj(s.plan)) { rep.push('plan'); s.plan = null; }
    if (own(s, 'live') && s.live != null && !cleanLive(s.live)) { rep.push('live'); s.live = null; }
    if (own(s, 'profile') && !isObj(s.profile)) { rep.push('profile'); s.profile = b.profile; }
    if (own(s, 'created') && !fin(s.created)) { rep.push('created'); s.created = Date.now(); }
    if (isObj(s.profile)) cleanProfile(s.profile, b, rep);
    if (isObj(s.q)) entries(s.q, 'q', cleanQ, rep);
    if (isObj(s.lessons)) entries(s.lessons, 'lessons', cleanLesson, rep);
    if (isObj(s.cards)) entries(s.cards, 'cards', cleanCard, rep);
    if (isObj(s.nb)) entries(s.nb, 'nb', cleanNb, rep);
    if (isObj(s.act)) entries(s.act, 'act', cleanAct, rep, k => DAYKEY.test(k));
    if (isObj(s.labs)) entries(s.labs, 'labs', cleanLab, rep);
    if (Array.isArray(s.tests)) {
      const keep = [];
      s.tests.forEach((t, i) => { if (!isObj(t)) { rep.push('tests[' + i + ']'); return; } if (!cleanTest(t, i)) rep.push('tests[' + i + ']'); keep.push(t); });
      if (keep.length !== s.tests.length) s.tests = keep;
    }
    if (Array.isArray(s.log)) {
      let bad = 0;
      const keep = s.log.filter(r => (cleanLog(r) ? true : (bad++, false)));
      if (bad) { s.log = keep; rep.push('log (' + bad + ' rows)'); }
    }
  }

  /* ---------------------------------------------------------------- migrations */
  /** a key that can never be a flashcard id: the phantom reviews of P0-02 wrote cards['undefined'] (and keys 1–4 after a finished session) */
  const junkCardKey = k => !k.trim() || /^(undefined|null|NaN|\d+)$/.test(k);
  function manifest() { try { return (g.GAD && g.GAD.manifest && g.GAD.manifest.main) || null; } catch (e) { return null; } }
  /** P3-51: when a card's text changes its id changes; manifest.cardAliases {old: new} carries the review history over (idempotent) */
  function applyAliases(cards, aliases) {
    if (!isObj(aliases)) return;
    for (const old of Object.keys(aliases)) {
      const nw = aliases[old];
      if (typeof nw !== 'string' || nw === old || !own(cards, old)) continue;
      const a = cards[old], b = cards[nw];
      cards[nw] = !b || String(a.last || '') > String(b.last || '') ? a : b;
      delete cards[old];
    }
  }
  /** join the card's note and the notebook's note into the one note (v3, once); migrate() then drops the notebook's copy */
  function joinNotes(s) {
    for (const id of Object.keys(s.nb)) {
      const n = s.nb[id], nbNote = typeof n.note === 'string' ? n.note.trim() : '';
      const e = s.q[id], qNote = e && typeof e.note === 'string' ? e.note.trim() : '';
      if (!nbNote) { if (qNote) n.note = e.note; continue; }
      const joined = !qNote ? n.note : qNote === nbNote ? e.note : e.note.replace(/\s+$/, '') + '\n\n' + n.note.replace(/^\s+/, '');
      (s.q[id] = e || { n: 0, ok: 0, last: 0, lastOk: null, firstOk: null, ms: null, streak: 0, bm: 0 }).note = joined;
      n.note = joined;
    }
  }

  /** bring any stored document up to this version: fill what is missing, check every type, apply the version steps. `rep` collects damage. */
  function migrate(s, rep, opts) {
    rep = rep || [];
    opts = opts || {};
    if (!isObj(s)) { rep.push('(root)'); return blank(); }
    const b = blank(), from = fin(s.v) ? s.v : 1;
    sanitize(s, b, rep);
    for (const k in b) if (!(k in s)) s[k] = b[k];
    if (!isObj(s.profile)) s.profile = b.profile;
    // v2 -> v3: the untouched default date counts as unset (P1-46); decided before the defaults below fill in examSet: false
    if (typeof s.profile.examSet !== 'boolean') s.profile.examSet = typeof s.profile.examDate === 'string' && DAYKEY.test(s.profile.examDate) && s.profile.examDate !== LEGACY_EXAM;
    for (const k in b.profile) if (!(k in s.profile)) s.profile[k] = b.profile[k];
    // the untouched old default is not a date the learner chose: unset profiles store no date (P1-46; every reader goes through GA.stats.exam)
    if (s.profile.examSet !== true && s.profile.examDate === LEGACY_EXAM) s.profile.examDate = null;
    if (!isObj(s.profile.goals)) s.profile.goals = b.profile.goals;
    for (const k in b.profile.goals) if (!(k in s.profile.goals)) s.profile.goals[k] = b.profile.goals[k];
    // v1 -> v2: state.eng and state.logArch are new (filled in empty above); eng is re-validated on every load and import
    if (!isObj(s.eng) || !Array.isArray(s.eng.frozen)) rep.push('eng');
    s.eng = cleanEng(s.eng);
    if (s.logArch != null && !(isObj(s.logArch) && isObj(s.logArch.m))) { rep.push('logArch'); s.logArch = null; }
    // v2 -> v3
    if (from < 3) joinNotes(s);
    // the notebook reads the one note (q[id].note, WP11), so its old mirror goes: a note deleted on the card stays deleted (P1-27)
    for (const id of Object.keys(s.nb)) if (own(s.nb[id], 'note')) delete s.nb[id].note;
    // every load (idempotent clean-ups of known bugs, P0-02; card-id aliases, P3-51)
    for (const k of Object.keys(s.cards)) if (junkCardKey(k)) delete s.cards[k];
    const ids = new Set();
    if (s.tests.some(t => ids.has(t.id) || !ids.add(t.id))) { const seen = new Set(); s.tests = s.tests.filter(t => !seen.has(t.id) && seen.add(t.id)); }
    const M = manifest();
    applyAliases(s.cards, opts.aliases !== undefined ? opts.aliases : M && M.cardAliases);
    s.v = VERSION;
    return s;
  }
  /** keep the newest LOG_CAP rows; fold the older ones into state.logArch per mode and key, so totals derived from the log never go down */
  function trimLog(s) {
    const cut = s.log.length - LOG_CAP;
    if (cut <= 0) return;
    const A = (s.logArch = s.logArch && typeof s.logArch === 'object' ? s.logArch : { n: 0, upTo: 0, m: {} });
    A.m = A.m || {};
    for (let i = 0; i < cut; i++) {
      const r = s.log[i]; if (!r) continue;
      const mode = (r[4] || 'p') + (r[5] === 'h' && (r[4] === 'p' || r[4] === 'r' || !r[4]) ? 'h' : '');   // a hinted practice answer keeps its own fold (P2-64)
      const mm = (A.m[mode] = A.m[mode] || {}), e = (mm[r[1]] = mm[r[1]] || [0, 0]);
      e[0]++; if (r[2]) e[1]++;
      if (r[0] > (A.upTo || 0)) A.upTo = r[0];
    }
    A.n = (A.n || 0) + cut;
    s.log = s.log.slice(cut);
  }

  /* ---------------------------------------------------------------- events (sticky until the first subscriber for the boot-time ones) */
  const subs = {}, pending = {}, STICKY = { corrupt: 1, repaired: 1, error: 1 };
  function emit(ev, ...a) {
    const list = (subs[ev] || []).slice();
    if (!list.length) { if (STICKY[ev]) pending[ev] = a; return; }
    list.forEach(f => { try { f(...a); } catch (err) { if (typeof console !== 'undefined') console.error(err); } });
  }
  function on(ev, f) {
    (subs[ev] = subs[ev] || []).push(f);
    if (pending[ev]) { const a = pending[ev]; delete pending[ev]; try { f(...a); } catch (err) { if (typeof console !== 'undefined') console.error(err); } }
    return () => { subs[ev] = (subs[ev] || []).filter(x => x !== f); };
  }

  /* ---------------------------------------------------------------- load and save */
  let key = PREFIX + 'main', state = blank(), timer = null, timerAt = 0, profile = 'main';
  let dirty = false, saveError = null, held = null, bootRaw = null, issue = null, lastWrite = 0, hiding = false, metaTheme = null, persisted = null;

  /* Stored text is never destroyed before it is safe (P1-51): text that cannot be read, or that had to be repaired, is first kept aside as the
     ':corrupt-' copy. With no room for that copy the text is held: the stored key is left as it is, nothing overwrites it (flush() fails with
     kind 'held' and the banner offers 'Download my saved data') until Free space makes room for the copy. issue.held says which case it is. */
  function load() {
    held = null; bootRaw = null; issue = null;
    const raw = ls.get(key);
    if (raw == null) return blank();
    let d = null, err = null;
    try { d = JSON.parse(raw); } catch (e) { err = e; }
    if (!err && !isObj(d)) err = new Error('The saved progress is not a PassBook document');
    if (err) {                                                     // never destroy what we could not read: keep it aside (or hold it) before starting fresh
      bootRaw = raw;
      const copy = keepAside('corrupt', raw);
      if (!copy) held = raw;
      issue = { kind: 'corrupt', key: copy, held: !copy, at: Date.now(), error: err };
      emit('corrupt', err, issue);
      return blank();
    }
    const rep = [], s = migrate(d, rep);
    if (rep.length) {                                              // malformed entries were dropped: the raw text goes aside first, or is held
      bootRaw = raw;
      const copy = keepAside('corrupt', raw);
      if (!copy) held = raw;
      issue = { kind: 'repaired', key: copy, held: !copy, at: Date.now(), count: rep.length, paths: rep.slice(0, 40) };
      emit('repaired', issue);
    }
    return s;
  }
  const heldError = () => storeError('held', issue && issue.kind === 'repaired' ? MSG.heldRepaired : MSG.held);
  function fail(e, chars) {
    e.at = Date.now(); if (chars != null) e.chars = chars;
    saveError = e;
    emit('error', e);
    return false;
  }
  /** the tiny '<profile>:theme' key: the boot script can paint the right theme without parsing the whole progress document (P3-34) */
  function writeMeta() {
    const t = state && state.profile && state.profile.theme, v = t === 'light' || t === 'dark' ? t : 'auto';
    if (v !== metaTheme && ls.set(key + ':theme', v) === true) metaTheme = v;
  }
  /** write the state now; true when it is on disk, false when the browser refused (saveError says why) */
  function flush() {
    clearTimeout(timer); timer = null;
    if (held != null) {                                            // text we could not keep aside: try again (Free space may have made room)
      const copy = keepAside('corrupt', held);
      if (!copy) return fail(heldError());
      held = null; if (issue) { issue.key = copy; issue.held = false; }
    }
    if (Array.isArray(state.log) && state.log.length > LOG_CAP) trimLog(state);
    let text;
    try { text = JSON.stringify(state); } catch (e) { return fail(storeError('write', 'Progress could not be written', e)); }
    const r = ls.set(key, text);
    if (r !== true) return fail(r, text.length);
    dirty = false; lastWrite = Date.now();
    writeMeta();
    const was = saveError; saveError = null;
    emit('saved', { recovered: !!was, chars: text.length });
    return true;
  }
  /** a write due within `ms` (an earlier one already due stands) */
  function schedule(ms) {
    const at = Date.now() + ms;
    if (timer && timerAt <= at) return;
    clearTimeout(timer); timerAt = at; timer = setTimeout(flush, ms);
  }
  /** the ':before-import' copies older than UNDO_DAYS are no longer offered for 'Undo last import': they go at boot (P2-75) */
  function dropOldImports() {
    copiesOf(key, 'before-import').forEach(k => { if (Date.now() - stamp(k) > UNDO_DAYS * 864e5) ls.del(k); });
  }

  const Store = {
    VERSION, LEGACY_EXAM, MSG,
    init(opts) {
      profile = (opts && opts.profile) || 'main';
      key = PREFIX + profile;
      clearTimeout(timer); timer = null; dirty = false; saveError = null; lastWrite = 0;
      for (const k in pending) delete pending[k];
      state = load();
      metaTheme = ls.get(key + ':theme');
      if (issue) { if (held != null) fail(heldError()); else flush(); }   // the repaired or fresh state replaces what is now kept aside (never held text)
      else writeMeta();
      dropOldImports();
      emit('ready', profile);       // boot hooks (actions.js runs the streak-freeze tick here, before anything renders)
      return state;
    },
    get profile() { return profile; },
    get state() { return state; },
    get key() { return key; },
    /** the Error of the last failed write (.kind 'quota' | 'blocked' | 'write' | 'held'), null once a write succeeds */
    get saveError() { return saveError; },
    /** what went wrong while loading this session: {kind: 'corrupt' | 'repaired', key (the kept-aside copy, null while held), held (true while
        the stored text could not be kept aside and so is not overwritten), at, count, paths} or null */
    get issue() { return issue; },
    /** mutate state inside fn(state); saves shortly after and notifies subscribers. Time on task (tag 'time') saves at most once a minute, any
        other change within 250 ms and carries it along (P3-34); while the page is being hidden every change is written at once (P3-38). */
    update(fn, tag) {
      fn(state);
      dirty = true;
      if (hiding) flush();
      else schedule(tag === 'time' ? Math.max(250, LAZY_MS - (Date.now() - lastWrite)) : 250);
      emit('change', tag || '*');
    },
    flushNow: flush,
    on, emit,
    /** start over with a blank profile. opts.keep (the boot recovery card's 'Start fresh, data kept aside', P1-51): the stored text is first kept
        aside as the ':corrupt-' copy; returns its key (null when nothing was stored) and throws (code 'no-room', nothing changed) when it cannot be kept. */
    reset(opts) {
      let kept = null;
      if (opts && opts.keep) {
        const raw = held != null ? held : ls.get(key);
        if (raw != null) { kept = keepAside('corrupt', raw); if (!kept) { const e = new Error(MSG.noRoomKeep); e.code = 'no-room'; throw e; } }
      }
      held = null; bootRaw = null; issue = null; state = blank(); flush(); emit('change', 'reset');
      return kept;
    },
    /** the backup file's text: compact JSON (P2-75; a phone shares it as a .txt) */
    exportJSON() { return JSON.stringify({ app: 'passbook', exported: new Date().toISOString(), profile, state }); },
    /** replace this profile with a backup file's state. Validates first (a demo backup is refused outside the demo profile); keeps the current
        progress aside as a new ':before-import-' copy (opts.noCopy skips it after the learner agreed); writes the import before anything changes in
        memory, and only then deletes the earlier import's copy. On any failure nothing has changed, the earlier copy included. Returns {repaired,
        paths, copy}; throws (code 'no-room' | 'demo') otherwise. */
    importJSON(file, opts) {
      opts = opts || {};
      let d = null;
      try { d = JSON.parse(file); } catch (e) { d = null; }
      if (!isObj(d) || d.app !== 'passbook' || !isObj(d.state)) throw new Error(MSG.notBackup);
      if (d.profile === 'demo' && profile !== 'demo') { const e = new Error(MSG.demoBackup); e.code = 'demo'; throw e; }
      const rep = [], next = migrate(d.state, rep);
      if (Array.isArray(next.log) && next.log.length > LOG_CAP) trimLog(next);
      const noRoom = msg => { const e = new Error(msg); e.code = 'no-room'; return e; };
      let copy = null;
      if (!opts.noCopy) {
        copy = writeCopy('before-import', held != null ? held : JSON.stringify(state));   // held: the stored text that could not be read is what is kept
        if (!copy) throw noRoom(MSG.noRoomCopy);
      }
      const text = JSON.stringify(next);
      let r = ls.set(key, text);
      if (r !== true && copy) {
        // no room for the backup: the earlier import's copy may be what is in the way. Free it and try once more; when even that fails, put it back
        const older = copiesOf(key, 'before-import').filter(k => k !== copy).map(k => [k, ls.get(k)]).filter(x => x[1] != null);
        if (older.length) {
          older.forEach(([k]) => ls.del(k));
          r = ls.set(key, text);
          if (r !== true) { ls.del(copy); copy = null; older.forEach(([k, v]) => ls.set(k, v)); }
        }
      }
      if (r !== true) { if (copy) ls.del(copy); throw noRoom(MSG.noRoomImport); }   // nothing changed: the stored and the live progress are still the old ones
      if (copy) pruneCopies('before-import', copy);
      clearTimeout(timer); timer = null; dirty = false; held = null; bootRaw = null; issue = null; lastWrite = Date.now();
      state = next;
      writeMeta();
      const was = saveError; saveError = null;
      emit('saved', { recovered: !!was, chars: text.length });
      emit('change', 'import');
      return { repaired: rep.length, paths: rep.slice(0, 40), copy };
    },
    /** the stored JSON text of this profile, even when it could not be parsed ('Download my saved data') */
    rawText() { return bootRaw != null ? bootRaw : ls.get(key) || JSON.stringify(state); },
    /** the newest ':before-import' copy younger than UNDO_DAYS: {key, at} | null (P2-75 'Undo last import') */
    lastImport() {
      const c = copiesOf(key, 'before-import'), k = c[c.length - 1];
      if (!k) return null;
      const at = stamp(k);
      return Date.now() - at <= UNDO_DAYS * 864e5 ? { key: k, at } : null;
    },
    /** put the last import's kept-aside copy back (the imported progress becomes the kept-aside copy, so the undo can be undone); reloads the page
        unless opts.reload === false. Returns false when there is nothing to undo or it could not be written. */
    undoImport(opts) {
      const li = Store.lastImport(); if (!li) return false;
      const text = ls.get(li.key); if (text == null) return false;
      const cur = held != null ? held : JSON.stringify(state), swap = copyKey('before-import');
      let kept = ls.set(swap, cur) === true;
      let ok = ls.set(key, text) === true;
      if (!ok && kept) { ls.del(swap); kept = false; ok = ls.set(key, text) === true; }    // the swap copy may be what is in the way
      if (!ok) { if (kept) ls.del(swap); return false; }                                  // no room: nothing changed
      copiesOf(key, 'before-import').forEach(x => { if (x !== swap) ls.del(x); });
      if (!kept) ls.set(swap, cur);                     // the undone copy's room now holds the imported progress, so the undo can be undone too
      clearTimeout(timer); timer = null; dirty = false; lastWrite = Date.now();
      state = load();
      writeMeta();
      const was = saveError; saveError = null;
      emit('saved', { recovered: !!was, chars: text.length });
      emit('change', 'import');
      if (!(opts && opts.reload === false) && typeof location !== 'undefined' && location && typeof location.reload === 'function') location.reload();
      return true;
    },
    /** this app's keys and their sizes, from string lengths (never navigator.storage.estimate()): {chars, keys: [{key, chars, kind, live}], all, quota}.
        `all` counts every key in this storage (on file:// other local pages share it); quota is the usual limit, about 5.2 M characters. The tiny
        theme keys are not listed: they are mirrors, not spare copies. */
    usage() {
      let mine = 0, every = 0;
      const keys = [];
      ls.keys().forEach(k => {
        const v = ls.get(k), n = k.length + (v ? v.length : 0);
        every += n;
        const kind = kindOf(k); if (!kind || kind === 'meta') return;
        mine += n;
        keys.push({ key: k, chars: n, kind, live: k === key, at: kind === 'before-import' || kind === 'corrupt' ? stamp(k) : null });
      });
      keys.sort((a, b) => (b.live - a.live) || b.chars - a.chars);
      return { chars: mine, keys, all: every, quota: QUOTA };
    },
    /** ask the browser to keep this site's storage (P2-49): navigator.storage.persist() on http(s), only where the browser decides silently
        (Chromium, Safari); Firefox desktop shows a prompt, so there only with opts.ask (the learner's 'Keep my progress safe' button).
        → Promise of true | false | null (null on file:// or when the browser cannot say); the answer stays in GA.store.persisted. */
    persist(opts) {
      const N = typeof navigator !== 'undefined' ? navigator : null, SM = N && N.storage;
      const web = typeof location !== 'undefined' && !!location && /^https?:$/.test(location.protocol);
      if (!web || !SM || typeof SM.persist !== 'function') return Promise.resolve((persisted = null));
      const prompts = /Firefox\//.test(N.userAgent || '') && !/Android|Mobile/.test(N.userAgent || '');
      const now = typeof SM.persisted === 'function' ? Promise.resolve().then(() => SM.persisted()).catch(() => null) : Promise.resolve(null);
      return now.then(p => {
        if (p === true) return (persisted = true);
        if (prompts && !(opts && opts.ask)) return (persisted = p === false ? false : null);
        return Promise.resolve().then(() => SM.persist()).then(v => (persisted = v === true), () => (persisted = p === false ? false : null));
      });
    },
    /** the last answer of persist(): true (protected), false (the browser may clear it under storage pressure), null (unknown, or file://) */
    get persisted() { return persisted; },
    /** the stored text of one of this app's keys (to offer a download before 'Free space' deletes it); null for other pages' keys */
    keyText(k) { return kindOf(k) ? ls.get(k) : null; },
    /** delete spare keys of this app ('Free space'); never the live profile key. Returns the keys deleted; retries a failed save afterwards. */
    dropKeys(list) {
      const out = [];
      (Array.isArray(list) ? list : [list]).forEach(k => { if (kindOf(k) && k !== key && ls.get(k) != null) { ls.del(k); out.push(k); } });
      if (out.length && (saveError || held != null || dirty)) flush();
      return out;
    },
    /** reload from storage (another tab wrote it) */
    reload() { state = load(); emit('change', 'external'); },
    LOG_CAP, _blank: blank, _migrate: migrate, _trimLog: trimLog, _kindOf: kindOf,
    /** tests: ms until the pending write (null when none is due) */
    _due: () => (timer ? Math.max(0, timerAt - Date.now()) : null),
    /** tests: the page-hide handler (true), and its end (false) */
    _hide: on => { if (on) hidePage(); else hiding = false; }
  };
  /** the page is being hidden: write what is pending, and every change made while the hide event is still being handled */
  function hidePage() { hiding = true; if (dirty) flush(); setTimeout(() => { hiding = false; }, 0); }

  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('storage', e => { if (e.key === key) Store.reload(); });
    /* hiding the page (P3-38): pending changes are written now, and so is every change made while the hide event is still being handled, whatever
       the order of the listeners (the time tracker adds its last seconds from its own 'pagehide' handler, which may run after this one) */
    window.addEventListener('pagehide', hidePage);
    window.addEventListener('pageshow', () => { hiding = false; });
    document.addEventListener('visibilitychange', () => { if (document.hidden) hidePage(); else hiding = false; });
  }

  GA.store = Store;
  if (typeof module !== 'undefined' && module.exports) module.exports = Store;
})(typeof window !== 'undefined' ? window : globalThis);
