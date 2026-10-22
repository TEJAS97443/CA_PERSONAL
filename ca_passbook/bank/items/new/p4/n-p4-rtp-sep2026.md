<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-rtp-sep2026
paper: p4
kind: rtp
attempt: sep2026
qfile: new/p4/rtp-sep2026-qa.pdf
afile: new/p4/rtp-sep2026-qa.pdf
status: checked
by: bank-core
date: 2026-10-20
note: Pilot transcription. p.1 prints the paper's title "PAPER – 4: COST AND MANAGEMENT ACCOUNTING" (the 4 that check.py accepts). ICAI prints Part I (case scenario MCQs, Q1-Q4) and Part II (descriptive, Q5-Q16) with no marks, as every RTP. Part II carries ICAI's chapter headings (Material Cost, Employee Cost and Direct Expenses, ...) before the questions; they are headings, not question text, and are not transcribed.
---

---
case: c1
qno: 1
q: 1-3
a: 20-21
---
#### Case
Apex Mobility Systems Ltd. manufactures smart airport luggage carts used in major international airports. The company operates a centralized factory with two production departments—Fabrication and Assembly, and two service departments—Stores and Maintenance.

Due to rising operational costs and increased competition, management has decided to analyze overhead allocation and costing accuracy for better pricing and profitability decisions.

For the financial year ending 31st March 2026, the following budgeted data is available:

**Allocated Overhead Costs (₹)**

| Department | Amount (₹) |
|---|---:|
| Fabrication | 18,20,000 |
| Assembly | 9,60,000 |
| Stores | 3,00,000 |
| Maintenance | 2,40,000 |

**Other Overheads (₹)**

| Particulars | Amount (₹) |
|---|---:|
| Factory Rent | 18,00,000 |
| Building Insurance | 2,00,000 |
| Plant Insurance | 2,40,000 |
| Depreciation on Machinery | 3,20,000 |
| Canteen Subsidy | 5,00,000 |

**Direct Costs (₹)**

| Department | Material (₹) | Labour (₹) | Total (₹) |
|---|---:|---:|---:|
| Fabrication | 75,00,000 | 10,00,000 | 85,00,000 |
| Assembly | 2,00,000 | 15,00,000 | 17,00,000 |

**Additional Information**

| Basis | Fabrication | Assembly | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Floor area (sq. m.) | 30,000 | 12,000 | 3,000 | 5,000 |
| Plant value (₹) | 20,00,000 | 10,00,000 | 1,00,000 | 2,00,000 |
| Store requisitions | 4,000 | 2,000 | — | — |
| Maintenance hours | 3,000 | 2,500 | 500 | — |
| No. of employees | 150 | 100 | 40 | 20 |
| Machine hours | 35,00,000 | 80,000 | — | — |
| Labour hours | 80,000 | 30,00,000 | — | — |

The company also received a **special job order (Job No. AMS-101)** with the following details:

- Direct Material = ₹ 1,50,000
- Direct Labour:
    - Fabrication: 300 hours @ ₹ 20/hr
    - Assembly: 200 hours @ ₹ 20/hr
- Machine hours:
    - Fabrication: 250 hours
    - Assembly: 180 hours

You are required to answer the following questions:
#### Answer
**Working Note:**

**Table of Primary Distribution of Overheads and Direct Costs**

| Particulars | Basis of Apportionment | Total Amount | Production Department | | Service Departments | |
|---|---|---:|---:|---:|---:|---:|
| | | | **Fabrication** | **Assembly** | **Stores** | **Maintenance** |
| Overheads Allocated | Allocation | 33,20,000 | 18,20,000 | 9,60,000 | 3,00,000 | 2,40,000 |
| Direct Costs | Actual | 1,02,00,000 | 85,00,000 | 17,00,000 | --- | --- |
| Total | | | 1,03,20,000 | 26,60,000 | 3,00,000 | 2,40,000 |

**Other Overheads**

| Particulars | Basis | Total (₹) | Fabrication | Assembly | Stores | Maintenance |
|---|---|---:|---:|---:|---:|---:|
| Factory Rent | Floor Area (30:12:3:5) | 18,00,000 | 10,80,000 | 4,32,000 | 1,08,000 | 1,80,000 |
| Building Insurance | Floor Area | 2,00,000 | 1,20,000 | 48,000 | 12,000 | 20,000 |
| Plant Insurance | Plant Value (20:10:1:2) | 2,40,000 | 1,45,455 | 72,727 | 7,273 | 14,545 |
| Depreciation | Plant Value | 3,20,000 | 1,93,939 | 96,970 | 9,697 | 19,394 |
| Canteen Subsidy | Employees (150:100:40:20) | 5,00,000 | 2,41,935 | 1,61,290 | 64,516 | 32,258 |
| Total | | 30,60,000 | 17,81,329 | 8,10,987 | 2,01,486 | 2,66,197 |

**Total after Primary Distribution**

| Particulars | Total (₹) | Fabrication | Assembly | Stores | Maintenance |
|---|---:|---:|---:|---:|---:|
| Total Overheads | 63,80,000 | 36,01330 | 17,70,987 | 5,01,486 | 5,06,197 |

**Re-distribution of Service Departments’ Expenses (Step Method)**

| Particulars | Basis of Apportionment | Production Department | | Service Departments | |
|---|---|---:|---:|---:|---:|
| | | **Fabrication** | **Assembly** | **Stores** | **Maintenance** |
| Overheads as per Primary distribution | As per Primary distribution | 36,01,330 | 17,70,987 | 5,01,486 | 5,06,197 |
| Maintenance Department Cost | Maintenance Hours (30:25:5:-) | 2,53,099 | 2,10,915 | 42,183 | (5,06,197) |
| | | 38,54,429 | 19,81,902 | 5,43,669 | --- |
| Stores Department | No. of Stores Requisition (5:2:-:-) | 3,88,335 | 1,55,334 | (5,43,669) | |
| | | 42,42,764 | 21,37,236 | --- | --- |

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: B
tags: cma.oh.secondary, cma.oh.primary
difficulty: medium
q: 3
a: 21
---
#### Question
Total overhead allocated from Stores Department to production Department is:
#### Options
(A) ₹ 2,53,099
(B) ₹ 5,43,669
(C) ₹ 5,06,197
(D) ₹ 5,01,486
#### Answer
**(B) ₹ 5,43,669**

Total overhead allocated from Stores Department

= ₹ 5,43,669
#### Approach
Finish the primary distribution first, then close the service departments by the step method: Maintenance serves Stores, so it is closed before Stores.

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: C
tags: cma.oh.secondary, cma.oh.primary
difficulty: medium
q: 3
a: 21
---
#### Question
Total overhead allocated from Maintenance Department to other Department is:
#### Options
(A) ₹ 5,43,669
(B) ₹ 5,01,486
(C) ₹ 5,06,197
(D) ₹ 42,186
#### Answer
**(C) ₹ 5,06,197**

Total overhead allocated from Maintenance Department

= ₹ 5,06,197

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: A
tags: cma.oh.absorb
difficulty: medium
q: 3
a: 21
---
#### Question
Most appropriate overhead recovery rate for Fabrication Department is:
#### Options
(A) ₹ 1.21 per machine hour
(B) ₹ 12 per machine hour
(C) ₹ 20 per machine hour
(D) ₹ 4.56 per machine hour
#### Answer
**(A) ₹ 1.21 per machine hour**

**Overhead Recovery Rate - Fabrication Department**

Basis: Machine Hours = 35,00,000

Rate = 42,42,764/35,00,000 = ₹ 1.21 per machine hour
#### Approach
Fabrication runs on machines (35,00,000 machine hours against 80,000 labour hours), so its overheads are absorbed per machine hour.

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: D
tags: cma.oh.absorb
difficulty: medium
q: 3
a: 21
---
#### Question
Most appropriate overhead recovery rate for Assembly Department is:
#### Options
(A) ₹ 18 per labour hour
(B) ₹ 2.50 per labour hour
(C) ₹ 20 per labour hour
(D) ₹ 0.71 per labour hour
#### Answer
**(D) ₹ 0.71 per labour hour**

**Overhead Recovery Rate - Assembly Department**

Basis: Labour Hours = 30,00,000

Rate = 21,37,236/30,00,000 = ₹ 0.71 per labour hour

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: C
tags: cma.job.job, cma.oh.absorb
difficulty: medium
q: 4
a: 22
---
#### Question
Full production cost of Job No. AMS-101 is:
#### Options
(A) ₹ 2,20,000
(B) ₹ 2,50,099
(C) ₹ 1,60,445
(D) ₹ 3,62,525
#### Answer
**(C) ₹ 1,60,445**

**Calculation of Full Production Cost (Job AMS-101)**

| Particulars | Amount (₹) |
|---|---:|
| Direct Materials | 1,50,000 |
| Direct Labour: | |
| - Fabrication Deptt. (300 hours × ₹ 20) | 6,000 |
| - Assembly Deptt. (200 hours × ₹ 20) | 4,000 |
| Production Overheads: | |
| - Fabrication Deptt. (250 hours × ₹ 1.21) | 303 |
| - Assembly Deptt. (200 hours × ₹ 0.71) | 142 |
| Total Production Cost | 1,60,445 |

---
case: c2
qno: 2
q: 4-6
---
#### Case
NutritionCrunch Pvt. Ltd. is a fast-growing company in the health food industry, specializing in the production of nutritious snack bars. The company manufactures three popular variants—Alpha, Beta, and Gamma—in a fully automated production facility.

Due to increasing competition and pressure on margins, management has become concerned that the existing conventional costing system, which allocates overheads simply based on units sold, may not be accurately reflecting the true cost and profitability of each product.

To improve cost accuracy, the company is considering the adoption of an Activity-Based Costing (ABC) system, which allocates overheads based on actual resource consumption such as inspection hours, machine usage, and special activities like packaging and advertising.

The following data has been compiled for analysis for one month:

**Overheads (Per Month)**

- Inspection Cost = ₹ 84,000
- Machine Repairs & Maintenance = ₹ 1,56,000
- Mold (Dye) Cost = ₹ 14,500
- Total Selling Overheads = ₹ 1,80,000

**Product Data**

| Particulars | Alpha | Beta | Gamma |
|---|---:|---:|---:|
| Prime Cost per unit (₹) | 14 | 10 | 9 |
| Selling Price per unit (₹) | 22 | 16 | 13 |
| Units per Production Run | 2,440 | 3,020 | 3,220 |
| Defective Units per Run | 40 | 20 | 20 |
| Inspection Hours per Run | 2 | 5 | 3 |
| Mold Cost per Run (₹) | 300 | 400 | 350 |
| Machine Hours per Run | 25 | 15 | 35 |
| Units Sold per Month | 24,000 | 60,000 | 32,000 |

The following Additional Information is provided:

1. The company follows a just-in-time approach, meaning all non-defective units produced are sold during the same month. There is no opening or closing inventory.
2. Under the current system, all production and selling overheads are allocated purely based on the number of units sold, without considering the actual consumption of resources by each product.
3. Out of total selling overheads, ₹ 90,000 relates to advertising expenses, which are incurred only for Beta and Gamma, as these products face stiff competition in the market.
4. Alpha does not require advertising due to its established demand.
5. Product Beta requires special packaging to maintain its competitive position.
6. A cost of ₹ 60,000 per month is incurred exclusively for this purpose and is included in the total selling overheads.

As a production cum finance manager of the company, you are required to answer the following questions:

---
item: q2i
case: c2
qno: 2
part: (i)
type: mcq
key: D
tags: cma.abc.compute
difficulty: medium
q: 5
a: 22
---
#### Question
What is the total combined gross margin of all the products?
#### Options
(A) ₹ 6,12,000
(B) ₹ 6,48,500
(C) ₹ 6,30,000
(D) ₹ 6,68,600
#### Answer
**(D) ₹ 6,68,600**
#### Approach
Gross margin here is sales less prime cost, and the cost of the defective units is deducted as well: count the runs from the good units per run first.

---
item: q2ii
case: c2
qno: 2
part: (ii)
type: mcq
key: C
tags: cma.abc.compute
difficulty: easy
q: 5-6
a: 22
---
#### Question
What is the total prime cost excluding cost of defective for all the products?
#### Options
(A) ₹ 19,18,000
(B) ₹ 12,16,000
(C) ₹ 12,24,000
(D) ₹ 10,10,000
#### Answer
**(C) ₹ 12,24,000**

**Statement Showing Total Gross Margin**

| Particulars | Alpha (₹) | Beta (₹) | Gamma (₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Sales Units | 24,000 | 60,000 | 32,000 | 1,16,000 |
| Selling Price per unit | 22 | 16 | 13 | — |
| **Sales Value (A)** | 5,28,000 | 9,60,000 | 4,16,000 | 19,04,000 |
| Prime Cost per unit | 14 | 10 | 9 | — |
| **Prime Cost (B)** | 3,36,000 | 6,00,000 | 2,88,000 | 12,24,000 |
| **Gross Margin (A – B)** | **1,92,000** | **3,60,000** | **1,28,000** | **6,80,000** |
| Cost of Defective units | 5,600 | 4,000 | 1,800 | 11,400 |
| **Net Gross Margin (B – C)** | **1,86,400** | **3,56,000** | **1,26,200** | **6,68,600** |

---
item: q2iii
case: c2
qno: 2
part: (iii)
type: mcq
key: A
tags: cma.abc.compute
difficulty: medium
q: 6
a: 23
---
#### Question
Ranking of Products under Conventional System is:
#### Options
(A) Beta – I, Alpha – II, Gamma – III
(B) Alpha – I, Beta – II, Gamma – III
(C) Beta – I, Gamma – II, Alpha – III
(D) Gamma – I, Beta – II, Alpha – III
#### Answer
**(A) Beta – I, Alpha – II, Gamma – III**

**Statement Showing Rank and Net Profit as per Conventional Accounting System**

| Particulars | Alpha | Beta | Gamma | Total |
|---|---:|---:|---:|---:|
| Sales Units/ Production (good units) | 24,000 | 60,000 | 32,000 | 1,16,000 |
| Gross Margin (₹) …(A) | 1,92,000 | 3,60,000 | 1,28,000 | 6,80,000 |
| Cost of Defective units…(B) | 5,600 | 4,000 | 1,800 | 11,400 |
| Production Overheads (₹) (2,54,500/116 x 24/60/32) | 52,655 | 1,31,638 | 70,207 | 2,54,500 |
| Selling Overheads (₹) (1,80,000/116 x 24/60/32) | 37,241 | 93,103 | 49,656 | 1,80,000 |
| Sub-Total Overheads (₹) …(C) | 89,896 | 2,24,741 | 1,19,863 | 4,34,500 |
| **Net Profit (₹) …(A – B - C)** | **96,504** | **1,31,259** | **6,337** | **2,34,100** |
| **Ranking** | II | I | III | — |
#### Approach
Under the conventional system both overhead pools are spread in proportion to units sold (24 : 60 : 32); rank by the resulting net profit.

---
item: q2iv
case: c2
qno: 2
part: (iv)
type: mcq
key: A
tags: cma.abc.compute
difficulty: medium
q: 6
a: 23
note: ICAI's answer reads "(A) ₹ 2,45,500", while option (A) in the question is ₹ 2,34,100, which is also the total net profit in ICAI's statements under both systems. The key is ICAI's (A); the text of both is kept as printed.
---
#### Question
What is the total net profit for all the products:
#### Options
(A) ₹ 2,34,100
(B) ₹ 2,28,000
(C) ₹ 2,04,000
(D) ₹ 1,98,000
#### Answer
**(A) ₹ 2,45,500**

---
item: q2v
case: c2
qno: 2
part: (v)
type: mcq
key: A
tags: cma.abc.compute, cma.abc.concept
difficulty: hard
q: 6
a: 23-25
---
#### Question
Ranking of Products under ABC System is:
#### Options
(A) Alpha – I, Beta – II, Gamma – III
(B) Beta – I, Alpha – II, Gamma – III
(C) Alpha – I, Gamma – II, Beta – III
(D) Gamma – I, Beta – II, Alpha – III
#### Answer
**(A) Alpha – I, Beta – II, Gamma – III**

**Workings**

| No. | Particulars | Alpha | Beta | Gamma | Total |
|---|---|---:|---:|---:|---:|
| (1) | Gross Production (Units / Run) | 2,440 | 3,020 | 3,220 | — |
| (2) | Defectives / Run | 40 | 20 | 20 | — |
| (3) | Good Units / Run | 2,400 | 3,000 | 3,200 | — |
| (4) | Sales Units | 24,000 | 60,000 | 32,000 | — |
| (5) | No. of Runs | 10 | 20 | 10 | — |
| (6) | Gross Production 1 x 5) | 24,400 | 60,400 | 32,200 | — |
| (7) | Prime Cost / Unit | 14 | 10 | 9 | — |
| (8) | Prime Cost (₹) | 3,41,600 | 6,04,000 | 2,89,800 | 12,35,400 |
| (9) | Inspection Hours / Run | 2 | 5 | 3 | — |
| (10) | Total Inspection Hours …. (9 x 5) | 20 | 100 | 30 | 150 |
| (11) | Machine Hours / Run | 25 | 15 | 35 | — |
| (12) | Total Machine Hours ..….. (11 x 5) | 250 | 300 | 350 | 900 |
| (13) | Mold Cost / Run | 300 | 400 | 350 | — |
| (14) | Total Mold Cost .…….… (13 x 5) | 3,000 | 8,000 | 3,500 | 14,500 |

**Statement Showing Production & Selling Overheads**

| Particulars | Alpha | Beta | Gamma | Total |
|---|---:|---:|---:|---:|
| Inspection Cost (84,000/150 x 20/100/30) | 11,200 | 56,000 | 16,800 | 84,000 |
| Machine Maintenance (1,56,000/900 x 250/300/350) | 43,333 | 52,000 | 60,667 | 1,56,000 |
| Mold Cost | 3,000 | 8,000 | 3,500 | 14,500 |
| **Production Overheads** | 57,533 | 1,16,000 | 80,967 | 2,54,500 |
| Advertisement (90,000/92 x 60/32) | — | 58,696 | 31,304 | 90,000 |
| Packing | — | 60,000 | — | 60,000 |
| Other Overheads(30,000/116 x 24/60/32) | 6,207 | 15,517 | 8,276 | 30,000 |
| **Selling Overheads** | 6,207 | 1,34,213 | 39,580 | 1,80,000 |

**Statement Showing Rank and Net Profit as per Activity Based Costing System**

| Particulars | Alpha | Beta | Gamma | Total |
|---|---:|---:|---:|---:|
| Sales Units | 24,000 | 60,000 | 32,000 | 1,16,000 |
| Gross Margin (₹) …(A) | 1,92,000 | 3,60,000 | 1,28,000 | 6,80,000 |
| Cost of Defective units .…(B) | 5,600 | 4,000 | 1,800 | 11,400 |
| Production Overheads (₹) | 57,533 | 1,16,000 | 80,967 | 2,54,500 |
| Selling Overheads (₹) | 6,207 | 1,34,213 | 39,580 | 1,80,000 |
| Sub-Total Overheads (₹) .…(C) | 63,740 | 2,50,213 | 1,20,547 | 4,34,500 |
| Net Profit (₹) ….(A – B - C ) | 1,22,660 | 1,05,787 | 5,653 | 2,34,100 |
| Ranking | I | II | III | — |

**Calculate Cost of Defective Units:**

| Product | Defectives per Run | Runs | Total Defectives | Per unit cost | Total cost (₹) |
|---|---:|---:|---:|---:|---:|
| Alpha | 40 | 10 | 400 | 14 | 5,600 |
| Beta | 20 | 20 | 400 | 10 | 4,000 |
| Gamma | 20 | 10 | 200 | 9 | 1,800 |
#### Approach
Trace each overhead to its driver: inspection hours, machine hours and mould cost per run for production; advertising only to Beta and Gamma, packing only to Beta, the rest by units sold.

---
item: q3
qno: 3
type: mcq
key: A
tags: cma.proc.eu
difficulty: easy
q: 6-7
a: 25
---
#### Question
Kanika Ltd. has furnished the following information pertaining to its process account for the month of March 2026:

| | |
|---|---:|
| Value of opening work-in-process | ₹ 10,020 |
| Cost incurred during the month | ₹ 1,14,180 |
| Finished goods units | 1665 |
| Closing work-in-process | 150 |

Closing work-in-process is completed to the extent of 40%. Costs are incurred evenly throughout the month. The Company uses weighted average method for flow of costs.

What is the value of finished goods for the month of March 2026?
#### Options
(A) ₹ 1,19,880
(B) ₹ 1,25,000
(C) ₹ 1,24,200
(D) ₹ 98,500
#### Answer
**(A) ₹ 1,19,880**

Equivalent Units = 100% of 1665 + 40% of 150 units

= 1665 + 60 = 1,725 units

Cost per unit = (₹ 10,020+ ₹ 1,14,180) ÷ 1,725

= ₹ 72 per unit

Cost of Completed units in the process:

= 1665 × 72 = ₹ 1,19,880

---
item: q4
qno: 4
type: mcq
key: C
tags: cma.mc.bep, cma.mc.basics
difficulty: medium
q: 7
a: 25-26
---
#### Question
The current selling price is ₹ 136 per unit. Variable costs are expected to increase from ₹ 76 to ₹ 82 per unit. Fixed costs or 5,32,000 will not change. How many additional units are required to be sold in the order to maintain an operating income of ₹ 3,45,500?
#### Options
(A) 1,500 units
(B) 1,462 units
(C) 1,625 units
(D) 1,250 units
#### Answer
**(C) 1,625 units**

Projected Unit sales = (Fixed costs + Target operating income) ÷ unit Contribution margin.

= (₹ 5,32,000 + ₹ 3,45,500) ÷ (₹ 136 - ₹82)

= ₹ 8,77,500 ÷ 54

= 16,250 units

Existing Sales in units = (Fixed costs + operating income) ÷ unit Contribution margin.

= (₹ 5,32,000 + ₹ 3,45,500) ÷ (₹ 136 - ₹ 76)

= ₹ 8,77,500 ÷ 60

= 14,625 units

Increase in units: 16,250 – 14,625 = 1,625 units
#### Approach
Units needed = (fixed costs + target income) ÷ contribution per unit; work it out at the old and the new variable cost and take the difference.

---
item: q5
qno: 5
type: descriptive
tags: cma.mat.eoq, cma.mat.levels
difficulty: medium
q: 7-8
a: 26-28
---
#### Question
M/s Esha Materials Private Limited produces a product which names “ESS”. The consumption of raw material for the production of “ESS” is 210 Kgs to 350 Kgs per week. Other information is as follows:

| | |
|---|---|
| Procurement Time: | 5 to 9 Days |
| Purchase price of Raw Materials: | ₹ 100 per kg |
| Ordering Cost per Order: | ₹ 200 |
| Storage Cost: | 1% per month plus ₹ 2 per unit per annum |

Consider 365 days a year.

You are required to CALCULATE:

(a) Economic Order Quantity

(b) Re-Order Level (ROL)

(c) Maximum Stock Level

(d) Minimum Stock Level

(e) Average Stock Level

(f) Number of Orders to be placed per year

(g) Total Inventory Cost

(h) If the supplier is willing to offer 1% discount on purchase of total annual quantity in two orders, whether offer is acceptable?

(i) If the answer is no, what should be the counteroffer w.r.t. percentage of discount?
#### Answer
As procurement time is given in days, consumption should also be calculated in days:

Maximum Consumption per Day: $\dfrac{350}{7}$ = 50 Kgs

Minimum Consumption per Day: $\dfrac{210}{7}$ = 30 Kgs.

Average Consumption per Day: $\dfrac{(50+30)}{2}$ = 40 Kgs

**(a) Calculation of Economic Order Quantity (EOQ)**

Annual consumption of Raw Materials (A): 40 Kgs x 365 days = 14,600 Kgs

Storage or Carrying Cost per unit per annum (C):(₹ 100 x 1% x 12 months) + ₹ 2 = ₹ 14

Ordering Cost (O): ₹ 200 per Order

EOQ = $\sqrt{\dfrac{2 \times A \times O}{C}}$

= $\sqrt{\dfrac{2 \times 14{,}600 \times 200}{14}}$ = 646 Kgs.

**(b) Re-Order Level (ROL)** = (Maximum consumption Rate × Maximum Procurement Time)

= 50 kgs per day × 9 days

= 450 kgs

**(c) Maximum Stock Level** = Recorder Level + Recorder Quantity – (Minimum Consumption Rate × Minimum Procurement Time)

= 450 kgs + 646 kgs - (30 kgs x 5 days)

= 946 kgs

**(d) Minimum Stock Level** = Recorder Level – (Average consumption Rate × Average Procurement Time)

= 450 kgs – (40 kgs X 7 days)

= 170 kgs

**(e) Average Stock Level** = $\dfrac{\text{Maximum Stock Level + Minimum Stock Level}}{2}$

= $\dfrac{946 \text{ kgs} + 170 \text{ kgs}}{2}$

= 558 kgs

**(f) Number of Orders to be placed per year**

= $\dfrac{\text{Annual Consumption of Raw Materials}}{\text{EOQ}}$

= $\dfrac{14600 \text{ kgs}}{646 \text{ kgs}}$

= 22.60 Orders or 23 Orders

**(g) Total Inventory Cost**

| | |
|---|---:|
| Cost of Materials (A x Purchase Price) (14600 kgs x ₹ 100) | =₹ 14,60,000 |
| Total Ordering Cost (No. of Orders x O) (23 Orders x 200) | = ₹ 4,600 |
| Total Carrying Cost (EOQ / 2 x C) (646 kgs / 2 x ₹ 14) | = ₹ 4,522 |
| Total Inventory Cost | ₹ 14,69,122 |

**(h) If the supplier is willing to offer 1% discount on purchase of total annual quantity in two orders:**

| | | |
|---|---|---|
| Offer Price | = ₹ 100 x 99% | = ₹ 99 |
| Revised Carrying Cost | = (₹ 99 x 1% x 12 months) + ₹ 2 | = ₹ 13.88 |
| Revised Order Quantity | = 14600 kgs / 2 Orders | = 7300 kgs |

**Total Inventory Cost at Offer Price**

| | |
|---|---:|
| Cost of Materials (A x Purchase Price) (14600 kgs x ₹ 99) | = ₹ 14,45,400 |
| Total Ordering Cost (No. of Orders x O) (2 Orders x 200) | = ₹ 400 |
| Total Carrying Cost (EOQ / 2 x C) (7300 kgs / 2 x ₹ 13.88) | = ₹ 50,662 |
| Total Inventory Cost | ₹ 14,96,462 |

**Advice:** As total inventory cost at offer price is ₹ 27,340 (14,96,462 – 14,69,122) higher, offer should not be accepted.

**(i) Counter-offer:**

| | |
|---|---|
| Let Discount Rate | = z% |
| Counter-Offer Price | = ₹ 100 – z% = ₹ 100 – z |
| Revised Carrying Cost | = [(₹ 100 – z) x 1% x 12 months] + ₹ 2 |
| | = ₹ 12 -0.12z + ₹ 2 |
| | = ₹ 14 – 0.12z |

**Total Inventory Cost at Counter-Offer Price**

Cost of Materials (A x Purchase Price) [14600 kgs x (₹ 100 – z)] = ₹ 14,60,000 – 14,600z

Total Ordering Cost (No. of Orders x O) (2 Orders x 200) = ₹ 400

Total Carrying Cost (EOQ / 2 x C) [7300 kgs / 2 x (₹ 14 – 0.12z)]

= ₹ 51,100 – 438z

| | |
|---|---|
| Total Inventory Cost | = ₹ 15,11,500 – 15038z |
| ₹ 14,69,122 | = ₹ 15,11,500 – 15038z |
| Or 15038z | = 42,378 |
| Or z | = 2.82 |

Therefore, discount should be at least 2.82% in offer price.
#### Approach
Weekly consumption must be turned into daily consumption first, because the procurement times are in days. For the discount offer, compare total inventory cost (materials + ordering + carrying) at the EOQ with the cost at the offer.

---
item: q6
qno: 6
type: descriptive
tags: cma.emp.incentives
difficulty: medium
q: 8-9
a: 28-30
---
#### Question
The existing incentive system of Alpha Limited is as under:

| | |
|---|---|
| Normal working week | 5 days of 8 hours each plus 3 late shifts of 3 hours each |
| Rate of Payment | Day work: ₹ 160 per hour<br>Late shift: ₹ 225 per hour |
| Average output per operator for 49-hours week i.e. including 3 late shifts | 240 articles |

In order to increase output and eliminate overtime, it is decided to switch on to a system of payment by results. The following information is obtained:

| | | |
|---|---|---|
| Time-rate (as usual) | : | ₹ 160 per hour |
| Basic time allowed for 15 articles | : | 2.5 hours |
| Piece-work rate | : | *Add:* 20% to basic piece-rate |
| Premium Bonus | : | *Add:* 50% to time. |

If during the last week 270 articles are produced in a 40-hour week.

Required:

(i) CALCULATE weekly earnings, number of articles produced and labour cost per article for one operator under the following systems:

(a) Existing time-rate

(b) Straight piece-work

(c) Rowan system

(d) Halsey premium system

(ii) PREPARE a Statement showing hours worked, weekly earnings, number of articles produced and labour cost per article for one operator under the above systems.
#### Answer
**(i) (a) Existing time rate**

Weekly wages:

| | | |
|---|---|---:|
| Normal shift | (40 hours × ₹ 160): | ₹ 6,400 |
| Late shift | (9 hours × ₹ 225) | ₹ 2,025 |
| | | ₹ 8,425 |

**(b) Piece Rate System**

15 articles are produced in 2.5 hours

Therefore, to produce 270 articles, hours required is $\dfrac{2.5 \text{ hours}}{15 \text{ articles}}$ × 270 articles = 45 hours.

| | |
|---|---:|
| Cost of producing 270 articles: | |
| At basic time rate (45 hours × ₹160) = | ₹7,200 |
| *Add:* Bonus @ 20% on basic Piece rate | ₹1,440 |
| Earning for the week | ₹8,640 |

**(c) Rowan Premium System**

(i) Time allowed for producing 270 articles $\left(\dfrac{2.5 \text{hours}}{15 \text{articles}} \times 270 \text{articles} \times 150\%\right)$ = 67.5 hours

(ii) Time taken to produce 270 articles = 40.0 hours

(iii) Time Saved = 67.5 – 40 = 27.5 hours

Earnings under Rowan Premium system:

= (Time taken × Rate per hour) + $\left(\dfrac{\text{Time saved}}{\text{Time allowed}} \times \text{Time taken} \times \text{Rate per hour}\right)$

= (40 hours × ₹160) + $\left(\dfrac{27.5 \text{ hours}}{67.5 \text{ hours}} \times 40 \text{ hours} \times ₹160\right)$ = ₹ 9,007.41

**(d) Halsey Premium System**

= (Time taken × Rate per hour) + ($\dfrac{1}{2}$ × Time saved × Rate per hour)

= (40 hours × ₹160) + $\left(\dfrac{1}{2} \times 27.5 \text{ hours} \times ₹160\right)$ = ₹6,400 + ₹2,200

= ₹8,600

**(ii) Statement showing hours worked, weekly earnings, number of articles produced and cost per article**

| Method of Payment | Hours worked | Weekly earnings (₹) | Number of articles produced | Labour cost per article (₹) |
|---|---:|---:|---:|---:|
| Existing time rate | 49 | 8,425.00 | 240 | 35.10 |
| Straight piece rate system | 40 | 8,640.00 | 270 | 32.00 |
| Rowan Premium System | 40 | 9,007.41 | 270 | 33.36 |
| Halsey Premium System | 40 | 8,600.00 | 270 | 31.85 |
#### Approach
Time allowed for the premium plans is the basic time for 270 articles plus the 50% addition; Rowan pays the saving as a share of time taken, Halsey pays half the time saved.

---
item: q7
qno: 7
type: descriptive
tags: cma.emp.direct
difficulty: easy
q: 9
a: 30
---
#### Question
The following expenditures were incurred in Aditya Ltd. For the month of March 20X8:

| | | Amount (₹) |
|---|---|---:|
| (i) | Paid for power & fuel | 4,80,200 |
| (ii) | Wages paid to factory workers | 8,44,000 |
| (iii) | Bill paid to job workers | 9,66,000 |
| (iv) | Royalty paid for production | 8,400 |
| (v) | Fee paid to technician hired for the job | 96,000 |
| (vi) | Administrative overheads | 76,000 |
| (vii) | Commission paid to sales staffs | 1,26,000 |

You are required to CALCULATE direct expenses for the month.
#### Answer
Calculation of Direct Expenses

| | | Amount (₹) |
|---|---|---:|
| (i) | Paid for power & fuel | 4,80,200 |
| (ii) | Bill paid to job workers | 9,66,000 |
| (iii) | Royalty paid for production | 8,400 |
| (iv) | Fee paid to the technician | 96,000 |
| | **Total Direct expenses** | 15,50,600 |

**Notes:**

(i) Wages paid to factory workers is direct employee cost.

(ii) Administrative overhead is indirect expense.

(iii) Commission paid to sales staffs comes under selling expenses.

---
item: q8
qno: 8
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
q: 9-11
a: 30-32
---
#### Question
The following details are available from the books of Nova Manufacturing Ltd. for the year ending 31st March 2026:

Nova Manufacturing Ltd. produces high-precision metal components for industrial machinery. During the year, the company invested in new automation facilities, expanded factory supervision, and adopted new inventory control systems. The following data has been extracted from the cost accounting records:

| Particulars | Amount (₹) |
|---|---:|
| Purchase of raw materials | 1,02,50,000 |
| Consumable materials | 6,20,000 |
| Direct wages | 72,40,000 |
| Carriage inward | 2,10,000 |
| Wages to foreman and storekeeper | 10,20,000 |
| Other indirect wages to factory staff | 1,95,000 |
| Expenditure on research & development for new automation systems | 12,80,000 |
| Salary to accountants | 8,40,000 |
| Employer’s contribution to EPF & ESI | 9,00,000 |
| Cost of power & fuel | 33,20,000 |
| Production planning office expenses | 15,50,000 |
| Salary to delivery staff | 18,20,000 |
| Income tax for the assessment year 2025–26 | 3,60,000 |
| Fees to statutory auditor | 2,20,000 |
| Fees to cost auditor | 1,10,000 |
| Fees to independent directors | 11,80,000 |
| Factory maintenance & repairs | 7,30,000 |
| Depreciation on plant & machinery | 9,20,000 |
| Quality control department expenses | 5,40,000 |
| Office rent | 11,50,000 |
| Insurance on finished goods warehouse | 3,40,000 |
| Packing materials | 4,80,000 |
| Donation to State Disaster Relief Fund | 1,50,000 |
| Value of sales | 3,48,90,000 |

Opening Inventories (as on 01-04-2025):

- Raw Materials: ₹ 8,10,000
- Work-in-Progress: ₹ 9,25,000
- Finished Goods: ₹ 16,90,000

Closing Inventories (as on 31-03-2026):

- Raw Materials: ₹ 5,90,000
- Work-in-Progress: ₹ 7,80,000
- Finished Goods: ₹ 12,40,000

During the year, 2,000 defective units were produced due to machine malfunction.

The abnormal loss (not includible in cost) amounted to ₹ 4,60,000 and the scrap value realized was ₹ 40,000.

From the above information, PREPARE a COST SHEET for the year ended 31st March 2026.
#### Answer
**Statement of Cost of Nova Manufacturing Ltd. for the year ended 31st March, 2026:**

| Sl. No. | Particulars | Amount (₹) | Amount (₹) |
|---|---|---:|---:|
| **(i)** | **Material Consumed:** | | |
| | Purchase of Raw Materials | 1,02,50,000 | |
| | Carriage Inward | 2,10,000 | |
| | *Add:* Opening Stock of Raw Materials | 8,10,000 | |
| | *Less:* Closing Stock of Raw Materials | (5,90,000) | |
| | **Raw Material Consumed** | | **1,06,80,000** |
| **(ii)** | **Direct Employee (Labour) Cost:** | | |
| | Direct Wages | 72,40,000 | |
| | Employer’s Contribution to EPF & ESI | 9,00,000 | |
| | **Total Direct Employee Cost** | | **81,40,000** |
| **(iii)** | **Direct Expenses:** | | |
| | Consumable Materials | 6,20,000 | |
| | Cost of Power & Fuel | 33,20,000 | |
| | **Total Direct Expenses** | | **39,40,000** |
| | **Prime Cost** | | **2,27,60,000** |
| **(iv)** | **Works / Factory Overheads:** | | |
| | Wages to Foreman & Storekeeper | 10,20,000 | |
| | Other Indirect Wages to Factory Staff | 1,95,000 | |
| | Factory Maintenance & Repairs | 7,30,000 | |
| | Depreciation on Plant & Machinery | 9,20,000 | |
| | *(Abnormal Loss – Not included in cost)* | — | |
| | **Total Factory Overheads** | | **28,65,000** |
| | **Gross Factory Cost** | | **2,56,25,000** |
| | *Add:* Opening WIP | 9,25,000 | |
| | *Less:* Closing WIP | (7,80,000) | |
| | **Factory Cost** | | **2,57,70,000** |
| **(v)** | Quality Control Department Expenses | | 5,40,000 |
| **(vi)** | **Research & Development Cost (Automation Systems)** | | **12,80,000** |
| **(vii)** | **Production Planning Office Expenses** | | **15,50,000** |
| | **Cost Of Production** | | **2,91,40,000** |
| | *Add:* Opening Stock of Finished Goods | 16,90,000 | |
| | *Less:* Closing Stock of Finished Goods | (12,40,000) | |
| | **Cost Of Goods Sold** | | **2,95,90,000** |
| **(viii)** | **Administrative Overheads:** | | |
| | Salary to Accountants | 8,40,000 | |
| | Fees to Statutory Auditor | 2,20,000 | |
| | Fees to Cost Auditor | 1,10,000 | |
| | Fees to Independent Directors | 11,80,000 | |
| | Office Rent | 11,50,000 | |
| | **Total Administrative Overheads** | | **35,00,000** |
| **(ix)** | **Selling & Distribution Overheads:** | | |
| | Salary to Delivery Staff | 18,20,000 | |
| | Insurance on Finished Goods Warehouse | 3,40,000 | |
| | Packing Materials | 4,80,000 | |
| | **Total Selling & Distribution Overheads** | | **26,40,000** |
| | **Cost Of Sales** | | **3,57,30,000** |
| | **Profit / (Loss)** (Balancing Figure) | | **(8,40,000)** |
| | **Sales** | | **3,48,90,000** |

**Notes:**

- Abnormal loss of ₹ 4,60,000 (Scrap ₹ 40,000) is excluded from the cost sheet.
- Income tax and donation are not included in cost sheets.
#### Approach
Sort each item into its cost-sheet head (materials, direct employee cost, direct expenses, factory overheads, administration, selling and distribution) and leave out what is never a cost (income tax, donation, the abnormal loss).

---
item: q9
qno: 9
type: descriptive
tags: cma.sys.recon
difficulty: medium
q: 11-12
a: 32-35
---
#### Question
The financial books of a company reveal the following data for the year ended 31st March, 2026:

| | (₹) |
|---|---:|
| **Opening Stock:** | |
| Finished goods 875 units | 76,525 |
| Work-in-process | 33,000 |
| **01.04.2025 to 31.3.2026** | |
| Raw materials consumed | 7,84,000 |
| Direct Labour | 4,65,000 |
| Factory overheads | 2,65,000 |
| Goodwill written off | 95,000 |
| Administration overheads | 3,15,000 |
| Interest paid | 72,000 |
| Bad Debts | 21,000 |
| Selling and Distribution Overheads | 65,000 |
| Interest received | 18,500 |
| Rent received | 72,000 |
| Sales 14,500 units | 20,80,000 |
| Closing Stock: Finished goods 375 units | 43,250 |
| Work-in-process | 48,200 |

The cost records provide as under:

Factory overheads are absorbed at 60% of direct wages.

Administration overheads are recovered at 20% of factory cost.

Selling and distribution overheads are charged at ₹ 5 per unit sold.

Opening Stock of finished goods is valued at ₹ 105 per unit.

The company values work-in-process at factory cost for both Financial and Cost Profit Reporting.

Required:

(i) Prepare statements for the year ended 31st March, 2026, show

- the profit as per financial records
- the profit as per costing records.

(ii) Present a statement reconciling the profit as per costing records with the profit as per Financial Records.
#### Answer
**(i) Statement of Profit as per financial records (for the year ended March 31, 2026)**

| | (₹) | | (₹) |
|---|---:|---|---:|
| To Opening stock: | | By Sales | 20,80,000 |
| Finished Goods | 76,525 | By Closing stock: | |
| Work-in-process | 33,000 | Finished Goods | 43,250 |
| To Raw materials consumed | 7,84,000 | Work-in-Process | 48,200 |
| To Direct labour | 4,65,000 | By Rent received | 72,000 |
| To Factory overheads | 2,65,000 | By Interest received | 18,500 |
| To Goodwill written off | 95,000 | | |
| To Administration overheads | 3,15,000 | | |
| To Selling & distribution overheads | 65,000 | | |
| To Interest paid | 72,000 | | |
| To Bad debts | 21,000 | | |
| To Profit | 70,425 | | |
| | 22,61,950 | | 22,61,950 |

**Statement of Profit as per costing records (for the year ended March 31,2026)**

| | (₹) | (₹) |
|---|---:|---:|
| Sales revenue (14,500 units) (A) | | 20,80,000 |
| *Cost of Sales:* | | |
| Opening stock (875 units x ₹ 105) | 91,875 | |
| *Add:* Cost of production of 14,000 units (Refer to Working Note 1& 2) | 18,15,360 | |
| *Less:* Closing stock $\left(\dfrac{₹18{,}15{,}360 \times 375 \text{ units}}{14{,}000 \text{ units}}\right)$ | (48,626) | |
| Production cost of goods sold (14,500 units) | 18,58,609 | |
| Selling & distribution overheads (14,500 units x ₹ 5) | 72,500 | |
| Cost of sales: (B) | 19,31,109 | 19,31,109 |
| Profit: {(A) – (B)} | | 1,48,891 |

**(ii) Statement of Reconciliation**

**(Reconciling the profit as per costing records with the profit as per financial records)**

| | (₹) | (₹) |
|---|---:|---:|
| Profit as per Cost Accounts | | 1,48,891 |
| *Add:* Factory overheads over absorbed (₹ 2,79,000 – ₹ 2,65,000) | 14,000 | |
| S&D overheads over absorbed (₹ 72,500 – ₹ 65,000) | 7,500 | |
| Opening stock overvalued (₹ 91,875 – ₹ 76,525) | 15,350 | |
| Interest received | 18,500 | |
| Rent received | 72,000 | 1,27,350 |
| | | 2,76,241 |
| *Less:* Administration overheads under recovery (₹ 3,15000 – ₹ 3,02,560) | 12,440 | |
| Closing stock overvalued (₹ 48,626 – ₹ 43,250) | 5,376 | |
| Goodwill written off | 95,000 | |
| Interest paid | 72,000 | |
| Bad debts | 21,000 | 2,05,816 |
| Profit as per financial accounts | | 70,425 |

**Working Notes:**

| | | Units |
|---|---|---:|
| **1.** | **Number of units produced** | |
| | Sales | 14,500 |
| | *Add:* Closing stock | 375 |
| | Total | 14,875 |
| | *Less:* Opening stock | 875 |
| | Number of units produced | 14,000 |

**2. Cost Sheet**

| | (₹) | (₹) |
|---|---:|---:|
| Raw materials consumed | | 7,84,000 |
| Direct labour | | 4,65,000 |
| *Prime cost* | | 12,49,000 |
| Factory overheads (60% of direct wages) | | 2,79,000 |
| *Factory cost* | | 15,28,000 |
| *Add:* Opening work-in-process | | 33,000 |
| *Less:* Closing work-in-process | | (48,200) |
| *Factory cost of goods produced* | | 15,12,800 |
| Administration overheads (20% of factory cost) | | 3,02,560 |
| Cost of production of 14,000 units | | 18,15,360 |

Cost of production per unit:

= $\dfrac{\text{Total Cost of Production}}{\text{No. of units produced}} = \dfrac{₹ 18{,}15{,}360}{14{,}000 \text{ units}}$ = ₹129.67
#### Approach
Build the cost-sheet profit from the absorption rates, then list every difference: over- or under-absorbed overheads, stock valued differently, and items found only in the financial books.

---
item: q10
qno: 10
type: descriptive
tags: cma.unit.batch
difficulty: hard
q: 12-13
a: 35-38
---
#### Question
Pintu Ltd. operates in beverages industry where it manufactures soft-drink in three sizes of Large (3 litres), Medium (1.5 litres) and Small (600 ml) bottles. The products are processed in batches. The 5,000 litres capacity processing plant consumes electricity of 90 Kilowatts per hour and a batch takes 1 hour 45 minutes to complete. Only symmetric size of products can be processed at a time. The machine set-up takes 15 minutes to get ready for next batch processing. During the set-up power consumption is only 20%.

(i) The current price of Large, Medium and Small are ₹ 150, ₹ 90 and ₹ 50 respectively.

(ii) To produce a litre of beverage, 14 litres of raw material-W and 25 ml of Material-C are required which costs ₹ 0.50 and ₹ 1,000 per litre respectively.

(iii) 20 direct workers are required. The workers are paid ₹ 880 for 8 hours shift of work.

(iv) The average packing cost per bottle is ₹ 3

(v) Power cost is ₹ 7 per Kilowatt -hour (Kwh)

(vi) Other variable cost is ₹ 30,000 per batch.

(vii) Fixed cost (Administration and marketing) is ₹ 4,90,00,000.

(viii) The holding cost is ₹ 1 per bottle per annum.

The marketing team has surveyed the following demand (bottle) of the product:

| Large | Medium | Small |
|---|---:|---:|
| 3,00,000 | 7,50,000 | 20,00,000 |

You are required to CALCULATE profit/ loss per batch and also COMPUTE Economic Batch Quantity (EBQ).
#### Answer
**Workings:**

**1. Maximum number of bottles that can be processed in a batch:**

2\. = $\dfrac{5{,}000 \text{ ltrs}}{\text{Bottle volume}}$

| Large | | Medium | | Small | |
|---:|---:|---:|---:|---:|---:|
| **Qty (ltr)** | **Max bottles** | **Qty (ltr)** | **Max bottles** | **Qty (ltr)** | **Max bottles** |
| 3 | 1,666 | 1.5 | 3,333 | 0.6 | 8,333 |

\*For simplicity of calculation small fractions has been ignored.

**Number of batches to be run:**

| | | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| A | Demand | 3,00,000 | 7,50,000 | 20,00,000 | |
| B | Bottles per batch (Refer WN-1) | 1,666 | 3,333 | 8,333 | |
| C | No. of batches [A÷B] | 180 | 225 | 240 | 645 |

\*For simplicity of calculation small fractions has been ignored.

**Quantity of Material-W and Material C required to meet demand:**

| | Particulars | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| A | Demand (bottle) | 3,00,000 | 7,50,000 | 20,00,000 | |
| B | Qty per bottle (Litre) | 3 | 1.5 | 0.6 | |
| C | Output (Litre) [A×B] | 9,00,000 | 11,25,000 | 12,00,000 | 32,25,000 |
| D | Material-W per litre of output (Litre) | 14 | 14 | 14 | |
| E | Material-W required (Litre) [C×D] | **1,26,00,000** | **1,57,50,000** | **1,68,00,000** | **4,51,50,000** |
| F | Material-C required per litre of output (ml) | 25 | 25 | 25 | |
| G | Material-C required (Litre) [(C×F) ÷1000] | **22,500** | **28,125** | **30,000** | **80,625** |

**3. No. of Man-shift required:**

| | | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| A | No. of batches | 180 | 225 | 240 | 645 |
| B | Hours required per batch (Hours) | 2 | 2 | 2 | |
| C | Total hours required (Hours) [A×B] | 360 | 450 | 480 | 1,290 |
| D | No. of shifts required [C÷8] | 45 | 57 | 60 | 162 |
| **E** | **Total manshift [D×20 workers]** | **900** | **1,140** | **1,200** | **3,240** |

**4. Power consumption in Kwh**

| | | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| **For processing** | | | | | |
| A | No. of batches | 180 | 225 | 240 | 645 |
| B | Hours required per batch (Hours) | 1.75 | 1.75 | 1.75 | 21.75 |
| C | Total hours required (Hours) [A×B] | 315 | 393.75 | 420 | 1,128.75 |
| D | Power consumption per hour | 90 | 90 | 90 | 90 |
| **E** | **Power consumption in Kwh [C×D]** | **28,350** | **35,437.5** | **37,800** | **1,01,587.5** |
| **F** | **Per batch consumption (Kwh) [E÷A]** | **157.5** | **157.5** | **157.5** | **157.5** |
| **For set-up** | | | | | |
| G | Hours required per batch (Hours) | 0.25 | 0.25 | 0.25 | 0.25 |
| H | Total hours required (Hours) [A×G] | 45 | 56.25 | 60 | 161.25 |
| I | Power consumption per hour [20% × 90] | 18 | 18 | 18 | 18 |
| **J** | **Power consumption in Kwh [H×I]** | **810** | **1,012.5** | **1,080** | **2,902.5** |
| **K** | **Per batch consumption (Kwh) [J÷A]** | **4.5** | **4.5** | **4.5** | **4.5** |

**Calculation of Profit/ loss per batch:**

| | Particulars | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| A | Demand (bottle) | 3,00,000 | 7,50,000 | 20,00,000 | 30,50,000 |
| B | Price per bottle (₹) | 150 | 90 | 50 | |
| **C** | **Sales value (₹) [A×B]** | **4,50,00,000** | **6,75,00,000** | **10,00,00,000** | **21,25,00,000** |
| | **Direct Material cost:** | | | | |
| E | Material-W (₹) [Qty in WN - 3 × ₹ 0.50] | 63,00,000 | 78,75,000 | 84,00,000 | 2,25,75,000 |
| F | Material-C (₹) [Qty in WN-3 × ₹ 1,000] | 2,25,00,000 | 2,81,25,000 | 3,00,00,000 | 8,06,25,000 |
| G | [E+F] | **2,88,00,000** | **3,60,00,000** | **3,84,00,000** | **10,32,00,000** |
| H | Direct Wages (₹) [Man-shift in WN-4 × ₹ 880] | 7,92,000 | 10,03,200 | 10,56,000 | 28,51,200 |
| I | Packing cost (₹) [A ×₹ 3] | 9,00,000 | 22,50,000 | 60,00,000 | 91,50,000 |
| | **Power cost (₹)** | | | | |
| J | For processing (₹) [WN-5 × ₹ 7] | 1,98,450 | 2,48,062.5 | 2,64,600 | 7,11,112.5 |
| K | For set-up time (₹) [WN-5 × ₹ 7] | 5,670 | 7,087.5 | 7,560 | 20,317.5 |
| L | [J+K] | **2,04,120** | **2,55,150** | **2,72,160** | **7,31,430** |
| M | Other variable cost (₹) [No. of batch in WN - 2 × ₹ 30,000] | 54,00,000 | 67,50,000 | 72,00,000 | 1,93,50,000 |
| **N** | **Total Variable cost per batch [G+H+I+L+M]** | **3,60,96,120** | **4,62,58,350** | **5,29,28,160** | **13,52,82,630** |
| **O** | **Profit/ loss before fixed cost [C-N]** | **89,03,880** | **2,12,41,650** | **4,70,71,840** | **7,72,17,370** |
| P | Fixed Cost | | | | 4,90,00,000 |
| **Q** | **Total Profit [O-P]** | | | | **2,82,17,370** |

**Computation of Economic Batch Quantity (EBQ):**

EBQ = $\sqrt{\dfrac{2 \times D \times S}{C}}$

D = Annual Demand for the Product = Refer A below

S = Set-up cost per batch = Refer D below

C = Carrying cost per unit per annum =Refer E below

| | Particulars | Large | Medium | Small |
|---|---|---:|---:|---:|
| A | Annual Demand (bottle) | 3,00,000 | 7,50,000 | 20,00,000 |
| **Set-up Cost:** | | | | |
| B | Power cost for set-up time (₹) [Consumption per batch in WN-5 × ₹ 7] | 31.50 | 31.50 | 31.50 |
| C | Other variable cost (₹) * | 30,000 | 30,000 | 30,000 |
| D | Total Set-up cost [B+C] | 30,031.50 | 30,031.50 | 30,031.50 |
| E | Holding cost: | 1.00 | 1.00 | 1.00 |
| **F** | **EBQ (Bottle)** | **1,34,234** | **2,12,243** | **3,46,592** |

\* Other variable cost is assumed to be part of set-up cost.
#### Approach
Find how many bottles one 5,000-litre batch holds, then the number of batches each demand needs; everything else (materials, man-shifts, power for processing and set-up) is built per batch from that.

---
item: q11
qno: 11
type: descriptive
tags: cma.proc.eu, cma.proc.accounts
difficulty: medium
q: 13-14
a: 39-40
---
#### Question
A company produces a component, which passes through two processes. During the month of November, 2025, materials for 40,000 components were put into Process- I of which 30,000 were completed and transferred to Process- II. Those not transferred to Process- II were 100% complete as to materials cost and 50% complete as to labour and overheads cost. The Process- I costs incurred were as follows:

| | |
|---|---:|
| Direct Materials | ₹ 3,00,000 |
| Direct Wages | ₹ 3,50,000 |
| Factory Overheads | ₹ 2,45,000 |

Of those transferred to Process II, 28,000 units were completed and transferred to finished goods stores. There was a normal loss with no salvage value of 200 units in Process II. There were 1,800 units, remained unfinished in the process with 100% complete as to materials and 25% complete as regard to wages and overheads.

Costs incurred in Process-II are as follows:

| | |
|---|---:|
| Packing Materials | ₹ 80,000 |
| Direct Wages | ₹ 71,125 |
| Factory Overheads | ₹ 85,350 |

Packing material cost is incurred at the end of the second process as protective packing to the completed units of production.

Required:

(i) PREPARE Statement of Equivalent Production, Cost per unit and Process I A/c.

(ii) PREPARE statement of Equivalent Production, Cost per unit and Process II A/c.
#### Answer
**Process I**

**Statement of Equivalent Production and Cost**

| Input (Units) | Particulars | Output Units | Equivalent Production | | | | | |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | **Materials** | | **Labour** | | **Overheads** | |
| | | | **(%)** | **Units** | **(%)** | **Units** | **(%)** | **Units** |
| 40,000 | Completed | 30,000 | 100 | 30,000 | 100 | 30,000 | 100 | 30,000 |
| | Closing WIP | 10,000 | 100 | 10,000 | 50 | 5,000 | 50 | 5,000 |
| 40,000 | | 40,000 | | 40,000 | | 35,000 | | 35,000 |

| Particulars | Materials | Labour | Overhead | Total |
|---|---:|---:|---:|---:|
| Cost incurred (₹) | 3,00,000 | 3,50,000 | 2,45,000 | 8,95,000 |
| Equivalent units | 40,000 | 35,000 | 35,000 | |
| Cost per equivalent unit (₹) | 7.50 | 10.00 | 7.00 | 24.50 |

**Process-I Account**

| Particulars | Units | (₹) | Particulars | Units | (₹) |
|---|---:|---:|---|---:|---:|
| To Materials | 40,000 | 3,00,000 | By Process-II A/c (30,000 units × ₹ 24.5) | 30,000 | 7,35,000 |
| To Labour | | 3,50,000 | By Closing WIP* | 10,000 | 1,60,000 |
| To Overhead | | 2,45,000 | | | |
| | 40,000 | 8,95,000 | | 40,000 | 8,95,000 |

**\*** (Material 10,000 units × ₹ 7.5) + (Labour 5,000 units × ₹ 10) + (Overheads 5,000 units × ₹7)

= ₹ 75,000 + ₹ 50,000 + ₹ 35,000 = ₹ 1,60,000

**Process II**

**Statement of Equivalent Production and Cost**

| Input (Units) | Particulars | Output Units | Equivalent Production | | | | | |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | **Materials** | | **Labour** | | **Overheads** | |
| | | | **(%)** | **Units** | **(%)** | **Units** | **(%)** | **Units** |
| 30,000 | Completed | 28,000 | 100 | 28,000 | 100 | 28,000 | 100 | 28,000 |
| | Normal loss | 200 | | -- | | -- | | -- |
| | Closing WIP | 1,800 | 100 | 1,800 | 25 | 450 | 25 | 450 |
| 30,000 | | 30,000 | | 29,800 | | 28,450 | | 28,450 |

| Particulars | Materials | Labour | Overhead | Total |
|---|---:|---:|---:|---:|
| Process-I Cost | 7,35,000 | -- | -- | 7,35,000 |
| Cost incurred (₹) | -- | 71,125 | 85,350 | 1,56,475 |
| Equivalent units | 29,800 | 28,450 | 28,450 | -- |
| Cost per equivalent unit (₹) | 24.6644 | 2.5000 | 3.0000 | 30.1644 |

**Process-II Account**

| Particulars | Units | (₹) | Particulars | Units | (₹) |
|---|---:|---:|---|---:|---:|
| To Process-I A/c | 30,000 | 7,35,000 | By Normal loss A/c | 200 | -- |
| To Packing Material | -- | 80,000 | By Finished Goods Stock A/c | 28,000* | 9,24,604 |
| To Direct Wages | -- | 71,125 | By Closing WIP | 1,800** | 46,871 |
| To Factory Overhead | -- | 85,350 | | | |
| | 30,000 | 9,71,475 | | 30,000 | 9,71,475 |

\* 28,000 × ₹ 30.1644 = ₹ 8,44,603 + ₹ 80,000 (Packing Material Cost) = ₹ 9,24,604

\*\* 1,800 units × ₹ 24.6644 + 450 units × (₹ 2.5 + ₹3) = ₹ 46,871
#### Approach
In Process II the normal loss takes no equivalent units, and the packing material is added only to the 28,000 completed units, outside the equivalent-unit cost.

---
item: q12
qno: 12
type: descriptive
tags: cma.joint.byprod, cma.joint.apportion
difficulty: medium
q: 14-15
a: 40-41
---
#### Question
A manufacturing unit producing Product X also generates a by-product Y, which undergoes additional processing to obtain the finished product. The details of the joint manufacturing costs are provided below:

| | |
|---|---:|
| Material | ₹ 5,000 |
| Labour | ₹ 3,000 |
| Overhead | ₹ 2,000 |
| | ₹ 10,000 |

Subsequent cost in ₹ are given below:

| | X | Y |
|---|---:|---:|
| Material | 3,000 | 1,500 |
| Labour | 1,400 | 1,000 |
| Overhead | 600 | 500 |
| | 5,000 | 3,000 |

Selling prices are X ₹ 16,000

Y ₹ 8,000

Estimated profit on selling prices is 25% for X and 20% for Y.

On the assumption that selling and distribution expenses are incurred in proportion to the respective sales values, distribute the joint manufacturing costs and prepare a statement indicating the cost of production of X and Y.
#### Answer
**Apportionment of Joint Costs**

| Particulars | X (₹) | Y (₹) |
|---|---:|---:|
| Selling Price | 16,000 | 8,000 |
| *Less:* Estimated profit | 4,000 (25% of ₹ 16,000) | 1,600 (20% of ₹ 8,000) |
| Cost of sales | 12,000 | 6,400 |
| *Less:* Selling & Distribution exp. (Refer working note) | 267 (₹ 400 × 2/3) | 133 (₹ 400 × 1/3) |
| *Less:* Subsequent cost | 5,000 | 3,000 |
| Share of Joint cost | 6,733 | 3,267 |

So, Joint cost of manufacture is to be distributed to X & Y in the ratio of 6733:3267.

**Statement showing Cost of Production of X and Y**

| Elements of cost | Joint Cost | | Subsequent Cost | | Total Cost | |
|---|---:|---:|---:|---:|---:|---:|
| | **X** | **Y** | **X** | **Y** | **X** | **Y** |
| Material | 3,367 | 1,633 | 3,000 | 1,500 | 6,367 | 3,133 |
| Labour | 2,020 | 980 | 1,400 | 1,000 | 3,420 | 1,980 |
| Overheads | 1,346 | 654 | 600 | 500 | 1,946 | 1,154 |
| | | | | Cost of production | 11,733 | 6,267 |

**Working Note:**

**Calculation of Selling and Distribution Expenses**

| Particulars | (₹) |
|---|---:|
| Total Sales Revenue (₹ 16,000 + ₹ 8,000) | 24,000 |
| *Less:* Estimated Profit (₹ 4,000 + ₹ 1,600) | (5,600) |
| Cost of Sales | 18,400 |
| *Less:* Cost of production: | |
| - Joint Costs | (10,000) |
| - Subsequent costs (₹ 5,000 + ₹ 3,000) | (8,000) |
| Selling and Distribution expenses (Balancing figure) | 400 |
#### Approach
Work backwards from each selling price (reverse cost method): take away the estimated profit, its share of selling and distribution expenses and its subsequent cost; what is left is its share of the joint cost.

---
item: q13
qno: 13
type: descriptive
tags: cma.svc.transport
difficulty: medium
q: 15-16
a: 41-43
---
#### Question
Royal Transport Services runs fleet of buses within the limits of Jaipur city. The following are the details which were incurred by the company during October, 2025:

| | (₹) |
|---|---|
| Cost of each Bus | 24,00,000 |
| Garage Rent | 1,00,000 |
| Insurance | 25,000 |
| Road tax | 20,000 |
| Manager’s Salary | 60,000 |
| Assistant’s Salary (Two) | 32,000 each |
| Supervisor’s Salary (Three) | 24,000 each |
| Driver’s Salary (Twenty-Five) | 20,000 each |
| Cleaner’s Salary (Twenty) | 5,000 each |
| Office Staff’s Salary | 1,00,000 |
| Consumables | 1,20,000 |
| Repairs & Maintenance | 90,000 |
| Other Fixed Expenses | 72,000 |
| Diesel (10 Kms per Litre) | 80 per litre |
| Oils & Lubricants | 1,45,000 |
| Tyres and tubes | 35,000 |
| Depreciation | 10% p.a. on Cost |

Other details are as below:

Capacity

12 Buses 60 Passengers

13 Buses 50 Passengers

Each bus makes 4 round trips a day covering a distance of 10 Kilometers in each trip (One Way) on an average. During the trips 80% of the seats are occupied. The annual records show that 5 buses are generally required to be kept away from roods each day for repairs.

You are required to CALCULATE cost per passenger-km.

Cost sheet to be prepared on the basis of 25 buses.
#### Answer
**Operating Cost Sheet**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| **Standing Charges:** | | |
| Depreciation (₹ 24,00,000 x 10% x 1/12 x 25) | 5,00,000 | |
| Garage Rent | 1,00,000 | |
| Insurance | 25,000 | |
| Road Tax | 20,000 | |
| Manager’s Salary | 60,000 | |
| Assistant’s Salary (₹ 32,000 x 2) | 64,000 | |
| Supervisor’s Salary (₹ 24,000 x 3) | 72,000 | |
| Driver’s Salary (₹ 20,000 x 25) | 5,00,000 | |
| Cleaner’s Salary (₹ 5,000 x 20) | 1,00,000 | |
| Office Staff’s Salary | 1,00,000 | |
| Consumables | 1,20,000 | |
| Repairs & Maintenance | 90,000 | |
| Other Fixed Expenses | 72,000 | 18,23,000 |
| **Running Charges** | | |
| Diesel (49,600 Kms / 10 Kms x ₹ 80 per unit) | 3,96,800 | |
| Oils & Lubricants | 1,45,000 | |
| Tyres and tubes | 35,000 | 5,76,800 |
| **Total Operating Cost** | | **23,99,800** |

Cost per passenger-km = $\dfrac{\text{Total Operating Cost}}{\text{Passenger –kms}}$

= $\dfrac{23{,}99{,}800}{27{,}18{,}080}$

= 0.883

**Working Note:**

Calculation of Total Kilometers and Passenger Kilometers

| Specification | Total Km. | Passenger–Km. |
|---|---|---|
| 12 Buses (60 Passengers) | 29,760 Kms (10 Kms × 4 x 2 trips × 31 days x 12 Buses) | 14,28,480 (29760 Kms x 60 Pass. x 80%) |
| 13 Buses (50 Passengers) | 32,240 Kms (10 Kms × 4 x 2 trips × 31 days x 13 Buses) | 12,89,600 (32240 Kms x 50 Pass. x 80%) |
| **Total** | **62,000** | **27,18,080** |

Since 5 buses out of 25 buses are kept for repairs every day

Actual total Km. 62,000 × 20/25 = 49,600
#### Approach
Passenger-km come from all 25 buses (round trips are two one-way trips of 10 km, at 80% occupancy); diesel is charged only on the kilometres actually run by the 20 buses on the road.

---
case: c14
qno: 14
q: 16-17
---
#### Case
ABC Manufacturing Ltd. is a medium-sized manufacturing company engaged in the production of a single industrial component used in engineering applications. In recent months, the company has experienced fluctuations in demand due to changing market conditions and increased competition.

In order to ensure better cost control, efficient utilization of resources, and improved planning, the management has decided to implement a detailed budgeting and standard costing system for the financial year 2025. The Cost Accountant of the company has been entrusted with the responsibility of preparing budgets and analyzing variances for performance evaluation.

You are provided with the following data relating to the first six months of the year 2025:

**Sales Budget (Units)**

| Month | January | February | March | April | May | June |
|---|---|---|---|---|---|---|
| Units | 12,000 | 13,500 | 15,000 | 16,500 | 17,000 | 18,500 |

The company follows a policy of maintaining finished goods inventory at the end of each month equal to 25% of the budgeted sales for the following month. The opening finished goods inventory as on 1st January 2025 was 3,000 units. There is no work-in-progress inventory at any point of time.

Each unit of finished product requires two types of materials as detailed below:

| Material | Quantity per Unit | Rate per kg |
|---|---|---|
| Material A | 5 kg | ₹ 12 |
| Material B | 4 kg | ₹ 18 |

The stock of raw materials on 1st January 2025 was:

- Material A: 25,000 kg
- Material B: 18,000 kg

The company maintains closing stock of raw materials at the end of each month equal to 60% of the next month’s production requirement to avoid stock-outs and ensure uninterrupted production.

**Direct Labour**

Each unit of finished product requires 0.8 direct labour hours.

Based on past experience and wage agreements, the total budgeted direct labour cost for the first quarter of the year has been estimated at ₹ 15,36,000.

Actual data for the quarter one, ended on March 31, 2025 is as under:

Despite careful planning, actual results differed from estimates due to operational inefficiencies and changes in input prices.

Actual production: 42,000 units

**Actual Material Consumption**

| Material | Quantity (kg) | Rate per kg |
|---|---:|---:|
| Material A | 2,10,000 | ₹12.50 |
| Material B | 1,65,000 | ₹18.40 |

**Actual Labour Data**

- Actual hours worked: 35,000 hours
- Actual labour cost: ₹ 17,85,000

**Required:**

---
item: q14a
case: c14
qno: 14
part: (A)
type: descriptive
tags: cma.bud.functional
difficulty: medium
q: 18
a: 43-44
---
#### Question
Prepare the following budgets:

1. Monthly production budget for the quarter January to March, 2025.
2. Monthly raw material consumption quantity budget for January to April, 2025.
3. Materials purchase quantity budget for the first quarter of the year 2025.
#### Answer
**(i) Production Budget for January to March 2025**

***(Quantitative)***

| Particulars | Jan | Feb | Mar | April |
|---|---:|---:|---:|---:|
| Budgeted Sales | 12,000 | 13,500 | 15,000 | 16,500 |
| Add: Closing Stock (25% of next month sales) | 3,375 | 3,750 | 4,125 | 4,250 |
| **Total Requirement** | **15,375** | **17,250** | **19,125** | **20,750** |
| Less: Opening Stock | 3,000 | 3,375 | 3,750 | 4,125 |
| **Budgeted Production** | **12,375** | **13,875** | **15,375** | **16,625** |

**Total Budgeted Production (Q1)** = 12,375 + 13,875 + 15,375 **=** 41,625 units

**(ii) Raw Material Consumption Budget (Quantity)**

| Month | Output (Units) | Material A (5 kg/unit) | Material B (4 kg/unit) |
|---|---:|---:|---:|
| January | 12,375 | 61,875 | 49,500 |
| February | 13,875 | 69,375 | 55,500 |
| March | 15,375 | 76,875 | 61,500 |
| April | 16,625 | 83,125 | 66,500 |
| **Total (Q1)** | | **2,08,125** | **1,66,500** |

**(iii) Raw Materials Purchase Quantity Budget (Quarter I)**

**Material A (kg)**

| Particulars | Quantity |
|---|---:|
| Material required for production | 2,08,125 |
| *Add:* Closing Stock (60% of April requirement = 83,125 × 60%) | 49,875 |
| **Total Requirement** | **2,58,000** |
| *Less:* Opening Stock | 25,000 |
| **Purchase Quantity** | **2,33,000 kg** |

**Material B (kg)**

| Particulars | Quantity |
|---|---:|
| Material required for production | 1,66,500 |
| *Add:* Closing Stock (60% of April requirement = 66,500 × 60%) | 39,900 |
| **Total Requirement** | **2,06,400** |
| *Less:* Opening Stock | 18,000 |
| **Purchase Quantity** | **1,88,400 kg** |
#### Approach
Production = sales + closing finished stock (25% of next month) – opening stock; you need April's production too, because March's closing raw-material stock is 60% of April's requirement.

---
item: q14b
case: c14
qno: 14
part: (B)
type: descriptive
tags: cma.std.material, cma.std.labour
difficulty: medium
q: 18
a: 44-46
---
#### Question
Calculate the following variances for the quarter ended 31st March, 2025:

1. Material Cost Variance
2. Material Price Variance
3. Material Usage Variance
4. Labour Cost Variance
5. Labour Rate Variance
6. Labour Efficiency Variance
#### Answer
**Calculation of Material Cost Variance**

**Working Data**

- Standard Quantity for actual output (42,000 units):
    - Material A = 42,000 × 5 = 2,10,000 kg
    - Material B = 42,000 × 4 = 1,68,000 kg

**Material Cost Variance Statement**

| | Particulars | Material A (₹) | Material B (₹) | Total (₹) |
|---|---|---|---|---:|
| (a) | Std Price × Std Qty | ₹ 12 x 2,10,000 = 25,20,000 | ₹ 18 x 1,68,000 = 30,24,000 | 55,44,000 |
| (b) | Std Price × Actual Qty | ₹ 12 x 2,10,000 = 25,20,000 | ₹ 18 x 1,65,000 = 29,70,000 | 54,90,000 |
| (c) | Actual Cost | ₹ 12.5 x 2,10,000 = 26,25,000 | ₹ 18.40 x 1,65,000 = 30,36,000 | 56,61,000 |

Material Usage Variance **=** Standard Rate x Std. Qty. – Standard Rate x Actual Quantity

- A = 25,20,000 – 25,20,000 = Nil
- B = 30,24,000 – 29,70,000 = 54,000 (F)

Total = 54,000 (F)

Material Price Variance **=** Actual Quantity x Standard rate – Actual Quantity x Actual Rate

- A = 25,20,000 – 26,25,000 = 1,05,000 (A)
- B = 29,70,000 – 30,36,000 = 66,000 (A)

Total = 1,71,000 (A)

Material Cost Variance **=** Standard Cost for Actual output – Actual cost

- A = 25,20,000 – 26,25,000 = 1,05,000 (A)
- B = 30,24,000 – 30,36,000 = 12,000 (A)

Total = 1,17,000 (A)

**Calculation of Labour Cost Variances:**

**Working Notes**

Budgeted output (Q1) = 41,625 units

Standard labour hours = 41,625 × 0.8 = 33,300 hours

Standard rate per hour = = $\dfrac{\text{Budgeted direct labour cost}}{\text{Budgeted direct labour hours}}$

= ₹ 15,36,000 / 33,300 = ₹ 46.13 (approx.)

Standard hours for actual output = 42,000 × 0.8 = 33,600 hours

Actual rate per hour = ₹ 17,85,000 / 35,000 = ₹ 51

Direct Labour Efficiency Variance = Std Rate × (Std Hours – Actual Hours)

= 46.13 × (33,600 – 35,000)

= 46.13 × (–1,400)

= ₹ 64,582 (A)

Direct Labour Rate Variance = Actual Hours × (Std Rate – Actual Rate)

= 35,000 × (46.13 – 51)

= 35,000 × (–4.87)

= ₹ 1,70,450 (A)

Direct Labour Cost Variance = (Std Rate × Std Hours) – Actual Cost

= (46.13 × 33,600) – 17,85,000

= 15,49,968 – 17,85,000

= ₹ 2,35,032 (A)
#### Approach
Standard quantity and standard hours are for the actual output of 42,000 units; the standard labour rate comes from the budgeted cost and the budgeted hours of (A).

---
item: q15
qno: 15
type: descriptive
tags: cma.mc.decisions, cma.mc.multiproduct
difficulty: medium
q: 18-19
a: 46-47
note: ICAI's question names the company "XYX Limited" and labels the proposed product "C" in its second table; the answer heads it "XYZ Limited". Both kept as printed. ICAI's answer ends with the two statements and prints no separate advice sentence.
---
#### Question
XYX Limited manufactures three different products and the following information has been collected from the books of accounts:

| | Products | | |
|---|---:|---:|---:|
| | **A** | **B** | **C** |
| Sales Mix | 35% | 35% | 30% |
| Selling Price | ₹ 30 | ₹40 | ₹20 |
| Variable Cost | ₹ 15 | ₹ 20 | ₹ 12 |
| Total Fixed Costs | | | ₹ 1,80,000 |
| Total Sales | | | ₹ 6,00,000 |

The company has currently under discussion, a proposal to discontinue the manufacture of Product C and replace it with Product P, when the following results are anticipated:

| | Products | | |
|---|---:|---:|---:|
| | **A** | **B** | **C** |
| Sales Mix | 50% | 25% | 25% |
| Selling Price | ₹ 30 | ₹ 40 | ₹ 30 |
| Variable Cost | ₹ 15 | ₹ 20 | ₹ 15 |
| Total Fixed Costs | | | ₹ 1,80,000 |
| Total Sales | | | ₹ 6,40,000 |

Will you advise the company to change over to production of P? Give reasons for your answer.
#### Answer
**XYZ Limited**

**Evaluation of Change over to Product P from Product C**

**Existing Production**

| | Products | | | Total |
|---|---:|---:|---:|---:|
| | **A** | **B** | **C** | |
| Selling Price (₹) | 30 | 40 | 20 | |
| *Less:* Variable Cost (₹) | 15 | 20 | 12 | |
| Contribution per unit (₹) | 15 | 20 | 8 | |
| P/V Ratio | 50% | 50% | 40% | |
| Sales Mix | 35% | 35% | 30% | |
| Contribution *per rupee of sales* (P/V Ratio × Sales Mix) | 17½% | 17½% | 12% | 47% |
| Present Total Contribution (₹ 6,00,000 × 47%) | | | | ₹ 2,82,000 |
| *Less:* Fixed Costs | | | | ₹ 1,80,000 |
| Present Profit | | | | ₹ 1,02,000 |
| Present Break-Even Sales (₹ 1,80,000/0.47) | | | | ₹ 3,82,979 |

**Proposed Production**

| | Products | | | Total |
|---|---:|---:|---:|---:|
| | **A** | **B** | **C** | |
| Selling Price (₹) | 30 | 40 | 30 | |
| *Less:* Variable Cost (₹) | 15 | 20 | 15 | |
| Contribution *per unit* (₹) | 15 | 20 | 15 | |
| P/V Ratio | 50% | 50% | 50% | |
| Sales Mix | 50% | 25% | 25% | |
| Contribution *per rupee of sales* (P/V Ratio x Sales Mix) | 25% | 12½% | 12½% | 50% |
| Proposed Total Contribution (₹ 6,40,000 x 50%) | | | | ₹ 3,20,000 |
| *Less:* Fixed Costs | | | | ₹ 1,80,000 |
| Proposed Profit | | | | ₹ 1,40,000 |
| Proposed Break Even Sales (₹ 1,80,000/0.50) | | | | ₹ 3,60,000 |
#### Approach
Weight each product's P/V ratio by the sales mix to get the contribution per rupee of sales, then compare profit and break-even sales before and after the change.

---
item: q16a
qno: 16
part: (a)
type: descriptive
tags: cma.intro.install
difficulty: easy
q: 19
a: 47-48
---
#### Question
You have been asked to install a costing system in a manufacturing company. What practical difficulties will you expect and how will you propose to overcome the same?
#### Answer
The practical difficulties with which one usually confronted with while installing a costing system in a manufacturing company are as follows:

**(i) Lack of top management support:** Installation of a costing system does not receive the adequate support of top management. They consider it as interference in their work. They believe that such, a system will involve additional paperwork. They also have a misconception in their minds that the system is meant for keeping a check on their activities.

**(ii) Resistance from cost accounting departmental staff:** The staff resists because of fear of loosing their jobs and importance after the implementation of the new system.

**(iii) Non-co-operation from user departments:** The foremen, supervisor and other staff members may not co-operate in providing requisite data, as this would not only add to their responsibilities but will also increase paper work of the entire team as well.

**(iv) Shortage of trained staff:** Since cost accounting system’s installation involves specialised work, there may be a shortage of trained staff.

To overcome these practical difficulties, necessary steps required are:

- To sell the idea to top management – To convince them of the utility of the system.
- Resistance and non-co-operation can be overcome by behavioral approach. To deal with the staff concerned effectively.
- Proper training should be given to the staff at each level

Regular meetings should be held with the cost accounting staff, user departments, staff and top management to clarify their doubts/misgivings.
#### Approach
Two halves are marked: the difficulties (management support, staff resistance, user departments, trained staff) and how each is overcome.

---
item: q16b
qno: 16
part: (b)
type: descriptive
tags: cma.intro.classify
difficulty: easy
q: 19
a: 48
---
#### Question
State the types of cost in the following cases:

(i) Interest paid on own capital not involving any cash outflow.

(ii) Withdrawing money from bank deposit for the purpose of purchasing new machine for expansion purpose.

(iii) Rent paid for the factory building which is temporarily closed

(iv) Cost associated with the acquisition and conversion of material into finished product.
#### Answer
| | Type of costs |
|---|---|
| Interest paid on own capital not involving any cash outflow. | Imputed Cost |
| Withdrawing money from bank deposit for the purpose of purchasing new machine for expansion purpose. | Opportunity Cost |
| Rent paid for the factory building which is temporarily closed | Shut Down Cost |
| Cost associated with the acquisition and conversion of material into finished product. | Product Cost |

---
item: q16c
qno: 16
part: (c)
type: descriptive
tags: cma.bud.basics
difficulty: easy
q: 19
a: 48-49
---
#### Question
Describe the steps involved in the budgetary control technique.
#### Answer
There are certain steps involved in the budgetary control technique. They are as follows:

**(i) Definition of objectives:** A budget being a plan for the achievement of certain operational objectives, it is desirable that the same are defined precisely. The objectives should be written out; the areas of control demarcated; and items of revenue and expenditure to be covered by the budget stated.

**(ii) Location of the key (or budget) factor:** There is usually one factor (sometimes there may be more than one) which sets a limit to the total activity. Such a factor is known as key factor. For proper budgeting, it must be located and estimated properly.

**(iii) Appointment of controller:** Formulation of a budget usually required whole time services of a senior executive known as budget controller; he must be assisted in this work by a Budget Committee, consisting of all the heads of department along with the Managing Director as the Chairman.

**(iv) Budget Manual:** Effective budgetary planning relies on the provision of adequate information which are contained in the budget manual. A budget manual is a collection of documents that contains key information for those involved in the planning process.

**(v) Budget period:** The period covered by a budget is known as budget period. The Budget Committee determines the length of the budget period suitable for the business. It may be months or quarters or such periods as coincide with period of trading activity.

**(vi) Standard of activity or output:** For preparing budgets for the future, past statistics cannot be completely relied upon, for the past usually represents a combination of good and bad factors. Therefore, though results of the past should be studied but these should only be applied when there is a likelihood of similar conditions repeating in the future.

---
item: q16d
qno: 16
part: (d)
type: descriptive
tags: cma.abc.concept
difficulty: easy
q: 19
a: 49
---
#### Question
Provide example(s) of the cost driver for the following cost pools:

| Cost Pool |
|---|
| Quality Control |
| Research and Development |
| Machine Maintenance |
| Employee Training Costs |
| Customer Service |
#### Answer
| Cost Pool | Cost Driver |
|---|---|
| Quality Control | • Number of Inspections<br>• Product Units Produced |
| Research and Development | • Number of research projects<br>• Personnel hours on a project |
| Machine Maintenance | • Machine Hours |
| Employee Training Costs | • Number of Training Hours<br>• Employees Trained |
| Customer Service | • Number of service calls<br>• Number of products serviced<br>• Hours spent on servicing products |
