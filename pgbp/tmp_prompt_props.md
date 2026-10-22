You are building the shared art library `props.py` for an animated explainer film about Indian income tax
("Profits and Gains of Business or Profession", CA Intermediate). Work in `/Users/ztejas/CA_PERSONAL/pgbp/`.

Read first:
- `/Users/ztejas/CA_PERSONAL/pgbp/SHOTS.md` (the visual contract — the World numbers, palette, scene map that will use your props)
- `/Users/ztejas/edu2d/eng.py` (the skia engine: `text, text_w, card, callout, arrow, rrect, paint, lgrad, rgrad, layer,
  clip, catmull, spath, blob, seg, win, ease, eout, ein, back, clamp, lerp, shade` …)
- `/Users/ztejas/LLD_PERSONAL/parking_lld_video/props.py` and its `props_gallery.jpg` — the house style and the model to copy:
  flat vector, soft drop shadows, gentle gradients, made to read on a dark navy backdrop; every prop takes alpha `a`
  and returns early when `a <= 0`; canvas px 1920×1080. **Copy these verbatim** from it (they're needed again):
  `_cache, _fade, _font, _fruns, ftext_w, ftext, MONO, COND, padlock, clock_face, phone, qr, price_tag, pay_icon,
  rupee, obox, chip, lane, link, gear` (and their private helpers).

Only `eng.py`, numpy, skia, math. Put the module docstring at the top listing every public prop with its signature and
meaning (like the parking one). `python props.py` must render `props_gallery.jpg` (1920×1080, every prop in a couple of
states, captioned), and also `props_gallery2.jpg` if one sheet is too crowded. Run with `~/edu2d/.venv/bin/python`.
Look at your gallery images (Read the jpg) and iterate until every prop looks clean, professional and legible — this
is a premium exam-prep film, not a cartoon. Performance matters (≈ 90k frames will be rendered): cache paths and
static pictures with `_cache`, avoid per-frame heavy blurs on big areas, keep each prop well under ~2 ms.

Palette constants at the top: `ACC '#7dd3fc' GOLD '#fbbf24' GREEN '#86efac' RED '#f87171' VIO '#a78bfa' DIM '#c9d3ea'
BLUE '#60a5fa' PINK '#f472b6' ORANGE '#fb923c'`, paper `CREAM '#f5efe0'`, ink `INK '#1f2430'`, `PAPER_LINE '#d9cfb8'`.

## The props (signatures are a contract — scene agents will code against them; extra kwargs are fine)

### Money and amounts
- `rupee(n)` (copy) → '₹2,25,000' Indian grouping. `inr(n)` → '₹12 lakh', '₹1.2 crore', '₹2.4 crore', '₹4,40,000' for
  non-round numbers (rule: if n ≥ 1e7 and n % 1e5 == 0 → crore with up to 2 decimals stripped of trailing zeros;
  elif n ≥ 1e5 and n % 1e5 == 0 → lakh; else rupee(n)).
- `roll(c, n, x, y, u, size=40, col=GOLD, a=1., align='r', fam=MONO, prefix='₹', signed=False)` — draws an amount that
  rolls up from 0 to n as u goes 0→1 (eased; digits settle left-to-right; uses rupee grouping). `signed=True` prefixes
  '+ ' / '− '. Returns the text width.
- `notes(c, x, y, a=1., n=3, sc=1., ang=0.)` — a small stack/fan of rupee notes (green-grey Indian-note look with ₹).
- `coin(c, x, y, r=22, a=1., col=GOLD, label='₹')` — a coin.

### Paper and law
- `ledger(c, x, y, w, rows, a=1., title='Profit & Loss A/c', u=1., hl=None, strike=None, sc=1.)` — a cream paper
  statement with a header band; `rows` = list of (label, amount or None, style) where style ∈ {'', 'bold', 'total',
  'dim'}; `u` reveals rows top-down; `hl` = {row index: alpha} highlight; `strike` = {row index: 0..1 strike-through}.
  Returns the list of row centre y's and the paper rect.
- `sheet(c, x, y, w, rows, a=1., t=0., title=None, col=GOLD, scroll=0., max_h=None, cols=None)` — **the hero
  device**: an ICAI-style computation table drawn on a dark glass card (not paper) with a gold title band. Each row is
  a dict: `{'label': str, 'amt': number or None, 'kind': 'head'|'start'|'add'|'less'|'sub'|'total'|'note',
  't0': reveal time, 'sec': optional section chip text like '40A(3)', 'strike': optional time, 'hl': optional (t0, t1),
  'col': optional override, 'amt2': optional second-column number}`. Behaviour: a row slides in from the left and fades
  in over 0.45 s from t0; its amount rolls up (`roll`) over 0.7 s; 'add' rows show a green '+' sign chip, 'less' rows a
  red '−'; 'sub'/'total' rows draw a rule line above, bold gold amount, 'total' also a double underline and a soft
  glow; 'head' rows are small-caps section headings; 'note' rows are dim italic text; a VIO section chip (`sec()`) sits
  right of the label. Row height ~54 px at 32 px type (amounts 32–36 px MONO). `scroll` (px) shifts rows up inside a
  clipped window of height `max_h` (fade at the clip edges) so long computations can scroll; also provide
  `sheet_height(rows)` and `sheet_row_y(x, y, rows, i, scroll=0)` helpers so scenes can auto-scroll to keep the newest
  row visible. Optional two amount columns (`cols=('Default', 'Opted out')` with 'amt2').
- `bill(c, x, y, a=1., title='Flour', amt=400000, mode=None, date=None, sc=1., ang=0., col=None, stamp=None)` — a small
  white/cream invoice slip (~220×140 at sc=1) with a torn top edge, title, `rupee(amt)`, optional mode badge
  ('cash' 'upi' 'cheque' 'card' 'bank' — small icon + word), optional date line; `stamp` = (text, col, u) overlays a
  mini stamp. Centred at (x, y).
- `cheque(c, x, y, a=1., amt=150000, payee='Meera's Bakehouse', crossed=True, sc=1.)` — an account-payee cheque with
  the two crossing lines and "A/c Payee".
- `stamp(c, x, y, text, col=RED, a=1., u=1., ang=-12., size=40)` — a rubber stamp (rounded double border, slightly
  distressed ink texture, transparent centre); as u goes 0→1 it slams in from 1.6× scale with a tiny shake and settles
  at 1×; returns nothing. Texts used: ALLOWED, DISALLOWED, DEEMED INCOME, EXEMPT, CAPITAL, REVENUE, NEXT YEAR, 30% OUT,
  PAID, TAX AUDIT, INCOME.
- `form(c, x, y, a=1., title='Form 3CD', sub='Tax audit report', sc=1., col=ACC)` — a government form sheet with lines
  and an emblem circle.
- `book(c, x, y, a=1., title='Books of account', col=BLUE, sc=1., open_=0.)` — a hard-bound ledger book (closed, or
  open_ 0..1).
- `sec(c, x, y, s, a=1., col=VIO, size=22, align='l')` — a section chip: '§ 40A(3)' style pill (fill col at .18, stroke,
  text). Returns its width.
- `calendar(c, x, y, a=1., day=20, mon='DEC', year=None, sc=1., col=RED, flip=0.)` — a tear-off desk calendar page;
  `flip` 0..1 animates a page flipping over.
- `yearbar(c, x, y, w, a=1., t=0., start=(2025, 4, 1), end=(2026, 3, 31), extend=None, marks=(), spans=(), h=56,
  label=True)` — a horizontal timeline of the previous year with month ticks and letters (A M J J A S O N D J F M),
  the label 'P.Y. 2025-26' and a bold 31 Mar end tick; `extend=(2026, 10, 31)` continues it (thinner, a different
  tint, label 'after the year') to show due dates; `marks` = list of (date tuple, label, col, alpha) pins with flags;
  `spans` = list of (d0, d1, label, col, alpha) shaded intervals (alpha lets scenes animate them). Plus
  `yearbar_x(x, w, date, start=..., end=..., extend=...)` → px for a date (same mapping, so scenes can animate).
- `heads5(c, x, y, w, a=1., hl=None, t=0., open_=None)` — five filing-cabinet drawers side by side (or a chest of
  five), labelled Salaries · House property · Business / profession (PGBP) · Capital gains · Other sources, each
  with a small icon; `hl` = index or {index: alpha} to glow; `open_` = {index: 0..1} slides a drawer open. Returns
  drawer mouth centres (list of (x, y)).
- `regime_switch(c, x, y, a=1., pos=0., t=0., sc=1.)` — a big two-position toggle: left 'Default · 115BAC', right
  'Opted out'; `pos` 0..1 animates the knob; the active side glows (default ACC, opted-out GOLD).
- `magnifier(c, x, y, r=60, a=1., ang=-35)`, `hourglass(c, x, y, s=1., a=1., u=0.)` (sand falls with u),
  `padlock` (copy, has open_).

### The machine
- `conveyor(c, x0, x1, y, a=1., t=0., speed=80., h=26)` — a belt with moving rollers/treads (animated by t).
- `scanner(c, x, y, a=1., label='40A(3)', state=0., t=0., h=240, w=150)` — an airport security arch standing on the
  conveyor at x (y = belt top), a lit label plate on top; `state`: 0 idle (ACC), +1 pass (green flash), −1 reject (red
  flash with a little beacon). Draw it in two layers — `scanner_back(...)` and `scanner_front(...)` — so items can
  pass *through* it (back, then items, then front).
- `machine(c, x, y, w, h, a=1., t=0., stages=None, active=None, done=None)` — the five-stage PGBP machine: a long
  rounded steel housing with five chambers left to right; default stage labels: 'Net profit' · '+ Disallowed' ·
  '− Allowed, not in books' · '− Other heads' · '+ Deemed income', and an output port '= PGBP'; `active` = stage index
  (float allowed for a moving highlight) lights that chamber gold with spinning gears inside; `done` = set of indices
  drawn with a green tick. Returns chamber centres.

### Assets and places (side views, simple, handsome)
- `tank(c, x, y, w, h, a=1., t=0., level=0.5, cap=1., label='Plant & machinery · 15%', amount=None, col=ACC,
  inflow=0., outflow=0., crack=0., ghost=0., floor_glow=0., layers=None)` — a glass tank (a block of assets): liquid
  height = level/cap of the inner height with an animated wavy surface; `amount` (number) shows `rupee(amount)` on a
  tag beside the surface; `inflow` 0..1 = a stream pouring in from a pipe at the top; `outflow` 0..1 = a tap at the
  bottom right draining a stream; `floor_glow` highlights the zero line ('never below zero'); `crack` 0..1 draws
  cracks and a 'CEASED' state; `ghost` fades the glass to a dashed outline; `layers` = list of (fraction, col, label)
  to draw the liquid as stacked coloured layers (bottom first) — used to split '₹14,00,000 full rate' vs '₹2,00,000
  half rate'. Returns (x, y_surface, inner rect).
- `bucket(c, x, y, a=1., level=0., label='Short-term capital gain', col=GOLD, sub=None, amount=None)` — a smaller
  catch-basin/bucket that fills.
- `oven(c, x, y, s=1., a=1., t=0., on=1.)` deck oven with a glowing window when on; `mixer(c, x, y, s=1., a=1., t=0.,
  spin=0.)` planetary stand mixer, bowl and beater (beater rotates with spin*t); `van(c, x, y, s=1., a=1., col=BLUE,
  label="Meera's Bakehouse", t=0., move=0.)` side-view delivery van (wheels rotate with move); `laptop(c, x, y, s=1.,
  a=1., on=1.)`; `counter(c, x, y, s=1., a=1.)` a glass display counter with cakes (furniture); `shop(c, x, y, s=1.,
  a=1., t=0., sign="Meera's Bakehouse", lit=1.)` a bakery storefront: brick/plaster facade, striped awning, glass window
  with cakes, door, sign board (the sign text param is used later for "Meera & Rohan Bakers"); `land(c, x, y, w, h,
  a=1., label=None)` a soil/grass plot; `lab(c, x, y, s=1., a=1., t=0.)` a small lab bench with flask, microscope,
  bubbling liquid; `cold_store(c, x, y, s=1., a=1., t=0.)` an insulated warehouse with a snowflake and loading door;
  `truck(c, x, y, s=1., a=1., kind='light'|'heavy', col=ORANGE, label=None, t=0., move=0.)` side-view goods
  carriage (heavy = longer, 3 axles); `dental_chair(c, x, y, s=1., a=1.)`; `flats(c, x, y, s=1., a=1., n=6, t=0.)` an
  apartment block (windows lit by t); `tea(c, x, y, s=1., a=1.)` tea bushes on a hill with a leaf; `cake(c, x, y,
  s=1., a=1., kind='wedding'|'slice'|'loaf')`; `sack(c, x, y, s=1., a=1., label='Flour')`; `boxes(c, x, y, s=1., a=1.)`
  stacked cake boxes; `generator(c, x, y, s=1., a=1.)`; `extinguisher(c, x, y, s=1., a=1.)`; `building(c, x, y, s=1.,
  a=1., floors=2)` a plain shop building block (for the building block of assets).
- `factory(c, x, y, s=1., a=1., t=0.)` with a smoking chimney; `ship(c, x, y, s=1., a=1., t=0.)` cargo ship on
  waves (for export / imports).

### People
- `person(c, x, y, s=1., a=1., who='meera', t=0., talk=0., look=0., mood=0.)` — a flat-vector bust (head, neck,
  shoulders; ~220 px tall at s=1, (x, y) = bottom centre). Distinct, respectful Indian characters:
  `meera` (baker: warm brown skin, dark hair in a bun, cream apron over a teal kurta, small bindi),
  `rohan` (her brother: short hair, light stubble, olive shirt), `kabir` (dentist: white coat, glasses, stethoscope),
  `ravi` (truck owner: cap, moustache, checked shirt), `anil` (cousin: jacket, short beard), `sunil` (grocer: kurta,
  grey temples), `officer` (Assessing Officer: grey suit, tie, spectacles, a file under the arm), `ca` (Meera's CA:
  navy blazer, glasses), `farmer` (turban, white kurta), `supplier` (cap, apron), `staff` (generic employee, uniform
  t-shirt; accept `col=` to vary). `talk` 0..1 animates a subtle mouth/jaw movement with t; `look` −1..1 turns the
  head slightly; `mood` −1 (worried brows) .. 1 (smile). Keep them dignified and consistent in proportion.
- `bubble(c, x, y, w, text, a=1., tail='bl', col=WHITE, size=26)` — a speech bubble (rounded, soft shadow) whose tail
  points to `tail` corner; wraps text to width w.

### Misc reusable widgets
- `meter(c, x, y, w, a=1., value=0.12, limit=0.05, label='Cash receipts', fmt='{:.0%}')` — a horizontal gauge bar with a
  threshold tick; over-limit part turns red, under-limit green.
- `gauge(c, x, y, r, a=1., value=0., lo=0., hi=1., ticks=(), label='')` — a semicircular dial (turnover limit dial).
- `slab(c, x, y, w, h, a=1., col=ACC, title=None, sub=None)` — a clean rounded panel with a coloured left edge, title
  and sub text (general purpose "card" for lists/rules).
- `tile(c, x, y, w, h, icon_fn, label, a=1., col=ACC, ok=None)` — an icon tile with label; `ok` True draws a green
  tick badge, False a red cross badge.
- `yearstrip(c, x, y, w, n, a=1., labels=None, hl=None, col=ACC)` — n equal year boxes (for 5-year spreads,
  carry-forward years, the 8-year 35AD rule).

When done, report: the list of props, anything you changed in the contract, and the gallery path(s).
