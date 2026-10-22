# SPEC — CA Intermediate Strategic Management Question Bank (2018 → 2026)

Single source of truth. Every agent and script MUST follow this exactly.

Output: a chapter-wise PDF of **every** ICAI RTP + MTP + PYQ question for Strategic Management
from 2018 to date, each with ICAI's **full verbatim suggested answer**.

---

## 1. Hard rules

1. **Never invent a question or an answer.** Every record must come from a real ICAI PDF.
   If text is unreadable, set `"extract_ok": false` and leave the field empty. A missing
   question is acceptable; a fabricated one is not.
2. **Verbatim.** Question and answer text are copied from the PDF. Fix only extraction
   artefacts: de-hyphenate line breaks (`plant -based` → `plant-based`), collapse runs of
   spaces, join wrapped lines, strip page headers/footers and page numbers.
3. **SM only.** These PDFs cover two subjects. Extract only the Strategic Management part:
   - New scheme (May 2024 →): Paper 6, **Section B / Paper 6B: Strategic Management**
     (Section A / 6A is Financial Management — skip it).
   - Old scheme (2018 → Nov 2023): Paper 7, **Section B: Strategic Management**
     (Section A is Enterprise Information Systems / Information Technology — skip it).
4. **Record the source precisely.** A student must be able to find the question in the
   original ICAI PDF from the citation alone.
5. **Preserve ICAI's own chapter headings** where the PDF has them. Only infer a chapter
   when the PDF gives none (see §4).

## 2. The five chapters (current syllabus, 2023 scheme)

Confirmed from ICAI's own RTP headings. These are the ONLY chapter buckets in the output.

| # | Chapter |
|---|---|
| 1 | Introduction to Strategic Management |
| 2 | Strategic Analysis: External Environment |
| 3 | Strategic Analysis: Internal Environment |
| 4 | Strategic Choices |
| 5 | Strategy Implementation and Evaluation |

Plus two non-chapter buckets:
- `MCQ` — integrated/standalone case-scenario MCQs that ICAI does not tag to a chapter.
  Keep the chapter tag if ICAI gives one; otherwise bucket here.
- `OUT_OF_SYLLABUS` — old-scheme questions on topics dropped from the 2023 syllabus (§5).

## 3. Attempts to cover

**Old scheme — Paper 7B (EIS/IT & SM), 13 attempts.** `scheme: "old"`
May 2018 · Nov 2018 · May 2019 · Nov 2019 · May 2020 (exam cancelled, RTP/MTP exist) ·
Nov 2020 · Jan 2021 · July 2021 · Dec 2021 · May 2022 · Nov 2022 · May 2023 · Nov 2023

**New scheme — Paper 6B (FM & SM), 8 attempts.** `scheme: "new"`
May 2024 · Sep 2024 · Jan 2025 · May 2025 · Sep 2025 · Jan 2026 · May 2026 · Sep 2026

For each attempt collect, where published:
- **RTP** — 1 per attempt
- **MTP** — Series I and Series II (question paper + suggested answers)
- **PYQ** — the exam question paper + ICAI Suggested Answers
  (Sep 2026 answers may not be published yet — that is expected, record what exists.)

## 4. Chapter assignment

- **New scheme:** ICAI prints `Chapter N - <name>` headings inside the SM section. Use them
  verbatim. `chapter_source: "icai"`.
- **Old scheme:** there are no new-scheme headings. Map each question to the best-fitting
  chapter 1–5 by its subject matter and set `chapter_source: "mapped"`. Record a short
  `mapping_note` naming the concept you mapped on (e.g. "Porter's five forces → Ch 2").
  If the topic is no longer in the syllabus, use `OUT_OF_SYLLABUS` and say why.

Old-scheme → new-chapter guide (not exhaustive; judge by content):

| Old-scheme topic | New chapter |
|---|---|
| Meaning/vision/mission/objectives, strategic levels, limitations of strategic mgmt | 1 |
| PESTLE, internationalisation, product life cycle, **value chain**, Porter's five forces, experience curve, customers & markets, competitive landscape, key factors for competitive success | 2 |
| Stakeholders & Mendelow's matrix, **strategic group mapping**, strategic drivers, strategic marketing techniques, core competence, SWOT, **Porter's generic strategies** (cost leadership, differentiation, focus, best-cost provider) | 3 |
| Stability / expansion / retrenchment / combination strategies, intensification & diversification, integration, M&A, strategic alliances, turnaround, divestment, liquidation, **Ansoff, ADL, BCG and GE matrices** | 4 |
| Strategic management process, formulation vs implementation, strategic change & digital transformation, McKinsey 7S, organisation structure, culture, strategic leadership, strategic control, performance measures | 5 |

> **Correction (verified against ICAI's 2023 study material and every new-scheme RTP):** the
> first version of this table placed value chain in Ch 3, Porter's generic strategies in Ch 4
> and the portfolio matrices in Ch 3. ICAI places them as shown above. Where ICAI prints a
> specific question inside a particular chapter of the study material, that placement wins
> over this table (e.g. the "StarTech Solutions" focused-differentiation case sits in Ch 4).

## 5. Out-of-syllabus flagging (old scheme only)

Flag with `OUT_OF_SYLLABUS` only when the topic is genuinely **absent** from the 2023
syllabus. Verify against ICAI's current SM study material contents before flagging; when
in doubt, map it to the nearest chapter and leave a `mapping_note` instead. Do NOT flag a
topic merely because the wording changed.

Known-dropped / heavily-reduced old-scheme areas to check: Business Process Reengineering,
Six Sigma, detailed benchmarking, Total Quality Management, and the old standalone
"Formulation of Functional Strategy" treatment of marketing/finance/HR/production strategy.
**Confirm each against the current study material — do not assume.**

## 6. Record schema

One JSON file per source PDF in `data/`, named `<type>-<attempt-slug>[-<series>].json`
(e.g. `rtp-may2026.json`, `mtp-sep2025-s1.json`, `pyq-nov2022.json`).

```json
{
  "source": {
    "type": "RTP|MTP|PYQ",
    "attempt": "May 2026",
    "attempt_sort": "2026-05",
    "series": "I|II|null",
    "scheme": "new|old",
    "paper": "Paper 6B: Strategic Management",
    "pdf_url": "https://resource.cdn.icai.org/....pdf",
    "local_file": "raw/rtp-may2026-p6.pdf",
    "retrieved": "2026-10-05",
    "extract_ok": true,
    "notes": ""
  },
  "questions": [
    {
      "id": "rtp-may2026-q7",
      "chapter": 1,
      "chapter_source": "icai",
      "mapping_note": "",
      "qno": "7",
      "kind": "descriptive|mcq|case-mcq",
      "marks": null,
      "question": "Ms. Kavya has been appointed as the CEO of ...",
      "options": null,
      "answer": "A vision statement for NutriPure could be ...",
      "mcq_answer": null,
      "topic_tags": ["vision", "mission"]
    }
  ]
}
```

Field notes:
- `marks` — integer if the paper states it, else `null`. Never guess.
- `options` — for MCQs, an array of `{"label": "a", "text": "..."}`; else `null`.
- `mcq_answer` — the correct option label for MCQs when ICAI publishes it, else `null`.
- `topic_tags` — 1–4 lowercase keywords, for the topic index.
- `kind` — `case-mcq` for MCQs attached to a shared case scenario. Put the shared scenario
  text at the start of the first question's `question` field and note it in later ones.

## 7. Directory layout

```
~/CA_PERSONAL/sm-qbank/
  SPEC.md          this file
  raw/             downloaded ICAI PDFs (never edited)
  data/            extracted JSON, one file per source PDF
  manifest.json    every source: url, type, attempt, status
  syllabus.json    current 5-chapter topic list, from ICAI study material
  build.py         JSON -> HTML
  assets/          styles.css
  site/            generated HTML
  CA-Inter-SM-QuestionBank.pdf   final output
```

## 8. Quality checks before the build

- Every `data/*.json` parses and matches the schema.
- No question text shorter than 25 characters (extraction failure).
- No answer text that merely repeats the question.
- Every `chapter` is 1–5, `MCQ` or `OUT_OF_SYLLABUS`.
- `manifest.json` lists every attempt in §3 with a status, including `not_published`.
- Report counts per chapter, per attempt and per source type.
