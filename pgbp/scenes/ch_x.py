"""Chapter X — The 8% shortcut (section 44AD), a hero chapter.
x1 hook: Sunil's grocery shop (Sunil behind the counter) and an empty accountant's chair with a dashed ghost; the
   Assessing Officer leans in with a magnifier and the shop's profit is only a "₹ ?".
x2 "it can't, easily": loose chits spill from the counter and the officer frowns. Then the law's deal: coins stream
   from the counter into a Turnover bar, a fixed slice drops off as Profit, and the Books of account are crossed out.
x3 name (44AD): one big turnover bar; an 8% slice drops into a profit tray; the bar splits into cash (8%) and
   bank / digital (6%) parts and the tray re-forms as two slices; cash / bank / UPI icons light as spoken.
x4 eligibility tiles (resident individual, HUF, partnership firm ticked; LLP crossed); a turnover dial whose limit
   sits at ₹2 crore and slides to ₹3 crore once the cash meter is within 5%.
x5 trap: a 44AD scanner gate over a conveyor: a trader passes (green); professionals, commission / brokerage and
   agency cards are rejected onto a "not for 44AD" shelf; the goods-carriage card is diverted to "44AE · own scheme".
x6 example (hero): Sunil's turnover bar with a thin cash sliver, a cash-share meter at 4.69% under the 5% line ->
   eligible; the computation sheet: turnover ₹2,98,50,000 · 8% × ₹14,00,000 = ₹1,12,000 · 6% × ₹2,84,50,000 =
   ₹17,07,000 · income ₹18,19,000 (chime).
x7 the income flies up into a pill; section 30–38 deduction tiles rise at it, then settle greyed and ticked as an
   "ALREADY GIVEN" stamp lands (depreciation glows, "depreciation included"); a firm's partners' salary and interest bounce off (red); advance tax: 15 Jun /
   15 Sep / 15 Dec fade, 15 Mar takes 100% in one instalment.
x8 what if: a 9-year strip: year 1 on 44AD, a "next five years" bracket, year 3 declares less (red) -> years 4–8
   padlocked ("locked out · 5 years"); books + TAX AUDIT stamp, "if income > basic exemption limit".
x9 exam: calm: the total-turnover bar at 8%; A/c payee cheque, bank draft and electronic-mode tiles light as spoken
   and feed the 6% part.
x10 check: below the card, Meera's ₹2.4 crore turnover with a 12% cash meter (red, over 5%); the answer crosses 44AD.
"""
from scenes.common import *
import props as _P

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

def _WA(i, w, d=0.):
    """Word time inside a check's answer cue ('x10a'), falling back to the answer start."""
    try: return Wd(i, w) + d
    except Exception: return TA(i[:-1]) + d

X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 = (T('x%d' % k) for k in range(1, 11))
CS, CE = B.span('x')
X10A = TA('x10')

GROC, ACCT, HOW, PROF1 = W('x1', 'grocery'), W('x1', 'accountant'), W('x1', 'how'), W('x1', 'profit')
EASY, SMALL2, LAW2, DEAL, DECL, FIXED, TURN2, PROF2, SKIP, BOOKS2 = (
    W('x2', 'easily'), W('x2', 'small'), W('x2', 'law'), W('x2', 'deal'), W('x2', 'declare'), W('x2', 'fixed'),
    W('x2', 'turnover'), W('x2', 'profit'), W('x2', 'skip'), W('x2', 'books'))
PROFIT3 = W('x3', 'profit')
PRES3, SEC3, EIGHT3, SIX3, BANKS3, DIG3 = (W('x3', 'presumptive'), W('x3', '44AD'), W('x3', 'eight'), W('x3', 'six'),
                                           W('x3', 'banks'), W('x3', 'digital'))
RES4, HUF4, FIRM4, LLP4, TWO4, THREE4, CASH4, FIVE4 = (
    W('x4', 'resident'), W('x4', 'HUF'), W('x4', 'firm'), W('x4', 'LLP'), W('x4', 'two crore'), W('x4', 'three crore'),
    W('x4', 'cash receipts'), W('x4', 'five'))
EVERY5, PROF5, COMM5, AGEN5, GOODS5, OWN5 = (W('x5', 'everyone'), W('x5', 'professionals'), W('x5', 'commission'),
                                             W('x5', 'agency'), W('x5', 'goods'), W('x5', 'own'))
TWO6, FOURT6, UNDER6, ELIG6, EIGHT6, ONEL6, SIX6, SEVT6, INC6, EIGHTEEN6 = (
    W('x6', 'two crore'), W('x6', 'fourteen'), W('x6', 'under'), W('x6', 'eligible'), W('x6', 'eight percent'),
    W('x6', 'one lakh'), W('x6', 'six percent'), W('x6', 'seventeen'), W('x6', 'income'), W('x6', 'eighteen'))
EVERY7, THIRTY7, ALREADY7, DEP7, FIRM7, SAL7, INT7, ADV7, ONEGO7, FIF7 = (
    W('x7', 'every'), W('x7', 'thirty'), W('x7', 'already'), W('x7', 'depreciation'), W('x7', 'firm'),
    W('x7', 'salary'), W('x7', 'interest'), W('x7', 'advance'), W('x7', 'one go'), W('x7', 'fifteen'))
USES8, LESS8, NEXT8, LOCK8, FIVEY8, BOOKS8, AUD8, ABOVE8 = (
    W('x8', 'uses'), W('x8', 'less'), W('x8', 'next five'), W('x8', 'locked'), W('x8', 'five years'),
    W('x8', 'books'), W('x8', 'audit'), W('x8', 'above'))
DEEM9, EIGHT9, REC9, CHQ9, DRAFT9, ELEC9, SIX9 = (W('x9', 'deemed'), W('x9', 'eight'), W('x9', 'received'),
                                                  W('x9', 'cheque'), W('x9', 'draft'), W('x9', 'electronic'),
                                                  W('x9', 'six'))
TWOPT10, TWELVE10 = W('x10', 'two point four'), W('x10', 'twelve')
A_NO, A_ABOVE, A_CASH = _WA('x10a', 'no'), _WA('x10a', 'above'), _WA('x10a', 'cash')

# x5: items riding into the 44AD gate: (spawn time, label, icon, colour, fate)
ITEMS = [(X5 - .35, 'Trader · retail shop', 'shop', GREEN, 'pass'),
         (PROF5 - .25, 'Specified professions', 'compass', RED, 0),
         (COMM5 - .25, 'Commission or brokerage', 'percent', RED, 1),
         (AGEN5 - .25, 'Agency business', 'transfer', RED, 2),
         (GOODS5 - .25, 'Goods carriages', 'truck', VIO, '44AE')]
RIDE = 1.0                                                  # seconds from spawn to the gate mouth

for tt, k in ((X1 - .1, 'whoosh'), (ACCT, 'pop'), (HOW, 'whoosh'), (EASY + .1, 'flip'), (DEAL, 'pop'),
              (FIXED + .2, 'snip'), (SKIP + .2, 'tap'),
              (SEC3, 'chime_lo'), (EIGHT3 + .1, 'snip'), (SIX3 + .2, 'snip'),
              (LLP4 + .3, 'error'), (FIVE4 + .1, 'ok'),
              (ITEMS[0][0] + RIDE, 'ok'), (ITEMS[1][0] + RIDE, 'error'), (ITEMS[2][0] + RIDE, 'error'),
              (ITEMS[3][0] + RIDE, 'error'), (ITEMS[4][0] + RIDE, 'warn'),
              (ELIG6, 'ok'), (EIGHTEEN6 + .25, 'chime'),
              (ALREADY7 + .3, 'thunk'), (SAL7 + .5, 'error'), (FIF7, 'tick'),
              (LOCK8, 'key'), (AUD8 + .25, 'thunk'),
              (A_NO, 'error')):
    _ev(tt, k)

_RX = skia.Rect.MakeXYWH

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.78, glow=0., r=16, stroke=.9):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shader=lgrad((x, y), (x, y + h), [shade(col, -fill), '#0a0f1f']), a=a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, r), paint(col, stroke * a, stroke=2))

def _pill(c, cx, cy, s, col, a, size=30, fill=.2, glow=0.):
    if a <= 0: return 0
    tw = text_w(s, size, 800); w = tw + size * 1.4; h = size * 1.8
    if glow > 0: c.drawRRect(rrect(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, h / 2 + 6), paint(col, .35 * a * glow, blur=14))
    c.drawRRect(rrect(cx - w / 2, cy - h / 2 + 5, w, h, h / 2), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(cx - w / 2, cy - h / 2, w, h, h / 2), paint(shade(col, -.82), .96 * a))
    c.drawRRect(rrect(cx - w / 2, cy - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(cx - w / 2, cy - h / 2, w, h, h / 2), paint(col, .95 * a, stroke=2.2))
    text(c, s, cx, cy + size * .36, size, 800, WHITE, a, 'c')
    return w

def _icard(c, cx, by, ic, label, col, a, mark=None, glow=0.):
    """A business-type card 284 x 104, bottom-centre (cx, by): icon left, label right (2 lines max)."""
    if a <= 0: return
    w, h = 284, 104; x, y = cx - w / 2, by - h
    _box(c, x, y, w, h, col, a, .74, glow, 14)
    icon(c, ic, x + 44, y + h / 2, .66, shade(col, .25), a)
    lines = wrap(label, 24, w - 98, 700)[:2]
    for k, ln in enumerate(lines):
        text(c, ln, x + 82, y + h / 2 + 9 + (k - (len(lines) - 1) / 2) * 28, 24, 700, WHITE, a)
    if mark is not None and mark > 0:
        (cross if col == RED else tick)(c, x + w - 4, y + 4, a * mark, 17, RED if col == RED else GREEN)

def _brace(c, x0, x1, y, col, a, down=True, label=None, size=26):
    """A thin bracket from x0 to x1 at y, ticks pointing up (down=True draws it under things), label centred."""
    if a <= 0: return
    d = -12 if down else 12
    p = skia.Path(); p.moveTo(x0, y + d); p.lineTo(x0, y); p.lineTo(x1, y); p.lineTo(x1, y + d)
    c.drawPath(p, paint(col, .85 * a, stroke=2.4))
    if label: text(c, label, (x0 + x1) / 2, y + (36 if down else -16), size, 700, col, a, 'c', shadow=6)

# ---------------------------------------------------------------- the grocery shop (two cached layers)
def _jar(cv, x, y, w, h, col):
    cv.drawRRect(rrect(x - w / 2, y - h, w, h, 5), paint(col))
    cv.drawRRect(rrect(x - w / 2 + 3, y - h + 4, w * .28, h - 10, 3), paint(WHITE, .22))
    cv.drawRRect(rrect(x - w / 2 - 2, y - h - 7, w + 4, 9, 3), paint('#d1d5db'))

def _gro_back():
    def fn(cv):
        cv.drawRect(_RX(-300, -6, 600, 14), paint('#3a4256')); cv.drawRect(_RX(-300, -6, 600, 3), paint('#59627a'))
        cv.drawRect(_RX(-270, -440, 540, 436), paint(shader=lgrad((0, -440), (0, 0), ['#e3ead9', '#b9c8b0'])))
        cv.drawRect(_RX(-282, -462, 564, 28), paint(shader=lgrad((0, -462), (0, -434), ['#9db59a', '#6f8a6d'])))
        cv.drawRRect(rrect(-238, -428, 476, 76, 8), paint('#7c2d12'))
        cv.drawRRect(rrect(-238, -428, 476, 76, 8), paint('#f2c66d', stroke=3))
        ftext(cv, 'Sunil General Store', 0, -384, 34, SERIF, '#fde68a', 1, 'c', 700)
        text(cv, 'GROCERY  ·  KIRANA', 0, -362, 12, 800, '#fcd9b6', .9, 'c', track=3)
        cv.drawRect(_RX(-270, -348, 540, 60), paint(shader=lgrad((0, -348), (0, -288), [(BLACK, 0), (BLACK, .22)])))
        for k in range(10):
            xa, xb = -262 + k * 52.4, -262 + (k + 1) * 52.4
            P = poly(np.array([(xa * .94, -350), (xb * .94, -350), (xb, -304), (xa, -304)]))
            cv.drawPath(P, paint('#ea580c' if k % 2 == 0 else '#fff7ed'))
            sc = skia.Path(); sc.addArc(_RX(xa, -304 - 12, xb - xa, 24), 0, 180)
            cv.drawPath(sc, paint('#ea580c' if k % 2 == 0 else '#fff7ed'))
        cv.drawLine(-246, -350, 246, -350, paint('#9a3412', stroke=4))
        cv.drawRect(_RX(-252, -292, 504, 288), paint('#4b3524'))
        cv.drawRect(_RX(-242, -284, 484, 280), paint(shader=lgrad((0, -284), (0, 0), ['#1d2433', '#141a26'])))
        jc = ('#ef4444', '#f59e0b', '#22c55e', '#f97316', '#eab308', '#a855f7', '#ef4444', '#14b8a6')
        for r_, sy in enumerate((-226, -166)):
            cv.drawRect(_RX(-236, sy, 472, 7), paint('#8b5e3c'))
            for k in range(11):
                xx = -212 + k * 42 + (r_ * 14)
                if xx > 220: continue
                if (k + r_) % 3 == 2:
                    cv.drawRect(_RX(xx - 15, sy - 40, 30, 40), paint(shade(jc[(k + 3) % 8], -.1)))
                    cv.drawRect(_RX(xx - 15, sy - 30, 30, 12), paint(WHITE, .65))
                else: _jar(cv, xx, sy, 26, 34, jc[(k + r_) % 8])
        g = rgrad(0, -200, 300, [('#ffd9a0', .30), ('#f4a259', .12), ('#c2410c', 0)])
        cv.drawRect(_RX(-242, -284, 484, 280), paint(shader=g, blend='Screen'))
        for lx in (-250, 250):
            cv.drawLine(lx, -440, lx, -404, paint('#3a3f4b', stroke=3)); cv.drawCircle(lx, -398, 10, paint('#ffd9a0', .8))
            cv.drawCircle(lx, -398, 18, paint('#ffd9a0', .3, blur=10))
        cv.drawRect(_RX(-270, -440, 540, 440), paint('#7d8f76', .7, stroke=2, cap=False))
    return _P._pic(('x_gro_back',), fn, (-310, -480, 620, 500))

def _gro_front():
    def fn(cv):
        cv.drawRect(_RX(-212, -132, 424, 128), paint(shader=lgrad((0, -132), (0, 0), ['#8a5a34', '#5b3a22'])))
        for k in range(9): cv.drawLine(-212 + k * 53, -118, -212 + k * 53, -6, paint('#4a2f1b', .6, stroke=2))
        cv.drawRect(_RX(-222, -140, 444, 14), paint(shader=lgrad((0, -140), (0, -126), ['#c08455', '#8a5a34'])))
        # weighing scale
        cv.drawRect(_RX(-196, -152, 56, 12), paint('#9ca3af')); cv.drawRect(_RX(-176, -176, 16, 24), paint('#6b7280'))
        cv.drawOval(_RX(-208, -188, 80, 14), paint('#d1d5db')); cv.drawOval(_RX(-208, -188, 80, 14), paint('#6b7280', stroke=1.4))
        # cash box
        cv.drawRRect(rrect(30, -166, 60, 26, 4), paint('#374151')); cv.drawRect(_RX(36, -160, 48, 6), paint('#111827'))
        # UPI stand with a QR
        cv.drawRRect(rrect(104, -214, 76, 74, 6), paint(WHITE)); cv.drawRRect(rrect(104, -214, 76, 18, 6), paint('#4f46e5'))
        text(cv, 'UPI', 142, -200, 13, 800, WHITE, 1, 'c', track=2)
        qr(cv, 142, -166, 38, 1, 11)
        cv.drawRect(_RX(136, -140, 12, 2), paint('#9ca3af'))
        sack(cv, -262, 0, .5, 1, 'Rice', '#efe3c8'); sack(cv, 262, 0, .5, 1, 'Dal', '#f1d58a')
    return _P._pic(('x_gro_front',), fn, (-320, -230, 640, 250))

def _grocery(c, x, y, s, a, t, sunil=1.):
    if a <= 0: return
    with _P._fade(c, a, (x - 320 * s, y - 490 * s, x + 320 * s, y + 30 * s)):
        _P._play(c, _gro_back(), x, y, s)
        if sunil > 0: person(c, x - 44 * s, y - 104 * s, .8 * s, sunil, 'sunil', t, look=.25)
        _P._play(c, _gro_front(), x, y, s)

def _chair(c, x, y, s, a, ghost=0., t=0.):
    """An empty office chair standing at (x, y) (bottom centre); ghost 0..1 = a dashed silhouette of the absent
    accountant above the seat."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    dark, mid = '#2b3448', '#4b5878'
    c.drawOval(_RX(-90, -10, 180, 22), paint(BLACK, .45 * a, blur=10))
    for k in (-1, 0, 1):
        c.drawLine(0, -40, 70 * k, -10, paint(dark, a, stroke=9))
        c.drawCircle(70 * k, -6, 9, paint('#111827', a))
    c.drawRect(_RX(-7, -110, 14, 72), paint(shader=lgrad((-7, 0), (7, 0), ['#6b7690', '#c3cad8', '#6b7690']), a=a))
    c.drawRRect(rrect(-80, -134, 160, 30, 12), paint(mid, a)); c.drawRRect(rrect(-80, -134, 160, 12, 8), paint(WHITE, .1 * a))
    c.drawRect(_RX(56, -230, 12, 100), paint(dark, a))
    c.drawRRect(rrect(48, -330, 30, 118, 12), paint(mid, a)); c.drawRRect(rrect(52, -326, 8, 108, 4), paint(WHITE, .1 * a))
    if ghost > 0:
        p = paint(DIM, .75 * a * ghost, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], (t * 30) % 18))
        c.drawCircle(-8, -262, 40, p)
        sh = skia.Path(); sh.moveTo(-86, -136); sh.cubicTo(-86, -196, -60, -214, -8, -214)
        sh.cubicTo(44, -214, 70, -196, 70, -136); c.drawPath(sh, p)
        text(c, '?', -8, -248, 44, 800, DIM, .8 * a * ghost, 'c')
    c.restore()

# ---------------------------------------------------------------- x1 / x2: the shop, the officer, the deal
BX2, BX2E, BY2, BH2 = 760, 1740, 440, 70

def _shop_scene(c, t, a):
    if a <= 0: return
    um = seg(t, SMALL2 - .2, DEAL + .2)
    sx, ss = lerp(560, 370, um), lerp(.9, .76, um)
    sy = 812 + 26 * (1 - seg(t, CS - .2, X1 + .5, eout))
    _grocery(c, sx, sy, ss, a, t)
    lab(c, 'Sunil · grocer', sx, sy + 46, a * seg(t, GROC - .2, GROC + .4) * (1 - um), 26, DIM, 700)
    # the empty chair
    oa = a * (1 - seg(t, SMALL2 - .3, SMALL2 + .3))
    ca = oa * seg(t, ACCT - .5, ACCT)
    if ca > 0:
        _chair(c, 1050, 812, .9, ca, win(t, ACCT - .2, SMALL2 + 1, .4, .5) * (.75 + .25 * math.sin(t * 3)), t)
        lab(c, 'no accountant', 1050, 862, ca * seg(t, ACCT, ACCT + .4), 26, DIM, 700)
    # the officer + magnifier
    oo = oa * seg(t, HOW - .4, HOW + .3, eout)
    if oo > 0:
        ox = lerp(1960, 1620, seg(t, HOW - .4, HOW + .4, eout))
        mood = -seg(t, EASY - .3, EASY + .2)
        person(c, ox, 830, 1.0, oo, 'officer', t, look=-.7, mood=mood)
        mx, my = ox - 300 + 14 * math.sin(t * 1.7), 580 + 10 * math.cos(t * 1.3)
        def inside(cv):
            cv.drawRect(_RX(mx - 120, my - 120, 240, 240), paint('#1d2433', .9))
            if t < EASY - .2:
                text(cv, '₹ ?', mx, my + 22, 64, 800, GOLD, 1, 'c')
            else:
                for k in range(5):
                    bx = mx - 46 + 23 * k + 6 * math.sin(t * 2 + k); by = my - 30 + 16 * (k % 3)
                    cv.save(); cv.translate(bx, by); cv.rotate(-25 + 12 * k)
                    cv.drawRect(_RX(-24, -15, 48, 30), paint(CREAM)); cv.drawLine(-16, -4, 16, -4, paint('#9a8f78', stroke=2))
                    cv.drawLine(-16, 5, 8, 5, paint('#9a8f78', stroke=2)); cv.restore()
        magnifier(c, mx, my, 96, oo, -40, inside)
    # "profit = ?" tag over the shop
    pa = a * win(t, PROF1 - .3, DEAL - .2, .4, .5)
    if pa > 0:
        bob = 6 * math.sin(t * 2.2)
        price_tag(c, sx + 40, 352 + bob, 'profit  ₹ ?', GOLD, pa * seg(t, PROF1 - .3, PROF1 + .2, back), 30)
    # loose chits spilling from the counter (x2 "it can't, easily")
    su = seg(t, EASY - .4, EASY + 1.6, linr)
    if 0 < su and um < 1:
        for k in range(7):
            u = clamp(su * 1.25 - k * .05)
            if u <= 0: continue
            dx = (k - 3) * 52 + 30 * hsh(k, 4); bx = sx + 60 * ss + dx * u * 1.4; by = sy - 120 * ss + (40 + 60 * hsh(k, 2)) * u - 90 * math.sin(math.pi * u * .9)
            c.save(); c.translate(bx, by); c.rotate(-40 + 80 * hsh(k, 1) + 120 * u)
            ka = a * (1 - um)
            c.drawRect(_RX(-24, -16, 48, 32), paint(CREAM, ka)); c.drawRect(_RX(-24, -16, 48, 32), paint('#c9bb98', ka, stroke=1.2))
            c.drawLine(-15, -5, 15, -5, paint('#9a8f78', ka, stroke=2)); c.drawLine(-15, 5, 6, 5, paint('#9a8f78', ka, stroke=2))
            c.restore()
    _deal(c, t, a, sx, sy, ss)

def _deal(c, t, a, sx, sy, ss):
    da = a * seg(t, LAW2 - .3, LAW2 + .3)
    if da <= 0: return
    text(c, "The law's deal for small businesses", 1250, 330, 36, 800, WHITE, da * seg(t, LAW2 - .3, LAW2 + .3), 'c', shadow=8)
    # the turnover bar fills from the counter
    fu = seg(t, DECL - .4, TURN2 + .3)
    W_ = BX2E - BX2
    c.drawRRect(rrect(BX2, BY2, W_, BH2, 14), paint('#0b1226', .95 * da))
    c.drawRRect(rrect(BX2, BY2, W_, BH2, 14), paint(ACC, .5 * da, stroke=1.6))
    cut = seg(t, PROF2 - .35, PROF2 + .35)
    sw = W_ * .08
    if fu > 0:
        c.save(); c.clipRRect(rrect(BX2, BY2, W_, BH2, 14), True)
        c.drawRect(skia.Rect(BX2, BY2, BX2 + W_ * fu - (sw if cut > 0 else 0), BY2 + BH2),
                   paint(shader=lgrad((BX2, 0), (BX2E, 0), [shade(ACC, -.45), shade(ACC, -.1)]), a=da))
        hx = BX2 + ((t * 260) % (W_ + 200)) - 100
        c.drawRect(skia.Rect(hx - 40, BY2, hx + 40, BY2 + BH2), paint(WHITE, .08 * da * fu, blur=12))
        c.restore()
        P = [(sx + 40 * ss, sy - 170 * ss), (sx + 260, sy - 330), (BX2 - 60, BY2 + 40), (BX2 + 10, BY2 + BH2 / 2)]
        flowdots(c, catmull(P, False, 8), (t * .7) % 1, da * (1 - seg(t, TURN2 + .3, TURN2 + 1)), GOLD, 7, 6.)
    text(c, 'Turnover', BX2, BY2 - 18, 28, 700, DIM, da * seg(t, TURN2 - .4, TURN2), 'l')
    # the fixed share
    ga = da * seg(t, FIXED - .3, FIXED + .2)
    if ga > 0:
        x0 = BX2E - sw; dy = 170 * ease(cut)
        if cut > 0:
            p = paint(GOLD, .8 * ga * cut, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 6], (t * 20) % 14))
            c.drawRRect(rrect(x0 + 2, BY2 + 2, sw - 4, BH2 - 4, 10), p)
        c.drawRRect(rrect(x0, BY2 + dy, sw, BH2, 10), paint(GOLD, (.25 + .55 * cut) * ga))
        c.drawRRect(rrect(x0, BY2 + dy, sw, BH2, 10), paint(GOLD, ga, stroke=2.4))
        text(c, 'fixed share', x0 - 18, BY2 + BH2 + 40, 26, 700, GOLD, ga * (1 - cut), 'r')
        if cut > 0:
            text(c, 'Profit', x0 - 22, BY2 + dy + BH2 / 2 + 12, 36, 800, GOLD, ga * cut, 'r', shadow=6)
            c.drawLine(x0 + sw / 2, BY2 + BH2 + 4, x0 + sw / 2, BY2 + dy - 6, paint(GOLD, .5 * ga * cut, stroke=2))
    # skip the books
    ka = da * seg(t, SKIP - .7, SKIP - .2)
    if ka > 0:
        bx = 1030; by = 700 + 30 * (1 - seg(t, SKIP - .7, SKIP - .1, eout))
        book(c, bx, by, ka * (1 - .45 * seg(t, SKIP + .1, SKIP + .5)), 'Books of account', BLUE, .5)
        cross(c, bx + 44, by - 52, ka * seg(t, SKIP + .05, SKIP + .4, back), 24)
        text(c, 'skip the books', bx + 90, by + 10, 30, 800, RED, ka * seg(t, SKIP + .1, SKIP + .5), 'l', shadow=6)

# ---------------------------------------------------------------- x3: 8% of turnover, 6% of digital
BX0, BX1, BY3, BH3 = 120, 1300, 430, 86
CASHF = .44                                                  # illustrative cash share of the bar

def _rate_bar(c, t, a):
    if a <= 0: return
    ta = a * seg(t, PRES3 - .2, PRES3 + .3)
    text(c, 'Presumptive taxation', BX0, 318, 40, 800, WHITE, ta, 'l', shadow=8)
    sec(c, BX0 + text_w('Presumptive taxation', 40, 800) + 24, 304, '44AD', a * seg(t, SEC3 - .2, SEC3 + .3, back), size=30)
    W_ = BX1 - BX0
    sp = seg(t, SIX3 - .25, SIX3 + .45)                      # the bar splits into cash | digital
    gap = 14 * sp; xc = BX0 + W_ * CASHF
    segs = [(BX0, xc - gap / 2, ORANGE), (xc + gap / 2, BX1, BLUE)]
    parts = segs if sp > 0 else [(BX0, BX1, ACC)]
    base = shade(ACC, -.35)
    for k, (x0, x1, col) in enumerate(parts):
        cc = mixc(base, shade(col, -.15), sp)
        r0 = rrect(x0, BY3, x1 - x0, BH3, 14)
        c.drawRRect(rrect(x0, BY3 + 8, x1 - x0, BH3, 14), paint(BLACK, .4 * a, blur=12))
        c.drawRRect(r0, paint(cc, .92 * a))
        c.save(); c.clipRRect(r0, True)
        hx = x0 + ((t * 220 + 300 * k) % (x1 - x0 + 200)) - 100
        c.drawRect(skia.Rect(hx - 50, BY3, hx + 50, BY3 + BH3), paint(WHITE, .1 * a, blur=14))
        c.drawRect(skia.Rect(x0, BY3, x1, BY3 + BH3 * .4), paint(WHITE, .07 * a))
        c.restore()
        c.drawRRect(r0, paint(mixc(ACC, col, sp), .8 * a, stroke=2))
    so, sn = 1 - clamp(sp * 2), clamp(sp * 2 - 1)
    text(c, 'Total turnover', BX0 + 24, BY3 + BH3 / 2 + 11, 32, 800, WHITE, a * so, 'l')
    if sp > 0:
        text(c, 'Cash', BX0 + 24, BY3 + BH3 / 2 + 11, 32, 800, WHITE, a * sn, 'l')
        icon(c, 'cash', xc - 70, BY3 - 46, .7, ORANGE, a * sp)
        text(c, 'Bank / digital', xc + 28, BY3 + BH3 / 2 + 11, 32, 800, WHITE, a * sn, 'l')
        icon(c, 'bank', xc + 60, BY3 - 46, .7, BLUE, a * seg(t, BANKS3 - .3, BANKS3 + .2))
        icon(c, 'upi', xc + 130, BY3 - 46, .7, BLUE, a * seg(t, DIG3 - .3, DIG3 + .2))
        icon(c, 'card', xc + 200, BY3 - 46, .7, BLUE, a * seg(t, DIG3 - .1, DIG3 + .4))
    # profit slices: one 8% slice first, then 8% of cash + 6% of digital
    TY = 650
    u1 = seg(t, EIGHT3 - .2, EIGHT3 + .55)
    if u1 > 0 and sp < 1:
        sw = W_ * .08; x0 = BX1 - sw; y0 = lerp(BY3, TY, ease(u1)); aa = a * (1 - sp)
        c.drawRRect(rrect(x0, y0, sw, BH3, 10), paint(GOLD, (.3 + .5 * u1) * aa))
        c.drawRRect(rrect(x0, y0, sw, BH3, 10), paint(GOLD, aa, stroke=2.4))
        text(c, '8% of turnover', x0 - 22, y0 + BH3 / 2 + 12, 34, 800, GOLD, aa * u1, 'r', shadow=6)
        c.drawLine(x0 + sw / 2, BY3 + BH3 + 4, x0 + sw / 2, y0 - 6, paint(GOLD, .5 * aa * u1, stroke=2))
    if sp > 0:
        for k, (x0s, x1s, col) in enumerate(segs):
            r = .08 if k == 0 else .06
            sw = (x1s - x0s) * r; xs = x1s - sw
            uu = seg(t, SIX3 + .1 + .35 * k, SIX3 + .7 + .35 * k)
            y0 = lerp(BY3, TY, ease(uu))
            c.drawRRect(rrect(xs, y0, sw, BH3, 10), paint(GOLD, (.3 + .5 * uu) * a * sp))
            c.drawRRect(rrect(xs, y0, sw, BH3, 10), paint(GOLD, a * sp, stroke=2.4))
            c.drawLine(xs + sw / 2, BY3 + BH3 + 4, xs + sw / 2, y0 - 6, paint(GOLD, .5 * a * uu, stroke=2))
            text(c, ('8% of cash' if k == 0 else '6% of bank / digital'), xs - 22, y0 + BH3 / 2 + 12, 32, 800, GOLD,
                 a * uu, 'r', shadow=6)
    # the deemed-profit card on the right
    pa = a * seg(t, PROFIT3 - .3, PROFIT3 + .2)
    if pa > 0:
        x, y, w, h = 1400, 560, 420, 232
        _box(c, x, y, w, h, GOLD, pa, .82, win(t, EIGHT3 + .3, EIGHT3 + 1.6, .3, .6) * .7, 18)
        text(c, 'Deemed profit', x + 30, y + 48, 26, 800, DIM, pa, 'l', track=1)
        qa = pa * (1 - seg(t, EIGHT3 - .2, EIGHT3 + .1))
        if qa > 0: text(c, '? × turnover', x + 30, y + 112, 38, 800, DIM, qa * (.6 + .4 * math.sin(t * 5)), 'l')
        text(c, '8% × turnover', x + 30, y + 112, 38, 800, GOLD, pa * so * seg(t, EIGHT3 - .1, EIGHT3 + .2), 'l')
        text(c, '8% × cash', x + 30, y + 112, 38, 800, GOLD, pa * sn, 'l')
        la = pa * seg(t, SIX3 + .3, SIX3 + .8)
        text(c, '+ 6% × bank / digital', x + 30, y + 172, 34, 800, GOLD, la, 'l')
        if la > 0: c.drawLine(x + 30, y + 132, x + w - 30, y + 132, paint(GOLD, .25 * la, stroke=1.4))

# ---------------------------------------------------------------- x4: who can use it, and how big
TILES4 = [('person', 'Resident individual', RES4, True), ('house', 'HUF', HUF4, True),
          ('shop', 'Partnership firm', FIRM4, True), ('building', 'LLP', LLP4, False)]

def _elig(c, t, a):
    if a <= 0: return
    text(c, 'Who can use it?', 120, 318, 40, 800, WHITE, a * seg(t, X4 - .2, X4 + .4), 'l', shadow=8)
    for k, (ic, nm, tt, ok) in enumerate(TILES4):
        ta = a * seg(t, tt - .35, tt + .1)
        if ta <= 0: continue
        pop = seg(t, tt - .35, tt + .2, back)
        x = 120 + k * 280; y = 360 + 18 * (1 - pop)
        col = GREEN if ok else RED
        tile(c, x, y, 250, 168, ic, nm, ta, col if t > tt + .3 else ACC, ok if t > tt + .3 else None, 26,
             glow=win(t, tt + .2, tt + 1.4, .2, .6) * .7)
    na = a * seg(t, LLP4 + .2, LLP4 + .6)
    if na > 0: text(c, 'not an LLP', 120 + 3 * 280 + 125, 568, 28, 800, RED, na, 'c', shadow=6)
    # turnover dial
    ga = a * seg(t, TWO4 - .4, TWO4 + .2)
    if ga > 0:
        lim = lerp(2e7, 3e7, seg(t, FIVE4 - .2, FIVE4 + .7))
        val = 2.5e7 * seg(t, TWO4 - .2, TWO4 + 1.0, eout)
        gx, gy, gr = 1440, 760, 200
        gauge(c, gx, gy, gr, ga, val, 0, 4e7, ((0, '0'), (1e7, '₹1 cr'), (2e7, '₹2 cr'), (3e7, '₹3 cr'), (4e7, '₹4 cr')),
              '', lim, None, ((0, lim, GREEN),), ACC)
        ok3 = seg(t, FIVE4 + .3, FIVE4 + .8)
        text(c, 'Turnover limit', gx, gy + 48, 26, 700, DIM, ga, 'c')
        text(c, inr(2e7), gx, gy + 90, 36, 800, RED, ga * (1 - ok3), 'c')
        text(c, inr(3e7), gx, gy + 90, 36, 800, GREEN, ga * ok3, 'c', shadow=6)
        # the ₹3 crore ghost marker while it is only being spoken
        qa = ga * win(t, THREE4 - .2, FIVE4 + .3, .3, .3)
        if qa > 0:
            an = math.pi + math.pi * .75
            p = paint(GOLD, .9 * qa, stroke=4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
            c.drawLine(gx + math.cos(an) * gr * .78, gy + math.sin(an) * gr * .78, gx + math.cos(an) * gr * 1.22, gy + math.sin(an) * gr * 1.22, p)
    # the cash condition
    ma = a * seg(t, CASH4 - .4, CASH4 + .1)
    if ma > 0:
        meter(c, 120, 720, 760, ma, .04 * seg(t, CASH4 - .3, FIVE4, eout), .05, 'Cash receipts', 'within 5%', .15,
              26, '{:.0%}')
        fa = a * seg(t, FIVE4 + .1, FIVE4 + .6)
        if fa > 0:
            link(c, (900, 733), (1150, 733), GREEN, fa, seg(t, FIVE4 + .1, FIVE4 + .6), False, 3, 14)
            flowdots(c, np.array([(900, 733), (1150, 733)]), (t * .9) % 1, fa, GREEN, 5, 5.)
            text(c, 'unlocks ₹3 crore', 1025, 712, 24, 700, GREEN, fa, 'c')

# ---------------------------------------------------------------- x5: the 44AD gate
BELT, GX, GW, GH = 650, 1210, 290, 280
GMOUTH = GX - GW / 2 - 150                                   # item centre when it stops at the gate
SHELF = [(290, 380), (600, 380), (910, 380)]                 # rejected cards (bottom-centre)
AE_BOX = (1440, 250, 390, 200)

def _item_pos(t, k):
    """(cx, bottom y, alpha, state) of item k at t; state -1 while being rejected, +1 while passing."""
    t0, nm, ic, col, fate = ITEMS[k]
    if t < t0 - .25: return None
    ap = seg(t, t0 - .25, t0 + .1)
    tg = t0 + RIDE
    if t <= tg:
        u = seg(t, t0, tg, eout)
        return lerp(260, GMOUTH, u), BELT, ap, 0
    if fate == 'pass':
        u = seg(t, tg, tg + 1.3, linr)
        x = lerp(GMOUTH, 1760, u)
        return x, BELT, ap * (1 - seg(t, tg + .95, tg + 1.3)), 1
    u = seg(t, tg + .2, tg + .95, ease)
    if fate == '44AE':
        bx, by = AE_BOX[0] + AE_BOX[2] / 2, AE_BOX[1] + AE_BOX[3] - 18
    else:
        bx, by = SHELF[fate]
    x = lerp(GMOUTH - 30 * seg(t, tg, tg + .2), bx, u); y = lerp(BELT, by, u) - 170 * math.sin(math.pi * u)
    return x, y, ap, -1

def _gate(c, t, a):
    if a <= 0: return
    conveyor(c, 130, 1770, BELT, a, t, 80.)
    st = 0.
    for k, it in enumerate(ITEMS):
        tg = it[0] + RIDE
        g = win(t, tg - .1, tg + .9, .12, .4)
        st = st + (g if it[4] == 'pass' else -g)
    st = clamp(st, -1, 1)
    scanner_back(c, GX, BELT, a, '44AD', st, t, GH, GW)
    # shelves / boxes behind the flight paths
    sa = a * seg(t, PROF5 + .4, PROF5 + .9)
    if sa > 0:
        text(c, 'Not for 44AD', 140, 236, 30, 800, RED, sa, 'l', shadow=6)
        c.drawRRect(rrect(130, SHELF[0][1] + 6, 930, 10, 5), paint(RED, .35 * sa))
    aa = a * seg(t, GOODS5 + .2, GOODS5 + .7)
    if aa > 0:
        x, y, w, h = AE_BOX
        _box(c, x, y, w, h, VIO, aa, .8, win(t, GOODS5 + 1.0, OWN5 + 1.5, .3, .6) * .8, 18)
        sec(c, x + 22, y + 34, '44AE', aa, size=24)
        text(c, 'own scheme', x + w - 20, y + 42, 24, 700, VIO, aa * seg(t, OWN5 - .3, OWN5 + .2), 'r')
    lab(c, 'eligible →', 1640, BELT - 140, a * win(t, ITEMS[0][0] + RIDE, ITEMS[1][0] + RIDE, .3, .5), 28, GREEN, 800)
    # items: those still at / in the gate draw between back and front
    front = []
    for k, it in enumerate(ITEMS):
        p = _item_pos(t, k)
        if p is None: continue
        x, y, ia, s = p
        mk = seg(t, it[0] + RIDE + .1, it[0] + RIDE + .4) if it[4] != 'pass' else seg(t, it[0] + RIDE + .1, it[0] + RIDE + .4)
        args = (c, x, y, it[2], it[1], it[3], a * ia, mk if it[4] in (0, 1, 2) else None, .0)
        if s == -1 or x < GX - GW / 2 - 40: front.append(args)
        else: _icard(*args)
    scanner_front(c, GX, BELT, a, '44AD', st, t, GH, GW)
    for args in front: _icard(*args)

# ---------------------------------------------------------------- x6: Sunil's computation
SX6, SY6, SW6 = 800, 250, 1040
TITLE6 = "Sunil's grocery · sec 44AD"
ROWS6 = [{'label': 'Total turnover', 'amt': 29850000, 'kind': 'start', 't0': TWO6 - .35},
         {'label': 'cash received: ₹14,00,000 = 4.69% of turnover', 'kind': 'note', 't0': FOURT6 - .2},
         {'label': 'within 5%, so the ₹3 crore limit applies: eligible', 'kind': 'note', 't0': ELIG6 - .3, 'col': GREEN},
         {'label': 'Cash · 8% × ₹14,00,000', 'amt': None, 'kind': 'add', 't0': EIGHT6 - .15},
         {'label': 'Bank / digital · 6% × ₹2,84,50,000', 'amt': None, 'kind': 'add', 't0': SIX6 - .15},
         {'label': 'Income u/s 44AD', 'amt': 1819000, 'kind': 'total', 't0': EIGHTEEN6 - .5}]
MAN6 = {3: (112000, ONEL6 - .15), 4: (1707000, SEVT6 - .15)}
TB0, TB1, TBY = 120, 740, 336

def _sunil(c, t, a):
    if a <= 0: return
    person(c, 196, 838, .82, a * seg(t, X6 - .3, X6 + .3), 'sunil', t, look=.5, mood=.6 * seg(t, ELIG6, ELIG6 + .5))
    # turnover bar
    ba = a * seg(t, TWO6 - .4, TWO6 + .1)
    if ba > 0:
        text(c, 'Turnover', TB0, TBY - 20, 28, 700, DIM, ba, 'l')
        roll(c, 29850000, TB1, TBY - 18, seg(t, TWO6 - .2, TWO6 + .9, linr), 32, GOLD, ba)
        W_ = TB1 - TB0; cw = W_ * 14 / 298.5
        fill = seg(t, TWO6 - .3, TWO6 + .7)
        hc = win(t, EIGHT6 - .2, SIX6 - .3, .3, .4); hd = win(t, SIX6 - .2, EIGHTEEN6, .3, .4)
        c.drawRRect(rrect(TB0, TBY, W_, 62, 12), paint('#0b1226', .95 * ba))
        c.save(); c.clipRRect(rrect(TB0, TBY, W_, 62, 12), True)
        c.drawRect(skia.Rect(TB0 + cw + 3, TBY, TB0 + max(cw + 3, W_ * fill), TBY + 62), paint(shade(BLUE, -.25 + .3 * hd), ba))
        cs = seg(t, FOURT6 - .3, FOURT6 + .3)
        c.drawRect(skia.Rect(TB0, TBY, TB0 + cw * max(fill > 0, 0), TBY + 62), paint(mixc(shade(BLUE, -.25), ORANGE, cs), ba))
        c.restore()
        c.drawRRect(rrect(TB0, TBY, W_, 62, 12), paint(ACC, .5 * ba, stroke=1.6))
        if hc > 0: c.drawRRect(rrect(TB0 - 5, TBY - 5, cw + 10, 72, 10), paint(ORANGE, ba * hc, stroke=4, blur=2))
        if hd > 0: c.drawRRect(rrect(TB0 + cw - 2, TBY - 5, W_ - cw + 7, 72, 14), paint(BLUE, .9 * ba * hd, stroke=4, blur=2))
        la = ba * cs
        if la > 0:
            c.drawLine(TB0 + cw / 2, TBY + 66, TB0 + cw / 2, TBY + 92, paint(ORANGE, la, stroke=2.4))
            text(c, 'cash ₹14,00,000', TB0, TBY + 122, 28, 800, ORANGE, la, 'l')
            text(c, 'bank / digital', TB1, TBY + 122, 28, 800, BLUE, la, 'r')
    # cash-share meter
    ma = a * seg(t, UNDER6 - .5, UNDER6)
    if ma > 0:
        meter(c, TB0, 556, TB1 - TB0, ma, .0469 * seg(t, UNDER6 - .4, UNDER6 + .5, eout), .05, 'Cash share of turnover',
              '{:.2%}', .15, 26, '{:.0%}')
    ea = a * seg(t, ELIG6 - .2, ELIG6 + .3, back)
    if ea > 0:
        tick(c, 380, 678, ea, 22)
        text(c, 'eligible · limit ₹3 crore', 414, 688, 28, 800, GREEN, ea, 'l', shadow=6)
    # the sheet
    sa = a * seg(t, X6 - .2, X6 + .4)
    sheet(c, SX6, SY6, SW6, ROWS6, sa, t, TITLE6, GOLD, title_r='A.Y. 2026-27')
    for i, (val, tt) in MAN6.items():
        r = ROWS6[i]; ra = sa * seg(t, r['t0'], r['t0'] + .45, eout)
        if ra <= 0 or t < tt: continue
        cy = sheet_row_y(SX6, SY6, ROWS6, i, 0, TITLE6)
        roll(c, val, SX6 + SW6 - 30, cy + 33 * .36, seg(t, tt, tt + .8, linr), 33, WHITE, ra)
    # links from the bar to the rows being computed
    for i, hh, col, x0 in ((3, win(t, EIGHT6 - .1, EIGHT6 + 2.4, .3, .5), ORANGE, TB0 + 14), (4, win(t, SIX6 - .1, SIX6 + 2.4, .3, .5), BLUE, 600)):
        if hh <= 0: continue
        cy = sheet_row_y(SX6, SY6, ROWS6, i, 0, TITLE6)
        P = catmull([(x0, TBY + 64), (x0 + 120, TBY + 150), (SX6 - 120, cy + 20), (SX6 + 30, cy)], False, 8)
        flowdots(c, P, (t * .8) % 1, a * hh, col, 7, 5.5)

def _income_pill(c, t, a):
    """x7: Sunil's income lifted from the sheet's total row into a pill at the top."""
    if a <= 0: return
    u = seg(t, X7 - .4, X7 + .5)
    cy0 = sheet_row_y(SX6, SY6, ROWS6, 5, 0, TITLE6)
    x = lerp(SX6 + SW6 - 240, 960, u); y = lerp(cy0, 244, u)
    g = win(t, EVERY7 + 1.0, ALREADY7 + 1.2, .4, .6)
    _pill(c, x, y, "Sunil's income  " + rupee(1819000), GOLD, a, 34, .18, glow=.4 + .6 * g)

# ---------------------------------------------------------------- x7: already given · partners · advance tax
TILES7 = [('§ 30', 'Rent, rates, repairs', 'house'), ('§ 31', 'Machinery repairs', 'gear'),
          ('§ 32', 'Depreciation', 'chart'), ('§ 36', 'Staff costs, interest', 'person'),
          ('§ 37', 'Other expenses', 'doc')]
TW7, TH7, TX7, TY7 = 236, 144, 300, 330

def _given(c, t, a):
    if a <= 0: return
    giv = seg(t, ALREADY7 - .2, ALREADY7 + .4)
    for k, (sc_, nm, ic) in enumerate(TILES7):
        t0 = THIRTY7 - .6 + .22 * k
        ta = a * seg(t, t0, t0 + .35)
        if ta <= 0: continue
        x = TX7 + k * (TW7 + 28)
        rise = seg(t, t0 + .2, t0 + .9, eout) * (1 - seg(t, ALREADY7 - .3, ALREADY7 + .3))
        y = TY7 + 30 * (1 - seg(t, t0, t0 + .4, eout)) - 26 * rise
        hl = win(t, DEP7 - .2, DEP7 + 3.0, .3, .6) if k == 2 else 0
        col = mixc(mixc(ACC, '#64748b', giv), GOLD, hl)
        tile(c, x, y, TW7, TH7, ic, nm, ta * (1 - .3 * giv * (1 - hl)), col, True if giv > .5 else None, 24, glow=hl * .8)
        sec(c, x + 14, y + 26, sc_[2:], ta * (1 - .3 * giv), size=21)
        if rise > .05:
            flowdots(c, np.array([(x + TW7 / 2, y - 4), (x + TW7 / 2 + (960 - x - TW7 / 2) * .4, 282)]), (t * 1.2 + k * .2) % 1,
                     ta * rise, ACC, 4, 4.)
    ba = a * seg(t, THIRTY7 + .4, THIRTY7 + .9)
    by = TY7 + TH7 + 18
    _brace(c, TX7, TX7 + 5 * TW7 + 4 * 28, by, DIM, ba, True)
    text(c, 'sections 30 to 38', TX7 + 4, by + 38, 26, 700, DIM, ba, 'l', shadow=6)
    sa = a * seg(t, ALREADY7 - .1, ALREADY7 + .4)
    if sa > 0:
        stamp(c, 1400, by + 34, 'ALREADY GIVEN', GREEN, sa, seg(t, ALREADY7, ALREADY7 + .9, linr), -5, 34)
    da = a * seg(t, DEP7 - .1, DEP7 + .4, back) * (1 - seg(t, FIRM7 - .6, FIRM7 - .2))
    if da > 0:
        _pill(c, TX7 + 2 * (TW7 + 28) + TW7 / 2, by + 30, 'depreciation included', GOLD, da, 24)
    # a firm: partners' salary and interest bounce off
    fa = a * seg(t, FIRM7 - .4, FIRM7 + .1)
    if fa > 0:
        _box(c, 120, 600, 760, 220, ACC, fa, .82, 0, 18, .5)
        icon(c, 'shop', 176, 664, .7, ACC, fa)
        text(c, 'A partnership firm', 222, 676, 30, 800, WHITE, fa, 'l')
        text(c, 'on 44AD', 222, 712, 26, 700, DIM, fa, 'l')
        for k, (nm, tt) in enumerate((("Partners' salary", SAL7), ('Interest to partners', INT7))):
            ba_ = fa * seg(t, tt - .5, tt - .2)
            if ba_ <= 0: continue
            u = seg(t, tt - .3, tt + .25, ein); bk = seg(t, tt + .25, tt + .8, eout)
            bx = 594 + k * 190; byy = 742 - 70 * u + 70 * bk
            bill(c, bx, byy, ba_, nm, None, None, None, .7, -5 + 10 * k + 8 * bk, RED)
            cross(c, bx + 72, byy - 40, ba_ * seg(t, tt + .2, tt + .5, back), 19)
        na = fa * seg(t, INT7 + .4, INT7 + .9)
        if na > 0: text(c, 'no deduction', 160, 790, 28, 800, RED, na, 'l', shadow=6)
    # advance tax: one instalment, 15 March
    aa = a * seg(t, ADV7 - .4, ADV7 + .1)
    if aa > 0:
        _box(c, 960, 600, 840, 220, ACC, aa, .82, 0, 18, .5)
        text(c, 'Advance tax', 990, 648, 30, 800, WHITE, aa, 'l')
        one = seg(t, ONEGO7 - .2, ONEGO7 + .4)
        for k, mon in enumerate(('JUN', 'SEP', 'DEC')):
            ka = aa * seg(t, ADV7 + .1 * k, ADV7 + .3 + .1 * k) * (1 - .62 * one)
            calendar(c, 1060 + k * 130, 740, ka, 15, mon, None, .46, '#64748b')
            if one > 0:
                c.drawLine(1018 + k * 130, 700, 1102 + k * 130, 782, paint(RED, .8 * aa * one, stroke=3))
        ma = aa * seg(t, FIF7 - .5, FIF7 + .1, back)
        if ma > 0:
            c.drawCircle(1540, 728, 90, paint(GOLD, .16 * ma * (1 + .3 * math.sin(t * 3)), blur=30))
        calendar(c, 1540, 728, ma, 15, 'MAR', None, .62, RED)
        oa = aa * one
        if oa > 0:
            text(c, '100%', 1700, 726, 44, 800, GOLD, oa, 'c', shadow=6)
            text(c, 'one instalment', 1700, 766, 24, 700, GOLD, oa, 'c')
    _income_pill(c, t, a)

# ---------------------------------------------------------------- x8: the five-year lock
YX0, YX1, YY, YH, NY = 120, 1800, 350, 130, 9

def _lock(c, t, a):
    if a <= 0: return
    cen = yearstrip(c, YX0, YY, YX1 - YX0, NY, a, [f'Year {k + 1}' for k in range(NY)], None, ACC, YH,
                    None, {k: ' ' for k in range(NY)})
    bw = (YX1 - YX0 - (NY - 1) * 10) / NY
    def tint(i, col, al, txt=None, tcol=WHITE):
        if al <= 0: return
        x = YX0 + i * (bw + 10)
        c.drawRRect(rrect(x, YY, bw, YH, 12), paint(col, .3 * al))
        c.drawRRect(rrect(x + .5, YY + .5, bw - 1, YH - 1, 12), paint(col, al, stroke=2.4))
        if txt: text(c, txt, x + bw / 2, YY + YH - 30, 24, 800, tcol, al, 'c')
    on = seg(t, USES8 - .2, USES8 + .3)
    tint(0, GREEN, a * on, 'on 44AD', GREEN)
    if on > 0: tick(c, cen[0][0] + bw / 2 - 16, YY + 16, a * on, 15)
    tint(2, RED, a * seg(t, LESS8 - .2, LESS8 + .3), 'declares less', RED)
    na = a * seg(t, NEXT8 - .2, NEXT8 + .4)
    _brace(c, cen[1][0] - bw / 2, cen[5][0] + bw / 2, YY - 22, VIO, na, False, 'the next five years', 28)
    for k in range(5):
        i = 3 + k; tt = LOCK8 - .15 + .16 * k
        la = a * seg(t, tt, tt + .3, back)
        if la <= 0: continue
        x = YX0 + i * (bw + 10)
        c.drawRRect(rrect(x, YY, bw, YH, 12), paint('#0b1020', .4 * la))
        c.drawRRect(rrect(x + .5, YY + .5, bw - 1, YH - 1, 12), paint(RED, .7 * la, stroke=2))
        padlock(c, x + bw / 2, YY + 92 - 14 * (1 - seg(t, tt, tt + .3, eout)), 1.25, RED, la)
    fa = a * seg(t, FIVEY8 - .2, FIVEY8 + .3)
    _brace(c, cen[3][0] - bw / 2, cen[7][0] + bw / 2, YY + YH + 16, RED, fa, True, 'locked out of 44AD · 5 years', 28)
    tint(8, GREEN, a * seg(t, FIVEY8 + .3, FIVEY8 + .8) * .6, 'may return', GREEN)
    # books + audit while locked out
    ka = a * seg(t, BOOKS8 - .4, BOOKS8)
    if ka > 0:
        bx, by = 470, 700 - 20 * (1 - seg(t, BOOKS8 - .4, BOOKS8 + .1, eout))
        book(c, bx, by, ka, 'Books of account', BLUE, .52)
        text(c, 'keep books', bx + 110, by + 12, 32, 800, WHITE, ka, 'l', shadow=6)
    ua = a * seg(t, AUD8 - .2, AUD8)
    if ua > 0:
        stamp(c, 1000, 690, 'TAX AUDIT', ACC, ua, seg(t, AUD8 - .2, AUD8 + .7, linr), -8, 46)
        text(c, 'get an audit', 1000, 786, 30, 800, WHITE, ua * seg(t, AUD8 + .2, AUD8 + .6), 'c', shadow=6)
    ia = a * seg(t, ABOVE8 - .3, ABOVE8 + .2)
    if ia > 0:
        _box(c, 1260, 620, 540, 150, GOLD, ia, .8, win(t, ABOVE8, ABOVE8 + 2, .3, .6) * .6, 18)
        text(c, 'only if his income is above', 1530, 680, 28, 700, WHITE, ia, 'c')
        text(c, 'the basic exemption limit', 1530, 730, 32, 800, GOLD, ia, 'c')

# ---------------------------------------------------------------- x9: exam — calm
def _exam(c, t, a):
    if a <= 0: return
    W_ = 1600; x0 = 160; y0 = 360; h = 84
    xc = x0 + W_ * .42
    dg = seg(t, REC9 - .3, REC9 + .4)
    c.drawRRect(rrect(x0, y0 + 8, W_, h, 14), paint(BLACK, .4 * a, blur=12))
    c.drawRRect(rrect(x0, y0, W_, h, 14), paint(shade(ACC, -.4), .92 * a))
    c.save(); c.clipRRect(rrect(x0, y0, W_, h, 14), True)
    c.drawRect(skia.Rect(xc, y0, x0 + W_, y0 + h), paint(shade(BLUE, -.15), a * dg))
    hx = x0 + ((t * 160) % (W_ + 300)) - 150
    c.drawRect(skia.Rect(hx - 60, y0, hx + 60, y0 + h), paint(WHITE, .08 * a, blur=16))
    c.restore()
    c.drawRRect(rrect(x0, y0, W_, h, 14), paint(ACC, .6 * a, stroke=1.8))
    text(c, 'Total turnover / gross receipts', x0 + 26, y0 + h / 2 + 11, 32, 800, WHITE, a, 'l')
    da = a * seg(t, DEEM9 - .3, DEEM9 + .2)
    _pill(c, x0 + 230, y0 - 54, 'deemed profit', GOLD, da * (1 - seg(t, EIGHT9 - .3, EIGHT9 + .1)), 28)
    _pill(c, x0 + 270, y0 - 54, '8% of total turnover', GOLD, a * seg(t, EIGHT9 - .3, EIGHT9 + .2), 28)
    sa = a * seg(t, SIX9 - .3, SIX9 + .2, back)
    if sa > 0: _pill(c, (xc + x0 + W_) / 2, y0 - 54, '6% on this part', BLUE, sa, 28, .22)
    ca_ = a * seg(t, EIGHT9 - .2, EIGHT9 + .3)
    if ca_ > 0:
        tile(c, 300, 560, 290, 170, 'cash', 'Cash and other modes', ca_, ORANGE, None, 24)
        flowdots(c, np.array([(445, 554), (445, y0 + h + 10)]), ((t - EIGHT9) * .7) % 1, ca_ * .8, ORANGE, 5, 5.)
    modes = [('cheque', 'A/c payee cheque', CHQ9 - .6), ('draft', 'Bank draft', DRAFT9), (_emodes, 'Prescribed electronic modes', ELEC9)]
    for k, (ic, nm, tt) in enumerate(modes):
        ma = a * seg(t, tt - .3, tt + .1)
        if ma <= 0: continue
        x = 820 + k * 330; y = 560
        tile(c, x, y, 290, 170, ic, nm, ma, BLUE, None, 24, glow=win(t, tt - .1, tt + 1.2, .2, .6) * .6)
        P = np.array([(x + 145, y - 6), (x + 145, y0 + h + 10)])
        flowdots(c, P, ((t - tt) * .7) % 1, ma * .8, BLUE, 5, 5.)

def _emodes(c, cx, cy, s):
    for k, ic in enumerate(('upi', 'card', 'transfer')):
        icon(c, ic, cx + (k - 1) * 70 * s, cy, s * .8, shade(BLUE, .2), 1)

# ---------------------------------------------------------------- x10: check — below the card
def _check(c, t, a):
    if a <= 0: return
    ma = a * seg(t, X10 - .2, X10 + .4)
    person(c, 470, 850, .48, ma, 'meera', t, look=.4)
    ta = a * seg(t, TWOPT10 - .3, TWOPT10 + .2)
    if ta > 0:
        text(c, 'turnover', 640, 764, 24, 700, DIM, ta, 'l')
        text(c, inr(2.4e7), 640, 806, 36, 800, GOLD, ta, 'l', shadow=6)
    ca = a * seg(t, TWELVE10 - .3, TWELVE10 + .1)
    if ca > 0:
        meter(c, 900, 782, 480, ca, .12 * seg(t, TWELVE10 - .2, TWELVE10 + .7, eout), .05, 'Cash receipts', '{:.0%}', .15, 24)
        pu = .5 + .5 * math.sin(t * 2.6)
        c.drawRRect(rrect(900 + 480 / 3 - 4, 778, 480 * .8 - 480 / 3 + 8, 32, 16), paint(RED, .5 * ca * pu * seg(t, TWELVE10 + .6, TWELVE10 + 1), stroke=3, blur=3))
    xa = a * seg(t, A_NO - .1, A_NO + .3, back)
    if xa > 0:
        w_ = sec(c, 1470, 792, '44AD', xa, size=30)
        cross(c, 1470 + w_ + 34, 792, xa, 24)

# ---------------------------------------------------------------- the chapter
def ch_x(c, t):
    g1 = seg(t, CS - .3, X1 + .2) * (1 - seg(t, X3 - .6, X3 - .1))
    _shop_scene(c, t, g1)
    _rate_bar(c, t, seg(t, X3 - .5, X3 + .2) * (1 - seg(t, X4 - .5, X4 - .05)))
    _elig(c, t, seg(t, X4 - .45, X4 + .2) * (1 - seg(t, X5 - .5, X5 - .05)))
    _gate(c, t, seg(t, X5 - .7, X5 - .1) * (1 - seg(t, X6 - .5, X6 - .05)))
    _sunil(c, t, seg(t, X6 - .45, X6 + .2) * (1 - seg(t, X7 - .3, X7 + .3)))
    _given(c, t, seg(t, X7 - .5, X7 - .2) * (1 - seg(t, X8 - .5, X8 - .05)))
    _lock(c, t, seg(t, X8 - .45, X8 + .2) * (1 - seg(t, X9 - .5, X9 - .05)))
    _exam(c, t, seg(t, X9 - .45, X9 + .2) * (1 - seg(t, X10 - .5, X10 - .1)))
    _check(c, t, seg(t, X10 - .3, X10 + .2))
