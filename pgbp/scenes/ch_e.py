"""Chapter E — The machine: method of accounting (sec 145, 145B) and section 29.
A thin P.Y. 2025-26 year bar sits at the top (with a peek of April); its last weeks are zoomed into a big day
strip, March | April 2026, cut by a glowing 31 Mar year-end line (left: P.Y. 2025-26 · this year, right: P.Y.
2026-27 · next year).
e1 hook: a wedding cake rides in and is delivered on 28 MAR (calendar page + pin); a fan of notes arrives on
   10 APR (calendar + pin); a gold "?" bracket spans the two dates across the year line
e2 predict: the two year labels pulse while a gold income coin swings between them
e3 a big switch "Cash | Mercantile" under "Method of accounting · § 145"; "regularly followed"; the knob visits
   cash, then mercantile as spoken
e4 mercantile: the gold income token drops from the cake onto 28 Mar → the "this year" side glows; cash: the knob
   flips, the token slides to the 10 Apr money → "next year" glows
e5 trap: a government subsidy slip (chips: subsidy · grant · cash incentive, § 145B) lands on the day it is
   received, 20 Apr; the switch flips both ways and the slip does not move ("year of receipt")
e6 the strip gives way to the big picture: § 29 → "business income is worked out under" a § 30 … § 43D ruler
   (section chips pop along it); a P&L on cream paper (Meera's) sits over the hopper of the five-stage machine;
   its net profit row glows: "only the starting point"
e7 the P&L drops into the hopper and the five chambers light one by one as named (net profit · + disallowed ·
   − allowed, not in books · − other heads · + deemed income), each with the spoken words above it, then the
   "= PGBP" port glows
e8 analogy: airport security — bills leave the P&L on a conveyor through a "§ 30 – 43D" scanner: most pass
   (green flashes), income-tax ₹1,20,000 and a late bonus ₹80,000 are lifted out (red), a supplier waiver ₹35,000
   and a bad debt recovered ₹25,000 drop on after the gate (gold, "added"); then the late bonus flies on to an
   "allowed in a later year" box and gets a green tick
e9 check: below the card a "Bank interest ₹30,000" slip rides a short belt; the answer lifts it out into an
   "Income from other sources" drawer
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('e')
E1, E2, E3, E4, E5, E6, E7, E8, E9 = (T('e%d' % i) for i in range(1, 10))
E2E = TP('e2')

# ---------------------------------------------------------------- word times
DELIVERS, TWENTY1, MONEY1, TEN1, WHICH1 = (W('e1', 'delivers'), W('e1', 'twenty'), W('e1', 'money'), W('e1', 'ten'),
                                           W('e1', 'which'))
DEPENDS3, SEC3, REGULAR3, CASH3, MERC3 = (W('e3', 'depends'), W('e3', '145'), W('e3', 'regularly'), W('e3', 'cash'),
                                          W('e3', 'mercantile'))
MERC4, EARNED4, THIS4, CASH4, ARRIVES4, NEXT4 = (W('e4', 'mercantile'), W('e4', 'earned'), W('e4', 'this'),
                                                 W('e4', 'cash'), W('e4', 'arrives'), W('e4', 'next'))
GOVT5, SUBSIDY5, GRANT5, INCENT5, RECEIVED5, WHATEVER5 = (W('e5', 'government'), W('e5', 'subsidy'), W('e5', 'grant'),
                                                          W('e5', 'incentive'), W('e5', 'received'),
                                                          W('e5', 'whatever'))
BIG6, SEC29, SECTIONS6, FORTY6, PNL6, START6 = (W('e6', 'big'), W('e6', 'section'), W('e6', 'sections'),
                                                W('e6', 'forty'), W('e6', 'profit'), W('e6', 'starting'))
MACHINE7, START7, ADD7, DEDUCT7, REMOVE7, ADD7B, DEEMED7 = (W('e7', 'machine'), W('e7', 'start'), W('e7', 'add'),
                                                            W('e7', 'deduct'), W('e7', 'remove'),
                                                            W('e7', 'add', occ=1), W('e7', 'deemed'))
END7 = TE('e7')
SECURITY8, EVERY8, MOST8, TAKEN8, ADDED8, NEVER8 = (W('e8', 'security'), W('e8', 'every'), W('e8', 'most'),
                                                    W('e8', 'taken'), W('e8', 'added'), W('e8', 'never'))
UNLIKE8, DISALLOWED8, ALLOWED8, LATER8 = W('e8', 'unlike'), W('e8', 'disallowed'), W('e8', 'allowed'), W('e8', 'later')
BANK9, A_TAKES, A_OTHER = W('e9', 'bank'), W('e9a', 'takes'), W('e9a', 'other')

for tt, k in ((DELIVERS + .5, 'whoosh'), (TWENTY1, 'flip'), (MONEY1 + .3, 'pop'), (TEN1, 'flip'), (WHICH1, 'blip'),
              (CASH3, 'tap'), (MERC3, 'tap'), (MERC4, 'tap'), (EARNED4 + .4, 'thunk'), (THIS4, 'chime_lo'),
              (CASH4, 'tap'), (ARRIVES4 + .3, 'whoosh'),
              (RECEIVED5 + .1, 'thunk'), (WHATEVER5, 'tap'), (WHATEVER5 + .45, 'tap'),
              (SEC29, 'pop'), (START6 + .2, 'ok'),
              (START7, 'tick'), (ADD7, 'tick'), (DEDUCT7, 'tick'), (REMOVE7, 'tick'), (ADD7B, 'tick'),
              (DEEMED7 + .7, 'chime')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _box(c, x, y, w, h, col, a, fill=.78, stroke=.9, glow=0., r=18, dash=False):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    p = paint(col, stroke * a, stroke=2.4)
    if dash: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _token(c, x, y, a, label='income', col=GOLD, s=1.):
    """A gold income token: coin + word, centred at (x, y)."""
    if a <= 0: return
    w, h = 170 * s, 54 * s
    c.drawRRect(rrect(x - w / 2, y - h / 2 + 5, w, h, h / 2), paint(BLACK, .45 * a, blur=10))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(shade(col, -.72), a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(col, a, stroke=2.4))
    coin(c, x - w / 2 + 28 * s, y, 18 * s, a, col, '₹', shadow=False)
    text(c, label, x + 16 * s, y + 9 * s, 26 * s, 800, col, a, 'c')

# ---------------------------------------------------------------- e1–e5: the year boundary
YBX, YBY, YBW, YBH = 360, 264, 1000, 36                  # context year bar
SX0, SX1, SY, SH = 120, 1800, 534, 64                    # zoomed strip (1 Mar – 30 Apr 2026)
DPX = (SX1 - SX0) / 61.
def _dx(m, d): return SX0 + ((d - 1) if m == 3 else (31 + d - 1)) * DPX + DPX / 2
XYE = SX0 + 31 * DPX                                      # the year-end line
X28, X10, X20 = _dx(3, 28), _dx(4, 10), _dx(4, 25)
LX_L, LX_R = (SX0 + XYE) / 2, (XYE + SX1) / 2

def _g1_alpha(t): return seg(t, CS - .3, CS + .4) * (1 - seg(t, E6 - .35, E6 + .35))

def _years(c, t):
    a = _g1_alpha(t)
    if a <= 0: return
    # context bar with its last weeks highlighted, zoom guides down to the strip
    yearbar(c, YBX, YBY, YBW, a, t, extend=(2026, 4, 30), h=YBH, label=False, ext_label=None)
    text(c, 'P.Y. 2025-26', YBX - 20, YBY + 27, 24, 800, ACC, a, 'r')
    hx0 = yearbar_x(YBX, YBW, (2026, 3, 1)); hx1 = yearbar_x(YBX, YBW, (2026, 4, 30, 1.), extend=(2026, 4, 30))
    c.drawRRect(rrect(hx0 - 3, YBY - 6, hx1 - hx0 + 6, YBH + 12, 8), paint(GOLD, .9 * a, stroke=2.4))
    P = skia.Path(); P.moveTo(hx0, YBY + YBH + 6); P.lineTo(hx1, YBY + YBH + 6); P.lineTo(SX1, SY - 6); P.lineTo(SX0, SY - 6); P.close()
    c.drawPath(P, paint(shader=lgrad((0, YBY + YBH), (0, SY), [(ACC, .08), (ACC, .02)]), a=a))
    for xa, xb in ((hx0, SX0), (hx1, SX1)):
        c.drawLine(xa, YBY + YBH + 6, xb, SY - 6, paint(ACC, .22 * a, stroke=1.4))
    # the strip
    c.drawRRect(rrect(SX0, SY + 5, SX1 - SX0, SH, 12), paint(BLACK, .4 * a, blur=12))
    c.drawRRect(rrect(SX0, SY, SX1 - SX0, SH, 12), paint('#0d1530', .95 * a))
    hl, hr = _glow_sides(t)
    c.save(); c.clipRRect(rrect(SX0, SY, SX1 - SX0, SH, 12), True)
    c.drawRect(skia.Rect(SX0, SY, XYE, SY + SH), paint(ACC, (.08 + .22 * hl) * a))
    c.drawRect(skia.Rect(XYE, SY, SX1, SY + SH), paint(VIO, (.06 + .22 * hr) * a))
    tp = paint(WHITE, .22 * a, stroke=1.2, cap=False)
    for k in range(61):
        x = SX0 + k * DPX
        c.drawLine(x, SY + SH - (14 if k % 5 == 0 else 8), x, SY + SH, tp)
    c.restore()
    c.drawRRect(rrect(SX0 + .5, SY + .5, SX1 - SX0 - 1, SH - 1, 12), paint(ACC, .5 * a, stroke=1.4))
    text(c, 'MARCH 2026', SX0 + 190, SY + 38, 24, 800, DIM, .85 * a, 'c', track=3)
    text(c, 'APRIL 2026', SX1 - 190, SY + 38, 24, 800, DIM, .85 * a, 'c', track=3)
    # the year-end line
    pu = .5 + .5 * math.sin(t * 2.6)
    c.drawLine(XYE, SY - 26, XYE, SY + SH + 14, paint(WHITE, (.35 + .25 * pu) * a, stroke=10, blur=8))
    c.drawLine(XYE, SY - 26, XYE, SY + SH + 14, paint(WHITE, a, stroke=4))
    text(c, '31 Mar · year ends', XYE, SY + SH + 46, 24, 800, WHITE, a, 'c')
    # region labels
    for x, s1, s2, col, g in ((LX_L, 'P.Y. 2025-26', 'this year', ACC, hl), (LX_R, 'P.Y. 2026-27', 'next year', VIO, hr)):
        text(c, s1, x, SY + SH + 46, 28 + 2 * g, 800, mixc(col, WHITE, .3 * g), a, 'c')
        text(c, s2, x, SY + SH + 76, 24, 700, DIM, a, 'c')
        if g > .02:
            c.drawRRect(rrect(x - 150, SY + SH + 14, 300, 76, 14), paint(col, .55 * g * a, stroke=2.4))

def _glow_sides(t):
    """How much the 'this year' (left) / 'next year' (right) labels glow."""
    pr = win(t, E2 - .1, E2E + .1, .3, .3) * (.5 + .5 * math.sin((t - E2) * 4))
    l = max(seg(t, THIS4 - .3, THIS4 + .2) * (1 - seg(t, CASH4 - .2, CASH4 + .3)), pr * .7)
    r = max(seg(t, NEXT4 - .3, NEXT4 + .2) * (1 - seg(t, E5 - .3, E5 + .2)), (1 - pr) * .7 * win(t, E2, E2E, .3, .3),
            seg(t, RECEIVED5 + .2, RECEIVED5 + .6) * (1 - seg(t, E6 - .5, E6)))
    return l, r

def _pin(c, x, label, col, a, lvl=0):
    if a <= 0: return
    y0 = SY - 70 - lvl * 40
    c.drawLine(x, y0 + 30, x, SY + SH, paint(col, .9 * a, stroke=2.4))
    c.drawCircle(x, SY + SH / 2, 7, paint(col, .5 * a, blur=4)); c.drawCircle(x, SY + SH / 2, 4.5, paint(WHITE, a))
    if label:
        tw = text_w(label, 22, 700) + 22
        c.drawRRect(rrect(x - tw / 2, y0, tw, 32, 6), paint(shade(col, -.7), .92 * a))
        c.drawRRect(rrect(x - tw / 2, y0, tw, 32, 6), paint(col, .95 * a, stroke=1.8))
        text(c, label, x, y0 + 23, 22, 700, WHITE, a, 'c')

def _cake_money(c, t):
    a = _g1_alpha(t)
    if a <= 0: return
    dim = 1 - .6 * seg(t, E5 - .2, E5 + .4)
    # the cake rides in and is delivered on 28 March
    cu = seg(t, DELIVERS - .3, DELIVERS + 1.1, eout)
    if cu > 0:
        cx = lerp(-120, X28, cu)
        cake(c, cx, SY - 4, .5, a * dim, 'wedding')
        ca = a * seg(t, TWENTY1 - .35, TWENTY1 + .05) * dim
        calendar(c, X28 - 190, SY - 140, ca, 28, 'MAR', None, .7, ACC, ang=-4)
        _pin(c, X28, None, ACC, ca)
        text(c, 'cake delivered', X28 - 190, SY - 30, 24, 700, DIM, ca, 'c')
    # the money arrives on 10 April
    mu = seg(t, MONEY1 - .2, MONEY1 + .8, eout)
    if mu > 0:
        mx, my = lerp(1980, X10, mu), lerp(300, SY - 54, mu)
        notes(c, mx, my, a * dim, 3, .62, -8 + 8 * mu)
        ma = a * seg(t, TEN1 - .35, TEN1 + .05) * dim
        calendar(c, X10 + 170, SY - 140, ma, 10, 'APR', None, .7, GOLD, ang=4)
        _pin(c, X10, None, GOLD, ma)
        text(c, 'money arrives', X10 + 170, SY - 30, 24, 700, DIM, ma, 'c')
    # which year?
    qa = a * seg(t, WHICH1 - .2, WHICH1 + .3) * (1 - seg(t, E3 - .3, E3 + .2))
    if qa > 0:
        y = SY + SH + 4
        p = paint(GOLD, .9 * qa, stroke=2.6)
        c.drawLine(X28, y, X28, y + 10, p); c.drawLine(X28, y + 10, X10, y + 10, p); c.drawLine(X10, y + 10, X10, y, p)
        k = .5 + .5 * math.sin(t * 5)
        text(c, '?', (X28 + X10) / 2 - 26, y + 6, 40, 800, GOLD, qa * (.7 + .3 * k), 'c', shadow=6)

# the income token: e2 swings, e4 lands per the switch
def _income(c, t):
    a = _g1_alpha(t) * (1 - .6 * seg(t, E5 - .2, E5 + .4))
    sw = win(t, E2 - .1, E3 + .4, .4, .4)
    if sw > 0:
        q = .5 + .5 * math.sin((t - E2) * 2.6)
        _token(c, lerp(X28, X10, q), 350 - 18 * abs(math.cos((t - E2) * 2.6)), a * sw * (1 - seg(t, MERC4 - .5, MERC4)))
    if t < MERC4 - .2: return
    drop = seg(t, EARNED4 - .2, EARNED4 + .45, ein)
    x = X28; y = lerp(SY - 180, SY + SH / 2 - 2, drop)
    mv = seg(t, ARRIVES4 - .3, ARRIVES4 + .7)
    x = lerp(x, X10, mv); y -= 46 * math.sin(math.pi * mv)
    ta = a * seg(t, MERC4 - .2, MERC4 + .3)
    if drop >= 1 and mv <= 0:
        c.drawCircle(x, y, 80, paint(GOLD, .25 * ta * (1 - seg(t, EARNED4 + .45, EARNED4 + 1.4)), blur=20))
    _token(c, x, y, ta, 'income', GOLD, .9)

def _switch(c, t):
    a = _g1_alpha(t) * seg(t, DEPENDS3 - .2, DEPENDS3 + .4)
    if a <= 0: return
    keysp = [(CASH3 - .25, .5), (CASH3 + .1, 0.), (MERC3 - .2, 0.), (MERC3 + .15, 1.), (CASH4 - .2, 1.), (CASH4 + .2, 0.),
             (WHATEVER5 - .15, 0.), (WHATEVER5 + .15, 1.), (WHATEVER5 + .35, 1.), (WHATEVER5 + .65, 0.)]
    pos = keys(t, keysp) if t > CASH3 - .25 else .5
    x, y = 960, 768
    tw = text_w('Method of accounting', 28, 800); x0 = 960 - (tw + 100) / 2
    text(c, 'Method of accounting', x0, 702, 28, 800, WHITE, a)
    sec(c, x0 + tw + 16, 692, '145', a * seg(t, SEC3 - .2, SEC3 + .3), VIO, 24)
    regime_switch(c, x, y, a, pos, t, .95, left=('Cash', 'when money moves'), right=('Mercantile', 'when earned'))
    ra = a * seg(t, REGULAR3 - .2, REGULAR3 + .3)
    if ra > 0: chip(c, x + 410, y, 'regularly followed', GREEN, ra, 24)

def _subsidy(c, t):
    a = _g1_alpha(t) * seg(t, GOVT5 - .2, GOVT5 + .3)
    if a <= 0: return
    land = seg(t, RECEIVED5 - .4, RECEIVED5 + .1, ein)
    x = lerp(1590, X20, land); y = lerp(334, SY - 64, land)
    wob = (1 - land) * 3 * math.sin(t * 3)
    bill(c, x, y + wob, a, 'Govt. subsidy', None, 'bank', None, .78, -4 * (1 - land), col=GREEN)
    icon(c, 'clock', x + 70, y - 22 + wob, .5, GREEN, a * (1 - land))
    for k, (s_, tt) in enumerate((('subsidy', SUBSIDY5), ('grant', GRANT5), ('cash incentive', INCENT5))):
        ca = a * seg(t, tt - .2, tt + .25, back) * (1 - seg(t, E6 - .5, E6))
        chip(c, (1470, 1600, 1745)[k], 236, s_, GREEN, clamp(ca), 22)
    pa = a * seg(t, RECEIVED5 - .1, RECEIVED5 + .3)
    if pa > 0:
        _pin(c, X20, None, GREEN, pa)
        text(c, 'received', X20, SY - 136, 26, 800, GREEN, pa, 'c')
        sec(c, X20, SY - 184, '145B', pa, VIO, 22, 'c')
        g = win(t, WHATEVER5, WHATEVER5 + 1.6, .1, .6)
        if g > 0: padlock(c, X20 + 128, SY - 64, .55, GREEN, pa * g, 0)

# ---------------------------------------------------------------- e6–e7: section 29 and the machine
MX, MY, MW, MH = 100, 470, 1720, 340
_CEN = machine(None, MX, MY, MW, MH, 0)
LEDGER_ROWS = [('Sales', 24000000, ''), ('Other income', None, 'dim'), ('Expenses', None, 'dim'),
               ('Net profit', 1200000, 'total')]                  # only World figures (turnover, net profit)
LDX, LDY, LDS = 392, 176, .8
STAGE_WORDS = ['start with net profit', "add back what the law doesn't allow", 'deduct what it allows but the books missed',
               "remove other heads' income", 'add deemed income']
STAGE_T = [START7, ADD7, DEDUCT7, REMOVE7, ADD7B]
RANGE = ['31', '32', '35', '36', '37', '38', '40', '40A', '41', '43B']

def _g2_alpha(t): return seg(t, E6 - .2, E6 + .5) * (1 - seg(t, E8 - .55, E8 - .05))

def _active(t):
    if t < START7 - .3: return None
    ks = [(START7 - .3, 0.)]
    for i in range(1, 5): ks += [(STAGE_T[i] - .3, i - 1.), (STAGE_T[i] + .1, float(i))]
    ks += [(DEEMED7 + .4, 4.), (DEEMED7 + .9, 5.)]
    return keys(t, ks)

def _machine(c, t):
    a = _g2_alpha(t)
    if a <= 0: return
    ma = a * seg(t, BIG6 - .3, BIG6 + .4)
    act = _active(t)
    done = {i for i in range(5) if t > STAGE_T[i] + .9} if act is not None else set()
    cen = machine(c, MX, MY, MW, MH, ma, t, active=act, done=done)
    # flow of gold through the pipes up to the active chamber
    if act is not None and ma > 0:
        upto = min(act, 4.)
        P = np.array([(cen[0][0], cen[0][1] - 40)] + [(cen[i][0], cen[i][1] - 40) for i in range(1, 5)] + [cen.port])
        L = arclen(P)[-1]; seglen = (cen[1][0] - cen[0][0])
        frac = clamp((upto * seglen + (seglen * .5 if act > 4 else 0)) / L)
        if frac > .01:
            for k in range(4):
                q = ((t * .6 + k / 4) % 1) * frac
                (px, py), _ = along(P, q * L)
                c.drawCircle(px, py + 40, 11, paint(GOLD, .3 * ma, blur=6))
                c.drawCircle(px, py + 40, 6, paint(GOLD, .9 * ma))
        # the spoken words above each chamber
        for i, s_ in enumerate(STAGE_WORDS):
            wa = ma * seg(t, STAGE_T[i] - .2, STAGE_T[i] + .3) * (1 - seg(t, E8 - .6, E8 - .2))
            if wa <= 0: continue
            hi = clamp(1 - abs(act - i)) if act is not None else 0
            lines = wrap(s_, 24, 270, 700)[:2] if i else [s_]
            yb = MY - 50 if i else MY - 112
            for k, ln in enumerate(lines):
                text(c, ln, cen[i][0], yb + (k - len(lines) + 1) * 28, 24, 700, mixc(DIM, GOLD, hi), wa, 'c')
        pa = ma * seg(t, DEEMED7 + .5, DEEMED7 + 1.0)
        if pa > 0:
            chip(c, cen.port[0] - 6, MY - 40, 'business income', GOLD, pa, 24)

def _sec29(c, t):
    a = _g2_alpha(t) * seg(t, SEC29 - .3, SEC29 + .2) * (1 - seg(t, START6 - .7, START6 - .2))
    if a <= 0: return
    x0 = 830
    w = sec(c, x0, 270, '29', a, VIO, 34)
    text(c, 'business income is worked out under', x0 + w + 20, 282, 30, 700, WHITE, a)
    ra = a * seg(t, SECTIONS6 - .3, SECTIONS6 + .2)
    if ra <= 0: return
    y = 362; xa, xb = 930, 1660
    gu = seg(t, SECTIONS6 - .2, FORTY6 + .5)
    c.drawLine(xa, y, lerp(xa, xb, gu), y, paint(VIO, .7 * ra, stroke=3))
    sec(c, xa, y, '30', ra, VIO, 26, 'r')
    sec(c, xb + 10, y, '43D', ra * seg(t, FORTY6 - .2, FORTY6 + .3), VIO, 26, 'l')
    n = len(RANGE)
    for k, s_ in enumerate(RANGE):
        xx = lerp(xa + 40, xb - 40, k / (n - 1))
        ka = ra * seg(t, SECTIONS6 + .1 + k * .14, SECTIONS6 + .35 + k * .14)
        sec(c, xx, y, s_, ka * .85, VIO, 22, 'c', mark='')

def _ledger(c, t):
    a = _g2_alpha(t) * seg(t, PNL6 - .4, PNL6 + .1)
    if a <= 0: return
    hl = win(t, START6 - .3, START7 + .2, .3, .2)
    drop = seg(t, START7 - .2, START7 + .5, ein)
    hx, hy = _CEN.hopper
    s = lerp(LDS, .12, drop); x = lerp(LDX, hx - 240 * .12, drop); y = lerp(LDY, hy - 30, drop)
    ys, rect = ledger(c, x, y, 480, LEDGER_ROWS, a * (1 - seg(drop, .85, 1)), sub="Meera's Bakehouse · year to 31 Mar 2026",
                      hl={3: hl}, sc=s, size=26)
    fa = a * hl * (1 - drop)
    if fa > 0:
        P = np.array([(LDX + 6, ys[3]), (LDX - 50, ys[3] + 16), (hx + 16, hy - 76), (hx, hy - 12)])
        flowdots(c, catmull(P, step=6), ((t - START6) * .9) % 1, fa, GOLD, 6, 5.)
        text(c, 'only the starting point', LDX + 480 * LDS + 40, ys[3] - 6, 26, 800, GOLD, fa)

# ---------------------------------------------------------------- e8: airport security
BELT_Y, GATE_X, V8 = 650, 900, 300.
BSC = .72
BILLS = [  # title, amount, kind, gate time
    ('Flour', None, 'pass', EVERY8 + 2.0), ('Staff salaries', None, 'pass', EVERY8 + 2.75),
    ('Electricity', None, 'pass', EVERY8 + 3.5), ('Income-tax paid', 120000, 'out', TAKEN8 - .35),
    ('Bonus · paid late', 80000, 'out', TAKEN8 + .4), ('Repairs', None, 'pass', TAKEN8 + 1.1),
    ('Insurance', None, 'pass', UNLIKE8 + .2), ('Advertising', None, 'pass', UNLIKE8 + 1.6),
    ('Flour', None, 'pass', UNLIKE8 + 3.0)]
ADDS = [('Supplier waiver', 35000, 1250, ADDED8 - .1), ('Bad debt recovered', 25000, 1650, NEVER8)]
TRAY = [(530, 352), (710, 352)]
LATER = (1640, 352)

def _bill_state(b, t):
    """(x, y, angle, alpha) of a belt bill at t."""
    title, amt, kind, tg = b
    x = GATE_X + V8 * (t - tg); y = BELT_Y - 58
    if kind == 'out':
        k = [i for i, bb in enumerate(BILLS) if bb[2] == 'out'].index(BILLS.index(b))
        u = seg(t, tg + .1, tg + .75)
        tx, ty = TRAY[k]
        if b[0].startswith('Bonus'):
            v = seg(t, DISALLOWED8 - .1, DISALLOWED8 + .8)
            tx, ty = lerp(tx, LATER[0], v), lerp(ty, LATER[1], v) - 60 * math.sin(math.pi * v)
        if u > 0:
            x0 = GATE_X + V8 * .1
            return lerp(x0, tx, u), lerp(y, ty, u) - 90 * math.sin(math.pi * u), 6 * math.sin(math.pi * u), 1.
    return x, y, 0., 1.

def _security(c, t):
    a = seg(t, E8 - .1, E8 + .45) * (1 - seg(t, E9 - .3, E9 + .3))
    if a <= 0: return
    # the P&L the bills leave from
    ledger(c, 90, 360, 480, LEDGER_ROWS[:3] + [('...', None, 'dim')], a * .95, sc=.42, size=26)
    text(c, 'every item', 190, 344, 24, 700, DIM, a * seg(t, EVERY8 - .2, EVERY8 + .3), 'c')
    state = 0.
    for b in BILLS:
        x = GATE_X + V8 * (t - b[3])
        if b[2] == 'pass' and abs(x - GATE_X) < 80: state = max(state, 1 - abs(x - GATE_X) / 80)
        if b[2] == 'out' and -80 < x - GATE_X < 40 and t < b[3] + .2: state = min(state, -1.)
    conveyor(c, 300, 1840, BELT_Y, a, t, V8, legs=True)
    scanner_back(c, GATE_X, BELT_Y, a, '30 – 43D', state, t, 270, 190)
    # tray + later-year box (behind the flying bills)
    ta = a * seg(t, TAKEN8 - .4, TAKEN8)
    if ta > 0:
        c.drawRRect(rrect(420, 270, 400, 164, 18), paint(RED, .06 * ta))
        p = paint(RED, .7 * ta, stroke=2.2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
        c.drawRRect(rrect(420, 270, 400, 164, 18), p)
        text(c, 'taken out', 620, 258, 26, 800, RED, ta, 'c')
    la = a * seg(t, UNLIKE8 - .2, UNLIKE8 + .4)
    if la > 0:
        ok = seg(t, ALLOWED8 - .2, ALLOWED8 + .3)
        c.drawRRect(rrect(1500, 270, 300, 164, 18), paint(GREEN, (.05 + .1 * ok) * la))
        p = paint(GREEN, .8 * la, stroke=2.2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
        c.drawRRect(rrect(1500, 270, 300, 164, 18), p)
        text(c, 'a later year', 1650, 258, 26, 800, GREEN, la, 'c')
    # belt bills (behind the gate front)
    flying = []
    for b in BILLS:
        x, y, ang, ba = _bill_state(b, t)
        if x < 250 or x > 2000: continue
        on_belt = abs(y - (BELT_Y - 58)) < 1
        fa = a * ba * clamp((x - 250) / 60)
        if on_belt: bill(c, x, y, fa, b[0], b[1], None, None, BSC, ang)
        else: flying.append((x, y, ang, fa, b))
    for (title, amt, x0, td) in ADDS:
        u = seg(t, td - .35, td + .1, ein)
        if u <= 0: continue
        x = x0 + V8 * max(0, t - td - .1); y = lerp(BELT_Y - 260, BELT_Y - 58, u)
        bill(c, x, y, a * clamp(u * 3), title, amt, None, None, BSC, 0, col=GOLD)
        if t < td + 1.6:
            text(c, '+ added', x, y - 76, 26, 800, GOLD, a * win(t, td - .2, td + 1.6, .2, .4), 'c', shadow=5)
    scanner_front(c, GATE_X, BELT_Y, a, '30 – 43D', state, t, 270, 190)
    for (x, y, ang, fa, b) in flying:
        bill(c, x, y, fa, b[0], b[1], None, None, BSC, ang, col=RED if not (b[0].startswith('Bonus') and t > ALLOWED8) else GREEN)
    oa = a * seg(t, ALLOWED8 - .1, ALLOWED8 + .3, back)
    if oa > 0: tick(c, LATER[0] + 128, LATER[1] - 54, clamp(oa), 22)
    pa = a * seg(t, MOST8 - .2, MOST8 + .3) * (1 - seg(t, E9 - .5, E9))
    if pa > 0: text(c, 'most pass', 1420, BELT_Y + 132, 26, 800, GREEN, pa, 'c')
    text(c, '→ PGBP', 1780, BELT_Y + 132, 26, 800, GOLD, a * seg(t, MOST8, MOST8 + .5), 'c')

# ---------------------------------------------------------------- e9: below the check card
def _check(c, t):
    a = seg(t, E9 - .2, E9 + .4) * (1 - seg(t, CE - .5, CE + .3))
    if a <= 0: return
    conveyor(c, 560, 1040, 806, a, t, 60, h=16, legs=False)
    up = seg(t, A_TAKES - .1, A_TAKES + .7)
    bx = 640 + 60 * (min(t, A_TAKES) - E9) * .5
    x = lerp(bx, 1262, up); y = lerp(806 - 40, 776, up) - 80 * math.sin(math.pi * up)
    da = a * seg(t, A_TAKES - .3, A_TAKES + .1)
    if da > 0:
        g = win(t, A_OTHER - .2, CE, .3, .5)
        _box(c, 1190, 734, 560, 84, GREEN, da, .8, .95, glow=.5 * g, r=14)
        text(c, 'Income from other sources', 1350, 786, 26, 800, WHITE, da)
    bill(c, x, y, a, 'Bank interest', 30000, 'bank', None, lerp(.5, .42, up), -8 * up, col=GREEN if up > .5 else ACC)

def ch_e(c, t):
    if t < CS - .5 or t > CE + .5: return
    _years(c, t)
    _cake_money(c, t)
    _subsidy(c, t)
    _income(c, t)
    _switch(c, t)
    _ledger(c, t) if t < START7 - .2 else None
    _machine(c, t)
    _ledger(c, t) if t >= START7 - .2 else None
    _sec29(c, t)
    _security(c, t)
    _check(c, t)
