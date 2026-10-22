# kit: diagram kit improvements (2026-10-20)

All eight steps are done and installed in ~/ca_passbook.
- `node tests/run.js diagram`: 128 passed (9 of them new).
- Full suite: 1588 passed, 1 failed. The failure is `home: … question of the day … (P3-46)`. It depends on the PYQ data in data/, not on the kit, and it also fails with the old diagram.js.
- `node tools/lint_content.js` over all 181 lessons: 0 errors.
- `build.py --check`: exit 0.

## What changed

Files:
- `app/js/viz/diagram.js`
- `tools/lint_content.js`
- `tools/shot.sh` (merged with the SHOT_CALM / SHOT_BUDGET edit someone else made at 08:28)
- `docs/diagram-examples.json` and the regenerated `docs/diagram-gallery.html`
- `tests/diagram.test.js`
- `docs/CONTENT_GUIDE.md`: four sentences, patched into the current live text.

`~/CA_PERSONAL/ca_prompts/CONTENT_GUIDE.md` was not touched. Sync it if that copy is the master.

Backups of the files as they were in live: `$TMPDIR/kit/live_backup/`.

### 1. flow-width: a flow is drawn inside its `w`
- **Default width:** a flow with no `w` is now 420 px, not 560.
- **Box sizes:** a box is sized to its longest line (it used to be the whole label measured as one line). A label of three or more lines makes the box taller; three-line start/end pills also get 10 px more width.
- **Flows that already fitted keep their old node positions.** Of the 41 lesson flows that fitted before, all 41 keep exactly the same width and height. 35 also keep identical node positions. In the other 6, rows of multi-line boxes moved slightly because those boxes are now sized correctly.
- **Compact layout for every other flow:**
  - Each decision's main branch (the child with the longest way on) goes straight below it.
  - An outcome that ends at a decision sits beside it, on the side its edge comes in the edge list.
  - Other branches sit beside the main one.
  - The boxes furthest out wrap 8 % narrower, one at a time, until the flow fits. A wide decision wraps onto more lines and gets taller instead of wider.
  - For very narrow widths there is a last-resort mode where outcomes go below their decision.
- **Redrawn on phones:** `flow` is now one of GA.fit's redraw types, so at phone width a flow is redrawn at the column's width with 12 px text, instead of being shrunk to 80 % and scrolled.
- **Measured on the 116 lesson flows** (fresh snapshot):
  - Wider than their own w: 75 before, 3 now.
  - Big enough to scroll at 390 px: 75 before, 16 now, and those 16 are redrawn on phones.

### 2. flow-edges
- **Routing:** edges are drawn at right angles, chosen by cost. No edge crosses a box; this is checked for every lesson flow at desktop width and at 335 px and 305 px.
- **Decisions:** side branches leave from the diamond's side corners.
- **Rejoins:** an edge that rejoins a node lower down, which used to be hidden behind the boxes in between, now runs in a lane beside the column.
- **Shared nodes:** several edges into one shared node each arrive at their own point, on the top or the side.
- **Loops:** they go round the side in their own lane; if the side is blocked, they go over the top.
- **Labels:** each label sits beside its line, clear of every line, box and other label. Long labels wrap. A loop's label sits half way along its lane.
- **New option, per-edge colour and dash:** `["a", "b", "no", {"color": "d", "dash": true}]`, or `{from, to, label, color, dash | style: "dashed"}`. The edge gets an arrowhead in its own colour.

### 3. tree-notes
- **Notes:** a note of several lines now starts just under its box and grows downward, and the levels move apart to hold it. A note under a node that has children gets a halo over the lines.
- **`"wrap": true`:** stacks every leaf group (a node whose 2+ children are all leaves), so the leaves hang one under another from a line down the parent.
- **`"wrap": "auto"` with a `"w"`:** stacks only the groups needed to fit w.
- **Phones:** at phone width GA.fit redraws a tree that way, but only when stacking makes it at least 15 % narrower. Binary trees and edge-labelled pairs like sa705 keep the old scroll.
- **Without these keys trees draw exactly as before.** Only 5 lesson trees changed, from the note fixes.
- **Labs:** lab trees (variance, ratios, joint, audit-risk) also restack on phones.

### 4. labels
- **plot:** `points[].pos` now takes 8 places (above-left, above-right, below-left, below-right added), plus `dx` / `dy` in px. Vectors take `dx` / `dy` too. Bad values give clear errors.
- **seq:**
  - A box on a lane may reach to just short of the next lanes' lines; past that it wraps.
  - An outer lane's box is kept inside the drawing, which was the first-lane problem.
  - Arrow texts that would run past the drawing wrap, notes wrap, and a long lane name widens its head box.
  - Rows with wrapped text grow taller.
  - A seq that fits draws exactly as before.
- **graph:** a square node grows to hold its label, and edges end on the grown box's sides.
- **nest:** with `"w"`, a nest wider than w wraps its lines, row values and titles to fit. Nests that fit draw as before.

### 5. lint-nesting (`tools/lint_content.js`, new `fenceProblems`)
Problems are reported as ERRORs with file line numbers:
- An opener with the same colons as the container round it. This includes the lead's case, a `::: diagram` inside a `::: answer`.
- A closer that does not match.
- A stray closer.
- A container that is never closed.
- A fence indented under a list item, which md.js reads as the item's text.
- Any `:::` md.js would leave as text, or a bare closer it pairs with a later one into a "Note" box. These are checked only when none of the problems above are found, because they are usually echoes of them.

An inner container with more colons than its outer one is reported as a WARN (it renders, but breaks the guide's rule).

**Lint offenders now: none.** All 181 lessons have 0 fence problems, and 0 lessons have inverted nesting.

### 6. shot-open
The existing `probe=1&fold=open` worked only below 500 px: at desktop width the 6 s budget ended before the app's 7 s probe timer. Someone has since raised the budget to 30 s. Its green report also covers the top of the picture.

Added: `"fold=open"` (or `"open=1"`) on its own opens every fold, Hint and Show answer at any width. The report box is removed from the picture.
- Example: `tools/shot.sh "/l/cma.mc.bep" /tmp/m.png 390 6000 "fold=open"`.
- `probe=1` keeps the report on the picture.
- Checked at 390 and 900: the answer folds and their charts are open.

### 7. regress
- **Baseline:** taken with the old code before any change.
- **Re-rendered:** a fresh live snapshot of 1514 specs (every lesson diagram, plus the first and last frames of every lab's default and presets), plus 16 synthetic and example specs.
- **Errors:** 0 render errors (the old code had 2, both from the new plot positions in the extras).
- **Changed:** 163 renders (flow 124, seq 22, tree 8, nest 4, graph 3, plot 2). Every plot, layers and table, and every lab view except the one lab flow, is byte-identical.
- **Visual check:** before/after PNGs at 390 and 900, light and dark, for all 163 changed renders (652 images).
  - I looked at every changed flow at 390 light, and at samples of the others at 360, dark 390, light 900 and dark 900.
  - Each looked equal or better. Problems I found on the way (snapped near-vertical edges, labels shared with a trunk, a loop blocked by an outcome box, labels out of the width) were fixed and re-checked.
- **Evidence:** `~/CA_PERSONAL/ca_prompts/reports/kit-evidence/` holds 15 before/after PNGs and `regression.csv`, which lists every spec's old and new hash and size.

## Remaining limits
Three lesson flows are still a little wider than their w. Each has a row of four outcomes that cannot shrink further:
- `aud.complete.sa260` (SA 265 flow): 428 px against 420 (it was 729).
- `fm.ratio.liquidity`: 442 against 420 (it was 578).
- `sm.int.generic`: 527 against 400 (it was 807).

The authors could split these, or give w 440. On phones they are redrawn anyway, as narrow as their boxes allow, which is about 5 % over a 300 px column.

Other limits:
- **seq:** without w, seq still defaults to 480 px for 3 lanes; give `"w": 400` for phones (now in the examples' note).
- **graph and nest:** these are still not redrawn on phones.
