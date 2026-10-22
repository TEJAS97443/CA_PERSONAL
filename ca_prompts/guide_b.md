
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

