"""Chapter R — The TDS traps (section 40(a)).
r1 hook: Meera pays a chef-consultant (white jacket, toque); notes stream from her to him; the "Chef-consultant fee
   ₹1,50,000" invoice pops on "one lakh fifty"; a "TDS deducted: nil" box flashes red on "forgets to deduct TDS"; the
   cost gets a green "real business cost" tick; her "deduction claimed" bar shows a pulsing red cut line and a "?".
r2 the government follows the money: an Income-tax Department building; normally a TDS slice flows from payer to the
   department, and a magnifier follows the trail to the payee ("income on record"); without TDS the slice route breaks
   (✕) and the trail goes cold ("?"); the law holds back part of her deduction (a padlocked segment, "until she does").
r3 (NAME IT) two lanes: resident payee — a 30% slice of the expense bar is cut off red, § 40(a)(ia); non-resident payee —
   the whole bar turns red, 100%, § 40(a)(i).
r4 (EXAMPLE) the resident bar becomes the chef's fee ₹1,50,000; the 30% slice rolls to ₹45,000 and drops into a sheet
   row "Add: 30% of ₹1,50,000 [40(a)(ia)]"; a this-year / next-year strip: TDS deducted and paid next year moves the
   ₹45,000 into next year, green "allowed next year".
r5 a P.Y. 2025-26 bar extends to 31 Oct 2026 (Meera's return due date, tax audit); TDS deducted in the year can be paid
   any time up to the due date u/s 139(1) — a coin travels into the grace zone, "paid by then → allowed this year".
r6 the escape: the payee's checklist (filed his return · included the income · paid the tax) ticks; Meera's bill is
   stamped DEEMED DEDUCTED "on the date of his return"; an accountant (CA) appears with a certificate.
r7 trap: the PGBP machine; an "Income-tax" bill (+ surcharge, + cess) tries the hopper and bounces — "never a business
   expense" [40(a)(ii)]; a loop arrow "tax on this profit" can't come back as a deduction (✕).
r8 an employer's bill "Tax on staff perks" (a non-cash perk gift icon over the employee) also bounces — 40(a)(v).
r9 exam: a calm summary card of § 40(a): resident 30% (not deducted / not paid by the 139(1) due date, highlighted in
   step with the words) · non-resident 100% · income-tax, surcharge, cess never · tax on non-cash perks never.
r10 check: the card asks only "How much is disallowed?", so above it "Company pays salary ₹14,00,000 · TDS not
   deducted"; below it the salary bar; on the answer its 30% slice turns red and ₹4,20,000 rolls up.
"""
from scenes.common import *
import props as PR

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

RS, RE = B.span('r')
R1, R2, R3, R4, R5, R6, R7, R8, R9, R10 = (T('r%d' % i) for i in range(1, 11))
R10A = TA('r10')

def _wa(cue, n, fb, occ=0):
    try: return Wd(cue, n, occ)
    except Exception: return fb

# ---------------------------------------------------------------- word times
PAYS1, CHEF1, ONE1, RUP1, FORGETS1, TDS1, COST1, REAL1, WHY1, CUT1 = (
    W('r1', 'pays'), W('r1', 'chef'), W('r1', 'one'), W('r1', 'rupees'), W('r1', 'forgets'), W('r1', 'TDS'),
    W('r1', 'cost'), W('r1', 'real'), W('r1', 'why'), W('r1', 'cut'))
TAX2, SOURCE2, GOVT2, FOLLOWS2, MONEY2, IF2, DEDUCT2, HOLDS2, PART2, UNTIL2 = (
    W('r2', 'tax'), W('r2', 'source'), W('r2', 'government'), W('r2', 'follows'), W('r2', 'money'), W('r2', 'if'),
    W('r2', 'deduct'), W('r2', 'holds'), W('r2', 'part'), W('r2', 'until'))
RES3, THIRTY3, DIS3, SEC3, NON3, SEC3B, HUND3 = (W('r3', 'resident'), W('r3', 'thirty'), W('r3', 'disallowed'),
                                                 W('r3', 'section'), W('r3', 'non'), W('r3', 'section', occ=1),
                                                 W('r3', 'hundred'))
THIRTY4, ONE4, FORTY4, ADDED4, DEDUCTS4, NEXT4, FORTY4B, ALLOWED4 = (
    W('r4', 'thirty'), W('r4', 'one'), W('r4', 'forty'), W('r4', 'added'), W('r4', 'deducts'), W('r4', 'next'),
    W('r4', 'forty', occ=1), W('r4', 'allowed'))
DEADLINE5, GEN5, DEDUCTED5, PAID5, BEFORE5, DUE5, RETURN5, SEC5 = (
    W('r5', 'deadline'), W('r5', 'generous'), W('r5', 'deducted'), W('r5', 'paid'), W('r5', 'before'), W('r5', 'due'),
    W('r5', 'return'), W('r5', 'section'))
ESC6, PAYEE6, FILED6, INCL6, PAID6, TREATED6, DATE6, ACCT6, CERT6 = (
    W('r6', 'escape'), W('r6', 'payee'), W('r6', 'filed'), W('r6', 'included'), W('r6', 'paid'), W('r6', 'treated'),
    W('r6', 'date'), W('r6', 'accountant'), W('r6', 'certify'))
SEC7, INC7, NEVER7, EXP7, SUR7, CESS7, DEDUCT7, PROFIT7 = (
    W('r7', 'section'), W('r7', 'income'), W('r7', 'never'), W('r7', 'expense'), W('r7', 'surcharge'),
    W('r7', 'cess'), W('r7', 'deduct'), W('r7', 'profit'))
EMPLOYER8, TAX8, EMPLOYEE8, NON8, PERKS8, ISNT8, DED8 = (
    W('r8', 'employer'), W('r8', 'tax'), W('r8', 'employee'), W('r8', 'non'), W('r8', 'perks'), W('r8', 'isn'),
    W('r8', 'deductible'))
WRITE9, THIRTY9, PAYABLE9, RES9, DIS9, NOT9, SAME9, PAID9, DUE9 = (
    W('r9', 'write'), W('r9', 'thirty'), W('r9', 'payable'), W('r9', 'resident'), W('r9', 'disallowed'),
    W('r9', 'not'), W('r9', 'same'), W('r9', 'paid'), W('r9', 'due'))
COMPANY10, FOURTEEN10, WITHOUT10, TDS10 = W('r10', 'company'), W('r10', 'fourteen'), W('r10', 'without'), W('r10', 'TDS')
A_THIRTY = _wa('r10a', 'thirty', R10A); A_FOUR = _wa('r10a', 'four', R10A + 1.4)

# ---------------------------------------------------------------- SFX (≤ 25)
for tt, k in ((PAYS1, 'whoosh'), (ONE1, 'pop'), (TDS1, 'warn'), (REAL1, 'ok'), (CUT1, 'snip'),
              (FOLLOWS2, 'whoosh'), (DEDUCT2, 'error'), (HOLDS2 + .3, 'key'),
              (THIRTY3 + .2, 'snip'), (DIS3, 'error'), (HUND3, 'error'),
              (FORTY4, 'tick'), (ADDED4, 'flip'), (ALLOWED4, 'ok'),
              (GEN5, 'whoosh'), (DUE5, 'chime_lo'),
              (FILED6, 'tick'), (PAID6, 'tick'), (TREATED6 + .2, 'thunk'), (CERT6, 'ok'),
              (NEVER7, 'error'), (ISNT8, 'error'),
              (A_THIRTY, 'snip'), (A_FOUR, 'tick')):
    _ev(tt, k)

# ---------------------------------------------------------------- cast + small art
CAST.setdefault('r_chef', dict(skin='#9a6644', hair='#1c140f', body='#f8fafc', neck='mandarin', style='short',
                               moustache='trim'))

def _box(c, x, y, w, h, col, a, fill=-.8, glow=0., r=18, sw=2.):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .38 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shader=lgrad((0, y), (0, y + h), [shade(col, fill), '#0a0f1f']), a=a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=7, blur=9))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, .85 * a, stroke=sw))

def _arc(p0, p1, lift, u):
    return lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) - lift * math.sin(math.pi * u)

def _chef(c, x, y, s, a, t, look=0., mood=.4):
    """The chef-consultant: a white-jacket bust with buttons and a toque."""
    if a <= 0: return
    person(c, x, y, s, a, 'r_chef', t, look=look, mood=mood)
    hx = clamp(look, -1, 1) * 3 * 1.15
    with PR._fade(c, a, (x - 140 * s, y - 320 * s, x + 140 * s, y + 20 * s)):
        c.save(); c.translate(x, y); c.scale(s, s)
        for bx in (-14, 14):
            for by in (-74, -48, -22): c.drawCircle(bx, by, 3.4, paint('#94a3b8'))
        c.translate(hx, 0)
        p = skia.Path()
        for cx, cy, r in ((-25, -236, 23), (0, -252, 28), (25, -236, 23)): p.addCircle(cx, cy, r)
        p.addRRect(rrect(-40, -236, 80, 24, 6))
        c.drawPath(p, paint('#ffffff')); c.drawPath(p, paint('#cbd5e1', stroke=1.4))
        c.drawRRect(rrect(-40, -226, 80, 26, 6), paint('#f1f5f9')); c.drawRRect(rrect(-40, -226, 80, 26, 6), paint('#cbd5e1', stroke=1.4))
        c.restore()

def _office_pic():
    def fn(cv):
        cv.drawRect(skia.Rect(-170, -18, 170, 6), paint(BLACK, .4, blur=10))
        cv.drawPath(poly(np.array([(0, -210), (-160, -150), (160, -150)])), paint('#cfd6e4'))
        cv.drawPath(poly(np.array([(0, -196), (-128, -156), (128, -156)])), paint('#aab4c8'))
        cv.drawCircle(0, -170, 13, paint('#1e2a4a')); cv.drawCircle(0, -170, 13, paint(GOLD, stroke=2))
        cv.drawRect(skia.Rect(-150, -150, 150, -128), paint('#e2e8f0'))
        for k in range(5):
            x0 = -118 + 54 * k
            cv.drawRect(skia.Rect(x0, -128, x0 + 20, -26), paint(shader=lgrad((x0, 0), (x0 + 20, 0), ['#b9c3d6', '#eef2f7', '#b9c3d6'])))
        cv.drawRect(skia.Rect(-150, -26, 150, -12), paint('#cbd5e1')); cv.drawRect(skia.Rect(-165, -12, 165, 0), paint('#aab4c8'))
        text(cv, 'INCOME-TAX DEPARTMENT', 0, -134, 13, 800, '#1e2a4a', 1, 'c', track=1.4)
    return PR._pic(('r_office',), fn, (-190, -230, 380, 250))

def _office(c, x, y, a, s=1.):
    if a > 0: PR._play(c, _office_pic(), x, y, s, a)

def _bar(c, x, y, w, h, a, cut=0., cut_col=RED, frac=.3, sep=0., full_red=0., label=None, lcol=WHITE, base=ACC):
    """An expense bar with a right-hand slice of `frac` that separates (sep px) and turns cut_col by `cut`."""
    if a <= 0: return
    xs = x + w * (1 - frac)
    body = mixc(base, RED, full_red)
    c.drawRRect(rrect(x, y + 6, w, h, 12), paint(BLACK, .35 * a, blur=10))
    if cut <= 0 and sep <= 0 and full_red <= 0:              # still one piece: no hint of the slice yet
        c.drawRRect(rrect(x, y, w, h, 12), paint(shade(body, -.55), a))
        c.drawRRect(rrect(x, y, w, h, 12), paint(body, .9 * a, stroke=2))
        if label: text(c, label, x + 22, y + h / 2 + 9, 26, 700, lcol, a)
        return xs
    c.drawRRect(rrect(x, y, xs - x, h, 12), paint(shade(body, -.55), a))
    c.drawRRect(rrect(x, y, xs - x, h, 12), paint(body, .9 * a, stroke=2))
    sc = mixc(base, cut_col, cut) if full_red < 1 else RED
    if frac > 0:
        c.drawRRect(rrect(xs + sep, y + sep * .4, x + w - xs, h, 12), paint(shade(mixc(sc, RED, full_red), -.45), a))
        c.drawRRect(rrect(xs + sep, y + sep * .4, x + w - xs, h, 12), paint(mixc(sc, RED, full_red), .95 * a, stroke=2))
    if label: text(c, label, x + 22, y + h / 2 + 9, 26, 700, lcol, a)
    return xs

# ---------------------------------------------------------------- r1 / r2: the payment and the trail
MX, CHX, PY_ = 330, 1590, 780                              # Meera, chef, their busts' feet
BLX, BLY = 960, 395

def _people(c, t):
    a = seg(t, RS, RS + .6) * (1 - seg(t, R3 - .6, R3 - .1))
    if a <= 0: return
    person(c, MX, PY_, 1.0, a, 'meera', t, mood=.4, look=.4)
    text(c, 'Meera · payer', MX, PY_ + 34, 24, 700, DIM, a, 'c')
    ca = a * seg(t, CHEF1 - .3, CHEF1 + .2)
    _chef(c, CHX, PY_, 1.0, ca, t, look=-.4)
    text(c, 'chef-consultant · payee', CHX, PY_ + 34, 24, 700, DIM, ca, 'c')
    # notes stream (full amount paid, no TDS held back)
    na = a * seg(t, PAYS1 - .2, PAYS1 + .3) * (1 - .6 * seg(t, R2 - .4, R2))
    if na > 0:
        for k in range(6):
            ph = ((t - PAYS1) / 1.8 + k / 6) % 1
            if t < PAYS1 + k * .3: continue
            x, y = _arc((MX + 110, 580), (CHX - 110, 580), 30, ph)
            notes(c, x, y, na * seg(ph, 0, .12) * (1 - seg(ph, .88, 1)), 1, .34, -8 + 16 * ph)

def _r1(c, t):
    a = seg(t, ONE1 - .3, ONE1 + .2) * (1 - seg(t, R2 - .5, R2 + .1))
    if a > 0:
        u = seg(t, ONE1 - .3, ONE1 + .35, back)
        bill(c, BLX, BLY, a * seg(t, ONE1 - .3, ONE1), 'Chef-consultant fee', 150000, 'bank', None, 1.2 * (.8 + .2 * u), -2)
        ra = a * seg(t, REAL1 - .3, REAL1 + .2, back)
        if ra > 0:
            tick(c, BLX + 175, BLY - 70, ra, 20)
            text(c, 'a real business cost', BLX + 205, BLY - 60, 26, 800, GREEN, ra)
    ta = seg(t, FORGETS1 - .3, FORGETS1 + .2) * (1 - seg(t, R3 - .6, R3 - .1))
    if ta > 0:
        rd = seg(t, TDS1 - .1, TDS1 + .3)
        y0 = 596 if t < R2 - .4 else lerp(596, 300, seg(t, R2 - .4, R2 + .4))
        x0 = 960 if t < R2 - .4 else lerp(960, 440, seg(t, R2 - .4, R2 + .4))
        w = 420
        c.drawRRect(rrect(x0 - w / 2, y0, w, 64, 14), paint('#0b1124', .92 * ta))
        p = paint(mixc(DIM, RED, rd), .9 * ta, stroke=2.2, cap=False); p.setPathEffect(skia.DashPathEffect.Make([10, 7], 0))
        c.drawRRect(rrect(x0 - w / 2, y0, w, 64, 14), p)
        text(c, 'TDS deducted:', x0 - w / 2 + 24, y0 + 42, 28, 700, WHITE, ta)
        text(c, 'nil', x0 + w / 2 - 24, y0 + 42, 30, 800, mixc(DIM, RED, rd), ta, 'r')
        if rd > 0: cross(c, x0 + w / 2 + 30, y0 + 32, ta * seg(t, TDS1, TDS1 + .3, back), 18)
        if rd > 0 and t < R2: c.drawRRect(rrect(x0 - w / 2 - 4, y0 - 4, w + 8, 72, 16), paint(RED, .5 * ta * win(t, TDS1, TDS1 + 1.4, .1, .8), stroke=6, blur=8))
    _deduction(c, t)

def _deduction(c, t):
    a = seg(t, WHY1 - .3, WHY1 + .2) * (1 - seg(t, R3 - .6, R3 - .1))
    if a <= 0: return
    x, y, w, h = 660, 736, 600, 46
    held = seg(t, HOLDS2 - .1, HOLDS2 + .5)
    xs = x + w * .7
    c.drawRRect(rrect(x, y, w, h, 12), paint(shade(GREEN, -.6), a))
    c.drawRRect(rrect(x, y, w, h, 12), paint(GREEN, .85 * a, stroke=2))
    text(c, 'her deduction', x + 20, y + 32, 24, 700, WHITE, a)
    if held > 0:
        c.drawRRect(rrect(xs, y, x + w - xs, h, 12), paint(shade(ORANGE, -.5), a * held))
        c.drawRRect(rrect(xs, y, x + w - xs, h, 12), paint(ORANGE, .95 * a * held, stroke=2.4))
        padlock(c, xs + (x + w - xs) / 2, y + h / 2 + 4, 1.0, ORANGE, a * held, 0.)
        text(c, 'held back', xs - 30, y - 14, 24, 800, ORANGE, a * held)
        ua = a * seg(t, UNTIL2 - .2, UNTIL2 + .3)
        text(c, 'until she deducts', xs - 30 + text_w('held back ', 24, 800), y - 14, 24, 700, ORANGE, ua)
    else:
        cu = win(t, CUT1 - .2, R2 + .5, .2, .4)
        if cu > 0:
            p = paint(RED, (.55 + .45 * math.sin(t * 7)) * a * cu, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
            c.drawLine(xs, y - 18, xs, y + h + 18, p)
            text(c, '?', xs + 30, y - 10, 40, 800, GOLD, a * cu, 'c')

OFX, OFY = 960, 470
def _trail(c, t):
    a = seg(t, R2 - .2, R2 + .5) * (1 - seg(t, R3 - .6, R3 - .1))
    if a <= 0: return
    _office(c, OFX, OFY, a)
    text(c, 'Income-tax Department', OFX, OFY + 36, 24, 700, DIM, a, 'c')
    broken = seg(t, IF2 - .1, DEDUCT2 + .3)
    # TDS route: payer -> department
    ra = a * seg(t, TAX2 - .1, SOURCE2)
    P0, P1 = (MX + 100, 560), (OFX - 150, 400)
    if ra > 0:
        col = mixc(VIO, RED, broken)
        p = paint(col, .8 * ra, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 9], 0))
        c.drawLine(*P0, *P1, p)
        if broken < .5:
            flowdots(c, [P0, P1], ((t - TAX2) * .7) % 1, ra * (1 - 2 * broken), VIO, 6, 6)
        mx_, my_ = (P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2
        chip(c, mx_ - 40, my_ - 40, 'TDS', mixc(VIO, RED, broken), ra, 24)
        if broken > 0: cross(c, mx_ + 30, my_ + 6, ra * seg(t, DEDUCT2, DEDUCT2 + .3, back), 20)
    # the department follows the money to the payee
    fa = a * seg(t, FOLLOWS2 - .2, FOLLOWS2 + .3)
    Q0, Q1 = (OFX + 150, 400), (CHX - 110, 560)
    if fa > 0:
        u = seg(t, FOLLOWS2 - .2, MONEY2 + .3)
        cut = 1 - .45 * broken
        P = [Q0, (lerp(Q0[0], Q1[0], u * cut), lerp(Q0[1], Q1[1], u * cut))]
        p = paint(mixc(GOLD, DIM, broken), .8 * fa, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([4, 8], 0))
        c.drawLine(*P[0], *P[1], p)
        mx_, my_ = P[1]
        magnifier(c, mx_, my_ - 10, 34, fa, -35)
        oa = fa * seg(t, MONEY2 - .1, MONEY2 + .3) * (1 - broken)
        if oa > 0:
            c.drawCircle(CHX, PY_ - 130, 120, paint(GOLD, .16 * oa, blur=24))
            chip(c, CHX + 20, PY_ - 330, 'his income on record', GOLD, oa, 22)
        qa = fa * broken
        if qa > 0: text(c, '?', CHX + 130, PY_ - 300, 64, 800, RED, qa * (.6 + .4 * math.sin(t * 6)), 'c', shadow=6)

# ---------------------------------------------------------------- r3 / r4: two lanes, then the example
LBX, LBW, LBH = 560, 1240, 70
LAY, LBY = 455, 666                                        # bar tops: resident lane, non-resident lane

def _lanes(c, t):
    a = seg(t, R3 - .55, R3 + .1) * (1 - seg(t, R5 - .6, R5 - .1))
    if a <= 0: return
    ex = seg(t, R4 - .4, R4 + .3)                          # the example takes over lane A
    # lane A · resident
    la = a * seg(t, R3 - .45, R3 + .1)
    if la > 0:
        _box(c, 90, LAY - 70, 1740, 190, ACC, la * (1 - ex), -.88, r=20)
        icon(c, 'person', 150, LAY + 34, .9, ACC, la * (1 - ex))
        text(c, 'resident', 200, LAY + 26, 30, 800, WHITE, la * (1 - ex))
        text(c, 'payee', 200, LAY + 60, 24, 600, DIM, la * (1 - ex))
        sec(c, 200, LAY + 98, '40(a)(ia)', la * seg(t, SEC3 - .2, SEC3 + .3) * (1 - ex), VIO, 22)
        cu = seg(t, THIRTY3 - .1, THIRTY3 + .5)
        sep = 22 * seg(t, THIRTY3 + .2, THIRTY3 + .8, back)
        lab_ = 'expense' if ex < .5 else 'Chef-consultant fee'
        xs = _bar(c, LBX, LAY, LBW, LBH, la, cu, RED, .3, sep, 0., lab_)
        if cu > 0:
            p = paint(RED, la * (1 - seg(t, THIRTY3 + .3, THIRTY3 + .6)), stroke=4)
            c.drawLine(xs, LAY - 16, xs, LAY + LBH + 16, p)
        pa = la * seg(t, THIRTY3, THIRTY3 + .3, back) * (1 - seg(t, FORTY4 - .3, FORTY4))
        text(c, '30%', xs + sep + (LBX + LBW - xs) / 2, LAY + LBH / 2 + 12, 34, 800, WHITE, pa, 'c')
        if ex > 0: text(c, '30%', xs + sep + (LBX + LBW - xs) / 2, LAY - 16, 26, 800, RED, la * ex * seg(t, FORTY4 - .3, FORTY4), 'c')
        da = la * seg(t, DIS3 - .2, DIS3 + .3)
        text(c, 'disallowed', xs + sep + (LBX + LBW - xs) / 2, LAY - 16, 26, 800, RED, da * (1 - ex), 'c')
        text(c, 'allowed', LBX + (xs - LBX) / 2 + 80, LAY - 16, 26, 800, GREEN, da * (1 - ex), 'c')
    # lane B · non-resident
    lb = a * seg(t, NON3 - .5, NON3) * (1 - seg(t, R4 - .5, R4))
    if lb > 0:
        _box(c, 90, LBY - 70, 1740, 190, ACC, lb, -.88, r=20)
        icon(c, 'transfer', 150, LBY + 34, .9, ACC, lb)
        text(c, 'non-resident', 200, LBY + 26, 30, 800, WHITE, lb)
        text(c, 'payee', 200, LBY + 60, 24, 600, DIM, lb)
        sec(c, 200, LBY + 98, '40(a)(i)', lb * seg(t, SEC3B - .2, SEC3B + .3), VIO, 22)
        fr = seg(t, HUND3 - .2, HUND3 + .4)
        _bar(c, LBX, LBY, LBW, LBH, lb, 0., RED, 0., 0., fr, 'expense')
        ha = lb * seg(t, HUND3 - .1, HUND3 + .35, back)
        if ha > 0:
            text(c, '100% disallowed', LBX + LBW / 2, LBY + LBH / 2 + 12, 34, 800, WHITE, ha, 'c')
    _example(c, t, a, ex)

YRX, YRY, YRW, YRH = 560, 690, 1240, 124
ROW4 = [dict(label='Add: 30% of ₹1,50,000 · TDS not deducted', amt=45000, kind='add', sec='40(a)(ia)', t0=ADDED4 - .2)]

def _example(c, t, a, ex):
    ea = a * ex
    if ea <= 0: return
    xs = LBX + LBW * .7
    # amounts on the bar
    ua = ea * seg(t, ONE4 - .2, ONE4 + .2)
    roll(c, 150000, LBX + 46 + text_w('Chef-consultant fee', 26, 700), LAY + LBH / 2 + 12, seg(t, ONE4, ONE4 + .8), 32, GOLD, ua, 'l')
    fa = ea * seg(t, FORTY4 - .2, FORTY4 + .2)
    sep = 22
    if fa > 0:
        sx = xs + sep + (LBX + LBW - xs) / 2
        roll(c, 45000, sx, LAY + LBH / 2 + 12, seg(t, FORTY4, FORTY4 + .8), 32, WHITE, fa, 'c')
        mv = seg(t, ADDED4 - .35, ADDED4 + .15, ein)
        if 0 < mv < 1:
            ftext(c, rupee(45000), lerp(sx, LBX + LBW - 110, mv), lerp(LAY + LBH / 2 + 12, 612, mv), 32, MONO, RED, ea * (1 - mv * .5), 'c')
    sheet(c, LBX, 560, LBW, ROW4, ea * seg(t, ADDED4 - .45, ADDED4 - .2), t)
    # this year / next year
    ya = ea * seg(t, DEDUCTS4 - .5, DEDUCTS4)
    if ya <= 0: return
    hw = (YRW - 30) / 2
    for k, (h1, h2) in enumerate((('this year', 'P.Y. 2025-26'), ('next year', 'P.Y. 2026-27'))):
        x = YRX + k * (hw + 30)
        _box(c, x, YRY, hw, YRH, ACC if k == 0 else GREEN, ya, -.86, glow=.6 * win(t, ALLOWED4 - .2, ALLOWED4 + 1.4, .2, .6) * k, r=16)
        text(c, h1, x + 24, YRY + 40, 28, 800, WHITE, ya)
        text(c, h2, x + 24, YRY + 72, 22, 600, DIM, ya)
    # TDS deducted and paid next year
    ta = ya * seg(t, DEDUCTS4 - .1, DEDUCTS4 + .3, back)
    if ta > 0:
        tw = text_w('TDS deducted + paid', 22, 700) + 28.6
        chip(c, YRX + YRW - 20 - tw / 2, YRY + 34, 'TDS deducted + paid', VIO, ta, 22)
    # the ₹45,000 token: added back this year -> allowed next year
    mu = seg(t, NEXT4 - .1, ALLOWED4 + .2)
    x0, x1 = YRX + hw - 130, YRX + YRW - 130
    x, y = _arc((x0, YRY + 84), (x1, YRY + 88), 50, ease(mu))
    col = mixc(RED, GREEN, seg(t, ALLOWED4 - .2, ALLOWED4 + .3))
    w = ftext_w(rupee(45000), 30, MONO) + 30
    c.drawRRect(rrect(x - w / 2, y - 24, w, 48, 24), paint(shade(col, -.6), ya))
    c.drawRRect(rrect(x - w / 2, y - 24, w, 48, 24), paint(col, ya, stroke=2))
    ftext(c, rupee(45000), x, y + 11, 30, MONO, WHITE, ya, 'c')
    text(c, 'added back this year', YRX + 24, YRY + 106, 24, 800, RED, ya * (1 - .6 * seg(t, ALLOWED4 - .2, ALLOWED4 + .3)))
    aa = ya * seg(t, ALLOWED4 - .1, ALLOWED4 + .4, back)
    if aa > 0:
        tick(c, x1 - w / 2 - 30, YRY + 88, aa, 18)
        text(c, 'allowed next year', YRX + hw + 54, YRY + 106, 24, 800, GREEN, aa)

# ---------------------------------------------------------------- r5: the generous deadline
YBX, YBY, YBW, YBK = 140, 470, 940, .98
DUE = (2026, 10, 31)
DEDDATE = (2026, 2, 16)

def _deadline(c, t):
    a = seg(t, R5 - .4, R5 + .2) * (1 - seg(t, R6 - .5, R6))
    if a <= 0: return
    eu = seg(t, GEN5 - .4, GEN5 + .9)
    da = a * seg(t, DEDUCTED5 - .3, DEDUCTED5 + .2)
    dd = a * seg(t, DUE5 - .3, DUE5 + .2)
    marks = [(DEDDATE, 'TDS deducted', VIO, da), (DUE, '31 Oct · due date of the return', GOLD, dd, 1)]
    spans = [(DEDDATE, DUE, None, GREEN, a * seg(t, PAID5 - .2, BEFORE5 + .3))]
    yearbar(c, YBX, YBY, YBW, a, t, extend=DUE, marks=marks, spans=spans, h=56, ext_u=eu, ext_k=YBK,
            ext_col=GOLD, ext_label='grace till the return', flag_h=40)
    x0 = yearbar_x(YBX, YBW, DEDDATE, extend=DUE, ext_k=YBK)
    x1 = yearbar_x(YBX, YBW, DUE, extend=DUE, ext_k=YBK)
    u = seg(t, PAID5 - .1, RETURN5 + .2)
    if u > 0:
        cx = lerp(x0, x1 - 30, ease(u))
        coin(c, cx, YBY + 28, 18, a * (1 - seg(t, RETURN5 + .3, RETURN5 + .7) * .3), GOLD, '₹', spin=u * 8)
        text(c, 'pay the TDS any time till here', (x0 + x1) / 2 - 40, YBY + 140, 26, 800, GREEN, a * seg(t, BEFORE5 - .2, BEFORE5 + .3), 'c')
    sa = a * seg(t, SEC5 - .2, SEC5 + .3, back)
    if sa > 0:
        sec(c, x1, YBY + 170, '139(1)', sa, VIO, 26, 'c')
        text(c, 'Meera: tax audit case → return due 31 Oct 2026', 960, 720, 26, 700, DIM, sa, 'c')
        text(c, 'paid by then → allowed this year', 960, 770, 30, 800, GREEN, a * seg(t, SEC5 + .4, SEC5 + .9), 'c')

# ---------------------------------------------------------------- r6: the escape
CHK = ['filed his return', 'included the income', 'paid the tax on it']
def _escape(c, t):
    a = seg(t, R6 - .4, R6 + .2) * (1 - seg(t, R7 - .5, R7))
    if a <= 0: return
    bill(c, 420, 440, a, 'Chef-consultant fee', 150000, 'bank', None, 1.15, -2)
    text(c, "Meera's books", 420, 330, 24, 700, DIM, a, 'c')
    su = seg(t, TREATED6 - .1, TREATED6 + .9, linr)
    stamp(c, 430, 470, 'DEEMED DEDUCTED', GREEN, a, su, -10, 30, deep=True)
    da = a * seg(t, DATE6 - .3, DATE6 + .2, back)
    if da > 0: chip(c, 420, 590, 'on the date of his return', ACC, da, 24)
    # the payee's checklist
    pa = a * seg(t, ESC6 - .2, ESC6 + .3)
    _box(c, 700, 290, 600, 236, GREEN, pa, -.86, r=18)
    text(c, 'ONE ESCAPE · THE PAYEE HAS', 726, 330, 20, 800, GREEN, pa, track=3)
    for k, (s, tt) in enumerate(zip(CHK, (FILED6, INCL6, PAID6))):
        ra = pa * seg(t, tt - .3, tt + .1)
        if ra <= 0: continue
        yy = 380 + 52 * k
        tick(c, 744, yy - 8, ra * seg(t, tt, tt + .3, back), 16)
        text(c, s, 776, yy + 2, 28, 700, WHITE, ra)
    _chef(c, 1590, 780, 1.0, a * seg(t, PAYEE6 - .3, PAYEE6 + .1), t, look=-.5, mood=.5)
    text(c, 'chef-consultant · resident payee', 1590, 814, 24, 700, DIM, a * seg(t, PAYEE6 - .3, PAYEE6 + .1), 'c')
    ca = a * seg(t, ACCT6 - .3, ACCT6 + .2)
    if ca > 0:
        person(c, 860, 790, .72, ca, 'ca', t, mood=.4, look=.3)
        text(c, 'accountant', 860, 814, 24, 700, DIM, ca, 'c')
        fu = seg(t, ACCT6, ACCT6 + .5, back)
        form(c, 1080, 680, ca * seg(t, ACCT6, ACCT6 + .3), 'Certificate', 'by an accountant', .48 * (.8 + .2 * fu), GREEN, 4)
        if t > CERT6: tick(c, 1160, 590, ca * seg(t, CERT6, CERT6 + .3, back), 18)

# ---------------------------------------------------------------- r7 / r8: tax can't enter the machine
MCX, MCY, MCW, MCH = 520, 500, 1100, 280
HOP = (MCX + 26 + (MCW - min(200., MCW * .14) - 52 - 80) / 10, MCY - 8)

def _machine(c, t):
    a = seg(t, R7 - .4, R7 + .2) * (1 - seg(t, R9 - .5, R9))
    if a <= 0: return
    act = 0. if t < R8 + .3 else 0.
    gl = win(t, INC7 - .5, NEVER7 + .4, .3, .4) + win(t, TAX8, ISNT8 + .4, .3, .4)
    machine(c, MCX, MCY, MCW, MCH, a, t, active=act if gl > .05 else None)
    fl = max(win(t, NEVER7 - .05, NEVER7 + .8, .08, .5), win(t, ISNT8 - .05, ISNT8 + .8, .08, .5))
    if fl > 0:
        c.drawPath(poly(np.array([(HOP[0] - 92, HOP[1] - 78), (HOP[0] + 92, HOP[1] - 78), (HOP[0] + 46, HOP[1] + 8), (HOP[0] - 46, HOP[1] + 8)])),
                   paint(RED, .5 * fl * a, stroke=7, blur=6))
    sa = a * seg(t, SEC7 - .2, SEC7 + .3, back) * (1 - seg(t, R8 - .4, R8))
    if sa > 0: sec(c, 220, 300, '40(a)(ii)', sa, VIO, 30)
    # the income-tax bill
    ia = a * seg(t, INC7 - .4, INC7) * (1 - seg(t, R8 - .4, R8 + .1))
    if ia > 0:
        u = seg(t, INC7 - .2, NEVER7, eout); v = seg(t, NEVER7, NEVER7 + .6, eout)
        x, y = lerp(330, HOP[0], u), lerp(420, HOP[1] - 120, u)
        x, y = lerp(x, 330, v), lerp(y, 420, v)
        ang = -14 * v + 4 * math.sin(t * 2) * (1 - u)
        bill(c, x, y, ia, 'Income-tax', None, 'bank', None, .95, ang, RED)
        xa = ia * seg(t, NEVER7, NEVER7 + .3, back)
        if xa > 0: cross(c, x + 100, y - 54, xa, 20)
        for k, (wt, s) in enumerate(((SUR7, '+ surcharge'), (CESS7, '+ cess'))):
            ca = ia * seg(t, wt - .2, wt + .3, back)
            if ca > 0: chip(c, 120 + 190 * k, 610, s, RED, ca, 24, 'l')
        ea = ia * seg(t, EXP7 - .2, EXP7 + .3)
        text(c, 'never a business expense', 120, 548, 28, 800, RED, ea)
    # the loop: tax is computed on the profit, it can't come back off it
    la = a * seg(t, DEDUCT7 - .4, DEDUCT7) * (1 - seg(t, R8 - .4, R8))
    if la > 0:
        u = seg(t, DEDUCT7 - .3, PROFIT7 + .2)
        port = (MCX + MCW - 70, MCY + MCH / 2)
        tx, ty = 1500, 320
        P = np.array([_arc(port, (tx, ty + 30), -60, q) for q in np.linspace(0, min(1, u * 2), 16)])
        c.drawPath(poly(P, False), paint(GOLD, .9 * la, stroke=3))
        chip(c, tx, ty, 'tax on this profit', GOLD, la * seg(u, .3, .6), 24)
        v = seg(u, .5, 1)
        if v > 0:
            p = paint(RED, .9 * la, stroke=3, cap=False); p.setPathEffect(skia.DashPathEffect.Make([12, 8], 0))
            c.drawLine(tx - 150, ty, lerp(tx - 150, 880, v), ty, p)
            if v > .9: arrow(c, 900, ty, 870, ty, RED, 3, la, 14)
            cross(c, 1080, ty, la * seg(v, .6, 1, back), 20)
            text(c, "can't come back off the profit", 1100, ty + 56, 24, 800, RED, la * seg(v, .7, 1), 'c')
    # r8: tax on employees' non-cash perks
    ra = a * seg(t, R8 - .3, R8 + .2)
    if ra > 0:
        person(c, 250, 790, .72, ra * seg(t, EMPLOYER8 - .3, EMPLOYER8), 'meera', t, mood=.2, look=.4)
        text(c, 'employer', 250, 814, 24, 700, DIM, ra * seg(t, EMPLOYER8 - .3, EMPLOYER8), 'c')
        ea = ra * seg(t, EMPLOYEE8 - .3, EMPLOYEE8)
        person(c, 1730, 790, .72, ea, 'staff', t, mood=.5, look=-.3)
        text(c, 'employee', 1730, 814, 24, 700, DIM, ea, 'c')
        ga = ra * seg(t, NON8 - .2, NON8 + .3, back)
        if ga > 0:
            c.drawCircle(1730, 540, 44, paint(PINK, .16 * ga, blur=12))
            icon(c, 'gift', 1730, 540, 1.0, PINK, ga, 3.4)
            chip(c, 1730, 470, 'non-cash perk', PINK, ga, 22)
        u = seg(t, TAX8 - .2, TAX8 + .9, eout); v = seg(t, ISNT8, ISNT8 + .6, eout)
        ba = ra * seg(t, TAX8 - .3, TAX8)
        if ba > 0:
            x, y = lerp(330, HOP[0], u), lerp(560, HOP[1] - 120, u)
            x, y = lerp(x, 330, v), lerp(y, 420, v)
            if t < ISNT8: y += 4 * math.sin((t - TAX8) * 4) * u
            bill(c, x, y, ba, 'Tax on staff perks', None, 'bank', None, .95, -14 * v, RED)
            xa = ba * seg(t, ISNT8, ISNT8 + .3, back)
            if xa > 0:
                cross(c, x + 100, y - 54, xa, 20)
                text(c, 'not deductible either', 120, 548, 28, 800, RED, ba * seg(t, DED8 - .2, DED8 + .3))
                sec(c, 120, 598, '40(a)(v)', ba * seg(t, DED8, DED8 + .4), VIO, 24)

# ---------------------------------------------------------------- r9: the exam line, calm
def _summary(c, t):
    a = seg(t, R9 - .4, R9 + .3) * (1 - seg(t, R10 - .5, R10))
    if a <= 0: return
    x, y, w = 250, 270, 1420
    h = 560
    gl = .5 + .5 * math.sin((t - R9) * 1.2)
    _box(c, x, y, w, h, GOLD, a, -.88, r=22)
    c.drawRRect(rrect(x - 3, y - 3, w + 6, h + 6, 24), paint(GOLD, (.12 + .22 * gl) * a, stroke=3))
    text(c, 'SECTION 40(a) · TDS AND TAX — NOT DEDUCTIBLE', x + 34, y + 46, 20, 800, GOLD, a, track=3)
    # row 1: the resident rule (the exam line)
    r1y = y + 78
    hl = win(t, THIRTY9 - .3, R10 - .4, .4, .5)
    c.drawRRect(rrect(x + 20, r1y, w - 40, 222, 16), paint(GOLD, .07 * a * hl))
    c.drawRRect(rrect(x + 20, r1y, w - 40, 222, 16), paint(GOLD, .5 * a * hl, stroke=1.6))
    pa = a * seg(t, PAYABLE9 - .3, PAYABLE9 + .2)
    text(c, 'Any sum payable to a resident', x + 50, r1y + 58, 34, 800, mixc(WHITE, GOLD, seg(t, RES9 - .2, RES9 + .3)), a)
    sec(c, x + 50, r1y + 104, '40(a)(ia)', a, VIO, 22)
    ta = a * seg(t, THIRTY9 - .2, THIRTY9 + .3, back)
    big = 60 * (1 + .12 * win(t, THIRTY9, THIRTY9 + .8, .2, .5))
    text(c, '30%', x + w - 260, r1y + 82, big, 800, RED, a, 'c')
    text(c, 'disallowed', x + w - 260, r1y + 122, 26, 800, RED, a * (.5 + .5 * seg(t, DIS9 - .2, DIS9 + .3)), 'c')
    for k, (s, tt) in enumerate((('TDS not deducted', NOT9), ('or deducted but not paid by the due date u/s 139(1)', PAID9))):
        ca = seg(t, tt - .3, tt + .2)
        cy = r1y + 160 + 0 * k
        cx = x + 50 if k == 0 else x + 50 + text_w('TDS not deducted', 24, 700) + 60
        col = mixc(DIM, ORANGE, ca)
        cw = text_w(s, 24, 700) + 32
        c.drawRRect(rrect(cx, cy - 20, cw, 46, 23), paint(col, (.06 + .16 * ca) * a))
        c.drawRRect(rrect(cx, cy - 20, cw, 46, 23), paint(col, (.4 + .5 * ca) * a, stroke=2))
        text(c, s, cx + 16, cy + 11, 24, 700, mixc(DIM, WHITE, ca), a)
    # rows 2-4: the rest, quieter
    rows = [('Any sum payable to a non-resident', '40(a)(i)', '100%'),
            ('Income-tax, surcharge and cess', '40(a)(ii)', 'never'),
            ("Tax paid on employees' non-cash perks", '40(a)(v)', 'never')]
    for k, (s, ch, res) in enumerate(rows):
        yy = r1y + 260 + 70 * k
        c.drawLine(x + 30, yy - 24, x + w - 30, yy - 24, paint(WHITE, .08 * a, stroke=1))
        text(c, s, x + 50, yy + 18, 28, 700, WHITE, a * .85)
        sec(c, x + 60 + text_w(s, 28, 700) + 10, yy + 8, ch, a * .85, VIO, 21)
        text(c, res, x + w - 260, yy + 20, 32, 800, RED, a * .85, 'c')

# ---------------------------------------------------------------- r10: the check, around the card
def _check(c, t):
    a = seg(t, R10 - .3, R10 + .3)
    if a <= 0: return
    ta = a * seg(t, COMPANY10 - .3, COMPANY10 + .2)
    if ta > 0:
        s1 = 'A company pays salary'
        w1 = text_w(s1, 30, 700); w2 = ftext_w('₹14,00,000', 34, MONO)
        nt = seg(t, WITHOUT10 - .2, TDS10 + .2)
        s2 = '· no TDS'; w3 = text_w(s2, 30, 800) * nt
        W_ = w1 + w2 + w3 + 150 + 20 * nt; x0 = 960 - W_ / 2
        _box(c, x0, 262, W_, 76, ACC, ta, -.8, r=38)
        icon(c, 'building', x0 + 44, 300, .6, ACC, ta)
        text(c, s1, x0 + 82, 311, 30, 700, WHITE, ta)
        roll(c, 1400000, x0 + 92 + w1 + w2 + 10, 313, seg(t, FOURTEEN10, FOURTEEN10 + .8), 34, GOLD, ta * seg(t, FOURTEEN10 - .2, FOURTEEN10 + .1), 'r')
        if nt > 0: text(c, s2, x0 + 116 + w1 + w2, 311, 30, 800, RED, ta * nt)
    ba = a * seg(t, FOURTEEN10 - .2, FOURTEEN10 + .3)
    if ba <= 0: return
    x, y, w, h = 520, 742, 860, 56
    cu = seg(t, A_THIRTY - .1, A_THIRTY + .4)
    sep = 20 * seg(t, A_THIRTY, A_THIRTY + .6, back)
    xs = _bar(c, x, y, w, h, ba, cu, RED, .3, sep, 0., 'salary', base=ACC)
    if t < A_THIRTY:
        sx = x + ((t - FOURTEEN10) * 260) % (w + 300) - 150
        with clip(c, rrect(x, y, w * .7, h, 12)):
            c.drawRect(skia.Rect(sx, y, sx + 90, y + h), paint(shader=lgrad((sx, 0), (sx + 90, 0), [(WHITE, 0), (WHITE, .14), (WHITE, 0)]), a=ba))
    roll(c, 1400000, x + w - 24, y + h / 2 + 11, 1., 28, WHITE, ba * (1 - seg(cu, 0, .3)), 'r')
    if cu > 0:
        text(c, '30%', xs + sep + (x + w - xs) / 2, y + h / 2 + 11, 30, 800, WHITE, ba * cu, 'c')
        fa = ba * seg(t, A_FOUR - .3, A_FOUR)
        rw = roll(c, 420000, x + w + 56, y + h / 2 + 13, seg(t, A_FOUR, A_FOUR + .9), 36, RED, fa, 'l')
        text(c, 'disallowed', x + w + 72 + rw, y + h / 2 + 11, 26, 800, RED, fa)

def ch_r(c, t):
    if t < RS - .5 or t > RE + .5: return
    _people(c, t)
    _trail(c, t)
    _r1(c, t)
    _lanes(c, t)
    _deadline(c, t)
    _escape(c, t)
    _machine(c, t)
    _summary(c, t)
    _check(c, t)

if __name__ == '__main__':
    for nm in ('PAYS1 CHEF1 ONE1 RUP1 FORGETS1 TDS1 COST1 REAL1 WHY1 CUT1 TAX2 SOURCE2 GOVT2 FOLLOWS2 MONEY2 IF2 DEDUCT2 '
               'HOLDS2 PART2 UNTIL2 RES3 THIRTY3 DIS3 SEC3 NON3 SEC3B HUND3 THIRTY4 ONE4 FORTY4 ADDED4 DEDUCTS4 NEXT4 '
               'FORTY4B ALLOWED4 DEADLINE5 GEN5 DEDUCTED5 PAID5 BEFORE5 DUE5 RETURN5 SEC5 ESC6 PAYEE6 FILED6 INCL6 PAID6 '
               'TREATED6 DATE6 ACCT6 CERT6 SEC7 INC7 NEVER7 EXP7 SUR7 CESS7 DEDUCT7 PROFIT7 EMPLOYER8 TAX8 EMPLOYEE8 '
               'NON8 PERKS8 ISNT8 DED8 WRITE9 THIRTY9 PAYABLE9 RES9 DIS9 NOT9 SAME9 PAID9 DUE9 COMPANY10 FOURTEEN10 '
               'WITHOUT10 TDS10 A_THIRTY A_FOUR').split():
        print(nm, round(globals()[nm], 2), end='  ')
    print(); print(len(EVENTS), 'events')
