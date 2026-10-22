<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-mtp-may2026-s1
paper: p4
kind: mtp
attempt: may2026
series: s1
qfile: new/p4/mtp-may2026-s1-q.pdf
afile: new/p4/mtp-may2026-s1-a.pdf
choice: q1; any 4 of q2-q6
q: 1, 8
status: checked
by: tx-08
date: 2026-10-20
accept: 2026, 2026
note: ICAI's Mock Test Paper Series I (March 2026, paper dated 23rd March 2026) for the May 2026 attempt: questions from the question paper (qfile), answers from ICAI's Suggested Answers/ Solution (afile). Instructions: the question paper's printed instructions on p.1 and the Part II heading on p.8. Part I: Case Scenario 1 = MCQs 1-5 and Case Scenario 2 = MCQs 6-10, each case closed by "(5 x 2 = 10 Marks)" (2 marks per MCQ), then MCQs 11-15 at (2 Marks) each. ICAI answers MCQs 6-10 with their keys and one Working Note printed after MCQ 10, which therefore sits in MCQ 10's answer (docs/ICAI_BANK.md 9.3b). Q3(b) (9 marks), Q4(b) (7 marks) and Q6(c) (4 marks) carry their own (a), (b) ... requirements inside one marks line and are one item each. ICAI's own wording and figures kept as printed: "Super high Ltd." (Case Scenario 1); "BCIC Ltd. is a insurance company" and "Names as Protection Plus" (MCQ 13); "Standard cost = 5,100 × 5" (MCQ 3 answer; the standard price is ₹ 50) and "Actual cost of labour on completed units"; "Calculation of Cost of Production of A Ltd. for the period….." (MCQ 10 working note); "x 5day" (Q1(a) answer); "Machine Shops" in the Q3(b) answer (the question says Machine Shop); "Calculate of Cost of material added" with "Add: Realisable value of Scrap: 4,200" while the total 1,12,905 is 1,08,045 + 4,860 (Q4(b) answer); "1095" (Q4(b) answer); "probability of the individual product lines" (Q5(a) question); "410,400" and "300,000" (Q5(a)(ii) answer). check.py: the numbers accepted are on the title block that both files print on p.1 ("Mock Test Paper - Series I: March 2026", "Date of Paper: 23rd March 2026", "Time of Paper: 10 AM – 1 PM", "PAPER – 4: COST AND MANAGEMENT ACCOUNTING": 2026, 2026, 23, 10, 1, 4), not transcribed, and the numbers of ICAI's case headings "Case Scenario 1" and "Case Scenario 2" (question pp.1, 3; answer pp.1, 3), which are in the cases' label: lines (1, 2).
---
#### Instructions
Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/ her answer in Hindi will not be valued.

Working notes should form part of the answer.

**Time Allowed – 3 Hours**

**Maximum Marks – 100**

1\. The question paper comprises two parts, Part I and Part II.

2\. Part I comprises Case Scenario based Multiple Choice Questions (MCQs) for 30 marks

3\. Part II comprises questions which require descriptive type answers for 70 marks.

**PART I – Case Scenario based MCQs**

**Part I is compulsory.**

***Write the most appropriate answer to each of the following multiple-choice questions by choosing one of the four options given. All questions are compulsory.***

**PART-II – Descriptive Questions (70 Marks)**

Question No. 1 is compulsory.

Attempt any four questions out of the remaining five questions.

---
case: c1
qno: 1-5
label: Case Scenario 1
q: 1-2
---
#### Case
Mr. Sagar, the CFO of Super high Ltd. was shocked to see the plummeting margins in the second quarterly results of the company as presented in the committee meeting. He wondered how can things go so wrong all of a sudden, while he had been awarded for exemplary performance just three months back.

In order to set things right and ensure a positive turnaround, he appointed you to analyze and present a report giving narrative for the downfall.

You begin with seeking information which is presented as under:

There was no change in the selling price of the product from last quarter.

There was no opening or closing stocks of raw material or finished units in the beginning or end of the quarter. However, there were stocks of WIP (work in progress) units.

Opening WIP was 1,000 units which was 60% complete in respect of labour and overheads. Super high Ltd. was engaged in a process where material was fed immediately in the pipe line. The opening WIP was valued at standard cost which turns out to be ₹ 1,04,000 as shown later.

Cost of Material used: ₹ 3,00,000 (6000 units @ 50 ₹ per Kg)

The Cost of Labour and overheads incurred during the quarter was ₹ 3,15,900 and ₹ 1,74,960 respectively.

4,500 completed units were produced and 1,600 units were closing WIP which was 60% complete in respect of labour and overheads. The normal loss in process was 900 units which was 15% of the current input. It was sold as scrap for ₹ 4,200.

The standard cost card showed that 1 unit of finished product would cost ₹ 50 after considering the normal standard loss which is 15% and the labour hours should be 3 hrs. @ ₹ 20 per hour, the cost of overheads per unit should be ₹ 30 per unit.

Opening WIP value:

- Material: 50 × 1,000 = ₹ 50,000
- Labour: 60% × (3 hrs × ₹ 20 × 1,000) = ₹ 36,000
- OH: 60% × ₹ 30 × 1,000 = ₹ 18,000
- Total Opening WIP = ₹ 1,04,000

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: A
tags: cma.proc.eu
difficulty: easy
q: 2
a: 1
---
#### Question
Equivalent units for material (FIFO) are:
#### Options
(A) 5,100
(B) 6,000
(C) 6,100
(D) 4,500
#### Answer
**(A) 5,100**

**Equivalent Production (FIFO Method)**

| Input Details | Units | Output Particulars | Units | Equivalent Production | | | | | |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | | **Material** | | **Labour** | | **Overheads** | |
| | | | | **%** | **Units** | **%** | **Units** | **%** | **Units** |
| Opening WIP | 1,000 | From Opening WIP | 1,000 | - | - | 40 | 400 | 40 | 400 |
| Fresh inputs | 6,000 | From fresh units | 3,500 | 100 | 3,500 | 100 | 3,500 | 100 | 3,500 |
| | | Normal loss | 900 | - | | - | | - | |
| | | Closing WIP | 1,600 | 100 | 1,600 | 60 | 960 | 60 | 960 |
| | 7,000 | | 7,000 | | 5,100 | | 4,860 | | 4,860 |
#### Approach
Material is put in at the start, so the opening WIP needs no more material this period; the normal loss gets no equivalent units.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: A
tags: cma.proc.eu
difficulty: medium
q: 2
a: 1
---
#### Question
Cost per equivalent unit of labour:
#### Options
(A) ₹ 65
(B) ₹ 61.94
(C) ₹ 70.20
(D) ₹ 90.26
#### Answer
**(A) ₹ 65**

**Cost per Equivalent Units (EU):**

| Element | Total cost (₹) | Equivalent units (EU) | Cost per EU (₹) |
|---|---:|---:|---:|
| **Value of raw material introduced** | 3,00,000 | | |
| *Less:* Scrap value of normal loss | (4,200) | | |
| Total value of raw material | 2,95,800 | 5,100 | 2,95,800/5,100 = **₹ 58** |
| **Labour** | 3,15,900 | 4,860 | 3,15,900/4,860 = **₹ 65** |
| **Overheads** | 1,74,960 | 4,860 | 1,74,960/4,860 = **₹ 36** |
#### Approach
Under FIFO, divide only this period's labour cost by this period's labour equivalent units (completing the opening WIP, units started and finished, and the closing WIP).

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: C
tags: cma.std.material, cma.std.labour
difficulty: medium
q: 2-3
a: 2
---
#### Question
Material Cost Variance and Labour Cost Variance for equivalent units is:
#### Options
(A) ₹ 40,800 F and ₹ 40,800 A respectively
(B) ₹ 28,000 A and ₹ 40,800 F respectively
(C) ₹ 40,800 A and ₹ 24,300 A respectively
(D) ₹ 28,000 F and ₹ 25,000 F respectively
#### Answer
**(C) ₹ 40,800 A and ₹24,300 A respectively**

**Material Cost Variance for Equivalent units**

Actual Material Cost = 2,95,800 (3,00,000 – 4,200)

Standard Price = ₹ 50

Equivalent units of Material = 5,100

Standard cost = 5,100 × 5 = ₹ 2,55,000

**Material Cost Variance** = Standard Cost – Actual Cost

= (2,55,000 – 2,95,800)

= ₹40,800 Adverse

**Labour Cost Variance for Equivalent units**

Actual cost of labour on completed units = ₹ 3,15,900

Standard rate per unit = ₹ 60

Standard cost = 4,860 × 60 = ₹ 2,91,600

**Labour Cost Variance** = Standard Cost – Actual Cost

= (₹ 2,91,600 - ₹ 3,15,900)

= ₹ 24,300 (A)
#### Approach
Value the period's equivalent units at standard (₹ 50 of material, 3 hours at ₹ 20 of labour per unit) and compare with the actual cost of the period.

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: D
tags: cma.std.setting
difficulty: easy
q: 3
a: 2
---
#### Question
Standard cost of 4,500 units:
#### Options
(A) ₹ 7,00,900
(B) ₹ 7,90,860
(C) ₹ 5,15,600
(D) ₹ 6,30,000
#### Answer
**(D) ₹ 6,30,000**

Standard Cost per Unit

Material: = 50

Labour: 3 hrs × 20 = 60

Overhead Costs = 30

Total Standard Cost = ₹140 per unit

Standard Cost of 4,500 Units

= 4,500 × 140

= ₹6,30,000

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: C
tags: cma.proc.eu, cma.proc.accounts
difficulty: medium
q: 3
a: 3
---
#### Question
Actual cost of 4,500 units:
#### Options
(A) ₹ 5,86,500
(B) ₹ 7,15,500
(C) ₹ 7,00,900
(D) ₹ 6,30,000
#### Answer
**(C) ₹7,00,900**

**Completion of Opening WIP**

Labour: 400 × 65 = 26,000

OH: 400 × 36 = 14,400

Add: opening cost: = 1,04,000

= **₹ 1,44,400**

**Started & Completed (3,500 units)**

Material = 3,500 × 58 = 2,03,000

Labour = 3,500 × 65 = 2,27,500

OH = 3,500 × 36 = 1,26,000

= **₹ 5,56,500**

**Total Cost of 4,500 Units**

= 1,44,400 + 5,56,500

= **₹ 7,00,900**
#### Approach
Under FIFO the 4,500 completed units are the opening WIP (its opening value plus the cost of finishing it) and the units started and finished this period.

---
case: c2
qno: 6-10
label: Case Scenario 2
q: 3-4
---
#### Case
A manufacturing company is in the process of preparing its cost sheet for the financial year. The management wants to analyze the efficiency of production operations and requires detailed computation of key cost components such as material consumed, prime cost, cost of production, etc.

During the year, the company incurred various expenditures related to raw materials, labour, factory operations, and administrative activities. It also maintained records of inventory levels and work-in-process to ensure accurate cost determination.

The following information has been gathered from the company’s records:

| | | Amount (₹) |
|---|---|---:|
| (i) | Repair & maintenance paid for plant & machinery | 9,80,500 |
| (ii) | Insurance premium paid for inventories | 26,000 |
| (iii) | Insurance premium paid for plant & machinery | 96,000 |
| (iv) | Raw materials purchased | 64,00,000 |
| (v) | Opening stock of raw materials | 2,88,000 |
| (vi) | Closing stock of raw materials | 4,46,000 |
| (vii) | Wages paid | 23,20,000 |
| (viii) | Value of opening Work-in-process | 4,06,000 |
| (ix) | Value of closing Work-in-process | 6,02,100 |
| (x) | Quality control cost for the products in manufacturing process | 86,000 |
| (xi) | Research & development cost for improvement in production process | 92,600 |
| (xii) | Administrative cost for: | |
| | - Factory & production | 9,00,000 |
| | - Others | 11,60,000 |
| (xiii) | Amount realised by selling scrap generated during the manufacturing process | 9,200 |
| (xiv) | Packing cost necessary to preserve the goods for further processing | 10,200 |
| (xv) | Salary paid to Director (Technical) | 8,90,000 |
| (xvi) | Television programme sponsorship cost | 5,00,000 |

As a production manager you are required to answer the following questions (MCQs 6 to 10):

---
item: m6
case: c2
qno: 6
marks: 2
type: mcq
key: B
tags: cma.sheet.mfg
difficulty: easy
q: 4
a: 3
---
#### Question
What is the material consumed by the company?
#### Options
(A) ₹ 60,42,000
(B) ₹ 62,42,000
(C) ₹ 64,00,000
(D) ₹ 59,88,000
#### Answer
**(B) ₹ 62,42,000**

---
item: m7
case: c2
qno: 7
marks: 2
type: mcq
key: B
tags: cma.sheet.mfg
difficulty: easy
q: 4
a: 3
---
#### Question
What is the prime cost of the company?
#### Options
(A) ₹ 82,62,000
(B) ₹ 85,62,000
(C) ₹ 88,82,000
(D) ₹ 90,00,000
#### Answer
**(B) ₹ 85,62,000**

---
item: m8
case: c2
qno: 8
marks: 2
type: mcq
key: D
tags: cma.sheet.mfg
difficulty: medium
q: 4
a: 3
---
#### Question
Calculate the work cost after adjusting Work-in-Progress.
#### Options
(A) ₹ 96,64,500
(B) ₹ 98,70,500
(C) ₹ 92,58,400
(D) ₹ 94,68,400
#### Answer
**(D) ₹ 94,68,400**
#### Approach
Factory overheads here are only the plant's repairs and insurance and the inventories' insurance; quality control, R&D and factory administration come after the WIP adjustment.

---
item: m9
case: c2
qno: 9
marks: 2
type: mcq
key: C
tags: cma.sheet.mfg
difficulty: medium
q: 5
a: 3
---
#### Question
What is the cost of production?
#### Options
(A) ₹ 1,02,48,000
(B) ₹ 1,03,86,000
(C) ₹ 1,05,48,000
(D) ₹ 1,07,20,000
#### Answer
**(C) ₹ 1,05,48,000**

---
item: m10
case: c2
qno: 10
marks: 2
type: mcq
key: A
tags: cma.sheet.mfg
difficulty: medium
q: 5
a: 3-4
---
#### Question
What is the cost of sales?
#### Options
(A) ₹ 1,30,98,000
(B) ₹ 1,25,98,000
(C) ₹ 1,20,48,000
(D) ₹ 1,28,90,000
#### Answer
**(A) ₹ 1,30,98,000**

**Working Note:**

**Calculation of Cost of Production of A Ltd. for the period…..**

| Particulars | Amount (₹) |
|---|---:|
| Raw materials purchased | 64,00,000 |
| *Add:* Opening stock | 2,88,000 |
| *Less:* Closing stock | (4,46,000) |
| **Material consumed** | **62,42,000.00** |
| Wages paid | 23,20,000.00 |
| **Prime cost** | **85,62,000.00** |
| Repair and maintenance cost of plant & machinery | 9,80,500.00 |
| Insurance premium paid for inventories | 26,000.00 |
| Insurance premium paid for plant & machinery | 96,000.00 |
| **Gross Work Cost** | **96,64,500.00** |
| *Add:* Opening value of W-I-P | 4,06,000.00 |
| *Less:* Closing value of W-I-P | (6,02,100) |
| **Work Cost** | **94,68,400.00** |
| Quality control cost | 86,000.00 |
| Research & development cost | 92,600.00 |
| Administrative overheads related with factory and production | 9,00,000.00 |
| *Less:* Amount realised by selling scrap | (9,200) |
| *Add:* Primary packing cost | 10,200.00 |
| **Cost of Production** | **1,05,48,000.00** |
| Administrative overheads (Other) | 11,60,000.00 |
| Salary paid to Director (Technical) | 8,90,000 |
| Television programme sponsorship cost | 5,00,000 |
| **Cost of Sales** | **1,30,98,000.00** |

---
item: m11
qno: 11
marks: 2
type: mcq
key: B
tags: cma.emp.direct
difficulty: easy
q: 5
a: 4-5
---
#### Question
The following expenditures were incurred in P.L. Ltd. for the month of March, 2025:

| | Particulars | Amount (₹) |
|---|---|---:|
| (i) | Product blueprint cost | 1,90,000 |
| (ii) | Paid for power & fuel | 3,00,000 |
| (iii) | Wages paid to factory workers | 80,000 |
| (iv) | Hire charges paid for machinery used | 50,000 |
| (v) | Commission paid to marketing manager | 35,000 |
| (vi) | Salary to office attendants | 45,000 |
| (vii) | Fee paid to technician hired in factory | 96,000 |
| (viii) | Administrative overheads | 89,000 |

Calculate the direct expenses for the month.
#### Options
(A) ₹ 7,16,000
(B) ₹ 6,36,000
(C) ₹ 7,40,000
(D) ₹ 6,71,000
#### Answer
**(B) ₹ 6,36,000**

**Calculation of Direct Expenses:**

| | Particulars | Amount (₹) |
|---|---|---:|
| (i) | Product blueprint cost | 1,90,000 |
| (ii) | Paid for power & fuel | 3,00,000 |
| (iii) | Wages paid to factory workers | NIL |
| (iv) | Hire charges paid for machinery used | 50,000 |
| (v) | Commission paid to marketing manager | NIL |
| (vi) | Salary to office attendants | NIL |
| (vii) | Fee paid to technician hired in factory | 96,000 |
| (viii) | Administrative overheads | NIL |
| | | 6,36,000 |

Notes:

a. Wages paid to factory workers is direct employee cost.

b. Commission paid to marketing manager come under selling expenses.

c. Salary to office attendants is classified under office and administration cost.

d. Administrative overhead is indirect expense.
#### Approach
A direct expense is a cost other than materials and wages that can be traced to the product; sort each item into direct expense, employee cost or overhead.

---
item: m12
qno: 12
marks: 2
type: mcq
key: B
tags: cma.bud.ratios
difficulty: easy
q: 6
a: 5
---
#### Question
Standard hours required for doing a work is 100 hours and budgeted hours is 120 hrs. while the same work is actually completed by workers in 110 hrs. You are required to calculate the activity ratio:
#### Options
(A) 109.09%
(B) 83.33%
(C) 90.90%
(D) 110%
#### Answer
**(B) 83.33%**

Activity Ratio = $\dfrac{\text{Standard Hours}}{\text{Budgeted Hours}} \times 100$

= 83.33%

---
item: m13
qno: 13
marks: 2
type: mcq
key: A
tags: cma.svc.others
difficulty: easy
q: 6
a: 5
---
#### Question
BCIC Ltd. is a insurance company. It launched a new term insurance policy Names as Protection Plus. The total cost for the policy during the year is ₹ 1,60,00,000. Total number of policies sold is 410 and total insured value of policies is ₹ 920 crore.

What is the cost per rupee of insured value?
#### Options
(A) ₹ 0.0017
(B) ₹ 0.18
(C) ₹ 575
(D) ₹ 2.24
#### Answer
**(A) ₹ 0.0017**

Cost per rupee of insured value

= Total Cost/ Total Insured Value

= 1.6 cr/920 cr = ₹ 0.0017

---
item: m14
qno: 14
marks: 2
type: mcq
key: B
tags: cma.joint.apportion
difficulty: medium
q: 6-7
a: 5-6
---
#### Question
ICT Ltd. belongs to pharmaceutical industries. The chemical process that ICT Ltd. operates convert one compound into three category of medicines viz. BetaTab, Folick and TegriCap. Though BetaTab and Folick are already converted to final product at split-off point, Tegricap needs further processing along with addition of new compound with it. The market for BetaTab and Folick is highly active, thus the production is sold at split-off point, however, Tegricap can be sold only after further processing.

Following information is provided for the current year:

| Products | Quantity sold (tons) | Selling price per ton (₹) |
|---|---:|---:|
| BetaTab | 372 | 7,500 |
| Folick | 1,054 | 5,625 |
| TegriCap | 1,472 | 3,750 |

The selling price is expected to remain the same for coming years.

The total joint manufacturing costs till split-off point is ₹ 62,50,000 and the amount spent for further processing w.r.t. Tegricap is ₹ 31,00,000

The details regarding closing inventories are as follows:

| Products | Completed units (tons) |
|---|---:|
| BetaTab | 360 |
| Folick | 120 |
| TegriCap | 50 |

You are required to COMPUTE the joint cost allocated to BetaTab, Folick and TegriCap using Net realizable value (NRV) method.
#### Options
(A) BetaTab- ₹ 15,65,481, Folick - ₹ 33,26,647 and TegriCap - ₹ 13,57,872
(B) BetaTab - ₹ 23,33,985, Folick - ₹ 28,07,478 and TegriCap - ₹ 11,08,537
(C) BetaTab - ₹ 19,27,533, Folick - ₹ 23,18,570 and TegriCap - ₹ 20,03,897
(D) BetaTab - ₹ 11,08,537, Folick - ₹ 28,07,478 and TegriCap - ₹ 23,33,985
#### Answer
**(B) BetaTab - ₹ 23,33,985, Folick - ₹ 28,07,478 and TegriCap - ₹ 11,08,537**

**Calculation of total production of BetaTab, Folick and TegriCap**

| Products | Quantity sold (tons) | Quantity of closing inventories (tons) | Total production |
|---|---:|---:|---:|
| (1) | (2) | (3) | (4) = [(2) + (3)] |
| BetaTab | 372 | 360 | 732 |
| Folick | 1,054 | 120 | 1,174 |
| TegriCap | 1,472 | 50 | 1,522 |

Calculation of Net Realisable Value (at split-off point)

| | Products | | | Total (₹) |
|---|---:|---:|---:|---:|
| | **BetaTab** | **Folick** | **TegriCap** | |
| Total Production (tons) (A) | 732 | 1,174 | 1,522 | |
| Selling price per ton (₹) (B) | 7,500 | 5,625 | 3,750 | |
| Final sales value of total production (₹) [(A) x (B)] | 54,90,000 | 66,03,750 | 57,07,500 | 1,78,01,250 |
| Less: Additional cost (₹) | - | - | (31,00,000) | (31,00,000) |
| **Net realisable value (₹) (at split-off point)** | 54,90,000 | 66,03,750 | 26,07,500 | 1,47,01,250 |

Joint cost allocated using Net Realisable Value (at split-off point):

$\dfrac{\text{Total Joint cost}}{\text{Total Net Realisable Value}}$ × Net Realisable Value of each product

BetaTab = $\left(\dfrac{\text{₹ } 62{,}50{,}000}{\text{₹ } 1{,}47{,}01{,}250}\right)$ x ₹ 54,90,000

= ₹ 23,33,985

Folick = $\left(\dfrac{\text{₹ } 62{,}50{,}000}{\text{₹ } 1{,}47{,}01{,}250}\right)$ x ₹ 66,03,750

= ₹ 28,07,478

TegriCap = $\left(\dfrac{\text{₹ } 62{,}50{,}000}{\text{₹ } 1{,}47{,}01{,}250}\right)$ x ₹ 26,07,500

= ₹ 11,08,537
#### Approach
Apportion on the whole production (units sold plus closing inventory), and take TegriCap's further-processing cost off its sales value before using NRV weights.

---
item: m15
qno: 15
marks: 2
type: mcq
key: C
tags: cma.unit.batch
difficulty: easy
q: 7
a: 6
---
#### Question
A company manufactures eye-glass frames at the rate of 1,200 frames per month. The company wants to determine the most economical production batch size to minimize total setup and holding costs.

The following information is available:

- Setup cost per batch = ₹ 7,200
- Cost per unit = ₹ 3,240
- Carrying cost = 10% per annum (including storage, cost of capital, and obsolescence)

What is the Economic Batch Quantity (EBQ)?
#### Options
(A) 230 frames
(B) 566 frames
(C) 800 frames
(D) 1,200 frames
#### Answer
**(C) 800 frames**

EBQ For frames manufacturing

EBQ = $\sqrt{\dfrac{2DS}{C}}$

Where, D = Annual demand for the product = 1,200 X 12 = 14,400 frames

S = Setting up cost per batch = ₹ 7,200

C = Carrying cost per unit of production = 10% of ₹ 3,240 = ₹ 324

EBQ = $\sqrt{\dfrac{2 \times 14{,}400 \times 7{,}200}{324}}$ = 800 frames
#### Approach
Put annual demand (not monthly) into the EBQ formula, and the carrying cost per unit per year (10% of the unit cost).

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.job.job, cma.emp.idle, cma.emp.payroll
difficulty: medium
q: 8
a: 7
---
#### Question
A factory operates 8 hours per day with 6 working days in a week. The worker is paid @ ₹ 500 per day as basic plus 40% dearness allowance. Overtime rate is payable at double the normal hourly rate. The worker is allowed half an hour break for lunch and two tea breaks of 15 minutes each per day. During last week, worker X was present for 5 days. To meet out demand, X has done overtime for 4 hours. X has spent 60% time on Job A and 40% time on Job B. The overtime worked was for Job A only.

Direct material cost incurred are :

Job A : ₹ 5,000

Job B : ₹ 7,500

Overheads are applied @ ₹ 15 per labour hour.

You are required to CALCULATE the total cost of Job A and Job B.
#### Answer
Calculation of total cost of Job A and Job B

| | Job A | Job B |
|---|---:|---:|
| **Particulars** | **Amount (in ₹)** | **Amount (in ₹)** |
| Direct Material Cost (Given) | 5,000 | 7,500 |
| Labour Cost (see working note) | 2,900 | 1,400 |
| Overheads | 375 (21 hrs + 4 hrs x ₹15 per hour) | 210 (14 hrs x ₹ 15 per hour) |
| Total | 8,275 | 9,110 |

**Working Note:**

Normal time worked = (8 hrs – ½ hr – ½ hr) x 5day = 35 Hrs

Normal hourly wages earned

= (₹ 500 Basic + ₹ 200 D.A) x 5 days /35 Hrs

= ₹ 100 per hour

Overtime Wages = 2 x 100 per hour = ₹ 200 per hour

Cost of wages for Job A: = (35 hrs x 100 x 60%) + 4 hrs x 200

= ₹ 2,100 + ₹ 800

= ₹ 2,900

Cost of Wages of Job B: = (35 hrs x 100 x 40%)

= ₹ 1,400
#### Approach
Work out the paid working hours per day after the breaks, then the normal hourly rate from basic plus DA; overtime and its premium belong to Job A alone.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.sys.recon
difficulty: medium
q: 8-9
a: 7-8
---
#### Question
A manufacturing company disclosed a net loss of ₹ 6,40,000 as per their cost accounts for the year ended 31st March, 2025. However, the financial accounts showed a net profit of ₹ 45,000 for the same period.

Upon scrutiny of both sets of accounts, the following differences were identified:

| Particulars | Amount (in ₹) |
|---|---:|
| (i) Transfer fee received | 23,000 |
| (ii) Interest on investment received | 3,00,000 |
| (iii) Goodwill written-off | 38,000 |
| (iv) Depreciation | |
| – Charged in Financial books | 5,00,000 |
| – Recovered in Cost books | 6,00,000 |
| (v) Opening stock of raw material | |
| – Cost books | 4,50,000 |
| – Financial books | 4,82,000 |
| (vi) Closing stock of finished goods | |
| – Cost books | 12,80,000 |
| – Financial books | 13,56,000 |
| (vii) Notional rent of own premises recorded in Cost accounts | 3,20,000 |
| (viii) Factory overheads | |
| – Cost books | 2,50,000 |
| – Financial books | 1,94,000 |
| (ix) Income-tax provided | 1,20,000 |

You are required to PREPARE Memorandum Reconciliation Account.
#### Answer
**Memorandum Reconciliation Account**

| Debit | Amount (₹) | Credit | Amount (₹) |
|---|---:|---|---:|
| Net loss as per costing books | 6,40,000 | Transfer fee recorded in financial books | 23,000 |
| Goodwill written off not recorded in cost books | 38,000 | Interest on investment not included in costs | 3,00,000 |
| Under valuation of opening stock in cost accounts | 32,000 | Depreciation overcharge in cost books | 1,00,000 |
| Income tax not provided in costs | 1,20,000 | Under valuation of closing stock (finished goods) in cost accounts | 76,000 |
| Net profit as per financial books | 45,000 | Notional rent charges in cost books | 3,20,000 |
| | | Factory overheads over recovered in cost books | 56,000 |
| **Total** | **8,75,000** | **Total** | **8,75,000** |
#### Approach
Start from the costing loss and ask, item by item, whether it made the financial profit higher (credit side) or lower (debit side) than the cost result.

---
item: q1c
qno: 1
part: (c)
marks: 4
type: descriptive
tags: cma.svc.transport
difficulty: easy
q: 9
a: 8
---
#### Question
A transport truck starts with a load of 30 MT of goods from Delhi. It unloads 12 MT at Agra and the remaining goods at Jaipur.

On its return journey, the truck carries 20 MT of goods from Jaipur back to Delhi. The distances between Delhi to Agra, Agra to Jaipur, and Jaipur to Delhi are 230 kms, 240 kms, and 280 kms respectively.

COMPUTE “Absolute MT-Kilometer” and “Commercial MT – Kilometer”.

(MT = Metric Ton or Ton).
#### Answer
Weighted Average or Absolute basis – MT – Kilometer:

= (30 MT × 230 Kms) + (18 MT × 240 Kms) + (20 MT × 280 Kms)

= 6,900 + 4,320 + 5,600 = **16,820 MT - Kilometer**

**Simple Average or Commercial basis – MT – Kilometer:**

= [{(30 + 18 + 20) / 3} MT × {(230 + 240 + 280) Kms}]

= 22.667 MT × 750 Kms = **17,000 MT – Kilometer (approx.)**

---
item: q2a
qno: 2
part: (a)
marks: 8
type: descriptive
tags: cma.std.material
difficulty: hard
q: 9
a: 8-9
---
#### Question
COMPUTE the missing data indicated by the question marks from the following:

| Particulars | A | B |
|---|---:|---:|
| Standard Price/ unit | ₹ 12 | ₹ 15 |
| Actual Price/ unit | ₹ 15 | ₹ 20 |
| Standard Input (kgs.) | 50 | ? |
| Actual Input (kgs.) | ? | 70 |
| Material Price Variance | ? | ? |
| Material Usage Variance | ? | ₹ 300 Adverse |
| Material Cost Variance | ? | ? |

Material mix variance for both products together was ₹ 45 Adverse.
#### Answer
**(i)** Standard input (kgs.) of Material- B:

Material usage variance = Std. Rate (Std. Quantity – Actual Quantity)

₹ 300 Adverse = ₹ 15 (SQ – 70)

Or, -300 = 15 SQ – 1,050

Or, SQ = 50 kgs.

**(ii) Actual Input (kgs) of Material- A:**

Let the actual input in for Material-A is X kgs.

Material Mix Variance = Std. Price (Actual Quantity in Std. mix – Actual Quantity)

Or, Material Mix Variance (A+B) = Material Mix Variance for Material - A + Material Mix Variance for Material -B

Or, - 45 = $[\text{₹ } 12\{(\dfrac{X+70}{2}) - X\}] + [\text{₹ } 15\{(\dfrac{X+70}{2}) - 70\}]$

Or, - 45 = $[\text{₹ } 12\{\dfrac{X+70-2X}{2}\}] + [\text{₹ } 15\{\dfrac{X+70-140}{2}\}]$

Or, - 45 = $[\text{₹ } 12\{\dfrac{70-X}{2}\}] + [\text{₹ } 15\{\dfrac{X-70}{2}\}]$

Or, - 45 = $[-6X + 420] + [\dfrac{15X - 1{,}050}{2}]$

Or, - 45 = $[\dfrac{-12X + 840 + 15X - 1{,}050}{2}]$

Or, - 90 = 3X − 210

Or, X = $\dfrac{120}{3}$ = 40 kgs.

**(iii)** (a) Material Price Variance of A = Actual Quantity (Std. Rate – Actual Rate)

= 40 kg. (12 – 15) = ₹ 120 Adverse

(b) Material Price Variance of B = 70 kg. (15 – 20) = ₹ 350 Adverse

**(iv)** Material usage variance of A

= Std. Rate (Std. Quantity – Actual Quantity)

= 12 (50 – 40) = ₹ 120 Favourable

**(v)** (a) Material Cost variance of A = Std. Cost – Actual Cost

= (50 kgs. × ₹ 12) – (40 kgs. × ₹ 15)

= 600 – 600 = Nil

(b) Material Cost variance of B

= (50 kgs. × ₹ 15) – (70 kgs. × ₹ 20)

= 750 – 1,400 = ₹ 650 Adverse
#### Approach
Material B's usage variance gives its standard quantity at once. For A's actual input, write the mix variance of both materials, with the standard mix (from the two standard inputs) applied to the unknown actual total, and solve for X.

---
item: q2b
qno: 2
part: (b)
marks: 6
type: descriptive
tags: cma.bud.flexible
difficulty: easy
q: 9-10
a: 9-10
---
#### Question
Pentax Limited has prepared its expense budget for 20,000 units in its factory for the year 2026 as detailed below:

| | (₹ per unit) |
|---|---:|
| Direct Materials | 50 |
| Direct Labour | 20 |
| Variable Overhead | 15 |
| Direct Expenses | 6 |
| Selling Expenses (20% fixed) | 15 |
| Factory Expenses (100% fixed) | 7 |
| Administration expenses (100% fixed) | 4 |
| Distribution expenses (85% variable) | 12 |
| Total | 129 |

PREPARE an expense budget for the production of 15,000 units and 18,000 units.
#### Answer
**Expense Budget of M/s Pentax Ltd.**

| Particulars | 20,000 Units (₹) | 15,000 Units (₹) | 18,000 Units (₹) |
|---|---:|---:|---:|
| Direct Material | 10,00,000 (20,000 x 50) | 7,50,000 (15,000 x 50) | 9,00,000 (18,000 x 50) |
| Direct Labour | 4,00,000 (20,000 x 20) | 3,00,000 (15,000 x 20) | 3,60,000 (18,000 x 20) |
| Variable Overhead | 3,00,000 (20,000 x 15) | 2,25,000 (15,000 x 15) | 2,70,000 (18,000 x 15) |
| Direct Expenses | 1,20,000 (20,000 x 6) | 90,000 (15,000 x 6) | 1,08,000 (18,000 x 6) |
| Selling Expenses (Variable)\* | 2,40,000 (20,000 x 12) | 1,80,000 (15,000 x 12) | 2,16,000 (18,000 x 12) |
| Selling Expenses (Fixed)\* (3 x 20,000) | 60,000 | 60,000 | 60,000 |
| Factory Expenses (Fixed) (7 x 20,000) | 1,40,000 | 1,40,000 | 1,40,000 |
| Administration Expenses (Fixed) (4 x 20,000) | 80,000 | 80,000 | 80,000 |
| Distribution Expenses (Variable)\*\* | 2,04,000 (10.20 x 20,000) | 1,53,000 (10.20 x 15,000) | 1,83,600 (10.20 x 18,000) |
| Distribution Expenses (Fixed)\*\* (1.80 x 20,000) | 36,000 | 36,000 | 36,000 |
| | 25,80,000 | 20,14,000 | 23,53,600 |

\*Selling Expenses: Fixed cost per unit = ₹ 15 x 20% = ₹ 3

Fixed Cost = ₹ 3 x 20,000 units = ₹ 60,000

Variable Cost Per unit = ₹ 15 – ₹ 3 = ₹ 12

\*\*Distribution Expenses: Fixed cost per unit = ₹ 12 x 15% = ₹ 1.80

Fixed Cost = ₹ 1.80 x 20,000 units = ₹ 36,000

Variable cost per unit = ₹ 12 – ₹ 1.80 = ₹ 10.20
#### Approach
Split the semi-variable lines first: their fixed part is a total for the year (rate × 20,000 units) that stays the same at every level.

---
item: q3a
qno: 3
part: (a)
marks: 5
type: descriptive
tags: cma.mat.ratios
difficulty: medium
q: 10
a: 10-11
---
#### Question
The following information has been extracted from the books of AB Ltd. for the year ended 31st March, 2025:

| Particulars | Material X | Material Y |
|---|---|---|
| Average stock (kg.) | 59,400 kgs | 1,00,800 kgs |
| Position of stock | Closing stock is more than opening stock by 10,800 kg. | Opening stock is less than closing stock by 28,800 kg. |
| Inventory turnover ratio | 6 times | 8 times |

You are required to :

(i) CALCULATE the quantity of each material purchased during the year and value of opening and closing stock.

(ii) CALCULATE the number of days for which the average inventory is held in respect of each material (Assume 360 days in a year).

(iii) COMMENT on the movement of inventory of each material.
#### Answer
**(i)** Inventory Turnover Ratio (X) = Material Consumed / Average Stock

6 = Material Consumed / 59,400

Material consumed (X) = 3,56,400 kg. (59,400 x 6)

Material Y = Material Consumed / Average Stock

8 = Material Consumed / 1,00,800

Material Consumed = 8,06,400 kg. (1,00,800 x 8)

Average Stock = $\dfrac{\text{Opening stock + Closing Stock}}{2}$

Let opening stock is assumed to A Kg.

Closing stock will be = A+10,800

Material X = $\dfrac{A+A+10{,}800}{2}$ = 59,400 Kgs

2A = 1,08,000

A = 54,000 Kg.

Opening Stock X = 54,000 Kg.

Closing Stock X = 54,000 + 10,800 = 64,800 Kgs.

Material Y = $\dfrac{A+A+28{,}800}{2}$ = 1,00,800 Kgs.

2A =1,72,800

A = 86,400 = Opening Stock Y

Closing Stock Y = 86,400 + 28,800 = 1,15,200 Kg.

Purchases = Material Consumed + Closing Stock - Opening Stock

Material X = 3,56,400 + 64,800-54,000

= 3,67,200 Kgs.

Material Y = 8,06,400 + 1,15,200 -86,400

= 8,35,200 Kgs.

**(ii) Number of days for which the average inventory is held:**

Number of Days in a year/ Inventory turnover ratio

Material X = 360/6 = 60 days

Material Y = 360/8 = 45 days

**(iii) Comments:**

Material Y is fast moving than that of Material X because it was held for 45 days against 60 days of X material.
#### Approach
The turnover ratio times average stock gives the quantity consumed; the opening and closing stocks follow from their average and their difference, and purchases from consumption adjusted for the stocks.

---
item: q3b
qno: 3
part: (b)
marks: 9
type: descriptive
tags: cma.oh.secondary, cma.oh.primary
difficulty: hard
q: 10-11
a: 12-13
---
#### Question
The Union Ltd. has the following account balances and distribution of direct charges on 31st March, 2025.

| | Total | Production Depts. | | Service Depts. | |
|---|---:|---:|---:|---:|---:|
| | | **Machine Shop** | **Packing** | **General Plant** | **Stores** |
| Allocated Overheads: | (₹) | (₹) | (₹) | (₹) | (₹) |
| Indirect labour | 29,000 | 8,000 | 6,000 | 4,000 | 11,000 |
| Maintenance Material | 9,900 | 3,400 | 1,600 | 2,100 | 2,800 |
| Misc. supplies | 5,900 | 1,500 | 2,900 | 900 | 600 |
| Supervisor’s salary | 16,000 | -- | -- | 16,000 | -- |
| Cost & payroll salary | 80,000 | -- | -- | 80,000 | -- |
| Overheads to be apportioned: | | | | | |
| Power | 78,000 | | | | |
| Rent | 72,000 | | | | |
| Fuel and Heat | 60,000 | | | | |
| Insurance | 12,000 | | | | |
| Taxes | 8,400 | | | | |
| Depreciation | 1,20,000 | | | | |

The following data were compiled by means of the factory survey made in the previous year:

| | Floor Space | Radiator Section | No. of employees | Investment | H.P. hours |
|---|---:|---:|---:|---:|---:|
| Machine Shop | 2,000 Sq. ft. | 45 | 20 | 8,00,000 | 3,500 |
| Packing | 800 Sq. ft. | 90 | 12 | 2,40,000 | 500 |
| General Plant | 400 Sq. ft. | 30 | 4 | 80,000 | - |
| Stores & maintenance | 1,600 Sq. ft. | 60 | 8 | 1,60,000 | 1,000 |

Expenses charged to the stores departments are to be distributed to the other departments by the following percentages:

Machine shop 50%; Packing 20%; General Plant 30%;

General Plant overheads is distributed on the basis of number of employees.

(a) PREPARE an overhead distribution statement with supporting schedules to show computations and basis of distribution.

(b) DETERMINE the service department distribution by simultaneous equation method.
#### Answer
**Overhead Distribution Statement**

| | Production Departments | | Service Departments | |
|---|---:|---:|---:|---:|
| | **Machine Shops** | **Packing** | **General Plant** | **Stores** |
| Allocated Overheads: | (₹) | (₹) | (₹) | (₹) |
| Indirect labour | 8,000 | 6,000 | 4,000 | 11,000 |
| Maintenance Material | 3,400 | 1,600 | 2,100 | 2,800 |
| Misc. supplies | 1,500 | 2,900 | 900 | 600 |
| Supervisor’s salary | -- | -- | 16,000 | -- |
| Cost & payroll salary | -- | -- | 80,000 | -- |
| Total allocated overheads | 12,900 | 10,500 | 1,03,000 | 14,400 |
| *Add:* Apportioned Overheads (As per Schedule below) | 1,84,350 | 70,125 | 22,775 | 73,150 |
| | 1,97,250 | 80,625 | 1,25,775 | 87,550 |

**Schedule of Apportionment of Overheads**

| Item of Cost | Basis | Production Departments | | Service Departments | |
|---|---|---:|---:|---:|---:|
| | | **Machine Shops (₹)** | **Packing (₹)** | **General Plant (₹)** | **Stores (₹)** |
| Power | HP hours (7 : 1 : - : 2) | 54,600 | 7,800 | -- | 15,600 |
| Rent | Floor space (5 : 2 : 1 : 4) | 30,000 | 12,000 | 6,000 | 24,000 |
| Fuel & Heat | Radiator sec. (3 : 6 : 2 : 4) | 12,000 | 24,000 | 8,000 | 16,000 |
| Insurance | Investment (10 : 3 : 1 : 2) | 7,500 | 2,250 | 750 | 1,500 |
| Taxes | Investment (10 : 3 : 1 : 2) | 5,250 | 1,575 | 525 | 1,050 |
| Depreciation | Investment (10 : 3 : 1 : 2) | 75,000 | 22,500 | 7,500 | 15,000 |
| | | 1,84,350 | 70,125 | 22,775 | 73,150 |

**(b) Re-distribution of Overheads of Service Departments to Production Departments:**

Let, the total overheads of General Plant = ‘a’ and the total overheads of Stores = ‘b’

a = 1,25,775 + 0.3b ..........................................(i)

b = 87,550 + 0.2a ..........................................(ii)

Putting the value of ‘b’ in equation no. (i)

a = 1,25,775 + 0.3 (87,550 + 0.2a)

Or a = 1,25,775 + 26,265 + 0.06a

Or 0.94a = 1,52,040 Or a = 1,61,745 (appx.)

Putting the value of a = 1,61,745 in equation no. (ii) to get the value of ‘b’

b = 87,550 + 0.2 × 1,61,745 = 1,19,899

**Secondary Distribution Summary**

| Particulars | Total (₹) | Machine Shops (₹) | Packing (₹) |
|---|---:|---:|---:|
| Allocated and Apportioned overheads as per Primary distribution | 2,77,875 | 1,97,250.00 | 80,625.00 |
| - General Plant | 1,61,745 | 80,872.50 (1,61,745 × 5/10) | 48,523.50 (1,61,745 × 3/10) |
| - Stores | 1,19,899 | 59,949.50 (1,19,899 × 50%) | 23,979.80 (1,19,899 × 20%) |
| | | 3,38,072.00 | 1,53,128.30 |
#### Approach
Allocate the direct charges, apportion each common overhead on its fitting basis (power on H.P. hours, rent on floor space, heat on radiator sections, insurance, taxes and depreciation on investment), then solve the two service departments' totals as simultaneous equations.

---
item: q4a
qno: 4
part: (a)
marks: 7
type: descriptive
tags: cma.mc.decisions
difficulty: medium
q: 11-12
a: 13-15
---
#### Question
MintCraft Pvt. Ltd. specializes in producing custom-designed award medallions and corporate commemorative coins. The company operates at a monthly production capacity of 12,000 medallions, currently producing and selling 9,000 medallions per month in the domestic market at a price of ₹180 per unit.

The cost data for the month of March, 2025 is as under:

| Cost Elements | Amount (₹) |
|---|---:|
| **Variable Costs (dependent on units produced)** | |
| Direct Materials (for 9,000 units) | 3,42,000 |
| Direct Labour | 3,96,000 |
| **Variable Batch Costs (180 batches x ₹ 550 per batch)** | 99,000 |
| **Fixed Costs** | |
| Fixed Manufacturing Overhead | 3,20,000 |
| Fixed Marketing and Admin | 2,10,000 |

The batch size for MintCraft Pvt. Ltd.’s regular production is 50 medallions per batch. However, the special order received from an international client involves the production of 3,000 medallions, which differs in batch configuration. For this special order, the company is required to manufacture the medallions in 30 batches, with each batch consisting of 100 medallions. The client has offered a price of ₹125 per medallion for this one-time order.

Required:

(i) SHOULD MintCraft Pvt. Ltd. accept the special order? Support your recommendation with relevant calculations and brief justification.

(ii) Assume the plant capacity is reduced to 10,000 units due to scheduled maintenance. The special order must be accepted in full or not at all. SHOULD MintCraft accept the special order under these new conditions? PROVIDE brief reasoning supported by contribution margin analysis.
#### Answer
**Statement of Contribution Margin on Accepting the Special Order of 3,000 Medallions**

| Particulars | ₹ |
|---|---:|
| Sales Revenue (3,000 medallions x ₹ 125 per medallion) | 3,75,000 |
| *Less:* Variable Costs | |
| • Direct Materials (3,000 medallions x ₹ 38 per medallion\*) | 1,14,000 |
| • Direct Labour (3,000 medallions x ₹ 44 per medallion\*) | 1,32,000 |
| • Setups, Quality Control, Handling (30 batches x ₹ 550 per batch) | 16,500 |
| **Contribution Margin** | **1,12,500** |

\*Rates derived from regular cost data:

→ Direct Materials = ₹3,42,000 / 9,000 units = ₹38/unit

→ Direct Labour = ₹3,96,000 / 9,000 units = ₹44/unit

**Decision – When Capacity Is 12,000 Medallions:**

The plant has 3,000 units of unused capacity (12,000 – 9,000), and the special order fits within this limit. Since fixed costs will not increase and the order provides a positive contribution margin of ₹ 1,12,500, MintCraft Pvt. Ltd. should accept the special order, as it will increase operating profit.

**Statement of Contribution Margin Loss Due to Capacity Constraint (When Capacity = 10,000 Medallions):**

| Particulars | ₹ |
|---|---:|
| Gain in Contribution Margin from Special Order | 1,12,500 |
| *Less:* Loss of Contribution Margin on 2,000 Medallions of Regular Sales (W.N.1 & W.N.2) | (1,74,000) |
| Net Loss in Contribution Margin | (61,500) |

**Decision – When Capacity Is 10,000 Medallions:**

Accepting the special order means MintCraft must reduce 2,000 medallions from its regular, higher-priced domestic sales. The loss in contribution from regular sales exceeds the gain from the special order, resulting in a net contribution loss of ₹ 61,500. Therefore, the special order should not be accepted under capacity constraint.

**Working Notes:**

**W.N. 1: Contribution Margin on Current 9,000 Medallions**

| Particulars | ₹ |
|---|---:|
| Sales Revenue (9,000 x ₹ 180) | 16,20,000 |
| *Less:* Variable Costs | |
| • Direct Materials (9,000 x ₹38) | 3,42,000 |
| • Direct Labour (9,000 x ₹44) | 3,96,000 |
| • Setup, Handling, QC (180 batches x ₹550) | 99,000 |
| **Contribution Margin** | **7,83,000** |

**W.N. 2: Contribution Margin on 7,000 Medallions (after reducing 2,000 units)**

| Particulars | ₹ |
|---|---:|
| Sales Revenue (7,000 x ₹180) | 12,60,000 |
| *Less:* Variable Costs | |
| • Direct Materials (7,000 x ₹38) | 2,66,000 |
| • Direct Labour (7,000 x ₹44) | 3,08,000 |
| • Setup, Handling, QC (140 batches x ₹550) | 77,000 |
| **Contribution Margin** | **6,09,000** |

Loss of Contribution Margin = ₹ 7,83,000 – ₹ 6,09,000 = ₹ 1,74,000
#### Approach
Batch costs vary with the number of batches, not units: cost the special order with its own 30 batches. With spare capacity only the order's contribution matters; at 10,000 units, set it against the contribution lost on the regular sales it displaces.

---
item: q4b
qno: 4
part: (b)
marks: 7
type: descriptive
tags: cma.proc.accounts, cma.proc.eu
difficulty: hard
q: 12-13
a: 15-17
---
#### Question
AquaPaints Ltd. is engaged in the manufacturing of water-based paints for the construction industry. The production is carried out in a continuous process, and the company uses the FIFO method to value work-in-process and finished goods.

Due to a system failure during the previous month, part of the production data was lost. However, some key information was recovered, and the management has approached you to help prepare the process account for the affected month.

The following details were retrieved:

- Opening work-in-process: 1,200 litres, 50% complete for mixing labour, and 40% complete for utilities overheads. This WIP was valued at ₹ 36,000.
- Closing work-in-process: 250 litres, 30% complete for mixing labour, and 20% complete for utilities overheads.
- Normal process loss: 6% of total input. Actual loss during the month was 1,500 litres, partly due to equipment malfunction.
- Finished output transferred: 5,000 litres.
- Scrap value of normal loss: ₹ 12 per litre.
- All color pigments and base chemicals are added at the start of the process.
- The cost per equivalent litre for the month was:

| Cost Element | Rate (₹) |
|---|---:|
| Base Chemicals | 21.00 |
| Mixing Labour | 6.00 |
| Utilities Overheads | 8.00 |
| Total | 35.00 |

(a) DETERMINE the quantity (in litres) of base chemicals input during the month.

(b) CALCULATE the normal loss and abnormal loss or gain for the period.

(c) COMPUTE the total cost of base chemicals, mixing labour, and utilities overheads added during the month.

(d) PREPARE the Process Account for the month.
#### Answer
**(a) Calculation of Base Chemicals Input During the Month:**

| Quantities Entering Process | Litres | Quantities Leaving Process | Litres |
|---|---:|---|---:|
| Opening WIP | 1,200 | Transfer to Finished Goods | 5,000 |
| Base Chemicals Input (Bal. Fig.) | 5,550 | Process Losses | 1,500 |
| | | Closing WIP | 250 |
| Total Input | 6,750 | Total Output | 6,750 |

**(b) Calculation of Normal Loss and Abnormal Loss/Gain**

- **Normal Loss** = 6% of Total Input
- = 6% of 6,750 = 405 litres
- **Actual Loss** = 1,500 litres
- **Abnormal Loss** = 1,500 – 405 = 1,095 litres (Abnormal Loss)

**(c) Calculation of Values of Base Chemicals, Labour, and Overheads Added**

| Cost Element | Rate per Litre (₹) | Equivalent Units (Ltr) | Total Cost (₹) |
|---|---:|---:|---:|
| Base Chemicals | 21 | 5,145 | 1,08,045 |
| Mixing Labour | 6 | 5,570 | 33,420 |
| Utilities Overheads | 8 | 5,665 | 45,320 |
| Subtotal | | | 1,86,785 |
| Add: Scrap value of Normal Loss (405 x 12) | | | 4,860 |
| Total Cost Added to Process | | | 1,91,645 |

**Workings: Statement of Equivalent Units (Litres)**

| Input Details | Units | Output details | Units | Equivalent Production | | | | | |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| | | | | **Material** | | **Labour** | | **Overheads** | |
| | | | | **Units** | **(%)** | **Units** | **(%)** | **Units** | **(%)** |
| Opening WIP | 1,200 | Units completed: | | | | | | | |
| Units introduced | 5,550 | - Opening WIP | 1,200 | -- | -- | 600 | 50 | 720 | 60 |
| | | - Fresh inputs | 3,800 | 3,800 | 100 | 3,800 | 100 | 3,800 | 100 |
| | | Normal loss | 405 | -- | -- | -- | -- | -- | -- |
| | | Abnormal loss | 1,095 | 1,095 | 100 | 1,095 | 100 | 1,095 | 100 |
| | | Closing WIP | 250 | 250 | 100 | 75 | 30 | 50 | 20 |
| | 6,750 | | 6,750 | 5,145 | | 5,570 | | 5,665 | |

**(d) Working Note:**

| Particulars | Equivalent Units (EU) | Cost per EU (₹) | Amount (₹) | Amount (₹) |
|---|---:|---:|---:|---:|
| (i) Opening W-I-P completed during the period | | | | |
| Labour | 600 | 6 | 3,600 | |
| Overheads | 720 | 8 | 5,760 | 9,360 |
| Add: Cost of W-I-P at beginning | -- | -- | -- | 36,000 |
| Complete cost of 1,200 litres of opening W-I-P | 1,200 | | | 45,360 |
| (ii) Cost of units introduced and completely processed units | 3,800 | 35 | 1,33,000 | 1,33,000 |
| Cost of 5,000 completed units (i) + (ii) | 5,000 | | | 1,78,360 |
| (iii) Abnormal Loss | 1095 | 35 | 38,325 | 38,325 |
| (iv) Closing W-I-P | | | | |
| Material | 250 | 21 | 5,250 | |
| Labour | 75 | 6 | 450 | |
| Overheads | 50 | 8 | 400 | 6,100 |

**Calculate of Cost of material added:**

| | |
|---|---:|
| Base chemical: | 1,08,045 |
| Add: Realisable value of Scrap: | 4,200 |
| Cost of material added | 1,12,905 |

**Process Account for the Month**

| Particulars | Litres | Amount (₹) | Particulars | Litres | Amount (₹) |
|---|---:|---:|---|---:|---:|
| To Opening WIP | 1,200 | 36,000 | By Finished Goods (Output) | 5,000 | 1,78,360 |
| To Base Chemicals | 5,550 | 1,12,905 | By Normal Loss (405 x 12) | 405 | 4,860 |
| To Mixing Labour | — | 33,420 | By Abnormal Loss (1,095 x 35) | 1,095 | 38,325 |
| To Utilities Overheads | — | 45,320 | By Closing WIP | 250 | 6,100 |
| **Total** | **6,750** | **2,27,645** | **Total** | **6,750** | **2,27,645** |
#### Approach
Total input follows from the outputs (finished, losses, closing WIP); the normal loss is 6% of it. Under FIFO the opening WIP still needs labour and overheads, and the cost added is the equivalent units times the given rates.

---
item: q5a
qno: 5
part: (a)
marks: 9
type: descriptive
tags: cma.abc.compute
difficulty: medium
q: 13-14
a: 17-18
---
#### Question
Jyoti Mfg. Co. has decided to increase the size of the store. It wants the information about the probability of the individual product lines : Lemon, Grapes and Papaya. It provides the following data for the 2025 for each product line:

| Particulars | Lemon | Grapes | Papaya |
|---|---:|---:|---:|
| Revenues (₹) | 79,350 | 2,10,060 | 1,20,990 |
| Cost of goods sold (₹) | 60,000 | 1,50,000 | 90,000 |
| Cost of bottles returned (₹) | 1,200 | 0 | 0 |
| Number of purchase orders placed | 36 | 84 | 36 |
| Number of deliveries received | 30 | 219 | 66 |
| Hours of shelf stocking time | 54 | 540 | 270 |
| Items sold | 12,600 | 1,10,400 | 30,600 |

Jyoti Mfg. Co. also provides the following information for the year 2025:

| Activity | Description of Activity | Total Costs (₹) | Cost Allocation Basis |
|---|---|---:|---|
| Bottle returns | Returning of empty bottles to the store | 1,200 | Direct tracing to product line |
| Ordering | Placing of orders of purchases | 15,600 | 156 purchase orders |
| Delivery | Physical delivery and the receipts of merchandise | 25,200 | 315 deliveries |
| Self-stocking | Stocking of merchandise on store shelves and ongoing restocking | 17,280 | 864 hours of time |
| Customer support | Assistance provided to customers including bagging and checkout | 30,720 | 1,53,600 items sold |

Required

(i) Jyoti Mfg. Co. currently allocates store support costs (all costs other than the cost of goods sold) to the product line on the basis of the cost of goods sold of each product line. CALCULATE the operating income and operating income as the percentage of revenue of each product line.

(ii) If Jyoti Mfg. Co. allocates store support costs (all costs other than the cost of goods sold) to the product lines on the basis of ABC system, CALCULATE the operating income and operating income as the percentage of revenue of each product line.
#### Answer
**(i) Absorption Costing System**

**Operating Income -**

| Particulars | Lemon | Grapes | Papaya | Total |
|---|---:|---:|---:|---:|
| Revenue | 79,350 | 2,10,060 | 1,20,990 | 4,10,400 |
| *Less:* Cost of Goods Sold | 60,000 | 1,50,000 | 90,000 | 3,00,000 |
| *Less:* Store Support Cost (2:5:3) | 18,000 | 45,000 | 27,000 | 90,000 |
| Operating Income | 1,350 | 15,060 | 3,990 | 20,400 |
| Operating Income (%) | 1.70 | 7.17 | 3.30 | 4.97 |

**(ii) ABC System**

**Overhead Allocation Rate -**

| Activity | Total Costs (₹) | Quantity of Cost Allocation Base | Overhead Allocation Rate (₹) |
|---|---:|---|---:|
| Ordering | 15,600 | 156 Purchase Orders | 100.00 |
| Delivery | 25,200 | 315 Delivering Orders | 80.00 |
| Shelf Stocking | 17,280 | 864 Self Stocking Hours | 20.00 |
| Customer Support | 30,720 | 1,53,600 Items Sold | 0.20 |

**Store Support Cost -**

| Particulars | Cost Driver | Lemon | Grapes | Papaya | Total |
|---|---|---:|---:|---:|---:|
| Bottle Returns | Direct | 1,200 | 0 | 0 | 1,200 |
| Ordering | Purchase Orders | 3,600 | 8,400 | 3,600 | 15,600 |
| Delivery | Deliveries | 2,400 | 17,520 | 5,280 | 25,200 |
| Self -Stocking | Hours of time | 1,080 | 10,800 | 5,400 | 17,280 |
| Customer Support | Items Sold | 2,520 | 22,080 | 6,120 | 30,720 |
| Grand Total | | 10,800 | 58,800 | 20,400 | 90,000 |

**Operating Income -**

| Particulars | Lemon | Grapes | Papaya | Total |
|---|---:|---:|---:|---:|
| Revenue | 79,350 | 2,10,060 | 1,20,990 | 410,400 |
| *Less:* Cost of Goods Sold | 60,000 | 1,50,000 | 90,000 | 300,000 |
| *Less:* Store Support Cost | 10,800 | 58,800 | 20,400 | 90,000 |
| Operating Income | 8,550 | 1,260 | 10,590 | 20,400 |
| Operating Income (%) | 10.78 | 0.60 | 8.75 | 4.97 |
#### Approach
Store support cost is everything except cost of goods sold. Under the current method it is shared in the ratio of cost of goods sold; under ABC each activity's rate (cost ÷ driver quantity) is charged on each line's own driver count.

---
item: q5b
qno: 5
part: (b)
marks: 5
type: descriptive
tags: cma.bud.zbb
difficulty: easy
q: 14
a: 18-19
---
#### Question
Briefly EXPLAIN Zero-based Budgeting (ZBB) along with its steps
#### Answer
Zero-based Budgeting (ZBB) is defined as a method of budgeting which requires each cost element to be specifically justified, though the activities to which the budget relates are not being undertaken for the first time. The cost of each activity has to be justified and without justification, the budget allowance is zero.

ZBB involves the following stages:

(i) Identification and description of Decision packages

(ii) Evaluation of Decision packages

(iii) Ranking (Prioritisation) of the Decision packages

(iv) Allocation of resources

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.intro.terms
difficulty: easy
q: 14
a: 19
---
#### Question
SPECIFY the responsibility centre type for each of the following scenarios:

| Sr. No. | Particulars | Type of Responsibility Centre |
|---|---|---|
| (i) | Decentralised branches of an organisation | |
| (ii) | Public sector undertaking of Central Government | |
| (iii) | Customer support department of an e-commerce company | |
| (iv) | Restaurant unit in a hotel | |
| (v) | Reservation department of airlines | |
#### Answer
| Sr. No. | Particulars | Type of Responsibility Centre |
|---|---|---|
| (i) | Decentralised branches of an organisation | Profit Centre |
| (ii) | Public sector undertaking of Central Government | Investment Centre |
| (iii) | Customer support department of an e-commerce company | Cost Centre |
| (iv) | Restaurant unit in a hotel | Profit Centre |
| (v) | Reservation department of airlines | Revenue Centre |
#### Approach
Ask what each manager is held answerable for: costs only, revenues only, profit, or profit together with the capital invested.

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.emp.turnover
difficulty: easy
q: 14-15
a: 19-20
---
#### Question
XYZ Manufacturing Ltd. is facing high employee turnover and a rise in idle time in its Assembly Department. On investigation, it was found that employees often left due to dissatisfaction with working conditions and lack of incentives. The Management decided to revise the wage payment system and introduced regular training sessions to enhance skills and morale.

As the Cost Accountant, answer the following:

(i) IDENTIFY and EXPLAIN two types of employee cost that occur due to employee turnover

(ii) SUGGEST any two factors that can be taken by the company to improve employee productivity apart from training and wage payment revision.
#### Answer
**(i)** Two types of costs which are associated with employee turnover are:

**(a) Preventive Costs:** The cost incurred to prevent employee turnover or keep it as lowest as possible. Cost incurred for prevention of employee turnover includes the following:

(i) Cost of medical benefit provided to the employees;

(ii) Cost incurred on employees’ welfare like pension etc.

(iii) Cost on other benefits with an objective to retain employees.

**(b) Replacement Costs:** These are the costs which arise due to employee turnover. If employees leave soon after they acquire the necessary training and experience of good work, additional costs will have to be incurred on new workers, i.e., cost of recruitment, training and induction, abnormal breakage and scrap and extra wages and overheads due to the inefficiency of new workers.

**(ii) The important factors which must be taken into consideration for increasing employee productivity are as follows:**

1. Employing only those workers who possess the right type of skill.
2. Placing a right type of person to a right job.
3. Taking appropriate measures to avoid the situation of excess or shortage of employees.
4. Carrying out work study for fixation of wages and for the simplification and standardisation of work.

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.unit.batch
difficulty: easy
q: 15
a: 20
---
#### Question
ABC Manufacturing produces a specialized fastener in batches to meet an annual demand of 24,000 units. The accountant is considering whether to increase the batch size. Currently, the setup cost per batch is significant, but the warehouse manager is concerned about rising inventory holding costs if larger batches are produced. After a meeting, the management asks the Cost Accountant to advise on the best approach.

(a) EXPLAIN, with reasons, how batch size affects both setup costs and inventory holding costs.

(b) Briefly DESCRIBE how the company can determine the Economic Batch Quantity (EBQ) and its importance in cost control.
#### Answer
**(i) Explanation of the impact of batch size on setup and holding costs:** If the size is higher, the set up cost may decline due to lesser number of set ups required; but units in inventory will go up leading to higher holding costs. If the lot size is lower, lower inventory holding costs are accomplished but only with higher set up costs.

**(ii) Determination and importance of EBQ:** Economic batch quantity is the size of a batch where total cost of set-up and holding costs are at minimum. This relationship is such that with the higher batch size, holding cost shows a tendency to increase whereas set-up costs show a declining trend. The point where both the cost lines intersect each other represents the lowest cost combination. The economic batch size or Economic Batch Quantity may be determined by calculating the total cost for a series of possible batch sizes and checking which batch size gives the minimum cost. Alternatively, a formula can be derived which is similar to determination of Economic Order Quantity (EOQ). The objective here being to determine the production lot (batch size) that optimizes on both set up and inventory holding costs.

---
item: q6c-or
qno: 6
part: (c)
alt: q6c
marks: 4
type: descriptive
tags: cma.mc.basics
difficulty: easy
q: 15
a: 20
---
#### Question
“Cost-Volume-Profit (CVP) analysis is a vital tool for profit planning and decision-making.”

DISCUSS this statement and EXPLAIN the impact of various changes in cost and volume on profit.
#### Answer
Cost-Volume-Profit (CVP) analysis is a managerial tool showing the relationship between various ingredients of profit planning viz., cost, selling price and volume of activity. As the name suggests, cost volume profit (CVP) analysis is the analysis of three variables, cost, volume and profit. Such an analysis explores the relationship between costs, revenue, activity levels and the resulting profit. It aims at measuring variations in cost and volume.

An understanding of CVP analysis is extremely useful to management in budgeting and profit planning.

It elucidates the impact of the following on the net profit:

(i) Changes in selling prices,

(ii) Changes in volume of sales,

(iii) Changes in variable cost,

(iv) Changes in fixed cost.
