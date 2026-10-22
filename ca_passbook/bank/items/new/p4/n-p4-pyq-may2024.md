<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-pyq-may2024
paper: p4
kind: pyq
attempt: may2024
qfile: new/p4/pyq-may2024-a.pdf
afile: new/p4/pyq-may2024-a.pdf
paperfile: new/p4/pyq-may2024-q.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-07
date: 2026-10-20
note: Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer. Part II only: ICAI did not publish the May 2024 Part I MCQs (not in this file, not in the Group II compilation, not in the scan; see bank/sources.json), so the document has the six descriptive questions (70 marks) and no MCQ items; a sitting of it covers Part II only. Instructions: the choice rule and notes printed on p.1. Marks: these Suggested Answers print no marks at all; every item's marks are ICAI's, read on the page images of the question-paper scan (paperfile), which prints them as bare margin figures: Q1 (a) 5, (b) 5 (scan p.2), (c) 4 (p.3); Q2 (a) 8 (p.3), (b) 6 (p.5); Q3 (a) 7 (p.6), (b) 7 (p.7); Q4 (a) 8 (p.7), (b) 6 (p.9); Q5 (a) 6 (p.10), (b) 4, (c) 4 (p.11); Q6 (a) 5, (b) 5, (c) 4, OR (c) 4 (p.12), 14 marks a question. The question text is the Suggested Answers'; where it differs from the scan in a word or figure that was noticed, the item's note says so. Question text is italic throughout ICAI's PDF; that styling is not reproduced. Accepted numbers (each read on the page): 4 is the paper's title "PAPER – 4: COST AND MANAGEMENT ACCOUNTING" on p.1 (not transcribed); 1 to 6 are the question numbers, which ICAI prints once ("Question 1" above the question; its "Answer" carries no number) while check.py counts them for both the question and the answer of the same file.
---
#### Instructions
Question No. 1 is compulsory.

Attempt any four questions out of the remaining five questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.mat.eoq, cma.mat.levels
difficulty: medium
q: 1
a: 2-3
note: The Suggested Answers reproduce this question as "Tesco cycles Ltd. used ... at wholesale rate"; the question-paper scan (p.2) prints "Tesco Cycles Ltd. uses ... at wholesale rates". Transcribed from the Suggested Answers.
---
#### Question
Tesco cycles Ltd. used about 3,60,000 cycle locks per annum and the usage is fairly constant at 30,000 per month. The cycle lock costs ₹ 240 each at wholesale rate and carrying cost is estimated to be 10% of the annual average inventory value. The cost to place an order is ₹ 1200. It takes 45 days to receive delivery from the date of order. In order to avoid any kind of disruption in assembly line, safety stock of 6,500 cycle locks is always maintained by Tesco Cycles Ltd.

(Assume 360 days in a year).

Compute:

(i) E.O.Q.

(ii) The re-order level.

(iii) The company has been offered a quantity discount of 2% on the purchase of cycle locks provided the order size is 30,000 units at a time. Advise whether quantity discount offer can be accepted?
#### Answer
**(i) Calculation of Economic Order Quantity**

EOQ = $\sqrt{\dfrac{2AO}{C}}$ = $\sqrt{\dfrac{2 \times 3{,}60{,}000 \text{ units} \times ₹1200}{₹24}}$ = **6,000 units**

Where,

A = Annual Demand = 3,60,000 units

O = Ordering cost per order = ₹1200

C = Inventory carrying cost per unit per annum = 10% of ₹240 = ₹ 24

**(ii) Re-order Level = Safety Stock + Lead Time Consumption**

= 6,500 + (1,000 x 45) units = **51,500 units**

Or,

Minimum level of cycle locks + [Average rate of consumption × Average time required to obtain fresh delivery]

= 6,500 + (1,000 x 45) units = **51,500 units**

**(iii) Evaluation of Profitability of Different Options of Order Quantity**

(a) When EOQ is ordered (order size of 6,000 units)

| | | (₹) |
|---|---|---:|
| Purchase Cost | (3,60,000 units × ₹ 240) | 8,64,00,000 |
| Ordering Cost | [(3,60,000 units/6,000 units) × ₹ 1,200] | 72,000 |
| Carrying Cost | (6,000 units × ₹240 ×½ × 10/100) | 72,000 |
| Total Cost | | **8,65,44,000** |

(b) When Quantity Discount is accepted (order size of 30,000 units)

| | | (₹) |
|---|---|---:|
| Purchase Cost | [3,60,000 units × ₹ 235.2 (240-4.8)] | 8,46,72,000 |
| Ordering Cost | [(3,60,000 units/30,000 units) × ₹1,200] | 14,400 |
| Carrying Cost | (30,000 units × ₹ 235.2 ×½ × 10/100) | 3,52,800 |
| **Total Cost** | | **8,50,39,200** |

**Advise** – The total cost of inventory is lower if discount is accepted. Hence, the company is advised to accept the quantity discount.
#### Approach
Turn the monthly usage into daily usage for the 45-day lead time. For the discount, compare total cost (purchase + ordering + carrying) at the EOQ with the total cost at the discount order size.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.joint.apportion, cma.joint.further
difficulty: medium
q: 1-2
a: 4-5
---
#### Question
A company produces two products, A and B, through a joint production process. The total joint production cost incurred is as under:

| | |
|---|---:|
| Material | ₹ 20,000 |
| Labour | ₹ 10,000 |
| Variable overheads | ₹ 6,000 |
| Fixed Overheads | ₹ 24,000 |

Product A and B can be sold for ₹ 20 per unit and ₹ 15 per unit respectively at split off point. The produced quantities are Product A-2,000 units and Product B – 4,000 units.

(i) You are required to calculate the joint production cost allocation for each product using the:

(a) Physical unit method.

(b) Contribution margin method.

(ii) Product B can be further processed by incurring expenditure of ₹ 12,000. Loss in further processing is 2%. It can be sold @ ₹ 18 per unit. Explain the impact on profitability if Product B is further processed.
#### Answer
**Working**

**Calculation of joint cost**

| Description | Amount (₹) |
|---|---:|
| Material | 20,000 |
| Labour | 10,000 |
| Variable overheads | 6,000 |
| **Total variable cost** | **36,000** |
| Fixed overheads | 24,000 |
| **Total joint cost** | **60,000** |

**(i) (a) Allocation of joint cost using physical unit method:**

Product A = ₹60,000 × 2,000/6,000 = ₹ 20,000

Product B = ₹60,000 × 4,000/6,000 = ₹ 40,000

**(b) Allocation of joint cost using contribution margin method:**

| | Description | Product-A | Product-B |
|---|---|---:|---:|
| | Units produced | 2,000 | 4,000 |
| | Selling price per unit (₹) | 20 | 15 |
| A. | Sales value (₹) | 40,000 | 60,000 |
| B. | **Allocation of joint variable cost on the basis of physical unit** | | |
| | ₹36,000 × 2,000/6,000 | (12,000) | |
| | ₹36,000 × 4,000/6,000 | | (24,000) |
| C= A-B | **Contribution** | **28,000** | **36,000** |
| D | Allocation of fixed joint cost on the basis of contribution margin | | |
| | ₹24,000 × 28,000/64,000 | (10,500) | |
| | ₹24,000 × 36,000/64,000 | | (13,500) |
| C-D | Profit at split off point | **17,500** | **22,500** |

**Allocation of Joint Cost on the basis of Contribution Margin Method:**

| Particulars | Product A | Product B |
|---|---:|---:|
| Allocation of Variable Cost | ₹ 12,000 | ₹ 24,000 |
| Allocation of Fixed Cost | ₹ 10,500 | ₹ 13,500 |
| **Total Joint Cost** | **₹ 22,500** | **₹ 37,500** |

**(ii) Profitability after further processing of Product B**

| Description | Amount (₹) |
|---|---:|
| Units produced and sold 98% of 4,000 units | 3,920 |
| Selling price per unit (₹) | 18 |
| Sales value (₹) | 70,560 |
| Joint cost upto split off point | (37,500) |
| Further processing cost | (12,000) |
| **Profit after further processing** | **21,060** |

**Calculation of the profitability after further processing of product B can also be done in the following manner:**

**Profitability after further processing of Product B**

| Description | Amount (₹) |
|---|---:|
| Incremental revenue on further processing (3,920 x ₹18)- (4,000 x ₹15) | 10,560 |
| Further processing cost | (12,000) |
| **Incremental loss after further processing** | **1,440** |

**Impact on profitability on Product B**

If Product B is sold at split off point it earns profit of ₹ 22,500, but after further processing the profit is reduced to ₹ 21,060/- i.e. an opportunity loss of ₹ 1,440/-.
#### Approach
Find the joint variable cost and the joint fixed cost separately: the contribution margin method spreads the variable part by physical units and the fixed part by each product's contribution.

---
item: q1c
qno: 1
part: (c)
marks: 4
type: descriptive
tags: cma.bud.ratios
difficulty: easy
q: 2
a: 6
---
#### Question
Following data is available for XYZ Ltd. for the month of February 2024:

| | |
|---|---|
| Standard working hours | 8 hours per day of 6 days per week |
| No. of weeks in the month | 4 |
| Maximum capacity | 150 employees |
| Actual working | 125 employees |
| Actual usage of Budgeted Capacity Ratio | 86% |
| Efficiency Ratio | 110% |

You are required to calculate the following:

(i) Actual Hours worked.

(ii) Standard Hours for actual output.

(iii) Activity Ratio.

(iv) Standard Capacity Usage Ratio.
#### Answer
**(i) Actual Hours worked**

Actual Usage of Budgeted Capacity Ratio = $\dfrac{\text{Actual working Hours}}{\text{Budgeted Hours}}$ ×100

86% = (Actual working hours÷ Budgeted hours) × 100

Budgeted hours=125 workers × 8 hours× 6 days × 4 weeks = 24,000 hours

Actual hours= 24,000 × 86% = 20,640 hours

**(ii) Standard hours for actual output**

Efficiency ratio = $\dfrac{\text{Standard Hrs}}{\text{Actual Hrs}}$ ×100

110% = Standard hours÷ Actual hours

Standard hours= 20,640 × 110% = 22,704 hours

**(iii) Activity ratio** = $\dfrac{\text{Standard Hrs}}{\text{Budgeted Hrs}}$ ×100

= (22,704 ÷ 24,000) × 100 = 94.6%

**(iv) Standard capacity usage ratio**

= $\dfrac{\text{Budgeted Hours}}{\text{Max. possible hours in the budgeted period}}$ ×100

= {24,000 hours÷ (150 workers × 8 hours× 6 days × 4 weeks)} × 100

= (24,000 ÷ 28,800) × 100 = 83.33%
#### Approach
Budgeted hours come from the actual workforce (125), maximum possible hours from the maximum capacity (150); the actual hours follow from the capacity usage ratio and the standard hours from the efficiency ratio.

---
item: q2a
qno: 2
part: (a)
marks: 8
type: descriptive
tags: cma.abc.compute, cma.abc.concept
difficulty: hard
q: 6-7
a: 8-10
note: ICAI's data table labels the order size row "Average Number of Shirts per Shirt"; its answer multiplies it by the number of purchase orders (215x50 ...). Transcribed as printed. The discount per shirt is the list price ₹ 1,000 less each customer's average selling price, which ICAI's working uses without stating it. ICAI's answer tables run over page breaks: the "(No. of purchase × ₹1,260)" line at the top of p.9 belongs to the "Order taking costs" row and "(At actual price)" at the top of p.10 to the "Revenue" row; each is joined to its row here.
---
#### Question
Luxury Designer Pvt. Ltd. is a manufacturing company, which manufactures readymade designer shirts. It has four customers: two wholesale category customers and two retail category customers. It has developed the following Activity- Based Costing system:

| Activity | Cost Driver Rate (₹) |
|---|---|
| Order Processing | 1,260 per purchase order |
| Customer Visits | 1,500 per customer visit |
| Regular Delivery | 30 per delivery Km. travelled |
| Expedited Delivery | 4,490 per expedited delivery |

List selling price per shirt is ₹ 1,000 and average cost per shirt is ₹ 600. CEO of Luxury Designer Pvt. Ltd. wants to evaluate the profitability of each of the four customers for the year 2023, to explore opportunities for increasing profitability of his Company in the next year 2024. The following data in context of four customers are available for 2023:

| | Wholesale Customers | | Retail Customers | |
|---|---:|---:|---:|---:|
| | **WC-1** | **WC-2** | **RC-1** | **RC-2** |
| Number of Purchase orders | 50 | 65 | 224 | 245 |
| Number of Customer visits | 10 | 13 | 25 | 22 |
| Regular Deliveries | 46 | 52 | 175 | 198 |
| Kilometers travelled per delivery | 20 | 15 | 10 | 25 |
| Expedited Deliveries | 5 | 16 | 50 | 62 |
| Average Number of Shirts per Shirt | 215 | 110 | 18 | 15 |
| Average Selling Price per Shirt | ₹ 700 | ₹ 800 | ₹ 900 | ₹ 950 |

You are required to:

Calculate the customer-level operating income and operating income as a % of revenues in 2023 and rank them on the basis of relative profitability.
#### Answer
**Working note:**

**Computation of revenues (at listed price), discount, cost of goods sold and customer level operating activities costs:**

| | Wholesale Category Customers | | Retail Category Customers | |
|---|---:|---:|---:|---:|
| | **WC-1** | **WC-2** | **RC-1** | **RC-2** |
| Number of shirts sold (a) | 10,750 (215x50) | 7,150 (110x65) | 4,032 (18x224) | 3,675 (15x245) |
| Revenues (at listed price) (₹): (b) {(a) × ₹ 1,000)} | 1,07,50,000 | 71,50,000 | 40,32,000 | 36,75,000 |
| Discount (₹): (c) {(a) × Discount per shirt} | 32,25,000 | 14,30,000 | 4,03,200 | 1,83,750 |
| Cost of shirts (₹) : (d) {(a) × ₹ 600} | 64,50,000 | 42,90,000 | 24,19,200 | 22,05,000 |
| Order taking costs (₹): (No. of purchase × ₹1,260) | 63,000 | 81,900 | 2,82,240 | 3,08,700 |
| Customer visits costs (₹) (No. of customer visits × ₹ 1,500) | 15,000 | 19,500 | 37,500 | 33,000 |
| Delivery vehicles travel costs (₹) (Kms travelled by delivery vehicles × ₹ 30 per km.) | 27,600 | 23,400 | 52,500 | 1,48,500 |
| Cost of expediting deliveries (₹) {No. of expedited deliveries × ₹ 4,490} | 22,450 | 71,840 | 2,24,500 | 2,78,380 |
| Total cost of customer level operating activities (₹) | 1,28,050 | 1,96,640 | 5,96,740 | 7,68,580 |

**Computation of Customer level operating income**

| | Wholesale Category Customers | | Retail Category Customers | |
|---|---:|---:|---:|---:|
| | **WC-1** | **WC-2** | **RC-1** | **RC-2** |
| Revenues (At list price) (Refer to working note) | 1,07,50,000 | 71,50,000 | 40,32,000 | 36,75,000 |
| Less: Discount (Refer to working note) | 32,25,000 | 14,30,000 | 4,03,200 | 1,83,750 |
| Revenue (At actual price) | 75,25,000 | 57,20,000 | 36,28,800 | 34,91,250 |
| Less: Cost of shirts (Refer to working note) | 64,50,000 | 42,90,000 | 24,19,200 | 22,05,000 |
| Gross margin | 10,75,000 | 14,30,000 | 12,09,600 | 12,86,250 |
| Less: Customer level operating activities costs (Refer to working note) | 1,28,050 | 1,96,640 | 5,96,740 | 7,68,580 |
| Customer level operating income | 9,46,950 | 12,33,360 | 6,12,860 | 5,17,670 |
| Operating income as a % of revenues | 12.584% | 21.562% | 16.889% | 14.828% |
| Rank | IV | I | II | III |
#### Approach
Work customer by customer: shirts sold, revenue at list price less the discount, cost of shirts, then each activity's driver quantity times its rate. Rank on operating income as a percentage of revenue.

---
item: q2b
qno: 2
part: (b)
marks: 6
type: descriptive
tags: cma.svc.transport, cma.mc.basics
difficulty: medium
q: 7-8
a: 10-11
note: ICAI's question prints the fare as "from city 'ND" to 'GA'" (a double quote after ND); transcribed as printed. ICAI's conclusion speaks of an increase in contribution of ₹ 92,709, which is also the increase in net income per flight (2,85,564 − 1,92,855).
---
#### Question
Star Airlines operates a single aircraft of 180 seats capacity between city 'ND' and 'GA'. The average normal occupancy is estimated at 70% per flight. The average one-way fare is ₹ 12,500 from city 'ND" to 'GA'. The costs of operation of the flight as collected by an expert analyst are:

| | |
|---|---|
| Fuel cost (Variable) per flight from ‘ND’ to ‘GA’ | ₹ 2,28,000 per flight |
| Food served on flight from ‘ND’ to ‘GA’ (no charge to passenger) | ₹ 270 per passenger |
| Commission paid to Travel Agents (All ticket booking through agents) | 7.5% of fare |
| Fixed costs: | |
| Lease & landing charges per flight ‘ND’ to ‘GA’ | ₹ 9,12,000 |
| Salaries of flight crew per flight ‘ND’ to ‘GA’ | ₹ 90,000 |

Note: Assume that fuel costs are unaffected by the actual number of passengers on a flight.

You are required to:

(i) Calculate the net operating income that Star Airlines makes per flight from 'ND' to 'GA'.

(ii) Star Airlines expects that its occupancy will increase to 144 passengers per flight if the fare is reduced to ₹ 11,670. Advise whether this proposal should be implemented or not.
#### Answer
**(i) No. of passengers 180 seats × 70% = 126**

| | (₹) | (₹) |
|---|---:|---:|
| Fare collection (126 passengers × ₹12,500) | | 15,75,000 |
| Variable costs: | | |
| Fuel | 2,28,000 | |
| Food (126 passengers × ₹270) | 34,020 | |
| Commission (7.5 % of ₹15,75,000) | 1,18,125 | 3,80,145 |
| Contribution per flight | | 11,94,855 |
| Fixed costs: | | |
| Lease and Landing Charges | 9,12,000 | |
| Salaries of flight Crew | 90,000 | 10,02,000 |
| Net income per flight | | 1,92,855 |

**(ii)**

| | | |
|---|---:|---:|
| Fare collection (144 passengers × ₹11,670) | | 16,80,480 |
| Variable costs: | | |
| Fuel | 2,28,000 | |
| Food (144 passengers × ₹270) | 38,880 | |
| Commission (7.5% of ₹16,80,480) | 1,26,036 | 3,92,916 |
| Contribution | | 12,87,564 |
| Fixed costs: | | |
| Lease and Landing Charges | 9,12,000 | |
| Salaries of flight Crew | 90,000 | 10,02,000 |
| Net income per flight | | 2,85,564 |

There is an increase in contribution by ₹ 92,709. Hence the proposal is acceptable.
#### Approach
Fuel is variable per flight, not per passenger; food and the agents' commission vary with passengers and fares. Compare net income per flight at the present and the proposed fare.

---
item: q3a
qno: 3
part: (a)
marks: 7
type: descriptive
tags: cma.bud.flexible, cma.mc.basics
difficulty: medium
q: 11-12
a: 13-14
note: ICAI's comment gives the profit at 70% as "₹ 3,88,00" (its table: 3,88,000) and its table heads the advertising row "Adverting Cost"; both transcribed as printed.
---
#### Question
A factory is currently working at 60% capacity and produces 12,000 units of a product. Management is thinking to increase the working capacity either to 70% or 90% level. It is estimated that at both the levels, it will be able to sell all the produced units. The other details are as under:

- At 70% capacity, the cost of raw materials increases by 4% and the selling price falls by 3%.
- At 90% capacity, the cost of raw materials increases by 5% and selling price falls by 4%.
- At 60% capacity, the product cost is ₹ 360 per unit and it is sold at ₹ 400 per unit.
- The unit cost of 360 consists of the following:

| | |
|---|---:|
| Material | ₹ 200 |
| Labour | ₹ 60 |
| Factory overhead | ₹ 60 (50 % fixed) |
| Administrative & Selling overhead | ₹ 40 (60 % fixed) |

- Additional advertising cost of ₹ 20,000 is to be incurred for selling the product above 80% capacity.

You are required to:

(i) Calculate the profits of the company when the factory works at 60%, 70% and 90% capacity level.

(ii) Offer your comments regarding increase in the capacity based on profit calculated.
#### Answer
**(i) Expense Budget at 60%, 70% & 90% level**

| | 60% (12,000 units) | | 70% (14,000 units) | | 90% (18,000 units) | |
|---|---:|---:|---:|---:|---:|---:|
| | **Per unit (₹)** | **Amount (₹)** | **Per unit (₹)** | **Amount (₹)** | **Per unit (₹)** | **Amount (₹)** |
| Sales **(A)** | 400 | 48,00,000 | 388 | 54,32,000 | 384 | 69,12,000 |
| **Variable Costs:** | | | | | | |
| Direct Material | 200 | 24,00,000 | 208 | 29,12,000 | 210 | 37,80,000 |
| Direct Wages | 60 | 7,20,000 | 60 | 8,40,000 | 60 | 10,80,000 |
| Variable Factory Overheads | 30 | 3,60,000 | 30 | 4,20,000 | 30 | 5,40,000 |
| Variable Administrative & Selling Overheads | 16 | 1,92,000 | 16 | 2,24,000 | 16 | 2,88,000 |
| Total Variable Cost **(B)** | 306 | 36,72,000 | 314 | 43,96,000 | 316 | 56,88,000 |
| Contribution **(C)=(A–B)** | 94 | 11,28,000 | 74 | 10,36,000 | 68 | 12,24,000 |
| **Fixed Costs:** | | | | | | |
| Fixed Factory Overheads (50%) | -- | 3,60,000 | -- | 3,60,000 | -- | 3,60,000 |
| Fixed Administrative & Selling Overheads (60%) | -- | 2,88,000 | -- | 2,88,000 | -- | 2,88,000 |
| Adverting Cost | -- | -- | -- | -- | -- | 20,000 |
| Total Fixed Costs **(D)** | -- | 6,48,000 | -- | 6,48,000 | -- | 6,68,000 |
| Profit **(C – D)** | -- | 4,80,000 | -- | 3,88,000 | -- | 5,56,000 |

**(ii) Comment:** Increase of production capacity to 90% is likely to increase the profit to maximum of ₹ 5,56,000 due to increase in contribution while fixed cost is slightly increased due to in advertising cost. At 70% capacity, profit is reduced to minimum of ₹ 3,88,00 due to decrease in selling price by 3% along with increase in raw material cost by 4% resulting in decrease of contribution. Therefore, it is recommended that factory should operate at 90% capacity.
#### Approach
Split the overheads into their fixed and variable parts at the 60% level first: the fixed amounts stay the same at every level, the variable ones move with output.

---
item: q3b
qno: 3
part: (b)
marks: 7
type: descriptive
tags: cma.sys.recon, cma.sys.ledgers
difficulty: medium
q: 12
a: 14-15
note: The Suggested Answers reproduce the year end as "31.03.2004" and the item "Interest & Divided received"; the question-paper scan (p.7) prints "31.03.2024" and "Interest & Dividend received". Transcribed from the Suggested Answers.
---
#### Question
S.K. Manufacturing Co. Ltd. showed a net profit of ₹ 5,40,400 as per their cost accounts for the year ended 31.03.2004. However, the financial books disclosed a net profit of ₹ 2,60,500 for the same period. The following information was revealed as a result of scrutiny of the figures of both the sets of books:

| | ₹ |
|---|---:|
| Factory overheads under absorbed | 84,800 |
| Administrative overheads over absorbed | 24,000 |
| Interest paid on bank borrowings | 50,000 |
| Interest & Divided received | 65,200 |
| Notional rent of own premises charged in cost accounts | 60,000 |
| Losses on the sales of fixed assets and investments | 48,000 |
| Donations and subscriptions | 18,800 |
| Overvaluation of closing stock of finished goods in Cost accounts | 1,25,000 |
| Store adjustments (credited in financial books) | 7,500 |
| Depreciation over charged in cost accounts | 40,000 |
| Income tax provided | 1,50,000 |

You are required to:

(i) Prepare a reconciliation statement taking net profit as per cost accounts as base.

(ii) State when is the reconciliation statement of Cost and Financial accounts not required?
#### Answer
**(i) Statement of Reconciliation of profit as obtained under Cost and Financial Accounts**

| | | (₹) | (₹) |
|---|---|---:|---:|
| | **Profit as per Cost Records** | | **5,40,400** |
| Add: | Administrative Overhead over absorbed | 24,000 | |
| | Interest & Dividend Received | 65,200 | |
| | Notional rent of own premises | 60,000 | |
| | Stores adjustments (credited in financial books) | 7,500 | |
| | Depreciation over charged in cost accounts | 40,000 | 1,96,700 |
| | | | 7,37,100 |
| Less: | Factory overheads under absorbed | 84,800 | |
| | Interest paid on bank borrowings | 50,000 | |
| | Losses on sale of fixed assets and investments | 48,000 | |
| | Donations and subscriptions | 18,800 | |
| | Over-valuation of closing stock of finished goods in cost accounts | 1,25,000 | |
| | Income tax | 1,50,000 | (4,76,600) |
| | **Profit as per Financial Records** | | **2,60,500** |

**(ii) Circumstances where reconciliation statement can be avoided:** When the Cost and Financial Accounts are integrated - there is no need to have a separate reconciliation statement between the two sets of accounts. Integration means that the same set of accounts fulfil the requirement of both i.e., Cost and Financial Accounts.
#### Approach
Start from the costing profit and ask of each item whether it makes the financial profit higher or lower than the costing profit: add the first kind, deduct the second.

---
item: q4a
qno: 4
part: (a)
marks: 8
type: descriptive
tags: cma.proc.accounts
difficulty: hard
q: 15-16
a: 16-18
note: ICAI's text layer runs "3/4th" (a superscript th) into "of"; written "3/4th of". In the Process Q account ICAI prints the production overheads as "180,000" (for 1,80,000); transcribed as printed. ICAI's Process P account sets "By Process Q" in the "To Wages" row and its working "(9,200 × 3/4)", units and amount in the next row; the rows are kept as printed. One empty row in ICAI's Costing Profit & Loss Account is left out.
---
#### Question
Meta Company Ltd. is engaged in the production of product ‘Trio' which passes through two different processes Process P and Process Q. Other information obtained from books of account for the year is as follows:

| Particulars | Process P | Process Q |
|---|---:|---:|
| Raw material used | 10,000 | --- |
| Raw material cost per unit | ₹ 80 | --- |
| Direct wages | ₹ 52,000 | ₹ 78,000 |
| Direct Expenses | ₹ 8,600 | ₹ 11,100 |
| Selling price per unit of output | ₹ 130 | ₹ 190 |

Production overheads of ₹ 3,00,000 are recovered as percentage of direct wages.

Actual output of the two processes was:

P-9,200 units and Q-6,400 units. 3/4th of the output of Process P was passed on to the Process Q and the balance was sold. The entire output of process Q was sold.

Management & Selling expenses during the year were ₹ 1,70,000.

These are not allocable to the processes.

The normal loss of the two processes, calculated on the input of every process was:

Process P- 6% and Process Q-10%

The Loss of Process P was sold at ₹ 5 per unit and that of Q at ₹ 8 per unit. Assume that Process P and Process Q are not the responsibility centres.

You are required to prepare:

(i) Process P Account

(ii) Process Q Account

(iii) Abnormal Loss and Abnormal Gain Account

(iv) Costing Profit & Loss Account.
#### Answer
**Process- P Account**

| Particulars | Units | Amount (₹) | Particulars | Units | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Material | 10,000 | 8,00,000 | By Normal Loss | 600 | 3,000 |
| To Wages | | 52,000 | By Process Q | | |
| To Direct Exp. | | 8,600 | (9,200 × 3/4) | 6,900 | 7,17,600 |
| To Production Overheads (3,00,000 × 2/5) | | 1,20,000 | By Costing Profit and Loss (P&L) (9,200 × 1/4) | 2,300 | 2,39,200 |
| | | | By Abnormal Loss | 200 | 20,800 |
| | 10,000 | 9,80,600 | | 10,000 | 9,80,600 |

Cost per unit = $\dfrac{9{,}80{,}600-3{,}000}{10{,}000-600}$ = ₹ 104 per unit

**Process- Q Account**

| Particulars | Units | Amount (₹) | Particulars | Units | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Process P | 6,900 | 7,17,600 | By Normal Loss | 690 | 5,520 |
| To Wages | | 78,000 | | | |
| To Direct Exp. | | 11,100 | By Costing P&L | 6,400 | 10,11,200 |
| To Production Overheads (3,00,000 × 3/5) | | 180,000 | | | |
| To Abnormal Gain | 190 | 30,020 | | | |
| | 7,090 | 10,16,720 | | 7,090 | 10,16,720 |

Cost per unit = $\dfrac{9{,}86{,}700-5{,}520}{6900-690}$ = ₹158 per unit

**Abnormal Loss Account**

| Particulars | Units | Amount (₹) | Particulars | Units | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Process- P | 200 | 20,800 | By Bank | 200 | 1,000 |
| | | | By Costing P&L | | 19,800 |
| | 200 | 20,800 | | 200 | 20,800 |

**Abnormal Gain Account**

| Particulars | Units | Amount (₹) | Particulars | Units | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Normal Loss | 190 | 1,520 | By Process Q | 190 | 30,020 |
| To Costing Profit and Loss | | 28,500 | | | |
| | 190 | 30,020 | | 190 | 30,020 |

**Costing Profit & Loss Account for the year**

**Dr.** **Cr.**

| Particulars | Amount (₹) | Particulars | Amount (₹) |
|---|---:|---|---:|
| To Cost of Sales<br>P - 2,39,200<br>Q - 10,11,200 | 12,50,400 | By Sales<br>P 2300 @ 130<br>Q 6400 @ 190 | 15,15,000 |
| To Abnormal Loss | 19,800 | By Abnormal Gain | 28,500 |
| To Selling Expense | 1,70,000 | | |
| To Net Profit | 1,03,300 | | |
| | 15,43,500 | | 15,43,500 |
#### Approach
Production overheads go to the processes in the ratio of their direct wages (52,000 : 78,000). Normal loss is on each process's input; compare actual output with normal output to find an abnormal loss or gain.

---
item: q4b
qno: 4
part: (b)
marks: 6
type: descriptive
tags: cma.oh.underover
difficulty: medium
q: 16
a: 18-20
note: The question's company is "ABC Ltd." in its rate sentence only, as ICAI prints it. ICAI's apportionment table prints "₹ 2,56" for ₹ 2.56 in the cost of sales line; transcribed as printed.
---
#### Question
The cost variance report was being discussed at a review meeting where in Cost Accountant of the company reported under-absorption of production overheads.

The following information was available from the cost records of the company at the end of financial year 2023-24:

- Actual production overheads incurred were ₹ 4,50,000 which included ₹ 42,000 on account of 'written off obsolete stores.
- 18,000 units were produced during the year out of which 10,000 units were sold and 8,000 units of finished goods were in stock.
- There were also 5,000 units in progress which may be reckoned as 40% complete.
- The actual machine hours worked during the period were 43,000.

ABC Ltd. absorbs the production overheads at a predetermined rate of ₹ 8 per machine hour.

On investigation, it has been found that 20% of the under-absorption of production overheads was due to defective planning and the rest was attributable to normal increase in costs of indirect materials and indirect labour.

You are required to:

(i) Calculate the amount of under-absorption of production overheads during the year 2023-24; and

(ii) Show the treatment of under-absorption of production overheads in cost accounts.
#### Answer
**(i) Amount of under-absorption of production overheads during the current year**

| | (₹) |
|---|---:|
| Total production overheads actually incurred during the current year | 4,50,000 |
| Less : ‘Written off’ obsolete stores | 42,000 |
| Net production overheads actually incurred : **(A)** | 4,08,000 |
| Production overheads absorbed by 43,000 machine hours@ ₹ 8 per hour : **(B)** | 3,44,000 |
| Amount of under – absorption of production overheads : **[(A) – (B)]** | **64,000** |

**(ii) Accounting treatment of under absorption of production overheads**

It is given in the statement of the question that 18,000 units were produced, and 5,000 units were 40% complete, 20% of the under-absorbed overheads were due to defective planning and the rest were attributable to normal increase in costs of indirect materials and indirect labour.

| | | |
|---|---|---:|
| 1. | (20 % of ₹ 64,000) i.e., ₹ 12,800 of under-absorbed overheads were due to defective planning. This being abnormal, should be debited to the Costing Profit and Loss A/c. | ₹ 12,800 |
| 2. | Balance (80% of ₹ 64,000) i.e., ₹ 51,200 of under-absorbed overheads should be distributed over work-in-progress, finished goods and cost of sales by using supplementary rate. | ₹ 51,200 |
| | Total under-absorbed overheads | ₹ 64,000 |

Apportionment of unabsorbed overheads of ₹ 51,200 over, work-in progress, finished goods and cost of sales

| | Equivalent Completed Units | (₹) |
|---|---:|---:|
| Work-in-Progress | | |
| (5,000 units × 40%×₹ 2.56) | 2,000 | 5,120 |
| (Refer to working note) | | |
| Finished goods | | |
| (8,000 units × ₹ 2.56) | 8,000 | 20,480 |
| Cost of sales | | |
| (10,000 units × ₹ 2,56) | 10,000 | 25,600 |
| | 20,000 | 51,200 |

**Working Note**

Supplementary rate per unit = $\dfrac{51{,}200}{20{,}000}$ = ₹ 2.56
#### Approach
Obsolete stores written off are not a production overhead; take them out before comparing with the overheads absorbed. The abnormal part of the under-absorption goes to Costing P&L, the normal part is spread over equivalent units.

---
item: q5a
qno: 5
part: (a)
marks: 6
type: descriptive
tags: cma.emp.turnover
difficulty: medium
q: 20
a: 21-22
---
#### Question
Super Ltd, a manufacturing company is facing the problem of high labour turnover in the factory. Before analysing the causes and taking remedial steps, the management of the company wants to ascertain the profit lost for the year 2022-23 on account of labour turnover. For this purpose, it has given you the following information:

(i) Sales for the last year 2022-23 was ₹ 2,16,80,000 and P/V ratio was 15%.

(ii) The total number of actual hours worked by the direct labour force was 5,00,000 hours. The actual direct labour hours included 60,000 hours attributable to training new recruits, out of which 40% of the hours were unproductive.

(iii) Due to delays by the Personnel Department in filling vacancies on account of labour turnover, 95,000 potential productive hours (excluding unproductive training hours) were lost.

(iv) 1,500 units of the output produced during training period were defective. Cost of rectification of defective units was ₹ 40 per unit.

(v) Settlement cost of the workers leaving the organization was ₹ 2,37,880.

(vi) Recruitment and Selection cost was ₹ 1,40,000.

(vii) Cost of Training and Induction was ₹ 1,61,950.

Assuming that the potential production lost as a consequence of labour turnover could have been sold at prevailing prices, find the profit lost for the year 2022-23 on account of labour turnover.
#### Answer
**Workings:**

**(i) Computation of productive hours**

| | |
|---|---:|
| Actual hours worked (given) | 5,00,000 |
| Less: Unproductive training hours | 24,000 |
| Actual productive hours | 4,76,000 |

**(ii) Productive hours lost:**

Loss of potential productive hours+ Unproductive training hours

= 95,000 + 24,000 = 1,19,000 hours

**(iii) Loss of contribution due to unproductive hours :**

= $\dfrac{\text{Sales value}}{\text{Actual productive hours}}$ ×Total unproductive hours

= $\dfrac{₹ 2{,}16{,}80{,}000}{4{,}76{,}000 \text{ hrs}}$ × 1,19,000 hours= ₹ 54,20,000

Contribution lost for 1,19,000 hours= ₹ 54,20,000 x 15% = ₹8,13,000

**Computation of profit forgone on account of employee turnover**

| | (₹) |
|---|---:|
| Contribution foregone (as calculated above) | 8,13,000 |
| Settlement cost due to leaving | 2,37,880 |
| Recruitment and Selection cost | 1,40,000 |
| Training and Induction costs | 1,61,950 |
| Cost of Rectification (1500 units x ₹40) | 60,000 |
| **Profit foregone** | **14,12,830** |

**The above question can also be solved in alternative way after taking proper assumptions**

**Workings:**

**(i) Computation of productive hours**

| | |
|---|---:|
| Actual hours worked (given) | 5,00,000 |
| Less: Unproductive training hours | 24,000 |
| Actual productive hours | 4,76,000 |

**(ii) Productive hours lost:**

Loss of potential productive hours

= 95,000 hours

**(iii) Loss of contribution due to unproductive hours :**

= $\dfrac{\text{Sales value}}{\text{Actual productive hours}}$ ×Total unproductive hours

= $\dfrac{₹ 2{,}16{,}80{,}000}{4{,}76{,}000 \text{ hrs}}$ × 95,000 hours = ₹ 43,26,891

Contribution lost for 95,000 hours= ₹ 43,26,891 x 15%

= ₹ 6,49,034(approx.)

**Computation of profit forgone on account of employee turnover**

| | (₹) |
|---|---:|
| Contribution foregone (as calculated above) | 6,49,034 |
| Settlement cost due to leaving | 2,37,880 |
| Recruitment and Selection cost | 1,40,000 |
| Training and Induction costs | 1,61,950 |
| Cost of Rectification (1500 units x ₹40) | 60,000 |
| **Profit foregone** | **12,48,864** |
#### Approach
Value the lost hours at the contribution they would have earned (sales per productive hour × P/V ratio), then add the costs that turnover itself caused.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: medium
q: 20-21
a: 23-24
note: ICAI's table heads its third column "Profit (Loss ( ₹)" (the scan prints "Profit/(Loss) (₹)"); ICAI's answer writes the change in profit once as "15,00,00", labels its answer to requirement (ii) as "(iii)" and, in its alternative, numbers it "(i)"; all transcribed as printed.
---
#### Question
The following information is given by PQR Ltd:

| Year | Sales (₹) | Profit (Loss ( ₹) |
|---|---:|---:|
| 2022-23 | 1,80,00,000 | (3,80,000) |
| 2023-24 | 2,40,00,000 | 11,20,000 |

You are required to:

(i) Calculate the Break even sales.

(ii) In 2024-25, it is estimated that the variable cost will go up by 5% and fixed cost will reduce by ₹ 4,80,000. Selling price will remain same. Calculate the sales volume to earn a profit of ₹ 15,00,000.
#### Answer
**(i)** Break-even sales = $\dfrac{\text{Fixed Cost}}{\text{P/V Ratio}}$

P/V Ratio = $\dfrac{\text{Change in Profit}}{\text{Change in Sales}}$ ×100 or, $\dfrac{15{,}00{,}000}{2{,}40{,}00{,}000-1{,}80{,}00{,}000}$ ×100

Or, $\dfrac{15{,}00{,}00}{60{,}00{,}000}$ ×100 or, 25%

Fixed Cost = Contribution – Profit

= ₹ 2,40,00,000 × 25% - ₹ 11,20,000

= ₹ 60,00,000 – ₹ 11,20,000 = ₹ 48,80,000

Break-even sales = $\dfrac{48{,}80{,}000}{25\%}$= ₹ 1,95,20,000

**(iii)** Desired Contribution in 2024-25 = Revised Fixed Cost + Target Profit

= (₹ 48,80,000- ₹ 4,80,000) + ₹ 15,00,000

= ₹ 59,00,000

Earlier P/V ratio = 25%. So Variable Cost ratio =75%.

Selling price remain the same.

Variable cost increased by 5% i.e. Variable Cost ratio will be 78.75% (75+5%of 75).

Now revised P/V ratio=21.25%

Sales Volume in 2024-25=$\dfrac{59{,}00{,}000}{21.25\%}$ = ₹ 2,77,64,706(approx.)

**If it is assumed that variable cost will go up by 5% on total. So, it will be increased from 75% to 80% and solution can be done in following way:**

(i) Desired Contribution in 2024-25 = Revised Fixed Cost + Target Profit

= (₹ 48,80,000-₹ 4,80,000) + ₹ 15,00,000

= ₹ 59,00,000

Earlier P/V ratio = 25%. So Variable Cost ratio =75%.

Selling price remain the same.

Variable cost increased by 5% i.e. Variable Cost ratio will be 80% (75%+5%).

Now revised P/V ratio=20%

Sales Volume in 2024-25==$\dfrac{59{,}00{,}000}{20\%}$ = ₹ 2,95,00,000
#### Approach
The P/V ratio is the change in profit over the change in sales between the two years; fixed cost then follows from either year's contribution less its profit.

---
item: q5c
qno: 5
part: (c)
marks: 4
type: descriptive
tags: cma.bud.ratios, cma.bud.basics
difficulty: easy
q: 21
a: 24
note: ICAI's answer spells "organistions" and "todays"; transcribed as printed.
---
#### Question
Discuss Feedback Control and Feedforward Control system of budgetary control.
#### Answer
There are two types of budgetary control system based on timing of action:

**Feedback Control:** The feedback system of budgetary control, the actual results for the budgeted period are collected and compared with the budgeted figures. The exercise of variance identification is done after the completion of the budget period. The variances are reported and based on the report corrective actions are taken, responsibility is fixed and based on experience, modification in future targets is implemented. As the name suggests, it is an Ex-post Corrective control system of budget.

This system of budgetary control is common in organistions where Management Information System (MIS) is not so robust and where data is obtained only after the finalisation of books of account. Though this type of control system is less expensive to maintain but has limitations.

**Feedforward Control:** This the opposite of feedback control system of budgetary control. It is Ex-Ante Preventive control mechanism of budgetary control. The budgets are set at the inception of the budgeted period and the actual results are continuously monitored and compared. The targets are kept realistic as far as possible and the targets are reviewed and reset if necessary.

This budgetary control system requires a robust MIS supported by integrated ERP system enabling an entity to get data as and when desired basis. This system is very expensive and beneficial for the organisations where the business environment is dynamic and information has important role in getting edge in competition and todays data warfare.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.intro.control
difficulty: easy
q: 24
a: 25
---
#### Question
Distinguish between cost control and cost reduction.
#### Answer
| Cost Control | Cost Reduction |
|---|---|
| 1. Cost control aims at maintaining the costs in accordance with the established standards. | 1. Cost reduction is concerned with reducing costs. It challenges all standards and endeavours to improvise them continuously |
| 2. Cost control seeks to attain lowest possible cost under existing conditions. | 2. Cost reduction recognises no condition as permanent, since a change will result in lower cost. |
| 3. In case of cost control, emphasis is on past and present | 3. In case of cost reduction, it is on present and future. |
| 4. Cost control is a preventive function | 4. Cost reduction is a corrective function. It operates even when an efficient cost control system exists. |
| 5. Cost control ends when targets are achieved. | 5. Cost reduction has no visible end and is a continuous process. |

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.mat.losses
difficulty: easy
q: 24
a: 26
---
#### Question
Distinguish between Waste and Scrap. Discuss the treatment of normal and abnormal scrap in Cost Accounts.
#### Answer
**Difference between Waste and Scrap**

| Waste | Scrap |
|---|---|
| 1. The portion of raw material which is lost during storage/ production and discarded. | 1. The output which is discarded and disposed off without further treatment. |
| 2. It is connected with raw material or inputs to the production process. | 2. It is the loss connected with the output |
| 3. Waste of materials may be visible or invisible. | 3. Scraps are generally identifiable and has physical substance. |
| 4. Generally, waste has no recoverable value. | 4. Scraps are termed as by-products and has small recoverable value. |

**Treatment of Scrap**

**Normal-** The cost of scrap is borne by good units and income arises on account of realisable value is deducted from the cost.

**Abnormal-** The scrap account should be charged with full cost. The credit is given to the job or process concerned. The profit or loss in the scrap account, on realisation, will be transferred to the Costing Profit and Loss Account.

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.unit.unit, cma.unit.batch
difficulty: easy
q: 25
a: 26-27
---
#### Question
Describe Unit Costing and Batch Costing. Give three examples of industries for each method where these are used.
#### Answer
Unit costing is that method of costing where the output produced is identical and each unit of output requires identical cost. Under this method costs, are collected and analysed element wise and then total cost per unit is ascertained by dividing the total cost with the number of units produced. Such a method of costing is used in the industries like paper, cement, steel works, mining, breweries etc.

Batch Costing: Batch Costing is a type of specific order costing where articles are manufactured in predetermined lots, known as batch. Cost per unit in a batch is ascertained by dividing the total cost of a batch by the number of units produced in that batch.

Such a method of costing is used in the case of pharmaceutical or drug industries, readymade garment industries, industries, manufacturing electronic parts of T.V. radio sets etc.

---
item: q6c-or
qno: 6
part: (c)
alt: q6c
marks: 4
type: descriptive
tags: cma.emp.idle
difficulty: easy
q: 25
a: 27
note: ICAI prints this as an OR alternative to Q6(c). The Suggested Answers' reproduction of the question labels it (d); the question-paper scan (p.12) and ICAI's answer label it (c). Its 4 marks are printed beside it in the scan.
---
#### Question
Describe briefly idle time and explain the treatment of idle time in cost accounts in following situations:

(i) The setting up time for the machine in case of Direct Worker Mr. A.

(ii) Normal break time for lunch in case of Indirect Worker Mr. B.

(iii) Time lost due to breakdown of machine in case of Worker Mr. C.
#### Answer
The time during which no production is carried-out because the worker remains idle but are paid. In other words, it is the difference between the time paid and the time booked. Idle time can be normal or abnormal.

| Situation | Idle Time | Treatment |
|---|---|---|
| The setting up time for the machine in case of Direct Worker Mr. A | Normal idle time | It is treated as a part of cost of production. It is to be considered while setting of standard hours or standard rate. |
| Normal rest time, break time for lunch in case of Indirect Worker Mr. B | Normal idle time | It is to be considered for the computation of overhead rate. |
| Time lost due to break-down of machines in case of Worker Mr. C | Abnormal idle time | It is to be shown as a separate item in the Costing Profit and Loss Account. |
