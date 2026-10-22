"""Chapter V — Money that comes back (sections 41 and 43CA).
v1 hook: two panels. YEARS AGO: the supplier's ₹35,000 bill (on credit) is stamped DEDUCTED, a "deduction ₹35,000"
   chip, a dashed "payment to supplier · pending" slot. NOW · P.Y. 2025-26: the supplier says "Forget it, you
   needn't pay." to Meera; a gift icon with a "?"
v2 the deduction chip glows; the payment slot turns red ("never paid"); "for nothing?"; the Assessing Officer steps
   in and reels the deduction back across into this year, where it lands as "income ₹35,000"
v3 name: the bill is stamped REMISSION · SEC 41(1) ("trading liability, owed to the supplier"); ₹35,000 rolls into a
   "Business income · P.Y. 2025-26" box, "the year of the waiver"
v4 three panels, each ticked "taxed": Meera writing the liability back herself (a journal line + pen), a closed shop
   (CLOSED sign), a successor in the business
v5 section 41's returning arrows: trading liability waived (41(1)), bad debt recovered (41(4)), research asset sold
   (41(3)) — each boomerangs from "deducted earlier" to "comes back -> income now"; "whatever was deducted and comes
   back is taxed"
v6 thought experiment: a builder's block of flats held as stock; a "₹1 crore" price tag (sold to a friend) and a
   sale deed with stamp duty value ₹1.2 crore
v7 name 43CA: the stamp duty value drops into "Sale price taken for tax", the ₹1 crore tag is struck; chip "unless
   SDV ≤ 110% of the actual price"
v8 example: a value axis ₹0.9–1.3 crore: actual price ₹1 crore, the 110% band to ₹1.1 crore, SDV ₹1.2 crore outside ->
   "sale taken at ₹1.2 crore"; then SDV ₹1.08 crore inside -> "his price of ₹1 crore stands"
v9 a timeline: agreement date (part paid by cheque, a non-cash mode) ... registration date; the stamp value on the
   agreement date is used (tick), the later one is struck
v10 check: below the card, a journal line "Supplier balance written back ₹20,000 · no longer payable"; on the answer
   it is stamped INCOME · 41(1)
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('v')
V1, V2, V3, V4, V5, V6, V7, V8, V9, V10 = (T('v%d' % k) for k in range(1, 11))

# ---------------------------------------------------------------- word times
W1_AGO, W1_DED, W1_35, W1_SUP, W1_NOW, W1_FORGET, W1_GIFT = (
    W('v1', 'ago'), W('v1', 'deducted'), W('v1', 'thirty'), W('v1', 'supplier'), W('v1', 'now'), W('v1', 'forget'),
    W('v1', 'gift'))
W2_DED, W2_NEVER, W2_NOTHING, W2_LAW, W2_BACK = (
    W('v2', 'deduction'), W('v2', 'never'), W('v2', 'nothing'), W('v2', 'law'), W('v2', 'back'))
W3_REM, W3_TRADING, W3_SEC, W3_WAIVED, W3_INCOME, W3_YEAR = (
    W('v3', 'remission'), W('v3', 'trading'), W('v3', 'section'), W('v3', 'waived'), W('v3', 'business'),
    W('v3', 'year'))
W4_WRITES, W4_CLOSED, W4_SUCC, W4_TAXED = W('v4', 'writes'), W('v4', 'even', occ=1), W('v4', 'successor'), W('v4', 'taxed')
W5_SEC, W5_BAD, W5_REC, W5_414, W5_RES, W5_SOLD, W5_413, W5_WHAT, W5_TAXED = (
    W('v5', 'section'), W('v5', 'bad'), W('v5', 'recovered'), W('v5', 'forty', occ=1), W('v5', 'research'),
    W('v5', 'sold'), W('v5', 'forty', occ=2), W('v5', 'whatever'), W('v5', 'taxed'))
W6_BUILDER, W6_STOCK, W6_SELLS, W6_CRORE, W6_STAMP, W6_POINT = (
    W('v6', 'builder'), W('v6', 'stock'), W('v6', 'sells'), W('v6', 'crore'), W('v6', 'stamp'), W('v6', 'point'))
W7_SEC, W7_SDV, W7_TAKEN, W7_UNLESS, W7_110, W7_ACTUAL = (
    W('v7', 'section'), W('v7', 'stamp'), W('v7', 'taken'), W('v7', 'unless'), W('v7', 'hundred'), W('v7', 'actual'))
W8_12, W8_110, W8_1CR, W8_SO, W8_12B, W8_IF, W8_108, W8_HIS, W8_STAND = (
    W('v8', 'one'), W('v8', 'hundred'), W('v8', 'one', occ=2), W('v8', 'so'), W('v8', 'taken'), W('v8', 'if'),
    W('v8', 'zero'), W('v8', 'his'), W('v8', 'stand'))
W9_AGREED, W9_PART, W9_NONCASH, W9_THEN, W9_AGREE, W9_USED = (
    W('v9', 'agreed'), W('v9', 'part'), W('v9', 'non'), W('v9', 'then'), W('v9', 'agreement'), W('v9', 'used'))
W10_WRITES, W10_20 = W('v10', 'writes'), W('v10', 'twenty')
WA_YES, WA_REM = W('v10a', 'yes'), W('v10a', 'remission')

for tt, k in ((W1_AGO, 'flip'), (W1_DED + .25, 'thunk'), (W1_FORGET, 'pop'), (W1_GIFT, 'blip'),
              (W2_NEVER, 'error'), (W2_LAW, 'whoosh'), (W2_BACK + .5, 'tap'),
              (W3_REM + .25, 'thunk'), (W3_INCOME, 'chime'),
              (W4_WRITES + .2, 'tick'), (W4_CLOSED, 'tick'), (W4_SUCC, 'tick'),
              (W5_REC, 'whoosh'), (W5_SOLD, 'whoosh'), (W5_TAXED, 'ok'),
              (W6_CRORE, 'pop'), (W6_POINT, 'pop'),
              (W7_TAKEN, 'snip'), (W8_12B, 'chime_lo'), (W8_STAND, 'ok'),
              (W9_PART, 'pop'), (W9_USED, 'ok'), (WA_YES + .25, 'thunk')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
SEPIA = '#d6b48a'

def _box(c, x, y, w, h, col, a, fill=.8, stroke=.85, glow=0., r=18, dash=False):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .35 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .94 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    p = paint(col, stroke * a, stroke=2.2, cap=False)
    if dash: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _panel(c, x, y, w, h, title, col, a, glow=0.):
    if a <= 0: return
    _box(c, x, y, w, h, col, a, .86, .55, glow)
    text(c, title, x + 28, y + 42, 22, 800, col, a, track=3)

_CURVES = {}
def _curve(pts):
    k = tuple(map(tuple, pts))
    if k not in _CURVES:
        P = catmull(np.array(pts, float), step=5); _CURVES[k] = (P, arclen(P))
    return _CURVES[k]

def _carrow(c, pts, u, col, a, w=4., head=18., dashed=False):
    if a <= 0 or u <= 0: return
    P, L = _curve(pts); s = L[-1] * clamp(u); n = int(np.searchsorted(L, s))
    Q = np.vstack([P[:max(n, 1)], along(P, s)[0][None]])
    p = paint(col, a, stroke=w)
    if dashed: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawPath(poly(Q, False), p)
    (x1, y1), d = along(P, s)
    if u > .15:
        ux, uy = d; bx, by = x1 - ux * head, y1 - uy * head
        hp = skia.Path(); hp.moveTo(x1 + ux * 4, y1 + uy * 4); hp.lineTo(bx - uy * head * .55, by + ux * head * .55)
        hp.lineTo(bx + uy * head * .55, by - ux * head * .55); hp.close(); c.drawPath(hp, paint(col, a))

def _alongp(pts, u):
    P, L = _curve(pts); return along(P, L[-1] * clamp(u))[0]

def _q(c, x, y, a, t, size=60, col=GOLD):
    if a <= 0: return
    text(c, '?', x, y + size * .36, size * (1 + .06 * math.sin(t * 5)), 800, col, a, 'c', shadow=8)

def _pen(c, x, y, a, ang=-35.):
    """A fountain pen, nib at (x, y)."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang)
    c.drawRRect(rrect(-10, -150, 20, 120, 9), paint('#1e293b', a))
    c.drawRRect(rrect(-10, -150, 20, 120, 9), paint('#64748b', a, stroke=1.4))
    c.drawRect(skia.Rect.MakeXYWH(-10, -64, 20, 6), paint(GOLD, a))
    nib = poly(np.array([(-8, -32), (8, -32), (0, 0)])); c.drawPath(nib, paint('#e5e7eb', a))
    c.drawLine(0, -26, 0, -6, paint('#475569', a, stroke=1.2))
    c.restore()

def _deed(c, x, y, w, h, a, value, sub='stamp duty value', col=VIO, glow=0., strike=0., size=44):
    """A cream sale-deed card, top-left (x, y), with a round e-stamp seal and the stamp duty value."""
    if a <= 0: return
    c.drawRRect(rrect(x + 4, y + 10, w, h, 10), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, 10), paint(CREAM, a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, 14), paint(col, .55 * a * glow, stroke=8, blur=10))
    c.drawRRect(rrect(x, y, w, h, 10), paint('#cbbd9c', a, stroke=1.4))
    c.drawRect(skia.Rect.MakeXYWH(x, y, w, 52), paint('#e8dcbf', a))
    ftext(c, 'SALE DEED', x + 22, y + 36, 24, SERIF, INK, a, 'l', 700)
    sx, sy = x + w - 46, y + 26
    c.drawCircle(sx, sy, 20, paint(INKS['vio'], .85 * a, stroke=2.4)); c.drawCircle(sx, sy, 14, paint(INKS['vio'], .5 * a, stroke=1.2))
    text(c, '₹', sx, sy + 7, 18, 800, INKS['vio'], .9 * a, 'c')
    text(c, sub, x + 22, y + 88, 22, 700, '#6b6452', a)
    text(c, value, x + 22, y + 140, size, 800, INK, a)
    if strike > 0: c.drawLine(x + 16, y + 126, lerp(x + 16, x + w - 16, strike), y + 118, paint(RED, .95 * a, stroke=4))

# ---------------------------------------------------------------- S1 (v1, v2): years ago / now
LP = (100, 270, 790, 550)
RP = (950, 270, 870, 550)
DCHIP = (705, 430)                                        # the deduction chip (left panel)
LAND = (1440, 470)                                        # where it lands as income (right panel)
REEL = [DCHIP, (900, 300), (1200, 330), LAND]

def _s1(c, t):
    a = 1 - seg(t, V3 - .35, V3 + .2)
    if a <= 0: return
    la = a * seg(t, W1_AGO - .4, W1_AGO + .2)
    _panel(c, *LP, 'YEARS AGO', SEPIA, la)
    ra = a * seg(t, W1_SUP - .5, W1_SUP)
    _panel(c, *RP, 'NOW · P.Y. 2025-26', ACC, ra)
    # the old bill, deducted
    ba = a * seg(t, W1_AGO - .2, W1_AGO + .3)
    if ba > 0:
        pop = seg(t, W1_AGO - .2, W1_AGO + .4, back)
        bill(c, 330, 480, ba, title='Supplier bill', amt=35000, mode=None, sc=1.1 * (.85 + .15 * pop), ang=-3,
             col=ORANGE, stamp=('DEDUCTED', GREEN, seg(t, W1_DED, W1_DED + 1., linr)))
        text(c, 'raw material bought on credit', 330, 610, 22, 600, DIM, ba, 'c')
    # the deduction chip (it gets reeled across in v2)
    dg = win(t, W2_DED - .2, W2_NEVER, .3, .4)
    ru = seg(t, W2_BACK - .2, W2_BACK + 1.0)
    da = a * seg(t, W1_35 - .2, W1_35 + .3, back)
    if da > 0:
        x, y = _alongp(REEL, ease(ru)) if ru > 0 else DCHIP
        col = mixc(GREEN, GOLD, seg(ru, .6, 1))
        if dg > 0: c.drawCircle(x, y, 120, paint(GREEN, .25 * dg * da, blur=30))
        chip(c, x, y, 'income ₹35,000' if ru > .6 else 'deduction ₹35,000', col, da, 28)
        if ru <= 0:
            text(c, 'claimed that year', DCHIP[0], DCHIP[1] + 52, 22, 600, DIM, da, 'c')
        fa = a * win(t, W2_NOTHING - .2, W2_LAW, .3, .3)
        if fa > 0: text(c, 'for nothing?', DCHIP[0], DCHIP[1] - 46, 28, 800, RED, fa, 'c', shadow=6)
    # the payment slot
    pa = a * seg(t, W1_35 + .4, W1_35 + .9)
    if pa > 0:
        nv = seg(t, W2_NEVER - .1, W2_NEVER + .4)
        x, y, w, h = 140, 660, 710, 120
        _box(c, x, y, w, h, mixc(DIM, RED, nv), pa, .86, .7, dash=True)
        text(c, 'PAYMENT TO THE SUPPLIER', x + 28, y + 42, 20, 800, mixc(DIM, RED, nv), pa, track=2)
        text(c, 'pending', x + 28, y + 90, 32, 800, WHITE, pa * (1 - nv))
        text(c, 'never paid', x + 28, y + 90, 32, 800, RED, pa * nv)
        if nv > 0: cross(c, x + w - 56, y + h / 2, pa * nv, 22)
    # now: the supplier waives it
    sa = a * seg(t, W1_SUP - .3, W1_SUP + .2) * (1 - seg(t, W2_LAW - .5, W2_LAW))
    person(c, 1130, 818, 1.0, sa, 'supplier', t, look=.5, mood=.6)
    oa = a * seg(t, W2_LAW - .3, W2_LAW + .2)
    if oa > 0:
        person(c, 1130 - 40 * (1 - seg(t, W2_LAW - .3, W2_LAW + .3, eout)), 818, 1.0, oa, 'officer', t, look=.4)
        # the reel line from the officer's hand to the chip
        rod = seg(t, W2_LAW, W2_LAW + .4) * (1 - seg(ru, .9, 1))
        if rod > 0:
            c.drawLine(1180, 800, 1310, 600, paint('#94a3b8', oa * rod, stroke=5))
            x, y = _alongp(REEL, ease(ru)) if ru > 0 else DCHIP
            c.drawLine(1310, 600, x, y + 18, paint(DIM, .75 * oa * rod, stroke=2))
        lab(c, 'the law takes it back', 1440, 560, oa * seg(t, W2_BACK, W2_BACK + .5), 28, GOLD, 800)
    ma = a * seg(t, W1_NOW - .3, W1_NOW + .2)
    person(c, 1680, 818, 1.0, ma, 'meera', t, look=-.5, mood=.4 * win(t, W1_FORGET, W2_NEVER, .4, .5))
    bu = seg(t, W1_FORGET - .25, W1_FORGET + .25)
    bubble(c, 1030, 380, 410, 'Forget it, you needn’t pay.', a * (1 - seg(t, W2_DED - .2, W2_DED + .3)), 'bl', u=bu)
    ga = a * seg(t, W1_GIFT - .4, W1_GIFT + .1) * (1 - seg(t, W2_LAW - .5, W2_LAW))
    if ga > 0:
        icon(c, 'gift', 1420, 620, 1.5, GOLD, ga)
        _q(c, 1500, 560, ga, t, 54)

# ---------------------------------------------------------------- S2 (v3–v5): remission, the three cases, section 41
INC = (790, 410, 560, 220)

def _s2(c, t):
    a = seg(t, V3 - .3, V3 + .3) * (1 - seg(t, V4 - .4, V4 + .1))
    if a <= 0: return
    lab(c, 'a trading liability: owed to the supplier', 430, 320, a * seg(t, W3_TRADING - .3, W3_TRADING + .2), 26, DIM, 700)
    bill(c, 430, 500, a, title='Supplier bill', amt=35000, mode=None, sc=1.35, ang=-3, col=ORANGE)
    su = seg(t, W3_REM, W3_REM + 1., linr)
    if su > 0: stamp(c, 470, 560, 'REMISSION', VIO, a, su, -10, 36, sub='SEC 41(1) · WAIVED')
    sa = a * seg(t, W3_SEC - .2, W3_SEC + .3, back)
    if sa > 0: sec(c, 430, 690, '41(1)', sa, VIO, 34, 'c')
    # into business income, the year of the waiver
    ia = a * seg(t, W3_WAIVED - .3, W3_WAIVED + .2)
    if ia > 0:
        x, y, w, h = INC
        g = win(t, W3_INCOME - .1, W3_INCOME + 1.8, .2, .8)
        _box(c, x, y, w, h, GOLD, ia, .84, .85, g)
        text(c, 'BUSINESS INCOME', x + 30, y + 44, 22, 800, GOLD, ia, track=3)
        roll(c, 35000, x + w - 30, y + 128, seg(t, W3_INCOME - .1, W3_INCOME + .8, linr), 56, GOLD, ia, 'r', prefix='+ ₹')
        ya = a * seg(t, W3_YEAR - .3, W3_YEAR + .2)
        text(c, 'in P.Y. 2025-26, the year of the waiver', x + 30, y + 190, 24, 700, DIM, ya)
        _carrow(c, [(600, 470), (690, 450), (x - 12, y + 100)], seg(t, W3_WAIVED - .2, W3_WAIVED + .5), GOLD, ia, 4, 18)
        if ya > 0: icon(c, 'calendar', x + w - 50, y + 46, .55, GOLD, ya)

CASES = [('Written back by her', 'still income', W4_WRITES),
         ('Business already closed', 'still income', W4_CLOSED),
         ('A successor in the business', 'taxed the same way', W4_SUCC)]
CX = [110, 700, 1290]; CW_, CY_, CH_ = 520, 300, 470

def _s3(c, t):
    a = seg(t, V4 - .3, V4 + .3) * (1 - seg(t, V5 - .4, V5 + .1))
    if a <= 0: return
    for k, (ti, su, tt) in enumerate(CASES):
        pa = a * seg(t, tt - .4, tt + .1)
        if pa <= 0: continue
        x = CX[k]; pop = seg(t, tt - .4, tt + .25, back)
        dy = 30 * (1 - pop)
        _panel(c, x, CY_ + dy, CW_, CH_, '0%d' % (k + 1), ACC, pa)
        text(c, ti, x + 28, CY_ + dy + 90, 30, 800, WHITE, pa)
        cxm = x + CW_ / 2
        if k == 0:
            ledger(c, x + 30, CY_ + dy + 130, CW_ - 60, [('Written back', 35000, 'bold')], pa,
                   title='Journal · Supplier A/c', u=seg(t, tt, tt + 1.1))
            ia = pa * seg(t, tt + 1.0, tt + 1.4)
            text(c, 'in her own books', cxm, CY_ + dy + 340, 26, 700, DIM, ia, 'c')
            pu = seg(t, tt - .1, tt + 1.2)
            _pen(c, lerp(x + 70, x + CW_ - 60, pu), CY_ + dy + 222 + 4 * math.sin(t * 20) * (0 < pu < 1), pa * (1 - seg(t, tt + 1.4, tt + 1.8)))
        elif k == 1:
            shop(c, cxm, CY_ + dy + 380, .5, pa, t, lit=0.)
            cl = seg(t, tt + .2, tt + .6, back)
            c.save(); c.translate(cxm + 4, CY_ + dy + 260); c.rotate(-6 + 3 * math.sin(t * 2)); c.scale(cl, cl)
            c.drawRRect(rrect(-78, -26, 156, 52, 10), paint('#7f1d1d', pa)); c.drawRRect(rrect(-78, -26, 156, 52, 10), paint(RED, pa, stroke=2))
            text(c, 'CLOSED', 0, 12, 30, 800, WHITE, pa, 'c', track=3); c.restore()
        else:
            person(c, cxm - 70, CY_ + dy + 390, 1.0, pa, 'rohan', t, look=.3, mood=.2)
            chip(c, cxm + 120, CY_ + dy + 230, 'takes over', VIO, pa, 24)
            text(c, 'the business', cxm + 120, CY_ + dy + 190, 22, 700, DIM, pa, 'c')
            _carrow(c, [(cxm + 120, CY_ + dy + 260), (cxm + 90, CY_ + dy + 300), (cxm + 30, CY_ + dy + 320)], seg(t, tt + .2, tt + .8), VIO, pa, 3, 14)
        ta = a * seg(t, tt + .7, tt + 1.1, back)
        if ta > 0:
            chip(c, cxm - 26, CY_ + CH_ - 44, su, GREEN, ta, 26)
            tick(c, x + CW_ - 46, CY_ + 44, ta, 20)

ROWS = [('doc', 'Trading liability', 'expense deducted', 'waived or written back', '41(1)', None, None, None),
        ('coins', 'Bad debt', 'written off, deducted', 'recovered later', '41(4)', W5_BAD, W5_REC, W5_414),
        ('flask', 'Research asset', 'cost deducted under 35', 'sold', '41(3)', W5_RES, W5_SOLD, W5_413)]
RY = [310, 456, 602]; LX0, LW = 110, 560; RX0, RW = 1250, 560; RH = 116

def _s4(c, t):
    a = seg(t, V5 - .3, V5 + .3) * (1 - seg(t, V6 - .45, V6 + .05))
    if a <= 0: return
    text(c, 'DEDUCTED EARLIER', LX0, 300, 22, 800, DIM, a, track=3)
    text(c, 'COMES BACK · TAXED NOW', RX0, 300, 22, 800, GOLD, a, track=3)
    allg = win(t, W5_WHAT - .2, V6, .4, .4)
    for k, (ic, ti, su, back_, sc_, t0, t1, t2) in enumerate(ROWS):
        if t0 is None: t0, t1, t2 = W5_SEC - .2, W5_SEC + .3, W5_SEC + .6
        y = RY[k] + 22
        la = a * seg(t, t0 - .3, t0 + .2)
        if la > 0:
            _box(c, LX0, y, LW, RH, ACC, la, .84, .6)
            icon(c, ic, LX0 + 62, y + RH / 2, .85, shade(ACC, .25), la)
            text(c, ti, LX0 + 118, y + 50, 30, 800, WHITE, la)
            text(c, su, LX0 + 118, y + 86, 23, 600, DIM, la)
        au = seg(t, t1 - .4, t1 + .4)
        if au > 0:
            pts = [(LX0 + LW + 10, y + RH / 2), (960, y - 40), (RX0 - 14, y + RH / 2)]
            _carrow(c, pts, au, GOLD, a, 4, 18)
            if 0 < au < 1:
                px, py = _alongp(pts, au); coin(c, px, py, 16, a, GOLD)
        ra = a * seg(t, t1 - .1, t1 + .3)
        if ra > 0:
            g = max(win(t, t1, t1 + 1.4, .2, .6), allg)
            _box(c, RX0, y, RW, RH, GOLD, ra, .84, .8, g)
            text(c, back_, RX0 + 30, y + 50, 30, 800, WHITE, ra)
            text(c, '→ taxed as business income', RX0 + 30, y + 86, 23, 700, GOLD, ra)
            sec(c, RX0 + RW - 30, y + 50, sc_, a * seg(t, t2 - .2, t2 + .3), VIO, 24, 'r')
    ba = a * seg(t, W5_WHAT - .2, W5_WHAT + .4)
    if ba > 0:
        text(c, 'whatever was deducted and comes back is taxed', 960, 812, 34, 800, GOLD, ba, 'c', shadow=8)

# ---------------------------------------------------------------- S3 (v6–v8): the builder, 43CA
TAG = (650, 400)
DEED = (960, 300, 360, 180)
AX0, AX1, V0, V1_ = 560, 1760, .9, 1.3                       # value axis (crore)
def _vx(v): return AX0 + (v - V0) / (V1_ - V0) * (AX1 - AX0)
AY = 700

def _pin(c, v, label, col, a, up=True, lvl=0, size=26, glow=0.):
    if a <= 0: return
    x = _vx(v); y1 = AY - 18
    yt = AY - 70 - 52 * lvl if up else AY + 70
    c.drawLine(x, AY - 14, x, yt + (16 if up else -16), paint(col, .95 * a, stroke=3))
    c.drawCircle(x, AY, 9, paint(WHITE, a)); c.drawCircle(x, AY, 14, paint(col, .5 * a, blur=4))
    if glow > 0: c.drawCircle(x, AY, 34, paint(col, .5 * a * glow, stroke=4, blur=4))
    chip(c, x, yt, label, col, a, size)

def _s5(c, t):
    a = seg(t, V6 - .3, V6 + .3) * (1 - seg(t, V9 - .45, V9 + .05))
    if a <= 0: return
    # the builder's flats, held as stock
    fa = a * seg(t, V6 + .1, V6 + .6)
    flats(c, 260, 640, .66, fa, 6, t)
    if fa > 0:
        text(c, 'Builder', 260, 690, 30, 800, WHITE, fa, 'c')
        chip(c, 260, 740, 'flats = his stock-in-trade', ORANGE, a * seg(t, W6_STOCK - .3, W6_STOCK + .2), 24)
    # v6: the sale at ₹1 crore and the stamp duty value
    s1 = 1 - seg(t, V8 - .4, V8 + .1)                         # the sale row gives way to the axis in v8
    pu = seg(t, W6_SELLS - .2, W6_CRORE + .2)
    if pu > 0:
        x = lerp(330, TAG[0], eout(pu)); y = lerp(480, TAG[1], eout(pu))
        st = seg(t, W7_TAKEN + .1, W7_TAKEN + .6)
        price_tag(c, x, y, '₹1 crore', GOLD, a * pu * (1 - .45 * st) * s1, 36)
        lab(c, 'price agreed with a friend', TAG[0], TAG[1] + 66, a * seg(t, W6_SELLS, W6_SELLS + .5) * s1, 24, DIM, 600)
        if st > 0: c.drawLine(TAG[0] - 100, TAG[1] + 6, lerp(TAG[0] - 100, TAG[0] + 110, st), TAG[1] - 6, paint(RED, a * s1, stroke=4))
    da = a * seg(t, W6_STAMP - .3, W6_STAMP + .2) * s1
    if da > 0:
        x, y, w, h = DEED
        _deed(c, x, y, w, h, da, '₹1.2 crore' if t > W6_POINT - .1 else '₹ …', glow=win(t, W6_POINT, W6_POINT + 1.5, .2, .6))
    # v7: the SDV becomes the sale price for tax
    ka = a * seg(t, W7_SDV - .4, W7_SDV) * s1
    if ka > 0:
        x, y, w, h = 560, 560, 760, 150
        g = win(t, W7_TAKEN + .2, W7_TAKEN + 2, .2, .6)
        _box(c, x, y, w, h, VIO, ka, .84, .8, g)
        text(c, 'SALE PRICE TAKEN FOR TAX', x + 30, y + 44, 22, 800, VIO, ka, track=3)
        sec(c, x + w - 30, y + 38, '43CA', ka * seg(t, W7_SEC - .2, W7_SEC + .3), VIO, 24, 'r')
        du = seg(t, W7_TAKEN - .3, W7_TAKEN + .4)
        if du > 0:
            yy = lerp(DEED[1] + 140, y + 116, eout(du))
            xx = lerp(DEED[0] + 22, x + 30, eout(du))
            text(c, '₹1.2 crore', xx, yy, 48, 800, WHITE if du < 1 else GOLD, ka, shadow=6)
            text(c, 'the stamp duty value', x + 330, y + 112, 26, 700, DIM, ka * seg(du, .8, 1))
        ua = a * seg(t, W7_UNLESS - .2, W7_UNLESS + .3, back) * s1
        if ua > 0: chip(c, x + w / 2, y + h + 56, 'unless the SDV is within 110% of the actual price', GOLD, ua, 26)
    # v8: the value axis
    xa = a * seg(t, V8 - .3, V8 + .3)
    if xa > 0:
        text(c, 'VALUE OF THE FLAT', AX0, 470, 22, 800, DIM, xa, track=3)
        c.drawLine(AX0 - 10, AY, AX1 + 20, AY, paint(WHITE, .5 * xa, stroke=3))
        for k in range(9):
            v = V0 + .05 * k; x = _vx(v)
            c.drawLine(x, AY - 8, x, AY + 8, paint(WHITE, .5 * xa, stroke=2))
            if k % 2 == 0: text(c, '₹%.1f cr' % v, x, AY + 44, 22, 700, DIM, xa, 'c')
        # the 110% band
        bu = seg(t, W8_110 - .3, W8_110 + .7)
        if bu > 0:
            x0, x1 = _vx(1.0), _vx(1.0 + .1 * bu)
            c.drawRect(skia.Rect(x0, AY - 26, x1, AY + 26), paint(GREEN, .2 * xa))
            c.drawLine(x0, AY - 26, x1, AY - 26, paint(GREEN, .9 * xa, stroke=2)); c.drawLine(x0, AY + 26, x1, AY + 26, paint(GREEN, .9 * xa, stroke=2))
            c.drawLine(x1, AY - 34, x1, AY + 26, paint(GREEN, xa, stroke=3))
            text(c, 'up to 110% · ₹1.1 cr', (x0 + _vx(1.1)) / 2, AY + 84, 24, 800, GREEN, xa * seg(bu, .6, 1), 'c')
        _pin(c, 1.0, 'actual price ₹1 crore', GOLD, xa * seg(t, W8_1CR - .3, W8_1CR + .2), lvl=1)
        o2 = seg(t, W8_IF - .3, W8_IF + .3)
        _pin(c, 1.2, 'SDV ₹1.2 crore', VIO, xa * seg(t, V8 - .1, V8 + .4) * (1 - .6 * o2), lvl=0, glow=win(t, W8_12B - .2, W8_12B + 1.5, .2, .6))
        ra = xa * seg(t, W8_SO - .2, W8_SO + .3) * (1 - o2)
        if ra > 0:
            chip(c, 1500, 560, 'outside → sale taken at ₹1.2 crore', VIO, ra, 28)
        _pin(c, 1.08, 'SDV ₹1.08 crore', GREEN, xa * seg(t, W8_108 - .4, W8_108 + .1), lvl=0, glow=win(t, W8_108, W8_108 + 1.5, .2, .6))
        sa = xa * seg(t, W8_HIS - .2, W8_HIS + .3, back)
        if sa > 0:
            chip(c, 1500, 560, 'inside → his ₹1 crore stands', GREEN, sa, 28)
            tick(c, _vx(1.0), AY - 196, sa, 20)

# ---------------------------------------------------------------- S4 (v9): the agreement date
XA, XR, LY = 520, 1460, 520

def _s6(c, t):
    a = seg(t, V9 - .3, V9 + .3) * (1 - seg(t, V10 - .4, V10 + .1))
    if a <= 0: return
    c.drawLine(300, LY, 1700, LY, paint(WHITE, .45 * a, stroke=3))
    _carrow(c, [(1640, LY), (1720, LY)], 1, WHITE, .45 * a, 3, 16)
    text(c, 'time', 1720, LY + 44, 22, 700, DIM, a, 'c')
    # agreement date
    ga = a * seg(t, W9_AGREED - .3, W9_AGREED + .2, back)
    if ga > 0:
        c.drawCircle(XA, LY, 14, paint(GOLD, ga)); c.drawCircle(XA, LY, 26, paint(GOLD, .4 * ga, blur=6))
        text(c, 'AGREEMENT DATE', XA, LY + 56, 24, 800, GOLD, ga, 'c', track=2)
        text(c, 'price fixed earlier', XA, LY + 90, 22, 600, DIM, ga, 'c')
        icon(c, 'doc', XA - 210, LY - 70, 1.0, GOLD, ga)
    # registration date
    ra = a * seg(t, W9_AGREED + .3, W9_AGREED + .8)
    if ra > 0:
        c.drawCircle(XR, LY, 14, paint(DIM, ra))
        text(c, 'REGISTRATION DATE', XR, LY + 56, 24, 800, DIM, ra, 'c', track=2)
        text(c, 'sale deed registered', XR, LY + 90, 22, 600, DIM, ra, 'c')
        icon(c, 'building', XR, LY - 70, 1.0, DIM, ra)
    # part paid by a non-cash mode, on or before the agreement date
    pu = seg(t, W9_PART - .3, W9_PART + .4)
    if pu > 0:
        tile(c, XA - 120, lerp(190, 230, eout(pu)), 240, 170, 'cheque', 'part payment', a * pu, GREEN)
        chip(c, XA + 330, 300, 'non-cash mode, by that date', GREEN, a * seg(t, W9_NONCASH - .2, W9_NONCASH + .3), 26)
    # which stamp duty value?
    sa = a * seg(t, W9_THEN - .3, W9_THEN + .2)
    if sa > 0:
        pk = seg(t, W9_AGREE - .2, W9_AGREE + .5)
        _deed(c, XA - 200, 650, 400, 170, sa, 'on this date', 'stamp duty value', size=38, glow=win(t, W9_USED - .2, V10, .3, .3) + .6 * pk)
        _deed(c, XR - 200, 650, 400, 170, sa * (1 - .4 * pk), 'on this date', 'stamp duty value', size=38, strike=seg(t, W9_USED - .2, W9_USED + .4))
        if pk > 0:
            tick(c, XA + 230, 660, sa * seg(t, W9_USED - .2, W9_USED + .2), 22)
            text(c, 'used', XA + 266, 668, 26, 800, GREEN, sa * seg(t, W9_USED - .2, W9_USED + .2))

# ---------------------------------------------------------------- S5 (v10 check): below the card
def _s7(c, t):
    a = seg(t, V10 - .2, V10 + .4)
    if a <= 0: return
    ys, (x, y, w, h) = ledger(c, 560, 740, 800, [('Supplier balance written back', 20000, 'bold')],
                              a * seg(t, W10_WRITES - .3, W10_WRITES + .2), title='Journal · no longer payable',
                              u=seg(t, W10_20 - .3, W10_20 + .3))
    su = seg(t, WA_YES, WA_YES + 1., linr)
    if su > 0: stamp(c, 1480, 806, 'INCOME', GREEN, a, su, -10, 34, sub='SEC 41(1)')

def ch_v(c, t):
    if t < CS - .5 or t > CE + .5: return
    if t < V3 + .3: _s1(c, t)
    if V3 - .4 < t < V4 + .2: _s2(c, t)
    if V4 - .4 < t < V5 + .2: _s3(c, t)
    if V5 - .4 < t < V6 + .1: _s4(c, t)
    if V6 - .4 < t < V9 + .1: _s5(c, t)
    if V9 - .4 < t < V10 + .2: _s6(c, t)
    if t > V10 - .3: _s7(c, t)
