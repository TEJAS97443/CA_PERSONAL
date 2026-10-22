"""Chapter O — Spread over five years (sections 35D and 35DDA).
o1 hook: Meera at the left; a dark, dashed "second outlet" waits on the right; three papers fly in as named — a project
   report, a market survey, a lawyer's agreement — each paid with a coin; "Capital?" / "Revenue?" boxes pulse
o2 "neither, quite": both boxes are crossed; the papers feed the outlet (it half-lights: "builds the new unit") but no
   asset appears ("not an asset you can touch"); § 35D; the papers stack into one pile that splits into five slices
   dropping into a five-year strip
o3 name: the strip reads 1/5 in each year, lit year by year; on "the year the new unit begins" the outlet lights up
   and Year 1 is flagged "unit begins"
o4 the fixed list: five tiles (feasibility report, project report, market survey, engineering services, legal charges
   for business agreements) and, for a company only, memorandum & articles, registration fees, public-issue costs
o5 example: the sheet — spent ₹4,00,000 · cap 5% of the cost of the project · cost ₹60,00,000 · allowed ₹3,00,000 ·
   ₹60,000 a year; beside it the ₹4,00,000 bar cut at the ₹3,00,000 cap line (excess ignored); five ₹60,000 coins drop
   into Year 1 … Year 5
o6 an Indian company compares 5% of the cost of the project with 5% of capital employed and takes the higher bar;
   a non-corporate (Meera) has her books stamped AUDITED to claim it
o7 name: § 35DDA — three staff take voluntary retirement; a ₹10,00,000 cheque splits into five ₹2,00,000 years
o8 check: below the card, "books: ₹4,00,000 written off" becomes "+ ₹4,00,000 add back" and "− ₹60,000 u/s 35D"
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('o')
O1, O2, O3, O4, O5, O6, O7, O8 = (T('o%d' % k) for k in range(1, 9))
O8A = TA('o8')

# ---------------------------------------------------------------- word times
SECOND1, OUTLET1, PAYS1, PROJ1, MARKET1, LAWYER1, CAP1, REV1 = (
    W('o1', 'second'), W('o1', 'outlet'), W('o1', 'pays'), W('o1', 'project'), W('o1', 'market'), W('o1', 'lawyer'),
    W('o1', 'capital'), W('o1', 'revenue'))
NEITHER2, BUILDS2, UNIT2, ASSET2, TOUCH2, SEC2, SPREADS2, FIVE2 = (
    W('o2', 'neither'), W('o2', 'builds'), W('o2', 'unit'), W('o2', 'asset'), W('o2', 'touch'), W('o2', 'section'),
    W('o2', 'spreads'), W('o2', 'five', occ=1))
PRELIM3, ONE3, FIFTH3, FIVE3, YEARS3, STARTING3, NEW3, BEGINS3 = (
    W('o3', 'preliminary'), W('o3', 'one'), W('o3', 'fifth'), W('o3', 'five'), W('o3', 'years'), W('o3', 'starting'),
    W('o3', 'new'), W('o3', 'begins'))
LIST4, FIXED4, FEAS4, PROJ4, MARKET4, ENG4, LEGAL4, COMPANY4, MEMO4, REG4, PUBLIC4 = (
    W('o4', 'list'), W('o4', 'fixed'), W('o4', 'feasibility'), W('o4', 'project'), W('o4', 'market'),
    W('o4', 'engineering'), W('o4', 'legal'), W('o4', 'company'), W('o4', 'memorandum'), W('o4', 'registration'),
    W('o4', 'public'))
FOUR5, CAP5, COST5, SIXTY5, ONLY5, THREE5, COUNTS5, DEDUCTS5, SIXTY5B, FIVE5B, YEARS5 = (
    W('o5', 'four'), W('o5', 'cap'), W('o5', 'cost'), W('o5', 'sixty'), W('o5', 'only'), W('o5', 'three'),
    W('o5', 'counts'), W('o5', 'deducts'), W('o5', 'sixty', occ=1), W('o5', 'five', occ=1), W('o5', 'years'))
IND6, FIVE6, CAPEMP6, HIGHER6, NON6, AUDITED6, CLAIM6 = (
    W('o6', 'indian'), W('o6', 'five'), W('o6', 'capital'), W('o6', 'higher'), W('o6', 'non'), W('o6', 'audited'),
    W('o6', 'claim'))
VOL7, SAME7, FIVE7, SEC7, PAY7, TEN7, STAFF7, RETIRE7, DEDUCT7, TWO7, YEAR7B = (
    W('o7', 'voluntary'), W('o7', 'same'), W('o7', 'five'), W('o7', 'section'), W('o7', 'pay'), W('o7', 'ten'),
    W('o7', 'staff'), W('o7', 'retire'), W('o7', 'deduct'), W('o7', 'two'), W('o7', 'year', occ=1))
BOOKS8, WRITE8, FOUR8 = W('o8', 'books'), W('o8', 'write'), W('o8', 'four')
ADD8, FOURA8, DEDUCT8, SIXTY8 = W('o8a', 'add'), W('o8a', 'four'), W('o8a', 'deduct'), W('o8a', 'sixty')

for tt, k in ((SECOND1, 'whoosh'), (PROJ1, 'flip'), (MARKET1, 'flip'), (LAWYER1, 'flip'), (CAP1, 'pop'),
              (NEITHER2, 'blip'), (SEC2, 'blip'), (SPREADS2, 'snip'), (FIVE2, 'tick'),
              (ONE3, 'tick'), (BEGINS3, 'chime_lo'),
              (FIXED4, 'key'), (FEAS4, 'pop'), (LEGAL4, 'pop'), (COMPANY4, 'pop'), (PUBLIC4, 'pop'),
              (FOUR5, 'tick'), (THREE5, 'snip'), (YEARS5, 'chime'),
              (HIGHER6, 'ok'), (AUDITED6 + .12, 'thunk'),
              (TEN7, 'pop'), (TWO7, 'chime_lo'),
              (ADD8, 'blip'), (DEDUCT8, 'ok')):
    _ev(tt, k)

# ---------------------------------------------------------------- helpers
def _box(c, x, y, w, h, col, a, fill=.8, glow=0., r=18, stroke=.9):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 7, w, h, r), paint(BLACK, .35 * a))
    c.drawRRect(rrect(x, y, w, h, r), paint(shade(col, -fill), .94 * a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .45 * a * glow, stroke=7, blur=8))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, stroke * a, stroke=2.2))

def _head(c, s, x, y, a, size=40, col=WHITE, sub=None, sub_col=DIM, sub_a=1.):
    if a <= 0: return
    text(c, s, x, y, size, 800, col, a, shadow=6)
    if sub: text(c, sub, x, y + 42, 27, 600, sub_col, a * sub_a)

def _strike(c, x0, x1, y, u, a, col=RED):
    if u <= 0 or a <= 0: return
    c.drawLine(x0, y, lerp(x0, x1, clamp(u)), y - 2, paint(col, .95 * a, stroke=3.6))

DW, DH = 200, 250
_DOCS = {}
def _doc_pic(kind):
    """A cream paper (DW x DH, centred): project report (bar chart), market survey (pie + ticks), agreement
    (text, signature, seal). Recorded once."""
    if kind in _DOCS: return _DOCS[kind]
    rec = skia.PictureRecorder(); cv = rec.beginRecording(skia.Rect.MakeXYWH(-DW / 2 - 12, -DH / 2 - 12, DW + 30, DH + 34))
    x0, y0 = -DW / 2, -DH / 2
    cv.drawRRect(rrect(x0 + 6, y0 + 10, DW, DH, 8), paint(BLACK, .35))
    cv.drawRRect(rrect(x0, y0, DW, DH, 8), paint(shader=lgrad((0, y0), (0, y0 + DH), ['#fdfbf5', '#efe7d3'])))
    cv.drawRRect(rrect(x0, y0, DW, DH, 8), paint('#d8cdb2', stroke=1.2))
    title = {'report': 'Project report', 'survey': 'Market survey', 'legal': 'Agreement'}[kind]
    text(cv, title, 0, y0 + 40, 22, 800, INK, 1, 'c')
    cv.drawLine(x0 + 20, y0 + 54, x0 + DW - 20, y0 + 54, paint('#b8ad94', stroke=1.4, cap=False))
    lp = paint('#c9bea5', stroke=3, cap=True)
    if kind == 'report':
        for i, h in enumerate((40, 62, 52, 86, 104)):
            cv.drawRect(skia.Rect.MakeXYWH(x0 + 32 + i * 28, y0 + 182 - h, 18, h), paint(['#60a5fa', '#3b82f6'][i % 2]))
        cv.drawLine(x0 + 24, y0 + 183, x0 + DW - 24, y0 + 183, paint(INK, .7, stroke=1.6))
        for k in range(2): cv.drawLine(x0 + 24, y0 + 204 + 16 * k, x0 + DW - 40 - 30 * k, y0 + 204 + 16 * k, lp)
    elif kind == 'survey':
        cx, cy, r = x0 + 64, y0 + 120, 40
        for a0, sw, col in ((-90, 140, '#f472b6'), (50, 110, '#fbbf24'), (160, 110, '#34d399')):
            p = skia.Path(); p.moveTo(cx, cy); p.arcTo(skia.Rect(cx - r, cy - r, cx + r, cy + r), a0, sw, False); p.close()
            cv.drawPath(p, paint(col))
        for k in range(3):
            yy = y0 + 92 + 26 * k
            cv.drawRRect(rrect(x0 + 120, yy - 9, 16, 16, 3), paint(INK, .6, stroke=1.6))
            cv.drawPath(poly(np.array([(x0 + 123, yy - 1), (x0 + 128, yy + 4), (x0 + 135, yy - 6)]), False), paint('#15803d', stroke=2.4))
            cv.drawLine(x0 + 144, yy, x0 + 178, yy, lp)
        for k in range(2): cv.drawLine(x0 + 24, y0 + 196 + 18 * k, x0 + DW - 30 - 40 * k, y0 + 196 + 18 * k, lp)
    else:
        for k in range(6): cv.drawLine(x0 + 24, y0 + 80 + 18 * k, x0 + DW - 24 - (k * 23) % 50, y0 + 80 + 18 * k, lp)
        sp = skia.Path(); sp.moveTo(x0 + 28, y0 + 214)
        for k in range(6): sp.quadTo(x0 + 40 + k * 14, y0 + 196 + (k % 2) * 30, x0 + 48 + k * 14, y0 + 210)
        cv.drawPath(sp, paint('#1d4ed8', stroke=2.2))
        cv.drawCircle(x0 + DW - 44, y0 + 210, 22, paint('#b91c1c', .85)); cv.drawCircle(x0 + DW - 44, y0 + 210, 15, paint('#7f1d1d', .8, stroke=2))
    _DOCS[kind] = rec.finishRecordingAsPicture(); return _DOCS[kind]

def _doc(c, x, y, s, a, kind, ang=0.):
    if a <= 0: return
    c.save(); c.translate(x, y)
    if ang: c.rotate(ang)
    c.scale(s, s)
    if a < .999:
        p = skia.Paint(); p.setAlphaf(clamp(a)); c.drawPicture(_doc_pic(kind), None, p)
    else: c.drawPicture(_doc_pic(kind))
    c.restore()

# ---------------------------------------------------------------- o1–o3: the papers, the outlet, the five years
MEERA = (240, 806)
OUT_A = (1560, 800, .62); OUT_B = (1650, 650, .5)
DOCS = [('report', PROJ1, 600), ('survey', MARKET1, 860), ('legal', LAWYER1, 1120)]
DOC_Y = 470
PILE = (860, 455)
YS_X, YS_Y, YS_W, YS_H = 160, 664, 1240, 104

def _outlet_pos(t):
    u = seg(t, O2 - .2, O2 + .8)
    return lerp(OUT_A[0], OUT_B[0], u), lerp(OUT_A[1], OUT_B[1], u), lerp(OUT_A[2], OUT_B[2], u)

def _stage1(c, t):
    a = 1 - seg(t, O4 - .6, O4 - .1)
    if a <= 0: return
    # Meera (o1 only)
    ma = seg(t, CS - .2, CS + .6) * (1 - seg(t, O2 - .2, O2 + .4))
    person(c, MEERA[0] - 80 * seg(t, O2 - .2, O2 + .4), MEERA[1], .95, a * ma, 'meera', t, look=.6, mood=.2)
    # the second outlet: a dashed ghost that lights up as the unit is built / begins
    oa = a * seg(t, SECOND1 - .4, SECOND1 + .2)
    if oa > 0:
        ox, oy, os_ = _outlet_pos(t)
        built = .35 + .3 * seg(t, BUILDS2 - .2, UNIT2 + .6) + .35 * seg(t, STARTING3, BEGINS3 + .2)
        lit = seg(t, STARTING3, BEGINS3 + .3)
        shop(c, ox, oy, os_, oa * built, t, 'Outlet 2', lit)
        p = paint(GOLD if lit > .5 else ACC, .8 * oa * (1 - lit), stroke=2.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], -t * 20))
        c.drawRRect(rrect(ox - 300 * os_, oy - 480 * os_, 600 * os_, 492 * os_, 16), p)
        chip(c, ox, oy - 480 * os_ - 30, 'second outlet' if lit < .5 else 'new unit begins', GOLD if lit > .5 else ACC,
             oa * seg(t, OUTLET1 - .2, OUTLET1 + .3), 26)
    # the three papers
    sp = seg(t, SPREADS2 - .3, SPREADS2 + .4)                                 # stack into a pile
    split = seg(t, SPREADS2 + .3, FIVE2 + .3)                                  # the pile splits into five slices
    for k, (kind, tt, dx) in enumerate(DOCS):
        da = a * seg(t, tt - .35, tt) * (1 - seg(split, 0, .25))
        if da <= 0: continue
        u = seg(t, tt - .35, tt + .35, eout)
        x = lerp(MEERA[0] + 70, dx, u); y = lerp(640, DOC_Y, u) - 90 * math.sin(math.pi * u)
        x, y = lerp(x, PILE[0] + 10 * k, sp), lerp(y, PILE[1] - 12 * k, sp)
        ang = lerp(-4 + 4 * k, -6 + 6 * k, sp)
        feed = win(t, BUILDS2 - .2, UNIT2 + .9, .3, .5)
        _doc(c, x, y, lerp(1., .9, sp), da, kind, ang)
        ca = da * seg(t, tt + .2, tt + .5) * (1 - sp)
        if ca > 0: coin(c, x + 84, y - 108, 16, ca, GOLD, '₹', shadow=False)
        if feed > 0 and k == 1:
            ox, oy, os_ = _outlet_pos(t)
            text(c, 'builds the new unit', 1330, 430, 26, 800, GOLD, a * feed, 'c', shadow=6)
            for j, (_, _, dxx) in enumerate(DOCS):
                flowdots(c, [(dxx + 100, DOC_Y), (ox - 300 * os_ + 10, oy - 200 * os_)], ((t - BUILDS2) * .8 + j * .3) % 1, a * feed, GOLD, 5, 5.)
    # capital? revenue? (o1) — then neither (o2)
    for k, (lbl, tt) in enumerate((('Capital?', CAP1), ('Revenue?', REV1))):
        ba = a * seg(t, tt - .3, tt + .1, back) * (1 - seg(t, BUILDS2 - .4, BUILDS2))
        if ba <= 0: continue
        bx = 560 + k * 400
        nx = seg(t, NEITHER2 - .1 + .15 * k, NEITHER2 + .2 + .15 * k)
        _box(c, bx, 700, 320, 90, mixc(GOLD, DIM, nx), ba, .82)
        text(c, lbl, bx + 160, 758, 34, 800, mixc(WHITE, DIM, nx), ba, 'c')
        if nx > 0: cross(c, bx + 300, 712, ba * nx, 18)
    na = a * seg(t, NEITHER2 - .1, NEITHER2 + .3) * (1 - seg(t, BUILDS2 - .4, BUILDS2))
    if na > 0: text(c, 'neither, quite', 960, 840, 30, 800, GOLD, na, 'c', shadow=6)
    # not an asset you can touch
    ta = a * seg(t, ASSET2 - .2, ASSET2 + .3) * (1 - seg(t, SPREADS2 - .4, SPREADS2))
    if ta > 0:
        p = paint(DIM, .7 * ta, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawRRect(rrect(470, 700, 760, 96, 18), p)
        text(c, 'no asset you can touch', 850, 760, 32, 800, WHITE, ta, 'c')
        cross(c, 1190, 748, ta * seg(t, TOUCH2 - .1, TOUCH2 + .3), 20)
    # § 35D
    sa = a * seg(t, SEC2 - .2, SEC2 + .3, back) * (1 - seg(t, O3 - .3, O3 + .2))
    if sa > 0: sec(c, 300, 470, '35D', sa, size=48, align='c')
    # the five slices -> the five-year strip
    stra = a * seg(t, SPREADS2 + .1, SPREADS2 + .6)
    if stra > 0:
        lit = seg(t, FIVE3 - .2, YEARS3 + .9, linr) * 5
        hl = {i: clamp(lit - i) * (1 - .6 * seg(t, STARTING3, BEGINS3)) for i in range(5)}
        hl[0] = max(hl.get(0, 0), win(t, STARTING3, O4 - .4, .3, .3))
        subs = {i: '1/5' for i in range(5)} if t > ONE3 - .2 else None
        cen = yearstrip(c, YS_X, YS_Y, YS_W, 5, stra, hl=hl, h=YS_H, sub=subs)
        for i in range(5):
            u = seg(t, SPREADS2 + .3 + .12 * i, FIVE2 + .1 + .12 * i)
            if u <= 0 or u >= 1: continue
            x = lerp(PILE[0], cen[i][0], ease(u)); y = lerp(PILE[1] + 80, cen[i][1], ease(u)) - 80 * math.sin(math.pi * u)
            _box(c, x - 60, y - 22, 120, 44, GOLD, stra, .45, r=10)
        fa = a * seg(t, BEGINS3 - .3, BEGINS3 + .2, back)
        if fa > 0:
            text(c, 'unit begins', cen[0][0], YS_Y + YS_H + 40, 26, 800, GOLD, fa, 'c')
    pa = a * seg(t, PRELIM3 - .2, PRELIM3 + .4) * (1 - seg(t, O4 - .8, O4 - .3))
    if pa > 0:                                                               # the pile, divided by five
        for k, (kind, _, _) in enumerate(DOCS):
            _doc(c, 330 + 12 * k, 515 - 10 * k, .55, pa, kind, -5 + 5 * k)
        da = pa * seg(t, FIFTH3 - .3, FIFTH3 + .2, back)
        text(c, '÷ 5', 560, 540, 64, 800, GOLD, da, 'c', shadow=8)
        if da > 0:
            P = catmull([(640, 525), (740, 500), (790, 580), (780, YS_Y - 14)], step=10)
            n = max(2, int(len(P) * seg(t, FIFTH3, FIFTH3 + .6)))
            path = skia.Path(); path.moveTo(*P[0])
            for q in P[1:n]: path.lineTo(*q)
            pp = paint(GOLD, .8 * da, stroke=3, cap=False); pp.setPathEffect(skia.DashPathEffect.Make([10, 8], -t * 30))
            c.drawPath(path, pp)
    ha = a * seg(t, PRELIM3 - .3, PRELIM3 + .2)
    if ha > 0:
        _head(c, 'Preliminary expenses', 110, 330, ha, 40, WHITE, 'deducted at one fifth a year, for five years', DIM,
              seg(t, FIFTH3 - .3, FIFTH3 + .2))

# ---------------------------------------------------------------- o4: the fixed list
ROW1 = [('Feasibility report', 'compass', FEAS4), ('Project report', 'doc', PROJ4), ('Market survey', 'chart', MARKET4),
        ('Engineering services', 'gear', ENG4), ('Legal charges · business agreements', 'scale', LEGAL4)]
ROW2 = [('Memorandum & articles', 'draft', MEMO4), ('Registration fees', 'building', REG4),
        ('Public issue costs', 'coins', PUBLIC4)]
def _list4(c, t):
    a = seg(t, O4 - .3, O4 + .3) * (1 - seg(t, O5 - .6, O5 - .1))
    if a <= 0: return
    ha = a * seg(t, LIST4 - .2, LIST4 + .3)
    if ha > 0:
        text(c, 'The list is fixed', 110, 300, 40, 800, WHITE, ha, shadow=6)
        padlock(c, 470, 286, 1.2, GOLD, ha * seg(t, FIXED4 - .3, FIXED4 + .1), 0)
        sec(c, 520, 290, '35D(2)', ha * seg(t, FIXED4 - .1, FIXED4 + .3), size=24)
    tw, th, gx, y1 = 320, 168, 22, 340
    for k, (lbl, ic, tt) in enumerate(ROW1):
        x = 116 + k * (tw + gx)
        ta = a * seg(t, tt - .25, tt + .2)
        if ta <= 0: continue
        pop = seg(t, tt - .25, tt + .35, back); g = win(t, tt - .1, tt + 1.3, .2, .7)
        sh = .5 + .5 * math.sin((t - O4) * 1.3 - k * .8)
        c.save(); c.translate(x + tw / 2, y1 + th / 2); k_ = .88 + .12 * pop; c.scale(k_, k_); c.translate(-(x + tw / 2), -(y1 + th / 2))
        tile(c, x, y1, tw, th, ic, lbl, ta, GREEN, None, 24, max(g, .15 * sh))
        c.restore()
    ca = a * seg(t, COMPANY4 - .2, COMPANY4 + .3, back)
    if ca > 0: chip(c, 960, 572, 'for a company, also', VIO, ca, 26)
    tw2, gx2, y2 = 380, 30, 612
    for k, (lbl, ic, tt) in enumerate(ROW2):
        x = 960 - (3 * tw2 + 2 * gx2) / 2 + k * (tw2 + gx2)
        ta = a * seg(t, tt - .25, tt + .2)
        if ta <= 0: continue
        pop = seg(t, tt - .25, tt + .35, back); g = win(t, tt - .1, tt + 1.3, .2, .7)
        c.save(); c.translate(x + tw2 / 2, y2 + 80); k_ = .88 + .12 * pop; c.scale(k_, k_); c.translate(-(x + tw2 / 2), -(y2 + 80))
        tile(c, x, y2, tw2, 160, ic, lbl, ta, VIO, None, 24, g)
        c.restore()

# ---------------------------------------------------------------- o5: the example
SH5 = [
    {'label': 'Preliminary expenses spent', 'amt': 400000, 'kind': 'start', 't0': FOUR5 - .1},
    {'label': 'cap: 5% of the cost of the project', 'kind': 'note', 't0': CAP5 - .1},
    {'label': 'Cost of the project', 'amt': 6000000, 't0': SIXTY5 - .1},
    {'label': 'Allowed (up to the 5% cap)', 'amt': 300000, 'kind': 'sub', 't0': THREE5 - .2, 'hl': (THREE5 - .2, COUNTS5 + .8)},
    {'label': 'Deduction each year (÷ 5)', 'amt': 60000, 'kind': 'total', 'sec': '35D', 't0': SIXTY5B - .15},
]
SH5_X, SH5_Y, SH5_W = 100, 290, 980
BAR5_X, BAR5_W, BASE5, K5 = 1170, 190, 640, 66.            # px per lakh
def _example5(c, t):
    a = seg(t, O5 - .5, O5 + .1) * (1 - seg(t, O6 - .6, O6 - .1))
    if a <= 0: return
    sheet(c, SH5_X, SH5_Y, SH5_W, SH5, a, t, title='Section 35D · Meera', title_r='second outlet')
    # the ₹4,00,000 bar and the 5% cap
    ba = a * seg(t, FOUR5 - .2, FOUR5 + .3)
    if ba > 0:
        g = seg(t, FOUR5 - .2, FOUR5 + .8, eout)
        top = BASE5 - 4 * K5 * g
        capy = BASE5 - 3 * K5
        cut = seg(t, THREE5 - .1, THREE5 + .5)
        c.drawRRect(rrect(BAR5_X, top, BAR5_W, BASE5 - top, 10), paint(GOLD, .55 * ba))
        if cut > 0 and top < capy:
            c.drawRRect(rrect(BAR5_X, top, BAR5_W, capy - top, 10), paint('#2a3248', .9 * ba * cut))
        c.drawRRect(rrect(BAR5_X, top, BAR5_W, BASE5 - top, 10), paint(GOLD, .9 * ba, stroke=2.2))
        text(c, rupee(400000), BAR5_X + BAR5_W / 2, top - 18, 30, 800, GOLD, ba * (1 - cut * .6), 'c', shadow=6)
        c.drawLine(BAR5_X - 30, BASE5, BAR5_X + BAR5_W + 30, BASE5, paint(DIM, .6 * ba, stroke=2, cap=False))
        text(c, 'spent', BAR5_X + BAR5_W / 2, BASE5 + 32, 24, 700, DIM, ba, 'c')
        la = a * seg(t, CAP5 - .2, CAP5 + .3)
        if la > 0:
            p = paint(RED, .95 * la, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 8], 0))
            c.drawLine(BAR5_X - 40, capy, BAR5_X + BAR5_W + 40, capy, p)
            text(c, '5% cap', BAR5_X + BAR5_W + 52, capy + 9, 26, 800, RED, la)
        if cut > 0:
            text(c, 'excess ignored', BAR5_X + BAR5_W + 52, top + 30, 24, 700, DIM, ba * cut)
            text(c, rupee(300000), BAR5_X + BAR5_W / 2, (capy + BASE5) / 2 + 12, 30, 800, WHITE, ba * cut, 'c', shadow=6)
        pa = a * seg(t, SIXTY5 - .2, SIXTY5 + .3, back)
        if pa > 0:
            _box(c, 1560, 486, 260, 170, ACC, pa, .82)
            icon(c, 'shop', 1690, 530, .7, ACC, pa)
            text(c, 'project ' + inr(6000000), 1690, 592, 27, 800, WHITE, pa, 'c')
            text(c, '5% = ' + rupee(300000), 1690, 632, 27, 800, RED, pa * seg(t, ONLY5 - .2, ONLY5 + .3), 'c')
    # five ₹60,000 years
    sa = a * seg(t, SIXTY5B - .5, SIXTY5B)
    if sa > 0:
        n = seg(t, SIXTY5B - .2, YEARS5 + .4, linr) * 5
        subs = {i: rupee(60000) for i in range(5) if n > i + .6}
        cen = yearstrip(c, 160, 700, 1600, 5, sa, h=100, sub=subs, hl={i: win(t, SIXTY5B - .2 + (YEARS5 + .4 - SIXTY5B + .2) * i / 5 + .3,
                                                                          O6 - .5, .2, .4) for i in range(5)})
        for i in range(5):
            t0 = SIXTY5B - .2 + (YEARS5 + .6 - SIXTY5B) * i / 5
            u = seg(t, t0, t0 + .6)
            if u <= 0 or u >= 1: continue
            x = lerp(BAR5_X + BAR5_W / 2, cen[i][0], ease(u)); y = lerp(BASE5 - 60, cen[i][1], ease(u)) - 100 * math.sin(math.pi * u)
            coin(c, x, y, 20, sa, GOLD, '₹', shadow=False)

# ---------------------------------------------------------------- o6: company option · audit for non-corporates
def _alt6(c, t):
    a = seg(t, O6 - .4, O6 + .3) * (1 - seg(t, O7 - .6, O7 - .1))
    if a <= 0: return
    ia = a * seg(t, IND6 - .2, IND6 + .3)
    if ia > 0:
        _box(c, 100, 290, 820, 520, VIO, ia, .86)
        icon(c, 'building', 156, 350, .8, VIO, ia)
        text(c, 'An Indian company', 200, 362, 34, 800, WHITE, ia)
        text(c, 'may use the higher of', 200, 400, 25, 700, DIM, ia)
        base = 730
        hi = seg(t, HIGHER6 - .2, HIGHER6 + .4)
        for k, (lbl1, lbl2, h, tt, col) in enumerate((('5% of the cost', 'of the project', 170, FIVE6, ACC),
                                                       ('5% of capital', 'employed', 260, CAPEMP6, VIO))):
            x = 230 + k * 330
            g = seg(t, tt - .2, tt + .7, eout)
            ba = ia * seg(t, tt - .2, tt + .2)
            if ba <= 0: continue
            cc = mixc(col, GOLD, hi) if k == 1 else mixc(col, DIM, .5 * hi)
            c.drawRRect(rrect(x, base - h * g, 200, h * g, 10), paint(cc, .5 * ba))
            c.drawRRect(rrect(x, base - h * g, 200, h * g, 10), paint(cc, .95 * ba, stroke=2.2))
            if k == 1 and hi > 0:
                c.drawRRect(rrect(x - 5, base - h - 5, 210, h + 10, 14), paint(GOLD, .5 * ba * hi, stroke=8, blur=8))
                tick(c, x - 30, base - h - 34, ba * hi, 18)
                text(c, 'the higher one', x + 112, base - h - 26, 26, 800, GOLD, ba * hi, 'c')
            text(c, lbl1, x + 100, base + 36, 24, 700, WHITE, ba, 'c')
            text(c, lbl2, x + 100, base + 64, 24, 700, DIM, ba, 'c')
        c.drawLine(180, base, 860, base, paint(DIM, .5 * ia, stroke=2, cap=False))
    na = a * seg(t, NON6 - .2, NON6 + .3)
    if na > 0:
        _box(c, 1000, 290, 820, 520, GREEN, na, .86)
        text(c, 'A non-corporate taxpayer', 1040, 362, 34, 800, WHITE, na)
        text(c, 'like Meera', 1040, 400, 25, 700, DIM, na)
        person(c, 1200, 806, .9, na, 'meera', t, look=.5, mood=.3)
        book(c, 1590, 590, na, 'Books of account', BLUE, .82, 0)
        stamp(c, 1590, 600, 'AUDITED', GREEN, na, seg(t, AUDITED6 - .2, AUDITED6 + .6, linr), -12, 40, deep=False)
        text(c, 'needed to claim 35D', 1590, 770, 26, 800, GREEN, na * seg(t, CLAIM6 - .3, CLAIM6 + .2), 'c')

# ---------------------------------------------------------------- o7: section 35DDA, voluntary retirement
STAFFC = ['#2563eb', '#b45309', '#0f766e']
def _vrs7(c, t):
    a = seg(t, O7 - .4, O7 + .3) * (1 - seg(t, O8 - .5, O8 + .3))
    if a <= 0: return
    _head(c, 'Voluntary retirement', 110, 320, a * seg(t, VOL7 - .3, VOL7 + .2), 40, WHITE)
    sa = a * seg(t, SEC7 - .2, SEC7 + .3, back)
    if sa > 0: sec(c, 560, 306, '35DDA', sa, size=30)
    gone = seg(t, RETIRE7 - .1, RETIRE7 + 1.2)
    for k in range(3):
        pa = a * seg(t, VOL7 + .2 * k, VOL7 + .4 + .2 * k) * (1 - seg(gone, .6, 1))
        if pa <= 0: continue
        x = 220 + 170 * k - 160 * ease(gone)
        person(c, x, 620, .7, pa, 'staff', t, look=-.6 * gone, mood=.4, col=STAFFC[k])
    ra = a * seg(t, RETIRE7 - .2, RETIRE7 + .3) * (1 - seg(t, O8 - .8, O8 - .3))
    if ra > 0: chip(c, 390, 652, 'retire early', ACC, ra, 26)
    # the ₹10,00,000 payment
    ca = a * seg(t, TEN7 - .3, TEN7 + .2)
    split = seg(t, DEDUCT7 - .2, TWO7 + .4)
    if ca > 0:
        u = seg(t, TEN7 - .3, TEN7 + .5, eout)
        cheque(c, 1000, 480 + 30 * (1 - u), ca * (1 - .65 * split), 1000000, 'Retiring staff (VRS)', True, .7, 0, None)
    # the five-year strip
    ya = a * seg(t, SAME7 - .3, SAME7 + .3)
    if ya > 0:
        n = seg(t, TWO7 - .1, YEAR7B + .5, linr) * 5
        subs = {i: rupee(200000) for i in range(5) if n > i + .6}
        g = win(t, FIVE7 - .2, TEN7, .3, .6)
        sw = ((t - FIVE7) * .45) % 1 * 5
        cen = yearstrip(c, 160, 690, 1600, 5, ya, h=100, sub=subs,
                        hl={i: max(g * .7 * clamp(1 - abs(sw - i - .5)), clamp(n - i) * .7) for i in range(5)})
        for i in range(5):
            t0 = TWO7 - .2 + (YEAR7B + .3 - TWO7) * i / 5
            u = seg(t, t0, t0 + .6)
            if u <= 0 or u >= 1: continue
            x = lerp(1000, cen[i][0], ease(u)); y = lerp(520, cen[i][1], ease(u)) - 90 * math.sin(math.pi * u)
            coin(c, x, y, 20, ya, GOLD, '₹', shadow=False)
        text(c, '÷ 5', 1000, 650, 30, 800, GOLD, ya * seg(t, DEDUCT7 - .3, DEDUCT7 + .2), 'c')

# ---------------------------------------------------------------- o8: below the check card
def _check8(c, t):
    a = seg(t, O8 - .1, O8 + .5)
    if a <= 0: return
    y = 792
    ba = a * seg(t, WRITE8 - .2, WRITE8 + .3) * (1 - seg(t, ADD8 - .4, ADD8 - .1))
    if ba > 0:
        chip(c, 960, y, 'books: whole ' + rupee(400000) + ' written off this year', ACC, ba, 28)
    aa = a * seg(t, ADD8 - .2, ADD8 + .3, back)
    if aa > 0: chip(c, 700, y, '+ ' + rupee(400000) + '  add back', RED, aa, 30)
    da = a * seg(t, DEDUCT8 - .2, DEDUCT8 + .3, back)
    if da > 0: chip(c, 1220, y, '− ' + rupee(60000) + '  deduct u/s 35D', GREEN, da, 30)

# ---------------------------------------------------------------- the chapter
def ch_o(c, t):
    if t < CS - .6 or t > CE + .6: return
    _stage1(c, t)
    _list4(c, t)
    _example5(c, t)
    _alt6(c, t)
    _vrs7(c, t)
    _check8(c, t)
