/* PassBook — the mascot: "Tick", an auditor's tick mark with big eyes (an original character for this app: the ✓ an auditor puts beside a
   vouched figure, and the one Bunty puts too early). The body is one thick check-mark stroke; the face sits on its long arm.
   GA.mascot.svg({size, gaze, mood, label}) returns inline SVG. Its pupils (and a small pointing arm) follow `gaze` ('left' | 'right' | 'up' | 'down' | 'center'),
   so it can look at the screen's main action; `mood` is 'idle' | 'happy' | 'think'. GA.mascot.say(el, text, opts) renders it with a tiny speech bubble
   (empty and finished states). The drawing is plain data (shapes()), shared by the SVG and by draw(ctx), which paints it on a <canvas> (Wrapped image).
   Colours come from --m-* tokens (engage.css), with fallbacks so the SVG still reads without the stylesheet. Pure parts are Node-testable. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  const NAME = 'Tick';
  const GAZE = { left: [-2.8, 0.6], right: [2.8, 0.6], up: [0, -3], down: [0, 3], center: [0, 0.5] };
  const MOODS = ['idle', 'happy', 'think'];
  const FALLBACK = { body: '#C6D2F8', line: '#0E1530', cap: '#FFFFFF', eye: '#FFFFFF', pupil: '#0E1530', shine: '#FFFFFF', cheek: 'rgba(214,36,94,.32)', mouth: '#0E1530', tongue: '#D6245E' };
  const ROLES = Object.keys(FALLBACK);

  const r1 = x => Math.round(x * 100) / 100;
  const ellipse = (cx, cy, rx, ry) => `M${r1(cx - rx)} ${r1(cy)}a${rx} ${ry} 0 1 0 ${r1(2 * rx)} 0a${rx} ${ry} 0 1 0 ${r1(-2 * rx)} 0Z`;
  /* the body: one check-mark stroke (short arm 19,55 → 40,77, long arm → 83,24), drawn twice: a thick outline, then the body colour */
  const TICK = 'M19 55L40 77L83 24';
  const BODY_W = 30, LINE_W = 35.4;
  /* a highlight along the long arm, near its tip (the role named 'cap': the old summit's snow cap colour) */
  const SHINE = 'M77.6 31.2L81.4 26.6';
  /* arms are drawn as two strokes (outline, then body colour), behind the body */
  const ARMS = {
    left: ['M46 46C41.6 42.2 37.4 40.2 32.2 39.2'], right: ['M75 57.4C80.8 59.6 85.8 59.8 90.8 58'],
    up: ['M79.6 53C86.4 51.4 90.6 47.4 92.6 41.2'], down: [],
    cheer: ['M47.2 41.6C43.2 36 41.2 31 41.8 25.8', 'M79.6 54.4C87 52.6 91.4 48.2 93.6 41.8']
  };
  const EYES = [56, 73], EYE_Y = 47;

  /** the drawing as data: [{d, fill?, stroke?, w?, part}] in paint order; colours are role names (see FALLBACK) */
  function shapes(o) {
    o = o || {};
    const mood = MOODS.indexOf(o.mood) >= 0 ? o.mood : 'idle';
    const gaze = GAZE[o.gaze] ? o.gaze : (mood === 'think' ? 'up' : 'left');
    const [gx, gy] = GAZE[gaze];
    const out = [];
    const arms = mood === 'happy' ? ARMS.cheer : gaze === 'center' || mood === 'think' ? [] : ARMS[gaze];
    arms.forEach(d => { out.push({ d, stroke: 'line', w: 10.4, part: 'arm' }); out.push({ d, stroke: 'body', w: 5.6, part: 'arm' }); });
    out.push({ d: TICK, stroke: 'line', w: LINE_W, part: 'outline' });
    out.push({ d: TICK, stroke: 'body', w: BODY_W, part: 'body' });
    out.push({ d: SHINE, stroke: 'cap', w: 3.6, part: 'cap' });
    if (mood === 'happy') {
      out.push({ d: ellipse(46.4, 58.6, 4, 3), fill: 'cheek', part: 'cheek' }, { d: ellipse(67.2, 57, 4, 3), fill: 'cheek', part: 'cheek' });
    }
    EYES.forEach(cx => {
      out.push({ d: ellipse(cx, EYE_Y, 7, 8), fill: 'eye', stroke: 'line', w: 2.4, part: 'eye' });
      out.push({ d: ellipse(cx + gx, EYE_Y + 0.5 + gy, 3.5, 3.5), fill: 'pupil', part: 'pupil' });
      out.push({ d: ellipse(cx + gx + 1.3, EYE_Y - 0.9 + gy, 1.15, 1.15), fill: 'shine', part: 'shine' });
    });
    if (mood === 'think') {
      out.push({ d: 'M49.2 43C52.2 40.8 59.8 40.8 62.8 43', stroke: 'line', w: 2.6, part: 'lid' });        // a heavy, thoughtful lid
      out.push({ d: 'M66.4 36.2C69.4 33.4 75 33 78.6 35.4', stroke: 'line', w: 2.6, part: 'brow' });       // and one raised brow
      out.push({ d: 'M50.4 61.4C52 60 53.6 60 55.2 61.4S58.4 62.8 60 61.4', stroke: 'mouth', w: 2.6, part: 'mouth' });
    } else if (mood === 'happy') {
      out.push({ d: 'M48.6 57.4H61.4C61.4 62.8 58.6 66 55 66S48.6 62.8 48.6 57.4Z', fill: 'mouth', stroke: 'line', w: 2, part: 'mouth' });
      out.push({ d: 'M51.2 63.4C52.9 61.7 57.1 61.7 58.8 63.4C57.8 65 56.6 65.6 55 65.6S52.2 65 51.2 63.4Z', fill: 'tongue', part: 'tongue' });
    } else {
      out.push({ d: 'M50.2 59.2C53 62.2 57 62.2 59.8 59.2', stroke: 'mouth', w: 2.8, part: 'mouth' });
    }
    return out;
  }

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const paint = (role, prop) => `${prop}:var(--m-${role},${FALLBACK[role]})`;

  /** inline SVG; decorative (aria-hidden) unless a label is given */
  function svg(o) {
    o = o || {};
    const size = +o.size || 72, mood = MOODS.indexOf(o.mood) >= 0 ? o.mood : 'idle';
    const gaze = GAZE[o.gaze] ? o.gaze : (mood === 'think' ? 'up' : 'left');
    const body = shapes({ mood, gaze }).map(s => {
      const st = [s.fill ? paint(s.fill, 'fill') : 'fill:none', s.stroke ? paint(s.stroke, 'stroke') : '', s.w ? 'stroke-width:' + s.w : ''].filter(Boolean).join(';');
      return `<path class="m-${s.part}" d="${s.d}" style="${st}"/>`;
    });
    // eyes (white, pupil, shine) are grouped so CSS can blink them
    const eyes = body.filter(p => /m-(eye|pupil|shine|lid)"/.test(p)), rest = body.filter(p => eyes.indexOf(p) < 0);
    const at = rest.findIndex(p => /m-(cheek|mouth|brow)"/.test(p));
    const pos = at < 0 ? rest.length : at;
    const parts = rest.slice(0, pos).concat([`<g class="m-eyes">${eyes.join('')}</g>`], rest.slice(pos));
    const a11y = o.label ? `role="img" aria-label="${esc(o.label)}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="mascot m-${mood} g-${gaze}${o.cls ? ' ' + esc(o.cls) : ''}" viewBox="0 0 100 100" width="${size}" height="${size}" ${a11y} stroke-linecap="round" stroke-linejoin="round">${parts.join('')}</svg>`;
  }

  /** resolved colours of the --m-* tokens for the current theme (canvas cannot read CSS variables) */
  function colors(root) {
    if (typeof document === 'undefined') return Object.assign({}, FALLBACK);
    const host = root || document.body, probe = document.createElement('i');
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden';
    host.append(probe);
    const out = {};
    ROLES.forEach(r => { probe.style.color = ''; probe.style.color = `var(--m-${r},${FALLBACK[r]})`; out[r] = canvasColor(getComputedStyle(probe).color) || FALLBACK[r]; });
    probe.remove();
    return out;
  }
  /** "color(srgb r g b / a)" (what browsers compute for color-mix) -> "rgba(...)"; rgb()/hex pass through */
  function canvasColor(c) {
    if (!c) return null;
    const m = /^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.e-]+%?))?\)$/i.exec(c.trim());
    if (!m) return c;
    const ch = x => Math.round(Math.min(1, Math.max(0, parseFloat(x))) * 255);
    const a = m[4] == null ? 1 : /%$/.test(m[4]) ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return `rgba(${ch(m[1])},${ch(m[2])},${ch(m[3])},${a})`;
  }

  /** paint the mascot on a canvas 2D context at (x, y), `size` px square */
  function draw(ctx, o) {
    o = o || {};
    const size = +o.size || 120, k = size / 100, col = Object.assign({}, FALLBACK, o.colors || {});
    if (typeof Path2D === 'undefined') return false;
    ctx.save();
    ctx.translate(o.x || 0, o.y || 0); ctx.scale(k, k);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    shapes(o).forEach(s => {
      const p = new Path2D(s.d);
      if (s.fill) { ctx.fillStyle = col[s.fill]; ctx.fill(p); }
      if (s.stroke) { ctx.strokeStyle = col[s.stroke]; ctx.lineWidth = s.w || 2; ctx.stroke(p); }
    });
    ctx.restore();
    return true;
  }

  /** mascot + a small speech bubble inside `el` (replaces its content). opts: {mood, gaze, size, side: 'left'|'right'} */
  function say(el, text, o) {
    if (!el) return null;
    o = o || {};
    const side = o.side === 'right' ? 'right' : 'left';
    const gaze = o.gaze || (side === 'left' ? 'right' : 'left');
    el.classList.add('mascot-say', 'ms-' + side);
    el.innerHTML = svg({ size: o.size || 64, mood: o.mood || 'idle', gaze }) + (text ? `<p class="ms-bubble">${esc(text)}</p>` : '');
    return el;
  }

  GA.mascot = { NAME, svg, say, shapes, draw, colors, canvasColor, GAZE: Object.keys(GAZE), MOODS: MOODS.slice(), FALLBACK };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.mascot;
})(typeof window !== 'undefined' ? window : globalThis);
