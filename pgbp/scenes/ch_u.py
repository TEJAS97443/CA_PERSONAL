"""Chapter U — Pay to claim (section 43B, incl. 43B(h)) · hero.
u1 hook: a desk calendar flips 30 MAR -> 31 MAR 2026 ("last day of P.Y. 2025-26"); Meera; a "Staff bonus ₹80,000"
   bill is stamped UNPAID and slides into her P&L as "Staff bonus (payable)"; an arrow runs from that line to a
   "Deduction · P.Y. 2025-26 ?" slot, beside an empty dashed "Payment · not made yet" slot
u2 predict: the two slots glow in turn ("now?" / "only after paying?")
u3 the trick: a year strip 2025-26 … 2028-29; the bonus is "claimed" year after year while unpaid IOU slips pile up
   ("claim now · pay never"); § 43B slams in, every claim locks; "deductible only when actually paid": a PAID
   cheque goes out and the padlock opens
u4 name: six 43B tiles light as spoken (taxes, duties, cess, fees · employer's PF and staff funds · bonus and
   commission · interest to banks / PFIs · leave encashment · Indian Railways), each with a "pay first" padlock
u5 a P.Y. 2025-26 year bar; on "grace period" it grows a green extension to the return due date, § 139(1); a green
   arrow carries it back into a "Deduction · P.Y. 2025-26" tray ("still allowed this year")
u6 example: "31 Oct 2026" flag + a TAX AUDIT stamp; a bonus payment drops on 15 Oct (inside, green) and its
   ₹80,000 lands in the P.Y. 2025-26 tray; a second drops on 15 Nov (outside the zone, amber) and goes to the
   P.Y. 2026-27 tray with a NEXT YEAR stamp
u7 trap: unpaid bank interest coins get boxed into a "new loan" from the bank: NOT PAYMENT, the deduction stays
   locked; the loan is repaid in slices and each repaid slice drops an "allowed" chip into the tray
u8 name 43B(h): a micro / small supplier's factory, money owed by the bakery; a second, much shorter clock:
   written agreement ≤ 45 days, none -> 15 days (MSMED Act, sec 15); paid late -> deductible only in the year paid
u9 example: a March–April 2026 strip: boxes ₹10,000 bought 1 Mar, payable by 5 Apr; paid 2 Apr -> green, allowed
   in P.Y. 2025-26; paid 20 Apr -> amber, next year
u10 side by side on one Mar–Oct axis: ordinary 43B (green grace to 31 Oct) vs MSME dues (a red wall at the agreed
   date, "no grace"); micro and small inside the 43B(h) bracket, "medium" outside it
u11 check: below the card, a "GST for March" bill paid on 20 Apr lands inside the green grace zone -> tick on "yes"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('u')
U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11 = (T('u%d' % k) for k in range(1, 12))
UA = TA('u11')

# ---------------------------------------------------------------- word times
W1_31, W1_MEERA, W1_80, W1_STAFF, W1_BOOKS, W1_DEDUCT, W1_BEFORE = (
    W('u1', 'thirty'), W('u1', 'meera'), W('u1', 'eighty'), W('u1', 'staff'), W('u1', 'books'), W('u1', 'deduct'),
    W('u1', 'before'))
W2_NOW, W2_AFTER = W('u2', 'now'), W('u2', 'after')
W3_CLAIM, W3_WITHOUT, W3_DELAY, W3_YEARS, W3_SEC, W3_CERTAIN, W3_ONLY, W3_PAID = (
    W('u3', 'claim'), W('u3', 'without'), W('u3', 'delay'), W('u3', 'years'), W('u3', 'section'), W('u3', 'certain'),
    W('u3', 'only'), W('u3', 'actually'))
W4 = [W('u4', 'taxes'), W('u4', 'employer'), W('u4', 'bonus'), W('u4', 'interest'), W('u4', 'leave'), W('u4', 'indian')]
W4_PF, W4_FUNDS, W4_COMM, W4_PUBLIC, W4_RAIL = (W('u4', 'PF'), W('u4', 'funds'), W('u4', 'commission'),
                                               W('u4', 'public'), W('u4', 'railways'))
W5_GRACE, W5_DUE, W5_SEC, W5_STILL = W('u5', 'grace'), W('u5', 'due'), W('u5', 'section'), W('u5', 'still')
W6_OCT, W6_AUDIT, W6_F1, W6_ALLOW, W6_F2, W6_NEXT = (
    W('u6', 'october'), W('u6', 'audit'), W('u6', 'fifteen'), W('u6', 'allowed'), W('u6', 'fifteen', occ=1),
    W('u6', 'next'))
W7_UNPAID, W7_LOAN, W7_NOT, W7_ALLOW, W7_REPAYS = (
    W('u7', 'unpaid'), W('u7', 'loan'), W('u7', 'not'), W('u7', 'allowed'), W('u7', 'repays'))
W8_SEC, W8_MONEY, W8_MICRO, W8_MUST, W8_MSME, W8_OTHER, W8_YEAR = (
    W('u8', 'forty'), W('u8', 'money'), W('u8', 'micro'), W('u8', 'must'), W('u8', 'msme'), W('u8', 'otherwise'),
    W('u8', 'year'))
W9_BOXES, W9_TEN, W9_MARCH, W9_PAYABLE, W9_APR5, W9_PAID1, W9_ALLOW, W9_PAID2, W9_NEXT = (
    W('u9', 'boxes'), W('u9', 'ten'), W('u9', 'march'), W('u9', 'payable'), W('u9', 'five'), W('u9', 'paid'),
    W('u9', 'allowed'), W('u9', 'paid', occ=1), W('u9', 'next'))
W10_ORD, W10_GRACE, W10_MSME, W10_NO, W10_MED = (
    W('u10', 'ordinary'), W('u10', 'grace'), W('u10', 'msme'), W('u10', 'no'), W('u10', 'medium'))
W11_GST, W11_TWENTY = W('u11', 'gst'), W('u11', 'twenty')
WA_YES, WA_BEFORE = W('u11a', 'yes'), W('u11a', 'before')

for tt, k in ((W1_31 - .05, 'flip'), (W1_80, 'pop'), (W1_STAFF + .22, 'thunk'), (W1_BOOKS + .5, 'tap'),
              (W1_DEDUCT, 'blip'),
              (W3_CLAIM, 'ok'), (W3_DELAY + .3, 'tick'), (W3_SEC + .25, 'thunk'), (W3_PAID + .2, 'key'),
              (W4[0], 'pop'), (W4[2], 'pop'), (W4[5], 'pop'),
              (W5_GRACE, 'whoosh'), (W5_STILL, 'ok'),
              (W6_AUDIT + .2, 'thunk'), (W6_ALLOW, 'chime'), (W6_NEXT + .3, 'thunk'),
              (W7_LOAN, 'snip'), (W7_NOT + .2, 'error'), (W7_REPAYS + .6, 'ok'),
              (W8_MUST, 'tick'), (W9_ALLOW, 'chime'), (W9_NEXT + .3, 'warn'),
              (W10_NO, 'error'), (WA_YES, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.8, stroke=.85, glow=0., r=18, dash=False):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .35 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .94 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    p = paint(col, stroke * a, stroke=2.2)
    if dash: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _dashbox(c, x, y, w, h, col, a, r=16):
    if a <= 0: return
    c.drawRRect(rrect(x, y, w, h, r), paint(col, .06 * a))
    p = paint(col, .75 * a, stroke=2.2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _tray(c, x, y, w, h, title, col, a, glow=0.):
    if a <= 0: return
    _box(c, x, y, w, h, col, a, .84, .8, glow)
    text(c, title, x + 26, y + 38, 24, 800, col, a, track=1)

_CURVES = {}
def _curve(pts):
    k = tuple(map(tuple, pts))
    if k not in _CURVES:
        P = catmull(np.array(pts, float), step=5); _CURVES[k] = (P, arclen(P))
    return _CURVES[k]

def _carrow(c, pts, u, col, a, w=4., head=18., dashed=False):
    """A smooth arrow through pts, drawn to fraction u, head at the tip."""
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

def _q(c, x, y, a, t, size=64, col=GOLD):
    """A softly pulsing question mark."""
    if a <= 0: return
    k = 1 + .06 * math.sin(t * 5)
    text(c, '?', x, y + size * .36, size * k, 800, col, a, 'c', shadow=8)

def _slip(c, x, y, a, ang=0., sc=.62, paid=0.):
    """An IOU slip for the unpaid bonus."""
    bill(c, x, y, a, title='IOU · staff bonus', amt=80000, sc=sc, ang=ang, col=RED,
         stamp=('PAID', GREEN, paid) if paid > 0 else None, no='unpaid')

def _amt_chip(c, x, y, s, col, a, size=26):
    if a <= 0: return 0
    return chip(c, x, y, s, col, a, size)

# ---------------------------------------------------------------- S1 (u1, u2): 31 March, the bonus in the books
LED_X, LED_Y, LED_W = 1010, 290, 780
LROWS = [('Flour and ingredients', None, 'dim'), ('Wages and salaries', None, 'dim'), ('Staff bonus (payable)', 80000, 'bold')]
LYS, LRECT = ledger(None, LED_X, LED_Y, LED_W, LROWS, 0, sub='for the year ended 31 March 2026')
PAY_BOX = (760, 640, 380, 150)                 # payment slot (dashed, empty)
DED_BOX = (1250, 640, 540, 150)                # deduction slot

def _s1(c, t):
    a = 1 - seg(t, U3 - .4, U3 + .2)
    if a <= 0: return
    # calendar 30 MAR -> 31 MAR 2026
    ca = a * seg(t, CS + .2, CS + .75)
    calendar(c, 250, 418, ca, day=30, mon='MAR', year=2026, sc=1.08, col=RED, flip=seg(t, W1_31 - .1, W1_31 + .6))
    lab(c, 'last day of P.Y. 2025-26', 250, 566, ca * seg(t, W1_31 + .4, W1_31 + .9), 24, DIM, 700)
    # Meera
    ma = a * seg(t, W1_MEERA - .35, W1_MEERA + .2)
    person(c, 250, 826, .92, ma, 'meera', t, look=.35, mood=-.3 * seg(t, W1_DEDUCT - .4, W1_DEDUCT + .3))
    for k, (sx, col) in enumerate(((475, None), (625, '#b45309'))):
        sa = a * seg(t, W1_STAFF - .3 + .15 * k, W1_STAFF + .1 + .15 * k)
        person(c, sx, 826, .68, sa, 'staff', t, look=-.5, col=col)
    lab(c, 'staff, waiting for the bonus', 550, 594, a * seg(t, W1_STAFF + .2, W1_STAFF + .7), 22, DIM, 600)
    # the P&L
    la = a * seg(t, W1_BOOKS - .8, W1_BOOKS - .2)
    land_ = seg(t, W1_BOOKS + .35, W1_BOOKS + .6)
    hl = seg(t, W1_BOOKS + .5, W1_BOOKS + .9) * (1 - .55 * seg(t, U2, U2 + .6))
    ledger(c, LED_X, LED_Y, LED_W, LROWS, la, u=lerp(.47, 1, land_), hl={2: hl}, sub='for the year ended 31 March 2026')
    # the bonus bill: pops, stamped UNPAID, slides into the P&L line
    ba = a * seg(t, W1_80 - .3, W1_80 + .1)
    if ba > 0:
        fl = seg(t, W1_BOOKS - .2, W1_BOOKS + .55)
        pop = seg(t, W1_80 - .3, W1_80 + .3, back)
        bx = lerp(690, LED_X + LED_W - 190, fl); by = lerp(400, LYS[2], fl) - 90 * math.sin(math.pi * fl)
        sc = lerp(1.18 * (.75 + .25 * pop), .42, fl)
        bill(c, bx, by, ba * (1 - seg(fl, .7, 1)), title='Staff bonus', amt=80000, date='31 Mar 2026', sc=sc,
             ang=lerp(-5, 0, fl), col=ORANGE, stamp=('UNPAID', ORANGE, seg(t, W1_STAFF, W1_STAFF + 1., linr)))
    # the question: deduct this year, before paying?
    da = a * seg(t, W1_DEDUCT - .35, W1_DEDUCT + .2)
    if da > 0:
        x, y, w, h = DED_BOX
        g2 = win(t, W2_NOW - .2, W2_AFTER - .15, .3, .3)
        _box(c, x, y, w, h, GOLD, da, .82, .85, glow=g2)
        text(c, 'DEDUCTION', x + 28, y + 40, 20, 800, GOLD, da, track=3)
        text(c, 'P.Y. 2025-26', x + 28, y + 92, 40, 800, WHITE, da)
        text(c, 'this year · ₹80,000', x + 28, y + 128, 24, 700, DIM, da)
        _q(c, x + w - 66, y + 82, da, t)
        _carrow(c, [(LED_X + LED_W - 120, LYS[2] + 30), (LED_X + LED_W - 160, 600), (x + w * .62, y - 6)],
                seg(t, W1_DEDUCT - .3, W1_DEDUCT + .5), GOLD, da, 3.5, 16)
    pa = a * seg(t, W1_BEFORE - .35, W1_BEFORE + .2)
    if pa > 0:
        x, y, w, h = PAY_BOX
        g1 = win(t, W2_AFTER - .2, U3 - .2, .3, .4)
        _dashbox(c, x, y, w, h, mixc(DIM, GREEN, g1), pa)
        if g1 > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, 20), paint(GREEN, .45 * pa * g1, stroke=8, blur=10))
        text(c, 'PAYMENT', x + 28, y + 40, 20, 800, DIM, pa, track=3)
        text(c, 'not made yet', x + 28, y + 92, 34, 800, WHITE, pa)
        text(c, 'bonus still owed to staff', x + 28, y + 128, 22, 600, DIM, pa)
        icon(c, 'cheque', x + w - 58, y + 72, .8, DIM, pa * .6)
        text(c, '?', (x + w + DED_BOX[0]) / 2, y + h / 2 + 18, 46, 800, DIM, pa * .8, 'c')
    # u2: the two options, in turn
    for tt, s, x, col in ((W2_NOW, 'deduct now?', DED_BOX[0] + DED_BOX[2] / 2, GOLD),
                          (W2_AFTER, 'only after paying?', PAY_BOX[0] + PAY_BOX[2] / 2, GREEN)):
        oa = a * seg(t, tt - .2, tt + .3, back)
        if oa > 0: chip(c, x, 600, s, col, oa, 26)

# ---------------------------------------------------------------- S2 (u3): claim now, pay never -> § 43B
YS_X, YS_Y, YS_W, YS_H = 150, 290, 1620, 78
YS_LAB = ['2025-26', '2026-27', '2027-28', '2028-29']
YS_C = yearstrip(None, YS_X, YS_Y, YS_W, 4, 0, labels=YS_LAB, h=YS_H)
CLAIM_T = [W3_CLAIM, W3_DELAY - .1, W3_DELAY + .45, W3_YEARS + .15]     # the bonus claimed again each year
RULE = (420, 470, 1080, 300)

def _s2(c, t):
    a = seg(t, U3 - .2, U3 + .4) * (1 - seg(t, U4 - .45, U4 + .05))
    if a <= 0: return
    cur = keys(t, [(U3, 0.), (W3_DELAY - .2, 0.), (W3_YEARS + .3, 3.)])
    hl = {k: a * clamp(1 - abs(cur - k)) * (1 - seg(t, W3_SEC - .2, W3_SEC + .3)) for k in range(4)}
    yearstrip(c, YS_X, YS_Y, YS_W, 4, a, labels=YS_LAB, hl=hl, h=YS_H)
    lk = seg(t, W3_SEC + .1, W3_SEC + .6)                                    # 43B locks every claim
    dim = seg(t, W3_SEC - .3, W3_SEC + .3)
    for k, (cx, cy) in enumerate(YS_C):
        t0 = CLAIM_T[k]
        ua = a * seg(t, t0 - .15, t0 + .3, back)
        if ua <= 0: continue
        chip(c, cx, cy + 92, '₹80,000 claimed', mixc(GREEN, DIM, lk), ua * (1 - .35 * lk), 24)
        if lk > 0: padlock(c, cx + 150, cy + 92, 1.05, GOLD, ua * lk, 0)
        # the unpaid IOUs at that year end: this year's bonus plus every earlier one
        for j in range(k + 1):
            tj = (W3_WITHOUT if k == 0 else t0 + .12) + .09 * j
            sa = a * seg(t, tj - .1, tj + .22) * (1 - .8 * dim)
            if sa <= 0: continue
            dy = 60 * (1 - seg(t, tj - .1, tj + .3, eout))
            _slip(c, cx + (j % 2) * 18 - 9, 716 - 40 * j - dy, sa, ang=(-4, 3, -2, 5)[j], sc=.78)
        na = a * seg(t, t0 + .2, t0 + .5) * (1 - .8 * dim)
        text(c, '%d unpaid' % (k + 1), cx, 812, 26, 800, RED, na, 'c')
    pa = a * seg(t, W3_DELAY + .2, W3_DELAY + .6) * (1 - dim)
    if pa > 0: chip(c, 960, 238, 'claim now · pay never', RED, pa, 28)
    if dim > 0:
        x, y, w, h = RULE
        _box(c, x, y, w, h, VIO, a * dim, .82, .8, glow=win(t, W3_SEC, W3_SEC + 1.6, .2, .8))
        sa = a * seg(t, W3_SEC - .1, W3_SEC + .35, back)
        sec(c, x + 50, y + 74, '43B', sa, VIO, 46)
        ra = a * seg(t, W3_CERTAIN - .2, W3_CERTAIN + .3)
        text(c, 'certain sums are deductible', x + 50, y + 180, 38, 800, WHITE, ra, shadow=6)
        text(c, 'only when actually paid', x + 50, y + 244, 44, 800, GOLD, a * seg(t, W3_ONLY - .2, W3_ONLY + .3), shadow=6)
        pu = seg(t, W3_PAID - .15, W3_PAID + .5)
        op = seg(t, W3_PAID + .2, W3_PAID + .7)
        padlock(c, x + w - 210, y + 112, 2.4, mixc(GOLD, GREEN, op), a * dim, op)
        if pu > 0:
            cheque(c, lerp(x + w - 420, x + w - 210, ease(pu)), y + 228, a * pu, amt=80000, payee='Staff bonus',
                   sc=.36, ang=-3, date='31032026')
        if op > .5: tick(c, x + w - 110, y + 82, a * seg(op, .5, 1), 22)

# ---------------------------------------------------------------- S3 (u4): the list
TILES = [('tax', 'Taxes, duties, cess and fees', 'under any law'),
         ('piggy', "Employer's contribution", 'to PF and other staff funds'),
         ('gift', 'Bonus and commission', 'to employees'),
         ('bank', 'Interest on loans', 'to banks and public financial institutions'),
         ('calendar', 'Leave encashment', 'to employees'),
         ('train', 'Indian Railways', 'for use of railway assets')]
TCOL = [GOLD, BLUE, PINK, ACC, GREEN, ORANGE]
TW_, TH_ = 396, 214
def _tpos(k): return 110 + (k % 3) * (TW_ + 22), 292 + (k // 3) * (TH_ + 26)

def _ltile(c, x, y, w, h, ic, title, sub, col, a, glow, op, t):
    if a <= 0: return
    _box(c, x, y, w, h, col, a, .82, .55 + .35 * glow, glow)
    c.drawCircle(x + 70, y + 80, 46, paint(col, (.12 + .1 * glow) * a))
    c.drawCircle(x + 70, y + 80, 46, paint(col, .55 * a, stroke=2))
    icon(c, ic, x + 70, y + 80, .9, shade(col, .3), a)
    tl = wrap(title, 30, w - 176, 800)
    for k, ln in enumerate(tl[:2]): text(c, ln, x + 132, y + 64 + 36 * k, 30, 800, WHITE, a)
    sl = wrap(sub, 22, w - 156, 600)
    yy = y + 64 + 36 * len(tl[:2]) + 4
    for k, ln in enumerate(sl[:2]): text(c, ln, x + 132, yy + 27 * k, 22, 600, DIM, a)
    padlock(c, x + w - 34, y + 38, .95, GOLD, a * .9, op)

def _s3(c, t):
    a = seg(t, U4 - .3, U4 + .2) * (1 - seg(t, U5 - .2, U5 + .45))
    if a <= 0: return
    hd = a * seg(t, U4 - .2, U4 + .4)
    text(c, 'SECTION 43B · PAY TO CLAIM', 110, 262, 22, 800, VIO, hd, track=3)
    for k, (ic, ti, su) in enumerate(TILES):
        tt = W4[k]
        ta = a * seg(t, tt - .3, tt + .15)
        if ta <= 0: continue
        x, y = _tpos(k)
        pop = seg(t, tt - .3, tt + .35, back)
        g = win(t, tt - .1, tt + 1.8, .2, .9)
        k_ = .92 + .08 * pop
        c.save(); c.translate(x + TW_ / 2, y + TH_ / 2); c.scale(k_, k_); c.translate(-(x + TW_ / 2), -(y + TH_ / 2))
        _ltile(c, x, y, TW_, TH_, ic, ti, su, TCOL[k], ta, g, .18 * max(0, math.sin((t - tt) * 2.2)) ** 8, t)
        c.restore()
    # a sweep of light once the list is complete
    sw = seg(t, W4_RAIL + .5, W4_RAIL + 1.6, linr)
    if 0 < sw < 1:
        for k in range(6):
            x, y = _tpos(k); g = clamp(1 - abs(sw * 7 - k - .5))
            if g > 0: c.drawRRect(rrect(x - 4, y - 4, TW_ + 8, TH_ + 8, 22), paint(GOLD, .4 * a * g, stroke=6, blur=8))
    fa = a * seg(t, W4_RAIL + .4, W4_RAIL + .9)
    if fa > 0:
        text(c, 'deductible only in the year actually paid', 760, 800, 30, 800, GOLD, fa, 'c', shadow=6)

# ---------------------------------------------------------------- S4 (u5, u6): the grace period
YB_X, YB_Y, YB_W = 110, 420, 960
EXT = (2026, 10, 31)
def _ybx(d): return yearbar_x(YB_X, YB_W, d, extend=EXT)
XM31 = YB_X + YB_W
XO31 = _ybx((2026, 10, 31, 1.)); XO15 = _ybx((2026, 10, 15, .5)); XN15 = _ybx((2026, 11, 15, .5))
TRA = (150, 652, 640, 150)                                   # P.Y. 2025-26 tray
TRB = (1220, 652, 590, 150)                                  # P.Y. 2026-27 tray

def _drop(c, t, t0, x, col, a):
    """A bonus payment (a small cheque) dropping onto the bar at x; returns 0..1 landed."""
    u = seg(t, t0 - .45, t0 + .1, ein)
    if u <= 0 or a <= 0: return 0.
    y = lerp(250, YB_Y + 24, u)
    cheque(c, x, y - 34, a * (1 - seg(t, t0 + .1, t0 + .4)), amt=80000, payee='Staff bonus', sc=.26, ang=-4)
    if u >= 1:
        r = 30 * seg(t, t0 + .05, t0 + .6, eout)
        c.drawCircle(x, YB_Y + 28, r, paint(col, .6 * a * (1 - seg(t, t0 + .2, t0 + .7)), stroke=3))
    return u

def _s4(c, t):
    a = seg(t, U5 - .3, U5 + .3) * (1 - seg(t, U7 - .45, U7 + .05))
    if a <= 0: return
    eu = seg(t, W5_GRACE - .15, W5_GRACE + 1.2)
    marks = []
    ma = seg(t, W5_DUE - .2, W5_DUE + .3)
    if ma > 0: marks.append((EXT, 'return due · 139(1)' if t > W5_SEC else 'return due date', GOLD, ma, 1))
    d1 = seg(t, W6_F1, W6_F1 + .3)
    if d1 > 0: marks.append(((2026, 10, 15, .5), 'paid 15 Oct', GREEN, d1, 0))
    d2 = seg(t, W6_F2, W6_F2 + .3)
    if d2 > 0: marks.append(((2026, 11, 15, .5), 'paid 15 Nov', ORANGE, d2, 2))
    ga = seg(t, W5_GRACE + .6, W5_GRACE + 1.4)
    spans = [((2026, 4, 1), EXT, 'grace zone', GREEN, ga * (.6 + .4 * win(t, W5_STILL - .3, W5_STILL + 2, .3, .6)))]
    # beyond the due date (u6)
    oa = a * seg(t, W6_F2 - .5, W6_F2)
    if oa > 0:
        p = paint(ORANGE, .7 * oa, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawRRect(rrect(XO31 + 6, YB_Y + 12, 1820 - XO31 - 6, 32, 8), paint(ORANGE, .1 * oa))
        c.drawRRect(rrect(XO31 + 6, YB_Y + 12, 1820 - XO31 - 6, 32, 8), p)
    yearbar(c, YB_X, YB_Y, YB_W, a, t, extend=EXT, ext_u=eu, ext_col=GREEN, ext_label='grace period',
            marks=marks, spans=spans)
    if oa > 0: text(c, 'too late', (XO31 + 1820) / 2 + 22, YB_Y + 35, 20, 800, ORANGE, oa, 'c')
    # tax audit -> 31 Oct
    sa = seg(t, W6_AUDIT - .1, W6_AUDIT + .9, linr)
    if sa > 0: stamp(c, 1215, 318, 'TAX AUDIT', ACC, a, sa, -8, 26)
    og = a * win(t, W6_OCT - .2, W6_OCT + 1.4, .2, .6)
    if og > 0: c.drawCircle(XO31, YB_Y + 28, 34, paint(GOLD, .5 * og, stroke=4, blur=3))
    # "still allowed this year": back into P.Y. 2025-26
    au = seg(t, W5_STILL - .4, W5_STILL + .5)
    ta = a * seg(t, W5_STILL - .5, W5_STILL)
    g_a = win(t, W6_ALLOW - .2, W6_ALLOW + 1.6, .2, .6)
    _tray(c, *TRA, 'DEDUCTION · P.Y. 2025-26', GREEN, ta, g_a)
    if ta > 0:
        _carrow(c, [(1215, YB_Y + 58), (1190, 590), (980, 650), (800, 705)], au, GREEN, a, 4, 18)
        text(c, 'still allowed this year', 1000, 772, 30, 800, GREEN, a * seg(t, W5_STILL, W5_STILL + .5), 'c', shadow=6)
    tb = a * seg(t, W6_F2 + .2, W6_F2 + .7)
    _tray(c, *TRB, 'DEDUCTION · P.Y. 2026-27', ORANGE, tb, win(t, W6_NEXT - .2, W6_NEXT + 1.5, .2, .6))
    # the two payments
    u1 = _drop(c, t, W6_F1, XO15, GREEN, a)
    if u1 >= 1:
        fu = seg(t, W6_ALLOW - .35, W6_ALLOW + .35)
        x = lerp(XO15, TRA[0] + 220, fu); y = lerp(YB_Y + 150, TRA[1] + 98, fu) - 70 * math.sin(math.pi * fu)
        w_ = chip(c, x, y, 'Bonus ₹80,000', GREEN, a, 28)
        if fu >= 1: tick(c, TRA[0] + 220 + w_ / 2 + 34, TRA[1] + 98, a * seg(t, W6_ALLOW + .3, W6_ALLOW + .6), 20)
    u2 = _drop(c, t, W6_F2, XN15, ORANGE, a)
    if u2 >= 1:
        fu = seg(t, W6_NEXT - .45, W6_NEXT + .25)
        x = lerp(XN15 - 60, TRB[0] + 200, fu); y = lerp(YB_Y + 150, TRB[1] + 98, fu) - 50 * math.sin(math.pi * fu)
        chip(c, x, y, 'Bonus ₹80,000', ORANGE, a, 28)
        if fu >= 1: stamp(c, TRB[0] + 450, TRB[1] + 96, 'NEXT YEAR', VIO, a, seg(t, W6_NEXT, W6_NEXT + 1., linr), -10, 26)

# ---------------------------------------------------------------- S5 (u7 trap): a loan is not payment
BOXC = (840, 520)
TX, TY, TWd, THd = 1240, 330, 560, 300                       # the deduction tray
def _s5(c, t):
    a = seg(t, U7 - .3, U7 + .3) * (1 - seg(t, U8 - .45, U8 + .05))
    if a <= 0: return
    # the bank
    ba = a * seg(t, U7 - .1, U7 + .4)
    _box(c, 120, 330, 300, 300, ACC, ba, .82, .7)
    icon(c, 'bank', 270, 440, 1.8, shade(ACC, .2), ba)
    lab(c, 'Bank', 270, 560, ba, 32, WHITE, 800)
    lab(c, 'lender', 270, 598, ba, 22, DIM, 600)
    cx, cy = BOXC
    wr = seg(t, W7_LOAN - .5, W7_LOAN + .3)                    # wrapped into a new loan
    rep = seg(t, W7_ALLOW - .2, W7_ALLOW + .3)                # the loan splits into repayment slices
    # the box body around the coins
    bw, bh = 300, 190; bx, by = cx - bw / 2, cy + 110 - bh
    if wr > 0:
        ha = a * seg(wr, 0, .4)
        hh = lerp(30, bh, ease(seg(wr, 0, .6)))
        c.drawRRect(rrect(bx, by + bh - hh + 8, bw, hh, 16), paint(BLACK, .35 * ha, blur=14))
        c.drawRRect(rrect(bx, by + bh - hh, bw, hh, 16), paint(shade(VIO, -.8), .6 * ha))
        c.drawRRect(rrect(bx, by + bh - hh, bw, hh, 16), paint(VIO, .9 * ha, stroke=2.2))
    # the unpaid interest: a stack of coins
    ia = a * seg(t, W7_UNPAID - .3, W7_UNPAID + .2)
    if ia > 0:
        for k in range(4):
            coin(c, cx - 36 + 24 * (k % 2), cy + 60 - 22 * k, 30, ia * (1 - .6 * wr), GOLD)
        text(c, 'interest due · unpaid', cx, cy - 74, 26, 800, RED, ia * (1 - seg(wr, .3, .7)), 'c')
    if wr > 0:
        lid = seg(wr, .5, 1, back); la = a * seg(wr, .4, .7)
        ly = by - 50 - 40 * (1 - lid)
        c.drawRRect(rrect(bx - 14, ly, bw + 28, 46, 10), paint(shade(VIO, -.45), la))
        c.drawRRect(rrect(bx - 14, ly, bw + 28, 46, 10), paint(VIO, la, stroke=2))
        text(c, 'NEW LOAN', cx, ly + 33, 26, 800, WHITE, la, 'c', track=3)
        _carrow(c, [(430, 470), (560, 430), (bx - 24, 460)], seg(t, W7_LOAN - .3, W7_LOAN + .4), VIO, a, 3.5, 16)
        text(c, 'from the same bank', 560, 404, 22, 700, VIO, a * seg(wr, .5, 1), 'c')
    # NOT PAYMENT
    nu = seg(t, W7_NOT - .1, W7_NOT + .9, linr)
    if nu > 0: stamp(c, cx, cy + 22, 'NOT PAYMENT', RED, a * (1 - .25 * rep), nu, -10, 34)
    # the deduction tray: locked until repaid
    ta = a * seg(t, W7_UNPAID, W7_UNPAID + .5)
    _tray(c, TX, TY, TWd, THd, 'DEDUCTION FOR INTEREST', GREEN, ta)
    if ta > 0:
        op = seg(t, W7_REPAYS + .45, W7_REPAYS + .85)
        padlock(c, TX + TWd - 60, TY + 42, 1.2, mixc(GOLD, GREEN, op), ta, op)
        lab(c, 'locked: nothing paid yet', TX + TWd / 2, TY + 170, ta * (1 - seg(t, W7_REPAYS + .3, W7_REPAYS + .7)), 28, DIM, 700)
    # repaid slice by slice
    if rep > 0:
        for k in range(3):
            t0 = W7_REPAYS - .2 + .7 * k
            u = seg(t, t0, t0 + .6)
            sx0, sy0 = cx - 104 + 104 * k, 700
            if u < 1:
                x = lerp(sx0, 270, ease(u)); y = lerp(sy0, 660, ease(u)) - 70 * math.sin(math.pi * u)
                sa = a * rep * (1 - seg(u, .8, 1))
                _box(c, x - 48, y - 30, 96, 60, VIO, sa, .7, .9, r=10)
                text(c, 'repay', x, y + 8, 22, 800, WHITE, sa, 'c')
            ca = a * seg(t, t0 + .6, t0 + .9, back)
            if ca > 0:
                chip(c, TX + 200, TY + 112 + 62 * k, 'repaid %d · allowed' % (k + 1), GREEN, ca, 26)
                tick(c, TX + 380, TY + 112 + 62 * k, ca, 16)
        text(c, 'allowed only as the loan is repaid', TX + TWd / 2, TY + THd + 60, 28, 800, GREEN,
             a * seg(t, W7_REPAYS, W7_REPAYS + .5), 'c', shadow=6)

# ---------------------------------------------------------------- S6 (u8, u9): 43B(h), the MSME clock
FAC = (300, 640)
BAR_X = 640; BAR_PX = 13.2                                   # px per day for the MSME clocks
def _clockbar(c, x, y, days, label, sub, col, a, u, t):
    if a <= 0: return
    w = days * BAR_PX
    c.drawRRect(rrect(x, y, w, 46, 12), paint(shade(col, -.8), .95 * a))
    c.drawRRect(rrect(x, y, w * clamp(u), 46, 12), paint(col, .45 * a))
    c.drawRRect(rrect(x, y, w, 46, 12), paint(col, .9 * a, stroke=2))
    for d in range(0, days + 1, 5):
        c.drawLine(x + d * BAR_PX, y + 34, x + d * BAR_PX, y + 46, paint(WHITE, .25 * a, stroke=1.4))
    text(c, label, x, y - 16, 26, 800, WHITE, a)
    text(c, sub, x + w + 18, y + 33, 28, 800, col, a)

def _s6(c, t):
    a = seg(t, U8 - .3, U8 + .3) * (1 - seg(t, U10 - .45, U10 + .05))
    if a <= 0: return
    # the micro / small supplier
    fa = a * seg(t, U8 - .2, U8 + .4)
    factory(c, FAC[0], FAC[1], .6, fa, t)
    person(c, 560, 826, .72, fa * (1 - seg(t, U9 - .2, U9 + .3)), 'supplier', t, look=-.4)
    if fa > 0:
        chip(c, FAC[0], FAC[1] + 30, 'micro / small enterprise', ORANGE, a * seg(t, W8_MICRO - .2, W8_MICRO + .3), 24)
        chip(c, FAC[0], FAC[1] + 96, '₹ owed by the bakery', GOLD, a * seg(t, W8_MONEY - .2, W8_MONEY + .3, back) * (1 - seg(t, U9 - .3, U9 + .2)), 24)
    # u8: the clocks (fade at u9)
    ka = a * (1 - seg(t, U9 - .3, U9 + .2))
    if ka > 0:
        sa = ka * seg(t, U8 - .1, U8 + .5, back)
        text(c, 'THE NEWEST CLAUSE', BAR_X, 254, 20, 800, DIM, ka * seg(t, U8 + .2, U8 + .7), track=3)
        sec(c, BAR_X, 300, '43B(h)', sa, VIO, 34)
        sec(c, BAR_X + 196, 300, 'MSMED Act · sec 15', ka * seg(t, W8_MSME - .2, W8_MSME + .3), VIO, 24, mark='')
        ru = seg(t, W8_MUST, W8_MUST + 2.2, linr)
        _clockbar(c, BAR_X, 420, 45, 'with a written agreement', 'up to 45 days', GOLD, ka * seg(t, W8_MUST - .3, W8_MUST + .2), ru, t)
        _clockbar(c, BAR_X, 540, 15, 'no agreement', '15 days', ACC, ka * seg(t, W8_MUST + .3, W8_MUST + .8), seg(t, W8_MUST + .3, W8_MUST + 1.1, linr), t)
        hourglass(c, BAR_X + 45 * BAR_PX + 290, 470, .8, ka * seg(t, W8_MUST - .2, W8_MUST + .3), seg(t, W8_MUST, W8_MSME + 3, linr))
        # paid late
        la = ka * seg(t, W8_OTHER - .3, W8_OTHER + .2)
        if la > 0:
            lx = BAR_X + 45 * BAR_PX
            p = paint(RED, .9 * la, stroke=3); c.drawLine(lx, 400, lx, 600, p)
            u = seg(t, W8_OTHER, W8_OTHER + .6, eout)
            px = lerp(lx + 10, lx + 150, u)
            c.drawCircle(px, 690, 12, paint(ORANGE, la)); c.drawCircle(px, 690, 20, paint(ORANGE, .35 * la, blur=6))
            text(c, 'paid late', px + 26, 699, 26, 800, ORANGE, la)
            _carrow(c, [(lx - 300, 690), (px - 16, 690)], u, ORANGE, la, 3, 14, dashed=True)
            text(c, 'deductible only in the year it is paid', BAR_X + 300, 770, 30, 800, ORANGE,
                 ka * seg(t, W8_YEAR - .6, W8_YEAR - .1), 'c', shadow=6)
    _s6_strip(c, t, a)

# u9: the March–April strip
SX, SY, SW_ = 650, 360, 550                                   # March = 550 px, April continues at the same scale
SEXT = (2026, 4, 30)
def _sx(d): return yearbar_x(SX, SW_, d, (2026, 3, 1), (2026, 3, 31), SEXT)
X_A2, X_A5, X_A20 = _sx((2026, 4, 2, .5)), _sx((2026, 4, 5, 1.)), _sx((2026, 4, 20, .5))
TRC = (650, 650, 550, 150)
TRD = (1250, 650, 560, 150)

def _s6_strip(c, t, a):
    sa = a * seg(t, U9 + 1.4, U9 + 2.0)
    if sa <= 0: return
    marks = []
    m1 = seg(t, W9_MARCH - .2, W9_MARCH + .3)
    if m1 > 0: marks.append(((2026, 3, 1), '1 Mar · bought', ACC, m1))
    m2 = seg(t, W9_APR5 - .2, W9_APR5 + .3)
    if m2 > 0: marks.append(((2026, 4, 5, 1.), 'due 5 Apr', GOLD, m2))
    m3 = seg(t, W9_PAID1 - .1, W9_PAID1 + .3)
    if m3 > 0: marks.append(((2026, 4, 2, .5), 'paid 2 Apr', GREEN, m3, 1))
    m4 = seg(t, W9_PAID2 - .1, W9_PAID2 + .3)
    if m4 > 0: marks.append(((2026, 4, 20, .5), 'paid 20 Apr', ORANGE, m4, 1))
    spans = [((2026, 3, 1), (2026, 4, 5), 'agreed credit period', GOLD, .8 * seg(t, W9_PAYABLE - .2, W9_PAYABLE + .6))]
    yearbar(c, SX, SY, SW_, sa, t, start=(2026, 3, 1), end=(2026, 3, 31), extend=SEXT, ext_u=seg(t, U9 + 1.5, U9 + 2.6),
            ext_col='#94a3b8', ext_label='April 2026 · P.Y. 2026-27', py='March 2026 · P.Y. 2025-26', marks=marks, spans=spans)
    # day ticks
    for d in range(2, 61):
        dd = (2026, 3, d) if d <= 31 else (2026, 4, d - 31)
        x = _sx(dd)
        c.drawLine(x, SY + 48, x, SY + 56, paint(WHITE, .22 * sa, stroke=1.2))
    # the purchase: boxes + bill from the micro enterprise
    pa = a * seg(t, W9_BOXES - .3, W9_BOXES + .2)
    if pa > 0:
        u = seg(t, W9_BOXES - .3, W9_BOXES + .7)
        boxes(c, lerp(FAC[0] + 60, 545, u), 476, .7, pa)
        bill(c, FAC[0] - 10, 430, a * seg(t, W9_TEN - .3, W9_TEN + .2), title='Boxes', amt=10000, date='1 Mar 2026',
             sc=.8, ang=-3, col=ORANGE, no='micro supplier')
    # outcomes
    _tray(c, *TRC, 'DEDUCTION · P.Y. 2025-26', GREEN, a * seg(t, W9_PAID1 - .3, W9_PAID1 + .2),
          win(t, W9_ALLOW - .2, W9_ALLOW + 1.6, .2, .6))
    _tray(c, *TRD, 'DEDUCTION · P.Y. 2026-27', ORANGE, a * seg(t, W9_PAID2 - .3, W9_PAID2 + .2),
          win(t, W9_NEXT - .2, W9_NEXT + 1.6, .2, .6))
    fu = seg(t, W9_ALLOW - .4, W9_ALLOW + .3)
    if fu > 0:
        x = lerp(X_A2, TRC[0] + 200, fu); y = lerp(SY + 100, TRC[1] + 98, fu) - 60 * math.sin(math.pi * fu)
        w_ = chip(c, x, y, 'Boxes ₹10,000', GREEN, a, 28)
        if fu >= 1: tick(c, TRC[0] + 200 + w_ / 2 + 34, TRC[1] + 98, a * seg(t, W9_ALLOW + .3, W9_ALLOW + .6), 20)
        lab(c, 'paid by the agreed date', TRC[0] + TRC[2] / 2, TRC[1] + 140, a * seg(t, W9_ALLOW + .2, W9_ALLOW + .6), 22, DIM, 600)
    fu2 = seg(t, W9_NEXT - .5, W9_NEXT + .2)
    if fu2 > 0:
        x = lerp(X_A20, TRD[0] + 190, fu2); y = lerp(SY + 100, TRD[1] + 98, fu2) - 50 * math.sin(math.pi * fu2)
        chip(c, x, y, 'Boxes ₹10,000', ORANGE, a, 28)
        if fu2 >= 1: stamp(c, TRD[0] + 450, TRD[1] + 96, 'NEXT YEAR', VIO, a, seg(t, W9_NEXT, W9_NEXT + 1., linr), -10, 26)
    # "late" wall at 5 Apr
    wa = a * seg(t, W9_PAID2 - .2, W9_PAID2 + .3)
    if wa > 0:
        c.drawLine(X_A5, SY - 6, X_A5, SY + 62, paint(RED, .9 * wa, stroke=4))
        text(c, 'late', (X_A5 + X_A20) / 2, SY + 92, 24, 800, ORANGE, wa, 'c')

# ---------------------------------------------------------------- S7 (u10): the difference
AX0, AX1 = 560, 1740                                          # 1 Mar 2026 .. 31 Oct 2026
AD0, AD1 = (2026, 3, 1), (2026, 10, 31)
def _ax(d): return yearbar_x(AX0, AX1 - AX0, d, AD0, AD1)
XA_M31, XA_O31 = _ax((2026, 4, 1)), _ax((2026, 10, 31, 1.))

def _s7(c, t):
    a = seg(t, U10 - .3, U10 + .3) * (1 - seg(t, U11 - .45, U11 + .05))
    if a <= 0: return
    # axis
    ya = 300
    text(c, 'MAR', (AX0 + XA_M31) / 2, ya, 22, 800, DIM, a, 'c', track=2)
    for k, m in enumerate('APR MAY JUN JUL AUG SEP OCT'.split()):
        x0 = _ax((2026, 4 + k, 1)); x1 = _ax((2026, 5 + k, 1)) if k < 6 else XA_O31
        text(c, m, (x0 + x1) / 2, ya, 22, 800, DIM, a * .8, 'c', track=2)
        c.drawLine(x0, ya + 16, x0, 640, paint(WHITE, .06 * a, stroke=1.2))
    c.drawLine(XA_M31, ya + 12, XA_M31, 650, paint(WHITE, .9 * a, stroke=4))
    lab(c, '31 Mar', XA_M31, 680, a, 22, WHITE, 800)
    c.drawLine(XA_O31, ya + 12, XA_O31, 650, paint(GOLD, .8 * a, stroke=3))
    lab(c, '31 Oct · return due', XA_O31 - 40, 680, a, 22, GOLD, 800)
    # row 1: ordinary 43B items
    r1 = a * seg(t, W10_ORD - .3, W10_ORD + .2)
    if r1 > 0:
        y = 360
        text(c, 'Ordinary 43B items', 110, y + 36, 30, 800, WHITE, r1)
        text(c, 'bonus · taxes · PF · bank interest', 110, y + 72, 22, 600, DIM, r1)
        c.drawRRect(rrect(AX0, y + 6, XA_M31 - AX0, 60, 10), paint(shade(ACC, -.6), r1))
        g = seg(t, W10_GRACE - .3, W10_GRACE + .9)
        c.drawRRect(rrect(XA_M31, y + 6, (XA_O31 - XA_M31) * g, 60, 10), paint(GREEN, .35 * r1))
        c.drawRRect(rrect(XA_M31, y + 6, (XA_O31 - XA_M31) * g, 60, 10), paint(GREEN, .9 * r1, stroke=2))
        text(c, 'grace till the return date', (XA_M31 + XA_O31) / 2, y + 46, 28, 800, WHITE, r1 * seg(g, .6, 1), 'c')
    # row 2: MSME dues
    r2 = a * seg(t, W10_MSME - .3, W10_MSME + .2)
    if r2 > 0:
        y = 500
        text(c, 'MSME dues · 43B(h)', 110, y + 36, 30, 800, WHITE, r2)
        text(c, 'micro / small supplier', 110, y + 72, 22, 600, DIM, r2)
        x0 = _ax((2026, 3, 1)); x1 = _ax((2026, 4, 15, 1.))
        c.drawRRect(rrect(x0, y + 6, x1 - x0, 60, 10), paint(shade(GOLD, -.62), r2))
        c.drawRRect(rrect(x0, y + 6, x1 - x0, 60, 10), paint(GOLD, .9 * r2, stroke=2))
        text(c, '≤ 45 days', (x0 + x1) / 2, y + 46, 26, 800, WHITE, r2, 'c')
        na = a * seg(t, W10_NO - .2, W10_NO + .3)
        if na > 0:
            c.drawRRect(rrect(x1 + 6, y + 6, (XA_O31 - x1 - 6) * seg(t, W10_NO - .2, W10_NO + .6), 60, 10), paint(RED, .1 * na))
            c.save(); c.clipRect(skia.Rect(x1 + 6, y + 6, x1 + 6 + (XA_O31 - x1 - 6) * seg(t, W10_NO - .2, W10_NO + .6), y + 66))
            for k in range(40):
                xx = x1 + 6 + k * 30; c.drawLine(xx, y + 66, xx + 40, y + 6, paint(RED, .28 * na, stroke=2))
            c.restore()
            c.drawLine(x1 + 3, y - 6, x1 + 3, y + 78, paint(RED, na, stroke=6))
            text(c, 'no grace', (x1 + XA_O31) / 2, y + 46, 30, 800, RED, na, 'c', shadow=6)
    # row 3: who is covered
    ma = a * seg(t, W10_MED - .6, W10_MED - .1)
    if ma > 0:
        y = 752
        c.drawRRect(rrect(560, y - 34, 470, 68, 34), paint(VIO, .08 * ma))
        p = paint(VIO, .7 * ma, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawRRect(rrect(560, y - 34, 470, 68, 34), p)
        text(c, '43B(h)', 600, y + 9, 24, 800, VIO, ma)
        chip(c, 780, y, 'micro', ORANGE, ma, 26)
        chip(c, 920, y, 'small', ORANGE, ma, 26)
        mu = a * seg(t, W10_MED - .1, W10_MED + .4, back)
        chip(c, 1150, y, 'medium', DIM, mu, 26)
        cross(c, 1236, y - 26, mu, 14)
        text(c, 'outside the rule', 1280, y + 9, 26, 700, DIM, mu)

# ---------------------------------------------------------------- S8 (u11 check): below the card
def _s8(c, t):
    a = seg(t, U11 - .2, U11 + .4)
    if a <= 0: return
    x0, y0, w = 420, 860, 1080
    xm = x0 + 160; xo = x0 + w - 40                            # 31 Mar · 31 Oct
    def X(m, d): return xm + ((m - 4) * 30.5 + d) / 214 * (xo - xm)
    c.drawRRect(rrect(x0, y0, xm - x0, 40, 10), paint(ACC, .22 * a))
    c.drawRRect(rrect(xm, y0, xo - xm, 40, 10), paint(GREEN, .25 * a))
    c.drawRRect(rrect(xm, y0, xo - xm, 40, 10), paint(GREEN, .8 * a, stroke=2))
    c.drawLine(xm, y0 - 10, xm, y0 + 50, paint(WHITE, .9 * a, stroke=4))
    text(c, 'P.Y. 2025-26', (x0 + xm) / 2, y0 + 28, 22, 800, WHITE, a, 'c')
    text(c, 'grace till 31 Oct 2026', (X(4, 20) + xo) / 2 + 60, y0 + 28, 22, 800, WHITE, a, 'c')
    text(c, '31 Mar', xm, y0 + 82, 22, 800, WHITE, a, 'c')
    text(c, '31 Oct', xo, y0 + 82, 22, 800, GOLD, a, 'c')
    # the GST bill dropping on 20 Apr
    u = seg(t, W11_TWENTY - .3, W11_TWENTY + .3, ein)
    xg = X(4, 20)
    bill(c, xg, lerp(780, y0 - 50, u), a * seg(t, W11_GST - .3, W11_GST + .2), title='GST for March', amt=None,
         mode='bank', sc=.5, ang=-3)
    if u >= 1:
        c.drawLine(xg, y0 - 8, xg, y0 + 48, paint(GOLD, a, stroke=3))
        text(c, '20 Apr', xg, y0 + 82, 22, 800, GOLD, a, 'c')
    if t < WA_YES:
        _q(c, xg + 120, y0 - 40, a * seg(t, W11_TWENTY + .3, W11_TWENTY + .8), t, 44)
    else:
        tick(c, xg + 120, y0 - 50, a * seg(t, WA_YES - .1, WA_YES + .3), 22)
        text(c, 'allowed this year', xg + 156, y0 - 40, 26, 800, GREEN, a * seg(t, WA_BEFORE - .3, WA_BEFORE + .2))

def ch_u(c, t):
    if t < CS - .5 or t > CE + .5: return
    if t < U3 + .3: _s1(c, t)
    if U3 - .3 < t < U4 + .1: _s2(c, t)
    if U4 - .4 < t < U5 + .5: _s3(c, t)
    if U5 - .4 < t < U7 + .1: _s4(c, t)
    if U7 - .4 < t < U8 + .1: _s5(c, t)
    if U8 - .4 < t < U10 + .1: _s6(c, t)
    if U10 - .4 < t < U11 + .1: _s7(c, t)
    if t > U11 - .3: _s8(c, t)
