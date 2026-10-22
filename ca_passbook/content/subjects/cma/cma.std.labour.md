---
id: cma.std.labour
title: Labour variances, including idle time
minutes: 35
needs: cma.std.setting, cma.std.material
tags: labour cost variance, labour rate variance, labour efficiency variance, idle time variance, labour mix variance, gang variance, labour yield variance
labs: variance
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

::: lab variance {"mode":"labour"}
Grow the labour tree yourself: rate on hours paid, idle time, then efficiency on hours worked and its mix and yield.
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
Tapri's cold-chain depot loaded 8,000 crates of frozen samosas in October. The standard is 0.5 hour per crate at ₹120 an hour. The crew worked 3,200 hours, with no idle time. It is paid ₹120 an hour plus a bonus under the Halsey premium plan: 50% of the time saved against the standard time for the month's output, at the time rate.

**Required:**

(i) Calculate the crew's wages for October and the actual rate per hour.

(ii) Calculate the labour cost, rate and efficiency variances, and verify them.

(iii) Calculate the standard and the actual labour cost per crate.

(iv) Kesar wants to move the crew to the Rowan premium plan. Calculate the labour rate variance and the actual labour cost per crate under it, and explain why an incentive bonus appears as an adverse rate variance.

::: answer Show the working
**Working notes**

1. Standard hours for 8,000 crates = 8,000 × 0.5 = **4,000 hours**; time saved = 4,000 − 3,200 = 800 hours. Labour efficiency = SH ÷ AH × 100 = 4,000 ÷ 3,200 × 100 = 125% (the efficiency ratio, SM 15.68).
2. Halsey earnings = time taken × time rate + 50% of time saved × time rate (SM 3.28).

**(i)** Wages = 3,200 × ₹120 + 50% × 800 × ₹120 = ₹3,84,000 + ₹48,000 = **₹4,32,000**. Actual rate = ₹4,32,000 ÷ 3,200 = **₹135 an hour**.

**(ii)**

- LRV = (SR − AR) × AH = (₹120 − ₹135) × 3,200 = **₹48,000 (A)**.
- LEV = (SH − AH) × SR = (4,000 − 3,200) × ₹120 = **₹96,000 (F)**.
- LCV = (SH × SR) − (AH × AR) = ₹4,80,000 − ₹4,32,000 = **₹48,000 (F)**. Check: ₹96,000 (F) + ₹48,000 (A) = ₹48,000 (F).

**(iii)** Standard labour cost per crate = 0.5 × ₹120 = **₹60.00**; actual = ₹4,32,000 ÷ 8,000 = **₹54.00**.

**(iv) Rowan plan.** Bonus = time saved ÷ time allowed × time taken × rate (SM 3.29–3.30) = 800 ÷ 4,000 × 3,200 × ₹120 = ₹76,800. Wages = ₹3,84,000 + ₹76,800 = ₹4,60,800; actual rate = ₹144 an hour.

| Particulars | Halsey | Rowan |
|---|---:|---:|
| Bonus (₹) | 48,000 | 76,800 |
| Actual rate per hour (₹) | 135 | 144 |
| Labour rate variance (₹) | 48,000 (A) | 76,800 (A) |
| Labour efficiency variance (₹) | 96,000 (F) | 96,000 (F) |
| Labour cost variance (₹) | 48,000 (F) | 19,200 (F) |
| Actual labour cost per crate (₹) | 54.00 | 57.60 |

The standard rate is the time rate, so any bonus paid for speed lifts the actual rate above it and shows as an adverse rate variance; the speed itself shows as the favourable efficiency variance. Under the Halsey plan the bonus is always half the saving at the time rate, so here the rate variance is exactly 50% of the efficiency variance and Tapri keeps the other half. Under the Rowan plan, with time saved only 20% of time allowed, the crew takes 80% of the saving (₹76,800 of ₹96,000) and Tapri keeps ₹19,200. Read alone, the adverse rate variance would wrongly blame rate negotiation: it is the agreed price of the incentive.
:::
::::

:::: example Diwali gift boxes: the night the conveyor stopped
Kesar's Diwali gift-box line has a standard packing team of 1 skilled packer (₹180 an hour), 2 semi-skilled packers (₹120 an hour) and 3 unskilled helpers (₹80 an hour), which packs 30 boxes an hour. In October the line packed 45,000 boxes. One night the conveyor broke down and the line stood still for 12 hours while 4 skilled, 8 semi-skilled and 12 unskilled workers were on duty; the clock cards record the stoppage as idle time. The wage sheet for October:

| Grade | Hours paid | Wages paid (₹) |
|---|---:|---:|
| Skilled | 1,748 | 3,23,380 |
| Semi-skilled | 2,916 | 3,44,088 |
| Unskilled | 4,144 | 3,48,096 |
| **Total** | **8,808** | **10,15,564** |

**Required:**

(a) Calculate the labour cost, rate, idle time, efficiency, mix and yield variances, grade-wise and in total, indicating whether each is favourable (F) or adverse (A), and verify them.

(b) The supervisor ran the line with more skilled packers than the standard team because the Diwali boxes need ribbon work. Kesar says the change cost Tapri money. Using the variances, say who is right, and name who answers for the rate and the efficiency variances.

::: answer Show the working
**Working notes**

1. Team hours for 45,000 boxes = 45,000 ÷ 30 = 1,500. SH = team hours × workers of each grade: skilled 1,500, semi-skilled 3,000, unskilled 4,500; total 9,000 (ratio 1 : 2 : 3).
2. Idle hours = workers on duty × 12: skilled 48, semi-skilled 96, unskilled 144 (288). Hours worked = hours paid − idle: 1,700, 2,820 and 4,000 (8,520).
3. Actual rates = wages ÷ hours paid: ₹185, ₹118 and ₹84.
4. RSH = 8,520 hours worked in the ratio 1 : 2 : 3: 1,420, 2,840 and 4,260.

| Grade | SH × SR (₹) | RSH × SR (₹) | AH worked × SR (₹) | AH paid × SR (₹) |
|---|---:|---:|---:|---:|
| Skilled | 2,70,000 | 2,55,600 | 3,06,000 | 3,14,640 |
| Semi-skilled | 3,60,000 | 3,40,800 | 3,38,400 | 3,49,920 |
| Unskilled | 3,60,000 | 3,40,800 | 3,20,000 | 3,31,520 |
| **Total** | **9,90,000** | **9,37,200** | **9,64,400** | **9,96,080** |

The actual wages (AH paid × AR) are in the wage sheet: total ₹10,15,564.

**(a) Variances.** Cost = (SH × SR) − (AH paid × AR); rate = (SR − AR) × AH paid; idle time = idle hours × SR; efficiency = (SH − AH worked) × SR; mix = (RSH − AH worked) × SR; yield = (SH − RSH) × SR.

| Variance (₹) | Skilled | Semi-skilled | Unskilled | Total |
|---|---:|---:|---:|---:|
| Cost | 53,380 (A) | 15,912 (F) | 11,904 (F) | **25,564 (A)** |
| Rate | 8,740 (A) | 5,832 (F) | 16,576 (A) | **19,484 (A)** |
| Idle time | 8,640 (A) | 11,520 (A) | 11,520 (A) | **31,680 (A)** |
| Efficiency | 36,000 (A) | 21,600 (F) | 40,000 (F) | **25,600 (F)** |
| Mix | 50,400 (A) | 2,400 (F) | 20,800 (F) | **27,200 (A)** |
| Yield | 14,400 (F) | 19,200 (F) | 19,200 (F) | **52,800 (F)** |

**Check**

- LCV = LRV + ITV + LEV: ₹25,564 (A) = ₹19,484 (A) + ₹31,680 (A) + ₹25,600 (F).
- LEV = LMV + LYV: ₹25,600 (F) = ₹27,200 (A) + ₹52,800 (F).

**(b) Who is right.** The supervisor, on the gang. The richer gang shows as an adverse mix variance of ₹27,200, but the line packed 45,000 boxes with 8,520 hours worked against a standard of 9,000: a yield variance of ₹52,800 (F), so the gang change earned a net favourable efficiency variance of ₹25,600. The adverse total comes from the conveyor (idle time ₹31,680 (A), to be traced to its cause, here maintenance) and from wage rates (₹19,484 (A)). The personnel manager is responsible for rate negotiation and the production manager or foreman for efficiency (SM 13.26).
:::
::::

:::: example The café fit-out gang: who was on site?
Tapri hires a contractor's gang to fit out its new kulhad cafés. The contract fixes the gang at 4 masons and 6 helpers and the hourly rates at ₹260 for a mason and ₹96 for a helper; Tapri's standard rates are ₹250 and ₹100, for the same gang of 4 : 6. Last week's site register and the contractor's bill were lost in the rain. Ritu's notes survive: 10 workers were paid for a 48-hour week; the whole gang stood idle for 2 hours when the tiles came late; the work done was 400 standard hours; and the labour mix (gang) variance was ₹6,900 (A).

**Required:**

(i) Find the number of masons and helpers on site.

(ii) Calculate the labour cost, rate, idle time, efficiency and yield variances, indicating whether each is favourable (F) or adverse (A), and verify them.

(iii) Did the contractor keep to the agreed gang, and what did the change cost Tapri on the week's bill?

::: answer Show the working
**Working notes**

1. Hours paid = 10 × 48 = 480; idle = 10 × 2 = 20; hours worked = 460.
2. RSH = 460 hours worked in the ratio 4 : 6: masons 184, helpers 276. SH = 400 standard hours in the same ratio: masons 160, helpers 240.

**(i) The gang.** Let the masons' hours worked be M, so the helpers' are 460 − M. Mix = (RSH − AH worked) × SR:

$$(184 - M) \times 250 + (276 - (460 - M)) \times 100 = -6{,}900 \qquad 27{,}600 - 150M = -6{,}900 \qquad M = 230$$

Each worker worked 46 hours, so masons = 230 ÷ 46 = **5** and helpers = (460 − 230) ÷ 46 = **5**.

**(ii) Variances.** Masons: paid 240 hours, worked 230, idle 10; helpers the same.

| Variance (₹) | Masons | Helpers | Total |
|---|---:|---:|---:|
| Cost: (SH × SR) − (AH paid × AR) | 22,400 (A) | 960 (F) | **21,440 (A)** |
| Rate: (SR − AR) × AH paid | 2,400 (A) | 960 (F) | **1,440 (A)** |
| Idle time: idle hours × SR | 2,500 (A) | 1,000 (A) | **3,500 (A)** |
| Efficiency: (SH − AH worked) × SR | 17,500 (A) | 1,000 (F) | **16,500 (A)** |
| Mix: (RSH − AH worked) × SR (given) | 11,500 (A) | 4,600 (F) | **6,900 (A)** |
| Yield: (SH − RSH) × SR | 6,000 (A) | 3,600 (A) | **9,600 (A)** |

Workings, masons: cost 160 × ₹250 − 240 × ₹260 = ₹40,000 − ₹62,400; efficiency (160 − 230) × ₹250; yield (160 − 184) × ₹250. Check: ₹1,440 (A) + ₹3,500 (A) + ₹16,500 (A) = ₹21,440 (A); ₹6,900 (A) + ₹9,600 (A) = ₹16,500 (A).

**(iii)** No: the contractor sent 5 masons and 5 helpers, one helper replaced by a mason. At standard rates the change is the mix variance of ₹6,900 (A); on the bill it costs 48 hours × (₹260 − ₹96) = ₹7,872 more than the agreed gang (₹85,440 against ₹77,568). The extra mason did not speed the work up: the gang still produced only 400 standard hours from 460 hours worked (yield ₹9,600 (A)).
:::
::::

::: lab variance {"mode":"labour","out":1800,"lStdOut":50,"lStd":[["Skilled",32,3],["Semi-skilled",12,2],["Unskilled",6,1]],"lAct":[["Skilled",1120,0,4],["Semi-skilled",720,0,3],["Unskilled",160,0,2]]}
Another gang to step through: Study Material Illustration 8, a gang of 50 working a 40-hour week, grade by grade.
:::

## Under the hood

### Normal and abnormal idle time

Idle time is the time during which workers are paid but no production is carried out (SM 3.13). **Normal idle time** (walking from the gate, the interval between jobs, machine set-up, rest breaks) cannot be avoided; for direct workers an allowance for it is considered in setting the standard hours or the standard rate, so it is already inside the standard. **Abnormal idle time** (lack of co-ordination, power failure, breakdown, non-availability of materials, strikes, lockouts) is excluded from production cost and shown separately in the Costing Profit and Loss Account (SM 3.13–3.14). The Study Material's labour illustrations compute the idle time variance on exactly these abnormal hours: "5% of the time paid being lost due to an abnormal reason" (Illustration 6, SM 13.29), "Actual Idle hours (abnormal)" (Illustration 7, SM 13.31). The full treatment is in [[cma.emp.idle|idle time and overtime]].

### Hours paid at more than one rate

When some hours of a grade are paid at one rate and the rest at another, the rate variance is worked block by block and added, as in Illustration 7(b) (SM 13.33). Questions also pay "10,000 of these hours at ₹24 and the rest at the standard rate" (MTP January 2025 Series II Q1(b); the Study Material's Practical Problem 5 does the same with 2,500 hours at ₹12, SM 13.60): only those hours carry a rate variance.

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

"Efficiency variance = (SH − AH worked) × SR = ₹25,600 (F)."

Right formula and total, but no grade-wise figures and no check against the cost variance.
---
**Full marks**

Working notes, the five-amount table, each variance grade-wise with F or A and in total, and both checks.
:::

## Common mistakes

::: mistake Hall of Shame: the idle hours counted twice
Taking the efficiency variance on hours paid and then adding an idle time variance as well. In the gift-box example, efficiency on hours paid gives ₹9,90,000 − ₹9,96,080 = ₹6,080 (A); with the ₹31,680 (A) of idle time and the ₹19,484 (A) rate variance on top, the variances add up to ₹57,244 (A), not the ₹25,564 (A) cost variance, and a favourable efficiency of ₹25,600 has turned adverse. **Fix:** efficiency on hours **worked**; idle time on hours paid − hours worked.
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

Q: Case scenario. Tapri's two central kitchens each made 6,000 trays of samosas in March, against a standard of 0.25 hour per tray at ₹160 an hour, with no idle time. Indore paid ₹168 an hour and worked exactly the standard hours. Bhopal paid ₹160 an hour and worked 1,575 hours. Kesar asks Ritu which kitchen did worse. Which statement is correct?
- [ ] Indore's labour cost variance is ₹12,000 (A) and Bhopal's is nil, because Bhopal paid the standard rate
- [ ] Both kitchens have a labour efficiency variance of ₹12,000 (A)
- [x] Both have a labour cost variance of ₹12,000 (A) and a labour cost of ₹42 a tray, but Indore's is a rate variance (personnel manager) and Bhopal's an efficiency variance (production manager or foreman)
- [ ] Bhopal's labour cost is ₹40 a tray, the standard, because it paid the standard rate
> SH = 6,000 × 0.25 = 1,500 hours; standard cost ₹2,40,000 (₹40 a tray). Indore: 1,500 × ₹168 = ₹2,52,000; LRV = (₹160 − ₹168) × 1,500 = ₹12,000 (A); LEV nil. Bhopal: 1,575 × ₹160 = ₹2,52,000; LRV nil; LEV = (1,500 − 1,575) × ₹160 = ₹12,000 (A). Same ₹42 a tray, different causes and different people responsible (SM 13.26).

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
