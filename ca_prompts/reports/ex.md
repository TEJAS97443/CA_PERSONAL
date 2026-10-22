# Report: job ex (the two exemplar lessons)

Both lessons are written, lint-clean, `build.py --check` clean for these two files, and previewed in light, dark and at phone width.

- `~/CA_PERSONAL/ca_passbook/content/subjects/cma/cma.mc.bep.md`
- `~/CA_PERSONAL/ca_passbook/content/subjects/aud/aud.report.sa705.md`

The global `build.py --check` keeps failing on lab files other agents are editing (`cvp.js`, `process.js`, now `capbud.js`). None of those failures is from these lessons.

## cma.mc.bep: Break-even point, margin of safety and angle of incidence (numerical)

- **Words:** 3,448 by the build's count (flashcards excluded), about 2,880 of prose (tables and quiz excluded). 30 minutes. 11 flashcards, 5 quiz questions (1 numerical, 1 case-style MCQ, 1 that catches the commonest mistake, 1 conceptual, 1 select-all).
- **Diagrams:** 4 plots.
  - The café break-even chart, fully marked: BEP, profit and loss areas, the angle-of-incidence wedge, a margin-of-safety arrow.
  - The samosa chart given plain above the fold, with its marked copy as the first block of the answer.
  - A close-up comparing the angle of incidence at two prices.
- **Worked examples:** 3, all at ICAI difficulty.
  - The chart example.
  - Two years' figures with a loss year and a price cut (the 4-mark pattern).
  - Capacity, a semi-variable cost, cash BEP and a step in fixed cost (the 7-mark May 2026 Q2(b) pattern).
- **Numbers:** every figure was computed by script in `$TMPDIR/ex_calc/cma2.py`.
- **Study Material used** (P4 = Paper 4, Cost and Management Accounting):
  - P4 Chapter 14, pages 14.11–14.31 (CVP assumptions, BEP, cash BEP, charts, MOS, the variations of the formula, angle of incidence), 14.37–14.38 (Illustration 11), 14.49 (summary) and 14.50–14.61 (Test Your Knowledge).
  - I rendered pages 14.20, 14.21, 14.28, 14.29 and 14.31 to PNG to read the formulas and charts.
  - FM Study Material (Paper 6A) 6.8–6.9, for operating leverage = 1 ÷ MOS ratio.
- **ICAI documents read: 13, with 15 questions.**
  - Past papers:
    - May 2024 Q5(b); I rendered the question-paper page to get its marks.
    - January 2025 Q1(a).
    - September 2025 MCQs 6–10 and the answer key.
    - January 2026 MCQ 4.
    - May 2026 MCQ 15, Q2(b) and Q5(b).
  - RTPs: May 2024 Q11, January 2025 MCQ 7, September 2025 MCQ 6.
  - MTPs:
    - Series I for September 2024 (MCQs 6–10), September 2025 (Q1(c) with answer) and September 2026 (Q1(c) with answer).
    - Series II for January 2026 (MCQs 1–4) and May 2026 (MCQs 9–11).
- **Doubts:**
  - "Cash BEP is never above the BEP" is my inference: non-cash fixed costs can only be zero or more.
  - In the "What moves the BEP" table, the P/V column is ICAI's (Illustration 9). The BEP, MOS and angle columns are my deductions from the formulas. In real geometry the angle also depends on the chart's scale; ICAI treats it as moving with the P/V ratio.
  - The rule for a step in fixed cost (measure the new BEP with the higher fixed cost) follows ICAI's suggested answer to May 2026 Q2(b).
  - Grossing up an after-tax target profit is general algebra; the Study Material does not state it. Its Illustration 11 only deducts tax afterwards.
  - The six CVP assumptions (SM 14.11–14.12) and the limitations (14.25) are condensed, not verbatim. The order and content are ICAI's. A reviewer should decide whether verbatim wording is wanted.
  - "The Study Material gives no formula for the angle" was checked in Chapter 14 only.
  - "Working notes should form part of the answer" is the instruction printed in the January 2025 Paper 4 suggested answers.

## aud.report.sa705: SA 705, qualified, adverse and disclaimer of opinion (theory)

- **Words:** 3,592 by the build's count, about 2,910 of prose. 30 minutes. 11 flashcards, 4 quiz questions (a case-style MCQ in the Part I format, the commonest mistake (disclaimer vs adverse), a conceptual question, a select-all on the scope-limitation steps).
- **Diagrams:** a tree (which modified opinion), and a flow of the management-imposed-limitation steps, plain in How it works with a marked copy (the path taken) inside the case answer. Both are kept at about 440–470 px wide so they fit a phone (see guide issue 4).
- **Worked examples:** 3.
  - A qualified opinion, with quantification in the Basis section.
  - A disclaimer through a scope limitation after acceptance, at ICAI difficulty, with every change to the report.
  - Bunty's three files: adverse under SA 570, disclaimer under SA 580, and unmodified with a "Material Uncertainty Related to Going Concern" section.
  - All three use ICAI's pattern: provision, facts, analysis, conclusion.
- **Answer frame:** the case pattern, a "distinguish qualified from adverse" table, and a three-rung answer ladder.
- **Links:** SA 700, SA 701, SA 706 and SA 210.
- **Study Material used** (P5 = Paper 5, Auditing and Ethics):
  - P5 Chapter 8, pages 8.4–8.9, 8.34–8.47 (all of SA 705), 8.59–8.60 (SA 710) and 8.83–8.100 (case study, summary, Test Your Knowledge).
  - Chapter 4, pages 4.71, 4.75, 4.83 and 4.91 (SA 501, 505, 510).
  - Chapter 7, pages 7.8 (SA 560), 7.22–7.23 (SA 570) and 7.37–7.39 (SA 580).
  - Chapter 11, page 11.21 (limitation before acceptance).
- **ICAI documents read: 13, with 13 questions.**
  - Past papers:
    - January 2025 Q3(c), plus MCQ 15 and Q6(b).
    - September 2024 MCQs 10–12 and the answer key.
    - January 2026 MCQ 11 and its key.
    - May 2026 MCQ 4 and its key.
    - The September 2026 question paper, MCQ 6 (its answers are not published yet).
  - RTPs: May 2024 Q19 (answer); September 2025 MCQ 7 and Q17.
  - MTPs:
    - Series I for January 2025 (Q2(b)) and January 2026 (Q6(a) with answer).
    - Series II for January 2026 (Q4(c)), May 2026 (Q5(a) with answer), September 2026 (Q5(c)) and September 2025 (MCQ 5 and key).
- **Doubts:**
  - The table says Key Audit Matters stay "where SA 701 applies" for qualified and adverse opinions. That is my inference: the Study Material only says a disclaimer has no KAM section unless law requires one.
  - The pervasive definition uses only its second sentence (the three limbs), in ICAI's words.
  - "Before any tax effect" in the Case 1 quantification is my addition.
  - The Study Material writes both "SA 705" and "SA 705 (Revised)". I followed it: "SA 705", and "SA 700 (Revised)".
  - The key to January 2025 MCQ 15 (A) looks odd: a going-concern basis that is not suitable is answered with a material-uncertainty section. I did not use that question.

## Where the guide is unclear, wrong or unsupported by the tooling (suggested fixes)

1. **§5 "Paper 4 has no MCQ section" is wrong.** New-scheme P4 has "Part I – Multiple Choice Questions": 15 MCQs × 2 marks = 30 marks, set as case scenarios of 5 MCQs plus standalone ones (September 2025 and May 2026 suggested answers, answer keys 1–15). **Fix:** say that P4, P5 and P6 all have a 30-mark MCQ part, and require a case-style MCQ in P4 quizzes too. §1's Practice row should name P4 as well.
2. **Word counts disagree.**
   - §1 says "1,200–2,800 words of prose (tables, formulas, diagrams and quiz excluded)". The build counts everything except diagrams and maths, including tables, quiz and definitions, against `sections.json` "words".
   - That range changed from [1000, 3400] to [900, 3600] while I was working.
   - A whole Standard written in ICAI's wording needs about 3,600 by the build's count (about 2,900 of prose).
   - **Fix:** state one measure, the build's, with its range (for example 2,000–3,600, "a whole Standard or method at the top"), and drop the prose-only number. Or make the build exclude tables and quiz.
3. **§4 still carries the GATE fork's diagram list** (kmap, circuit, wave, shapes, venn, er) and the line about scheduling, paging and automata. **Fix:** cut it to the CA types and point to the six CA examples.
4. **Trees and flows do not re-lay out on phones; the tooling cannot show it.**
   - Only gantt, plot, memory and layers re-lay out (`RELAYOUT` in `diagram.js`). Every other wide figure keeps a min-width of 70% of its natural width and scrolls sideways.
   - My first tree (690 px) and flow (734 px; the flow's default width is 560) would have scrolled on a 360 px phone.
   - `preview_lesson.py --width 400` cannot show this: Chrome headless will not go below about 500 px, so the shot just crops. The preview also never runs `GA.fit`, so it shows no phone re-layout of plots either.
   - **Fix:** a guide rule ("tree and flow: natural width ≤ 500 px; short labels with \n; flow `"w": 420`"). Plus a preview mode that renders each diagram as the phone would (`phone: true, w: 340` for plots, the 70% floor for others). My scratch script for this is `$TMPDIR/ex_phone/phone.js`.
5. **Plots lack a text label and an angle mark.**
   - To show the angle of incidence I used a narrow `areas` wedge labelled θ.
   - A double-headed margin-of-safety arrow needs a series with `"arrow": "both"`, which also puts it in the legend.
   - Explicit `yticks` numbers are not given Indian grouping (only automatic ticks are), so `[value, "1,80,000"]` pairs are needed.
   - **Fix:** add `labels: [{x, y, text}]` and an angle-arc mark, and document the ticks point in the guide.
6. **`"ylabel": "₹"` alone renders as a tiny rotated glyph.** **Fix:** tell writers to use "amount (₹)".
7. **A single newline is a space,** so ICAI-style "Required: (i)… (ii)…" lines on consecutive lines run into one paragraph. **Fix:** say in §3 to leave a blank line between sub-parts (or use a list), with an example.
8. **Where `::: definition` blocks go is unclear.**
   - §1 puts them under Formats and formulas, but How it works must also "introduce and define" the vocabulary.
   - The revision sheet picks up formula boxes from anywhere, but other facts only from Formats and formulas.
   - I put "pervasive" in How it works (it is needed there) and the cost definitions in Formats.
   - **Fix:** say "place a definition where it is first needed", and let `revise.js` collect `::: definition` boxes from anywhere, as it does formulas.
9. **"==highlight== for the one phrase examiners look for"** does not say whether that means one per lesson or one per idea. I used 1 in the numerical lesson and 2 in the theory lesson. **Fix:** say "1–3 per lesson".
10. **The ICAI answer pattern is stated more strictly than ICAI writes it.**
    - The guide gives "provision → facts → analysis → conclusion".
    - Some suggested answers go straight from provision to conclusion (January 2025 Q3(c)); some open with the facts (RTP May 2024 Q19).
    - I used explicit labels on full cases and a condensed provision → conclusion for short sub-parts.
    - **Fix:** call the labels PassBook's teaching convention, and allow the condensed form for sub-parts.
11. **The brief asks for 8 ICAI questions; guide §6 says at least 5.** **Fix:** use one number in both.
12. **Marks are often missing from question-paper text.** The scans are OCR'd and the marks column is often lost (May 2024 P4). **Fix:** tell writers to render the PDF page for marks.
13. **One broken lab file stops `build.py --check` for everyone** ("1 errors — data not written"); writers may think the error is theirs. **Fix:** a per-file check (`build.py --check <file.md>`), or label lab errors as "not your lesson".
14. **Quoted titles behave differently in different tools.** `build.py` strips quotes around a front-matter title; `render_lesson_html.js` does not, so the preview shows the quotes. A colon in a title needs no quotes. **Fix:** say "no quotes" in §3.
15. **An unlabelled `[[id]]` link shows the raw id** ("cma.mc.multiproduct") in the text. **Fix:** require `[[id|label]]` in prose.
16. **A display formula with a top-level `\qquad` is always split into rows**, even on desktop. That is harmless, but the guide should say so, so writers use `\qquad` only between the parts of a formula.
