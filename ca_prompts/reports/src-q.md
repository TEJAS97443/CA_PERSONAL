# src-q report: ICAI question documents for PassBook (CA Inter Group II)

Done 2026-10-20. All files: `~/CA_PERSONAL/ca_sources/q/<scheme>/<paper>/<kind>-<attempt>[-s1|-s2]-<q|a|qa>.pdf` with a `.txt` beside each one. Every file has an entry in `~/CA_PERSONAL/ca_sources/q/manifest.json`: 335 entries, each with url, source, sha256, pages, text mode and notes. The full coverage table with numbered reasons is in `~/CA_PERSONAL/ca_sources/q/COVERAGE.md`. Tools are in `~/CA_PERSONAL/ca_sources/_tools/q/`, and caches and listing HTML are in `~/CA_PERSONAL/ca_sources/q/_scratch/`.

I opened every PDF to check its title page or running head (paper, attempt, series) before recording it. One file, P6 Sep 2026, needed a manual check: its receipt stamp OCRs as "12 SEP 2025", but it is the Sep 2026 paper.

## Coverage

**New scheme: 166 files, 3,650 pages.**
- 46 downloaded live from ICAI's CDN, 64 from the boslive API and 56 copied for P6.
- All 56 P6 files were copied from `~/CA_PERSONAL/sm-qbank/raw/` and re-downloaded from ICAI. Every one is byte-identical to the live copy.

| Attempt | PYQ question paper (scan) | PYQ suggested answers | RTP | MTP I q/a | MTP II q/a |
|---|---|---|---|---|---|
| May 2024 | Y, Part II only | Y, Part II only | Y | Y | Y |
| Sep 2024 – Jan 2026 (5 attempts) | Y, Part II only | Y, includes MCQs and answer key | Y | Y | Y |
| May 2026 | Y, Part I + II | Y | Y | Y | Y |
| Sep 2026 | Y, Part I + II | **not yet published** | Y | Y | Y |
| Jan 2027 | (own attempt) | – | **not yet published** | not yet out | not yet out |

This table holds for P4, P5 and P6 alike. Nothing is missing beyond the cells marked.

**Old scheme: 169 files, 3,286 pages, Nov 2019 – Nov 2023.**
- Papers: old P3 Cost, old P6 Audit, old P8 FM & Economics.
- Sources: 81 from ICAI live, 12 from boslive, 3 from the Wayback Machine, 23 from the cacult.com mirror, 50 from the castudynotes.com mirror.
- Mirrors were used only where ICAI's copy returns 404 and the Wayback Machine has no usable capture. Each one is recorded with the dead ICAI URL, the mirror URL and its listing page.

| Attempt | PYQ question paper | PYQ suggested answers | RTP | MTP I | MTP II |
|---|---|---|---|---|---|
| Nov 2019 | Y | Y (mirror) | P6 and P8 (mirror); **P3 missing** | Y (mirror) | none held |
| May 2020 | no exam | no exam | Y (mirror) | Y (mirror) | none held |
| Nov 2020 | Y | Y (mirror) | Y (mirror) | Y (mirror); **P8 answers missing** | none held |
| Jan 2021 | Y | Y (mirror) | none issued (Nov 2020 RTP used) | none issued | none issued |
| Jul 2021 | Y | Y (ICAI group-wise compilation) | Y (mirror; issued as "May 2021") | Y (mirror) | Y (mirror) |
| Dec 2021 | Y | Y | Y (mirror; issued as "Nov 2021") | P3, plus P6 questions, from Wayback; the rest mirror | Y (mirror) |
| May 2022 | Y | Y | Y | Y (mirror) | Y (mirror) |
| Nov 2022 – Nov 2023 | Y | Y | Y | Y | Y |

For old P8, the notes give the page where Section B (Economics) starts, so the FM part can be taken on its own.

## Gaps
1. **Sep 2026 Suggested Answers (P4, P5, P6) are not out yet.** `sugg-ans-inter-sep2026` returns 404 and ICAI's listing stops at May 2026. The Sep 2026 question scans do include the MCQs, so the questions are available, just without answers.
2. **May 2024 MCQs are not published anywhere by ICAI, neither questions nor answers.** They are not in the question-paper scan, the per-paper Suggested Answers, or the Group II compilation (`81508bos65715-gp2.pdf`, checked).
3. **Jan 2027 RTP is not published.** `rtp-intermediate-course-jan2027` returns 404 and there is no announcement. Rerun the RTP step when it appears.
4. **Jan 2027 MTPs are scheduled but not released.** ICAI's announcement of 14.10.2026 (`94616bos-sp6524-mtp-jan2027.pdf`) gives:
   - Series I: P4 on 25 Nov, P5 on 27 Nov, P6 on 30 Nov.
   - Series II: P4 on 9 Dec, P5 on 11 Dec, P6 on 14 Dec.

   The boslive series ids 76 and 77 already list these papers but have no files yet. Answers go up within 48 hours of each paper. Rerun `boslive_scan.py` and then `plan_new.py`, `fetch.py`, `extract_text.py` and `build_manifest.py`.
5. **Old scheme, two documents missing:**
   - P3 Nov 2019 RTP: ICAI's URL is 404 with no Wayback capture, and the cacult mirror has no Paper 3 for that attempt.
   - P8 Nov 2020 MTP answers: not on any mirror I found.

   castudyweb.com has some of these on Google Drive, but Drive downloads fail from this machine.
6. **Old P6 MCQs:** ICAI published only the 70-mark descriptive part (question paper and answers). The 30-mark MCQ booklet was never published.

## Text-quality problems
- **Question papers are image scans (51 files), OCR'd with Apple Vision in English.**
  - Most booklets are bilingual (English half, then Hindi half). The Hindi pages are kept as marked placeholders because Vision has no Hindi model.
  - The rupee sign often comes out as R, ?, <, * or a digit, and table columns flatten into lines.
  - Wherever a Suggested Answers file exists it reproduces the questions, so prefer its text. The question-paper OCR is only needed for Sep 2026 (and as a cross-check).
  - P4 Sep 2026 carries ICAI's own embedded OCR layer, which drops rupee signs and has Cyrillic look-alike letters. I did not use it.
- **Text-layer PDFs (284 files).** I used `get_text("text")` with font-aware repairs only, all counted in each manifest note:
  - backtick in ICAI's "Rupee" font → ₹ (27,441);
  - Symbol and Wingdings private-use bullets and maths glyphs → "-" or the Unicode symbol (4,607);
  - Cambria Math brackets and radicals that map to Ethiopic, Malayalam or Sinhala code points → ( ) √ (262);
  - ligatures expanded (3,641).

  Two glyphs (MT-Extra U+F056 in new/p6/mtp-may2025-s1-a) are left unmapped. I found no split words.
- **Layout limits of `get_text`:** equation-editor fractions flatten (for example, EOQ formulas read "2AO C"), and tables come out one cell per line, including the MCQ Answer Key tables.
- **castudynotes mirror files (50)** carry a diagonal watermark and two banner lines on every page. The 1,131 banner lines are removed from the `.txt` (whole-line matches only). The PDFs are kept as downloaded.

## Unusual things to know when building the bank
- **New-scheme Suggested Answers give MCQ answers only as an "Answer Key" table** (correct options, no workings) at the end of Part I. Two keys are irregular:
  - P4 May 2025 marks MCQs 3, 4 and 5 as "None".
  - P5 Jan 2025 gives MCQ 13 as "(B)/(C)".
- **P6 Suggested Answers mix the sections.** Part I puts the FM and SM case-study MCQs together under one key, then FM descriptive (Q1–4), then SM descriptive (Q5–8). Two exceptions:
  - Sep 2024 prints a separate Part I and key for each section.
  - May 2025 is two PDFs, saved as `pyq-may2025-a-6a.pdf` and `-a-6b.pdf`. The 6A file holds all 16 MCQs of both sections plus FM; the 6B file holds SM descriptive only.
- **P6 RTPs and MTPs keep FM and SM apart:** a 6A block, then a 6B block. Page ranges are in the notes.
- **The published question-paper scans include the Part I MCQs only from May 2026 onwards.** For Sep 2024 – Jan 2026 the MCQ wording exists only in the Suggested Answers.
- Some scans hold the English half only (for example P4 Jan 2025, P4 May 2026, P6 Sep 2026). P5 Sep 2025 and old P6 Jan 2021 were English-only booklets (8 and 4 printed pages).
- **boslive quirks:**
  - Series II sometimes has the lower id (Sep 2026 is 67 for Series II and 68 for Series I).
  - Jan 2025 P5 Series I's question and answer files share a timestamp.
  - ICAI typo: P4 Jan 2026 Series I prints "10 P.M. to 1 P.M.".
- **Old scheme:**
  - Jul 2021 answers exist only as ICAI's group-wise compilations: old P6 and P8 share one file, and the notes give each paper's page range.
  - ICAI's old per-paper RTP pages (post_id 14463, 14489, 14493) are still live for May 2022 – Nov 2023. ~/CA_PERSONAL/sm-qbank had concluded that no ICAI copies of the old RTPs existed.
  - Old P6 RTPs for Jul and Dec 2021 run to 144–145 pages because they include ICAI's "Academic Update" part.
