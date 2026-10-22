"""Chapter W — Books and audit (sections 44AA and 44AB).
w1 hook: a street of four shopfronts (Sunil Stores, Meera's Bakehouse, Pune Sweets, City Chemist); a book of
   accounts and a Form 3CD audit report float above them, each with a "?"
w2 a "size of the business" chart: two threshold lines, a lower one "keep books · 44AA" and a higher one
   "tax audit · 44AB"; three shop bars rise: below both (neither), past the first (books), past both (books + audit)
w3 specified professions (doctor, lawyer, accountant tiles) -> prescribed books (a ledger book, 44AA) when gross
   receipts crossed ₹1,50,000 in each of the last three years: three year bars all cross the line, each ticked
w4 other businesses of an individual: two charts, "income > ₹2,50,000" OR "turnover > ₹25 lakh"; one bar crossing
   in any one of the three years is enough -> books
w5 name: a turnover gauge with the audit limit at ₹1 crore (red beyond); two cash meters (receipts, payments, both
   ≤ 5%) slide the limit to ₹10 crore; a profession panel: gross receipts > ₹50 lakh
w6 example: Meera; the needle swings to ₹2.4 crore, cash receipts roll to 12% (red, over 5%), the limit snaps back
   to ₹1 crore ("₹10 crore limit not open"), a TAX AUDIT stamp
w7 a P.Y. 2025-26 bar extended to 31 Oct 2026: "audit report 30 Sep 2026" (Form 3CD) a month before "return due
   31 Oct 2026"; two penalty cards: § 271B ½% of turnover up to ₹1,50,000, § 271A ₹25,000 for not keeping books
w8 check: below the card, a trader's ₹8 crore turnover bar under the ₹10 crore limit, cash receipts and payments nil
   (all through the bank); on the answer the ₹10 crore limit lights, "no audit"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('w')
W1_, W2_, W3_, W4_, W5_, W6_, W7_, W8_ = (T('w%d' % k) for k in range(1, 9))

# ---------------------------------------------------------------- word times
A_SHOP, A_INDIA, A_BOOKS, A_AUDIT = W('w1', 'shopkeeper'), W('w1', 'india'), W('w1', 'books'), W('w1', 'audited')
B_NO, B_BOOKS, B_LIMITS, B_44AA, B_AUDIT, B_HIGHER, B_44AB = (
    W('w2', 'no'), W('w2', 'books'), W('w2', 'certain'), W('w2', 'section'), W('w2', 'audit'), W('w2', 'higher'),
    W('w2', 'section', occ=1))
C_SPEC, C_DOC, C_LAW, C_ACC, C_PRES, C_GROSS, C_150, C_EACH = (
    W('w3', 'specified'), W('w3', 'doctors'), W('w3', 'lawyers'), W('w3', 'accountants'), W('w3', 'prescribed'),
    W('w3', 'gross'), W('w3', 'lakh'), W('w3', 'each'))
D_OTHER, D_TWO, D_INCOME, D_250, D_TURN, D_25, D_ANY = (
    W('w4', 'other'), W('w4', 'two'), W('w4', 'income'), W('w4', 'two', occ=1), W('w4', 'turnover'),
    W('w4', 'twenty'), W('w4', 'any'))
E_AUDIT, E_1CR, E_RISES, E_10CR, E_CASHR, E_CASHP, E_5, E_PROF, E_50 = (
    W('w5', 'tax'), W('w5', 'one'), W('w5', 'rises'), W('w5', 'ten'), W('w5', 'cash'), W('w5', 'cash', occ=1),
    W('w5', 'five'), W('w5', 'profession'), W('w5', 'fifty'))
F_TURN, F_24, F_12, F_COUNTER, F_OVER, F_10, F_ISNT, F_NEEDS = (
    W('w6', 'turnover'), W('w6', 'two'), W('w6', 'twelve'), W('w6', 'counter'), W('w6', 'over'), W('w6', 'ten'),
    W('w6', 'isn'), W('w6', 'needs'))
G_REPORT, G_SEPT, G_MONTH, G_MISS, G_HALF, G_150, G_NOT, G_25 = (
    W('w7', 'report'), W('w7', 'september'), W('w7', 'month'), W('w7', 'miss'), W('w7', 'half'), W('w7', 'lakh'),
    W('w7', 'not'), W('w7', 'twenty', occ=1))
H_TRADER, H_8, H_BANK = W('w8', 'trader'), W('w8', 'eight'), W('w8', 'bank')
HA_NO, HA_CASH, HA_TEN = W('w8a', 'no'), W('w8a', 'cash'), W('w8a', 'ten')

for tt, k in ((A_SHOP, 'whoosh'), (A_BOOKS, 'pop'), (A_AUDIT, 'pop'),
              (B_LIMITS, 'tick'), (B_44AA, 'blip'), (B_HIGHER, 'tick'), (B_44AB, 'blip'),
              (C_DOC, 'pop'), (C_LAW, 'pop'), (C_ACC, 'pop'), (C_EACH + .3, 'ok'),
              (D_250, 'tick'), (D_25, 'tick'), (D_ANY + .3, 'ok'),
              (E_1CR, 'blip'), (E_10CR, 'whoosh'), (E_50, 'blip'),
              (F_24, 'tick'), (F_OVER, 'error'), (F_NEEDS + .45, 'thunk'),
              (G_SEPT, 'flip'), (G_HALF, 'warn'), (G_25, 'warn'),
              (HA_TEN, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _box(c, x, y, w, h, col, a, fill=.8, stroke=.85, glow=0., r=18, dash=False):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .35 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .94 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    p = paint(col, stroke * a, stroke=2.2, cap=False)
    if dash: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _q(c, x, y, a, t, size=60, col=GOLD):
    if a <= 0: return
    text(c, '?', x, y + size * .36, size * (1 + .06 * math.sin(t * 5 + x)), 800, col, a, 'c', shadow=8)

def _dline(c, x0, x1, y, col, a, w=3):
    if a <= 0: return
    p = paint(col, .95 * a, stroke=w, cap=False); p.setPathEffect(skia.DashPathEffect.Make([14, 9], 0))
    c.drawLine(x0, y, x1, y, p)

def _bar(c, cx, base, w, top, col, a, u, glow=0.):
    """A rounded bar rising from base to top as u goes 0 -> 1."""
    if a <= 0 or u <= 0: return
    y = lerp(base, top, eout(u))
    c.drawRRect(rrect(cx - w / 2, y, w, base - y, 10), paint(shade(col, -.55), .95 * a))
    c.drawRRect(rrect(cx - w / 2, y, w, 14, 7), paint(col, .9 * a))
    if glow > 0: c.drawRRect(rrect(cx - w / 2 - 4, y - 4, w + 8, base - y + 8, 14), paint(GOLD, .55 * a * glow, stroke=7, blur=8))
    c.drawRRect(rrect(cx - w / 2, y, w, base - y, 10), paint(col, .8 * a, stroke=2))

# ---------------------------------------------------------------- S1 (w1): the street
SHOPS = [(300, 'Sunil Stores'), (740, "Meera's Bakehouse"), (1180, 'Pune Sweets'), (1620, 'City Chemist')]

def _s1(c, t):
    a = 1 - seg(t, B_NO - .2, B_NO + .5)
    if a <= 0: return
    for k, (x, sg) in enumerate(SHOPS):
        sa = a * seg(t, A_SHOP - .4 + .18 * k, A_SHOP + .1 + .18 * k)
        if sa <= 0: continue
        dy = 40 * (1 - seg(t, A_SHOP - .4 + .18 * k, A_SHOP + .3 + .18 * k, eout))
        shop(c, x, 826 + dy, .62, sa, t, sign=sg)
    ba = a * seg(t, A_BOOKS - .3, A_BOOKS + .2)
    if ba > 0:
        pop = seg(t, A_BOOKS - .3, A_BOOKS + .35, back)
        book(c, 800, 372, ba, sc=.62 * (.8 + .2 * pop), open_=.0)
        lab(c, 'books?', 800, 500, ba, 28, WHITE, 800)
        _q(c, 900, 312, ba, t, 56)
    fa = a * seg(t, A_AUDIT - .3, A_AUDIT + .2)
    if fa > 0:
        pop = seg(t, A_AUDIT - .3, A_AUDIT + .35, back)
        form(c, 1130, 372, fa, 'Form 3CD', 'Tax audit report', sc=.46 * (.8 + .2 * pop), ang=4)
        lab(c, 'audit?', 1130, 500, fa, 28, WHITE, 800)
        _q(c, 1230, 312, fa, t, 56)

# ---------------------------------------------------------------- S2 (w2): two thresholds
GX0, GX1, GBASE = 230, 1780, 800
YB_BOOK, YB_AUD = 610, 410
BARS2 = [(720, 700, 'neither'), (1130, 520, 'books'), (1540, 330, 'books + audit')]

def _s2(c, t):
    a = seg(t, B_NO - .1, B_NO + .5) * (1 - seg(t, W3_ - .4, W3_ + .1))
    if a <= 0: return
    # axis
    c.drawLine(GX0, GBASE, GX0, 300, paint(WHITE, .5 * a, stroke=3))
    _arrowhead(c, GX0, 290, a * .5)
    c.drawLine(GX0, GBASE, GX1, GBASE, paint(WHITE, .35 * a, stroke=2))
    c.save(); c.translate(GX0 - 34, 560); c.rotate(-90)
    text(c, 'SIZE OF THE BUSINESS', 0, 0, 20, 800, DIM, a, 'c', track=3); c.restore()
    lab(c, 'not every shop', 470, 280, a * win(t, B_NO, B_LIMITS + .4, .3, .4), 30, RED, 800)
    # lines
    la = a * seg(t, B_LIMITS - .2, B_LIMITS + .5)
    if la > 0:
        _dline(c, GX0 + 10, lerp(GX0 + 10, GX1, seg(t, B_LIMITS - .2, B_LIMITS + .6)), YB_BOOK, BLUE, la)
        text(c, 'KEEP BOOKS', GX0 + 30, YB_BOOK - 16, 22, 800, BLUE, la, track=2)
        sec(c, GX0 + 46 + text_w('KEEP BOOKS', 22, 800, 2), YB_BOOK - 24, '44AA', a * seg(t, B_44AA - .2, B_44AA + .3, back), VIO, 22)
    ha = a * seg(t, B_HIGHER - .2, B_HIGHER + .5)
    if ha > 0:
        _dline(c, GX0 + 10, lerp(GX0 + 10, GX1, seg(t, B_HIGHER - .2, B_HIGHER + .6)), YB_AUD, VIO, ha)
        text(c, 'TAX AUDIT', GX0 + 30, YB_AUD - 16, 22, 800, VIO, ha, track=2)
        sec(c, GX0 + 46 + text_w('TAX AUDIT', 22, 800, 2), YB_AUD - 24, '44AB', a * seg(t, B_44AB - .2, B_44AB + .3, back), VIO, 22)
    # three businesses
    for k, (cx, top, verdict) in enumerate(BARS2):
        u = seg(t, B_BOOKS - .2 + .3 * k, B_BOOKS + 1.0 + .3 * k)
        _bar(c, cx, GBASE, 220, top, (ACC, BLUE, VIO)[k], a, u)
        if u > 0:
            y = lerp(GBASE, top, eout(u))
            icon(c, 'shop', cx, y - 40, .8, shade(ACC, .3), a * u)
        va = a * seg(t, (B_HIGHER if k == 2 else B_44AA if k == 1 else B_LIMITS) + .3, (B_HIGHER if k == 2 else B_44AA if k == 1 else B_LIMITS) + .8)
        if va > 0:
            col = GREEN if k == 0 else BLUE if k == 1 else VIO
            text(c, verdict, cx, GBASE - 30, 28, 800, WHITE, va, 'c', shadow=6)

def _arrowhead(c, x, y, a, s=14):
    if a <= 0: return
    p = skia.Path(); p.moveTo(x, y - s * .2); p.lineTo(x - s * .6, y + s); p.lineTo(x + s * .6, y + s); p.close()
    c.drawPath(p, paint(WHITE, a))

# ---------------------------------------------------------------- S3 (w3): specified professions
YRS = ['2022-23', '2023-24', '2024-25']
PROF = [('hospital', 'doctor', C_DOC), ('scale', 'lawyer', C_LAW), ('calc', 'accountant', C_ACC)]
CH_X0, CH_X1, CH_BASE, CH_LINE = 900, 1780, 760, 560

def _chart(c, x0, x1, base, line, title, lim, col, a, t, t_line, bars, glow=None, ticks=None):
    """A small bar chart: frame, a dashed limit line, three year bars. bars = [(top y, t0)]."""
    if a <= 0: return
    _box(c, x0, 300, x1 - x0, base - 300 + 50, ACC, a, .88, .4)
    text(c, title, x0 + 28, 342, 22, 800, DIM, a, track=3)
    n = len(bars); bw = min(160, (x1 - x0 - 120) / n - 40)
    xs = [x0 + 60 + (k + .5) * (x1 - x0 - 120) / n for k in range(n)]
    for k, (top, t0) in enumerate(bars):
        u = seg(t, t0, t0 + .8)
        g = (glow or {}).get(k, 0.)
        _bar(c, xs[k], base, bw, top, GREEN if top < line else ACC, a, u, g)
        text(c, YRS[k], xs[k], base + 34, 22, 700, DIM, a, 'c')
        if ticks and k in ticks:
            ta = a * ticks[k]
            if ta > 0: tick(c, xs[k], lerp(base, top, eout(u)) - 30, ta, 18)
    la = a * seg(t, t_line - .2, t_line + .4)
    if la > 0:
        _dline(c, x0 + 20, lerp(x0 + 20, x1 - 20, seg(t, t_line - .2, t_line + .5)), line, col, la)
        lx = x0 + 28 + text_w(title, 22, 800, 3) + 30
        _dline(c, lx, lx + 50, 334, col, la)
        text(c, lim, lx + 64, 343, 26, 800, col, la)
    return xs

def _s3(c, t):
    a = seg(t, W3_ - .3, W3_ + .3) * (1 - seg(t, W4_ - .4, W4_ + .1))
    if a <= 0: return
    text(c, 'SPECIFIED PROFESSIONS', 120, 300, 22, 800, PINK, a * seg(t, C_SPEC - .3, C_SPEC + .2), track=3)
    for k, (ic, nm, tt) in enumerate(PROF):
        ta = a * seg(t, tt - .3, tt + .2)
        if ta <= 0: continue
        pop = seg(t, tt - .3, tt + .35, back)
        x = 120 + 230 * k
        c.save(); k_ = .85 + .15 * pop; c.translate(x + 100, 420); c.scale(k_, k_); c.translate(-(x + 100), -420)
        tile(c, x, 330, 200, 180, ic, nm, ta, PINK, glow=win(t, tt - .1, tt + 1.2, .2, .6))
        c.restore()
    pa = a * seg(t, C_PRES - .3, C_PRES + .2)
    if pa > 0:
        book(c, 240, 690, pa, title='Books of account', sc=.6)
        text(c, 'prescribed books', 360, 668, 32, 800, WHITE, pa)
        sec(c, 360, 716, '44AA', pa, VIO, 24)
        text(c, 'kept and maintained', 494, 726, 22, 600, DIM, pa)
    ca = a * seg(t, C_GROSS - .4, C_GROSS)
    tk = {k: seg(t, C_EACH + .35 * k, C_EACH + .35 * k + .3) for k in range(3)}
    _chart(c, CH_X0, CH_X1, CH_BASE, CH_LINE, 'GROSS RECEIPTS', '₹1,50,000', GOLD, ca, t, C_150 - .4,
           [(470, C_GROSS), (430, C_GROSS + .25), (490, C_GROSS + .5)],
           glow={k: win(t, C_EACH + .35 * k, C_EACH + .35 * k + 1.4, .2, .6) for k in range(3)}, ticks=tk)
    sa = a * seg(t, C_EACH + 1.0, C_EACH + 1.4)
    if sa > 0: chip(c, 470, 800, 'over the limit in all three years', GREEN, sa, 26)

# ---------------------------------------------------------------- S4 (w4): other businesses of an individual
def _s4(c, t):
    a = seg(t, W4_ - .3, W4_ + .3) * (1 - seg(t, W5_ - .4, W5_ + .1))
    if a <= 0: return
    ha = a * seg(t, D_OTHER - .3, D_OTHER + .2)
    icon(c, 'shop', 140, 262, .55, ORANGE, ha)
    text(c, 'OTHER BUSINESSES · AN INDIVIDUAL', 176, 272, 22, 800, ORANGE, ha, track=3)
    ca = a * seg(t, D_TWO - .3, D_TWO + .2)
    g = {1: win(t, D_ANY, D_ANY + 2.5, .2, .6)}
    _chart(c, 120, 860, 760, 560, 'INCOME', 'over ₹2,50,000', GOLD, ca, t, D_250 - .3,
           [(640, D_INCOME), (500, D_INCOME + .25), (610, D_INCOME + .5)], glow=g, ticks={1: seg(t, D_ANY, D_ANY + .3)})
    cb = a * seg(t, D_TWO, D_TWO + .5)
    _chart(c, 1060, 1800, 760, 560, 'TURNOVER', 'over ₹25 lakh', GOLD, cb, t, D_25 - .3,
           [(660, D_TURN), (620, D_TURN + .25), (690, D_TURN + .5)])
    oa = a * seg(t, D_TURN - .4, D_TURN)
    text(c, 'OR', 960, 560, 44, 800, GOLD, oa, 'c', shadow=8)
    sa = a * seg(t, D_ANY + .5, D_ANY + .9, back)
    if sa > 0: chip(c, 1440, 262, 'one year over either limit is enough → books', GREEN, sa, 24)

# ---------------------------------------------------------------- S5 (w5, w6): the audit limit
GXc, GYc, GR = 560, 690, 240
def _limit(t):
    """The audit limit on the gauge (crore): ₹1 crore, ₹10 crore when cash ≤ 5%, back to ₹1 crore for Meera."""
    return keys(t, [(E_RISES - .1, 1.), (E_10CR + .5, 10.), (F_10 - .1, 10.), (F_ISNT + .6, 1.)])

def _s5(c, t):
    a = seg(t, W5_ - .3, W5_ + .3) * (1 - seg(t, W7_ - .45, W7_ + .05))
    if a <= 0: return
    ga = a * seg(t, E_AUDIT - .2, E_AUDIT + .4)
    lim = _limit(t)
    nv = keys(t, [(F_24 - .3, .1), (F_24 + .8, 2.4)]) if t > W6_ - 1 else .1 + .05 * math.sin(t * 1.3)
    gauge(c, GXc, GYc, GR, ga, nv, 0, 12, ticks=[(0, '0'), (1, '₹1 cr'), (5, '₹5 cr'), (10, '₹10 cr')],
          label='', limit=lim if t > E_1CR - .3 else None, col=ACC)
    if ga > 0:
        text(c, 'TURNOVER', GXc, GYc + 42, 22, 800, DIM, ga, 'c', track=3)
        la = a * seg(t, E_1CR - .2, E_1CR + .3)
        s = 'audit above ₹%s crore' % ('1' if lim < 5.5 else '10')
        chip(c, GXc, GYc + 100, s, RED if lim < 5.5 else GREEN, la, 28)
        if t > W6_ - .5:
            va = a * seg(t, F_24 - .1, F_24 + .4)
            chip(c, 300, 452, 'Meera · ₹2.4 crore', ACC, va, 26)
    # cash meters
    ma = a * seg(t, E_CASHR - .4, E_CASHR)
    if ma > 0:
        v12 = seg(t, F_12 - .2, F_12 + .6)
        mv = lerp(.035, .12, v12)
        meter(c, 1000, 480, 640, ma, mv, .05, 'Cash receipts', '{:.0%}' if v12 > 0 else '≤ 5%', hi=.15, lim_fmt='5%')
        pa = a * seg(t, E_CASHP - .3, E_CASHP + .1) * (1 - .55 * seg(t, F_12 - .2, F_12 + .4))
        meter(c, 1000, 610, 640, pa, .035, .05, 'Cash payments', '≤ 5%', hi=.15, lim_fmt='5%')
        ok = seg(t, E_5 - .1, E_5 + .3) * (1 - seg(t, F_12 - .3, F_12))
        if ok > 0:
            tick(c, 1680, 490, a * ok, 18); tick(c, 1680, 620, a * ok, 18)
        ov = a * seg(t, F_OVER - .2, F_OVER + .3)
        if ov > 0:
            c.drawRRect(rrect(990, 452, 660, 70, 14), paint(RED, .6 * ov * (.6 + .4 * math.sin(t * 7)), stroke=3))
            text(c, 'over 5%', 1660, 520, 26, 800, RED, ov)
    # the ₹10 crore door closes for Meera
    xa = a * seg(t, F_ISNT - .2, F_ISNT + .3)
    if xa > 0:
        chip(c, 1320, 732, '₹10 crore limit: not open to her', RED, xa, 26)
    # profession panel (w5) / Meera (w6)
    pa = a * seg(t, E_PROF - .3, E_PROF + .2) * (1 - seg(t, W6_ - .5, W6_))
    if pa > 0:
        slab(c, 1000, 700, 640, 110, pa, VIO, 'Profession', 'audit if gross receipts exceed ₹50 lakh' if t > E_50 - .3 else 'gross receipts', icon_name='person')
    ma2 = a * seg(t, F_TURN - .5, F_TURN)
    person(c, 1740, 826, .8, ma2, 'meera', t, look=-.6, mood=-.3 * seg(t, F_NEEDS - .3, F_NEEDS + .3))
    su = seg(t, F_NEEDS + .15, F_NEEDS + 1.1, linr)
    if su > 0: stamp(c, GXc, GYc - 150, 'TAX AUDIT', ACC, a, su, -8, 40)

# ---------------------------------------------------------------- S6 (w7): due dates and penalties
YX, YY, YW = 110, 380, 960
EXT = (2026, 10, 31)
def _yx(d): return yearbar_x(YX, YW, d, extend=EXT)
X_S30, X_O31 = _yx((2026, 9, 30, 1.)), _yx((2026, 10, 31, 1.))

def _s6(c, t):
    a = seg(t, W7_ - .3, W7_ + .3) * (1 - seg(t, W8_ - .4, W8_ + .1))
    if a <= 0: return
    marks = []
    m1 = seg(t, G_SEPT - .3, G_SEPT + .2)
    if m1 > 0: marks.append(((2026, 9, 30, 1.), 'audit report · 30 Sep 2026', VIO, m1, 0))
    m2 = seg(t, G_MONTH - .2, G_MONTH + .3)
    if m2 > 0: marks.append((EXT, 'return due', GOLD, m2, 1))
    yearbar(c, YX, YY, YW, a, t, extend=EXT, ext_u=seg(t, W7_, W7_ + 1.2), ext_label='after the year', marks=marks)
    fa = a * seg(t, G_REPORT - .3, G_REPORT + .3)
    if fa > 0:
        u = seg(t, G_SEPT - .3, G_SEPT + .5)
        pop = seg(t, G_REPORT - .3, G_REPORT + .35, back)
        form(c, 400, 660, fa, 'Form 3CD', 'Tax audit report', sc=.55 * (.85 + .15 * pop), ang=-4)
        text(c, 'audit report', 400, 790, 24, 800, VIO, fa, 'c')
        _carrow(c, [(490, 560), (900, 575), (1400, 548), (X_S30 - 4, YY + 64)], u, VIO, fa, 3, 14)
    ba = a * seg(t, G_MONTH - .1, G_MONTH + .4)
    if ba > 0:
        y = YY + 124
        c.drawLine(X_S30, y, X_O31, y, paint(GOLD, ba, stroke=2.5))
        for xx in (X_S30, X_O31): c.drawLine(xx, y - 10, xx, y + 10, paint(GOLD, ba, stroke=2.5))
        text(c, 'a month before', (X_S30 + X_O31) / 2, y + 36, 24, 800, GOLD, ba, 'c')
    # penalties
    for k, (tt, t2, title, l1, l2, sc_) in enumerate((
            (G_MISS, G_150, 'Audit report missed', '½% of turnover', 'up to ₹1,50,000', '271B'),
            (G_NOT, G_25, 'Books not kept', '₹25,000', '', '271A'))):
        pa = a * seg(t, tt - .3, tt + .2)
        if pa <= 0: continue
        x = 760 + 560 * k; y = 610; w, h = 520, 210
        pop = seg(t, tt - .3, tt + .35, back); dy = 20 * (1 - pop)
        _box(c, x, y + dy, w, h, RED, pa, .84, .8, glow=win(t, t2, t2 + 1.4, .2, .6))
        text(c, 'PENALTY', x + 28, y + dy + 40, 20, 800, RED, pa, track=3)
        sec(c, x + w - 28, y + dy + 34, sc_, pa, VIO, 22, 'r')
        text(c, title, x + 28, y + dy + 86, 28, 800, WHITE, pa)
        va = a * seg(t, t2 - .3, t2 + .2) if k == 1 else a * seg(t, G_HALF - .2, G_HALF + .3)
        text(c, l1, x + 28, y + dy + 140, 36, 800, GOLD, va)
        if l2: text(c, l2, x + 28, y + dy + 184, 28, 800, GOLD, a * seg(t, G_150 - .5, G_150))

_CURVES = {}
def _carrow(c, pts, u, col, a, w=4., head=18.):
    if a <= 0 or u <= 0: return
    k = tuple(map(tuple, pts))
    if k not in _CURVES:
        P = catmull(np.array(pts, float), step=5); _CURVES[k] = (P, arclen(P))
    P, L = _CURVES[k]; s = L[-1] * clamp(u); n = int(np.searchsorted(L, s))
    Q = np.vstack([P[:max(n, 1)], along(P, s)[0][None]])
    c.drawPath(poly(Q, False), paint(col, a, stroke=w))
    (x1, y1), d = along(P, s)
    if u > .15:
        ux, uy = d; bx, by = x1 - ux * head, y1 - uy * head
        hp = skia.Path(); hp.moveTo(x1 + ux * 4, y1 + uy * 4); hp.lineTo(bx - uy * head * .55, by + ux * head * .55)
        hp.lineTo(bx + uy * head * .55, by - ux * head * .55); hp.close(); c.drawPath(hp, paint(col, a))

# ---------------------------------------------------------------- S7 (w8 check): below the card
def _s7(c, t):
    a = seg(t, W8_ - .2, W8_ + .4)
    if a <= 0: return
    x0, x1, y = 560, 1560, 850
    def X(v): return x0 + v / 12 * (x1 - x0)
    ta = a * seg(t, H_TRADER - .3, H_TRADER + .2)
    text(c, 'Trader · turnover', x0, y - 46, 26, 800, WHITE, ta)
    c.drawRRect(rrect(x0, y - 18, x1 - x0, 36, 18), paint('#0b1226', .95 * ta))
    u = seg(t, H_8 - .2, H_8 + .8)
    c.drawRRect(rrect(x0, y - 18, (X(8) - x0) * eout(u), 36, 18), paint(ACC, .55 * ta))
    text(c, '₹8 crore', x0 + 236, y - 46, 26, 800, ACC, ta * seg(t, H_8 - .2, H_8 + .3))
    for v, s in ((1, '₹1 cr'), (10, '₹10 cr')):
        lit = seg(t, HA_TEN - .2, HA_TEN + .3) if v == 10 else 0.
        col = mixc(DIM, GOLD, lit) if v == 10 else DIM
        c.drawLine(X(v), y - 28, X(v), y + 28, paint(col, ta * (.6 + .4 * lit), stroke=3 + 2 * lit))
        text(c, s, X(v), y + 56, 22, 800, col, ta, 'c')
    ba = a * seg(t, H_BANK - .3, H_BANK + .2)
    if ba > 0:
        chip(c, x1 + 140, y - 40, 'cash receipts: nil', GREEN, ba, 22)
        chip(c, x1 + 140, y + 10, 'cash payments: nil', GREEN, ba, 22)
    na = a * seg(t, HA_TEN + .2, HA_TEN + .6, back)
    if na > 0:
        tick(c, X(10) + 44, y - 50, na, 18)
        text(c, 'no audit', X(10) + 72, y - 40, 26, 800, GREEN, na)

def ch_w(c, t):
    if t < CS - .5 or t > CE + .5: return
    if t < B_NO + .6: _s1(c, t)
    if B_NO - .2 < t < W3_ + .2: _s2(c, t)
    if W3_ - .4 < t < W4_ + .2: _s3(c, t)
    if W4_ - .4 < t < W5_ + .2: _s4(c, t)
    if W5_ - .4 < t < W7_ + .1: _s5(c, t)
    if W7_ - .4 < t < W8_ + .2: _s6(c, t)
    if t > W8_ - .3: _s7(c, t)
