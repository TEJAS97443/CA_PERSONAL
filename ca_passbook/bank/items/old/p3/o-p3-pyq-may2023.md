<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p3-pyq-may2023
paper: p3
kind: pyq
attempt: may2023
qfile: old/p3/pyq-may2023-a.pdf
afile: old/p3/pyq-may2023-a.pdf
paperfile: old/p3/pyq-may2023-q.pdf
choice: q1; any 4 of q2-q6; q6: any 4 of (a)-(e)
q: 1
status: checked
by: tx-37
date: 2026-10-20
note: Old-scheme Intermediate Paper 3 Cost and Management Accounting, May 2023. Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer and print every marks note; the question-paper scan is linked as paperfile and was not used for the text. The paper is wholly descriptive (no MCQs): Q1 (4 x 5 marks) and Q2-Q6 (20 marks each). Instructions: the lines printed under the paper's title on p.1. No choice rule: besides Question 1 compulsory and any four of Q2-Q6, Q6 says "Answer any four of the following" of its five 5-mark parts (a)-(e), "(4 x 5 = 20 Marks)", a choice inside a question that choice: cannot express (it would count 25 marks for Q6), so, as with o-p7-mtp-may2018-s1 and o-p6-pyq-nov2023, the paper is practice only and never sat; each Q6 part is an item of 5 marks. The question-level lead-ins "Answer the following:" (Q1) and "Answer any four of the following:" (Q6) are not item text (see q6a's note). Question text is italic throughout ICAI's PDF; that styling is not reproduced; bold headings and bold words in ICAI's answers are kept as **bold**. Old-scheme mapping (ours): Q2(b) (contract costing) is out of syllabus, see its note; every other item is tagged to the current Paper 4 sub-topics. ICAI's own figures and wording are kept as printed where they look wrong (each in the item's note): Q1(a) "₹1,35,000 units", Q2(b) "₹ 12,000 units" and "(88,000 x 130)", Q3(b)'s Hindi-version alternative solution, Q5(b) 61,000 in the question against 61,500 in the answer. Accepted numbers (each read on the page): 3 is the paper's title "PAPER – 3: COST AND MANAGEMENT ACCOUNTING" on p.1 (not transcribed); 1 to 6 are the question numbers, which ICAI prints once ("Question N" above the question; its "Answer" carries no number) while check.py counts them for both the question and the answer of the same file. | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four of the remaining five questions (the Instructions), and Q6's "Answer any four of the following" over its five 5-mark parts (a)-(e), written q6: any 4 of (a)-(e); the paper can now be sat (maximum 100, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
---
#### Instructions
Question No. 1 is compulsory.

Attempt any **four** questions out of the remaining **five** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: cma.unit.batch
difficulty: easy
q: 1
a: 3
---
#### Question
TSK Limited manufactures a variety of products. The annual demand for one of its products- Product 'X' is estimated as ₹1,35,000 units. Product 'X' is to be manufactured done in batches. Set up cost of each batch is ₹ 3,375 and inventory holding cost is ₹ 5 per unit. It is expected that demand of Product 'X' would be uniform throughout the year.

**Required:**

(i) Calculate the Economic Batch (EBQ) for Product 'X'.

(ii) Assuming that the company has a policy of manufacturing 7,500 units of Product 'X' per batch, calculate the additional cost incurred as compared to the cost incurred as per Economic Batch Quantity (EBQ) as computed in (i) above.
#### Answer
**(i)** Economic Batch Quantity (EBQ) = $\sqrt{\dfrac{2DS}{C}}$

where,

D = Annual demand for the product

S = Set-up cost per batch

C = Carrying cost per unit per annum.

$\sqrt{\dfrac{2DS}{C}} = \sqrt{\dfrac{2 \times 1{,}35{,}000 \times 3{,}375}{5}}$ = **13,500 units.**

**(ii)** Total Cost (of maintaining the inventories) when batch size (Q) are 13,500 and 7,500 units respectively

Total cost = Total set-up cost + Total carrying cost.

| | When batch size is 13,500 units | When batch size is 7,500 units |
|---|---|---|
| Total set up cost | = 1,35,000/13,500 × ₹ 3,375 =<br>₹ 33,750<br>Or,<br>No. of setups = 10<br>= 10 x ₹ 3,375 = ₹ 33,750 | = 1,35,000/7,500 × ₹ 3,375<br>= ₹ 60,750 |
| Total Carrying cost | 1/2 × 13,500 × 5<br>= ₹ 33,750 | 1/2 × 7,500 × 5<br>= ₹ 18,750 |
| Total Cost | ₹ 67,500 | ₹ 79,500 |

₹ 12,000 is the excess cost borne by the company due to batch size not being economic batch quantity.

**Alternative presentation**

| | EOQ 13,500 | Batch size 7500 | Extra cost | Saving |
|---|---|---|---|---:|
| No of setup | 10 | 18 | 8 x 3375 = 27,000 | |
| Carrying cost | 13,500 – 7500 = 6000/ 2 @ 5 | | | 15,000 |

Net extra cost = (27,000- 15,000) = ₹ 12,000
#### Approach
EBQ is the EOQ formula with the set-up cost in place of the ordering cost. For (ii), compare total set-up cost plus total carrying cost at both batch sizes.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.emp.incentives
difficulty: medium
q: 1-2
a: 4
---
#### Question
SMC Company Limited is producing a particular design of toys under the following existing incentive system:

| | |
|---|---|
| Normal working hours in the week | 48 hours |
| Late shift hours in the week | 12 hours |
| Rate of payment | Normal working: ₹ 150 per hour<br>Late shift: ₹ 300 per hour |

Average output per operator for 60 hours per week (including late shift hours): 80 toys.

The company's management has now decided to implement a system of labour cost payment with either the Rowan Premium Plan or the Halsey Premium Plan in order to increase output, eliminate late shift overtime, and reduce the labour cost.

The following information is obtained:

The standard time allotted for ten toys is seven and half hours.

Time rate: ₹ 150 per hour (as usual).

Assuming that the operator works for 48-hours in a week and produces 100 toys, you are required to calculate the weekly earnings for one operator under-

(i) The existing Time Rate,

(ii) Rowan Premium Plan and,

(iii) Halsey Premium Plan (50%).
#### Answer
**Working Notes:**

**(1) Effective rate per hour:**

Incentive for 60 hours = (₹ 150 × 48 hours + ₹ 300 × 12 hours)

= 7,200 + 3,600 = ₹ 10,800

= ₹ 10,800 ÷ 60 hours = ₹ 180 per hour

**(2) Time taken/ Allowed to produce 100 toys:**

**= (60 hours ÷ 80 toys) × 100 toys = 75 hours**

**(3) Time saved = Time Allowed – Time Taken**

= 75 hours – 48 hours = 27 hours

**(i) Calculation of weekly earnings for one operator under the existing time rate:**

= (48 hours x ₹ 150) + (12 hours x ₹ 300) **= ₹ 10,800**

**Alternative solution**

= Effective rate per hour (WN-1) × Time required for 100 toys (WN-2)

= ₹ 180 × 75 hours = **₹ 13,500**

**(ii) Calculation of weekly earnings for one operator under Rowan Premium plan:**

(Time taken × Rate per hour) + (Time Saved/ Time Allowed × Time taken × Rate per hour)

= (48 hours × ₹ 150) + [(27 ÷ 75) × 48 × ₹ 150]

= 7,200 + 2,592 = **₹ 9,792**

**(iii) Calculation of weekly earnings for one operator under Halsey Premium plan:**

(Time taken × Rate per hour) + (50% of Time Saved × Rate per hour)

= (48 hours × ₹ 150) + (50% of 27 hours × ₹ 150)

= ₹ 7,200 + ₹ 2,025 = **₹ 9,225**
#### Approach
Work out the time allowed for 100 toys and the time saved against the 48 hours taken; Rowan's bonus is time saved ÷ time allowed × time taken × rate, Halsey's is 50% of time saved × rate.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: cma.mc.bep, cma.mc.basics
difficulty: easy
q: 2
a: 4-5
---
#### Question
The following information pertains to ZB Limited for the year:

| | |
|---|---:|
| Profit volume ratio | 30% |
| Margin of Safety (as % of total sales | 25% |
| Fixed cost | ₹ 12,60,000 |

You are required to calculate:

(i) Break even sales value (₹).

(ii) Total sales value (₹) at present,

(iii) Proposed sales value (₹) if company wants to earn the present profit after reduction of 10% in fixed cost,

(iv) Sales in value (₹) to be made to earn a profit of 20% on sales assuming fixed cost remains unchanged,

(v) New Margin of Safety if the sales value at present as computed in (ii) decreased by 12.5%.
#### Answer
**(i) Calculation of Break-even sales in value:**

= Fixed Cost ÷ P/V Ratio

= ₹ 12,60,000 ÷ 30% **= ₹ 42,00,000**

**(ii) Calculation of Total Sales value:**

Sales value (S) = Break-even Sales + Margin of Safety

Or, S = 42,00,000 + 0.25 S

Or, 0.75 S = 42,00,000

Or, S = 42,00,000 ÷ 0.75

Or, Sales = **₹ 56,00,000**

**(iii) Calculation of proposed sales value to earn present profit:**

Present profit = Sales – Variable cost – Fixed Cost

= ₹ 56,00,000 – 70% of 56,00,000 – ₹ 12,60,000

= ₹ 56,00,000 – ₹ 39,20,000 – ₹ 12,60,000

**=** ₹ 4,20,000

Proposed Sales value (S) = 0.7S + (90% of ₹ 12,60,000) + 4,20,000

S = 0.7S + 11,34,000 + 4,20,000

S = 15,54,000 ÷ 0.3 = **₹ 51,80,000**

**(iv) Calculation of sales value to earn 20% on sales:**

Sales Value (S) = 0.7 S + 12,60,000 + 0.2S

S = 12,60,0000 ÷ 0.10 = **₹ 1,26,00,000**

**(v) New Margin of Safety:**

= (Sales – BES) ÷ Sales

= (87.5% of 56,00,000 – 42,00,000) ÷ (87.5% of 56,00,000)

= (49,00,000 – 42,00,000) ÷ 49,00,000

= 7,00,000 ÷ 49,00,000 **= 14.29%**

**Or**

= (Sales – BES)

= (87.5% of 56,00,000 – 42,00,000)

= ₹ 7,00,000
#### Approach
Break-even sales are fixed cost ÷ P/V ratio, and the margin of safety is the 25% of sales above break-even. For a target profit, write sales as variable cost + fixed cost + profit and solve.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: cma.svc.others, cma.svc.basics
difficulty: medium
q: 2-3
a: 6-7
---
#### Question
RST Toll Plaza Limited built an 80-kilometre-long highway between two cities and operates a toll plaza to collect tolls from passing vehicles using the highway. The company has estimated that 50,000 light weight, 12,000 medium weight and 10,000 heavy weight vehicles will be using the highway in one month in outward journey and the same number for return journey.

As per government notification, vehicles used for medical emergencies, Members of Parliament, and essential services are exempt from toll charges. It is estimated that 10% of light weight vehicles will pass the highway for such use.

It is the policy of the company that if vehicles return within 24 hours of their outward journey, the toll fare will be reduced by 25 percent automatically. It is estimated that 30% of chargeable light weight vehicles return within the specified time frame.

The toll charges for medium weight vehicles is to be fixed as 2.5 times of the light weight vehicles and that of heavy weight vehicles as 2 times of the medium weight vehicles.

The toll and maintenance cost for a month is ₹ 59,09,090, The company requires a profit of 10% over the total cost to cover interest and other costs.

**Required:**

(i) Calculate the toll rate for each type of vehicle if concession facilities are not available on the return journey.

(ii) Calculate the toll rate that will be charged from light weight vehicles if a return journey concession facility is available, assuming that the revenue earned from light weight vehicles calculated in option (i) remains the same.
#### Answer
**Working Notes:**

**(1) Calculation of equivalent numbers of Light weight vehicles (when no concession is provided on return journey)**

| Type of vehicle | Monthly traffic (A) | Return traffic (B) | Ratio (C) | Equivalent light weight [(A + B) × C] |
|---|---:|---:|---:|---:|
| Light weight | 45,000\* | 45,000 | 1 | 90,000 |
| Medium weight | 12,000 | 12,000 | 2.5 | 60,000 |
| Heavy weight | 10,000 | 10,000 | 5 | 1,00,000 |
| | | | | **2,50,000** |

\*50,000 light vehicles less 10% exempted vehicles

**(2) Calculation of equivalent numbers of Light weight vehicles (when concession is provided on return journey)**

| Type of vehicle | Monthly traffic (A) | Return traffic (B) | Ratio (C) | Equivalent light weight [(A + B) × C] |
|---|---:|---:|---:|---:|
| Light weight | 45,000\* | 41,625<br>[45,000- (45,000 × 30% × 25%)] | 1 | 86,625 |
| Medium weight | 12,000 | 12,000 | 2.5 | 60,000 |
| Heavy weight | 10,000 | 10,000 | 5 | 1,00,000 |
| | | | | 2,46,625 |

**(i) Calculation of toll rate for each type of vehicle:**

Total cost to cover ÷ Equivalent type of vehicles

(₹ 59,09,090 + 10% of ₹ 59,09,090) ÷ 2,50,000 equivalent vehicles (Refer working note 1)

= 65,00,000 ÷ 2,50,000 = ₹ 26

Toll rate for:

Light weight vehicle = ₹ 26

Medium weight vehicle = ₹ 26 × 2.5 = ₹ 65

Heavy weight vehicle = ₹ 26 × 5 = ₹ 130

**(ii) Calculation of toll rate for each type of vehicle:**

Revenue earned from Light weight vehicle in (i) above

= 90,000 vehicles × ₹ 26 = ₹ 23,40,000

New toll rate to maintain the same revenue from Light weight vehicle

= ₹ 23,40,000 ÷ 86,625 (Refer working note-2) = ₹ 27.01

Light weight vehicle = ₹ 27.01

Rate to be charged from 13,500 light weight vehicles = 27.01 × 0.75 = 20.26

**Alternative presentation**

**(ii) Toll rate to be charged from light weight vehicles if concession applicable**

Revenue share in light vehicles = 90,000 × 26 = ₹ 23,40,000

Suppose rate is x, then outward journey 45,000 x; return journey (45,000 - 30% of 45,000) + 13,500 (x - 0.25)

45,000x + 31,500x + 13500 (0.75x) = ₹ 23,40,000

Toll rate to be charged from light weight vehicles : 86,625x = ₹ 23,40,000 = ₹ 27.01

Rate to be charged from 76,500 light weight vehicles @ 27.01; revenue will be ₹ 20,66,494

Rate to be charged from 13,500 light weight vehicles = 27.01 × 0.75 = 20.26 revenue will be ₹ 2,73,506
#### Approach
Turn every vehicle into equivalent light vehicles (medium 2.5, heavy 5), counting both journeys and leaving out the exempt 10%; divide cost plus 10% profit by the equivalents. With the concession, the 30% of light vehicles that return within 24 hours count as 0.75 on the return trip.

---
item: q2a
qno: 2
part: (a)
marks: 10
type: descriptive
tags: cma.mat.issues
difficulty: medium
q: 7-8
a: 9-10
---
#### Question
A Limited has furnished the following information for the months from 1st January to 30th April, 2023:

| | January | February | March | April |
|---|---:|---:|---:|---:|
| Number of Working days | 25 | 24 | 26 | 25 |
| Production (in units) per working day | 50 | 55 | 60 | 52 |
| Raw Material Purchases (% by weights to total of 4 months) | 21% | 26% | 30% | 23% |
| Purchase price of raw material (per kg) | ₹ 10 | ₹ 12 | ₹ 13 | ₹ 11 |

Quantity of raw material per unit of product: 4 kg.

Opening stock of raw material on 1st January: 6,020 kg. (Cost ₹ 63, 210)

Closing stock of raw material on 30th April: 5,100 kg.

All the purchases of material are made at the start of each month.

**Required:**

(i) Calculate the consumption of raw materials (in kgs) month-by- month and in total.

(ii) Calculate the month-wise quantity and value of raw materials purchased.

(iii) Prepare the priced stores ledger for each month using the FIFO method.
#### Answer
**(i) Calculation of consumption of Raw Material (in kgs) month by month and total**

| Particulars | Jan | Feb | March | April | Total |
|---|---:|---:|---:|---:|---:|
| No. of working days | 25 | 24 | 26 | 25 | - |
| Production (Per day) | 50 | 55 | 60 | 52 | - |
| Production | 1,250 | 1,320 | 1,560 | 1,300 | 5,430 |
| **Raw Material Consumed (in kgs)** | **5,000** | **5,280** | **6,240** | **5,200** | 21,720 |

**Calculation of Raw Material Purchased**

| Purchased | (Kg) |
|---|---:|
| Closing stock on 30th April | 5,100 |
| Add: Raw Material consumed | 21,720 |
| Less: Opening stock on 1st January | (6,020) |
| Raw Material purchased | 20,800 |

**(ii) Calculation of month wise quantity and value of raw material purchased**

| | % | Purchased (Kg) | Price (₹) | Value (₹) |
|---|---:|---:|---:|---:|
| January | 21 | 4,368 | 10 | 43,680 |
| February | 26 | 5,408 | 12 | 64,896 |
| March | 30 | 6,240 | 13 | 81,120 |
| April | 23 | 4,784 | 11 | 52,624 |
| Total | | 20,800 | | 2,42,320 |

**(iii) Store Price Ledger by using FIFO method.**

| Months | Particulars | Receipts | | | Issue | | | Balance | | |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| | | **Qty** | **Rate** | **Amount (₹)** | **Qty** | **Rate** | **Amount (₹)** | **Qty** | **Rate** | **Amount (₹)** |
| Jan | Opening | | | | | | | 6,020 | 10.5 | 63,210 |
| | Purchases | 4,368 | 10 | 43,680 | | | | 6,020 | 10.5 | 63,210 |
| | | | | | | | | 4,368 | 10 | 43,680 |
| | Consumption | | | | **5,000** | **10.5** | **52,500** | **1,020** | **10.5** | **10,710** |
| | | | | | | | | **4,368** | **10** | **43,680** |
| Feb | Purchases | 5,408 | 12 | 64,896 | | | | 1,020 | 10.5 | 10,710 |
| | | | | | | | | 4,368 | 10 | 43,680 |
| | | | | | | | | 5,408 | 12 | 64,896 |
| | Consumption | | | | **1,020** | **10.5** | **10,710** | **108** | **10** | **1,080** |
| | | | | | **4,260** | **10** | **42,600** | **5,408** | **12** | **64,896** |
| March | Purchase | 6,240 | 13 | 81,120 | | | | 108 | 10 | 1,080 |
| | | | | | | | | 5,408 | 12 | 64,896 |
| | | | | | | | | 6,240 | 13 | 81,120 |
| | Consumption | | | | **108** | **10** | **1,080** | | | |
| | | | | | **5,408** | **12** | **64,896** | | | |
| | | | | | **724** | **13** | **9,412** | **5,516** | **13** | **71,708** |
| April | Purchases | 4,784 | 11 | 52,624 | | | | 5,516 | 13 | 71,708 |
| | | | | | | | | 4,784 | 11 | 52,624 |
| | Consumption | | | | **5,200** | **13** | **67,600** | **316** | **13** | **4,108** |
| | | | | | | | | **4,784** | **11** | **52,624** |
| | | | | | | | | | | 56,732 |
#### Approach
Consumption is production × 4 kg; total purchases are closing stock + consumption – opening stock, split by the given percentages. Then run the FIFO ledger month by month, issuing the oldest layer first.

---
item: q2b
qno: 2
part: (b)
marks: 10
type: descriptive
tags: cma.job
oos: yes
note: Out of syllabus (old scheme): contract costing (the contract account, notional profit on work certified and uncertified, the escalation clause) is not in the new-scheme Paper 4 syllabus or the January 2027 Study Material, which has no Contract Costing chapter; tagged with the nearest chapter, Job Costing. Kept as printed: the question's "₹ 12,000 units each year" and the answer's "(88,000 x 130)" in Year 2 Labour (the question gives 8,800 hours).
q: 8-9
a: 10-11
---
#### Question
B Limited has taken a contract for ₹ 70,00,000 and furnishes the following information:

| | 1st Year | 2nd Year |
|---|---:|---:|
| | **(Amount in ₹)** | **(Amount in ₹)** |
| Material | 12,50,000 | 13,65,000 |
| Wages | 12,50,000 | 11,44,000 |
| Direct Expenses | 4,20,000 | 3,80,000 |
| Indirect Expenses | 2,70,000 | 2,60,000 |
| Work Certified | 32,00,000 | 70,00,000 |
| Work Uncertified | 2,19,000 | - |

**Other Information:**

- Plant costing ₹ 3,40,000 was bought at the commencement of the contract.
- Depreciation of ₹ 85,000 per annum is charged on the plant on Straight Line Method (SLM) basis.
- There is a provision for escalation clause in the contract for increase in material rate and wage rate in the second year only.
- Standard material for the first and second year was ₹ 12,000 units each year @ ₹ 90 per unit whereas the actual consumption was 12,500 @ ₹ 100 per unit in the first year and 13,000 units @ ₹ 105 per unit in the 2nd year. Standard labour hours for first year were 10,000 hours and for the second year it was 9,000 hours. Standard wage rate was ₹ 120 per hour. The firm has paid for 10,000 hours @ ₹ 125 per hour in the first year and 8,800 hours @ ₹ 130 per hour in the second year.

**Required:**

(i) Prepare Contract Account for both years without considering escalation clause.

(ii) Compute the total value of contract by considering the escalation clause.

(iii) Compute the total increase / (decrease) in the cost of material and wages for both the years.
#### Answer
**(i) Contract Account (For 1st Year)**

| Particulars | (₹) | Particulars | | (₹) |
|---|---:|---|---:|---:|
| To Material | 12,50,000 | By work in Progress | | |
| To Wages | 12,50,000 | Work certified | 32,00,000 | |
| To Direct expense | 4,20,000 | Work uncertified | 2,19,000 | 34,19,000 |
| To Indirect expense | 2,70,000 | | | |
| To Depreciation (₹3,40,000 – ₹2,55,000) | 85,000 | | | |
| To Costing P&L (Notional Profit b/f) | 1,44,000 | | | |
| | 34,19,000 | | | 34,19,000 |

**Contract Account (For 2nd Year)**

| Particulars | | (₹) | Particulars | (₹) |
|---|---:|---:|---|---:|
| To Opening Work in Progress: | | | By Contractee A/C | 70,00,000 |
| Work certified | 32,00,000 | | | |
| Work uncertified | 2,19,000 | 34,19,000 | | |
| To Material | | 13,65,000 | | |
| To Wages | | 11,44,000 | | |
| To Direct expenses | | 3,80,000 | | |
| To Indirect expenses | | 2,60,000 | | |
| To Depreciation (₹ 2,55,000 – ₹ 1,70,000) | | 85,000 | | |
| To Costing P&L (b/f) | | 3,47,000 | | |
| | | 70,00,000 | | 70,00,000 |

**(ii) Computation of total value of contract after escalation clause**

| Particulars | (₹) |
|---|---:|
| Contract Price | 70,00,000 |
| Increase in cost of material 12,000 (105 – 90) | 1,80,000 |
| Increase in cost of labour 9,000 (130-120) | 90,000 |
| | **72,70,000** |

**(iii) Calculation of Increase/Decrease in cost of material and wages**

| Year 1 | Standard Cost | Actual Cost | Increase/Decrease |
|---|---:|---:|---:|
| Material | 10,80,000<br>(12,000 x 90) | 12,50,000<br>(12,500 x 100) | 1,70,000 |
| Labour | 12,00,000<br>(10,000 x 120) | 12,50,000<br>(10,000 x 125) | 50,000 |
| | | | **2,20,000** |
| **Year 2** | **Standard Cost** | **Actual Cost** | **Increase/Decrease** |
| Material | 10,80,000<br>(12,000 x 90) | 13,65,000<br>(13,000 x 105) | 2,85,000 |
| Labour | 10,80,000<br>(9,000 x 120) | 11,44,000<br>(88,000 x 130) | 64,000 |
| | | | **3,49,000** |
#### Approach
In year 1 the contract account is credited with work certified and uncertified, so the balance is a notional profit; year 2 opens with that work-in-progress and closes on the full contract price. The escalation adds the rise in rates over standard, applied to the standard quantities.

---
item: q3a
qno: 3
part: (a)
marks: 10
type: descriptive
tags: cma.bud.functional, cma.mc.basics
difficulty: medium
note: The question has no (i)/(ii); ICAI's answer labels its two budgets (i) current position and (ii) next year's position. Kept as printed: "there is opening and closing stock" (the question) and "[Direct wages Cost ÷ Re.1]" (the working notes; wages are paid at ₹ 4 per labour hour).
q: 11-12
a: 13-15
---
#### Question
PQR Limited manufactures three products - Product X, Product Y and Product Z. The output for the current year is 2,50,000 units of Product X, 2,80,000 units of Product Y and 3,20,000 units of Product Z respectively.

Selling price of Product X is 1.25 times of Product Z whereas Product Y can be sold at double the price at which product Z can be sold. Product Z can be sold at a profit of 20% on its marginal cost.

**Other information are as follows:**

| | Product X | Product Y | Product Z |
|---|---:|---:|---:|
| Direct Material Cost (Per unit) | ₹ 20 | ₹ 20 | ₹ 20 |
| Direct Wages Cost (per unit) | ₹ 16 | ₹ 24 | ₹ 16 |

Raw material used for manufacturing all the three products is the same. Direct Wages are paid @ ₹ 4 per labour hour,

Total overhead cost of the company is ₹ 52,80,000 for the year, out of which ₹ 1 per labour hour is variable and the rest is fixed.

In the next year it is expected that sales of product X and product Z will increase by 12% and 15% respectively and sale of product Y will decline by 5%. The total overhead cost of the company for the next year is estimated at ₹ 55,08,000. The variable cost of ₹ 1 per labour hour remains unchanged.

It is anticipated that all other costs will remain same for the next year and there is opening and closing stock. Selling Price per unit of each product will remain unchanged in the next year.

**Required:**

Prepare a budget showing the current position and the position for the next year clearly indicating the total product-wise contribution and profit for the company as a whole.
#### Answer
**(i) Budget showing current position of total product wise contribution and profitability**

| | Particulars | Product X (₹) | Product Y (₹) | Product Z (₹) | Total (₹) |
|---|---|---:|---:|---:|---:|
| A | Direct material cost (per unit) | 20 | 20 | 20 | |
| B | Direct wages cost (per unit) | 16 | 24 | 16 | |
| C | Variable overhead per unit (Refer WN-1) | 4 | 6 | 4 | |
| D | Total variable cost/ Marginal cost per unit [A+B+C] | 40 | 50 | 40 | |
| E | Add: Profit [20% of D] | - | - | 8 | |
| F | Selling price unit [D+E] | - | - | 48 | |
| G | Price weight | 1.25 | 2 | 1 | |
| H | Selling price per unit [Selling price of Product Z × G] | 60 | 96 | 48 | |
| I | Contribution per unit [H-D] | 20 | 46 | 8 | |
| J | Quantity to be sold | 2,50,000 | 2,80,000 | 3,20,000 | |
| K | Total Contribution [J×I] | 50,00,000 | 1,28,80,000 | 25,60,000 | 2,04,40,000 |
| L | Fixed Overheads [Refer WN-1] | | | | 13,20,000 |
| M | Profit | | | | 1,91,20,000 |

**Working Notes:**

**1. Segregation of Overheads into variable and fixed in current year**

| | Particulars | Product X (₹) | Product Y (₹) | Product Z (₹) | Total (₹) |
|---|---|---:|---:|---:|---:|
| A | Total overhead cost | - | - | - | 52,80,000 |
| B | Labour hour per unit [Direct wages Cost ÷ Re.1] | 4 | 6 | 4 | |
| C | Quantity produced | 2,50,000 | 2,80,000 | 3,20,000 | |
| D | Total variable overhead cost [B×C] | 10,00,000 | 16,80,000 | 12,80,000 | 39,60,000 |
| E | Fixed overhead cost [A-D] | | | | 13,20,000 |

**(ii) Budget showing next year’s position of total product wise contribution and profitability**

| | Particulars | Product X (₹) | Product Y (₹) | Product Z (₹) | Total (₹) |
|---|---|---:|---:|---:|---:|
| A | Selling price per unit | 60 | 96 | 48 | |
| B | Contribution per unit | 20 | 46 | 8 | |
| C | Quantity to be sold | 2,80,000<br>[112% of 2,50,000] | 2,66,000<br>[95% of 2,80,000] | 3,68,000<br>[115% of 3,20,000] | |
| D | Total Contribution [B×C] | 56,00,000 | 1,22,36,000 | 29,44,000 | 2,07,80,000 |
| | Fixed Overheads [Refer WN-2] | | | | 13,20,000 |
| | Profit | | | | 1,94,60,000 |

**Working Notes:**

**2. Segregation of Overheads into variable and fixed in next year**

| | Particulars | Product X (₹) | Product Y (₹) | Product Z (₹) | Total (₹) |
|---|---|---:|---:|---:|---:|
| A | Total overhead cost | - | - | - | 55,08,000 |
| B | Labour hour per unit [Direct wages Cost ÷ Re.1] | 4 | 6 | 4 | |
| C | Quantity produced | 2,80,000 | 2,66,000 | 3,68,000 | |
| D | Total variable overhead cost [B×C] | **11,20,000** | **15,96,000** | **14,72,000** | **41,88,000** |
| E | Fixed overhead cost [A-D] | | | | 13,20,000 |
#### Approach
Labour hours per unit come from wages ÷ ₹ 4, which splits the overheads into variable (₹ 1 an hour) and fixed. Price Z at marginal cost + 20%, then X at 1.25 times and Y at 2 times Z, and build contribution and profit for both years.

---
item: q3b
qno: 3
part: (b)
marks: 10
type: descriptive
tags: cma.sheet.mfg
difficulty: medium
note: ICAI's answer gives a second cost sheet as an Alternative Solution, "Based on work-in-progress figure of ₹ 45,500 as on 1st April 2023 as per Hindi part of Question paper" (the English question prints ₹ 42,500). Kept as printed: "₹ 6920" in the question and "(2,500+152,000 -1,52,600)", "(12,43,400÷152000)" in the first cost sheet.
q: 12-13
a: 15-17
---
#### Question
The following information is available from SN Manufacturing Limited's for the month of April 2023.

| | April 1 | April 30 |
|---|---:|---:|
| **Opening and closing inventories data:** | | |
| Stock of finished goods | 2,500 units | ? |
| Stock of raw materials | ₹ 42,500 | ₹ 38,600 |
| Work-in progress | ₹ 42,500 | ₹ 42,800 |
| **Other data are:** | | |
| Raw materials Purchased | | ₹ 6,95,000 |
| Carriage inward | | ₹ 36,200 |
| Direct wages paid | | ₹ 3,22,800 |
| Royalty paid for production | | ₹ 35,800 |
| Purchases of special designs, moulds and patterns (estimated life 12 Production cycles) | | ₹ 1,53,600 |
| Power, fuel and haulage (factory) | | ₹ 70,600 |
| Research and development costs for improving the production process (amortized) | | ₹ 31,680 |
| Primary packing cost (necessary to maintain quality) | | ₹ 6920 |
| Administrative Overhead | | ₹ 46,765 |
| Salary and wages for supervisor and foremen | | ₹ 28,000 |

**Other information:**

- Opening stock of finished goods is to be valued at ₹ 8.05 per unit.
- During the month of April, 1,52,000 units were produced and 1,52,600 units were sold. The closing stock of finished goods is to be valued at the relevant month's cost of production. The company follows the FIFO method.
- Selling and distribution expenses are to be charged at 20 paisa per unit.
- Assume that one production cycle is completed in one month.

**Required:**

(i) Prepare a cost sheet for the month ended on April 30, 2023, showing the various elements of cost (raw material consumed, prime cost, factory cost, cost of production, cost of goods sold, and cost of sales).

(ii) Calculate the selling price per unit if profit is charged at 20 percent on sales.
#### Answer
**Cost Sheet for the month of April 2023**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| **Raw materials consumed:** | | |
| Raw materials purchased | 6,95,000 | |
| Add: Carriage inward | 36,200 | |
| Add: Value of opening stock of raw materials | 42,500 | |
| Less: Value of closing stock of raw materials | (38,600) | **7,35,100** |
| Direct wages paid | | 3,22,800 |
| Royalty paid for production | | 35,800 |
| Amortised cost of special designs, moulds and patterns (₹153,600 ÷ 12) | | 12,800 |
| Power, fuel and haulage (factory)\* | | 70,600 |
| **Prime Cost\*** | | **11,77,100** |
| Salary and wages of supervisor and foremen | | 28,000 |
| Gross Works Cost | | 12,05,100 |
| Add: Opening stock of WIP | | 42,500 |
| Less: Closing stock of WIP | | (42,800) |
| **Factory/ Works Cost** | | **12,04,800** |
| Research and development cost | 31,680 | |
| Primary packing cost | 6,920 | 38,600 |
| **Cost of Production** | | **12,43,400** |
| Add: Opening stock of finished goods (₹ 8.05 × 2,500 units) | | 20,125 |
| Less: Value of closing stock [(2,500+152,000 -1,52,600) × (12,43,400÷152000) | | (15,542) |
| **Cost of Goods Sold** | | **12,47,983** |
| Add: Administrative overheads | | 46,765 |
| Add: Selling and distribution expenses (₹ 0.20 × 1,52,600) | | 30,520 |
| **Cost of Sales** | | **13,25,268** |
| Add: Profit (20% on Sales or 25% on cost of sales) | | 3,31,317 |
| **Sales value** | | 16,56,585 |
| **Selling price per unit (₹ 16,56,585 ÷ 1,52,600 units)** | | **10.86** |

\*May be taken as part of Factory / Works cost, however Total Factory Cost will remain the same. If taken as part of factory cost then prime cost will be ₹ 11,06,500.

**Alternative Solution** (Based on work-in-progress figure of ₹ 45,500 as on 1st April 2023 as per Hindi part of Question paper)

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| **Raw materials consumed:** | | |
| Raw materials purchased | 6,95,000 | |
| Add: Carriage inward | 36,200 | |
| Add: Value of opening stock of raw materials | 42,500 | |
| Less: Value of closing stock of raw materials | (38,600) | 7,35,100 |
| Direct wages paid | | 3,22,800 |
| Royalty paid for production | | 35,800 |
| Amortised cost of special designs, moulds and patterns (₹ 153,600 ÷ 12) | | 12,800 |
| Power, fuel and haulage (factory)\* | | 70,600 |
| **Prime Cost** | | **11,77,100** |
| Salary and wages of supervisor and foremen | | 28,000 |
| Gross Works Cost | | 12,05,100 |
| Add: Opening stock of WIP | | 45,500 |
| Less: Closing stock of WIP | | (42,800) |
| **Factory/ Works Cost** | | **12,07,800** |
| Research and development cost | 31,680 | |
| Primary packing cost | 6,920 | 38,600 |
| **Cost of Production** | | **12,46,400** |
| Add: Opening stock of finished goods (₹ 8.05 × 2,500 units) | | 20,125 |
| Less: Value of closing stock [(2,500+1,52,000 -1,52,600) × (12,46,400÷1,52,000) | | (15,580) |
| **Cost of Goods Sold** | | **12,50,945** |
| Add: Administrative overheads | | 46,765 |
| Add: Selling and distribution expenses (₹ 0.20 × 1,52,600) | | 30,520 |
| **Cost of Sales** | | **13,28,230** |
| Add: Profit (20% on Sales or 25% on cost of sales) | | 3,32,058 |
| **Sales value** | | 16,60,288 |
| **Selling price per unit (₹ 16,60,288 ÷ 1,52,600 units)** | | **10.88** |

\*May be taken as part of Factory / Works cost, however Total Factory Cost will remain the same. *If taken as part of factory cost then prime cost will be ₹ 11,06,500.*
#### Approach
Build the cost sheet in ICAI's order: materials consumed, prime cost, works cost after the WIP adjustment, cost of production (R&D and primary packing), then cost of goods sold with FIFO finished stock, and cost of sales. Only one-twelfth of the moulds and patterns belongs to this month's cycle.

---
item: q4a
qno: 4
part: (a)
marks: 10
type: descriptive
tags: cma.joint.apportion, cma.joint.byprod, cma.proc.accounts
difficulty: hard
note: The text layer's "1 0%" (process loss) is "10%" on the page and is written so. Kept as printed: ICAI's working note 1 prints "₹ 10", "₹ 90%", "₹ 9" and "₹ 8.1" against the percentages, and the Process S account reads "To Input (Transfer from process S)".
q: 18
a: 20-21
---
#### Question
ABC Company produces a Product 'X' that passes through three processes: R, S and T. Three types of raw materials, viz., J, K, and L are used in the ratio of 40:40:20 in process R. The output of each process is transferred to next process. Process loss is 10% of total input in each process. At the stage of output in process T, a by-product 'Z' is emerging and the ratio of the main product 'X' to the by-product 'Z' is 80:20. The selling price of product 'X' is ₹60 per kg.

The company produced 14,580 kgs of product ‘X’

Material price : Material J @ ₹ 15 per kg; Material K @ ₹ 9 per kg.

Material L@ ₹ 7 per kg Process costs are as follows:

| Process | Variable cost per kg (₹) | Fixed cost of Input (₹) |
|---|---:|---:|
| R | 5.00 | 42,000 |
| S | 4.50 | 5,000 |
| T | 3.40 | 4,800 |

The by-product 'Z' cannot be processed further and can be sold at ₹ 30 per kg at the split-off stage. There is no realizable value of process losses at any stage.

**Required:**

Present a statement showing the apportionment of joint costs on the basis of the sales value of product 'X' and by-product 'Z' at the split- off point and the profitability of product 'X' and by-product 'Z.
#### Answer
**Working Notes:**

**1. Calculation of Input of Raw Material**

Let assume total raw material in Process R be 100%

∴ Output of Process T will be equal to:

| | |
|---|---|
| Input R | 100% |
| - 10% Normal Loss | ₹ 10 |
| Input S | ₹ 90% |
| - 10% Normal loss | ₹ 9 |
| Input T | 81% |
| - 10% Normal loss | ₹ 8.1 |
| Output of T | 72.9 |
| Actual output of X | 14,580 units |

Which is 80% of the total output

∴ Output of Process T

= $\dfrac{14580}{80\%}$ = 18,225

∴ Input of Process R = $\dfrac{18225}{72.9\%}$ = 25,000 kgs

**Alternative presentation for Calculation of Input in Process R, S and T**

**Working notes:**

| Process T (Kg.) | | | |
|---|---:|---|---:|
| To Input (Transfer from process S) | 20,250 | By Normal loss | 2,025 |
| | | By Output Product X | 14,580 |
| | | By output of by-product Z | 3,645 |
| | 20,250 | | 20,250 |

| Process S (kg.) | | | |
|---|---:|---|---:|
| To Input (Transfer from process S) | 22,500 | By Normal loss (10%) | 2,250 |
| | | By Transfer to process T | 20,250 |
| | 22,500 | | 22,500 |

| Process R (kg.) | | | |
|---|---:|---|---:|
| To Input | 25,000 | By Normal loss (10%) | 2,500 |
| | | By Transfer to process S | 22,500 |
| | 25,000 | | 25,000 |

**2. Calculation of Joint Cost**

| Process | Inputs | Variable cost per kg | Variable cost | Fixed Cost | Total Cost |
|---|---:|---:|---:|---:|---:|
| | | ₹ | ₹ | ₹ | ₹ |
| R | 25,000 | 5 | 1,25,000 | 42,000 | 1,67,000 |
| S | 22,500 | 4.5 | 1,01,250 | 5,000 | 1,06,250 |
| T | 20,250 | 3.4 | 68,850 | 4,800 | 73,650 |
| | | | | | 3,46,900 |

| | | | |
|---|---|---|---:|
| Raw material | J | 10000 x 15 | ₹ 1,50,000 |
| | K | 10000 x 9 | ₹ 90,000 |
| | L | 5000 x 7 | ₹ 35,000 |
| | | | **2,75,000** |
| Add: Processing cost (as above) | | | ₹ 3,46,900 |
| Total Joint Cost | | | 6,21,900 |

**(i) Statement showing apportionment of Joint Cost**

| Particulars | Product X | By-Product Z | Total |
|---|---:|---:|---:|
| Units | 14,580 | 3,645 | |
| Selling price (₹) | 60 | 30 | |
| Sales Value (₹) | 8,74,800 | 1,09,350 | 9,84,150 |
| (₹ 6,21,900 to apportioned in ratio of sales value at split off point) | 5,52,800 | 69,100 | 6,21,900 |

**(ii) Statement of Profitability**

| Particulars | Product X | By-Product Z | Total |
|---|---:|---:|---:|
| Sales Value | 8,74,800 | 1,09,350 | 9,84,150 |
| Joint Cost (As apportioned above) | (5,52,800) | (69,100) | (6,21,900) |
| Profit | 3,22,000 | 40,250 | 3,62,250 |
#### Approach
Work backwards from the 14,580 kg of X: it is 80% of Process T's output, and each process keeps 90% of its input, which gives the input of R and so the materials in 40:40:20. Add each process's variable and fixed cost to get the joint cost, then split it by sales value at split-off.

---
item: q4b
qno: 4
part: (b)
marks: 5
type: descriptive
tags: cma.abc.compute
difficulty: easy
note: Kept as printed: ICAI's Rent & Taxes driver "Floor space (50:45:62)" (the question gives 5,000, 4,500 and 6,200 sq. ft., which are also the ratio of the amounts ICAI apportions).
q: 18-19
a: 22
---
#### Question
Beta Limited produces 50,000 Units, 45,000 Units and 62,000 Units of product 'A', 'B' and 'C' respectively. At present the company follows absorption costing method and absorbs overhead on the basis of direct labour hours. Now, the company wants to adopt Activity Based Costing

The information provided by Beta Limited is follows:

| | Product A | Product B | Product C |
|---|---:|---:|---:|
| Floor Space Occupied | 5,000 Sq.Ft. | 4,500 Sq.Ft. | 6,200 Sq.Ft. |
| Direct Labour Hours | 7,500 Hours | 7,200 Hours | 7,800 Hours |
| Direct Machine Hours | 6,000 Hours | 4,500 Hours | 4,650 Hours |
| Power consumption | 32% | 28% | 40% |

Overhead for year are as follows:

| | ₹ |
|---|---:|
| Rent & Taxes | 8,63,500 |
| Electricity Expenses | 10,66,475 |
| Indirect labour | 13,16,250 |
| Repair & Maintenance | 1,28,775 |
| | 33,75,000 |

**Required:**

(i) Calculate the overhead rate per labour hour under Absorption Costing.

(ii) Prepare a cost statement showing overhead cost per unit for each product - 'A', 'B' and 'C' as per Activity based Costing.
#### Answer
**(i) Calculation of Overhead rate per hour**

$\dfrac{\text{Total Overheads}}{\text{Total hours}}$

$\dfrac{33{,}75{,}000}{22{,}500}$ = **₹ 150 per hour**

**(ii) Statement showing overhead cost per unit as per Activity Based Costing**

| Overheads | Cost Driver | Total | Product | | |
|---|---|---:|---:|---:|---:|
| | | | **A** | **B** | **C** |
| | | ₹ | ₹ | ₹ | ₹ |
| Rent & Taxes | Floor space (50:45:62) | 8,63,500 | 2,75,000 | 2,47,500 | 3,41,000 |
| Electricity | Power Consumption (32:28:40) | 10,66,475 | 3,41,272 | 2,98,613 | 4,26,590 |
| Indirect labour | Labour hours (75:72:78) | 13,16,250 | 4,38,750 | 4,21,200 | 4,56,300 |
| Repair & Maintenance | Machine hours (600:450:465) | 1,28,775 | 51,000 | 38,250 | 39,525 |
| Total Cost | | 33,75,000 | 11,06,022 | 10,05,563 | 12,63,415 |
| Units | | | 50,000 | 45,000 | 62,000 |
| Cost per Unit | | | **22.12** | **22.35** | **20.38** |
#### Approach
Under absorption costing one rate covers everything: total overheads ÷ total direct labour hours. Under ABC each overhead follows its own driver (floor space, power, labour hours, machine hours) before dividing by units.

---
item: q4c
qno: 4
part: (c)
marks: 5
type: descriptive
tags: cma.mc.keyfactor
difficulty: easy
q: 19
a: 22-23
---
#### Question
MNP Company Limited produces two products 'A' and 'B'. The relevant cost and sales data per unit of output is as follows.

| Particulars | Product A | Product B |
|---|---:|---:|
| | **(₹)** | **(₹)** |
| Direct material | 55 | 60 |
| Direct labour | 35 | 45 |
| Variable factory overheads | 40 | 20 |
| Selling Price | 180 | 175 |

The availability of machine hours is limited to 55,000 hours for the month. The monthly demand for product ‘A’ and product 'B' is 5,000 units and 6,000 units, respectively. The fixed expenses of the company are ₹1,40,000 per month. Variable factory overheads are ₹ 4 per machine hour. The company can produce both products according to the market demand.

**Required:**

Calculate the product mix that generates maximum profit for the company in the situation and also calculate profit of the company.
#### Answer
| Particulars | Product A | Product B |
|---|---:|---:|
| | ₹ | ₹ |
| Selling Price | 180 | 175 |
| **Variable cost:** | | |
| Direct Material | 55 | 60 |
| Direct labour | 35 | 45 |
| Variable factory overheads | 40 | 20 |
| | 130 | 125 |
| Contribution | 50 | 50 |
| Machine hour (p.u.) | 10 | 5 |
| **Contribution per hour** | **5** | **10** |
| **Rank** | **II** | **I** |

**Calculation of Product Mix**

| | |
|---|---:|
| Hours available | 55,000 |
| **Product B (6000 x 5)** | **30,000** |
| Balance Hours | 25,000 |
| **Product A (2500 x 10)** | **25,000** |
| Balance Hours | 0 |

**Calculation of Profit**

| | | ₹ |
|---|---|---:|
| Contribution | | |
| A | 2500 units x 50 | |
| B | 6000 units x 50 | 4,25,000 |
| Less: | Fixed cost | (1,40,000) |
| | Profit | **2,85,000** |
#### Approach
Machine hours are the limiting factor: get each product's machine hours from its variable overhead ÷ ₹ 4, rank by contribution per machine hour, and fill demand in that order.

---
item: q5a
qno: 5
part: (a)
marks: 10
type: descriptive
tags: cma.std.material, cma.std.labour, cma.std.foh
difficulty: hard
note: ICAI labels the alternative presentation's parts "(i)" and "(iii)" under the heading "Alternative presentation to part (iii) (a) and (b)", while their content is the cost variance (a) and the volume variance (c); kept as printed.
q: 23-24
a: 24-27
---
#### Question
NC Limited uses a standard costing system for the manufacturing of its product ‘X’. The following information is available for the last week of the month:

- 25,000 kg of raw material were actually purchased for ₹ 3,12,500. The expected output is 8 units of product 'X' from each one kg of raw material. There is no opening and closing inventories. The material price variance and material cost variance, as per cost records, are ₹ 12,500 (F) and ₹ 1800 (A), respectively.
- The standard time to produce a batch of 10 units of product 'X' is 15 minutes. The standard wage rate per labour hour is 50. The company employs 125 workers in two categories, skilled and semi-skilled, in a ratio of 60:40. The hourly wages actually paid were ₹ 50 per hour for skilled workers and ₹ 40 per hour for semi-skilled workers. The weekly working hours are 40 hours per worker. Standard wage rate is the same for skilled and semi- skilled workers.
- The monthly fixed overheads are budgeted at ₹ 76,480 Overheads are evenly distributed throughout the month and assume 4 weeks in a month. In the last week of the month, the actual fixed overhead expenses were ₹ 19,500.

**Required:**

(i) Calculate the standard price per kg and the standard quantity of raw material.

(ii) Calculate the material usage variance, labour cost variance, and labour efficiency variance.

(iii) Calculate the fixed overhead cost variance, the fixed overhead expenditure variance and the fixed overhead volume variance.

Note: Indicate the nature of variance i.e Favourable or Adverse.
#### Answer
**(i) Calculation of Standard price per kg and the standard quantity of raw material:**

**Standard Price**

**(a) Material Price Variance** = Standard Cost of Actual Quantity – Actual Cost

12,500 (F) = (SP × AQ) – ₹ 3,12,500

12,500 (F) = (SP × 25,000) – ₹ 3,12,500

**SP = ₹ 13**

**Standard Quantity**

**(b) Material Cost Variance** = Standard Cost – Actual Cost

1,800 (A) = SQ × ₹13 – ₹ 3,12,500

**SQ = 23,900 kg.**

**(ii) Calculation of Material Usage Variance, Labour Cost Variance and Labour Efficiency Variance**

**(a) Material Usage Variance** = Standard Cost of Standard Quantity for Actual Output – Standard Cost of Actual Quantity

= SQ × SP – AQ × SP

*Or*

= SP × (SQ – AQ)

= ₹ 13 × (23,900 kg. – 25,000 kg.)

= **₹ 14,300 (A)**

**(b) Labour Cost Variance** = Standard Cost – Actual Cost

= (SH × SR) – (AH × AR)

= ₹ 2,39,000 – ₹ 2,30,000

= **₹ 9,000 (F)**

**(c) Labour Efficiency Variance** = Standard Cost of Standard Time for Actual Production – Standard Cost of Actual Time

= (SH × SR) – (AH × SR)

*Or*

= (SH – AH) × SR

= ₹ 50 × [4,780 hrs. – 5,000 hrs.]

= **₹ 11,000 (A)**

**(iii) Calculation of Fixed Overhead Cost Variance, Fixed Overhead Expenditure Variance and Fixed Overhead Volume Variance:**

**(a) Fixed overhead cost variance** = Standard Fixed Overheads – Actual Fixed Overheads

= 18,279 – 19,500

= ₹ 1,221(A)

**(b) Fixed Overhead Expenditure Variance** = Budgeted Fixed Overheads – Actual Fixed Overheads

= ₹ 19,120 – ₹ 19,500

= **₹ 380 (A)**

**(c) Fixed overhead volume variance** = (Budgeted output – Actual Output) X Budgeted rate per unit

= (2,00,000 – 1,91,200) 0.0956

= ₹ 8,800 x 0.0956

= **₹ 841 (A)**

**Alternative presentation to part (iii) (a) and (b)**

(i) Fixed Overhead Cost Variance:

= Overhead absorbed for actual production – Actual overhead incurred

= $\dfrac{\text{₹19,120}}{\text{2,00,000}}$ x 1,91,200 – 19,500 = **₹ 1,221(A)**

(iii) Fixed Overhead Volume Variance:

= Absorbed overhead – Budgeted overhead

= $\dfrac{\text{₹19,120}}{\text{2,00,000}}$ x 1,91,200 – 19,120 = **₹ 841(A)**

**Working Notes:**

**1.** Standard time to produce 10 units of product X is 15 minutes. Therefore we can manufacture 40 units in an hour.

Hours available in a week

125 Workers x 40 Hours = 5,000 hours

Therefore budgeted output = 5,000 x 40 units per hour = 2,00,000 units

**Alternatively**

Budgeted time per unit = $\dfrac{15 \text{ units}}{10 \text{ units}}$ = 1.5 minutes

So, Budgeted output = $\dfrac{5{,}000 \text{ Hours} \times 60 \text{ Minutes}}{1.5 \text{ Minutes}}$ = 2,00,000 units

Actual output = 23,900 x 8 units = 1,91,200 units

Standard hour for actual output = $1{,}91{,}200 \times \dfrac{0.25 \text{ Hrs}}{10 \text{ units}} = 4{,}780 \text{ Hrs}$

**2.**

| Labour | | | | | | | | | |
|---|---:|---:|---:|---:|---:|---|---:|---:|---:|
| **Budget** | | | **Revised standard** | | | **Actual** | | | |
| **Hours** | **Rate** | **₹** | **Hours** | **Rate** | **₹** | | **Hours** | **Rate** | **₹** |
| 5,000 | 50 | 2,50,000 | 4,780 | 50 | 2,39,000 | Skilled | 3000 | 50 | 1,50,000 |
| | | | | | | Semi-Skilled | 2000 | 40 | 80,000 |
| | | | | | | | 5000 | | 2,30,000 |

**3.**

| | Budget | Actual |
|---|---:|---:|
| Units | 2,00,000 | 1,91,200 |
| Fixed Overheads | 19,120 | 19,500 |

**4. Standard Fixed overheads:**

$\dfrac{19{,}120}{2{,}00{,}000} \times 1{,}91{,}200$ = ₹18,279

**Budgeted rate per unit:**

$\dfrac{19{,}120}{2{,}00{,}000}$ = ₹ 0.0956
#### Approach
Get the standard price from the price variance and the standard quantity from the cost variance; output is 8 units per kg of standard quantity. Budgeted output and hours come from 125 workers × 40 hours at 40 units an hour, and a week's budgeted fixed overhead is a quarter of the month's.

---
item: q5b
qno: 5
part: (b)
marks: 5
type: descriptive
tags: cma.sys.recon, cma.oh.underover
difficulty: easy
note: The question gives Selling Overhead in cost accounting as 61,000; ICAI's answer table works with 61,500 (difference -6,500). Both kept as printed.
q: 24
a: 27-28
---
#### Question
The following information has been obtained from financial accounting and cost accounting records.

| | Financial Accounting | Cost Accounting |
|---|---:|---:|
| | **₹** | **₹** |
| (i) Factory Overhead | 94,750 | 90,000 |
| (ii) Administrative Overhead | 60,000 | 57,000 |
| (iii) Selling Overhead | 55,000 | 61,000 |
| (iv) Opening Stock | 17,500 | 22,500 |
| (v) Closing Stock | 12,500 | 15,000 |

**Required:**

Indicate under-recovery and over-recovery and their effects on cost accounting profit.

[Note: You are not required to prepare reconciliation statement.]
#### Answer
| | Financial Accounting | Cost Accounting | Difference | Under/Over-recovery | Effect on Cost Accounting Profit | Net Effect\* on Cost Accounting Profit |
|---|---:|---:|---:|---|---|---|
| | ₹ | ₹ | ₹ | | | |
| (i) Factory Overhead | 94,750 | 90,000 | 4,750 | Under-recovery | Increased | To be reduced/ deducted |
| (ii) Administrative Overhead | 60,000 | 57,000 | 3,000 | Under-recovery | Increased | To be reduced/ deducted |
| (iii) Selling Overhead | 55,000 | 61,500 | -6,500 | Over-recovery | Decreased | To be added |
| (iv) Opening Stock | 17,500 | 22,500 | -5,000 | Over valuation | Decreased | To be added |
| (v) Closing Stock | 12,500 | 15,000 | -2,500 | Over valuation | Increased | To be reduced/ deducted |

\*Taking Cost Accounting Profit as base

(Under recovery and over recovery with effect are answered by the candidate, or if under recovery and over recovery with treatment (net effect) are answered, due credit shall be given in both cases)
#### Approach
Compare what the cost books charged with what the financial books show: overheads charged short are under-recovered (cost profit too high), charged in excess are over-recovered; for stocks, ask which set of books values them higher.

---
item: q5c
qno: 5
part: (c)
marks: 5
type: descriptive
tags: cma.emp.turnover
difficulty: easy
q: 24
a: 28
---
#### Question
How does the high employee turnover increase the cost of production? Explain.
#### Answer
**High Employee Turnover increases the cost of production**

**Replacement costs** are the costs which arise due to employee turnover. If employees leave soon after they acquire the **necessary training and experience** of good work, additional costs will have to be incurred on new workers, i.e., **cost of recruitment, training and induction**, **abnormal breakage and scrap** and **extra wages and overheads due to the inefficiency** of new workers.

It is obvious that a company will incur very high replacement costs if the rate of employee turnover is high. Similarly, only adequate preventive costs can keep Employee turnover at a low level. Each company must, therefore, work out the optimum level of Employee turnover keeping in view its personnel policies and the behaviour of replacement cost and preventive costs at various levels of Employee turnover rates.
#### Approach
Think of what a leaver costs: recruiting, training and inducting a replacement, and the spoilage and slow work while the new worker learns.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.intro.terms
difficulty: easy
note: Question 6 opens with ICAI's instruction "Answer any four of the following:" for parts (a) to (e), "(4 x 5 = 20 Marks)" (p.28-29); the instruction is a heading of the question, not transcribed in the items.
q: 28
a: 29
---
#### Question
Define cost objects and give examples of any four cost objects,
#### Answer
**Definition of cost objects**

Cost object is anything for which a separate measurement of cost is required. Cost object may be a product, a service, a project, a customer, a brand category, an activity, a department or a programme etc.

**Examples of cost objects**

| | |
|---|---|
| **Product** | Smart phone, Tablet computer, SUV Car, Book etc. |
| **Service** | An airline flight from Delhi to Mumbai, Concurrent audit assignment, Utility bill payment facility etc. |
| **Project** | Metro Rail project, Road projects etc. |
| **Activity** | Quality inspection of materials, Placing of orders etc. |
| **Process** | Refinement of crudes in oil refineries, melting of billets or ingots in rolling mills etc. |
| **Department** | Production department, Finance & Accounts, Safety etc. |

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.oh.absorb
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 28
a: 29
---
#### Question
Explain what is meant by Practical capacity and Normal capacity. How is normal capacity determined?
#### Answer
**Meaning of Practical capacity and Normal capacity**

Practical capacity is defined as actually utilised capacity of a plant. It is also known as operating capacity. This capacity takes into account loss of time due to repairs, maintenance, minor breakdown, idle time, set up time, normal delays, Sundays and holidays, stock taking etc. Generally, practical capacity is taken between 80 to 90% of the rated capacity. It is also used as a base for determining overhead rates. Practical capacity is also called net capacity or available capacity.

**Normal capacity is the volume of production or services achieved or achievable on an average over a period under normal circumstances taking into account the reduction in capacity resulting from planned maintenance.**

**Normal capacity is determined as under:**

| | | |
|---|---:|---:|
| Installed capacity | | xxx |
| Adjustments for: | | |
| (i) Time lost due to scheduled preventive or planned maintenance | xxx | |
| (ii) Number of shifts or machine hours or man hours | | |
| (iii) Holidays, normal shut down days, normal idle time | xxx | |
| (iv) Normal time lost in batch change over | xxx | xxx |
| **Normal Capacity** | | **xxx** |

---
item: q6c
qno: 6
part: (c)
marks: 5
type: descriptive
tags: cma.abc.abm
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 28
a: 30
---
#### Question
What is meant by Activity Based Management (ABM) and discuss how Activity Based Management can be used in the business?
#### Answer
**Meaning of Activity Based Management (ABM)**

The term Activity based management (ABM) is used to describe the cost management application of ABC. The use of ABC as a costing tool to manage costs at activity level is known as Activity Based Cost Management (ABM). ABM is a discipline that focuses on the efficient and effective management of activities as the route to continuously improving the value received by customers. ABM utilizes cost information gathered through ABC.

**Activity based management can be used in the following ways:**

**(i) Cost Reduction**: ABM helps the organisation to identify costs against activities and to find opportunities to streamline or reduce the costs or eliminate the entire activity, especially if there is no value added.

**(ii) Business Process Re-engineering**: Business process re-engineering involves examining business processes and making substantial changes to how organisation currently operates. ABM is a powerful tool for measuring business performance, determining the cost of business output and is used as a means of identifying opportunities to improve process efficiency and effectiveness.

**(iii) Benchmarking**: Benchmarking is a process of comparing of ABC-derived activity costs of one segment of company with those of other segments. It requires uniformity in the definition of activities and measurement of their costs.

**(iv) Performance Measurement:** Many organisations are now focusing on activity performance as a means of facing competitors and managing costs by monitoring the efficiency and effectiveness of activities.

---
item: q6d
qno: 6
part: (d)
marks: 5
type: descriptive
tags: cma.oh.secondary
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 28
a: 30-31
---
#### Question
Suggest any one basis of re-apportionment of service department overheads over production departments in the following instances:

| Cost of Service Department | Basis |
|---|---|
| (i) Maintenance and Repair Shop | |
| (ii) Hospital and Dispensary | |
| (iii) Fire Protection | |
| (iv) Stores Department | |
| (v) Transport Department | |
| (vi) Computer Section | |
| (vii) Power House (Electric Power Cost) | |
| (viii) Inspection | |
| (ix) Tool Room | |
| (x) Time- keeping | |
#### Answer
**Basis of re-apportionment of service department overheads over production departments**

| Cost of the Service Departments: | Basis |
|---|---|
| (i) Maintenance and Repair shop | Direct labour hours, Machine hours, Direct labour wages, Asset value x Hours worked |
| (ii) Hospital and Dispensary | No. of employees, No. of direct workers etc. |
| (iii) Fire Protection | Capital values |
| (iv) Stores Department | No. of requisitions, Weight or value of Materials issued. |
| (v) Transport Department | Crane hours, Truck hours, Truck mileage, Truck tonnage, Truck ton- hours, Tonnage handled. No. of packages of Standard size |
| (vi) Computer Section | Computer hours, Specific allocation to departments |
| (vii) Power House (Electric Power Cost) | Horse power, Kwh, Horse power × Machine hours, Kwh × Machine hours |
| (viii) Inspection | Inspection hours, number of inspections. |
| (ix) Tool room | Direct labour hours, Machine hours, Direct labour wages, Asset value x Hours worked |
| (x) Time-keeping | No. of card punched, No. of employees |

---
item: q6e
qno: 6
part: (e)
marks: 5
type: descriptive
tags: cma.proc.accounts
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 29
a: 31
---
#### Question
How will you treat normal loss, abnormal loss and abnormal gain in process costing? Explain
#### Answer
**Treatment of normal loss, abnormal loss and abnormal gain in process costing**

**Treatment of Normal loss in Cost Accounts**: The cost of normal process loss in practice is **absorbed by good units produced under the process.** The amount realised by the sale of normal process loss units should be credited to the process account.

Treatment of Abnormal loss in Cost Accounts: The cost of an abnormal process loss unit is equal to the cost of a good unit. The total cost of abnormal process loss is credited to the process account from which it arises. Cost of abnormal process loss is not treated as a part of the cost of the product. In fact, the total cost of abnormal process loss is debited to costing profit and loss account.

**Treatment of Abnormal Gain in Cost Accounts**: The **process account** under which abnormal gain arises is **debited with the abnormal gain and credited to abnormal gain account** which will be closed by transferring to the Costing Profit and Loss account. The cost of **abnormal gain is computed on the basis of normal production.**
