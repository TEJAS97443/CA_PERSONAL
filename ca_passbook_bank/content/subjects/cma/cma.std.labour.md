---
id: cma.std.labour
title: Labour variances, including idle time
minutes: 35
needs: cma.std.setting, cma.std.material
tags: labour cost variance, labour rate variance, labour efficiency variance, idle time variance, labour mix variance, gang variance, labour yield variance
labs:
summary: Why the wage bill differs from the standard: rate on hours paid, idle time at the standard rate, efficiency on hours worked, and efficiency split into mix (gang) and yield.
---

## In plain words

### The night the lights went out

The night shift at Tapri's samosa factory in Indore fries in batches of 100 samosas. The standard for a batch is 2 hours of a skilled fryer and 3 hours of a helper. One October night a five-hour power cut stops the ten fryers and ten helpers on duty, and they wait, paid, in the dark.

> **Kesar:** We paid twenty people to sit in the dark? Cut their wages!
> **Ritu:** The law and the union will both disagree. Per unit, please: the shift still made 400 batches in October. Let me show you where the ₹26,120 went.

Ritu starts where the material lesson starts: the **standard labour cost of the actual output**, the hours 400 batches should take at the standard rates, ₹2,80,000. The wages actually paid were ₹3,06,120. The gap, ₹26,120 adverse, is the **labour cost variance**, and it has three causes.

**Rate**: the fryers were paid ₹210 an hour against a standard of ₹200, the helpers ₹96 against ₹100. **Idle time**: 100 hours were paid but not worked because of the power cut. **Efficiency**: the hours actually worked differed from the hours 400 batches should take. Efficiency itself has two causes: the **mix** of the gang (more fryers, the costlier grade, than the 2 : 3 standard) and the **yield** of the hours worked (the output those hours gave).

The power cut alone cost ₹15,000: a hundred idle hours at the standard rates. Cutting wages would not have bought back the electricity.

::: analogy The taxi on hourly hire
You hire a cab by the hour. The bill can rise because the driver charged more per hour than agreed (rate), because you paid for an hour stuck at a closed toll plaza (idle time), or because the trip took longer than it should (efficiency). And if the company sent a senior driver at a higher rate for a job a junior could do, that is a change in the mix.
:::

::: key
Compare the wages paid with the standard cost of the **actual output**, then explain the gap: rate on the hours **paid**, idle time on the hours paid but not worked, at the standard rate, and efficiency on the hours **worked**, split into mix and yield. The parts add back to the whole.
:::

## How it works

**Labour cost variance** is the difference between the standard labour cost and the actual labour cost incurred for the production achieved (SM 13.25). It arises from a rate different from the standard rate or from hours different from the standard hours, and is divided into a **labour rate variance**, a **labour efficiency variance** and a **labour idle time variance**.

The samosa night shift, step by step. Standard per batch: skilled 2 hours at ₹200, helper 3 hours at ₹100. Actual: 400 batches; skilled 900 hours paid at ₹210, helpers 1,220 hours paid at ₹96; 50 hours of each grade lost to the power cut.

### Six steps from a wage sheet to six variances

::: steps
1. **Standard hours for actual output (SH).** 400 batches × 2 hours = 800 skilled hours; × 3 hours = 1,200 helper hours. Standard cost = 800 × ₹200 + 1,200 × ₹100 = **₹2,80,000**.
2. **Labour cost variance (LCV)** = standard cost − actual cost = ₹2,80,000 − (900 × ₹210 + 1,220 × ₹96 = ₹3,06,120) = **₹26,120 (A)**.
3. **Labour rate variance (LRV)**: the rate difference on the hours **paid**. Skilled (₹200 − ₹210) × 900 = ₹9,000 (A); helpers (₹100 − ₹96) × 1,220 = ₹4,880 (F); total **₹4,120 (A)**.
4. **Idle time variance (ITV)**: the idle hours at the standard rate. Skilled 50 × ₹200 = ₹10,000 (A); helpers 50 × ₹100 = ₹5,000 (A); total **₹15,000 (A)**.
5. **Labour efficiency variance (LEV)**: standard hours against hours **worked** (900 − 50 = 850 and 1,220 − 50 = 1,170), at the standard rate. Skilled (800 − 850) × ₹200 = ₹10,000 (A); helpers (1,200 − 1,170) × ₹100 = ₹3,000 (F); total **₹7,000 (A)**.
6. **Split efficiency with the revised standard hours (RSH)**, the 2,020 hours worked in the standard 2 : 3 ratio: skilled 808, helpers 1,212. **Mix (gang) variance** = (RSH − AH worked) × SR: skilled (808 − 850) × ₹200 = ₹8,400 (A), helpers (1,212 − 1,170) × ₹100 = ₹4,200 (F), total **₹4,200 (A)**. **Yield variance** = (SH − RSH) × SR: skilled (800 − 808) × ₹200 = ₹1,600 (A), helpers (1,200 − 1,212) × ₹100 = ₹1,200 (A), total **₹2,800 (A)**.
:::

Check: rate + idle time + efficiency = ₹4,120 (A) + ₹15,000 (A) + ₹7,000 (A) = ₹26,120 (A), the cost variance; mix + yield = ₹4,200 (A) + ₹2,800 (A) = ₹7,000 (A), the efficiency variance.

::: diagram Where the hours went, by grade
{"type": "plot", "h": 260, "x": [-0.8, 6.8], "y": [0, 1400],
 "xticks": [[0, "std"], [1, "worked"], [2, "paid"], [4, "std"], [5, "worked"], [6, "paid"]],
 "yticks": [[0, "0"], [400, "400"], [800, "800"], [1200, "1,200"]],
 "xlabel": "skilled fryers (left), helpers (right)", "ylabel": "hours",
 "series": [
  {"label": "skilled", "bars": true, "values": true, "color": "a", "pts": [[0, 800], [1, 850], [2, 900]]},
  {"label": "helpers", "bars": true, "values": true, "color": "b", "pts": [[4, 1200, "1,200"], [5, 1170, "1,170"], [6, 1220, "1,220"]]}],
 "caption": "Blue: skilled fryers; teal: helpers. Worked minus standard hours drives the efficiency variance; paid minus worked hours (50 for each grade) is the idle time."}
:::

The variances form a ladder like the material ladder, with one more rung for the idle hours:

::: diagram The labour variance ladder, samosa night shift
{"type": "layers", "w": 430, "layers": [
 {"label": "(1) SH × SR = ₹2,80,000", "note": "standard cost of actual output"},
 {"label": "(2) RSH × SR = ₹2,82,800", "note": "hours worked, in the standard mix", "right": "yield (1) − (2): ₹2,800 (A)"},
 {"label": "(3) AH worked × SR = ₹2,87,000", "note": "hours worked, actual mix", "right": "mix (2) − (3): ₹4,200 (A)"},
 {"label": "(4) AH paid × SR = ₹3,02,000", "note": "hours paid, at standard rates", "right": "idle (3) − (4): ₹15,000 (A)"},
 {"label": "(5) AH paid × AR = ₹3,06,120", "note": "actual wages", "right": "rate (4) − (5): ₹4,120 (A)"}],
 "caption": "Each rung changes one thing from the rung above. A positive difference is favourable, a negative one adverse. Efficiency = (1) − (3) = ₹7,000 (A); cost variance = (1) − (5) = ₹26,120 (A)."}
:::

::: diagram Samosa night shift: the variance tree
{"type": "tree", "root": {"label": "Labour cost\n₹26,120 A", "color": "bad", "children": [
 {"label": "Rate\n₹4,120 A", "color": "bad"},
 {"label": "Efficiency\n₹7,000 A", "color": "bad", "children": [
  {"label": "Mix\n₹4,200 A", "color": "bad"},
  {"label": "Yield\n₹2,800 A", "color": "bad"}]},
 {"label": "Idle time\n₹15,000 A", "color": "bad"}]},
 "caption": "Rose: adverse (A). The three children add up to the cost variance; mix and yield add up to efficiency."}
:::

### Who answers for which variance

- **Rate**: labour rates are generally influenced by external factors beyond the organisation's control; the **personnel manager** is responsible for rate negotiation (SM 13.26).
- **Efficiency**: it may arise from the ability of the workers, an inappropriate team of workers, or inefficiency of the production manager or foreman; the **production manager or foreman** can be held responsible for the adverse variance that could otherwise have been controlled (SM 13.26).
- **Idle time**: abnormal idle time should be analysed into controllable and uncontrollable causes (power failure, breakdown, lack of materials, strikes) so that responsibility can be fixed (SM 3.14).

## Formats and formulas

*Reproduce the formulas and the five-rung ladder from memory.* SH = standard hours for actual output, SR = standard rate, AR = actual rate, RSH = revised standard hours. Hours **paid** and hours **worked** are different numbers whenever there is idle time: write the subscript every time.

::: formula Labour cost variance
$$\text{LCV} = (SH \times SR) - (AH_{\text{paid}} \times AR)$$
The standard labour cost minus the actual labour cost incurred for the production achieved (SM 13.25).
:::

::: formula Labour rate variance
$$\text{LRV} = AH_{\text{paid}} \times (SR - AR)$$
The difference between the standard and actual rate per hour for the actual hours **paid** (SM 13.25).
:::

::: formula Labour idle time variance
$$\text{ITV} = SR \times (AH_{\text{paid}} - AH_{\text{worked}}) \qquad = SR \times \text{Idle hours}$$
The difference between the actual hours paid and the actual hours worked, at standard rate (SM 13.27). Idle hours cannot be negative, so this variance is either nil or adverse.
:::

::: formula Labour efficiency variance
$$\text{LEV} = SR \times (SH - AH_{\text{worked}})$$
The difference between the standard hours specified for actual production and the actual hours **worked**, at standard rate (SM 13.26). The Study Material's middle line of this formula marks AH with the asterisk it uses for hours paid, but its bracket form, its words and its footnote say hours worked, and Illustrations 6 and 7 use hours worked (SM 13.29–13.32): use hours worked.
:::

::: formula Labour mix (gang) variance
$$\text{LMV} = SR \times (RSH - AH_{\text{worked}})$$
:::

::: formula Labour yield (sub-efficiency) variance
$$\text{LYV} = SR \times (SH - RSH)$$
Also called the labour revised-efficiency variance (SM 13.26–13.27).
:::

::: formula Revised standard hours and the checks
RSH of a grade = total hours worked × (that grade's SH ÷ total SH).
$$\text{LCV} = \text{LRV} + \text{ITV} + \text{LEV} \qquad \text{LEV} = \text{LMV} + \text{LYV}$$
With no idle time, LCV = LRV + LEV (SM 13.28).
:::

| Term | Meaning (SM 13.37) |
|---|---|
| Standard hours (SH) | Hours required to produce the actual output |
| Actual hours (AH) | Actual hours taken to produce the actual output |
| Revised standard hours (RSH) | If actual labour hours worked were worked by standard mix (combination) of labour |
| Actual yield (AY) | Actual hours worked |
| Standard yield (SY) | Actual hours if labour worked in standard ratio |
| Standard labour cost (SLC) | Standard labour cost for actual output |

### The working table

| Grade | SH × SR (₹) | RSH × SR (₹) | AH worked × SR (₹) | AH paid × SR (₹) |
|---|---:|---:|---:|---:|
| Skilled | xxx | xxx | xxx | xxx |
| Unskilled | xxx | xxx | xxx | xxx |
| **Total** | **xxx** | **xxx** | **xxx** | **xxx** |

Add a column for AH paid × AR (the actual wages) in a second table or a working note: yield = column 1 − 2, mix = 2 − 3, idle time = 3 − 4, rate = 4 − actual wages.

## Worked examples

:::: example The cold-chain crew that beat the clock
Tapri's cold-chain depot loaded 8,100 crates of frozen samosas in October. The standard wage rate is ₹120 per hour. The crew worked 3,600 hours, with no idle time. Labour efficiency for the month was 112.5% and the labour rate variance ₹18,000 (A).

**Required:**

(i) Calculate the actual wage rate per hour.

(ii) Calculate the standard hours for 8,100 crates.

(iii) Calculate the labour efficiency variance.

(iv) Calculate the standard and the actual labour cost per crate.

(v) Calculate the labour cost variance and verify it.

::: answer Show the working
**(i)** LRV = (SR − AR) × AH: (₹120 − AR) × 3,600 = −₹18,000, so ₹120 − AR = −₹5 and **AR = ₹125 per hour**.

**(ii)** Labour efficiency = standard hours ÷ actual hours × 100 (the efficiency ratio, SM 15.68): 112.5% = SH ÷ 3,600, so **SH = 4,050 hours** (0.5 hour per crate).

**(iii)** LEV = (SH − AH) × SR = (4,050 − 3,600) × ₹120 = **₹54,000 (F)**.

**(iv)** Standard labour cost per crate = 4,050 × ₹120 ÷ 8,100 = **₹60.00**. Actual labour cost per crate = 3,600 × ₹125 ÷ 8,100 = ₹4,50,000 ÷ 8,100 = **₹55.56**.

**(v)** LCV = (SH × SR) − (AH × AR) = ₹4,86,000 − ₹4,50,000 = **₹36,000 (F)**. Check: LEV ₹54,000 (F) + LRV ₹18,000 (A) = ₹36,000 (F). The crew earned ₹5 an hour above standard and more than paid for it with speed.
:::
::::

:::: example Diwali gift boxes: three grades and a breakdown
Kesar's Diwali gift-box line is packed by three grades of workers. The standard labour for one box is:

| Grade | Standard hours per box | Standard rate (₹ per hour) |
|---|---:|---:|
| Skilled | 0.4 | 180 |
| Semi-skilled | 0.6 | 120 |
| Unskilled | 1.0 | 80 |

In October, 5,000 boxes were packed. A conveyor breakdown caused abnormal idle time. The wage records show:

| Grade | Hours paid (including idle) | Abnormal idle hours | Actual rate (₹) | Amount (₹) |
|---|---:|---:|---:|---:|
| Skilled | 2,300 | 100 | 190 | 4,37,000 |
| Semi-skilled | 2,900 | 100 | 115 | 3,33,500 |
| Unskilled | 5,300 | 200 | 84 | 4,45,200 |
| **Total** | **10,500** | **400** | | **12,15,700** |

**Required:**

(a) Calculate the labour cost, rate, idle time, efficiency, mix and yield variances, grade-wise and in total, indicating whether each is favourable (F) or adverse (A), and verify them.

(b) Show the labour rate variance if 800 of the skilled hours had been paid at ₹200 and the remaining 1,500 at ₹185.

::: answer Show the working
**Working notes**

1. SH for 5,000 boxes: skilled 2,000, semi-skilled 3,000, unskilled 5,000; total 10,000 hours (ratio 2 : 3 : 5).
2. Hours worked = hours paid − idle hours: 2,200, 2,800 and 5,100; total 10,100.
3. RSH = 10,100 hours worked in the ratio 2 : 3 : 5: 2,020, 3,030 and 5,050.

| Grade | SH × SR (₹) | RSH × SR (₹) | AH worked × SR (₹) | AH paid × SR (₹) |
|---|---:|---:|---:|---:|
| Skilled | 3,60,000 | 3,63,600 | 3,96,000 | 4,14,000 |
| Semi-skilled | 3,60,000 | 3,63,600 | 3,36,000 | 3,48,000 |
| Unskilled | 4,00,000 | 4,04,000 | 4,08,000 | 4,24,000 |
| **Total** | **11,20,000** | **11,31,200** | **11,40,000** | **11,86,000** |

The actual wages (AH paid × AR) are in the given table: ₹4,37,000, ₹3,33,500, ₹4,45,200; total ₹12,15,700.

**(a) Variances.** Cost = (SH × SR) − (AH paid × AR); rate = (SR − AR) × AH paid; idle time = idle hours × SR; efficiency = (SH − AH worked) × SR; mix = (RSH − AH worked) × SR; yield = (SH − RSH) × SR.

| Variance (₹) | Skilled | Semi-skilled | Unskilled | Total |
|---|---:|---:|---:|---:|
| Cost | 77,000 (A) | 26,500 (F) | 45,200 (A) | **95,700 (A)** |
| Rate | 23,000 (A) | 14,500 (F) | 21,200 (A) | **29,700 (A)** |
| Idle time | 18,000 (A) | 12,000 (A) | 16,000 (A) | **46,000 (A)** |
| Efficiency | 36,000 (A) | 24,000 (F) | 8,000 (A) | **20,000 (A)** |
| Mix | 32,400 (A) | 27,600 (F) | 4,000 (A) | **8,800 (A)** |
| Yield | 3,600 (A) | 3,600 (A) | 4,000 (A) | **11,200 (A)** |

**Check**

- LCV = LRV + ITV + LEV: ₹95,700 (A) = ₹29,700 (A) + ₹46,000 (A) + ₹20,000 (A).
- LEV = LMV + LYV: ₹20,000 (A) = ₹8,800 (A) + ₹11,200 (A).

**(b) Skilled hours at two rates**

| Skilled hours | Working | Rate variance (₹) |
|---|---|---:|
| 800 at ₹200 | (₹180 − ₹200) × 800 | 16,000 (A) |
| 1,500 at ₹185 | (₹180 − ₹185) × 1,500 | 7,500 (A) |
| **Skilled** | | **23,500 (A)** |

Total LRV = ₹23,500 (A) + ₹14,500 (F) + ₹21,200 (A) = **₹30,200 (A)**, against ₹29,700 (A) in (a). The other variances do not change: they are all at standard rates.
:::
::::

:::: example The café fit-out gang
A gang fits out Tapri's new kulhad cafés. The standard gang is 8 skilled workers at ₹250 an hour, 12 semi-skilled at ₹150 and 20 unskilled at ₹100. In one 48-hour week the actual gang was 10 skilled workers at ₹260, 10 semi-skilled at ₹150 and 20 unskilled at ₹96. Two hours of the week were lost for the whole gang when the tiles did not arrive. The gang produced 1,800 standard hours of work.

**Required:** Calculate the labour cost, rate, idle time, efficiency, mix and yield variances, indicating whether each is favourable (F) or adverse (A).

::: answer Show the working
**Working notes**

1. SH: 1,800 standard hours in the standard gang ratio 8 : 12 : 20: skilled 360, semi-skilled 540, unskilled 900.
2. Hours paid = workers × 48: 480, 480 and 960 (1,920). Idle = workers × 2: 20, 20 and 40. Hours worked: 460, 460 and 920 (1,840).
3. RSH = 1,840 hours worked in the ratio 8 : 12 : 20: 368, 552 and 920.

| Variance (₹) | Skilled | Semi-skilled | Unskilled | Total |
|---|---:|---:|---:|---:|
| Cost | 34,800 (A) | 9,000 (F) | 2,160 (A) | **27,960 (A)** |
| Rate | 4,800 (A) | Nil | 3,840 (F) | **960 (A)** |
| Idle time | 5,000 (A) | 3,000 (A) | 4,000 (A) | **12,000 (A)** |
| Efficiency | 25,000 (A) | 12,000 (F) | 2,000 (A) | **15,000 (A)** |
| Mix | 23,000 (A) | 13,800 (F) | Nil | **9,200 (A)** |
| Yield | 2,000 (A) | 1,800 (A) | 2,000 (A) | **5,800 (A)** |

Sample workings, skilled: cost (360 × ₹250) − (480 × ₹260) = ₹90,000 − ₹1,24,800; rate (₹250 − ₹260) × 480; idle 20 × ₹250; efficiency (360 − 460) × ₹250; mix (368 − 460) × ₹250; yield (360 − 368) × ₹250.

Check: ₹960 (A) + ₹12,000 (A) + ₹15,000 (A) = ₹27,960 (A); ₹9,200 (A) + ₹5,800 (A) = ₹15,000 (A). The unskilled share of the gang (20 of 40) was exactly the standard, so its mix variance is nil.
:::
::::

## Under the hood

### Normal and abnormal idle time

Idle time is the time during which workers are paid but no production is carried out (SM 3.13). **Normal idle time** (walking from the gate, the interval between jobs, machine set-up, rest breaks) cannot be avoided; for direct workers an allowance for it is considered in setting the standard hours or the standard rate, so it is already inside the standard. **Abnormal idle time** (lack of co-ordination, power failure, breakdown, non-availability of materials, strikes, lockouts) is excluded from production cost and shown separately in the Costing Profit and Loss Account (SM 3.13–3.14). The Study Material's labour illustrations compute the idle time variance on exactly these abnormal hours: "5% of the time paid being lost due to an abnormal reason" (Illustration 6, SM 13.29), "Actual Idle hours (abnormal)" (Illustration 7, SM 13.31). The full treatment is in [[cma.emp.idle|idle time and overtime]].

### Hours paid at more than one rate

When some hours of a grade are paid at one rate and the rest at another, the rate variance is worked block by block and added, as in Illustration 7(b) (SM 13.33) and part (b) of the gift-box example. Questions also pay "10,000 of these hours at ₹24 and the rest at the standard rate" (MTP January 2025 Series II Q1(b); the Study Material's Practical Problem 5 does the same with 2,500 hours at ₹12, SM 13.60): only those hours carry a rate variance.

### The gang and "standard hours produced"

When a question gives the output as "standard hours produced", that figure is already the SH in total; split it in the standard gang proportion, as Illustration 8 does (SM 13.34). Hours paid are workers × hours in the week.

### Next door

Variable overheads absorbed on labour hours use the same hours: the variable overhead efficiency variance follows the labour efficiency variance on hours worked ([[cma.std.voh|variable overhead variances]]). The material version of the ladder is in [[cma.std.material|material variances]].

## Exam angle

::: exam Where labour variances appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, labour variances were asked in 23 of them: 5 past papers, 5 RTPs and 13 MTPs.

- **Descriptive, 5 to 9 marks**, usually with material variances in the same question. Three grades with abnormal idle time, analysed into mix, efficiency, yield and rate: September 2026 Q4(a) (9 marks; suggested answers not yet published). Two grades, 5% of time paid lost for an abnormal reason: September 2024 Q4(a) (9 marks). Actual rate and standard hours worked back from a rate variance and a labour efficiency of 106.8%: January 2025 Q5(a) (6 marks). Rate and efficiency from budget and actual totals: January 2026 Q4(a) (7 marks); May 2026 Q1(b) (5 marks). Idle time excluded from efficiency: MTP January 2026 Series I Q3(a).
- **Multiple choice, 2 marks each**: actual wage rate per unit when the rate variance is ₹7,500 (A) and efficiency nil (January 2026 MCQ 11, and MTP May 2024 Series I MCQ 3); net hours worked from an idle time variance (RTP September 2024 Case Scenario 2); actual labour cost after 500 idle hours from a power outage (MTP May 2026 Series II MCQ 12); efficiency and yield variances of a two-grade gang (MTP September 2024 Series II MCQ 9).
:::

::: exam The wording traps ICAI used
- "Hours paid (including abnormal idle time)" against "hours worked": the rate variance uses hours paid, the efficiency variance hours worked. RTP September 2024 Case Scenario 2 called the 30,000 hours paid "actual working hours", and its answer took the efficiency variance on them, though it also found 2,000 idle hours; on the Study Material's formula, with the 28,000 hours worked (SM 13.26), it is ₹15,000 (A), not ₹25,000 (A). Write hours worked; in an MCQ whose options match only the hours-paid figure, that is the examiner's reading.
- A rate given for only one grade in a two-grade question (September 2024 Q4(a): semi-skilled paid at standard): that grade's rate variance is nil, not missing.
- "Labour efficiency 106.8%" is standard hours ÷ actual hours × 100 (January 2025 Q5(a)).
:::

::: trick One rung per cause
Hours paid × actual rate → hours paid × standard rate (rate) → hours worked × standard rate (idle time) → revised standard hours × standard rate (mix) → standard hours × standard rate (yield). Each step changes one thing. Condition: every grade's idle hours are known; with none, rungs 3 and 4 are the same amount.
:::

## Answer frame

### A full-marks labour variance answer

1. **Working notes first**: SH for actual output (per grade), hours paid, idle hours and hours worked per grade, actual rates, RSH from total hours worked.
2. **The working table**: SH × SR, RSH × SR, AH worked × SR, AH paid × SR, AH paid × AR per grade, with totals.
3. **Each variance**: formula in symbols with "paid" or "worked" written on the hours, grade-wise figures with (F) or (A), total.
4. **The checks**: LCV = LRV + ITV + LEV; LEV = LMV + LYV.
5. **A comment** when asked: which grade or cause drives the total, and who is responsible (rate: personnel manager; efficiency: production manager or foreman; idle time: by its cause).

### Three answers to the same question

::: cols
**Loses marks**

"Efficiency variance = (SH − hours paid) × SR."

Hours paid used for efficiency, so the idle hours are counted twice; no grade-wise figures.
---
**Passes**

"Efficiency variance = (SH − AH worked) × SR = ₹20,000 (A)."

Right formula and total, but no grade-wise figures and no check against the cost variance.
---
**Full marks**

Working notes, the five-amount table, each variance grade-wise with F or A and in total, and both checks.
:::

## Common mistakes

::: mistake Hall of Shame: the idle hours counted twice
Taking the efficiency variance on hours paid and then adding an idle time variance as well. In the gift-box example, efficiency on hours paid gives ₹11,20,000 − ₹11,86,000 = ₹66,000 (A); with the ₹46,000 (A) of idle time on top, the variances add up to ₹1,41,700 (A), not the ₹95,700 (A) cost variance. **Fix:** efficiency on hours **worked**; idle time on hours paid − hours worked.
:::

::: mistake Rate variance on hours worked
The workers were paid for every hour, idle or not, so the rate difference applies to all the hours paid. **Fix:** LRV = (SR − AR) × AH **paid**.
:::

::: mistake Idle time valued at the actual rate
The idle time variance is at the **standard** rate; the difference between actual and standard rate on the idle hours is already inside the rate variance. **Fix:** ITV = idle hours × SR.
:::

::: mistake RSH from hours paid
Revised standard hours split the hours **worked** in the standard ratio; built from hours paid, the mix and yield no longer add up to the efficiency variance. **Fix:** RSH total = total hours worked.
:::

## Practice

::: quiz Check yourself
Q: A packing team's standard rate is ₹90 an hour. In a week it was paid for 2,400 hours and worked 2,250. What is the idle time variance (adverse), in rupees?
= 13500
> Idle time variance = (hours paid − hours worked) × standard rate = 150 × ₹90 = ₹13,500 (A).

Q: Case scenario. At Tapri's central kitchen, the standard is 0.25 hour of labour per tray of samosas at ₹160 an hour. In March the kitchen made 6,000 trays. Ritu's report shows a labour rate variance of ₹6,000 (A), a labour efficiency variance of nil and no idle time. Kesar wants the actual labour cost per tray. Which figure is correct?
- [ ] ₹40.00
- [x] ₹41.00
- [ ] ₹164.00
- [ ] ₹42.00
> SH = 6,000 × 0.25 = 1,500 hours; efficiency nil, so hours worked = 1,500. LRV: (₹160 − AR) × 1,500 = −₹6,000, so AR = ₹164 an hour. Cost per tray = ₹164 × 0.25 = ₹41. ₹40 is the standard cost per tray; ₹164 is the rate per hour.

Q: Standard hours for the output are 1,000 at ₹100 an hour. Workers were paid for 1,100 hours and worked 1,050; the rest was abnormal idle time. What is the labour efficiency variance?
- [x] ₹5,000 (A)
- [ ] ₹10,000 (A)
- [ ] ₹5,000 (F)
- [ ] ₹15,000 (A)
> LEV = (SH − AH worked) × SR = (1,000 − 1,050) × ₹100 = ₹5,000 (A). ₹10,000 (A) uses hours paid and double-counts the 50 idle hours, which belong in the idle time variance (₹5,000 A).

Q: According to the Study Material, who is responsible for labour rate negotiation, and so for the labour rate variance?
- [ ] The production manager or foreman
- [x] The personnel manager
- [ ] The purchase department
- [ ] The cost accountant
> Labour rates are generally influenced by external factors, but the personnel manager is responsible for rate negotiation (SM 13.26). The production manager or foreman answers for efficiency.

Q: Which of these statements are correct? Select all that apply.
- [x] The idle time variance is valued at the standard rate.
- [x] The labour mix (gang) variance arises from a change in the combination of skilled, semi-skilled and unskilled workers.
- [ ] The labour rate variance is computed on the hours worked.
- [x] Labour efficiency variance = labour mix variance + labour yield variance.
> Rate variance is on hours paid; idle time at standard rate; the mix variance comes from the gang's composition; mix + yield = efficiency (SM 13.26–13.28).
:::

## Recap

- LCV = (SH × SR) − (AH paid × AR): standard cost of the **actual** output minus the wages paid.
- LRV = AH **paid** × (SR − AR); the personnel manager negotiates rates.
- ITV = idle hours × SR = SR × (AH paid − AH worked): nil or adverse.
- LEV = SR × (SH − AH **worked**); the production manager or foreman answers for it.
- LMV (gang) = SR × (RSH − AH worked); LYV (sub-efficiency) = SR × (SH − RSH); RSH = hours worked in the standard ratio.
- Checks: LCV = LRV + ITV + LEV; LEV = LMV + LYV.
- Normal idle time is built into the standard; the idle time variance is for abnormal idle hours. (Cutting wages does not bring the electricity back.)

## Flashcards

Q:: Formula: labour cost variance?
A:: (Standard hours for actual output × standard rate) − (actual hours paid × actual rate).

Q:: Formula: labour rate variance, and which hours does it use?
A:: Actual hours paid × (standard rate − actual rate).

Q:: Formula: labour efficiency variance, and which hours does it use?
A:: Standard rate × (standard hours for actual production − actual hours worked).

Q:: Formula: labour idle time variance?
A:: Standard rate × (actual hours paid − actual hours worked) = standard rate × idle hours.

Q:: Formula: labour mix (gang) variance?
A:: Standard rate × (revised standard hours − actual hours worked).

Q:: Formula: labour yield (sub-efficiency) variance?
A:: Standard rate × (standard hours − revised standard hours).

Q:: What are revised standard hours (RSH)?
A:: The actual hours worked, if worked in the standard mix (combination) of labour.

Q:: Labour variances: the two verification formulas?
A:: LCV = LRV + idle time variance + LEV; LEV = labour mix variance + labour yield variance.

Q:: Who is responsible for the labour rate variance and the labour efficiency variance (SM)?
A:: Rate: the personnel manager, responsible for rate negotiation. Efficiency: the production manager or foreman.

Q:: How is normal idle time of direct workers treated in standard costing?
A:: An allowance for it is considered in setting the standard hours or the standard rate; abnormal idle time is shown separately.

Q:: Formula: labour efficiency (efficiency ratio) as a percentage?
A:: Standard hours for actual output ÷ actual hours worked × 100.
