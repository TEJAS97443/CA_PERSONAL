"""Chapter S — Paying the partners (section 40(b)), a hero chapter.
s1 hook: Meera's Bakehouse with Meera at the side; Rohan walks in and the sign turns into "Meera & Rohan Bakers"
   ("now a partnership firm"); two salary slips fly from the firm to the partners; "deductible for the firm?" asks
s2 the shop becomes the firm's profit pool between the partners ("firm = Meera + Rohan · the same people"); two salary
   pipes open and drain every rupee into the partners' buckets; "left to tax: ₹0" (red)
s3 name: § 40(b) "allows it, within limits": a partner's salary slip rides a belt through scanner gates lit as spoken
   (working partner · in the deed · after the deed date) and waits, gold, at the fourth (within the limit); a
   sleeping partner's slip bounces off gate 1
s4 interest on a partner's capital: a dial sweeps to 12% (simple interest, allowed, green) and is pushed to 15%; the
   part above 12% turns red, DISALLOWED
s5 book profit: the firm's net profit bar (worked out under the tax rules, ss. 28–44D) gets the partners' salary
   added back -> one gold "Book profit" bar
s6 formula: the bar splits at the first ₹6 lakh; a 90% step ("₹3 lakh or 90%, whichever is higher", also on a loss)
   rises over it and a lower 60% step over the rest
s7 example: a computation sheet builds — ₹17,00,000 − depreciation ₹1,50,000 − interest 12% × ₹5,00,000 = ₹60,000
   -> book profit ₹14,90,000; beside it the profit bar is cut slice by slice and an interest bar shows 15% paid
   (₹75,000) with only 12% (₹60,000) allowed
s8 the limit rows: 90% × ₹6,00,000 = ₹5,40,000 + 60% × ₹8,90,000 = ₹5,34,000 -> limit ₹10,74,000; the book-profit
   bar splits ₹6,00,000 | ₹8,90,000 and the two steps rise with their amounts, flying up into the limit
s9 a 2 × 12 grid of ₹40,000 monthly slips (Meera, Rohan) pours into a ₹9,60,000 bar inside the ₹10,74,000 limit
   line -> ALLOWED in full
s10 Rohan's side: from the firm, salary and interest fly into "Rohan's business income · § 28(v)"; his share of the
   profit into "exempt · § 10(2A)"
s11 what if a loss: the book-profit bar dips below zero (red) but a ₹3,00,000 salary column for the working partners
   (in all) still stands, deductible
s12 check: below the card, the partnership deed ("salary from 1 April", signed 1 July) over a 12-month strip; the
   answer greys April–June ("before the deed") and turns July–March green
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('s')
S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 = (T('s%d' % i) for i in range(1, 13))
S12A = TA('s12')

def _wa(i, n, occ=0):
    """Word time in a check's answer cue (falls back to the answer start)."""
    try: return Wd(i, n, occ)
    except Exception: return TA(i[:-1])

# ---------------------------------------------------------------- word times (all checked against cues.json)
ROHAN1, BECOMES1, FIRM1, PAYS1, SALARY1, OWN1, DEDUCT1 = (
    W('s1', 'rohan'), W('s1', 'becomes'), W('s1', 'firm'), W('s1', 'pays'), W('s1', 'salary'), W('s1', 'own'),
    W('s1', 'deduct'))
SAME2, PAY2, DRAIN2, OUT2, NOTH2 = W('s2', 'same'), W('s2', 'pay'), W('s2', 'drain'), W('s2', 'out'), W('s2', 'nothing')
SEC3, ALLOWS3, WITHIN3, SAL3, WORK3, WRIT3, DEED3, AFTER3, DEED3B = (
    W('s3', 'section'), W('s3', 'allows'), W('s3', 'within'), W('s3', 'salary'), W('s3', 'working'),
    W('s3', 'written'), W('s3', 'deed'), W('s3', 'after'), W('s3', 'deed', occ=1))
INT4, TWELVE4, SIMPLE4, MORE4, DIS4 = (W('s4', 'interest'), W('s4', 'twelve'), W('s4', 'simple'),
                                       W('s4', 'anything'), W('s4', 'disallowed'))
BOOK5, NET5, RULES5, BEFORE5, SAL5 = W('s5', 'book'), W('s5', 'net'), W('s5', 'worked'), W('s5', 'before'), W('s5', 'salary')
LIMIT6, FIRST6, SIX6, LOSS6, THREE6, NINETY6, HIGHER6, REST6, SIXTY6 = (
    W('s6', 'limit'), W('s6', 'first'), W('s6', 'six'), W('s6', 'loss'), W('s6', 'three'), W('s6', 'ninety'),
    W('s6', 'higher'), W('s6', 'rest'), W('s6', 'sixty'))
SEVENTEEN7, DEP7, INTR7, FIFTEEN7, SEVENTY7, ONLY7, SIXTY7, ALLOWED7, FOURTEEN7 = (
    W('s7', 'seventeen'), W('s7', 'one'), W('s7', 'interest', occ=1), W('s7', 'fifteen'), W('s7', 'seventy'),
    W('s7', 'only'), W('s7', 'sixty'), W('s7', 'allowed'), W('s7', 'fourteen'))
LIMIT8, NINETY8, SIX8, FIVE8, SIXTY8, EIGHT8, FIVE8B, TOTAL8, TEN8 = (
    W('s8', 'limit'), W('s8', 'ninety'), W('s8', 'six'), W('s8', 'five'), W('s8', 'sixty'), W('s8', 'eight'),
    W('s8', 'five', occ=1), W('s8', 'total'), W('s8', 'ten'))
FORTY9, MONTH9, NINE9, INSIDE9, ALLOWED9 = (W('s9', 'forty'), W('s9', 'month'), W('s9', 'nine'), W('s9', 'inside'),
                                           W('s9', 'allowed'))
OTHER10, ROHAN10, SAL10, INT10, DEDUCT10, BUS10, SHARE10, EXEMPT10 = (
    W('s10', 'other'), W('s10', 'rohan'), W('s10', 'salary'), W('s10', 'interest'), W('s10', 'deduct'),
    W('s10', 'business'), W('s10', 'share'), W('s10', 'exempt'))
LOSS11, WORK11, THREE11, ALL11, DEDUCT11 = (W('s11', 'loss'), W('s11', 'working'), W('s11', 'three'), W('s11', 'all'),
                                            W('s11', 'deduct'))
DEED12, APRIL12, SIGNED12, JULY12 = W('s12', 'deed'), W('s12', 'april'), W('s12', 'signed'), W('s12', 'july')
A_JULY, A_BEFORE = _wa('s12a', 'july'), _wa('s12a', 'before')

for tt, k in ((ROHAN1 - .3, 'whoosh'), (FIRM1, 'flip'), (SALARY1, 'whoosh'), (DEDUCT1 + .2, 'blip'),
              (PAY2, 'tap'), (NOTH2, 'warn'),
              (SEC3, 'pop'), (WORK3 + .45, 'ok'), (DEED3 + .45, 'ok'), (DEED3B + .5, 'ok'),
              (TWELVE4, 'tick'), (DIS4, 'error'),
              (BEFORE5 + .1, 'pop'), (SIX6, 'tick'), (SIXTY6, 'pop'),
              (SIXTY7 + .45, 'snip'), (FOURTEEN7, 'chime_lo'), (TEN8, 'chime'),
              (ALLOWED9 + .1, 'thunk'),
              (BUS10, 'pop'), (EXEMPT10, 'chime_lo'),
              (THREE11, 'pop'), (DEDUCT11, 'ok'),
              (JULY12, 'tap'), (A_JULY, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.78, glow=0., r=16, stroke=.85):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .96 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=7, blur=9))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, stroke * a, stroke=2.2))

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l', glow=0.):
    return ftext(c, s, x, y, size, MONO, col, a, align, 700, glow)

def _slip(c, x, ybot, a, title, sub, col=GOLD, sc=1., ang=0., q=None):
    """A cream salary slip, bottom-centre (x, ybot); q = '?' badge alpha."""
    if a <= 0: return
    w, h = 252 * sc, 112 * sc
    c.save(); c.translate(x, ybot - h / 2)
    if ang: c.rotate(ang)
    c.drawRRect(rrect(-w / 2 + 3, -h / 2 + 8, w, h, 10 * sc), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 10 * sc), paint(CREAM, a))
    c.drawRRect(rrect(-w / 2, -h / 2, 8 * sc, h, 4 * sc), paint(col, a))
    icon(c, 'salary', -w / 2 + 40 * sc, -2 * sc, .6 * sc, INK, a, 3.6)
    text(c, title, -w / 2 + 72 * sc, -8 * sc, 28 * sc, 800, INK, a)
    if sub: text(c, sub, -w / 2 + 72 * sc, 26 * sc, 22 * sc, 700, '#5b5446', a)
    if q:
        c.drawCircle(w / 2 - 6, -h / 2 + 4, 20, paint(GOLD, q * a))
        text(c, '?', w / 2 - 6, -h / 2 + 14, 28, 800, '#1a1305', q * a, 'c')
    c.restore()

def _stream(c, x0, y0, x1, y1, u, col, t, wd=13.):
    """A falling stream from a tap at (x0, y0) to (x1, y1); u 0..1 its strength."""
    if u <= 0: return
    q = np.linspace(0, 1, 25); P = np.stack([x0 + (x1 - x0) * q, y0 + (y1 - y0) * q ** 2], 1)
    sw = wd * clamp(u)
    c.drawPath(poly(P, False), paint(shade(col, .15), .6 * u, stroke=sw, cap=False))
    c.drawPath(poly(P, False), paint(shade(col, .55), .55 * u, stroke=sw * .4, cap=False))
    dp = paint(WHITE, .5 * u, stroke=sw * .22, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([6, 22], -(t * 300) % 28))
    c.drawPath(poly(P, False), dp)

def _tap(c, x, y, sgn, a):
    """A short spout on the side of the pool (sgn -1 left, +1 right) at (x, y)."""
    if a <= 0: return
    x0 = x if sgn > 0 else x - 56
    c.drawRRect(rrect(x0 - (6 if sgn > 0 else -6), y - 9, 56, 18, 6), paint('#6b7896', a))
    xs = x + sgn * 42
    c.drawRRect(rrect(xs - 8, y - 9, 16, 30, 5), paint('#56637f', a))
    c.drawLine(x + sgn * 22, y - 9, x + sgn * 22, y - 26, paint('#8b97b0', a, stroke=4))
    c.drawLine(x + sgn * 10, y - 26, x + sgn * 34, y - 26, paint('#c3cad8', a, stroke=5))

def _dash_rr(c, x, y, w, h, r, col, a, wd=2.2):
    if a <= 0: return
    p = paint(col, a, stroke=wd, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

# ---------------------------------------------------------------- s1 + s2: the firm, then the profit pool
SHOP_X, SHOP_Y, SHOP_S = 960, 760, .74
SIGN_R = (SHOP_X - 232 * SHOP_S, SHOP_Y - 432 * SHOP_S, 464 * SHOP_S, 72 * SHOP_S)
TK_X, TK_Y, TK_W, TK_H = 770, 318, 380, 300
BK_X, BK_Y = (596, 1324), 664
PA0, PA1 = CS, S3 - .25

def _partners_xy(t):
    u = seg(t, S2 - .2, S2 + .9)
    mx = lerp(500, 330, u)
    rx = lerp(2050, 1420, seg(t, ROHAN1 - .55, ROHAN1 + .55, eout)) if t < S2 - .2 else lerp(1420, 1590, u)
    return mx, rx

def _firm(c, t):
    a = win(t, PA0 - 1, PA1, .1, .5)
    if a <= 0: return
    mx, rx = _partners_xy(t)
    # --- the shop (s1), whose sign turns into the firm's
    sa = a * (1 - seg(t, S2 - .15, S2 + .55))
    if sa > 0:
        k = lerp(1, .9, seg(t, S2 - .15, S2 + .55))
        sw = seg(t, BECOMES1 - .1, FIRM1 + .25)
        if sw < 1: shop(c, SHOP_X, SHOP_Y, SHOP_S * k, sa, t, "Meera's Bakehouse", 1.)
        if sw > 0:
            shop(c, SHOP_X, SHOP_Y, SHOP_S * k, sa * sw, t, 'Meera & Rohan Bakers', 1.)
        g = seg(t, FIRM1 - .2, FIRM1 + .7, linr)
        if 0 < g < 1 and k > .999:                                       # a glint over the new sign
            x, y, w, h = SIGN_R; gx = lerp(x - 60, x + w + 60, g)
            c.save(); c.clipRect(skia.Rect.MakeXYWH(x, y, w, h), True)
            c.drawRect(skia.Rect(gx - 26, y, gx + 26, y + h), paint(WHITE, .35 * sa * math.sin(math.pi * g), blur=10))
            c.restore()
        ca = sa * seg(t, FIRM1 + .1, FIRM1 + .5, back)
        chip(c, SHOP_X, 806, 'now a partnership firm', ACC, ca, 26)
        # salary slips fly to both partners
        for k_, (tx, ang) in enumerate(((mx + 20, -5), (rx - 20, 5))):
            u = seg(t, SALARY1 - .35 + .12 * k_, SALARY1 + .45 + .12 * k_, ease)
            if u <= 0: continue
            x = lerp(SHOP_X + (-40 if k_ == 0 else 40), tx, u); y = lerp(660, 514, u) - 120 * math.sin(math.pi * u)
            q = seg(t, DEDUCT1 - .2, DEDUCT1 + .2, back) * (.75 + .25 * math.sin((t - DEDUCT1) * 6))
            _slip(c, x, y, sa * seg(u, 0, .15), 'Salary', 'from the firm', GOLD, 1., ang * u, q if t > DEDUCT1 - .2 else 0)
        qa = sa * seg(t, OWN1 - .3, OWN1 + .2)
        if qa > 0:
            chip(c, SHOP_X, 368, 'salary to its own partners: deductible?', GOLD, qa, 28)
    # --- the partners
    person(c, mx, 790 if t > S2 else 760, 1., a, 'meera', t, talk=0., look=.35, mood=.3)
    if t > ROHAN1 - .6:
        person(c, rx, 790 if t > S2 else 760, 1., a * seg(t, ROHAN1 - .6, ROHAN1 - .2), 'rohan', t, look=-.35, mood=.3)
    # --- s2: the profit pool
    pa = a * seg(t, S2 + .05, S2 + .75)
    if pa <= 0: return
    drained = seg(t, PAY2, DRAIN2 - .25) * .18 + seg(t, DRAIN2 - .25, OUT2 + .7, ease) * .82
    lvl = .86 * (1 - drained)
    flow = seg(t, PAY2 - .15, PAY2 + .35) * (1 - seg(t, OUT2 + .6, OUT2 + 1.)) * pa
    # buckets + streams
    ty = TK_Y + TK_H - 36
    for sg, bx, who in ((-1, BK_X[0], "Meera's salary"), (1, BK_X[1], "Rohan's salary")):
        ba = pa * seg(t, PAY2 - .3, PAY2 + .2)
        bucket(c, bx, BK_Y, ba, .82 * drained, who, GOLD, None, None, t, 170, 106)
        tx = TK_X if sg < 0 else TK_X + TK_W
        _stream(c, tx + sg * 42, ty + 21, bx - sg * 20, BK_Y + 14, flow, GOLD, t)
    tank(c, TK_X, TK_Y, TK_W, TK_H, pa, t, lvl, 1., "Firm's profit", None, GOLD)
    _tap(c, TK_X, ty, -1, pa * seg(t, PAY2 - .3, PAY2 + .2))
    _tap(c, TK_X + TK_W, ty, 1, pa * seg(t, PAY2 - .3, PAY2 + .2))
    # "the same people"
    ra = pa * win(t, SAME2 - .35, PAY2 + .5, .4, .5)
    if ra > 0:
        _dash_rr(c, 196, 280, 1528, 530, 30, ACC, .8 * ra)
        chip(c, 960, 280, 'firm = Meera + Rohan · the same people', ACC, ra, 26, fill=.9)
    na = pa * seg(t, NOTH2 - .3, NOTH2 + .2)
    if na > 0:
        k = seg(t, NOTH2 - .3, NOTH2 + .3, back)
        c.drawRRect(rrect(960 - 200, 244, 400, 52, 26), paint('#2a0a0a', .9 * na))
        c.drawRRect(rrect(960 - 200, 244, 400, 52, 26), paint(RED, .9 * na, stroke=2))
        text(c, 'left to tax', 960 - 178, 279, 26, 700, WHITE, na)
        _mono(c, '₹0', 960 + 170, 282, 34 * (.8 + .2 * k), RED, na, 'r', glow=4)

# ---------------------------------------------------------------- s3: four gates for the salary
BELT_Y = 700
GX = (470, 830, 1190, 1550)
GATES = (('working partner', 'not a sleeping partner', WORK3),
         ('in the deed', 'authorised in writing', WRIT3),
         ('after the deed', 'not for earlier months', AFTER3),
         ('within the limit', 'worked out on book profit', WITHIN3))
PB0, PB1 = S3 - .4, S4 - .1

def _slip_x(t):
    """Where the working partner's salary slip is on the belt (it hops gate to gate as each is named)."""
    x = 190
    x = lerp(x, 660, seg(t, WORK3 - .1, WORK3 + .8))
    x = lerp(x, 1010, seg(t, WRIT3 + .1, DEED3 + .6))
    x = lerp(x, 1370, seg(t, AFTER3 - .05, DEED3B + .6))
    return x

def _gates(c, t):
    a = win(t, PB0, PB1, .45, .45)
    if a <= 0: return
    ca = a * seg(t, SEC3 - .25, SEC3 + .25, back)
    if ca > 0:
        w = sec(c, 300, 316, '40(b)', ca, size=34)
        text(c, 'allows salary to partners,', 300 + w + 24, 308, 30, 800, WHITE, a * seg(t, ALLOWS3 - .2, ALLOWS3 + .2))
        text(c, 'within limits', 300 + w + 24, 346, 30, 800, GOLD, a * seg(t, WITHIN3 - .2, WITHIN3 + .2))
    sx = _slip_x(t)
    conveyor(c, 110, 1810, BELT_Y, a, sx, 1.)
    states = []
    for k, (ttl, sub, tw) in enumerate(GATES):
        ga = a * seg(t, WITHIN3 + .12 * k - .1, WITHIN3 + .12 * k + .3)
        passed = seg(t, tw + .35, tw + .6) if k < 3 else 0.
        hl = win(t, tw - .2, tw + 1.4, .2, .5) if k < 3 else 0.
        st = passed if k < 3 else 0.
        states.append((ga, st, hl))
        scanner_back(c, GX[k], BELT_Y, ga, ttl, st, t + k, 250, 232)
    # the sleeping partner's slip: reaches gate 1 and is bounced
    if WORK3 - .3 < t < WRIT3 + .8:
        u = seg(t, WORK3 - .3, WORK3 + .6); ub = seg(t, WORK3 + .6, WORK3 + 1.4, eout)
        x = lerp(140, 330, u) - 160 * ub; y = BELT_Y - 60 * math.sin(math.pi * ub) * (ub < 1)
        _slip(c, x, y, a * (1 - seg(t, WRIT3, WRIT3 + .8)) * seg(t, WORK3 - .3, WORK3), 'Salary', 'sleeping partner',
              '#94a3b8', 1., -10 * ub)
    if t > SAL3 - .3:
        _slip(c, sx, BELT_Y, a * seg(t, SAL3 - .3, SAL3 + .1), 'Salary', 'working partner', GOLD, 1.)
    for k, (ttl, sub, tw) in enumerate(GATES):
        ga, st, hl = states[k]
        if ga <= 0: continue
        state = st
        if k == 0 and WORK3 + .5 < t < WORK3 + 1.6: state = -win(t, WORK3 + .5, WORK3 + 1.6, .15, .4)
        scanner_front(c, GX[k], BELT_Y, ga, ttl, state if k < 3 else 0, t + k, 250, 232)
        col = GREEN if st > .5 else GOLD if k == 3 else ACC
        text(c, sub, GX[k], BELT_Y - 270, 22, 700, col, ga * (.8 + .2 * hl), 'c')
        if k < 3 and st > 0: tick(c, GX[k] + 150, BELT_Y - 222, ga * st, 17)
    if t > DEED3B + .6:                                                  # waits, gold, at the limit gate
        qa = a * seg(t, DEED3B + .6, DEED3B + 1.)
        pu = .5 + .5 * math.sin((t - DEED3B) * 4)
        c.drawCircle(GX[3], BELT_Y - 110, 40 + 6 * pu, paint(GOLD, .22 * qa, blur=12))
        text(c, '?', GX[3], BELT_Y - 92, 56, 800, GOLD, qa * (.7 + .3 * pu), 'c')

# ---------------------------------------------------------------- s4: interest on capital, capped at 12%
PC0, PC1 = S4 - .4, S5 - .1
GZ = (680, 650, 240)

def _interest(c, t):
    a = win(t, PC0, PC1, .45, .45)
    if a <= 0: return
    v = .12 * seg(t, INT4 + .3, TWELVE4 + .25, ease) + .03 * seg(t, MORE4 - .1, MORE4 + .7, ease)
    x, y, r = GZ
    gauge(c, x, y, r, a, v, 0., .2, [(0., '0%'), (.05, '5%'), (.1, '10%'), (.12, '12%'), (.15, '15%'), (.2, '20%')],
          '', .12, None, [(0., .12, GREEN)], GREEN)
    if v > .1201:                                                        # the part above 12% glows red on the arc
        q = skia.Path(); a0 = 180 + 180 * .12 / .2; a1 = 180 + 180 * v / .2
        q.addArc(skia.Rect(x - r, y - r, x + r, y + r), a0, a1 - a0)
        c.drawPath(q, paint(RED, a, stroke=r * .085, cap=False))
        c.drawCircle(x, y, r * .09, paint(RED, a)); c.drawCircle(x, y, r * .04, paint('#0b1020', a))
    text(c, '%d%%' % round(v * 100), x, y + 86, 50, 800, GREEN if v <= .1201 else RED, a, 'c')
    text(c, "interest on a partner's capital", x, y + 128, 26, 700, DIM, a, 'c')
    # right: the bar of interest paid, split at 12%
    bx, by, bw = 1110, 470, 640; uw = bw / 15
    ta = a * seg(t, INT4 - .2, INT4 + .3)
    text(c, 'interest a year', bx, by - 26, 26, 700, DIM, ta)
    sec(c, bx + 210, by - 34, '40(b)(iv)', ta, size=24)
    g = seg(t, INT4 + .3, TWELVE4 + .25, ease); rr_ = seg(t, MORE4 - .1, MORE4 + .7, ease)
    c.drawRRect(rrect(bx, by, bw, 70, 12), paint('#0b1226', .95 * ta))
    if g > 0: c.drawRRect(rrect(bx, by, uw * 12 * g, 70, 12), paint(GREEN, .75 * ta))
    if rr_ > 0: c.drawRRect(rrect(bx + uw * 12, by, uw * 3 * rr_, 70, 6), paint(RED, .8 * ta))
    for k in range(1, 15):
        c.drawLine(bx + uw * k, by + 6, bx + uw * k, by + 64, paint(BLACK, .25 * ta, stroke=1.2, cap=False))
    c.drawRRect(rrect(bx, by, bw, 70, 12), paint(WHITE, .2 * ta, stroke=1.2))
    la = a * seg(t, TWELVE4 - .1, TWELVE4 + .3)
    if la > 0:
        c.drawLine(bx + uw * 12, by - 12, bx + uw * 12, by + 84, paint(WHITE, la, stroke=3))
        text(c, 'up to 12%: allowed', bx + uw * 6, by + 118, 28, 800, GREEN, la, 'c')
    sa = a * seg(t, SIMPLE4 - .2, SIMPLE4 + .3, back)
    chip(c, bx + uw * 6, by + 186, 'simple interest, not compound', GREEN, sa, 26)
    ra = a * seg(t, MORE4, MORE4 + .4)
    if ra > 0:
        text(c, 'above 12%', bx + uw * 13.5, by + 118, 26, 800, RED, ra, 'c')
        stamp(c, bx + bw - 85, by - 56, 'DISALLOWED', RED, ra, seg(t, DIS4 - .3, DIS4 + .8, linr), -6, 28)

# ---------------------------------------------------------------- s5 + s6: book profit, then the staircase
PD0, PD1 = S5 - .4, S7 - .1
BPX, BPW = 360, 1200                      # bar x and width (the whole book profit)
SPLIT = 6 / 14.9                          # where the first ₹6 lakh ends (matches s8)
SAL_F = .26                               # partners' salary share of the bar in s5

def _bookprofit(c, t):
    a = win(t, PD0, PD1, .45, .45)
    if a <= 0: return
    mv = seg(t, LIMIT6 - .3, FIRST6 + .2)                              # bar slides down to make room for the steps
    by = lerp(470, 640, mv); bh = 88
    ta = a * seg(t, BOOK5 - .25, BOOK5 + .25)
    text(c, 'Book profit', 960, lerp(370, 330, mv), lerp(54, 40, mv), 800, GOLD, ta, 'c', shadow=8)
    # s5: the net profit part, then the partners' salary added back
    na = a * seg(t, NET5 - .3, NET5 + .3)
    wN = BPW * (1 - SAL_F) * seg(t, NET5 - .3, NET5 + .5, eout)
    su = seg(t, BEFORE5 - .1, SAL5 + .3, ease)                         # salary block slides back in
    mg = seg(t, LIMIT6 - .5, LIMIT6 + .3)                              # colours merge into one bar
    if na > 0:
        c.drawRRect(rrect(BPX, by + 8, BPW * (1 - SAL_F * (1 - su)), bh, 14), paint(BLACK, .35 * na, blur=12))
        if mg > 0: c.drawRRect(rrect(BPX, by, BPW, bh, 14), paint(GOLD, .92 * na * mg))   # one seamless bar
        if mg < 1: c.drawRRect(rrect(BPX, by, wN, bh, 14), paint(shade(GOLD, -.25), .9 * na * (1 - mg)))
        text(c, "firm's net profit", BPX + wN / 2, by + bh / 2 + 10, 30, 800, '#1a1305', na * (1 - mg), 'c')
    if su > 0:
        sx = lerp(BPX + BPW + 200, BPX + BPW * (1 - SAL_F), su); sy = lerp(by - 140, by, su)
        c.drawRRect(rrect(sx, sy, BPW * SAL_F, bh, 14), paint(GREEN, .9 * a * seg(t, BEFORE5 - .1, BEFORE5 + .2) * (1 - mg)))
        text(c, "+ partners' salary", sx + BPW * SAL_F / 2, sy + bh / 2 + 10, 28, 800, '#06210f',
             a * seg(t, BEFORE5 - .1, BEFORE5 + .2) * (1 - mg), 'c')
    ra = a * seg(t, RULES5 - .2, RULES5 + .3) * (1 - mv)
    if ra > 0:
        sec(c, BPX, by + bh + 52, '28 to 44D', ra, size=24)
        text(c, 'net profit worked out under the tax rules', BPX + 170, by + bh + 60, 26, 700, DIM, ra)
    ba = a * seg(t, SAL5 + .1, SAL5 + .5) * (1 - mv)
    if ba > 0:
        text(c, "before the partners' salary", BPX + BPW, by - 26, 26, 800, GREEN, ba, 'r')
    ga = a * seg(t, SAL5 + .2, SAL5 + .8) * (1 - seg(t, FIRST6 - .2, FIRST6 + .3))
    if ga > 0: c.drawRRect(rrect(BPX - 5, by - 5, BPW + 10, bh + 10, 18), paint(GOLD, .7 * ga, stroke=4, blur=4))
    # s6: split at the first ₹6 lakh, two steps
    xs = BPX + BPW * SPLIT
    sp = a * seg(t, FIRST6 - .1, SIX6 + .3)
    if sp > 0:
        c.drawLine(xs, by - 14, xs, by + bh + 14, paint(WHITE, sp, stroke=4))
        text(c, 'first ₹6 lakh', (BPX + xs) / 2, by + bh / 2 + 11, 32, 800, '#1a1305', sp, 'c')
        text(c, 'the rest', (xs + BPX + BPW) / 2, by + bh / 2 + 11, 32, 800, '#1a1305', a * seg(t, REST6 - .2, REST6 + .2), 'c')
    SH = 250
    for k, (x0, x1, f, tt, col) in enumerate(((BPX, xs, .9, THREE6, GOLD), (xs, BPX + BPW, .6, SIXTY6, ORANGE))):
        u = seg(t, tt - .3, tt + .5, eout)
        if u <= 0: continue
        h = SH * f * u; y0 = by - 10 - h
        c.drawRRect(rrect(x0 + 8, y0, x1 - x0 - 16, h, 12), paint(shade(col, -.62), .95 * a))
        c.drawRRect(rrect(x0 + 8, y0, x1 - x0 - 16, h, 12), paint(col, .9 * a, stroke=2.4))
        cx = (x0 + x1) / 2
        if k == 0:
            text(c, '90%', cx, y0 + 66, 54, 800, GOLD, a * seg(t, NINETY6 - .2, NINETY6 + .2), 'c')
            text(c, '₹3 lakh or 90%,', cx, y0 + 120, 28, 800, WHITE, a * seg(t, THREE6, THREE6 + .4), 'c')
            text(c, 'whichever is higher', cx, y0 + 156, 26, 700, GOLD, a * seg(t, HIGHER6 - .2, HIGHER6 + .2), 'c')
        else:
            text(c, '60%', cx, y0 + 66, 54, 800, ORANGE, a * seg(t, SIXTY6 - .1, SIXTY6 + .3), 'c')
            text(c, 'of the balance', cx, y0 + 110, 26, 700, WHITE, a * seg(t, SIXTY6 + .1, SIXTY6 + .5), 'c')
    la = a * seg(t, LOSS6 - .2, LOSS6 + .3, back)
    if la > 0: chip(c, BPX + 4, by + bh + 46, 'on a loss too: ₹3 lakh', RED, la, 26, 'l')

# ---------------------------------------------------------------- s7–s9: the computation sheet + the right panel
PE0, PE1 = S7 - .4, S10 - .1
SHX, SHY, SHW = 84, 190, 1010
ROWS = [dict(label='Profit before depreciation, salary & interest', amt=1700000, kind='start', t0=SEVENTEEN7 - .1),
        dict(label='Depreciation', amt=150000, kind='less', sec='32', t0=DEP7 - .1),
        dict(label='Interest on capital · 12% × ₹5,00,000', amt=60000, kind='less', sec='40(b)(iv)', t0=SIXTY7 - .1),
        dict(label='Book profit', amt=1490000, kind='sub', t0=FOURTEEN7 - .1, hl=(FOURTEEN7 + .2, LIMIT8 + 1.)),
        dict(label='Salary limit', kind='head', t0=LIMIT8 - .1),
        dict(label='90% of the first ₹6,00,000', amt=540000, kind='add', t0=FIVE8 - .1),
        dict(label='60% of the balance ₹8,90,000', amt=534000, kind='add', t0=FIVE8B - .1),
        dict(label='Maximum salary allowed', amt=1074000, kind='total', sec='40(b)(v)', t0=TEN8 - .1,
             hl=(INSIDE9 - .2, PE1))]
PX0 = 1172; PL = 37.6                                   # right panel: px per lakh (₹17 lakh -> 639 px)
def _lx(l): return PX0 + l * PL

def _panel_profit(c, t, a):
    """s7–s8: the profit bar cut by depreciation and interest, then split into the two limit steps."""
    pa = a * seg(t, SEVENTEEN7 - .3, SEVENTEEN7 + .3)
    if pa <= 0: return
    mv = seg(t, S8 - .3, NINETY8 + .2)
    y = lerp(312, 640, mv); h = 64
    fade_out = 1 - seg(t, S9 - .45, S9 - .05)
    pa *= fade_out
    if pa <= 0: return
    ta = pa * (1 - mv)
    text(c, 'profit before depreciation, salary & interest', PX0, 284, 22, 700, DIM, ta)
    gw = 17 * PL * seg(t, SEVENTEEN7 - .3, SEVENTEEN7 + .6, eout)
    dcut = seg(t, DEP7 + .3, DEP7 + 1.)                     # depreciation slice falls away
    icut = seg(t, SIXTY7 + .45, SIXTY7 + 1.15)               # interest slice falls away
    hl = seg(t, FOURTEEN7 - .2, FOURTEEN7 + .4)
    # the remaining bar (book profit at the end)
    keep = min(gw, 14.9 * PL) if dcut > 0 or icut > 0 else gw
    c.drawRRect(rrect(PX0, y, keep if icut > 0 else min(gw, 15.5 * PL), h, 10), paint(GOLD, .88 * pa))
    if icut <= 0 and gw > 14.9 * PL:                         # (interest still attached)
        pass
    for l0, l1, cut, col, lab_ in ((15.5, 17., dcut, '#94a3b8', '− depreciation'), (14.9, 15.5, icut, GREEN, '− interest allowed')):
        w = (l1 - l0) * PL
        if gw < l0 * PL: continue
        wv = min(w, gw - l0 * PL)
        dy = 80 * ein(cut); al = pa * (1 - seg(cut, .6, 1))
        if al > 0:
            c.drawRRect(rrect(_lx(l0) + 2, y + dy, wv - 2, h, 6), paint(mixc(GOLD, col, seg(cut, 0, .3)), .9 * al))
        la = pa * win(cut, .05, 1.01, .2, .01) * (1 - mv) * (1 - seg(icut, 0, .25) if l0 > 15 else 1)
        if la > 0: text(c, lab_, _lx(l1), y + h + 40, 24, 700, col, la * (1 - seg(t, S8 - .4, S8)), 'r')
    if gw > 0 and mv < 1:
        _mono(c, rupee(1700000) if icut <= 0 and dcut <= 0 else rupee(1490000) if hl > 0 else '',
              PX0 + 20, y + 43, 28, '#1a1305', pa * (1 - mv * 2))
    if hl > 0:
        c.drawRRect(rrect(PX0 - 4, y - 4, 14.9 * PL + 8, h + 8, 14), paint(GOLD, .7 * hl * pa * (1 - mv), stroke=4, blur=3))
        text(c, 'book profit', PX0 + 14.9 * PL + 18, y + 42, 26, 800, GOLD, hl * pa * (1 - mv))
    # s8: split at ₹6,00,000, and two steps rise over the bar
    if mv <= 0: return
    xs = _lx(6)
    sa = pa * seg(t, SIX8 - .2, SIX8 + .3)
    c.drawLine(xs, y - 12, xs, y + h + 12, paint(WHITE, sa, stroke=3.4))
    _mono(c, rupee(600000), (PX0 + xs) / 2, y + h + 40, 26, WHITE, sa, 'c')
    _mono(c, rupee(890000), (xs + _lx(14.9)) / 2, y + h + 40, 26, WHITE, pa * seg(t, EIGHT8 - .2, EIGHT8 + .3), 'c')
    SH = 250; fly = seg(t, TOTAL8 - .2, TEN8 + .2, ease)
    for k, (l0, l1, f, tt, ta_, amt, col) in enumerate(((0, 6, .9, NINETY8, FIVE8, 540000, GOLD),
                                                        (6, 14.9, .6, SIXTY8, FIVE8B, 534000, ORANGE))):
        u = seg(t, tt - .2, tt + .6, eout)
        if u <= 0: continue
        x0, x1 = _lx(l0), _lx(l1); hh = SH * f * u; y0 = y - 10 - hh
        c.drawRRect(rrect(x0 + 6, y0, x1 - x0 - 12, hh, 10), paint(shade(col, -.62), .95 * pa))
        c.drawRRect(rrect(x0 + 6, y0, x1 - x0 - 12, hh, 10), paint(col, .9 * pa, stroke=2.2))
        cx = (x0 + x1) / 2
        text(c, '%d%%' % round(f * 100), cx, y0 + 52, 44, 800, col, pa * seg(t, tt, tt + .3), 'c')
        ua = seg(t, ta_ - .1, ta_ + .6)
        if ua > 0:
            fx, fy = lerp(cx, 1500, fly), lerp(y0 + 104, 372, fly)
            roll(c, amt, fx, fy, ua, 28, WHITE, pa * (1 - seg(fly, .8, 1)), 'c')
    ta = pa * seg(t, TEN8 - .2, TEN8 + .3, back)
    if ta > 0:
        c.drawRRect(rrect(1300, 330, 400, 60, 30), paint('#1a1305', .92 * ta))
        c.drawRRect(rrect(1300, 330, 400, 60, 30), paint(GOLD, ta, stroke=2.2))
        text(c, 'limit', 1328, 370, 26, 800, GOLD, ta)
        roll(c, 1074000, 1676, 372, seg(t, TEN8 - .1, TEN8 + .6), 32, GOLD, ta, 'r', glow=3)

PSAL7 = W('s7', 'partners')

def _panel_pending(c, t, a):
    """s7: 'and before the partners' salary and interest' — two dashed chips under the bar, not yet taken out."""
    pa = a * win(t, PSAL7 - .3, INTR7 - .1, .35, .4)
    if pa <= 0: return
    for k, (lab_, tt) in enumerate((("partners' salary", PSAL7), ('interest', W('s7', 'interest')))):
        u = seg(t, tt - .2, tt + .3, back); xx = PX0 + 10 + k * 300
        if u <= 0: continue
        w = text_w(lab_, 26, 700) + 40
        _dash_rr(c, xx, 452, w, 50, 25, GREEN, pa * u)
        text(c, lab_, xx + w / 2, 486, 26, 700, WHITE, pa * u, 'c')
    text(c, 'not deducted yet', PX0 + 10, 546, 24, 700, DIM, pa * seg(t, W('s7', 'interest') + .2, W('s7', 'interest') + .6))

def _panel_interest(c, t, a):
    """s7: interest at 15% on ₹5,00,000 = ₹75,000, only 12% = ₹60,000 allowed."""
    ia = a * seg(t, INTR7 - .3, INTR7 + .2) * (1 - seg(t, S8 - .4, S8))
    if ia <= 0: return
    x, y, w = PX0, 516, 640
    _box(c, x - 16, y - 50, w + 32, 286, VIO, ia, .82)
    text(c, 'interest on capital ₹5,00,000', x + 6, y - 10, 26, 800, WHITE, ia)
    uw = (w - 12) / 15; by = y + 26
    pa = seg(t, FIFTEEN7 - .1, FIFTEEN7 + .7, ease)
    c.drawRRect(rrect(x + 6, by, uw * 15, 58, 10), paint('#0b1226', .95 * ia))
    split = seg(t, ONLY7 - .1, ONLY7 + .4)
    if pa > 0:
        c.drawRRect(rrect(x + 6, by, uw * 15 * pa, 58, 10), paint(mixc(GOLD, GREEN, split), .8 * ia))
    if split > 0: c.drawRRect(rrect(x + 6 + uw * 12, by, uw * 3, 58, 6), paint(RED, .85 * ia * split))
    c.drawRRect(rrect(x + 6, by, uw * 15, 58, 10), paint(WHITE, .2 * ia, stroke=1.2))
    text(c, '15% paid', x + 6, by + 96, 26, 800, GOLD, ia * seg(t, FIFTEEN7, FIFTEEN7 + .3))
    roll(c, 75000, x + w - 6, by + 98, seg(t, SEVENTY7 - .1, SEVENTY7 + .6), 30, GOLD, ia * seg(t, SEVENTY7 - .1, SEVENTY7 + .2), 'r')
    sa = ia * split
    if sa > 0:
        c.drawLine(x + 6 + uw * 12, by - 10, x + 6 + uw * 12, by + 68, paint(WHITE, sa, stroke=3))
        text(c, '12% allowed', x + 6, by + 150, 28, 800, GREEN, sa)
        roll(c, 60000, x + w - 6, by + 152, seg(t, SIXTY7 - .1, SIXTY7 + .6), 32, GREEN, ia * seg(t, SIXTY7 - .1, SIXTY7 + .2), 'r')
        text(c, 'excess: disallowed', x + w - 6, by - 14, 22, 800, RED, sa, 'r')
    # the allowed ₹60,000 flies up to cut the profit bar
    fu = seg(t, SIXTY7 + .2, SIXTY7 + .7, ein)
    if 0 < fu < 1:
        _mono(c, rupee(60000), lerp(x + w - 80, _lx(15.2), fu), lerp(by + 150, 356, fu), 28, GREEN, ia, 'c')

def _panel_salary(c, t, a):
    """s9: 2 partners × 12 months × ₹40,000 -> ₹9,60,000, inside the ₹10,74,000 limit."""
    sa = a * seg(t, S9 - .3, S9 + .2)
    if sa <= 0: return
    x0 = PX0 + 96; bw, gap = 42, 5
    text(c, '₹40,000 a month, each partner', PX0, 336, 28, 800, GOLD, sa * seg(t, FORTY9 - .2, FORTY9 + .3))
    text(c, '× 2 partners × 12 months', PX0, 540, 26, 700, WHITE, sa * seg(t, MONTH9 + .2, MONTH9 + .6) * (1 - seg(t, INSIDE9 - .5, INSIDE9 - .1)))
    col_ = seg(t, NINE9 - .1, NINE9 + .7, ease)                         # the grid pours into the bar
    for r, who in enumerate(('Meera', 'Rohan')):
        yy = 380 + r * 62
        text(c, who, x0 - 14, yy + 32, 24, 800, WHITE, sa * (1 - col_), 'r')
        for m in range(12):
            u = seg(t, FORTY9 - .1 + .055 * (r * 12 + m), FORTY9 + .25 + .055 * (r * 12 + m), back)
            if u <= 0: continue
            bx = x0 + m * (bw + gap); by = yy
            tx = PX0 + (r * 12 + m) / 24 * 572; ty = 586
            px, py = lerp(bx, tx, col_), lerp(by, ty, col_); pw = lerp(bw, 572 / 24, col_); ph = lerp(48, 70, col_)
            c.drawRRect(rrect(px, py, pw, ph, lerp(7, 2, col_)), paint(mixc(GOLD, GREEN, col_), .85 * sa * u))
            if col_ < .3:
                text(c, 'AMJJASONDJFM'[m], bx + bw / 2, by + 33, 22, 800, '#1a1305', sa * u * (1 - col_ * 3), 'c')
    # the limit track
    la = sa * seg(t, NINE9 - .3, NINE9 + .2)
    if la > 0:
        c.drawRRect(rrect(PX0, 586, 640, 70, 12), paint('#0b1226', .7 * la))
        c.drawRRect(rrect(PX0, 586, 640, 70, 12), paint(WHITE, .22 * la, stroke=1.2))
        if col_ >= 1:
            c.drawRRect(rrect(PX0, 586, 572, 70, 12), paint(GREEN, .85 * la))
        roll(c, 960000, PX0 + 24, 634, seg(t, NINE9, NINE9 + .7), 32, '#06210f', la * seg(t, NINE9 + .2, NINE9 + .5), 'l')
    ia = sa * seg(t, INSIDE9 - .3, INSIDE9 + .2)
    if ia > 0:
        p = paint(GOLD, ia, stroke=3.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 7], 0))
        c.drawLine(PX0 + 640, 560, PX0 + 640, 684, p)
        text(c, 'limit ₹10,74,000', PX0 + 640, 545, 26, 800, GOLD, ia, 'r')
        text(c, 'inside the limit', PX0 + 286, 712, 26, 800, GREEN, ia * (1 - seg(t, ALLOWED9 - .3, ALLOWED9)), 'c')
    st = seg(t, ALLOWED9 - .2, ALLOWED9 + .8, linr)
    if st > 0: stamp(c, PX0 + 320, 752, 'ALLOWED', GREEN, sa, st, -6, 40, 'in full')

def _example(c, t):
    a = win(t, PE0, PE1, .45, .45)
    if a <= 0: return
    sheet(c, SHX, SHY, SHW, ROWS, a, t, 'Meera & Rohan Bakers · salary limit', GOLD, title_r='§ 40(b)', size=30, asize=32)
    _panel_profit(c, t, a)
    _panel_pending(c, t, a)
    _panel_interest(c, t, a)
    _panel_salary(c, t, a)

# ---------------------------------------------------------------- s10: Rohan's side
PF0, PF1 = S10 - .4, S11 - .1
SLB = ((820, 300, 'Rohan’s business income', 'salary + interest, as far as the firm could deduct', '28(v)', GOLD),
       (820, 572, 'Rohan’s share of profit', 'not taxed again in his hands', '10(2A)', VIO))
SLW, SLH = 740, 216
SRC10 = (452, 640)

def _rohan(c, t):
    a = win(t, PF0, PF1, .45, .45)
    if a <= 0: return
    shop(c, 320, 770, .5, a, t, 'Meera & Rohan Bakers', 1.)
    text(c, 'the firm', 320, 812, 24, 700, DIM, a, 'c')
    person(c, 1712, 790, .95, a * seg(t, ROHAN10 - .4, ROHAN10), 'rohan', t, look=-.5, mood=.4)
    chip(c, 1712, 540, "Rohan's return", ACC, a * seg(t, ROHAN10 - .2, ROHAN10 + .3, back), 24)
    for k, (x, y, ttl, sub, sc_, col) in enumerate(SLB):
        tt = (W('s10', 'pays') - .2) if k == 0 else SHARE10 - .3
        sa = a * seg(t, tt, tt + .4)
        if sa <= 0: continue
        g = win(t, BUS10 - .2, BUS10 + 1.6, .3, .6) if k == 0 else win(t, EXEMPT10 - .2, EXEMPT10 + 1.6, .3, .6)
        slab(c, x, y, SLW, SLH, sa, col, ttl, sub, 30, 24)
        if g > 0: c.drawRRect(rrect(x - 4, y - 4, SLW + 8, SLH + 8, 20), paint(col, .6 * g * sa, stroke=6, blur=6))
        sec(c, x + SLW - 20, y + 46, sc_, sa, size=24, align='r')
        # a faint channel from the firm into this slab, with money moving along it
        P = np.array([SRC10, (620, SRC10[1] - 40 if k == 0 else SRC10[1] + 10), (x - 10, y + SLH * .62)])
        P = catmull(P)
        flo = win(t, (SAL10 if k == 0 else SHARE10) - .3, PF1, .4, .4)
        if flo > 0:
            c.drawPath(poly(P, False), paint(col, .25 * sa * flo, stroke=3))
            flowdots(c, P, ((t - S10) * .7 + k * .5) % 1, sa * flo, col, 6, 5.)
    ba = a * seg(t, BUS10 - .2, BUS10 + .3, back)
    if ba > 0: chip(c, 1430, 300 + 160, 'taxed as PGBP', GOLD, ba, 26)
    ea = a * seg(t, EXEMPT10 - .2, EXEMPT10 + .3, back)
    if ea > 0:
        chip(c, 1414, 572 + 160, 'exempt', GREEN, ea, 28)
        tick(c, 1414 + 82, 572 + 160, ea, 18)
    # the three amounts fly from the firm into the slabs
    for lab_, tt, dst, col in (('salary', SAL10, (922, 460), GREEN), ('interest', INT10, (1100, 460), GREEN),
                               ('share of profit', SHARE10, (980, 732), GOLD)):
        u = seg(t, tt - .2, tt + .8, ease)
        if u <= 0: continue
        x = lerp(SRC10[0], dst[0], u); y = lerp(SRC10[1], dst[1], u) - 90 * math.sin(math.pi * u)
        chip(c, x, y, lab_, col, a, 26, fill=lerp(.9, .35, seg(u, .85, 1)))
    da = a * seg(t, DEDUCT10 - .2, DEDUCT10 + .3)
    if da > 0:
        text(c, 'deducted by the firm,', 320, 430, 24, 700, GREEN, da, 'c')
        text(c, 'within the 40(b) limits', 320, 462, 24, 700, GREEN, da, 'c')

# ---------------------------------------------------------------- s11: a loss year — the ₹3 lakh floor
PG0, PG1 = S11 - .4, S12 - .1
ZY = 560

def _loss(c, t):
    a = win(t, PG0, PG1, .45, .45)
    if a <= 0: return
    c.drawLine(360, ZY, 1560, ZY, paint(WHITE, .6 * a, stroke=2.4))
    text(c, '0', 340, ZY + 9, 26, 800, DIM, a, 'r')
    lu = seg(t, LOSS11 - .3, LOSS11 + .6, eout)
    if lu > 0:
        h = 210 * lu
        c.drawRRect(rrect(520, ZY + 4, 220, h, 10), paint(shade(RED, -.55), .95 * a))
        c.drawRRect(rrect(520, ZY + 4, 220, h, 10), paint(RED, .9 * a, stroke=2.2))
        text(c, 'book profit', 630, ZY - 64, 28, 800, WHITE, a * seg(t, LOSS11, LOSS11 + .3), 'c')
        text(c, 'a loss', 630, ZY - 26, 30, 800, RED, a * seg(t, LOSS11, LOSS11 + .3), 'c')
    cu = seg(t, THREE11 - .4, THREE11 + .5, eout)
    ta = a * seg(t, W('s11', 'still') - .2, W('s11', 'still') + .3)
    text(c, 'salary limit', 1080, 300, 30, 800, WHITE, ta, 'c')
    if cu > 0:
        h = 200 * cu
        c.drawRRect(rrect(970, ZY - h, 220, h, 10), paint(shade(GOLD, -.6), .95 * a))
        c.drawRRect(rrect(970, ZY - h, 220, h, 10), paint(GOLD, .9 * a, stroke=2.4))
        roll(c, 300000, 1080, ZY - h / 2 + 12, seg(t, THREE11 - .1, THREE11 + .6), 34, GOLD, a, 'c', glow=2)
    ia = a * seg(t, ALL11 - .2, ALL11 + .3)
    text(c, 'in all, for the working partners', 1080, ZY + 46, 24, 700, GOLD, ia, 'c')
    wa = a * seg(t, WORK11 - .3, WORK11 + .2)
    person(c, 1370, ZY - 2, .62, wa, 'meera', t, look=-.4, mood=.3)
    person(c, 1500, ZY - 2, .62, wa, 'rohan', t, look=-.4, mood=.3)
    da = a * seg(t, DEDUCT11 - .2, DEDUCT11 + .3, back)
    if da > 0:
        chip(c, 1080, ZY + 110, 'still deductible', GREEN, da, 28)
        tick(c, 1080 + 128, ZY + 110, da, 18)

# ---------------------------------------------------------------- s12 check: the deed and the 12 months
PH0 = S12 - .4
MX0, MW, MG, MY, MH = 690, 74, 6, 862, 62

def _check(c, t):
    a = seg(t, PH0, PH0 + .5)
    if a <= 0: return
    da = a * seg(t, DEED12 - .3, DEED12 + .2)
    if da > 0:                                                           # the deed
        x, y, w, h = 320, 786, 300, 196
        c.save(); c.translate(x + w / 2, y + h / 2); c.rotate(-3); c.translate(-(x + w / 2), -(y + h / 2))
        c.drawRRect(rrect(x + 4, y + 10, w, h, 8), paint(BLACK, .45 * da, blur=12))
        c.drawRRect(rrect(x, y, w, h, 8), paint(CREAM, da))
        text(c, 'PARTNERSHIP DEED', x + w / 2, y + 40, 22, 800, INK, da, 'c', track=2)
        c.drawLine(x + 20, y + 54, x + w - 20, y + 54, paint(INK, .4 * da, stroke=1.2))
        text(c, 'salary from 1 April', x + 22, y + 98, 24, 700, INK, da * seg(t, APRIL12 - .2, APRIL12 + .2))
        sa = da * seg(t, SIGNED12 - .1, JULY12 + .3)
        if sa > 0:
            ftext(c, 'Meera · Rohan', x + 22, y + 146, 28, SIGN, '#1d4ed8', sa, 'l', 400)
            text(c, 'signed 1 July', x + 22, y + 180, 24, 800, '#b91c1c', sa)
        c.restore()
    ua = seg(t, A_JULY - .2, A_JULY + .5)
    for m in range(12):
        x = MX0 + m * (MW + MG)
        ma = a * seg(t, APRIL12 - .3 + .03 * m, APRIL12 + .1 + .03 * m)
        if ma <= 0: continue
        pre = m < 3
        col = mixc('#1b2540', '#3a3f4b' if pre else shade(GREEN, -.45), ua)
        c.drawRRect(rrect(x, MY, MW, MH, 10), paint(col, .95 * ma))
        c.drawRRect(rrect(x, MY, MW, MH, 10), paint(mixc(ACC, '#64748b' if pre else GREEN, ua), .8 * ma, stroke=1.8))
        text(c, 'AMJJASONDJFM'[m], x + MW / 2, MY + 42, 28, 800, mixc(WHITE, '#8a93a6' if pre else WHITE, ua), ma, 'c')
        if pre and ua > 0: cross(c, x + MW / 2, MY + MH + 30, ma * ua, 14, '#9ca3af')
    ja = a * seg(t, JULY12 - .2, JULY12 + .3, back)
    if ja > 0:                                                           # the signing day, on July
        xj = MX0 + 3 * (MW + MG)
        c.drawLine(xj - MG / 2, MY - 16, xj - MG / 2, MY + MH + 14, paint(GOLD, ja, stroke=3.4))
        chip(c, xj - MG / 2, MY - 32, 'deed signed', GOLD, ja, 22)
    if ua > 0:
        text(c, 'before the deed: no salary', MX0 + 1.5 * (MW + MG), MY + MH + 76, 24, 800, '#9ca3af',
             a * seg(t, A_BEFORE - .3, A_BEFORE + .2), 'c')
        text(c, 'salary allowed from 1 July', MX0 + 7.5 * (MW + MG), MY + MH + 44, 26, 800, GREEN, a * ua, 'c')

def ch_s(c, t):
    if t < CS - .5 or t > CE + .5: return
    _firm(c, t)
    _gates(c, t)
    _interest(c, t)
    _bookprofit(c, t)
    _example(c, t)
    _rohan(c, t)
    _loss(c, t)
    _check(c, t)
