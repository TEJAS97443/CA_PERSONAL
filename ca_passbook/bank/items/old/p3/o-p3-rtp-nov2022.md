<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p3-rtp-nov2022
paper: p3
kind: rtp
attempt: nov2022
qfile: old/p3/rtp-nov2022-qa.pdf
afile: old/p3/rtp-nov2022-qa.pdf
status: checked
by: tx-57
date: 2026-10-20
note: Old-scheme Intermediate Paper 3 Cost and Management Accounting, Revision Test Paper for the November 2022 examination (running heads "PAPER – 3: COST AND MANAGEMENT ACCOUNTING" / "INTERMEDIATE EXAMINATION: NOVEMBER, 2022"): questions pp.1-13, "SUGGESTED ANSWERS" pp.13-36, one file. ICAI prints no marks, as every RTP. The questions carry ICAI's chapter headings (Material Cost, Employee Cost, Overheads: Absorption Costing Method, ... Miscellaneous); they are headings, not question text, and are not transcribed. Item model: Q1-Q12 and Q14 are each one connected problem whose requirements ((a), (b) ... or (i), (ii) ...) work on the same data and which ICAI answers as one working, so one item each; Q13 (a) and (b) and Q15 (a)-(d) are separate questions, one item each (19 items, all descriptive). Bold headings and bold words in ICAI's answers are kept as **bold**; ICAI's equation-editor formulas are written in KaTeX with ICAI's symbols and numbers, re-spacing the words the equation editor runs together ("No.of employeesreplacedduringthe year"). Old-scheme mapping (ours): Q8 (contract costing) is out of syllabus, see its note; every other item is tagged to the current Paper 4 sub-topics. ICAI's own figures and wording are kept as printed where they look wrong (each in the item's note).
---

---
item: q1
qno: 1
type: descriptive
tags: cma.mat.eoq, cma.mat.levels
difficulty: hard
q: 1
a: 13-16
note: Kept as printed: "a product which names “ESS”" (question); "Recorder Level + Recorder Quantity" and "Recorder Level" for re-order level and quantity in (c) and (d) of the answer.
---
#### Question
M/s Tanishka Materials Private Limited produces a product which names “ESS”. The consumption of raw material for the production of “ESS” is 210 Kgs to 350 Kgs per week. Other information is as follows:

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

= 450 kgs + 646 kgs - (30 kgs X 5 days)

= 946 kgs

**(d) Minimum Stock Level** = Recorder Level – (Average consumption Rate × Average Procurement Time)

= 450 kgs – (40 kgs X 7 days)

= 170 kgs

**(e) Average Stock Level** = $\dfrac{\text{Maximum Stock Level + Minimum Stock Level}}{2}$

= $\dfrac{\text{946 kgs + 170 kgs}}{2}$

= 558 kgs

**(f) Number of Orders to be placed per year**

= $\dfrac{\text{Annual Consumption of Raw Materials}}{\text{EOQ}}$

= $\dfrac{\text{14600 kgs}}{\text{646 kgs}}$

= 22.60 Orders or 23 Orders

**(g) Total Inventory Cost**

Cost of Materials (A x Purchase Price) (14600 kgs x ₹ 100)= ₹ 14,60,000

Total Ordering Cost (No. of Orders x O) (23 Orders x 200) = ₹ 4,600

Total Carrying Cost (EOQ / 2 x C) (646 kgs / 2 x ₹ 14) = ₹ 4,522

Total Inventory Cost ₹ 14,69,122

**(h) If the supplier is willing to offer 1% discount on purchase of total annual quantity in two orders:**

Offer Price = ₹ 100 x 99% = ₹ 99

Revised Carrying Cost = (₹ 99 x 1% x 12 months) + ₹2 = ₹ 13.88

Revised Order Quantity = 14600 kgs / 2 Orders = 7300 kgs

**Total Inventory Cost at Offer Price**

Cost of Materials (A x Purchase Price) (14600 kgs x ₹ 99) = ₹ 14,45,400

Total Ordering Cost (No. of Orders x O) (2 Orders x 200) = ₹ 400

Total Carrying Cost (EOQ / 2 x C) (7300 kgs / 2 x ₹13.88) = ₹ 50,662

Total Inventory Cost ₹ 14,96,462

**Advice:** As total inventory cost at offer price is ₹ 27,340 (14,96,462 – 14,69,122) higher, offer should not be accepted.

**(i) Counter-offer:**

Let Discount Rate = z%

Counter-Offer Price = ₹ 100 – z% = ₹ 100 – z

Revised Carrying Cost = [(₹ 100 – z) x 1% x 12 months] + ₹ 2 = ₹ 12 -0.12z + ₹ 2

= ₹ 14 – 0.12z

**Total Inventory Cost at Counter-Offer Price**

Cost of Materials (A x Purchase Price) [14600 kgs x (₹ 100 – z)] = ₹ 14,60,000 – 14,600z

Total Ordering Cost (No. of Orders x O) (2 Orders x 200) = ₹ 400

Total Carrying Cost (EOQ / 2 x C) [7300 kgs / 2 x (₹ 14 – 0.12z)] = ₹ 51,100 – 438z

Total Inventory Cost ₹ 15,11,500 – 15038z

₹ 14,69,122 = ₹ 15,11,500 – 15038z

Or 15038z = 42,378

Or z = 2.82

Therefore, discount should be at least 2.82% in offer price.
#### Approach
Procurement time is in days, so turn the weekly consumption range into daily maximum, minimum and average first. For the discount offer, compare total inventory cost (purchase, ordering and carrying) at the EOQ with the cost under two orders at the lower price.

---
item: q2
qno: 2
type: descriptive
tags: cma.emp.turnover
difficulty: hard
q: 1-2
a: 16-17
note: Kept as printed: the first line of the Flux Method answer ends "× 10" (the second line has "×100"); "VERIFY the Labour turnover rate calculated under Flux method by Mr. H" (no full stop). The (*) note's fractions 3/8, 3/8 and 2/8 are written in KaTeX.
---
#### Question
HR Ltd. is progressing in its legal industry. One of its trainee executives, Mr. H, in the Personnel department has calculated labour turnover rate 24.92% for the last year using Flux method.

Following is the data provided by the Personnel department for the last year:

| Employees | At the beginning | Joined | Left | At the end |
|---|---:|---:|---:|---:|
| Records clerk | 810 | 1,620 | 90 | 2,340 |
| Human Resource Manager | ? | 30 | 90 | 60 |
| Legal Secretary | ? | 90 | --- | ? |
| Staff Attorney | ? | 30 | 30 | ? |
| Associate Attorney | ? | 30 | --- | 45 |
| Senior Staff Attorney | 6 | --- | --- | 18 |
| Senior Records clerk | 12 | --- | --- | 51 |
| Litigation attorney | ? | --- | --- | ? |
| **Employees transferred from the Subsidiary Company** | | | | |
| Senior Staff Attorney | --- | 12 | --- | --- |
| Senior Records clerk | --- | 39 | --- | --- |
| **Employees transferred to the Subsidiary Company** | | | | |
| Litigation attorney | --- | --- | 90 | --- |
| Associate Attorney | --- | --- | 15 | --- |

At the beginning of the year there were total 1,158 employees on the payroll of the company. The opening strength of the Legal Secretary, Staff Attorney and Associate Attorney were in the ratio of 3 : 3 : 2.

The company has decided to abandon the post of Litigation attorney and consequently all the Litigation attorneys were transferred to the subsidiary company.

The company and its subsidiary are maintaining separate set of books of account and separate Personnel Department.

You are required to:

(a) CALCULATE Labour Turnover rate using Replacement method and Separation method.

(b) VERIFY the Labour turnover rate calculated under Flux method by Mr. H
#### Answer
**Working Notes:**

**(i) Calculation of no. of employees at the beginning and end of the year**

| | At the Beginning of the year | At the end of the year |
|---|---:|---:|
| Records clerk | 810 | 2,340 |
| Human Resource Manager [Left- 90 + Closing- 60 – Joined- 30] | 120 | 60 |
| Legal Secretary\* | 45 | 135 |
| Staff Attorney\* | 45 | 45 |
| Associate Attorney\* | 30 | 45 |
| Senior Staff Attorney | 6 | 18 |
| Senior Records clerk | 12 | 51 |
| Litigation attorney | 90 | 0 |
| **Total** | **1,158** | **2,694** |

(\*) At the beginning of the year:

Strength of Legal Secretary, Staff Attorney and Associate Attorney =

[1158 – {810 + 120 + 6 + 12 + 90} employees] or [1158 – 1038 = 120 employees]

[{Legal Secretary - 120 × $\dfrac{3}{8}$ = 45, Staff Attorney - 120 × $\dfrac{3}{8}$ = 45 & Associate Attorney - 120 × $\dfrac{2}{8}$ = 30} employees]

**At the end of the year:**

[Legal Secretary -(Opening 45 + 90 Joining) = 135; Staff Attorney - (Opening 45 + 30 Joined – 30 Left) = 45]

**(ii) No. of Employees Separated, Replaced and newly recruited during the year**

| Particulars | Separations | New Recruitment | Replacement | Total Joining |
|---|---:|---:|---:|---:|
| Records clerk | 90 | 1,530 | 90 | 1,620 |
| Human Resource Manager | 90 | -- | 30 | 30 |
| Legal Secretary | -- | 90 | -- | 90 |
| Staff Attorney | 30 | -- | 30 | 30 |
| Associate Attorney | 15 | 15 | 15 | 30 |
| Senior Staff Attorney | -- | 12 | -- | 12 |
| Senior Records clerk | -- | 39 | -- | 39 |
| Litigation attorney | 90 | -- | -- | -- |
| **Total** | **315** | **1,686** | **165** | **1,851** |

(Since, HR Ltd. and its subsidiary are maintaining separate Personnel Department, so transfer-in and transfer-out are treated as recruitment and separation respectively.)

**(a) Calculation of Labour Turnover rate:**

Replacement Method = $\dfrac{\text{No. of employees replaced during the year}}{\text{Average no. of employees on roll}} \times 100$

= $\dfrac{165}{(1{,}158+2{,}694)/2} \times 100 = \dfrac{165}{1{,}926} \times 100$= 8.57%

Separation Method = $\dfrac{\text{No. of employees separated during the year}}{\text{Average no. of employees on roll}} \times 100$

= $\dfrac{315}{1{,}926} \times 100$= 16.36%

**(b) Labour Turnover rate under Flux Method:**

= $\dfrac{\text{No. of employees (Joined + Separated) during the year}}{\text{Average no. of employees on roll}} \times 10$

= $\dfrac{\text{No. of employees (Replaced + New recruited + Separated) during the year}}{\text{Average no. of employees on roll}} \times 100$

= $\dfrac{1{,}851+315}{1{,}926} \times 100$= 112.46%

Labour Turnover rate calculated by Mr. H is incorrect as it seems he has not taken the No. of new recruitment while calculating the labour turnover rate under Flux method.
#### Approach
Fill in the missing opening and closing strengths first (the total of 1,158 and the 3 : 3 : 2 ratio give them). Because the subsidiary keeps its own Personnel Department, treat transfers in as recruitment and transfers out as separations.

---
item: q3
qno: 3
type: descriptive
tags: cma.oh.absorb
difficulty: hard
q: 2-3
a: 18-20
note: Kept as printed: the selling price of Product B under the pre-determined rate is "₹ 198.80" in the answer's table (iii) and "198.50" as the total of Working 2 (142.00 + 56.80); the heading "(iii) Effect of using pre-determined on the products' selling prices". In the tables the Pie and Qui workings that ICAI prints on separate lines of one cell are separated by line breaks.
---
#### Question
SE Limited manufactures two products- A and B. The company had budgeted factory overheads amounting to ₹ 36,72,000 and budgeted direct labour hour of 1,80,000 hours. The company uses pre-determined overhead recovery rate for product costing purposes.

The department-wise break-up of the overheads and direct labour hours were as follows:

| Particulars | Budgeted overheads | Budgeted direct labour hours | Rate per direct labour hour |
|---|---:|---:|---:|
| Department Pie | ₹ 25,92,000 | 90,000 hours | ₹ 28.80 |
| Department Qui | ₹ 10,80,000 | 90,000 hours | ₹ 12.00 |
| Total | ₹ 36,72,000 | 1,80,000 hours | |

**Additional Information:**

Each unit of product A requires 4 hours in department Pie and 1 hour in department Qui. Also, each unit of product B requires 1 hour in department Pie and 4 hours in department Qui.

This was the first year of the company's operation. There was no WIP at the end of the year. However, 1,800 and 5,400 units of Products A and B were on hand at the end of the year.

The budgeted activity has been attained by the company. You are required to:

(i) DETERMINE the production and sales quantities of both products 'A' and 'B' for the above year.

(ii) ASCERTAIN the effect of using a pre-determined overhead rate instead of department-wise overhead rates on the company's income due to its effect on stock value.

(iii) CALCULATE the difference in the selling price due to the use of pre-determined overhead rate instead of using department-wise overhead rates. Assume that the direct costs (material and labour costs) per unit of products A and B were ₹ 25 and ₹ 40 respectively and the selling price is fixed by adding 40% over and above these costs to cover profit and selling and administration overhead.
#### Answer
**(i) Computation of production and sales quantities:**

The products processing times are as under –

| Product | A | B | Total |
|---|---|---|---|
| Department Pie | 4 hours | 1 hour | 90,000 hours |
| Department Qui | 1 hour | 4 hours | 90,000 hours |

Let X and Y be the number of units (production quantities) of the two products.

Converting these into equations, we have –

4X + Y = 90,000 &

X + 4Y = 90,000

**Solving the above, we get X = 18,000; Y = 18,000**

Hence, the Production and Sales Quantities are determined as under –

| Product | Production Quantity | Closing Stock (Given) | Sales Quantity (Balancing Figure) |
|---|---:|---:|---:|
| A | **18,000 units** | 1,800 units | **16,200 units** |
| B | **18,000 units** | 5,400 units | **12,600 units** |

**(ii) Effect of using pre-determined rate of overheads on the company's profit**

| Product | Closing Stock Quantity | Overhead included using pre-determined rate | Overhead included using department rate | Difference in overhead in closing stock value / Effect on closing stock value |
|---|---:|---|---|---:|
| A | 1,800 units | 1,800 x 5 hours x ₹ 20.40 = ₹ 1,83,600 | Pie = 1,800 units x 4 hours x ₹ 28.80 = ₹ 2,07,360<br>Qui = 1,800 units x 1 hour x ₹ 12 = ₹ 21,600 | **(-) ₹ 45,360** |
| B | 5,400 units | 5,400 x 5 hours x ₹ 20.40 = ₹ 5,50,800 | Pie = 5,400 units x 1 hour x ₹ 28.80 = ₹ 1,55,520<br>Qui = 5,400 units x 4 hours x ₹12 = ₹ 2,59,200 | **(+) ₹ 1,36,080** |
| Total | | ₹ 7,34,400 | ₹ 6,43,680 | **(+) ₹ 90,720** |

Use of pre-determined overhead rate has resulted in over valuation of stock by ₹ 90,720 due to which the company's income would be affected (increase) by ₹ 90,720. Profit would be affected only to the extent of Overhead contained in closing finished goods and closing WIP, if any.

**(iii) Effect of using pre-determined on the products' selling prices**

| Particulars | Product A | Product B |
|---|---:|---:|
| Selling Price per unit if pre-determined overhead rate is used | ₹177.80 | ₹ 198.80 |
| Selling Price per unit if department wise rate is used | ₹ 213.08 | ₹163.52 |
| **Difference** | **₹ 35.28 Under-Priced** | **₹ 35.28 Over-Priced** |

**Workings**:

**(1) Pre-determined overhead recovery rate =** $\dfrac{\text{₹ 36,72,000}}{\text{1,80,000 hours}}$= ₹ 20.40 per direct labour hour

**(2) If pre-determined recovery rate is used**

| Particulars | Product A in ₹ | Product B in ₹ |
|---|---:|---:|
| Materials & Labour | 25.00 | 40.00 |
| Add: Production Overhead<br>A = 5 hours x ₹ 20.40 per hour<br>B = 5 hours x ₹ 20.40 per hour | 102.00 | 102.00 |
| Cost of production | 127.00 | 142.00 |
| Add: 40% of margin | 50.80 | 56.80 |
| | **177.80** | **198.50** |

**(3) If department-wise recovery rate is used**

| Particulars | Product A in ₹ | Product B in ₹ |
|---|---:|---:|
| Materials & Labour | 25.00 | 40.00 |
| Add: Production Overhead<br>A = Pie = 4 hours x ₹ 28.80<br>Qui = 1 hour x ₹ 12<br>B = Pie = 1 hour x ₹ 28.80<br>Qui = 4 hours x ₹ 12 | 127.20 | 76.80 |
| Cost of production | 152.20 | 116.80 |
| Add: 40% of margin | 60.88 | 46.72 |
| **Selling Price per unit** | **213.08** | **163.52** |
#### Approach
Each department's hours give one equation, so the production of A and B comes from two simultaneous equations. Then compare the overhead in each unit (and in closing stock) at the single blanket rate with the overhead at the two departmental rates.

---
item: q4
qno: 4
type: descriptive
tags: cma.abc.compute
difficulty: hard
q: 3-5
a: 20-22
note: Kept as printed: "The profit margin of BABY Hairclips Company were", "at 10/3% premium", "the time is spend", "approx.. 80% of the amount expend" (question); the answer's Activity Based Costing table heads the third product "Red" (the question's YELLOW). The text layer splits "colour" ("colo ur"); the page prints it whole. The cost-driver table's two-line driver cells ("300" over "Production runs") are joined with a space.
---
#### Question
The profit margin of BABY Hairclips Company were over 20% of sales producing BROWN and BLACK hairclips.

During the last year, GREEN hairclips had been introduced at 10% premium in selling price after the introduction of YELLOW hairclips earlier five years back at 10/3% premium. However, the manager of the company is disheartened with the sales figure for the current financial year as follows:

**Traditional Income Statement** (in ₹)

| | Brown | Black | Yellow | Green | Total |
|---|---:|---:|---:|---:|---:|
| Sales | 1,50,00,000 | 1,20,00,000 | 27,90,000 | 3,30,000 | 3,01,20,000 |
| Material Costs | 50,00,000 | 40,00,000 | 9,36,000 | 1,10,000 | 1,00,46,000 |
| Direct Labour | 20,00,000 | 16,00,000 | 3,60,000 | 40,000 | 40,00,000 |
| Overhead (3 times of direct labour) | 60,00,000 | 48,00,000 | 10,80,000 | 1,20,000 | 1,20,00,000 |
| Total Operating Income | 20,00,000 | 16,00,000 | 4,14,000 | 60,000 | 40,74,000 |
| **Return on Sales (in %)** | 13.3% | 13.3% | 14.8% | 18.2% | 13.5% |

It is a known fact that customers are ready to pay premium amount for YELLOW and GREEN hairclips for their attractiveness; and the percentage returns are also high on new products.

At present, all of the Plant’s indirect expenses are allocated to the products at 3 times of the direct labour expenses. However, the manager is interested in allocating indirect expenses on the basis of activity cost to reveal real earner.

He provides support expenses category-wise as follows:

| Support Expenses | (₹) |
|---|---:|
| Indirect Labour | 40,00,000 |
| Labour Incentives | 32,00,000 |
| Computer Systems | 20,00,000 |
| Machinery depreciation | 16,00,000 |
| Machine maintenance | 8,00,000 |
| Energy for machinery | 4,00,000 |
| **Total** | 1,20,00,000 |

He provides following **additional information** for accomplishment of his interest:

Incentives to be allocated @ 40% of labour expenses (both direct and indirect).

Indirect labours are involved mainly in three activities. About half of indirect labour is involved in handling production runs. Another 40% is required just for the physical changeover from one color hairclip to another because YELLOW hairclips require substantial labour for preparing the machine as compared to other colour hairclips. Remaining 10% of the time is spend for maintaining records of the products in four parts.

Another amount spent on computer system of ₹ 20,00,000 is for maintenance of documents relating to production runs and record keeping of the four products. In aggregate, approx.. 80% of the amount expend is involved in the production run activity and approx.. 20% is used to keep records of the products in four parts.

Other overhead expenses i.e. machinery depreciation, machine maintenance and energy for machinery are incurred to supply machine capacity to produce all the hairclips (practical capability of 20,000 hours).

**Activity Cost Drivers:**

| Particulars | Brown | Black | Yellow | Green | Total |
|---|---:|---:|---:|---:|---:|
| Sales Volume (units) | 1,00,000 | 80,000 | 18,000 | 2,000 | 2,00,000 |
| Selling Price (₹) | 150 | 150 | 155 | 165 | |
| Material cost (₹) | 50 | 50 | 52 | 55 | |
| Machine hours per unit (Hrs) | 0.10 | 0.10 | 0.10 | 0.10 | 20,000 |
| Production runs | 100 | 100 | 76 | 24 | 300 |
| Setup time per run (Hrs) | 4 | 1 | 6 | 4 | |

You are required to –

(i) CALCULATE operating income and operating income as per percentage of sales using activity-based costing system.

(ii) STATE the reasons for different operating income under traditional income system and activity-based costing system.
#### Answer
**(i) Calculation of operating income using Activity Based Costing**

**Calculation of Cost-Driver rate**

| Activity | Overhead cost (₹) | Allocation | Overhead cost (₹) | Cost-driver level | Cost driver rate (₹) |
|---|---:|---:|---:|---:|---:|
| Indirect labour + 40% for incentives | 56,00,000 | 50% | 28,00,000 | 300 Production runs | 9,333.33 |
| | | 40% | 22,40,000 | 1052\* Setup hours | 2,129.28 |
| | | 10% | 5,60,000 | 4 Number of parts | 1,40,000 |
| Computer Systems | 20,00,000 | 80% | 16,00,000 | 300 Production runs | 5,333.33 |
| | | 20% | 4,00,000 | 4 Number of parts | 1,00,000 |
| Machinery depreciation | 16,00,000 | 100% | 16,00,000 | 20,000 Machine hours | 80 |
| Machine Maintenance | 8,00,000 | 100% | 8,00,000 | 20,000 Machine hours | 40 |
| Energy for Machinery | 4,00,000 | 100% | 4,00,000 | 20,000 Machine hours | 20 |

\* (100 x 4) + (100 x 1) + (76 x 6) + (24 x 4)

= (400 + 100 + 456 + 96)

= 1052 setup hours

**Activity Based Costing**

| | Brown | Black | Red | Green | Total |
|---|---:|---:|---:|---:|---:|
| **Quantity (units)** | 1,00,000 | 80,000 | 18,000 | 2,000 | 2,00,000 |
| | (₹) | (₹) | (₹) | (₹) | (₹) |
| **Sales** | 1,50,00,000 | 1,20,00,000 | 27,90,000 | 3,30,000 | 3,01,20,000 |
| Less: Material Costs | 50,00,000 | 40,00,000 | 9,36,000 | 1,10,000 | 1,00,46,000 |
| Less: Direct labour | 20,00,000 | 16,00,000 | 3,60,000 | 40,000 | 40,00,000 |
| Less: 40% incentives on direct labour | 8,00,000 | 6,40,000 | 1,44,000 | 16,000 | 16,00,000 |
| **(A)** | **72,00,000** | **57,60,000** | **13,50,000** | **1,64,000** | **1,44,74,000** |
| **Overheads** | | | | | |
| Indirect labour + incentives | | | | | |
| - 50% based on Production runs | 9,33,333 (9,333.33 x 100) | 9,33,333 (9,333.33 x 100) | 7,09,334 (9,333.33 x 76) | 2,24,000 (9,333.33 x 24) | 28,00,000 |
| - 40% based on Setup hours | 8,51,711 (2,129.28 x 400) | 2,12,928 (2,129.28 x 100) | 9,70,951 (2,129.28 x 456) | 2,04,410 (2,129.28 x 96) | 22,40,000 |
| - 10% based on number of parts | 1,40,000 (1,40,000 x 1) | 1,40,000 | 1,40,000 | 1,40,000 | 5,60,000 |
| Computer Systems | | | | | |
| - 80% based on Production runs | 5,33,333 (5,333.33 x 100) | 5,33,333 (5,333.33 x 100) | 4,05,334 (5,333.33 x 76) | 1,28,000 (5,333.33 x 24) | 16,00,000 |
| - 20% based on number of parts | 1,00,000 (1,00,000 x 1) | 1,00,000 | 1,00,000 | 1,00,000 | 4,00,000 |
| Machinery depreciation | 8,00,000 (80 x 0.1 x 1,00,000) | 6,40,000 (80 x 0.1 x 80,000) | 1,44,000 (80 x 0.1 x 18,000) | 16,000 (80 x 0.1 x 2,000) | 16,00,000 |
| Machine Maintenance | 4,00,000 (40 x 0.1 x 1,00,000) | 3,20,000 (40 x 0.1 x 80,000) | 72,000 (40 x 0.1 x 18,000) | 8,000 (40 x 0.1 x 2,000) | 8,00,000 |
| Energy for Machinery | 2,00,000 (20 x 0.1 x 1,00,000) | 1,60,000 (20 x 0.1 x 80,000) | 36,000 (20 x 0.1 x 18,000) | 4,000 (20 x 0.1 x 2,000) | 4,00,000 |
| **Total Overheads (B)** | **39,58,377** | **30,39,594** | **25,77,619** | **8,24,410** | **1,04,00,000** |
| **Operating Income (A-B)** | **32,41,623** | **27,20,406** | **(12,27,619)** | **(6,60,410)** | **40,74,000** |
| **Return on Sales (%)** | **21.61** | **22.67** | **(44.00)** | **(200.12)** | **13.53** |

**(ii)** The difference in the operating income under the two systems is due to the differences in the overheads borne by each of the products. The Activity Based Costs appear to be more accurate.
#### Approach
Add the 40% incentive to indirect labour before splitting it among runs, set-ups and parts. Set-up hours are runs times set-up time per run for each product, and the machine-related costs are spread over the 20,000 machine hours.

---
item: q5
qno: 5
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
q: 5-6
a: 22-23
---
#### Question
CT Limited is engaged in producing medical equipment. It has furnished following details related to its products produced during a month:

| | Units | Amount (₹) |
|---|---:|---:|
| Raw materials | | |
| Opening stock | 1,000 | 90,00,000 |
| Purchases | 49,000 | 44,10,00,000 |
| Closing stock | 1,750 | 1,57,50,000 |
| Works-in-progress | | |
| Opening | 2,000 | 1,75,50,000 |
| Closing | 1,000 | 94,50,000 |
| Direct employees' wages, allowances etc. | | 6,88,50,000 |
| Primary packaging cost (per unit) | | 1,440 |
| R&D expenses & Quality control expenses | | 2,10,60,000 |
| Consumable stores, depreciation on plant | | 3,42,00,000 |
| Administrative overheads related to production | | 3,15,00,000 |
| Selling expenses | | 4,84,30,800 |
| Royalty paid for production | | 3,64,50,000 |
| Cost of web-site (for online sale) maintenance | | 60,75,000 |
| Secondary packaging cost (per unit) | | 225 |

There was a normal scrap of 250 units of direct material which realized ₹ 5,400 per unit.

The entire finished product was sold at a profit margin of 20% on sales.

You are required to PREPARE a cost sheet showing:

(i) Prime cost

(ii) Gross works cost

(iii) Factory costs

(iv) Cost of production

(v) Profit

(vi) Sales
#### Answer
**Cost Sheet**

| Particulars | Units | Amount (₹) |
|---|---:|---:|
| **Material** | | |
| Opening stock | 1,000 | 90,00,000 |
| Add: Purchases | 49,000 | 44,10,00,000 |
| Less: Closing stock | (1,750) | (1,57,50,000) |
| | 48,250 | **43,42,50,000** |
| **Less: Normal wastage of materials realized @ ₹ 5,400 per unit** | (250) | **(13,50,000)** |
| Material consumed | | 43,29,00,000 |
| Direct employee's wages and allowances | | 6,88,50,000 |
| Direct expenses- Royalty paid for production | | 3,64,50,000 |
| **Prime cost** | 48,000 | **53,82,00,000** |
| Factory overheads - Consumable stores, depreciation etc. | | 3,42,00,000 |
| **Gross Works Cost** | 48,000 | **57,24,00,000** |
| Add: Opening WIP | 2,000 | 1,75,50,000 |
| Less: Closing WIP | (1,000) | (94,50,000) |
| **Factory/Works Cost** | 49,000 | **58,05,00,000** |
| Administration Overheads related to production | | 3,15,00,000 |
| R&D expenses and Quality control cost | | 2,10,60,000 |
| **Add**: **Primary packaging cost @ ₹ 1,440 per unit** | | **7,05,60,000** |
| **Cost of production** | 49,000 | **70,36,20,000** |
| Selling expenses | | 4,84,30,800 |
| Cost of maintaining website for online sale | | 60,75,000 |
| **Secondary packaging cost @ ₹ 225 per unit** | 49,000 | **1,10,25,000** |
| **Cost of sales** | | 76,91,50,800 |
| **Add: Profit @ 20% on sales or 25% of cost** | | **19,22,87,700** |
| **Sales value** | | **96,14,38,500** |
#### Approach
Track units alongside rupees: the normal scrap reduces material at its realisable value, and the units finished (the output after the work-in-progress adjustment) drive both packaging costs. A 20% margin on sales is 25% on cost.

---
item: q6
qno: 6
type: descriptive
tags: cma.sys.recon
difficulty: hard
q: 6-7
a: 23-25
note: Kept as printed: the profit as per financial records is "67,084" in the profit statement and "67,083" at the foot of the reconciliation; the cost of production is "35,84,000" in the costing statement and "35,83,999" in Working Note 2. The closing-stock working is a stacked fraction, written in KaTeX with ICAI's numbers. ICAI underlines "Cost of Sales:" in the costing statement and the last figures of Working Note 1; the underlining is not reproduced.
---
#### Question
The financial books of a company reveal the following data for the financial year ending on 31st March, 2022:

| | (₹) |
|---|---:|
| Opening Stock: | |
| Finished goods 875 units | 1,48,750 |
| Work-in-process | 64,000 |
| 01.04.2021 to 31.3.2022 | |
| Raw materials consumed | 15,60,000 |
| Direct Labour | 9,00,000 |
| Factory overheads | 6,00,000 |
| Goodwill written off | 2,00,000 |
| Administration overheads | 5,90,000 |
| Dividend paid | 1,70,000 |
| Bad Debts | 24,000 |
| Selling and Distribution Overheads | 1,22,000 |
| Interest received | 90,000 |
| Rent received | 36,000 |
| Sales 14,500 units | 41,60,000 |
| Closing Stock: Finished goods 375 units | 82,500 |
| Work-in-process | 77,334 |

The cost records provide as under:

- Factory overheads are absorbed at 60% of direct wages.
- Administration overheads are recovered at 20% of factory cost.
- Selling and distribution overheads are charged at ₹ 8 per unit sold.
- Opening Stock of finished goods is valued at ₹ 208 per unit.
- The company values work-in-process at factory cost for both Financial and Cost Profit Reporting.

Required:

(i) PREPARE statements for the year ended 31st March, 2022 showing-

- the profit as per financial records
- the profit as per costing records.

(ii) PRESENT a statement reconciling the profit as per costing records with the profit as per Financial Records.
#### Answer
**(i) Statement of Profit as per financial records**

**(for the year ended March 31, 2022)**

| | (₹) | | (₹) |
|---|---:|---|---:|
| To Opening stock: | | By Sales | 41,60,000 |
| Finished Goods | 1,48,750 | By Closing stock: | |
| Work-in-process | 64,000 | Finished Goods | 82,500 |
| To Raw materials consumed | 15,60,000 | Work-in-Process | 77,334 |
| To Direct labour | 9,00,000 | By Rent received | 36,000 |
| To Factory overheads | 6,00,000 | By Interest received | 90,000 |
| To Goodwill written off | 2,00,000 | | |
| To Administration overheads | 5,90,000 | | |
| To Selling & distribution overheads | 1,22,000 | | |
| To Dividend paid | 1,70,000 | | |
| To Bad debts | 24,000 | | |
| **To Profit** | **67,084** | | |
| | 44,45,834 | | 44,45,834 |

**Statement of Profit as per costing records**

**(for the year ended March 31,2022)**

| | (₹) | (₹) |
|---|---:|---:|
| Sales revenue (14,500 units) (A) | | 41,60,000 |
| Cost of Sales: | | |
| Opening stock (875 units x ₹ 208) | 1,82,000 | |
| Add: Cost of production of 14,000 units (Refer to Working Note 1& 2) | 35,84,000 | |
| Less: Closing stock $\left(\dfrac{\text{₹ 35,84,000} \times \text{375 units}}{\text{14,000 units}}\right)$ | (96,000) | |
| Production cost of goods sold (14,500 units) | 36,70,000 | |
| Selling & distribution overheads (14,500 units x ₹ 8) | 1,16,000 | |
| Cost of sales: (B) | | 37,86,000 |
| **Profit: {(A) – (B)}** | | **3,74,000** |

**(ii) Statement of Reconciliation**

**(Reconciling the profit as per costing records with the profit as per financial records)**

| | (₹) | (₹) |
|---|---:|---:|
| Profit as per Cost Accounts | | **3,74,000** |
| Add: Admin. overheads over absorbed (₹ 5,97,333 – ₹ 5,90,000) | 7,333 | |
| Opening stock overvalued (₹ 1,82,000 – ₹ 1,48,750) | 33,250 | |
| Interest received | 90,000 | |
| Rent received | 36,000 | **1,66,583** |
| | | 5,40,583 |
| Less: Factory overheads under recovery (₹ 6,00,000 – ₹ 5,40,000) | 60,000 | |
| Selling & distribution overheads under recovery (₹ 1,22,000 – ₹ 1,16,000) | 6,000 | |
| Closing stock overvalued (₹ 96,000 – ₹ 82,500) | 13,500 | |
| Goodwill written off | 2,00,000 | |
| Dividend | 1,70,000 | |
| Bad debts | 24,000 | **4,73,500** |
| Profit as per financial accounts | | **67,083** |

**Working Notes:**

**1. Number of units produced**

| | Units |
|---|---:|
| Sales | 14,500 |
| Add: Closing stock | 375 |
| Total | 14,875 |
| Less: Opening stock | 875 |
| Number of units produced | 14,000 |

**2. Cost Sheet**

| | (₹) | (₹) |
|---|---:|---:|
| Raw materials consumed | | 15,60,000 |
| Direct labour | | 9,00,000 |
| Prime cost | | 24,60,000 |
| Factory overheads (60% of direct wages) | | 5,40,000 |
| Factory cost | | 30,00,000 |
| Add: Opening work-in-process | | 64,000 |
| Less: Closing work-in-process | | 77,334 |
| Factory cost of goods produced | | 29,86,666 |
| Administration overheads (20% of factory cost) | | 5,97,333 |
| Cost of production of 14,000 units | | **35,83,999** |

Cost of production per unit: = $\dfrac{\text{Total Cost of Production}}{\text{No. of units produced}} = \dfrac{\text{₹ 35,83,999}}{\text{14,000units}}$ = ₹ 256
#### Approach
Find the units produced (sales plus closing less opening stock) and build the cost sheet with the cost-record absorption rates; closing stock in the cost accounts is valued at the cost of production per unit. Reconcile each over- or under-absorbed overhead, each stock difference and the items that appear only in the financial books.

---
item: q7
qno: 7
type: descriptive
tags: cma.unit.batch
difficulty: medium
q: 7
a: 25-26
---
#### Question
PS Ltd. manufactures articles in predetermined lots simultaneously. The following costs have been incurred for Batch No. ‘PS143’ in the month of March, 2022:

Units produced 1,000 units

Direct materials cost ₹ 2,00,000

Direct Labour -

Department A 800 labour hours @ ₹ 100 per hour.

Department B 1,400 labour hours @ ₹ 120 per hour.

Factory overheads are absorbed on labour hour basis and the rates are:

Department A @ ₹ 140 per hour.

Department B @ ₹ 80 per hour.

Administrative overheads are absorbed at 10% of selling price.

The firm expects 25% gross profit (sales value minus factory cost) for determining the selling price.

You are required to CALCULATE the selling price per unit of Batch No. 'PS143'.
#### Answer
**Statement showing selling price per unit of Batch number 'PS143'**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Direct Materials | | 2,00,000 |
| **Direct Labour** | | |
| Department A 800 labour hours @ ₹100 per hour | 80,000 | |
| Department B 1400 labour hours @ ₹120 per hour | 1,68,000 | **2,48,000** |
| Factory overheads | | |
| Department A 800 labour hours @ ₹140 per hour | 1,12,000 | |
| Department B 1400 labour hours @ ₹80 per hour | 1,12,000 | 2,24,000 |
| **Factory Cost** | | **6,72,000** |
| Add: Administrative overheads (10% of selling price) (6,72,000/75% x 10%) | | 89,600 |
| Cost of production | | 7,61,600 |
| Add: Profit (15% of selling price) (6,72,000/75% x 15%) | | 1,34,400 |
| Selling price of batch no 'PS143' | | **8,96,000** |
| Selling price per unit (8,96,000 / 1000 units) | | **896** |

Alternatively, selling price calculation:- Selling price assume X

25% = (X – factory cost) / X

or 0.25 X = X- 6,72,000

or 0.75 X = 6,72,000

hence X = ₹ 8,96,000
#### Approach
Gross profit here is sales less factory cost, so factory cost is 75% of the selling price; administration overhead is a share of that selling price, not of cost.

---
item: q8
qno: 8
type: descriptive
tags: cma.job
oos: yes
difficulty: medium
q: 7-8
a: 26
note: Out of syllabus (old scheme): contract costing (the contract account, depreciation of plant on site, work certified and uncertified, and the notional profit) is not in the new-scheme Paper 4 syllabus or the January 2027 Study Material, which has no Contract Costing chapter; tagged with the nearest chapter, Job Costing. ICAI's account prints "To" / "By" in a column of their own and ditto marks (”) below them; that column is kept. The text layer splits "2022" in the question's last line ("202 2"); the page prints it whole.
---
#### Question
A contractor prepares his accounts for the year ending 31st March each year. He commenced a contract on 1st July, 2021.

The following information relates to the contract as on 31st March, 2022:

| | (₹) |
|---|---:|
| Material issued | 12,55,000 |
| Wages | 28,28,000 |
| Salary to Foreman | 4,06,500 |

A machine costing ₹ 13,00,000 has been on the site for 4.8 months, its working life is estimated at 7 years and its final scrap value at ₹ 75,000.

A supervisor, who is paid ₹ 40,000 p.m. has devoted one-half of his time to this contract.

All other expenses and administration charges amount to ₹ 6,82,500.

Material in hand at site costs ₹ 1,77,000 on 31st March, 2022.

The contract price is ₹ 1,00,00,000. On 31st March, 2022 2/3rd of the contract was completed. The architect issued certificates covering 50% of the contract price, and the contractor had been paid ₹ 37,50,000 on account.

PREPARE Contract A/c and show the notional profit or loss as on 31st March, 2022.
#### Answer
**Contract Account**

| | Particulars | (₹) | | Particulars | (₹) |
|---|---|---:|---|---|---:|
| To | Material issued | 12,55,000 | By | Machine (Working note 1) | 12,30,000 |
| ” | Wages | 28,28,000 | ” | Material (in hand) | 1,77,000 |
| ” | Foreman’s salary | 4,06,500 | ” | Works cost (balancing figure) | 52,45,000 |
| ” | Machine | 13,00,000 | | | |
| ” | Supervisor’s salary (₹ 40,000 × 9)/2 | 1,80,000 | | | |
| ” | Administrative charges | 6,82,500 | | | |
| | | 66,52,000 | | | 66,52,000 |
| ” | Works cost | 52,45,000 | ” | Value of work certified | 50,00,000 |
| ” | **Costing P&L A/c** (Notional profit) | **10,66,250** | ” | Cost of work uncertified (Working Note 2) | 13,11,250 |
| | | **63,11,250** | | | **63,11,250** |

**Working notes:**

1. Written down value of Machine:

Depreciation = $\dfrac{\text{₹ 13,00,000 - 75,000}}{\text{7 years}} \times \dfrac{\text{4.8 months}}{\text{12 months}}$ = ₹ 70,000

Hence the value of machine after the period of 4.8 months = ₹ 13,00,000 – ₹ 70,000 = ₹ 12,30,000

2. The cost of 2/3rd of the contract is ₹ 52,45,000

∴ Cost of 100% of the contract is $\dfrac{\text{₹ 52,45,000}}{2}$ ×3 = ₹ 78,67,500

∴ Cost of 50% of the contract which has been certified by the architect is ₹ 39,33,750. Also, the cost of 1/3rd of the contract, which has been completed but not certified by the architect is ₹ 13,11,250.

---
item: q9
qno: 9
type: descriptive
tags: cma.proc.accounts
difficulty: medium
q: 8
a: 27-28
note: Kept as printed: the accounts' unit column is headed "Tones"; "Cost per Tonne" beside "₹ 30 per ton".
---
#### Question
SM Pvt. Ltd. manufactures their products in three consecutive processes. The details are as below:

| | Process A | Process B | Process C |
|---|---:|---:|---:|
| Transferred to next Process | 60% | 50% | |
| Transferred to warehouse for sale | 40% | 50% | 100% |

In each process, there is a weight loss of 2% and scrap of 8% of input of each process. The realizable value of scrap of each process is as below:

Process A @ ₹ 2 per ton

Process B @ ₹ 4 per ton

Process C @ ₹ 6 per ton.

The following particulars relate to April, 2022:

| | Process A | Process B | Process C |
|---|---:|---:|---:|
| Materials used (in Tons) | 1,000 | 260 | 140 |
| Rate per ton | ₹ 20 | ₹ 15 | ₹ 10 |
| Direct Wages | ₹ 4,000 | ₹ 3,000 | ₹ 2,000 |
| Direct Expenses | ₹ 3,160 | ₹ 2,356 | ₹ 1,340 |

PREPARE Process Accounts- A, B and C & calculate cost per ton at each process.
#### Answer
**Process A Account**

| Particulars | Tones | Amount (₹) | Particulars | Tones | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Materials | 1,000 | 20,000 | By Weight Loss | 20 | --- |
| To Wages | | 4,000 | By Scrap | 80 | 160 |
| To Direct Expenses | | 3,160 | By Process B | 540 | 16,200 |
| | | | By Warehouse | 360 | 10,800 |
| Total | 1,000 | 27,160 | Total | 1,000 | 27,160 |

Cost per Tonne = $\dfrac{\text{27,160 – 160}}{\text{1,000 – 20 – 80}}$

= $\dfrac{27{,}000}{900}$

= ₹ 30 per ton

**Process B Account**

| Particulars | Tones | Amount (₹) | Particulars | Tones | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Process A | 540 | 16,200 | By Weight Loss | 16 | --- |
| To Materials | 260 | 3,900 | By Scrap | 64 | 256 |
| To Wages | | 3,000 | By Process C | 360 | 12,600 |
| To Direct Expenses | | 2,356 | By Warehouse | 360 | 12,600 |
| Total | 800 | 25,456 | Total | 800 | 25,456 |

Cost per Tonne = $\dfrac{\text{25,456 – 256}}{\text{800 – 16 – 64}}$

= $\dfrac{25{,}200}{720}$

= ₹35 per ton

**Process C Account**

| Particulars | Tones | Amount (₹) | Particulars | Tones | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Process B | 360 | 12,600 | By Weight Loss | 10 | --- |
| To Materials | 140 | 1,400 | By Scrap | 40 | 240 |
| To Wages | | 2,000 | By Warehouse | 450 | 17,100 |
| To Direct Expenses | | 1,340 | | | |
| Total | 500 | 17,340 | Total | 500 | 17,340 |

Cost per Tonne = $\dfrac{\text{17,340 – 240}}{\text{500 – 10 – 40}}$

= $\dfrac{17{,}100}{450}$

= ₹ 38 per ton
#### Approach
Weight loss and scrap are both percentages of each process's input; only the scrap carries a value. The cost per ton is net cost over the good output, which is then split between the next process and the warehouse.

---
item: q10
qno: 10
type: descriptive
tags: cma.joint.apportion, cma.joint.byprod
difficulty: medium
q: 8-9
a: 28-29
note: The text layer spaces "split-off" as "split -off" in the question's first line and in the answer; the page prints it as one word.
---
#### Question
JP Ltd. uses joint production process that produces three products at the split-off point. Joint production costs during the month of July, 2022 were ₹ 33,60,000.

Product information for the month of July is as follows:

| Particulars | Product A | Product B | Product C |
|---|---:|---:|---:|
| Units produced | 3,000 | 6,000 | 9,000 |
| Sales prices: | | | |
| At the split-off | ₹ 200 | | |
| After further processing | ₹ 300 | ₹ 350 | ₹ 100 |
| Costs to process after split-off | ₹ 6,00,000 | ₹ 6,00,000 | ₹ 6,00,000 |

Other information is as follows:

Product C is a by-product and the company accounts for the by-product at net realizable value as a reduction of joint cost. Further, Product B & C must be processed further before they can be sold. FIND OUT the joint cost allocated to Product A in the month of July if joint cost allocation is based on Net Realizable Value.
#### Answer
**Product A**

As the question says that "Products B and C must be processed further before they can be sold", it means Product A can be sold at the split-off point.

Cost to process Product A after the split-off point = ₹ 6,00,000

Additional revenue to be earned by processing further = ₹ 3,00,000 (₹ 100 increase in selling price per unit x 3,000 units)

Therefore, Product A will not be processed further, and the sales value at split-off for A will be used for allocating the joint costs.

Sales value at the split-off for A = ₹ 6,00,000 (₹ 200 × 3,000 units)

**Product B**

Since Product B must be processed further, we use its net realizable value for the joint cost allocation.

Net realizable value of Product B = ₹ 15,00,000 [(₹ 350 × 6,000 units) – ₹ 6,00,000 further processing costs]

**Product C**

Product C, the by-product, must also be processed further to be sold.

Net realizable value of Product C = ₹ 3,00,000 [(₹ 100 × 9,000 units) – ₹ 6,00,000 in further processing costs]

**Joint Cost Allocation**

Joint production cost = ₹ 33,60,000

Since, by-product C is accounted for as a reduction to the joint costs, the joint costs to be allocated = ₹ 30,60,000 (₹ 33,60,000 - ₹ 3,00,000 NRV of Product C)

Allocation of joint costs between Product A and B will be on the basis of ₹ 6,00,000: ₹ 15,00,000

Joint Cost allocated to Product A = ₹ 30,60,000 x $\dfrac{\text{₹ 6,00,000}}{\text{₹ 21,00,000}}$ = ₹ 8,74,286
#### Approach
Decide first whether Product A should be processed further (compare its extra revenue with the extra cost); then reduce the joint cost by the by-product's net realisable value before sharing it between A and B.

---
item: q11
qno: 11
type: descriptive
tags: cma.svc.transport
difficulty: medium
q: 9-10
a: 29-30
note: Kept as printed: "kept away from roods each day" (question); "Diesel (49,600 Kms / 10 Kms X ₹ 80 per unit)" (answer). The question's expense list runs over q pp.9-10.
---
#### Question
Royal Transport Services runs fleet of buses within the limits of Jaipur city. The following are the details which were incurred by the company during October, 2021:

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

| | Capacity |
|---|---|
| 12 Buses | 60 Passengers |
| 13 Buses | 50 Passengers |

Each bus makes 4 round trips a day covering a distance of 10 Kilometers in each trip (One Way) on an average. During the trips 80% of the seats are occupied. The annual records show that 5 buses are generally required to be kept away from roods each day for repairs.

You are required to CALCULATE cost per passenger-km.

Cost sheet to be prepared on the basis of 25 buses.
#### Answer
**Operating Cost Sheet**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Standing Charges: | | |
| Depreciation (₹ 24,00,000 X 10% X 1/12 X 25) | 5,00,000 | |
| Garage Rent | 1,00,000 | |
| Insurance | 25,000 | |
| Road Tax | 20,000 | |
| Manager’s Salary | 60,000 | |
| Assistant’s Salary (₹ 32,000 X 2) | 64,000 | |
| Supervisor’s Salary (₹ 24,000 X 3) | 72,000 | |
| Driver’s Salary (₹ 20,000 X 25) | 5,00,000 | |
| Cleaner’s Salary (₹ 5,000 X 20) | 1,00,000 | |
| Office Staff’s Salary | 1,00,000 | |
| Consumables | 1,20,000 | |
| Repairs & Maintenance | 90,000 | |
| Other Fixed Expenses | 72,000 | 18,23,000 |
| Running Charges | | |
| Diesel (49,600 Kms / 10 Kms X ₹ 80 per unit) | 3,96,800 | |
| Oils & Lubricants | 1,45,000 | |
| Tyres and tubes | 35,000 | 5,76,800 |
| Total Operating Cost | | 23,99,800 |

Cost per passenger-km = $\dfrac{\text{Total Operating Cost}}{\text{Passenger –kms}}$

= $\dfrac{23{,}99{,}800}{27{,}18{,}080}$

= 0.883

**Working Note:**

Calculation of Total Kilometers and Passenger Kilometers

| Specification | Total Km. | Passenger–Km. |
|---|---:|---:|
| 12 Buses (60 Passengers) | 29,760 Kms (10 Kms × 4 X 2 trips × 31 days x 12 Buses) | 14,28,480 (29760 Kms x 60 Pass. x 80%) |
| 13 Buses (50 Passengers) | 32,240 Kms (10 Kms × 4 X 2 trips × 31 days x 13 Buses) | 12,89,600 (32240 Kms x 50 Pass. x 80%) |
| **Total** | **62,000** | **27,18,080** |

Since 5 buses out of 25 buses are kept for repairs every day

Actual total Km. 62,000 × 20/25 = 49,600
#### Approach
A round trip is two one-way trips of 10 km; work out kilometres for each capacity group over the 31 days of October, then passenger-km at 80% occupancy. Only 20 of the 25 buses run on a day, which matters for the running costs.

---
item: q12
qno: 12
type: descriptive
tags: cma.std.material, cma.std.labour, cma.std.foh
difficulty: hard
q: 10-11
a: 30-32
note: Kept as printed: in (iii) the actual usage is worked as "(₹4,80,000 -₹ 1,80,000)/₹2 = 2,40,000 kgs"; (iii) asks for the quantity purchased and ICAI's working calls it "Actual Usage".
---
#### Question
Ahaan Limited operates a system of standard costing in respect of one of its products 'AH1' which is manufactured within a single cost centre. Details of standard per unit are as follows:

- The standard material input is 20 kilograms at a standard price of ₹ 24 per kilogram.
- The standard wage rate is ₹ 72 per hour and 5 hours are allowed to produce one unit.
- Fixed production overhead is absorbed at the rate of 100% of wages cost.

During the month of April 2022, the following was incurred:

- Actual price paid for material purchased @ ₹ 22 per kilogram.
- Total direct wages cost was ₹ 43,92,000
- Fixed production overhead cost incurred was ₹ 45,00,000

Analysis of variances was as follows:

| Variances | Favourable | Adverse |
|---|---:|---:|
| Direct material price | ₹ 4,80,000 | - |
| Direct material usage | ₹ 48,000 | |
| Direct labour rate | - | ₹ 69,120 |
| Direct labour efficiency | ₹ 33,120 | - |
| Fixed production overhead expenditure | | ₹ 1,80,000 |

You are required to CALCULATE the following for the month of April, 2022

(i) Material cost variance

(ii) Budgeted output (in units)

(iii) Quantity of raw materials purchased (in kilograms)

(iv) Actual output (in units)

(v) Actual hours worked

(vi) Actual wage rate per labour hour

(vii) Labour cost variance

(viii) Production overhead cost variance
#### Answer
**(i) Direct Material Cost Variance** = Direct Material Price Variance + Direct Material Usage Variance

= ₹ 4,80,000 F + ₹ 48,000 F = ₹ **5,28,000 F**

**(ii) Budgeted Output (units)**

Fixed Production Overhead Expenditure Variance

= Budgeted Fixed Overhead - Actual Fixed Overheads

= Budgeted Output x Standard Overhead Rate - Actual Fixed Overheads

₹ 1,80,000 A = Budgeted Output x ₹ 360 (5 hrs @₹ 72) - ₹ 45,00,000

Budgeted Output = $\dfrac{\text{₹45,00,000 -₹ 1,80,000}}{\text{₹360}}$ = **12,000 units**

**(iii) Quantity of Materials purchased (in kilograms)**

Material Price Variance = Actual Usage (Standard Price per kg - Actual price per kg)

₹ 4,80,000 F = Actual Usage (₹ 24 -₹ 22)

Actual usage in kgs = $\dfrac{\text{₹4,80,000 -₹ 1,80,000}}{\text{₹2}}$ = **2,40,000 kgs**

**(iv) Actual Output (units)**

| | |
|---|---:|
| Actual Direct Wages | ₹ 43,92,000 |
| Direct labour rate variance | ₹ 69,120 A |
| Direct labour efficiency variance | ₹ 33,120 F |
| Standard labour cost for actual output | ₹ 43,56,000 |

Actual Output = $\dfrac{\text{Standard labour cost for actual output}}{\text{Standard wage rate per unit}}$

= $\dfrac{\text{₹ 43,56,000}}{\text{₹ 360 (72 x 5)}}$ = **12,100 units**

**Alternatively,** let X be the actual quantity of output

Then, Standard Quantity of input for actual output 'X'

20X = SQ

Material cost variance = (SQ x SP) - (AQ x AP)

₹ 5,28,000 = (20 X x ₹ 24) - (2,40,000 kgs x ₹ 22)

480X = ₹ 52,80,000 + ₹ 5,28,000

480X = ₹ 58,08,000

X = $\dfrac{\text{₹ 58,08,000}}{480}$ = **12,100 units**

**(v) Actual hours worked**

Labour Efficiency Variance = Standard Labour Rate (Standard time for actual output - Actual time)

₹ 33,120 F = ₹ 72 (5 hours x 12100 units - Actual time)

460 hours = 60,500 hours - Actual time

Actual time = 60,500 - 460 = **60,040 hours**

**(vi) Actual wage rate per hour**

Actual Wages paid = ₹ 43,92,000

Actual hours worked = 60,040 hours

Actual Wage rate per hour = $\dfrac{\text{₹ 43,92,000}}{\text{60,040 hours}}$ = **₹ 73.15 per hour**

**(vii) Labour cost variance**

= Labour rate variance + Labour efficiency variance

=₹ 69,120 A + ₹ 33,120 F

= ₹ **36,000 A**

**(viii) Production Overhead Cost Variance**

= Actual Output x Standard overhead rate - Actual Overheads Incurred

= 12,100 units x₹ 360 - ₹ 45,00,000

= ₹ 43,56,000 - ₹ 45,00,000

= ₹ 1,44,000 A
#### Approach
Work backwards from the variances: the fixed overhead expenditure variance gives budgeted overhead and so budgeted output; the price variance gives the quantity bought; actual wages adjusted by the two labour variances give the standard labour cost of the actual output.

---
item: q13a
qno: 13
part: (a)
type: descriptive
tags: cma.mc.decisions
difficulty: easy
q: 11
a: 32
---
#### Question
RPP Manufacturers is approached by an international customer for one-time special order similar to one offered to its domestic customers. Per unit data for sales to regular customers is provided below:

| | |
|---|---:|
| Direct material | ₹ 693 |
| Direct labour | ₹ 315 |
| Variable manufacturing support | ₹ 504 |
| Fixed manufacturing support | ₹ 1092 |
| Total manufacturing costs | ₹ 2604 |
| Markup (50%) | ₹ 1302 |
| Targeted selling price | ₹ 3906 |

It is provided that RPP Manufacturers has excess capacity.

Required:

(i) WHAT is the full cost of the product per unit?

(ii) WHAT is the contribution margin per unit?

(iii) WHICH costs are relevant for making the decision regarding this one-time special order? WHY?

(iv) For RPP Manufacturers, WHAT is the minimum acceptable price of this one-time-special order only

(v) For this one-time-only special order, SHOULD RPP Manufacturers consider a price of ₹ 2100 per unit? WHY or why not?
#### Answer
(i) Full cost of the product per unit

| | |
|---|---:|
| Direct material | ₹ 693 |
| Direct labour | ₹ 315 |
| Variable manufacturing support | ₹ 504 |
| Fixed manufacturing support | ₹ 1092 |
| Total manufacturing costs | ₹ 2604 |

(ii) Contribution margin per unit

| | |
|---|---:|
| Selling price | ₹ 3906 |
| Less: Variable costs | |
| Direct material | ₹ 693 |
| Direct labour | ₹ 315 |
| Variable manufacturing support | ₹ 504 |
| Contribution margin per unit | ₹ 2394 |

(iii) Costs for decision making are those costs that differ between alternatives, which in this situation are the incremental costs.

| | |
|---|---:|
| Direct material | ₹ 693 |
| Direct labour | ₹ 315 |
| Variable manufacturing support | ₹ 504 |
| Total incremental costs | ₹ 1512 |

(iv) Minimum acceptable price would be the incremental costs in the short term i.e. ₹ 1512

(v) Yes, RPP Manufacturers may consider a price of ₹ 2100 per unit because this price is greater than the minimum acceptable price.
#### Approach
With spare capacity the fixed manufacturing support is incurred anyway, so only the variable costs change with this one-time order.

---
item: q13b
qno: 13
part: (b)
type: descriptive
tags: cma.mc.decisions, cma.svc.others
difficulty: medium
q: 12
a: 33
---
#### Question
The lab corner of Newlife Hospital Trust operates two types of specialist MRI scanning machine- MR10 and MR59. Following details are estimated for the next period:

| Machine | MR10 | MR59 |
|---|---:|---:|
| Running hours | 1,100 | 2,000 |
| | (₹) | (₹) |
| Variable running costs excluding special technology | 68,750 | 1,60,000 |
| Fixed Costs | 50,000 | 2,43,750 |

A brain scan is normally carried out on machine type MR10. This task uses special technology costing ₹ 100 each and takes four hours of machine time. Because of the nature of the process, around 10% of the scans produce blurred and therefore useless results.

Required:

(i) CALCULATE the total cost of a satisfactory brain scan on machine type MR10.

(ii) Brain scans can also be done on machine type MR59 and would take only 1.8 hours per scan with a reduced reject rate of 6%. However, the cost of the special technology would be ₹ 137.50 per scan. ADVISE which type should be used, assuming sufficient capacity is available on both types of machines. Consider fixed costs will remain unchanged.
#### Answer
**(i)**

| Particulars | (₹) |
|---|---:|
| Variable cost per running hour of Machine MR10 (₹ 68,750/1100 hours) | 62.50 |
| Fixed cost (₹ 50,000/1100 hours) | 45.46 |
| Cost of brain scan on Machine MR10: | (₹) |
| Variable machine cost (4 hours × ₹ 62.50) | 250.00 |
| Special technology | 100.00 |
| Total variable cost | 350.00 |
| Fixed machine cost (4 hours × ₹ 45.46) | 181.84 |
| Total cost of a scan | 531.84 |
| **Total cost of a satisfactory scan (₹ 531.84/0.9)** | **590.93** |

**(ii)** It is given that fixed cost will remain unchanged and thus they are not relevant for the decision. The relevant costs would be the incremental costs of an additional scan:

| | |
|---|---:|
| **Machine MR10:** | (₹) |
| Variable cost per scan | 350.00 |
| **Variable cost per satisfactory scan (₹ 350/0.9)** | **388.89** |
| **Machine MR59:** | (₹) |
| Variable machine cost per scan (₹ 1,60,000 / 2000 hours × 1.8 hours) | 144.00 |
| Special technology | 137.50 |
| Variable cost per scan | 281.50 |
| **Variable cost per satisfactory scan (₹ 281.50/0.94)** | **299.47** |

The relevant costs per satisfactory scan are cheaper on Machine MR59 and therefore brain scans should be undertaken on said machine.
#### Approach
Divide the cost of one scan by the share of scans that succeed to get the cost of a satisfactory scan. For the choice of machine, fixed costs do not change, so compare variable costs only.

---
item: q14
qno: 14
type: descriptive
tags: cma.bud.ratios
difficulty: medium
q: 12-13
a: 33-34
---
#### Question
Following information is available for DK and Co.:

| | |
|---|---|
| Standard working hours | 9 hours per day of 5 days per week |
| Maximum capacity | 50 employees |
| Actual working | 40 employees |
| Actual hours expected to be worked per four week | 7,200 hours |
| Std. hours expected to be earned per four weeks | 9,000 hours |
| Actual hours worked in the four- week period | 6,750 hours |
| Standard hours earned in the four- week period | 7,875 hours. |

The related period is of 4 weeks. In this period there was a one special day holiday due to national event.

You are required to CALCULATE the following ratios:

(i) Efficiency Ratio

(ii) Activity Ratio

(iii) Calendar Ratio

(iv) Standard Capacity Usage Ratio

(v) Actual Capacity Usage Ratio

(vi) Actual Usage of Budgeted Capacity Ratio
#### Answer
Maximum Capacity in a budget period

= 50 Employees × 9 Hrs. × 5 Days × 4 Weeks = 9,000 Hrs.

Budgeted Hours

= 40 Employees × 9 Hrs. × 5 Days × 4 Weeks = 7,200 Hrs.

Actual Hrs.

= 6,750 Hrs.

Standard Hrs. for Actual Output

= 7,875 Hrs.

Budget No. of Days

= 20 Days (4 Weeks x 5 Days)

Actual No. of Days

= 20 – 1 = 19 Days

(i) Efficiency Ratio = $\dfrac{\text{Standard Hrs}}{\text{Actual Hrs}} \times 100 = \dfrac{\text{7,875 hours}}{\text{6,750 hours}} \times 100$ = 116.67%

(ii) Activity Ratio = $\dfrac{\text{Standard Hrs}}{\text{Budgeted Hrs}} \times 100 = \dfrac{\text{7,875 hours}}{\text{7,200 hours}} \times 100$ = 109.375%

(iii) Calendar Ratio = $\dfrac{\text{Available working days}}{\text{Budgeted working days}} \times 100 = \dfrac{\text{19 days}}{\text{20 days}} \times 100$ = 95%

(iv) Standard Capacity Usage Ratio = $\dfrac{\text{Budgeted Hours}}{\text{Max. possible hours in the budgeted period}} \times 100$

= $\dfrac{\text{7,200 hours}}{\text{9,000 hours}} \times 100$ = 80%

(v) Actual Capacity Usage Ratio = $\dfrac{\text{Actual Hours worked}}{\text{Max. possible working hours in a period}} \times 100$

= $\dfrac{\text{6,750 hours}}{\text{9,000 hours}} \times 100$ = 75%

(vi) Actual Usage of Budgeted Capacity Ratio = $\dfrac{\text{Actual working Hours}}{\text{Budgeted Hours}} \times 100$

= $\dfrac{\text{6,750 hours}}{\text{7,200 hours}} \times 100$= 93.75%
#### Approach
Set out the four hour figures first: maximum capacity (50 employees), budgeted hours (40 employees), actual hours and standard hours for the actual output; the calendar ratio uses the working days lost to the holiday.

---
item: q15a
qno: 15
part: (a)
type: descriptive
tags: cma.intro.classify, cma.intro.behaviour
difficulty: easy
q: 13
a: 34
note: The question prints a blank line under each of the four heads for every cost; the blanks are written as underscores.
---
#### Question
Health Wealth Hospital is interested in estimating the cost for each patient stay. The hospital offers general health care facility i.e. only basic services.

You are required to:

(i) CLASSIFY each of the following costs as either direct or indirect with respect to each patient.

(ii) CLASSIFY each of the following costs as either fixed or variable with respect to hospital costs per day.

| | Direct | Indirect | Fixed | Variable |
|---|---|---|---|---|
| Electronic monitoring | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ |
| Meals for patients | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ |
| Nurses' salaries | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ |
| Parking maintenance | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ |
| Security | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ | \_\_\_\_\_ |
#### Answer
| Item | Direct | Indirect | Fixed | Variable |
|---|---|---|---|---|
| Electronic monitoring | YES | | | YES |
| Meals for patients | YES | | | YES |
| Nurses' salaries | | YES | YES | |
| Parking maintenance | | YES | YES | |
| Security | | YES | YES | |

---
item: q15b
qno: 15
part: (b)
type: descriptive
tags: cma.intro.control
difficulty: easy
q: 13
a: 35
---
#### Question
Differentiate between Cost Control and Cost Reduction.
#### Answer
| Cost Control | | Cost Reduction | |
|---|---|---|---|
| 1. | Cost control aims at **maintaining** the costs in accordance with the established standards. | 1. | Cost reduction is concerned with **reducing** costs. It challenges all standards and endeavours to improvise them continuously |
| 2. | Cost control seeks to **attain lowest possible cost** under existing conditions. | 2. | Cost reduction recognises no condition as permanent, since a **change will result in lower cost.** |
| 3. | In case of cost control, emphasis is on **past and present** | 3. | In case of cost reduction, it is on **present and future.** |
| 4. | Cost control is a **preventive** function | 4. | Cost reduction is a **corrective** function. It operates even when an efficient cost control system exists. |
| 5. | Cost control ends when targets are achieved. | 5. | Cost reduction has no visible end and is a continuous process. |

---
item: q15c
qno: 15
part: (c)
type: descriptive
tags: cma.intro.relations
difficulty: easy
q: 13
a: 35
---
#### Question
Though Cost Accounting and Management Accounting is used synonymously but there are a few differences. Elaborate those differences.
#### Answer
| | Basis | Cost Accounting | Management Accounting |
|---|---|---|---|
| (i) | **Nature** | It records the quantitative aspect only. | It records both qualitative and quantitative aspect. |
| (ii) | **Objective** | It records the cost of producing a product and providing a service. | It provides information to management for planning and co-ordination. |
| (iii) | **Area** | It only deals with cost Ascertainment. | It is wider in scope as it includes financial accounting, budgeting, taxation, planning etc. |
| (iv) | **Recording of data** | It uses both past and present figures. | It is focused with the projection of figures for future. |
| (v) | **Development** | Its development is related to industrial revolution. | Its development is related to the need of modern business world. |
| (vi) | **Rules and Regulation** | It follows certain principles and procedures for recording costs of different products. | It does not follow any specific rules and regulations. |

---
item: q15d
qno: 15
part: (d)
type: descriptive
tags: cma.intro.terms
difficulty: easy
q: 13
a: 36
---
#### Question
What are cost units? Write the cost unit basis against each of the following Industry/Product-Automobile, Steel, Cement, Chemicals, Power and Transport.
#### Answer
Cost units are usually the units of physical measurement like number, weight, area, volume, length, time and value.

| Industry or Product | Cost Unit Basis |
|---|---|
| Automobile | Number |
| Steel | Ton |
| Cement | Ton/ per bag etc. |
| Chemicals | Litre, gallon, kilogram, ton etc. |
| Power | Kilo-watt hour (kWh) |
| Transport | Passenger- kilometer |
