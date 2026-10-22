"""Chapter G — Depreciation: who gets it (section 32).
g1 hook: the ₹4,00,000 oven bill hovers over a waste bin; on "lose" it sinks towards it, "lost?".
g2 "No": the bill lifts back out and is cut into ten slices; a ten-year strip (2025-26 … 2034-35) appears and the
   slices drip into it, one a year (each year box turns green, "deducted"); the oven keeps baking but wears (its glow
   dims); "a slice a year = depreciation" with a § 32 chip.
g3 a shelf of depreciable assets: TANGIBLE (buildings, machinery, plant, furniture) and INTANGIBLE (know-how,
   patents, copyrights, trademarks, licences, franchises) tiles pop in as spoken.
g4 trap: the shop stands on a land block; the land is crossed ("never wears out"), the building above it ticked;
   a GOODWILL seal is stamped NOT DEPRECIABLE ("not any more").
g5 a gold PLANT bracket stretches wide over a van, books, a microscope and surgical tools; tea bushes, livestock
   and a building sit outside it (NOT PLANT, red crosses); roads, bridges and wells slide in: "count as buildings".
g6 three condition panels tick in turn: own it (a title deed, "wholly or partly"), use it for business during the
   year (the oven running over a year bar), an eligible asset (the shelf in miniature) -> "all three: depreciation".
g7 standby use: a generator that never ran (hours run 0000) and a fire extinguisher on the wall both get "in use";
   a tenant builds a store room onto a rented shop -> depreciation tick, "as if she owned it".
g8 what if Meera skips it? a "claim depreciation" switch flips OFF and this year's slice drifts to a later year;
   "She can't": the switch snaps back ON under a padlock, the slice drops into 2025-26, Explanation 5 chip,
   COMPULSORY stamp; claimed / not claimed -> deducted either way.
g9 check (below the card): Meera and the dealer either side of a LEASED mixer; the answer ticks the dealer
   (owner -> depreciation) and gives Meera "lease rent -> deduct"."""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('g')
G1, G2, G3, G4, G5, G6, G7, G8, G9 = (T(f'g{k}') for k in range(1, 10))
G9A = TA('g9')

# ---------------------------------------------------------------- word times
OVEN1, DEDUCT1, LOSE1, FOUR1 = W('g1', 'oven'), W('g1', 'deducted'), W('g1', 'lose'), W('g1', 'four')
NO2, SLOW2, SLICE2, EVERY2 = W('g2', 'no'), W('g2', 'slowly'), W('g2', 'slice'), W('g2', 'every')
WEARS2, THAT2, DEP2, SEC2 = W('g2', 'wears'), W('g2', 'that'), W('g2', 'depreciation'), W('g2', 'section')
ONLY3, QUAL3 = W('g3', 'only'), W('g3', 'qualify')
TANG3 = W('g3', 'tangible')
T3 = [W('g3', 'buildings'), W('g3', 'machinery'), W('g3', 'plant'), W('g3', 'furniture')]
INT3 = W('g3', 'intangible')
I3 = [W('g3', 'know'), W('g3', 'patents'), W('g3', 'copyrights'), W('g3', 'trademarks'), W('g3', 'licences'),
      W('g3', 'franchises')]
EXC4, LAND4, NEVER4, NODEP4 = W('g4', 'exceptions'), W('g4', 'land'), W('g4', 'never'), W('g4', 'no')
UNDER4, BLDG4, GW4, DEPR4 = W('g4', 'even'), W('g4', 'building'), W('g4', 'goodwill'), W('g4', 'depreciable')
PLANT5, WIDE5 = W('g5', 'plant'), W('g5', 'wide')
IN5 = [W('g5', 'vehicles'), W('g5', 'books'), W('g5', 'scientific'), W('g5', 'surgical')]
NOT5 = W('g5', 'not')
OUT5 = [W('g5', 'tea'), W('g5', 'livestock'), W('g5', 'buildings')]
RB5 = [W('g5', 'roads'), W('g5', 'bridges'), W('g5', 'wells')]
COUNT5 = W('g5', 'count')
THREE6 = W('g6', 'three')
C6 = [W('g6', 'own'), W('g6', 'use'), W('g6', 'one')]
PART6, YEAR6, ASSETS6 = W('g6', 'partly'), W('g6', 'during'), W('g6', 'assets')
STBY7, GEN7, NEVER7, FIRE7, WALL7, INUSE7 = (W('g7', 'standby'), W('g7', 'generator'), W('g7', 'never'),
                                             W('g7', 'fire'), W('g7', 'wall'), W('g7', 'in'))
TEN7, BUILDS7, STORE7, RENTED7, DEP7, OWNED7 = (W('g7', 'tenant'), W('g7', 'builds'), W('g7', 'store'),
                                               W('g7', 'rented'), W('g7', 'depreciation'), W('g7', 'owned'))
SKIP8, SAVE8, LATER8, CANT8 = W('g8', 'skips'), W('g8', 'save'), W('g8', 'later'), W('g8', 'she')
EXPL8, COMP8, DED8, CLAIM8, NOT8 = (W('g8', 'explanation'), W('g8', 'compulsory'), W('g8', 'deducted'),
                                    W('g8', 'claims'), W('g8', 'not'))
LEASE9, DEALER9 = W('g9', 'leases'), W('g9', 'dealer')
ADEAL9, AOWNS9, ADED9, ARENT9 = W('g9a', 'dealer'), W('g9a', 'owns'), W('g9a', 'deducts'), W('g9a', 'lease')

# g2: the drip — slice k leaves the bill at DRIP[k] and lands in year box k FLY s later
DRIP = [EVERY2 + .05 + .5 * k for k in range(10)]
FLY = .75
SNAP8 = CANT8 + .25                                      # g8: the switch is forced back on

for tt, k in ((OVEN1, 'pop'), (LOSE1, 'whoosh'), (FOUR1 + .3, 'warn'),
              (NO2, 'whoosh'), (SLOW2, 'snip'), (DRIP[0] + FLY, 'tick'), (DEP2, 'chime_lo'),
              (TANG3, 'pop'), (INT3, 'pop'),
              (NODEP4, 'error'), (BLDG4, 'ok'), (DEPR4 + .35, 'thunk'),
              (WIDE5, 'whoosh'), (NOT5 + .3, 'error'), (COUNT5, 'pop'),
              (C6[0], 'ok'), (C6[1], 'ok'), (C6[2], 'chime'),
              (INUSE7, 'ok'), (DEP7, 'ok'),
              (SKIP8, 'tap'), (SNAP8, 'error'), (SNAP8 + .35, 'key'), (COMP8 + .3, 'thunk'),
              (ADEAL9, 'ok')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _pop(t, t0, d=.45):
    return seg(t, t0, t0 + d, back)

def _scaled(c, x, y, k):
    c.save(); c.translate(x, y); c.scale(k, k); c.translate(-x, -y)

def _label(c, s, x, y, a, size=26, col=WHITE, w=700, align='c'):
    if a > 0: text(c, s, x, y, size, w, col, a, align, shadow=6)

def _bin(c, x, y, a, t, shake=0.):
    """A steel waste bin standing at (x, y) (bottom centre), 180 wide x 190 tall."""
    if a <= 0: return
    dx = math.sin(t * 40) * 6 * shake
    c.save(); c.translate(x + dx, y)
    c.drawOval(skia.Rect.MakeXYWH(-100, -10, 200, 22), paint(BLACK, .45 * a, blur=10))
    body = skia.Path(); body.moveTo(-82, -170); body.lineTo(82, -170); body.lineTo(66, 0); body.lineTo(-66, 0); body.close()
    c.drawPath(body, paint(shader=lgrad((-82, 0), (82, 0), ['#4b5670', '#8d98b0', '#4f5a73']), a=a))
    for k in range(-2, 3):
        c.drawLine(k * 26, -150, k * 21, -16, paint('#2f3850', .7 * a, stroke=3))
    c.drawRRect(rrect(-94, -186, 188, 20, 8), paint(shader=lgrad((0, -186), (0, -166), ['#aab4c8', '#5f6a82']), a=a))
    c.drawRRect(rrect(-30, -196, 60, 14, 6), paint('#6b7690', a))
    c.restore()

def _toggle(c, x, y, a, pos, locked=0.):
    """A large on/off switch centred at (x, y): pos 1 = ON (green, knob right), 0 = OFF (grey, knob left)."""
    if a <= 0: return
    w, h = 150, 64; col = mixc('#475569', GREEN, pos)
    c.drawRRect(rrect(x - w / 2, y - h / 2 + 4, w, h, h / 2), paint(BLACK, .45 * a, blur=8))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(shade(col, -.45), a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(col, .95 * a, stroke=2.4))
    text(c, 'ON', x - 34, y + 9, 24, 800, WHITE, a * pos, 'c')
    text(c, 'OFF', x + 32, y + 9, 22, 800, DIM, a * (1 - pos), 'c')
    kx = lerp(x - w / 2 + h / 2, x + w / 2 - h / 2, pos)
    c.drawCircle(kx, y + 3, h / 2 - 7, paint(BLACK, .4 * a, blur=5))
    c.drawCircle(kx, y, h / 2 - 7, paint(shader=rgrad(kx - 8, y - 10, 40, ['#ffffff', '#cbd5e1']), a=a))
    if locked > 0:
        padlock(c, x + w / 2 + 44, y - 4, .9, GOLD, a * locked)

# ---- line icons for tiles: fn(c, cx, cy, s) with s = 1 for a 64 px icon
def _p(col, s, w=3.2): return paint(col, 1, stroke=w * s)

def _i_chair(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawLine(x - 14 * s, y - 26 * s, x - 14 * s, y + 24 * s, p)
        c.drawLine(x - 14 * s, y + 2 * s, x + 18 * s, y + 2 * s, p)
        c.drawLine(x + 16 * s, y + 2 * s, x + 16 * s, y + 24 * s, p)
        c.drawLine(x - 14 * s, y - 26 * s, x - 2 * s, y - 22 * s, p)
        c.drawLine(x - 2 * s, y - 22 * s, x - 2 * s, y + 2 * s, p)
    return fn

def _i_bulb(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawCircle(x, y - 8 * s, 17 * s, p)
        c.drawLine(x - 8 * s, y + 14 * s, x + 8 * s, y + 14 * s, p)
        c.drawLine(x - 7 * s, y + 21 * s, x + 7 * s, y + 21 * s, p)
        q = skia.Path(); q.moveTo(x - 6 * s, y - 6 * s); q.lineTo(x - 2 * s, y + 2 * s); q.lineTo(x + 2 * s, y - 6 * s)
        q.lineTo(x + 6 * s, y + 2 * s); c.drawPath(q, _p(col, s, 2.4))
        for an in (-150, -90, -30):
            r = math.radians(an); c.drawLine(x + math.cos(r) * 24 * s, y - 8 * s + math.sin(r) * 24 * s,
                                             x + math.cos(r) * 30 * s, y - 8 * s + math.sin(r) * 30 * s, _p(col, s, 2.6))
    return fn

def _i_glyph(g, col):
    def fn(c, x, y, s):
        c.drawCircle(x, y, 25 * s, _p(col, s))
        text(c, g, x, y + 13 * s, 38 * s, 800, col, 1, 'c')
    return fn

def _i_patent(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawRRect(rrect(x - 18 * s, y - 26 * s, 36 * s, 46 * s, 4 * s), p)
        for k in range(3): c.drawLine(x - 10 * s, y - 14 * s + k * 9 * s, x + 10 * s, y - 14 * s + k * 9 * s, _p(col, s, 2.4))
        c.drawCircle(x + 14 * s, y + 18 * s, 9 * s, paint(col, 1))
        c.drawLine(x + 10 * s, y + 26 * s, x + 7 * s, y + 34 * s, _p(col, s, 3)); c.drawLine(x + 18 * s, y + 26 * s, x + 21 * s, y + 34 * s, _p(col, s, 3))
    return fn

def _i_licence(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawRRect(rrect(x - 27 * s, y - 18 * s, 54 * s, 36 * s, 6 * s), p)
        c.drawCircle(x - 13 * s, y - 3 * s, 6 * s, _p(col, s, 2.4))
        c.drawLine(x - 21 * s, y + 10 * s, x - 5 * s, y + 10 * s, _p(col, s, 2.4))
        for k in range(3): c.drawLine(x + 2 * s, y - 8 * s + k * 8 * s, x + 20 * s, y - 8 * s + k * 8 * s, _p(col, s, 2.4))
    return fn

def _i_bridge(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawLine(x - 30 * s, y - 6 * s, x + 30 * s, y - 6 * s, p)
        q = skia.Path(); q.moveTo(x - 24 * s, y + 20 * s); q.quadTo(x, y - 18 * s, x + 24 * s, y + 20 * s); c.drawPath(q, p)
        for k in (-14, 0, 14): c.drawLine(x + k * s, y - 6 * s, x + k * s, y + (4 if k else -1) * s + abs(k) * .7 * s, _p(col, s, 2.4))
        c.drawLine(x - 30 * s, y + 20 * s, x + 30 * s, y + 20 * s, _p(col, s, 2.4))
    return fn

def _i_well(col):
    def fn(c, x, y, s):
        p = _p(col, s)
        c.drawRRect(rrect(x - 20 * s, y + 2 * s, 40 * s, 22 * s, 4 * s), p)
        c.drawLine(x - 16 * s, y + 2 * s, x - 16 * s, y - 24 * s, p); c.drawLine(x + 16 * s, y + 2 * s, x + 16 * s, y - 24 * s, p)
        c.drawLine(x - 22 * s, y - 24 * s, x + 22 * s, y - 24 * s, p)
        c.drawLine(x, y - 24 * s, x, y - 6 * s, _p(col, s, 2.2)); c.drawRRect(rrect(x - 5 * s, y - 8 * s, 10 * s, 9 * s, 2 * s), _p(col, s, 2.2))
    return fn

def _icn(name, col):
    return lambda c, x, y, s: icon(c, name, x, y, s, col, 1)

# ---- small props for g5 (drawn at bottom centre (x, y))
def _books(c, x, y, s, a):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-80, -8, 160, 16), paint(BLACK, .4 * a, blur=8))
    for k, (w_, col, dx) in enumerate(((150, '#7c3aed', -4), (136, '#0f766e', 6), (144, '#b45309', -2), (124, '#1d4ed8', 4))):
        yy = -30 * (k + 1)
        c.drawRRect(rrect(-w_ / 2 + dx, yy, w_, 28, 4), paint(col, a))
        c.drawRect(skia.Rect.MakeXYWH(-w_ / 2 + dx + w_ - 12, yy + 3, 8, 22), paint('#f1ead8', a))
        c.drawLine(-w_ / 2 + dx + 14, yy + 9, -w_ / 2 + dx + 60, yy + 9, paint(GOLD, .8 * a, stroke=2.4))
    c.restore()

def _microscope(c, x, y, s, a):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-70, -8, 140, 16), paint(BLACK, .4 * a, blur=8))
    c.drawRRect(rrect(-58, -22, 116, 22, 8), paint('#334155', a))
    arm = skia.Path(); arm.moveTo(18, -22); arm.cubicTo(70, -60, 60, -140, 14, -160); arm.lineTo(0, -146)
    arm.cubicTo(38, -128, 44, -70, 0, -22); arm.close()
    c.drawPath(arm, paint('#e2e8f0', a))
    c.drawRRect(rrect(-44, -78, 76, 12, 4), paint('#94a3b8', a))
    c.save(); c.translate(-10, -150); c.rotate(-28)
    c.drawRRect(rrect(-14, -46, 28, 96, 8), paint(shader=lgrad((-14, 0), (14, 0), ['#64748b', '#f1f5f9', '#64748b']), a=a))
    c.drawRRect(rrect(-10, -62, 20, 18, 4), paint('#1e293b', a))
    c.drawRRect(rrect(-8, 50, 16, 22, 4), paint('#1e293b', a))
    c.restore()
    c.restore()

def _surgical(c, x, y, s, a):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-90, -8, 180, 16), paint(BLACK, .4 * a, blur=8))
    c.drawRRect(rrect(-86, -26, 172, 24, 6), paint(shader=lgrad((0, -26), (0, -2), ['#cbd5e1', '#64748b']), a=a))
    st = paint('#e2e8f0', a, stroke=6)
    c.drawLine(-70, -40, 10, -40, st)                                   # scalpel
    blade = skia.Path(); blade.moveTo(10, -46); blade.quadTo(46, -46, 52, -40); blade.lineTo(10, -36); blade.close()
    c.drawPath(blade, paint('#f8fafc', a))
    c.drawLine(-60, -62, 40, -78, paint('#cbd5e1', a, stroke=5))        # forceps
    c.drawLine(-60, -62, 40, -62, paint('#cbd5e1', a, stroke=5))
    c.drawCircle(-66, -62, 8, paint('#94a3b8', a, stroke=3))
    c.restore()

def _cow(c, x, y, s, a):
    if a <= 0: return
    c.save(); c.translate(x, y); c.scale(s, s)
    c.drawOval(skia.Rect.MakeXYWH(-80, -8, 160, 16), paint(BLACK, .4 * a, blur=8))
    body = '#e7dcc8'; spot = '#6b4f3a'
    for lx in (-46, -26, 30, 50): c.drawRRect(rrect(lx - 7, -52, 14, 52, 5), paint(shade(body, -.25), a))
    c.drawRRect(rrect(-66, -112, 140, 66, 30), paint(body, a))
    c.drawOval(skia.Rect.MakeXYWH(-30, -106, 40, 30), paint(spot, a)); c.drawOval(skia.Rect.MakeXYWH(26, -92, 30, 22), paint(spot, a))
    c.drawRRect(rrect(56, -136, 46, 52, 18), paint(body, a))
    c.drawRRect(rrect(70, -102, 36, 22, 10), paint('#f4b5b5', a))
    c.drawCircle(78, -118, 3.6, paint(INK, a))
    c.drawLine(62, -134, 52, -150, paint('#f1ead8', a, stroke=6)); c.drawLine(92, -134, 102, -150, paint('#f1ead8', a, stroke=6))
    c.drawLine(-66, -100, -84, -70, paint(shade(body, -.25), a, stroke=5))
    c.restore()

def _deed(c, x, y, a, ang=-5.):
    """A cream title deed centred at (x, y), 170 x 210."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang)
    c.drawRRect(rrect(-95, -100, 190, 210, 6), paint(BLACK, .45 * a, blur=14))
    c.drawRRect(rrect(-95, -105, 190, 210, 6), paint(CREAM, a))
    c.drawRRect(rrect(-88, -98, 176, 196, 4), paint('#b8a77f', .8 * a, stroke=1.4))
    ftext(c, 'TITLE DEED', 0, -66, 23, SERIF, INK, a, 'c', 700)
    for k in range(4):
        c.drawLine(-66, -38 + k * 18, 66 - 22 * (k % 2), -38 + k * 18, paint(PAPER_LINE, a, stroke=2))
    ftext(c, 'Owner:', -70, 52, 22, SERIF, INK, a, 'l', 700)
    ftext(c, 'Meera', -70, 80, 22, SERIF, INK, a, 'l', 700)
    c.drawCircle(60, 80, 16, paint('#b91c1c', a)); c.drawCircle(60, 80, 10, paint('#7f1d1d', a, stroke=2))
    c.restore()

def _goodwill(c, x, y, a, t):
    """A gold rosette seal (the goodwill of a business) centred at (x, y), radius ~110."""
    if a <= 0: return
    c.save(); c.translate(x, y)
    for sg in (-1, 1):
        rb = skia.Path(); rb.moveTo(sg * 30, 60); rb.lineTo(sg * 70, 170); rb.lineTo(sg * 46, 150); rb.lineTo(sg * 30, 178)
        rb.lineTo(sg * 4, 70); rb.close(); c.drawPath(rb, paint('#b45309', a))
    P = skia.Path()
    for k in range(48):
        r = 112 if k % 2 == 0 else 100; an = k / 48 * math.tau
        (P.moveTo if k == 0 else P.lineTo)(math.cos(an) * r, math.sin(an) * r)
    P.close()
    c.drawPath(P, paint(BLACK, .4 * a, blur=12))
    c.drawPath(P, paint(shader=rgrad(-30, -40, 160, ['#fde68a', '#f59e0b', '#b45309']), a=a))
    c.drawCircle(0, 0, 82, paint('#7c4a03', .7 * a, stroke=3))
    text(c, 'GOODWILL', 0, 10, 28, 800, '#3b2203', a, 'c', track=1.5)
    c.restore()

def _store_room(c, x, y, a, u):
    """A brick store room built against a shop wall, bottom-left (x, y), 130 x 140, rising with u."""
    if a <= 0 or u <= 0: return
    w, h = 130, 140; hh = h * eout(clamp(u))
    c.save(); c.clipRect(skia.Rect(x - 4, y - hh - 6, x + w + 6, y + 2), True)
    c.drawRect(skia.Rect.MakeXYWH(x, y - h, w, h), paint('#9a4f35', a))
    for r_ in range(10):
        yy = y - h + r_ * 14
        c.drawLine(x, yy, x + w, yy, paint('#6e3423', .8 * a, stroke=1.6, cap=False))
        for k in range(6):
            xx = x + (k * 26 + (13 if r_ % 2 else 0)) % w
            c.drawLine(xx, yy, xx, yy + 14, paint('#6e3423', .7 * a, stroke=1.4, cap=False))
    c.drawRect(skia.Rect.MakeXYWH(x - 6, y - h - 10, w + 12, 12), paint('#5b6579', a))
    c.drawRRect(rrect(x + 40, y - 78, 50, 78, 4), paint('#3f3a36', a))
    c.drawCircle(x + 80, y - 40, 3, paint(GOLD, a))
    c.restore()

def _hang_tag(c, x, y, s, a, col=GOLD):
    """A small hanging tag with string; (x, y) = the nail."""
    if a <= 0: return
    tw = text_w(s, 22, 800) + 26
    c.drawLine(x, y, x - 14, y + 26, paint(DIM, .8 * a, stroke=1.6)); c.drawLine(x, y, x + 14, y + 26, paint(DIM, .8 * a, stroke=1.6))
    c.drawCircle(x, y, 4, paint(DIM, a))
    c.drawRRect(rrect(x - tw / 2, y + 24, tw, 36, 8), paint(shade(col, -.7), .95 * a))
    c.drawRRect(rrect(x - tw / 2, y + 24, tw, 36, 8), paint(col, a, stroke=2))
    text(c, s, x, y + 50, 22, 800, col, a, 'c')

# ---------------------------------------------------------------- g1–g2: the bill, the bin, the ten slices
BILL_SC = 1.25
BW_, BH_ = 236 * BILL_SC, 150 * BILL_SC
YS_X, YS_Y, YS_W, YS_H = 110, 664, 1700, 78
YEARS = ['%d-%02d' % (2025 + k, (26 + k) % 100) for k in range(10)]
YS_G = 10; YS_BW = (YS_W - 9 * YS_G) / 10
_YC = [(YS_X + k * (YS_BW + YS_G) + YS_BW / 2, YS_Y + YS_H / 2) for k in range(10)]

def _ystrip(c, t, y, a):
    """The ten year boxes of g2; a box turns green, "deducted", when its slice lands."""
    for k in range(10):
        x = YS_X + k * (YS_BW + YS_G); done = seg(t, DRIP[k] + FLY - .05, DRIP[k] + FLY + .25)
        c.drawRRect(rrect(x, y + 6, YS_BW, YS_H, 12), paint(BLACK, .4 * a, blur=10))
        c.drawRRect(rrect(x, y, YS_BW, YS_H, 12), paint(mixc('#0d1530', shade(GREEN, -.55), done), a))
        c.drawRRect(rrect(x + .5, y + .5, YS_BW - 1, YS_H - 1, 12), paint(mixc(ACC, GREEN, done), .75 * a, stroke=1.8))
        text(c, YEARS[k], x + YS_BW / 2, y + YS_H / 2 + 9 - 13 * done, 24, 800, WHITE if done else DIM, a, 'c')
        if done > 0: text(c, 'deducted', x + YS_BW / 2, y + YS_H / 2 + 26, 22, 700, GREEN, a * done, 'c')

def _bill_pose(t):
    """(x, y, angle) of the oven bill through g1–g2."""
    if t < LOSE1: x, y, ang = 1180, 430 + 8 * math.sin(t * 2.2), -4 + 2 * math.sin(t * 1.3)
    elif t < NO2:
        u = seg(t, LOSE1, LOSE1 + 1.6, eout); x, y, ang = 1180, lerp(430, 560, u), lerp(-4, 14, u)
    else:
        u = seg(t, NO2, NO2 + 1.1); x, y, ang = lerp(1180, 960, u), lerp(560, 380, u), lerp(14, 0, u)
    return x, y, ang

def _slice_pos(k, t):
    """Centre (x, y), scale and alpha of slice k of the bill (cut, spread, then flying to year box k)."""
    bx, by, _ = _bill_pose(t)
    sw = BW_ / 10; sx0 = bx - BW_ / 2 + sw * (k + .5)
    spread = seg(t, SLICE2, SLICE2 + .6) * (k - 4.5) * 2.2
    x, y = sx0 + spread, by
    u = seg(t, DRIP[k], DRIP[k] + FLY, ease)
    if u <= 0: return x, y, 1., 1.
    tx, ty = _YC[k]
    q = 1 - u
    px = q * q * x + 2 * q * u * x + u * u * tx; py = q * q * y + 2 * q * u * (ty - 30) + u * u * ty
    return px, py, lerp(1., .62, u), 1 - seg(u, .86, 1.)

def _bill_sliced(c, t, a):
    cut = seg(t, SLOW2, SLOW2 + .7)
    if t < SLICE2 or cut < 1:
        bx, by, ang = _bill_pose(t)
        bill(c, bx, by, a, 'New oven', 400000, 'bank', None, BILL_SC, ang)
        if cut > 0:
            dp = paint(WHITE, .85 * a * (1 - seg(t, SLICE2, SLICE2 + .3)), stroke=2, cap=False)
            dp.setPathEffect(skia.DashPathEffect.Make([7, 6], 0))
            for k in range(1, 10):
                xx = bx - BW_ / 2 + BW_ * k / 10; yy0 = by - BH_ / 2; yy1 = lerp(yy0, by + BH_ / 2, cut)
                c.drawLine(xx, yy0, xx, yy1, dp)
        return
    bx, by, _ = _bill_pose(t)
    sw = BW_ / 10
    for k in range(10):
        x, y, k_, sa = _slice_pos(k, t)
        if sa <= 0: continue
        c.save(); c.translate(x, y); c.scale(k_, k_)
        c.translate(-(bx - BW_ / 2 + sw * (k + .5)), -by)
        c.clipRect(skia.Rect(bx - BW_ / 2 + sw * k + .5, by - BH_ / 2 - 6, bx - BW_ / 2 + sw * (k + 1) - .5, by + BH_ / 2 + 6), True)
        bill(c, bx, by, a * sa, 'New oven', 400000, 'bank', None, BILL_SC, 0.)
        c.restore()

def _g12(c, t):
    a = win(t, CS - .5, G3 + .1, .5, .55)
    if a <= 0: return
    # the oven: big in g1, smaller and to the left in g2, wearing as the years pass
    u = seg(t, NO2 - .2, NO2 + 1.2)
    ox, oy, os = lerp(600, 520, u), lerp(780, 572, u), lerp(.95, .6, u)
    landed = sum(1 for k in range(10) if t > DRIP[k] + FLY)
    oven(c, ox, oy, os, a, t, 1 - .065 * landed)
    wa = a * win(t, WEARS2, G3, .4, .4)
    if wa > 0: itext(c, 'wears out, year by year', ox, oy + 34, 24, DIM, wa, 'c', 600)
    # the bin (g1) and its question
    ba = a * (1 - seg(t, NO2 + .3, NO2 + 1.))
    if ba > 0:
        _bin(c, 1180, 820, ba, t, win(t, NO2 - .05, NO2 + .45, .05, .2))
        la = ba * seg(t, LOSE1 + .3, LOSE1 + .8)
        if la > 0:
            text(c, 'lost?', 1300, 700, 44, 800, RED, la, 'l', shadow=8)
    # cost link from the oven to the bill (g1)
    ca = a * seg(t, OVEN1 + .2, OVEN1 + .8) * (1 - seg(t, LOSE1, LOSE1 + .5))
    if ca > 0:
        dp = paint(GOLD, .7 * ca, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 8], -t * 30))
        c.drawLine(ox + 160 * os, oy - 230 * os, 1180 - BW_ / 2 - 14, 430, dp)
        text(c, 'its cost', 860, 440, 26, 700, GOLD, ca, 'c', shadow=6)
    xa = a * win(t, DEDUCT1 - .1, NO2, .3, .4)
    if xa > 0:
        chip(c, ox, oy - 300 * os - 34, 'capital · no direct deduction', ORANGE, xa, 24)
    # the ten-year strip
    sa = a * seg(t, EVERY2 - .5, EVERY2 + .1)
    if sa > 0:
        _ystrip(c, t, YS_Y + 20 * (1 - sa), sa)
        for k in range(10):
            f = win(t, DRIP[k] + FLY - .05, DRIP[k] + FLY + .5, .05, .45)
            if f > 0:
                x, y = _YC[k]
                c.drawRRect(rrect(x - 82, YS_Y - 4, 164, YS_H + 8, 14), paint(GREEN, .6 * f * sa, stroke=6, blur=8))
    # the bill (whole, then cut into slices that drip into the years)
    pa = a * seg(t, CS - .2, CS + .5)
    if pa > 0:
        g = win(t, FOUR1 - .1, FOUR1 + 1.2, .2, .5)
        if g > 0:
            bx, by, _ = _bill_pose(t)
            c.drawRRect(rrect(bx - BW_ / 2 - 8, by - BH_ / 2 - 8, BW_ + 16, BH_ + 16, 14), paint(GOLD, .5 * g * pa, stroke=6, blur=8))
        _bill_sliced(c, t, pa)
    # "that slice is depreciation · § 32"
    da = a * seg(t, THAT2, THAT2 + .5)
    if da > 0:
        x0 = 1150
        text(c, 'a slice a year', x0, 372, 30, 700, WHITE, da, 'l', shadow=6)
        text(c, '= depreciation', x0, 422, 42, 800, GOLD, a * seg(t, DEP2, DEP2 + .4), 'l', shadow=8)
        sec(c, x0, 470, '32', a * _pop(t, SEC2), size=24)

# ---------------------------------------------------------------- g3: the shelf of depreciable assets
SH_X0, SH_TW, SH_TH, SH_GAP = 305, 200, 160, 22
TANGIBLE = [('building', 'Buildings'), ('gear', 'Machinery'), ('factory', 'Plant'), (None, 'Furniture')]
INTANG = [('bulb', 'Know-how'), ('patent', 'Patents'), ('©', 'Copyrights'), ('™', 'Trademarks'),
          ('licence', 'Licences'), ('shop', 'Franchises')]

def _tile_icon(name, col):
    if name is None: return _i_chair(col)
    if name == 'bulb': return _i_bulb(col)
    if name == 'patent': return _i_patent(col)
    if name == 'licence': return _i_licence(col)
    if name in ('©', '™'): return _i_glyph(name, col)
    return _icn(name, col)

_TICONS = {}
def _ticon(name, col):
    k = (name, col)
    if k not in _TICONS: _TICONS[k] = _tile_icon(name, shade(col, .2))
    return _TICONS[k]

def _g3(c, t):
    a = win(t, G3 - .4, G4 + .3, .5, .6)
    if a <= 0: return
    ha = a * seg(t, ONLY3 - .1, ONLY3 + .5)
    text(c, 'Which assets qualify?', 960, 300, 38, 800, WHITE, ha, 'c', shadow=8)
    for row, (items, times, col, ttl, tt, y) in enumerate(((TANGIBLE, T3, ACC, 'TANGIBLE', TANG3, 380),
                                                           (INTANG, I3, PINK, 'INTANGIBLE', INT3, 616))):
        ra = a * seg(t, tt - .2, tt + .3)
        if ra > 0:
            chip(c, SH_X0, y - 30, ttl, col, ra, 22, 'l')
            c.drawLine(SH_X0 + text_w(ttl, 22, 700) + 44, y - 30, SH_X0 + 6 * (SH_TW + SH_GAP) - SH_GAP, y - 30,
                       paint(col, .3 * ra, stroke=1.4))
        x0 = 960 - (len(items) * (SH_TW + SH_GAP) - SH_GAP) / 2
        for k, ((ic, lab_), t0) in enumerate(zip(items, times)):
            u = _pop(t, t0 - .1)
            if u <= 0: continue
            x = x0 + k * (SH_TW + SH_GAP); yy = y + 4 + 3 * math.sin(t * 1.3 + k * .9 + row)
            _scaled(c, x + SH_TW / 2, yy + SH_TH / 2, .85 + .15 * u)
            tile(c, x, yy, SH_TW, SH_TH, _ticon(ic, col), lab_, a * clamp(u * 1.5), col, None, 24,
                 win(t, t0 - .1, t0 + 1.2, .2, .6))
            c.restore()

# ---------------------------------------------------------------- g4: land and goodwill
def _g4(c, t):
    a = win(t, G4 - .2, G5 + .1, .5, .55)
    if a <= 0: return
    ha = a * seg(t, EXC4 - .2, EXC4 + .3)
    text(c, 'Two famous exceptions', 960, 290, 36, 800, WHITE, ha, 'c', shadow=8)
    # left: the shop on its land (centred at first, slides left when goodwill arrives)
    la = a * seg(t, LAND4 - .3, LAND4 + .3)
    if la > 0:
        lw, lh, ly = 460, 118, 650
        lx = lerp(960 - lw / 2, 330, seg(t, GW4 - .8, GW4 + .1))
        g = win(t, LAND4, BLDG4 + 1.5, .3, .6)
        if g > 0: c.drawRRect(rrect(lx - 6, ly - 4, lw + 12, lh + 10, 14), paint(RED, .55 * g * la, stroke=6, blur=8))
        land(c, lx, ly, lw, lh, la, 'Land', False)
        shop(c, lx + lw / 2, ly + 6, .6, la, t, "Meera's Bakehouse", 1.)
        na = la * seg(t, NEVER4, NEVER4 + .4)
        if na > 0: itext(c, 'never wears out', lx + lw / 2, ly + lh + 44, 28, RED, na, 'c', 700)
        xa = la * _pop(t, NODEP4)
        if xa > 0:
            cross(c, lx + lw - 46, ly + 66, xa, 26)
            text(c, 'no depreciation', lx + lw + 24, ly + 76, 28, 800, RED, xa * seg(t, NODEP4 + .2, NODEP4 + .6), 'l', shadow=6)
        ua = la * seg(t, UNDER4, UNDER4 + .4)
        if ua > 0:
            text(c, 'even under', lx - 30, ly + 46, 26, 800, RED, ua, 'r', shadow=6)
            text(c, 'a building', lx - 30, ly + 80, 26, 800, RED, ua * seg(t, BLDG4 - .2, BLDG4 + .2), 'r', shadow=6)
            arrow(c, lx - 22, ly + 56, lx + 34, ly + 56, RED, 3.4, ua, 14)
        ba = la * _pop(t, BLDG4)
        if ba > 0:
            s_ = 'building: depreciable'; cw = text_w(s_, 24, 700) + 24 * 1.3
            chip(c, lx + lw / 2 - 18, 336, s_, GREEN, ba, 24, fill=.22)
            tick(c, lx + lw / 2 - 18 + cw / 2 + 26, 336, ba, 17)
    # right: goodwill
    ga = a * seg(t, GW4 - .3, GW4 + .3)
    if ga > 0:
        gx, gy = 1380, 520
        _goodwill(c, gx + 40 * (1 - ga), gy, ga, t)
        text(c, 'goodwill of a business or profession', gx, gy + 236, 26, 700, WHITE, ga, 'c', shadow=6)
        su = seg(t, DEPR4, DEPR4 + 1.1, linr)
        if su > 0: stamp(c, gx + 20, gy + 112, 'NOT DEPRECIABLE', RED, ga, su, -10, 38)
        na = ga * seg(t, DEPR4 + .6, DEPR4 + 1.1)
        if na > 0: itext(c, 'not any more', gx, gy + 274, 26, DIM, na, 'c', 600)

# ---------------------------------------------------------------- g5: plant is a wide word
FLOOR5 = 588
PL_X = [210, 448, 700, 975]
NP_X = [1270, 1490, 1710]
RB_X0, RB_W, RB_H, RB_Y = 1190, 124, 100, 684

def _g5(c, t):
    a = win(t, G5 - .3, G6 + .1, .5, .55)
    if a <= 0: return
    # the PLANT bracket: a chip, then a dashed frame that stretches wide
    pa = a * seg(t, PLANT5 - .1, PLANT5 + .4)
    if pa > 0:
        wu = seg(t, WIDE5 - .1, WIDE5 + .9, eout)
        hw = lerp(110, 500, wu); cx = 600
        dp = paint(GOLD, .9 * pa, stroke=2.6, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([14, 9], -t * 20))
        c.drawRRect(rrect(cx - hw, 318, 2 * hw, 342, 22), paint(GOLD, .05 * pa))
        c.drawRRect(rrect(cx - hw, 318, 2 * hw, 342, 22), dp)
        chip(c, cx, 318, 'PLANT  includes', GOLD, pa, 26, fill=.3)
    props_ = (lambda c_, x, a_: van(c_, x, FLOOR5, .58, a_, BLUE, "Meera's Bakehouse", t),
              lambda c_, x, a_: _books(c_, x, FLOOR5, 1.05, a_),
              lambda c_, x, a_: _microscope(c_, x, FLOOR5, 1.1, a_),
              lambda c_, x, a_: _surgical(c_, x, FLOOR5, 1.15, a_))
    names = ('vehicles', 'books', 'scientific apparatus', 'surgical equipment')
    for k, (fn, x, t0, nm) in enumerate(zip(props_, PL_X, IN5, names)):
        u = _pop(t, t0 - .1)
        if u <= 0: continue
        ia = a * clamp(u * 1.6)
        c.save(); c.translate(0, 26 * (1 - u)); fn(c, x, ia); c.restore()
        _label(c, nm, x, FLOOR5 + 42, ia, 26, WHITE)
        g = win(t, t0 - .1, t0 + 1.1, .2, .5)
        if g > 0: c.drawCircle(x, FLOOR5 - 60, 90, paint(GOLD, .12 * g * ia, blur=30))
    # outside: not plant
    na = a * seg(t, NOT5 - .2, NOT5 + .3)
    if na > 0:
        dp = paint(RED, .7 * na, stroke=2.2, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawRRect(rrect(1150, 318, 670, 342, 22), dp)
        chip(c, 1485, 318, 'NOT plant', RED, na, 26, fill=.25)
    outs = (lambda c_, x, a_: tea(c_, x, FLOOR5, .36, a_),
            lambda c_, x, a_: _cow(c_, x, FLOOR5, .95, a_),
            lambda c_, x, a_: building(c_, x, FLOOR5, .4, a_, 2))
    for k, (fn, x, t0, nm) in enumerate(zip(outs, NP_X, OUT5, ('tea bushes', 'livestock', 'buildings'))):
        u = _pop(t, t0 - .1)
        if u <= 0: continue
        ia = a * clamp(u * 1.6)
        c.save(); c.translate(0, 26 * (1 - u)); fn(c, x, ia); c.restore()
        _label(c, nm, x, FLOOR5 + 42, ia, 26, WHITE)
        cross(c, x + 76, FLOOR5 - 170, ia * seg(t, t0 + .1, t0 + .5, back), 18)
    # roads, bridges, wells -> buildings
    icons_ = (_icn('road', ACC), _i_bridge(shade(ACC, .2)), _i_well(shade(ACC, .2)))
    for k, (ic, nm, t0) in enumerate(zip(icons_, ('roads', 'bridges', 'wells'), RB5)):
        u = _pop(t, t0 - .1)
        if u <= 0: continue
        x = RB_X0 + k * (RB_W + 16)
        _scaled(c, x + RB_W / 2, RB_Y + RB_H / 2, .8 + .2 * u)
        tile(c, x, RB_Y, RB_W, RB_H, ic, nm, a * clamp(u * 1.5), ACC, None, 22)
        c.restore()
    ca = a * seg(t, COUNT5 - .1, COUNT5 + .5)
    if ca > 0:
        x1 = RB_X0 + 3 * (RB_W + 16) - 6
        P = [(x1, RB_Y + RB_H / 2), (NP_X[2], RB_Y + RB_H / 2), (NP_X[2], FLOOR5 + 56)]
        c.drawLine(P[0][0], P[0][1], P[1][0], P[1][1], paint(ACC, ca, stroke=3))
        arrow(c, P[1][0], P[1][1], P[2][0], P[2][1] + 4, ACC, 3, ca, 14)
        text(c, 'count as buildings', RB_X0 + (3 * RB_W + 32) / 2, RB_Y + RB_H + 34, 26, 800, ACC, ca, 'c', shadow=6)
        g = win(t, COUNT5, G6, .3, .5)
        c.drawCircle(NP_X[2], FLOOR5 - 60, 80, paint(ACC, .14 * g * ca, blur=26))

# ---------------------------------------------------------------- g6: three conditions
P6_X, P6_Y, P6_W, P6_H, P6_G = 100, 300, 380, 440, 40
def _g6(c, t):
    a = win(t, G6 - .3, G7 + .1, .5, .55)
    if a <= 0: return
    titles = ('Own it', 'Use it', 'Eligible asset')
    subs = ('wholly or partly', 'for business, in the year', 'one of those assets')
    for k in range(3):
        t0 = THREE6 + .15 * k
        u = seg(t, t0, t0 + .5, eout)
        if u <= 0: continue
        pa = a * u; x = P6_X + k * (P6_W + P6_G); y = P6_Y + 24 * (1 - u)
        ok = seg(t, C6[k], C6[k] + .4)
        lit = win(t, C6[k] - .1, (C6[k + 1] if k < 2 else ASSETS6 + 1.) - .1, .3, .4)
        card(c, x, y, P6_W, P6_H, pa)
        c.drawRRect(rrect(x, y, P6_W, P6_H, 22), paint(mixc(ACC, GREEN, ok), (.25 + .55 * max(lit, ok * .6)) * pa, stroke=2.4))
        c.drawCircle(x + 46, y + 48, 22, paint(GOLD, pa)); text(c, str(k + 1), x + 46, y + 57, 26, 800, '#1a1305', pa, 'c')
        text(c, titles[k], x + 82, y + 59, 30, 800, WHITE, pa)
        cx, cy = x + P6_W / 2, y + 236
        if k == 0:
            _deed(c, cx - 50, cy, pa)
            pu = seg(t, PART6 - .2, PART6 + .3)
            if pu > 0:
                px_, py_ = cx + 124, cy + 40
                c.drawCircle(px_, py_, 30, paint(GREEN, .18 * pa * pu))
                c.drawCircle(px_, py_, 30, paint(GREEN, pa * pu, stroke=2.4))
                pp = skia.Path(); pp.moveTo(px_, py_); pp.arcTo(skia.Rect.MakeXYWH(px_ - 30, py_ - 30, 60, 60), -90, 180 * pu, False); pp.close()
                c.drawPath(pp, paint(GREEN, .8 * pa * pu))
                text(c, 'a share', px_, py_ + 58, 22, 700, GREEN, pa * pu, 'c')
        elif k == 1:
            oven(c, cx, cy + 40, .5, pa, t, .4 + .6 * ok)
            bx0, bx1, by = x + 50, x + P6_W - 50, cy + 66
            c.drawRRect(rrect(bx0, by, bx1 - bx0, 18, 9), paint('#0d1530', pa))
            c.drawRRect(rrect(bx0, by, bx1 - bx0, 18, 9), paint(ACC, .5 * pa, stroke=1.4))
            yu = seg(t, YEAR6 - .2, YEAR6 + 1.2)
            if yu > 0:
                c.drawRRect(rrect(bx0 + 2, by + 2, (bx1 - bx0 - 4) * yu, 14, 7), paint(GREEN, .75 * pa))
            text(c, 'P.Y. 2025-26', (bx0 + bx1) / 2, by + 46, 22, 700, ACC, pa, 'c')
        else:
            for j, (ic, col) in enumerate(((None, ACC), ('gear', ACC), ('building', ACC), ('bulb', PINK))):
                tx_, ty_ = cx - 110 + (j % 2) * 120, cy - 110 + (j // 2) * 116
                tile(c, tx_, ty_, 100, 96, _ticon(ic, col), None, pa, col, None, 22,
                     win(t, C6[2] - .1, C6[2] + 1.3, .2, .5))
        text(c, subs[k], x + P6_W / 2, y + P6_H - 34, 26, 700, DIM if ok < 1 else GREEN, pa, 'c')
        if ok > 0: tick(c, x + P6_W - 44, y + 48, pa * seg(t, C6[k], C6[k] + .4, back), 20)
    fa = a * seg(t, ASSETS6 + .2, ASSETS6 + .7)
    if fa > 0:
        s_ = 'own it  +  use it  +  eligible asset  =  depreciation'
        tw = text_w(s_, 30, 800) + 60
        c.drawRRect(rrect(710 - tw / 2, 770, tw, 54, 27), paint(GREEN, .16 * fa))
        c.drawRRect(rrect(710 - tw / 2, 770, tw, 54, 27), paint(GREEN, .9 * fa, stroke=2))
        text(c, s_, 710, 807, 30, 800, WHITE, fa, 'c')

# ---------------------------------------------------------------- g7: standby use, the tenant's store room
def _g7(c, t):
    a = win(t, G7 - .3, G8 + .1, .5, .55)
    if a <= 0: return
    ha = a * seg(t, STBY7 - .2, STBY7 + .3)
    if ha > 0:
        text(c, 'standby use counts as use', 530, 320, 34, 800, WHITE, ha, 'c', shadow=8)
    # generator
    ga = a * seg(t, GEN7 - .2, GEN7 + .3)
    if ga > 0:
        gx, gy = 330, 640
        lit = seg(t, INUSE7, INUSE7 + .5)
        if lit > 0: c.drawRRect(rrect(gx - 140, gy - 200, 280, 230, 24), paint(GREEN, .5 * lit * ga, stroke=5, blur=8))
        generator(c, gx, gy, .82, ga, t, 0.)
        na = ga * seg(t, NEVER7 - .1, NEVER7 + .4)
        if na > 0:
            chip(c, gx, gy + 44, 'hours run: 0000', DIM, na, 22)
            itext(c, 'never ran', gx, gy - 196, 26, DIM, na, 'c', 600)
        if lit > 0: chip(c, gx, gy + 106, 'in use', GREEN, ga * seg(t, INUSE7, INUSE7 + .4, back), 26, fill=.25)
    # extinguisher on a wall plate
    fa = a * seg(t, FIRE7 - .2, FIRE7 + .3)
    if fa > 0:
        wx, wy = 600, 420
        c.drawRRect(rrect(wx, wy, 260, 240, 16), paint('#1b2440', .9 * fa))
        for r_ in range(1, 8):
            c.drawLine(wx + 6, wy + r_ * 30, wx + 254, wy + r_ * 30, paint(WHITE, .05 * fa, stroke=1.4))
        c.drawRRect(rrect(wx, wy, 260, 240, 16), paint(WHITE, .14 * fa, stroke=1.4))
        lit = seg(t, INUSE7 + .2, INUSE7 + .7)
        if lit > 0: c.drawRRect(rrect(wx - 6, wy - 6, 272, 252, 20), paint(GREEN, .5 * lit * fa, stroke=5, blur=8))
        c.drawRRect(rrect(wx + 108, wy + 52, 44, 14, 4), paint('#64748b', fa))
        extinguisher(c, wx + 130, wy + 228, .95, fa)
        la = fa * seg(t, WALL7 - .1, WALL7 + .3)
        if la > 0: itext(c, 'on the wall', wx + 130, wy - 18, 26, DIM, la, 'c', 600)
        if lit > 0: chip(c, wx + 130, 726, 'in use', GREEN, fa * seg(t, INUSE7 + .2, INUSE7 + .6, back), 26, fill=.25)
    # the tenant's store room
    ta = a * seg(t, TEN7 - .3, TEN7 + .3)
    if ta > 0:
        sx, sy = 1300, 664
        shop(c, sx, sy, .5, ta, t, "Meera's Bakehouse", 1.)
        _hang_tag(c, sx - 170, sy - 176, 'RENTED', ta * seg(t, RENTED7 - .2, RENTED7 + .3), ORANGE)
        _store_room(c, sx + 144, sy - 4, ta, seg(t, BUILDS7, STORE7 + .6))
        sa = ta * seg(t, STORE7 + .2, STORE7 + .6)
        if sa > 0: text(c, 'store room', sx + 209, sy - 158, 26, 700, WHITE, sa, 'c', shadow=6)
        person(c, 1720, sy, .62, ta, 'meera', t, 0., -.6, .4)
        text(c, 'tenant', 1720, sy + 36, 26, 700, DIM, ta, 'c')
        da = ta * _pop(t, DEP7)
        if da > 0:
            tick(c, sx + 300, sy - 70, da, 20)
            chip(c, sx + 160, sy + 50, 'depreciation on the store room', GREEN, da, 24, fill=.22)
        oa = ta * seg(t, OWNED7 - .3, OWNED7 + .2)
        if oa > 0:
            text(c, 'as if she owned it', sx + 160, sy + 120, 30, 800, GOLD, oa, 'c', shadow=6)

# ---------------------------------------------------------------- g8: depreciation is compulsory
SW8_X, SW8_Y, SW8_W, SW8_H = 560, 290, 780, 160
B8_X, B8_Y, B8_W, B8_H, B8_G = 560, 600, 250, 116, 15
YRS8 = ('2025-26', '2026-27', '2027-28')
def _b8(k): return B8_X + k * (B8_W + B8_G) + B8_W / 2

def _g8(c, t):
    a = win(t, G8 - .3, G9 + .2, .5, .5)
    if a <= 0: return
    sad = seg(t, CANT8, CANT8 + .4)
    person(c, 330, 760, .95, a, 'meera', t, win(t, G8, CANT8, .2, .2) * .6, .5, .3 - .9 * sad)
    # the switch panel
    card(c, SW8_X, SW8_Y, SW8_W, SW8_H, a)
    text(c, 'Claim depreciation', SW8_X + 40, SW8_Y + 68, 32, 800, WHITE, a)
    text(c, 'P.Y. 2025-26', SW8_X + 40, SW8_Y + 112, 26, 700, ACC, a)
    off = seg(t, SKIP8, SKIP8 + .35) * (1 - seg(t, SNAP8, SNAP8 + .18, eout))
    lock = seg(t, SNAP8 + .3, SNAP8 + .6, back)
    _toggle(c, SW8_X + SW8_W - 190, SW8_Y + 80, a, 1 - off, lock)
    fl = win(t, SNAP8 - .05, SNAP8 + .6, .05, .4)
    if fl > 0: c.drawRRect(rrect(SW8_X - 4, SW8_Y - 4, SW8_W + 8, SW8_H + 8, 24), paint(RED, .8 * fl * a, stroke=6, blur=6))
    # the year boxes
    land_ = SNAP8 + 1.0
    for k, lab_ in enumerate(YRS8):
        bx = B8_X + k * (B8_W + B8_G)
        hl = win(t, land_, G9, .3, .6) if k == 0 else 0.
        c.drawRRect(rrect(bx, B8_Y + 6, B8_W, B8_H, 14), paint(BLACK, .4 * a, blur=10))
        c.drawRRect(rrect(bx, B8_Y, B8_W, B8_H, 14), paint('#0d1530', a))
        c.drawRRect(rrect(bx, B8_Y, B8_W, B8_H, 14), paint(mixc(ACC, GOLD, hl), (.7 + .3 * hl) * a, stroke=2))
        if hl > 0: c.drawRRect(rrect(bx - 3, B8_Y - 3, B8_W + 6, B8_H + 6, 16), paint(GOLD, .5 * hl * a, stroke=6, blur=6))
        text(c, lab_, bx + B8_W / 2, B8_Y + 40, 26, 800, WHITE if k == 0 else DIM, a, 'c')
    # this year's slice: hovers over 2025-26, drifts towards a later year, is sent back and lands
    sa = a * seg(t, G8 + .2, G8 + .7)
    if sa > 0:
        hover = seg(t, SAVE8 - .2, LATER8 + .6) * (1 - seg(t, SNAP8, SNAP8 + .5, eout))
        drop = seg(t, SNAP8 + .45, land_, ein)
        sx = lerp(_b8(0), _b8(1), hover)
        sy = lerp(B8_Y - 52, B8_Y + 80, drop) - 26 * math.sin(math.pi * hover) + 4 * math.sin(t * 2.4) * (1 - drop)
        c.drawRRect(rrect(sx - 100, sy - 20 + 5, 200, 40, 12), paint(BLACK, .4 * sa, blur=8))
        c.drawRRect(rrect(sx - 100, sy - 20, 200, 40, 12), paint(GOLD, .95 * sa))
        text(c, "this year's slice", sx, sy + 8, 22, 800, '#1a1305', sa, 'c')
        la = sa * win(t, SAVE8, SNAP8 + .2, .3, .2)
        if la > 0:
            dp = paint(DIM, .8 * la, stroke=2.4, cap=False); dp.setPathEffect(skia.DashPathEffect.Make([10, 8], -t * 30))
            y_ = B8_Y - 16
            c.drawLine(_b8(0) + 40, y_, _b8(1) - 30, y_, dp)
            arrow(c, _b8(1) - 50, y_, _b8(1) - 26, y_, DIM, 2.4, la, 12)
            itext(c, 'save it for later?', _b8(1), B8_Y + B8_H + 42, 26, DIM, la, 'c', 600)
        da = sa * seg(t, land_, land_ + .3)
        if da > 0: c.drawCircle(_b8(0), B8_Y + 80, 90, paint(GOLD, .16 * da * win(t, land_, land_ + 1.2, .1, .8), blur=24))
    # the law's side, right of the panel
    rx = 1400
    ca = a * seg(t, CANT8, CANT8 + .3)
    if ca > 0: text(c, "She can't.", rx, SW8_Y + 62, 36, 800, RED, ca, 'l', shadow=6)
    ea = a * _pop(t, EXPL8)
    if ea > 0: sec(c, rx, SW8_Y + 116, 'Explanation 5 · sec 32(1)', ea, size=26, mark='')
    su = seg(t, COMP8, COMP8 + 1.1, linr)
    if su > 0: stamp(c, rx + 175, SW8_Y + 222, 'COMPULSORY', GOLD, a, su, -8, 36)
    for k, (lab_, t0) in enumerate((('claimed', DED8), ('not claimed', NOT8 - .15))):
        u = seg(t, t0, t0 + .4, eout)
        if u <= 0: continue
        y = 664 + 76 * k; ra = a * u; xr = rx + 150
        text(c, lab_, xr, y, 28, 700, DIM, ra, 'r')
        arrow(c, xr + 14, y - 9, xr + 60, y - 9, DIM, 2.6, ra, 12)
        text(c, 'deducted', xr + 72, y, 28, 800, GREEN, ra, 'l')
        tick(c, xr + 72 + text_w('deducted', 28, 800) + 26, y - 9, ra * seg(t, t0 + .1, t0 + .5, back), 15)

# ---------------------------------------------------------------- g9: the leased mixer (below the check card)
def _g9(c, t):
    a = win(t, G9 - .1, CE + 1., .6, .3)
    if a <= 0: return
    y = 900
    ma = a * seg(t, LEASE9 - .1, LEASE9 + .4)
    mixer(c, 960, y - 6, .36, ma, t, 0.)
    if ma > 0: chip(c, 960, 744, 'LEASED', ORANGE, ma * seg(t, LEASE9 + .2, LEASE9 + .6, back), 22, fill=.25)
    pa = a * seg(t, G9 - .1, G9 + .5)
    person(c, 640, y, .5, pa, 'meera', t, 0., .5, 0.)
    text(c, 'Meera · uses it', 640 - 70, y - 30, 24, 700, WHITE, pa, 'r', shadow=6)
    da = a * seg(t, DEALER9 - .2, DEALER9 + .3)
    person(c, 1280, y, .5, da, 'supplier', t, 0., -.5, 0.)
    text(c, 'Dealer · owns it', 1280 + 70, y - 30, 24, 700, WHITE, da, 'l', shadow=6)
    qa = a * win(t, DEALER9 + .3, ADEAL9, .3, .3)
    if qa > 0:
        pu = 1 + .06 * math.sin(t * 6)
        text(c, '?', 1110, 836, 56 * pu, 800, GOLD, qa, 'c', shadow=8)
    ok = a * _pop(t, ADEAL9)
    if ok > 0:
        tick(c, 1280, 760, ok, 20)
        chip(c, 1500, 790, 'depreciation', GREEN, ok, 24, fill=.22)
    ra = a * seg(t, ADED9 - .1, ADED9 + .4)
    if ra > 0:
        chip(c, 400, 790, 'lease rent → deduct', GREEN, ra * seg(t, ARENT9 - .3, ARENT9 + .2, back), 24, fill=.22)
        for k in range(3):
            q = (t * .7 + k / 3) % 1
            coin(c, lerp(720, 1200, q), 872 - 26 * math.sin(math.pi * q), 13, ra * math.sin(math.pi * q), GOLD, '₹', t * 3 + k)

def ch_g(c, t):
    if t < CS - .5 or t > CE + .6: return
    _g12(c, t)
    _g3(c, t)
    _g4(c, t)
    _g5(c, t)
    _g6(c, t)
    _g7(c, t)
    _g8(c, t)
    _g9(c, t)

if __name__ == '__main__':
    for nm in ('OVEN1 DEDUCT1 LOSE1 FOUR1 NO2 SLOW2 SLICE2 EVERY2 WEARS2 THAT2 DEP2 SEC2 ONLY3 QUAL3 TANG3 INT3 EXC4 LAND4 '
               'NEVER4 NODEP4 UNDER4 BLDG4 GW4 DEPR4 PLANT5 WIDE5 NOT5 COUNT5 THREE6 PART6 YEAR6 ASSETS6 STBY7 GEN7 '
               'NEVER7 FIRE7 WALL7 INUSE7 TEN7 BUILDS7 STORE7 RENTED7 DEP7 OWNED7 SKIP8 SAVE8 LATER8 CANT8 EXPL8 COMP8 '
               'DED8 CLAIM8 NOT8 LEASE9 DEALER9 ADEAL9 AOWNS9 ADED9 ARENT9').split():
        print(nm, round(globals()[nm], 2))
    print('T3', [round(x, 2) for x in T3], 'I3', [round(x, 2) for x in I3])
    print('IN5', [round(x, 2) for x in IN5], 'OUT5', [round(x, 2) for x in OUT5], 'RB5', [round(x, 2) for x in RB5])
    print('C6', [round(x, 2) for x in C6], 'events', len(EVENTS))
