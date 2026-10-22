"""Props for "PGBP — Profits and Gains of Business or Profession" (CA Inter, A.Y. 2026-27): the computation sheet,
paper and law (ledger, bills, cheque, stamps, forms, calendars, year bars), the PGBP machine, blocks of assets as glass
tanks, the bakery world (shop, oven, mixer, van ...) and a consistent cast of flat-vector busts. Flat vector, soft
shadows, gentle gradients, made to read on the dark navy backdrop. Canvas px (1920x1080). Every prop takes an alpha
`a` and returns early when a <= 0. Only eng.py, numpy, skia and math (+ stdlib datetime for weekdays).
Static art is recorded once (_pic) and, when it stands still on screen, blitted from a pixel-aligned raster cache.

  money
    rupee(n) -> '₹2,25,000' (Indian grouping)      inr(n) -> '₹12 lakh' · '₹1.2 crore' · else rupee(n)
    roll(c, n, x, y, u, size=40, col=GOLD, a, align='r', fam=MONO, prefix='₹', signed=False, w=700, glow, suffix)
                       amount rolling 0 -> n as u 0 -> 1 (odometer wheels, high digits settle first); returns width
    notes(c, x, y, a, n=3, sc=1., ang=0., val='500', tint='g')      fan of rupee notes, centred
    coin(c, x, y, r=22, a, col=GOLD, label='₹', spin=0.)            a coin (spin turns it edge-on)
  the computation sheet (hero)
    sheet(c, x, y, w, rows, a, t, title=None, col=GOLD, scroll=0., max_h=None, cols=None, title_r=None, size=31,
          asize=33, col2_a=1., grow=False) -> card rect      top-left (x, y); rows = [{'label', 'amt', 'kind':
          'head'|'start'|'add'|'less'|'sub'|'total'|'note', 't0', 'sec', 'strike', 'hl': (t0, t1), 'col', 'amt2', 't2'}]
    sheet_height(rows, title=None, cols=None, max_h=None)   sheet_row_y(x, y, rows, i, scroll=0., title, cols)
    sheet_scroll(rows, t, max_h) -> scroll that keeps the newest revealed row in the max_h window (eased)
  paper and law
    ledger(c, x, y, w, rows, a, title='Profit & Loss A/c', u=1., hl=None, strike=None, sc=1., sub=None, size=26)
                       cream P&L, top-left; rows = [(label, amount|None, ''|'bold'|'total'|'dim')]; -> (row ys, rect)
    bill(c, x, y, a, title='Flour', amt=400000, mode=None, date=None, sc=1., ang=0., col=None, stamp=None, no=None)
                       invoice slip 236 x 150 centred; mode 'cash' 'upi' 'cheque' 'card' 'bank' 'neft' 'draft';
                       stamp = (text, col, u)
    cheque(c, x, y, a, amt=150000, payee="Meera's Bakehouse", crossed=True, sc=1., ang=0., date='DDMMYYYY'|None)
    stamp(c, x, y, text, col=RED, a, u=1., ang=-12., size=40, sub=None, deep=False)   rubber stamp, slams in as u
                       0 -> 1 (impact at u ~ .3); deep=True = darker ink for paper. Texts: ALLOWED DISALLOWED ...
    form(c, x, y, a, title='Form 3CD', sub='Tax audit report', sc=1., col=ACC, ang=0.)   government form, centred
    book(c, x, y, a, title='Books of account', col=BLUE, sc=1., open_=0.)   ledger book, closed -> open spread
    sec(c, x, y, s, a, col=VIO, size=22, align='l', mark=None) -> width       '§ 40A(3)' chip (§ added before digits)
    calendar(c, x, y, a, day=20, mon='DEC', year=None, sc=1., col=RED, flip=0., ang=0., next=None)   tear-off page;
                       flip 0..1 turns it to the next day (month ends roll over); year adds the weekday
    yearbar(c, x, y, w, a, t, start=(2025,4,1), end=(2026,3,31), extend=None, marks=(), spans=(), h=56, label=True,
            ext_u=1., ext_k=1., ext_col, ext_label='after the year', py=None) -> end-tick x
                       marks = [(date, label, col, alpha[, level])] flags; spans = [(d0, d1, label, col, alpha)]
    yearbar_x(x, w, date, start, end, extend=None, ext_k=1.) -> px of the start of date (y, m, d[, day fraction])
    heads5(c, x, y, w, a, hl=None, t=0., open_=None, h=300, labels=None) -> drawer mouth centres   five heads of
                       income as cabinet drawers (Salaries · House property · Business / profession PGBP · Capital
                       gains · Other sources); hl = index | {index: alpha}; open_ = {index: 0..1}
    regime_switch(c, x, y, a, pos=0., t=0., sc=1., left=('Default', '115BAC'), right=('Opted out', 'old regime'))
    magnifier(c, x, y, r=60, a, ang=-35, fn=None)   lens centre (x, y); fn(c) draws inside the lens
    hourglass(c, x, y, s=1., a, u=0.)   sand falls with u          padlock(c, x, y, s, col, a, open_)
  the machine
    conveyor(c, x0, x1, y, a, t, speed=80., h=26)   belt top at y, treads move with t
    scanner_back(...) / scanner_front(c, x, y, a, label='40A(3)', state=0., t=0., h=240, w=150)   airport gate over
                       the belt at x (draw back, then the items, then front); state 0 idle, +1 pass, -1 reject
    scanner(...)      back + front in one call
    machine(c, x, y, w, h, a, t, stages=STAGES, active=None, done=None, out='= PGBP', hopper=True) -> Pts of
                       chamber centres (.port, .hopper); active = index (float glides; n lights the port)
  blocks of assets
    tank(c, x, y, w, h, a, t, level=.5, cap=1., label='Plant & machinery · 15%', amount=None, col=ACC, inflow=0.,
         outflow=0., crack=0., ghost=0., floor_glow=0., layers=None, floor_label='never below zero', floor_col=GOLD,
         marks=(), drain_to=None, sub=None) -> (centre x, surface y, inner rect)      top-left (x, y)
                       layers = [(fraction, col, label)] bottom first; marks = [(level, label, col)]
    bucket(c, x, y, a, level=0., label='Short-term capital gain', col=GOLD, sub=None, amount=None, t=0., w=210,
           h=150) -> (x, surface y)      rim centre at (x, y)
  assets and places (side views, (x, y) = bottom centre, s scales)
    oven(c, x, y, s, a, t, on=1.)   mixer(c, x, y, s, a, t, spin=0.)   van(c, x, y, s, a, col=BLUE, label, t, move,
    flip=False)   laptop(c, x, y, s, a, on=1.)   counter(c, x, y, s, a)   shop(c, x, y, s, a, t, sign, lit=1.)
    land(c, x, y, w, h, a, label=None, pegs=True)  (top-left)   lab(c, x, y, s, a, t) == lab_bench(...)
    cold_store(c, x, y, s, a, t, label='COLD STORAGE')   truck(c, x, y, s, a, kind='light'|'heavy', col=ORANGE,
    label=None, t, move, flip=False)   dental_chair(c, x, y, s, a, t, lamp=1.)   flats(c, x, y, s, a, n=6, t)
    tea(c, x, y, s, a)   cake(c, x, y, s, a, kind='wedding'|'slice'|'loaf')   sack(c, x, y, s, a, label='Flour')
    boxes(c, x, y, s, a)   generator(c, x, y, s, a, t, on=0.)   extinguisher(c, x, y, s, a)
    building(c, x, y, s, a, floors=2)   factory(c, x, y, s, a, t)   ship(c, x, y, s, a, t)  (waterline centre)
  people
    person(c, x, y, s=1., a, who='meera', t, talk=0., look=0., mood=0., col=None)   bust ~222 px tall, (x, y) =
                       bottom centre; who in CAST: meera rohan kabir ravi anil sunil officer ca farmer supplier staff
    bubble(c, x, y, w, text, a, tail='bl'|'br'|'tl'|'tr', col=WHITE, size=26, u=1.) -> (x, y, w, h, tip)
  widgets
    meter(c, x, y, w, a, value=.12, limit=.05, label='Cash receipts', fmt='{:.0%}', hi=None)   threshold bar
    gauge(c, x, y, r, a, value, lo, hi, ticks=(), label='', limit=None, fmt=None, zones=())   semicircle dial
    slab(c, x, y, w, h, a, col=ACC, title=None, sub=None, icon_name=None)   panel with coloured left edge
    tile(c, x, y, w, h, icon_fn, label, a, col=ACC, ok=None, glow=0.)   icon_fn = ICONS name or fn(c, cx, cy, s)
    yearstrip(c, x, y, w, n, a, labels=None, hl=None, col=ACC, h=72, cols=None, sub=None) -> box centres
    icon(c, name, x, y, s=1., col=DIM, a, w=3.2)   64 px line icons: ICONS (cash card upi cheque bank draft ...)
  copied from the parking film (verbatim): ftext / ftext_w (MONO = Menlo, COND), padlock, gear, clock_face, phone,
    qr, price_tag, pay_icon, rupee, bolt, obox, chip, lane, link;  helpers: itext (italic), wrap, Pts
  palette: ACC GOLD GREEN RED VIO DIM BLUE PINK ORANGE · CREAM INK PAPER_LINE · fonts MONO COND SERIF HAND SIGN
  NOTE scenes/common.py defines its own lab() (a text helper) after `from props import *`: use lab_bench() there.

  python props.py   -> props_gallery.jpg, props_gallery2.jpg ... props_gallery6.jpg (every prop in a few states)
"""
import datetime, math, re, sys
from contextlib import contextmanager
sys.path.insert(0, '/Users/ztejas/edu2d')
import numpy as np
import skia
from eng import *
_txt = text

ACC, GOLD, GREEN, RED, VIO, DIM, BLUE, PINK, ORANGE = ('#7dd3fc', '#fbbf24', '#86efac', '#f87171', '#a78bfa',
                                                       '#c9d3ea', '#60a5fa', '#f472b6', '#fb923c')
CREAM, INK, PAPER_LINE = '#f5efe0', '#1f2430', '#d9cfb8'
GLASS, TYRE, NAVY, STEEL = '#0f1726', '#090c12', '#0b1024', '#8a97b3'
MONO, COND, SERIF, HAND, SIGN = 'Menlo', 'Avenir Next Condensed', 'Georgia', 'Bradley Hand', 'Snell Roundhand'
INKS = {'red': '#c81e1e', 'green': '#15803d', 'blue': '#1d4ed8', 'gold': '#b45309', 'vio': '#6d28d9'}

# ------------------------------------------------------------------ small internals (verbatim from the parking film)
_C = {}
def _cache(key, fn):
    """Memo for paths / shaders / layouts; cleared when it grows (animated args must not leak over 40k frames)."""
    v = _C.get(key)
    if v is None:
        if len(_C) > 4000: _C.clear()
        v = _C[key] = fn()
    return v

@contextmanager
def _fade(c, a, box=None):
    """Draw a block at full alpha into a bounded layer composited at alpha a (no layer when a ~ 1)."""
    if a >= .999:
        yield; return
    p = skia.Paint(); p.setAlphaf(clamp(a))
    c.saveLayer(skia.Rect(*box) if box else None, p)
    try: yield
    finally: c.restore()

_TFX = {}
def _font(fam, size, w=700):
    k = (fam, w)
    if k not in _TFX: _TFX[k] = skia.Typeface(fam, skia.FontStyle(w, 5, skia.FontStyle.kUpright_Slant))
    f = skia.Font(_TFX[k], size); f.setEdging(skia.Font.Edging.kAntiAlias); f.setSubpixel(True)
    return f

_FBX = {}
def _fruns(s, size, fam=MONO, w=700):
    """(substring, Font) runs of s in family fam, falling back per character to a system font that has the glyph."""
    f = _font(fam, size, w)
    if s.isascii(): return [(s, f)]
    tf = _TFX[(fam, w)]; out = []
    for ch, g in zip(s, tf.unicharsToGlyphs([ord(ch) for ch in s])):
        ff = f
        if g == 0 and not ch.isspace():
            if ch not in _FBX:
                _FBX[ch] = skia.FontMgr.RefDefault().matchFamilyStyleCharacter(fam, tf.fontStyle(), ['en'], ord(ch))
            if _FBX[ch] is not None: ff = skia.Font(_FBX[ch], size); ff.setEdging(skia.Font.Edging.kAntiAlias)
        if out and out[-1][1] is ff: out[-1][0] += ch
        else: out.append([ch, ff])
    return out

def ftext_w(s, size, fam=MONO, w=700, track=0.):
    """Width of s in a specific family."""
    return sum(f.measureText(r) for r, f in _fruns(s, size, fam, w)) + track * max(len(s) - 1, 0)

def ftext(c, s, x, y, size, fam=MONO, col=WHITE, a=1., align='l', w=700, glow=0., track=0.):
    """Text in a specific family: MONO (Menlo bold: LED digits, ticket lines) or COND (Avenir Next Condensed:
    plates); missing glyphs (₹) fall back like eng.text. Returns the width."""
    if a <= 0.004 or not s: return 0
    runs = _fruns(s, size, fam, w); tw = ftext_w(s, size, fam, w, track)
    x0 = x - tw * {'l': 0, 'c': .5, 'r': 1}[align]
    def draw(p):
        xx = x0
        for r, ff in runs:
            if not track: c.drawString(r, xx, y, ff, p); xx += ff.measureText(r); continue
            for ch in r: c.drawString(ch, xx, y, ff, p); xx += ff.measureText(ch) + track
    if glow: draw(paint(col, .55 * a, blur=glow))
    draw(paint(col, a))
    return tw

def _cpaint(col, a=1., r=4.):
    p = paint(col, a); p.setPathEffect(skia.CornerPathEffect.Make(r)); return p

def bolt(c, x, y, h, col=GREEN, a=1.):
    """Lightning glyph of height h centred at (x, y) (EV badge / EV bay)."""
    if a <= 0: return
    P = _cache('bolt', lambda: poly(np.array([(.14, -.5), (-.3, .08), (-.03, .08), (-.14, .5), (.3, -.1), (.03, -.1)])))
    c.save(); c.translate(x, y); c.scale(h, h); c.drawPath(P, _cpaint(col, a, .03)); c.restore()

# ------------------------------------------------------------------ pictures, italic text, wrapping
_VEC = [0]                       # > 0 while recording a picture / rasterising: nested art stays vector

def _pic(key, fn, bounds):
    """Cached skia.Picture of fn(canvas): static art recorded once. bounds = (x, y, w, h) in the art's local
    coordinates (its cull rect; _play rasterises exactly this box)."""
    def build():
        rec = skia.PictureRecorder(); cv = rec.beginRecording(skia.Rect.MakeXYWH(*bounds)); _VEC[0] += 1
        try: fn(cv)
        finally: _VEC[0] -= 1
        return rec.finishRecordingAsPicture()
    return _cache(('pic',) + tuple(key), build)

def _play(c, pic, x=0., y=0., s=1., a=1., ang=0., sx=1., sy=1.):
    """Draw a cached picture at (x, y), rotated ang degrees, scaled s (sx / sy extra axis scales), alpha a: as a
    device-resolution image (rasterised once per scale bucket; see _blit), or as vector inside a recording."""
    if a <= 0: return
    if _VEC[0] > 0 or sy != 1:
        c.save(); c.translate(x, y)
        if ang: c.rotate(ang)
        if s != 1 or sx != 1 or sy != 1: c.scale(s * sx, s * sy)
        if a < .999:
            p = skia.Paint(); p.setAlphaf(clamp(a)); c.drawPicture(pic, None, p)
        else: c.drawPicture(pic)
        c.restore(); return
    r = pic.cullRect()
    _blit(c, ('pic', pic.uniqueID()), lambda cv: cv.drawPicture(pic), (r.left(), r.top(), r.width(), r.height()), x, y, s, a, ang, sx)

_IMG = {}; _IMGPX = [0]
_SEEN = {}
def _raster(key, q, fn, bounds):
    """Raster of fn's art under the linear part q = (a, b) of a similarity transform (scale + rotation), with the
    device offset of its top-left pixel relative to the local origin."""
    k = (key, q); hit = _IMG.pop(k, None)
    if hit is None:
        a_, b_ = q; L = skia.Matrix(); L.setAll(a_, -b_, 0, b_, a_, 0, 0, 0, 1)
        bx, by, bw, bh = bounds
        P = [L.mapXY(px, py) for px, py in ((bx, by), (bx + bw, by), (bx, by + bh), (bx + bw, by + bh))]
        mx, my = math.floor(min(p.x() for p in P)), math.floor(min(p.y() for p in P))
        W_, H_ = int(math.ceil(max(p.x() for p in P) - mx)) + 1, int(math.ceil(max(p.y() for p in P) - my)) + 1
        while _IMG and _IMGPX[0] + W_ * H_ > 40e6:
            old = _IMG.pop(next(iter(_IMG))); _IMGPX[0] -= old[0].width() * old[0].height()
        sf = skia.Surface(max(W_, 1), max(H_, 1)); cv = sf.getCanvas(); cv.translate(-mx, -my); cv.concat(L)
        _VEC[0] += 1
        try: fn(cv)
        finally: _VEC[0] -= 1
        hit = (sf.makeImageSnapshot(), mx, my); _IMGPX[0] += W_ * H_
    _IMG[k] = hit                                         # re-insert: most recently used last
    return hit

def _blit(c, key, fn, bounds, x=0., y=0., s=1., a=1., ang=0., sx=1.):
    """Static art fn(canvas) within bounds = (x, y, w, h) (local). A placement seen before (standing still on
    screen, any position / scale / rotation) is rasterised once with its exact scale and rotation baked in and
    blitted pixel-aligned (the fast path: one blend pass instead of replaying every overlapping shape); a moving,
    zooming, turning or flipped one replays the vector art (sub-pixel smooth). Rasters are LRU-bounded (~40 Mpx)."""
    if a <= 0: return
    c.save(); c.translate(x, y)
    if ang: c.rotate(ang)
    if s != 1 or sx != 1: c.scale(s * sx, s)
    M = c.getTotalMatrix(); ma, mb, mc, md = M.getScaleX(), M.getSkewY(), M.getSkewX(), M.getScaleY()
    if abs(ma - md) < 1e-4 and abs(mb + mc) < 1e-4 and abs(M.getPerspX()) + abs(M.getPerspY()) < 1e-9 and ma * md - mb * mc > 1e-6:
        q = (round(ma, 4), round(mb, 4)); tx, ty = M.getTranslateX(), M.getTranslateY()
        sk = (key, q, round(tx, 2), round(ty, 2))
        if sk in _SEEN:
            img, mx, my = _raster(key, q, fn, bounds)
            p = skia.Paint()
            if a < .999: p.setAlphaf(clamp(a))
            c.resetMatrix(); c.drawImage(img, round(tx + mx), round(ty + my), skia.SamplingOptions(), p)
            c.restore(); return
        if len(_SEEN) > 60000: _SEEN.clear()
        _SEEN[sk] = 1
    bx, by, bw, bh = bounds
    if a < .999:
        p = skia.Paint(); p.setAlphaf(clamp(a)); c.saveLayer(skia.Rect.MakeXYWH(bx, by, bw, bh), p); fn(c); c.restore()
    else: fn(c)
    c.restore()

_TFI = {}
def _itf(fam, w):
    k = (fam, w)
    if k not in _TFI: _TFI[k] = skia.Typeface(fam, skia.FontStyle(w, 5, skia.FontStyle.kItalic_Slant))
    return _TFI[k]

def _iruns(s, size, fam, w):
    tf = _itf(fam, w); f = skia.Font(tf, size); f.setEdging(skia.Font.Edging.kAntiAlias); f.setSubpixel(True)
    if s.isascii(): return [(s, f)]
    out = []
    for ch, g in zip(s, tf.unicharsToGlyphs([ord(ch) for ch in s])):
        ff = f
        if g == 0 and not ch.isspace():
            if ch not in _FBX:
                _FBX[ch] = skia.FontMgr.RefDefault().matchFamilyStyleCharacter(fam, tf.fontStyle(), ['en'], ord(ch))
            if _FBX[ch] is not None: ff = skia.Font(_FBX[ch], size); ff.setEdging(skia.Font.Edging.kAntiAlias)
        if out and out[-1][1] is ff: out[-1][0] += ch
        else: out.append([ch, ff])
    return out

def itext_w(s, size, w=500, fam='Avenir Next'):
    return sum(f.measureText(r) for r, f in _iruns(s, size, fam, w))

def itext(c, s, x, y, size, col=WHITE, a=1., align='l', w=500, fam='Avenir Next'):
    """Italic text (Avenir Next italic by default, or fam=SERIF for Georgia italic). Returns the width."""
    if a <= 0.004 or not s: return 0
    tw = itext_w(s, size, w, fam); xx = x - tw * {'l': 0, 'c': .5, 'r': 1}[align]; p = paint(col, a)
    for r, ff in _iruns(s, size, fam, w): c.drawString(r, xx, y, ff, p); xx += ff.measureText(r)
    return tw

def wrap(s, size, maxw, w=700, fam=None):
    """Greedy word wrap of s ('\\n' forces a break) to lines no wider than maxw (eng.text font, or ftext family)."""
    def build():
        meas = (lambda q: text_w(q, size, w)) if fam is None else (lambda q: ftext_w(q, size, fam, w))
        out = []
        for para in s.split('\n'):
            cur = ''
            for wd in para.split():
                q = (cur + ' ' + wd) if cur else wd
                if cur and meas(q) > maxw: out.append(cur); cur = wd
                else: cur = q
            out.append(cur)
        return out
    return _cache(('wrap', s, size, maxw, w, fam), build)

def _fit(s, size, w, avail, mn=22.):
    """(text, size, width) shrunk to fit avail px (down to mn px), then ellipsised if it still does not fit."""
    tw = text_w(s, size, w)
    if tw <= avail or tw <= 0: return s, size, tw
    size = max(mn, size * avail / tw * .985); tw = text_w(s, size, w)
    while tw > avail and len(s) > 4:
        s = s[:-2].rstrip() + '…'; tw = text_w(s, size, w)
    return s, size, tw

# ------------------------------------------------------------------ copied icons and glyphs (parking film)
def padlock(c, x, y, s=1., col=GOLD, a=1., open_=0.):
    """A padlock centred at (x, y) (same geometry as the chess film's lock); open_ 0..1 lifts and swings the shackle."""
    if a <= 0: return
    w, h = 34 * s, 28 * s; op = clamp(open_); lift = 10 * s * op
    with _fade(c, a, (x - 40 * s, y - 50 * s, x + 50 * s, y + 40 * s)):
        c.save(); c.translate(x - w * .32, y - h * .1); c.rotate(-24 * ease(op)); c.translate(-(x - w * .32), -(y - h * .1))
        sp = paint(shade(col, -.15), stroke=5 * s)
        p = skia.Path(); p.addArc(skia.Rect.MakeXYWH(x - w * .32, y - h * .95 - lift, w * .64, h * .9), 180, 180)
        c.drawPath(p, sp)
        c.drawLine(x - w * .32, y - h * .5 - lift, x - w * .32, y - h * .1, sp)
        c.drawLine(x + w * .32, y - h * .5 - lift, x + w * .32, y - h * .1 - lift * .9 - (h * .25 if op > .5 else 0), sp)
        c.restore()
        c.drawRRect(rrect(x - w / 2 + 1, y - h * .15 + 3 * s, w, h, 5 * s), paint(BLACK, .4, blur=4 * s))
        c.drawRRect(rrect(x - w / 2, y - h * .15, w, h, 5 * s), paint(shader=lgrad((x, y - h * .15), (x, y + h * .85), [shade(col, .15), shade(col, -.2)])))
        c.drawCircle(x, y + h * .26, 3.6 * s, paint('#0b1020'))
        kp = skia.Path(); kp.moveTo(x - 1.6 * s, y + h * .3); kp.lineTo(x + 1.6 * s, y + h * .3)
        kp.lineTo(x + 2.4 * s, y + h * .56); kp.lineTo(x - 2.4 * s, y + h * .56); kp.close()
        c.drawPath(kp, paint('#0b1020'))

def _gear_path(teeth, r):
    def build():
        ro, ri, P = r, r * .8, 2 * math.pi / teeth; pts = []
        for i in range(teeth):
            a0 = i * P
            for da, rr in ((-.24, ri), (-.13, ro), (.13, ro), (.24, ri)):
                pts.append((rr * math.cos(a0 + da * P), rr * math.sin(a0 + da * P)))
        p = poly(np.array(pts)); p.addCircle(0, 0, r * .3); p.setFillType(skia.PathFillType.kEvenOdd)
        return p
    return _cache(('gear', teeth, round(r, 1)), build)

def gear(c, x, y, r, t=0., col=ACC, a=1., teeth=None, speed=40.):
    """A cog of outer radius r centred at (x, y), turning speed deg/s with time t (threads / engines)."""
    if a <= 0: return
    n = teeth or max(8, int(r / 5.5)); P = _gear_path(n, r)
    c.save(); c.translate(x, y); c.rotate(t * speed)
    c.save(); c.translate(2, 5); c.drawPath(P, paint(BLACK, .4 * a, blur=6)); c.restore()
    c.drawPath(P, _cpaint(col, .92 * a, r * .03))
    c.drawCircle(0, 0, r * .6, paint(shade(col, -.35), .8 * a, stroke=r * .07))
    c.drawCircle(0, 0, r * .3, paint(shade(col, .35), .9 * a, stroke=r * .05))
    c.restore()

def clock_face(c, x, y, r, hh=10, mm=5, a=1., col=ACC):
    """Analog clock of radius r centred at (x, y) showing hh:mm (floats fine)."""
    if a <= 0: return
    c.drawCircle(x + 2, y + 6, r, paint(BLACK, .45 * a, blur=10))
    c.drawCircle(x, y, r, paint(shader=rgrad(x, y - r * .3, r * 1.2, ['#1a2544', '#0b1226']), a=a))
    c.drawCircle(x, y, r, paint(col, .9 * a, stroke=r * .07))
    for i in range(60):
        ang = math.radians(i * 6); big = i % 5 == 0; r0 = r * (.78 if big else .86)
        c.drawLine(x + math.cos(ang) * r0, y + math.sin(ang) * r0, x + math.cos(ang) * r * .9, y + math.sin(ang) * r * .9,
                   paint(WHITE if big else DIM, (.9 if big else .35) * a, stroke=r * (.035 if big else .014)))
    ha = math.radians((hh % 12 + mm / 60) * 30 - 90); ma = math.radians(mm * 6 - 90)
    c.drawLine(x, y, x + math.cos(ha) * r * .48, y + math.sin(ha) * r * .48, paint(WHITE, a, stroke=r * .075))
    c.drawLine(x, y, x + math.cos(ma) * r * .72, y + math.sin(ma) * r * .72, paint(WHITE, a, stroke=r * .045))
    c.drawCircle(x, y, r * .075, paint(col, a))

def phone(c, x, y, s=1., a=1., screen_fn=None):
    """A phone centred at (x, y), 130 x 260 at s=1; screen_fn(c, (sx, sy, sw, sh)) draws on the (clipped) screen.
    Returns the screen rect."""
    pw, ph = 130 * s, 260 * s; x0, y0 = x - pw / 2, y - ph / 2
    sr = (x0 + 9 * s, y0 + 9 * s, pw - 18 * s, ph - 18 * s)
    if a <= 0: return sr
    with _fade(c, a, (x0 - 30, y0 - 30, x0 + pw + 30, y0 + ph + 40)):
        c.drawRRect(rrect(x0 + 3, y0 + 10, pw, ph, 24 * s), paint(BLACK, .5, blur=16))
        c.drawRect(skia.Rect.MakeXYWH(x0 + pw - 1, y0 + 60 * s, 4 * s, 34 * s), paint('#5b6782'))
        c.drawRRect(rrect(x0, y0, pw, ph, 24 * s), paint('#0a0f1c'))
        c.drawRRect(rrect(x0, y0, pw, ph, 24 * s), paint('#8b9ab8', stroke=3 * s))
        scr = rrect(*sr, 16 * s)
        c.drawRRect(scr, paint(shader=lgrad((0, sr[1]), (0, sr[1] + sr[3]), ['#15213d', '#0c1426'])))
        if screen_fn:
            c.save(); c.clipRRect(scr, True); screen_fn(c, sr); c.restore()
        c.drawRRect(rrect(x - 22 * s, y0 + 15 * s, 44 * s, 11 * s, 5.5 * s), paint('#05070d'))
        c.drawRRect(rrect(x - 24 * s, y0 + ph - 19 * s, 48 * s, 4 * s, 2 * s), paint(WHITE, .5))
    return sr

_QR = {}
def _qr_path(seed):
    if seed not in _QR:
        N = 21; p = skia.Path()
        def fin(r, cc):
            for i in range(7):
                for j in range(7):
                    if i in (0, 6) or j in (0, 6) or (2 <= i <= 4 and 2 <= j <= 4): p.addRect(skia.Rect.MakeXYWH(cc + j, r + i, 1.02, 1.02))
        fin(0, 0); fin(0, 14); fin(14, 0)
        for i in range(N):
            for j in range(N):
                if (i < 8 and j < 8) or (i < 8 and j > 12) or (i > 12 and j < 8): continue
                on = (i % 2 == 0) if j == 6 else (j % 2 == 0) if i == 6 else hsh(i * N + j, seed) > .52
                if on: p.addRect(skia.Rect.MakeXYWH(j, i, 1.02, 1.02))
        _QR[seed] = p
    return _QR[seed]

def qr(c, x, y, size, a=1., seed=7, fg='#0b1020', bg=WHITE):
    """A QR-looking square of side `size` centred at (x, y) (deterministic per seed; one cached path)."""
    if a <= 0: return
    q = size / 21.
    c.drawRRect(rrect(x - size / 2 - 2 * q, y - size / 2 - 2 * q, size + 4 * q, size + 4 * q, 2.5 * q), paint(bg, a))
    c.save(); c.translate(x - size / 2, y - size / 2); c.scale(q, q); c.drawPath(_qr_path(seed), paint(fg, a)); c.restore()

def pay_icon(c, kind, x, y, s=1., a=1.):
    """Payment method icon, ~80 px at s=1, centred: 'cash' (note + coin) 'card' (chip) 'upi' (phone + QR) 'wallet'."""
    if a <= 0: return
    with _fade(c, a, (x - 60 * s, y - 60 * s, x + 60 * s, y + 60 * s)):
        c.save(); c.translate(x, y); c.scale(s, s)
        if kind == 'cash':
            c.save(); c.rotate(-8)
            c.drawRRect(rrect(-38, -21, 76, 44, 6), paint(BLACK, .45, blur=5))
            c.drawRRect(rrect(-40, -26, 76, 44, 6), paint(shade(GREEN, -.12)))
            c.drawRRect(rrect(-40, -26, 76, 44, 6), paint(shade(GREEN, -.5), stroke=2))
            c.drawRRect(rrect(-35, -21, 66, 34, 4), paint(shade(GREEN, -.42), stroke=1.2))
            c.drawCircle(-2, -4, 11, paint(shade(GREEN, -.42), stroke=1.6))
            text(c, '₹', -2, 2, 16, 800, shade(GREEN, -.62), 1, 'c')
            c.restore()
            c.drawCircle(25, 19, 16, paint(BLACK, .4, blur=4))
            c.drawCircle(24, 16, 15, paint(shader=rgrad(20, 11, 18, [shade(GOLD, .35), GOLD, shade(GOLD, -.2)])))
            c.drawCircle(24, 16, 15, paint(shade(GOLD, -.42), stroke=2))
            c.drawCircle(24, 16, 10, paint(shade(GOLD, -.32), stroke=1.2))
            text(c, '₹', 24, 21, 13, 800, shade(GOLD, -.58), 1, 'c')
        elif kind == 'card':
            c.rotate(-6)
            c.drawRRect(rrect(-38, -21, 80, 52, 7), paint(BLACK, .45, blur=6))
            c.drawRRect(rrect(-40, -26, 80, 52, 7), paint(shader=lgrad((-40, -26), (40, 26), [shade(BLUE, .1), shade(BLUE, -.45)])))
            c.drawRRect(rrect(-40, -26, 80, 52, 7), paint(WHITE, .25, stroke=1.4))
            c.drawRRect(rrect(-30, -14, 17, 13, 3), paint(GOLD))
            cp = paint(shade(GOLD, -.4), stroke=1, cap=False)
            c.drawLine(-30, -7.5, -13, -7.5, cp); c.drawLine(-21.5, -14, -21.5, -1, cp)
            for k in range(3):
                r = 4 + k * 3.6; p = skia.Path(); p.addArc(skia.Rect.MakeXYWH(-6 - r, -7.5 - r, 2 * r, 2 * r), -40, 80)
                c.drawPath(p, paint(WHITE, .7, stroke=1.5))
            dp = paint(WHITE, .75)
            for g in range(4):
                for d in range(4): c.drawCircle(-31 + g * 15 + d * 3.2, 9, 1.2, dp)
            c.drawCircle(22, 16, 6.5, paint(RED, .95)); c.drawCircle(30, 16, 6.5, paint(GOLD, .85))
        elif kind == 'upi':
            c.drawRRect(rrect(-22, -36, 48, 80, 9), paint(BLACK, .45, blur=6))
            c.drawRRect(rrect(-24, -40, 48, 80, 9), paint('#0b1222'))
            c.drawRRect(rrect(-24, -40, 48, 80, 9), paint('#9aa7c0', stroke=2))
            c.drawRRect(rrect(-19, -32, 38, 62, 4), paint(WHITE))
            c.drawLine(-5, -36, 5, -36, paint('#9aa7c0', stroke=2))
            qr(c, 0, -9, 28, 1, seed=11)
            text(c, 'UPI', 0, 24, 11, 800, '#1f2937', 1, 'c', track=1)
        else:                                                                     # wallet
            c.drawRRect(rrect(-28, -36, 46, 22, 4), paint(BLUE))
            c.drawRRect(rrect(-36, -21, 76, 52, 9), paint(BLACK, .45, blur=6))
            c.drawRRect(rrect(-38, -26, 76, 52, 9), paint(shader=lgrad((0, -26), (0, 26), [shade(ORANGE, -.28), shade(ORANGE, -.55)])))
            sp = paint('#f3d3a8', .55, stroke=1.2, cap=False); sp.setPathEffect(skia.DashPathEffect.Make([4, 3], 0))
            c.drawRRect(rrect(-33, -21, 66, 42, 6), sp)
            c.drawRRect(rrect(6, -12, 36, 24, 8), paint(shade(ORANGE, -.42)))
            c.drawRRect(rrect(6, -12, 36, 24, 8), paint(shade(ORANGE, -.65), stroke=1.4))
            c.drawCircle(32, 0, 4.5, paint(GOLD))
        c.restore()

def rupee(n):
    """'₹120', '₹1,20,000' (Indian grouping), '₹45.50' for non-integers."""
    neg = n < 0; n = abs(n); ip = int(round(n)) if abs(n - round(n)) < 1e-9 else int(n)
    s = str(ip)
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]; grp = []
        while len(head) > 2: grp.insert(0, head[-2:]); head = head[:-2]
        s = ','.join(([head] if head else []) + grp + [tail])
    if abs(n - round(n)) >= 1e-9: s += ('%.2f' % (n - ip))[1:]
    return ('-' if neg else '') + '₹' + s

def price_tag(c, x, y, s, col=GOLD, a=1., size=26, ang=0.):
    """A solid price tag centred at (x, y) with text s (e.g. rupee(120)), hole + string on the pointed left end."""
    if a <= 0: return
    tw = text_w(s, size, 800); hh = size * 1.75; pt = hh * .42; bw = tw + size * 1.1 + pt
    xl = -bw / 2; xr = bw / 2
    with _fade(c, a, (x - bw, y - bw, x + bw, y + bw)):
        c.save(); c.translate(x, y); c.rotate(ang)
        P = poly(np.array([(xl + pt, -hh / 2), (xr, -hh / 2), (xr, hh / 2), (xl + pt, hh / 2), (xl, 0)]))
        sp = skia.Path(); sp.moveTo(xl + pt * .62, 0); sp.cubicTo(xl - 6, -hh * .2, xl - 14, -hh * .9, xl - 30, -hh * .85)
        c.drawPath(sp, paint(DIM, .7, stroke=2))
        c.save(); c.translate(2, 5); c.drawPath(P, _cpaint(BLACK, .45, 6)); c.restore()
        c.drawPath(P, _cpaint(col, 1, 6))
        hp = paint(shade(col, -.45), stroke=1.6); hp.setPathEffect(skia.CornerPathEffect.Make(6)); c.drawPath(P, hp)
        c.drawCircle(xl + pt * .62, 0, hh * .1, paint('#0b1020'))
        text(c, s, (xl + pt + xr) / 2 + 2, size * .36, size, 800, '#111827', 1, 'c')
        c.restore()

# ------------------------------------------------------------------ design-scene widgets (verbatim from the chess film)
def obox(c, x, y, w, title, lines=(), a=1., col=ACC, kind=None, h=None, hl_line=None, title_size=26, size=21):
    """A small object / class box with a title bar. kind: 'interface' | 'abstract' | 'record' | free text (shown
    as «kind»). Returns (x, y, w, h). hl_line: index of a line to tint gold."""
    lh = size * 1.45; kh = size * 1.15 if kind else 0; hh = title_size * 1.9 + kh
    h = h or hh + lh * len(lines) + (14 if lines else 6)
    if a <= 0: return x, y, w, h
    c.drawRRect(rrect(x, y + 8, w, h, 12), paint(BLACK, .45 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, 12), paint(shader=lgrad((x, y), (x, y + h), [shade(col, -.72), '#0b1020']), a=a))
    c.drawRRect(rrect(x, y, w, h, 12), paint(col, .85 * a, stroke=2))
    c.drawRRect(rrect(x, y, w, 5, 2.5), paint(col, a))
    ty = y + title_size * 1.25
    if kind:                                                   # «kind» on its own line above the title
        text(c, f'«{kind}»', x + w / 2, y + 14 + size * .8, size * .8, 600, DIM, a * .9, 'c'); ty += kh
    text(c, title, x + w / 2, ty, title_size, 800, WHITE, a, 'c')
    if lines:
        c.drawLine(x + 10, y + hh, x + w - 10, y + hh, paint(col, .35 * a, stroke=1.4))
        for i, ln in enumerate(lines):
            yy = y + hh + 10 + lh * (i + .72)
            if hl_line == i: c.drawRRect(rrect(x + 6, yy - lh * .72, w - 12, lh, 6), paint(GOLD, .18 * a))
            text(c, ln, x + 18, yy, size, 600, GOLD if hl_line == i else DIM, a)
    return x, y, w, h

def chip(c, x, y, s, col=ACC, a=1., size=26, align='c', fill=.16):
    """Rounded label chip centred (align='c') or left-anchored at (x, y)."""
    if a <= 0: return 0
    tw = text_w(s, size, 700); w = tw + size * 1.3; h = size * 1.7
    x0 = x - w / 2 if align == 'c' else x
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, .9 * a, stroke=2))
    text(c, s, x0 + w / 2, y + size * .36, size, 700, WHITE, a, 'c')
    return w

def lane(c, x, y, w, h, title, col=ACC, a=1.):
    """A labelled swim-lane (for threads / timelines)."""
    if a <= 0: return
    c.drawRRect(rrect(x, y, w, h, 14), paint(col, .07 * a))
    c.drawRRect(rrect(x, y, w, h, 14), paint(col, .5 * a, stroke=1.6))
    text(c, title, x + 22, y + 36, 24, 800, col, a)

def link(c, p0, p1, col=ACC, a=1., u=1., dashed=False, w=3., head=14.):
    """A straight connector p0 -> p1 drawn to fraction u, with an arrow head when complete enough."""
    if a <= 0 or u <= 0: return
    (x0, y0), (x1, y1) = p0, p1; ex, ey = x0 + (x1 - x0) * clamp(u), y0 + (y1 - y0) * clamp(u)
    p = paint(col, a, stroke=w)
    if dashed: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawLine(x0, y0, ex, ey, p)
    if u > .9 and head:
        arrow(c, ex - (x1 - x0) * .001, ey - (y1 - y0) * .001, ex, ey, col, w, a, head)

# ------------------------------------------------------------------ line icons (tiles, drawers, bill badges)
def _ic_draw(cv, name, col, w):
    """One line icon in a 64 x 64 box centred at (0, 0), stroke width w (cached as a picture by icon())."""
    st = paint(col, 1, stroke=w); fl = paint(col, 1); thin = paint(col, .75, stroke=w * .6)
    R = skia.Rect.MakeXYWH
    def rr(x, y, ww, hh, r=5, p=st): cv.drawRRect(rrect(x, y, ww, hh, r), p)
    def ln(*pts, p=st):
        pa = skia.Path(); pa.moveTo(*pts[0])
        for q in pts[1:]: pa.lineTo(*q)
        cv.drawPath(pa, p)
    def arc(cx, cy, r, a0, sw, p=st):
        pa = skia.Path(); pa.addArc(R(cx - r, cy - r, 2 * r, 2 * r), a0, sw); cv.drawPath(pa, p)
    def rup(x, y, s=22): text(cv, '₹', x, y + s * .36, s, 800, col, 1, 'c')
    n = name
    if n == 'cash':
        rr(-28, -17, 56, 34, 4); cv.drawCircle(0, 0, 9, st); ln((-21, -10), (-21, 10), p=thin); ln((21, -10), (21, 10), p=thin)
    elif n == 'card':
        rr(-28, -19, 56, 38, 6); cv.drawRect(R(-28, -10, 56, 7), fl); rr(-21, 6, 14, 7, 2, thin)
    elif n == 'upi':
        rr(-15, -27, 30, 54, 7); ln((-6, -20), (6, -20), p=thin); ln((-6, -4), (5, 4), (-6, 12))
    elif n == 'cheque':
        rr(-29, -15, 58, 30, 3); ln((-21, -5), (6, -5), p=thin); ln((-21, 4), (-2, 4), p=thin)
        ln((8, 7), (12, 1), (16, 8), (21, 2), p=thin)
    elif n == 'bank':
        ln((-27, -9), (0, -25), (27, -9), (-27, -9)); ln((-27, 23), (27, 23))
        for xx in (-18, -6, 6, 18): ln((xx, -3), (xx, 17))
    elif n == 'draft':
        ln((-17, -26), (8, -26), (19, -15), (19, 26), (-17, 26), (-17, -26)); ln((8, -26), (8, -15), (19, -15), p=thin); rup(1, 5, 22)
    elif n == 'transfer':
        ln((-24, -8), (22, -8)); ln((12, -17), (22, -8), (12, 1)); ln((24, 9), (-22, 9)); ln((-12, 0), (-22, 9), (-12, 18))
    elif n == 'doc':
        ln((-17, -26), (8, -26), (19, -15), (19, 26), (-17, 26), (-17, -26)); ln((8, -26), (8, -15), (19, -15), p=thin)
        for yy in (-5, 4, 13): ln((-9, yy), (11, yy), p=thin)
    elif n == 'salary':
        ln((-17, -26), (8, -26), (19, -15), (19, 26), (-17, 26), (-17, -26)); ln((8, -26), (8, -15), (19, -15), p=thin)
        rup(1, -1, 20); ln((-9, 14), (11, 14), p=thin)
    elif n == 'house':
        ln((-26, -2), (0, -24), (26, -2)); ln((-19, -8), (-19, 24), (19, 24), (19, -8)); rr(-6, 8, 12, 16, 2, thin)
    elif n == 'shop':
        ln((-25, -12), (-21, -24), (21, -24), (25, -12)); ln((-25, -12), (25, -12))
        for k in range(4):
            arc(-18.75 + k * 12.5, -12, 6.25, 0, 180)
        ln((-21, -5), (-21, 24), (21, 24), (21, -5)); rr(-4, 8, 11, 16, 2, thin); rr(-16, 3, 9, 9, 2, thin)
    elif n == 'chart':
        ln((-24, -24), (-24, 22), (26, 22)); ln((-16, 12), (-4, 0), (6, 8), (22, -14)); ln((12, -15), (22, -14), (21, -4))
    elif n == 'coins':
        for k in range(3):
            yy = 14 - k * 11; cv.drawOval(R(-20, yy - 7, 40, 14), paint(col, .25)); cv.drawOval(R(-20, yy - 7, 40, 14), st)
        cv.drawCircle(17, -20, 9, st); text(cv, '₹', 17, -16, 13, 800, col, 1, 'c')
    elif n == 'percent':
        cv.drawCircle(0, 0, 25, st); cv.drawCircle(-8, -8, 5, st); cv.drawCircle(8, 8, 5, st); ln((11, -12), (-11, 12))
    elif n == 'snow':
        for k in range(3):
            an = math.radians(90 + k * 60); dx, dy = math.cos(an) * 25, math.sin(an) * 25
            ln((-dx, -dy), (dx, dy))
            for sg in (-1, 1):
                ex, ey = sg * dx * .62, sg * dy * .62; px, py = -dy * .22, dx * .22
                ln((ex + sg * dx * .2 + px, ey + sg * dy * .2 + py), (ex, ey), (ex + sg * dx * .2 - px, ey + sg * dy * .2 - py), p=thin)
    elif n == 'warehouse':
        ln((-27, -4), (0, -22), (27, -4)); ln((-23, -7), (-23, 24), (23, 24), (23, -7))
        rr(-12, 2, 24, 22, 1, thin)
        for yy in (8, 14, 20): ln((-12, yy), (12, yy), p=thin)
    elif n == 'hospital':
        rr(-22, -22, 44, 46, 4); cv.drawRect(R(-4, -15, 8, 22), fl); cv.drawRect(R(-11, -8, 22, 8), fl)
        rr(-6, 12, 12, 12, 1, thin)
    elif n == 'bed':
        ln((-26, -16), (-26, 20)); ln((-26, 10), (26, 10), (26, 20)); rr(-22, -4, 14, 9, 4, thin); rr(-6, -4, 30, 14, 4)
    elif n == 'pipe':
        rr(-28, -8, 22, 16, 3); rr(6, -8, 22, 16, 3); rr(-8, -11, 16, 22, 3, thin); ln((-28, 16), (28, 16), p=thin)
    elif n == 'factory':
        ln((-26, 24), (-26, -4), (-12, -14), (-12, -4), (2, -14), (2, -4), (16, -14), (16, 24), (-26, 24))
        rr(18, -26, 8, 50, 2)
        for xx in (-19, -7, 5): cv.drawRect(R(xx, 6, 6, 6), fl)
    elif n == 'chip':
        rr(-16, -16, 32, 32, 4); rr(-8, -8, 16, 16, 2, thin)
        for k in (-9, 0, 9):
            ln((k, -16), (k, -25), p=thin); ln((k, 16), (k, 25), p=thin); ln((-16, k), (-25, k), p=thin); ln((16, k), (25, k), p=thin)
    elif n == 'road':
        ln((-8, -24), (-26, 24)); ln((8, -24), (26, 24))
        for k in range(3): ln((0, -18 + k * 15), (0, -11 + k * 15), p=thin)
    elif n == 'train':
        rr(-18, -24, 36, 40, 8); rr(-12, -17, 24, 13, 3, thin); cv.drawCircle(-9, 6, 3, fl); cv.drawCircle(9, 6, 3, fl)
        ln((-12, 16), (-19, 26)); ln((12, 16), (19, 26))
    elif n == 'calendar':
        rr(-24, -20, 48, 44, 5); cv.drawRect(R(-24, -20, 48, 11), fl); ln((-13, -26), (-13, -16)); ln((13, -26), (13, -16))
        for i in range(3):
            for j in range(2): cv.drawRect(R(-15 + i * 11, 0 + j * 10, 6, 5), fl)
    elif n == 'gift':
        rr(-22, -6, 44, 30, 3); rr(-25, -14, 50, 9, 2); ln((0, -14), (0, 24))
        arc(-7, -19, 6, 200, 250, thin); arc(7, -19, 6, -90, 250, thin)
    elif n == 'shield':
        ln((0, -26), (22, -18), (20, 6), (0, 26), (-20, 6), (-22, -18), (0, -26)); ln((-9, 0), (-2, 8), (11, -8))
    elif n == 'heart':
        pa = skia.Path(); pa.moveTo(0, 22); pa.cubicTo(-30, 2, -24, -26, 0, -12); pa.cubicTo(24, -26, 30, 2, 0, 22); cv.drawPath(pa, st)
        ln((-18, -2), (-7, -2), (-3, -10), (3, 6), (7, -2), (18, -2), p=thin)
    elif n == 'scale':
        ln((0, -24), (0, 22)); ln((-14, 22), (14, 22)); ln((-22, -16), (22, -16))
        for sx in (-1, 1):
            ln((sx * 22, -16), (sx * 30, 2), (sx * 14, 2), (sx * 22, -16), p=thin); arc(sx * 22, 2, 8, 0, 180, thin)
    elif n == 'flask':
        ln((-6, -25), (-6, -8), (-21, 20), (21, 20), (6, -8), (6, -25)); ln((-10, -25), (10, -25)); ln((-14, 8), (14, 8), p=thin)
    elif n == 'truck':
        rr(-28, -14, 34, 26, 2); ln((6, -6), (18, -6), (26, 4), (26, 12), (6, 12)); cv.drawCircle(-16, 16, 6, st); cv.drawCircle(16, 16, 6, st)
    elif n == 'tooth':
        pa = skia.Path(); pa.moveTo(-14, -22); pa.cubicTo(-30, -22, -24, 0, -16, 6); pa.lineTo(-12, 24); pa.lineTo(-4, 4)
        pa.lineTo(4, 4); pa.lineTo(12, 24); pa.lineTo(16, 6); pa.cubicTo(24, 0, 30, -22, 14, -22); pa.cubicTo(6, -22, 4, -18, 0, -18)
        pa.cubicTo(-4, -18, -6, -22, -14, -22); cv.drawPath(pa, st)
    elif n == 'compass':
        cv.drawCircle(0, -20, 4, st); ln((-2, -16), (-16, 24)); ln((2, -16), (16, 24)); arc(0, -6, 22, 40, 100, thin)
    elif n == 'calc':
        rr(-18, -25, 36, 50, 5); rr(-12, -19, 24, 11, 2, thin)
        for i in range(3):
            for j in range(3): cv.drawRect(R(-12 + i * 9, -3 + j * 8, 6, 5), fl)
    elif n == 'leaf':
        pa = skia.Path(); pa.moveTo(-20, 22); pa.cubicTo(-24, -10, 0, -26, 24, -24); pa.cubicTo(24, 2, 6, 24, -20, 22); cv.drawPath(pa, st)
        ln((-20, 22), (12, -10), p=thin)
    elif n == 'wheat':
        ln((0, 27), (0, -14))
        for k in range(4):
            yy = -12 + k * 9
            for sx in (-1, 1):
                cv.save(); cv.translate(sx * 6, yy); cv.rotate(sx * 38); cv.drawOval(R(-4, -8, 8, 16), st); cv.restore()
        cv.drawOval(R(-4, -27, 8, 15), st)
    elif n == 'person':
        cv.drawCircle(0, -12, 10, st); arc(0, 22, 20, 180, 180)
    elif n == 'clock':
        cv.drawCircle(0, 0, 24, st); ln((0, -14), (0, 0), (10, 6))
    elif n == 'flame':
        pa = skia.Path(); pa.moveTo(0, 24); pa.cubicTo(-22, 22, -22, -2, -8, -12); pa.cubicTo(-6, -2, 0, 0, 2, -6)
        pa.cubicTo(4, -16, 0, -22, 4, -26); pa.cubicTo(20, -14, 24, 22, 0, 24); cv.drawPath(pa, st)
    elif n == 'lock':
        rr(-17, -4, 34, 26, 5); arc(0, -6, 11, 180, 180); ln((-11, -6), (-11, -4)); ln((11, -6), (11, -4)); cv.drawCircle(0, 8, 3, fl)
    elif n == 'tax':
        ln((-17, -26), (8, -26), (19, -15), (19, 26), (-17, 26), (-17, -26)); ln((8, -26), (8, -15), (19, -15), p=thin)
        cv.drawCircle(-5, -2, 4, thin); cv.drawCircle(7, 12, 4, thin); ln((9, -5), (-7, 15), p=thin)
    elif n == 'piggy':
        cv.drawOval(R(-25, -15, 46, 34), st); rr(19, -4, 9, 11, 3, st); ln((2, -14), (8, -24), (12, -13), p=thin)
        ln((-14, 18), (-14, 25)); ln((8, 18), (8, 25)); ln((-6, -9), (6, -9), p=thin); cv.drawCircle(11, -4, 2.2, fl)
        arc(-29, 0, 5, 300, 200, thin)
    elif n == 'star':
        pts = [(math.cos(math.radians(-90 + k * 36)) * (25 if k % 2 == 0 else 11), math.sin(math.radians(-90 + k * 36)) * (25 if k % 2 == 0 else 11) + 2) for k in range(10)]
        ln(*(pts + [pts[0]]))
    elif n == 'building':
        rr(-18, -26, 36, 52, 2)
        for i in range(2):
            for j in range(3): cv.drawRect(R(-11 + i * 15, -19 + j * 12, 7, 7), fl)
        rr(-5, 14, 10, 12, 1, thin)
    elif n == 'mortar':
        ln((-24, -6), (24, -6)); pa = skia.Path(); pa.moveTo(-20, -6); pa.cubicTo(-20, 22, 20, 22, 20, -6); cv.drawPath(pa, st)
        ln((4, -8), (20, -26)); ln((-12, 22), (12, 22))
    elif n == 'box':
        ln((-24, -10), (0, -22), (24, -10), (24, 16), (0, 26), (-24, 16), (-24, -10)); ln((-24, -10), (0, 2), (24, -10)); ln((0, 2), (0, 26))
    elif n == 'sack':
        pa = skia.Path(); pa.moveTo(-8, -14); pa.cubicTo(-26, -4, -26, 26, -16, 26); pa.lineTo(16, 26)
        pa.cubicTo(26, 26, 26, -4, 8, -14); pa.close(); cv.drawPath(pa, st)
        ln((-8, -14), (-14, -26)); ln((8, -14), (14, -26)); rr(-10, -18, 20, 6, 3, fl); ln((-8, 8), (8, 8), p=thin)
    elif n == 'gear':
        P = _gear_path(9, 25); cv.drawPath(P, st)
    elif n == 'info':
        cv.drawCircle(0, 0, 24, st); cv.drawCircle(0, -11, 3, fl); ln((0, -2), (0, 13))
    else:                                                     # unknown: a neutral dot
        cv.drawCircle(0, 0, 20, st)

ICONS = ('cash card upi cheque bank draft transfer doc salary house shop chart coins percent snow warehouse hospital bed '
         'pipe factory chip road train calendar gift shield heart scale flask truck tooth compass calc leaf wheat person '
         'clock flame lock tax piggy star building mortar box sack gear info').split()

def icon(c, name, x, y, s=1., col=DIM, a=1., w=3.2):
    """A line icon from ICONS, 64 px at s=1, centred at (x, y) (cached per name / colour / stroke)."""
    if a <= 0: return
    _play(c, _pic(('icon', name, col, w), lambda cv: _ic_draw(cv, name, col, w), (-40, -40, 80, 80)), x, y, s, a)

# ------------------------------------------------------------------ money: inr, roll, notes, coin
def inr(n):
    """'₹12 lakh', '₹1.2 crore', '₹2.4 crore'; non-round amounts fall back to rupee(n) ('₹4,40,000')."""
    m = abs(n); neg = '−' if n < 0 else ''
    if m >= 1e7 and m % 1e5 == 0: return neg + '₹' + ('%.2f' % (m / 1e7)).rstrip('0').rstrip('.') + ' crore'
    if m >= 1e5 and m % 1e5 == 0: return neg + '₹' + '%d' % round(m / 1e5) + ' lakh'
    return rupee(n)

def _group(m):
    s = str(int(m))
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]; grp = []
        while len(head) > 2: grp.insert(0, head[-2:]); head = head[:-2]
        s = ','.join(([head] if head else []) + grp + [tail])
    return s

def roll(c, n, x, y, u, size=40, col=GOLD, a=1., align='r', fam=MONO, prefix='₹', signed=False, w=700, glow=0.,
         suffix=''):
    """An amount that rolls up from 0 to n as u goes 0 -> 1 (eased; odometer wheels, the high digits settle first,
    left to right). Indian grouping. The layout is the final string's (stable): align 'r' keeps the right edge fixed.
    signed=True prefixes '+ ' / '− '; negative n gets '−'. suffix (e.g. ' days') is appended. Returns the width."""
    m = abs(int(round(n))); neg = n < 0
    sign = ('− ' if neg else '+ ') if signed else ('−' if neg else '')
    pre = sign + prefix; fin = _group(m)
    pw = ftext_w(pre, size, fam, w) if pre else 0.; sw = ftext_w(suffix, size, fam, w) if suffix else 0.
    tw = pw + ftext_w(fin, size, fam, w) + sw
    if a <= 0.004: return tw
    x0 = x - tw * {'l': 0, 'c': .5, 'r': 1}[align]
    u = clamp(u)
    if u >= 1 or m == 0:
        ftext(c, pre + fin + suffix, x0, y, size, fam, col, a, 'l', w, glow); return tw
    if suffix: ftext(c, suffix, x0 + tw - sw, y, size, fam, col, a, 'l', w)
    f = _font(fam, size, w); cw = f.measureText('0'); kw = f.measureText(','); lh = size * 1.12
    v = m * (1 - (1 - u) ** 4)
    nd = len(str(m)); p = paint(col, a); xr = x0 + tw - sw
    r_prev = v; xc = xr; left = xr
    top, bot = y - size * .92, y + size * .26
    for k in range(nd):
        if k == 0: r = v
        else:
            lo = r_prev % 10.
            r = math.floor(v / 10 ** k) + max(0., lo - 9.)
        r_prev = r
        fl = math.floor(r); fr = r - fl
        lead = fl == 0 and k > 0
        if lead and fr <= 0: break
        xc -= cw
        if not lead or fr > 0:
            d = fl % 10; d1 = (d + 1) % 10
            c.save(); c.clipRect(skia.Rect(xc - 1, top, xc + cw + 1, bot), True)
            if fr < .02:
                if not lead: c.drawString(str(d), xc, y, f, p)
            else:
                if not lead: c.drawString(str(d), xc, y - fr * lh, f, p)
                c.drawString(str(d1), xc, y + (1 - fr) * lh, f, p)
            c.restore()
        left = xc + (cw * (1 - fr) if lead else 0.)
        if (k + 1 == 3 or (k + 1 > 3 and (k + 1 - 3) % 2 == 0)) and k + 1 < nd:
            nr = math.floor(v / 10 ** (k + 1)) + max(0., (r % 10.) - 9.)
            if nr <= 0: break
            ca = 1. if nr >= 1 else nr
            xc -= kw
            c.drawString(',', xc, y, f, paint(col, a * ca))
            left = xc + kw * (1 - ca)
    if pre: ftext(c, pre, left - pw, y, size, fam, col, a, 'l', w)
    return tw

def _note_pic(val, tint):
    def fn(cv):
        W_, H_ = 168, 76; x0, y0 = -W_ / 2, -H_ / 2
        base = {'g': ('#d3dccb', '#a9b8a1', '#5d6f57'), 'p': ('#e8d3e0', '#c9a6bd', '#7a4d6b'),
                'y': ('#ecdfae', '#cdbb7a', '#6f6130')}.get(tint, ('#d3dccb', '#a9b8a1', '#5d6f57'))
        cv.drawRRect(rrect(x0, y0, W_, H_, 5), paint(shader=lgrad((x0, 0), (x0 + W_, 0), [base[0], base[1]])))
        ink = base[2]
        cv.drawRRect(rrect(x0 + 5, y0 + 5, W_ - 10, H_ - 10, 3), paint(ink, .55, stroke=1.2))
        cv.drawOval(skia.Rect.MakeXYWH(x0 + 16, y0 + 12, 34, 46), paint(WHITE, .35))         # watermark window
        cv.drawOval(skia.Rect.MakeXYWH(x0 + 16, y0 + 12, 34, 46), paint(ink, .25, stroke=1))
        cv.drawRect(skia.Rect.MakeXYWH(x0 + 62, y0, 4, H_), paint(ink, .35))                  # security thread
        for k in range(5):
            cv.drawCircle(x0 + 120, y0 + 38, 8 + k * 4.2, paint(ink, .18, stroke=.9))           # guilloche medallion
        text(cv, '₹', x0 + 120, y0 + 47, 26, 800, ink, .9, 'c')
        text(cv, val, x0 + W_ - 12, y0 + 22, 15, 800, ink, .95, 'r')
        text(cv, val, x0 + 72, y0 + H_ - 11, 12, 800, ink, .8, 'l')
        for k in range(3): cv.drawLine(x0 + 72, y0 + 16 + k * 6, x0 + 98, y0 + 16 + k * 6, paint(ink, .3, stroke=1))
        cv.drawRRect(rrect(x0, y0, W_, H_, 5), paint(shade(base[1], -.35), .8, stroke=1.4))
    return _pic(('note', val, tint), fn, (-90, -45, 180, 90))

def notes(c, x, y, a=1., n=3, sc=1., ang=0., val='500', tint='g', spread=9.):
    """A small fan of n rupee notes (stone-green ₹500 look; tint 'g' | 'p' | 'y'), centred at (x, y), 168 x 76 per
    note at sc=1; ang rotates the whole fan; spread = degrees between notes."""
    if a <= 0 or n <= 0: return
    pic = _note_pic(val, tint); R = 120 * sc
    with _fade(c, a, (x - R * 1.4, y - R * 1.2, x + R * 1.4, y + R * 1.2)):
        c.save(); c.translate(x, y); c.rotate(ang); c.scale(sc, sc)
        c.drawRRect(rrect(-80, -30, 168, 76, 6), paint(BLACK, .4, blur=10))
        for i in range(n):
            q = i - (n - 1) / 2
            c.save(); c.translate(q * 7, 34); c.rotate(q * spread); c.translate(0, -34)
            c.drawRRect(rrect(-84, -36, 168, 76, 5), paint(BLACK, .18, blur=3))
            _play(c, pic); c.restore()
        c.restore()

def _coin_pic(r, col, label):
    def fn(cv):
        cv.drawCircle(0, 0, r, paint(shader=rgrad(-r * .35, -r * .4, r * 1.5, [shade(col, .45), col, shade(col, -.28)])))
        cv.drawCircle(0, 0, r - r * .05, paint(shade(col, -.45), .9, stroke=r * .1))
        cv.drawCircle(0, 0, r * .74, paint(shade(col, -.3), .8, stroke=max(1., r * .05)))
        if label: text(cv, label, 0, r * .33, r * .92, 800, shade(col, -.55), .95, 'c')
        p = skia.Path(); p.addArc(skia.Rect.MakeXYWH(-r * .82, -r * .82, r * 1.64, r * 1.64), 200, 70)
        cv.drawPath(p, paint(WHITE, .45, stroke=r * .07))
    return _pic(('coin', round(r, 1), col, label), fn, (-r - 2, -r - 2, 2 * r + 4, 2 * r + 4))

def coin(c, x, y, r=22, a=1., col=GOLD, label='₹', spin=0., shadow=True):
    """A coin of radius r centred at (x, y); spin (radians) turns it about the vertical axis (edge-on at pi/2)."""
    if a <= 0: return
    sx = math.cos(spin); k = abs(sx)
    if shadow: c.drawOval(skia.Rect.MakeXYWH(x - r * max(k, .15) + 2, y - r + 5, 2 * r * max(k, .15), 2 * r), paint(BLACK, .4 * a, blur=r * .25))
    if k < .25:
        c.drawRRect(rrect(x - r * .16, y - r, r * .32, 2 * r, r * .16), paint(shade(col, -.3), a))
        c.drawRRect(rrect(x - r * .16, y - r, r * .32, 2 * r, r * .16), paint(shade(col, -.55), a, stroke=1.2))
        if k < .05: return
    if k < .999:                                             # rim thickness while turning
        c.drawOval(skia.Rect.MakeXYWH(x - r * k + (r * .08 if sx > 0 else -r * .08), y - r, 2 * r * k, 2 * r), paint(shade(col, -.45), a))
    _play(c, _coin_pic(r, col, label), x, y, 1, a, sx=k)

# ------------------------------------------------------------------ paper: section chip, stamp
def sec(c, x, y, s, a=1., col=VIO, size=22, align='l', mark=None):
    """Section chip: a '§ 40A(3)' pill (fill col at .18, stroke, light text); '§ ' is added when s starts with a
    digit (mark='' to suppress, or any other prefix). (x, y) = left-centre (align 'l'), centre ('c') or right-centre
    ('r'). Returns its width."""
    s2 = (('§ ' if s[:1].isdigit() else '') if mark is None else mark) + s
    tw = text_w(s2, size, 700); w = tw + size * 1.15; h = size * 1.62
    if a <= 0: return w
    x0 = x - w * {'l': 0, 'c': .5, 'r': 1}[align]
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, .18 * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, .9 * a, stroke=1.8))
    text(c, s2, x0 + w / 2, y + size * .35, size, 700, shade(col, .62), a, 'c')
    return w

_DISTRESS = skia.ColorFilters.Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7., 0, 0, 0, -7. * .64])
_BLOTCH = skia.ColorFilters.Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.2, 0, 0, 0, -2.2 * .5])

def _stamp_geom(s, size, sub):
    tw = text_w(s, size, 800, size * .07); sw = text_w(sub, size * .42, 700, size * .05) if sub else 0
    W_ = max(tw, sw) + size * 1.25; H_ = size * (2.25 if sub else 1.78)
    return W_, H_

def _stamp_pic(s, col, size, sub, seed):
    W_, H_ = _stamp_geom(s, size, sub)
    def fn(cv):
        b = skia.Rect(-W_ / 2 - 12, -H_ / 2 - 12, W_ / 2 + 12, H_ / 2 + 12)
        cv.saveLayer(b, None)
        r = size * .34; o = size * .2
        cv.drawRRect(rrect(-W_ / 2, -H_ / 2, W_, H_, r), paint(col, 1, stroke=size * .11))
        cv.drawRRect(rrect(-W_ / 2 + o, -H_ / 2 + o, W_ - 2 * o, H_ - 2 * o, r * .55), paint(col, 1, stroke=size * .05))
        ty = size * .35 - (size * .2 if sub else 0)
        text(cv, s, 0, ty, size, 800, col, 1, 'c', track=size * .07)
        if sub:
            cv.drawLine(-W_ / 2 + o * 2.2, ty + size * .2, W_ / 2 - o * 2.2, ty + size * .2, paint(col, 1, stroke=size * .035))
            text(cv, sub, 0, ty + size * .66, size * .42, 700, col, 1, 'c', track=size * .05)
        for flt, f, sc_, aa in ((_DISTRESS, .05, .55, .95), (_BLOTCH, .012, 1., .5)):
            p = skia.Paint(); p.setShader(tex_shader(sx=sc_ * size / 40, sy=sc_ * size / 40, off=(seed * 37 % 300, seed * 53 % 300), f=f, octaves=2, seed=seed % 7 + 1))
            p.setColorFilter(flt); p.setBlendMode(skia.BlendMode.kDstOut); p.setAlphaf(aa); cv.drawRect(b, p)
        cv.restore()
    return _pic(('stamp', s, col, round(size, 1), sub, seed), fn, (-W_ / 2 - 14, -H_ / 2 - 14, W_ + 28, H_ + 28))

def stamp(c, x, y, text, col=RED, a=1., u=1., ang=-12., size=40, sub=None, deep=False, seed=None):
    """Rubber stamp centred at (x, y): rounded double border, heavy tracked caps, distressed ink, transparent
    centre; sub = optional small second line. As u goes 0 -> 1 it slams in from 1.6x (falling, a shadow while in
    the air), squashes, shakes a little and settles at 1x (impact at u ~ .3 -> put the 'thunk' there).
    deep=True uses a darker ink (for stamps on cream paper)."""
    if a <= 0 or u <= 0: return
    ink = INKS.get({RED: 'red', GREEN: 'green', BLUE: 'blue', GOLD: 'gold', VIO: 'vio'}.get(col, ''), shade(col, -.35)) if deep else col
    s = text; sd = sum(map(ord, s)) if seed is None else seed
    pic = _stamp_pic(s, ink, size, sub, sd)
    u = clamp(u); fall = seg(u, 0, .3, ein); k = lerp(1.6, 1., fall)
    if u > .3:
        q = seg(u, .3, .62); k *= 1 - .045 * math.sin(math.pi * clamp((u - .3) / .14)) * (u < .44)
        sh = (1 - q) * math.sin((u - .3) * 75) * 1.6
    else: sh = 0.
    aa = a * clamp(u / .16)
    W_, H_ = _stamp_geom(s, size, sub)
    if k > 1.01:                                             # shadow while airborne
        d = (k - 1) * 40
        c.save(); c.translate(x + d * .5, y + d); c.rotate(ang); c.scale(k, k)
        c.drawRRect(rrect(-W_ / 2, -H_ / 2, W_, H_, size * .34), paint(BLACK, .22 * aa * (k - 1) / .6, blur=10 + d * .4))
        c.restore()
    _play(c, pic, x + sh * .8, y, k, aa, ang + sh)

_stamp_fn = stamp

# ------------------------------------------------------------------ paper: ledger (P&L on cream paper)
def ledger(c, x, y, w, rows, a=1., title='Profit & Loss A/c', u=1., hl=None, strike=None, sc=1., sub=None, size=26):
    """A cream paper statement, top-left (x, y), w wide (all scaled by sc): a header band with the title (Georgia)
    and optional sub line, ruled rows and a money column. rows = [(label, amount or None, style)], style in
    {'', 'bold', 'total', 'dim'}. u 0..1 reveals rows top-down; hl = {row: 0..1} marker highlight;
    strike = {row: 0..1} red pen strike-through. Returns ([row centre y], (x, y, w*sc, h*sc))."""
    n = len(rows); rh = size * 1.85; hb = 84 if sub else 64; top = hb + 12
    H_ = top + n * rh + 22
    ys = [y + (top + (i + .5) * rh) * sc for i in range(n)]; rect = (x, y, w * sc, H_ * sc)
    if a <= 0: return ys, rect
    aw = max([ftext_w(rupee(r[1]), size, MONO, 700) for r in rows if r[1] is not None] + [120]) + 34
    ax = w - 22 - aw
    def paper(cv):
        cv.drawRRect(rrect(4, 12, w, H_, 10), paint(BLACK, .45, blur=18))
        cv.drawRRect(rrect(0, 0, w, H_, 8), paint(shader=lgrad((0, 0), (0, H_), ['#fbf7ec', CREAM, '#ece3cd'])))
        cv.save(); cv.clipRRect(rrect(0, 0, w, H_, 8), True)
        cv.drawRect(skia.Rect.MakeXYWH(0, 0, w, hb), paint('#e8dcbf'))
        cv.restore()
        cv.drawLine(0, hb, w, hb, paint(INK, .55, stroke=1.6, cap=False)); cv.drawLine(0, hb + 4, w, hb + 4, paint(INK, .35, stroke=1, cap=False))
        ftext(cv, title, 22, 40 if not sub else 38, 27, SERIF, INK, 1, 'l', 700)
        if sub: itext(cv, sub, 22, 68, 18, '#6b6452', 1, 'l', 400, SERIF)
        lp = paint(PAPER_LINE, 1, stroke=1.1, cap=False)
        for i in range(n + 1):
            yy = top + i * rh; cv.drawLine(14, yy, w - 14, yy, lp)
        cv.drawLine(ax, top - 8, ax, top + n * rh + 6, paint('#c9b896', 1, stroke=1.2, cap=False))
        cv.drawLine(ax + 4, top - 8, ax + 4, top + n * rh + 6, paint('#c9b896', .6, stroke=1, cap=False))
        cv.drawRRect(rrect(.5, .5, w - 1, H_ - 1, 8), paint('#cbbd9c', .9, stroke=1.2))
    def row_ink(cv, i, ra=1.):
        lab_, amt, st = (tuple(rows[i]) + ('',))[:3]
        cy = top + (i + .5) * rh; by = cy + size * .36
        dim = st == 'dim'; bold = st in ('bold', 'total')
        col = '#8a8068' if dim else INK
        if st == 'total':
            cv.drawLine(ax + 14, cy - rh / 2 + 5, w - 22, cy - rh / 2 + 5, paint(INK, .8 * ra, stroke=1.4, cap=False))
        lw = 800 if bold else 500 if dim else 600
        l2, lsz, _ = _fit(lab_, size, lw, ax - 36, 18)
        text(cv, l2, 24, cy + lsz * .36, lsz, lw, col, ra)
        if amt is not None:
            ftext(cv, rupee(amt), w - 22, by, size, MONO, col, ra, 'r', 700 if bold else 400)
            if st == 'total':
                tw = ftext_w(rupee(amt), size, MONO, 700)
                for dd in (8, 12): cv.drawLine(w - 22 - tw, by + dd, w - 22, by + dd, paint(INK, .8 * ra, stroke=1.3, cap=False))
    key = ('ledger', w, n, title, sub, size, round(aw, 1))
    pp = _pic(key, paper, (-30, -20, w + 60, H_ + 60))
    full = _pic(key + (tuple(tuple(r) for r in rows),), lambda cv: (cv.drawPicture(pp), [row_ink(cv, i) for i in range(n)]),
                (-30, -20, w + 60, H_ + 60)) if u >= 1 else None
    with _fade(c, a, (x - 30 * sc, y - 20 * sc, x + (w + 40) * sc, y + (H_ + 40) * sc)):
        c.save(); c.translate(x, y); c.scale(sc, sc)
        if full is not None: _play(c, full)
        else:
            _play(c, pp)
            for i in range(n):
                ri = seg(u, i / max(n, 1) * .72, i / max(n, 1) * .72 + .28)
                if ri <= 0: continue
                c.save(); c.translate(-8 * (1 - ri), 0); row_ink(c, i, ri); c.restore()
        for i, v in (hl or {}).items():
            if v > 0 and i < n:
                cy = top + (i + .5) * rh
                c.drawRRect(rrect(12, cy - rh * .42, w - 24, rh * .84, 6), paint('#fde047', .75 * v, blend='Multiply'))
                c.drawRect(skia.Rect.MakeXYWH(6, cy - rh * .42, 4, rh * .84), paint('#d97706', v))
        for i, v in (strike or {}).items():
            if v > 0 and i < n:
                cy = top + (i + .5) * rh
                c.drawLine(18, cy + 1, lerp(18, w - 16, clamp(v)), cy - 2, paint('#dc2626', .9, stroke=3.2))
        c.restore()
    return ys, rect

# ------------------------------------------------------------------ the computation sheet (hero device)
_SH_RH = {'head': 48, 'note': 44, 'sub': 62, 'total': 74}
_SH_PAD, _SH_BAND, _SH_COLS = 30, 66, 44

def _sh_top(title, cols): return (_SH_BAND if title else 0) + (_SH_COLS if cols else 0) + 14
def _sh_hs(rows): return [_SH_RH.get(r.get('kind', ''), 54) for r in rows]

def sheet_height(rows, title=None, cols=None, max_h=None):
    """Card height of sheet(rows, title=..., cols=..., max_h=...)."""
    return _sh_top(title, cols) + (sum(_sh_hs(rows)) if max_h is None else max_h) + 16

def sheet_row_y(x, y, rows, i, scroll=0., title=None, cols=None):
    """Canvas y of the centre of row i of a sheet at (x, y) (pass the same title / cols as to sheet())."""
    hs = _sh_hs(rows); return y + _sh_top(title, cols) + sum(hs[:i]) + hs[i] / 2 - scroll

def sheet_scroll(rows, t, max_h, margin=8., dur=.7, lead=.25):
    """Auto-scroll for sheet(max_h=...): eases up (over dur s, starting lead s before a row's t0) just enough to
    keep the newest revealed row inside the window. Monotonic; pass the result as scroll=."""
    hs = _sh_hs(rows); acc = 0.; prev = 0.; out = 0.
    for r, h in zip(rows, hs):
        acc += h; need = max(prev, acc - max_h + margin)
        if need > prev:
            t0 = r.get('t0', 0.); out += (need - prev) * seg(t, t0 - lead, t0 - lead + dur); prev = need
    return out

def _signchip(c, x, y, kind, a):
    col = GREEN if kind == 'add' else RED; s = 15
    c.drawRRect(rrect(x - s, y - s, 2 * s, 2 * s, 8), paint(col, .2 * a))
    c.drawRRect(rrect(x - s, y - s, 2 * s, 2 * s, 8), paint(col, .9 * a, stroke=1.8))
    p = paint(col, a, stroke=3.2)
    c.drawLine(x - 7, y, x + 7, y, p)
    if kind == 'add': c.drawLine(x, y - 7, x, y + 7, p)

_NSH = {}
def _nshadow(c, x, y, w, h, r=20., blur=24., a=.5, dy=12.):
    """Soft drop shadow under an opaque rounded rect (x, y, w, h): a blurred nine-patch cached per device scale,
    drawn as its eight border pieces (the hidden centre is skipped) snapped to device pixels with nearest
    sampling, so it costs about the same at any size."""
    if a <= 0: return
    M = c.getTotalMatrix()
    if not M.isScaleTranslate():
        c.drawRRect(rrect(x, y + dy, w, h, r), paint(BLACK, a, blur=blur)); return
    k = M.getScaleX(); kb = round(k, 3)
    rr_, b_ = r * kb, blur * kb; pad = int(math.ceil(3 * b_)); P = pad + int(math.ceil(max(rr_, (dy + 3) * kb)))
    key = (round(rr_, 1), round(b_, 1), P)
    if key not in _NSH:
        if len(_NSH) > 40: _NSH.clear()
        S = 2 * P + 2; sf = skia.Surface(S, S); cv = sf.getCanvas()
        cv.drawRRect(rrect(pad, pad, S - 2 * pad, S - 2 * pad, rr_), paint(BLACK, 1, blur=b_))
        _NSH[key] = (sf.makeImageSnapshot(), S)
    img, S = _NSH[key]
    o0 = M.mapXY(x, y + dy); o1 = M.mapXY(x + w, y + h + dy)
    X0, Y0, X1, Y1 = round(o0.x()) - pad, round(o0.y()) - pad, round(o1.x()) + pad, round(o1.y()) + pad
    if X1 - X0 < 2 * P + 1 or Y1 - Y0 < 2 * P + 1:
        c.drawRRect(rrect(x, y + dy, w, h, r), paint(BLACK, a, blur=blur)); return
    p = skia.Paint(); p.setAlphaf(clamp(a)); sm = skia.SamplingOptions(); R = skia.Rect
    c.save(); c.resetMatrix()
    for sx0, sx1, dx0, dx1 in ((0, P, X0, X0 + P), (P, S - P, X0 + P, X1 - P), (S - P, S, X1 - P, X1)):
        for sy0, sy1, dy0, dy1 in ((0, P, Y0, Y0 + P), (P, S - P, Y0 + P, Y1 - P), (S - P, S, Y1 - P, Y1)):
            if (sx0 == P and sy0 == P) or (sy0 == 0 and dy > 0 and X1 - X0 > 400): continue   # centre; faint top halo
            c.drawImageRect(img, R(sx0, sy0, sx1, sy1), R(dx0, dy0, dx1, dy1), sm, p)
    c.restore()

def _glass(c, x, y, w, h, r=20, tint=NAVY, sheen=.06, edge=.13, band=0.):
    """Opaque dark-glass card: cached soft shadow, one solid fill (cheap at any size), a thin top sheen strip and
    a hairline edge."""
    _nshadow(c, x, y, w, h, r, 12, .55, 9)
    rr = rrect(x, y, w, h, r); c.drawRRect(rr, paint(tint))
    if sheen > 0 and band <= 0:
        c.save(); c.clipRRect(rr, True); c.translate(x, y)
        c.drawRect(skia.Rect.MakeXYWH(0, 0, w, 26), paint(shader=_cache(('glass', tint, sheen), lambda: lgrad((0, 0), (0, 26), [mixc(tint, WHITE, sheen), tint]))))
        c.restore()
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, r), paint(WHITE, edge, stroke=1.2))

def _sh_row(c, r, kind, w, lx, cr1, cr2, aw, cols, size, asize, ra, uas, cas, su, dx):
    """One sheet row centred at local y = 0 (x = 0 is the sheet's left edge)."""
    pad = _SH_PAD; h = _SH_RH.get(kind, 54); lab_ = r.get('label', ''); rc = r.get('col'); dimk = 1 - .5 * su
    if kind == 'total':
        c.drawRRect(rrect(12 + dx, -h / 2 + 4, w - 24, h - 8, 12), paint(rc or GOLD, .07 * ra))
        c.drawRRect(rrect(12 + dx, -h / 2 + 4, w - 24, h - 8, 12), paint(rc or GOLD, .28 * ra, stroke=1.4))
    if kind == 'head':
        text(c, lab_.upper(), pad + dx, 8, 20, 800, rc or ACC, ra * dimk, track=3)
        tw = text_w(lab_.upper(), 20, 800, 3)
        c.drawLine(pad + tw + 16 + dx, 1, w - pad, 1, paint(rc or ACC, .22 * ra, stroke=1.2, cap=False))
        return
    if kind in ('add', 'less'): _signchip(c, pad + 15 + dx, 0, kind, ra * dimk)
    if kind == 'note':
        itext(c, lab_, lx + dx, 8, 23, rc or DIM, .82 * ra * dimk)
    else:
        lsz = size + (1 if kind == 'total' else 0); lw = 800 if kind in ('sub', 'total') else 700 if kind == 'start' else 600
        lcol = rc or (GOLD if kind == 'total' else WHITE if kind in ('start', 'sub') else '#e6ecfa')
        sw = sec(c, 0, 0, r['sec'], 0, size=21) + 14 if r.get('sec') else 0
        lab_, lsz, tw = _fit(lab_, lsz, lw, cr1 - aw - 18 - lx - sw, 20)
        text(c, lab_, lx + dx, lsz * .35, lsz, lw, lcol, ra * dimk)
        if r.get('sec'): sec(c, lx + tw + 14 + dx, 0, r['sec'], ra * dimk, size=21)
    amt = r.get('amt')
    for (ar, val), ua, ca in zip(((cr1, amt), (cr2, r.get('amt2', amt))) if cols else ((cr2, amt),), uas, cas):
        if val is None or ca <= 0: continue
        big = kind in ('sub', 'total')
        acol = rc or (GOLD if big else DIM if kind == 'note' else WHITE)
        asz = 24 if kind == 'note' else asize + (3 if kind == 'total' else 1 if kind == 'sub' else 0)
        if big:
            rw = ftext_w(rupee(val), asz, MONO); ry = -h / 2 + (12 if kind == 'total' else 5)
            c.drawLine(ar - rw - 6, ry, ar, ry, paint(DIM, .55 * ra * ca, stroke=1.6, cap=False))
        ww = roll(c, val, ar + dx, asz * .36, ua, asz, acol, ra * dimk * ca, 'r', MONO, '₹', False, 700,
                  (5 if kind == 'total' and ua >= 1 else 0))
        if kind == 'total':
            for dd in (asz * .52, asz * .52 + 5): c.drawLine(ar - ww + dx, dd, ar + dx, dd, paint(acol, .85 * ra * ca, stroke=1.8, cap=False))
    if su > 0:
        c.drawLine(lx - 6, 0, lerp(lx - 6, cr2 + 4, su), -1, paint(RED, .95 * ra, stroke=3.4))

def sheet(c, x, y, w, rows, a=1., t=0., title=None, col=GOLD, scroll=0., max_h=None, cols=None, title_r=None,
          size=31, asize=33, col2_a=1., grow=False):
    """The ICAI-style computation table on a dark glass card, top-left (x, y), width w, with a gold title band
    (title, plus title_r on the right). rows = list of dicts:
      {'label', 'amt' (number or None), 'kind': 'head'|'start'|'add'|'less'|'sub'|'total'|'note', 't0',
       'sec': chip text, 'strike': time, 'hl': (t0, t1), 'col': colour override, 'amt2': 2nd column, 't2': its time}
    A row slides in from the left over .45 s from t0, its amount rolls up over .7 s; add / less rows get a green +
    / red − chip; sub / total rows a rule above and a bold gold amount (total: double underline + glow); head rows
    are small caps; note rows dim italic; a VIO section chip sits right of the label (labels auto-shrink to fit).
    scroll (px) shifts rows up inside a clipped window of height max_h (rows fade at its edges; use
    sheet_scroll()). cols=('Default', 'Opted out') adds a second amount column ('amt2', default = amt; None =
    blank), faded by col2_a. grow=True makes the card follow the revealed rows. Settled rows are cached pictures.
    Returns the card rect."""
    hs = _sh_hs(rows); top = _sh_top(title, cols); body = sum(hs) if max_h is None else max_h
    H_ = top + body + 16; pad = _SH_PAD
    if grow and max_h is None:
        acc = 0.; vis = 0.
        for r, h in zip(rows, hs):
            acc += h; vis = max(vis, acc * seg(t, r.get('t0', 0.) - .1, r.get('t0', 0.) + .35))
        H_ = top + vis + 16
    if a <= 0: return (x, y, w, H_)
    amts = [v for r in rows if r.get('kind') not in ('head', 'note') for v in (r.get('amt'), r.get('amt2') if cols else None) if v is not None]
    aw = max([ftext_w(rupee(v), asize + 3, MONO) for v in amts] + [150]) + 14
    cr2 = w - pad; cr1 = cr2 - (aw + 40 if cols else 0); lx = pad + 44
    with _fade(c, a, (x - 40, y - 30, x + w + 40, y + H_ + 50)):
        _glass(c, x, y, w, H_, band=_SH_BAND if title else 0.)
        if title:
            c.save(); c.clipRRect(rrect(x, y, w, H_, 20), True); c.translate(x, y)
            c.drawRect(skia.Rect.MakeXYWH(0, 0, w, _SH_BAND), paint(shader=_cache(('shband', col), lambda: lgrad((0, 0), (0, _SH_BAND), [shade(col, .12), shade(col, -.1)]))))
            c.restore()
            c.drawLine(x, y + _SH_BAND, x + w, y + _SH_BAND, paint(shade(col, -.45), 1, stroke=1.5, cap=False))
            text(c, title, x + pad, y + 43, 27, 800, '#1a1305', 1)
            if title_r: text(c, title_r, x + w - pad, y + 43, 23, 700, '#3b2c08', 1, 'r')
        if cols:
            hy = y + (_SH_BAND if title else 0) + 30
            text(c, cols[0].upper(), x + cr1, hy, 18, 800, DIM, .85, 'r', track=2)
            text(c, cols[1].upper(), x + cr2, hy, 18, 800, GOLD, .9 * col2_a, 'r', track=2)
            c.drawLine(x + pad, hy + 12, x + w - pad, hy + 12, paint(WHITE, .1, stroke=1, cap=False))
        wy0 = y + top - 8; wy1 = y + top + body + 6
        clipped = max_h is not None
        if clipped: c.save(); c.clipRect(skia.Rect(x, wy0, x + w, wy1), True)
        yy = y + top - scroll
        for i, (r, h) in enumerate(zip(rows, hs)):
            cy = yy + h / 2; yy += h
            if clipped and (cy + h / 2 < wy0 or cy - h / 2 > wy1): continue
            t0 = r.get('t0', 0.); u = seg(t, t0, t0 + .45, eout)
            if u <= 0: continue
            fa = (clamp((cy - wy0) / (h * .85)) * clamp((wy1 - cy) / (h * .85))) if clipped else 1.
            ra = u * fa
            if ra <= .004: continue
            kind = r.get('kind', '')
            st = r.get('strike'); su = seg(t, st, st + .5) if st is not None else 0.
            hl_ = r.get('hl'); ha = win(t, hl_[0], hl_[1], .3, .4) if hl_ else 0.
            if ha > 0:
                c.drawRRect(rrect(x + 10, cy - h / 2 + 3, w - 20, h - 6, 10), paint(GOLD, .15 * ha * ra))
                c.drawRRect(rrect(x + 10, cy - h / 2 + 3, 5, h - 6, 2.5), paint(GOLD, ha * ra))
            t2 = r.get('t2', t0)
            uas = (seg(t, t0 + .08, t0 + .8, linr),) + ((seg(t, t2 + .08, t2 + .8, linr),) if cols else ())
            cas = (1.,) + ((col2_a * seg(t, t2, t2 + .3),) if cols else ())
            c.save(); c.translate(x, cy)
            if u >= 1 and min(uas) >= 1 and su in (0., 1.) and cas[-1] in (0., 1.):
                key = ('shrow', r.get('label'), r.get('amt'), r.get('amt2', 'same') if cols else None, kind, r.get('sec'),
                       r.get('col'), w, cols, size, asize, round(aw, 1), su, cas[-1])
                pic = _pic(key, lambda cv: _sh_row(cv, r, kind, w, lx, cr1, cr2, aw, cols, size, asize, 1., uas, cas, su, 0.),
                           (-10, -h / 2 - 10, w + 20, h + 20))
                if ra < .999:
                    p = skia.Paint(); p.setAlphaf(ra); c.drawPicture(pic, None, p)
                else: c.drawPicture(pic)
            else:
                _sh_row(c, r, kind, w, lx, cr1, cr2, aw, cols, size, asize, ra, uas, cas, su, -46 * (1 - u))
            c.restore()
        if clipped: c.restore()
    return (x, y, w, H_)

# ------------------------------------------------------------------ paper: bill, cheque, form, book
_MODES = {'cash': ('cash', 'Cash'), 'upi': ('upi', 'UPI'), 'cheque': ('cheque', 'Cheque'), 'card': ('card', 'Card'),
          'bank': ('bank', 'Bank'), 'neft': ('transfer', 'NEFT'), 'draft': ('draft', 'Draft'), 'credit': ('doc', 'Credit')}

def _torn(Wd, Ht, seed, r=7.):
    """Slip outline with a torn (jagged) top edge, centred at (0, 0)."""
    def build():
        n = int(Wd / 9); x0, y0 = -Wd / 2, -Ht / 2; p = skia.Path(); p.moveTo(x0, y0 + 5)
        for i in range(n):
            p.lineTo(x0 + (i + .5) * Wd / n, y0 + hsh(i, seed) * 2.5)
            p.lineTo(x0 + (i + 1) * Wd / n, y0 + 4 + hsh(i, seed + 1) * 3)
        p.lineTo(Wd / 2, Ht / 2 - r); p.quadTo(Wd / 2, Ht / 2, Wd / 2 - r, Ht / 2); p.lineTo(x0 + r, Ht / 2)
        p.quadTo(x0, Ht / 2, x0, Ht / 2 - r); p.close()
        return p
    return _cache(('torn', Wd, Ht, seed), build)

def _badge(cv, x, y, mode, size=18, h=28):
    """Payment-mode pill (icon + word), left-centre at (x, y), on paper. Returns its width."""
    ic, word = _MODES.get(mode, ('doc', str(mode).title()))
    tw = text_w(word, size, 700); w = tw + h + 22
    cv.drawRRect(rrect(x, y - h / 2, w, h, h / 2), paint('#e6dcc4'))
    cv.drawRRect(rrect(x, y - h / 2, w, h, h / 2), paint('#c9bb98', stroke=1.2))
    icon(cv, ic, x + h * .5 + 5, y, h / 64 * .9, INK, .9, 4)
    text(cv, word, x + h + 8, y + size * .36, size, 700, INK, 1)
    return w

def _bill_pic(title, amt, mode, date, col, no):
    BW, BH = 236, 150
    def fn(cv):
        P = _torn(BW, BH, (len(title) * 7 + int(amt or 0) // 1000) % 97)
        cv.save(); cv.translate(3, 8); cv.drawPath(P, paint(BLACK, .42, blur=10)); cv.restore()
        cv.drawPath(P, paint(shader=lgrad((0, -BH / 2), (0, BH / 2), ['#fdfbf5', '#f1e9d6'])))
        if col:
            cv.save(); cv.clipPath(P, True); cv.drawRect(skia.Rect.MakeXYWH(-BW / 2, -BH / 2, 7, BH), paint(col)); cv.restore()
        x0 = -BW / 2 + 18
        text(cv, 'INVOICE', x0, -BH / 2 + 26, 12, 800, '#9a8f78', 1, track=2.2)
        ftext(cv, no or 'No. %04d' % ((sum(map(ord, title)) * 37 + int(amt or 0)) % 9000 + 400), BW / 2 - 16, -BH / 2 + 26, 12, MONO, '#9a8f78', 1, 'r', 400)
        tl, tsz, _ = _fit(title, 26, 800, BW - 36, 15)
        text(cv, tl, x0, -13, tsz, 800, INK, 1)
        dp = paint('#b8ad94', 1, stroke=1.3, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([5, 4], 0))
        cv.drawLine(x0, 0, BW / 2 - 16, 0, dp)
        if amt is not None: ftext(cv, rupee(amt), x0, 33, 30, MONO, INK, 1, 'l', 700)
        if mode: _badge(cv, x0 - 2, 56, mode)
        if date: text(cv, date, BW / 2 - 16, 62, 17, 600, '#6b6455', 1, 'r')
        cv.drawPath(P, paint('#d8cdb2', .9, stroke=1))
    return _pic(('bill', title, amt, mode, date, col, no), fn, (-BW / 2 - 20, -BH / 2 - 20, BW + 44, BH + 50))

def bill(c, x, y, a=1., title='Flour', amt=400000, mode=None, date=None, sc=1., ang=0., col=None, stamp=None, no=None):
    """A small invoice slip (236 x 150 at sc=1) centred at (x, y), torn top edge: title, rupee(amt) in MONO,
    optional payment-mode badge ('cash' 'upi' 'cheque' 'card' 'bank' 'neft' 'draft'), optional date text,
    col = a coloured left edge; stamp = (text, col, u) slams a mini stamp across it."""
    if a <= 0: return
    pic = _bill_pic(title, amt, mode, date, col, no); R = 160 * sc
    with _fade(c, a, (x - R, y - R, x + R, y + R)):
        c.save(); c.translate(x, y)
        if ang: c.rotate(ang)
        c.scale(sc, sc); _play(c, pic)
        if stamp:
            st, scol, su = (tuple(stamp) + (1.,))[:3]
            _stamp_fn(c, 40, 48, st, scol, 1., su, -10, 20, deep=True)
        c.restore()

def _words(n):
    """Indian-system amount in words: 150000 -> 'One lakh fifty thousand only'."""
    ones = ('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen '
            'seventeen eighteen nineteen').split()
    tens = '_ _ twenty thirty forty fifty sixty seventy eighty ninety'.split()
    def two(k): return ones[k] if k < 20 else tens[k // 10] + ('-' + ones[k % 10] if k % 10 else '')
    def three(k): return (ones[k // 100] + ' hundred' + (' ' + two(k % 100) if k % 100 else '')) if k >= 100 else two(k)
    n = int(round(abs(n))); parts = []
    for div, name in ((10 ** 7, 'crore'), (10 ** 5, 'lakh'), (1000, 'thousand')):
        q, n = divmod(n, div)
        if q: parts.append((three(q) if q < 1000 else str(q)) + ' ' + name)
    if n or not parts: parts.append(three(n))
    s = ' '.join(parts); return s[0].upper() + s[1:] + ' only'

def _cheque_pic(amt, payee, crossed, date, bank):
    CW, CH = 470, 210; x0, y0 = -CW / 2, -CH / 2
    def fn(cv):
        cv.drawRRect(rrect(x0 + 4, y0 + 10, CW, CH, 8), paint(BLACK, .45, blur=14))
        cv.drawRRect(rrect(x0, y0, CW, CH, 7), paint(shader=lgrad((x0, y0), (x0 + CW, y0 + CH), ['#eef6f2', '#d6e8e1'])))
        cv.save(); cv.clipRRect(rrect(x0, y0, CW, CH, 7), True)
        gp = paint('#a9cbc0', .5, stroke=.9)
        for k in range(10):
            P = np.array([(xx, y0 + 14 + k * 20 + 5 * math.sin(xx / 21 + k * .9)) for xx in np.arange(x0, x0 + CW + 8, 8)])
            cv.drawPath(poly(P, False), gp)
        cv.drawRect(skia.Rect.MakeXYWH(x0, y0 + CH - 30, CW, 30), paint('#f4f8f6', .8))
        cv.restore()
        cv.drawRRect(rrect(x0 + .5, y0 + .5, CW - 1, CH - 1, 7), paint('#78a99b', stroke=1.4))
        cv.drawCircle(x0 + 30, y0 + 28, 14, paint('#0f5c6e'))
        text(cv, bank[0], x0 + 30, y0 + 34, 16, 800, WHITE, 1, 'c')
        ftext(cv, bank.upper(), x0 + 52, y0 + 27, 16, SERIF, '#0f4c5c', 1, 'l', 700)
        text(cv, 'Pune · IFSC DECB0000412', x0 + 52, y0 + 43, 11, 600, '#3c6e66', 1)
        bx = x0 + CW - 18 - 8 * 17
        text(cv, 'DATE', bx - 8, y0 + 31, 10, 800, '#3c6e66', 1, 'r', track=1)
        for i in range(8):
            cv.drawRect(skia.Rect.MakeXYWH(bx + i * 17, y0 + 14, 15, 21), paint('#fbfdfc', .85))
            cv.drawRect(skia.Rect.MakeXYWH(bx + i * 17, y0 + 14, 15, 21), paint('#78a99b', stroke=1, cap=False))
            if date and i < len(date): ftext(cv, date[i], bx + i * 17 + 7.5, y0 + 30, 15, HAND, '#1e3a8a', 1, 'c', 700)
        lp = paint('#78a99b', stroke=1, cap=False)
        text(cv, 'Pay', x0 + 18, y0 + 90, 14, 700, '#3c6e66', 1)
        cv.drawLine(x0 + 50, y0 + 93, x0 + 372, y0 + 93, lp)
        ftext(cv, payee, x0 + 60, y0 + 87, 25, HAND, '#1e3a8a', 1, 'l', 700)
        text(cv, 'OR BEARER', x0 + CW - 18, y0 + 92, 11, 800, '#3c6e66', 1, 'r', track=1)
        if crossed: cv.drawLine(x0 + CW - 92, y0 + 86, x0 + CW - 14, y0 + 90, paint('#1e3a8a', .9, stroke=1.6))
        text(cv, 'Rupees', x0 + 18, y0 + 124, 14, 700, '#3c6e66', 1)
        wl = wrap(_words(amt), 19, 270, 700, HAND)
        for i, ln in enumerate(wl[:2]):
            cv.drawLine(x0 + (78 if i == 0 else 18), y0 + 127 + i * 26, x0 + 334, y0 + 127 + i * 26, lp)
            ftext(cv, ln, x0 + (84 if i == 0 else 24), y0 + 122 + i * 26, 19, HAND, '#1e3a8a', 1, 'l', 700)
        cv.drawRect(skia.Rect.MakeXYWH(x0 + 344, y0 + 104, 108, 34), paint('#fbfdfc', .9))
        cv.drawRect(skia.Rect.MakeXYWH(x0 + 344, y0 + 104, 108, 34), paint('#78a99b', stroke=1.2, cap=False))
        ftext(cv, rupee(amt).replace('₹', '₹ ') + '/-', x0 + 398, y0 + 128, 19, HAND, '#1e3a8a', 1, 'c', 700)
        ftext(cv, 'A/c No. 3104 2266 7781', x0 + 18, y0 + 168, 12, MONO, '#2f4f4a', 1, 'l', 700)
        sp = skia.Path(); sx, sy = x0 + 352, y0 + 160
        sp.moveTo(sx, sy); sp.cubicTo(sx + 10, sy - 22, sx + 18, sy - 18, sx + 14, sy + 2); sp.cubicTo(sx + 12, sy + 12, sx + 30, sy - 16, sx + 40, sy - 8)
        sp.cubicTo(sx + 48, sy - 2, sx + 52, sy - 14, sx + 62, sy - 10); sp.cubicTo(sx + 72, sy - 6, sx + 80, sy - 12, sx + 98, sy - 16)
        cv.drawPath(sp, paint('#1e3a8a', .9, stroke=1.8))
        cv.drawLine(x0 + 330, y0 + 172, x0 + CW - 18, y0 + 172, lp)
        text(cv, 'Authorised signatory', x0 + CW - 18, y0 + 186, 11, 600, '#3c6e66', 1, 'r')
        ftext(cv, 'C204316C  411002013A  000412C  29', x0 + 18, y0 + CH - 9, 14, MONO, '#26302e', .9, 'l', 700)
        if crossed:
            cp = paint('#1f2937', .85, stroke=2)
            cv.drawLine(x0 + 200, y0 + 68, x0 + 232, y0 + 10, cp); cv.drawLine(x0 + 228, y0 + 68, x0 + 260, y0 + 10, cp)
            cv.save(); cv.translate(x0 + 230, y0 + 40); cv.rotate(-61)
            ftext(cv, 'A/c Payee', 0, 5, 14, HAND, '#1f2937', 1, 'c', 700); cv.restore()
    return _pic(('cheque', amt, payee, crossed, date, bank), fn, (x0 - 20, y0 - 20, CW + 44, CH + 50))

def cheque(c, x, y, a=1., amt=150000, payee="Meera's Bakehouse", crossed=True, sc=1., ang=0., date=None, bank='Deccan Bank'):
    """An account-payee cheque (470 x 210 at sc=1) centred at (x, y): guilloche ground, payee and the amount in
    words in handwriting, amount box, MICR line; crossed=True draws the two crossing lines with 'A/c Payee' and
    strikes 'or bearer'. date = 'DDMMYYYY' string in the date boxes."""
    if a <= 0: return
    _play(c, _cheque_pic(amt, payee, crossed, date, bank), x, y, sc, a, ang)

def _form_pic(title, sub, col):
    FW, FH = 264, 344; x0, y0 = -FW / 2, -FH / 2
    def fn(cv):
        P = skia.Path(); P.moveTo(x0, y0); P.lineTo(x0 + FW - 30, y0); P.lineTo(x0 + FW, y0 + 30); P.lineTo(x0 + FW, y0 + FH)
        P.lineTo(x0, y0 + FH); P.close()
        cv.save(); cv.translate(4, 10); cv.drawPath(P, paint(BLACK, .45, blur=14)); cv.restore()
        cv.drawPath(P, paint(shader=lgrad((0, y0), (0, y0 + FH), ['#fcfbf7', '#eeeae0'])))
        cv.drawPath(P, paint('#d6d0bf', stroke=1.2))
        D = skia.Path(); D.moveTo(x0 + FW - 30, y0); D.lineTo(x0 + FW - 30, y0 + 30); D.lineTo(x0 + FW, y0 + 30); D.close()
        cv.drawPath(D, paint('#dcd5c3')); cv.drawPath(D, paint('#c4bca8', stroke=1))
        ex, ey = 0, y0 + 40
        cv.drawCircle(ex, ey, 21, paint(INK, .75, stroke=1.6)); cv.drawCircle(ex, ey, 16.5, paint(INK, .5, stroke=1))
        pp = paint(INK, .8)
        cv.drawPath(poly(np.array([(ex - 10, ey - 4), (ex, ey - 11), (ex + 10, ey - 4)])), pp)
        for k in (-7, -2.3, 2.3, 7): cv.drawRect(skia.Rect.MakeXYWH(ex + k - 1.3, ey - 3, 2.6, 10), pp)
        cv.drawRect(skia.Rect.MakeXYWH(ex - 11, ey + 8, 22, 2.4), pp)
        text(cv, 'GOVERNMENT OF INDIA', 0, y0 + 80, 10, 800, '#5b5546', 1, 'c', track=1.6)
        text(cv, 'INCOME-TAX DEPARTMENT', 0, y0 + 94, 10, 700, '#5b5546', 1, 'c', track=1.2)
        cv.drawLine(x0 + 40, y0 + 104, x0 + FW - 40, y0 + 104, paint(shade(col, -.35), stroke=2.4, cap=False))
        ftext(cv, title.upper(), 0, y0 + 136, 27, SERIF, INK, 1, 'c', 700)
        if sub: itext(cv, sub, 0, y0 + 158, 15, '#4b4637', 1, 'c', 400, SERIF)
        lp = paint('#b9b09a', stroke=1.2, cap=False); bp = paint('#a39a83', stroke=1, cap=False)
        for i in range(8):
            yy = y0 + 190 + i * 17
            text(cv, '%d.' % (i + 1), x0 + 20, yy, 10, 700, '#6b6452', 1)
            cv.drawLine(x0 + 36, yy, x0 + FW - 50 - (i * 23) % 60, yy, lp)
            cv.drawRect(skia.Rect.MakeXYWH(x0 + FW - 34, yy - 10, 13, 11), bp)
        cv.drawLine(x0 + 20, y0 + FH - 30, x0 + 110, y0 + FH - 30, lp)
        text(cv, 'Place / Date', x0 + 20, y0 + FH - 16, 9, 700, '#6b6452', 1)
        cv.drawCircle(x0 + FW - 52, y0 + FH - 38, 22, paint(shade(col, -.3), .55, stroke=2))
        cv.drawCircle(x0 + FW - 52, y0 + FH - 38, 16, paint(shade(col, -.3), .4, stroke=1))
    return _pic(('form', title, sub, col), fn, (x0 - 20, y0 - 20, FW + 44, FH + 50))

def form(c, x, y, a=1., title='Form 3CD', sub='Tax audit report', sc=1., col=ACC, ang=0.):
    """A government form sheet (264 x 344 at sc=1) centred at (x, y): emblem circle, department line, title, sub,
    numbered field lines, a seal; col tints the accent rule and seal."""
    if a <= 0: return
    _play(c, _form_pic(title, sub, col), x, y, sc, a, ang)

_BW, _BH = 210, 270
def _book_cover(title, col):
    def fn(cv):
        dk, lt = shade(col, -.62), shade(col, -.38)
        cv.drawRRect(rrect(0, -_BH / 2, _BW, _BH, 8), paint(shader=lgrad((0, -_BH / 2), (_BW, _BH / 2), [lt, dk])))
        cv.drawRect(skia.Rect.MakeXYWH(0, -_BH / 2, 26, _BH), paint(shade(col, -.72)))
        for k in (-.36, -.12, .12, .36):
            cv.drawRect(skia.Rect.MakeXYWH(0, k * _BH - 3, 26, 6), paint(shade(col, -.5)))
        cv.drawLine(26, -_BH / 2, 26, _BH / 2, paint(BLACK, .35, stroke=2, cap=False))
        cv.drawRRect(rrect(38, -_BH / 2 + 14, _BW - 52, _BH - 28, 6), paint(GOLD, .4, stroke=1.4))
        for sy in (-1, 1):
            tri = poly(np.array([(_BW, sy * _BH / 2), (_BW - 34, sy * _BH / 2), (_BW, sy * (_BH / 2 - 34))]))
            cv.drawPath(tri, paint(shade(GOLD, -.25))); cv.drawPath(tri, paint(shade(GOLD, -.55), stroke=1))
        lw = _BW - 80; lx = 26 + (_BW - 26 - lw) / 2
        cv.drawRRect(rrect(lx, -46, lw, 92, 6), paint('#efe5cc'))
        cv.drawRRect(rrect(lx, -46, lw, 92, 6), paint(shade(GOLD, -.4), stroke=2))
        lines = wrap(title, 21, lw - 20, 700, SERIF)[:3]
        for i, ln in enumerate(lines):
            ftext(cv, ln, lx + lw / 2, 8 + (i - (len(lines) - 1) / 2) * 25, 21, SERIF, INK, 1, 'c', 700)
        cv.drawRRect(rrect(.5, -_BH / 2 + .5, _BW - 1, _BH - 1, 8), paint(BLACK, .4, stroke=1))
    return _pic(('bookc', title, col), fn, (-4, -_BH / 2 - 4, _BW + 8, _BH + 8))

def _book_page(col, side):
    """Right page block (side=1, extends +x) or inside-cover left page (side=-1, extends -x)."""
    def fn(cv):
        sg = side; X = lambda v: v * sg
        cv.drawRect(skia.Rect(min(0, X(_BW + 4)), -_BH / 2 - 4, max(0, X(_BW + 4)), _BH / 2 + 4), paint(shade(col, -.6)))
        pr = skia.Rect(min(X(2), X(_BW - 6)), -_BH / 2 + 6, max(X(2), X(_BW - 6)), _BH / 2 - 6)
        cv.drawRect(pr, paint(shader=lgrad((0, 0), (X(_BW), 0), ['#e7dec8', '#f7f1e3', '#f3ecdc'], [0, .12, 1])))
        lp = paint(PAPER_LINE, 1, stroke=1, cap=False)
        for k in range(14): cv.drawLine(X(10), -_BH / 2 + 40 + k * 16, X(_BW - 14), -_BH / 2 + 40 + k * 16, lp)
        cv.drawLine(X(10), -_BH / 2 + 26, X(_BW - 14), -_BH / 2 + 26, paint(INK, .5, stroke=1.2, cap=False))
        for v in ((40, 150) if sg > 0 else (_BW - 60,)):
            cv.drawLine(X(v), -_BH / 2 + 14, X(v), _BH / 2 - 14, paint('#d97777', .6, stroke=1, cap=False))
        if sg > 0:
            text(cv, 'Date   Particulars', 14, -_BH / 2 + 22, 10, 700, '#7a705c', 1)
            text(cv, '₹', _BW - 26, -_BH / 2 + 22, 10, 700, '#7a705c', 1, 'r')
            for k in range(6):
                ftext(cv, '%02d' % (3 + k * 4), 14, -_BH / 2 + 52 + k * 32, 9, MONO, '#4b5563', .9, 'l', 400)
                cv.drawLine(46, -_BH / 2 + 50 + k * 32, 46 + 40 + hsh(k, 2) * 50, -_BH / 2 + 50 + k * 32, paint('#4b5563', .55, stroke=1.4))
                ftext(cv, '%d,%03d' % (1 + k, (k * 271) % 1000), _BW - 18, -_BH / 2 + 52 + k * 32, 9, MONO, '#4b5563', .9, 'r', 400)
        else:
            for k in range(7):
                cv.drawLine(-14, -_BH / 2 + 50 + k * 32, -14 - 50 - hsh(k, 5) * 70, -_BH / 2 + 50 + k * 32, paint('#4b5563', .5, stroke=1.4))
    return _pic(('bookp', col, side), fn, (-_BW - 10, -_BH / 2 - 10, 2 * _BW + 20, _BH + 20))

def book(c, x, y, a=1., title='Books of account', col=BLUE, sc=1., open_=0.):
    """A hard-bound ledger book centred at (x, y), 210 x 270 closed at sc=1 (leather cover in col, brass corners,
    spine bands, a title plate). open_ 0..1 swings the cover open about the spine; open it is a 420-wide spread of
    ruled ledger pages centred at x."""
    if a <= 0: return
    u = ease(clamp(open_)); th = math.pi * u; k = math.cos(th)
    with _fade(c, a, (x - (_BW + 40) * sc, y - (_BH / 2 + 30) * sc, x + (_BW + 40) * sc, y + (_BH / 2 + 50) * sc)):
        c.save(); c.translate(x + lerp(-_BW / 2, 0, u) * sc, y); c.scale(sc, sc)
        l0 = lerp(0, -_BW - 4, u)
        c.drawRRect(rrect(l0 + 6, -_BH / 2 + 14, _BW + 4 - l0, _BH, 10), paint(BLACK, .5, blur=18))
        if u < .999:                                     # closed thickness: back board + page edges
            c.drawRRect(rrect(5, -_BH / 2 + 6, _BW, _BH, 8), paint(shade(col, -.7), 1 - u))
            c.drawRect(skia.Rect.MakeXYWH(_BW - 2, -_BH / 2 + 8, 6, _BH - 10), paint('#e9e0c8', 1 - u))
        if u > .001: _play(c, _book_page(col, 1))
        if k > 0:
            _play(c, _book_cover(title, col), 0, 0, 1, 1, 0, k)
            if k < .999: c.drawRect(skia.Rect(0, -_BH / 2, _BW * k, _BH / 2), paint(BLACK, .35 * (1 - k)))
        else:
            _play(c, _book_page(col, -1), 0, 0, 1, 1, 0, -k)
            if k > -.999: c.drawRect(skia.Rect(_BW * k, -_BH / 2, 0, _BH / 2), paint(BLACK, .3 * (1 + k)))
        if u > .3:
            c.drawRect(skia.Rect(-14, -_BH / 2 + 6, 14, _BH / 2 - 6),
                       paint(shader=_cache('gutter', lambda: lgrad((-14, 0), (14, 0), [(BLACK, 0), (BLACK, .28), (BLACK, 0)])), a=seg(u, .3, .8)))
        c.restore()

# ------------------------------------------------------------------ time: calendar, yearbar, hourglass
MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
_MLEN = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
_PW, _PH = 170, 196

def _next_day(day, mon, year):
    mi = MONTHS.index(mon.upper()[:3]); n = _MLEN[mi] + (1 if mi == 1 and year and (year % 4 == 0 and (year % 100 or year % 400 == 0)) else 0)
    if day < n: return day + 1, MONTHS[mi], year
    return 1, MONTHS[(mi + 1) % 12], (year + 1 if year and mi == 11 else year)

def _cal_page(day, mon, year, col):
    def fn(cv):
        y0 = -_PH / 2 + 18
        cv.drawRect(skia.Rect.MakeXYWH(-_PW / 2, y0, _PW, 46), paint(shader=lgrad((0, y0), (0, y0 + 46), [shade(col, .05), shade(col, -.15)])))
        lab_ = mon.upper()[:3] + (' %d' % year if year else '')
        text(cv, lab_, 0, y0 + 32, 25 if year else 27, 800, WHITE, 1, 'c', track=4)
        b = skia.Rect(-_PW / 2, y0 + 46, _PW / 2, _PH / 2)
        cv.drawRect(b, paint(shader=lgrad((0, y0 + 46), (0, _PH / 2), ['#fdfcf8', '#eee9dc'])))
        text(cv, str(day), 0, y0 + 46 + 98, 92, 800, INK, 1, 'c')
        if year:
            wd = datetime.date(year, MONTHS.index(mon.upper()[:3]) + 1, day).strftime('%A').upper()
            text(cv, wd, 0, _PH / 2 - 14, 14, 800, '#6b7280', 1, 'c', track=2.5)
    return _pic(('calp', day, mon, year, col), fn, (-_PW / 2 - 2, -_PH / 2, _PW + 4, _PH + 4))

def calendar(c, x, y, a=1., day=20, mon='DEC', year=None, sc=1., col=RED, flip=0., ang=0., next=None):
    """A tear-off desk calendar page (170 x 196 at sc=1) centred at (x, y): binder with rings, a col month band
    ('DEC', or 'DEC 2025' with the weekday when year is given), the big day number. flip 0..1 turns the top page
    over its binding to reveal next = (day, mon[, year]) (default the following day; month ends roll over)."""
    if a <= 0: return
    nd = next or _next_day(day, mon, year)
    nd = tuple(nd) + (year,) * (3 - len(nd))
    fu = clamp(flip)
    with _fade(c, a, (x - 140 * sc, y - 260 * sc, x + 140 * sc, y + 150 * sc)):
        c.save(); c.translate(x, y)
        if ang: c.rotate(ang)
        c.scale(sc, sc)
        c.drawRRect(rrect(-_PW / 2 + 4, -_PH / 2 + 14, _PW, _PH, 8), paint(BLACK, .5, blur=16))
        for k in (2, 1):
            c.drawRRect(rrect(-_PW / 2 + k, -_PH / 2 + 6 + k * 3.5, _PW, _PH - 4, 6), paint(shade('#e9e3d4', -.08 * k)))
        c.save(); c.clipRRect(rrect(-_PW / 2, -_PH / 2, _PW, _PH, 6), True)
        if fu > 0: _play(c, _cal_page(nd[0], nd[1], nd[2], col))
        yt = -_PH / 2 + 18
        if fu < .5:
            kk = math.cos(math.pi * fu)
            c.save(); c.translate(0, yt); c.scale(1, kk); c.translate(0, -yt)
            _play(c, _cal_page(day, mon, year, col))
            if fu > 0: c.drawRect(skia.Rect(-_PW / 2, yt, _PW / 2, _PH / 2), paint(BLACK, .3 * (1 - kk)))
            c.restore()
        c.restore()
        if fu >= .5:                                     # the page's back, rising over the binding
            kk = -math.cos(math.pi * fu); fa = 1 - seg(fu, .7, 1)
            if fa > 0:
                c.save(); c.translate(0, yt); c.scale(1, -kk)
                c.drawRect(skia.Rect(-_PW / 2, 0, _PW / 2, _PH - 18), paint(shader=lgrad((0, 0), (0, _PH), ['#e4ddcc', '#f3efe4']), a=fa))
                c.drawRect(skia.Rect(-_PW / 2, 0, _PW / 2, _PH - 18), paint('#cfc6b0', fa, stroke=1, cap=False))
                c.restore()
        c.drawRRect(rrect(-_PW / 2, -_PH / 2, _PW, 18, 5), paint('#2a3142'))
        c.drawRRect(rrect(-_PW / 2, -_PH / 2, _PW, 18, 5), paint('#4a5672', stroke=1))
        for rx in (-44, 44):
            c.drawRRect(rrect(rx - 5, -_PH / 2 - 11, 10, 22, 5), paint(shader=_cache('ring', lambda: lgrad((-5, 0), (5, 0), ['#6b7690', '#d8deea', '#6b7690']))))
            c.drawCircle(rx, -_PH / 2 + 9, 2.4, paint('#0b1020'))
        c.restore()

def _dord(d):
    return datetime.date(*[int(v) for v in d[:3]]).toordinal() + (d[3] if len(d) > 3 else 0.)

def yearbar_x(x, w, date, start=(2025, 4, 1), end=(2026, 3, 31), extend=None, ext_k=1.):
    """Canvas x of the START of `date` (y, m, d[, fraction of the day]) on yearbar(x, w, start=..., end=...): the
    year fills w px; dates after `end` continue at the same px/day (times ext_k) into the extension."""
    o0 = _dord(start); span = _dord(end) + 1 - o0; d = _dord(date) - o0
    return x + d / span * w if d <= span else x + w + (d - span) / span * w * ext_k

def _months(d0, d1):
    """[(first-of-month-or-d0, first-of-next-month-or-d1+1, month index)] covering d0..d1 inclusive."""
    out = []; y, m = d0[0], d0[1]
    while (y, m) <= (d1[0], d1[1]):
        a0 = (y, m, 1) if (y, m) != (d0[0], d0[1]) else tuple(d0[:3])
        ny, nm = (y + 1, 1) if m == 12 else (y, m + 1)
        b0 = (ny, nm, 1) if (y, m) != (d1[0], d1[1]) else None
        out.append((a0, b0, m - 1)); y, m = ny, nm
    return out

def _dlabel(d): return '%d %s %d' % (d[2], MONTHS[d[1] - 1].title(), d[0])

def _yb_base(w, h, start, end, label, py):
    def fn(cv):
        cv.drawRRect(rrect(0, 4, w, h, 10), paint(BLACK, .4, blur=12))
        cv.drawRRect(rrect(0, 0, w, h, 10), paint('#0d1530', .92))
        cv.save(); cv.clipRRect(rrect(0, 0, w, h, 10), True)
        ms = _months(start, end); fs = min(25, h * .44)
        for i, (a0, b0, mi) in enumerate(ms):
            xa = yearbar_x(0, w, a0, start, end); xb = yearbar_x(0, w, b0, start, end) if b0 else w
            if ((i // 3) % 2) == 1: cv.drawRect(skia.Rect(xa, 0, xb, h), paint(WHITE, .035))
            if i: cv.drawLine(xa, 0, xa, h, paint(WHITE, .16 if mi % 3 else .3, stroke=1.2, cap=False))
            if xb - xa > fs * .8: text(cv, 'JFMAMJJASOND'[mi], (xa + xb) / 2, h / 2 + fs * .36, fs, 700, DIM, .78, 'c')
        cv.drawRect(skia.Rect(0, 0, w, h * .45), paint(shader=lgrad((0, 0), (0, h * .45), [(WHITE, .06), (WHITE, 0)])))
        cv.restore()
        cv.drawRRect(rrect(.5, .5, w - 1, h - 1, 10), paint(ACC, .45, stroke=1.4))
        cv.drawLine(w, -14, w, h + 14, paint(WHITE, .95, stroke=4.5))
        if label:
            text(cv, py or 'P.Y. %d-%02d' % (start[0], (start[0] + 1) % 100), w / 2, -16, 24, 800, ACC, 1, 'c', track=1.5)
            text(cv, _dlabel(start), 0, h + 32, 21, 600, DIM, .9)
            text(cv, _dlabel(end), w, h + 34, 22, 800, WHITE, 1, 'c')
    return _pic(('yb', w, h, tuple(start), tuple(end), label, py), fn, (-30, -60, w + 120, h + 120))

def yearbar(c, x, y, w, a=1., t=0., start=(2025, 4, 1), end=(2026, 3, 31), extend=None, marks=(), spans=(), h=56,
            label=True, ext_u=1., ext_k=1., ext_col='#94a3b8', ext_label='after the year', py=None, flag_h=50):
    """A horizontal timeline of the previous year, top-left (x, y), the year filling w: month letters
    (A M J J A S O N D J F M), the label 'P.Y. 2025-26' above, start date below, a bold 31 Mar end tick with its
    date. extend = (2026, 10, 31) continues it after the year (thinner, ext_col tint, ext_label above, its own end
    date; ext_u 0..1 grows it; ext_k compresses its px/day). marks = [(date, label, col, alpha[, level])] pins with
    flags above the bar (level 1, 2 stack higher); spans = [(d0, d1, label, col, alpha)] shaded intervals (inclusive
    of d1) with the label below. Use yearbar_x() for the same mapping. Returns the end-tick x."""
    xe = x + w
    if a <= 0: return xe
    with _fade(c, a, (x - 40, y - 70 - flag_h * 2, x + w * (1 + .7 * ext_k) + 160, y + h + 90)):
        _play(c, _yb_base(w, h, start, end, label, py), x, y)
        exend = None
        if extend:
            x1 = yearbar_x(x, w, tuple(extend[:3]) + (1.,), start, end, extend, ext_k); exend = x1
            xg = lerp(xe, x1, eout(clamp(ext_u)))
            if xg > xe + 2:
                eh = h * .62; ey = y + (h - eh) / 2
                c.save(); c.clipRect(skia.Rect(xe, y - 80, xg + 2, y + h + 90), True)
                c.drawRRect(rrect(xe - 10, ey, x1 - xe + 10, eh, 8), paint(ext_col, .14))
                for a0, b0, mi in _months((end[0] + (end[1] == 12), end[1] % 12 + 1, 1), extend):
                    xa = yearbar_x(x, w, a0, start, end, extend, ext_k); xb = yearbar_x(x, w, b0, start, end, extend, ext_k) if b0 else x1
                    if xa > xe + 1: c.drawLine(xa, ey, xa, ey + eh, paint(WHITE, .14, stroke=1.2, cap=False))
                    fs = min(21, eh * .5)
                    if xb - xa > fs * .8: text(c, 'JFMAMJJASOND'[mi], (xa + xb) / 2, ey + eh / 2 + fs * .36, fs, 700, ext_col, .9, 'c')
                c.drawRRect(rrect(xe - 10, ey, x1 - xe + 10, eh, 8), paint(ext_col, .6, stroke=1.3))
                c.drawLine(x1, ey - 10, x1, ey + eh + 10, paint(ext_col, .95, stroke=3))
                c.restore()
                la = seg(ext_u, .6, 1)
                if label and la > 0:
                    if ext_label: itext(c, ext_label, (xe + x1) / 2, y - 16, 22, ext_col, .95 * la, 'c')
                    text(c, _dlabel(extend), x1, y + h + 34, 21, 700, ext_col, la, 'c')
        for sp in spans:
            d0, d1, lab_, col, al = (tuple(sp) + (1.,))[:5]
            if al <= 0: continue
            xa = yearbar_x(x, w, d0, start, end, extend, ext_k); xb = yearbar_x(x, w, tuple(d1[:3]) + (1.,), start, end, extend, ext_k)
            for lo, hi, yy, hh in ((x, xe, y, h), (xe, exend or xe, y + h * .19, h * .62)):
                l2, r2 = max(xa, lo), min(xb, hi)
                if r2 - l2 > .5:
                    c.drawRect(skia.Rect(l2, yy + 4, r2, yy + hh - 4), paint(col, .34 * al))
                    c.drawLine(l2, yy + 4, r2, yy + 4, paint(col, .95 * al, stroke=2.4, cap=False))
                    c.drawLine(l2, yy + hh - 4, r2, yy + hh - 4, paint(col, .95 * al, stroke=2.4, cap=False))
            if lab_: text(c, lab_, (xa + xb) / 2, y + h + 34, 22, 800, col, al, 'c')
        for mk in marks:
            d, lab_, col, al = (tuple(mk) + (GOLD, 1.))[:4]; lvl = mk[4] if len(mk) > 4 else 0
            if al <= 0: continue
            px = yearbar_x(x, w, d, start, end, extend, ext_k); fy = y - 26 - flag_h - lvl * 46
            c.drawLine(px, fy, px, y + h + 6, paint(col, .95 * al, stroke=2.4))
            c.drawCircle(px, y + h / 2, 7, paint(col, .4 * al, blur=4)); c.drawCircle(px, y + h / 2, 4.5, paint(WHITE, al))
            if lab_:
                tw = text_w(lab_, 22, 700); fw = tw + 22; left = px + fw > x + w * (1 + .6 * ext_k * bool(extend)) + 40
                fx = px - fw if left else px
                c.drawRRect(rrect(fx, fy - 2, fw, 34, 6), paint(shade(col, -.7), .92 * al))
                c.drawRRect(rrect(fx, fy - 2, fw, 34, 6), paint(col, .95 * al, stroke=1.8))
                text(c, lab_, fx + fw / 2, fy + 23, 22, 700, WHITE, al, 'c')
    return xe

def hourglass(c, x, y, s=1., a=1., u=0., col=GOLD, ang=0.):
    """An hourglass centred at (x, y), ~96 x 160 at s=1: wooden caps, glass bulbs; sand runs from the top bulb to a
    growing mound below as u goes 0 -> 1 (a falling thread while 0 < u < 1)."""
    if a <= 0: return
    u = clamp(u); sand = shade(col, .1)
    def bulb(sg):
        pts = [(-4, 0), (-30, sg * 30), (-34, sg * 52), (-26, sg * 64), (0, sg * 66), (26, sg * 64), (34, sg * 52), (30, sg * 30), (4, 0)]
        return _cache(('hgb', sg), lambda: spath(pts, True, 3))
    with _fade(c, a, (x - 80 * s, y - 110 * s, x + 80 * s, y + 120 * s)):
        c.save(); c.translate(x, y)
        if ang: c.rotate(ang)
        c.scale(s, s)
        c.drawOval(skia.Rect.MakeXYWH(-50, 74, 100, 16), paint(BLACK, .45, blur=8))
        for sg in (-1, 1): c.drawPath(bulb(sg), paint('#9fb6d8', .14))
        top = bulb(-1); bot = bulb(1)
        if u < 1:                                        # top sand: shrinks from the top, funnels to the neck
            lvl = -66 + 60 * (1 - (1 - u) ** .6) if u > 0 else -60
            c.save(); c.clipPath(top, True); c.drawRect(skia.Rect(-40, lvl, 40, 0), paint(sand))
            c.drawOval(skia.Rect.MakeXYWH(-26 * (1 - u * .8), lvl - 4, 52 * (1 - u * .8), 8), paint(shade(sand, .2))); c.restore()
        if u > 0:
            mh = 8 + 44 * u
            c.save(); c.clipPath(bot, True)
            m = skia.Path(); m.moveTo(-40, 66); m.lineTo(-40, 66 - mh * .45); m.quadTo(0, 66 - mh * 1.25, 40, 66 - mh * .45); m.lineTo(40, 66); m.close()
            c.drawPath(m, paint(sand)); c.restore()
        if 0 < u < 1: c.drawLine(0, 0, 0, 66 - (8 + 44 * u) * .8, paint(sand, .95, stroke=2.2))
        for sg in (-1, 1):
            c.drawPath(bulb(sg), paint('#c7d6ee', .55, stroke=2))
            c.drawLine(-22, sg * 44, -26, sg * 56, paint(WHITE, .5, stroke=2.5))
        for sg in (-1, 1):
            c.drawRRect(rrect(-46, sg * 70 - 7, 92, 14, 5), paint(shader=_cache('hgcap', lambda: lgrad((0, -7), (0, 7), ['#a26a3c', '#6b4122']))))
            c.drawRRect(rrect(-46, sg * 70 - 7, 92, 14, 5), paint('#4a2c15', stroke=1))
        for px in (-40, 40): c.drawRect(skia.Rect.MakeXYWH(px - 3, -64, 6, 128), paint('#7a4c28'))
        c.restore()

# ------------------------------------------------------------------ law: heads of income, regime switch, magnifier
HEADS = (('Salaries', None, 'salary'), ('House property', None, 'house'), ('Business / profession', 'PGBP', 'shop'),
         ('Capital gains', None, 'chart'), ('Other sources', None, 'coins'))

def _drawer_parts(i, dw, h, name, sub, ic):
    fh = h - 46
    def housing(cv):
        cv.drawRRect(rrect(0, 0, dw, h, 14), paint('#1f2840'))
        cv.drawRect(_R(8, 2, dw - 16, 16), paint(shader=lgrad((0, 2), (0, 18), ['#34405e', '#1f2840'])))
        cv.drawRRect(rrect(.5, .5, dw - 1, h - 1, 14), paint('#56658a', .8, stroke=1.2))
        cv.drawRRect(rrect(10, 24, dw - 20, fh + 8, 9), paint('#070a12'))
    def front(cv):
        cv.drawRRect(rrect(0, 0, dw - 24, fh, 10), paint('#2b3654'))
        cv.drawRect(_R(6, 3, dw - 36, 22), paint(shader=lgrad((0, 3), (0, 25), ['#3d4b70', '#2b3654'])))
        cv.drawRect(_R(6, fh - 24, dw - 36, 20), paint(shader=lgrad((0, fh - 24), (0, fh - 4), ['#2b3654', '#222b44'])))
        cv.drawRRect(rrect(.5, .5, dw - 25, fh - 1, 10), paint('#6b7ca3', .7, stroke=1.2))
        cv.drawLine(10, 2, dw - 34, 2, paint(WHITE, .18, stroke=1.4))
        cx = (dw - 24) / 2
        cv.drawCircle(cx, 48, 31, paint('#141a2c')); cv.drawCircle(cx, 48, 31, paint(DIM, .3, stroke=1.4))
        icon(cv, ic, cx, 48, .7, DIM, .95, 3.4)
        hw = dw - 54; hy = 92
        cv.drawRRect(rrect(cx - hw / 2 - 4, hy - 4, hw + 8, 80, 8), paint('#8b97b0'))
        cv.drawRRect(rrect(cx - hw / 2, hy, hw, 72, 6), paint('#f3ead3'))
        fs = 24; lines = wrap(name, fs, hw - 14, 800)
        if len(lines) > 2: fs = 21; lines = wrap(name, fs, hw - 10, 800)
        for k, ln in enumerate(lines[:2]):
            text(cv, ln, cx, hy + 36 + (k - (len(lines[:2]) - 1) / 2) * fs * 1.15 + fs * .35, fs, 800, INK, 1, 'c')
        if sub:
            sw = text_w(sub, 22, 800) + 30
            cv.drawRRect(rrect(cx - sw / 2, hy + 86, sw, 32, 16), paint('#2a1f05', .9))
            cv.drawRRect(rrect(cx - sw / 2, hy + 86, sw, 32, 16), paint(GOLD, .9, stroke=1.8))
            text(cv, sub, cx, hy + 86 + 24, 22, 800, GOLD, 1, 'c')
        cv.drawRRect(rrect(cx - 44, fh - 30, 88, 18, 9), paint(BLACK, .45, blur=4))
        cv.drawRRect(rrect(cx - 44, fh - 34, 88, 18, 9), paint(shader=lgrad((0, fh - 34), (0, fh - 16), ['#d5dbe7', '#7d879c'])))
    return (_pic(('drh', dw, h), housing, (-10, -10, dw + 20, h + 20)),
            _pic(('drf', dw, h, name, sub, ic), front, (-10, -10, dw + 20, h + 20)))

def heads5(c, x, y, w, a=1., hl=None, t=0., open_=None, h=300, labels=None):
    """Five heads of income as filing-cabinet drawers side by side, top-left (x, y), total width w, height h:
    Salaries · House property · Business / profession (PGBP) · Capital gains · Other sources, each with an icon
    and a cream label card. hl = index or {index: alpha} glows gold; open_ = {index: 0..1} pulls a drawer out
    (its open top shows folders). labels = 5 (name, sub, icon) overrides. Returns the drawer mouth centres."""
    heads = labels or HEADS; gap = 18; dw = (w - 4 * gap) / 5; fh = h - 46
    hl = ({hl: 1.} if isinstance(hl, (int, float)) and not isinstance(hl, bool) else dict(hl or {}))
    op = dict(open_ or {}); mouths = []
    for i in range(5):
        o = ease(clamp(op.get(i, 0.))); mouths.append((x + i * (dw + gap) + dw / 2, y + 30 + 30 * o))
    if a <= 0: return mouths
    with _fade(c, a, (x - 40, y - 40, x + w + 40, y + h + 120)):
        _nshadow(c, x - 14, y + h - 10, w + 28, 22, 7, 10, .5, 6)
        c.drawRRect(rrect(x - 14, y + h - 10, w + 28, 22, 7), paint('#2a3450'))
        c.drawLine(x - 8, y + h - 9, x + w + 8, y + h - 9, paint('#4a5878', stroke=1.4, cap=False))
        for i in range(5):
            name, sub, ic = heads[i]; X = x + i * (dw + gap)
            H, F = _drawer_parts(i, dw, h, name, sub, ic)
            o = ease(clamp(op.get(i, 0.))); g = clamp(hl.get(i, 0.))
            c.save(); c.translate(X, y); c.drawPicture(H); c.restore()
            if o > 0:                                        # the open drawer's interior: folders
                ix, iy, iw, ih = X + 12, y + 26, dw - 24, 60 * o + 6
                c.save(); c.clipRect(skia.Rect.MakeXYWH(ix, iy, iw, ih), True)
                c.drawRect(skia.Rect.MakeXYWH(ix, iy, iw, ih), paint(shader=lgrad((0, iy), (0, iy + 66), ['#05070c', '#1c2436'])))
                for k in range(6):
                    fx = ix + 12 + k * (iw - 24) / 6
                    c.drawRRect(rrect(fx, iy + ih - 34 + (k % 2) * 4, (iw - 24) / 6 - 4, 40, 4), paint(('#e9dcb8', '#d7c38f', '#c9d6ea')[k % 3], .9))
                c.restore()
            k = 1 + .045 * o; fy = y + 26 + 62 * o; fx = X + 12
            if g > 0:
                c.drawRRect(rrect(fx - 6, fy - 6, (dw - 24) * k + 12, fh * k + 12, 14), paint(GOLD, .55 * g, stroke=8, blur=10))
            c.save(); c.translate(X + dw / 2, fy); c.scale(k, k); c.translate(-(dw - 24) / 2, 0)
            if o > 0: _nshadow(c, 0, 0, dw - 24, fh, 10, 10, .5 * o, 10)
            c.drawPicture(F)
            if g > 0:
                cx = (dw - 24) / 2
                c.drawRRect(rrect(.5, .5, dw - 25, fh - 1, 10), paint(GOLD, .95 * g, stroke=2.6))
                c.drawCircle(cx, 48, 31, paint('#2a1f05', .9 * g)); c.drawCircle(cx, 48, 31, paint(GOLD, g, stroke=2))
                icon(c, ic, cx, 48, .7, GOLD, g, 3.4)
                c.drawRRect(rrect(cx - (dw - 54) / 2, 92, dw - 54, 72, 6), paint(GOLD, .3 * g, blend='Multiply'))
            c.restore()
    return mouths

def regime_switch(c, x, y, a=1., pos=0., t=0., sc=1., left=('Default', '115BAC'), right=('Opted out', 'old regime')):
    """A big two-position toggle (560 x 112 at sc=1) centred at (x, y): left 'Default · 115BAC', right 'Opted out';
    pos 0..1 slides the knob; the active side glows (default ACC, opted-out GOLD) with a slow pulse (t)."""
    if a <= 0: return
    W_, H_ = 560, 112; p = ease(clamp(pos)); kc = mixc(ACC, GOLD, p); kw = W_ / 2 - 8
    with _fade(c, a, (x - (W_ / 2 + 60) * sc, y - (H_ / 2 + 60) * sc, x + (W_ / 2 + 60) * sc, y + (H_ / 2 + 60) * sc)):
        c.save(); c.translate(x, y); c.scale(sc, sc)
        def track(cv):
            cv.drawRRect(rrect(-W_ / 2, -H_ / 2 + 10, W_, H_, H_ / 2), paint(BLACK, .5, blur=18))
            cv.drawRRect(rrect(-W_ / 2, -H_ / 2, W_, H_, H_ / 2), paint('#070b18'))
            cv.drawRRect(rrect(-W_ / 2, -H_ / 2, W_, H_, H_ / 2), paint(shader=lgrad((0, -H_ / 2), (0, H_ / 2), [(BLACK, .5), (BLACK, 0)], [0, .4])))
            cv.drawRRect(rrect(-W_ / 2 + .5, -H_ / 2 + .5, W_ - 1, H_ - 1, H_ / 2), paint(WHITE, .16, stroke=1.4))
        _play(c, _pic(('rstrack',), track, (-W_ / 2 - 50, -H_ / 2 - 50, W_ + 100, H_ + 110)))
        kx = lerp(-W_ / 2 + 6, 2, p); pu = .5 + .5 * math.sin(t * 2.2)
        for gc, ga_ in ((ACC, 1 - p), (GOLD, p)):
            if ga_ > .01:
                _play(c, _pic(('rsglow', gc), lambda cv, gc=gc: cv.drawRRect(rrect(-4, -H_ / 2 + 2, kw + 8, H_ - 4, (H_ - 4) / 2), paint(gc, 1, blur=14)),
                              (-50, -H_ / 2 - 45, kw + 100, H_ + 90)), kx, 0, 1, (.35 + .15 * pu) * ga_)
        c.drawRRect(rrect(kx, -H_ / 2 + 6, kw, H_ - 12, (H_ - 12) / 2), paint(shader=lgrad((0, -H_ / 2), (0, H_ / 2), [shade(kc, .3), shade(kc, -.12)])))
        c.drawRRect(rrect(kx + 1, -H_ / 2 + 7, kw - 2, H_ - 14, (H_ - 14) / 2), paint(WHITE, .45, stroke=1.2))
        for sx, (t1, t2), act in ((-W_ / 4, left, 1 - p), (W_ / 4, right, p)):
            col = mixc(DIM, '#0b1020', act); col2 = mixc('#8f9bb8', '#1f2a44', act)
            text(c, t1, sx, (-2 if t2 else 11), 31, 800, col, 1, 'c')
            if t2: text(c, t2, sx, 30, 21, 700, col2, 1, 'c')
        c.restore()

def magnifier(c, x, y, r=60, a=1., ang=-35, fn=None, col='#c3cde0'):
    """A magnifying glass, lens centred at (x, y), radius r; the handle points down-right (ang tilts it; -35 =
    handle at 4-5 o'clock). fn(c) draws content inside the lens (clipped, e.g. a zoomed number)."""
    if a <= 0: return
    hd = math.radians(90 + ang); hx, hy = math.cos(hd), math.sin(hd)
    with _fade(c, a, (x - r * 2.8, y - r * 2.8, x + r * 2.8, y + r * 2.8)):
        c.drawCircle(x + 6, y + 12, r * 1.1, paint(BLACK, .35, blur=r * .25))
        c.save(); c.translate(x, y); c.rotate(math.degrees(hd) - 90)
        c.drawRRect(rrect(-r * .15 + 4, r * 1.06 + 8, r * .3, r * 1.25, r * .12), paint(BLACK, .4, blur=8))
        c.drawRRect(rrect(-r * .12, r * .98, r * .24, r * .26, r * .05), paint(shader=lgrad((-r * .12, 0), (r * .12, 0), ['#6b7690', '#e2e8f0', '#6b7690'])))
        c.drawRRect(rrect(-r * .16, r * 1.2, r * .32, r * 1.2, r * .14), paint(shader=lgrad((-r * .16, 0), (r * .16, 0), ['#1f2937', '#4b5563', '#111827'])))
        c.drawRRect(rrect(-r * .16, r * 1.2, r * .32, r * 1.2, r * .14), paint(BLACK, .6, stroke=1.2))
        c.restore()
        c.drawCircle(x, y, r, paint(shader=rgrad(x - r * .3, y - r * .3, r * 1.3, [('#bfe6ff', .22), ('#7dd3fc', .08)])))
        if fn:
            c.save(); pth = skia.Path(); pth.addCircle(x, y, r * .94); c.clipPath(pth, True); fn(c); c.restore()
        pa = skia.Path(); pa.addArc(skia.Rect.MakeXYWH(x - r * .72, y - r * .72, r * 1.44, r * 1.44), 200, 60)
        c.drawPath(pa, paint(WHITE, .55, stroke=r * .07))
        c.drawCircle(x, y, r, paint(shader=lgrad((x - r, y - r), (x + r, y + r), ['#e5ebf5', '#6b7690', '#c3cde0']), stroke=r * .14))
        c.drawCircle(x, y, r * 1.07, paint(BLACK, .3, stroke=1.2))

# ------------------------------------------------------------------ the machine: conveyor, scanner, PGBP machine
class Pts(list):
    """A list of points with extra named attributes (e.g. machine(...).port)."""
    pass

def conveyor(c, x0, x1, y, a=1., t=0., speed=80., h=26, legs=True):
    """A side-view belt conveyor from x0 to x1, belt top at y: end rollers turning, treads moving right at speed
    px/s (negative = left), a steel side rail and legs. Items ride at y."""
    if a <= 0: return
    r = h / 2; ph = -(t * speed)
    with _fade(c, a, (x0 - h - 30, y - 30, x1 + h + 30, y + h + 110)):
        if legs:
            c.drawOval(skia.Rect(x0 - 20, y + h + 74, x1 + 20, y + h + 92), paint(BLACK, .45, blur=12))
            n = max(2, int((x1 - x0) / 260) + 1)
            for k in range(n):
                lx = lerp(x0 + 24, x1 - 24, k / (n - 1))
                c.drawRect(skia.Rect(lx - 6, y + h, lx + 6, y + h + 80), paint(shader=lgrad((lx - 6, 0), (lx + 6, 0), ['#2b3448', '#56617c', '#2b3448'])))
                c.drawRRect(rrect(lx - 16, y + h + 76, 32, 8, 3), paint('#3a4356'))
        c.drawRRect(rrect(x0 - r, y, x1 - x0 + 2 * r, 2 * r, r), paint('#141925'))
        for rx in (x0, x1):
            c.drawCircle(rx, y + r, r * .78, paint('#5b667f')); c.drawCircle(rx, y + r, r * .78, paint('#2a3142', stroke=1.4))
            for k in range(3):
                an = ph / r + k * math.tau / 3
                c.drawLine(rx, y + r, rx + math.cos(an) * r * .62, y + r + math.sin(an) * r * .62, paint('#2a3142', stroke=2.2))
            c.drawCircle(rx, y + r, r * .2, paint('#c3cad8'))
        c.drawRect(skia.Rect(x0 - r, y, x1 + r, y + 7), paint('#252c3b'))
        tp = paint('#3e475c', 1, stroke=5, cap=False); tp.setPathEffect(skia.DashPathEffect.Make([6, 16], ph % 22))
        c.drawLine(x0 - r * .5, y + 3.5, x1 + r * .5, y + 3.5, tp)
        c.drawLine(x0 - r * .7, y + .8, x1 + r * .7, y + .8, paint(WHITE, .18, stroke=1.2, cap=False))
        c.drawRRect(rrect(x0 + r * .4, y + 8, x1 - x0 - r * .8, h + 4, 5),
                    paint(shader=lgrad((0, y + 8), (0, y + h + 12), ['#3b4763', '#1e2638'])))
        c.drawRRect(rrect(x0 + r * .4, y + 8, x1 - x0 - r * .8, h + 4, 5), paint('#64739a', .6, stroke=1.2))
        bp = paint('#8b96ad', .7)
        for bx in np.arange(x0 + 30, x1 - 10, 70): c.drawCircle(bx, y + 8 + (h + 4) / 2, 2.4, bp)

def _st_col(state):
    return mixc(ACC, GREEN, state) if state > 0 else mixc(ACC, RED, -state) if state < 0 else rgb(ACC)

def scanner_back(c, x, y, a=1., label='40A(3)', state=0., t=0., h=240, w=150):
    """Back half of the airport-style scanner gate standing over a belt at x (y = belt top): the tunnel's back wall
    with a sweeping scan beam. Draw scanner_back, then the items, then scanner_front."""
    if a <= 0: return
    col = _st_col(state); pw, bh = 26, 58; fl = abs(state)
    ix0, ix1, iy0, iy1 = x - w / 2 + pw, x + w / 2 - pw, y - h + bh, y + 34
    with _fade(c, a, (x - w, y - h - 20, x + w, y + 120)):
        c.drawRect(skia.Rect(ix0, iy0, ix1, iy1), paint(shader=lgrad((0, iy0), (0, iy1), ['#0a1226', '#111a33'])))
        c.drawRect(skia.Rect(ix0, iy0, ix1, iy1), paint(col, .1 + .22 * fl))
        sx = lerp(ix0 + 6, ix1 - 6, .5 + .5 * math.sin(t * 2.4))
        c.drawRect(skia.Rect(sx - 10, iy0, sx + 10, iy1), paint(col, .16 + .2 * fl, blur=8))
        c.drawLine(sx, iy0 + 4, sx, iy1 - 4, paint(col, .55 + .3 * fl, stroke=2))
        gp = paint(WHITE, .05, stroke=1, cap=False)
        for gy in np.arange(iy0 + 18, iy1, 22): c.drawLine(ix0, gy, ix1, gy, gp)

def scanner_front(c, x, y, a=1., label='40A(3)', state=0., t=0., h=240, w=150):
    """Front half of the scanner gate (pillars, top housing with the lit label plate, entry curtain, glass sheen;
    state 0 idle ACC, +1 pass flashes green, -1 reject flashes red with a turning beacon)."""
    if a <= 0: return
    col = _st_col(state); pw, bh = 26, 58; fl = abs(state)
    with _fade(c, a, (x - w - 40, y - h - 120, x + w + 40, y + 120)):
        ix0, ix1, iy0 = x - w / 2 + pw, x + w / 2 - pw, y - h + bh
        c.drawRect(skia.Rect(ix0, iy0, ix1, y + 34), paint(shader=lgrad((ix0, 0), (ix1, 0), [(WHITE, .07), (WHITE, .0), (WHITE, .04)])))
        sp = paint('#9fb3d6', .16, stroke=7, cap=False)
        for k in range(4): c.drawLine(ix0 + 6 + k * 9, iy0 + 2, ix0 + 6 + k * 9, iy0 + 46 + (k % 2) * 8, sp)
        for px in (x - w / 2, x + w / 2 - pw):
            c.save(); c.translate(px, 0)
            c.drawRRect(rrect(0, y - h, pw, h + 72, 8), paint(shader=_cache(('pil', pw), lambda: lgrad((0, 0), (pw, 0), ['#4a5778', '#283048']))))
            c.drawRRect(rrect(.5, y - h, pw - 1, h + 72, 8), paint('#6b7aa0', .6, stroke=1.2))
            c.restore()
        for px in (ix0 - 3, ix1 + 3):
            c.drawLine(px, iy0 + 6, px, y + 30, paint(col, .3 + .4 * fl, stroke=6, blur=4))
            c.drawLine(px, iy0 + 6, px, y + 30, paint(col, .7 + .3 * fl, stroke=2))
        c.drawRRect(rrect(x - w / 2 - 6, y - h - 4, w + 12, bh + 4, 12), paint(shader=_cache(('sch', w), lambda: lgrad((0, -bh), (0, 0), ['#56648a', '#2c344c']))))
        c.drawRRect(rrect(x - w / 2 - 6, y - h - 4, w + 12, bh + 4, 12), paint('#7d8bb0', .7, stroke=1.2))
        lab_ = ('§ ' + label) if label and label[:1].isdigit() else label
        if lab_:
            tw = text_w(lab_, 25, 800); lw = max(tw + 30, w * .7)
            c.drawRRect(rrect(x - lw / 2, y - h + 6, lw, bh - 16, 8), paint('#060a14'))
            c.drawRRect(rrect(x - lw / 2, y - h + 6, lw, bh - 16, 8), paint(col, .7, stroke=1.6))
            text(c, lab_, x, y - h + 6 + (bh - 16) / 2 + 9, 25, 800, col, 1, 'c', shadow=0)
            text(c, lab_, x, y - h + 6 + (bh - 16) / 2 + 9, 25, 800, col, .35 + .3 * fl, 'c')
        if state < -.05:                                  # reject beacon: a red dome with a turning highlight
            bx, by = x, y - h - 4; g = -state; pu = .5 + .5 * math.sin(t * 9)
            c.drawCircle(bx, by - 10, 34 + 10 * pu, paint(RED, (.18 + .2 * pu) * g, blur=14))
            c.drawRRect(rrect(bx - 18, by - 7, 36, 9, 3), paint('#2a3142'))
            dome = skia.Path(); dome.addArc(skia.Rect(bx - 14, by - 24, bx + 14, by + 4), 180, 180); dome.close()
            c.drawPath(dome, paint(shade(RED, -.15), g))
            hx = bx + 9 * math.sin(t * 7)
            c.save(); c.clipPath(dome, True); c.drawRect(skia.Rect(hx - 4, by - 26, hx + 4, by), paint(WHITE, .65 * g)); c.restore()

def scanner(c, x, y, a=1., label='40A(3)', state=0., t=0., h=240, w=150):
    """scanner_back + scanner_front in one call (when nothing needs to pass through it)."""
    scanner_back(c, x, y, a, label, state, t, h, w); scanner_front(c, x, y, a, label, state, t, h, w)

STAGES = ('Net profit', '+ Disallowed', '− Allowed, not in books', '− Other heads', '+ Deemed income')

def machine(c, x, y, w, h, a=1., t=0., stages=None, active=None, done=None, out='= PGBP', hopper=True):
    """The five-stage PGBP machine, top-left (x, y), w x h: a long steel housing with chambers left -> right
    (default STAGES), a feed hopper over the first and an output port (out) at the right end. active = stage index
    (a float glides the highlight) lights that chamber gold with gears spinning; done = set of indices with a green
    tick. Returns Pts of the chamber centres, with .port (port centre) and .hopper (hopper mouth)."""
    stages = stages or STAGES; n = len(stages); pw = min(200., w * .14); m, g = 26, 20
    cw = (w - pw - 2 * m - (n - 1) * g) / n; ch = h - 34 - 104
    cen = Pts((x + m + cw / 2 + i * (cw + g), y + 26 + ch / 2) for i in range(n))
    cen.port = (x + w - pw / 2 + 6, y + h * .5); cen.hopper = (cen[0][0], y - 8)
    if a <= 0: return cen
    done = set(done or ())
    with _fade(c, a, (x - 40, y - 110, x + w + 60, y + h + 50)):
        def stage_art(cv, i, lab_, gl, tt):
            cx = cen[i][0] - x; wy = 26; wx = cx - cw / 2
            sg = lab_[:1] if lab_[:1] in '+−-=' else None
            txt = lab_[1:].strip() if sg else lab_
            cv.drawRRect(rrect(wx, wy, cw, ch, 18), paint(mixc('#3d4a6a', GOLD, gl), .9, stroke=2))
            gs = min(cw, ch) * .2; gx, gy = cx - gs * .55, wy + ch * .66; gc = mixc('#2f3a55', GOLD, gl)
            for (ox, oy, rr, dirn) in ((0, 0, gs, 1), (gs * 1.55, -gs * .45, gs * .68, -1.47)):
                cv.save(); cv.translate(gx + ox, gy + oy); cv.rotate(tt * 70 * dirn * gl + (12 if dirn < 0 else 0))
                cv.drawPath(_gear_path(10 if dirn > 0 else 7, rr), paint(gc, .55 + .45 * gl)); cv.restore()
            sc_ = GREEN if sg == '+' else RED if sg in ('−', '-') else GOLD if sg == '=' else DIM
            if sg: text(cv, '−' if sg == '-' else sg, cx, wy + ch * .34 + 22, 64, 800, sc_, .45 + .55 * max(gl, .4), 'c')
            else: icon(cv, 'doc', cx, wy + ch * .32, .9, mixc(DIM, GOLD, gl), .55 + .45 * gl)
            fs = 24; lines = wrap(txt, fs, cw - 22, 800)
            if len(lines) > 2: fs = 21; lines = wrap(txt, fs, cw - 18, 800)[:3]
            for k, ln in enumerate(lines):
                text(cv, ln, cx, h - 64 + (k - (len(lines) - 1) / 2) * fs * 1.13 + fs * .34, fs, 800, mixc(DIM, WHITE, max(gl, .5)), 1, 'c')
        def body(cv):
            if hopper:
                hx = m + cw / 2
                P = poly(np.array([(hx - 86, -78), (hx + 86, -78), (hx + 40, 8), (hx - 40, 8)]))
                cv.drawPath(P, paint(shader=lgrad((0, -78), (0, 8), ['#3c4867', '#1d2438'])))
                cv.drawPath(P, paint('#6b7aa0', .7, stroke=1.4))
                cv.drawRRect(rrect(hx - 92, -86, 184, 12, 5), paint('#56648a'))
            cv.drawRRect(rrect(0, 0, w - pw + 24, h, 30), paint('#1e2740'))
            cv.save(); cv.clipRRect(rrect(0, 0, w - pw + 24, h, 30), True)
            cv.drawRect(_R(0, 0, w - pw + 24, 26), paint(shader=lgrad((0, 0), (0, 26), ['#36436a', '#1e2740'])))
            cv.drawRect(_R(0, h - 22, w - pw + 24, 22), paint('#161d31')); cv.restore()
            cv.drawRRect(rrect(.5, .5, w - pw + 23, h - 1, 30), paint('#5d6c92', .8, stroke=1.4))
            for bx in np.arange(26, w - pw + 10, 46): cv.drawCircle(bx, 12, 2.3, paint('#8d98b3', .6))
            for i in range(n):
                cx = m + cw / 2 + i * (cw + g)
                if i < n - 1:
                    px = cx + cw / 2; cv.drawRRect(rrect(px - 4, 26 + ch * .45, g + 8, 18, 6), paint('#3a4565'))
                    cv.drawRRect(rrect(px - 4, 26 + ch * .45, g + 8, 18, 6), paint('#6b7aa0', .5, stroke=1))
                cv.drawRRect(rrect(cx - cw / 2, 26, cw, ch, 18), paint('#05080f'))
                cv.drawLine(cx - cw / 2 + 16, 29, cx + cw / 2 - 16, 29, paint(WHITE, .1, stroke=2))
                cv.drawRRect(rrect(cx - cw / 2 + 4, h - 104, cw - 8, 80, 12), paint('#0e1426'))
                stage_art(cv, i, stages[i], 0., 0.)
            P = poly(np.array([(w - pw + 4, h * .22), (w - 6, h * .3), (w - 6, h * .7), (w - pw + 4, h * .78)]))
            cv.drawPath(P, _cpaint('#24304c', 1, 10)); cv.drawPath(P, paint(GOLD, .7, stroke=2))
            text(cv, out, cen.port[0] - x - 4, cen.port[1] - y + 12, 32, 800, GOLD, 1, 'c')
        cv_key = ('mach', round(w, 1), round(h, 1), tuple(stages), hopper, out)
        _nshadow(c, x, y, w - pw + 24, h, 30, 12, .55, 12)
        c.save(); c.translate(x, y); c.drawPicture(_pic(cv_key, body, (-20, -100, w + 60, h + 140)))
        for i, lab_ in enumerate(stages):
            gl = clamp(1 - abs(i - active)) if active is not None else 0.
            cx = cen[i][0] - x; wx, wy = cx - cw / 2, 26
            if gl > .002:
                c.drawRRect(rrect(wx, wy, cw, ch, 18), paint('#05080f'))
                c.drawRRect(rrect(cx - cw / 2 + 4, h - 104, cw - 8, 80, 12), paint('#0e1426'))
                c.drawRRect(rrect(wx, wy, cw, ch, 18), paint(GOLD, .12 * gl))
                c.drawRRect(rrect(wx - 3, wy - 3, cw + 6, ch + 6, 20), paint(GOLD, .6 * gl, stroke=7, blur=8))
                stage_art(c, i, lab_, gl, t)
            if i in done:
                bx, by = wx + cw - 16, wy + 16
                c.drawCircle(bx, by, 17, paint('#052e16')); c.drawCircle(bx, by, 17, paint(GREEN, stroke=2.4))
                pp = skia.Path(); pp.moveTo(bx - 7, by); pp.lineTo(bx - 2, by + 6); pp.lineTo(bx + 8, by - 6); c.drawPath(pp, paint(GREEN, stroke=3.2))
        pg = clamp(active - (n - 1)) if active is not None else 0.
        if pg > 0:
            P = poly(np.array([(w - pw + 4, h * .22), (w - 6, h * .3), (w - 6, h * .7), (w - pw + 4, h * .78)]))
            c.drawPath(P, paint(GOLD, .5 * pg, stroke=8, blur=8)); c.drawPath(P, paint(GOLD, .16 * pg))
        c.restore()
    return cen

# ------------------------------------------------------------------ block of assets: tank, bucket
def _wave(x0, x1, ys, t, amp, n=36):
    xs = np.linspace(x0, x1, n); k = (xs - x0) / max(x1 - x0, 1)
    yy = ys + amp * (np.sin(k * 7.5 + t * 2.6) * .6 + np.sin(k * 13 - t * 3.7) * .4)
    return np.stack([xs, yy], 1)

def tank(c, x, y, w, h, a=1., t=0., level=.5, cap=1., label='Plant & machinery · 15%', amount=None, col=ACC,
         inflow=0., outflow=0., crack=0., ghost=0., floor_glow=0., layers=None, floor_label='never below zero',
         floor_col=GOLD, marks=(), drain_to=None, sub=None):
    """A glass tank (a block of assets), top-left (x, y), w x h on a steel plinth: liquid of height level/cap of
    the inner height with an animated wavy surface; amount -> rupee() tag beside the surface; inflow 0..1 = a
    stream from a pipe at the top-left; outflow 0..1 = a tap at the bottom right draining a stream (to drain_to =
    (x, y), default straight down); floor_glow lights the zero line (floor_label); crack 0..1 cracks the glass and
    stamps CEASED; ghost 0..1 fades the glass to a dashed outline; layers = [(fraction, col, label)] stacked
    bottom-first; marks = [(level, label, col)] dashed level lines. label (+ sub) under the plinth.
    Returns (centre x, surface y, (ix, iy, iw, ih) inner rect)."""
    ix, iy, iw, ih = x + 10, y + 16, w - 20, h - 26
    lv = clamp(level / cap if cap else 0.); ys = iy + ih - ih * lv
    res = (x + w / 2, ys, (ix, iy, iw, ih))
    if a <= 0: return res
    ga = 1 - clamp(ghost); act = clamp(inflow + outflow)
    with _fade(c, a, (x - 220, y - 140, x + w + 330, y + h + 260)):
        c.drawRRect(rrect(x - 14, y + h - 2, w + 28, 26, 8), paint(BLACK, .5 * ga, blur=14))
        c.drawRRect(rrect(x - 14, y + h - 6, w + 28, 22, 7), paint(shader=lgrad((0, y + h - 6), (0, y + h + 16), ['#46536f', '#1d2436']), a=ga))
        c.drawRRect(rrect(x, y, w, h, 18), paint('#0a1328', .62 * ga))
        inner = rrect(ix, iy, iw, ih, 10)
        if lv > 0 and ga > 0:
            c.save(); c.clipRRect(inner, True)
            amp = (3.5 + 5 * act) * min(1., lv * ih / 30)
            W_ = _wave(ix - 2, ix + iw + 2, ys, t, amp)
            if layers:
                tot = sum(f for f, _, _ in layers) or 1.; yb = iy + ih
                for j, (f, lc, ll) in enumerate(layers):
                    hh = ih * lv * f / tot; yt = yb - hh
                    if j == len(layers) - 1:
                        P = poly(np.vstack([W_, [(ix + iw + 2, yb), (ix - 2, yb)]]))
                    else:
                        P = skia.Path(); P.addRect(skia.Rect(ix - 2, yt, ix + iw + 2, yb))
                    c.drawPath(P, paint(shader=lgrad((0, yt), (0, yb), [(shade(lc, .05), .88 * ga), (shade(lc, -.4), .95 * ga)])))
                    if j > 0: c.drawLine(ix, yb, ix + iw, yb, paint(WHITE, .5 * ga, stroke=2, cap=False))
                    if ll and hh > 30:
                        l2, fs, _ = _fit(ll, 24 if hh > 44 else 21, 800, iw - 18, 16)
                        text(c, l2, ix + iw / 2, (max(yt, ys) + yb) / 2 + fs * .36, fs, 800, WHITE, ga, 'c', shadow=6)
                    yb = yt
            else:
                P = poly(np.vstack([W_, [(ix + iw + 2, iy + ih + 2), (ix - 2, iy + ih + 2)]]))
                c.drawPath(P, paint(shader=lgrad((0, ys), (0, iy + ih), [(shade(col, .05), .85 * ga), (shade(col, -.5), .95 * ga)])))
            c.drawPath(poly(W_, False), paint(shade(col if not layers else layers[-1][1], .55), .85 * ga, stroke=2.4))
            for k in range(5):                                   # bubbles
                by = iy + ih - ((t * 30 + k * 47) % max(ih * lv, 1)); bx = ix + iw * (.15 + .7 * hsh(k, 3))
                if by > ys + 6: c.drawCircle(bx + 3 * math.sin(t * 2 + k), by, 2 + k % 3, paint(WHITE, .22 * ga, stroke=1.2))
            c.restore()
        for lvl_, ll, lc in marks:
            my = iy + ih - ih * clamp(lvl_ / cap)
            dp = paint(lc, .9 * ga, stroke=2.2, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 7], 0))
            c.drawLine(ix - 6, my, ix + iw + 6, my, dp)
            if ll: text(c, ll, x - 14, my + 8, 22, 800, lc, ga, 'r')
        tp = paint(WHITE, .25 * ga, stroke=1.4, cap=False)
        for k in range(1, 10):
            ty_ = iy + ih * k / 10; c.drawLine(ix + iw - (16 if k == 5 else 9), ty_, ix + iw, ty_, tp)
        c.drawRRect(rrect(x + 14, y + 22, 12, h - 44, 6), paint(shader=_cache(('tkhl', h), lambda: lgrad((0, 0), (0, h), [(WHITE, .22), (WHITE, .04)])), a=ga))
        c.drawRRect(rrect(x + 32, y + 22, 5, h - 44, 2.5), paint(WHITE, .08 * ga))
        bc = mixc(col, '#94a3b8', clamp(crack * 1.5))
        c.drawRRect(rrect(x, y, w, h, 18), paint(bc, .6 * ga, stroke=2.4))
        c.drawRRect(rrect(x - 6, y - 4, w + 12, 14, 7), paint(shader=_cache('tklip', lambda: lgrad((0, -4), (0, 10), ['#9fb0cc', '#4b5875'])), a=ga))
        if ghost > 0:
            dp = paint(DIM, .7 * ghost, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
            c.drawRRect(rrect(x, y, w, h, 18), dp)
        if floor_glow > 0:
            fy = iy + ih
            c.drawLine(ix + 4, fy, ix + iw - 4, fy, paint(floor_col, .7 * floor_glow, stroke=10, blur=8))
            c.drawLine(ix + 4, fy, ix + iw - 4, fy, paint(floor_col, floor_glow, stroke=3.2))
            text(c, '0', ix - 20, fy + 8, 22, 800, floor_col, floor_glow, 'r')
            if floor_label: itext(c, floor_label, x + w / 2, y + h - 22, 22, floor_col, floor_glow, 'c', 700)
        if inflow > 0:
            px, py = ix + iw * .28, y - 46
            c.save(); c.translate(0, py); c.drawRRect(rrect(x - 170, -12, px - x + 182, 24, 10), paint(shader=_cache('pipeh', lambda: lgrad((0, -12), (0, 12), ['#7d8aa8', '#3a4560'])))); c.restore()
            c.drawRRect(rrect(px - 14, py - 12, 28, 44, 8), paint('#56637f'))
            sw_ = 16 * clamp(inflow); s0 = py + 32
            if sw_ > .5:
                c.drawRect(skia.Rect(px - sw_ / 2, s0, px + sw_ / 2, ys), paint(shader=lgrad((px - sw_ / 2, 0), (px + sw_ / 2, 0), [shade(col, -.1), shade(col, .45), shade(col, -.1)]), a=.95))
                dp = paint(WHITE, .35, stroke=sw_ * .35, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 14], -(t * 220) % 24))
                c.drawLine(px, s0, px, ys, dp)
                for k in range(3):
                    q = (t * 1.6 + k / 3) % 1
                    c.drawOval(skia.Rect.MakeXYWH(px - (10 + 26 * q) * inflow, ys - 4 - 3 * q, (20 + 52 * q) * inflow, 8 + 4 * q), paint(WHITE, .45 * (1 - q) * inflow, stroke=1.6))
        if outflow > 0:
            tx, ty_ = x + w, y + h - 34
            c.drawRRect(rrect(tx - 6, ty_ - 9, 56, 18, 6), paint('#6b7896'))
            c.drawRRect(rrect(tx + 34, ty_ - 9, 16, 30, 5), paint('#56637f'))
            c.drawLine(tx + 22, ty_ - 9, tx + 22, ty_ - 26, paint('#8b97b0', stroke=4)); c.drawLine(tx + 10, ty_ - 26, tx + 34, ty_ - 26, paint('#c3cad8', stroke=5))
            sw_ = 13 * clamp(outflow); sx0, sy0 = tx + 42, ty_ + 21
            ex, ey = drain_to if drain_to else (sx0 + 30, sy0 + 150)
            if sw_ > .5 and lv > 0:
                q = np.linspace(0, 1, 25); P = np.stack([sx0 + (ex - sx0) * q, sy0 + (ey - sy0) * q ** 2], 1)
                for j in range(4):                                    # tapering, slightly translucent water
                    sl = poly(P[j * 6:j * 6 + 7], False); wj = sw_ * (1 - .14 * j)
                    c.drawPath(sl, paint(shade(col, .2), .55 - .06 * j, stroke=wj, cap=False))
                    c.drawPath(sl, paint(shade(col, .55), .55 - .06 * j, stroke=wj * .4, cap=False))
                dp = paint(WHITE, .5, stroke=sw_ * .22, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([6, 22], -(t * 300) % 28))
                c.drawPath(poly(P, False), dp)
                for k in range(3):
                    qq = (t * 1.8 + k / 3) % 1
                    c.drawOval(skia.Rect.MakeXYWH(ex - (6 + 18 * qq) * outflow, ey - 3 - 2 * qq, (12 + 36 * qq) * outflow, 6 + 3 * qq), paint(WHITE, .4 * (1 - qq) * outflow, stroke=1.4))
        if crack > 0:
            cp = paint('#e2e8f0', .9 * ga, stroke=2); cp2 = paint('#e2e8f0', .6 * ga, stroke=1.3)
            ox, oy = x + w * .7, y + h * .28
            for k, (an, L) in enumerate(((2.5, .55), (.4, .42), (1.7, .5), (3.6, .38), (-.6, .3), (2.1, .33))):
                cu = seg(crack, k * .09, k * .09 + .35)
                if cu <= 0: continue
                Lk = L * min(w, h) * cu; pts = [(ox, oy)]
                for j in range(1, 6):
                    q = j / 5; jit = (hsh(k * 7 + j, 4) - .5) * .8
                    pts.append((ox + math.cos(an + jit) * Lk * q, oy + math.sin(an + jit) * Lk * q))
                c.drawPath(poly(np.array(pts), False), cp)
                if cu > .5:                                       # a short branch
                    bx_, by_ = pts[3]; ba = an + .7 * (1 if k % 2 else -1)
                    c.drawLine(bx_, by_, bx_ + math.cos(ba) * Lk * .3, by_ + math.sin(ba) * Lk * .3, cp2)
            c.drawCircle(ox, oy, 3, paint('#e2e8f0', .8 * ga * seg(crack, 0, .1)))
            ca = seg(crack, .5, .9)
            if ca > 0: stamp(c, x + w / 2, y + h * .5, 'CEASED', RED, a * ca, seg(crack, .5, 1), -10, 34)
        if amount is not None and lv > 0:
            ty_ = clamp(ys, iy + 16, iy + ih - 6); s = rupee(amount); tw = ftext_w(s, 27, MONO)
            c.drawLine(x + w + 2, ty_, x + w + 24, ty_, paint(GOLD, .8, stroke=2))
            c.drawRRect(rrect(x + w + 24, ty_ - 22, tw + 26, 44, 10), paint('#120d02', .9))
            c.drawRRect(rrect(x + w + 24, ty_ - 22, tw + 26, 44, 10), paint(GOLD, .9, stroke=1.8))
            ftext(c, s, x + w + 37, ty_ + 10, 27, MONO, GOLD, 1, 'l')
        if label:
            text(c, label, x + w / 2, y + h + 56, 26, 800, WHITE, .95, 'c', shadow=6)
            if sub: text(c, sub, x + w / 2, y + h + 86, 22, 600, DIM, .85, 'c')
    return res

def bucket(c, x, y, a=1., level=0., label='Short-term capital gain', col=GOLD, sub=None, amount=None, t=0., w=210, h=150):
    """A tapered glass catch-basin, rim centre at (x, y) (w x h), filling with col to level 0..1 (wavy surface);
    label (+ sub) plate below, amount tag at the right. Returns (x, surface y)."""
    tw0, tw1 = w, w * .74; lv = clamp(level); ys = y + 10 + (h - 18) * (1 - lv)
    if a <= 0: return x, ys
    def shape():
        return poly(np.array([(-tw0 / 2, 0), (tw0 / 2, 0), (tw1 / 2, h - 10), (tw1 / 2 - 10, h), (-tw1 / 2 + 10, h), (-tw1 / 2, h - 10)]))
    P = skia.Path(_cache(('bkt', w, h), shape)); P.offset(x, y)
    with _fade(c, a, (x - w, y - 40, x + w * 1.6, y + h + 110)):
        c.drawOval(skia.Rect.MakeXYWH(x - tw1 / 2 - 10, y + h - 8, tw1 + 20, 22), paint(BLACK, .5, blur=10))
        c.drawPath(P, paint('#0a1328', .62))
        if lv > 0:
            c.save(); c.clipPath(P, True)
            Wv = _wave(x - tw0 / 2, x + tw0 / 2, ys, t, 3 * min(1, lv * 6))
            c.drawPath(poly(np.vstack([Wv, [(x + tw0 / 2, y + h + 2), (x - tw0 / 2, y + h + 2)]])), paint(shader=lgrad((0, ys), (0, y + h), [(shade(col, .05), .88), (shade(col, -.5), .95)])))
            c.drawPath(poly(Wv, False), paint(shade(col, .55), .85, stroke=2.2))
            c.restore()
        c.drawLine(x - tw0 / 2 + 14, y + 12, x - tw1 / 2 + 12, y + h - 16, paint(WHITE, .18, stroke=6))
        c.drawPath(P, paint(col, .55, stroke=2.4))
        c.drawRRect(rrect(x - tw0 / 2 - 6, y - 5, tw0 + 12, 12, 6), paint(shader=_cache('tklip', lambda: lgrad((0, -4), (0, 10), ['#9fb0cc', '#4b5875']))))
        if amount is not None and lv > 0:
            s = rupee(amount); aw = ftext_w(s, 26, MONO)
            c.drawRRect(rrect(x + tw0 / 2 + 16, ys - 21, aw + 24, 42, 10), paint('#120d02', .9))
            c.drawRRect(rrect(x + tw0 / 2 + 16, ys - 21, aw + 24, 42, 10), paint(col, .9, stroke=1.8))
            ftext(c, s, x + tw0 / 2 + 28, ys + 9, 26, MONO, col, 1, 'l')
        if label:
            lines = wrap(label, 24, w + 60, 800)[:2]
            for k, ln in enumerate(lines): text(c, ln, x, y + h + 40 + k * 28, 24, 800, WHITE, .95, 'c', shadow=6)
            if sub: text(c, sub, x, y + h + 40 + len(lines) * 28, 21, 600, col, .9, 'c')
    return x, ys

# ------------------------------------------------------------------ widgets: meter, gauge, slab, tile, yearstrip
def meter(c, x, y, w, a=1., value=0.12, limit=0.05, label='Cash receipts', fmt='{:.0%}', hi=None, h=26, lim_fmt=None):
    """A horizontal gauge bar, top-left (x, y), width w: label above left, the value (fmt) above right, a track
    0..hi (default 3 x limit) with a threshold tick at limit; the fill is green up to the limit and red beyond."""
    if a <= 0: return
    hi = hi or limit * 3; v = clamp(value / hi); L = clamp(limit / hi)
    over = value > limit + 1e-12; vc = RED if over else GREEN
    with _fade(c, a, (x - 20, y - 60, x + w + 30, y + h + 60)):
        text(c, label, x, y - 14, 25, 700, WHITE, .95)
        text(c, fmt.format(value), x + w, y - 12, 30, 800, vc, 1, 'r')
        c.drawRRect(rrect(x, y + 4, w, h, h / 2), paint(BLACK, .4, blur=8))
        c.drawRRect(rrect(x, y, w, h, h / 2), paint('#0b1226', .95))
        c.save(); c.clipRRect(rrect(x, y, w, h, h / 2), True)
        if v > 0:
            c.drawRect(skia.Rect(x, y, x + w * min(v, L), y + h), paint(shader=lgrad((x, 0), (x + w * L, 0), [shade(GREEN, -.35), GREEN])))
            if v > L: c.drawRect(skia.Rect(x + w * L, y, x + w * v, y + h), paint(shader=lgrad((x + w * L, 0), (x + w, 0), [shade(RED, -.15), RED])))
        c.drawRect(skia.Rect(x, y, x + w, y + h * .45), paint(WHITE, .1))
        c.restore()
        c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, h / 2), paint(WHITE, .16, stroke=1.2))
        lx = x + w * L
        c.drawLine(lx, y - 8, lx, y + h + 8, paint(WHITE, .95, stroke=3))
        text(c, (lim_fmt or fmt).format(limit), lx, y + h + 32, 22, 800, DIM, .95, 'c')

def gauge(c, x, y, r, a=1., value=0., lo=0., hi=1., ticks=(), label='', limit=None, fmt=None, zones=(), col=ACC):
    """A semicircular dial, pivot at (x, y), radius r: arc from lo (left) to hi (right), ticks = [value or
    (value, text)], zones = [(v0, v1, col)] tinted arc bands, limit = a red marker + red arc beyond it, needle at
    value, label under the pivot, fmt(value) text above the label when given."""
    if a <= 0: return
    ang = lambda v: math.pi + math.pi * clamp((v - lo) / (hi - lo) if hi != lo else 0)
    with _fade(c, a, (x - r - 60, y - r - 60, x + r + 60, y + 90)):
        P = skia.Path(); P.addArc(skia.Rect(x - r, y - r, x + r, y + r), 180, 180)
        c.drawPath(P, paint(BLACK, .45, stroke=r * .2, blur=10))
        c.drawPath(P, paint('#1b2540', 1, stroke=r * .2, cap=False))
        for rr_ in (r * 1.1, r * .9):
            q = skia.Path(); q.addArc(skia.Rect(x - rr_, y - rr_, x + rr_, y + rr_), 180, 180); c.drawPath(q, paint(WHITE, .14, stroke=1.2, cap=False))
        c.drawLine(x - r * 1.1, y, x - r * .9, y, paint(WHITE, .14, stroke=1.2)); c.drawLine(x + r * .9, y, x + r * 1.1, y, paint(WHITE, .14, stroke=1.2))
        def band(v0, v1, cc, aa, wd):
            q = skia.Path(); a0 = math.degrees(ang(v0)); a1 = math.degrees(ang(v1))
            q.addArc(skia.Rect(x - r, y - r, x + r, y + r), a0, a1 - a0); c.drawPath(q, paint(cc, aa, stroke=wd, cap=False))
        for v0, v1, zc in zones: band(v0, v1, zc, .55, r * .2)
        if limit is not None: band(limit, hi, RED, .5, r * .2)
        band(lo, min(value, hi), col, .9, r * .07)
        for tk in ticks:
            tv, tl = (tk if isinstance(tk, tuple) else (tk, None)); an = ang(tv)
            c.drawLine(x + math.cos(an) * r * .86, y + math.sin(an) * r * .86, x + math.cos(an) * r * 1.12, y + math.sin(an) * r * 1.12, paint(WHITE, .7, stroke=2))
            if tl: text(c, tl, x + math.cos(an) * r * 1.3, y + math.sin(an) * r * 1.3 + 8, 21, 700, DIM, .9, 'c')
        if limit is not None:
            an = ang(limit)
            c.drawLine(x + math.cos(an) * r * .78, y + math.sin(an) * r * .78, x + math.cos(an) * r * 1.16, y + math.sin(an) * r * 1.16, paint(RED, 1, stroke=4))
        an = ang(value)
        c.drawLine(x + 2, y + 4, x + math.cos(an) * r * .82 + 2, y + math.sin(an) * r * .82 + 4, paint(BLACK, .4, stroke=5, blur=3))
        c.drawLine(x, y, x + math.cos(an) * r * .82, y + math.sin(an) * r * .82, paint(WHITE, 1, stroke=4.5))
        c.drawCircle(x, y, r * .09, paint(col)); c.drawCircle(x, y, r * .04, paint('#0b1020'))
        if fmt: text(c, fmt(value) if callable(fmt) else fmt.format(value), x, y + 44, max(26, r * .2), 800, WHITE, 1, 'c')
        if label: text(c, label, x, y + (82 if fmt else 40), 24, 700, DIM, .95, 'c')

def slab(c, x, y, w, h, a=1., col=ACC, title=None, sub=None, size=28, sub_size=23, icon_name=None):
    """A clean rounded panel, top-left (x, y), w x h, with a coloured left edge, a title and wrapped sub text
    (optionally an icon left of the title). Returns (x, y, w, h)."""
    if a <= 0: return x, y, w, h
    with _fade(c, a, (x - 30, y - 30, x + w + 30, y + h + 40)):
        c.drawRRect(rrect(x, y + 8, w, h, 16), paint(BLACK, .4, blur=16))
        c.drawRRect(rrect(x, y, w, h, 16), paint(shader=lgrad((x, y), (x, y + h), [shade(col, -.78), '#0b1020'])))
        c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, 16), paint(col, .35, stroke=1.4))
        c.save(); c.clipRRect(rrect(x, y, w, h, 16), True); c.drawRect(skia.Rect.MakeXYWH(x, y, 7, h), paint(col)); c.restore()
        tx = x + 28
        if icon_name: icon(c, icon_name, x + 50, y + 46, .62, col, 1); tx = x + 86
        ty = y + 26 + size * .9
        if title: text(c, title, tx, ty, size, 800, WHITE, 1); ty += size * .5 + sub_size * 1.25
        if sub:
            for k, ln in enumerate(wrap(sub, sub_size, w - (tx - x) - 24, 600)):
                if ty + k * sub_size * 1.3 > y + h - 8: break
                text(c, ln, tx, ty + k * sub_size * 1.3, sub_size, 600, DIM, .95)
    return x, y, w, h

def _badge_ok(c, x, y, ok, a, r=17):
    col = GREEN if ok else RED
    c.drawCircle(x, y, r + 3, paint(BLACK, .5 * a, blur=4))
    c.drawCircle(x, y, r, paint('#052e16' if ok else '#3b0a0a', a)); c.drawCircle(x, y, r, paint(col, a, stroke=2.4))
    p = skia.Path()
    if ok: p.moveTo(x - r * .42, y); p.lineTo(x - r * .1, y + r * .36); p.lineTo(x + r * .46, y - r * .34)
    else:
        p.moveTo(x - r * .38, y - r * .38); p.lineTo(x + r * .38, y + r * .38); p.moveTo(x + r * .38, y - r * .38); p.lineTo(x - r * .38, y + r * .38)
    c.drawPath(p, paint(col, a, stroke=3.2))

def tile(c, x, y, w, h, icon_fn, label, a=1., col=ACC, ok=None, size=23, glow=0.):
    """An icon tile, top-left (x, y), w x h: icon_fn = an ICONS name or a callable(c, cx, cy, s) (s = 1 for a 64 px
    icon), label wrapped under it; ok True = green tick badge, False = red cross badge (top-right); glow 0..1."""
    if a <= 0: return
    with _fade(c, a, (x - 30, y - 30, x + w + 30, y + h + 40)):
        if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, 20), paint(col, .5 * glow, stroke=8, blur=10))
        c.drawRRect(rrect(x, y + 7, w, h, 16), paint(BLACK, .42, blur=14))
        c.drawRRect(rrect(x, y, w, h, 16), paint(shader=lgrad((x, y), (x, y + h), [shade(col, -.74), '#0a0f1f'])))
        c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, 16), paint(col, .45 + .4 * glow, stroke=1.6))
        lines = wrap(label, size, w - 20, 700)[:2] if label else []
        ih = h - (len(lines) * size * 1.2 + 16 if lines else 0); s = min(w, ih) / 64 * .62
        cx, cy = x + w / 2, y + ih * .52 + 4
        if callable(icon_fn): icon_fn(c, cx, cy, s)
        elif icon_fn: icon(c, icon_fn, cx, cy, s, shade(col, .2), 1)
        for k, ln in enumerate(lines):
            text(c, ln, cx, y + ih + 6 + size * .85 + k * size * 1.2, size, 700, WHITE, .95, 'c')
        if ok is not None: _badge_ok(c, x + w - 8, y + 8, ok, 1)

def yearstrip(c, x, y, w, n, a=1., labels=None, hl=None, col=ACC, h=72, cols=None, sub=None, gap=10):
    """n equal year boxes, top-left (x, y), total width w, height h (5-year spreads, carry-forward years, the
    8-year rule): labels (default 'Year 1'..), hl = index / set / {index: alpha} gold glow, cols = {index: colour}
    fills, sub = {index: small text under the label}. Returns the box centres."""
    bw = (w - (n - 1) * gap) / n; cen = [(x + i * (bw + gap) + bw / 2, y + h / 2) for i in range(n)]
    if a <= 0: return cen
    if isinstance(hl, (int, float)) and not isinstance(hl, bool): hl = {hl: 1.}
    elif isinstance(hl, (set, list, tuple)): hl = {i: 1. for i in hl}
    hl = hl or {}; cols = cols or {}; sub = sub or {}
    def base(cv):
        for i in range(n):
            bx = i * (bw + gap); fc = cols.get(i)
            cv.drawRRect(rrect(bx, 6, bw, h, 12), paint(BLACK, .4, blur=10))
            cv.drawRRect(rrect(bx, 0, bw, h, 12), paint(shade(fc, -.55) if fc else '#0d1530'))
            cv.drawRRect(rrect(bx + .5, .5, bw - 1, h - 1, 12), paint(fc or col, .7, stroke=1.8))
            lab_ = labels[i] if labels and i < len(labels) else 'Year %d' % (i + 1)
            fs = min(24, bw * .2)
            text(cv, lab_, bx + bw / 2, h / 2 + (fs * .36 if i not in sub else -2), fs, 800, WHITE if fc else DIM, 1, 'c')
            if i in sub: text(cv, sub[i], bx + bw / 2, h / 2 + 24, min(20, fs * .85), 700, mixc(fc or col, WHITE, .3), .95, 'c')
    key = ('ystrip', round(w, 1), n, tuple(labels or ()), h, col, tuple(sorted(cols.items())), tuple(sorted(sub.items())), gap)
    _play(c, _pic(key, base, (-30, -30, w + 60, h + 70)), x, y, 1, a)
    for i, g in hl.items():
        g = clamp(g)
        if g <= 0 or i >= n: continue
        bx = x + i * (bw + gap); fc = cols.get(i)
        c.drawRRect(rrect(bx, y, bw, h, 12), paint(GOLD, .22 * g * a))
        c.drawRRect(rrect(bx - 3, y - 3, bw + 6, h + 6, 14), paint(GOLD, .55 * g * a, stroke=6, blur=6))
        c.drawRRect(rrect(bx + .5, y + .5, bw - 1, h - 1, 12), paint(GOLD, g * a, stroke=2))
        lab_ = labels[i] if labels and i < len(labels) else 'Year %d' % (i + 1)
        fs = min(24, bw * .2)
        if not fc: text(c, lab_, bx + bw / 2, y + h / 2 + (fs * .36 if i not in sub else -2), fs, 800, WHITE, g * a, 'c')
    return cen

# ------------------------------------------------------------------ assets and places (side views; (x, y) = bottom centre)
_R = skia.Rect.MakeXYWH

def _steel(x0, x1, dark=False):
    cols = ['#6f7a90', '#c4ccd9', '#8d98ad', '#5f6a80'] if dark else ['#8e98ac', '#e6ebf2', '#aab4c6', '#7a8499']
    return _cache(('steel', x0, x1, dark), lambda: lgrad((x0, 0), (x1, 0), cols, [0, .32, .7, 1]))

def _vg(y0, y1, c0, c1): return lgrad((0, y0), (0, y1), [c0, c1])

def _gsh(cv, w, y=0., a=.5, h=18):
    cv.drawOval(_R(-w / 2, y - h / 2, w, h), paint(BLACK, a, blur=h * .7))

def _wheel(c, x, y, r, ang=0., hub='#c3cad6'):
    c.drawCircle(x, y, r, paint('#141922')); c.drawCircle(x, y, r * .97, paint('#2a303c', stroke=r * .06))
    c.drawCircle(x, y, r * .58, paint(shader=rgrad(x - r * .2, y - r * .2, r * .8, ['#eef1f6', hub, '#7c869a'])))
    c.drawCircle(x, y, r * .2, paint('#5b6579'))
    for k in range(5):
        an = ang + k * math.tau / 5
        c.drawCircle(x + math.cos(an) * r * .38, y + math.sin(an) * r * .38, r * .07, paint('#5b6579'))

def _loaf(cv, x, y, w, h, col='#c27a35'):
    p = skia.Path(); p.moveTo(x - w / 2, y); p.cubicTo(x - w / 2, y - h * 1.25, x + w / 2, y - h * 1.25, x + w / 2, y); p.close()
    cv.drawPath(p, paint(shader=_vg(y - h, y, shade(col, .25), shade(col, -.25))))
    for k in (-1, 0, 1): cv.drawLine(x + k * w * .22 - w * .06, y - h * .55, x + k * w * .22 + w * .06, y - h * .85, paint(shade(col, .45), .9, stroke=max(1., w * .05)))

def _minicake(cv, x, y, w, h, col, top=None):
    """A little round cake seen from the front (for counters and windows)."""
    cv.drawRect(_R(x - w / 2, y - h, w, h), paint(shader=_vg(y - h, y, shade(col, .15), shade(col, -.2))))
    cv.drawOval(_R(x - w / 2, y - h - h * .22, w, h * .44), paint(top or shade(col, .4)))
    for k in range(5): cv.drawCircle(x - w * .4 + k * w * .2, y - h * .02, w * .07, paint(WHITE, .85))
    cv.drawCircle(x, y - h - h * .1, w * .09, paint('#dc2626'))

def _cupcake(cv, x, y, s, col):
    cv.drawPath(poly(np.array([(x - 11 * s, y - 16 * s), (x + 11 * s, y - 16 * s), (x + 8 * s, y), (x - 8 * s, y)])), paint('#c084fc' if col == 'v' else '#f9a8d4'))
    for k, (dx, dy, r) in enumerate(((-6, -19, 7), (6, -19, 7), (0, -25, 7), (0, -31, 4))):
        cv.drawCircle(x + dx * s, y + dy * s, r * s, paint('#fff4e0' if k < 3 else '#fde68a'))

def _croissant(cv, x, y, s):
    p = skia.Path(); p.moveTo(x - 18 * s, y); p.cubicTo(x - 14 * s, y - 16 * s, x + 14 * s, y - 16 * s, x + 18 * s, y)
    p.cubicTo(x + 8 * s, y - 5 * s, x - 8 * s, y - 5 * s, x - 18 * s, y); cv.drawPath(p, paint('#d89a48'))
    for k in (-1, 0, 1): cv.drawLine(x + k * 7 * s, y - 11 * s, x + k * 5 * s, y - 3 * s, paint('#a8692a', stroke=1.4 * s))

def _oven_pic():
    def fn(cv):
        _gsh(cv, 330, 2)
        for lx in (-128, 116):
            cv.drawRRect(rrect(lx, -60, 12, 52, 3), paint('#5b6579'))
            cv.drawCircle(lx + 6, -7, 7, paint('#1c222d')); cv.drawCircle(lx + 6, -7, 3, paint('#8d98ad'))
        cv.drawRect(_R(-128, -40, 256, 8), paint('#4b5466'))
        cv.drawRRect(rrect(-142, -278, 284, 20, 6), paint(shader=_steel(-142, 142, True)))
        cv.drawRRect(rrect(88, -300, 26, 26, 4), paint(shader=_steel(88, 114, True)))
        cv.drawRRect(rrect(-150, -262, 300, 206, 10), paint(shader=_steel(-150, 150)))
        cv.drawRRect(rrect(-150, -262, 300, 206, 10), paint('#5b6579', stroke=1.6))
        for dy in (-252, -154):
            cv.drawRRect(rrect(-142, dy, 226, 90, 8), paint(shader=_vg(dy, dy + 90, '#e7ecf3', '#a9b3c4')))
            cv.drawRRect(rrect(-142, dy, 226, 90, 8), paint('#6b7590', stroke=1.2))
            cv.drawRRect(rrect(-118, dy + 8, 178, 10, 5), paint(shader=_vg(dy + 8, dy + 18, '#f8fafc', '#8792a7')))
            for hx in (-112, 54): cv.drawRect(_R(hx, dy + 16, 6, 8), paint('#6b7590'))
            cv.drawRRect(rrect(-120, dy + 28, 182, 54, 6), paint('#120c0a'))
            for k in range(3): _loaf(cv, -84 + k * 56, dy + 76, 44, 20, '#6b3a17')
            cv.drawRRect(rrect(-120, dy + 28, 182, 54, 6), paint('#2a2f3a', stroke=2.4))
            cv.drawRRect(rrect(90, dy, 52, 90, 8), paint('#262d3c'))
            cv.drawRRect(rrect(97, dy + 12, 38, 20, 3), paint('#080b12'))
            for k, dxx in enumerate((104, 128)):
                cv.drawCircle(dxx, dy + 60, 9, paint(shader=rgrad(dxx - 3, dy + 57, 12, ['#f1f5f9', '#8d98ad'])))
                an = -2.2 + k * 1.3; cv.drawLine(dxx, dy + 60, dxx + math.cos(an) * 7, dy + 60 + math.sin(an) * 7, paint('#262d3c', stroke=2))
    return _pic(('oven',), fn, (-175, -310, 350, 330))

def oven(c, x, y, s=1., a=1., t=0., on=1.):
    """A stainless two-deck bakery oven (300 x 300 at s=1) standing at (x, y): windows glow orange with loaves
    inside when on (0..1), the displays read 220°, faint heat shimmer above."""
    if a <= 0: return
    with _fade(c, a, (x - 200 * s, y - 360 * s, x + 200 * s, y + 30 * s)):
        _play(c, _oven_pic(), x, y, s)
        if on > 0:
            c.save(); c.translate(x, y); c.scale(s, s)
            fl = .9 + .1 * math.sin(t * 7) * math.sin(t * 3.1)
            for dy in (-252, -154):
                w_ = rrect(-120, dy + 28, 182, 54, 6)
                c.drawRRect(w_, paint(ORANGE, .45 * on * fl, blur=12))
                c.drawRRect(w_, paint(shader=rgrad(-29, dy + 64, 120, [('#ffd28a', .95), ('#ff8a2a', .75), ('#b8400e', .55)]), a=on * fl, blend='Screen'))
                ftext(c, '220°', 116, dy + 27, 13, MONO, '#ff6b4a', on, 'c', glow=3)
            for k in range(3):
                q = (t * .5 + k / 3) % 1; sx = -60 + k * 50
                P = np.array([(sx + 6 * math.sin(q * 9 + j), -280 - j * 9 - q * 30) for j in range(6)])
                c.drawPath(poly(P, False), paint(WHITE, .1 * on * math.sin(math.pi * q), stroke=2))
            c.restore()

def _mixer_pic():
    def fn(cv):
        _gsh(cv, 190, 2)
        cv.drawRRect(rrect(-84, -28, 168, 28, 9), paint(shader=_vg(-28, 0, '#475063', '#262c38')))
        en = lgrad((-64, 0), (-8, 0), ['#b8c1cf', '#f1f4f8', '#c3ccd9'])
        cv.drawRRect(rrect(-64, -258, 56, 234, 16), paint(shader=en))
        cv.drawRRect(rrect(-64, -258, 56, 234, 16), paint('#7d879c', stroke=1.2))
        cv.drawRRect(rrect(-22, -180, 96, 12, 6), paint('#3a4252'))
        bowl = skia.Path(); bowl.moveTo(-26, -176); bowl.lineTo(96, -176); bowl.cubicTo(96, -112, 74, -86, 35, -86); bowl.cubicTo(-4, -86, -26, -112, -26, -176); bowl.close()
        cv.drawPath(bowl, paint(shader=lgrad((-26, 0), (96, 0), ['#7f8aa0', '#eef2f7', '#9aa5b9', '#6b7590'], [0, .3, .7, 1])))
        cv.drawPath(bowl, paint('#566078', stroke=1.4))
        cv.drawRRect(rrect(-30, -181, 130, 9, 4.5), paint(shader=_vg(-181, -172, '#f8fafc', '#8d98ad')))
        cv.drawRRect(rrect(-72, -292, 178, 52, 24), paint(shader=_vg(-292, -240, '#f4f6f9', '#b4bdcb')))
        cv.drawRRect(rrect(-72, -292, 178, 52, 24), paint('#7d879c', stroke=1.2))
        cv.drawLine(-50, -262, 84, -262, paint(ACC, .8, stroke=3))
        cv.drawCircle(-40, -300, 7, paint('#3a4252')); cv.drawLine(-40, -300, -52, -316, paint('#3a4252', stroke=4))
        cv.drawRRect(rrect(-56, -150, 40, 22, 5), paint('#262c38')); cv.drawCircle(-44, -139, 4, paint(GREEN)); cv.drawCircle(-28, -139, 4, paint(RED))
    return _pic(('mixer',), fn, (-100, -330, 220, 345))

def mixer(c, x, y, s=1., a=1., t=0., spin=0.):
    """A commercial planetary stand mixer (190 x 320 at s=1) at (x, y): column, head, steel bowl with dough; the
    beater shaft orbits (planetary wobble) at rate spin (0 = still)."""
    if a <= 0: return
    with _fade(c, a, (x - 130 * s, y - 340 * s, x + 140 * s, y + 30 * s)):
        _play(c, _mixer_pic(), x, y, s)
        c.save(); c.translate(x, y); c.scale(s, s)
        ph = t * spin * 9.; off = 14 * math.sin(ph)
        d = skia.Path(); d.moveTo(-14, -176); d.cubicTo(0, -200 - 4 * math.sin(ph * .5), 70, -200 + 4 * math.sin(ph * .5), 84, -176); d.close()
        c.drawPath(d, paint(shader=_vg(-198, -176, '#fff7e6', '#e9d3a8')))
        c.drawLine(35 + off, -240, 35 + off * .6, -188, paint('#9aa5b9', stroke=6))
        c.drawRRect(rrect(25, -246, 20, 12, 4), paint('#5b6579'))
        c.drawCircle(35 + off * .6, -190, 4, paint('#c3cad6'))
        c.restore()

def _van_pic(col, label):
    def fn(cv):
        _gsh(cv, 340, 2)
        P = skia.Path(); P.moveTo(-168, -24); P.lineTo(-168, -160); P.lineTo(66, -160); P.lineTo(124, -102); P.lineTo(166, -90)
        P.lineTo(170, -28); P.lineTo(-168, -24); P.close()
        for wx in (-104, 108): cv.drawCircle(wx, -26, 37, paint('#0d1220'))
        bp = paint(shader=_vg(-160, -24, shade(col, .12), shade(col, -.3))); bp.setPathEffect(skia.CornerPathEffect.Make(14))
        cv.drawPath(P, bp)
        for wx in (-104, 108):
            q = skia.Path(); q.addArc(_R(wx - 38, -64, 76, 76), 180, 180); cv.drawPath(q, paint('#0d1220'))
        cv.drawRect(_R(-160, -46, 330, 12), paint(shade(col, -.45)))
        cv.drawRRect(rrect(-150, -146, 196, 92, 12), paint('#f7f0e1'))
        cv.drawRRect(rrect(-150, -146, 196, 92, 12), paint(shade(col, -.35), stroke=2))
        lines = wrap(label, 23, 170, 800, SERIF)[:2]
        for k, ln in enumerate(lines): ftext(cv, ln, -52, -96 + (k - (len(lines) - 1) / 2) * 26 + 8, 23, SERIF, shade(col, -.55), 1, 'c', 700)
        cv.drawLine(-120, -66, 16, -66, paint(GOLD, .9, stroke=2.4))
        win = poly(np.array([(76, -150), (114, -106), (76, -106)])); cv.drawPath(win, _cpaint(GLASS, 1, 5))
        cv.drawLine(84, -140, 96, -126, paint(WHITE, .3, stroke=2))
        cv.drawLine(70, -152, 70, -40, paint(shade(col, -.45), stroke=1.6)); cv.drawLine(124, -100, 124, -40, paint(shade(col, -.45), stroke=1.6))
        cv.drawRRect(rrect(80, -92, 16, 5, 2.5), paint(shade(col, -.5)))
        cv.drawRRect(rrect(118, -122, 10, 16, 3), paint('#1f2533'))
        cv.drawRRect(rrect(156, -84, 12, 12, 3), paint('#fff4c2')); cv.drawRRect(rrect(-170, -128, 7, 22, 3), paint('#ef4444'))
        cv.drawRRect(rrect(158, -42, 16, 16, 4), paint('#9aa4b8')); cv.drawRRect(rrect(-176, -40, 12, 14, 4), paint('#9aa4b8'))
    return _pic(('van', col, label), fn, (-190, -175, 380, 200))

def van(c, x, y, s=1., a=1., col=BLUE, label="Meera's Bakehouse", t=0., move=0., flip=False):
    """A side-view delivery van (340 x 170 at s=1) standing at (x, y), facing right (flip=True: left), with the
    label on a cream side panel; wheels turn with move (px travelled)."""
    if a <= 0: return
    with _fade(c, a, (x - 210 * s, y - 200 * s, x + 210 * s, y + 30 * s)):
        c.save(); c.translate(x, y); c.scale(-s if flip else s, s)
        _play(c, _van_pic(col, label))
        for wx in (-104, 108): _wheel(c, wx, -26, 30, move / 30. * (-1 if flip else 1))
        c.restore()

def _laptop_pic():
    def fn(cv):
        _gsh(cv, 230, 1, .45, 14)
        cv.drawRRect(rrect(-92, -152, 184, 136, 9), paint('#1d2330')); cv.drawRRect(rrect(-92, -152, 184, 136, 9), paint('#5b6782', stroke=1.4))
        cv.drawRRect(rrect(-84, -144, 168, 114, 4), paint('#070a12'))
        cv.drawCircle(0, -148, 1.8, paint('#3a4356'))
        base = poly(np.array([(-112, -2), (112, -2), (98, -16), (-98, -16)])); cv.drawPath(base, _cpaint('#9aa4b8', 1, 3))
        cv.drawRect(_R(-112, -3, 224, 4), paint('#5b6579')); cv.drawRRect(rrect(-22, -14, 44, 5, 2.5), paint('#6b7590'))
    return _pic(('laptop',), fn, (-125, -165, 250, 180))

def laptop(c, x, y, s=1., a=1., on=1.):
    """An open laptop (224 x 152 at s=1) at (x, y); on 0..1 lights a spreadsheet on the screen."""
    if a <= 0: return
    with _fade(c, a, (x - 130 * s, y - 170 * s, x + 130 * s, y + 20 * s)):
        _play(c, _laptop_pic(), x, y, s)
        if on > 0:
            c.save(); c.translate(x, y); c.scale(s, s)
            c.drawRRect(rrect(-84, -144, 168, 114, 4), paint(shader=_vg(-144, -30, '#1e3a8a', '#0f1d40'), a=on))
            c.drawRect(_R(-84, -144, 168, 14), paint(ACC, .55 * on))
            for k in range(5):
                yy = -120 + k * 15; c.drawLine(-76, yy, 10, yy, paint(WHITE, .35 * on, stroke=2))
                c.drawLine(18, yy, 40, yy, paint(GOLD, .6 * on, stroke=2))
            for k, hh in enumerate((18, 30, 24, 40)):
                c.drawRect(_R(48 + k * 8, -38 - hh, 6, hh), paint(GREEN if k == 3 else ACC, .8 * on))
            c.drawRRect(rrect(-84, -144, 168, 114, 4), paint(ACC, .25 * on, blur=8, stroke=4))
            c.restore()

def _counter_pic():
    def fn(cv):
        _gsh(cv, 400, 2)
        cv.drawRRect(rrect(-190, -112, 380, 112, 8), paint(shader=_vg(-112, 0, '#93613f', '#5f3a22')))
        for k in range(3):
            cv.drawRRect(rrect(-176 + k * 122, -98, 108, 84, 6), paint('#4d2f1b', .55)); cv.drawRRect(rrect(-176 + k * 122, -98, 108, 84, 6), paint('#b07d55', .5, stroke=1.2))
        cv.drawRRect(rrect(-198, -122, 396, 12, 4), paint(shader=_vg(-122, -110, '#f1ebe1', '#c9bfae')))
        cv.drawRect(_R(-186, -214, 372, 92), paint('#bfe3ff', .1))
        cv.drawLine(-186, -168, 186, -168, paint('#e2f2ff', .5, stroke=3))
        for k, (cx, col) in enumerate(((-140, '#f9a8d4'), (-60, '#7c4a2d'), (40, '#fde68a'), (130, '#f9a8d4'))):
            _minicake(cv, cx, -122, 54, 30, col)
        for k in range(5): _cupcake(cv, -150 + k * 34, -170, .9, 'v' if k % 2 else 'p')
        for k in range(3): _croissant(cv, 40 + k * 48, -170, 1.)
        for k in range(4): cv.drawRect(_R(-162 + k * 96, -132, 18, 9), paint(WHITE, .9))
        cv.drawRRect(rrect(-188, -216, 376, 96, 6), paint('#dbeafe', .7, stroke=2.4))
        cv.drawLine(-120, -212, -40, -126, paint(WHITE, .22, stroke=8)); cv.drawLine(70, -212, 110, -170, paint(WHITE, .15, stroke=5))
    return _pic(('counter',), fn, (-210, -230, 420, 250))

def counter(c, x, y, s=1., a=1.):
    """A glass display counter with cakes, cupcakes and croissants (396 x 216 at s=1) at (x, y)."""
    if a <= 0: return
    _play(c, _counter_pic(), x, y, s, a)

def _shop_pic(sign):
    def fn(cv):
        cv.drawRect(_R(-310, -6, 620, 14), paint('#3a4256')); cv.drawRect(_R(-310, -6, 620, 3), paint('#59627a'))
        cv.drawRect(_R(-270, -444, 540, 440), paint(shader=_vg(-444, 0, '#efe2c8', '#d6c19f')))
        cv.drawRect(_R(-282, -466, 564, 28), paint(shader=_vg(-466, -438, '#d9c39c', '#b89d74')))
        cv.drawLine(-282, -446, 282, -446, paint('#a88d64', stroke=2, cap=False))
        cv.drawRRect(rrect(-232, -432, 464, 72, 8), paint('#0f3b40')); cv.drawRRect(rrect(-232, -432, 464, 72, 8), paint('#d4a94f', stroke=3))
        sl, ssz, _ = _fit(sign, 36, 700, 420, 22)
        ftext(cv, sl, 0, -396 + ssz * .2, ssz, SERIF, '#f6d27a', 1, 'c', 700)
        text(cv, 'CAKES  ·  BREADS', 0, -369, 12, 800, '#9fd3cf', .9, 'c', track=3)
        for lx in (-250, 250):
            cv.drawLine(lx, -444, lx, -410, paint('#3a3f4b', stroke=3)); cv.drawRRect(rrect(lx - 9, -414, 18, 12, 4), paint('#3a3f4b'))
        cv.drawRect(_R(-270, -348, 540, 60), paint(shader=_vg(-348, -288, (BLACK, 0), (BLACK, .25))))
        for k in range(10):
            xa, xb = -262 + k * 52.4, -262 + (k + 1) * 52.4
            P = poly(np.array([(xa * .94, -352), (xb * .94, -352), (xb, -300), (xa, -300)]))
            cv.drawPath(P, paint('#1f7a7a' if k % 2 == 0 else '#f7f0e1'))
            sc = skia.Path(); sc.addArc(_R(xa, -300 - 13, xb - xa, 26), 0, 180); cv.drawPath(sc, paint('#1f7a7a' if k % 2 == 0 else '#f7f0e1'))
        cv.drawLine(-246, -352, 246, -352, paint('#145c5c', stroke=4))
        cv.drawRect(_R(-252, -276, 316, 214), paint('#5b3a22'))
        cv.drawRect(_R(-242, -266, 296, 194), paint('#1c2230'))
        cv.drawLine(-242, -180, 54, -180, paint('#d9c7a4', stroke=4, cap=False))
        for k, col in enumerate(('#f9a8d4', '#7c4a2d', '#fde68a', '#f9a8d4')): _minicake(cv, -200 + k * 72, -182, 48, 30, col)
        for k in range(6): _cupcake(cv, -214 + k * 50, -76, 1.1, 'v' if k % 2 else 'p')
        for k in range(3): _loaf(cv, -170 + k * 84, -100, 60, 22)
        cv.drawRect(_R(-270, -62, 334, 62), paint('#9e4f35'))
        bp = paint('#c98b6b', .8, stroke=1.6, cap=False)
        for r in range(4):
            yy = -62 + r * 15.5; cv.drawLine(-270, yy, 64, yy, bp)
            for bx in np.arange(-270 + (r % 2) * 18, 64, 36): cv.drawLine(bx, yy, bx, yy + 15.5, bp)
        cv.drawRect(_R(84, -306, 146, 306), paint('#5b3a22'))
        cv.drawRect(_R(96, -294, 122, 286), paint('#1c2230'))
        cv.drawRect(_R(96, -150, 122, 6), paint('#5b3a22'))
        cv.drawRRect(rrect(196, -170, 8, 44, 4), paint('#d4a94f'))
        cv.drawRRect(rrect(118, -262, 78, 30, 6), paint('#f7f0e1')); text(cv, 'OPEN', 157, -241, 17, 800, '#15803d', 1, 'c', track=2)
        cv.drawRect(_R(74, -8, 166, 10), paint('#8a93a6'))
        cv.drawRect(_R(-270, -444, 540, 444), paint('#8f7650', .7, stroke=2, cap=False))
    return _pic(('shop', sign), fn, (-320, -480, 640, 500))

def _shop_lit_pic(sign):
    def fn(cv):
        cv.drawPicture(_shop_pic(sign))
        g = rgrad(-60, -200, 360, [('#ffd9a0', .9), ('#f4a259', .55), ('#c2410c', .25)])
        for r in (_R(-242, -266, 296, 194), _R(96, -294, 122, 286)): cv.drawRect(r, paint(shader=g, blend='Screen'))
        cv.drawOval(_R(-260, -4, 520, 60), paint('#ffb766', .22, blur=24))
        for lx in (-250, 250): cv.drawCircle(lx, -402, 16, paint('#ffd9a0', .5, blur=10))
        gp = paint(WHITE, .14, stroke=10, cap=False)
        cv.drawLine(-210, -262, -120, -76, gp); cv.drawLine(120, -290, 190, -160, paint(WHITE, .1, stroke=8, cap=False))
    return _pic(('shoplit', sign), fn, (-320, -480, 640, 560))

def _shop_dark_pic(sign):
    def fn(cv):
        cv.drawPicture(_shop_pic(sign))
        gp = paint(WHITE, .14, stroke=10, cap=False)
        cv.drawLine(-210, -262, -120, -76, gp); cv.drawLine(120, -290, 190, -160, paint(WHITE, .1, stroke=8, cap=False))
    return _pic(('shopdark', sign), fn, (-320, -480, 640, 560))

def shop(c, x, y, s=1., a=1., t=0., sign="Meera's Bakehouse", lit=1.):
    """A bakery storefront (564 x 466 at s=1) standing at (x, y): plaster facade over a brick base, teal sign board
    with `sign` in gold, striped scalloped awning, a window of cakes and a glass door; lit 0..1 warms the window
    and door glass and spills light on the pavement."""
    if a <= 0: return
    lit = clamp(lit)
    if lit < .999: _play(c, _shop_dark_pic(sign), x, y, s, a)
    if lit > .001: _play(c, _shop_lit_pic(sign), x, y, s, a * lit if lit < .999 else a)

def _land_pic(w, h, label, pegs):
    def fn(cv):
        cv.drawRRect(rrect(4, 18, w, h - 10, 10), paint(BLACK, .45, blur=14))
        cv.drawRRect(rrect(0, 12, w, h - 12, 10), paint(shader=_vg(12, h, '#80573a', '#4a2f1b')))
        for k in range(3):
            P = np.array([(xx, 12 + (h - 12) * (k + 1) / 4 + 4 * math.sin(xx / 37 + k)) for xx in np.linspace(6, w - 6, 30)])
            cv.drawPath(poly(P, False), paint('#3b2414', .5, stroke=2))
        for k in range(int(w / 26)):
            cv.drawOval(_R(hsh(k, 1) * (w - 20) + 6, 24 + hsh(k, 2) * (h - 40), 7 + 6 * hsh(k, 3), 5 + 3 * hsh(k, 4)), paint('#a08566', .7))
        cv.drawRRect(rrect(0, 0, w, 22, 9), paint(shader=_vg(0, 22, '#6cc06a', '#2f7a3a')))
        g = skia.Path(); g.moveTo(2, 4)
        for k in range(int(w / 8)): g.lineTo(4 + k * 8, -4 - 5 * hsh(k, 7)); g.lineTo(8 + k * 8, 4)
        g.lineTo(w - 2, 4); g.close(); cv.drawPath(g, paint('#58ad5a'))
        if pegs:
            for px in (10, w - 10):
                cv.drawRect(_R(px - 4, -34, 8, 40), paint('#b07a43')); cv.drawPath(poly(np.array([(px - 4, -34), (px + 4, -34), (px, -42)])), paint('#b07a43'))
            dp = paint('#f8fafc', .7, stroke=1.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([6, 5], 0)); cv.drawLine(10, -28, w - 10, -28, dp)
        if label: text(cv, label, w / 2, 12 + (h - 12) / 2 + 9, 25, 800, '#f6ead6', 1, 'c', shadow=4)
    return _pic(('land', w, h, label, pegs), fn, (-20, -50, w + 40, h + 80))

def land(c, x, y, w, h, a=1., label=None, pegs=True):
    """A plot of land as a cross-section block, top-left (x, y), w x h: grass on top, soil strata and pebbles,
    boundary pegs with a string (pegs=False to hide); label printed on the soil."""
    if a <= 0: return
    _play(c, _land_pic(w, h, label, pegs), x, y, 1, a)

def _lab_pic():
    def fn(cv):
        _gsh(cv, 400, 2)
        cv.drawRRect(rrect(-184, -106, 368, 106, 6), paint(shader=_vg(-106, 0, '#3a4867', '#222a40')))
        for k in range(3):
            cv.drawRRect(rrect(-174 + k * 120, -94, 108, 80, 5), paint('#2c3752')); cv.drawRRect(rrect(-174 + k * 120 + 34, -60, 40, 7, 3.5), paint('#9aa4b8'))
        cv.drawRRect(rrect(-194, -120, 388, 16, 4), paint(shader=_vg(-120, -104, '#f1f5f9', '#b6c0cf')))
        mp = paint('#e9edf3'); dk = paint('#2b3348')
        cv.drawRRect(rrect(-160, -136, 70, 16, 5), mp)
        arm = skia.Path(); arm.moveTo(-104, -136); arm.cubicTo(-88, -170, -92, -210, -116, -236); arm.lineTo(-104, -244); arm.cubicTo(-74, -214, -70, -168, -88, -136); arm.close()
        cv.drawPath(arm, mp)
        cv.drawRRect(rrect(-150, -176, 56, 8, 3), dk)
        cv.save(); cv.translate(-128, -226); cv.rotate(-28); cv.drawRRect(rrect(-11, -36, 22, 64, 6), dk); cv.drawRRect(rrect(-8, -50, 16, 18, 4), mp); cv.restore()
        cv.drawRRect(rrect(-138, -196, 12, 20, 3), paint('#8d98ad'))
        cv.drawRect(_R(-44, -246, 6, 120), paint('#8d98ad')); cv.drawRRect(rrect(-56, -130, 40, 8, 3), paint('#5b6579'))
        cv.drawLine(-41, -212, 0, -212, paint('#8d98ad', stroke=3.5))
        cv.drawRRect(rrect(110, -150, 76, 30, 4), paint('#b07a43'))
        for k, col in enumerate((PINK, ACC, GOLD, VIO)):
            tx = 118 + k * 17
            cv.drawRRect(rrect(tx, -196, 11, 66, 5.5), paint('#e2f2ff', .35)); cv.drawRRect(rrect(tx, -168, 11, 38, 5.5), paint(col, .9))
            cv.drawRRect(rrect(tx, -196, 11, 66, 5.5), paint(WHITE, .6, stroke=1.2))
        cv.drawRRect(rrect(110, -138, 76, 18, 3), paint('#8a5a30'))
        bk = skia.Path(); bk.moveTo(54, -168); bk.lineTo(54, -124); bk.quadTo(54, -120, 58, -120); bk.lineTo(88, -120); bk.quadTo(92, -120, 92, -124); bk.lineTo(92, -168)
        cv.drawRect(_R(55, -146, 36, 24), paint(BLUE, .8)); cv.drawPath(bk, paint(WHITE, .7, stroke=2))
    return _pic(('lab',), fn, (-210, -260, 420, 280))

def lab(c, x, y, s=1., a=1., t=0.):
    """A small research bench (388 x 250 at s=1) at (x, y): microscope, a flask of green liquid bubbling on a stand
    (t), test tubes, a beaker. NOTE: scenes.common defines its own lab() text helper after `from props import *`;
    scenes call this one as lab_bench()."""
    if a <= 0: return
    with _fade(c, a, (x - 220 * s, y - 280 * s, x + 220 * s, y + 30 * s)):
        _play(c, _lab_pic(), x, y, s)
        c.save(); c.translate(x, y); c.scale(s, s)
        fx, fb = 10, -132
        fl = skia.Path(); fl.moveTo(fx - 9, fb - 92); fl.lineTo(fx - 9, fb - 58); fl.lineTo(fx - 40, fb); fl.lineTo(fx + 40, fb); fl.lineTo(fx + 9, fb - 58); fl.lineTo(fx + 9, fb - 92)
        liq = skia.Path(); lv = fb - 38 + 2 * math.sin(t * 3)
        liq.moveTo(fx - 40 + 18, lv); liq.lineTo(fx + 40 - 18, lv); liq.lineTo(fx + 38, fb - 1); liq.lineTo(fx - 38, fb - 1); liq.close()
        c.drawPath(liq, paint(shader=_vg(lv, fb, '#86efac', '#16a34a'), a=.9))
        for k in range(6):
            q = (t * .8 + k / 6) % 1; bx = fx + (hsh(k, 2) - .5) * 30 * (1 - q * .7); by = lerp(fb - 6, fb - 110, q)
            if by < lv - 2 and abs(bx - fx) > 9: bx = fx + math.copysign(7, bx - fx)
            c.drawCircle(bx, by, 2.5 + 2 * hsh(k, 5), paint(WHITE if by < lv else '#dcfce7', .55 * (1 - q), stroke=1.4))
        c.drawPath(fl, paint('#e2f2ff', .12)); c.drawPath(fl, paint(WHITE, .75, stroke=2.2))
        c.drawRRect(rrect(fx - 12, fb - 98, 24, 7, 3), paint('#c3cad8'))
        c.restore()

lab_bench = lab

def _cold_pic(label):
    def fn(cv):
        _gsh(cv, 520, 2)
        cv.drawRect(_R(-256, -42, 512, 42), paint(shader=_vg(-42, 0, '#6b7488', '#454d60'))); cv.drawRect(_R(-256, -42, 512, 4), paint('#9aa4b8'))
        cv.drawRect(_R(-242, -262, 484, 222), paint(shader=_vg(-262, -40, '#e6eef8', '#b9c7da')))
        for xx in np.arange(-242, 243, 40): cv.drawLine(xx, -262, xx, -42, paint('#a3b3c9', stroke=1.4, cap=False))
        cv.drawPath(poly(np.array([(-258, -258), (0, -300), (258, -258)])), _cpaint('#5d6c88', 1, 4))
        cv.drawLine(-258, -258, 258, -258, paint('#3d4a63', stroke=4))
        cv.drawRect(_R(-66, -206, 172, 166), paint('#4b5872'))
        cv.drawRect(_R(-58, -198, 156, 158), paint(shader=_vg(-198, -40, '#d4dce8', '#a9b6c9')))
        for yy in np.arange(-190, -42, 11): cv.drawLine(-58, yy, 98, yy, paint('#8d9ab0', stroke=1.4, cap=False))
        cv.drawRect(_R(-58, -48, 156, 8), paint(GOLD, .9))
        for k in range(8): cv.drawLine(-50 + k * 20, -48, -40 + k * 20, -40, paint('#1f2937', stroke=3, cap=False))
        cv.drawRect(_R(-196, -150, 64, 108), paint('#5b6884')); cv.drawRect(_R(-188, -142, 48, 40), paint('#9fc3e8'))
        cv.drawCircle(-178, -96, 3, paint('#d4dce8'))
        cv.drawCircle(-166, -222, 27, paint('#0b4a6e')); cv.drawCircle(-166, -222, 27, paint(ACC, stroke=2.4))
        icon(cv, 'snow', -166, -222, .62, WHITE, 1, 3.4)
        if label: text(cv, label, 20, -222, 22, 800, '#27354f', 1, 'c', track=3)
        for bx in (150,):
            cv.drawRRect(rrect(bx, -240, 76, 64, 6), paint('#8592aa')); cv.drawRRect(rrect(bx, -240, 76, 64, 6), paint('#4b5872', stroke=1.4))
            cv.drawCircle(bx + 38, -208, 25, paint('#2b3550'))
    return _pic(('cold', label), fn, (-270, -310, 540, 330))

def cold_store(c, x, y, s=1., a=1., t=0., label='COLD STORAGE'):
    """An insulated cold-storage warehouse (516 x 300 at s=1) at (x, y): panel walls, a roller-shutter loading
    door on a dock, a snowflake badge, a cooling unit whose fan turns with t, wisps of cold air at the door."""
    if a <= 0: return
    with _fade(c, a, (x - 280 * s, y - 320 * s, x + 280 * s, y + 30 * s)):
        _play(c, _cold_pic(label), x, y, s)
        c.save(); c.translate(x, y); c.scale(s, s)
        fx, fy = 188, -208
        for k in range(4):
            an = t * 6 + k * math.pi / 2
            c.drawLine(fx, fy, fx + math.cos(an) * 20, fy + math.sin(an) * 20, paint('#c3cad8', stroke=7))
        c.drawCircle(fx, fy, 5, paint('#e2e8f0'))
        for k in range(3):
            q = (t * .35 + k / 3) % 1
            c.drawOval(_R(-50 + k * 50 + 20 * q, -44 - 18 * q, 60 + 30 * q, 12), paint(WHITE, .14 * math.sin(math.pi * q), blur=6))
        c.restore()

def _truck_pic(kind, col, label):
    heavy = kind == 'heavy'
    def fn(cv):
        L = 470 if heavy else 320; x0 = -L / 2; cx0 = L / 2 - 104
        _gsh(cv, L + 20, 2)
        cv.drawRect(_R(x0 + 4, -46, L - 12, 14), paint('#1a1f2a'))
        if heavy:
            cv.drawRect(_R(x0, -148, cx0 - x0 - 8, 104), paint(shader=_vg(-148, -44, '#c48a52', '#8a5a30')))
            for k in range(6): cv.drawLine(x0, -130 + k * 16, cx0 - 8, -130 + k * 16, paint('#6b4423', .7, stroke=1.6, cap=False))
            for px in np.arange(x0 + 40, cx0 - 20, 70): cv.drawRect(_R(px, -148, 6, 104), paint('#6b4423', .8))
            tarp = skia.Path(); tarp.moveTo(x0 + 2, -146); tarp.cubicTo(x0 + 40, -196, cx0 - 50, -196, cx0 - 10, -146); tarp.close()
            cv.drawPath(tarp, paint(shader=_vg(-190, -146, '#4f8a5f', '#2f5c3c')))
            cv.save(); cv.clipPath(tarp, True)
            for rx in np.linspace(x0 + 50, cx0 - 60, 4):
                rp = skia.Path(); rp.moveTo(rx - 18, -146); rp.quadTo(rx, -200, rx + 18, -146); cv.drawPath(rp, paint('#d6c7a1', .8, stroke=2.2))
            cv.restore()
            cv.drawLine(x0 + 4, -152, cx0 - 12, -152, paint('#d6c7a1', .8, stroke=2.2))
            cv.drawRect(_R(x0, -156, cx0 - x0 - 8, 10), paint(shade(col, -.2)))
        else:
            cv.drawRRect(rrect(x0, -160, cx0 - x0 - 8, 116, 6), paint(shader=_vg(-160, -44, '#eef1f6', '#b8c1cf')))
            cv.drawRRect(rrect(x0, -160, cx0 - x0 - 8, 116, 6), paint('#7d879c', stroke=1.4))
            cv.drawRect(_R(x0, -70, cx0 - x0 - 8, 10), paint(col))
        if label:
            lx = (x0 + cx0 - 8) / 2; ly = -100 if heavy else -112
            tw = text_w(label, 22, 800) + 24
            cv.drawRRect(rrect(lx - tw / 2, ly - 20, tw, 32, 6), paint('#f7f0e1', .95)); text(cv, label, lx, ly + 4, 22, 800, INK, 1, 'c')
        cab = skia.Path(); cab.moveTo(cx0, -40); cab.lineTo(cx0, -150); cab.lineTo(cx0 + 70, -150); cab.lineTo(cx0 + 98, -112)
        cab.lineTo(cx0 + 104, -40); cab.close()
        cp = paint(shader=_vg(-150, -40, shade(col, .15), shade(col, -.3))); cp.setPathEffect(skia.CornerPathEffect.Make(10)); cv.drawPath(cab, cp)
        cv.drawPath(poly(np.array([(cx0 + 40, -140), (cx0 + 70, -140), (cx0 + 90, -112), (cx0 + 40, -112)])), _cpaint(GLASS, 1, 4))
        cv.drawLine(cx0 + 48, -134, cx0 + 58, -120, paint(WHITE, .3, stroke=2))
        cv.drawLine(cx0 + 34, -146, cx0 + 34, -46, paint(shade(col, -.45), stroke=1.6))
        cv.drawRRect(rrect(cx0 + 46, -100, 16, 5, 2.5), paint(shade(col, -.5)))
        cv.drawRRect(rrect(cx0 + 94, -82, 12, 14, 3), paint('#fff4c2'))
        cv.drawRRect(rrect(cx0 + 92, -50, 18, 14, 4), paint('#9aa4b8'))
        cv.drawRRect(rrect(cx0 + 2, -140, 8, 26, 3), paint('#1f2533'))
        for wx in _truck_wheels(kind):
            q = skia.Path(); q.addArc(_R(wx - 37, -66, 74, 74), 180, 180); cv.drawPath(q, paint('#0d1220'))
    L = 470 if heavy else 320
    return _pic(('truck', kind, col, label), fn, (-L / 2 - 20, -210, L + 40, 230))

def _truck_wheels(kind):
    return (-176, -106, 182) if kind == 'heavy' else (-96, 108)

def truck(c, x, y, s=1., a=1., kind='light', col=ORANGE, label=None, t=0., move=0., flip=False):
    """A side-view goods carriage at (x, y), facing right: kind 'light' (320 long, box body, 2 axles) or 'heavy'
    (470 long, wooden deck under a tarp, 3 axles); col = cab colour; label on the body side; wheels turn with move."""
    if a <= 0: return
    L = 470 if kind == 'heavy' else 320
    with _fade(c, a, (x - (L / 2 + 30) * s, y - 220 * s, x + (L / 2 + 30) * s, y + 30 * s)):
        c.save(); c.translate(x, y); c.scale(-s if flip else s, s)
        _play(c, _truck_pic(kind, col, label))
        for wx in _truck_wheels(kind): _wheel(c, wx, -28, 30, move / 30. * (-1 if flip else 1))
        c.restore()

def _dental_pic():
    def fn(cv):
        _gsh(cv, 300, 2)
        up = '#1f9aa0'
        cv.drawRRect(rrect(-70, -20, 140, 20, 8), paint(shader=_vg(-20, 0, '#e6ebf2', '#a9b3c4')))
        cv.drawRRect(rrect(-20, -96, 40, 80, 8), paint(shader=_steel(-20, 20)))
        cv.drawLine(-40, -96, -40, -330, paint('#c3cad8', stroke=8)); cv.drawLine(-40, -330, 60, -330, paint('#c3cad8', stroke=7))
        cv.drawLine(60, -330, 60, -300, paint('#c3cad8', stroke=6))
        cv.drawPath(poly(np.array([(60, -300), (36, -278), (84, -278)])), _cpaint('#e9edf3', 1, 6))
        ch = skia.Path(); ch.moveTo(-142, -246); ch.lineTo(-84, -128); ch.quadTo(-76, -112, -56, -112); ch.lineTo(44, -112)
        ch.quadTo(62, -112, 76, -104); ch.lineTo(136, -66)
        cv.drawPath(ch, paint(shade(up, -.45), 1, stroke=40))
        cv.drawPath(ch, paint(shade(up, -.05), 1, stroke=34))
        hl = skia.Path(); hl.moveTo(-150, -238); hl.lineTo(-96, -128); hl.quadTo(-88, -124, -60, -124); hl.lineTo(44, -124)
        cv.drawPath(hl, paint(shade(up, .35), .55, stroke=6))
        cv.save(); cv.translate(-156, -268); cv.rotate(-62); cv.drawRRect(rrect(-24, -15, 48, 30, 14), paint(shade(up, -.4))); cv.drawRRect(rrect(-22, -13, 44, 26, 12), paint(shade(up, .08))); cv.restore()
        cv.drawRRect(rrect(-36, -154, 80, 11, 5.5), paint('#e6ebf2')); cv.drawRect(_R(-8, -146, 6, 18), paint('#c3cad8'))
        cv.drawLine(20, -96, 96, -170, paint('#c3cad8', stroke=5)); cv.drawRRect(rrect(80, -184, 70, 12, 4), paint('#e6ebf2'))
        for k in range(4): cv.drawLine(88 + k * 14, -184, 92 + k * 14, -204, paint('#8d98ad', stroke=2.4))
    return _pic(('dental',), fn, (-200, -345, 380, 365))

def dental_chair(c, x, y, s=1., a=1., t=0., lamp=1.):
    """A dentist's chair (300 x 340 at s=1) at (x, y): reclined teal upholstery, pedestal, instrument tray, an
    overhead lamp (lamp 0..1 lights its cone)."""
    if a <= 0: return
    with _fade(c, a, (x - 220 * s, y - 360 * s, x + 200 * s, y + 30 * s)):
        _play(c, _dental_pic(), x, y, s)
        if lamp > 0:
            c.save(); c.translate(x, y); c.scale(s, s)
            c.drawPath(poly(np.array([(40, -278), (80, -278), (130, -140), (-20, -140)])), paint('#fff7d6', .1 * lamp, blur=8))
            c.drawOval(_R(42, -282, 36, 8), paint('#fff7d6', .9 * lamp))
            c.restore()

def _flats_pic(n):
    def fn(cv):
        H_ = 76 + n * 58
        _gsh(cv, 340, 2)
        cv.drawRect(_R(-150, -H_, 300, H_), paint(shader=_vg(-H_, 0, '#e8dcc6', '#c9b694')))
        cv.drawRect(_R(-160, -H_ - 14, 320, 16), paint('#b9a47f'))
        cv.drawRect(_R(-110, -H_ - 52, 54, 40), paint('#d6c6a6')); cv.drawRRect(rrect(30, -H_ - 50, 60, 36, 10), paint('#1f2937'))
        cv.drawRect(_R(40, -H_ - 14 - 2, 6, 4), paint('#1f2937')); cv.drawRect(_R(74, -H_ - 14 - 2, 6, 4), paint('#1f2937'))
        for k in range(n):
            fy = -76 - (k + 1) * 58
            cv.drawLine(-150, fy + 58, 150, fy + 58, paint('#b39f7c', stroke=2, cap=False))
            for i in range(4):
                wx = -128 + i * 66
                cv.drawRect(_R(wx - 3, fy + 9, 50, 38), paint('#8f7b5c'))
                if i in (1, 2):
                    cv.drawRect(_R(wx - 6, fy + 40, 56, 12), paint('#a6927a', .9))
                    for b in range(7): cv.drawLine(wx - 4 + b * 8, fy + 40, wx - 4 + b * 8, fy + 52, paint('#6b5a43', stroke=1.4))
        cv.drawRect(_R(-150, -76, 300, 76), paint('#bfae8d'))
        cv.drawRect(_R(-34, -64, 68, 64), paint('#5b3a22')); cv.drawRect(_R(-28, -58, 28, 58), paint('#2a3446')); cv.drawRect(_R(2, -58, 26, 58), paint('#2a3446'))
        cv.drawRect(_R(-50, -76, 100, 10), paint('#8f7b5c'))
        for wx in (-128, 78): cv.drawRect(_R(wx, -58, 50, 34), paint('#8f7b5c')); cv.drawRect(_R(wx + 3, -55, 44, 28), paint('#2a3446'))
    return _pic(('flats', n), fn, (-175, -(76 + n * 58) - 70, 350, 76 + n * 58 + 90))

def flats(c, x, y, s=1., a=1., n=6, t=0.):
    """An apartment block of n floors (300 wide, 76 + 58 n tall at s=1) at (x, y): balconies, a rooftop water
    tank; windows light up and go dark slowly with t (warm light)."""
    if a <= 0: return
    with _fade(c, a, (x - 180 * s, y - (150 + n * 58) * s, x + 180 * s, y + 30 * s)):
        _play(c, _flats_pic(n), x, y, s)
        c.save(); c.translate(x, y); c.scale(s, s)
        for k in range(n):
            fy = -76 - (k + 1) * 58
            for i in range(4):
                j = k * 4 + i; ph = t * .12 + hsh(j, 9) * 7; f = math.floor(ph)
                v = lerp(hsh(j, f) > .42, hsh(j, f + 1) > .42, seg(ph - f, .85, 1))
                r = _R(-128 + i * 66, fy + 12, 44, 32)
                c.drawRect(r, paint(mixc('#2a3446', '#ffd27a', v)))
                if v > .05: c.drawRect(r, paint('#ffb347', .35 * v, blur=6))
                c.drawLine(-128 + i * 66 + 22, fy + 12, -128 + i * 66 + 22, fy + 44, paint('#8f7b5c', stroke=2, cap=False))
        c.restore()

def _tea_pic():
    def fn(cv):
        _gsh(cv, 460, 2, .4)
        def hill(pts, c0, c1):
            P = catmull(np.array(pts, float), step=4); Q = np.vstack([P, [(P[-1][0], 0), (P[0][0], 0)]])
            path = poly(Q); cv.drawPath(path, paint(shader=_vg(min(P[:, 1]), 0, c0, c1))); return P, path
        B, bpath = hill([(-230, -128), (-150, -178), (-40, -160), (60, -198), (180, -160), (230, -170)], '#5f9a6a', '#3e714b')
        for tx in (-120, 40, 150):
            ty = np.interp(tx, B[:, 0], B[:, 1]) + 6
            cv.drawLine(tx, ty, tx, ty - 22, paint('#3b2a1a', stroke=3)); cv.drawCircle(tx, ty - 30, 14, paint('#2f5f3c'))
        P, path = hill([(-230, -66), (-120, -116), (0, -102), (120, -138), (230, -98)], '#2f6b40', '#1d4a2c')
        cv.save(); cv.clipPath(path, True)
        for row in range(6):
            off = 14 + row * 23; xs = np.linspace(-232, 232, 40)
            R_ = np.stack([xs, np.interp(xs, P[:, 0], P[:, 1]) + off + 3 * np.sin(xs / 40 + row)], 1)
            rp = poly(R_, False)
            cv.drawPath(rp, paint('#173d25', .8, stroke=17, cap=False))
            cv.drawPath(rp, paint('#3f8f52', 1, stroke=14, cap=False))
            q = R_.copy(); q[:, 1] -= 4; cv.drawPath(poly(q, False), paint('#6cbf78', .55, stroke=4, cap=False))
        cv.restore()
        lx, ly = 152, -238
        for sgn, ang in ((-1, -30), (1, 25)):
            cv.save(); cv.translate(lx, ly); cv.rotate(ang)
            lf = skia.Path(); lf.moveTo(0, 0); lf.cubicTo(sgn * 26, -10, sgn * 30, -40, 0, -58); lf.cubicTo(-sgn * 12, -40, -sgn * 8, -12, 0, 0)
            cv.drawPath(lf, paint(shader=_vg(-58, 0, '#86efac', '#16a34a'))); cv.drawLine(0, 0, sgn * 4, -50, paint('#14532d', .6, stroke=1.6)); cv.restore()
        bud = skia.Path(); bud.moveTo(lx, ly); bud.cubicTo(lx + 8, ly - 20, lx + 4, ly - 40, lx, ly - 48); bud.cubicTo(lx - 4, ly - 40, lx - 8, ly - 20, lx, ly)
        cv.drawPath(bud, paint('#bbf7d0')); cv.drawLine(lx, ly, lx, ly + 20, paint('#14532d', stroke=3))
    return _pic(('tea',), fn, (-240, -300, 480, 320))

def tea(c, x, y, s=1., a=1.):
    """Tea bushes in rows over green hills (460 x 300 at s=1) at (x, y), with a two-leaves-and-a-bud sprig."""
    if a <= 0: return
    _play(c, _tea_pic(), x, y, s, a)

def _cake_pic(kind):
    def fn(cv):
        if kind == 'slice':
            _gsh(cv, 170, 2, .4, 14)
            cv.drawOval(_R(-80, -14, 160, 22), paint('#e5e7eb')); cv.drawOval(_R(-80, -14, 160, 22), paint('#9ca3af', stroke=1.2))
            P = poly(np.array([(-62, -8), (64, -8), (64, -84), (-62, -36)]))
            cv.save(); cv.clipPath(P, True)
            for k, col in enumerate(('#f2c48d', '#fff3df', '#e9b376', '#fff3df', '#f2c48d')):
                cv.drawRect(_R(-70, -8 - (k + 1) * 16, 140, 16), paint(col))
            cv.restore()
            top = poly(np.array([(-64, -38), (66, -86), (66, -96), (-64, -46)])); cv.drawPath(top, _cpaint('#f9a8d4', 1, 4))
            cv.drawCircle(52, -100, 9, paint('#dc2626')); cv.drawLine(52, -108, 58, -122, paint('#166534', stroke=2))
        elif kind == 'loaf':
            _gsh(cv, 200, 2, .45, 14)
            p = skia.Path(); p.moveTo(-90, -6); p.cubicTo(-98, -70, -60, -96, 0, -96); p.cubicTo(60, -96, 98, -70, 90, -6); p.close()
            cv.drawPath(p, paint(shader=_vg(-96, -6, '#e0a456', '#8a4f1d')))
            for k in range(4):
                cv.drawLine(-52 + k * 32, -40, -34 + k * 32, -76, paint('#f3d08a', .95, stroke=6))
            for k in range(12): cv.drawCircle(-70 + hsh(k, 3) * 140, -80 + hsh(k, 4) * 40, 1.6, paint(WHITE, .6))
        else:
            _gsh(cv, 220, 2, .45, 16)
            cv.drawOval(_R(-104, -26, 208, 20), paint('#d1d5db')); cv.drawRect(_R(-8, -18, 16, 18), paint('#9ca3af'))
            cv.drawOval(_R(-40, -6, 80, 10), paint('#9ca3af'))
            y0 = -24
            for k, (w_, h_) in enumerate(((180, 70), (132, 62), (88, 54))):
                yb = y0
                cv.drawRect(_R(-w_ / 2, yb - h_, w_, h_), paint(shader=lgrad((-w_ / 2, 0), (w_ / 2, 0), ['#efe3cf', '#fffaf1', '#e6d7bf'])))
                cv.drawOval(_R(-w_ / 2, yb - h_ - 8, w_, 16), paint('#fffaf1'))
                cv.drawRect(_R(-w_ / 2, yb - 16, w_, 8), paint('#f9a8d4', .9))
                for j in range(int(w_ / 12)): cv.drawCircle(-w_ / 2 + 6 + j * 12, yb - 2, 5, paint('#fffaf1'))
                for j in range(int(w_ / 22)):
                    dx = -w_ / 2 + 11 + j * 22; dp = skia.Path(); dp.moveTo(dx - 6, yb - h_); dp.quadTo(dx, yb - h_ + 18, dx + 6, yb - h_)
                    cv.drawPath(dp, paint('#fffaf1'))
                y0 = yb - h_
            for k, (fx, fy) in enumerate(((-60, -70), (40, -140), (-28, -200), (22, -60), (-50, -128))):
                for j in range(5):
                    an = j * math.tau / 5; cv.drawCircle(fx + math.cos(an) * 6, fy + math.sin(an) * 6, 5, paint('#f472b6' if k % 2 else '#fb7185'))
                cv.drawCircle(fx, fy, 4, paint('#fde68a'))
            cv.drawLine(0, y0 - 8, 0, y0 - 34, paint('#d4a94f', stroke=2.4))
            hp = skia.Path(); hp.moveTo(0, y0 - 36); hp.cubicTo(-16, y0 - 48, -10, y0 - 64, 0, y0 - 54); hp.cubicTo(10, y0 - 64, 16, y0 - 48, 0, y0 - 36)
            cv.drawPath(hp, paint('#d4a94f'))
    return _pic(('cake', kind), fn, (-120, -300, 240, 320))

def cake(c, x, y, s=1., a=1., kind='wedding'):
    """A cake at (x, y): kind 'wedding' (three tiers on a stand, ~200 x 270), 'slice' (layered wedge on a plate,
    ~160 x 120) or 'loaf' (a scored bread loaf, ~190 x 100)."""
    if a <= 0: return
    _play(c, _cake_pic(kind), x, y, s, a)

def _sack_pic(label, col):
    def fn(cv):
        _gsh(cv, 150, 2, .45, 14)
        p = skia.Path(); p.moveTo(-26, -150); p.cubicTo(-70, -120, -78, -40, -64, -8); p.quadTo(-60, 0, -48, 0); p.lineTo(48, 0)
        p.quadTo(60, 0, 64, -8); p.cubicTo(78, -40, 70, -120, 26, -150); p.close()
        cv.drawPath(p, paint(shader=lgrad((-70, 0), (70, 0), [shade(col, -.2), shade(col, .12), shade(col, -.25)])))
        for k in range(3): cv.drawLine(-40 + k * 34, -120, -46 + k * 36, -20, paint(shade(col, -.3), .35, stroke=2))
        cv.drawPath(poly(np.array([(-26, -150), (-36, -176), (-12, -164), (0, -180), (12, -164), (36, -176), (26, -150)])), _cpaint(shade(col, .05), 1, 3))
        cv.drawRRect(rrect(-30, -156, 60, 10, 5), paint('#8a5a30'))
        if label:
            l2, fs, tw = _fit(label, 24, 800, 96, 16)
            cv.drawRRect(rrect(-tw / 2 - 12, -98, tw + 24, 40, 6), paint('#fffaf0')); cv.drawRRect(rrect(-tw / 2 - 12, -98, tw + 24, 40, 6), paint(shade(col, -.45), stroke=1.4))
            text(cv, l2, 0, -78 + fs * .36, fs, 800, INK, 1, 'c')
    return _pic(('sack', label, col), fn, (-90, -195, 180, 215))

def sack(c, x, y, s=1., a=1., label='Flour', col='#e7d8b8'):
    """A tied cloth sack (150 x 180 at s=1) at (x, y) with a label patch."""
    if a <= 0: return
    _play(c, _sack_pic(label, col), x, y, s, a)

def _boxes_pic():
    def fn(cv):
        _gsh(cv, 180, 2, .45, 14)
        y0 = 0
        for k, (w_, h_, dx) in enumerate(((150, 60, 0), (132, 54, -8), (112, 48, 6))):
            yb = y0
            cv.drawRect(_R(dx - w_ / 2, yb - h_, w_, h_), paint(shader=_vg(yb - h_, yb, '#fff5fa', '#f3d7e6')))
            cv.drawRect(_R(dx - w_ / 2 - 3, yb - h_, w_ + 6, 13), paint('#f472b6'))
            cv.drawRect(_R(dx - 6, yb - h_, 12, h_), paint('#db2777', .85))
            cv.drawCircle(dx + w_ * .3, yb - h_ * .45, 8, paint('#f472b6', .9)); text(cv, 'M', dx + w_ * .3, yb - h_ * .45 + 4.5, 11, 800, WHITE, 1, 'c')
            cv.drawRect(_R(dx - w_ / 2, yb - h_, w_, h_), paint('#d9a3bf', stroke=1.2, cap=False))
            y0 = yb - h_ - 2
        bw = skia.Path(); bw.moveTo(6, y0 + 2); bw.cubicTo(-18, y0 - 18, -22, y0 + 4, 6, y0 + 2); bw.cubicTo(30, y0 - 18, 34, y0 + 4, 6, y0 + 2)
        cv.drawPath(bw, paint('#db2777'))
    return _pic(('boxes',), fn, (-95, -200, 190, 220))

def boxes(c, x, y, s=1., a=1.):
    """Three stacked pink cake boxes with ribbons (150 x 170 at s=1) at (x, y)."""
    if a <= 0: return
    _play(c, _boxes_pic(), x, y, s, a)

def _gen_pic():
    def fn(cv):
        _gsh(cv, 290, 2)
        cv.drawRect(_R(-136, -18, 272, 18), paint('#2a303c'))
        cv.drawRRect(rrect(-126, -156, 252, 140, 10), paint(shader=_vg(-156, -16, '#f0c13c', '#b8860b')))
        cv.drawRRect(rrect(-126, -156, 252, 140, 10), paint('#7a5a08', stroke=1.6))
        for k in range(7): cv.drawLine(-108, -132 + k * 14, -10, -132 + k * 14, paint('#7a5a08', .8, stroke=4))
        cv.drawRRect(rrect(10, -138, 98, 104, 6), paint('#d9a521')); cv.drawRRect(rrect(10, -138, 98, 104, 6), paint('#7a5a08', stroke=1.4))
        cv.drawRRect(rrect(24, -124, 70, 30, 4), paint('#0b0f17')); ftext(cv, '230V', 59, -103, 15, MONO, GREEN, 1, 'c')
        for k, cc in enumerate((GREEN, RED, '#e5e7eb')): cv.drawCircle(34 + k * 25, -70, 7, paint(cc))
        cv.drawRect(_R(80, -186, 16, 32), paint('#3a4252')); cv.drawRect(_R(76, -192, 24, 8), paint('#262c38'))
        text(cv, 'DG SET', -59, -24, 13, 800, '#5a4206', 1, 'c', track=2)
    return _pic(('gen',), fn, (-150, -200, 300, 220))

def generator(c, x, y, s=1., a=1., t=0., on=0.):
    """A diesel standby generator set (272 x 190 at s=1) at (x, y); on 0..1 = running (exhaust wisps, glowing
    status)."""
    if a <= 0: return
    with _fade(c, a, (x - 160 * s, y - 260 * s, x + 160 * s, y + 30 * s)):
        _play(c, _gen_pic(), x, y, s)
        if on > 0:
            c.save(); c.translate(x, y); c.scale(s, s)
            for k in range(3):
                q = (t * .6 + k / 3) % 1
                c.drawCircle(88 + 18 * q, -196 - 50 * q, 8 + 14 * q, paint('#cbd5e1', .25 * on * (1 - q), blur=5))
            c.drawCircle(34, -70, 12, paint(GREEN, .5 * on, blur=6))
            c.restore()

def _ext_pic():
    def fn(cv):
        _gsh(cv, 90, 2, .45, 12)
        cv.drawRRect(rrect(-26, -150, 52, 150, 22), paint(shader=lgrad((-26, 0), (26, 0), ['#991b1b', '#ef4444', '#b91c1c'])))
        cv.drawRect(_R(-26, -112, 52, 46), paint('#f8fafc')); icon(cv, 'flame', 0, -89, .5, '#dc2626', 1, 4)
        cv.drawRRect(rrect(-9, -170, 18, 22, 4), paint('#1f2937'))
        cv.drawLine(-6, -174, 30, -186, paint('#374151', stroke=6)); cv.drawLine(-4, -166, 26, -170, paint('#4b5563', stroke=5))
        cv.drawCircle(-18, -170, 9, paint('#e5e7eb')); cv.drawCircle(-18, -170, 9, paint('#374151', stroke=2))
        q = skia.Path(); q.addArc(_R(-24, -176, 12, 12), 180, 120); cv.drawPath(q, paint(GREEN, stroke=2))
        h = skia.Path(); h.moveTo(8, -164); h.cubicTo(40, -150, 44, -60, 34, -30); cv.drawPath(h, paint('#111827', stroke=6))
        cv.drawRRect(rrect(28, -34, 12, 20, 4), paint('#111827'))
        cv.drawLine(-14, -140, -14, -20, paint(WHITE, .25, stroke=5))
    return _pic(('ext',), fn, (-50, -200, 110, 215))

def extinguisher(c, x, y, s=1., a=1.):
    """A red fire extinguisher (90 x 190 at s=1) at (x, y): gauge, handle, hose."""
    if a <= 0: return
    _play(c, _ext_pic(), x, y, s, a)

def _bldg_pic(floors):
    def fn(cv):
        H_ = 120 + floors * 100
        _gsh(cv, 340, 2)
        cv.drawRect(_R(-155, -H_, 310, H_), paint(shader=_vg(-H_, 0, '#d5d9e1', '#aab2c0')))
        cv.drawRect(_R(-163, -H_ - 18, 326, 20), paint('#8d96a8'))
        for k in range(floors):
            fy = -120 - (k + 1) * 100
            for i in range(3):
                wx = -118 + i * 92
                cv.drawRect(_R(wx, fy + 22, 54, 56), paint('#2a3446')); cv.drawRect(_R(wx, fy + 22, 54, 56), paint('#6b7488', stroke=3, cap=False))
                cv.drawLine(wx + 27, fy + 22, wx + 27, fy + 78, paint('#6b7488', stroke=2, cap=False))
                cv.drawRect(_R(wx - 8, fy + 12, 70, 9), paint('#9aa3b5'))
            cv.drawLine(-155, fy + 100, 155, fy + 100, paint('#9aa3b5', stroke=3, cap=False))
        cv.drawRect(_R(-140, -108, 200, 108), paint('#6b7488'))
        for yy in np.arange(-100, 0, 9): cv.drawLine(-136, yy, 56, yy, paint('#4b5466', stroke=2, cap=False))
        cv.drawRect(_R(-150, -120, 220, 14), paint(GOLD, .9))
        cv.drawRect(_R(82, -104, 56, 104), paint('#4b5872')); cv.drawRect(_R(90, -96, 40, 50), paint('#9fc3e8'))
    return _pic(('bldg', floors), fn, (-175, -(140 + floors * 100) - 10, 350, 160 + floors * 100))

def building(c, x, y, s=1., a=1., floors=2):
    """A plain shop building block (310 wide, 120 + 100 per upper floor at s=1) at (x, y): a shuttered shop on
    the ground floor, windows with sunshades above."""
    if a <= 0: return
    _play(c, _bldg_pic(floors), x, y, s, a)

def _factory_pic():
    def fn(cv):
        _gsh(cv, 480, 2)
        cv.drawRect(_R(-226, -170, 360, 170), paint(shader=_vg(-170, 0, '#5b6a86', '#36415a')))
        saw = skia.Path(); saw.moveTo(-226, -170)
        for k in range(4):
            x0 = -226 + k * 90; saw.lineTo(x0, -226); saw.lineTo(x0 + 90, -170)
        saw.lineTo(-226, -170); saw.close(); cv.drawPath(saw, paint('#46536f'))
        for k in range(4):
            x0 = -226 + k * 90; cv.drawPath(poly(np.array([(x0 + 2, -222), (x0 + 2, -172), (x0 + 30, -172)])), paint('#9fc3e8', .85))
        for k in range(5): cv.drawRect(_R(-206 + k * 62, -130, 40, 34), paint('#9fc3e8', .8))
        cv.drawRect(_R(-110, -84, 90, 84), paint('#2b3348'))
        for yy in np.arange(-78, 0, 10): cv.drawLine(-106, yy, -24, yy, paint('#46536f', stroke=2, cap=False))
        cv.drawRect(_R(134, -120, 96, 120), paint('#7c879e'))
        for i in range(2):
            for j in range(2): cv.drawRect(_R(146 + i * 42, -104 + j * 46, 28, 30), paint('#ffd27a', .85))
        cv.drawRect(_R(168, -330, 34, 214), paint(shader=lgrad((168, 0), (202, 0), ['#8f3f2f', '#b5563f', '#7a3426'])))
        for yy in (-300, -240): cv.drawRect(_R(166, yy, 38, 8), paint(WHITE, .7))
        cv.drawRect(_R(164, -336, 42, 10), paint('#5b2a20'))
    return _pic(('factory',), fn, (-245, -350, 490, 370))

def factory(c, x, y, s=1., a=1., t=0.):
    """A sawtooth-roof factory (456 x 336 at s=1) at (x, y) with a brick chimney that smokes (t)."""
    if a <= 0: return
    with _fade(c, a, (x - 260 * s, y - 520 * s, x + 340 * s, y + 30 * s)):
        _play(c, _factory_pic(), x, y, s)
        c.save(); c.translate(x, y); c.scale(s, s)
        for k in range(5):
            q = (t * .25 + k / 5) % 1
            c.drawCircle(185 + 60 * q + 8 * math.sin(q * 6 + k), -346 - 150 * q, 12 + 26 * q, paint('#cbd5e1', .3 * (1 - q) * min(1, q * 6), blur=6 + 6 * q))
        c.restore()

def _ship_pic():
    def fn(cv):
        hull = skia.Path(); hull.moveTo(-250, -110); hull.lineTo(236, -110); hull.lineTo(262, -126); hull.lineTo(232, -20)
        hull.lineTo(-222, -20); hull.lineTo(-252, -70); hull.close()
        cv.drawPath(hull, paint('#1e293b'))
        cv.save(); cv.clipPath(hull, True); cv.drawRect(_R(-270, -52, 540, 40), paint('#b91c1c')); cv.drawRect(_R(-270, -56, 540, 4), paint(WHITE, .8)); cv.restore()
        cv.drawLine(-250, -110, 236, -110, paint('#cbd5e1', stroke=3))
        text(cv, 'DECCAN STAR', 150, -78, 15, 800, WHITE, .85, 'c', track=2)
        cols = (ORANGE, BLUE, '#2f7a43', RED, '#e5e7eb', GOLD, '#0e7490')
        for r in range(3):
            for k in range(7):
                if r == 2 and k in (0, 6): continue
                cx = -130 + k * 50; cy = -110 - (r + 1) * 26; col = cols[(r * 3 + k * 2) % len(cols)]
                cv.drawRect(_R(cx, cy, 47, 24), paint(shade(col, -.1)))
                for j in range(5): cv.drawLine(cx + 5 + j * 9, cy + 3, cx + 5 + j * 9, cy + 21, paint(shade(col, -.4), .7, stroke=1.4))
        cv.drawRect(_R(-236, -206, 76, 96), paint('#f1f5f9'))
        for j in range(3): cv.drawRect(_R(-228, -196 + j * 26, 60, 10), paint('#1e293b', .85))
        cv.drawRect(_R(-246, -214, 96, 10), paint('#cbd5e1'))
        cv.drawRect(_R(-214, -250, 28, 36), paint('#1e293b')); cv.drawRect(_R(-214, -242, 28, 8), paint(GOLD))
    return _pic(('ship',), fn, (-275, -270, 550, 280))

def ship(c, x, y, s=1., a=1., t=0.):
    """A container ship (520 x 260 at s=1) riding animated waves at (x, y) = waterline centre (it bobs with t)."""
    if a <= 0: return
    with _fade(c, a, (x - 300 * s, y - 300 * s, x + 300 * s, y + 70 * s)):
        c.save(); c.translate(x, y); c.scale(s, s)
        def wave(y0, ph, amp, col, al):
            xs = np.linspace(-300, 300, 50); yy = y0 + amp * np.sin(xs / 38 + ph) + amp * .5 * np.sin(xs / 17 - ph * 1.3)
            P = np.vstack([np.stack([xs, yy], 1), [(300, 50), (-300, 50)]])
            c.drawPath(poly(P), paint(mixc(col, '#0b1433', 1 - al)))
            c.drawPath(poly(np.stack([xs, yy], 1), False), paint(WHITE, .35 * al, stroke=2))
        wave(-14, t * 1.1, 5, '#1d4ed8', .6)
        c.save(); c.translate(0, 3 * math.sin(t * 1.2)); c.rotate(.7 * math.sin(t * .9)); _play(c, _ship_pic()); c.restore()
        wave(4, t * 1.6 + 1, 6, '#2563eb', .85)
        c.restore()

# ------------------------------------------------------------------ people: flat-vector busts, speech bubble
# who -> skin, hair, clothes, neckline, extras.  Geometry is shared so the cast stays consistent in proportion.
CAST = {
    'meera':    dict(skin='#b97a52', hair='#1a1210', body='#1f7a7a', neck='v', style='bun', apron=CREAM, bindi=True, ear='gold', fem=True),
    'rohan':    dict(skin='#a8714a', hair='#211812', body='#6b7a3a', neck='collar', style='short', stubble=True),
    'kabir':    dict(skin='#9a6644', hair='#17110d', body='#eef2f7', inner='#4f7cc4', neck='lapel', style='side', glasses=True, steth=True),
    'ravi':     dict(skin='#8a5636', hair='#1c140f', body='#a83232', neck='collar', style='cap', cap='#2c3e63', moustache='thick', check=True),
    'anil':     dict(skin='#b07a50', hair='#241a12', body='#3f4a5e', inner='#f1f5f9', neck='jacket', style='short', beard=True, moustache='trim'),
    'sunil':    dict(skin='#a46d48', hair='#2a201a', body='#e3d3b0', neck='mandarin', style='temples', moustache='trim'),
    'officer':  dict(skin='#9b6a47', hair='#2b2b2b', body='#596273', inner='#f8fafc', neck='lapel', style='officer', glasses=True, tie='#1e3a8a', file=True),
    'ca':       dict(skin='#b47b55', hair='#16100c', body='#1e2a4a', inner='#f8fafc', neck='lapel', style='bob', glasses=True, ear='gold', fem=True),
    'farmer':   dict(skin='#7a4a2c', hair='#1c140f', body='#f1ede4', neck='mandarin', style='turban', turban='#e07b2e', moustache='thick'),
    'supplier': dict(skin='#9e6a46', hair='#1f1712', body='#6b7280', neck='round', style='cap', cap='#2563eb', apron='#2f5c3c'),
    'staff':    dict(skin='#a9744e', hair='#1f1712', body='#2563eb', neck='round', style='short', logo=True),
}
_HC, _HRX, _HRY = (0., -160.), 41., 51.

def _torso_path():
    def build():
        p = skia.Path(); p.moveTo(-108, 0)
        p.cubicTo(-108, -42, -104, -70, -80, -82); p.cubicTo(-62, -91, -40, -94, -20, -97); p.lineTo(20, -97)
        p.cubicTo(40, -94, 62, -91, 80, -82); p.cubicTo(104, -70, 108, -42, 108, 0); p.close(); return p
    return _cache('torso', build)

def _person_body(who, col):
    d = CAST[who]; body = col or d['body']; skin = d['skin']
    def fn(cv):
        cv.drawOval(_R(-118, -14, 236, 26), paint(BLACK, .35, blur=12))
        cv.save(); cv.clipRect(_R(-160, -300, 320, 300))
        T = _torso_path()
        cv.drawRect(_R(-16, -124, 32, 40), paint(shade(skin, -.14)))
        cv.drawOval(_R(-17, -114, 34, 14), paint(shade(skin, -.3), .55))           # chin shadow
        cv.drawPath(T, paint(shader=_vg(-97, 0, shade(body, .1), shade(body, -.22))))
        rim = skia.Path(); rim.moveTo(-108, -6); rim.cubicTo(-108, -42, -104, -70, -80, -82); rim.cubicTo(-62, -91, -40, -94, -20, -97)
        rim.moveTo(20, -97); rim.cubicTo(40, -94, 62, -91, 80, -82); rim.cubicTo(104, -70, 108, -42, 108, -6)
        cv.drawPath(rim, paint(shade(body, .5), .35, stroke=2))
        if d.get('check'):
            cv.save(); cv.clipPath(T, True)
            for k in range(-120, 121, 18):
                cv.drawLine(k, -100, k, 0, paint(shade(body, -.35), .55, stroke=5, cap=False))
                cv.drawLine(-120, -100 + (k + 120) * .45, 120, -100 + (k + 120) * .45, paint(shade(body, -.35), .45, stroke=4, cap=False))
            for k in range(-120, 121, 36): cv.drawLine(k + 9, -100, k + 9, 0, paint('#f8e7d0', .25, stroke=1.4, cap=False))
            cv.restore()
        cv.save(); cv.clipPath(T, True)
        cv.drawRect(_R(-110, -100, 220, 100), paint(shader=_cache('tshade', lambda: lgrad((-110, 0), (110, 0), [(BLACK, .28), (BLACK, 0), (BLACK, 0), (BLACK, .28)], [0, .22, .78, 1]))))
        nk = d['neck']
        if nk == 'v':
            cv.drawPath(poly(np.array([(-19, -98), (19, -98), (0, -66)])), paint(shade(skin, -.08)))
            cv.drawPath(poly(np.array([(-19, -98), (0, -66), (19, -98)]), False), paint(shade(body, -.35), stroke=3))
        elif nk == 'round':
            cv.drawOval(_R(-22, -110, 44, 26), paint(shade(skin, -.08))); cv.drawArc(_R(-22, -110, 44, 26), 0, 180, False, paint(shade(body, -.35), stroke=3))
        elif nk == 'collar':
            cv.drawPath(poly(np.array([(-18, -98), (18, -98), (0, -74)])), paint(shade(skin, -.08)))
            for sg in (-1, 1): cv.drawPath(poly(np.array([(0, -74), (sg * 22, -101), (sg * 34, -80)])), _cpaint(shade(body, .22), 1, 3))
            cv.drawLine(0, -74, 0, 0, paint(shade(body, -.35), stroke=1.6))
            for k in range(3): cv.drawCircle(3, -58 + k * 22, 2.2, paint(shade(body, .4)))
        elif nk == 'mandarin':
            cv.drawRRect(rrect(-20, -104, 40, 12, 5), paint(shade(body, -.08)))
            cv.drawLine(0, -92, 0, -40, paint(shade(body, -.3), stroke=1.6))
            for k in range(3): cv.drawCircle(0, -82 + k * 15, 2.4, paint(shade(body, -.45)))
        elif nk in ('lapel', 'jacket'):
            inner = d.get('inner', WHITE)
            cv.drawPath(poly(np.array([(-30, -98), (30, -98), (0, -26)])), paint(inner))
            if d.get('neck') == 'lapel' and inner != WHITE and who == 'kabir':
                cv.drawPath(poly(np.array([(-14, -98), (14, -98), (0, -70)])), paint(shade(skin, -.08)))
                for sg in (-1, 1): cv.drawPath(poly(np.array([(0, -70), (sg * 16, -100), (sg * 22, -84)])), paint(shade(inner, .25)))
            elif nk == 'lapel':
                cv.drawPath(poly(np.array([(-14, -98), (14, -98), (0, -78)])), paint(shade(skin, -.08)))
                for sg in (-1, 1): cv.drawPath(poly(np.array([(0, -76), (sg * 15, -100), (sg * 20, -86)])), paint(shade(inner, -.06)))
            else:
                cv.drawOval(_R(-16, -108, 32, 20), paint(shade(skin, -.08)))
            for sg in (-1, 1):
                L = poly(np.array([(sg * 22, -98), (sg * 40, -94), (sg * 22, -40), (0, -24), (sg * 4, -40)]))
                cv.drawPath(L, _cpaint(shade(body, -.12 if nk == 'lapel' else -.25), 1, 4))
                cv.drawPath(L, paint(shade(body, -.4), .7, stroke=1.4))
            if d.get('tie'):
                tc = d['tie']; cv.drawPath(poly(np.array([(-6, -80), (6, -80), (9, -36), (0, -26), (-9, -36)])), _cpaint(tc, 1, 2))
                cv.drawPath(poly(np.array([(-7, -88), (7, -88), (5, -79), (-5, -79)])), paint(shade(tc, .15)))
                for k in range(3): cv.drawLine(-7, -70 + k * 12, 7, -76 + k * 12, paint(shade(tc, .35), .6, stroke=2))
        if d.get('apron'):
            ap = d['apron']
            A = skia.Path(); A.moveTo(-40, -72); A.lineTo(40, -72); A.lineTo(50, 0); A.lineTo(-50, 0); A.close()
            cv.drawPath(A, paint(shader=_vg(-72, 0, shade(ap, .05), shade(ap, -.12))))
            for sg in (-1, 1): cv.drawLine(sg * 36, -72, sg * 18, -97, paint(shade(ap, -.08), stroke=6))
            cv.drawRRect(rrect(-22, -40, 44, 24, 4), paint(shade(ap, -.18), .9, stroke=1.6))
            cv.drawPath(A, paint(shade(ap, -.3), .6, stroke=1.4))
        if d.get('logo'):
            cv.drawCircle(-46, -56, 13, paint(CREAM)); text(cv, 'M', -46, -50.5, 15, 800, shade(body, -.3), 1, 'c')
        cv.restore()
        if d.get('steth'):
            sp = skia.Path(); sp.moveTo(-20, -100); sp.cubicTo(-34, -60, -20, -30, 6, -34); sp.cubicTo(28, -38, 34, -70, 22, -100)
            cv.drawPath(sp, paint('#2b3348', stroke=4))
            sp2 = skia.Path(); sp2.moveTo(6, -34); sp2.cubicTo(10, -20, 30, -20, 34, -40); cv.drawPath(sp2, paint('#2b3348', stroke=3.6))
            cv.drawCircle(36, -44, 8, paint('#c3cad8')); cv.drawCircle(36, -44, 8, paint('#5b6579', stroke=2))
        if d.get('file'):
            cv.save(); cv.translate(70, -40); cv.rotate(-14)
            cv.drawRRect(rrect(-36, -46, 72, 92, 4), paint('#7c2d12')); cv.drawRRect(rrect(-32, -42, 66, 86, 3), paint('#9a3412'))
            cv.drawRRect(rrect(-20, -26, 40, 18, 2), paint(CREAM)); cv.drawLine(-14, -18, 14, -18, paint(INK, .6, stroke=1.4))
            cv.restore()
            cv.drawLine(36, 8, 42, -14, paint(shade(body, -.12), stroke=30, cap=False))
            cv.drawLine(28, -10, 56, -18, paint('#f8fafc', stroke=4, cap=False))
            cv.drawRRect(rrect(30, -40, 24, 26, 11), paint(shade(skin, -.05)))
            for k in range(3): cv.drawLine(33, -33 + k * 6, 46, -35 + k * 6, paint(shade(skin, -.3), .5, stroke=1.4))
        cv.restore()
    return _pic(('pbody', who, col), fn, (-130, -130, 260, 150))

def _hair_back(who):
    d = CAST[who]; hc = d['hair']; st = d['style']
    def fn(cv):
        if st == 'bun':
            cv.drawCircle(-4, -213, 19, paint(shade(hc, .04))); cv.drawCircle(-4, -213, 19, paint(shade(hc, .35), .45, stroke=1.6))
            cv.drawLine(-18, -200, 10, -200, paint('#7a1d2e', .9, stroke=3))
        elif st == 'bob':
            p = skia.Path(); p.moveTo(-47, -170); p.cubicTo(-56, -130, -54, -104, -40, -94); p.lineTo(40, -94); p.cubicTo(54, -104, 56, -130, 47, -170); p.close()
            cv.drawPath(p, paint(hc))
    return _pic(('phb', who), fn, (-80, -240, 160, 160))

def _head(who):
    d = CAST[who]; sk = d['skin']
    def fn(cv):
        cx, cy = _HC
        for sg in (-1, 1):
            cv.drawOval(_R(cx + sg * 40 - 8, cy - 14, 16, 26), paint(shade(sk, -.06)))
            cv.drawOval(_R(cx + sg * 40 - 4, cy - 8, 8, 14), paint(shade(sk, -.25), .5))
            if d.get('ear'): cv.drawCircle(cx + sg * 41, cy + 13, 3.2, paint(GOLD))
        cv.drawOval(_R(cx - _HRX, cy - _HRY, 2 * _HRX, 2 * _HRY), paint(shader=rgrad(cx - 10, cy - 18, 70, [shade(sk, .08), sk, shade(sk, -.1)], [0, .6, 1])))
        if d.get('stubble') or d.get('beard'):
            jaw = skia.Path(); jaw.moveTo(cx - 38, cy + 2); jaw.cubicTo(cx - 36, cy + 44, cx - 16, cy + 52, cx, cy + 52)
            jaw.cubicTo(cx + 16, cy + 52, cx + 36, cy + 44, cx + 38, cy + 2); jaw.cubicTo(cx + 26, cy + 24, cx - 26, cy + 24, cx - 38, cy + 2); jaw.close()
            cv.drawPath(jaw, paint(d['hair'], .9 if d.get('beard') else .16))
    return _pic(('phead', who), fn, (-60, -220, 120, 130))

def _hair_front(who):
    d = CAST[who]; hc = d['hair']; st = d['style']; cx, cy = _HC
    def fn(cv):
        if st in ('bun', 'bob'):
            p = skia.Path(); p.moveTo(cx - 43, cy + (6 if st == 'bob' else -6)); p.cubicTo(cx - 46, cy - 50, cx - 20, cy - 58, cx, cy - 56)
            p.cubicTo(cx + 20, cy - 58, cx + 46, cy - 50, cx + 43, cy + (6 if st == 'bob' else -6))
            p.cubicTo(cx + 36, cy - 26, cx + 20, cy - 36, cx + 2, cy - 40); p.cubicTo(cx - 20, cy - 36, cx - 36, cy - 26, cx - 43, cy + (6 if st == 'bob' else -6)); p.close()
            cv.drawPath(p, paint(hc)); cv.drawPath(p, paint(shade(hc, .45), .35, stroke=1.6))
            cv.drawLine(cx + 2, cy - 55, cx + 2, cy - 41, paint(shade(hc, .25), .7, stroke=1.6))
        elif st in ('short', 'side', 'temples', 'officer'):
            p = skia.Path(); p.moveTo(cx - 42, cy - 8); p.cubicTo(cx - 46, cy - 52, cx - 24, cy - 62, cx + 2, cy - 60)
            p.cubicTo(cx + 28, cy - 62, cx + 46, cy - 50, cx + 42, cy - 8)
            if st == 'side': p.cubicTo(cx + 36, cy - 30, cx + 10, cy - 40, cx - 14, cy - 38); p.cubicTo(cx - 28, cy - 36, cx - 38, cy - 26, cx - 42, cy - 8)
            elif st == 'officer': p.cubicTo(cx + 36, cy - 40, cx + 14, cy - 46, cx, cy - 46); p.cubicTo(cx - 14, cy - 46, cx - 36, cy - 40, cx - 42, cy - 8)
            else: p.cubicTo(cx + 34, cy - 34, cx + 14, cy - 42, cx, cy - 40); p.cubicTo(cx - 14, cy - 42, cx - 34, cy - 34, cx - 42, cy - 8)
            p.close(); cv.drawPath(p, paint(hc)); cv.drawPath(p, paint(shade(hc, .45), .35, stroke=1.6))
            if st == 'side': cv.drawLine(cx - 14, cy - 38, cx - 8, cy - 58, paint(shade(hc, .3), .6, stroke=1.6))
            if st in ('temples', 'officer'):
                cv.save(); cv.clipPath(p, True)
                for sg in (-1, 1): cv.drawOval(_R(cx + sg * 38 - 11, cy - 40, 22, 40), paint('#9aa1ae', .9))
                cv.restore()
        elif st == 'cap':
            cc = d['cap']
            p = skia.Path(); p.moveTo(cx - 44, cy - 20); p.cubicTo(cx - 46, cy - 64, cx - 20, cy - 70, cx, cy - 70); p.cubicTo(cx + 20, cy - 70, cx + 46, cy - 64, cx + 44, cy - 20); p.close()
            cv.drawPath(p, paint(shader=_vg(cy - 70, cy - 20, shade(cc, .15), shade(cc, -.2))))
            cv.drawRRect(rrect(cx - 50, cy - 28, 100, 13, 6), paint(shade(cc, -.3)))
            cv.drawCircle(cx, cy - 68, 4, paint(shade(cc, .3)))
            for sg in (-1, 1): cv.drawRRect(rrect(cx + sg * 39 - 3, cy - 16, 6, 11, 3), paint(hc))
        elif st == 'turban':
            tc = d['turban']
            p = skia.Path(); p.moveTo(cx - 48, cy - 16); p.cubicTo(cx - 58, cy - 70, cx - 20, cy - 86, cx + 4, cy - 84); p.cubicTo(cx + 34, cy - 84, cx + 60, cy - 66, cx + 48, cy - 16)
            p.cubicTo(cx + 30, cy - 30, cx - 30, cy - 30, cx - 48, cy - 16); p.close()
            cv.drawPath(p, paint(shader=_vg(cy - 86, cy - 16, shade(tc, .2), shade(tc, -.25))))
            for k in range(3):
                q = skia.Path(); q.moveTo(cx - 46 + k * 4, cy - 26 - k * 16); q.cubicTo(cx - 20, cy - 44 - k * 18, cx + 20, cy - 50 - k * 14, cx + 46 - k * 6, cy - 30 - k * 14)
                cv.drawPath(q, paint(shade(tc, -.35), .6, stroke=2))
            cv.drawPath(p, paint(shade(tc, -.45), .6, stroke=1.4))
    return _pic(('phf', who), fn, (-70, -260, 140, 150))

def person(c, x, y, s=1., a=1., who='meera', t=0., talk=0., look=0., mood=0., col=None, blink=True):
    """A flat-vector bust (head, neck, shoulders; ~222 px tall, 216 wide at s=1), (x, y) = bottom centre.
    who in CAST: meera (baker: teal kurta, cream apron, bun, bindi) · rohan (olive shirt, stubble) · kabir (dentist:
    white coat, glasses, stethoscope) · ravi (cap, moustache, checked shirt) · anil (jacket, short beard) · sunil
    (grocer: kurta, grey temples) · officer (grey suit, tie, spectacles, file under the arm) · ca (navy blazer,
    glasses) · farmer (turban, white kurta) · supplier (cap, apron) · staff (uniform tee; col= varies it).
    talk 0..1 moves the mouth with t; look -1..1 turns the head; mood -1 (worried brows, frown) .. 1 (smile);
    eyes blink now and then."""
    if a <= 0: return
    if who not in CAST: who = 'staff'
    d = CAST[who]; lk = clamp(look, -1, 1); fx = lk * 7; hx = lk * 3; m = clamp(mood, -1, 1)
    with _fade(c, a, (x - 140 * s, y - 280 * s, x + 140 * s, y + 30 * s)):
        c.save(); c.translate(x, y); c.scale(s, s)
        _play(c, _person_body(who, col)); _play(c, _hair_back(who), hx * .6, 0); _play(c, _head(who), hx, 0)
        cx, cy = _HC[0] + fx, _HC[1]
        ink = '#1a0f0a'; hc = d['hair']
        ph = (t + hsh(len(who), 3) * 5) % 4.3; bl = clamp(1 - abs(ph - .09) / .09) if blink else 0.
        for sg in (-1, 1):
            ex = cx + sg * 15
            c.drawOval(_R(ex - 4.1, cy - 5. * (1 - .9 * bl), 8.2, 10. * (1 - .9 * bl) + .6), paint(ink))
            if bl < .5: c.drawCircle(ex + 1.4, cy - 1.8, 1.3, paint(WHITE, .8))
            inner = 4.5 * max(0., -m); lift = 2.5 * max(0., m)
            bp = skia.Path(); by = cy - 15 - lift
            bp.moveTo(ex + sg * 10, by + 1.5); bp.quadTo(ex + sg * 2, by - 3 - lift * .5, ex - sg * 8, by + 1 - inner)
            c.drawPath(bp, paint(hc if d['style'] != 'turban' else '#1c140f', stroke=3.6))
        if d.get('fem'):
            for sg in (-1, 1): c.drawOval(_R(cx + sg * 22 - 7, cy + 8, 14, 8), paint('#e88f8f', .22))
        np_ = skia.Path(); np_.moveTo(cx - 5.5, cy + 10); np_.quadTo(cx, cy + 14.5, cx + 5.5, cy + 10)
        c.drawPath(np_, paint(shade(d['skin'], -.38), .85, stroke=2.2))
        c.drawLine(cx + 1.5, cy - 5, cx + 3, cy + 6, paint(shade(d['skin'], -.3), .35, stroke=2))
        my = cy + 31
        op = talk * clamp(.35 + .65 * math.sin(t * 13.) * math.sin(t * 7.3 + 1) + .3 * math.sin(t * 5.1)) if talk > 0 else 0.
        if d.get('moustache'):
            th = d['moustache'] == 'thick'
            mp = skia.Path(); mp.moveTo(cx - (17 if th else 13), my - 4); mp.quadTo(cx - 8, my - (13 if th else 10), cx, my - 9)
            mp.quadTo(cx + 8, my - (13 if th else 10), cx + (17 if th else 13), my - 4); mp.quadTo(cx, my - (5 if th else 6), cx - (17 if th else 13), my - 4)
            c.drawPath(mp, paint(hc))
        lip = shade(d['skin'], -.42)
        if op > .04:
            oh = 2 + 9 * op; w2 = 10 - 2 * op
            mo = skia.Path(); mo.moveTo(cx - w2, my); mo.quadTo(cx, my - 2 + 3 * m, cx + w2, my); mo.quadTo(cx, my + oh * 1.6, cx - w2, my); mo.close()
            c.drawPath(mo, paint('#4a1d1d')); c.drawPath(mo, paint(lip, .9, stroke=1.8))
            if op > .35: c.drawLine(cx - w2 * .6, my + .8, cx + w2 * .6, my + .8, paint(WHITE, .8, stroke=2))
        else:
            mo = skia.Path(); mo.moveTo(cx - 11, my - 1); mo.quadTo(cx, my + 8 * m, cx + 11, my - 1)
            c.drawPath(mo, paint(lip, 1, stroke=2.8))
        if d.get('bindi'): c.drawCircle(cx, cy - 22, 2.8, paint('#c81e3c'))
        if d.get('glasses'):
            gp = paint('#1b1f2a', stroke=2.4)
            for sg in (-1, 1): c.drawRRect(rrect(cx + sg * 15 - 11, cy - 9, 22, 17, 6), gp)
            c.drawLine(cx - 4, cy - 3, cx + 4, cy - 3, gp)
            for sg in (-1, 1): c.drawLine(cx + sg * 26, cy - 4, cx + sg * 38 - fx * .5, cy - 6, gp)
            c.drawLine(cx - 22, cy - 6, cx - 16, cy - 1, paint(WHITE, .35, stroke=1.6))
        _play(c, _hair_front(who), hx * 1.15, 0)
        c.restore()

def bubble(c, x, y, w, text, a=1., tail='bl', col=WHITE, size=26, u=1.):
    """A speech bubble, top-left (x, y), width w (height from the wrapped text): rounded, soft shadow, a tail from
    the tail corner ('bl' 'br' 'tl' 'tr') pointing outwards; dark text on light fills, white on dark. u 0..1 pops
    it in. Returns (x, y, w, h, tail tip)."""
    pad = size * .75; lines = wrap(text, size, w - 2 * pad, 700); h = len(lines) * size * 1.28 + 2 * pad - size * .28
    vb = 'b' in tail; lf = 'l' in tail
    bx = x + (34 if lf else w - 34); tip = (bx - (18 if lf else -18), (y + h + 30) if vb else (y - 30))
    if a <= 0 or u <= 0: return (x, y, w, h, tip)
    def shape():
        P = skia.Path(); P.addRRect(rrect(0, 0, w, h, min(22, h / 2)))
        T = skia.Path(); ey = h - 2 if vb else 2
        T.moveTo(bx - x - 14, ey); T.lineTo(bx - x + 14, ey); T.lineTo(tip[0] - x, tip[1] - y); T.close()
        return skia.Op(P, T, skia.PathOp.kUnion_PathOp)
    P = skia.Path(_cache(('bub', w, round(h, 1), tail), shape)); P.offset(x, y)
    k = back(clamp(u)); light = sum(rgb(col)) > 450; tc = INK if light else WHITE
    with _fade(c, a * clamp(u * 3), (x - 40, y - 60, x + w + 40, y + h + 70)):
        c.save(); c.translate(tip[0], tip[1]); c.scale(k, k); c.translate(-tip[0], -tip[1])
        c.save(); c.translate(0, 8); c.drawPath(P, paint(BLACK, .4, blur=14)); c.restore()
        c.drawPath(P, paint(col, .97))
        c.drawPath(P, paint(shade(col, -.25) if light else WHITE, .5 if light else .2, stroke=1.4))
        for i, ln in enumerate(lines): _txt(c, ln, x + pad, y + pad + size * .74 + i * size * 1.28, size, 700, tc, 1)
        c.restore()
    return (x, y, w, h, tip)

# ------------------------------------------------------------------ galleries (python props.py)
def _bg(c):
    backdrop(c, 0, None, top='#0b1433', bot='#03050d', glow='#1e3a8a', ga=.42, bc='#8fb4ff', seed=3)
    grid(c, None, 90, .035)

def _cap(c, s, x, y, al='c'): _txt(c, s, x, y, 17, 600, DIM, .8, al)

def _title(c, s): pass

def _gallery1(c, t=0.):
    """Computation and money: sheet, ledger, roll, notes, coin, stamp, sec."""
    _bg(c); _title(c, 'PROPS 1 / 6 · COMPUTATION AND MONEY')
    R = [dict(label='Net profit as per P&L', amt=1200000, kind='start', t0=0),
         dict(label='Add: not allowed / not yet allowed', kind='head', t0=.5),
         dict(label='Income-tax paid', amt=120000, kind='add', sec='40(a)(ii)', t0=1),
         dict(label='Cash to packaging supplier', amt=24000, kind='add', sec='40A(3)', t0=1.5, hl=(2, 99)),
         dict(label='Bonus paid after the due date', amt=80000, kind='add', sec='43B', t0=2),
         dict(label='Oven bought (capital)', amt=400000, kind='add', sec='37', t0=2.5, strike=3.5),
         dict(label='Subtotal', amt=1424000, kind='sub', t0=4),
         dict(label='Less: allowed', kind='head', t0=4.5),
         dict(label='Depreciation as per the Act', amt=285000, kind='less', sec='32', t0=5),
         dict(label='P&M ₹2,25,000 + building + furniture + laptop', kind='note', t0=5.5),
         dict(label='Bank interest (other sources)', amt=30000, kind='less', sec='IFOS', t0=6),
         dict(label='Income under PGBP', amt=1109000, kind='total', t0=6.5)]
    sheet(c, 40, 40, 880, R, 1, 30, title='Computation of PGBP · Meera', title_r='A.Y. 2026-27')
    _cap(c, "sheet · settled: start / head / add / less / sub / note / total rows, sec chips, hl (gold bar), strike", 480, 822)
    tb = 3.62
    R2 = [dict(label='Net profit', amt=1200000, kind='start', t0=0, amt2=1200000),
          dict(label='Depreciation', amt=285000, kind='less', sec='32', t0=.6),
          dict(label='Extra depreciation', amt=None, kind='less', sec='32(1)(iia)', t0=1.2, amt2=100000, t2=1.6),
          dict(label='Bank interest', amt=30000, kind='less', t0=2.0),
          dict(label='Rent (house property)', amt=120000, kind='less', sec='HP', t0=2.6),
          dict(label='Bad debt recovered', amt=25000, kind='add', sec='41(4)', t0=3.2),
          dict(label='Income under PGBP', amt=1899000, kind='total', t0=3.8, amt2=1799000)]
    sheet(c, 960, 40, 920, R2, 1, tb, title='Default vs optional regime', cols=('Default', 'Opted out'), max_h=262,
          scroll=sheet_scroll(R2, tb, 262))
    _cap(c, 'sheet · cols + amt2 · max_h window + sheet_scroll (edge fade) · newest row sliding in, amount rolling', 1420, 470)
    L = [('Sales', 24000000, ''), ('Purchases', 15000000, ''), ('Other costs', 7800000, 'dim'), ('Net profit', 1200000, 'total')]
    ledger(c, 960, 500, 450, L, 1, sub='for the year ended 31 March 2026', hl={3: 1.}, strike={1: 1.})
    ledger(c, 1430, 500, 450, L, 1, u=.62)
    _cap(c, 'ledger · hl={3: 1} · strike={1: 1}', 1185, 838); _cap(c, 'ledger · u=.62 (rows reveal top-down)', 1655, 838)
    for i, u in enumerate((.3, .6, 1.)):
        roll(c, 225000, 1170, 900 + i * 48, u, 36, GOLD); _txt(c, 'u=%.1f' % u, 1186, 892 + i * 48, 17, 600, DIM, .8)
    roll(c, -50000, 1170, 1044, 1, 30, RED, signed=True); _txt(c, 'signed', 1186, 1036, 17, 600, DIM, .8)
    roll(c, 102, 1300, 906, .55, 34, ACC, prefix='', suffix=' days', align='l')
    _cap(c, "roll(prefix='', suffix=' days') u=.55", 1300, 934, 'l')
    _txt(c, inr(12000000) + ' · ' + inr(1200000) + ' · ' + inr(440000), 1300, 984, 25, 800, WHITE, .95)
    _cap(c, 'inr(1.2e7) · inr(12e5) · inr(4.4e5)', 1300, 1010, 'l')
    x = 1300
    for s_, cl in (('40A(3)', VIO), ('43B(h)', VIO), ('115BAC', ACC)):
        x += sec(c, x, 1046, s_, 1, cl, 21) + 10
    _cap(c, 'sec', x + 4, 1052, 'l')
    notes(c, 1780, 896, 1, 3, .68); _cap(c, 'notes(n=3)', 1800, 950)
    coin(c, 1700, 1012, 22); coin(c, 1760, 1012, 22, spin=1.1); coin(c, 1820, 1012, 22, col=GREEN, label='')
    _cap(c, 'coin · spin', 1760, 1060)
    for i, (s_, cl, u, an, xx, yy) in enumerate((('ALLOWED', GREEN, 1, -10, 150, 900), ('DISALLOWED', RED, 1, -8, 440, 900),
                                                 ('DEEMED INCOME', GOLD, 1, -6, 760, 900), ('TAX AUDIT', ACC, 1, -9, 150, 1004),
                                                 ('30% OUT', RED, .45, -10, 410, 1004), ('NEXT YEAR', VIO, .12, -12, 720, 992))):
        stamp(c, xx, yy, s_, cl, 1, u, an, 30)
    _cap(c, 'stamp · settled · 30% OUT u=.45 (impact shake) · NEXT YEAR u=.12 (falling, shadow)', 470, 1068)

def _gallery2(c, t=0.):
    """Paper and time: bill, cheque, form, book, calendar, yearbar, hourglass, magnifier, padlock, regime_switch."""
    _bg(c); _title(c, 'PROPS 2 / 6 · PAPER AND TIME')
    bill(c, 150, 120, 1, 'Flour', 400000, 'bank', '12 Jan 2026')
    bill(c, 410, 128, 1, 'Packaging', 8000, 'cash', '10:00 · 4 Feb', ang=-5, col=RED, stamp=('DISALLOWED', RED, 1))
    bill(c, 670, 120, 1, 'Chef-consultant fee', 150000, 'upi', None, ang=4)
    _cap(c, "bill · mode='bank' · col=RED + stamp=('DISALLOWED', RED, 1) · long title auto-fit", 410, 236)
    cheque(c, 1115, 140, 1, 150000, date='15102026')
    _cap(c, 'cheque · crossed A/c Payee · amount in words', 1115, 272)
    form(c, 1560, 180, 1, sc=.82); form(c, 1790, 190, 1, 'Form 3CB', 'Audit report', col=GOLD, sc=.68, ang=6)
    _cap(c, 'form', 1675, 348)
    book(c, 120, 470, 1, sc=.72); book(c, 380, 470, 1, sc=.72, open_=.4); book(c, 760, 470, 1, sc=.72, open_=1., col=GREEN, title='Cash book')
    _cap(c, 'book · open_=0 · .4 · 1', 450, 590)
    calendar(c, 1060, 455, 1, 20, 'DEC', 2025); calendar(c, 1250, 455, 1, 31, 'MAR', col=BLUE, flip=.3); calendar(c, 1440, 455, 1, 31, 'MAR', col=BLUE, flip=.62)
    _cap(c, 'calendar · year= (weekday) · flip=.3 · flip=.62 (31 MAR -> 1 APR)', 1250, 590)
    hourglass(c, 1660, 455, .9, 1, .35); hourglass(c, 1790, 455, .9, 1, 1)
    _cap(c, 'hourglass u=.35 · 1', 1725, 590)
    yearbar(c, 110, 720, 1080, 1, 0, extend=(2026, 10, 31),
            marks=[((2025, 6, 1), '1 Jun · oven', GOLD, 1), ((2025, 12, 20), '20 Dec · mixer', ORANGE, 1, 1), ((2026, 9, 30), 'audit 30 Sep', ACC, 1)],
            spans=[((2025, 6, 1), (2026, 3, 31), '10 months', GREEN, .55), ((2025, 12, 20), (2026, 3, 31), '', ORANGE, .5),
                   ((2026, 4, 1), (2026, 10, 31), 'grace zone till the return', GREEN, .9)])
    _cap(c, 'yearbar · extend=(2026, 10, 31) · marks (level 1 stacks higher) · spans · yearbar_x() maps dates', 960, 842)
    regime_switch(c, 260, 950, 1, 0, 0, .62); regime_switch(c, 660, 950, 1, 1, 0, .62); regime_switch(c, 1060, 950, 1, .5, 0, .62)
    _cap(c, 'regime_switch pos=0 · 1 · .5 (knob mid-slide)', 660, 1030)
    magnifier(c, 1380, 940, 58, fn=lambda cc: (_txt(cc, '₹48', 1380, 956, 44, 800, GOLD, 1, 'c')))
    _cap(c, 'magnifier(fn=...)', 1400, 1040)
    padlock(c, 1600, 950, 1.7); padlock(c, 1690, 950, 1.7, GREEN, open_=1)
    _cap(c, 'padlock · open_=1', 1645, 1010)
    clock_face(c, 1820, 945, 52, 10, 5); _cap(c, 'clock_face', 1820, 1022)

def _gallery3(c, t=1.3):
    """The machine: conveyor, scanner (idle / pass / reject), machine, tank (layers, inflow, outflow, floor, crack,
    ghost), bucket."""
    _bg(c); _title(c, 'PROPS 3 / 6 · THE MACHINE AND THE BLOCK OF ASSETS')
    conveyor(c, 60, 1240, 330, 1, t)
    bill(c, 140, 262, 1, 'Flour', 400000, 'upi', sc=.62)
    for i, (sx, st, lab_, tl, am, md) in enumerate(((330, 0, '37', 'Rent', 120000, 'bank'), (680, 1, '40A(3)', 'Packaging', 8000, 'upi'),
                                                     (1030, -1, '40A(3)', 'Packaging', 32000, 'cash'))):
        scanner_back(c, sx, 330, 1, lab_, st, t)
        bill(c, sx + 6, 262, 1, tl, am, md, sc=.62)
        scanner_front(c, sx, 330, 1, lab_, st, t)
    _cap(c, 'conveyor (treads move with t) · scanner_back -> items -> scanner_front · state 0 idle · +1 pass · -1 reject (beacon)', 650, 470)
    machine(c, 70, 560, 1180, 320, 1, t, active=2.0, done={0, 1})
    _cap(c, 'machine · active=2 (gold, gears turning) · done={0, 1} · hopper + output port · returns chamber centres', 650, 920)
    tank(c, 1350, 110, 230, 300, 1, t, level=.8, amount=1600000, inflow=.8, label='Plant & machinery · 15%',
         layers=[(14, ACC, '₹14,00,000'), (2, GOLD, '7.5%')], marks=[(.5, 'WDV', GOLD)])
    _cap(c, 'tank · layers · inflow · marks · amount tag', 1520, 520)
    tank(c, 1680, 110, 190, 260, 1, t, level=0., label='Van block', crack=.85, ghost=.25)
    _cap(c, 'crack=.85 + ghost', 1775, 470)
    tank(c, 1330, 580, 230, 250, 1, t, level=.22, label='Motor vehicles · 15%', sub=None, amount=None,
         outflow=.9, floor_glow=1., col=BLUE, drain_to=(1655, 912))
    bucket(c, 1670, 850, 1, .38, t=t, sub='sec 50', amount=60000, w=160, h=104)
    _cap(c, 'tank outflow -> drain_to · floor_glow · bucket(amount)', 1450, 1068)

def _gallery4(c, t=1.3):
    """Heads of income and widgets: heads5, meter, gauge, slab, tile, yearstrip, icon set."""
    _bg(c); _title(c, 'PROPS 4 / 6 · HEADS OF INCOME AND WIDGETS')
    heads5(c, 60, 50, 1300, 1, {2: 1.}, open_={2: 1., 4: .45}, h=290)
    _cap(c, 'heads5 · hl={2: 1} · open_={2: 1, 4: .45} · returns drawer mouths', 710, 440)
    meter(c, 1440, 92, 420, 1, .12, .05)
    meter(c, 1440, 226, 420, 1, .0469, .05, 'Cash share (Sunil)', '{:.2%}', lim_fmt='{:.0%}')
    _cap(c, 'meter · over the limit -> red', 1650, 312)
    gauge(c, 1740, 576, 112, 1, 2.4, 0, 12, ticks=[(0, '0'), (3, '₹3 cr'), (10, '₹10 cr'), (12, '')], label='Turnover limit', limit=10,
          fmt=lambda v: '₹%.1f crore' % v)
    _cap(c, 'gauge · limit · fmt', 1740, 452)
    slab(c, 60, 480, 420, 150, 1, GREEN, 'Revenue expense', 'Used up this year: deduct it in full.', icon_name='cash')
    slab(c, 500, 480, 420, 150, 1, ORANGE, 'Capital expense', 'Lasts many years: depreciation only.', icon_name='building')
    _cap(c, 'slab', 490, 656)
    for i, (ic, lb, ok, cl) in enumerate((('cheque', 'Cheque', True, GREEN), ('upi', 'UPI', True, GREEN), ('cash', 'Cash > ₹10,000', False, RED),
                                          ('snow', 'Cold chain', None, ACC))):
        tile(c, 960 + i * 146, 480, 134, 150, ic, lb, 1, cl, ok, glow=1. if i == 3 else 0.)
    _cap(c, 'tile · ok=True / False · glow', 1252, 656)
    yearstrip(c, 60, 708, 880, 5, 1, ['2025-26', '2026-27', '2027-28', '2028-29', '2029-30'], hl=0, sub={i: '₹60,000' for i in range(5)})
    yearstrip(c, 60, 826, 880, 8, 1, None, hl={2: 1.}, cols={0: GREEN, 1: GREEN})
    _cap(c, 'yearstrip · labels + sub · hl · cols', 500, 930)
    for i, n in enumerate(ICONS):
        ix, iy = 1000 + (i % 12) * 74, 720 + (i // 12) * 84
        icon(c, n, ix, iy, .66, ACC); _txt(c, n, ix, iy + 38, 12, 600, DIM, .75, 'c')
    _cap(c, 'icon(c, name, x, y, s) · ICONS (also tile icons)', 1407, 1062)

def _gallery5(c, t=1.3):
    """Assets and places."""
    _bg(c); _title(c, 'PROPS 5 / 6 · ASSETS AND PLACES')
    y1, y2, y3 = 392, 722, 1030
    shop(c, 230, y1, .68, 1, t); _cap(c, 'shop (lit=1)', 230, y1 + 28)
    oven(c, 610, y1, .74, 1, t); _cap(c, 'oven (on=1)', 610, y1 + 28)
    mixer(c, 850, y1, .74, 1, t, 1); _cap(c, 'mixer (spin)', 858, y1 + 28)
    van(c, 1120, y1, .74, 1, move=t * 90); _cap(c, 'van (move)', 1120, y1 + 28)
    laptop(c, 1420, y1, .92, 1); _cap(c, 'laptop (on)', 1420, y1 + 28)
    counter(c, 1715, y1, .68); _cap(c, 'counter', 1715, y1 + 28)
    land(c, 60, y2 - 112, 250, 100, 1, 'Land'); _cap(c, 'land', 185, y2 + 28)
    lab(c, 520, y2, .68, 1, t); _cap(c, 'lab_bench (= lab)', 520, y2 + 28)
    cold_store(c, 860, y2, .58, 1, t); _cap(c, 'cold_store', 860, y2 + 28)
    dental_chair(c, 1160, y2, .54, 1); _cap(c, 'dental_chair', 1150, y2 + 28)
    flats(c, 1400, y2, .4, 1, 6, t); _cap(c, 'flats (n=6)', 1400, y2 + 28)
    truck(c, 1690, y2, .62, 1, 'light', label='7.5 t', move=t * 60); _cap(c, "truck kind='light'", 1690, y2 + 28)
    tea(c, 140, y3, .52); _cap(c, 'tea', 140, y3 + 30)
    cake(c, 350, y3, .55); cake(c, 462, y3, .66, kind='slice'); cake(c, 580, y3, .58, kind='loaf'); _cap(c, "cake 'wedding' · 'slice' · 'loaf'", 465, y3 + 30)
    sack(c, 700, y3, .6); boxes(c, 800, y3, .6); _cap(c, 'sack · boxes', 750, y3 + 30)
    generator(c, 935, y3, .5, 1, t, 1); extinguisher(c, 1040, y3, .6); _cap(c, 'generator · extinguisher', 985, y3 + 30)
    truck(c, 1225, y3, .52, 1, 'heavy', BLUE, '15 t', move=t * 60); _cap(c, "truck kind='heavy'", 1225, y3 + 30)
    building(c, 1430, y3, .4, floors=2); _cap(c, 'building', 1430, y3 + 30)
    factory(c, 1610, y3, .4, 1, t); _cap(c, 'factory', 1600, y3 + 30)
    ship(c, 1810, y3 - 22, .38, 1, t); _cap(c, 'ship', 1810, y3 + 30)

def _gallery6(c, t=1.0):
    """People and speech bubbles."""
    _bg(c); _title(c, 'PROPS 6 / 6 · PEOPLE')
    who = list(CAST)
    for i, w in enumerate(who):
        x = 150 + (i % 6) * 300; y = 290 + (i // 6) * 340
        person(c, x, y, 1., 1, w, t)
        _txt(c, w, x, y + 34, 22, 700, WHITE, .9, 'c')
    for x, w, kw, lab_ in ((1650, 'kabir', dict(look=-.8, mood=.6), 'kabir · look=-.8 · mood=.6'),
                           (150, 'meera', dict(talk=1., mood=1.), 'meera · talk=1 · mood=1'),
                           (450, 'officer', dict(mood=-1., look=.6), 'officer · mood=-1 · look=.6'),
                           (750, 'staff', dict(col='#b45309'), "staff · col='#b45309'"),
                           (1050, 'rohan', dict(mood=-.6, talk=.7, t=1.33), 'rohan · mood=-.6 · talk')):
        y = 630 if x == 1650 else 970
        kw.setdefault('t', t); person(c, x, y, 1., 1, w, **kw)
        _txt(c, lab_, x, y + 34, 20, 700, DIM, .9, 'c')
    bubble(c, 1300, 760, 470, 'Is this cost allowed this year?', 1, 'bl')
    bubble(c, 1340, 900, 430, 'Forget it, you needn’t pay.', 1, 'tr', col='#1e293b')
    _cap(c, "bubble · tail='bl' · tail='tr' + dark col", 1570, 1060)

GALLERIES = (_gallery1, _gallery2, _gallery3, _gallery4, _gallery5, _gallery6)

if __name__ == '__main__':
    import os, time
    here = os.path.dirname(os.path.abspath(__file__))
    for i, g in enumerate(GALLERIES):
        t0 = time.time(); arr, surf = render(lambda c, t, g=g: g(c), 0.)
        out = os.path.join(here, 'props_gallery%s.jpg' % ('' if i == 0 else i + 1))
        surf.makeImageSnapshot().save(out, skia.kJPEG, 90); print(out, f'{(time.time() - t0) * 1000:.0f} ms')
