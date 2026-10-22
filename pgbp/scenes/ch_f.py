"""Chapter F — Capital or revenue? (sections 30, 31 and 38).
f1 hook: Meera's bank card at the top; a ₹4,00,000 "Flour" bill flies out to the left over three flour sacks and a
   ₹4,00,000 "New oven" bill to the right over the oven; gold dots run from the bank to both ("this year"); a
   "deduct?" tag rises over each
f2 predict: the two tags pulse, the bills bob
f3 "only the flour": the flour bill glows green; the sacks turn into this year's cakes ("used up this year"); the
   oven bakes across a ten-year strip (25-26 … 34-35) that lights year by year; profit bars stand on the strip at a
   dashed "normal" line; charging the whole ₹4,00,000 to year 1 sinks its bar (red, "poor") and lifts years 2-10
   above the line (gold, "rich")
f4 the two bills side by side under "used up within the year" / "lasting benefit": REVENUE stamped green →
   "deduct ✓"; CAPITAL stamped orange → "no direct deduction"
f5 a "Repairs" chip lands on the dividing line and wobbles; then two panels: § 30 · building (rent, rates, taxes,
   repairs, insurance ticked as spoken, the building glows) and § 31 · machinery, plant, furniture (current repairs,
   insurance; the oven, mixer and counter light as named)
f6 example, two halves: current repair (green) — a roller repaints the shop front, a spanner fixes the oven door →
   "current repair · deductible"; capital (orange) — the whole oven is swapped for a new one, a new floor drops onto
   a building → CAPITAL stamp, "not a repair"
f7 three details: own shop → a "notional rent" slip crossed; a firm pays rent to its partner → green tick
   "if reasonable"; a machine used one month of twelve → its insurance bar fills to "full premium"
f8 what if: the van drives on; a Mon–Sun strip — six days business deliveries (green), Sunday family trips (grey);
   § 38; the van's costs bar splits: business share allowed (green tick), personal share crossed
f9 check: below the card a collapsed wall's bricks fly back into rows; the answer stamps it "capital — a
   replacement, not a current repair"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('f')
F1, F2, F3, F4, F5, F6, F7, F8, F9 = (T('f%d' % i) for i in range(1, 10))
F2E = TP('f2')

# ---------------------------------------------------------------- word times
FOUR1, FLOUR1, FOUR1B, OVEN1 = W('f1', 'four'), W('f1', 'flour'), W('f1', 'four', occ=1), W('f1', 'oven')
BOTH1, BANK1, DEDUCT1 = W('f1', 'both'), W('f1', 'bank'), W('f1', 'deduct')
ONLY3, USED3, CAKES3, OVEN3, TEN3 = W('f3', 'only'), W('f3', 'used'), W('f3', 'cakes'), W('f3', 'oven'), W('f3', 'ten')
CHARGED3, POOR3, NINE3, RICH3 = W('f3', 'charged'), W('f3', 'poor'), W('f3', 'nine'), W('f3', 'rich')
USED4, REVENUE4, DEDUCT4, LASTING4, CAPITAL4, DIRECTLY4 = (W('f4', 'used'), W('f4', 'revenue'), W('f4', 'deduct'),
                                                           W('f4', 'lasting'), W('f4', 'capital'), W('f4', 'directly'))
REPAIRS5, SEC30 = W('f5', 'repairs'), W('f5', 'section')
RENT5, RATES5, TAXES5, REPAIRS5B, INS5, BUILDING5 = (W('f5', 'rent'), W('f5', 'rates'), W('f5', 'taxes'),
                                                     W('f5', 'repairs', occ=1), W('f5', 'insurance'), W('f5', 'building'))
SEC31, CURRENT5, INS5B = W('f5', 'section', occ=1), W('f5', 'current'), W('f5', 'insurance', occ=1)
MACH5, PLANT5, FURN5 = W('f5', 'machinery'), W('f5', 'plant'), W('f5', 'furniture')
REPAINT6, FIXING6, DOOR6, CURRENT6, DEDUCTIBLE6 = (W('f6', 'repainting'), W('f6', 'fixing'), W('f6', 'door'),
                                                   W('f6', 'current'), W('f6', 'deductible'))
REPLACING6, ADDING6, FLOOR6, CAPITAL6, NOT6 = (W('f6', 'replacing'), W('f6', 'adding'), W('f6', 'floor'),
                                               W('f6', 'capital'), W('f6', 'not'))
OWNER7, NOTIONAL7, FIRM7, PAYING7, CAN7, REASON7 = (W('f7', 'owner'), W('f7', 'notional'), W('f7', 'firm'),
                                                    W('f7', 'paying'), W('f7', 'can', occ=1), W('f7', 'reasonable'))
MACHINE7, MONTH7, FULL7 = W('f7', 'machine'), W('f7', 'month'), W('f7', 'full')
ASSET8, PERSONAL8, MEERA8, FAMILY8, SEC38 = (W('f8', 'asset'), W('f8', 'personal'), W('f8', 'meera'), W('f8', 'family'),
                                             W('f8', 'section'))
BUSINESS8, ALLOWED8 = W('f8', 'business'), W('f8', 'allowed')
COLLAPSED9, A_CAP, A_REPLACE = W('f9', 'collapsed'), W('f9a', 'capital'), W('f9a', 'replacement')

for tt, k in ((FOUR1, 'whoosh'), (FOUR1B, 'whoosh'), (BOTH1, 'blip'), (DEDUCT1, 'pop'),
              (ONLY3, 'ok'), (USED3 + .4, 'pop'), (TEN3, 'tick'), (POOR3, 'error'), (RICH3, 'chime_lo'),
              (REVENUE4, 'thunk'), (DEDUCT4, 'ok'), (CAPITAL4, 'thunk'),
              (REPAIRS5 + .4, 'tap'), (RENT5, 'tick'), (INS5, 'tick'), (MACH5, 'tick'), (FURN5, 'tick'),
              (DEDUCTIBLE6, 'ok'), (FLOOR6 + .3, 'thunk'), (CAPITAL6, 'thunk'),
              (NOTIONAL7 + .5, 'error'), (CAN7, 'ok'), (FULL7, 'ok'),
              (ALLOWED8, 'ok')):
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

def _glowbill(c, x, y, a, title, amt, sc, glow, col):
    if glow > 0:
        c.drawRRect(rrect(x - 124 * sc, y - 80 * sc, 248 * sc, 160 * sc, 14), paint(col, .5 * glow * a, stroke=8, blur=12))
    bill(c, x, y, a, title, amt, 'bank', None, sc, 0, col=col if glow > .3 else None)

def _spanner(c, x, y, s, ang, col, a):
    """A simple open-end spanner centred at (x, y)."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s)
    c.drawRRect(rrect(-6, -10, 64, 20, 8), paint(col, a))
    hd = skia.Path(); hd.addCircle(-14, 0, 20); cut = skia.Path(); cut.addRect(-40, -8, -14, 8)
    c.drawPath(skia.Op(hd, cut, skia.PathOp.kDifference_PathOp), paint(col, a))
    c.restore()

def _roller(c, x, y, s, col, a):
    """A paint roller: handle down-left, roller on top."""
    if a <= 0: return
    c.drawRRect(rrect(x - 40 * s, y - 14 * s, 80 * s, 28 * s, 12 * s), paint(col, a))
    c.drawRRect(rrect(x - 40 * s, y - 14 * s, 80 * s, 28 * s, 12 * s), paint(shade(col, -.4), a, stroke=2))
    p = paint('#8d98ad', a, stroke=5 * s)
    c.drawLine(x + 40 * s, y, x + 54 * s, y, p); c.drawLine(x + 54 * s, y, x + 54 * s, y + 34 * s, p)
    c.drawLine(x + 54 * s, y + 34 * s, x + 10 * s, y + 46 * s, p)
    c.drawRRect(rrect(x - 4 * s, y + 40 * s, 18 * s, 56 * s, 6 * s), paint('#334155', a))

# ---------------------------------------------------------------- f1–f4: two ₹4 lakh bills
BKX, BKY = 960, 344
FLX, FLY = 520, 532                                    # flour bill (f1/f2)
OVX, OVY = 1400, 532                                   # oven bill (f1/f2)

def _bills_pos(t):
    """(x, y, sc) of the flour and oven bills through f1..f4."""
    fo = seg(t, FOUR1 - .25, FLOUR1 + .1, eout); oo = seg(t, FOUR1B - .25, OVEN1 + .1, eout)
    f = (lerp(BKX, FLX, fo), lerp(BKY, FLY, fo) - 60 * math.sin(math.pi * fo), lerp(.5, 1.1, fo))
    o = (lerp(BKX, OVX, oo), lerp(BKY, OVY, oo) - 60 * math.sin(math.pi * oo), lerp(.5, 1.1, oo))
    bob = win(t, F2 - .2, F3, .3, .3) * 5
    f = (f[0], f[1] + bob * math.sin(t * 3), f[2]); o = (o[0], o[1] + bob * math.sin(t * 3 + 1.4), o[2])
    u3 = seg(t, ONLY3 + .2, ONLY3 + 1.0)                     # f3: to the top of each panel
    f = (lerp(f[0], 330, u3), lerp(f[1], 336, u3), lerp(f[2], .82, u3))
    o = (lerp(o[0], 830, u3), lerp(o[1], 336, u3), lerp(o[2], .82, u3))
    u4 = seg(t, F4 - .5, F4 + .3)                            # f4: side by side
    f = (lerp(f[0], 470, u4), lerp(f[1], 488, u4), lerp(f[2], 1.15, u4))
    o = (lerp(o[0], 1170, u4), lerp(o[1], 488, u4), lerp(o[2], 1.15, u4))
    return f, o

def _two_bills(c, t):
    a = seg(t, CS - .2, CS + .4) * (1 - seg(t, SEC30 - .7, SEC30 - .1))
    if a <= 0: return
    # the bank
    ba = a * (1 - seg(t, ONLY3 - .1, ONLY3 + .4))
    if ba > 0:
        _box(c, BKX - 230, BKY - 62, 460, 124, ACC, ba, .8, .8, r=18)
        icon(c, 'bank', BKX - 170, BKY, .9, ACC, ba)
        text(c, "Meera's Bakehouse", BKX - 116, BKY - 6, 30, 800, WHITE, ba)
        text(c, 'Deccan Bank · current account', BKX - 116, BKY + 28, 22, 700, DIM, ba)
        la = ba * seg(t, BOTH1 - .2, BOTH1 + .3)
        if la > 0:
            for (tx, ty), ph in (((FLX, FLY - 80), 0.), ((OVX, OVY - 80), .5)):
                P = catmull(np.array([(BKX, BKY + 60), (lerp(BKX, tx, .5), BKY + 120), (tx, ty)], float), step=6)
                flowdots(c, P, ((t - BOTH1) * .8 + ph) % 1, la, GOLD, 6, 5.)
            chip(c, BKX, BKY + 112, 'this year', GOLD, la, 24)
    (fx, fy, fs), (ox, oy, os_) = _bills_pos(t)
    # flour sacks → cakes (f1–f3)
    sa = a * seg(t, FLOUR1 - .3, FLOUR1 + .2) * (1 - seg(t, F4 - .5, F4))
    if sa > 0:
        m3 = seg(t, ONLY3 + .2, ONLY3 + 1.0)
        tc = seg(t, USED3 - .1, CAKES3 + .3)
        for k in range(3):
            x = lerp(FLX - 120 + 120 * k, 180 + 130 * k, m3); y = lerp(812, 690, m3)
            q = clamp(tc * 1.6 - k * .3)
            if q < 1: sack(c, x, y, .72 * (1 - .25 * q), sa * (1 - q), 'Flour')
            if q > 0:
                if 0 < q < 1:
                    for j in range(5):
                        c.drawCircle(x + 30 * math.sin(j * 2.1 + t * 3), y - 60 - 50 * q - j * 8, 4, paint(CREAM, .5 * sa * (1 - q)))
                cake(c, x, y, .62, sa * q, ('loaf', 'slice', 'wedding')[k] if k < 2 else 'slice')
        ua = sa * seg(t, USED3 - .2, USED3 + .3) * m3
        if ua > 0: chip(c, 310, 768, 'used up this year', GREEN, ua, 26)
    # the oven under its bill (f1/f2), then small in the right panel (f3)
    oa = a * seg(t, OVEN1 - .3, OVEN1 + .2) * (1 - seg(t, F4 - .5, F4))
    if oa > 0:
        m3 = seg(t, ONLY3 + .2, ONLY3 + 1.0)
        oven(c, lerp(OVX, 800, m3), lerp(820, 690, m3), lerp(.68, .5, m3), oa, t, on=1.)
    _ten_years(c, t, a * (1 - seg(t, F4 - .5, F4)))
    # the bills
    g = seg(t, ONLY3 - .2, ONLY3 + .3) * (1 - seg(t, F4 - .5, F4))
    fa = a * seg(t, FOUR1 - .25, FOUR1 + .1)
    _glowbill(c, fx, fy, fa, 'Flour', 400000, fs, g, GREEN)
    oa2 = a * seg(t, FOUR1B - .25, FOUR1B + .1)
    _glowbill(c, ox, oy, oa2 * (1 - .2 * g), 'New oven', 400000, os_, 0, ORANGE)
    # deduct? tags
    qa = a * seg(t, DEDUCT1 - .25, DEDUCT1 + .2) * (1 - seg(t, ONLY3 - .3, ONLY3))
    if qa > 0:
        pu = .5 + .5 * math.sin((t - DEDUCT1) * 4) * win(t, F2, F2E, .3, .3)
        for x, y in ((fx, fy - 118), (ox, oy - 118)):
            chip(c, x, y - 4 * pu, 'deduct?', GOLD, qa * (.8 + .2 * pu), 28)
    # f4: stamps and verdicts
    _verdicts(c, t, (fx, fy, fs), (ox, oy, os_), a)

YS0, YS1, YSY = 940, 1800, 724                          # ten-year strip
def _ten_years(c, t, a):
    a = a * seg(t, OVEN3 - .3, OVEN3 + .2)
    if a <= 0: return
    n = 10; gap = 8; bw = (YS1 - YS0 - (n - 1) * gap) / n
    lit = seg(t, TEN3 - .3, TEN3 + .9, linr) * n
    charge = seg(t, CHARGED3 + .2, POOR3 - .1)
    rich = seg(t, NINE3 - .2, RICH3 + .2)
    base = 150; ly = YSY - 12
    # the normal line
    p = paint(DIM, .5 * a, stroke=1.6, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
    if charge > 0: c.drawLine(YS0 - 10, ly - base, YS1 + 4, ly - base, p)
    for k in range(n):
        x = YS0 + k * (bw + gap)
        on = clamp(lit - k)
        c.drawRRect(rrect(x, YSY, bw, 46, 10), paint(mixc('#0d1530', ACC, .25 * on), a))
        c.drawRRect(rrect(x + .5, YSY + .5, bw - 1, 45, 10), paint(ACC, (.35 + .5 * on) * a, stroke=1.6))
        text(c, '%02d-%02d' % (25 + k, 26 + k), x + bw / 2, YSY + 31, 22, 700, mixc(DIM, WHITE, on), a, 'c')
        if on > 0:
            h = base * on
            if k == 0: h = lerp(h, 30, charge); col = mixc(ACC, RED, charge)
            else: h = h + 70 * rich; col = mixc(ACC, GOLD, rich)
            c.drawRRect(rrect(x + bw * .2, ly - h, bw * .6, h, 6), paint(col, .75 * a))
    if charge > 0:
        # the whole ₹4,00,000 lands on year 1
        u = seg(t, CHARGED3 - .2, CHARGED3 + .6, ein)
        x0 = YS0 + bw / 2
        if u < 1:
            text(c, rupee(400000), lerp(830, x0, u), lerp(400, ly - base - 30, u), 26, 800, RED, a, 'c')
        pa = a * seg(t, POOR3 - .2, POOR3 + .2)
        text(c, 'poor', x0, ly - 50, 26, 800, RED, pa, 'c')
        ra = a * rich
        if ra > 0: text(c, 'rich', YS0 + (bw + gap) * 5.5, ly - base - 86, 28, 800, GOLD, ra, 'c')
    ta = a * seg(t, TEN3 - .2, TEN3 + .3)
    text(c, 'bakes for ten years', 800, 790, 26, 800, ACC, ta, 'c')

def _verdicts(c, t, f, o, a):
    if t < F4 - .6: return
    va = a * seg(t, F4 - .5, F4 + .2)
    # the line between the two kinds of spending
    lu = seg(t, F4 - .2, F4 + .6)
    rg = win(t, REPAIRS5 - .2, SEC30 - .3, .3, .3)
    c.drawLine(820, 300, 820, lerp(300, 790, lu), paint(mixc(DIM, GOLD, rg), (.4 + .5 * rg) * va, stroke=3 + 2 * rg))
    (fx, fy, fs), (ox, oy, os_) = f, o
    text(c, 'used up within the year', fx, 330, 28, 700, DIM, va * seg(t, USED4 - .3, USED4 + .2), 'c')
    text(c, 'lasting benefit', ox, 330, 28, 700, DIM, va * seg(t, LASTING4 - .3, LASTING4 + .2), 'c')
    su = seg(t, REVENUE4 - .3, REVENUE4 + .7, linr)
    if su > 0: stamp(c, fx, fy + 158, 'REVENUE', GREEN, va, su, -8, 42)
    cu = seg(t, CAPITAL4 - .3, CAPITAL4 + .7, linr)
    if cu > 0: stamp(c, ox, oy + 158, 'CAPITAL', ORANGE, va, cu, -8, 42)
    da = va * seg(t, DEDUCT4 - .2, DEDUCT4 + .3)
    if da > 0:
        w = chip(c, fx, 762, 'deduct it', GREEN, da, 30)
        tick(c, fx + w / 2 + 34, 762, da, 22)
    na = va * seg(t, DIRECTLY4 - .5, DIRECTLY4)
    if na > 0: chip(c, ox, 762, 'no direct deduction', ORANGE, na, 30)
    # f5 opening: "repairs sit on this line too"
    ra = va * seg(t, REPAIRS5 - .2, REPAIRS5 + .4)
    if ra > 0:
        drop = seg(t, REPAIRS5 - .2, REPAIRS5 + .5, eout)
        wob = 7 * math.sin((t - REPAIRS5) * 6) * (1 - seg(t, REPAIRS5 + .5, SEC30))
        y = lerp(240, 560, drop)
        c.save(); c.translate(820, y); c.rotate(wob)
        _box(c, -90, -30, 180, 60, GOLD, ra, .75, .95, r=30)
        _spanner(c, -54, 0, .55, -30, GOLD, ra)
        text(c, 'Repairs', 18, 10, 28, 800, WHITE, ra, 'c')
        c.restore()

# ---------------------------------------------------------------- f5: sections 30 and 31
def _sections(c, t):
    a = seg(t, SEC30 - .4, SEC30 + .3) * (1 - seg(t, F6 - .45, F6))
    if a <= 0: return
    # § 30 · building
    _box(c, 100, 290, 790, 520, VIO, a, .86, .55, r=22)
    w = sec(c, 136, 340, '30', a, VIO, 30)
    text(c, 'Building', 136 + w + 18, 351, 32, 800, WHITE, a)
    bg = seg(t, BUILDING5 - .2, BUILDING5 + .3)
    if bg > 0: c.drawCircle(270, 620, 150, paint(GOLD, .16 * bg * a, blur=40))
    building(c, 270, 748, .66, a, floors=2)
    text(c, 'of the building', 270, 792, 26, 800, GOLD, a * bg, 'c')
    items = [('Rent', RENT5), ('Rates', RATES5), ('Taxes', TAXES5), ('Repairs', REPAIRS5B), ('Insurance', INS5)]
    for k, (s_, tt) in enumerate(items):
        ia = a * seg(t, tt - .2, tt + .25, back)
        if ia <= 0: continue
        y = 430 + k * 72
        _box(c, 480, y - 28, 300, 56, GREEN, clamp(ia), .82, .8, r=28)
        text(c, s_, 510, y + 10, 28, 800, WHITE, clamp(ia))
        tick(c, 748, y, clamp(ia), 18)
    # § 31 · machinery, plant, furniture
    b = a * seg(t, SEC31 - .3, SEC31 + .3)
    if b <= 0: return
    _box(c, 1010, 290, 810, 520, VIO, b, .86, .55, r=22)
    w = sec(c, 1046, 340, '31', b, VIO, 30)
    text(c, 'Machinery, plant, furniture', 1046 + w + 18, 351, 30, 800, WHITE, b)
    for k, (s_, tt) in enumerate((('Current repairs', CURRENT5), ('Insurance', INS5B))):
        ia = b * seg(t, tt - .2, tt + .25, back)
        if ia <= 0: continue
        x = 1050 + k * 380
        _box(c, x, 400, 340, 56, GREEN, clamp(ia), .82, .8, r=28)
        text(c, s_, x + 30, 438, 28, 800, WHITE, clamp(ia))
        tick(c, x + 308, 428, clamp(ia), 18)
    for k, (fn, x, s_, tt) in enumerate(((oven, 1170, 'machinery', MACH5), (mixer, 1450, 'plant', PLANT5),
                                         (counter, 1680, 'furniture', FURN5))):
        g = seg(t, tt - .2, tt + .3)
        if g > 0: c.drawCircle(x, 660, 110, paint(GOLD, .18 * g * b, blur=30))
        if fn is oven: oven(c, x, 744, .5, b, t, on=g)
        elif fn is mixer: mixer(c, x, 744, .52, b, t, spin=g)
        else: counter(c, x, 744, .5, b)
        text(c, s_, x, 790, 26, 800, mixc(DIM, GOLD, g), b * (.5 + .5 * g), 'c')

# ---------------------------------------------------------------- f6: repair or capital
def _repairs(c, t):
    a = seg(t, F6 - .4, F6 + .3) * (1 - seg(t, F7 - .45, F7))
    if a <= 0: return
    c.drawLine(960, 300, 960, 800, paint(DIM, .35 * a, stroke=2))
    # left: current repairs
    shop(c, 300, 640, .46, a, t, lit=.6)
    ru = seg(t, REPAINT6 - .1, REPAINT6 + 1.3, linr)
    if 0 < ru:                                               # a fresh coat sweeping across the front
        x0, x1 = 300 - 124, 300 + 124; rx = lerp(x0, x1, ru)
        fa = a * (1 - seg(t, REPAINT6 + 1.3, REPAINT6 + 2.4))
        c.drawRect(skia.Rect(x0, 438, rx, 638), paint('#fff7e6', .24 * fa))
        c.drawRect(skia.Rect(rx - 10, 438, rx, 638), paint('#fff7e6', .45 * fa * (ru < 1), blur=6))
        if ru < 1: _roller(c, rx, 520, 1.05, '#fde68a', a)
    sp = seg(t, FIXING6 - .2, DOOR6 + .6)
    oven(c, 680, 640, .5, a, t, on=.6)
    if sp > 0:
        _spanner(c, 712, 522, .55, -20 + 30 * math.sin(sp * 9), '#cbd5e1', a * win(t, FIXING6 - .2, DOOR6 + .8, .2, .3))
        if sp >= 1: tick(c, 760, 500, a * seg(t, DOOR6 + .4, DOOR6 + .7), 18)
    ca = a * seg(t, CURRENT6 - .2, CURRENT6 + .3)
    if ca > 0:
        text(c, 'Current repair', 480, 340, 34, 800, GREEN, ca, 'c')
        chip(c, 480, 712, 'current repair', GREEN, ca, 28)
    da = a * seg(t, DEDUCTIBLE6 - .2, DEDUCTIBLE6 + .3)
    if da > 0:
        w = chip(c, 480, 780, 'deductible', GREEN, da, 28)
        tick(c, 480 + w / 2 + 30, 780, da, 20)
    # right: capital (dim until its turn)
    a = a * (.45 + .55 * seg(t, REPLACING6 - .5, REPLACING6))
    rep = seg(t, REPLACING6 - .1, REPLACING6 + .9)
    ox = 1240
    if rep < 1:
        oven(c, ox + 260 * ein(rep), 640, .5, a * (1 - rep), t, on=.2)
    if rep > 0:
        nx = lerp(ox - 200, ox, eout(rep))
        oven(c, nx, 640, .5, a * rep, t, on=1.)
        sh = win(t, REPLACING6 + .7, REPLACING6 + 1.8, .2, .6)
        if sh > 0: c.drawCircle(ox, 560, 100, paint(WHITE, .1 * sh * a, blur=30))
    building(c, 1620, 640, .6, a, floors=1)
    fu = seg(t, ADDING6 - .1, FLOOR6 + .3, ein)
    if fu > 0:
        top = 640 - (120 + 100) * .6 - 18 * .6
        fy = lerp(top - 260, top - 60 * .6 - 4, fu)
        _floor(c, 1620, fy, .6, a * clamp(fu * 3))
    cpa = a * seg(t, CAPITAL6 - .2, CAPITAL6 + .3)
    if cpa > 0:
        text(c, 'Capital', 1440, 340, 34, 800, ORANGE, cpa, 'c')
    su = seg(t, CAPITAL6 - .3, CAPITAL6 + .7, linr)
    if su > 0: stamp(c, 1430, 694, 'CAPITAL', ORANGE, a, su, -8, 40)
    na = a * seg(t, NOT6 - .2, NOT6 + .3)
    if na > 0:
        w = chip(c, 1440, 792, 'not a repair', ORANGE, na, 24)
        cross(c, 1440 + w / 2 + 28, 792, na, 18)

def _floor(c, x, y, s, a):
    """One extra storey (310 x 100 at s=1), its top-left corner at (x - 155s, y)."""
    if a <= 0: return
    w, h = 310 * s, 100 * s; x0 = x - w / 2
    c.drawRect(skia.Rect.MakeXYWH(x0, y, w, h), paint(shader=lgrad((0, y), (0, y + h), ['#e2e6ee', '#b8c0ce']), a=a))
    c.drawRect(skia.Rect.MakeXYWH(x0 - 8 * s, y - 18 * s, w + 16 * s, 18 * s), paint('#8d96a8', a))
    for i in range(3):
        wx = x0 + 37 * s + i * 92 * s
        c.drawRect(skia.Rect.MakeXYWH(wx, y + 22 * s, 54 * s, 56 * s), paint('#2a3446', a))
        c.drawRect(skia.Rect.MakeXYWH(wx, y + 22 * s, 54 * s, 56 * s), paint(ORANGE, .8 * a, stroke=2.4, cap=False))
    c.drawRect(skia.Rect.MakeXYWH(x0, y, w, h), paint(ORANGE, .9 * a, stroke=2.4, cap=False))

# ---------------------------------------------------------------- f7: three details
def _details(c, t):
    a = seg(t, F7 - .4, F7 + .3) * (1 - seg(t, F8 - .45, F8))
    if a <= 0: return
    for k, x in enumerate((100, 690, 1280)):                    # three empty panels first: "a few details"
        _box(c, x, 290, 540, 520, ACC, a * seg(t, F7 - .2 + .15 * k, F7 + .3 + .15 * k), .86, .45, r=22)
    # 1 · her own shop
    pa = a * seg(t, OWNER7 - .3, OWNER7 + .2)
    if pa > 0:
        text(c, 'Her own shop', 370, 350, 30, 800, WHITE, pa, 'c')
        shop(c, 480, 720, .36, pa, t, lit=.8)
        person(c, 220, 720, .78, pa, 'meera', t, look=.5)
        nu = seg(t, NOTIONAL7 - .3, NOTIONAL7 + .3, back)
        if nu > 0:
            bill(c, 370, 470, pa * clamp(nu), 'Notional rent', None, None, None, .82, -4)
            xa = pa * seg(t, NOTIONAL7 + .4, NOTIONAL7 + .7)
            if xa > 0:
                c.drawLine(280, 430, 460, 510, paint(RED, xa, stroke=5)); c.drawLine(280, 510, 460, 430, paint(RED, xa, stroke=5))
                chip(c, 370, 772, 'no deduction', RED, xa, 26)
    # 2 · a firm pays its partner
    fa = a * seg(t, FIRM7 - .3, FIRM7 + .2)
    if fa > 0:
        text(c, 'Rent to its partner', 960, 350, 30, 800, WHITE, fa, 'c')
        _box(c, 720, 470, 200, 150, BLUE, fa, .7, .9, r=16)
        icon(c, 'building', 820, 520, .8, BLUE, fa)
        text(c, 'Firm', 820, 594, 28, 800, WHITE, fa, 'c')
        person(c, 1110, 640, .72, fa, 'rohan', t, look=-.5, mood=.4)
        text(c, 'partner', 1110, 676, 24, 700, DIM, fa, 'c')
        ru = seg(t, PAYING7 - .2, PAYING7 + .4)
        if ru > 0:
            P = np.array([(925, 520), (980, 490), (1040, 500)], float)
            flowdots(c, catmull(P, step=5), ((t - PAYING7) * .9) % 1, fa * ru, GOLD, 5, 6.)
            text(c, 'rent', 985, 470, 24, 800, GOLD, fa * ru, 'c')
        oka = fa * seg(t, CAN7 - .2, CAN7 + .3, back)
        if oka > 0: tick(c, 960, 715, clamp(oka), 24)
        ra = fa * seg(t, REASON7 - .2, REASON7 + .3)
        if ra > 0: chip(c, 960, 772, 'if reasonable', GREEN, ra, 26)
    # 3 · a machine used for one month
    ma = a * seg(t, MACHINE7 - .3, MACHINE7 + .2)
    if ma > 0:
        text(c, 'Used for one month', 1550, 350, 30, 800, WHITE, ma, 'c')
        mixer(c, 1550, 606, .62, ma, t, spin=seg(t, MONTH7 - .2, MONTH7 + .2))
        bw = 36; x0 = 1550 - (12 * bw + 11 * 4) / 2
        mu = seg(t, MONTH7 - .3, MONTH7 + .2)
        for k in range(12):
            x = x0 + k * (bw + 4); on = mu if k == 11 else 0
            c.drawRRect(rrect(x, 636, bw, 40, 6), paint(mixc('#0d1530', ACC, .5 * on), ma))
            c.drawRRect(rrect(x + .5, 636.5, bw - 1, 39, 6), paint(ACC, (.3 + .6 * on) * ma, stroke=1.4))
            text(c, 'AMJJASONDJFM'[k], x + bw / 2, 664, 22, 700, mixc(DIM, WHITE, on), ma, 'c')
        iu = seg(t, FULL7 - .3, FULL7 + .5)
        bx, by, bw2 = 1340, 712, 420
        text(c, 'insurance premium', bx, by - 10, 24, 700, DIM, ma)
        c.drawRRect(rrect(bx, by, bw2, 30, 15), paint('#0b1226', ma))
        c.drawRRect(rrect(bx, by, bw2 * lerp(.08, 1, iu), 30, 15), paint(GREEN, .85 * ma))
        c.drawRRect(rrect(bx + .5, by + .5, bw2 - 1, 29, 15), paint(WHITE, .2 * ma, stroke=1.2))
        if iu > .9: tick(c, bx + bw2 + 28, by + 15, ma * seg(iu, .9, 1), 18)
        fa2 = ma * seg(t, FULL7 - .1, FULL7 + .3)
        if fa2 > 0: chip(c, 1550, 782, 'full premium allowed', GREEN, fa2, 24)

# ---------------------------------------------------------------- f8: partly personal (sec 38)
def _van(c, t):
    a = seg(t, F8 - .4, F8 + .3) * (1 - seg(t, F9 - .3, F9 + .2))
    if a <= 0: return
    # week strip
    days = ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
    wa = a * seg(t, MEERA8 - .3, MEERA8 + .2)
    cur = seg(t, MEERA8, FAMILY8 + .6, linr) * 6.999
    cur = cur if t < FAMILY8 + 2.2 else (t - FAMILY8 - 2.2) * 2.4 % 7
    kd = int(cur)
    bw, gap = 150, 12; x0 = 960 - (7 * bw + 6 * gap) / 2
    if wa > 0:
        for k, d in enumerate(days):
            x = x0 + k * (bw + gap); sun = k == 6
            shown = seg(t, (FAMILY8 - .3) if sun else MEERA8, (FAMILY8 + .2) if sun else MEERA8 + .3)
            col = mixc(DIM, '#94a3b8', 1) if sun else GREEN
            on = 1. if k == kd else 0.
            c.drawRRect(rrect(x, 290, bw, 92, 14), paint(shade(col, -.75), wa * (.6 + .4 * shown)))
            c.drawRRect(rrect(x + .5, 290.5, bw - 1, 91, 14), paint(col, (.4 + .5 * on) * wa, stroke=2 + 2 * on))
            text(c, d, x + bw / 2, 328, 26, 800, WHITE, wa, 'c')
            text(c, 'family' if sun else 'deliveries', x + bw / 2, 362, 22, 700, col, wa * shown, 'c')
    # the van, driving
    sun = kd == 6 and t > FAMILY8 - .3
    vx = 960 + 18 * math.sin(t * 1.3)
    road_y = 612
    rp = paint(DIM, .35 * a, stroke=4, cap=False); rp.setPathEffect(skia.DashPathEffect.Make([40, 30], -(t * 260) % 70))
    c.drawLine(300, road_y + 10, 1620, road_y + 10, rp)
    van(c, vx, road_y, .95, a * seg(t, ASSET8 - .4, ASSET8), BLUE, "Meera's Bakehouse", t, move=t * 260)
    if sun:
        k = seg(cur, 6, 6.3)
        icon(c, 'heart', vx, 410, .8, PINK, a * k)
        text(c, 'family trip', vx + 60, 420, 26, 800, PINK, a * k)
    pa = a * seg(t, PERSONAL8 - .2, PERSONAL8 + .3) * (1 - seg(t, MEERA8 - .3, MEERA8))
    if pa > 0:
        chip(c, 700, 420, 'business', GREEN, pa, 26); chip(c, 1220, 420, 'personal', '#94a3b8', pa, 26)
    sa = a * seg(t, SEC38 - .2, SEC38 + .3)
    if sa > 0: sec(c, 1250, 560, '38', sa, VIO, 30)
    # costs bar
    ca = a * seg(t, SEC38 + .3, SEC38 + .8)
    if ca <= 0: return
    bx, by, bw2, bh = 360, 690, 1200, 60
    text(c, "Van's costs · repairs, insurance, depreciation", bx, by - 16, 26, 700, DIM, ca)
    sp = seg(t, BUSINESS8 - .3, BUSINESS8 + .4)
    xs = bx + bw2 * lerp(1, 6 / 7, sp)
    c.drawRRect(rrect(bx, by + 6, bw2, bh, 14), paint(BLACK, .4 * ca, blur=10))
    c.save(); c.clipRRect(rrect(bx, by, bw2, bh, 14), True)
    c.drawRect(skia.Rect(bx, by, xs, by + bh), paint(mixc(ACC, GREEN, sp), .8 * ca))
    c.drawRect(skia.Rect(xs, by, bx + bw2, by + bh), paint('#64748b', .8 * ca))
    c.restore()
    if sp > 0:
        c.drawLine(xs, by - 6, xs, by + bh + 6, paint(WHITE, .9 * ca * sp, stroke=3))
        text(c, 'business share', (bx + xs) / 2, by + 40, 28, 800, '#06240f', ca * sp, 'c')
        cross(c, (xs + bx + bw2) / 2, by + bh / 2, ca * sp, 20)
    oa = ca * seg(t, ALLOWED8 - .2, ALLOWED8 + .3)
    if oa > 0:
        w = chip(c, (bx + xs) / 2, by + bh + 40, 'allowed', GREEN, oa, 26)
        tick(c, (bx + xs) / 2 + w / 2 + 28, by + bh + 40, oa, 18)
        chip(c, (xs + bx + bw2) / 2, by + bh + 40, 'personal', '#94a3b8', oa, 24)

# ---------------------------------------------------------------- f9: below the check card
WALL = [(r, k) for r in range(3) for k in range(8)]
def _check(c, t):
    a = seg(t, F9 - .2, F9 + .4) * (1 - seg(t, CE - .5, CE + .3))
    if a <= 0: return
    x0, y0, bw, bh = 760, 806, 48, 20
    for i, (r, k) in enumerate(WALL):
        tx = x0 + k * (bw + 2) + (bw / 2 if r % 2 else 0); ty = y0 - (r + 1) * (bh + 2)
        rx = x0 + 60 + hsh(i, 3) * 300; ry = y0 - 8 - hsh(i, 5) * 22
        u = seg(t, F9 + .3 + i * .1, F9 + .75 + i * .1, eout)
        x = lerp(rx, tx, u); y = lerp(ry, ty, u) - 40 * math.sin(math.pi * u)
        ang = (1 - u) * (hsh(i, 7) - .5) * 70
        c.save(); c.translate(x + bw / 2, y + bh / 2); c.rotate(ang)
        c.drawRRect(rrect(-bw / 2, -bh / 2, bw, bh, 3), paint('#9e4f35', a))
        c.drawRRect(rrect(-bw / 2, -bh / 2, bw, bh, 3), paint('#c98b6b', .8 * a, stroke=1.4))
        c.restore()
    text(c, 'collapsed wall, rebuilt', 736, 784, 24, 700, DIM, a * seg(t, COLLAPSED9 - .2, COLLAPSED9 + .3), 'r')
    ca = a * seg(t, A_CAP - .2, A_CAP + .3, back)
    if ca > 0:
        chip(c, 1460, 752, 'CAPITAL', ORANGE, clamp(ca), 30)
        text(c, 'a replacement, not a current repair', 1460, 806, 24, 700, ORANGE, a * seg(t, A_REPLACE - .2, A_REPLACE + .3), 'c')

def ch_f(c, t):
    if t < CS - .5 or t > CE + .5: return
    _two_bills(c, t)
    _sections(c, t)
    _repairs(c, t)
    _details(c, t)
    _van(c, t)
    _check(c, t)
