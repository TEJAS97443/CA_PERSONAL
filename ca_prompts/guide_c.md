
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
conceptual, one **case-style MCQ** in the way ICAI writes the 30-mark MCQ section of Papers 5 and 6 (a short scenario with the cast, then
"Which of the following is correct?" with four options, like "(a) Qualified opinion (b) Adverse opinion (c) Disclaimer of opinion
(d) Unmodified opinion with an Emphasis of Matter paragraph"), and one that catches the commonest mistake. Four options, plausible
distractors. Every answer verified (by hand *and* by script when numerical). Paper 4 has no MCQ section, but MCQs still help recall.

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
