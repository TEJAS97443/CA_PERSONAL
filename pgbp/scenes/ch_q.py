"""Chapter Q — The last door (section 37).
q1 hook: a food blogger (phone with a cake photo, a cake slice) — Meera pays her; a "Food blogger's fee" invoice pops
   and floats along a corridor of section doors § 30 · 31 · 32 · 35 · 36 (rent · repairs, plant repairs,
   depreciation, research, people costs); each lamp turns red; at "lost?" the bill droops with a "?".
q2 the big last door "§ 37" lights gold; the bill floats to it; "30 to 36" — the corridor doors flash red under a
   "§§ 30–36 · not covered" bracket; "can still pass" — the door opens a crack of light; "a few conditions".
q3 (NAME IT) the corridor gives way to a "SECTION 37(1) · CONDITIONS" panel: wholly and exclusively for the business ·
   not capital · not personal; each lamp ticks green for the blogger's bill as spoken, then the door opens and the bill
   goes through — it lands as the first card on the "PASSES THE LAST DOOR" shelf (right).
q4 "wholly and exclusively — not necessarily" (necessarily struck out); an "Ad campaign" bill (unwise) still passes.
q5 trap: a "NEVER PASSES" list opens; a bribe envelope, a penalty notice and freebies for doctors each bounce off the
   door (red flash, door shakes) and fly into the list (Expl. 1 / Expl. 3).
q6 a "from 23 Apr 2025" calendar; a SEBI / Competition-law settlement bounces (Expl. 3); a contract's late-delivery
   penalty passes (compensation, not a fine).
q7 "two more rules": CSR spending by a company (Expl. 2) and an ad in a political party's souvenir (37(2B)) bounce.
q8 (EXAMPLE) keyman insurance premium passes ("even on a partner"), the blogger's card glows again, legal fees to
   defend the business pass.
q9 check: the card only asks "Deductible?", so below it Meera's van and a "Parking fine ₹2,000" ticket; on the answer
   the ticket bounces off the (dimmed) door, red — "penalty for breaking the law".
"""
from scenes.common import *
import props as PR

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

QS, QE = B.span('q')
Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9 = (T('q%d' % i) for i in range(1, 10))
Q9A = TA('q9')

def _wa(cue, n, fb, occ=0):
    try: return Wd(cue, n, occ)
    except Exception: return fb

# ---------------------------------------------------------------- word times
PAYS1, BLOG1, TASTE1, NO1, MENT1, LOST1 = (W('q1', 'pays'), W('q1', 'blogger'), W('q1', 'taste'), W('q1', 'no'),
                                           W('q1', 'mentions'), W('q1', 'lost'))
NO2, SEV2, LAST2, COVER2, THIRTY2, SIX2, STILL2, COND2 = (W('q2', 'no'), W('q2', 'seven'), W('q2', 'last'),
                                                          W('q2', 'covered'), W('q2', 'thirty'), W('q2', 'six'),
                                                          W('q2', 'still'), W('q2', 'conditions'))
WHOLLY3, CAPITAL3, PERSONAL3 = W('q3', 'wholly'), W('q3', 'capital'), W('q3', 'personal')
NOTICE4, WHOLLY4, NECESS4, UNWISE4, ALLOWED4 = (W('q4', 'notice'), W('q4', 'wholly'), W('q4', 'necessarily'),
                                                W('q4', 'unwisely'), W('q4', 'allowed'))
ILLEGAL5, NEVER5, BRIBE5, PENALTY5, LAW5, FREE5, DOCTORS5 = (W('q5', 'illegal'), W('q5', 'never'), W('q5', 'bribe'),
                                                             W('q5', 'penalty'), W('q5', 'law'), W('q5', 'freebies'),
                                                             W('q5', 'doctors'))
APRIL6, SETTLE6, SEBI6, COMP6, BLOCK6, LATE6, CONTRACT6, FINE6, COMPENS6 = (
    W('q6', 'April'), W('q6', 'settle'), W('q6', 'SEBI'), W('q6', 'competition'), W('q6', 'blocked'), W('q6', 'late'),
    W('q6', 'contract'), W('q6', 'fine'), W('q6', 'compensation'))
MORE7, CSR7, COMPANY7, NEVER7, ADV7, POLIT7, SOUV7 = (W('q7', 'more'), W('q7', 'CSR'), W('q7', 'company'),
                                                      W('q7', 'never'), W('q7', 'advertisement'), W('q7', 'political'),
                                                      W('q7', 'souvenir'))
SOME8, KEY8, PREM8, PARTNER8, FOOD8, LEGAL8, DEFEND8 = (W('q8', 'some'), W('q8', 'key'), W('q8', 'premium'),
                                                        W('q8', 'partner'), W('q8', 'food'), W('q8', 'legal'),
                                                        W('q8', 'defend'))
VAN9, TWO9, PARK9 = W('q9', 'van'), W('q9', 'two'), W('q9', 'parking')
A_PEN = _wa('q9a', 'penalty', Q9A + .8)

# ---------------------------------------------------------------- the world
CAST.setdefault('q_blogger', dict(skin='#a87250', hair='#24150f', body='#be3a6e', neck='round', style='bob', fem=True,
                                  ear='gold'))
DX, DY, DW, DH = 880, 290, 300, 510                       # the last door (frame top-left, the doorway below its plaque)
SPOT = (DX + DW / 2, 612)                                  # where an expense waits at the door
FLOOR = 800
SMALL = [('30', 'buildings'), ('31', 'plant repairs'), ('32', 'depreciation'), ('35', 'research'),
         ('36', 'people costs')]
SDX0, SDW, SDG, SDY = 96, 136, 18, 470
def _sd_x(k): return SDX0 + k * (SDW + SDG)
COND = ['Wholly and exclusively for the business', 'Not capital', 'Not personal']
NEVER = [('Bribe', 'Expl. 1', None), ('Penalty for breaking a law', 'Expl. 1', None),
         ('Freebies to doctors', 'Expl. 3', None), ('SEBI / Competition settlement', 'Expl. 3', 'from 23 Apr 2025'),
         ('CSR spending by a company', 'Expl. 2', None), ("Ad in a political party's souvenir", '37(2B)', None)]
CPX, CPY, CPW = 80, 280, 760                               # conditions panel
NPX, NPY, NPW = 80, 514, 760                               # never-passes panel
SHX, SHY = 1238, 470                                       # shelf header
SLOT = [(1238, 494), (1552, 494), (1238, 608), (1552, 608), (1238, 722)]
CARDW, CARDH = 290, 98

# expenses: art, title, sub, t_in (starts entering), t_res (judged), ok, target (shelf slot / never row), ticks
ITEMS = [
    dict(art='bill', title="Food blogger's fee", mode='upi', ok=True, slot=0, t_res=PERSONAL3 + .9,
         card=("Food blogger's fee", 'for the business'), ticks=(WHOLLY3 + .7, CAPITAL3 + .45, PERSONAL3 + .4)),
    dict(art='bill', title='Ad campaign', mode='bank', ok=True, slot=1, t_in=UNWISE4 - .75, t_res=ALLOWED4,
         card=('Ad that flopped', 'still for the business'), tag='unwise'),
    dict(art='env', title='Bribe', ok=False, row=0, t_in=BRIBE5 - .75, t_res=BRIBE5 + .25),
    dict(art='slip', title='Penalty notice', sub='breach of a law', band=RED, ok=False, row=1, t_in=PENALTY5 - .55,
         t_res=LAW5 + .1),
    dict(art='gift', title='Freebies', sub='for doctors', ok=False, row=2, t_in=FREE5 - .45, t_res=DOCTORS5 + .45),
    dict(art='slip', title='Settlement', sub='SEBI · Competition law', band=VIO, ok=False, row=3, t_in=SETTLE6 - .75,
         t_res=BLOCK6),
    dict(art='slip', title='Contract', sub='late-delivery penalty', band=ACC, ok=True, slot=2, t_in=LATE6 - .7,
         t_res=FINE6, card=('Late-delivery penalty', 'compensation, not a fine'), sub_t=COMPENS6),
    dict(art='slip', title='CSR spend', sub='by a company', band=GREEN, ok=False, row=4, t_in=CSR7 - .55,
         t_res=NEVER7),
    dict(art='slip', title='Souvenir ad', sub='a political party', band=ORANGE, ok=False, row=5, t_in=ADV7 - .65,
         t_res=SOUV7 + .3),
    dict(art='bill', title='Keyman insurance', mode='bank', ok=True, slot=3, t_in=KEY8 - .7, t_res=PREM8 + .35,
         card=('Keyman insurance', 'even on a partner'), sub_t=PARTNER8),
    dict(art='bill', title='Legal fees', mode='bank', ok=True, slot=4, t_in=LEGAL8 - .7, t_res=DEFEND8 + .15,
         card=('Legal fees', 'to defend the business')),
]
for it in ITEMS:
    if it['ok'] and 'ticks' not in it: it['ticks'] = tuple(it['t_res'] - .95 + .28 * k for k in range(3))

# ---------------------------------------------------------------- SFX (≤ 25)
for tt, k in ((PAYS1, 'pop'), (MENT1, 'warn'), (LOST1, 'blip'), (LAST2, 'chime_lo'), (STILL2, 'whoosh'),
              (WHOLLY3, 'tick'), (CAPITAL3, 'tick'), (PERSONAL3, 'tick'), (ITEMS[0]['t_res'], 'ok'),
              (NECESS4, 'tap'), (ITEMS[1]['t_res'], 'ok'),
              (ITEMS[2]['t_res'], 'error'), (ITEMS[3]['t_res'], 'error'), (ITEMS[4]['t_res'], 'error'),
              (APRIL6, 'flip'), (ITEMS[5]['t_res'], 'error'), (ITEMS[6]['t_res'], 'ok'),
              (ITEMS[7]['t_res'], 'error'), (ITEMS[8]['t_res'], 'error'),
              (ITEMS[9]['t_res'], 'ok'), (FOOD8, 'chime'), (ITEMS[10]['t_res'], 'ok'),
              (TWO9, 'pop'), (Q9A + .15, 'error')):
    _ev(tt, k)

# ---------------------------------------------------------------- small art
def _box(c, x, y, w, h, col, a, fill=-.8, glow=0., r=18, sw=2.):
    if a <= 0: return
    c.drawRRect(rrect(x, y + 8, w, h, r), paint(BLACK, .38 * a, blur=14))
    c.drawRRect(rrect(x, y, w, h, r), paint(shader=lgrad((0, y), (0, y + h), [shade(col, fill), '#0a0f1f']), a=a))
    if glow > 0: c.drawRRect(rrect(x - 4, y - 4, w + 8, h + 8, r + 4), paint(col, .5 * a * glow, stroke=7, blur=9))
    c.drawRRect(rrect(x, y, w, h, r), paint(col, .85 * a, stroke=sw))

def _slip_pic(title, sub, band):
    SW, SH = 230, 140
    def fn(cv):
        cv.drawRRect(rrect(-SW / 2 + 3, -SH / 2 + 9, SW, SH, 8), paint(BLACK, .42, blur=10))
        cv.drawRRect(rrect(-SW / 2, -SH / 2, SW, SH, 8), paint(shader=lgrad((0, -SH / 2), (0, SH / 2), ['#fdfbf5', '#f0e8d5'])))
        cv.save(); cv.clipRRect(rrect(-SW / 2, -SH / 2, SW, SH, 8), True)
        cv.drawRect(skia.Rect.MakeXYWH(-SW / 2, -SH / 2, SW, 14), paint(band)); cv.restore()
        tl, tsz, _ = PR._fit(title, 27, 800, SW - 30, 18)
        ftext(cv, tl, -SW / 2 + 16, -SH / 2 + 56, tsz, SERIF, INK, 1, 'l', 700)
        if sub:
            sl, ssz, _ = PR._fit(sub, 20, 600, SW - 30, 15)
            text(cv, sl, -SW / 2 + 16, -SH / 2 + 88, ssz, 600, '#4b4637', 1)
        for k in range(2): cv.drawRRect(rrect(-SW / 2 + 16, -SH / 2 + 104 + 14 * k, SW - 70 - 30 * k, 6, 3), paint(INK, .16))
        cv.drawRRect(rrect(-SW / 2 + .5, -SH / 2 + .5, SW - 1, SH - 1, 8), paint('#d2c6a8', stroke=1.2))
    return PR._pic(('q_slip', title, sub, band), fn, (-SW / 2 - 20, -SH / 2 - 20, SW + 44, SH + 50))

def _env_pic():
    EW, EH = 210, 132
    def fn(cv):
        cv.drawRRect(rrect(-EW / 2 + 3, -EH / 2 + 9, EW, EH, 6), paint(BLACK, .42, blur=10))
        cv.drawRRect(rrect(-EW / 2, -EH / 2, EW, EH, 6), paint(shader=lgrad((0, -EH / 2), (0, EH / 2), ['#efe2c2', '#dcc89c'])))
        fl = poly(np.array([(-EW / 2, -EH / 2), (EW / 2, -EH / 2), (0, 8)]))
        cv.drawPath(fl, paint('#e7d6ad')); cv.drawPath(fl, paint('#bfa676', stroke=1.4))
        cv.drawLine(-EW / 2, EH / 2, -14, 0, paint('#c8b282', stroke=1.2)); cv.drawLine(EW / 2, EH / 2, 14, 0, paint('#c8b282', stroke=1.2))
        cv.drawCircle(0, 6, 18, paint('#9b1c1c')); text(cv, '₹', 0, 14, 22, 800, '#fde2e2', 1, 'c')
        cv.drawRRect(rrect(-EW / 2 + .5, -EH / 2 + .5, EW - 1, EH - 1, 6), paint('#b49a68', stroke=1.2))
    return PR._pic(('q_env',), fn, (-EW / 2 - 20, -EH / 2 - 20, EW + 44, EH + 50))

def _gift_pic():
    def fn(cv):
        cv.drawRRect(rrect(-62, -40, 130, 108, 8), paint(BLACK, .4, blur=10))
        cv.drawRRect(rrect(-66, -48, 132, 104, 8), paint(shader=lgrad((0, -48), (0, 56), ['#f9a8d4', '#db2777'])))
        cv.drawRRect(rrect(-74, -68, 148, 30, 8), paint(shader=lgrad((0, -68), (0, -38), ['#fbcfe8', '#ec4899'])))
        cv.drawRect(skia.Rect.MakeXYWH(-10, -68, 20, 124), paint(GOLD))
        for sg in (-1, 1):
            p = skia.Path(); p.moveTo(0, -68); p.cubicTo(sg * 30, -110, sg * 54, -80, 0, -70); cv.drawPath(p, paint(GOLD, stroke=7))
        cv.drawRRect(rrect(-66, -48, 132, 104, 8), paint('#9d174d', .6, stroke=1.4))
    return PR._pic(('q_gift',), fn, (-90, -120, 180, 200))

def _art(c, it, x, y, s, a, ang=0.):
    if a <= 0: return
    k = it['art']
    if k == 'bill': bill(c, x, y, a, it['title'], it.get('amt'), it.get('mode'), None, .95 * s, ang)
    elif k == 'slip': PR._play(c, _slip_pic(it['title'], it.get('sub'), it.get('band', ACC)), x, y, s, a, ang)
    elif k == 'env': PR._play(c, _env_pic(), x, y, s, a, ang)
    elif k == 'gift':
        PR._play(c, _gift_pic(), x, y + 10 * s, s * .95, a, ang)
        chip(c, x + 70 * s, y + 70 * s, it['sub'], PINK, a, 22 * s)

# ---------------------------------------------------------------- the doors
def _sdoor_pic(num, cap):
    def fn(cv):
        h = FLOOR - SDY
        cv.drawRRect(rrect(-8, -8, SDW + 16, h + 8, 10), paint('#151d34'))
        cv.drawRRect(rrect(-8, -8, SDW + 16, h + 8, 10), paint('#46557a', stroke=1.4))
        cv.drawRect(skia.Rect.MakeXYWH(0, 0, SDW, h), paint(shader=lgrad((0, 0), (SDW, 0), ['#2a3554', '#1c2540'])))
        for yy, hh in ((70, 110), (196, 110)):
            cv.drawRRect(rrect(16, yy, SDW - 32, hh, 6), paint('#0f162b', .55)); cv.drawRRect(rrect(16, yy, SDW - 32, hh, 6), paint('#4b5a80', .6, stroke=1.2))
        cv.drawRRect(rrect(SDW / 2 - 44, 16, 88, 40, 8), paint('#0b1124')); cv.drawRRect(rrect(SDW / 2 - 44, 16, 88, 40, 8), paint(VIO, .7, stroke=1.4))
        text(cv, '§ ' + num, SDW / 2, 46, 26, 800, shade(VIO, .55), 1, 'c')
        cv.drawRRect(rrect(8, 108, SDW - 16, 40, 6), paint(CREAM, .92))
        cl, csz, _ = PR._fit(cap, 22, 700, SDW - 24, 18)
        text(cv, cl, SDW / 2, 136, csz, 700, INK, 1, 'c')
        cv.drawCircle(SDW - 20, 190, 6, paint('#8d98b3'))
    return PR._pic(('q_sdoor', num, cap), fn, (-30, -30, SDW + 60, FLOOR - SDY + 60))

def _corridor(c, t, BL):
    a = seg(t, QS, QS + .6) * (1 - seg(t, STILL2, COND2))
    if a <= 0: return
    for k, (num, cap) in enumerate(SMALL):
        x = _sd_x(k)
        rej = seg(t, BL['visit'][k], BL['visit'][k] + .25)
        fl = win(t, COVER2 + .12 * k, COVER2 + 1.9 + .12 * k, .2, .5)
        PR._play(c, _sdoor_pic(num, cap), x, SDY, 1, a)
        lc = mixc('#3d4a6a', RED, max(rej, fl))
        c.drawCircle(x + SDW / 2, SDY - 22, 9, paint(lc, a))
        if max(rej, fl) > 0: c.drawCircle(x + SDW / 2, SDY - 22, 18, paint(RED, .35 * a * max(rej, fl), blur=8))
        if fl > 0: c.drawRect(skia.Rect.MakeXYWH(x, SDY, SDW, FLOOR - SDY), paint(RED, .12 * fl * a))
    ba = a * seg(t, COVER2 - .1, COVER2 + .4) * (1 - seg(t, COND2 - .3, COND2 + .2))
    if ba > 0:
        x0, x1 = _sd_x(0), _sd_x(4) + SDW
        c.drawLine(x0, SDY - 54, x1, SDY - 54, paint(RED, .8 * ba, stroke=2.4))
        for xx in (x0, x1): c.drawLine(xx, SDY - 54, xx, SDY - 40, paint(RED, .8 * ba, stroke=2.4))
        w = text_w('§§ 30 to 36 · not covered', 26, 800) + 40
        c.drawRRect(rrect((x0 + x1) / 2 - w / 2, SDY - 92, w, 44, 22), paint('#1a0b12', .92 * ba))
        text(c, '§§ 30 to 36 · not covered', (x0 + x1) / 2, SDY - 61, 26, 800, RED, ba, 'c')

def _door_state(t):
    op = .22 * win(t, STILL2 - .1, COND2 + .3, .4, .6)
    lit = seg(t, SEV2 - .2, LAST2 + .2)
    fl = 0.; sh = 0.
    for it in ITEMS:
        r = it['t_res']
        if it['ok']: op = max(op, win(t, r, r + 1.5, .35, .5))
        else:
            f = win(t, r - .05, r + .7, .08, .5); fl = max(fl, f)
            sh += math.sin((t - r) * 60) * 6 * win(t, r - .02, r + .35, .02, .2)
    ca = seg(t, Q9A, Q9A + .1) * (1 - seg(t, Q9A + .6, Q9A + 1.2))
    fl = max(fl, ca); sh += math.sin((t - Q9A) * 60) * 6 * win(t, Q9A, Q9A + .35, .02, .2)
    return lit, op, fl, sh

def _door(c, t):
    a = seg(t, QS, QS + .6)
    if a <= 0: return
    lit, op, fl, sh = _door_state(t)
    c.save(); c.translate(sh, 0)
    x, y, w, h = DX, DY, DW, FLOOR - DY
    fc = mixc(mixc('#46557a', GOLD, lit), RED, fl)
    c.drawRRect(rrect(x - 22, y - 22, w + 44, h + 22, 16), paint(BLACK, .45 * a, blur=18))
    c.drawRRect(rrect(x - 22, y - 22, w + 44, h + 22, 16), paint('#151d34', a))
    if lit > 0: c.drawRRect(rrect(x - 26, y - 26, w + 52, h + 26, 18), paint(GOLD, .4 * lit * a * (1 - fl), stroke=8, blur=10))
    if fl > 0: c.drawRRect(rrect(x - 26, y - 26, w + 52, h + 26, 18), paint(RED, .7 * fl * a, stroke=9, blur=10))
    c.drawRRect(rrect(x - 22, y - 22, w + 44, h + 22, 16), paint(fc, .9 * a, stroke=2.2))
    # plaque
    c.drawRRect(rrect(x + w / 2 - 80, y - 8, 160, 62, 12), paint('#0b1124', a))
    c.drawRRect(rrect(x + w / 2 - 80, y - 8, 160, 62, 12), paint(mixc(VIO, GOLD, lit), .9 * a, stroke=2))
    text(c, '§ 37', x + w / 2, y + 38, 40, 800, mixc(shade(VIO, .4), GOLD, lit), a, 'c')
    # doorway
    gy = y + 70
    c.drawRect(skia.Rect(x, gy, x + w, FLOOR), paint('#0a0f1c', a))
    if op > 0:
        c.drawRect(skia.Rect(x, gy, x + w, FLOOR), paint(shader=lgrad((0, gy), (0, FLOOR), [shade(GOLD, .3), shade(GREEN, -.1)]), a=a * min(1, op * 2.2)))
        c.drawRect(skia.Rect(x + 30, gy + 30, x + w - 30, FLOOR), paint(WHITE, .35 * a * op, blur=24))
    # the leaf (hinge on the right): its free edge swings towards us
    lx = x + w * .86 * op; ex = 18 * op
    P = poly(np.array([(lx, gy - ex), (x + w, gy), (x + w, FLOOR), (lx, FLOOR + ex * .4)]))
    c.drawPath(P, paint(shader=lgrad((lx, 0), (x + w, 0), [shade('#2f3c60', -.1 * op), '#222c48']), a=a))
    c.drawPath(P, paint(mixc('#5d6c92', GOLD, lit * .6), .8 * a, stroke=1.6))
    k = (x + w - lx) / w
    if k > .2:
        for yy0, yy1 in ((gy + 40, gy + 200), (gy + 240, FLOOR - 40)):
            q = poly(np.array([(lx + 26 * k, yy0 - ex * .6), (x + w - 26 * k, yy0), (x + w - 26 * k, yy1), (lx + 26 * k, yy1 + ex * .3)]))
            c.drawPath(q, paint('#141c33', .6 * a)); c.drawPath(q, paint('#56658c', .55 * a, stroke=1.2))
        c.drawCircle(lx + 26 * k, (gy + FLOOR) / 2 + 20, 8, paint(GOLD if lit else '#8d98b3', a))
    la = a * seg(t, LAST2 - .1, LAST2 + .4) * (1 - seg(t, Q3 - .6, Q3 - .1))
    if la > 0: text(c, 'the last door', x + w / 2, y - 40, 26, 800, GOLD, la, 'c')
    c.restore()

def _floor(c, t):
    a = seg(t, QS, QS + .6)
    c.drawLine(80, FLOOR, 1840, FLOOR, paint('#46557a', .5 * a, stroke=2, cap=False))
    c.drawRect(skia.Rect(80, FLOOR, 1840, FLOOR + 30), paint(shader=lgrad((0, FLOOR), (0, FLOOR + 30), [('#46557a', .18), ('#46557a', 0)]), a=a))

# ---------------------------------------------------------------- q1 / q2: the blogger and her bill
BL = dict(visit=[MENT1 + .05 + .42 * (4 - k) for k in range(5)])     # bill hovers at door 36 first, then 35 ... 30

def _blogger(c, t):
    a = seg(t, QS, QS + .6) * (1 - seg(t, COND2 - .6, COND2 + .2))
    if a <= 0: return
    person(c, 1620, FLOOR, 1.12, a, 'q_blogger', t, talk=.0, mood=.7, look=-.35)
    cake(c, 1420, FLOOR, .78, a * seg(t, TASTE1 - .5, TASTE1), 'slice')
    pa = a * seg(t, BLOG1 - .4, BLOG1 + .1)
    def scr(cv, r):
        sx, sy, sw, sh = r
        cake(cv, sx + sw / 2, sy + sh * .62, .42, 1., 'slice')
        hu = seg(t, TASTE1, TASTE1 + .5, back)
        if hu > 0: icon(cv, 'heart', sx + sw / 2, sy + sh * .2, .5 * hu, PINK, 1, 4)
        for k in range(5):
            ss = seg(t, TASTE1 + .3 + .12 * k, TASTE1 + .5 + .12 * k)
            if ss > 0: icon(cv, 'star', sx + 14 + k * (sw - 28) / 4, sy + sh * .88, .2 * ss, GOLD, 1, 5)
    phone(c, 1785, 640, .58, pa, scr)
    text(c, 'food blogger', 1620, FLOOR + 34, 26, 800, DIM, a * seg(t, BLOG1, BLOG1 + .4), 'c')

def _bill_pos(t):
    """Where the blogger's bill is at t (x, y, scale, angle, alpha)."""
    it = ITEMS[0]; r = it['t_res']
    if t < PAYS1 - .1: return None
    x, y, s, ang = 1430, 470, 1., -4
    u0 = seg(t, PAYS1 - .1, PAYS1 + .35, back); s = .6 + .4 * u0
    if t > MENT1 - .2: s *= lerp(1, .82, seg(t, MENT1 - .2, MENT1 + .3)) * lerp(1, 1 / .82, seg(t, LAST2, LAST2 + 1.))
    if t > MENT1 - .2:
        stops = [(MENT1 - .2, (1430, 470))] + [(BL['visit'][k], (_sd_x(k) + SDW / 2, 372)) for k in range(4, -1, -1)]
        pts = [(tt, p) for tt, p in stops]
        x, y = keys(t, [(tt, p) for tt, p in pts])
        ang = 4 * math.sin(t * 3)
    if t > LOST1 - .4:
        d = seg(t, LOST1 - .4, LOST1 + .2) * (1 - seg(t, NO2 - .2, NO2 + .2))
        y += 40 * d; ang += -14 * d
    if t > LAST2:
        u = seg(t, LAST2, LAST2 + 1.2)
        x, y = lerp(x, SPOT[0], u), lerp(y, SPOT[1], u) - 70 * math.sin(math.pi * u)
        ang = lerp(ang, 0, u)
        if u >= 1 and t < r: y += 5 * math.sin((t - LAST2) * 3.2); ang = 1.5 * math.sin((t - LAST2) * 2.1)
    s *= 1.
    al = 1.
    if t > r:
        u = seg(t, r + .15, r + .75, ein)
        x, y, s, al = lerp(SPOT[0], SPOT[0] + 20, u), lerp(SPOT[1], SPOT[1] - 30, u), lerp(1, .35, u), 1 - seg(t, r + .5, r + .8)
    return x, y, s, ang, al

def _bill(c, t):
    p = _bill_pos(t)
    if not p: return
    x, y, s, ang, al = p
    if al <= 0: return
    it = ITEMS[0]
    _art(c, it, x, y, s, al, ang)
    qa = win(t, LOST1 - .1, NO2, .3, .3)
    if qa > 0: text(c, '?', x + 120, y - 60, 64, 800, GOLD, qa * (.6 + .4 * math.sin(t * 6)), 'c', shadow=6)
    for k in range(5):
        v = BL['visit'][k]; xa = win(t, v, v + 1.1, .1, .5)
        if xa > 0: cross(c, _sd_x(k) + SDW / 2, SDY + 82, xa * .95, 18)

# ---------------------------------------------------------------- q3 on: conditions, never passes, the shelf
def _lamp(t, k):
    """Green level of condition lamp k (expenses being passed light them in turn)."""
    g = 0.
    for it in ITEMS:
        if not it['ok']: continue
        tk = it['ticks'][k]; g = max(g, win(t, tk, it['t_res'] + 1.1, .15, .45))
    return g

def _conditions(c, t):
    a = seg(t, COND2 - .1, COND2 + .6) * (1 - .55 * seg(t, Q9 - .5, Q9))
    if a <= 0: return
    sl = 1 - seg(t, COND2 - .1, COND2 + .7, eout)
    x = CPX - 120 * sl
    rows_t = [WHOLLY3 - .25, CAPITAL3 - .25, PERSONAL3 - .25]
    h = 64 + 3 * 54 + 10
    _box(c, x, CPY, CPW, h, VIO, a, -.85, r=18)
    text(c, 'SECTION 37(1) · CONDITIONS', x + 26, CPY + 40, 20, 800, VIO, a, track=3)
    hl1 = win(t, NOTICE4 - .2, UNWISE4, .3, .5)
    for k, s in enumerate(COND):
        ra = a * seg(t, rows_t[k], rows_t[k] + .4)
        if ra <= 0: continue
        yy = CPY + 64 + 54 * k
        g = _lamp(t, k)
        if k == 0 and hl1 > 0: c.drawRRect(rrect(x + 12, yy, CPW - 24, 48, 10), paint(GOLD, .14 * hl1 * a))
        c.drawCircle(x + 42, yy + 24, 14, paint(mixc('#26304d', GREEN, g), ra))
        c.drawCircle(x + 42, yy + 24, 14, paint(mixc('#5d6c92', GREEN, g), ra, stroke=2))
        if g > .3:
            p = skia.Path(); p.moveTo(x + 35, yy + 24); p.lineTo(x + 40, yy + 30); p.lineTo(x + 50, yy + 18)
            c.drawPath(p, paint('#052e16', ra * g, stroke=3))
        text(c, s, x + 72, yy + 34, 27, 700, mixc(WHITE, GOLD, hl1 if k == 0 else 0), ra)

def _necessarily(c, t):
    a = win(t, WHOLLY4 - .2, ILLEGAL5 - .5, .35, .5)
    if a <= 0: return
    x = CPX + 30
    text(c, 'wholly and exclusively', x, 600, 40, 800, GOLD, a)
    na = a * seg(t, NECESS4 - .3, NECESS4 + .1)
    text(c, 'not', x, 672, 34, 700, DIM, na)
    w0 = text_w('not ', 34, 700); w1 = text_w('necessarily', 34, 700)
    text(c, 'necessarily', x + w0, 672, 34, 700, DIM, na)
    su = seg(t, NECESS4 + .2, NECESS4 + .7)
    if su > 0: c.drawLine(x + w0 - 4, 660, x + w0 - 4 + (w1 + 8) * su, 660, paint(RED, na, stroke=4))
    ua = a * seg(t, UNWISE4 - .2, UNWISE4 + .3)
    text(c, 'even if spent unwisely', x, 744, 30, 700, WHITE, ua)
    if t > ALLOWED4: tick(c, x + text_w('even if spent unwisely', 30, 700) + 34, 734, ua * seg(t, ALLOWED4, ALLOWED4 + .3, back), 18)

def _never(c, t):
    a = seg(t, ILLEGAL5 - .3, ILLEGAL5 + .3) * (1 - seg(t, Q9 - .6, Q9))
    if a <= 0: return
    sl = 1 - seg(t, ILLEGAL5 - .3, ILLEGAL5 + .5, eout)
    x = NPX - 120 * sl
    h = 48 + 6 * 42 + 12
    _box(c, x, NPY, NPW, h, RED, a, -.86, glow=.5 * win(t, NEVER5 - .2, NEVER5 + 1.2, .2, .6), r=18)
    text(c, 'NEVER PASSES', x + 26, NPY + 36, 20, 800, RED, a, track=3)
    slots2 = win(t, MORE7 - .2, NEVER7 + 1.5, .3, .5)
    for k, (s, ch, ch2) in enumerate(NEVER):
        it = next(i for i in ITEMS if i.get('row') == k)
        yy = NPY + 48 + 42 * k
        ra = a * seg(t, it['t_res'] + .6, it['t_res'] + .9)
        if k >= 4 and slots2 > 0 and ra < 1:
            p = paint(RED, .4 * a * slots2, stroke=1.4, cap=False); p.setPathEffect(skia.DashPathEffect.Make([8, 6], 0))
            c.drawRRect(rrect(x + 14, yy + 2, NPW - 28, 36, 8), p)
        if ra <= 0: continue
        fla = win(t, it['t_res'] + .6, it['t_res'] + 1.8, .1, .8)
        if fla > 0: c.drawRRect(rrect(x + 12, yy, NPW - 24, 40, 8), paint(RED, .2 * fla * a))
        cross(c, x + 36, yy + 20, ra, 12)
        text(c, s, x + 60, yy + 29, 25, 700, WHITE, ra)
        w = text_w(s, 25, 700)
        cw = sec(c, x + 60 + w + 14, yy + 20, ch, ra, VIO, 21)
        if ch2: chip(c, x + 60 + w + 14 + cw + 10, yy + 20, ch2, GOLD, ra, 20, 'l')

def _shelf(c, t):
    a = seg(t, ITEMS[0]['t_res'] + .3, ITEMS[0]['t_res'] + .8) * (1 - .6 * seg(t, Q9 - .5, Q9))
    if a <= 0: return
    gl = win(t, SOME8 - .2, SOME8 + 1.6, .3, .6)
    text(c, 'PASSES THE LAST DOOR', SHX, SHY, 20, 800, GREEN, a * (1 - .4 * gl) + .4 * gl * a, track=3)
    for it in ITEMS:
        if not it['ok']: continue
        r = it['t_res']; u = seg(t, r + .65, r + 1.25, eout)
        if u <= 0: continue
        sx, sy = SLOT[it['slot']]
        x, y = lerp(DX + DW - 40, sx, u), lerp(SPOT[1] - 60, sy, u) - 50 * math.sin(math.pi * u)
        ca = a * seg(t, r + .65, r + .9)
        glo = win(t, r + 1.1, r + 2.4, .2, .6)
        if it['slot'] == 0: glo = max(glo, win(t, FOOD8 - .2, FOOD8 + 1.6, .2, .6))
        _box(c, x, y, CARDW, CARDH, GREEN, ca, -.84, glow=glo, r=14)
        tl, tsz, _ = PR._fit(it['card'][0], 25, 800, CARDW - 66, 20)
        text(c, tl, x + 20, y + 40, tsz, 800, WHITE, ca)
        st = it.get('sub_t')
        sa = ca * (seg(t, st - .2, st + .3) if st else 1)
        text(c, it['card'][1], x + 20, y + 76, 22, 600, GREEN if st else DIM, sa)
        tick(c, x + CARDW - 26, y + 26, ca * seg(t, r + 1.1, r + 1.4, back), 13)

# ---------------------------------------------------------------- the stream of expenses at the door
def _items(c, t):
    for it in ITEMS[1:]:
        t0, r = it['t_in'], it['t_res']
        if t < t0 or t > r + 1.4: continue
        u = seg(t, t0, t0 + .6, eout)
        x, y = lerp(-160, SPOT[0], u), lerp(980, SPOT[1], u) - 120 * math.sin(math.pi * u)
        s, ang, al = .95, lerp(-25, 0, u), 1.
        if t0 + .6 < t < r: y += 5 * math.sin((t - t0) * 4)
        if it['ok']:
            v = seg(t, r + .15, r + .75, ein)
            x, y, s, al = lerp(SPOT[0], SPOT[0] + 20, v), lerp(SPOT[1], SPOT[1] - 30, v), lerp(.95, .33, v), 1 - seg(t, r + .5, r + .8)
        else:
            k = it['row']; tx, ty = NPX + 36, NPY + 68 + 42 * k
            v1 = seg(t, r, r + .25, eout); v2 = seg(t, r + .25, r + .85, ease)
            if v1 > 0:
                x, y = lerp(SPOT[0], SPOT[0] - 70, v1), lerp(SPOT[1], SPOT[1] + 20, v1); ang = -12 * v1
            if v2 > 0:
                x, y = lerp(SPOT[0] - 70, tx, v2), lerp(SPOT[1] + 20, ty, v2) - 90 * math.sin(math.pi * v2)
                s = lerp(.95, .22, v2); ang = lerp(-12, 0, v2); al = 1 - seg(v2, .75, 1)
            if v1 > 0 and v2 < .2:
                c.drawCircle(x, y, 120, paint(RED, .25 * win(t, r, r + .5, .05, .3), blur=30))
        _art(c, it, x, y, s, al, ang)
        tg = it.get('tag')
        if tg and t < r: chip(c, x, y - 100, tg + '?', ORANGE, al * seg(t, t0 + .4, t0 + .7), 24)
    # since 1 Apr 2025
    ca = win(t, APRIL6 - .3, SETTLE6 - .1, .3, .4)
    if ca > 0:
        u = seg(t, APRIL6 - .3, APRIL6 + .2, back)
        calendar(c, SPOT[0], 560, ca, 23, 'APR', 2025, .62 * (.85 + .15 * u), VIO)
        text(c, 'from 23 April 2025', SPOT[0], 720, 28, 800, WHITE, ca, 'c', shadow=6)
    # SEBI / Competition labels while the settlement waits
    it = ITEMS[5]
    for k, (wt, s) in enumerate(((SEBI6, 'SEBI'), (COMP6, 'Competition law'))):
        la = win(t, wt - .1, it['t_res'] + .1, .25, .25)
        if la > 0: chip(c, SPOT[0], 470 + 52 * k, s, VIO, la, 24)
    # CSR waits: "company"
    it = ITEMS[7]; la = win(t, COMPANY7 - .1, it['t_res'] + .1, .25, .25)
    if la > 0: chip(c, SPOT[0], 500, 'company', GREEN, la, 24)
    it = ITEMS[8]; la = win(t, POLIT7 - .1, it['t_res'] + .1, .25, .25)
    if la > 0: chip(c, SPOT[0], 500, 'political party', ORANGE, la, 24)

# ---------------------------------------------------------------- q9: the check, below the card
def _check(c, t):
    a = seg(t, Q9 - .3, Q9 + .3)
    if a <= 0: return
    va = a * seg(t, VAN9 - .3, VAN9 + .2)
    mv = seg(t, VAN9 - .4, VAN9 + .6, eout)
    van(c, lerp(240, 410, mv), FLOOR + 4, .52, va, BLUE, "Meera's Bakehouse", t, 1 - mv)
    ta = a * seg(t, TWO9 - .2, TWO9 + .25, back)
    if ta <= 0: return
    r = Q9A
    u = seg(t, PARK9, PARK9 + .9, eout)
    x = lerp(620, DX - 70, u); y = 748 + (4 * math.sin((t - PARK9) * 2.4) * u if t < Q9A else 0)
    ang = 0.
    if t > r:
        v = seg(t, r, r + .5, eout); x = lerp(DX - 70, DX - 170, v); y = 748 + 24 * v; ang = -10 * v
    bill(c, x, y, ta, 'Parking fine', 2000, 'cash', None, .62, ang, RED)
    xa = a * seg(t, r + .1, r + .4, back)
    if xa > 0:
        cross(c, x + 70, y - 40, xa, 18)
        la = a * seg(t, A_PEN - .2, A_PEN + .3)
        text(c, 'penalty for', SPOT[0], 738, 24, 800, RED, la, 'c')
        text(c, 'breaking the law', SPOT[0], 768, 24, 800, RED, la, 'c')

from contextlib import nullcontext as _nullctx

def ch_q(c, t):
    if t < QS - .5 or t > QE + .5: return
    _floor(c, t)
    _corridor(c, t, BL)
    _blogger(c, t)
    dim = 1 - .8 * seg(t, T('q9') - .4, T('q9') + .4)        # the check card owns the middle: quiet the stage
    with layer(c, dim) if dim < .999 else _nullctx():
        _door(c, t)
        _conditions(c, t)
        _never(c, t)
        _necessarily(c, t)
        _shelf(c, t)
    _bill(c, t)
    _items(c, t)
    _check(c, t)

if __name__ == '__main__':
    for nm in ('PAYS1 BLOG1 TASTE1 NO1 MENT1 LOST1 NO2 SEV2 LAST2 COVER2 THIRTY2 SIX2 STILL2 COND2 WHOLLY3 CAPITAL3 '
               'PERSONAL3 NOTICE4 WHOLLY4 NECESS4 UNWISE4 ALLOWED4 ILLEGAL5 NEVER5 BRIBE5 PENALTY5 LAW5 FREE5 DOCTORS5 '
               'APRIL6 SETTLE6 SEBI6 COMP6 BLOCK6 LATE6 CONTRACT6 FINE6 COMPENS6 MORE7 CSR7 COMPANY7 NEVER7 ADV7 POLIT7 '
               'SOUV7 SOME8 KEY8 PREM8 PARTNER8 FOOD8 LEGAL8 DEFEND8 VAN9 TWO9 PARK9 A_PEN').split():
        print(nm, round(globals()[nm], 2))
    print(len(EVENTS), 'events')
