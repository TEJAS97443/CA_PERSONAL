"""Chapter C — what lands in this head (section 28).
c1 hook: a company (building) sends Meera a ₹5,00,000 cheque; an AGREEMENT writes itself line by line ("I will not
   open a bakery in this area for 3 years · Payment ₹5,00,000") and Meera signs; her oven stands cold and empty
   ("baked nothing"); a pulsing "business income?" pill
c2 predict: the scene waits calmly, the pill pulsing
c3 "Yes" (the pill turns green); the agreement folds into a small card; on "section 28 is a net" a wide fishing
   net sweeps in from the left (rope rim with floats, § 28 tag) with "Ordinary profit" already in it; on "reaches
   well past" the net stretches across the whole frame. Everything the later beats name falls into it as a tag.
c4 the agreement card drops in as "Non-compete fee"; a closed shop (not carrying on a business) and a locked recipe
   book (not sharing know-how) feed the same tag, which glows "business income"; a violet side door shows
   "selling a right to manufacture → capital gains" (it does not land in the net)
c5 an agency agreement tears in two, its Compensation envelope drops in; a container ship's duty-drawback coin
   drops in (Export incentive); a trade association badge serves its members, its fees drop in
c6 example: a company hands its lawyer the key to a free flat for legal work; a "₹ value of the flat" tag swings
   onto the flat and drops in (Benefit in kind → professional income)
c7 a firm pays its partner salary · bonus · commission · interest (coins), which drop in; a bar splits into the
   part allowed to the firm (green, caught) and the rest; his share of profit floats to an "Exempt · § 10(2A)" shelf
c8 "three more": a keyman insurance policy; stock boxes turning into an oven (capital asset) at market value; a
   cold store whose whole cost was deducted under § 35AD — each drops in
c9 trap: a residential house "to let" falls toward the net, bounces off the mesh and slips out into the House
   property drawer — "even if letting is your business"
c10 check: the net rests dimmed; below the card an Agency badge cracks, a ₹8,00,000 compensation envelope comes out,
   and on the answer it drops into a small "§ 28" net
"""
from scenes.common import *

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

CS, CE = B.span('c')
C1, C2, C3, C4, C5, C6, C7, C8, C9, C10 = (T('c%d' % i) for i in range(1, 11))
C10A = TA('c10')

# ---------------------------------------------------------------- word times
COMPANY, PAYS, FIVE, PROMISE = W('c1', 'company'), W('c1', 'pays'), W('c1', 'five'), W('c1', 'promise')
WONT, AREA, THREEY, BAKED, ISIT = W('c1', 'won'), W('c1', 'area'), W('c1', 'three'), W('c1', 'baked'), W('c1', 'is it')
YES, SEC28, NET3, LISTS, REACH, ORDIN = (W('c3', 'yes'), W('c3', 'section'), W('c3', 'net'), W('c3', 'lists'),
                                        W('c3', 'reaches'), W('c3', 'ordinary'))
FEE4, NOTCARRY, KNOW, BUSINC4 = W('c4', 'fee'), W('c4', 'carrying'), W('c4', 'know'), W('c4', 'business income')
COMP5, AGENCY5, CONTRACT5, ENDED5 = W('c5', 'compensation'), W('c5', 'agency'), W('c5', 'contract'), W('c5', 'ended')
EXPORT5, DRAW5, ASSOC5, SPECIAL5, MEMBERS5 = (W('c5', 'export'), W('c5', 'drawback'), W('c5', 'association'),
                                              W('c5', 'special'), W('c5', 'members'))
KIND6, COMPANY6, LAWYER6, FLAT6, LEGAL6 = W('c6', 'kind'), W('c6', 'company'), W('c6', 'lawyer'), W('c6', 'free flat'), W('c6', 'legal')
VALUE6, PROF6 = W('c6', 'value'), W('c6', 'professional')
PAYT7 = [W('c7', 'salary'), W('c7', 'bonus'), W('c7', 'commission'), W('c7', 'interest')]
FIRM7, BUSINC7, ONLY7, DEDUCT7 = W('c7', 'firm'), W('c7', 'business income'), W('c7', 'only'), W('c7', 'deduct')
SHARE7, EXEMPT7, SEC7 = W('c7', 'share'), W('c7', 'exempt'), W('c7', 'section')
MORE8, KEYMAN8, POLICY8 = W('c8', 'three more'), W('c8', 'key-man'), W('c8', 'policy')
MARKET8, STOCK8, CAPITAL8 = W('c8', 'market'), W('c8', 'stock'), W('c8', 'capital')
ASSET8, WHOLE8, AD8 = W('c8', 'asset', occ=1), W('c8', 'whole'), W('c8', 'thirty')
SLIPS9, RENT9, RESID9, HP9, EVEN9 = W('c9', 'slips'), W('c9', 'rent'), W('c9', 'residential'), W('c9', 'house property'), W('c9', 'even')
AGENCY10, CANCEL10, EIGHT10 = W('c10', 'agency'), W('c10', 'cancelled'), W('c10', 'eight')
BUS10A, CAUGHT10 = W('c10a', 'business'), W('c10a', 'caught')

def _arc(p0, p1, u, h):
    return lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) - h * math.sin(math.pi * u)

# ---------------------------------------------------------------- the net and its catch
NR, NB = 578, 818                                           # rim y, bottom of the bag at the centre
NXC = 960
FULLW = 1710

R1Y, R2Y = 655, 728
CATCH = [  # (label, icon, row, capture time = when it starts to fall); slots laid out left -> right in this order
    ('Compensation', 'cash', 0, ENDED5 + .9),
    ('Non-compete fee', 'doc', 0, FEE4 + .05),
    ('Ordinary profit', 'coins', 0, NET3 + .15),
    ('Export incentive', 'box', 0, DRAW5 + .35),
    ('Trade association', 'shield', 0, MEMBERS5 + .25),
    ('Keyman policy', 'person', 1, POLICY8 + .45),
    ("Partner's pay & interest", 'salary', 1, BUSINC7 + .05),
    ('Stock → capital asset', 'gear', 1, CAPITAL8 + .45),
    ('Benefit in kind', 'gift', 1, PROF6 + .1),
    ('35AD asset money', 'warehouse', 1, AD8 + 1.15),
]
I_NC, I_COMP, I_BEN, I_PART, I_KEY, I_STOCK, I_35 = 1, 0, 8, 6, 5, 7, 9
CSZ = 22
def _cw(s): return text_w(s, CSZ, 800) + 74
def _layout():
    out = [None] * len(CATCH)
    for row, y in ((0, R1Y), (1, R2Y)):
        idx = [i for i, cc in enumerate(CATCH) if cc[2] == row]
        ws = [_cw(CATCH[i][0]) for i in idx]; gap = 16
        x = NXC - (sum(ws) + gap * (len(ws) - 1)) / 2
        for i, w in zip(idx, ws):
            out[i] = (x + w / 2, y, w); x += w + gap
    return out
SLOT = _layout()
DROP = 1.0                                                  # seconds an item takes to fall into the net

for tt, k in ((COMPANY, 'pop'), (PAYS + .2, 'whoosh'), (PROMISE, 'flip'), (YES, 'ok'), (SEC28 + .05, 'whoosh'),
              (CATCH[2][3] + DROP, 'pop'), (CATCH[I_NC][3] + DROP, 'thunk'), (KNOW, 'key'), (BUSINC4, 'chime_lo'),
              (ENDED5, 'snip'), (CATCH[I_COMP][3] + DROP, 'pop'), (CATCH[3][3] + DROP, 'pop'), (CATCH[4][3] + DROP, 'pop'),
              (FLAT6 + .1, 'key'), (CATCH[I_BEN][3] + DROP, 'pop'), (CATCH[I_PART][3] + DROP, 'pop'), (EXEMPT7, 'chime_lo'),
              (CATCH[I_KEY][3] + DROP, 'pop'), (CATCH[I_STOCK][3] + DROP, 'pop'), (CATCH[I_35][3] + DROP, 'pop'),
              (RESID9 + .55, 'warn'), (HP9 + .1, 'thunk'), (CANCEL10, 'snip'), (CAUGHT10 + .3, 'ok')):
    _ev(tt, k)

def _netw(t):
    return lerp(760, FULLW, seg(t, REACH - .15, REACH + .9))

def _netx(t):
    return -1500 * (1 - seg(t, SEC28 - .05, NET3 + .2, eout))

def _impact(t):
    v = 0.
    for cc in CATCH:
        d = t - (cc[3] + DROP)
        if 0 < d < 1.6: v += math.sin(d * 11) * math.exp(-d * 3.2)
    for d in (t - (RESID9 + .55),):
        if 0 < d < 1.6: v += 1.6 * math.sin(d * 11) * math.exp(-d * 3.2)
    return v

def _bag(x0, x1, depth):
    xs = np.linspace(x0, x1, 48); w2 = (x1 - x0) / 2; xc = (x0 + x1) / 2
    ys = NR + depth * np.sqrt(np.clip(1 - np.abs((xs - xc) / w2) ** 6, 0, 1))
    return np.vstack([np.stack([xs, ys], 1)[::-1], [(x0, NR), (x1, NR)]])

_MESH = {}
def _mesh_img(w, front):
    """The bag (fill, mesh, outline) rasterised once per width, rim at local y = 4, x0 at local x = 12."""
    key = (int(round(w)), front)
    img = _MESH.get(key)
    if img is None:
        if len(_MESH) > 6: _MESH.clear()
        depth = NB - NR; W_, H_ = int(round(w)) + 24, int(depth) + 34
        sf = skia.Surface(W_, H_); cv = sf.getCanvas(); cv.translate(12, 4 - NR)
        x0, x1 = 0., float(int(round(w)))
        P = poly(_bag(x0, x1, depth))
        if not front: cv.drawPath(P, paint('#0b1226', .55))
        cv.save(); cv.clipPath(P, True)
        mp = paint('#9fb3d1', .12 if front else .3, stroke=1.4 if front else 1.6, cap=False)
        st = 38.; k = .84
        for i in range(-14, int((x1 - x0) / st) + 16):
            bx = x0 + i * st + (st / 2 if front else 0.)
            cv.drawLine(bx, NR, bx + (NB - NR + 40) * k, NB + 40, mp)
            if not front: cv.drawLine(bx, NR, bx - (NB - NR + 40) * k, NB + 40, mp)
        cv.restore()
        if not front: cv.drawPath(P, paint('#c9a46b', .55, stroke=2.4))
        img = sf.makeImageSnapshot(); _MESH[key] = img
    return img

def _mesh(c, a, x0, x1, depth, front):
    if a <= 0: return
    img = _mesh_img(x1 - x0, front)
    p = skia.Paint(); p.setAlphaf(clamp(a))
    c.save(); c.translate(x0 - 12, NR); c.scale(1, depth / (NB - NR)); c.translate(0, -4)
    c.drawImage(img, 0, 0, skia.SamplingOptions(skia.FilterMode.kLinear), p)
    c.restore()

def _net_back(c, t, a, x0, x1, depth):
    _mesh(c, a, x0, x1, depth, False)

def _net_front(c, t, a, x0, x1, depth):
    """Rim rope, floats, poles and the § 28 tag (drawn over the catch)."""
    if a <= 0: return
    rp = skia.Path(); rp.moveTo(x0, NR)
    rp.quadTo((x0 + x1) / 2, NR + 10, x1, NR)
    c.drawPath(rp, paint(BLACK, .4 * a, stroke=9, blur=4))
    c.drawPath(rp, paint('#c9a46b', a, stroke=6))
    c.drawPath(rp, paint('#f1d9a8', .5 * a, stroke=1.6))
    n = max(2, int((x1 - x0) / 130))
    for k in range(n + 1):
        fx = lerp(x0 + 40, x1 - 40, k / n)
        if abs(fx - (x0 + x1) / 2) < 75: continue
        fy = NR + 10 * (1 - ((fx - (x0 + x1) / 2) / ((x1 - x0) / 2)) ** 2) - 1
        c.drawOval(skia.Rect.MakeXYWH(fx - 15, fy - 9, 30, 18), paint(ORANGE, a))
        c.drawOval(skia.Rect.MakeXYWH(fx - 15, fy - 9, 30, 18), paint(shade(ORANGE, -.4), a, stroke=1.4))
        c.drawLine(fx - 10, fy - 4, fx + 4, fy - 6, paint(WHITE, .45 * a, stroke=2))
    for px in (x0, x1):
        c.drawLine(px, NR - 70, px, NR + 26, paint('#8b6b45', a, stroke=8))
        c.drawCircle(px, NR - 70, 6, paint('#c9a46b', a))
    w = sec(c, 0, 0, '28', 0, size=30)
    sec(c, (x0 + x1) / 2, NR + 2, '28', a, size=30, align='c')

def _tag(c, x, y, label, ic, a, glow=0., col=GOLD, w=None):
    if a <= 0: return
    w = w or _cw(label); h = 46
    c.drawRRect(rrect(x - w / 2, y - h / 2 + 6, w, h, 14), paint(BLACK, .45 * a, blur=10))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 14), paint('#1a1405', .96 * a))
    if glow > 0: c.drawRRect(rrect(x - w / 2 - 4, y - h / 2 - 4, w + 8, h + 8, 18), paint(col, .55 * glow * a, stroke=8, blur=10))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 14), paint(col, .9 * a, stroke=2))
    icon(c, ic, x - w / 2 + 26, y, .42, col, a, 3.6)
    text(c, label, x - w / 2 + 50, y + CSZ * .36, CSZ, 800, WHITE, a)

def _fall(t, i, src):
    """Position (x, y, alpha-in-flight, landed) of catch i falling from src to its slot."""
    t0 = CATCH[i][3]; u = seg(t, t0, t0 + DROP, linr)
    sx, sy, _ = SLOT[i]
    if u >= 1: return sx, sy, 1
    x = lerp(src[0], sx, ease(u)); y = lerp(src[1], sy, u * u) - 90 * math.sin(math.pi * u) * (1 - u)
    return x, y, 0

SRC = {1: (560, 420), 0: (420, 430), 2: (NXC, 420), 3: (980, 470), 4: (1360, 440), 8: (1210, 330),
       6: (800, 380), 5: (340, 420), 7: (960, 420), 9: (1590, 420)}

def _net(c, t):
    a = seg(t, SEC28 - .1, SEC28 + .3) * (1 - .92 * seg(t, C10 - .3, C10 + .5))
    if a <= 0: return
    dx = _netx(t); w = _netw(t)
    imp = _impact(t)
    depth = (NB - NR) + 10 * imp
    x0, x1 = NXC - w / 2 + dx, NXC + w / 2 + dx
    _net_back(c, t, a, x0, x1, depth)
    # the catch
    for i, (lab_, ic, row, t0) in enumerate(CATCH):
        if t < t0: continue
        x, y, landed = _fall(t, i, SRC[i])
        if not landed: continue
        x += dx; y += 10 * imp * (y - NR) / (NB - NR)
        glow = win(t, t0 + DROP - .1, t0 + DROP + 1.4, .15, .8)
        if i == 2: glow = max(glow, win(t, ORDIN - .2, ORDIN + 1.4, .2, .6))
        if i == I_NC: glow = max(glow, win(t, BUSINC4 - .2, BUSINC4 + 1.6, .2, .6))
        if i == I_PART: glow = max(glow, win(t, ONLY7 - .2, DEDUCT7 + 1.0, .3, .6))
        _tag(c, x, y, lab_, ic, a * seg(t, t0, t0 + .15), glow)
    # the front of the mesh, then rope, floats, tag
    _mesh(c, a, x0, x1, depth, True)
    _net_front(c, t, a, x0, x1, depth)
    la = a * win(t, LISTS - .3, REACH + 2.0, .4, .6)
    if la > 0:
        text(c, 'everything taxed under this head', NXC, NR - 104, 28, 800, WHITE, la, 'c', shadow=8)
    ra = a * win(t, REACH - .1, ORDIN + 1.6, .3, .6)
    if ra > 0:
        for sg in (-1, 1):
            xe = NXC + sg * w / 2 + dx + sg * 18
            arrow(c, xe - sg * 60, NR - 20, xe + sg * 14, NR - 20, GOLD, 3, ra, 16)
        text(c, 'and well past ordinary profit', NXC, NR - 58, 26, 800, GOLD, ra, 'c', shadow=6)

# ---------------------------------------------------------------- c1/c2: the promise
CTX, CTY, CTW, CTH = 470, 296, 470, 440                    # the agreement
MX = 1170                                                   # Meera
OVX = 1600
CHQ_END = (MX, 352)

def _paper(c, x, y, w, h, a, ang=0.):
    c.drawRRect(rrect(x + 6, y + 12, w, h, 8), paint(BLACK, .45 * a, blur=16))
    c.drawRRect(rrect(x, y, w, h, 8), paint(shader=lgrad((x, y), (x, y + h), ['#fbf7ec', CREAM, '#ece3cd']), a=a))
    c.drawRRect(rrect(x, y, w, h, 8), paint('#cbbd9c', a, stroke=1.2))

def _typed(c, s, x, y, size, col, a, u, fam=SERIF, w_=700):
    if a <= 0 or u <= 0: return
    n = int(round(len(s) * clamp(u)))
    if n: ftext(c, s[:n], x, y, size, fam, col, a, 'l', w_)

def _agreement(c, t, a):
    if a <= 0: return
    x, y, w, h = CTX, CTY, CTW, CTH
    _paper(c, x, y, w, h, a)
    ftext(c, 'AGREEMENT', x + w / 2, y + 56, 30, SERIF, INK, a, 'c', 700, track=3)
    c.drawLine(x + 40, y + 76, x + w - 40, y + 76, paint(INK, .6 * a, stroke=1.4))
    _typed(c, 'I will not open a bakery', x + 40, y + 140, 28, INK, a, seg(t, WONT - .2, AREA - .2, linr))
    _typed(c, 'in this area for 3 years.', x + 40, y + 182, 28, INK, a, seg(t, AREA - .2, THREEY + .5, linr))
    pa = a * seg(t, THREEY + .4, THREEY + .8)
    if pa > 0:
        ftext(c, 'Payment', x + 40, y + 252, 26, SERIF, '#6b6452', pa, 'l', 700)
        ftext(c, rupee(500000), x + w - 40, y + 254, 32, MONO, '#b45309', pa, 'r', 700)
    c.drawLine(x + 40, y + h - 78, x + 250, y + h - 78, paint('#8a8068', .8 * a, stroke=1.4))
    text(c, 'signed', x + 40, y + h - 50, 18, 700, '#8a8068', a)
    su = seg(t, THREEY + .65, THREEY + 1.4, linr)
    if su > 0:
        c.save(); c.clipRect(skia.Rect(x + 30, y + h - 150, x + 40 + 260 * su, y + h - 60), True)
        ftext(c, 'Meera', x + 48, y + h - 88, 52, SIGN, '#1d4ed8', a, 'l', 400)
        c.restore()

def _cold_oven(c, t, x, y, s, a):
    if a <= 0: return
    oven(c, x, y, s, a, t, on=0)
    c.save(); c.translate(x, y); c.scale(s, s)
    for dy in (-252, -154):
        c.drawRRect(rrect(-120, dy + 28, 182, 54, 6), paint('#0b1220', a))
        c.drawRRect(rrect(-120, dy + 28, 182, 54, 6), paint('#3b4a6b', a, stroke=2))
    c.restore()

def _promise(c, t):
    if t < CS - .2: return
    out = seg(t, YES + .25, YES + 1.1)
    a = 1 - out
    if a <= 0: return
    # the company
    ca = a * seg(t, COMPANY - .35, COMPANY + .2)
    if ca > 0:
        building(c, 225, 770, .72, ca, 2)
        w = text_w('a company', 24, 800)
        c.drawRRect(rrect(225 - w / 2 - 18, 470, w + 36, 40, 20), paint('#0b1020', .9 * ca))
        c.drawRRect(rrect(225 - w / 2 - 18, 470, w + 36, 40, 20), paint(ACC, .8 * ca, stroke=2))
        text(c, 'a company', 225, 498, 24, 800, WHITE, ca, 'c')
    # the agreement
    pu = seg(t, PROMISE - .45, PROMISE + .3, eout)
    if pu > 0:
        c.save(); c.translate(0, 40 * (1 - pu))
        _agreement(c, t, a * pu)
        c.restore()
    # Meera
    ma = a * seg(t, COMPANY + .4, COMPANY + 1.0)
    if ma > 0:
        person(c, MX, 770, 1.0, ma, 'meera', t, mood=lerp(.5, -.2, seg(t, ISIT - .2, ISIT + .4)), look=-.55)
    # the cheque from the company to Meera
    qu = seg(t, PAYS - .05, FIVE + .45)
    if qu > 0:
        x, y = lerp(260, CHQ_END[0], ease(qu)), lerp(560, CHQ_END[1], ease(qu)) - 60 * math.sin(math.pi * qu)
        cheque(c, x, y, a * seg(t, PAYS - .05, PAYS + .2), 500000, 'Meera', True, lerp(.3, .62, ease(qu)), lerp(-14, -4, qu))
    # the cold, empty oven
    oa = a * seg(t, BAKED - .45, BAKED - .05)
    if oa > 0:
        _cold_oven(c, t, OVX, 770, .82, oa)
        na = a * seg(t, BAKED - .1, BAKED + .35, back)
        w = text_w('baked nothing', 25, 800) + 40
        c.drawRRect(rrect(OVX - w / 2, 455, w, 44, 22), paint('#0b1020', .92 * na)); c.drawRRect(rrect(OVX - w / 2, 455, w, 44, 22), paint(DIM, .7 * na, stroke=2))
        text(c, 'baked nothing', OVX, 485, 25, 800, DIM, na, 'c')
    # the question
    qa = a * seg(t, ISIT - .3, ISIT + .2, back)
    if qa > 0:
        yes = seg(t, YES - .1, YES + .25)
        col = mixc(GOLD, GREEN, yes)
        pul = 1 + .04 * math.sin((t - ISIT) * 5) * (1 - yes)
        s = 'business income?' if yes < .5 else 'Yes: business income'
        w = text_w(s, 28, 800) + 70; x, y = MX, 470
        c.save(); c.translate(x, y); c.scale(pul, pul); c.translate(-x, -y)
        c.drawRRect(rrect(x - w / 2, y - 25, w, 50, 25), paint(shade(col, -.75), .95 * qa))
        c.drawRRect(rrect(x - w / 2, y - 25, w, 50, 25), paint(col, qa, stroke=2.4))
        text(c, s, x + 14, y + 10, 28, 800, WHITE, qa, 'c')
        if yes < .5: text(c, '?', x - w / 2 + 24, y + 11, 30, 800, GOLD, qa, 'c')
        else: tick(c, x - w / 2 + 26, y, qa, 14)
        c.restore()

def _contract_card(c, t, x, y, a, sc=1.):
    """The agreement folded into a small card (c3 -> c4)."""
    if a <= 0: return
    w, h = 250 * sc, 128 * sc
    _paper(c, x - w / 2, y - h / 2, w, h, a)
    ftext(c, 'AGREEMENT', x, y - h / 2 + 32 * sc, 20 * sc, SERIF, INK, a, 'c', 700, track=2)
    text(c, 'no bakery here, 3 years', x, y + 4 * sc, 18 * sc, 700, '#6b6452', a, 'c')
    ftext(c, rupee(500000), x, y + 40 * sc, 24 * sc, MONO, '#b45309', a, 'c', 700)

def _card_stage(c, t):
    """c3/c4: the folded agreement waits in the stage, then falls into the net as the non-compete fee."""
    a = seg(t, YES + .5, YES + 1.1)
    t0 = CATCH[I_NC][3]
    if a <= 0 or t > t0 + .25: return
    u = seg(t, YES + .5, YES + 1.3)
    x = lerp(CTX + CTW / 2, SRC[I_NC][0], ease(u)); y = lerp(CTY + CTH / 2, SRC[I_NC][1], ease(u))
    _contract_card(c, t, x, y, a * (1 - seg(t, t0, t0 + .25)), lerp(1.6, 1., ease(u)))
    la = a * seg(t, FEE4 - .7, FEE4 - .2) * (1 - seg(t, t0, t0 + .25))
    if la > 0: _pill(c, x, y - 92, 'a non-compete fee', GOLD, la, 25)

def _pill(c, x, y, s, col, a, size=26, fill=.2, tcol=WHITE):
    if a <= 0: return text_w(s, size, 800) + size * 1.3
    w = text_w(s, size, 800) + size * 1.3; h = size * 1.75
    c.drawRRect(rrect(x - w / 2, y - h / 2 + 6, w, h, h / 2), paint(BLACK, .35 * a, blur=10))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(shade(col, -.78), .95 * a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(col, fill * a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, h / 2), paint(col, .9 * a, stroke=2))
    text(c, s, x, y + size * .36, size, 800, tcol, a, 'c')
    return w

# ---------------------------------------------------------------- c4: not carrying on business, not sharing know-how
def _noncompete(c, t):
    a = seg(t, NOTCARRY - .45, NOTCARRY) * (1 - seg(t, C5 - .2, C5 + .5))
    slot = SLOT[I_NC]
    if a > 0:
        # a closed shop
        sx, sy = 900, 462
        shop(c, sx, sy, .36, a, t, lit=0.)
        c.save(); c.translate(sx + 56, sy - 72); c.rotate(-6)
        c.drawRRect(rrect(-38, -15, 76, 30, 5), paint('#7f1d1d', a)); c.drawRRect(rrect(-38, -15, 76, 30, 5), paint('#fca5a5', a, stroke=1.4))
        text(c, 'CLOSED', 0, 7, 17, 800, WHITE, a, 'c', track=1.5)
        c.restore()
        text(c, 'not carrying on a business', sx, sy + 40, 24, 800, WHITE, a, 'c')
        # a locked recipe book
        ka = a * seg(t, KNOW - .55, KNOW - .1)
        if ka > 0:
            bx, by = 1230, 356
            book(c, bx, by, ka, 'Recipes', '#0f766e', .6, 0.)
            padlock(c, bx + 42, by + 40, .9, GOLD, ka, 0.)
            text(c, 'not sharing know-how', bx, sy + 40, 24, 800, WHITE, ka, 'c')
        # both feed the non-compete tag
        for (px, py), tt in (((sx, sy + 60), NOTCARRY + .3), ((1230, sy + 60), KNOW + .2)):
            fa = a * seg(t, tt, tt + .4) * (1 - seg(t, BUSINC4 + .8, BUSINC4 + 1.4))
            if fa > 0:
                P = catmull([(px, py), ((px + slot[0]) / 2, (py + slot[1]) / 2 + 20), (slot[0], slot[1] - 26)])
                c.drawPath(poly(P, False), paint(GOLD, .3 * fa, stroke=2.4))
                flowdots(c, P, ((t - tt) * .8) % 1, fa, GOLD, 6, 5.)
        ba = a * seg(t, BUSINC4 - .2, BUSINC4 + .3, back)
        if ba > 0:
            _pill(c, slot[0], slot[1] + 60, '= business income', GOLD, ba, 24, .25)
    # the side door: selling a right to manufacture -> capital gains (not in the net)
    da = seg(t, BUSINC4 + .35, BUSINC4 + .85) * (1 - seg(t, C5 + .9, C5 + 1.5))
    if da > 0:
        x, y, w, h = 236, 318, 120, 150
        c.drawRRect(rrect(x - 6, y - 6, w + 12, h + 12, 10), paint(VIO, .3 * da, blur=6))
        c.drawRRect(rrect(x, y, w, h, 8), paint('#1e1538', .95 * da))
        op = seg(t, BUSINC4 + .6, BUSINC4 + 1.3)
        c.drawPath(poly(np.array([(x, y), (x + w * (1 - .55 * op), y + 14 * op), (x + w * (1 - .55 * op), y + h - 14 * op), (x, y + h)])), paint(shade(VIO, -.5), .95 * da))
        c.drawRRect(rrect(x, y, w, h, 8), paint(VIO, .95 * da, stroke=2.4))
        c.drawCircle(x + w * (1 - .55 * op) - 14, y + h / 2, 5, paint(GOLD, da))
        text(c, 'selling a right', x + w / 2, y - 52, 24, 800, WHITE, da, 'c')
        text(c, 'to manufacture', x + w / 2, y - 22, 24, 800, WHITE, da, 'c')
        aw = seg(t, BUSINC4 + .9, BUSINC4 + 1.4)
        if aw > 0:
            arrow(c, x + w + 8, y + h / 2, x + w + 8 + 80 * aw, y + h / 2, VIO, 3.4, da, 16)
            _pill(c, x + w / 2 + 20, y + h + 34, '→ capital gains', VIO, da * aw, 24, .25)

# ---------------------------------------------------------------- c5: compensation, export incentives, trade association
def _envelope(c, x, y, a, label, sc=1., ang=0., col=GOLD):
    if a <= 0: return
    w, h = 190 * sc, 116 * sc
    c.save(); c.translate(x, y); c.rotate(ang)
    c.drawRRect(rrect(-w / 2 + 4, -h / 2 + 10, w, h, 8), paint(BLACK, .45 * a, blur=12))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 8), paint('#f3e7c9', a))
    p = skia.Path(); p.moveTo(-w / 2, -h / 2); p.lineTo(0, h * .08); p.lineTo(w / 2, -h / 2)
    c.drawPath(p, paint('#c9b48a', a, stroke=2))
    c.drawRRect(rrect(-w / 2, -h / 2, w, h, 8), paint('#c9b48a', a, stroke=1.4))
    text(c, label, 0, h * .34, 20 * sc, 800, '#7c2d12', a, 'c')
    c.restore()

def _torn_paper(c, t, x, y, a, u):
    """'Agency agreement' that tears in two as u goes 0 -> 1."""
    if a <= 0: return
    w, h = 250, 180
    for side in (-1, 1):
        if u <= 0 and side == 1: break
        c.save()
        if u > 0:
            c.translate(x + side * 40 * eout(u), y + 30 * eout(u)); c.rotate(side * 9 * eout(u)); c.translate(-x, -y)
            cl = skia.Path(); xs = [x - w / 2 - 20] if side < 0 else [x + w / 2 + 20]
            cl.moveTo(xs[0], y - h / 2 - 20)
            for k in range(9):
                yy = y - h / 2 + k * h / 8; cl.lineTo(x + (10 if k % 2 else -10), yy)
            cl.lineTo(xs[0], y + h / 2 + 20); cl.close()
            c.clipPath(cl, True)
        _paper(c, x - w / 2, y - h / 2, w, h, a)
        ftext(c, 'AGENCY', x, y - 44, 24, SERIF, INK, a, 'c', 700, track=2)
        ftext(c, 'AGREEMENT', x, y - 16, 20, SERIF, INK, a, 'c', 700, track=2)
        for j in range(3): c.drawLine(x - 90, y + 14 + 18 * j, x + 90 - 30 * (j % 2), y + 14 + 18 * j, paint('#8a8068', .7 * a, stroke=1.4))
        c.restore()

def _badge(c, x, y, r, a, label, crack=0., col=ACC):
    if a <= 0: return
    c.drawCircle(x, y + 6, r, paint(BLACK, .4 * a, blur=12))
    c.drawCircle(x, y, r, paint(shade(col, -.72), a)); c.drawCircle(x, y, r, paint(col, .9 * a, stroke=3))
    c.drawCircle(x, y, r * .8, paint(col, .45 * a, stroke=1.4))
    icon(c, 'shield', x, y - r * .18, r / 64 * 1.05, col, a, 3.4)
    if label: text(c, label, x, y + r * .56, r * .28, 800, WHITE, a, 'c')
    if crack > 0:
        p = skia.Path(); p.moveTo(x - r * .1, y - r)
        for k, (dx, dy) in enumerate(((.15, -.55), (-.12, -.2), (.2, .15), (-.05, .5), (.12, 1.))):
            if k / 5 > crack: break
            p.lineTo(x + dx * r, y + dy * r)
        c.drawPath(p, paint('#fef2f2', a, stroke=3.4))
        c.drawPath(p, paint(RED, .8 * a, stroke=1.6))

def _c5(c, t):
    a = seg(t, C5 - .1, C5 + .4) * (1 - seg(t, C6 - .5, C6 + .1))
    if a <= 0: return
    # compensation: an agency agreement ends, the envelope drops in
    pa = a * seg(t, AGENCY5 - .4, AGENCY5) * (1 - seg(t, CATCH[I_COMP][3] + .3, CATCH[I_COMP][3] + .9))
    tu = seg(t, ENDED5 - .1, ENDED5 + .5)
    _torn_paper(c, t, 330, 410, pa, tu)
    ea = a * seg(t, AGENCY5 + .1, AGENCY5 + .5)
    t1 = CATCH[I_COMP][3]
    if ea > 0 and t < t1:
        ey = lerp(470, SRC[I_COMP][1], seg(t, ENDED5 + .2, t1))
        _envelope(c, SRC[I_COMP][0] + 10, ey, ea, 'Compensation', 1., -4)
    ca = a * seg(t, CONTRACT5 - .3, CONTRACT5 + .1) * (1 - seg(t, CHANGE_T + .6, CHANGE_T + 1.2))
    if ca > 0: text(c, 'agency or contract ended / changed', 330, 290, 24, 700, DIM, ca, 'c')
    # export incentive: a ship and its duty drawback
    sa = a * seg(t, EXPORT5 - .5, EXPORT5)
    if sa > 0:
        sx = lerp(1180, 900, seg(t, EXPORT5 - .5, EXPORT5 + 1.2, eout))
        ship(c, sx, 508, .5, sa, t)
        la = sa * seg(t, EXPORT5 - .1, EXPORT5 + .4)
        text(c, 'export incentive', sx, 290, 26, 800, WHITE, la, 'c')
        da = sa * seg(t, DRAW5 - .3, DRAW5 + .2)
        if da > 0 and t < CATCH[3][3]:
            cy = 392 - 20 * seg(t, DRAW5 - .3, DRAW5 + .3)
            coin(c, sx + 60, cy, 24, da, GOLD)
            _pill(c, sx + 60, cy - 50, 'duty drawback', GOLD, da, 22, .25)
    # trade association: special services to members
    ba = a * seg(t, ASSOC5 - .5, ASSOC5 - .1)
    if ba > 0:
        bx, by = 1450, 412
        _badge(c, bx, by, 66, ba, None, 0., ACC)
        text(c, 'trade association', bx, 300, 26, 800, WHITE, ba, 'c')
        for k, ang in enumerate((150, 210, 330, 30)):
            r = math.radians(ang); mx_, my_ = bx + 170 * math.cos(r), by + 70 * math.sin(r)
            ma = ba * seg(t, SPECIAL5 - .3 + .12 * k, SPECIAL5 + .1 + .12 * k)
            if ma <= 0: continue
            c.drawCircle(mx_, my_, 26, paint('#0d1530', ma)); c.drawCircle(mx_, my_, 26, paint(ACC, .8 * ma, stroke=2))
            icon(c, 'person', mx_, my_, .52, ACC, ma, 3.4)
            su = ((t - SPECIAL5 - .12 * k) * .7) % 1
            P = np.array([(bx + 66 * math.cos(r), by + 50 * math.sin(r)), (mx_ - 26 * math.cos(r), my_ - 20 * math.sin(r))])
            flowdots(c, P, su, ma * (1 - seg(t, MEMBERS5 + .2, MEMBERS5 + .6)), ACC, 4, 4.)
        text(c, 'special services to members', bx, 540, 22, 700, DIM, ba * seg(t, SPECIAL5, SPECIAL5 + .4), 'c')

CHANGE_T = W('c5', 'changed')

# ---------------------------------------------------------------- c6: the lawyer's free flat
LWX, CPX, FLX, BASE6 = 760, 330, 1190, 505

def _key(c, x, y, a, s=1., ang=0.):
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s)
    c.drawCircle(-18, 0, 13, paint(GOLD, a, stroke=6))
    c.drawLine(-5, 0, 30, 0, paint(GOLD, a, stroke=6))
    c.drawLine(22, 0, 22, 10, paint(GOLD, a, stroke=5)); c.drawLine(30, 0, 30, 12, paint(GOLD, a, stroke=5))
    c.restore()

def _c6(c, t):
    a = seg(t, C6 - .1, C6 + .4) * (1 - seg(t, C7 - .5, C7 + .1))
    if a <= 0: return
    _pill(c, 960, 214, 'benefits in kind count too', GOLD, a * seg(t, KIND6 - .3, KIND6 + .2, back), 26, .2)
    ca = a * seg(t, COMPANY6 - .3, COMPANY6 + .1)
    building(c, CPX, BASE6, .62, ca, 2)
    text(c, 'a company', CPX, BASE6 + 34, 24, 800, DIM, ca, 'c')
    la = a * seg(t, LAWYER6 - .35, LAWYER6 + .1)
    if la > 0:
        rise = 30 * (1 - seg(t, LAWYER6 - .35, LAWYER6 + .4, eout))
        person(c, LWX, BASE6 + rise, .9, la, 'ca', t, look=lerp(-.5, .5, seg(t, FLAT6, FLAT6 + .6)), mood=.4, col='#1b1d24')
        c.drawRect(skia.Rect.MakeXYWH(LWX - 9, BASE6 - 92, 7, 22), paint(WHITE, .9 * la))   # advocate's bands
        c.drawRect(skia.Rect.MakeXYWH(LWX + 2, BASE6 - 92, 7, 22), paint(WHITE, .9 * la))
        text(c, 'its lawyer', LWX, BASE6 + 34, 24, 800, DIM, la, 'c')
    fa = a * seg(t, FLAT6 - .35, FLAT6 + .1)
    if fa > 0:
        flats(c, FLX, BASE6, .52, fa, 6, t)
        text(c, 'a free flat', FLX, BASE6 + 34, 24, 800, DIM, fa, 'c')
    # the key: company -> lawyer
    ku = seg(t, FLAT6 - .1, FLAT6 + .7)
    if 0 < ku < 1.01 and t < VALUE6:
        x, y = _arc((CPX + 60, BASE6 - 160), (LWX - 100, BASE6 - 150), ease(ku), 90)
        _key(c, x, y, a, 1., ku * 360 * 0 - 20)
    elif t >= FLAT6 + .7:
        _key(c, LWX - 100, BASE6 - 150, a * (1 - seg(t, VALUE6 - .3, VALUE6)), 1., -20)
    # legal work: lawyer -> company
    wu = seg(t, LEGAL6 - .2, LEGAL6 + .6)
    if 0 < wu < 1:
        x, y = _arc((LWX - 60, BASE6 - 110), (CPX + 40, BASE6 - 110), ease(wu), 70)
        c.drawRRect(rrect(x - 22, y - 28, 44, 56, 5), paint(CREAM, a))
        for j in range(3): c.drawLine(x - 13, y - 14 + 12 * j, x + 13, y - 14 + 12 * j, paint(INK, .6 * a, stroke=2))
    wa = a * win(t, LEGAL6 - .1, VALUE6 + .5, .3, .5)
    if wa > 0: text(c, 'legal work ←', (CPX + LWX) / 2, BASE6 - 230, 24, 700, ACC, wa, 'c')
    # the value of the flat: a tag that drops into the net
    ta = a * seg(t, VALUE6 - .25, VALUE6 + .35, back)
    t5 = CATCH[I_BEN][3]
    if ta > 0 and t < t5:
        price_tag(c, SRC[I_BEN][0], SRC[I_BEN][1], '₹ value of the flat', GOLD, ta, 25, -6)
    pa = a * seg(t, PROF6 - .3, PROF6 + .2) * (1 - seg(t, C7 - .6, C7 - .1))
    if pa > 0:
        text(c, "= the lawyer's", 1560, 392, 27, 800, GOLD, pa, 'c', shadow=6)
        text(c, 'professional income', 1560, 428, 27, 800, GOLD, pa, 'c', shadow=6)

# ---------------------------------------------------------------- c7: a partner's pay from the firm
FMX, FMY = 300, 420                                         # firm box centre
PTX, BASE7 = 760, 505
BARX, BARY, BARW = 1010, 330, 540

def _firm(c, x, y, a):
    if a <= 0: return
    w, h = 250, 190
    c.drawRRect(rrect(x - w / 2 + 6, y - h / 2 + 12, w, h, 18), paint(BLACK, .45 * a, blur=14))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 18), paint('#0d1530', .96 * a))
    c.drawRRect(rrect(x - w / 2, y - h / 2, w, h, 18), paint(BLUE, .85 * a, stroke=2.2))
    icon(c, 'building', x, y - 26, 1.0, BLUE, a, 3.4)
    text(c, 'the firm', x, y + 56, 30, 800, WHITE, a, 'c')

def _c7(c, t):
    a = seg(t, C7 - .1, C7 + .4) * (1 - seg(t, C8 - .5, C8 + .1))
    if a <= 0: return
    _firm(c, FMX, FMY, a * seg(t, C7 - .2, C7 + .3))
    pa = a * seg(t, C7, C7 + .4)
    person(c, PTX, BASE7, .9, pa, 'rohan', t, mood=.5, look=-.4)
    text(c, 'a partner', PTX, BASE7 + 34, 24, 800, DIM, pa, 'c')
    names = ('salary', 'bonus', 'commission', 'interest')
    t6 = CATCH[I_PART][3]
    for k, (nm, ts) in enumerate(zip(names, PAYT7)):
        u = seg(t, ts - .25, ts + .45)
        if u <= 0 or t > t6 + .2: continue
        tx, ty = PTX - 200 + 0 * k, 286 + 52 * k
        tx = 1000 if False else tx
        x, y = _arc((FMX + 110, FMY - 30), (PTX + 190, 270 + 56 * k), ease(u), 60)
        aa = a * (1 - seg(t, t6 - .1, t6 + .2))
        coin(c, x - 70, y, 16, aa, GOLD)
        pw = text_w(nm, 22, 800) + 22 * 1.3
        _pill(c, x - 44 + pw / 2, y, nm, GOLD, aa * seg(u, .3, 1), 22, .22)
    # only the part allowed to the firm
    ba = a * seg(t, ONLY7 - .3, ONLY7 + .2)
    if ba > 0:
        sp = seg(t, ONLY7 + .1, DEDUCT7 + .2)
        aw = BARW * .72
        text(c, 'what the firm paid him', BARX, BARY - 22, 24, 700, DIM, ba)
        c.drawRRect(rrect(BARX, BARY, BARW, 44, 12), paint('#475569', .8 * ba))
        c.drawRRect(rrect(BARX, BARY, aw * sp, 44, 12), paint(GREEN, .85 * ba))
        if sp > .05:
            c.drawLine(BARX + aw, BARY - 8, BARX + aw, BARY + 52, paint(WHITE, .9 * ba * sp, stroke=2.4))
            text(c, 'allowed to the firm', BARX + aw / 2, BARY + 30, 23, 800, '#052e16', ba * sp, 'c')
            text(c, 'the rest', BARX + aw + (BARW - aw) / 2, BARY + 30, 22, 800, WHITE, ba * sp, 'c')
            text(c, '→ his business income', BARX, BARY + 84, 24, 800, GREEN, ba * seg(t, DEDUCT7 - .2, DEDUCT7 + .3))
    # his share of profit: exempt
    sa = a * seg(t, SHARE7 - .3, SHARE7 + .1)
    if sa > 0:
        su = seg(t, SHARE7 - .1, EXEMPT7 + .2)
        x, y = _arc((FMX + 100, FMY + 40), (1690, 396), ease(su), 120)
        shx, shy, shw = 1580, 422, 220
        c.drawRRect(rrect(shx, shy, shw, 16, 6), paint('#8b6b45', sa))
        c.drawRRect(rrect(shx + 10, shy + 16, 10, 40, 3), paint('#6b5236', sa)); c.drawRRect(rrect(shx + shw - 20, shy + 16, 10, 40, 3), paint('#6b5236', sa))
        coin(c, x, y, 26, sa, GOLD)
        text(c, 'share of profit', x, y - 40, 23, 800, WHITE, sa, 'c')
        ea = sa * seg(t, EXEMPT7 - .2, EXEMPT7 + .3, back)
        if ea > 0:
            _pill(c, 1610, 290, 'exempt', ACC, ea, 26, .22)
            sec(c, 1750, 290, '10(2A)', sa * seg(t, SEC7 - .2, SEC7 + .3, back), size=24, align='c')

# ---------------------------------------------------------------- c8: three more
S8X = (340, 960, 1590)

def _policy(c, x, y, a):
    if a <= 0: return
    w, h = 190, 236
    _paper(c, x - w / 2, y - h / 2, w, h, a)
    c.drawRect(skia.Rect.MakeXYWH(x - w / 2, y - h / 2, w, 46), paint('#1e3a8a', .9 * a))
    text(c, 'INSURANCE', x, y - h / 2 + 30, 18, 800, WHITE, a, 'c', track=2)
    ftext(c, 'Keyman', x, y - 34, 26, SERIF, INK, a, 'c', 700)
    ftext(c, 'policy', x, y - 6, 22, SERIF, INK, a, 'c', 700)
    for j in range(4): c.drawLine(x - 70, y + 24 + 18 * j, x + 70 - 30 * (j % 2), y + 24 + 18 * j, paint('#8a8068', .7 * a, stroke=1.4))

def _c8(c, t):
    a = seg(t, C8 - .1, C8 + .35) * (1 - seg(t, C9 - .5, C9 + .1))
    if a <= 0: return
    for k, x in enumerate(S8X):
        da = a * seg(t, MORE8 - .2 + .15 * k, MORE8 + .2 + .15 * k)
        if da <= 0: continue
        p = paint(DIM, .3 * da, stroke=2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 8], 0))
        c.drawRRect(rrect(x - 190, 238, 380, 300, 20), p)
        text(c, str(k + 1), x - 166, 276, 26, 800, DIM, da * .7, 'c')
    # 1 keyman policy
    ka = a * seg(t, KEYMAN8 - .35, KEYMAN8 + .1)
    t7 = CATCH[I_KEY][3]
    if ka > 0:
        _policy(c, S8X[0], 400, ka)
        if t < t7:
            for j in range(3): coin(c, S8X[0] + 110, 470 - 30 * j, 18, ka * seg(t, POLICY8 - .2 + .1 * j, POLICY8 + .1 * j), GOLD)
        text(c, 'money received on it', S8X[0], 568 - 40, 22, 700, DIM, ka * 0, 'c')
    # 2 stock -> capital asset at market value
    sa = a * seg(t, MARKET8 - .35, MARKET8 + .1)
    if sa > 0:
        mu = seg(t, CAPITAL8 - .3, CAPITAL8 + .5)
        boxes(c, S8X[1] - 20, 500, .95, sa * (1 - mu))
        oven(c, S8X[1] - 20, 500, .72, sa * mu, t, on=mu)
        la = sa * seg(t, STOCK8 - .2, STOCK8 + .2)
        text(c, 'stock' if mu < .5 else 'capital asset', S8X[1] - 20, 276 + 0, 26, 800, WHITE, la, 'c')
        ta = sa * seg(t, MARKET8 - .2, MARKET8 + .4, back)
        if ta > 0 and t < CATCH[I_STOCK][3]: price_tag(c, S8X[1] + 112, 340, 'market value', GOLD, ta, 22, 8)
    # 3 money from a 35AD asset
    ca = a * seg(t, ASSET8 - .4, ASSET8 + .1)
    if ca > 0:
        cold_store(c, S8X[2], 470, .55, ca, t, 'COLD STORAGE')
        da = ca * seg(t, WHOLE8 - .2, WHOLE8 + .3, back)
        if da > 0:
            _pill(c, S8X[2] - 60, 264, 'whole cost deducted', GREEN, da, 22, .2)
            sec(c, S8X[2] + 148, 264, '35AD', ca * seg(t, AD8 - .2, AD8 + .3, back), size=22, align='c')
        if t < CATCH[I_35][3]:
            coin(c, S8X[2] + 120, 400, 20, ca * seg(t, WHOLE8 - .9, WHOLE8 - .5), GOLD)

# ---------------------------------------------------------------- c9: the house slips out
HPX, HPY, HPS = 1520, 196, .72                              # the House property drawer (scaled heads5 drawer 1)
HDW = (1520 - 72) / 5

def _hp_drawer(c, t, a, glow):
    if a <= 0: return
    c.save(); c.translate(HPX, HPY); c.scale(HPS, HPS)
    c.clipRect(skia.Rect.MakeXYWH(-14, -26, HDW + 28, 420), True)
    heads5(c, -(HDW + 18), 0, 1520, a, {1: glow} if glow > 0 else None, t, {1: seg(t, RESID9, RESID9 + .6)}, 330)
    c.restore()

def _house(c, x, y, s, a, ang=0.):
    """A small residential house (bottom centre) with a TO LET board."""
    if a <= 0: return
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s)
    c.drawRRect(rrect(-100, -4, 200, 10, 4), paint(BLACK, .35 * a, blur=6))
    c.drawRect(skia.Rect.MakeXYWH(-90, -130, 180, 130), paint('#e8dcc6', a))
    c.drawPath(poly(np.array([(-112, -126), (0, -210), (112, -126)])), _roofp(a))
    c.drawRect(skia.Rect.MakeXYWH(-22, -76, 44, 76), paint('#7c4a2d', a))
    for wx in (-70, 34): c.drawRect(skia.Rect.MakeXYWH(wx, -108, 36, 32), paint('#ffd27a', .9 * a))
    c.drawRect(skia.Rect.MakeXYWH(-90, -130, 180, 130), paint('#a08a6b', a, stroke=1.6, cap=False))
    c.drawRRect(rrect(60, -60, 74, 34, 5), paint(WHITE, a)); c.drawRRect(rrect(60, -60, 74, 34, 5), paint(RED, a, stroke=2))
    text(c, 'TO LET', 97, -37, 15, 800, RED, a, 'c')
    c.restore()

def _roofp(a):
    p = paint('#9a3412', a); p.setPathEffect(skia.CornerPathEffect.Make(6)); return p

def _c9(c, t):
    a = seg(t, C9 - .1, C9 + .4) * (1 - seg(t, C10 - .4, C10 + .2))
    if a <= 0: return
    ha = a * seg(t, C9 - .1, C9 + .4)
    hit = RESID9 + .55
    _hp_drawer(c, t, a * seg(t, SLIPS9 - .3, SLIPS9 + .2), win(t, HP9 - .3, C10 - .3, .3, .5))
    hl = a * seg(t, SLIPS9 - .1, SLIPS9 + .3)
    text(c, 'House property', HPX + HDW * HPS / 2, HPY + 330 * HPS + 40, 24, 800, ACC, hl * 0, 'c')
    # path: stage -> down onto the net -> bounces off -> up into the drawer mouth
    mouth = (HPX + HDW * HPS / 2, HPY + 30 * HPS + 20)
    if t < hit:
        u = seg(t, RENT9 + .3, hit, ein)
        x, y = lerp(900, 980, u), lerp(470, NR + 8, u); ang = 0.
    else:
        u = seg(t, hit, HP9 + .1)
        x, y = _arc((980, NR + 8), mouth, ease(u), 260); ang = 20 * math.sin(math.pi * u)
    sc = .95 * (1 - .55 * seg(t, HP9 - .4, HP9 + .1))
    va = ha * (1 - seg(t, HP9 - .05, HP9 + .15))
    _house(c, x, y, sc, va, ang)
    # rent coins circling the house (before it falls)
    if t < hit:
        for k in range(3):
            an = (t - C9) * 2.4 + k * 2.1
            coin(c, x + 130 * math.cos(an) * sc, y - 100 * sc + 40 * math.sin(an) * sc, 14, ha * seg(t, RENT9 - .2, RENT9 + .3), GOLD)
    la = ha * seg(t, RESID9 - .3, RESID9 + .2) * (1 - seg(t, hit - .1, hit + .3))
    if la > 0: _pill(c, 900, 230, 'rent from letting out a residential house', ACC, la, 25, .2)
    sa = a * win(t, hit - .05, HP9 + .6, .1, .5)
    if sa > 0:
        _pill(c, 980, NR - 64, 'slips out of the net', RED, sa, 24, .22)
    pa = a * seg(t, HP9 - .2, HP9 + .3, back)
    if pa > 0:
        _pill(c, HPX + HDW * HPS / 2, HPY + 330 * HPS + 40, '= income from house property', ACC, pa, 23, .22)
    ea = a * seg(t, EVEN9 - .25, EVEN9 + .3, back)
    if ea > 0:
        _pill(c, HPX + HDW * HPS / 2 - 40, HPY + 330 * HPS + 100, 'even if letting is your business', ORANGE, ea, 22, .2)

# ---------------------------------------------------------------- c10: check — below the card
def _mini_net(c, x, y, a, glow=0.):
    if a <= 0: return
    w = 220
    P = poly(np.array([(x - w / 2, y)] + [(x + w / 2 * math.cos(th), y + 70 * math.sin(th)) for th in np.linspace(math.pi, 0, 24)][1:]))
    c.drawPath(P, paint('#0b1226', .7 * a))
    c.save(); c.clipPath(P, True)
    for i in range(-8, 14):
        bx = x - w / 2 + i * 22
        c.drawLine(bx, y, bx + 70, y + 80, paint('#9fb3d1', .35 * a, stroke=1.4))
        c.drawLine(bx, y, bx - 70, y + 80, paint('#9fb3d1', .35 * a, stroke=1.4))
    c.restore()
    if glow > 0: c.drawPath(P, paint(GOLD, .5 * a * glow, stroke=8, blur=8))
    c.drawLine(x - w / 2, y, x + w / 2, y, paint('#c9a46b', a, stroke=5))
    sec(c, x, y, '28', a, size=24, align='c')

def _c10(c, t):
    a = seg(t, C10 - .2, C10 + .4) * (1 - seg(t, CE - .4, CE + .3))
    if a <= 0: return
    y = 880
    cr = seg(t, CANCEL10 - .1, CANCEL10 + .5)
    ba = a * seg(t, AGENCY10 - .3, AGENCY10 + .2)
    _badge(c, 700, y, 80, ba * (1 - .3 * cr), 'AGENCY', cr, ORANGE)
    if cr > 0: text(c, 'cancelled', 700, y + 112, 23, 800, RED, ba * cr, 'c')
    eu = seg(t, EIGHT10 - .3, EIGHT10 + .4, back)
    du = seg(t, CAUGHT10 - .1, CAUGHT10 + .7)
    if eu > 0:
        ex, ey = (lerp(820, 960, eu), y + 5 * math.sin((t - EIGHT10) * 2.4)) if du <= 0 else _arc((960, y), (1240, y + 6), ease(du), 90)
        ea = a * seg(t, EIGHT10 - .3, EIGHT10) * (1 - seg(du, .8, 1))
        _envelope(c, ex, ey, ea, rupee(800000), 1.0, -4 + 4 * du)
        text(c, 'compensation', ex, ey - 72, 22, 800, GOLD, ea * (1 - du), 'c')
    na = a * seg(t, BUS10A - .3, BUS10A + .2)
    _mini_net(c, 1240, y - 20, na, win(t, CAUGHT10 + .5, CE, .2, .5))
    ca = a * seg(t, CAUGHT10 + .5, CAUGHT10 + .9)
    if ca > 0: _tag(c, 1240, y + 18, 'Compensation', 'cash', ca, 0., GOLD)

def _falling(c, t):
    """Tags in flight, drawn over the stage."""
    for i, (lab_, ic, row, t0) in enumerate(CATCH):
        if not (t0 <= t < t0 + DROP): continue
        x, y, _ = _fall(t, i, SRC[i])
        _tag(c, x, y, lab_, ic, seg(t, t0, t0 + .15), 0.)

def ch_c(c, t):
    if t < CS - .5 or t > CE + .5: return
    _promise(c, t)
    _card_stage(c, t)
    _net(c, t)
    _noncompete(c, t)
    _c5(c, t)
    _c6(c, t)
    _c7(c, t)
    _c8(c, t)
    _c9(c, t)
    _c10(c, t)
    _falling(c, t)
