/* PassBook — shared helpers. Classic script (file:// safe). Also loadable from Node for tests: require() returns the same object. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = {};

  /* ---- DOM ---- */
  U.$ = (s, r) => (r || document).querySelector(s);
  U.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  U.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC[c]);
  U.attr = U.esc;
  /** tiny hyperscript: h('div.card#id', {onclick}, child, 'text') */
  U.h = function (sel, props, ...kids) {
    const m = /^([a-z0-9-]*)((?:[.#][\w-]+)*)$/i.exec(sel);
    const el = document.createElement(m[1] || 'div');
    (m[2].match(/[.#][\w-]+/g) || []).forEach(t => (t[0] === '#' ? (el.id = t.slice(1)) : el.classList.add(t.slice(1))));
    if (props && (typeof props !== 'object' || props.nodeType || Array.isArray(props))) { kids.unshift(props); props = null; }
    for (const k in props || {}) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className += ' ' + v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'html') el.innerHTML = v;
      else if (k in el && k !== 'list') el[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat(9).forEach(c => c != null && c !== false && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };
  /** delegated event: U.on(root, 'click', '[data-act]', (e, el) => ...) */
  U.on = (root, type, sel, fn) =>
    root.addEventListener(type, e => {
      const t = e.target.closest ? e.target.closest(sel) : null;
      if (t && root.contains(t)) fn(e, t);
    });

  /* ---- numbers / text ---- */
  U.clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  U.nf = n => Number(n).toLocaleString('en-IN');                          // Indian grouping: 1,00,000 (CA convention)
  /** rupees with Indian grouping and at most two decimals: inr(1250000) -> '₹12,50,000', inr(-40.5) -> '−₹40.5' */
  U.inr = n => { const x = Number(n); if (!isFinite(x)) return '₹—'; const a = Math.abs(Math.round(x * 100) / 100); return (x < 0 ? '−' : '') + '₹' + a.toLocaleString('en-IN', { maximumFractionDigits: 2 }); };
  U.pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  U.round = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
  U.mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
  U.sum = a => a.reduce((s, x) => s + x, 0);
  U.slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  U.cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
  U.plural = (n, w, pl) => `${U.nf(n)} ${n === 1 ? w : pl || w + 's'}`;
  /** a medium-length subject name for kickers and narrow tiles ('Programming & DS', 'CO & Architecture'); names of 18 characters or fewer pass through */
  // the medium names CA students use for the Group II papers (the syllabus `short` names), then the engine's older rules
  const MED = [[/^Cost and Management Accounting$/, 'Costing'], [/^Auditing and Ethics$/, 'Audit'], [/^Financial Management$/, 'FM'], [/^Strategic Management$/, 'SM'],
    [/\bData Structures\b/, 'DS'], [/^Computer Organization\b/, 'CO'], [/\bMathematics\b/, 'Maths'], [/\bStatistics\b/, 'Stats']];
  U.medName = name => { let m = String(name == null ? '' : name); if (m.length <= 18) return m; MED.forEach(([re, r]) => (m = m.replace(re, r))); return m; };
  U.dur = min => (min <= 0 ? '0 min' : min < 1 ? '<1 min' : min < 90 ? Math.round(min) + ' min' : (min / 60).toFixed(min >= 600 ? 0 : 1) + ' h');
  /** minutes as '45 min', '1 h', '10 h 40 min': the one hours-and-minutes format for time studied (P3-27) */
  U.hm = min => { min = Math.max(0, Math.round(+min || 0)); if (min < 60) return min + ' min'; const h = Math.floor(min / 60), m = min % 60; return h + ' h' + (m ? ' ' + m + ' min' : ''); };
  U.clock = ms => { const s = Math.max(0, Math.round(ms / 1000)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(ss).padStart(2, '0'); };
  /** marks: whole numbers bare, else two decimals at most ('43.67', '0.5'); a negative score with a true minus sign, U+2212 ('−1.67', P3-27) */
  U.fmtMarks = x => {
    const s = Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : (Math.round(x * 100) / 100).toFixed(2).replace(/0$/, '');
    return s === '-0' ? '0' : s.replace(/^-/, '−');
  };
  /** a share of the marks as a whole percent, the same everywhere a score is a percentage ('44%' for 43.67 of 100; '−3%'; '—' without a max) */
  U.pctMarks = (score, max) => {
    if (!(typeof max === 'number' && max > 0) || !(typeof score === 'number' && isFinite(score))) return '—';
    const p = Math.round((100 * score) / max);
    return (p < 0 ? '−' + -p : String(p === 0 ? 0 : p)) + '%';
  };

  /* ---- dates (all local-time day keys: 'YYYY-MM-DD') ----
     The study day (P3-28): an event belongs to the day it was studied in, which starts at profile.dayStart o'clock (default 4 a.m.), so a session
     from 23:30 to 00:40 is one day. U.today(), U.dayOf(t) and U.dayKey(t) for a time stamp apply it, and U.parseDay(k) is that day's start, so
     every [parseDay(k), parseDay(k + 1)) window and U.dayBounds(k) cover one study day; day arithmetic (addDays, daysBetween, fmtDay) is unchanged.
     U.dayKey(date) of a Date object is that Date's calendar day (a Date built for a calendar day, at midnight or noon, gives that day back);
     U.fmtWhen shows the calendar date beside the clock time. */
  const p2 = n => String(n).padStart(2, '0');
  const DAY_START = 4;
  /** the hour a study day starts (0–6): a test override, else the live profile's dayStart, else 4 */
  U.dayStart = () => {
    if (U._dayStart != null) return U._dayStart;
    try {
      const S = GA.store, p = S && S.state && S.state.profile, h = p && p.dayStart;
      if (Number.isInteger(h) && h >= 0 && h <= 6) return h;
    } catch (e) { /* no store yet */ }
    return DAY_START;
  };
  const calKey = d => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
  /** the day key of a time stamp t (ms; default now): the study day it belongs to, = U.dayOf(t), so every module that dates an event agrees with
      U.today() between midnight and dayStart (P3-28). A Date object gives its calendar day. */
  U.dayKey = t => {
    if (t instanceof Date) return calKey(t);
    const k = U.dayOf(t == null ? Date.now() : t);
    return k || calKey(new Date(t));                     // an unreadable stamp keeps its old 'NaN-NaN-NaN' key rather than null
  };
  U.parseDay = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, U.dayStart()); };
  U.addDays = (k, n) => { const [y, m, d] = k.split('-').map(Number), x = new Date(y, m - 1, d, 12); x.setDate(x.getDate() + n); return calKey(x); };
  U.daysBetween = (a, b) => Math.round((U.parseDay(b) - U.parseDay(a)) / 864e5);
  /** the study day a time stamp belongs to (before dayStart o'clock it is still the day before) */
  U.dayOf = t => {
    const d = t instanceof Date ? t : new Date(t == null ? Date.now() : t);
    if (isNaN(d)) return null;
    if (d.getHours() >= U.dayStart()) return calKey(d);
    return calKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1, 12));
  };
  /** [start, end) in ms of study day k */
  U.dayBounds = k => [U.parseDay(k).getTime(), U.parseDay(U.addDays(k, 1)).getTime()];
  U.today = () => U.dayOf(Date.now());
  /* one fixed set of month and weekday names, so a date reads the same on every screen and browser ('Sep', never 'Sept'; P3-27) */
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], WDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  U.MONTHS = MONTH.slice(); U.MON = MON.slice();
  const DATE_OPTS = { weekday: 1, day: 1, month: 1, year: 1 };
  /** a day key as text: options as for toLocaleDateString (weekday, day, month: 'short' | 'long', year), e.g. '6 Feb 2027', 'Sat 6 Feb', 'February 2027' */
  U.fmtDay = (k, o) => {
    o = o || { day: 'numeric', month: 'short', year: 'numeric' };
    const [y, m, d] = String(k).split('-').map(Number);
    if (!y || !m || !d || Object.keys(o).some(x => !DATE_OPTS[x]) || (o.month && o.month !== 'short' && o.month !== 'long')) return U.parseDay(k).toLocaleDateString('en-GB', o);
    const parts = [];
    if (o.day) parts.push(String(d));
    if (o.month) parts.push((o.month === 'long' ? MONTH : MON)[m - 1]);
    if (o.year) parts.push(String(y));
    if (o.weekday) { const w = new Date(y, m - 1, d, 12).getDay(); parts.unshift((o.weekday === 'long' ? WDAY : WD)[w]); }
    return parts.join(' ');
  };
  /** a time stamp as '12 Oct 2026, 12:45' (o.year false: '12 Oct, 12:45'): calendar date and 24-hour clock */
  U.fmtWhen = (t, o) => {
    const d = new Date(t); if (isNaN(d)) return '';
    return U.fmtDay(calKey(d), o && o.year === false ? { day: 'numeric', month: 'short' } : undefined) + ', ' + p2(d.getHours()) + ':' + p2(d.getMinutes());
  };
  /** the one countdown line, from a GA.stats.exam() result E = {date, label, daysLeft} (P1-46):
      'GATE 2027 is today' | 'GATE 2027 is tomorrow' | '12 days to GATE 2027' | 'GATE 2027 was on 6 Feb' | '' (no date). Callers add the assumed note. */
  U.untilExam = E => {
    if (!E || typeof E.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(E.date)) return '';
    const n = typeof E.daysLeft === 'number' && isFinite(E.daysLeft) ? Math.round(E.daysLeft) : U.daysBetween(U.today(), E.date);
    const label = E.paper && E.paper.name && n >= 0 ? String(E.paper.name) : E.label ? String(E.label) : 'your exam';   // '12 days to Paper 4'
    if (n === 0) return U.cap(label) + ' is today';
    if (n === 1) return U.cap(label) + ' is tomorrow';
    if (n > 1) return U.nf(n) + ' days to ' + label;
    const yr = label.indexOf(E.date.slice(0, 4)) >= 0;            // 'CA Inter January 2027 was on 12 Jan', but 'Your exam was on 12 Jan 2027'
    return U.cap(label) + ' was on ' + U.fmtDay(E.date, yr ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
  };
  U.ago = (t, now = Date.now()) => {
    const s = Math.round((now - t) / 1000);
    if (s < 45) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    const d = Math.round(s / 86400);
    return d === 1 ? 'yesterday' : d < 45 ? d + ' days ago' : Math.round(d / 30) + ' months ago';
  };

  /* ---- randomness (seeded, deterministic) ---- */
  U.rng = seed => { let a = seed >>> 0 || 1; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  U.shuffle = (arr, rnd = Math.random) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.pick = (arr, rnd = Math.random) => arr[Math.floor(rnd() * arr.length)];
  U.hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

  /* ---- functions ---- */
  U.debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  U.throttle = (fn, ms) => { let last = 0, t; return (...a) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...a); } else { clearTimeout(t); t = setTimeout(() => { last = Date.now(); fn(...a); }, ms - (now - last)); } }; };
  U.uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  U.emitter = () => { const m = {}; return { on(e, f) { (m[e] = m[e] || []).push(f); return () => (m[e] = m[e].filter(x => x !== f)); }, emit(e, ...a) { (m[e] || []).slice().forEach(f => f(...a)); } }; };

  /* ---- script loading (works from file://) ---- */
  /** the build's content stamp for a project file (P1-58): manifest.files[path] (sha8), else manifest.ver; null before build.py writes them */
  U.verOf = src => {
    try {
      const M = g.GAD && g.GAD.manifest && g.GAD.manifest.main;
      if (!M || (!M.files && !M.ver)) return null;
      const p = String(src).replace(/^\.\//, '');
      return (M.files && M.files[p]) || M.ver || null;
    } catch (e) { return null; }
  };
  /** src with '?v=<stamp>' when the build stamped it, so a hosted copy never mixes an old cached file with new data (harmless on file://) */
  U.verUrl = src => { const v = U.verOf(src); return v && !/[?#]/.test(String(src)) ? src + '?v=' + encodeURIComponent(v) : src; };
  const loaded = {};
  U.loadScript = src => {
    if (typeof document === 'undefined') return Promise.resolve();
    if (loaded[src]) return loaded[src];
    return (loaded[src] = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = U.verUrl(src); s.async = true;
      s.onload = () => res();
      // forget a failed source (and drop its element), so a retry really requests the file again; the Error names the file (P1-59)
      s.onerror = () => { delete loaded[src]; s.remove(); const e = new Error('Failed to load ' + src); e.file = src; rej(e); };
      document.head.appendChild(s);
    }));
  };

  /* ---- misc ---- */
  U.groupBy = (arr, f) => arr.reduce((m, x) => { (m[f(x)] = m[f(x)] || []).push(x); return m; }, {});
  U.countBy = (arr, f) => arr.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});
  U.uniq = a => Array.from(new Set(a));
  U.copy = o => JSON.parse(JSON.stringify(o));
  U.hsl = (h, s, l, a) => `hsl(${h} ${s}% ${l}%${a != null ? ' / ' + a : ''})`;

  GA.util = U;
  if (typeof module !== 'undefined' && module.exports) module.exports = U;
})(typeof window !== 'undefined' ? window : globalThis);
