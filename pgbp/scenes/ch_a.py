"""Chapter A — intro: twelve lakh in the books, nineteen for tax.
a1 hook: dawn over Meera's Bakehouse, Pune; the shop's lights come on and Meera rises behind her glass counter; a
   cream P&L flies up out of the counter (Sales ₹2,40,00,000 · Expenses ₹2,28,00,000 · Net profit ₹12,00,000) and
   its net-profit row lights on "twelve lakh"; on "nineteen lakh" a gold "Taxable ₹18,99,000" figure assembles
   beneath it (digits rolling) and a "?" bracket joins the two amounts; Meera's smile turns to a worried look
a2 the shop slides away; one wedding cake stands between two rulers: the Accountant's ruler reaches the cake's top
   at ₹12,00,000, the Income-tax Act's ruler (finer marks) reaches the same height at ₹18,99,000; a dashed line
   shows it is the same height; on "gap" the stretch of the Act's ruler above its 12 mark glows gold ("the gap =
   this whole chapter") and the bracket beside the figures glows with it
a3 a rupee coin rolls along a track under three question cards, each lighting as it is asked: Is it business
   income at all? · Is this cost allowed? · Is it allowed this year?
a4 the three questions shrink into a row at the top; a road with four stops (What gets taxed · What you can deduct ·
   What you can't · Shortcuts for small businesses), the coin driving stop to stop, ends at Meera's full
   computation, whose lines write in one by one ("line by line") down to PGBP ₹18,99,000
a5 a law plaque lights segment by segment: Income-tax Act, 1961 (the Act's book rises) · Finance Act 2025 (an
   amending slip slides into the book, AMENDED) · A.Y. 2026-27 (a year bar: P.Y. 2025-26, then the assessment
   year grows in) · Jan 2027 exam (January 2027 shaded on the bar)
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

FW = 1920                                                   # frame width (W is the word-time helper here)
CS, CE = B.span('a')
A1, A2, A3, A4, A5 = (T(b) for b in ('a1', 'a2', 'a3', 'a4', 'a5'))

# ---------------------------------------------------------------- word times
MEERA, BAKERY, PUNE, BOOKS = W('a1', 'meera'), W('a1', 'bakery'), W('a1', 'pune'), W('a1', 'books')
TWELVE, WHY, NINETEEN = W('a1', 'twelve'), W('a1', 'why'), W('a1', 'nineteen')
CHEAT, ACCT, ONEWAY = W('a2', 'cheated'), W('a2', 'accountant'), W('a2', 'one way')
ITA, ANOTHER, GAP, WHOLE = W('a2', 'income tax act'), W('a2', 'another'), W('a2', 'gap'), W('a2', 'whole')
THREEQ, RUPEE = A3 + .1, W('a3', 'rupee')
Q1, Q2, Q3 = W('a3', 'business'), W('a3', 'cost'), W('a3', 'and')
ANSWER, TAXED, DEDUCT = W('a4', 'answer'), W('a4', 'gets'), W('a4', 'deduct')
CANT, SHORT, END4 = W('a4', 'what', occ=2), W('a4', 'shortcuts'), W('a4', 'end')
MEERA4, LINE = W('a4', 'meera'), W('a4', 'line')
ACT5, Y1961, AMEND, FIN = W('a5', 'income'), W('a5', 'nineteen'), W('a5', 'amended'), W('a5', 'finance')
ASSESS, JAN = W('a5', 'assessment'), W('a5', 'january')

for tt, k in ((BAKERY - .3, 'blip'), (BOOKS - .1, 'whoosh'), (BOOKS + .7, 'flip'), (TWELVE, 'tick'),
              (NINETEEN, 'pop'), (NINETEEN + .9, 'chime_lo'), (NINETEEN + 1.05, 'warn'),
              (ACCT, 'whoosh'), (ONEWAY + .2, 'tick'), (ITA, 'whoosh'), (ANOTHER + .3, 'tick'), (GAP, 'chime'),
              (Q1 - .25, 'pop'), (Q2 - .25, 'pop'), (Q3 - .2, 'pop'),
              (ANSWER, 'whoosh'), (TAXED, 'blip'), (DEDUCT, 'blip'), (CANT, 'blip'), (SHORT, 'blip'),
              (LINE + .9, 'chime'),
              (ACT5, 'pop'), (AMEND + .7, 'flip'), (FIN + .55, 'thunk'), (JAN, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _mono_w(s, size): return ftext_w(s, size, MONO, 700)

def _pill(c, x, y, s, col, a, size=28, fill=.2, w_=800, tcol=WHITE, icon_name=None):
    """A rounded label pill centred at (x, y), optional line icon on its left. Returns its width."""
    if a <= 0: return 0
    tw = text_w(s, size, w_); iw = size * 1.25 if icon_name else 0
    w = tw + iw + size * 1.3; h = size * 1.75
    x0 = x - w / 2
    c.drawRRect(rrect(x0, y - h / 2 + 6, w, h, h / 2), paint(BLACK, .35 * a, blur=10))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(shade(col, -.78), .95 * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, .9 * a, stroke=2))
    if icon_name: icon(c, icon_name, x0 + size * .65 + iw / 2, y, size / 64 * 1.1, col, a, 3.4)
    text(c, s, x0 + size * .65 + iw, y + size * .36, size, w_, tcol, a)
    return w

def _pin(c, x, y, a, col=ACC, s=1.):
    """A map pin whose tip sits at (x, y + 16 s)."""
    if a <= 0: return
    p = skia.Path(); p.moveTo(x, y + 16 * s)
    p.cubicTo(x - 6 * s, y + 6 * s, x - 14 * s, y - 2 * s, x - 14 * s, y - 10 * s)
    p.cubicTo(x - 14 * s, y - 28 * s, x + 14 * s, y - 28 * s, x + 14 * s, y - 10 * s)
    p.cubicTo(x + 14 * s, y - 2 * s, x + 6 * s, y + 6 * s, x, y + 16 * s); p.close()
    c.drawPath(p, paint(RED, a)); c.drawPath(p, paint(shade(RED, -.4), a, stroke=1.6))
    c.drawCircle(x, y - 11 * s, 5 * s, paint(WHITE, a))

def _glow_rr(c, x, y, w, h, r, col, g):
    if g > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * g, stroke=8, blur=10))

# ---------------------------------------------------------------- a1: dawn at the bakery, the two figures
GY = 812                                                     # pavement line
SHX, SHS = 470, .9                                           # shop
CNX = 890                                                    # counter + Meera
LX, LY, LW = 1110, 292, 600                                  # the P&L
LROWS = [('Sales', 24000000, ''), ('Expenses', 22800000, ''), ('Net profit', 1200000, 'total')]
LSUB = 'for the year ended 31 March 2026'
NP_Y = LY + 96 + 2.5 * 26 * 1.85                             # centre of the net-profit row
TX_Y, TX_H = 592, 100                                        # the taxable card
BRX = 1738                                                   # the gap bracket

_DAWN = []
def _dawn_img():
    """The sunrise glow, rendered once at low resolution (a smooth gradient upscales cleanly)."""
    if not _DAWN:
        sf = skia.Surface(256, 256); cv = sf.getCanvas()
        cv.drawPaint(paint(shader=rgrad(128, 128, 128, [('#fbbf24', .26), ('#fb923c', .1), ('#fb923c', 0)], [0, .42, 1])))
        _DAWN.append(sf.makeImageSnapshot())
    return _DAWN[0]

def _dawn(c, t, a):
    if a <= 0: return
    u = seg(t, CS, A2 + .5, linr)
    sy = lerp(1000, 770, eout(u))
    img = _dawn_img()
    p = skia.Paint(); p.setAlphaf(clamp(a))
    c.save(); c.clipRect(skia.Rect(0, 170, FW, GY + 4))
    c.drawImageRect(img, skia.Rect(SHX + 180 - 820, sy - 820, SHX + 180 + 820, sy + 820), skia.SamplingOptions(skia.FilterMode.kLinear), p)
    c.restore()
    c.drawRect(skia.Rect(80, GY - 2, 1840, GY + 70), paint(shader=lgrad((0, GY), (0, GY + 70), [('#020617', .45 * a), ('#020617', 0)])))
    c.drawLine(80, GY, 1840, GY, paint('#94a3b8', .22 * a, stroke=2))

def _shopfront(c, t, a):
    """Shop + Meera behind the counter (a1), sliding off left in a2."""
    out = seg(t, A2 - .3, A2 + .8)
    a = a * (1 - out)
    if a <= 0: return
    dx = -260 * ein(out)
    ia = a * seg(t, CS + .05, CS + .9)
    lit = seg(t, BAKERY - .45, BAKERY + .7)
    shop(c, SHX + dx, GY, SHS, ia, t, lit=lit)
    pa = a * seg(t, PUNE - .3, PUNE + .2, back)
    if pa > 0:
        px, py = SHX + dx, GY - 466 * SHS - 40
        w_ = _pill(c, px + 12, py, 'Pune', ACC, pa, 26, .15, 800)
        _pin(c, px + 12 - w_ / 2 - 6, py + 2, pa)
    # Meera rises behind the counter, smiles, then frowns at "why will she pay tax"
    ma = a * seg(t, MEERA - .25, MEERA + .35)
    if ma > 0:
        rise = 46 * (1 - seg(t, MEERA - .25, MEERA + .55, eout))
        mood = lerp(.75, -.55, seg(t, WHY - .1, WHY + .6))
        look = lerp(0, .7, seg(t, BOOKS - .2, BOOKS + .6))
        person(c, CNX + dx, 748 + rise, .95, ma, 'meera', t, mood=mood, look=look)
    counter(c, CNX + dx, GY, .85, ia)

def _ledger_fly(c, t, a):
    if t < BOOKS - .2 or a <= 0: return
    fu = seg(t, BOOKS - .15, BOOKS + .85)
    x = lerp(CNX - 70, LX, fu); y = lerp(610, LY, fu) - 150 * math.sin(math.pi * fu)
    sc = lerp(.2, 1., fu)
    u = seg(t, BOOKS + .4, BOOKS + .95, linr)
    hl = {2: seg(t, TWELVE - .05, TWELVE + .4) * (1 - .55 * seg(t, A3 - 1.5, A3 - .8))}
    ledger(c, x, y, LW, LROWS, a * seg(t, BOOKS - .2, BOOKS + .1), u=u, hl=hl, sc=sc, sub=LSUB)
    # "nobody cheated": a green tick on the books
    ha = a * seg(t, CHEAT - .2, CHEAT + .3, back) * (1 - seg(t, ACCT - .3, ACCT + .2))
    if ha > 0 and fu >= 1:
        tick(c, LX + LW - 40, LY + 42, ha, 20)
        text(c, 'honest books', LX + LW - 72, LY + 50, 24, 800, GREEN, ha, 'r')

def _taxcard(c, t, a, glow):
    u = seg(t, NINETEEN - .45, NINETEEN + .15, eout)
    if u <= 0 or a <= 0: return
    x, y, w, h = LX, TX_Y + 24 * (1 - u), LW, TX_H
    aa = a * u
    c.drawRRect(rrect(x, y + 9, w, h, 18), paint(BLACK, .45 * aa, blur=14))
    c.drawRRect(rrect(x, y, w, h, 18), paint('#171204', .94 * aa))
    _glow_rr(c, x, y, w, h, 18, GOLD, glow * aa)
    c.drawRRect(rrect(x, y, w, h, 18), paint(GOLD, .85 * aa, stroke=2.2))
    text(c, 'Taxable', x + 26, y + 48, 34, 800, WHITE, aa)
    text(c, 'under the Income-tax Act', x + 26, y + 80, 22, 600, DIM, aa * .9)
    ru = seg(t, NINETEEN - .05, NINETEEN + .85, linr)
    roll(c, 1899000, x + w - 22, y + 66, ru, 42, GOLD, aa, 'r', glow=4 if ru >= 1 else 0)

def _bracket(c, t, a, glow):
    u = seg(t, NINETEEN + .35, NINETEEN + 1.0)
    if u <= 0 or a <= 0: return
    y0, y1 = NP_Y, TX_Y + TX_H / 2; ym = (y0 + y1) / 2
    col = GOLD
    p = skia.Path(); p.moveTo(BRX - 18, y0); p.lineTo(BRX, y0); p.lineTo(BRX, y1); p.lineTo(BRX - 18, y1)
    m = skia.PathMeasure(p, False); L = m.getLength(); q = skia.Path(); m.getSegment(0, L * u, q, True)
    if glow > 0: c.drawPath(q, paint(col, .45 * a * glow, stroke=10, blur=8))
    c.drawPath(q, paint(col, .95 * a, stroke=3))
    ca = a * seg(t, NINETEEN + .75, NINETEEN + 1.15, back)
    if ca > 0:
        r = 25 * (1 + .1 * glow * math.sin(t * 6))
        c.drawCircle(BRX + 42, ym, r + 8, paint(col, .25 * ca * (.5 + glow), blur=10))
        c.drawCircle(BRX + 42, ym, r, paint('#1a1405', ca)); c.drawCircle(BRX + 42, ym, r, paint(col, ca, stroke=2.4))
        text(c, '?', BRX + 42, ym + 12, 34, 800, col, ca, 'c')

# ---------------------------------------------------------------- a2: one cake, two rulers
CKX, GY2 = 525, 770
R1X, R2X, RT = 290, 760, 400                                 # ruler centres, ruler top (= the cake's top)
RW = 50
V1, V2 = 12., 18.99                                          # lakh

def _ruler(c, t, x, u, vmax, col, a, label, nums):
    """A vertical ruler from GY2 up to RT, grown to fraction u; ticks every lakh, numbers every 4 lakh."""
    if a <= 0 or u <= 0: return
    H = GY2 - RT; top = GY2 - H * eout(u)
    c.drawRRect(rrect(x - RW / 2 + 4, top + 8, RW, GY2 - top, 8), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(x - RW / 2, top, RW, GY2 - top, 8), paint(shade(col, -.72), .96 * a))
    c.drawRRect(rrect(x - RW / 2, top, RW, GY2 - top, 8), paint(col, .85 * a, stroke=2))
    c.save(); c.clipRect(skia.Rect(x - RW, top - 4, x + RW, GY2 + 2), True)
    v = 0
    while v <= vmax + 1e-6:
        yy = GY2 - H * v / vmax
        major = abs(v % 4) < 1e-6
        c.drawLine(x - RW / 2, yy, x - RW / 2 + (22 if major else 12), yy, paint(shade(col, .4), .9 * a, stroke=2.2 if major else 1.4, cap=False))
        if major and 0 < v < vmax - 1.5 and v in nums:
            text(c, '%d' % v, x + 6, yy + 8, 22, 800, shade(col, .5), a, 'l')
        v += 1
    c.restore()
    la = a * seg(u, .5, 1)
    text(c, label, x, GY2 + 42, 27, 800, col, la, 'c')

def _readout(c, t, x, y, val, u, col, a):
    if a <= 0: return
    s = rupee(val); w = _mono_w(s, 32) + 34; h = 50
    c.drawRRect(rrect(x - w / 2, y - h / 2 + 6, w, h, 14), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 14), paint('#0b1020', .95 * a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 14), paint(col, .9 * a, stroke=2))
    roll(c, val, x, y + 11, u, 32, col, a, 'c')
    # pointer down to the ruler's top
    c.drawPath(poly(np.array([(x - 9, y + h / 2 - 1), (x + 9, y + h / 2 - 1), (x, y + h / 2 + 11)])), paint(col, .9 * a))

def _measure(c, t, a):
    a = a * seg(t, A2 + .25, A2 + 1.0) * (1 - seg(t, A3 - .55, A3 + .05))
    if a <= 0: return
    # table line + the cake
    c.drawLine(160, GY2, 890, GY2, paint('#94a3b8', .3 * a, stroke=2))
    cu = seg(t, A2 + .3, A2 + .95, back)
    cake(c, CKX, GY2, 1.35 * (.85 + .15 * cu), a * seg(t, A2 + .3, A2 + .7), 'wedding')
    # the accountant's ruler
    u1 = seg(t, ACCT - .15, ACCT + .7)
    _ruler(c, t, R1X, u1, V1, ACC, a, 'Accountant', (4, 8))
    r1 = seg(t, ACCT + .35, ONEWAY + .5, linr)
    ra = a * seg(t, ACCT + .3, ACCT + .7)
    _readout(c, t, R1X, RT - 46, 1200000, r1, WHITE, ra)
    # the Act's ruler: same height, finer marks
    u2 = seg(t, ITA - .15, ITA + .7)
    _ruler(c, t, R2X, u2, V2, VIO, a, 'Income-tax Act', (4, 8, 12, 16))
    r2 = seg(t, ITA + .45, ANOTHER + .45, linr)
    rb = a * seg(t, ITA + .4, ITA + .8)
    _readout(c, t, R2X, RT - 46, 1899000, r2, GOLD, rb)
    # same height: a dashed line across the cake's top
    da = a * seg(t, ANOTHER + .2, ANOTHER + .7)
    if da > 0:
        p = paint(DIM, .55 * da, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], (t * 30) % 18))
        c.drawLine(R1X + RW / 2 + 4, RT, R2X - RW / 2 - 4, RT, p)
        text(c, 'same cake', CKX, RT - 14, 22, 700, DIM, da * (1 - seg(t, GAP - .2, GAP + .3)), 'c')
    # the gap: the Act's ruler above its own 12 mark
    g = seg(t, GAP - .2, GAP + .4)
    if g > 0:
        y12 = GY2 - (GY2 - RT) * V1 / V2
        pul = .75 + .25 * math.sin((t - GAP) * 5)
        c.drawRRect(rrect(R2X - RW / 2 - 3, RT - 3, RW + 6, y12 - RT + 6, 9), paint(GOLD, .5 * a * g * pul, stroke=8, blur=8))
        c.drawRRect(rrect(R2X - RW / 2, RT, RW, y12 - RT, 8), paint(GOLD, .42 * a * g))
        c.drawLine(R2X - RW / 2 - 12, y12, R2X - RW / 2 + 24, y12, paint(WHITE, .9 * a * g, stroke=2.6))
        bx = R2X + RW / 2 + 20
        bp = skia.Path(); bp.moveTo(bx, RT + 2); bp.lineTo(bx + 12, RT + 2); bp.lineTo(bx + 12, y12 - 2); bp.lineTo(bx, y12 - 2)
        c.drawPath(bp, paint(GOLD, .95 * a * g, stroke=2.6))
        ym = (RT + y12) / 2
        text(c, 'the gap', bx + 30, ym + 6, 32, 800, GOLD, a * g, 'l', shadow=6)
        wa = a * seg(t, WHOLE - .35, WHOLE + .25)
        text(c, '= this whole chapter', bx + 30, ym + 42, 25, 700, WHITE, wa, 'l', shadow=6)

def _figures(c, t):
    """The P&L, the taxable card and the bracket (a1 -> a2), cleared before a3."""
    a = 1 - seg(t, A3 - .6, A3 + .05)
    if a <= 0: return
    dy = -30 * ein(seg(t, A3 - .6, A3 + .05))
    g = win(t, GAP - .2, A3 - .5, .4, .4) * (.7 + .3 * math.sin(t * 5))
    tg = max(g, win(t, ANOTHER + .2, ANOTHER + 1.6, .3, .6))
    c.save(); c.translate(0, dy)
    _ledger_fly(c, t, a)
    _taxcard(c, t, a, tg)
    _bracket(c, t, a, g)
    c.restore()

# ---------------------------------------------------------------- a3: three questions for every rupee
QX, QY, QW, QH = (150, 710, 1270), 318, 500, 300
QS = (('Is it business income at all?', 'shop', ACC, Q1),
      ('Is this cost allowed?', 'scale', GREEN, Q2),
      ('Is it allowed this year?', 'calendar', ORANGE, Q3))
QL = ('Is it business\nincome at all?', 'Is this cost\nallowed?', 'Is it allowed\nthis year?')
TRACK_Y = 726
# a4 compact row
QXs, QYs, QWs, QHs = (130, 690, 1250), 176, 540, 66

def _qrect(t, k):
    m = seg(t, ANSWER - .25, ANSWER + .55)
    return (lerp(QX[k], QXs[k], m), lerp(QY, QYs, m), lerp(QW, QWs, m), lerp(QH, QHs, m), m)

def _coin_x(t):
    return keys(t, [(A3 - .3, -40), (A3 + .7, 190), (Q1 - .55, 190), (Q1 - .1, QX[0] + QW / 2),
                    (Q2 - .6, QX[0] + QW / 2), (Q2 - .1, QX[1] + QW / 2), (Q3 - .55, QX[1] + QW / 2),
                    (Q3 - .05, QX[2] + QW / 2)])

def _questions(c, t):
    a = seg(t, A3 - .4, A3 + .3) * (1 - seg(t, A5 - .15, A5 + .45))
    if a <= 0: return
    m = seg(t, ANSWER - .25, ANSWER + .55)
    # track + gates (a3 only)
    ta = a * (1 - m)
    if ta > 0:
        c.drawLine(110, TRACK_Y, 1810, TRACK_Y, paint('#94a3b8', .3 * ta, stroke=3))
        for k in range(3):
            gx = QX[k] + QW / 2
            on = seg(t, QS[k][3] - .3, QS[k][3] + .1)
            c.drawLine(gx, QY + QH + 8, gx, TRACK_Y - 46, paint(mixc('#475569', QS[k][2], on), (.4 + .5 * on) * ta, stroke=2.4))
            c.drawCircle(gx, TRACK_Y, 6, paint(mixc('#475569', QS[k][2], on), ta))
    for k, (q, ic, col, tq) in enumerate(QS):
        x, y, w, h, _ = _qrect(t, k)
        ba = a * seg(t, THREEQ - .1 + .14 * k, THREEQ + .35 + .14 * k)
        if ba <= 0: continue
        on = seg(t, tq - .3, tq + .2)
        hot = win(t, tq - .3, tq + 1.6, .3, .8) * (1 - m)
        fill = mixc('#0b1020', shade(col, -.72), on)
        c.drawRRect(rrect(x, y + 8, w, h, 20), paint(BLACK, .4 * ba, blur=14))
        c.drawRRect(rrect(x, y, w, h, 20), paint(fill, .95 * ba))
        _glow_rr(c, x, y, w, h, 20, col, hot * ba)
        c.drawRRect(rrect(x, y, w, h, 20), paint(mixc('#475569', col, on), (.6 + .35 * on) * ba, stroke=2))
        # big layout (a3)
        la = ba * (1 - seg(m, 0, .4))
        if la > 0:
            nx, ny = x + 46, y + 46
            c.drawCircle(nx, ny, 25, paint(shade(col, -.6), la)); c.drawCircle(nx, ny, 25, paint(mixc('#64748b', col, on), la, stroke=2))
            text(c, str(k + 1), nx, ny + 10, 28, 800, mixc(DIM, WHITE, on), la, 'c')
            iu = seg(t, tq - .3, tq + .3, back)
            icon(c, ic, x + w / 2, y + 108, 1.25 * (.85 + .15 * iu), mixc('#64748b', col, on), la * (.35 + .65 * on), 3.2)
            ls = QL[k].split('\n')
            for j, ln in enumerate(ls):
                yy = y + 210 + 46 * j - 20 * (len(ls) - 1) / 2
                text(c, ln, x + w / 2, yy + 8 * (1 - on), 36, 800, WHITE, la * on, 'c')
            if on < 1:
                text(c, '?', x + w / 2, y + 222, 44, 800, '#64748b', la * (1 - on) * .8, 'c')
        # compact layout (a4)
        sa = ba * seg(m, .55, 1)
        if sa > 0:
            sz = 25 if text_w(q, 25, 800) < w - 92 else 22
            c.drawCircle(x + 34, y + h / 2, 17, paint(shade(col, -.6), sa)); c.drawCircle(x + 34, y + h / 2, 17, paint(col, sa, stroke=2))
            text(c, str(k + 1), x + 34, y + h / 2 + 7, 20, 800, WHITE, sa, 'c')
            gl = win(t, ANSWER + .4 + .2 * k, ANSWER + 1.6 + .2 * k, .25, .6)
            text(c, q, x + 62, y + h / 2 + sz * .36, sz, 800, mixc(WHITE, col, gl), sa)
    # the rolling coin (a3)
    ca = a * (1 - seg(m, 0, .5))
    if ca > 0 and t > A3 - .3:
        x = _coin_x(t); r = 32
        ang = (x - 190) / r * 57.3
        pul = win(t, RUPEE - .2, RUPEE + .9, .2, .5)
        c.drawOval(skia.Rect.MakeXYWH(x - r * .9, TRACK_Y - 6, r * 1.8, 12), paint(BLACK, .45 * ca, blur=5))
        if pul > 0: c.drawCircle(x, TRACK_Y - r - 2, r * 1.6, paint(GOLD, .3 * pul * ca, blur=16))
        c.save(); c.translate(x, TRACK_Y - r - 2); c.rotate(ang)
        coin(c, 0, 0, r, ca, GOLD, '₹', 0, False)
        c.restore()
        ea = ca * win(t, RUPEE - .2, Q1 - .6, .3, .4)
        text(c, 'every rupee', x, TRACK_Y + 44, 26, 800, GOLD, ea, 'c')

# ---------------------------------------------------------------- a4: the road to Meera's computation
ROAD_PTS = [(90, 590), (300, 530), (620, 590), (940, 520), (1250, 580), (1488, 500)]
ROAD = catmull(ROAD_PTS)
_RL = arclen(ROAD)
def _s_at(p):
    d = np.hypot(ROAD[:, 0] - p[0], ROAD[:, 1] - p[1]); return float(_RL[int(np.argmin(d))])
STOPS = [('What gets taxed', 'coins', ACC, TAXED, -1), ('What you can deduct', 'tax', GREEN, DEDUCT, 1),
         ("What you can't", 'lock', RED, CANT, -1), ('Shortcuts for small businesses', 'shop', BLUE, SHORT, 1)]
S_AT = [_s_at(p) for p in ROAD_PTS[1:5]] + [float(_RL[-1])]
SHX4, SHY4, SHW4, SHH4 = 1506, 300, 320, 404

def _road_s(t):
    return keys(t, [(A4 + .4, 0.), (TAXED - .1, S_AT[0]), (DEDUCT - .55, S_AT[0]), (DEDUCT - .05, S_AT[1]),
                    (CANT - .35, S_AT[1]), (CANT - .02, S_AT[2]), (SHORT - .6, S_AT[2]), (SHORT - .05, S_AT[3]),
                    (END4 - .9, S_AT[3]), (END4 + .1, S_AT[4])])

def _roadmap(c, t):
    a = seg(t, A4 + .1, A4 + .8) * (1 - seg(t, A5 - .15, A5 + .45))
    if a <= 0: return
    ru = seg(t, A4 + .1, A4 + 1.1)
    n = max(2, int(len(ROAD) * ru))
    P = ROAD[:n]
    path = poly(P, False)
    c.drawPath(path, paint(BLACK, .4 * a, stroke=40, blur=8))
    c.drawPath(path, paint('#1a2340', a, stroke=34))
    c.drawPath(path, paint('#3b4a70', .8 * a, stroke=2.4))
    dp = paint(DIM, .35 * a, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([16, 14], 0))
    c.drawPath(path, dp)
    s = _road_s(t)
    if s > 1:
        k = int(np.searchsorted(_RL, s)); k = max(2, min(k, len(ROAD)))
        c.drawPath(poly(ROAD[:k], False), paint(GOLD, .3 * a, stroke=12, blur=6))
        c.drawPath(poly(ROAD[:k], False), paint(GOLD, .85 * a, stroke=4))
    # stops
    for k, (lab_, ic, col, ts, side) in enumerate(STOPS):
        px, py = ROAD_PTS[k + 1]
        on = seg(t, ts - .25, ts + .2)
        da = a * seg(t, A4 + .3 + .15 * k, A4 + .7 + .15 * k)
        c.drawCircle(px, py, 13, paint('#0b1020', da)); c.drawCircle(px, py, 13, paint(mixc('#64748b', col, on), da, stroke=3))
        if on > 0: c.drawCircle(px, py, 6, paint(col, da * on))
        pa = a * seg(t, ts - .3, ts + .25, back)
        if pa > 0:
            ly = py + side * 92
            c.drawLine(px, py + side * 16, px, ly - side * 26, paint(col, .8 * pa, stroke=2.2))
            _pill(c, px, ly, lab_, col, pa, 28, .2, 800, WHITE, ic)
    # the traveller
    if s > 1:
        (x, y), _ = along(ROAD, min(s, float(_RL[-1]) - .5))
        c.drawCircle(x, y, 30, paint(GOLD, .3 * a, blur=12))
        coin(c, x, y, 21, a, GOLD, '₹', 0, False)
    _comp_sheet(c, t, a)

def _comp_sheet(c, t, a):
    """Meera's full computation, its lines writing in one by one."""
    u = seg(t, END4 - .35, END4 + .35, back)
    if u <= 0: return
    x, y, w, h = SHX4, SHY4, SHW4, SHH4
    aa = a * seg(t, END4 - .35, END4 + .05)
    k = .8 + .2 * u
    c.save(); c.translate(x + w / 2, y + h / 2); c.scale(k, k); c.translate(-(x + w / 2), -(y + h / 2))
    c.drawRRect(rrect(x, y + 10, w, h, 18), paint(BLACK, .45 * aa, blur=16))
    c.drawRRect(rrect(x, y, w, h, 18), paint('#0b1024', .97 * aa))
    c.save(); c.clipRRect(rrect(x, y, w, h, 18), True)
    c.drawRect(skia.Rect.MakeXYWH(x, y, w, 64), paint(shader=lgrad((x, y), (x, y + 64), [shade(GOLD, .12), shade(GOLD, -.1)]), a=aa))
    c.restore()
    c.drawRRect(rrect(x, y, w, h, 18), paint(GOLD, .7 * aa, stroke=1.8))
    text(c, 'Full computation', x + 22, y + 42, 27, 800, '#1a1305', aa)
    ma = aa * seg(t, MEERA4 - .2, MEERA4 + .3)
    text(c, 'Meera · A.Y. 2026-27', x + 22, y + 98, 22, 700, DIM, ma)
    lines = [('start', 'Net profit', 1200000), ('add', None, .62), ('less', None, .5), ('less', None, .7),
             ('add', None, .45), ('total', 'PGBP', 1899000)]
    for j, (kd, lab_, v) in enumerate(lines):
        t0 = LINE - .05 + .19 * j
        lu = seg(t, t0, t0 + .32, eout)
        if lu <= 0: continue
        yy = y + 146 + 44 * j + (10 if kd == 'total' else 0)
        la = aa * seg(t, t0, t0 + .15)
        if kd in ('add', 'less'):
            col = GREEN if kd == 'add' else RED
            c.drawRRect(rrect(x + 22, yy - 13, 26, 26, 7), paint(col, .2 * la)); c.drawRRect(rrect(x + 22, yy - 13, 26, 26, 7), paint(col, .9 * la, stroke=1.6))
            c.drawLine(x + 29, yy, x + 41, yy, paint(col, la, stroke=2.6))
            if kd == 'add': c.drawLine(x + 35, yy - 6, x + 35, yy + 6, paint(col, la, stroke=2.6))
            bw = (w - 92) * v * lu
            c.drawRRect(rrect(x + 62, yy - 6, bw, 12, 6), paint('#64748b', .75 * la))
            c.drawRRect(rrect(x + w - 22 - 86 * lu, yy - 6, 86 * lu, 12, 6), paint('#94a3b8', .6 * la))
        elif kd == 'start':
            text(c, lab_, x + 22, yy + 8, 23, 700, WHITE, la)
            ftext(c, rupee(v), x + w - 22, yy + 9, 23, MONO, WHITE, la * lu, 'r')
        else:
            c.drawLine(x + 18, yy - 26, x + w - 18, yy - 26, paint(GOLD, .5 * la, stroke=1.4))
            text(c, lab_, x + 22, yy + 9, 26, 800, GOLD, la)
            ftext(c, rupee(v), x + w - 22, yy + 10, 26, MONO, GOLD, la * lu, 'r', 700, 4 * lu)
    c.restore()

# ---------------------------------------------------------------- a5: the law we follow
PLX, PLY, PLW, PLH = 150, 206, 1620, 96
PSEG = (('Income-tax Act, 1961', VIO, ACT5), ('Finance Act 2025', VIO, FIN), ('A.Y. 2026-27', ACC, ASSESS),
        ('Jan 2027 exam', GOLD, JAN))
BKX, BKY = 400, 560
YBX, YBY, YBW = 880, 500, 440

def _plaque(c, t, a):
    if a <= 0: return
    x, y, w, h = PLX, PLY, PLW, PLH
    c.drawRRect(rrect(x, y + 10, w, h, 18), paint(BLACK, .45 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, 18), paint(shader=lgrad((x, y), (x, y + h), ['#1c1606', '#0d0b05']), a=a))
    c.drawRRect(rrect(x, y, w, h, 18), paint(GOLD, .8 * a, stroke=2.4))
    c.drawRRect(rrect(x + 7, y + 7, w - 14, h - 14, 13), paint(GOLD, .35 * a, stroke=1.2))
    # a slow light sweep
    sx = x + ((t - A5) * 260) % (w + 600) - 300
    c.save(); c.clipRRect(rrect(x, y, w, h, 18), True)
    c.drawRect(skia.Rect(sx - 120, y, sx + 120, y + h), paint(shader=lgrad((sx - 120, 0), (sx + 120, 0), [(WHITE, 0), (WHITE, .05 * a), (WHITE, 0)])))
    c.restore()
    sw = w / 4
    for k, (s, col, ts) in enumerate(PSEG):
        on = seg(t, ts - .25, ts + .35)
        cx = x + sw * (k + .5)
        if k: c.drawCircle(x + sw * k, y + h / 2, 4, paint(GOLD, .6 * a))
        sz = 31
        hot = win(t, ts - .25, ts + 2.2, .3, .9)
        if hot > 0: text(c, s, cx, y + h / 2 + sz * .36, sz, 800, col, .5 * a * hot, 'c', shadow=14)
        text(c, s, cx, y + h / 2 + sz * .36 - 4 * (1 - on), sz, 800, mixc('#475569', WHITE if k < 3 else GOLD, on), a * (.45 + .55 * on), 'c')

def _slip(c, x, y, sc, ang, a):
    """The amending Act: a cream slip with a serif title."""
    if a <= 0: return
    w, h = 230, 150
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(sc, sc)
    c.drawRRect(rrect(-w / 2 + 6, -h / 2 + 12, w, h, 6), paint(BLACK, .45 * a, blur=12))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 6), paint(shader=lgrad((0, -h / 2), (0, h / 2), ['#fbf7ec', CREAM, '#ece3cd']), a=a))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 6), paint('#cbbd9c', a, stroke=1.2))
    ftext(c, 'THE FINANCE ACT,', 0, -h / 2 + 34, 19, SERIF, INK, a, 'c', 700)
    ftext(c, '2025', 0, -h / 2 + 60, 22, SERIF, INK, a, 'c', 700)
    c.drawLine(-w / 2 + 24, -h / 2 + 74, w / 2 - 24, -h / 2 + 74, paint(INK, .5 * a, stroke=1.2))
    for j in range(4):
        c.drawLine(-w / 2 + 24, -h / 2 + 92 + 13 * j, w / 2 - 24 - 30 * (j % 2), -h / 2 + 92 + 13 * j, paint('#8a8068', .7 * a, stroke=1.4))
    c.restore()

def _law(c, t):
    a = seg(t, A5 - .45, A5 + .3)
    if a <= 0: return
    pa = a * seg(t, A5 - .3, A5 + .4)
    _plaque(c, t, pa)
    # book + slip start centre stage and glide left when the year bar arrives
    gx = lerp(400, 0, seg(t, ASSESS - .9, ASSESS + .2))
    # the amending slip (drawn first: it lands tucked against the book's right edge)
    su = seg(t, AMEND - .25, AMEND + .75)
    sx = lerp(1500, BKX + gx + 300, ease(su)); sy = lerp(520, BKY - 92, ease(su)) - 70 * math.sin(math.pi * su)
    if su > 0:
        _slip(c, sx, sy, 1.05, lerp(14, 7, su), a * seg(t, AMEND - .25, AMEND + .05))
    # the Act's book
    bu = seg(t, ACT5 - .4, ACT5 + .45, back)
    if bu > 0:
        by = BKY + 30 * (1 - bu)
        glow = win(t, Y1961 - .2, Y1961 + 1.6, .3, .7)
        if glow > 0: c.drawRRect(rrect(BKX + gx - 160, by - 196, 320, 392, 18), paint(VIO, .45 * glow * a, stroke=10, blur=14))
        book(c, BKX + gx, by, a * seg(t, ACT5 - .4, ACT5), 'Income-tax Act, 1961', '#4c3d8f', 1.3, 0.)
        ya = a * seg(t, Y1961 - .1, Y1961 + .4)
        _pill(c, BKX + gx, by + 230, 'since 1961', VIO, ya, 24, .18, 800)
    if su > 0:
        stamp(c, sx + 18, sy + 22, 'AMENDED', VIO, a, seg(t, FIN + .25, FIN + 1.25, linr), -8, 30, deep=True)
        fa = a * seg(t, FIN + .6, FIN + 1.1)
        _pill(c, sx + 10, sy + 132, 'by the Finance Act, 2025', VIO, fa, 24, .18, 800)
    # the year bar: P.Y. 2025-26, then the assessment year grows in; January 2027 = the exam
    ya = a * seg(t, ASSESS - .45, ASSESS + .1)
    if ya <= 0: return
    EXT = (2027, 3, 31)
    eu = seg(t, ASSESS + .05, ASSESS + 1.3)
    ja = seg(t, JAN - .2, JAN + .35)
    sp = [((2027, 1, 1), (2027, 1, 31), None, GOLD, ja)] if ja > 0 else []
    yearbar(c, YBX, YBY, YBW, ya, t, extend=EXT, ext_u=eu, ext_col=ACC, ext_label='A.Y. 2026-27', spans=sp, h=56)
    aya = ya * seg(eu, .6, 1)
    if aya > 0:
        x0 = YBX + YBW; x1 = yearbar_x(YBX, YBW, EXT + (1.,), extend=EXT)
        hb = win(t, ASSESS + .6, JAN - .2, .4, .6)
        if hb > 0: c.drawRRect(rrect(x0 + 2, YBY + 8, x1 - x0 - 4, 40, 10), paint(ACC, .5 * hb * a, stroke=6, blur=8))
        text(c, 'income of the P.Y. is assessed in the A.Y.', (YBX + x1) / 2, YBY + 262, 27, 700, DIM, aya, 'c')
        au = seg(t, ASSESS + .5, ASSESS + 1.2)
        if au > 0:
            p0 = (YBX + YBW * .5, YBY - 46); p1 = ((x0 + x1) / 2, YBY - 46)
            pp = skia.Path(); pp.moveTo(*p0); pp.quadTo((p0[0] + p1[0]) / 2, YBY - 120, *p1)
            m = skia.PathMeasure(pp, False); L = m.getLength(); q = skia.Path(); m.getSegment(0, L * au, q, True)
            c.drawPath(q, paint(ACC, .9 * aya, stroke=2.6))
            if au > .95:
                pos, tan = m.getPosTan(L)
                arrow(c, pos.x() - tan.x() * 14, pos.y() - tan.y() * 14, pos.x(), pos.y(), ACC, 2.6, aya, 14)
    if ja > 0:
        jx = (yearbar_x(YBX, YBW, (2027, 1, 1), extend=EXT) + yearbar_x(YBX, YBW, (2027, 1, 31, 1.), extend=EXT)) / 2
        ju = seg(t, JAN - .1, JAN + .45, back)
        py = YBY + 168
        c.drawLine(jx, YBY + 50, jx, lerp(YBY + 50, py - 24, eout(ju)), paint(GOLD, .9 * a * ja, stroke=2.4))
        _pill(c, 1650, py + 16 * (1 - ju), 'January 2027 exam', GOLD, a * ja * seg(ju, .3, 1), 26, .22, 800, WHITE, 'calendar')

def ch_a(c, t):
    if t > CE + .5: return
    da = 1 - seg(t, A2 - .3, A2 + .8)
    _dawn(c, t, da)
    _shopfront(c, t, 1.)
    _measure(c, t, 1.)
    _figures(c, t)
    _questions(c, t)
    _roadmap(c, t)
    _law(c, t)
