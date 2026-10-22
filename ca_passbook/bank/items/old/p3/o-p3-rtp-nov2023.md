<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p3-rtp-nov2023
paper: p3
kind: rtp
attempt: nov2023
qfile: old/p3/rtp-nov2023-qa.pdf
afile: old/p3/rtp-nov2023-qa.pdf
status: checked
by: tx-52
date: 2026-10-20
accept: 5001, 7002, 4003, 6004
note: Old-scheme Intermediate Paper 3 Cost and Management Accounting, Revision Test Paper for the November 2023 examination (running heads "PAPER – 3: COST AND MANAGEMENT ACCOUNTING" / "INTERMEDIATE EXAMINATION: NOVEMBER, 2023"): questions pp.1-9, "SUGGESTED HINTS/ANSWERS" pp.9-25, one file. ICAI prints no marks, as every RTP. The questions carry ICAI's chapter headings (Material Cost, Employee Cost, Overheads: Absorption Costing Method, ... Miscellaneous); they are headings, not question text, and are not transcribed. Item model: Q1-Q11 and Q13 are each one connected problem whose requirements ((i), (ii) ...) work on the same data and which ICAI answers as one working, so one item each; Q12 (a) and (b) and Q14 (a)-(e) are separate questions, one item each (19 items, all descriptive). Tags: every item is tagged to the current (new-scheme) Paper 4 sub-topics; Q14(a) (cost plus contract, contract costing) is out of syllabus, see its note. ICAI's own wording and figures kept as printed: "Economic Order Quality" (Q1); "6 hour" (Q2); "2,200 hours . Out of which", "at cost of a ₹ 7 per unit" and "(Holiday to be ignored)" (Q3); "Inspect and Quality control cost" (Q4); "Diesels consumed" and "180 employees works" (Q5), and in its answer the label "(a)" before the cost sheet although Q5 has no parts; "Divisional Mangers" and "it will, find a ready market" (Q13); in the answers "Difference between Minimum lead time Maximum lead time" (Q1), "Halsay Scheme" beside "Halsey" and "TimeTaken" (Q2), "(iii) Labour" and "(iii) Overhead" both numbered (iii) (Q8), "the rent for deluxe from", "luxury suite’" with one quote and "900,00,000" (Q10), "Profit: {(A) – (B)}" (Q6). Repaired extraction damage only: "20 22-23" (Q7), "super delux e" (Q10), "veracit y" and "in t he" (Q14) re-joined, and "₹ 2,96, 80,000" (Q7 answer) written without the stray space as the page prints it; the superscripts of "31st March" and "1st April"; the words that the equation editor sets without spaces in the stacked fractions ("Max.leadtime", "1,60,000units", "8days", "TotalCost of Pr oduction", "No.of unitsproduced", "12,405units") written with their spaces; the ∴, ×, − and brackets of the formulas, which the text layer drops or garbles, read from the rendered pages; stacked fractions in KaTeX with ICAI's words and numbers; tables split across pages (Q4's overheads allocation, Q6's financial statement and cost sheet, Q8's cost per unit, Q12(b)'s profitability statement) joined; the ➢ bullets as lists; the Rupee-font backtick as ₹. check.py: the numbers accepted are the footnote markers of the 2023-24 sales budget (Q13 answer, p.23), printed as superscripts after the quantities ("500¹", "700²", "400³", "600⁴"): the text layer runs them into the quantity (5001, 7002, 4003, 6004), the transcription keeps them apart (500, 700, 400, 600 and 1, 2, 3, 4).
---

---
item: q1
qno: 1
type: descriptive
tags: cma.mat.levels
difficulty: medium
q: 1
a: 9-10
---
#### Question
Following details are related to a manufacturing concern:

| | |
|---|---:|
| Re-order Level | 1,60,000 units |
| Economic Order Quality | 90,000 |
| Minimum Stock Level | 1,00,000 units |
| Maximum Stock Level | 1,90,000 units |
| Average Lead Time | 6 days |
| Difference between minimum lead time and Maximum lead time | 4 days |

Calculate:

(i) Maximum consumption per day

(ii) Minimum consumption per day
#### Answer
Difference between Minimum lead time Maximum lead time = 4 days

Max. lead time – Min. lead time = 4 days

Or, Max. lead time = Min. lead time + 4 days..............................(i)

Average lead time is given as 6 days i.e.

$\dfrac{\text{Max. lead time} + \text{Min. lead time}}{2}$ = 6 days.............................. (ii)

Putting the value of (i) in (ii),

$\dfrac{\text{Min. lead time} + \text{4 days} + \text{Min. lead time}}{2}$ = 6 days

Or, Min. lead time + 4 days + Min. lead time = 12 days

Or, 2 Min. lead time = 8 days

Or, Minimum lead time = $\dfrac{\text{8 days}}{2}$ = 4 days

Putting this Minimum lead time value in (i), we get

Maximum lead time = 4 days + 4 days = 8 days

(i) **Maximum consumption per day:**

Re-order level = Max. Re-order period × Maximum Consumption per day

1,60,000 units = 8 days × Maximum Consumption per day

Or, Maximum Consumption per day = $\dfrac{\text{1,60,000 units}}{\text{8 days}}$ = 20,000 units

(ii) **Minimum Consumption per day:**

Maximum Stock Level =

Re-order level + Re-order Quantity – (Min. lead time × Min. Consumption per day)

Or, 1,90,000 units = 1,60,000 units + 90,000 units – (4 days × Min. Consumption per day)

Or, 4 days × Min. Consumption per day = 2,50,000 units – 1,90,000 units

Or, Minimum Consumption per day = $\dfrac{\text{60,000 units}}{\text{4 days}}$ = 15,000 units
#### Approach
First find the minimum and maximum lead times from their average and their difference. The re-order level then gives the maximum daily consumption, and the maximum stock level formula gives the minimum.

---
item: q2
qno: 2
type: descriptive
tags: cma.emp.incentives
difficulty: medium
q: 1
a: 10-11
---
#### Question
A skilled worker is paid a guaranteed wage rate of ₹ 120 per hour. The standard time allowed for a job is 6 hour. He took 5 hours to complete the job. He is paid wages under Rowan Incentive Plan.

(i) Calculate his effective hourly rate of earnings under Rowan Incentive Plan.

(ii) If the worker is placed under Halsey Incentive Scheme (50%) and he wants to maintain the same effective hourly rate of earnings, calculate the time in which he should complete the job.
#### Answer
**(i)** Effective hourly rate of earnings under Rowan Incentive Plan

Earnings under Rowan Incentive plan =

(Actual time taken × wage rate) + $\dfrac{\text{Time Saved}}{\text{Time Allowed}}$ × Time taken × Wage rate

= (5 hours × ₹ 120) + $\left(\dfrac{\text{1 hour}}{\text{6 hours}} \times \text{5 hours} \times \text{₹ 120}\right)$

= ₹ 600 + ₹ 100 = ₹ 700

Effective hourly rate = ₹ 700/5 hours = ₹ 140 /hour

**(ii)** Let time taken = X

∴ Effective hourly rate = $\dfrac{\text{Earnings under Halsay Scheme}}{\text{Time Taken}}$

Or, Effective hourly rate under Halsey Incentive plan =

$\dfrac{(\text{Time taken} \times \text{Rate}) + \text{50\% of Rate} \times (\text{Time allowed} - \text{Time taken})}{\text{TimeTaken}}$

Or, ₹140 = $\dfrac{(\text{X} \times \text{₹120}) + \text{50\% of ₹ 120} \times (6 - \text{X})}{\text{X}}$

Or, 140X = 120X + 360 – 60X

Or, 80X = 360

Or, X = $\dfrac{360}{80}$ = 4.5 hours

Therefore, to earn effective hourly rate of ₹140 under Halsey Incentive Scheme worker has to complete the work in 4.5 hours.
#### Approach
Rowan's bonus is time saved over time allowed, applied to the time taken and the rate. For Halsey, write the effective rate with the unknown time taken X and set it equal to the Rowan rate.

---
item: q3
qno: 3
type: descriptive
tags: cma.oh.absorb
difficulty: medium
q: 1-2
a: 11
---
#### Question
The following particulars refer to process used in the treatment of material subsequently incorporated in a component forming part of an electrical appliance:

(i) The original cost of the machine used (Purchased in June 2018) was ₹ 10,00,000. Its estimated life is 10 years, the estimated scrap value at the end of its life is ₹ 10,000, and the estimated working time per year (50 weeks of 44 hours) is 2,200 hours . Out of which machine maintenance etc., is estimated to take up 200 hours.

No other loss of working time expected, setting up time, estimated at 100 hours, is regarded as productive time. (Holiday to be ignored).

(ii) Electricity used by the machine during production is 16 units per hour at cost of a ₹ 7 per unit. No power is consumed during maintenance or setting up.

(iii) The machine required a chemical solution which is replaced at the end of week at a cost of ₹ 2,000 each time.

(iv) The estimated cost of maintenance per year is ₹ 1,20,000.

(v) Two attendants control the operation of machine together with five other identical machines. Their combined weekly wages, insurance and the employer's contribution to holiday pay amount is ₹ 9,000.

(vi) Departmental and general works overhead allocated to this machine for the current year amount to ₹ 20,000.

You are required to calculate the machine hour rate of operating the machine.
#### Answer
**Working Notes:**

(i) Total Productive hours = Estimated Working hours – Machine Maintenance hours

= 2,200 hours – 200 hours = 2,000 hours

(ii) Depreciation per annum = $\dfrac{\text{10,00,000 -10,000}}{10}$ = ₹ 99,000

(iii) Chemical solution cost per annum = ₹ 2,000 × 50 weeks = ₹ 1,00,000

(iv) Wages of attendants (per annum) = $\dfrac{\text{9,000 × 50 weeks}}{\text{6 machines}}$ = ₹ 75,000

**Calculation of Machine hour rate**

| Particulars | Amount (per annum) | Amount (per hour) |
|---|---:|---:|
| A. Standing Charge | | |
| (i) Wages of attendants | 75,000 | |
| (ii) Departmental and general works overheads | 20,000 | |
| Total Standing Charge | 95,000 | |
| Standing Charges per hour | | 47.50 |
| B. Machine Expense | | |
| (iii) Depreciation | 99,000 | 49.50 |
| (iv) Electricity (7 × 1,900 × 16 units) ÷ 2,000 | - | 106.40 |
| (v) Chemical solution | 1,00,000 | 50.00 |
| (vi) Maintenance cost | 1,20,000 | 60.00 |
| Machine operating cost per hour (A + B) | | 313.40 |
#### Approach
Productive hours are working hours less maintenance (setting-up time counts as productive). Put fixed items as standing charges per productive hour and add the machine expenses; electricity is consumed only in production, not in setting up.

---
item: q4
qno: 4
type: descriptive
tags: cma.abc.compute, cma.abc.concept
difficulty: medium
q: 2
a: 12-13
---
#### Question
L Limited manufactures three products P, Q and R which are similar in nature and are usually produced in production runs of 100 units. Product P and R require both machine hours and assembly hours, whereas product Q requires only machine hours. The overheads incurred by the company during the first quarter are as under:

| | ₹ |
|---|---:|
| Machine Department expenses | 18,48,000 |
| Assembly Department expenses | 6,72,000 |
| Setup costs | 90,000 |
| Stores receiving cost | 1,20,000 |
| Order processing and dispatch | 1,80,000 |
| Inspect and Quality control cost | 36,000 |

The data related to the three products during the period are as under:

| | P | Q | R |
|---|---:|---:|---:|
| Units produced and sold | 15,000 | 12,000 | 18,000 |
| Machine hours worked | 30,000 hrs. | 48,000 hrs. | 54,000 hrs. |
| Assembly hours worked (direct labour hours) | 15,000 hrs. | - | 27,000 hrs. |
| Customers’ orders executed (in numbers) | 1,250 | 1,000 | 1,500 |
| Number of requisitions raised on the stores | 40 | 30 | 50 |

Prepare a statement showing details of overhead costs allocated to each product type using activity-based costing.
#### Answer
**Calculation of “Activity Rate”**

| Cost Pool | Cost (₹) [A] | Cost Driver [B] | Cost Driver Rate (₹) [C] = [A]÷[B] |
|---|---:|---|---:|
| Machine Department Expenses | 18,48,000 | Machine Hours (1,32,000 hrs.) | 14.00 |
| Assembly Department Expenses | 6,72,000 | Assembly Hours (42,000 hrs.) | 16.00 |
| Setup Cost | 90,000 | No. of Production Runs (450\*) | 200.00 |
| Stores Receiving Cost | 1,20,000 | No. of Requisitions Raised on the Stores (120) | 1,000.00 |
| Order Processing and Dispatch | 1,80,000 | No. of Customers Orders Executed (3,750) | 48.00 |
| Inspection and Quality Control Cost | 36,000 | No. of Production Runs (450\*) | 80.00 |
| Total (₹) | 29,46,000 | | |

*\*Number of Production Run is 450 (150 + 120 + 180)*

**Statement Showing “Overheads Allocation”**

| Particulars of Cost | Cost Driver | P | Q | R | Total |
|---|---|---:|---:|---:|---:|
| Machine Department Expenses | Machine Hours | 4,20,000 (30,000 × ₹14) | 6,72,000 (48,000 × ₹14) | 7,56,000 (54,000 × ₹14) | 18,48,000 |
| Assembly Department Expenses | Assembly Hours | 2,40,000 (15,000 × ₹16) | --- | 4,32,000 (27,000 × ₹16) | 6,72,000 |
| Setup Cost | No. of Production Runs | 30,000 (150 × ₹200) | 24,000 (120 × ₹200) | 36,000 (180 × ₹200) | 90,000 |
| Stores Receiving Cost | No. of Requisitions Raised on the Stores | 40,000 (40 × ₹1,000) | 30,000 (30 × ₹1,000) | 50,000 (50 × ₹1,000) | 1,20,000 |
| Order Processing and Dispatch | No. of Customers Orders Executed | 60,000 (1,250 × ₹48) | 48,000 (1,000 × ₹48) | 72,000 (1,500 × ₹48) | 1,80,000 |
| Inspection and Quality Control Cost | No. of Production Runs | 12,000 (150 × ₹80) | 9,600 (120 × ₹80) | 14,400 (180 × ₹80) | 36,000 |
| Overhead (₹) | | 8,02,000 | 7,83,600 | 13,60,400 | 29,46,000 |
#### Approach
Match each cost pool to its driver and work out a rate per driver unit; the number of production runs comes from the units produced and the run size of 100 units. Then charge each product with its driver quantities at those rates.

---
item: q5
qno: 5
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
q: 3
a: 13
---
#### Question
A Ltd. produces a single product X. During the month of July 2023, the company has produced 14,560 tonnes of X. The details for the month of July 2023 are as follows:

(i) Materials consumed ₹ 15,00,000

(ii) Power consumed in operating production machinery 13,000 Kwh @ ₹ 7 per Kwh

(iii) Diesels consumed in operating production machinery 1,000 litres @ ₹ 93 per litre

(iv) Wages & salary paid – ₹ 64,00,000

(v) Gratuity & leave encashment paid – ₹ 44,20,000

(vi) Hiring charges paid for Heavy Earth Moving machines (HEMM) engaged in production - ₹ 13,00,000. Hiring charges is paid on the basis of production.

(vii) Hiring charges paid for cars used for official purpose – ₹ 80,000

(viii) Reimbursement of diesel cost for the cars – ₹ 20,000

(ix) The hiring of cars attracts GST under RCM @5% without credit.

(x) Maintenance cost paid for weighing bridge (used for weighing of final goods at the time of despatch) – ₹ 7,000

(xi) AMC cost of CCTV installed at weighing bridge (used for weighing of final goods at the time of despatch) and factory premises is ₹ 6,000 and ₹ 18,000 per month respectively.

(xii) TA/ DA and hotel bill paid for sales manager- ₹ 16,000

(xiii) The company has 180 employees works for 26 days in a month.

Required:

PREPARE a Cost sheet for the month of July 2023.
#### Answer
**(a) Cost Sheet of A Ltd. for the month of July 2023**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Materials consumed | | 15,00,000 |
| Wages & Salary | 64,00,000 | |
| Gratuity & leave encashment | 44,20,000 | 1,08,20,000 |
| Power cost (13,000 kwh × ₹ 7) | 91,000 | |
| Diesel cost (1,000 ltr × ₹ 93) | 93,000 | 1,84,000 |
| HEMM hiring charges | | 13,00,000 |
| **Prime Cost** | | **1,38,04,000** |
| AMC cost of CCTV installed at factory premises | | 18,000 |
| **Cost of Production/ Cost of Goods Sold** | | **1,38,22,000** |
| Hiring charges of cars | 80,000 | |
| Reimbursement of diesel cost | 20,000 | |
| | 1,00,000 | |
| Add: GST @5% on RCM basis | 5,000 | 1,05,000 |
| Maintenance cost for weighing bridge | 7,000 | |
| AMC cost of CCTV installed at weigh bridge | 6,000 | 13,000 |
| TA/ DA & hotel bill of sales manager | | 16,000 |
| **Cost of Sales** | | **1,39,56,000** |
#### Approach
Sort each item by function: production costs (including the production-linked HEMM hire) into prime cost and cost of production; car hire with its non-creditable GST, the weighing bridge used at despatch and the sales manager's expenses go below cost of production.

---
item: q6
qno: 6
type: descriptive
tags: cma.sys.recon
difficulty: hard
q: 3-4
a: 13-16
---
#### Question
The financial books of a company reveal the following data for the year ended 31st March, 2023:

| | (₹) |
|---|---:|
| Opening Stock: | |
| Finished goods 625 units | 1,06,250 |
| Work-in-process | 92,000 |
| 01.04.2022 to 31.03.2023 | |
| Raw materials consumed | 16,80,000 |
| Direct Labour | 12,20,000 |
| Factory overheads | 8,44,000 |
| Administration overheads (production related) | 3,96,000 |
| Dividend paid | 2,44,000 |
| Bad Debts | 36,000 |
| Selling and Distribution Overheads | 1,44,000 |
| Interest received | 76,000 |
| Rent received | 92,000 |
| Sales 12,615 units | 45,60,000 |
| Closing Stock: Finished goods 415 units | 91,300 |
| Work-in-process | 82,400 |

The cost records provide as under:

- Factory overheads are absorbed at 70% of direct wages.
- Administration overheads are recovered at 15% of factory cost.
- Selling and distribution overheads are charged at ₹ 6 per unit sold.
- Opening Stock of finished goods is valued at ₹ 240 per unit.
- The company values work-in-process at factory cost for both Financial and Cost Profit Reporting.

Required:

(i) Prepare statements for the year ended 31st March, 2023 showing:

- the profit as per financial records
- the profit as per costing records.

(ii) Prepare a statement reconciling the profit as per costing records with the profit as per financial records.
#### Answer
**(i) Statement of Profit as per financial records**

**(for the year ended March 31, 2023)**

| | (₹) | | (₹) |
|---|---:|---|---:|
| To Opening stock of Finished Goods | 1,06,250 | By Sales | 45,60,000 |
| To Work-in-process | 92,000 | By Closing stock of finished Goods | 91,300 |
| To Raw materials consumed | 16,80,000 | By Work-in-Process | 82,400 |
| To Direct labour | 12,20,000 | By Rent received | 92,000 |
| To Factory overheads | 8,44,000 | By Interest received | 76,000 |
| To Administration overheads | 3,96,000 | | |
| To Selling & distribution overheads | 1,44,000 | | |
| To Dividend paid | 2,44,000 | | |
| To Bad debts | 36,000 | | |
| To Profit | 1,39,450 | | |
| | 49,01,700 | | 49,01,700 |

**Statement of Profit as per costing records**

**(for the year ended March 31,2023)**

| | (₹) |
|---|---:|
| Sales revenue (A) (12,615 units) | 45,60,000 |
| Cost of sales: | |
| Opening stock (625 units × ₹ 240) | 1,50,000 |
| Add: Cost of production of 12,405 units (Refer to working note 2) | 43,28,140 |
| Less: Closing stock $\left(\dfrac{\text{₹ 43,28,140} \times \text{415 units}}{\text{12,405 units}}\right)$ | (1,44,795) |
| Production cost of goods sold (12,615 units) | 43,33,345 |
| Selling & distribution overheads (12,615 units × ₹6) | 75,690 |
| Cost of sales: (B) | 44,09,035 |
| Profit: {(A) – (B)} | 1,50,965 |

**(ii) Statement of Reconciliation**

**(Reconciling the profit as per costing records with the profit as per financial records)**

| | (₹) | (₹) |
|---|---:|---:|
| Profit as per Cost Accounts | | 1,50,965 |
| **Add:** Administration overheads over absorbed (₹5,64,540 – ₹3,96,000) | 1,68,540 | |
| Opening stock overvalued (₹1,50,000 – ₹ 1,06,250) | 43,750 | |
| Interest received | 76,000 | |
| Rent received | 92,000 | |
| Factory overheads over recovered (₹ 8,54,000 – ₹ 8,44,000) | 10,000 | 3,90,290 |
| | | 5,41,255 |
| **Less:** Selling & distribution overheads under recovery (₹ 1,44,000 – ₹ 75,690) | 68,310 | |
| Closing stock overvalued (₹1,44,795 – ₹ 91,300) | 53,495 | |
| Dividend | 2,44,000 | |
| Bad debts | 36,000 | (4,01,805) |
| Profit as per financial accounts | | 1,39,450 |

**Working notes:**

**1. Number of units produced**

| | Units |
|---|---:|
| Sales | 12,615 |
| Add: Closing stock | 415 |
| Total | 13,030 |
| Less: Opening stock | (625) |
| Number of units produced | 12,405 |

**2. Cost Sheet**

| | (₹) |
|---|---:|
| Raw materials consumed | 16,80,000 |
| Direct labour | 12,20,000 |
| Prime cost | 29,00,000 |
| Factory overheads (70% of direct wages) | 8,54,000 |
| Factory cost | 37,54,000 |
| Add: Opening work-in-process | 92,000 |
| Less: Closing work-in-process | (82,400) |
| Factory cost of goods produced | 37,63,600 |
| Administration overheads (15% of factory cost) | 5,64,540 |
| Cost of production of 12,405 units (Refer to working note 1) Cost of production per unit: $= \dfrac{\text{Total Cost of Production}}{\text{No. of units produced}} = \dfrac{\text{₹43,28,140}}{\text{12,405 units}} = \text{₹ 348.90}$ | 43,28,140 |
#### Approach
Prepare the financial P&L from the books first. For the cost profit, find the units produced, build the cost sheet with the absorption rates, value closing stock at the cost per unit produced, and reconcile item by item: over- and under-absorption, stock valuation differences and the purely financial items.

---
item: q7
qno: 7
type: descriptive
tags: cma.job.job, cma.sheet.quote
difficulty: medium
q: 4-5
a: 16-17
---
#### Question
SM Motors Ltd. is a manufacturer of auto components. Following are the details of expenses for the year 2022-23:

| | | (₹) |
|---|---|---:|
| (i) | Opening Stock of Material | 15,00,000 |
| (ii) | Closing Stock of Material | 20,00,000 |
| (iii) | Purchase of Material | 1,80,50,000 |
| (iv) | Direct Labour | 90,50,000 |
| (v) | Factory Overhead | 30,80,000 |
| (vi) | Administrative Overhead | 20,50,400 |

During the FY 2023-24, the company has received an order from a car manufacturer where it estimates that the cost of material and labour will be ₹ 80,00,000 and ₹ 40,50,000 respectively. The company charges factory overhead as a percentage of direct labour and administrative overheads as a percentage of factory cost based on previous year's cost. Cost of delivery of the components at customer's premises is estimated at ₹ 4,50,000.

You are required to:

(i) Calculate the overhead recovery rates based on actual costs for 2022-23.

(ii) Prepare a Job cost sheet for the order received and the price to be quoted if the desired profit is 25% on sales.
#### Answer
**(i) Calculation of Overhead Recovery Rate:**

Factory Overhead Recovery Rate = $\dfrac{\text{₹ 30,80,000}}{\text{₹ 90,50,000}} \times 100$ = 34% of Direct labour

Administrative Overhead Recovery Rate = $\dfrac{\text{₹ 20,50,400}}{\text{₹ 2,96,80,000}} \times 100$ = 6.91% of Factory Cost

**Working Note: Calculation of Factory Cost in 2022-23**

| Particulars | Amount (₹) |
|---|---:|
| Opening Stock of Material | 15,00,000 |
| *Add:* Purchase of Material | 1,80,50,000 |
| *Less:* Closing Stock of Material | (20,00,000) |
| Material Consumed | 1,75,50,000 |
| Direct Labour | 90,50,000 |
| Prime Cost | 2,66,00,000 |
| Factory Overhead | 30,80,000 |
| Factory Cost | 2,96,80,000 |

**(ii) Job Cost Sheet for the order received in 2023-24**

| Particulars | Amount (₹) |
|---|---:|
| Material | 80,00,000 |
| Labour | 40,50,000 |
| Factory Overhead (34% of ₹ 40,50,000) | 13,77,000 |
| Factory Cost | 1,34,27,000 |
| Administrative Overhead (6.91% of ₹1,34,27,000) | 9,27,806 |
| Cost of delivery | 4,50,000 |
| Total Cost | 1,48,04,806 |
| *Add:* Profit @ 25% of Sales or 33.33% of cost | 49,34,935 |
| Sales value (Price to be quoted for the order) | 1,97,39,741 |

Hence the price to be quoted is ₹1,97,39,741.
#### Approach
From last year's actuals, factory overhead is a percentage of direct labour and administrative overhead a percentage of factory cost (material consumed + labour + factory overhead). Apply both to the new order and convert 25% on sales into a mark-up on cost.

---
item: q8
qno: 8
type: descriptive
tags: cma.proc.eu, cma.proc.accounts
difficulty: medium
q: 5
a: 17-18
---
#### Question
The following information is furnished by ABC Company for Process - II of its manufacturing activity for the month of April 2023:

(i) Opening Work-in-Progress – Nil

(ii) Units transferred from Process I – 55,000 units at ₹ 3,27,800

(iii) Expenditure debited to Process – II:

| | |
|---|---:|
| Consumables | ₹ 1,57,200 |
| Labour | ₹ 1,04,000 |
| Overhead | ₹ 52,000 |

(iv) Units transferred to Process III – 51,000 units

(v) Closing WIP – 2,000 units (Degree of completion):

| | |
|---|---:|
| Consumables | 80% |
| Labour | 60% |
| Overhead | 60% |

(vi) Units scrapped - 2,000 units, scrapped units were sold at ₹ 5 per unit

(vii) Normal loss – 4% of units introduced

You are required to:

(i) Prepare a Statement of Equivalent Production.

(ii) Determine the cost per unit

(iii) Determine the value of Work-in-Process and units transferred to Process – III
#### Answer
**(i) Statement of Equivalent Production**

| Input Details | Units | Output Particulars | Units | Equivalent Production | | | | | |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | | **Material- A\*** | | **Consumables** | | **Labour & Overheads** | |
| | | | | **%** | **Units** | **%** | **Units** | **%** | **Units** |
| Units transferred from Process-I | 55,000 | Units transferred to Process-III | 51,000 | 100 | 51,000 | 100 | 51,000 | 100 | 51,000 |
| | | Normal loss (4% of 55,000) | 2,200 | - | - | - | - | - | - |
| | | Closing W-I-P | 2,000 | 100 | 2,000 | 80 | 1,600 | 60 | 1,200 |
| | | Abnormal Gain | (200) | 100 | (200) | 100 | (200) | 100 | (200) |
| | 55,000 | | 55,000 | | 52,800 | | 52,400 | | 52,000 |

\*Material A represent transferred-in units from process-I

**(ii) Determination of Cost per Unit**

| Particulars | Amount (₹) | Units | Per Unit (₹) |
|---|---:|---:|---:|
| (i) Direct Material (Consumables) : | | | |
| Value of units transferred from Process-I | 3,27,800 | | |
| *Less:* Value of normal loss (2,200 units × ₹ 5) | (11,000) | | |
| | 3,16,800 | 52,800 | 6.00 |
| (ii) Consumables added in Process-II | 1,57,200 | 52,400 | 3.00 |
| (iii) Labour | 1,04,000 | 52,000 | 2.00 |
| (iii) Overhead | 52,000 | 52,000 | 1.00 |
| Total Cost per equivalent unit | | | 12.00 |

**(iii) Determination of value of Work-in-Process and units transferred to Process-III**

| Particulars | Units | Rate (₹) | Amount (₹) |
|---|---:|---:|---:|
| Value of Closing W-I-P: | | | |
| Material from Process-I | 2,000 | 6.00 | 12,000 |
| Consumables | 1,600 | 3.00 | 4,800 |
| Labour | 1,200 | 2.00 | 2,400 |
| Overhead | 1,200 | 1.00 | 1,200 |
| | | | 20,400 |
| Value of units transferred to Process-III | 51,000 | 12.00 | 6,12,000 |
#### Approach
Normal loss is 4% of 55,000 = 2,200 units but only 2,000 were scrapped, so there is an abnormal gain to bring into the equivalent units. The material from Process I bears the scrap value of the normal loss; the closing WIP is 100% complete for that material.

---
item: q9
qno: 9
type: descriptive
tags: cma.joint.byprod, cma.joint.apportion
difficulty: medium
q: 6
a: 18-19
---
#### Question
A factory producing article A also produces a by-product B which is further processed into finished product. The joint cost of manufacture is given below:

| | |
|---|---:|
| Material | ₹ 5,000 |
| Labour | ₹ 3,000 |
| Overhead | ₹ 2,000 |
| | ₹ 10,000 |

Subsequent cost in ₹ are given below:

| | A | B |
|---|---:|---:|
| Material | 3,000 | 1,500 |
| Labour | 1,400 | 1,000 |
| Overhead | 600 | 500 |
| | 5,000 | 3,000 |

Selling prices are A ₹ 16,000

B ₹ 8,000

Estimated profit on selling prices is 25% for A and 20% for B.

Assume that selling and distribution expenses are in proportion of sales prices. Show how you would apportion joint costs of manufacture and prepare a statement showing cost of production of A and B.
#### Answer
**Apportionment of Joint Costs**

| Particulars | A (₹) | B (₹) |
|---|---:|---:|
| Selling Price | 16,000 | 8,000 |
| *Less:* Estimated profit | 4,000 (25% of ₹16,000) | 1,600 (20% of ₹ 8,000) |
| Cost of sales | 12,000 | 6,400 |
| *Less:* Selling & Distribution exp. (Refer working note) | 267 (₹ 400 × 2/3) | 133 (₹ 400 × 1/3) |
| *Less:* Subsequent cost | 5,000 | 3,000 |
| Share of Joint cost | 6,733 | 3,267 |

So, Joint cost of manufacture is to be distributed to A & B in the ratio of 6733 : 3267

**Statement showing Cost of Production of A and B**

| Elements of cost | Joint Cost | | Subsequent Cost | | Total Cost | |
|---|---:|---:|---:|---:|---:|---:|
| | **A** | **B** | **A** | **B** | **A** | **B** |
| Material | 3,367 | 1,633 | 3,000 | 1,500 | 6,367 | 3,133 |
| Labour | 2,020 | 980 | 1,400 | 1,000 | 3,420 | 1,980 |
| Overheads | 1,346 | 654 | 600 | 500 | 1,946 | 1,154 |
| | | | | Cost of production | 11,733 | 6,267 |

**Working Note:**

**Calculation of Selling and Distribution Expenses**

| Particulars | (₹) |
|---|---:|
| Total Sales Revenue (₹ 16,000 + ₹ 8,000) | 24,000 |
| Less: Estimated Profit (₹ 4,000 + ₹ 1,600) | (5,600) |
| Cost of Sales | 18,400 |
| Less: Cost of production: | |
| \- Joint Costs | (10,000) |
| \- Subsequent costs (₹ 5,000 + ₹ 3,000) | (8,000) |
| Selling and Distribution expenses (Balancing figure) | 400 |
#### Approach
Work backwards from each product's selling price (the reverse cost method): take off the expected profit, its share of selling and distribution expenses and its own subsequent costs; what is left is its share of the joint cost.

---
item: q10
qno: 10
type: descriptive
tags: cma.svc.others
difficulty: medium
q: 6-7
a: 19-21
---
#### Question
P Holiday Resorts offers three types of rooms to its guests, viz deluxe room, super deluxe room and luxury suite. You are required to ascertain the tariff to be charged to the customers for different types of rooms on the basis of following information:

| Types of Room | Number of Rooms | Occupancy |
|---|---:|---:|
| Deluxe Room | 100 | 90% |
| Super Deluxe Room | 60 | 75% |
| Luxury Suite | 40 | 60% |

Rent of ‘super deluxe’ room is to be fixed at 2 times of ‘deluxe room’ and that of ‘luxury suite’ is 3 times of ‘deluxe room’. Annual expenses are as follows:

| Particulars | Amount (₹ lakhs) |
|---|---:|
| Staff salaries | 680.00 |
| Lighting, Heating and Power | 300.00 |
| Repairs, Maintenance and Renovation | 180.00 |
| Linen | 30.00 |
| Laundry charges | 24.00 |
| Interior decoration | 75.00 |
| Sundries | 30.28 |

An attendant for each room was provided when the room was occupied and he was paid ₹ 500 per day towards wages. Further, depreciation is to be provided on building @ 5% on ₹ 900 lakhs, furniture and fixtures @ 10% on ₹ 90 lakhs and air conditioners @ 10% on ₹ 75 lakhs.

Profit is to be provided @ 25% on total taking and assume 360 days in a year.
#### Answer
**Operating cost statement of P Holiday Resorts**

| Particulars | Cost per annum (₹ In lakhs) |
|---|---:|
| Staff Salaries | 680.00 |
| Room Attendant’s Wages (Refer WN-3) | 286.20 |
| Lighting, Heating & Power | 300.00 |
| Repairs, Maintenance & Renovation | 180.00 |
| Linen | 30.00 |
| Laundry charges | 24.00 |
| Interior Decoration | 75.00 |
| Sundries | 30.28 |
| Depreciation: (Refer WN-4) | |
| Building | 45.00 |
| Furniture & Fixture | 9.00 |
| Air Conditioners | 7.50 |
| **Total cost for the year** | **1666.98** |

**Computation of profit:**

Let ₹ x be the rent for deluxe from.

Equivalent deluxe room days are 90,720 (Refer WN-2)

Total takings = ₹ 90,720x

Profit is 25% of total takings.

Profit = 25% of ₹ 90,720x = ₹ 22,680x

Total takings = Total Cost + Profit

₹ 90,720x = ₹ 16,66,98,000 + ₹ 22,680x

₹ 90,720x - ₹ 22,680x = ₹ 16,66,98,000

₹ 68,040x = ₹ 16,66,98,000

X = $\dfrac{\text{₹ 16,66,98,000}}{\text{₹ 68,040}}$ =₹ 2,450

| | |
|---|---:|
| Rent to be charged for deluxe room | ₹ 2,450 |
| Rent to be charged for super deluxe room = Rent of deluxe room x 2 = ₹ 2,450 x 2 | ₹ 4,900 |
| Rent to be charged for luxury suite = Rent of Deluxe room x 3 = ₹ 2,450 x 3 | ₹ 7,350 |

**Working Notes:**

**1. Computation of Room Occupancy**

| Type of Room | No. of rooms x no. of days x occupancy % | Room days |
|---|---|---:|
| Deluxe Room | 100 rooms x 360 days x 90% occupancy | 32,400 |
| Super Deluxe Room | 60 rooms x 360 days x 75% occupancy | 16,200 |
| Luxury Suite | 40 x 360 days x 60% occupancy | 8,640 |
| | Total | 57,240 |

**2. Computation of equivalent deluxe room days**

Rent of ‘super deluxe’ room is to be fixed at 2 times of ‘deluxe room’ and luxury suite’ is 3 times of ‘deluxe room’. Therefore, equivalent room days would be:

| Type of Room | Room days | Equivalent deluxe room days |
|---|---:|---:|
| Deluxe Room | 32,400 x 1 | 32,400 |
| Super Deluxe Room | 16,200 x 2 | 32,400 |
| Luxury Suite | 8,640 x 3 | 25,920 |
| | Total | 90,720 |

**3. Computation of room attendant’s wages:**

Room occupancy days @ ₹ 500 per day

= 57,240 days × ₹ 500 per day = ₹ 2,86,20,000

**4. Computation of Depreciation per annum:**

| Particulars | Cost (₹) | Rate of Depreciation | Depreciation (₹) |
|---|---:|---:|---:|
| Building | 900,00,000 | 5% | 45,00,000 |
| Furniture & Fixtures | 90,00,000 | 10% | 9,00,000 |
| Air Conditioners | 75,00,000 | 10% | 7,50,000 |
#### Approach
Convert all occupied rooms into equivalent deluxe room-days using the 1 : 2 : 3 rent ratio. Total cost includes the attendants' wages on occupied room-days and the depreciation; profit is 25% of takings, so takings are cost divided by 75%.

---
item: q11
qno: 11
type: descriptive
tags: cma.std.labour
difficulty: medium
q: 7
a: 21
---
#### Question
The following information has been provided by a company:

| | |
|---|---:|
| Number of units produced and sold | 6,000 |
| Standard labour rate per hour | ₹8 |
| Standard hours required for 6,000 units | - |
| Actual hours required | 17094 hours |
| Labour efficiency | 105.3% |
| Labour rate variance | ₹ 68,376 (A) |

You are required to calculate:

(i) Actual labour rate per hour

(ii) Standard hours required for 6,000 units

(iii) Labour Efficiency variance

(iv) Standard labour cost per unit

(v) Actual labour cost per unit.
#### Answer
SR – Standard labour Rate per Hour

AR – Actual labour rate per hour

SH – Standard Hours

AH – Actual hours

(i) Labour rate Variance = AH (SR – AR)

Or 17,094 (8 – AR) = 68,376(A)

Or 17,094 (8 – AR) = - 68,376

Or 8 – AR = -4

Or AR = ₹12

(ii) Labour Efficiency = $\dfrac{\text{SH}}{\text{AH}}$ x 100 = 105.3

= SH = $\dfrac{\text{AH} \times \text{105.3}}{100}$ = $\dfrac{\text{17,094} \times \text{105.3}}{100}$

= 17,999.982

= SH = 18,000 hours

(iii) Labour Efficiency Variance = SR (SH – AH)

= 8(18,000 – 17,094)

= 8 X 906

= ₹ 7,248(F)

(iv) Standard Labour Cost per Unit = $\dfrac{\text{18,000} \times 8}{\text{6,000}}$ = ₹ 24

(v) Actual Labour Cost Per Unit = $\dfrac{\text{17,094} \times 12}{\text{6,000}}$ = ₹ 34.19
#### Approach
An adverse rate variance means the actual rate is above standard: solve AH × (SR − AR) for AR. Labour efficiency is standard hours over actual hours, which gives the standard hours.

---
item: q12a
qno: 12
part: (a)
type: descriptive
tags: cma.mc.bep
difficulty: medium
q: 7-8
a: 22
---
#### Question
A dairy product company manufacturing baby food with a shelf life of one year furnishes the following information:

(i) On 1st April, 2023, the company has an opening stock of 20,000 packets whose variable cost is ₹ 180 per packet.

(ii) In 2022-23, production was 1,20,000 packets and the expected production in 2023-24 is 1,50,000 packets. Expected sales for 2023-24 is 1,60,000 packets.

(iii) In 2022-23, fixed cost per unit was ₹ 60 and it is expected to increase by 10% in 2023-24. The variable cost is expected to increase by 25%. Selling price for 2023-24 has been fixed at ₹ 300 per packet.

You are required to calculate the Break-even volume in units for 2023-24.
#### Answer
**Working Notes:**

| Particulars | 2022-23 (₹) | 2023-24 (₹) |
|---|---:|---:|
| Fixed Cost | 72,00,000 (₹ 60 × 1,20,000 units) | 79,20,000 (110% of ₹ 72,00,000) |
| Variable Cost | 180 | 225 (125% of ₹ 180) |

**Calculation of Break-even Point (in units):**

Since, shelf life of the product is one year only, hence, opening stock is to be sold first.

| | (₹) |
|---|---:|
| Total Contribution required to recover total fixed cost in 2023-24 and to reach break-even volume. | 79,20,000 |
| Less: Contribution from opening stock {20,000 units × (₹ 300 – ₹ 180)} | 24,00,000 |
| Balance Contribution to be recovered | 55,20,000 |

Units to be produced to get balance contribution

= $\dfrac{\text{₹ 55,20,000}}{\text{₹ 300} - \text{₹ 225}}$ = 73,600 packets.

Break-even volume in units for 2023-24

| | Packets |
|---|---:|
| From 2023-24 production | 73,600 |
| Add: Opening stock from 2022-23 | 20,000 |
| | 93,600 |
#### Approach
The opening stock must be sold first and carries last year's variable cost, so take its contribution off the year's fixed cost; the rest is recovered from new production at the new contribution per packet.

---
item: q12b
qno: 12
part: (b)
type: descriptive
tags: cma.mc.decisions, cma.mc.basics
difficulty: easy
q: 8
a: 22-23
---
#### Question
The M-Tech Manufacturing Company is presently evaluating two possible processes for the manufacture of a toy. The following information is available:

| Particulars | Process A (₹) | Process B (₹) |
|---|---:|---:|
| Variable cost per unit | 12 | 14 |
| Sales price per unit | 20 | 20 |
| Total fixed costs per year | 30,00,000 | 21,00,000 |
| Capacity (in units) | 4,30,000 | 5,00,000 |
| Anticipated sales (Next year, in units) | 4,00,000 | 4,00,000 |

Suggest:

1\. Identify the process which gives more profit.

2\. Would you change your answer as given above, if you were informed that the capacities of the two processes are as follows:

A - 6,00,000 units; B - 5,00,000 units?
#### Answer
**(1) Comparative Profitability Statements**

| Particulars | Process- A (₹) | Process- B (₹) |
|---|---:|---:|
| Selling Price per unit | 20.00 | 20.00 |
| *Less:* Variable Cost per unit | 12.00 | 14.00 |
| Contribution per unit | 8.00 | 6.00 |
| Total Contribution | 32,00,000 (₹ 8 × 4,00,000) | 24,00,000 (₹ 6 × 4,00,000) |
| *Less:* Total fixed costs | 30,00,000 | 21,00,000 |
| Profit | 2,00,000 | 3,00,000 |
| Capacity (units) | 4,30,000 | 5,00,000 |
| Total Contribution at full capacity | 34,40,000 (₹ 8 × 4,30,000) | 30,00,000 (₹ 6 × 5,00,000) |
| Fixed Cost | 30,00,000 | 21,00,000 |
| Profit | 4,40,000 | 9,00,000 |

Process - B gives more profit.

**(2)**

| Particulars | Process- A (₹) | Process- B (₹) |
|---|---:|---:|
| \*Capacity (units) | 6,00,000 | 5,00,000 |
| Total contribution | 48,00,000 (₹ 8 × 6,00,000) | 30,00,000 (₹ 6 × 5,00,000) |
| Fixed Cost | 30,00,000 | 21,00,000 |
| Profit | 18,00,000 | 9,00,000 |

Process-A be chosen.

**\*Note: It is assumed that capacity produced equals sales.**

---
item: q13
qno: 13
type: descriptive
tags: cma.bud.functional
difficulty: medium
q: 8-9
a: 23-24
---
#### Question
XY Co. Ltd manufactures two products viz., X and Y and sells them through two divisions, East and West. For the purpose of Sales Budget to the Budget Committee, following information has been made available for the year 2022-23:

| Product | Budgeted Sales | | Actual Sales | |
|---|---|---|---|---|
| | **East Division** | **West Division** | **East Division** | **West Division** |
| X | 400 units at ₹ 9 | 600 units at ₹ 9 | 500 units at ₹ 9 | 700 units at ₹ 9 |
| Y | 300 units at ₹ 21 | 500 units at ₹ 21 | 200 units at ₹ 21 | 400 units at ₹ 21 |

Adequate market studies reveal that product X is popular but underpriced. It is expected that if the price of X is increased by ₹ 1, it will, find a ready market. On the other hand, Y is overpriced and if the price of Y is reduced by ₹ 1 it will have more demand in the market. The company management has agreed for the aforesaid price changes. On the basis of these price changes and the reports of salesmen, following estimates have been prepared by the Divisional Managers:

Percentage increase in sales over budgeted sales

| Product | East Division | West Division |
|---|---|---|
| X | + 10% | + 5% |
| Y | + 20% | + 10% |

With the help of intensive advertisement campaign, following additional sales (over and above the above-mentioned estimated sales by Divisional Mangers) are possible:

| Product | East Division | West Division |
|---|---|---|
| X | 60 units | 70 units |
| Y | 40 units | 50 units |

You are required to prepare Sales Budget for 2023-24 after incorporating above estimates and also show the Budgeted Sales and Actual Sales of 2022-23.
#### Answer
**Statement Showing Sales Budget for 2023-24**

| Division | Product X | | | Product Y | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| East | 500¹ | 10 | 5,000 | 400³ | 20 | 8,000 | 13,000 |
| West | 700² | 10 | 7,000 | 600⁴ | 20 | 12,000 | 19,000 |
| Total | 1,200 | | 12,000 | 1,000 | | 20,000 | 32,000 |

**Workings**

1. 400 × 110% + 60 = 500 units
2. 600 × 105% + 70 = 700 units
3. 300 × 120% + 40 = 400 units
4. 500 × 110% + 50 = 600 units

**Statement Showing Sales Budget for 2022-23**

| Division | Product X | | | Product Y | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| East | 400 | 9 | 3,600 | 300 | 21 | 6,300 | 9,900 |
| West | 600 | 9 | 5,400 | 500 | 21 | 10,500 | 15,900 |
| Total | 1,000 | | 9,000 | 800 | | 16,800 | 25,800 |

**Statement Showing Actual Sales for 2022-23**

| Division | Product X | | | Product Y | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| East | 500 | 9 | 4,500 | 200 | 21 | 4,200 | 8,700 |
| West | 700 | 9 | 6,300 | 400 | 21 | 8,400 | 14,700 |
| Total | 1,200 | | 10,800 | 600 | | 12,600 | 23,400 |
#### Approach
Budgeted quantity for 2023-24 = last year's budgeted quantity raised by the divisional percentage, plus the extra units from advertising; price X at ₹ 10 and Y at ₹ 20 after the ₹ 1 changes.

---
item: q14a
qno: 14
part: (a)
type: descriptive
tags: cma.job
oos: yes
difficulty: easy
q: 9
a: 24
note: Out of syllabus (old scheme): the cost plus contract belongs to contract costing, which is not in the new-scheme Paper 4 syllabus or the January 2027 Study Material (no Contract Costing chapter; the Job Costing chapter does not treat cost plus contracts); tagged with the nearest chapter, Job Costing (as in o-p3-mtp-nov2023-s1).
---
#### Question
What is cost plus contract? What are its advantages?
#### Answer
**Cost plus contract:** Under cost plus contract, the contract price is ascertained by adding a percentage of profit to the total cost of the work. Such types of contracts are entered into when it is not possible to estimate the contract cost with reasonable accuracy due to unstable condition of material, labour services etc.

Following are the advantages of cost-plus contract:

(i) The contractor is assured of a fixed percentage of profit. There is no risk of incurring any loss on the contract.

(ii) It is useful specially when the work to be done is not definitely fixed at the time of making the estimate.

(iii) Contractee can ensure himself about the ‘cost of contract’ as he is empowered to examine the books and documents of the contractor to ascertain the veracity of the cost of contract.

---
item: q14b
qno: 14
part: (b)
type: descriptive
tags: cma.intro.scope
difficulty: easy
q: 9
a: 24
---
#### Question
Narrate the objectives of cost accounting.
#### Answer
The main objectives of introduction of a Cost Accounting System in a manufacturing organization are as follows:

**(i) Ascertainment of cost:** The main objective of a Cost Accounting system is to ascertain cost for cost objects. Costing may be post completion or continuous but the aim is to arrive at a complete and accurate cost figure to assist the users to compare, control and make various decisions.

**(ii) Determination of selling price:** Cost Accounting System in a manufacturing organisation enables to determine desired selling price after adding expected profit margin with the cost of the goods manufactured.

**(iii) Cost control and Cost reduction:** Cost Accounting System equips the cost controller to adhere and control the cost estimate or cost budget and assist them to identify the areas of cost reduction.

**(iv) Ascertainment of profit of each activity:** Cost Accounting System helps to classify cost on the basis of activity to ascertain activity wise profitability.

**(v) Assisting in managerial decision making:** Cost Accounting System provides relevant cost information and assists managers to make various decisions.

---
item: q14c
qno: 14
part: (c)
type: descriptive
tags: cma.oh.absorb
difficulty: easy
q: 9
a: 25
---
#### Question
How would you account for idle capacity cost in Cost Accounting?
#### Answer
Idle capacity costs are treated in the following ways in Cost Accounts:

(i) **If the idle capacity cost is due to unavoidable reasons:** A supplementary overhead rate may be used to recover the idle capacity cost. In this case, the costs are charged to the production capacity utilised.

(ii) **If the idle capacity cost is due to avoidable reasons:** Such as faulty planning, etc. the cost should be charged to Costing Profit and Loss Account.

(iii) **If the idle capacity cost is due to trade depression, etc.:** Being abnormal in nature the cost should also be charged to the Costing Profit and Loss Account.

(iv) **If the idle capacity cost is due to seasonal factors**, then the cost should be charged to cost of production by inflating overhead rate.

---
item: q14d
qno: 14
part: (d)
type: descriptive
tags: cma.oh.underover
difficulty: easy
q: 9
a: 25
---
#### Question
Explain the treatment of over and under absorption of overheads in cost accounts.
#### Answer
Treatment of over and under absorption of overheads are:

(i) Writing off to costing P&L A/c: Small difference between the actual and absorbed amount should simply be transferred to costing P&L A/c, if difference is large then investigate the causes and after that abnormal loss/ gain shall be transferred to costing P&L A/c.

(ii) Use of supplementary Rate: Under this method the balance of under and over absorbed overheads may be charged to cost of W.I.P., finished stock and cost of sales proportionately with the help of supplementary rate of overhead.

(iii) Carry Forward to Subsequent Year: Difference should be carried forward in the expectation that next year the position will be automatically corrected.

---
item: q14e
qno: 14
part: (e)
type: descriptive
tags: cma.oh.absorb, cma.oh.classify
difficulty: easy
q: 9
a: 25
---
#### Question
Distinguish between cost allocation and cost absorption.
#### Answer
Distinguish between Cost allocation and Cost absorption:

*Cost allocation* is the allotment of whole item of cost to a cost centre or a cost unit. In other words, it is the process of identifying, assigning or allowing cost to a cost centre or a cost unit.

*Cost absorption* is the process of absorbing all indirect costs or overhead costs allocated or apportioned over particular cost center or production department by the units produced.
