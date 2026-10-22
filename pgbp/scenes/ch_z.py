"""Chapter Z — Meera's full computation (the film's climax): every line of her books through the machine.

z1 hook: Meera beside her cream P&L ("Net profit ₹12,00,000", highlighted on "twelve lakh"); the five-stage PGBP
   machine rolls in on "put every line"; on "machine" the P&L drops into the hopper; "Ready?" lights stage one.
z2 the machine folds into a "SECTION 29 · THE MACHINE" rail (top right; the active stage glows, finished stages tick)
   and the computation sheet "Computation of PGBP · Meera · A.Y. 2026-27" slides in (left). Each item first shows in
   the source card (bottom right: the bill / prop from its chapter, a stamp with the verdict, the rule in one line,
   "seen in NN · chapter"), then its icon flies into the sheet and the row lands on the spoken amount:
   net profit ₹12,00,000 · ADD BACK head · book depreciation ₹3,10,000 [replaced by § 32] · income-tax ₹1,20,000
   [40(a)(ii)] · new oven written off ₹4,00,000 [capital].
z3 cash to the packaging supplier ₹24,000 [40A(3)] · 30% of the consultant's fee without TDS ₹45,000 [40(a)(ia)]
   (30% × ₹1,50,000) · bonus paid after the return date ₹80,000 [43B] · late MSME bill ₹60,000 [43B(h)].
z4 family trip ₹40,000 [37 · personal] · food safety penalty ₹15,000 [Expl. 1 · § 37] · provision for gratuity
   ₹50,000 [40A(7)] → "Total so far ₹23,44,000" (sum card with the ten add-back icons).
z5 LESS head · depreciation as per the Act ₹2,85,000 [32] (card: P&M ₹2,25,000 + building ₹20,000 + furniture
   ₹20,000 + laptop ₹20,000; also a note row) · last year's bonus paid this year ₹70,000 [43B] → ₹19,89,000.
z6 LESS other heads · bank interest ₹30,000 [other sources] · rent from a flat ₹1,20,000 [house property] (a coin
   leaves the PGBP tile for the other head) → ₹18,39,000.
z7 ADD deemed income · bad debt recovered ₹25,000 [41(4)] · supplier's waived bill ₹35,000 [41(1)] → the total
   row "Income under PGBP" rolls to ₹18,99,000 with the words: gold flash, light sweep, sparks, the machine's
   "= Income under PGBP" lights; the card turns to Meera: "In the books ₹12,00,000 ? → For tax ₹18,99,000 ✓".
z8 WHAT IF: the sheet slides away; the regime switch flips to "Opted out"; a two-column sheet "If Meera opts out of
   115BAC": income ₹18,99,000 | ₹18,99,000 · additional depreciation [32(1)(iia)] — | ₹1,00,000 (the oven
   ₹80,000 and the mixer ₹20,000 from chapter 11 feed it) · income ₹18,99,000 | ₹17,99,000.
z9–z10 recap: eight chapter cards (§ 28 what's caught · the books · depreciation in blocks · half rate under 180 days ·
   §§ 30–37 costs in · 40 / 40A / 43B out or wait · § 41 comes back · presumptive) light as each is named.
z11 the bakery at dusk; the three questions return and glow in turn, each with Meera's own adjustments that answer
   it (business income? bank interest, rent, bad debt recovered, waived bill · allowed? income-tax, cash payment,
   family trip, penalty · this year? oven, TDS, bonus, MSME bill); a slow push-in to the end of the film.
"""
from scenes.common import *
import props as _P

EVENTS = []
def _ev(t, k): EVENTS.append([round(t, 3), k])

Z0, Z1E = B.span('z')
T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11 = (T(f'z{i}') for i in range(1, 12))
FILM_END = B.list[-1]['end'] + 3.6

# ---------------------------------------------------------------- layout
SX, SY, SW, MH = 100, 172, 1110, 560                         # the computation sheet (top-left, width, window)
TITLE, TITLE_R = 'Computation of PGBP · Meera', 'A.Y. 2026-27'
RX, RW = 1250, 590                                           # right column
RAIL_Y, RAIL_H = 172, 316                                    # the machine rail
CARD_Y, CARD_H = 504, 324                                    # the source card
ACX, ACY = RX + RW / 2, CARD_Y + 104                         # card art centre
MX, MY, MW, MHh = 900, 430, 920, 320                         # z1 machine
LX, LY, LW = 400, 352, 470                                   # z1 ledger
CHN = {ch['key']: (i, ch['title']) for i, ch in enumerate(B.chapters)}

# ---------------------------------------------------------------- word times
BOOKS1, TWELVE1, PUT1, MACH1, READY1 = (W('z1', w) for w in ('books', 'twelve', 'put', 'machine', 'ready'))
NET2, ADD2 = W('z2', 'net'), W('z2', 'add')
TOT_IN = W('z7', 'meera')                                    # "Meera's business income is ..."
TOT_R0 = W('z7', 'eighteen') - .1                            # the total rolls with the words
LAND = W('z7', 'thousand', occ=2)                            # ... "ninety nine thousand" — it lands
OPT8, ADDL8, ONE8, OVEN8, MIX8, HER8, SEV8 = (W('z8', w) for w in ('opted', 'additional', 'one', 'oven', 'mixer', 'her', 'seventeen'))

# ---------------------------------------------------------------- the rows (sheet) and the items (source card)
def _row(kind, label, amt=None, t0=0., sec=None, **kw):
    d = dict(kind=kind, label=label, amt=amt, t0=t0, **kw)
    if sec: d['sec'] = sec
    return d

# items: key, row label, amount, kind, sec, t_in (named), t_amt (spoken amount), icon, colour, rule, source chapter, art
_IT = [
    ('net', 'Net profit as per P&L', 1200000, 'start', None, NET2 - .3, W('z2', 'twelve') - .12, 'doc', ACC,
     'The books are only the starting point', 'e', 'ledger'),
    ('bookdep', 'Book depreciation', 310000, 'add', 'replaced by § 32', W('z2', 'book') - .3, W('z2', 'three') - .1, 'percent', GREEN,
     "Book depreciation goes back · only the Act's depreciation counts", 'g', 'ledger_strike'),
    ('tax', 'Income-tax', 120000, 'add', '40(a)(ii)', W('z2', 'income tax') - .3, W('z2', 'one') - .1, 'tax', GREEN,
     'Income-tax is never a business expense', 'r', ('bill', 'Income-tax', 'bank', 'DISALLOWED', RED)),
    ('oven', 'New oven, written off as expense', 400000, 'add', 'capital', W('z2', 'oven') - .3, W('z2', 'four') - .1, 'factory', GREEN,
     'A capital asset: depreciation, not an expense', 'f', 'oven'),
    ('cash', 'Cash to packaging supplier', 24000, 'add', '40A(3)', W('z3', 'cash') - .3, W('z3', 'twenty') - .1, 'cash', GREEN,
     'Cash over ₹10,000 to one person in a day', 't', ('bill', 'Packaging', 'cash', 'DISALLOWED', RED)),
    ('tds', "30% of consultant's fee, no TDS", 45000, 'add', '40(a)(ia)', W('z3', 'thirty') - .3, W('z3', 'forty') - .1, 'percent', GREEN,
     'No TDS · 30% × ₹1,50,000 = ₹45,000', 'r', ('bill', 'Chef-consultant fee', 'upi', '30% OUT', RED, 150000)),
    ('bonus', 'Bonus paid after the return date', 80000, 'add', '43B', W('z3', 'bonus') - .3, W('z3', 'eighty') - .1, 'salary', GREEN,
     "Paid after the return's due date · deductible next year", 'u', ('bill', 'Staff bonus', 'bank', 'NEXT YEAR', VIO)),
    ('msme', 'Late MSME bill', 60000, 'add', '43B(h)', W('z3', 'msme') - .3, W('z3', 'sixty') - .1, 'box', GREEN,
     'Micro / small supplier paid late · deductible only when paid', 'u', ('bill', 'Micro supplier', 'credit', 'WHEN PAID', VIO)),
    ('trip', 'Family trip', 40000, 'add', '37 · personal', W('z4', 'family') - .3, W('z4', 'forty') - .1, 'heart', GREEN,
     'Personal, not for the business', 'q', ('bill', 'Family trip', 'card', 'PERSONAL', RED)),
    ('penalty', 'Food safety penalty', 15000, 'add', 'Expl. 1 · § 37', W('z4', 'food') - .3, W('z4', 'fifteen') - .1, 'scale', GREEN,
     'A penalty for breaking a law never passes', 'q', 'form'),
    ('grat', 'Provision for gratuity', 50000, 'add', '40A(7)', W('z4', 'provision') - .3, W('z4', 'fifty') - .1, 'piggy', GREEN,
     'A provision is not a payment', 't', ('bill', 'Gratuity provision', None, 'DISALLOWED', RED)),
    ('sub1', 'Total so far', 2344000, 'sub', None, W('z4', 'total') - .3, W('z4', 'twenty') - .1, None, GOLD,
     None, None, 'sum'),
    ('actdep', 'Depreciation as per the Act', 285000, 'less', '32', W('z5', 'depreciation') - .3, W('z5', 'two') - .1, 'gear', RED,
     'Depreciation as per the Act, block by block', 'i', 'blocks'),
    ('lastbonus', "Last year's bonus, paid this year", 70000, 'less', '43B', W('z5', 'last') - .3, W('z5', 'seventy') - .1, 'salary', RED,
     'Disallowed last year · allowed in the year it is paid', 'u', ('bill', 'Bonus · last year', 'bank', 'ALLOWED', GREEN)),
    ('sub2', 'That leaves', 1989000, 'sub', None, W('z5', 'leaves') - .3, W('z5', 'nineteen') - .1, None, GOLD,
     None, None, 'sum'),
    ('bank', 'Bank interest', 30000, 'less', 'other sources', W('z6', 'thirty') - .55, W('z6', 'thirty') - .1, 'bank', RED,
     'Taxed under income from other sources', 'e', ('heads', 'Other sources', 'coins')),
    ('rent', 'Rent from a flat', 120000, 'less', 'house property', W('z6', 'one') - .55, W('z6', 'one') - .1, 'house', RED,
     'Taxed under income from house property', 'c', ('heads', 'House property', 'house')),
    ('sub3', 'That leaves', 1839000, 'sub', None, W('z6', 'leaves') - .3, W('z6', 'eighteen') - .1, None, GOLD,
     None, None, 'sum'),
    ('bad', 'Bad debt recovered', 25000, 'add', '41(4)', W('z7', 'bad') - .3, W('z7', 'twenty') - .1, 'coins', GREEN,
     'Deducted earlier, recovered now · income again', 'v', ('bill', 'Bad debt recovered', 'bank', 'DEEMED INCOME', GOLD)),
    ('waive', "Supplier's waived bill", 35000, 'add', '41(1)', W('z7', 'supplier') - .3, W('z7', 'thirty') - .1, 'transfer', GREEN,
     'A bill she deducted, now waived · remission is income', 'v', ('bill', 'Supplier bill · waived', 'credit', 'DEEMED INCOME', GOLD)),
    ('total', 'Income under PGBP', 1899000, 'total', None, TOT_IN - .3, TOT_IN - .1, None, GOLD, None, None, 'hero'),
]
ITEMS = [dict(zip(('key', 'label', 'amt', 'kind', 'sec', 'tin', 'tamt', 'icon', 'col', 'rule', 'src', 'art'), r)) for r in _IT]
IK = {it['key']: it for it in ITEMS}

HEADS = {                                                    # head rows, inserted before these items
    'bookdep': ("Add back · what the law doesn't allow", ADD2 - .1, GREEN),
    'actdep': ('Less · what the books missed', W('z5', 'deduct') - .1, RED),
    'bank': ("Less · other heads' income", W('z6', 'take') - .1, RED),
    'bad': ('Add · deemed income', W('z7', 'add') - .1, GREEN),
}
ROWS = []; RI = {}
for k, it in enumerate(ITEMS):
    if it['key'] in HEADS:
        lab_, t0, col = HEADS[it['key']]; ROWS.append(_row('head', lab_, t0=t0, col=col))
    nxt = ITEMS[k + 1]['tamt'] if k + 1 < len(ITEMS) else it['tamt'] + 3
    kw = {}
    if it['kind'] in ('add', 'less', 'start'): kw['hl'] = (it['tamt'] + .05, nxt - .2)
    if it['kind'] == 'sub': kw['hl'] = (it['tamt'] + .1, it['tamt'] + 2.6)
    RI[it['key']] = len(ROWS)
    ROWS.append(_row(it['kind'], it['label'], None if it['kind'] == 'total' else it['amt'], it['tamt'], it['sec'], **kw))
    if it['key'] == 'actdep':
        RI['note'] = len(ROWS)
        ROWS.append(_row('note', 'P&M ₹2,25,000 + building ₹20,000 + furniture ₹20,000 + laptop ₹20,000',
                         t0=W('z5', 'rupees') - .1))
    if it['key'] == 'oven':                                  # "wrongly written off as an expense" — the row glows again
        ROWS[-1]['hl'] = (it['tamt'] + .05, W('z2', 'expense') + .9)
TOT_ROW = RI['total']

# machine rail stages
RAIL = [('Net profit', '₹', ACC), ("Add back what the law doesn't allow", '+', GREEN), ('Deduct what the books missed', '−', RED),
        ("Take out other heads' income", '−', RED), ('Add deemed income', '+', GREEN)]
ST = [NET2 - .25, ADD2 - .15, W('z5', 'deduct') - .15, W('z6', 'take') - .15, W('z7', 'add') - .15, LAND]
DONE = [ADD2 - .15, IK['sub1']['tamt'] + .4, IK['sub2']['tamt'] + .4, IK['sub3']['tamt'] + .4, LAND]

# stamps on the source card: impact at u ~ .3
def _stamp_u(it, t): return seg(t, it['tamt'] + .12, it['tamt'] + 1.05, linr)
STAMP_HIT = {it['key']: it['tamt'] + .12 + .3 * .93 for it in ITEMS}

# z8 comparison sheet (two columns)
ROWS2 = [
    _row('start', 'Income under PGBP', 1899000, T8 + .8, amt2=1899000, t2=OPT8 + 1.),
    _row('less', 'Additional depreciation', None, ADDL8 - .1, sec='32(1)(iia)', amt2=100000, t2=ONE8 - .1),
    _row('total', 'Income under PGBP', 1899000, HER8 - .15, amt2=1799000, t2=SEV8 - .1),
]
CX2, CY2, CW2 = 530, 404, 1230
COLS2 = ('Default', 'Opted out')

# recap cards (z9, z10)
RECAP = [
    ('28', None, "What's caught", "decides what's caught", 'shop', ACC, W('z9', 'section') - .1, '02'),
    ('29', None, 'The books', 'only the starting point', 'doc', BLUE, W('z9', 'books') - .1, '04'),
    ('32', None, 'Depreciation', 'capital becomes depreciation, in blocks', 'gear', ACC, W('z9', 'capital') - .1, '06 · 07'),
    ('under 180 days', '', 'Half rate', 'for assets used under 180 days', 'calendar', GOLD, W('z9', 'half') - .1, '08'),
    ('30–37', None, 'Costs in', 'sections 30 to 37 let costs in', 'coins', GREEN, W('z10', 'sections') - .1, '05 · 12 – 16'),
    ('40 · 40A · 43B', None, 'Out, or wait', 'keep some out, or make them wait', 'lock', RED, W('z10', 'sections', occ=1) - .1, '17 – 20'),
    ('41', None, 'Comes back', 'brings back what returns', 'transfer', GOLD, W('z10', 'section') - .1, '21'),
    ('44AD · 44ADA · 44AE', None, 'Presumptive', 'the small-business shortcut', 'calc', VIO, W('z10', 'small') - .1, '23 · 24'),
]
OUT10, WAIT10, BLOCKS9 = W('z10', 'out'), W('z10', 'wait'), W('z9', 'blocks')

# z11 the three questions
QS = [('Is it business income?', ['bank interest', 'rent', 'bad debt recovered', 'waived bill'], ACC, W('z11', 'is', occ=0)),
      ('Is it allowed?', ['income-tax', 'cash payment', 'family trip', 'penalty'], RED, W('z11', 'is', occ=1)),
      ('Is it allowed this year?', ['oven', 'TDS', 'bonus', 'MSME bill'], GOLD, W('z11', 'is', occ=2))]
THREE11, ASK11 = W('z11', 'three'), W('z11', 'ask')

# ---------------------------------------------------------------- SFX (≤ 25)
for tt, k in ((BOOKS1, 'flip'), (MACH1, 'whoosh'), (READY1, 'blip'), (T2 + .3, 'whoosh'), (IK['net']['tamt'], 'tick'),
              (STAMP_HIT['tax'], 'thunk'), (STAMP_HIT['oven'], 'thunk'), (STAMP_HIT['cash'], 'thunk'), (STAMP_HIT['tds'], 'thunk'),
              (STAMP_HIT['bonus'], 'thunk'), (STAMP_HIT['trip'], 'thunk'), (IK['sub1']['tamt'] + .5, 'chime_lo'),
              (IK['actdep']['tamt'], 'tick'), (IK['sub2']['tamt'] + .5, 'chime_lo'), (IK['bank']['tamt'] + .45, 'pop'),
              (IK['rent']['tamt'] + .45, 'pop'), (IK['sub3']['tamt'] + .5, 'chime_lo'), (STAMP_HIT['bad'], 'thunk'),
              (LAND, 'chime'), (LAND + .06, 'spark'), (OPT8 + .4, 'tap'), (SEV8 + .6, 'ok'),
              (RECAP[0][6], 'blip'), (RECAP[4][6], 'blip'), (ASK11, 'chime_lo')):
    _ev(tt, k)

# ---------------------------------------------------------------- small helpers
def _glass(c, x, y, w, h, a, r=20):
    if a <= 0: return
    with _P._fade(c, a, (x - 40, y - 30, x + w + 40, y + h + 50)):
        _P._glass(c, x, y, w, h, r)

def _glow(c, x, y, w, h, r, col, a):
    """A soft coloured halo round a rounded rect, from three plain strokes (no blur: cheap at any size)."""
    if a <= 0: return
    for sw, al in ((14, .07), (8, .14), (3.5, .35)):
        c.drawRRect(rrect(x - sw / 2 + 1, y - sw / 2 + 1, w + sw - 2, h + sw - 2, r + sw / 2), paint(col, al * a, stroke=sw))

def _disc(c, x, y, r, ic, col, a, fill='#0b1430'):
    """A round icon badge: the small icon that flies from an item's card into its sheet row."""
    if a <= 0: return
    c.drawCircle(x, y, r + 7, paint(col, .16 * a)); c.drawCircle(x, y, r + 3.5, paint(col, .18 * a))
    c.drawCircle(x, y, r, paint(fill, a)); c.drawCircle(x, y, r, paint(col, a, stroke=2.4))
    if ic: icon(c, ic, x, y, r / 46, shade(col, .25), a, 3.6)

def _bez(p0, p1, p2, q):
    return ((1 - q) ** 2 * p0[0] + 2 * (1 - q) * q * p1[0] + q * q * p2[0],
            (1 - q) ** 2 * p0[1] + 2 * (1 - q) * q * p1[1] + q * q * p2[1])

def _fly(c, t, t0, t1, p0, p2, ic, col, a):
    """The item's icon arcs from the card to its row (arriving at t1), then a ring flashes where it lands."""
    if a <= 0: return
    u = seg(t, t0, t1, linr)
    if 0 < u < 1:
        p1 = ((p0[0] + p2[0]) / 2, min(p0[1], p2[1]) - 110)
        ue = ease(u)
        for k in range(6, 0, -1):
            x, y = _bez(p0, p1, p2, max(0., ue - k * .035))
            c.drawCircle(x, y, 15 - k * 1.4, paint(col, .16 * a * (1 - k / 7)))
        x, y = _bez(p0, p1, p2, ue)
        _disc(c, x, y, lerp(30, 19, ue), ic, col, a)
    q = seg(t, t1, t1 + .5, linr)
    if 0 < q < 1:
        c.drawCircle(p2[0], p2[1], 16 + 34 * eout(q), paint(col, .85 * a * (1 - q), stroke=3))

def _sparks(c, x, y, t, t0, a, n=26, col=GOLD):
    """A burst of gold sparks from (x, y) starting at t0 (deterministic)."""
    q = t - t0
    if a <= 0 or q <= 0 or q > 1.6: return
    for i in range(n):
        ang = -math.pi * (.08 + .84 * hsh(i, 3)) if i % 3 else math.tau * hsh(i, 5)
        sp = 260 + 340 * hsh(i, 7)
        px = x + math.cos(ang) * sp * q * (1 - .35 * q)
        py = y + math.sin(ang) * sp * q * (1 - .35 * q) + 260 * q * q
        f = clamp(1 - q / (1.0 + .6 * hsh(i, 9)))
        if f <= 0: continue
        r = 2.4 + 2.6 * hsh(i, 11)
        c.drawCircle(px, py, r * 2.4, paint(col, .12 * f * a))
        c.drawCircle(px, py, r, paint(shade(col, .4), f * a))

def _src(c, key, x, y, a, size=22):
    """'SEEN IN  19 · Relatives and cash' — where this rule was taught."""
    if a <= 0 or not key: return
    n, title = CHN[key]
    tw = text_w('SEEN IN', size - 2, 800, 2.5)
    text(c, 'SEEN IN', x, y, size - 2, 800, ACC, a * .9, track=2.5)
    text(c, f'{n:02d} · {title}', x + tw + 14, y, size, 600, DIM, a)

def _lines(c, s, x, y, size, col, a, maxw, w=700, lh=1.25, align='l', n=2):
    for k, ln in enumerate(wrap(s, size, maxw, w)[:n]):
        text(c, ln, x, y + k * size * lh, size, w, col, a, align)

# ---------------------------------------------------------------- z1: Meera, her P&L, the machine
def _machine_pose(t):
    """The machine's offset / scale: slides in on 'put every line', folds into the rail as z2 starts."""
    ui = seg(t, PUT1 - .25, PUT1 + .65, eout)
    uo = seg(t, T2 - .25, T2 + .65, ease)
    ox = lerp(260, 0, ui); k = lerp(1, RW / MW, uo)
    x = lerp(MX + ox, RX, uo); y = lerp(MY, RAIL_Y + 30, uo)
    return x, y, k, ui * (1 - uo)

def _intro(c, t):
    if t > T2 + 1.2: return
    a = seg(t, Z0 + .05, Z0 + .7)
    if a <= 0: return
    # Meera (leaves to the left as the sheet arrives)
    uo = seg(t, T2 - .45, T2 + .25, ease)
    ma = a * (1 - uo)
    person(c, 250 - 70 * uo, 806, 1.18, ma, 'meera', t, look=.5, mood=.25 + .35 * seg(t, READY1, READY1 + .6))
    lab(c, 'Meera · Bakehouse, Pune', 250 - 70 * uo, 846, ma * seg(t, Z0 + .3, Z0 + 1.), 24, DIM, 700)
    # the machine
    x, y, k, ma2 = _machine_pose(t)
    hop = machine(None, MX, MY, MW, MHh, 0).hopper            # hopper mouth (in the machine's own frame)
    # the P&L: in on 'books', net profit lit on 'twelve', into the hopper on 'machine'
    lu = seg(t, BOOKS1 - .35, BOOKS1 + .5, eout)
    fu = seg(t, MACH1 - .4, MACH1 + .5, ease)
    la = a * lu * (1 - seg(t, MACH1 + .35, MACH1 + .55))
    if la > 0:
        rows = [('Sales', None, 'dim'), ('Flour and wages', None, 'dim'), ('Depreciation, tax', None, 'dim'),
                ('Net profit', 1200000, 'total')]
        sc_ = lerp(1, .26, fu)
        p0 = (LX - 30 * (1 - lu), LY); p2 = (hop[0] - MX + x - LW * .26 / 2, MY - 64)   # into the hopper's mouth
        lx, ly = _bez(p0, ((p0[0] + p2[0]) / 2 + 60, 236), p2, fu)
        ledger(c, lx, ly, LW, rows, la, 'Profit & Loss A/c', u=seg(t, BOOKS1 - .2, BOOKS1 + .5),
               hl={3: seg(t, TWELVE1 - .1, TWELVE1 + .35)}, sc=sc_, sub='for the year ended 31 March 2026')
        # "her books say ₹12 lakh", under the P&L
        ca = la * seg(t, TWELVE1, TWELVE1 + .4) * (1 - seg(t, MACH1 - .5, MACH1 - .2))
        if ca > 0:
            text(c, 'HER BOOKS SAY', LX + 6, LY + 362, 22, 800, DIM, ca, track=2.5)
            ftext(c, rupee(1200000), LX + 4, LY + 412, 44, MONO, GOLD, ca, glow=4)
    if ma2 > .003:
        act = -1 + seg(t, READY1 - .1, READY1 + .4)
        c.save(); c.translate(x, y); c.scale(k, k); c.translate(-MX, -MY)
        machine(c, MX, MY, MW, MHh, a * ma2, t, active=act if act > -1 else None)
        c.restore()
        ra = a * ma2 * seg(t, PUT1, PUT1 + .5)
        lab(c, 'section 29 · every line through the machine', x + MW * k / 2, MY + MHh + 52, ra * (1 - uo), 26, DIM, 700)

# ---------------------------------------------------------------- z2–z7: the rail
def _rail(c, t, a):
    if a <= 0: return
    x, y, w, h = RX, RAIL_Y, RW, RAIL_H
    _glass(c, x, y, w, h, a)
    text(c, 'THE MACHINE · SECTION 29', x + 28, y + 44, 22, 800, ACC, a, track=3)
    act = 0.
    for i in range(1, 6): act += seg(t, ST[i] - .35, ST[i] + .35)
    for i in range(6):
        yy = y + 86 + i * 40 + (8 if i == 5 else 0)
        g = clamp(1 - abs(i - act)) * seg(t, ST[0] - .2, ST[0] + .3)
        done = t >= DONE[i] if i < 5 else False
        if i == 5:
            lit = seg(t, LAND - .1, LAND + .4)
            c.drawLine(x + 26, yy - 24, x + w - 26, yy - 24, paint(WHITE, .12 * a, stroke=1.2, cap=False))
            if lit > 0:
                c.drawRRect(rrect(x + 14, yy - 20, w - 28, 40, 12), paint(GOLD, .18 * a * lit))
                _glow(c, x + 14, yy - 20, w - 28, 40, 12, GOLD, a * lit)
            text(c, '= Income under PGBP', x + 44, yy + 9, 26, 800, mixc('#8a7a4a', GOLD, lit), a)
            if lit > 0: ftext(c, rupee(1899000), x + w - 30, yy + 9, 26, MONO, GOLD, a * lit, 'r')
            continue
        lab_, sg, col = RAIL[i]
        if g > .01:
            c.drawRRect(rrect(x + 14, yy - 20, w - 28, 40, 12), paint(GOLD, .13 * a * g))
            c.drawRRect(rrect(x + 14, yy - 20, 5, 40, 2.5), paint(GOLD, a * g))
        c.drawCircle(x + 44, yy, 15, paint(col, (.14 + .14 * g) * a))
        c.drawCircle(x + 44, yy, 15, paint(col, (.55 + .45 * g) * a, stroke=2))
        text(c, sg, x + 44, yy + 8, 22 if sg != '₹' else 18, 800, col, a, 'c')
        l2, sz, _ = _P._fit(lab_, 24, 700, w - 76 - 64, 20)
        text(c, l2, x + 72, yy + 8, sz, 700, mixc(DIM, WHITE, max(g, .35 if done else 0)), a * (.62 + .38 * max(g, done)))
        if done:
            tick(c, x + w - 38, yy, a * seg(t, DONE[i], DONE[i] + .35, back), 14)
        elif g > .3:
            _P.gear(c, x + w - 38, yy, 12, t, GOLD, a * g, speed=120)

# ---------------------------------------------------------------- z2–z7: the source card
def _art(c, t, it, a, cx, cy):
    """The item's picture in the card (from the chapter where it was taught)."""
    art = it['art']; su = _stamp_u(it, t)
    if art in ('ledger', 'ledger_strike'):
        if art == 'ledger':
            rows = [('Net profit', 1200000, 'total')]; hl = {0: 1.}; st = None
        else:
            rows = [('Depreciation (books)', 310000, '')]; hl = None; st = {0: seg(t, it['tamt'] + .1, it['tamt'] + .6)}
        ledger(c, cx - 200, cy - 76, 400, rows, a, 'Profit & Loss A/c', hl=hl, strike=st)
    elif art == 'oven':
        oven(c, cx - 120, cy + 80, .5, a, t, 1.)
        chip(c, cx + 140, cy - 22, rupee(400000), GOLD, a, 26, fill=.2)
        text(c, 'bakes for years', cx + 140, cy + 30, 23, 700, DIM, a, 'c')
        stamp(c, cx - 118, cy + 12, 'CAPITAL', GOLD, a, su, -12, 32)
    elif art == 'form':
        _P.form(c, cx - 40, cy, a, 'Penalty notice', 'Food safety law', .5, RED, -4)
        chip(c, cx + 130, cy - 30, rupee(15000), RED, a, 26, fill=.2)
        stamp(c, cx + 60, cy + 34, 'DISALLOWED', RED, a, su, -12, 30)
    elif art == 'blocks':
        parts = [('Plant & machinery', 225000), ('Shop building · 10%', 20000), ('Furniture · 10%', 20000),
                 ('Laptop · ½ of 40%', 20000)]
        x0, x1, y0 = cx - 250, cx + 250, cy - 68
        for k, (s, v) in enumerate(parts):
            pa = a * seg(t, it['tin'] + .35 + .32 * k, it['tin'] + .75 + .32 * k)
            yy = y0 + k * 37
            if pa <= 0: continue
            c.drawRRect(rrect(x0, yy - 16, 8, 26, 3), paint(ACC, pa))
            text(c, s, x0 + 22, yy + 6, 25, 700, WHITE, pa)
            ftext(c, rupee(v), x1, yy + 7, 26, MONO, DIM, pa, 'r')
        ta = a * seg(t, it['tamt'] - .1, it['tamt'] + .3)
        if ta > 0:
            yy = y0 + 4 * 37 + 4
            c.drawLine(x1 - 170, yy - 22, x1, yy - 22, paint(DIM, .6 * ta, stroke=1.6, cap=False))
            text(c, 'as per the Act', x0 + 22, yy + 8, 25, 800, GOLD, ta)
            roll(c, 285000, x1, yy + 9, seg(t, it['tamt'], it['tamt'] + .7, linr), 30, GOLD, ta)
    elif art == 'sum':
        cap_ = {'sub1': 'TOTAL SO FAR', 'sub2': 'THAT LEAVES', 'sub3': 'THAT LEAVES'}[it['key']]
        text(c, cap_, cx, cy - 58, 22, 800, DIM, a, 'c', track=3)
        roll(c, it['amt'], cx, cy + 6, seg(t, it['tamt'] + .08, it['tamt'] + .8, linr), 56, GOLD, a, 'c',
             glow=6 * seg(t, it['tamt'] + .8, it['tamt'] + 1.2))
        if it['key'] == 'sub1':                               # the ten add-backs, collected
            ks = ['bookdep', 'tax', 'oven', 'cash', 'tds', 'bonus', 'msme', 'trip', 'penalty', 'grat']
            for j, kk in enumerate(ks):
                da = a * seg(t, it['tin'] + .1 + .07 * j, it['tin'] + .4 + .07 * j)
                _disc(c, cx - 4.5 * 52 + j * 52, cy + 66, 19, IK[kk]['icon'], GREEN, da)
        else:
            f = {'sub2': (2344000, 285000, 70000), 'sub3': (1989000, 30000, 120000)}[it['key']]
            s = f'{rupee(f[0])}  −  {rupee(f[1])}  −  {rupee(f[2])}'
            ftext(c, s, cx, cy + 74, 24, MONO, DIM, a * seg(t, it['tin'] + .2, it['tin'] + .6), 'c')
    elif art == 'hero':
        _hero(c, t, a)
    elif isinstance(art, tuple) and art[0] == 'bill':
        _, title, mode, st_, scol = art[:5]
        amt = art[5] if len(art) > 5 else it['amt']
        bill(c, cx - 30, cy + 2, a, title, amt, mode, sc=1.12, ang=-3)
        stamp(c, cx + 96, cy + 58, st_, scol, a, su, -11, 30, deep=True)
    elif isinstance(art, tuple) and art[0] == 'heads':
        _, other, ic = art
        tw_, th = 178, 136; y0 = cy - th / 2 + 4
        tile(c, cx - 272, y0, tw_, th, 'shop', 'Business · PGBP', a, GOLD, size=23)
        tile(c, cx + 94, y0, tw_, th, ic, other, a, ACC, size=23, glow=seg(t, it['tamt'] + .4, it['tamt'] + .8))
        mu = seg(t, it['tamt'] - .1, it['tamt'] + .55, ease)
        arrow(c, cx - 78, cy + 22, cx + 78, cy + 22, DIM, 3, a * .7, 14)
        ftext(c, rupee(it['amt']), cx, cy - 6, 25, MONO, GOLD, a * seg(t, it['tamt'] - .1, it['tamt'] + .3), 'c')
        if 0 < mu < 1:
            px = lerp(cx - 183, cx + 183, mu); py = cy + 4 - 58 * math.sin(math.pi * mu)
            coin(c, px, py, 20, a, GOLD)

def _hero(c, t, a):
    """Climax card: Meera, the books' ₹12,00,000 and the tax figure ₹18,99,000 (the '?' of chapter A resolved)."""
    x0 = RX + 30
    person(c, x0 + 92, CARD_Y + CARD_H - 10, .98, a, 'meera', t, look=.55, mood=seg(t, LAND, LAND + .6))
    tx = RX + 216
    text(c, 'IN THE BOOKS', tx, CARD_Y + 66, 21, 800, DIM, a, track=2.5)
    ftext(c, rupee(1200000), tx, CARD_Y + 110, 36, MONO, DIM, a)
    ya, yb = CARD_Y + 128, CARD_Y + 190
    c.drawLine(tx + 18, ya, tx + 18, yb, paint(DIM, .45 * a, stroke=2.4))
    q = seg(t, LAND - .1, LAND + .4)
    if q < 1:
        pu = 1 + .06 * math.sin(t * 6)
        text(c, '?', tx + 62, (ya + yb) / 2 + 16, 46 * pu, 800, GOLD, a * (1 - q), 'c')
    tick(c, tx + 62, (ya + yb) / 2, a * seg(t, LAND, LAND + .45, back), 20)
    text(c, 'FOR TAX · PGBP', tx, CARD_Y + 226, 21, 800, GOLD, a * (.5 + .5 * q), track=2.5)
    ga = a * q
    if ga > 0:
        k = 1 + .1 * math.sin(math.pi * seg(t, LAND, LAND + .45))
        c.save(); c.translate(tx, CARD_Y + 282); c.scale(k, k); c.translate(-tx, -(CARD_Y + 282))
        ftext(c, rupee(1899000), tx, CARD_Y + 282, 50, MONO, GOLD, ga, glow=8 * q)
        c.restore()

def _card(c, t, a):
    if a <= 0: return
    _glass(c, RX, CARD_Y, RW, CARD_H, a)
    for k, it in enumerate(ITEMS):
        t_in = it['tin']; t_out = ITEMS[k + 1]['tin'] if k + 1 < len(ITEMS) else 1e9
        ia = seg(t, t_in - .05, t_in + .35) * (1 - seg(t, t_out - .05, t_out + .25))
        if ia <= 0: continue
        dy = 22 * (1 - seg(t, t_in - .05, t_in + .45, eout)) - 18 * seg(t, t_out - .05, t_out + .3)
        aa = a * ia
        c.save(); c.translate(0, dy)
        c.save(); c.clipRect(skia.Rect(RX + 4, CARD_Y + 4, RX + RW - 4, CARD_Y + CARD_H - 4))
        _art(c, t, it, aa, ACX, ACY)
        c.restore()
        if it['rule']:
            _lines(c, it['rule'], RX + 30, CARD_Y + 236, 26, WHITE, aa, RW - 60)
            _src(c, it['src'], RX + 30, CARD_Y + 304, aa)
        c.restore()

# ---------------------------------------------------------------- z2–z7: the sheet, the flights, the climax
def _sheet_pose(t):
    ui = seg(t, T2 + .2, T2 + 1.0, eout)
    uo = seg(t, T8 - .25, T8 + .4, ein)
    return SX - 160 * uo, SY + 48 * (1 - ui), ui * (1 - uo)

def _main(c, t):
    if t < T2 - .2 or t > T8 + .6: return
    x, y, a = _sheet_pose(t)
    ra = seg(t, T2 + .1, T2 + .8) * (1 - seg(t, T8 - .25, T8 + .3))           # rail + card
    if a <= 0 and ra <= 0: return
    scr = sheet_scroll(ROWS, t, MH, 12., .95, .35)
    sheet(c, x, y, SW, ROWS, a, t, title=TITLE, col=GOLD, scroll=scr, max_h=MH, title_r=TITLE_R)
    # climax: the total rolls with the words, lands, flashes
    ry = sheet_row_y(x, y, ROWS, TOT_ROW, scr, TITLE)
    if t >= ROWS[TOT_ROW]['t0'] and a > 0:
        _total(c, t, x, ry, a)
    # flights: the item's icon arcs from its card to its row
    for it in ITEMS:
        if not it['icon'] or not (it['tamt'] - .6 <= t <= it['tamt'] + .6): continue
        ry_ = sheet_row_y(x, y, ROWS, RI[it['key']], scr, TITLE)
        _fly(c, t, it['tamt'] - .5, it['tamt'] + .02, (ACX - 40, ACY), (x + SW - 140, ry_), it['icon'], it['col'], a)
    if ra > 0:
        dx = 120 * seg(t, T8 - .25, T8 + .3, ein)
        c.save(); c.translate(dx, 0)
        _rail(c, t, ra); _card(c, t, ra)
        c.restore()

def _total(c, t, x, ry, a):
    cr = x + SW - 30; asz = 40
    u = seg(t, TOT_R0, LAND, linr)
    ua = seg(t, TOT_R0 - .2, TOT_R0 + .15)
    q = seg(t, LAND, LAND + .5)
    # focus: the rest of the sheet dims a little once it lands
    fd = seg(t, LAND - .2, LAND + .6) * .35
    if fd > 0:
        c.drawRRect(rrect(x + 6, SY + 84, SW - 12, ry - 37 - (SY + 84), 8), paint('#050914', fd * a))
    # glow + sweep on the row
    if q > 0:
        pu = .55 + .45 * math.sin((t - LAND) * 3.2)
        g = a * (q * (1 - .55 * seg(t, LAND + .6, LAND + 1.6))) * (.75 + .25 * pu)
        _glow(c, x + 10, ry - 35, SW - 20, 70, 13, GOLD, 1.3 * g)
        c.drawRRect(rrect(x + 10, ry - 35, SW - 20, 70, 13), paint(GOLD, .9 * g, stroke=2))
        sw_ = seg(t, LAND - .05, LAND + .75, linr)
        if 0 < sw_ < 1:
            sx = lerp(x - 200, x + SW + 200, sw_)
            c.save(); c.clipRRect(rrect(x + 10, ry - 35, SW - 20, 70, 13), True)
            c.drawRect(skia.Rect(sx - 160, ry - 40, sx + 160, ry + 40),
                       paint(shader=lgrad((sx - 160, 0), (sx + 160, 0), [(WHITE, 0), (WHITE, .28), (WHITE, 0)])))
            c.restore()
    bl = seg(t, LAND - .1, LAND + .15) * (1 - seg(t, LAND + .2, LAND + 1.3))
    if bl > 0:                                               # a soft gold bloom behind the landing number
        bx = cr - 130
        c.drawRect(skia.Rect(bx - 420, ry - 300, bx + 420, ry + 300),
                   paint(shader=rgrad(bx, ry, 420, [(GOLD, .30 * bl * a), (GOLD, .08 * bl * a), (GOLD, 0)], [0, .45, 1])))
    k = 1 + .09 * math.sin(math.pi * q)
    c.save(); c.translate(cr, ry); c.scale(k, k); c.translate(-cr, -ry)
    ww = roll(c, 1899000, cr, ry + asz * .36, u, asz, GOLD, a * ua, 'r', glow=7 * q)
    if q > 0:
        for dd in (asz * .52, asz * .52 + 5):
            c.drawLine(cr - ww * q, ry + dd, cr, ry + dd, paint(GOLD, .9 * a, stroke=1.8, cap=False))
    c.restore()
    _sparks(c, cr - ww / 2, ry - 6, t, LAND, a)

# ---------------------------------------------------------------- z8: if she opts out
def _optout(c, t):
    a = win(t, T8 + .3, T9 - .05, .45, .6)
    if a <= 0: return
    pos = seg(t, OPT8 + .3, OPT8 + .95)
    regime_switch(c, 960, 292 - 16 * (1 - seg(t, T8 + .3, T8 + .8, eout)), a, pos, t, 1.)
    ua = seg(t, T8 + .5, T8 + 1.15, eout)
    x2 = CX2 + 140 * (1 - ua)
    sa = a * ua
    sheet(c, x2, CY2, CW2, ROWS2, sa, t, title='If Meera opts out of 115BAC', col=GOLD, cols=COLS2, title_r=TITLE_R,
          col2_a=seg(t, OPT8 + .7, OPT8 + 1.2))
    # the oven and the mixer feed the extra depreciation
    r1 = sheet_row_y(x2, CY2, ROWS2, 1, 0., 'x', COLS2)
    cell = (x2 + CW2 - 30 - 120, r1)
    for k, (fn, t0, amt, yy, s_) in enumerate(((oven, OVEN8, 80000, 600, .52), (mixer, MIX8, 20000, 806, .52))):
        pa = a * seg(t, t0 - .2, t0 + .35, eout)
        if pa <= 0: continue
        px = 200
        if fn is oven: oven(c, px, yy - 8 * (1 - pa), s_, pa, t, 1.)
        else: mixer(c, px, yy - 8 * (1 - pa), s_, pa, t, 1.2)
        ta = pa * seg(t, t0 + .1, t0 + .45, back)
        cx_ = 392; cy_ = yy - 82
        chip(c, cx_, cy_, '+ ' + rupee(amt), GOLD, ta, 26, fill=.22)
        fu = seg(t, t0 + .35, t0 + 1.25, linr)
        if 0 < fu < 1:
            P = [(cx_, cy_ - 24), (lerp(cx_, cell[0], .5), min(cy_ - 120, cell[1] - 90)), cell]
            flowdots(c, catmull(P, False, 8), fu, a, GOLD, 7, 6.)
    la = a * seg(t, OVEN8 + .3, OVEN8 + .8)
    text(c, 'additional depreciation on new plant: 20%, half if used under 180 days', CX2 + CW2 / 2, 812, 24, 700, DIM, la, 'c')
    # the opted-out total lands
    if t > SEV8 + .5:
        r3 = sheet_row_y(x2, CY2, ROWS2, 2, 0., 'x', COLS2)
        g = a * seg(t, SEV8 + .6, SEV8 + 1.) * (1 - .5 * seg(t, SEV8 + 1.4, SEV8 + 2.4))
        cx_ = x2 + CW2 - 30 - 125
        _glow(c, cx_ - 140, r3 - 34, 280, 68, 14, GOLD, 1.4 * g)

# ---------------------------------------------------------------- z9–z10: the recap grid
GX0, GY0, GCW, GCH, GGX, GGY = 116, 286, 404, 248, 24, 26

def _recap(c, t):
    a = win(t, T9 - .25, T11 + .1, .5, .55)
    if a <= 0: return
    text(c, 'THE WHOLE CHAPTER IN ONE BREATH', 960, 236, 24, 800, ACC, a * seg(t, T9, T9 + .6), 'c', track=4)
    lit_t = [r[6] for r in RECAP]
    for i, (sc_, mark, title, phrase, ic, col, t0, chs) in enumerate(RECAP):
        gx = GX0 + (i % 4) * (GCW + GGX); gy = GY0 + (i // 4) * (GCH + GGY)
        ca = a * seg(t, T9 - .1 + .09 * i, T9 + .45 + .09 * i, eout)
        if ca <= 0: continue
        oy = 20 * (1 - ca / max(a, 1e-3))
        lit = seg(t, t0, t0 + .45)
        nxt = lit_t[i + 1] if i + 1 < len(lit_t) else T11
        hot = lit * (1 - .55 * seg(t, nxt, nxt + .5))
        y = gy + oy
        _glass(c, gx, y, GCW, GCH, ca)
        if hot > 0:
            _glow(c, gx, y, GCW, GCH, 20, col, 1.2 * ca * hot)
            c.drawRRect(rrect(gx + .5, y + .5, GCW - 1, GCH - 1, 20), paint(col, .9 * ca * hot, stroke=2))
        dim_ = .38 + .62 * lit
        _P.sec(c, gx + 24, y + 42, sc_, ca * dim_, VIO, 22, 'l', mark)
        bump = 1 + .16 * math.sin(math.pi * seg(t, t0, t0 + .5))
        icx, icy = gx + GCW - 62, y + 66
        if i == 5 and t > OUT10 - .1:                         # out (a cross) ... then wait (an hourglass)
            cross(c, icx - 40, icy, ca * seg(t, OUT10 - .1, OUT10 + .25, back), 20)
            hourglass(c, icx + 18, icy, .5, ca * seg(t, WAIT10 - .1, WAIT10 + .3), seg(t, WAIT10, WAIT10 + 2.5), GOLD)
        else:
            icon(c, ic, icx, icy, .78 * bump, mixc(DIM, col, lit), ca * dim_, 3.4)
        if i == 2:                                            # "in blocks": three little blocks stack in
            for j in range(3):
                ba = ca * seg(t, BLOCKS9 - .1 + .12 * j, BLOCKS9 + .2 + .12 * j, back)
                if ba > 0:
                    c.drawRRect(rrect(icx - 96 + j * 0, icy + 20 - j * 20, 34, 16, 4), paint(ACC, .25 * ba))
                    c.drawRRect(rrect(icx - 96 + j * 0, icy + 20 - j * 20, 34, 16, 4), paint(ACC, .9 * ba, stroke=1.6))
        text(c, title, gx + 24, y + 140, 36, 800, mixc(DIM, WHITE, lit), ca * (.5 + .5 * lit))
        _lines(c, phrase, gx + 24, y + 180, 24, mixc('#7f8aa6', DIM, lit), ca * (.45 + .55 * seg(t, t0 + .1, t0 + .6)),
               GCW - 48, 600, 1.25)
        text(c, 'CH ' + chs, gx + GCW - 24, y + GCH - 18, 22, 800, col, ca * (.3 + .5 * lit), 'r', track=2)

# ---------------------------------------------------------------- z11: the bakery at dusk, the three questions
QY, QH, QW, QG = 256, 196, 540, 30

_DUSK = []
def _dusk_glow(c, a):
    """The warm dusk glow behind the shop: a radial gradient rendered once, blitted pixel-aligned (cheap)."""
    if a <= 0: return
    M = c.getTotalMatrix(); k = M.getScaleX()
    if not _DUSK or _DUSK[0][1] != k:
        _DUSK.clear()
        sf = skia.Surface(max(1, round(1920 * k)), max(1, round(700 * k))); cv = sf.getCanvas(); cv.scale(k, k); cv.translate(0, -380)
        cv.drawRect(skia.Rect(0, 380, 1920, 1080), paint(shader=rgrad(960, 1020, 980, [(ORANGE, .30), (PINK, .12), (VIO, 0)])))
        _DUSK.append((sf.makeImageSnapshot(), k))
    p = skia.Paint(); p.setAlphaf(clamp(a))
    o = M.mapXY(0, 380)
    c.save(); c.resetMatrix(); c.drawImage(_DUSK[0][0], round(o.x()), round(o.y()), skia.SamplingOptions(), p); c.restore()

def _dusk(c, t):
    a = seg(t, T11 - .45, T11 + .6)
    if a <= 0: return
    zk = 1 + .035 * seg(t, T11 - .4, FILM_END, linr)
    _dusk_glow(c, a * (.85 + .15 * seg(t, ASK11 - .2, ASK11 + 1.5)))     # dusk sky: a low warm glow behind the shop
    with zoom(c, 960, 600, zk):
        # a few stars
        for i in range(26):
            sx = 60 + 1800 * hsh(i, 21); sy = 120 + 330 * hsh(i, 23)
            if 700 < sx < 1220 and sy > 380: continue
            tw_ = .45 + .55 * math.sin(t * (1.1 + hsh(i, 25)) + i)
            c.drawCircle(sx, sy, 1.3 + 1.2 * hsh(i, 27), paint('#dbe7ff', a * .35 * tw_ * seg(t, T11 + .2 * hsh(i, 29), T11 + 1.5)))
        c.drawRect(skia.Rect(0, 832, 1920, 842), paint('#0a0e1c', .8 * a))
        lit = .55 + .45 * seg(t, ASK11 - .2, ASK11 + 1.5)
        shop(c, 960, 834, .74, a, t, lit=lit)
        person(c, 1318, 834, .82, a * seg(t, T11 + .3, T11 + 1.1), 'meera', t, look=-.45, mood=.6 + .4 * seg(t, ASK11, ASK11 + .8))
        # the three questions
        x0 = 960 - (3 * QW + 2 * QG) / 2
        for k, (qs, items, col, tq) in enumerate(QS):
            qx = x0 + k * (QW + QG)
            ba = a * seg(t, THREE11 - .3 + .12 * k, THREE11 + .2 + .12 * k, eout)
            if ba <= 0: continue
            on = seg(t, tq - .1, tq + .35)
            hot = max(on * (1 - .5 * seg(t, QS[k + 1][3] - .1, QS[k + 1][3] + .5)) if k < 2 else on,
                      seg(t, ASK11 - .1, ASK11 + .6) * (.8 + .2 * math.sin((t - ASK11) * 2.4 + k)))
            y = QY + 14 * (1 - ba / a if a > 0 else 0)
            _glass(c, qx, y, QW, QH, ba)
            if hot > 0:
                _glow(c, qx, y, QW, QH, 20, col, 1.2 * ba * hot)
                c.drawRRect(rrect(qx + .5, y + .5, QW - 1, QH - 1, 20), paint(col, .9 * ba * hot, stroke=2))
            c.drawCircle(qx + 46, y + 52, 22, paint(col, (.2 + .3 * on) * ba))
            c.drawCircle(qx + 46, y + 52, 22, paint(col, ba, stroke=2.2))
            text(c, str(k + 1), qx + 46, y + 61, 26, 800, WHITE, ba, 'c')
            text(c, qs, qx + 84, y + 64, 32, 800, WHITE, ba * on)
            cx = qx + 26; cy = y + 120
            for j, s in enumerate(items):
                ia = ba * seg(t, tq + .45 + .14 * j, tq + .8 + .14 * j, eout)
                w_ = text_w(s, 22, 700) + 22 * 1.3
                if cx + w_ > qx + QW - 20: cx = qx + 26; cy += 44
                if ia > 0: chip(c, cx, cy, s, col, ia, 22, 'l', fill=.18)
                cx += w_ + 10

# ---------------------------------------------------------------- the chapter
def ch_z(c, t):
    if t < Z0 - .5: return
    _intro(c, t)
    _main(c, t)
    _optout(c, t)
    _recap(c, t)
    _dusk(c, t)
