"""Chapter K — What counts as cost (section 43(1)).
k1  hook: Meera's oven on the left with its price tag ₹3,70,000 (on "three lakh seventy"); the oven flies into the
    plant & machinery tank on the right, whose entry chip reads "+ ₹4,00,000"; a dashed gap with a gold "?" between
k2  the actual-cost sheet assembles in the middle ("§ 43(1)"): everything spent to bring it into use · price
    ₹3,70,000 (the tag flies in) + freight ₹10,000 (a truck pulls up under the oven) + installation ₹20,000 (a
    spanner works the oven) = ₹4,00,000, which pulses across to the tank's entry chip (tick)
k3  a dashed IF card under the sheet: the state's badge, "the state pays ₹50,000 of it as a subsidy",
    "₹4,00,000 − ₹50,000 = ₹3,50,000"
k4  trap: a cash bundle grows past a "cash · one person · one day" meter's ₹10,000 line (red), jumps at the sheet
    and bounces off a red barrier ("left out of the cost"); NO DEPRECIATION stamp
k5  the year bar 1 Apr 2025 – 31 Mar 2026: a loan from the bank ("borrowed"), a dividing line that settles on
    1 Jun ("first put to use"); a cursor runs along the year dropping monthly interest coins: April and May fly up
    into "the oven's actual cost" (gold), June to March fall into "normal expense · § 36" (green)
k6  two lanes, personal and business: Meera's car (bought 2022, ₹5,25,000) drives across into the business; its cost
    stays ₹5,25,000 (tick) while a "market value ₹2,50,000" tag is crossed out
k7  two cards: a building slides from personal to business, "cost − depreciation it would have had"; a gift box
    opens, a previous owner appears, "previous owner's cost − depreciation since"
k8  a ship brings the oven in on credit; a ₹-per-$ dial swings as the rupee falls; extra rupees fly into the oven's
    cost column; "§ 43A"
k9  check, below the card: ₹6,00,000 · − ₹1,00,000 subsidy · − ₹50,000 cash (each as spoken) · = ₹4,50,000 on the
    answer
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('k')
K2, K3, K4, K5, K6, K7, K8, K9 = (T(b) for b in ('k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9'))

# ---------------------------------------------------------------- word times
A_THREE, A_WHY, A_ENTER, A_FOUR = W('k1', 'three'), W('k1', 'why'), W('k1', 'enter'), W('k1', 'four')
B_ACTUAL, B_SEC, B_EVERY, B_PRICE = W('k2', 'actual'), W('k2', '43(1)'), W('k2', 'everything'), W('k2', 'price')
B_TEN, B_FREIGHT, B_TWENTY, B_INST = W('k2', 'ten'), W('k2', 'freight'), W('k2', 'twenty'), W('k2', 'installation')
C_SOMEONE, C_STATE, C_FIFTY, C_SUBSIDY, C_THREE = (W('k3', 'someone'), W('k3', 'state'), W('k3', 'fifty'),
                                                   W('k3', 'subsidy'), W('k3', 'three'))
D_CASH, D_ANY, D_TEN, D_DAY, D_CASH2, D_LEFT, D_NO = (W('k4', 'cash'), W('k4', 'any'), W('k4', 'ten'),
                                                      W('k4', 'day'), W('k4', 'cash', occ=1), W('k4', 'left'),
                                                      W('k4', 'no'))
E_DIV, E_BORROW, E_APRIL, E_STARTED, E_JUNE = (W('k5', 'dividing'), W('k5', 'borrowed'), W('k5', 'april'),
                                               W('k5', 'started'), W('k5', 'june'))
E_INT2, E_JUNE2, E_ADDED, E_INT3, E_NORMAL, E_SEC, E_SIX = (W('k5', 'interest', occ=1), W('k5', 'june', occ=1),
                                                            W('k5', 'added'), W('k5', 'interest', occ=2),
                                                            W('k5', 'normal'), W('k5', 'section'), W('k5', 'six'))
F_PERS = W('k6', 'personal')
F_ORIG, F_BOUGHT, F_FIVE, F_JOINS, F_COST, F_FIVE2, F_TODAY, F_VALUE = (
    W('k6', 'original'), W('k6', 'bought'), W('k6', 'five'), W('k6', 'joins'), W('k6', 'cost', occ=1),
    W('k6', 'five', occ=1), W('k6', 'today'), W('k6', 'value'))
G_BUILD, G_MOVED, G_COST, G_MINUS, G_GIFT, G_INHER, G_PREV, G_MINUS2 = (
    W('k7', 'building'), W('k7', 'moved'), W('k7', 'cost'), W('k7', 'minus'), W('k7', 'gift'),
    W('k7', 'inheritance'), W('k7', 'previous'), W('k7', 'minus', occ=1))
H_IMPORT, H_CREDIT, H_RUPEE, H_PAID, H_EXTRA, H_ADDED, H_SEC = (
    W('k8', 'imported'), W('k8', 'credit'), W('k8', 'rupee'), W('k8', 'paid'), W('k8', 'extra'),
    W('k8', 'added'), W('k8', '43A'))
Q_SIX, Q_CASH, Q_ONE = W('k9', 'six'), W('k9', 'cash'), W('k9', 'one', occ=1)
QA_FOUR = W('k9a', 'four')

# ---------------------------------------------------------------- layout
OX, OY, OS = 330, 650, .85                                # the oven
TAG0 = (OX + 150, 340)                                    # its price tag
TKX, TKY, TKW, TKH = 1500, 330, 260, 300                  # plant & machinery block
ENTRY = (1400, 330)                                       # the "+ ₹4,00,000" entry chip
SX, SY, SW = 600, 300, 680                                # the actual-cost sheet
ROWS = [dict(label='everything spent to bring it into use', amt=None, kind='note', t0=B_EVERY),
        dict(label='Price', amt=370000, kind='start', t0=B_PRICE),
        dict(label='Freight', amt=10000, kind='add', t0=B_TEN),
        dict(label='Installation', amt=20000, kind='add', t0=B_TWENTY),
        dict(label='Actual cost', amt=400000, kind='total', t0=B_INST + .55)]
SH_TITLE = 'Actual cost of the oven'
TRK_Y, TRK_S = 800, .42
IFY = 694                                                 # the IF card / cash strip under the sheet
P1_OFF = K5 - .45

YX, YY, YW = 250, 500, 1420                               # k5 year bar
X_JUN = yearbar_x(YX, YW, (2025, 6, 1))
A0, A1 = E_INT2 - .15, E_JUNE2 + .25                      # cursor 1 Apr -> 1 Jun
B0, B1 = E_INT3 - .1, E_SIX + .1                          # cursor 1 Jun -> 31 Mar
_ORD = lambda d: yearbar_x(0, 365, d)                     # day index (0..365)

for tt, k in ((A_THREE, 'pop'), (A_ENTER, 'whoosh'), (B_ACTUAL, 'flip'), (B_PRICE, 'pop'), (B_TEN - .55, 'whoosh'),
              (B_TWENTY + .1, 'tap'), (B_INST + .6, 'chime'), (C_SOMEONE, 'pop'), (C_THREE, 'ok'),
              (D_TEN, 'warn'), (D_LEFT + .3, 'error'), (D_NO + .3, 'thunk'),
              (A0, 'tick'), (E_ADDED, 'chime_lo'), (E_SEC, 'ok'),
              (F_FIVE, 'pop'), (F_JOINS, 'whoosh'), (F_FIVE2, 'chime'), (F_VALUE, 'error'),
              (G_BUILD, 'pop'), (G_GIFT, 'pop'), (H_RUPEE + .1, 'warn'), (H_EXTRA, 'pop'), (QA_FOUR, 'chime')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _dash(col, a, w=2.2, on=10, off=7):
    p = paint(col, a, stroke=w, cap=False); p.setPathEffect(skia.DashPathEffect.Make([on, off], 0)); return p

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l'):
    if a <= 0: return 0
    ftext(c, s, x + 1.5, y + 2.5, size, MONO, BLACK, .55 * a, align)
    return ftext(c, s, x, y, size, MONO, col, a, align)

def _bez(p0, pm, p1, u):
    return ((1 - u) ** 2 * p0[0] + 2 * u * (1 - u) * pm[0] + u * u * p1[0],
            (1 - u) ** 2 * p0[1] + 2 * u * (1 - u) * pm[1] + u * u * p1[1])

def _wrench(c, x, y, s, ang, col, a):
    """A flat spanner centred at (x, y), rotated ang degrees."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s)
    c.drawRRect(rrect(-52, -9, 92, 18, 9), paint(BLACK, .4 * a, blur=6))
    c.drawRRect(rrect(-50, -8, 88, 16, 8), paint(col, a))
    head = skia.Path(); head.addCircle(48, 0, 22)
    jaw = skia.Path(); jaw.addRect(skia.Rect(52, -9, 80, 9))
    hole = skia.Path(); hole.addCircle(54, 0, 9)
    P = skia.Op(skia.Op(head, jaw, skia.PathOp.kDifference_PathOp), hole, skia.PathOp.kDifference_PathOp)
    c.drawPath(P, paint(col, a))
    c.drawCircle(-40, 0, 4.5, paint('#0b1020', a))
    c.restore()

def _badge(c, x, y, r, a, name='bank', col=VIO, label=None):
    if a <= 0: return
    c.drawCircle(x, y + 4, r, paint(BLACK, .4 * a, blur=8))
    c.drawCircle(x, y, r, paint(shade(col, -.7), a)); c.drawCircle(x, y, r, paint(col, .9 * a, stroke=2.4))
    icon(c, name, x, y, r / 46, shade(col, .35), a)
    if label: text(c, label, x, y + r + 26, 21, 700, shade(col, .35), a, 'c')

def _wheel(c, x, y, r, ang, a):
    c.drawCircle(x, y, r, paint('#141922', a)); c.drawCircle(x, y, r * .56, paint('#c3cad6', a))
    c.drawCircle(x, y, r * .2, paint('#5b6579', a))
    for k in range(5):
        an = ang + k * math.tau / 5
        c.drawCircle(x + math.cos(an) * r * .36, y + math.sin(an) * r * .36, r * .07, paint('#5b6579', a))

def _car(c, x, y, s, a, col, move=0.):
    """A flat side-view hatchback (300 x 120 at s=1) standing at (x, y), facing right."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-160, -12, 320, 22), paint(BLACK, .45 * a, blur=10))
    body = skia.Path(); body.moveTo(-148, -28); body.lineTo(-146, -70); body.quadTo(-140, -84, -118, -86)
    body.lineTo(-82, -88); body.quadTo(-50, -124, -10, -126); body.lineTo(52, -124); body.quadTo(86, -120, 108, -88)
    body.lineTo(138, -80); body.quadTo(152, -76, 152, -58); body.lineTo(150, -28); body.close()
    c.drawPath(body, paint(shader=lgrad((0, -126), (0, -28), [shade(col, .2), shade(col, -.3)]), a=a))
    win1 = skia.Path(); win1.moveTo(-70, -88); win1.quadTo(-44, -116, -12, -117); win1.lineTo(16, -117); win1.lineTo(16, -88); win1.close()
    win2 = skia.Path(); win2.moveTo(26, -88); win2.lineTo(26, -117); win2.lineTo(50, -116); win2.quadTo(78, -112, 96, -88); win2.close()
    for wp in (win1, win2): c.drawPath(wp, paint('#0f1726', .95 * a))
    c.drawLine(-60, -112, -20, -112, paint(WHITE, .25 * a, stroke=3))
    c.drawLine(-140, -52, 148, -52, paint(shade(col, -.45), .8 * a, stroke=2))
    c.drawRRect(rrect(136, -72, 14, 10, 3), paint('#fff4c2', a)); c.drawRRect(rrect(-150, -70, 8, 12, 3), paint('#ef4444', a))
    for wx in (-92, 96):
        c.drawCircle(wx, -28, 34, paint('#0d1220', a)); _wheel(c, wx, -28, 27, move / 27., a)
    c.restore()

def _gift(c, x, y, s, a, open_=0.):
    """A wrapped gift box standing at (x, y); open_ lifts and tips the lid."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-80, -10, 160, 20), paint(BLACK, .45 * a, blur=8))
    c.drawRect(skia.Rect(-66, -110, 66, 0), paint(shader=lgrad((0, -110), (0, 0), ['#f472b6', '#be185d']), a=a))
    c.drawRect(skia.Rect(-10, -110, 10, 0), paint(GOLD, a))
    o = ease(clamp(open_))
    c.save(); c.translate(-74, -110); c.rotate(-24 * o); c.translate(0, -22 * o)
    c.drawRect(skia.Rect(0, -26, 148, 0), paint(shader=lgrad((0, -26), (0, 0), ['#f9a8d4', '#db2777']), a=a))
    c.drawRect(skia.Rect(64, -26, 84, 0), paint(GOLD, a))
    bow = skia.Path(); bow.moveTo(74, -26); bow.cubicTo(40, -66, 30, -24, 74, -26); bow.cubicTo(118, -66, 108, -24, 74, -26)
    c.drawPath(bow, paint(GOLD, a)); c.restore()
    if o > .3:
        for k in range(5):
            an = -math.pi / 2 + (k - 2) * .45; L = 40 + 30 * o
            c.drawLine(math.cos(an) * 30, -118 + math.sin(an) * 30, math.cos(an) * L * 1.6, -118 + math.sin(an) * L * 1.6, paint(GOLD, .6 * a * o, stroke=3))
    c.restore()

# ---------------------------------------------------------------- k1 – k4: the oven, the sheet, the block
def _p1(c, t):
    a = 1 - seg(t, P1_OFF, P1_OFF + .45)
    if a <= 0: return
    # the plant & machinery block, with the oven entering it
    lv = 10e5 + 4e5 * seg(t, A_ENTER + .1, A_ENTER + 1.1)
    tank(c, TKX, TKY, TKW, TKH, a, t, level=lv, cap=16e5, label='Plant & machinery · 15%', amount=None, col=ACC,
         inflow=win(t, A_ENTER, A_ENTER + 1.25, .2, .3), sub='the block')
    oven(c, OX, OY, OS, a, t, on=1.)
    fu = seg(t, A_ENTER - .45, A_ENTER + .15, ein)
    if 0 < fu < 1:
        px, py = _bez((OX, OY - 140), ((OX + TKX) / 2, 200), (TKX - 160, TKY - 40), fu)
        oven(c, px, py + 40, .22 * (1 - .4 * fu), a * (1 - seg(fu, .8, 1)), t, on=1.)
    ea = a * seg(t, A_FOUR - .2, A_FOUR + .25, back)
    if ea > 0:
        chip(c, ENTRY[0], ENTRY[1], '+ ₹4,00,000', GOLD, ea, 26)
        ok = seg(t, B_INST + 1.0, B_INST + 1.4, back)
        if ok > 0: tick(c, ENTRY[0] + 92, ENTRY[1] - 22, a * ok, 15)
    # the price tag; it flies into the sheet's Price row
    pa = a * seg(t, A_THREE - .25, A_THREE + .2, back)
    fl = seg(t, B_PRICE - .55, B_PRICE - .05, ease)
    if pa > 0 and fl < 1:
        ry = sheet_row_y(SX, SY, ROWS, 1, title=SH_TITLE)
        x, y = _bez(TAG0, (900, 240), (SX + SW - 120, ry), fl)
        price_tag(c, x, y, rupee(370000), GOLD, pa * (1 - seg(fl, .85, 1)), 30, -4 * (1 - fl))
    # the gap: price ₹3,70,000 -> block ₹4,00,000 ?
    ga = a * seg(t, A_WHY - .2, A_WHY + .4) * (1 - seg(t, B_ACTUAL - .6, B_ACTUAL - .2))
    if ga > 0:
        u = seg(t, A_WHY - .2, A_FOUR + .3)
        x1 = lerp(TAG0[0] + 120, ENTRY[0] - 110, u)
        c.drawLine(TAG0[0] + 120, TAG0[1], x1, ENTRY[1], _dash(GOLD, .8 * ga, 2.4))
        text(c, '?', 870, 312, 76, 800, GOLD, ga * (.75 + .25 * math.sin(t * 5)), 'c', shadow=10)
    # k2: the actual-cost sheet
    sa = a * seg(t, B_ACTUAL - .3, B_ACTUAL + .25)
    if sa > 0:
        rect = sheet(c, SX, SY, SW, ROWS, sa, t, title=SH_TITLE, grow=True)
        ca = sa * seg(t, B_SEC - .15, B_SEC + .3, back)
        if ca > 0: sec(c, SX + SW, SY - 26, '43(1)', ca, size=24, align='r')
        # the total pulses across to the block's entry
        pu = seg(t, B_INST + .9, B_INST + 1.5)
        if pu > 0 and t < K4:
            ty = sheet_row_y(SX, SY, ROWS, 4, title=SH_TITLE)
            P = np.array([(SX + SW + 6, ty), (SX + SW + 50, ty), (ENTRY[0] - 40, ENTRY[1] + 30)])
            la = sa * (1 - seg(t, K3 - .3, K3 + .2))
            c.drawPath(poly(P, False), _dash(GOLD, .7 * la, 2.2))
            flowdots(c, P, (t * .6) % 1, la, GOLD, 5, 5)
    # the freight truck and the installation spanner
    tu = seg(t, B_TEN - .6, B_FREIGHT + .25, eout)
    ta = a * seg(t, B_TEN - .6, B_TEN - .3) * (1 - seg(t, K4 - .6, K4 - .2))
    if ta > 0:
        tx = lerp(-200, OX + 10, tu)
        truck(c, tx, TRK_Y, TRK_S, ta, 'light', ORANGE, None, t, tx * 2)
        text(c, 'freight', tx + 88, TRK_Y - 26, 24, 700, DIM, ta * seg(t, B_FREIGHT - .1, B_FREIGHT + .3), shadow=6)
    wa = a * seg(t, B_TWENTY - .25, B_TWENTY + .15) * (1 - seg(t, K3 + 1.2, K3 + 1.6))
    if wa > 0:
        _wrench(c, OX + 150, 555, .9, -35 + 22 * math.sin(t * 7), DIM, wa)
        text(c, 'installation', OX + 150, 610, 22, 700, DIM, wa, 'c', shadow=6)
    # k3: if the state paid part of it
    ia = a * seg(t, C_SOMEONE - .2, C_SOMEONE + .25) * (1 - seg(t, K4 - .35, K4))
    if ia > 0:
        c.drawRRect(rrect(SX, IFY, SW, 122, 16), paint('#0b1024', .8 * ia))
        c.drawRRect(rrect(SX, IFY, SW, 122, 16), _dash(VIO, .8 * ia, 2))
        text(c, 'IF', SX + 22, IFY + 30, 20, 800, VIO, ia, track=3)
        _badge(c, SX + 56, IFY + 74, 30, ia, 'bank', VIO)
        la = ia * seg(t, C_FIFTY - .25, C_FIFTY + .2)
        text(c, 'the state pays ₹50,000 of it as a subsidy', SX + 106, IFY + 50, 26, 700, WHITE, la)
        ma = ia * seg(t, C_SUBSIDY - .1, C_SUBSIDY + .3)
        w_ = _mono(c, '₹4,00,000 − ₹50,000 = ', SX + 106, IFY + 98, 28, DIM, ma)
        ra = ia * seg(t, C_THREE - .15, C_THREE + .25, back)
        if ra > 0: _mono(c, rupee(350000), SX + 106 + w_, IFY + 98, 30, GOLD, ra)
    # k4: cash breaks the cost
    da = a * seg(t, D_CASH - .2, D_CASH + .3)
    if da > 0:
        v = 2.4e4 * seg(t, D_ANY, D_CASH2 + .2, linr)
        mfa = da * (1 - seg(t, D_LEFT + .4, D_LEFT + .8))
        meter(c, 900, IFY + 52, 360, mfa, value=v, limit=1e4, label='cash · one person · one day', fmt='', hi=3e4,
              lim_fmt='₹10,000')
        n = 1 + int(4 * seg(t, D_ANY, D_CASH2 + .2, linr))
        bu = seg(t, D_LEFT - .05, D_LEFT + .3, ein) * (1 - seg(t, D_LEFT + .3, D_LEFT + .8, eout))
        bx, by = lerp(700, 860, bu), lerp(IFY + 72, SY + 360, bu)
        over = v > 1e4
        if over: c.drawCircle(bx, by, 70, paint(RED, .22 * da, blur=24))
        notes(c, bx, by, da, n, .62, -6 + 3 * math.sin(t * 2))
        hit = win(t, D_LEFT + .2, D_LEFT + 1.4, .1, .6)
        if hit > 0:
            c.drawLine(SX + 20, SY + 368, SX + SW - 20, SY + 368, paint(RED, .9 * hit * da, stroke=5))
            c.drawLine(SX + 20, SY + 368, SX + SW - 20, SY + 368, paint(RED, .5 * hit * da, stroke=14, blur=8))
        xa = da * seg(t, D_LEFT + .5, D_LEFT + .8, back)
        if xa > 0:
            cross(c, 920, IFY + 70, xa, 22)
            text(c, 'left out of the cost', 956, IFY + 79, 28, 800, RED, xa, shadow=6)
        su = seg(t, D_NO - .05, D_NO + .95)
        if su > 0: stamp(c, 700, IFY + 76, 'NO DEPRECIATION', RED, da, su, -8, 22)

# ---------------------------------------------------------------- k5: interest before and after first use
def _months():
    out = []
    for m in range(12):
        y, mo = (2025, 4 + m) if m < 9 else (2026, m - 8)
        ny, nmo = (y, mo + 1) if mo < 12 else (y + 1, 1)
        x0 = yearbar_x(YX, YW, (y, mo, 1)); x1 = yearbar_x(YX, YW, (ny, nmo, 1)) if m < 11 else YX + YW
        d = _ORD((ny, nmo, 1)) if m < 11 else 365.
        te = lerp(A0, A1, d / _ORD((2025, 6, 1))) if m < 2 else lerp(B0, B1, (d - 61) / (365 - 61))
        out.append(((x0 + x1) / 2, te, m < 2))
    return out
MONTHS_ = _months()

def _p2(c, t):
    a = seg(t, K5 - .45, K5 - .05) * (1 - seg(t, K6 - .5, K6 - .1))
    if a <= 0: return
    marks = [((2025, 4, 1), 'borrowed', ACC, seg(t, E_BORROW - .1, E_BORROW + .3)),
             ((2025, 6, 1), 'first put to use · 1 Jun', GOLD, seg(t, E_JUNE - .2, E_JUNE + .2))]
    # the cursor shades the part of the year already covered
    if t < B0: cd = lerp(0, 61, seg(t, A0, A1, linr))
    else: cd = lerp(61, 365, seg(t, B0, B1, linr))
    cx = YX + YW * cd / 365
    spans = []
    if cd > 0: spans.append(((2025, 4, 1), (2025, 4, 1, min(cd, 61)), None, GOLD, seg(t, A0, A0 + .3)))
    if cd > 61: spans.append(((2025, 6, 1), (2025, 6, 1, cd - 61), None, GREEN, 1.))
    yearbar(c, YX, YY, YW, a, t, marks=marks, spans=())
    # shaded spans drawn by hand (fractional end days)
    for (d0, d1, _, col, al) in spans:
        xa = yearbar_x(YX, YW, d0); xb = YX + YW * (_ORD(d0) + d1[3]) / 365 if len(d1) > 3 else yearbar_x(YX, YW, d1)
        c.drawRect(skia.Rect(xa, YY + 4, xb, YY + 52), paint(col, .3 * a * al))
    # the dividing line (first spoken without a date, it sits on 1 June)
    va = a * seg(t, E_DIV - .2, E_DIV + .3)
    if va > 0:
        c.drawLine(X_JUN, 300, X_JUN, 780, _dash(GOLD, .8 * va, 2.6, 12, 8))
        text(c, 'the dividing line', X_JUN + 14, 790, 22, 700, GOLD, va * .9, shadow=6)
    # the loan
    la = a * seg(t, E_BORROW - .2, E_BORROW + .2)
    if la > 0:
        _badge(c, 160, 528, 34, la, 'bank', ACC)
        text(c, 'loan', 160, 598, 22, 700, DIM, la, 'c')
    # the two destinations
    ca = a * seg(t, A0 - .3, A0 + .1)
    if ca > 0:
        c.drawRRect(rrect(84, 290, 386, 116, 16), paint('#1a1405', .85 * ca))
        c.drawRRect(rrect(84, 290, 386, 116, 16), paint(GOLD, .8 * ca, stroke=2))
        oven(c, 136, 396, .28, ca, t, on=.6)
        text(c, "the oven's actual cost", 190, 330, 23, 800, GOLD, ca)
        text(c, 'added to cost', 190, 360, 21, 600, DIM, ca * seg(t, E_ADDED - .2, E_ADDED + .2))
    xa = a * seg(t, B0 - .35, B0 + .05)
    if xa > 0:
        c.drawRRect(rrect(560, 628, 1110, 110, 16), paint('#04140b', .85 * xa))
        c.drawRRect(rrect(560, 628, 1110, 110, 16), paint(GREEN, .8 * xa, stroke=2))
        text(c, 'normal expense', 590, 668, 26, 800, GREEN, xa * seg(t, E_NORMAL - .2, E_NORMAL + .2), shadow=6)
        sa = xa * seg(t, E_SEC - .15, E_SEC + .3, back)
        if sa > 0: sec(c, 590 + text_w('normal expense', 26, 800) + 16, 660, '36', sa, size=22)
    # the cursor and the monthly interest coins
    if A0 - .1 < t < B1 + .4 and (t < A1 + .2 or t > B0 - .1):
        c.drawLine(cx, YY - 8, cx, YY + 64, paint(WHITE, .9 * a, stroke=3))
        coin(c, cx, YY - 22, 13, a, GOLD)
    nu = nd = 0
    for mx, te, up in MONTHS_:
        u = seg(t, te, te + .7)
        if t < te - .02: continue
        if up: tx, ty = 210 + 46 * nu, 382; nu += 1
        else: tx, ty = 610 + 100 * nd, 712; nd += 1
        x, y = _bez((mx, YY + 28), ((mx + tx) / 2, min(YY, ty) - 60 if up else max(YY + 56, ty) + 10), (tx, ty), ease(u))
        coin(c, x, y, 14, a, GOLD if up else GREEN, '₹')
    ia = a * seg(t, E_INT2 - .2, E_INT2 + .2)
    text(c, 'interest on the loan', YX + YW, YY - 30, 22, 700, DIM, ia * .9, 'r')

# ---------------------------------------------------------------- k6: an old asset keeps its original cost
def _p3(c, t):
    a = seg(t, K6 - .45, K6 - .05) * (1 - seg(t, K7 - .5, K7 - .1))
    if a <= 0: return
    lane(c, 110, 330, 690, 400, 'Meera · personal use', DIM, a * .9)
    lane(c, 1000, 330, 810, 400, "Meera's Bakehouse · business", GOLD, a * .9)
    ha = a * seg(t, F_ORIG - .2, F_ORIG + .3)
    if ha > 0: text(c, 'old assets keep their original cost', 960, 296, 32, 800, GOLD, ha, 'c', shadow=8)
    u = seg(t, F_JOINS - .05, F_JOINS + 1.4, ease); x = lerp(455, 1300, u)
    ci = seg(t, F_PERS - .6, F_PERS + .5, eout); x -= 560 * (1 - ci)
    _car(c, x, 650, 1., a * seg(ci, 0, .25), '#7c3aed', x * 2)
    ba = a * seg(t, F_BOUGHT - .2, F_BOUGHT + .2)
    kk = seg(t, F_FIVE2 - .25, F_FIVE2 + .2)
    text(c, 'bought in 2022', x, 452, 24, 700, DIM, ba * (1 - kk), 'c', shadow=6)
    pa = a * seg(t, F_FIVE - .2, F_FIVE + .25, back)
    if pa > 0: price_tag(c, x, 498, rupee(525000), GOLD, pa, 30)
    ka = a * seg(t, F_FIVE2 - .25, F_FIVE2 + .2, back)
    if ka > 0:
        text(c, 'its actual cost: the original cost', x, 452, 24, 800, GOLD, ka, 'c', shadow=6)
        tick(c, x + 128, 498, ka, 17)
    ma = a * seg(t, F_TODAY - .2, F_TODAY + .25)
    if ma > 0:
        price_tag(c, 1640, 498, rupee(250000), '#94a3b8', ma, 26)
        text(c, "today's market value", 1640, 452, 22, 700, DIM, ma, 'c', shadow=6)
        su = seg(t, F_VALUE - .1, F_VALUE + .3)
        if su > 0:
            c.drawLine(1550, 498, lerp(1550, 1735, su), 498, paint(RED, ma, stroke=4))
            cross(c, 1640, 560, ma * su, 18)

# ---------------------------------------------------------------- k7: two odd cases
def _p4(c, t):
    a = seg(t, K7 - .45, K7 - .05) * (1 - seg(t, K8 - .5, K8 - .1))
    if a <= 0: return
    aa = a * seg(t, G_BUILD - .3, G_BUILD + .2)
    if aa > 0:
        slab(c, 110, 320, 790, 430, aa, ACC, 'A building moved from personal use', icon_name='building')
        u = seg(t, G_MOVED - .1, G_MOVED + 1.0, ease)
        bx = lerp(280, 640, u)
        building(c, bx, 600, .42, aa, 2)
        chip(c, 280, 640, 'personal', DIM, aa * .9, 22); chip(c, 640, 640, 'business', GOLD, aa * .9, 22)
        if u > 0: arrow(c, 350, 640, lerp(350, 560, u), 640, GOLD, 3, aa * .8, 14)
        ca = aa * seg(t, G_COST - .15, G_COST + .2)
        w_ = text_w('cost ', 30, 800)
        text(c, 'cost ', 150, 712, 30, 800, WHITE, ca, shadow=6)
        text(c, '− the depreciation it would have had', 150 + w_, 712, 30, 800, ORANGE, aa * seg(t, G_MINUS - .1, G_MINUS + .3), shadow=6)
    ba = a * seg(t, G_GIFT - .3, G_GIFT + .2)
    if ba > 0:
        slab(c, 1010, 320, 800, 430, ba, PINK, 'A gift or an inheritance', icon_name='gift')
        _gift(c, 1210, 640, 1.05, ba, seg(t, G_INHER - .1, G_INHER + .6))
        pa = ba * seg(t, G_PREV - .25, G_PREV + .15)
        if pa > 0:
            person(c, 1560, 640, .85, pa, 'sunil', t)
            text(c, 'previous owner', 1560, 432, 22, 700, DIM, pa, 'c', shadow=6)
        w_ = text_w("previous owner's cost ", 30, 800)
        text(c, "previous owner's cost ", 1050, 712, 30, 800, WHITE, pa, shadow=6)
        text(c, '− depreciation since', 1050 + w_, 712, 30, 800, ORANGE, ba * seg(t, G_MINUS2 - .1, G_MINUS2 + .3), shadow=6)

# ---------------------------------------------------------------- k8: imported on credit (43A)
def _p5(c, t):
    a = seg(t, K8 - .45, K8 - .05) * (1 - seg(t, K9 - .5, K9 - .1))
    if a <= 0: return
    su = seg(t, K8 - .4, H_IMPORT + .3, eout); sx = lerp(-260, 420, su)
    c.save(); c.translate(0, 0)
    ship(c, sx, 640, .72, a, t)
    bob = 3 * .72 * math.sin(t * 1.2)
    c.drawRRect(rrect(sx - 50, 640 - 178 + bob, 100, 52, 6), paint('#e8d9b5', a))
    c.drawRRect(rrect(sx - 50, 640 - 178 + bob, 100, 52, 6), paint('#8a6d3b', a, stroke=2))
    text(c, 'OVEN', sx, 640 - 145 + bob, 22, 800, INK, a, 'c', track=2)
    c.restore()
    ca = a * seg(t, H_CREDIT - .2, H_CREDIT + .25, back)
    if ca > 0: chip(c, 420, 380, 'bought on credit · pay later in $', ACC, ca, 24)
    ga = a * seg(t, H_RUPEE - .6, H_RUPEE - .2)
    if ga > 0:
        v = lerp(.3, .78, seg(t, H_RUPEE, H_PAID + .2))
        gauge(c, 1010, 640, 140, ga, v, 0, 1, ticks=[(0, ''), (.5, ''), (1, '')], label='rupees per dollar',
              zones=[(.6, 1, ORANGE)])
        fa = ga * seg(t, H_RUPEE + .1, H_RUPEE + .5)
        if fa > 0:
            text(c, 'the rupee falls', 1010, 440, 28, 800, ORANGE, fa, 'c', shadow=6)
            arrow(c, 1010, 452, 1010, 482, ORANGE, 4, fa, 14)
    # the oven's cost column grows by the extra rupees
    oa = a * seg(t, H_CREDIT - .2, H_CREDIT + .3)
    if oa > 0:
        bx, base, h0 = 1400, 720, 230
        ex = 64 * seg(t, H_EXTRA + .3, H_ADDED + .2)
        c.drawRRect(rrect(bx, base - h0, 110, h0, 6), paint(shader=lgrad((bx, 0), (bx + 110, 0), [shade(ACC, .1), shade(ACC, -.4)]), a=.9 * oa))
        if ex > .5:
            c.drawRRect(rrect(bx, base - h0 - ex, 110, ex + 6, 6), paint(GOLD, .95 * oa))
            c.drawRRect(rrect(bx - 4, base - h0 - ex - 4, 118, ex + 8, 8), paint(GOLD, .4 * oa, blur=8, stroke=6))
        text(c, "oven's cost in ₹", bx + 55, base + 34, 24, 700, DIM, oa, 'c')
        xa = oa * seg(t, H_EXTRA - .1, H_EXTRA + .3)
        text(c, '+ extra rupees', bx + 130, base - h0 - ex / 2 + 9, 26, 800, GOLD, xa, shadow=6)
        text(c, 'added to cost', bx + 130, base - h0 - ex / 2 + 40, 22, 700, DIM, oa * seg(t, H_ADDED - .1, H_ADDED + .3))
        for k in range(3):
            u = seg(t, H_EXTRA - .1 + .18 * k, H_EXTRA + .55 + .18 * k)
            if 0 < u < 1:
                x, y = _bez((1010, 560), (1220, 380), (bx + 55, base - h0 - 20), u)
                coin(c, x, y, 16, oa, GOLD)
    sa = a * seg(t, H_SEC - .15, H_SEC + .3, back)
    if sa > 0: sec(c, 1455, 400, '43A', sa, size=30, align='c')

# ---------------------------------------------------------------- k9: check, below the card
def _check(c, t):
    a = seg(t, K9 - .2, K9 + .4)
    if a <= 0: return
    items = [('₹6,00,000 in all', GOLD, Q_SIX), ('− ₹1,00,000 subsidy', VIO, Q_ONE), ('− ₹50,000 cash', RED, Q_CASH),
             ('= ₹4,50,000', GREEN, QA_FOUR)]
    ws = [text_w(s, 28, 700) + 28 * 1.3 for s, _, _ in items]; gap = 22
    x = 960 - (sum(ws) + gap * (len(ws) - 1)) / 2; y = 768
    for (s, col, tt), w_ in zip(items, ws):
        u = seg(t, tt - .2, tt + .3, back)
        if u > 0: chip(c, x + w_ / 2, y + 10 * (1 - u), s, col, a * clamp(u * 2), 28, fill=.2 if col != GREEN else .3)
        x += w_ + gap

def ch_k(c, t):
    if t < CS - .5 or t > CE + .5: return
    _p1(c, t)
    _p2(c, t)
    _p3(c, t)
    _p4(c, t)
    _p5(c, t)
    _check(c, t)
