# src-sm report: ICAI study material for CA Inter Group II (January 2027)

## What I downloaded (all 90 PDFs fetched OK; first pages of each checked)

**Primary set (the one for January 2027).** These PDFs are in `~/CA_PERSONAL/ca_sources/sm/<paper>/pdf/`, and all `txt/` files and `toc.json` are built from them.
- Edition printed in every module's initial pages: "Edition : July, 2024 / Reprint : August, 2025". The cover says "Relevant for May, 2026 Examination".
- ICAI's notice of 16 Sep 2026 lists exactly this edition for January 2027: "July, 2024 (Reprint August, 2025 and onwards) + RTP for January 2027". This holds for P4, P5, P6A and P6B.

| paper | chapters (PDF files) | pages | other files |
|---|---|---|---|
| P4 Cost & Management Accounting | Ch 1-15 (15 PDFs) | 961 (printed 1.1-15.98) | 2 initial-pages PDFs (40 pp) |
| P5 Auditing & Ethics | Ch 1-11 (11 PDFs) | 846 | 2 initial-pages PDFs (38 pp) |
| P6A Financial Management | Ch 1-8, plus Ch 9 as 6 unit PDFs | 688 (Ch 9 = 9.1-9.156) | 2 initial-pages PDFs (33 pp), 2 appendices of PV/annuity tables (16 pp) |
| P6B Strategic Management | Ch 1-5 (5 PDFs) | 297 | initial pages (12 pp) |

**Newer set, kept for reference only.** The July 2026 edition ("Relevant for May, 2027 and onward Examinations") is in `pdf/may2027-edition/` for P4, P5 and P6B; ICAI has not posted a P6A one yet.
- ICAI says it is not for January 2027, so I did not extract it to text.
- The per-chapter differences are in `sm/<paper>/_edition_diff_may2027.json`. P5 is heavily reorganised (Ch 3, 4 and 11). Both editions still teach SQC 1 and SA 220, not SQM 1/2.

**Complete.** Every chapter in the syllabus (`~/CA_PERSONAL/ca-firm-notes/spec/syllabus-group2.md`) is present. Every syllabus topic I spot-checked appears in the text, e.g. GeM, Digital Costing, P2P lending, Banking norms, Digital Audit, SA 610, GE Matrix, Mendelow.

**Missing:** nothing from the study material. Not yet published by ICAI: the RTP for January 2027, and a P6A July 2026 edition (not needed).

## Text extraction and its quality problems

**Output.** One file per chapter: `txt/NN-slug.txt`, with P6A Ch 9 as `-u1`…`-u6` plus a combined file. Initial pages are `00-*.txt` and FM appendices are `90-*.txt`.
- Page markers look like `=== p.N [X.Y] ===`: N is the page in that chapter's PDF, X.Y is ICAI's printed page number.
- Running heads and footers are removed.

**I used poppler `pdftotext -layout` instead of PyMuPDF `get_text("text")`.** These ICAI PDFs often have no space glyphs, so PyMuPDF puts each word of a justified line on its own line and scrambles every table. The layout pass keeps tables, stores ledgers and stacked fractions readable. I checked against rendered pages: P4 ch2 pp.32/94, P6A ch3 p.10, ch9-u5 p.2, P5 ch3 p.61.

Clean-up applied to all text:
- Symbol/Wingdings private-use characters converted (bullets to "-", × ÷ ∴ Δ, big-bracket pieces). None are left.
- The Rupee-font backtick converted to ₹ (one real opening quote kept).
- fi/ff ligatures expanded.
- A "Checkbox" icon alt-text removed (P5).

**I OCR'd every chapter page (2,792 pages) with Apple Vision and compared it with the text layer.** Findings:
- **48 pages have figure or image text that is missing from the PDF text layer.** P4: 12 pages, P5: 24, P6A: 9, P6B: 3.
  - Examples: P5 Ch 3 p.61, where §10 "Audit approach in an automated environment" is entirely an image; the P6B value chain and PLC charts; the P6A ch9-u4 export-credit chart.
  - For these I appended the OCR as blocks marked `[OCR-SUPPLEMENT …] … [/OCR-SUPPLEMENT]` at the end of the page. The pages are listed in `ocr_supplement_pages` in toc.json.
  - P5 Ch 10 p.39 is a bilingual bank profit-and-loss format. The English OCR is fine; the Hindi comes out as garbage.
- **7 broken words fixed** (listed in `_tools/text_fixes.json` and in `text_fixes` in toc.json):
  - P6B 2.2 heading "STRA GIC" → "STRATEGIC": the "TE" glyphs have no text.
  - "Liabilitie s" and "Pr ice" in P6A.
  - "Contributi on" ×3 and "inven tory" in P4.
- **ICAI's own typos are left as printed**, e.g. "Decomgrpahic/Teachnological" (P6B p.2.3) and the heading "5.4 ORGRANISATIONAL FRAMEWORK".
- **Equations need the PDF page.** MathType equations come out as stacked layout text; check the rendered page for these. They are listed in `formula_pages`: P4 108 pages, P6A 164, P5 4, P6B 0.
- **No scanned pages.** Every low-text page is either blank or has an OCR supplement.

## toc.json

There is one per paper. All four are validated: every txt/pdf path exists and all pages are in range.
- `~/CA_PERSONAL/ca_sources/sm/p4/toc.json` (15 chapters, 494 headings)
- `~/CA_PERSONAL/ca_sources/sm/p5/toc.json` (11 chapters, 639 headings)
- `~/CA_PERSONAL/ca_sources/sm/p6a/toc.json` (9 chapters, Ch 9 with 6 units; 347 headings)
- `~/CA_PERSONAL/ca_sources/sm/p6b/toc.json` (5 chapters, 143 headings)

**Fields.** Each chapter has `ch, title, module, pdf, pages[1,N], printed["X.1","X.N"], txt, units[], headings[], headings_detail[{h, level, page, printed, numbered}], formula_pages, ocr_supplement_pages, text_fixes`.
- P6A Ch 9 has `pdf`/`pages` set to null; the page data is in its units.

**Where headings come from.** They are taken from fonts (bold, numbered), then cross-checked against ICAI's printed "Detailed Contents" in the initial pages (results in `_contents_check.json`).
- All 1,081 numbered entries in ICAI's printed contents match a detected heading by number except 4: two were added by text search, and the other two are ICAI numbering typos ("11" for "15.11"; "4.2.12" for "4.2.1.2").
- Detection also picks up extra sub-headings that the contents omit (e.g. P5 2.6A-C, 3.9.1A, 17A-F).
- The PDF bookmarks are leftovers from old builds with broken page references, so I did not use them.

## Applicability summary (verbatim quotes and URLs are in ~/CA_PERSONAL/ca_sources/APPLICABILITY.md)

**Which material applies for January 2027.** BoS notice id 606, posted 16 Sep 2026 (`boslive.icai.org/assets/BOS_Study_Material_applicable_for_Foundation_and_Intermediate_Course_Jan2027Exam.pdf`): P4, P5, P6A and P6B use "July, 2024 (Reprint August, 2025 and onwards) + RTP for January 2027". The September 2026 notice says the same.

**No January 2027 or September 2026 "Applicability of Standards/Guidance Notes/Legislative Amendments" notice exists.**
- The newest is the May 2026 one (id 576), and like the May 2024 and May 2025 Intermediate notices it covers only Inter P2 and P3. It says nothing for P4, P5 or P6.
- No Study Guidelines or exclusions have been issued for P4, P5, P6A or P6B; the only Intermediate guidelines are for P3B GST.
- There is no Statutory Update or Amendments document for P5.

**Paper 5.**
- The syllabus names SA 200, 210, 220, 230, 260, 265, 300, 315, 320, 330, 450, 500, 501, 505, 510, 520, 530, 550, 560, 570, 580, 610, 700, 701, 705, 706, 710 and SQC 1.
- The applicable study material teaches SQC 1 and SA 220, not SQM, and covers CARO 2020 in Ch 8.
- **ICAI has published no Companies Act / CARO cut-off date for Inter P5.**
- The nearest official text is Paper 2's "Amendments for January 2027" (company law, 1 May 2025 – 30 Jun 2026; the study material is updated to 31 Jul 2025). Two items in it touch P5:
  - the small-company limits rise to ₹10 crore paid-up capital / ₹100 crore turnover (G.S.R 880(E), 1 Dec 2025);
  - the fraud report must be filed electronically in Form ADT-4 (G.S.R 359(E), effective 14 Jul 2025).

  These are flagged as context only.

**Exam dates are confirmed** (Exam announcement of 23 Sep 2026): Group II on 8, 10 and 12 Jan 2027, 2–5 PM.

## RTP for January 2027

**Not published as of 2026-10-20.**
- The icai.org listing (`https://www.icai.org/post/rtp-intermediate-course`) and the BoS list (`https://boslive.icai.org/education_content_rtp.php?c=Intermediate`) both stop at September 2026.
- The January 2027 query returns nothing, and `…/post/rtp-intermediate-course-jan2027` returns 404.

The latest RTPs (September 2026):
- P4: `https://resource.cdn.icai.org/92945rtp-int-sep2026-4.pdf`
- P5: `…/92946rtp-int-sep2026-5.pdf`
- P6: `…/93044rtp-int-sep2026-6.pdf`
- Group II: `…/93085rtp-int-sep2026-g2.pdf`

MTPs for January 2027 (notice id 610): Series I runs from 19 Nov 2026 (P4 on 25 Nov, P5 on 27 Nov, P6 on 30 Nov) and Series II from 3 Dec 2026 (P4 on 9 Dec, P5 on 11 Dec, P6 on 14 Dec). Neither is released yet.

## Other files

- `~/CA_PERSONAL/ca_sources/SOURCES.md` has 100 rows: paper, title, edition, URL, date fetched, size, sha256, pages, local path.
- `~/CA_PERSONAL/ca_sources/APPLICABILITY.md`
- The applicability PDFs and HTML evidence are in `~/CA_PERSONAL/ca_sources/sm/_applicability/`.
- Scripts are in `~/CA_PERSONAL/ca_sources/_tools/`; `run_all.sh` rebuilds everything, and `--ocr` re-runs the OCR pass (about 20 min).
- QA data per paper: `_ocr_qa.json`, `_ocr_supplement.json`, `_contents_check.json`, `_extract_log.json`.
