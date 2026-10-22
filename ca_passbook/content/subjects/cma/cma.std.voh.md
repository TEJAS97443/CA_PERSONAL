---
id: cma.std.voh
title: Variable overhead variances
minutes: 25
needs: cma.std.labour
tags: variable overhead cost variance, variable overhead expenditure variance, spending variance, variable overhead efficiency variance, standard hours, actual hours worked
labs: variance
summary: Why variable overheads differ from the standard for the output made: a rate paid per hour (expenditure) and hours used (efficiency), worked on actual hours worked.
---

## In plain words

### The fryers that ran late

Tapri's samosa factory in Indore fries in batches. Power, gas and consumable stores for the fryers rise and fall with the hours the fryers run: they are **variable overheads**, the indirect costs that vary with the level of production. Ritu's standard says a batch takes 2 fryer hours, and every fryer hour costs ₹60 of variable overheads.

> **Kesar:** Gas got cheaper this month. The overhead per hour fell from ₹60 to ₹59. We saved, no?
> **Ritu:** Per unit, please. We made 4,000 batches, which should take 8,000 hours. The fryers ran 8,400.
> **Kesar:** Four hundred hours. Sab adjust ho jayega.
> **Ritu:** It did not. Four hundred hours at ₹60 is ₹24,000.

Ritu's question is the same one she asks for material and labour: **what should the variable overheads for this month's output have cost?** 8,000 standard hours at ₹60 is ₹4,80,000. The fryers actually cost ₹4,95,600 (8,400 hours at ₹59), so the **variable overhead cost variance** is ₹15,600 adverse.

Two things explain it. The rate: each of the 8,400 hours cost ₹1 less than the standard, a saving of ₹8,400 (the **expenditure variance**). The hours: the fryers ran 400 hours longer than 4,000 batches need, and each of those hours carried ₹60 of overheads, a loss of ₹24,000 (the **efficiency variance**). Cheaper gas saved ₹8,400; slow frying lost ₹24,000.

::: analogy The cab billed by the minute
A cab that bills ₹10 a minute should cost ₹300 for a 30-minute trip. If the bill is ₹352, either the rate per minute went up (surge pricing: the expenditure variance), or the driver took the long route and the ride lasted 32 minutes (the efficiency variance), or both. You cannot blame the surge for the long route.
:::

::: key
Compare the actual variable overheads with the standard variable overheads for the **actual output**, then split the gap: the rate per hour, on the hours actually worked (expenditure), and the hours worked against the standard hours, at the standard rate (efficiency). The two must add back to the cost variance.
:::

## How it works

Variable overheads vary with the level of production. If they consist of indirect materials, they vary with the direct material used; if they depend on the hours worked, they vary with labour hours or machine hours; **if nothing is mentioned, take labour hours as the basis** (SM 13.36). The calculation is similar to labour cost variance, and the cost variance is divided into two parts: the **variable overhead expenditure variance** (the formula chart also calls it the **spending** variance, SM 13.36, and Fig 13.1 the "expenditure or **budget** variance", SM 13.13) and the **variable overhead efficiency variance** (SM 13.36).

### Five steps from a rate card to two variances

The fryer month: standard 2 hours per batch at ₹60 per hour; actual 4,000 batches, 8,400 hours worked, ₹4,95,600 of variable overheads.

::: steps
1. **Standard rate per hour (SR)** = budgeted variable overheads ÷ budgeted hours (SM 13.42). Here it is given: ₹60.
2. **Standard hours for actual output (SH)** = 4,000 batches × 2 hours = 8,000 hours. The standard variable overheads for actual production, SH × SR = 8,000 × ₹60 = **₹4,80,000**, are the **recovered** (absorbed) overheads.
3. **Variable overhead cost variance** = standard variable overheads for actual production − actual variable overheads = ₹4,80,000 − ₹4,95,600 = **₹15,600 (A)**.
4. **Expenditure (spending) variance** = standard variable overheads for actual hours − actual variable overheads = (8,400 × ₹60) − ₹4,95,600 = ₹5,04,000 − ₹4,95,600 = **₹8,400 (F)**.
5. **Efficiency variance** = standard variable overheads for production − standard variable overheads for actual hours = ₹4,80,000 − ₹5,04,000 = **₹24,000 (A)**, which is (8,000 − 8,400) × ₹60. Check: ₹8,400 (F) + ₹24,000 (A) = ₹15,600 (A).
:::

The analysis is three amounts in a row, each changing one thing from the one before:

::: diagram The variable overhead ladder, fryer month
{"type": "layers", "w": 430, "layers": [
 {"label": "(1) SH × SR = ₹4,80,000", "note": "standard VOH for actual output (recovered)"},
 {"label": "(2) AH × SR = ₹5,04,000", "note": "standard VOH for actual hours worked", "right": "efficiency (1) − (2): ₹24,000 (A)"},
 {"label": "(3) Actual VOH = ₹4,95,600", "note": "8,400 hours at ₹59", "right": "expenditure (2) − (3): ₹8,400 (F)"}],
 "caption": "Rung (2) changes the hours, rung (3) the rate. A positive difference is favourable, a negative one adverse. Both together: (1) − (3) = cost variance ₹15,600 (A)."}
:::

On a chart, the standard rate is a straight line from the origin: every hour adds ₹60 (the chart shows a close-up). The two variances are two moves away from the point where the actual output should have landed.

::: diagram Fryer month: the standard rate line and the two variances
{"type": "plot", "h": 340, "x": [7800, 8600], "y": [470000, 515000], "clip": true,
 "xlabel": "fryer hours", "ylabel": "variable overheads (₹)",
 "xticks": [[7800, "7,800"], [8000, "8,000"], [8200, "8,200"], [8400, "8,400"], [8600, "8,600"]],
 "yticks": [[470000, "4,70,000"], [480000, "4,80,000"], [495600, "4,95,600"], [504000, "5,04,000"], [515000, "5,15,000"]],
 "legend": "outside",
 "series": [
  {"label": "₹60 an hour (standard rate)", "fn": "60*x", "color": "a"},
  {"label": "efficiency ₹24,000 (A)", "pts": [[8450, 480000], [8450, 504000]], "color": "bad", "arrow": "both"},
  {"label": "expenditure ₹8,400 (F)", "pts": [[8400, 504000], [8400, 495600]], "color": "g", "arrow": "both"},
  {"pts": [[8000, 480000], [8450, 480000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[8450, 504000], [8400, 504000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[8000, 470000], [8000, 480000]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 8000, "y": 480000, "label": "SH × SR", "pos": "left"}, {"x": 8400, "y": 504000, "label": "AH × SR", "pos": "left"}, {"x": 8400, "y": 495600, "label": "actual", "pos": "left"}],
 "caption": "Blue: the standard rate line. The output should have used 8,000 hours (₹4,80,000); it used 8,400, which on the standard line is ₹5,04,000 (rose arrow: efficiency, adverse). The actual cost sat ₹8,400 below the line (green arrow: expenditure, favourable)."}
:::

::: lab variance {"mode":"voh","out":5900,"budOut":6000,"budHrs":12000,"actHrs":11600,"vBud":120000,"vAct":122000}
Step through Study Material Illustration 9 yourself: the basics table first, then the cost variance split into expenditure and efficiency.
:::

### The vocabulary, in ICAI's words

| Term | Meaning (SM 13.37, 13.42) |
|---|---|
| Standard hours (SH) | Hours required to produce the actual output |
| Actual hours (AH) | Actual hours taken to produce the actual output: in variable overhead formulas, the **actual hours worked** |
| Standard variable overheads for actual production | SH × SR: also called the recovered (absorbed) variable overheads |
| Standard variable overheads for actual hours | AH × SR: also called the standard overhead |

Idle hours are paid but not worked. The variable overhead formulas use the hours **worked** (SM 13.36), and variable overheads are "generally" based on labour time worked (SM 13.8). So idle hours enter the labour idle time variance ([[cma.std.labour|labour variances, including idle time]]) and stay out of AH here: the Study Material has no idle time variance for variable overheads.

## Formats and formulas

Every variable overhead answer starts with two working notes: the standard rate (per hour, and per unit if needed) and the standard hours for actual output. *Reproduce the formulas and the working notes from memory.* A variance computed as standard minus actual is favourable when positive and adverse when negative; write (F) or (A) after every figure (SM 13.12).

::: formula Variable overhead cost variance
$$\text{Cost} = (SH \times SR) - \text{Actual VOH}$$
SH = standard hours for actual output, SR = standard variable overhead rate per hour. In words: standard variable overheads for actual production − actual variable overheads (SM 13.36). With a rate per unit: actual output × standard rate per unit − actual variable overheads.
:::

::: formula Variable overhead expenditure (spending) variance
$$\text{Expenditure} = (SR - AR) \times AH \qquad = (SR \times AH) - (AR \times AH)$$
AH = actual hours worked, AR = actual variable overhead rate per hour (actual variable overheads ÷ AH). In words: standard variable overheads for actual hours − actual variable overheads (SM 13.36).
:::

::: formula Variable overhead efficiency variance
$$\text{Efficiency} = (SH - AH) \times SR \qquad = (SH \times SR) - (AH \times SR)$$
In words: standard variable overheads for production − standard variable overheads for actual hours (SM 13.36).
:::

::: formula The working notes and the check
$$SR = \frac{BV}{BH} \qquad SH = \frac{BH}{BO} \times AO$$
BV = budgeted variable overheads, BH = budgeted hours, BO = budgeted output, AO = actual output. A rate per unit is BV ÷ BO (SM 13.42). Check: cost variance = expenditure variance + efficiency variance (SM 13.78).
:::

The Study Material's summary names the three amounts **recovered overhead** (SH × SR), **standard overhead** (AH × SR) and **actual overhead**: cost = recovered − actual, expenditure = standard − actual, efficiency = recovered − standard (SM 13.54).

### The working table

| Particulars | Hours | Rate (₹) | Amount (₹) |
|---|---:|---:|---:|
| Recovered: standard hours for actual output × SR | SH | SR | xxx |
| Standard: actual hours worked × SR | AH | SR | xxx |
| Actual variable overheads | AH | AR | xxx |

Efficiency = row 1 − row 2; expenditure = row 2 − row 3; cost = row 1 − row 3.

## Worked examples

:::: example The packing line and the power cut
Tapri's premix plant packs cartons on a labour-paced line. Variable overheads are absorbed on direct labour hours. For October:

| Particulars | Budget | Actual |
|---|---:|---:|
| Production (cartons) | 12,000 | 11,400 |
| Standard time per carton | 1.5 hours | – |
| Variable overheads (₹) | 3,60,000 | 3,57,000 |
| Labour hours paid | – | 18,000 |

Of the hours paid, 500 were idle when the power failed for two shifts.

**Required:**

(i) Calculate the variable overhead cost variance.

(ii) Calculate the variable overhead expenditure and efficiency variances.

(iii) Verify your answer, and show what goes wrong if the 18,000 hours paid are used.

::: answer Show the working
**Working notes**

1. Budgeted hours = 12,000 × 1.5 = 18,000 hours. Standard rate = ₹3,60,000 ÷ 18,000 = **₹20 per hour** (₹30 per carton).
2. Standard hours for actual output = 11,400 × 1.5 = **17,100 hours**.
3. Actual hours worked = 18,000 − 500 idle = **17,500 hours**; actual rate = ₹3,57,000 ÷ 17,500 = ₹20.40 per hour.

| Particulars | Hours | Rate (₹) | Amount (₹) |
|---|---:|---:|---:|
| Recovered (SH × SR) | 17,100 | 20.00 | 3,42,000 |
| Standard (AH × SR) | 17,500 | 20.00 | 3,50,000 |
| Actual | 17,500 | 20.40 | 3,57,000 |

**(i)** VOH cost variance = ₹3,42,000 − ₹3,57,000 = **₹15,000 (A)**. (Check by units: 11,400 × ₹30 = ₹3,42,000.)

**(ii)** Expenditure variance = (SR × AH) − actual = ₹3,50,000 − ₹3,57,000 = **₹7,000 (A)**. Efficiency variance = (SH − AH) × SR = (17,100 − 17,500) × ₹20 = **₹8,000 (A)**.

**(iii)** Check: ₹7,000 (A) + ₹8,000 (A) = ₹15,000 (A), the cost variance. With the 18,000 hours paid, the standard for actual hours becomes ₹3,60,000: the expenditure variance turns into ₹3,000 (F) and the efficiency variance into ₹18,000 (A). The total still checks, which is why the error survives a careless check. The power failure stopped the line, so no variable overheads were incurred in those 500 hours; the SM's formulas use hours worked.
:::
::::

:::: example Kiln hours or labour hours? The intern picks a base
Tapri's kulhad unit fires clay cups in trays of 100. Its variable overheads (gas for the kilns and power for their fans) rise and fall with the hours the kilns fire, not with the hours the potters work. The standard cost card per tray shows direct labour 3 hours at ₹80 per hour, kiln time 0.5 kiln-hour, and variable overheads of ₹120 per kiln-hour. In November, 2,600 trays were made in 8,000 labour hours worked and 1,250 kiln-hours, and variable overheads came to ₹1,62,500.

The draft prepared by Ritu's intern absorbs the variable overheads on labour hours instead, at ₹60 per tray ÷ 3 hours = ₹20 per labour hour.

**Required:**

(i) Calculate the variable overhead cost, expenditure and efficiency variances on kiln-hours, and the actual rate per kiln-hour.

(ii) Calculate the same variances as the intern's labour-hour basis would show.

(iii) Calculate the labour efficiency variance, and advise Ritu which variable overhead analysis to report.

::: answer Show the working
**Working notes.** Standard variable overheads per tray = 0.5 × ₹120 = ₹60. Standard kiln-hours for actual output = 2,600 × 0.5 = **1,300**; standard labour hours = 2,600 × 3 = **7,800**.

**(i) On kiln-hours (SR ₹120)**

| Particulars | Kiln-hours | Rate (₹) | Amount (₹) |
|---|---:|---:|---:|
| Recovered (SH × SR) | 1,300 | 120.00 | 1,56,000 |
| Standard (AH × SR) | 1,250 | 120.00 | 1,50,000 |
| Actual | 1,250 | 130.00 | 1,62,500 |

- Cost = ₹1,56,000 − ₹1,62,500 = **₹6,500 (A)**.
- Expenditure = ₹1,50,000 − ₹1,62,500 = **₹12,500 (A)**; actual rate = ₹1,62,500 ÷ 1,250 = **₹130 per kiln-hour**.
- Efficiency = (1,300 − 1,250) × ₹120 = **₹6,000 (F)**.

Check: ₹12,500 (A) + ₹6,000 (F) = ₹6,500 (A).

**(ii) On the intern's labour hours (SR ₹20)**

- Expenditure = 8,000 × ₹20 − ₹1,62,500 = ₹1,60,000 − ₹1,62,500 = **₹2,500 (A)**.
- Efficiency = (7,800 − 8,000) × ₹20 = **₹4,000 (A)**.
- Cost = 2,600 × ₹60 − ₹1,62,500 = **₹6,500 (A)**, the same total.

**(iii)** Labour efficiency = (7,800 − 8,000) × ₹80 = **₹16,000 (A)**.

| Variance (₹) | Kiln-hour basis | Labour-hour basis |
|---|---:|---:|
| Expenditure | 12,500 (A) | 2,500 (A) |
| Efficiency | 6,000 (F) | 4,000 (A) |
| **Cost** | **6,500 (A)** | **6,500 (A)** |

**Advice:** report the kiln-hour analysis. The cost variance does not depend on the base, but the split does. The overheads are incurred when the kilns fire, and the kilns fired 50 hours less than standard for 2,600 trays (fuller loads), a ₹6,000 (F) efficiency; each kiln-hour cost ₹10 more than standard, a ₹12,500 (A) expenditure that points to the gas price or the burners. The intern's base charges the overheads to the potters' extra 200 hours, which did not burn any gas, and hides the rise in the cost per kiln-hour. The Study Material bases the variable overhead variances on labour hours or machine hours, whichever the overheads depend on, and takes labour hours only "if nothing is mentioned specifically" (SM 13.36); here the overheads are stated to vary with kiln-hours.
:::
::::

## Under the hood

### When the question gives no hours

With only budgeted and actual output and overheads, only the **cost variance** can be computed, on a rate per unit (SM 13.42–13.43). A budget of 6,000 units with ₹1,50,000 of variable overheads gives ₹25 per unit; 5,700 units at an actual ₹1,46,300 give 5,700 × ₹25 − ₹1,46,300 = ₹3,800 (A). The split into expenditure and efficiency needs hours. ICAI's May 2025 paper, Q4(b), asked exactly this "variable overhead variance" on units.

### Semi-variable overheads and a total overhead rate

Split first. A semi-variable cost "60 per cent fixed and 40 per cent variable" sends 40% of the budget and 40% of the actual into variable overheads (SM 13.65, Case Scenario 1). A standard card that shows only "total overheads ₹10 per hour" needs the fixed rate found first (budgeted fixed overheads ÷ budgeted hours); the rest of the ₹10 is the variable rate (MTP September 2026 Series II Q4(a)).

### Budgeted hours after normal down time

If 40 workers work 8 hours a day for 25 days with a normal down time of 10%, budgeted hours are 40 × 8 × 25 × 90% = 7,200, not 8,000; a variable overhead budget of ₹1,44,000 then gives ₹20 per hour. ICAI's MTP September 2025 Series II Q1(c) built its rate this way, with 15% down time.

### Two efficiency variances from one set of hours

When variable overheads are absorbed on labour hours, the labour efficiency variance and the variable overhead efficiency variance measure the same hours: VOH efficiency = labour efficiency × (VOH rate ÷ labour rate). A labour efficiency variance of ₹16,000 (A) at ₹80 an hour and a VOH rate of ₹25 an hour give ₹16,000 × 25 ÷ 80 = ₹5,000 (A). One given, the other follows, as long as both use hours worked. When the overheads follow machine hours instead (the kiln example), the two efficiency variances measure different hours and can even point in opposite directions.

### Next door

Fixed overheads are analysed differently, because their budget does not move with output: [[cma.std.foh|fixed overhead variances]]. All the cost variances meet in [[cma.std.recon|the reconciliation of budgeted and actual profit]]. Variable overheads absorbed on material instead of hours (SM 13.36) follow the [[cma.std.material|material variances]] pattern.

## Exam angle

::: exam Where variable overhead variances appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, variable overhead variances were asked in 14 of them: 4 past papers, 2 RTPs and 8 MTPs. Most of them set it beside fixed overhead or labour variances in the same question.

- **Descriptive, 4 to 8 marks.** Actual hours from the efficiency variance, then the actual rate and the cost variance: September 2025 Q1(c) (4 marks), RTP May 2026 Q15. Cost variance on units only: May 2025 Q4(b) (6 marks, with fixed overheads). Cost variance with material and labour from budget and actual totals: January 2026 Q4(a) (7 marks). Budgeted hours after normal down time: MTP September 2025 Series II Q1(c) (4 marks). Rate split out of a total overhead rate: MTP September 2026 Series II Q4(a) (8 marks). Cost variance next to material and labour variances from a standard cost card: MTP May 2024 Series I Q5(a) (6 marks), MTP September 2024 Series I Q4(b) (8 marks), MTP January 2026 Series I Q3(a) (9 marks, with idle time in the labour data).
- **Multiple choice, 2 marks each**: standard rate from the efficiency variance (January 2025 MCQ 14); expenditure and efficiency (MTP January 2026 Series I MCQ 12); efficiency nil and a two-tier actual rate (MTP January 2025 Series I MCQs 3–4); cost variances from budget totals (MTP May 2025 Series II MCQ 11, MTP September 2026 Series II MCQ 14); actual overheads from the two variances (RTP September 2025 Case Scenario 1); semi-variable split (MTP May 2024 Series II Case Scenario, the Study Material's own Case Scenario 1).
:::

::: exam The wording traps ICAI used
- "Variable overheads are based on direct labour hours" plus a given efficiency variance: solve for actual hours first (RTP May 2026 Q15; SM Practical Problem 15).
- "Actual production expressed in standard hours" is SH itself (MTP September 2025 Series II Q1(c)).
- "₹50 per hour for the first 10,000 hours, ₹60 for additional hours" (MTP January 2025 Series I): the actual overheads are a sum of two slabs; the expenditure variance still uses the standard ₹50 on all actual hours.
- "Indicate the nature of variance": every figure needs its (F) or (A).
:::

::: trick Three amounts, three subtractions
Write SH × SR, AH × SR and actual in a column. Top minus middle is efficiency, middle minus bottom is expenditure, top minus bottom is cost. Condition: AH is the hours worked, and SR is the standard variable rate, never the actual rate.
:::

## Answer frame

### A full-marks variable overhead answer

1. **Working notes**: the standard rate per hour (and per unit), the standard hours for actual output, the actual hours worked (paid − idle), and the actual rate if needed.
2. **The three amounts**: recovered (SH × SR), standard (AH × SR), actual.
3. **Each variance**: formula in symbols, figures, result with (F) or (A).
4. **The check**: expenditure + efficiency = cost.
5. **A one-line comment** if asked: the efficiency variance comes from the hours worked against the standard hours (when overheads are absorbed on labour hours, the same hours as the labour efficiency variance); the expenditure variance from the variable overheads spent per hour worked against the standard rate.

### Three answers to the same question

::: cols
**Loses marks**

"Efficiency variance = ₹8,000."

No formula, no hours, no (A).
---
**Passes**

"Efficiency = (SH − AH) × SR = (17,100 − 18,000) × ₹20 = ₹18,000 (A)."

Formula and nature, but on hours paid: the method mark survives, the figure does not.
---
**Full marks**

Working notes for SR, SH and hours worked (18,000 − 500), the three amounts, both variances with (F) or (A), and the check against the cost variance.
:::

## Common mistakes

::: mistake Hall of Shame: the budget that stood in for the standard
"VOH cost variance = budgeted ₹3,60,000 − actual ₹3,57,000 = ₹3,000 (F)." The budget is for 12,000 cartons; the line made 11,400. **Fix:** the cost variance compares actual overheads with the standard for the **actual output**: 11,400 × ₹30 = ₹3,42,000, a variance of ₹15,000 (A).
:::

::: mistake The idle hours that ran up the gas bill
Using the 18,000 hours paid instead of the 17,500 worked in the packing-line example makes the expenditure variance ₹3,000 (F) instead of ₹7,000 (A) and the efficiency variance ₹18,000 (A) instead of ₹8,000 (A): ₹10,000 (500 idle hours × ₹20) changes sides, and the check still balances. **Fix:** the variable overhead formulas use actual hours worked (SM 13.36); idle hours belong to the labour idle time variance only.
:::

::: mistake The actual rate inside the efficiency variance
(SH − AH) × AR mixes two variances. **Fix:** efficiency is always at the **standard** rate; the actual rate appears only in the expenditure variance.
:::

## Practice

::: quiz Check yourself
Q: In June the premix line's variable overheads cost ₹21.50 for each of the 6,400 labour hours worked, against a standard of ₹20 an hour; the output was worth 6,000 standard hours. What is the variable overhead expenditure variance, in rupees (adverse)?
= 9600
> Expenditure = (SR − AR) × AH = (₹20 − ₹21.50) × 6,400 = ₹9,600 (A), the same as AH × SR − actual = ₹1,28,000 − ₹1,37,600. The 400 extra hours are the efficiency variance, (6,000 − 6,400) × ₹20 = ₹8,000 (A); the expenditure variance is measured on the hours actually worked, not the standard hours.

Q: Case scenario. Ritu's budget for the chai premix line was 8,000 units in 16,000 labour hours, with variable overheads of ₹2,40,000. The line made 7,500 units in 15,600 hours, and variable overheads came to ₹2,40,240. Dev reads the draft prepared by Ritu's intern: "Variable overheads were only ₹240 over budget." Which of these is correct?
- [ ] Variable overhead cost variance ₹240 (A)
- [x] Variable overhead expenditure variance ₹6,240 (A); efficiency variance ₹9,000 (A)
- [ ] Variable overhead expenditure variance ₹9,000 (A); efficiency variance ₹6,240 (A)
- [ ] Variable overhead cost variance ₹15,240 (A); efficiency variance ₹6,000 (F)
> SR = ₹2,40,000 ÷ 16,000 = ₹15; SH = 7,500 × 2 = 15,000 hours. Expenditure = 15,600 × ₹15 − ₹2,40,240 = ₹6,240 (A); efficiency = (15,000 − 15,600) × ₹15 = ₹9,000 (A); cost = 7,500 × ₹30 − ₹2,40,240 = ₹15,240 (A). The intern's ₹240 compares actual with the budget for 8,000 units.

Q: Labour efficiency variance is ₹12,000 (A) at a standard wage rate of ₹60 per hour. Variable overheads are absorbed on the same labour hours at ₹15 per hour. What is the variable overhead efficiency variance?
- [ ] ₹48,000 (A)
- [ ] ₹12,000 (A)
- [ ] It cannot be found without the actual variable overheads
- [x] ₹3,000 (A)
> The labour variance gives 12,000 ÷ 60 = 200 extra hours; at ₹15 they cost ₹3,000 (A). Actual overheads are needed for the expenditure variance, not for efficiency.

Q: Why does labour idle time create no variable overhead variance in the Study Material's formulas?
- [ ] Because idle time is always abnormal and goes to costing profit and loss
- [ ] Because the variable overhead rate is lower than the wage rate
- [x] Because variable overhead variances use actual hours worked, and idle hours are not worked
- [ ] Because idle time is included in the standard hours
> The formulas use AH = actual hours worked (SM 13.36). Idle hours are paid, so they enter the labour idle time variance; the Study Material defines no idle time variance for variable overheads. Idle time is not always abnormal (normal idle time exists), and it is never part of the standard hours for output.

Q: Which data are needed to calculate the variable overhead expenditure variance? Select all that apply.
- [x] The actual hours worked
- [x] The standard variable overhead rate per hour
- [x] The actual variable overheads
- [ ] The standard hours for actual output
> Expenditure = (SR × AH) − actual variable overheads. Standard hours for actual output enter the efficiency and cost variances, not the expenditure variance.
:::

## Recap

- VOH cost variance = (SH × SR) − actual VOH: standard for **actual output** minus actual.
- Expenditure (spending) = (SR − AR) × AH = (SR × AH) − actual VOH.
- Efficiency = (SH − AH) × SR: hours, at the **standard** rate.
- Check: expenditure + efficiency = cost.
- SR = budgeted VOH ÷ budgeted hours; SH = budgeted hours ÷ budgeted output × actual output.
- AH = hours **worked**; idle hours give a labour idle time variance, not a VOH variance.
- Basis: labour hours unless the question says machine hours or material (SM 13.36). No hours given: cost variance only, on a rate per unit.
- Fryer month: cheaper gas ₹8,400 (F), slow frying ₹24,000 (A), net ₹15,600 (A).

## Flashcards

Q:: Formula: variable overhead cost variance?
A:: Standard variable overheads for actual production − actual variable overheads, i.e. (SH × SR) − actual VOH.

Q:: Formula: variable overhead expenditure (spending, or budget) variance?
A:: (SR − AR) × AH, or (SR × AH) − (AR × AH): standard variable overheads for actual hours − actual variable overheads.

Q:: Formula: variable overhead efficiency variance?
A:: (SH − AH) × SR: standard variable overheads for production − standard variable overheads for actual hours.

Q:: Verification of variable overhead variances?
A:: VOH cost variance = VOH expenditure variance + VOH efficiency variance.

Q:: Which actual hours do variable overhead variances use?
A:: Actual hours worked (not hours paid); idle hours are excluded.

Q:: Basis for variable overheads when the question says nothing (SM)?
A:: Labour hours. If variable overheads consist of indirect materials, they vary with direct material used; machine hours if they depend on machine running.

Q:: Standard variable overhead rate per hour, and standard hours for actual output?
A:: Rate = budgeted variable overheads ÷ budgeted hours. SH = (budgeted hours ÷ budgeted output) × actual output.

Q:: Only budgeted and actual output and overheads are given, no hours. Which VOH variance can be computed?
A:: Only the cost variance: actual output × standard rate per unit − actual variable overheads.

Q:: Labour efficiency variance ₹12,000 (A) at ₹60 an hour; VOH ₹15 an hour on the same hours. VOH efficiency variance?
A:: ₹3,000 (A): 200 extra hours × ₹15.
