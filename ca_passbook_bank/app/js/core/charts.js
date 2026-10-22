/* PassBook — small SVG chart kit. Every function returns an SVG/HTML string styled by CSS variables (theme-aware).
   Pure: no DOM access, so charts can be unit-tested and rendered anywhere; the one browser helper, GA.charts.fit, draws them into the page.
   Values (P1-55): every mark with an SVG <title> (its accessible name) also carries the same text as data-ftip, the one touch-safe info tip
   (GA.reveal's floating tip: hover, focus and, on touch, a tap), so chart values reach phones too.
   Phones (P2-33): GA.charts.fit(host, w => C.line(points, {w, px: true, …})) draws a chart at the width of its host's content box (padding
   excluded; at least 300) and again when that width changes, so one SVG unit is one CSS pixel and the text keeps its CSS size (.chart.px
   .ch-t, 11.5 px) instead of shrinking with the drawing; labels are thinned by the width they have; a chart with text is never stretched (no
   preserveAspectRatio 'none'). o.refs draws labelled reference lines ([{v, label}]): 1× and 2× the time budget, a qualifying mark. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const f = n => Math.round(n * 100) / 100;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

  /** circular progress. opts: {size, stroke, color, text, sub, pct 0..1, cls}. The fill sweeps in once (CSS .ring .rf, --rc = circumference). */
  function ring(o) {
    const size = o.size || 96, st = o.stroke || 9, r = (size - st) / 2, C = 2 * Math.PI * r, p = clamp(o.pct || 0, 0, 1);
    return `<div class="ring${o.cls ? ' ' + esc(o.cls) : ''}" style="width:${size}px;height:${size}px;font-size:${Math.round(size / 4.4)}px"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">` +
      `<circle class="rt" cx="${size / 2}" cy="${size / 2}" r="${f(r)}" stroke-width="${st}"/>` +
      `<circle class="rf" cx="${size / 2}" cy="${size / 2}" r="${f(r)}" stroke-width="${st}" stroke="${o.color || 'var(--accent)'}" stroke-linecap="round" stroke-dasharray="${f(C)}" stroke-dashoffset="${f(C * (1 - p))}" style="--rc:${f(C)}"${p ? '' : ' opacity="0"'}/></svg>` +
      `<div class="mid">${o.text != null ? `<b>${esc(o.text)}</b>` : ''}${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</div></div>`;
  }

  /** tiny trend line. values: numbers; opts {w,h,color,fill,min,max} */
  function spark(values, o) {
    o = o || {};
    const w = o.w || 120, h = o.h || 34, pad = 3;
    if (!values.length) return `<svg class="spark" width="${w}" height="${h}"></svg>`;
    const lo = o.min != null ? o.min : Math.min(...values), hi = o.max != null ? o.max : Math.max(...values, lo + 1e-9);
    const x = i => pad + (values.length === 1 ? (w - 2 * pad) / 2 : (i * (w - 2 * pad)) / (values.length - 1));
    const y = v => h - pad - ((v - lo) / (hi - lo || 1)) * (h - 2 * pad);
    const pts = values.map((v, i) => `${f(x(i))},${f(y(v))}`);
    const col = o.color || 'var(--accent)';
    return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${o.fill !== false ? `<path d="M${pts[0]} L${pts.join(' L')} L${f(x(values.length - 1))},${h} L${f(x(0))},${h}Z" fill="${col}" opacity=".12"/>` : ''}` +
      `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="${f(x(values.length - 1))}" cy="${f(y(values[values.length - 1]))}" r="2.8" fill="${col}"/></svg>`;
  }

  /** every k-th label, so labels of about `chars` characters (11.5 px text) never overlap in `span` px */
  const every = (n, span, chars) => Math.max(1, Math.ceil(n / Math.max(2, Math.floor(span / (Math.max(1, chars) * 6.9 + 10)))));
  const refsOf = o => (o && Array.isArray(o.refs) ? o.refs.filter(r => r && typeof r.v === 'number' && isFinite(r.v)) : []);
  const cls = o => 'chart' + (o.px ? ' px' : '');

  /* Reference-line labels (P2-33): a label sits beside its line where the data leaves room for it, so no score line or bar runs through the
     text. Spots, in order: the right end above the line, the left end above, the right end below, the left end below, then along the line
     (right to left, above, then below); the first whose text box the data (line segments, points, bars), the other reference lines and the
     labels already placed stay out of wins. When nothing beside the line is free, the label becomes a key in the chart's top margin
     ('- - Qualifying: 30', right-aligned), where no data is drawn. Text widths are estimated per glyph class at the chart's text size. */
  const boxHit = (a, b, m) => a.x0 - m < b.x1 && b.x0 < a.x1 + m && a.y0 - m < b.y1 && b.y0 < a.y1 + m;
  /** does the segment (ax, ay)–(bx, by) pass through box b grown by m? (Liang–Barsky clipping) */
  function segHit(ax, ay, bx, by, b, m) {
    let t0 = 0, t1 = 1;
    const dx = bx - ax, dy = by - ay;
    const clip = (p, q) => {
      if (p === 0) return q >= 0;
      const t = q / p;
      if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
      return true;
    };
    return clip(-dx, ax - (b.x0 - m)) && clip(dx, b.x1 + m - ax) && clip(-dy, ay - (b.y0 - m)) && clip(dy, b.y1 + m - ay);
  }
  const dotHit = (cx, cy, r, b) => { const x = clamp(cx, b.x0, b.x1), y = clamp(cy, b.y0, b.y1); return (x - cx) * (x - cx) + (y - cy) * (y - cy) < r * r; };
  /** about how wide `text` is at font size fs (the UI face at weight 600-650): narrow, wide, capital and digit glyphs counted apart, 8% spare,
      plus the 2 px halo on each side */
  function textW(text, fs) {
    let em = 0;
    for (const ch of String(text)) em += /[il.,:;'|!ftjrI ()[\]/-]/.test(ch) ? 0.32 : /[mwMW@%]/.test(ch) ? 0.86 : /[A-Z]/.test(ch) ? 0.68 : /[0-9]/.test(ch) ? 0.6 : 0.56;
    return em * fs * 1.08 + 4;
  }
  const KEY_W = 16;   // the dashed key before a label in the top margin
  /** where the label of a reference line at height y goes: {anchor, x, y (baseline), box, key}. area = {x0, x1, y0, y1, top}: the room labels may
      use beside the lines, and `top` the top margin's height (a key fits when it is at least the text height); hit(box) is true when something
      drawn is in the box; keyX = where the next key in the top margin ends (right-aligned keys never overlap) */
  function refSpot(label, y, area, o, hit, keyX) {
    const fs = o.px ? 11.5 : 10, lw = textW(label, fs), up = fs * 0.78, dn = fs * 0.26;
    const mk = (anchor, x, base) => ({ anchor, x, y: base, box: { x0: anchor === 'end' ? x - lw : x, x1: anchor === 'end' ? x : x + lw, y0: base - up, y1: base + dn } });
    const above = y - 5, below = y + 6 + up;
    const spots = [mk('end', area.x1, above), mk('start', area.x0 + 6, above), mk('end', area.x1, below), mk('start', area.x0 + 6, below)];
    for (const base of [above, below]) for (let x = area.x1 - 10; x - lw >= area.x0 + 6; x -= 10) spots.push(mk('end', x, base));
    const inside = spots.filter(s => s.box.y0 >= area.y0 && s.box.y1 <= area.y1 && s.box.x0 >= area.x0 - 1 && s.box.x1 <= area.x1 + 1);
    const free = inside.find(s => !hit(s.box));
    if (free) return free;
    const kx = keyX == null ? area.x1 : keyX;
    if (area.top >= up + dn + 4 && kx - lw - KEY_W - 6 >= area.x0) { const s = mk('end', kx, area.top - 5); s.key = true; s.box.x0 -= KEY_W + 6; return s; }
    return inside[0] || spots[0];
  }
  /** the labels of a chart's reference lines, each placed by refSpot; lines = [{r, y}], hitData(box) = the chart's own obstacle test */
  function refLabels(lines, area, o, hitData) {
    const placed = [];
    let keyX = area.x1;
    return lines.map(({ r, y }) => {
      if (!r.label) return '';
      const others = lines.filter(l => l.r !== r).map(l => l.y);
      const s = refSpot(r.label, y, area, o, b => hitData(b) || others.some(oy => segHit(area.x0, oy, area.x1, oy, b, 1)) || placed.some(p => boxHit(p, b, 2)), keyX);
      placed.push(s.box);
      const text = `<text x="${f(s.x)}" y="${f(s.y)}" text-anchor="${s.anchor}" class="ch-t ch-reft">${esc(r.label)}</text>`;
      if (!s.key) return text;
      keyX = s.box.x0 - 12;
      const ky = s.y - (o.px ? 11.5 : 10) * 0.3, kx0 = s.box.x0 + 2;   // the key, then a 6 px gap, then the text
      return `<line x1="${f(kx0)}" x2="${f(kx0 + KEY_W)}" y1="${f(ky)}" y2="${f(ky)}" class="ch-refk" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="5 4" opacity=".75"/>${text}`;
    }).join('');
  }

  /** vertical bar chart. items: [{label, v, color?, tip?}]; opts {w, h, max, color, labels, goal, refs: [{v, label}], aria, px} */
  function bars(items, o) {
    o = o || {};
    const refs = refsOf(o), labels = o.labels !== false, text = labels || refs.some(r => r.label);
    const w = o.w || 360, h = o.h || 130, padB = labels ? 20 : 4, padT = refs.some(r => r.label) ? 18 : 8, n = items.length;
    const max = o.max || Math.max(...items.map(i => i.v), ...refs.map(r => r.v * 1.12), 1e-9);
    const bw = (w - 8) / Math.max(1, n);
    const col = o.color || 'var(--accent)';
    const Y = v => h - padB - (Math.min(v, max) / max) * (h - padT - padB);
    // a chart with text is never stretched (P2-33): its labels would be squeezed; a bare one may still fill its box
    let s = `<svg class="${cls(o)}" width="100%" viewBox="0 0 ${w} ${h}"${text ? '' : ' preserveAspectRatio="none"'} role="img" aria-label="${esc(o.aria || 'Bar chart')}"${text ? '' : ` style="max-height:${h}px"`}>`;
    if (o.goal) { const gy = padT + (1 - o.goal / max) * (h - padT - padB); s += `<line x1="0" x2="${w}" y1="${f(gy)}" y2="${f(gy)}" stroke="var(--ok)" stroke-dasharray="4 4" opacity=".7"/>`; }
    const k = every(n, w - 8, Math.max(0, ...items.map(it => String(it.label == null ? '' : it.label).length)));
    const rects = [];
    items.forEach((it, i) => {
      const bh = Math.max(it.v > 0 ? 2 : 0, (Math.min(it.v, max) / max) * (h - padT - padB));
      const x0 = 4 + i * bw + bw * 0.14, ww = bw * 0.72;
      const t = it.tip || it.label + ': ' + it.v;
      if (bh > 0) rects.push({ x0, x1: x0 + ww, y0: h - padB - bh, y1: h - padB });
      s += `<g data-ftip="${esc(t)}"><title>${esc(t)}</title><rect x="${f(x0)}" y="${f(h - padB - bh)}" width="${f(ww)}" height="${f(bh)}" rx="${Math.min(4, ww / 2)}" fill="${it.color || col}" opacity="${it.v > 0 ? 1 : 0.25}"/></g>`;
      if (labels && i % k === 0) s += `<text x="${f(x0 + ww / 2)}" y="${h - 5}" text-anchor="middle" class="ch-t">${esc(it.label)}</text>`;
    });
    const lines = refs.map(r => ({ r, y: Y(r.v) }));
    lines.forEach(({ y }) => { s += `<line x1="0" x2="${w}" y1="${f(y)}" y2="${f(y)}" class="ch-ref" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="5 4" opacity=".75"/>`; });
    // labels last, beside their lines where no bar stands in the text (P2-33)
    s += refLabels(lines, { x0: 0, x1: w - 2, y0: 0, y1: h - padB, top: padT }, o, b => rects.some(r => boxHit(r, b, 1.5)));
    return s + '</svg>';
  }

  /** multi-point line chart (e.g. mock scores). points: [{x:label, y:0..1 or number, tip?}] opts {w, h, fmt, goal, goalLabel, refs: [{v, label}],
      yMax, yMin, aria, px} */
  function line(points, o) {
    o = o || {};
    const refs = refsOf(o);
    const w = o.w || 460, h = o.h || 170, L = o.px ? 40 : 34, R = 12, T = refs.some(r => r.label) || o.goal != null ? 18 : 12, B = 26;
    const yMax = o.yMax || Math.max(1, ...points.map(p => p.y), ...refs.map(r => r.v)), yMin = o.yMin || 0;
    const X = i => L + (points.length === 1 ? (w - L - R) / 2 : (i * (w - L - R)) / (points.length - 1));
    const Y = v => T + (1 - (v - yMin) / (yMax - yMin || 1)) * (h - T - B);
    const fmt = o.fmt || (v => Math.round(v * 100) + '%');
    let s = `<svg class="${cls(o)}" viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(o.aria || 'Line chart')}">`;
    for (let i = 0; i <= 4; i++) {
      const v = yMin + ((yMax - yMin) * i) / 4, y = Y(v);
      s += `<line x1="${L}" x2="${w - R}" y1="${f(y)}" y2="${f(y)}" class="ch-grid"/><text x="${L - 6}" y="${f(y + 3.5)}" text-anchor="end" class="ch-t">${esc(fmt(v))}</text>`;
    }
    if (o.goal != null) s += `<line x1="${L}" x2="${w - R}" y1="${f(Y(o.goal))}" y2="${f(Y(o.goal))}" stroke="var(--ok)" stroke-dasharray="5 4" opacity=".8"/><text x="${w - R}" y="${f(Y(o.goal) - 4)}" text-anchor="end" class="ch-t" fill="var(--ok)">${esc(o.goalLabel || 'target')}</text>`;
    // the reference lines under the data, their labels over it (drawn last, placed where the score line leaves room: P2-33)
    const lines = refs.map(r => ({ r, y: Y(Math.min(r.v, yMax)) }));
    lines.forEach(({ y }) => { s += `<line x1="${L}" x2="${w - R}" y1="${f(y)}" y2="${f(y)}" class="ch-ref" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="5 4" opacity=".75"/>`; });
    const xy = points.map((p, i) => [X(i), Y(p.y)]);
    const pts = xy.map(([x, y]) => `${f(x)},${f(y)}`);
    s += `<path d="M${f(X(0))},${f(Y(yMin))} L${pts.join(' L')} L${f(X(points.length - 1))},${f(Y(yMin))}Z" fill="var(--accent)" opacity=".1"/>`;
    s += `<polyline points="${pts.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
    const k = every(points.length, w - L - R, Math.max(0, ...points.map(p => String(p.x == null ? '' : p.x).length)));
    points.forEach((p, i) => {
      const t = p.tip || p.x + ': ' + fmt(p.y);
      s += `<g data-ftip="${esc(t)}"><title>${esc(t)}</title><circle cx="${f(X(i))}" cy="${f(Y(p.y))}" r="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2.2"/></g>`;
      if (i % k === 0) s += `<text x="${f(X(i))}" y="${h - 8}" text-anchor="middle" class="ch-t">${esc(p.x)}</text>`;
    });
    const onData = b => xy.some(([x, y], i) => dotHit(x, y, 5.5, b) || (i > 0 && segHit(xy[i - 1][0], xy[i - 1][1], x, y, b, 2.5)));
    s += refLabels(lines, { x0: L, x1: w - R, y0: 0, y1: h - B, top: T }, o, onData);
    return s + '</svg>';
  }

  /** the width a drawing gets inside `host`: its content box. clientWidth includes the padding, which the SVG (width 100%) never gets, so a chart
      drawn at clientWidth in a padded host was scaled down (WP10's trend tile: 334 drawn, 318 shown, 10.9 px text on a 390 phone) */
  function contentW(host) {
    const cw = host.clientWidth || 0;
    if (!cw || typeof getComputedStyle !== 'function') return cw;
    const cs = getComputedStyle(host), pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    return Math.max(0, cw - pad);
  }
  /** Browser helper (P2-33): draw(width) into `host` at the width of its content box (at least o.min = 300) and again when that width changes
      by 8 px or more (one ResizeObserver, one redraw per frame). Charts drawn this way should pass {w, px: true}. Returns stop(); a host that
      has left the page is let go of on the next fit(). */
  const fits = new Set();
  function fit(host, draw, o) {
    if (!host || typeof draw !== 'function' || typeof document === 'undefined') return () => {};
    fits.forEach(x => { if (!x.host.isConnected) x.stop(); });
    const min = (o && o.min) || 300;
    let last = 0, raf = 0, ro = null;
    const rec = { host, stop };
    function paint() {
      raf = 0;
      if (!host.isConnected) { stop(); return; }
      const cw = Math.floor(contentW(host));
      if (!cw) return;                                         // not laid out yet (a closed fold): drawn when it opens
      const w = Math.max(min, cw);
      if (last && Math.abs(w - last) < 8) return;
      last = w;
      host.innerHTML = draw(w);
    }
    function stop() { if (ro) ro.disconnect(); ro = null; if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf); raf = 0; fits.delete(rec); }
    paint();
    if (typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(() => { if (!raf) raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(paint) : (paint(), 0); });
      ro.observe(host);
    }
    fits.add(rec);
    return stop;
  }

  /** radar. items: [{label, v 0..1|null, hue?}] */
  function radar(items, o) {
    o = o || {};
    const size = o.size || 320, c = size / 2, R = size / 2 - 46, n = items.length;
    const ang = i => -Math.PI / 2 + (2 * Math.PI * i) / n;
    const P = (i, r) => `${f(c + Math.cos(ang(i)) * r)},${f(c + Math.sin(ang(i)) * r)}`;
    let s = `<svg class="chart radar" viewBox="0 0 ${size} ${size}" width="100%" role="img" aria-label="${esc(o.aria || 'Radar chart of mastery by subject')}">`;
    [0.25, 0.5, 0.75, 1].forEach(k => (s += `<polygon points="${items.map((_, i) => P(i, R * k)).join(' ')}" class="ch-ring"/>`));
    items.forEach((_, i) => (s += `<line x1="${c}" y1="${c}" x2="${P(i, R).split(',')[0]}" y2="${P(i, R).split(',')[1]}" class="ch-grid"/>`));
    const poly = items.map((it, i) => P(i, R * clamp(it.v == null ? 0 : it.v, 0, 1)));
    s += `<polygon points="${poly.join(' ')}" fill="var(--accent)" opacity=".16"/><polygon points="${poly.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/>`;
    items.forEach((it, i) => {
      const [x, y] = P(i, R * clamp(it.v == null ? 0 : it.v, 0, 1)).split(',');
      s += `<circle cx="${x}" cy="${y}" r="3.6" fill="${it.v == null ? 'var(--surface)' : 'var(--accent)'}" stroke="${it.v == null ? 'var(--faint)' : 'var(--surface)'}" stroke-width="1.6" data-ftip="${esc(it.tip || it.label)}"><title>${esc(it.tip || it.label)}</title></circle>`;
      const [lx, ly] = P(i, R + 20).split(',');
      const a = Math.cos(ang(i));
      s += `<text x="${lx}" y="${f(+ly + 4)}" text-anchor="${a > 0.25 ? 'start' : a < -0.25 ? 'end' : 'middle'}" class="ch-t ch-lab">${esc(it.label)}</text>`;
    });
    return s + '</svg>';
  }

  /** horizontal stacked proportion bar. parts: [{v, color, label}] */
  function stack(parts, o) {
    const tot = parts.reduce((s, p) => s + p.v, 0) || 1;
    return `<div class="stackbar" role="img" aria-label="${esc((o && o.aria) || parts.filter(p => p.v > 0).map(p => p.label + ': ' + p.v).join(', ') || 'Breakdown')}">${parts.map(p => p.v > 0 ? `<i style="width:${(100 * p.v) / tot}%;background:${p.color}" data-ftip="${esc(p.label + ': ' + p.v)}"></i>` : '').join('')}</div>`;
  }

  /** donut. parts: [{v,color,label}] */
  function donut(parts, o) {
    o = o || {};
    const size = o.size || 120, st = o.stroke || 16, r = (size - st) / 2, C = 2 * Math.PI * r, tot = parts.reduce((s, p) => s + p.v, 0);
    let acc = 0, s = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="chart donut" role="img" aria-label="${esc(o.aria || 'Donut chart')}"><circle cx="${size / 2}" cy="${size / 2}" r="${f(r)}" fill="none" stroke="var(--heat0)" stroke-width="${st}"/>`;
    if (tot) parts.forEach(p => { const len = (p.v / tot) * C; s += `<circle cx="${size / 2}" cy="${size / 2}" r="${f(r)}" fill="none" stroke="${p.color}" stroke-width="${st}" stroke-dasharray="${f(len)} ${f(C - len)}" stroke-dashoffset="${f(-acc)}" transform="rotate(-90 ${size / 2} ${size / 2})" data-ftip="${esc(p.label + ': ' + p.v)}"><title>${esc(p.label)}: ${p.v}</title></circle>`; acc += len; });
    return s + '</svg>';
  }

  /** subject identity = icon + name (no subject colours, docs/FRONTEND_V3_SPEC.md section 1): one 24 x 24 stroke glyph per subject id,
      drawn like the GA.icon set (currentColor), so it takes the colour of its tile. Unknown ids get a book. */
  const GLYPH = {
    // Paper 4, Cost and Management Accounting: a calculator
    cma: '<rect x="5" y="2.5" width="14" height="19" rx="2.6"/><path d="M8.2 6.5h7.6"/><path d="M8.6 11h.01M12 11h.01M15.4 11h.01M8.6 14.5h.01M12 14.5h.01M15.4 14.5h.01M8.6 18h.01M12 18h.01M15.4 18h.01" stroke-width="2.4"/>',
    // Paper 5, Auditing and Ethics: a magnifier over an auditor's tick
    aud: '<circle cx="10.5" cy="10.5" r="6.8"/><path d="m15.5 15.5 5 5"/><path d="m7.4 10.7 2.2 2.2 3.9-4.4"/>',
    // Paper 6A, Financial Management: a rupee coin
    fm: '<circle cx="12" cy="12" r="9"/><path d="M8.6 7.6h6.8M8.6 10.6h6.8M8.6 7.6h2.5a3 3 0 0 1 0 6H8.6l5 4.4"/>',
    // Paper 6B, Strategic Management: a compass
    sm: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/><path d="M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21" stroke-width="1.4"/>'
  };
  const BOOK = '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>';
  function subj(id, cls) {
    return `<svg class="i sg${cls ? ' ' + esc(cls) : ''}" viewBox="0 0 24 24" aria-hidden="true">${GLYPH[id] || BOOK}</svg>`;
  }
  subj.ids = Object.keys(GLYPH);

  GA.charts = { ring, spark, bars, line, radar, stack, donut, subj, fit, every };
  GA.subjIcon = subj;
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.charts;
})(typeof window !== 'undefined' ? window : globalThis);
