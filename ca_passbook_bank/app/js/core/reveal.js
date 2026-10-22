/* PassBook — scroll effects shared by every page: .reveal fade-ins, [data-count] count-ups, lazy initialisation of heavy visuals, and a floating tooltip
   for [data-ftip] (works on SVG elements too). Everything uses IntersectionObserver and respects prefers-reduced-motion. Classic script (file:// safe);
   the pure number helpers also load in Node for tests.

     GA.reveal.scan(root)             observe .reveal / [data-count] inside root now (the shell already does this for every view, via auto())
     GA.reveal.auto(root)             keep scanning root as views render into it (MutationObserver, batched; only the subtrees that were added, P2-56)
     GA.reveal.whenVisible(el, fn, o) call fn(el) once, when el comes within o.margin (px number or CSS length, default 250px) of the viewport; returns a cancel function
     GA.reveal.count(el, text?)       animate el's number from 0 to text (default: el.dataset.count || el.textContent); final text is set verbatim
     GA.reveal.tip.show(x, y, text) / .open(el, pin) / .hide()   programmatic floating tooltip (text: "Title\nline\nline", first line bold)
     [data-ftip] opens on hover, focus and tap (a tap pins it until an outside tap, a scroll or Escape; P1-55); GA.ui.infoTip builds the trigger
     GA.reveal.reduced()              true when the learner asked for reduced motion
   Markup: <div class="reveal">, <div class="stagger"> (children .reveal get --i = index for a cascade), <b data-count="1,985">1,985</b>, <rect data-ftip="2019\n9 marks">. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const hasDOM = typeof document !== 'undefined' && typeof g.addEventListener === 'function';

  /* ---------- pure helpers (Node-tested) ---------- */
  /** "1,985" -> {prefix:'', value:1985, decimals:0, grouped:true, suffix:''}; "60%" / "~4.5 h" work too; null when the text holds no number */
  function parseCount(text) {
    const m = /^([^\d-]*?)(-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)([\s\S]*)$/.exec(String(text == null ? '' : text).trim());
    if (!m) return null;
    const raw = m[2];
    return { prefix: m[1], value: parseFloat(raw.replace(/,/g, '')), decimals: (raw.split('.')[1] || '').length, grouped: raw.indexOf(',') >= 0, suffix: m[3] };
  }
  /** format v the way the parsed target was written (same decimals, same grouping, same prefix/suffix) */
  function formatCount(p, v) {
    let s = Math.abs(v).toFixed(p.decimals);
    if (p.grouped) { const parts = s.split('.'); s = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : ''); }
    return p.prefix + (v < 0 && Number(s.replace(/,/g, '')) !== 0 ? '-' : '') + s + p.suffix;
  }
  /** value shown at progress t (0..1) with an ease-out curve; integers stay integers */
  function countAt(p, t) {
    const e = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
    const v = p.value * e;
    return p.decimals ? v : Math.round(v);
  }

  /** IntersectionObserver rootMargin from a number (px) or a CSS length list ("250px", "10% 0px"); anything else -> 250px */
  function marginOf(m) {
    if (typeof m === 'number' && isFinite(m)) return Math.round(m) + 'px';
    if (typeof m === 'string' && /^\s*-?\d+(\.\d+)?(px|%)(\s+-?\d+(\.\d+)?(px|%)){0,3}\s*$/.test(m)) return m.trim();
    if (typeof m === 'string' && /^\s*-?\d+(\.\d+)?\s*$/.test(m)) return Math.round(parseFloat(m)) + 'px';
    return '250px';
  }

  const R = { parseCount, formatCount, countAt, marginOf };
  R.reduced = () => !!(hasDOM && g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (hasDOM) {
    const canIO = typeof g.IntersectionObserver === 'function';
    const done = new WeakSet();
    /* Safety net: IntersectionObserver / rAF do not run in every context (background iframes, some headless captures). Anything still pending
       is checked by geometry a moment after it is registered and on scroll/resize, so content can never stay hidden. */
    const pending = new Map();           // element -> callback(el)
    const drops = new Map();             // element -> stop observing it (so a view that is gone is not kept alive by an observer or by this map)
    const near = (el, m) => { const r = el.getBoundingClientRect(); return r.bottom >= -m && r.top <= innerHeight + m && (r.width || r.height); };
    const forget = el => { pending.delete(el); const d = drops.get(el); drops.delete(el); if (d) d(); };
    /** drop every element that has left the document (called on each scan, i.e. whenever a view renders, and on every sweep) */
    const prune = () => { pending.forEach((fn, el) => { if (!el.isConnected) forget(el); }); };
    /** every pending box is read first, then the ones near the screen are shown (no read-write-read layout thrash, P2-56) */
    const sweep = () => {
      prune();
      const due = [];
      pending.forEach((fn, el) => { if (near(el, 120)) due.push([el, fn]); });
      due.forEach(([el, fn]) => { forget(el); fn(el); });
    };
    let sweepT = null;
    const soon = () => { clearTimeout(sweepT); sweepT = setTimeout(sweep, 900); };
    addEventListener('scroll', () => { if (pending.size) soon(); }, { passive: true, capture: true });
    addEventListener('resize', () => { if (pending.size) soon(); }, { passive: true });

    R.count = function (el, text) {
      const target = text != null ? String(text) : (el.dataset.count || el.textContent);
      const p = parseCount(target);
      el.dataset.counted = '1';
      if (!p || R.reduced() || !p.value) { el.textContent = target; return; }
      const dur = Math.min(1400, 650 + Math.log10(Math.abs(p.value) + 1) * 180), t0 = performance.now();
      setTimeout(() => { el.textContent = target; }, dur + 250);     // lands on the exact text even where rAF is throttled
      const step = now => {
        const t = (now - t0) / dur;
        if (t >= 1 || !el.isConnected) { el.textContent = target; return; }
        el.textContent = formatCount(p, countAt(p, t));
        requestAnimationFrame(step);
      };
      el.textContent = formatCount(p, 0);
      requestAnimationFrame(step);
    };

    const show = el => {
      forget(el);
      if (done.has(el)) return;
      done.add(el);
      if (el.classList.contains('reveal')) el.classList.add('in');
      if (el.hasAttribute('data-count') && !el.dataset.counted) R.count(el);
    };
    const io = canIO ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting || e.intersectionRatio > 0) { io.unobserve(e.target); show(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.01 }) : null;
    const watch = el => { pending.set(el, show); drops.set(el, () => io.unobserve(el)); io.observe(el); soon(); };

    /** a .stagger box numbers its .reveal children for the cascade; --i is written only where it is missing */
    const stagger = box => { let i = 0; for (const c of box.children) if (c.classList.contains('reveal')) { if (!c.style.getPropertyValue('--i')) c.style.setProperty('--i', String(Math.min(i, 8))); i++; } };
    const take = el => { if (done.has(el)) return; if (!io || R.reduced()) show(el); else watch(el); };
    const SEL = '.reveal:not(.in), [data-count]:not([data-counted])';
    function scanTree(root) {
      if (root.matches && root.matches('.stagger')) stagger(root);
      if (root.parentElement && root.parentElement.matches('.stagger')) stagger(root.parentElement);    // a new child of an existing cascade
      root.querySelectorAll('.stagger').forEach(stagger);
      if (root.matches && root.matches(SEL)) take(root);
      root.querySelectorAll(SEL).forEach(take);
    }
    R.scan = function (root) { prune(); scanTree(root || document); };

    /* keep scanning root as views render: only the element subtrees a batch of mutations added (a ticking clock or a text change adds nothing to
       scan), never the whole view again (P2-56) */
    R.auto = function (root) {
      if (!root || root.__revealAuto) return;
      root.__revealAuto = true;
      let queued = false, added = new Set();
      const run = () => {
        queued = false;
        const batch = added; added = new Set();
        prune();
        batch.forEach(el => {
          if (!el.isConnected) return;
          for (let p = el.parentElement; p && p !== root; p = p.parentElement) if (batch.has(p)) return;   // inside another added subtree: scanned with it
          scanTree(el);
        });
      };
      new MutationObserver(recs => {
        for (const r of recs) for (const n of r.addedNodes) if (n.nodeType === 1) added.add(n);
        if (added.size && !queued) { queued = true; Promise.resolve().then(run); }
      }).observe(root, { childList: true, subtree: true });
      R.scan(root);
    };

    R.whenVisible = function (el, fn, o) {
      if (!el) return () => {};
      if (!canIO) { fn(el); return () => {}; }
      let fired = false;
      const fire = () => { if (fired) return; fired = true; forget(el); fn(el); };
      const ob = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) fire(); }, { rootMargin: marginOf(o && o.margin) });
      ob.observe(el); pending.set(el, fire); drops.set(el, () => ob.disconnect()); soon();
      return () => { fired = true; forget(el); };
    };

    /* ---------- floating tooltip: the one info tip (audit P1-55) ----------
       [data-ftip] shows on mouse hover (following the pointer, for charts), on keyboard focus (anchored above the element) and on a tap or click,
       which pins it until an outside tap, a scroll, Escape or the next screen. While it shows, the trigger has aria-describedby="ga-ftip".
       A tap toggles it on <button data-ftip> (a pure info trigger, see GA.ui.infoTip) and on non-interactive parts such as chart bars; a [data-ftip]
       element inside a link or another control keeps its own action. */
    let box = null, owner = null, pinned = false, prevDesc = null;
    const ensure = () => { if (!box) { box = document.createElement('div'); box.className = 'ftip'; box.setAttribute('role', 'tooltip'); box.id = 'ga-ftip'; document.body.append(box); } return box; };
    const fill = text => {
      const b = ensure(), lines = String(text).split('\n');
      b.textContent = '';
      lines.forEach((ln, i) => { const el = document.createElement(i === 0 && lines.length > 1 ? 'b' : 'div'); el.textContent = ln; if (i > 1) el.className = 'sub'; b.append(el); });
      return b;
    };
    const place = (x, y, below) => {
      const b = box, w = b.offsetWidth, h = b.offsetHeight, vw = innerWidth, vh = innerHeight, gap = 14;
      let left = Math.max(8, Math.min(vw - w - 8, x - w / 2));
      let top = below ? y + gap : y - h - gap;
      if (top < 8) top = y + gap;
      if (top + h > vh - 8) top = Math.max(8, y - h - gap);
      b.style.transform = '';
      b.style.left = Math.round(left) + 'px'; b.style.top = Math.round(top) + 'px';
    };
    const describe = el => {
      if (!el || !el.setAttribute) return;
      const d = el.getAttribute('aria-describedby');
      prevDesc = d && d !== 'ga-ftip' ? d : null;
      el.setAttribute('aria-describedby', prevDesc ? prevDesc + ' ga-ftip' : 'ga-ftip');
    };
    const undescribe = el => { if (!el || !el.removeAttribute) return; if (prevDesc) el.setAttribute('aria-describedby', prevDesc); else el.removeAttribute('aria-describedby'); prevDesc = null; };
    /** show the tip for el: at (x, y) for the pointer, else anchored above el (below it when there is no room) */
    function showFor(el, x, y) {
      if (owner && owner !== el) undescribe(owner);
      const text = el.getAttribute('data-ftip');
      if (!text) return;
      fill(text); box.classList.add('on');
      if (x == null) { const r = el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; place(x, y, false); if (box.getBoundingClientRect().top > r.top) place(x, r.bottom, true); }
      else place(x, y);
      if (owner !== el) describe(el);
      owner = el;
    }
    R.tip = {
      show(x, y, text, below) { fill(text); box.classList.add('on'); place(x, y, below); },
      /** show the tip of a [data-ftip] element, anchored to it (pinned: stays until an outside tap, a scroll or Escape) */
      open(el, pin) { if (el) { showFor(el); pinned = !!pin; } },
      hide() { if (box) box.classList.remove('on'); if (owner) undescribe(owner); owner = null; pinned = false; },
      get owner() { return owner; }, get pinned() { return pinned; }
    };
    const tipOf = t => (t && t.closest ? t.closest('[data-ftip]') : null);
    const tappable = el => el.tagName === 'BUTTON' || !(el.parentElement && el.parentElement.closest('a, button, input, select, textarea, label, summary')) && !/^(A|INPUT|SELECT|TEXTAREA|LABEL|SUMMARY)$/.test(el.tagName);
    addEventListener('pointerover', e => {
      if (e.pointerType === 'touch' || pinned) return;
      const el = tipOf(e.target);
      if (!el) { if (owner) R.tip.hide(); return; }
      showFor(el, e.clientX, e.clientY);
    }, { passive: true });
    addEventListener('pointermove', e => { if (owner && box && !pinned && e.pointerType !== 'touch') place(e.clientX, e.clientY); }, { passive: true });
    addEventListener('pointerout', e => { if (owner && !pinned && e.pointerType !== 'touch' && !owner.contains(e.relatedTarget)) R.tip.hide(); }, { passive: true });
    // a tap or click pins (or unpins) the tip; a press anywhere else closes a pinned one
    addEventListener('pointerdown', e => { if (pinned && owner && !owner.contains(e.target) && !(box && box.contains(e.target))) R.tip.hide(); }, { capture: true, passive: true });
    addEventListener('click', e => {
      const el = tipOf(e.target);
      if (!el || !tappable(el)) return;
      if (owner === el && pinned) { R.tip.hide(); return; }
      showFor(el); pinned = true;
    });
    addEventListener('focusin', e => { const el = tipOf(e.target); if (!el) return; if (!pinned || owner !== el) { showFor(el); pinned = false; } });
    addEventListener('focusout', e => { if (owner && !pinned && (!e.relatedTarget || !owner.contains(e.relatedTarget))) R.tip.hide(); });
    addEventListener('scroll', () => { if (owner) R.tip.hide(); }, { passive: true, capture: true });
    addEventListener('keydown', e => { if (e.key === 'Escape' && owner) R.tip.hide(); });
    addEventListener('hashchange', () => { if (owner) R.tip.hide(); });

    if (canIO && !R.reduced()) document.documentElement.classList.add('reveal-on');
  } else {
    R.scan = R.auto = () => {}; R.whenVisible = (el, fn) => { fn(el); return () => {}; }; R.count = () => {}; R.tip = { show() {}, open() {}, hide() {}, owner: null, pinned: false };
  }

  GA.reveal = R;
  if (typeof module !== 'undefined' && module.exports) module.exports = R;
})(typeof window !== 'undefined' ? window : globalThis);
