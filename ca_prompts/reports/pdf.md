# pdf: phone-friendly PDFs of PassBook (report)

Done 2026-10-20. All 16 PDFs are in `~/CA_PERSONAL/ca_passbook/pdf/` (112 MB in total). They are built from the lesson files, so running the
tool again brings them back in line with the lessons. No lesson or app code was changed. The only new files are `tools/pdf/` and `pdf/`.

## Files

| Paper | Short Notes (phone) | Full Lessons (A4) | Full Lessons (phone) | Revision Cards (phone) |
|---|---|---|---|---|
| Paper 4 Cost and Management Accounting (66 lessons) | 505 p, 3.8 MB | 1,008 p, 16.8 MB | 2,264 p, 18.6 MB | 182 p, 2.2 MB, 711 cards |
| Paper 5 Auditing and Ethics (62) | 348 p, 2.5 MB | 923 p, 13.9 MB | 2,174 p, 15.7 MB | 209 p, 2.3 MB, 695 cards |
| Paper 6A Financial Management (32) | 238 p, 2.0 MB | 513 p, 9.2 MB | 1,123 p, 9.8 MB | 98 p, 1.3 MB, 363 cards |
| Paper 6B Strategic Management (21) | 104 p, 1.0 MB | 309 p, 5.8 MB | 718 p, 6.5 MB | 66 p, 0.9 MB, 243 cards |

The file names follow the pattern `Paper 4 Cost and Management Accounting - Short Notes.pdf`, `... - Full Lessons (A4).pdf`,
`... - Full Lessons (phone).pdf` and `... - Revision Cards.pdf`.

- **Phone page:** 110 x 196 mm, light theme, laid out like the app on a phone (body text about 10 pt).
- **A4:** 210 x 297 mm.
- **Every PDF has:**
  - a cover;
  - a contents page listing each chapter and its lessons, with page numbers and tappable links;
  - "page / total" numbers in the footer;
  - bookmarks: chapter, then lesson (the Full Lessons add one level for each lesson section);
  - tags (accessible structure).
- **Short Notes:** for each lesson, in syllabus order:
  - the "In plain words" key idea box;
  - Formats and formulas;
  - the Answer frame;
  - Common mistakes, shown as title plus fix;
  - the Recap.
  - Diagrams are drawn by the app's own diagram kit, and each lesson that has labs gets the line "Interactive version: PassBook app, lesson <title>".
- **Full Lessons:**
  - every section except Under the hood;
  - worked-example answers shown open;
  - each lab replaced by the one-line note;
  - the self-check printed without its answers, with an answer key (option letter and text, plus the explanation) at the end of each lesson;
  - links between lessons jump inside the PDF.
- **Revision Cards:** every flashcard, chapter by chapter, question then answer. The card counts match the app's `data/cards` exactly.

## Regenerate

```
cd ~/CA_PERSONAL/ca_passbook && .venv/bin/python -I tools/pdf/make_pdfs.py
#   --papers cma,aud,fm,sm   --kinds notes,full-a4,full-phone,cards   --keep   --par 3
```

- A full run takes 6 to 10 minutes on this loaded machine and needs about 0.6 GB of scratch space.
- It exits with status 1 if any check fails.

## How it works

The tool lives in `tools/pdf/`:

- **`build_html.js`** builds one HTML file per PDF. It uses the app's `md.js` with KaTeX, the diagram kit and the app's stylesheets, plus `print.css`.
- **`fit.js`** runs inside the page before printing:
  - figures the kit can re-lay out are redrawn at the column's width;
  - prose tables on the phone page become row cards, as in the app;
  - other wide tables and formulas are zoomed down until they fit;
  - boxes that fit in 70% of a page are kept whole.
- **`print_pdf.js`** drives the system's headless Chrome over the DevTools pipe and prints with `Page.printToPDF`. Playwright was not needed: `~/nexora-automation` does not exist.
- **`make_pdfs.py`** prints twice:
  1. The first print's bookmarks give the page of each chapter and lesson.
  2. The second print writes those numbers into the contents. The number slot has a fixed width, so the layout cannot shift.
  - Then PyMuPDF cleans the bookmark titles, sets the metadata and saves with object streams (about 40% smaller than Chrome's file).
- Fonts and KaTeX come from `vendor/`. Nothing is fetched from the network.

## Checks

- **Automatic, on all 16 PDFs:**
  - every contents row's printed number equals its link target and the bookmark page;
  - no blank pages;
  - no text past the right margin;
  - 0 broken internal links out of 2,031;
  - no KaTeX errors, diagram errors or leftover placeholders in the HTML.
- **Looked at:** 38 pages rendered with `~/DSA_PERSONAL/gate_cse/.venv/bin/python -I`: the covers, contents pages, and a middle and the last page of every PDF, plus earlier spot checks of break-even charts, cost sheets, formulas and the answer keys.
  - Tables fit the phone page: they are zoomed (smallest 70 to 79%) or turned into cards, never cut off.
  - Formulas render.
  - Re-laid-out plots and flows are legible.
  - The contents are correct.

## Known limits

- **Gaps at the bottom of pages.** Every lesson starts on a new page, and diagrams, tables and short boxes are kept whole, so some pages end part-empty. The Full Lessons on the phone are long (700 to 2,264 pages): use them with the bookmarks and search.
- **Two figures are only scaled down.** The kit cannot re-lay out sequence diagrams or Venn diagrams, so these shrink:
  - the Venn diagram in cma.intro.relations, to 74%;
  - the sequence diagram in aud.bank.auditor, to 70%.
- **Small text in the widest tables.** A few kit table figures and 5- to 6-column tables print at about 5 to 6 pt on the phone page. They stay sharp vector text, so pinch to zoom.
- **Not printed:** labs (one line each instead), Under the hood (as the brief asks), and ICAI questions (the lessons contain no `::: pyq` blocks).
- **Short Notes contents** list the lessons under each chapter, not only the chapters.
- **Staying in sync needs a re-run.** The PDFs only reflect the lessons as of the last run; each cover shows the date it was made.
- **Python version for the checks.** I used the PyMuPDF in `~/DSA_PERSONAL/gate_cse/.venv` to render the check images, because the project's `.venv` (PyMuPDF 2.0) crashed once while rendering pages. The tool itself runs on the project's `.venv` without trouble.
- **Disk space.** The shared disk filled up during one run (only 2.4 GB were free at the time). The tool now deletes each intermediate PDF as soon as it has been read.
