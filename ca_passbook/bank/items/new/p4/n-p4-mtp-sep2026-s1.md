<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-mtp-sep2026-s1
paper: p4
kind: mtp
attempt: sep2026
series: s1
qfile: new/p4/mtp-sep2026-s1-q.pdf
afile: new/p4/mtp-sep2026-s1-a.pdf
q: 1
accept: 2026, 2026
status: checked
by: tx-01
date: 2026-10-20
note: Mock Test Paper - Series I: July, 2026 (date of paper 31st July 2026). ICAI's question paper prints no choice rule for Part II (six questions of 14 marks each against Part II's 70 marks; no "Question No. 1 is compulsory ..." line on p.1 or p.7), so no choice: is set and the paper cannot be sat as a whole until ICAI's rule is known. Numbers accepted for check.py: the title block that heads p.1 of both files ("Mock Test Paper - Series I: July, 2026 / Date of Paper: 31st July 2026 / Time of Paper: 10 A.M.- 1 P.M." and "PAPER – 4"), which is not transcribed, and the 1 and 2 of ICAI's headings "Case Scenario 1." / "Case Scenario 2", carried by the cases' label: lines. Bullets that ICAI sets in Wingdings arrowheads (Q6(a)) are written as Markdown bullets.
---
#### Instructions
Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/her answer in Hindi will not be evaluated.

Working notes should form part of the answer.

**Time Allowed – 3 Hours** **Maximum Marks – 100**

1. The question paper comprises two parts, Part I and Part II.
2. Part I comprises Case Scenario based Multiple Choice Questions (MCQs) for 30 marks
3. Part II comprises questions which require descriptive type answers for 70 marks.

**PART I – Case Scenario based MCQs**

**Part I is compulsory.**

**Write the most appropriate answer to each of the following multiple-choice questions by choosing one of the four options given. All questions are compulsory.**

---
case: c1
qno: 1-5
label: Case Scenario 1.
q: 1-3
---
#### Case
Aarav Industrial Resins Pvt. Ltd., headquartered in Ghaziabad, is engaged in manufacturing specialty chemicals used in the paints, laminates, and adhesives industry. The company operates a continuous two-stage production system.

The company produces a base intermediate resin called “Phenolic Resin Base” in the first stage. This intermediate product can either:

- Be sold directly to small-scale manufacturers, or
- Be further processed into a higher-grade “Laminated Resin Compound”, which commands a better market price.

Following stage 1 production data and cost data are given for the month just ended:

| | |
|---|---|
| Raw material input | : 2,20,000 kg |
| Opening Work-in-Progress | : 50,000 kg |
| (Materials 100% complete, Conversion 60% complete) | |
| Output transferred/sold | : 1,70,000 kg |
| Closing Work-in-Progress | : 40,000 kg |
| (Materials 100% complete, Conversion 70% complete) | |
| Normal process loss: 20% of Current input | |
| (Loss occurs due to evaporation and chemical reactions; no scrap value) | |

| Particulars | Amount (₹) |
|---|---:|
| Raw Material Cost (Current Month) | 88,000 |
| Conversion Costs (Current Month) | 1,20,000 |
| Opening WIP | |
| – Material | 25,000 |
| – Conversion | 15,000 |

The intermediate product can be sold in the open market at ₹1.80 per kg. Out of the total production, 50,000 kg were sold directly, while 1,20,000 kg were transferred to the second stage for further processing into a higher-grade product.

The further processing details in the Finishing and Compounding Unit are as follows:

In this stage, additional materials such as fillers and additives are introduced, resulting in an output where each kilogram of Phenolic Resin Base yields 2 kilograms of Laminated Resin Compound. The finished product is sold at ₹ 2.40 per kg in the market.

The monthly costs incurred in Process II (other than the cost of Product ‘Phenolic Resin Base’) are:

| Input Quantity (Base Resin) | Material Cost (₹) | Processing Cost (₹) |
|---|---:|---:|
| 1,20,000 kg | 1,50,000 | 1,30,000 |
| 1,60,000 kg (Full Capacity) | 2,00,000 | 1,55,000 |

The management is currently evaluating operational efficiency and profitability decisions based on the above information:

They are particularly interested in determining the cost per unit of the intermediate product, valuation of completed output and work-in-progress, profitability of further processing, and the feasibility of utilizing idle capacity in the second stage.

The finance team has been asked to compute the following requirements (MCQs 1 to 5):

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: B
tags: cma.proc.eu, cma.proc.accounts
difficulty: medium
q: 3
a: 1
---
#### Question
What is the cost per kg of Phenolic Resin Base in Stage 1 using the weighted average cost method?
#### Options
(A) ₹ 0.90
(B) ₹ 1.13
(C) ₹ 1.20
(D) ₹ 1.35
#### Answer
**(B) ₹ 1.13**

**Process – I**

**Statement of Equivalent Production**

| Particulars | Input (Kg.) | Particulars | Output (Kg.) | Material (%) | Material (Kg.) | Conversion (%) | Conversion (Kg.) |
|---|---:|---|---:|---:|---:|---:|---:|
| Opening WIP | 50,000 | Normal Loss | 44,000 | – | – | – | – |
| New Material Introduced | 2,20,000 | Units Completed | 1,70,000 | 100 | 1,70,000 | 100 | 1,70,000 |
| | | Abnormal Loss | 16,000 | 100 | 16,000 | 100 | 16,000 |
| | | Closing WIP | 40,000 | 100 | 40,000 | 70 | 28,000 |
| **Total** | **2,70,000** | **Total** | **2,70,000** | | **2,26,000** | | **2,14,000** |

**Statement of Cost for Each Element**

| Elements of Cost | Opening WIP (₹) | Current Cost (₹) | Total Cost (₹) | Equivalent Units (Kg.) | Cost per Kg. (₹) |
|---|---:|---:|---:|---:|---:|
| Material | 25,000 | 88,000 | 1,13,000 | 2,26,000 | 0.500 |
| Conversion Cost | 15,000 | 1,20,000 | 1,35,000 | 2,14,000 | 0.631 |
| **Total** | **40,000** | **2,08,000** | **2,48,000** | | **1.131** |
#### Approach
Normal loss is 20% of the current input only; compare it with the actual loss to find any abnormal loss, then build the equivalent units for material and conversion separately.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: A
tags: cma.proc.eu
difficulty: medium
q: 3
a: 1
---
#### Question
What is the total value of output completed during the month? (Round off intermittent calculations to three decimal places)
#### Options
(A) ₹ 1,92,270
(B) ₹ 1,78,500
(C) ₹ 2,04,000
(D) ₹ 2,10,000
#### Answer
**(A) ₹ 1,92,270**

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: D
tags: cma.proc.eu
difficulty: medium
q: 3
a: 1-2
---
#### Question
What is the value of closing work-in-progress for the month? (Round off intermittent calculations to three decimal places)
#### Options
(A) ₹ 32,000
(B) ₹ 36,500
(C) ₹ 40,000
(D) ₹ 37,668
#### Answer
**(D) ₹ 37,668**

**Statement of Apportionment of Cost**

| Particulars | Elements | Equivalent Units (Kg.) | Cost per Unit (₹) | Cost (₹) | Total (₹) |
|---|---|---:|---:|---:|---:|
| **Work Completed** | Material | 1,70,000 | 0.500 | 85,000 | |
| | Conversion | 1,70,000 | 0.631 | 1,07,270 | 1,92,270 |
| **Closing WIP** | Material | 40,000 | 0.500 | 20,000 | |
| | Conversion | 28,000 | 0.631 | 17,668 | 37,668 |

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: A
tags: cma.joint.further, cma.mc.decisions
difficulty: medium
q: 3
a: 2
---
#### Question
What is the incremental profit or loss on further processing 1,20,000 kg of Phenolic Resin Base into Laminated Resin Compound?
#### Options
(A) Profit ₹ 80,000
(B) Profit ₹ 48,000
(C) Loss ₹ 24,000
(D) Loss ₹ 12,000
#### Answer
**(A) Profit ₹ 80,000**

Statement Showing Comparative Data

**Alternative I – Sell after Process I**

| Particulars | Amount (₹) |
|---|---:|
| Sales (1,20,000 kg × ₹ 1.80) | 2,16,000 |
| Less: Cost (1,20,000 kg × ₹ 1.131) | 1,35,720 |
| **Profit** | **80,280** |

**Alternative II – Further Processing**

| Particulars | Amount (₹) |
|---|---:|
| Sales (2,40,000 kg × ₹ 2.40) | 5,76,000 |
| Less: Cost from Process I | 1,35,720 |
| Material in Process II | 1,50,000 |
| Processing Cost in Process II | 1,30,000 |
| **Total Cost** | **4,15,720** |
| **Profit** | **1,60,280** |

**Conclusion:**

**Increase in Profit = ₹ 1,60,280 – ₹ 80,280 = ₹ 80,000**
#### Approach
Compare selling 1,20,000 kg at the split point with processing it further (each kg yields 2 kg of the compound), counting only Process II's costs for that input.

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: B
tags: cma.mc.decisions
difficulty: hard
q: 4
a: 2-3
---
#### Question
What is the minimum acceptable selling price per kg of Laminated Resin Compound for additional production using spare capacity?
#### Options
(A) ₹ 1.60
(B) ₹ 1.84
(C) ₹ 2.00
(D) ₹ 2.20
#### Answer
**(B) ₹ 1.84**

**Calculation of Minimum Selling Price**

Cost of processing remaining 40,000 kg. further

| Particulars | Amount (₹) |
|---|---:|
| Additional Material Cost | 50,000 |
| Additional Processing Cost | 25,000 |
| Cost from Process I (40,000 × ₹ 1.131) | 45,240 |
| Opportunity Cost if 40,000 kg. are further processed (40,000 × ₹ 0.669) | 26,760 |
| **Total Cost** | **1,47,000** |

Additional Output (40,000 × 2) = 80,000 kg

Minimum Selling Price per kg = ₹ $\dfrac{1{,}47{,}000}{80{,}000}$ = ₹ 1.84 per kg
#### Approach
The spare capacity is 40,000 kg of input: take the extra Process II costs from the two capacity levels and add what the base resin could have earned if sold instead.

---
case: c2
qno: 6-10
label: Case Scenario 2
q: 4
a: 3-4
---
#### Case
Himalayan Bakers Pvt. Ltd., a mid-sized bakery chain headquartered in Dehradun, produces its signature product "Multigrain Loaf" for retail and hotel supply. Each loaf requires 2.5 kg of Multigrain Flour Mix (MFM) as the key raw material.

Based on a sales forecast prepared by the company's regional sales heads (factoring in new hotel contracts and an upcoming bakery outlet expansion), Himalayan Bakers expects to sell 12,000 units of Multigrain Loaf in the coming financial year.

The purchase manager, Ms. Tanya Bhatt, has compiled the following details regarding MFM from the stores and finance departments:

| Particulars | | Details |
|---|---|---|
| (i) | Re-order Quantity | 280 kg less than the EOQ |
| (ii) | Maximum consumption per day | 25 kg more than the average consumption per day |
| (iii) | Opening stock of MFM | 1,200 kg |
| (iv) | Lead time from suppliers | Minimum 3 days, Maximum 7 days |
| (v) | Purchase price of MFM | ₹ 95 per kg |
| (vi) | Opening stock of finished Multigrain Loaves | 1,100 units |
| (vii) | Bank's Cash Credit interest rate (treated as carrying cost %) | 14.4% per annum |
| (viii) | Documentation/paperwork cost per order | ₹ 540 |

(Assume 364 days in a year for all calculations and also assume that henceforth, the closing stocks are not required.)

You are required to answer the following questions (MCQs 6 to 10)
#### Answer
**Working Notes:**

**(i) Computation of Annual Consumption & Annual Demand for raw material 'MFM':**

| Particulars | Amount |
|---|---:|
| Sales forecast of the product 'Multigrain Loaf' | 12,000 units |
| Less: Opening stock of 'Multigrain Loaf' | 1,100 units |
| Fresh units of 'Multigrain Loaf' to be produced | 10,900 units |
| Raw material required to produce 10,900 units (10,900 units × 2.5 kg.) | 27,250 kg. |
| *Less:* Opening Stock of 'MFM' | 1,200 kg. |
| **Annual demand for raw material 'MFM'** | **26,050 kg.** |

**(ii) Computation of Economic Order Quantity (EOQ)**

EOQ = $\sqrt{\dfrac{2 \,\text{x}\, A \,\text{x}\, O}{C}}$

Where:

- A = Annual demand = 26,050 kg.
- O = Ordering cost = ₹540 per order
- C = Carrying cost per kg p.a. = ₹95 × 14.4% = ₹13.68

EOQ = $\sqrt{\dfrac{2 \,\text{x}\, 26{,}050 \,\text{x}\, 540}{13.68}}$

= $\sqrt{\dfrac{2{,}81{,}34{,}000}{13.68}}$

**EOQ = 1,434 kg. (approx.)**

**(iii) Re-order Level**

= Maximum consumption per day × Maximum lead time

Average Consumption per day = 26,050 kg. ÷ 364 days = 71.57 kg.

Maximum Consumption per day = 71.57 kg. + 25 kg. = 96.57 kg.

= 96.57 kg. × 7 days

**Re-order Level = 676kg. (approx.)**

**(iv) Minimum Consumption per Day of Raw Material 'MFM'**

Average Consumption per day = 71.57 kg.

Since:

Average Consumption = (Min. consumption + Max. consumption) / 2

71.57 kg. = (Min. consumption + 96.57 kg.) / 2

**Minimum Consumption = 143.14 kg. – 96.57 kg. = 46.57 kg.**

---
item: m6
case: c2
qno: 6
marks: 2
type: mcq
key: B
tags: cma.mat.eoq
difficulty: medium
q: 4-5
a: 4
---
#### Question
What is the Re-order Quantity (ROQ) of MFM?
#### Options
(A) 1,434 kg
(B) 1,154 kg
(C) 1,716 kg
(D) 999 kg
#### Answer
**(B) 1,154 kg**

**Re-order Quantity**

= EOQ – 280 kg.

= 1,434 kg. – 280 kg.

**Re-order Quantity = 1,154 kg.**
#### Approach
The annual demand for MFM is net of the opening stocks of both the loaves and the flour mix; compute the EOQ on that demand, then apply the ROQ rule given.

---
item: m7
case: c2
qno: 7
marks: 2
type: mcq
key: A
tags: cma.mat.levels
difficulty: medium
q: 5
a: 4
---
#### Question
What is the Maximum Stock Level of MFM?
#### Options
(A) 1,690 kg
(B) 1,720 kg
(C) 1,217 kg
(D) 699 kg
#### Answer
**(A) 1,690 kg**

**Maximum Stock Level**

= Re-order level + Re-order Quantity – (Minimum consumption per day × Minimum lead time)

= 676 kg. + 1,154 kg. – (46.57 kg. × 3 days)

= 1,830 kg. – 139.71 kg.

**Maximum Stock Level = 1,690 kg. (approx.)**
#### Approach
Minimum daily consumption is not given: derive it from the average and the maximum, then use the re-order level and the re-order quantity.

---
item: m8
case: c2
qno: 8
marks: 2
type: mcq
key: D
tags: cma.mat.levels
difficulty: medium
q: 5
a: 4
---
#### Question
What is the Minimum Stock Level of MFM?
#### Options
(A) 699 kg
(B) 374 kg
(C) 323 kg
(D) 318 kg
#### Answer
**(D) 318 kg**

**Minimum Stock Level**

= Re-order level – (Average consumption per day × Average lead time)

Average lead time = (3+7)/2 = 5 days

= 676 kg. – (71.57 kg. × 5 days)

= 676 kg. – 357.85 kg.

**Minimum Stock Level = 318 kg. (approx.)**

---
item: m9
case: c2
qno: 9
marks: 2
type: mcq
key: B
tags: cma.mat.eoq
difficulty: medium
q: 5
a: 4-5
---
#### Question
What is the total cost of purchase of raw material if the company orders at ROQ?
#### Options
(A) ₹ 25,88,750
(B) ₹ 24,95,063
(C) ₹ 26,09,166
(D) ₹ 27,00,000
#### Answer
**(B) ₹ 24,95,063**

**Total Cost of Purchase of Raw Material if the company orders at ROQ**

- Purchase Cost = 26,050 kg. × ₹ 95 = ₹ **24,74,750**
- No. of orders = 26,050 kg. ÷ 1,154 kg. = 22.57 → **23 orders**
- Ordering Cost = 23 orders × ₹ 540 = ₹ **12,420**
- Average Inventory = 1,154 kg. ÷ 2 = 577 kg.
- Carrying Cost = 577 kg. × ₹ 13.68 = ₹ **7,893**

**Total Cost of Purchase = ₹ 24,74,750 + ₹ 12,420 + ₹ 7,893 = ₹ 24,95,063**

---
item: m10
case: c2
qno: 10
marks: 2
type: mcq
key: A
tags: cma.mat.eoq
difficulty: medium
q: 5
a: 5
---
#### Question
What is the extra annual cost the company bears by ordering at ROQ instead of the true EOQ? (Number of orders should be rounded off to next whole number.)
#### Options
(A) ₹ 244
(B) ₹ 351
(C) ₹ 540
(D) ₹ 695
#### Answer
**(A) ₹ 244**

**Extra Annual Cost of ordering at ROQ instead of the true EOQ**

| | Particulars | When purchasing the ROQ | When purchasing the EOQ |
|---|---|---|---|
| I | Order quantity | 1,154 kg. | 1,434 kg. |
| II | No. of orders a year | 26,050/1,154 = 22.57 → 23 orders | 26,050/1,434 = 18.17 → 19 orders |
| III | Ordering Cost | 23 orders × ₹ 540 = ₹ 12,420 | 19 orders × ₹ 540 = ₹ 10,260 |
| IV | Average Inventory | 1,154/2 = 577 kg. | 1,434/2 = 717 kg. |
| V | Carrying Cost | 577 kg. × ₹ 13.68 = ₹ 7,893 | 717 kg. × ₹ 13.68 = ₹ 9,809 |
| VI | Total Cost | ₹ 20,313 | ₹ 20,069 |

**Extra Cost incurred due to not ordering EOQ = ₹ 20,313 – ₹ 20,069 = ₹ 244**

---
item: m11
qno: 11
marks: 2
type: mcq
key: C
tags: cma.mc.decisions
difficulty: medium
q: 5-6
a: 5
---
#### Question
A company is preparing a quotation for a customised engineering project. The project requires 40 kg of Material P. The company has 200 kg of Material P in stock, originally bought at ₹ 10 per kg.

Material P, if processed further at a cost of ₹ 3 per kg, can be converted into Material Q, which the company currently purchases from the market at ₹ 9 per kg.

What is the relevant cost of using Material P for the new project?
#### Options
(A) ₹40
(B) ₹160
(C) ₹ 240
(D) ₹ 200
#### Answer
**(C) ₹ 240**

Opportunity value of 1 kg of Material P:

Opportunity cost = Purchase Price of Material Q – Processing Cost of Material P

= ₹ 9 - ₹ 3 = ₹ 6 per kg

Relevant cost for 40 kg = 40 kg x ₹ 6 = ₹ 240
#### Approach
The original purchase price is sunk; value Material P at the best use it would otherwise be put to.

---
item: m12
qno: 12
marks: 2
type: mcq
key: C
tags: cma.bud.functional
difficulty: easy
q: 6
a: 5
---
#### Question
A company plans to produce 50,000 units of finished goods during the upcoming budget period. Each finished unit requires 3 units of raw material. At the beginning of the period, the company has 80,000 units of raw material in inventory. By the end of the period, the company wants to increase the raw material inventory to 90,000 units.

Based on this information, calculate how many units of raw material need to be purchased during the budget period.
#### Options
(A) 1,40,000 units
(B) 1,50,000 units
(C) 1,60,000 units
(D) 1,70,000 units
#### Answer
**(C) 1,60,000 units**

Raw material required for production:

= 50,000 × 3

= **1,50,000 units**

Raw material to be purchased

= Required for production + Closing stock – Opening stock

= 1,50,000 + 90,000 – 80,000

= **1,60,000 units**

---
item: m13
qno: 13
marks: 2
type: mcq
key: B
tags: cma.sheet.mfg, cma.intro.classify
difficulty: easy
q: 6
a: 6
---
#### Question
What would be Prime cost from below information?

| | | |
|---|---|---:|
| Direct materials Purchased | : | ₹ 75,000 |
| Direct labour | : | ₹ 45,000 |
| Direct expenses | : | ₹ 15,000 |
| Manufacturing overheads | : | ₹ 22,500 |
| Direct materials consumed | : | ₹ 67,500 |
#### Options
(A) ₹ 1,35,000
(B) ₹ 1,27,500
(C) ₹ 1,57,500
(D) ₹ 1,50,000
#### Answer
**(B) ₹ 1,27,500**

| | | |
|---|---|---:|
| Direct materials consumed | : | ₹ 67,500 |
| Direct labour | : | ₹ 45,000 |
| Direct expenses | : | ₹ 15,000 |
| Prime Cost | | ₹ 1,27,500 |

---
item: m14
qno: 14
marks: 2
type: mcq
key: B
tags: cma.oh.underover
difficulty: easy
q: 6-7
a: 6
---
#### Question
Based on the data below, what is the amount of the overhead under-/over-absorbed?

Budgeted overhead – ₹ 5,25,000

Budgeted machine hours - 17,500

Actual machine hours - 17,040

Actual overheads - ₹ 5,20,000
#### Options
(A) ₹ 5,000 under-absorbed
(B) ₹ 8,800 under-absorbed
(C) ₹ 8,800 over-absorbed
(D) ₹ 5,000 over-absorbed
#### Answer
**(B) ₹ 8,800 under-absorbed**

Actual Overhead – (Actual machine hours × machine hour rate)

5,20,000 – (17040 × 30) = ₹ 8,800 under absorbed

---
item: m15
qno: 15
marks: 2
type: mcq
key: B
tags: cma.bud.flexible, cma.intro.behaviour
difficulty: easy
q: 7
a: 6
---
#### Question
The following extract is taken from the overhead budget of X:

| | | |
|---|---:|---:|
| Budgeted activity | 50% | 75% |
| Budgeted overhead (₹) | 30,00,000 | 40,00,000 |

What would be the budgeted overhead for 60% level of activity:
#### Options
(A) ₹ 32,00,000
(B) ₹ 34,00,000
(C) ₹ 30,00,000
(D) ₹ 36,00,000
#### Answer
**(B) ₹ 34,00,000**

Variable overhead for each % of level of activity

= $\dfrac{40{,}00{,}000-30{,}00{,}000}{75-50}$ = 40,000

Fixed cost = 30,00,000 – (40,000 × 50) = 10,00,000

Total overheads for 60% level of activity

= 10,00,000 + (40,000 × 60) = ₹ 34,00,000

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.emp.payroll, cma.emp.idle
difficulty: medium
q: 7-8
a: 6-7
---
#### Question
Greenfield Apparel Manufacturing Ltd., a garment export unit located in Tirupur, Tamil Nadu, employs a team of skilled tailoring and finishing-line workers. As part of its annual cost audit, the HR and Costing department has been asked to determine the true cost of employing each worker — including hidden costs like idle time, welfare schemes, and statutory contributions — so that pricing for export orders can be set accurately.

The following data has been extracted from the company's payroll and cost records for the year:

| Particulars | | Details |
|---|---|---|
| (i) | Salary (each employee, per month) | ₹ 28,000 |
| (ii) | Bonus | 20% of salary |
| (iii) | Employer's contribution to PF, ESI, etc. | 12% of salary |
| (iv) | Total cost of employees' welfare activities | ₹ 5,28,000 per annum |
| (v) | Total leave permitted during the year | 24 days |
| (vi) | No. of employees | 220 |
| (vii) | Normal idle time | 60 hours per annum |
| (viii) | Abnormal idle time (due to machine breakdown) | 40 hours |
| (ix) | Working days without leave per annum | 312 days of 8 hours |
| (x) | Overtime worked | 100 hours per annum, paid at double the normal hourly rate |

You are required to CALCULATE:

(i) The Annual Cost of each employee

(ii) The Employee Cost per Hour

(iii) The Cost of Abnormal Idle Time per employee, arising from the machine breakdown — information the production manager needs to justify a compensation claim against the equipment supplier

(iv) The Overtime Premium per employee, and whether it should be treated as part of normal employee cost or charged separately.
#### Answer
**(i) Annual Cost of Each Employee**

| | Particulars | ₹ |
|---|---|---:|
| 1. | Salary (₹ 28,000 × 12) | 3,36,000 |
| 2. | Bonus (20% of Salary) | 67,200 |
| 3. | Employer's Contribution to PF, ESI, etc. (12% of Salary) | 40,320 |
| 4. | Employees' Welfare cost (₹ 5,28,000 / 220) | 2,400 |
| | **Total Annual Cost** | **4,45,920** |

**(ii) Employee Cost per Hour**

| Particulars | Hours |
|---|---:|
| Effective Working hours (312 days × 8 hours) | 2,496 |
| *Less:* Leave days (24 days × 8 hours) | 192 |
| **Available Working hours** | **2,304** |
| Less: Normal Idle time | 60 |
| **Net Working Hours** | **2,244** |

Employee cost = ₹ 4,45,920

Employee cost per hour = ₹ 4,45,920 / 2,244 hours = ₹ 198.72

**Employee Cost per hour = ₹ 198.72**

**(iii) Cost of Abnormal Idle Time, per Employee**

= 40 hours × ₹ 198.72 = ₹ 7,948.80

**(iv) Overtime Premium per Employee**

Normal hourly rate = ₹ 198.72 (employee cost per hour, as computed above)

Overtime is paid at double the normal hourly rate.

| Particulars | ₹ |
|---|---:|
| Overtime wages (100 hours × ₹ 198.72 × 2) | 39,744.00 |
| *Less:* Normal wages for those hours (100 hours × ₹ 198.72) | 19,872.00 |
| **Overtime Premium** | **19,872.00** |

**Treatment:** The overtime premium of ₹ 19,872 should generally be charged to Costing Profit & Loss Account as an abnormal/separate cost (i.e., not included as part of normal employee cost) if the overtime arose due to a customer's specific rush order or abnormal circumstances. However, if overtime is a regular feature of production policy (e.g., to meet normal capacity shortfall), the premium is treated as part of normal employee cost and absorbed through the overhead/production cost of the related cost centre.

Since the question does not specify a customer-driven rush order, the overtime premium here is best treated as part of normal employee cost, to be recovered as a factory overhead rather than charged off entirely to Costing P&L.
#### Approach
Build the annual cost first, then the effective hours: working days less leave, less normal idle time. Abnormal idle time and overtime premium are then priced at that hourly cost.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.sheet.mfg
difficulty: hard
q: 8-9
a: 7-8
---
#### Question
Krishna Auto Components Pvt. Ltd., an auto-ancillary unit based in Pune manufacturing precision metal parts for two-wheeler assembly lines, prepares a quarterly cost sheet for internal management review and for pricing discussions with its OEM clients. The cost accountant has compiled the following data for the quarter ending 31st March 2026 and has been asked to present a complete cost sheet — from raw material consumption all the way down to profit — before the upcoming board review.

The following details have been gathered:

| Particulars | | Amount |
|---|---|---:|
| (i) | Direct expenses | ₹ 1,65,000 |
| (ii) | Direct wages, being 180% of factory overheads | ₹ 2,70,000 |
| (iii) | Cost of goods sold | ₹ 17,40,000 |
| (iv) | Selling & distribution overheads | ₹ 52,000 |
| (v) | Sales | ₹ 20,60,000 |
| (vi) | Administration overheads related to production, being 8% of factory overheads | |

**Stock details as per Stock Register:**

| Particulars | 31.12.2025 (₹) | 31.03.2026 (₹) |
|---|---:|---:|
| Raw material | 2,20,000 | 1,95,000 |
| Work-in-progress | 1,55,000 | 1,72,500 |
| Finished goods | 2,90,000 | 2,60,000 |

You are required to PREPARE a Cost Sheet showing:

(i) Raw material consumed

(ii) Prime cost

(iii) Factory cost

(iv) Cost of goods sold

(v) Cost of sales and profit
#### Answer
**Cost Sheet**

**(for the quarter ending 31st March 2026)**

| | | Amount (₹) |
|---|---|---:|
| **(i)** | **Raw materials consumed** | |
| | Opening stock of raw materials | 2,20,000 |
| | *Add:* Purchase of materials\* | 11,05,500 |
| | *Less:* Closing stock of raw materials | (1,95,000) |
| | **Raw materials consumed** | **11,30,500** |
| | *Add:* Direct wages (1,50,000 × 180%) | 2,70,000 |
| | Direct Expenses | 1,65,000 |
| **(ii)** | **Prime cost** | **15,65,500** |
| | *Add:* Factory overheads (2,70,000/180%) | 1,50,000 |
| | Gross Factory cost | 17,15,500 |
| | *Add:* Opening work-in-process | 1,55,000 |
| | *Less:* Closing work-in-process | (1,72,500) |
| **(iii)** | **Factory cost** | **16,98,000** |
| | *Add:* Administration overheads (8% of factory overheads) | 12,000 |
| | *Add:* Opening stock of finished goods | 2,90,000 |
| | *Less:* Closing stock of finished goods | (2,60,000) |
| **(iv)** | **Cost of goods sold** | **17,40,000** |
| | *Add:* Selling & distribution overheads | 52,000 |
| **(v)** | **Cost of sales** | **17,92,000** |
| **Net Profit** | | **2,68,000** |
| Sales | | 20,60,000 |

**\*Purchase of raw materials** = (17,40,000 + 2,60,000 – 2,90,000 – (1,50,000 × 8%) + 1,72,500 – 1,55,000 – (2,70,000 × 100/180) – 1,65,000 – 2,70,000 + 1,95,000 – 2,20,000) = **₹ 11,05,500**

**Working Notes**

1. Purchase of raw materials = Raw material consumed + Closing stock – Opening stock of raw material
2. Raw material consumed = Prime cost – Direct wages – Direct expenses
3. Factory Overheads = 2,70,000 × 100/180 = ₹ 1,50,000
4. Prime cost = Factory cost + Closing WIP – Opening WIP – Factory overheads
5. Factory Cost = Cost of goods sold + Closing stock of Finished goods – Opening stock of finished goods – Administrative overheads
6. Net Profit = Sales – Cost of sales
#### Approach
Work the cost sheet backwards from the cost of goods sold: factory overheads come from the wages relationship, and each stock adjustment is reversed on the way up to raw materials consumed.

---
item: q1c
qno: 1
part: (c)
marks: 4
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: medium
q: 9
a: 9
---
#### Question
M Ltd. has an annual fixed cost of ₹ 28,50,000. In the year 2024-25, sales amounted to ₹ 7,80,60,000 as compared with ₹ 4,80,60,000 in the preceding year 2023-24. The profit in the year 2024-25 is ₹ 37,50,000 more than that in 2023-24.

Required:

(i) CALCULATE Break-even sales of the company;

(ii) DETERMINE profit/ loss on a forecasted sales volume of ₹12,00,00,000.

(iii) If there is a reduction in selling price by 10% in the financial year 2025-26 and company desires to earn the same amount of profit as in 2024-25, WHAT would be the required sales volume?
#### Answer
**(i)** Break-even sales = $\dfrac{\text{Fixed Cost}}{\text{P / V Ratio}}$

P/V Ratio = $\dfrac{\text{Change in Profit}}{\text{Change in Sales}} \times 100$ or,

$\dfrac{\text{₹ 37,50,000}}{\text{₹ 7,80,60,000 - ₹ 4,80,60,000}} \times 100$

Or, $\dfrac{\text{₹37,50,000}}{\text{₹3,00,00,000}} \times 100$ or, 12.5%

Break-even sales = $\dfrac{\text{₹ 28,50,000}}{12.5\%}$ = ₹ 2,28,00,000

(ii) Profit/ loss = Contribution – Fixed Cost

= ₹ 12,00,00,000 × 12.5% - ₹ 28,50,000

= ₹ 1,50,00,000 – ₹ 28,50,000 = ₹ 1,21,50,000

(iii) To earn same amount of profit in 2025-26 as was in 2024-25, it has to earn the same amount of contribution as of 2024-25.

Sales – Variable cost = Contribution equal to 2024-25 contribution

Contribution in 2024-25 = Sales in 2024-25 × P/V Ratio in 2024-25

= ₹ 7,80,60,000 × 12.5% = ₹ 97,57,500

Let the Selling price be ₹100 in 2024-25, then the Variable cost would be ₹ 87.5 and Contribution would be ₹12.5.

(As Contribution is 12.5%, the Variable cost would be 87.5%.)

If there is 10% reduction in Selling price,

New Selling Price = ₹ 90

Variable cost = ₹ 87.5

So, Contribution = ₹ 2.5

New Contribution % = 2.77778% (2.5/90) ×100

Therefore, Sales volume required to earn a profit equals to 2024-25 profit

= ₹ 97,57,500/ 2.77778% = ~₹ 35,12,69,719.
#### Approach
The change in profit over the change in sales gives the P/V ratio; for (iii) keep the contribution of 2024-25 and find the new P/V ratio after the 10% price cut.

---
item: q2a
qno: 2
part: (a)
marks: 7
type: descriptive
tags: cma.job.job, cma.mat.losses
difficulty: medium
q: 9-10
a: 10-11
note: ICAI's job cost sheet labels its rows (ii) Works Cost, (iii) Cost of Production and (iv) Total Cost (no (i)) and prints "Add: Profit (20% of SP or 25% of Cost" without the closing bracket; kept as printed.
---
#### Question
Riya Engineering Works undertakes job work on a contract basis. The following information is available in respect of Job No. 707, which was completed during the month of June:

| Particulars | Details |
|---|---|
| Direct Materials issued | ₹ 45,000 |
| Direct Materials returned to stores | ₹ 3,000 |
| Direct Labour: 250 hours @ ₹ 80 per hour | |
| Direct Expenses | ₹ 6,000 |
| Factory Overhead | 60% of Direct Labour cost |
| Administration Overhead | 10% of Works Cost |
| Selling & Distribution Overhead | 8% of Cost of Production |
| Profit margin desired by the company | 20% on Selling Price |

Additional Information:

Rectification of defective work (additional direct labour of 15 hours @ ₹ 80 per hour, plus direct material of ₹ 1,200, required to rework units rejected at final inspection — defect arose due to a normal, recurring tolerance issue in this type of job)

You are required to:

(i) PREPARE a Job Cost Sheet for Job No. 707, showing Prime Cost, Works Cost (Factory Cost), Cost of Production, and Total Cost.

(ii) CALCULATE the price to be quoted to the customer for Job No. 707, given that profit is desired at 20% on selling price.

(iii) Briefly STATE how your treatment in (i) would differ if the defect had instead arisen due to an abnormal cause (e.g., a one-off machine malfunction).
#### Answer
**Job Cost Sheet for Job No. 707**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Direct Materials issued | 45,000 | |
| Less: Direct Materials returned to stores | (3,000) | |
| Direct Materials consumed | | 42,000 |
| Direct Labour (250 hours × ₹ 80) | | 20,000 |
| Direct Expenses | | 6,000 |
| Prime Cost | | 68,000 |
| *Add:* Factory Overhead (60% of Direct Labour cost) | | 12,000 |
| *Add:* Rectification cost of defective work (normal): | | |
| — Direct material | 1,200 | |
| — Direct labour (15 hours × ₹ 80) | 1,200 | 2,400 |
| (ii) Works Cost (Factory Cost) | | 82,400 |
| *Add:* Administration Overhead (10% of Works Cost) | | 8,240 |
| (iii) Cost of Production | | 90,640 |
| *Add:* Selling & Distribution Overhead (8% of Cost of Production) | | 7,251.20 |
| (iv) Total Cost | | 97,891.20 |
| *Add:* Profit (20% of SP or 25% of Cost | | 24,472.80 |
| Selling Price | | 1,22,364 |

Treatment of rectification cost: Since the defect is stated to be normal for this type of job (a recurring tolerance issue inherent to the work), the rectification cost (₹ 2,400) is charged directly to the job itself, by adding it to the Works Cost / Factory Cost of Job No. 707. It is treated as a normal manufacturing cost specific to this job, since the customer's job benefits from — and should bear the cost of — bringing the units up to the required specification.

(ii) Price to be quoted to the customer for Job No. 707 = ₹ 1,22,364

(iii) Treatment if the Defect Were Abnormal

If the defect had arisen due to an abnormal cause (e.g., a one-off machine malfunction, not expected to recur in the normal course of operations), the treatment would differ as follows:

- The rectification cost of ₹ 2,400 (direct material ₹ 1,200 + direct labour ₹ 1,200) would not be charged to Job No. 707 or included in its Works Cost.
- Instead, it would be treated as an abnormal loss and charged directly to the Costing Profit & Loss Account, since it represents an avoidable, non-recurring inefficiency rather than a cost the customer should bear.
#### Approach
Decide first where the normal rectification cost belongs (to the job, before works cost); a 20% margin on selling price is 25% on total cost.

---
item: q2b
qno: 2
part: (b)
marks: 7
type: descriptive
tags: cma.svc.transport, cma.mc.decisions
difficulty: medium
q: 10-11
a: 11-12
---
#### Question
In a bid to promote regional tourism, the Civil Aviation Ministry has granted Sky Connect Airways Pvt. Ltd. a permit to operate four flights a week between cities P and Q (both directions), as part of its regional connectivity scheme. The airline plans to deploy a single aircraft with a seating capacity of 180 seats. Based on historical data for similar routes, the airline's revenue team estimates a normal occupancy of 65% throughout the year of 52 weeks.

The airline's costing department has compiled the following data to assess the route's profitability and to evaluate a proposed fare-reduction scheme:

| Particulars | Details |
|---|---|
| One-way fare | ₹ 7,800 |
| Fuel cost (variable) | ₹ 1,05,000 per flight |
| Food served on board (non-chargeable basis) | ₹ 140 per passenger |
| Commission | 6% of fare, applicable on all bookings |
| Passenger tax | ₹ 150 per passenger, payable to the airport authority |
| Aircraft lease | ₹ 3,80,000 per flight |
| Landing charges | ₹ 78,000 per flight |
| Ground handling and parking charges | ₹ 45,000 per flight |

You are required to:

(i) CALCULATE the net operating income per flight.

(ii) The airline expects that occupancy will increase to 130 passengers per flight if the fare is reduced to ₹ 7,150. Advise, with supporting calculations, WHETHER this proposal should be implemented.

(iii) CALCULATE the Total Takings per flight for the current bookings (i.e., Net Takings plus Passenger Tax collected), which the finance team needs to report separately to the airport regulatory authority.
#### Answer
**(i) Calculation of Net Operating Income per Flight**

No. of passengers = 180 seats × 65% = 117

| | (₹) | (₹) |
|---|---:|---:|
| Fare collection (117 passengers × ₹ 7,800) | | 9,12,600 |
| Variable costs: | | |
| Fuel | 1,05,000 | |
| Food (117 passengers × ₹ 140) | 16,380 | |
| Commission (6% of ₹ 9,12,600) | 54,756 | |
| Passenger tax (117 passengers × ₹ 150) | 17,550 | 1,93,686 |
| **Contribution per flight** | | **7,18,914** |
| Fixed costs: | | |
| Aircraft Lease | 3,80,000 | |
| Landing charges | 78,000 | |
| Ground handling and parking charges | 45,000 | 5,03,000 |
| **Net income per flight** | | **2,15,914** |

**(ii) Evaluation of Proposal (Fare Reduction to ₹7,150 with 130 Passengers)**

| | (₹) | (₹) |
|---|---:|---:|
| Fare collection (130 passengers × ₹ 7,150) | | 9,29,500 |
| Variable costs: | | |
| Fuel | 1,05,000 | |
| Food (130 passengers × ₹ 140) | 18,200 | |
| Commission (6% of ₹ 9,29,500) | 55,770 | |
| Passenger tax (130 passengers × ₹ 150) | 19,500 | 1,98,470 |
| **Contribution** | | **7,31,030** |

There is an increase in contribution by ₹ 12,116 (i.e., ₹ 7,31,030 – ₹ 7,18,914). **Hence the proposal is acceptable.**

**(iii) Calculation of Total Takings per Flight**

| Particulars | Amount (₹) |
|---|---:|
| Total operating Cost (Variable cost excl. Passenger tax + Fixed cost) | |
| — Variable cost (excl. passenger tax) = 1,93,686 – 17,550 | 1,76,136 |
| — Add: Fixed cost | 5,03,000 |
| **Total Operating Cost** | **6,79,136** |
| Add: Profit (Net income per flight) | 2,15,914 |
| **Net Takings** | **8,95,050** |
| Add: Passenger Tax | 17,550 |
| **Total Takings** | **9,12,600** |
#### Approach
Work per flight: passengers = seats × occupancy; split the costs into those that vary with passengers or fares and those fixed per flight, and judge the fare cut on contribution.

---
item: q3a
qno: 3
part: (a)
marks: 9
type: descriptive
tags: cma.abc.compute, cma.oh.absorb
difficulty: hard
q: 11-12
a: 12-14
note: The question says the number of orders executed is 220; ICAI's answer counts 250 orders (X = 80; Y = 65; Z = 50; W = 55, i.e. output ÷ 10). Both are kept as printed.
---
#### Question
Silver Star Ltd. manufactures four products, namely X, Y, Z, and W using the same plant and process. The following information relates to a production period:

| Product | X | Y | Z | W |
|---|---:|---:|---:|---:|
| Output in units | 800 | 650 | 500 | 550 |
| Cost per unit (₹) | | | | |
| — Direct Material | 50 | 55 | 45 | 60 |
| — Direct Labour | 12 | 10 | 8 | 9 |
| Machine hours/unit | 5 hrs. | 3.5 hrs. | 2.5 hrs. | 1.5 hrs. |

The four products are similar and are usually produced in production runs of 25 units and sold in batches of 10 units. Machine hour rate is currently used to absorb production overheads. The total overheads incurred by the company for the period are as follows:

| Overhead Category | Amount (₹) |
|---|---:|
| Machine operation and maintenance cost | 75,000 |
| Setup costs | 25,000 |
| Store receiving | 18,000 |
| Inspection | 12,000 |
| Material handling and dispatch | 3,500 |

During the period the following cost drivers are to be used for the overhead costs:

| Activity | Cost Driver |
|---|---|
| Setup cost | Number of production runs |
| Store receiving | Requisitions raised |
| Inspection | Number of production runs |
| Material handling and dispatch | Orders executed |

It is also determined that:

- Machine operation and maintenance cost should be apportioned between setup cost, store receiving, and inspection activity in 5:3:2.
- Number of requisitions raised on store is 60 for each product, and the number of orders executed is 220, each order being for a batch of 10 units of a product.

Required:

(i) CALCULATE the total cost of each product, if all overhead costs are absorbed on a machine hour rate basis.

(ii) CALCULATE the total cost of each product using activity-based costing.

(iii) COMMENT briefly on the differences disclosed between overhead allocated by the present system and overhead traced under activity-based costing.
#### Answer
**(i) Overhead Absorption on Machine Hour Basis**

**Statement Showing “Total Cost of Products”**

| Particulars | X (₹) | Y (₹) | Z (₹) | W (₹) |
|---|---:|---:|---:|---:|
| Direct Material | 50.00 | 55.00 | 45.00 | 60.00 |
| Direct Labour | 12.00 | 10.00 | 8.00 | 9.00 |
| Overheads | 79.94 | 55.96 | 39.97 | 23.98 |
| Cost of Production per unit | 141.94 | 120.96 | 92.97 | 92.98 |
| Output in units | 800 | 650 | 500 | 550 |
| Total Cost | 1,13,552.10 | 78,622.75 | 46,485.03 | 51,140.12 |

[8,350 Machine Hours = (800 × 5) + (650 × 3.5) + (500 × 2.5) + (550 × 1.5)]

Total Overheads = 75,000 + 25,000 + 18,000 + 12,000 + 3,500 = 133,500

Rate per hour = 133,500 ÷ 8,350 = ₹15.99 per hour

(Overheads per unit = Rate per hour × Machine hours per unit)

**(ii) Activity Based Costing System**

**Statement Showing “Allocation of Machine Operation and Maintenance Cost”**

| Particulars | Setup (₹) | Receiving (₹) | Inspection (₹) |
|---|---:|---:|---:|
| Machine Operation & Maintenance ₹ 75,000 to be distributed in ratio 5: 3: 2 | 37,500 | 22,500 | 15,000 |

**Now add these apportioned amounts to the activity pools:**

| Activity Pool | Original Cost (₹) | Machine-op apportioned (₹) | Total Activity Cost (₹) |
|---|---:|---:|---:|
| Setup | 25,000 | 37,500 | 62,500 |
| Store Receiving | 18,000 | 22,500 | 40,500 |
| Inspection | 12,000 | 15,000 | 27,000 |
| Material Handling & Dispatch | — | — | 3,500 |

**Statement Showing “Activities / Drivers / Cost”**

| Activity | Cost (₹) | Drivers | Nos | Cost per unit of Driver (₹) |
|---|---:|---|---:|---:|
| Setup | 62,500 | Production Runs | 100 | 625.00 |
| Store Receiving | 40,500 | Requisitions Raised | 240 | 168.75 |
| Inspection | 27,000 | Production Runs | 100 | 270.00 |
| Material Handling and Disp. | 3,500 | Orders | 250 | 14.00 |

**Note:**

Production run size = 25 units.

Production Runs:

X (800/25) = 32

Y (650/25) = 26

Z (500/25) = 20

W (550/25) = 22

(Total = 100)

Requisitions raised = 60 for each product (Total = 240)

Orders executed (batch = 10 units): X = 80; Y = 65; Z = 50; W = 55 (Total = 250)

**Statement Showing “Total Cost of Products”**

| Particulars of Costs | X (₹) | Y (₹) | Z (₹) | W (₹) |
|---|---:|---:|---:|---:|
| Direct Material (Total) | 40,000 | 35,750 | 22,500 | 33,000 |
| Direct Labour (Total) | 9,600 | 6,500 | 4,000 | 4,950 |
| Setup (Runs × 625) | 20,000 | 16,250 | 12,500 | 13,750 |
| Store Receiving (60 × 168.75) | 10,125 | 10,125 | 10,125 | 10,125 |
| Inspection (Runs × 270) | 8,640 | 7,020 | 5,400 | 5,940 |
| Material Handling & Dispatch (Orders × 14) | 1,120 | 910 | 700 | 770 |
| Total Cost | 89,485.00 | 76,555.00 | 55,225.00 | 68,535.00 |
| Cost per unit | 111.86 | 117.78 | 110.45 | 124.61 |

**(iii)**

| Particulars | X (₹) | Y (₹) | Z (₹) | W (₹) |
|---|---:|---:|---:|---:|
| Cost per unit (Traditional) …(a) | 141.94 | 120.96 | 92.97 | 92.98 |
| Cost per unit (ABC) ………..(b) | 111.86 | 117.78 | 110.45 | 124.61 |
| Difference ……………………(b) – (a) | (30.08) | (3.18) | 17.48 | 31.63 |

Comment: The activity-based costing system reallocates overheads to products according to the true cost drivers (setups, requisitions, inspections, orders) rather than solely by machine hours. Under ABC, products X and Y show lower unit costs compared with the machine-hour method (so they were over costed by the traditional method), while products Z and W show higher unit costs (they were under costed by the traditional method). This change can materially affect pricing and product-level profitability — especially for Z and W where ABC raises unit cost significantly.
#### Approach
Under ABC, first reapportion the machine operation cost to the three activity pools in 5:3:2, then count each product's runs, requisitions and orders to charge the pools.

---
item: q3b
qno: 3
part: (b)
marks: 5
type: descriptive
tags: cma.sys.recon
difficulty: medium
q: 12
a: 15
---
#### Question
A manufacturing company has disclosed net loss of ₹ 48,700 as per their cost accounting records for the year ended 31st March, 2026. However, their financial accounting records disclosed net profit of ₹ 35,400 for the same period. A scrutiny of data of both the sets of books of accounts revealed the following information:

| | | (₹) |
|---|---|---:|
| (i) | Factory overheads under absorbed | 30,500 |
| (ii) | Administrative overheads over absorbed | 65,000 |
| (iii) | Depreciation charged in financial accounts | 2,25,000 |
| (iv) | Depreciation charged in cost accounts | 2,70,000 |
| (v) | Income-tax provision | 52,400 |
| (vi) | Transfer fee (credited in financial accounts) | 10,200 |
| (vii) | Obsolescence loss charged in financial accounts | 20,700 |
| (viii) | Notional rent of own premises charged in cost accounts | 54,000 |
| (ix) | Value of opening stock: | |
| | (a) in cost accounts | 1,38,000 |
| | (b) in financial accounts | 1,15,000 |
| (x) | Value of closing stock: | |
| | (a) in cost accounts | 1,22,000 |
| | (b) in financial accounts | 1,12,500 |

Prepare a Memorandum Reconciliation Account by taking costing loss as base.
#### Answer
**Memorandum Reconciliation Accounts**

| Dr. | | | Cr. |
|---|---:|---|---:|
| **Particulars** | **Amount (₹)** | **Particulars** | **Amount (₹)** |
| To Net Loss as per Cost Accounts | 48,700 | By Administration overheads over recovered in Cost Accounts | 65,000 |
| To Factory overheads under absorbed in Cost Accounts | 30,500 | By Depreciation overcharged in Cost Accounts (₹ 2,70,000 – ₹ 2,25,000) | 45,000 |
| To Provision for Income tax | 52,400 | By Transfer fees in Financial Accounts | 10,200 |
| To Obsolescence loss | 20,700 | By Notional Rent of own premises | 54,000 |
| To Overvaluation of closing stock in Cost Accounts\*\* | 9,500 | By Overvaluation of Opening stock in Cost Accounts\* | 23,000 |
| To Net Profit (as per Financial Accounts) | 35,400 | | |
| | 1,97,200 | | 1,97,200 |

\* Overvaluation of Opening Stock as per Cost Accounts

= Value in Cost Accounts – Value in Financial Accounts

= ₹ 1,38,000 – ₹ 1,15,000 = ₹ 23,000.

\*\* Overvaluation of Closing Stock as per Cost Accounts

= Value in Cost Accounts – Value in Financial Accounts

= ₹ 1,22,000 – ₹ 1,12,500 = ₹ 9,500.
#### Approach
Starting from the costing loss, add every item that makes the financial result better than the costing one and deduct every item that makes it worse.

---
item: q4
qno: 4
marks: 14
type: descriptive
tags: cma.std.material, cma.std.labour, cma.std.recon, cma.emp.incentives
difficulty: hard
q: 13
a: 15-17
note: ICAI's answer to (iv) prints "51,200 × 2.5 = 128,00 hrs" (the next line has 128,000); kept as printed.
---
#### Question
Astra Components Pvt. Ltd. is a Tier-2 supplier to the electrical vehicle (EV) industry. The company manufactures a single machined housing component in a single cost centre. Management uses standard costing for control and performance measurement.

The Standard Cost Card for the component is as follows:

Standard — Unit cost (₹)

- Direct material: 6.00 kg @ 5.00 per kg = 30.00
- Direct labour: 2.50 hours @ 4.50 per hour = 11.25
- Factory overhead: 2.00 per labour hour = 5.00
- Total standard manufacturing cost per unit = ₹ 46.25

Budget & actual production activity for the month of June 2025:

- Production scheduled (required completion) for the month: 50,000 units.
- Actual completed units during the month: 51,200 units (no opening or closing WIP).
- Purchases of direct material during the month: 3,20,000 kg at ₹ 5.20 per kg.
- Actual material used in production: 2,96,000 kg.
- Actual direct labour hours worked: 125,000 hours; total labour cost incurred: ₹ 6,40,000.
- Actual total factory overhead incurred during the month: ₹ 2,80,000.
- Sales during the month: 50,000 units.

Selling price policy: Selling price is to be fixed so as to allow a mark-up of 25% on the selling price (i.e., profit = 25% of selling price and standard manufacturing cost per unit should be considered for the same.)

Incentive scheme: The company operates a labour bonus scheme — employees are paid a bonus equal to 60% of the standard direct labour rate for each standard direct labour hour saved (i.e., for hours saved compared to standard hours allowed for actual output).

Required: Using the above data, prepare calculations and reports for June 2025 as follows:

(i) CALCULATE all material variances based on actual material consumption.

(ii) CALCULATE the labour variances (rate and efficiency) and compute the total factory overhead variance.

(iii) PREPARE an Income Statement for June 2025 showing the actual gross margin

(iv) COMPUTE if any bonus is payable under the incentive scheme.
#### Answer
**(i) Material variances:**

(a) Direct Material Cost Variance = Standard Cost – Actual Cost

= (Actual output × Std qty per unit × Std price) – (Actual qty used × Actual price)

= (51,200 units × 6 kg × ₹ 5.00) – (2,96,000 kg × ₹ 5.20)

= ₹ 15,36,000 – ₹ 15,39,200 = ₹ 3,200 (A)

(b) Material Price Variance = Actual Qty used × (Std Price – Actual Price)

= 2,96,000 kg × (₹ 5.00 – ₹ 5.20)

= 2,96,000 × (–₹ 0.20) = ₹ 59,200 (A)

(Material variances are calculated on the basis of consumption)

(c) Material Usage (Quantity) Variance = Std Price × (Std Qty for actual output – Actual Qty used)

= ₹ 5.00 × (51,200 × 6 – 2,96,000)

= ₹ 5.00 × (3,07,200 – 2,96,000)

= ₹ 5.00 × 11,200 = ₹ 56,000 (F)

**(ii) Labour variances and Factory Overhead variance:**

(a) Labour Cost Variance = Standard Cost – Actual Cost

= (Std hrs allowed for actual output × Std rate) – Actual labour cost

Std hrs allowed = 51,200 units × 2.5 hrs = 1,28,000 hrs

= (1,28,000 × ₹ 4.50) – ₹ 6,40,000

= ₹ 5,76,000 – ₹ 6,40,000 = ₹ 64,000 (A)

(b) Labour Rate Variance = Actual Hours × (Std Rate – Actual Rate)

Actual rate = Actual labour cost / Actual hours

= ₹ 6,40,000 / 1,25,000 = ₹ 5.12 / hr

= 1,25,000 × (₹ 4.50 – ₹ 5.12)

= 1,25,000 × (–₹ 0.62) = ₹ 77,500 (A)

(c) Labour Efficiency Variance = Std Rate × (Std Hours – Actual Hours)

= ₹ 4.50 × (128,000 – 125,000)

= ₹ 4.50 × 3,000 = ₹ 13,500 (F)

(d) Total Factory Overhead Variance = Factory Overhead Absorbed – Actual Factory Overhead

Factory overhead absorbed = Actual hours × Std FOH rate

= 1,25,000 × ₹ 2.00 = ₹ 2,50,000

Actual FOH incurred = ₹ 2,80,000

FOH variance = ₹ 2,50,000 – ₹ 2,80,000 = ₹ 30,000 (A)

**(iii) Preparation of Income Statement**

Calculation of unit selling price (markup 25% on selling price ⇒ Selling price = Cost ÷ 0.75)

Standard manufacturing cost per unit = ₹ 46.25 (given)

Selling price per unit = ₹ 46.25 ÷ 0.75 = ₹ 61.67

**Income Statement**

| Particulars | Amount (₹) |
|---|---:|
| Sales (50,000 units × ₹61.6667) | 30,83,333 |
| *Less:* Standard cost of goods sold (50,000 × ₹ 46.25) | 23,12,500 |
| Standard gross margin | 7,70,833 |
| *Less:* Adverse variances: | |
| Material Price variance | 59,200 |
| Labour Rate variance | 77,500 |
| Factory Overhead variance | 30,000 |
| Total Adverse variances | 1,66,700 |
| *Add:* Favourable variances: | |
| Material Usage variance | 56,000 |
| Labour Efficiency variance | 13,500 |
| Total Favourable variances | 69,500 |
| Actual gross margin = 7,70,833 – 1,66,700 + 69,500 | 6,73,633 |

**(iv) Bonus under incentive scheme**

Standard labour hours for actual output = 51,200 × 2.5 = 128,00 hrs

Actual labour hours worked = 125,000 hrs

Labour hours saved = 128,000 − 125,000 = 3,000 hrs

Bonus rate = 60% of standard direct labour rate per hour

= 60% × ₹ 4.50 = ₹2.70 / hr

Bonus payable = Hours saved × ₹2.70

= 3,000 × 2.70 = ₹8,100
#### Approach
Everything is measured against the standard for the actual output of 51,200 units; material variances use the quantity consumed, not the quantity purchased.

---
item: q5a
qno: 5
part: (a)
marks: 10
type: descriptive
tags: cma.bud.functional, cma.emp.idle
difficulty: hard
q: 14-15
a: 18-19
---
#### Question
Kantur Ltd. is a medium-sized manufacturer of precision components used in the automobile aftermarket. The factory runs a single production line where two product variants (Product A and Product B) are made from the same raw material and by the same grade of direct labour. Management is preparing the master budget for the next period and wants the material purchases and direct wages budgets prepared so that procurement and staffing decisions can be finalised.

Below is an extract from the company’s budget working papers (all figures are for the whole budget period unless stated otherwise):

Production & material data

| Particulars | Product A | Product B |
|---|---:|---:|
| Budgeted sales (units) | 2,100 | 2,700 |
| Budgeted material consumption per product (kg) | 6.00 | 2.50 |
| Budgeted material cost | ₹ 14 per kg (for both products) | |
| Standard hours allowed per product | 6.0 | 5.0 |
| Budgeted basic wage rate | ₹ 9 per hour (for all direct workers) | |

Labour / working-time assumptions

- Overtime premium is 60% of the basic wage rate and is payable for any hours worked over 40 hours in a 5-day week.
- There are 48 direct workers available in the budget period.
- The target productivity (efficiency) ratio for productive hours actually used in manufacturing is 85%. In addition, non-productive downtime (set-up, maintenance, unavoidable delays) is budgeted at 15% of the productive hours worked.
- The budget period contains thirteen 5-day weeks and production and it is anticipated that sales and production will occur evenly throughout the whole period.

Opening and desired closing stocks

- Expected opening stocks at the start of the budget period: Product A 600 units; Product B 1,000 units; Raw material 2,800 kg.
- Target closing stocks (expressed in terms of anticipated activity during the budget period):
    - Product A — 18 days’ sales
    - Product B — 22 days’ sales
    - Raw material — 12 days’ consumption

Other assumptions

- Production is planned to meet budgeted sales and to build up / run down stocks to the closing targets stated above.
- Sales and production occur evenly over the budget period (i.e., the daily demand pattern is smooth).

Required

PREPARE the following budgets for the next period showing quantities and values:

1. Material purchases budget.
2. Wages budget for direct workers
#### Answer
**(i) Material Purchase Budget**

**(in quantities and value)**

| Particulars | Total |
|---|---:|
| Material Consumption (Kg.) | |
| A (2,082 units × 6 kg = 12,492) | 12,492 |
| B (2,614 units × 2.5 kg = 6,535) | 6,535 |
| Total | 19,027 |
| *Add:* Closing Balance of Material (Kg.) (W.N. 3) | 3,513 |
| *Less:* Anticipated Opening Balance of Material (Kg.) | 2,800 |
| Total Quantity of Material (Kg.) to be purchased | 19,740 |
| Total Value of Material to be purchased (19,740 kg × ₹ 14) | ₹ 2,76,360 |

**(ii) Direct Workers Wages Budget**

**(Showing hours required and wages paid)**

| Particulars | Total |
|---|---:|
| Standard Hours for Budgeted Production | |
| A (2,082 units × 6 hrs = 12,492) | 12,492 |
| B (2,614 units × 5 hrs = 13,070) | 13,070 |
| Total Standard Hours for Budgeted Production | 25,562 |
| Standard Hours for Budgeted Production at Targeted Efficiency Ratio (W.N. 4) | 30,072.94 |
| *Add:* Non-Productive Downtime (15% × 30,072.94 hours) | 4,510.94 |
| Total Labour Hours Required | 34,583.88 |
| Less: Normal Labour Hours (48 workers × 13 weeks × 5 days × 8 hours) | 24,960 |
| Difference (Overtime hours) | 9,624 |
| Wages for normal hours (24,960 hours × ₹ 9) | ₹ 2,24,640.00 |
| Overtime Wages (9,624 hrs × ₹ 14.40) | ₹ 1,38,585.60 |
| Total Wages | ₹ 3,63,225.60 |

**Working Notes:**

1\. Computation of Closing Stock Balance of Products A and B

Budgeted Period of Sales (In days) = 13 weeks × 5 days = 65 days

Closing stock of Product A (Units) (18 days’ sales)

= $\dfrac{2{,}100}{65}$ × 18 = 582 units

Closing stock of Product B (Units) (22 days’ sales)

= $\dfrac{2{,}700}{65}$ × 22 = 914 units

2\. Production Budget (Units)

| Particulars | Product A | Product B |
|---|---:|---:|
| Sales in units (65 days) | 2,100 | 2,700 |
| Add: Closing Stock (W.N. 1) | 582 | 914 |
| Total | 2,682 | 3,614 |
| Less: Anticipated Opening Balance | 600 | 1,000 |
| Total Number of Units to be produced | 2,082 | 2,614 |

3\. Closing Balance of Material (Kg.)

Total material consumption for production = 12,492 kg (A) + 6,535 kg (B) = 19,027 kg

Daily consumption = $\dfrac{19{,}027}{65}$ = 292.72 kg/day

Closing stock of material (12 days consumption) = 292.72 × 12 = 3,513 kg (rounded up)

4\. Standard Hours for Budgeted Production at targeted 85% efficiency ratio

Total standard hours for production = (2,082 × 6) + (2,614 × 5) = 25,562 hrs

Productive hours required = Standard hours ÷ Efficiency

= $\dfrac{25{,}562}{0.85}$ = 30,072.94 hrs

Non-productive downtime = 15% of productive hours = 0.15 × 30,072.94 = 4,510.94 hrs

Total labour hours required = 30,072.94 + 4,510.94 = 34,583.88 hrs
#### Approach
Start with a production budget (sales plus closing stock less opening stock, closing stock from the days' sales over a 65-day period); material and labour hours follow from production, and hours beyond the workers' normal hours are overtime.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: cma.sheet.mfg, cma.joint.byprod
difficulty: easy
q: 15
a: 19-20
---
#### Question
EXPLAIN the treatment of following items in cost sheet.

(i) Credit for Recoveries

(ii) Packing Cost (primary)

(iii) Joint Products and By-Products Cost

(iv) Quality Control Cost
#### Answer
**Treatment is as follows:**

(i) Credit for Recoveries: The realised or realisable value of scrap or waste is deducted as it reduces the cost of production.

(ii) Packing Cost (primary): Packing material which is essential to hold and preserve the product for its use by the customer is added in the factory cost.

(iii) Joint Products and By-Products: Joint costs are allocated between/among the products on a rational and consistent basis. In case of by-products, the net realisable value of by-products is deducted from the cost of production.

(iv) Quality Control Cost: It is added in the factory cost as this is the cost of resources consumed towards quality control procedures.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.sys.recon
difficulty: easy
q: 15
a: 20-21
---
#### Question
Why is it necessary to reconcile the Profits between the Cost Accounts and Financial Accounts?
#### Answer
When the cost and financial accounts are kept separately, It is imperative that these should be reconciled, otherwise the cost accounts would not be reliable. The reconciliation of two set of accounts can be made, if both the sets contain sufficient detail as would enable the causes of differences to be located. It is therefore, important that in the financial accounts, the expenses should be analysed in the same way as in cost accounts. It is important to know the causes which generally give rise to differences in the costs & financial accounts. These are:

(i) Items included in financial accounts but not in cost accounts

- Income-tax
- Transfer to reserve
- Dividends paid
- Goodwill / preliminary expenses written off
- Pure financial items
- Interest, dividends
- Losses on sale of investments
- Expenses of Co’s share transfer office
- Damages & penalties

(ii) Items included in cost accounts but not in financial accounts

- Opportunity cost of capital
- Notional rent

(iii) Under / Over absorption of expenses in cost accounts

(iv) Different bases of inventory valuation

Motivation for reconciliation is:

- To ensure reliability of cost data
- To ensure ascertainment of correct product cost
- To ensure correct decision making by the management based on Cost & Financial data
- To report fruitful financial / cost data.

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.intro.install
difficulty: easy
q: 15
a: 21
---
#### Question
DISCUSS the essential features of a good cost accounting system?
#### Answer
The essential features which a good Cost Accounting System should possess, are as follows:

(a) Informative and Simple: Cost Accounting System should be tailor-made, practical, simple and capable of meeting the requirements of a business concern. The system of costing should not sacrifice the utility by introducing meticulous and unnecessary details.

(b) Accuracy: The data to be used by the Cost Accounting System should be accurate; otherwise it may distort the output of the system, and a wrong decision may be taken.

(c) Support from Management and subordinates: Necessary cooperation and participation of executives from various departments of the concern is essential for developing a good system of Cost Accounting.

(d) Cost-Benefit: The Cost of installing and operating the system should justify the results.

(e) Procedure: A carefully phased programme should be prepared by using network analysis for the introduction of the system.

(f) Trust: Management should have faith in the Costing System and should also provide a helping hand for its development and success.

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.unit.batch
difficulty: easy
q: 15
a: 21-22
---
#### Question
Pinky Ltd. Produces product A in batches; management of Pinky Ltd. wants to know the number of batches of product A to be produced where the cost incurred on batch setup and carrying cost of production is at optimum level. EXPLAIN.
#### Answer
Economic batch quantity in Batch Costing: In batch costing the most important problem is the determination of ‘Economic Batch Quantity’. The determination of economic batch quantity involves two types of costs viz, (i) set up cost and (ii) carrying cost. With the increase in the batch size, there is an increase in the carrying cost but the set up cost per unit of product is reduced. This situation is reversed when the batch size is reduced. Thus there is one particular batch size for which both set up and carrying costs are minimum. This size of a batch is known as economic or optimum batch quantity.

Economic batch quantity can be determined with the help of table, graph or mathematical formula. The mathematical formula usually used for its determination is as follows:

E.B.Q = $\sqrt{\dfrac{2DS}{C}}$

Where, D= Annual demand for the product

S = Setting up cost per batch

C = Carrying cost per unit of production per annum

---
item: q6c-or
qno: 6
part: (c)
marks: 4
type: descriptive
alt: q6c
tags: cma.oh.absorb
difficulty: easy
q: 15
a: 22
note: ICAI's answer spells "appportioned" in the multiple overhead rate formula; kept as printed.
---
#### Question
EXPLAIN Single and Multiple Overhead Rates.
#### Answer
**Single and Multiple Overhead Rates:** Single overhead rate: It is one single overhead absorption rate for the whole factory.

It may be computed as follows:

Single overhead rate = $\dfrac{\text{Overhead costs for the entire factory}}{\text{Total quantity of the base selected}}$

The base can be total output, total labour hours, total machine hours, etc.

The single overhead rate may be applied in factories which produces only one major product on a continuous basis. It may also be used in factories where the work performed in each department is fairly uniform and standardized.

Multiple overhead rate: It involves computation of separate rates for each production department, service department, cost center and each product for both fixed and variable overheads. It may be computed as follows:

Multiple overhead rate

= $\dfrac{\text{Overhead allocated / appportioned to each department / cost centre or product}}{\text{Corresponding base}}$

Under multiple overheads rate, jobs or products are charged with varying amount of factory overheads depending on the type and number of departments through which they pass. However, the number of overheads rate which a firm may compute would depend upon two opposing factors viz. the degree of accuracy desired and the clerical cost involved.
