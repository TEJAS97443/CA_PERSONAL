"""Chapter M — Scientific research (section 35).
m1  hook: Meera's Bakehouse at dawn, Meera beside it; a small research bench slides in on "lab"; a sugar-free cake
    under a glass dome on a pedestal; a "Research cost?" bill hovers over the lab with a pulsing "?"
m2  a gold spotlight falls on the lab; "RESEARCH" lights up in it; a § 35 chip; "special treatment" and
    "even when it's capital" badges
m3  the shop leaves, the lab moves to the head of a conveyor; a scanner gate "§ 35(1)(i)" stands over the belt and a
    "deducted in full" tray waits at its end; research coins ride through, the gate turns green on "deducted in
    full" (100%); the scientist's salary and the ingredients bills ride through as named and are ticked in the tray
m4  the gate turns into "§ 35(1)(iv)" (capital): a lab building standing on its land plot rides in; it passes green
    ("in the year she spends it"), but on "except land" the land plot is cut away and drops off the belt (red ✕),
    "land never counts"; only the building reaches the tray
m5  example: the computation sheet — salaries and materials ₹3,00,000 · lab building ₹7,50,000 less land ₹5,00,000
    = ₹2,50,000 · deduction ₹5,50,000; beside it the two bills (₹3,00,000) and the building on its land with tags
    ₹7,50,000 → land ₹5,00,000 cut away (red) → building ₹2,50,000 (green)
m6  a strip of years: three "before" years (research spend in each) | business starts | Year 1; the spend folds
    into Year 1 ("deducted in the year the business begins")
m7  trap: the lab asset "deducted 100% · § 35" → an arrow to "Depreciation § 32" which is crossed out; on "sells it"
    sale price vs deduction bars, the sale price is cut at the deduction line (lower of the two) and flows into
    "business income · § 41(3)" with a TAXED stamp
m8  Meera pays outsiders: four tiles (university, research body, company, laboratory, all "approved") light as named
    and coins flow to them; "deductible at 100%" is padlocked behind the regime switch (Default) and unlocks when
    the switch flips to "Opted out"
m9  example: two-column sheet Default / Opted out — in-house ₹5,50,000 · approved university ₹0 / ₹1,00,000 · deduction
    ₹5,50,000 / ₹6,50,000, with a ₹1,00,000 cheque and the regime switch flipping as each regime is named; two big
    totals side by side
m10 check: below the card, a profit bar too short for the research deduction; the answer sends the unused part
    down an endless carry-forward track (∞) and crosses out "Salaries"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('m')
M1, M2, M3, M4, M5, M6, M7, M8, M9, M10 = (T('m%d' % k) for k in range(1, 11))
M10A = TA('m10')

# ---------------------------------------------------------------- word times
SUGAR1, CAKE1, SETS1, LAB1, SHOULD1, COST1 = (W('m1', 'sugar'), W('m1', 'cake'), W('m1', 'sets'), W('m1', 'lab'),
                                              W('m1', 'should'), W('m1', 'cost'))
LAW2, RES2, SEC2, SPEC2, EVEN2, CAPI2 = (W('m2', 'law'), W('m2', 'research'), W('m2', 'thirty'), W('m2', 'special'),
                                         W('m2', 'even'), W('m2', 'capital'))
REV3, OWN3, DED3, FULL3, SAL3, ING3 = (W('m3', 'revenue'), W('m3', 'own'), W('m3', 'deducted'), W('m3', 'full'),
                                       W('m3', 'salary'), W('m3', 'ingredients'))
CAP4, FULL4, YEAR4, EXC4, LAND4, NEVER4 = (W('m4', 'capital'), W('m4', 'full'), W('m4', 'year'), W('m4', 'except'),
                                           W('m4', 'land', occ=1), W('m4', 'never'))
THREE5, SAL5, SEVEN5, BLDG5, FIVE5, LANDW5 = (W('m5', 'three'), W('m5', 'salaries'), W('m5', 'seven'),
                                              W('m5', 'building'), W('m5', 'five'), W('m5', 'land'))
DEDN5, THREE5B, PLUS5, TWO5, THAT5, FIVE5B = (W('m5', 'deduction'), W('m5', 'three', occ=1), W('m5', 'plus'),
                                              W('m5', 'two'), W('m5', 'that'), W('m5', 'five', occ=1))
BEF6, STARTS6, THREE6, BEFORE6B, DED6, BEGINS6 = (W('m6', 'before'), W('m6', 'starts'), W('m6', 'three'),
                                                  W('m6', 'before', occ=1), W('m6', 'deducted'), W('m6', 'begins'))
DOUBLE7, ASSET7, DED7, NO7, DEP7, SELLS7 = (W('m7', 'double'), W('m7', 'asset'), W('m7', 'deducted'),
                                            W('m7', 'no', occ=1), W('m7', 'depreciation'), W('m7', 'sells'))
SALE7, UPTO7, DEDN7, TAXED7, BUS7 = (W('m7', 'sale'), W('m7', 'up'), W('m7', 'deduction'), W('m7', 'taxed'),
                                     W('m7', 'business'))
PAY8, DIFF8, MONEY8, APPR8, UNI8, RB8, CO8, LAB8 = (W('m8', 'paying'), W('m8', 'different'), W('m8', 'money'),
                                                    W('m8', 'approved'), W('m8', 'university'), W('m8', 'research'),
                                                    W('m8', 'company'), W('m8', 'lab'))
HUND8, ONLY8, OPTS8, DEF8 = W('m8', 'hundred'), W('m8', 'only'), W('m8', 'opts'), W('m8', 'default')
ONE9, UNI9, DEF9, FIVE9, OPTS9, SIX9 = (W('m9', 'one'), W('m9', 'university'), W('m9', 'default'), W('m9', 'five'),
                                        W('m9', 'opts'), W('m9', 'six'))
SMALL10, DEDN10, CARRY10 = W('m10', 'small'), W('m10', 'deduction'), W('m10', 'carry')
YES10, LIMIT10, UNABS10, ANY10, SALS10 = (W('m10a', 'yes'), W('m10a', 'limit'), W('m10a', 'unabsorbed'),
                                          W('m10a', 'any'), W('m10a', 'salaries'))

for tt, k in ((LAB1, 'pop'), (CAKE1, 'blip'), (SHOULD1, 'pop'), (RES2 - .2, 'whoosh'), (SEC2, 'blip'),
              (M3 - .2, 'whoosh'), (DED3, 'ok'), (SAL3 + 1.3, 'tick'), (ING3 + 1.3, 'tick'),
              (FULL4, 'ok'), (EXC4 + .1, 'error'),
              (THREE5, 'tick'), (FIVE5, 'snip'), (FIVE5B, 'chime'),
              (DED6, 'whoosh'), (BEGINS6, 'ok'),
              (NO7, 'error'), (TAXED7 + .12, 'thunk'),
              (ONLY8, 'key'), (OPTS8 + .2, 'key'),
              (ONE9, 'pop'), (SIX9, 'chime'),
              (LIMIT10, 'ok'), (SALS10, 'error')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
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

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l', glow=0.):
    return ftext(c, s, x, y, size, MONO, col, a, align, 700, glow)

def _strike(c, x0, x1, y, u, a, col=RED):
    if u <= 0 or a <= 0: return
    c.drawLine(x0, y, lerp(x0, x1, clamp(u)), y - 2, paint(col, .95 * a, stroke=3.6))

def _mortarboard(c, x, y, s, col, a=1.):
    """Graduation cap line icon (university), 64 px at s=1, centred."""
    if a <= 0: return
    st = paint(col, a, stroke=3.2 * s)
    p = skia.Path(); p.moveTo(x - 28 * s, y - 6 * s); p.lineTo(x, y - 18 * s); p.lineTo(x + 28 * s, y - 6 * s)
    p.lineTo(x, y + 6 * s); p.close(); c.drawPath(p, st)
    q = skia.Path(); q.moveTo(x - 16 * s, y + 1 * s); q.lineTo(x - 16 * s, y + 14 * s)
    q.quadTo(x, y + 24 * s, x + 16 * s, y + 14 * s); q.lineTo(x + 16 * s, y + 1 * s); c.drawPath(q, st)
    c.drawLine(x + 22 * s, y - 3 * s, x + 22 * s, y + 16 * s, paint(col, a, stroke=2.4 * s))
    c.drawCircle(x + 22 * s, y + 19 * s, 3 * s, paint(col, a))

def _microscope(c, x, y, s, col, a=1.):
    """Microscope line icon (laboratory), 64 px at s=1, centred."""
    if a <= 0: return
    st = paint(col, a, stroke=3.2 * s)
    c.drawLine(x - 20 * s, y + 24 * s, x + 20 * s, y + 24 * s, st)
    c.save(); c.translate(x - 4 * s, y - 8 * s); c.rotate(-28)
    c.drawRRect(rrect(-6 * s, -20 * s, 12 * s, 32 * s, 3 * s), st); c.restore()
    p = skia.Path(); p.moveTo(x + 12 * s, y + 24 * s); p.quadTo(x + 20 * s, y + 4 * s, x + 6 * s, y - 10 * s); c.drawPath(p, st)
    c.drawLine(x - 12 * s, y + 10 * s, x + 6 * s, y + 10 * s, paint(col, a, stroke=2.4 * s))

def _flask_icon(c, x, y, s, col, a=1.): icon(c, 'flask', x, y, s, col, a)

def _pedestal(c, x, y, a, t):
    """A display pedestal (top surface centre at x, y) with a sugar-free cake under a glass dome."""
    if a <= 0: return
    c.drawRRect(rrect(x - 70, y, 140, 150, 8), paint(shader=lgrad((x - 70, 0), (x + 70, 0), ['#2b3550', '#46557a', '#2b3550']), a=a))
    c.drawRRect(rrect(x - 88, y - 14, 176, 18, 6), paint(shader=lgrad((0, y - 14), (0, y + 4), ['#5b6b92', '#36415e']), a=a))
    c.drawRRect(rrect(x - 88, y + 146, 176, 16, 6), paint('#2a3248', a))
    c.drawOval(skia.Rect(x - 120, y + 150, x + 120, y + 178), paint(BLACK, .35 * a))
    cake(c, x, y - 12, .9, a, 'slice')
    # glass dome
    d = skia.Path(); d.moveTo(x - 82, y - 14); d.lineTo(x - 82, y - 96); d.quadTo(x - 82, y - 168, x, y - 170)
    d.quadTo(x + 82, y - 168, x + 82, y - 96); d.lineTo(x + 82, y - 14)
    c.drawPath(d, paint(WHITE, .05 * a)); c.drawPath(d, paint(WHITE, .45 * a, stroke=2))
    g = .5 + .5 * math.sin(t * 1.3)
    c.drawLine(x - 60, y - 110, x - 48, y - 146, paint(WHITE, (.25 + .2 * g) * a, stroke=4))
    c.drawCircle(x, y - 175, 6, paint('#c3cad8', a))

def _spot(c, cx, top, bot, w0, w1, a):
    """A soft gold spotlight cone from (cx, top) widening to w1 at bot, with a floor pool."""
    if a <= 0: return
    p = skia.Path(); p.moveTo(cx - w0 / 2, top); p.lineTo(cx + w0 / 2, top); p.lineTo(cx + w1 / 2, bot); p.lineTo(cx - w1 / 2, bot); p.close()
    c.drawPath(p, paint(shader=lgrad((0, top), (0, bot), [(GOLD, .02), (GOLD, .16)]), a=a))
    c.drawOval(skia.Rect(cx - w1 * .55, bot - 34, cx + w1 * .55, bot + 30), paint(shader=rgrad(cx, bot, w1 * .55, [(GOLD, .3), (GOLD, 0)]), a=a))

# ---------------------------------------------------------------- m1–m4: the lab, the belt and the gate
SHOP = (420, 790); MEERA = (770, 800); LABA = (1190, 800, 1.05); LABB = (250, 806, .72); PED = (1585, 620)
BELT_Y, BX0, BX1, GATE_X = 700, 440, 1440, 905
TRAY = (1480, 470, 340, 332)
BILL_Y = BELT_Y - 53

def _lab_pos(t):
    u = seg(t, M3 - .5, M3 + .6)
    return lerp(LABA[0], LABB[0], u), lerp(LABA[1], LABB[1], u), lerp(LABA[2], LABB[2], u)

def _stage1(c, t):
    """m1–m2: the shop, Meera, the lab, the cake and the spotlight."""
    a = 1 - seg(t, M3 - .5, M3 + .3)
    if a <= 0: return
    sx = -260 * seg(t, M3 - .5, M3 + .3, ein)
    ia = seg(t, CS - .2, CS + .6)
    shop(c, SHOP[0] + sx, SHOP[1], .95, a * ia, t, lit=.6 + .4 * seg(t, M1, M1 + 2.5))
    person(c, MEERA[0] + sx, MEERA[1], .95, a * ia, 'meera', t, talk=0., look=.5 * seg(t, SETS1 - .3, SETS1 + .3), mood=.4)
    pa = a * seg(t, SUGAR1 - .3, SUGAR1 + .3)
    if pa > 0:
        dy = 30 * (1 - seg(t, SUGAR1 - .3, SUGAR1 + .4, eout))
        _pedestal(c, PED[0] - sx * .2, PED[1] + dy, pa, t)
        chip(c, PED[0], PED[1] + 196, 'sugar-free', GREEN, pa * seg(t, CAKE1 - .1, CAKE1 + .3), 26)
    # spotlight (m2)
    sa = a * seg(t, RES2 - .4, RES2 + .3)
    if sa > 0:
        _spot(c, LABA[0], 250, 800, 120, 560, sa * (.85 + .15 * math.sin(t * 2)))
        k = seg(t, RES2 - .2, RES2 + .5, back)
        text(c, 'RESEARCH', LABA[0], 360, 60 * (.8 + .2 * k), 800, GOLD, sa, 'c', track=8, shadow=10)
        sec(c, LABA[0], 425, '35', sa * seg(t, SEC2 - .2, SEC2 + .3), size=30, align='c')
        ba = sa * seg(t, SPEC2 - .2, SPEC2 + .3, back)
        if ba > 0: chip(c, LABA[0] - 330, 500, 'special treatment', GOLD, ba, 28)
        ca = sa * seg(t, CAPI2 - .45, CAPI2 + .1, back)
        if ca > 0: chip(c, LABA[0] + 340, 500, 'even when it’s capital', VIO, ca, 28)
    # the question (m1)
    qa = a * seg(t, SHOULD1 - .3, SHOULD1 + .3) * (1 - seg(t, RES2 - .6, RES2 - .1))
    if qa > 0:
        bob = 6 * math.sin(t * 2.2)
        bill(c, LABA[0] - 10, 420 + bob, qa, 'Research cost', None, None, sc=.8, ang=-4)
        text(c, '?', LABA[0] + 120, 420 + bob, 72, 800, GOLD, qa * (.6 + .4 * math.sin((t - SHOULD1) * 5)), 'c', shadow=8)

def _lab(c, t):
    """The research bench (it travels from the m1 spot to the head of the belt)."""
    a = seg(t, SETS1 - .4, LAB1 + .2) * (1 - seg(t, M5 - .7, M5 - .1))
    if a <= 0: return
    x, y, s = _lab_pos(t)
    if t < M3 - .5:
        u = seg(t, SETS1 - .4, LAB1 + .25, eout); x += 240 * (1 - u)
    lab_bench(c, x, y, s, a, t)

def _gate_label(t): return '35(1)(i)' if t < CAP4 - .15 else '35(1)(iv)'

COINS3 = [REV3 + .3 + .75 * k for k in range(7)]
def _coin_xy(t, t0):
    """A research coin: hops from the lab onto the belt, rides through the gate into the tray."""
    if t < t0: return None
    x0, y0 = LABB[0] + 40, 640
    u = (t - t0)
    if u < .45:
        q = u / .45; return lerp(x0, BX0 + 30, q), lerp(y0, BELT_Y - 16, q) - 70 * math.sin(math.pi * q), 1.
    x = BX0 + 30 + (u - .45) * 330
    if x < BX1 - 10: return x, BELT_Y - 16, 1.
    q = clamp((x - BX1 + 10) / 160); return lerp(BX1 - 10, 1560, q), lerp(BELT_Y - 16, 720, q) - 40 * math.sin(math.pi * q), 1 - q

def _bill_path(t, t0, t_gate, t_out, x_end=1600, y_end=690):
    """Bill centre on the belt: drop from the lab (t0), ride to the gate (t_gate), on to the tray (t_out)."""
    ks = [(t0, (LABB[0] + 40, 600)), (t0 + .45, (BX0 + 70, BILL_Y)), (t_gate, (GATE_X, BILL_Y)),
          (t_out - .45, (BX1 - 40, BILL_Y)), (t_out, (x_end, y_end))]
    return keys(t, ks, ease)

BILLS3 = [("Scientist's salary", 'bank', SAL3 - .25), ('Ingredients', 'upi', ING3 - .25)]
TRAY_LINES = [("Scientist's salary", GREEN, SAL3 - .25 + 2.2), ('Ingredients', GREEN, ING3 - .25 + 2.2),
              ('Lab building', GREEN, EXC4 + 1.5), ('Land', RED, NEVER4 - .1)]

def _belt(c, t):
    a = seg(t, M3 - .5, M3 + .3) * (1 - seg(t, M5 - .7, M5 - .1))
    if a <= 0: return
    dy = 30 * (1 - seg(t, M3 - .5, M3 + .4, eout)) + 40 * seg(t, M5 - .7, M5 - .1, ein)
    c.save(); c.translate(0, dy)
    # headers
    ha = a * seg(t, REV3 - .2, REV3 + .3) * (1 - seg(t, CAP4 - .4, CAP4 - .1))
    _head(c, 'Revenue spending on research', 470, 330, ha, 40, WHITE, 'for her own business', DIM, seg(t, OWN3 - .2, OWN3 + .3))
    hb = a * seg(t, CAP4 - .2, CAP4 + .3)
    _head(c, 'Capital spending on research', 470, 330, hb, 40, WHITE, 'deducted in the year she spends it', DIM, seg(t, YEAR4 - .3, YEAR4 + .3))
    # gate state
    st = 0.
    st += win(t, DED3 - .25, SAL3 - .6, .3, .6)                               # coins pass green
    st += win(t, SAL3 + .7, SAL3 + 1.6, .2, .3) + win(t, ING3 + .7, ING3 + 1.6, .2, .3)
    st += win(t, FULL4 - .4, FULL4 + 1.2, .3, .4)
    st -= win(t, EXC4 - .05, EXC4 + 1.0, .15, .4)
    st = clamp(st, -1, 1)
    lbl = _gate_label(t)
    conveyor(c, BX0, BX1, BELT_Y, a, t, 110)
    scanner_back(c, GATE_X, BELT_Y, a, lbl, st, t, 250, 230)
    # research coins (m3, before the bills)
    for k, t0 in enumerate(COINS3):
        p = _coin_xy(t, t0)
        if not p: continue
        x, y, ca = p
        if ca <= 0: continue
        passed = seg(x, GATE_X - 20, GATE_X + 20, linr) * seg(t, DED3 - .3, DED3)
        coin(c, x, y, 15, a * ca * (1 - seg(t, SAL3 - 1., SAL3 - .4)), mixc(GOLD, GREEN, passed), '₹', shadow=False)
    # revenue bills
    for k, (ttl, mode, t0) in enumerate(BILLS3):
        if t < t0: continue
        tg, to = t0 + 1.25, t0 + 2.2
        x, y = _bill_path(t, t0, tg, to, 1620 + 40 * k, 700)
        ba = a * seg(t, t0, t0 + .2) * (1 - seg(t, to - .15, to + .2))
        sc_ = .68 * (1 - .4 * seg(t, to - .45, to))
        bill(c, x, y, ba, ttl, None, mode, sc=sc_)
    # the capital item: a lab building on its land plot; it clears the gate, then the land is cut away
    if t >= CAP4 - .1:
        t0 = CAP4 - .1
        XO = GATE_X + 215                                                    # where it waits after the gate
        u_cut = seg(t, EXC4, EXC4 + .9)
        tgo = EXC4 + .45
        if t < tgo:
            x, y = keys(t, [(t0, (LABB[0] + 40, 600)), (t0 + .5, (BX0 + 90, BELT_Y)), (FULL4 - .3, (GATE_X, BELT_Y)),
                            (FULL4 + .9, (XO, BELT_Y))], ease)
        else:
            x, y = keys(t, [(tgo, (XO, BELT_Y)), (tgo + .7, (BX1 - 40, BELT_Y)), (tgo + 1.1, (1640, 760))], ease)
        ia = a * seg(t, t0, t0 + .25) * (1 - seg(t, tgo + .9, tgo + 1.2))
        s_ = .42 * (1 - .35 * seg(t, tgo + .7, tgo + 1.1))
        if u_cut <= 0:
            lx, ly, la, lang = x, y, ia, 0.
        else:                                                                # the land drops through the belt
            lx, ly = XO + 40 * u_cut, BELT_Y + 108 * ein(u_cut)
            la, lang = a * (1 - seg(t, EXC4 + 2.4, EXC4 + 3.0)), 16 * u_cut
        if la > 0:
            c.save(); c.translate(lx, ly); c.rotate(lang)
            land(c, -86, -40, 172, 40, la, None, False)
            if 0 < u_cut: c.drawRRect(rrect(-90, -44, 180, 48, 10), paint(RED, .85 * la * seg(u_cut, 0, .3), stroke=3))
            c.restore()
            if u_cut > .4: cross(c, lx + 116, ly - 14, la * seg(t, EXC4 + .4, EXC4 + .7), 22)
        lift = 38 if u_cut <= 0 else 38 * (1 - seg(t, EXC4 + .1, EXC4 + .45, ein)) + 2
        building(c, x, y - lift * (1 - seg(t, tgo + .7, tgo + 1.1)), s_, ia, 1)
        if 0 < u_cut < 1:                                                    # the cut line
            ca = a * win(t, EXC4 - .05, EXC4 + .5, .1, .3)
            c.drawLine(XO - 110, BELT_Y - 40, XO + 110, BELT_Y - 40, paint(RED, ca, stroke=3))
        lp = a * seg(t, LAND4 - .3, LAND4 + .2) * (1 - seg(t, M5 - 1., M5 - .5))
        if lp > 0: chip(c, XO - 250, BELT_Y + 104, 'land never counts', RED, lp, 26)
    scanner_front(c, GATE_X, BELT_Y, a, lbl, st, t, 250, 230)
    # the tray
    ta = a * seg(t, FULL3 - .4, FULL3 + .2)
    if ta > 0:
        x, y, w, h = TRAY
        g = win(t, FULL3 - .2, FULL3 + 1.4, .3, .8) + win(t, FULL4 - .2, FULL4 + 1.2, .3, .7)
        _box(c, x, y, w, h, GREEN, ta, .82, glow=min(1, g))
        text(c, 'DEDUCTED IN FULL', x + 26, y + 42, 22, 800, GREEN, ta, track=3)
        text(c, '100%', x + 26, y + 106, 58, 800, WHITE, ta, shadow=6)
        for k, (s, col, tt) in enumerate(TRAY_LINES):
            la = ta * seg(t, tt, tt + .35)
            if la <= 0: continue
            yy = y + 160 + 42 * k
            if col == GREEN: tick(c, x + 44, yy - 9, la, 14)
            else: cross(c, x + 44, yy - 9, la, 14)
            text(c, s, x + 70, yy, 27, 700, WHITE if col == GREEN else RED, la)
            hl = win(t, tt, tt + 1.2, .2, .7)
            if hl > 0: c.drawRRect(rrect(x + 14, yy - 34, w - 28, 40, 10), paint(col, .14 * hl * la))
    c.restore()

# ---------------------------------------------------------------- m5: the example sheet
SH5 = [
    {'label': 'Revenue spending', 'kind': 'head', 't0': THREE5 - .2},
    {'label': 'Salaries and materials', 'amt': 300000, 'sec': '35(1)(i)', 't0': THREE5, 'hl': (THREE5B - .25, PLUS5 + .4)},
    {'label': 'Capital spending', 'kind': 'head', 't0': SEVEN5 - .2},
    {'label': 'Lab building, with its land', 'amt': 750000, 'sec': '35(1)(iv)', 't0': SEVEN5},
    {'label': 'Land (never counts)', 'amt': 500000, 'kind': 'less', 't0': FIVE5},
    {'label': 'Capital allowed', 'amt': 250000, 'kind': 'sub', 't0': TWO5 - .25, 'hl': (TWO5 - .25, THAT5 + .2)},
    {'label': 'Deduction u/s 35', 'amt': 550000, 'kind': 'total', 't0': FIVE5B - .2},
]
SH5_X, SH5_Y, SH5_W = 100, 292, 1000

def _example5(c, t):
    a = seg(t, M5 - .6, M5 + .1) * (1 - seg(t, M6 - .6, M6 - .1))
    if a <= 0: return
    dx = -60 * seg(t, M6 - .6, M6 - .1, ein)
    c.save(); c.translate(dx, 0)
    sheet(c, SH5_X, SH5_Y, SH5_W, SH5, a, t, title="Section 35 · Meera's research", title_r='in-house')
    # the two revenue bills
    ra = a * seg(t, THREE5 - .2, THREE5 + .3)
    if ra > 0:
        bill(c, 1250, 420, ra, "Scientist's salary", None, 'bank', sc=.6, ang=-5)
        bill(c, 1400, 436, ra, 'Ingredients', None, 'upi', sc=.6, ang=4)
        price_tag(c, 1640, 430, rupee(300000), GOLD, ra * seg(t, THREE5 - .1, THREE5 + .4, back), 28)
        hl = win(t, THREE5B - .25, PLUS5 + .4, .3, .5)
        if hl > 0: c.drawRRect(rrect(1150, 360, 400, 150, 16), paint(GOLD, .5 * hl * ra, stroke=3))
    # the building on its land plot
    ba = a * seg(t, SEVEN5 - .3, SEVEN5 + .3)
    if ba > 0:
        cut = seg(t, LANDW5 - .2, LANDW5 + .9)
        gx, gy = 1260, 700
        lx, ly = gx + 30 * cut, gy + 40 * ein(cut)
        land(c, lx, ly, 420, 86, ba * (1 - .55 * cut), None, True)
        if cut > 0:
            c.drawRRect(rrect(lx - 4, ly - 4, 428, 94, 12), paint(RED, .8 * ba * cut, stroke=3))
        lta = ba * seg(t, FIVE5 - .1, FIVE5 + .4, back)
        if lta > 0:
            chip(c, gx + 210 + 30 * cut, ly + 120, 'land ' + rupee(500000), RED, lta, 26)
        if cut > .6: cross(c, lx + 400, ly + 10, ba * seg(t, LANDW5 + .5, LANDW5 + .8), 22)
        gb = win(t, TWO5 - .3, THAT5 + 1.5, .3, .6)
        building(c, gx + 210, gy + 2, .8, ba, 1)
        if gb > 0: c.drawRect(skia.Rect(gx + 210 - 128, gy - 180, gx + 210 + 128, gy), paint(GREEN, .16 * gb * ba))
        ta = ba * (1 - seg(t, TWO5 - .4, TWO5 - .1))
        if ta > 0: price_tag(c, 1470, 455 + 100, rupee(750000), GOLD, ta * seg(t, SEVEN5 - .1, SEVEN5 + .4, back), 28)
        g2 = ba * seg(t, TWO5 - .2, TWO5 + .3, back)
        if g2 > 0: price_tag(c, 1470, 555, rupee(250000), GREEN, g2, 28)
    c.restore()

# ---------------------------------------------------------------- m6: three years before the business starts
STRIP6_Y, STRIP6_H = 500, 120
BOX6 = [(110 + k * 345, 320) for k in range(5)]                       # (x, w)
LBL6 = [('3rd year', 'before'), ('2nd year', 'before'), ('1st year', 'before'), ('Year 1', 'business begins'), ('Year 2', '')]

def _before6(c, t):
    a = seg(t, M6 - .5, M6 + .2) * (1 - seg(t, M7 - .6, M7 - .1))
    if a <= 0: return
    _head(c, 'Research before the business starts', 110, 330, a * seg(t, BEF6 - .3, BEF6 + .2), 40, WHITE,
          'spent in the 3 years before → deducted in the year it begins', DIM, seg(t, DED6 - .3, DED6 + .3))
    fold = seg(t, DED6 - .1, DED6 + 1.1)
    for k, (x, w) in enumerate(BOX6):
        ba = a * seg(t, BEF6 - .1 + .15 * k, BEF6 + .3 + .15 * k)
        if ba <= 0: continue
        col = VIO if k < 3 else GOLD if k == 3 else ACC
        gl = win(t, DED6 + .7, M7 - .4, .4, .5) if k == 3 else win(t, THREE6 + .2 * k, THREE6 + .2 * k + 1.6, .3, .8) if k < 3 else 0.
        _box(c, x, STRIP6_Y, w, STRIP6_H, col, ba, .8 if k != 3 else .72, glow=gl)
        t1, t2 = LBL6[k]
        text(c, t1, x + w / 2, STRIP6_Y + 52, 32, 800, WHITE, ba, 'c')
        if t2: text(c, t2, x + w / 2, STRIP6_Y + 90, 24, 700, shade(col, .3), ba, 'c')
    # business-starts marker between box 3 and box 4
    ma = a * seg(t, STARTS6 - .3, STARTS6 + .2)
    if ma > 0:
        mx = BOX6[3][0] - 12
        p = paint(GOLD, .9 * ma, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawLine(mx, STRIP6_Y - 60, mx, STRIP6_Y + STRIP6_H + 40, p)
        chip(c, mx, STRIP6_Y - 72, 'business starts', GOLD, ma, 24)
    # research spend chips in the three years before, folding into Year 1
    for k in range(3):
        sa = a * seg(t, THREE6 + .2 + .2 * k, THREE6 + .55 + .2 * k)
        if sa <= 0: continue
        x0, w0 = BOX6[k]; sx, sy = x0 + w0 / 2, STRIP6_Y + STRIP6_H + 90
        tx, ty = BOX6[3][0] + 70 + 90 * k, STRIP6_Y + STRIP6_H + 90
        u = seg(t, DED6 - .1 + .15 * k, DED6 + .75 + .15 * k)
        x, y = lerp(sx, tx, u), lerp(sy, ty, u) - 120 * math.sin(math.pi * u)
        _box(c, x - 40, y - 34, 80, 68, VIO if u < .5 else GOLD, sa, .7, r=14)
        _flask_icon(c, x, y, .7, WHITE, sa)
    da = a * seg(t, BEGINS6 - .3, BEGINS6 + .2, back)
    if da > 0:
        bx, bw = BOX6[3]
        tick(c, bx + bw - 34, STRIP6_Y + 30, da, 18)
        chip(c, bx + bw / 2, STRIP6_Y + STRIP6_H + 190, 'deducted here', GREEN, da, 28)
    # drifting year arrow (keeps the frame alive)
    pa = a * .8
    flowdots(c, [(BOX6[0][0], STRIP6_Y - 18), (BOX6[4][0] + 320, STRIP6_Y - 18)], ((t - M6) * .22) % 1, pa * .7, ACC, 6, 4.)

# ---------------------------------------------------------------- m7: no double counting · 41(3)
BAR7_BASE = 770
def _trap7(c, t):
    a = seg(t, M7 - .5, M7 + .2) * (1 - seg(t, M8 - .6, M8 - .1))
    if a <= 0: return
    _head(c, 'No double counting', 110, 320, a * seg(t, DOUBLE7 - .3, DOUBLE7 + .2), 40, WHITE)
    la = a * seg(t, ASSET7 - .4, ASSET7 + .2)
    lab_bench(c, 330, 720, .8, la, t)
    da = a * seg(t, DED7 - .2, DED7 + .3, back)
    if da > 0: chip(c, 330, 440, 'deducted 100% · § 35', GREEN, da, 26)
    # → depreciation § 32, crossed
    xa = a * seg(t, DED7 + .6, DED7 + 1.1)
    if xa > 0:
        link(c, (520, 600), (660, 600), DIM, xa, seg(t, DED7 + .6, DED7 + 1.1), w=3, head=14)
        _box(c, 680, 552, 300, 96, ACC, xa, .82)
        text(c, 'Depreciation', 710, 594, 30, 800, WHITE, xa)
        sec(c, 712, 624, '32', xa, size=22)
        u = seg(t, NO7 - .1, NO7 + .4)
        _strike(c, 696, 964, 600, u, xa)
        cross(c, 960, 560, xa * u, 20)
        text(c, 'no depreciation', 830, 690, 28, 800, RED, xa * seg(t, DEP7 - .1, DEP7 + .3), 'c')
    # sale: sale price vs deduction, the lower is taxed
    sa = a * seg(t, SELLS7 - .3, SELLS7 + .3)
    if sa > 0:
        pu = seg(t, SELLS7 - .3, SELLS7 + .6, eout)
        price_tag(c, lerp(360, 1150, pu), lerp(560, 420, pu) - 60 * math.sin(math.pi * pu), 'sold', GOLD, sa * (1 - seg(t, SALE7 + .3, SALE7 + .7)), 26)
        hb = a * seg(t, SALE7 - .2, SALE7 + .5)
        hd = a * seg(t, UPTO7 - .2, UPTO7 + .5)
        sx, dxb, bw = 1090, 1270, 130
        hs, hdd = 300, 230
        grow_s = seg(t, SALE7 - .2, SALE7 + .6, eout); grow_d = seg(t, UPTO7 - .2, UPTO7 + .6, eout)
        cap = seg(t, DEDN7 - .1, DEDN7 + .4)
        if hb > 0:
            top = BAR7_BASE - hs * grow_s
            c.drawRRect(rrect(sx, top, bw, BAR7_BASE - top, 10), paint(ACC, .3 * hb * (1 - .5 * cap)))
            if cap > 0:
                yl = BAR7_BASE - hdd
                c.drawRRect(rrect(sx, max(top, yl), bw, BAR7_BASE - max(top, yl), 10), paint(GOLD, .75 * hb * cap))
            c.drawRRect(rrect(sx, top, bw, BAR7_BASE - top, 10), paint(ACC, .9 * hb, stroke=2))
            text(c, 'sale price', sx + bw / 2, BAR7_BASE + 36, 25, 700, DIM, hb, 'c')
        if hd > 0:
            top = BAR7_BASE - hdd * grow_d
            c.drawRRect(rrect(dxb, top, bw, BAR7_BASE - top, 10), paint(GREEN, .3 * hd))
            c.drawRRect(rrect(dxb, top, bw, BAR7_BASE - top, 10), paint(GREEN, .9 * hd, stroke=2))
            text(c, 'deduction', dxb + bw / 2, BAR7_BASE + 36, 25, 700, DIM, hd, 'c')
        if cap > 0:
            yl = BAR7_BASE - hdd
            p = paint(GOLD, .95 * a * cap, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 8], 0))
            c.drawLine(sx - 20, yl, dxb + bw + 30, yl, p)
            text(c, 'lower of the two', (sx + dxb + bw) / 2, 410, 28, 800, GOLD, a * cap, 'c', shadow=6)
            c.drawLine(sx, BAR7_BASE, dxb + bw, BAR7_BASE, paint(DIM, .5 * a, stroke=2, cap=False))
        ia = a * seg(t, TAXED7 - .5, TAXED7)
        if ia > 0:
            link(c, (dxb + bw + 30, BAR7_BASE - hdd / 2), (1505, BAR7_BASE - hdd / 2), GOLD, ia, seg(t, TAXED7 - .5, TAXED7 - .1), w=3, head=14)
            _box(c, 1515, BAR7_BASE - hdd / 2 - 90, 300, 180, GOLD, ia, .82)
            text(c, 'Business income', 1665, BAR7_BASE - hdd / 2 - 34, 28, 800, WHITE, ia, 'c')
            sec(c, 1665, BAR7_BASE - hdd / 2 + 4, '41(3)', ia, size=22, align='c')
            stamp(c, 1665, BAR7_BASE - hdd / 2 + 56, 'TAXED', GOLD, ia, seg(t, TAXED7 - .2, TAXED7 + .6, linr), -8, 34)

# ---------------------------------------------------------------- m8: paying outsiders
TILES8 = [('Approved university', _mortarboard, UNI8), ('Research body', _flask_icon, RB8),
          ('Company', 'building', CO8), ('Laboratory', _microscope, LAB8)]
TX8, TY8, TW8, TH8, TG8 = 520, 300, 300, 176, 30
SW8 = (1165, 700)
def _outsiders8(c, t):
    a = seg(t, M8 - .5, M8 + .2) * (1 - seg(t, M9 - .6, M9 - .1))
    if a <= 0: return
    pa = a * seg(t, PAY8 - .3, PAY8 + .3)
    person(c, 250, 806, .95, pa, 'meera', t, talk=0., look=.6, mood=.2)
    _head(c, 'Paying outsiders', 90, 330, pa, 40, WHITE, 'is different', DIM, seg(t, DIFF8 - .2, DIFF8 + .2))
    ag = a * seg(t, APPR8 - .2, APPR8 + .3)
    for k, (lbl, ic, tt) in enumerate(TILES8):
        x = TX8 + k * (TW8 + TG8)
        ta = a * seg(t, tt - .25, tt + .2)
        if ta <= 0: continue
        pop = seg(t, tt - .25, tt + .35, back)
        unlocked = seg(t, OPTS8, OPTS8 + .5)
        col = mixc(ACC, GREEN, unlocked)
        glow = win(t, tt - .1, tt + 1.2, .2, .6)
        if callable(ic):
            fn = lambda c_, cx, cy, s, ic=ic, col=col: ic(c_, cx, cy, s, shade(col, .2), 1.)
        else: fn = ic
        c.save(); c.translate(x + TW8 / 2, TY8 + TH8 / 2); k_ = .9 + .1 * pop; c.scale(k_, k_); c.translate(-(x + TW8 / 2), -(TY8 + TH8 / 2))
        tile(c, x, TY8, TW8, TH8, fn, lbl, ta, col, None, 25, glow)
        c.restore()
        # money flowing from Meera
        fa = a * seg(t, max(MONEY8, tt - .3), max(MONEY8, tt - .3) + .3)
        if fa > 0:
            p0, p1 = (338, 640), (x + TW8 / 2, TY8 + TH8 + 14)
            for j in range(2):
                q = ((t - tt) * .55 + j * .5) % 1
                if t - tt + j * .9 < 0: continue
                cx = lerp(p0[0], p1[0], q); cy = lerp(p0[1], p1[1], q) - 90 * math.sin(math.pi * q)
                coin(c, cx, cy, 14, fa * min(1, q * 6) * min(1, (1 - q) * 6), GOLD, '₹', shadow=False)
    if ag > 0: chip(c, TX8 + 2 * (TW8 + TG8) - TG8 / 2, TY8 - 26, 'all approved', GOLD, ag, 22)
    # 100% behind the regime switch
    ha = a * seg(t, HUND8 - .3, HUND8 + .2, back)
    if ha > 0:
        un = seg(t, OPTS8, OPTS8 + .5)
        lk = seg(t, ONLY8 - .2, ONLY8 + .2)
        col = mixc(GOLD, GREEN, un)
        _box(c, SW8[0] - 260, 520, 520, 92, col, ha, .8, glow=win(t, OPTS8 + .2, OPTS8 + 1.6, .3, .6))
        text(c, 'deductible at 100%', SW8[0] + (14 if lk > 0 else 0), 580, 38, 800, WHITE, ha, 'c')
        if lk > 0: padlock(c, SW8[0] - 222, 572, 1.15, mixc(GOLD, GREEN, un), ha * lk, un)
        sa = a * seg(t, ONLY8 - .3, ONLY8 + .2)
        if sa > 0:
            regime_switch(c, SW8[0], SW8[1], sa, seg(t, OPTS8 - .1, OPTS8 + .5), t, .8)
            text(c, 'locked in the default regime', SW8[0], SW8[1] + 84, 26, 700, RED, sa * (1 - un), 'c')
            text(c, 'allowed once she opts out', SW8[0], SW8[1] + 84, 26, 700, GREEN, sa * un, 'c')

# ---------------------------------------------------------------- m9: default vs opted out
SH9 = [
    {'label': 'In-house research', 'sec': '35(1)(i), (iv)', 'amt': 550000, 'kind': 'start', 't0': M9 - .1},
    {'label': 'Approved university', 'sec': '35(1)(ii)', 'amt': 0, 'amt2': 100000, 'kind': 'add', 't0': ONE9 - .1},
    {'label': 'Deduction u/s 35', 'amt': 550000, 'amt2': 650000, 'kind': 'total', 't0': FIVE9 - .15, 't2': SIX9 - .15},
]
SH9_X, SH9_Y, SH9_W = 100, 300, 1140
SH9_COLS = ('Default', 'Opted out')
def _sh9_cols():
    amts = [550000, 0, 100000, 650000]
    aw = max([ftext_w(rupee(v), 33 + 3, MONO) for v in amts] + [150]) + 14
    cr2 = SH9_W - 30; cr1 = cr2 - (aw + 40)
    return SH9_X + cr1, SH9_X + cr2, aw
CR1, CR2, AW9 = _sh9_cols()

def _example9(c, t):
    a = seg(t, M9 - .6, M9 + .1) * (1 - seg(t, M10 - .5, M10 + .3))
    if a <= 0: return
    hc1 = win(t, DEF9 - .25, OPTS9 - .2, .3, .4); hc2 = win(t, OPTS9 - .25, M10 - .2, .3, .5)
    H9 = sheet_height(SH9, 't', SH9_COLS)
    for hc, cr in ((hc1, CR1), (hc2, CR2)):
        if hc > 0:
            c.drawRRect(rrect(cr - AW9 - 14, SH9_Y + 72, AW9 + 28, H9 - 78, 14), paint(GOLD, .12 * hc * a))
    sheet(c, SH9_X, SH9_Y, SH9_W, SH9, a, t, title='Section 35 · Meera', cols=SH9_COLS)
    for hc, cr in ((hc1, CR1), (hc2, CR2)):
        if hc > 0:
            c.drawRRect(rrect(cr - AW9 - 14, SH9_Y + 72, AW9 + 28, H9 - 78, 14), paint(GOLD, .7 * hc * a, stroke=2.4))
    # default column: the university line is locked
    la = a * seg(t, ONE9 + .3, ONE9 + .7)
    if la > 0:
        ry = sheet_row_y(SH9_X, SH9_Y, SH9, 1, 0, 't', SH9_COLS)
        padlock(c, CR1 - 140, ry - 2, .85, GOLD, la, 0)
    # the switch and the cheque
    sa = a * seg(t, M9 - .3, M9 + .3)
    pos = 1 - seg(t, DEF9 - .2, DEF9 + .4) + seg(t, OPTS9 - .2, OPTS9 + .4)
    regime_switch(c, 1545, 360, sa, pos, t, .75)
    ca = a * seg(t, ONE9 - .3, ONE9 + .3)
    if ca > 0:
        u = seg(t, ONE9 - .3, ONE9 + .5, eout)
        cheque(c, 1545, 548 + 30 * (1 - u), ca, 100000, 'Approved university', True, .72, 0, None)
        _mortarboard(c, 1545, 672, 1.0, GOLD, ca * seg(t, UNI9 - .2, UNI9 + .3))
        text(c, 'for food research', 1545, 736, 26, 700, DIM, ca * seg(t, UNI9 - .1, UNI9 + .4), 'c')
    # two big totals
    for k, (lbl, val, tt, col) in enumerate((('Default', 550000, FIVE9, ACC), ('Opted out', 650000, SIX9, GOLD))):
        ba = a * seg(t, tt - .3, tt + .2)
        if ba <= 0: continue
        x = SH9_X + k * 590; y = 660
        _box(c, x, y, 550, 132, col, ba, .8, glow=win(t, tt, tt + 1.6, .2, .8))
        text(c, lbl.upper(), x + 30, y + 40, 22, 800, col, ba, track=3)
        roll(c, val, x + 520, y + 104, seg(t, tt - .1, tt + .7, linr), 54, WHITE if k == 0 else GOLD, ba, 'r')

# ---------------------------------------------------------------- m10: below the check card
def _check10(c, t):
    a = seg(t, M10 - .2, M10 + .5)
    if a <= 0: return
    y = 792; x0 = 330
    pa = a * seg(t, SMALL10 - .3, SMALL10 + .2)
    pw = 210
    if pa > 0:
        c.drawRRect(rrect(x0, y - 34, pw, 26, 8), paint(GREEN, .55 * pa))
        text(c, 'profit', x0 - 14, y - 13, 24, 700, GREEN, pa, 'r')
    da = a * seg(t, DEDN10 - .3, DEDN10 + .3)
    dw = 560
    if da > 0:
        grow = seg(t, DEDN10 - .3, DEDN10 + .5, eout)
        used = 1 - seg(t, LIMIT10 - .2, LIMIT10 + .6)
        c.drawRRect(rrect(x0, y + 2, pw, 26, 8), paint(GOLD, .7 * da))
        rest = (dw - pw) * grow
        c.drawRRect(rrect(x0 + pw + 4, y + 2, rest * used, 26, 8), paint(GOLD, .7 * da))
        text(c, 'research deduction', x0 - 14, y + 23, 24, 700, GOLD, da, 'r')
        q = seg(t, YES10 - .1, LIMIT10 + .6)
        if q > 0:
            # the unused part rides an endless carry-forward track
            tx0, tx1 = x0 + pw + 30, 1500
            p = paint(GOLD, .6 * a * q, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([4, 10], -t * 30))
            c.drawLine(tx0, y + 15, tx1, y + 15, p)
            bx = lerp(x0 + pw + 4, 1180, ease(q))
            c.drawRRect(rrect(bx, y + 2, (dw - pw) * .55, 26, 8), paint(GOLD, .8 * da * q))
            text(c, '∞', 1530, y + 32, 52, 800, GOLD, a * seg(t, LIMIT10 - .2, LIMIT10 + .3), 'l', shadow=6)
            chip(c, 960, y - 30, 'carried forward · no time limit', GOLD, a * seg(t, LIMIT10 - .1, LIMIT10 + .4), 22)
    ha = a * seg(t, ANY10 - .3, ANY10 + .2)
    if ha > 0:
        w = chip(c, 1640, y - 30, 'any head', GREEN, ha, 22)
        sa = a * seg(t, SALS10 - .2, SALS10 + .2)
        if sa > 0:
            chip(c, 1690, y + 18, 'Salaries', RED, sa, 22)
            _strike(c, 1640, 1740, y + 18, seg(t, SALS10, SALS10 + .4), sa)

# ---------------------------------------------------------------- the chapter
def ch_m(c, t):
    if t < CS - .6 or t > CE + .6: return
    _stage1(c, t)
    _lab(c, t)
    _belt(c, t)
    _example5(c, t)
    _before6(c, t)
    _trap7(c, t)
    _outsiders8(c, t)
    _example9(c, t)
    _check10(c, t)
