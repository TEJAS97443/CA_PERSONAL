<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-pyq-may2026
paper: p4
kind: pyq
attempt: may2026
qfile: new/p4/pyq-may2026-a.pdf
afile: new/p4/pyq-may2026-a.pdf
paperfile: new/p4/pyq-may2026-q.pdf
choice: q1; any 4 of q2-q6
status: checked
by: tx-04
date: 2026-10-20
q: 1, 8
accept: 4, 1, 2, 5
note: Transcribed from ICAI's Suggested Answers (which reproduce every question with its marks); the question-paper scan is linked as paperfile. p.1 prints the paper's title "PAPER – 4: COST AND MANAGEMENT ACCOUNTING" (the 4 that check.py accepts). ICAI prints each Part II question number once, as "Question N" before the question, and heads its answer "Answer" with no number; check.py counts a question number on the answer side too, so the 1, 2 and 5 it reports there are accepted (4 is covered by the title's accept; 3 and 6 cancel against formula pieces, below). The Part I MCQs carry ICAI's printed (2 Marks) each; their only answer is the Answer Key table on p.7 (no workings), so their Answer sections are empty and a: cites p.7. ICAI's own misprints kept as printed: "4,90,0000" (Direct Materials, Core Manufacturing Process, Case Scenario I); "Al" for "AI" in the text of Case Scenario II and MCQ 7; "Polishing & Shaping" for the second factory-overheads line of Q1(a) (the question-paper booklet prints "Polishing & Finishing"); "in 8 Department I", "in the ratio 60 40" and a "Conversion Costs: ₹ 4,50,000" row in Q3(a); "₹ 11, 94, 200" (spaced) in Q5(b). ICAI's formula images print numbers with spaces ("₹ 6, 00, 000", "18, 000 units"), written here as ordinary numbers.
---
#### Instructions
**PART – I Multiple Choice Questions**

**PART – II Descriptive Questions**

Question No. 1 is compulsory.

Attempt any four questions out of the remaining five questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer.

---
case: c1
qno: 1-5
label: Case Scenario - I
q: 1-2
---
#### Case
Graphite Core Industries established in 1995 is globally recognized for producing reliable, high quality wooden pencils. It begins its production process by sourcing raw graphite, clay, and cedar wood slats, holding them as raw materials.

The following are details about the manufacturing processes of the company:

- Core Manufacturing Process - In this process, the graphite and clay are mixed, extruded into rods and fired to create hardened pencil cores known as lead. Simultaneously, the cedar wood is cut into grooved slats. The output of this process i.e. lead and grooved slat is transferred to the Casing & Shaping Process at 30% profit on the transfer price.
- Casing & Shaping Process In this process, the leads are glued between the grooved slats, shaped into individual pencils and painted. The output of this process i.e. pencils, are then transferred to the Finished Stock at 10% profit on the transfer price. Stock in process is valued at prime cost.

The Production manager has provided the following information for the month of April 2026:

| Particulars | Core Manufacturing Process (₹) | Casing & Shaping Process (₹) |
|---|---:|---:|
| Direct Materials | 4,90,0000 | 8,95,000 |
| Direct Wages | 3,60,000 | 9,50,000 |
| Direct Expenses | 3,40,000 | 3,80,000 |
| Factory Overheads | 3,00,000 | 5,00,000 |

**Additional Information:**

| Particulars | Opening Stock (₹) | Closing Stock (₹) |
|---|---:|---:|
| Core Manufacturing Process | 5,10,000 | 2,50,000 |
| Casing & Shaping Process | 7,75,000 | 6,00,000 |
| Finished Stock of Pencils | 14,00,000 | 10,00,000 |

Finished stock is valued at the price at which it is received from the Casing & Shaping Process. During the month of April 2026, the company sold pencils worth ₹ 75,00,000. Inter process profits included in opening stock for Casing & Shaping Process and Finished Stock are ₹ 75,000 and ₹ 3,20,000 respectively.

On the basis of above case scenario for the month of April 2026, you are required to answer the following MCQs 1 to 5:

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: A
tags: cma.proc.interprocess
difficulty: medium
q: 2
a: 7
---
#### Question
What is the Profit of the Core Manufacturing Process?
#### Options
(A) ₹ 7,50,000
(B) ₹ 5,25,000
(C) ₹ 6,00,000
(D) ₹ 6,75,000
#### Approach
Build the Core Manufacturing process account first: prime cost adjusted for opening and closing stock, plus overheads, gives the cost of the transfer. A 30% profit "on the transfer price" is 30/70 of that cost.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: D
tags: cma.proc.interprocess
difficulty: medium
q: 2
a: 7
---
#### Question
What is the Prime Cost (including Inter Process Profit) of Casing & Shaping Process?
#### Options
(A) ₹ 53,25,000
(B) ₹ 44,00,000
(C) ₹ 46,75,000
(D) ₹ 55,00,000

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: B
tags: cma.proc.interprocess
difficulty: hard
q: 2-3
a: 7
---
#### Question
What is the amount of profit included in the closing stock of Casing & Shaping Process?
#### Options
(A) ₹ 84,000
(B) ₹ 90,000
(C) ₹ 87,000
(D) ₹ 93,000
#### Approach
Stock in process is valued at prime cost, so the profit inside the closing stock is in the same proportion as the inter-process profit inside the process's prime cost (opening stock's profit plus the profit on this month's transfer in).

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: C
tags: cma.proc.interprocess
difficulty: medium
q: 3
a: 7
---
#### Question
What is the transfer price of pencils (including inter process profit) transferred to Finished Stock account from the Casing & Shaping Process?
#### Options
(A) ₹ 57,50,000
(B) ₹ 62,00,000
(C) ₹ 60,00,000
(D) ₹ 64,00,000

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: D
tags: cma.proc.interprocess
difficulty: hard
q: 3
a: 7
---
#### Question
What is the amount of total profit realized by Graphite Core Industries on sale of finished stock of pencils which is transferred to the Costing Profit and Loss Account?
#### Options
(A) ₹ 25,40,000
(B) ₹ 25,25,000
(C) ₹ 25,17,500
(D) ₹ 25,32,500
#### Approach
Realised profit = the profit of each process and of the finished-stock account, adjusted for the unrealised inter-process profit in opening and closing stocks (add back the opening provision, deduct the closing one).

---
case: c2
qno: 6-10
label: Case Scenario - II
q: 3-4
---
#### Case
Safety First Tyre Company is the manufacturer of 'Puncture Resistant' motorcycle tyres. In the manufacturing process, it undertakes three different jobs namely, Belting (B), Extrusion (E) and Vulcanizing (V). All the three jobs require the use of a special machine and also the use of Artificial Intelligence (AI) system when necessary. The Al system is hired from outside and the hire charges paid for every quarter is ₹ 4,08,000. An estimate of overhead expenses relating to the special machine is given below:

- The cost of the special machine is ₹ 66,00,000 and depreciation is charged @ 10% per annum on straight line basis.
- Rent paid for every six months is ₹ 1,38,000.
- Other indirect expenses per annum ₹ 4,92,000.

During the first month of operation, the following details are available from the job book of the company:

**Jobs**

| | Belting (B) | Extrusion (E) | Vulcanizing (v) |
|---|---:|---:|---:|
| Number of hours the special machine was used | | | |
| Without the use of Artificial Intelligence (AI) system | 600 | 900 | - |
| With the use of Artificial Intelligence (AI) system | 450 | 550 | 1000 |

Any fraction in calculations may be rounded off up to two decimal places.

On the basis of the above Case Scenario, you are required to answer the following MCQs 6 to 10:

---
item: m6
case: c2
qno: 6
marks: 2
type: mcq
key: C
tags: cma.oh.absorb
difficulty: easy
q: 4
a: 7
---
#### Question
What is the amount of overheads per month for using the special machine without the aid of Artificial Intelligence (AI) system?
#### Options
(A) ₹ 36,000
(B) ₹ 44,000
(C) ₹ 51,000
(D) ₹ 58,000
#### Approach
Bring every machine cost to a monthly figure (annual depreciation and other expenses ÷ 12, six-monthly rent ÷ 6); the quarterly AI hire charge belongs only to the hours worked with the AI system.

---
item: m7
case: c2
qno: 7
marks: 2
type: mcq
key: B
tags: cma.oh.absorb
difficulty: easy
q: 4
a: 7
---
#### Question
What is the amount of overheads per month for using the special machine with the aid of Artificial Intelligence (Al) system?
#### Options
(A) ₹ 1,82,000
(B) ₹ 2,04,000
(C) ₹ 1,95,714
(D) ₹ 2,25,000

---
item: m8
case: c2
qno: 8
marks: 2
type: mcq
key: A
tags: cma.oh.absorb
difficulty: medium
q: 4
a: 7
---
#### Question
What is the machine hour rate for the company as a whole for a month when the Artificial Intelligence (AI) system was used?
#### Options
(A) ₹ 102 per hour
(B) ₹ 122.55 per hour
(C) ₹ 130 per hour
(D) ₹ 133.75 per hour

---
item: m9
case: c2
qno: 9
marks: 2
type: mcq
key: D
tags: cma.oh.absorb
difficulty: medium
q: 5
a: 7
---
#### Question
What is the machine hour rate for the company as a whole for a month when the Artificial Intelligence (AI) was not used?
#### Options
(A) ₹ 41 per hour
(B) ₹ 29.45 per hour
(C) ₹ 38.25 per hour
(D) ₹ 34 per hour

---
item: m10
case: c2
qno: 10
marks: 2
type: mcq
key: B
tags: cma.oh.absorb
difficulty: hard
q: 5
a: 7
---
#### Question
What is the machine hour rate for the month in respect of the individual jobs -Belting (B), Extrusion (E) and Vulcanizing (V) respectively?
#### Options
(A) ₹ 45.37 (B), 68.19 (E) and ₹ 98.95 (V) per hour
(B) ₹ 63.14 (B), 59.79 (E) and ₹ 102 (V) per hour
(C) ₹ 55.25 (B), 48.33 (E) and ₹ 105 (V) per hour
(D) ₹ 49.41 (B), 78.54 (E) and ₹ 94.35 (V) per hour
#### Approach
Each job's rate is a weighted mix: its hours without AI at the without-AI rate and its hours with AI at the with-AI rate, divided by the job's total hours.

---
item: m11
qno: 11
marks: 2
type: mcq
key: C
tags: cma.mat.levels
difficulty: easy
q: 5
a: 7
---
#### Question
The management of Gamma Limited has provided the following information for Product X:

| | |
|---|---:|
| Maximum Stock Level | 1125 units |
| Re-Ordering Level (ROL) | 750 units |
| Minimum rate of consumption per day | 25 units |
| Minimum lead time | 5 units |

What is the Re-Order Quantity (ROQ)?
#### Options
(A) 375 units
(B) 450 units
(C) 500 units
(D) 600 units
#### Approach
Start from the maximum stock level formula (ROL + ROQ – minimum consumption × minimum lead time) and solve it for ROQ.

---
item: m12
qno: 12
marks: 2
type: mcq
key: A
tags: cma.emp.payroll
difficulty: easy
q: 5-6
a: 7
---
#### Question
The following information pertains to a worker G:

| | |
|---|---|
| Basic Pay | ₹ 25,000 per month |
| Dearness Allowance | ₹ 5,000 per month |
| Other Allowances | ₹ 2,000 per month |

The number of working days in a year is 325 of 8 hours each. G has availed 25 days as holidays on full pay in a year.

What is the wage rate per hour of worker G?
#### Options
(A) ₹ 160
(B) ₹ 175
(C) ₹ 140
(D) ₹ 185
#### Approach
Annual pay (all three elements × 12) is spread over the hours actually worked: paid holidays reduce the working days, not the pay.

---
item: m13
qno: 13
marks: 2
type: mcq
key: C
tags: cma.job.job, cma.sheet.quote
difficulty: easy
q: 6
a: 7
---
#### Question
The following information pertains to Job Number 501 undertaken by PCM Limited:

| | |
|---|---|
| Direct Materials | ₹ 60,000 |
| Direct Wages | ₹ 50,000 |
| Factory Overheads | 60% of Direct Wages |
| Administrative Overheads | 25% of Factory Cost |
| Profit percentage on total cost | 25% |

What is the selling price of Job Number 501?
#### Options
(A) ₹ 1,89,550
(B) ₹ 2,24,675
(C) ₹ 2,18,750
(D) ₹ 2,33,640

---
item: m14
qno: 14
marks: 2
type: mcq
key: D
tags: cma.svc.transport
difficulty: easy
q: 6
a: 7
---
#### Question
AMC Travels is running 4 luxury buses between two cities which are 60 kms. apart. The seating capacity of each bus is 50 passengers. The actual passengers carried were 70% of the seating capacity. All the four buses run for 30 days for the month. Each bus made one round trip per day. During the month of April 2026, AMC incurred total cost of ₹ 25,05,000.

What is the cost per passenger kilometer for the month of April 2026?
#### Options
(A) ₹ 7.55
(B) ₹ 3.75
(C) ₹ 6.84
(D) ₹ 4.97
#### Approach
Passenger-km = buses × seats × occupancy × distance per round trip (both ways) × days; divide the month's cost by it.

---
item: m15
qno: 15
marks: 2
type: mcq
key: B
tags: cma.mc.bep, cma.mc.basics
difficulty: easy
q: 7
a: 7
---
#### Question
The following information has been extracted from the records of XYZ Ltd. for two consecutive years:

| Particulars | Year 1 | Year 2 |
|---|---:|---:|
| Sales (₹) | 1,80,00,000 | 2,40,00,000 |
| Profit (₹) | 24,00,000 | 42,00,000 |

What is the Break-even Sales Value?
#### Options
(A) ₹ 1,40,00,000
(B) ₹ 1,00,00,000
(C) ₹ 1,25,00,000
(D) ₹ 90,00,000
#### Approach
P/V ratio = change in profit ÷ change in sales; then fixed cost from either year, and break-even sales = fixed cost ÷ P/V ratio.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.unit.batch, cma.sheet.quote
difficulty: easy
q: 8
a: 10
---
#### Question
XYZ Limited specializes in manufacture of high end office furniture. They use a batch costing system to track production costs. The company received an order for a special production run, Batch A - 01, consisting of 20 Ergonomic Executive Chairs. The estimated costs for this specific: batch are as follows:

| | |
|---|---|
| Direct Material | ₹ 55,500 |
| Direct Labour : | |
| Cutting & Shaping | 300 hours @ ₹ 50 per hour |
| Polishing & Finishing | 200 hours @ ₹ 40 per hour |
| Factory Overheads: | |
| Cutting & shaping | 300 hours @ ₹ 8 per hour |
| Polishing & Shaping | 200 hours @ ₹ 8 per hour |
| Administrative & Selling Overheads | 20% of Works Cost |
| Profit | 25% on Selling Price |

You are required to calculate:

(i) Total Cost of the Batch.

(ii) Selling Price per Chair.
#### Answer
**(i) Statement showing Total Cost of the Batch A – 01**

| Particulars | Amount (in ₹) |
|---|---:|
| Direct Material Cost | 55,500 |
| Direct Labour: | |
| Cutting & Shaping (300 hours @ ₹ 50 per hour) | 15,000 |
| Polishing & Finishing (200 hours @ ₹ 40 per hour) | 8,000 |
| **Prime Cost** | **78,500** |
| Add: Factory Overheads: | |
| Cutting & Shaping (300 hours @ ₹ 8 per hour) | 2,400 |
| Polishing & Finishing (200 hours @ ₹ 8 per hour) | 1,600 |
| **Factory Cost/Works Cost** | **82,500** |
| Add: Administrative & Selling Overheads (20% of Works Cost) | 16,500 |
| **Total Cost** | **99,000** |

**(ii) Selling Price per Chair:**

Units produced & sold = 20 chairs

Sales = Total cost + 25% profit on sales or 33.3% (1/3rd) profit on cost

= ₹99,000 + 33.33% (1/3rd) of ₹ 99,000

= ₹ 1,32,000

Selling price per chair = Total sales/no. of chairs sold

= ₹ 1,32,000/20= ₹ 6,600 per chair
#### Approach
Build the batch cost sheet in layers (prime cost, works cost, total cost). A profit of 25% on selling price is one-third of cost.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.std.material, cma.std.labour
difficulty: easy
q: 8-9
a: 10-11
---
#### Question
EXA Ltd. operates a standard costing system for controlling its material costs and has furnished the following information for the month of April, 2026:

| | |
|---|---|
| Standard Price of raw material | ₹ 30 per Kg |
| Standard Quantity of material required per unit of output | 5 kgs. |
| Standard labour rate | ₹ 50 per hour |
| Standard labour requirement | 2.5 hours per unit |
| Actual Output | 2000 units |
| Material Price Variance | ₹ 1,75,000 (Adverse) |
| Actual Quantity of raw material purchased and consumed | 14,000 kgs. |
| Actual wages paid for 6,000 hours | ₹ 3,24,000 |

You are required to calculate:

(i) Actual price per kg of raw material

(ii) Material usage variance

(iii) Material cost variance

(iv) Labour rate variance

(v) Labour efficiency variance

(Indicate the nature of variance Favourable (F) or Adverse (A))
#### Answer
**Workings:**

1. Standard Quantity for actual output = 2,000 x 5 kg = 10,000 kg
2. Standard Labour Hours for actual output = 2,000 x 2.5 hours per unit = 5,000 hours
3. Actual Labour Rate = ₹ 3,24,000/6,000 hours = ₹ 54

**(i) Actual Price Per Kg**

Material Price Variance = (SP - AP) x AQ

Material Price Variance = ₹ 1,75,000 (A)

Therefore:

(30 - AP) x 14,000 = -1,75,000

Actual Price = ₹ 42.5

**(ii) Material Usage Variance** = (SQ - AQ) x SP

= (10,000 – 14,000) x ₹ 30

= ₹ 1,20,000 (A)

**(iii) Material Cost Variance** = SQ x SP - AQ X AP

= 10,000 x ₹ 30 – 14,000 x ₹ 42.5

= ₹ 2,95,000 (A)

**(iv) Labour Rate Variance** = (SR - AR) X AH

= (₹ 50 - ₹ 54) x 6000

= ₹ 24,000 (A)

**(v) Labour Efficiency Variance** = (SH - AH) X SR

= (5,000 – 6,000) x ₹ 50

= ₹ 50,000 (A)
#### Approach
Work back from the given price variance to the actual price per kg; then compute standard quantity and hours for the actual output before the remaining variances.

---
item: q1c
qno: 1
part: (c)
marks: 4
type: descriptive
tags: cma.sys.recon
difficulty: medium
q: 9
a: 11-12
---
#### Question
A manufacturing concern reported a net loss of ₹ 4,20,000 as per the Cost Accounts for the year ended 31st March, 2026. Upon scrutiny of both sets of accounts, the following differences were identified:

| Sr. No. | Particulars | Amount (₹) |
|---|---|---:|
| (i) | Profit on sale of investments (Financial Accounts only) | 55,000 |
| (ii) | Factory overheads under-absorbed in Cost Accounts | 70,000 |
| (iii) | Discount allowed to customers (Financial Accounts only) | 30,000 |
| (iv) | Depreciation overcharged in Cost Accounts | 90,000 |
| (v) | Selling overheads over-absorbed in Cost Accounts | 65,000 |
| (vi) | Bad debts written-off (Financial Accounts only) | 1,10,000 |
| (vii) | Over-valuation of closing stock in Cost Accounts | 40,000 |

You are required to:

(i) Prepare a Reconciliation Statement.

(ii) Ascertain the net profit / (loss) as per the Financial Accounts.
#### Answer
**Reconciliation Statement**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| **Net Loss as per Cost Accounts** | | **4,20,000** |
| **Add:** | | |
| Profit on sale of investments | 55,000 | |
| Depreciation overcharged in Cost Accounts | 90,000 | |
| Selling overheads over-absorbed in Cost Accounts | 65,000 | **2,10,000** |
| | | **2,10,000** |
| **Less:** | | |
| Factory overheads under-absorbed in Cost Accounts | 70,000 | |
| Discount allowed to customers | 30,000 | |
| Bad debts written-off | 1,10,000 | |
| Over-valuation of closing stock in Cost Accounts | 40,000 | **2,50,000** |
| **Net Loss as per Financial Accounts** | | **4,60,000** |
#### Approach
Start from the cost loss and ask of each item whether the financial accounts show a better or worse result than the cost accounts: incomes only in financial accounts and over-charges in cost accounts improve it.

---
item: q2a
qno: 2
part: (a)
marks: 7
type: descriptive
tags: cma.sheet.mfg
difficulty: easy
q: 12-13
a: 14
---
#### Question
The cost particulars of cotton yarn manufactured by a textile mill in April 2026 are as follows:

| | |
|---|---|
| Direct Material: | - Cotton Bales: 2,000 kgs @ ₹ 120 per kg<br>- Other materials : 600 kgs @ ₹ 85 per kg |
| Direct Wages: | - 75 skilled men @ ₹ 60 per day for 25 days<br>- 40 unskilled men @ ₹ 30 per day for 25 days |
| Direct Expenses: | Hire charge for Special equipment ₹ 9,000 Power and fuel ₹ 3,000 |
| Works Overhead | 160% of direct wages |
| Administration overhead related with production | ₹ 45,000 |
| Selling and distribution expenses | ₹ 37,500 |
| Selling Price per kg of cotton yarn | ₹ 600 |

Additional Information:

- 1,500 kgs. of Cotton yarn was produced.
- Waste cotton and chemical scrap realized during the manufacturing process amounted to ₹ 23,500.
- There were no opening or closing stocks of raw materials and finished stock.

You are required to prepare a cost statement for the month of April 2026 showing:

(i) Prime Cost

(ii) Net Works Cost

(iii) Cost of Production

(iv) Cost of Sales

(v) Total Profit & Sales
#### Answer
**Cost Sheet of Cotton Yarn Manufacturing for the month of April 2026**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| **Direct Material:** | | |
| Cotton Bales (2,000 kgs × ₹ 120) | 2,40,000 | |
| Other materials (600 kgs × ₹ 85) | 51,000 | 2,91,000 |
| **Add: Direct Wages** | | |
| 75 skilled men @ ₹ 60 per day for 25 days | 1,12,500 | |
| 40 unskilled men @ ₹ 30 per day for 25 days | 30,000 | 1,42,500 |
| **Add: Direct Expenses** | | |
| Hire charges for special equipment | 9,000 | |
| Power and fuel | 3,000 | 12,000 |
| **Prime Cost** | | **4,45,500** |
| Add: Works / Factory Overheads (160% of direct wages) | | 2,28,000 |
| Works Cost / Factory Cost | | 6,73,500 |
| Less: Sale of waste cotton and cotton scrap | | (23,500) |
| **Net Works Cost** | | **6,50,000** |
| Add: Administration overhead related to production | | 45,000 |
| **Cost of Production** | | **6,95,000** |
| Add: Selling and distribution expenses | | 37,500 |
| **Cost of Sales** | | **7,32,500** |
| **Sales (1,500 kgs × ₹ 600)** | | **9,00,000** |
| **Profit** | | **1,67,500** |
#### Approach
Follow the cost-sheet order (prime cost, works cost, net works cost after scrap, cost of production, cost of sales); the scrap realisation reduces works cost.

---
item: q2b
qno: 2
part: (b)
marks: 7
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: medium
q: 13
a: 14-16
---
#### Question
PQR Ltd is a manufacturing company that operates at 80% capacity, generating a profit of ₹ 7,50,000 by selling 36000 units. The cost details are as follows:

| Particulars | Amount (in ₹) |
|---|---:|
| Material Cost per unit | 25 |
| Labour Cost per unit | 15 |
| Semi Variable Cost (Variable Component = 10 per unit) | 8,20,000 |
| Contribution per unit | 50 |
| Margin of Safety Sales at the current level of sales | 15,00,000 |
| Fixed Cost upto 80% Capacity (Including depreciation of ₹ 1,90,000) | 5,90,000 |
| Additional Fixed Cost (Beyond 80% Capacity) | 1,50,000 |

You are required to ascertain:

(i) Break Even Point in units at current Capacity utilisation.

(ii) Total Sales value and Cash Break Even Sales Quantity at current capacity utilization.

(iii) Capacity utilisation & Margin of safety sales, if the company wants to earn a profit of ₹ 9,37,500. (Assume selling price per unit and variable cost per unit remain unchanged.)
#### Answer
**Workings:**

1\. No. of units at 80% level = 36,000 units.

No. of units at 100% level = $\dfrac{36{,}000}{80\%}$ = 45,000 units.

2\. Contribution per unit = ₹ 50

Variable cost per unit = Direct Material + Direct wages +Variable cost in semi variable component

= (25 + 15 + 10) = ₹ 50 per unit

Selling Price (SP) = Variable cost per unit+ Contribution per unit

= ₹ 50 + ₹ 50 = ₹ 100 per unit.

3\. Calculation of Total fixed cost:

= Fixed cost part of semi-variable cost + Fixed overheads

= (Total Semi-variable cost at 80% level – Variable cost part) + Fixed Cost (at 80% capacity)

= {₹ 8,20,000 – (₹ 10 × 36,000 units)} + ₹ 5,90,000

= ₹ 4,60,000 + ₹ 5,90,000 = ₹ 10,50,000

**(i) Calculation of Break-even point at 80% Capacity:**

= $\dfrac{\text{Total fixed cost}}{\text{Contribution per unit}}$

= $\dfrac{₹ 10{,}50{,}000}{₹ 50}$ = 21,000 units

**(ii) Total Sales Value & Cash BEP at 80% Capacity**

Total Sales Value = 36,000 units × ₹ 100 = ₹ 36,00,000

Now, Cash Fixed Cost = Total Fixed Cost - Depreciation

Or Cash Fixed Cost = ₹10,50,000 - ₹ 1,90,000 = ₹ 8,60,000

Cash BEP (units) = $\dfrac{\text{Total cash fixed cost}}{\text{Contribution per unit}} = \dfrac{₹ 8{,}60{,}000}{50}$

= 17,200 units

**(iii) Capacity utilisation & Margin of safety (MOS) sales to earn a profit of ₹ 9,37,500**

To earn a profit of ₹ 9,37,500, the company must exceed 80% capacity, requiring additional fixed costs.

So, New Fixed Cost (>80%) = ₹ 10,50,000 + ₹ 1,50,000 = ₹ 12,00,000.

Required Units = $\dfrac{\text{Fixed cost + Target profit}}{\text{Contribution per unit}}$

= $\dfrac{₹ 12{,}00{,}000 + ₹ 9{,}37{,}500}{₹ 50}$

= 42,750 units

So, Capacity Utilisation = (42,750 / 45,000) × 100 = 95%

New BEP (units) = $\dfrac{₹ 12{,}00{,}000}{₹ 50}$ = 24,000 units.

So, MOS (units) = 42,750 - 24,000 = 18,750 units
#### Approach
Split the semi-variable cost into its fixed and variable parts first to get total fixed cost. For the target profit, check whether the required volume crosses 80% capacity, because the extra fixed cost then applies.

---
item: q3a
qno: 3
part: (a)
marks: 8
type: descriptive
tags: cma.joint.apportion, cma.joint.further
difficulty: medium
q: 16-17
a: 18-19
---
#### Question
Apex Chemicals Ltd. processes a basic chemical raw material in 8 Department I, which yields two joint products, A and B, at the split-off point in the ratio 60 40. The input-output ratio of Department I is 100: 90.

Product A can either be sold at split-off or further processed in Department II to produce A-Prime. Department II is used exclusively for Product A, and its input-output ratio is 100: 80.

**Production & Cost Data**

| Particulars | Department I | Department II |
|---|---:|---:|
| Raw Material Input | 1,20,000 kg @ ₹ 7 per kg | - |
| Conversion Costs: | ₹ 4,50,000 | |
| Other Direct Material | ₹ 4,50,000 | ₹ 1,00,000 |
| Direct Labour | ₹ 4,00,000 | ₹ 1,40,000 |
| Variable Overhead | ₹ 6,00,000 | ₹ 2,60,000 |
| Fixed Overhead | ₹ 5,50,000 | ₹ 40,000 |
| **Total Conversion Cost** | **₹ 20,00,000** | **₹ 5,40,000** |

Other Data:

| Product | Selling Price (₹ per kg) | Selling Expense (₹) |
|---|---:|---:|
| A (split – off) | 45 | 30,000 |
| B | 45 | 26,000 |
| A - Prime | 75 | 22,000 |

Required:

(i) Prepare a joint cost apportionment statement for Products A and B on the basis of sales value at split-off point.

(ii) Advise whether Product A should be sold at split-off or processed into A-Prime, showing incremental revenue, incremental cost, and profit.
#### Answer
**Calculation of Total Joint Cost of Department I**

| Particulars | Amount (₹) |
|---|---:|
| Raw material (1,20,000 kg × ₹ 7) | 8,40,000.00 |
| **Conversion Cost:** | |
| Other direct material | 4,50,000.00 |
| Direct labour | 4,00,000.00 |
| Variable overhead | 6,00,000.00 |
| Fixed Overheads | 5,50,000.00 |
| **Total Cost** | **28,40,000.00** |
| **(i) Joint Cost Apportionment Based on Sales Value at Split-off** | |
| Output total (1,20,000 x 90%) | 1,08,000 units |
| Product A **(60%)** | 64,800 units |
| Product B **(40%)** | 43,200 units |
| **Sales Value at split off point:** | |
| Product A (64,800 x ₹ 45) | 29,16,000.00 |
| Product B (43,200 x ₹ 45) | 19,44,000.00 |
| Total Sales value | 48,60,000.00 |
| **Joint Cost (28,40,000) Apportioned:** | |
| Product A (28,40,000 × 29,16,000)/48,60,000 | 17,04,000.00 |
| Product B (28,40,000 ×19,44,000)/48,60,000 | 11,36,000.00 |

**(ii) If product A is processed further into A prime**

| Particulars | Amount (₹) |
|---|---:|
| Output (64,800 x 80%) | 51,840 |
| (A) Incremental Revenue {(₹ 75 x 51,840) - (₹ 45 x 64,800)} | 9,72,000.00 |
| **Increment Cost:** | |
| Conversion cost in Department II | 5,40,000.00 |
| Less: Savings on Selling Expenses (₹ 30,000 - ₹ 22,000) | 8,000.00 |
| (B) Total Incremental Cost | 5,32,000.00 |
| (C) Incremental profit (A-B) | 4,40,000.00 |

Apex Chemicals Ltd. should further process Product A into A-Prime. This decision results in an incremental profit of ₹ 4,40,000.
#### Approach
Apply the input-output ratios to get the kilograms of A and B (and of A-Prime) before anything else. The joint cost is irrelevant to the further-processing decision: compare only incremental revenue with incremental cost, including the change in selling expenses.

---
item: q3b
qno: 3
part: (b)
marks: 6
type: descriptive
tags: cma.std.foh
difficulty: medium
q: 17
a: 19-20
accept: 6,00,000, 3,00,000, 0, 0, 0, 0
note: The Working Note's fraction on p.20 is a formula image whose text layer spaces the numbers ("₹ 6, 00, 000" over "3, 00, 000 units"); the image reads ₹ 6,00,000 and 3,00,000, so check.py's pieces 6, 3 and four 0s against 6,00,000 and 3,00,000 are accepted.
---
#### Question
Alpha Limited uses Standard Costing System for manufacturing its single product 'STAR'. The following data has been gathered from the cost records of the company to compute various fixed overhead variances for a specific period:

| | |
|---|---:|
| Number of budgeted working days | 25 |
| Budgeted man-hours per day | 12,000 |
| Output (budgeted) per man-hour (in units) | 1 |
| Fixed overhead cost as budgeted | ₹ 6,00,000 |
| Actual number of working days | 28 |
| Actual man-hours per day | 12,500 |
| Actual output per man-hour (in units) | 0.9 |
| Actual fixed overhead incurred | ₹ 6,24,000 |

You are required to ascertain the following:

(i) Fixed Overhead Expenditure Variance

(ii) Fixed Overhead Volume Variance

(iii) Fixed Overhead Calendar Variance

(iv) Fixed Overhead Cost Variance

(Indicate the nature of variance Favourable (F) or Adverse (A))
#### Answer
| Particulars | Budget | Actual |
|---|---:|---:|
| Days | 25 | 28 |
| Man hours per day | 12,000 | 12,500 |
| Hours | 3,00,000 | 3,50,000 |
| Units per man hour | 1 | 0.9 |
| Units | 3,00,000 | 3,15,000 |
| Fixed Overheads (₹) | 6,00,000 | 6,24,000 |

**(i) Fixed Overhead Expenditure Variance**

= Budgeted Fixed Overhead - Actual Fixed Overhead

= (₹ 6,00,000 – ₹ 6,24,000) = ₹ 24,000 (A)

**(ii) Fixed Overhead Volume Variance**

= Absorbed Overhead – Budgeted Overhead

= (₹ 2 x 3,15,000) – ₹ 6,00,000 = ₹ 30,000 (F)

**(iii) Fixed Overhead Calendar Variance**

= (Actual Days - Budgeted Days) x Budgeted Rate per day

= (28 - 25) x ₹ 24,000 = ₹ 72,000 (F)

**(iv) Fixed Overhead Cost Variance**

= Absorbed Overhead - Actual Fixed Overheads

= (₹ 2 x 3,15,000) – ₹ 6,24,000 = ₹ 6,000 (F)

**Working Note:**

Standard fixed overhead rate per unit = $\dfrac{₹ 6{,}00{,}000}{3{,}00{,}000 \text{ units}}$ = ₹ 2 per unit

Standard fixed overhead per day = $\dfrac{₹ 6{,}00{,}000}{25 \text{ days}}$ = ₹ 24,000
#### Approach
Lay out budget against actual for days, hours and units first; the standard rate per unit and per day come from the budget, and the calendar variance uses the rate per day.

---
item: q4a
qno: 4
part: (a)
marks: 9
type: descriptive
tags: cma.bud.functional
difficulty: medium
q: 20-21
a: 21-22
---
#### Question
ZED Ltd. manufactures two categories of products, Omega and Theta. These products are sold through two primary distribution channels, Online Portals and Retail Stores. In the current financial year, Omega performed exceptionally well online due to a viral trend, while Theta saw a surge in retail stores. The following information is available for the year 2025-26:

| Product | Channel | Budgeted Sales | Actual Sales | Selling Price per unit (For Budgeted and Actual Sales) |
|---|---|---:|---:|---:|
| Omega | Online | 1000 units | 1200 units | ₹ 15,000 |
| | Retail | 800 units | 700 units | ₹ 18,000 |
| Theta | Online | 500 units | 450 units | ₹40,000 |
| | Retail | 400 units | 500 units | ₹ 45,000 |

Market research indicates that Omega series is facing stiff competition offline, therefore, management has decided to reduce the price by 10% across both channels. Theta series has gained luxury status, so the management has decided to increase the price by ₹ 5,000 per unit for both Online and Retail sales. Based on these price changes, the Sales Manager has submitted the following estimates of increase in sales for the year 2026-27 over the original budgeted sales:

| Product | Online Channel | Retail Channel |
|---|:---:|:---:|
| Omega | + 15% | +5% |
| Theta | + 10% | +20% |

Furthermore, the company has signed a contract for an Influencer Marketing Campaign. It is estimated that for the year 2026-27 this campaign will generate the following additional sales:

| Product | Online channel | Retail Channel |
|---|:---:|:---:|
| Omega | 200 units | Nil |
| Theta | 100 units | 50 Units |

You are required to prepare:

(i) Sales Budget for 2026-27 after incorporating the above estimates.

(ii) Statement showing Budgeted and Actual Sales for 2025-26.
#### Answer
**(i) Statement Showing Sales Budget for 2026-27**

| Channel | Omega | | | Theta | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| Online | 1,350¹ | 13,500 | 1,82,25,000 | 650³ | 45,000 | 2,92,50,000 | 4,74,75,000 |
| Retail | 840² | 16,200 | 1,36,08,000 | 530⁴ | 50,000 | 2,65,00,000 | 4,01,08,000 |
| **Total** | 2,190 | | 3,18,33,000 | 1,180 | | 5,57,50,000 | 8,75,83,000 |

**Workings**

1. 1,000 × 115% + 200 = 1,350 units
2. 800 × 105% + Nil = 840 units
3. 500 × 110% + 100 = 650 units
4. 400 × 120% + 50 = 530 units

**(ii) Statement Showing Budgeted Sales for 2025-26**

| Channel | Omega | | | Theta | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| Online | 1,000 | 15,000 | 1,50,00,000 | 500 | 40,000 | 2,00,00,000 | 3,50,00,000 |
| Retail | 800 | 18,000 | 1,44,00,000 | 400 | 45,000 | 1,80,00,000 | 3,24,00,000 |
| **Total** | 1,800 | | 2,94,00,000 | 900 | | 3,80,00,000 | 6,74,00,000 |

**Statement Showing Actual Sales for 2025-26**

| Channel | Omega | | | Theta | | | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Qty.** | **Rate (₹)** | **Amt. (₹)** | **Amt. (₹)** |
| Online | 1,200 | 15,000 | 1,80,00,000 | 450 | 40,000 | 1,80,00,000 | 3,60,00,000 |
| Retail | 700 | 18,000 | 1,26,00,000 | 500 | 45,000 | 2,25,00,000 | 3,51,00,000 |
| **Total** | 1,900 | | 3,06,00,000 | 950 | | 4,05,00,000 | 7,11,00,000 |
#### Approach
For 2026-27, quantity = original budget × (1 + estimated increase) + the campaign's additional units, and price = the old price changed as stated for each product; then quantity × price channel by channel.

---
item: q4b
qno: 4
part: (b)
marks: 5
type: descriptive
tags: cma.emp.turnover
difficulty: easy
q: 21
a: 22-23
---
#### Question
The labour turnover rates for the quarter ended 31st March, 2026 are computed as 12%, 6% and 4% under Flux method, Replacement method and Separation method respectively. The number of workers replaced during that quarter is 54.

You are required to ascertain -

(i) Average number of workers on roll for the quarter

(ii) Number of workers recruited and joined

(iii) Number of workers left and discharged
#### Answer
**Working Note:**

**(i) Average number of workers on roll (for the quarter):**

Employee Turnover rate using Replacement method

= $\dfrac{\text{No. of replacements}}{\text{Average number of workers on roll}} \times 100$

Or, $\dfrac{6}{100} = \dfrac{54}{\text{Average number of workers on roll}}$

Or, Average number of workers on roll = $\dfrac{54 \times 100}{6}$ = 900

**(ii) Number of workers recruited and joined:**

Employee turnover rate (Flux method)

= $\dfrac{\text{No. of Separations * (S)} + \text{No. of Accessions (A)}}{\text{Average number of workers on roll}}$

Or, $\dfrac{12}{100} = \dfrac{36\text{*} + A}{900}$ Or, A = $\left[\dfrac{10{,}800}{100} - 36\right]$ = 72

No. of workers recruited and joined 72.

**(iii) Number of workers left and discharged:**

Employee turnover rate (Separation method)

$\dfrac{4}{100} = \dfrac{\text{No. of Separations (S)}}{\text{Average number of workers on roll}} \times 100$

$\dfrac{4}{100} = \dfrac{S}{900}$ Or, S\* = 36

Hence, number of workers left and discharged comes to 36.
#### Approach
The replacement rate links the 54 replacements to the average number on roll; with that, the separation rate gives separations, and the flux rate (separations + accessions) gives accessions.

---
item: q5a
qno: 5
part: (a)
marks: 10
type: descriptive
tags: cma.abc.compute, cma.abc.concept
difficulty: medium
q: 23-24
a: 24-27
accept: 54,00,000, 18,000, 54, 18, 0, 0, 0
note: The overhead-rate fraction on p.25 is a formula image whose text layer spaces the numbers ("₹ 54, 00, 000" over "18, 000 units"); the image reads ₹ 54,00,000 and 18,000, so check.py's pieces 54, 18 and three 0s against 54,00,000 and 18,000 are accepted.
---
#### Question
XYZ Private Limited manufactures two products, Mini and Maxi, utilising the same production methods. The company operates under the Absorption Costing System. The details of the products for financial year 2025-26 are provided below:

| Particulars | Products | |
|---|---:|---:|
| | **Mini** | **Maxi** |
| Number of units produced | 8000 units | 10000 units |
| Number of units sold | 6400 units | 8000 units |
| Direct Material Cost per unit | ₹ 250 | ₹400 |
| Direct Labour Hours per unit | 4 Hours | 5 Hours |
| Selling price per unit sold during the year | ₹ 950 | ₹ 1180 |

Using the traditional method, all the Production overheads were of ₹ 54,00,000, which were directly distributed on the basis of units produced. Direct labour hour rate is ₹ 50 per hour.

Further, the Board of Directors is considering transitioning to an Activity - Based Costing (ABC) system to determine the production overheads.

The total production overheads are analyzed into the following:

| Particulars | Amount (₹) |
|---|---:|
| Set -up costs | 9,00,000 |
| Machine Running costs | 18,00,000 |
| Inspection costs | 27,00,000 |
| **Total** | **54,00,000** |

The following data on cost drivers was provided by the production manager relating to the bifurcation of production overheads:

| Particulars | Mini | Maxi |
|---|---:|---:|
| Number of Setups | 100 | 200 |
| Number of Machine Runs | 750 | 1,050 |
| Number of Inspections | 60 | 210 |

You are required to calculate:

(i) Total Sales and Total Profit earned for each product as per Absorption Costing System.

(ii) Total Sales and Total Profit earned for each product as per Activity - Based Costing System.
#### Answer
**(i) Total sales and total profit for each product under absorption costing system**

Factory overhead rate per unit = ₹ 54,00,000/18,000 units = ₹ 300 per unit

| Particulars | Mini | Maxi |
|---|---:|---:|
| No. of units produced | 8000 units | 10000 units |
| No. of units sold | 6400 units | 8000 units |
| | ₹ | ₹ |
| Direct Material Cost per unit | 250 | 400 |
| Direct Labour Cost per unit (4 hours per unit @ ₹ 50 per hour) (5 hours per unit @ ₹ 50 per hour) | 200 | 250 |
| Factory overheads @ ₹ 300 per unit\* | 300 | 300 |
| **Cost per unit** | **750** | **950** |
| Total Cost of Production (Cost per unit x No. of units produced) | **60,00,000** | **95,00,000** |
| Less: Closing stock of finished goods (Cost per unit x no. of units of closing stock) | 12,00,000 | 19,00,000 |
| Cost of Goods sold | 48,00,000 | 76,00,000 |
| Profit (Balancing figure) | **12,80,000** | **18,40,000** |
| Total Sales (Selling price per unit x No. of units sold) | **60,80,000** | **94,40,000** |

\*Overhead rate = $\dfrac{\text{Budgeted overheads}}{\text{Units Produced}}$

= $\dfrac{₹ 54{,}00{,}000}{18{,}000 \text{ units}}$ = ₹ 300

**(ii) Activity cost-Driver rates**

| Activity | Activity Costs (₹) | Cost-driver | Cost-driver rate |
|---|---:|---:|---:|
| Set-up cost | 9,00,000 | 300 set-ups | ₹ 3,000 per set-up |
| Machine running costs | 18,00,000 | 1,800 machine runs | ₹ 1000 per machine run |
| Inspection costs | 27,00,000 | 270 inspections | ₹ 10,000 per inspection |

**Total sales and total profit for each product as per Activity Based Costing Method**

| Particulars | Mini | Maxi |
|---|---:|---:|
| No. of units produced | 8,000 units | 10,000 units |
| No. of units sold | 6,400 units | 8,000 units |
| | ₹ | ₹ |
| Direct Material Cost per unit | 250 | 400 |
| Direct Labour Cost per unit (4 hours per unit @ ₹ 50 per hour) (5 hours per unit @ ₹ 50 per hour) | 200 | 250 |
| Prime cost per unit | 450 | 650 |
| Total Prime Cost | **36,00,000** | **65,00,000** |
| Activity Costs: | | |
| Set-up cost (₹ 3,000 per set-up) | 3,00,000 (3,000 x 100 set-ups) | 6,00,000 (3,000 x 200 set-ups) |
| Machine running costs (₹ 1,000 per machine run) | 7,50,000 (1,000 x 750 machine runs) | 10,50,000 (1,000 x 1050 machine runs) |
| Inspection costs (₹ 10,000 per inspection) | 6,00,000 (10,000 x 60 inspections) | 21,00,000 (10,000 x 210 inspections) |
| Total Overhead Cost | **16,50,000** | **37,50,000** |
| Overhead per unit | 206.25 | 375 |
| Cost per unit | 656.25 | 1,025 |
| Total Cost of Production (Cost per unit x No. of units produced) | **52,50,000** | **1,02,50,000** |
| Less: Closing stock of finished goods (Cost per unit x no. of units of closing stock) | 10,50,000 | 20,50,000 |
| Cost of Goods sold | 42,00,000 | 82,00,000 |
| Profit (Balancing figure) | **18,80,000** | **12,40,000** |
| Total Sales (Selling price per unit x No. of units sold) | **60,80,000** | **94,40,000** |
#### Approach
Under both systems, cost the units produced and carry the unsold units to closing stock at the same unit cost; under ABC, first find a rate per set-up, per machine run and per inspection, then charge each product for the drivers it uses.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: easy
q: 24
a: 27-28
---
#### Question
The following information has been furnished by the management accountant of CMC Limited:

| | |
|---|---|
| Margin of Safety | 5600 units |
| Break even sales | 2400 units |
| Margin of Safety | ₹ 9,80,000 |
| Total Cost | ₹ 11, 94, 200 |

You are required to calculate:

(i) Profit

(ii) Profit Volume (P/V) Ratio

(iii) Break even sales value

(iv) Fixed Cost
#### Answer
**Working Notes:**

Total Sales Units = Margin of Safety (Units) + Break-even Sales (Units)

= 5,600 + 2,400 = 8,000 units

Selling Price per Unit = $\dfrac{\text{Margin of Safety (MoS in Value)}}{\text{Margin of Safety (Units)}}$

= ₹ 9,80,000 / 5,600 = ₹ 175 per unit

Total Sales Value = Total Units × Selling Price = 8,000 × ₹ 175

= ₹ 14,00,000

**(i) Profit**

= Total Sales – Total Cost

= ₹ 14,00,000 – ₹ 11,94,200 = ₹ 2,05,800

**(ii) Profit Volume (P/V) Ratio**

= $\dfrac{\text{Profit}}{\text{Margin of Safety (Value)}} \times 100$

= (₹ 2,05,800 / ₹ 9,80,000) × 100 = 21%

**(iii) Break-even Sales Value**

= Break-even Units × Selling Price

= 2,400 units × ₹ 175 = ₹ 4,20,000

**Alternatively,**

= Total Sales × [100 – Margin of Safety %]

= ₹ 14,00,000 × 0.30 = ₹ 4,20,000

**(iv) Fixed Cost**

= Break-even Sales Value × P/V Ratio

= ₹ 4,20,000 × 21% = ₹ 88,200
#### Approach
The margin of safety in rupees and in units gives the selling price; total units are margin of safety plus break-even units. Profit is the contribution earned on the margin of safety, which gives the P/V ratio.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.mat.techniques
difficulty: easy
q: 28
a: 28-29
---
#### Question
Which system of inventory management is known as 'Demand Pull' or 'Pull through' system of production? Explain. Also, specify the two principles on which this system is based.
#### Answer
Just In Time (JIT) Inventory Management is also known as ‘Demand pull’ or ‘Pull through’ system of production. JIT is a system of inventory management with an approach to have zero inventories in stores. According to this approach material should only be purchased when it is actually required for production.

In this system, production process actually starts after the order for the products is received. Based on the demand, production process starts and the requirement for raw materials is sent to the purchase department for purchase.

**JIT is based on two principles**

(i) Produce goods only when it is required and

(ii) the products should be delivered to customers at the time only when they want.

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.intro.control
difficulty: easy
q: 28
a: 29
---
#### Question
Distinguish between cost control and cost reduction.
#### Answer
**Difference between Cost Control and Cost Reduction**

| Cost Control | Cost Reduction |
|---|---|
| 1. Cost control aims at *maintaining* the costs in accordance with the established standards. | 1. Cost reduction is concerned with *reducing* costs. It challenges all standards and endeavours to improvise them continuously |
| 2. Cost control seeks to *attain lowest possible cost* under existing conditions. | 2. Cost reduction recognises no condition as permanent, since a *change will result in lower cost.* |
| 3. In case of cost control, emphasis is on *past and present* | 3. In case of cost reduction, it is on *present and future.* |
| 4. Cost control is a *preventive* function | 4. Cost reduction is a *corrective* function. It operates even when an efficient cost control system exists. |
| 5. Cost control ends when targets are achieved. | 5. Cost reduction has no visible end and is a continuous process. |

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.emp.payroll
difficulty: easy
q: 28
a: 30
---
#### Question
A factory employing 3000 workers faces issues of proxy attendance and payroll errors under the manual system. The Plant Head has recommended using an automated method, the Bio-Metric Attendance system. Discuss briefly the features of this Bio-Metric Attendance System.
#### Answer
**Bio-Metric Attendance system-**

1. Under bio-metric attendance system attendance is marked by recognizing an employee on the basis of physical and behavioural traits.
2. An employee’s unique identity like finger print, face and retina image etc. are kept in a database which is matched at the time of marking of attendance before the attendance device for this purpose.
3. Bio-metric attendance system includes fingerprint recognition system, face recognition system, Time and attendance tracking technology etc.
4. This system reduces the risk of time manipulation and proxy attendance. However, it may not be suitable for small organisations due to cost associated with set-up and maintenance.

---
item: q6c-or
alt: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: cma.mat.losses
difficulty: easy
q: 28
a: 30-31
---
#### Question
Explain the meaning of spoiled work and defective work. Discuss the treatment of defective work under the following circumstances:

(i) Where a percentage of defective work is allowed in a particular batch, as it cannot be avoided.

(ii) Where the defect is due to bad workmanship.

(iii) Where the defect is due to the Inspection Department wrongly accepting incoming material of poor quality.
#### Answer
Spoiled work is the quantity of production that has been totally rejected and cannot be rectified.

Defective work refers to production that is not as perfect as the saleable product but is capable of being rectified and brought to the required degree of perfection provided some additional expenditure is incurred.

Treatment of Defects arise in the following circumstances:

| Circumstances | Treatment |
|---|---|
| Where a percentage of defective work is allowed in a particular batch as it cannot be avoided. | If the actual number of defectives is within the normal limit or is near thereto the cost of rectification will be charged to the whole job and spread over the entire output of the batch. If, on the other hand, the number of defective units substantially exceeds the normal, the cost of rectification of the number which exceeds the normal will be written off as a loss in the Costing Profit and Loss Account. |
| Where the defect is due to bad workmanship. | In this case cost of rectification will be abnormal cost and shall be written off as a loss. However, if the management did provide for a certain proportion of defectives on account of bad workmanship as an unavoidable feature of production, the cost of rectifying to the extent provided for by the management will be treated as a normal cost and charged to the batch. |
| Where defect is due to the Inspection Department wrongly accepting incoming material of poor quality. | In this case the cost of rectification will be charged to the department and will not be considered as cost of manufacture of the batch. Being an abnormal cost, it will be written off to the Costing Profit and Loss Account. |
