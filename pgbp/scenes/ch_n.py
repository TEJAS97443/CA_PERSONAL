"""Chapter N — Investment-linked deduction (section 35AD).
n1 hook: Anil (Meera's cousin) beside his new cold storage, which rises from its foundation; crates of fruit and
   vegetables roll in at the shutter; on "the whole building in year one" the building's outline glows gold
n2 the cold store steps aside ("a business the country needs" ✓); § 35AD; a capital-spending block with "100%" drops
   whole into Year 1 of a five-year strip ("deduction"); the usual year-by-year depreciation slices below are struck
   out ("instead of depreciation")
n3 name: the specified businesses as nine icon tiles lit as named (cold chain, warehousing for farm produce / sugar,
   hospital 100+ beds, hotel 2-star+, affordable housing, then on "among others": pipeline, fertiliser,
   semiconductor fab, infrastructure); the cold store flies into the cold-chain tile; Anil watches from the right
n4 example: the sheet — capital spent ₹1,20,00,000 · less land ₹40,00,000 · 35AD deduction ₹80,00,000 (incl.
   pre-opening spend) · profit ₹30,00,000 − ₹80,00,000 · loss ₹50,00,000 (red); beside it a cost bar ₹1.2 crore whose
   land slice is cut away, the ₹80 lakh deducted, then a ₹30 lakh profit bar against it leaving a red ₹50 lakh loss
n5 the red loss tries four doors: only "specified business profit" opens (green), other business / salary / other
   heads are walled off; then a loss token rides an endless carry-forward track to ∞ ("no time limit")
n6 trap: three condition panels lit in turn — opted out of 115BAC (the regime switch flips), cash over ₹10,000 a day
   is EXCLUDED (stamp), the asset is used 8 years (an eight-box strip fills)
n7 what if: an eight-year strip with two lanes; the building token runs along the specified-business lane, and in
   year 3 drops to the ordinary-business lane (year 3 flashes red, years 4–8 broken); below: ₹80 lakh deduction −
   normal depreciation = income of year 3, DEEMED INCOME stamp
n8 check: below the card, "35AD 100%" + "depreciation?" chips; the answer lands "actual cost = nil" and strikes
   the depreciation chip
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('n')
N1, N2, N3, N4, N5, N6, N7, N8 = (T('n%d' % k) for k in range(1, 9))
N8A = TA('n8')

# ---------------------------------------------------------------- word times
ANIL1, BUILDS1, COLD1, FRUIT1, VEG1, DEDUCT1, WHOLE1, BLDG1, YEAR1 = (
    W('n1', 'anil'), W('n1', 'builds'), W('n1', 'cold'), W('n1', 'fruit'), W('n1', 'vegetables'), W('n1', 'deduct'),
    W('n1', 'whole'), W('n1', 'building'), W('n1', 'year'))
FEW2, NEEDS2, CAN2, SEC2, HUND2, CAPS2, DEDN2, INST2, DEP2 = (
    W('n2', 'few'), W('n2', 'needs'), W('n2', 'can'), W('n2', 'section'), W('n2', 'hundred'), W('n2', 'capital'),
    W('n2', 'deduction'), W('n2', 'instead'), W('n2', 'depreciation'))
SPEC3, COLD3, WARE3, HOSP3, HOTEL3, HOUS3, AMONG3 = (
    W('n3', 'specified'), W('n3', 'cold'), W('n3', 'warehouses'), W('n3', 'hospitals'), W('n3', 'hotels'),
    W('n3', 'affordable'), W('n3', 'among'))
ONE4, FORTY4, LAND4, COUNT4, EIGHTY4, DED4, INCL4, PROFIT4, THIRTY4, SO4, LOSS4, FIFTY4 = (
    W('n4', 'one'), W('n4', 'forty'), W('n4', 'land'), W('n4', 'count'), W('n4', 'eighty'), W('n4', 'deducted'),
    W('n4', 'including'), W('n4', 'profit'), W('n4', 'thirty'), W('n4', 'so'), W('n4', 'loss'), W('n4', 'fifty'))
LOSS5, ONLY5, SPEC5, CARR5, NO5, LIMIT5 = (W('n5', 'loss'), W('n5', 'only'), W('n5', 'specified'),
                                           W('n5', 'carried'), W('n5', 'no'), W('n5', 'limit'))
COND6, OPTED6, DEF6, CASH6, TEN6, DAY6, EXCL6, ASSET6, USED6, EIGHT6, YEARS6 = (
    W('n6', 'conditions'), W('n6', 'opted'), W('n6', 'default'), W('n6', 'cash'), W('n6', 'ten'), W('n6', 'day'),
    W('n6', 'excluded'), W('n6', 'asset'), W('n6', 'used'), W('n6', 'eight'), W('n6', 'years'))
MOVES7, ORD7, YEAR7, THREE7, DED7, MINUS7, NORMAL7, BECOMES7, INCOME7 = (
    W('n7', 'moves'), W('n7', 'ordinary'), W('n7', 'year'), W('n7', 'three'), W('n7', 'deduction'),
    W('n7', 'minus'), W('n7', 'normal'), W('n7', 'becomes'), W('n7', 'income'))
BOTH8, DEPQ8 = W('n8', 'both'), W('n8', 'depreciation')
ACTUAL8, NIL8, NOTH8 = W('n8a', 'actual'), W('n8a', 'nil'), W('n8a', 'nothing')

for tt, k in ((BUILDS1, 'whoosh'), (FRUIT1, 'pop'), (VEG1, 'pop'),
              (CAN2, 'ok'), (SEC2, 'blip'), (CAPS2 + .45, 'thunk'), (DEP2 + .3, 'error'),
              (COLD3, 'pop'), (HOSP3, 'pop'), (AMONG3, 'pop'),
              (ONE4, 'tick'), (COUNT4, 'snip'), (EIGHTY4, 'tick'), (FIFTY4, 'error'),
              (SPEC5, 'ok'), (CARR5, 'whoosh'),
              (OPTED6, 'key'), (EXCL6 + .12, 'thunk'), (EIGHT6, 'tick'),
              (ORD7, 'whoosh'), (THREE7, 'error'), (INCOME7 + .12, 'thunk'),
              (NIL8, 'ok'), (NOTH8, 'error')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _box(c, x, y, w, h, col, a, fill=.8, glow=0., r=18, stroke=.9):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 7, w, h, r), paint(BLACK, .35 * a))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .94 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .45 * a * glow, stroke=7, blur=8))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, stroke * a, stroke=2.2))

def _head(c, s, x, y, a, size=40, col=WHITE, sub=None, sub_col=DIM, sub_a=1.):
    if a <= 0: return
    text(c, s, x, y, size, 800, col, a, shadow=6)
    if sub: text(c, sub, x, y + 42, 27, 600, sub_col, a * sub_a)

def _strike(c, x0, x1, y, u, a, col=RED):
    if u <= 0 or a <= 0: return
    c.drawLine(x0, y, lerp(x0, x1, clamp(u)), y - 2, paint(col, .95 * a, stroke=3.6))

_CRATE = {}
def _crate_pic(kind):
    if kind in _CRATE: return _CRATE[kind]
    rec = skia.PictureRecorder(); cv = rec.beginRecording(skia.Rect.MakeXYWH(-70, -80, 140, 100))
    fruit = {'apple': ['#ef4444', '#dc2626'], 'orange': ['#fb923c', '#f97316'], 'veg': ['#4ade80', '#16a34a']}[kind]
    for k in range(5):
        fx = -44 + k * 22; fy = -50 - 6 * ((k * 7) % 3)
        cv.drawCircle(fx, fy, 14, paint(fruit[k % 2]))
        cv.drawCircle(fx - 4, fy - 5, 4, paint(WHITE, .35))
    cv.drawRRect(rrect(-60, -48, 120, 52, 6), paint('#9a6a3c'))
    for yy in (-36, -20, -4): cv.drawLine(-58, yy, 58, yy, paint('#6b4423', stroke=2.4, cap=False))
    cv.drawRRect(rrect(-60, -48, 120, 52, 6), paint('#5a3a1e', stroke=2))
    cv.drawRect(skia.Rect.MakeXYWH(-56, -48, 8, 52), paint('#7a5230')); cv.drawRect(skia.Rect.MakeXYWH(48, -48, 8, 52), paint('#7a5230'))
    _CRATE[kind] = rec.finishRecordingAsPicture(); return _CRATE[kind]

def _crate(c, x, y, s, a, kind):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    if a < .999:
        p = skia.Paint(); p.setAlphaf(clamp(a)); c.drawPicture(_crate_pic(kind), None, p)
    else: c.drawPicture(_crate_pic(kind))
    c.restore()

# ---------------------------------------------------------------- n1–n2: Anil and the cold store
CSX, CSY, CSS = 1180, 792, 1.1                   # the hook position (bottom centre, scale)
CS2 = (330, 640, .62)                            # n2 position

def _store_pos(t):
    u = seg(t, N2 - .2, N2 + .8)
    return lerp(CSX, CS2[0], u), lerp(CSY, CS2[1], u), lerp(CSS, CS2[2], u)

def _hook1(c, t):
    a = 1 - seg(t, N4 - .75, N4 - .25)
    if a <= 0: return
    pa = seg(t, CS - .2, CS + .6) * (1 - seg(t, N2 - .2, N2 + .5))
    person(c, 430 - 120 * seg(t, N2 - .2, N2 + .5), 806, 1.0, pa, 'anil', t, look=.6 * seg(t, BUILDS1, BUILDS1 + .5), mood=.3)
    # the building rises
    x, y, s = _store_pos(t)
    rise = seg(t, CS - .1, BUILDS1 + .6, eout)
    fly = seg(t, SPEC3 + .3, COLD3 - .1)                                      # n3: flies into the cold-chain tile
    if fly > 0:
        x, y, s = lerp(x, TX3 + TW3 / 2, ease(fly)), lerp(y, TY3 + TH3 - 52, ease(fly)), lerp(s, .26, ease(fly))
    sa = a * seg(t, CS - .2, CS + .3)
    if sa > 0:
        c.save(); c.clipRect(skia.Rect(x - 320 * s, y - 330 * s * rise - 4, x + 320 * s, y + 40 * s))
        cold_store(c, x, y, s, sa, t)
        c.restore()
        if rise < 1:
            for k in range(6):
                q = (t * 1.3 + k / 6) % 1
                c.drawCircle(x - 250 * s + k * 100 * s, y - 10 - 30 * q, 10 + 14 * q, paint('#c3cad8', .18 * (1 - q) * sa * (1 - rise)))
        gl = win(t, DEDUCT1 - .2, N2 + .4, .3, .5) * sa
        if gl > 0:
            c.drawRRect(rrect(x - 270 * s, y - 315 * s, 540 * s, 320 * s, 14), paint(GOLD, .9 * gl, stroke=4))
            c.drawRRect(rrect(x - 270 * s, y - 315 * s, 540 * s, 320 * s, 14), paint(GOLD, .3 * gl, stroke=12, blur=10))
            chip(c, x, y - 345 * s - 22, 'the whole building → year 1?', GOLD, gl * (1 - seg(t, N2 - .2, N2 + .2)), 28)
    # crates of fruit and vegetables rolling into the shutter
    for k, (kind, tt) in enumerate((('apple', FRUIT1 - .35), ('orange', FRUIT1 + .25), ('veg', VEG1 - .1))):
        u = seg(t, tt, tt + 1.6, linr)
        ca = a * seg(t, tt, tt + .2) * (1 - seg(u, .8, 1)) * (1 - seg(t, N2 - .3, N2))
        if ca <= 0: continue
        _crate(c, lerp(640, CSX + 10, u), CSY - 4, .9 * (1 - .3 * u), ca, kind)
    # n2: a business the country needs
    if t > N2 - .3:
        x2, y2 = x, y
        na = a * seg(t, FEW2 - .2, FEW2 + .3) * (1 - fly)
        if na > 0:
            chip(c, x2, y2 + 46, 'a business the country needs', ACC, na, 25)
            tick(c, x2 + 190, y2 - 226, na * seg(t, CAN2 - .2, CAN2 + .3, back), 22)

YS2_X, YS2_Y, YS2_W, YS2_H = 700, 600, 1100, 100
def _year1(c, t):
    a = seg(t, N2 + .2, N2 + .9) * (1 - seg(t, N3 - .4, N3 + .2))
    if a <= 0: return
    sa = a * seg(t, SEC2 - .2, SEC2 + .3, back)
    if sa > 0:
        sec(c, 110, 330, '35AD', sa, size=40)
        text(c, '100% of the capital spending, as a deduction', 110, 400, 30, 700, WHITE, a * seg(t, DEDN2 - .2, DEDN2 + .3))
    cen = yearstrip(c, YS2_X, YS2_Y, YS2_W, 5, a * seg(t, N2 + .4, N2 + 1.0), hl={0: win(t, CAPS2 + .4, N3, .3, .4)})
    bw = (YS2_W - 40) / 5
    # the capital-spending block
    ba = a * seg(t, SEC2 + .2, SEC2 + .6)
    if ba > 0:
        u = seg(t, CAPS2 + .15, CAPS2 + .5, ein)
        bx = lerp(980, cen[0][0], u); by = lerp(400, cen[0][1], u)
        w, h = lerp(360, bw - 8, u), lerp(120, YS2_H - 8, u)
        col = mixc(GOLD, GREEN, seg(t, DEDN2 - .2, DEDN2 + .3))
        _box(c, bx - w / 2, by - h / 2, w, h, col, ba, .62, glow=win(t, CAPS2 + .45, CAPS2 + 1.6, .1, .8))
        icon(c, 'warehouse', bx - w / 2 + 44 * (1 - u) + 30 * u, by, .7 - .2 * u, WHITE, ba)
        ha = ba * seg(t, HUND2 - .25, HUND2 + .2, back)
        text(c, '100%', bx + 34 * (1 - u) + 12 * u, by + 18 - 4 * u, 52 - 16 * u, 800, WHITE, ha, 'c', shadow=6)
        la = ba * seg(t, CAPS2 - .1, CAPS2 + .3) * (1 - u)
        text(c, 'capital spending', bx, by - h / 2 - 16, 26, 700, GOLD, la, 'c')
        if u >= 1:
            text(c, 'deducted', cen[0][0], YS2_Y + YS2_H + 36, 27, 800, GREEN, ba * seg(t, DEDN2 - .2, DEDN2 + .3), 'c')
    # the usual depreciation slices, struck out
    da = a * seg(t, INST2 - .3, INST2 + .2)
    if da > 0:
        base = 802
        for k in range(5):
            h = 64 * .85 ** k
            x0 = cen[k][0] - 40
            p = paint(ACC, .8 * da, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([7, 5], 0))
            c.drawRRect(rrect(x0, base - h, 80, h, 6), paint(ACC, .12 * da)); c.drawRRect(rrect(x0, base - h, 80, h, 6), p)
        text(c, 'depreciation', YS2_X - 26, base - 22, 26, 700, ACC, da, 'r')
        u = seg(t, DEP2 + .1, DEP2 + .7)
        _strike(c, YS2_X - 190, YS2_X + YS2_W, base - 30, u, da)
        text(c, 'instead of', YS2_X - 26, base - 56, 22, 700, DIM, da, 'r')

# ---------------------------------------------------------------- n3: specified businesses
TX3, TY3, TW3, TH3, TGX, TGY = 110, 300, 370, 150, 25, 25
TILES3 = [('Cold chain', 'snow', COLD3), ('Warehousing · farm produce, sugar', 'warehouse', WARE3),
          ('Hospital · 100+ beds', 'hospital', HOSP3), ('Hotel · 2-star and above', 'star', HOTEL3),
          ('Affordable housing', 'house', HOUS3), ('Gas / oil pipeline', 'pipe', AMONG3),
          ('Fertiliser', 'factory', AMONG3 + .25), ('Semiconductor fab', 'chip', AMONG3 + .5),
          ('Infrastructure', 'road', AMONG3 + .75)]

def _tiles3(c, t):
    a = seg(t, N3 - .2, N3 + .4) * (1 - seg(t, N4 - .75, N4 - .25))
    if a <= 0: return
    text(c, 'Specified businesses', TX3, 270, 34, 800, WHITE, a * seg(t, SPEC3 - .3, SPEC3 + .2), shadow=6)
    for k, (lbl, ic, tt) in enumerate(TILES3):
        x = TX3 + (k % 3) * (TW3 + TGX); y = TY3 + (k // 3) * (TH3 + TGY)
        ta = a * seg(t, tt - .25, tt + .2)
        if ta <= 0: continue
        pop = seg(t, tt - .25, tt + .35, back)
        g = win(t, tt - .1, tt + 1.3, .2, .7)
        col = GOLD if k == 0 else ACC
        c.save(); c.translate(x + TW3 / 2, y + TH3 / 2); k_ = .88 + .12 * pop; c.scale(k_, k_); c.translate(-(x + TW3 / 2), -(y + TH3 / 2))
        tile(c, x, y, TW3, TH3, ic if k else None, lbl, ta, col, None, 24, max(g, .45 * (k == 0)))
        c.restore()
    aa = a * seg(t, N3 + .2, N3 + .9)
    person(c, 1590, 806, 1.0, aa, 'anil', t, look=-.6, mood=.5)
    ca = a * seg(t, COLD3 + .3, COLD3 + .7)
    if ca > 0: chip(c, 1590, 540, "Anil's cold storage ✓", GOLD, ca, 26)
    oa = a * seg(t, AMONG3 - .2, AMONG3 + .3)
    if oa > 0: text(c, '… among others', TX3 + 3 * (TW3 + TGX) - TGX, 838, 24, 700, DIM, oa, 'r')

# ---------------------------------------------------------------- n4: the example
SH4 = [
    {'label': 'Capital spent (cold storage)', 'amt': 12000000, 'kind': 'start', 't0': ONE4 - .1},
    {'label': 'Land (never counts)', 'amt': 4000000, 'kind': 'less', 't0': FORTY4 - .1},
    {'label': 'Deduction u/s 35AD', 'amt': 8000000, 'kind': 'sub', 'sec': '35AD', 't0': EIGHTY4 - .1, 'hl': (EIGHTY4 - .1, INCL4 + 1.6)},
    {'label': 'includes what he spent before opening', 'kind': 'note', 't0': INCL4 - .1},
    {'label': 'Profit before 35AD', 'amt': 3000000, 'kind': 'start', 't0': THIRTY4 - .1},
    {'label': 'Less: deduction u/s 35AD', 'amt': 8000000, 'kind': 'less', 't0': SO4 - .3},
    {'label': 'Loss of the specified business', 'amt': 5000000, 'kind': 'total', 'col': RED, 't0': FIFTY4 - .15},
]
SH4_X, SH4_Y, SH4_W = 100, 290, 1010
BASE4, K4 = 790, 380 / 120.                      # bar base y, px per lakh
BX4, BW4, PX4 = 1400, 160, 1200                  # deduction bar x, width, profit bar x

def _bar(c, x, y0, y1, w, col, a, fill=.55, dashed=False):
    if a <= 0 or y1 - y0 < 1: return
    c.drawRRect(rrect(x, y0, w, y1 - y0, 10), paint(col, fill * a))
    p = paint(col, .95 * a, stroke=2.2)
    if dashed: p.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
    c.drawRRect(rrect(x, y0, w, y1 - y0, 10), p)

def _example4(c, t):
    a = seg(t, N4 - .25, N4 + .3) * (1 - seg(t, N5 - .5, N5 + .2))
    if a <= 0: return
    sheet(c, SH4_X, SH4_Y, SH4_W, SH4, a * (1 - seg(t, N5 - .5, N5 - .1)), t, title='Anil · section 35AD', title_r='cold storage')
    # cost bar ₹1.2 crore = land ₹40 lakh + ₹80 lakh
    ca = a * seg(t, ONE4 - .2, ONE4 + .3)
    if ca <= 0: return
    grow = seg(t, ONE4 - .2, ONE4 + .8, eout)
    cut = seg(t, COUNT4 - .1, COUNT4 + .8)
    drop = seg(t, COUNT4 + .3, COUNT4 + 1.0)
    landh, goldh = 40 * K4, 80 * K4
    # land slice
    la = ca * (1 - cut)
    if la > 0:
        y0 = BASE4 - landh * grow
        hl = seg(t, FORTY4 - .2, FORTY4 + .3)
        _bar(c, BX4 + 60 * cut, y0 + 50 * cut, BASE4 + 50 * cut, BW4, mixc('#a0703f', RED, .5 * hl), la, .7)
        text(c, 'land ' + inr(4000000), BX4 + BW4 + 18, BASE4 - landh / 2 + 10, 26, 800, RED, la * hl)
    if cut > .3: cross(c, BX4 + BW4 / 2 + 60 * cut, BASE4 - landh / 2 + 50 * cut, ca * win(t, COUNT4 + .1, COUNT4 + 1.4, .2, .4), 22)
    # the ₹80 lakh: drops to the base, turns green when deducted
    yb = lerp(BASE4 - landh * grow, BASE4, drop)
    ded = seg(t, DED4 - .2, DED4 + .3)
    loss = seg(t, FIFTY4 - .2, FIFTY4 + .4)
    pf = seg(t, THIRTY4 - .2, THIRTY4 + .5, eout)
    ytop = yb - goldh * grow
    col80 = mixc(GOLD, GREEN, ded)
    if loss <= 0:
        _bar(c, BX4, ytop, yb, BW4, col80, ca)
    else:
        ysplit = BASE4 - 30 * K4
        _bar(c, BX4, ysplit, yb, BW4, col80, ca)
        _bar(c, BX4, ytop, ysplit, BW4, mixc(col80, RED, loss), ca, .55 + .2 * loss)
    ia = ca * seg(t, INCL4 - .2, INCL4 + .3)
    ia *= 1 - loss
    if ia > 0:
        p = paint(WHITE, .7 * ia, stroke=1.6, cap=False); p.setPathEffect(skia.DashPathEffect.Make([6, 5], 0))
        c.drawLine(BX4 + 8, ytop + 38, BX4 + BW4 - 8, ytop + 38, p)
        text(c, 'pre-opening', BX4 + BW4 / 2, ytop + 28, 22, 700, WHITE, ia * (1 - loss), 'c')
    lbl_a = ca * (1 - seg(t, FORTY4 - .3, FORTY4))
    text(c, inr(12000000), BX4 + BW4 / 2, ytop - 18, 30, 800, GOLD, lbl_a, 'c', shadow=6)
    ea = ca * seg(t, EIGHTY4 - .2, EIGHTY4 + .3)
    if ea > 0:
        text(c, inr(8000000), BX4 + BW4 + 18, ytop + 34, 30, 800, col80, ea * (1 - loss))
        text(c, 'deducted', BX4 + BW4 + 18, ytop + 66, 25, 700, GREEN, ea * ded * (1 - loss))
        text(c, '35AD', BX4 + BW4 / 2, BASE4 + 30, 22, 700, DIM, ea, 'c')
    # profit ₹30 lakh against it
    if pf > 0:
        _bar(c, PX4, BASE4 - 30 * K4 * pf, BASE4, BW4, BLUE, ca)
        text(c, 'profit ' + inr(3000000), PX4 + BW4 / 2, BASE4 - 30 * K4 - 28, 26, 800, BLUE, ca * pf, 'c')
        text(c, 'profit', PX4 + BW4 / 2, BASE4 + 30, 22, 700, DIM, ca * pf, 'c')
        p = paint(BLUE, .8 * ca * pf, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
        c.drawLine(PX4, BASE4 - 30 * K4, BX4 + BW4 + 10, BASE4 - 30 * K4, p)
    if loss > 0:
        ym = (ytop + BASE4 - 30 * K4) / 2
        text(c, 'loss', BX4 + BW4 + 18, ym - 8, 26, 800, RED, ca * loss)
        text(c, inr(5000000), BX4 + BW4 + 18, ym + 26, 30, 800, RED, ca * loss)
    c.drawLine(PX4 - 20, BASE4, BX4 + BW4 + 20, BASE4, paint(DIM, .6 * ca, stroke=2, cap=False))

# ---------------------------------------------------------------- n5: set-off only against specified business
DOORS5 = [('Specified business profit', GREEN), ('Other business profit', DIM), ('Salary', DIM), ('Other heads of income', DIM)]
DX5, DY5, DW5, DH5, DG5 = 760, 296, 620, 80, 20
LB5 = (130, 380, 300, 150)
def _setoff5(c, t):
    a = seg(t, N5 - .4, N5 + .3) * (1 - seg(t, N6 - .6, N6 - .1))
    if a <= 0: return
    # the loss block, flying in from the n4 bar
    u = seg(t, N5 - .4, N5 + .5)
    x = lerp(BX4, LB5[0], u); y = lerp(BASE4 - 80 * K4, LB5[1], u); w = lerp(BW4, LB5[2], u); h = lerp(50 * K4, LB5[3], u)
    _box(c, x, y, w, h, RED, a, .72, glow=win(t, LOSS5 - .2, LOSS5 + 1.2, .2, .6))
    text(c, 'LOSS', x + w / 2, y + h * .38, 22, 800, RED, a * u, 'c', track=3)
    text(c, inr(5000000), x + w / 2, y + h * .72, 40, 800, WHITE, a * u, 'c')
    text(c, 'specified business', x + w / 2, y + h + 34, 24, 700, DIM, a * u, 'c')
    walls = seg(t, ONLY5 - .1, ONLY5 + .35)
    ok = seg(t, SPEC5 - .2, SPEC5 + .3)
    for k, (lbl, col) in enumerate(DOORS5):
        da = a * seg(t, N5 + .1 + .12 * k, N5 + .5 + .12 * k)
        if da <= 0: continue
        dy = DY5 + k * (DH5 + DG5)
        g = ok if k == 0 else 0.
        _box(c, DX5, dy, DW5, DH5, GREEN if k == 0 else ACC, da, .82, glow=g * .8)
        text(c, lbl, DX5 + 32, dy + DH5 / 2 + 10, 30, 700, WHITE, da)
        if k == 0:
            tick(c, DX5 + DW5 - 40, dy + DH5 / 2, da * ok, 20)
        else:
            wa = da * walls
            if wa > 0:
                wy = lerp(dy - 60, dy, seg(t, ONLY5 - .1 + .08 * k, ONLY5 + .2 + .08 * k, ein))
                c.save(); c.clipRRect(rrect(DX5, dy, DW5, DH5, 18), True)
                c.drawRect(skia.Rect.MakeXYWH(DX5, wy, DW5, DH5), paint('#3b1d22', .9 * wa))
                for r in range(3):
                    for q in range(9):
                        bx = DX5 + q * 72 - (36 if r % 2 else 0); by = wy + r * (DH5 / 3)
                        c.drawRRect(rrect(bx + 2, by + 2, 68, DH5 / 3 - 4, 3), paint(RED, .22 * wa))
                c.restore()
                text(c, lbl, DX5 + 32, dy + DH5 / 2 + 10, 30, 700, mixc(WHITE, DIM, wa), da * (1 - .5 * wa))
                cross(c, DX5 + DW5 - 40, dy + DH5 / 2, wa, 20)
    # the link loss -> specified business profit
    if ok > 0:
        p0 = (LB5[0] + LB5[2], LB5[1] + 30); p1 = (DX5 - 10, DY5 + DH5 / 2)
        link(c, p0, p1, GREEN, a * ok, seg(t, SPEC5 - .2, SPEC5 + .4), w=3, head=16)
        chip(c, (p0[0] + p1[0]) / 2 + 10, (p0[1] + p1[1]) / 2 - 40, 'set off', GREEN, a * ok, 22)
    # carried forward, no time limit
    ca = a * seg(t, CARR5 - .3, CARR5 + .2)
    if ca > 0:
        ty = 760; tx0, tx1 = 140, 1700
        p = paint(GOLD, .6 * ca, stroke=2.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 10], -t * 40))
        c.drawLine(tx0, ty, tx1, ty, p)
        labels = ['next year', '+2', '+3', '+4', '+5', '+6', '…']
        for k, s in enumerate(labels):
            xx = lerp(tx0 + 120, tx1 - 120, k / (len(labels) - 1))
            la = ca * seg(t, CARR5 + .08 * k, CARR5 + .08 * k + .3)
            c.drawCircle(xx, ty, 6, paint(GOLD, .9 * la))
            text(c, s, xx, ty + 40, 22, 700, DIM, la, 'c')
        text(c, '∞', tx1 + 40, ty + 18, 60, 800, GOLD, ca * seg(t, NO5 - .2, NO5 + .3), 'c', shadow=6)
        chip(c, tx1 - 30, ty - 52, 'no time limit', GOLD, ca * seg(t, LIMIT5 - .3, LIMIT5 + .2), 24)
        q = seg(t, CARR5, LIMIT5 + .6, linr)
        tx = lerp(tx0, tx1 - 10, q)
        _box(c, tx - 44, ty - 20, 88, 40, RED, ca * (1 - seg(q, .92, 1)), .7, r=12)
        text(c, 'loss', tx, ty + 8, 22, 800, WHITE, ca * (1 - seg(q, .92, 1)), 'c')

# ---------------------------------------------------------------- n6: the conditions
PAN6 = [(100, 'Opted out of 115BAC', OPTED6), (700, 'No cash over ₹10,000/day', CASH6), (1300, 'Used 8 years for it', ASSET6)]
PY6, PW6, PH6 = 300, 520, 490
def _trap6(c, t):
    a = seg(t, N6 - .4, N6 + .3) * (1 - seg(t, N7 - .6, N7 - .1))
    if a <= 0: return
    text(c, 'The conditions', 100, 266, 34, 800, WHITE, a * seg(t, COND6 - .3, COND6 + .2), shadow=6)
    for k, (x, ttl, tt) in enumerate(PAN6):
        pa = a * seg(t, tt - .6, tt - .1)
        if pa <= 0: continue
        g = win(t, tt - .3, tt + 2.2, .3, .8)
        _box(c, x, PY6, PW6, PH6, GOLD if g > .2 else ACC, pa, .84, glow=g * .6)
        c.drawCircle(x + 46, PY6 + 52, 24, paint(GOLD, .9 * pa))
        text(c, str(k + 1), x + 46, PY6 + 62, 28, 800, '#1a1305', pa, 'c')
        text(c, ttl, x + 86, PY6 + 62, 30, 800, WHITE, pa)
        cx = x + PW6 / 2
        if k == 0:
            pos = seg(t, OPTED6 - .1, OPTED6 + .5)
            regime_switch(c, cx, PY6 + 230, pa, pos, t, .78)
            padlock(c, cx - 110, PY6 + 380, 1.3, mixc(RED, GREEN, pos), pa, pos)
            text(c, '35AD', cx - 70, PY6 + 392, 34, 800, WHITE, pa)
            text(c, 'not in the default regime', cx, PY6 + 450, 25, 700, DIM, pa * seg(t, DEF6 - .2, DEF6 + .3), 'c')
        elif k == 1:
            notes(c, cx - 140, PY6 + 220, pa, 4, .8, -8)
            ra = pa * seg(t, TEN6 - .2, TEN6 + .3)
            text(c, '> ₹10,000', cx + 110, PY6 + 214, 42, 800, RED, ra, 'c', shadow=6)
            text(c, 'to one person, in a day', cx + 110, PY6 + 254, 23, 700, DIM, ra * seg(t, DAY6 - .2, DAY6 + .3), 'c')
            stamp(c, cx, PY6 + 356, 'EXCLUDED', RED, pa, seg(t, EXCL6 - .2, EXCL6 + .6, linr), -8, 42)
            text(c, 'not part of the 35AD deduction', cx, PY6 + 456, 24, 700, DIM, pa * seg(t, EXCL6 + .2, EXCL6 + .6), 'c')
        else:
            cold_store(c, cx, PY6 + 290, .5, pa, t)
            n_on = seg(t, USED6 - .1, YEARS6 + .5, linr) * 8
            bw, gp = 52, 6; x0 = cx - (8 * bw + 7 * gp) / 2
            for i in range(8):
                on = clamp(n_on - i); bx = x0 + i * (bw + gp)
                c.drawRRect(rrect(bx, PY6 + 336, bw, bw, 10), paint(mixc('#0d1530', shade(GOLD, -.55), on), pa))
                c.drawRRect(rrect(bx, PY6 + 336, bw, bw, 10), paint(mixc(ACC, GOLD, on), .9 * pa, stroke=2))
                text(c, str(i + 1), bx + bw / 2, PY6 + 336 + bw / 2 + 9, 26, 800, mixc(DIM, WHITE, on), pa, 'c')
            text(c, '8 years in that business', cx, PY6 + 450, 25, 700, DIM, pa * seg(t, EIGHT6 - .2, EIGHT6 + .3), 'c')

# ---------------------------------------------------------------- n7: moved to an ordinary business in year 3
YS7_X, YS7_Y, YS7_W, YS7_H = 420, 290, 1400, 62
LANE7 = [(372, 'Specified business', GREEN), (480, 'Ordinary business', DIM)]
LH7 = 92
def _what7(c, t):
    a = seg(t, N7 - .4, N7 + .3) * (1 - seg(t, N8 - .5, N8 + .3))
    if a <= 0: return
    br = seg(t, THREE7 - .2, THREE7 + .3)
    cols = {2: RED} if br > .5 else {}
    used = seg(t, N7 + .2, ORD7 - .2, linr) * 2
    hl = {i: clamp(used - i) for i in range(2)}
    cen = yearstrip(c, YS7_X, YS7_Y, YS7_W, 8, a, hl=hl, cols=cols, h=YS7_H)
    if br > 0:
        for i in range(3, 8):
            x0 = cen[i][0] - (YS7_W - 70) / 16
            p = paint(RED, .8 * a * br, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 7], 0))
            c.drawRRect(rrect(x0, YS7_Y, (YS7_W - 70) / 8, YS7_H, 12), p)
        text(c, '8-year use broken', cen[5][0], YS7_Y - 14, 24, 800, RED, a * br, 'c')
    for (ly, lbl, col) in LANE7:
        c.drawRRect(rrect(100, ly, YS7_X + YS7_W - 100, LH7, 16), paint(col, .07 * a))
        c.drawRRect(rrect(100, ly, YS7_X + YS7_W - 100, LH7, 16), paint(col, .45 * a, stroke=1.6))
        text(c, lbl, 124, ly + LH7 / 2 + 10, 27, 800, col if col != DIM else WHITE, a)
    # the building token
    u1 = seg(t, N7 + .2, ORD7 - .2)
    u2 = seg(t, ORD7 - .1, ORD7 + .7)
    bx = lerp(cen[0][0], cen[2][0], u1)
    by = lerp(LANE7[0][0], LANE7[1][0], ease(u2)) + LH7 - 8
    ly0 = LANE7[0][0] + LH7 / 2
    if u1 > 0:
        c.drawLine(cen[0][0] - 70, ly0 + 30, lerp(cen[0][0], cen[2][0], u1), ly0 + 30, paint(GREEN, .7 * a, stroke=4))
        text(c, 'used for cold storage', (cen[0][0] + cen[1][0]) / 2, ly0 - 8, 22, 700, GREEN, a * seg(u1, .3, .8), 'c')
    if u2 > 0:
        P = catmull([(cen[2][0] + 90, ly0 - 10), (cen[2][0] + 120, ly0 + 50), (cen[2][0] + 90, LANE7[1][0] + LH7 / 2 + 6)], step=8)
        p = paint(RED, .9 * a * u2, stroke=3, cap=False)
        path = skia.Path(); path.moveTo(*P[0])
        for q in P[1:int(len(P) * u2)]: path.lineTo(*q)
        c.drawPath(path, p)
        if u2 > .9: arrow(c, P[-5][0], P[-5][1], P[-1][0], P[-1][1], RED, 3, a * seg(u2, .9, 1), 16)
        text(c, 'moved in year 3', cen[2][0] + 140, ly0 + 46, 22, 700, RED, a * u2)
    cold_store(c, bx, by, .25, a, t)
    # deduction − normal depreciation = income of year 3
    y0 = 640; h0 = 140
    da = a * seg(t, DED7 - .2, DED7 + .3)
    if da > 0:
        _box(c, 100, y0, 440, h0, GOLD, da, .8)
        text(c, 'Deduction he got', 130, y0 + 48, 26, 700, DIM, da)
        text(c, inr(8000000), 130, y0 + 108, 46, 800, GOLD, da)
    ma = a * seg(t, MINUS7 - .2, MINUS7 + .2)
    text(c, '−', 590, y0 + 90, 64, 800, WHITE, ma, 'c')
    na = a * seg(t, NORMAL7 - .2, NORMAL7 + .3)
    if na > 0:
        _box(c, 640, y0, 460, h0, ACC, na, .8)
        text(c, 'Normal depreciation', 670, y0 + 58, 31, 800, WHITE, na)
        text(c, 'as if 35AD was never claimed', 670, y0 + 100, 23, 700, DIM, na)
    ea = a * seg(t, BECOMES7 - .3, BECOMES7 + .1)
    text(c, '=', 1150, y0 + 90, 64, 800, WHITE, ea, 'c')
    if ea > 0:
        _box(c, 1200, y0, 620, h0, GOLD, ea, .78, glow=win(t, INCOME7, INCOME7 + 1.4, .2, .8))
        text(c, 'Income of year 3', 1230, y0 + 58, 31, 800, GOLD, ea)
        text(c, 'taxed in the year of the move', 1230, y0 + 100, 23, 700, DIM, ea)
        stamp(c, 1690, y0 + 70, 'DEEMED', GOLD, ea, seg(t, INCOME7 - .2, INCOME7 + .6, linr), -10, 34, 'INCOME')

# ---------------------------------------------------------------- n8: below the check card
def _check8(c, t):
    a = seg(t, N8 - .1, N8 + .5)
    if a <= 0: return
    y = 790
    ba = a * seg(t, BOTH8 - .2, BOTH8 + .3)
    if ba > 0:
        chip(c, 700, y, '35AD · 100%', GREEN, ba, 28)
        da = a * seg(t, DEPQ8 - .2, DEPQ8 + .3)
        text(c, '+', 870, y + 14, 44, 800, WHITE, da, 'c')
        chip(c, 1060, y, 'depreciation § 32', ACC, da, 28)
        u = seg(t, NOTH8 - .1, NOTH8 + .4)
        _strike(c, 935, 1185, y, u, da)
        cross(c, 1206, y - 22, da * u, 18)
        qa = da * (1 - seg(t, ACTUAL8 - .3, ACTUAL8))
        text(c, '?', 1250, y + 16, 44, 800, GOLD, qa * (.6 + .4 * math.sin((t - N8) * 5)), 'c')
        na = a * seg(t, ACTUAL8 - .2, NIL8 + .2, back)
        if na > 0: chip(c, 1420, y, 'actual cost = nil', GOLD, na, 28)

# ---------------------------------------------------------------- the chapter
def ch_n(c, t):
    if t < CS - .6 or t > CE + .6: return
    _tiles3(c, t)
    _hook1(c, t)
    _year1(c, t)
    _example4(c, t)
    _setoff5(c, t)
    _trap6(c, t)
    _what7(c, t)
    _check8(c, t)
