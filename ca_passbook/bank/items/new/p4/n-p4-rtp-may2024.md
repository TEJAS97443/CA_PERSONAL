<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-rtp-may2024
paper: p4
kind: rtp
attempt: may2024
qfile: new/p4/rtp-may2024-qa.pdf
afile: new/p4/rtp-may2024-qa.pdf
status: checked
by: tx-29
date: 2026-10-20
note: Transcribed from ICAI's RTP for May 2024, Paper 4 (questions pp.1-17, suggested answers/hints pp.17-44). ICAI prints Division A (three case scenarios, Q1-Q3, five MCQs each) and Division B (descriptive, Q4-Q13) with no marks, as every RTP. The division headings and ICAI's chapter headings ("Material Cost", "Employee Cost", ... "Miscellaneous") are headings, not question text, and are not transcribed. Q13's four theory parts (a)-(d) are answered separately and are one item each; every other descriptive question is answered by ICAI as one connected solution and is one item. Kept as ICAI prints them: option (D) of Q2(iii) is printed "d)" (written (D)); Q3's case reads "At the of preparation of revenue budget"; in Q4's answer the second revenue row is also labelled "Revenues (at listed price) (₹): (c)" although it is at actual selling price; Q6's reconciliation reads "₹ 3,15000"; Q7's profit table has no row D and refers to WN-3, WN-4 and WN-5 where the workings are numbered 1 to 4; Q10's table heads its coal column "Standard Qty. for Iron ore"; Q12's budget reads "[40%×7,00.000]" and "[112%×4,20,000]" under the safety cost; Q8's answers print "5709.20" without a comma. Superscripts are written as Unicode (31ˢᵗ as 31st, M³). Stacked fractions and roots are written in KaTeX with ICAI's numbers; the ∴ signs of Q2's answers are ICAI's. Q3(i)'s fraction, which ICAI's equation prints as "₹ 50, 40,000", is written ₹ 50,40,000. Accepted numbers (check.py): the title "PAPER – 4: COST AND MANAGEMENT ACCOUNTING" on p.1 (4); the numerator "30000" of Q1(iii)'s fraction, printed as the first line of p.18, which check.py drops as if it were a page number (30,000); and the three superscript 3s of "M³" in Q10's answer table on pp.36-37 (3, 3, 3).
---

---
case: c1
qno: 1
q: 1-2
---
#### Case
The purchase committee of A Ltd. has been entrusted to review the material procurement policy of the company. The chief marketing manager has appraised the committee that the company at present produces a single product X by using two raw materials A and B in the ratio of 3:2. Material A is perishable in nature and has to be used within 10 days from Goods received note (GRN) date otherwise material becomes obsolete. Material B is durable in nature and can be used even after one year. Material A is purchased from the local market within 1 to 2 days of placing order. Material B, on the other hand, is purchased from neighbouring state and it takes 2 to 4 days to receive the material in the store.

The purchase price of per kilogram of raw material A and B is ₹30 and ₹44 respectively exclusive of taxes. To place an order, the company has to incur an administrative cost of ₹1,200. Carrying cost for Material A and B is 15% and 5% respectively. At present material A is purchased in a lot of 15,000 kg. to avail 10% discount on market price. GST applicable for both the materials is 18% and the input tax credit is availed.

The sales department has provided an estimate that the company could sell 30,000 kg. in January 2024 and also projected the same trend for the entire year.

The ratio of input and output is 5:3. Company works for 25 days in a month and production is carried out evenly.

The following queries/ calculations to be kept ready for purchase committees’ reference:

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: D
tags: cma.mat.levels
difficulty: easy
q: 2
a: 17
---
#### Question
For the month of January 2024, what would be the quantity of the materials to be requisitioned for both material A and B:
#### Options
(A) 9,000 kg & 6,000 kg respectively
(B) 18,000 kg & 12,000 kg respectively
(C) 27,000 kg & 18,000 kg respectively
(D) 30,000 kg & 20,000 kg respectively.
#### Answer
**(d)** Monthly Production of X = 30,000 kgs.

Raw Material Required = $\dfrac{30{,}000}{3} \times 5$ = 50,000 kgs.

Material A = $\dfrac{50{,}000}{5} \times 3$ = **30,000 kg.**

Material B = $\dfrac{50{,}000}{5} \times 2$ = **20,000 kg.**
#### Approach
Work back from output to input with the 5:3 ratio, then split the input between A and B in 3:2.

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: A
tags: cma.mat.eoq
difficulty: easy
q: 2
a: 17
---
#### Question
The economic order quantity (EOQ) for both the material A & B:
#### Options
(A) 13,856 kg & 16,181 kg respectively
(B) 16,197 kg & 17,327 kg respectively
(C) 16,181 kg & 17,165 kg respectively
(D) 13,197 kg & 17,165 kg respectively
#### Answer
**(a)** Calculation of Economic Order Quantity (EOQ):

Material A = $\sqrt{\dfrac{2 \times \text{Annual consumption} \times \text{Order cost}}{\text{Carrying cost per unit p.a.}}}$

= $\sqrt{\dfrac{2 \times (30{,}000 \times 12) \times 1{,}200}{15\% \text{ of } 30}}$ = **13,856 kg.**

Material B = $\sqrt{\dfrac{2 \times (20{,}000 \times 12) \times 1{,}200}{5\% \text{ of } 44}}$ = **16,181 kg.**
#### Approach
Annualise the monthly requirement from (i) and apply the carrying-cost percentage to each material's own price.

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: B
tags: cma.mat.levels
difficulty: medium
q: 2
a: 17-18
---
#### Question
What would the maximum stock level for material A:
#### Options
(A) 18,200 kg.
(B) 12,000 kg.
(C) 16,000 kg.
(D) 16,200 kg.
#### Answer
**(b)** Calculation of Maximum Stock level: Since, the Material A is perishable in nature and it required to be used within 10 days, hence, the Maximum Stock Level shall be lower of two:

(a) Stock equal to 10 days consumption

= $\dfrac{30000}{25} \times 10$ days = 12,000 kg.

(b) Maximum Stock Level for Material A:

Re-order Quantity + Re-order level – (Min consumption\* × Min. lead time)

Where, Re-order Quantity = 15,000 kg.

Re-order level = Max. Consumption\* × Max. Lead time

= 30,000/25 × 2 days = 2,400 kg.

Maximum stock Level = 15,000 kg. + 2,400 kg. - (30,000/25 × 1 day)

= 17,400 – 1,200 = 16,200 kg.

Stock required for 10 days consumption is lower than the maximum stock level calculated through the formula. Therefore, Maximum Stock Level will be **12,000 kg.**

(\*Since, production is processed evenly throughout the month hence material consumption will also be even.)
#### Approach
Material A perishes in 10 days, so the formula's maximum is capped: compare it with ten days' consumption and take the lower.

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: B
tags: cma.mat.eoq, cma.mat.losses
difficulty: hard
q: 2
a: 18-19
---
#### Question
Calculate saving/ loss in purchase of Material A if the purchase order quantity is equal to EOQ.
#### Options
(A) Profit of Rs. 3,21,201.
(B) Loss of Rs. 3,21,201.
(C) Profit of Rs. 2,52,500.
(D) Loss of Rs. 2,52,500.
#### Answer
**(b)** **Calculation of Savings/ loss in Material A if purchase quantity equals to EOQ.**

| | Purchase Quantity = 15,000 kg. | Purchase Quantity = EOQ i.e. 13,856 kg. |
|---|---:|---:|
| Annual consumption | 3,60,000 kg.<br>(30,000 × 12 months) | 3,60,000 kg.<br>(30,000 × 12 months) |
| No. of orders<br>[Note- (i)] | 30<br>(3,60,000 ÷ 12,000) | 30<br>(3,60,000 ÷ 12,000) |
| Ordering Cost (a) | ₹36,000<br>(₹1200 × 30) | ₹36,000<br>(₹1200 × 30) |
| Carrying Cost (b)<br>[Note- (ii)] | ₹30,375<br>(15% of ₹27 × 7,500) | ₹31,176<br>(15% of ₹30 × 6,928) |
| Purchase Cost (c)<br>(for good portion) | ₹97,20,000<br>(₹27 × 3,60,000) | ₹1,08,00,000<br>(₹30 × 3,60,000) |
| Loss due to obsolescence (d)<br>[Note- (iii)] | ₹24,30,000<br>[₹27 × (30 × 3,000)] | ₹16,70,400<br>[₹30 × (30 × 1,856)] |
| Total Cost [(a) + (b) + (c) + (d)] | ₹ 1,22,16,375 | ₹ 1,25,37,576 |

Purchasing of material -A at present policy of 15,000 kg. saves ₹ **3,21,201.**

**Notes:** (i) Since, material gets obsolete after 10 days, the quantity in excess of 10 days consumption i.e. 12,000 kg. are wasted. Hence, after 12,000 kg. a fresh order needs to be given.

(ii) Carrying cost is incurred on average stock of Materials purchased.

(iii) the excess quantity of material becomes obsolete and loss has to be incurred.
#### Approach
Cost both policies in full: ordering, carrying, purchase price (with and without the 10% discount) and the stock that becomes obsolete beyond ten days' use. The order count depends on what can be used before it perishes.

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: C
tags: cma.mat.levels
difficulty: easy
q: 3
a: 19
---
#### Question
What would the minimum stock level for material A:
#### Options
(A) 1,800 kg.
(B) 1,200 kg.
(C) 600 kg.
(D) 2,400 kg.
#### Answer
**(c)** Minimum Stock Level for Material A

= Re-order level – (Average Consumption Rate x Average Re-order Period)

= 2400 – (1200 x 1.5) = **600 kgs**

Re-order level = Max. Consumption\* × Max. Lead time

= 30,000/25 × 2 days = 2,400 kg.

Average Consumption Rate = (30,000/25 + 30,000/25)/2

= 1,200 Kg

Average Re-order Period = (1 + 2)/2 =1.5 Days

Stock required for 10 days consumption is lower than the maximum stock level calculated through the formula. Therefore, Maximum Stock Level will be 12,000 kg.

(\*Since, production is processed evenly throughout the month hence material consumption will also be even.)
#### Approach
Find the re-order level first; consumption is even, so maximum, minimum and average daily usage are the same.

---
case: c2
qno: 2
q: 3
---
#### Case
The board of the J Ltd. has been appraised by the General Manager (HR) that the employee attrition rate in the company has increased. The following facts has been presented by the GM(HR):

(1) Training period of the new recruits is 50,000 hours. During this period their productivity is 60% of the experienced workers. Time required by an experienced worker is 10 hours per unit.

(2) 20% of the output during training period was defective. Cost of rectification of a defective unit was ₹ 25.

(3) Potential productive hours lost due to delay in recruitment were 1,00,000 hours.

(4) Selling price per unit is ₹ 180 and P/V ratio is 20%.

(5) Settlement cost of the workers leaving the organization was ₹ 1,83,480.

(6) Recruitment cost was ₹ 1,56,340

(7) Training cost was ₹ 1,13,180

You being an associate finance to GM(HR), has been asked the following questions:

---
item: q2i
case: c2
qno: 2
part: (i)
type: mcq
key: C
tags: cma.emp.turnover
difficulty: medium
q: 3
a: 20
---
#### Question
How much quantity of output is lost due to labour turnover?
#### Options
(A) 10,000 units
(B) 8,000 units
(C) 12,000 units
(D) 12,600 units
#### Answer
**(c)** Output by experienced workers in 50,000 hours = $\dfrac{50{,}000}{10}$

= 5,000 units

∴ Output by new recruits = 60% of 5,000 = 3,000 units

Loss of output = 5,000 – 3,000 = 2,000 units

Total loss of output = Due to delay recruitment + Due to inexperience

= 10,000 +2,000=**12,000 units**
#### Approach
Output is lost twice: hours never worked while posts were vacant, and the shortfall of trainees against experienced workers.

---
item: q2ii
case: c2
qno: 2
part: (ii)
type: mcq
key: A
tags: cma.emp.turnover
difficulty: easy
q: 4
a: 20
---
#### Question
How much loss in the form of contribution, the company incurred due to labour turnover?
#### Options
(A) ₹ 4,32,000
(B) ₹ 4,20,000
(C) ₹ 4,36,000
(D) ₹ 4,28,000
#### Answer
**(a)** Contribution per unit = 20% of ₹ 180 = ₹ 36

Total contribution lost = ₹ 36 × 12,000 units = **₹ 4,32,000**
#### Approach
Contribution per unit comes from the P/V ratio; apply it to the total output lost in (i).

---
item: q2iii
case: c2
qno: 2
part: (iii)
type: mcq
key: B
tags: cma.emp.turnover
difficulty: easy
q: 4
a: 20
---
#### Question
What is the cost repairing of defective units?
#### Options
(A) ₹ 75,000
(B) ₹ 15,000
(C) ₹ 50,000
(D) ₹ 25,000
#### Answer
**(b)** Cost of repairing defective units = 3,000 units × 0.2 × ₹ 25

= **₹ 15,000**
#### Approach
Defectives are a share of the trainees' output during the training period, not of the whole output lost.

---
item: q2iv
case: c2
qno: 2
part: (iv)
type: mcq
key: D
tags: cma.emp.turnover
difficulty: medium
q: 4
a: 20
---
#### Question
Calculate the profit lost by the company due to increased labour turnover.
#### Options
(A) ₹ 7,50,000
(B) ₹ 15,00,000
(C) ₹ 5,00,000
(D) ₹ 9,00,000
#### Answer
**(d)** **Calculation of loss of profit due to labour turnover**

| | (₹) |
|---|---:|
| Loss of Contribution | 4,32,000 |
| Cost of repairing defective units | 15,000 |
| Recruitment cost | 1,56,340 |
| Training cost | 1,13,180 |
| Settlement cost of workers leaving | 1,83,480 |
| Profit forgone in 2022-23 | 9,00,000 |
#### Approach
Add every cost of turnover to the contribution lost: rectification, recruitment, training and settlement.

---
item: q2v
case: c2
qno: 2
part: (v)
type: mcq
key: C
tags: cma.emp.turnover
difficulty: easy
q: 4
a: 20
---
#### Question
How much quantity of output is lost due to inexperience of the new worker?
#### Options
(A) 1,000 units
(B) 2,600 units
(C) 2,000 units
(D) 12,600 units
#### Answer
**(c)** Output by experienced workers in 50,000 hours = $\dfrac{50{,}000}{10}$

= 5,000 units

∴ Output by new recruits = 60% of 5,000 = 3,000 units

Loss of output = 5,000 – 3,000 = **2,000 units**

---
case: c3
qno: 3
q: 4-5
---
#### Case
During half year ending inter departmental review meeting of P Ltd., cost variance report was discussed and the performance of the departments were assessed. The following figures were presented.

For a period of first six months of the financial year, following information were extracted from the books:

| | |
|---|---:|
| Actual production overheads | ₹ 34,08,000 |
| The above amount is inclusive of the following payments made: | |
| Paid as per court’s order | ₹ 4,50,000 |
| Expenses of previous year booked in current year | ₹ 1,00,000 |
| Paid to workers for strike period under an award | ₹ 4,20,000 |
| Obsolete stores written off | ₹ 36,000 |

Production and sales data for the six months are as under:

| | |
|---|---:|
| Production: | |
| Finished goods | 1,10,000 units |
| Works-in-progress<br>(50% complete in every respect) | 80,000 units |
| Sale: | |
| Finished goods | 90,000 units |

Machine worked during the period was 3,000 hours.

At the of preparation of revenue budget, it was estimated that a total of ₹ 50,40,000 would be required for budgeted machine hours of 6,000 as production overheads for the entire year.

During the meeting, a data analytic report revealed that 40% of the over/under-absorption was due to defective production policies and the balance was attributable to increase in costs.

You were also present at the meeting; the chairperson of the meeting has asked you to be ready with the followings for the performance appraisal of the departmental heads:

---
item: q3i
case: c3
qno: 3
part: (i)
type: mcq
key: D
tags: cma.oh.absorb
difficulty: easy
q: 5-6
a: 20
---
#### Question
How much was the budgeted machine hour rate used to recover overhead?
#### Options
(A) ₹ 760
(B) ₹ 820
(C) ₹ 780
(D) ₹ 840
#### Answer
**(d)** Budgeted Machine hour rate (Blanket rate)

= $\dfrac{\text{₹ 50,40,000}}{\text{6,000 hours}}$ = **₹ 840 per hour**
#### Approach
The rate is set from the budget for the whole year: budgeted overheads over budgeted machine hours.

---
item: q3ii
case: c3
qno: 3
part: (ii)
type: mcq
key: A
tags: cma.oh.absorb
difficulty: easy
q: 6
a: 21
---
#### Question
How much amount of production overhead has been recovered (absorbed) upto the end of half year end?
#### Options
(A) ₹ 25,20,000
(B) ₹ 34,08,000
(C) ₹ 24,00,000
(D) ₹ 24,60,000
#### Answer
**(a)** **₹ 25,20,000**
#### Approach
Absorbed overhead is the predetermined rate times the actual machine hours of the half year.

---
item: q3iii
case: c3
qno: 3
part: (iii)
type: mcq
key: A
tags: cma.oh.underover
difficulty: medium
q: 6
a: 21
---
#### Question
What is the amount of overhead under/ over absorbed?
#### Options
(A) 1,18,000 over-absorbed
(B) 1,18,000 under- absorbed
(C) 18,000 over-absorbed
(D) 18,000 under-absorbed
#### Answer
**(a)**

| | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Total production overheads actually incurred during the period | | 34,08,000 |
| *Less*: Amount paid to worker as per court order | 4,50,000 | |
| Expenses of previous year booked in the current year | 1,00,000 | |
| Wages paid for the strike period under an award | 4,20,000 | |
| Obsolete stores written off | 36,000 | 10,06,000 |
| | | 24,02,000 |
| *Less*: Production overheads absorbed as per machine hour rate (3,000 hours × ₹ 840\*) | | 25,20,000 |
| Amount of over absorbed production overheads | | **1,18,000** |

\* Budgeted Machine hour rate (Blanket rate) calculated in part (i)
#### Approach
Strip out of actual overheads the items that are not production overheads of this period (court order, previous year, strike wages, obsolete stores) before comparing with the amount absorbed.

---
item: q3iv
case: c3
qno: 3
part: (iv)
type: mcq
key: B
tags: cma.oh.underover
difficulty: medium
q: 6
a: 21-22
---
#### Question
What is the supplementary rate for apportionment of over/under absorbed overheads over WIP, Finished goods and Cost of sales?
#### Options
(A) ₹ 0.315 per unit
(B) ₹ 0.472 per unit
(C) ₹ 0.787 per unit
(D) ₹ 1 per unit
#### Answer
**(b)** **Accounting treatment of over absorbed production overheads:** As, 40% of the over absorbed overheads were due to defective production policies, this being abnormal, hence should be credited to Costing Profit and Loss Account.

Amount to be credited to Costing Profit and Loss Account

= ₹ 1,18,000× 40% = ₹ 47,200.

Balance of over absorbed production overheads should be distributed over Works in progress, Finished goods and Cost of sales by applying supplementary rate\*.

Amount to be distributed = ₹ 1,18,000× 60% = ₹ 70,800

Supplementary rate = $\dfrac{\text{₹ 70,800}}{\text{1,50,000 units}}$ = **₹ 0.472 per unit**
#### Approach
Only the normal part of the over-absorption is spread by a supplementary rate; the abnormal share goes to Costing P&L. Count work in progress in equivalent units.

---
item: q3v
case: c3
qno: 3
part: (v)
type: mcq
key: C
tags: cma.oh.underover
difficulty: medium
q: 6
a: 22
---
#### Question
What is the amount of over/under absorbed overhead apportioned to Work in Progress?
#### Options
(A) ₹ 9,440
(B) ₹ 42,480
(C) ₹ 18,880
(D) ₹ 70,800
#### Answer
**(c)** Apportionment of over absorbed production overheads over WIP, Finished goods and Cost of sales:

| | Equivalent completed units | Amount (₹) |
|---|---:|---:|
| Work-in-Progress (80,000 units × 50% ×0.472) | 40,000 | **18,880** |
| Finished goods (20,000 units × 0.472) | 20,000 | 9,440 |
| Cost of sales (90,000 units × 0.472) | 90,000 | 42,480 |
| Total | 1,50,000 | 70,800 |

---
item: q4
qno: 4
type: descriptive
tags: cma.abc.compute, cma.abc.concept
difficulty: medium
q: 7
a: 22-24
---
#### Question
The sales department of A Limited is analysing the customer profitability for its Product Z. It has decided to analyse the profitability of its five new customers using activity-based costing method. It buys Product Z at ₹ 5,400 per unit and sells to retail customers at a listed price of ₹ 6,480 per unit. The data pertaining to five customers are:

| | Customers | | | | |
|---|---:|---:|---:|---:|---:|
| | **A** | **B** | **C** | **D** | **E** |
| Units sold | 4,500 | 6,000 | 9,500 | 7,500 | 12,750 |
| Listed Selling Price | ₹6,480 | ₹6,480 | ₹6,480 | ₹6,480 | ₹6,480 |
| Actual Selling Price | ₹6,480 | ₹6,372 | ₹5,940 | ₹6,264 | ₹5,832 |
| Number of Purchase orders | 15 | 25 | 30 | 25 | 30 |
| Number of Customer visits | 2 | 3 | 6 | 2 | 3 |
| Number of deliveries | 10 | 30 | 60 | 40 | 20 |
| Kilometers travelled per delivery | 20 | 6 | 5 | 10 | 30 |
| Number of expedited deliveries | 0 | 0 | 0 | 0 | 1 |

After a detailed analysis and computation, the following activities has been identified and respective cost has been calculated:

| Activity | Cost Driver Rate |
|---|---|
| Order taking | ₹4,500 per purchase order |
| Customer visits | ₹ 3,600 per customer visit |
| Deliveries | ₹ 7.50 per delivery Km travelled |
| Product handling | ₹ 22.50 per case sold |
| Expedited deliveries | ₹ 13,500 per expedited delivery |

You are required to COMPUTE the customer-level operating income of each of five retail customers.
#### Answer
**Working note:**

**1. Computation of revenues (at listed price), discount, cost of goods sold and customer level operating activities costs:**

| | Customers | | | | |
|---|---:|---:|---:|---:|---:|
| | **A** | **B** | **C** | **D** | **E** |
| Units sold: (a) | 4,500 | 6,000 | 9,500 | 7,500 | 12,750 |
| Revenues (at listed price) (₹): (b)<br>{(a) ×₹6,480)} | 2,91,60,000 | 3,88,80,000 | 6,15,60,000 | 4,86,00,000 | 8,26,20,000 |
| Revenues (at listed price) (₹): (c)<br>{(a) ×Actual selling price)} | 2,91,60,000<br>(4,500 × 6,480) | 3,82,32,000<br>(6,000 × 6,372) | 5,64,30,000<br>(9,500 × 5,940) | 4,69,80,000<br>(7,500 × 6,264) | 7,43,58,000<br>(12,750 × 5,832) |
| Discount (₹) (d)<br>{(b) – (c)} | 0 | 6,48,000 | 51,30,000 | 16,20,000 | 82,62,000 |
| Cost of goods sold (₹) : (e)<br>{(a) x ₹5,400} | 2,43,00,000 | 3,24,00,000 | 5,13,00,000 | 4,05,00,000 | 6,88,50,000 |
| **Customer level operating activities costs** | | | | | |
| Order taking costs (₹):<br>(No. of purchase orders × ₹ 4,500) | 67,500 | 1,12,500 | 1,35,000 | 1,12,500 | 1,35,000 |
| Customer visits costs (₹)<br>(No. of customer visits x ₹ 3,600) | 7,200 | 10,800 | 21,600 | 7,200 | 10,800 |
| Delivery vehicles travel costs (₹)<br>(Kms travelled by delivery vehicles x ₹ 7.50 per km.) | 1,500 | 1,350 | 2,250 | 3,000 | 4,500 |
| Product handling costs (₹)<br>{(a) x ₹ 22.50} | 1,01,250 | 1,35,000 | 2,13,750 | 1,68,750 | 2,86,875 |
| Cost of expediting deliveries (₹)<br>{No. of expedited deliveries x ₹ 13,500} | - | - | - | - | 13,500 |
| Total cost of customer level operating activities (₹) | 1,77,450 | 2,59,650 | 3,72,600 | 2,91,450 | 4,50,675 |

**Computation of Customer level operating income**

| | Customers | | | | |
|---|---:|---:|---:|---:|---:|
| | **A** | **B** | **C** | **D** | **E** |
| | **(₹)** | **(₹)** | **(₹)** | **(₹)** | **(₹)** |
| Revenues<br>(At list price)<br>(Refer to working note) | 2,91,60,000 | 3,82,32,000 | 5,64,30,000 | 4,69,80,000 | 7,43,58,000 |
| Less: Cost of goods sold<br>(Refer to working note) | (2,43,00,000) | (3,24,00,000) | (5,13,00,000) | (4,05,00,000) | (6,88,50,000) |
| Gross margin | 48,60,000 | 58,32,000 | 51,30,000 | 64,80,000 | 55,08,000 |
| Less: Customer level operating activities costs<br>(Refer to working note) | (1,77,450) | (2,59,650) | (3,72,600) | (2,91,450) | (4,50,675) |
| Customer level operating income | 46,82,550 | 55,72,350 | 47,57,400 | 61,88,550 | 50,57,325 |
#### Approach
Revenue is at the actual (discounted) price; deduct the cost of goods bought in, then charge each customer the activity costs its own orders, visits, kilometres, cases and expedited deliveries drive.

---
item: q5
qno: 5
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
q: 8-9
a: 24-25
---
#### Question
P Ltd. has gathered cost information from ledgers and other sources for the year ended 31st December 2023. The information are tabulated below:

| Sl. No. | | Amount (₹) | Amount (₹) |
|---|---|---:|---:|
| (i) | Raw materials purchased | | 5,00,00,000 |
| (ii) | Freight inward | | 9,20,600 |
| (iii) | Wages paid to factory workers | | 25,20,000 |
| (iv) | Royalty paid for production | | 1,80,000 |
| (v) | Amount paid for power & fuel | | 3,50,000 |
| (vi) | Job charges paid to job workers | | 3,10,000 |
| (vii) | Stores and spares consumed | | 1,10,000 |
| (viii) | Depreciation on office building | | 50,000 |
| (ix) | Repairs & Maintenance paid for: | | |
| | - Plant & Machinery | 40,000 | |
| | - Sales office building | 20,000 | 60,000 |
| (x) | Insurance premium paid for: | | |
| | - Plant & Machinery | 28,200 | |
| | - Factory building | 18,800 | 47,000 |
| (xi) | Expenses paid for quality control check activities | | 18,000 |
| (xii) | Research & development cost paid for improvement in production process | | 20,000 |
| (xiii) | Expenses paid for pollution control and engineering & maintenance | | 36,000 |
| (xiv) | Salary paid to Sales & Marketing managers | | 5,60,000 |
| (xv) | Salary paid to General Manager | | 6,40,000 |
| (xvi) | Packing cost paid for: | | |
| | - Primary packing necessary to maintain quality | 46,000 | |
| | - For re-distribution of finished goods | 80,000 | 1,26,000 |
| (xvii) | Fee paid to independent directors | | 1,20,000 |
| (xviii) | Performance bonus paid to sales staffs | | 1,20,000 |
| (xix) | Value of stock as on 1st January, 2023: | | |
| | - Raw materials | 10,00,000 | |
| | - Work-in-process | 8,60,000 | |
| | - Finished goods | 12,00,000 | 30,60,000 |
| (xx) | Value of stock as on 31st December, 2023: | | |
| | - Raw materials | 8,40,000 | |
| | - Work-in-process | 6,60,000 | |
| | - Finished goods | 10,50,000 | 25,50,000 |

Amount realized by selling of scrap and waste generated during manufacturing process – ₹ 48,000/-

The board meeting is scheduled to be held in next week and you being an associate to the chief cost controller of the company, has been asked to PREPARE a cost sheet.
#### Answer
**Statement of Cost of P Ltd. for the year ended 31st December, 2023:**

| Sl. No. | Particulars | Amount (₹) | Amount (₹) |
|---|---|---:|---:|
| (i) | Material Consumed: | | |
| | - Raw materials purchased | 5,00,00,000 | |
| | - Freight inward | 9,20,600 | |
| | Add: Opening stock of raw materials | 10,00,000 | |
| | Less: Closing stock of raw materials | (8,40,000) | 5,10,80,600 |
| (ii) | Direct employee (labour) cost: | | |
| | - Wages paid to factory workers | | 25,20,000 |
| (iii) | Direct expenses: | | |
| | - Royalty paid for production | 1,80,000 | |
| | - Amount paid for power & fuel | 3,50,000 | |
| | - Job charges paid to job workers | 3,10,000 | 8,40,000 |
| | **Prime Cost** | | 5,44,40,600 |
| (iv) | Works/ Factory overheads: | | |
| | - Stores and spares consumed | 1,10,000 | |
| | - Repairs & Maintenance paid for plant & machinery | 40,000 | |
| | - Insurance premium paid for plant & machinery | 28,200 | |
| | - Insurance premium paid for factory building | 18,800 | |
| | - Expenses paid for pollution control and engineering & maintenance | 36,000 | 2,33,000 |
| | Gross factory cost | | 5,46,73,600 |
| | Add: Opening value of W-I-P | | 8,60,000 |
| | Less: Closing value of W-I-P | | (6,60,000) |
| | **Factory Cost** | | 5,48,73,600 |
| (v) | Quality control cost: | | |
| | - Expenses paid for quality control check activities | | 18,000 |
| (vi) | Research & development cost paid for improvement in production process | | 20,000 |
| (vii) | Less: Realisable value on sale of scrap and waste | | (48,000) |
| (viii) | Add: Primary packing cost | | 46,000 |
| | **Cost of Production** | | 5,49,09,600 |
| | Add: Opening stock of finished goods | | 12,00,000 |
| | Less: Closing stock of finished goods | | (10,50,000) |
| | **Cost of Goods Sold** | | 5,50,59,600 |
| (ix) | Administrative overheads: | | |
| | - Depreciation on office building | 50,000 | |
| | - Salary paid to General Manager | 6,40,000 | |
| | - Fee paid to independent directors | 1,20,000 | 8,10,000 |
| (x) | Selling overheads: | | |
| | - Repairs & Maintenance paid for sales office building | 20,000 | |
| | - Salary paid to Manager- Sales & Marketing | 5,60,000 | |
| | - Performance bonus paid to sales staffs | 1,20,000 | 7,00,000 |
| (xi) | Distribution overheads: | | |
| | - Packing cost paid for re-distribution of finished goods | | 80,000 |
| | **Cost of Sales** | | 5,66,49,600 |
#### Approach
Sort each item into its place in the cost sheet before adding anything: split the mixed items (repairs, insurance, packing) between factory, office and selling, and remember where quality control, R&D on the process, scrap and primary packing go.

---
item: q6
qno: 6
type: descriptive
tags: cma.sys.recon, cma.sheet.mfg
difficulty: hard
q: 9-10
a: 26-28
---
#### Question
The financial books of a company reveal the following data for the year ended 31st March, 2023:

| | (₹) |
|---|---:|
| **Opening Stock:** | |
| Finished goods 875 units | 76,525 |
| Work-in-process | 33,000 |
| **01.04.2022 to 31.03.2023** | |
| Raw materials consumed | 7,84,000 |
| Direct labour | 4,65,000 |
| Factory overheads | 2,65,000 |
| Goodwill written off | 95,000 |
| Administration overheads | 3,15,000 |
| Income tax paid | 72,000 |
| Bad debts | 21,000 |
| Selling and distribution overheads | 65,000 |
| Interest received | 18,500 |
| Rent received | 72,000 |
| Sales 14,500 units | 20,80,000 |
| Closing Stock: Finished goods 375 units | 43,250 |
| Work-in-process | 48,200 |

The management of the company, for preparing cost sheet and variance analysis uses the following cost recovery basis which has been elaborated by the cost controller of the company:

Factory overheads are absorbed at 60% of direct wages.

Administration overheads (production related) are recovered at 20% of factory cost.

Selling and distribution overheads are charged at ₹ 5 per unit sold.

Opening Stock of finished goods is valued at ₹105 per unit.

The company values work-in-process at factory cost for both financial and cost accounting purpose.

You being an associate to the cost controller of the company has been asked to:

(i) PREPARE a statement of profit as per costing records and financial records.

(ii) CALCULATE cost of production per unit.

(iii) PREPARE a statement reconciling the profit as per costing records with the profit as per financial records.
#### Answer
**Statement of Profit as per financial records**

**(for the year ended March 31, 2023)**

| | (₹) | | (₹) |
|---|---:|---|---:|
| To Opening stock: | | By Sales | 20,80,000 |
| Finished goods | 76,525 | By Closing stock: | |
| Work-in-process | 33,000 | Finished Goods | 43,250 |
| To Raw materials consumed | 7,84,000 | Work-in-Process | 48,200 |
| To Direct labour | 4,65,000 | By Rent received | 72,000 |
| To Factory overheads | 2,65,000 | By Interest received | 18,500 |
| To Goodwill written off | 95,000 | | |
| To Administration overheads | 3,15,000 | | |
| To Selling & distribution overheads | 65,000 | | |
| To Income tax paid | 72,000 | | |
| To Bad debts | 21,000 | | |
| To Profit | 70,425 | | |
| | 22,61,950 | | 22,61,950 |

**Statement of Profit as per costing records**

**(for the year ended March 31,2023)**

| | (₹) | (₹) |
|---|---:|---:|
| Sales revenue (14,500 units) (A) | | 20,80,000 |
| *Cost of Sales:* | | |
| Opening stock (875 units x ₹ 105) | 91,875 | |
| *Add:* Cost of production of 14,000 units (Refer to Working Note 1& 2) | 18,15,360 | |
| *Less:* Closing stock (₹18,15,360 × 375 units/14,000 units) | (48,626) | |
| Production cost of goods sold (14,500 units) | 18,58,609 | |
| Selling & distribution overheads (14,500 units x ₹ 5) | 72,500 | |
| Cost of sales: (B) | 19,31,109 | 19,31,109 |
| Profit: {(A) – (B)} | | 1,48,891 |

**Workings:**

| 1. Number of units produced | Units |
|---|---:|
| Sales | 14,500 |
| *Add:* Closing stock | 375 |
| Total | 14,875 |
| *Less:* Opening stock | 875 |
| Number of units produced | 14,000 |

**Cost Sheet**

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

= $\dfrac{\text{Total Cost of Production}}{\text{No. of units produced}} = \dfrac{\text{₹ 18,15,360}}{\text{14,000 units}}$ = ₹129.67

**Statement of Reconciliation**

**(Reconciling the profit as per costing records with the profit as per financial records)**

| | (₹) | (₹) |
|---|---:|---:|
| Profit as per Cost Accounts | | 1,48,891 |
| *Add:* Factory overheads over absorbed (₹ 2,79,000 – ₹ 2,65,000) | 14,000 | |
| S & D overheads over absorbed (₹ 72,500 - ₹ 65,000) | 7,500 | |
| Opening stock overvalued (₹ 91,875 – ₹ 76,525) | 15,350 | |
| Interest received | 18,500 | |
| Rent received | 72,000 | 1,27,350 |
| | | 2,76,241 |
| *Less:* Administration overheads under recovery (₹ 3,15000 – ₹ 3,02,560) | 12,440 | |
| Closing stock overvalued (₹ 48,626 – ₹ 43,250) | 5,376 | |
| Goodwill written off | 95,000 | |
| Income tax paid | 72,000 | |
| Bad debts | 21,000 | 2,05,816 |
| Profit as per financial accounts | | 70,425 |
#### Approach
Find the units produced first, then build the cost sheet with the recovery rates (not the actual overheads). The reconciliation lists each difference: over- or under-absorbed overheads, the two stock valuations and the items found only in the financial books.

---
item: q7
qno: 7
type: descriptive
tags: cma.unit.batch
difficulty: hard
q: 11
a: 28-32
---
#### Question
Arnav Ltd. operates in beverages industry where it manufactures soft-drink in three sizes of Large (3 litres), Medium (1.5 litres) and Small (600 ml) bottles. The products are processed in batches. The 5,000 litres capacity processing plant consumes electricity of 90 Kilowatts per hour and a batch takes 1 hour 45 minutes to complete. Only symmetric size of products can be processed at a time. The machine set-up takes 15 minutes to get ready for next batch processing. During the set-up power consumption is only 20%.

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
|---:|---:|---:|
| 3,00,000 | 7,50,000 | 20,00,000 |

You are required to CALCULATE profit/ loss per batch and also COMPUTE Economic Batch Quantity (EBQ).
#### Answer
**Workings:**

**1. Maximum number of bottles that can be processed in a batch:** = $\dfrac{\text{5,000 ltrs}}{\text{Bottle volume}}$

| Large | | Medium | | Small | |
|---:|---:|---:|---:|---:|---:|
| **Qty (ltr)** | **Max bottles** | **Qty (ltr)** | **Max bottles** | **Qty (ltr)** | **Max bottles** |
| 3 | 1,666 | 1.5 | 3,333 | 0.6 | 8,333 |

\*For simplicity of calculation small fractions has been ignored.

**2. Number of batches to be run:**

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
| G | Material-C required (Litre) [(C×F)÷1000] | **22,500** | **28,125** | **30,000** | **80,625** |

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
| B | Hours required per batch (Hours) | 1.75 | 1.75 | 1.75 | 1.75 |
| C | Total hours required (Hours) [A×B] | 315 | 393.75 | 420 | 1,128.75 |
| D | Power consumption per hour | 90 | 90 | 90 | 90 |
| **E** | **Power consumption in Kwh [C×D]** | **28,350** | **35,437.5** | **37,800** | **1,01,587.5** |
| **F** | **Per batch consumption (Kwh) [E÷A]** | **157.5** | **157.5** | **157.5** | **157.5** |
| **For set-up** | | | | | |
| G | Hours required per batch (Hours) | 0.25 | 0.25 | 0.25 | 0.25 |
| H | Total hours required (Hours) [A×G] | 45 | 56.25 | 60 | 161.25 |
| I | Power consumption per hour [20%×90] | 18 | 18 | 18 | 18 |
| **J** | **Power consumption in Kwh [H×I]** | **810** | **1,012.5** | **1,080** | **2,902.5** |
| **K** | **Per batch consumption (Kwh) [J÷A]** | **4.5** | **4.5** | **4.5** | **4.5** |

**Calculation of Profit/ loss per batch:**

| | Particulars | Large | Medium | Small | Total |
|---|---|---:|---:|---:|---:|
| A | Demand (bottle) | 3,00,000 | 7,50,000 | 20,00,000 | 30,50,000 |
| B | Price per bottle (₹) | 150 | 90 | 50 | |
| **C** | **Sales value (₹) [A×B]** | **4,50,00,000** | **6,75,00,000** | **10,00,00,000** | **21,25,00,000** |
| | **Direct Material cost:** | | | | |
| E | Material-W (₹) [Qty in WN-3 × ₹ 0.50] | 63,00,000 | 78,75,000 | 84,00,000 | 2,25,75,000 |
| F | Material-C (₹) [Qty in WN-3 × ₹1,000] | 2,25,00,000 | 2,81,25,000 | 3,00,00,000 | 8,06,25,000 |
| G | [E+F] | **2,88,00,000** | **3,60,00,000** | **3,84,00,000** | **10,32,00,000** |
| H | Direct Wages (₹) [Man-shift in WN-4 × × ₹ 880] | 7,92,000 | 10,03,200 | 10,56,000 | 28,51,200 |
| I | Packing cost (₹) [A×₹3] | 9,00,000 | 22,50,000 | 60,00,000 | 91,50,000 |
| | **Power cost (₹)** | | | | |
| J | For processing (₹) [WN-5 × ₹7] | 1,98,450 | 2,48,062.5 | 2,64,600 | 7,11,112.5 |
| K | For set-up time (₹) [WN-5 × ₹7] | 5,670 | 7,087.5 | 7,560 | 20,317.5 |
| L | [J+K] | **2,04,120** | **2,55,150** | **2,72,160** | **7,31,430** |
| M | Other variable cost (₹) [No. of batch in WN-2 × ₹ 30,000] | 54,00,000 | 67,50,000 | 72,00,000 | 1,93,50,000 |
| **N** | **Total Variable cost per batch [G+H+I+L+M]** | **3,60,96,120** | **4,62,58,350** | **5,29,28,160** | **13,52,82,630** |
| **O** | **Profit/ loss before fixed cost [C-N]** | **89,03,880** | **2,12,41,650** | **4,70,71,840** | **7,72,17,370** |
| P | Fixed Cost | | | | 4,90,00,000 |
| **Q** | **Total Cost [O-P]** | | | | **2,82,17,370** |

**Computation of Economic Batch Quantity (EBQ):**

EBQ = $\sqrt{\dfrac{2 \times D \times S}{C}}$

D = Annual Demand for the Product = Refer A below

S = Set-up cost per batch = Refer D below

C = Carrying cost per unit per annum =Refer E below

| | Particulars | Large | Medium | Small |
|---|---|---:|---:|---:|
| A | Annual Demand (bottle) | 3,00,000 | 7,50,000 | 20,00,000 |
| **Set-up Cost:** | | | | |
| B | Power cost for set-up time (₹) [Consumption per batch in WN-5 × ₹7] | 31.50 | 31.50 | 31.50 |
| C | Other variable cost (₹) \* | 30,000 | 30,000 | 30,000 |
| D | Total Set-up cost [B+C] | 30,031.50 | 30,031.50 | 30,031.50 |
| E | Holding cost: | 1.00 | 1.00 | 1.00 |
| **F** | **EBQ (Bottle)** | **1,34,234** | **2,12,243** | **3,46,592** |

\* Other variable cost is assumed to be part of set-up cost.
#### Approach
Build the workings in order: bottles per batch from the plant's capacity, batches from demand, then man-shifts and power (processing and set-up separately) per size. The set-up cost per batch for the EBQ is the set-up power plus the other cost per batch.

---
item: q8
qno: 8
type: descriptive
tags: cma.proc.eu, cma.proc.accounts
difficulty: hard
q: 12-13
a: 32-34
---
#### Question
The following data are available in respect of Process-I for January 2024:

(1) Opening stock of work in process: 600 units at a total cost of ₹ 4,200.

(2) Degree of completion of opening work in process:

| | |
|---|---:|
| Material | 100% |
| Labour | 60% |
| Overheads | 60% |

(3) Input of materials at a total cost of ₹ 55,200 for 9,200 units.

(4) Direct wages incurred ₹ 18,600

(5) Overheads ₹ 8,630.

(6) Units scrapped 200 units. The stage of completion of these units was:

| | |
|---|---:|
| Materials | 100% |
| Labour | 80% |
| Overheads | 80% |

(7) Closing work in process; 700 units. The stage of completion of these units was:

| | |
|---|---:|
| Material | 100% |
| Labour | 70% |
| Overheads | 70% |

(8) 8,900 units were completed and transferred to the next process.

(9) Normal loss is 4% of the total input (opening stock plus units put in)

(10) Scrap value is ₹ 6 per unit.

You are required to:

(i) PREPARE using FIFO method, Statement of equivalent production,

(ii) PREPARE Statement of cost,

(iii) CALCULATE cost of closing WIP,

(iv) CALCULATE the cost of the units to be transferred to the next process.
#### Answer
**(i) Statement of Equivalent Production (FIFO Method)**

| Input | | Output | | Equivalent Production | | | | | |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | | **Materials** | | **Labour** | | **Overheads** | |
| **Details** | **Units** | **Details** | **Units** | **%** | **Units** | **%** | **Units** | **%** | **Units** |
| Opening Stock | 600 | Finished goods transferred to next process: | | | | | | | |
| | | -From opening stock | 600 | - | - | 40 | 240 | 40 | 240 |
| | | -From fresh materials | 8,300 | 100 | 8,300 | 100 | 8,300 | 100 | 8,300 |
| | | Closing W-I-P | 700 | 100 | 700 | 70 | 490 | 70 | 490 |
| Fresh inputs | 9,200 | Normal loss | 392 | - | - | - | - | - | - |
| | | | 9,992 | | 9,000 | | 9,030 | | 9,030 |
| | | *Less*: Abnormal Gain | (192) | 100 | (192) | 100 | (192) | 100 | (192) |
| | 9,800 | | 9,800 | | 8,808 | | 8,838 | | 8,838 |

**(ii) Statement of Cost per equivalent units**

| Elements | (₹) | Cost (₹) | Equivalent units | Cost per equivalent Unit (₹) |
|---|---:|---:|---:|---:|
| Material Cost | 55,200 | | | |
| *Less:* Scrap realisation 392 units @ ₹ 6/- p.u. | 2,352 | 52,848 | 8,808 | 6.00 |
| Labour cost | | 18,600 | 8,838 | 2.10 |
| Overheads | | 8,630 | 8,838 | 0.98 |
| Total Cost | | 80,078 | | 9.08 |

Cost of Abnormal Gain – 192 Units

| | (₹) | (₹) |
|---|---:|---:|
| Material cost of 192 units @ ₹ 6.00/- p.u. | 1,152.00 | |
| Labour cost of 192 units @ ₹ 2.10/- p.u. | 403.20 | |
| Overheads of 192 units @ ₹ 0.98/- p.u. | 188.16 | 1,743.36 |

**(iii) Cost of closing WIP – 700 Units**

| | | |
|---|---:|---:|
| Material cost of 700 equivalent units @ ₹ 6.00/- p.u. | 4,200.00 | |
| Labour cost of 490 equivalent units @ ₹2.10/- p.u. | 1,029.00 | |
| Overheads of 490 equivalent @ ₹ 0.98/- p.u. | 480.20 | 5709.20 |

**(iv) Calculation of cost of 8,900 units transferred to next process**

| | | (₹) |
|---|---:|---:|
| (i) Cost of opening W-I-P Stock b/f – 600 units | | 4,200.00 |
| (ii) Cost incurred on opening W-I-P stock | | |
| Material cost | — | |
| Labour cost 240 equivalent units @ ₹ 2.10 p.u. | 504.00 | |
| Overheads 240 equivalent units @ ₹ 0.98/- p.u. | 235.20 | |
| | | 739.20 |
| (iii) Cost of 8,300 completed units | | |
| 8,300 units @ ₹9.08 p.u. | | 75,364.00 |
| Total cost [(i) + (ii) + (iii))] | | 80,303.20 |
#### Approach
Set normal loss on total input (opening stock plus units put in), compare with the units actually scrapped to find the abnormal loss or gain, and under FIFO give opening stock only the work still needed on it.

---
item: q9
qno: 9
type: descriptive
tags: cma.svc.transport
difficulty: medium
q: 13-14
a: 34-36
---
#### Question
A LMV Pvt. Ltd, operates cab/ car rental service in Delhi/NCR. It provides its service to the offices of Noida, Gurugram and Faridabad. At present it operates CNG fuelled cars but it is also considering to upgrade these into Electric vehicle (EV). The following details related with the owning of CNG & EV propelled cars are as tabulated below:

| Particulars | CNG Car | EV Car |
|---|---:|---:|
| Car purchase price (₹) | 9,20,000 | 15,20,000 |
| Govt. subsidy on purchase of car (₹) | -- | 1,50,000 |
| Life of the car | 15 years | 10 years |
| Residual value (₹) | 95,000 | 1,70,000 |
| Mileage | 20 km/kg | 240 km per charge |
| Electricity consumption per full charge | -- | 30 Kwh |
| CNG cost per Kg (₹) | 60 | -- |
| Power cost per Kwh (₹) | -- | 7.60 |
| Annual Maintenance cost (₹) | 8,000 | 5,200 |
| Annual insurance cost (₹) | 7,600 | 14,600 |
| Tyre replacement cost in every 5 - year (₹) | 16,000 | 16,000 |
| Battery replacement cost in every 8- year (₹) | 12,000 | 5,40,000 |

Apart from the above, the following are the additional information:

| Particulars | |
|---|---:|
| Average distance covered by a car in a month | 1,500 km |
| Driver’s salary (₹) | 20,000 p.m |
| Garage rent per car (₹) | 4,500 p.m |
| Share of Office & Administration cost per car (₹) | 1,500 p.m |

You have been approached by the management of A LMV Pvt. Ltd. for consultation on the two options of operating the cab service.

CALCULATE the operating cost of vehicle per month per car for both CNG & EV options.
#### Answer
**Workings:**

**1. Calculation of Depreciation per month:**

| | Particulars | CNG Car | EV Car |
|---|---|---:|---:|
| A | Car purchase price (₹) | 9,20,000 | 15,20,000 |
| B | Less: Govt. subsidy (₹) | -- | (1,50,000) |
| C | Less: Residual value (₹) | (95,000) | (1,70,000) |
| D | Depreciable value of car (₹) [A-B-C] | 8,25,000 | 12,00,000 |
| E | Life of the car | 15 years | 10 years |
| F | Annual depreciation (₹) [D÷E] | 55,000 | 1,20,000 |
| **G** | **Depreciation per month (₹) [F÷12]** | **4,583.33** | **10,000** |

**2. Fuel/ Electricity consumption cost per month:**

| | Particulars | CNG Car | EV Car |
|---|---|---:|---:|
| A | Average distance covered in a month (KM) | 1,500 | 1,500 |
| B | Mileage (KM) | 20 | 240 |
| C | Qty. of CNG/ Full charge required [A÷B] | 75 kg. | 6.25 |
| D | Electricity Consumption [C×30kwh] | - | 187.5 |
| E | Cost of CNG per kg (₹) | 60 | - |
| F | Power cost per Kwh (₹) | - | 7.60 |
| **G** | **CNG Cost per month (₹) [C×E]** | **4,500** | **-** |
| **H** | **Power cost per month (₹) [D×F]** | **-** | **1,425** |

**3. Amortised cost of Tyre replacement:**

| | Particulars | CNG Car | EV Car |
|---|---|---:|---:|
| A | Life of vehicle | 15 years | 10 years |
| B | Replacement interval | 5 years | 5 years |
| C | No. of time replacement required | 2 times | 1 time |
| D | Cost of tyres for each replacement (₹) | 16,000 | 16,000 |
| E | Total replacement cost (₹) [C×D] | 32,000 | 16,000 |
| F | Amortised cost per year (₹) [E÷A] | 2,133.33 | 1,600 |
| **E** | **Cost per month (₹) [F÷12]** | **177.78** | **133.33** |

**4. Amortised cost of Battery replacement:**

| | Particulars | CNG Car | EV Car |
|---|---|---:|---:|
| A | Life of vehicle | 15 years | 10 years |
| B | Replacement interval | 8 years | 8 years |
| C | No. of time replacement required | 1 time | 1 time |
| D | Cost of battery for each replacement (₹) | 12,000 | 5,40,000 |
| E | Total replacement cost (₹) [C×D] | 12,000 | 5,40,000 |
| F | Amortised cost per year (₹) [E÷A] | 800 | 54,000 |
| **E** | **Cost per month (₹) [F÷12]** | **66.67** | **4,500** |

**Calculation of Operating cost per month**

| | Particulars | CNG Car (₹) | EV Car (₹) |
|---|---|---:|---:|
| **A** | **Running cost:** | | |
| | Fuel cost/ Power consumption cost [Refer WN-2] | 4,500 | 1,425 |
| **B** | **Maintenance cost:** | | |
| | Annual Maintenance cost [Annual cost ÷12] | 666.67 | 433.33 |
| | Annual Insurance cost [Annual cost ÷12] | 633.33 | 1,216.67 |
| | Amortised cost of Tyre replacement [Refer WN-3] | 177.78 | 133.33 |
| | Amortised cost of Battery replacement [Refer WN-4] | 66.67 | 4,500 |
| | | 1,544.45 | 6,283.33 |
| **C** | **Fixed cost:** | | |
| | Depreciation [Refer WN-1] | 4,583.33 | 10,000 |
| | Driver’s salary | 20,000 | 20,000 |
| | Garage rent | 4,500 | 4,500 |
| | Share of Office & Administration cost | 1,500 | 1,500 |
| | | 30,583.33 | 36,000 |
| **D** | **Operating cost per month [A+B+C]** | **36,627.78** | **43,708.33** |
#### Approach
Bring every cost to a monthly figure per car: depreciation on cost less subsidy and residual value, fuel or power from the distance and mileage, and replacements spread over each vehicle's life (count how many replacements fall within it).

---
item: q10
qno: 10
type: descriptive
tags: cma.std.material
difficulty: medium
q: 14
a: 36-38
---
#### Question
EML operates in coal mining through open cast mining method. Explosives and detonators are used for excavation of coal from the mines. The following are the details of standard quantity of explosives materials used for mining:

| Particulars | Rate (₹) | Standard Qty. for Iron ore | Standard Qty. for Overburden (OB) |
|---|---|---|---|
| SME | 40.00 per kg. | 2.4 kg per tonne | 1.9 kg per cubic- meter |
| Detonators | 20.00 per piece | 2 pcs per tonne | 2 pcs per cubic- meter |

The standard stripping ratio is 3:1 (means 3 cubic- meter of overburden soil to be removed to get one tonne of coal).

During the month of December 2023, the company produces 20,000 tonnes of coal and 58,000 cubic- meter of OB. The quantity of explosive materials used and paid for the month is as below:

| Material | Quantity | Amount (₹) |
|---|---:|---:|
| SME | 1,67,200 kg. | 63,53,600 |
| Detonators | 1,18,400 pcs | 24,27,200 |

Explosive suppliers are paid for the explosive materials on the basis of performance of the explosives which is termed as powder factor. One of the suppliers has presented their bill for explosive supplied for the month of December 2023. You being a bill passing officer of EML is required to COMPUTE the material price variance, material quantity variance and material cost variance.
#### Answer
**Workings:**

**1. Calculation of Standard Qty. of Explosives and Detonators for actual output:**

| | Particulars | Coal | Overburden (OB) | Total |
|---|---|---:|---:|---:|
| SME: | | | | |
| A | Actual Output | 20,000 tonne | 58,000 M³ | |
| B | Standard Qty per unit | 2.4 kg./ tonne | 1.9 kg./M³ | |
| **C** | **Standard Qty. for actual production [A×B]** | **48,000 kg.** | **1,10,200 kg.** | **1,58,200 kg.** |
| Detonators: | | | | |
| D | Standard Qty per unit | 2 pcs/ tonne | 2 pcs/ M³ | |
| **E** | **Standard Qty. for actual production [A × D]** | **40,000 pcs.** | **1,16,000 pcs** | **1,56,000 pcs** |

**2. Calculation of Actual Price per unit of materials:**

| Material | Quantity [A] | Amount (₹) [B] | Rate (₹) [C = B÷A] |
|---|---|---:|---:|
| SME | 1,67,200 kg. | 63,53,600 | 38.00 |
| Detonators | 1,18,400 pcs | 24,27,200 | 20.50 |

**Computation of material price variance:**

Material Price Variance = Actual Qty. × (Std. Price - Actual Price)

SME = 1,67,200 kg. × (₹40 – ₹38) = ₹3,34,400 (F)

Detonators = 1,18,400 pcs × (₹20 – ₹20.5) = ₹59,200 (A)

**Total = ₹2,75,200 (F)**

**Computation of material quantity variance:**

Material Qty. Variance = Std. Price × (Std. Qty for actual output - Actual Qty.)

SME = ₹40 × (1,58,200 kg. - 1,67,200 kg.) = ₹3,60,000 (A)

Detonators = ₹20 × (1,56,000 pcs -1,18,400 pcs) = ₹7,52,000 (F)

**Total = ₹3,92,000 (F)**

**Computation of material cost variance:**

Material cost variance = Std. cost – Actual Cost

Or, (Std. Price × Std. Qty) – (Actual Price × Actual Qty.)

SME = (₹ 40 × 1,58,200 kg) – (₹ 38 × 1,67,200 kg.)

= ₹ 63,28,000 – ₹ 63,53,600 = ₹ 25,600 (A)

Detonators = (₹ 20 × 1,56,000 pcs) – (₹ 20.50 × 1,18,400 pcs)

= ₹31,20,000 – ₹24,27,200 = 6,92,800 (F)

**Total = ₹6,67,200 (F)**
#### Approach
Standard quantity is set separately for coal (per tonne) and for overburden (per cubic metre) on the actual output of each; the actual price per unit comes from the bill.

---
item: q11
qno: 11
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: medium
q: 15
a: 38-39
---
#### Question
The analysis of cost sheet of A Ltd. for the last financial year has revealed the following information for it’s product R:

| Elements of Cost | Variable Cost portion | Fixed Cost |
|---|---|---:|
| Direct Material | 30% of cost of goods sold | -- |
| Direct Labour | 15% of cost of goods sold | -- |
| Factory Overhead | 10% of cost of goods sold | ₹ 2,30,000 |
| General & Administration Overhead | 2% of cost of goods sold | ₹ 71,000 |
| Selling & Distribution Overhead | 4% of cost of sales | ₹ 68,000 |

Last year 5,000 units were sold at ₹185 per unit.

You being an associate to cost controller of the A Ltd., CALCULATE :

(i) Break-even Sales (in rupees),

(ii) Profit earned during last year,

(iii) Margin of safety (in %) and

(iv) the profit if the sales were 10% less than the actual sales.
#### Answer
**Workings:**

**Calculation of Cost of Goods Sold (COGS):**

COGS = {(DM- 0.3 COGS) + (DL- 0.15 COGS) + (FOH- 0.10 COGS + ₹ 2,30,000) + (G&AOH- 0.02 COGS + ₹ 71,000)}

Or COGS = 0.57 COGS + ₹ 3,01,000

Or COGS = $\dfrac{\text{₹3,01,000}}{0.43}$ = ₹ 7,00,000

**Calculation of Cost of Sales (COS):**

COS = COGS + (S&DOH- 0.04 COS + ₹ 68,000)

Or COS = ₹ 7,00,000 + (0.04 COS + ₹ 68,000)

Or COS = $\dfrac{\text{₹7,68,000}}{0.96}$ = ₹ 8,00,000

**Calculation of total Fixed Costs:**

| | |
|---|---:|
| Factory Overhead | ₹ 2,30,000 |
| General & Administration OH | ₹ 71,000 |
| Selling & Distribution OH | ₹ 68,000 |
| | ₹ 3,69,000 |

**Calculation of Variable Costs:**

| | | |
|---|---|---:|
| Direct Material | (0.3 × ₹ 7,00,000) | ₹ 2,10,000 |
| Direct Labour | (0.15 × ₹ 7,00,000) | ₹ 1,05,000 |
| Factory Overhead | (0.10 × ₹ 7,00,000) | ₹ 70,000 |
| General & Administration OH | (0.02 × ₹ 7,00,000) | ₹ 14,000 |
| Selling & Distribution OH | (0.04 × ₹ 8,00,000) | ₹ 32,000 |
| | | ₹ 4,31,000 |

**Calculation of P/V Ratio:**

P/V Ratio = $\dfrac{\text{Contribution}}{\text{Sales}} \times 100 = \dfrac{\text{Sales-Variable Costs}}{\text{Sales}} \times 100$

= $\dfrac{(\text{₹185} \times \text{5,000 units}) - \text{₹4,31,000}}{\text{₹185} \times \text{5,000 units}} \times 100$ = 53.41%

(i) Break-Even Sales = $\dfrac{\text{Fixed Costs}}{\text{P / V Ratio}} = \dfrac{\text{₹3,69,000}}{53.41\%}$ = ₹ 6,90,882

(ii) Profit earned during the last year

= (Sales – Total Variable Costs) – Total Fixed Costs

= (₹ 9,25,000 - ₹ 4,31,000) - ₹ 3,69,000

= ₹ 1,25,000

(iii) Margin of Safety (%) = $\dfrac{\text{Sales-Breakeven sales}}{\text{Sales}} \times 100$

= $\dfrac{\text{₹ 9,25,000- ₹ 6,90,882}}{\text{₹ 9,25,000}} \times 100$ = 25.31%

(iv) Profit if the sales were 10% less than the actual sales:

Profit = 90% (₹ 9,25,000 - ₹ 4,31,000) - ₹ 3,69,000

= ₹ 4,44,600 - ₹ 3,69,000 = ₹ 75,600
#### Approach
The variable costs are stated as percentages of cost of goods sold and of cost of sales, so solve for those two totals first; then the usual P/V ratio, break-even and margin of safety follow.

---
item: q12
qno: 12
type: descriptive
tags: cma.bud.flexible, cma.bud.functional
difficulty: hard
q: 15-16
a: 40-41
---
#### Question
M Ltd. is a public sector undertaking (PSU), produces a product A. The company is in process of preparing its revenue budget for the year 2024. The company has the following information which can be useful in preparing the budget:

(i) It has anticipated 12% growth in sales volume from the year 2023 of 4,20,000 tonnes.

(ii) The sales price of ₹ 23,000 per tonne will be increased by 10% provided Wholesale Price Index (WPI) increases by 5%.

(iii) To produce one tonne of product A, 2.3 tonnes of raw material are required. The raw material cost is ₹ 4,500 per tonne. The price of raw material will also increase by 10% if WPI increase by 5%.

(iv) The projected increase in WPI for 2024 is 4%

(v) A total of 6,000 employees works for the company. The company works 26 days in a month.

(vi) 85% of employees of the company are permanent and getting salary as per 5- year wage agreement. The earnings per manshift (means an employee cost for a shift of 8 hours) is ₹ 3,000 (excluding terminal benefits). The new wage agreement will be implemented from 1st July 2024 and it is expected that a 15% increase in pay will be given.

(vii) The casual employees are getting a daily wage of ₹ 850. The wages in linked to Consumer Price Index (CPI). The present CPI is 165.17 points and it is expected to be 173.59 points in year 2024.

(viii) Power cost for the year 2023 is ₹ 42,00,000 for 7,00,000 units (1 unit = 1 Kwh). 60% of power is used for production purpose (directly related to production volume) and remaining are for employee quarters and administrative offices.

(ix) During the year 2023, the company has paid ₹ 60,00,000 for safety and maintenance works. The amount will increase in proportion to the volume of production.

(x) During the year 2023, the company has paid ₹ 1,20,000 for the purchase of diesel to be used in car hired for administrative purposes. The cost of diesel will increase by 15% in year 2024.

(xi) During the year 2023, the company has paid ₹ 6,00,000 for car hire charges (excluding fuel cost). In year 2024, the company has decided to reimburse the diesel cost to the car rental company. Doing this will attract 5% GST on Reverse Charge Mechanism (RCM) basis on which the company will not get GST input credit.

(xii) Depreciation on fixed assets for the year 2023 is ₹ 80,40,00,000 and it will be 15% lower in 2024.

You being an associate to the budget controller of the company, PREPARE Revenue (Flexible) budget for the year 2024 and also show the budgeted profit/ loss for the year.
#### Answer
**Revenue Budget (Flexible Budget) of M Ltd. for the Year 2024**

| | Particulars | PY 2023 | CY 2024 |
|---|---|---:|---:|
| A | Sales Volume (Tonnes) | 4,20,000 | 4,70,400<br>[112%×4,20,000] |
| B | Selling Price per tonne (₹) | 23,000 | 23,000 |
| | | **(₹ in lakh)** | **(₹ in lakh)** |
| **C** | **Sales value [A×B]** | **96,600** | **1,08,192** |
| D | **Raw material Cost:** | | |
| (i) | Qty. of Material [2.3 tonnes × A] (tonnes) | 9,66,000 | 10,81,920 |
| (ii) | Price per tonne (₹) | 4,500 | 4,500 |
| (iii) | **Total raw material cost [(i)×(ii)]** | **43,470** | **48,686.40** |
| E | **Wages & Salary Cost:** | | |
| (i) | Wages to casual employees<br>(15%×6,000 = 900 employees) | 2,386.80<br>[900×26×12×₹850] | 2,508.47<br>[900×26×12×₹893.33] |
| (ii) | Salary to permanent employees<br>(85%×6,000 = 5,100 employees) | 47,736<br>[5100×26×12×₹3,000] | 51,316.20<br>[(5100×26×6×₹3,000) + (5100×26×6×₹3,450)] |
| (iii) | **Total wages & salary [(i)+(ii)+(iii)]** | **50,122.80** | **53,824.67** |
| F | **Power cost:** | | |
| (i) | For production (units) | 4,20,000<br>[60%×7,00,000] | 4,70,400<br>[112%×4,20,000] |
| (ii) | For employees & offices (units)<br>[40%×7,00.000] | 2,80,000 | 2,80,000 |
| (iii) | Total Power consumption (units) [(i)+(ii)] | 7,00,000 | 7,50,400 |
| (iv) | Power rate per unit (₹) [₹42,00,000÷7,00,000] | 6.00 | 6.00 |
| (v) | Total power cost [(iii)×(iv)] | **42** | **45.024** |
| G | **Safety and maintenance Cost** | **60** | **67.20**<br>**[112%×4,20,000]** |
| H | **Diesel cost** | **1.2** | **-** |
| I | **Car Hire charge:** | | |
| (i) | Car hire charge | 6 | 6 |
| (ii) | Fuel reimbursement cost | - | 1.38<br>[115%×1.2] |
| (iii) | GST@5% on RCM basis<br>[5%×(i+ii)] | - | 0.369 |
| (iv) | **Total Car hire charge cost [(i)+(ii)+(iii)]** | **6** | **7.749** |
| **J** | **Depreciation** | **8,040** | **6,834**<br>**[85%×8040]** |
| K | Total Cost [Sum of D to J] | 1,01,742 | 1,09,465.043 |
| **L** | **Profit/ (Loss) [C-L]** | **(5,142)** | **(1273.043)** |
#### Approach
Decide first which conditions bite: the price and raw-material increases depend on WPI rising by 5%, and the projection is 4%. Then budget each cost on its own driver (volume, wage agreement from July, CPI, fixed power for offices, GST on reverse charge).

---
item: q13a
qno: 13
part: (a)
type: descriptive
tags: cma.sys.ledgers, cma.sys.recon
difficulty: easy
q: 17
a: 41-42
---
#### Question
“Is reconciliation of cost accounts and financial accounts necessary in case of integrated accounting system?” explain.
#### Answer
In integrated accounting system cost and financial accounts are kept in the same set of books. Such a system will have to afford full information required for Costing as well as for Financial Accounts. In other words, information and data should be recorded in such a way so as to enable the firm to ascertain the cost (together with the necessary analysis) of each product, job, process, operation or any other identifiable activity. It also ensures the ascertainment of marginal cost, variances, abnormal losses and gains. In fact, all information that management requires from a system of Costing for doing its work properly is made available. The integrated accounts give full information in such a manner so that the profit and loss account and the balance sheet can be prepared according to the requirements of law and the management maintains full control over the liabilities and assets of its business.

Since, only one set of books are kept for both cost accounting and financial accounting purpose so there is no necessity of reconciliation of cost and financial accounts.
#### Approach
Say what an integrated system is (one set of books serving both purposes) and the answer follows from it.

---
item: q13b
qno: 13
part: (b)
type: descriptive
tags: cma.intro.methods
difficulty: easy
q: 17
a: 42-43
---
#### Question
Discuss the impact of Information Technology in Cost Accounting.
#### Answer
The impact of IT in cost accounting may include the followings:

(i) After the introduction of ERPs, different functional activities get integrated and as a consequence a single entry into the accounting system provides custom made reports for every purpose and saves an organisation from preparing different sets of documents. Reconciliation process of results of both cost and financial accounting systems become simpler and less sophisticated.

(ii) A move towards paperless environment can be seen where documents like Bill of Material, Material Requisition Note, Goods Received Note, labour utilisation report etc. are no longer required to be prepared in multiple copies, the related department can get e-copy from the system.

(iii) Information Technology with the help of internet (including intranet and extranet) helps in resource procurement and mobilisation. For example, production department can get materials from the stores without issuing material requisition note physically. Similarly, purchase orders can be initiated to the suppliers with the help of extranet. This enables an entity to shift towards Just-in-Time (JIT) approach of inventory management and production.

(iv) Cost information for a cost centre or cost object is ascertained with accuracy in timely manner. Each cost centre and cost object is codified and all related costs are assigned to the cost object or cost centre. This process automates the cost accumulation and ascertainment process. The cost information can be customised as per the requirement. For example, when an entity manufactures or provide services, it can know information job-wise, batch-wise, process-wise, cost centre wise etc.

(v) Uniformity in preparation of report, budgets and standards can be achieved with the help of IT. ERP software plays an important role in bringing uniformity irrespective of location, currency, language and regulations.

(vi) Cost and revenue variance reports are generated in real time basis which enables the management to take control measures immediately.

(vii) IT enables an entity to monitor and analyse each process of manufacturing or service activity closely to eliminate non-value-added activities.

The above are examples of few areas where Cost Accounting is done with the help of IT.
#### Approach
Think of what ERP and networks change in a costing department: integrated entries, paperless documents, procurement, codified cost centres, uniform reports and real-time variances.

---
item: q13c
qno: 13
part: (c)
type: descriptive
tags: cma.intro.classify
difficulty: easy
q: 17
a: 43
---
#### Question
Explain the difference between controllable & uncontrollable costs?
#### Answer
**Controllable costs and Uncontrollable costs**: Cost that can be controlled, typically by a cost, profit or investment centre manager is called controllable cost. Controllable costs incurred in a particular responsibility centre can be influenced by the action of the executive heading that responsibility centre.

Costs which cannot be influenced by the action of a specified member of an undertaking are known as uncontrollable costs.
#### Approach
Controllability is always judged from a particular manager's position: ask whether that person's action can influence the cost.

---
item: q13d
qno: 13
part: (d)
type: descriptive
tags: cma.joint.apportion
difficulty: easy
q: 17
a: 43-44
---
#### Question
How apportionment of joint costs upto the point of separation amongst the joint products using market value at the point of separation and net realizable value method is done? Discuss.
#### Answer
**Apportionment of Joint Cost amongst Joint Products using:**

**Market value at the point of separation:** This method is used for apportionment of joint costs to joint products upto the split off point. It is difficult to apply if the market value of the product at the point of separation is not available. It is useful method where further processing costs are incurred disproportionately.

**Net realizable value Method**: From the sales value of joint products (at finished stage) the followings are deducted:

- Estimated profit margins
- Selling & distribution expenses, if any
- Post split off costs.

The resultant figure so obtained is known as net realizable value of joint products. Joint costs are apportioned in the ratio of net realizable value.
#### Approach
For each method say what value is used as the basis (value at split-off; final sales value less what is deducted after it) and when it suits.
