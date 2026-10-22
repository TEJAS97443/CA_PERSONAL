# STYLE GUIDE — "The Firm" (CA Inter Group II short notes)

You are writing **short revision notes** for ICAI CA Intermediate **Group II**, delivered as a
lightly narrative notes site set in an articleship. The reader is a CA Inter student who has
already read the ICAI Study Material at least once and is now revising, with an exam in weeks.

`spec/syllabus-group2.md` is the **scope authority**. It is a faithful transcription of ICAI's
own syllabus PDFs (kept in `syllabus-pdfs/`). A topic not in that file does not belong in these
notes. A topic in it must appear, even in one line.

## The five rules that matter most

1. **Short means short.** Target **900–1,600 words per unit file**. These are notes, not a
   textbook. If a paragraph would not help someone at 11 p.m. two days before the exam, cut it.
2. **Never invent a specific.** Do not state a section number, Standard on Auditing number,
   rate, threshold, date or limit unless it appears in `spec/syllabus-group2.md`. Paper 5 lists
   exactly which SAs are examinable — use those and no others. If you need a specific the
   syllabus does not give you, write the concept without the number and add a verify line.
3. **Flag anything that moves.** ICAI resets inclusions and exclusions every year through
   Study Guidelines, and replaces Standards and legislation on notified dates. Where a fact is
   version-sensitive, add a blockquote line:
   `> **Verify:** ... against the Study Guidelines / current Study Material for your attempt.`
   Use it deliberately and sparingly, on the things that genuinely change.
4. **Every number must be arithmetically checked.** For any worked problem, verify the
   arithmetic before you write it — run it (`python3 -c "..."`) rather than trusting mental
   maths. A short note with a wrong total is worse than no note.
5. **Formats are marks.** In Paper 4, the cost sheet, reconciliation statement and variance
   layouts earn marks by their structure. In Paper 5, the mark is in the Standard's own
   vocabulary. Show the format or the terminology exactly and tell the reader to reproduce it
   from memory.

## Register

Compressed and direct. Short sentences. No warm-up, no "in this chapter", no motivational
padding, no closing summary that repeats what you just wrote. Prefer a table for anything
comparative, a list for anything enumerable, and prose only where causation or judgement is
being explained.

Write in complete sentences even when terse — this is a revision aid, not a slide deck, and
fragments do not survive being reread under pressure. British-neutral spelling. Indian
currency conventions where amounts appear: `₹` with lakh/crore where natural.

## The narrative frame — keep it very light

The reader is an article assistant rotating through four desks. Three voices, used sparingly:

- **@P — the Principal.** The signing partner. Terse, demanding, asks the question an examiner
  would ask. Never explains at length.
- **@Y — You.** The article assistant. Gets things slightly wrong in a way the reader would.
- **@N — Margin note.** The fourth wall: what the examiner is actually testing, where marks are
  won and lost.

**Budget: one `:::scene` in the first file of a desk only, and at most two short `:::dialogue`
blocks per file.** If a file has none, that is fine. The notes are the product; the frame is
seasoning. Never let a scene or dialogue carry a fact the reader needs — facts go in prose,
tables, formulas and formats.

## Markdown conventions (build.js parses these — follow EXACTLY)

Standard markdown works: `##`/`###`/`####` headings, paragraphs, `**bold**`, `*italic*`,
`` `code` ``, `-` and `1.` lists, tables, `---`, `>` blockquotes, fenced code blocks.

Block directives: each opener and each closing `:::` alone on its own line. They never nest
(fenced blocks inside them are fine). Directives with labelled rows use `@key:` markers; a row
runs on until the next `@key:` or the closing `:::`.

**Every file must open with a `##` heading** naming the unit, and should use `###` for the
topics inside it. The sidebar builds its sub-navigation from the `##` headings.

### `:::formula` — a formula worth memorising

    :::formula Economic Order Quantity
    @what: The order size that minimises the total of ordering cost and carrying cost.
    @formula: EOQ = sqrt( (2 x A x O) / C )
    @terms: A = annual consumption in units. O = ordering cost per order.
    C = carrying cost per unit per annum.
    @watch: C is per unit per year. If the question gives carrying cost as a percentage of
    unit price, convert it first — this is the single most common slip on this formula.
    :::

`@formula:` is required. Write formulas in plain text, not LaTeX. Use `sqrt(...)`, `x` for
multiply and `/` for divide so they survive in a monospace row.

### `:::estimate` — a worked problem, solution sealed

    :::estimate Contribution and break-even
    @given: Selling price ₹200 per unit, variable cost ₹120 per unit, fixed cost ₹4,00,000.
    @ask: Compute the contribution per unit, P/V ratio and break-even point in units and value.
    @work: Contribution = 200 - 120 = ₹80 per unit. P/V ratio = 80/200 = 40%...
    @sanity: At 5,000 units, contribution is 5,000 x 80 = ₹4,00,000, exactly fixed cost...
    :::

`@given:` and `@ask:` render open; `@work:` and `@sanity:` render **sealed**. This is the
primary teaching device — **at least one per file**, and more in Paper 4 and Paper 6A. Show the
full working, line by line, the way it should appear in an answer book.

### `:::attempt` — the reader writes before the notes answer

    :::attempt State the five threats to auditor independence, with one example each.
    A full-mark answer names all five and gives a concrete example...
    :::

Opener is the task; body is the model answer, sealed until the reader types. Use for anything
the reader must be able to produce on blank paper. **At least one per file.**

### `:::think` — one-step recall, gated

    :::think Why is abnormal loss valued at full cost while normal loss is not?
    Because normal loss is an expected cost of the process...
    :::

### `:::key` — the one line to carry into the hall

At most two per file.

### `:::trap` — where marks are actually lost

    :::trap Treating overtime premium as a direct cost by default
    ...
    :::

### `:::ladder` — answer quality, three tiers

    :::ladder Explain the auditor's responsibility regarding going concern.
    @weak: The auditor checks if the company will survive.
    @good: ...
    @great: ...
    :::

Tiers render as "Would lose marks / Passing / Full marks". Use where *how* you write the answer
decides the mark — which in Paper 5 and Paper 6B is most of the time.

### `:::incident` — a case study, answer sealed

    :::incident The stock count nobody attended
    @symptom: Inventory is 40% of total assets. The client counted on 31 March...
    @signal: ...
    @ask: What is the auditor's position, and what does the report say?
    @diagnosis: ...
    :::

`@symptom:`, `@signal:` and `@ask:` open; `@diagnosis:` onward sealed. Excellent for Paper 5.

### `:::transfer` — where else the same idea is examined

    :::transfer Contribution per limiting factor
    @to: Paper 6A uses the same ranking logic for capital rationing...
    @stops: Capital rationing ranks by NPV per rupee of scarce capital over a project's whole
    life, so the arithmetic is discounted; the marginal costing version is not.
    :::

`@stops:` is mandatory. At most two `@to:` rows. Use these to tie the four papers together —
they are examined separately but they overlap, and pointing that out saves the reader effort.

### `:::scene` and `:::dialogue`

`:::scene` needs a mandatory `@a11y:` row restating anything carried by colour or mood. Rows
`@env:`, `@cast:`, `@cam:`, `@light:`, `@beat:`, `@face:` are optional.

### `:::checkpoint` — end of the desk

The final file of each desk closes with one: the formats to be able to reproduce from memory,
the formulas, the topics most often examined, the traps, and what to verify against the Study
Guidelines. This renders as "Revision checklist".

### Fenced blocks

| Fence | Use |
|---|---|
| ```` ```text ```` | Pro-formas, cost sheets, reconciliation statements, report extracts, formula sheets |
| ```` ```board ```` | A diagram or matrix drawn in ASCII (BCG, Ansoff, Mendelow) |
| ```` ```arch ```` | A process or flow, ASCII, max 92 columns |

Pro-formas belong in a ```` ```text ```` fence with aligned rupee columns, so the reader can
copy the layout by eye. Example shape:

    ```text
    COST SHEET for the period ...                         ₹            ₹
      Opening stock of raw material                   10,000
      Add: Purchases                                  50,000
      Less: Closing stock of raw material              8,000
    Raw material consumed                                          52,000
    Direct wages                                                   20,000
    Direct expenses                                                 3,000
    PRIME COST                                                     75,000
    ```

## File contract

Open with the assigned `##` heading. No preamble. Cover every syllabus sub-topic assigned to
your file — briefly is fine, silently omitting is not. Do not write another file's content;
name it in a clause and trust it exists.

Do not claim these notes are complete or a substitute for ICAI material. Where the syllabus
itself says a list is illustrative — as it does for the audit of items of financial statements —
say so.
