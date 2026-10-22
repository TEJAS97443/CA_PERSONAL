"""Chapter J — Selling from a block (section 50) · hero chapter.
One stage for the whole chapter: the van block as a glass tank ("Motor vehicles · 15%", its level = the written down
value) centre-left, a gold sale-price column beside it, the short-term capital gain / loss bucket on the right, four
numbered sale slots along the top, the vans and a small computation sheet on the left.
j1  hook: the old van drives off and leaves its "sale price" tag; the tag becomes a column taller than the block's
    level; the tap drains the tank empty and the column's top is left over: the floor flashes red, "less than ₹0"
j2  the tank refills through the pipe to ₹3,00,000 on "three lakh"; four sale slots pop in on "four"
j3  sale 1: a new van rolls in and its ₹5,00,000 pours in through the pipe (level ₹8,00,000); the old van leaves its
    ₹3,60,000 tag, which becomes the sale column; the sheet adds ₹3,00,000 + ₹5,00,000 − ₹3,60,000 as spoken; the
    drain stops at ₹4,40,000 (green); a slice skims off into "depreciation runs on ₹4,40,000"
j4  sale 2: reset to ₹3,00,000; a ghost new van is crossed ("no new van"); the only van's ₹3,60,000 column stands
    above the level; the drain empties the tank and the glass cracks: CEASED
j5  a NO DEPRECIATION stamp; the column's left-over top is bracketed "₹60,000 over WDV" and hops into the bucket
    (gold): short-term capital gain; a § 50 chip on "section fifty"
j6  a dashed arrow from the gain back to the tank, "depreciation already allowed on it"; a clock spins "held 1 … 7
    years" while a padlock keeps the bucket's "short-term" label
j7  sale 3: reset; the ₹2,40,000 column is shorter than the level; the drain stops with ₹60,000 inside and the tank
    cracks (ceased); the residue drains through the tap into the bucket as a red short-term capital loss
j8  sale 4: a new van pours ₹5,00,000 in (level ₹8,00,000); the vintage van's ₹9,00,000 column stands ₹1,00,000
    higher; the drain stops at zero (gold floor "stops at zero"); the tank stays alive ("block lives on · WDV ₹0",
    a small van still inside); the ₹1,00,000 hops into the bucket (gold)
j9  trap: "depreciation" chips crossed over a small ceased tank and the zero tank; a "money receivable" column is
    rebuilt from three coins in the order spoken: scrap value, insurance, sale price
j10 check, below the card: a small machine block ₹50,000, a flame, ₹30,000 of insurance drains out; the answer
    ghosts it (CEASED) and drops "STCL ₹20,000" and "no depreciation" chips
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('j')

# ---------------------------------------------------------------- stage geometry
TX, TY, TW, TH = 690, 290, 300, 320                      # the van block (tank top-left, size)
IX, IY, IW, IH = TX + 10, TY + 16, TW - 20, TH - 26
FLOOR = IY + IH                                           # 600: the block's zero line
CAP = 8.4e5; KPX = IH / CAP                               # px per rupee
TCX = TX + TW / 2
OUT = (TX + TW + 42, TY + TH - 13)                        # the tap's outlet
GRATE = (1046, 708)                                       # where sale money drains off
SBX, SBW = 1090, 66                                       # the sale-price column
BX, BY, BW, BH = 1300, 668, 230, 120                      # the STCG / STCL bucket (rim centre, size)
BCAP = 1.2e5
OVX, NVX, VY, VS = 220, 470, 440, .62                     # old van spot, new van spot, van baseline, scale
PIPE = (TX - 170, TY - 46)                                # the inflow pipe's mouth
SLX, SLW, SLG, SLY, SLH = 388, 236, 12, 172, 46           # the four sale slots
SHX, SHY, SHW = 90, 480, 560                              # the computation sheet

def _ly(v): return FLOOR - v * KPX

# ---------------------------------------------------------------- word times
H_SELLS, H_MORE, H_WORTH, H_HOLDS, H_LESS, H_WHAT = (W('j1', 'sells'), W('j1', 'more'), W('j1', 'worth'),
                                                     W('j1', 'holds'), W('j1', 'less'), W('j1', 'what'))
I_IMAG, I_THREE, I_FOUR = W('j2', 'imagine'), W('j2', 'three'), W('j2', 'four')
A_FIRST, A_BUYS, A_FIVE, A_SELLS, A_THREE, A_SIXTY = (W('j3', 'first'), W('j3', 'buys'), W('j3', 'five'),
                                                      W('j3', 'sells'), W('j3', 'three'), W('j3', 'sixty'))
A_R1, A_PLUS, A_MINUS, A_LEAVES, A_FOUR, A_DEP = (W('j3', 'three', occ=1), W('j3', 'plus'), W('j3', 'minus'),
                                                  W('j3', 'leaves'), W('j3', 'four'), W('j3', 'depreciation'))
B_SECOND, B_NO, B_SHE, B_SELLS, B_THREE, B_SIXTY = (W('j4', 'second'), W('j4', 'no'), W('j4', 'she'),
                                                    W('j4', 'sells'), W('j4', 'three'), W('j4', 'sixty'))
B_BLOCK, B_EMPTY, B_CEASED = W('j4', 'block'), W('j4', 'empty'), W('j4', 'ceased')
N_NO, N_SIXTY, N_OVER, N_SHORT, N_GAIN, N_SEC = (W('j5', 'no'), W('j5', 'sixty'), W('j5', 'over'),
                                                 W('j5', 'short'), W('j5', 'gain'), W('j5', 'section'))
S_ALREADY, S_GAINS, S_ALWAYS, S_OWNED = W('j6', 'already'), W('j6', 'gains'), W('j6', 'always'), W('j6', 'owned')
C_THIRD, C_SELLS, C_TWO, C_FORTY = W('j7', 'third'), W('j7', 'sells'), W('j7', 'two'), W('j7', 'forty')
C_BLOCK, C_CEASES, C_SIXTY, C_STILL, C_SHORT, C_LOSS = (W('j7', 'block'), W('j7', 'ceases'), W('j7', 'sixty'),
                                                        W('j7', 'still'), W('j7', 'short'), W('j7', 'loss'))
E_FOURTH, E_BUYS, E_FIVE, E_SELLS, E_NINE = (W('j8', 'fourth'), W('j8', 'buys'), W('j8', 'five'), W('j8', 'sells'),
                                             W('j8', 'nine'))
E_THREE, E_FIVE2, E_EIGHT, E_NINE2, E_LEVEL = (W('j8', 'three'), W('j8', 'five', occ=1), W('j8', 'eight'),
                                               W('j8', 'nine', occ=1), W('j8', 'level'))
E_LIVES, E_EXTRA, E_SHORT = W('j8', 'lives'), W('j8', 'extra'), W('j8', 'short')
X_CHARGE, X_CEASED, X_ZERO, X_MONEY = W('j9', 'charge'), W('j9', 'ceased'), W('j9', 'zero'), W('j9', 'money')
X_SCRAP, X_INS, X_SALE = W('j9', 'scrap'), W('j9', 'insurance'), W('j9', 'sale')
J10 = T('j10')
Q_FIFTY, Q_FIRE, Q_INS, Q_THIRTY = W('j10', 'fifty'), W('j10', 'fire'), W('j10', 'insurance'), W('j10', 'thirty')
QA_CEASES, QA_TWENTY, QA_NO = W('j10a', 'ceases'), W('j10a', 'twenty'), W('j10a', 'no')

# ---------------------------------------------------------------- derived timeline
P1a, P1b = A_FIVE + .75, A_FIVE + 1.75                     # new van pours in (case 1)
D1a, D1b = A_MINUS + .1, A_LEAVES - .05                    # sale 1 drains
R2a, R2b = T('j4') - .55, T('j4') + .05                    # reset
D2a, D2b = B_BLOCK - .6, B_EMPTY + .1                         # sale 2 drains
K2 = B_CEASED - .3                                         # case 2 cracks
HOP2 = N_SHORT - .1
R3a, R3b = T('j7') - .6, T('j7')
D3a, D3b = C_BLOCK - 1.0, C_CEASES - .05
K3 = C_CEASES - .3
L3a, L3b = C_SHORT - .7, C_LOSS - .1                       # the residue drains into the bucket
R4a, R4b = T('j8') - .6, T('j8')
P4a, P4b = E_FIVE + .75, E_FIVE + 1.75
D4a, D4b = E_NINE2, E_LEVEL
HOP4 = E_SHORT - .1
MAIN_OFF = J10 - .6                                        # the stage fades before the check

LEVEL = [(H_HOLDS - .3, H_LESS + .15, 3e5, 0.), (I_IMAG + .1, I_THREE + .35, 0., 3e5), (P1a, P1b, 3e5, 8e5),
         (D1a, D1b, 8e5, 4.4e5), (R2a + .2, R2b - .2, 4.4e5, 3e5), (D2a, D2b, 3e5, 0.), (R3a + .2, R3b - .2, 0., 3e5),
         (D3a, D3b, 3e5, .6e5), (L3a, L3b, .6e5, 0.), (R4a + .2, R4b - .2, 0., 3e5), (P4a, P4b, 3e5, 8e5),
         (D4a, D4b, 8e5, 0.)]
RESETS = [(R2a, R2b), (R3a, R3b), (R4a, R4b)]
CRACKS = [(K2, R3a + .3), (K3, R4a + .3)]

# sale columns: S = sale price, L0 = level before it drains, d0/d1 = drain window, hop = when the excess leaves
SALES = [dict(S=3.6e5, L0=3e5, rise=H_MORE - .15, d0=H_HOLDS - .3, d1=H_LESS + .15, end=I_IMAG + .5, hop=None,
              tag='sale price', lab='more than the block', lab_t=H_WORTH - .2, warn=True),
         dict(S=3.6e5, L0=8e5, rise=A_SIXTY + .45, d0=D1a, d1=D1b, end=D1b + .35, hop=None, tag=rupee(360000)),
         dict(S=3.6e5, L0=3e5, rise=B_THREE + .8, d0=D2a, d1=D2b, end=HOP2 + .75, hop=HOP2, tag=rupee(360000),
              lab='₹60,000 over WDV', lab_t=N_SIXTY - .1),
         dict(S=2.4e5, L0=3e5, rise=C_TWO + .8, d0=D3a, d1=D3b, end=D3b + .35, hop=None, tag=rupee(240000)),
         dict(S=9e5, L0=8e5, rise=E_NINE + .9, d0=D4a, d1=D4b, end=HOP4 + .75, hop=HOP4, tag=rupee(900000),
              lab='₹1,00,000 over', lab_t=E_EXTRA - .1)]

# the van that is sold in each case (appears, drives off, its tag pops and flies to the sale column)
OLDVANS = [dict(on=CS - .5, leave=H_SELLS, pop=H_SELLS + .35, fly=H_MORE - .6, sale=0, col=BLUE, label="Meera's Bakehouse"),
           dict(on=I_IMAG + .3, leave=A_SELLS, pop=A_THREE, fly=A_SIXTY, sale=1, col=BLUE, label="Meera's Bakehouse"),
           dict(on=R2a + .1, leave=B_SELLS, pop=B_THREE, fly=B_THREE + .35, sale=2, col=BLUE, label="Meera's Bakehouse"),
           dict(on=R3a + .1, leave=C_SELLS, pop=C_TWO, fly=C_TWO + .35, sale=3, col=BLUE, label="Meera's Bakehouse"),
           dict(on=R4a + .1, leave=E_SELLS, pop=E_NINE, fly=E_NINE + .45, sale=4, col='#9f1239', label='Vintage van')]
NEWVANS = [dict(on=A_BUYS, pop=A_FIVE, pour=P1a), dict(on=E_BUYS, pop=E_FIVE, pour=P4a)]

def _sheet_rows():
    s1 = [dict(label='Opening WDV', amt=300000, kind='start', t0=A_R1),
          dict(label='New van', amt=500000, kind='add', t0=A_PLUS),
          dict(label='Old van sold', amt=360000, kind='less', t0=A_MINUS),
          dict(label='WDV left', amt=440000, kind='total', t0=A_LEAVES, col=GREEN)]
    s2 = [dict(label='Opening WDV', amt=300000, kind='start', t0=B_SELLS),
          dict(label='Only van sold', amt=360000, kind='less', t0=B_THREE),
          dict(label='Excess → STCG', amt=60000, kind='total', t0=N_SIXTY)]
    s3 = [dict(label='Opening WDV', amt=300000, kind='start', t0=C_SELLS),
          dict(label='Only van sold', amt=240000, kind='less', t0=C_TWO),
          dict(label='Left → STCL', amt=60000, kind='total', t0=C_SIXTY, col=RED)]
    s4 = [dict(label='Opening WDV', amt=300000, kind='start', t0=E_THREE),
          dict(label='New van', amt=500000, kind='add', t0=E_FIVE2),
          dict(label='Vintage van sold', amt=900000, kind='less', t0=E_NINE2),
          dict(label='WDV stops at ₹0 · the block lives on', amt=None, kind='note', t0=E_LIVES),
          dict(label='Excess → STCG', amt=100000, kind='total', t0=E_EXTRA)]
    return [(s1, A_R1 - .45, R2a + .2), (s2, B_SELLS - .4, R3a + .1), (s3, C_SELLS - .4, R4a + .1),
            (s4, E_THREE - .45, T('j9') + .4)]
SHEETS = _sheet_rows()

SLOTS = [(A_FIRST, B_SECOND, 'WDV ₹4,40,000', GREEN, A_FOUR), (B_SECOND, C_THIRD, 'STCG ₹60,000', GOLD, HOP2 + 1.0),
         (C_THIRD, E_FOURTH, 'STCL ₹60,000', RED, C_LOSS), (E_FOURTH, T('j9') + .2, 'STCG ₹1,00,000', GOLD, HOP4 + 1.0)]

for tt, k in ((H_SELLS, 'whoosh'), (H_LESS, 'warn'), (I_THREE, 'pop'), (I_FOUR, 'blip'),
              (A_BUYS + .1, 'whoosh'), (P1a, 'pop'), (A_SIXTY + .45, 'tap'), (A_FOUR, 'ok'),
              (B_SELLS, 'whoosh'), (K2 + .58, 'thunk'), (N_NO + .2, 'thunk'), (HOP2 + .6, 'chime'),
              (S_ALWAYS, 'key'), (C_SELLS, 'whoosh'), (K3 + .58, 'thunk'), (C_LOSS, 'error'),
              (E_BUYS + .1, 'whoosh'), (E_NINE + .9, 'tap'), (E_LEVEL, 'warn'), (HOP4 + .6, 'chime'),
              (X_ZERO, 'error'), (X_SCRAP + .4, 'pop'), (X_SALE + .4, 'pop'),
              (QA_CEASES + .1, 'thunk'), (QA_TWENTY, 'error')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _track(t, v0, segs):
    v = v0
    for t0, t1, a, b in segs:
        if t < t0: break
        v = b if t >= t1 else lerp(a, b, ease((t - t0) / (t1 - t0)))
    return v

def _dash(col, a, w=2.2, on=10, off=7):
    p = paint(col, a, stroke=w, cap=False); p.setPathEffect(skia.DashPathEffect.Make([on, off], 0)); return p

def _mono(c, s, x, y, size, col=WHITE, a=1., align='c', glow=0.):
    if a <= 0: return 0
    ftext(c, s, x + 1.5, y + 2.5, size, MONO, BLACK, .55 * a, align)
    return ftext(c, s, x, y, size, MONO, col, a, align, 700, glow)

def _bracket(c, x, y0, y1, col, a, side=1):
    """A square bracket spanning y0..y1 at x, opening away from side (+1 = bracket on the right of a thing)."""
    if a <= 0 or abs(y1 - y0) < 2: return
    p = paint(col, .95 * a, stroke=2.6, cap=False)
    c.drawLine(x, y0, x, y1, p); c.drawLine(x - 9 * side, y0, x, y0, p); c.drawLine(x - 9 * side, y1, x, y1, p)

def _bez(p0, pm, p1, u):
    return ((1 - u) ** 2 * p0[0] + 2 * u * (1 - u) * pm[0] + u * u * p1[0],
            (1 - u) ** 2 * p0[1] + 2 * u * (1 - u) * pm[1] + u * u * p1[1])

def _grate(c, a):
    if a <= 0: return
    x, y = GRATE
    c.drawRRect(rrect(x - 30, y - 7, 60, 14, 5), paint('#05080f', .9 * a))
    c.drawRRect(rrect(x - 30, y - 7, 60, 14, 5), paint('#56637f', .9 * a, stroke=1.6))
    for k in range(5): c.drawLine(x - 22 + k * 11, y - 4, x - 22 + k * 11, y + 4, paint('#8b97b0', .8 * a, stroke=2))

def _flame(c, x, y, s, a, t):
    if a <= 0: return
    fl = 1 + .08 * math.sin(t * 13) + .05 * math.sin(t * 7.3)
    c.drawCircle(x, y, 30 * s, paint(ORANGE, .28 * a, blur=16))
    c.save(); c.translate(x, y + 20 * s); c.scale(1, fl); c.translate(-x, -(y + 20 * s))
    icon(c, 'flame', x, y, s, ORANGE, a, 4)
    c.restore()

# ---------------------------------------------------------------- the four slots
def _slots(c, t, a):
    for k, (on0, on1, res, rcol, rt) in enumerate(SLOTS):
        sa = a * seg(t, I_FOUR - .15 + .14 * k, I_FOUR + .25 + .14 * k)
        if sa <= 0: continue
        x = SLX + k * (SLW + SLG); pop = seg(t, I_FOUR - .15 + .14 * k, I_FOUR + .35 + .14 * k, back)
        y = SLY + 10 * (1 - pop)
        act = win(t, on0, on1, .3, .4); ra = seg(t, rt - .1, rt + .4)
        col = mixc(ACC, rcol, ra) if ra > 0 else ACC
        if act > 0: c.drawRRect(rrect(x - 4, y - 4, SLW + 8, SLH + 8, (SLH + 8) / 2), paint(GOLD, .5 * act * sa, stroke=6, blur=7))
        c.drawRRect(rrect(x, y, SLW, SLH, SLH / 2), paint(shade(col, -.8), .92 * sa))
        c.drawRRect(rrect(x, y, SLW, SLH, SLH / 2), paint(GOLD if act > .5 else col, (.6 + .4 * act) * sa, stroke=2))
        c.drawCircle(x + 24, y + SLH / 2, 15, paint(GOLD if act > .5 else col, .9 * sa))
        text(c, str(k + 1), x + 24, y + SLH / 2 + 8, 22, 800, '#0b1020', sa, 'c')
        text(c, 'Sale %d' % (k + 1), x + 50, y + SLH / 2 + 8, 23, 700, WHITE if act > .5 else DIM, sa * (1 - ra))
        if ra > 0:
            fs = min(22., 22. * (SLW - 62) / text_w(res, 22, 800))
            text(c, res, x + 48, y + SLH / 2 + fs * .36, fs, 800, rcol, sa * ra)

# ---------------------------------------------------------------- the vans
def _van(c, x, y, s, a, col, label, t, move, flip=False):
    """van() whose side-panel label still reads left-to-right when the van faces left."""
    if a <= 0: return
    if not flip: van(c, x, y, s, a, col, label, t, move); return
    van(c, x, y, s, a, col, '', t, move, flip=True)
    lines = wrap(label, 23, 170, 800, SERIF)[:2]
    for k, ln in enumerate(lines):
        ftext(c, ln, x + 52 * s, y + s * (-96 + (k - (len(lines) - 1) / 2) * 26 + 8), 23 * s, SERIF, shade(col, -.55), a, 'c', 700)

def _vans(c, t, a):
    for v in OLDVANS:
        if not (v['on'] - .4 <= t <= v['leave'] + 1.5): continue
        ua = seg(t, v['on'] - .4, v['on'] + .1)
        mv = ein(seg(t, v['leave'], v['leave'] + 1.4)); x = OVX - 640 * mv
        va = a * ua * (1 - seg(t, v['leave'] + 1.1, v['leave'] + 1.4))
        _van(c, x, VY, VS, va, v['col'], v['label'], t, x - OVX, flip=True)
    for v in NEWVANS:
        if not (v['on'] - .2 <= t <= v['pour'] + .4): continue
        u = seg(t, v['on'], v['on'] + 1.0, eout); x = lerp(-260, NVX, u)
        fu = seg(t, v['pour'] - .3, v['pour'] + .3, ein)              # shrinks into the pipe
        px, py = lerp(x, PIPE[0] + 10, fu), lerp(VY, PIPE[1] + 30, fu)
        s = VS * (1 - .82 * fu)
        van(c, px, py, s, a * (1 - seg(fu, .7, 1)), '#0f766e', "Meera's Bakehouse", t, x, flip=False)
        ta = a * seg(t, v['pop'] - .15, v['pop'] + .25, back) * (1 - fu)
        if ta > 0: price_tag(c, px, py - 140 * (1 - .7 * fu), rupee(500000), GOLD, ta, 26)
    # j4: "no new van"
    ga = a * win(t, B_NO - .15, B_SHE + .3, .25, .4)
    if ga > 0:
        van(c, NVX, VY, VS, ga * .3, '#0f766e', "Meera's Bakehouse", t)
        cross(c, NVX, VY - 52, ga, 30)

def _tags(c, t, a):
    """Each sold van's price tag: pops where the van stood, then flies to the top of its sale column."""
    for v in OLDVANS:
        s = SALES[v['sale']]
        if not (v['pop'] - .2 <= t <= s['rise'] + .2): continue
        pa = a * seg(t, v['pop'] - .15, v['pop'] + .25, back)
        u = seg(t, v['fly'], s['rise'], ease)
        p0 = (OVX, VY - 150); p1 = (SBX + SBW / 2, _ly(s['S']) - 30); pm = ((p0[0] + p1[0]) / 2, min(p0[1], p1[1]) - 60)
        x, y = _bez(p0, pm, p1, u)
        if 0 < u < 1:
            for k in range(6):
                q = u - .045 * (k + 1)
                if q <= 0: break
                qx, qy = _bez(p0, pm, p1, q); c.drawCircle(qx, qy, 4 - .5 * k, paint(GOLD, .5 * pa * (1 - k / 6)))
        if t < s['rise']: price_tag(c, x, y, s['tag'], GOLD, pa, 26)

# ---------------------------------------------------------------- the sale column
def _salebar(c, t, a):
    for s in SALES:
        if not (s['rise'] - .1 <= t <= s['end'] + .1): continue
        sa = a * seg(t, s['rise'] - .1, s['rise'] + .2) * (1 if s['hop'] else 1 - seg(t, s['end'] - .3, s['end']))
        if sa <= 0: continue
        ur = seg(t, s['rise'], s['rise'] + .6, eout)
        cov = min(s['S'], s['L0']); E = max(0., s['S'] - s['L0'])
        d = cov * seg(t, s['d0'], s['d1'])
        hc = (cov - d) * KPX * ur; he = E * KPX * ur
        top = FLOOR - hc - he
        warn = s.get('warn') and t > H_LESS - .1
        ecol = RED if warn else GOLD
        hop = s['hop']; hu = seg(t, hop, hop + .7) if hop else 0.
        full = s['S'] * KPX * ur                                   # the column as it first stood
        # the covered part: the share of the sale that the block can absorb (muted, hatched), shrinking as it drains
        if hc + he * (1 - hu) > 1:
            c.drawRRect(rrect(SBX - 2, top - 2 + he * hu, SBW + 4, hc + he * (1 - hu) + 4, 8), paint(BLACK, .4 * sa, blur=10))
        if hc > .5:
            c.drawRect(skia.Rect(SBX, FLOOR - hc, SBX + SBW, FLOOR), paint(shader=lgrad((SBX, 0), (SBX + SBW, 0),
                       [shade(GOLD, -.25), shade(GOLD, -.5)]), a=.8 * sa))
            c.save(); c.clipRect(skia.Rect(SBX, FLOOR - hc, SBX + SBW, FLOOR), True)
            hp = paint(GOLD, .3 * sa, stroke=2, cap=False)
            for k in range(-4, int(hc / 16) + 6):
                y0 = FLOOR - k * 16; c.drawLine(SBX, y0, SBX + SBW, y0 - SBW * .6, hp)
            c.restore()
        if he > .5 and hu < 1:
            ex0, ey0 = SBX + SBW / 2, top + he / 2
            if hu > 0:
                ex, ey = _bez((ex0, ey0), ((ex0 + BX) / 2, min(ey0, BY) - 110), (BX, BY + 22), ein(hu) * .4 + hu * .6)
            else: ex, ey = ex0, ey0
            k = 1 - .45 * hu; ea = sa * (1 - seg(hu, .8, 1))
            pulse = (.6 + .4 * math.sin(t * 9)) if warn else 1.
            hl = 0.
            if s.get('lab_t'): hl = seg(t, s['lab_t'], s['lab_t'] + .4) * (1 - hu)
            gl = max(hl, pulse if warn else 0, .35)
            r_ = skia.Rect(ex - SBW / 2 * k, ey - he / 2 * k, ex + SBW / 2 * k, ey + he / 2 * k)
            c.drawRect(skia.Rect(r_.left() - 6, r_.top() - 6, r_.right() + 6, r_.bottom() + 6), paint(ecol, .45 * ea * gl, blur=10))
            c.drawRect(r_, paint(shader=lgrad((r_.left(), 0), (r_.right(), 0), [shade(ecol, .3), shade(ecol, -.05)]), a=ea * pulse))
            c.drawRect(r_, paint(shade(ecol, .5), ea, stroke=1.6, cap=False))
            if s.get('lab') and hu <= 0:
                la = sa * seg(t, s['lab_t'], s['lab_t'] + .4)
                _bracket(c, SBX + SBW + 12, top, top + he, ecol, la)
                text(c, s['lab'], SBX + SBW + 26, top + he / 2 + 9, 25, 800, ecol, la, shadow=6)
        if hc + he * (1 - hu) > 1:
            c.drawRRect(rrect(SBX, top + he * hu, SBW, hc + he * (1 - hu), 6), paint(shade(GOLD, .3), .7 * sa, stroke=1.8))
        # the sale price stays pinned where the column first stood until the money has drained out
        ta = sa * seg(t, s['rise'] - .05, s['rise'] + .05) * (1 - seg(t, s['d1'] + .2, s['d1'] + .6))
        if ta > 0:
            if t > s['d0']: c.drawLine(SBX - 4, FLOOR - full, SBX + SBW + 4, FLOOR - full, _dash(GOLD, .7 * ta, 2))
            price_tag(c, SBX + SBW / 2, FLOOR - full - 30, s['tag'], GOLD, ta * (1 - .35 * seg(t, s['d0'], s['d0'] + .4)), 26)
        # level vs sale: a dashed line from the tank's level across the column (only when the sale is bigger)
        if E > 0:
            la = sa * seg(t, s['rise'] + .4, s['rise'] + .8) * (1 - seg(t, s['d0'] - .1, s['d0'] + .25))
            if la > 0:
                c.drawLine(IX + IW + 4, _ly(s['L0']), SBX + SBW + 8, _ly(s['L0']), _dash(GOLD, .9 * la))
                text(c, 'block', SBX - 20, _ly(s['L0']) - 10, 21, 700, DIM, la, 'r')
        if t < s['d0'] + .3:
            text(c, 'sale', SBX + SBW / 2, FLOOR + 30, 22, 700, DIM, sa * (1 - seg(t, s['d0'], s['d0'] + .3)), 'c')

# ---------------------------------------------------------------- the bucket
def _bucket_state(t):
    """(level 0..1, colour, amount, which word lights: 'gain' / 'loss' / None)"""
    if t < R3a:
        u = seg(t, HOP2 + .55, HOP2 + 1.2) * (1 - seg(t, R3a - .5, R3a))
        return .5 * u, GOLD, 60000, ('gain' if t > HOP2 + .4 else None)
    if t < R4a:
        u = seg(t, L3a + .25, L3b + .15) * (1 - seg(t, R4a - .5, R4a))
        return .5 * u, RED, 60000, ('loss' if t > L3a + .2 else None)
    u = seg(t, HOP4 + .55, HOP4 + 1.2)
    return .833 * u, GOLD, 100000, ('gain' if t > HOP4 + .4 else None)

def _bucket(c, t, a):
    lv, col, amt, which = _bucket_state(t)
    bucket(c, BX, BY, a, lv, label=None, col=col, t=t, w=BW, h=BH)
    if lv > .2: _mono(c, rupee(amt), BX, BY + BH - 22, 26, WHITE, a * seg(lv, .2, .4))
    # label to the right: "Short-term capital" / "gain / loss" / § 50
    lx = BX + BW / 2 + 24
    text(c, 'Short-term capital', lx, BY + 34, 26, 800, WHITE, .95 * a, shadow=6)
    ga = 1. if which == 'gain' else 0.; la_ = 1. if which == 'loss' else 0.
    x = lx
    text(c, 'gain', x, BY + 70, 28, 800, mixc(DIM, GOLD, ga), a * (.75 + .25 * ga), shadow=6); x += text_w('gain', 28, 800)
    text(c, ' / ', x, BY + 70, 28, 600, DIM, .6 * a); x += text_w(' / ', 28, 600)
    text(c, 'loss', x, BY + 70, 28, 800, mixc(DIM, RED, la_), a * (.75 + .25 * la_), shadow=6)
    if ga > 0 or la_ > 0:
        gx = lx if ga else x; gw = text_w('gain' if ga else 'loss', 28, 800)
        c.drawLine(gx, BY + 80, gx + gw, BY + 80, paint(GOLD if ga else RED, .9 * a, stroke=3))
    sa = a * seg(t, N_SEC - .1, N_SEC + .35, back)
    if sa > 0: sec(c, lx, BY + 112, '50', sa, size=24)
    # j6: "short-term" stays locked however long she held the van
    pa = a * seg(t, S_ALWAYS - .3, S_ALWAYS + .2) * (1 - seg(t, C_THIRD - .4, C_THIRD))
    if pa > 0: padlock(c, lx + text_w('Short-term capital', 26, 800) + 26, BY + 24, .8, GOLD, pa, 0.)

# ---------------------------------------------------------------- the tank
def _tank(c, t, a):
    lv = _track(t, 3e5, LEVEL)
    dip = max((win(t, r0, r1, .25, .3) for r0, r1 in RESETS), default=0.)
    ta = a * (1 - .75 * dip)
    crack = ghost = 0.
    for k0, k1 in CRACKS:
        if k0 <= t < k1:
            crack = seg(t, k0, k0 + .9, linr); ghost = .35 * seg(t, k0 + .5, k0 + 1.2)
    inflow = max(win(t, I_IMAG, I_THREE + .4, .25, .3), win(t, P1a - .1, P1b + .1, .2, .3), win(t, P4a - .1, P4b + .1, .2, .3))
    drains = [(H_HOLDS - .3, H_LESS + .15), (D1a, D1b), (D2a, D2b), (D3a, D3b), (D4a, D4b)]
    out_g = max(win(t, d0, d1, .2, .25) for d0, d1 in drains)
    out_b = win(t, L3a, L3b, .2, .25)
    outflow = max(out_g, out_b)
    drain_to = (BX - 50, BY + 16) if out_b > out_g else GRATE
    fg_r = win(t, H_LESS - .1, I_IMAG + .3, .15, .4) * (.65 + .35 * math.sin(t * 8))
    fg_g = seg(t, E_LEVEL - .15, E_LEVEL + .3) * (1 - seg(t, MAIN_OFF - .3, MAIN_OFF))
    fglow, fcol = (fg_r, RED) if fg_r > .01 else (fg_g, GOLD)
    _grate(c, ta * max(.35, out_g))
    tank(c, TX, TY, TW, TH, ta, t, level=lv, cap=CAP, label='Motor vehicles · 15%', amount=None, col=BLUE,
         inflow=inflow, outflow=outflow, crack=crack, ghost=ghost, floor_glow=fglow, floor_label=None,
         floor_col=fcol, drain_to=drain_to, sub='van block')
    if out_g > .05:
        text(c, 'money out', GRATE[0], GRATE[1] + 34, 22, 700, DIM, ta * out_g, 'c')
    # the block's level, written inside the glass (no number during the hook)
    ys = _ly(lv)
    if t > I_THREE - .1:
        na = ta * seg(t, I_THREE - .1, I_THREE + .3)
        v = int(round(lv / 1e4)) * 1e4
        green = win(t, A_FOUR - .2, R2a + .2, .3, .3)
        col = mixc(GOLD, GREEN, green)
        if t >= K3 + .3 and t < R4a: col = RED
        yy = ys - 14 if ys > IY + 46 else ys + 36
        if fg_g > .01 and lv < 2e4: yy = FLOOR - 74                    # sale 4: the level sits on the floor
        na *= 1 - seg(crack, .3, .6) * (lv < 1e3)                      # a ceased, empty block: the stamp says it
        _mono(c, rupee(v), TCX, yy, 30, col, na)
        if fg_g > .01: itext(c, 'the level stops at zero', TCX, FLOOR - 112, 24, GOLD, ta * fg_g, 'c', 700)
        if C_STILL - .2 < t < L3a + .2:
            text(c, 'still inside', TCX, yy - 34, 24, 800, RED, ta * win(t, C_STILL - .2, L3a + .2, .3, .3), 'c', shadow=6)
    else:
        ha = ta * seg(t, H_LESS - .1, H_LESS + .3) * (1 - seg(t, I_IMAG, I_IMAG + .3))
        if ha > 0: text(c, 'less than ₹0', TCX, FLOOR - 24, 30, 800, RED, ha, 'c', shadow=8)
        qa = ta * seg(t, H_WHAT - .2, H_WHAT + .3) * (1 - seg(t, I_IMAG, I_IMAG + .3))
        if qa > 0: text(c, '?', TCX, FLOOR - 80, 64, 800, RED, qa * (.6 + .4 * math.sin(t * 6)), 'c', shadow=8)
    # j3: depreciation runs on what is left
    da = ta * win(t, A_DEP - .2, R2a + .1, .3, .3)
    if da > 0:
        chip(c, TCX, 262, 'depreciation runs on ₹4,40,000', GREEN, da, 24)
        P = np.array([(TCX - 60, ys - 4), (TCX - 40, 290)]); flowdots(c, P, (t * .7) % 1, da, GREEN, 5, 5)
        P = np.array([(TCX + 60, ys - 4), (TCX + 40, 290)]); flowdots(c, P, (t * .7 + .5) % 1, da, GREEN, 5, 5)
    # j5: no depreciation on a ceased block
    nu = seg(t, N_NO - .1, N_NO + .9)
    na = ta * (1 - seg(t, R3a - .3, R3a))
    if nu > 0 and na > 0: stamp(c, TCX, 540, 'NO DEPRECIATION', RED, na, nu, 7, 24)
    # j8: the block lives on at zero (a van is still in it)
    la = ta * seg(t, E_LIVES - .2, E_LIVES + .3) * (1 - seg(t, MAIN_OFF - .3, MAIN_OFF))
    if la > 0:
        van(c, TCX, FLOOR - 3, .3, la, '#0f766e', "Meera's Bakehouse", t)
        chip(c, TCX, 262, 'block lives on · WDV ₹0', GREEN, la * (1 - seg(t, X_CHARGE - .3, X_CHARGE)), 24)
    return lv

# ---------------------------------------------------------------- j6: why short-term
def _why(c, t, a):
    wa = a * win(t, S_ALREADY - .2, C_THIRD - .2, .35, .4)
    if wa > 0:
        p0 = (BX - 40, BY - 12); p1 = (TX + TW - 30, TY + 30); pm = (1150, 250)
        P = np.array([_bez(p0, pm, p1, q) for q in np.linspace(0, 1, 30)])
        u = seg(t, S_ALREADY - .2, S_ALREADY + .6)
        n = max(2, int(30 * u))
        c.drawPath(poly(P[:n], False), _dash(GREEN, .9 * wa, 2.6, 12, 8))
        if u > .95: arrow(c, *P[-3], *P[-1], GREEN, 2.6, wa, 16)
        chip(c, 1210, 300, 'depreciation already allowed on it', GREEN, wa * seg(t, S_ALREADY + .3, S_ALREADY + .7), 24)
    ca = a * win(t, S_GAINS - .3, C_THIRD - .2, .35, .4)
    if ca > 0:
        sp = seg(t, S_GAINS, S_OWNED + .2, linr)
        hrs = 10 + 7 * 12 * sp
        clock_face(c, 1260, 440, 58, hrs % 12, (hrs % 1) * 60, ca, ACC)
        n = 1 + int(6 * sp)
        text(c, 'held %d year%s' % (n, '' if n == 1 else 's'), 1336, 432, 30, 800, WHITE, ca, shadow=6)
        text(c, 'still short-term', 1336, 470, 26, 800, GOLD, ca * seg(t, S_ALWAYS - .2, S_ALWAYS + .3), shadow=6)

# ---------------------------------------------------------------- j9: trap
def _trap(c, t, a):
    # a small ceased block on the left, and "depreciation" chips that get crossed
    ma = a * seg(t, X_CEASED - .35, X_CEASED + .15)
    if ma > 0:
        tank(c, 150, 330, 210, 230, ma, t, level=0., cap=1., label='ceased block', amount=None, col=BLUE,
             crack=1., ghost=.4)
        w_ = chip(c, 240, 300, 'depreciation', ACC, ma, 22)
        cross(c, 240 + w_ / 2 + 24, 300, ma * seg(t, X_CEASED + .2, X_CEASED + .5), 18)
    da = a * seg(t, X_CHARGE - .2, X_CHARGE + .25)
    if da > 0:
        w_ = chip(c, TCX, 262, 'depreciation @ 15%', ACC, da, 24)
        xa = da * seg(t, X_ZERO - .15, X_ZERO + .2, back)
        cross(c, TCX + w_ / 2 + 26, 262, xa, 20)
        if xa > 0: text(c, 'on a WDV of ₹0', TCX + w_ / 2 + 56, 271, 24, 800, RED, xa * .95, shadow=6)
    # money receivable = scrap value + insurance + sale price, built as spoken
    ra = a * seg(t, X_MONEY - .2, X_MONEY + .3)
    if ra <= 0: return
    seg_h = 64; base = FLOOR
    c.drawRRect(rrect(SBX - 3, base - 3 * seg_h - 3, SBW + 6, 3 * seg_h + 6, 8), _dash(GOLD, .7 * ra))
    text(c, 'money receivable', SBX + SBW / 2, base - 3 * seg_h - 22, 24, 800, GOLD, ra, 'c', shadow=6)
    parts = [(X_SCRAP, 'scrap value', ORANGE), (X_INS, 'insurance', BLUE), (X_SALE, 'sale price', GOLD)]
    for k, (tt, lab_, col) in enumerate(parts):
        u = seg(t, tt - .1, tt + .45, ein)
        if u <= 0: continue
        y1 = base - k * seg_h; y0 = y1 - seg_h
        cy = lerp(220, (y0 + y1) / 2, u)
        if u < 1: coin(c, SBX + SBW / 2, cy, 22, ra, col)
        fa = ra * seg(t, tt + .35, tt + .55)
        if fa > 0:
            c.drawRect(skia.Rect(SBX, y0 + 2, SBX + SBW, y1 - 2), paint(shader=lgrad((SBX, 0), (SBX + SBW, 0), [shade(col, .3), shade(col, -.2)]), a=.92 * fa))
            text(c, '₹', SBX + SBW / 2, (y0 + y1) / 2 + 11, 30, 800, shade(col, -.6), fa, 'c')
            text(c, lab_, SBX + SBW + 18, (y0 + y1) / 2 + 9, 25, 800, col, fa, shadow=6)

# ---------------------------------------------------------------- j10: check, below the card
QX, QY, QW, QH = 640, 716, 160, 100                       # the small machine block

def _check(c, t):
    a = seg(t, J10 - .2, J10 + .4)
    if a <= 0: return
    ma = a * seg(t, Q_FIFTY - .4, Q_FIFTY + .1)
    lv = 5e4 - 3e4 * seg(t, Q_THIRTY + .3, Q_THIRTY + 1.3)
    gh = seg(t, QA_CEASES - .1, QA_CEASES + .5)
    lv *= 1 - seg(t, QA_TWENTY - .5, QA_TWENTY + .2)             # the ₹20,000 left leaves as the loss
    qih = QH - 26; qcap = 6.2e4
    tank(c, QX, QY, QW, QH, ma, t, level=lv, cap=qcap, label=None, amount=None, col=BLUE,
         outflow=max(win(t, Q_THIRTY + .2, Q_THIRTY + 1.4, .2, .3), win(t, QA_TWENTY - .5, QA_TWENTY + .3, .2, .3)),
         ghost=.5 * gh, drain_to=(QX + QW + 70, QY + QH - 4))
    ys = QY + 16 + qih - qih * lv / qcap
    _mono(c, rupee(int(round(lv / 1e3)) * 1000), QX + QW / 2, ys - 8, 24, GOLD, ma * (1 - gh))
    text(c, 'machine block', QX - 30, QY + 48, 22, 700, DIM, ma, 'r')
    if gh > 0: stamp(c, QX + QW / 2, QY + 50, 'CEASED', RED, a, gh, -8, 22)
    _flame(c, QX - 100, QY + 82, .7, a * seg(t, Q_FIRE - .3, Q_FIRE + .1), t)
    ia = a * seg(t, Q_INS - .2, Q_INS + .3)
    if ia > 0:
        cu = seg(t, Q_THIRTY + .2, Q_THIRTY + 1.0)
        coin(c, lerp(QX + QW + 60, QX + QW + 110, cu), QY + 70, 22, ia, GOLD)
        text(c, 'insurance ₹30,000' if t > Q_THIRTY - .1 else 'insurance', QX + QW + 146, QY + 80, 26, 800, GOLD, ia, shadow=6)
    ra = a * seg(t, QA_TWENTY - .15, QA_TWENTY + .3, back)
    if ra > 0: chip(c, 1400, QY + 52, 'STCL ₹20,000 · sec 50', RED, ra, 26)
    na = a * seg(t, QA_NO - .15, QA_NO + .3, back)
    if na > 0: chip(c, 1700, QY + 52, 'no depreciation', RED, na, 24)

# ---------------------------------------------------------------- chapter
def ch_j(c, t):
    if t < CS - .5 or t > CE + .5: return
    a = 1 - seg(t, MAIN_OFF, MAIN_OFF + .5)
    if a > 0:
        _slots(c, t, a * (1 - seg(t, MAIN_OFF - .2, MAIN_OFF)))
        _bucket(c, t, a)
        _tank(c, t, a)
        _salebar(c, t, a)
        _why(c, t, a)
        _trap(c, t, a)
        for rows, s0, s1 in SHEETS:
            sa = a * win(t, s0, s1, .35, .35)
            if sa > 0: sheet(c, SHX, SHY, SHW, rows, sa, t, grow=True)
        _vans(c, t, a)
        _tags(c, t, a)
    _check(c, t)
