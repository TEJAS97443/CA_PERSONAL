# The Firm — CA Intermediate Group II, short notes

Revision notes for ICAI CA Intermediate **Group II**, delivered as a lightly narrative notes
site set in an articleship. Four desks, one per paper.

Open `index.html`.

| Desk | Paper | Marks |
|---|---|---|
| The Costing Desk | 4 — Cost and Management Accounting | 100 |
| The Audit Desk | 5 — Auditing and Ethics | 100 |
| The Treasury Desk | 6A — Financial Management | 50 |
| The Boardroom | 6B — Strategic Management | 50 |

Fifth volume in the same library as `../../LLD_PERSONAL/LLD_Site`, `../../LLD_PERSONAL/lld-interview-day`,
`../../HLD_PERSONAL/marketflow-novel` and `../../LLD_PERSONAL/concurrency-signalbox`. This one is ledger green on ink navy, and
the colour carries meaning: **green is the correct treatment, red ink is an exam trap, brass is
something to memorise, steel is a formula.**

## Read this before you rely on it

These notes are **not affiliated with ICAI** and are **not a substitute for the ICAI Study
Material**. Three limits are structural, not modesty:

1. **Study Guidelines decide the real scope.** ICAI states for every paper that the specific
   inclusions and exclusions in each topic are set every year by way of Study Guidelines. These
   notes cannot know your attempt's exclusions. Pull the Guidelines for your sitting and cross
   off what is out of scope.
2. **Standards and legislation move.** For Paper 5, ICAI states that where new legislation,
   Standards on Auditing, Guidance Notes or Statements replace existing ones, the syllabus picks
   up the new provisions from a date the Institute notifies. Anywhere a fact is version-sensitive
   the notes carry a `**Verify:**` line — CARO clauses, bank provisioning norms, IFC reporting
   requirements and banking norms of working capital finance are deliberately taught without
   numbers for exactly this reason.
3. **Notes are for keeping knowledge, not acquiring it.** Compression removes the worked detail
   that carries marks. Read the module first; come here to retain it.

## Scope is traced to source

`spec/syllabus-group2.md` is a faithful transcription of ICAI's own syllabus PDFs, downloaded
on **10 September 2026**. The PDFs themselves are kept in `syllabus-pdfs/` so any claim about
scope can be checked against the source rather than taken on trust.

Index page: `icai.org/post/syllabus-nset-intermediate`. A topic absent from the transcription is
absent from these notes by design.

## How the notes are built to be used

- **Answers are sealed.** Worked problems, model answers and case-study diagnoses sit behind a
  seal that opens once you have typed something. There is a "stuck" escape and using it is
  recorded next to your own notes. Reading a solution and producing one are different skills,
  and only one of them is examined.
- **Formats are treated as marks.** Cost sheets, reconciliation statements, process accounts,
  variance layouts and formula sheets appear as copyable pro-formas, because in Paper 4 the
  structure earns the mark and in Paper 5 the Standard's own vocabulary does.
- **Answer-quality ladders** show the same answer written three ways — one that loses marks, one
  that passes, one that gets full marks. Papers 5 and 6B are graded mostly on how the answer is
  written, so these matter more there than anywhere else.
- **The revision tracker** (`tracker.html`) lists all **149 examinable topics** in ICAI syllabus
  order against a four-level ladder: read, worked a sum, can write it cold, past-paper proven.
  State persists in `localStorage` on this machine. Downgrade a row the moment a past paper
  exposes a gap — that is the point of it.
- **Printing works.** A print stylesheet flips the site to ink-on-white, opens every sealed gate
  and drops the navigation, so a desk can be printed as a revision booklet.

## The pass mark

ICAI requires a **minimum of 40 marks in each paper** and **50% in the aggregate of the group** —
for Group II, 150 out of 300 with nothing below 40. The aggregate rule is why a strong Paper 4
can carry a shaky Paper 5, and why no paper can be written off.

## Layout

```
index.html                landing: what to read first, the four desks
desk-costing.html         Paper 4  — 4 units
desk-audit.html           Paper 5  — 11 units
desk-treasury.html        Paper 6A — 4 units
desk-boardroom.html       Paper 6B — 5 units
tracker.html              149-topic revision tracker, persisted locally
content/*.md              the source of every page — never edit the HTML
spec/syllabus-group2.md   ICAI syllabus transcription; the scope authority
spec/_style.md            voice, density rules and the markdown directive contract
syllabus-pdfs/*.pdf       ICAI's own syllabus PDFs, for verification
assets/                   style.css, app.js
```

## Rebuilding

Zero dependencies; Node 20 is enough.

```sh
node lint.js && node build.js
```

`lint.js` validates the directive dialect, fails on a malformed or unclosed block, and prints a
per-file inventory of gates. `build.js` regenerates every page from `content/*.md`. **Never edit
the generated HTML** — it is overwritten on every build.

## The cast

Three voices, used sparingly, because the notes are the product and the frame is seasoning.
The **Principal** signs the accounts and asks the question an examiner would ask. **You** are the
article assistant, and get things wrong in the way a reader would. The **margin note** breaks the
fourth wall to say what is actually being tested.
