---
id: aud.report.sa705
title: SA 705: qualified, adverse and disclaimer of opinion
minutes: 30
needs: aud.report.sa700, aud.risk.sa320
tags: SA 705, modified opinion, qualified opinion, adverse opinion, disclaimer of opinion, pervasive, scope limitation
labs: audit-opinion
summary: When the auditor must modify the opinion, how two questions (misstatement or missing evidence; pervasive or not) pick qualified, adverse or disclaimer, and how each changes the report.
---

## In plain words

### Two questions on Lakshmi's desk

Iyer & Associates are finishing the audit of Tapri Tea Co. Ltd. Most years their report says the financial statements give a true and fair view: the **unmodified opinion** of [[aud.report.sa700|SA 700]]. Not this year.

> **Kesar:** Lakshmi-ji, it is one small heap of old elaichi premix. Sign the report. Sab adjust ho jayega.
> **Lakshmi:** The evidence says ₹2.40 crore of that stock will never sell. If it stays at cost, my report will say so.
> **Bunty:** Ma'am, so the whole report is bad?
> **Lakshmi:** Two questions decide that, Bunty.

The first question is **what kind of problem** it is: the auditor has evidence that the accounts are wrong (a **misstatement**, like the elaichi stock), or could not get enough evidence to know (Kesar will not let anyone count the samosa stock).

The second is **how big**. A problem is **material** when it could change the decisions of people who rely on the accounts, and **pervasive** when it is not confined to one corner: it spreads across many items, or its one item is a large part of the accounts, or users cannot understand the accounts without it.

The answers give three **modified opinions**. Wrong but confined: **qualified** ("true and fair, except for…"). Wrong and pervasive: **adverse** ("not true and fair"). Unable to check, but confined: again qualified. Unable to check, and pervasive: a **disclaimer of opinion** ("I do not express an opinion").

::: analogy The second-hand car inspection
A mechanic inspecting a used car can report: fine; fine except for the brakes; not roadworthy; or the owner would not open the bonnet, so I can say nothing about the engine. Those are the unmodified, qualified, adverse and disclaimer opinions. The last does not say the engine is bad: it says nobody was allowed to look.
:::

::: key
Two things decide the modified opinion: the nature of the matter (misstatement, or no evidence) and whether its effects are pervasive. A disclaimer is not "the worst accounts": it is the opinion for pervasive missing evidence.
:::

## How it works

SA 705, "Modifications to the Opinion in the Independent Auditor's Report", deals with the report when the auditor, forming an opinion under SA 700 (Revised), concludes that a modification is necessary (SM 8.34). Its requirements, in the Study Material's order:

### 1. When the opinion must be modified

The auditor shall modify the opinion when:

- (a) the auditor concludes, based on the audit evidence obtained, that the financial statements as a whole are not free from material misstatement; or
- (b) the auditor is unable to obtain sufficient appropriate audit evidence to conclude that the financial statements as a whole are free from material misstatement.

### 2. The objective

The objective of the auditor is ==to express clearly an appropriately modified opinion== on the financial statements that is necessary in either of those circumstances (SM 8.35).

### 3. The three modified opinions

- **Qualified opinion**: (a) having obtained sufficient appropriate audit evidence, the auditor concludes that misstatements, individually or in the aggregate, are material, but not pervasive; or (b) the auditor is unable to obtain sufficient appropriate audit evidence on which to base the opinion, but concludes that the possible effects of undetected misstatements, if any, could be material but not pervasive.
- **Adverse opinion**: having obtained sufficient appropriate audit evidence, the auditor concludes that misstatements, individually or in the aggregate, are both material and pervasive.
- **Disclaimer of opinion**: the auditor is unable to obtain sufficient appropriate audit evidence on which to base the opinion and concludes that the possible effects of undetected misstatements, if any, could be both material and pervasive. Also, in extremely rare circumstances involving multiple uncertainties, when their potential interaction and possible cumulative effect make an opinion impossible even though evidence was obtained on each.

::: definition Pervasive
Pervasive effects on the financial statements are those that, in the auditor's judgment (SM 8.37):

- (i) are not confined to specific elements, accounts or items of the financial statements;
- (ii) if so confined, represent or could represent a substantial proportion of the financial statements; or
- (iii) in relation to disclosures, are fundamental to users' understanding of the financial statements.
:::

### 4. Which opinion: nature, then pervasiveness

The choice depends on (a) the nature of the matter, whether the financial statements are materially misstated or, when evidence cannot be obtained, may be materially misstated; and (b) the auditor's judgment about the pervasiveness of its effects or possible effects (SM 8.39–8.40).

::: diagram SA 705: which modified opinion?
{"type": "tree", "gapX": 48, "gapY": 104, "root": {"label": "The matter", "children": [{"label": "Materially\nmisstated", "children": [{"label": "Qualified", "edge": "not pervasive", "color": "d"}, {"label": "Adverse", "edge": "pervasive", "color": "bad"}]}, {"label": "Evidence not\nobtainable", "children": [{"label": "Qualified", "edge": "not pervasive", "color": "d"}, {"label": "Disclaimer", "edge": "pervasive", "color": "f"}]}]}, "caption": "Orange: qualified opinion (\"except for the effects\", or \"except for the possible effects\" when evidence is missing); rose: adverse; violet: disclaimer. Every branch assumes the matter is material: an immaterial matter needs no modification."}
:::

| Nature of the matter | Material but not pervasive | Material and pervasive |
|---|---|---|
| Financial statements are materially misstated | Qualified opinion | Adverse opinion |
| Inability to obtain sufficient appropriate audit evidence | Qualified opinion | Disclaimer of opinion |

::: lab audit-opinion {"mode":"case","case":"sm-loans"}
Step down the tree with Study Material Illustration 9: a misstatement that is material but not pervasive, so a qualified opinion.
:::

### 5. When management limits the audit after acceptance

If, after accepting the engagement, the auditor finds that management has imposed a limitation on the scope of the audit likely to lead to a qualified opinion or a disclaimer, SA 705 sets these steps, in this order (SM 8.40–8.41):

::: diagram Management-imposed limitation after acceptance
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Limitation after acceptance"}, {"id": "r", "kind": "process", "label": "Ask management to remove it"}, {"id": "d1", "kind": "decision", "label": "Removed?"}, {"id": "go", "kind": "end", "label": "Continue"}, {"id": "t", "kind": "process", "label": "Tell TCWG;\ntry alternatives"}, {"id": "d2", "kind": "decision", "label": "Evidence\nobtained?"}, {"id": "ok", "kind": "end", "label": "Opinion on\nthe evidence"}, {"id": "d3", "kind": "decision", "label": "Pervasive?"}, {"id": "q", "kind": "end", "label": "Qualified", "color": "d"}, {"id": "d4", "kind": "decision", "label": "Withdrawal\npracticable and\npossible?"}, {"id": "w", "kind": "end", "label": "Tell TCWG,\nwithdraw"}, {"id": "dis", "kind": "end", "label": "Disclaimer", "color": "f"}], "edges": [["s", "r"], ["r", "d1"], ["d1", "go", "yes"], ["d1", "t", "no"], ["t", "d2"], ["d2", "ok", "yes"], ["d2", "d3", "no"], ["d3", "q", "no"], ["d3", "d4", "yes"], ["d4", "w", "yes"], ["d4", "dis", "no"]], "caption": "TCWG: those charged with governance, told unless all of them manage the entity. \"Pervasive?\" asks whether the possible effects are material and pervasive, so that a qualification would be inadequate to communicate the gravity of the situation. Withdrawal must be practicable and possible under law or regulation; before withdrawing, the auditor tells TCWG of any misstatements found. Orange: qualified opinion; violet: disclaimer."}
:::

::: lab audit-opinion {"mode":"case","case":"sm-sarasbhai"}
Step through the Study Material's own case (Test Your Understanding 3) of a limitation imposed after acceptance, from the request to remove it to the disclaimer.
:::

### 6. Form and content, and communication

The headings, wording and Basis section change as set out in Formats and formulas below (SM 8.43–8.46); a disclaimer also drops the Key Audit Matters section of [[aud.report.sa701|SA 701]] unless law requires it (SM 8.47). When the auditor expects to modify the opinion, the auditor shall communicate with those charged with governance the circumstances and the wording of the modification (SM 8.47).

## Formats and formulas

### The modified report, section by section

*Reproduce this table from memory: each heading and each change carries marks.*

| Element | Qualified | Adverse | Disclaimer |
|---|---|---|---|
| Opinion heading | Qualified Opinion | Adverse Opinion | Disclaimer of Opinion |
| Basis heading | Basis for Qualified Opinion | Basis for Adverse Opinion | Basis for Disclaimer of Opinion |
| Statement that the evidence is sufficient and appropriate | Kept, "qualified" added | Kept, "adverse" added | Left out |
| Reference to where the auditor's responsibilities are described | Kept | Kept | Left out |
| Auditor's responsibilities section | As in SA 700 | As in SA 700 | Three statements only |
| Key Audit Matters section | Where SA 701 applies | Where SA 701 applies | None, unless law requires |

**Opinion wording** (fair presentation framework):

- **Qualified**: ==except for the effects of the matter(s) described in the Basis for Qualified Opinion section==, the financial statements give a true and fair view; for missing evidence, "except for the **possible** effects".
- **Adverse**: because of the significance of the matter(s) described in the Basis for Adverse Opinion section, the financial statements do not give a true and fair view.
- **Disclaimer**: the auditor (a) does not express an opinion; (b) because of the significance of the matter(s) described in the Basis for Disclaimer of Opinion section, has not been able to obtain sufficient appropriate audit evidence to provide a basis for an audit opinion; and (c) **was engaged to audit** the financial statements (amending SA 700's "have audited").

**The Basis section must contain** (SM 8.45–8.46):

- Misstated amounts: a **description and quantification** of the financial effects, unless impracticable (and if so, a statement saying so).
- Misstated narrative disclosures: how they are misstated.
- A required disclosure omitted: discuss it with those charged with governance; describe the omitted information; unless law prohibits it, include the disclosure where practicable and supported by sufficient appropriate audit evidence.
- Missing evidence: the **reasons** for the inability.
- Even with an adverse opinion or a disclaimer: any other matters that would have required a modification, and their effects.

**A disclaimer's responsibilities section** keeps only (a) the responsibility to conduct an audit in accordance with Standards on Auditing and issue a report; (b) that, because of the matter(s) described, sufficient appropriate audit evidence for an opinion could not be obtained; (c) the independence and ethics statement (SM 8.46).

## Worked examples

:::: example The elaichi premix that will never sell
Iyer & Associates are the statutory auditors of Tapri Tea Co. Ltd for 2025-26. Inventories of ₹38 crore include ₹2.40 crore of a discontinued elaichi premix, past its best-before date, with no realisable value. Management refuses to write it down, saying festival demand will clear it. Overall materiality is ₹1.50 crore, and no other item is affected.

State, with reasons, the opinion Iyer & Associates should express and what the Basis for Opinion section should contain.

::: answer Model answer
**Relevant provision.** As per SA 705, the auditor shall express a qualified opinion when the auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements, individually or in the aggregate, are material, but not pervasive, to the financial statements. Effects are pervasive when not confined to specific elements, accounts or items or, if confined, a substantial proportion of the financial statements. For a misstatement of specific amounts, the Basis for Qualified Opinion section shall describe and quantify its financial effects, unless impracticable.

**Facts of the case.** ₹2.40 crore of premix with no realisable value is carried at cost; materiality is ₹1.50 crore; nothing else is affected.

**Analysis.** Inventories and profit are overstated by ₹2.40 crore, above overall materiality: the misstatement is material. It is confined to inventories and, through them, profit and equity, and is not a substantial proportion of the financial statements: it is not pervasive. The auditor has sufficient appropriate audit evidence of it.

**Conclusion.** Iyer & Associates should express a **qualified opinion**: except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements give a true and fair view. That section should describe and quantify the matter (inventories, profit and other equity overstated by ₹2.40 crore, before any tax effect) and state that the evidence is sufficient and appropriate to provide a basis for the qualified opinion. The circumstances and wording go first to those charged with governance.
:::
::::

::::: example Kesar locks the samosa factory
After the 2025-26 engagement was accepted, Kesar tells his staff not to give Iyer & Associates the books of the samosa factory and the cold-chain division, together 58% of revenue and 61% of total assets. He also forbids attendance at the year-end stock count and confirmation requests to the division's debtors.

> **Kesar:** The factory is my baby. Nobody opens its books, not even you, Lakshmi-ji.
> **Lakshmi:** Then nobody can say its numbers are true, Kesar-ji. Including me.

Lakshmi's request, a board meeting and every alternative procedure have produced no evidence, and withdrawing is not practicable. Advise Iyer & Associates on the steps SA 705 requires, the opinion, and how the report differs from an unmodified one.

:::: answer Model answer
::: diagram The path this case takes
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Limitation after acceptance", "color": "g"}, {"id": "r", "kind": "process", "label": "Ask management to remove it", "color": "g"}, {"id": "d1", "kind": "decision", "label": "Removed?", "color": "g"}, {"id": "go", "kind": "end", "label": "Continue", "color": "mute"}, {"id": "t", "kind": "process", "label": "Tell TCWG;\ntry alternatives", "color": "g"}, {"id": "d2", "kind": "decision", "label": "Evidence\nobtained?", "color": "g"}, {"id": "ok", "kind": "end", "label": "Opinion on\nthe evidence", "color": "mute"}, {"id": "d3", "kind": "decision", "label": "Pervasive?", "color": "g"}, {"id": "q", "kind": "end", "label": "Qualified", "color": "mute"}, {"id": "d4", "kind": "decision", "label": "Withdrawal\npracticable and\npossible?", "color": "g"}, {"id": "w", "kind": "end", "label": "Tell TCWG,\nwithdraw", "color": "mute"}, {"id": "dis", "kind": "end", "label": "Disclaimer", "color": "g"}], "edges": [["s", "r"], ["r", "d1"], ["d1", "go", "yes"], ["d1", "t", "no"], ["t", "d2"], ["d2", "ok", "yes"], ["d2", "d3", "no"], ["d3", "q", "no"], ["d3", "d4", "yes"], ["d4", "w", "yes"], ["d4", "dis", "no"]], "caption": "Green: the steps this case takes; grey: the branches it does not."}
:::

**Relevant provision.** As per SA 705, if after accepting the engagement the auditor becomes aware of a management-imposed limitation on the scope of the audit likely to result in a qualified opinion or a disclaimer, the auditor shall request management to remove it. If management refuses, the auditor shall communicate the matter to those charged with governance (unless all of them manage the entity) and determine whether alternative procedures can provide sufficient appropriate audit evidence. If not, and the possible effects of undetected misstatements could be both material and pervasive, so that a qualification would be inadequate to communicate the gravity of the situation, the auditor shall withdraw where practicable and possible under applicable law or regulation, or else disclaim an opinion.

**Facts of the case.** Access to divisions with 58% of revenue and 61% of total assets, the stock count and confirmations are refused; the request, the board meeting and alternative procedures have failed; withdrawal is not practicable.

**Analysis.** The required steps have been performed. Undetected misstatements could affect revenue, inventories, receivables and many other items, in divisions that are a substantial proportion of the financial statements: the possible effects are both material and pervasive.

**Conclusion.** Iyer & Associates should express a **disclaimer of opinion**. Compared with an unmodified report:

1. Under "Disclaimer of Opinion": no opinion is expressed; because of the significance of the matters described in the Basis for Disclaimer of Opinion section, sufficient appropriate audit evidence could not be obtained to provide a basis for an audit opinion; the auditor was engaged to audit the financial statements.
2. "Basis for Disclaimer of Opinion" gives the reasons for the inability.
3. The reference to the responsibilities section and the sufficiency statement are left out; the responsibilities section keeps its three statements only.
4. No Key Audit Matters section, unless law or regulation requires it.

The circumstances and wording go first to those charged with governance.
::::
:::::

:::: example Bunty's three files
Bunty has ticked three files "unmodified". State, with reasons, the correct reporting in each.

(a) Chai Cargo Pvt Ltd, a small Tapri subsidiary, has lost its only customer and its board has resolved to liquidate it, yet its financial statements use the going concern basis.

(b) Kulhad Crafts Ltd's management refuses the written representation that it has fulfilled its responsibility for preparing the financial statements and has provided all information.

(c) Masala Mills Ltd faces a material uncertainty about going concern; the going concern basis is still appropriate, and Note 34 discloses the uncertainty adequately.

::: answer Model answer
**(a)** As per SA 570, if management's use of the going concern basis is, in the auditor's judgment, inappropriate, the auditor shall express an adverse opinion (SM 7.22). Liquidation is resolved, so the basis is inappropriate: **adverse opinion**.

**(b)** As per SA 580, the auditor shall disclaim an opinion in accordance with SA 705 if management does not provide the written representations about its responsibility for preparing the financial statements and for the information provided (SM 7.38). After discussing it with management and re-evaluating management's integrity: a **disclaimer of opinion**.

**(c)** As per SA 570, with an appropriate basis and an adequately disclosed material uncertainty, the opinion is unmodified, with a separate section headed "Material Uncertainty Related to Going Concern" that draws attention to the note (SM 7.22). Bunty's **unmodified opinion** is right, but the report needs that section, referring to Note 34.
:::
::::

::: lab audit-opinion {"mode":"own","nature":"scope","material":true,"pervasive":true}
Now set your own facts: start from evidence that cannot be obtained, material and pervasive, then flip the toggles and watch the opinion change.
:::

## Under the hood

### Where other Standards send you to SA 705

Many questions reach SA 705 through another Standard:

| Situation | Standard | What follows |
|---|---|---|
| Inventory count impracticable or legal counsel refused, and alternatives fail | [[aud.evid.sa501|SA 501]] | Modify (SM 4.71, 4.75) |
| Refusal of confirmation requests unreasonable, or alternatives fail | [[aud.evid.sa505|SA 505]] | Tell TCWG; SA 705 decides (SM 4.83) |
| No sufficient appropriate evidence on opening balances | [[aud.evid.sa510|SA 510]] | Qualified or disclaimer (SM 4.91) |
| Opening balances misstated, or policies applied inconsistently | SA 510 | Qualified or adverse (SM 4.91) |
| Management will not amend for a subsequent event, report not yet issued | [[aud.complete.sa560|SA 560]] | Modify (SM 7.8) |
| Going concern basis inappropriate | [[aud.complete.sa570|SA 570]] | Adverse (SM 7.22) |
| Material uncertainty not adequately disclosed | SA 570 | Qualified or adverse (SM 7.22) |
| Management will not make or extend its going concern assessment | SA 570 | Qualified or disclaimer may be appropriate (SM 7.22) |
| Representations on management's responsibilities refused or unreliable | [[aud.complete.sa580|SA 580]] | Disclaimer (SM 7.38) |
| Prior period opinion modified, matter unresolved | [[aud.report.sa710|SA 710]] | Modify the current opinion (SM 8.60) |

A limitation in the *proposed* terms that would lead to a disclaimer never reaches SA 705: the auditor does not accept it as an audit, unless law requires (SM 11.21; [[aud.ethics.sa210|SA 210]]). An Emphasis of Matter paragraph ([[aud.report.sa706|SA 706]]) or a key audit matter never substitutes for a required modification (SM 8.50, 8.54).

## Exam angle

::: exam Where SA 705 appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, SA 705 was examined 13 times, once in each of 13 documents.

- **Descriptive, 4 or 5 marks.** When each opinion is expressed: MTP January 2025 Series I Q2(b) (5 marks), RTP September 2025 Q17. Circumstances and objective: MTP January 2026 Series II Q4(c) (4 marks), MTP May 2026 Series II Q5(a) (5 marks). Factors deciding the type: MTP September 2026 Series II Q5(c) (4 marks). Management-imposed limitation: MTP January 2026 Series I Q6(a) (5 marks), RTP May 2024 Q19 (a case). A disclaimer case on the Basis section and the SA 700 elements left out: January 2025 Q3(c) (4 marks).
- **Multiple choice, 2 marks each**, usually through another Standard: unreliable or refused written representations (September 2024 MCQ 12; May 2026 MCQ 4, where the wrong action is to treat it as a disagreement and qualify; September 2026 MCQ 6, answers not yet published); an inadequately disclosed going concern uncertainty (January 2026 MCQ 11); an uncounted inventory location, alternative procedures first (MTP September 2025 Series II MCQ 5).
:::

::: exam How the marks are earned
ICAI's suggested answers quote the provision in the Standard's words, apply it to the facts and end by naming the opinion. The phrases carry marks: "sufficient appropriate audit evidence", "material but not pervasive", "possible effects on the financial statements of undetected misstatements", "inadequate to communicate the gravity of the situation", "those charged with governance".
:::

::: trick Two questions, three opinions
"Evidence or no evidence?", then "Pervasive or not?". Evidence and pervasive: **adverse**. No evidence and pervasive: **disclaimer**. Not pervasive: **qualified**. Condition: the matter must be material; an immaterial one needs no modification.
:::

## Answer frame

### A case question: provision, facts, analysis, conclusion

1. **Relevant provision**: "As per SA 705, …" in the Standard's words, only the parts the case needs.
2. **Facts of the case**: "In the given case, …" the facts that decide it, with their figures.
3. **Analysis**: misstatement or missing evidence? Material? Pervasive, and why?
4. **Conclusion**: "Hence, the auditor should express a … opinion", then whatever else is asked (headings, wording, the Basis section, communication).

### "Distinguish between a qualified and an adverse opinion"

| Point | Qualified opinion | Adverse opinion |
|---|---|---|
| When | Misstatements material, not pervasive; or evidence missing and possible effects material, not pervasive | Misstatements both material and pervasive |
| Evidence | Obtained, or not obtained | Obtained |
| Wording | "Except for the effects (possible effects) … give a true and fair view" | "Because of the significance of … do not give a true and fair view" |
| Headings | Qualified Opinion; Basis for Qualified Opinion | Adverse Opinion; Basis for Adverse Opinion |

### Three answers to the samosa-factory case

::: cols
**Loses marks**

"Disclaimer of opinion, because Kesar did not co-operate."

Right conclusion; no provision, no reasoning, no steps, no report changes.
---
**Passes**

"As per SA 705, when sufficient appropriate audit evidence cannot be obtained and the possible effects could be material and pervasive, the auditor disclaims. The factory and the cold-chain division are 61% of assets, so: disclaimer."

Provision and facts, but no limitation steps and no report changes.
---
**Full marks**

The steps in order (request, those charged with governance, alternative procedures, withdraw or disclaim), the facts applied to "material and pervasive", the conclusion, then each change to the report.
:::

## Common mistakes

::: mistake Hall of Shame: the disclaimer for accounts that are merely terrible
Receivables and inventory, 70% of total assets, are not realisable, and Bunty writes "disclaimer, things are really bad". But the auditor has the evidence: the accounts are known to be wrong. **Fix:** a misstatement with evidence, material and pervasive, is **adverse**. A disclaimer is for evidence that could not be obtained.
:::

::: mistake The "except for" that excepted everything
Qualifying when the matter runs through most of the statements. **Fix:** "except for" works only if the rest can still be relied on; pervasive effects need an adverse opinion or a disclaimer.
:::

::: mistake Hiding the problem in a key audit matter or an Emphasis of Matter paragraph
**Fix:** neither replaces a modified opinion the circumstances require (SM 8.50, 8.54).
:::

::: mistake Jumping straight to the disclaimer
Answering a management-imposed limitation with "disclaimer" alone. **Fix:** write SA 705's steps first (request removal, those charged with governance, alternative procedures, withdrawal); they carry most of the marks.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. CA Meera Joshi audits Ujjain Kulhad Works Ltd. A fire destroyed one quarter's purchase invoices. She verified everything else, but no alternative procedure can verify that quarter's purchases of ₹40 lakh. Overall materiality is ₹25 lakh, and no other area is affected. Which of the following is correct?
- [x] Qualified opinion: "except for the possible effects of the matter"
- [ ] Adverse opinion
- [ ] Disclaimer of opinion
- [ ] Unmodified opinion with an Emphasis of Matter paragraph about the fire
> Evidence is missing; the possible effects are material (above materiality) but confined to one quarter's purchases: the qualified opinion's second limb. Adverse needs evidence of a misstatement, a disclaimer pervasive possible effects.

Q: Tapri Cold Chain Pvt Ltd has not provided for receivables and inventory that are 70% of its total assets and are not realisable. The auditor has sufficient appropriate audit evidence of this. Which opinion?
- [ ] Qualified opinion
- [x] Adverse opinion
- [ ] Disclaimer of opinion
- [ ] Unmodified opinion with a key audit matter
> With evidence it is a misstatement, and at 70% of total assets material and pervasive. A disclaimer is for missing evidence, however bad the accounts look.

Q: Which of the following is NOT part of a report containing a disclaimer of opinion?
- [ ] A "Basis for Disclaimer of Opinion" section giving the reasons for the inability
- [ ] A statement that the auditor was engaged to audit the financial statements
- [x] A statement that the audit evidence obtained is sufficient and appropriate to provide a basis for the opinion
- [ ] The statement on the auditor's independence and other ethical responsibilities
> A disclaimer drops the sufficiency statement and the reference to the responsibilities section; the rest stays.

Q: After accepting the audit, the auditor finds a management-imposed limitation likely to lead to a disclaimer. Which of these does SA 705 require? Select all that apply.
- [x] Request management to remove the limitation
- [x] If management refuses, communicate with those charged with governance, unless all of them manage the entity
- [x] Determine whether alternative procedures can provide sufficient appropriate audit evidence
- [ ] Obtain a written representation that the limitation does not matter, then issue an unmodified opinion
> The three steps come before any decision on the opinion; a representation cannot replace the evidence the limitation withholds.
:::

## Recap

- Modify when the financial statements as a whole are not free from material misstatement, or when sufficient appropriate audit evidence cannot be obtained to conclude that they are.
- Objective: to express clearly an appropriately modified opinion.
- Material, not pervasive: **qualified** ("except for the effects", or "possible effects" when evidence is missing).
- Misstatement, material and pervasive: **adverse**. Missing evidence, possible effects material and pervasive: **disclaimer** (also multiple uncertainties, extremely rarely).
- Pervasive: not confined to specific items; if confined, a substantial proportion; or disclosures fundamental to users.
- Limitation after acceptance: request removal, tell those charged with governance, try alternatives; then qualify, or withdraw if practicable, else disclaim.
- Disclaimer: "engaged to audit"; reasons in the Basis section; no sufficiency statement, no responsibilities reference, no key audit matters unless law requires.
- Tell those charged with governance the circumstances and wording first. (The mechanic kept out of the bonnet never calls the engine bad.)

## Flashcards

Q:: SA 705: in which two circumstances shall the auditor modify the opinion?
A:: (a) The financial statements as a whole are not free from material misstatement, based on the evidence obtained; or (b) the auditor cannot obtain sufficient appropriate audit evidence to conclude that they are free from material misstatement.

Q:: SA 705: what is the objective of the auditor?
A:: To express clearly an appropriately modified opinion on the financial statements when either circumstance exists.

Q:: SA 705: when is a qualified opinion expressed?
A:: (a) With sufficient appropriate evidence, misstatements are material but not pervasive; or (b) evidence cannot be obtained, but the possible effects of undetected misstatements could be material but not pervasive.

Q:: SA 705: when is an adverse opinion expressed?
A:: When the auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements, individually or in the aggregate, are both material and pervasive.

Q:: SA 705: when is a disclaimer of opinion given?
A:: When sufficient appropriate evidence cannot be obtained and the possible effects of undetected misstatements could be both material and pervasive; also, in extremely rare cases of multiple uncertainties whose possible cumulative effect makes an opinion impossible.

Q:: SA 705: what makes effects pervasive?
A:: In the auditor's judgment they are not confined to specific elements, accounts or items; or, if confined, represent or could represent a substantial proportion of the financial statements; or, for disclosures, are fundamental to users' understanding.

Q:: SA 705: which two factors decide the type of modified opinion?
A:: The nature of the matter (misstated, or possibly misstated because evidence is missing) and the pervasiveness of its effects or possible effects.

Q:: SA 705: management limits the scope after acceptance. What comes first, and what last?
A:: First, request removal of the limitation. Last, if evidence still cannot be obtained and the possible effects are material and pervasive: withdraw where practicable and possible under law, otherwise disclaim.

Q:: SA 705: which two SA 700 elements are left out of a report with a disclaimer?
A:: The reference to the section describing the auditor's responsibilities, and the statement on whether the evidence obtained is sufficient and appropriate to provide a basis for the opinion.

Q:: SA 705: the wording of a qualified opinion?
A:: "Except for the effects of the matter(s) described in the Basis for Qualified Opinion section", or "except for the possible effects" when evidence could not be obtained.

Q:: SA 705: may a report with a disclaimer include Key Audit Matters?
A:: No, unless required by law or regulation.
