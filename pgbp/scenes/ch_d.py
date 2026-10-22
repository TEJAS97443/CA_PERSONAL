"""Chapter D — Two carve-outs: speculation (sec 43(5)) and composite income (Rule 8).
d1 hook: a trading terminal; Rohan (left) watches a cursor sweep the day's candles: BUY at 9:20, SELL at 15:10; a
   dashed DELIVERY box on the right waits ("…") and never fills (red ✕ "never delivered"); Meera's bakery appears
   with "= ?" — the same business?
d2 the BUY and SELL slips leave the chart and snap together; the DELIVERY box slides under them as an empty
   "goods / shares" box, its hand-over arrow crossed ("never change hands"); a gold ₹ gap pops at the joint:
   "a bet on prices", "not trade" (struck)
d3 the snapped deal is named "Speculative transaction" with a § 43(5) chip; a PGBP drawer (the bakery) stands at
   the left and a second drawer, "Speculation business", slides out of it; the deal drops into the new drawer
d4 a red "speculation loss" climbs out of that drawer, slides at the bakery drawer and bounces off a wall; it docks
   only in a green "speculation profit" slot; a carry-forward strip: the loss hops Year 1 → Year 4, Year 5 crossed
d5 three deals without delivery that are NOT speculation, each ticked green as spoken: a baker hedging wheat (price
   tag locked), an investor hedging his shares (shield over a falling line), derivatives / commodity derivatives on
   a recognised stock exchange (exchange building + F&O ticker)
d6 example: Rohan's −₹50,000 intraday loss (red) vs the bakery's ₹12,00,000 profit (gold); the loss slides at the
   profit, hits a wall ("no set-off") and bounces; it parks in a "future speculation profit" box with an hourglass
d7 thought experiment: a tea estate (farming, green) sends leaves to a factory (business, gold); one profit bar
   appears, then shows two natures
d8 the bar splits under Rule 8: 60% agricultural · exempt (green, under the hills) / 40% business · taxable (gold,
   under the factory)
d9 the bar becomes a table: tea ₹10,00,000 → tax on ₹4,00,000; rubber 35%; coffee grown & cured 25%; coffee also
   roasted & ground 40% (each row's gold business share grows as spoken)
d10 check: below the card an "NSE · F&O" badge with a pulsing "?"; the answer ticks it — "not speculation"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('d')
D1, D2, D3, D4, D5, D6, D7, D8, D9, D10 = (T('d%d' % i) for i in range(1, 11))
D10A = TA('d10')

# ---------------------------------------------------------------- word times
BUYS, SELLS, CLOSES = W('d1', 'buys'), W('d1', 'sells'), W('d1', 'closes')
NEVER1, DELIV1, SAME1, BAKERY1 = W('d1', 'never'), W('d1', 'delivery'), W('d1', 'same'), W('d1', 'bakery')
SETTLED, GOODS2, CHANGING, HANDS = W('d2', 'settled'), W('d2', 'goods'), W('d2', 'changing'), W('d2', 'hands')
BET, TRADE2 = W('d2', 'bet'), W('d2', 'trade')
SPEC3, SEC3, TREATED3, OWN3 = W('d3', 'speculative'), W('d3', 'section'), W('d3', 'treated'), W('d3', 'own')
LOSSES4, SETOFF4, SPROF4 = W('d4', 'losses'), W('d4', 'set'), W('d4', 'speculation profit')
CARRY4, FOUR4, YEARS4 = W('d4', 'carry'), W('d4', 'four'), W('d4', 'years')
SOME5, NOT5, BAKER5, WHEAT5 = W('d5', 'some'), W('d5', 'not'), W('d5', 'baker'), W('d5', 'wheat')
INVEST5, SHARES5, TRADING5, COMMOD5, EXCH5 = (W('d5', 'investor'), W('d5', 'shares'), W('d5', 'trading'),
                                              W('d5', 'commodity'), W('d5', 'exchange'))
FIFTY6, INTRA6, BAKERY6, TWELVE6 = W('d6', 'fifty'), W('d6', 'intraday'), W('d6', 'bakery'), W('d6', 'twelve')
CUT6, WAITS6, FUTURE6 = W('d6', 'cut'), W('d6', 'waits'), W('d6', 'future')
TEA7, FARMING7, FACTORY7, BUSINESS7 = W('d7', 'tea'), W('d7', 'farming'), W('d7', 'factory'), W('d7', 'business')
ONE7, NATURES7 = W('d7', 'one'), W('d7', 'natures')
RULES8, COMPOSITE8, FORTY8, SIXTY8, EXEMPT8 = (W('d8', 'rules'), W('d8', 'composite'), W('d8', 'forty'),
                                               W('d8', 'sixty'), W('d8', 'exempt'))
TEN9, FOUR9, RUBBER9, THIRTY9 = W('d9', 'ten'), W('d9', 'four'), W('d9', 'rubber'), W('d9', 'thirty')
COFFEE9, TWENTY9, ROASTED9, FORTY9 = W('d9', 'coffee'), W('d9', 'twenty'), W('d9', 'roasted'), W('d9', 'forty')
FUT10, NSE10 = W('d10', 'futures'), W('d10', 'NSE')
A_ELIG, A_NOT = W('d10a', 'eligible'), W('d10a', 'not')

for tt, k in ((BUYS, 'tap'), (SELLS + .1, 'tap'), (NEVER1 + .1, 'warn'), (BAKERY1, 'pop'),
              (SETTLED, 'snip'), (HANDS + .05, 'warn'), (BET, 'pop'),
              (TREATED3 + .2, 'whoosh'), (OWN3 + .5, 'thunk'),
              (SETOFF4 + .4, 'error'), (SPROF4 + .5, 'ok'), (CARRY4 + .3, 'tick'), (FOUR4 + .3, 'tick'),
              (WHEAT5, 'ok'), (SHARES5, 'ok'), (EXCH5, 'ok'),
              (FIFTY6, 'tick'), (TWELVE6, 'chime_lo'), (CUT6 + .45, 'error'), (WAITS6 + .3, 'pop'),
              (FORTY8, 'pop'), (EXEMPT8, 'ok'), (FOUR9, 'chime'), (RUBBER9, 'pop'), (ROASTED9, 'pop')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _box(c, x, y, w, h, col, a, fill=.78, stroke=.9, glow=0., r=18, dash=False):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .4 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=8, blur=10))
    p = paint(col, stroke * a, stroke=2.4)
    if dash: p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _dashed(c, x, y, w, h, col, a, r=16, sw=2.4):
    if a <= 0: return
    p = paint(col, a, stroke=sw, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
    c.drawRRect(rrect(x, y, w, h, r), p)

def _mono(c, s, x, y, size, col=WHITE, a=1., align='l', glow=0.):
    return ftext(c, s, x, y, size, MONO, col, a, align, 700, glow)

def _slip(c, x, y, side, a, s=1.):
    """A deal slip centred at (x, y): BUY 9:20 (green) or SELL 15:10 (orange)."""
    if a <= 0: return
    col = GREEN if side == 'buy' else ORANGE
    w, h = 200 * s, 74 * s
    _box(c, x - w / 2, y - h / 2, w, h, col, a, .74, .95, r=14 * s)
    text(c, 'BUY' if side == 'buy' else 'SELL', x - w / 2 + 18 * s, y + 10 * s, 28 * s, 800, col, a)
    _mono(c, '9:20' if side == 'buy' else '15:10', x + w / 2 - 16 * s, y + 10 * s, 28 * s, WHITE, a, 'r')

def _drawer(c, x, y, w, h, title, sub, ic, col, a, glow=0.):
    """A filing drawer (head of income), top-left (x, y)."""
    if a <= 0: return
    c.drawRRect(rrect(x, y + 10, w, h, 16), paint(BLACK, .45 * a, blur=18))
    c.drawRRect(rrect(x, y, w, h, 16), paint('#1f2840', a))
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, 16), paint('#56658a', .8 * a, stroke=1.4))
    fx, fy, fw, fh = x + 14, y + 22, w - 28, h - 44
    c.drawRRect(rrect(fx, fy, fw, fh, 12), paint('#2b3654', a))
    c.drawRRect(rrect(fx + .5, fy + .5, fw - 1, fh - 1, 12), paint(mixc('#6b7ca3', col, glow), (.7 + .3 * glow) * a, stroke=1.6 + 1.2 * glow))
    if glow > 0: c.drawRRect(rrect(fx - 5, fy - 5, fw + 10, fh + 10, 16), paint(col, .45 * glow * a, stroke=8, blur=10))
    cx = x + w / 2
    c.drawCircle(cx, fy + 52, 34, paint('#141a2c', a)); c.drawCircle(cx, fy + 52, 34, paint(mixc(DIM, col, glow), .5 * a, stroke=1.6))
    icon(c, ic, cx, fy + 52, .74, mixc(DIM, col, glow), a, 3.4)
    lw = fw - 30; ly = fy + 104
    c.drawRRect(rrect(cx - lw / 2 - 4, ly - 4, lw + 8, 88, 9), paint('#8b97b0', a))
    c.drawRRect(rrect(cx - lw / 2, ly, lw, 80, 7), paint('#f3ead3', a))
    lines = wrap(title, 26, lw - 18, 800)[:2]
    for k, ln in enumerate(lines):
        text(c, ln, cx, ly + 40 + (k - (len(lines) - 1) / 2) * 30 + 9, 26, 800, INK, a, 'c')
    if sub:
        sw = text_w(sub, 22, 800) + 32
        c.drawRRect(rrect(cx - sw / 2, ly + 96, sw, 34, 17), paint(shade(col, -.8), .95 * a))
        c.drawRRect(rrect(cx - sw / 2, ly + 96, sw, 34, 17), paint(col, .95 * a, stroke=1.8))
        text(c, sub, cx, ly + 96 + 25, 22, 800, col, a, 'c')
    c.drawRRect(rrect(cx - 46, fy + fh - 30, 92, 16, 8), paint('#aab4c6', a))

def _wall(c, x, y0, y1, a, u, shake=0., label=None):
    """A short brick wall rising from y1 up to y0 (u 0..1), centred on x."""
    if a <= 0 or u <= 0: return
    w = 46; top = lerp(y1, y0, eout(u)); x += shake
    c.drawRRect(rrect(x - w / 2 + 4, top + 8, w, y1 - top, 6), paint(BLACK, .45 * a, blur=10))
    c.drawRRect(rrect(x - w / 2, top, w, y1 - top, 6), paint('#7a2e2e', a))
    c.save(); c.clipRRect(rrect(x - w / 2, top, w, y1 - top, 6), True)
    bp = paint('#c45656', .55 * a, stroke=1.6, cap=False)
    for k, yy in enumerate(np.arange(y1, top - 30, -24)):
        c.drawLine(x - w / 2, yy, x + w / 2, yy, bp)
        bx = x - w / 2 + (12 if k % 2 else 24)
        c.drawLine(bx, yy - 24, bx, yy, bp)
    c.restore()
    c.drawRRect(rrect(x - w / 2, top, w, y1 - top, 6), paint(RED, .9 * a, stroke=2.4))
    if label: text(c, label, x, top - 18, 26, 800, RED, a * seg(u, .6, 1), 'c', shadow=6)

def _lossblock(c, x, y, a, s=1., amt=None, u=1., label='Speculation loss'):
    """Red loss block centred at (x, y)."""
    if a <= 0: return
    w, h = (320 if amt else 280) * s, (104 if amt else 70) * s
    _box(c, x - w / 2, y - h / 2, w, h, RED, a, .76, .95, r=14 * s)
    if amt:
        text(c, label, x, y - 16 * s, 26 * s, 800, RED, a, 'c')
        roll(c, -amt, x, y + 32 * s, u, 40 * s, RED, a, 'c')
    else:
        text(c, label, x, y + 10 * s, 28 * s, 800, WHITE, a, 'c')

# ---------------------------------------------------------------- d1/d2: the trading terminal
PX, PY, PW, PH = 380, 292, 860, 400
CX0, CX1, CY0, CY1 = 432, 1192, 392, 612
NC = 25
_P = [100.]
for _k in range(NC): _P.append(_P[-1] + (hsh(_k, 7.3) - .46) * 5.)
_PLO, _PHI = min(_P) - 3, max(_P) + 3
def _py(p): return lerp(CY1, CY0, (p - _PLO) / (_PHI - _PLO))
def _price_at(u):
    k = u * NC; i = min(int(k), NC - 1); f = k - i
    return lerp(_P[i], _P[i + 1], f)
U_B, U_S = 5 / 375, 355 / 375
XB, XS = lerp(CX0, CX1, U_B), lerp(CX0, CX1, U_S)
YB, YS = _py(_price_at(U_B)), _py(_price_at(U_S))
DBX, DBY, DBW, DBH = 1300, 318, 300, 250                     # the delivery box (d1)
GBX, GBY = 960, 604                                          # ... as the empty goods box under the deal (d2)

def _terminal(c, t):
    a = seg(t, CS - .2, CS + .5) * (1 - seg(t, D2 - .3, D2 + .5))
    if a <= 0: return
    card(c, PX, PY, PW, PH, a)
    c.drawRRect(rrect(PX + .5, PY + .5, PW - 1, PH - 1, 22), paint(ACC, .35 * a, stroke=1.4))
    text(c, 'INTRADAY · EQUITY SHARES', PX + 30, PY + 44, 22, 800, ACC, a, track=2.5)
    u = seg(t, BUYS - .45, CLOSES + .35, linr)
    mins = 555 + u * 375
    _mono(c, '%02d:%02d' % (mins // 60, mins % 60), PX + PW - 30, PY + 46, 30, GOLD, a, 'r')
    # grid + time axis
    gp = paint(WHITE, .06 * a, stroke=1, cap=False)
    for k in range(5): c.drawLine(CX0, lerp(CY0, CY1, k / 4), CX1, lerp(CY0, CY1, k / 4), gp)
    for s_, uu in (('9:15', 0), ('12:00', 165 / 375), ('15:30', 1)):
        xx = lerp(CX0, CX1, uu)
        c.drawLine(xx, CY1 + 4, xx, CY1 + 14, paint(DIM, .6 * a, stroke=2))
        _mono(c, s_, xx, CY1 + 46, 24, DIM, .9 * a, 'c')
    # candles revealed up to the cursor
    sw = (CX1 - CX0) / NC; kk = u * NC
    for i in range(NC):
        if i >= kk: break
        f = clamp(kk - i)
        o = _P[i]; cl = lerp(_P[i], _P[i + 1], f)
        hi = max(o, cl) + 1.2 * hsh(i, 2) * f; lo = min(o, cl) - 1.2 * hsh(i, 3) * f
        col = GREEN if cl >= o else RED
        xm = CX0 + (i + .5) * sw
        c.drawLine(xm, _py(hi), xm, _py(lo), paint(col, .8 * a, stroke=2))
        y0, y1 = _py(max(o, cl)), _py(min(o, cl))
        c.drawRect(skia.Rect(xm - sw * .3, y0, xm + sw * .3, max(y1, y0 + 2)), paint(col, .85 * a))
    if 0 < u < 1:
        xc = lerp(CX0, CX1, u)
        c.drawLine(xc, CY0 - 10, xc, CY1, paint(GOLD, .7 * a, stroke=2))
    # BUY / SELL flags (pins) on the chart
    for side, uu, xx, yy, tt in (('buy', U_B, XB, YB, BUYS), ('sell', U_S, XS, YS, SELLS)):
        fa = a * seg(t, tt - .15, tt + .25)
        if fa <= 0: continue
        col = GREEN if side == 'buy' else ORANGE
        c.drawCircle(xx, yy, 8, paint(col, fa)); c.drawCircle(xx, yy, 14, paint(col, .4 * fa, stroke=2))

def _rohan(c, t):
    a = seg(t, CS - .2, CS + .6) * (1 - seg(t, D3 - .5, D3))
    if a <= 0: return
    person(c, 200, 694, 1., a, 'rohan', t, talk=0., look=.6, mood=.2 if t < NEVER1 else -.2)
    text(c, 'Rohan', 200, 738, 26, 800, WHITE, a, 'c')
    text(c, 'intraday trader', 200, 770, 22, 700, DIM, .9 * a, 'c')

def _delivery(c, t):
    """d1: the delivery box waiting; d2: it slides under the deal as the empty goods box, hand-over crossed."""
    a = seg(t, BUYS - .1, BUYS + .5) * (1 - seg(t, D3 - .4, D3 + .1))
    if a <= 0: return
    mv = seg(t, D2 - .1, D2 + .7)
    w, h = lerp(DBW, 340, mv), lerp(DBH, 150, mv)
    cx, cy = lerp(DBX + DBW / 2, GBX, mv), lerp(DBY + DBH / 2, GBY, mv)
    x, y = cx - w / 2, cy - h / 2
    never = seg(t, NEVER1 - .1, NEVER1 + .3)
    col = mixc(ACC, RED, never * (1 - mv) + seg(t, HANDS - .1, HANDS + .3) * mv)
    c.drawRRect(rrect(x, y, w, h, 16), paint(WHITE, .03 * a))
    _dashed(c, x, y, w, h, col, .85 * a)
    ttl = 'DELIVERY' if mv < .5 else 'GOODS / SHARES'
    ta = a * (abs(mv - .5) * 2)
    text(c, ttl, cx, y + 38, 22, 800, col, ta, 'c', track=3)
    # ghost share certificate (d1) — never arrives
    ga = a * (1 - mv)
    if ga > 0:
        gx, gy = cx - 78, y + 62
        p = paint(DIM, .45 * ga, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([7, 6], 0))
        c.drawRRect(rrect(gx, gy, 156, 100, 8), p)
        for k in range(3): c.drawLine(gx + 18, gy + 30 + k * 22, gx + 138 - k * 24, gy + 30 + k * 22, paint(DIM, .3 * ga, stroke=2))
        if t < NEVER1:                                       # waiting dots
            for k in range(3):
                q = .5 + .5 * math.sin((t - BUYS) * 5 - k * .9)
                c.drawCircle(cx - 24 + k * 24, gy + 128, 6, paint(DIM, (.25 + .6 * q) * ga))
        if never > 0:
            cross(c, cx, gy + 50, ga * never, 30)
            text(c, 'never delivered', cx, y + h - 24, 26, 800, RED, ga * seg(t, DELIV1 - .2, DELIV1 + .3), 'c')
    # d2: the hand-over arrow inside the goods box, crossed
    if mv > 0:
        ha = a * mv * seg(t, CHANGING - .3, CHANGING + .2)
        if ha > 0:
            P = np.array([(cx - 110, cy + 22), (cx - 40, cy - 8), (cx + 40, cy - 8), (cx + 110, cy + 22)])
            pts = catmull(P, step=4)
            c.drawPath(poly(pts[:-4], False), paint(DIM, .85 * ha, stroke=3.4))
            arrow(c, pts[-9][0], pts[-9][1], pts[-1][0], pts[-1][1], DIM, 3.4, .85 * ha, 18)
            text(c, 'seller', cx - 118, cy + 54, 22, 700, DIM, ha, 'c')
            text(c, 'buyer', cx + 118, cy + 54, 22, 700, DIM, ha, 'c')
        xa = a * mv * seg(t, HANDS - .1, HANDS + .3)
        if xa > 0:
            cross(c, cx, cy + 8, xa, 26)
            text(c, 'never change hands', cx, y + h + 38, 26, 800, RED, xa, 'c')

def _bakery_q(c, t):
    a = seg(t, SAME1 - .3, SAME1 + .3) * (1 - seg(t, D2 - .3, D2 + .2))
    if a <= 0: return
    shop(c, 1470, 806, .38, a, t, lit=1.)
    k = .5 + .5 * math.sin((t - SAME1) * 5)
    text(c, '= ?', 1300, 742, 54, 800, GOLD, a * seg(t, BAKERY1 - .2, BAKERY1 + .3) * (.7 + .3 * k), 'c', shadow=8)

# d2: the two slips leave the chart and snap together
DLX, DLY = 960, 412

def _deal_pos(t):
    """Centres of the BUY / SELL slips and their scale."""
    u1 = seg(t, D2 - .2, D2 + .6)
    snap = seg(t, SETTLED - .3, SETTLED + .05, ein)
    bx = lerp(XB + 112, 700, u1); by = lerp(YB - 64, DLY, u1)
    sx = lerp(XS - 112, 1220, u1); sy = lerp(YS - 64, DLY, u1)
    bx = lerp(bx, DLX - 100, snap); sx = lerp(sx, DLX + 100, snap)
    return (bx, by), (sx, sy), lerp(1., 1., u1)

def _deal(c, t):
    if t < BUYS - .2 or t > OWN3 + 1.0: return
    a = 1.
    (bx, by), (sx, sy), s = _deal_pos(t)
    # d3: lift and shrink into the speculation drawer
    u3 = seg(t, D3 - .3, D3 + .5)
    tx, ty = 1000, 352
    if u3 > 0:
        bx, by = lerp(bx, tx - 100, u3), lerp(by, ty, u3); sx, sy = lerp(sx, tx + 100, u3), lerp(sy, ty, u3)
    drop = seg(t, OWN3 - .1, OWN3 + .55, ein)
    if drop > 0:
        mx, my = BX1 + BW / 2, BY + 150
        s = lerp(1., .35, drop); a = 1 - seg(drop, .75, 1)
        bx, by = lerp(bx, mx - 100 * s, drop), lerp(by, my, drop); sx, sy = lerp(sx, mx + 100 * s, drop), lerp(sy, my, drop)
    ba = a * seg(t, BUYS - .2, BUYS + .2) * (1 if t > D2 - .3 else seg(t, BUYS, BUYS + .3))
    sa = a * seg(t, SELLS - .2, SELLS + .2)
    snap = seg(t, SETTLED - .05, SETTLED + .6)
    if snap > 0 and snap < 1:
        c.drawCircle(DLX + (tx - DLX) * u3, DLY + (ty - DLY) * u3, 60 + 60 * snap, paint(GOLD, .35 * (1 - snap), blur=14))
    _slip(c, bx, by, 'buy', ba, s)
    _slip(c, sx, sy, 'sell', sa, s)
    # the price gap: a gold coin at the joint (d2 'a bet on prices')
    ca = seg(t, BET - .25, BET + .2, back) * (1 - seg(t, D3 - .3, D3))
    if ca > 0:
        coin(c, DLX, DLY - 66, 24 * ca, 1., GOLD, '₹', spin=(t - BET) * 2.2)
        text(c, '± price difference', DLX + 40, DLY - 58, 24, 700, DIM, ca * seg(t, BET, BET + .4) * (1 - seg(t, D3 - .3, D3)))
    # labels
    la = seg(t, BET - .15, BET + .3) * (1 - seg(t, D3 - .4, D3 - .05))
    if la > 0:
        chip(c, 790, 300, 'a bet on prices', GOLD, la, 28)
        ta = la * seg(t, TRADE2 - .25, TRADE2 + .2)
        if ta > 0:
            w = chip(c, 1150, 300, 'not trade', RED, ta, 28)
            c.drawLine(1150 - w / 2 + 12, 302, 1150 + w / 2 - 12, 298, paint(RED, ta, stroke=3.4))
    na = seg(t, SPEC3 - .2, SPEC3 + .3) * (1 - seg(t, OWN3 + .2, OWN3 + .6))
    if na > 0:
        text(c, 'Speculative transaction', 930, 274, 36, 800, GOLD, na, 'c', shadow=6)
        sec(c, 1162, 262, '43(5)', na * seg(t, SEC3 - .2, SEC3 + .3), VIO, 24)

# ---------------------------------------------------------------- d3/d4: two drawers, the loss and its limits
AX, BY, BW, BH = 170, 430, 330, 340
BX1 = 640                                                   # drawer B's resting x

def _drawers(c, t):
    a = seg(t, SPEC3 + .4, SPEC3 + 1.0) * (1 - seg(t, D5 - .45, D5 + .05))
    if a <= 0: return
    bu = seg(t, TREATED3 - .15, TREATED3 + .9, eout)
    bx = lerp(AX, BX1, bu)
    gb = win(t, TREATED3 + .4, OWN3 + 1.6, .4, .6) + .5 * seg(t, LOSSES4 - .2, LOSSES4 + .3) * (1 - seg(t, CARRY4, CARRY4 + .5))
    if bu > 0:
        _drawer(c, bx, BY, BW, BH, 'Speculation business', 'separate', 'chart', ORANGE, a * clamp(bu * 3), min(gb, 1))
    ga = .6 * (1 - bu) + .25
    _drawer(c, AX, BY, BW, BH, 'Business · the bakery', 'PGBP', 'shop', GOLD, a, ga * seg(t, SPEC3 + .4, SPEC3 + 1))
    _strip(c, t, a)
    # the loss
    if t < LOSSES4 - .3: return
    out = seg(t, LOSSES4 - .3, LOSSES4 + .4, eout)
    hx, hy = BX1 + BW / 2, 330                              # holding spot above drawer B
    x = BX1 + BW / 2; y = lerp(BY + 160, hy, out)
    wu = seg(t, SETOFF4 - .35, SETOFF4 + .05)
    # slide at the bakery drawer, bounce at the wall
    go = seg(t, SETOFF4 - .05, SETOFF4 + .4, ein); bk = seg(t, SETOFF4 + .4, SETOFF4 + .9, eout)
    wx = (AX + BW + BX1) / 2
    x = lerp(x, wx + 23 + 140, go); x = lerp(x, hx, bk)
    shake = 6 * math.sin((t - SETOFF4 - .4) * 40) * win(t, SETOFF4 + .4, SETOFF4 + .9, .02, .4)
    # dock in the speculation-profit slot
    SX, SY = 1250, 330
    dk = seg(t, SPROF4 - .15, SPROF4 + .5)
    x, y = lerp(x, SX, dk), lerp(y, SY, dk)
    # ride the carry-forward strip
    cen = _strip_cen()
    hop = seg(t, CARRY4 + .1, FOUR4 + .45, linr) * 3                # 0..3 → Year 1..Year 4
    if t > CARRY4 - .1:
        k0 = int(min(hop, 2.999)); f = hop - k0
        u0 = seg(t, CARRY4 - .1, CARRY4 + .3)
        if hop <= 0:
            px, py = lerp(SX, cen[0][0], u0), lerp(SY, cen[0][1] - 4, u0) - 60 * math.sin(math.pi * u0)
        else:
            (x0, y0), (x1, y1) = cen[k0], cen[min(k0 + 1, 3)]
            px, py = lerp(x0, x1, f), lerp(y0, y1, f) - 4 - 46 * math.sin(math.pi * f)
        if u0 < 1: _lossblock(c, lerp(px, SX, 0) if hop <= 0 else px, py, a * (1 - seg(u0, .3, .6)), lerp(1., .6, u0))
        ta = a * seg(u0, .3, .6)
        if ta > 0:
            c.drawRRect(rrect(px - 62, py - 24, 124, 48, 24), paint(shade(RED, -.7), ta))
            c.drawRRect(rrect(px - 62, py - 24, 124, 48, 24), paint(RED, ta, stroke=2.4))
            text(c, '− loss', px, py + 9, 26, 800, RED, ta, 'c')
    else:
        _lossblock(c, x, y, a, 1.)
    _wall(c, wx, 300, BY + BH, a * (1 - seg(t, SPROF4 + .6, SPROF4 + 1.2)), wu, shake, 'no set-off')
    if t > SPROF4 - .6:
        sa = a * seg(t, SPROF4 - .6, SPROF4 - .1)
        sp = GREEN
        filled = seg(t, SPROF4 + .3, SPROF4 + .6)
        c.drawRRect(rrect(SX - 170, SY - 50, 340, 100, 16), paint(GREEN, (.05 + .1 * filled) * sa))
        _dashed(c, SX - 170, SY - 50, 340, 100, sp, .9 * sa)
        if t < SPROF4 + .3: text(c, 'Speculation profit', SX, SY + 10, 28, 800, GREEN, sa, 'c')
        text(c, 'set off only against', SX, SY - 66, 24, 700, DIM, sa, 'c')
        if filled > 0: text(c, 'Speculation profit', SX, SY + 82, 26, 800, GREEN, sa * filled, 'c')

def _strip_cen():
    return yearstrip(None, 1010, 600, 790, 5, 0)

def _strip(c, t, a):
    sa = a * seg(t, CARRY4 - .4, CARRY4 + .1)
    if sa <= 0: return
    hop = seg(t, CARRY4 + .1, FOUR4 + .45, linr) * 3
    hl = {k: 1. for k in range(4) if hop >= k - .2 and t > CARRY4 + .1}
    cen = yearstrip(c, 1010, 600, 790, 5, sa, labels=['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                    hl=hl, col=ACC)
    text(c, 'carry forward', 1010, 580, 26, 800, WHITE, sa)
    fa = sa * seg(t, FOUR4 - .2, FOUR4 + .3)
    if fa > 0: chip(c, 1010 + 790 - 120, 572, 'just 4 years', GOLD, fa, 24)
    xa = sa * seg(t, YEARS4 + .3, YEARS4 + .7)
    if xa > 0:
        x5, y5 = cen[4]
        c.drawRRect(rrect(x5 - 75, y5 - 36, 150, 72, 12), paint(BLACK, .45 * xa))
        cross(c, x5, y5, xa, 24)

# ---------------------------------------------------------------- d5: not speculation
NX = (130, 700, 1270); NY, NW, NH = 330, 520, 440

def _not_spec(c, t):
    a = seg(t, D5 - .35, D5 + .3) * (1 - seg(t, D6 - .5, D6 - .1))
    if a <= 0: return
    ha = a * seg(t, SOME5 - .1, SOME5 + .4)
    text(c, 'No delivery — and still', 960, 286, 32, 800, WHITE, ha, 'r')
    na = a * seg(t, NOT5 - .2, NOT5 + .3)
    w = chip(c, 980, 276, 'not speculation', GREEN, na, 30, 'l')
    items = ((BAKER5, WHEAT5, 'Hedging raw material', 'a baker fixes the price of wheat', GOLD),
             (INVEST5, SHARES5, 'Hedging shares', 'an investor protects his holdings', BLUE),
             (TRADING5, EXCH5, 'Derivatives', 'F&O and commodity derivatives on a recognised stock exchange', VIO))
    for k, (t0, tk, ttl, sub, col) in enumerate(items):
        x = NX[k]; pa = a * seg(t, SOME5 + .1 * k, SOME5 + .4 + .1 * k)
        fill = seg(t, t0 - .3, t0 + .3)
        ok = seg(t, tk - .15, tk + .3, back)
        cc = mixc(DIM, col, fill)
        _box(c, x, NY + 18 * (1 - pa), NW, NH, cc, pa * (.45 + .55 * fill), .82, .7 + .3 * fill, glow=.6 * win(t, tk, tk + 1.4, .1, .8))
        if fill <= 0:
            _dashed(c, x + 20, NY + 20, NW - 40, NH - 40, DIM, .25 * pa)
            text(c, 'deal without delivery', x + NW / 2, NY + NH / 2 + 10, 26, 700, DIM, .6 * pa, 'c')
            continue
        fa = pa * fill
        cx, cy = x + NW / 2, NY + 150
        if k == 0: _art_wheat(c, cx, cy, fa, t, seg(t, tk - .3, tk + .1))
        elif k == 1: _art_shield(c, cx, cy, fa, t, t0)
        else: _art_exchange(c, cx, cy, fa, t, t0)
        text(c, ttl, x + 32, NY + 300, 32, 800, WHITE, fa)
        for j, ln in enumerate(wrap(sub, 25, NW - 64, 600)[:2]):
            text(c, ln, x + 32, NY + 342 + j * 32, 25, 600, DIM, fa)
        if ok > 0:
            tick(c, x + NW - 40, NY + 40, pa * clamp(ok), 24)
    ca = a * seg(t, COMMOD5 - .2, COMMOD5 + .3)

def _art_wheat(c, cx, cy, a, t, lock):
    """Wheat sack with a price tag that jitters, then a padlock clicks shut on it."""
    sack(c, cx - 90, cy + 92, .82, a, 'Wheat', '#e3cf9f')
    icon(c, 'wheat', cx - 165, cy - 30, .8, GOLD, a)
    jit = (1 - lock) * 4 * math.sin(t * 13)
    price_tag(c, cx + 96, cy - 6 + jit, 'price fixed' if lock > .5 else 'price ?', GOLD, a, 26, -6 + jit)
    padlock(c, cx + 112, cy + 70, .7, GREEN if lock > .5 else DIM, a, 1 - lock)

def _art_shield(c, cx, cy, a, t, t0):
    """A falling share line; a shield takes the hit."""
    x0, x1, y0 = cx - 190, cx + 70, cy - 70
    u = seg(t, t0 - .2, t0 + 1.6, linr)
    pts = [(lerp(x0, x1, q), y0 + 18 * math.sin(q * 9) + 120 * q * q) for q in np.linspace(0, max(u, .02), 30)]
    c.drawPath(poly(np.array(pts), False), paint(RED, .9 * a, stroke=3.4))
    c.drawLine(x0, cy + 70, x1 + 20, cy + 70, paint(DIM, .35 * a, stroke=1.6))
    icon(c, 'shield', cx + 130, cy, 1.5, BLUE, a, 3.4)
    icon(c, 'chart', cx + 130, cy + 2, .55, BLUE, a * .8, 3)

def _art_exchange(c, cx, cy, a, t, t0):
    """An exchange building with an F&O ticker scrolling."""
    icon(c, 'bank', cx - 120, cy - 4, 1.9, VIO, a, 3.2)
    bw, bh = 230, 60; bx, by = cx + 10, cy - 30
    c.drawRRect(rrect(bx, by, bw, bh, 10), paint('#070b16', a))
    c.drawRRect(rrect(bx, by, bw, bh, 10), paint(VIO, .8 * a, stroke=1.8))
    c.save(); c.clipRRect(rrect(bx + 4, by, bw - 8, bh, 10), True)
    s = 'FUT  ▲ 0.8%   OPT  ▼ 0.3%   COMDTY ▲ 1.1%   '
    off = ((t - t0) * 70) % ftext_w(s, 24)
    for j in range(2): _mono(c, s, bx + 8 - off + j * ftext_w(s, 24), by + 39, 24, GOLD, a)
    c.restore()
    chip(c, bx + bw / 2, cy + 74, 'F&O', VIO, a, 26)

# ---------------------------------------------------------------- d6: Rohan's ₹50,000 loss can't touch the bakery
LX6, LY6 = 330, 600
PX6, PY6 = 1490, 640
WX6 = 960

def _example(c, t):
    a = seg(t, D6 - .4, D6 + .3) * (1 - seg(t, D7 - .5, D7 - .05))
    if a <= 0: return
    person(c, LX6, 450, .82, a, 'rohan', t, look=.5, mood=-.5 * seg(t, FIFTY6, FIFTY6 + .5))
    text(c, 'Rohan · intraday trades', LX6, 488, 24, 700, DIM, a * seg(t, INTRA6 - .3, INTRA6 + .2), 'c')
    shop(c, PX6, 520, .44, a * seg(t, BAKERY6 - .4, BAKERY6 + .1), t, lit=1.)
    # bakery profit
    pa = a * seg(t, BAKERY6 - .2, BAKERY6 + .3)
    if pa > 0:
        _box(c, PX6 - 200, PY6 - 56, 400, 112, GOLD, pa, .8, .95, glow=.4 * win(t, TWELVE6, TWELVE6 + 1.6, .1, .8))
        text(c, 'Bakery profit', PX6, PY6 - 14, 26, 800, GOLD, pa, 'c')
        roll(c, 1200000, PX6, PY6 + 34, seg(t, TWELVE6 - .1, TWELVE6 + .7, linr), 40, GOLD, pa, 'c')
    # the wall
    wu = seg(t, CUT6 - .2, CUT6 + .25)
    hit = CUT6 + .45
    shake = 7 * math.sin((t - hit) * 40) * win(t, hit, hit + .5, .02, .45)
    _wall(c, WX6, 470, 780, a, wu, shake, "can't cut")
    # the loss block: slide, bounce, wait
    la = a * seg(t, FIFTY6 - .3, FIFTY6 + .1)
    if la <= 0: return
    x, y, s = LX6, PY6, 1.
    go = seg(t, CUT6 - .05, hit, ein); bk = seg(t, hit, hit + .5, eout)
    x = lerp(x, WX6 - 23 - 162, go); x = lerp(x, LX6 + 60, bk)
    wt = seg(t, WAITS6 - .1, WAITS6 + .7)
    bx0, by0, bw, bh = 110, 696, 790, 116
    x, y, s = lerp(x, bx0 + 150, wt), lerp(y, by0 + bh / 2, wt), lerp(1, .85, wt)
    ba = a * seg(t, WAITS6 - .4, WAITS6)
    if ba > 0:
        c.drawRRect(rrect(bx0, by0, bw, bh, 16), paint(WHITE, .03 * ba))
        _dashed(c, bx0, by0, bw, bh, GREEN, .8 * ba)
        hourglass(c, bx0 + bw - 46, by0 + bh / 2, .52, ba, seg(t, WAITS6, CE, linr))
        fa = ba * seg(t, FUTURE6 - .2, FUTURE6 + .3)
        text(c, 'waits for a', bx0 + 312, by0 + 48, 24, 700, DIM, fa)
        text(c, 'future speculation profit', bx0 + 312, by0 + 84, 28, 800, GREEN, fa)
    _lossblock(c, x + shake * go * (1 - bk), y, la, s, 50000, seg(t, FIFTY6 - .1, FIFTY6 + .7, linr))

# ---------------------------------------------------------------- d7–d9: composite income
TX7, FX7, GY7 = 380, 1090, 528                      # tea estate, factory, ground line
BX0, BX1_, BY7, BH7 = 200, 1400, 678, 76            # the one-profit bar (d7/d8)
RX0, RX1 = 600, 1500                                # table bars (d9)
ROWS9 = [(None, 'Tea', 'grown & made', .40, None),
         (RUBBER9, 'Rubber', None, .35, THIRTY9),
         (COFFEE9, 'Coffee', 'grown & cured', .25, TWENTY9),
         (ROASTED9, 'Coffee', 'also roasted & ground', .40, FORTY9)]
RY9 = (318, 450, 570, 690)

def _composite(c, t):
    a = seg(t, D7 - .4, D7 + .3) * (1 - seg(t, D10 - .35, D10 + .2))
    if a <= 0: return
    ia = a * (1 - seg(t, D9 - .2, D9 + .5))                  # pictures leave for the table in d9
    if ia > 0:
        tea(c, TX7, GY7, .82, ia * seg(t, D7 - .25, D7 + .4))
        fa = ia * seg(t, FACTORY7 - .5, FACTORY7)
        factory(c, FX7, GY7, .7, fa, t)
        if fa > 0:                                          # leaves travelling from the hills to the factory
            P = catmull(np.array([(470, 388), (640, 330), (820, 350), (930, 440)], float), step=6)
            flowdots(c, P, ((t - FACTORY7) * .55) % 1, fa, GREEN, 8, 7., .5)
            arrow(c, P[-6][0], P[-6][1], P[-1][0], P[-1][1], GREEN, 3, .6 * fa, 14)
        ga = ia * seg(t, FARMING7 - .3, FARMING7 + .2)
        text(c, 'Growing the leaves', TX7, GY7 + 40, 26, 700, DIM, ga, 'c')
        chip(c, TX7, GY7 - 286, 'farming', GREEN, ga, 28)
        ba = ia * seg(t, BUSINESS7 - .3, BUSINESS7 + .2)
        text(c, 'Making tea in the factory', FX7, GY7 + 40, 26, 700, DIM, ba, 'c')
        chip(c, FX7 - 60, GY7 - 286, 'business', GOLD, ba, 28)
    # the one-profit bar → table row 0
    pa = a * seg(t, ONE7 - .3, ONE7 + .2)
    if pa > 0:
        mv = seg(t, D9 - .1, D9 + .7)
        x0, x1 = lerp(BX0, RX0, mv), lerp(BX1_, RX1, mv)
        y, h = lerp(BY7, RY9[0], mv), lerp(BH7, 64, mv)
        grow = seg(t, ONE7 - .3, ONE7 + .5, eout)
        xm = (x0 + x1) / 2; x0g, x1g = lerp(xm, x0, grow), lerp(xm, x1, grow)
        sp = seg(t, FORTY8 - .3, FORTY8 + .4)
        two = seg(t, NATURES7 - .3, NATURES7 + .3)
        _split_bar(c, x0g, y, x1g - x0g, h, .40, pa, two, sp, t)
        if sp <= 0:
            lab(c, 'one profit', xm, y + h / 2 + 10, pa * grow * (1 - two * .0), 30, WHITE, 800)
        if two > 0 and sp < 1:
            text(c, '?', x0g + (x1g - x0g) * lerp(.5, .6, sp), y - 14, 44, 800, GOLD, pa * two * (1 - sp) * (.7 + .3 * math.sin(t * 5)), 'c')
        # d8 labels under the split
        la = pa * sp * (1 - mv)
        if la > 0:
            xs = x0 + (x1 - x0) * .6
            text(c, '60% agricultural', (x0 + xs) / 2, y + h / 2 + 11, 30, 800, '#06240f', la * seg(t, SIXTY8 - .3, SIXTY8 + .2), 'c')
            text(c, '40% business', (xs + x1) / 2, y + h / 2 + 11, 30, 800, '#2a1c02', la, 'c')
            ea = la * seg(t, EXEMPT8 - .3, EXEMPT8 + .2)
            chip(c, (x0 + xs) / 2, y + h + 34, 'exempt', GREEN, ea, 26)
            chip(c, (xs + x1) / 2, y + h + 34, 'taxable as business', GOLD, la * seg(t, FORTY8 + .6, FORTY8 + 1.0), 26)
        ra = pa * seg(t, RULES8 - .2, RULES8 + .3) * (1 - mv)
        if ra > 0:
            w = sec(c, x0, y - 32, 'Rule 8', ra, VIO, 24)
            text(c, 'Composite income', x0 + w + 16, y - 22, 30, 800, WHITE, ra * seg(t, COMPOSITE8 - .3, COMPOSITE8 + .2))
    _table(c, t, a)

def _split_bar(c, x, y, w, h, fb, a, two, sp, t):
    """A profit bar; two = tint into two natures, sp = the 40/60-style split (green agricultural left, gold business
    right, business share fb)."""
    if a <= 0 or w <= 2: return
    c.drawRRect(rrect(x, y + 6, w, h, 14), paint(BLACK, .4 * a, blur=12))
    base = mixc(ACC, GOLD, .25)
    c.save(); c.clipRRect(rrect(x, y, w, h, 14), True)
    c.drawRect(skia.Rect.MakeXYWH(x, y, w, h), paint(shade(base, -.25), a * (1 - two)))
    if two > 0:
        xs = x + w * lerp(.5, 1 - fb, sp)
        c.drawRect(skia.Rect(x, y, xs, y + h), paint(shader=lgrad((x, y), (x, y + h), [shade(GREEN, .1), shade(GREEN, -.25)]), a=a * two))
        c.drawRect(skia.Rect(xs, y, x + w, y + h), paint(shader=lgrad((x, y), (x, y + h), [shade(GOLD, .1), shade(GOLD, -.25)]), a=a * two))
        c.drawLine(xs, y - 6, xs, y + h + 6, paint(WHITE, .9 * a * two, stroke=3))
    c.drawRect(skia.Rect.MakeXYWH(x, y, w, h * .4), paint(WHITE, .12 * a))
    c.restore()
    c.drawRRect(rrect(x + .5, y + .5, w - 1, h - 1, 14), paint(WHITE, .25 * a, stroke=1.4))

def _table(c, t, a):
    ta = a * seg(t, D9 + .3, D9 + .8)
    if ta <= 0: return
    # legend
    la = ta * seg(t, TEN9 - .2, TEN9 + .3)
    c.drawRRect(rrect(600, 238, 26, 26, 6), paint(GREEN, la)); text(c, 'agricultural · exempt', 638, 260, 24, 700, DIM, la)
    c.drawRRect(rrect(960, 238, 26, 26, 6), paint(GOLD, la)); text(c, 'business · taxable', 998, 260, 24, 700, DIM, la)
    for k, (t0, name, sub, fb, tp) in enumerate(ROWS9):
        y = RY9[k]; h = 64
        if k == 0:
            ra = ta; gu = 1.
        else:
            ra = ta * seg(t, t0 - .3, t0 + .2); gu = seg(t, t0 - .1, t0 + .7, eout)
        if ra <= 0: continue
        text(c, name, 110, y + (28 if sub else 44), 32, 800, WHITE, ra)
        if sub: text(c, sub, 110, y + 60, 24, 700, DIM, ra)
        if k > 0:
            wbar = (RX1 - RX0) * gu
            _split_bar(c, RX0, y, wbar, h, fb, ra, 1., seg(t, (tp or t0) - .3, (tp or t0) + .4), t)
        xs = RX0 + (RX1 - RX0) * (1 - fb)
        pa = ra * (1. if k == 0 else seg(t, tp - .2, tp + .3))
        if pa > 0 and (k == 0 or gu > .9):
            text(c, '%d%%' % round(fb * 100), (xs + RX1) / 2, y + h / 2 + 11, 32, 800, '#2a1c02', pa, 'c')
            text(c, '%d%%' % round((1 - fb) * 100), (RX0 + xs) / 2, y + h / 2 + 11, 30, 800, '#06240f', pa * .85, 'c')
        if k == 0:
            ua = ta * seg(t, TEN9 - .15, TEN9 + .2)
            roll(c, 1000000, 1540, y + 30, seg(t, TEN9 - .1, TEN9 + .6, linr), 34, WHITE, ua, 'l')
            fa = ta * seg(t, FOUR9 - .15, FOUR9 + .25)
            if fa > 0:
                text(c, 'tax on', 1540, y + 66, 24, 700, DIM, fa)
                roll(c, 400000, 1628, y + 68, seg(t, FOUR9 - .1, FOUR9 + .6, linr), 30, GOLD, fa, 'l')

# ---------------------------------------------------------------- d10: below the check card
def _check(c, t):
    a = seg(t, D10 - .2, D10 + .4) * (1 - seg(t, CE - .5, CE + .3))
    if a <= 0: return
    ok = seg(t, A_ELIG - .2, A_ELIG + .3, back)
    y = 792; x = 860
    pu = .5 + .5 * math.sin((t - D10) * 3)
    _box(c, x - 150, y - 36, 300, 72, mixc(VIO, GREEN, clamp(ok)), a, .78, .95, glow=.3 * pu * (1 - clamp(ok)) + .6 * win(t, A_ELIG, A_ELIG + 2, .1, .9))
    icon(c, 'chart', x - 108, y, .5, mixc(VIO, GREEN, clamp(ok)), a)
    text(c, 'NSE · F&O', x + 18, y + 11, 30, 800, WHITE, a, 'c')
    if t < A_ELIG:
        text(c, '?', x + 200, y + 18, 50, 800, GOLD, a * (.55 + .45 * pu) * seg(t, NSE10 - .2, NSE10 + .3), 'c')
    else:
        tick(c, x + 196, y, a * clamp(ok), 24)
        chip(c, x + 360, y, 'not speculation', GREEN, a * seg(t, A_NOT - .2, A_NOT + .3), 26)

def ch_d(c, t):
    if t < CS - .5 or t > CE + .5: return
    _terminal(c, t)
    _rohan(c, t)
    _bakery_q(c, t)
    _delivery(c, t)
    _drawers(c, t)
    _deal(c, t)
    _not_spec(c, t)
    _example(c, t)
    _composite(c, t)
    _check(c, t)
