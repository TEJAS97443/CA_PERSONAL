"""Chapter T — Relatives and cash (section 40A).
t1 hook: her husband's flour mill (factory) sends a flour sack to Meera tagged "₹48 / kg"; a market board reads
   "flour ₹40 / kg"; the officer walks in and his magnifier hovers over the ₹48
t2 overpaying a relative: coins of profit arc from Meera's side to the husband's mill ("profit shifts within the
   family"); § 40A(2); two price columns ₹48 paid vs ₹40 market, the top ₹8 slice red, the magnifier moves onto it,
   DISALLOWED, "₹8 / kg disallowed" and "₹40 / kg allowed"
t3 name: specified persons — a family web around Meera lit as spoken (for an individual: spouse · brother · sister ·
   up the line: parents, grandparents · down the line: children, grandchildren) and a business with a ≥ 20% gold
   slice held by her or a relative
t4 cash, § 40A(3): Meera pays one supplier (one person · one day) cash that rises in a column past a ₹10,000 line;
   the whole column turns red ("whole payment disallowed"), the part above the line is "not just the excess"
t5 four ₹8,000 cash bills at 10:00, 12:00, 15:00 and 18:00 (clocks), each under the limit (ticks), then they stack
   into the day's column past the ₹10,000 line to ₹32,000 -> all red, DISALLOWED, "all ₹32,000"
t6 safe modes as green tiles lit as spoken (A/c payee cheque · draft · card · net banking · UPI · IMPS · NEFT · RTGS);
   a goods truck drives in: "hiring out goods carriages · cash limit ₹35,000"
t7 what if: last year (P.Y. 2024-25) an unpaid expense is stamped ALLOWED; this year (P.Y. 2025-26) it is paid in
   cash above ₹10,000 in a day -> DEEMED INCOME this year, § 40A(3A)
t8 Rule 6DD exceptions as tiles: paying a bank · the government · wheat from the farmer who grew it · a village with
   no bank · retirement benefit up to ₹50,000
t9 three panels: provision for gratuity (books only, crossed, § 40A(7)) · paid or into an approved fund (coins fill
   a jar, tick) · unapproved staff fund (coins bounce off a padlocked jar, crossed, § 40A(9))
t10 exam (calm): payments ride a slow belt through a § 40A(3) scanner — cheque, UPI and draft pass green, a cash
   payment is rejected red; chips "to a person · in a day · above ₹10,000" light as spoken
t11 check: below the card, a dairy farmer, a milk can and a "Milk ₹60,000 · cash" bill ("one day"); the answer
   stamps it ALLOWED with "Rule 6DD · bought from the producer"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('t')
T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11 = (T('t%d' % i) for i in range(1, 12))

def _wa(i, n, occ=0):
    try: return Wd(i, n, occ)
    except Exception: return TA(i[:-1])

# ---------------------------------------------------------------- word times (all checked against cues.json)
BUYS1, FLOUR1, HUSB1, F48, MARKET1, F40, OFFICER1 = (W('t1', 'buys'), W('t1', 'flour'), W('t1', 'husband'),
                                                     W('t1', 'forty'), W('t1', 'market'), W('t1', 'forty', occ=1),
                                                     W('t1', 'officer'))
OVER2, MOVE2, ANOTHER2, SEC2, DIS2, EXC2, EIGHT2 = (W('t2', 'overpay'), W('t2', 'move'), W('t2', 'another'),
                                                   W('t2', '40A(2)'), W('t2', 'disallow'), W('t2', 'excess'),
                                                   W('t2', 'eight'))
INDIV3, SPOUSE3, BRO3, SIS3, DIRECT3, UP3, DOWN3, BUSI3, REL3, TWENTY3 = (
    W('t3', 'individual'), W('t3', 'spouse'), W('t3', 'brother'), W('t3', 'sister'), W('t3', 'direct'), W('t3', 'up'),
    W('t3', 'down'), W('t3', 'businesses'), W('t3', 'relative'), W('t3', 'twenty'))
CASH4, SEC4, ONE4, TEN4, SINGLE4, WHOLE4, DIS4, NOT4 = (W('t4', 'cash'), W('t4', '40A(3)'), W('t4', 'one person'),
                                                        W('t4', 'ten'), W('t4', 'single'), W('t4', 'whole'),
                                                        W('t4', 'disallowed'), W('t4', 'not'))
EIGHT5, SUPP5, EACH5, TOTAL5, THIRTY5, ALL5, DIS5 = (W('t5', 'eight'), W('t5', 'supplier'), W('t5', 'each'),
                                                     W('t5', 'total'), W('t5', 'thirty'), W('t5', 'all'),
                                                     W('t5', 'disallowed'))
PAY_T = (W('t5', 'ten'), W('t5', 'noon'), W('t5', 'three'), W('t5', 'six'))
SAFE6, ELEC6, TRANS6, THIRTY6 = W('t6', 'safe'), W('t6', 'electronic'), W('t6', 'transporter'), W('t6', 'thirty')
MODES = (('A/c payee cheque', 'cheque', W('t6', 'cheque')), ('A/c payee draft', 'draft', W('t6', 'draft')),
         ('Card', 'card', W('t6', 'card')), ('Net banking', 'bank', W('t6', 'net')),
         ('UPI', 'upi', W('t6', 'UPI')), ('IMPS', 'transfer', W('t6', 'IMPS')),
         ('NEFT', 'transfer', W('t6', 'NEFT')), ('RTGS', 'transfer', W('t6', 'RTGS')))
EXP7, ALLOW7, LAST7, PAYS7, CASH7, BEC7, INC7, SEC7 = (W('t7', 'expense'), W('t7', 'allowed'), W('t7', 'last'),
                                                       W('t7', 'pays'), W('t7', 'cash'), W('t7', 'becomes'),
                                                       W('t7', 'income'), W('t7', '40A(3A)'))
RULE8 = W('t8', 'rule')
EXC8 = ((W('t8', 'bank'), 'Paying a bank'), (W('t8', 'government'), 'Paying the government'),
        (W('t8', 'wheat'), 'Wheat from the farmer who grew it'), (W('t8', 'village'), 'Paying in a village with no bank'),
        (W('t8', 'retirement'), 'Retirement benefit up to ₹50,000'))
FIFTY8 = W('t8', 'fifty')
PROV9, DED9, S7_9, PAYM9, APPR9, UNAP9, BLOCK9, S9_9 = (W('t9', 'provision'), W('t9', 'deductible'), W('t9', '40A(7)'),
                                                       W('t9', 'payments'), W('t9', 'approved'), W('t9', 'unapproved'),
                                                       W('t9', 'blocked'), W('t9', '40A(9)'))
PERS10, DAY10, EXCD10, DIS10 = W('t10', 'person'), W('t10', 'day'), W('t10', 'exceeding'), W('t10', 'disallowed')
MILK11, CASH11, DAIRY11, DAY11 = W('t11', 'milk'), W('t11', 'cash'), W('t11', 'dairy'), W('t11', 'day')
A_NO, A_PROD, A_RULE = _wa('t11a', 'no'), _wa('t11a', 'producer'), _wa('t11a', 'rule')

for tt, k in ((F48, 'pop'), (F40, 'pop'), (OFFICER1 - .2, 'whoosh'),
              (SEC2, 'pop'), (DIS2 + .45, 'thunk'),
              (SPOUSE3, 'blip'), (SIS3, 'blip'), (UP3, 'tick'), (TWENTY3, 'pop'),
              (CASH4, 'whoosh'), (WHOLE4, 'error'),
              (PAY_T[0], 'tick'), (PAY_T[1], 'tick'), (PAY_T[2], 'tick'), (PAY_T[3], 'tick'),
              (DIS5, 'error'),
              (THIRTY6, 'chime_lo'),
              (ALLOW7 + .35, 'thunk'), (INC7 + .1, 'thunk'),
              (DED9, 'error'), (APPR9, 'ok'), (BLOCK9, 'key'),
              (A_NO + .1, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.8, glow=0., r=18):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .96 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=7, blur=9))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, .85 * a, stroke=2.2))

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l', glow=0.):
    return ftext(c, s, x, y, size, MONO, col, a, align, 700, glow)

def _dash(c, x0, y0, x1, y1, col, a, wd=2.4):
    if a <= 0: return
    p = paint(col, a, stroke=wd, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
    c.drawLine(x0, y0, x1, y1, p)

def _node(c, x, y, a, u, col=ACC, r=44):
    """A relative: a round avatar with a person icon; u pops it in."""
    if a <= 0 or u <= 0: return
    k = back(clamp(u)); rr = r * k
    c.drawCircle(x, y + 6, rr, paint(BLACK, .35 * a, blur=10))
    c.drawCircle(x, y, rr, paint(shade(col, -.7), a))
    c.drawCircle(x, y, rr, paint(col, .9 * a, stroke=2.4))
    icon(c, 'person', x, y, .8 * k, shade(col, .3), a, 3.4)

def _jar(c, x, y, w, h, a, fill, col, lock=0., t=0.):
    """A glass fund jar, top-left (x, y); fill 0..1 of coins (gold); lock 0..1 a padlock on the lid."""
    if a <= 0: return
    c.drawRRect(rrect(x - 8, y - 18, w + 16, 22, 8), paint('#6b7896', a))
    c.drawRRect(rrect(x, y, w, h, 18), paint('#0a1328', .7 * a))
    if fill > 0:
        c.save(); c.clipRRect(rrect(x + 4, y + 4, w - 8, h - 8, 14), True)
        top = y + h - (h - 8) * fill
        c.drawRect(skia.Rect(x, top, x + w, y + h), paint(shade(GOLD, -.35), .9 * a))
        for k in range(int(fill * 14)):
            cx = x + 20 + (k * 37) % max(w - 40, 1); cy = y + h - 16 - (k // max(int((w - 40) / 37), 1)) * 16
            c.drawOval(skia.Rect.MakeXYWH(cx - 14, cy - 5, 28, 10), paint(GOLD, .9 * a))
        c.restore()
    c.drawRRect(rrect(x, y, w, h, 18), paint(col, .7 * a, stroke=2.4))
    c.drawRRect(rrect(x + 12, y + 14, 8, h - 40, 4), paint(WHITE, .14 * a))
    if lock > 0: padlock(c, x + w / 2, y - 26, .9, RED, a * lock, 0.)

# ---------------------------------------------------------------- t1 + t2: the husband's mill and the market price
PA0, PA1 = CS, T3 - .2
MILL_X, ME_X, BASE_Y = 330, 880, 790
TAG = (680, 600)
COLS = ((1180, 'paid to his mill', 48, F48), (1400, 'market price', 40, F40))
PPX, CBASE = 6., 780                      # px per rupee, column base

def _meera_xy(t):
    """Meera's bust: beside the mill (t1–t2), then at the centre of her family web (t3)."""
    u = seg(t, T3 - .5, T3 + .5)
    return lerp(ME_X, 700, u), lerp(BASE_Y, 640, u), lerp(.95, .8, u)

def _mill(c, t):
    a = win(t, PA0 - 1, PA1, .1, .5)
    if a <= 0: return
    factory(c, MILL_X, 770, .72, a, t)
    text(c, "her husband's flour mill", MILL_X, 812, 26, 700, DIM, a * seg(t, HUSB1 - .3, HUSB1 + .2), 'c')
    # the flour sack travels to Meera with its price
    u = seg(t, BUYS1 - .3, FLOUR1 + .7, ease)
    sack(c, lerp(520, TAG[0], u), 770, .62, a * seg(t, BUYS1 - .3, BUYS1), 'Flour')
    over = seg(t, OVER2 - .2, OVER2 + .4)
    ta = a * seg(t, F48 - .25, F48 + .25, back) * (1 - seg(t, DIS2 - .6, DIS2 - .2))
    if ta > 0: price_tag(c, TAG[0] + 10, TAG[1], '₹48 / kg', mixc(GOLD, RED, over), ta, 30)
    # the market board (t1), replaced by the two columns (t2)
    ba = a * seg(t, MARKET1 - .3, MARKET1 + .2) * (1 - seg(t, SEC2 - .5, SEC2))
    if ba > 0:
        bx, by, bw, bh = 1150, 340, 400, 210
        _box(c, bx, by, bw, bh, '#94a3b8', ba, .86)
        text(c, 'MARKET PRICE', bx + bw / 2, by + 52, 24, 800, DIM, ba, 'c', track=3)
        c.drawLine(bx + 30, by + 72, bx + bw - 30, by + 72, paint(WHITE, .2 * ba, stroke=1.4))
        text(c, 'Flour', bx + 40, by + 146, 34, 800, WHITE, ba)
        _mono(c, '₹40 / kg', bx + bw - 40, by + 148, 40, GREEN, ba * seg(t, F40 - .2, F40 + .2), 'r', glow=3)
    # coins of profit shift from Meera to the mill (t2)
    mu = seg(t, MOVE2 - .2, ANOTHER2 + .6, linr)
    if 0 < mu < 1:
        for k in range(6):
            q = mu * 1.5 - k * .1
            if not 0 < q < 1: continue
            x = lerp(ME_X - 40, MILL_X + 60, q); y = lerp(560, 540, q) - 170 * math.sin(math.pi * q)
            coin(c, x, y, 20, a * min(1, q * 6) * min(1, (1 - q) * 6), GOLD, '₹', q * 9)
    pa = a * win(t, MOVE2 - .1, SEC2 + .6, .3, .5)
    if pa > 0: chip(c, (ME_X + MILL_X) / 2, 330, 'profit shifts within the family', GOLD, pa, 26)
    # § 40A(2) and the two columns
    sa = a * seg(t, SEC2 - .3, SEC2 + .2, back)
    if sa > 0:
        w = sec(c, 1150, 316, '40A(2)', sa, size=30)
        text(c, 'the officer can disallow the excess', 1150 + w + 18, 326, 26, 700, WHITE, a * seg(t, DIS2 - .3, DIS2 + .1))
    for k, (x, lab_, v, tt) in enumerate(COLS):
        u = seg(t, SEC2 - .2 + .2 * k, SEC2 + .6 + .2 * k, eout)
        if u <= 0: continue
        h = v * PPX * u; ca = a
        red = seg(t, EXC2 - .3, EXC2 + .3) if k == 0 else 0
        c.drawRRect(rrect(x, CBASE - h, 150, h, 10), paint(shade(GOLD if k == 0 else GREEN, -.55), .95 * ca))
        if k == 0 and red > 0:                                           # the excess ₹8 at the top
            c.drawRRect(rrect(x, CBASE - h, 150, 8 * PPX * u, 10), paint(RED, .85 * ca * red))
        c.drawRRect(rrect(x, CBASE - h, 150, h, 10), paint(GOLD if k == 0 else GREEN, .9 * ca, stroke=2.2))
        _mono(c, '₹%d' % v, x + 75, CBASE - h / 2 + 30, 40, WHITE, ca * u, 'c', glow=3)
        text(c, lab_, x + 75, CBASE + 34, 24, 700, DIM, ca * u, 'c')
    la = a * seg(t, EXC2 - .1, EXC2 + .4)
    if la > 0:                                                           # the market level carried across
        _dash(c, 1180, CBASE - 40 * PPX, 1550, CBASE - 40 * PPX, GREEN, .8 * la)
    st = seg(t, DIS2 + .1, DIS2 + 1.1, linr)
    if st > 0: stamp(c, 1262, CBASE - 48 * PPX - 64, 'DISALLOWED', RED, a, st, -8, 30)
    ea = a * seg(t, EIGHT2 - .2, EIGHT2 + .3, back)
    if ea > 0:
        chip(c, 1086, CBASE - 44 * PPX, '₹8 / kg', RED, ea, 28, fill=.3)
        text(c, 'excess', 1086, CBASE - 44 * PPX + 50, 24, 700, RED, ea, 'c')
        text(c, '₹40 / kg allowed', 1475, CBASE - 40 * PPX - 22, 24, 700, GREEN, ea, 'c')
    # the officer and his magnifier
    oa = a * seg(t, OFFICER1 - .5, OFFICER1)
    if oa > 0:
        ox = lerp(2060, 1740, seg(t, OFFICER1 - .5, OFFICER1 + .3, eout))
        person(c, ox, BASE_Y, .9, oa, 'officer', t, look=-.6, mood=-.2)
        mv = seg(t, DIS2 - .7, DIS2 - .1, ease)
        mx, my = lerp(TAG[0] + 10, 1255, mv), lerp(TAG[1], CBASE - 44 * PPX, mv)
        val = '₹48' if mv < .5 else '₹8'
        ma = a * seg(t, OFFICER1, OFFICER1 + .4) * (1 - seg(t, DIS2 + .2, DIS2 + .6))
        def lens(cv):
            cv.drawCircle(mx, my, 74, paint('#fff7e0' if mv < .5 else '#3b0a0a'))
            ftext(cv, val, mx, my + 18, 50, MONO, '#7c2d12' if mv < .5 else RED, 1, 'c')
        magnifier(c, mx, my - 6, 74, ma, -35, lens)

# ---------------------------------------------------------------- t3: specified persons — the family web
PB0, PB1 = T3 - .4, T4 - .1
NODES = (('spouse', 380, 540, SPOUSE3, 'b'), ('brother', 1010, 470, BRO3, 'r'), ('sister', 1010, 640, SIS3, 'r'),
         ('parents · grandparents', 700, 320, UP3, 'r'), ('children · grandchildren', 700, 770, DOWN3, 'r'))
BIZ = (1310, 440, 470, 320)

def _family(c, t):
    a = win(t, PB0, PB1, .45, .45)
    if a > 0:
        ia = a * seg(t, INDIV3 - .3, INDIV3 + .2, back)
        chip(c, 380, 330, 'for an individual', ACC, ia, 26)
        mx, my = 700, 640
        for lab_, x, y, tt, side in NODES:
            u = seg(t, tt - .25, tt + .35)
            if u <= 0: continue
            ex, ey = (x, y + (44 if y < my - 200 else -44)) if x == mx else (x + (44 if x < mx else -44), y)
            sx, sy = (mx, my - 178 if y < my else my) if x == mx else (mx + (-100 if x < mx else 100), my - 80)
            c.drawLine(sx, sy, lerp(sx, ex, u), lerp(sy, ey, u), paint(ACC, .6 * a, stroke=2.4))
            _node(c, x, y, a, u)
            la = a * seg(t, tt, tt + .3)
            if side == 'b': text(c, lab_, x, y + 84, 26, 800, WHITE, la, 'c')
            else: text(c, lab_, x + 64, y + 10, 26, 800, WHITE, la)
        da = a * seg(t, DIRECT3 - .2, DIRECT3 + .3)
        if da > 0:
            text(c, 'up the line', 600, 404, 24, 700, ACC, da, 'r')
            text(c, 'down the line', 600, 712, 24, 700, ACC, da * seg(t, DOWN3 - .2, DOWN3 + .2), 'r')
        # a business with a substantial interest (≥ 20%)
        x, y, w, h = BIZ
        ba = a * seg(t, BUSI3 - .3, BUSI3 + .2)
        if ba > 0:
            _box(c, x, y, w, h, GOLD, ba, .82)
            icon(c, 'factory', x + 70, y + 76, 1., GOLD, ba)
            text(c, 'a business', x + 130, y + 86, 30, 800, WHITE, ba)
            text(c, 'where she or', x + 30, y + 150, 26, 700, DIM, ba * seg(t, REL3 - .8, REL3 - .4))
            text(c, 'a relative holds', x + 30, y + 186, 26, 700, DIM, ba * seg(t, REL3 - .3, REL3 + .2))
            cx, cy, r = x + 340, y + 190, 82
            c.drawCircle(cx, cy, r, paint('#1b2540', ba)); c.drawCircle(cx, cy, r, paint(WHITE, .25 * ba, stroke=1.6))
            pu = seg(t, TWENTY3 - .3, TWENTY3 + .5, eout)
            if pu > 0:
                p = skia.Path(); p.moveTo(cx, cy); p.arcTo(skia.Rect(cx - r, cy - r, cx + r, cy + r), -90, 72 * pu, False); p.close()
                c.drawPath(p, paint(GOLD, .9 * ba))
            text(c, '≥ 20%', x + 30, y + 252, 50, 800, GOLD, ba * seg(t, TWENTY3 - .2, TWENTY3 + .2))
            text(c, 'substantial interest', x + 30, y + 294, 22, 700, GOLD, ba * seg(t, TWENTY3 + .1, TWENTY3 + .5))
            la = a * seg(t, BUSI3, BUSI3 + .5)
            _dash(c, 820, 560, lerp(820, x - 8, la), lerp(560, y + 150, la), GOLD, .7 * la)
    # Meera (shared with t1–t2)
    ma = win(t, CS - 1, PB1, .1, .45)
    if ma > 0:
        x, y, s = _meera_xy(t)
        person(c, x, y, s, ma, 'meera', t, look=.3 if t < T3 else 0., mood=.2)

# ---------------------------------------------------------------- t4 + t5: cash to one person in a day
PC0, PC1 = T4 - .4, T6 - .1
COLX, COLW, COLB = 1380, 130, 790
P10K = 110                                  # px per ₹10,000
LINE_Y = COLB - P10K
CLX = (480, 680, 880, 1080)

def _cash(c, t):
    a = win(t, PC0, PC1, .45, .45)
    if a <= 0: return
    CX = lerp(900, COLX, seg(t, T5 - .5, T5 + .5))           # centre-stage in t4, beside the supplier in t5
    person(c, 260, 790, .9, a, 'meera', t, look=.4)
    person(c, 1750, 790, .86, a * seg(t, CASH4 - .2, CASH4 + .3), 'supplier', t, look=-.4)
    oa = a * seg(t, ONE4 - .3, ONE4 + .2, back) * (1 - seg(t, T5 - .3, T5))
    chip(c, 1750, 556, 'one person', ACC, oa, 26)
    sa = a * win(t, SEC4 - .3, T5 + .3, .4, .5)
    if sa > 0:
        w = sec(c, 560, 330, '40A(3)', sa, size=30)
        text(c, 'cash to one person, in one day', 560 + w + 18, 340, 28, 800, WHITE, sa)
        da = sa * seg(t, SINGLE4 - .3, SINGLE4 + .2, back)
        if da > 0:
            icon(c, 'calendar', CX + COLW / 2 - 60, 400, .6, ACC, da)
            text(c, 'one day', CX + COLW / 2 - 24, 410, 26, 800, ACC, da)
    # the ₹10,000 line
    la = a * seg(t, TEN4 - .3, TEN4 + .2)
    if la > 0:
        _dash(c, CX - 70, LINE_Y, CX + COLW + 50, LINE_Y, WHITE, .85 * la, 3)
        text(c, '₹10,000', CX - 78, LINE_Y + 9, 26, 800, WHITE, la, 'r')
        text(c, 'a day', CX - 78, LINE_Y + 40, 22, 700, DIM, la, 'r')
    # t4: one cash payment that crosses the line
    ca = a * (1 - seg(t, T5 - .3, T5 + .2))
    if ca > 0:
        h = 168 * seg(t, CASH4 + .2, TEN4 + .8, ease)
        wr = seg(t, WHOLE4 - .2, WHOLE4 + .3)
        if h > 0:
            hb = min(h, P10K)
            c.drawRRect(rrect(CX, COLB - hb, COLW, hb, 8), paint(mixc(GREEN, RED, wr), .8 * ca))
            if h > P10K: c.drawRRect(rrect(CX, COLB - h, COLW, h - P10K, 8), paint(mixc(ORANGE, RED, wr), .85 * ca))
            c.drawRRect(rrect(CX, COLB - h, COLW, h, 8), paint(WHITE, .3 * ca, stroke=1.4))
            notes(c, CX + COLW / 2, COLB - h / 2, ca * .9, 2, .55)
        for k in range(4):                                               # notes fly from Meera
            u = seg(t, CASH4 + .15 * k, CASH4 + .9 + .15 * k, ease)
            if 0 < u < 1:
                notes(c, lerp(380, CX + COLW / 2, u), lerp(640, COLB - 80, u) - 160 * math.sin(math.pi * u), ca, 2, .6)
        if wr > 0:
            bx = CX + COLW + 18
            c.drawLine(bx, COLB - 168, bx, COLB, paint(RED, ca * wr, stroke=3))
            for yy in (COLB - 168, COLB): c.drawLine(bx - 10, yy, bx, yy, paint(RED, ca * wr, stroke=3))
            text(c, 'the whole payment', CX + COLW / 2, COLB - 226, 28, 800, RED, ca * wr, 'c')
            text(c, 'is disallowed', CX + COLW / 2, COLB - 190, 28, 800, RED, ca * seg(t, DIS4 - .2, DIS4 + .2), 'c')
        na = ca * seg(t, NOT4 - .2, NOT4 + .3)
        if na > 0:
            bx = CX - 18; yt = COLB - 168
            c.drawLine(bx, yt, bx, LINE_Y - 4, paint(ORANGE, na, stroke=3))
            text(c, 'not just the excess', bx - 16, (yt + LINE_Y) / 2 + 2, 26, 800, ORANGE, na, 'r')
        fl = ca * seg(t, ONE4 - .2, ONE4 + .4)
        if fl > 0:
            P = catmull(np.array([(CX + COLW + 10, COLB - 120), (1300, COLB - 190), (1640, COLB - 130)]))
            c.drawPath(poly(P, False), paint(GOLD, .25 * fl, stroke=3))
            flowdots(c, P, ((t - ONE4) * .6) % 1, fl, GOLD, 6, 5.)
    # t5: four payments of ₹8,000 through the day
    fa = a * seg(t, T5 - .2, T5 + .3)
    if fa <= 0: return
    tq = fa * (1 - seg(t, TOTAL5 - .3, TOTAL5))
    p1 = 'four cash payments'
    text(c, p1, 392, 420, 30, 800, WHITE, tq * seg(t, T5 - .1, T5 + .3))
    text(c, 'of ₹8,000 each', 392 + text_w(p1, 30, 800) + 14, 420, 30, 800, GOLD, tq * seg(t, EIGHT5 - .2, EIGHT5 + .3))
    sp = fa * win(t, SUPP5 - .2, TOTAL5, .3, .4)
    if sp > 0: chip(c, 1750, 556, 'same supplier', ACC, sp, 26)
    stack = 0
    for k, (x, tt) in enumerate(zip(CLX, PAY_T)):
        u = seg(t, tt - .25, tt + .35, back)
        hh, mm = ((10, 0), (12, 0), (15, 0), (18, 0))[k]
        ph = fa * (1 - .55 * seg(t, TOTAL5 + .15 * k - .4, TOTAL5 + .15 * k - .1))
        if t < tt - .25:                                                 # placeholders for the four payments
            p = paint(DIM, .4 * fa * seg(t, T5 + .1 * k, T5 + .4 + .1 * k), stroke=2, cap=False)
            p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
            c.drawRRect(rrect(x - 88, 670 - 56, 176, 112, 10), p); c.drawCircle(x, 500, 38, p)
            continue
        clock_face(c, x, 500, 38 * (.7 + .3 * u), hh, mm, ph, ACC)
        _mono(c, '%d:00' % hh, x, 568, 26, WHITE, ph * u, 'c')
        fly = seg(t, TOTAL5 + .15 * k - .4, TOTAL5 + .15 * k + .2, ease)
        bx, by = lerp(x, CX + COLW / 2, fly), lerp(670, COLB - 44 - 88 * k, fly)
        if fly < 1:
            bill(c, bx, by, fa * u, 'Supplier', 8000, 'cash', None, lerp(.74, .55, fly))
            ea = fa * seg(t, EACH5 - .1 + .12 * k, EACH5 + .2 + .12 * k) * (1 - fly)
            if ea > 0: tick(c, x + 80, 616, ea, 16)
        if fly > .95: stack += 1
    if t > EACH5 - .2:
        text(c, 'each under ₹10,000', 780, 790, 26, 800, GREEN, fa * seg(t, EACH5, EACH5 + .4) * (1 - seg(t, TOTAL5, TOTAL5 + .4)), 'c')
    red = seg(t, ALL5 - .2, ALL5 + .4)
    for k in range(stack):
        y0 = COLB - 88 * (k + 1)
        c.drawRRect(rrect(CX, y0 + 2, COLW, 84, 8), paint(mixc(GOLD if y0 + 88 > LINE_Y else ORANGE, RED, red), .85 * fa))
        _mono(c, '₹8,000', CX + COLW / 2, y0 + 52, 24, '#1a1305', fa, 'c')
    if stack:
        ra = fa * seg(t, THIRTY5 - .2, THIRTY5 + .3)
        roll(c, 32000, CX + COLW / 2, COLB - 88 * 4 - 26, seg(t, THIRTY5 - .1, THIRTY5 + .6), 38, mixc(GOLD, RED, red), ra, 'c', glow=3)
        text(c, "the day's total", CX + COLW / 2, COLB - 88 * 4 - 76, 24, 700, DIM, ra, 'c')
    st = seg(t, DIS5 - .3, DIS5 + .7, linr)
    if st > 0:
        stamp(c, 880, 690, 'DISALLOWED', RED, fa, st, -6, 40)
        text(c, 'all ₹32,000', 880, 792, 32, 800, RED, fa * seg(t, DIS5, DIS5 + .3), 'c')

# ---------------------------------------------------------------- t6: safe modes, and the transporter's limit
PD0, PD1 = T6 - .4, T7 - .1
TX0, TW_, TG, TY0, TH_ = 120, 230, 20, 350, 180

def _modes(c, t):
    a = win(t, PD0, PD1, .45, .45)
    if a <= 0: return
    ha = a * seg(t, SAFE6 - .3, SAFE6 + .2)
    text(c, 'Safe modes: never disallowed under § 40A(3)', TX0, 310, 30, 800, GREEN, ha)
    for k, (lab_, ic, tt) in enumerate(MODES):
        u = seg(t, tt - .25, tt + .25)
        if u <= 0: continue
        x = TX0 + (k % 4) * (TW_ + TG); y = TY0 + (k // 4) * (TH_ + 24) + 14 * (1 - u)
        g = win(t, tt - .1, tt + 1.2, .15, .6)
        tile(c, x, y, TW_, TH_, ic, lab_, a * u, GREEN if k < 2 else ACC, True, 24, g)
    ly = TY0 + 2 * TH_ + 24 + 58
    for k, (lab_, col, tt) in enumerate((('account payee cheque or draft', GREEN, MODES[0][2]), ('electronic modes', ACC, ELEC6))):
        ea = a * seg(t, tt - .2, tt + .3)
        if ea <= 0: continue
        lx = TX0 + 6 + k * 470
        c.drawRRect(rrect(lx, ly - 18, 22, 22, 6), paint(col, .8 * ea))
        text(c, lab_, lx + 34, ly, 24, 700, col, ea)
    # the transporter
    tu = seg(t, TRANS6 - .4, TRANS6 + 1.2, eout)
    if tu > 0:
        tx = lerp(2150, 1500, tu)
        truck(c, tx, 740, 1.05, a, 'light', ORANGE, 'Goods carriage', t, (1 - tu) * 4)
        text(c, 'hiring out goods carriages', 1500, 520, 26, 700, WHITE, a * seg(t, TRANS6 + .3, TRANS6 + .7), 'c')
    la = a * seg(t, THIRTY6 - .3, THIRTY6 + .2, back)
    if la > 0:
        c.drawRRect(rrect(1300, 364, 400, 100, 22), paint('#1a1305', .92 * la))
        c.drawRRect(rrect(1300, 364, 400, 100, 22), paint(GOLD, la, stroke=2.2))
        text(c, 'cash limit', 1500, 398, 24, 800, GOLD, la, 'c', track=1)
        roll(c, 35000, 1500, 448, seg(t, THIRTY6 - .1, THIRTY6 + .6), 40, GOLD, la, 'c', glow=3)

# ---------------------------------------------------------------- t7: allowed last year, paid in cash this year
PE0, PE1 = T7 - .4, T8 - .1
LP, RP = (120, 300, 740, 470), (1060, 300, 740, 470)

def _deemed(c, t):
    a = win(t, PE0, PE1, .45, .45)
    if a <= 0: return
    for k, ((x, y, w, h), ttl, sub, tt) in enumerate(((LP, 'Last year', 'P.Y. 2024-25', EXP7 - .3),
                                                     (RP, 'This year', 'P.Y. 2025-26', PAYS7 - .4))):
        pa = a * seg(t, tt, tt + .4)
        if pa <= 0: continue
        _box(c, x, y, w, h, ACC if k == 0 else GOLD, pa, .84)
        text(c, ttl, x + 32, y + 52, 32, 800, WHITE, pa)
        text(c, sub, x + w - 32, y + 50, 26, 700, DIM, pa, 'r')
    # last year: the expense, unpaid, allowed
    ba = a * seg(t, EXP7 - .1, EXP7 + .3)
    if ba > 0:
        bill(c, 400, 500, ba, 'Expense (unpaid)', None, 'credit', None, 1.15, -3, ACC)
        stamp(c, 640, 600, 'ALLOWED', GREEN, a, seg(t, ALLOW7, ALLOW7 + .9, linr), -8, 36)
        text(c, 'deducted last year', 490, 720, 26, 700, GREEN, a * seg(t, LAST7 - .1, LAST7 + .3), 'c')
    # this year: paid in cash
    u = seg(t, PAYS7 - .2, CASH7 + .5, ease)
    if u > 0:
        arrow(c, 870, 520, lerp(870, 1040, u), 520, ACC, 4, a, 18)
        bill(c, 1250, 490, a * u, 'Expense paid', None, 'cash', None, 1.1, 3, GOLD)
        ca = a * seg(t, CASH7 + .1, CASH7 + .5, back)
        chip(c, 1290, 618, 'cash above ₹10,000 in a day', RED, ca, 26)
        notes(c, 1580, 500, ca, 3, .8, 8)
    st = seg(t, INC7 - .2, INC7 + .8, linr)
    if st > 0: stamp(c, 1360, 706, 'DEEMED INCOME', GOLD, a, st, -5, 32, 'this year')
    sa = a * seg(t, SEC7 - .3, SEC7 + .2, back)
    if sa > 0:
        sec(c, RP[0] + RP[2] - 28, 712, '40A(3A)', sa, size=26, align='r')

# ---------------------------------------------------------------- t8: Rule 6DD exceptions
PF0, PF1 = T8 - .4, T9 - .1
EX0, EXW, EXG, EXY, EXH = 120, 316, 30, 360, 290

def _farmer_icon(c, cx, cy, s):
    person(c, cx - 30, cy + 60, .4, 1., 'farmer', 0., mood=.3, blink=False)
    icon(c, 'wheat', cx + 62, cy + 16, .9, GOLD, 1.)

def _village_icon(c, cx, cy, s):
    icon(c, 'house', cx - 36, cy, 1.25, ACC, 1.)
    icon(c, 'bank', cx + 50, cy + 10, .75, '#94a3b8', 1.)
    cross(c, cx + 50, cy + 10, 1., 30)

def _rule6dd(c, t):
    a = win(t, PF0, PF1, .45, .45)
    if a <= 0: return
    ha = a * seg(t, RULE8 - .3, RULE8 + .2)
    w = sec(c, EX0, 312, 'Rule 6DD', ha, size=30, mark='')
    text(c, 'cash is not disallowed when…', EX0 + w + 20, 322, 30, 800, WHITE, ha)
    icons = ('bank', 'building', _farmer_icon, _village_icon, 'piggy')
    for k, (tt, lab_) in enumerate(EXC8):
        u = seg(t, tt - .3, tt + .25)
        if u <= 0: continue
        x = EX0 + k * (EXW + EXG); y = EXY + 16 * (1 - u)
        g = win(t, tt - .1, tt + 1.4, .15, .7)
        tile(c, x, y, EXW, EXH, icons[k], lab_ if k < 4 else 'Retirement benefit', a * u, GREEN, True, 25, g)
        if k == 4:
            ra = a * seg(t, FIFTY8 - .2, FIFTY8 + .3)
            text(c, 'up to', x + EXW / 2 - 70, y + EXH + 50, 26, 700, WHITE, ra, 'c')
            roll(c, 50000, x + EXW / 2 + 40, y + EXH + 52, seg(t, FIFTY8 - .1, FIFTY8 + .6), 32, GOLD, ra, 'c')
    la = a * seg(t, RULE8 + 1.2, RULE8 + 1.8)
    text(c, 'a few of the exceptions in Rule 6DD', EX0, EXY + EXH + 120, 24, 700, DIM, la * .9)

# ---------------------------------------------------------------- t9: gratuity provision, approved and unapproved funds
PG0, PG1 = T9 - .4, T10 - .1
GP = ((120, 'Provision for gratuity', 'only an entry in the books', RED, PROV9, '40A(7)', S7_9),
      (700, 'Actually paid', 'or contributed to an approved fund', GREEN, PAYM9, None, None),
      (1280, 'Unapproved staff fund', 'contribution blocked', RED, UNAP9, '40A(9)', S9_9))

def _funds(c, t):
    a = win(t, PG0, PG1, .45, .45)
    if a <= 0: return
    for k, (x, ttl, sub, col, tt, sc_, ts) in enumerate(GP):
        pa = a * seg(t, tt - .3, tt + .2)
        if pa <= 0: continue
        w, y, h = 520, 300, 470
        _box(c, x, y, w, h, col if k != 0 or t > DED9 - .2 else ACC, pa, .84)
        text(c, ttl, x + 30, y + 52, 30, 800, WHITE, pa)
        text(c, sub, x + 30, y + 90, 24, 700, DIM, pa)
        if sc_: sec(c, x + w - 24, y + h - 40, sc_, pa * seg(t, ts - .3, ts + .2, back), size=26, align='r')
        cx = x + w / 2
        if k == 0:                                                       # a book entry, no money moves
            c.drawRRect(rrect(x + 50, y + 150, w - 100, 150, 10), paint(CREAM, pa))
            for j in range(3): c.drawLine(x + 70, y + 196 + j * 38, x + w - 70, y + 196 + j * 38, paint(PAPER_LINE, pa, stroke=1.4))
            text(c, 'Provision for gratuity', x + 72, y + 186, 24, 800, INK, pa)
            ftext(c, 'Dr P&L', x + 72, y + 262, 24, MONO, '#6b6452', pa, 'l', 400)
            p = paint(GOLD, .8 * pa, stroke=2.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([6, 6], 0))
            c.drawCircle(x + w - 110, y + 250, 26, p)
            text(c, 'not paid', x + w - 110, y + 336, 24, 700, GOLD, pa, 'c')
            if t > DED9 - .2: cross(c, x + w - 46, y + 46, pa * seg(t, DED9 - .2, DED9 + .2, back), 22)
        elif k == 1:
            fill = seg(t, APPR9 - .6, APPR9 + 2.5)
            _jar(c, cx - 100, y + 170, 200, 210, pa, fill * .8, GREEN)
            text(c, 'approved gratuity fund', cx, y + 420, 24, 700, GREEN, pa * seg(t, APPR9 - .2, APPR9 + .2), 'c')
            for j in range(3):
                q = ((t - PAYM9) * .9 + j / 3) % 1
                coin(c, cx + 30 * (j - 1), lerp(y + 110, y + 260, q), 16, pa * min(1, q * 5) * min(1, (1 - q) * 5) * seg(t, PAYM9, PAYM9 + .3), GOLD, '₹', q * 8)
            if t > APPR9 - .2: tick(c, x + w - 46, y + 46, pa * seg(t, APPR9 - .2, APPR9 + .2, back), 22)
        else:
            lock = seg(t, BLOCK9 - .3, BLOCK9 + .2, back)
            _jar(c, cx - 100, y + 190, 200, 190, pa, 0., '#94a3b8', lock)
            text(c, 'staff fund, not approved', cx, y + 420, 24, 700, DIM, pa, 'c')
            for j in range(2):
                q = ((t - UNAP9) * .8 + j / 2) % 1
                yy = lerp(y + 110, y + 150, q) - 40 * math.sin(math.pi * q) * lock
                coin(c, cx - 60 + 120 * j + (40 * q * (1 if j else -1)) * lock, yy, 16, pa * min(1, q * 5) * min(1, (1 - q) * 4), GOLD, '₹', q * 8)
            if t > BLOCK9 - .2: cross(c, x + w - 46, y + 46, pa * seg(t, BLOCK9 - .2, BLOCK9 + .2, back), 22)

# ---------------------------------------------------------------- t10: exam — a calm belt through the § 40A(3) scanner
PH0, PH1 = T10 - .4, T11 - .1
BELT, GXc, SPD, GAP = 650, 960, 58., 420
ITEMS = (('A/c payee cheque', 'cheque', True), ('Cash payment', 'cash', False), ('UPI transfer', 'upi', True),
         ('A/c payee draft', 'draft', True))

def _exam(c, t):
    a = win(t, PH0, PH1, .6, .45)
    if a <= 0: return
    for k, (lab_, tt) in enumerate((('to a person', PERS10), ('in a day', DAY10), ('above ₹10,000', EXCD10))):
        chip(c, 700 + k * 260, 330, lab_, GOLD if k == 2 else ACC, a * seg(t, tt - .2, tt + .3, back), 26)
    x0, x1 = 240, 1680
    conveyor(c, x0, x1, BELT, a, t, SPD)
    pos = []
    for k, (lab_, mode, ok) in enumerate(ITEMS):
        x = x0 - 120 + ((t - T10) * SPD + k * GAP + 300) % (len(ITEMS) * GAP)
        if x < x0 - 110 or x > x1 + 110: continue
        pos.append((x, lab_, mode, ok))
    state = 0.
    for x, lab_, mode, ok in pos:
        d = abs(x - GXc)
        if d < 120: state = (1 if ok else -1) * clamp(1 - d / 120) * 1.4
    state = clamp(state, -1, 1)
    scanner_back(c, GXc, BELT, a, '40A(3)', state, t, 230, 230)
    for x, lab_, mode, ok in pos:
        ea = a * clamp((x - x0 + 110) / 80) * clamp((x1 + 110 - x) / 80)
        after = x > GXc + 60
        stp = ('DISALLOWED', RED, clamp((x - GXc - 60) / 120)) if (after and not ok) else None
        bill(c, x, BELT - 62, ea, lab_, None, mode, None, .78, 0, GREEN if ok else RED, stp)
        if after and ok: tick(c, x + 76, BELT - 128, ea * clamp((x - GXc - 60) / 60), 16)
    scanner_front(c, GXc, BELT, a, '40A(3)', state, t, 230, 230)
    da = a * seg(t, DIS10 - .3, DIS10 + .3)
    text(c, 'cash above ₹10,000 to a person in a day → disallowed', 960, 810, 26, 700, RED, da * .95, 'c')

# ---------------------------------------------------------------- t11 check: milk from a dairy farmer
PI0 = T11 - .4

def _milkcan(c, x, y, s, a):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-46, -8, 92, 16), paint(BLACK, .4 * a, blur=6))
    body = skia.Path(); body.moveTo(-40, 0); body.lineTo(-40, -70); body.quadTo(-40, -92, -22, -100); body.lineTo(-22, -118)
    body.lineTo(22, -118); body.lineTo(22, -100); body.quadTo(40, -92, 40, -70); body.lineTo(40, 0); body.close()
    c.drawPath(body, paint(shader=lgrad((-40, 0), (40, 0), ['#8a97b3', '#e5ebf5', '#9aa6c0']), a=a))
    c.drawRRect(rrect(-26, -128, 52, 12, 5), paint('#6b7896', a))
    c.drawRect(skia.Rect(-40, -44, 40, -34), paint('#6b7896', .7 * a))
    text(c, 'MILK', 0, -54, 20, 800, '#1f2a44', a, 'c', track=1)
    c.restore()

def _check(c, t):
    a = seg(t, PI0, PI0 + .5)
    if a <= 0: return
    fa = a * seg(t, DAIRY11 - .3, DAIRY11 + .2)
    person(c, 600, 1000, .66, fa, 'farmer', t, look=.4, mood=.3 + .4 * seg(t, A_NO, A_NO + .5))
    _milkcan(c, 770, 995, 1.1, a * seg(t, MILK11 - .3, MILK11 + .1))
    ba = a * seg(t, W('t11', 'sixty') - .3, W('t11', 'sixty') + .1)
    stp = ('ALLOWED', GREEN, seg(t, A_NO, A_NO + .9, linr)) if t > A_NO else None
    bill(c, 1010, 878, ba, 'Milk', 60000, 'cash', None, .9, -2, GOLD, stp)
    da = a * seg(t, DAY11 - .3, DAY11 + .2, back)
    chip(c, 1010, 980, 'in cash, in one day', ACC, da, 24)
    ra = a * seg(t, A_PROD - .3, A_PROD + .3, back)
    if ra > 0:
        chip(c, 1450, 900, 'Rule 6DD · bought from the producer', GREEN, ra, 26)

def ch_t(c, t):
    if t < CS - .5 or t > CE + .5: return
    _mill(c, t)
    _family(c, t)
    _cash(c, t)
    _modes(c, t)
    _deemed(c, t)
    _rule6dd(c, t)
    _funds(c, t)
    _exam(c, t)
    _check(c, t)
