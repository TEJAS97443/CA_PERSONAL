# Content guide — writing a PassBook lesson (CA Intermediate Group II)

A PassBook lesson takes a CA Intermediate student from "I read the module once and it blurred" to "I can write this for full
marks on 8, 10 or 12 January 2027". It lives in `content/subjects/<paper>/<lesson-id>.md`, where `<paper>` is `cma` (Paper 4),
`aud` (Paper 5), `fm` (Paper 6A) or `sm` (Paper 6B) and `<lesson-id>` is a sub-topic id from `content/syllabus/syllabus.txt`
(e.g. `cma.mc.bep`). **The exemplars to imitate are `content/subjects/cma/cma.mc.bep.md` (a numerical lesson) and
`content/subjects/aud/aud.report.sa705.md` (a theory lesson) — read both first, then open their rendered previews.** This guide is the
contract; `build.py --check` and `node tools/lint_content.js` enforce what can be enforced.

The reader is a student two to eleven weeks from the exam, attending classes, short of time, often reading on a phone. They need three
things from each lesson: to **understand** the idea (so it sticks), to **reproduce** what ICAI marks (formats, Standard wording,
answer structure), and to **practise** it. Everything in a lesson serves one of those three.

## 1. What a lesson must do

Every lesson contains these `##` sections, in this order (exact names; the app reads them):

| `## Section` | depth | purpose |
|---|---|---|
| In plain words | Quick | The idea in everyday language, told through the PassBook cast (§2a). One `::: analogy`. A `::: key` box with the single most important insight. No formulas or section numbers yet. Must stand alone: a student who reads only this section and the Recap gets the idea. |
| How it works | Exam | The mechanism step by step (`::: steps` or a numbered list), at least one diagram (§4), the ICAI vocabulary introduced and defined. For a Standard on Auditing: its objective, the requirements in ICAI's order, and what the auditor actually does. |
| Formats and formulas | Exam | *(required for numerical lessons, optional otherwise)* ICAI pro-formas as tables (cost sheet, process account, reconciliation statement, variance layout, cash budget, statement of working capital ...), `::: formula` blocks with every symbol named, `::: definition` blocks for terms ICAI defines. A format is shown exactly as ICAI lays it out, with a line telling the reader to reproduce it from memory. |
| Worked examples | Exam | **Numerical lessons: at least two** `:::: example` blocks with real numbers in the ICAI style (given data, "Required:", full working with working notes inside `::: answer`). **Theory lessons: at least two case scenarios** in the ICAI style ("Comment", "State with reasons", "Advise the auditor") with the full model answer inside `::: answer`. At least one example per lesson must be at the difficulty of a real ICAI question. Nothing above the fold may give the answer away (§4). |
| Under the hood | Deep | *(optional)* Finer points from the Study Material: exceptions, alternative methods, the rarely asked but examinable corners, links between topics. Only here may detail pile up. |
| Exam angle | Exam | How ICAI examines this, from the real RTPs, MTPs and past papers (§6): what is asked, for how many marks, in what words, the traps. `::: exam` blocks; `::: trick` blocks for mnemonics and shortcuts that are *correct in general* (state their conditions). |
| Answer frame | Exam | *(required for theory lessons and for the theory parts of numerical lessons)* The skeleton of a full-marks answer: for audit case questions ICAI's own pattern **relevant provision / Standard → facts of the case → analysis → conclusion**; for "explain"/"distinguish" questions the points ICAI's suggested answers give marks for, in a table or list. Optionally a three-rung ladder: an answer that loses marks, one that passes, one that gets full marks (`::: cols`). |
| Common mistakes | Exam | At least two `::: mistake` blocks — what students actually get wrong, and the fix. Title them with personality ("Hall of Shame: the abnormal loss that went to costing P&L at the wrong rate"). |
| Practice | Exam | A `::: quiz` with 4–6 **original** questions (§5): at least one numerical for numerical lessons, at least one case-style MCQ in the format ICAI uses in the 30-mark MCQ part of Papers 5 and 6, and one that catches the commonest mistake. |
| Recap | Quick | 5–8 bullets someone could revise from in 60 seconds the night before. Each bullet a fact, a formula or a rule, not a slogan. |
| Flashcards | — | 8–12 cards (`Q:: … / A:: …`). Removed from the reading text and served by the flashcard trainer. Good cards: one fact each, phrased the way ICAI asks ("SA 705: when is a disclaimer of opinion given?"), formulas, format headings in order, numerical thresholds stated in the Study Material. |

The depth switch on the lesson page shows *Quick* (plain words + recap: the "short notes" view), *Exam* (everything except Under the
hood) or *Deep* (all). So the Quick view must work as stand-alone short notes, and the Exam view must hold everything needed for full marks.

Size: the build counts every word of the lesson except the flashcards (tables, definitions and quiz included) and accepts **900–3,600**.
A lesson on a whole Standard or a whole numerical method sits near the top (about 3,000–3,600); a small topic (direct expenses, audit
trail) near the bottom (900–1,800). Both exemplars are about 3,500. Reading time `minutes:`
honest at ~200 wpm plus time to work the examples.

## 2. Voice: fun to read, exact to write

**The reading is fun; the facts and the model answers are exact.** The user is a CA student who learns best when the reading is
enjoyable: a dry module tone fails even when it is correct. So humour is a requirement, not decoration. And every joke must carry the
lesson: the funny bit *is* the example, the mistake, the memory hook.

* Plain, warm, direct. Short sentences. Define every term the first time it appears, in the same sentence. Address the reader as "you".
* Start from a concrete situation with the cast (§2a), then name the idea. Never open with a definition.
* Humour lives in: the opening story, analogies, example set-ups ("Kesar wants to know if the Diwali gift-box line breaks even"), comic
  `###` sub-headings (the `##` section names are fixed), mistake titles ("Hall of Shame"), the occasional one-line aside in a recap.
  Humour never lives inside: a definition, a formula, a format, a model answer, a Standard's requirement, or a quiz answer key.
* Model answers and answer frames are written the way a full-marks ICAI answer is written: formal, the Standard's own words
  ("sufficient appropriate audit evidence", "pervasive", "those charged with governance"), no jokes, no slang.
* No emojis. Exclamation marks only inside a character's spoken line, and rarely. Light Hinglish is allowed only inside a character's
  spoken line ("Sab adjust ho jayega"), never in explanations, answers or cards.
* Bold the terms a student must be able to write; italics sparingly; `==highlight==` for the one phrase examiners look for.
* Indian conventions: `₹` with lakh/crore grouping (`₹12,50,000`, `₹1.2 crore`), Indian company names, Indian English spelling.
* Inclusive terminology only: never master/slave, whitelist/blacklist. ("Master budget" is ICAI's term for the summary budget: use it
  where ICAI does, it refers to the summary of budgets, not a person; do not invent other uses.)
* Character dialogue is written as quotes with the speaker in bold: `> **Kesar:** Profit is profit, no? Why do I need a break-even?`
  Keep each exchange to 2–6 lines. A lesson has at most three dialogue blocks.

### 2a. The PassBook cast (shared by every lesson: keep them consistent)

The whole app follows one company and the people around it. Use the cast to make examples memorable; any lesson may use any of them.

* **Tapri Tea Co. Ltd** — a chai-and-snacks company from Indore that grew from one roadside stall (the original "tapri") into a
  national brand: packaged chai premix, kulhad cafés in 40 cities, a samosa factory, a cold-chain fleet, an app for delivery. It is the
  client, the cost object, the investment decision and the strategic case all at once.
* **Kesar Mehra** — founder and MD. Big heart, bigger plans, allergic to paperwork. Running gags: wants to put everything into
  "miscellaneous expenses"; says "Sab adjust ho jayega" right before something cannot be adjusted; launches a new product every
  festival.
* **Ritu Sharma** — Tapri's cost accountant. Calm, precise, slightly tired. Running gag: "Per unit, please." She is the voice of
  Paper 4.
* **Dev Malhotra** — Tapri's CFO. Spreadsheet romantic, NPV evangelist. Running gag: discounts everything, including compliments
  ("Thanks Dev, nice tie." "Present value of that is lower than you think."). The voice of Paper 6A.
* **Iyer & Associates, Chartered Accountants** — Tapri's statutory auditors. **Ms. Lakshmi Iyer**, the engagement partner: stern,
  fair, asks exactly the question an examiner asks ("Evidence, Bunty. Where is the evidence?"). The voice of Paper 5.
* **Bunty (Varun Khanna)** — article assistant at Iyer & Associates, first year, eager. Running gag: "Bunty's tick" — ticking
  vouchers before reading them; he learns professional skepticism the hard way. He makes the mistakes the reader would make.
* **BrewBucks** — the global coffee chain entering Tapri's cities; the competitor in Paper 6B cases. **Ananya Rao** is Tapri's head
  of strategy (calm, uses frameworks like a chef uses knives).
* Other entities when a topic needs them (a bank, a hospital, a trust, a municipality, a co-operative, an LLP, a government
  department): invent a plausible Indian name and keep it inside the lesson.

Never let the story carry a fact the reader needs: facts go in prose, tables, formulas, formats and answers. A reader who skips every
dialogue must lose no marks.

## 3. File format

```markdown
---
id: cma.mc.bep                        # exactly the sub-topic id; file name must match
title: Break-even point, margin of safety and angle of incidence
minutes: 22
needs: cma.mc.basics                  # prerequisite sub-topic ids (comma separated, may be empty)
tags: break-even, margin of safety, P/V ratio, CVP   # 3–8 search words
labs:                                 # leave empty: lab embeds are added later by the lab owners
summary: One sentence (≤ 30 words) shown on cards and in search.
---

## In plain words
…
```

Markdown subset: `## / ### / ####` headings, paragraphs, `-` and `1.` lists (nestable), `| tables |`, `> quotes`, ``` fenced code ```
(rare in this app; language tag `text`), `**bold**`, `*italic*`, `` `code` ``, `==highlight==`, `[text](https://…)`, `---`. A single newline
inside a paragraph is a space. **Raw HTML is never rendered.**

Tables are the workhorse of this app (formats, comparisons, working notes). Right-align amounts by writing them consistently
(`12,50,000`); put the unit in the header (`Amount (₹)`); put totals in a final bold row (`| **Cost of production** | | **8,40,000** |`).
Keep tables to at most 5 columns so they read on a phone; split a wide statement into two tables rather than squeezing it.

Cross-links: `[[cma.mc.basics]]` or `[[cma.mc.basics|P/V ratio]]` link to another lesson (or its syllabus page if not yet written);
the id must exist in `syllabus.txt`. Link prerequisites and closely related ideas (a variance lesson links the standard-setting lesson;
SA 705 links SA 700 and SA 706), not every mention. Cross-paper links are welcome where ICAI's syllabus connects topics (EOQ in Costing
and inventory in FM working capital; budgets in Costing and the cash budget in FM).

### Maths

KaTeX. Inline `$\frac{F}{P/V}$`, display `$$BEP\ (\text{units}) = \frac{\text{Fixed cost}}{\text{Contribution per unit}}$$`. Escape a literal
dollar as `\$`. Put plain words outside `$`; use `\text{…}` for words inside maths. Write rupees outside maths (`₹40 per unit`) or as
`\text{₹}` inside. Run `node tools/lint_content.js your.md` — every formula must render. Long display formulas: put a top-level `\qquad`
where a reader would pause so it can wrap on phones (never `\quad`; nothing splits a formula with `\\`, `&`, `\tag`, `\color` or `%`).

### Containers

```
::: kind optional title
content (markdown, may contain tables, lists, maths)
:::
```

**Nesting rule:** a container that holds another container must use *more colons* than the inner ones
(`::::` outside, `:::` inside). The closing line must have the same number of colons as the opening line.

| kind | use |
|---|---|
| `analogy` | the everyday comparison (renders in a different voice) |
| `key` | the one idea to keep |
| `definition` | a precise definition, in ICAI's words where ICAI defines the term |
| `formula` | a formula with a title: `::: formula Margin of safety` |
| `trick` | a mnemonic or shortcut — must be correct in general, with its conditions stated |
| `exam` | how ICAI examines it; marks, wording, conventions and traps |
| `mistake` | a common error and the fix |
| `note`, `tip`, `warning` | asides (`warning` for version-sensitive facts: "Verify against the Study Material for your attempt") |
| `example` | a worked example / case scenario (`:::: example Title`) containing a nested `::: answer Show the working` (theory: `::: answer Model answer`); when the working holds a diagram, add a colon at each level (`::::: example`, `:::: answer`, `::: diagram`) |
| `answer` / `solution` / `details` | collapsible; use `::: answer Label` |
| `steps` | numbered step cards (`1.` items) |
| `cols` | two or three columns separated by a line of `---` (answer ladders, "do / don't") |
| `compare` | wrap a comparison table for extra styling ("distinguish between" tables) |
| `diagram` | JSON diagram spec, see §4 |
| `lab` | embed an interactive lab — **do not add these yourself**; lab owners add them |
| `pyq` | embed ICAI questions — **do not add these yourself** until the ICAI bank exists; the app lists tagged ICAI questions on every lesson |
| `quiz` | self-check questions, see §5 |

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


## 5. Quizzes

```
::: quiz Check yourself
Q: Which of the following …?
- [ ] wrong option
- [x] right option
- [ ] wrong option
- [ ] wrong option
> Why the answer is right and the tempting ones are wrong (required).

Q: A numerical question?
= 2400
> Working.            (use `= 33.2..33.4` for a range; state the rounding you expect in the question)

Q: Select all that apply?
- [x] true statement
- [ ] false statement
- [x] true statement
> Explanation.
:::
```

4–6 questions, **original** (never paste an ICAI question — those go in the ICAI bank), covering: one numerical (numerical lessons), one
conceptual, one **case-style MCQ** in the way ICAI writes the 30-mark MCQ section (Part I) that **all three Group II papers** have in the
new scheme, often five MCQs on one case scenario (a short scenario with the cast, then
"Which of the following is correct?" with four options, like "(a) Qualified opinion (b) Adverse opinion (c) Disclaimer of opinion
(d) Unmodified opinion with an Emphasis of Matter paragraph"), and one that catches the commonest mistake. Four options, plausible
distractors. Every answer verified (by hand *and* by script when numerical).

## 6. Learning from ICAI's own questions (Exam angle)

ICAI's questions are in `~/CA_PERSONAL/ca_sources/q/` (new scheme: past papers with Suggested Answers, RTPs and MTPs for May 2024 → January 2027;
old scheme 2019–2023 where collected) with text next to every PDF (`.txt`, with `=== p.N ===` page markers) and a
`~/CA_PERSONAL/ca_sources/q/manifest.json`. Search them:

```
grep -il "break-even\|margin of safety" ~/CA_PERSONAL/ca_sources/q/new/p4/*.txt
grep -n -i "SA 705\|disclaimer" ~/CA_PERSONAL/ca_sources/q/new/p5/*.txt | head -40
```

Before writing a lesson, read the real questions on its topic (at least 5 where they exist, across different attempts and RTP/MTP/past
paper): what is asked, the marks, the wording ("Comment", "Examine", "Advise", "Calculate … and comment"), the data layout, and how the
Suggested Answer is structured. Then:

* The **Exam angle** section reports what you found, factually: "Asked in some form in N of the documents you read (list them in your
  report); usually 4–5 marks; typically …". Never invent a frequency, never say "always asked" or "important for exam" without evidence.
* Model your **Worked examples** on the real question style (layout of data, the "Required" line, the working-notes structure of the
  Suggested Answer), with **your own** company, numbers and facts. Never copy a question or its numbers.
* Model your **Answer frame** on how the Suggested Answers earn marks (the provision quoted first, the case facts applied, a clear
  conclusion; "distinguish" answers as a table of points).

## 7. Accuracy is the product

* **The ICAI Study Material is the source of truth.** It is in `~/CA_PERSONAL/ca_sources/sm/<paper>/txt/` (per chapter, with `=== p.N ===` page
  markers; `toc.json` maps chapters and headings). Read the whole chapter section for your lesson before writing. Every definition,
  Standard requirement, list of points, classification, formula and convention in a lesson must agree with it. Where ICAI gives a
  definition or a list, use ICAI's wording and ICAI's order (lists are memorised and marked as ICAI gives them).
* **Applicability for January 2027** is in `~/CA_PERSONAL/ca_sources/APPLICABILITY.md` (which SAs, which amendments up to which date, any exclusions).
  If the Study Material and the applicability notice disagree, follow the notice and say so in your report. If a fact is
  version-sensitive (Companies Act sections and rules, CARO clauses, RBI norms for banks, thresholds and limits), state it as the Study
  Material does and add one `::: warning` line: "Verify against the Study Material and Statutory Update for your attempt."
* **What applies for January 2027** (ICAI notice of 16 Sep 2026): the Study Material "July, 2024 (Reprint August, 2025 and onwards) + RTP
  for January 2027" for P4, P5, P6A and P6B. No study guidelines, exclusions or statutory updates exist for these papers. Use only that
  edition (`~/CA_PERSONAL/ca_sources/sm/<paper>/txt/`); the newer July 2026 edition in `pdf/may2027-edition/` is for May 2027 onwards: do not use it.
  The Study Material teaches SQC 1 and SA 220 (not SQM 1/2): so do we. Two company-law changes from ICAI's Paper 2 amendment list touch
  Paper 5; teach the Study Material's text and add a `::: warning` where they matter: (1) the small-company limits in section 2(85)
  (relevant to CARO 2020 applicability) were raised to paid-up capital ₹10 crore and turnover ₹100 crore by notification G.S.R 880(E),
  1 Dec 2025; (2) the auditor's fraud report under section 143(12) is filed electronically in form ADT-4 (G.S.R 359(E), effective
  14 Jul 2025). Say that ICAI lists these under Paper 2 and that Paper 5 answers follow the Study Material.
* **Reading the Study Material text**: page markers look like `=== p.N [X.Y] ===` (N = PDF page, X.Y = the printed page, e.g. 13.24: cite
  the printed page). Formulas come through as stacked text: for pages in a chapter's `formula_pages` (toc.json), render the PDF page to a PNG
  and read the formula from the picture. Pages in `ocr_supplement_pages` had figure text only as images; their OCR is appended in marked
  blocks. Each chapter ends with ICAI's "Test Your Knowledge" (MCQs, theory questions, practical problems and answers): read them, they show
  what ICAI considers examinable, but do not copy them.
* **Never state a specific you have not read in the Study Material**: no section number, SA paragraph, rate, threshold, date or limit from
  memory. If the Study Material does not give it, write the concept without the number.
* **Every number in a worked example is produced by code you ran** (a few lines of Python in `$TMPDIR`, not in the repo). Check totals,
  balancing figures, reconciliations and that variances add up to the total variance. Follow ICAI's rounding and presentation conventions
  (working notes, two decimals for rates, `Fav`/`Adv` (or `F`/`A`) labels as ICAI prints them).
* **Conventions are explicit**: when ICAI's material admits two treatments (e.g. abnormal gain and the normal-loss scrap value; FIFO vs
  weighted average for equivalent units; book vs market weights), name the one you use and say what changes under the other.
* Write `₹`, lakh/crore grouping, and ICAI's paper terminology (Paper 4 "Cost and Management Accounting", Paper 5 "Auditing and Ethics").
* In your final report list anything you are less than certain about, with the Study Material page you checked, so a reviewer can check it.

## 8. Your workflow

1. Read the two exemplars (`cma.mc.bep.md`, `aud.report.sa705.md`) and their previews, `docs/diagram-gallery.html`, and the syllabus
   entries for your sub-topics and their neighbours (do not duplicate a neighbour's content: link it).
2. Read the Study Material section(s) for each lesson, and at least five real ICAI questions on it (§6).
3. Draft the lesson. Compute every number with code. Build diagrams from those numbers.
4. `node tools/lint_content.js content/subjects/<paper>/<id>.md` → fix every ERROR and WARN.
5. `.venv/bin/python build.py --check` → no errors for your files (warnings about *other* lessons are not yours).
6. `.venv/bin/python tools/preview_lesson.py content/subjects/<paper>/<id>.md` and **look at every PNG slice** (Read tool): tables legible
   at phone width? maths rendered? diagrams clear? callouts balanced? Fix what looks wrong. Also check `--dark`.
7. Final message: the lessons written, word counts, the Study Material pages you used, the ICAI documents you read for each lesson,
   diagram types used, and doubts.

Do not edit shared code (`app/`, `tools/`, `build.py`), the syllabus, or other people's lessons. If something blocks you, describe it
precisely in your report and move on.

## 9. House rules learned from the exemplars

* **Phones first.** Charts (`plot`) are redrawn for small screens; trees, flows and graphs are not, they scroll sideways. Design every
  tree, flow and graph for a 360–450 px column: at most 3 nodes side by side, labels of at most ~4 words per line, vertical flows rather
  than wide ones, and a `w` of about 450 or less. `preview_lesson.py` cannot render below ~500 px, so also screenshot the lesson at phone
  width once it builds: `tools/shot.sh "/l/<id>" /tmp/<id>-m.png 390 4000` (run `.venv/bin/python build.py` first to write data/), and LOOK.
* **Flows default to 560 px wide**: always give a flow an explicit `"w": 400`–`450`. Flows lay out vertically only; a side-by-side
  comparison of two routes is a table. In charts whose lines reach the top corners, use `"legend": "outside"` so the legend does not
  cover them.
* **Axis labels** say what is measured with the unit, e.g. `"ylabel": "amount (₹)"`; never a bare `₹` (it renders as a tiny glyph).
  Charts have no free-text label or angle mark: a shaded wedge in `areas` with a `label` marks an angle, as `cma.mc.bep` does.
* **Sub-parts on their own lines.** In a "Required:" list, separate (i), (ii), (iii) with blank lines (or use a `1.` list), or they run
  together into one paragraph.
* **Definitions where they are first needed.** A `::: definition` may sit in any section, at the point the term is first used (theory
  lessons need this); a numerical lesson keeps its ICAI definitions under Formats and formulas.
* **Highlights** (`==…==`): at most three per lesson, on the exact phrases examiners look for.
* **Links always carry a label**: `[[cma.mc.basics|contribution and the P/V ratio]]`; a bare `[[id]]` shows the raw id.
* **Cite the Study Material page** in parentheses after a definition, a list or a rule taken from it: `(SM 14.14)`; for another paper
  `(FM Study Material 6.8)`. Readers trust it, and reviewers check it.
* **Diagram types**: CA lessons need `plot`, `table`, `tree`, `flow`, `seq`, `layers`, `graph`, `nest`; ignore the old engine's `kmap`,
  `circuit`, `wave`, `bits`, `gantt`, `memory`, `er`, `shapes`.
* **Build errors that are not yours**: lab files under construction may briefly make `build.py --check` fail. Your files must have no
  errors or warnings; if the only errors are in `app/js/labs/*` or other people's lessons, carry on and re-check later.
