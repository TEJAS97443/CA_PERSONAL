"""Chapter L — Two regimes, one extra 20% (section 32(1)(iia) and section 115BAC).
l1  hook: the bakery; a new oven and mixer roll in beside it; a gold rosette with a "?" asks "reward?"
l2  "old rules: yes" (the rosette ticks); chips "manufactures goods" · "buys new plant or machinery"; a year-1
    depreciation bar: the normal part, then an extra slice glowing above it ("extra · year 1"); on "a catch …
    115BAC" a § 115BAC chip drops and a padlock locks the slice (it greys out)
l3  the regime switch sits on "Default · 115BAC"; Meera, "in it automatically"; chips "lower slab rates" ·
    "fewer deductions"; two locked chips "additional depreciation" · "35AD"; on "unless she opts out" the knob nudges
l4  the switch flips to "Opted out"; the padlocks open, the slice glows again, "+ 20% of cost"; tiles "makes goods"
    (factory) and "generates power" (bolt)
l5  two machine cards and two year columns: oven ₹4,00,000 × 20% = ₹80,000 → this year; mixer used < 180 days →
    half: ₹20,000 now → this year; an envelope with the other ₹20,000 flies to next year, with a small "Opted out"
    switch: "if still outside the default regime"
l6  trap: four tiles crossed as spoken: second-hand machinery · office machines (laptop) · road vehicles (van) ·
    fully deducted in one year (100%)
l7  the switch on "Opted out" over a strip of years: each yearly hop back is crossed; a curved arrow "once" and the
    chip "1 chance to come back"
l8  a short profit bar beside a taller depreciation bar; the part above the profit turns orange (unabsorbed
    depreciation), slides into "carry forward · no time limit ∞", then feeds four heads of income; Salaries crossed
l9  "set-off order": three blocks drop in turn — ① this year's depreciation, ② brought-forward business loss,
    ③ unabsorbed depreciation
l10 check, below the card: a printing press; the answer adds "yes, if it opts out of 115BAC" and "printing =
    manufacture · CBDT circular"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('l')
L2, L3, L4, L5, L6, L7, L8, L9, L10 = (T(b) for b in ('l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'))

# ---------------------------------------------------------------- word times
A_MACH, A_REWARD = W('l1', 'machines'), W('l1', 'reward')
B_YES, B_MANU, B_PLANT, B_EXTRA, B_YEAR, B_CATCH, B_SEC = (W('l2', 'yes'), W('l2', 'manufacture'), W('l2', 'plant'),
                                                          W('l2', 'extra'), W('l2', 'year'), W('l2', 'catch'),
                                                          W('l2', '115BAC'))
C_SEC, C_LOWER, C_FEWER, C_DED, C_INDIV, C_UNLESS, C_OUT = (W('l3', '115BAC'), W('l3', 'lower'), W('l3', 'fewer'),
                                                            W('l3', 'deductions'), W('l3', 'individual'),
                                                            W('l3', 'unless'), W('l3', 'out'))
D_OPTS, D_ADD, D_TWENTY, D_MAKES, D_GEN = (W('l4', 'opts'), W('l4', 'additional'), W('l4', 'twenty'),
                                           W('l4', 'makes'), W('l4', 'generates'))
E_FOUR, E_EIGHTY, E_MIXER, E_UNDER, E_HALF, E_TWENTY, E_NOW, E_OTHER, E_NEXT, E_STILL = (
    W('l5', 'four'), W('l5', 'eighty'), W('l5', 'mixer'), W('l5', 'under'), W('l5', 'half'), W('l5', 'twenty'),
    W('l5', 'now'), W('l5', 'other'), W('l5', 'next'), W('l5', 'still'))
F_NOT, F_SECOND, F_OFFICE, F_ROAD, F_FULLY = (W('l6', 'every'), W('l6', 'second'), W('l6', 'office'),
                                              W('l6', 'road'), W('l6', 'anything'))
G_HOP, G_YEAR, G_ONCE, G_ONE, G_BACK = W('l7', 'hop'), W('l7', 'year'), W('l7', 'once'), W('l7', 'one'), W('l7', 'back')
H_PROFIT, H_SMALL, H_DEP, H_UNUSED, H_UNABS, H_CARRIED, H_NO, H_SET, H_EXCEPT = (
    W('l8', 'profit'), W('l8', 'small'), W('l8', 'depreciation'), W('l8', 'unused'), W('l8', 'unabsorbed'),
    W('l8', 'carried'), W('l8', 'no'), W('l8', 'set'), W('l8', 'except'))
I_ORDER, I_THIS, I_OLD, I_UNABS = W('l9', 'order'), W('l9', 'this'), W('l9', 'old'), W('l9', 'unabsorbed')
Q_PRESS, Q_NEW = W('l10', 'press'), W('l10', 'new')
QA_YES, QA_OPTS, QA_PRINT, QA_CBDT = W('l10a', 'yes'), W('l10a', 'opts'), W('l10a', 'printing'), W('l10a', 'CBDT')

for tt, k in ((A_MACH - .2, 'whoosh'), (A_REWARD, 'pop'), (B_YES, 'ok'), (B_MANU, 'pop'), (B_EXTRA, 'chime'),
              (B_CATCH + .3, 'key'), (C_SEC, 'pop'), (C_LOWER, 'blip'), (D_OPTS + .1, 'tap'), (D_ADD, 'key'),
              (D_MAKES, 'pop'), (E_EIGHTY, 'chime'), (E_TWENTY, 'pop'), (E_NEXT - .2, 'flip'),
              (F_SECOND + .4, 'error'), (F_FULLY + .6, 'error'), (G_HOP + .1, 'warn'), (G_ONE, 'tick'),
              (H_CARRIED, 'whoosh'), (H_EXCEPT + .3, 'error'), (I_THIS + .36, 'thunk'), (I_OLD + .36, 'thunk'),
              (I_UNABS + .36, 'thunk'), (QA_YES, 'ok'), (QA_CBDT, 'chime')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _dash(col, a, w=2.2, on=10, off=7):
    p = paint(col, a, stroke=w, cap=False); p.setPathEffect(skia.DashPathEffect.Make([on, off], 0)); return p

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l'):
    if a <= 0: return 0
    ftext(c, s, x + 1.5, y + 2.5, size, MONO, BLACK, .55 * a, align)
    return ftext(c, s, x, y, size, MONO, col, a, align)

def _bez(p0, pm, p1, u):
    return ((1 - u) ** 2 * p0[0] + 2 * u * (1 - u) * pm[0] + u * u * p1[0],
            (1 - u) ** 2 * p0[1] + 2 * u * (1 - u) * pm[1] + u * u * p1[1])

def _rosette(c, x, y, r, a, t, mark='?', col=GOLD, u=1.):
    """A prize rosette centred at (x, y): two ribbon tails, a pleated ring, a mark in the middle."""
    if a <= 0 or u <= 0: return
    k = back(clamp(u)); c.save(); c.translate(x, y); c.scale(k, k); c.rotate(4 * math.sin(t * 1.7))
    for sg in (-1, 1):
        P = poly(np.array([(sg * r * .25, r * .5), (sg * r * .75, r * 1.9), (sg * r * .45, r * 1.7), (sg * r * .2, r * 2.0), (0, r * .6)]))
        c.drawPath(P, paint(shade(col, -.3) if sg < 0 else shade(col, -.15), a))
    n = 16
    P = poly(np.array([((r * (1 if j % 2 == 0 else .86)) * math.cos(j * math.pi / n), (r * (1 if j % 2 == 0 else .86)) * math.sin(j * math.pi / n)) for j in range(2 * n)]))
    c.drawPath(P, paint(BLACK, .35 * a, blur=8))
    c.drawPath(P, paint(shader=rgrad(-r * .3, -r * .3, r * 1.4, [shade(col, .35), col, shade(col, -.3)]), a=a))
    c.drawCircle(0, 0, r * .62, paint('#1a1405', .9 * a)); c.drawCircle(0, 0, r * .62, paint(shade(col, .3), a, stroke=2))
    c.restore()
    if mark == '?': text(c, '?', x, y + r * .36, r * .95, 800, col, a * k, 'c')
    elif mark == 'tick': tick(c, x, y, a * k, r * .42, GREEN)

def _bolt_tile(c, cx, cy, s):
    bolt(c, cx, cy, 58 * s / .62 * .62, GOLD, 1.)

def _press(c, x, y, s, a, t, run=1.):
    """A small offset printing press standing at (x, y): body, a turning drum on top, blank paper fed in on the left
    and printed sheets sliding out on the right."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-170, -12, 340, 24), paint(BLACK, .45 * a, blur=10))
    # body and legs
    c.drawRRect(rrect(-100, -96, 200, 82, 10), paint(shader=lgrad((0, -96), (0, -14), ['#5b6a86', '#2b3348']), a=a))
    c.drawRRect(rrect(-100, -96, 200, 82, 10), paint('#8b97b0', .8 * a, stroke=2))
    for lx in (-84, 72): c.drawRect(skia.Rect(lx, -16, lx + 12, 0), paint('#3a4560', a))
    c.drawRRect(rrect(30, -80, 50, 16, 5), paint(GREEN if run > .5 else '#475569', .9 * a))
    # the drum
    c.drawRRect(rrect(-78, -150, 156, 56, 26), paint(shader=lgrad((0, -150), (0, -94), ['#cbd5e1', '#64748b']), a=a))
    c.save(); c.clipRRect(rrect(-78, -150, 156, 56, 26), True)
    ph = (t * 60 * run) % 26
    for k in range(9): c.drawLine(-78 + ph + k * 26 - 26, -150, -78 + ph + k * 26 - 26, -94, paint('#475569', .5 * a, stroke=3))
    c.restore()
    c.drawRRect(rrect(-78, -150, 156, 56, 26), paint('#334155', a, stroke=2))
    # feed tray (blank paper) and output tray (printed sheets)
    for k in range(4):
        c.drawRect(skia.Rect(-170 + k * 2, -70 - k * 5, -104 + k * 2, -64 - k * 5), paint(CREAM, a))
    q = (t * .6 * run) % 1
    for k in range(3):
        sx = 104 + k * 2; sy = -40 - k * 5
        c.drawRect(skia.Rect(sx, sy, sx + 70, sy + 8), paint(CREAM, a))
    px = 100 + 60 * q
    c.drawRect(skia.Rect(px, -84, px + 70, -58), paint(CREAM, a * (1 - seg(q, .8, 1))))
    for j in range(2): c.drawLine(px + 8, -78 + j * 9, px + 60, -78 + j * 9, paint(INK, .6 * a * (1 - seg(q, .8, 1)), stroke=2))
    c.restore()

def _envelope(c, x, y, w, h, a, label, col=GOLD, ang=0.):
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang)
    c.drawRRect(rrect(-w / 2 + 3, -h / 2 + 8, w, h, 8), paint(BLACK, .4 * a, blur=10))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 8), paint(CREAM, a))
    P = skia.Path(); P.moveTo(-w / 2, -h / 2); P.lineTo(0, h * .05); P.lineTo(w / 2, -h / 2)
    c.drawPath(P, paint('#c9bb98', a, stroke=2))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 8), paint('#b9a77f', a, stroke=1.6))
    ftext(c, label, 0, h / 2 - 14, 26, MONO, INK, a, 'c')
    c.restore()

def _bar(c, x, base, w, h, col, a, glow=0., grey=0.):
    if a <= 0 or h <= .5: return
    cc = mixc(col, '#64748b', grey)
    if glow > 0: c.drawRRect(rrect(x - 6, base - h - 6, w + 12, h + 12, 10), paint(cc, .45 * glow * a, blur=12))
    c.drawRRect(rrect(x, base - h, w, h, 8), paint(shader=lgrad((x, 0), (x + w, 0), [shade(cc, .25), shade(cc, -.25)]), a=.95 * a))
    c.drawRRect(rrect(x, base - h, w, h, 8), paint(shade(cc, .45), .8 * a, stroke=1.6))

# ---------------------------------------------------------------- l1 – l4: the reward, the catch, the switch
BCX, BCW, BCY = 1500, 150, 740                           # the year-1 depreciation bar
H_NORM, H_EXTRA = 140, 180

def _p1(c, t):
    a = 1 - seg(t, L3 - .45, L3 - .05)
    if a <= 0: return
    shop(c, 420, 720, .74, a, t, lit=1.)
    c.drawLine(640, 722, 1180, 722, paint(WHITE, .14 * a, stroke=2))
    for k, (fn, x1, s) in enumerate(((oven, 820, .45), (mixer, 1010, .48))):
        u = seg(t, A_MACH - .5 + .2 * k, A_MACH + .5 + .2 * k, eout)
        x = lerp(2150 + 180 * k, x1, u)
        if k == 0: oven(c, x, 720, s, a, t, on=seg(t, A_MACH + .6, A_MACH + 1.2))
        else: mixer(c, x, 720, s, a, t, spin=seg(t, A_MACH + .6, A_MACH + 1.2))
    ru = seg(t, A_REWARD - .2, A_REWARD + .4)
    yes = seg(t, B_YES - .15, B_YES + .3)
    _rosette(c, 800, 330, 40, a, t, '?' if yes < .5 else 'tick', mixc(GOLD, GREEN, yes * .4), ru)
    if ru > 0: text(c, 'reward?', 860, 342, 30, 800, GOLD, a * ru * (1 - yes), shadow=6)
    if yes > 0: chip(c, 860, 330, 'old rules: yes', GREEN, a * yes, 26, align='l')
    ma = a * seg(t, B_MANU - .2, B_MANU + .25, back)
    if ma > 0:
        w_ = chip(c, 980, 430, 'manufactures goods', ACC, ma, 24, align='l')
        icon(c, 'factory', 980 - 36, 430, .55, ACC, ma)
    pa = a * seg(t, B_PLANT - .2, B_PLANT + .25, back)
    if pa > 0:
        chip(c, 980, 488, 'buys new plant or machinery', ACC, pa, 24, align='l')
        icon(c, 'gear', 980 - 36, 488, .55, ACC, pa)

def _depbar(c, t):
    """The year-1 depreciation bar: normal part + the extra slice; locked by 115BAC, unlocked on opting out."""
    a = seg(t, B_EXTRA - .5, B_EXTRA - .1) * (1 - seg(t, L5 - .45, L5 - .05))
    if a <= 0: return
    hn = H_NORM * seg(t, B_EXTRA - .5, B_EXTRA, eout)
    he = H_EXTRA * seg(t, B_EXTRA - .1, B_EXTRA + .5, back)
    lock = seg(t, B_CATCH + .1, B_CATCH + .5); unlock = seg(t, D_ADD - .2, D_ADD + .4)
    grey = lock * (1 - unlock)
    _bar(c, BCX, BCY, BCW, hn, ACC, a)
    _bar(c, BCX, BCY - hn - 4, BCW, he, GOLD, a, glow=(1 - grey) * (.5 + .3 * math.sin(t * 3)), grey=grey)
    text(c, 'normal', BCX - 18, BCY - hn / 2 + 9, 24, 700, DIM, a, 'r')
    tw = seg(t, D_TWENTY - .15, D_TWENTY + .3)
    ly = BCY - hn - 4 - he / 2 + 9
    text(c, '+ extra', BCX - 18, ly, 26, 800, mixc(GOLD, '#94a3b8', grey), a * (1 - tw), 'r', shadow=6)
    if tw > 0:
        text(c, '+ 20% of cost', BCX - 18, ly, 26, 800, GOLD, a * tw, 'r', shadow=6)
        text(c, 'of new plant / machinery', BCX - 18, ly + 30, 21, 600, DIM, a * tw, 'r')
    ya = a * seg(t, B_YEAR - .15, B_YEAR + .25)
    text(c, 'year 1', BCX + BCW / 2, BCY + 36, 26, 800, WHITE, ya, 'c', shadow=6)
    if lock > 0:
        padlock(c, BCX + BCW / 2, BCY - hn - 4 - he / 2, 1.5, mixc(GOLD, GREEN, unlock), a * lock, unlock)
        sa = a * seg(t, B_SEC - .3, B_SEC + .1, back) * (1 - seg(t, L3 - .4, L3))
        if sa > 0: sec(c, BCX + BCW / 2, BCY - hn - he - 40, '115BAC', sa, size=24, align='c')

def _p2(c, t):
    a = seg(t, L3 - .45, L3 - .05) * (1 - seg(t, L5 - .45, L5 - .05))
    if a <= 0: return
    pos = seg(t, D_OPTS - .05, D_OPTS + .55)
    nudge = .12 * math.sin(math.pi * seg(t, C_UNLESS, C_OUT + .2)) if t < D_OPTS - .1 else 0.
    regime_switch(c, 760, 360, a * seg(t, C_SEC - .35, C_SEC + .1), pos + nudge, t, .95)
    ma = a * seg(t, L3 - .3, L3 + .2)
    person(c, 220, 470, .85, ma, 'meera', t, look=.5)
    ia = a * seg(t, C_INDIV - .2, C_INDIV + .3) * (1 - seg(t, D_OPTS - .2, D_OPTS + .2))
    if ia > 0:
        arrow(c, 330, 380, 470, 370, GOLD, 3, ia, 14)
        text(c, 'in it automatically', 220, 512, 24, 800, GOLD, ia, 'c', shadow=6)
    dimd = 1 - .6 * pos
    la = a * seg(t, C_LOWER - .2, C_LOWER + .25, back)
    if la > 0: chip(c, 620, 474, 'lower slab rates', GREEN, la * dimd, 24)
    fa = a * seg(t, C_FEWER - .2, C_FEWER + .25, back)
    if fa > 0: chip(c, 900, 474, 'fewer deductions', ORANGE, fa * dimd, 24)
    unlock = seg(t, D_ADD - .2, D_ADD + .4)
    for k, (s, x) in enumerate((('additional depreciation', 620), ('35AD', 900))):
        ka = a * seg(t, C_DED + .1 + .25 * k, C_DED + .45 + .25 * k, back)
        if ka <= 0: continue
        col = mixc('#94a3b8', GOLD, unlock)
        w_ = chip(c, x + 20, 560, s, col, ka, 24)
        padlock(c, x + 20 - w_ / 2 - 26, 560, .75, mixc(GOLD, GREEN, unlock), ka, unlock)
    for k, (fn, lab_, tt) in enumerate((('factory', 'makes goods', D_MAKES), (_bolt_tile, 'generates power', D_GEN))):
        ta = a * seg(t, tt - .2, tt + .25, back)
        if ta > 0: tile(c, 510 + 270 * k, 620, 230, 150, fn, lab_, ta, GOLD, glow=win(t, tt, tt + 1.2, .2, .6))

# ---------------------------------------------------------------- l5: the oven, the mixer, this year and next
YC = [(1070, 'this year', 'P.Y. 2025-26'), (1450, 'next year', 'P.Y. 2026-27')]   # year columns (left x)
YCW, YCT, YCB = 330, 300, 730

def _p3(c, t):
    a = seg(t, L5 - .45, L5 - .05) * (1 - seg(t, L6 - .45, L6 - .05))
    if a <= 0: return
    # machine cards
    oa = a * seg(t, E_FOUR - .4, E_FOUR - .05)
    slab(c, 120, 290, 820, 200, oa, GOLD)
    oven(c, 230, 470, .5, oa, t, on=1.)
    _mono(c, '₹4,00,000 × 20%', 360, 370, 32, WHITE, oa * seg(t, E_FOUR - .2, E_FOUR + .2))
    ea = oa * seg(t, E_EIGHTY - .25, E_EIGHTY + .2)
    if ea > 0:
        w_ = _mono(c, '= ', 360, 436, 34, DIM, ea)
        roll(c, 80000, 360 + w_, 436, seg(t, E_EIGHTY - .2, E_EIGHTY + .5), 34, GOLD, ea, 'l')
        text(c, 'extra', 360 + w_ + ftext_w('₹80,000', 34) + 14, 434, 28, 800, GOLD, ea, shadow=6)
    xa = a * seg(t, E_MIXER - .4, E_MIXER - .05)
    slab(c, 120, 510, 820, 220, xa, ORANGE)
    mixer(c, 230, 712, .52, xa, t, spin=.6)
    ua = xa * seg(t, E_UNDER - .2, E_UNDER + .25, back)
    if ua > 0: chip(c, 360, 560, 'used < 180 days → half', ORANGE, ua, 24, align='l')
    ha = xa * seg(t, E_HALF - .1, E_HALF + .3)
    _mono(c, 'half of 20% × ₹2,00,000', 360, 626, 30, WHITE, ha)
    na = xa * seg(t, E_TWENTY - .25, E_TWENTY + .2)
    if na > 0:
        w_ = _mono(c, '= ', 360, 686, 34, DIM, na)
        roll(c, 20000, 360 + w_, 686, seg(t, E_TWENTY - .2, E_TWENTY + .5), 34, GOLD, na, 'l')
        text(c, 'now', 360 + w_ + ftext_w('₹20,000', 34) + 14, 684, 28, 800, GOLD, na * seg(t, E_NOW - .2, E_NOW + .2), shadow=6)
    # the two year columns
    ca = a * seg(t, E_EIGHTY + .1, E_EIGHTY + .5)
    for k, (x, lab_, py) in enumerate(YC):
        cka = ca if k == 0 else a * seg(t, E_OTHER - .3, E_OTHER + .2)
        if cka <= 0: continue
        c.drawRRect(rrect(x, YCT, YCW, YCB - YCT, 18), paint('#0b1024', .78 * cka))
        c.drawRRect(rrect(x, YCT, YCW, YCB - YCT, 18), paint(GOLD if k == 0 else VIO, .7 * cka, stroke=2))
        text(c, lab_, x + YCW / 2, YCT + 44, 28, 800, WHITE, cka, 'c')
        text(c, py, x + YCW / 2, YCT + 76, 22, 700, DIM, cka, 'c')
    # tokens fly into this year
    for k, (amt, tt, src) in enumerate(((80000, E_EIGHTY + .4, (720, 436)), (20000, E_NOW, (720, 686)))):
        u = seg(t, tt, tt + .8, ease)
        if u <= 0: continue
        dst = (YC[0][0] + YCW / 2, YCB - 70 - 90 * k)
        x, y = _bez(src, ((src[0] + dst[0]) / 2, min(src[1], dst[1]) - 120), dst, u)
        w_ = ftext_w(rupee(amt), 30) + 40
        c.drawRRect(rrect(x - w_ / 2, y - 28, w_, 48, 12), paint('#1a1405', .92 * ca))
        c.drawRRect(rrect(x - w_ / 2, y - 28, w_, 48, 12), paint(GOLD, .9 * ca, stroke=2))
        _mono(c, rupee(amt), x, y + 6, 30, GOLD, ca, 'c')
    # the other half waits for next year, if she stays opted out
    eu = seg(t, E_NEXT - .3, E_NEXT + .6, ease)
    ea2 = a * seg(t, E_OTHER - .2, E_OTHER + .2)
    if ea2 > 0:
        src = (760, 626); dst = (YC[1][0] + YCW / 2, YCB - 160)
        x, y = _bez(src, ((src[0] + dst[0]) / 2, 250), dst, eu)
        _envelope(c, x, y, 200, 110, ea2, rupee(20000), GOLD, -6 * math.sin(math.pi * eu))
        sa = a * seg(t, E_STILL - .25, E_STILL + .2)
        if sa > 0:
            regime_switch(c, dst[0], YCB - 46, sa, 1., t, .42)
            text(c, 'if still opted out', dst[0], YCB - 82, 22, 800, GOLD, sa, 'c', shadow=6)

# ---------------------------------------------------------------- l6: what never qualifies
TILES = [('second-hand machinery', F_SECOND), ('office machines · laptop', F_OFFICE), ('road vehicles · van', F_ROAD),
         ('fully deducted in one year', F_FULLY)]

def _p4(c, t):
    a = seg(t, L6 - .45, L6 - .05) * (1 - seg(t, L7 - .45, L7 - .05))
    if a <= 0: return
    ha = a * seg(t, F_NOT - .2, F_NOT + .3)
    text(c, 'No additional depreciation on:', 960, 300, 34, 800, WHITE, ha, 'c', shadow=8)
    for k, (lab_, tt) in enumerate(TILES):
        ta = a * seg(t, tt - .25, tt + .2)
        if ta <= 0: continue
        x = 140 + k * 420; y = 350; w, h = 380, 380
        pop = seg(t, tt - .25, tt + .35, back); yy = y + 16 * (1 - pop)
        c.drawRRect(rrect(x, yy + 8, w, h, 20), paint(BLACK, .4 * ta, blur=16))
        c.drawRRect(rrect(x, yy, w, h, 20), paint(shader=lgrad((0, yy), (0, yy + h), ['#1a2340', '#0b1020']), a=ta))
        c.drawRRect(rrect(x, yy, w, h, 20), paint(RED, .5 * ta, stroke=2))
        cx = x + w / 2; by = yy + 270
        if k == 0:
            mixer(c, cx - 20, by, .62, ta * .85, t)
            chip(c, cx + 100, yy + 80, 'used', '#94a3b8', ta, 22)
        elif k == 1: laptop(c, cx, by - 20, 1.1, ta, on=1.)
        elif k == 2: van(c, cx, by - 10, .82, ta, BLUE, "Meera's Bakehouse", t)
        else:
            oven(c, cx, by, .55, ta * .85, t, on=.4)
            stamp(c, cx, yy + 150, '100%', GOLD, ta, seg(t, tt + .1, tt + 1.1), -12, 34)
        lines = wrap(lab_, 28, w - 40, 800)
        for j, ln in enumerate(lines[:2]):
            text(c, ln, cx, yy + 318 + j * 32, 28, 800, WHITE, ta, 'c')
        xa = ta * seg(t, tt + .3, tt + .6, back)
        if xa > 0:
            cross(c, x + w - 30, yy + 30, xa, 22)

# ---------------------------------------------------------------- l7: no hopping between regimes
YRS = ['2025-26', '2026-27', '2027-28', '2028-29']

def _p5(c, t):
    a = seg(t, L7 - .45, L7 - .05) * (1 - seg(t, L8 - .45, L8 - .05))
    if a <= 0: return
    hops = [G_HOP + .05 + .5 * k for k in range(3)]
    wig = sum(.22 * math.sin(math.pi * seg(t, h, h + .4)) for h in hops)
    regime_switch(c, 960, 380, a, 1. - wig, t, 1.1)
    ha = a * seg(t, G_HOP - .3, G_HOP + .1)
    if ha > 0:
        yearstrip(c, 560, 540, 800, 4, ha, YRS, hl={0: 1.}, col=ACC, h=64)
        bw = (800 - 30) / 4
        for k, h in enumerate(hops):
            xa = ha * seg(t, h + .15, h + .4, back)
            if xa > 0: cross(c, 560 + (k + 1) * (bw + 10) + bw / 2, 640, xa, 18)
        text(c, 'switch back every year?', 960, 690, 26, 800, RED, ha * seg(t, hops[0] + .2, hops[0] + .5), 'c', shadow=6)
    oa = a * seg(t, G_ONCE - .2, G_ONCE + .3)
    if oa > 0:
        u = seg(t, G_ONCE, G_ONE + .3)
        P = np.array([_bez((1180, 300), (960, 200), (740, 300), q) for q in np.linspace(0, u, 24)])
        if len(P) > 1:
            c.drawPath(poly(P, False), paint(GOLD, .9 * oa, stroke=3.2))
            if u > .9: arrow(c, *P[-3], *P[-1], GOLD, 3.2, oa, 16)
        text(c, 'once', 960, 232, 28, 800, GOLD, oa * seg(t, G_ONE - .2, G_ONE + .2), 'c', shadow=6)
        ca = a * seg(t, G_ONE - .15, G_ONE + .3, back)
        if ca > 0: chip(c, 960, 780, '1 chance to come back', GOLD, ca, 28)

# ---------------------------------------------------------------- l8: unabsorbed depreciation
PB, PX, DX, BW_ = 690, 260, 430, 120
HP, HD = 140, 300

def _p6(c, t):
    a = seg(t, L8 - .45, L8 - .05) * (1 - seg(t, L9 - .45, L9 - .05))
    if a <= 0: return
    pa = a * seg(t, H_PROFIT - .25, H_PROFIT + .2)
    _bar(c, PX, PB, BW_, HP * seg(t, H_PROFIT - .2, H_PROFIT + .4, eout), GREEN, pa)
    text(c, 'profit', PX + BW_ / 2, PB + 36, 26, 800, GREEN, pa, 'c')
    da = a * seg(t, H_DEP - .3, H_DEP + .1)
    hd = HD * seg(t, H_DEP - .3, H_DEP + .4, eout)
    split = seg(t, H_UNUSED - .1, H_UNUSED + .4)
    mv = seg(t, H_CARRIED - .1, H_CARRIED + .9, ease)
    # carry forward, no time limit (the box first, so the moving slice lands on top of it)
    ca = a * seg(t, H_CARRIED - .3, H_CARRIED + .2)
    if ca > 0:
        c.drawRRect(rrect(760, 290, 420, 180, 18), paint('#1a0f05', .85 * ca))
        c.drawRRect(rrect(760, 290, 420, 180, 18), paint(ORANGE, .8 * ca, stroke=2))
        text(c, 'carried forward', 1056, 336, 28, 800, WHITE, ca, 'c')
        na = ca * seg(t, H_NO - .2, H_NO + .3)
        text(c, 'no time limit', 1056, 372, 24, 700, ORANGE, na, 'c')
        text(c, '∞', 1056, 448, 64, 800, ORANGE, na * (.8 + .2 * math.sin(t * 3)), 'c', shadow=8)
    _bar(c, DX, PB, BW_, min(hd, HP if split > 0 else hd), GOLD, da)
    if split > 0 and hd > HP:
        ex = hd - HP
        bw = BW_ * (1 - .2 * mv); bh = ex * (1 - .4 * mv)
        bx = lerp(DX, 800, mv); by = lerp(PB - HP - 6, 452, mv)
        _bar(c, bx, by, bw, bh, mixc(GOLD, ORANGE, split), da, glow=split)
        la = da * seg(t, H_UNABS - .2, H_UNABS + .3) * (1 - mv)
        if la > 0:
            text(c, 'unabsorbed', DX + BW_ + 18, PB - HP - ex / 2, 26, 800, ORANGE, la, shadow=6)
            text(c, 'depreciation', DX + BW_ + 18, PB - HP - ex / 2 + 32, 26, 800, ORANGE, la, shadow=6)
        lb = da * seg(mv, .8, 1)
        if lb > 0: text(c, 'unabsorbed', bx + bw / 2, by - bh - 10, 20, 800, ORANGE, lb, 'c', shadow=6)
    elif hd > 0:
        _bar(c, DX, PB, BW_, hd, GOLD, da)
    text(c, 'depreciation', DX + BW_ / 2, PB + 36, 26, 800, GOLD, da, 'c')
    sa = a * seg(t, H_SMALL - .2, H_SMALL + .3)
    if sa > 0: c.drawLine(PX - 10, PB - HP, DX + BW_ + 10, PB - HP, _dash(GREEN, .8 * sa))
    # set off against any head except salaries
    ha = a * seg(t, H_SET - .3, H_SET + .2)
    if ha > 0:
        hl = {i: seg(t, H_SET + .2 * i, H_SET + .2 * i + .4) for i in (1, 2, 3, 4)}
        mouths = heads5(c, 760, 500, 1040, ha, hl, t, h=250)
        for i in (1, 2, 3, 4):
            u = seg(t, H_SET + .2 * (i - 1), H_SET + .2 * (i - 1) + .7)
            if 0 < u < 1:
                x, y = _bez((1100, 470), ((1100 + mouths[i][0]) / 2, 430), mouths[i], u)
                coin(c, x, y, 14, ha, ORANGE)
        xa = ha * seg(t, H_EXCEPT - .1, H_EXCEPT + .3, back)
        if xa > 0:
            cross(c, mouths[0][0], 640, xa, 34)
            text(c, 'not salaries', mouths[0][0], 800, 24, 800, RED, xa, 'c', shadow=6)

# ---------------------------------------------------------------- l9: the set-off order
ORDER = [('this year’s depreciation', GOLD, I_THIS), ('brought-forward business loss', RED, I_OLD),
         ('unabsorbed depreciation', ORANGE, I_UNABS)]

def _p7(c, t):
    a = seg(t, L9 - .45, L9 - .05) * (1 - seg(t, L10 - .45, L10 - .05))
    if a <= 0: return
    ha = a * seg(t, I_ORDER - .3, I_ORDER + .2)
    text(c, 'Set-off order', 960, 300, 36, 800, WHITE, ha, 'c', shadow=8)
    text(c, 'against the income of the year', 960, 338, 24, 600, DIM, ha, 'c')
    if ha > 0:
        P = np.array([(500, 380), (500, 720)])
        c.drawLine(500, 380, 500, 700, paint(DIM, .5 * ha, stroke=3))
        arrow(c, 500, 690, 500, 730, DIM, 3, ha, 16)
    for k, (lab_, col, tt) in enumerate(ORDER):
        u = seg(t, tt - .1, tt + .55)
        if u <= 0: continue
        y = 380 + k * 120
        yy = lerp(y - 160, y, ein(seg(u, 0, .7))) - 10 * math.sin(math.pi * seg(u, .7, 1))
        ba = a * seg(u, 0, .25)
        c.drawRRect(rrect(560, yy + 8, 860, 92, 16), paint(BLACK, .45 * ba, blur=14))
        c.drawRRect(rrect(560, yy, 860, 92, 16), paint(shader=lgrad((560, 0), (1420, 0), [shade(col, -.55), shade(col, -.75)]), a=ba))
        c.drawRRect(rrect(560, yy, 860, 92, 16), paint(col, .9 * ba, stroke=2.2))
        c.drawCircle(612, yy + 46, 28, paint(col, ba)); text(c, str(k + 1), 612, yy + 57, 30, 800, '#0b1020', ba, 'c')
        text(c, lab_, 664, yy + 57, 32, 800, WHITE, ba)

# ---------------------------------------------------------------- l10: check, below the card
def _check(c, t):
    a = seg(t, L10 - .2, L10 + .4)
    if a <= 0: return
    pa = a * seg(t, Q_PRESS - .3, Q_PRESS + .1)
    _press(c, 520, 812, .62, pa, t, run=seg(t, Q_NEW - .2, Q_NEW + .3))
    na = a * seg(t, Q_NEW - .2, Q_NEW + .25, back)
    if na > 0: chip(c, 680, 752, 'new printing machine', ACC, na, 24, align='l')
    ya = a * seg(t, QA_YES - .15, QA_YES + .3, back)
    if ya > 0:
        w_ = chip(c, 1000, 752, 'yes, if it opts out of 115BAC', GREEN, ya, 24, align='l')
        tick(c, 1000 + w_ + 26, 752, ya * seg(t, QA_OPTS - .1, QA_OPTS + .3), 16)
    ca = a * seg(t, QA_PRINT - .15, QA_PRINT + .3, back)
    if ca > 0:
        w_ = chip(c, 680, 804, 'printing = manufacture', GOLD, ca, 24, align='l')
        sa = a * seg(t, QA_CBDT - .15, QA_CBDT + .3, back)
        if sa > 0: sec(c, 680 + w_ + 14, 804, 'CBDT circular', sa, size=22, mark='')

def ch_l(c, t):
    if t < CS - .5 or t > CE + .5: return
    _p1(c, t)
    _p2(c, t)
    _depbar(c, t)
    _p3(c, t)
    _p4(c, t)
    _p5(c, t)
    _p6(c, t)
    _p7(c, t)
    _check(c, t)
