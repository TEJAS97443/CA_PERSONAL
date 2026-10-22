<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p3-pyq-may2022
paper: p3
kind: pyq
attempt: may2022
qfile: old/p3/pyq-may2022-a.pdf
afile: old/p3/pyq-may2022-a.pdf
paperfile: old/p3/pyq-may2022-q.pdf
choice: q1; any 4 of q2-q6; q6: any 4 of (a)-(e)
q: 1
status: checked
by: tx-41
date: 2026-10-20
note: Old-scheme Intermediate Paper 3 Cost and Management Accounting, May 2022. Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question with its marks note before its answer; the question-paper scan (paperfile, OCR text) is linked as a second source and was not used for the text. The paper is wholly descriptive (no MCQs): Q1 (4 x 5 marks), Q2-Q5 (10 + 5 + 5 or 10 + 10) and Q6 (any four of five 5-mark parts). Instructions: the lines printed under the paper's title on p.1. No choice rule: besides Question 1 compulsory and any four of Q2-Q6, Q6 says "Answer any four of the following" of its five 5-mark parts (a)-(e), "(4 x 5 = 20 Marks)", a choice inside a question that choice: cannot express (it would count 25 marks for Q6), so, as with o-p3-pyq-may2023 and o-p7-mtp-may2018-s1, the paper is practice only and never sat; each Q6 part is an item of 5 marks. The question-level lead-ins "Answer the following:" (Q1) and "Answer any four of the following:" (Q6) are not item text (see q1a's and q6a's notes). Question text is italic throughout ICAI's PDF; that styling is not reproduced; bold headings and bold words in ICAI's answers are kept as **bold**. Formulas set as stacked fractions are written in KaTeX, and inside table cells inline with a slash, with ICAI's own symbols and numbers. Old-scheme mapping (ours): Q2(b) (escalation clause of a construction contract, contract costing) is out of syllabus, see its note; every other item is tagged to the current Paper 4 sub-topics. ICAI's own wording is kept as printed where it looks wrong (each in the item's note). Accepted numbers (each read on the page): 3 is the paper's title "PAPER – 3: COST AND MANAGEMENT ACCOUNTING" on p.1 (not transcribed); 1 to 6 are the question numbers, which ICAI prints once ("Question N" above the question; its "Answer" carries no number) while check.py counts them for both the question and the answer of the same file; 8 is the denominator of "72×100/8" in Q1(b)'s answer, the last line of p.3, which check.py drops as if it were a page number. | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four of the remaining five questions (the Instructions), and Q6's "Answer any four of the following" over its five 5-mark parts (a)-(e), written q6: any 4 of (a)-(e); the paper can now be sat (maximum 100, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
---
#### Instructions
Question No. **1** is compulsory.

Attempt any **four** questions out of the remaining **five** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.mat.eoq
difficulty: easy
note: Question 1 opens with ICAI's "Answer the following:" for parts (a) to (d), "(4 x 5 = 20 Marks)" (p.2); it only introduces the parts and is not transcribed in the items.
q: 1
a: 2-3
---
#### Question
A Limited a toy company purchases its requirement of raw material from S Limited at ₹ 120 per kg. The company incurs a handling cost of ₹ 400 plus freight of ₹ 350 per order. The incremental carrying cost of inventory of raw material is ₹ 0.25 per kg per month. In addition the cost of working capital finance on the investment in inventory of raw material is ₹ 15 per kg per annum. The annual production of the toys is 60,000 units and 5 units of toys are obtained from one kg. of raw material.

Required:

(i) Calculate the Economic Order Quantity (EOQ) of raw materials.

(ii) Advise, how frequently company should order to minimize its procurement cost. Assume 360 days in a year.

(iii) Calculate the total ordering cost and total inventory carrying cost per annum as per EOQ.
#### Answer
Annual requirement of raw material in kg. (A) = $\dfrac{\text{60,000 units}}{\text{5 units per kg.}}$ = **12,000 kg.**

Ordering Cost (Handling & freight cost) (O) = ₹ 400 + ₹ 350 = ₹ 750

Carrying cost per unit per annum i.e. inventory carrying cost + working capital cost (c × i)

= (₹ 0.25 × 12 months) + ₹15

= ₹ 18 per kg.

**(i) E.O.Q.**= $\sqrt{\dfrac{2 \times \text{12,000kgs.} \times \text{₹ 750}}{\text{₹ 18}}}$ **= 1,000 kg.**

**(ii) Frequency of orders for procurement:**

Annual consumption (A) = 12,000 kg.

Quantity per order (EOQ) = 1,000 kg.

No. of orders per annum ($\dfrac{A}{EOQ}$) = $\dfrac{\text{12,000kg.}}{\text{1,000kg.}}$ = 12

Frequency of placing orders (in months) = $\dfrac{\text{12months}}{\text{12orders}}$ **= 1 months**

Or, (in days) = $\dfrac{\text{360days}}{\text{12orders}}$ = **30 days**

**(iii) Calculation of total ordering cost and total inventory carrying cost as per EOQ:**

| | Amount/Quantity |
|---|---:|
| Size of the order | 1,000 kg. |
| No. of orders | 12 |
| Cost of placing orders | **₹ 9,000**<br>(12 orders × ₹ 750) |
| Inventory carrying cost | **₹ 9,000**<br>(1,000 kg. × ½ × ₹ 18) |
| Total Cost | ₹18,000 |
#### Approach
Convert toy production into kilograms of raw material first, and add the working-capital cost to the carrying cost to get the full carrying cost per kg per annum before using the EOQ formula.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.emp.turnover
difficulty: easy
q: 1
a: 3-4
---
#### Question
PQR Limited has replaced 72 workers during the quarter ended 31st March 2022. The labour rates for the quarter are as follows:

| | |
|---|---:|
| Flux method | 16% |
| Replacement method | 8% |
| Separation method | 5% |

You are required to ascertain:

(i) Average number of workers on roll (for the quarter),

(ii) Number of workers left and discharged during the quarter,

(iii) Number of workers recruited and joined during the quarter,

(iv) Equivalent employee turnover rates for the year.
#### Answer
**Working Note:**

**(i) Average number of workers on roll (for the quarter):**

Employee Turnover rate using Replacement method

= $\dfrac{\text{No. of replacements}}{\text{Average number of workers on roll}} \times 100$

Or, $\dfrac{8}{100} = \dfrac{72}{\text{Average number of workers on roll}}$

Or, Average number of workers on roll = $\dfrac{72 \times 100}{8}$ **= 900**

**(ii) Number of workers left and discharged:**

Employee turnover rate (Separation method)

= $\dfrac{\text{No. of Separations(S)}}{\text{Average number of workers on roll}} \times 100 = \dfrac{5}{100} = \dfrac{S}{900}$ Or, S = 45

Hence, number of workers left and discharged comes **to 45**

**(iii) Number of workers recruited and joined:**

Employee turnover rate (Flux method)

= $\dfrac{\text{No. of Separations*(S)+No. of Accessions(A)}}{\text{Average number of workers on roll}}$

Or, $\dfrac{16}{100} = \dfrac{45+A}{900}$ Or, A = $\left[\dfrac{14400}{100} - 45\right]$ = 99

No. of workers recruited and joined 99

**(iv) Calculation of Equivalent employee turnover rates:**

= $\dfrac{\text{EmployeeTurnove rate for the quarter(s)}}{\text{Number of quarter(s)}}$ × 4 quarters

Using Flux method = $\dfrac{16\%}{1}$ ×4 = 64%

Using Replacement method = $\dfrac{8\%}{1}$ ×4 = 32%

Using Separation method = $\dfrac{5\%}{1}$ ×4 = 20%
#### Approach
Start with the replacement rate, the only one whose numerator (72 replacements) is given: it yields the average number of workers on roll, which then unlocks separations and accessions.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: cma.mc.decisions, cma.mc.basics
difficulty: easy
note: Kept as printed: "Variable cost per cost (₹)" (row B) and the unclosed bracket in "Total contribution (₹ [C×D]" (row E) of the first table; "Profit [C-E] (₹)" (row E) of the second table.
q: 2
a: 4-5
---
#### Question
Top-tech a manufacturing company is presently evaluating two possible machines for the manufacture of superior Pen-drives. The following information is available:

| Particulars | Machine A | Machine B |
|---|---:|---:|
| Selling price per unit | ₹ 400.00 | ₹ 400.00 |
| Variable cost per unit | ₹ 240.00 | ₹ 260.00 |
| Total fixed costs per year | ₹ 350 lakhs | ₹ 200 lakhs |
| Capacity (in units) | 8,00,000 | 10,00,000 |

Required:

(i) Recommend which machine should be chosen?

(ii) Would you change your answer, if you were informed that in near future demand will be unlimited and the capacities of the two machines are as follows?

Machine A - 12,00,000 units

Machine B - 12,00,000 units

Why?
#### Answer
| | | Machine-A | Machine-B | Total |
|---|---|---:|---:|---:|
| A | Selling price per unit (₹) | 400 | 400 | |
| B | Variable cost per cost (₹) | 240 | 260 | |
| C | Contribution per unit (₹) [A-B] | 160 | 140 | |
| D | Units | 8,00,000 | 10,00,000 | |
| E | Total contribution (₹ [C×D] | 12,80,00,000 | 14,00,00,000 | 26,80,00,000 |
| F | Fixed Cost (₹) | 3,50,00,000 | 2,00,00,000 | 5,50,00,000 |
| G | Profit [E-F] (₹) | 9,30,00,000 | 12,00,00,000 | 21,30,00,000 |
| H | Profit per unit [G÷D] (₹) | 116.25 | 120.00 | |

(i) Machine B has the higher profit of ₹2,70,00,000 than the Machine-A. Further, Machine-B’s fixed cost is less than the fixed cost of Machine-A and higher capacity. Hence, **Machine B be recommended.**

**Note: This question can also be solved as below:**

Indifferent point = Difference in fixed cost / difference in variable cost per unit

= 1,50,00,000 / 20 = 7,50,000 units

At the level of demand 7,50,000 units both machine options equally profitable.

If demand below 7,50,000 units, select machine B (with lower FC).

If demand above 7,50,000 units, select machine A (with lower VC).

(ii) When the capacities of both the machines are same and demand for the product is unlimited, calculation of profit will be as follows:

| | | Machine-A | Machine-B | Total |
|---|---|---:|---:|---:|
| A | Contribution per unit (₹) | 160 | 140 | |
| B | Units | 12,00,000 | 12,00,000 | |
| C | Total contribution (₹) [A×B] | 19,20,00,000 | 16,80,00,000 | 36,00,00,000 |
| D | Fixed Cost (₹) | 3,50,00,000 | 2,00,00,000 | 5,50,00,000 |
| E | Profit [C-E] (₹) | 15,70,00,000 | 14,80,00,000 | 30,50,00,000 |
| F | Profit per unit [E÷B] (₹) | 130.83 | 123.33 | |

Yes, the preference for the machine would change because now, Machine A is having higher contribution and higher profit, hence recommended.
#### Approach
Compare total profit (contribution at full capacity less fixed cost) for each machine at the stated capacities, then repeat at the new equal capacity; the cost indifference point explains why the choice flips.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: cma.svc.transport
difficulty: easy
note: Kept as printed: "carrying mineral" in the answer's heading (the question says coal) and "Effective tones – km." in working note 2.
q: 2
a: 5-6
---
#### Question
Coal is transported from two mines X & Y and unloaded at plots in a railway station. X is at distance of 15 kms and Y is at a distance of 20 kms from the rail head plots. A fleet of lorries having carrying capacity of 4 tonnes is used to transport coal from the mines. Records reveal that average speed of the lorries is 40 kms per hour when running and regularly take 15 minutes to unload at the rail head.

At Mine X average loading time is 30 minutes per load, while at mine Y average loading time is 25 minutes per load.

Additional Information:

Drivers' wages, depreciation, insurance and taxes, etc. ₹ 12 per hour

Operated Fuel, oil tyres, repairs and maintenance, etc. ₹ 1.60 per km

You are required to prepare a statement showing the cost per tonne kilometre of carrying coal from each mine 'X' and 'Y'.
#### Answer
**Statement showing the cost per tonne-kilometre of carrying mineral from each mine**

| | Mine X (₹) | Mine Y (₹) |
|---|---:|---:|
| **Fixed cost per trip:** (Refer to working note 1) | | |
| (Driver's wages, depreciation, insurance and taxes) | | |
| X: 1 hour 30 minutes @ ₹ 12 per hour | 18.00 | |
| Y: 1 hour 40 minutes @ ₹ 12 per hour | | 20.00 |
| **Running and maintenance cost:** | | |
| (Fuel, oil, tyres, repairs and maintenance) | | |
| X: 30 km. ₹ 1.60 per km. | 48.00 | |
| Y: 40 km. ₹ 1.60 per km. | | 64.00 |
| Total cost per trip (₹) | 66.00 | 84.00 |
| Cost per tonne – km (Refer to working note 2) | 1.1 (₹ 66/60 tonne - km) | 1.05 (₹ 84/80 tonne - km) |

**Working notes:**

| | | Mine- X | Mine- Y |
|---|---|---:|---:|
| (1) | Total operated time taken per trip | | |
| | Running time to & fro | **45 minutes**<br>(30 km. × 60 minutes/40 km.) | **60 minutes**<br>(40 km. × 60 minutes/40 km.) |
| | Un-loading time | 15 minutes | 15 minutes |
| | Loading time | 30 minutes | 25 minutes |
| | Total operated time | **90 minutes or**<br>1 hour 30 minutes | **100 minutes or**<br>1 hour 40 minutes |
| (2) | Effective tones – km. | 60<br>(4 tonnes × 15 km.) | 80<br>(4 tonnes × 20 km.) |
#### Approach
Work out the time per round trip (running to and fro, loading, unloading) and the distance per round trip for each mine; the time-based costs follow the hours and the running costs follow the kilometres, and the tonne-km base is the loaded one-way distance.

---
item: q2a
qno: 2
part: (a)
marks: 10
type: descriptive
tags: cma.oh.absorb, cma.sheet.quote
difficulty: medium
note: ICAI draws diagonal cancellation strokes through the 4,20,000F and 4,20,000AF terms of eqns (iii) and (iv) and prints a row of minus signs under them (p.8); the strokes are not reproduced, the minus signs are kept as a line of escaped dashes.
q: 6-7
a: 8-10
---
#### Question
In a manufacturing company, the overhead is recovered as follows:

Factory Overheads: a fixed percentage basis on direct wages and

Administrative overheads: a fixed percentage basis on factory cost.

The company has furnished the following data relating to two jobs undertaken by it in a period.

| | Job 1 (₹) | Job 2 (₹) |
|---|---:|---:|
| Direct materials | 1,08,000 | 75,000 |
| Direct wages | 84,000 | 60,000 |
| Selling price | 3,33,312 | 2,52,000 |
| Profit percentage on total cost | 12% | 20% |

You are required to:

(i) Compute the percentage recovery rates of factory overheads and administrative overheads.

(ii) Calculate the amount of factory overheads, administrative overheads and profit for each of the two jobs.

(iii) Using the above recovery rates, determine the selling price to be quoted for job 3. Additional data pertaining to Job 3 is as follows:

| | |
|---|---:|
| Direct materials | ₹ 68,750 |
| Direct wages | ₹ 22,500 |
| Profit percentage on selling price | 15% |
#### Answer
**(i) Computation of percentage recovery rates of factory overheads and administrative overheads.**

Let the factory overhead recovery rate as percentage of direct wages be F and administrative overheads recovery rate as percentage of factory cost be A.

**Factory Cost of Jobs:**

Direct materials + Direct wages + Factory overhead

For Job 1 = ₹ 1,08,000 +₹ 84,000 + ₹ 84,000F

For Job 2 = ₹ 75,000 +₹ 60,000 + ₹ 60,000F

**Total Cost of Jobs:**

**Factory cost + Administrative overhead**

For Job 1 = (₹ 1,92,000 + ₹ 84,000F) + (₹ 1,92,000 + ₹ 84,000F) A = ₹ 2,97,600\*

For Job-2 = (₹ 1,35,000 + ₹ 60,000F) + (₹1,35,000+ ₹ 60,000F) A = ₹ 2,10,000\*\*

The value of F & A can be found using following equations

1,92,000 + 84,000F + 1,92,000A + 84,000AF = ₹ 2,97,600 …………eqn (i)

1,35,000 + 60,000F + 1,35,000A + 60,000AF = ₹ 2,10,000 …..……eqn (ii)

Multiply equation (i) by 5 and equation (ii) by 7

9,60,000 + 4,20,000F + 9,60,000A + 4,20,000AF = ₹14,88,000 ...eqn (iii)

9,45,000 + 4,20,000F + 9,45,000A + 4,20,000AF = ₹ 14,70,000 ...eqn (iv)

\- \- \- \- \-

15,000 + 15,000A = ₹18,000

**15,000 A = 18,000 – 15,000**

**A = 0.20**

Now putting the value of A in equation (i) to find the value of F

1,92,000 + 84,000F + (1,92,000 × 0.20) + (84,000 F × 0.20)= ₹ 2,97,600

Or

1,92,000 + 84,000F+38,400+16,800 F = ₹2,97,600

**1,00,800 F = 67,200**

**F = 0.667**

On solving the above relations: F = 0.667 and A = 0.20

Hence, percentage recovery rates of:

Factory overheads = 66.7% or 2/3rd of wages and

Administrative overheads = 20% of factory cost.

**Working note:**

Total Cost = $\dfrac{\text{Selling price}}{\text{(100\% + Percentage of profit)}}$

\*For Job 1 = $\dfrac{\text{₹ 3,33,312}}{(100\% + 12\%)}$ = ₹ 2,97,600

\*\*For Job 2 = $\dfrac{\text{₹2,52,000}}{(100\% + 20\%)}$ = ₹ 2,10,000

**(ii) Statement of jobs, showing amount of factory overheads, administrative overheads and profit:**

| | Job 1 (₹) | Job 2 (₹) |
|---|---:|---:|
| Direct materials | 1,08,000 | 75,000 |
| Direct wages | 84,000 | 60,000 |
| Prime cost | 1,92,000 | 1,35,000 |
| *Factory overheads* | | |
| 2/3rd of direct wages | **56,000** | **40,000** |
| Factory cost | 2,48,000 | 1,75,000 |
| *Administrative overheads* | | |
| 20% of factory cost | **49,600** | **35,000** |
| Total cost | **2,97,600** | **2,10,000** |
| *Profit (12% & 20% respectively)* | **35,712** | **42,000** |
| Selling price | 3,33,312 | 2,52,000 |

**(iii) Selling price of Job 3**

| | (₹) |
|---|---:|
| Direct materials | 68,750 |
| Direct wages | 22,500 |
| Prime cost | 91,250 |
| Factory overheads (2/3rd of Direct Wages) | 15,000 |
| Factory cost | 1,06,250 |
| Administrative overheads (20% of factory cost) | 21,250 |
| Total cost | **1,27,500** |
| Profit margin (balancing figure) | 22,500 |
| Selling price [Total Cost/85%] | **1,50,000** |
#### Approach
Back out each job's total cost from its selling price and profit on cost, then write total cost in terms of the two unknown rates (factory overhead on wages, administration on factory cost) and solve the two equations together.

---
item: q2b
qno: 2
part: (b)
marks: 5
type: descriptive
tags: cma.job
oos: yes
note: Out of syllabus (old scheme): the escalation clause of a long-term construction contract (admissible escalation claim and final contract price) is contract costing, which is not in the new-scheme Paper 4 syllabus or the January 2027 Study Material (no Contract Costing chapter; the Study Material does not mention escalation clauses); tagged with the nearest chapter, Job Costing.
q: 7
a: 10
---
#### Question
Paramount Constructions Limited is engaged in construction and erection of bridges under long term contracts. It has entered into a big contract at an agreed price of ₹ 250 Lakhs subject to an escalation clause for material and labour as spelt out in the contract and corresponding actual are as follows:

| | Standard | | Actual | |
|---|---:|---:|---:|---:|
| **Material** | **Quantity Tonnes** | **Rate Per Tonne (₹)** | **Quantity Tonnes** | **Rate Per Tonne (₹)** |
| P | 2,800 | 1,500 | 3,000 | 1,750 |
| Q | 3,100 | 900 | 2,900 | 800 |
| R | 800 | 4,500 | 950 | 4,350 |
| S | 150 | 32,500 | 120 | 34,200 |
| **Labour** | **Hours** | **Hourly rate (₹)** | **Hours** | **Hourly rate (₹)** |
| LM | 65,000 | 60 | 61,500 | 70 |
| LN | 46,000 | 45 | 45,000 | 50 |

Required:

(i) Prepare a statement showing admissible additional claim of material and labour due to escalation clause.

(ii) Determine the final price payable after admissible escalation claim.
#### Answer
**Statement showing Additional claim**

| | Standard Qty/Hrs. | Standard Rate (₹) | Actual Rate (₹) | Variation in Rate (₹) | Escalation Claim (₹) |
|---|---:|---:|---:|---:|---:|
| | **(a)** | **(b)** | **(c)** | **(d) = (c)–(b)** | **(e) =(a) × (d)** |
| **Materials** | | | | | |
| P | 2,800 | 1,500 | 1,750 | 250 | 7,00,000 |
| Q | 3,100 | 900 | 800 | (100) | (3,10,000) |
| R | 800 | 4,500 | 4,350 | (150) | (1,20,000) |
| S | 150 | 32,500 | 34,200 | 1,700 | 2,55,000 |
| | | | | Materials escalation claim: (A) | 5,25,000 |
| ***Wages*** | | | | | |
| LM | 65,000 | 60 | 70 | 10 | 6,50,000 |
| LN | 46,000 | 45 | 50 | 5 | 2,30,000 |
| | | | | Wages escalation claim: (B) | 8,80,000 |
| | | | | Final claim: (A + B) | 14,05,000 |

**Statement showing final price payable**

| | (₹) | (₹) |
|---|---:|---:|
| Agreed price | | 2,50,00,000 |
| Add: Agreed escalation | | |
| Material cost | 5,25,000 | |
| Labour cost | 8,80,000 | **14,05,000** |
| **Final price payable** | | **2,64,05,000** |
#### Approach
An escalation clause pays only for rate changes on the standard (contracted) quantities, so multiply each standard quantity or hour by the change in rate, letting decreases offset increases.

---
item: q2c
qno: 2
part: (c)
marks: 5
type: descriptive
tags: cma.proc.accounts, cma.job.job
difficulty: easy
q: 7
a: 11
---
#### Question
Distinguish between Job costing and Process Costing. (Any five points of differences)
#### Answer
| | Job Costing | Process Costing |
|---|---|---|
| (i) | A Job is carried out or a product is produced by specific orders. | The process of producing the product has a continuous flow and the product produced is homogeneous. |
| (ii) | Costs are determined for each job. | Costs are compiled on time basis i.e., for production of a given accounting period for each process or department. |
| (iii) | Each job is separate and independent of other jobs. | Products lose their individual identity as they are manufactured in a continuous flow. |
| (iv) | Each job or order has a number and costs are collected against the same job number. | The unit cost of process is an average cost for the period. |
| (v) | Costs are computed when a job is completed. The cost of a job may be determined by adding all costs against the job. | Costs are calculated at the end of the cost period. The unit cost of a process may be computed by dividing the total cost for the period by the output of the process during that period. |
| (vi) | As production is not continuous and each job may be different, so more managerial attention is required for effective control. | Process of production is usually standardized and is therefore, quite stable. Hence control here is comparatively easier. |

---
item: q3a
qno: 3
part: (a)
marks: 10
type: descriptive
tags: cma.mc.keyfactor, cma.bud.functional
difficulty: medium
q: 11-12
a: 13-14
---
#### Question
SR Ltd. is a manufacturer of Garments. For the first three months of financial year 2022-23 commencing on 1st April 2022, production will be constrained by direct labour. It is estimated that only 12,000 hours of direct labour hours will be available in each month.

For market reasons, production of either of the two garments must be at least 25% of the production of the other. Estimated cost and revenue per garment are as follows:

| | Shirt (₹) | Short (₹) |
|---|---:|---:|
| Sales price | 60 | 44 |
| Raw Materials | | |
| Fabric @12 per metre | 24 | 12 |
| Dyes and cotton | 6 | 4 |
| Direct labour @ 8 per hour | 8 | 4 |
| Fixed Overhead @ 4 per hour | 4 | 2 |
| Profit | 18 | 22 |

From the month of July 2022 direct labour will no longer be a constraint. The company expects to be able to sell 15,000 shirts and 20,000 shorts in July, 2022. There will be no opening stock at the beginning of July 2022.

Sales volumes are expected to grow at 10% per month cumulatively thereafter throughout the year. Following additional information is available:

- The company intends to carry stock of finished garments sufficient to meet 40% of the next month's sale from July 2022 onwards.
- The estimated selling price will be same as above.

Required:

I. Calculate the number of shirts and shorts to be produced per month in the first quarter of financial year 2022-2023 to maximize company's profit.

II. Prepare the following budgets on a monthly basis for July, August and September 2022:

(i) Sales budget showing sales units and sales revenue for each product.

(ii) Production budget (in units) for each product.
#### Answer
**I. Calculation of number of shirts & shorts to be produced per month:**

Contribution per labour hour:

| | | Shirts (₹) | Shorts (₹) |
|---|---|---:|---:|
| A | Sales Price per unit | 60 | 44 |
| B | Variable Cost: | | |
| | \- Raw materials | 30 | 16 |
| | \- Direct labour | 8 | 4 |
| | | 38 | 20 |
| C | Contribution per unit [A-B] | 22 | 24 |
| D | Labour hour per unit | 1 hour | 0.5 hour |
| E | Contribution per labour hour [C÷D] | **22** | **48** |

**Production plan for the first three months:**

Since, Shorts has the higher Contribution per labour hour, it will be made first. Shirts will be 25% of Shorts. The quantity will be determined as below:

Let the Quantity of Shorts be X and Shirts will be 0.25 X, then

(Qty. of Shorts × labour hour per unit) + (Qty. of Shirts × labour hour per unit) = Total labour hours available

Or, (X × 0.5 hour) + (0.25X × 1 hour) = 12,000 hours

Or, 0.5X + 0.25X = 12,000

Or, 0.75X = 12,000

Or, X = 12,000÷0.75

**= 16,000 units of Shorts**

Therefore, for Shirts = 25% of 16,000 units

**= 4,000 units**

Production per month for the first quarter will be:

**Shorts- 16,000 units &**

**Shirts- 4,000 units**

**II. (i) Sales Budget for the month of July, August & September 2022:**

| | | July 2022 | | August 2022 | | September 2022 | |
|---|---|---:|---:|---:|---:|---:|---:|
| | | **Shirts** | **Shorts** | **Shirts** | **Shorts** | **Shirts** | **Shorts** |
| A | Sales demand | 15,000 | 20,000 | 16,500 | 22,000 | 18,150 | 24,200 |
| B | Selling price per unit (₹) | 60 | 44 | 60 | 44 | 60 | 44 |
| C | Sales Revenue (₹) | 9,00,000 | 8,80,000 | 9,90,000 | 9,68,000 | 10,89,000 | 10,64,800 |

**(ii) Production budget for the month of July, August & September 2022:**

| | | July 2022 | | August 2022 | | September 2022 | | October 2022 | |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| | | **Shirts** | **Shorts** | **Shirts** | **Shorts** | **Shirts** | **Shorts** | **Shirts** | **Shorts** |
| A | Opening stock | 0 | 0 | 6,600 | 8,800 | 7,260 | 9,680 | | |
| B | Sales demand | 15,000 | 20,000 | 16,500 | 22,000 | 18,150 | 24,200 | 19,965 | 26,620 |
| C | Closing stock | 6,600 | 8,800 | 7,260 | 9,680 | 7,986 | 10,648 | | |
| D | Production [B+C-A] | 21,600 | 28,800 | 17,160 | 22,880 | 18,876 | 25,168 | | |
#### Approach
Labour is the key factor in the first quarter, so rank the garments by contribution per labour hour and respect the 25% mix rule; from July, grow sales by 10% a month and set production = sales + 40% of next month's sales − opening stock.

---
item: q3b
qno: 3
part: (b)
marks: 10
type: descriptive
tags: cma.sheet.mfg
difficulty: easy
q: 12-13
a: 14-15
---
#### Question
The following data are available from the books and records of A Ltd. for the month of April 2022:

| Particulars | Amount (₹) |
|---|---:|
| Stock of raw materials on 1st April 2022 | 10,000 |
| Raw materials purchased | 2,80,000 |
| Manufacturing wages | 70,000 |
| Depreciation on plant | 15,000 |
| Expenses paid for quality control check activities | 4,000 |
| Lease Rent of Production Assets | 10,000 |
| Administrative Overheads (Production) | 15,000 |
| Expenses paid for pollution control and engineering & maintenance | 1,000 |
| Stock of raw materials on 30th April 2022 | 40,000 |
| Primary packing cost | 8,000 |
| Research & development cost (Process related) | 5,000 |
| Packing cost for redistribution of finished goods | 1,500 |
| Advertisement expenses | 1,300 |

Stock of finished goods as on 1st April 2022 was 200 units having a total cost of ₹ 28,000. The entire opening stock of finished goods has been sold during the month. Production during the month of April, 2022 was 3,000 units. Closing stock of finished goods as on 30th April, 2022 was 400 units.

You are required to:

I. Prepare a Cost Sheet for the above period showing the:

(i) Cost of Raw Material consumed

(ii) Prime Cost

(iii) Factory Cost

(iv) Cost of Production

(v) Cost of goods sold

(vi) Cost of Sales

II. Calculate selling price per unit, if sale is made at a profit of 20% on sales.
#### Answer
**I. Statement of Cost (for the month of April, 2022)**

| S. No. | Particulars | Amount (₹) | Amount (₹) |
|---|---|---:|---:|
| | Opening stock of Raw material | 10,000 | |
| | *Add:* Purchase of Raw material | 2,80,000 | |
| | *Less:* Closing stock of raw materials | (40,000) | |
| (i) | **Raw material consumed** | | **2,50,000** |
| | Manufacturing wages | | 70,000 |
| (ii) | **Prime Cost** | | **3,20,000** |
| | Factory/work overheads: | | |
| | Depreciation on plant | 15,000 | |
| | Lease rent of production Asset | 10,000 | |
| | Expenses paid for pollution control and engineering & Maintenance | 1,000 | 26,000 |
| (iii) | **Factory/Work Cost** | | **3,46,000** |
| | Expenses paid for quality control check activity | | 4,000 |
| | Research and Development Cost | | 5,000 |
| | Administration Overheads (Production) | | 15,000 |
| | Primary Packing Cost | | 8,000 |
| (iv) | **Cost of Production** | | **3,78,000** |
| | *Add:* Opening stock of finished goods | | 28,000 |
| | *Less:* Closing stock of finished goods | | (**50,400**) |
| (v) | **Cost of Goods Sold** | | **3,55,600** |
| | Advertisement expenses | | 1,300 |
| | Packing cost for re-distribution of finished goods sold | | 1,500 |
| (vi) | **Cost of Sales** | | **3,58,400** |

**Note:** Valuation of Closing stock of finished goods

= $\dfrac{\text{3,78,000}}{\text{3000 units}}$ × 400 units

= ₹50,400

**II.** Cost per unit sold = $\dfrac{\text{3,58,400}}{\text{200+3,000-400}}$ = ₹ 128 per unit

∴ Selling Price = $\dfrac{128}{80\%}$ = **₹160 per unit**
#### Approach
Build the cost sheet in the standard order (materials consumed, prime cost, factory cost, cost of production, cost of goods sold, cost of sales), placing each expense at the stage it belongs to; value closing finished stock at this month's cost of production per unit.

---
item: q4a
qno: 4
part: (a)
marks: 10
type: descriptive
tags: cma.proc.eu, cma.proc.accounts, cma.mc.decisions
difficulty: medium
note: The text layer's "Pr ocess II" (question) is "Process II" on the page and is written so. Kept as printed: the mixed quotes of "Chemical ‘G'" (requirement (i)) and "Chemical 'G’" (requirement (ii)), "work-in progress" (requirement (ii)), "(Note: You are not required to prepare Process Accounts)" printed after the marks line on p.17, and the answer's heading "Statement showing cost per kg of each statement" (Alternative Presentation).
q: 15-17
a: 17-19
---
#### Question
STG Limited is a manufacturer of Chemical 'GK', which is required for industrial use. The complete production operation requires two processes. The raw material first passes through Process I, where Chemical 'G' is produced. Following data is furnished for the month April 2022:

| Particulars | (in kgs.) |
|---|---:|
| Opening work-in-progress quantity<br>(Material 100% and conversion 50% complete) | 9,500 |
| Material input quantity | 1,05,000 |
| Work Completed quantity | 83,000 |
| Closing work-in-progress quantity<br>(Material 100% and conversion 60% complete) | 16,500 |

You are further provided that:

| Particulars | (in ₹) |
|---|---:|
| Opening work-in-progress cost | |
| Material cost | 29,500 |
| Processing cost | 14,750 |
| Material input cost | 3,34,500 |
| Processing cost | 2,53,100 |

Normal process loss may be estimated to be 10% of material input. It has no realizable value. Any loss over and above normal loss is considered to be 100% complete in material and processing.

The Company transfers 60,000 kgs. of output (Chemical G) from Process I to Process II for producing Chemical 'GK'. Further materials are added in Process II which yield 1.20 kg. of Chemical 'GK' for every kg. of Chemical 'G' introduced. The chemicals transferred to Process II for further processing are then sold as Chemical 'GK' for ₹ 10 per kg. Any quantity of output completed in Process I, are sold as Chemical 'G' @ ₹ 9 per kg.

The monthly costs incurred in Process II (other than the cost of Chemical 'G') are:

Input 60,000 kg. of Chemical 'G'

Materials Cost ₹ 85,000

Processing Costs ₹ 50,000

You are required:

(i) Prepare Statement of Equivalent production and determine the cost per kg. of Chemical ‘G' in Process I using the weighted average cost method.

(ii) Prepare a statement showing cost of Chemical 'G’ transferred to Process II, cost of abnormal loss and cost of closing work-in progress.

(iii) STG is considering the option to sell 60,000 kg. of Chemical 'G' of Process I without processing it further in Process-II. Will it be beneficial for the company over the current pattern of processing 60,000 kg in process-II?

(Note: You are not required to prepare Process Accounts)
#### Answer
**(i) Statement of Equivalent Production**

| Particulars | Input quantity | Particulars | Total | Material | | Processing Cost | |
|---|---:|---|---:|---:|---:|---:|---:|
| | | | | **%** | **Units** | **%** | **Units** |
| Opening WIP | 9,500 | Units completed | 83,000 | 100% | 83,000 | 100% | 83,000 |
| Material Input | 1,05,000 | Normal loss (10% of 1,05,000) | 10,500 | - | - | - | - |
| | | Abnormal loss (Bal. fig.) | 4,500 | 100% | 4,500 | 100% | 4,500 |
| | | Closing WIP | 16,500 | 100% | 16,500 | 60% | 9,900 |
| | 1,14,500 | | 1,14,500 | | 1,04,000 | | 97,400 |

**Statement of Cost for each element**

| Particulars | Material (₹) | Processing (₹) | Total cost (₹) |
|---|---:|---:|---:|
| Cost of opening WIP | 29,500 | 14,750 | 44,250 |
| Cost incurred during the month | 3,34,500 | 2,53,100 | 5,87,600 |
| Total cost (A) | 3,64,000 | 2,67,850 | 6,31,850 |
| Equivalent production (B) | 1,04,000 | 97,400 | |
| Cost per kg of Chemical ‘G’ (A/B) | **3.5** | **2.75** | 6.25 |

**Alternative Presentation**

**Statement showing cost per kg of each statement**

| | (₹) | (₹) |
|---|---:|---:|
| Material | (29,500 + 3,34,500)/1,04,000 | 3.5 |
| Processing cost | (14,750 + 2,53,100)/97,400 | 2.75 |
| Total Cost per kg | | 6.25 |

**(ii) Statement showing cost of Chemical ‘G’ transferred to Process II, cost of abnormal loss and cost of closing work-in- progress**

| | (₹) |
|---|---:|
| **Units transferred** (60,000 × 6.25) | **3,75,000** |
| **Abnormal loss** (4,500 × 6.25) | **28,125** |
| **Closing work in progress**: | |
| Material (16,500 × 3.5) | **57,750** |
| Processing cost (9,900 × 2.75) | **27,225** |
| | 84,975 |

**(iii) Calculation of Incremental Profit / Loss after further processing**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| Sales if further processed (A) (60,000 x 1.20 x ₹ 10) | 7,20,000 | |
| Calculation of cost in Process II | | |
| Chemical transferred from Process I | 3,75,000 | |
| Add: Material cost | 85,000 | |
| Add: Process cost | 50,000 | |
| Total cost of finished stock (B) | 5,10,000 | |
| Profit, if further processed (C = A – B) | | 2,10,000 |
| If sold without further processing then, | | |
| Sales (60,000 x ₹ 9) | 5,40,000 | |
| Less: Cost of input without further processing | 3,75,000 | |
| Profit without further processing (D) | | 1,65,000 |
| Incremental Profit after further processing (C – D) | | 45,000 |

Additional net profit on further processing in Process II is 45,000. Therefore, it is advisable to process further chemical ‘G’.

**Alternative Presentation**

**Calculation of Incremental Profit / Loss after further processing**

| | (₹) |
|---|---:|
| If 60,000 units are sold @ ₹ 9 | 5,40,000 |
| If 60,000 units are processed in process II (60,000 × 1.2 × ₹ 10) | 7,20,000 |
| Incremental Revenue (A) | 1,80,000 |
| Incremental Cost: (B) | |
| Material Cost | 85,000 |
| Processing Cost | 50,000 |
| | 1,35,000 |
| Incremental Profit (A-B) | 45,000 |

Additional net profit on further processing in Process II is 45,000. Therefore, it is advisable to process further chemical ‘G’.
#### Approach
Fix the normal loss at 10% of material input and take the abnormal loss as the balancing figure before computing equivalent units; under the weighted average method opening WIP cost is added to the month's cost. For (iii), only the incremental revenue and the Process II costs matter.

---
item: q4b
qno: 4
part: (b)
marks: 5
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: easy
note: Kept as printed: the alternative presentation's line "Fixed cost = TC – VC , 58,20,000 (360 x12,000 units) ₹15,00,000" (p.20).
q: 17
a: 19-20
---
#### Question
UV Limited started a manufacturing unit from 1st October 2021. It produces designer lamps and sells its lamps at ₹ 450 per unit.

During the quarter ending on 31st December, 2021, it produced and sold 12,000 units and suffered a loss of ₹ 35 per unit.

During the quarter ending on 31st March, 2022, it produced and sold 30,000 units and earned a profit of ₹ 40 per unit.

You are required to calculate:

(i) Total fixed cost incurred by UV ltd. per quarter.

(ii) Break Even sales value (in rupees)

(iii) Calculate Profit, if the sale volume reaches 50,000 units in the next quarter (i.e., quarter ending on 30th June, 2022).
#### Answer
| | Quarter ending 31st December, 2021 (₹) | Quarter ending 31st March, 2022 (₹) |
|---|---:|---:|
| Sales (No. of units sold x ₹ 450 per unit) | 54,00,000 | 1,35,00,000 |
| Profit (Loss) | (4,20,000)<br>[12,000 × 35] | 12,00,000<br>[30,000 × 40] |

P/V Ratio = $\dfrac{\text{Change in profit}}{\text{Change in Sales}} \times 100$

∴ $\dfrac{\text{16,20,000}}{\text{81,00,000}}$ ×100 = **20%**

(i) Fixed Cost = Sales × P/V ratio – profit

= ₹ 1,35,00,000 × 20% – 12,00,000

= ₹ 15,00,000

**Alternative Presentation for the calculation of Fixed cost**

| | Quarter ending 31st December, 2021 (₹) | Quarter ending 31st March, 2022 (₹) |
|---|---:|---:|
| Sales (No. of units sold x ₹ 450 per unit) | 54,00,000 | 1,35,00,000 |
| Profit (Loss) | (4,20,000)<br>[12,000 × 35] | 12,00,000<br>[30,000 × 40] |
| Total cost | 58,20,000 | 1,23,00,000 |

VC per unit = (1,23,00,000 – 58,20,000) / (30,000 – 12,000)

= 64,80,000 / 18,000 =₹ 360 per unit

Fixed cost = TC – VC , 58,20,000 (360 x12,000 units) ₹15,00,000

(ii) Break even sales value (in Rupees) = $\dfrac{\text{Fixed cost}}{\text{P/V ratio}} \times 100$

= $\dfrac{\text{15,00,000}}{20\%}$ = **₹75,00,000**

(iii) Profit, if sales reach 50,000 units for the quarter ending 30th June, 2022

| | (₹) |
|---|---:|
| Sales (50,000 × ₹ 450) | 2,25,00,000 |
| Less: Variable cost | 1,80,00,000 |
| Contribution | 45,00,000 |
| Less: Fixed cost | 15,00,000 |
| Profit | 30,00,000 |
#### Approach
Turn the per-unit loss and profit into quarterly totals; with the selling price fixed, the change in profit over the change in sales gives the P/V ratio, from which fixed cost and break-even sales follow.

---
item: q4c
qno: 4
part: (c)
marks: 5
type: descriptive
tags: cma.sys.ledgers
difficulty: easy
note: Kept as printed: ICAI's closing note "(Note: Costing P/&/L = P/&/L and SLC = MLC)".
q: 17
a: 21
---
#### Question
Journalize the following transactions assuming the cost and financial accounts are integrated:

| Particulars | Amount (₹) |
|---|---:|
| Direct Materials issued to production | ₹ 5,88,000 |
| Allocation of Wages (Indirect) | ₹ 7,50,000 |
| Factory Overheads (Over absorbed) | ₹ 2,25,000 |
| Administrative Overheads (Under absorbed) | ₹ 1,55,000 |
| Deficiency found in stock of Raw material (Normal) | ₹ 2,00,000 |
#### Answer
| | Particulars | | (₹) | (₹) |
|---|---|---|---:|---:|
| (i) | Work-in-Progress Ledger Control A/c | Dr. | 5,88,000 | |
| | To Stores Ledger Control A/c | | | 5,88,000 |
| | (Being issue of direct materials to production) | | | |
| (ii) | Factory Overhead control A/c | Dr. | 7,50,000 | |
| | To Wages Control A/c | | | 7,50,000 |
| | (Being allocation of Indirect wages) | | | |
| (iii) | Factory Overhead Control A/c | Dr. | 2,25,000 | |
| | To Costing Profit & Loss A/c | | | 2,25,000 |
| | (Being transfer of over absorption of Factory overhead) | | | |
| (iv) | Costing Profit & Loss A/c | Dr. | 1,55,000 | |
| | To Administration Overhead Control A/c | | | 1,55,000 |
| | (Being transfer of under absorption of Administration overhead) | | | |
| (v) | Factory Overhead Control A/c | Dr. | 2,00,000 | |
| | To Stores Ledger Control A/c | | | 2,00,000 |
| | (Being transfer of deficiency in stock of raw material) | | | |

**(Note: Costing P/&/L = P/&/L and SLC = MLC)**
#### Approach
In an integrated system the entries run through the control accounts: materials issued go to Work-in-Progress, indirect wages to Factory Overhead, and the over- or under-absorbed overhead is closed to Costing Profit & Loss.

---
item: q5a
qno: 5
part: (a)
marks: 10
type: descriptive
tags: cma.abc.compute
difficulty: medium
note: Kept as printed: the answer's heading Statement Showing “Cost per unit using “Activity Based Costing” (unbalanced quotes). The (ii) statement runs over pp.23-24, where ICAI repeats its header row "Products AX BX CX"; it is one table here. The question's footnote marker after "Materials per Unit" is written as a superscript.
q: 21-22
a: 23-24
---
#### Question
Star Limited manufacture three products using the same production methods. A conventional product costing system is being used currently. Details of the three products for a typical period are:

| Product | Labour Hrs. per unit | Machine Hrs. per unit | Materials per Unit$^1$ | Volume in Units |
|---|---:|---:|---:|---:|
| AX | 1.00 | 2.00 | 35 | 7,500 |
| BX | 0.90 | 1.50 | 25 | 12,500 |
| CX | 1.50 | 2.50 | 45 | 25,000 |

Direct Labour costs ₹ 20 per hour and production overheads are absorbed on a machine hour basis. The overhead absorption rate for the period is ₹ 30 per machine hour.

Management is considering using Activity Based Costing system to ascertain the cost of the products. Further analysis shows that the total production overheads can be divided as follows:

| Particulars | % |
|---|---:|
| Cost relating to set-ups | 40 |
| Cost relating to machinery | 10 |
| Cost relating to material handling | 30 |
| Costs relating to inspection | 20 |
| Total production overhead | 100 |

The following activity volumes are associated with the product line for the period as a whole. Total activities for the period:

| Product | No. of set-ups | No. of movements of Materials | No. of inspections |
|---|---:|---:|---:|
| AX | 350 | 200 | 200 |
| BX | 450 | 280 | 400 |
| CX | 740 | 675 | 900 |
| Total | 1,540 | 1,155 | 1,500 |

Required:

(i) Calculate the cost per unit for each product using the conventional method.

(ii) Calculate the cost per unit for each product using activity based costing method.

$^1$ Material cost per unit
#### Answer
**(i) Statement showing “Cost per unit” using “conventional method”**

| Particulars of Costs | AX (₹) | BX (₹) | CX (₹) |
|---|---:|---:|---:|
| Direct Materials | 35 | 25 | 45 |
| Direct Labour | 20 | 18 | 30 |
| Production Overheads | 60 | 45 | 75 |
| Cost per unit | 115 | 88 | 150 |

**(ii) Statement Showing “Cost per unit using “Activity Based Costing”**

| Products | AX | BX | CX |
|---|---:|---:|---:|
| Production (units) | 7,500 | 12,500 | 25,000 |
| | (₹) | (₹) | (₹) |
| Direct Materials | 2,62,500 | 3,12,500 | 11,25,000 |
| Direct Labour | 1,50,000 | 2,25,000 | 7,50,000 |
| Machine Related Costs | 45,000 | 56,250 | 1,87,500 |
| Setup Costs | **2,62,500** | **3,37,500** | **5,55,000** |
| Material handling Cost | **1,50,000** | **2,10,000** | **5,06,250** |
| Inspection Costs | **77,000** | **1,54,000** | **3,46,500** |
| Total Costs | 9,47,000 | 12,95,250 | 34,70,250 |
| **Cost *per unit* (Total Cost ÷ Units)** | **126.267** | **103.62** | **138.81** |

**Working Notes:**

**Calculation of Total Machine hours**

| Particulars | AX | BX | CX |
|---|---:|---:|---:|
| (A) Machine hours per unit | 2 | 1.5 | 2.5 |
| (B) Production (units) | 7,500 | 12,500 | 25,000 |
| (C) Total Machine hours (A× B) | 15,000 | 18,750 | 62,500 |

Total Machine hours = 96,250

Total Production overheads = 96,250 × 30 = ₹ 28,87,500

**Calculation of Cost Driver Rate**

| Cost Pool | % | Overheads (₹) | Cost Driver (Basis) | Cost Driver (Units) | Cost Driver Rate (₹) |
|---|---:|---:|---:|---:|---:|
| Set up | 40 | 11,55,000 | No of set ups | 1,540 | 750 per set up |
| Machine Operation | 10 | 2,88,750 | Machine hours | 96,250 | 3 per machine hour |
| Material Handling | 30 | 8,66,250 | No of material movement | 1,155 | 750 per material movement |
| Inspection | 20 | 5,77,500 | No of inspection | 1,500 | 385 per inspection |
#### Approach
Find total production overhead first (total machine hours × ₹ 30), split it into the four cost pools, and divide each pool by its driver volume; then charge each product its driver usage at those rates.

---
item: q5b
qno: 5
part: (b)
marks: 5
type: descriptive
tags: cma.std.labour
difficulty: medium
note: Kept as printed: "When 120 worker works for 1 hr." (working note 1).
q: 22
a: 24-25
---
#### Question
A manufacturing department of a company has employed 120 workers. The standard output of product ''NPX" is 20 units per hour and the standard wage rate is ₹ 25 per labour hour.

In a 48 hours week, the department produced 1,000 units of 'NPX' despite 5% of the time paid being lost due to an abnormal reason. The hourly wages actually paid were ₹ 25.70 per hour.

Calculate:

(i) Labour Cost Variance

(ii) Labour Rate Variance

(iii) Labour Efficiency Variance

(iv) Labour Idle time Variance
#### Answer
**Working Notes:**

1\. Calculation of standard man hours

When 120 worker works for 1 hr., then the std. output is 20 units.

Std. man hour per unit = $\dfrac{\text{120 hrs.}}{\text{20 units}}$ = 6 hrs.

2\. Calculation of std. man hours for actual output

Total std. man hours = 1,000 units × 6 hrs. = 6,000 hrs.

| Standard for actual | | | Actual | | | | |
|---|---:|---:|---:|---:|---:|---:|---:|
| **Hours** | **Rate (₹)** | **Amount (₹)** | **Actual hrs. paid** | **Idle time hrs.** | **Production hrs.** | **Rate (₹)** | **Amount paid (₹)** |
| 6,000 | 25 | 1,50,000 | 5,760<br>(48 hrs. x 120 workers) | 288 | 5,472 | 25.70 | 1,48,032 |

**(i) Labour cost variance**

= Std. labour cost – Actual labour cost

= 1,50,000 – 1,48,032 = ₹ 1,968 F

**(ii) Labour rate variance**

= (SR – AR) × $AH_{Paid}$

= (25 - 25.70) × 5,760 = ₹ 4,032 A

**(iii) Labour efficiency variance**

= (SH – AH) × SR

= (6,000 – 5,472) × 25 = ₹ 13,200 F

**(iv) Labour Idle time variance**

= Idle Hours × SR

= 288 × 25 = ₹ 7,200 A

Note: Variances can also be calculated for one worker instead of 120.
#### Approach
Standard hours for the actual output come from the gang's standard output (120 workers make 20 units an hour); split the hours paid into idle time (5%) and productive hours before computing rate, efficiency and idle time variances.

---
item: q5c
qno: 5
part: (c)
marks: 5
type: descriptive
tags: cma.joint.further, cma.joint.apportion
difficulty: easy
note: Kept as printed: the heading "Statement showing profit/loss by each product after further processing products" ((i)), the column heads "(in ₹)" over the output and weight rows of the apportionment statement, and "to sale product Y" ((ii)).
q: 23
a: 25-26
---
#### Question
RST Limited produces three joint products X, Y and Z. The products are processed further. Pre-separation costs are apportioned on the basis of weight of output of each joint product. The following data are provided for the month of April, 2022.

Cost incurred up to separation point: ₹ 10,000

| | Product X | Product Y | Product Z |
|---|---:|---:|---:|
| Output (in Litre) | 100 | 70 | 80 |
| | ₹ | ₹ | ₹ |
| Cost incurred after separation point | 2,000 | 1,200 | 800 |
| Selling Price per Litre: | | | |
| After further processing | 50 | 80 | 60 |
| At pre-separation point (estimated) | 25 | 70 | 45 |

You are required to:

(i) Prepare a statement showing profit or loss made by each product after further processing using the presently adopted method of apportionment of pre-separation cost.

(ii) Advise the management whether, on purely financial consideration, the three products are to be processed further or not.
#### Answer
**(i) Statement showing profit/loss by each product after further processing products**

| | Product X (in ₹) | Product Y (in ₹) | Product Z (in ₹) |
|---|---:|---:|---:|
| Sales value after further processing | 5,000 | 5,600 | 4,800 |
| Less: Further processing cost | 2,000 | 1,200 | 800 |
| Less: Joint Cost\* (as apportioned) | 4,000 | 2,800 | 3,200 |
| Profit/(loss) | (1,000) | 1,600 | 800 |

\* Statement showing apportionment of joint cost on the basis of physical units

| | Product X (in ₹) | Product Y (in ₹) | Product Z (in ₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Output (in litre) | 100 | 70 | 80 | 250 |
| Weight | 0.4<br>(100/250) | 0.28<br>(70/250) | 0.32<br>(80/250) | |
| Joint cost apportioned | 4,000 | 2,800 | 3,200 | |

**(ii) Decision whether to process further or not**

| | Product X (in ₹) | Product Y (in ₹) | Product Z (in ₹) |
|---|---:|---:|---:|
| Incremental Revenue | 2,500<br>[(50-25) × 100] | 700<br>[(80-70) × 70] | 1,200<br>[(60-45) × 80] |
| Less: Further processing cost | 2,000 | 1,200 | 800 |
| Incremental profit /(loss) | 500 | (500) | 400 |

| | Product X (in ₹) | Product Y (in ₹) | Product Z (in ₹) | Total |
|---|---:|---:|---:|---:|
| Sales | 2500 | 4900 | 3600 | 11000 |
| Pre separation costs | 4000 | 2800 | 3200 | 10000 |
| Profit/(Loss) | (1500) | 2100 | 400 | 1000 |

It is advisable to further process only product X and Z and to sale product Y at the point of separation.
#### Approach
Apportion the joint cost by output (litres) for the profit statement, but decide on further processing by incremental revenue over split-off value against the further processing cost only; the joint cost is irrelevant to that decision.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.intro.install
difficulty: easy
note: Question 6 opens with ICAI's instruction "Answer any four of the following:" for parts (a) to (e), "(4 x 5 = 20 Marks)" (pp.26-27); the instruction is a heading of the question, not transcribed in the items. ICAI labels the features of its answer (a) to (f) inside part (a); kept as printed.
q: 26
a: 27-28
---
#### Question
Briefly explain the essential features of a good Cost Accounting System.
#### Answer
**The essential features, which a good cost accounting system should possess, are as follows:**

**(a) Informative and simple:** Cost accounting system should be tailor-made, practical, simple and capable of meeting the requirements of a business concern. The system of costing should not sacrifice the utility by introducing inaccurate and unnecessary details.

**(b) Accurate and authentic:** The data to be used by the cost accounting system should be accurate and authenticated; otherwise it may distort the output of the system and a wrong decision may be taken.

**(c) Uniformity and consistency:** There should be uniformity and consistency in classification, treatment and reporting of cost data and related information. This is required for benchmarking and comparability of the results of the system for both horizontal and vertical analysis.

**(d) Integrated and inclusive:** The cost accounting system should be integrated with other systems like financial accounting, taxation, statistics and operational research etc. to have a complete overview and clarity in results.

**(e) Flexible and adaptive:** The cost accounting system should be flexible enough to make necessary amendment and modifications in the system to incorporate changes in technological, reporting, regulatory and other requirements.

**(f) Trust on the system:** Management should have trust on the system and its output. For this, an active role of management is required for the development of such a system that reflects a strong conviction in using information for decision making.

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.mat.receipts
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. Kept as printed: "delay in uploading or offloading of materials" (Demurrage) and "Shortage in materials are treated as follows".
q: 26
a: 28
---
#### Question
Write down the treatment of following items associated with purchase of materials.

(i) Cash discount

(ii) IGST

(iii) Demurrage

(iv) Shortage

(v) Basic Custom Duty
#### Answer
Treatment of items associated with purchase of materials is tabulated as below

| S. No. | Items | Treatment |
|---|---|---|
| (i) | Cash Discount | Cash discount is not deducted from the purchase price. It is treated as interest and finance charges. It is ignored. |
| (ii) | Integrated Goods and Service Tax (IGST) | Integrated Goods and Service Tax (IGST) is paid on inter-state supply of goods and provision of services and collected from the buyers. It is excluded from the cost of purchase if credit for the same is available. Unless mentioned specifically it should not form part of cost of purchase. |
| (iii) | Demurrage | Demurrage is a penalty imposed by the transporter for delay in uploading or offloading of materials. It is an abnormal cost and not included with cost of purchase |
| (iv) | Shortage | Shortage in materials are treated as follows:<br>**Shortage due to normal reasons:** Good units absorb the cost of shortage due to normal reasons. Losses due to breaking of bulk, evaporation, or due to any unavoidable conditions etc. are the reasons of normal loss.<br>**Shortage due to abnormal reasons:** Shortage arises due to abnormal reasons such as material mishandling, pilferage, or due to any avoidable reasons are not absorbed by the good units. Losses due to abnormal reasons are debited to costing profit and loss account. |
| (v) | Basic Custom Duty | Basic Custom duty is paid on import of goods from outside India. It is added with the purchase cost. |

---
item: q6c
qno: 6
part: (c)
marks: 5
type: descriptive
tags: cma.emp.idle
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 27
a: 29
---
#### Question
Explain the treatment of Overtime Premium in following situations:

(i) SV & Co. wants to grab some special orders, and overtime is required to meet the same.

(ii) Dept. X has to work overtime to make up a shortfall in production due to some fault of management in dept. Y.

(iii) S Ltd. has to work overtime regularly throughout the year as a policy due to the workers' shortage.

(iv) Due to flood in Odisha, RS Ltd. has to work overtime to complete the job.

(v) A customer requested the company MN Ltd. to expedite the job because of his urgency of work.
#### Answer
**Treatment of Overtime premium in different situations**

| | Situation | Treatment |
|---|---|---|
| (i) | SV & Co. wants to grab some special orders, and overtime is required to meet the same. | If overtime is required to cope with general production programmes or for meeting urgent orders, the overtime premium should be treated as overhead cost of the particular department or cost centre which works overtime. |
| (ii) | Dept. X has to work overtime to make up a shortfall in production due to some fault of management in dept. Y. | If overtime is worked in a department due to the fault of another department, the overtime premium should be charged to the latter department (Y). |
| (iii) | S Ltd. has to work overtime regularly throughout the year as a policy due to the workers’ shortage. | The overtime premium is treated as a part of employee cost and job is charged at an effective average wage rate. |
| (iv) | Due to flood in Odisha, RS Ltd. has to work overtime to complete the job. | Overtime worked on account of abnormal conditions such as flood, earthquake etc., should not be charged to cost, but to Costing Profit and Loss Account. |
| (v) | A customer requested the company MN Ltd. to expedite the job because of his urgency of work. | Where overtime is worked at the request of the customer, overtime premium is also charged to the job/ customer directly. |

---
item: q6d
qno: 6
part: (d)
marks: 5
type: descriptive
tags: cma.std.setting
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. Kept as printed: "One of the chief problem faced", "adopt themselves to the system" and "Cost reduction and cost control is a cardinal feature of standard costing because standards once set do not always remain stable".
q: 27
a: 29-30
---
#### Question
Discuss briefly some of the criticism which may be levelled against the Standard Costing System.
#### Answer
**Criticism of Standard Costing**

**(i) Variation in price:** One of the chief problem faced in the operation of the standard costing system is the precise estimation of likely prices or rate to be paid. The variability of prices is so great that even actual prices are not necessarily adequately representative of cost. But the use of sophisticated forecasting techniques should be able to cover the price fluctuation to some extent. Besides this, the system provides for isolating uncontrollable variances arising from variations to be dealt with separately.

**(ii) Varying levels of output:** If the standard level of output set for pre-determination of standard costs is not achieved, the standard costs are said to be not realised. However, the statement that the capacity utilisation cannot be precisely estimated for absorption of overheads may be true only in some industries of jobbing type. In vast majority of industries, use of forecasting techniques, market research, etc., help to estimate the output with reasonable accuracy and thus the variation is unlikely to be very large. Prime cost will not be affected by such variation and, moreover, variance analysis helps to measure the effects of idle time.

**(iii) Changing standard of technology:** In case of industries that have frequent technological changes affecting the conditions of production, standard costing may not be suitable. This criticism does not affect the system of standard costing. Cost reduction and cost control is a cardinal feature of standard costing because standards once set do not always remain stable. They have to be revised.

**(iv) Attitude of technical people:** Technical people are accustomed to think of standards as physical standards and, therefore, they will be misled by standard costs. Since technical people can be educated to adopt themselves to the system through orientation courses, it is not an insurmountable difficulty.

**(v) Mix of products:** Standard costing presupposes a pre-determined combination of products both in variety and quantity. The mixture of materials used to manufacture the products may vary in the long run but since standard costs are set normally for a short period, such changes can be taken care of by revision of standards.

**(vi) Level of Performance:** Standards may be either too strict or too liberal because they may be based on (a) theoretical maximum efficiency, (b) attainable good performance or (c) average past performance. To overcome this difficulty, the management should give thought to the selection of a suitable type of standard. The type of standard most effective in the control of costs is one which represents an attainable level of good performance.

**(vii) Standard costs cannot possibly reflect the true value in exchange:** If previous historical costs are amended roughly to arrive at estimates for ad hoc purposes, they are not standard costs in the strict sense of the term and hence they cannot also reflect true value in exchange. In arriving at standard costs, however, the economic and technical factors, internal and external, are brought together and analysed to arrive at quantities and prices which reflect optimum operations. The resulting costs, therefore, become realistic measures of the sacrifices involved.

**(viii) Fixation of standards may be costly:** It may require high order of skill and competency. Small concerns, therefore, feel difficulty in the operation of such system.

---
item: q6e
qno: 6
part: (e)
marks: 5
type: descriptive
tags: cma.intro.methods
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. The answer's table words statement (iii) "Cost is ascertained for a single product." where the question prints "Costs ascertained for a single product."; both kept as printed.
q: 27
a: 30
---
#### Question
Identify the methods of costing from the following statements:

(i) Costs are directly charged to a group of products.

(ii) Nature of the product is complex and method cannot be ascertained.

(iii) Costs ascertained for a single product.

(iv) All costs are directly charged to a specific job.

(v) Costs are charged to operations and averaged over units produced.
#### Answer
**Method of costing followed:**

| | Situation | Method of costing |
|---|---|---|
| (i) | Costs are directly charged to a group of products. | Batch costing |
| (ii) | Nature of the product is complex and method cannot be ascertained. | Multiple costing |
| (iii) | Cost is ascertained for a single product. | Unit/ Single/Output costing |
| (iv) | All costs are directly charged to a specific job. | Job costing |
| (v) | Costs are charged to operations and averaged over units produced. | Process costing |
