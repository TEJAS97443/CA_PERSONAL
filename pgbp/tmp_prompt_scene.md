You are one of nine parallel animators building the chapter scenes of an animated explainer film,
"Profits and Gains of Business or Profession" (CA Intermediate income tax, A.Y. 2026-27). Project:
`/Users/ztejas/CA_PERSONAL/pgbp/`. Your chapters: **{CHAPTERS}**. You write `scenes/ch_<k>.py` for each of them, nothing else.

## Read first (in this order)
1. `SHOTS.md` — the visual contract: how the frame is built, hard rules, the World numbers, the scene map rows for
   your chapters. Follow it.
2. `script.py` — the final narration. Your chapters' beats (ids like `i4`) and their exact words. The scene map in
   SHOTS.md cites beat ids; script.py is the authority if they ever disagree.
3. `props.py` docstring + `props_gallery.jpg` (and `props_gallery2.jpg` if present) — the shared art library. Use it.
4. `scenes/common.py` — timing helpers `T TE TP TA TAE W`, palette, `co cap lab panel tick cross flowdots zoom ev`.
5. A finished chapter from an earlier film for style and idioms: `/Users/ztejas/LLD_PERSONAL/parking_lld_video/scenes/ch_l.py`
   and `ch_p.py` (module docstring describing the beats, `EVENTS`, word-time constants at the top, private helpers,
   one `def ch_<k>(c, t)` that draws the chapter at time t).
6. `beats.json` / `cues.json` hold the real timings (word times from a Whisper pass). `B.span('<k>')` gives your
   chapter's (start, end).

## What each file must contain
- A docstring listing what each beat shows.
- `EVENTS = []` filled with `[time, kind]` SFX (≤ 25 per chapter; kinds in SHOTS.md rule 7).
- `def ch_<k>(c, t):` draws the whole chapter scene at time t (absolute film seconds). The spine calls it only while
  the chapter is on screen and handles the cross-fade. Return quickly when nothing is visible.
- Every reveal keyed to beat/word times (`T`, `TE`, `W`, `TA`), never hard-coded seconds. Print your key `W()` lookups
  once while developing and make sure they resolve to the right word (a miss silently falls back to the beat start).
  Amounts are spoken the Indian way ("two lakh twenty five thousand rupees"); section numbers like "forty ay three".
- Fill the whole span with purposeful motion (no frame static > ~6 s), keep the safe areas (SHOTS.md "How the frame
  is built") and leave room for the beat cards: hook banner top, NAME IT card top-right, bottom cards, the centre
  TEST YOURSELF card during checks (your scene keeps running dimmed behind it).

## How to check your work (do this repeatedly; look at the images with the Read tool)
Work from your own scratch directory so you never touch other agents' files:
```
mkdir -p /tmp/pgbp_{KEYS} && cd /tmp/pgbp_{KEYS}
CH={KEYS} SHEET=/tmp/pgbp_{KEYS}/sheet_<k>.jpg ~/edu2d/.venv/bin/python /Users/ztejas/CA_PERSONAL/pgbp/film.py sheet 12 <t0> <t1>
CH={KEYS} ~/edu2d/.venv/bin/python /Users/ztejas/CA_PERSONAL/pgbp/film.py still <t> [<t> ...]     # full-res PNGs -> ./stills/
```
(`CH=` makes the spine import only your chapters, so another agent's half-written file can't break your renders.)
Get chapter spans with `cd /Users/ztejas/CA_PERSONAL/pgbp && ~/edu2d/.venv/bin/python -c "from scenes.common import *; print(B.span('<k>'))"`.
Check several sheets per chapter (whole span, then zoomed into each beat) and full-res stills of the busiest frames.
Fix overlaps, tiny text, empty stretches, anything outside the safe area, and timing that lands on the wrong word.
Also time it: rendering must stay fast — aim for ≤ 30 ms per full-res frame for your scenes (measure a few frames with
`time` around `render(draw, t)` or by timing `film.py still`), cache static pictures, avoid big per-frame blurs.

## Rules
- Only edit `scenes/ch_<k>.py` for your chapters ({KEYS}). Never edit props.py, common.py, film.py, script.py,
  SHOTS.md, beats.json, cues.json, or other chapters. If a prop lacks something, write a private helper in your file.
- Imports: `from scenes.common import *` (gives eng, props, palette, timing). numpy / skia / math only.
- Accuracy: every number, section and rule on screen must match the narration and SHOTS.md "World". This is exam
  prep for the Income-tax Act, 1961 (A.Y. 2026-27); don't invent law. Use `rupee()` / `inr()` for money strings.
- Professional, calm, premium look (dark navy house style). No jokes, no cartoon gags.

When all your chapters are done and checked, reply with: per chapter, the file, a one-line summary of what it shows,
measured ms/frame, and any problems you could not fix.

## Notes from the props author (read)
- `scenes/common.py` defines a text helper `lab()` that shadows props' lab bench — use `lab_bench()` for the lab prop.
- Anchors: `tank`, `ledger`, `sheet`, `yearbar`, `land` take the TOP-LEFT corner; `bucket` = rim centre; `bill`,
  `cheque` = centred; asset props and `person` stand on their BOTTOM-CENTRE; `bubble` = top-left.
- `tank` returns (centre x, liquid surface y, inner rect). `machine` returns chamber centres with `.port`/`.hopper`;
  `active=5` lights the output port. `yearbar` returns the x of the 31 Mar tick; `w` is the width of the year itself,
  `extend` continues at the same scale (`ext_k` compresses, `ext_u` grows it in); marks take an optional 5th element
  (stack level). `stamp` impact lands at u ≈ 0.3 — put the `thunk` there; `deep=True` for stamps on paper.
- `sheet`: with `cols`, a row without `amt2` repeats `amt`; `amt2=None` leaves it blank; row key `t2` reveals col 2
  later; options `title_r`, `col2_a`, `grow`; use `sheet_scroll(...)` to keep the newest row in view and pass the same
  `title`/`cols` to `sheet_height`/`sheet_row_y`. Two-column sheets need width ≥ ~1100 px or labels truncate.
- `icon(name, ...)` has 48 line icons (`tile` accepts their names); `itext`, `wrap` helpers exist. Big set pieces
  (`sheet` 16 rows, `machine`, `heads5`) cost ~2–3 ms each; the spine's backdrop is ~20 ms per frame already.
