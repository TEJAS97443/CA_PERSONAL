<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-pyq-sep2026
paper: p4
kind: pyq
attempt: sep2026
qfile: new/p4/pyq-sep2026-q.pdf
answers: unpublished
choice: q1; any 4 of q2-q6
status: checked
by: tx-02
date: 2026-10-20
q: 2, 10
accept: 1, 2, 2, 2, 2, 3, 4, 5, 7, 7, 7, 7, 7, 8, 9, 11, 2,61,400, 22,61,400, 9,12,000, 29,12,000
note: Transcribed from ICAI's question-paper booklet (booklet code TWM(H)), a scan with no text layer: every page was read from its rendered image (seg.py --png); check.py compares the numbers with the Apple Vision OCR text kept next to the PDF. ICAI's Suggested Answers for September 2026 are not published yet (2026-10-20): answers: unpublished and every MCQ key: unpublished; add afile, the answers and the keys when ICAI publishes them. ICAI prints each question's marks as a bare number in the right margin (no "(N Marks)" notes). Q1(b), Q4(b) and Q5(b) print separate marks for each requirement, so each requirement is an item under a shared case (their requirements are separately answerable); Q6(b)(i)-(iii) are separate questions. ICAI prints the 4 marks of Q6(c) once, beside the first (c); the OR (c) is its alternative for the same marks. p.1 (general instructions on the cover) and p.24 (the first Hindi-medium page) are not transcribed. Numbers accepted in check.py (every one read on the page image): the bare margin marks 1, 2, 3, 4, 5, 7 and 9 (up to four 2s and three 7s in one page group); OCR misreadings of the scan: the rupee sign read as 2 (OCR 22,61,400 and 29,12,000 for ICAI's ₹ 2,61,400 of MCQ 1 (A) and ₹ 9,12,000 of MCQ 5 (B)) and as 7 (before ₹ 8,40,000 on p.14 and ₹ 9,000 on p.15); 'Case Scenario – II' read as 11 and MCQ 11's number read as 'I1'; question numbers the OCR dropped (Part II Q1 on p.10, Q5 on p.19, MCQ 8 on p.6) and Day 1 of MCQ 13's table; the page number (12) read as '12)'.
---
#### Instructions
**PART – I 30 Marks**

**(MCQ Portion)**

- Answers to MCQs are to be marked on the OMR answer sheet as given on the cover page of the descriptive answer book only. Answer to MCQs, if written inside the descriptive answer book shall not be evaluated.
- Please write and darken correct Question paper booklet number in the OMR answer sheet. The correct Question paper booklet number must also be written in the attendance register.

**PART – II 70 Marks**

**(Descriptive Portion)**

**(Candidates are required to give descriptive answers for this part inside the answer book)**

1. Question paper comprises 6 questions. Answer Question No. 1 which is compulsory and any 4 out of the remaining 5 questions.
2. Working notes should form part of the answer.
3. Answers to the questions are to be given only in English except in the case of candidates who have opted for Hindi Medium. If a candidate has not opted for Hindi Medium, his/her answers in Hindi will not be evaluated.
4. Candidates are required to write the question number legibly.

---
case: c1
qno: 1-5
label: Case Scenario – I
q: 2-3
---
#### Case
GNPL is a food processing company specializing in agricultural products. It purchases produce directly from farmers and makes packaged food products. GNPL is interested in understanding the profitability of its products based on customer type. Three main customer categories have been identified by the Marketing Department: Distributors, Supermarkets and Online Customers. The following information relates to the year just ended :

**Table – I**

| Activity | Customer level operating cost (₹) | Cost Driver |
|---|---:|---|
| Product handling | 10,08,000 | Quantity sold (kgs) |
| Processing of customer orders | 20,80,000 | Number of sales orders |
| Cost of Transportation to customer | 59,20,000 | Kilometres travelled |
| Customer Visits | 19,20,000 | Number of customer visits |

**Table – II**

| | Distributors | Supermarkets | Online |
|---|---:|---:|---:|
| Quantity Sold (kg) | 1,25,000 | 65,000 | 62,000 |
| No. of sales orders | 42 | 238 | 370 |
| Kilometres travelled | 8,975 | 8,800 | 5,350 |
| No. of customer visits | 35 | 179 | 86 |
| Listed Selling price (₹ per kg) | 660 | 660 | 660 |
| Discount | 10% | 15% | 20% |
| Cost of goods sold (excluding customer level operating cost) (₹ per kg) | 460 | 460 | 460 |

On the basis of the above Case Scenario, you are required to answer the following MCQs **1 to 5** :

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: unpublished
tags: cma.abc.compute, cma.abc.concept
difficulty: easy
q: 3
---
#### Question
What is the cost of customer visits incurred on customer category ‘Distributors’ ?
#### Options
(A) ₹ 2,61,400
(B) ₹ 2,14,600
(C) ₹ 2,24,000
(D) ₹ 2,42,000
#### Approach
Turn each activity's cost into a rate per unit of its cost driver (cost ÷ total driver volume across the three categories), then charge each category for the driver volume it uses.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: unpublished
tags: cma.abc.compute
difficulty: easy
q: 3
---
#### Question
What is the cost of transport for ‘Online’ customer category ?
#### Options
(A) ₹ 13,69,600
(B) ₹ 13,74,400
(C) ₹ 13,55,600
(D) ₹ 13,84,400

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: unpublished
tags: cma.abc.compute
difficulty: medium
q: 4
---
#### Question
What is the cost of activities (tabulated in Table – I) as a percentage of the sales revenue net of discount for ‘Supermarkets’ category ?
#### Options
(A) 12.12%
(B) 10.30%
(C) 9.19%
(D) 8.65%
#### Approach
Add the four activity charges for Supermarkets, and divide by its revenue after the discount (quantity × listed price × (1 – discount)).

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: unpublished
tags: cma.abc.compute
difficulty: medium
q: 4
---
#### Question
What is the total customer-level operating cost of all activities for ‘Distributors’ category ?
#### Options
(A) ₹ 32,65,000
(B) ₹ 31,56,000
(C) ₹ 30,25,000
(D) ₹ 29,95,000

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: unpublished
tags: cma.abc.compute
difficulty: medium
q: 4
---
#### Question
What is the customer level operating income for ‘Online’ Category ?
#### Options
(A) ₹ 8,64,000
(B) ₹ 9,12,000
(C) ₹ 12,25,000
(D) ₹ 12,65,000
#### Approach
Net revenue after discount, less cost of goods sold, less the category's share of all four activity costs.

---
case: c2
qno: 6-10
label: Case Scenario – II
q: 5-6
---
#### Case
ABCD Ltd. manufactures two types of products - WM for women and KD for children. These are sold in containers of one kg each. Raw materials W and M are used for product WM and raw materials K and D are used for product KD. There is no process loss or scrap unit. During the second quarter (July to September 2026), the company expects a market demand of 262 containers of WM and 190 containers of KD. The following additional information is given :

| Raw Material | Product WM % of Raw Material | Product KD % of Raw Material | Cost per kg (₹) |
|---|---:|---:|---:|
| W | 75% | – | 225 |
| M | 25% | – | 440 |
| K | – | 40% | 315 |
| D | – | 60% | 380 |

| Stock | Actual Quantity as on 01-07-2026 | Budgeted Quantity as on 30-09-2026 |
|---|---:|---:|
| W (kgs) | 22 | 16 |
| M (kgs) | 07 | 13 |
| K (kgs) | 24 | 21 |
| D (kgs) | 34 | 32 |
| WM (containers) | 20 | 18 |
| KD (containers) | 38 | 28 |

On the basis of the above Case Scenario, you are required to answer the following MCQs : **(6 to 10)**

---
item: m6
case: c2
qno: 6
marks: 2
type: mcq
key: unpublished
tags: cma.bud.functional
difficulty: easy
q: 6
---
#### Question
How many containers of KD will be produced in the quarter according to the production budget ?
#### Options
(A) 190
(B) 218
(C) 180
(D) 200
#### Approach
Production = sales + closing stock of finished containers – opening stock of finished containers.

---
item: m7
case: c2
qno: 7
marks: 2
type: mcq
key: unpublished
tags: cma.bud.functional
difficulty: easy
q: 6
---
#### Question
How many kilograms of raw material M will be consumed as per raw material budget ?
#### Options
(A) 195 kgs
(B) 65 kgs
(C) 65.5 kgs
(D) 78 kgs
#### Approach
Consumption follows production (not sales): budgeted WM production × M's share of each one-kg container.

---
item: m8
case: c2
qno: 8
marks: 2
type: mcq
key: unpublished
tags: cma.bud.functional
difficulty: medium
q: 6
---
#### Question
How many kilograms of raw material K will be purchased as per raw material budget ?
#### Options
(A) 64 kgs
(B) 69 kgs
(C) 61 kgs
(D) 93 kgs
#### Approach
Purchases = consumption + closing stock of the material – opening stock of the material; consumption comes from KD's production budget.

---
item: m9
case: c2
qno: 9
marks: 2
type: mcq
key: unpublished
tags: cma.bud.functional
difficulty: medium
q: 6
---
#### Question
What is the value of budgeted raw materials purchase (₹) during the quarter for WM ?
#### Options
(A) 65,112.50
(B) 72,807.50
(C) 72,475
(D) 73,765
#### Approach
Work out the purchase quantity of W and of M separately (consumption adjusted for their own stocks), then value each at its cost per kg and add.

---
item: m10
case: c2
qno: 10
marks: 2
type: mcq
key: unpublished
tags: cma.bud.functional
difficulty: easy
q: 7
---
#### Question
How many kilograms of WM will be the budgeted production in the quarter ?
#### Options
(A) 262 kgs
(B) 260 kgs
(C) 280 kgs
(D) 244 kgs

---
item: m11
qno: 11
marks: 2
type: mcq
key: unpublished
tags: cma.proc.eu
difficulty: medium
q: 7
---
#### Question
J Ltd. uses process costing and has the following information for the month of August 2026 :

| Particulars | Units |
|---|---:|
| Beginning work in progress, (WIP) August 1 | 8,000 |
| Started fresh units in production during August (besides opening WIP) | 50,000 |
| Completed production during August | 46,000 |
| Ending work in progress, August 31 | 12,000 |

The beginning work in progress was 60% complete for materials and 20% complete for conversion costs. The ending inventory was 80% complete for material and 40% complete for conversion costs. Using the FIFO method, what will be the equivalent units of production for conversion costs ?
#### Options
(A) 46,000 units
(B) 49,200 units
(C) 50,800 units
(D) 51,400 units
#### Approach
Under FIFO, split the completed units into the opening WIP finished this month (only its remaining conversion work counts) and units started and completed, then add the closing WIP at its conversion stage.

---
item: m12
qno: 12
marks: 2
type: mcq
key: unpublished
tags: cma.emp.incentives
difficulty: medium
q: 8
---
#### Question
In a factory, standard time for a job is 72 hours. The hourly-rate of wages is ₹ 60. Halsey Premium Plan is in operation at the factory. A worker completes the job at less than standard time and his effective hourly-rate wages was ₹ 75. How many hours did he actually take to complete the work ?
#### Options
(A) 60
(B) 72
(C) 48
(D) 64
#### Approach
Write Halsey earnings as time taken × rate + half of the time saved × rate, set it equal to the effective rate × time taken, and solve for the time taken.

---
item: m13
qno: 13
marks: 2
type: mcq
key: unpublished
tags: cma.mat.issues
difficulty: medium
q: 8
---
#### Question
The following information is available in respect of an item of inventory in a factory that uses FIFO (First In First Out) method of valuation of issues. The opening stock was 150 units @ ₹ 40 per unit. The following transactions have taken place :

| Day | Received Units (in Numbers) | Rate (₹) | Issued Units (in Numbers) |
|---|---:|---:|---:|
| 1 | 25 | 50 | – |
| 2 | 300 | 52 | – |
| 3 | – | – | 340 |
| 4 | 200 | 50 | – |
| 5 | – | – | 300 |
| 6 | 100 | 40 | – |

The value of material issued on Day 5 is ₹ :
#### Options
(A) 15,200
(B) 15,300
(C) 15,270
(D) 15,230
#### Approach
Run the FIFO layers in order: the Day 3 issue uses up the oldest lots first, so find which lots are left when the Day 5 issue is made.

---
item: m14
qno: 14
marks: 2
type: mcq
key: unpublished
tags: cma.emp.idle
difficulty: easy
q: 9
---
#### Question
A company sells handcrafted labour-intensive gift items. A certain urgent order at a fixed selling price entailed 200 overtime hours. The overtime premium per hour was ₹ 300. Of these hours, 150 were due to extra work above capacity, whereas 50 hours were due to rework that arose due to faulty material purchased and not inspected by the “Raw Materials” Section, a cost centre. What will be the appropriate treatment of overtime premium ?
#### Options
(A) The entire premium of ₹ 60,000 is charged to the urgent order.
(B) Premium of ₹ 45,000 is charged to the order and ₹ 15,000 is charged to the Materials Section.
(C) ₹ 60,000 is charged to the Costing P and L A/c.
(D) ₹ 60,000 is treated as material cost and added to cost of defective material.
#### Approach
Split the overtime hours by their cause before deciding where each part of the premium is charged.

---
item: m15
qno: 15
marks: 2
type: mcq
key: unpublished
tags: cma.oh.absorb
difficulty: medium
q: 9
---
#### Question
A factory has installed a new machine which has a brochure claiming that it can produce 60,000 units of product X per annum. However, the company estimates that due to Sundays and holidays, stock taking and minor repairs, production can be achieved only to the extent of 50,000 units. Further, time lost on batch change will reduce this to 40,000 units. Which of the following is not correct ?
#### Options
(A) Normal Capacity is 40,000 units.
(B) Installed Capacity is 60,000 units.
(C) Practical Capacity is not 60,000 units.
(D) Normal Idle Capacity is 10,000 units.
#### Approach
Recall what installed, practical and normal capacity each leave out, and what normal idle capacity measures; then test each option against those definitions.

---
item: q1a
qno: 1
part: (a)
marks: 7
type: descriptive
tags: cma.mc.keyfactor, cma.mc.decisions
difficulty: medium
q: 10-11
---
#### Question
A company manufactures two products – DSP and EM. It has adopted marginal costing for managerial decision-making and has provided the following information for the coming year :

| | DSP | EM | Remarks |
|---|---:|---:|---|
| Selling Price per unit (₹) | 15,000 | 10,000 | – |
| Variable costs per unit (₹) | 9,000 | 4,600 | – |
| Maximum Demand for the year (in units) | 700 | 720 | Any quantity at or below this limit can be readily sold in the market. |
| Maximum Production Capacity | – | – | 770 units of DSP and EM put together (any one or both can be produced but the overall limit is 770 units). |
| Fixed Expenses (₹) | 6,00,000 | – | Incurred only if DSP is manufactured. |
| | – | 2,16,000 | Incurred only if EM is manufactured. |
| Other Fixed expenses (excluding the above) | – | – | ₹ 18,00,000 incurred whether any product is made or not. |

Assume no inventory is built up. Whatever is produced is sold. The company can choose to make any of the products or both the products without affecting its future prospects.

**Requirement :**

Calculate the optimum profit for the year in rupees giving the product mix (in units).

(Present only relevant figures. Detailed statements are not required.)
#### Approach
Capacity in units is the key factor, so rank the products by contribution per unit; then test the mixes (one product only, or both) because each product's specific fixed cost is saved only if it is not made.

---
case: c3
qno: 1
q: 11-12
---
#### Case
Ultramagic Ltd. manufactures a product TM for tourist recreational purposes. As per the estimates provided by the tourism industry, there will be a market demand of 12,500 units of TM in the coming year. Ultramagic Ltd. is expected to have a market share of 16% of the total market demand of TM.

The company produces one unit of TM from one unit of raw material RW which is purchased at ₹ 2,500 per unit.

Other Information :

| | |
|---|---|
| Order cost per order | ₹ 4,000 |
| Storage rate | 9% per annum |
| Interest rate | 5% per annum |
| Obsolescence rate | 2% per annum |

**Required :**

---
item: q1b-i
case: c3
qno: 1
part: (b)(i)
marks: 2
type: descriptive
tags: cma.mat.eoq
difficulty: easy
q: 12
---
#### Question
Compute the Economic Order Quantity (EOQ).
#### Approach
Annual requirement is the company's share of market demand; the carrying cost per unit adds up the storage, interest and obsolescence rates applied to the purchase price.

---
item: q1b-ii
case: c3
qno: 1
part: (b)(ii)
marks: 2
type: descriptive
tags: cma.mat.eoq
difficulty: easy
q: 12
---
#### Question
Compute the corresponding ordering cost per annum.

---
item: q1c
qno: 1
part: (c)
marks: 3
type: descriptive
tags: cma.oh.secondary
difficulty: easy
q: 12
---
#### Question
Textiles Manufacturing Co. has two production departments : Fibers (FIB) and Fabrics (FAB) and two service departments – FC and DD which also render services to each other.

The following information is given :

Service Departments’ expenses before allocation :

| | Amount (₹) |
|---|---:|
| FC | 3,00,000 |
| DD | 1,20,000 |

Usage of Services :

| | Fibers (FIB) | Fabrics (FAB) | FC | DD |
|---|---:|---:|---:|---:|
| FC | 40% | 40% | - | 20% |
| DD | 40% | 30% | 30% | - |

Use simultaneous equation method and find out the total expenses of FC.
#### Approach
Let the totals of FC and DD be two unknowns: each equals its own expenses plus its share of the other's total; solve the pair of equations.

---
item: q2a
qno: 2
part: (a)
marks: 7
type: descriptive
tags: cma.bud.functional, cma.emp.idle
difficulty: hard
q: 12-13
---
#### Question
Vivida Ltd. manufactures two products – Ace eyeglasses & Sharp eyeglasses using various types of materials and one grade of labour – general optical technicians who cut lenses, drill frames and align hinges. Shown below is an extract from the company’s working papers for the next month’s budget :

| | Ace eyeglasses | Sharp eyeglasses |
|---|---:|---:|
| Budgeted sales (in units) | 1,100 | 2,200 |
| Standard labour hours allowed per unit of product at full productivity | 3 | 4.5 |

Labour is paid at ₹ 30 per hour. Overtime premium is 60% and is payable only if a worker works for more than 45 hours a week. There are 110 direct workers. Assume that they can work on either product equally efficiently. Efficiency during normal working hours may be taken to be the same as in overtime hours also.

The target productivity for the productive hours worked by the direct workers in actually manufacturing the products is 75%. In addition, the non-productive down-time is budgeted at 15% of the productive hours worked.

There are four 5-day weeks in the budgeted period and it is anticipated that sales and production will occur evenly throughout the whole period. The following information is given :

| | Ace eyeglasses | Sharp eyeglasses |
|---|---|---|
| Opening Stock (units) | 125 | 140 |
| Closing Stock | 5 days’ sales | 4 days’ sales |

Calculate the Wages Budget for the direct workers, showing the quantities and values for the next month.
#### Approach
Build the production budget first (closing stock in days of sales over a twenty-day month), convert it to standard hours, gross up for the productivity target and the down-time, and only then compare the hours with the basic hours available to find the overtime.

---
item: q2b
qno: 2
part: (b)
marks: 7
type: descriptive
tags: cma.sheet.quote, cma.job.job
difficulty: medium
q: 14-15
---
#### Question
Arrow Precision Components Ltd. is a manufacturer of high-quality aerospace and defence parts. The following are the details of expenses incurred for the year ended 31st March, 2026 :

| Particulars | Amount (₹) |
|---|---:|
| (i) Opening Stock of Raw Materials | 28,50,000 |
| (ii) Closing Stock of Raw Materials | 32,75,000 |
| (iii) Purchase of Raw Materials | 3,45,80,000 |
| (iv) Direct Labour | 1,68,40,000 |
| (v) Factory Overhead | 67,36,000 |
| (vi) Administrative Overhead | 42,10,000 |

During the financial year 2026-27, the company has received a special order from a leading aircraft manufacturer for the supply of one type of component manufactured by the company. The estimated cost of materials and direct labour for this order are 25% of last year’s actual consumption and ₹ 72,50,000 respectively. Assume no work-in-process for both the years.

The company follows the policy of charging Factory Overhead as a percentage of Direct Labour and Administrative Overhead as a percentage of Factory Cost based on the previous year’s actual costs. The cost of delivery and installation at the customer’s site is estimated at ₹ 8,40,000. The company wants to safely consider an additional 10% on the calculated estimates for material and labour. Overheads are also to be taken after considering this factor. The company will decide on the profit margin based on total costs considered as per its policy and market conditions.

**You are required to :**

Prepare a Job Cost Sheet for the order received and determine the total cost to be considered as per the company’s policy.

(Present figures in rupees.)

(Round off percentages to two decimal places and figures to the next rupee.)
#### Approach
Derive last year's material consumed, factory cost and the two overhead percentages first; then build the order's cost sheet on the estimates raised by the safety margin, and add delivery and installation at the end.

---
item: q3a
qno: 3
part: (a)
marks: 7
type: descriptive
tags: cma.sys.recon
difficulty: easy
q: 15-16
---
#### Question
During the finalisation of accounts for the period ended 31st August, 2026, the Management of M/s. ZPT Ltd. observed that the profit disclosed by the Cost Accounts differed from that shown by the Financial Accounts.

The following information was extracted from the books :

Profit as per Cost Accounts amounted to ₹ 9,80,000.

On investigation, the following items were identified :

(i) Factory overheads were under-absorbed in the Cost Accounts by ₹ 16,000.

(ii) Administration overheads were over-absorbed in the Cost Accounts by ₹ 9,000.

(iii) Depreciation charged in the Financial Accounts exceeded the depreciation recovered in the Cost Accounts by ₹ 18,000.

(iv) Interest on bank deposits amounted to ₹ 28,000.

(v) Provision for Income Tax was ₹ 1,60,000.

(vi) Profit on sale of investments amounted to ₹ 15,000.

(vii) Charges in lieu of rent for owned premises were ₹ 6,000.

(viii) Donation amounted to ₹ 10,000.

**Required :**

Prepare a Reconciliation Statement starting from the profit as per Cost Accounts and arrive at the profit as per Financial Accounts while maintaining the serial order given above for adjustments.

(Candidates may use shorter forms of the items instead of writing the whole lines as described in the question.)
#### Approach
Starting from the cost profit, ask of each item whether it makes the financial profit higher or lower than the cost profit; notional charges such as rent on owned premises appear only in the cost accounts.

---
item: q3b
qno: 3
part: (b)
marks: 7
type: descriptive
tags: cma.svc.transport
difficulty: medium
q: 16-17
---
#### Question
BH Transit Services Ltd. has been awarded a contract to operate a 72-kilometre intercity route using 8 deluxe buses during the next year. Each bus has a seating capacity of 60 passengers. The buses are expected to make 4 round trips per day, carrying on an average, 80% of their seating capacity. The buses will run for 26 days in a month. Assume that the buses operate as a point to point service with no stops intervening during a single trip of 72 kilometres.

The following information relates to the operating cost of the service :

Garage rent : ₹ 48,000 per month (Total for all buses)

Annual repairs and maintenance : ₹ 1,92,000 per bus

Total salaries of all drivers, conductors, cleaners and managers for the year (Total for all buses) ₹ 60,28,800

Road tax, permit fee, etc. : ₹ 48,000 for a quarter (Total for all buses)

Total Office expenses : ₹ 20,000 per month

Cost of diesel per litre : ₹ 108, Diesel Usage : 6 kilometres per litre

Annual depreciation and Insurance : 24% of cost

Engine oils and lubricants : ₹ 56,30,000 (Total for all buses for the whole year).

The cost of each bus is ₹ 60,00,000.

However, during the year, two buses are expected to be under major servicing for one month each and therefore those buses will run only for 11 months, while the remaining 6 buses will operate for the whole year.

The company targets a profit of one third of revenue.

Present the following figures :

(i) Kilometres run by all vehicles for the whole year.

(ii) Number of passengers in all the trips put together for the whole year for all the buses.

(iii) Diesel Cost in total for the whole year.

Calculate the one-way bus fare to be charged from each passenger, rounding off to the next higher rupee value.
#### Approach
Count bus-days first (six buses for twelve months, two for eleven), remembering that a round trip is two one-way trips; the fare is total cost grossed up so that profit is one third of revenue, divided by the passengers carried.

---
item: q4a
qno: 4
part: (a)
marks: 9
type: descriptive
tags: cma.std.labour
difficulty: hard
q: 17-18
---
#### Question
XYZ Ltd. employs workforce classified into Skilled, Semi-Skilled and Unskilled categories for its manufacture of precision-engineered automobile components.

In the month of August 2026, the Production Department completed the manufacture of 5000 units of Product X.

The following information is available :

Budgeted Labour Requirement for manufacturing **2** units of Product X.

| Labour Category | Standard Hours | Standard Rate (₹ per hour) |
|---|---:|---:|
| Skilled | 2 | 6 |
| Semi-skilled | 3 | 5 |
| Unskilled | 5 | 2 |

Actual Labour Details :

| Labour Category | Actual Hours paid (including abnormal idle hours) | Abnormal Idle time (hours) | Actual Rate (₹) | Amount (₹) |
|---|---:|---:|---:|---:|
| Skilled | 6,000 | 200 | 7 | 42,000 |
| Semi-skilled | 8,000 | 300 | 4.5 | 36,000 |
| Unskilled | 11,000 | 400 | 2.5 | 27,500 |
| **Total** | **25,000** | **900** | | **1,05,500** |

**Required :**

Compute category wise labour cost variances analysed into mix, efficiency, yield and rate variances, indicating whether they are Adverse (A) or Favourable (F).
#### Approach
The standard is for two units, so scale it to the actual output first; mix and yield work on hours actually worked (paid hours less abnormal idle time), and the rate variance on hours paid.

---
case: c4
qno: 4
q: 18-19
---
#### Case
New Pharma Chemicals Ltd. manufactures pharmaceutical-grade solvents for the drug formulation industry. Production passes through a series of processes and the company operates a FIFO process costing system to value work-in-process and finished goods.

The following information is given :

- Opening work-in-process at the beginning of the month was 800 litres which was 70% complete for labour and 60% complete for overheads.
- Closing work-in-process at the end of the month was 160 litres which was 30% complete for labour and 20% complete for overheads.
- Normal loss is 10% of input; total losses during the month were 1,800 litres, partly attributable to flood damage. Abnormal losses occurred in the production shop floor just before despatch to the warehouse.
- Output transferred to the finished goods warehouse was 4,200 litres.
- All raw materials are introduced at the commencement of the process.

**Required :**

---
item: q4b-i
case: c4
qno: 4
part: (b)(i)
marks: 2
type: descriptive
tags: cma.proc.accounts
difficulty: easy
q: 19
---
#### Question
Calculate the quantity (in litres) of raw material input during the month.
#### Approach
Balance the litres: opening WIP plus input equals output transferred plus total losses plus closing WIP.

---
item: q4b-ii
case: c4
qno: 4
part: (b)(ii)
marks: 1
type: descriptive
tags: cma.proc.accounts
difficulty: easy
q: 19
---
#### Question
Calculate the quantity (in litres) of normal loss and abnormal loss.

---
item: q4b-iii
case: c4
qno: 4
part: (b)(iii)
marks: 2
type: descriptive
tags: cma.proc.eu, cma.proc.accounts
difficulty: medium
q: 19
---
#### Question
Calculate the equivalent units of labour and overheads completed in the process.
#### Approach
Under FIFO the opening WIP needs only its remaining labour and overhead work; abnormal loss arose just before despatch, so it counts as fully complete, while normal loss gets no equivalent units.

---
item: q5a
qno: 5
part: (a)
marks: 7
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
q: 19-20
---
#### Question
The following data is given in the books of Vikram Industries :

| Particulars | Amount (₹) |
|---|---:|
| Opening Inventories : | |
| - Raw materials | 15,00,000 |
| - Work-in-process | 20,00,000 |
| - Finished goods (12,000 units) | 10,80,000 |
| Closing Inventories : | |
| - Raw materials | 16,50,000 |
| - Work-in-process | 18,00,000 |
| Raw materials purchase | 1,68,00,000 |
| Wages paid to production workers | 40,00,000 |
| Expenses paid for utilities | 2,50,000 |
| Office and administrative expenses paid (General) | 30,00,000 |
| Travelling allowance paid to office staff | 1,50,000 |
| Selling expenses | 7,00,000 |
| Machine hours worked | 24,000 hours |
| Machine hour rate | ₹ 10 per hour |
| Units sold (on FIFO basis) | 1,80,000 units |
| Units produced | 2,10,000 units |
| Desired profit | 20% on sales |

Compute the values of the following figures in rupees as they will appear in the Cost Sheet :

(i) Prime Cost

(ii) Cost of Production

(iii) Cost of Goods Sold

(iv) Cost of Sales

(v) Sales Revenue

(You are not required to present the entire cost sheet. Present relevant figures only.)
#### Approach
Factory overheads come from the machine hours and the machine hour rate; the closing finished goods are valued at this period's cost of production per unit because sales are on FIFO.

---
case: c5
qno: 5
q: 21
---
#### Case
A manufacturing company operates three production departments and it has established a policy to allocate factory overheads using a single blanket rate calculated as total budgeted overheads divided by budgeted direct labour hours. Below are the relevant data for one month :

| Department | Budgeted | | | Actual | | | Job 1023 | |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| | **Factory Overheads (₹)** | **Direct Labour Hours** | **Machine Hours** | **Factory Overheads (₹)** | **Direct Labour Hours** | **Machine Hours** | **Direct Labour Hours** | **Machine Hours** |
| Cutting | 4,00,000 | 20,000 | 60,000 | 4,20,000 | 22,000 | 62,000 | 40 | 120 |
| Assembly | 3,00,000 | 2,000 | 25,000 | 2,80,000 | 2,000 | 24,000 | 4 | 40 |
| Finishing | 2,00,000 | 14,000 | 1,000 | 2,10,000 | 14,000 | 1,000 | 30 | 2 |

The company has a margin of 30% on sales price to cover other administrative and selling overheads and profit.

**Required :**

---
item: q5b-i
case: c5
qno: 5
part: (b)(i)
marks: 2
type: descriptive
tags: cma.oh.absorb
difficulty: easy
q: 21
---
#### Question
Compute the value of factory overhead that will be used in the pricing of Job No. 1023 as per the company’s existing policy.

---
item: q5b-ii
case: c5
qno: 5
part: (b)(ii)
marks: 3
type: descriptive
tags: cma.oh.absorb
difficulty: medium
q: 21
---
#### Question
Recommend the most appropriate method of absorbing factory overheads and calculate the value of overhead that will be used in the pricing of Job No. 1023.
#### Approach
Look at what drives each department's work: a department dominated by machine hours should absorb per machine hour, one dominated by labour per labour hour, each at its own departmental rate.

---
item: q5b-iii
case: c5
qno: 5
part: (b)(iii)
marks: 2
type: descriptive
tags: cma.oh.underover, cma.oh.absorb
difficulty: easy
q: 21
---
#### Question
Calculate the total under/over recovery of overheads in the Finishing Department based on your recommendation.

(Round off rates up to two decimal points and the final value to the next higher rupee.)
#### Approach
Absorbed overhead = the recommended departmental rate × the actual base; compare it with the actual overheads.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.intro.classify
difficulty: easy
q: 22
---
#### Question
NS Ltd. has listed some of the costs incurred during the current period.

| I | II | III Classification |
|---|---|---|
| (i) | Salary to office attendants | |
| (ii) | Product blueprint cost | |
| (iii) | Hire charges paid for factory machinery for a certain product | |
| (iv) | Salary paid to marketing manager | |
| (v) | One time licence fee paid for software used to make computerised graphics for a particular job | |
| (vi) | Wages paid to factory workers | |
| (vii) | Overtime wages paid to finish a certain job due to urgency created by customer | |
| (viii) | Specialised packing at customer’s request | |
| (ix) | Advertisement Expenses | |
| (x) | Royalty paid for production | |

Classify the above items under appropriate functions of cost.

(Present only columns I and III in your answer books.)
#### Approach
Functions of cost: direct material, direct labour, direct expenses, production overheads, administration, selling and distribution; first ask whether the cost can be traced to one product or job.

---
item: q6b-i
qno: 6
part: (b)(i)
marks: 2
type: descriptive
tags: cma.joint.byprod
difficulty: easy
q: 22
---
#### Question
How would you account for the amount realized on sale of molasses, a by-product in a sugar manufacturing process ?

---
item: q6b-ii
qno: 6
part: (b)(ii)
marks: 1
type: descriptive
tags: cma.joint.apportion
difficulty: easy
q: 22
---
#### Question
Products A and B are produced from the same raw material but Product A requires more refining before it can be sold. How would you apportion the joint costs between Products A and B using net realizable method ?

---
item: q6b-iii
qno: 6
part: (b)(iii)
marks: 2
type: descriptive
tags: cma.joint.byprod
difficulty: easy
q: 23
---
#### Question
Suppose that a by-product requires further processing before being sold. How would you determine and treat the net realizable value at the point of split-off ?

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.sheet.mfg, cma.emp.idle
difficulty: easy
q: 23
---
#### Question
State how you would treat the following items in the Cost Sheet :

(i) Wages paid to idle workers during a sudden government-imposed lockdown.

(ii) A subsidy received from the State Government for using eco-friendly raw materials.

(iii) Interest paid on a term loan taken for purchase of plant and machinery.

(iv) GST paid on purchase of raw materials, for which input tax credit is eligible.

---
item: q6c-or
alt: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.mat.procure
difficulty: easy
note: ICAI prints the 4 marks once, beside the first (c); this OR (c) is its alternative.
q: 23
---
#### Question
What are the main distinctions between a Bill of Materials and a Material Requisition Note in terms of their contents and utility ?
