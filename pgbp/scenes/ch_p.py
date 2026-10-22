"""Chapter P — The people costs (section 36).
p1 hook: Meera with her twelve employees (busts pop in on "twelve", a counter rolls to 12); salary coins arc out to
   them on "costs"; a desk calendar keeps flipping with a "?" on "when".
p2 the § 36(1) cabinet slides in on the left ("a list of specific deductions"); the team glows on "people", a coin
   stack on "money"; as each is named, an icon flies from the team into its drawer: insurance · bonus / commission ·
   interest · staff funds · bad debts (a sixth drawer, STT, joins in p9). The drawer being discussed later slides out
   and glows gold.
p3 three panels: stock under a shield (insurance on stock, ✓ 36(1)(i)); staff health insurance — premium in cash ✕,
   by cheque / UPI / card ✓ (36(1)(ib)); a bonus / commission slip ✓ (36(1)(ii)) — but ✕ if it replaces a profit
   share (a profit pie).
p4 interest: a bank lends; a P.Y. 2025-26 bar rains interest coins into a green "deductible 36(1)(iii)" trough; on
   "new asset" the oven appears at 1 Jun and the coins before its first use fall into the oven ("added to its cost").
p5 (EXAMPLE) NPS: employer's contribution ≤ 14% of salary, salary = basic + DA; sheet ₹10,00,000 + ₹4,00,000 =
   ₹14,00,000 → limit ₹1,96,000; an NPS jar fills exactly to its rim (the limit).
p6 she paid ₹2,00,000: notes keep pouring, the jar overflows, ₹4,000 spills into a red "disallowed" beaker
   (sheet rows: paid ₹2,00,000 · excess ₹4,000 [40A(9)]).
p7 trap: a May salary slip; the employee's own PF share is cut out as a token that must reach the PF fund by the due
   date under the PF law — 15 June (calendar); on time → deductible ✓, a late token turns red → "never deductible".
p8 bad debts on three years: earlier year (credit sale counted as income) · this year (debtor written off — stamp —
   deduct 36(1)(vii)) · later year (money recovered → income again 41(4)).
p9 a share trader (Rohan) with a contract note; the STT line slides into "deduct 36(1)(xv)" — if trading profit is
   business income.
p10 check: the card only asks "Allowed?", so the scene carries the facts: above it "May salaries · employees' PF
   ₹15,000"; below it a 30 JUN (deposited) calendar; with the answer the 15 JUN due-date calendar pops, a red
   "too late" arrow and a crossed "43B grace" chip.
"""
from scenes.common import *
import props as PR

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

PS, PE = B.span('p')
P1, P2, P3, P4, P5, P6, P7, P8, P9, P10 = (T('p%d' % i) for i in range(1, 11))
P10A = TA('p10')

def _wa(cue, n, fb, occ=0):
    """Word time in an answer cue (W() would fall back to a beat start that doesn't exist for 'p10a')."""
    try: return Wd(cue, n, occ)
    except Exception: return fb

# ---------------------------------------------------------------- word times
TWELVE1, COSTS1, DEDUCT1, WHEN1 = W('p1', 'twelve'), W('p1', 'costs'), W('p1', 'deduct'), W('p1', 'when')
LIST2, SPEC2, PEOPLE2, MONEY2 = W('p2', 'list'), W('p2', 'specific'), W('p2', 'people'), W('p2', 'money')
INS2, BON2, INT2, STAFF2, BAD2 = (W('p2', 'insurance'), W('p2', 'bonus'), W('p2', 'interest'), W('p2', 'staff'),
                                  W('p2', 'bad'))
STOCK3, ALL3, HEALTH3, PREM3, CASH3 = (W('p3', 'stock'), W('p3', 'allowed'), W('p3', 'health'), W('p3', 'premium'),
                                       W('p3', 'cash'))
BONUS3, ALL3B, UNLESS3, PROFIT3 = W('p3', 'bonus'), W('p3', 'allowed', occ=1), W('p3', 'unless'), W('p3', 'profit')
BORR4, ALL4, NEW4, BEFORE4, GOES4, COST4, SAW4 = (W('p4', 'borrowed'), W('p4', 'allowed'), W('p4', 'new'),
                                                  W('p4', 'before'), W('p4', 'goes'), W('p4', 'cost'), W('p4', 'saw'))
CONTR5, NPS5, FOURTEEN5, BASIC5, DEAR5 = (W('p5', 'contribution'), W('p5', 'NPS'), W('p5', 'fourteen'),
                                          W('p5', 'basic'), W('p5', 'dearness'))
TEN5, FOUR5, LIMIT5, ONE5 = W('p5', 'ten'), W('p5', 'four'), W('p5', 'limit'), W('p5', 'one')
PAID6, TWO6, FOUR6, DIS6 = W('p6', 'paid'), W('p6', 'two'), W('p6', 'four'), W('p6', 'disallowed')
PF7, CUT7, REACH7, FUND7, DUE7, LAW7 = (W('p7', 'PF'), W('p7', 'cut'), W('p7', 'reach'), W('p7', 'fund'),
                                        W('p7', 'due'), W('p7', 'law'))
FIFT7, LATE7, NEVER7 = W('p7', 'fifteenth'), W('p7', 'late'), W('p7', 'never')
BAD8, WRIT8, BOOKS8, COUNT8, LATER8, INC8B, SEC8 = (W('p8', 'bad'), W('p8', 'written'), W('p8', 'books'),
                                                    W('p8', 'counted'), W('p8', 'later'), W('p8', 'income', occ=1),
                                                    W('p8', 'section'))
SHARE9, DEDUCT9, SEC9, TAX9, BUS9 = (W('p9', 'share'), W('p9', 'deduct'), W('p9', 'securities'), W('p9', 'tax'),
                                     W('p9', 'business'))
FIFT10, MAY10, THIRTY10 = W('p10', 'fifteen'), W('p10', 'May'), W('p10', 'thirty')
A_NO = _wa('p10a', 'no', P10A); A_FIFT = _wa('p10a', 'fifteen', P10A + 1.2); A_SEC = _wa('p10a', 'section', P10A + 2.9)

# ---------------------------------------------------------------- SFX (≤ 25)
for tt, k in ((TWELVE1 - .2, 'pop'), (COSTS1, 'blip'), (WHEN1, 'flip'),
              (P2 - .1, 'whoosh'), (INS2 + .45, 'tap'), (INT2 + .45, 'tap'), (BAD2 + .45, 'tap'),
              (ALL3, 'ok'), (CASH3, 'error'), (ALL3B, 'ok'), (PROFIT3, 'error'),
              (ALL4, 'ok'), (COST4, 'chime_lo'),
              (ONE5 + .2, 'tick'), (ONE5 + 1.4, 'chime'), (FOUR6, 'error'),
              (CUT7, 'snip'), (FIFT7, 'flip'), (NEVER7, 'error'),
              (WRIT8 + .25, 'thunk'), (INC8B, 'chime_lo'),
              (TAX9 + .3, 'ok'), (THIRTY10, 'flip'), (A_NO, 'error')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=-.8, glow=0., r=18, sw=2.):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .38 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shader=lgrad((0, y), (0, y + h), [shade(col, fill), '#0a0f1f']), a=a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=7, blur=9))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, .85 * a, stroke=sw))

def _arc(p0, p1, lift, u):
    return lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) - lift * math.sin(math.pi * u)

def _paper(c, x, y, w, h, a, title, sub=None, key=None):
    """Cream paper card, top-left (x, y), title band in serif; static part cached."""
    if a <= 0: return
    def fn(cv):
        cv.drawRRect(rrect(4, 12, w, h, 10), paint(BLACK, .45, blur=16))
        cv.drawRRect(rrect(0, 0, w, h, 10), paint(shader=lgrad((0, 0), (0, h), ['#fbf7ec', '#efe6d1'])))
        cv.drawRRect(rrect(0, 0, w, 58, 10), paint('#e6dcc4'))
        cv.drawRect(skia.Rect.MakeXYWH(0, 48, w, 10), paint('#e6dcc4'))
        cv.drawLine(0, 58, w, 58, paint('#c9bb98', stroke=1.4, cap=False))
        ftext(cv, title, 22, 39, 26, SERIF, INK, 1, 'l', 700)
        if sub: itext(cv, sub, w - 20, 39, 20, '#6b6455', 1, 'r', 500, SERIF)
        cv.drawRRect(rrect(.5, .5, w - 1, h - 1, 10), paint('#cdbf9f', stroke=1.2))
    pic = PR._pic(('p_paper', key or title, w, h, sub), fn, (-20, -20, w + 44, h + 50))
    PR._play(c, pic, x, y, 1, a)

# ---------------------------------------------------------------- the § 36(1) cabinet
CX, CY, CW = 84, 258, 480
HEAD, DRH, DRG = 72, 72, 9
DR = [('Insurance', 'shield', '(i) (ib)'), ('Bonus · commission', 'gift', '(ii)'), ('Interest', 'percent', '(iii)'),
      ('Staff funds', 'piggy', '(iv) (iva) (va)'), ('Bad debts', 'doc', '(vii)'), ('STT · share traders', 'chart', '(xv)')]
FILL = [INS2, BON2, INT2, STAFF2, BAD2, SHARE9 - .4]
ACT = [(P3 - .3, BONUS3 - .1), (BONUS3 - .1, P4 - .5), (P4 - .5, P5 - .5), (P5 - .5, P8 - .5), (P8 - .5, P9 - .4),
       (SHARE9 - .1, P10 - .3)]
def _dry(i): return CY + HEAD + i * (DRH + DRG)
def _dr_act(i, t):
    a0, a1 = ACT[i]; return win(t, a0, a1, .45, .45)

def _cabinet(c, t):
    a = seg(t, P2 - .35, P2 + .45) * (1 - seg(t, P10 - .6, P10 - .1))
    if a <= 0: return
    sl = 1 - seg(t, P2 - .35, P2 + .55, eout)
    c.save(); c.translate(-560 * sl, 0)
    n6 = seg(t, SHARE9 - .6, SHARE9 + .1)
    h = HEAD + (5 + n6) * (DRH + DRG) + 8
    c.drawRRect(rrect(CX, CY + 10, CW, h, 22), paint(BLACK, .4 * a, blur=18))
    c.drawRRect(rrect(CX, CY, CW, h, 22), paint(shader=lgrad((0, CY), (0, CY + h), ['#1b2440', '#0b1124']), a=a))
    c.drawRRect(rrect(CX + .5, CY + .5, CW - 1, h - 1, 22), paint('#5d6c92', .7 * a, stroke=1.4))
    text(c, 'SECTION 36(1)', CX + 26, CY + 34, 20, 800, VIO, a, track=3)
    sa = a * seg(t, SPEC2 - .2, SPEC2 + .4)
    text(c, 'specific deductions', CX + 26, CY + 62, 24, 600, DIM, sa)
    for i in range(6):
        if i == 5 and n6 <= 0: continue
        _drawer(c, i, t, a * (n6 if i == 5 else seg(t, P2 + .1 + .08 * i, P2 + .5 + .08 * i)))
    c.restore()

def _drawer(c, i, t, a):
    if a <= 0: return
    lab_, ic, cl = DR[i]
    y = _dry(i); act = _dr_act(i, t); fl = seg(t, FILL[i] + .35, FILL[i] + .7)
    fla = win(t, FILL[i] + .4, FILL[i] + 1.5, .15, .7)
    x = CX + 14 + 20 * act; w = CW - 28
    col = mixc('#3d4a6a', GOLD, max(act, .7 * fla))
    c.drawRRect(rrect(x, y, w, DRH, 14), paint(shader=lgrad((0, y), (0, y + DRH), ['#222c4a', '#121a30']), a=a))
    if act > 0 or fla > 0:
        c.drawRRect(rrect(x, y, w, DRH, 14), paint(GOLD, .08 * a * max(act, fla)))
        c.drawRRect(rrect(x - 3, y - 3, w + 6, DRH + 6, 16), paint(GOLD, .45 * a * max(act, fla * .7), stroke=6, blur=8))
    c.drawRRect(rrect(x, y, w, DRH, 14), paint(col, .9 * a, stroke=1.8))
    if fl <= 0:
        p = paint(DIM, .25 * a, stroke=1.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 7], 0))
        c.drawRRect(rrect(x + 64, y + 22, w - 90, DRH - 44, 8), p)
        return
    icon(c, ic, x + 38, y + DRH / 2, .58, mixc(ACC, GOLD, act), a * fl)
    text(c, lab_, x + 74, y + DRH / 2 + 10, 27, 700, WHITE, a * fl)
    sec(c, x + w - 16, y + DRH / 2, cl, a * fl, VIO, 22, 'r')

def _dr_target(i):
    return CX + 14 + 38, _dry(i) + DRH / 2

# ---------------------------------------------------------------- p1 / p2: Meera and her twelve employees
TEAM = [(-230, 640, .6, 'staff', None), (230, 640, .6, 'staff', '#0f766e'), (-350, 640, .6, 'staff', '#b45309'),
        (350, 640, .6, 'staff', None), (-470, 640, .6, 'staff', '#0f766e'), (470, 640, .6, 'staff', '#b45309'),
        (-260, 790, .68, 'staff', None), (260, 790, .68, 'staff', None), (-410, 790, .68, 'staff', '#b45309'),
        (410, 790, .68, 'staff', '#0f766e'), (-560, 790, .68, 'staff', None), (560, 790, .68, 'staff', '#b45309')]
TPOP = [TWELVE1 - .35 + .085 * k for k in range(12)]

def _team_xf(t):
    u = seg(t, P2 - .25, P2 + .9)
    return lerp(960, 1230, u), lerp(0, 250, u), lerp(1., .62, u)

def _team(c, t):
    a = seg(t, PS, PS + .6) * (1 - seg(t, P3 - .6, P3 - .1))
    if a <= 0: return
    cx, cy, k = _team_xf(t)
    gl = win(t, PEOPLE2 - .2, MONEY2 + 1.2, .3, .6)
    c.save(); c.translate(cx, cy); c.scale(k, k)
    if gl > 0: c.drawOval(skia.Rect(-680, 700, 680, 860), paint(ACC, .16 * gl * a, blur=30))
    order = sorted(range(12), key=lambda j: TEAM[j][1])
    for j in order:
        dx, by, s, who, col = TEAM[j]
        u = seg(t, TPOP[j], TPOP[j] + .35, back)
        if u <= 0: continue
        sa = a * seg(t, TPOP[j], TPOP[j] + .2)
        person(c, dx, by + 18 * (1 - u), s * (.85 + .15 * u), sa, who, t + j * .7, look=-.25 * (1 if dx > 0 else -1),
               mood=.35, col=col)
    person(c, 0, 800, 1.15, a, 'meera', t, talk=0., mood=.6)
    # salary coins on "costs"
    for j in range(12):
        t0 = COSTS1 - .1 + .07 * j; u = seg(t, t0, t0 + .65, linr)
        if 0 < u < 1:
            dx, by, s, _, _ = TEAM[j]
            x, y = _arc((0, 720), (dx, by - 150 * s), 120, ease(u))
            coin(c, x, y, 14, a * (1 - seg(u, .8, 1)), GOLD, '₹', spin=u * 5, shadow=False)
    c.restore()
    # counter "12 employees"
    ca = a * seg(t, TWELVE1 - .3, TWELVE1 + .2) * (1 - seg(t, P2 - .3, P2 + .2))
    if ca > 0:
        nn = int(round(12 * seg(t, TWELVE1 - .35, TPOP[-1] + .3, linr)))
        w = text_w('%d employees' % 12, 40, 800) + 60
        c.drawRRect(rrect(960 - w / 2, 270, w, 64, 32), paint(GOLD, .14 * ca))
        c.drawRRect(rrect(960 - w / 2, 270, w, 64, 32), paint(GOLD, .9 * ca, stroke=2))
        text(c, '%d employees' % nn, 960, 316, 40, 800, WHITE, ca, 'c')
    # "and when?" — a flipping calendar
    wa = a * seg(t, WHEN1 - .3, WHEN1 + .2, back) * (1 - seg(t, P2 - .2, P2 + .3))
    if wa > 0:
        ph = max(0., t - WHEN1) * 1.5
        d = 10 + int(ph) % 18
        calendar(c, 1640, 470, wa, d, 'MAR', None, .62, RED, ph % 1, next=(d + 1, 'MAR'))
        text(c, '?', 1730, 400, 64, 800, GOLD, wa * (.6 + .4 * math.sin(t * 5)), 'c', shadow=6)
    da = a * win(t, DEDUCT1 - .2, P2, .3, .4)
    if da > 0:
        text(c, '?', 280, 470, 64, 800, GOLD, da * (.6 + .4 * math.sin(t * 5 + 1)), 'c', shadow=6)
        icon(c, 'calc', 280, 560, 1.2, DIM, da * .8)
    # p2: people and money
    ma = seg(t, MONEY2 - .2, MONEY2 + .3, back) * a * (1 - seg(t, INS2 - .4, INS2))
    if ma > 0:
        for k in range(4):
            coin(c, 1720 + 6 * (k % 2), 720 - 22 * k, 26, ma, GOLD, '₹')
        notes(c, 1660, 700, ma, 3, .55, -8)
    # icons fly into their drawers
    for i in range(5):
        u = seg(t, FILL[i] - .05, FILL[i] + .5, ease)
        if u <= 0 or u >= 1: continue
        x0, y0 = 1230 + (i - 2) * 110, 520
        tx, ty = _dr_target(i)
        x, y = _arc((x0, y0), (tx, ty), 160, u)
        c.drawCircle(x, y, 40, paint(GOLD, .22 * (1 - u), blur=14))
        icon(c, DR[i][1], x, y, .9 - .35 * u, GOLD, 1 - .2 * u)

# ---------------------------------------------------------------- p3: three panels
PX, PW, PY, PH = [640, 1035, 1430], 370, 282, 520

def _ptitle(c, x, y, title, cl, a, col=ACC):
    text(c, title, x + 24, y + 50, 28, 800, WHITE, a)
    sec(c, x + 24, y + 92, cl, a, VIO, 22)

def _pie(c, x, y, r, a, wedge=.28):
    if a <= 0: return
    c.drawCircle(x, y, r, paint('#1e293b', a)); c.drawCircle(x, y, r, paint(DIM, .6 * a, stroke=2))
    p = skia.Path(); p.moveTo(x, y); p.arcTo(skia.Rect(x - r, y - r, x + r, y + r), -90, 360 * wedge, False); p.close()
    c.drawPath(p, paint(GOLD, .9 * a))

def _panels(c, t):
    A = seg(t, P3 - .4, P3 + .2) * (1 - seg(t, P4 - .6, P4 - .1))
    if A <= 0: return
    # A · stock insurance
    x = PX[0]; a = A * seg(t, P3 - .3, P3 + .2)
    _box(c, x, PY, PW, PH, ACC, a, -.82, glow=.6 * win(t, ALL3 - .2, ALL3 + 1.2, .2, .6))
    _ptitle(c, x, PY, 'Insurance on stock', '36(1)(i)', a)
    boxes(c, x + PW / 2, 690, 1.25, a * seg(t, STOCK3 - .4, STOCK3))
    u = seg(t, STOCK3 - .2, STOCK3 + .5, eout)
    if u > 0:
        sy = lerp(400, 470, u)
        c.drawCircle(x + PW / 2, sy, 70, paint(GREEN, .12 * a * u, blur=20))
        icon(c, 'shield', x + PW / 2, sy, 1.9, GREEN, a * u, 3.4)
    ok = seg(t, ALL3 - .1, ALL3 + .35, back)
    if ok > 0:
        tick(c, x + 130, 760, a * ok, 20); text(c, 'allowed', x + 162, 770, 30, 800, GREEN, a * seg(t, ALL3, ALL3 + .3))
    # B · staff health insurance
    x = PX[1]; a = A * seg(t, HEALTH3 - .4, HEALTH3 + .1)
    if a > 0:
        _box(c, x, PY, PW, PH, ACC, a, -.82, glow=.6 * win(t, CASH3 + .2, CASH3 + 1.6, .2, .6))
        _ptitle(c, x, PY, 'Staff health insurance', '36(1)(ib)', a)
        person(c, x + 160, 600, .78, a, 'staff', t, look=.3, mood=.4)
        hu = seg(t, HEALTH3, HEALTH3 + .45, back)
        if hu > 0:
            c.drawCircle(x + 280, 455, 40 * hu, paint(PINK, .18 * a, blur=10))
            icon(c, 'heart', x + 280, 455, .95 * hu, PINK, a, 3.6)
        pa = a * seg(t, PREM3 - .3, PREM3 + .2)
        if pa > 0:
            text(c, 'premium paid by', x + 24, 650, 24, 600, DIM, pa)
            notes(c, x + 88, 710, pa, 2, .42, -6)
            xa = seg(t, CASH3 - .1, CASH3 + .3, back)
            cross(c, x + 88, 712, pa * xa, 22)
            for k, ic in enumerate(('cheque', 'upi', 'card')):
                icon(c, ic, x + 196 + 52 * k, 710, .62, GREEN if t > CASH3 + .3 else DIM, pa)
            text(c, 'cash', x + 88, 776, 24, 700, RED if t > CASH3 else DIM, pa, 'c')
            ga = pa * seg(t, CASH3 + .25, CASH3 + .6)
            if ga > 0:
                tick(c, x + 336, 678, ga, 16)
                text(c, 'not cash', x + 248, 776, 24, 700, GREEN, ga, 'c')
    # C · bonus / commission
    x = PX[2]; a = A * seg(t, BONUS3 - .4, BONUS3 + .1)
    if a > 0:
        _box(c, x, PY, PW, PH, ACC, a, -.82, glow=.6 * win(t, ALL3B - .2, ALL3B + 1.2, .2, .6))
        _ptitle(c, x, PY, 'Bonus · commission', '36(1)(ii)', a)
        bu = seg(t, BONUS3 - .3, BONUS3 + .3, eout)
        sy = 410 + 20 * (1 - bu)
        _paper(c, x + 26, sy, PW - 52, 168, a * bu, 'Paid to staff', None, key='p_bonus')
        for k, s_ in enumerate(('Bonus', 'Sales commission')):
            text(c, s_, x + 48, sy + 104 + 40 * k, 25, 700, INK, a * bu)
            c.drawRRect(rrect(x + PW - 130, sy + 92 + 40 * k, 70, 13, 6), paint(INK, .22 * a * bu))
        ok = seg(t, ALL3B - .1, ALL3B + .35, back)
        if ok > 0:
            tick(c, x + PW - 44, sy + 30, a * ok, 20)
        pa = a * seg(t, UNLESS3 - .2, UNLESS3 + .3)
        if pa > 0:
            _pie(c, x + 78, 660, 42, pa)
            text(c, 'profit share', x + 78, 730, 22, 700, GOLD, pa, 'c')
            u = seg(t, UNLESS3, UNLESS3 + .6)
            link(c, (x + 130, 650), (x + 290, 610), GOLD, pa, u, True, 3, 14)
            text(c, 'paid instead of it?', x + 216, 676, 22, 600, DIM, pa * u, 'c')
            xa = seg(t, PROFIT3 - .1, PROFIT3 + .3, back)
            if xa > 0:
                cross(c, x + 236, 618, pa * xa, 22)
                text(c, 'then not allowed', x + 216, 780, 26, 800, RED, pa * xa, 'c')

# ---------------------------------------------------------------- p4: interest, and the oven's cost
YX, YY, YW = 700, 452, 1080
XJ = yearbar_x(YX, YW, (2025, 6, 1))
OVX = (YX + XJ) / 2
SLOTS = [yearbar_x(YX, YW, (2025, 4, 1)) + 15 + 43 * i for i in range(25)]

def _interest(c, t):
    a = seg(t, P4 - .4, P4 + .2) * (1 - seg(t, P5 - .6, P5 - .1))
    if a <= 0: return
    nu = seg(t, NEW4 - .2, NEW4 + .6)
    # the bank and the loan
    ba = a * seg(t, P4 - .2, BORR4)
    _box(c, 640, 284, 250, 78, ACC, ba, -.8, r=14)
    icon(c, 'bank', 684, 323, .62, ACC, ba)
    text(c, 'loan for the', 724, 316, 22, 600, DIM, ba); text(c, 'business', 724, 344, 24, 800, WHITE, ba)
    lu = seg(t, BORR4, BORR4 + .7)
    if lu > 0: link(c, (890, 323), (1010, 323), GOLD, ba, lu, False, 3, 14)
    if lu > 0: text(c, 'interest', 1030, 332, 26, 800, GOLD, ba * lu)
    marks = [((2025, 6, 1), '1 Jun · oven first used', GOLD, a * nu)]
    spans = [((2025, 4, 1), (2025, 5, 31), None, GOLD, a * seg(t, BEFORE4 - .2, BEFORE4 + .4))]
    yearbar(c, YX, YY, YW, a, t, marks=marks, spans=spans, h=52, flag_h=40)
    # trough
    x_lo = lerp(YX, XJ + 6, nu)
    ta = a * seg(t, P4, P4 + .5)
    tg = win(t, ALL4 - .1, ALL4 + 1.4, .2, .6)
    c.drawRRect(rrect(x_lo, 690, YX + YW - x_lo, 60, 14), paint(GREEN, (.12 + .1 * tg) * ta))
    c.drawRRect(rrect(x_lo, 690, YX + YW - x_lo, 60, 14), paint(GREEN, .85 * ta, stroke=2))
    la = ta * seg(t, ALL4 - .2, ALL4 + .3)
    text(c, 'interest · deductible', x_lo + 30, 730, 26, 800, GREEN, la)
    sec(c, YX + YW - 20, 720, '36(1)(iii)', la, VIO, 22, 'r')
    if la > 0: tick(c, x_lo + (YX + YW - x_lo) / 2 + 150, 720, la * seg(t, ALL4, ALL4 + .3, back), 16)
    # the oven before first use
    oa = a * seg(t, NEW4 - .1, NEW4 + .4, back)
    if oa > 0:
        og = win(t, GOES4 - .2, COST4 + 1.2, .3, .6)
        if og > 0: c.drawCircle(OVX, 700, 90, paint(GOLD, .22 * og * oa, blur=24))
        oven(c, OVX, 778, .44, oa, t, 1.)
        text(c, 'added to its cost', OVX + 10, 812, 24, 800, GOLD, oa * seg(t, COST4 - .3, COST4 + .2), 'c')
    # interest coins raining from the bar
    ca = a * seg(t, ALL4 - 1.2, ALL4 - .4)
    if ca > 0:
        for i, sx in enumerate(SLOTS):
            ph = ((t - P4) / 1.5 + hsh(i, 4)) % 1
            pre = sx < XJ and t > NEW4 + .2
            y0 = YY + 64
            if pre: x, y = lerp(sx, OVX, ein(ph) * .8), lerp(y0, 650, ein(ph))
            else: x, y = sx, lerp(y0, 700, ein(ph))
            fa = ca * seg(ph, 0, .12) * (1 - seg(ph, .82, 1))
            coin(c, x, y, 11, fa, GOLD, '', spin=ph * 4, shadow=False)
    sa = a * seg(t, SAW4 - .3, SAW4 + .2)
    if sa > 0: chip(c, 1620, 812, 'as in actual cost', ACC, sa, 22)

# ---------------------------------------------------------------- p5 / p6: NPS limit and the overflow
NPS_ROWS = [dict(label='Basic salary', amt=1000000, kind='start', t0=TEN5 - .15),
            dict(label='Dearness allowance (DA)', amt=400000, kind='add', t0=FOUR5 - .15),
            dict(label='Salary = basic + DA', amt=1400000, kind='sub', t0=LIMIT5 - .45),
            dict(label='Limit: 14% of salary', amt=196000, kind='total', t0=ONE5 - .2),
            dict(label='Actually paid', amt=200000, kind='start', t0=TWO6 - .25),
            dict(label='Excess · disallowed', amt=4000, kind='', t0=FOUR6 - .2, col=RED, sec='40A(9)')]
JX, JY, JW, JH = 1478, 430, 180, 310
SAL5 = W('p5', 'salary', occ=1)

def _jar_level(t):
    return keys(t, [(CONTR5 + .6, 0.), (TEN5, .42), (ONE5 - .1, .52), (ONE5 + 1.5, 1.)])

def _nps(c, t):
    a = seg(t, P5 - .4, P5 + .2) * (1 - seg(t, P7 - .6, P7 - .1))
    if a <= 0: return
    # heading
    ha = a * seg(t, CONTR5 - .2, CONTR5 + .4)
    text(c, "Employer's contribution to NPS", 640, 318, 32, 800, WHITE, ha)
    sec(c, 640 + text_w("Employer's contribution to NPS", 32, 800) + 18, 306, '36(1)(iva)', ha * seg(t, NPS5 - .2, NPS5 + .3), VIO, 22)
    fa = a * seg(t, FOURTEEN5 - .2, FOURTEEN5 + .3, back)
    if fa > 0: chip(c, 760, 370, 'up to 14% of salary', GOLD, fa, 24)
    sa = a * seg(t, TEN5 - .5, TEN5, back)
    if sa > 0: chip(c, 1080, 370, 'salary = basic + DA', ACC, sa, 24)
    # setup: employer pays into the staff's pension jar; salary = basic + DA
    pa = a * seg(t, CONTR5 - .3, CONTR5 + .2) * (1 - seg(t, TEN5 - .6, TEN5 - .1))
    if pa > 0:
        person(c, 760, 790, .85, pa, 'meera', t, mood=.4, look=.4)
        text(c, 'employer', 760, 815, 24, 700, DIM, pa, 'c')
        person(c, 1180, 790, .8, pa, 'staff', t, mood=.4, look=.2)
        text(c, 'employee', 1180, 815, 24, 700, DIM, pa, 'c')
        for k in range(5):
            ph = ((t - CONTR5) / 1.3 + k / 5) % 1
            if t < CONTR5 + k * .26: continue
            x, y = _arc((850, 640), (JX + 60, JY + 14), 20, ein(ph) * .3 + .7 * ph)
            coin(c, x, y, 16, pa * seg(ph, 0, .1) * (1 - seg(ph, .9, 1)), GOLD, '₹', spin=ph * 6, shadow=False)
        # salary = basic + DA, above the employee
        s1 = seg(t, SAL5 - .2, SAL5 + .3)
        b1 = seg(t, BASIC5 - .2, BASIC5 + .3, back); b2 = seg(t, DEAR5 - .2, DEAR5 + .3, back)
        if s1 > 0:
            text(c, 'salary', 1180, 424, 30, 800, WHITE, pa * s1, 'c')
            if b1 > 0:
                c.drawRRect(rrect(1060, 442, 140 * b1, 52, 12), paint(ACC, .3 * pa)); c.drawRRect(rrect(1060, 442, 140 * b1, 52, 12), paint(ACC, .9 * pa, stroke=2))
                text(c, 'basic', 1130, 477, 26, 800, WHITE, pa * b1, 'c')
            if b2 > 0:
                c.drawRRect(rrect(1212, 442, 96 * b2, 52, 12), paint(BLUE, .3 * pa)); c.drawRRect(rrect(1212, 442, 96 * b2, 52, 12), paint(BLUE, .9 * pa, stroke=2))
                text(c, 'DA', 1260, 477, 26, 800, WHITE, pa * b2, 'c')
                text(c, '+', 1206, 477, 26, 800, DIM, pa * b2, 'c')
    sheet(c, 640, 404, 780, NPS_ROWS, a * seg(t, TEN5 - .45, TEN5 - .1), t, grow=True)
    # the jar
    ja = a * seg(t, NPS5 - .5, NPS5)
    if ja <= 0: return
    fill = _jar_level(t)
    lvl = JY + JH - (JH - 8) * fill
    c.drawRRect(rrect(JX - 6, JY + JH - 10, JW + 12, 22, 8), paint('#3a4565', ja))
    with clip(c, rrect(JX, JY, JW, JH, 18)):
        c.drawRect(skia.Rect(JX, JY, JX + JW, JY + JH), paint('#0b1328', .85 * ja))
        if fill > 0:
            pp = skia.Path(); pp.moveTo(JX, JY + JH)
            for xx in np.linspace(JX, JX + JW, 20): pp.lineTo(xx, lvl + 4 * math.sin(xx / 22 + t * 3) * (1 - .6 * fill))
            pp.lineTo(JX + JW, JY + JH); pp.close()
            c.drawPath(pp, paint(shader=lgrad((0, lvl), (0, JY + JH), [shade(GREEN, -.1), shade(GREEN, -.55)]), a=ja))
    c.drawRRect(rrect(JX, JY, JW, JH, 18), paint(WHITE, .5 * ja, stroke=2.4))
    text(c, 'NPS', JX + JW / 2, JY + JH + 50, 26, 800, WHITE, ja, 'c')
    # the rim = the limit
    ra = ja * seg(t, FOURTEEN5 - .2, FOURTEEN5 + .3)
    if ra > 0:
        p = paint(GOLD, .95 * ra, stroke=3, cap=False)
        if t < ONE5 + .4: p.setPathEffect(skia.DashPathEffect.Make([12, 8], 0))
        c.drawLine(JX - 14, JY + 8, JX + JW + 14, JY + 8, p)
        l1 = ra * (1 - seg(t, ONE5 + .3, ONE5 + .6)); l2 = ra * seg(t, ONE5 + .6, ONE5 + 1.)
        text(c, '14% of salary', 1600, JY - 18, 24, 800, GOLD, l1, 'c')
        text(c, 'limit ₹1,96,000', 1640, JY - 18, 24, 800, GOLD, l2, 'c')
    if fill > .5: text(c, 'allowed', JX + JW / 2, JY + JH / 2 + 30, 28, 800, '#052e16', ja * seg(fill, .7, 1), 'c')
    # p6: more pours in and spills over
    pu = seg(t, PAID6 - .2, PAID6 + .3)
    if pu > 0:
        sp = a * pu * (1 - seg(t, DIS6 + 1.2, DIS6 + 2))
        for k in range(6):
            ph = ((t - PAID6) * 1.6 + k / 6) % 1
            nx, ny = lerp(1446, 1528, ph), lerp(250, JY + 12, ph)
            notes(c, nx, ny, sp * seg(ph, 0, .2) * (1 - seg(ph, .8, 1)), 1, .3, 30 + 20 * math.sin(k + t))
        ou = seg(t, FOUR6 - .5, FOUR6 + .2)
        if ou > 0:
            P = np.array([_arc((JX + JW - 4, JY + 6), (1752, 640), 50, q) for q in np.linspace(0, ou, 14)])
            c.drawPath(poly(P, False), paint(RED, .9 * a, stroke=7))
        ra = a * seg(t, FOUR6 - .4, FOUR6)
        bx, by, bw, bh = 1690, 610, 130, 110
        c.drawRRect(rrect(bx, by, bw, bh, 12), paint('#1a0b12', .9 * ra))
        rl = seg(t, FOUR6, FOUR6 + .9)
        c.drawRRect(rrect(bx + 4, by + bh - 4 - 40 * rl, bw - 8, 40 * rl, 10), paint(RED, .75 * ra))
        c.drawRRect(rrect(bx, by, bw, bh, 12), paint(RED, .9 * ra, stroke=2.2))
        text(c, '₹4,000', bx + bw / 2, by + bh + 38, 30, 800, RED, ra * seg(t, FOUR6, FOUR6 + .3), 'c')
        text(c, 'disallowed', bx + bw / 2, by + bh + 68, 24, 700, RED, ra * seg(t, DIS6 - .2, DIS6 + .2), 'c')

# ---------------------------------------------------------------- p7: employees' PF — the due date under the PF law
SLX, SLY, SLW, SLH = 640, 300, 360, 330
TLX0, TLX1, TLY = 1080, 1800, 560
def _tl_x(day): return TLX0 + (day - 1) / 30 * (TLX1 - TLX0)
FX_ = _tl_x(15)

def _pf(c, t):
    a = seg(t, P7 - .4, P7 + .2) * (1 - seg(t, P8 - .6, P8 - .1))
    if a <= 0: return
    # the salary slip
    su = seg(t, P7 - .3, P7 + .5, eout)
    _paper(c, SLX - 40 * (1 - su), SLY, SLW, SLH, a * su, 'Salary slip', 'May', key='p_slip')
    rows = [('Basic + DA', 0), ("Less: employee's PF", 1), ('Net pay', 0)]
    hl = win(t, PF7 - .3, CUT7 + 1.6, .3, .6)
    for k, (s, red) in enumerate(rows):
        yy = SLY + 120 + 64 * k; ra = a * seg(t, P7 + .5 + .45 * k, P7 + .8 + .45 * k)
        if red and hl > 0: c.drawRRect(rrect(SLX + 10, yy - 32, SLW - 20, 48, 8), paint(RED, .16 * a * hl))
        text(c, s, SLX + 24, yy, 25, 700, INKS['red'] if red else INK, ra)
        if not (red and t > CUT7):
            bw = 88 * seg(t, P7 + .7 + .45 * k, P7 + 1.2 + .45 * k)
            c.drawRRect(rrect(SLX + SLW - 24 - bw, yy - 14, bw, 14, 7), paint(INK, .22 * ra))
    c.drawLine(SLX + 20, SLY + 244, SLX + SLW - 20, SLY + 244, paint(INK, .25 * a, stroke=1.2))
    text(c, 'the employee’s own money', SLX + 24, SLY + 290, 22, 600, '#6b6455', a * seg(t, SHARE_7 - .2, SHARE_7 + .3))
    # the June bar
    ba = a * seg(t, PF7, PF7 + .5)
    if ba > 0:
        c.drawRRect(rrect(TLX0, TLY - 24, TLX1 - TLX0, 48, 12), paint('#0d1530', .92 * ba))
        late = seg(t, LATE7 - .2, LATE7 + .4)
        c.drawRRect(rrect(FX_, TLY - 24, TLX1 - FX_, 48, 12), paint(RED, .18 * late * ba))
        c.drawRRect(rrect(TLX0, TLY - 24, FX_ - TLX0, 48, 12), paint(GREEN, .14 * seg(t, DUE7, DUE7 + .5) * ba))
        c.drawRRect(rrect(TLX0, TLY - 24, TLX1 - TLX0, 48, 12), paint(ACC, .6 * ba, stroke=1.6))
        for d in (1, 8, 15, 22, 30):
            text(c, '%d' % d, _tl_x(d), TLY + 50, 22, 700, DIM, ba * .9, 'c')
        text(c, 'JUNE · the next month', (TLX0 + TLX1) / 2, TLY + 9, 22, 800, DIM, ba * .9, 'c', track=2)
        da = ba * seg(t, DUE7 - .2, DUE7 + .3)
        c.drawLine(FX_, TLY - 40, FX_, TLY + 34, paint(GOLD, da, stroke=4))
        text(c, 'due date · PF law', FX_, TLY + 86, 24, 800, GOLD, da * seg(t, LAW7 - .3, LAW7 + .2), 'c')
    # the PF fund
    fa = a * seg(t, PF7 + .3, PF7 + .8)
    if fa > 0:
        _box(c, FX_ - 130, 300, 260, 92, ACC, fa, -.8, glow=.7 * win(t, FUND7 + .3, FUND7 + 1.6, .2, .6), r=16)
        icon(c, 'piggy', FX_ - 84, 346, .7, ACC, fa)
        text(c, 'PF fund', FX_ - 40, 356, 30, 800, WHITE, fa)
    # the token: slip -> bar -> fund (on time)
    u1 = seg(t, CUT7, REACH7 + .3); u2 = seg(t, REACH7 + .3, FUND7 + .2)
    if u1 > 0:
        if u2 <= 0: x, y = _arc((SLX + SLW - 70, SLY + 184), (_tl_x(6), TLY), 90, ease(u1))
        else:
            q = ease(u2); x, y = lerp(_tl_x(6), FX_ - 60, q), lerp(TLY, 410, q) - 40 * math.sin(math.pi * q)
        ok = seg(t, FUND7 + .2, FUND7 + .5)
        ta = a * (1 - .5 * ok)
        if ok < 1: coin(c, x, y, 26, ta, GOLD, 'PF', spin=0)
        if u2 > 0:
            P = np.array([(lerp(_tl_x(6), FX_ - 60, q), lerp(TLY, 410, q) - 40 * math.sin(math.pi * q)) for q in np.linspace(0, ease(u2), 12)])
            c.drawPath(poly(P, False), paint(GREEN, .7 * a, stroke=3))
        if ok > 0:
            tick(c, FX_ - 210, 470, a * seg(t, FUND7 + .2, FUND7 + .5, back), 18)
            text(c, 'on time → deductible', TLX0 + 4, 700, 26, 800, GREEN, a * ok, 'l')
    # 15 June calendar
    ca = a * seg(t, FIFT7 - .3, FIFT7 + .2, back)
    if ca > 0: calendar(c, SLX + 60, 752, ca, 15, 'JUN', None, .5, GOLD)
    if ca > 0: text(c, '15th of the next month', SLX + 124, 764, 26, 800, GOLD, ca)
    # the late token
    lu = seg(t, LATE7 - .3, NEVER7 + .2)
    if lu > 0:
        la = a * seg(t, LATE7 - .3, LATE7)
        q = ease(lu)
        if q < .55: x, y = lerp(_tl_x(6), _tl_x(25), q / .55), TLY
        else:
            v = (q - .55) / .45; x, y = lerp(_tl_x(25), FX_ + 80, v), lerp(TLY, 420, v) - 30 * math.sin(math.pi * v)
        P = np.array([(lerp(_tl_x(25), FX_ + 80, v), lerp(TLY, 420, v) - 30 * math.sin(math.pi * v)) for v in np.linspace(0, max(0., (q - .55) / .45), 10)])
        if q > .55: c.drawPath(poly(P, False), paint(RED, .8 * la, stroke=3))
        coin(c, x, y, 26, la * (1 - .4 * seg(t, NEVER7, NEVER7 + .3)), mixc(GOLD, RED, seg(lu, .3, .6)), 'PF')
        xa = seg(t, NEVER7 - .1, NEVER7 + .3, back)
        if xa > 0:
            cross(c, _tl_x(25) - 10, 470, la * xa, 22)
            text(c, 'late → never deductible', FX_ + 40, 700, 26, 800, RED, la * xa, 'l')

SHARE_7 = W('p7', 'share')

# ---------------------------------------------------------------- p8: bad debts across three years
def _baddebt(c, t):
    a = seg(t, P8 - .4, P8 + .2) * (1 - seg(t, P9 - .6, P9 - .1))
    if a <= 0: return
    heads = [('EARLIER YEAR', COUNT8 - .5), ('THIS YEAR', P8 - .3), ('LATER YEAR', LATER8 - .5)]
    for k, (h, t0) in enumerate(heads):
        x = PX[k]; ha = a * seg(t, t0, t0 + .4)
        _box(c, x, PY, PW, PH, ACC if k != 1 else GOLD, ha, -.85, glow=.5 * win(t, [COUNT8, WRIT8, INC8B][k] - .2, [COUNT8, WRIT8, INC8B][k] + 1.4, .2, .6))
        text(c, h, x + PW / 2, PY + 44, 22, 800, GOLD if k == 1 else ACC, ha, 'c', track=3)
        if k < 2 and ha > 0:
            arrow(c, x + PW + 2, PY + 36, x + PW + 24, PY + 36, DIM, 2.4, ha * .7, 10)
    # this year: write off
    a1 = a * seg(t, P8 - .2, P8 + .3)
    if a1 > 0:
        x = PX[1]
        _paper(c, x + 22, PY + 80, PW - 44, 210, a1, 'Debtors', 'ledger', key='p_debt')
        text(c, 'Café order · on credit', x + 44, PY + 190, 25, 700, INK, a1)
        c.drawRRect(rrect(x + PW - 140, PY + 222, 90, 14, 7), paint(INK, .22 * a1))
        su = seg(t, WRIT8 - .1, WRIT8 + .4)
        if su > 0: c.drawLine(x + 40, PY + 182, lerp(x + 40, x + PW - 40, su), PY + 182, paint(INKS['red'], .95 * a1, stroke=3.4))
        stamp(c, x + PW / 2 + 10, PY + 250, 'WRITTEN OFF', RED, a1, seg(t, WRIT8 - .05, WRIT8 + .9, linr), -8, 30, deep=True)
        ga = a1 * seg(t, BOOKS8, BOOKS8 + .4)
        if ga > 0:
            text(c, 'deduct', x + 40, PY + 372, 34, 800, GREEN, ga)
            tick(c, x + 66 + text_w('deduct', 34, 800), PY + 360, ga * seg(t, BOOKS8, BOOKS8 + .4, back), 20)
            sec(c, x + 40, PY + 414, '36(1)(vii)', ga, VIO, 22)
            text(c, 'once written off', x + 40, PY + 468, 24, 600, DIM, ga)
            text(c, 'in the books', x + 40, PY + 500, 24, 600, DIM, ga)
    # earlier year: counted as income
    a0 = a * seg(t, COUNT8 - .4, COUNT8 + .1)
    if a0 > 0:
        x = PX[0]
        bill(c, x + PW / 2, PY + 190, a0, 'Café order', None, 'credit', None, 1.15, -3)
        u = seg(t, COUNT8, COUNT8 + .6)
        link(c, (x + PW / 2, PY + 290), (x + PW / 2, PY + 340), GREEN, a0, u, False, 3, 12)
        text(c, 'in sales = income', x + PW / 2, PY + 388, 30, 800, GREEN, a0 * seg(t, COUNT8 + .3, COUNT8 + .7), 'c')
        text(c, 'earlier', x + PW / 2, PY + 428, 24, 600, DIM, a0 * seg(t, COUNT8 + .5, COUNT8 + .9), 'c')
    # later year: recovered
    a2 = a * seg(t, LATER8 - .4, LATER8 + .1)
    if a2 > 0:
        x = PX[2]
        icon(c, 'person', x + PW - 96, PY + 170, 1.3, DIM, a2)
        text(c, 'customer pays', x + PW - 96, PY + 240, 22, 600, DIM, a2, 'c')
        u = seg(t, LATER8 + .1, INC8B - .1)
        cx_, cy_ = _arc((x + PW - 110, PY + 170), (x + 110, PY + 200), 60, ease(u))
        coin(c, cx_, cy_, 30, a2, GOLD, '₹', spin=u * 6)
        ia = a2 * seg(t, INC8B - .2, INC8B + .3, back)
        if ia > 0:
            c.drawCircle(x + 110, PY + 200, 60, paint(GOLD, .2 * ia, blur=20))
            text(c, 'income again', x + 40, PY + 330, 34, 800, GOLD, ia)
            sec(c, x + 40, PY + 380, '41(4)', a2 * seg(t, SEC8 - .2, SEC8 + .3), VIO, 24)
            text(c, 'when recovered', x + 40, PY + 440, 24, 600, DIM, ia)

# ---------------------------------------------------------------- p9: STT for a share trader
def _stt(c, t):
    a = seg(t, P9 - .4, P9 + .2) * (1 - seg(t, P10 - .6, P10 - .1))
    if a <= 0: return
    person(c, 760, 790, .95, a * seg(t, SHARE9 - .3, SHARE9 + .2), 'rohan', t, look=.5, mood=.3)
    text(c, 'share trader', 760, 820, 24, 700, DIM, a * seg(t, SHARE9, SHARE9 + .4), 'c')
    na = a * seg(t, SHARE9 - .1, SHARE9 + .4)
    nx, ny, nw, nh = 930, 300, 470, 360
    _paper(c, nx, ny, nw, nh, na, 'Contract note', 'shares', key='p_cnote')
    rows = ['Shares bought / sold', 'Brokerage', 'Securities transaction tax']
    hl = seg(t, SEC9 - .2, SEC9 + .3)
    mv = seg(t, TAX9, TAX9 + .8)
    for k, s in enumerate(rows):
        yy = ny + 120 + 70 * k
        if k == 2 and hl > 0: c.drawRRect(rrect(nx + 10, yy - 34, nw - 20, 52, 8), paint(GOLD, .3 * na * hl))
        text(c, s, nx + 24, yy, 25, 700, INK, na * (1 - .5 * mv if k == 2 else 1))
        c.drawRRect(rrect(nx + nw - 104, yy - 15, 80, 14, 7), paint(INK, .22 * na))
    text(c, '(STT)', nx + 24, ny + 300, 24, 700, INKS['gold'], na * hl)
    # the target
    ga = a * seg(t, DEDUCT9 - .2, DEDUCT9 + .3)
    if ga > 0:
        gl = win(t, TAX9 + .6, TAX9 + 2, .2, .6)
        _box(c, 1460, 410, 360, 120, GREEN, ga, -.82, glow=gl, r=18)
        text(c, 'deduct', 1490, 462, 34, 800, GREEN, ga)
        sec(c, 1490, 502, '36(1)(xv)', ga, VIO, 22)
        if t > TAX9 + .7: tick(c, 1780, 450, ga * seg(t, TAX9 + .7, TAX9 + 1, back), 20)
    if 0 < mv:
        x, y = _arc((nx + 280, ny + 260), (1640, 470), 70, ease(mv))
        if mv < 1:
            c.drawRRect(rrect(x - 50, y - 22, 100, 44, 22), paint(GOLD, .9 * a))
            text(c, 'STT', x, y + 9, 24, 800, '#1a1305', a, 'c')
    ba = a * seg(t, BUS9 - .3, BUS9 + .2, back)
    if ba > 0:
        chip(c, 1640, 600, 'if trading profit is', ACC, ba, 24)
        text(c, 'business income', 1640, 660, 30, 800, WHITE, ba, 'c')
        tick(c, 1640, 712, ba, 18)

# ---------------------------------------------------------------- p10: the check, below / above the card
def _check(c, t):
    a = seg(t, P10 - .3, P10 + .3)
    if a <= 0: return
    ta = a * seg(t, FIFT10 - .3, FIFT10 + .2)
    if ta > 0:
        s1 = 'May salaries · employees’ PF cut'
        w1 = text_w(s1, 30, 700); w2 = ftext_w('₹15,000', 34, MONO)
        W_ = w1 + w2 + 130; x0 = 960 - W_ / 2
        _box(c, x0, 262, W_, 76, ACC, ta, -.8, r=38)
        icon(c, 'salary', x0 + 44, 300, .6, ACC, ta)
        text(c, s1, x0 + 82, 311, 30, 700, WHITE, ta)
        roll(c, 15000, x0 + W_ - 30, 313, seg(t, FIFT10, FIFT10 + .8), 34, GOLD, ta, 'r')
    # below the card: deposited 30 June; with the answer, due 15 June
    da = a * seg(t, THIRTY10 - .3, THIRTY10 + .2, back)
    ans = seg(t, A_NO - .1, A_NO + .4)
    if da > 0:
        calendar(c, 1180, 792 + 3 * math.sin(t * 1.7), da, 30, 'JUN', None, .5, mixc(ACC, RED, ans))
        text(c, 'deposited', 1250, 790, 28, 800, mixc(WHITE, RED, ans), da)
        if ans > 0: cross(c, 1440, 780, da * seg(t, A_NO, A_NO + .3, back), 20)
    fa = a * seg(t, A_FIFT - .3, A_FIFT + .2, back)
    if fa > 0:
        calendar(c, 720, 792 + 3 * math.sin(t * 1.7 + 1.3), fa, 15, 'JUN', None, .5, GOLD)
        text(c, 'due date', 790, 790, 28, 800, GOLD, fa)
        u = seg(t, A_FIFT + .2, A_FIFT + .9)
        pl = .75 + .25 * math.sin(t * 3)
        link(c, (934, 778), (1112, 778), RED, fa * pl, u, False, 3, 14)
        text(c, 'too late', 1015, 818, 24, 800, RED, fa * u, 'c')
    ga = a * seg(t, A_SEC - .2, A_SEC + .3, back)
    if ga > 0:
        chip(c, 1640, 790, 'no 43B grace', RED, ga, 24)

def ch_p(c, t):
    if t < PS - .5 or t > PE + .5: return
    _cabinet(c, t)
    _team(c, t)
    _panels(c, t)
    _interest(c, t)
    _nps(c, t)
    _pf(c, t)
    _baddebt(c, t)
    _stt(c, t)
    _check(c, t)

if __name__ == '__main__':
    for nm in ('TWELVE1 COSTS1 DEDUCT1 WHEN1 LIST2 SPEC2 PEOPLE2 MONEY2 INS2 BON2 INT2 STAFF2 BAD2 STOCK3 ALL3 HEALTH3 '
               'PREM3 CASH3 BONUS3 ALL3B UNLESS3 PROFIT3 BORR4 ALL4 NEW4 BEFORE4 GOES4 COST4 SAW4 CONTR5 NPS5 FOURTEEN5 '
               'BASIC5 DEAR5 TEN5 FOUR5 LIMIT5 ONE5 PAID6 TWO6 FOUR6 DIS6 PF7 CUT7 REACH7 FUND7 DUE7 LAW7 FIFT7 LATE7 '
               'NEVER7 SHARE_7 BAD8 WRIT8 BOOKS8 COUNT8 LATER8 INC8B SEC8 SHARE9 DEDUCT9 SEC9 TAX9 BUS9 FIFT10 MAY10 '
               'THIRTY10 A_NO A_FIFT A_SEC').split():
        print(nm, round(globals()[nm], 2))
    print(len(EVENTS), 'events')
