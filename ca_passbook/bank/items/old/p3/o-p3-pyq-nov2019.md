<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p3-pyq-nov2019
paper: p3
kind: pyq
attempt: nov2019
qfile: old/p3/pyq-nov2019-a.pdf
afile: old/p3/pyq-nov2019-a.pdf
paperfile: old/p3/pyq-nov2019-q.pdf
choice: q1; any 4 of q2-q6; q6: any 4 of (a)-(e)
q: 1
status: checked
by: tx-41
date: 2026-10-20
note: Old-scheme Intermediate (New) Paper 3 Cost and Management Accounting, November 2019 (ICAI's running heads read "INTERMEDIATE (NEW) EXAMINATION: NOVEMBER, 2019", pages 43-69 of ICAI's compilation). Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question with its marks note before its answer; ICAI's own copy of the Suggested Answers is gone (404), so the file is the cacult.com mirror recorded in sources.json; the question-paper scan (paperfile, ICAI's own URL, OCR text) is linked as a second source and was not used for the text. The paper is wholly descriptive (no MCQs): Q1 (4 x 5 marks), Q2-Q5 (10 + 10 each) and Q6 (any four of five 5-mark parts). Instructions: the lines printed under the paper's title on p.1. No choice rule: besides Question 1 compulsory and any four of Q2-Q6, Q6 says "Answer any four of the following" of its five 5-mark parts (a)-(e), "(4 x 5 = 20 Marks)", a choice inside a question that choice: cannot express (it would count 25 marks for Q6), so, as with o-p3-pyq-may2023 and o-p7-mtp-may2018-s1, the paper is practice only and never sat; each Q6 part is an item of 5 marks. The question-level lead-ins "Answer the following:" (Q1) and "Answer any four of the following:" (Q6) are not item text (see q1a's and q6a's notes). Question text is italic throughout ICAI's PDF; that styling is not reproduced; bold headings and bold words in ICAI's answers are kept as **bold**. Formulas set as stacked fractions are written in KaTeX, and inside table cells inline with a slash (KaTeX where the denominator is a sum), with ICAI's own symbols and numbers. Q6(c)'s diagram of the bases of inventory control is a figure (bank/figs/o-p3-pyq-nov2019/q6c-1.png). Old-scheme mapping (ours): every item is in the current Paper 4 syllabus and tagged to its sub-topics; nothing is out of syllabus. ICAI's own figures and wording are kept as printed where they look wrong (each in the item's note). Accepted numbers (each read on the page): 3 is the paper's title "PAPER – 3: COST AND MANAGEMENT ACCOUNTING" on p.1 (not transcribed); 1 to 6 are the question numbers, which ICAI prints once ("Question N" above the question; its "Answer" carries no number) while check.py counts them for both the question and the answer of the same file; 12 and 0 against 12,000: the text layer splits the denominator of Deptt. A's overhead rate in Q1(b)'s answer as "₹ 12, 000", printed "₹ 12,000" on p.4. | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four of the remaining five questions (the Instructions), and Q6's "Answer any four of the following" over its five 5-mark parts (a)-(e), written q6: any 4 of (a)-(e); the paper can now be sat (maximum 100, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
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
note: Question 1 opens with ICAI's "Answer the following:" for parts (a) to (d), "(4 x 5 = 20 Marks)" (p.2); it only introduces the parts and is not transcribed in the items. Kept as printed: the carrying cost line "(15 days/30 days × 800 kg × ₹ 4)" in (ii).
q: 1
a: 3
---
#### Question
Surekha Limited produces 4,000 Litres of paints on a quarterly basis. Each Litre requires 2 kg of raw material. The cost of placing one order for raw material is ₹ 40 and the purchasing price of raw material is ₹ 50 per kg. The storage cost and interest cost is 2% and 6% per annum respectively. The lead time for procurement of raw material is 15 days.

Calculate Economic Order Quantity and Total Annual Inventory Cost in respect of the above raw material.
#### Answer
**Working:**

Calculation of Annual demand of raw material

= 4,000 Litres (per quarter) x 4 (No. of Quarter in a year) x 2 kg. (raw material required for each Litre of paint)

= **32,000 kg.**

**Calculation of Carrying cost**

Storage rate = 2%

Interest Rate = 6%

Total = 8% per annum

Carrying cost per unit per annum = 8% of ₹ 50 = ₹ 4 per unit per annum

**(i) EOQ** = $\sqrt{\dfrac{2 \times \text{Annual demand (A)} \times \text{Ordering Cost per order(O)}}{\text{Carrying cost per unit per annum (C)}}}$

= $\sqrt{\dfrac{2 \times \text{32,000kg} \times \text{₹ 40}}{\text{₹ 4}}}$ = **800** Kg

**(ii) Total Annual Inventory Cost**

Purchasing cost of 32,000 kg @ ₹ 50 per kg = ₹ 16,00,000

Ordering Cost $\left(\dfrac{\text{32,000kg}}{\text{800kg}} \times \text{₹ 40}\right)$ = ₹ 1,600

Carrying Cost of Inventory $\left(\dfrac{\text{15 days}}{\text{30 days}} \times \text{800 kg} \times \text{₹ 4}\right)$ = ₹ 1,600

₹ 16,03,200
#### Approach
Annual demand is quarterly production × 4 × 2 kg per litre; the carrying cost per kg is the storage and interest rates together applied to the purchase price.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: cma.job.job, cma.oh.absorb
difficulty: medium
note: Kept as printed: ICAI's answer works Deptt. C's overhead twice in the same cell ("Deptt. C = ₹ 9,000/₹ 10,000 × 100 = 90% of ₹ 8" and again "= … = ₹ 7.20"). The text layer's "₹ 12, 000" (Deptt. A's denominator) is "₹ 12,000" on the page and is written so.
q: 1-2
a: 3-4
---
#### Question
The following data is presented by the supervisor of a factory for a Job:

| | ₹ per unit |
|---|---:|
| Direct Material | 120 |
| Direct Wages @ ₹ 4 per hour<br>(Departments A-4 hrs, B-7 hrs, C-2 hrs & D-2 hrs) | 60 |
| Chargeable Expenses | 20 |
| Total | 200 |

Analysis of the Profit and Loss Account for the year ended 31st March, 2019

| | | | | |
|---|---:|---:|---|---:|
| Material | | 2,00,000 | Sales | 4,30,000 |
| Direct Wages | | | | |
| Dept. A | 12,000 | | | |
| Dept. B | 8,000 | | | |
| Dept. C | 10,000 | | | |
| Dept. D | 20,000 | 50,000 | | |
| Special Store items | | 6,000 | | |
| Overheads | | | | |
| Dept. A | 12,000 | | | |
| Dept. B | 6,000 | | | |
| Dept. C | 9,000 | | | |
| Dept. D | 17,000 | 44,000 | | |
| Gross Profit c/d | | 1,30,000 | | |
| | | 4,30,000 | | 4,30,000 |
| Selling Expenses | | 90,000 | Gross Profit b/d | 1,30,000 |
| Net Profit | | 40,000 | | |
| | | 1,30,000 | | 1,30,000 |

It is also to be noted that average hourly rates for all the four departments are similar.

Required:

(i) Prepare a Job Cost Sheet.

(ii) Calculate the entire revised cost using the above figures as the base.

(iii) Add 20% profit on selling price to determine the selling price.
#### Answer
**Job Cost Sheet**

Customer Details ——— Job No.\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Date of commencement —— Date of completion \_\_\_\_\_\_\_\_\_

| Particulars | | Amount (₹) |
|---|---:|---:|
| Direct materials | | 120 |
| Direct wages: | | |
| Deptt. A ₹ 4.00 × 4 hrs. | ₹ 16.00 | |
| Deptt. B ₹ 4.00 × 7 hrs. | ₹ 28.00 | |
| Deptt. C ₹ 4.00 × 2 hrs. | ₹ 8.00 | |
| Deptt. D ₹ 4.00 × 2 hrs. | ₹ 8.00 | 60 |
| Chargeable expenses | | 20 |
| Prime cost | | **200** |
| Overheads | | |
| Deptt. A = ₹ 12,000/₹ 12,000 × 100 =100% of ₹ 16 | ₹ 16 | |
| Deptt. B = ₹ 6,000/₹ 8,000 × 100 = 75% of ₹ 28 | ₹ 21 | |
| Deptt. C = ₹ 9,000/₹ 10,000 × 100 = 90% of ₹ 8<br>= ₹ 9,000/₹ 10,000 × 100 = 90% of ₹ 8 = ₹ 7.20 | ₹ 7.20 | |
| Deptt. D = ₹ 17,000/₹ 20,000 × 100 = 85% of ₹ 8 | ₹ 6.80 | **51.00** |
| Works cost | | 251.00 |
| Selling expenses = ₹ 90,000/₹ 3,00,000 ×100 = 30% of work cost | | **75.30** |
| Total cost | | 326.30 |
| Profit (20% profit on selling price i.e 25% of total cost) | | **81.58** |
| Selling price | | **407.88** |
#### Approach
Since all departments pay the same hourly rate, each department's overhead rate is its overheads as a percentage of its direct wages in the Profit and Loss Account, applied to the job's wages in that department; selling expenses are a percentage of works cost.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: cma.joint.apportion
difficulty: medium
note: Kept as printed: "Apportion joints costs" (question) and ICAI's labels (i), (ii) and (iii) in the answer, which number the profit statement (iii) under II.
q: 2
a: 4-5
---
#### Question
A Factory produces two products, 'A' and 'B' from a single process. The joint processing costs during a particular month are :

Direct Material ₹30,000

Direct Labour ₹ 9,600

Variable Overheads ₹ 12,000

Fixed Overheads ₹ 32,000

Sales: A- 100 units@ ₹ 600 per unit; B – 120 units @ ₹ 200 per unit.

I. Apportion joints costs on the basis of:

(i) Physical Quantity of each product.

(ii) Contribution Margin method, and

II. Determine Profit or Loss under both the methods.
#### Answer
**Total Joint Cost**

| | Amount (₹) |
|---|---:|
| Direct Material | 30,000 |
| Direct Labour | 9,600 |
| Variable Overheads | 12,000 |
| Total Variable Cost | 51,600 |
| Fixed Overheads | 32,000 |
| Total joint cost | 83,600 |

**Apportionment of Joint Costs:**

| | | | Product-A | Product-B |
|---|---|---|---:|---:|
| **I.** | (i) | Apportionment of Joint Cost on the basis of ‘Physical Quantity’ | **₹ 38,000**<br>$\left(\dfrac{\text{₹ 83,600}}{100 + \text{120 units}} \times 100\right)$ | **₹ 45,600**<br>$\left(\dfrac{\text{₹ 83,600}}{100 + \text{120 units}} \times 120\right)$ |
| | (ii) | Apportionment of Joint Cost on the basis of ‘Contribution Margin Method’: | | |
| | | \- Variable Costs (on basis of physical units) | **₹ 23,455**<br>$\left(\dfrac{\text{₹ 51,600}}{100 + \text{120 units}} \times 100\right)$ | **₹ 28,145**<br>$\left(\dfrac{\text{₹ 51,600}}{100 + \text{120 units}} \times 120\right)$ |
| | | Contribution Margin | **36,545**<br>(₹600×100 – 23,455) | **-4,145**<br>(₹200×120 – 28,145) |
| | | Fixed Costs\* | ₹ 32,000 | |
| | | Total apportioned cost | ₹ 55,455 | ₹ 28,145 |
| **II.** | **(iii)** | **Profit or Loss:** | | |
| | **When Joint cost apportioned on basis of physical units** | | | |
| | A. | Sales Value | ₹ 60,000 | ₹ 24,000 |
| | B. | Apportioned joint cost on basis of ‘Physical Quantity’: | ₹ 38,000 | ₹ 45,600 |
| | **A-B** | **Profit or (Loss)** | **22,000** | **(21,600)** |
| | **When Joint cost apportioned on basis of ‘Contribution Margin Method’** | | | |
| | C | Apportioned joint cost on basis of ‘Contribution Margin Method’ | ₹ 55,455 | ₹ 28,145 |
| | **A-C** | **Profit or (Loss)** | ₹ 4,545 | ₹ (4,145) |

\* The fixed cost of ₹ 32,000 is to be apportioned over the joint products A and B in the ratio of their contribution margin but contribution margin of Product B is Negative so fixed cost will be charged to Product A only.
#### Approach
Under the contribution margin method only the variable joint costs are shared by physical units; the fixed joint cost then follows the contribution margins, so watch what happens when one product's margin is negative.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: cma.mc.basics, cma.mc.bep
difficulty: easy
q: 2
a: 6
---
#### Question
When volume is 4,000 units; average cost is ₹ 3.75 per unit. When volume is 5,000 units, average cost is ₹ 3.50 per unit. The Break-Even point is 6,000 units.

Calculate: (i) Variable Cost per unit (ii) Fixed Cost and (iii) Profit Volume Ratio.
#### Answer
**(i)** Variable cost per unit = $\dfrac{\text{Change in Total cost}}{\text{Change in units}}$

= $\dfrac{(\text{₹ 3.50} \times \text{5,000 units}) - (\text{₹ 3.75} \times \text{4,000 units})}{5{,}000 - 4{,}000}$

= $\dfrac{\text{₹ 17,500 - ₹ 15,000}}{1{,}000}$ = ₹ **2,500**/1000 = **₹2.5**

**(ii)** Fixed cost = Total Cost – Variable cost (at 5,000 units level)

= ₹17,500 – ₹2.5 × 5,000 = **₹5,000**

**(iii)** Contribution per unit = $\dfrac{\text{Fixed cost}}{\text{BEP (in units)}} = \dfrac{\text{₹ 5,000}}{\text{6,000 units}}$ = 0.833

P/V Ratio = $\dfrac{\text{Contribution per unit}}{\text{Sale price per unit}} = \dfrac{0.833}{2.5 + 0.833}$ = **25%**
#### Approach
Turn the two average costs into total costs; the change in total cost over the change in volume is the variable cost per unit. At break-even, contribution per unit × break-even units equals fixed cost.

---
item: q2a
qno: 2
part: (a)
marks: 10
type: descriptive
tags: cma.abc.compute, cma.abc.concept
difficulty: medium
note: Kept as printed: "Number of expediate Deliveries" (question), "{(a) × ₹ 54)}" and "4,41000" (Customer E's cost of goods sold, both statements), "1,19280" (Customer B's gross margin) and "Customer D receive a discount".
q: 6-7
a: 8-9
---
#### Question
PQR Ltd has decided to analyse the profitability of its five new customers. It buys soft drink bottles in cases at ₹ 45 per case and sells them to retail customers at a list price of ₹ 54 per case. The data pertaining to five customers are given below:

| Particulars | A | B | C | D | E |
|---|---:|---:|---:|---:|---:|
| Number of Cases Sold | 9,360 | 14,200 | 62,000 | 38,000 | 9,800 |
| List Selling Price (₹) | 54 | 54 | 54 | 54 | 54 |
| Actual Selling Price (₹) | 54 | 53.40 | 49 | 50.20 | 48.60 |
| Number of Purchase Orders | 30 | 50 | 60 | 50 | 60 |
| Number of Customers visits | 4 | 6 | 12 | 4 | 6 |
| Number of Deliveries | 20 | 60 | 120 | 80 | 40 |
| Kilometers travelled per delivery | 40 | 12 | 10 | 20 | 60 |
| Number of expediate Deliveries | 0 | 0 | 0 | 0 | 2 |

Its five activities and their cost drivers are:

| Activity | Cost Driver |
|---|---|
| Order taking | ₹ 200 per purchase order |
| Customer visits | ₹ 300 per each visit |
| Deliveries | ₹ 4.00 per delivery km travelled |
| Product Handling | ₹ 2.00 per case sold |
| Expedited deliveries | ₹ 100 per such delivery |

You are required to :

(i) Compute the customer level operating income of each of five retail customers by using the Cost Driver rates.

(ii) Examine the results to give your comments on Customer 'D' in comparison with Customer 'C' and on Customer 'E' in comparison with Customer 'A'.
#### Answer
**Working note:**

Computation of revenues (at listed price), discount, cost of goods sold and customer level operating activities costs:

| Particular | Customers | | | | |
|---|---:|---:|---:|---:|---:|
| | **A** | **B** | **C** | **D** | **E** |
| Cases sold: (a) | 9,360 | 14,200 | 62,000 | 38,000 | 9,800 |
| Revenues (at listed price) (₹): (b) {(a) × ₹ 54)} | 5,05,440 | 7,66,800 | 33,48,000 | 20,52,000 | 5,29,200 |
| Discount (₹): (c) {(a) × Discount per case} | - | 8,520<br>(14,200 cases × ₹ 0.6) | 3,10,000<br>(62,000 cases × ₹ 5) | 1,44,400<br>(38,000 cases × ₹ 3.80) | 52,920<br>(9,800 cases × ₹ 5.40) |
| Cost of goods sold (₹): (d) {(a) × ₹ 45} | 4,21,200 | 6,39,000 | 27,90,000 | 17,10,000 | 4,41000 |
| **Customer level operating activities costs** | | | | | |
| Order taking costs (₹): (No. of purchase × ₹ 200) | 6,000 | 10,000 | 12,000 | 10,000 | 12,000 |
| Customer visits costs (₹) (No. of customer visits × ₹ 300) | 1,200 | 1,800 | 3,600 | 1,200 | 1,800 |
| Delivery vehicles travel costs (₹) (Kms travelled by delivery vehicles × ₹ 4 per km.) | 3,200 | 2,880 | 4,800 | 6,400 | 9,600 |
| Product handling costs (₹) {(a) ×₹ 2} | 18,720 | 28,400 | 1,24,000 | 76,000 | 19,600 |
| Cost of expediting deliveries (₹) {No. of expedited deliveries × ₹ 100} | - | - | - | - | 200 |
| Total cost of customer level operating activities (₹) | 29,120 | 43,080 | 1,44,400 | 93,600 | 43,200 |

**(i) Computation of Customer level operating income**

| Particular | Customers | | | | |
|---|---:|---:|---:|---:|---:|
| | **A (₹)** | **B (₹)** | **C (₹)** | **D (₹)** | **E (₹)** |
| Revenues (At list price) (Refer to working note) | 5,05,440 | 7,66,800 | 33,48,000 | 20,52,000 | 5,29,200 |
| *Less:* Discount (Refer to working note) | - | 8,520 | 3,10,000 | 1,44,400 | 52,920 |
| Revenue (At actual price) | 5,05,440 | 7,58,280 | 30,38,000 | 19,07,600 | 4,76,280 |
| *Less:* Cost of goods sold (Refer to working note) | 4,21,200 | 6,39,000 | 27,90,000 | 17,10,000 | 4,41000 |
| Gross margin | 84,240 | 1,19280 | 2,48,000 | 1,97,600 | 35,280 |
| *Less:* Customer level operating activities costs (Refer to working note) | 29,120 | 43,080 | 1,44,400 | 93,600 | 43,200 |
| Customer level operating income | 55,120 | 76,200 | 1,03,600 | 1,04,000 | (7,920) |

**(ii) Comments**

**Customer D in comparison with Customer C:** Operating income of Customer D is more than of Customer C, despite having only 61.29% (38,000 units) of the units volume sold in comparison to Customer C (62,000 units). Customer C receives a higher percent of discount i.e. 9.26% (₹ 5) while Customer D receive a discount of 7.04% (₹ 3.80). Though the gross margin of customer C (₹ 2,48,000) is more than Customer D (₹ 1,97,600) but total cost of customer level operating activities of C (₹ 1,44,400) is more in comparison to Customer D (₹ 93,600). As a result, operating income is more in case of Customer D.

**Customer E in comparison with Customer A:** Customer E is not profitable while Customer A is profitable. Customer E receives a discount of 10% (₹ 5.4) while Customer A doesn’t receive any discount. Sales Volume of Customer A and E is almost same. However, total cost of customer level operating activities of E is far more (₹ 43,200) in comparison to Customer A (₹ 29,120). This has resulted in occurrence of loss in case of Customer E.
#### Approach
For each customer, start from revenue at list price, deduct the discount (list price less actual price per case) and the cost of goods sold, then charge each activity at its cost driver rate (deliveries by kilometres, not by number of deliveries).

---
item: q2b
qno: 2
part: (b)
marks: 10
type: descriptive
tags: cma.oh.underover
difficulty: medium
note: Kept as printed: the ₹ signs before the machine hours ("Budgeted machine hours ₹ 90,000", "Actual machine hours worked ₹ 45,000") in the question, and "1/3 of the under absorption" (question) against "1/3rd" in the answer. The header "Amoun t (₹)" of (i) is a word ICAI's narrow column splits and is written "Amount (₹)".
q: 7
a: 10-11
---
#### Question
ABS Enterprises produces a product and adopts the policy to recover factory overheads applying blanket rate based on machine hours. The cost records of the concern reveal the following information:

| | |
|---|---:|
| Budgeted production overheads | ₹ 10,35,000 |
| Budgeted machine hours | ₹ 90,000 |
| Actual machine hours worked | ₹ 45,000 |
| Actual production overheads | ₹ 8,80,000 |
| Production overheads (actual) include- | |
| Paid to worker as per court's award | ₹ 50,000 |
| Wages paid for strike period | ₹ 38,000 |
| Stores written off | ₹ 22,000 |
| Expenses of previous year booked in current year | ₹ 18,500 |
| Production - | |
| Finished goods | 30,000 units |
| Sale of finished goods | 27,000 units |

The analysis of cost information reveals that 1/3 of the under absorption of overheads was due to defective production planning and the balance was attributable to increase in costs.

You are required:

(i) To find out the amount of under absorbed production overheads.

(ii) To give the ways of treating it in Cost Accounts.

(iii) To apportion the under absorbed overheads over the items.
#### Answer
**(i) Amount of under absorption of production overheads:**

| Particular | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Total production overheads actually incurred | | 8,80,000 |
| *Less*: Amount paid to worker as per court order | 50,000 | |
| Wages paid for the strike period under an award | 38,000 | |
| Stores written off | 22,000 | |
| Expenses of previous year booked in the current year | 18,500 | 1,28,500 |
| | | **7,51,500** |
| *Less*: Production overheads absorbed as per machine hour rate (45,000 hours × ₹**11.50**\*) | | **5,17,500** |
| Amount of under- absorbed production overheads | | **2,34,000** |

\*Budgeted Machine hour rate (Blanket rate) = $\dfrac{\text{₹ 10,35,000}}{\text{90,000}}$ = ₹ 11.50 per hour

**(ii) Accounting treatment of under absorbed production overheads:**

(a) As 1/3rd of the under absorbed overheads were due to defective production planning, this being abnormal, hence should be debited to Costing Profit and Loss Account.

Amount to be debited to Costing Profit and Loss Account

= ₹ 2,34,000 × 1/3 = ₹ **78,000**.

(b) Balance of under absorbed production overheads should be distributed over Finished goods and Cost of sales by applying supplementary rate\*.

Amount to be distributed = ₹ 2,34,000 × 2/3 = ₹**1,56,000**

\*Supplementary rate = $\dfrac{\text{₹ 1,56,000}}{\text{30,000 units}}$ = ₹ 5.20 per unit

**(iii) Apportionment of under absorbed production overheads over Finished goods and Cost of sales:**

| Particular | Units | Amount (₹) |
|---|---:|---:|
| Finished goods (3,000 units × ₹5.20) | 3,000 | 15,600 |
| Cost of sales (27,000 units × ₹5.20) | 27,000 | 1,40,400 |
| Total | 30,000 | 1,56,000 |
#### Approach
Remove the items that are not production overheads of the period (court award, strike wages, stores written off, previous-year expenses) before comparing actual overheads with those absorbed at the budgeted machine hour rate; then split the under-absorption into its abnormal part and the part spread by a supplementary rate.

---
item: q3a
qno: 3
part: (a)
marks: 10
type: descriptive
tags: cma.svc.others
difficulty: medium
note: The text layer's "th e year" (question) is "the year" on the page and is written so. Kept as printed: "31st March ,2019"; "Occupancy (Room-days)" as the head of the lighting charges' second column; "Off- season & -winter – 40% Occupancy months)"; "₹ 132,800" in that table against "1,32,800" in the statement of total cost.
q: 11
a: 12-14
---
#### Question
A hotel is being run in a Hill station with 200 single rooms. The hotel offers concessional rates during six off-season months in a year.

During this period, half of the full room rent is charged. The management's profit margin is targeted at 20% of the room rent. The following are the cost estimates and other details for the year ending 31st March ,2019:

(i) Occupancy during the season is 80% while in the off-season it is 40%.

(ii) Total investment in the hotel is ₹ 300 lakhs of which 80% relates to Buildings and the balance to Furniture and other Equipment.

(iii) Room attendants are paid ₹ 15 per room per day on the basis of occupancy of rooms in a month.

(iv) Expenses:

- Staff salary (excluding that of room attendants) ₹ 8,00,000
- Repairs to Buildings ₹ 3,00,000
- Laundry Charges ₹ 1,40,000
- Interior Charges ₹ 2,50,000
- Miscellaneous Expenses ₹ 2,00,200

(v) Annual Depreciation is to be provided on Buildings @ 5% and 15% on Furniture and other Equipments on straight line method.

(vi) Monthly lighting charges are ₹ 110, except in four months in winter when it is ₹ 30 per room and this cost is on the basis of full occupancy for a month.

You are required to workout the room rent chargeable per day both during the season and the off-season months using the foregoing information.

(Assume a month to be of 30 days and winter season to be considered as part of off-season).
#### Answer
**Working Notes:**

**(i) Total Room days in a year**

| Season | Occupancy (Room-days) | Equivalent Full Room charge days |
|---|---|---|
| Season – 80% Occupancy | 200 Rooms × 80% × 6 months × 30 days in a month = 28,800 Room Days | 28,800 Room Days × 100% = 28,800 |
| Off-season – 40% Occupancy | 200 Rooms × 40% × 6 months × 30 days in a month = 14,400 Room Days | 14,400 Room Days × 50% = 7,200 |
| Total Room Days | 28,800 + 14,400 = 43,200 Room Days | 36,000 Full Room days |

**(ii) Lighting Charges:**

It is given in the question that lighting charges for 8 months is ₹110 per month and during winter season of 4 months it is ₹30 per month. Further it is also given that peak season is 6 months and off season is 6 months.

It should be noted that – being Hill station, winter season is to be considered as part of Off season. Hence, the non-winter season of 8 months include – Peak season of 6 months and Off season of 2 months.

Accordingly, the lighting charges are calculated as follows:

| Season | Occupancy (Room-days) |
|---|---|
| Season & Non-winter – 80% Occupancy | 200 Rooms × 80% × 6 months × ₹ 110 per month = ₹ **1,05,600** |
| Off- season & Non-winter – 40% Occupancy (8 – 6 months) | 200 Rooms × 40% × 2 months × ₹110 per month = ₹ **17,600** |
| Off- season & -winter – 40% Occupancy months) | 200 Rooms × 40% × 4 months × ₹ 30 per month = ₹ **9,600** |
| Total Lighting charges | ₹ 1,05,600+ ₹ 17,600 + ₹ 9,600 = ₹ **132,800** |

**Statement of total cost:**

| | (₹) |
|---|---:|
| Staff salary | 8,00,000 |
| Repairs to building | 3,00,000 |
| Laundry | 1,40,000 |
| Interior | 2,50,000 |
| Miscellaneous Expenses | 2,00,200 |
| Depreciation on Building (₹ 300 Lakhs × 80% × 5%) | **12,00,000** |
| Depreciation on Furniture & Equipment (₹ 300 Lakhs × 20% × 15%) | **9,00,000** |
| Room attendant’s wages (₹ 15 per Room Day for 43,200 Room Days) | **6,48,000** |
| Lighting charges | 1,32,800 |
| Total cost | 45,71,000 |
| Add: Profit Margin (20% on Room rent or 25% on Cost) | 11,42,750 |
| Total Rent to be charged | 57,13,750 |

**Calculation of Room Rent per day:**

Total Rent / Equivalent Full Room days = ₹ 57,13,750/ 36,000 = ₹ 158.72

Room Rent during Season – ₹ 158.72

Room Rent during Off season = ₹ 158.72 × 50% = ₹ 79.36
#### Approach
Count room-days in each season for the attendants' wages, but convert off-season room-days at half rent into equivalent full-rent room-days to spread the total rent; the profit of 20% on rent is 25% on cost.

---
item: q3b
qno: 3
part: (b)
marks: 10
type: descriptive
tags: cma.sheet.mfg
difficulty: hard
note: Kept as printed: "September ,2019" (question), "Cost of Factory Cost" and "Cost of Gross Factory Cost" (workings 4 and 5) and "Selling Overheads& Distribution Overheads" (cost sheet, row 18).
q: 11-12
a: 14-16
---
#### Question
XYZ a manufacturing firm, has revealed following information for September ,2019:

| | 1st September (₹) | 30th September (₹) |
|---|---:|---:|
| Raw Materials | 2,42,000 | 2,92,000 |
| Works-in-progress | 2,00,000 | 5,00,000 |

The firm incurred following expenses for a targeted production of 1,00,000 units during the month :

| | (₹) |
|---|---:|
| Consumable Stores and spares of factory | 3,50,000 |
| Research and development cost for process improvements | 2,50,000 |
| Quality control cost | 2,00,000 |
| Packing cost (secondary) per unit of goods sold | 2 |
| Lease rent of production asset | 2,00,000 |
| Administrative Expenses (General) | 2,24,000 |
| Selling and distribution Expenses | 4,13,000 |
| Finished goods (opening) | Nil |
| Finished goods (closing) | 5000 units |

Defective output which is 4% of targeted production, realizes ₹ 61 per unit.

Closing stock is valued at cost of production (excluding administrative expenses)

Cost of goods sold, excluding administrative expenses amounts to ₹ 78,26,000.

Direct employees cost is 1/2 of the cost of material consumed.

Selling price of the output is ₹ 110 per unit.

You are required to :

(i) Calculate the Value of material purchased

(ii) Prepare cost sheet showing the profit earned by the firm.
#### Answer
**Workings:**

**1. Calculation of Sales Quantity:**

| Particular | Units |
|---|---:|
| Production units | 1,00,000 |
| *Less:* Defectives (4%×1,00,000 units) | 4,000 |
| *Less:* Closing stock of finished goods | 5,000 |
| No. of units sold | 91,000 |

**2. Calculation of Cost of Production**

| Particular | Amount (₹) |
|---|---:|
| Cost of Goods sold (given) | 78,26,000 |
| *Add:* Value of Closing finished goods (₹ 78,26,000/91,000 units × 5,000 units) | 4,30,000 |
| Cost of Production | 82,56,000 |

**3. Calculation of Factory Cost**

| Particular | Amount (₹) |
|---|---:|
| Cost of Production | 82,56,000 |
| Less: Quality Control Cost | (2,00,000) |
| Less: Research and Development Cost | (2,50,000) |
| Add: Credit for Recoveries/Scrap/By-Products/ misc. income (1,00,000 units × 4% × ₹ 61) | 2,44,000 |
| Factory Cost | 80,50,000 |

**4. Calculation of Gross Factory Cost**

| Particular | Amount (₹) |
|---|---:|
| Cost of Factory Cost | 80,50,000 |
| Less: Opening Work in Process | (2,00,000) |
| Add: Closing Work in Process | 5,00,000 |
| Cost of Gross Factory Cost | 83,50,000 |

**5. Calculation of Prime Cost**

| Particular | Amount (₹) |
|---|---:|
| Cost of Gross Factory Cost | 83,50,000 |
| Less: Consumable stores & spares | (3,50,000) |
| Less: Lease rental of production assets | (2,00,000) |
| Prime Cost | 78,00,000 |

**6. Calculation of Cost of Materials Consumed & Labour cost**

Let Cost of Material Consumed = M and Labour cost = 0.5M

Prime Cost = Cost of Material Consumed + Labour Cost

78,00,000 = M + 0.5M

M = 52,00,000

Therefore, Cost of Material Consumed = ₹ 52,00,000 and

Labour Cost = ₹ 26,00,000

**(i) Calculation of Value of Materials Purchased**

| Particular | Amount (₹) |
|---|---:|
| Cost of Material Consumed | 52,00,000 |
| Add: Value of Closing stock | 2,92,000 |
| Less: Value of Opening stock | (2,42,000) |
| Value of Materials Purchased | 52,50,000 |

**Cost Sheet**

| Sl. | Particulars | Total Cost (₹) |
|---|---|---:|
| 1. | Direct materials consumed: | |
| | Opening Stock of Raw Material | 2,42,000 |
| | Add: Additions/ Purchases [balancing figure as per requirement (i)] | 52,50,000 |
| | Less: Closing stock of Raw Material | (2,92,000) |
| | Material Consumed | 52,00,000 |
| 2. | Direct employee (labour) cost | 26,00,000 |
| 3. | Prime Cost (1+2) | 78,00,000 |
| 4. | Add: Works/ Factory Overheads | |
| | Consumable stores and spares | 3,50,000 |
| | Lease rent of production asset | 2,00,000 |
| 5. | Gross Works Cost (3+4) | 83,50,000 |
| 6. | Add: Opening Work in Process | 2,00,000 |
| 7. | Less: Closing Work in Process | (5,00,000) |
| 8. | Works/ Factory Cost (5+6-7) | 80,50,000 |
| 9. | Add: Quality Control Cost | 2,00,000 |
| 10. | Add: Research and Development Cost | 2,50,000 |
| 11. | Less: Credit for Recoveries/Scrap/By-Products/misc. income | (2,44,000) |
| 12. | Cost of Production (8+9+10-11) | 82,56,000 |
| 13. | Add: Opening stock of finished goods | - |
| 14. | Less: Closing stock of finished goods (5000 Units) | (4,30,000) |
| 15. | Cost of Goods Sold (12+13-14) | 78,26,000 |
| 16. | Add: Administrative Overheads (General) | 2,24,000 |
| 17. | Add: Secondary packing | 1,82,000 |
| 18. | Add: Selling Overheads& Distribution Overheads | 4,13,000 |
| 19. | Cost of Sales (15+16+17+18) | 86,45,000 |
| 20. | Profit | 13,65,000 |
| 21. | Sales 91,000 units@ ₹ 110 per unit | 1,00,10,000 |
#### Approach
Work backwards from the given cost of goods sold: add closing finished stock to reach cost of production, then peel off each stage of the cost sheet until prime cost, which splits into materials and labour in the ratio 2:1.

---
item: q4a
qno: 4
part: (a)
marks: 10
type: descriptive
tags: cma.emp.incentives
difficulty: medium
note: Kept as printed: the closing bracket inside "×Hours worked×Rate per hour)" in the Rowan formula and "Rate per hour )" in the Halsey formula.
q: 16
a: 17-18
---
#### Question
Zico Ltd. has its factory at two locations viz Nasik and Satara. Rowan plan is used at Nasik factory and Halsey plan at Satara factory.

Standard time and basic rate of wages are same for a job which is similar and is carried out on similar machinery. Normal working hours is 8 hours per day in a 5 day week.

Job at Nasik factory is completed in 32 hours while at Satara factory it has taken 30 hours.

Conversion costs at Nasik and Satara are ₹ 5,408 and ₹ 4,950 respectively. Overheads account for ₹ 25 per hour.

Required:

(i) To find out the normal wage; and

(ii) To compare the respective conversion costs.
#### Answer
| Particulars | Nasik | Satara |
|---|---:|---:|
| Hours worked | 32 hr. | 30 hr. |
| Conversion Costs | ₹5,408 | ₹4,950 |
| Less: Overheads | ₹800<br>(₹25×32 hr.) | ₹750<br>(₹25×30 hr.) |
| Labour Cost | ₹4,608 | ₹4,200 |

**(i) Finding of Normal wage rate:**

Let Wage rate be ₹R per hour, this is same for both the Nasik and Satara factory.

Normal wage rate can be found out taking total cost of either factory.

Nasik: Rowan Plan

Total Labour Cost = Wages for hours worked + Bonus as per Rowan plan

₹ 4,608 = Hours worked × Rate per hour + $\left(\dfrac{\text{Time saved}}{\text{Time allowed}} \times \text{Hours worked} \times \text{Rate per hour)}\right)$

Or, ₹ 4,608 = 32 hr. × R + $\left(\dfrac{40 - 32}{40} \times 32 \times R\right)$

Or, ₹ 4,608 = 32R + 6.4R

R = ₹ 120

Normal wage = 32 hrs × ₹ 120 = ₹ 3,840

**OR**

**Satara: Halsey Plan**

Total Labour Cost = Wages for hours worked + Bonus as per Halsey plan

₹ 4,200 = Hours worked × Rate per hour + (50% ×Hours saved×Rate per hour )

₹ 4,200 = 30 hr. × R + 50% × (40 hr. – 30 hr.) × R

₹ 4,200 = 35 R

**Or R = ₹ 120**

Normal Wage = 30 hrs × ₹ 120 = ₹ 3,600

**(ii) Comparison of conversion costs:**

| Particulars | Nasik (₹) | Satara (₹) |
|---|---:|---:|
| Normal Wages (32 x 120) | 3,840 | |
| (30x120) | | 3,600 |
| Bonus (6.4 x 120) | 768 | |
| (5 x 120) | | 600 |
| Overhead | 800 | 750 |
| | 5,408 | 4,950 |
#### Approach
Strip the overheads (₹ 25 per hour worked) out of each conversion cost to get the labour cost, take the standard time as the normal week of 40 hours, and solve the Rowan or the Halsey equation for the common hourly rate.

---
item: q4b
qno: 4
part: (b)
marks: 10
type: descriptive
tags: cma.proc.accounts
difficulty: medium
note: Kept as printed: ICAI labels the Process-1 account (i) and the Process-2 account (ii), then prints the Finished Goods account without a label and the Normal Loss, Abnormal Loss and Abnormal Gain accounts as (iii) to (v); "12,01500" (Process-2 account, To Process-I A/c), "₹ 130500" (Process-2 working), "By By Cost of Sales" (Finished Goods account), "By abnormal Gain II" (Normal Loss account) and "Costing P& L" (Abnormal Loss account). The Normal Loss account's head "Particular s" is a word ICAI's narrow column splits and is written "Particulars".
q: 17
a: 18-20
---
#### Question
A product passes through two distinct processes before completion.

Following information are available in this respect :

| | Process-1 | Process-2 |
|---|---|---|
| Raw materials used | 10,000 units | - |
| Raw material cost (per unit) | ₹ 75 | - |
| Transfer to next process/Finished good | 9,000 units | 8,200 units |
| Normal loss (on inputs) | 5% | 10% |
| Direct wages | ₹ 3,00,000 | ₹ 5,60,000 |
| Direct expenses | 50% of direct wages | 65% of direct wages |
| Manufacturing overheads | 25% of direct wages | 15% of direct wages |
| Realisable value of scrap (per unit) | ₹ 13.50 | ₹ 145 |

8,000 units of finished goods were sold at a profit of 15% on cost. There was no opening and closing stock of work-in-progress.

Prepare:

(i) Process-1 and Process-2 Account

(ii) Finished goods Account

(iii) Normal Loss Account

(iv) Abnormal Loss Account

(v) Abnormal Gain Account.
#### Answer
**(i)**

Dr. **Process-1 Account** Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Raw Material Consumed | 10,000 | 7,50,000 | By | Normal Loss A/c @ 13.5 | 500 | 6,750 |
| ” | Direct Wages | -- | 3,00,000 | ” | Process 2 @ 133.5 | 9,000 | 12,01,500 |
| ” | Direct Expenses | -- | 1,50,000 | ” | By Abnormal Loss @ 133.5 | 500 | 66,750 |
| “ | Manufacturing Overheads | | 75,000 | | | | |
| | | 10,000 | 12,75,000 | | | 10,000 | 12,75,000 |

Cost per unit of completed units and abnormal loss:

= $\dfrac{\text{₹ 12,75,000 - ₹ 6,750}}{\text{10,000units - 500units}}$ = **₹ 133.5**

**(ii)**

Dr. **Process-2 Account** Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Process-I A/c | 9,000 | 12,01500 | By | Normal Loss A/c @ 145 | 900 | 1,30,500 |
| ” | To Direct Wages | -- | 5,60,000 | ” | By Finished Stock A/c [bal fig] | 8,200 | 21,04,667 |
| ” | Direct Expenses | -- | 3,64,000 | | | | |
| ” | Manufacturing Overheads | -- | 84,000 | | | | |
| ” | To Abnormal gain (₹ 256.67 × 100 units) | 100 | 25,667 | | | | |
| | | 9,100 | 22,35,167 | | | 9,100 | 22,35,167 |

Cost per unit of completed units and abnormal gain:

= $\dfrac{\text{₹ 22,09,500 - ₹ 130500}}{\text{8,100units}}$ = **₹ 256.67**

Dr. **Finished Goods A/c** Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Process II A/c | 8,200 | 21,04,667 | By | By Cost of Sales | 8,000 | 20,53,333 |
| | | | | ” | By Balance c/d | 200 | 51,334 |
| | | **8,200** | **21,04,667** | | | **8,200** | **21,04,667** |

**(iii) Normal Loss A/c**

Dr. Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Process I | 500 | 6,750 | By | By abnormal Gain II | 100 | 14,500 |
| | Process II | 900 | 1,30,500 | | By Cash | 500 | 6,750 |
| | | | | | By Cash | 800 | 1,16,000 |
| | | 1400 | 1,37,250 | | | 1400 | 1,37,250 |

**(iv) Abnormal Loss A/c**

Dr. Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Process I | 500 | 66,750 | By | By Cost Ledger Control A/c | 500 | 6,750 |
| | | | | | By Costing P& L A/C (Abnormal Loss) | | 60,000 |
| | | | 66,750 | | | | 66,750 |

**(v) Abnormal Gain A/c**

Dr. Cr.

| | Particulars | Units | Total (₹) | | Particulars | Units | Total (₹) |
|---|---|---:|---:|---|---|---:|---:|
| To | Normal Loss A/c @ 145 | 100 | 14,500 | By | Process II | 100 | 25,667 |
| To | Costing P & L A/C | | 11,167 | | | | |
| | | 100 | 25,667 | | | 100 | 25,667 |
#### Approach
In each process, value the normal loss at its scrap value and compute the cost per unit on normal output (input less normal loss); compare actual output with normal output to see whether the process has an abnormal loss (Process 1) or an abnormal gain (Process 2).

---
item: q5a
qno: 5
part: (a)
marks: 10
type: descriptive
tags: cma.mc.decisions, cma.sheet.quote
difficulty: medium
q: 20-21
a: 21-22
---
#### Question
PJ Ltd manufactures hockey sticks. It sells the products at ₹ 500 each and makes a profit of ₹ 125 on each stick. The Company is producing 5,000 sticks annually by using 50% of its machinery capacity.

The cost of each stick is as under:

| | |
|---|---|
| Direct Material | ₹ 150 |
| Direct Wages | ₹ 50 |
| Works Overhead | ₹ 125 (50% fixed) |
| Selling Expenses | ₹ 50 (25% variable) |

The anticipation for the next year is that cost will go up as under:

| | |
|---|---:|
| Fixed Charges | 10% |
| Direct Wages | 20% |
| Direct Material | 5% |

There will not be any change in selling price.

There is an additional order for 2,000 sticks in the next year.

Calculate the lowest price that can be quoted so that the Company can earn the same profit as it has earned in the current year?
#### Answer
Selling Price = ₹ 500

Profit = ₹ 125

No of Sticks = 5,000

| Particular | Current Year (₹) | Next Year (₹) |
|---|---:|---:|
| Direct Material | 150 | **157.50**<br>(150 + 5%) |
| Direct Wages | 50 | **60**<br>(50+20%) |
| Works Overheads | 62.50<br>(125 × 50%) | **62.5** |
| Selling Expenses | 12.50<br>(50 × 25%) | **12.5** |
| Total Variable Cost | 275 | 292.50 |
| Fixed Cost (62.5 × 5,000) = 3,12,500; (37.5 × 5,000) = 1,87,500 | **5,00,000** | **5,50,000** |

Let: Lowest Price Quoted = K

Now, Sales = Target Profit (5,000 units × ₹ 125) + Variable Cost + Fixed Cost

Or, = (5,000 × 500) + (2,000 × K) = **6,25,000** + 20,47,500 + 5,50,000

Or, K = ₹ **361.25**

So, Lowest Price that can be quoted to earn the profit of ₹ 6,25,000 (same as current year) is ₹ 361.25
#### Approach
Split works overhead and selling expenses into their fixed and variable parts, raise each cost by next year's increase, and set total sales (5,000 at ₹ 500 plus 2,000 at the unknown price) equal to this year's total profit plus next year's variable and fixed costs.

---
item: q5b
qno: 5
part: (b)
marks: 10
type: descriptive
tags: cma.std.material
difficulty: medium
note: Kept as printed: "(60 – 50)) × 260" (Material B, price variance) and the head "Standard for 640 kg. output" of the basic calculation (ICAI's standard input of 800 kg gives 640 kg).
q: 21
a: 22-23
---
#### Question
The standard cost of a chemical mixture is as follows:

60% of Material A @ ₹ 50 per kg

40% Material B @ ₹ 60 per kg

A standard loss of 25% on output is expected in production. The cost records for a period has shown the following usage.

540 kg of Material A @ ₹ 60 per kg

260 kg of Material B @ ₹ 50 per kg

The quantity processed was 680 kilograms of good product.

From the above given information

Calculate:

(i) Material Cost Variance

(ii) Material Price Variance

(iii) Material Usage Variance

(iv) Material Mix Variance

(v) Material Yield Variance.
#### Answer
**Basic Calculation**

| Material | Standard for 640 kg. output | | | Actual for 680 kg. output | | |
|---|---:|---:|---:|---:|---:|---:|
| | **Qty. Kg.** | **Rate (₹)** | **Amount (₹)** | **Qty Kg.** | **Rate (₹)** | **Amount (₹)** |
| A | 480 | 50 | 24,000 | 540 | 60 | 32,400 |
| B | 320 | 60 | 19,200 | 260 | 50 | 13,000 |
| Total | 800 | | 43,200 | 800 | | 45,400 |
| *Less:* Loss | 160 | − | − | 120 | − | − |
| | 640 | | 43,200 | 680 | | 45,400 |

Std. cost of actual output = ₹ 43,200 × 680/640 = ₹ 45,900

Calculation of Variances

(i) **Material Cost Variance** = (Std. cost of actual output – Actual cost)

= (45,900– 45,400)

= ₹ **500 (F)**

(ii) **Material Price Variance** = (SP – AP) × AQ

Material A = (50 – 60) × 540 = ₹ 5400 (A)

Material B = (60 – 50)) × 260 = ₹ 2600 (F)

MPV = **₹ 2800 (A)**

(iii) **Material Usage Variance (MUV)** = (Std. Quantity for actual output – Actual Quantity) × Std. Price

Material A = $\left(\dfrac{480 \times 680}{640} - 540\right) \times 50$ = ₹ 1,500 (A)

Material B = $\left(\dfrac{320 \times 680}{640} - 260\right) \times 60$ = ₹ 4,800 (F)

MUV = **₹ 3,300 (F)**

(iv) **Material Mix Variance** = SP × (RAQ – AQ)

A = ₹ 50× (480 Kg – 540 Kg) = ₹ 3,000 (A)

B = ₹ 60 × (320 Kg. – 260 Kg.) = ₹ 3,600 (F)

Total = ₹ 3,000 (A) + ₹ 3,600 (F) = **₹ 600 (F)**

(v) **Material Yield Variance** = SP × (SQ – RAQ)

A = ₹ 50 × (510 Kg. – 480 Kg) = ₹ 1,500 (F)

B = ₹ 60 × (340 Kg. – 320 Kg.) = ₹ 1,200 (F)

Total = ₹ 1,500 (F) + ₹ 1,200 (F) = ₹ **2,700 (F)**
#### Approach
A loss of 25% on output means 100 kg of input gives 80 kg of output; scale the standard mix to the actual input for the mix variance and to the actual output for the usage and yield variances.

---
item: q6a
qno: 6
part: (a)
marks: 5
type: descriptive
tags: cma.svc.basics
difficulty: easy
note: Question 6 opens with ICAI's instruction "Answer any four of the following:" for parts (a) to (e), "(4 x 5 = 20 Marks)" (pp.23-24); the instruction is a heading of the question, not transcribed in the items. ICAI sets the two summation formulas in boxes, with subscripts, written here in KaTeX. Kept as printed: "rather quantitative", "calculated as follows.:", "In both the example" and "does not affect the variable cost hence and is a qualitative factor".
q: 23
a: 24-25
---
#### Question
Describe Composite Cost unit as used in Service Costing and discuss the ways of computing it .
#### Answer
**Composite Cost Unit:** Sometime two measurement units are combined together to know the cost of service or operation. These are called composite cost units. For example, a public transportation undertaking would measure the operating cost per passenger per kilometre.

Examples of Composite units are Ton- km., Quintal- km, Passenger-km., Patient-day etc. **Composite unit may be computed in two ways**:

(i) Absolute (Weighted Average) basis.

(ii) Commercial (Simple Average) basis.

In both bases of computation of service cost unit, weightage is also given to qualitative factors rather quantitative (which are directly related with variable cost elements) factors alone.

**(i) Weighted Average or Absolute basis –** It is summation of the products of qualitative and quantitative factors. For example, to calculate absolute Ton-Km for a goods transport is calculated as follows.:

∑ (Weight Carried × Distance)$_1$ + (Weight Carried × Distance)$_2$ +….+ (Weight Carried × Distance)$_n$

Similarly, in case of Cinema theatres, price for various classes of seats are fixed differently. For example–

First class seat may be provided with higher quality service and hence charged at a higher rate, whereas Second Class seat may be priced less. In this case, appropriate weight to be given effect for First Class seat and Second Class seat – to ensure proper cost per composite unit.

**(ii) Simple Average or Commercial basis** – It is the product of average qualitative and total quantitative factors. For example, in case of goods transport, Commercial Ton -Km is arrived at by multiplying total distance km., by average load quantity.

∑ (Distance$_1$ + Distance$_2$ + …………...…+ Distance$_n$) × $\left(\dfrac{W_1+W_2+....+W_n}{n}\right)$

In both the example, variable cost is dependent of distance and is a quantitative factor. Since, the weight carried does not affect the variable cost hence and is a qualitative factor.

---
item: q6b
qno: 6
part: (b)
marks: 5
type: descriptive
tags: cma.sys.ledgers
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. Kept as printed: ICAI's leader dots after the debit accounts, "Wage Control A/c" against "To Wages Control A/c" in (iv), and the footnote marker of "\*Cost Ledger Control A/c …", which no entry carries.
q: 23
a: 25
---
#### Question
Journalise the following transactions in cost books under Non-Integrated system of Accounting.

| | | |
|---|---|---:|
| (i) | Credit Purchase of Material | ₹ 27,000 |
| (ii) | Manufacturing overhead charged to Production | ₹ 6,000 |
| (iii) | Selling and Distribution overheads recovered from Sales | ₹ 4,000 |
| (iv) | Indirect wages incurred | ₹ 8,000 |
| (v) | Material returned from production to stores | ₹ 9,000 |
#### Answer
Journal entries are as follows:

| | | | Dr. (₹) | Cr. (₹) |
|---|---|---|---:|---:|
| (i) | Stores Ledger Control A/c…………………… | Dr. | 27,000 | |
| | To Cost Ledger Control A/c | | | 27,000 |
| (ii) | Work-in-Process Control A/c........................... | Dr. | 6,000 | |
| | To Manufacturing Overhead Control A/c | | | 6,000 |
| (iii) | Cost of Sales A/c……………………………… | Dr. | 4,000 | |
| | To Selling & Dist. Overhead Control A/c | | | 4,000 |
| (iv) | (1) Wage Control A/c…………………… | Dr. | 8,000 | |
| | To Cost Ledger Control A/c | | | 8,000 |
| | (2) Manufacturing Overhead Control A/c……… | Dr. | 8,000 | |
| | To Wages Control A/c | | | 8,000 |
| | **OR** | | | |
| | Manufacturing Overhead Control A/c……………. | Dr. | 8,000 | |
| | To Cost Ledger Control A/c | | | 8,000 |
| (v) | Stores Ledger Control A/c ……………………… | Dr. | 9,000 | |
| | To Work-in-Process Control A/c | | | 9,000 |

\*Cost Ledger Control A/c is also known as General Ledger Control A/c

---
item: q6c
qno: 6
part: (c)
marks: 5
type: descriptive
tags: cma.mat.techniques
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. ICAI's answer ends with a diagram of the bases of inventory control (p.26), kept as a figure. Kept as printed: "Insufficient stock not only pause the production".
figure: q6c-1.png | answer | ICAI's chart: a box "Inventory Control" at the top joined to four boxes below it: "By Setting Quantitative Levels", "On the basis of Relative Classification", "Using Ratio Analysis" and "Physical Control".
q: 23
a: 25-26
---
#### Question
Define Inventory Control and give its objectives.

List down the basis to be adopted for Inventory Control.
#### Answer
**Inventory Control:** The Chartered Institute of Management Accountants (CIMA) defines Inventory Control as “The function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks.”

The objective of inventory control is to make a balance between sufficient stock and over-stock. The stock maintained should be sufficient to meet the production requirements so that uninterrupted production flow can be maintained. Insufficient stock not only pause the production but also cause a loss of revenue and goodwill. On the other hand, Inventory requires some funds for purchase, storage, maintenance of materials with a risk of obsolescence, pilferage etc. A trade-off between Stock-out and Over-stocking is required. The management may employ various methods of Inventory control to have a balance. Management may adopt the following basis for Inventory control:

---
item: q6d
qno: 6
part: (d)
marks: 5
type: descriptive
tags: cma.intro.terms
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a.
q: 23-24
a: 26
---
#### Question
Mention the Cost Unit of the following Industries:

(i) Electricity

(ii) Automobile

(iii) Cement

(iv) Steel

(v) Gas

(vi) Brick Making

(vii) Coal Mining

(viii) Engineering

(ix) Professional Services

(x) Hospital
#### Answer
**Cost Unit of Industries:**

| S. No. | Industry | Cost Unit Basis |
|---|---|---|
| (i) | Electricity | Kilowatt-hour (kWh) |
| (ii) | Automobile | Number |
| (iii) | Cement | Ton/ per bag etc. |
| (iv) | Steel | Ton |
| (v) | Gas | Cubic feet |
| (vi) | Brick-making | 1,000 bricks |
| (vii) | Coal mining | Tonne/ton |
| (viii) | Engineering | Contract, job |
| (ix) | Professional services | Chargeable hour, job, contract |
| (x) | Hospitals | Patient day |

---
item: q6e
qno: 6
part: (e)
marks: 5
type: descriptive
tags: cma.bud.zbb
difficulty: easy
note: Question 6: "Answer any four of the following" (a)-(e), see q6a. Kept as printed: "although the activities to which the budget relates are being undertaken for the first time, without approval, the budget allowance is zero", "for each activities" and "mid -day meal".
q: 24
a: 26-27
---
#### Question
Define Zero Base Budgeting and mention its various stages.
#### Answer
**Zero-based Budgeting:** (ZBB) is an emergent form of budgeting which arises to overcome the limitations of incremental (traditional) budgeting system. Zero- based Budgeting (ZBB) is defined as ‘a method of budgeting which requires each cost element to be specifically justified, although the activities to which the budget relates are being undertaken for the first time, without approval, the budget allowance is zero’.

ZBB is an activity based budgeting system where budgets are prepared for each activities rather than functional department. Justification in the form of cost benefits for the activity is required to be given. The activities are then evaluated and prioritized by the management on the basis of factors like synchronisation with organisational objectives, availability of funds, regulatory requirement etc.

ZBB is suitable for both corporate and non-corporate entities. In case of non-corporate entities like Government department, local bodies, not for profit organisations, where these entities need to justify the benefits of expenditures on social programmes like mid -day meal, installation of street lights, provision of drinking water etc.

ZBB involves the following stages:

(i) Identification and description of Decision packages

(ii) Evaluation of Decision packages

(iii) Ranking (Prioritisation) of the Decision packages

(iv) Allocation of resources
