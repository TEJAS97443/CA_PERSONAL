"""Chapter B — business, profession and the five heads (sections 2(13), 2(36)).
b1 hook: Meera beside a wedding cake (left), her friend Kabir beside his dental chair (right, the lamp lights on
   "teeth"); between them a Dentist tile, a pulsing "?" and a Business tile
b2 the five heads slide in as filing drawers (heads5); coins from an "all income" spout drop into each drawer as
   it is named (Salaries · House property · Business or profession · Capital gains · Other sources); a little
   rule-sheet pops over every drawer on "own rules"; on "ours is the third one" the PGBP drawer glows gold and
   opens while the others dim
b3 the PGBP drawer glides to the right column (it stays there through b8 as the place business income lands);
   left column "Business": a shopfront, then trade · commerce · manufacture · adventure in the nature of trade
   chips as spoken, § 2(13) beside the title
b4 middle column "Profession": Kabir in his white coat, a "needs learning" chip, tiles doctor · lawyer · architect ·
   auditor as spoken, "includes a vocation", § 2(36)
b5 an "=" between the titles ("the difference hardly matters"); both columns stream into the one PGBP drawer
   ("taxed alike"); an EXCEPT FOR panel over the drawer: tax audit · presumptive schemes → different limits
b6 example: a buy → bake → sell loop circles "again and again" (lap counter), each lap's profit coin drops into the
   drawer; then "even one deal can count": a truckload of mangoes bought once (BUY) and resold (SELL), its profit
   into the drawer, "an adventure in the nature of trade"
b7 what if: a shady crate stamped ILLEGAL BUSINESS; its profit still streams into the drawer ("still taxed"); the
   source question is struck out ("not asked"); a "Bribe (an offence)" bill flies at the deductions gate, bounces
   off (red) and is stamped DISALLOWED — "never deductible"
b8 cake boxes "received in kind" get a ₹ cash-worth tag and turn into notes; three businesses each work out their
   own profit bar ("separately"), then the bars stack into one total ("added together") that drops into the drawer
b9 check: the scene calms; below the card a Clinic tile and a Medical-shop tile; on the answer they slide into one
   "Business or profession" head; their two profits are worked out separately, then added
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('b')
B1, B2, B3, B4, B5, B6, B7, B8, B9 = (T('b%d' % i) for i in range(1, 10))
B9A = TA('b9')

# ---------------------------------------------------------------- word times
MEERA1, BAKES, KABIR, TEETH = W('b1', 'meera'), W('b1', 'bakes'), W('b1', 'kabir'), W('b1', 'teeth')
DENTIST, BUSI1 = W('b1', 'dentist'), W('b1', 'business')
SORTS, INCOME2, FIVE = W('b2', 'sorts'), W('b2', 'income'), W('b2', 'five')
HEADT = [W('b2', 'salaries'), W('b2', 'house'), W('b2', 'business'), W('b2', 'capital'), W('b2', 'other')]
EACH2, OURS, THIRD = W('b2', 'each'), W('b2', 'ours'), W('b2', 'third')
TRADE, COMM, MANU, ADV, SEC3 = W('b3', 'trade'), W('b3', 'commerce'), W('b3', 'manufacture'), W('b3', 'adventure'), W('b3', 'section')
PROF4, LEARN, VOC, SEC4 = W('b4', 'profession'), W('b4', 'learning'), W('b4', 'vocation'), W('b4', 'section')
JOBT = [W('b4', 'doctor'), W('b4', 'lawyer'), W('b4', 'architect'), W('b4', 'auditor')]
DIFF, TAXED5, ALIKE = W('b5', 'difference'), W('b5', 'taxed'), W('b5', 'alike')
AUDIT5, PRES, LIMITS = W('b5', 'tax audit'), W('b5', 'presumptive'), W('b5', 'different')
USUALLY, AGAIN, PROFIT6 = W('b6', 'usually'), W('b6', 'again'), W('b6', 'profit')
ONE6, TRUCK6, ONCE, RESELL, ADV6 = W('b6', 'even'), W('b6', 'truckload'), W('b6', 'once'), W('b6', 'resell'), W('b6', 'adventure')
ILLEGAL, STILL7, LAW7, WHERE7 = W('b7', 'illegal'), W('b7', 'still'), W('b7', 'law'), W('b7', 'where')
MONEY7, OFFENCE, NEVER7 = W('b7', 'money'), W('b7', 'offence'), W('b7', 'never')
KIND8, CASH8, THREE8, EACH8, SEPAR8, ADDED8 = (W('b8', 'kind'), W('b8', 'cash'), W('b8', 'three'), W('b8', 'each'),
                                               W('b8', 'separately'), W('b8', 'added'))
CLINIC, MEDICAL, TWOH = W('b9', 'clinic'), W('b9', 'medical'), W('b9', 'two')
ONEHEAD, SEP9, ADDED9 = W('b9a', 'one head'), W('b9a', 'separately'), W('b9a', 'added')

for tt, k in ((BAKES, 'pop'), (KABIR, 'pop'), (FIVE, 'whoosh'), (HEADT[0], 'tick'), (HEADT[2], 'tick'),
              (HEADT[4], 'tick'), (THIRD, 'chime'), (ADV, 'pop'), (JOBT[0], 'pop'), (ALIKE, 'ok'),
              (AGAIN, 'tick'), (TRUCK6, 'whoosh'), (ADV6, 'chime_lo'),
              (ILLEGAL + .05, 'thunk'), (STILL7, 'blip'), (OFFENCE + .6, 'error'), (NEVER7 + .35, 'thunk'),
              (KIND8, 'pop'), (CASH8, 'chime_lo'), (ADDED8 + .3, 'chime'),
              (CLINIC, 'pop'), (ONEHEAD, 'ok'), (ADDED9, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _pill(c, x, y, s, col, a, size=28, fill=.2, w_=800, tcol=WHITE, icon_name=None, icon_fn=None):
    """Rounded pill centred at (x, y) with an optional line icon (or icon_fn(c, cx, cy, size)). Returns width."""
    if a <= 0: return _pill_w(s, size, w_, icon_name or icon_fn)
    tw = text_w(s, size, w_); iw = size * 1.25 if (icon_name or icon_fn) else 0
    w = tw + iw + size * 1.3; h = size * 1.75; x0 = x - w / 2
    c.drawRRect(rrect(x0, y - h / 2 + 6, w, h, h / 2), paint(BLACK, .35 * a, blur=10))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(shade(col, -.78), .95 * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(x0, y - h / 2, w, h, h / 2), paint(col, .9 * a, stroke=2))
    if icon_name: icon(c, icon_name, x0 + size * .65 + iw / 2, y, size / 64 * 1.1, col, a, 3.4)
    if icon_fn: icon_fn(c, x0 + size * .65 + iw / 2, y, size, col, a)
    text(c, s, x0 + size * .65 + iw, y + size * .36, size, w_, tcol, a)
    return w

def _pill_w(s, size=28, w_=800, ic=None):
    return text_w(s, size, w_) + (size * 1.25 if ic else 0) + size * 1.3

def _arc(p0, p1, u, h):
    return lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) - h * math.sin(math.pi * u)

def _coin_fly(c, p0, p1, u, a, r=18, h=160, col=GOLD):
    if a <= 0 or u <= 0 or u >= 1: return
    x, y = _arc(p0, p1, ease(u), h)
    coin(c, x, y, r * (1 - .25 * u), a * min(1, (1 - u) * 6), col, '₹', u * 7)

def _cap_icon(c, cx, cy, size, col, a):
    """A graduation cap (learning)."""
    s = size / 28
    p = poly(np.array([(cx - 15 * s, cy - 3 * s), (cx, cy - 10 * s), (cx + 15 * s, cy - 3 * s), (cx, cy + 4 * s)]))
    c.drawPath(p, paint(col, a))
    c.drawRRect(rrect(cx - 8 * s, cy, 16 * s, 8 * s, 3 * s), paint(col, a))
    c.drawLine(cx + 13 * s, cy - 3 * s, cx + 13 * s, cy + 7 * s, paint(col, a, stroke=1.8 * s))

def _xmark(c, x, y, r, a, col=RED):
    if a <= 0: return
    for sx in (-1, 1): c.drawLine(x - r * sx, y - r, x + r * sx, y + r, paint(col, a, stroke=4))

# ---------------------------------------------------------------- the five heads / the PGBP drawer
HX, HY, HW, HH = 200, 382, 1520, 330
DW = (HW - 4 * 18) / 5
DX0 = HX + 2 * (DW + 18)                                     # drawer 2's left in the cabinet
DX, DY = 1468, 425                                           # drawer 2 parked in the right column (b3 .. b8)
MOUTH = (DX + DW / 2, DY + 28)

def _park(t):
    return seg(t, B3 - .65, B3 + .35)

def _drawer_xy(t):
    u = _park(t); return lerp(DX0, DX, u), lerp(HY, DY, u)

def _pgbp_drawer(c, t, a, hl, op):
    """Only drawer 2 of heads5, drawn at its parked / gliding position."""
    if a <= 0: return
    x, y = _drawer_xy(t)
    c.save(); c.clipRect(skia.Rect.MakeXYWH(x - 16, y - 26, DW + 32, HH + 110), True)
    heads5(c, x - 2 * (DW + 18), y, HW, a, {2: hl} if hl > 0 else None, t, {2: op}, HH)
    c.restore()

def _cabinet(c, t):
    a = seg(t, B2 + .25, B2 + .9)
    if a <= 0: return
    u = _park(t)
    ca = a * (1 - u)
    sl = 60 * (1 - seg(t, B2 + .25, FIVE + .2, eout))
    mouths = [(HX + i * (DW + 18) + DW / 2, HY + 30 + sl) for i in range(5)]
    dim = seg(t, OURS - .2, OURS + .5)
    if ca > 0:
        hl = {}
        for i, ti in enumerate(HEADT):
            hl[i] = win(t, ti - .2, ti + 1.1, .2, .5) * (1 - dim)
        hl[2] = max(hl[2], seg(t, OURS - .1, THIRD + .2))
        op = {2: seg(t, THIRD - .1, THIRD + .6)}
        c.save()
        if u > 0:
            dx0, dy0 = _drawer_xy(t)
            c.clipRect(skia.Rect.MakeXYWH(DX0 - 24, HY - 24, DW + 48, HH + 100), skia.ClipOp.kDifference)
        heads5(c, HX, HY + sl, HW, ca, hl, t, op, HH)
        c.restore()
        if dim > 0:
            for i in (0, 1, 3, 4):
                c.drawRRect(rrect(HX + i * (DW + 18), HY + sl, DW, HH, 14), paint('#030712', .55 * dim * ca))
        # the spout of all income
        sa = ca * seg(t, INCOME2 - .4, INCOME2 + .1)
        if sa > 0:
            _pill(c, 960, 268, 'all income', GOLD, sa, 26, .2, 800, WHITE, 'coins')
        # coins drop into each drawer as it is named, then a few more
        drops = [(ti, i) for i, ti in enumerate(HEADT)] + [(HEADT[4] + .5 + .37 * k, (k * 3 + 1) % 5) for k in range(6)]
        for td, i in drops:
            fu = seg(t, td - .45, td + .15, linr)
            if 0 < fu < 1:
                x, y = _arc((960, 296), mouths[i], fu, 70)
                coin(c, x, y, 16, ca * min(1, (1 - fu) * 5), GOLD, '₹', fu * 6)
        # own rules: a little rule-sheet over each drawer
        for i in range(5):
            ra = ca * win(t, EACH2 + .14 * i - .1, OURS - .3, .25, .4)
            if ra > 0:
                rx, ry = mouths[i][0], HY + sl - 34
                c.drawRRect(rrect(rx - 17, ry - 21, 34, 42, 5), paint(CREAM, .95 * ra))
                for j in range(3): c.drawLine(rx - 10, ry - 9 + 9 * j, rx + 10, ry - 9 + 9 * j, paint(VIO, .9 * ra, stroke=2))
                c.drawRRect(rrect(rx - 17, ry - 21, 34, 42, 5), paint(VIO, ra, stroke=1.6))
        ra = ca * win(t, EACH2 + .2, OURS - .3, .3, .4)
        text(c, 'each head: its own rules', 960, HY + HH + 70, 28, 800, VIO, ra, 'c', shadow=6)
    # the PGBP drawer leaving the cabinet (and parked from then on)
    if u > 0: pass

# ---------------------------------------------------------------- b1: Meera and Kabir
def _hook(c, t):
    a = 1 - seg(t, B2 - .4, B2 + .5)
    if a <= 0 or t < CS: return
    dx = 260 * ein(seg(t, B2 - .4, B2 + .5))
    ma = a * seg(t, MEERA1 - .35, MEERA1 + .2)
    if ma > 0:
        rise = 40 * (1 - seg(t, MEERA1 - .35, MEERA1 + .5, eout))
        cake(c, 245 - dx, 800, .95 * seg(t, BAKES - .3, BAKES + .3, back), a * seg(t, BAKES - .3, BAKES), 'wedding')
        person(c, 500 - dx, 800 + rise, 1.15, ma, 'meera', t, mood=.7, look=.35)
        _pill(c, 500 - dx, 512, 'Meera · bakes cakes', ACC, ma, 24, .18, 800)
    ka = a * seg(t, KABIR - .35, KABIR + .2)
    if ka > 0:
        rise = 40 * (1 - seg(t, KABIR - .35, KABIR + .5, eout))
        dental_chair(c, 1712 + dx, 800, .8, ka, t, seg(t, TEETH - .2, TEETH + .3))
        person(c, 1440 + dx, 800 + rise, 1.15, ka, 'kabir', t, mood=.5, look=-.35)
        _pill(c, 1440 + dx, 512, 'Kabir · fixes teeth', ORANGE, ka, 24, .18, 800)
    qa = a * seg(t, DENTIST - .3, DENTIST + .2)
    if qa > 0:
        tile(c, 760, 600, 150, 150, 'tooth', 'Dentist', qa, ORANGE)
        ba = a * seg(t, BUSI1 - .35, BUSI1 + .1)
        tile(c, 1010, 600, 150, 150, 'shop', 'Business', ba, ACC)
        pu = .85 + .15 * math.sin((t - DENTIST) * 6)
        text(c, '?', 960, 702, 70 * pu, 800, GOLD, qa, 'c', shadow=10)
        link(c, (912, 660), (1000, 660), DIM, ba * .7, seg(t, BUSI1 - .3, BUSI1 + .1), w=2.4, head=12)

# ---------------------------------------------------------------- b3/b4/b5: business vs profession
BCX, PCX = 400, 1030                                          # column centres
_FLOW_B = catmull([(560, 440), (700, 400), (900, 312), (1030, 296), (1180, 312), (1380, 370), (1560, 420), (MOUTH[0], MOUTH[1] + 4)])
_FLOW_P = catmull([(1150, 480), (1300, 450), (1480, 436), (MOUTH[0] - 10, MOUTH[1] + 4)])
TY = 262                                                      # title baseline

def _title_sec(c, t, x, title, col, sec_s, tsec, a):
    sa = seg(t, tsec - .25, tsec + .3, back)
    tw = text_w(title, 46, 800); sw = sec(c, 0, 0, sec_s, 0, size=24) + 16
    x0 = x - (tw + sw * clamp(sa)) / 2
    text(c, title, x0, TY, 46, 800, col, a, 'l', shadow=8)
    if sa > 0: sec(c, x0 + tw + 16, TY - 15, sec_s, a * clamp(sa), size=24)

def _columns(c, t):
    a = seg(t, B3 - .3, B3 + .4) * (1 - seg(t, B6 - .45, B6 + .15))
    if a <= 0: return
    dy = -24 * seg(t, B6 - .45, B6 + .15)
    c.save(); c.translate(0, dy)
    # ---- Business
    _title_sec(c, t, BCX, 'Business', ACC, '2(13)', SEC3, a)
    shop(c, BCX, 562, .55, a * seg(t, B3 - .2, B3 + .5), t, lit=1.)
    row = [('trade', 'transfer', TRADE), ('commerce', 'coins', COMM), ('manufacture', 'factory', MANU)]
    sz = 26; ws = [_pill_w(s, sz, 800, ic) for s, ic, _ in row]; gap = 14
    x = BCX - (sum(ws) + gap * 2) / 2
    for (s, ic, ts), w in zip(row, ws):
        pa = a * seg(t, ts - .25, ts + .25, back)
        _pill(c, x + w / 2, 622 + 8 * (1 - clamp(pa)), s, ACC, pa, sz, .2, 800, WHITE, ic)
        x += w + gap
    pa = a * seg(t, ADV - .25, ADV + .3, back)
    _pill(c, BCX, 694 + 8 * (1 - clamp(pa)), 'adventure in the nature of trade', GOLD, pa, sz, .2, 800, WHITE, 'truck')
    # ---- Profession
    pa0 = a * seg(t, PROF4 - .4, PROF4 + .2)
    if pa0 > 0:
        _title_sec(c, t, PCX, 'Profession', ORANGE, '2(36)', SEC4, pa0)
        rise = 30 * (1 - seg(t, PROF4 - .4, PROF4 + .4, eout))
        person(c, PCX, 562 + rise, 1.05, pa0, 'kabir', t, mood=.45)
        la = a * seg(t, LEARN - .25, LEARN + .25, back)
        _pill(c, PCX, 604, 'work that needs learning', ORANGE, la, 25, .2, 800, WHITE, None, _cap_icon)
        jobs = [('Doctor', 'heart'), ('Lawyer', 'scale'), ('Architect', 'compass'), ('Auditor', 'calc')]
        tw_, th_, g_ = 128, 112, 10
        x0 = PCX - (4 * tw_ + 3 * g_) / 2
        for k, ((lab_, ic), ts) in enumerate(zip(jobs, JOBT)):
            ja = a * seg(t, ts - .3, ts + .15)
            if ja <= 0: continue
            pop = seg(t, ts - .3, ts + .3, back)
            tile(c, x0 + k * (tw_ + g_), 646 + 10 * (1 - clamp(pop)), tw_, th_, ic, lab_, ja, ORANGE, size=22,
                 glow=win(t, ts - .2, ts + .9, .2, .5))
        va = a * seg(t, VOC - .3, VOC + .25, back)
        _pill(c, PCX, 796, 'includes a vocation', ORANGE, va, 24, .16, 800)
    # ---- b5: the difference hardly matters
    ea = a * seg(t, DIFF - .2, DIFF + .4, back)
    if ea > 0:
        text(c, '=', (BCX + PCX) / 2 + 12, TY + 2, 64, 800, GOLD, ea, 'c', shadow=10)
    fa = a * seg(t, TAXED5 - .6, TAXED5 - .1) * (1 - seg(t, B6 - .6, B6 - .2))
    if fa > 0:
        for P, col, ph in ((_FLOW_B, ACC, 0.), (_FLOW_P, ORANGE, .4)):
            c.drawPath(poly(P, False), paint(col, .28 * fa, stroke=3))
            flowdots(c, P, ((t - TAXED5) * .55 + ph) % 1, fa, col, 8, 6.)
    la = a * seg(t, ALIKE - .3, ALIKE + .3, back)
    if la > 0: _pill(c, (BCX + PCX) / 2 + 12, 330, 'taxed alike', GOLD, la, 26, .22, 800)
    c.restore()

def _except(c, t, a):
    """b5: EXCEPT FOR panel over the parked drawer."""
    a = a * seg(t, AUDIT5 - .55, AUDIT5 - .05) * (1 - seg(t, B6 - .45, B6 + .1))
    if a <= 0: return
    x, y, w, h = 1400, 178, 426, 196
    c.drawRRect(rrect(x, y + 8, w, h, 18), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, 18), paint('#140d05', .94 * a))
    c.drawRRect(rrect(x, y, w, h, 18), paint(ORANGE, .75 * a, stroke=2))
    text(c, 'IT MATTERS ONLY FOR', x + 26, y + 40, 20, 800, ORANGE, a, track=2.5)
    for k, (s, ts) in enumerate((('tax audit', AUDIT5), ('presumptive schemes', PRES))):
        pa = a * seg(t, ts - .3, ts + .25, back)
        _pill(c, x + 26 + _pill_w(s, 26) / 2, y + 86 + 56 * k, s, ORANGE, pa, 26, .2)
    la = a * seg(t, LIMITS - .25, LIMITS + .3)
    if la > 0:
        text(c, 'different', x + w - 26, y + 98, 25, 800, WHITE, la, 'r')
        text(c, 'limits', x + w - 26, y + 130, 25, 800, WHITE, la, 'r')
        c.drawLine(x + w - 138, y + 86, x + w - 138, y + 148, paint(ORANGE, .6 * la, stroke=2))

# ---------------------------------------------------------------- b6: again and again vs one deal
LPX, LPY, LPR = 400, 548, 172
LAP = 1.35

def _loop(c, t):
    a = seg(t, USUALLY - .4, USUALLY + .3) * (1 - seg(t, B7 - .45, B7 + .1))
    if a <= 0: return
    c.drawCircle(LPX, LPY, LPR, paint('#0b1020', .6 * a))
    c.drawCircle(LPX, LPY, LPR, paint(ACC, .35 * a, stroke=3))
    run = seg(t, AGAIN - .4, AGAIN)
    st = [(-90, 'Buy', 'sack'), (30, 'Bake', None), (150, 'Sell', 'coins')]
    ph = max(0., t - (AGAIN - .4)) / LAP
    # arrows on the ring
    for k in range(3):
        ang = math.radians(-30 + 120 * k)
        x, y = LPX + LPR * math.cos(ang), LPY + LPR * math.sin(ang)
        tx, ty = -math.sin(ang), math.cos(ang)
        arrow(c, x - tx * 8, y - ty * 8, x + tx * 6, y + ty * 6, ACC, 3, .7 * a, 16)
    # stations
    for ang, lab_, ic in st:
        r = math.radians(ang); x, y = LPX + LPR * math.cos(r), LPY + LPR * math.sin(r)
        c.drawCircle(x, y, 44, paint('#0d1530', a)); c.drawCircle(x, y, 44, paint(ACC, .8 * a, stroke=2.4))
        if ic: icon(c, ic, x, y, .78, ACC if ic != 'coins' else GOLD, a, 3.4)
        else: cake(c, x, y + 26, .3, a, 'slice')
        ly = y - 62 if ang < 0 else y + 74
        text(c, lab_, x, ly, 25, 800, WHITE, a, 'c')
    # the runner + lap counter
    if run > 0:
        r = math.radians(-90 + 360 * (ph % 1))
        x, y = LPX + LPR * math.cos(r), LPY + LPR * math.sin(r)
        c.drawCircle(x, y, 16, paint(GOLD, .35 * a * run, blur=8)); c.drawCircle(x, y, 9, paint(GOLD, a * run))
        n = int(ph) + 1
        text(c, '× %d' % n, LPX, LPY + 14, 54, 800, GOLD, a * run, 'c', shadow=8)
        text(c, 'again and again', LPX, LPY + 52, 22, 700, DIM, a * run, 'c')
        # each lap's profit drops into the drawer (from "for profit")
        for k in range(1, 8):
            tk = AGAIN - .4 + LAP * (k - 1) + LAP * 240 / 360
            if tk < PROFIT6 - .3: continue
            _coin_fly(c, (LPX + LPR * math.cos(math.radians(150)), LPY + LPR * math.sin(math.radians(150))), MOUTH,
                      seg(t, tk, tk + .9, linr), a, 15, 230)

RDY = 744                                                     # the mango road

def _one_deal(c, t):
    a = seg(t, ONE6 - .35, ONE6 + .2) * (1 - seg(t, B7 - .45, B7 + .1))
    if a <= 0: return
    _pill(c, 1068, 318, 'even one deal can count', GOLD, a * seg(t, ONE6 - .35, ONE6 + .25, back), 28, .2, 800, WHITE, None)
    c.drawLine(700, RDY, 1390, RDY, paint('#94a3b8', .3 * a, stroke=2.4))
    ta = a * seg(t, TRUCK6 - .5, TRUCK6)
    if ta <= 0: return
    x = keys(t, [(TRUCK6 - .5, 640), (ONCE + .1, 900), (RESELL - .1, 900), (RESELL + .8, 1210)])
    mv = x * 1.0
    truck(c, x, RDY, .72, ta, 'light', ORANGE, 'Mangoes', t, mv)
    # mangoes peeking over the body
    for k in range(6):
        mx = x - 118 + k * 22 + (k % 2) * 4; my = RDY - 120 - (k % 2) * 6
        c.drawOval(skia.Rect.MakeXYWH(mx - 11, my - 8, 22, 16), paint('#f59e0b', ta))
        c.drawOval(skia.Rect.MakeXYWH(mx - 4, my - 7, 9, 5), paint('#fde68a', .7 * ta))
    bu = a * seg(t, ONCE - .25, ONCE + .25, back) * (1 - seg(t, RESELL - .2, RESELL + .2))
    if bu > 0: price_tag(c, 900, RDY - 196, 'BUY · once', ACC, bu, 26)
    su = a * seg(t, RESELL + .5, RESELL + .9, back)
    if su > 0: price_tag(c, 1210, RDY - 196, 'SELL', GREEN, su, 26)
    _coin_fly(c, (1210, RDY - 230), MOUTH, seg(t, RESELL + 1.0, RESELL + 1.9, linr), a, 20, 120)
    aa = a * seg(t, ADV6 - .25, ADV6 + .35, back)
    if aa > 0:
        _pill(c, 1068, 410, 'an adventure in the nature of trade', GOLD, aa, 27, .22, 800, WHITE, None)
        tick(c, 1068 + _pill_w('an adventure in the nature of trade', 27) / 2 + 30, 410, aa, 18)

# ---------------------------------------------------------------- b7: the illegal business
CRX, CRY, CRW, CRH = 250, 468, 320, 236                      # the crate (top-left)
GTX = 1268                                                    # the deductions gate

def _crate(c, x, y, w, h, a):
    if a <= 0: return
    c.drawRRect(rrect(x + 6, y + 14, w, h, 8), paint(BLACK, .5 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, 8), paint(shader=lgrad((x, y), (x, y + h), ['#6b4a2b', '#3b2716']), a=a))
    for k in range(1, 4):
        yy = y + h * k / 4; c.drawLine(x + 6, yy, x + w - 6, yy, paint('#26180c', .9 * a, stroke=3, cap=False))
    for xx in (x + 18, x + w - 18):
        c.drawLine(xx, y + 6, xx, y + h - 6, paint('#26180c', .8 * a, stroke=6))
    c.drawLine(x + 18, y + 10, x + w - 18, y + h - 10, paint('#26180c', .6 * a, stroke=6))
    c.drawRRect(rrect(x, y, w, h, 8), paint('#a07850', .6 * a, stroke=2))

def _illegal(c, t):
    a = seg(t, B7 - .35, B7 + .3) * (1 - seg(t, B8 - .45, B8 + .1))
    if a <= 0: return
    # a dim, shady spotlight
    c.drawPath(poly(np.array([(CRX + CRW / 2 - 40, 190), (CRX + CRW / 2 + 40, 190), (CRX + CRW + 70, CRY + CRH + 30), (CRX - 70, CRY + CRH + 30)])),
               paint(shader=lgrad((0, 190), (0, CRY + CRH + 30), [('#fca5a5', .0), ('#fca5a5', .07 * a)])))
    cx_, cy_ = CRX + CRW / 2, CRY + CRH + 12
    c.save(); c.translate(cx_, cy_); c.scale(1, .16)
    c.drawCircle(0, 0, CRW / 2 + 70, paint(shader=rgrad(0, 0, CRW / 2 + 70, [('#7f1d1d', .3 * a), ('#7f1d1d', 0)])))
    c.restore()
    _crate(c, CRX, CRY, CRW, CRH, a)
    stamp(c, CRX + CRW / 2, CRY + CRH / 2, 'ILLEGAL', RED, a, seg(t, ILLEGAL - .25, ILLEGAL + .75, linr), -10, 46, sub='BUSINESS')
    # profit still taxed: coins stream into the PGBP drawer
    for k in range(6):
        t0 = STILL7 - .6 + .3 * k
        _coin_fly(c, (CRX + CRW / 2 + 40, CRY - 10), MOUTH, seg(t, t0, t0 + 1.0, linr), a, 18, 170)
    pa = a * seg(t, STILL7 - .25, STILL7 + .3, back) * (1 - .45 * seg(t, MONEY7 - .3, MONEY7 + .3))
    _pill(c, 820, 560, 'its profit is still taxed', GOLD, pa, 27, .2, 800, WHITE, 'coins')
    qa = a * seg(t, LAW7 - .2, LAW7 + .3) * (1 - seg(t, MONEY7 - .3, MONEY7 + .3))
    if qa > 0:
        w = _pill(c, 790, 634, 'where did it come from?', DIM, qa, 25, .1, 700)
        su = seg(t, WHERE7 + .3, WHERE7 + .9)
        if su > 0:
            c.drawLine(790 - w / 2 + 16, 634, lerp(790 - w / 2 + 16, 790 + w / 2 - 16, su), 634, paint(RED, qa, stroke=3.4))
            text(c, 'not asked', 790 + w / 2 + 16, 642, 25, 800, RED, qa * seg(su, .6, 1), 'l')
    # the deductions gate
    ga = a * seg(t, MONEY7 - .5, MONEY7)
    if ga > 0:
        hit = seg(t, OFFENCE + .45, OFFENCE + .6) * (1 - seg(t, OFFENCE + 1.1, OFFENCE + 1.8))
        gc = mixc(GREEN, RED, hit)
        c.drawRRect(rrect(GTX - 16, 470, 32, 300, 10), paint(shade(gc, -.7), ga))
        c.drawRRect(rrect(GTX - 16, 470, 32, 300, 10), paint(gc, .9 * ga, stroke=2.4))
        if hit > 0: c.drawRRect(rrect(GTX - 22, 464, 44, 312, 14), paint(RED, .55 * hit * ga, stroke=8, blur=10))
        _pill(c, GTX, 438, 'deduction', gc, ga, 24, .2, 800)
    # the bribe bill: flies at the gate, bounces off, stamped DISALLOWED
    ba = a * seg(t, MONEY7 - .2, MONEY7 + .2)
    if ba > 0:
        u1 = seg(t, MONEY7 - .1, OFFENCE + .55)
        u2 = seg(t, OFFENCE + .55, OFFENCE + 1.35, eout)
        if u2 <= 0:
            x, y = _arc((CRX + CRW / 2, CRY + 80), (GTX - 130, 620), ease(u1), 140); ang = lerp(-8, 6, u1)
        else:
            x, y = lerp(GTX - 130, 1040, u2), lerp(620, 700, u2) - 70 * math.sin(math.pi * u2); ang = lerp(6, -14, u2)
        bill(c, x, y, ba, 'Bribe (an offence)', None, None, None, .92, ang, RED,
             ('DISALLOWED', RED, seg(t, NEVER7 + .05, NEVER7 + 1.0, linr)))
        na = a * seg(t, NEVER7 - .1, NEVER7 + .4)
        _pill(c, 1040, 800, 'never deductible', RED, na, 25, .2, 800)

# ---------------------------------------------------------------- b8: in kind, and three businesses
KBX = 330
BZ = [('Business 1', 'shop', .62), ('Business 2', 'truck', .86), ('Business 3', 'factory', .44)]
BZX, BZY, BZW, BZH, BZG = 110, 600, 400, 196, 22
SUMX, SUMY, SUMW = 820, 430, 480

def _kind(c, t):
    a = seg(t, KIND8 - .6, KIND8 - .1) * (1 - seg(t, B9 - .5, B9 + .1))
    if a <= 0: return
    _pill(c, KBX, 292, 'profit received in kind', ACC, a * seg(t, KIND8 - .4, KIND8 + .2, back), 26, .2, 800)
    mu = seg(t, CASH8 + .45, CASH8 + 1.2)
    dx = -120 * (1 - seg(t, KIND8 - .6, KIND8 + .2, eout))
    boxes(c, KBX + dx, 540, 1.05 * (1 - .35 * mu), a * (1 - mu))
    if mu > 0: notes(c, KBX, 480, a * mu, 3, .95 * (.7 + .3 * mu), -6)
    ta = a * seg(t, CASH8 - .3, CASH8 + .3, back)
    if ta > 0: price_tag(c, KBX + 156, 400, '₹ cash worth', GOLD, ta, 26, -8)
    _coin_fly(c, (KBX, 440), MOUTH, seg(t, CASH8 + 1.2, CASH8 + 2.1, linr), a, 20, 150)

def _three(c, t):
    a = seg(t, THREE8 - .45, THREE8 + .1) * (1 - seg(t, B9 - .5, B9 + .1))
    if a <= 0: return
    fly = seg(t, ADDED8 - .25, ADDED8 + .55)
    for k, (lab_, ic, v) in enumerate(BZ):
        x = BZX + k * (BZW + BZG); y = BZY
        ta = a * seg(t, THREE8 - .45 + .15 * k, THREE8 + .1 + .15 * k)
        if ta <= 0: continue
        c.drawRRect(rrect(x, y + 8, BZW, BZH, 18), paint(BLACK, .4 * ta, blur=14))
        c.drawRRect(rrect(x, y, BZW, BZH, 18), paint('#0d1530', .95 * ta))
        c.drawRRect(rrect(x, y, BZW, BZH, 18), paint(ACC, .5 * ta, stroke=1.6))
        icon(c, ic, x + 52, y + 50, .8, ACC, ta, 3.4)
        text(c, lab_, x + 96, y + 60, 28, 800, WHITE, ta)
        su = seg(t, EACH8 - .1 + .35 * k, EACH8 + .6 + .35 * k)
        text(c, 'its own profit', x + 30, y + 118, 23, 700, DIM, ta * seg(su, 0, .3))
        bw = (BZW - 60) * v
        c.drawRRect(rrect(x + 30, y + 136, BZW - 60, 30, 10), paint(WHITE, .06 * ta))
        if su > 0:
            c.drawRRect(rrect(x + 30, y + 136, bw * eout(su), 30, 10), paint(GREEN, .75 * ta * (1 - .6 * fly)))
        sa = ta * seg(t, SEPAR8 - .2, SEPAR8 + .3) * (1 - fly)
        if sa > 0: tick(c, x + BZW - 34, y + 42, sa, 17)
    # the sum: bars stack into one total, then drop into the drawer
    if fly > 0:
        tot = sum(v for _, _, v in BZ); xs = SUMX
        for k, (_, _, v) in enumerate(BZ):
            x0 = BZX + k * (BZW + BZG) + 30; y0 = BZY + 136
            w = (SUMW * v / tot)
            x = lerp(x0, xs, ease(fly)); y = lerp(y0, SUMY, ease(fly)) - 60 * math.sin(math.pi * fly)
            bw = lerp((BZW - 60) * v, w, ease(fly))
            c.drawRRect(rrect(x, y, bw, 30, 10), paint(GREEN, .8 * a))
            c.drawLine(x + bw, y + 3, x + bw, y + 27, paint('#052e16', a, stroke=2))
            xs += w
        la = a * seg(t, ADDED8 + .35, ADDED8 + .7)
        text(c, 'added together', SUMX + SUMW / 2, SUMY - 18, 28, 800, GREEN, la, 'c', shadow=6)
        text(c, '= one business income', SUMX + SUMW / 2, SUMY + 74, 25, 700, WHITE, la * seg(t, ADDED8 + .6, ADDED8 + .9), 'c')
        _coin_fly(c, (SUMX + SUMW, SUMY), MOUTH, seg(t, ADDED8 + .9, ADDED8 + 1.6, linr), a, 20, 90, GREEN)

# ---------------------------------------------------------------- b9: check — below the card
def _check(c, t):
    a = seg(t, B9 - .2, B9 + .4) * (1 - seg(t, CE - .5, CE + .2))
    if a <= 0: return
    m = seg(t, ONEHEAD - .35, ONEHEAD + .25)
    y = 828
    for k, (lab_, ic, ts) in enumerate((('Clinic', 'hospital', CLINIC), ('Medical shop', 'shop', MEDICAL))):
        ta = a * seg(t, ts - .3, ts + .2) * (1 - seg(m, .55, 1))
        if ta <= 0: continue
        x = lerp(720 + 480 * k, 960, ease(m)); k_ = 1 - .45 * ease(m)
        c.save(); c.translate(x, y + 75); c.scale(k_, k_); c.translate(-x, -(y + 75))
        tile(c, x - 80, y, 160, 150, ic, lab_, ta, ORANGE, size=24)
        c.restore()
        qa = ta * seg(t, TWOH - .2, TWOH + .3) * (1 - seg(t, B9A - .5, B9A))
        text(c, '?', x + 100, y + 52, 40 * (1 + .12 * math.sin((t - TWOH) * 5)), 800, GOLD, qa, 'c')
    ha = a * seg(t, ONEHEAD + .05, ONEHEAD + .5, back)
    if ha > 0:
        w = _pill(c, 960, y + 52, 'one head · business or profession', GOLD, ha, 28, .22, 800, WHITE, 'shop')
        mu = seg(t, ADDED9 - .1, ADDED9 + .45)
        sa = a * seg(t, SEP9 - .2, SEP9 + .3) * (1 - seg(mu, .6, 1))
        if sa > 0:
            for k, s in enumerate(('clinic profit', 'shop profit')):
                _pill(c, 960 + (-1 if k == 0 else 1) * lerp(190, 60, ease(mu)), y + 128, s, GREEN, sa, 24, .18, 800)
            text(c, '+', 960, y + 140, 40, 800, GREEN, sa * (1 - mu), 'c')
        ad = a * seg(t, ADDED9 + .25, ADDED9 + .6, back)
        if ad > 0: _pill(c, 960, y + 128, 'added together', GREEN, ad, 25, .22, 800)

def ch_b(c, t):
    if t < CS - .5 or t > CE + .5: return
    _hook(c, t)
    _cabinet(c, t)
    # the parked PGBP drawer (from the end of b2 until the check)
    da = seg(t, OURS - .3, OURS) * (1 - seg(t, B9 - .6, B9 + .1))
    if da > 0 and t > B3 - .65:
        hl = max(lerp(1., .35, seg(t, B3, B3 + 1.)), win(t, TAXED5 - .3, B6 - .3, .4, .5),
                 max(win(t, tk, tk + 1.2, .2, .6) for tk in (RESELL + 1.8, STILL7 + .4, CASH8 + 2.0, ADDED8 + 1.5)))
        _pgbp_drawer(c, t, da, hl, 1. - .0 * seg(t, B3, B3 + 1))
    _columns(c, t)
    _except(c, t, 1.)
    _loop(c, t)
    _one_deal(c, t)
    _illegal(c, t)
    _kind(c, t)
    _three(c, t)
    _check(c, t)
