"""Chapter Y — Doctors and truck owners (sections 44ADA and 44AE).
y1 hook: Kabir (dentist) beside his chair with a "₹60 lakh / year" tag; Ravi with his three trucks rolling into the
   yard (two light trucks behind, a heavy 15-ton truck in front).
y2 two signposts rise: "§ 44ADA · professionals" over Kabir, "§ 44AE · goods carriages" over Ravi.
y3 name (44ADA): Kabir's gross-receipts bar splits in half; the gold half drops as "50% = profit"; chips for
   resident individual / partnership firm (ticked) and LLP (crossed); a grid of specified professions (medical lit).
y4 example: a cash meter at 3% and a receipts dial (needle ₹60 lakh, limit ₹75 lakh) -> income 50% × ₹60 lakh =
   ₹30 lakh (gold); then the cash meter climbs to 8%, the limit drops to ₹50 lakh, the needle is past it ->
   books + TAX AUDIT stamp.
y5 name (44AE): ten parking bays; Ravi's three trucks pull in, bays 4–10 light up to "at most 10, at any time", an
   11th truck is turned away; a year strip of months fills while coins pop per vehicle, per month.
y6 example (hero): Ravi's month grid: two light trucks fill Apr–Mar (12 months, ₹7,500 a month); the heavy truck
   bought 29 Aug: the Aug cell's 3-day sliver fills to a whole month, then Sep–Mar (8 months, 15 t × ₹1,000);
   the sheet: 2 × 12 × ₹7,500 = ₹1,80,000 · 8 × 15 × ₹1,000 = ₹1,20,000 · income ₹3,00,000 (chime).
y7 trap: a truck bought in April but driven from July: the "use" row fills Jul–Mar (9, crossed), the "ownership"
   row Apr–Mar (12, ticked); a magnified August cell: days 29–31 owned -> the whole month counts.
y8 three panels: under 44AE a firm's partners' salary and interest leave the presumptive income (green, "within
   40(b)"); under 44AD and 44ADA the same slips bounce back (red).
y9 check: below the card, Kabir's ₹50 lakh receipts bar with the 50% mark and his ₹22 lakh declared short of it;
   the answer brings "books · 44AA" and "audit · 44AB".
"""
from scenes.common import *
import props as _P

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

def _WA(i, w, d=0.):
    """Word time inside a check's answer cue ('y9a'), falling back to the answer start."""
    try: return Wd(i, w) + d
    except Exception: return TA(i[:-1]) + d

Y1, Y2, Y3, Y4, Y5, Y6, Y7, Y8, Y9 = (T('y%d' % k) for k in range(1, 10))
CS, CE = B.span('y')

KAB1, DENT1, SIXTY1, RAVI1, TRUCKS1 = (W('y1', 'kabir'), W('y1', 'dentist'), W('y1', 'sixty'), W('y1', 'ravi'),
                                       W('y1', 'three trucks'))
PROF2, ADA2, GOODS2, AE2 = W('y2', 'professional'), W('y2', '44ADA'), W('y2', 'goods'), W('y2', '44AE')
ADA3, HALF3, GROSS3, PROF3, RES3, FIRM3, LLP3, SPEC3 = (
    W('y3', '44ADA'), W('y3', 'half'), W('y3', 'gross'), W('y3', 'profit'), W('y3', 'resident'), W('y3', 'firm'),
    W('y3', 'LLP'), W('y3', 'specified'))
SIXTY4, THREE4, SEV4, UNDER4, INC4, THIRTY4, EIGHT4, LIMIT4, FIFTY4, BOOKS4, AUD4 = (
    W('y4', 'sixty'), W('y4', 'three percent'), W('y4', 'seventy'), W('y4', 'under five'), W('y4', 'income'),
    W('y4', 'thirty'), W('y4', 'eight percent'), W('y4', 'limit'), W('y4', 'fifty'), W('y4', 'books'), W('y4', 'audit'))
AE5, OWN5, TEN5, ANY5, FIXED5, VEH5, MON5 = (W('y5', '44AE'), W('y5', 'owning'), W('y5', 'ten'), W('y5', 'any time'),
                                             W('y5', 'fixed'), W('y5', 'vehicle'), W('y5', 'month'))
TWOL6, ALLY6, TWOT6, TWELVE6, SEVEN6, ONEL6, AUG6, FIFT6, AUGM6, EIGHTM6, EIGHTT6, THOU6, ONEL20, TOT6, THREEL6 = (
    W('y6', 'two light'), W('y6', 'all year'), W('y6', 'two times'), W('y6', 'twelve'), W('y6', 'seven thousand'),
    W('y6', 'one lakh eighty'), W('y6', 'twenty nine'), W('y6', 'fifteen ton'), W('y6', 'august to march'),
    W('y6', 'eight months'), W('y6', 'eight times'), W('y6', 'one thousand'), W('y6', 'one lakh twenty'),
    W('y6', 'total'), W('y6', 'three lakh'))
OWNS7, NOTU7, BOUGHT7, DRIVEN7, JUL7, STILL7, APR7B, PART7, WHOLE7 = (
    W('y7', 'ownership'), W('y7', 'not use'), W('y7', 'bought'), W('y7', 'driven'), W('y7', 'july'), W('y7', 'still'),
    W('y7', 'april', 0, 1), W('y7', 'part'), W('y7', 'whole'))
DIFF8, AE8, FIRM8, SAL8, INT8, B40, AD8, ADA8, CANT8 = (
    W('y8', 'difference'), W('y8', '44AE'), W('y8', 'firm'), W('y8', 'salary'), W('y8', 'interest'), W('y8', '40(b)'),
    W('y8', '44AD'), W('y8', '44ADA'), W('y8', 'can t'))
TWENTY9, FIFTY9, ABOVE9 = W('y9', 'twenty two'), W('y9', 'fifty'), W('y9', 'above')
A_BOOKS, A_AUD = _WA('y9a', 'books'), _WA('y9a', 'audited')

for tt, k in ((Y1 - .1, 'whoosh'), (SIXTY1, 'blip'), (TRUCKS1 - .2, 'whoosh'), (PROF2, 'pop'), (GOODS2, 'pop'),
              (HALF3 + .1, 'snip'), (LLP3 + .3, 'error'), (SPEC3, 'pop'),
              (SEV4, 'ok'), (THIRTY4, 'chime_lo'), (EIGHT4 + .2, 'warn'), (FIFTY4 + .2, 'error'), (AUD4 + .25, 'thunk'),
              (OWN5, 'pop'), (TEN5 + 1.05, 'error'),
              (ALLY6, 'tick'), (ONEL6, 'ok'), (AUG6, 'flip'), (AUGM6 + .1, 'tick'), (THREEL6 + .2, 'chime'),
              (STILL7 + .3, 'error'), (WHOLE7, 'ok'),
              (SAL8 + .3, 'ok'), (AD8 + .7, 'error'), (A_BOOKS, 'ok')):
    _ev(tt, k)

_RX = skia.Rect.MakeXYWH
MON = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR']

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.78, glow=0., r=16, stroke=.9):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shader=lgrad((x, y), (x, y + h), [shade(col, -fill), '#0a0f1f']), a=a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, r), paint(col, stroke * a, stroke=2))

def _pill(c, cx, cy, s, col, a, size=30, fill=.2, glow=0., mark=None):
    """A rounded label pill centred at (cx, cy); mark True / False adds a tick / cross on its left."""
    if a <= 0: return 0
    tw = text_w(s, size, 800); ex = size * 1.3 if mark is not None else 0
    w = tw + size * 1.4 + ex; h = size * 1.8; x0 = cx - w / 2
    if glow > 0: c.drawRRect(rrect(x0 - 6, cy - h / 2 - 6, w + 12, h + 12, h / 2 + 6), paint(col, .35 * a * glow, blur=14))
    c.drawRRect(rrect(x0, cy - h / 2 + 5, w, h, h / 2), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(x0, cy - h / 2, w, h, h / 2), paint(shade(col, -.82), .96 * a))
    c.drawRRect(rrect(x0, cy - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(x0, cy - h / 2, w, h, h / 2), paint(col, .95 * a, stroke=2.2))
    if mark is not None: (tick if mark else cross)(c, x0 + size * .95, cy, a, size * .48)
    text(c, s, x0 + ex + (w - ex) / 2, cy + size * .36, size, 800, WHITE, a, 'c')
    return w

def _brace(c, x0, x1, y, col, a, down=True, label=None, size=26):
    if a <= 0: return
    d = -12 if down else 12
    p = skia.Path(); p.moveTo(x0, y + d); p.lineTo(x0, y); p.lineTo(x1, y); p.lineTo(x1, y + d)
    c.drawPath(p, paint(col, .85 * a, stroke=2.4))
    if label: text(c, label, (x0 + x1) / 2, y + (36 if down else -16), size, 700, col, a, 'c', shadow=6)

def _signpost(c, px, ytop, ybot, side, s1, s2, col, a, u, su):
    """A signpost: pole at px from ybot up to ytop (grows with u), an arrow board pointing to side (-1 / +1) with a
    section chip s1 (revealed by su) and a line s2."""
    if a <= 0 or u <= 0: return
    yt = lerp(ybot, ytop, ease(u))
    c.drawRect(skia.Rect(px - 6, yt, px + 6, ybot), paint(shader=lgrad((px - 6, 0), (px + 6, 0), ['#3b4763', '#8a97b3', '#3b4763']), a=a))
    c.drawOval(_RX(px - 34, ybot - 8, 68, 16), paint(BLACK, .4 * a, blur=6))
    ba = a * seg(u, .55, 1)
    if ba <= 0: return
    bw, bh = 330, 104; tip = 34
    x0, x1 = (px + 18, px + 18 + bw) if side > 0 else (px - 18 - bw, px - 18)
    y0 = ytop
    P = (poly(np.array([(x0, y0), (x1, y0), (x1 + tip, y0 + bh / 2), (x1, y0 + bh), (x0, y0 + bh)])) if side > 0 else
         poly(np.array([(x0, y0), (x1, y0), (x1, y0 + bh), (x0, y0 + bh), (x0 - tip, y0 + bh / 2)])))
    c.save(); c.translate(0, 8); c.drawPath(P, paint(BLACK, .4 * ba, blur=12)); c.restore()
    c.drawPath(P, paint(shader=lgrad((0, y0), (0, y0 + bh), [shade(col, -.62), shade(col, -.8)]), a=ba))
    c.drawPath(P, paint(col, .9 * ba, stroke=2.4))
    cx = (x0 + x1) / 2 + (-6 if side > 0 else 6)
    sec(c, cx, y0 + 36, s1, ba * su, VIO, 28, 'c')
    text(c, s2, cx, y0 + 86, 26, 800, WHITE, ba, 'c')

def _partners(c, x, y, s, a, t):
    """Two partner busts side by side (bottom-centre of the pair at (x, y))."""
    person(c, x - 52 * s, y, .42 * s, a, 'staff', t, col='#2563eb', look=.3)
    person(c, x + 52 * s, y, .42 * s, a, 'staff', t, col='#b45309', look=-.3)

# ---------------------------------------------------------------- the cast (continuous across beats)
def _kabir(c, t):
    a = seg(t, KAB1 - .5, KAB1) * (1 - seg(t, Y5 - .3, Y5 + .3))
    if a <= 0: return
    u = seg(t, Y3 - .5, Y3 + .4)
    x = lerp(lerp(-120, 640, seg(t, KAB1 - .6, KAB1 + .3, eout)), 196, u); y = lerp(806, 838, u); s = lerp(1., .82, u)
    person(c, x, y, s, a, 'kabir', t, look=lerp(.5, .45, u), mood=.4 * win(t, THIRTY4 - .2, EIGHT4, .3, .4) - .5 * seg(t, FIFTY4, FIFTY4 + .4))
    lab(c, 'Kabir · dentist', x, y + 44, a * seg(t, DENT1 - .2, DENT1 + .3) * (1 - u), 28, DIM, 700)

def _ravi(c, t):
    a1 = seg(t, RAVI1 - .5, RAVI1) * (1 - seg(t, Y3 - .6, Y3 - .1))
    a2 = seg(t, Y5 + .3, Y5 + .8) * (1 - seg(t, Y7 - .5, Y7 - .05))
    if a1 > 0:
        x = lerp(1960, 1030, seg(t, RAVI1 - .6, RAVI1 + .3, eout))
        person(c, x, 806, 1., a1, 'ravi', t, look=-.3)
        lab(c, 'Ravi · three trucks', x, 850, a1 * seg(t, TRUCKS1, TRUCKS1 + .4), 28, DIM, 700)
    if a2 > 0:
        person(c, 196, 838, .82, a2, 'ravi', t, look=.45, mood=.5 * seg(t, THREEL6, THREEL6 + .5))

# ---------------------------------------------------------------- y1 / y2: the dentist, the trucker, two signposts
def _intro(c, t, a):
    if a <= 0: return
    da = a * seg(t, KAB1 - .4, KAB1 + .2)
    dental_chair(c, 330, 806, .98, da, t, .7 + .3 * math.sin(t * 1.5))
    c.drawLine(110, 808, 880, 808, paint(WHITE, .1 * da, stroke=2))
    ta = a * seg(t, SIXTY1 - .3, SIXTY1 + .3, back)
    if ta > 0: price_tag(c, 560, 520 + 5 * math.sin(t * 2), '₹60 lakh a year', GOLD, ta, 32)
    # Ravi's yard: two light trucks behind, the heavy truck in front
    ya = a * seg(t, RAVI1 - .3, RAVI1 + .2)
    if ya > 0:
        c.drawLine(1240, 612, 1860, 612, paint(WHITE, .08 * ya, stroke=2))
        c.drawLine(1240, 808, 1860, 808, paint(WHITE, .1 * ya, stroke=2))
    for k, (x1, y1, s, kind, dt) in enumerate(((1440, 610, .5, 'light', 0.), (1720, 610, .5, 'light', .35),
                                              (1580, 806, .66, 'heavy', .7))):
        t0 = TRUCKS1 - .9 + dt
        u = seg(t, t0, t0 + 1.4, eout)
        if u <= 0: continue
        x = lerp(2150, x1, u)
        truck(c, x, y1, s, a * seg(t, t0, t0 + .3), kind, ORANGE, '15 t' if kind == 'heavy' else None, t, -(2150 - x) * 1.2)
    # y2: the two shortcuts as signposts
    u1 = seg(t, PROF2 - .4, PROF2 + .5); u2 = seg(t, GOODS2 - .4, GOODS2 + .5)
    _signpost(c, 840, 330, 808, -1, '44ADA', 'professionals', VIO, a, u1, seg(t, ADA2 - .3, ADA2 + .2))
    _signpost(c, 1290, 330, 808, 1, '44AE', 'goods carriages', VIO, a, u2, seg(t, AE2 - .3, AE2 + .2))

# ---------------------------------------------------------------- y3: 44ADA — half the receipts
RB0, RB1, RBY, RBH = 380, 1300, 400, 84
PROFS = [('tooth', 'Medical'), ('scale', 'Legal'), ('compass', 'Architecture'), ('gear', 'Engineering'),
         ('calc', 'Accountancy'), ('house', 'Interior decoration')]

def _ada(c, t, a):
    if a <= 0: return
    text(c, 'Professionals', 380, 318, 40, 800, WHITE, a * seg(t, Y3 - .2, Y3 + .3), 'l', shadow=8)
    sec(c, 380 + text_w('Professionals', 40, 800) + 24, 304, '44ADA', a * seg(t, ADA3 - .2, ADA3 + .3, back), size=30)
    ga = a * seg(t, Y3, Y3 + .5)
    W_ = RB1 - RB0; xm = RB0 + W_ / 2
    sp = seg(t, HALF3 - .2, HALF3 + .4); dr = seg(t, PROF3 - .5, PROF3 + .3)
    gap = 12 * sp
    for k, (x0, x1) in enumerate(((RB0, xm - gap / 2), (xm + gap / 2, RB1))):
        if sp <= 0 and k == 1: continue
        if sp <= 0: x1 = RB1
        col = GOLD if (k == 0 and sp > 0) else ACC
        yy = RBY + (150 * ease(dr) if k == 0 else 0)
        r0 = rrect(x0, yy, x1 - x0, RBH, 14)
        c.drawRRect(rrect(x0, yy + 8, x1 - x0, RBH, 14), paint(BLACK, .4 * ga, blur=12))
        c.drawRRect(r0, paint(mixc(shade(ACC, -.35), shade(col, -.3), sp if k == 0 else 0), .92 * ga))
        if k == 1: c.drawRRect(r0, paint('#0b1226', .45 * ga * dr))
        c.save(); c.clipRRect(r0, True)
        hx = x0 + ((t * 220 + 260 * k) % (x1 - x0 + 200)) - 100
        c.drawRect(skia.Rect(hx - 50, yy, hx + 50, yy + RBH), paint(WHITE, .1 * ga, blur=14))
        c.restore()
        c.drawRRect(r0, paint(mixc(ACC, col, sp), .85 * ga, stroke=2))
    text(c, 'Gross receipts', RB0 + 24, RBY + RBH / 2 + 11, 32, 800, WHITE, ga * (1 - dr), 'l')
    if sp > 0:
        p = paint(GOLD, .9 * ga * (1 - dr), stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], (t * 30) % 18))
        c.drawLine(xm, RBY - 20, xm, RBY + RBH + 20, p)
        text(c, '½', xm, RBY - 30, 34, 800, GOLD, ga * (1 - dr), 'c')
    if dr > 0:
        text(c, '50% = profit', RB0 + 24, RBY + 150 + RBH / 2 + 12, 34, 800, '#1a1305', ga * dr, 'l')
    # who: resident individual, firm ✓, LLP ✗
    px = 380
    for k, (nm, tt, ok) in enumerate((('Resident individual', RES3, True), ('Partnership firm', FIRM3, True), ('LLP', LLP3, False))):
        pw = text_w(nm, 28, 800) + 28 * 2.7
        pa = a * seg(t, tt - .3, tt + .2, back)
        if pa > 0: _pill(c, px + pw / 2, 720, nm, GREEN if ok else RED, pa, 28, .16, mark=ok)
        px += pw + 26

def _profs(c, t, a):
    if a <= 0: return
    ha = a * seg(t, SPEC3 - .3, SPEC3 + .2)
    text(c, 'specified professions', 1600, 452, 28, 800, GOLD, ha, 'c', shadow=6)
    for k, (ic, nm) in enumerate(PROFS):
        tt = SPEC3 - .2 + .12 * k
        ta = a * seg(t, tt, tt + .35)
        if ta <= 0: continue
        x = 1376 + (k % 2) * 236; y = 476 + (k // 2) * 116
        tile(c, x, y, 224, 104, ic, nm, ta, GOLD if k == 0 else ACC, None, 22,
             glow=(.8 if k == 0 else 0) * win(t, tt + .2, tt + 2.5, .3, .6))

# ---------------------------------------------------------------- y4: Kabir's numbers
GX4, GY4, GR4 = 800, 790, 200

def _kabir_calc(c, t, a):
    if a <= 0: return
    ma = a * seg(t, THREE4 - .4, THREE4)
    cv = lerp(.03 * seg(t, THREE4 - .3, THREE4 + .4, eout), .08, seg(t, EIGHT4 - .1, EIGHT4 + .7))
    if ma > 0: meter(c, 380, 330, 620, ma, cv, .05, 'Cash receipts', '{:.0%}', .15, 26, '{:.0%}')
    ga = a * seg(t, SIXTY4 - .4, SIXTY4 + .1)
    if ga > 0:
        bad = seg(t, FIFTY4 - .1, FIFTY4 + .5)
        lim = lerp(7.5e6, 5e6, seg(t, FIFTY4 - .2, FIFTY4 + .6))
        la = seg(t, SEV4 - .3, SEV4 + .3)
        val = 6e6 * seg(t, SIXTY4 - .3, SIXTY4 + .9, eout)
        gauge(c, GX4, GY4, GR4, ga, val, 0, 1e7, ((0, '0'), 5e6, 7.5e6, (1e7, '₹1 crore')),
              '', lim if la > 0 else None, None, ((0, lim, GREEN),) if la > 0 else (), RED if bad > .5 else ACC)
        text(c, 'Gross receipts', 380, 572, 26, 700, DIM, ga, 'l')
        text(c, inr(6e6), 380, 616, 40, 800, GOLD, ga, 'l', shadow=6)
        if la > 0:
            an = math.pi + math.pi * lim / 1e7
            lx, ly = GX4 + math.cos(an) * GR4 * 1.3, GY4 + math.sin(an) * GR4 * 1.3
            al = 'l' if math.cos(an) > .3 else 'c'
            if al == 'c': ly -= 14
            text(c, 'limit ' + inr(7.5e6), lx, ly, 28, 800, GREEN, ga * la * (1 - bad), al, shadow=6)
            text(c, 'limit ' + inr(5e6), lx, ly, 28, 800, RED, ga * bad, al, shadow=6)
    # the result card
    ra = a * seg(t, INC4 - .4, INC4 + .1)
    if ra > 0:
        bad = seg(t, EIGHT4 - .2, EIGHT4 + .4)
        old, new = 1 - seg(t, EIGHT4 - .35, EIGHT4 - .05), seg(t, EIGHT4 - .05, EIGHT4 + .35)
        x, y, w, h = 1240, 360, 590, 440
        _box(c, x, y, w, h, mixc(GOLD, RED, bad), ra, .84, win(t, THIRTY4, THIRTY4 + 1.8, .3, .6) * .7, 20)
        oa = ra * old
        if oa > 0:
            sec(c, x + 34, y + 52, '44ADA', oa, size=24)
            tick(c, x + w - 50, y + 52, oa * seg(t, UNDER4 - .2, UNDER4 + .3, back), 20)
            text(c, 'Income  =  50% × ₹60 lakh', x + 34, y + 150, 34, 800, WHITE, oa, 'l')
            text(c, inr(3e6), x + w / 2, y + 290, 84, 800, GOLD, oa * seg(t, THIRTY4 - .2, THIRTY4 + .3), 'c', shadow=10)
            text(c, 'cash 3%, within 5% · limit ₹75 lakh', x + 34, y + 390, 24, 700, DIM, oa, 'l')
        if new > 0:
            text(c, 'If 8% came in cash', x + 34, y + 70, 30, 800, RED, ra * new, 'l')
            text(c, 'limit ₹50 lakh: ₹60 lakh is over it', x + 34, y + 120, 28, 700, WHITE,
                 ra * new * seg(t, FIFTY4 - .2, FIFTY4 + .3), 'l')
            ka = ra * new * seg(t, BOOKS4 - .4, BOOKS4)
            if ka > 0:
                book(c, x + 140, y + 290, ka, 'Books of account', BLUE, .5)
                text(c, 'books', x + 140, y + 410, 28, 800, WHITE, ka, 'c', shadow=6)
            ua = ra * new * seg(t, AUD4 - .3, AUD4)
            if ua > 0:
                stamp(c, x + 400, y + 290, 'TAX AUDIT', ACC, ua, seg(t, AUD4 - .25, AUD4 + .7, linr), -9, 38)
                text(c, 'audit', x + 400, y + 410, 28, 800, WHITE, ua, 'c', shadow=6)

# ---------------------------------------------------------------- y5: 44AE — ten carriages, a fixed amount a month
BX5, BW5, BG5, BY5, BH5 = 370, 124, 10, 430, 170

def _fleet(c, t, a):
    if a <= 0: return
    text(c, 'Goods carriages', 380, 318, 40, 800, WHITE, a * seg(t, Y5, Y5 + .4), 'l', shadow=8)
    sec(c, 380 + text_w('Goods carriages', 40, 800) + 24, 304, '44AE', a * seg(t, AE5 - .1, AE5 + .4, back), size=30)
    lit = [seg(t, TEN5 - .1 + .07 * k, TEN5 + .2 + .07 * k) for k in range(10)]
    for k in range(11):
        x = BX5 + k * (BW5 + BG5); ba = a * seg(t, Y5 + .2 + .04 * k, Y5 + .5 + .04 * k)
        if ba <= 0: continue
        if k == 10:
            ba *= seg(t, TEN5 + .7, TEN5 + 1.0)
            if ba <= 0: continue
            col = RED
        else:
            col = mixc('#475569', ACC, lit[k] if k >= 3 else 1.)
        p = paint(col, .85 * ba, stroke=2.2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 8], 0))
        c.drawRRect(rrect(x, BY5, BW5, BH5, 12), paint(col, .06 * ba))
        c.drawRRect(rrect(x, BY5, BW5, BH5, 12), p)
        text(c, str(k + 1), x + BW5 / 2, BY5 + 34, 24, 800, col, ba, 'c')
    # three trucks pull in
    for k in range(3):
        t0 = OWN5 - .5 + .25 * k
        u = seg(t, t0, t0 + .7, eout)
        if u <= 0: continue
        x = BX5 + k * (BW5 + BG5) + BW5 / 2
        icon(c, 'truck', x, BY5 + 106 + 70 * (1 - u), 1.3, ORANGE, a * u, 3.6)
    # the 11th is turned away
    ea = a * seg(t, TEN5 + .7, TEN5 + 1.0)
    if ea > 0:
        x = BX5 + 10 * (BW5 + BG5) + BW5 / 2
        bk = seg(t, TEN5 + 1.0, TEN5 + 1.6, eout)
        icon(c, 'truck', x, BY5 + 106 + 90 * bk, 1.3, RED, ea * (1 - .6 * bk), 3.6)
        cross(c, x, BY5 + 70, ea * seg(t, TEN5 + 1.0, TEN5 + 1.3, back), 22)
    ca = a * seg(t, TEN5 + .2, TEN5 + .6)
    if ca > 0:
        _pill(c, BX5 + 5 * (BW5 + BG5) - BG5 / 2, BY5 - 36, 'at most 10 goods carriages', GOLD, ca, 26)
    # a year of months: coins per vehicle, per month
    ya = a * seg(t, ANY5 - .3, ANY5 + .2)
    if ya > 0:
        yx0, yx1, yy = BX5, BX5 + 10 * (BW5 + BG5) - BG5, 660
        mw = (yx1 - yx0) / 12
        fillu = seg(t, MON5 - .4, MON5 + 1.4, linr)
        scan = (t - ANY5) * .35 % 1
        for m in range(12):
            x = yx0 + m * mw
            on = clamp(fillu * 12 - m)
            c.drawRRect(rrect(x + 2, yy, mw - 4, 46, 8), paint(mixc('#0d1530', GOLD, .35 * on), .95 * ya))
            c.drawRRect(rrect(x + 2, yy, mw - 4, 46, 8), paint(mixc(ACC, GOLD, on), .6 * ya, stroke=1.6))
            text(c, MON[m], x + mw / 2, yy + 31, 22, 800, WHITE if on else DIM, ya, 'c')
        if fillu <= 0:
            sx = yx0 + scan * (yx1 - yx0)
            c.drawRect(skia.Rect(sx - 3, yy - 8, sx + 3, yy + 54), paint(GOLD, .8 * ya, blur=2))
        text(c, 'at any time in the year', yx0, yy + 84, 26, 700, DIM, ya * (1 - seg(t, FIXED5 - .3, FIXED5)), 'l')
        fa = a * seg(t, FIXED5 - .3, FIXED5 + .2)
        if fa > 0:
            text(c, 'a fixed amount per vehicle, per month', yx0, yy + 84, 28, 800, GOLD, fa, 'l')
        # coins pop over the trucks as months tick
        if fillu > 0:
            m = int(fillu * 12 - 1e-6); f = fillu * 12 - m
            for k in range(3):
                x = BX5 + k * (BW5 + BG5) + BW5 / 2
                ca_ = ya * win(f, 0, 1, .15, .5) * (1 if fillu < 1 else 0)
                coin(c, x, BY5 + 52 - 26 * f, 15, ca_)

# ---------------------------------------------------------------- y6: Ravi's month grid + the sheet
GX0, GCW, GCG, GY0, GRH, GCH = 380, 60, 4, 352, 96, 76
ROWS6G = [('light', 'Light 1'), ('light', 'Light 2'), ('heavy', 'Heavy · 15 t')]
SX6, SY6, SW6 = 1176, 296, 664
TITLE6 = 'Ravi · sec 44AE'
ROWS6 = [{'label': 'Light · 2 × 12 × ₹7,500', 'amt': None, 'kind': 'add', 't0': TWOT6 - .2},
         {'label': '₹7,500 per vehicle per month', 'kind': 'note', 't0': SEVEN6 - .2},
         {'label': 'Heavy · 8 × 15 × ₹1,000', 'amt': None, 'kind': 'add', 't0': EIGHTT6 - .2},
         {'label': '₹1,000 per ton per month', 'kind': 'note', 't0': THOU6 - .2},
         {'label': 'Income u/s 44AE', 'amt': 300000, 'kind': 'total', 't0': THREEL6 - .45}]
MAN6 = {0: (180000, ONEL6 - .15), 2: (120000, ONEL20 - .15)}

def _cell(c, x, y, w, h, col, a, fill, frac_from=0.):
    """A month cell; fill 0..1 of it coloured (from frac_from to the right edge when frac_from > 0)."""
    c.drawRRect(rrect(x, y, w, h, 8), paint('#0d1530', .95 * a))
    if fill > 0:
        c.save(); c.clipRRect(rrect(x, y, w, h, 8), True)
        x0 = x + w * frac_from
        c.drawRect(skia.Rect(x0 - (x0 - x) * fill if frac_from > 0 else x, y, x + w * (fill if frac_from <= 0 else 1), y + h),
                   paint(shader=lgrad((0, y), (0, y + h), [shade(col, -.05), shade(col, -.35)]), a=a))
        c.restore()
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, 8), paint(col if fill > 0 else '#334155', .75 * a, stroke=1.6))

def _grid(c, t, a):
    if a <= 0: return
    ha = a * seg(t, Y6 - .2, Y6 + .4)
    for m in range(12):
        text(c, MON[m], GX0 + m * (GCW + GCG) + GCW / 2, GY0 - 14, 22, 800, DIM, ha, 'c')
    for r, (kind, nm) in enumerate(ROWS6G):
        t0 = TWOL6 - .3 + .2 * r if kind == 'light' else AUG6 - .2
        ra = a * seg(t, t0, t0 + .4)
        if ra <= 0: continue
        y = GY0 + r * GRH
        truck(c, 150, y + 56, .2 if kind == 'light' else .15, ra, kind, ORANGE)
        text(c, nm, 200, y + 34, 24, 800, WHITE, ra, 'l')
        if kind == 'light':
            fu = seg(t, ALLY6 - .1 + .15 * r, ALLY6 + 1.0 + .15 * r, linr)
            for m in range(12):
                f = clamp(fu * 12 - m)
                gl = win(t, SEVEN6 + .06 * m, SEVEN6 + .5 + .06 * m, .15, .3)
                _cell(c, GX0 + m * (GCW + GCG), y + 4, GCW, GCH, mixc(ORANGE, GOLD, gl), ra, f)
                if gl > 0: text(c, '₹', GX0 + m * (GCW + GCG) + GCW / 2, y + 54, 30, 800, WHITE, ra * gl, 'c')
            na = ra * seg(t, TWELVE6 - .3, TWELVE6 + .2)
            text(c, '12 months', 200, y + 66, 24, 700, ORANGE, na, 'l')
        else:
            sl = seg(t, AUG6 - .1, AUG6 + .4)                         # the 29–31 Aug sliver
            fullaug = seg(t, AUGM6 - .2, AUGM6 + .3)
            rest = seg(t, AUGM6 + .2, EIGHTM6 + .1, linr)
            for m in range(12):
                x = GX0 + m * (GCW + GCG)
                if m < 4:
                    p = paint('#334155', .8 * ra, stroke=1.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([6, 6], 0))
                    c.drawRRect(rrect(x, y + 4, GCW, GCH, 8), p)
                elif m == 4:
                    c.drawRRect(rrect(x, y + 4, GCW, GCH, 8), paint('#0d1530', .95 * ra))
                    c.save(); c.clipRRect(rrect(x, y + 4, GCW, GCH, 8), True)
                    fw = lerp(GCW * 3 / 31 * sl, GCW, ease(fullaug))
                    c.drawRect(skia.Rect(x + GCW - fw, y + 4, x + GCW, y + 4 + GCH), paint(shade(VIO, -.2 + .2 * fullaug), ra))
                    c.restore()
                    c.drawRRect(rrect(x + .5, y + 4.5, GCW - 1, GCH - 1, 8), paint(VIO, .9 * ra, stroke=1.8))
                else:
                    _cell(c, x, y + 4, GCW, GCH, VIO, ra, clamp(rest * 7 - (m - 5)))
            gl = win(t, THOU6, THOU6 + 1.4, .2, .5)
            if gl > 0:
                for m in range(4, 12):
                    text(c, '15 t', GX0 + m * (GCW + GCG) + GCW / 2, y + 52, 20, 800, WHITE, ra * gl, 'c')
            na = ra * seg(t, EIGHTM6 - .3, EIGHTM6 + .2)
            text(c, '8 months', 200, y + 66, 24, 700, VIO, na, 'l')
    # 29 August: the heavy truck arrives
    ca = a * seg(t, AUG6 - .4, AUG6 + .1, back)
    if ca > 0:
        calendar(c, 520, 726, ca, 29, 'AUG', 2025, .52, VIO)
        lab(c, 'bought 29 Aug', 520, 822, ca, 24, VIO, 800)
        P = np.array([(560, 660), (GX0 + 4 * (GCW + GCG) + GCW - 8, GY0 + 2 * GRH + GCH + 8)])
        link(c, tuple(P[0]), tuple(P[1]), VIO, .6 * ca, seg(t, AUG6, AUG6 + .5), True, 2.4, 12)
    hv = seg(t, FIFT6 - .5, FIFT6 + .9, eout)
    if hv > 0:
        x = lerp(1240, 880, hv)
        truck(c, x, 808, .46, a * seg(t, FIFT6 - .5, FIFT6 - .2), 'heavy', ORANGE, '15 t', t, (1240 - x) * 1.3)
    pa = a * win(t, AUGM6 - .2, EIGHTM6 + 1.2, .3, .5)
    if pa > 0: _pill(c, 1000, 680, 'August counts in full', VIO, pa, 24)
    # the sheet
    sa = a * seg(t, TWOT6 - .6, TWOT6 - .1)
    sheet(c, SX6, SY6, SW6, ROWS6, sa, t, TITLE6, GOLD, title_r='A.Y. 2026-27')
    for i, (val, tt) in MAN6.items():
        r = ROWS6[i]; ra = sa * seg(t, r['t0'], r['t0'] + .45, eout)
        if ra <= 0 or t < tt: continue
        cy = sheet_row_y(SX6, SY6, ROWS6, i, 0, TITLE6)
        roll(c, val, SX6 + SW6 - 30, cy + 33 * .36, seg(t, tt, tt + .8, linr), 33, WHITE, ra)

# ---------------------------------------------------------------- y7: ownership, not use · part month = whole month
UX0, UCW, UCG, UY_USE, UY_OWN, UCH = 430, 98, 8, 404, 520, 76

def _owner(c, t, a):
    if a <= 0: return
    hu = seg(t, NOTU7 - .2, NOTU7 + .3); ho = seg(t, OWNS7 - .2, OWNS7 + .3)
    dead = seg(t, STILL7 - .1, STILL7 + .5)
    for row, (yy, nm, col, hl) in enumerate(((UY_USE, 'Months of use', ORANGE, hu), (UY_OWN, 'Months of ownership', GREEN, ho))):
        ra = a * seg(t, Y7 - .2 + .2 * row, Y7 + .2 + .2 * row)
        if ra <= 0: continue
        text(c, nm, 120, yy + 48, 28, 800, mixc(WHITE, col, hl), ra * (1 - .5 * dead * (row == 0)), 'l')
        for m in range(12):
            x = UX0 + m * (UCW + UCG)
            if row == 1: f = clamp(seg(t, APR7B - 3.2, APR7B - 2.2, linr) * 12 - m)     # bought in April -> Apr..Mar
            else: f = clamp(seg(t, JUL7 - .1, JUL7 + 1.3, linr) * 9 - (m - 3)) if m >= 3 else 0.
            _cell(c, x, yy, UCW, UCH, col, ra * (1 - .55 * dead * (row == 0)), f)
            text(c, MON[m], x + UCW / 2, yy + 47, 22, 800, WHITE if f > .5 else DIM, ra * (1 - .4 * dead * (row == 0)), 'c')
        if row == 0:
            n9 = ra * seg(t, JUL7 + 1.2, JUL7 + 1.5)
            text(c, '9', UX0 + 12 * (UCW + UCG) + 30, yy + 52, 40, 800, ORANGE, n9 * (1 - .5 * dead), 'c')
            if dead > 0:
                cross(c, UX0 + 12 * (UCW + UCG) + 30, yy + 38, ra * dead, 26)
                c.drawLine(UX0 - 10, yy + UCH / 2, UX0 + 12 * (UCW + UCG) - 2, yy + UCH / 2, paint(RED, .8 * ra * dead, stroke=3))
        else:
            n12 = ra * seg(t, APR7B - 2.2, APR7B - 1.9)
            text(c, '12', UX0 + 12 * (UCW + UCG) + 30, yy + 52, 40, 800, GREEN, n12, 'c', shadow=6)
            if dead > 0: tick(c, UX0 + 12 * (UCW + UCG) + 30, yy + UCH + 22, ra * dead, 18)
    # the truck: bought in April (parked over April), driven from July
    ta = a * seg(t, BOUGHT7 - .4, BOUGHT7)
    if ta > 0:
        du = seg(t, JUL7 - .2, JUL7 + 1.4, linr)
        x0 = UX0 + UCW / 2 + 10; xj = UX0 + 3 * (UCW + UCG) + UCW / 2; x1 = UX0 + 11 * (UCW + UCG) + UCW / 2
        x = lerp(x0, xj, seg(t, DRIVEN7 - .3, JUL7 - .1)) if du <= 0 else lerp(xj, x1, du)
        truck(c, x, UY_USE - 8, .36, ta, 'light', ORANGE, None, t, x * 1.2)
        ka = a * seg(t, BOUGHT7 - .2, BOUGHT7 + .3, back)
        _pill(c, UX0 + UCW / 2, UY_OWN + UCH + 40, 'bought · April', GREEN, ka, 22)
        da = a * seg(t, DRIVEN7 - .2, DRIVEN7 + .3, back)
        _pill(c, xj, UY_USE - 136, 'first driven · July', ORANGE, da, 22)
    # part of a month = the whole month
    pa = a * seg(t, PART7 - .4, PART7 + .1)
    if pa > 0:
        x, y, w, h = 560, 690, 800, 110
        _box(c, x - 30, y - 20, w + 60, h + 20, VIO, pa, .84, 0, 18, .6)
        text(c, 'AUGUST', x, y + 22, 24, 800, VIO, pa, 'l', track=2)
        whole = seg(t, WHOLE7 - .3, WHOLE7 + .4)
        dw = (w - 30 * 2) / 31
        for d in range(31):
            dx = x + d * (dw + 2)
            owned = d >= 28
            col = mixc(VIO if owned else '#334155', GOLD, whole)
            c.drawRRect(rrect(dx, y + 40, dw, 58, 4), paint(col, (.85 if owned or whole > 0 else .5) * pa * (1 if owned else max(.5, whole))))
        text(c, 'owned from 29 Aug', x + w, y + 22, 24, 800, VIO, pa * (1 - whole), 'r')
        text(c, '= 1 full month', x + w, y + 22, 26, 800, GOLD, pa * whole, 'r', shadow=6)

# ---------------------------------------------------------------- y8: partners' salary & interest
def _panel8(c, t, a, x, y, w, h, s_, ok, t0, big, fa=1.):
    _box(c, x, y, w, h, ACC, fa, .84, 0, 18, .55)
    if a <= 0: return
    sec(c, x + 26, y + 40, s_, a, size=28 if big else 26)
    text(c, 'a firm', x + w - 26, y + 48, 26, 700, DIM, a, 'r')
    _partners(c, x + (130 if big else w / 2), y + 220, 1.0 if big else .8, a, t)
    # the presumptive income box
    ix, iy, iw, ih = (x + 260, y + 100, w - 290, 120) if big else (x + 24, y + 240, w - 48, 90)
    c.drawRRect(rrect(ix, iy, iw, ih, 14), paint(GOLD, .1 * a)); c.drawRRect(rrect(ix, iy, iw, ih, 14), paint(GOLD, .8 * a, stroke=2))
    text(c, 'presumptive income', ix + iw / 2, iy + (ih / 2 + 10 if big else ih / 2 + 9), 28 if big else 24, 800, GOLD, a, 'c')
    # salary + interest slips
    for k, nm in enumerate(("Partners' salary", 'Interest')):
        tt = t0 + .45 * k
        sa = a * seg(t, tt - .3, tt)
        if sa <= 0: continue
        if big:
            u = seg(t, tt, tt + .7, eout)
            bx = ix + 120 + k * 250; by = lerp(iy + ih / 2, iy + ih + 140, u)
            bill(c, bx, by, sa, nm, None, None, None, .66, -4 + 8 * k, GREEN)
            if u > .3:
                text(c, '−', bx - 104, by + 14, 40, 800, GREEN, sa * u, 'c')
                tick(c, bx + 66, by - 38, sa * seg(t, tt + .5, tt + .8, back), 17)
        else:
            u = seg(t, tt, tt + .35, eout); bk = seg(t, tt + .35, tt + .8, eout)
            bx = x + w / 2 + (k - .5) * 160; by = lerp(iy + ih + 80, iy + ih + 30, u) + 50 * bk
            bill(c, bx, by, sa, nm, None, None, None, .56, -8 + 16 * k + 10 * bk, RED)
            cross(c, bx + 52, by - 34, sa * seg(t, tt + .3, tt + .6, back), 16)

def _firms(c, t, a):
    if a <= 0: return
    fr = [a * seg(t, Y8 - .2 + .2 * k, Y8 + .3 + .2 * k) for k in range(3)]
    text(c, "Partners' salary and interest", 120, 258, 34, 800, WHITE, a * seg(t, Y8 - .1, Y8 + .4), 'l', shadow=8)
    _panel8(c, t, a * seg(t, AE8 - .5, AE8), 120, 290, 900, 520, '44AE', True, SAL8 - .2, True, fr[0])
    ba = a * seg(t, B40 - .3, B40 + .2, back)
    if ba > 0: _pill(c, 570, 760, 'within the limits of section 40(b)', VIO, ba, 24)
    for k, (x, s_, tt) in enumerate(((1070, '44AD', AD8), (1470, '44ADA', ADA8))):
        _panel8(c, t, a * seg(t, tt - .4, tt + .1), x, 290, 360, 520, s_, False, tt + .25, False, fr[1 + k])
        na = a * seg(t, tt + .7, tt + 1.1)
        if na > 0: text(c, 'no deduction', x + 180, 784, 28, 800, RED, na, 'c', shadow=6)

# ---------------------------------------------------------------- y9: check — below the card
def _check(c, t, a):
    if a <= 0: return
    person(c, 420, 852, .48, a * seg(t, Y9 - .2, Y9 + .4), 'kabir', t, look=.4)
    x0, x1, y, h = 560, 1140, 772, 36
    tr = a * seg(t, Y9, Y9 + .5)
    if tr > 0:
        c.drawRRect(rrect(x0, y, x1 - x0, h, h / 2), paint('#0b1226', .95 * tr))
        c.drawRRect(rrect(x0, y, x1 - x0, h, h / 2), paint(ACC, .6 * tr, stroke=1.6))
    ba = a * seg(t, FIFTY9 - .4, FIFTY9)
    if ba > 0:
        text(c, 'receipts ' + inr(5e6), x1, y - 14, 24, 700, DIM, ba, 'r')
        xm = (x0 + x1) / 2
        c.drawLine(xm, y - 8, xm, y + h + 8, paint(GOLD, ba, stroke=3))
        text(c, '50%', xm, y - 14, 22, 800, GOLD, ba, 'c')
    da = a * seg(t, TWENTY9 - .3, TWENTY9 + .1)
    if da > 0:
        f = seg(t, TWENTY9 - .2, TWENTY9 + .8, eout) * .44
        c.save(); c.clipRRect(rrect(x0, y, x1 - x0, h, h / 2), True)
        c.drawRect(skia.Rect(x0, y, x0 + (x1 - x0) * f, y + h), paint(RED, .85 * da))
        hx = x0 + ((t * 120) % ((x1 - x0) * .44 + 120)) - 60
        c.drawRect(skia.Rect(hx - 30, y, hx + 30, y + h), paint(WHITE, .12 * da, blur=8))
        c.restore()
        xm = (x0 + x1) / 2; pu = .5 + .5 * math.sin(t * 2.4)
        c.drawLine(xm, y - 8, xm, y + h + 8, paint(GOLD, .5 * da * pu, stroke=8, blur=6))
        text(c, 'declared ' + inr(2.2e6), x0, y - 14, 24, 800, RED, da, 'l')
    ia = a * seg(t, ABOVE9 - .3, ABOVE9 + .2)
    if ia > 0: text(c, 'income above the exemption limit', x0, y + h + 30, 22, 700, DIM, ia, 'l')
    for k, (ic, nm, s_, tt) in enumerate((('doc', 'Keep books', '44AA', A_BOOKS), ('shield', 'Audit', '44AB', A_AUD))):
        ka = a * seg(t, tt - .2, tt + .3, back)
        if ka <= 0: continue
        x = 1230 + k * 310
        _box(c, x, 740, 280, 90, GREEN, ka, .82, 0, 16)
        icon(c, ic, x + 40, 785, .55, GREEN, ka)
        text(c, nm, x + 76, 778, 26, 800, WHITE, ka, 'l')
        sec(c, x + 76, 808, s_, ka, size=20)

# ---------------------------------------------------------------- the chapter
def ch_y(c, t):
    _intro(c, t, seg(t, CS - .3, Y1 + .2) * (1 - seg(t, Y3 - .6, Y3 - .1)))
    _ada(c, t, seg(t, Y3 - .4, Y3 + .2) * (1 - seg(t, Y4 - .5, Y4 - .05)))
    _profs(c, t, seg(t, SPEC3 - .4, SPEC3) * (1 - seg(t, SIXTY4 - .2, SIXTY4 + .4)))
    _kabir_calc(c, t, seg(t, Y4 - .2, Y4 + .3) * (1 - seg(t, Y5 + .3, Y5 + .9)))
    _fleet(c, t, seg(t, Y5 + .2, Y5 + .8) * (1 - seg(t, Y6 - .5, Y6 - .05)))
    _grid(c, t, seg(t, Y6 - .45, Y6 + .2) * (1 - seg(t, Y7 - .5, Y7 - .05)))
    _owner(c, t, seg(t, Y7 - .45, Y7 + .2) * (1 - seg(t, Y8 - .5, Y8 - .05)))
    _firms(c, t, seg(t, Y8 - .45, Y8 + .2) * (1 - seg(t, Y9 - .5, Y9 - .05)))
    _check(c, t, seg(t, Y9 - .3, Y9 + .2))
    _kabir(c, t)
    _ravi(c, t)
