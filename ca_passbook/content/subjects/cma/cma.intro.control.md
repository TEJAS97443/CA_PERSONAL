---
id: cma.intro.control
title: Cost control and cost reduction
minutes: 22
needs: cma.intro.classify
tags: cost control, cost reduction, value analysis, standard, variance, preventive function, corrective function
labs:
summary: Cost control keeps actual costs to the standard; cost reduction lowers the standard itself, permanently and without hurting quality. ICAI's steps, three-fold assumptions and five differences.
---

## In plain words

### The ₹6.50 cup and the ₹6.10 cup

Every kulhad of chai in Tapri's Indore cafés has a **standard cost** of ₹6.50: milk, tea, sugar and the kulhad, at the quantities and prices Ritu worked out in advance.

In August the actual cost came to ₹6.90. Ritu went looking and found that the new milk boilers were boiling over. The staff were trained, the spillage stopped, and September came back to ₹6.50. That is **cost control**: keeping actual costs in line with the standard that was set.

Then Ritu asked a different question: why ₹6.50 at all? With a three-year contract direct from a dairy co-operative and a kulhad mould that uses less clay for an equally strong cup, the cost became ₹6.10, month after month, with chai that tastes exactly the same. That is **cost reduction**: a real, permanent fall in the cost per unit without any loss of quality.

> **Kesar:** Easier way. Switch to milk powder: ₹5.20 a cup. Sab adjust ho jayega.
> **Ritu:** The customers will adjust too. They will walk to BrewBucks.

Kesar's milk powder lowers the cost, but it lowers the quality with it, so it is not cost reduction at all.

::: analogy The household grocery bill
Keeping this month's groceries inside the ₹12,000 budget is control. Switching to a wholesale monthly order that buys the same groceries for ₹10,500, every month, is reduction. Buying watery dal to save money is neither: it is just a worse dinner.
:::

::: key
**Cost control** keeps costs to the standard (it accepts the standard). **Cost reduction** challenges the standard and lowers it, and counts only if the saving is in unit cost, permanent, and leaves utility and quality unaffected.
:::

## How it works

Both are objectives of a cost and management accounting system, listed by ICAI after ascertainment of cost and determination of selling price (SM 1.4; the other objectives are in [[cma.intro.scope|objectives and scope]]).

### Cost control: four steps that repeat

**Cost control** means maintaining discipline in expenditure. It ensures that expenditures are in consonance with predetermined set standard, and that any variation from these set standards is noted and reported on a continuous basis (SM 1.4). ICAI's four steps (SM 1.4–1.5):

::: steps
1. **Determination of pre-determined standard or results.** Standard costs or performance targets for a cost object or a cost centre are set before production or service activity begins: the desired cost or result to be achieved.
2. **Measurement of actual performance.** The actual cost or result is measured **in the same manner in which the targets are set**: if targets are set operation-wise, actual costs are collected operation-wise, so that there is a common basis for comparison.
3. **Comparison of actual performance with set standard or target.** Any deviation (**variance**) is noted and reported to the appropriate person or authority.
4. **Analysis of variance and action.** The variance is analysed for its reasons and appropriate action is taken to ensure compliance in future. If necessary, the standards are amended to take developments into account.
:::

::: diagram The cost control loop
{"type": "flow", "w": 420, "gapY": 44, "nodes": [{"id": "s", "kind": "start", "label": "1. Set the standard"}, {"id": "m", "kind": "process", "label": "2. Measure actual, same basis"}, {"id": "c", "kind": "decision", "label": "3. Variance\nfrom standard?"}, {"id": "ok", "kind": "end", "label": "Keep going", "color": "ok"}, {"id": "a", "kind": "process", "label": "4. Analyse reasons, act", "color": "c"}, {"id": "r", "kind": "decision", "label": "Standard still\nright?"}, {"id": "amend", "kind": "process", "label": "Amend the standard", "color": "d"}], "edges": [["s", "m"], ["m", "c"], ["c", "ok", "no"], ["c", "a", "yes"], ["a", "r"], ["r", "m", "yes"], ["r", "amend", "no"], ["amend", "m"]], "caption": "ICAI's four steps (SM 1.4–1.5). Green: no variance, carry on. Amber: the variance is analysed and acted on. Orange: the standard is amended when developments make it out of date. Every path returns to measuring actual performance."}
:::

The techniques that do this in practice are **standard costing**, defined by CIMA as a "control technique that reports variances by comparing actual costs to pre-set standards so facilitating action through management by exception" (SM 13.2; see [[cma.std.setting|standard costing]]), and **budgetary control** ([[cma.bud.basics|budgets and budgetary control]]).

### Cost reduction: challenging the standard

::: definition Cost reduction
"The achievement of real and permanent reduction in the unit cost of goods manufactured or services rendered without impairing their suitability for the use intended or diminution in the quality of the product." (SM 1.5)
:::

Cost reduction is an approach of management in which the cost of an object is believed to have scope for further reduction: ==no cost is termed as lowest==, and every possibility of reduction is explored (SM 1.5). Two actions are taken:

- **(a) Value analysis.** Each activity is segmented to identify value added and non-value added activities, and all non-value added activities are eliminated without affecting the essential characteristics of the product or process. Value Chain Analysis, a strategic tool developed by Michael Porter, is one method of doing it.
- **(b) Continuous research and study** to find the most optimal way to manufacture a product or render a service (SM 1.5).

The definition rests on **three-fold assumptions** (SM 1.5–1.6):

1. There is a saving in unit cost.
2. Such saving is of permanent nature.
3. The utility and quality of the goods and services remain unaffected, if not improved.

::: diagram Is this saving a cost reduction?
{"type": "flow", "w": 380, "nodes": [{"id": "s", "kind": "start", "label": "A saving"}, {"id": "u", "kind": "decision", "label": "Saving in\nunit cost?"}, {"id": "n1", "kind": "end", "label": "No: no unit saving", "color": "mute"}, {"id": "p", "kind": "decision", "label": "Permanent?"}, {"id": "n2", "kind": "end", "label": "No: temporary", "color": "mute"}, {"id": "q", "kind": "decision", "label": "Utility and quality\nunaffected?"}, {"id": "n3", "kind": "end", "label": "No: quality cut", "color": "mute"}, {"id": "y", "kind": "end", "label": "Cost reduction", "color": "g"}], "edges": [["s", "u"], ["u", "n1", "no"], ["u", "p", "yes"], ["p", "n2", "no"], ["p", "q", "yes"], ["q", "n3", "no"], ["q", "y", "yes"]], "caption": "The three-fold assumptions of SM 1.5–1.6 as three questions in ICAI's order. Green: only a saving that passes all three is cost reduction; grey: the three ways a saving fails."}
:::

### How the two work together

::: diagram Cost per cup at the Indore cafés, April to March
{"type": "plot", "h": 290, "x": [1, 12], "y": [5.8, 7.0], "legend": "outside",
 "xlabel": "month", "ylabel": "cost per cup (₹)",
 "xticks": [[1, "Apr"], [2, "May"], [3, "Jun"], [4, "Jul"], [5, "Aug"], [6, "Sep"], [7, "Oct"], [8, "Nov"], [9, "Dec"], [10, "Jan"], [11, "Feb"], [12, "Mar"]],
 "yticks": [[5.8, "5.80"], [6.1, "6.10"], [6.5, "6.50"], [7.0, "7.00"]],
 "series": [
  {"label": "standard", "pts": [[1, 6.5], [6.5, 6.5], [6.5, 6.1], [12, 6.1]], "color": "mute", "dash": true},
  {"label": "actual", "pts": [[1, 6.52], [2, 6.48], [3, 6.55], [4, 6.6], [5, 6.9], [6, 6.52], [7, 6.15], [8, 6.08], [9, 6.12], [10, 6.1], [11, 6.09], [12, 6.11]], "color": "a", "dots": true}
 ],
 "points": [{"x": 5, "y": 6.9, "label": "spillage", "pos": "right"}],
 "caption": "Grey dashed: the standard, ₹6.50 until September and ₹6.10 from October. Blue: actual cost per cup. August's spillage variance is brought back by cost control; October's drop in the standard itself is cost reduction, after which control keeps actual cost near the new ₹6.10."}
:::

Cost reduction ==operates even when an efficient cost control system exists== (SM 1.6): the cafés were already on standard in September when the cost was cut. Once a reduction is achieved, the standard is amended (step 4 of cost control), and control then guards the new, lower standard.

### Cost control and cost reduction, side by side

ICAI's five points of difference, in its order (SM 1.6). *Reproduce this table from memory.*

::: compare
| | Cost control | Cost reduction |
|---|---|---|
| 1. Aim | Maintaining the costs in accordance with the established standards | Reducing costs; challenges all standards and endeavours to improvise them continuously |
| 2. Conditions | Seeks to attain lowest possible cost under existing conditions | Recognises no condition as permanent, since a change will result in lower cost |
| 3. Emphasis | On past and present | On present and future |
| 4. Function | A preventive function | A corrective function; operates even when an efficient cost control system exists |
| 5. End | Ends when targets are achieved | Has no visible end; a continuous process |
:::

## Worked examples

:::: example Five savings on Ritu's desk
Ritu has five savings to report for Tapri's café and delivery divisions. **State, with reasons**, whether each is cost control, cost reduction or neither.

(a) Route-planning software on the delivery app permanently cuts fuel per delivery by 12%; deliveries arrive as fast as before.

(b) A dairy offers 15% off milk for the monsoon months only, to clear its surplus; the milk is of the usual quality.

(c) The samosa counters switch to a cheaper frying oil; cost per samosa falls by 40 paise, and customers complain that the samosas turn soggy within an hour.

(d) A new pasteuriser uses the heat of boiled milk to pre-heat incoming milk, cutting gas per litre by 20% for good; the chai tastes the same.

(e) Gas used at the Bhopal kitchen was 18% above standard in July; a leaking regulator was found and replaced, and August's gas usage was on standard.

::: answer Model answer
**Relevant concept.** Cost control maintains costs in accordance with established standards: actual performance is measured, compared with the standard, and variances are analysed and acted on (SM 1.4–1.5). Cost reduction is the achievement of real and permanent reduction in the unit cost of goods manufactured or services rendered without impairing their suitability for the use intended or diminution in the quality of the product; it assumes a saving in unit cost, of a permanent nature, with utility and quality unaffected (SM 1.5–1.6).

**(a) Cost reduction.** The cost per delivery falls, the saving is permanent, and the service (speed of delivery) is unaffected: all three assumptions hold. It is the result of research into the most optimal way to render the service.

**(b) Neither.** The cost per cup falls during the monsoon, but the saving is not of a permanent nature, so it is not cost reduction; and it is not the result of controlling actual cost against a standard.

**(c) Neither.** There is a saving in unit cost, but the quality of the product is impaired, so it fails the third assumption. It is a lower-quality product, not a cost reduction.

**(d) Cost reduction.** The saving in gas per litre, and so per cup, is permanent and the product's quality is unaffected. The standard for gas per litre should now be revised downwards.

**(e) Cost control.** The variance between actual and standard gas usage was noted, analysed for its reason and corrected, bringing actual cost back to the existing standard. The standard itself did not change.
:::
::::

:::: example The kulhad that got 60 paise cheaper
Tapri's kulhad unit at Khurja made 30,00,000 kulhads in 2025-26. Their cost fell from ₹4.00 to ₹3.40 each compared with the previous year. Ritu's analysis of the ₹0.60 fall:

| Cause | Per kulhad (₹) |
|---|---:|
| Clay prices fell this year after a bumper digging season; they are expected to return to normal next year | 0.25 |
| Research on kiln loading fits more kulhads in each firing; fuel per kulhad falls | 0.20 |
| Value analysis dropped a hand-polishing step that buyers never noticed; kulhads unchanged in use | 0.10 |
| Walls made thinner; breakage in the cafés has doubled | 0.05 |
| **Total fall** | **0.60** |

Kesar wants the annual report to say "cost reduction of ₹18,00,000".

**Required:**

(i) Calculate the cost reduction per kulhad and in total, as ICAI defines it.

(ii) Comment on Kesar's figure.

::: answer Show the working
**(i) Cost reduction**

| Cause | Per kulhad (₹) | Cost reduction? |
|---|---:|---|
| Clay price fall | 0.25 | No: not permanent |
| Kiln research | 0.20 | Yes: permanent, quality same |
| Polishing dropped | 0.10 | Yes: non-value added step gone |
| Thinner walls | 0.05 | No: quality impaired |

Cost reduction per kulhad = ₹0.20 + ₹0.10 = **₹0.30** (7.5% of ₹4.00). Total = ₹0.30 × 30,00,000 = **₹9,00,000**.

**(ii) Comment.** Kesar's ₹18,00,000 (₹0.60 × 30,00,000) is the total fall in cost, not cost reduction. ₹7,50,000 of it (₹0.25 × 30,00,000) comes from a temporary fall in clay prices and will reverse when prices return to normal: the saving is not of a permanent nature. ₹1,50,000 (₹0.05 × 30,00,000) comes from thinner walls that have doubled breakage: the quality and suitability of the product are impaired, and the extra breakage in the cafés may well cost more than the saving. Only ₹9,00,000 is real and permanent reduction in unit cost without impairing quality: the result of continuous research (the kiln) and value analysis (the polishing step), the two actions ICAI names (SM 1.5). The thinner-wall change should be reversed.
:::
::::

:::: example "Our control is so good, we do not need cost reduction"
At a board meeting, Kesar says: "Ritu's variance reports show every café on standard for six months. Cost control is working, so a cost reduction programme is a waste of time." **Comment.**

::: answer Model answer
**Relevant concept.** Cost control aims at maintaining costs in accordance with established standards and seeks the lowest possible cost under existing conditions; it ends when targets are achieved. Cost reduction challenges all standards and endeavours to improvise them continuously; it recognises no condition as permanent, and it is a corrective function that operates even when an efficient cost control system exists (SM 1.6). Under cost reduction no cost is termed as lowest (SM 1.5).

**Facts of the case.** Every café has been on standard for six months: cost control has achieved its targets.

**Analysis.** Being on standard shows only that actual costs equal the standards; it says nothing about whether the standards themselves are as low as they could be. Value analysis of each activity, to identify and eliminate non-value added activities, and continuous research into better methods may lower the standard cost per cup permanently without affecting quality.

**Conclusion.** Kesar's view is not correct. An efficient cost control system and a cost reduction programme are complementary: cost reduction operates even when cost control is efficient, and each reduction achieved becomes a revised standard that cost control then maintains.
:::
::::

## Under the hood

### Controlling costs needs controllable costs

Cost control works through responsibility centres: each manager is held responsible for the costs that are **controllable** by that manager, that is, costs that can be influenced by the action of the manager heading the responsibility centre (SM 1.33). An apportioned share of another department's cost is uncontrollable for the receiving manager, so a fair control report shows it separately ([[cma.intro.classify|classification by controllability]]; [[cma.intro.terms|responsibility centres]]).

### Tools for each

| Purpose | Tools named in the Study Material |
|---|---|
| Cost control | Standard costing and variance analysis (SM 13.2), budgetary control, material control (SM 2.3), employee cost control (SM 3.4) |
| Cost reduction | Value analysis and Value Chain Analysis (SM 1.5), activity based management (SM 5.20), the capital expenditure budget's cost reduction programme (SM 15.46) |

The Study Material also notes that "cost reduction and cost control is a cardinal feature of standard costing because standards once set do not always remain stable. They have to be revised" (SM 13.51), and digital costing helps to identify and eliminate non-value added activities (SM 1.19; see [[cma.intro.methods|digital costing]]).

## Exam angle

::: exam Where cost control and cost reduction appeared (new and old scheme)
In the ICAI documents read for this lesson, the distinction was asked 10 times in 10 documents, always as a descriptive question.

- **New scheme, 4–5 marks.** May 2024 Q6(a), "Distinguish between cost control and cost reduction" (5 marks); May 2026 Q6(b), the same words (5 marks); MTP May 2025 Series I Q6(d) and RTP January 2026 Q19(d): "Cost control emphasis is on past and present, while cost reduction emphasis is on present and future. DISCUSS some more differences" (4 marks in the MTP).
- **Old scheme.** December 2021 Q6(e) (5 marks); MTP July 2021 Series II Q6(a); MTP November 2023 Series II Q6(a); RTP December 2021 Q15(a); RTP May 2023 Q15(d); RTP November 2022 Q15(b).
- Every suggested answer read is ICAI's table from SM 1.6, in the same order. Where the question already gives one point, the suggested answer gives the other four (MTP May 2025).
- The chapter's own MCQs test the same table: "It ends when targets achieved" is true of cost control, and "lowest possible cost under best conditions" is the false statement, because ICAI's words are "under existing conditions" (SM 1.43–1.44).
:::

::: trick Control looks back, reduction looks forward
Control: standard accepted, past and present, preventive, ends at the target. Reduction: standard challenged, present and future, corrective, never ends. Condition: these are ICAI's words; write them as given, including "preventive" for control and "corrective" for reduction, which are easy to swap.
:::

## Answer frame

### "Distinguish between cost control and cost reduction" (5 marks)

A two-column table with ICAI's five points in ICAI's order: aim (maintain standards / challenge standards), conditions (lowest cost under existing conditions / no condition permanent), emphasis (past and present / present and future), function (preventive / corrective, operates even with efficient cost control), end (ends when targets achieved / no visible end, continuous). If time allows, add one line each: the definition of cost reduction and the four steps of cost control.

### "DISCUSS some more differences" (when the question gives one)

Leave out the point already given (for example the emphasis) and write the other four. Repeating the given point earns nothing.

### "Explain cost reduction" or "What are the assumptions of cost reduction?"

1. ICAI's definition, word for word.
2. The approach: no cost is termed as lowest.
3. The two actions: value analysis (value added and non-value added activities; Value Chain Analysis by Michael Porter) and continuous research and study.
4. The three-fold assumptions: saving in unit cost; permanent nature; utility and quality unaffected, if not improved.

::: cols
**Loses marks**

"Cost control controls cost; cost reduction reduces cost."

Restates the names; no point of difference.
---
**Passes**

Three or four correct points in a list, in any order, some in the student's own words.

Correct, but misses points and ICAI's phrases.
---
**Full marks**

All five points in a two-column table, in ICAI's order, in ICAI's words ("existing conditions", "preventive", "corrective", "no visible end").
:::

## Common mistakes

::: mistake Hall of Shame: the preventive and the corrective swapped
Writing "cost control is corrective, cost reduction is preventive", because control "corrects" variances. **Fix:** ICAI's table says cost control is a **preventive** function and cost reduction a **corrective** function that operates even when an efficient cost control system exists (SM 1.6), and the suggested answers of May 2024 and May 2026 print exactly these words. Write them as ICAI gives them, whatever your intuition says.
:::

::: mistake Calling every saving a cost reduction
A one-month discount, a fall in market price or a cheaper, worse material counted as cost reduction. **Fix:** test all three assumptions: a saving in unit cost, of a permanent nature, with utility and quality unaffected. Fail one, and it is not cost reduction.
:::

::: mistake "Under best conditions"
Writing that cost control seeks the lowest possible cost "under best conditions" or "ideal conditions". **Fix:** ICAI's words are "under **existing** conditions"; it is cost reduction that refuses to accept existing conditions as permanent.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. In August, sugar cost per cup at Tapri's Indore cafés was ₹0.62 against a standard of ₹0.50. Ritu traced it to oversized scoops at two cafés, the scoops were replaced, and September's sugar cost was ₹0.50 a cup. Which statement is correct?
- [ ] It is cost reduction, because the cost per cup fell by ₹0.12
- [ ] It is both cost control and cost reduction
- [x] It is cost control: a variance from the existing standard was analysed and corrected
- [ ] It is neither, because the standard was not changed
> Actual cost was brought back to the existing standard after the variance was analysed and acted on: cost control. Cost reduction would have lowered the ₹0.50 standard itself.

Q: Ritu's two teams describe their work. Team P: "We take this year's recipes, suppliers and machines as they are, and keep every café's cost per cup at the standard set for them." Team Q: "We treat no recipe, supplier or machine as permanent, and test changes that would lower the cost per cup from next year on, at the same taste." Which description is correct?
- [ ] P does cost reduction and Q does cost control, because Q works with next year's figures
- [x] P does cost control (lowest cost under existing conditions, emphasis on past and present); Q does cost reduction (no condition permanent, emphasis on present and future)
- [ ] Both do cost control, because both compare costs with a standard
- [ ] Both do cost reduction, because both aim at a lower cost per cup
> ICAI's table (SM 1.6): cost control maintains costs in accordance with established standards and seeks the lowest possible cost under existing conditions, with emphasis on past and present. Cost reduction recognises no condition as permanent and challenges the standards, with emphasis on present and future. Team Q also keeps the taste, so it meets the quality test of the definition.

Q: The cost of a premix pack fell from ₹20.00 to ₹18.50. Of the fall, ₹0.90 comes from a permanent redesign of the blending process with no change in quality, and ₹0.60 from a supplier's one-year introductory discount. Output is 4,00,000 packs. What is the cost reduction for the year, as ICAI defines it, in rupees?
= 360000
> Only the permanent saving with quality unaffected counts: ₹0.90 × 4,00,000 = ₹3,60,000. The ₹0.60 discount is not of a permanent nature.

Q: According to ICAI, cost control is a ______ function and cost reduction is a ______ function.
- [ ] corrective; preventive
- [x] preventive; corrective
- [ ] preventive; preventive
- [ ] corrective; continuous
> ICAI's table: cost control is a preventive function; cost reduction is a corrective function (SM 1.6). Swapping them is the commonest slip.

Q: Which of these are among ICAI's three-fold assumptions in the definition of cost reduction? Select all that apply.
- [x] There is a saving in unit cost
- [ ] The saving is achieved within the budget period
- [x] The saving is of permanent nature
- [x] The utility and quality of the goods and services remain unaffected, if not improved
> The three assumptions are a saving in unit cost, of permanent nature, with utility and quality unaffected (SM 1.5–1.6). Nothing ties cost reduction to a budget period: it has no visible end.
:::

## Recap

- Cost control: maintaining discipline in expenditure, so that expenditures are in consonance with predetermined standards and variations are noted and reported continuously.
- Four steps of cost control, in order: set the standard, measure actual on the same basis, compare and report the variance, analyse and act (amend the standard if necessary).
- Cost reduction: real and permanent reduction in unit cost without impairing suitability for the use intended or diminution in quality.
- Three-fold assumptions: saving in unit cost; permanent; utility and quality unaffected, if not improved.
- Two actions: value analysis (eliminate non-value added activities; Porter's Value Chain Analysis) and continuous research and study.
- Five differences: maintain vs challenge standards; existing conditions vs no condition permanent; past and present vs present and future; preventive vs corrective; ends at target vs no visible end.
- Reduction lowers the standard; control then guards the new standard. (The ₹6.50 cup became the ₹6.10 cup.)

## Flashcards

Q:: ICAI's definition of cost reduction?
A:: The achievement of real and permanent reduction in the unit cost of goods manufactured or services rendered without impairing their suitability for the use intended or diminution in the quality of the product.

Q:: The three-fold assumptions in the definition of cost reduction?
A:: (a) There is a saving in unit cost; (b) such saving is of permanent nature; (c) the utility and quality of the goods and services remain unaffected, if not improved.

Q:: The four steps of cost control, in ICAI's order?
A:: Determination of pre-determined standard or results; measurement of actual performance; comparison of actual performance with set standard or target; analysis of variance and action.

Q:: The two actions taken for cost reduction?
A:: Value analysis (segmenting activities into value added and non-value added and eliminating the non-value added, e.g. by Value Chain Analysis) and continuous research and study to find the most optimal way to produce or serve.

Q:: Distinguish between cost control and cost reduction: ICAI's five points, in order?
A:: (1) Maintains costs per established standards / challenges all standards and improvises them continuously; (2) lowest possible cost under existing conditions / no condition permanent; (3) emphasis on past and present / on present and future; (4) preventive function / corrective function, operating even with efficient cost control; (5) ends when targets are achieved / no visible end, a continuous process.

Q:: Tapri's cost reduction cell has met this year's target of 40 paise a cup, and Kesar wants to wind it up. Which point of ICAI's table answers him?
A:: Cost reduction has no visible end and is a continuous process; it is cost control that ends when targets are achieved.

Q:: A thinner kulhad saves 5 paise a cup but breaks in customers' hands. Which of the three-fold assumptions does it fail?
A:: The third: the utility and quality of the goods and services must remain unaffected, if not improved. So the saving is not cost reduction.

Q:: ICAI's meaning of cost control, as an objective of cost accounting?
A:: Maintaining discipline in expenditure: it ensures that expenditures are in consonance with predetermined set standards and that any variation from these standards is noted and reported on a continuous basis.

Q:: Who developed Value Chain Analysis, named by ICAI as a method of value analysis for cost reduction?
A:: Michael Porter.
