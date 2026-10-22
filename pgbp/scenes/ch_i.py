"""Chapter I — The 180-day rule, written down value worked (hero).
A year bar 1 Apr 2025 – 31 Mar 2026 runs across the top half (it glides up once the working starts); interval lanes
under it show how long each asset is used; the P&M tank and the computation sheet sit below.
i1 hook: the mixer and a "20 DEC 2025" calendar page; a dashed "a full year?" lane vs the mixer's own lane
   20 Dec → 31 Mar, "≈ 3 months of use".
i2 "unfair": the full-year lane is crossed; THE RULE card "count the days it is used, in the year it's bought"; day
   ticks are counted along the mixer's lane.
i3 the bar splits 180 days before 31 Mar: green zone "put to use earlier → 180 days or more → the full rate", amber
   zone "put to use later → under 180 days in the year → half the normal rate", with leaders to two outcome cards.
i4 the bar glides up; the P&M tank (centre stage) fills to the opening WDV ₹10,00,000; on "1 June" a flag and the oven
   flies into the pipe (+₹4,00,000); on "20 December" a flag and the mixer pours in (+₹2,00,000); tag -> ₹16,00,000.
i5 the oven's lane 1 Jun → 31 Mar shades green, "10 months", and its layer joins the full-rate part (₹14,00,000);
   the mixer's lane shades amber with a counter rolling to 102 days, "under 180", and its layer turns "½ rate".
i6 the tank slides left and the sheet builds: 15% × ₹14,00,000 = ₹2,10,000 · 7.5% × ₹2,00,000 = ₹15,000 · total
   depreciation ₹2,25,000 (each layer glows with a "15% ×" / "7.5% ×" chip as its line is spoken; chime on the total).
i7 the ₹2,25,000 slice lifts off the top of the tank into the sheet; the calendar flips 31 MAR → 1 APR, "WDV c/f
   ₹16,00,000 − ₹2,25,000 = ₹13,75,000"; the mixer's amber layer merges: next year the whole block is at 15%.
i8 trap: tank and sheet dim; "USE, not purchase"; flags "bought · Apr" (grey) and "put to use · Nov" (amber) on the
   bar; a crate bought in April waits (hourglass) and is installed in November; its lane Nov → 31 Mar "< 180 days";
   a ½ RATE stamp.
i9 exam: the tank and sheet return, calm; a chip chain "acquired in the P.Y. → put to use < 180 days → 50% of the
   prescribed rate", the 7.5% line highlighted.
i10 check (below the card): a "1 JAN" page and a laptop; the answer: 20% = ½ × 40%, its lane 1 Jan → 31 Mar."""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('i')
I1, I2, I3, I4, I5, I6, I7, I8, I9, I10 = (T(f'i{k}') for k in range(1, 11))
I10A = TA('i10')

# ---------------------------------------------------------------- word times
MIX1, DEC1, FULL1, THREE1 = W('i1', 'mixer'), W('i1', 'twenty'), W('i1', 'full'), W('i1', 'three')
UNFAIR2, RULE2, COUNT2, USED2, BOUGHT2 = (W('i2', 'unfair'), W('i2', 'simple'), W('i2', 'count'), W('i2', 'used'),
                                          W('i2', 'bought'))
LESS3, DAYS3, HALF3, MORE3, FULL3 = W('i3', 'less'), W('i3', 'days'), W('i3', 'half'), W('i3', 'for', occ=1), W('i3', 'full')
WORK4, BLOCK4, TEN4, JUNE4, OVEN4, FOUR4 = (W('i4', 'work'), W('i4', 'plant'), W('i4', 'ten'), W('i4', 'one'),
                                            W('i4', 'oven'), W('i4', 'four'))
DEC4, MIX4, TWO4 = W('i4', 'twenty'), W('i4', 'mixer'), W('i4', 'two')
OVEN5, TENM5, JOINS5, FULL5 = W('i5', 'oven'), W('i5', 'ten'), W('i5', 'joins'), W('i5', 'full')
MIX5, HUND5, UNDER5, HALF5 = W('i5', 'mixer'), W('i5', 'hundred'), W('i5', 'under'), W('i5', 'half')
P15_6, R1_6 = W('i6', 'fifteen'), W('i6', 'two')
P75_6, R2_6 = W('i6', 'seven'), W('i6', 'fifteen', occ=1)
TOT6, R3_6 = W('i6', 'total'), W('i6', 'two', occ=2)
CARR7, SIXT7, MINUS7, NEXT7, THIRT7 = (W('i7', 'carries'), W('i7', 'sixteen'), W('i7', 'minus'), W('i7', 'next'),
                                       W('i7', 'thirteen'))
MIX7, ONCE7, NEXTY7, FULL7 = W('i7', 'mixer'), W('i7', 'one'), W('i7', 'next', occ=1), W('i7', 'full')
RULE8, USE8, NOT8, MACH8, BOUGHT8, APR8 = (W('i8', 'rule'), W('i8', 'use'), W('i8', 'not'), W('i8', 'machine'),
                                           W('i8', 'bought'), W('i8', 'april'))
INST8, NOV8, UNDER8, HALF8 = W('i8', 'installed'), W('i8', 'november'), W('i8', 'under'), W('i8', 'half')
WRITE9, ACQ9, PUT9, LESS9, RESTR9, FIFTY9, PRESC9 = (W('i9', 'write'), W('i9', 'acquired'), W('i9', 'put'),
                                                    W('i9', 'less'), W('i9', 'restricted'), W('i9', 'fifty'),
                                                    W('i9', 'prescribed'))
LAP10, JAN10 = W('i10', 'laptop'), W('i10', 'january')
ATW10, AHALF10, AFORTY10, AUNDER10 = W('i10a', 'twenty'), W('i10a', 'half'), W('i10a', 'forty'), W('i10a', 'under')

# derived beats
UP0, UP1 = BLOCK4 - .2, BLOCK4 + 1.1                     # the bar glides up
POUR_OVEN, POUR_MIX = FOUR4 - .1, TWO4 - .1               # the asset reaches the pipe, the stream starts
SKIM0, SKIM1 = MINUS7 + .5, MINUS7 + 1.9                  # the ₹2,25,000 slice lifts off the top
FLIP7 = NEXT7 - .1                                        # the calendar turns to 1 April
DIM8 = (I8 - .3, I9 - .2)                                 # tank + sheet dimmed for the trap

for tt, k in ((MIX1, 'pop'), (DEC1, 'flip'), (THREE1, 'blip'), (UNFAIR2, 'warn'), (COUNT2, 'tick'),
              (LESS3, 'whoosh'), (HALF3, 'pop'), (FULL3, 'pop'),
              (TEN4, 'blip'), (JUNE4, 'pop'), (POUR_OVEN, 'blip'), (DEC4, 'pop'), (POUR_MIX, 'blip'),
              (HUND5, 'tick'), (HALF5, 'pop'),
              (R1_6 + .4, 'tick'), (R2_6 + .4, 'tick'), (R3_6 + .5, 'chime'),
              (SKIM0, 'snip'), (FLIP7, 'flip'), (FULL7, 'ok'),
              (NOV8, 'pop'), (HALF8 + .3, 'thunk'),
              (FIFTY9, 'chime_lo'), (ATW10, 'ok')):
    _ev(tt, k)

# ---------------------------------------------------------------- geometry
YB_X, YB_W, YB_H = 170, 1580, 56
START, END = (2025, 4, 1), (2026, 3, 31)
SPLIT = (2025, 10, 4)                                    # put to use from here on -> under 180 days
OVEN_D, MIX_D = (2025, 6, 1), (2025, 12, 20)
APR_D, NOV_D, JAN_D = (2025, 4, 15), (2025, 11, 15), (2026, 1, 1)
LANE_H = 32

def _x(d): return yearbar_x(YB_X, YB_W, d, START, END)
XE = YB_X + YB_W
XS = _x(SPLIT)

def _yb(t):
    """Year bar top y: 350 for i1–i3, then up to 236 for the working."""
    return lerp(350, 236, seg(t, UP0, UP1))

def _lane_y(t, row): return _yb(t) + YB_H + 48 + row * (LANE_H + 6)

TX, TY, TW, TH = 250, 470, 320, 300                      # the P&M tank (centred at x 800 until the sheet arrives)
CAP = 18e5
SH_X, SH_Y, SH_W = 860, 452, 900                         # the computation sheet

def _tx(t): return lerp(800, 250, seg(t, P15_6 - 1.3, P15_6 - .2))

def _pop(t, t0, d=.45): return seg(t, t0, t0 + d, back)

def _scaled(c, x, y, k):
    c.save(); c.translate(x, y); c.scale(k, k); c.translate(-x, -y)

# ---------------------------------------------------------------- small helpers
def _lane(c, t, row, d0, d1, col, a, u=1., label=None, dashed=False, lcol=None, size=22):
    """An interval bar under the year bar from the start of d0 to the end of d1 in lane row, growing with u."""
    if a <= 0 or u <= 0: return
    y = _lane_y(t, row); x0 = _x(d0); x1 = _x(tuple(d1[:3]) + (1.,)); xe = lerp(x0, x1, eout(clamp(u)))
    if dashed:
        dp = paint(col, .9 * a, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 7], 0))
        c.drawRRect(rrect(x0, y, xe - x0, LANE_H, LANE_H / 2), paint(col, .08 * a))
        c.drawRRect(rrect(x0, y, xe - x0, LANE_H, LANE_H / 2), dp)
    else:
        c.drawRRect(rrect(x0, y, xe - x0, LANE_H, LANE_H / 2), paint(col, .82 * a))
        c.drawRRect(rrect(x0, y, xe - x0, LANE_H, LANE_H / 2), paint(shade(col, .4), .9 * a, stroke=1.4))
    if label and u > .6:
        la = a * seg(u, .6, 1.)
        text(c, label, (x0 + x1) / 2, y + LANE_H / 2 + size * .36, size, 800, lcol or ('#0b1020' if not dashed else col), la, 'c')

def _zones(c, t, a, strong=0.):
    """Green / amber tints on the bar either side of the 180-day split, and the dashed split line."""
    if a <= 0: return
    y = _yb(t)
    c.drawRect(skia.Rect(YB_X + 2, y + 3, XS, y + YB_H - 3), paint(GREEN, (.10 + .22 * strong) * a))
    c.drawRect(skia.Rect(XS, y + 3, XE - 2, y + YB_H - 3), paint(ORANGE, (.12 + .26 * strong) * a))
    dp = paint(WHITE, (.45 + .45 * strong) * a, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
    c.drawLine(XS, y + 3, XS, _lane_y(t, 1) + LANE_H + 8, dp)

def _amt_tag(c, x, y, a, val, col=GOLD, strike=0.):
    """A gold amount tag at the tank's surface: a short leader from x, rupee(val) (rounded to ₹1,000 while it
    moves); strike 0..1 strikes it through in red."""
    if a <= 0: return
    s = rupee(int(round(val / 1000.)) * 1000); tw = ftext_w(s, 27, MONO)
    c.drawLine(x + 2, y, x + 24, y, paint(col, .8 * a, stroke=2))
    c.drawRRect(rrect(x + 24, y - 22, tw + 26, 44, 10), paint('#120d02', .92 * a))
    c.drawRRect(rrect(x + 24, y - 22, tw + 26, 44, 10), paint(col, .9 * a, stroke=1.8))
    ftext(c, s, x + 37, y + 10, 27, MONO, DIM if strike > 0 else col, a, 'l')
    if strike > 0: c.drawLine(x + 34, y + 1, x + 34 + (tw + 6) * strike, y - 1, paint(RED, a, stroke=3))

def _crate(c, x, y, s, a, open_=0.):
    """A wooden machine crate, bottom centre (x, y), 200 x 150 at s = 1; open_ lifts the lid off."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-110, -8, 220, 16), paint(BLACK, .45 * a, blur=8))
    c.drawRect(skia.Rect.MakeXYWH(-100, -140, 200, 140), paint('#a16207', a))
    for k in range(4): c.drawLine(-100, -140 + k * 35 + 35, 100, -140 + k * 35 + 35, paint('#713f12', .8 * a, stroke=2.4))
    c.drawLine(-100, -140, 100, 0, paint('#854d0e', a, stroke=8)); c.drawLine(100, -140, -100, 0, paint('#854d0e', a, stroke=8))
    c.drawRect(skia.Rect.MakeXYWH(-100, -140, 200, 140), paint('#713f12', a, stroke=4))
    c.drawRect(skia.Rect.MakeXYWH(-70, -92, 140, 40), paint('#a16207', a))
    text(c, 'MACHINE', 0, -63, 24, 800, '#422006', a, 'c', track=2)
    lu = eout(clamp(open_))
    c.save(); c.translate(-110 * lu, -20 * lu); c.rotate(-18 * lu)
    c.drawRect(skia.Rect.MakeXYWH(-106, -156, 212, 18), paint('#ca8a04', a))
    c.restore()
    c.restore()

# ---------------------------------------------------------------- the year bar, marks and lanes (whole chapter)
def _bar(c, t):
    a = win(t, CS - .4, CE + 1., .6, .3)
    if a <= 0: return
    y = _yb(t)
    dim8 = 1 - .6 * win(t, DIM8[0], DIM8[1], .4, .5)         # oven / mixer context during the trap
    hide9 = 1 - seg(t, WRITE9 - .3, WRITE9 + .2)             # their lanes make room for the exam chips
    marks = []
    ma = seg(t, JUNE4 - .1, JUNE4 + .3) * dim8 * (1 - seg(t, I10 - .4, I10))
    if ma > 0: marks.append((OVEN_D, '1 Jun · oven', GREEN if t > JOINS5 else GOLD, ma))
    mb = seg(t, DEC4 - .1, DEC4 + .3) * dim8 * (1 - seg(t, I10 - .4, I10))
    if mb > 0: marks.append((MIX_D, '20 Dec · mixer', ORANGE if t > MIX5 else GOLD, mb))
    tr = win(t, BOUGHT8, I9 + .2, .3, .5)
    if tr > 0:
        marks.append((APR_D, 'bought · Apr', '#94a3b8', tr * seg(t, APR8 - .2, APR8 + .2), 1))
        marks.append((NOV_D, 'put to use · Nov', ORANGE, tr * seg(t, NOV8 - .2, NOV8 + .2), 1))
    jl = seg(t, JAN10 - .2, JAN10 + .3)
    if jl > 0: marks.append((JAN_D, '1 Jan · laptop', ORANGE, jl))
    yearbar(c, YB_X, y, YB_W, a, t, START, END, None, marks, (), YB_H)
    # i1: a pin at 20 Dec while the hook plays
    pa = a * win(t, DEC1, BLOCK4 + .4, .3, .4)
    if pa > 0:
        px = _x(MIX_D)
        c.drawCircle(px, y + YB_H / 2, 9, paint(GOLD, .5 * pa, blur=5)); c.drawCircle(px, y + YB_H / 2, 6, paint(WHITE, pa))
    # the 180-day zones
    za = a * seg(t, LESS3 - .1, LESS3 + .8)
    if za > 0:
        strong = win(t, LESS3, I4 + .4, .5, .6) + .5 * win(t, UNDER5, HALF5 + .6, .3, .4) + .6 * win(t, UNDER8, I9, .3, .5)
        _zones(c, t, za * (1 - .7 * seg(t, I10 - .4, I10 + .2)), min(1., strong))
    sa = a * win(t, DAYS3 - .2, I4 + .3, .4, .5)
    if sa > 0:
        s_ = '180 days before 31 Mar'; cw = text_w(s_, 22, 700) + 22 * 1.3; cy_ = _lane_y(t, 0) + LANE_H / 2
        c.drawRRect(rrect(XS - cw / 2, cy_ - 19, cw, 38, 19), paint('#0c1532', sa))
        chip(c, XS, cy_, s_, WHITE, sa, 22, fill=.12)
    # i1–i2: the full-year question and the mixer's lane
    ga = a * win(t, FULL1 - .1, LESS3 + .2, .3, .5)
    if ga > 0:
        bad = seg(t, UNFAIR2 - .1, UNFAIR2 + .3)
        _lane(c, t, 0, START, END, mixc(GOLD, RED, bad), ga, seg(t, FULL1 - .1, FULL1 + .7), 'a full year?', True)
        if bad > 0:
            cross(c, (YB_X + XE) / 2 + 150, _lane_y(t, 0) + LANE_H / 2, ga * seg(t, UNFAIR2, UNFAIR2 + .4, back), 16)
    la = a * win(t, THREE1 - .1, I4 + .3, .3, .5)
    if la > 0:
        _lane(c, t, 1, MIX_D, END, ORANGE, la, seg(t, THREE1 - .1, THREE1 + .7), '≈ 3 months of use')
    # i2: counting the days along the mixer's lane
    ca = a * win(t, COUNT2 - .1, LESS3, .3, .5)
    if ca > 0:
        y1 = _lane_y(t, 1); x0 = _x(MIX_D); n = int(102 * seg(t, COUNT2, BOUGHT2 + .2, linr))
        for k in range(n):
            xx = x0 + (k + .5) * (XE - x0) / 102
            c.drawLine(xx, y1 + LANE_H + 6, xx, y1 + LANE_H + (16 if k % 10 == 9 else 11), paint(WHITE, .8 * ca, stroke=1.6))
        if 0 < n < 102:
            xx = x0 + n * (XE - x0) / 102
            c.drawCircle(xx, y1 + LANE_H + 12, 6, paint(GOLD, ca))
        text(c, 'counting the days used', (x0 + XE) / 2, y1 + LANE_H + 44, 24, 700, DIM, ca, 'c')
    # i5 onward: the oven's and the mixer's lanes
    oa = a * seg(t, OVEN5 - .1, OVEN5 + .3) * dim8 * hide9
    if oa > 0:
        _lane(c, t, 0, OVEN_D, END, GREEN, oa, seg(t, OVEN5, TENM5 + .3), 'oven · 1 Jun → 31 Mar · 10 months')
    ma2 = a * seg(t, MIX5 - .1, MIX5 + .3) * dim8 * hide9
    if ma2 > 0:
        u = seg(t, MIX5, HUND5)
        _lane(c, t, 1, MIX_D, END, ORANGE, ma2, u)
        if u > .6:
            y1 = _lane_y(t, 1); cx = (_x(MIX_D) + XE) / 2
            lw = text_w('mixer · ', 22, 800); rw = ftext_w('102 days', 22, MONO); x0 = cx - (lw + rw) / 2
            text(c, 'mixer · ', x0, y1 + LANE_H / 2 + 8, 22, 800, '#0b1020', ma2 * seg(u, .6, 1.), 'l')
            roll(c, 102, x0 + lw + rw, y1 + LANE_H / 2 + 8, seg(t, HUND5 - .2, HUND5 + .7, linr), 22, '#0b1020',
                 ma2 * seg(u, .6, 1.), 'r', MONO, '', False, 700, 0, ' days')
        ua = ma2 * win(t, UNDER5 - .1, HALF5 + .8, .3, .4)
        if ua > 0:
            y1 = _lane_y(t, 1)
            text(c, 'under 180', _x(MIX_D) - 16, y1 + LANE_H / 2 + 8, 24, 800, ORANGE, ua, 'r', shadow=6)
    # i8: the trap's lane (put to use in November)
    ta = a * win(t, NOV8, I9 + .2, .3, .5)
    if ta > 0:
        _lane(c, t, 0, APR_D, END, '#94a3b8', ta * (1 - seg(t, INST8, INST8 + .5)), 1., None, True)
        _lane(c, t, 1, NOV_D, END, ORANGE, ta, seg(t, NOV8, NOV8 + .7), 'put to use · under 180 days')
    # i10: the laptop's lane
    ja = a * seg(t, AUNDER10 - .3, AUNDER10 + .2)
    if ja > 0:
        _lane(c, t, 0, JAN_D, END, ORANGE, ja, seg(t, AUNDER10 - .3, AUNDER10 + .5), '1 Jan → 31 Mar · under 180')

# ---------------------------------------------------------------- i1–i3: the lower region before the working
def _intro(c, t):
    a = win(t, CS - .4, BLOCK4, .6, .6)
    if a <= 0: return
    # i1: calendar page + mixer
    ka = a * (1 - seg(t, RULE2 - .4, RULE2 + .2))
    if ka > 0:
        u = seg(t, DEC1 - .2, DEC1 + .6, eout)
        mixer(c, 1080, 830, .66, ka * _pop(t, MIX1 - .1), t, .6)
        if u > 0:
            calendar(c, 800, 640 - 40 * (1 - u), ka * u, 20, 'DEC', 2025, .95, RED)
            dp = paint(GOLD, .7 * ka * u, stroke=2.2, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([8, 7], -t * 24))
            c.drawLine(800 + 80, 560, _x(MIX_D) - 8, _yb(t) + YB_H + 8, dp)
    # i2: the rule card
    ra = a * win(t, RULE2 - .2, LESS3 - .1, .4, .4)
    if ra > 0:
        x, y, w, h = 560, 600, 800, 190
        card(c, x, y, w, h, ra)
        c.drawRRect(rrect(x, y, 6, h, 3), paint(GOLD, ra))
        text(c, 'THE RULE', x + 40, y + 48, 22, 800, GOLD, ra, track=3)
        text(c, 'count the days it is used', x + 40, y + 104, 38, 800, WHITE, ra * seg(t, COUNT2 - .2, COUNT2 + .3))
        text(c, "in the year it's bought", x + 40, y + 152, 32, 700, DIM, ra * seg(t, USED2 + .2, USED2 + .6))
    # i3: the two outcomes
    oa = a * seg(t, LESS3 - .1, LESS3 + .5)
    if oa > 0:
        y0 = 590
        for k, (x, w, col, l1, l2, l3, t0) in enumerate((
                (1000, 700, ORANGE, 'put to use later in the year', 'under 180 days in the year', 'half the normal rate', LESS3),
                (220, 700, GREEN, 'put to use earlier', '180 days or more', 'the full rate', MORE3))):
            u = seg(t, t0, t0 + .5, eout)
            if u <= 0: continue
            ca = oa * u; yy = y0 + 20 * (1 - u)
            card(c, x, yy, w, 210, ca)
            c.drawRRect(rrect(x, yy, w, 210, 22), paint(col, .7 * ca, stroke=2.4))
            text(c, l1, x + 36, yy + 52, 26, 700, DIM, ca)
            text(c, l2, x + 36, yy + 104, 34, 800, WHITE, ca)
            res_t = HALF3 if k == 0 else FULL3
            rr = seg(t, res_t - .15, res_t + .35, back)
            if rr > 0:
                arrow(c, x + 36, yy + 150, x + 86, yy + 150, col, 3, ca * clamp(rr), 12)
                text(c, l3, x + 104, yy + 162, 36, 800, col, ca * clamp(rr), 'l', shadow=6)
            # a leader up to the zone on the bar
            zx = (XS + XE) / 2 if k == 0 else (YB_X + XS) / 2
            dp = paint(col, .7 * ca, stroke=2, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([8, 7], 0))
            c.drawLine(x + w / 2, yy, zx, _yb(t) + YB_H + 6, dp)

# ---------------------------------------------------------------- the tank (i4–i9)
def _levels(t):
    """(opening, oven, mixer) amounts in the tank at t, before depreciation."""
    op = 1e6 * seg(t, TEN4 - .1, TEN4 + 1.0)
    ov = 4e5 * seg(t, POUR_OVEN + .2, POUR_OVEN + 1.3)
    mx = 2e5 * seg(t, POUR_MIX + .2, POUR_MIX + 1.2)
    return op, ov, mx

def _tank(c, t):
    a = win(t, BLOCK4 - .1, I10 + .1, .6, .5)
    if a <= 0: return
    a *= 1 - win(t, DIM8[0], DIM8[1], .5, .6)
    TX = _tx(t)
    op, ov, mx = _levels(t)
    sk = seg(t, SKIM0, SKIM1)                                # the depreciation leaves the top
    tot = (op + ov + mx) - 225000 * sk
    lv = tot / CAP
    full = seg(t, JOINS5, FULL5 + .2)                         # opening + oven join the full-rate part
    halfc = seg(t, HALF5 - .3, HALF5 + .3)
    merge = seg(t, FULL7 - .3, FULL7 + .4)                    # next year: one rate
    base_col = mixc(ACC, GREEN, full); mix_col = mixc(mixc(ACC, ORANGE, halfc), GREEN, merge)
    k = 1 - .14 * sk                                          # every layer shrinks in proportion
    layers = []
    if full < 1:
        if op > 0: layers.append((op * k, base_col, None))
        if ov > 0: layers.append((ov * k, mixc(BLUE, GREEN, full), None))
    else: layers.append(((op + ov) * k, base_col, None))
    if mx > 0: layers.append((mx * k, mix_col, None))
    inflow = max(win(t, POUR_OVEN, POUR_OVEN + 1.4, .2, .4), win(t, POUR_MIX, POUR_MIX + 1.3, .2, .4),
                 win(t, TEN4 - .3, TEN4 + 1.1, .2, .4))
    cx, ys, (ix, iy, iw, ih) = tank(c, TX, TY, TW, TH, a, t, lv, 1., None, None, base_col, inflow, layers=layers or None)
    text(c, 'Plant & machinery block · 15%', TX + TW / 2, TY + TH + 50, 26, 800, WHITE, a, 'c', shadow=6)
    # layer labels (drawn here so they stay legible)
    yb = iy + ih; tsum = sum(f for f, _, _ in layers) or 1.
    labs = []
    if full < .5:
        labs = [('opening ₹10,00,000', op), ('+ oven ₹4,00,000', ov), ('+ mixer ₹2,00,000', mx)]
    else:
        if merge < .5:
            ml = ('½ rate · ₹2,00,000' if halfc > .5 else '+ mixer ₹2,00,000') if sk == 0 else '½ rate'
            labs = [('full rate · ₹14,00,000' if sk == 0 else 'full rate', op + ov), (ml, mx)]
        else: labs = [('2026-27 · all at 15%', op + ov + mx)]
    for lab_, amt in labs:
        if amt <= 0: continue
        hh = ih * lv * (amt * k) / tsum if full < .5 or merge < .5 else ih * lv
        yt = yb - hh
        if hh > 26:
            fs = 24 if hh > 40 else 22
            text(c, lab_, ix + iw / 2, (max(yt, ys) + yb) / 2 + fs * .36, fs, 800, WHITE, a * seg(t, TEN4, TEN4 + .5), 'c', shadow=6)
        yb = yt
    # glow on the layer being computed (i6)
    for (t0, t1), (lo, hi) in (((P15_6 - .1, R1_6 + 1.2), (0., (op + ov) / tot if tot else 0)),
                               ((P75_6 - .1, R2_6 + 1.2), ((op + ov) / tot if tot else 0, 1.))):
        g = win(t, t0, t1, .3, .5) * a
        if g > 0:
            y0 = iy + ih - ih * lv * hi; y1 = iy + ih - ih * lv * lo
            c.drawRRect(rrect(ix - 6, y0 - 2, iw + 12, y1 - y0 + 4, 8), paint(GOLD, .9 * g, stroke=4, blur=4))
            s_ = '15% ×' if lo == 0 else '7.5% ×'
            chip(c, ix - 56, (y0 + y1) / 2, s_, GOLD, g, 22, fill=.3)
    # the amount tag at the surface
    tag_y = clamp(ys, iy + 16, iy + ih - 6)
    ta = a * seg(t, TEN4 - .1, TEN4 + .3)
    if ta > 0:
        if t < SKIM0: _amt_tag(c, TX + TW, tag_y, ta, op + ov + mx)
        elif t < THIRT7 - .1: _amt_tag(c, TX + TW, tag_y, ta, 16e5, GOLD, seg(t, SKIM0, SKIM0 + .5))
        else: _amt_tag(c, TX + TW, tag_y, ta, lerp(16e5, 1375000, seg(t, THIRT7 - .1, THIRT7 + 1.0, linr)))
    pu = win(t, SIXT7 - .2, MINUS7 + .3, .2, .3) * a
    if pu > 0:
        c.drawRRect(rrect(TX + TW + 20, tag_y - 26, 230, 52, 12), paint(GOLD, .8 * pu, stroke=3, blur=4))
    # the depreciation slice lifts off the top and flies into the sheet's total line
    if 0 < sk < 1 or (SKIM0 - .4 < t < SKIM0):
        sh = ih * 225000 / CAP
        q = seg(t, SKIM0, SKIM1, ease)
        y_top = iy + ih - ih * (16e5 / CAP)
        tx_, ty_ = SH_X + 40, sheet_row_y(SH_X, SH_Y, ROWS, 2, 0., SH_TITLE) - 20
        x = lerp(ix, tx_, q); y = lerp(y_top, ty_, q) - 120 * math.sin(math.pi * q); w = lerp(iw, 360, q)
        sa = a * (1 - seg(q, .85, 1.))
        c.drawRRect(rrect(x, y, w, max(sh, 34), 8), paint(GOLD, .9 * sa))
        text(c, '₹2,25,000', x + w / 2, y + max(sh, 34) / 2 + 9, 26, 800, '#1a1305', sa * seg(q, .05, .2), 'c')
    # i7: the year turns (calendar page 31 MAR -> 1 APR)
    fa = a * win(t, NEXT7 - .6, I8 - .1, .4, .4)
    if fa > 0:
        calendar(c, 150, 650, fa, 31, 'MAR', 2026, .55, ACC, seg(t, FLIP7, FLIP7 + .8), 0., (1, 'APR', 2026))
        text(c, 'next year', 150, 750, 24, 800, ACC, fa * seg(t, FLIP7 + .5, FLIP7 + .9), 'c', shadow=6)
    na = a * win(t, ONCE7 - .2, I8 - .2, .3, .4)
    if na > 0:
        text(c, '½ rate: year of purchase only', TX + TW / 2, TY - 20, 24, 800, ORANGE if merge < .5 else GREEN, na, 'c', shadow=6)

def _arrivals(c, t):
    """i4: the oven (1 Jun) and the mixer (20 Dec) leave their flags and fly into the tank's pipe."""
    TX = _tx(t)
    nx, ny = TX + 10 + (TW - 20) * .28, TY - 58
    for d, t0, t1, fn, amt_t, amt in ((OVEN_D, JUNE4, POUR_OVEN, lambda c_, x, y, s_, a_: oven(c_, x, y, .27 * s_, a_, t, .6),
                                       FOUR4, '+ ₹4,00,000'),
                                      (MIX_D, DEC4, POUR_MIX, lambda c_, x, y, s_, a_: mixer(c_, x, y, .27 * s_, a_, t, 0.),
                                       TWO4, '+ ₹2,00,000')):
        a = seg(t, t0 - .1, t0 + .3) * (1 - seg(t, t1 - .1, t1 + .15))
        if a > 0:
            u = seg(t, t0 + .45, t1 - .1, ease)
            bx, by = _x(d), _yb(t) + YB_H + 150
            x = lerp(bx, nx, u); y = lerp(by, ny, u) + 30 * math.sin(math.pi * u)
            fn(c, x, y, 1 - .5 * seg(t, t1 - .4, t1), a)
        ca = win(t, amt_t - .1, amt_t + 1.8, .3, .5)
        if ca > 0:
            chip(c, TX - 30, TY - 98, amt, GOLD, ca, 24, fill=.3)

# ---------------------------------------------------------------- the computation sheet (i6–i9)
SH_TITLE = 'Depreciation · P&M block'
ROWS = [
    {'label': '15% × ₹14,00,000 · full rate', 'amt': 210000, 't0': R1_6 - .45},
    {'label': '7.5% × ₹2,00,000 · half rate', 'amt': 15000, 't0': R2_6 - .45, 'hl': (PUT9, PRESC9 + 1.2)},
    {'label': 'Total depreciation', 'amt': 225000, 'kind': 'total', 't0': R3_6 - .4},
    {'label': 'WDV c/f · ₹16,00,000 − ₹2,25,000', 'amt': 1375000, 'kind': 'sub', 't0': THIRT7 - .45},
]

def _sheet(c, t):
    a = win(t, P15_6 - .5, I10 + .1, .5, .5)
    if a <= 0: return
    a *= 1 - win(t, DIM8[0], DIM8[1], .5, .6)
    sheet(c, SH_X, SH_Y, SH_W, ROWS, a, t, SH_TITLE, GOLD, title_r='P.Y. 2025-26', size=30, asize=33, grow=True)
    ga = a * win(t, R3_6 + .4, R3_6 + 2.2, .2, .8)
    if ga > 0:
        ry = sheet_row_y(SH_X, SH_Y, ROWS, 2, 0., SH_TITLE)
        c.drawRRect(rrect(SH_X + 8, ry - 36, SH_W - 16, 72, 14), paint(GOLD, .6 * ga, stroke=5, blur=6))

# ---------------------------------------------------------------- i8: use, not purchase
def _trap(c, t):
    a = win(t, RULE8 - .2, I9 - .1, .5, .5)
    if a <= 0: return
    y = 500
    text(c, 'The rule is about', 520, y, 34, 700, WHITE, a * seg(t, RULE8 - .1, RULE8 + .3), 'r', shadow=6)
    ua = a * _pop(t, USE8 - .05)
    if ua > 0: text(c, 'USE', 560, y + 4, 46, 800, GREEN, clamp(ua), 'l', shadow=8)
    na = a * seg(t, NOT8 - .1, NOT8 + .3)
    if na > 0:
        x0 = 700; tw = text_w('not purchase', 34, 700)
        text(c, 'not purchase', x0, y, 34, 700, DIM, na, 'l')
        c.drawLine(x0 - 4, y - 11, x0 - 4 + (tw + 8) * seg(t, NOT8 + .2, NOT8 + .6), y - 13, paint(RED, na, stroke=3.4))
    # bought in April (a crate waits) -> installed in November
    ba = a * seg(t, BOUGHT8 - .2, BOUGHT8 + .3)
    if ba > 0:
        x, yy, w, h = 230, 560, 560, 250
        card(c, x, yy, w, h, ba)
        text(c, 'bought', x + 32, yy + 50, 26, 700, DIM, ba)
        text(c, 'April', x + 32, yy + 94, 38, 800, WHITE, ba * seg(t, APR8 - .1, APR8 + .3))
        _crate(c, x + 400, yy + 220, .95, ba, 0.)
        itext(c, 'not yet in use', x + 32, yy + 140, 24, DIM, ba * seg(t, APR8 + .2, APR8 + .6), 'l', 600)
        hourglass(c, 905, yy + 140, .8, ba * seg(t, INST8 - .4, INST8), seg(t, INST8 - .3, NOV8 + .4))
        arrow(c, 820, yy + 210, 990, yy + 210, DIM, 3, ba * seg(t, INST8 - .2, INST8 + .3), 14)
    ia = a * seg(t, INST8 - .1, INST8 + .4)
    if ia > 0:
        x, yy, w, h = 1020, 560, 640, 250
        card(c, x, yy, w, h, ia)
        c.drawRRect(rrect(x, yy, w, h, 22), paint(ORANGE, .7 * ia, stroke=2.4))
        text(c, 'installed · put to use', x + 32, yy + 50, 26, 700, DIM, ia)
        text(c, 'November', x + 32, yy + 94, 38, 800, WHITE, ia * seg(t, NOV8 - .1, NOV8 + .3))
        mixer(c, x + 520, yy + 236, .62, ia, t, 1.)
        text(c, 'under 180 days', x + 32, yy + 150, 30, 800, ORANGE, ia * seg(t, UNDER8 - .1, UNDER8 + .3), 'l', shadow=6)
        su = seg(t, HALF8, HALF8 + 1.1, linr)
        if su > 0: stamp(c, x + 190, yy + 206, '½ RATE', ORANGE, ia, su, -10, 38)

# ---------------------------------------------------------------- i9: the exam chips
def _exam(c, t):
    a = win(t, WRITE9 - .2, I10 - .1, .4, .5)
    if a <= 0: return
    items = [('acquired in the P.Y.', ACC, ACQ9), ('put to use < 180 days', ORANGE, PUT9),
             ('50% of the prescribed rate', GOLD, FIFTY9)]
    size = 24; ws = [text_w(s_, size, 700) + size * 1.3 for s_, _, _ in items]; gap = 64
    x = 960 - (sum(ws) + gap * 2) / 2; y = _lane_y(t, 0) + 10
    for k, ((s_, col, t0), w) in enumerate(zip(items, ws)):
        u = seg(t, t0 - .1, t0 + .35, back)
        if u > 0:
            _scaled(c, x + w / 2, y + 16, .8 + .2 * u)
            chip(c, x + w / 2, y + 16, s_, col, a * clamp(u * 2), size, fill=.3 if k == 2 else .2)
            c.restore()
        if k: arrow(c, x - gap + 10, y + 16, x - 10, y + 16, DIM, 2.6, a * seg(t, t0 - .3, t0), 11)
        x += w + gap

# ---------------------------------------------------------------- i10: the laptop (below the check card)
def _check(c, t):
    a = win(t, I10 - .1, CE + 1., .6, .3)
    if a <= 0: return
    y = 860
    calendar(c, 600, 800, a * _pop(t, JAN10 - .2), 1, 'JAN', 2026, .5, ACC)
    laptop(c, 780, y, .55, a * _pop(t, LAP10 - .1), 1.)
    qa = a * win(t, JAN10 + .3, ATW10, .3, .3)
    if qa > 0:
        pu = 1 + .06 * math.sin(t * 6)
        text(c, 'rate?', 1020, y - 30, 44 * pu, 800, GOLD, qa, 'c', shadow=8)
    ra = a * _pop(t, ATW10 - .1)
    if ra > 0:
        text(c, '20%', 1060, y - 18, 64, 800, GOLD, clamp(ra), 'c', shadow=8)
        ha = a * seg(t, AHALF10 - .1, AHALF10 + .3)
        if ha > 0:
            text(c, '= ½ ×', 1190, y - 26, 34, 800, WHITE, ha, 'l', shadow=6)
            fa = a * seg(t, AFORTY10 - .1, AFORTY10 + .3)
            text(c, '40%', 1300, y - 26, 34, 800, ACC, fa, 'l', shadow=6)
            text(c, 'computers', 1300, y + 8, 22, 700, DIM, fa, 'l')

def ch_i(c, t):
    if t < CS - .5 or t > CE + .6: return
    _bar(c, t)
    _intro(c, t)
    _tank(c, t)
    _arrivals(c, t)
    _sheet(c, t)
    _trap(c, t)
    _exam(c, t)
    _check(c, t)

if __name__ == '__main__':
    for nm in ('MIX1 DEC1 FULL1 THREE1 UNFAIR2 RULE2 COUNT2 USED2 BOUGHT2 LESS3 DAYS3 HALF3 MORE3 FULL3 WORK4 BLOCK4 TEN4 '
               'JUNE4 OVEN4 FOUR4 DEC4 MIX4 TWO4 OVEN5 TENM5 JOINS5 FULL5 MIX5 HUND5 UNDER5 HALF5 P15_6 R1_6 P75_6 R2_6 '
               'TOT6 R3_6 CARR7 SIXT7 MINUS7 NEXT7 THIRT7 MIX7 ONCE7 NEXTY7 FULL7 RULE8 USE8 NOT8 MACH8 BOUGHT8 APR8 '
               'INST8 NOV8 UNDER8 HALF8 WRITE9 ACQ9 PUT9 LESS9 RESTR9 FIFTY9 PRESC9 LAP10 JAN10 ATW10 AHALF10 AFORTY10 '
               'AUNDER10').split():
        print(nm, round(globals()[nm], 2))
    print('events', len(EVENTS), 'XS', round(XS, 1), 'x(20 Dec)', round(_x(MIX_D), 1), 'x(1 Jun)', round(_x(OVEN_D), 1))
