"""Chapter H — Blocks of assets (section 2(11) and the rates).
h1 hook: the bakery's assets pop in as named (ovens, mixers, trays, fridges, the van); on "track ... each one" each
   gets its own little ledger card (cost · date · WDV).
h2 the bakery gives way to a factory; a counter rolls to 5,000 machines while tiny cards pile up in a chaotic grid;
   a magnified card shows its own date, cost and value fields filling in; "never end": the grid overflows, red.
h3 "pools": the cards fly into four glass tanks — Buildings 10% · Furniture & fittings 10% · Plant & machinery 15% ·
   Computers 40%; the class line lights on "same class", the rate line on "same rate".
h4 the P&M tank comes forward: the whole pool is bracketed as its written down value; on "fixed share" the top 15%
   slice lifts out into a "this year's depreciation · 15% × WDV" box; a cost bar shows WDV = cost − earlier
   depreciation.
h5–h6 the rate board builds row by row as spoken, each rate rolling up with a bar to scale: residential buildings 5% ·
   other buildings 10% · furniture & fittings 10% · plant & machinery 15% (incl. motor cars) · buses, lorries, taxis
   in a hiring business 30% · computers & software 40% · books (professionals) 40% · intangible assets 25%.
h7 analogy: one big tank — a new oven rides the pipe and pours in, sale money drains out of the tap, a fixed share is
   skimmed off as depreciation; then the level drains to the floor, which glows "never below zero"; "what then?".
h8 check (below the card): a laptop and an oven between two unnamed tanks ("block ?"); the answer drops the laptop
   into Computers 40% and the oven into Plant & machinery 15% (names and rates appear as spoken): ≠ different blocks."""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('h')
H1, H2, H3, H4, H5, H6, H7, H8 = (T(f'h{k}') for k in range(1, 9))
H8A = TA('h8')

# ---------------------------------------------------------------- word times
ITEMS1 = [W('h1', 'ovens'), W('h1', 'mixers'), W('h1', 'trays'), W('h1', 'fridges'), W('h1', 'van')]
TRACK1, EACH1 = W('h1', 'track'), W('h1', 'each')
FACT2, FIVE2, MACH2 = W('h2', 'factory'), W('h2', 'five'), W('h2', 'machines')
EACH2, DATE2, COST2, VAL2 = W('h2', 'each'), W('h2', 'date'), W('h2', 'cost'), W('h2', 'value')
PAPER2, NEVER2, END2 = W('h2', 'paperwork'), W('h2', 'never'), W('h2', 'end')
POOLS3, BLOCK3, GROUP3, CLASS3, RATE3 = (W('h3', 'pools'), W('h3', 'block'), W('h3', 'group'), W('h3', 'class'),
                                         W('h3', 'rate'))
CHG4, WHOLE4, FIXED4, WDV4 = W('h4', 'charged'), W('h4', 'whole'), W('h4', 'fixed'), W('h4', 'written')
LEFT4, COST4, EARLIER4 = W('h4', 'left'), W('h4', 'cost'), W('h4', 'earlier')
MAIN5 = W('h5', 'main')
ROWT = [W('h5', 'residential'), W('h5', 'other'), W('h5', 'furniture'), W('h5', 'plant'),
        W('h6', 'buses'), W('h6', 'computers'), W('h6', 'books'), W('h6', 'intangible')]
RATET = [W('h5', 'five'), W('h5', 'ten'), W('h5', 'ten', occ=1), W('h5', 'fifteen'),
         W('h6', 'thirty'), W('h6', 'forty'), W('h6', 'forty', occ=1), W('h6', 'twenty')]
CARS5, HIGHER6, HIRING6 = W('h5', 'cars'), W('h6', 'higher'), W('h6', 'hiring')
TANK7, NEW7, POUR7, SALE7, DRAIN7 = (W('h7', 'tank'), W('h7', 'new'), W('h7', 'pour'), W('h7', 'sale'),
                                     W('h7', 'drains'))
FIXED7, DEP7, UNLIKE7, LEVEL7, NEVER7, ZERO7, SEE7 = (W('h7', 'fixed'), W('h7', 'depreciation'), W('h7', 'unlike'),
                                                      W('h7', 'level'), W('h7', 'never'), W('h7', 'zero'),
                                                      W('h7', 'see'))
LAP8, OVEN8 = W('h8', 'laptop'), W('h8', 'oven')
ALAP8, AOVEN8, ADIFF8, ABLK8 = W('h8a', 'laptop'), W('h8a', 'oven'), W('h8a', 'different'), W('h8a', 'blocks')

for tt, k in ((ITEMS1[0], 'pop'), (ITEMS1[2], 'pop'), (ITEMS1[4], 'pop'), (TRACK1, 'flip'),
              (FACT2, 'whoosh'), (FIVE2, 'tick'), (NEVER2, 'warn'),
              (POOLS3, 'whoosh'), (POOLS3 + 1.3, 'chime_lo'), (RATE3, 'pop'),
              (FIXED4 + .4, 'snip'), (EARLIER4, 'pop'),
              (RATET[0], 'tick'), (RATET[1], 'tick'), (RATET[3], 'tick'), (RATET[4], 'tick'), (RATET[5], 'tick'),
              (RATET[7], 'tick'),
              (POUR7, 'blip'), (DRAIN7, 'blip'), (DEP7, 'snip'), (ZERO7, 'warn'),
              (ALAP8 + .7, 'ok'), (AOVEN8 + .7, 'ok'), (ABLK8, 'chime')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _pop(t, t0, d=.45): return seg(t, t0, t0 + d, back)

def _scaled(c, x, y, k):
    c.save(); c.translate(x, y); c.scale(k, k); c.translate(-x, -y)

def _tray_rack(c, x, y, s, a):
    """A baking-tray trolley with three trays of buns, bottom centre (x, y), ~170 x 190 at s = 1."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-95, -8, 190, 16), paint(BLACK, .45 * a, blur=8))
    st = paint('#9aa5b9', a, stroke=6)
    for lx in (-78, 78): c.drawLine(lx, -184, lx, -12, st)
    for lx in (-78, 78): c.drawCircle(lx, -6, 7, paint('#1c222d', a))
    for k in range(3):
        ty = -170 + k * 56
        c.drawRRect(rrect(-86, ty, 172, 12, 4), paint(shader=lgrad((0, ty), (0, ty + 12), ['#d8dee8', '#7a8499']), a=a))
        for j in range(4):
            bx = -60 + j * 40
            c.drawOval(skia.Rect.MakeXYWH(bx - 15, ty - 16, 30, 18), paint('#c27a35', a))
            c.drawOval(skia.Rect.MakeXYWH(bx - 10, ty - 14, 14, 6), paint('#e7a96a', .7 * a))
    c.restore()

def _fridge(c, x, y, s, a):
    """A glass-door display fridge with cakes on shelves, bottom centre (x, y), ~130 x 250 at s = 1."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-75, -8, 150, 16), paint(BLACK, .45 * a, blur=8))
    c.drawRRect(rrect(-64, -250, 128, 246, 10), paint(shader=lgrad((-64, 0), (64, 0), ['#cfd6e2', '#f1f5f9', '#aeb8c9']), a=a))
    c.drawRRect(rrect(-56, -238, 112, 196, 6), paint('#0d2238', a))
    c.drawRRect(rrect(-56, -238, 112, 196, 6), paint('#bfe3ff', .25 * a, blur=6, stroke=3))
    for k in range(3):
        sy = -186 + k * 60
        c.drawLine(-52, sy, 52, sy, paint('#9fc3e8', .8 * a, stroke=2.4))
        for j, col in enumerate(('#f9a8d4', '#fde68a', '#7c4a2d')):
            cx = -32 + j * 32
            c.drawRRect(rrect(cx - 12, sy - 22, 24, 22, 4), paint(col, a))
            c.drawRect(skia.Rect.MakeXYWH(cx - 12, sy - 22, 24, 5), paint(WHITE, .8 * a))
    c.drawRRect(rrect(42, -200, 6, 80, 3), paint('#64748b', a))
    c.drawRRect(rrect(-56, -34, 112, 22, 4), paint('#334155', a))
    c.drawLine(-40, -224, -10, -120, paint(WHITE, .2 * a, stroke=6))
    c.restore()

def _mini_card(c, x, y, a, u=1., fill=1.):
    """A small cream asset card centred at (x, y) (172 x 106): cost / date / WDV lines."""
    if a <= 0 or u <= 0: return
    k = back(clamp(u)); aa = a * clamp(u * 2)
    c.save(); c.translate(x, y); c.scale(k, k)
    c.drawRRect(rrect(-86, -46, 172, 106, 8), paint(BLACK, .4 * aa, blur=8))
    c.drawRRect(rrect(-86, -53, 172, 106, 8), paint(CREAM, aa))
    for j, lab_ in enumerate(('cost', 'date', 'WDV')):
        yy = -24 + j * 30
        text(c, lab_, -72, yy + 8, 22, 800, '#4b5563', aa)
        c.drawLine(-6, yy + 4, -6 + 76 * clamp(fill * 3 - j), yy + 4, paint(INK, .7 * aa, stroke=2.4))
    c.restore()

def _bkicon(col):
    def fn(c, x, y, s):
        p = paint(col, 1, stroke=3 * s)
        c.drawRRect(rrect(x - 20 * s, y - 24 * s, 40 * s, 48 * s, 4 * s), p)
        c.drawLine(x - 12 * s, y - 24 * s, x - 12 * s, y + 24 * s, p)
        c.drawLine(x - 4 * s, y - 10 * s, x + 12 * s, y - 10 * s, paint(col, 1, stroke=2.4 * s))
    return fn

def _chair(col):
    def fn(c, x, y, s):
        p = paint(col, 1, stroke=3.2 * s)
        c.drawLine(x - 14 * s, y - 26 * s, x - 14 * s, y + 24 * s, p)
        c.drawLine(x - 14 * s, y + 2 * s, x + 18 * s, y + 2 * s, p)
        c.drawLine(x + 16 * s, y + 2 * s, x + 16 * s, y + 24 * s, p)
        c.drawLine(x - 14 * s, y - 26 * s, x - 2 * s, y - 22 * s, p)
        c.drawLine(x - 2 * s, y - 22 * s, x - 2 * s, y + 2 * s, p)
    return fn

def _bulb(col):
    def fn(c, x, y, s):
        p = paint(col, 1, stroke=3.2 * s)
        c.drawCircle(x, y - 8 * s, 17 * s, p)
        c.drawLine(x - 8 * s, y + 14 * s, x + 8 * s, y + 14 * s, p)
        c.drawLine(x - 7 * s, y + 21 * s, x + 7 * s, y + 21 * s, p)
    return fn

# ---------------------------------------------------------------- h1: the bakery's assets, each with its own card
FL1 = 720
IT_X = [300, 590, 850, 1110, 1460]
def _item(c, k, x, y, a, t, s=1.):
    if k == 0: oven(c, x, y, .58 * s, a, t, 1.)
    elif k == 1: mixer(c, x, y, .56 * s, a, t, 1.)
    elif k == 2: _tray_rack(c, x, y, .95 * s, a)
    elif k == 3: _fridge(c, x, y, .92 * s, a)
    else: van(c, x, y, .62 * s, a, BLUE, "Meera's Bakehouse", t)
ITEM_TOP = [182, 186, 184, 236, 112]                     # on-screen height of each item (for its card)
NAMES1 = ('ovens', 'mixers', 'trays', 'fridges', 'van')

def _h1(c, t):
    a = win(t, CS - .4, H2 + .9, .5, .7)
    if a <= 0: return
    sl = seg(t, H2 - .1, H2 + .9, ein)                   # the bakery slides away for the factory
    c.save(); c.translate(-260 * sl, 0)
    for k in range(5):
        u = _pop(t, ITEMS1[k] - .1)
        if u <= 0: continue
        ia = a * clamp(u * 1.6)
        x = IT_X[k]
        _scaled(c, x, FL1, .8 + .2 * u)
        _item(c, k, x, FL1, ia, t)
        c.restore()
        text(c, NAMES1[k], x, FL1 + 44, 26, 700, WHITE, ia, 'c', shadow=6)
        cu = seg(t, TRACK1 + .28 * k, TRACK1 + .28 * k + .45)
        if cu > 0:
            cy = FL1 - ITEM_TOP[k] - 70 + 4 * math.sin(t * 2 + k)
            _mini_card(c, x, cy, ia, cu, seg(t, TRACK1 + .28 * k + .3, TRACK1 + .28 * k + 1.2))
    qa = a * seg(t, EACH1 - .1, EACH1 + .4)
    if qa > 0:
        text(c, 'a card for every asset?', 880, 330, 32, 800, GOLD, qa, 'c', shadow=8)
    c.restore()

# ---------------------------------------------------------------- h2: a factory of 5,000 machines
GX0, GY0, GCW, GCH, GGAP = 660, 300, 34, 22, 6
GCOLS, GROWS = 29, 17
NCARDS = GCOLS * GROWS
_ORDER = sorted(range(NCARDS), key=lambda i: hsh(i, 11))
_RANK = {i: r for r, i in enumerate(_ORDER)}

def _grid_pic(n):
    """Picture of the first n cards (in fill order) of the card grid (cached in 24 steps)."""
    rec = skia.PictureRecorder(); cv = rec.beginRecording(skia.Rect.MakeXYWH(0, 0, 1920, 1080))
    for i in _ORDER[:n]:
        col, row = i % GCOLS, i // GCOLS
        x = GX0 + col * (GCW + GGAP) + (hsh(i, 3) - .5) * 8; y = GY0 + row * (GCH + GGAP) + (hsh(i, 4) - .5) * 8
        cv.save(); cv.translate(x + GCW / 2, y + GCH / 2); cv.rotate((hsh(i, 5) - .5) * 16)
        cv.drawRect(skia.Rect.MakeXYWH(-GCW / 2, -GCH / 2, GCW, GCH), paint(CREAM, .92))
        cv.drawLine(-GCW / 2 + 5, -3, GCW / 2 - 6, -3, paint(INK, .45, stroke=2))
        cv.drawLine(-GCW / 2 + 5, 4, GCW / 2 - 12, 4, paint(INK, .35, stroke=2))
        cv.restore()
    return rec.finishRecordingAsPicture()

_GP = {}
def _grid(c, t, a):
    """The card grid filling from FIVE2 to PAPER2 (24 cached fill states)."""
    u = seg(t, FIVE2 - .2, PAPER2 + .3, linr)
    step = int(u * 24 + .999)
    if step <= 0: return
    if step not in _GP: _GP[step] = _grid_pic(int(NCARDS * step / 24))
    p = skia.Paint(); p.setAlphaf(clamp(a)); c.drawPicture(_GP[step], None, p)

def _h2(c, t):
    a = win(t, H2 - .3, POOLS3 + .5, .5, .5)
    if a <= 0: return
    fa = a * seg(t, FACT2 - .4, FACT2 + .2)
    if fa > 0:
        factory(c, 340, 760, .82, fa, t)
        text(c, 'a factory', 340, 804, 26, 700, WHITE, fa, 'c', shadow=6)
    ca = a * seg(t, FIVE2 - .2, FIVE2 + .2)
    if ca > 0:
        roll(c, 5000, 340, 410, seg(t, FIVE2, MACH2 + .4, linr), 54, GOLD, ca, 'c', MONO, '', False, 700, 0, '')
        text(c, 'machines', 340, 456, 30, 800, WHITE, ca * seg(t, MACH2 - .1, MACH2 + .3), 'c', shadow=6)
    ga = a * (1 - seg(t, POOLS3, POOLS3 + .5))
    if ga > 0:
        red = seg(t, NEVER2, END2 + .4)
        _grid(c, t, ga)
        if red > 0:
            c.drawRect(skia.Rect(GX0 - 20, GY0 - 20, GX0 + GCOLS * (GCW + GGAP) + 14, GY0 + GROWS * (GCH + GGAP) + 14),
                       paint(RED, .12 * red * ga))
            text(c, 'the paperwork never ends', 1240, 806, 32, 800, RED, red * ga, 'c', shadow=8)
    # the magnified card: its own date, cost and value
    ma = a * win(t, EACH2 - .2, PAPER2 + .2, .4, .4)
    if ma > 0:
        x, y, w, h = 1050, 380, 420, 260
        k = .9 + .1 * seg(t, EACH2 - .2, EACH2 + .4, back)
        _scaled(c, x + w / 2, y + h / 2, k)
        c.drawRRect(rrect(x, y + 12, w, h, 14), paint(BLACK, .5 * ma, blur=18))
        c.drawRRect(rrect(x, y, w, h, 14), paint(CREAM, ma))
        c.drawRRect(rrect(x, y, w, 52, 14), paint('#e7dcc3', ma))
        text(c, 'one machine, one card', x + 24, y + 36, 24, 800, INK, ma)
        for j, (lab_, tt) in enumerate((('Date', DATE2), ('Cost', COST2), ('Value', VAL2))):
            yy = y + 104 + j * 52; u = seg(t, tt - .1, tt + .5)
            text(c, lab_, x + 30, yy, 28, 800, INK if u > 0 else '#9ca3af', ma)
            c.drawLine(x + 140, yy + 6, x + w - 30, yy + 6, paint(PAPER_LINE, ma, stroke=2))
            if u > 0:
                P = np.array([(x + 150 + q * (w - 200) * u, yy - 8 + 7 * math.sin(q * 26 + j)) for q in np.linspace(0, 1, 28)])
                c.drawPath(poly(P, False), paint('#1d4ed8', .85 * ma, stroke=3))
                c.drawRRect(rrect(x + 8, yy - 30, 6, 44, 3), paint(GOLD, ma * win(t, tt - .1, tt + .9, .2, .3)))
        c.restore()

# ---------------------------------------------------------------- h3: pooled into blocks
TK3 = [(150, 'Buildings', '10%', .55), (450, 'Furniture & fittings', '10%', .4), (750, 'Plant & machinery', '15%', .7),
       (1050, 'Computers', '40%', .35)]
TK_Y, TK_W, TK_H = 400, 240, 250

def _card_fly(c, t, a):
    """~90 cards fly from the grid into the four tanks."""
    for j in range(96):
        i = _ORDER[j * 5 % NCARDS]
        col, row = i % GCOLS, i // GCOLS
        x0 = GX0 + col * (GCW + GGAP) + GCW / 2; y0 = GY0 + row * (GCH + GGAP) + GCH / 2
        tk = j % 4; x1 = TK3[tk][0] + TK_W / 2 + (hsh(j, 7) - .5) * 80; y1 = TK_Y + 30
        t0 = POOLS3 - .1 + hsh(j, 9) * .9; u = seg(t, t0, t0 + .8, ease)
        if u <= 0 or u >= 1: continue
        x = lerp(x0, x1, u); y = lerp(y0, y1 + 40, u) - 40 * math.sin(math.pi * u)
        k = 1 - .7 * seg(u, .6, 1.)
        c.save(); c.translate(x, y); c.rotate((hsh(j, 2) - .5) * 60 + u * 140); c.scale(k, k)
        c.drawRect(skia.Rect.MakeXYWH(-GCW / 2, -GCH / 2, GCW, GCH), paint(CREAM, a))
        c.restore()

def _h3(c, t):
    a = win(t, POOLS3 - .3, H4 + .9, .4, .6)
    if a <= 0: return
    for k, (x, nm, rt, lv) in enumerate(TK3):
        ka = a * (1. if k == 2 else 1 - seg(t, H4 - .2, H4 + .5))
        if ka <= 0: continue
        if k == 2 and t > H4 - .2: continue               # h4 takes this tank over
        fill = seg(t, POOLS3 + .2, POOLS3 + 1.4)
        tank(c, x, TK_Y, TK_W, TK_H, ka, t + k, lv * fill, 1., None, None, ACC)
        cl = seg(t, CLASS3 - .2, CLASS3 + .3); ra = seg(t, RATE3 - .15, RATE3 + .25)
        text(c, nm, x + TK_W / 2, TK_Y + TK_H + 58, 26, 800, mixc(DIM, WHITE, cl), ka * seg(t, BLOCK3 - .3, BLOCK3 + .2), 'c', shadow=6)
        if ra > 0:
            _scaled(c, x + TK_W / 2, TK_Y + TK_H + 100, .7 + .3 * back(ra))
            text(c, rt, x + TK_W / 2, TK_Y + TK_H + 110, 38, 800, GOLD, ka * clamp(ra * 2), 'c', shadow=8)
            c.restore()
    _card_fly(c, t, a)
    ba = a * seg(t, BLOCK3 - .1, BLOCK3 + .4) * (1 - seg(t, H4 - .3, H4 + .3))
    if ba > 0:
        x0, x1 = TK3[0][0] - 10, TK3[3][0] + TK_W + 10
        c.drawLine(x0, TK_Y - 64, x1, TK_Y - 64, paint(ACC, .6 * ba, stroke=2))
        for xx in (x0, x1): c.drawLine(xx, TK_Y - 64, xx, TK_Y - 44, paint(ACC, .6 * ba, stroke=2))
        chip(c, (x0 + x1) / 2, TK_Y - 64, 'blocks of assets', ACC, ba, 26, fill=.3)

# ---------------------------------------------------------------- h4: one block, depreciation on its WDV
T4X, T4Y, T4W, T4H = 300, 380, 360, 360
LV4 = .78                                                # the pool before depreciation
def _h4_geom(t):
    u = seg(t, H4 - .2, H4 + .9)
    x0, _, _, lv = TK3[2]
    return lerp(x0, T4X, u), lerp(TK_Y, T4Y, u), lerp(TK_W, T4W, u), lerp(TK_H, T4H, u), u

def _h4(c, t):
    a = win(t, H4 - .3, H5 + .1, .3, .6)
    if a <= 0: return
    x, y, w, h, u = _h4_geom(t)
    skim = seg(t, FIXED4 + .3, FIXED4 + 1.1)
    lv = lerp(.7, LV4, u) - .15 * LV4 * skim
    lab_ = 'Plant & machinery · 15%' if u > .5 else None
    cx, ys, (ix, iy, iw, ih) = tank(c, x, y, w, h, a, t, lv, 1., lab_, None, ACC)
    if u < 1:
        text(c, 'Plant & machinery', x + w / 2, y + h + 58, 26, 800, WHITE, a * (1 - u), 'c', shadow=6)
    # the whole pool (= WDV) bracket
    wa = a * seg(t, WHOLE4 - .2, WHOLE4 + .3)
    if wa > 0:
        yb, yt = iy + ih, iy + ih * (1 - LV4)
        bx = x - 30
        p = paint(GOLD, wa, stroke=3)
        c.drawLine(bx, yt, bx, yb, p); c.drawLine(bx, yt, bx + 14, yt, p); c.drawLine(bx, yb, bx + 14, yb, p)
        text(c, 'the whole', bx - 16, (yt + yb) / 2 - 8, 26, 800, GOLD, wa, 'r', shadow=6)
        text(c, 'pool', bx - 16, (yt + yb) / 2 + 24, 26, 800, GOLD, wa, 'r', shadow=6)
        va = a * seg(t, WDV4 - .1, WDV4 + .4)
        if va > 0:
            text(c, '= WDV', bx - 16, (yt + yb) / 2 + 64, 30, 800, ACC, va, 'r', shadow=6)
    # the 15% slice: highlighted, then lifted out into the depreciation box
    fa = a * seg(t, FIXED4 - .2, FIXED4 + .2)
    if fa > 0:
        yt = iy + ih * (1 - LV4); sh = ih * LV4 * .15
        q = seg(t, FIXED4 + .3, FIXED4 + 1.3, ease)
        bx, by, bw, bh = 820, 380, 420, 160
        da = a * seg(t, FIXED4 + .2, FIXED4 + .7)
        if da > 0:
            card(c, bx, by, bw, bh, da)
            c.drawRRect(rrect(bx, by, bw, bh, 22), paint(GOLD, .8 * da, stroke=2))
            text(c, "this year's depreciation", bx + 30, by + 44, 24, 800, GOLD, da, track=.5)
        dx, dy = lerp(ix, bx + 30, q), lerp(yt, by + 70, q)
        sw, sh2 = lerp(iw, bw - 60, q), lerp(sh, 64, q)
        c.drawRRect(rrect(dx, dy, sw, sh2, 10), paint(GOLD, .9 * fa))
        if q <= 0:
            text(c, '15%', ix + iw + 24, yt + sh / 2 + 10, 30, 800, GOLD, fa, 'l', shadow=6)
        if q >= .95:
            text(c, '15% × WDV', bx + bw / 2, by + 70 + 46, 40, 800, '#1a1305', fa * seg(q, .95, 1.), 'c')
    # WDV = cost − earlier depreciation (a cost bar)
    ca = a * seg(t, LEFT4 - .3, LEFT4 + .2)
    if ca > 0:
        X0, X1, Y = 820, 1720, 640; Hb = 64; xw = lerp(X0, X1, .62)
        cu = seg(t, COST4 - .2, COST4 + .4); eu = seg(t, EARLIER4 - .1, EARLIER4 + .4)
        c.drawRRect(rrect(X0, Y, (xw - X0), Hb, 12), paint(ACC, .75 * ca))
        text(c, 'WDV', (X0 + xw) / 2, Y + 42, 30, 800, '#06202e', ca, 'c')
        text(c, "what's left", (X0 + xw) / 2, Y - 18, 24, 700, ACC, ca, 'c')
        if cu > 0:
            dp = paint(WHITE, .8 * ca * cu, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 7], 0))
            c.drawRRect(rrect(X0 - 6, Y - 6, (X1 - X0) * cu + 12, Hb + 12, 16), dp)
            text(c, 'cost', X0 + (X1 - X0) * cu / 2, Y + Hb + 44, 26, 800, WHITE, ca * cu, 'c')
        if eu > 0:
            c.drawRRect(rrect(xw + 4, Y, (X1 - xw - 4) * eu, Hb, 12), paint(RED, .55 * ca))
            text(c, 'earlier', (xw + X1) / 2, Y + 28, 22, 800, WHITE, ca * eu, 'c')
            text(c, 'depreciation', (xw + X1) / 2, Y + 54, 22, 800, WHITE, ca * eu, 'c')

# ---------------------------------------------------------------- h5–h6: the rate board
RB_X, RB_Y, RB_W, RB_RH = 300, 186, 1320, 66
RATES = [('house', 'Residential buildings', 5), ('building', 'Other buildings', 10), ('chair', 'Furniture & fittings', 10),
         ('gear', 'Plant & machinery', 15), ('truck', 'Buses, lorries, taxis (hiring business)', 30),
         ('chip', 'Computers & software', 40), ('book', 'Books (professionals)', 40), ('bulb', 'Intangible assets', 25)]
BAR_X, BAR_PX = 760, 11.                                 # bar start (from board x) and px per percent

def _ricon(name, col):
    if name == 'chair': return _chair(col)
    if name == 'book': return _bkicon(col)
    if name == 'bulb': return _bulb(col)
    return lambda c, x, y, s: icon(c, name, x, y, s, col, 1)

_RIC = {}
def _h56(c, t):
    a = win(t, H5 - .2, H7 + .2, .5, .6)
    if a <= 0: return
    ba = a * seg(t, MAIN5 - .3, MAIN5 + .3)
    if ba <= 0: return
    hh = 70 + RB_RH * 8 + 18
    card(c, RB_X, RB_Y, RB_W, hh, ba)
    text(c, 'Depreciation rates', RB_X + 36, RB_Y + 46, 30, 800, WHITE, ba)
    text(c, 'on the written down value', RB_X + 36 + text_w('Depreciation rates', 30, 800) + 18, RB_Y + 46, 24, 600, DIM, ba)
    text(c, 'RATE', RB_X + RB_W - 40, RB_Y + 46, 22, 800, GOLD, ba, 'r', track=3)
    c.drawLine(RB_X + 24, RB_Y + 66, RB_X + RB_W - 24, RB_Y + 66, paint(WHITE, .12 * ba, stroke=1.2))
    for k, (ic, nm, rt) in enumerate(RATES):
        t0 = ROWT[k] - .15; u = seg(t, t0, t0 + .45, eout)
        if u <= 0: continue
        ra = ba * u; cy = RB_Y + 70 + RB_RH * k + RB_RH / 2; dx = -40 * (1 - u)
        hl = win(t, t0, (ROWT[k + 1] - .2) if k < 7 else H7 - .3, .25, .35)
        if hl > 0:
            c.drawRRect(rrect(RB_X + 12, cy - RB_RH / 2 + 4, RB_W - 24, RB_RH - 8, 10), paint(GOLD, .1 * hl * ra))
            c.drawRRect(rrect(RB_X + 12, cy - RB_RH / 2 + 4, 5, RB_RH - 8, 2.5), paint(GOLD, hl * ra))
        col = PINK if ic == 'bulb' else ACC
        if (ic, col) not in _RIC: _RIC[(ic, col)] = _ricon(ic, shade(col, .2))
        c.save(); c.translate(dx, 0)
        if ra < .999:
            with layer(c, ra): _RIC[(ic, col)](c, RB_X + 64, cy, .62)
        else: _RIC[(ic, col)](c, RB_X + 64, cy, .62)
        text(c, nm, RB_X + 110, cy + 11, 30, 700, WHITE, ra)
        if k == 3:
            ca_ = ra * seg(t, CARS5 - .1, CARS5 + .3, back)
            if ca_ > 0: chip(c, RB_X + 110 + text_w(nm, 30, 700) + 120, cy, 'incl. motor cars', ACC, ca_, 22)
        c.restore()
        # bar to scale + rolling rate
        ru = seg(t, RATET[k] - .1, RATET[k] + .6, linr)
        if ru > 0:
            bx = RB_X + BAR_X; bw = BAR_PX * rt * eout(ru)
            c.drawRRect(rrect(bx, cy - 9, BAR_PX * 40, 18, 9), paint(WHITE, .06 * ra))
            c.drawRRect(rrect(bx, cy - 9, bw, 18, 9), paint(GOLD, .85 * ra))
            roll(c, rt, RB_X + RB_W - 40, cy + 13, ru, 36, GOLD, ra, 'r', MONO, '', False, 700, 0, '%')
    ha = ba * seg(t, HIGHER6 - .1, HIGHER6 + .4) * (1 - seg(t, ROWT[5], ROWT[5] + .5))
    if ha > 0:
        cy = RB_Y + 70 + RB_RH * 4 + RB_RH / 2
        text(c, 'and the higher ones', RB_X + 110, cy + 11, 30, 700, GOLD, ha * (1 - seg(t, ROWT[4] - .2, ROWT[4])))

# ---------------------------------------------------------------- h7: the water tank analogy
T7X, T7Y, T7W, T7H = 760, 330, 400, 380
def _lv7(t):
    return keys(t, [(TANK7 - .3, .45), (POUR7 + .2, .45), (POUR7 + 1.4, .72), (DRAIN7 + .1, .72), (DRAIN7 + 1.3, .56),
                    (FIXED7 + .5, .56), (FIXED7 + 1.4, .476), (UNLIKE7 + .2, .476), (LEVEL7 + .8, 0.)])

def _h7(c, t):
    a = win(t, H7 - .3, H8 + .4, .5, .5)
    if a <= 0: return
    lv = _lv7(t)
    inflow = win(t, POUR7 + .1, POUR7 + 1.5, .3, .4)
    outflow = max(win(t, DRAIN7, DRAIN7 + 1.4, .3, .4), win(t, UNLIKE7 + .2, LEVEL7 + 1.0, .3, .3))
    fg = seg(t, NEVER7 - .1, NEVER7 + .4)
    cx, ys, (ix, iy, iw, ih) = tank(c, T7X, T7Y, T7W, T7H, a, t, lv, 1., 'Plant & machinery · 15%', None, ACC,
                                    inflow, outflow, floor_glow=fg, drain_to=(T7X + T7W + 130, 800))
    # new asset rides the pipe
    na = a * seg(t, NEW7 - .2, NEW7 + .2) * (1 - seg(t, POUR7 + .3, POUR7 + .6))
    if na > 0:
        px = lerp(T7X - 160, ix + iw * .28 - 20, seg(t, NEW7 - .1, POUR7 + .3))
        oven(c, px, T7Y - 58, .22, na, t, .5)
    la = a * seg(t, NEW7, NEW7 + .4)
    if la > 0:
        text(c, 'new assets', T7X - 190, T7Y + 40, 30, 800, GREEN, la, 'r', shadow=6)
        text(c, 'pour in', T7X - 190, T7Y + 76, 30, 800, GREEN, la, 'r', shadow=6)
    sa = a * seg(t, SALE7 - .1, SALE7 + .3)
    if sa > 0:
        text(c, 'sale money', T7X + T7W + 70, T7Y + T7H - 120, 30, 800, ORANGE, sa, 'l', shadow=6)
        text(c, 'drains out', T7X + T7W + 70, T7Y + T7H - 84, 30, 800, ORANGE, sa, 'l', shadow=6)
        for k in range(3):
            q = (t * .9 + k / 3) % 1
            if win(t, DRAIN7, DRAIN7 + 1.4, .3, .4) > .2:
                coin(c, lerp(T7X + T7W + 42, T7X + T7W + 130, q), lerp(T7Y + T7H - 13, 800, q * q), 12, sa * math.sin(math.pi * q), GOLD)
    # depreciation skim
    fa = a * win(t, FIXED7 - .2, UNLIKE7 + .3, .3, .4)
    if fa > 0:
        L0 = .56; yt = iy + ih * (1 - L0); sh = ih * L0 * .15
        q = seg(t, FIXED7 + .5, FIXED7 + 1.5, ease)
        dx, dy = lerp(ix, 1260, q), lerp(yt, 380, q); sw = lerp(iw, 260, q)
        c.drawRRect(rrect(dx, dy, sw, sh, 8), paint(GOLD, .85 * fa))
        if q < .05: text(c, 'fixed share', ix + iw + 26, yt + sh / 2 + 10, 28, 800, GOLD, fa, 'l', shadow=6)
        da = fa * seg(t, FIXED7 + 1.3, FIXED7 + 1.7)
        if da > 0:
            text(c, 'taken as', 1390, 360, 26, 700, WHITE, da, 'c', shadow=6)
            text(c, 'depreciation', 1390, 460 + 4, 32, 800, GOLD, da, 'c', shadow=6)
    # the floor
    za = a * seg(t, ZERO7 - .1, ZERO7 + .3)
    if za > 0:
        fy = iy + ih
        cross(c, T7X - 60, fy, za * seg(t, ZERO7, ZERO7 + .4, back), 20)
        text(c, 'below zero?', T7X - 92, fy + 10, 28, 800, RED, za, 'r', shadow=6)
    wa = a * seg(t, SEE7 - .1, SEE7 + .4)
    if wa > 0:
        chip(c, 960, 806, 'what happens then? · next: selling from a block', ACC, wa, 24, fill=.22)

# ---------------------------------------------------------------- h8: laptop vs oven (below the check card)
A8 = (560, 770, 150, 110); B8 = (1210, 770, 150, 110)
AF8, A15_8 = W('h8a', 'forty'), W('h8a', 'fifteen')
def _h8(c, t):
    a = win(t, H8 - .1, CE + 1., .6, .3)
    if a <= 0: return
    ta = a * seg(t, H8, H8 + .5)
    la_ = seg(t, ALAP8 + .1, ALAP8 + .8); lo_ = seg(t, AOVEN8 + .1, AOVEN8 + .8)
    for (x, y, w, h), lv, nm, rt, side, k, tn, tr in (
            (A8, .35 + .3 * seg(t, ALAP8 + .7, ALAP8 + 1.3), 'Computers', '40%', 'l', 0, ALAP8, AF8),
            (B8, .45 + .25 * seg(t, AOVEN8 + .7, AOVEN8 + 1.3), 'Plant & machinery', '15%', 'r', 1, AOVEN8, A15_8)):
        tank(c, x, y, w, h, ta, t + k, lv, 1., None, None, ACC)
        al = 'r' if side == 'l' else 'l'; tx = x - 24 if side == 'l' else x + w + 24
        qa = ta * (1 - seg(t, tn - .2, tn + .2))
        if qa > 0: text(c, 'block ?', tx, y + 70, 28, 800, DIM, qa, al, shadow=6)
        na = ta * seg(t, tn, tn + .4)
        if na > 0: text(c, nm, tx, y + 44, 26, 800, WHITE, na, al, shadow=6)
        ra = ta * seg(t, tr - .1, tr + .3, back)
        if ra > 0:
            text(c, rt, tx, y + 90, 38, 800, GOLD, clamp(ra), al, shadow=8)
            g = win(t, ADIFF8 - .1, CE + 1, .3, .3)
            if g > 0:
                rw = text_w(rt, 38, 800); rx = tx - rw if al == 'r' else tx
                c.drawRRect(rrect(rx - 10, y + 52, rw + 20, 50, 12), paint(GOLD, .7 * g * ta, stroke=2.4))
    # the two assets: hover in the middle, then drop into their tanks
    lx = lerp(900, A8[0] + A8[2] / 2, la_); ly = lerp(860, A8[1] - 6, la_) - 90 * math.sin(math.pi * la_)
    ox = lerp(1030, B8[0] + B8[2] / 2, lo_); oy = lerp(860, B8[1] - 6, lo_) - 90 * math.sin(math.pi * lo_)
    laptop(c, lx, ly, .42 * (1 - .3 * la_), ta, 1.)
    oven(c, ox, oy, .3 * (1 - .3 * lo_), ta, t, 1.)
    qa = ta * (1 - seg(t, ALAP8 - .2, ALAP8 + .2))
    if qa > 0: text(c, 'same block?', 965, 900, 26, 800, GOLD, qa, 'c', shadow=6)
    na = a * seg(t, ABLK8 - .2, ABLK8 + .3)
    if na > 0:
        text(c, '≠', 960, 852, 72, 800, RED, na, 'c', shadow=8)
        text(c, 'different blocks', 960, 900, 26, 800, WHITE, na, 'c', shadow=6)

def ch_h(c, t):
    if t < CS - .5 or t > CE + .6: return
    _h1(c, t)
    _h2(c, t)
    _h3(c, t)
    _h4(c, t)
    _h56(c, t)
    _h7(c, t)
    _h8(c, t)

if __name__ == '__main__':
    for nm in ('TRACK1 EACH1 FACT2 FIVE2 MACH2 EACH2 DATE2 COST2 VAL2 PAPER2 NEVER2 END2 POOLS3 BLOCK3 GROUP3 CLASS3 '
               'RATE3 CHG4 WHOLE4 FIXED4 WDV4 LEFT4 COST4 EARLIER4 MAIN5 CARS5 HIGHER6 HIRING6 TANK7 NEW7 POUR7 SALE7 '
               'DRAIN7 FIXED7 DEP7 UNLIKE7 LEVEL7 NEVER7 ZERO7 SEE7 LAP8 OVEN8 ALAP8 AOVEN8 ADIFF8 ABLK8').split():
        print(nm, round(globals()[nm], 2))
    print('ITEMS1', [round(x, 2) for x in ITEMS1])
    print('ROWT', [round(x, 2) for x in ROWT]); print('RATET', [round(x, 2) for x in RATET]); print('events', len(EVENTS))
