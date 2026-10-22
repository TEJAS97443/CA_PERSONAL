/* PassBook — diagram kit. Declarative JSON in, SVG/HTML string out. Pure (no DOM), so lessons can be linted in Node and the
   same code draws in the browser. Colours come from CSS classes k0..k7 (theme-aware); see docs/CONTENT_GUIDE.md for each spec.
   Types: gantt · graph · tree · table · memory · seq · layers · bits · flow · plot · array · kmap · circuit · wave · shapes · venn · er · nest */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const f = n => Math.round(n * 10) / 10;
  const num = (v, d) => (typeof v === 'number' && isFinite(v) ? v : d);
  const KC = ['k0', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7'];
  const KEY = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
  const kc = (c, i) => (c == null ? KC[(i || 0) % 8] : typeof c === 'number' ? KC[c % 8] : /^[a-h]$/.test(c) ? KC[KEY[c]] : c === 'ok' ? 'kok' : c === 'bad' ? 'kbad' : c === 'warn' ? 'kwarn' : c === 'mute' ? 'kmute' : KC[0]);
  let vlen = s => String(s).length;                                               // displayed length in characters (redefined below once the maths helpers exist)
  const tw = (s, size) => vlen(s) * (size || 12) * 0.56;                          // rough text width in px

  /* ---------- simple maths in SVG labels: text between $...$ (same rule as the markdown renderer) ---------- */
  // sub/superscripts (x_1, 2^n, n^{k+1}), \overline{x} / \bar{x}, primes x', and common commands as Unicode, drawn with tspans.
  // A label without a $...$ pair is untouched (same string, same width estimate). Unlike the markdown rule, a $ right after a letter or
  // digit does not open maths, so labels that always meant a dollar (grammar end markers like a#b$c$d, MIPS $t0) stay as they were.
  const MATH = /(?<![\\$A-Za-z0-9])\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/g;
  const hasMath = s => s.indexOf('$') >= 0 && new RegExp(MATH.source).test(s);
  const MSYM = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ϵ', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', varpi: 'ϖ', rho: 'ρ', varrho: 'ϱ', sigma: 'σ', varsigma: 'ς', tau: 'τ', upsilon: 'υ', phi: 'ϕ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
    Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', lt: '<', gt: '>', ll: '≪', gg: '≫', to: '→', rightarrow: '→', leftarrow: '←', gets: '←', Rightarrow: '⇒', implies: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔', leftrightarrow: '↔', mapsto: '↦', uparrow: '↑', downarrow: '↓',
    cdot: '·', times: '×', div: '÷', pm: '±', mp: '∓', ast: '∗', star: '⋆', circ: '∘', bullet: '•', infty: '∞', emptyset: '∅', varnothing: '∅',
    in: '∈', notin: '∉', ni: '∋', cup: '∪', cap: '∩', setminus: '∖', subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇', uplus: '⊎', sqcup: '⊔',
    neg: '¬', lnot: '¬', land: '∧', wedge: '∧', lor: '∨', vee: '∨', oplus: '⊕', otimes: '⊗', odot: '⊙', equiv: '≡', approx: '≈', sim: '∼', simeq: '≃', cong: '≅', propto: '∝',
    forall: '∀', exists: '∃', nexists: '∄', partial: '∂', nabla: '∇', sum: '∑', prod: '∏', int: '∫', ldots: '…', dots: '…', cdots: '⋯', vdots: '⋮',
    lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋', langle: '⟨', rangle: '⟩', vert: '|', mid: '|', parallel: '∥', perp: '⊥', angle: '∠', top: '⊤', bot: '⊥', vdash: '⊢', models: '⊨',
    prime: '′', bowtie: '⋈', Join: '⋈', ltimes: '⋉', rtimes: '⋊', hbar: 'ℏ', ell: 'ℓ', aleph: 'ℵ', square: '□', Box: '□', checkmark: '✓', cdotp: '·',
    ',': ' ', ';': ' ', ':': ' ', '!': '', ' ': ' ', quad: ' ', qquad: '  ', '{': '{', '}': '}', '_': '_', '%': '%', '#': '#', '&': '&', '$': '$', '|': '‖', '\\': ' '
  };
  const MNOT = { equiv: '≢', in: '∉', '=': '≠', subset: '⊄', subseteq: '⊈', supset: '⊅', exists: '∄', sim: '≁', approx: '≉', mid: '∤', le: '≰', ge: '≱', leq: '≰', geq: '≱', cong: '≇' };
  MNOT.in = '∉';
  const MFN = new Set('log ln lg exp sin cos tan sec csc cot arcsin arccos arctan sinh cosh tanh max min sup inf lim det gcd lcm deg dim ker Pr arg mod bmod'.split(' '));
  const MBB = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', P: 'ℙ' };
  const MACC = { hat: '̂', tilde: '̃', vec: '⃗', dot: '̇', ddot: '̈' };
  // parse the inside of $...$ into nodes: {t, it} text, {sup: [...]}, {sub: [...]}, {ov: [...]}
  function mathParse(src) {
    let i = 0;
    const word = () => { const m = /^[A-Za-z]+/.exec(src.slice(i)); if (m) { i += m[0].length; return m[0]; } return src[i] != null ? src[i++] : ''; };
    const group = () => {                           // {…} or one token
      while (src[i] === ' ') i++;
      if (src[i] === '{') { i++; const g = seq('}'); i++; return g; }
      return atom();
    };
    const raw = () => { while (src[i] === ' ') i++; if (src[i] !== '{') return word(); let d = 0, s0 = ''; for (; i < src.length; i++) { if (src[i] === '{') { if (d++) s0 += '{'; } else if (src[i] === '}') { if (--d === 0) { i++; break; } s0 += '}'; } else s0 += src[i]; } return s0; };
    function atom() {
      const ch = src[i];
      if (ch == null) return [];
      if (ch === '\\') {
        i++;
        const name = /[A-Za-z]/.test(src[i] || '') ? word() : src[i++] || '';
        if (name === 'not') { while (src[i] === ' ') i++; const nx = src[i] === '\\' ? (i++, word()) : src[i++] || ''; return [{ t: MNOT[nx] || (MSYM[nx] || nx) + '̸' }]; }
        if (name === 'overline' || name === 'bar' || name === 'overbar') return [{ ov: group() }];
        if (name === 'sqrt') return [{ t: '√' }, { ov: group() }];
        if (name === 'frac' || name === 'dfrac' || name === 'tfrac') { const a = group(), b = group(); return a.concat([{ t: '/' }], b); }
        if (name === 'pmod') return [{ t: ' (mod ' }].concat(group(), [{ t: ')' }]);
        if (name === 'mathbb') { const r = raw(); return [{ t: [...r].map(c => MBB[c] || c).join('') }]; }
        if (/^(text|textrm|mathrm|textbf|mathbf|boldsymbol|mathsf|mathtt|texttt|textsf|operatorname|mbox)$/.test(name)) return [{ t: raw() }];
        if (name === 'textit' || name === 'mathit') return [{ t: raw(), it: true }];
        if (MACC[name]) { const g = group(); return g.concat([{ t: MACC[name] }]); }
        if (name === 'left' || name === 'right' || name === 'big' || name === 'Big' || name === 'displaystyle') return [];
        if (MFN.has(name)) return [{ t: name }];
        return [{ t: MSYM[name] != null ? MSYM[name] : name }];
      }
      if (ch === '{') { i++; const g = seq('}'); i++; return g; }
      i++;
      if (ch === "'") return [{ t: '′' }];
      if (ch === '-') return [{ t: '−' }];
      if (/[A-Za-z]/.test(ch)) return [{ t: ch, it: true }];
      return [{ t: ch }];
    }
    function seq(stop) {
      const out = [];
      while (i < src.length && src[i] !== stop) {
        const ch = src[i];
        if (ch === '^' || ch === '_') { i++; out.push(ch === '^' ? { sup: group() } : { sub: group() }); continue; }
        if (ch === '}') { i++; continue; }
        out.push(...atom());
      }
      return out;
    }
    return seq(null);
  }
  // flatten nodes to runs {t, it, ov, lv: [shift steps]} and measure them (characters, sub/superscripts count 0.72)
  function mathRuns(nodes, lv, ov, out) {
    nodes.forEach(n => {
      if (n.sup) mathRuns(n.sup, lv.concat(1), ov, out);
      else if (n.sub) mathRuns(n.sub, lv.concat(-1), ov, out);
      else if (n.ov) mathRuns(n.ov, lv, true, out);
      else if (n.t) { const q = out[out.length - 1]; if (q && q.it === !!n.it && q.ov === ov && q.lv.join() === lv.join()) q.t += n.t; else out.push({ t: n.t, it: !!n.it, ov, lv }); }
    });
    return out;
  }
  const mathSegs = s => { const out = []; let last = 0; s.replace(MATH, (m, g1, at) => { if (at > last) out.push({ text: s.slice(last, at) }); out.push({ runs: mathRuns(mathParse(g1), [], false, []) }); last = at + m.length; return m; }); if (last < s.length) out.push({ text: s.slice(last) }); return out; };
  vlen = s => {                                          // displayed length in characters (plain labels: their length, as before)
    const t = String(s);
    if (!hasMath(t)) return t.length;
    return mathSegs(t).reduce((a, sg) => a + (sg.text != null ? sg.text.length : sg.runs.reduce((b, r) => b + [...r.t.replace(/[̀-ͯ⃐-⃿]/g, '')].length * Math.pow(0.72, r.lv.length), 0)), 0);
  };
  const mathPlain = s => { const t = String(s == null ? '' : s); return hasMath(t) ? mathSegs(t).map(sg => (sg.text != null ? sg.text : sg.runs.map(r => r.t).join(''))).join('') : t; };
  // one line of label text with maths -> tspans; returns the baseline offset left at the end (the next line corrects for it)
  function mathLine(s, size) {
    let html = '', off = 0;
    mathSegs(s).forEach(sg => {
      if (sg.text != null) { html += off ? `<tspan dy="${f(-off)}">${esc(sg.text)}</tspan>` : esc(sg.text); off = 0; return; }
      sg.runs.forEach(r => {
        let sz = size, sh = 0;
        r.lv.forEach(d => { sh += d > 0 ? -sz * 0.42 : sz * 0.26; sz *= 0.72; });
        const dy = sh - off; off = sh;
        html += `<tspan${Math.abs(dy) > 0.01 ? ` dy="${f(dy)}"` : ''}${r.lv.length ? ` font-size="${f(sz)}"` : ''}${r.it ? ' font-style="italic"' : ''}${r.ov ? ' text-decoration="overline"' : ''}>${esc(r.t)}</tspan>`;
      });
    });
    return { html, off };
  }

  /* ---------- svg helpers ---------- */
  const T = (x, y, text, o) => {
    o = o || {};
    const lines = String(text == null ? '' : text).split('\n');
    const size = o.size || 12, lh = size * 1.25;
    const y0 = y - ((lines.length - 1) * lh) / 2;
    let prev = 0;
    const body = lines.map((ln, i) => {
      const m = hasMath(ln) ? mathLine(ln, size) : { html: esc(ln), off: 0 };
      const dy = lh - prev; prev = m.off;
      return `<tspan x="${f(x)}" ${i ? `dy="${f(dy)}"` : ''}>${m.html}</tspan>`;
    }).join('');
    return `<text x="${f(x)}" y="${f(y0)}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="${o.base || 'central'}" font-size="${size}"${o.weight ? ` font-weight="${o.weight}"` : ''} class="${o.cls || 'dt'}"${o.fill ? ` fill="${o.fill}"` : ''}${o.mono ? ' font-family="var(--font-mono)"' : ''}>${body}</text>`;
  };
  // every drawing names its own arrowheads (P2-63): with one shared id="ah", a page's second drawing used the first one's marker, and lost
  // its arrowheads when that one sat in a closed fold. The id is a hash of what is drawn, so a render is repeatable (tests compare renders);
  // two identical drawings on a page share it, and GA.fit renames a repeat (its first copy may sit in a closed fold).
  const wrap = (spec, w, h, inner, extra) => {
    const uses = /url\(#ah2?\)/.test(inner), id = uses ? hid(f(w) + ' ' + f(h) + ' ' + inner) : '';
    const body = uses ? inner.replace(/url\(#ah(2?)\)/g, (m, two) => `url(#ah${two}-${id})`) : inner;
    return `<svg class="dgs" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(mathPlain(spec.alt || spec.title || spec.type))}" data-dg="${esc(spec.type || '')}"${extra || ''}>` +
      (uses ? `<defs><marker id="ah-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 9 5 0 9z" class="ar"/></marker>` +
        `<marker id="ah2-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 9 5 0 9z" class="ar2"/></marker></defs>` : '') +
      `${spec.title ? (spec.phone ? T(w / 2, 14 + (nLines(phoneTitle(spec)) - 1) * 8.125, phoneTitle(spec), { size: 13, weight: 700, cls: 'dt dtt' }) : T(w / 2, 14, spec.title, { size: 13, weight: 700, cls: 'dt dtt' })) : ''}${body}</svg>`;
  };
  const top = spec => (spec.title ? 30 + (spec.phone ? (nLines(phoneTitle(spec)) - 1) * 16.25 : 0) : 8);

  /* ---------- phone re-layout (P1-12): GA.fit redraws these kinds at the column's width, {...spec, phone: true, w}, instead of shrinking them ---------- */
  // ticks are thinned, labels never drop below 10.5 px, long labels wrap; without `phone` every kind draws exactly as before
  const RELAYOUT = new Set(['gantt', 'plot', 'memory', 'layers', 'flow', 'tree']);
  // a flow lays itself out inside any w; a tree only when it has a leaf group to stack ("wrap"), else it would only shrink
  const canRelayout = spec => { try { return !!spec && RELAYOUT.has(spec.type) && (spec.type !== 'tree' || treeCanWrap(spec)); } catch (e) { return false; } };
  const PFS = 10.5;                                                               // the smallest label size at phone width
  const pz = (s, n) => (s.phone ? Math.max(PFS, n) : n);
  // the words of a label; a $…$ maths run stays in one piece
  const words = t => { const out = []; let cur = '', m = false; for (let i = 0; i < t.length; i++) { const c = t[i]; if (c === '$' && t[i - 1] !== '\\') m = !m; if (/\s/.test(c) && !m) { if (cur) out.push(cur); cur = ''; } else cur += c; } if (cur) out.push(cur); return out; };
  /** a label broken into lines no wider than maxPx (rough widths, like tw); explicit line breaks stay */
  function wrapText(text, maxPx, size) {
    return String(text == null ? '' : text).split('\n').map(par => {
      const lines = []; let line = '';
      words(par).forEach(w => { const t = line ? line + ' ' + w : w; if (line && tw(t, size) > maxPx) { lines.push(line); line = w; } else line = t; });
      lines.push(line);
      return lines.join('\n');
    }).join('\n');
  }
  /** wrapText, but as evenly as the words allow: the narrowest width that needs no more lines (no word left alone on a last line) */
  function wrapEven(text, maxPx, size) {
    return String(text == null ? '' : text).split('\n').map(par => {
      if (tw(par, size) <= maxPx) return par;
      const n = wrapText(par, maxPx, size).split('\n').length;
      let lo = tw(par, size) / n - 1, hi = maxPx;
      for (let k = 0; k < 12 && hi - lo > 2; k++) { const mid = (lo + hi) / 2; if (wrapText(par, mid, size).split('\n').length > n) lo = mid; else hi = mid; }
      return wrapText(par, hi, size);
    }).join('\n');
  }
  const nLines = t => String(t == null ? '' : t).split('\n').length;
  const phoneTitle = spec => (spec.title ? wrapText(spec.title, num(spec.w, 340) - 16, 13) : '');
  /** keep the labels of a row of ticks that do not collide (greedy from the left), for phone widths: [[x, label], ...] -> the kept ones */
  const thin = (items, size, gap) => { let right = -Infinity; return items.filter(([x, lab]) => { const w = tw(String(lab), size); if (x - w / 2 < right + gap) return false; right = x + w / 2; return true; }); };

  /* ============================================================== gantt */
  function gantt(s) {
    const blocks = (s.blocks || []).map(b => ({ ...b }));
    const procs = [];
    blocks.forEach(b => { if (b.p !== 'idle' && !procs.includes(b.p)) procs.push(b.p); });
    (s.arrivals || []).forEach(a => { if (!procs.includes(a.p)) procs.push(a.p); });
    const tmax = num(s.axis && s.axis.max, Math.max(...blocks.map(b => b.to), 1));
    const tmin = num(s.axis && s.axis.min, Math.min(0, ...blocks.map(b => b.from)));
    const step = num(s.axis && s.axis.step, tmax - tmin > 40 ? 5 : tmax - tmin > 20 ? 2 : 1);
    const lanes = s.lanes === 'by-process', ph = !!s.phone;
    const nameW = lanes ? Math.max(0, ...procs.map(p => tw(p, 12))) : 0;          // lane names longer than ~8 characters widen the left margin
    const W = num(s.w, 640), L = lanes ? Math.max(ph ? 34 : 64, Math.ceil(nameW + 10)) : ph ? 10 : 16, R = ph ? 10 : 16, pw = W - L - R;
    const X = t => L + ((t - tmin) / (tmax - tmin)) * pw;
    const laneH = 30, T0 = top(s) + (s.marks && s.marks.length ? 18 : 0), rows = lanes ? procs.length : 1;
    const H = T0 + rows * (laneH + 6) + 46 + (s.queue ? 26 : 0);
    let o = '';
    const col = p => kc(s.colors && s.colors[p] != null ? s.colors[p] : null, Math.max(0, procs.indexOf(p)));
    if (lanes) procs.forEach((p, i) => (o += `${T(L - 8, T0 + i * (laneH + 6) + laneH / 2, p, { anchor: 'end', weight: 650 })}<line x1="${L}" x2="${W - R}" y1="${T0 + i * (laneH + 6) + laneH + 3}" y2="${T0 + i * (laneH + 6) + laneH + 3}" class="dg-grid"/>`));
    blocks.forEach(b => {
      const idle = b.p === 'idle', row = lanes && !idle ? procs.indexOf(b.p) : 0;
      const y = T0 + row * (laneH + 6), x = X(b.from), w = Math.max(1, X(b.to) - x);
      const bs = ph && !(w > tw(b.label || b.p, 11) + 6) ? PFS : 11;                // phone: a narrow block tries 10.5 px before it drops its label
      o += `<g class="${idle ? 'kmute' : col(b.p)}"><rect x="${f(x)}" y="${y}" width="${f(w)}" height="${laneH}" rx="5" class="nb${idle ? ' idle' : ''}"/>` +
        (w > tw(b.label || b.p, bs) + (bs === 11 ? 6 : 3) ? T(x + w / 2, y + laneH / 2, idle ? (b.label || 'idle') : (b.label || b.p), { size: bs, weight: 650 }) : '') + `<title>${esc(mathPlain(b.label || b.p) + ': ' + b.from + ' → ' + b.to)}</title></g>`;
    });
    const ay = T0 + rows * (laneH + 6) + 2;
    o += `<line x1="${L}" x2="${W - R}" y1="${ay}" y2="${ay}" class="dg-axis"/>`;
    // phone: label every k-th tick (k from 1, 2, 4, 5, 10, …) so the numbers keep ~18 px apart; unlabelled ticks stay as marks while they are 4 px apart
    let every = 1;
    if (ph) { const lw = Math.max(tw(String(tmax), PFS), tw(String(tmin), PFS)) + 8, pxs = (pw / ((tmax - tmin) || 1)) * step; every = [1, 2, 4, 5, 10, 20, 25, 50, 100].find(k => k * pxs >= Math.max(18, lw)) || 100; }
    for (let t = Math.ceil(tmin / step) * step; t <= tmax + 1e-9; t += step) {
      const lab = every === 1 || Math.round(t / step) % every === 0;
      if (!lab && (pw / ((tmax - tmin) || 1)) * step < 4) continue;
      o += `<line x1="${f(X(t))}" x2="${f(X(t))}" y1="${ay}" y2="${ay + 5}" class="dg-axis"/>${lab ? T(X(t), ay + 16, t, { size: 10.5, cls: 'dt dtm' }) : ''}`;
    }
    (s.arrivals || []).forEach(a => (o += `<g class="${col(a.p)}"><path d="M${f(X(a.t))} ${ay + 26} l-5 8 h10z" class="nb solid"/></g>`));
    (s.marks || []).forEach(m => (o += `<line x1="${f(X(m.t))}" x2="${f(X(m.t))}" y1="${T0 - 4}" y2="${ay}" class="dg-mark"/>${T(X(m.t), T0 - 12, m.label || '', { size: pz(s, 10), cls: 'dt dtm' })}`));
    if (s.queue) s.queue.forEach(q => (o += T(X(q.t), ay + 40 + 0, '[' + q.items.join(' ') + ']', { size: pz(s, 10), cls: 'dt dtm', mono: true })));
    return wrap(s, W, H, o);
  }

  /* ============================================================== graph */
  function layoutGraph(s) {
    const n = s.nodes || [];
    const W = num(s.w, 560), H = num(s.h, 300);
    if (n.every(x => typeof x.x === 'number' && typeof x.y === 'number') && s.layout !== 'circle' && s.layout !== 'layers') return { W, H, pos: Object.fromEntries(n.map(x => [x.id, [x.x, x.y]])) };
    const pos = {};
    if (s.layout === 'layers') {
      const depth = {}, adj = {};
      (s.edges || []).forEach(e => (adj[e.from] = (adj[e.from] || []).concat(e.to)));
      const roots = n.filter(x => !(s.edges || []).some(e => e.to === x.id)).map(x => x.id);
      const q = (roots.length ? roots : [n[0].id]).slice();
      q.forEach(r => (depth[r] = 0));
      while (q.length) { const u = q.shift(); (adj[u] || []).forEach(v => { if (depth[v] == null) { depth[v] = depth[u] + 1; q.push(v); } }); }
      n.forEach(x => { if (depth[x.id] == null) depth[x.id] = 0; });
      const lv = {}; n.forEach(x => (lv[depth[x.id]] = (lv[depth[x.id]] || []).concat(x.id)));
      const L = Object.keys(lv).length;
      Object.keys(lv).forEach(d => lv[d].forEach((id, i) => (pos[id] = [((i + 1) * W) / (lv[d].length + 1), 40 + (d * (H - 80)) / Math.max(1, L - 1)])));
    } else {
      const cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 40;
      n.forEach((x, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n.length; pos[x.id] = [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    }
    return { W, H, pos };
  }
  // a self-loop: a C curve leaving and re-entering the node on one side ("above" by default, also "below", "left", "right").
  // Its label sits on the top of an "above" loop (as before) and just past the curve on the other sides.
  const LOOPV = { above: [0, -1], below: [0, 1], left: [-1, 0], right: [1, 0] };
  function loopArc(a, r, side, label) {
    const [ux, uy] = LOOPV[side] || LOOPV.above, vx = -uy, vy = ux;
    const P = (t, n) => [f(a[0] + ux * r * t + vx * r * n), f(a[1] + uy * r * t + vy * r * n)];
    const p0 = P(0.8, -0.6), c1 = P(3, -1.5), c2 = P(3, 1.5), p1 = P(0.8, 0.6);
    const pts = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24, u = 1 - t; pts.push([0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p1[k])); }
    const lab = ux ? [a[0] + ux * (r * 2.45 + 4), a[1]] : uy > 0 ? [a[0], a[1] + r * 2.45 + 9] : [a[0], a[1] - r * 2.5], an = ux < 0 ? 'end' : ux > 0 ? 'start' : 'middle';
    const box = [Math.min(...pts.map(q => q[0])), Math.min(...pts.map(q => q[1])), Math.max(...pts.map(q => q[0])), Math.max(...pts.map(q => q[1]))];
    let lbox = null;
    if (label != null) { const w = tw(plain(String(label)), 11) + 6, x1 = an === 'start' ? lab[0] - 2 : an === 'end' ? lab[0] - w + 2 : lab[0] - w / 2; lbox = [x1, lab[1] - 8, x1 + w, lab[1] + 8]; }
    return { path: `M${p0[0]} ${p0[1]} C${c1[0]} ${c1[1]},${c2[0]} ${c2[1]},${p1[0]} ${p1[1]}`, lab, an, pts, box, lbox };
  }
  // geometry of an edge between two different nodes: path, label spot and a polyline for overlap tests
  function graphEdge(s, e, a, b, Ra, Rb, dir) {
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
    if (typeof Ra === 'function') Ra = Ra(ux, uy);                   // a box: the distance to its outline along the edge
    if (typeof Rb === 'function') Rb = Rb(ux, uy);
    const rev = (s.edges || []).some(x => x.from === e.to && x.to === e.from);
    const cv = num(e.curve, rev ? 0.22 : 0);
    const tr = dir ? Rb + 3 : Rb;
    const sx = a[0] + ux * Ra, sy = a[1] + uy * Ra, ex = b[0] - ux * tr, ey = b[1] - uy * tr;
    const nx = -uy, ny = ux, off = cv * d;
    const cx = (sx + ex) / 2 + nx * off, cy = (sy + ey) / 2 + ny * off;
    const path = cv ? `M${f(sx)} ${f(sy)} Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}` : `M${f(sx)} ${f(sy)} L${f(ex)} ${f(ey)}`;
    const mx = (sx + ex) / 2 + (cv ? nx * off * 0.5 : 0) + nx * (e.label ? 9 : 0), my = (sy + ey) / 2 + (cv ? ny * off * 0.5 : 0) + ny * (e.label ? 9 : 0);
    const pts = cv ? Array.from({ length: 17 }, (_, i) => { const t = i / 16, u = 1 - t; return [u * u * sx + 2 * u * t * cx + t * t * ex, u * u * sy + 2 * u * t * cy + t * t * ey]; }) : [[sx, sy], [ex, ey]];
    return { path, mx, my, pts };
  }
  // side of each self-loop: the node's or edge's "loop" if given; else "above" (as before) unless that covers another edge's label,
  // then the side among below / right / left that clears the labels, the other nodes and loops and the figure edge and crosses fewest lines
  function graphLoops(s, pos, radius, dir, W, H) {
    const edges = s.edges || [], out = {};
    if (!edges.some(e => e.from === e.to)) return out;
    const nodeBy = Object.fromEntries((s.nodes || []).map(x => [x.id, x]));
    const ov = (p, q) => p[0] < q[2] && p[2] > q[0] && p[1] < q[3] && p[3] > q[1];
    const labs = [], lines = [], loops = [];
    edges.forEach((e, ei) => {
      if (e.from === e.to) return;
      const a = pos[e.from], b = pos[e.to];
      if (!a || !b) return;
      const G = graphEdge(s, e, a, b, radius(e.from), radius(e.to), dir);
      lines.push(G.pts);
      if (e.label != null) { const w = tw(plain(String(e.label)), 11) / 2 + 3; labs.push([G.mx - w, G.my - 9, G.mx + w, G.my + 9]); }
    });
    const cross = (pts, P) => { let n = 0; for (let i = 1; i < pts.length; i++) for (let j = 1; j < P.length; j++) { const [p, q] = [pts[i - 1], pts[i]], [u, v] = [P[j - 1], P[j]]; const d1 = (q[0] - p[0]) * (u[1] - p[1]) - (q[1] - p[1]) * (u[0] - p[0]), d2 = (q[0] - p[0]) * (v[1] - p[1]) - (q[1] - p[1]) * (v[0] - p[0]), d3 = (v[0] - u[0]) * (p[1] - u[1]) - (v[1] - u[1]) * (p[0] - u[0]), d4 = (v[0] - u[0]) * (q[1] - u[1]) - (v[1] - u[1]) * (q[0] - u[0]); if (d1 * d2 < 0 && d3 * d4 < 0) n++; } return n; };
    const top = s.title ? -12 : 2;
    edges.forEach((e, ei) => {
      if (e.from !== e.to || !pos[e.from]) return;
      const a = pos[e.from], r = radius(e.from), nd = nodeBy[e.from] || {};
      const want = e.loop != null ? e.loop : nd.loop;
      const arc = sd => loopArc(a, r, sd, e.label);
      if (want != null) {
        if (!LOOPV[want]) fail('graph', `loop is "above", "below", "left" or "right" (got ${JSON.stringify(want)})`);
        out[ei] = want;
      } else {
        const boxes = L => [L.box].concat(L.lbox ? [L.lbox] : []);
        const labHit = L => boxes(L).some(b => labs.some(q => ov(b, q)));
        const score = L => {
          const bs = boxes(L), hard = bs.filter(b => labs.some(q => ov(b, q)) || loops.some(q => ov(b, q))).length +
            (s.nodes || []).filter(x => x.id !== e.from && pos[x.id]).filter(x => { const p = pos[x.id], R = radius(x.id) + 2; return bs.some(b => ov(b, [p[0] - R, p[1] - R, p[0] + R, p[1] + R])); }).length;
          const outside = bs.some(b => b[0] < 0 || b[2] > W || b[1] < top || b[3] > H + 10) ? 1 : 0;
          return [hard, outside, lines.reduce((n, P) => n + cross(L.pts, P), 0)];
        };
        const up = arc('above');
        if (!labHit(up)) out[ei] = 'above';
        else {
          const better = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
          out[ei] = ['below', 'right', 'left', 'above'].map(sd => [sd, score(arc(sd))]).reduce((m, c) => (better(c[1], m[1]) < 0 ? c : m))[0];
        }
      }
      const L = arc(out[ei]);
      loops.push(L.box); if (L.lbox) { loops.push(L.lbox); labs.push(L.lbox); }
    });
    return out;
  }
  function graph(s) {
    const { W, H, pos } = layoutGraph(s);
    const R0 = num(s.r, 20), dir = s.directed !== false;
    const nodeBy = Object.fromEntries((s.nodes || []).map(x => [x.id, x]));
    const radius = id => { const nd = nodeBy[id]; if (!nd) return R0; if (nd.r) return nd.r; const lab = String(nd.label != null ? nd.label : nd.id); return Math.max(R0, Math.min(34, tw(lab, 12) / 2 + 9)); };
    // a square node grows to hold its label (each line of a "\n" label) when the usual 2r × 1.6r box is too small; others stay as they were
    const sqBox = id => {
      const nd = nodeBy[id];
      if (!nd || nd.shape !== 'square') return null;
      const lab = String(nd.label != null ? nd.label : nd.id), R = radius(id), ls = lab.split('\n'), sz = vlen(lab) > 3 ? 10.5 : 12.5;
      const hw = Math.max(R, Math.max(...ls.map(l => tw(l, sz))) / 2 + 8), hh = Math.max(R * 0.8, (ls.length * sz * 1.25) / 2 + 6);
      return hw > R + 0.01 || hh > R * 0.8 + 0.01 ? { hw, hh } : null;
    };
    const reach = id => { const q = sqBox(id); return q ? (ux, uy) => Math.min(q.hw / Math.max(1e-9, Math.abs(ux)), q.hh / Math.max(1e-9, Math.abs(uy))) : radius(id); };
    let o = '';
    const pairCount = {};
    (s.edges || []).forEach(e => { const k = [e.from, e.to].sort().join('|'); pairCount[k] = (pairCount[k] || 0) + 1; });
    const loopAt = graphLoops(s, pos, radius, dir, W, H);                 // where each self-loop sits: node/edge "loop", else the free side
    const grow = [W, H];                                                  // a loop below or right of the figure's edge makes it bigger (not the classic loop above)
    (s.edges || []).forEach((e, ei) => {
      const a = pos[e.from], b = pos[e.to];
      if (!a || !b) throw new Error(`graph edge ${e.from}->${e.to}: unknown node`);
      const cls = kc(e.color, 7) === 'k7' && !e.color ? '' : kc(e.color);
      const dash = e.style === 'dashed' ? ' dashed' : '';
      let path, mx, my, an;
      const Ra = reach(e.from), Rb = reach(e.to);
      if (e.from === e.to) {
        const L = loopArc(a, radius(e.from), loopAt[ei], e.label);
        path = L.path; mx = L.lab[0]; my = L.lab[1]; an = L.an;
        if (loopAt[ei] !== 'above') [L.box].concat(L.lbox ? [L.lbox] : []).forEach(b => { grow[0] = Math.max(grow[0], b[2] + 6); grow[1] = Math.max(grow[1], b[3] + 6); });
      } else ({ path, mx, my } = graphEdge(s, e, a, b, Ra, Rb, dir));
      o += `<g class="${cls}"><path d="${path}" class="de${dash}"${dir ? ' marker-end="url(#ah)"' : ''}/>${e.label != null ? `<g>${T(mx, my, e.label, { size: 11, weight: 600, cls: 'dt del', anchor: an })}</g>` : ''}</g>`;
    });
    (s.nodes || []).forEach((nd, i) => {
      const [x, y] = pos[nd.id], lab = nd.label != null ? nd.label : nd.id, R = radius(nd.id);
      const c = kc(nd.fill, nd.fill == null ? 8 : 0), filled = nd.fill != null;
      const shape = nd.shape || 'circle';
      let sh;
      const q = shape === 'square' ? sqBox(nd.id) : null;
      if (q) sh = `<rect x="${f(x - q.hw)}" y="${f(y - q.hh)}" width="${f(q.hw * 2)}" height="${f(q.hh * 2)}" rx="5" class="nb${filled ? '' : ' plain'}"/>`;
      else if (shape === 'square') sh = `<rect x="${f(x - R)}" y="${f(y - R * 0.8)}" width="${R * 2}" height="${R * 1.6}" rx="5" class="nb${filled ? '' : ' plain'}"/>`;
      else if (shape === 'diamond') sh = `<path d="M${f(x)} ${f(y - R * 1.15)} L${f(x + R * 1.3)} ${f(y)} L${f(x)} ${f(y + R * 1.15)} L${f(x - R * 1.3)} ${f(y)}Z" class="nb${filled ? '' : ' plain'}"/>`;
      else if (shape === 'none') sh = '';
      else sh = `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" class="nb${filled ? '' : ' plain'}"/>` + (shape === 'double' ? `<circle cx="${f(x)}" cy="${f(y)}" r="${R - 4.5}" class="nb plain thin"/>` : '');
      const RL = q ? q.hw : R, start = nd.start ? `<path d="M${f(x - RL - 24)} ${f(y)} L${f(x - RL - 3)} ${f(y)}" class="de" marker-end="url(#ah)"/>` : '';
      o += `<g class="${c}">${start}${sh}${T(x, y, lab, { size: vlen(lab) > 3 ? 10.5 : 12.5, weight: 650 })}${nd.note ? T(x, y + (q ? Math.max(R, q.hh) : R) + 12, nd.note, { size: 10, cls: 'dt dtm' }) : ''}</g>`;
    });
    const W2 = grow[0], H2 = grow[1];
    return wrap(s, W2, H2, `<g transform="translate(0 ${s.title ? 14 : 0})">${o}</g>`, minW(W2)).replace(`viewBox="0 0 ${f(W2)} ${f(H2)}"`, `viewBox="0 0 ${f(W2)} ${f(H2 + (s.title ? 14 : 0))}"`);
  }

  /* ============================================================== tree */
  // node size: a circle of radius R, or a rounded box for long or multi-line ("\n") labels
  function treeBox(n, R) {
    const lines = String(n.label).split('\n'), w = Math.max(...lines.map(l => tw(l, 12))), h = 26 + (lines.length - 1) * 15;
    return { w, h, box: w + 14 > 2 * R || lines.length > 1, half: lines.length > 1 ? Math.max(R, h / 2) : R };
  }
  const noteN = n => (n && n.note != null && String(n.note) !== '' ? String(n.note).split('\n').length : 0);
  // a leaf group that can be stacked: a node (not in a binary tree) with two or more children, all of them leaves
  const treeStackable = (s, n) => !s.binary && !!n && (n.children || []).length >= 2 && n.children.every(k => k && !(k.children || []).some(Boolean));
  // a tree is redrawn at phone width only when stacking its leaf groups makes it clearly narrower (else it keeps its scroll cue)
  const treeCanWrap = s => { if (s.binary || !s.root) return false; const g = treeGroups(s); return g.length > 0 && treeDraw(s, new Set(g)).W <= 0.85 * treeDraw(s, new Set()).W; };
  const treeGroups = s => { const out = []; (function walk(n) { if (!n) return; if (treeStackable(s, n)) out.push(n); (n.children || []).forEach(walk); })(s.root); return out; };
  /* "wrap": true stacks every leaf group: the leaves of a node hang one under another from a line down its middle, instead of side by side
     (a four-leaf tree fits a phone). "wrap": "auto" with a "w", and the phone redraw (GA.fit, at the column's width), stack the groups that
     narrow the tree most, one by one, only until it fits. Trees without these keys draw exactly as before. */
  function tree(s) {
    const groups = treeGroups(s);
    if (s.wrap === true) return treeDraw(s, new Set(groups)).svg;
    let r = treeDraw(s, new Set());
    const lim = num(s.w, 0);
    if ((s.phone || s.wrap === 'auto') && lim > 0 && r.W > lim && groups.length) {
      const on = new Set();
      while (r.W > lim) {
        const best = groups.filter(g => !on.has(g)).map(g => { const t = new Set(on).add(g); return [t, treeDraw(s, t)]; }).reduce((m, c) => (!m || c[1].W < m[1].W ? c : m), null);
        if (!best || best[1].W >= r.W) break;
        on.clear(); best[0].forEach(g => on.add(g)); r = best[1];
      }
    }
    return r.svg;
  }
  function treeDraw(s, stack) {
    const elab = (function has(n) { return !!n && (n.edge != null || (n.children || []).some(has)); })(s.root);   // edge labels: roomier defaults
    const R = num(s.r, 18), gapX = num(s.gapX, elab ? 30 : 14);
    const hl = new Set((s.highlight || []).map(String));
    const bin = !!s.binary;
    // a binary node with one child keeps an empty slot as wide as a leaf (or "gap" px) for the missing one, so the lone child sits
    // clearly to its side, like one of a pair of leaves (it used to sit almost straight below)
    const lone = num(s.gap, 2 * R + 8);
    const NL = 12.5;                                                 // a note's line height (10 px text)
    let tall = 0, noteGap = 0;                                       // tallest multi-line node box (0: none, spacing as before); room for a multi-line note
    const own = n => { const B = treeBox(n, R); return B.box ? B.w + 14 : 2 * R; };
    function measure(n, slot) {
      if (!n) return { w: bin ? slot : 0, n: null };
      const kids = (n.children || []);
      const B = treeBox(n, R);
      if (B.h > 26) tall = Math.max(tall, B.h);
      if (stack.has(n)) {                                            // stacked leaves: down a line from the node's middle, each on its own row
        kids.forEach(k => { const Bk = treeBox(k, R); if (Bk.h > 26) tall = Math.max(tall, Bk.h); });
        const lw = Math.max(0, ...kids.map(k => (k.edge != null ? tw(plain(String(k.edge)), 11) + 6 : 0)));
        const indent = Math.max(22, lw + 16), o = Math.max(2 * R + 8, B.w + 14), tx = B.box ? 14 : o / 2;   // the line leaves a box near its left end
        return { w: Math.max(o, tx + indent + Math.max(...kids.map(own)) + 6), n, ms: [], stacked: kids, o, indent, tx };
      }
      const one = bin && kids.length === 2 && kids.filter(Boolean).length === 1;
      const ms = kids.map(k => measure(k, one ? lone : R));
      const wk = ms.reduce((a, m) => a + m.w, 0) + Math.max(0, ms.length - 1) * gapX;
      if (noteN(n) > 1 && kids.some(Boolean)) noteGap = Math.max(noteGap, B.half + 11 + (noteN(n) - 1) * NL + 8 + Math.max(R, ...kids.filter(Boolean).map(k => treeBox(k, R).half)));
      return { w: Math.max(Math.max(2 * R + 8, B.w + 14), wk), n, ms };
    }
    const m = measure(s.root, R);
    const gapY = num(s.gapY, Math.max(elab ? 74 : 52, tall ? tall + 30 : 0, noteGap)), y0 = tall ? Math.max(22, treeBox(s.root, R).h / 2 + 6) : 22;
    const nodes = [], edges = [], stubs = [];
    let maxD = 0;
    function place(m, x0, d, parent) {
      if (!m.n) return;
      maxD = Math.max(maxD, d);
      const cx = m.stacked ? x0 + m.o / 2 : x0 + m.w / 2;
      const me = { x: cx, y: y0 + d * gapY, n: m.n, tx: m.stacked ? x0 + m.tx : cx };
      nodes.push(me);
      if (parent) edges.push([parent, me]);
      if (m.stacked) {
        const Bp = treeBox(m.n, R);
        let y = Math.max(me.y + gapY, me.y + Bp.half + (noteN(m.n) ? 6 + noteN(m.n) * NL : 0) + 12 + treeBox(m.stacked[0], R).half);
        m.stacked.forEach((k, i) => {
          const B = treeBox(k, R), w = own(k);
          if (i) y += B.half;
          const leaf = { x: me.tx + m.indent + w / 2, y, n: k, stub: true };
          nodes.push(leaf); stubs.push([me, leaf]);
          y += B.half + (noteN(k) ? 6 + noteN(k) * NL : 0) + 12;
        });
        return;
      }
      let cur = x0 + (m.w - (m.ms.reduce((a, k) => a + k.w, 0) + Math.max(0, m.ms.length - 1) * gapX)) / 2;
      m.ms.forEach(k => { if (k.n) place(k, cur, d + 1, me); cur += k.w + gapX; });
    }
    place(m, 10, 0, null);
    const el = elab ? treeEdgeLabels(nodes, edges, R) : null;
    const sx = el && el.x0 < 4 ? 4 - el.x0 : 0;
    let W, H;
    const dy = s.title ? top(s) - 8 : 0;
    if (!stubs.length && !nodes.some(nd => noteN(nd.n) > 1)) {      // as before
      const low = tall ? Math.max(...nodes.filter(nd => nd.y === y0 + maxD * gapY).map(nd => treeBox(nd.n, R).half)) : R;
      W = el ? Math.max(m.w + 20, el.x1 + 6) + sx : m.w + 20; H = y0 + maxD * gapY + low + 14 + (nodes.some(nd => nd.y === y0 + maxD * gapY && nd.n.note) ? 14 : 0) + dy;   // a note under a bottom-row node needs room
    } else {
      const bottom = Math.max(...nodes.map(nd => { const B = treeBox(nd.n, R); return nd.y + B.half + (noteN(nd.n) ? 6 + noteN(nd.n) * NL : 0); }));
      W = el ? Math.max(m.w + 20, el.x1 + 6) + sx : m.w + 20; H = bottom + 14 + dy;
    }
    let o = sx ? `<g transform="translate(${f(sx)} ${dy})">` : `<g transform="translate(0 ${dy})">`;
    edges.forEach(([a, b]) => (o += b.n.edgeColor != null ? `<g class="${kc(b.n.edgeColor)} tr-c"><line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" class="dg-axis tr-e"/></g>` : `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" class="dg-axis"/>`));
    // stacked leaves: one line down the parent's middle to its last leaf, a short arm into each leaf (a coloured leaf colours its arm and the line down to it)
    const trunks = new Map(); stubs.forEach(([a, b]) => trunks.set(a, Math.max(trunks.get(a) || a.y, b.y)));
    trunks.forEach((y2, a) => (o += `<line x1="${f(a.tx)}" y1="${f(a.y)}" x2="${f(a.tx)}" y2="${f(y2)}" class="dg-axis"/>`));
    let sl = '';
    stubs.forEach(([a, b]) => {
      const line = `<line x1="${f(a.tx)}" y1="${f(b.y)}" x2="${f(b.x)}" y2="${f(b.y)}" class="dg-axis${b.n.edgeColor != null ? ' tr-e' : ''}"/>`;
      o += b.n.edgeColor != null ? `<g class="${kc(b.n.edgeColor)} tr-c"><line x1="${f(a.tx)}" y1="${f(a.y)}" x2="${f(a.tx)}" y2="${f(b.y)}" class="dg-axis tr-e"/>${line}</g>` : line;
      if (b.n.edge != null) { const tx = OT(a.tx + 7, b.y - 9, String(b.n.edge), { size: 11, weight: 700, cls: 'dt del tr-el', anchor: 'start' }); sl += b.n.edgeColor != null ? `<g class="${kc(b.n.edgeColor)} tr-c">${tx}</g>` : tx; }
    });
    nodes.forEach(nd => {
      const lab = String(nd.n.label), on = hl.has(lab) || nd.n.hl;
      const c = nd.n.color ? kc(nd.n.color) : on ? 'k2' : 'k8';
      const B = treeBox(nd.n, R), nn = noteN(nd.n);
      // a note sits under its node, its first line just below the box (a note of several lines grows downward); over the lines to the
      // children, a note gets a halo
      const up = nd.tx != null && nd.tx !== nd.x;                    // a stacked parent: its note starts right of the line down to its leaves
      const note = nn ? T(up ? nd.tx + 7 : nd.x, nd.y + B.half + 11 + ((nn - 1) * NL) / 2, nd.n.note, { size: 10, cls: (nd.n.children || []).some(Boolean) ? 'dt dtm del' : 'dt dtm', anchor: up ? 'start' : 'middle' }) : '';
      o += `<g class="${c}">${B.box ? `<rect x="${f(nd.x - B.w / 2 - 7)}" y="${f(nd.y - B.h / 2)}" width="${f(B.w + 14)}" height="${B.h}" rx="8" class="nb${on || nd.n.color ? '' : ' plain'}"/>` : `<circle cx="${f(nd.x)}" cy="${f(nd.y)}" r="${R}" class="nb${on || nd.n.color ? '' : ' plain'}"/>`}${T(nd.x, nd.y, lab, { size: 12, weight: 650 })}${note}</g>`;
    });
    if (el) o += el.svg;
    o += sl;
    return { W, svg: wrap(s, W, H, o + '</g>', ` style="max-width:${f(W)}px${W > 440 ? `;min-width:${f(W * 0.7)}px` : ''}"`) };   // the BST lab rewrites this style; wide trees scroll on phones rather than shrink past 70 %
  }
  // tree edge labels ("edge" on a child node): beside the edge's middle, on its outer side, clear of every node and of each other
  function treeEdgeLabels(nodes, edges, R) {
    const boxes = [];
    nodes.forEach(nd => {
      const B = treeBox(nd.n, R);
      boxes.push(B.box ? [nd.x - B.w / 2 - 8, nd.y - B.h / 2 - 1, nd.x + B.w / 2 + 8, nd.y + B.h / 2 + 1] : [nd.x - R - 1, nd.y - R - 1, nd.x + R + 1, nd.y + R + 1]);
      if (nd.n.note) { const ls = String(nd.n.note).split('\n'), w = Math.max(...ls.map(l => tw(l, 10))); boxes.push([nd.x - w / 2 - 2, nd.y + B.half + 4, nd.x + w / 2 + 2, nd.y + B.half + 18 + (ls.length - 1) * 12.5]); }
    });
    const hit = b => boxes.some(q => q[0] < b[2] && q[2] > b[0] && q[1] < b[3] && q[3] > b[1]);
    let svg = '', x0 = Infinity, x1 = -Infinity;
    edges.forEach(([a, b]) => {
      if (b.n.edge == null) return;
      const t0 = String(b.n.edge), w = tw(plain(t0), 11) + 6, h = 15;
      const L = Math.hypot(b.x - a.x, b.y - a.y) || 1, ux = (b.x - a.x) / L, uy = (b.y - a.y) / L;
      const [nx, ny] = b.x - a.x < -0.01 ? [-uy, ux] : [uy, -ux];
      const off = 5 + Math.abs(nx) * (w / 2) + Math.abs(ny) * (h / 2);
      const at = t => { const cx = a.x + (b.x - a.x) * t + nx * off, cy = a.y + (b.y - a.y) * t + ny * off; return [cx, cy, [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2]]; };
      const pick = [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74].map(at).find(c => !hit(c[2])) || at(0.5);
      boxes.push(pick[2]); x0 = Math.min(x0, pick[2][0]); x1 = Math.max(x1, pick[2][2]);
      const tx = OT(pick[0], pick[1], t0, { size: 11, weight: 700, cls: 'dt del tr-el' });
      svg += b.n.edgeColor != null ? `<g class="${kc(b.n.edgeColor)} tr-c">${tx}</g>` : tx;
    });
    return { svg, x0: isFinite(x0) ? x0 : 10, x1: isFinite(x1) ? x1 : 0 };
  }

  /* ============================================================== table (HTML) */
  function table(s) {
    const al = s.align || [];
    const cc = s.cells || {};
    // header cells (column heads and rowLabels) are capitalised by CSS; maths, symbols, digits and one-letter variables keep their case (md.headKeep)
    const kcH = (h, k) => (GA.md && GA.md.headKeep && GA.md.headKeep(String(h)) ? ` class="${k ? `tc-${esc(k)} ` : ''}kc"` : k ? ` class="tc-${esc(k)}"` : '');
    const th = (s.head || []).map((h, i) => `<th${kcH(h)}${al[i] ? ` style="text-align:${al[i]}"` : ''}>${GA.md ? GA.md.inline(String(h)) : esc(h)}</th>`).join('');
    const body = (s.rows || []).map((r, ri) => `<tr${s.rowClass && s.rowClass[ri] ? ` class="${esc(s.rowClass[ri])}"` : ''}>${r.map((c, ci) => {
      const k = cc[ri + ',' + ci], rl = s.rowLabels && ci === 0;
      return `<${rl ? 'th scope="row"' : 'td'}${rl ? kcH(c, k) : k ? ` class="tc-${esc(k)}"` : ''}${al[ci] ? ` style="text-align:${al[ci]}"` : ''}>${GA.md ? GA.md.inline(String(c)) : esc(c)}</${rl ? 'th' : 'td'}>`;
    }).join('')}</tr>`).join('');
    return `<div class="tw dg-table">${s.title ? `<div class="dg-tt">${esc(s.title)}</div>` : ''}<table class="t">${th ? `<thead><tr>${th}</tr></thead>` : ''}<tbody>${body}</tbody></table></div>`;
  }

  /* ============================================================== memory */
  function memory(s) {
    if (s.phone) return memoryPhone(s);
    const bl = s.blocks || [];
    const horiz = s.orientation === 'h';
    const W = num(s.w, horiz ? 640 : 420), minH = num(s.minH, 30);
    const total = bl.reduce((a, b) => a + (num(b.size, 1)), 0) || 1;
    if (horiz) {
      const L = 8, bw = W - 16, hgt = 54, y = top(s) + (bl.some(b => b.addr != null) ? 24 : 8);
      let x = L, o = '';
      bl.forEach((b, i) => {
        const w = Math.max(28, (num(b.size, 1) / total) * bw), c = b.kind === 'free' || b.kind === 'hole' ? 'kmute' : kc(b.color, i);
        o += `<g class="${c}"><rect x="${f(x)}" y="${y}" width="${f(w)}" height="${hgt}" class="nb${b.kind === 'free' || b.kind === 'hole' ? ' idle' : ''}"/>${T(x + w / 2, y + hgt / 2 - (b.note ? 6 : 0), b.label, { size: 11.5, weight: 650 })}${b.note ? T(x + w / 2, y + hgt / 2 + 9, b.note, { size: 10, cls: 'dt dtm' }) : ''}${b.addr != null ? T(x, y - 8, b.addr, { size: 10, anchor: 'start', cls: 'dt dtm', mono: true }) : ''}</g>`;
        x += w;
      });
      (s.brackets || []).forEach(br => { o += `<path d="M${L + 2} ${y + hgt + 8} h${bw - 4}" class="dg-axis"/>` + T(W / 2, y + hgt + 22, br.label, { size: 10.5, cls: 'dt dtm' }); });
      return wrap(s, W, y + hgt + ((s.brackets || []).length ? 40 : 10), o);     // the band under the bar only holds bracket notes (P3-10)
    }
    const L = 74, bw = num(s.bw, 190), RX = L + bw + 14;
    let y = top(s) + 4, o = '';
    const rows = bl.map(b => ({ b, h: Math.max(minH, (num(b.size, 1) / total) * num(s.h, 280)) }));
    rows.forEach(({ b, h }, i) => {
      const c = b.kind === 'free' || b.kind === 'hole' ? 'kmute' : kc(b.color, i);
      o += `<g class="${c}"><rect x="${L}" y="${f(y)}" width="${bw}" height="${f(h)}" class="nb${b.kind === 'free' || b.kind === 'hole' ? ' idle' : ''}"/>${T(L + bw / 2, y + h / 2, b.label, { size: 12, weight: 650 })}</g>`;
      if (b.addr != null) o += T(L - 8, y + 6, b.addr, { anchor: 'end', size: 10, cls: 'dt dtm', mono: true });
      if (b.note) o += T(RX, y + h / 2, b.note, { anchor: 'start', size: 11, cls: 'dt dtm' });
      y += h;
    });
    (s.brackets || []).forEach(br => {
      let ya = top(s) + 4, yb = ya;
      let acc = ya; rows.forEach(({ h }, i) => { if (i === br.from) ya = acc; acc += h; if (i === br.to) yb = acc; });
      const bx = RX + num(br.dx, 130);
      o += `<path d="M${bx - 8} ${f(ya + 2)} q8 0 8 8 V${f(yb - 10)} q0 8 -8 8" class="dg-axis" fill="none"/>${T(bx + 14, (ya + yb) / 2, br.label, { anchor: 'start', size: 11, weight: 650, cls: 'dt dtm' })}`;
    });
    return wrap(s, W + (s.brackets ? 120 : 0), y + 12, o);
  }

  // phone width, horizontal map: the bar wraps across the column in strips, like a line of text, so what its title promises still holds
  // (byte offsets above each block, widths to scale). One strip when every block keeps its label at about its true width; otherwise the
  // desktop's scale (`w0`, the width it was drawn at), wrapped. A block narrower than its label is drawn as wide as the label ('nearly to
  // scale', as on the desktop); a block wider than a strip continues on the next ('label …'). Bracket notes go under the last strip.
  function memoryStrips(s) {
    const bl = s.blocks || [], W = num(s.w, 340), L = 8, bw = W - 16, Wd = num(s.w0, 640), LS = 11.5, LH = LS * 1.25, NH = PFS * 1.25, MINP = 48;
    const size = bl.map(b => Math.max(1e-6, num(b.size, 1))), total = size.reduce((a, b) => a + b, 0) || 1;
    const longest = (t, px) => Math.max(0, ...words(String(t == null ? '' : t)).map(w => tw(w, px)));
    // the narrowest a block may be: its longest word, its note's and its offset's (needMin); roomier, a short label (up to ten
    // characters) in one line (need)
    const short = t => (String(t == null ? '' : t).length <= 10 ? tw(String(t), LS) : 0);
    const base = b => Math.max(30, longest(b.label, LS), b.note ? longest(b.note, PFS) : 0, b.addr != null ? tw(String(b.addr), PFS) + 4 : 0);
    const needMin = bl.map(b => Math.ceil(base(b) + 12)), needNice = bl.map(b => Math.ceil(Math.max(base(b), short(b.label)) + 14));
    const sum = a => a.reduce((x, y) => x + y, 0);
    const k1 = bw / total, oneStrip = bl.every((b, i) => size[i] * k1 >= 0.75 * needMin[i]) && sum(needMin) <= bw;
    let width;
    if (oneStrip) {                                                      // the scale at which the clamped blocks and the rest fill the strip exactly
      const need = sum(needNice) <= bw ? needNice : needMin;
      let k = k1;
      for (let it = 0; it < 8; it++) {
        let fixed = 0, free = 0;
        size.forEach((z, i) => { if (z * k < need[i]) fixed += need[i]; else free += z; });
        if (!free) break;
        k = Math.max(0, bw - fixed) / free;
      }
      width = size.map((z, i) => Math.max(need[i], z * k));
    } else {
      const k = Math.max(k1, (Wd - 16) / total);
      width = size.map((z, i) => Math.max(needNice[i], z * k));
    }
    // pack: a block that does not fit the rest of a strip starts the next one; one wider than a strip fills whole strips (starting on this
    // one only when at least 40 % of it is free), and its last piece is never a sliver
    const strips = [[]];
    let rem = bw;
    const add = p => { strips[strips.length - 1].push(p); rem -= p.w; };
    const next = () => { strips.push([]); rem = bw; };
    width.forEach((w, i) => {
      if (w <= rem + 0.5) return add({ i, w, first: true });
      if (w <= bw + 0.5) { next(); return add({ i, w: Math.min(w, bw), first: true }); }
      if (strips[strips.length - 1].length && rem < bw * 0.4) next();
      let left = w, first = true;
      while (left > 0.5) {
        let take = Math.min(left, rem);
        if (left - take > 0.5 && left - take < MINP) take = Math.max(MINP, left - MINP);
        add({ i, w: take, first, more: left - take > 0.5 });
        left -= take; first = false;
        if (left > 0.5) next();
      }
    });
    const lab = p => {
      const t = String(bl[p.i].label == null ? '' : bl[p.i].label);
      return p.first ? t : t && longest(t + ' …', LS) + 10 <= p.w ? t + ' …' : '…';
    };
    const lines = p => {
      const l = wrapText(lab(p), Math.max(20, p.w - 10), LS), n = p.first && bl[p.i].note ? wrapText(bl[p.i].note, Math.max(20, p.w - 10), PFS) : '';
      return { l, n, h: nLines(l) * LH + (n ? 3 + nLines(n) * NH : 0) };
    };
    let y = top(s) + (strips[0].some(p => p.first && bl[p.i].addr != null) ? 18 : 4), o = '';
    strips.forEach((st, j) => {
      if (j) y += st.some(p => p.first && bl[p.i].addr != null) ? 22 : 8;
      const ls = st.map(lines), H = Math.max(44, ...ls.map(t => t.h + 14));
      let x = L;
      st.forEach((p, k) => {
        const b = bl[p.i], free = b.kind === 'free' || b.kind === 'hole', c = free ? 'kmute' : kc(b.color, p.i), t = ls[k], ty = y + H / 2 - t.h / 2;
        // a block cut by the strip's end keeps that edge open, dashed: it continues on the next strip
        const cutR = p.more, cutL = !p.first, nb = `nb${free ? ' idle' : ''}`, x1 = x + p.w, y1 = y + H;
        const box = !cutR && !cutL ? `<rect x="${f(x)}" y="${f(y)}" width="${f(p.w)}" height="${f(H)}" class="${nb}"/>`
          : `<rect x="${f(x)}" y="${f(y)}" width="${f(p.w)}" height="${f(H)}" class="${nb}" style="stroke:none"/>` +
            `<path d="M${f(x)} ${f(y)} H${f(x1)}${cutR ? ` M${f(x1)} ${f(y1)}` : ` V${f(y1)}`} H${f(x)}${cutL ? '' : ` V${f(y)}`}" class="${nb}" style="fill:none"/>` +
            (cutR ? `<path d="M${f(x1)} ${f(y)} V${f(y1)}" class="${nb} mm-cut" style="fill:none"/>` : '') + (cutL ? `<path d="M${f(x)} ${f(y)} V${f(y1)}" class="${nb} mm-cut" style="fill:none"/>` : '');
        o += `<g class="${c}">${box}` +
          (p.w >= 24 ? T(x + p.w / 2, ty + (nLines(t.l) * LH) / 2, t.l, { size: LS, weight: 650 }) : '') +
          (t.n ? T(x + p.w / 2, ty + nLines(t.l) * LH + 3 + (nLines(t.n) * NH) / 2, t.n, { size: PFS, cls: 'dt dtm' }) : '') + '</g>';
        if (p.first && b.addr != null) o += T(x + 1, y - 8, b.addr, { anchor: 'start', size: PFS, cls: 'dt dtm', mono: true });
        x += p.w;
      });
      y += H;
    });
    let Hh = y + 6;
    (s.brackets || []).forEach(br => {
      const t = wrapText(br.label, W - 20, PFS), n = nLines(t);
      o += `<path d="M${L + 2} ${f(Hh + 2)} h${f(bw - 4)}" class="dg-axis"/>${T(W / 2, Hh + 12 + ((n - 1) * NH) / 2, t, { size: PFS, cls: 'dt dtm' })}`;
      Hh += 18 + n * NH;
    });
    return wrap(s, W, Hh + 4, o);
  }
  // phone width, vertical map: one block per row across the column (sizes become heights), label and note inside, addresses on the left,
  // brackets on the right, as on the desktop
  function memoryPhone(s) {
    if (s.orientation === 'h') return memoryStrips(s);
    const bl = s.blocks || [], horiz = s.orientation === 'h', W = num(s.w, 340);
    const total = bl.reduce((a, b) => a + num(b.size, 1), 0) || 1;
    const aw = bl.filter(b => b.addr != null).map(b => tw(String(b.addr), PFS));
    const L = aw.length ? Math.min(96, Math.ceil(Math.max(...aw)) + 12) : 8;
    const side = horiz ? [] : s.brackets || [];
    const sideW = side.length ? Math.min(118, Math.ceil(Math.max(...side.map(br => Math.max(...wrapText(br.label, 92, 11).split('\n').map(l => tw(l, 11)))))) + 26) : 0;
    const bw = W - L - 8 - sideW, y0 = top(s) + 4, LH = 11.5 * 1.25, NH = PFS * 1.25;
    const lab = bl.map(b => wrapText(b.label, bw - 14, 11.5)), note = bl.map(b => (b.note ? wrapText(b.note, bw - 14, PFS) : ''));
    const Hp = horiz ? Math.max(200, bl.length * 40) : num(s.h, 280);
    const rows = bl.map((b, i) => Math.max(12 + nLines(lab[i]) * LH + (note[i] ? 3 + nLines(note[i]) * NH : 0), num(s.minH, 30), (num(b.size, 1) / total) * Hp));
    let y = y0, o = '';
    rows.forEach((h, i) => {
      const b = bl[i], free = b.kind === 'free' || b.kind === 'hole', c = free ? 'kmute' : kc(b.color, i);
      const lh = nLines(lab[i]) * LH, nh = note[i] ? 3 + nLines(note[i]) * NH : 0, ty = y + h / 2 - (lh + nh) / 2;
      o += `<g class="${c}"><rect x="${L}" y="${f(y)}" width="${f(bw)}" height="${f(h)}" class="nb${free ? ' idle' : ''}"/>${T(L + bw / 2, ty + lh / 2, lab[i], { size: 11.5, weight: 650 })}${note[i] ? T(L + bw / 2, ty + lh + 3 + (nh - 3) / 2, note[i], { size: PFS, cls: 'dt dtm' }) : ''}</g>`;
      if (b.addr != null) o += T(L - 6, y + 8, b.addr, { anchor: 'end', size: PFS, cls: 'dt dtm', mono: true });
      y += h;
    });
    side.forEach(br => {
      let ya = y0, yb = y0, acc = y0;
      rows.forEach((h, i) => { if (i === br.from) ya = acc; acc += h; if (i === br.to) yb = acc; });
      const bx = L + bw + 12;
      o += `<path d="M${bx - 6} ${f(ya + 2)} q6 0 6 6 V${f(yb - 8)} q0 6 -6 6" class="dg-axis" fill="none"/>${T(bx + 8, (ya + yb) / 2, wrapText(br.label, sideW - 24, 11), { anchor: 'start', size: 11, weight: 650, cls: 'dt dtm' })}`;
    });
    let H = y + 6;
    if (horiz) (s.brackets || []).forEach(br => {
      const t = wrapText(br.label, W - 20, PFS), n = nLines(t);
      o += `<path d="M${L + 2} ${f(H + 2)} h${f(bw - 4)}" class="dg-axis"/>${T(W / 2, H + 12 + ((n - 1) * NH) / 2, t, { size: PFS, cls: 'dt dtm' })}`;
      H += 18 + n * NH;
    });
    return wrap(s, W, H + 4, o);
  }

  /* ============================================================== seq */
  /* A long text wraps to fit: a box on a lane may reach to just short of the neighbouring lanes' lines (an outer lane's box stays inside
     the drawing), an arrow's text that would run past the drawing wraps to its span, a note to its width, a long lane name widens its box
     (up to its column) and then wraps; a row with wrapped text grows taller. Text that fits draws as before. */
  function seq(s) {
    const lanes = s.lanes || [], n = lanes.length, W = num(s.w, Math.max(480, n * 150)), colW = W / n;
    const X = l => colW * (lanes.indexOf(l) + 0.5);
    const rowH = num(s.rowH, 34), LH = 13.75;
    const ev = s.events || [];
    const LC = s.laneColors || {};                                   // optional colour per lane: {"lane": "a".."h"} or an array
    const lk = (l, c) => kc(c != null ? c : Array.isArray(LC) ? LC[lanes.indexOf(l)] : LC[l], lanes.indexOf(l));
    const lines = t => String(t == null ? '' : t).split('\n').length;
    // lane heads: 104 px boxes; a name too long for that gets a wider box (up to its column) and, if it still does not fit, two lines
    const head = lanes.map(l => { const t0 = String(l), w0 = tw(t0, 11.5); if (w0 + 8 <= 104 && !t0.includes('\n')) return { t: t0, w: 104 }; const bw = Math.min(Math.max(104, w0 + 16), colW - 6); const t = w0 + 16 > bw ? wrapEven(t0, bw - 14, 11.5) : t0; return { t, w: Math.max(104, Math.min(bw, Math.max(...t.split('\n').map(x => tw(x, 11.5))) + 16)) }; });
    const hh = 26 + (Math.max(1, ...head.map(h => lines(h.t))) - 1) * 14.4;
    const y0 = top(s) + 36 + (hh - 26);
    // each event's text, box size and row height
    const rows = ev.map(e => {
      if (e.from && e.to) {
        const a = X(e.from), b = X(e.to), t0 = String(e.text || ''), w0 = tw(t0, 11), span = Math.abs(b - a), mid = (a + b) / 2;
        const out = mid - w0 / 2 < 4 || mid + w0 / 2 > W - 4;
        const t = out ? wrapEven(t0, Math.max(span - 12, Math.min(colW, 140), 60), 11) : t0;
        return { t, h: rowH + (lines(t) - 1) * LH };
      }
      if (e.note) {
        const ls = (e.over || [lanes[0]]).map(X), a = Math.max(2, Math.min(...ls) - 54), b = Math.min(W - 2, Math.max(...ls) + 54), t0 = String(e.note);
        const t = tw(t0, 11) + 12 > b - a ? wrapEven(t0, b - a - 14, 11) : t0;
        return { t, a, b, bh: 26 + (lines(t) - 1) * LH, h: rowH + (lines(t) - 1) * LH };
      }
      // a box may reach to 8 px short of the next lane's line on each side (to the drawing's edge on an outer lane); a longer text wraps
      const li = lanes.indexOf(e.lane), lo = li > 0 ? X(lanes[li - 1]) + 8 : 2, hi = li >= 0 && li < n - 1 ? X(lanes[li + 1]) - 8 : W - 2;
      const t0 = String(e.text == null ? '' : e.text), w0 = Math.max(70, tw(t0, 11) + 16);
      const t = w0 > hi - lo && !t0.includes('\n') ? wrapEven(t0, Math.max(54, hi - lo - 16), 11) : t0;
      const w = lines(t) > 1 ? Math.max(70, Math.max(...t.split('\n').map(x => tw(x, 11))) + 16) : w0;
      return { t, w, lo, hi, bh: 24 + (lines(t) - 1) * LH, h: rowH + (lines(t) - 1) * LH };
    });
    const H = y0 + rows.reduce((t, r) => t + r.h, 0) + 24;
    let o = '';
    lanes.forEach((l, i) => (o += `<g class="${lk(l)}"><rect x="${f(X(l) - head[i].w / 2)}" y="${top(s) + 2}" width="${f(head[i].w)}" height="${f(hh)}" rx="8" class="nb"/>${T(X(l), top(s) + 2 + hh / 2, head[i].t, { size: 11.5, weight: 700 })}<line x1="${f(X(l))}" x2="${f(X(l))}" y1="${f(top(s) + 2 + hh)}" y2="${H - 10}" class="dg-life"/></g>`));
    let yt = y0;
    ev.forEach((e, i) => {
      const r = rows[i], y = yt + r.h - rowH / 2, yc = yt + r.h / 2;   // an arrow keeps its line at the foot of its row, under its text
      yt += r.h;
      if (e.from && e.to) {
        const a = X(e.from), b = X(e.to), dir = b > a ? 1 : -1;
        o += `<g class="${lk(e.from, e.color)}"><line x1="${f(a)}" x2="${f(b - dir * 3)}" y1="${f(y)}" y2="${f(y)}" class="de${e.style === 'dashed' ? ' dashed' : ''}" marker-end="url(#ah)"/>${T((a + b) / 2, y - 10 - ((lines(r.t) - 1) * LH) / 2, r.t, { size: 11, weight: 600 })}</g>`;
      } else if (e.note) {
        o += `<g class="kmute"><rect x="${f(r.a)}" y="${f(yc - r.bh / 2)}" width="${f(r.b - r.a)}" height="${f(r.bh)}" rx="6" class="nb idle"/>${T((r.a + r.b) / 2, yc, r.t, { size: 11 })}</g>`;
      } else {
        const x = r.w <= r.hi - r.lo ? Math.max(r.lo + r.w / 2, Math.min(r.hi - r.w / 2, X(e.lane))) : X(e.lane), c = e.kind === 'block' ? 'kwarn' : e.kind === 'ok' ? 'kok' : e.kind === 'bad' ? 'kbad' : lk(e.lane, e.color);
        o += `<g class="${c}"><rect x="${f(x - r.w / 2)}" y="${f(yc - r.bh / 2)}" width="${f(r.w)}" height="${f(r.bh)}" rx="7" class="nb"/>${T(x, yc, r.t, { size: 11, weight: 600 })}</g>`;
      }
      if (e.t != null) o += T(8, yc, e.t, { anchor: 'start', size: 10, cls: 'dt dtm', mono: true });
    });
    return wrap(s, W, H, o, minW(W));
  }

  /* ============================================================== layers */
  function layers(s) {
    if (s.phone) return layersPhone(s);
    const ls = s.layers || [], W = num(s.w, 560), h = num(s.layerH, 46), L = 12, bw = W - 24 - (s.side ? 110 : 0);
    let o = '';
    ls.forEach((l, i) => {
      const y = top(s) + 4 + i * (h + 6);
      o += `<g class="${kc(l.color, i)}"><rect x="${L}" y="${y}" width="${bw}" height="${h}" rx="10" class="nb"/>${T(L + 16, y + h / 2 - (l.note ? 7 : 0), l.label, { anchor: 'start', size: 13, weight: 700 })}${l.note ? T(L + 16, y + h / 2 + 10, l.note, { anchor: 'start', size: 10.5, cls: 'dt dtm' }) : ''}${l.right ? T(L + bw - 14, y + h / 2, l.right, { anchor: 'end', size: 11, cls: 'dt dtm' }) : ''}</g>`;
    });
    const H = top(s) + 4 + ls.length * (h + 6);
    (s.side || []).forEach(sd => {
      const x = L + bw + 34;
      o += `<line x1="${x}" x2="${x}" y1="${top(s) + 6}" y2="${H - 10}" class="de" ${sd.arrow === 'up' ? 'marker-start' : 'marker-end'}="url(#ah)"/>${T(x + 12, H / 2, sd.label, { anchor: 'start', size: 11, cls: 'dt dtm' })}`;
    });
    return wrap(s, W, H + 6, o);
  }

  // phone width: a layer's right-hand label moves under its name when both do not fit, notes wrap, and each layer grows to hold its lines
  function layersPhone(s) {
    const ls = s.layers || [], W = num(s.w, 340), L = 8, sideW = s.side ? 92 : 0, bw = W - 16 - sideW, y0 = top(s) + 4;
    const LH = 13 * 1.25, NH = PFS * 1.25;
    const items = ls.map(l => {
      const right = l.right != null ? String(l.right) : '';
      const beside = !!right && tw(l.label, 13) + tw(right, PFS) + 44 <= bw;
      const label = wrapText(l.label, (beside ? bw - 40 - tw(right, PFS) : bw - 28), 13);
      const rt = right && !beside ? wrapText(right, bw - 28, PFS) : '';
      const note = l.note ? wrapText(l.note, bw - 28, PFS) : '';
      const lh = nLines(label) * LH, rh = rt ? 2 + nLines(rt) * NH : 0, nh = note ? 3 + nLines(note) * NH : 0;
      return { l, right, beside, label, rt, note, lh, rh, nh, hh: Math.max(num(s.layerH, 46), 14 + lh + rh + nh) };
    });
    let y = y0, o = '';
    items.forEach((it, i) => {
      let ty = y + it.hh / 2 - (it.lh + it.rh + it.nh) / 2;
      const top1 = ty + LH / 2;                                       // the name's first line: a right label that fits sits on it
      o += `<g class="${kc(it.l.color, i)}"><rect x="${L}" y="${f(y)}" width="${f(bw)}" height="${f(it.hh)}" rx="10" class="nb"/>${T(L + 14, ty + it.lh / 2, it.label, { anchor: 'start', size: 13, weight: 700 })}`;
      ty += it.lh;
      if (it.rt) { o += T(L + 14, ty + 2 + (it.rh - 2) / 2, it.rt, { anchor: 'start', size: PFS, weight: 650, cls: 'dt dtm' }); ty += it.rh; }
      if (it.note) o += T(L + 14, ty + 3 + (it.nh - 3) / 2, it.note, { anchor: 'start', size: PFS, cls: 'dt dtm' });
      if (it.beside) o += T(L + bw - 12, top1, it.right, { anchor: 'end', size: PFS, cls: 'dt dtm' });
      o += '</g>';
      y += it.hh + 6;
    });
    const H = y;
    (s.side || []).forEach(sd => {
      const x = L + bw + 20;
      o += `<line x1="${x}" x2="${x}" y1="${y0 + 2}" y2="${f(H - 10)}" class="de" ${sd.arrow === 'up' ? 'marker-start' : 'marker-end'}="url(#ah)"/>${T(x + 9, H / 2, wrapText(sd.label, W - x - 13, PFS), { anchor: 'start', size: PFS, cls: 'dt dtm' })}`;
    });
    return wrap(s, W, H + 6, o);
  }

  /* ============================================================== bits */
  function bits(s) {
    const width = num(s.width, 32), W = num(s.w, 640), L = 8, bw = W - 16, unit = bw / width, rh = num(s.rowH, 38);
    const fields = (s.fields || []);
    let o = '', x = 0, row = 0, y0 = top(s) + 14;
    if (s.msb) {   // number bits from the right (bit width-1 on the left), labels centred on the bit: address lines A15..A0, register bits
      for (let i = 0; i < width; i++) { const b = width - 1 - i; if (width <= 16 || b % 4 === 3 || b === 0) o += T(L + (i + 0.5) * unit, y0 - 8, b, { size: 10, cls: 'dt dtm' }); }
    } else for (let i = 0; i <= width; i += (width > 16 ? 4 : 1)) { if (i < width || true) o += T(L + i * unit, y0 - 8, i < width ? i : '', { size: 10, cls: 'dt dtm' }); }
    fields.forEach((fl, i) => {
      let left = fl.bits;
      while (left > 0) {
        const take = Math.min(left, width - x), c = kc(fl.color, i);
        o += `<g class="${c}"><rect x="${f(L + x * unit)}" y="${y0 + row * rh}" width="${f(take * unit)}" height="${rh}" class="nb sq"/>${take * unit > tw(fl.label, 11) * 0.7 ? T(L + (x + take / 2) * unit, y0 + row * rh + rh / 2 - (fl.bits === left && fl.sub ? 6 : 0), fl.label + (left < fl.bits ? ' …' : ''), { size: 11, weight: 650 }) : ''}${fl.sub && fl.bits === left ? T(L + (x + take / 2) * unit, y0 + row * rh + rh / 2 + 9, fl.sub, { size: 10, cls: 'dt dtm' }) : ''}<title>${esc(mathPlain(fl.label))} (${fl.bits} bits)</title></g>`;
        x += take; left -= take;
        if (x >= width) { x = 0; row++; }
      }
    });
    const rows = row + (x ? 1 : 0);
    return wrap(s, W, y0 + rows * rh + 12, o);
  }

  /* ============================================================== flow */
  /* Layers by longest path (loops found by DFS go round the side). A flow is laid out inside its "w" (default 420, phone-safe): a flow
     whose old layout already fitted keeps its node positions; any other is laid out compactly — each decision's main branch (the child with
     the longest way on) stays straight below it, the other branches sit beside it, labels wrap inside their boxes and decision diamonds
     wrap and grow taller, step by step, until the drawing fits. Edges are routed at right angles round the boxes: a decision's side
     branches leave from its side corners, an edge that rejoins a node lower down (or several edges into one shared node) runs in a lane
     beside the column and enters the node's side, and every label sits beside its line, clear of lines, boxes and other labels. */
  // an edge is [from, to, label?, {color, dash}?] or {from, to, label, color, dash | style: "dashed"}
  const flowEdges = s => (s.edges || []).map(e => {
    if (Array.isArray(e)) {
      const o = e.slice(2).find(x => x && typeof x === 'object') || {};
      return { from: e[0], to: e[1], label: e[2] != null && typeof e[2] !== 'object' ? e[2] : null, color: o.color, dash: !!o.dash || o.style === 'dashed' };
    }
    return { from: e.from, to: e.to, label: e.label, color: e.color, dash: !!e.dash || e.style === 'dashed' };
  });
  // a decision diamond holds its text (box t × (15 n - 3) px, plus 4 px round it) inside its edges: |dx| / (w/2) + |dy| / (h/2) <= 1 at the corners.
  // A long one-line question (over ~22 characters) is set on two lines, split at the space (outside brackets and maths) that makes the
  // longer line shortest; a label with its own \n is kept as written.
  function flowDlab(t) {
    t = String(t);
    if (t.includes('\n') || tw(t, 12) <= 150) return t;
    const sp = [], all = [];                                    // spaces outside brackets and $maths$ first
    let d = 0, m = false;
    [...t].forEach((ch, i) => { if (ch === '$') m = !m; else if ('([{'.includes(ch)) d++; else if (')]}'.includes(ch)) d = Math.max(0, d - 1); else if (ch === ' ') { all.push(i); if (!d && !m) sp.push(i); } });
    if (!sp.length) sp.push(...all);
    if (!sp.length) return t;
    const at = sp.reduce((b, i) => (Math.max(vlen(t.slice(0, i)), vlen(t.slice(i + 1))) < Math.max(vlen(t.slice(0, b)), vlen(t.slice(b + 1))) ? i : b));
    return t.slice(0, at) + '\n' + t.slice(at + 1);
  }
  // a label's lines no wider than room: a line that is too long wraps, as evenly as its words allow (the narrowest width that needs no more
  // lines than the plain wrap, so no word is left alone); when the label's own line breaks would then cost more lines than one wrap of the
  // whole label, the whole label is wrapped instead
  const flowEven = (l, room) => wrapEven(l, room, 12).split('\n');
  const flowWrapLines = (raw, room) => {
    const own = raw.split('\n'), per = own.flatMap(l => flowEven(l, room));
    if (per.length === own.length) return per;
    const one = flowEven(own.join(' '), room);
    return one.length < per.length ? one : per;
  };
  // a diamond no wider than cap: the old shape when it fits, else the shortest that fits: its lines as they are in a taller diamond, or
  // wrapped narrower (up to four lines, or one more than the label's own)
  function flowDiamond(raw, cap) {
    const shape = (L, h) => { const t = Math.max(...L.map(l => tw(l, 12))), th = L.length * 15; h = h || (L.length > 1 ? th + 44 : 54); return { lines: L, h, w: Math.max(96, t + 30, Math.ceil((t + 8) / (1 - (th + 1) / h))) }; };
    const L0 = flowDlab(raw).split('\n'), d0 = shape(L0);
    if (d0.w <= cap) return d0;
    // the lines in the shortest diamond no wider than cap; lines too long for that in a narrow, tall one (three times their height)
    const fit = L => { const t = Math.max(...L.map(l => tw(l, 12))), th = L.length * 15; return t + 30 > cap || t + 8 >= cap - 1 ? shape(L, Math.max(L.length > 1 ? th + 44 : 54, 3 * (th + 1))) : shape(L, Math.max(L.length > 1 ? th + 44 : 54, Math.ceil((th + 1) / (1 - (t + 8) / cap)))); };
    let best = d0;
    const ok = d => d.w <= cap + 0.5;
    const take = d => { if (ok(d) ? !ok(best) || d.h < best.h || (d.h === best.h && d.w < best.w) : !ok(best) && d.w < best.w) best = d; };
    take(fit(L0));
    const most = Math.max(cap < 160 ? 6 : 4, raw.split('\n').length + 1);
    for (let tc = Math.min(Math.max(...L0.map(l => tw(l, 12))), cap) - 6; tc >= 54; tc -= 6) {
      const L = flowWrapLines(raw, tc);
      if (L.length > most) break;
      take(fit(L));
    }
    return best;
  }
  // a box's lines and size: one line keeps the old size (96 px or the text + 30, 38 px tall); a long line wraps to fit the cap; three or more
  // lines make the box taller (and a start / end pill 10 px wider, so its round ends clear the text)
  function flowBox(n, cap) {
    const k = n.kind || 'process', raw = String(n.label == null ? '' : n.label);
    if (k === 'decision') return flowDiamond(raw, cap.dia);
    const term = k === 'start' || k === 'end';
    const lines = flowWrapLines(raw, cap.box - 30 - (term ? 10 : 0)), t = Math.max(...lines.map(l => tw(l, 12))), n2 = lines.length;
    return { lines, w: Math.max(96, t + 30 + (term && n2 > 2 ? 10 : 0)), h: 38 + Math.max(0, n2 - 2) * 15 };
  }
  function flowModel(s) {
    const nodes = s.nodes || [], edges = flowEdges(s);
    const by = Object.fromEntries(nodes.map(n => [n.id, n]));
    edges.forEach(e => { if (!by[e.from] || !by[e.to]) throw new Error(`flow edge ${e.from}->${e.to}: unknown node`); });
    // longest-path layering on the DAG formed by forward edges (back edges found by DFS)
    const adj = {}; edges.forEach(e => (adj[e.from] = (adj[e.from] || []).concat(e)));
    const state = {}, back = new Set();
    const dfs = u => { state[u] = 1; (adj[u] || []).forEach(e => { if (state[e.to] === 1) back.add(e); else if (!state[e.to]) dfs(e.to); }); state[u] = 2; };
    nodes.forEach(n => { if (!state[n.id]) dfs(n.id); });
    const layer = {}, order = [], topo = new Set();
    const visit = u => { if (topo.has(u)) return; topo.add(u); (adj[u] || []).filter(e => !back.has(e)).forEach(e => visit(e.to)); order.unshift(u); };
    nodes.forEach(n => visit(n.id));
    order.forEach(u => (layer[u] = layer[u] || 0, (adj[u] || []).filter(e => !back.has(e)).forEach(e => (layer[e.to] = Math.max(layer[e.to] || 0, layer[u] + 1)))));
    const lv = {}; nodes.forEach(n => (lv[layer[n.id]] = (lv[layer[n.id]] || []).concat(n.id)));
    const L = Object.keys(lv).map(Number).sort((a, b) => a - b).map(d => lv[d]);
    const fwd = edges.filter(e => !back.has(e));
    const kids = {}, pars = {};
    fwd.forEach(e => { (kids[e.from] = kids[e.from] || []).push(e.to); (pars[e.to] = pars[e.to] || []).push(e.from); });
    const hgt = {};                                                   // longest way on (edges) from each node
    order.slice().reverse().forEach(u => (hgt[u] = Math.max(0, ...(kids[u] || []).map(v => hgt[v] + 1))));
    const Wt = num(s.w, 420), gapY = num(s.gapY, 34), T0 = top(s) + 4;
    // did the old layout (old box sizes: a multi-line label measured as one line) fit inside w? Then its node positions are kept.
    const oldW = id => (by[id].kind === 'decision' ? flowDiamond(String(by[id].label), Infinity).w : Math.max(96, tw(by[id].label, 12) + 30));
    const oldLW = L.map(ids => ids.reduce((a, id) => a + oldW(id), 0) + 26 * (ids.length - 1));
    const oldX = []; L.forEach((ids, li) => { let x = (Math.max(Wt, Math.max(...oldLW) + 90) - 70 - oldLW[li]) / 2 + 12; ids.forEach(id => { oldX.push(x + oldW(id) / 2); x += oldW(id) + 26; }); });
    const oldFits = Math.max(...oldLW) + 90 <= Wt && Math.max(...oldX) + 100 + 14 * (back.size + 3) <= Wt;
    // compact layout: a decision's outcome that ends there (a leaf with no other way in) sits beside the decision, on the side its edge comes
    // in the edge list (before the main branch: left); at most one each side
    const uniq = a => a.filter((v, i) => a.indexOf(v) === i);
    const att = {}, attOf = {};
    nodes.forEach(n => {
      if ((n.kind || 'process') !== 'decision') return;
      const C = uniq(kids[n.id] || []);
      if (C.length < 2) return;
      const top1 = Math.max(...C.map(v => hgt[v])), main = C.filter(v => hgt[v] === top1);
      if (main.length !== 1 || !top1) return;
      const si = C.indexOf(main[0]);
      [[-1, C.slice(0, si).reverse()], [1, C.slice(si + 1)]].forEach(([side, row]) => {
        const v = row[0];
        if (v == null || (adj[v] || []).length || uniq(pars[v] || []).length !== 1 || layer[v] !== layer[n.id] + 1 || att[v]) return;   // a true end: no edge out (not even a loop back)
        const e = fwd.find(x => x.from === n.id && x.to === v), lw = e && e.label != null && String(e.label) !== '' ? tw(String(e.label), 11) + 2 : 0;
        att[v] = { p: n.id, side, gap: Wt < 360 ? Math.max(26, lw + 12) : Math.max(34, lw + 20) }; (attOf[n.id] = attOf[n.id] || []).push(v);
      });
    });
    const LC = L.map(ids => ids.filter(id => !att[id])).map(ids => ids.flatMap(id => [...(attOf[id] || []).filter(v => att[v].side < 0), id, ...(attOf[id] || []).filter(v => att[v].side > 0)])).filter(ids => ids.length);

    function build(cap, mode, gapX, lean) {
      // lean (a last resort for a narrow w): outcomes go under their decision, not beside it, and a decision's two outcomes stay close
      const A = lean ? {} : att, AO = lean ? {} : attOf;
      const B = {}; nodes.forEach(n => (B[n.id] = flowBox(n, cap[n.id])));
      const G = {}; let y = T0;
      (mode === 'legacy' || lean ? L : LC).forEach((ids, li) => {
        const hh = Math.max(...ids.map(id => B[id].h));
        ids.forEach(id => (G[id] = { id, k: by[id].kind || 'process', lines: B[id].lines, w: B[id].w, h: B[id].h, y: y + hh / 2, bt: y, bb: y + hh, li }));
        y += hh + gapY;
      });
      const H = y;
      if (mode === 'legacy') {
        L.forEach(ids => { const lw = ids.reduce((a, id) => a + G[id].w, 0) + gapX * (ids.length - 1); let x = (Wt - 70 - lw) / 2 + 12; ids.forEach(id => { G[id].x = x + G[id].w / 2; x += G[id].w + gapX; }); });
      } else {
        // a parent's slot for each child in the next row: its main branch straight below, the others beside it (a decision's two outcomes
        // clear of its corners), or side by side under it when no branch goes further than the others
        const slot = (a, b) => {
          const C = uniq(kids[a] || []).filter(v => G[v].li === G[a].li + 1), ga = G[a];
          if (!C.includes(b) || C.length === 1) return ga.x;
          const top1 = Math.max(...C.map(v => hgt[v])), main = C.filter(v => hgt[v] === top1);
          if (main.length !== 1) {
            const tot = C.reduce((t, v) => t + G[v].w, 0) + gapX * (C.length - 1);
            let x = ga.x - tot / 2;
            // a decision's two outcomes move out past its corners (so each leaves from a corner) when that row still fits the width
            const out2 = !lean && ga.k === 'decision' && C.length === 2 && C.every(v => 2 * (ga.w / 2 + 16 + G[v].w / 2) <= Wt - 16);
            for (const [i, v] of C.entries()) {
              if (v === b) return out2 ? (i ? Math.max(x + G[v].w / 2, ga.x + ga.w / 2 + 16) : Math.min(x + G[v].w / 2, ga.x - ga.w / 2 - 16)) : x + G[v].w / 2;
              x += G[v].w + gapX;
            }
          }
          const sp = main[0], si = C.indexOf(sp);
          if (b === sp) return ga.x;
          const side = C.indexOf(b) < si ? -1 : 1, row = side < 0 ? C.slice(0, si).reverse() : C.slice(si + 1);
          let off = G[sp].w / 2 + gapX;
          for (const v of row) { const o = Math.max(off + G[v].w / 2, ga.w / 2 + 16); if (v === b) return ga.x + side * o; off = o + G[v].w / 2 + gapX; }
          return ga.x;
        };
        (lean ? L : LC).forEach(ids => {
          // a unit is a node with the outcomes beside it: [id, wanted x, input order, left reach, right reach]
          const units = ids.filter(id => !A[id]).map((id, i) => {
            const P = (pars[id] || []).filter(p => G[p].x != null);
            let lo = G[id].w / 2, hi = G[id].w / 2;
            (AO[id] || []).forEach(v => { const o = G[id].w / 2 + A[v].gap + G[v].w / 2; A[v].off = o; if (A[v].side < 0) lo = Math.max(lo, o + G[v].w / 2); else hi = Math.max(hi, o + G[v].w / 2); });
            if (!P.length) return [id, 0, i, lo, hi];
            const near = Math.max(...P.map(p => G[p].li)), Q = P.filter(p => G[p].li === near);
            return [id, Q.reduce((t, p) => t + slot(p, id), 0) / Q.length, i, lo, hi];
          }).sort((p, q) => p[1] - q[1] || p[2] - q[2]);
          // x_i = y_i + S_i with y non-decreasing: pool adjacent violators on the targets want_i - S_i (least squares, order kept)
          const S = []; let acc = 0; units.forEach((u, i) => { if (i) acc += units[i - 1][4] + u[3] + gapX; S.push(acc); });
          const blocks = [];
          units.forEach((u, i) => { blocks.push({ s: u[1] - S[i], n: 1 }); while (blocks.length > 1 && blocks[blocks.length - 2].s / blocks[blocks.length - 2].n > blocks[blocks.length - 1].s / blocks[blocks.length - 1].n) { const q = blocks.pop(), p = blocks.pop(); blocks.push({ s: p.s + q.s, n: p.n + q.n }); } });
          let i = 0; blocks.forEach(b0 => { for (let k = 0; k < b0.n; k++, i++) { const id = units[i][0]; G[id].x = b0.s / b0.n + S[i]; (AO[id] || []).forEach(v => (G[v].x = G[id].x + A[v].side * A[v].off)); } });
        });
      }
      nodes.forEach(n => { const g = G[n.id]; g.l = g.x - g.w / 2; g.r = g.x + g.w / 2; g.t = g.y - g.h / 2; g.b = g.y + g.h / 2; });
      return flowRoute(s, G, fwd, back, edges, H, gapY, Wt, mode);
    }
    const capAll = (box, dia) => Object.fromEntries(nodes.map(n => [n.id, { box, dia }]));
    let m = null;
    if (oldFits) { m = build(capAll(Wt - 24, Infinity), 'legacy', 26); if (!(m.bb[0] >= 2 && m.bb[2] <= Wt - 2)) m = null; }
    if (!m) {
      // too wide: of the boxes that reach furthest out (with the decision or outcome they sit beside, and a side branch's parent and main
      // branch), the widest one wraps 8 % narrower, one at a time (a box down to 120 px, a diamond, counted at 85 % of its width, to 150 px; less in a flow
      // under 360 px)
      const BF = Math.max(90, Math.min(120, 0.36 * Wt)), DF = Math.max(110, Math.min(150, 0.45 * Wt));   // the narrowest a box and a diamond get
      const cap = capAll(Wt - 24, Math.max(200, Math.min(Wt - 24, 0.62 * Wt)));   // a diamond wider than ~60 % of the flow wraps and grows taller
      let gapX = 26, lean = false, best = null;
      for (let k = 0; k < 240; k++) {
        m = build(cap, 'compact', gapX, lean);
        if (!best || m.bb[2] - m.bb[0] < best.bb[2] - best.bb[0] - 0.5) best = m;
        if (m.bb[2] - m.bb[0] <= Wt - 16) break;
        const G = m.G, ext = new Set();
        const all = Object.values(G), lo = Math.min(...all.map(g => g.l)), hi = Math.max(...all.map(g => g.r));
        all.forEach(g => { if (g.l <= lo + 1 || g.r >= hi - 1) ext.add(g.id); });   // the boxes furthest out (a lane or label beyond them hangs on them)
        [...ext].forEach(id => {
          if (att[id] && !lean) ext.add(att[id].p);
          if (!lean) (attOf[id] || []).forEach(v => ext.add(v));
          (pars[id] || []).forEach(p => { if (G[p].li === G[id].li - 1 && uniq(kids[p] || []).length > 1) { ext.add(p); uniq(kids[p]).forEach(v => { if (G[v].li === G[id].li) ext.add(v); }); } });
        });
        const room = id => { const g = G[id], c = cap[id]; return g.k === 'decision' ? g.w > DF + 1 && c.dia > DF + 0.5 : g.w > BF + 1 && c.box > BF + 0.5; };
        const pick = [...ext].filter(room).sort((p, q) => G[q].w * (G[q].k === 'decision' ? 0.85 : 1) - G[p].w * (G[p].k === 'decision' ? 0.85 : 1))[0];
        if (pick == null) { if (gapX > 14) { gapX = 14; continue; } if (!lean) { lean = true; continue; } m = best; break; }
        const g = G[pick], c = cap[pick];
        if (g.k === 'decision') c.dia = Math.max(DF, Math.min(c.dia, g.w) * 0.92); else c.box = Math.max(BF, Math.min(c.box, g.w) * 0.92);
      }
      const dx = (Math.max(Wt, m.bb[2] - m.bb[0] + 16) - (m.bb[2] - m.bb[0])) / 2 - m.bb[0];    // centred in the width
      m = flowShift(m, dx);
    }
    m.W = Math.max(Wt, m.bb[2] + 8);
    m.H = Math.max(m.H, m.bb[3] + 8);
    return m;
  }
  const flowShift = (m, dx) => {
    Object.values(m.G).forEach(g => { g.x += dx; g.l += dx; g.r += dx; });
    m.routes.forEach(r => { r.pts.forEach(p => (p[0] += dx)); if (r.lab) { r.lab.x += dx; r.lab.r[0] += dx; r.lab.r[2] += dx; } });
    m.bb = [m.bb[0] + dx, m.bb[1], m.bb[2] + dx, m.bb[3]];
    return m;
  };
  // right-angle routes between the placed boxes, then the labels; -> {G, routes: [{e, pts, lab, back}], bb, H}
  function flowRoute(s, G, fwd, back, edges, H, gapY, Wt, mode) {
    const ids = Object.keys(G);
    const hw = g => (g.k === 'io' ? g.w / 2 - 6 : g.w / 2);         // the side point a line meets (a parallelogram's sides lean in)
    const segs = [];                                                  // routed segments: {a, b, x1, y1, x2, y2, e}
    const used = {};                                                  // "id:side" -> the heights of the lines already at that side
    const lanes = [];                                                 // {x, y1, y2, side}
    const tops = {};                                                  // x of every line already entering a node's top
    const inter = (p, q, R) => Math.min(p[0], q[0]) < R[2] && Math.max(p[0], q[0]) > R[0] && Math.min(p[1], q[1]) < R[3] && Math.max(p[1], q[1]) > R[1];
    const box = (g, pad) => [g.l - pad, g.t - pad, g.r + pad, g.b + pad];
    function cost(pts, e) {
      let c = (pts.length - 2) * 3;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], q = pts[i];
        c += (Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])) / 100;
        ids.forEach(id => { if (id !== e.from && id !== e.to && inter(p, q, box(G[id], 4))) c += 1000; });
        if (i > 1 && i < pts.length - 1 && (inter(p, q, box(G[e.from], 1)) || inter(p, q, box(G[e.to], 1)))) c += 1000;   // never back through its own ends
        segs.forEach(sg => {
          const v1 = p[0] === q[0], v2 = sg.x1 === sg.x2;
          if (v1 === v2) {                                           // parallel: overlapping runs on one line
            const same = v1 ? Math.abs(p[0] - sg.x1) < 4 : Math.abs(p[1] - sg.y1) < 4;
            const lo = v1 ? Math.max(Math.min(p[1], q[1]), Math.min(sg.y1, sg.y2)) : Math.max(Math.min(p[0], q[0]), Math.min(sg.x1, sg.x2));
            const hi = v1 ? Math.min(Math.max(p[1], q[1]), Math.max(sg.y1, sg.y2)) : Math.min(Math.max(p[0], q[0]), Math.max(sg.x1, sg.x2));
            if (same && hi - lo > 1) c += sg.e.from === e.from && i === 1 ? 6 : sg.e.to === e.to ? 30 : 60;
          } else {
            const [vp, vq, hp, hq] = v1 ? [p, q, [sg.x1, sg.y1], [sg.x2, sg.y2]] : [[sg.x1, sg.y1], [sg.x2, sg.y2], p, q];
            if (vp[0] > Math.min(hp[0], hq[0]) + 0.5 && vp[0] < Math.max(hp[0], hq[0]) - 0.5 && hp[1] > Math.min(vp[1], vq[1]) + 0.5 && hp[1] < Math.max(vp[1], vq[1]) - 0.5) c += 4;
          }
        });
      }
      return c;
    }
    const laneX = (side, y1, y2) => {
      const lo = Math.min(y1, y2) - 6, hi = Math.max(y1, y2) + 6;
      let x = side > 0 ? Math.max(...ids.filter(id => G[id].b > lo && G[id].t < hi).map(id => G[id].r)) + 18 : Math.min(...ids.filter(id => G[id].b > lo && G[id].t < hi).map(id => G[id].l)) - 18;
      lanes.filter(l => l.side === side && l.y2 > lo && l.y1 < hi).forEach(l => (x = side > 0 ? Math.max(x, l.x + 12) : Math.min(x, l.x - 12)));
      return x;
    };
    // where a line can enter a node's top: its middle first, then 14 px steps toward the side the line comes from (a diamond: the tip only)
    const topX = (b, from) => {
      const g = G[b], xs = tops[b] || [];
      if (!xs.some(x => Math.abs(x - g.x) < 3)) return g.x;
      if (g.k === 'decision') return null;
      const sd = from < g.x ? -1 : 1;
      for (let j = 1; j * 14 <= g.w / 2 - 10; j++) for (const d of [sd, -sd]) { const x = g.x + d * j * 14; if (!xs.some(z => Math.abs(z - x) < 3)) return x; }
      return null;
    };
    // a point on a node's side (sd: -1 left, 1 right) at the first free height: the middle, then 9 px steps up and down (on a diamond, on its
    // slope); every line in or out of that side gets its own point
    const sidePt = (id, sd, pad) => {
      const g = G[id], ys = used[`${id}:${sd}`] || [];
      for (const dy of [0, -9, 9, -18, 18]) {
        if (dy && Math.abs(dy) > g.h / 2 - (g.k === 'decision' ? 10 : 6)) continue;
        if (ys.some(y => Math.abs(y - (g.y + dy)) < 3)) continue;
        const inset = g.k === 'decision' ? (hw(g) * Math.abs(dy)) / (g.h / 2) : 0;
        return { p: [g.x + sd * (hw(g) - inset + pad), g.y + dy], busy: 0 };
      }
      return { p: [g.x + sd * (hw(g) + pad), g.y], busy: 200 };
    };
    function candidates(e, isBack) {
      const a = G[e.from], b = G[e.to], out = [];
      const add = (pts, tag, extra, lane) => out.push({ pts, tag, extra: extra || 0, lane });
      if (!isBack && Math.abs(a.y - b.y) < 1) {                       // an outcome beside its decision: one straight line between them
        const sd = b.x > a.x ? 1 : -1, o = sidePt(e.from, sd, 0), i = sidePt(e.to, -sd, 3);
        add([o.p, [i.p[0], o.p[1]]], 'beside', o.busy + i.busy);
      } else if (!isBack) {
        const ex = b.t > a.b + 4 ? topX(e.to, a.x) : null, ymA = a.bb + gapY / 2, ymB = b.bt - gapY / 2;
        if (ex != null) {
          if (Math.abs(ex - a.x) < 2) add([[a.x, a.b], [a.x, b.t - 3]], 'v');
          else if (Math.abs(ex - a.x) <= 8 && ex === b.x) add([[a.x, a.b], [a.x, b.t - 3]], 'v');   // a few px off: straight down all the same
          else { add([[a.x, a.b], [a.x, ymA], [ex, ymA], [ex, b.t - 3]], 'vhv'); if (ymB > ymA + 2) add([[a.x, a.b], [a.x, ymB], [ex, ymB], [ex, b.t - 3]], 'vhv2'); }
          const sd = ex > a.x ? 1 : -1, o = sidePt(e.from, sd, 0);
          if (a.k === 'decision' && (ex - o.p[0]) * sd >= 10 && b.t > o.p[1] + 8) add([o.p, [ex, o.p[1]], [ex, b.t - 3]], 'side', o.busy);
        }
        for (const sd of [-1, 1]) {                                  // into the side of the node, straight from above, or by a lane
          const i = sidePt(e.to, sd, 3), pin = i.p;
          if ((a.x - pin[0]) * sd >= 10 && pin[1] > a.b + 8) add([[a.x, a.b], [a.x, pin[1]], pin], 'down-in', i.busy + 4);
          const lx = laneX(sd, a.y, b.y);
          if (a.k === 'decision') { const o = sidePt(e.from, sd, 0); add([o.p, [lx, o.p[1]], [lx, pin[1]], pin], 'lane', i.busy + o.busy + 9, [lx, o.p[1], pin[1], sd]); }
          add([[a.x, a.b], [a.x, ymA], [lx, ymA], [lx, pin[1]], pin], 'lane2', i.busy + 11, [lx, ymA, pin[1], sd]);
        }
      } else {
        for (const sd of [1, -1]) {
          const lx = laneX(sd, a.y, b.y), o = sidePt(e.from, sd, 0), i = e.from === e.to ? null : sidePt(e.to, sd, 3);
          if (e.from === e.to) add([[a.x + sd * hw(a), a.y - 6], [lx, a.y - 6], [lx, a.y + 6], [a.x + sd * (hw(a) + 3), a.y + 6]], 'self', (used[`${e.from}:${sd}`] ? 200 : 0) + (sd < 0 ? 2 : 0), [lx, a.y - 6, a.y + 6, sd]);
          else {
            add([o.p, [lx, o.p[1]], [lx, i.p[1]], i.p], 'back', o.busy + i.busy + (sd < 0 ? 2 : 0), [lx, o.p[1], i.p[1], sd]);
            // or over the top: down onto the line already coming into the node from above (when its side is blocked)
            const ty = b.t - Math.max(8, Math.min(14, gapY / 2 - 3)), tx = topX(e.to, lx);
            add([o.p, [lx, o.p[1]], [lx, ty], [tx == null ? b.x : tx, ty], [tx == null ? b.x : tx, b.t - 3]], 'back-top', o.busy + 10 + (sd < 0 ? 2 : 0), [lx, o.p[1], ty, sd]);
          }
        }
      }
      return out;
    }
    const routes = [];
    // the straight runs first (a main branch keeps the middle of its node's top), then the others in order, then the loops
    const rank = e => (back.has(e) ? 2 : Math.abs(G[e.from].x - G[e.to].x) <= 8 && G[e.to].li === G[e.from].li + 1 ? 0 : 1);
    edges.map((e, i) => [e, i]).sort((p, q) => rank(p[0]) - rank(q[0]) || p[1] - q[1]).forEach(([e, i]) => {
      const isBack = back.has(e), cs = candidates(e, isBack);
      const best = cs.map(c => [c, cost(c.pts, e) + c.extra]).reduce((m, c) => (c[1] < m[1] ? c : m));
      const c = best[0], pts = c.pts, n = pts.length - 1;
      for (let k = 1; k <= n; k++) segs.push({ x1: pts[k - 1][0], y1: pts[k - 1][1], x2: pts[k][0], y2: pts[k][1], e });
      const mark = (id, p) => { const k = `${id}:${p[0] > G[id].x ? 1 : -1}`; (used[k] = used[k] || []).push(p[1]); };
      if (pts[1][1] === pts[0][1]) mark(e.from, pts[0]);                // leaves by a side
      if (pts[n][1] === pts[n - 1][1]) mark(e.to, pts[n]);              // comes in at a side
      else (tops[e.to] = tops[e.to] || []).push(pts[n][0]);
      if (c.lane) lanes.push({ x: c.lane[0], y1: Math.min(c.lane[1], c.lane[2]), y2: Math.max(c.lane[1], c.lane[2]), side: c.lane[3] });
      routes[i] = { e, pts, back: isBack, tag: c.tag };
    });
    // labels: beside the line near its start, clear of boxes, lines and other labels (the first free spot of a few), inside the width; a
    // long label wraps (to about a third of the flow)
    const taken = [], nl = Math.min(...ids.map(id => G[id].l)), nr = Math.max(...ids.map(id => G[id].r)), half = (Wt - 16) / 2;
    const lim = mode === 'legacy' ? [8, Wt - 8] : [(nl + nr) / 2 - half, (nl + nr) / 2 + half];
    const free = r => {
      let c = r[0] < lim[0] - 0.5 || r[2] > lim[1] + 0.5 ? 6 : 0;
      ids.forEach(id => { const g = G[id]; if (r[0] < g.r + 2 && r[2] > g.l - 2 && r[1] < g.b + 2 && r[3] > g.t - 2) c += 10; });
      segs.forEach(sg => { if (inter([sg.x1, sg.y1], [sg.x2, sg.y2], [r[0] - 2.5, r[1] - 2.5, r[2] + 2.5, r[3] + 2.5])) c += 3; });
      taken.forEach(q => { if (r[0] < q[2] + 2 && r[2] > q[0] - 2 && r[1] < q[3] + 2 && r[3] > q[1] - 2) c += 10; });
      return c;
    };
    routes.forEach(r => {
      if (r.e.label == null || String(r.e.label) === '') return;
      // tried at about a third of the flow, then narrower (two or three lines) when that does not fit anywhere
      let pick = null;
      for (const maxW of [Math.max(70, Math.min(150, Wt * 0.36)), 90, 64]) {
        const t = wrapEven(String(r.e.label), maxW, 11), nt = nLines(t), lw = Math.max(...t.split('\n').map(x => tw(x, 11))) + 2, lh = 13 * nt, ex = (nt - 1) * 6.5, P = r.pts, cands = [];
        const at = (x, y, an) => { const x1 = an === 'start' ? x : an === 'end' ? x - lw : x - lw / 2; return { x, y, an, t, r: [x1, y - lh / 2, x1 + lw, y + lh / 2] }; };
        const segAt = k => {
          const p = P[k], q = P[k + 1], L0 = Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);
          if (p[0] === q[0]) { const dn = q[1] > p[1] ? 1 : -1; (r.back ? [L0 / 2, 11, 11 + 15] : [11, 11 + 15, L0 / 2]).forEach(d => { if (d < L0 - 4 || k === 0) { const dd = d === L0 / 2 ? d : d + ex; cands.push(at(p[0] + 6, p[1] + dn * dd, 'start')); cands.push(at(p[0] - 6, p[1] + dn * dd, 'end')); } }); }
          else { const sd = q[0] > p[0] ? 1 : -1, an = sd > 0 ? 'start' : 'end'; [6, Math.max(6, L0 / 2 - lw / 2)].forEach(d => { cands.push(at(p[0] + sd * d, p[1] - 9 - ex, an)); cands.push(at(p[0] + sd * d, p[1] + 10 + ex, an)); }); }
        };
        // a line that shares its first run with another line from the same point (a trunk) is labelled on its own run after the turn
        const shared = routes.some(o => o !== r && o.e.from === r.e.from && Math.abs(o.pts[0][0] - P[0][0]) < 1 && Math.abs(o.pts[0][1] - P[0][1]) < 1 && (o.pts[1][0] === P[0][0]) === (P[1][0] === P[0][0]));
        const order = [0, 1, 2].filter(k => k < P.length - 1);
        // a loop is labelled half way along its lane, as before
        (r.back && P.length > 3 ? [1, 0, 2] : shared && P.length > 2 ? order.slice(1).concat(0) : order).forEach(segAt);
        const best = cands.map(c => [c, free(c.r)]).reduce((m, c) => (c[1] < m[1] ? c : m));
        if (!pick || best[1] < pick[1]) pick = best;
        if (pick[1] === 0 || !t.includes(' ')) break;
      }
      r.lab = pick[0]; taken.push(pick[0].r);
    });
    let bb = [Infinity, Infinity, -Infinity, -Infinity];
    const grow = (x1, y1, x2, y2) => (bb = [Math.min(bb[0], x1), Math.min(bb[1], y1), Math.max(bb[2], x2), Math.max(bb[3], y2)]);
    ids.forEach(id => grow(G[id].l, G[id].t, G[id].r, G[id].b));
    routes.forEach(r => { r.pts.forEach(p => grow(p[0] - 4, p[1], p[0] + 4, p[1])); if (r.lab) grow(...r.lab.r); });
    return { G, routes, bb, H };
  }
  function flow(s) {
    const m = flowModel(s);
    let o = '', lab = '';
    m.routes.forEach(r => {
      const P = r.pts, d = P.map((p, i) => (i ? (p[0] === P[i - 1][0] ? `V${f(p[1])}` : p[1] === P[i - 1][1] ? `H${f(p[0])}` : `L${f(p[0])} ${f(p[1])}`) : `M${f(p[0])} ${f(p[1])}`)).join(' ');
      const k = r.e.color != null ? kc(r.e.color) : '', n = P.length - 1;
      let head = '';
      if (k) {                                                        // a coloured edge draws its own arrowhead in its colour
        const tip = P[n], fr = P[n - 1], L0 = Math.hypot(tip[0] - fr[0], tip[1] - fr[1]) || 1, ux = (tip[0] - fr[0]) / L0, uy = (tip[1] - fr[1]) / L0, t2 = [tip[0] + ux * 2, tip[1] + uy * 2];
        head = `<path d="M${f(t2[0])} ${f(t2[1])} L${f(t2[0] - ux * 9 - uy * 4)} ${f(t2[1] - uy * 9 + ux * 4)} L${f(t2[0] - ux * 9 + uy * 4)} ${f(t2[1] - uy * 9 - ux * 4)}Z" class="pah"/>`;
        const Q = P.map(p => p.slice()); Q[n] = [tip[0] - ux * 5, tip[1] - uy * 5];
        const d2 = Q.map((p, i) => (i ? (p[0] === Q[i - 1][0] ? `V${f(p[1])}` : p[1] === Q[i - 1][1] ? `H${f(p[0])}` : `L${f(p[0])} ${f(p[1])}`) : `M${f(p[0])} ${f(p[1])}`)).join(' ');
        o += `<g class="${k}"><path d="${d2}" class="de${r.e.dash ? ' dashed' : ''}" fill="none"/>${head}</g>`;
      } else o += `<path d="${d}" class="de${r.e.dash ? ' dashed' : ''}" fill="none" marker-end="url(#ah)"/>`;
      if (r.lab) lab += T(r.lab.x, r.lab.y, r.lab.t, { size: 10.5, weight: 700, cls: 'dt del', anchor: r.lab.an });
    });
    (s.nodes || []).forEach(n => {
      const g = m.G[n.id], { x, y: yy, w, h, k } = g;
      const c = kc(n.color, k === 'decision' ? 2 : k === 'start' || k === 'end' ? 4 : 0);
      let sh;
      if (k === 'decision') sh = `<path d="M${f(x)} ${f(yy - h / 2)} L${f(x + w / 2)} ${f(yy)} L${f(x)} ${f(yy + h / 2)} L${f(x - w / 2)} ${f(yy)}Z" class="nb"/>`;
      else if (k === 'start' || k === 'end') sh = `<rect x="${f(x - w / 2)}" y="${f(yy - h / 2)}" width="${f(w)}" height="${h}" rx="${g.lines.length > 2 ? 22 : h / 2}" class="nb"/>`;
      else if (k === 'io') sh = `<path d="M${f(x - w / 2 + 12)} ${f(yy - h / 2)} H${f(x + w / 2)} L${f(x + w / 2 - 12)} ${f(yy + h / 2)} H${f(x - w / 2)}Z" class="nb"/>`;
      else sh = `<rect x="${f(x - w / 2)}" y="${f(yy - h / 2)}" width="${f(w)}" height="${h}" rx="6" class="nb"/>`;
      o += `<g class="${c}">${sh}${T(x, yy, g.lines.join('\n'), { size: 12, weight: 600 })}</g>`;
    });
    return wrap(s, m.W, m.H, o + lab, minW(m.W));
  }

  /* ============================================================== plot */
  function compileExpr(src) {
    const toks = String(src).match(/\d*\.?\d+(?:e[+-]?\d+)?|[a-z_]\w*|\*\*|[-+*/^(),]/gi) || [];
    let p = 0;
    const FN = { sin: Math.sin, cos: Math.cos, tan: Math.tan, log: Math.log10, log2: Math.log2, ln: Math.log, exp: Math.exp, sqrt: Math.sqrt, abs: Math.abs, floor: Math.floor, ceil: Math.ceil, min: Math.min, max: Math.max, pow: Math.pow };
    const peek = () => toks[p], next = () => toks[p++];
    function prim() {
      const t = next();
      if (t === undefined) throw new Error('bad expression: ' + src);
      if (t === '(') { const v = expr(); next(); return v; }
      if (t === '-') { const v = prim(); return x => -v(x); }
      if (t === '+') return prim();
      if (/^[\d.]/.test(t)) { const c = parseFloat(t); return () => c; }
      if (t === 'x') return x => x;
      if (t === 'pi') return () => Math.PI;
      if (t === 'e') return () => Math.E;
      if (FN[t.toLowerCase()] && peek() === '(') {
        next(); const args = [];
        if (peek() !== ')') { args.push(expr()); while (peek() === ',') { next(); args.push(expr()); } }
        next();
        const fn = FN[t.toLowerCase()];
        return x => fn(...args.map(a => a(x)));
      }
      throw new Error('bad token ' + t + ' in ' + src);
    }
    function pow() { let b = prim(); while (peek() === '^' || peek() === '**') { next(); const e = pow(); const bb = b; b = x => Math.pow(bb(x), e(x)); } return b; }
    function term() { let l = pow(); while (peek() === '*' || peek() === '/') { const op = next(), r = pow(), ll = l; l = op === '*' ? x => ll(x) * r(x) : x => ll(x) / r(x); } return l; }
    function expr() { let l = term(); while (peek() === '+' || peek() === '-') { const op = next(), r = term(), ll = l; l = op === '+' ? x => ll(x) + r(x) : x => ll(x) - r(x); } return l; }
    const fnc = expr();
    if (p < toks.length) throw new Error('trailing input in ' + src);
    return fnc;
  }
  // log axes: "xlog": 2 or 10 (any base > 1); values must be positive
  function plotLog(v, who) {
    if (v == null || v === false) return null;
    const b = v === true ? 10 : num(v, NaN);
    if (!(b > 1)) fail('plot', `${who} is the base of a logarithmic axis: 2, 10 or e (true means 10)`);
    return b;
  }
  const plotPow = (b, k) => Math.pow(b, k);
  function plot(s) {
    const W = num(s.w, 560), H0 = num(s.h, 300), R = 16, Tp = top(s) + 6, B = 38;
    let L = 46;                                            // widened below for long y-tick labels (12,50,000) and the y label
    const xlog = plotLog(s.xlog, 'xlog'), ylog = plotLog(s.ylog, 'ylog');
    const fx = xlog ? v => Math.log(v) / Math.log(xlog) : v => v, ix = xlog ? v => plotPow(xlog, v) : v => v;
    const fy = ylog ? v => Math.log(v) / Math.log(ylog) : v => v;
    const [x0, x1] = s.x || [xlog ? 1 : 0, 10];
    if (xlog && !(x0 > 0 && x1 > 0)) fail('plot', 'with xlog the x range must be positive, e.g. "x": [1, 1000]');
    const series = (s.series || []).map((se, i) => {
      let pts;
      if (se.pts) pts = se.pts;
      else { const fn = compileExpr(se.fn), N = 160, t0 = fx(x0), t1 = fx(x1); pts = []; for (let k = 0; k <= N; k++) { const x = ix(t0 + ((t1 - t0) * k) / N); const y = fn(x); if (isFinite(y)) pts.push([x, y]); } }
      return { ...se, pts, c: kc(se.color, i) };
    });
    const all = series.flatMap(se => se.pts.map(p => p[1]));
    const [y0, y1] = s.y || (ylog ? [Math.min(...all.filter(v => v > 0)), Math.max(...all)] : [Math.min(0, ...all), Math.max(...all)]);
    if (ylog && !(y0 > 0 && y1 > 0)) fail('plot', 'with ylog the y range must be positive, e.g. "y": [1, 1000]');
    const X = x => L + ((fx(x) - fx(x0)) / (fx(x1) - fx(x0) || 1)) * (W - L - R), Y = y => Tp + (1 - (fy(y) - fy(y0)) / (fy(y1) - fy(y0) || 1)) * (H0 - Tp - B);
    let o = '';
    const ticks = (a, b, n) => { const st = (b - a) / n; return Array.from({ length: n + 1 }, (_, i) => a + i * st); };
    // powers of the base inside the range (10, 100, 1000 …; every power, or every other one when there are many)
    const logTicks = (b, a, z) => {                       // the powers of the base inside the range (every one, or every second / third when there are many)
      const lo = Math.ceil(Math.log(a) / Math.log(b) - 1e-9), hi = Math.floor(Math.log(z) / Math.log(b) + 1e-9), st = Math.max(1, Math.ceil((hi - lo + 1) / 9)), out = [];
      for (let k = lo; k <= hi; k += st) out.push(plotPow(b, k));
      return out.length ? out : [a, z];
    };
    const logLab = (b, v) => { const k = Math.round(Math.log(v) / Math.log(b)); return b === 10 && k >= -2 && k <= 3 ? String(+v.toPrecision(6)) : `$${b}^{${k}}$`; };
    const tfs = pz(s, 10);                                // tick labels: 10 px, 10.5 px at phone width
    /* automatic tick labels of 10,000 or more use Indian digit grouping (10,00,000), the app's number style; the y axis's left margin grows
       to fit the widest label (and the rotated y label beside it) */
    const grp = v => (typeof v === 'number' && Math.abs(v) >= 10000 && Number.isInteger(v) ? v.toLocaleString('en-IN') : v);
    const yLabs = s.yticks ? plotTicks(s.yticks, 'yticks').map(t => t[1]) : ylog ? logTicks(ylog, y0, y1).map(v => logLab(ylog, v)) : ticks(y0, y1, 5).map(v => grp(+v.toFixed(2)));
    L = Math.max(46, Math.ceil(Math.max(0, ...yLabs.map(l => (/\$/.test(String(l)) ? 24 : tw(String(l), tfs))))) + 9 + (s.ylabel ? 15 : 0));
    // phone: x-tick labels that would collide are left out (greedy from the left); grid lines stay
    const xl = s.phone ? items => { const keep = new Set(thin(items.map(([v, lab]) => [X(v), lab]), tfs, 6).map(k => k[0])); return items.map(([v, lab]) => [v, keep.has(X(v)) ? lab : null]); } : items => items;
    if (s.yticks) plotTicks(s.yticks, 'yticks').forEach(([v, lab]) => (o += `<line x1="${L}" x2="${W - R}" y1="${f(Y(v))}" y2="${f(Y(v))}" class="dg-grid"/>${T(L - 6, Y(v), lab, { anchor: 'end', size: tfs, cls: 'dt dtm' })}`));
    else if (ylog) logTicks(ylog, y0, y1).forEach(v => (o += `<line x1="${L}" x2="${W - R}" y1="${f(Y(v))}" y2="${f(Y(v))}" class="dg-grid"/>${T(L - 6, Y(v), logLab(ylog, v), { anchor: 'end', size: tfs, cls: 'dt dtm' })}`));
    else ticks(y0, y1, 5).forEach(v => (o += `<line x1="${L}" x2="${W - R}" y1="${f(Y(v))}" y2="${f(Y(v))}" class="dg-grid"/>${T(L - 6, Y(v), grp(+v.toFixed(2)), { anchor: 'end', size: tfs, cls: 'dt dtm' })}`));
    if (s.xticks) xl(plotTicks(s.xticks, 'xticks')).forEach(([v, lab]) => (o += lab == null ? '' : `${T(X(v), H0 - B + 14, lab, { size: tfs, cls: 'dt dtm' })}`));
    else if (xlog) xl(logTicks(xlog, x0, x1).map(v => [v, logLab(xlog, v)])).forEach(([v, lab]) => (o += `<line x1="${f(X(v))}" x2="${f(X(v))}" y1="${Tp}" y2="${H0 - B}" class="dg-grid"/>${lab == null ? '' : T(X(v), H0 - B + 14, lab, { size: tfs, cls: 'dt dtm' })}`));
    else xl(ticks(x0, x1, Math.min(8, Math.round(x1 - x0) || 5)).map(v => [v, grp(+v.toFixed(2))])).forEach(([v, lab]) => (o += lab == null ? '' : `${T(X(v), H0 - B + 14, lab, { size: tfs, cls: 'dt dtm' })}`));
    const yAx = ylog ? Y(y0) : Y(Math.max(y0, 0));
    o += `<line x1="${L}" x2="${W - R}" y1="${f(yAx)}" y2="${f(yAx)}" class="dg-axis"/><line x1="${L}" x2="${L}" y1="${Tp}" y2="${H0 - B}" class="dg-axis"/>`;
    const fills = s.areas || s.regions ? plotFills(s, series, X, Y, [x0, x1, y0, y1]) : null;   // areas / regions under the curves
    if (fills) o += fills.under;
    // clip: true keeps every curve, marker and vector inside the plot box (default: curves may stray one y range outside)
    const cid = 'plc' + hid(s);
    let body = '';
    const ah = (tip, from, cls) => { const dx = tip[0] - from[0], dy = tip[1] - from[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d; return `<path d="M${f(tip[0])} ${f(tip[1])} L${f(tip[0] - ux * 9 - uy * 3.8)} ${f(tip[1] - uy * 9 + ux * 3.8)} L${f(tip[0] - ux * 9 + uy * 3.8)} ${f(tip[1] - uy * 9 - ux * 3.8)}Z" class="${cls}"/>`; };
    series.forEach(se => {
      if (se.bars) { body += plotBars(se, X, Y, y0, y1); return; }
      const ya = fy(y0), yb = fy(y1), sp = yb - ya || 1;        // with clip the curve runs on past the box and is cut by the clip path
      const clamp = s.clip ? p => [X(p[0]), Tp + (1 - (Math.max(ya - sp, Math.min(yb + sp, fy(p[1]))) - ya) / sp) * (H0 - Tp - B)]
        : p => [X(p[0]), Y(Math.max(y0 - (y1 - y0), Math.min(y1 + (y1 - y0), p[1])))];
      const P = se.pts.filter(p => isFinite(p[1]) && (!ylog || p[1] > 0)).map(clamp), Q = P.slice();
      let heads = '';
      if (se.arrow && P.length > 1) {                       // arrowheads on the line itself (a vector, or a curve that keeps growing)
        const n = P.length - 1, trim = (a, b) => { const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, t = Math.min(0.9, 7 / d); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
        if (se.arrow === 'both' || se.arrow === 'start') { heads += ah(P[0], P[1], 'pah'); Q[0] = trim(P[0], P[1]); }
        if (se.arrow !== 'start') { heads += ah(P[n], P[n - 1], 'pah'); Q[n] = trim(P[n], P[n - 1]); }
      }
      let g = `<polyline points="${Q.map(p => `${f(p[0])},${f(p[1])}`).join(' ')}" class="pl${se.dash || se.style === 'dashed' ? ' dashed' : ''}" fill="none"/>${heads}`;
      if (se.dots) g += P.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${se.dots === 'open' ? 4 : 3.4}" class="pds${se.dots === 'open' ? ' open' : ''}"/>`).join('');
      body += `<g class="${se.c}">${g}</g>`;
    });
    // vectors: single arrows in data coordinates (gradients, forces, eigenvectors)
    (Array.isArray(s.vectors) ? s.vectors : s.vectors ? fail('plot', 'vectors must be a list') : []).forEach((v, i) => {
      if (!isPt(v.to)) fail('plot', `vector ${i + 1} needs to: [x, y] (and from: [x, y], default the origin)`);
      const A = [X(num((v.from || [0, 0])[0], 0)), Y(num((v.from || [0, 0])[1], 0))], Bp = [X(v.to[0]), Y(v.to[1])];
      const d = Math.hypot(Bp[0] - A[0], Bp[1] - A[1]) || 1, t = Math.min(0.9, 7 / d), E = [Bp[0] + (A[0] - Bp[0]) * t, Bp[1] + (A[1] - Bp[1]) * t];
      let g = `<line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(E[0])}" y2="${f(E[1])}" class="pl${v.dash ? ' dashed' : ''}"/>${ah(Bp, A, 'pah')}`;
      if (v.label != null) {
        const ux = (Bp[0] - A[0]) / d, uy = (Bp[1] - A[1]) / d;
        const POS = { above: [0, -12, 'middle'], below: [0, 14, 'middle'], left: [-10, 0, 'end'], right: [10, 0, 'start'] };
        if (v.pos != null && !POS[v.pos]) fail('plot', `vector ${i + 1}: pos is "above", "below", "left" or "right"`);
        const at = POS[v.pos] || [ux * 10 - uy * 6, uy * 10 + ux * 6, ux < -0.3 ? 'end' : ux > 0.3 ? 'start' : 'middle'];   // default: just past the tip, on its left
        g += T(Bp[0] + at[0] + num(v.dx, 0), Bp[1] + at[1] + num(v.dy, 0), v.label, { size: 11, weight: 650, anchor: at[2], cls: 'dt del' });
      }
      body += `<g class="${kc(v.color, i)}">${g}</g>`;
    });
    // points: open: true draws a hollow marker (the missing value of a piecewise function); pos places the label (8 places round the dot),
    // dx / dy (px, dy down) move it further, e.g. off a line that runs through the point
    (s.points || []).forEach(p => {
      const px = X(p.x), py = Y(p.y), c = p.color != null ? kc(p.color) : null;
      const POS = { above: [0, -11, 'middle'], below: [0, 13, 'middle'], left: [-9, 0, 'end'], right: [9, 0, 'start'],
        'above-left': [-8, -8, 'end'], 'above-right': [8, -8, 'start'], 'below-left': [-8, 11, 'end'], 'below-right': [8, 11, 'start'] };
      if (p.pos != null && !POS[p.pos]) fail('plot', `point label pos is "above", "below", "left", "right", "above-left", "above-right", "below-left" or "below-right" (got ${JSON.stringify(p.pos)})`);
      ['dx', 'dy'].forEach(k => { if (p[k] != null && !(typeof p[k] === 'number' && isFinite(p[k]))) fail('plot', `point label ${k} is a number of px (got ${JSON.stringify(p[k])})`); });
      let g = `<circle cx="${f(px)}" cy="${f(py)}" r="4.5" class="pd${p.open ? ' open' : ''}"/>`;
      if (p.label != null) { const at = POS[p.pos] || [8, -8, 'start']; g += T(px + at[0] + num(p.dx, 0), py + at[1] + num(p.dy, 0), p.label, { anchor: at[2], size: 10.5, weight: 600 }); }
      body += c ? `<g class="${c}">${g}</g>` : g;
    });
    o += s.clip ? `<defs><clipPath id="${cid}"><rect x="${L}" y="${Tp - 1}" width="${f(W - L - R)}" height="${f(H0 - Tp - B + 1)}"/></clipPath></defs><g clip-path="url(#${cid})">${body}</g>` : body;
    if (fills) o += fills.labels;
    // legend: "top-left" (default) · "top-right" · "bottom-left" · "bottom-right" · "outside" (under the plot) · "none" / false; a series with legend: false is skipped
    let lk = s.legend === true || s.legend == null ? 'top-left' : s.legend === false ? 'none' : String(s.legend);
    if (!['top-left', 'top-right', 'bottom-left', 'bottom-right', 'outside', 'none'].includes(lk)) fail('plot', 'legend is "top-left", "top-right", "bottom-left", "bottom-right", "outside", "none" or false');
    const shown = series.filter(se => se.legend !== false && !(lk === 'none'));
    let H = H0;
    if (shown.length) {
      const item = (se, x, y) => `<g class="${se.c}">${se.bars ? `<rect x="${x + 1}" y="${y - 5}" width="10" height="10" rx="2" class="nb"/>` : `<rect x="${x}" y="${y - 2}" width="12" height="4" rx="2" class="nb solid"/>`}${T(x + 17, y, se.label || '', { anchor: 'start', size: 11, weight: 600 })}</g>`;
      const wid = se => 30 + tw(se.label || '', 11);
      const total = shown.reduce((a, se) => a + wid(se), 0);
      if (s.phone && lk !== 'outside' && total > W - L - R - 16) lk = 'outside';          // phone: a legend that would run past the plot goes under it
      if (lk === 'outside') {
        const rows = [[]]; let rw = 0;
        shown.forEach(se => { if (rw + wid(se) > W - 16 && rows[rows.length - 1].length) { rows.push([]); rw = 0; } rows[rows.length - 1].push(se); rw += wid(se); });
        rows.forEach((row, ri) => { let x = (W - row.reduce((a, se) => a + wid(se), 0)) / 2; const y = H0 + 6 + ri * 17; row.forEach(se => { o += item(se, x, y); x += wid(se); }); });
        H = H0 + 6 + rows.length * 17;
      } else {
        const right = lk === 'top-right' || lk === 'bottom-right';
        let x = right ? W - R - 8 - total : L + 8;
        const y = lk === 'top-left' || lk === 'top-right' ? Tp : H0 - B - 12;
        shown.forEach(se => { o += item(se, x, y); x += wid(se); });
      }
    }
    if (s.xlabel) o += T((L + W - R) / 2, H0 - 8, s.xlabel, { size: 11.5, cls: 'dt dtm' });
    if (s.ylabel) o += `<g transform="translate(12 ${(Tp + H0 - B) / 2}) rotate(-90)">${T(0, 0, s.ylabel, { size: 11.5, cls: 'dt dtm' })}</g>`;
    return wrap(s, W, H, o, minW(W));
  }

  /* plot additions (bars, areas, regions, explicit ticks, log axes, vectors); used only when those keys are present */
  function plotTicks(list, key) {
    if (!Array.isArray(list)) fail('plot', `${key} must be a list of numbers or [value, "label"] pairs`);
    return list.map(t => {
      const v = Array.isArray(t) ? t[0] : t;
      if (typeof v !== 'number' || !isFinite(v)) fail('plot', `${key}: ${JSON.stringify(t)} is not a number or [value, "label"]`);
      return [v, Array.isArray(t) && t[1] != null ? String(t[1]) : +v.toFixed(6)];
    });
  }
  function plotBars(se, X, Y, y0, y1) {
    const xs = se.pts.map(p => p[0]).slice().sort((a, b) => a - b);
    let gap = Infinity; for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] > 1e-12) gap = Math.min(gap, xs[i] - xs[i - 1]);
    const bw = num(se.bw, isFinite(gap) ? gap * 0.6 : 0.6), base = Math.max(y0, Math.min(y1, 0));
    let o = '';
    se.pts.forEach(p => {
      const v = Math.max(y0, Math.min(y1, p[1])), xa = X(p[0] - bw / 2), xb = X(p[0] + bw / 2), ya = Math.min(Y(v), Y(base)), hh = Math.abs(Y(v) - Y(base));
      o += `<rect x="${f(xa)}" y="${f(ya)}" width="${f(Math.max(1, xb - xa))}" height="${f(hh)}" rx="2" class="nb"/>`;
      if (se.values) { const lab = p[2] != null ? p[2] : +(+p[1]).toFixed(3); o += T((xa + xb) / 2, p[1] >= 0 ? Y(v) - 8 : Y(v) + 9, lab, { size: 10.5, weight: 650 }); }
    });
    return `<g class="${se.c}">${o}</g>`;
  }
  function plotCurve(ref, series, who) {
    if (typeof ref === 'string') return compileExpr(ref);
    const se = series[ref];
    if (!Number.isInteger(ref) || !se) fail('plot', `${who}: no series ${JSON.stringify(ref)} (series are numbered from 0, or give an expression like "exp(-x)")`);
    if (se.fn) return compileExpr(se.fn);
    const P = se.pts.slice().sort((a, b) => a[0] - b[0]);
    return x => { if (x <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) if (x <= P[i][0]) { const a = P[i - 1], b = P[i], t = (x - a[0]) / (b[0] - a[0] || 1); return a[1] + t * (b[1] - a[1]); } return P[P.length - 1][1]; };
  }
  function plotFills(s, series, X, Y, [x0, x1, y0, y1]) {
    const id = 'plh' + hid(s), hatch = new Set();
    let under = '', labels = '';
    const cy = v => Math.max(y0, Math.min(y1, isFinite(v) ? v : 0));
    const centroid = P => { let a = 0, cx = 0, cy2 = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], c = p[0] * q[1] - q[0] * p[1]; a += c; cx += (p[0] + q[0]) * c; cy2 += (p[1] + q[1]) * c; } return Math.abs(a) > 1e-9 ? [cx / (3 * a), cy2 / (3 * a)] : [P.reduce((t, p) => t + p[0], 0) / P.length, P.reduce((t, p) => t + p[1], 0) / P.length]; };
    const draw = (P, it, cls) => {
      const d = P.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + 'Z';
      if (it.fill !== false) under += `<g class="${cls}"><path d="${d}" class="pf"/></g>`;
      if (it.hatch) { hatch.add(cls); under += `<path d="${d}" fill="url(#${id}-${cls})" class="pfh"/>`; }
      if (it.outline) under += `<g class="${cls}"><path d="${d}" class="pfo${it.dash ? ' dashed' : ''}"/></g>`;
      if (it.label != null) { const c = centroid(P); labels += `<g class="${cls}">${T(c[0], c[1], it.label, { size: 11.5, weight: 700, cls: 'dt del pfl' })}</g>`; }
    };
    (Array.isArray(s.areas) ? s.areas : s.areas ? fail('plot', 'areas must be a list') : []).forEach((a, i) => {
      const who = `area ${i + 1}`;
      if (a.under == null && !Array.isArray(a.between)) fail('plot', `${who} needs under (a series number or an expression) or between: [series, series]`);
      const top = plotCurve(a.under != null ? a.under : a.between[0], series, who), bot = Array.isArray(a.between) ? plotCurve(a.between[1], series, who) : null;
      const lo = Math.max(x0, num(a.from, x0)), hi = Math.min(x1, num(a.to, x1));
      if (!(hi > lo)) fail('plot', `${who}: from must be less than to, inside the x range`);
      const N = 120, xs = Array.from({ length: N + 1 }, (_, k) => lo + ((hi - lo) * k) / N);
      const P = xs.map(x => [X(x), Y(cy(top(x)))]).concat(xs.slice().reverse().map(x => [X(x), Y(bot ? cy(bot(x)) : cy(0))]));
      const ref = a.under != null ? a.under : a.between[0];
      draw(P, a, a.color != null ? kc(a.color) : Number.isInteger(ref) && series[ref] ? series[ref].c : 'k0');
    });
    (Array.isArray(s.regions) ? s.regions : s.regions ? fail('plot', 'regions must be a list') : []).forEach((r, i) => {
      if (!Array.isArray(r.pts) || r.pts.length < 3 || r.pts.some(p => !isPt(p))) fail('plot', `region ${i + 1} needs pts: [[x, y], …] (at least 3 points)`);
      draw(r.pts.map(p => [X(p[0]), Y(p[1])]), r, kc(r.color != null ? r.color : 'a'));
    });
    if (hatch.size) under = `<defs>${[...hatch].map(hc => `<pattern id="${id}-${hc}" class="${hc}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="sh-hl"/></pattern>`).join('')}</defs>` + under;
    return { under, labels };
  }

  /* ============================================================== array */
  function array(s) {
    const cells = s.cells || [], cw = num(s.cell, 44), ch = 38, W = Math.max(num(s.w, 0), cells.length * cw + 24), y = top(s) + ((s.pointers || []).length ? 22 : 6);
    let o = '';
    cells.forEach((c0, i) => {
      const c = typeof c0 === 'object' && c0 !== null ? c0 : { v: c0 };
      const x = 12 + i * cw, k = c.hl ? kc(c.hl) : 'k8';
      o += `<g class="${k}"><rect x="${x}" y="${y}" width="${cw - 3}" height="${ch}" rx="6" class="nb${c.hl ? '' : ' plain'}"/>${T(x + (cw - 3) / 2, y + ch / 2, c.v, { size: 13, weight: 650 })}</g>`;
      if (s.index !== false) o += T(x + (cw - 3) / 2, y + ch + 12, c.i != null ? c.i : i, { size: 10, cls: 'dt dtm', mono: true });
    });
    (s.pointers || []).forEach(p => { const x = 12 + p.at * cw + (cw - 3) / 2; o += `<path d="M${x} ${y - 4} l-5 -9 h10z" class="nb solid k${KEY[p.color || 'a']}" />${T(x, y - 22, p.label, { size: 11, weight: 700 })}`; });
    return wrap(s, W, y + ch + (s.index !== false ? 28 : 10), o);              // the band under the cells holds their indices (P3-10)
  }

  /* ---------- helpers shared by kmap · circuit · wave · shapes ---------- */
  const fail = (type, msg) => { throw new Error(type + ': ' + msg); };
  const minW = W => (W > 440 ? ` style="min-width:${f(W * 0.7)}px"` : '');   // wide figures scroll sideways on phones rather than shrink past 70 %
  const hid = o => { let h = 2166136261; const t = JSON.stringify(o); for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619); return (h >>> 0).toString(36); };
  // label text where ~X (a run of letters/digits) or ~{any text} is drawn with an overline: ~Q is Q-bar, F = A·~B, ~{A+B}
  const OVL = /~(\{([^}]*)\}|[A-Za-z0-9]+)/g;
  const plain = t => String(t == null ? '' : t).replace(OVL, (m, g1, g2) => (g2 != null ? g2 : g1));
  const OT = (x, y, text, o) => {
    const s0 = String(text == null ? '' : text);
    if (!s0.match(OVL)) return T(x, y, s0, o);
    const piece = t => (hasMath(t) ? mathLine(t, (o && o.size) || 12).html : esc(t));
    let inner = '', last = 0;
    s0.replace(OVL, (m, g1, g2, at) => { inner += piece(s0.slice(last, at)) + `<tspan text-decoration="overline">${piece(g2 != null ? g2 : g1)}</tspan>`; last = at + m.length; return m; });
    return T(x, y, '\u0001', o).replace('\u0001', inner + piece(s0.slice(last)));
  };
  // rounded rectangle whose open sides (o.l/o.r/o.t/o.b) are left unstroked and unrounded: a K-map group piece that runs off the map edge
  function openRect(x1, y1, x2, y2, r, o) {
    const cl = { t: !o.t, r: !o.r, b: !o.b, l: !o.l };
    const rc = { tl: cl.t && cl.l ? r : 0, tr: cl.t && cl.r ? r : 0, br: cl.b && cl.r ? r : 0, bl: cl.b && cl.l ? r : 0 };
    const sides = [
      ['t', [x1 + rc.tl, y1], [x2 - rc.tr, y1], rc.tr, [x2, y1 + rc.tr]],
      ['r', [x2, y1 + rc.tr], [x2, y2 - rc.br], rc.br, [x2 - rc.br, y2]],
      ['b', [x2 - rc.br, y2], [x1 + rc.bl, y2], rc.bl, [x1, y2 - rc.bl]],
      ['l', [x1, y2 - rc.bl], [x1, y1 + rc.tl], rc.tl, [x1 + rc.tl, y1]]];
    const P = p => `${f(p[0])} ${f(p[1])}`;
    const fill = `M${P(sides[0][1])}` + sides.map(sd => `L${P(sd[2])}${sd[3] ? `A${f(sd[3])} ${f(sd[3])} 0 0 1 ${P(sd[4])}` : ''}`).join('') + 'Z';
    let stroke = '', pen = false;
    sides.forEach((sd, i) => {
      if (!cl[sd[0]]) { pen = false; return; }
      if (!pen) stroke += `M${P(sd[1])}`;
      stroke += `L${P(sd[2])}`;
      const nxt = sides[(i + 1) % 4];
      if (sd[3] && cl[nxt[0]]) { stroke += `A${f(sd[3])} ${f(sd[3])} 0 0 1 ${P(sd[4])}`; pen = true; } else pen = false;
    });
    if (cl.t && cl.r && cl.b && cl.l) stroke = fill;
    return { fill, stroke };
  }

  /* ============================================================== kmap */
  const GRAY = { 1: [0, 1], 2: [0, 1, 3, 2] };
  function kmapVars(s) {
    let v = s.vars;
    if (typeof v === 'string') v = v.includes(',') ? v.split(',').map(x => x.trim()) : v.replace(/\s+/g, '').split('');
    if (!Array.isArray(v) || v.length < 2 || v.length > 5) fail('kmap', 'vars must name 2 to 5 variables, e.g. "ABCD" or ["x1","x2","x3"]');
    v = v.map(String);
    if (new Set(v).size !== v.length) fail('kmap', 'variable names must be different');
    return v;
  }
  // term -> set of minterms. Product "AB'C" (1s) or sum "(A + B' + C)" (0s); "1" = whole map
  function kmapTerm(term, vars) {
    const n = vars.length, N = 1 << n;
    let t = String(term).replace(/[\s·*.]/g, '').replace(/[’′]/g, "'");
    const sum = t.includes('+') || /^\(.*\)$/.test(t);
    t = t.replace(/^\((.*)\)$/, '$1');
    if (t === '1' || t === '0' || t === '') return { sum: t === '0', cells: Array.from({ length: N }, (_, i) => i) };
    const names = vars.map((v, i) => [v, i]).sort((a, b) => b[0].length - a[0].length);
    const want = {};
    const lit = (str, at) => {
      let neg = false; while (/[~¬!]/.test(str[at])) { neg = !neg; at++; }
      const hit = names.find(([v]) => str.startsWith(v, at));
      if (!hit) fail('kmap', `group term "${term}": cannot read "${str.slice(at)}" (variables are ${vars.join(', ')})`);
      at += hit[0].length; while (str[at] === "'") { neg = !neg; at++; }
      if (want[hit[1]] != null) fail('kmap', `group term "${term}": ${hit[0]} appears twice`);
      want[hit[1]] = sum ? (neg ? 1 : 0) : (neg ? 0 : 1);
      return at;
    };
    if (sum) t.split('+').forEach(p => { if (lit(p, 0) !== p.length) fail('kmap', `group term "${term}": a sum term has one literal between + signs`); });
    else { let at = 0; while (at < t.length) at = lit(t, at); }
    const cells = [];
    for (let m = 0; m < N; m++) if (Object.keys(want).every(i => ((m >> (n - 1 - i)) & 1) === want[i])) cells.push(m);
    return { sum, cells };
  }
  // the simplest term covering exactly these cells (product of the constant variables, or their sum for a group of 0s)
  function kmapTermOf(cells, vars, sum) {
    const n = vars.length, lits = [];
    vars.forEach((v, i) => {
      const b = cells.map(m => (m >> (n - 1 - i)) & 1);
      if (b.every(x => x === b[0])) lits.push(sum ? (b[0] ? v + "'" : v) : (b[0] ? v : v + "'"));
    });
    if (!lits.length) return sum ? '0' : '1';
    return sum ? (lits.length > 1 ? '(' + lits.join(' + ') + ')' : lits[0]) : lits.join('');
  }
  // cyclic run on a ring of n positions covering exactly `set`: {start, len} or null
  function ring(set, n) {
    const len = set.size;
    if (len === n) return { start: 0, len };
    for (let s0 = 0; s0 < n; s0++) { let ok = true; for (let k = 0; k < len; k++) if (!set.has((s0 + k) % n)) { ok = false; break; } if (ok && !set.has((s0 + n - 1) % n)) return { start: s0, len }; }
    return null;
  }
  // geometry of a K-map: values, cell positions and group pieces (exported for tests and the K-map lab)
  function kmapModel(s) {
    const vars = kmapVars(s), n = vars.length, N = 1 << n, maps = n === 5 ? 2 : 1, inner = n === 5 ? vars.slice(1) : vars, k = inner.length;
    const rv = num(s.split, Math.floor(k / 2));
    if (!(rv >= 1 && rv <= 2 && k - rv >= 1 && k - rv <= 2)) fail('kmap', 'split (number of row variables) must leave 1 or 2 variables on each side');
    const rowVars = inner.slice(0, rv), colVars = inner.slice(rv), R = 1 << rv, C = 1 << (k - rv), rg = GRAY[rv], cg = GRAY[k - rv];
    const at = {}, cellAt = [];
    for (let m = 0; m < maps; m++) { cellAt.push([]); for (let r = 0; r < R; r++) { cellAt[m].push([]); for (let c = 0; c < C; c++) { const t = (m << k) | (rg[r] << (k - rv)) | cg[c]; at[t] = [m, r, c]; cellAt[m][r].push(t); } } }
    const val = new Array(N).fill(0);
    const idx = (list, key) => (list || []).map(x => { if (!Number.isInteger(x) || x < 0 || x >= N) fail('kmap', `${key} has ${JSON.stringify(x)}; minterms of ${n} variables are 0 to ${N - 1}`); return x; });
    if (s.grid) {
      if (!Array.isArray(s.grid) || s.grid.length !== R) fail('kmap', `grid needs ${R} rows (top to bottom, Gray order)`);
      s.grid.forEach((row, r) => {
        const cells = typeof row === 'string' ? row.replace(/[\s|]/g, '').split('') : Array.isArray(row) ? row.map(String) : fail('kmap', 'each grid row is a string like "1001" or an array');
        if (cells.length !== C * maps) fail('kmap', `grid row ${r + 1} has ${cells.length} cells, expected ${C * maps}`);
        cells.forEach((ch, j) => { const v = /^[1]$/.test(ch) ? 1 : /^[0]$/.test(ch) ? 0 : /^[xXd*-]$/.test(ch) ? 'X' : fail('kmap', `grid cell "${ch}": use 0, 1 or X`); val[cellAt[Math.floor(j / C)][r][j % C]] = v; });
      });
    } else {
      if (s.m && s.M) fail('kmap', 'give minterms (m) or maxterms (M), not both');
      if (s.M) { val.fill(1); idx(s.M, 'M').forEach(t => (val[t] = 0)); }
      idx(s.m, 'm').forEach(t => (val[t] = 1));
      idx(s.d, 'd').forEach(t => { if (s.m && s.m.includes(t)) fail('kmap', `cell ${t} is in both m and d`); if (s.M && s.M.includes(t)) fail('kmap', `cell ${t} is in both M and d`); val[t] = 'X'; });
    }
    const cover = new Array(N).fill(0);
    const groups = (s.groups || []).map((gr, gi) => {
      let cells, sum = null;
      if (gr.term != null) ({ cells, sum } = kmapTerm(gr.term, vars));
      else if (Array.isArray(gr.cells)) cells = idx(gr.cells, `group ${gi + 1} cells`);
      else fail('kmap', `group ${gi + 1} needs "term" (e.g. "B'D'") or "cells" (minterm numbers)`);
      cells = [...new Set(cells)].sort((a, b) => a - b);
      if (!cells.length) fail('kmap', `group ${gi + 1} is empty`);
      const vs = new Set(cells.map(t => val[t]));
      if (vs.has(1) && vs.has(0) && !gr.wrong) fail('kmap', `group ${gr.label || gr.term || gi + 1} covers both 1s and 0s (add "wrong": true to draw a deliberately wrong group)`);
      if (sum == null) sum = vs.has(0) && !vs.has(1);
      else if (!gr.wrong && vs.has(sum ? 1 : 0)) fail('kmap', `group ${gr.term} covers a ${sum ? 1 : 0} (a ${sum ? 'sum term groups 0s' : 'product term groups 1s'})`);
      const inMap = [0, 1].slice(0, maps).map(m => cells.filter(t => at[t][0] === m)).filter(x => x.length);
      let shape = null;
      const pieces = [];
      inMap.forEach(list => {
        const rows = new Set(list.map(t => at[t][1])), cols = new Set(list.map(t => at[t][2]));
        const rr = ring(rows, R), cc = ring(cols, C);
        const p2 = x => x === 1 || x === 2 || x === 4;
        if (!rr || !cc || rows.size * cols.size !== list.length || !p2(rows.size) || !p2(cols.size)) fail('kmap', `group ${gr.label || gr.term || gi + 1} (cells ${cells.join(',')}) is not a rectangle of 1, 2, 4, 8 or 16 adjacent cells`);
        const sig = [...rows].sort() + '/' + [...cols].sort();
        if (shape && shape !== sig) fail('kmap', `group ${gr.label || gr.term || gi + 1} must cover the same cells in both maps`);
        shape = sig;
        const segs = (q, n0) => (q.start + q.len <= n0 ? [[q.start, q.start + q.len - 1, false, false]] : [[q.start, n0 - 1, false, true], [0, (q.start + q.len - 1) % n0, true, false]]);
        segs(rr, R).forEach(rs => segs(cc, C).forEach(cs => pieces.push({ map: at[list[0]][0], r0: rs[0], r1: rs[1], c0: cs[0], c1: cs[1], open: { t: rs[2], b: rs[3], l: cs[2], r: cs[3] } })));
      });
      const level = Math.min(3, Math.max(...cells.map(t => cover[t])));
      cells.forEach(t => cover[t]++);
      return { cells, sum, pieces, level, color: kc(gr.color, gi), label: gr.label != null ? String(gr.label) : gr.term != null ? String(gr.term) : kmapTermOf(cells, vars, sum), wrong: !!gr.wrong };
    });
    return { vars, n, N, maps, rowVars, colVars, R, C, rg, cg, val, at, cellAt, groups };
  }
  /** a group's loop number: its own "n", else its place in the list when the spec says number: true, else '' (P2-61) */
  const kmapNum = (s, gi) => { const g0 = (s.groups || [])[gi] || {}; return g0.n != null && g0.n !== '' ? String(g0.n) : s.number ? String(gi + 1) : ''; };
  function kmap(s) {
    const K = kmapModel(s), cs = num(s.cell, 44), sep = K.vars.every(v => v.length === 1) ? '' : ' ';
    const rn = K.rowVars.join(sep), cn = K.colVars.join(sep);
    const gl = k => GRAY[k].map(v => v.toString(2).padStart(k, '0'));
    const rl = gl(K.rowVars.length), cl = gl(K.colVars.length);
    const hw = Math.max(40, tw(rn, 12.5) + tw(cn, 12.5) + 10, tw(rl[0], 11.5) + 18), hh = 32;
    const mapW = hw + K.C * cs, gapM = 30;
    const legendRight = K.maps === 1 && K.groups.length && s.legend !== 'below' && s.legend !== false;
    const legend = s.legend !== false && K.groups.length;
    const y0 = top(s) + (K.maps === 2 ? 20 : 0), gy = y0 + hh, L = 6;
    const gx = m => L + hw + m * (mapW + gapM);
    let hl = {};
    if (Array.isArray(s.hl)) s.hl.forEach(t => (hl[t] = 'warn')); else if (s.hl) hl = s.hl;
    let o = '';
    for (let m = 0; m < K.maps; m++) {
      const X0 = gx(m);
      if (K.maps === 2) o += T(X0 + (K.C * cs) / 2, y0 - 10, `${K.vars[0]} = ${m}`, { size: 12.5, weight: 700 });
      o += `<line x1="${f(X0)}" y1="${f(gy)}" x2="${f(X0 - hw + 4)}" y2="${f(gy - hh + 4)}" class="km-dg"/>`;
      o += T(X0 - hw + 4, gy - 8, rn, { anchor: 'start', size: 12.5, weight: 700, cls: 'dt km-v' }) + T(X0 - 3, gy - hh + 8, cn, { anchor: 'end', size: 12.5, weight: 700, cls: 'dt km-v' });
      cl.forEach((lab, c) => (o += T(X0 + (c + 0.5) * cs, gy - 9, lab, { size: 11.5, weight: 600, cls: 'dt dtm', mono: true })));
      rl.forEach((lab, r) => (o += T(X0 - 8, gy + (r + 0.5) * cs, lab, { anchor: 'end', size: 11.5, weight: 600, cls: 'dt dtm', mono: true })));
      for (let r = 0; r < K.R; r++) for (let c = 0; c < K.C; c++) {
        const t = K.cellAt[m][r][c], x = X0 + c * cs, y = gy + r * cs;
        o += `<rect x="${f(x)}" y="${f(y)}" width="${cs}" height="${cs}" class="km-c${hl[t] != null ? ' ' + kc(hl[t]) + ' km-hl' : ''}" data-m="${t}"/>`;
      }
      o += `<rect x="${f(X0)}" y="${f(gy)}" width="${K.C * cs}" height="${K.R * cs}" class="km-b"/>`;
    }
    // group fills under the values, outlines above them
    let fills = '', lines = '';
    K.groups.forEach(gr => gr.pieces.forEach(p => {
      const ins = 3 + gr.level * 4, ov = 6, X0 = gx(p.map);
      const x1 = X0 + p.c0 * cs + (p.open.l ? -ov : ins), x2 = X0 + (p.c1 + 1) * cs + (p.open.r ? ov : -ins);
      const y1 = gy + p.r0 * cs + (p.open.t ? -ov : ins), y2 = gy + (p.r1 + 1) * cs + (p.open.b ? ov : -ins);
      const rad = Math.min(cs * 0.3, (x2 - x1) / 2, (y2 - y1) / 2), pp = openRect(x1, y1, x2, y2, rad, p.open);
      const cut = (v, open, d) => (open ? v - d * ov : v);   // the tint stops at the map edge; only the outline runs past it
      const pf = openRect(cut(x1, p.open.l, -1), cut(y1, p.open.t, -1), cut(x2, p.open.r, 1), cut(y2, p.open.b, 1), rad, p.open);
      fills += `<g class="${gr.color}"><path d="${pf.fill}" class="km-gf"/></g>`;
      lines += `<g class="${gr.color}"><path d="${pp.stroke}" class="km-g${gr.wrong ? ' km-wrong' : ''}"/></g>`;
    }));
    o += fills;
    // how many tints lie under each cell: a highlight and every loop's fill (where loops overlap their tints stack). A don't-care on a tint
    // takes a stronger ink, the second ink (the ink itself in dark under three or more), so it keeps 4.5:1 (P1-14)
    const tints = {};
    for (let m = 0; m < K.maps; m++) for (let r = 0; r < K.R; r++) for (let c = 0; c < K.C; c++) if (hl[K.cellAt[m][r][c]] != null) tints[`${m}:${r}:${c}`] = 1;
    K.groups.forEach(gr => gr.pieces.forEach(p => { for (let r = p.r0; r <= p.r1; r++) for (let c = p.c0; c <= p.c1; c++) tints[`${p.map}:${r}:${c}`] = (tints[`${p.map}:${r}:${c}`] || 0) + 1; }));
    const key = K.groups.length && K.groups.every(gr => gr.sum) ? 0 : 1;   // the values being grouped are drawn bold, the others faint
    for (let m = 0; m < K.maps; m++) for (let r = 0; r < K.R; r++) for (let c = 0; c < K.C; c++) {
      const t = K.cellAt[m][r][c], v = K.val[t], x = gx(m) + c * cs, y = gy + r * cs, under = tints[`${m}:${r}:${c}`] || 0;
      if (v === 'X') o += T(x + cs / 2, y + cs / 2 + 1, 'X', { size: 13.5, weight: 650, cls: 'dt km-x' + (under ? ' on-tint' : '') + (under >= 3 ? ' on-tint-3' : '') });
      else if (v === key) o += T(x + cs / 2, y + cs / 2 + 1, v, { size: 15, weight: 700 });
      else if (v === 1 || s.zeros !== false) o += T(x + cs / 2, y + cs / 2 + 1, v, { size: 14, weight: 500, cls: 'dt km-0' });
    }
    o += lines;
    if (s.index) for (let m = 0; m < K.maps; m++) for (let r = 0; r < K.R; r++) for (let c = 0; c < K.C; c++) o += T(gx(m) + c * cs + 4, gy + r * cs + 9, K.cellAt[m][r][c], { anchor: 'start', size: 10, cls: 'dt dtm km-i', mono: true });
    /* numbered loops (number: true, or a group's "n"; off by default): a badge with the number on each loop, so loops are told apart without
       colour (P2-61), repeated in the legend. It sits in a cell's top-right corner, which nothing else uses (the index is top-left, the value
       in the middle): the loop's top row from the right, then its right column, then its other cells; never two badges in one corner. */
    const nb = (n, x, y, gr) => `<g class="${gr.color}"><circle cx="${f(x)}" cy="${f(y)}" r="7.5" class="km-nb"/>${T(x, y + 0.5, n, { size: n.length > 1 ? 9.5 : 10.5, weight: 700, cls: 'dt km-n' })}</g>`;
    const taken = new Set();
    K.groups.forEach((gr, gi) => {
      gr.nb = kmapNum(s, gi);
      if (!gr.nb) return;
      const cand = [], ps = gr.pieces.slice().sort((a, b) => a.map - b.map || a.r0 - b.r0 || b.c1 - a.c1);   // a loop that wraps: its top-right piece first
      ps.forEach(p => { for (let c = p.c1; c >= p.c0; c--) cand.push([p.map, p.r0, c]); for (let r = p.r0 + 1; r <= p.r1; r++) cand.push([p.map, r, p.c1]); });
      ps.forEach(p => { for (let r = p.r0 + 1; r <= p.r1; r++) for (let c = p.c1 - 1; c >= p.c0; c--) cand.push([p.map, r, c]); });
      const at = cand.find(q => !taken.has(q.join(':'))) || cand[0];
      taken.add(at.join(':'));
      o += nb(gr.nb, gx(at[0]) + (at[2] + 1) * cs - 9.5, gy + at[1] * cs + 9.5, gr);
    });
    let W = gx(K.maps - 1) + K.C * cs + 8, H = gy + K.R * cs + 8;
    if (legend) {
      const nw = K.groups.some(gr => gr.nb) ? 21 : 0;                // the loop's number badge before its swatch (numbered loops)
      const item = (gr, x, y) => (gr.nb ? nb(gr.nb, x + 7.5, y, gr) : '') + `<g class="${gr.color}"><rect x="${f(x + nw)}" y="${f(y - 6)}" width="18" height="12" rx="4" class="km-gf km-sw"/><rect x="${f(x + nw)}" y="${f(y - 6)}" width="18" height="12" rx="4" class="km-g km-sw${gr.wrong ? ' km-wrong' : ''}"/></g>${T(x + nw + 25, y, gr.label, { anchor: 'start', size: 12.5, weight: 650 })}`;
      if (legendRight) {
        const lx = W + 14;
        K.groups.forEach((gr, i) => (o += item(gr, lx, gy + 10 + i * 22)));
        W = lx + nw + 25 + Math.max(...K.groups.map(gr => tw(gr.label, 12.5))) + 10;
        H = Math.max(H, gy + 10 + K.groups.length * 22);
      } else {
        let x = L + 4, y = H + 10;
        K.groups.forEach(gr => { const w = nw + 25 + tw(gr.label, 12.5) + 18; if (x + w > W && x > L + 4) { x = L + 4; y += 22; } o += item(gr, x, y); x += w; });
        H = y + 14;
      }
    }
    if (s.title) W = Math.max(W, tw(s.title, 13) + 16);
    return wrap(s, W, H, o, minW(W));
  }

  /* ============================================================== circuit */
  const CK_GATES = ['and', 'or', 'not', 'nand', 'nor', 'xor', 'xnor', 'buf'];
  const CK_BLOCKS = ['mux', 'dec', 'enc', 'fa', 'ha', 'dff', 'tff', 'jkff', 'srff', 'box'];
  const BR = 3.5;                                                     // inversion bubble radius
  const DIRV = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };
  const PIN_TEXT = { clk: '', qn: '~Q', q: 'Q', cin: 'Cin', cout: 'Cout', pre: 'PRE', clr: 'CLR', en: 'EN' };
  const ckPinText = nm => (PIN_TEXT[nm] != null ? PIN_TEXT[nm] : nm.charAt(0).toUpperCase() + nm.slice(1));
  // pin lists of the block presets: {l, r, t, b} arrays of "name" or "name:Label"
  function ckBlockPins(p) {
    const k = p.kind, n = num(p.n, 0);
    const ff = { dff: ['d', 'clk'], tff: ['t', 'clk'], jkff: ['j', 'clk', 'k'], srff: ['s', 'clk', 'r'] }[k];
    if (ff) return { l: ff, r: ['q', 'qn'], t: p.pre ? ['pre'] : [], b: p.clr ? ['clr'] : [], label: p.label || '' };
    if (k === 'fa') return p.chain ? { t: ['a', 'b'], r: ['cin'], l: ['cout'], b: ['s'], label: p.label != null ? p.label : 'FA' } : { l: ['a', 'b', 'cin'], r: ['s', 'cout'], t: [], b: [], label: p.label != null ? p.label : 'FA' };
    if (k === 'ha') return { l: ['a', 'b'], r: ['s', 'c'], t: [], b: [], label: p.label != null ? p.label : 'HA' };
    if (k === 'dec') {
      const m = n || 2; if (m < 1 || m > 4) fail('circuit', `decoder ${p.id}: n (number of inputs) must be 1 to 4`);
      return { l: Array.from({ length: m }, (_, i) => 'a' + (m - 1 - i)), r: Array.from({ length: 1 << m }, (_, i) => 'y' + i), t: [], b: p.en ? ['en'] : [], label: p.label != null ? p.label : `${m}×${1 << m}\nDEC` };
    }
    if (k === 'enc') {
      const m = n || 4, kk = Math.ceil(Math.log2(m)); if (m < 2 || m > 16) fail('circuit', `encoder ${p.id}: n (number of inputs) must be 2 to 16`);
      return { l: Array.from({ length: m }, (_, i) => 'i' + i), r: Array.from({ length: kk }, (_, i) => 'y' + (kk - 1 - i)).concat(p.valid ? ['v'] : []), t: [], b: p.en ? ['en'] : [], label: p.label != null ? p.label : `${m}×${kk}\nENC` };
    }
    const P = p.pins || {};
    ['l', 'r', 't', 'b'].forEach(sd => { if (P[sd] != null && !Array.isArray(P[sd])) fail('circuit', `box ${p.id}: pins.${sd} must be a list of pin names`); });
    if (!['l', 'r', 't', 'b'].some(sd => (P[sd] || []).length)) fail('circuit', `box ${p.id} needs pins, e.g. {"l":["a","b"],"r":["y"]}`);
    return { l: P.l || [], r: P.r || [], t: P.t || [], b: P.b || [], label: p.label || '' };
  }
  function ckPart(p, cw, rh, pinAt) {
    if (!p || typeof p.id !== 'string' || !p.id || p.id.includes('.')) fail('circuit', `every part needs an "id" without dots (got ${JSON.stringify(p && p.id)})`);
    const kind = p.kind;
    if (kind !== 'in' && kind !== 'out' && !CK_GATES.includes(kind) && !CK_BLOCKS.includes(kind)) fail('circuit', `part ${p.id}: unknown kind "${kind}" (use in, out, ${CK_GATES.join(', ')}, ${CK_BLOCKS.join(', ')})`);
    if (!Array.isArray(p.at) || p.at.length !== 2) fail('circuit', `part ${p.id} needs "at": [column, row]`);
    const coord = (v, unit, axis) => { if (typeof v === 'number' && isFinite(v)) return v * unit; if (typeof v === 'string') { const q = pinAt(v, p.id); return axis ? q.y : q.x; } return fail('circuit', `part ${p.id}: "at" needs numbers (or a pin like "g1.2" to line up with)`); };
    const X = coord(p.at[0], cw, 0), Y = coord(p.at[1], rh, 1);
    const neg = new Set((p.neg || []).map(String));
    const P = { id: p.id, kind, x: X, y: Y, pins: {}, body: '', text: '', color: p.color != null ? kc(p.color) : null };
    const pin = (nm, x, y, d) => (P.pins[nm] = { x, y, d });
    const bub = (cx, cy) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${BR}" class="ck-p"/>`;
    if (kind === 'in' || kind === 'out') {
      const side = p.side || (kind === 'in' ? 'r' : 'l');
      if (!DIRV[side]) fail('circuit', `terminal ${p.id}: side must be l, r, t or b`);
      pin('p', X, Y, side);
      const lab = p.label != null ? String(p.label) : p.id, w = tw(plain(lab), 12.5);
      const [lx, ly, an] = side === 'r' ? [X - 4, Y, 'end'] : side === 'l' ? [X + 4, Y, 'start'] : side === 't' ? [X, Y + 10, 'middle'] : [X, Y - 10, 'middle'];
      P.text = OT(lx, ly, lab, { anchor: an, size: 12.5, weight: 650, cls: 'dt ck-tl' });
      P.bb = side === 'r' ? [X - w - 6, Y - 9, X, Y + 9] : side === 'l' ? [X, Y - 9, X + w + 6, Y + 9] : [X - w / 2 - 2, Math.min(Y, ly - 8), X + w / 2 + 2, Math.max(Y, ly + 8)];
      return P;
    }
    if (CK_GATES.includes(kind)) {
      const one = kind === 'not' || kind === 'buf', n = one ? 1 : Math.round(num(p.n, 2));
      if (n < 2 && !one) fail('circuit', `gate ${p.id}: n (inputs) must be at least 2`);
      if (n > 12) fail('circuit', `gate ${p.id}: at most 12 inputs`);
      const sp = n <= 2 ? 14 : n === 3 ? 12 : 10, orish = ['or', 'nor', 'xor', 'xnor'].includes(kind);
      const xorish = kind === 'xor' || kind === 'xnor', inv = kind === 'not' || kind === 'nand' || kind === 'nor' || kind === 'xnor' || neg.has('y');
      const H = one ? 26 : Math.max(30, (n - 1) * sp + 18), W = one ? 26 : orish ? Math.max(38, H / 2 + 20) : Math.max(36, H / 2 + 18);
      const x0 = X - W / 2, y0 = Y - H / 2, x1 = x0 + W, y1 = y0 + H, d = Math.min(9, H * 0.22);
      let body;
      if (one) body = `M${f(x0)} ${f(y0)} L${f(x1)} ${f(Y)} L${f(x0)} ${f(y1)}Z`;
      else if (orish) body = `M${f(x0)} ${f(y0)} C${f(x0 + W * 0.5)} ${f(y0)} ${f(x0 + W * 0.86)} ${f(Y - H * 0.24)} ${f(x1)} ${f(Y)} C${f(x0 + W * 0.86)} ${f(Y + H * 0.24)} ${f(x0 + W * 0.5)} ${f(y1)} ${f(x0)} ${f(y1)} Q${f(x0 + 2 * d)} ${f(Y)} ${f(x0)} ${f(y0)}Z`;
      else body = `M${f(x0)} ${f(y0)} H${f(x1 - H / 2)} A${f(H / 2)} ${f(H / 2)} 0 0 1 ${f(x1 - H / 2)} ${f(y1)} H${f(x0)}Z`;
      P.body = `<path d="${body}" class="ck-p"/>` + (xorish ? `<path d="M${f(x0 - 6)} ${f(y1)} Q${f(x0 - 6 + 2 * d)} ${f(Y)} ${f(x0 - 6)} ${f(y0)}" class="ck-l"/>` : '');
      for (let i = 0; i < n; i++) {
        const py = Y + (i - (n - 1) / 2) * sp, t = (py - y0) / H;
        let bx = orish ? x0 - (xorish ? 6 : 0) + 2 * d * t * (1 - t) : x0;
        if (neg.has(String(i + 1))) { P.body += bub(bx - BR, py); bx -= 2 * BR; }
        pin(String(i + 1), bx, py, 'l');
      }
      if (inv) { P.body += bub(x1 + BR, Y); pin('y', x1 + 2 * BR, Y, 'r'); } else pin('y', x1, Y, 'r');
      if (p.label) P.text = T(X + (orish ? 3 : one ? -5 : -2), Y, p.label, { size: 10, weight: 650, cls: 'dt ck-pl' });
      P.bb = [x0 - (xorish ? 6 : 0) - (neg.size ? 2 * BR : 0), y0, x1 + (inv ? 2 * BR : 0), y1];
      return P;
    }
    if (kind === 'mux') {
      const n = Math.round(num(p.n, 2)), k = Math.log2(n);
      if (![2, 4, 8, 16].includes(n)) fail('circuit', `mux ${p.id}: n (data inputs) must be 2, 4, 8 or 16`);
      const gap = n <= 4 ? 18 : 16, H = n * gap + (k > 1 ? 28 : 16), W = n <= 2 ? 36 : n <= 4 ? 46 : 52, x0 = X - W / 2, y0 = Y - H / 2, x1 = x0 + W, y1 = y0 + H, d = Math.min(12, H * 0.18);
      P.body = `<path d="M${f(x0)} ${f(y0)} L${f(x1)} ${f(y0 + d)} L${f(x1)} ${f(y1 - d)} L${f(x0)} ${f(y1)}Z" class="ck-p"/>`;
      for (let i = 0; i < n; i++) { const py = y0 + 8 + gap * (i + 0.5); pin('d' + i, x0, py, 'l'); P.text += T(x0 + 4, py, i, { anchor: 'start', size: 10, weight: 600, cls: 'dt ck-pl', mono: true }); }
      for (let j = 0; j < k; j++) {
        const nm = 's' + (k - 1 - j), px = x0 + (W * (j + 1)) / (k + 1), py = y1 - (d * (px - x0)) / W;
        pin(nm, px, py, 'b'); if (k === 1) P.pins.s = P.pins.s0;
        if (k > 1) P.text += T(px, py - 9, 'S' + (k - 1 - j), { size: 10, weight: 600, cls: 'dt ck-pl' });
      }
      if (p.en) { const py = y0 + (d * (X - x0)) / W; if (neg.has('en')) { P.body += bub(X, py - BR); pin('en', X, py - 2 * BR, 't'); } else pin('en', X, py, 't'); }
      pin('y', x1, Y, 'r');
      if (p.label) P.text += T(X + 4, Y, p.label, { size: 10, weight: 700, cls: 'dt ck-pl' });
      P.bb = [x0, y0 - (p.en && neg.has('en') ? 2 * BR : 0), x1, y1];
      return P;
    }
    // rectangular blocks: dec, enc, fa, ha, flip-flops, box
    const bp = ckBlockPins(p), split = s0 => { const i = String(s0).indexOf(':'); return i > 0 ? [String(s0).slice(0, i), String(s0).slice(i + 1)] : [String(s0), ckPinText(String(s0))]; };
    const sides = { l: bp.l.map(split), r: bp.r.map(split), t: bp.t.map(split), b: bp.b.map(split) };
    const isFF = /ff$/.test(kind), lab = String(bp.label || '');
    const lw = sd => Math.max(0, ...sides[sd].map(([, t]) => tw(plain(t), 10)));
    const cwid = Math.max(0, ...lab.split('\n').map(l => tw(l, 11)));
    const minW = isFF ? 56 : kind === 'fa' && p.chain ? 64 : 48, minH = isFF ? (sides.l.length > 2 ? 68 : 60) : 44;
    const sz = Array.isArray(p.size) ? p.size : [];
    const padT = sides.t.length ? 12 : 0, padB = sides.b.length ? 12 : 0;
    const W = Math.max(num(sz[0], 0), minW, lw('l') + lw('r') + cwid + 34, Math.max(sides.t.length, sides.b.length) * 24 + 8);
    const H = Math.max(num(sz[1], 0), minH, Math.max(sides.l.length, sides.r.length) * 16 + 10 + padT + padB, padT + padB + lab.split('\n').length * 14 + 26);
    const x0 = X - W / 2, y0 = Y - H / 2, x1 = x0 + W, y1 = y0 + H;
    P.body = `<rect x="${f(x0)}" y="${f(y0)}" width="${f(W)}" height="${f(H)}" rx="3" class="ck-p"/>`;
    const seen = new Set();
    let ext = { l: 0, r: 0, t: 0, b: 0 };
    ['l', 'r', 't', 'b'].forEach(sd => sides[sd].forEach(([nm, txt], i, arr) => {
      if (seen.has(nm)) fail('circuit', `${kind} ${p.id}: pin "${nm}" appears twice`); seen.add(nm);
      const k = arr.length, horiz = sd === 'l' || sd === 'r';
      let px = horiz ? (sd === 'l' ? x0 : x1) : x0 + (W * (i + 0.5)) / k, py = horiz ? y0 + padT + ((H - padT - padB) * (i + 0.5)) / k : sd === 't' ? y0 : y1;
      const clk = nm === 'clk';
      if (clk) P.body += `<path d="M${f(px)} ${f(py - 6)} L${f(px + (sd === 'l' ? 8 : -8))} ${f(py)} L${f(px)} ${f(py + 6)}" class="ck-l"/>`;
      if (neg.has(nm) || (clk && p.edge === 'neg')) { const [vx, vy] = DIRV[sd]; P.body += bub(px + vx * BR, py + vy * BR); px += vx * 2 * BR; py += vy * 2 * BR; ext[sd] = 2 * BR; }
      pin(nm, px, py, sd);
      if (!clk && txt) {
        const at = sd === 'l' ? [x0 + 5, py, 'start'] : sd === 'r' ? [x1 - 5, py, 'end'] : sd === 't' ? [px, y0 + 9, 'middle'] : [px, y1 - 9, 'middle'];
        P.text += OT(at[0], at[1], txt, { anchor: at[2], size: 10, weight: 600, cls: 'dt ck-pl' });
      }
    }));
    if (lab) P.text += T(X, Y + (sides.t.length && !sides.b.length ? 5 : !sides.t.length && sides.b.length ? -5 : 0), lab, { size: 11, weight: 700 });
    P.bb = [x0 - ext.l, y0 - ext.t, x1 + ext.r, y1 + ext.b];
    return P;
  }
  // orthogonal route between two pins; o.x / o.y fix the trunk column / detour row (px), o.via lists waypoints (px)
  function ckRoute(A, B, o) {
    const s = 12, pts = [[A.x, A.y]];
    const hA = A.d === 'l' || A.d === 'r', hB = B.d === 'l' || B.d === 'r';
    const [ax, ay] = DIRV[A.d], [bx, by] = DIRV[B.d];
    if (o.via && o.via.length) {
      let horiz = hA;                                  // axis we are moving along; an elbow first continues it
      const all = o.via.concat([[B.x, B.y]]);
      all.forEach((q, i) => {
        const p0 = pts[pts.length - 1], last = i === all.length - 1;
        if (Math.abs(p0[0] - q[0]) > 0.01 && Math.abs(p0[1] - q[1]) > 0.01) {
          const hFirst = last ? !hB : horiz;           // the last leg must reach the pin along its own axis
          pts.push(hFirst ? [q[0], p0[1]] : [p0[0], q[1]]);
          horiz = !hFirst;
        } else if (Math.abs(p0[0] - q[0]) > 0.01 || Math.abs(p0[1] - q[1]) > 0.01) horiz = Math.abs(p0[1] - q[1]) < 0.01;
        pts.push([q[0], q[1]]);
      });
    } else if (hA && hB) {
      const ahead = (B.x - A.x) * ax > 4 && ax === -bx;
      if (ahead && Math.abs(A.y - B.y) < 0.5) pts.push([B.x, B.y]);
      else if (ahead) { const xm = o.x != null ? o.x : (A.x + B.x) / 2; pts.push([xm, A.y], [xm, B.y], [B.x, B.y]); }
      else if (ax === bx) { const xm = o.x != null ? o.x : ax > 0 ? Math.max(A.x, B.x) + s : Math.min(A.x, B.x) - s; pts.push([xm, A.y], [xm, B.y], [B.x, B.y]); }
      else { const ym = o.y != null ? o.y : o.yDefault; pts.push([A.x + ax * s, A.y], [A.x + ax * s, ym], [B.x + bx * s, ym], [B.x + bx * s, B.y], [B.x, B.y]); }
    } else if (hA && !hB) {
      const ahead = (B.x - A.x) * ax > 0, side = (A.y - B.y) * by > 0;
      if (ahead && side) pts.push([B.x, A.y], [B.x, B.y]);
      else if (ahead) { const xm = o.x != null ? o.x : (A.x + B.x) / 2, yb = B.y + by * s; pts.push([xm, A.y], [xm, yb], [B.x, yb], [B.x, B.y]); }
      else { const yb = B.y + by * s; pts.push([A.x + ax * s, A.y], [A.x + ax * s, yb], [B.x, yb], [B.x, B.y]); }
    } else if (!hA && hB) {
      const ahead = (B.y - A.y) * ay > 0, side = (A.x - B.x) * bx > 0;
      if (ahead && side) pts.push([A.x, B.y], [B.x, B.y]);
      else { const ya = o.y != null ? o.y : A.y + ay * s, xb = B.x + bx * s; pts.push([A.x, ya], [xb, ya], [xb, B.y], [B.x, B.y]); }
    } else {
      const ahead = (B.y - A.y) * ay > 0 && ay === -by;
      if (ahead && Math.abs(A.x - B.x) < 0.5) pts.push([B.x, B.y]);
      else if (ahead) { const ym = o.y != null ? o.y : (A.y + B.y) / 2; pts.push([A.x, ym], [B.x, ym], [B.x, B.y]); }
      else { const ym = o.y != null ? o.y : ay > 0 ? Math.max(A.y, B.y) + s : Math.min(A.y, B.y) - s; pts.push([A.x, ym], [B.x, ym], [B.x, B.y]); }
    }
    // drop repeated and collinear points
    const out = [];
    pts.forEach(p => { const q = out[out.length - 1]; if (q && Math.abs(q[0] - p[0]) < 0.01 && Math.abs(q[1] - p[1]) < 0.01) return; out.push(p); });
    for (let i = out.length - 2; i > 0; i--) { const a = out[i - 1], b = out[i], c = out[i + 1]; if ((Math.abs(a[0] - b[0]) < 0.01 && Math.abs(b[0] - c[0]) < 0.01) || (Math.abs(a[1] - b[1]) < 0.01 && Math.abs(b[1] - c[1]) < 0.01)) out.splice(i, 1); }
    return out;
  }
  // layout of a circuit: parts with pins, routed wires, junction dots (exported for tests)
  function circuitModel(s) {
    const g0 = Array.isArray(s.grid) ? s.grid : [];
    const cw = num(g0[0], 70), rh = num(g0[1], 46);
    if (!Array.isArray(s.parts) || !s.parts.length) fail('circuit', 'needs "parts": a list of gates, blocks and in/out terminals');
    const parts = {}, order = [];
    const pinAt = (ref, who) => {
      const [id, pn] = String(ref).split('.');
      const P = parts[id];
      if (!P) fail('circuit', `${who}: no part "${id}"${s.parts.some(q => q && q.id === id) ? ' yet (a part can only line up with parts listed before it)' : ''}`);
      const nm = pn != null ? pn : P.kind === 'in' || P.kind === 'out' ? 'p' : P.pins.y ? 'y' : P.pins.q ? 'q' : null;
      if (!nm || !P.pins[nm]) fail('circuit', `${who}: ${id} has no pin "${pn != null ? pn : ''}" (pins: ${Object.keys(P.pins).filter(k => k !== 'p').join(', ') || 'p'})`);
      return P.pins[nm];
    };
    s.parts.forEach(p => { const P = ckPart(p, cw, rh, pinAt); if (parts[P.id]) fail('circuit', `two parts are called "${P.id}"`); parts[P.id] = P; order.push(P); });
    const ref = (r, who, end) => {
      const [id, pn] = String(r).split('.');
      const P = parts[id];
      if (!P) fail('circuit', `wire ${who}: no part "${id}"`);
      let nm = pn;
      if (nm == null) nm = P.kind === 'in' || P.kind === 'out' ? 'p' : end === 'to' ? (P.kind === 'not' || P.kind === 'buf' ? '1' : null) : P.pins.y ? 'y' : P.pins.q ? 'q' : null;
      if (nm == null || !P.pins[nm]) fail('circuit', `wire ${who}: ${nm == null ? `say which pin of ${id}` : `${id} has no pin "${nm}"`} (pins: ${Object.keys(P.pins).filter(k => k !== 'p').join(', ')})`);
      return { part: id, pin: nm, key: id + '.' + nm, ...P.pins[nm] };
    };
    const wires = (s.wires || []).map((w, wi) => {
      const o = Array.isArray(w) ? Object.assign({ from: w[0], to: w[1] }, w[2] || {}) : w || {};
      if (o.from == null || o.to == null) fail('circuit', `wire ${wi + 1} needs from and to`);
      const who = `${o.from} -> ${Array.isArray(o.to) ? o.to.join(',') : o.to}`;
      const A = ref(o.from, who, 'from');
      const Bs = (Array.isArray(o.to) ? o.to : [o.to]).map(t => ref(t, who, 'to'));
      if (o.via && (!Array.isArray(o.via) || o.via.some(v => !Array.isArray(v) || v.length !== 2 || v.some(c => typeof c !== 'number' || !isFinite(c))))) fail('circuit', `wire ${who}: via must be a list of [column, row] points`);
      return { o, A, Bs, who };
    });
    // default detour row: just below everything the wire's two parts occupy
    const bottom = id => parts[id].bb[3];
    // trunk columns: one shared vertical per net; nets whose trunks would coincide are spread across the gap
    const nets = {};
    const ahead = (A, B) => (A.d === 'l' || A.d === 'r') && (B.d === 'l' || B.d === 'r') && (B.x - A.x) * DIRV[A.d][0] > 4 && DIRV[A.d][0] === -DIRV[B.d][0];
    wires.forEach(w => w.Bs.forEach(B => {
      const A = w.A;
      if (w.o.via || !ahead(A, B) || Math.abs(A.y - B.y) < 0.5) return;
      const n0 = nets[A.key] = nets[A.key] || { A, y0: A.y, y1: A.y, fixed: null };
      n0.y0 = Math.min(n0.y0, B.y); n0.y1 = Math.max(n0.y1, B.y);
      if (w.o.x != null) n0.fixed = w.o.x * cw;
    }));
    // the trunk sits in the gap before the nearest part the net feeds (straight branches count too)
    Object.values(nets).forEach(n0 => {
      const xs = wires.filter(w => w.A.key === n0.A.key).flatMap(w => w.Bs.filter(B => ahead(n0.A, B)).map(B => B.x));
      n0.lo = DIRV[n0.A.d][0] > 0 ? Math.min(...xs) : Math.max(...xs);
    });
    const auto = Object.values(nets).filter(n0 => n0.fixed == null);
    auto.forEach(n0 => (n0.x = (n0.A.x + n0.lo) / 2));
    const clusterOf = new Map();
    auto.forEach((a, i) => auto.forEach((b, j) => {
      if (j <= i || Math.abs(a.x - b.x) > 14 || a.y1 < b.y0 - 2 || b.y1 < a.y0 - 2) return;
      const ca = clusterOf.get(a) || [a], cb = clusterOf.get(b) || [b];
      if (ca === cb) return;
      const m = ca.concat(cb.filter(x => !ca.includes(x)));
      m.forEach(x => clusterOf.set(x, m));
    }));
    new Set(clusterOf.values()).forEach(cl => {
      const lo = Math.max(...cl.map(n0 => Math.min(n0.A.x, n0.lo))) + 8, hi = Math.min(...cl.map(n0 => Math.max(n0.A.x, n0.lo))) - 8;
      const sorted = cl.slice().sort((a, b) => a.A.y - b.A.y || a.A.x - b.A.x);
      if (sorted[0].A.x > sorted[0].lo) sorted.reverse();
      sorted.forEach((n0, k) => (n0.x = hi > lo ? lo + ((hi - lo) * (k + 1)) / (cl.length + 1) : n0.x + (k - (cl.length - 1) / 2) * 8));
    });
    const path = Array.isArray(s.path) ? s.path.map(String) : [];
    const onPath = (a, b) => { for (let i = 0; i + 1 < path.length; i++) if (path[i] === a && path[i + 1] === b) return true; return false; };
    const pathC = kc(s.pathColor || 'bad');
    const routes = [];
    wires.forEach(w => w.Bs.forEach((B, bi) => {
      const net = nets[w.A.key];
      const o = { x: w.o.x != null ? w.o.x * cw : net ? (net.fixed != null ? net.fixed : net.x) : null, y: w.o.y != null ? w.o.y * rh : null, via: w.o.via ? w.o.via.map(v => [v[0] * cw, v[1] * rh]) : null, yDefault: Math.max(bottom(w.A.part), bottom(B.part)) + 14 };
      const pts = ckRoute(w.A, B, o);
      const color = w.o.color != null ? kc(w.o.color) : onPath(w.A.part, B.part) ? pathC : null;
      const la = Array.isArray(w.o.labelAt) && w.o.labelAt.length === 2 ? { x: num(w.o.labelAt[0], 0) * cw, y: num(w.o.labelAt[1], 0) * rh, an: 'middle' } : null;
      routes.push({ net: w.A.key, from: w.A.key, to: B.key, pts, color, dash: !!w.o.dash, label: bi === 0 && w.o.label != null ? String(w.o.label) : null, lab: la });
    }));
    // junction dots: points where wires of one net leave in three or more directions
    const dots = [];
    const byNet = {};
    routes.forEach(r => (byNet[r.net] = (byNet[r.net] || []).concat([r])));
    Object.values(byNet).forEach(rs => {
      const segs = [];
      rs.forEach(r => { for (let i = 0; i + 1 < r.pts.length; i++) segs.push([r.pts[i], r.pts[i + 1], r.color]); });
      const cand = [];
      segs.forEach(([a, b]) => cand.push(a, b));
      const done = new Set();
      cand.forEach(p => {
        const key = f(p[0]) + ',' + f(p[1]);
        if (done.has(key)) return; done.add(key);
        const dirs = new Set(); let col = null;
        segs.forEach(([a, b, c]) => {
          const on = Math.abs(a[0] - b[0]) < 0.01 ? Math.abs(p[0] - a[0]) < 0.01 && p[1] >= Math.min(a[1], b[1]) - 0.01 && p[1] <= Math.max(a[1], b[1]) + 0.01 : Math.abs(p[1] - a[1]) < 0.01 && p[0] >= Math.min(a[0], b[0]) - 0.01 && p[0] <= Math.max(a[0], b[0]) + 0.01;
          if (!on) return;
          [a, b].forEach(q => { const dx = q[0] - p[0], dy = q[1] - p[1]; if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) { dirs.add(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'r' : 'l') : dy > 0 ? 'b' : 't'); if (c) col = c; } });
        });
        if (dirs.size >= 3) dots.push({ x: p[0], y: p[1], color: col });
      });
    });
    const hlParts = new Set(path);
    let bb = [Infinity, Infinity, -Infinity, -Infinity];
    const grow = (x1, y1, x2, y2) => { bb = [Math.min(bb[0], x1), Math.min(bb[1], y1), Math.max(bb[2], x2), Math.max(bb[3], y2)]; };
    order.forEach(P => grow(...P.bb));
    routes.forEach(r => r.pts.forEach(p => grow(p[0], p[1], p[0], p[1])));
    // wire labels: labelAt, else the first spot along the branch (longest run first) that clears every wire, part and label
    const allSegs = routes.flatMap(r => r.pts.slice(1).map((p, i) => [r.pts[i], p]));
    const placed = order.map(P => P.bb);
    const hits = b => allSegs.some(([a, c]) => Math.max(a[0], c[0]) >= b[0] && Math.min(a[0], c[0]) <= b[2] && Math.max(a[1], c[1]) >= b[1] && Math.min(a[1], c[1]) <= b[3]) || placed.some(q => q[0] < b[2] && q[2] > b[0] && q[1] < b[3] && q[3] > b[1]);
    routes.forEach(r => {
      if (!r.label) return;
      const w = tw(plain(r.label), 10.5) + 4, box = c => (c.an === 'middle' ? [c.x - w / 2, c.y - 7, c.x + w / 2, c.y + 7] : c.an === 'start' ? [c.x - 1, c.y - 7, c.x + w, c.y + 7] : [c.x - w, c.y - 7, c.x + 1, c.y + 7]);
      let best = r.lab;
      if (!best) {
        const cands = [];
        r.pts.slice(1).map((p, i) => [r.pts[i], p]).sort((u, v) => Math.hypot(v[1][0] - v[0][0], v[1][1] - v[0][1]) - Math.hypot(u[1][0] - u[0][0], u[1][1] - u[0][1])).forEach(([a, c]) => [0.5, 0.3, 0.7, 0.15, 0.85].forEach(t => {
          const x = a[0] + (c[0] - a[0]) * t, y = a[1] + (c[1] - a[1]) * t;
          if (Math.abs(a[1] - c[1]) < 0.01) cands.push({ x, y: y - 8, an: 'middle' }, { x, y: y + 9, an: 'middle' });
          else cands.push({ x: x + 5, y, an: 'start' }, { x: x - 5, y, an: 'end' });
        }));
        best = cands.find(c => !hits(box(c))) || cands[0];
      }
      r.lab = best;
      const b = box(best);
      placed.push(b);
      grow(b[0], b[1], b[2], b[3]);
    });
    return { cw, rh, parts, order, routes, dots, bb, hlParts, pathC };
  }
  function circuit(s) {
    const M = circuitModel(s), pad = 8;
    const ox = pad - M.bb[0], oy = top(s) + 4 - M.bb[1];
    const W = Math.max(M.bb[2] - M.bb[0] + 2 * pad, s.title ? tw(s.title, 13) + 16 : 0), H = M.bb[3] - M.bb[1] + top(s) + 4 + pad;
    const pl = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
    let o = `<g transform="translate(${f(ox + (W - (M.bb[2] - M.bb[0] + 2 * pad)) / 2)} ${f(oy)})">`;
    M.routes.filter(r => !r.color).forEach(r => (o += `<path d="${pl(r.pts)}" class="ck-w${r.dash ? ' ck-dash' : ''}"/>`));
    M.routes.filter(r => r.color).forEach(r => (o += `<g class="${r.color} ck-c"><path d="${pl(r.pts)}" class="ck-w${r.dash ? ' ck-dash' : ''}"/></g>`));
    M.dots.forEach(d => (o += d.color ? `<g class="${d.color} ck-c"><circle cx="${f(d.x)}" cy="${f(d.y)}" r="3" class="ck-d"/></g>` : `<circle cx="${f(d.x)}" cy="${f(d.y)}" r="3" class="ck-d"/>`));
    M.order.forEach(P => {
      const c = P.color || (M.hlParts.has(P.id) && P.kind !== 'in' && P.kind !== 'out' ? M.pathC : null);
      o += `<g class="${c ? c + ' ck-c' : 'ck-n'}" data-part="${esc(P.id)}">${P.body}${P.text}</g>`;
    });
    M.routes.forEach(r => { if (r.label && r.lab) o += `<g${r.color ? ` class="${r.color} ck-c"` : ''}>${OT(r.lab.x, r.lab.y, r.label, { anchor: r.lab.an, size: 10.5, weight: 650, cls: 'dt del ck-wl' })}</g>`; });
    return wrap(s, W, H, o + '</g>', minW(W));
  }

  /* ============================================================== wave */
  // a lane as segments {t0, t1, v} in time units: v is "0" | "1" | "x" | "z", or {d: text, c} for a bus value
  function waveSegs(l, i, Tn) {
    const who = `lane ${l.name != null ? l.name : i + 1}`, segs = [];
    const push = (t0, t1, v) => { const q = segs[segs.length - 1]; if (q && q.t1 === t0 && typeof v === 'string' && q.v === v) q.t1 = t1; else segs.push({ t0, t1, v }); };
    if (l.clk != null && l.clk !== false) {
      const per = l.clk === true ? 2 : num(l.clk, NaN);
      if (!(per > 0)) fail('wave', `${who}: clk is the clock period in time units, e.g. 2`);
      const half = per / 2, ph = num(l.phase, 0) + (l.inv ? half : 0);
      const lev = t => ((((t - ph) % per) + per) % per < half - 1e-9 ? '1' : '0');
      const cuts = [0];
      for (let k = Math.ceil((0 - ph) / half); ph + k * half < Tn - 1e-9; k++) if (ph + k * half > 1e-9) cuts.push(ph + k * half);
      cuts.push(Tn);
      for (let k = 0; k + 1 < cuts.length; k++) push(cuts[k], cuts[k + 1], lev((cuts[k] + cuts[k + 1]) / 2));
      return segs;
    }
    const str = typeof l.bits === 'string' ? l.bits : typeof l.bus === 'string' ? l.bus : null;
    if (str == null) fail('wave', `${who} needs clk (period), bits ("01.x") or bus ("x=.=") `);
    const bus = typeof l.bus === 'string', data = Array.isArray(l.data) ? l.data : [];
    let di = 0, prev = null;
    [...str.replace(/\s+/g, '')].slice(0, Math.ceil(Tn)).forEach((ch, k) => {
      const t0 = k, t1 = Math.min(Tn, k + 1);
      if (ch === '.') { if (!prev) fail('wave', `${who}: "." repeats the previous value, so it cannot come first`); const q = segs[segs.length - 1]; q.t1 = t1; return; }
      let v;
      if (/^[01]$/.test(ch) && !bus) v = ch;
      else if (/^[xX]$/.test(ch)) v = 'x';
      else if (/^[zZ]$/.test(ch)) v = 'z';
      else if (bus && /^[=2-9]$/.test(ch)) { const dv = data[di++]; v = { d: dv == null ? '' : String(dv), c: ch === '=' ? null : kc('abcdefgh'[+ch - 2]) }; }
      else fail('wave', `${who}: unknown character "${ch}" (bits use 0 1 x z . ; bus uses = 2-9 x z .)`);
      if (typeof v === 'string' && prev && prev.v === v && typeof v === 'string') { prev.t1 = t1; return; }
      segs.push((prev = { t0, t1, v }));
    });
    if (!segs.length) fail('wave', `${who} is empty`);
    const last = segs[segs.length - 1]; if (last.t1 < Tn) last.t1 = Tn;          // short lanes hold their last value to the end
    return segs;
  }
  function waveModel(s) {
    const L0 = s.lanes;
    if (!Array.isArray(L0) || !L0.length) fail('wave', 'needs "lanes": [{name, clk | bits | bus}]');
    const lens = L0.map(l => (l && typeof l.bits === 'string' ? l.bits.replace(/\s+/g, '').length : l && typeof l.bus === 'string' ? l.bus.replace(/\s+/g, '').length : 0));
    L0.forEach((l, i) => { if (l && l.clk != null && l.clk !== false && l.clk !== true && !(num(l.clk, NaN) > 0)) fail('wave', `lane ${l.name != null ? l.name : i + 1}: clk is the clock period in time units, e.g. 2`); });
    const clk0 = L0.find(l => l && l.clk != null && l.clk !== false);
    const Tn = num(s.t, Math.max(...lens) || (clk0 ? 4 * (clk0.clk === true ? 2 : num(clk0.clk, 2)) : 0));
    if (!(Tn > 0) || Tn > 400) fail('wave', 'cannot tell the length: give bits/bus strings or "t" (time units, at most 400)');
    const names = L0.map(l => (l && l.name != null ? String(l.name) : ''));
    const nw = Math.max(0, ...names.map(n => tw(plain(n), 12.5)));
    const x0 = 8 + (nw ? nw + 14 : 0);
    const u = num(s.unit, s.w ? (num(s.w, 600) - x0 - 12) / Tn : Math.min(40, Math.max(14, 520 / Tn)));
    const X = t => x0 + t * u;
    const hh = 22, gap = 14, arrows = Array.isArray(s.arrows) ? s.arrows : [], marks = Array.isArray(s.marks) ? s.marks : [];
    const laneIx = (ref, who) => { const i = typeof ref === 'number' ? ref : names.indexOf(String(ref)); if (!(i >= 0 && i < L0.length) || !L0[i] || L0[i].gap) fail('wave', `${who}: no lane "${ref}"`); return i; };
    const pts = arrows.map((a, k) => {
      if (!a || !Array.isArray(a.from) || !Array.isArray(a.to)) fail('wave', `arrow ${k + 1} needs from: [lane, time] and to: [lane, time]`);
      const who = `arrow ${a.label || k + 1}`, A = [laneIx(a.from[0], who), num(a.from[1], NaN)], B = [laneIx(a.to[0], who), num(a.to[1], NaN)];
      if (![A[1], B[1]].every(t => t >= 0 && t <= Tn)) fail('wave', `${who}: times must be between 0 and ${Tn}`);
      return { A, B, a };
    });
    let y = top(s) + (marks.some(m => m && m.label != null) ? 18 : 4);
    const lanes = L0.map((l, i) => {
      if (!l || l.gap) { const sp = { gap: true, top: y }; y += 10; return sp; }
      const segs = waveSegs(l, i, Tn), ln = { name: names[i], top: y, hi: y, lo: y + hh, mid: y + hh / 2, segs, kind: l.clk != null && l.clk !== false ? 'clk' : l.bus != null ? 'bus' : 'bits', l, x1: X(0), x2: X(Tn) };
      y += hh + (pts.some(p => p.A[0] === i && p.B[0] === i) ? 26 : 0) + gap;
      return ln;
    });
    const real = lanes.filter(l => !l.gap);
    return { T: Tn, u, x0, X, hh, lanes, pts, marks, yTop: real[0].top, yBot: real[real.length - 1].lo, yEnd: y - gap };
  }
  function wave(s) {
    const M = waveModel(s), { X } = M, Tn = M.T, id = 'wvh' + hid(s);
    const ah = (x, y, ux, uy) => `<path d="M${f(x)} ${f(y)} L${f(x - ux * 7 - uy * 3.5)} ${f(y - uy * 7 + ux * 3.5)} L${f(x - ux * 7 + uy * 3.5)} ${f(y - uy * 7 - ux * 3.5)}Z" class="wv-ah"/>`;
    let o = `<defs><pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" class="wv-hp"/></pattern></defs>`;
    const gstep = s.grid === true ? 1 : s.grid && typeof s.grid === 'object' ? num(s.grid.step, 1) : num(s.grid, 0), gfrom = s.grid && typeof s.grid === 'object' ? num(s.grid.from, 0) : 0;
    if (gstep > 0) for (let t = gfrom; t <= Tn + 1e-9; t += gstep) o += `<line x1="${f(X(t))}" x2="${f(X(t))}" y1="${f(M.yTop - 4)}" y2="${f(M.yBot + 4)}" class="dg-grid"/>`;
    M.lanes.forEach(ln => {
      if (ln.gap) return;
      const l = ln.l, c = l.color != null ? kc(l.color) : null;
      let g = '';
      if (ln.name) g += OT(M.x0 - 10, ln.mid, ln.name, { anchor: 'end', size: 12.5, weight: 650, cls: 'dt wv-n' });
      if (ln.kind === 'bus') {
        ln.segs.forEach(sg => {
          const xa = X(sg.t0), xb = X(sg.t1), e = Math.min(4, (xb - xa) / 4);
          if (sg.v === 'z') { g += `<path d="M${f(xa)} ${f(ln.mid)} H${f(xb)}" class="wv-s"/>`; return; }
          const hex = `M${f(xa)} ${f(ln.mid)} L${f(xa + e)} ${f(ln.hi)} H${f(xb - e)} L${f(xb)} ${f(ln.mid)} L${f(xb - e)} ${f(ln.lo)} H${f(xa + e)}Z`;
          if (sg.v === 'x') { g += `<path d="${hex}" fill="url(#${id})" class="wv-xb"/>`; return; }
          const fs = tw(sg.v.d, 11) <= xb - xa - 2 * e - 3 ? 11 : tw(sg.v.d, 9) <= xb - xa - 2 * e - 2 ? 9 : 0;
          g += `<g class="${sg.v.c || c || 'k8'}"><path d="${hex}" class="wv-bus${sg.v.c ? '' : ' plain'}"/>${fs ? T((xa + xb) / 2, ln.mid + 0.5, sg.v.d, { size: fs, weight: 650, mono: true }) : ''}<title>${esc(mathPlain(sg.v.d))}</title></g>`;
        });
      } else {
        let d = '', last = null;
        ln.segs.forEach(sg => {
          const xa = X(sg.t0), xb = X(sg.t1);
          if (sg.v === 'x') { g += `<rect x="${f(xa)}" y="${f(ln.hi)}" width="${f(xb - xa)}" height="${M.hh}" fill="url(#${id})" class="wv-xb"/>`; last = null; return; }
          const yy = sg.v === '1' ? ln.hi : sg.v === '0' ? ln.lo : ln.mid;
          d += last == null ? `M${f(xa)} ${f(yy)}` : ` L${f(xa)} ${f(yy)}`;
          d += ` L${f(xb)} ${f(yy)}`; last = yy;
        });
        if (d) g += `<path d="${d}" class="wv-s"/>`;
        if (ln.kind === 'clk' && l.edges) {
          const want = l.edges === 'both' ? ['1', '0'] : l.edges === 'fall' ? ['0'] : ['1'];
          ln.segs.forEach((sg, k) => { if (k && want.includes(sg.v) && sg.t0 > 0) g += ah(X(sg.t0), ln.mid + (sg.v === '1' ? -4 : 4), 0, sg.v === '1' ? -1 : 1); });
        }
      }
      o += `<g class="${c ? c + ' wv-c' : 'wv-k'}">${g}</g>`;
    });
    M.marks.forEach((m, k) => {
      const t = num(m && m.t, NaN);
      if (!(t >= 0 && t <= Tn)) fail('wave', `mark ${k + 1}: t must be a time between 0 and ${Tn}`);
      o += `<g class="${m.color != null ? kc(m.color) + ' wv-c' : 'wv-k'}"><line x1="${f(X(t))}" x2="${f(X(t))}" y1="${f(M.yTop - 6)}" y2="${f(M.yBot + 5)}" class="wv-m"/>${m.label != null ? T(X(t), M.yTop - 13, m.label, { size: 10.5, weight: 650, cls: 'dt wv-ml' }) : ''}</g>`;
    });
    M.pts.forEach(({ A, B, a }) => {
      const la = M.lanes[A[0]], lb = M.lanes[B[0]], x1 = X(A[1]), x2 = X(B[1]);
      let g = '';
      if (A[0] === B[0]) {
        const yy = la.lo + 10, dir = x2 >= x1 ? 1 : -1;
        g += `<line x1="${f(x1)}" x2="${f(x2)}" y1="${f(yy)}" y2="${f(yy)}" class="wv-a"/>${ah(x2, yy, dir, 0)}${ah(x1, yy, -dir, 0)}`;
        g += `<line x1="${f(x1)}" x2="${f(x1)}" y1="${f(la.lo + 2)}" y2="${f(yy + 4)}" class="wv-a thin"/><line x1="${f(x2)}" x2="${f(x2)}" y1="${f(la.lo + 2)}" y2="${f(yy + 4)}" class="wv-a thin"/>`;
        if (a.label != null) g += T((x1 + x2) / 2, yy + 11, a.label, { size: 10.5, weight: 650, cls: 'dt del wv-al' });
      } else {
        const y1 = la.mid, y2 = lb.mid, len = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / len, uy = (y2 - y1) / len;
        g += `<circle cx="${f(x1)}" cy="${f(y1)}" r="2.4" class="wv-ad"/><line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2 - ux * 6)}" y2="${f(y2 - uy * 6)}" class="wv-a"/>${ah(x2, y2, ux, uy)}`;
        if (a.label != null) g += T((x1 + x2) / 2 + 6, (y1 + y2) / 2, a.label, { anchor: 'start', size: 10.5, weight: 650, cls: 'dt del wv-al' });
      }
      o += `<g class="${a.color != null ? kc(a.color) + ' wv-c' : 'wv-k'}">${g}</g>`;
    });
    let H = M.yEnd + 8;
    if (s.axis) {
      const ax = s.axis === true ? {} : s.axis, step = num(ax.step, 1), sc = num(ax.scale, 1), from = num(ax.from, 0), yA = M.yEnd + 8;
      if (!(step > 0)) fail('wave', 'axis.step must be positive');
      o += `<line x1="${f(X(0))}" x2="${f(X(Tn))}" y1="${f(yA)}" y2="${f(yA)}" class="dg-axis"/>`;
      for (let t = 0; t <= Tn + 1e-9; t += step) o += `<line x1="${f(X(t))}" x2="${f(X(t))}" y1="${f(yA)}" y2="${f(yA + 4)}" class="dg-axis"/>${T(X(t), yA + 13, +(from + t * sc).toFixed(3), { size: 10, cls: 'dt dtm' })}`;
      if (ax.unit) o += T(X(Tn) + 8, yA + 13, ax.unit, { anchor: 'start', size: 10, cls: 'dt dtm' });
      H = yA + 24;
    }
    const W = Math.max(X(Tn) + 12 + (s.axis && s.axis.unit ? tw(s.axis.unit, 10) + 8 : 0), s.title ? tw(s.title, 13) + 16 : 0, ...M.pts.filter(p => p.A[0] !== p.B[0] && p.a.label != null).map(p => (X(p.A[1]) + X(p.B[1])) / 2 + 10 + tw(p.a.label, 10.5)));
    return wrap(s, W, H, o, minW(W));
  }

  /* ============================================================== shapes */
  // affine maps [a, b, c, d, e, f]: (x, y) -> (a·x + c·y + e, b·x + d·y + f); user units, y grows upwards
  const AF_I = [1, 0, 0, 1, 0, 0];
  const afMul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];   // B first, then A
  const afAp = (M, p) => [M[0] * p[0] + M[2] * p[1] + M[4], M[1] * p[0] + M[3] * p[1] + M[5]];
  const isPt = p => Array.isArray(p) && p.length === 2 && p.every(v => typeof v === 'number' && isFinite(v));
  const needPt = (p, who) => (isPt(p) ? p : fail('shapes', `${who} needs a point [x, y], got ${JSON.stringify(p)}`));
  const nums = (arr, who) => arr.map(v => (typeof v === 'number' && isFinite(v) ? v : fail('shapes', `${who}: ${JSON.stringify(v)} is not a number`)));
  // transform list, applied in order: ["translate",dx,dy] ["rotate",deg,[cx,cy]?] ["scale",s] ["scale",sx,sy] ["scale",s,[cx,cy]] ["mirror","v",x] ["mirror","h",y] ["mirror",[x1,y1],[x2,y2]]
  function shTf(list) {
    if (list == null) return AF_I;
    if (!Array.isArray(list)) fail('shapes', 'tf must be a list such as [["rotate", 90], ["translate", 6, 0]]');
    let M = AF_I;
    const about = (T0, c) => (c ? afMul([1, 0, 0, 1, c[0], c[1]], afMul(T0, [1, 0, 0, 1, -c[0], -c[1]])) : T0);
    list.forEach(t => {
      if (!Array.isArray(t) || typeof t[0] !== 'string') fail('shapes', `tf step ${JSON.stringify(t)} must look like ["rotate", 90]`);
      const op = t[0], a = t.slice(1);
      let S;
      if (op === 'translate') { const [dx, dy] = nums([a[0], a[1] == null ? 0 : a[1]], 'translate'); S = [1, 0, 0, 1, dx, dy]; }
      else if (op === 'rotate') { const [deg] = nums([a[0]], 'rotate'), r = (deg * Math.PI) / 180, c = Math.cos(r), s0 = Math.sin(r); S = about([c, s0, -s0, c, 0, 0], a[1] != null ? needPt(a[1], 'rotate about') : null); }
      else if (op === 'scale') { const sx = nums([a[0]], 'scale')[0], sy = typeof a[1] === 'number' ? a[1] : sx; S = about([sx, 0, 0, sy, 0, 0], Array.isArray(a[1]) ? needPt(a[1], 'scale about') : null); }
      else if (op === 'mirror') {
        let P, d;
        if (a[0] === 'v') { P = [nums([a[1] == null ? 0 : a[1]], 'mirror')[0], 0]; d = [0, 1]; }
        else if (a[0] === 'h') { P = [0, nums([a[1] == null ? 0 : a[1]], 'mirror')[0]]; d = [1, 0]; }
        else { const p1 = needPt(a[0], 'mirror line'), p2 = needPt(a[1], 'mirror line'); P = p1; d = [p2[0] - p1[0], p2[1] - p1[1]]; if (!d[0] && !d[1]) fail('shapes', 'mirror needs two different points'); }
        const th = Math.atan2(d[1], d[0]), c2 = Math.cos(2 * th), s2 = Math.sin(2 * th);
        S = about([c2, s2, s2, -c2, 0, 0], P);
      } else fail('shapes', `unknown transform "${op}" (translate, rotate, scale, mirror)`);
      M = afMul(S, M);
    });
    return M;
  }
  const KAPPA = 0.5522847498;
  // ellipse arc from angle a0 to a1 (radians, counter-clockwise) as cubic segments
  function arcSegs(c, rx, ry, a0, a1) {
    const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / (Math.PI / 2) - 1e-9)), da = (a1 - a0) / n, k = (4 / 3) * Math.tan(da / 4), out = [];
    for (let i = 0; i < n; i++) {
      const t0 = a0 + i * da, t1 = t0 + da;
      const p0 = [c[0] + rx * Math.cos(t0), c[1] + ry * Math.sin(t0)], p3 = [c[0] + rx * Math.cos(t1), c[1] + ry * Math.sin(t1)];
      out.push(['C', [p0[0] - k * rx * Math.sin(t0), p0[1] + k * ry * Math.cos(t0)], [p3[0] + k * rx * Math.sin(t1), p3[1] - k * ry * Math.cos(t1)], p3]);
    }
    return out;
  }
  const PIPS = { 1: [[0.5, 0.5]], 2: [[0.27, 0.73], [0.73, 0.27]], 3: [[0.27, 0.73], [0.5, 0.5], [0.73, 0.27]], 4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]], 5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]], 6: [[0.27, 0.25], [0.73, 0.25], [0.27, 0.5], [0.73, 0.5], [0.27, 0.75], [0.73, 0.75]] };
  // flatten items into drawing ops with points already transformed into the figure's user space
  function shCollect(items, M, out, defs, depth) {
    if (depth > 8) fail('shapes', 'groups are nested too deeply (or a "use" refers to itself)');
    if (!Array.isArray(items)) fail('shapes', 'items must be a list');
    items.forEach((it, idx) => {
      if (!it || typeof it !== 'object') fail('shapes', `item ${idx + 1} is not an object`);
      const k = it.kind, who = `${k || 'item'} ${it.id || idx + 1}`;
      const st = { fill: it.fill != null && it.fill !== 'none' ? kc(it.fill) : null, solid: !!it.solid, hatch: !!it.hatch, stroke: it.color === 'none' ? null : it.color != null ? kc(it.color) : 'k8', dash: !!it.dash, w: num(it.width, 1.6), arrow: it.arrow };
      if (st.solid && !st.fill) st.fill = st.stroke || 'k8';
      const P = p => afAp(M, p);
      const path = (segs, closed, sty) => out.push({ t: 'path', segs: segs.map(sg => [sg[0], ...sg.slice(1).map(P)]), closed, st: sty || st, vl: null });
      const poly = (pts, closed, sty) => path(pts.map((p, i) => [i ? 'L' : 'M', p]).concat(closed ? [['Z']] : []), closed, sty);
      if (k === 'group') { if (it.id) defs[it.id] = it; if (!it.def) shCollect(it.items || [], afMul(M, shTf(it.tf)), out, defs, depth + 1); else shCollect(it.items || [], afMul(M, shTf(it.tf)), [], defs, depth + 1); }
      else if (k === 'use') { const g = defs[it.ref]; if (!g) fail('shapes', `use: no group with id "${it.ref}" before this item`); shCollect(g.items || [], afMul(M, afMul(shTf(it.tf), shTf(g.tf))), out, defs, depth + 1); }
      else if (k === 'poly' || k === 'line') {
        if (!Array.isArray(it.pts) || it.pts.length < 2) fail('shapes', `${who} needs pts: [[x, y], …] (at least 2)`);
        const pts = it.pts.map((p, i) => needPt(p, `${who} point ${i + 1}`));
        poly(pts, k === 'poly');
        if (k === 'poly' && Array.isArray(it.v)) out[out.length - 1].vl = { pts: pts.map(P), labels: it.v.map(x => (x == null ? '' : String(x))) };
      } else if (k === 'rect') {
        const [x, y] = needPt(it.at, who), w = num(it.w, NaN), h = num(it.h, NaN);
        if (!(w > 0 && h > 0)) fail('shapes', `${who} needs w and h (positive numbers)`);
        const r = Math.min(num(it.r, 0), w / 2, h / 2);
        if (r > 0) path([['M', [x + r, y]], ['L', [x + w - r, y]], ...arcSegs([x + w - r, y + r], r, r, -Math.PI / 2, 0), ['L', [x + w, y + h - r]], ...arcSegs([x + w - r, y + h - r], r, r, 0, Math.PI / 2), ['L', [x + r, y + h]], ...arcSegs([x + r, y + h - r], r, r, Math.PI / 2, Math.PI), ['L', [x, y + r]], ...arcSegs([x + r, y + r], r, r, Math.PI, 1.5 * Math.PI), ['Z']], true);
        else poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true);
        if (Array.isArray(it.v)) out[out.length - 1].vl = { pts: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(P), labels: it.v.map(String) };
      } else if (k === 'circle' || k === 'ellipse') {
        const c = needPt(it.c, who), rx = num(k === 'circle' ? it.r : it.rx, NaN), ry = num(k === 'circle' ? it.r : it.ry, NaN);
        if (!(rx > 0 && ry > 0)) fail('shapes', `${who} needs ${k === 'circle' ? 'r' : 'rx and ry'} (positive)`);
        path([['M', [c[0] + rx, c[1]]], ...arcSegs(c, rx, ry, 0, 2 * Math.PI), ['Z']], true);
      } else if (k === 'arc') {
        const c = needPt(it.c, who), r = num(it.r, NaN), a = Array.isArray(it.a) ? nums(it.a, who + ' a') : fail('shapes', `${who} needs a: [from°, to°] (counter-clockwise from the +x axis)`);
        if (!(r > 0)) fail('shapes', `${who} needs r (positive)`);
        const a0 = (a[0] * Math.PI) / 180, a1 = (a[1] * Math.PI) / 180, p0 = [c[0] + r * Math.cos(a0), c[1] + r * Math.sin(a0)];
        if (it.sector) path([['M', c], ['L', p0], ...arcSegs(c, r, r, a0, a1), ['Z']], true);
        else path([['M', p0], ...arcSegs(c, r, r, a0, a1)], false);
      } else if (k === 'text') {
        out.push({ t: 'text', at: P(needPt(it.at, who)), text: it.t != null ? String(it.t) : '', size: num(it.size, 13), anchor: it.anchor || 'middle', weight: it.bold === false ? 500 : num(it.weight, 650), color: it.color != null ? kc(it.color) : null, flip: it.flip ? M : null });
      } else if (k === 'angle') {
        const V = needPt(it.at, who), A = needPt(it.from, who + ' from'), B = needPt(it.to, who + ' to');
        out.push({ t: 'angle', V: P(V), A: P(A), B: P(B), r: num(it.r, 18), label: it.label, right: !!it.right, reflex: !!it.reflex, st });
      } else if (k === 'dim') {
        const A = needPt(it.from, who + ' from'), B = needPt(it.to, who + ' to'), L = Math.hypot(B[0] - A[0], B[1] - A[1]);
        if (!L) fail('shapes', `${who}: from and to are the same point`);
        const off = num(it.off, 0.45), n = [-(B[1] - A[1]) / L, (B[0] - A[0]) / L];
        const qa = [A[0] + n[0] * off, A[1] + n[1] * off], qb = [B[0] + n[0] * off, B[1] + n[1] * off], ov = [n[0] * Math.sign(off || 1) * 0.15, n[1] * Math.sign(off || 1) * 0.15];
        const sty = { stroke: st.stroke === 'k8' ? 'kmute' : st.stroke, w: 1.1 };
        poly([[A[0] + n[0] * off * 0.12, A[1] + n[1] * off * 0.12], [qa[0] + ov[0], qa[1] + ov[1]]], false, sty);
        poly([[B[0] + n[0] * off * 0.12, B[1] + n[1] * off * 0.12], [qb[0] + ov[0], qb[1] + ov[1]]], false, sty);
        poly([qa, qb], false, { stroke: st.stroke, w: 1.3, arrow: 'both' });
        if (it.label != null) out.push({ t: 'dimlab', a: P(qa), b: P(qb), side: P([qa[0] + n[0] * Math.sign(off || 1), qa[1] + n[1] * Math.sign(off || 1)]), text: String(it.label), color: st.stroke === 'k8' ? null : st.stroke });
      } else if (k === 'grid') {
        const xr = Array.isArray(it.x) ? nums(it.x, who + ' x') : fail('shapes', `${who} needs x: [from, to] and y: [from, to]`), yr = Array.isArray(it.y) ? nums(it.y, who + ' y') : fail('shapes', `${who} needs y: [from, to]`), step = num(it.step, 1);
        if (!(step > 0) || (xr[1] - xr[0]) / step > 200 || (yr[1] - yr[0]) / step > 200) fail('shapes', `${who}: step must be positive and give at most 200 lines`);
        const xs = [], ys = [];
        for (let x = xr[0]; x <= xr[1] + 1e-9; x += step) xs.push(x);
        for (let y = yr[0]; y <= yr[1] + 1e-9; y += step) ys.push(y);
        if (it.dots) xs.forEach(x => ys.forEach(y => out.push({ t: 'dot', at: P([x, y]), r: 1.7, cls: 'sh-gd' })));
        else { const g = { stroke: 'kgrid', w: 1 }; xs.forEach(x => poly([[x, yr[0]], [x, yr[1]]], false, g)); ys.forEach(y => poly([[xr[0], y], [xr[1], y]], false, g)); }
      } else if (k === 'cubes' || k === 'cube' || (k === 'die' && it.iso)) {
        const [ox, oy] = it.at != null ? needPt(it.at, who) : [0, 0], sz = num(it.size, 1), cs = Math.cos(Math.PI / 6);
        const pr = (x, y, z) => [ox + (x - y) * cs * sz, oy + (z - (x + y) * 0.5) * sz];
        let cells = [];
        if (k === 'cubes') {
          if (Array.isArray(it.h)) it.h.forEach((row, j) => (Array.isArray(row) ? row : fail('shapes', `${who}: h is a list of rows of stack heights`)).forEach((hgt, i) => { for (let z = 0; z < num(hgt, 0); z++) cells.push([i, j, z, null]); }));
          else if (Array.isArray(it.cells)) cells = it.cells.map((q, ci) => (Array.isArray(q) && q.length >= 3 && q.slice(0, 3).every(v => Number.isInteger(v)) ? [q[0], q[1], q[2], q[3] != null ? kc(q[3]) : null] : fail('shapes', `${who}: cell ${ci + 1} must be [x, y, z] (whole numbers), optionally with a colour`)));
          else fail('shapes', `${who} needs h (rows of stack heights, back row first) or cells ([x, y, z] unit cubes)`);
          if (cells.length > 400) fail('shapes', `${who}: at most 400 cubes`);
        } else cells = [[0, 0, 0, null]];
        const has = new Set(cells.map(c0 => c0.slice(0, 3).join()));
        const isDie = k === 'die', col = st.fill || (it.color != null ? kc(it.color) : isDie ? 'k8' : 'k0');
        cells.sort((p, q) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]) || p[2] - q[2] || p[0] - q[0]);
        const n = k === 'cube' ? Math.max(1, Math.min(10, Math.round(num(it.n, 1)))) : 1;
        const face = (pts, shade, c0) => out.push({ t: 'path', segs: pts.map((p, i) => [i ? 'L' : 'M', P(p)]).concat([['Z']]), closed: true, st: { fill: c0 || col, shade: isDie && !st.fill && it.color == null ? 'd' + shade : shade, stroke: 'k8', w: isDie ? 1.5 : 1.2 } });
        const faces = it.iso && k === 'die' ? it.iso : null, f0 = out.length;
        cells.forEach(([x, y, z, c0]) => {
          if (!has.has([x, y, z + 1].join())) face([pr(x, y, z + 1), pr(x + 1, y, z + 1), pr(x + 1, y + 1, z + 1), pr(x, y + 1, z + 1)], 't', c0);
          if (!has.has([x, y + 1, z].join())) face([pr(x, y + 1, z), pr(x + 1, y + 1, z), pr(x + 1, y + 1, z + 1), pr(x, y + 1, z + 1)], 'l', c0);
          if (!has.has([x + 1, y, z].join())) face([pr(x + 1, y, z), pr(x + 1, y + 1, z), pr(x + 1, y + 1, z + 1), pr(x + 1, y, z + 1)], 'r', c0);
        });
        const facemaps = [[pr(0, 0, 1), pr(1, 0, 1), pr(0, 1, 1)], [pr(0, 1, 0), pr(1, 1, 0), pr(0, 1, 1)], [pr(1, 1, 0), pr(1, 0, 0), pr(1, 1, 1)]];   // origin, u-edge, v-edge of top, left, right faces
        const onFace = (fm, u0, v0) => [fm[0][0] + u0 * (fm[1][0] - fm[0][0]) + v0 * (fm[2][0] - fm[0][0]), fm[0][1] + u0 * (fm[1][1] - fm[0][1]) + v0 * (fm[2][1] - fm[0][1])];
        if (n > 1) facemaps.forEach(fm => { for (let i = 1; i < n; i++) { poly([onFace(fm, i / n, 0), onFace(fm, i / n, 1)], false, { stroke: 'k8', w: 1 }); poly([onFace(fm, 0, i / n), onFace(fm, 1, i / n)], false, { stroke: 'k8', w: 1 }); } });
        if (faces) {
          if (!Array.isArray(faces) || faces.length !== 3) fail('shapes', `${who}: iso lists the top, left and right faces, e.g. [1, 2, 3]`);
          const faceOps = out.slice(f0).filter(o => o.t === 'path' && o.closed);   // a die is one cell: its top, left and right faces, in that order
          faces.forEach((fv, fi) => {
            const fm = facemaps[fi];
            // a letter on a shaded face (P1-14): the face takes a text-safe tone (content.css .sh-ftx), as solid fills that carry text take sh-tx
            if (typeof fv !== 'number' && fv != null && fv !== '' && faceOps[fi] && faceOps[fi].st.shade) faceOps[fi].st.txt = true;
            if (typeof fv === 'number') {
              if (!PIPS[fv]) fail('shapes', `${who}: a die face shows 1 to 6 pips, got ${fv}`);
              PIPS[fv].forEach(([pu, pv]) => path([['M', onFace(fm, pu + 0.085, pv)], ...arcSegs([0, 0], 0.085, 0.085, 0, 2 * Math.PI).map(sg => [sg[0], ...sg.slice(1).map(q => onFace(fm, pu + q[0], pv + q[1]))]), ['Z']], true, { fill: 'kpip', solid: true, stroke: null }));
            } else if (fv != null && fv !== '') out.push({ t: 'text', at: P(onFace(fm, 0.5, 0.5)), text: String(fv), size: num(it.textSize, 14), anchor: 'middle', weight: 700, color: null, flip: null });
          });
        }
      } else if (k === 'net') {
        const [ox, oy] = it.at != null ? needPt(it.at, who) : [0, 0], sz = num(it.size, 1);
        if (!Array.isArray(it.cells) || !it.cells.length) fail('shapes', `${who} needs cells: [[column, row], …] (row 0 at the top)`);
        const cells = it.cells.map((q, ci) => (isPt(q) ? q : fail('shapes', `${who}: cell ${ci + 1} must be [column, row]`)));
        const sq = (cx, ry) => [[ox + cx * sz, oy - (ry + 1) * sz], [ox + (cx + 1) * sz, oy - (ry + 1) * sz], [ox + (cx + 1) * sz, oy - ry * sz], [ox + cx * sz, oy - ry * sz]];
        if (it.grid) {
          const c0 = Math.min(...cells.map(q => q[0])) - 1, c1 = Math.max(...cells.map(q => q[0])) + 2, r0 = Math.min(...cells.map(q => q[1])) - 1, r1 = Math.max(...cells.map(q => q[1])) + 2, g = { stroke: 'kgrid', w: 1 };
          for (let c = c0; c <= c1; c++) poly([[ox + c * sz, oy - r0 * sz], [ox + c * sz, oy - r1 * sz]], false, g);
          for (let r = r0; r <= r1; r++) poly([[ox + c0 * sz, oy - r * sz], [ox + c1 * sz, oy - r * sz]], false, g);
        }
        const fills = Array.isArray(it.fills) ? it.fills : [];
        cells.forEach((q, ci) => poly(sq(q[0], q[1]), true, { fill: fills[ci] != null ? kc(fills[ci]) : st.fill || 'k8x', stroke: null }));
        const edges = {};
        cells.forEach(q => { const p = sq(q[0], q[1]); for (let e = 0; e < 4; e++) { const a = p[e], b = p[(e + 1) % 4], key = [a, b].map(v => v.map(f).join(',')).sort().join('|'); edges[key] = edges[key] || { a, b, n: 0 }; edges[key].n++; } });
        Object.values(edges).forEach(e => poly([e.a, e.b], false, { stroke: st.stroke || 'k8', w: e.n > 1 ? 1.2 : 1.6, dash: e.n > 1 && !!it.fold }));
        const labels = Array.isArray(it.labels) ? it.labels : [];
        cells.forEach((q, ci) => { if (labels[ci] != null && labels[ci] !== '') out.push({ t: 'text', at: P([ox + (q[0] + 0.5) * sz, oy - (q[1] + 0.5) * sz]), text: String(labels[ci]), size: num(it.textSize, 14), anchor: 'middle', weight: 700, color: null, flip: null }); });
      } else if (k === 'die') {
        const [cx, cy] = it.at != null ? needPt(it.at, who) : [0, 0], sz = num(it.size, 1), nv = it.n;
        if (!PIPS[nv]) fail('shapes', `${who}: n must be 1 to 6 (or give iso: [top, left, right])`);
        const x = cx - sz / 2, y = cy - sz / 2, r = sz * 0.16;
        path([['M', [x + r, y]], ['L', [x + sz - r, y]], ...arcSegs([x + sz - r, y + r], r, r, -Math.PI / 2, 0), ['L', [x + sz, y + sz - r]], ...arcSegs([x + sz - r, y + sz - r], r, r, 0, Math.PI / 2), ['L', [x + r, y + sz]], ...arcSegs([x + r, y + sz - r], r, r, Math.PI / 2, Math.PI), ['L', [x, y + r]], ...arcSegs([x + r, y + r], r, r, Math.PI, 1.5 * Math.PI), ['Z']], true, { fill: st.fill || 'k8x', stroke: st.stroke || 'k8', w: 1.6 });
        PIPS[nv].forEach(([pu, pv]) => path([['M', [x + pu * sz + sz * 0.085, y + (1 - pv) * sz]], ...arcSegs([x + pu * sz, y + (1 - pv) * sz], sz * 0.085, sz * 0.085, 0, 2 * Math.PI), ['Z']], true, { fill: 'kpip', solid: true, stroke: null }));
      } else fail('shapes', `unknown kind "${k}" (poly, rect, circle, ellipse, arc, line, text, angle, dim, grid, group, use, cubes, cube, net, die)`);
    });
    return out;
  }
  // geometry of a shapes figure (exported for tests): ops in user units and the bounding box
  function shapesModel(s) {
    const ops = shCollect(s.items || fail('shapes', 'needs "items": a list of shapes'), AF_I, [], {}, 0);
    let bb = [Infinity, Infinity, -Infinity, -Infinity];
    const grow = p => { bb = [Math.min(bb[0], p[0]), Math.min(bb[1], p[1]), Math.max(bb[2], p[0]), Math.max(bb[3], p[1])]; };
    ops.forEach(o => { if (o.t === 'path') o.segs.forEach(sg => sg.slice(1).forEach(grow)); else if (o.t === 'text' || o.t === 'dot') grow(o.at); else if (o.t === 'angle') grow(o.V); else if (o.t === 'dimlab') { grow(o.a); grow(o.b); } });
    if (!isFinite(bb[0])) fail('shapes', 'nothing to draw');
    return { ops, bb };
  }
  function shapes(s) {
    const { ops, bb: gb } = shapesModel(s), pad = 10, maxW = num(s.w, 560);
    const gw = Math.max(gb[2] - gb[0], 1e-6), gh = Math.max(gb[3] - gb[1], 1e-6);
    const u = Math.min(num(s.u, 40), (maxW - 2 * pad - 40) / gw, num(s.maxH, 520) / gh);
    // text, labels and marks stick out of the geometry: grow the box by their extents (in px around each anchor)
    let bx = [0, 0, gw * u, gh * u];
    const X = p => (p[0] - gb[0]) * u, Y = p => (gb[3] - p[1]) * u;
    const grow = (x1, y1, x2, y2) => { bx = [Math.min(bx[0], x1), Math.min(bx[1], y1), Math.max(bx[2], x2), Math.max(bx[3], y2)]; };
    const tbox = (x, y, text, size, an) => { const w = tw(plain(text), size), x1 = an === 'start' ? x : an === 'end' ? x - w : x - w / 2; grow(x1 - 2, y - size * 0.7, x1 + w + 2, y + size * 0.7); };
    const items = [];
    ops.forEach(o => {
      if (o.t === 'text') { const x = X(o.at), y = Y(o.at); tbox(x, y, o.text, o.size, o.anchor); items.push({ o, x, y }); }
      else if (o.t === 'path' && o.vl) {
        const P = o.vl.pts.map(p => [X(p), Y(p)]), cx = P.reduce((a, p) => a + p[0], 0) / P.length, cy = P.reduce((a, p) => a + p[1], 0) / P.length;
        o.vlab = P.map((p, i) => { const dx = p[0] - cx, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1, x = p[0] + (dx / L) * 12, y = p[1] + (dy / L) * 12; if (o.vl.labels[i]) tbox(x, y, o.vl.labels[i], 13, 'middle'); return [x, y, o.vl.labels[i] || '']; });
      } else if (o.t === 'angle') {
        const V = [X(o.V), Y(o.V)], a1 = Math.atan2(Y(o.A) - V[1], X(o.A) - V[0]), a2 = Math.atan2(Y(o.B) - V[1], X(o.B) - V[0]);
        let d = a2 - a1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
        if (o.reflex) d = d > 0 ? d - 2 * Math.PI : d + 2 * Math.PI;
        o.px = { V, a1, d };
        const mid = a1 + d / 2, lr = o.r + (o.right ? 12 : 11);
        if (o.label != null) { const x = V[0] + Math.cos(mid) * lr, y = V[1] + Math.sin(mid) * lr; o.lab = [x, y]; tbox(x, y, String(o.label), 12.5, 'middle'); }
        grow(V[0] - o.r, V[1] - o.r, V[0] + o.r, V[1] + o.r);
      } else if (o.t === 'dimlab') {
        const ax = X(o.a), ay = Y(o.a), bx2 = X(o.b), by2 = Y(o.b), sx = X(o.side) - ax, sy = Y(o.side) - ay, L = Math.hypot(sx, sy) || 1, nx = sx / L, ny = sy / L;
        const an = Math.abs(nx) > 0.6 ? (nx > 0 ? 'start' : 'end') : 'middle', x = (ax + bx2) / 2 + nx * 7, y = (ay + by2) / 2 + ny * (an === 'middle' ? 10 : 0);
        o.pos = [x, y, an]; tbox(x, y, o.text, 12, an);
      }
    });
    const ox = pad - bx[0], oy = top(s) + 2 - bx[1];
    const W = Math.max(bx[2] - bx[0] + 2 * pad, s.title ? tw(s.title, 13) + 16 : 0), H = bx[3] - bx[1] + top(s) + 2 + pad;
    const cxo = (W - (bx[2] - bx[0] + 2 * pad)) / 2;
    const PX = p => [X(p) + ox + cxo, Y(p) + oy];
    const pid = 'shh' + hid(s), hatch = new Set();
    // text drawn on a solid fill (numbers on coloured cells): every solid fill of the figure takes the text-safe tone `sh-tx` (P1-14)
    const solids = ops.filter(o => o.t === 'path' && o.closed && o.st.fill && o.st.solid && !o.st.shade && o.st.fill !== 'kpip');
    const boxOf = o => o.segs.reduce((b, sg) => sg.slice(1).reduce((c, q) => [Math.min(c[0], q[0]), Math.min(c[1], q[1]), Math.max(c[2], q[0]), Math.max(c[3], q[1])], b), [Infinity, Infinity, -Infinity, -Infinity]);
    const sboxes = solids.map(boxOf);
    const onSolid = sboxes.length > 0 && ops.some(o => o.t === 'text' && o.text && sboxes.some(b => o.at[0] >= b[0] && o.at[0] <= b[2] && o.at[1] >= b[1] && o.at[1] <= b[3]));
    const D = o => o.segs.map(sg => sg[0] === 'Z' ? 'Z' : sg[0] + sg.slice(1).map(p => { const q = PX(p); return `${f(q[0])} ${f(q[1])}`; }).join(' ')).join(' ');
    const head = (tip, from, cls) => { const dx = tip[0] - from[0], dy = tip[1] - from[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; return `<g class="${cls}"><path d="M${f(tip[0])} ${f(tip[1])} L${f(tip[0] - ux * 8 - uy * 3.6)} ${f(tip[1] - uy * 8 + ux * 3.6)} L${f(tip[0] - ux * 8 + uy * 3.6)} ${f(tip[1] - uy * 8 - ux * 3.6)}Z" class="sh-ah"/></g>`; };
    let o = '';
    ops.forEach(op => {
      if (op.t === 'path') {
        const st = op.st, d = D(op);
        if (op.closed && st.fill) o += `<g class="${st.fill}"><path d="${d}" class="${st.shade ? 'sh-c' + st.shade + (st.txt ? ' sh-ftx' : '') : st.solid ? (onSolid && st.fill !== 'kpip' ? 'sh-solid sh-tx' : 'sh-solid') : 'sh-fill'}"/></g>`;
        if (op.closed && st.hatch) { const hc = st.fill || st.stroke || 'k8'; hatch.add(hc); o += `<path d="${d}" fill="url(#${pid}-${hc})" class="sh-hatch"/>`; }
        if (st.stroke) {
          let dd = d;
          const sgs = op.segs.filter(sg => sg[0] !== 'Z'), pts = sgs.map(sg => PX(sg[sg.length - 1]));
          const ar = st.arrow === 'both' || st.arrow === 'start' || st.arrow === 'end' || st.arrow === true ? st.arrow : null;
          let heads = '';
          if (ar && pts.length > 1) {   // stop the line short of each arrowhead so its end does not poke through the tip
            const n0 = pts.length - 1, trim = (a, b) => { const L = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, t0 = Math.min(0.9, 6 / L); return [a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0]; };
            const q = pts.slice(), s1 = sgs[1][0] === 'C' ? PX(sgs[1][1]) : pts[1], sn = sgs[n0][0] === 'C' ? PX(sgs[n0][2]) : pts[n0 - 1];   // curves: aim along the tangent
            if (ar === 'both' || ar === 'start') { heads += head(pts[0], s1, st.stroke); q[0] = trim(pts[0], pts[1]); }
            if (ar === 'both' || ar === 'end' || ar === true) { heads += head(pts[n0], sn, st.stroke); q[n0] = trim(pts[n0], pts[n0 - 1]); }
            if (op.segs.every(sg => sg[0] !== 'C')) dd = q.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
          }
          o += `<g class="${st.stroke}"><path d="${dd}" class="sh-ln${st.dash ? ' sh-dash' : ''}" stroke-width="${f(st.w)}"/></g>${heads}`;
        }
        if (op.vlab) op.vlab.forEach(([x, y, t]) => { if (t) o += OT(x + ox + cxo, y + oy, t, { size: 13, weight: 650 }); });
      } else if (op.t === 'dot') { const q = PX(op.at); o += `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${op.r}" class="${op.cls}"/>`; }
      else if (op.t === 'text') {
        const q = PX(op.at);
        let tx = OT(q[0], q[1], op.text, { size: op.size, anchor: op.anchor, weight: op.weight, cls: op.color ? 'dt sh-tc' : 'dt' });
        if (op.flip) { const M = op.flip, a = M[0], b = -M[1], c = -M[2], d = M[3]; tx = `<g transform="matrix(${f(a * 1000) / 1000} ${f(b * 1000) / 1000} ${f(c * 1000) / 1000} ${f(d * 1000) / 1000} ${f(q[0] - a * q[0] - c * q[1])} ${f(q[1] - b * q[0] - d * q[1])})">${tx}</g>`; }
        o += op.color ? `<g class="${op.color}">${tx}</g>` : tx;
      } else if (op.t === 'angle') {
        const { V, a1, d } = op.px, x0 = V[0] + ox + cxo, y0 = V[1] + oy, r = op.r, c = op.st.stroke || 'k8';
        let g;
        if (op.right) { const rr = r * 0.62, u1 = [Math.cos(a1), Math.sin(a1)], u2 = [Math.cos(a1 + d), Math.sin(a1 + d)]; g = `<path d="M${f(x0 + u1[0] * rr)} ${f(y0 + u1[1] * rr)} L${f(x0 + (u1[0] + u2[0]) * rr)} ${f(y0 + (u1[1] + u2[1]) * rr)} L${f(x0 + u2[0] * rr)} ${f(y0 + u2[1] * rr)}" class="sh-ln" stroke-width="1.3"/>`; }
        else g = `<path d="M${f(x0 + Math.cos(a1) * r)} ${f(y0 + Math.sin(a1) * r)} A${r} ${r} 0 ${Math.abs(d) > Math.PI ? 1 : 0} ${d > 0 ? 1 : 0} ${f(x0 + Math.cos(a1 + d) * r)} ${f(y0 + Math.sin(a1 + d) * r)}" class="sh-ln" stroke-width="1.3"/>`;
        o += `<g class="${c}">${g}</g>`;
        if (op.lab) o += OT(op.lab[0] + ox + cxo, op.lab[1] + oy, String(op.label), { size: 12.5, weight: 650, cls: 'dt del' });
      } else if (op.t === 'dimlab') { const [x, y, an] = op.pos; o += `<g class="${op.color || 'k8'}">${OT(x + ox + cxo, y + oy, op.text, { size: 12, weight: 650, anchor: an, cls: op.color ? 'dt del sh-tc' : 'dt del' })}</g>`; }
    });
    const defs = hatch.size ? `<defs>${[...hatch].map(hc => `<pattern id="${pid}-${hc}" class="${hc}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="sh-hl"/></pattern>`).join('')}</defs>` : '';
    return wrap(s, W, H, defs + o, minW(W));
  }

  /* ============================================================== venn */
  // region expression -> list of atoms (bit i set = inside set i). & ∩ and, | ∪ + or, - minus, ! ~ ¬ or a trailing ' for complement, U = everything
  function vennExpr(src, names) {
    const n = names.length, ALL = Array.from({ length: 1 << n }, (_, i) => i), str = String(src).replace(/\s+/g, '');
    const byLen = names.map((v, i) => [v, i]).sort((a, b) => b[0].length - a[0].length);
    let p = 0;
    const err = m => fail('venn', `region "${src}": ${m} (sets are ${names.join(', ')}; use & | - ! ( ) and U)`);
    const post = set => { while (str[p] === "'" || str[p] === '’' || str[p] === 'ᶜ') { p++; set = ALL.filter(a => !set.includes(a)); } return set; };
    function factor() {
      const ch = str[p];
      if (ch === '!' || ch === '~' || ch === '¬') { p++; const s0 = factor(); return ALL.filter(a => !s0.includes(a)); }
      if (ch === '(') { p++; const s0 = expr(); if (str[p] !== ')') err('missing )'); p++; return post(s0); }
      const hit = byLen.find(([v]) => str.startsWith(v, p));
      if (hit) { p += hit[0].length; return post(ALL.filter(a => (a >> hit[1]) & 1)); }
      if (ch === 'U' || ch === 'S' && !names.includes('S')) { p++; return post(ALL.slice()); }
      return err(ch == null ? 'unexpected end' : `cannot read "${str.slice(p)}"`);
    }
    function term() { let s0 = factor(); while (str[p] === '&' || str[p] === '∩') { p++; const r = factor(); s0 = s0.filter(a => r.includes(a)); } return s0; }
    function expr() {
      let s0 = term();
      while (str[p] === '|' || str[p] === '∪' || str[p] === '+' || str[p] === '-' || str[p] === '−') { const op = str[p++], r = term(); s0 = op === '-' || op === '−' ? s0.filter(a => !r.includes(a)) : ALL.filter(a => s0.includes(a) || r.includes(a)); }
      return s0;
    }
    const out = expr();
    if (p < str.length) err(`unexpected "${str.slice(p)}"`);
    return out.sort((a, b) => a - b);
  }
  function vennModel(s) {
    const names = (Array.isArray(s.sets) ? s.sets : []).map(String);
    if (names.length < 2 || names.length > 3) fail('venn', 'sets must name 2 or 3 sets, e.g. ["A", "B"]');
    if (new Set(names).size !== names.length) fail('venn', 'set names must be different');
    const n = names.length, r = num(s.r, n === 2 ? 72 : 66), uni = s.universe != null && s.universe !== false;
    // circle centres: two side by side, three in a triangle (A top left, B top right, C bottom)
    const cs = n === 2 ? [[-0.56 * r, 0], [0.56 * r, 0]] : [[-0.6 * r * Math.cos(Math.PI / 6), -0.6 * r * 0.5], [0.6 * r * Math.cos(Math.PI / 6), -0.6 * r * 0.5], [0, 0.6 * r]];
    const mx = Math.max(...cs.map(c => Math.abs(c[0]))) + r, myT = -Math.min(...cs.map(c => c[1])) + r, myB = Math.max(...cs.map(c => c[1])) + r;
    const m = uni ? 30 : 22, lab = 18;   // margin round the circles; set names sit in it (wider for long names)
    const mw = m + Math.max(0, ...names.map(nm => tw(plain(nm), 13.5) - 14));
    const x0 = 8, y0 = top(s) + 2, box = [x0, y0, x0 + 2 * mx + 2 * mw, y0 + myT + myB + 2 * m + lab];
    const cx = x0 + mw + mx, cy = y0 + m + lab + myT;
    const C = cs.map(c => [cx + c[0], cy + c[1]]);
    const atomOf = (x, y) => C.reduce((a, c, i) => a | ((x - c[0]) ** 2 + (y - c[1]) ** 2 < r * r ? 1 << i : 0), 0);
    const clear = (x, y) => Math.min(...C.map(c => Math.abs(Math.hypot(x - c[0], y - c[1]) - r)), x - box[0], box[2] - x, y - box[1], box[3] - y);
    const colors = Array.isArray(s.colors) ? s.colors : [];
    const sets = names.map((nm, i) => {
      const c = C[i], dx = c[0] - cx, dy = c[1] - cy - (n === 2 ? r : 0), L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      const an = ux < -0.3 ? 'end' : ux > 0.3 ? 'start' : 'middle', lx = c[0] + ux * (r + 6), ly = c[1] + uy * (r + 6) + (an === 'middle' ? 4 : 0);
      return { name: nm, c, color: colors[i] != null ? kc(colors[i]) : 'k8', lab: [lx, ly, an] };
    });
    const obst = sets.map(st => { const w = tw(plain(st.name), 13.5), x = st.lab[2] === 'end' ? st.lab[0] - w : st.lab[2] === 'start' ? st.lab[0] : st.lab[0] - w / 2; return [x - 3, st.lab[1] - 10, x + w + 3, st.lab[1] + 10]; });
    if (uni) { const ul = s.universe === true ? 'U' : String(s.universe); obst.push([box[0], box[1], box[0] + tw(plain(ul), 13) + 16, box[1] + 22]); }
    // region text: the spot inside the region whose text box keeps the most clearance from every circle, edge and set name
    const regions = s.regions && typeof s.regions === 'object' ? s.regions : {};
    const placed = [];
    const atoms = Object.keys(regions).map(key => {
      const list = vennExpr(key, names);
      if (list.length !== 1) fail('venn', `region "${key}" is ${list.length} pieces of the diagram; label one piece, e.g. ${n === 3 ? '"A&B&!C" (only A and B) or "A&B&C"' : '"A&!B" (only A) or "A&B"'}`);
      const a = list[0], v = regions[key], text = v != null && typeof v === 'object' ? String(v.t != null ? v.t : '') : String(v == null ? '' : v), col = v != null && typeof v === 'object' && v.color != null ? kc(v.color) : null;
      let best = null;
      [13, 11, 10, 9.5].some(size => {                                     // 9.5 px only when a region has no room at 10
        const w = tw(plain(text), size) / 2 + 3, h = size * 0.62 + 2;
        for (let y = box[1] + 4; y <= box[3] - 4; y += 3) for (let x = box[0] + 4; x <= box[2] - 4; x += 3) {
          if (atomOf(x, y) !== a) continue;
          let sc = Infinity;
          for (const [px, py] of [[x - w, y - h], [x, y - h], [x + w, y - h], [x - w, y], [x, y], [x + w, y], [x - w, y + h], [x, y + h], [x + w, y + h]]) {
            if (atomOf(px, py) !== a || px < box[0] || px > box[2] || py < box[1] || py > box[3] || obst.concat(placed).some(b => px > b[0] && px < b[2] && py > b[1] && py < b[3])) { sc = -1; break; }
            sc = Math.min(sc, clear(px, py));
          }
          if (sc >= 0 && (!best || sc > best.sc + 1e-9)) best = { x, y, sc, size, w, h };
        }
        return best && best.sc >= 2;
      });
      if (!best) fail('venn', `no room for "${text}" in region "${key}" (shorten it or make r bigger)`);
      placed.push([best.x - best.w, best.y - best.h, best.x + best.w, best.y + best.h]);
      return { key, atom: a, text, color: col, x: best.x, y: best.y, size: best.size };
    });
    // shading: {expr: colour} or a list of expressions coloured by "color"
    const sh = Array.isArray(s.shade) ? s.shade.map(e => [e, s.color != null ? s.color : 'a']) : s.shade && typeof s.shade === 'object' ? Object.entries(s.shade) : [];
    const shade = {};
    sh.forEach(([e, c]) => vennExpr(e, names).forEach(a => (shade[a] = kc(c))));
    return { names, n, r, C, box, uni, sets, atoms, shade, atomOf };
  }
  function venn(s) {
    const M = vennModel(s), id = 'vn' + hid(s), [bx0, by0, bx1, by1] = M.box;
    const rectPath = `M${f(bx0)} ${f(by0)} H${f(bx1)} V${f(by1)} H${f(bx0)}Z`;
    const circ = c => `M${f(c[0] - M.r)} ${f(c[1])} a${f(M.r)} ${f(M.r)} 0 1 0 ${f(2 * M.r)} 0 a${f(M.r)} ${f(M.r)} 0 1 0 ${f(-2 * M.r)} 0Z`;
    let defs = '', o = '';
    const hatch = new Set();
    if (M.uni) o += `<rect x="${f(bx0)}" y="${f(by0)}" width="${f(bx1 - bx0)}" height="${f(by1 - by0)}" rx="4" class="vn-u"/>`;
    const used = Object.keys(M.shade).map(Number);
    if (used.length) {
      M.C.forEach((c, i) => (defs += `<clipPath id="${id}-i${i}"><path d="${circ(c)}"/></clipPath><clipPath id="${id}-o${i}"><path d="${rectPath} ${circ(c)}" clip-rule="evenodd"/></clipPath>`));
      used.forEach(a => {
        let g = s.hatch ? `<path d="${rectPath}" fill="url(#${id}-h-${M.shade[a]})" class="vn-hatch"/>` : `<g class="${M.shade[a]}"><path d="${rectPath}" class="vn-fill"/></g>`;
        if (s.hatch) hatch.add(M.shade[a]);
        M.C.forEach((c, i) => (g = `<g clip-path="url(#${id}-${(a >> i) & 1 ? 'i' : 'o'}${i})">${g}</g>`));
        o += g;
      });
    }
    if (hatch.size) defs += [...hatch].map(hc => `<pattern id="${id}-h-${hc}" class="${hc}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="sh-hl"/></pattern>`).join('');
    M.sets.forEach(st => (o += `<g class="${st.color}"><path d="${circ(st.c)}" class="vn-c"/>${OT(st.lab[0], st.lab[1], st.name, { anchor: st.lab[2], size: 13.5, weight: 700, cls: st.color === 'k8' ? 'dt' : 'dt vn-t' })}</g>`));
    // the universe's name sits outside every circle: on the shading when the outside is shaded ("!A"), so it takes the on-tint ink (P1-14)
    if (M.uni) o += OT(bx0 + 8, by0 + 12, s.universe === true ? 'U' : String(s.universe), { anchor: 'start', size: 13, weight: 700, cls: M.shade[0] != null ? 'dt dtm on-tint' : 'dt dtm' });
    M.atoms.forEach(at => (o += at.color ? `<g class="${at.color}">${OT(at.x, at.y, at.text, { size: at.size, weight: 650, cls: 'dt vn-t' })}</g>` : OT(at.x, at.y, at.text, { size: at.size, weight: 650 })));
    const W = Math.max(bx1 + 8, s.title ? tw(s.title, 13) + 16 : 0);
    return wrap(s, W, by1 + 8, (defs ? `<defs>${defs}</defs>` : '') + o, minW(W));
  }

  /* ============================================================== er */
  // Chen-notation ER diagram on a column/row grid (like circuit): entities (weak = double rectangle), relationships (identifying = double
  // diamond), attributes (key underlined, partial key dashed underline, multivalued double oval, derived dashed oval, composite = an attribute
  // of an attribute), participation lines (total = double line), cardinality and role labels placed clear of every shape, ISA circles
  // ("d" / "o") or triangles, and aggregation boxes that relationships can link to. Lines are straight, or orthogonal with elbow / via.
  // a shape: centre x, y; half sizes hw, hh; form rect | diamond | ellipse | circle | tri (rot = apex direction in degrees, -90 = up)
  function erRadius(sh, ux, uy) {   // distance from the centre to the outline along the unit direction (ux, uy)
    const ax = Math.abs(ux), ay = Math.abs(uy);
    if (sh.form === 'rect') return Math.min(ax > 1e-9 ? sh.hw / ax : Infinity, ay > 1e-9 ? sh.hh / ay : Infinity);
    if (sh.form === 'diamond') return 1 / (ax / sh.hw + ay / sh.hh);
    if (sh.form === 'ellipse') return 1 / Math.sqrt((ux / sh.hw) ** 2 + (uy / sh.hh) ** 2);
    if (sh.form === 'circle') return sh.hw;
    let best = Infinity;                                     // polygon: nearest crossing of the ray with an edge
    const P = sh.poly.map(p => [p[0] - sh.x, p[1] - sh.y]);
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], ex = b[0] - a[0], ey = b[1] - a[1], den = ux * ey - uy * ex;
      if (Math.abs(den) < 1e-12) continue;
      const t = (a[0] * ey - a[1] * ex) / den, s2 = (a[0] * uy - a[1] * ux) / den;
      if (t > 0 && s2 >= -1e-9 && s2 <= 1 + 1e-9) best = Math.min(best, t);
    }
    return isFinite(best) ? best : Math.max(sh.hw, sh.hh);
  }
  function erPoly(sh) {
    const { x, y, hw, hh } = sh;
    if (sh.form === 'rect') return [[x - hw, y - hh], [x + hw, y - hh], [x + hw, y + hh], [x - hw, y + hh]];
    if (sh.form === 'diamond') return [[x, y - hh], [x + hw, y], [x, y + hh], [x - hw, y]];
    if (sh.form === 'tri') {
      const a = (sh.rot * Math.PI) / 180, ca = Math.cos(a + Math.PI / 2), sa = Math.sin(a + Math.PI / 2);   // local apex up = (0, -1)
      return [[0, -24], [27, 14], [-27, 14]].map(([px, py]) => [x + px * ca - py * sa, y + px * sa + py * ca]);
    }
    return Array.from({ length: 20 }, (_, i) => { const t = (2 * Math.PI * i) / 20; return [x + hw * Math.cos(t), y + hh * Math.sin(t)]; });
  }
  // separating-axis test: does the box [x1, y1, x2, y2] overlap the convex polygon (a segment is a two-point polygon)?
  function erHit(b, poly) {
    const bp = [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]]], axes = [[1, 0], [0, 1]];
    for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; if (Math.hypot(q[0] - p[0], q[1] - p[1]) > 1e-9) axes.push([q[1] - p[1], p[0] - q[0]]); }
    return axes.every(([ax, ay]) => {
      const A = bp.map(p => p[0] * ax + p[1] * ay), B = poly.map(p => p[0] * ax + p[1] * ay);
      return Math.max(...A) > Math.min(...B) + 1e-6 && Math.max(...B) > Math.min(...A) + 1e-6;
    });
  }
  function erModel(s) {
    const g0 = Array.isArray(s.grid) ? s.grid : [];
    const cw = num(g0[0], 110), rh = num(g0[1], 70);
    const byId = {}, shapes = [];
    const at = (o, who) => (isPt(o.at) ? [o.at[0] * cw, o.at[1] * rh] : fail('er', `${who} needs "at": [column, row] (numbers; fractions and negatives are fine)`));
    const add = sh => { if (sh.id != null) { if (byId[sh.id]) fail('er', `two items are called "${sh.id}" (ids must be different)`); byId[sh.id] = sh; } sh.poly = erPoly(sh); shapes.push(sh); return sh; };
    const list = (k, alt) => { const v = s[k] != null ? s[k] : alt != null ? s[alt] : null; if (v != null && !Array.isArray(v)) fail('er', `${k} must be a list`); return v || []; };
    list('entities').forEach((e, i) => {
      if (!e || (e.id == null && e.label == null)) fail('er', `entity ${i + 1} needs an id (or label)`);
      const id = String(e.id != null ? e.id : e.label), label = String(e.label != null ? e.label : id), [x, y] = at(e, `entity ${id}`);
      add({ kind: 'entity', id, label, x, y, hw: Math.max(42, tw(plain(label), 12.5) / 2 + 13) + (e.weak ? 4 : 0), hh: 18 + (e.weak ? 4 : 0), form: 'rect', weak: !!e.weak, color: kc(e.color != null ? e.color : 'a') });
    });
    const rels = list('rels', 'relationships');
    rels.forEach((r, i) => {
      if (!r || (r.id == null && r.label == null)) fail('er', `relationship ${i + 1} needs an id (or label)`);
      const id = String(r.id != null ? r.id : r.label), label = String(r.label != null ? r.label : id), [x, y] = at(r, `relationship ${id}`);
      const w = tw(plain(label), 12), dbl = r.ident ? 6 : 0;                    // text box w × 14 fits when w/2/hw + 7/hh <= 1
      add({ kind: 'rel', id, label, x, y, hw: Math.max(44, (w / 2 + 6) / 0.7) + dbl * 1.4, hh: 25 + dbl, form: 'diamond', ident: !!r.ident, color: kc(r.color != null ? r.color : 'c'), src: r });
    });
    const attrs = list('attrs', 'attributes');
    attrs.forEach((a, i) => {
      if (!a || a.label == null) fail('er', `attribute ${i + 1} needs a label`);
      const label = String(a.label), [x, y] = at(a, `attribute ${label}`), dbl = a.multi ? 4 : 0;
      add({ kind: 'attr', id: a.id != null ? String(a.id) : null, label, x, y, hw: Math.max(30, tw(plain(label), 12) / 2 + 14) + dbl, hh: 15 + dbl, form: 'ellipse', key: !!a.key, partial: !!a.partial, multi: !!a.multi, derived: !!a.derived, color: a.color != null ? kc(a.color) : 'k8', tinted: a.color != null, src: a });
    });
    const isas = list('isa');
    isas.forEach((q, i) => {
      if (!q || q.super == null || !Array.isArray(q.subs) || !q.subs.length) fail('er', `isa ${i + 1} needs super (an entity id) and subs (a list of entity ids)`);
      const [x, y] = at(q, `isa ${i + 1}`), tri = q.shape === 'triangle';
      add({ kind: 'isa', id: q.id != null ? String(q.id) : null, label: tri ? String(q.label != null ? q.label : 'ISA') : String(q.label != null ? q.label : q.kind === 'o' ? 'o' : q.kind === 'd' ? 'd' : q.kind != null ? q.kind : ''), x, y, hw: tri ? 26 : 13, hh: tri ? 22 : 13, form: tri ? 'tri' : 'circle', rot: -90, color: q.color != null ? kc(q.color) : 'k8', src: q });
    });
    const ref = (id, who) => { const t = byId[String(id)]; if (!t) fail('er', `${who}: no item "${id}" (ids: ${Object.keys(byId).join(', ')})`); return t; };
    // aggregation: a dashed box round the listed items; relationships may link to it like an entity
    list('aggregations', 'aggs').forEach((g, i) => {
      if (!g || !Array.isArray(g.around) || !g.around.length) fail('er', `aggregation ${i + 1} needs around: [ids of the relationship and its entities]`);
      const ms = g.around.map(id => ref(id, `aggregation ${g.id != null ? g.id : i + 1}`)), pad = num(g.pad, 12);
      const x1 = Math.min(...ms.map(m => m.x - m.hw)) - pad, x2 = Math.max(...ms.map(m => m.x + m.hw)) + pad, y1 = Math.min(...ms.map(m => m.y - m.hh)) - pad - (g.label != null ? 12 : 0), y2 = Math.max(...ms.map(m => m.y + m.hh)) + pad;
      add({ kind: 'agg', id: g.id != null ? String(g.id) : null, label: g.label != null ? String(g.label) : '', x: (x1 + x2) / 2, y: (y1 + y2) / 2, hw: (x2 - x1) / 2, hh: (y2 - y1) / 2, form: 'rect', color: g.color != null ? kc(g.color) : null });
    });
    // triangles point at their superclass (snapped to up / down / left / right)
    shapes.filter(sh => sh.form === 'tri').forEach(sh => {
      const sup = ref(sh.src.super, 'isa'), ang = (Math.atan2(sup.y - sh.y, sup.x - sh.x) * 180) / Math.PI;
      sh.rot = Math.round(ang / 90) * 90; sh.poly = erPoly(sh);
    });
    // connectors: [from shape, to shape, points in between (px)]
    const links = [];
    const pts = (o, who) => (o.via == null ? [] : Array.isArray(o.via) && o.via.every(isPt) ? o.via.map(p => [p[0] * cw, p[1] * rh]) : fail('er', `${who}: via must be a list of [column, row] points`));
    rels.forEach((r, i) => {
      const R = byId[String(r.id != null ? r.id : r.label)];
      if (!Array.isArray(r.links) || !r.links.length) fail('er', `relationship ${R.id} needs links: [{to, card, total}] (the entities it relates)`);
      r.links.forEach((l0, k) => {
        const l = Array.isArray(l0) ? { to: l0[0], card: l0[1], total: l0[2] === 'total' || l0[2] === true } : typeof l0 === 'string' ? { to: l0 } : l0 || {};
        const who = `relationship ${R.id} link ${k + 1}`;
        if (l.to == null) fail('er', `${who} needs to (an entity id)`);
        links.push({ A: R, B: ref(l.to, who), via: pts(l, who), elbow: l.elbow, double: !!l.total, card: l.card != null ? String(l.card) : null, role: l.role != null ? String(l.role) : null, cardAt: l.cardAt, arrow: !!l.arrow, color: l.color != null ? kc(l.color) : null, who });
      });
    });
    shapes.filter(sh => sh.kind === 'attr').forEach(a => {
      if (a.src.of == null) fail('er', `attribute ${a.label} needs of (the id of its entity, relationship or composite attribute)`);
      const own = ref(a.src.of, `attribute ${a.label}`);
      links.push({ A: own, B: a, via: pts(a.src, `attribute ${a.label}`), elbow: a.src.elbow, double: false, attr: true });
    });
    shapes.filter(sh => sh.kind === 'isa').forEach(q => {
      const sup = ref(q.src.super, 'isa');
      links.push({ A: sup, B: q, via: [], double: !!q.src.total });
      q.src.subs.forEach(id => links.push({ A: q, B: ref(id, 'isa subs'), via: [], double: false, sub: true }));
    });
    // route: centre to centre through via points (elbow "hv" / "vh" adds the corner), then trim at both outlines
    const inside = (sh, p) => { const dx = p[0] - sh.x, dy = p[1] - sh.y, L = Math.hypot(dx, dy); return L < 1e-9 || L < erRadius(sh, dx / L, dy / L) - 0.5; };
    const edge = (sh, p) => { const dx = p[0] - sh.x, dy = p[1] - sh.y, L = Math.hypot(dx, dy) || 1, r = erRadius(sh, dx / L, dy / L); return [sh.x + (dx / L) * r, sh.y + (dy / L) * r]; };
    links.forEach(L => {
      let P = [[L.A.x, L.A.y]].concat(L.via);
      const last = P[P.length - 1];
      if (L.elbow === 'hv' || L.elbow === 'vh') P.push(L.elbow === 'hv' ? [L.B.x, last[1]] : [last[0], L.B.y]);
      else if (L.elbow != null) fail('er', `${L.who || 'link'}: elbow is "hv" (across, then up or down) or "vh"`);
      P.push([L.B.x, L.B.y]);
      while (P.length > 2 && inside(L.A, P[1])) P.splice(1, 1);
      while (P.length > 2 && inside(L.B, P[P.length - 2])) P.splice(P.length - 2, 1);
      P = P.filter((p, i) => !i || Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) > 0.01);
      if (P.length < 2) fail('er', `${L.who || L.A.id + ' -> ' + L.B.id}: the two shapes sit on the same spot`);
      if (L.sub && L.A.form === 'tri') { const q = L.A.poly; P[0] = [(q[1][0] + q[2][0]) / 2, (q[1][1] + q[2][1]) / 2]; }   // ISA triangle: subclasses hang from the base
      else P[0] = edge(L.A, P[1]);
      P[P.length - 1] = edge(L.B, P[P.length - 2]);
      L.pts = P;
    });
    // cardinality / role labels: beside the link (the end next to the entity first), clear of shapes, other labels and (if possible) lines
    const placed = [], segs = links.flatMap(L => L.pts.slice(1).map((p, i) => [L.pts[i], p]));
    const solid = shapes.filter(sh => sh.kind !== 'agg');
    const aggEdges = shapes.filter(sh => sh.kind === 'agg').flatMap(sh => { const q = sh.poly; return q.map((p, i) => [p, q[(i + 1) % 4]]); });
    const ok = (b, strict) => !solid.some(sh => erHit(b, sh.poly)) && !placed.some(q => q[0] < b[2] && q[2] > b[0] && q[1] < b[3] && q[3] > b[1]) &&
      !aggEdges.some(sg => erHit(b, sg)) && (!strict || !segs.some(sg => erHit(b, sg)));
    const labels = [];
    links.forEach(L => {
      [['card', L.card, 12, 700], ['role', L.role, 10.5, 600]].forEach(([what, text, size, weight]) => {
        if (text == null) return;
        const w = tw(plain(text), size) + 4, h = size + 3, n = L.pts.length;
        const order = Array.from({ length: n - 1 }, (_, i) => n - 2 - i);                                // segments from the entity end back
        const ts = typeof L.cardAt === 'number' && what === 'card' ? [L.cardAt] : what === 'card' ? [0.62, 0.5, 0.75, 0.38, 0.85, 0.25] : [0.4, 0.55, 0.28, 0.7, 0.18];
        const cands = [];
        order.forEach(si => {
          const a = L.pts[si], b = L.pts[si + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
          let sides = [[-uy, ux], [uy, -ux]];
          sides.sort((p, q) => (Math.abs(uy) < 0.5 ? p[1] - q[1] : q[0] - p[0]));                         // above a flat line, right of a steep one
          if (what === 'role') sides.reverse();
          ts.forEach(t => sides.forEach(([nx, ny]) => {
            const off = 4 + Math.abs(nx) * (w / 2) + Math.abs(ny) * (h / 2), cx = a[0] + (b[0] - a[0]) * t + nx * off, cy = a[1] + (b[1] - a[1]) * t + ny * off;
            cands.push([cx, cy, [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2]]);
          }));
        });
        const pick = cands.find(c => ok(c[2], true)) || cands.find(c => ok(c[2], false)) || cands[0];
        placed.push(pick[2]);
        labels.push({ x: pick[0], y: pick[1], text, size, weight, what, color: L.color, box: pick[2] });
      });
    });
    let bb = [Infinity, Infinity, -Infinity, -Infinity];
    const grow = (x1, y1, x2, y2) => { bb = [Math.min(bb[0], x1), Math.min(bb[1], y1), Math.max(bb[2], x2), Math.max(bb[3], y2)]; };
    shapes.forEach(sh => sh.poly.forEach(p => grow(p[0], p[1], p[0], p[1])));
    labels.forEach(l => grow(...l.box));
    links.forEach(L => L.pts.forEach(p => grow(p[0], p[1], p[0], p[1])));
    shapes.filter(sh => sh.form === 'tri' && sh.src.kind != null).forEach(sh => { const t = sh.src.kind === 'o' ? 'overlapping' : sh.src.kind === 'd' ? 'disjoint' : String(sh.src.kind); sh.note = t; grow(sh.x + 30, sh.y - 8, sh.x + 34 + tw(t, 10.5), sh.y + 8); });
    if (!shapes.length) fail('er', 'needs entities (and usually rels and attrs)');
    return { shapes, links, labels, bb, byId };
  }
  function er(s) {
    const M = erModel(s), pad = 8;
    const ox = pad - M.bb[0], oy = top(s) + 4 - M.bb[1];
    const W0 = M.bb[2] - M.bb[0] + 2 * pad, W = Math.max(W0, s.title ? tw(s.title, 13) + 16 : 0), H = M.bb[3] - M.bb[1] + top(s) + 4 + pad;
    const pl = P => P.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
    const poly = P => 'M' + P.map(p => `${f(p[0])} ${f(p[1])}`).join(' L') + 'Z';
    let o = `<g transform="translate(${f(ox + (W - W0) / 2)} ${f(oy)})">`;
    M.shapes.filter(sh => sh.kind === 'agg').forEach(sh => {
      o += `<g class="${sh.color || 'k8'}"><rect x="${f(sh.x - sh.hw)}" y="${f(sh.y - sh.hh)}" width="${f(2 * sh.hw)}" height="${f(2 * sh.hh)}" rx="8" class="er-agg${sh.color ? ' er-aggc' : ''}"/>${sh.label ? T(sh.x - sh.hw + 8, sh.y - sh.hh + 11, sh.label, { anchor: 'start', size: 10.5, weight: 650, cls: 'dt dtm' }) : ''}</g>`;
    });
    M.links.forEach(L => {
      let P = L.pts.map(p => p.slice());
      const solidEnd = sh => sh.kind !== 'agg';
      if (L.double) {                                          // a double line is a wide stroke with a thin gap: push its ends under the shapes so they close neatly
        const ext = (i, j, sh) => { if (!solidEnd(sh)) return; const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], d = Math.hypot(dx, dy) || 1; P[i] = [P[i][0] + (dx / d) * 3, P[i][1] + (dy / d) * 3]; };
        ext(0, 1, L.A); ext(P.length - 1, P.length - 2, L.B);
      }
      let head = '';
      if (L.arrow) {                                           // Korth-style arrow into the entity: "one"
        const n = P.length - 1, tip = L.pts[n], fr = L.pts[n - 1], d = Math.hypot(tip[0] - fr[0], tip[1] - fr[1]) || 1, ux = (tip[0] - fr[0]) / d, uy = (tip[1] - fr[1]) / d;
        head = `<path d="M${f(tip[0])} ${f(tip[1])} L${f(tip[0] - ux * 9 - uy * 4)} ${f(tip[1] - uy * 9 + ux * 4)} L${f(tip[0] - ux * 9 + uy * 4)} ${f(tip[1] - uy * 9 - ux * 4)}Z" class="er-ah"/>`;
        if (!L.double) P[n] = [tip[0] - ux * 6, tip[1] - uy * 6];
      }
      const d = pl(P);
      o += `<g class="${L.color || 'k8'}">${L.double ? `<path d="${d}" class="er-l2"/><path d="${d}" class="er-l2i"/>` : `<path d="${d}" class="er-l"/>`}${head}</g>`;
    });
    M.shapes.forEach(sh => {
      if (sh.kind === 'agg') return;
      const c = sh.color, plainFill = sh.kind === 'attr' ? !sh.tinted : sh.kind === 'isa';
      let g = '';
      if (sh.form === 'rect') {
        g += `<rect x="${f(sh.x - sh.hw)}" y="${f(sh.y - sh.hh)}" width="${f(2 * sh.hw)}" height="${f(2 * sh.hh)}" rx="2" class="er-s"/>`;
        if (sh.weak) g += `<rect x="${f(sh.x - sh.hw + 4)}" y="${f(sh.y - sh.hh + 4)}" width="${f(2 * sh.hw - 8)}" height="${f(2 * sh.hh - 8)}" rx="1" class="er-in"/>`;
      } else if (sh.form === 'diamond') {
        g += `<path d="${poly(sh.poly)}" class="er-s"/>`;
        if (sh.ident) { const k = Math.hypot(sh.hw, sh.hh), a = sh.hw - (5 * k) / sh.hh, b = sh.hh - (5 * k) / sh.hw; g += `<path d="${poly([[sh.x, sh.y - b], [sh.x + a, sh.y], [sh.x, sh.y + b], [sh.x - a, sh.y]])}" class="er-in"/>`; }
      } else if (sh.form === 'ellipse') {
        g += `<ellipse cx="${f(sh.x)}" cy="${f(sh.y)}" rx="${f(sh.hw)}" ry="${f(sh.hh)}" class="er-s${plainFill ? ' plain' : ''}${sh.derived ? ' er-dash' : ''}"/>`;
        if (sh.multi) g += `<ellipse cx="${f(sh.x)}" cy="${f(sh.y)}" rx="${f(sh.hw - 4)}" ry="${f(sh.hh - 4)}" class="er-in${sh.derived ? ' er-dash' : ''}"/>`;
      } else if (sh.form === 'circle') g += `<circle cx="${f(sh.x)}" cy="${f(sh.y)}" r="${f(sh.hw)}" class="er-s plain"/>`;
      else g += `<path d="${poly(sh.poly)}" class="er-s plain"/>`;
      const size = sh.kind === 'attr' ? 12 : sh.kind === 'isa' ? (sh.form === 'tri' ? 10.5 : 12.5) : sh.kind === 'rel' ? 12 : 12.5;
      const ty = sh.form === 'tri' ? sh.y + (sh.rot === -90 ? 4 : sh.rot === 90 ? -4 : 0) : sh.y;
      if (sh.label) g += OT(sh.x, ty, sh.label, { size, weight: sh.kind === 'attr' ? (sh.key ? 650 : 500) : 700, cls: 'dt er-t' });
      if (sh.key || sh.partial) { const w = tw(plain(sh.label), size); g += `<line x1="${f(sh.x - w / 2)}" x2="${f(sh.x + w / 2)}" y1="${f(sh.y + 8)}" y2="${f(sh.y + 8)}" class="er-u${sh.partial ? ' er-dash' : ''}"/>`; }
      if (sh.note) g += T(sh.x + 32, sh.y, sh.note, { anchor: 'start', size: 10.5, weight: 600, cls: 'dt dtm' });
      o += `<g class="${c}">${g}</g>`;
    });
    M.labels.forEach(l => { const tx = OT(l.x, l.y, l.text, { size: l.size, weight: l.weight, cls: l.what === 'role' ? 'dt del er-role' : 'dt del' }); o += l.color ? `<g class="${l.color} er-lc">${tx}</g>` : tx; });
    return wrap(s, W, H, o + '</g>', minW(W));
  }

  /* ============================================================== nest */
  // nested labelled boxes: C scopes and blocks, static / dynamic scope chains, memory segments, set containment where venn does not fit.
  // A box: title, note (right of the title), lines (mono text; mono: false for ordinary text) and rows ([key, value]), children stacked
  // (dir "v") or side by side ("h"), color a-h (default by depth), hl, dash. Arrows join boxes or single lines ("id" or "id.2" = its 2nd line or row), round the right (or left)
  // margin, or straight.
  const NS = { P: 10, TH: 24, LH: 18, GAP: 10, FS: 11.5 };
  const nsMono = (t, ui) => (ui ? tw(t, NS.FS) : vlen(t) * NS.FS * 0.6);
  function nestModel(s) {
    const { P, LH, GAP } = NS;
    const ids = {}, boxes = [];
    const list = (v, who) => (v == null ? [] : Array.isArray(v) ? v : fail('nest', `${who} must be a list`));
    function norm(b, depth, who, dir0) {
      if (!b || typeof b !== 'object' || Array.isArray(b)) fail('nest', `${who} is not a box (a box looks like {"title": "main()", "lines": ["int x = 1;"], "children": [...]})`);
      const id = b.id != null ? String(b.id) : null;
      if (id != null) {
        if (!id || id.includes('.')) fail('nest', `box id "${id}" must be non-empty and without dots (a dot picks a line: "${id.split('.')[0]}.2")`);
        if (ids[id]) fail('nest', `two boxes are called "${id}" (ids must be different)`);
      }
      const name = id || (b.title != null ? String(b.title) : who);
      const items = [];
      list(b.lines, `box ${name}: lines`).forEach(l => items.push(l && typeof l === 'object' ? { t: String(l.t != null ? l.t : ''), hl: !!l.hl || l.color != null, color: l.color } : { t: String(l == null ? '' : l) }));
      list(b.rows, `box ${name}: rows`).forEach((r, i) => {
        const q = Array.isArray(r) ? { k: r[0], v: r[1], hl: r[2] === 'hl' || r[2] === true } : r && typeof r === 'object' ? r : fail('nest', `box ${name}: row ${i + 1} is ["key", "value"] or {k, v, hl}`);
        items.push({ k: String(q.k == null ? '' : q.k), v: String(q.v == null ? '' : q.v), hl: !!q.hl || q.color != null, color: q.color });
      });
      const dir = b.dir != null ? b.dir : dir0;
      if (dir !== 'v' && dir !== 'h') fail('nest', `box ${name}: dir is "v" (children stacked) or "h" (side by side)`);
      const B = { id, title: b.title != null ? String(b.title) : '', note: b.note != null ? String(b.note) : '', items, dir, depth, ui: b.mono === false, hl: !!b.hl || (s.highlight != null && [].concat(s.highlight).map(String).includes(id)), color: b.color != null ? kc(b.color) : KC[depth % 8], dash: !!b.dash };
      if (id != null) ids[id] = B;
      boxes.push(B);
      B.kids = list(b.children, `box ${name}: children`).map((c, i) => norm(c, depth + 1, `box ${i + 1} inside ${name}`, s.dir || 'v'));
      const kw = items.filter(it => it.k != null).reduce((m, it) => Math.max(m, nsMono(it.k + ':', B.ui)), 0);
      B.kw = kw;
      const cw = items.reduce((m, it) => Math.max(m, it.k != null ? kw + 10 + nsMono(it.v, B.ui) : nsMono(it.t, B.ui)), 0);
      const tw0 = (B.title ? tw(B.title, 12.5) : 0) + (B.note ? (B.ui ? tw(B.note, 10.5) : vlen(B.note) * 10.5 * 0.6) + 14 : 0);
      const kidW = !B.kids.length ? 0 : dir === 'h' ? B.kids.reduce((a, k) => a + k.nat, 0) + GAP * (B.kids.length - 1) : Math.max(...B.kids.map(k => k.nat));
      B.nat = Math.max(64, tw0, cw, kidW) + 2 * P;
      return B;
    }
    if (s.dir != null && s.dir !== 'v' && s.dir !== 'h') fail('nest', 'dir is "v" (children stacked) or "h" (side by side)');
    const root = norm(s.root || (Array.isArray(s.boxes) ? { children: s.boxes } : fail('nest', 'needs "root": a box with title, lines / rows and children')), 0, 'root', s.dir || 'v');
    if (!s.root) { boxes.shift(); root.ghost = true; }                                   // "boxes": a row or stack of top-level boxes, no frame round them
    // a nest wider than its "w" (less the margins its side arrows need): each box's text wraps to the width the box gets there (lines,
    // row values, titles), children side by side sharing the width by their natural sizes; a nest that fits, or has no w, is drawn as before
    const NLH = NS.FS * 1.25, TLH = 12.5 * 1.25;
    const wrapM = (t, max, ui) => { const out = []; let line = ''; words(String(t)).forEach(w => { const c = line ? line + ' ' + w : w; if (line && nsMono(c, ui) > max) { out.push(line); line = w; } else line = c; }); out.push(line); return out; };
    const sideW = side => list(s.arrows, 'arrows').filter(a => a && !a.straight && (a.side || 'right') === side).reduce((t, a) => t + 16 + (a.label != null ? tw(plain(String(a.label)), 10.5) + 10 : 0), 0);
    const roomW = num(s.w, 0) - 2 * 8 - sideW('right') - sideW('left');
    function shrink(B, w) {                                                   // w: the box's whole width (a ghost: its inner width)
      const cw = B.ghost ? w : w - 2 * P, noteW = B.note ? (B.ui ? tw(B.note, 10.5) : vlen(B.note) * 10.5 * 0.6) + 14 : 0;
      B.items.forEach(it => {
        if (it.k != null) { const vw = Math.max(48, cw - B.kw - 10); if (nsMono(it.v, B.ui) > vw) it.vl = wrapM(it.v, vw, B.ui); }
        else if (nsMono(it.t, B.ui) > cw) it.tl = wrapM(it.t, cw, B.ui);
        it.n = (it.vl || it.tl || [0]).length;
      });
      if (B.title && tw(B.title, 12.5) + noteW > cw) B.tl = wrapEven(B.title, Math.max(60, cw - noteW), 12.5).split('\n');
      if (B.kids.length) {
        const inner = B.ghost ? w : cw;
        if (B.dir === 'h') { const tot = inner - GAP * (B.kids.length - 1), sum = B.kids.reduce((t, k) => t + k.nat, 0); B.kids.forEach(k => shrink(k, sum > tot ? (tot * k.nat) / sum : k.nat)); }
        else B.kids.forEach(k => shrink(k, inner));
      }
      const wl = it => (it.k != null ? B.kw + 10 + Math.max(...(it.vl || [it.v]).map(v => nsMono(v, B.ui))) : Math.max(...(it.tl || [it.t]).map(t => nsMono(t, B.ui))));
      const kidW = !B.kids.length ? 0 : B.dir === 'h' ? B.kids.reduce((a, k) => a + k.nat, 0) + GAP * (B.kids.length - 1) : Math.max(...B.kids.map(k => k.nat));
      B.nat = Math.max(64, (B.title ? Math.max(...(B.tl || [B.title]).map(t => tw(t, 12.5))) : 0) + noteW, ...B.items.map(wl), kidW) + 2 * P;
    }
    const shrunk = roomW > 0 && (root.ghost ? root.nat - 2 * P : root.nat) > roomW + 0.5;
    if (shrunk) shrink(root, roomW);
    function place(B, x, y, w) {
      B.x = x; B.y = y; B.w = w;
      B.th = B.ghost ? 0 : B.title || B.note ? NS.TH + ((B.tl || [0]).length - 1) * TLH : 8;
      let cur = y + B.th;
      if (B.items.length) { cur += 2; B.items.forEach(it => { it.h = LH + ((it.n || 1) - 1) * NLH; it.y = cur + it.h / 2; cur += it.h; }); cur += 4; }
      if (B.kids.length) {
        const inner = B.ghost ? w : w - 2 * P, x0 = B.ghost ? x : x + P;
        if (B.dir === 'h') {
          const nat = B.kids.reduce((a, k) => a + k.nat, 0) + GAP * (B.kids.length - 1), extra = Math.max(0, inner - nat) / B.kids.length;
          let cx = x0;
          B.kids.forEach(k => { place(k, cx, cur, k.nat + extra); cx += k.nat + extra + GAP; });
          const mh = Math.max(...B.kids.map(k => k.h));
          B.kids.forEach(k => (k.h = mh));
          cur += mh;
        } else B.kids.forEach((k, i) => { place(k, x0, cur, inner); cur += k.h + (i < B.kids.length - 1 ? GAP : 0); });
        cur += B.ghost ? 0 : P;
      } else cur += B.items.length ? 4 : 6;
      B.h = cur - y;
    }
    const pad = 8, y0 = top(s) + 4;
    place(root, pad, y0, Math.max(root.ghost ? root.nat - 2 * P : root.nat, shrunk ? roomW : num(s.w, 0) - 2 * pad));
    // arrows: from / to are "id" (its title bar) or "id.n" (its n-th line or row)
    const end = (ref, who) => {
      const [id, n] = String(ref).split('.'), B = ids[id];
      if (!B) fail('nest', `${who}: no box "${id}" (ids: ${Object.keys(ids).join(', ') || 'none; give boxes an "id"'})`);
      if (n == null) return { B, y: B.y + (B.title || B.note ? B.th / 2 : B.h / 2) };
      const it = B.items[+n - 1];
      if (!it || !Number.isInteger(+n)) fail('nest', `${who}: box ${id} has ${B.items.length} lines and rows, so "${ref}" does not exist (they count from 1)`);
      return { B, y: it.y, it };
    };
    const R = root.x + root.w, Lx = root.x;
    let gr = R + 16, gl = Lx - 16;
    const arrows = list(s.arrows, 'arrows').map((a, i) => {
      if (!a || a.from == null || a.to == null) fail('nest', `arrow ${i + 1} needs from and to (box ids, or "id.2" for a line)`);
      const who = `arrow ${a.label != null ? JSON.stringify(a.label) : i + 1}`, A = end(a.from, who), Bn = end(a.to, who);
      const side = a.side || 'right';
      if (side !== 'right' && side !== 'left') fail('nest', `${who}: side is "right" or "left"`);
      const lw = a.label != null ? tw(plain(String(a.label)), 10.5) : 0;
      let pts, lab;
      if (a.straight) {
        const cA = A.B.x + A.B.w / 2, cB = Bn.B.x + Bn.B.w / 2, right = cB >= cA;
        const p0 = [right ? A.B.x + A.B.w : A.B.x, A.y], p1 = [right ? Bn.B.x : Bn.B.x + Bn.B.w, Bn.y];
        pts = [p0, p1]; lab = { x: (p0[0] + p1[0]) / 2, y: (p0[1] + p1[1]) / 2 - 9, an: 'middle' };
      } else if (side === 'right') {
        const g = gr; gr += 16 + (lw ? lw + 10 : 0);
        pts = [[A.B.x + A.B.w, A.y], [g, A.y], [g, Bn.y], [Bn.B.x + Bn.B.w, Bn.y]]; lab = { x: g + 6, y: (A.y + Bn.y) / 2, an: 'start' };
      } else {
        const g = gl; gl -= 16 + (lw ? lw + 10 : 0);
        pts = [[A.B.x, A.y], [g, A.y], [g, Bn.y], [Bn.B.x, Bn.y]]; lab = { x: g - 6, y: (A.y + Bn.y) / 2, an: 'end' };
      }
      return { pts, label: a.label != null ? String(a.label) : null, lab, lw, color: a.color != null ? kc(a.color) : null, dash: !!a.dash, A, B: Bn };
    });
    let bb = [root.x, root.y, root.x + root.w, root.y + root.h];
    arrows.forEach(a => {
      a.pts.forEach(p => (bb = [Math.min(bb[0], p[0] - 6), Math.min(bb[1], p[1]), Math.max(bb[2], p[0] + 6), Math.max(bb[3], p[1])]));
      if (a.label) { const x1 = a.lab.an === 'start' ? a.lab.x : a.lab.an === 'end' ? a.lab.x - a.lw : a.lab.x - a.lw / 2; bb = [Math.min(bb[0], x1 - 2), Math.min(bb[1], a.lab.y - 9), Math.max(bb[2], x1 + a.lw + 4), Math.max(bb[3], a.lab.y + 9)]; }
    });
    return { root, boxes, ids, arrows, bb };
  }
  function nest(s) {
    const M = nestModel(s), pad = 8;
    const sx = pad - Math.min(pad, M.bb[0]), W0 = M.bb[2] + sx + pad, W = Math.max(W0, s.title ? tw(s.title, 13) + 16 : 0), H = M.bb[3] + pad;
    const { P, LH } = NS;
    let o = `<g transform="translate(${f(sx + (W - W0) / 2)} 0)">`;
    M.boxes.forEach(B => {
      let g = `<rect x="${f(B.x)}" y="${f(B.y)}" width="${f(B.w)}" height="${f(B.h)}" rx="8" class="ns-b${B.hl ? ' ns-on' : ''}${B.dash ? ' ns-dash' : ''}"/>`;
      if (B.title) g += T(B.x + P, B.y + B.th / 2 + 1, B.tl ? B.tl.join('\n') : B.title, { anchor: 'start', size: 12.5, weight: 700, cls: 'dt ns-t' });
      if (B.note) g += T(B.x + B.w - P, B.y + NS.TH / 2 + 1, B.note, { anchor: 'end', size: 10.5, weight: 600, cls: B.ui ? 'dt dtm' : 'dt dtm ns-m' });
      B.items.forEach(it => {
        const ih = it.h || LH, k1 = it.y - ((it.n || 1) - 1) * NS.FS * 0.625;            // a wrapped row's key sits on its first line
        if (it.hl) g += `<g class="${it.color != null ? kc(it.color) : 'k2'}"><rect x="${f(B.x + P - 4)}" y="${f(it.y - ih / 2 + 1)}" width="${f(B.w - 2 * P + 8)}" height="${f(ih - 2)}" rx="4" class="ns-l"/></g>`;
        if (it.k != null) g += T(B.x + P, k1, it.k + ':', { anchor: 'start', size: NS.FS, weight: 600, cls: B.ui ? 'dt dtm' : 'dt dtm ns-m' }) + T(B.x + P + B.kw + 10, it.y, it.vl ? it.vl.join('\n') : it.v, { anchor: 'start', size: NS.FS, weight: 650, cls: B.ui ? 'dt' : 'dt ns-m' });
        else g += T(B.x + P, it.y, it.tl ? it.tl.join('\n') : it.t, { anchor: 'start', size: NS.FS, weight: B.ui ? 500 : 550, cls: B.ui ? 'dt' : 'dt ns-m' });
      });
      o += `<g class="${B.color}">${g}</g>`;
    });
    M.arrows.forEach(a => {
      const P0 = a.pts, n = P0.length - 1, tip = P0[n], fr = P0[n - 1], d = Math.hypot(tip[0] - fr[0], tip[1] - fr[1]) || 1, ux = (tip[0] - fr[0]) / d, uy = (tip[1] - fr[1]) / d;
      const Q = P0.slice(); Q[n] = [tip[0] - ux * 7, tip[1] - uy * 7];
      let g = `<circle cx="${f(P0[0][0])}" cy="${f(P0[0][1])}" r="2.6" class="ns-ah"/><path d="${Q.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ')}" class="ns-a${a.dash ? ' ns-dash' : ''}"/>`;
      g += `<path d="M${f(tip[0])} ${f(tip[1])} L${f(tip[0] - ux * 9 - uy * 4)} ${f(tip[1] - uy * 9 + ux * 4)} L${f(tip[0] - ux * 9 + uy * 4)} ${f(tip[1] - uy * 9 - ux * 4)}Z" class="ns-ah"/>`;
      if (a.label) g += T(a.lab.x, a.lab.y, a.label, { anchor: a.lab.an, size: 10.5, weight: 650, cls: 'dt del ns-al' });
      o += `<g class="${a.color || 'k8'}">${g}</g>`;
    });
    return wrap(s, W, H, o + '</g>', minW(W));
  }

  /* ============================================================== what a drawing shows, in words (P3-14) */
  /* describe(spec) -> {intro, items} or null: the facts a sighted reader takes from the picture, for a visually hidden list beside it (the
     drawing itself is one image named by its title). Labels keep their $maths$ (md.js says them); an author's spec.alt wins (null here).
     Kinds without a useful reading (plots, circuits, waves, shapes, venn, er, nest; tables are HTML already) return null. */
  const nm = v => String(v == null ? '' : v).replace(/\n+/g, ' ').trim();
  const list = (a, n = 40) => (a.length > n ? a.slice(0, n).join(', ') + `, and ${a.length - n} more` : a.join(', '));
  const DESC = {
    gantt(s) {
      const bl = s.blocks || [];
      if (!bl.length) return null;
      const t0 = Math.min(0, ...bl.map(b => num(b.from, 0))), t1 = Math.max(...bl.map(b => num(b.to, 0)));
      const items = bl.map(b => `${nm(b.p === 'idle' ? b.label || 'idle' : b.label || b.p)}: ${b.from} to ${b.to}`);
      if ((s.arrivals || []).length) items.push('Arrivals: ' + list(s.arrivals.map(a => `${nm(a.p)} at ${a.t}`)));
      (s.marks || []).forEach(m => items.push(`Mark at ${m.t}${m.label ? ': ' + nm(m.label) : ''}`));
      (s.queue || []).forEach(q => items.push(`Ready queue at ${q.t}: ${(q.items || []).length ? list(q.items.map(nm)) : 'empty'}`));
      return { intro: `Timeline from ${t0} to ${t1}${s.lanes === 'by-process' ? ', one lane per process' : ''}:`, items };
    },
    memory(s) {
      const bl = s.blocks || [];
      if (!bl.length) return null;
      const items = bl.map(b => [nm(b.label) || 'block', b.note != null ? nm(b.note) : '', b.addr != null ? 'at ' + nm(b.addr) : '', b.kind === 'free' || b.kind === 'hole' ? 'free' : ''].filter(Boolean).join(', '));
      (s.brackets || []).forEach(br => items.push(br.from != null && br.to != null ? `${nm(bl[br.from] && bl[br.from].label)} to ${nm(bl[br.to] && bl[br.to].label)}: ${nm(br.label)}` : nm(br.label)));
      return { intro: `${bl.length} blocks, ${s.orientation === 'h' ? 'left to right' : 'top to bottom'}:`, items };
    },
    bits(s) {
      const fl = s.fields || [];
      if (!fl.length) return null;
      const n = fl.reduce((a, x) => a + num(x.bits, 0), 0);
      return { intro: `${n} bits${s.msb ? ', most significant first' : ''}:`, items: fl.map(x => `${nm(x.label)}: ${x.bits} bit${x.bits === 1 ? '' : 's'}${x.sub ? ' (' + nm(x.sub) + ')' : ''}`) };
    },
    array(s) {
      const cells = s.cells || [];
      if (!cells.length) return null;
      const items = cells.map((c0, i) => { const c = typeof c0 === 'object' && c0 !== null ? c0 : { v: c0 }; return `${s.index === false ? '' : `[${c.i != null ? c.i : i}] `}${nm(c.v)}${c.hl ? ' (marked)' : ''}`; });
      (s.pointers || []).forEach(p => items.push(`${nm(p.label)} points to [${p.at}]`));
      return { intro: `${cells.length} cells:`, items };
    },
    kmap(s) {
      let M;
      try { M = kmapModel(s); } catch (e) { return null; }
      const ones = [], dc = [];
      M.val.forEach((v, t) => { if (v === 1) ones.push(t); else if (v === 'X') dc.push(t); });
      const items = [`1s at ${ones.length ? list(ones.map(String), 64) : 'no cell'}`];
      if (dc.length) items.push(`Don't-cares at ${list(dc.map(String), 64)}`);
      M.groups.forEach((gr, gi) => { const n = kmapNum(s, gi); items.push(`Group ${n ? n + ', ' : ''}${nm(gr.label)}${gr.sum ? ' (0s)' : ''}: cells ${gr.cells.join(', ')}${gr.wrong ? ' (a wrong group)' : ''}`); });
      return { intro: `K-map of ${M.vars.join(', ')}, cells numbered by minterm:`, items };
    },
    tree(s) {
      if (!s.root) return null;
      const items = [];
      const walk = n => {
        if (!n) return;
        const kids = n.children || [];
        if (kids.some(Boolean)) {
          const bin = s.binary && kids.length === 2;
          items.push(`${nm(n.label)}: ${bin ? [kids[0] ? 'left ' + nm(kids[0].label) : 'no left child', kids[1] ? 'right ' + nm(kids[1].label) : 'no right child'].join(', ') : 'children ' + list(kids.filter(Boolean).map(k => nm(k.label) + (k.edge != null ? ` (${nm(k.edge)})` : '')))}`);
        }
        kids.forEach(walk);
      };
      walk(s.root);
      return { intro: `Tree with root ${nm(s.root.label)}${items.length ? ':' : ', no children'}`, items };
    },
    graph(s) {
      const nodes = s.nodes || [], dir = s.directed !== false, by = Object.fromEntries(nodes.map(x => [x.id, x]));
      const name = id => nm(by[id] && by[id].label != null ? by[id].label : id);
      const items = (s.edges || []).map(e => `${name(e.from)} ${dir ? 'to' : 'and'} ${name(e.to)}${e.label != null && e.label !== '' ? ` (${nm(e.label)})` : e.w != null ? ` (${e.w})` : ''}`);
      return { intro: `${dir ? 'Directed graph' : 'Graph'}, ${nodes.length} node${nodes.length === 1 ? '' : 's'} (${list(nodes.map(x => name(x.id)))})${items.length ? ', edges:' : ', no edges'}`, items };
    },
    seq(s) {
      const ev = s.events || [];
      if (!ev.length) return null;
      const items = ev.map(e => (e.t != null ? `${nm(e.t)}: ` : '') + (e.from && e.to ? `${nm(e.from)} to ${nm(e.to)}: ${nm(e.text)}` : e.note ? `Note${e.over ? ' over ' + list(e.over.map(nm)) : ''}: ${nm(e.note)}` : `${nm(e.lane)}: ${nm(e.text)}`));
      return { intro: `Between ${list((s.lanes || []).map(nm))}, in order:`, items };
    },
    layers(s) {
      const ls = s.layers || [];
      if (!ls.length) return null;
      const items = ls.map(l => nm(l.label) + (l.note ? ' (' + nm(l.note) + ')' : '') + (l.right ? ': ' + nm(l.right) : ''));
      (s.side || []).forEach(sd => items.push(`${sd.arrow === 'up' ? 'Upward' : 'Downward'}: ${nm(sd.label)}`));
      return { intro: `${ls.length} layers, top to bottom:`, items };
    },
    flow(s) {
      const nodes = s.nodes || [], by = Object.fromEntries(nodes.map(n => [n.id, n]));
      const edges = flowEdges(s);
      if (!nodes.length) return null;
      const name = id => nm(by[id] ? by[id].label : id);
      return { intro: `Flowchart, ${nodes.length} steps:`, items: nodes.map(n => name(n.id) + (n.shape === 'diamond' || n.kind === 'decision' ? ' (a decision)' : '')).concat(edges.map(e => `${name(e.from)} then ${name(e.to)}${e.label ? ` (${nm(e.label)})` : ''}`)) };
    }
  };
  function describe(spec) {
    if (!spec || spec.alt || !DESC[spec.type]) return null;
    try { const d = DESC[spec.type](spec); return d && (d.items.length || d.intro) ? d : null; } catch (e) { return null; }
  }

  /* ============================================================== dispatcher */
  const TYPES = { gantt, graph, tree, table, memory, seq, layers, bits, flow, plot, array, kmap, circuit, wave, shapes, venn, er, nest };
  function render(spec) {
    if (!spec || !TYPES[spec.type]) throw new Error('unknown diagram type ' + (spec && spec.type));
    return TYPES[spec.type](spec);
  }
  GA.diagram = { render, describe, types: Object.keys(TYPES), compileExpr, canRelayout, relayoutTypes: [...RELAYOUT], wrapText, geom: { flow: flowModel, kmap: kmapModel, kmapTerm, circuit: circuitModel, wave: waveModel, shapes: shapesModel, tf: shTf, venn: vennModel, vennExpr, er: erModel, nest: nestModel } };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.diagram;
})(typeof window !== 'undefined' ? window : globalThis);
