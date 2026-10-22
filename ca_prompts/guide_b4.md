## 4. Diagrams

CA lessons use mostly: `table` (formats, working notes, comparisons), `flow` (processes, cost flows, audit procedures, decision paths), `tree` (variance trees, classification trees, opinion decision trees), `plot` (break-even and P/V charts, EOQ cost curves, NPV profiles, EBIT-EPS lines, Ko curves), `seq` (communications: auditor, management, TCWG, bank), `layers` (hierarchies: cost hierarchy, strategy levels), `graph` (stakeholders, relationships) and `nest` (groupings, e.g. elements of cost inside cost of sales). A numerical or framework topic without a picture is not finished; a Standard needs at least one flow or tree of what the auditor does.

Every visual topic needs diagrams — a lesson on scheduling, paging or automata without pictures is not finished. A diagram is JSON inside a
`::: diagram` container. Types: `gantt · graph · tree · table · memory · seq · layers · bits · flow · plot · array`.
* `kmap` — Karnaugh map for 2–5 variables: `vars`, values from `m` / `d` / `M` or `grid`, `groups` by `term` ("B'D'") or `cells` (wrap round edges and corners by themselves), `index` for minterm numbers.
* `circuit` — gate schematic on a column/row `grid`: `parts` (and … xnor, buf with `n` inputs and `neg` bubbles; mux, dec, enc, fa, ha, dff/tff/jkff/srff, box; in/out terminals), `wires` routed at right angles with junction dots, `path` to highlight a critical path.
* `wave` — timing diagram: `lanes` of `clk` (period), `bits` ("01.x z") or `bus` with `data`; `marks` (dashed time lines), delay `arrows`, `grid`, `axis`.
* `shapes` — geometry and spatial-aptitude canvas in user units (y up): poly, rect, circle, ellipse, arc, line, text, angle, dim, grid; `group` / `use` with `tf` rotate / scale / mirror; cubes, cube, net, die.
* `venn` — 2 or 3 sets: `regions` text and `shade` named by set expressions ("A&!B", "U-(A|B)"), optional `universe` box.
* `er` — Chen-notation ER diagram on a column/row `grid`: `entities` (`weak`), `rels` (`ident`, `links` with `card`, `total`, `role`), `attrs` (`key`, `partial`, `multi`, `derived`, composite via `of`), `isa` (circle "d"/"o" or triangle, `total`), `aggregations`.
* `nest` — nested labelled boxes (C scopes and blocks, static / dynamic scope chains, memory segments, set containment): a `root` box (or a list of `boxes`) with `title`, `note`, mono `lines`, `rows` of [key, value], `children` (`dir` "v" / "h"), `color`, `hl`; `arrows` between boxes or lines ("id.2") round the margin or `straight`.
**See `docs/diagram-gallery.html` (open it in a browser) and `docs/diagram-examples.json` for one working spec of each, with notes.**

Rules:
* The JSON must be valid (double quotes, no trailing commas, no comments). The linter fails the build otherwise.
* Compute numbers with code, then paste them. A Gantt chart with a wrong block is worse than none.
* Prefer several small diagrams over one crowded one. Label axes; use `caption` for the take-away sentence (it appears under the picture).
* Colours: `a`…`h` draw **blue, teal, amber, orange, sky blue, violet, green, pink** (the v3 `--viz-a`…`--viz-h` tokens, in both
  themes; `d` is a burnt orange, so no data colour looks like the coral button); `ok` green, `bad` rose (red), `warn` amber, `mute` grey.
  **Table cells** (`cells`) are different: only `a` (green), `b` (rose), `c` / `hl` (amber), `d` (blue), `ok`, `bad`, `mute`; `rowClass`
  takes `hl`. The linter rejects other names.
* Name colours in titles, captions and the text around a diagram with exactly these words: there is no indigo (the old palette's `a`), `d`
  is orange, not rose (the old palette's `d`), so "orange" names `d` only and "rose" or "red" name `bad` (and table `b`) only, and when one
  diagram draws both `a` and `e`, write "blue" and "sky blue". Never let a colour carry the meaning alone: say what it marks
  ("Blue: the sorted part"), or give a second cue (dashed, a label). The linter warns when a title or caption names a colour the diagram
  does not draw (parts a type colours by position count as drawn; "rose" over orange parts gets a hint), says "indigo" anywhere, or says a
  bare "blue" once both blues are drawn. The colours of things in a problem ("5 red and 7 blue balls") are not checked, and neither is the
  verb ("X rose"): reword it ("X went high").
* Every drawing needs a name for screen readers: a title after `::: diagram`, a `caption`, or an `alt` (one sentence that describes a busy
  picture; it replaces the title as the accessible name). With none of them a screen reader hears only "graph"; the linter warns. Tables are
  HTML and read out cell by cell, so they need none. The same holds for the drawings in PYQ worked solutions (`pyq/meta`): `title="…"`
  after the ```` ```diagram ```` fence, or a title, caption or alt in the spec; `build.py --check` warns about one without a name and fails on
  one that is not valid JSON (`tools/buildlib/pyq.py`).
* The `title` after `::: diagram` becomes the picture's title; do not repeat it in `caption`.
* **Only the given sits above the fold.** Between a worked example's prompt and its answer fold a diagram must be the given, and the
  lesson says so: the prompt hands it over ("the graph below", "this DFA", "the chart below", or the line just above it ends with ":"), or
  its spec carries `"given": true` (it draws nothing; a second diagram above the fold always needs the flag or its own ":" line). A given
  shows only what the prompt gives: its title, caption and labels state no result (no total, weight, count, path, cycle or conclusion the
  prompt does not give: not "Prim's tree, weight 8", not "so it is self-dual", not a "∪ (5 tuples)" node when the prompt asks how many
  tuples), and it marks no answer (no highlighted path, no K-map groups, no answer row in green, no colour that singles out the one process
  that is not deadlocked). It marks nothing its words do not explain: a fill, colour, highlight or dashed line on some of its nodes, edges or
  cells needs a legend in the prompt, title or caption ("Processes are blue circles and resources amber squares; teal edges are assignments,
  orange edges are requests", "F (rose): a burning cell"). A mark only the working explains is the working's first step at best (the
  unreachable state filled, its edges dashed) and the answer at worst (the two loop headers in their own colours, the NP-complete problems in
  one colour): draw such a given plain. Each element in its own colour (every block of a flow graph) singles nothing out, and one mark on
  the one element the prompt names (the start vertex S of "from S") only restates it. Everything else, the output and the working, is the
  first block inside the answer. When the result reads best on the picture itself, draw the given plain above the fold and the
  marked copy inside it. Text after the fold shows while the fold is closed, so a closing remark goes inside it too.
* The linter warns about a diagram above the fold that the prompt does not hand over and that has no `"given": true`; about one the
  prompt hands over whose title or caption states a number that neither the prompt nor the picture contains, lists a path (A → B → C) or
  concludes ("so", "therefore", "worked out below"), or that highlights a circuit path or draws K-map groups; about a given whose fills,
  colours, highlights or dashes single out part of it with no word naming them in the prompt, title or caption ("Colours mark the regions"
  counts); about a given whose labels state the count the prompt asks for; and about text after the fold. It cannot judge every sentence:
  `"given": true` is your word that the numbers in its words are the given's, so only the number checks are skipped for it (conclusions,
  listed paths, drawn answers, marks and counts are still checked), and a reviewer reads it: a legend can give the answer away too
  ("Teal: the loop headers"), and so can a caption that hands over the method ("B splits f into its B = 0 and B = 1 halves").
  Exemplar: `cma.mc.bep.md` (a break-even chart given plain, the marked chart inside the answer).
* If you need a diagram type or option that does not exist, say so in your final report instead of faking it with text art.

