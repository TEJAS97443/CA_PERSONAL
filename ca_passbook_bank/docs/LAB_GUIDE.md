# Lab guide — building an interactive lab

A lab turns one hard CA Intermediate idea into a machine the student can run, step through and be tested on: a break-even chart that
moves as the price changes, a process account that balances step by step, a variance tree that splits a total variance, an EOQ cost
curve, an NPV profile, a materiality calculator. Labs are embedded in lessons (`::: lab <id> {"price":100}`) and live on their own page
(`#/lab/<id>`). The framework is `app/js/labs/framework.js` (read its header comment).

**Exemplars.** The smallest complete lab is the test fixture `tests/fixtures/fixture-bep.js` (break-even point; about 100 lines: pure
`compute`, controls, presets, a challenge). For a full-size lab with many modes, tables and a thorough test file, read the engine's
original exemplar in the GATE project, read-only: `~/DSA_PERSONAL/gate_cse/app/js/labs/cpu-sched.js` with `~/DSA_PERSONAL/gate_cse/tests/lab-cpu-sched.test.js`
(never edit anything in `~/DSA_PERSONAL/gate_cse`).

## 1. The idea in one paragraph

A lab is a **pure function** `compute(values) -> {frames, stats, table}` plus a declarative list of **controls**. The framework draws the
controls, calls `compute` on every change, and plays the returned frames with a player (first/prev/play/next/last, scrubber, speed, keyboard).
Each frame is `{caption, view:[…]}` where `view` is a list of **diagram specs** (the same JSON as lessons: `table, flow, tree, plot, seq,
layers, graph, nest, array, gantt, …` — see `docs/diagram-gallery.html`) and/or `{html}` blocks. So you never write SVG; you describe the
picture for each step. All the work lives in `compute`, which is plain JavaScript with no DOM access — so it is unit-testable in Node.

## 2. Files you create

| file | content |
|---|---|
| `app/js/labs/<id>.js` | UMD module: pure helpers + `def` + `GA.lab.register(def)`; `module.exports = {…helpers, compute, def}` for Node; `g.__lab_def_<id with _>` = def |
| `tests/lab-<id>.test.js` | Node tests (see the exemplars): Study Material illustrations, **answers of real ICAI questions** (RTPs, MTPs, past papers with Suggested Answers), brute-force or identity cross-checks, invalid input |
| `content/labs.json` | your entry, registered with the locked tool below (never edit the file by hand while other agents work) |

Register the lab once (status `planned`), then mark it `ready` when its tests pass:

```
python3 -I tools/lab_status.py add '{"id":"bep","title":"Break-even Lab","subject":"cma","topics":["cma.mc"],"blurb":"One sentence for the labs page.","keywords":["break-even","margin of safety","P/V ratio"]}'
python3 -I tools/lab_status.py bep ready
python3 -I tools/lab_status.py list
```

`subject` is the paper id (`cma` Paper 4, `aud` Paper 5, `fm` Paper 6A, `sm` Paper 6B); `topics` are chapter ids from
`content/syllabus/syllabus.txt`. `build.py --check` rejects an entry whose paper or topics are not in the syllabus, or a `ready` lab
without its file.

## 3. The definition object

```js
const def = {
  id, title, blurb,                         // blurb: one sentence for the labs page and lesson cards
  controls: [ {id, type, label, value, …} ],   // types: select, seg, number, range, toggle, text, textarea, table
  presets:  [ {label, values:{…}} ],            // "Load an example…" menu; at least 3, one modelled on a real ICAI question (name the document in the label: "Modelled on RTP May 2026, Q3")
  compute(values) -> { frames, stats, table, note },   // throws Error('plain-language message') for invalid input
  challenge: { title, gen(rng) -> values, prompt(values, result) -> markdown, solve(result, values) -> number|string, tol, unit, explain(result, values) -> markdown },
  custom: (host, cfg, api) => …            // only if the framework cannot express the lab
};
GA.lab.register(def);
```

* **controls**: `show: v => …` hides a control conditionally; `table` controls take `cols:[{id,label,type:'text'|'number',min,max,def,auto}]`, `rows`, `max`.
  Control ids are the keys of the lesson embed config, so choose them to be readable (`"price"`, `"vc"`, `"fixed"`, `"method"`).
* **frames**: first frame = initial state; then one frame per meaningful step; last frame = final answer state (the framework opens on the last frame so the
  answer is visible at once; the student presses ⏮ to replay). Keep frames ≤ ~120 for typical inputs (cap long runs and say so in `note`).
* **caption**: one or two plain sentences **explaining why** the step happened ("Abnormal loss is valued at the cost of a normal unit, so 200 units × ₹15.30 = ₹3,060 go to the costing P&L"),
  not just what. Markdown inline is supported (`**bold**`, `$math$`).
* **stats**: 3–6 tiles of the numbers ICAI asks for (break-even units, margin of safety, EOQ, total variance, NPV, IRR …), `hint` = the formula.
  Money: format with `GA.util.inr(n)` (`₹12,50,000`); counts with `GA.util.nf(n)` (Indian grouping).
* **challenge**: `gen(rng)` must return values that always `compute` without error and give a unique, well-defined answer (avoid ties that depend on conventions
  unless the control states the convention). `solve` must read the answer from the same `compute` result the stage shows. `explain` shows the working.
* **Citing a question**: there is no ICAI question bank yet (a later job designs it). Name the source document in the preset label as plain
  text; do not use the structured `pyq:` field until the bank exists (`build.py` warns about ids it does not hold).

## 4. Quality bar

* **Correct first.** `compute` is verified against (a) the ICAI Study Material's illustrations (`~/CA_PERSONAL/ca_sources/sm/<paper>/txt/`), (b) answers of
  **real ICAI questions** with their Suggested Answers (`~/CA_PERSONAL/ca_sources/q/`, search with `grep -il "break-even" ~/CA_PERSONAL/ca_sources/q/new/p4/*.txt`), (c) an
  independent brute force or an identity on thousands of random inputs (variances add up to the total variance; a process account balances;
  NPV at the IRR is zero). A lab that is wrong teaches the wrong thing.
* **Conventions are explicit.** Where ICAI's material admits two treatments (FIFO or weighted average for equivalent units, book or market
  weights, the treatment of normal-loss scrap), the treatment is a control or stated in `note`, and the default follows the Study Material.
* **Plain language.** Labels like a teacher would say them; error messages that say what to fix ("The selling price must be higher than the variable cost per unit").
* **Looks native.** Use only framework controls and diagram colours (`a`–`h`, `ok`, `bad`, `warn`, `mute`); no hard-coded colours, no new CSS unless the lab truly needs it
  (put it in `app/css/labs.css` under a `/* lab: <id> */` comment). Must read well in light and dark themes and at 360 px width.
* **Inputs are forgiving**: trim, accept commas in amounts (`12,50,000`) or spaces, clamp ranges, cap sizes (and say so).
* The embed in a lesson uses `compact` mode: the same lab, smaller; make sure the default config you document for lessons looks right there.

## 5. Check your work

```
node tests/run.js lab-<id>                 # your tests (also run the shared framework tests: node tests/run.js labs-)
.venv/bin/python build.py --check          # catalogue consistent
.venv/bin/python build.py                  # writes data/ so the app can run (safe to repeat)
tools/shot.sh "/lab/<id>" /tmp/<id>.png 1440 1500      # then LOOK at the PNG with the Read tool; also  tools/shot.sh "/lab/<id>" /tmp/<id>-d.png 1440 1500 "theme=dark"
tools/shot.sh "/lab/<id>" /tmp/<id>-m.png 390 1400     # phone width
```
Screenshots show the final frame. To see another frame or preset, pass a config in the URL: `tools/shot.sh "/lab/<id>?cfg=%7B%22method%22%3A%22fifo%22%7D" …`.

Do not edit the framework, diagram kit, other labs, or lessons. If you need something the framework cannot do, use `custom` or describe the gap in your report.
