---
id: cma.std.recon
title: Reconciling budgeted and actual profit, and accounting for variances
minutes: 40
needs: cma.std.material, cma.std.labour, cma.std.voh, cma.std.foh
tags: reconciliation of variances, total cost variance, flexible budget, standard gross margin, budgeted profit, actual profit, disposition of variances, costing profit and loss account
labs: variance
summary: How every variance adds up to the gap between standard and actual cost, and between budgeted and actual profit; and where the variances go in the books.
---

## In plain words

### The bridge Dev wanted on one slide

Tapri's masala chai premix plant budgeted 10,000 tins for March, at ₹320 a tin and a standard cost of ₹260: a budgeted profit of **₹6,00,000**. The month closed at **₹5,37,600**.

> **Kesar:** Only ₹62,400 short. Sab adjust ho jayega.
> **Dev:** The board wants one slide: why ₹62,400? Discounted at 12%, it is less, of course.
> **Ritu:** It is one month, Dev. Per unit, please. We sold 500 tins fewer, at ₹10 more a tin, and the costs ran over the standard.

Ritu's slide is a **reconciliation**: a bridge from the budgeted profit to the actual profit in which every rupee of the gap has one cause, and the causes add up to the gap.

- **Volume.** 9,500 tins were sold, not 10,000. Each tin not sold took away its standard contribution of ₹120 (price ₹320 less variable cost ₹200): **₹60,000 adverse**.
- **Selling price.** The 9,500 tins sold at ₹330, ₹10 above the standard: **₹95,000 favourable**.
- **Costs.** The cost of 9,500 tins came in above what the standard allows for 9,500 tins: the material, labour and variable overhead variances and the fixed overhead expenditure variance, measured as in the earlier lessons, total **₹97,400 adverse**.

−₹60,000 + ₹95,000 − ₹97,400 = −₹62,400. The bridge closes.

The second question is bookkeeping. In a standard costing system stocks sit in the books at standard cost, so the variances are not hidden inside stock values: they are **disposed of**, normally by transfer to the **Costing Profit and Loss Account** (SM 13.5).

::: analogy The train's delay report
The Indore express reaches Delhi 47 minutes late. The report: late start, 10 minutes; signal at Kota, 25; slow track near Mathura, 15; 3 minutes made up on the last stretch. Each piece has an owner, and the pieces add to exactly 47. A report that says only "47 minutes late" helps nobody, and one whose pieces add to 52 is wrong.
:::

::: key
A reconciliation explains the whole gap, budget to actual or standard to actual, as a list of variances, each measured with everything else at standard; they must add to the gap. Variances are then disposed of, normally to the Costing Profit and Loss Account, because stocks are carried at standard cost.
:::

## How it works

Standard costing starts with setting standards and ends with reporting variances to management for corrective action (SM 13.2). Its process has five steps, the last of which is the disposition of variances (SM 13.5):

::: steps
1. **Setting of standards**: the standards to be achieved.
2. **Ascertainment of actual costs** for each component of cost, from books of account, material invoices, wage sheets, charge slips.
3. **Comparison of actual cost with standard cost**: variances are determined.
4. **Investigation of the reasons for variances**: performance is evaluated and appropriate actions are taken.
5. **Disposition of variances**: variances are disposed of by transferring them to the relevant accounts (Costing Profit and Loss Account) as per the accounting method (plan) adopted.
:::

### Bridge 1: standard cost of actual output to actual cost

Variances are classified as **revenue variances**, actual sales against budgeted sales, and **cost variances** (SM 13.12). The total cost variance divides into material, labour and overhead cost variances, and overheads into variable and fixed (SM 13.13, Fig 13.1). So the first reconciliation is:

**Standard cost of actual output ± cost variances = actual cost.**

The masala tins: standard cost of 9,500 tins at ₹260 = ₹24,70,000; actual cost ₹25,97,400 (material ₹7,64,400, labour ₹9,17,600, variable overheads ₹3,03,400, fixed overheads ₹6,12,000). Total cost variance ₹1,27,400 (A):

::: diagram Masala tins: the total cost variance, element by element
{"type": "nest", "w": 430, "root": {"title": "Total cost variance", "note": "₹1,27,400 (A)", "mono": false, "color": "mute", "children": [
 {"title": "Material cost", "note": "₹4,400 (A)", "mono": false, "rows": [["Price", "19,600 (F)"], ["Usage", "24,000 (A)"]], "color": "a"},
 {"title": "Labour cost", "note": "₹62,600 (A)", "mono": false, "rows": [["Rate", "29,600 (A)"], ["Efficiency", "33,000 (A)"]], "color": "b"},
 {"title": "Variable overhead cost", "note": "₹18,400 (A)", "mono": false, "rows": [["Expenditure", "7,400 (A)"], ["Efficiency", "11,000 (A)"]], "color": "c"},
 {"title": "Fixed overhead cost", "note": "₹42,000 (A)", "mono": false, "rows": [["Expenditure", "12,000 (A)"], ["Volume", "30,000 (A)"]], "color": "d"}]},
 "caption": "Each box is one element of cost, its total at the right of the title bar and its two parts below. The four elements add to ₹1,27,400 (A), the gap between ₹24,70,000 standard and ₹25,97,400 actual."}
:::

Each element was computed exactly as in its own lesson ([[cma.std.material|material]], [[cma.std.labour|labour]], [[cma.std.voh|variable overheads]], [[cma.std.foh|fixed overheads]]), with the standard: 2 kg of material at ₹40, 1.5 labour hours at ₹60, variable overheads ₹20 and fixed overheads ₹40 per labour hour (₹6,00,000 budgeted for 15,000 hours); actual 19,600 kg bought and used at ₹39, and 14,800 hours at ₹62. (When purchases and consumption differ, the price variance basis changes the actual cost the bridge reaches: Under the hood.)

### Bridge 2: budgeted profit to actual profit

The Study Material's own budget-against-actual comparison (SM 15.92) goes through a **flexible budget**: the budget recast for the actual volume at standard prices and costs ([[cma.bud.flexible|flexible budgets]]). Three columns then do all the work: the master budget (10,000 tins), the flexible budget (9,500 tins) and the actual (9,500 tins). In the exam they are one table (Format 1 below); here it is split in two so that it reads on a phone.

| ₹ | Master (10,000) | Flexible (9,500) |
|---|---:|---:|
| Sales | 32,00,000 | 30,40,000 |
| Material | 8,00,000 | 7,60,000 |
| Labour | 9,00,000 | 8,55,000 |
| VOH | 3,00,000 | 2,85,000 |
| **Contribution** | **12,00,000** | **11,40,000** |
| FOH | 6,00,000 | 6,00,000 |
| **Profit** | **6,00,000** | **5,40,000** |

| ₹ | Actual (9,500) | Variance from flexible |
|---|---:|---:|
| Sales | 31,35,000 | 95,000 (F) |
| Material | 7,64,400 | 4,400 (A) |
| Labour | 9,17,600 | 62,600 (A) |
| VOH | 3,03,400 | 18,400 (A) |
| **Contribution** | **11,49,600** | **9,600 (F)** |
| FOH | 6,12,000 | 12,000 (A) |
| **Profit** | **5,37,600** | **2,400 (A)** |

- **Master budget → flexible budget** (₹6,00,000 → ₹5,40,000): the effect of **volume** alone, 500 tins × ₹120 standard contribution = ₹60,000 (A). The fixed overheads stay at ₹6,00,000 in both: a flexible budget flexes only what varies.
- **Flexible budget → actual** (₹5,40,000 → ₹5,37,600): the selling price (₹95,000 (F)) and the cost variances. Fixed overheads appear only as the expenditure variance, ₹12,000 (A). So the cost variances here total ₹97,400 (A): Bridge 1's ₹1,27,400 (A) less the fixed overhead volume variance of ₹30,000 (A), which this bridge counts inside the volume step (see Under the hood).

::: diagram Masala tins: from budgeted to actual profit
{"type": "plot", "h": 340, "x": [0.4, 8.6], "y": [400000, 660000],
 "xlabel": "step in the reconciliation", "ylabel": "profit (₹)",
 "xticks": [[1, "Budget"], [2, "Vol."], [3, "Price"], [4, "Mat."], [5, "Lab."], [6, "VOH"], [7, "FOH"], [8, "Actual"]],
 "yticks": [[400000, "4,00,000"], [537600, "5,37,600"], [600000, "6,00,000"], [635000, "6,35,000"]],
 "legend": "none",
 "regions": [
  {"pts": [[0.65, 400000], [1.35, 400000], [1.35, 600000], [0.65, 600000]], "color": "a", "label": "6,00,000"},
  {"pts": [[1.65, 540000], [2.35, 540000], [2.35, 600000], [1.65, 600000]], "color": "bad", "label": "−60,000"},
  {"pts": [[2.65, 540000], [3.35, 540000], [3.35, 635000], [2.65, 635000]], "color": "ok", "label": "+95,000"},
  {"pts": [[3.65, 630600], [4.35, 630600], [4.35, 635000], [3.65, 635000]], "color": "bad", "label": "−4,400"},
  {"pts": [[4.65, 568000], [5.35, 568000], [5.35, 630600], [4.65, 630600]], "color": "bad", "label": "−62,600"},
  {"pts": [[5.65, 549600], [6.35, 549600], [6.35, 568000], [5.65, 568000]], "color": "bad", "label": "−18,400"},
  {"pts": [[6.65, 537600], [7.35, 537600], [7.35, 549600], [6.65, 549600]], "color": "bad", "label": "−12,000"},
  {"pts": [[7.65, 400000], [8.35, 400000], [8.35, 537600], [7.65, 537600]], "color": "a", "label": "5,37,600"}
 ],
 "series": [
  {"pts": [[1.35, 600000], [1.65, 600000]], "color": "mute", "dash": true},
  {"pts": [[2.35, 540000], [2.65, 540000]], "color": "mute", "dash": true},
  {"pts": [[3.35, 635000], [3.65, 635000]], "color": "mute", "dash": true},
  {"pts": [[4.35, 630600], [4.65, 630600]], "color": "mute", "dash": true},
  {"pts": [[5.35, 568000], [5.65, 568000]], "color": "mute", "dash": true},
  {"pts": [[6.35, 549600], [6.65, 549600]], "color": "mute", "dash": true},
  {"pts": [[7.35, 537600], [7.65, 537600]], "color": "mute", "dash": true}
 ],
 "caption": "The vertical axis starts at ₹4,00,000. Blue: budgeted and actual profit; green: a step that raises profit; rose: a step that lowers it. Vol. = volume ₹60,000 (A); Price ₹95,000 (F); Mat. = material ₹4,400 (A); Lab. = labour ₹62,600 (A); VOH ₹18,400 (A); FOH = fixed overhead expenditure ₹12,000 (A)."}
:::

The Study Material notes that for revenue (sales) variances the signs reverse: favourable when actual is more than budgeted (SM 13.12). It does not compute named sales variances for your attempt, and none of the ICAI questions read for this lesson asks for them by name, so label the two revenue lines by what they measure: the effect of volume and the effect of selling price.

### Accounting for variances: where they go

For variances in general, the Study Material says that they are transferred to the relevant accounts (Costing Profit and Loss Account) as per the plan adopted (SM 13.5), and that controllable variances are best transferred to the Costing Profit and Loss Account (MCQ 8, SM 13.56). The detailed rules are given for overheads, whose variance "is nothing but under or over-absorption" (SM 13.40), in [[cma.oh.underover|under- and over-absorption of overheads]] (SM 4.42–4.46):

| The variance is | Treatment (Study Material) |
|---|---|
| Small | Transfer to the Costing Profit and Loss Account; product costs are not changed, as they represent normal cost (SM 4.44) |
| Large, from a wrong estimate made for unavoidable reasons (e.g. a rise in the price of indirect material) | Adjust product costs with a **supplementary rate**, spread over cost of sales, finished goods and work-in-progress (SM 4.44–4.46) |
| From abnormal reasons, or factory inefficiency | Transfer to the Costing Profit and Loss Account (SM 4.45–4.46) |
| Controllable (any element) | Best disposed of by transfer to the Costing Profit and Loss Account (SM 13.56, MCQ 8, answer 13.67) |

::: diagram Disposing of a variance
{"type": "flow", "w": 400, "nodes": [
 {"id": "s", "kind": "start", "label": "Under- or over-absorption"},
 {"id": "d1", "kind": "decision", "label": "Small?"},
 {"id": "p1", "kind": "end", "label": "Costing P&L", "color": "g"},
 {"id": "d2", "kind": "decision", "label": "Abnormal, or inefficiency?"},
 {"id": "p2", "kind": "end", "label": "Costing P&L", "color": "g"},
 {"id": "e", "kind": "end", "label": "Supplementary rate", "color": "c"}],
 "edges": [["s", "d1"], ["d1", "p1", "yes"], ["d1", "d2", "no"], ["d2", "p2", "yes"], ["d2", "e", "no"]],
 "caption": "Green: written off to the Costing Profit and Loss Account in the period. Amber: a large amount from an unavoidable wrong estimate, spread by a supplementary rate over cost of sales, finished goods and work-in-progress (SM 4.44–4.46)."}
:::

::: note The flowchart in the Study Material reads differently
The flowchart printed on SM 4.43 labels its second question "Due to wrong estimation and abnormal reasons" and sends a "yes" to the Costing P&L. The text that follows (SM 4.44–4.45) and Illustration 8 (SM 4.45–4.46) send a large difference from an estimate that was wrong for unavoidable reasons to a supplementary rate, and only abnormal causes and inefficiency to the Costing P&L. The flow above follows the text; write the text's rule in an answer.
:::

In the books, an under-absorption (an adverse overhead variance) is a debit balance and an over-absorption a credit balance (SM 4.42); the Costing Profit and Loss Account is debited with cost of sales, under-absorbed overheads and abnormal losses, and credited with sales, over-absorbed overheads and abnormal gains (SM 7.5). Because stocks are valued at standard cost, a standard costing system "eliminates any variations in profit due to changes in stock values from one period to another" (SM 13.50).

Two more rules from the Study Material: responsibility centres are answerable for the adverse variances they could have controlled, and if uncontrollable variances are significant and persistent, ==the standard may need revision== (SM 13.12). The difference between the original standard cost and the revised standard cost of actual production is the **revision variance** (SM 13.53).

## Formats and formulas

*Reproduce these layouts from memory.* Each variance is written with (F) or (A); in a profit bridge, (F) is added and (A) deducted.

### Format 1: Flexible budget compared with actual (SM 15.92)

| ₹ | Master | Flex. | Actual | Var. |
|---|---:|---:|---:|---:|
| Sales | xxx | xxx | xxx | xxx |
| Each variable cost | xxx | xxx | xxx | xxx |
| **Contribution** | **xxx** | **xxx** | **xxx** | **xxx** |
| Fixed overheads | xxx | xxx | xxx | xxx |
| **Profit** | **xxx** | **xxx** | **xxx** | **xxx** |

Master = master budget at budgeted volume; Flex. = flexible budget at actual volume, at standard cost; Var. = variance, actual against flexible, each with (F) or (A). The Study Material's answer also shows the standard per unit beside the flexible budget, and a total variable cost line above contribution. In the answer book write the column heads in full.

### Format 2: Statement reconciling budgeted profit and actual profit

| Particulars | Amount (₹) |
|---|---:|
| Budgeted profit | xxx |
| Less / Add: effect of volume (units × standard contribution) | xxx |
| **Flexible budget profit** | **xxx** |
| Add / Less: effect of selling price | xxx |
| Add / Less: material price and usage variances | xxx |
| Add / Less: labour rate, idle time and efficiency variances | xxx |
| Add / Less: variable overhead expenditure and efficiency variances | xxx |
| Add / Less: fixed overhead expenditure variance | xxx |
| **Actual profit** | **xxx** |

ICAI prints no pro-forma for this statement: this layout is the variance column of Format 1 set out as a statement, with the volume step added at the top and each cost variance split into its parts. Whatever the layout, start at the budgeted profit, show every step with its (F) or (A), and end at the actual profit.

### Format 3: Income statement showing the actual gross margin

ICAI's layout in MTP January 2026 Series II and MTP September 2026 Series I:

| Particulars | Amount (₹) |
|---|---:|
| Sales | xxx |
| Less: Standard cost of goods sold | xxx |
| **Standard gross margin** | **xxx** |
| Less: Adverse variances (each listed) | xxx |
| Add: Favourable variances (each listed) | xxx |
| **Actual gross margin** | **xxx** |

::: formula The reconciliation identities
$$AC = SC - NV$$
AC = actual cost; SC = standard cost of actual output; NV = net cost variance = MCV + LCV + VOCV + FOCV, the material, labour, variable overhead and fixed overhead cost variances, with (F) as plus and (A) as minus (SM 13.13).
:::

::: lab variance {"mode":"total"}
Watch the identity close to the rupee on Tapri's chai premix: all four elements' variances, then standard cost plus adverse less favourable equals actual cost.
:::

::: formula The two revenue steps
$$\text{Volume} = (AU - BU) \times c \qquad \text{Price} = (AP - SP) \times AU$$
AU, BU = actual and budgeted units sold; c = standard contribution per unit; AP, SP = actual and standard selling price. Volume is the master budget profit against the flexible budget profit.
:::

::: definition Controllable and uncontrollable variances
**Controllable variances** are those which can be controlled under the normal operating conditions if a responsibility centre takes preventive measures and acts prudently. **Uncontrollable variances** are those which occur due to conditions which are beyond the control of a responsibility centre and cannot be controlled even though all preventive measures are in place. (SM 13.11–13.12)
:::

::: definition Revision variance
The difference between the original standard cost and the revised standard cost of actual production. (SM 13.53)
:::

## Worked examples

:::: example Rusk packs: flexible budget and the profit bridge
Tapri's bakery line makes elaichi rusk packs. Standard cost per pack: material 0.4 kg at ₹50 per kg; labour 0.2 hour at ₹75 per hour; variable overheads ₹25 per labour hour. Budgeted fixed overheads are ₹1,80,000 a month, and the standard selling price is ₹60. The master budget for May was 30,000 packs, made and sold. Actual results for May:

| Particulars | Actual |
|---|---:|
| Packs made and sold | 27,000 |
| Sales | ₹16,74,000 |
| Material used: 11,000 kg | ₹5,39,000 |
| Labour: 5,600 hours | ₹4,31,200 |
| Variable overheads | ₹1,44,200 |
| Fixed overheads | ₹1,77,000 |

**Required:**

(i) Prepare the flexible budget for May and compare it with the actual results.

(ii) Calculate the material, labour and variable overhead variances and the fixed overhead expenditure variance.

(iii) Prepare a statement reconciling the budgeted profit with the actual profit.

::: answer Show the working
**Working notes:** standard variable cost per pack = ₹20 + ₹15 + ₹5 = ₹40; standard contribution = ₹60 − ₹40 = **₹20** a pack. Actual price ₹16,74,000 ÷ 27,000 = ₹62; actual material price ₹49 per kg; actual wage rate ₹77 per hour. Standard quantity for actual output = 10,800 kg; standard hours = 5,400.

**(i) Flexible budget compared with actual.** In the answer book this is one table (Format 1); it is split in two here.

| ₹ | Master (30,000) | Flexible (27,000) |
|---|---:|---:|
| Sales | 18,00,000 | 16,20,000 |
| Material | 6,00,000 | 5,40,000 |
| Labour | 4,50,000 | 4,05,000 |
| VOH | 1,50,000 | 1,35,000 |
| **Contribution** | **6,00,000** | **5,40,000** |
| FOH | 1,80,000 | 1,80,000 |
| **Profit** | **4,20,000** | **3,60,000** |

| ₹ | Actual (27,000) | Variance from flexible |
|---|---:|---:|
| Sales | 16,74,000 | 54,000 (F) |
| Material | 5,39,000 | 1,000 (F) |
| Labour | 4,31,200 | 26,200 (A) |
| VOH | 1,44,200 | 9,200 (A) |
| **Contribution** | **5,59,600** | **19,600 (F)** |
| FOH | 1,77,000 | 3,000 (F) |
| **Profit** | **3,82,600** | **22,600 (F)** |

**(ii) Variances**

- Material price = (₹50 − ₹49) × 11,000 = **₹11,000 (F)**; usage = (10,800 − 11,000) × ₹50 = **₹10,000 (A)**; cost ₹1,000 (F).
- Labour rate = (₹75 − ₹77) × 5,600 = **₹11,200 (A)**; efficiency = (5,400 − 5,600) × ₹75 = **₹15,000 (A)**; cost ₹26,200 (A).
- VOH expenditure = 5,600 × ₹25 − ₹1,44,200 = **₹4,200 (A)**; efficiency = (5,400 − 5,600) × ₹25 = **₹5,000 (A)**; cost ₹9,200 (A).
- FOH expenditure = ₹1,80,000 − ₹1,77,000 = **₹3,000 (F)**.

**(iii) Statement reconciling budgeted profit and actual profit**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| Budgeted profit | | 4,20,000 |
| Less: effect of volume (3,000 packs × ₹20) | | 60,000 |
| **Flexible budget profit** | | **3,60,000** |
| Add: effect of selling price (27,000 × ₹2) | | 54,000 |
| Add: material price variance | 11,000 | |
| Less: material usage variance | (10,000) | 1,000 |
| Less: labour rate variance | (11,200) | |
| Less: labour efficiency variance | (15,000) | (26,200) |
| Less: VOH expenditure variance | (4,200) | |
| Less: VOH efficiency variance | (5,000) | (9,200) |
| Add: FOH expenditure variance | | 3,000 |
| **Actual profit** | | **3,82,600** |

Check: ₹16,74,000 − (₹5,39,000 + ₹4,31,200 + ₹1,44,200 + ₹1,77,000) = ₹3,82,600. Profit is ₹37,400 below budget: the lost volume (₹60,000) and the labour and overhead overruns outweighed the higher price.
:::
::::

::::: example Samosa packs: the freezer empties, the store fills
Tapri's samosa factory uses standard costing, and carries both its stores and its finished packs at standard cost. Standard cost per frozen pack: filling and dough 0.6 kg at ₹50; labour 0.2 hour at ₹90; factory overheads absorbed at ₹60 per standard labour hour. The selling price is ₹85 a pack. December opened with 6,000 packs in the freezer. During December:

| Particulars | Actual |
|---|---:|
| Packs made | 40,000 |
| Packs sold | 44,000 |
| Filling and dough bought: 26,000 kg | ₹12,74,000 |
| Filling and dough used | 24,400 kg |
| Labour: 8,200 hours | ₹7,46,200 |
| Factory overheads | ₹4,70,000 |

The price variance is taken on the quantity purchased.

**Required:**

(i) Calculate the material price and usage variances, the labour rate and efficiency variances and the factory overhead cost variance.

(ii) Prepare an income statement for December showing the standard and the actual gross margin.

(iii) Value the closing stocks of materials and of finished packs, and verify the actual gross margin from the actual costs.

:::: answer Show the working
**Working notes:** standard cost per pack = ₹30 + ₹18 + ₹12 = **₹60**. For 40,000 packs made: standard quantity 24,000 kg, standard hours 8,000. Actual price ₹12,74,000 ÷ 26,000 = ₹49 per kg; actual wage rate ₹7,46,200 ÷ 8,200 = ₹91 per hour. Closing packs = 6,000 + 40,000 − 44,000 = 2,000; closing material = 26,000 − 24,400 = 1,600 kg.

**(i)**

- Material price (on purchases) = (₹50 − ₹49) × 26,000 = **₹26,000 (F)**; usage = (24,000 − 24,400) × ₹50 = **₹20,000 (A)**.
- Labour rate = (₹90 − ₹91) × 8,200 = **₹8,200 (A)**; efficiency = (8,000 − 8,200) × ₹90 = **₹18,000 (A)**.
- Factory overhead = absorbed (8,000 × ₹60 = ₹4,80,000) − actual ₹4,70,000 = **₹10,000 (F)**.

Net variance: ₹26,000 + ₹10,000 − ₹20,000 − ₹8,200 − ₹18,000 = **₹10,200 (A)**.

**(ii) Income statement for December**

| Particulars | Amount (₹) |
|---|---:|
| Sales (44,000 × ₹85) | 37,40,000 |
| Less: Standard cost of goods sold (44,000 × ₹60) | 26,40,000 |
| **Standard gross margin** | **11,00,000** |
| Less: Adverse variances: material usage 20,000; labour rate 8,200; labour efficiency 18,000 | 46,200 |
| Add: Favourable variances: material price 26,000; factory overhead 10,000 | 36,000 |
| **Actual gross margin** | **10,89,800** |

The 44,000 packs sold are 6,000 from November's freezer and 38,000 of December's 40,000; at standard cost every pack costs ₹60, whichever month made it.

**(iii) Stocks and verification**

Closing material = 1,600 kg × ₹50 = **₹80,000** at standard price (the ₹1,600 saved on those 1,600 kg is already in the ₹26,000 price variance). Closing packs = 2,000 × ₹60 = **₹1,20,000**; opening packs were 6,000 × ₹60 = ₹3,60,000.

| Particulars | Amount (₹) |
|---|---:|
| Materials bought | 12,74,000 |
| Less: Closing material at standard price | (80,000) |
| Labour | 7,46,200 |
| Factory overheads | 4,70,000 |
| Add: Opening packs at standard | 3,60,000 |
| Less: Closing packs at standard | (1,20,000) |
| **Cost charged against December's sales** | **26,50,200** |

Actual gross margin = ₹37,40,000 − ₹26,50,200 = **₹10,89,800**, as in (ii). Every variance of December, including the price saving on material still in the store, goes to December's Costing Profit and Loss Account (SM 13.5); neither stock carries any of it.
::::
:::::

:::: example Day shift, night shift, and a plant "on standard"
Ritu's standard for a carton of chai premix: material 0.5 kg at ₹40; labour 0.75 hour at ₹24; variable overheads ₹8 per labour hour. Fixed overheads are budgeted at ₹1,00,000 for the month on 8,000 cartons and absorbed per carton. February's actuals:

| Particulars | Day shift | Night shift |
|---|---:|---:|
| Cartons made | 4,600 | 3,800 |
| Material used (kg) | 2,250 | 2,050 |
| Labour hours worked | 3,600 | 2,700 |
| Wage rate paid (₹ an hour) | 24 | 26 |
| Variable overheads (₹, metered) | 27,000 | 22,950 |

The purchase department bought exactly the 4,300 kg used, at ₹39.50 a kg. Fixed overheads for the plant were ₹97,000.

> **Kesar:** The plant report nets to almost nothing. We are on standard. Next.

**Required:**

(i) Calculate the material usage, labour and variable overhead variances for each shift, the material price variance, and the fixed overhead expenditure and volume variances.

(ii) Reconcile each shift's standard cost of output with its actual cost at standard material price, and the plant's standard cost of actual output with its actual cost.

(iii) Comment on Kesar's conclusion.

::: answer Show the working
**Working notes:** standard per carton: material ₹20, labour ₹18, variable overheads ₹6 (variable ₹44), fixed overheads ₹1,00,000 ÷ 8,000 = ₹12.50; total ₹56.50. Standard quantity and hours: day 2,300 kg and 3,450 hours; night 1,900 kg and 2,850 hours.

**(i) Variances**

| Variance (₹) | Day shift | Night shift |
|---|---:|---:|
| Material usage (SQ − AQ) × ₹40 | 2,000 (F) | 6,000 (A) |
| Labour rate (₹24 − AR) × AH | nil | 5,400 (A) |
| Labour efficiency (SH − AH) × ₹24 | 3,600 (A) | 3,600 (F) |
| VOH expenditure (AH × ₹8 − actual) | 1,800 (F) | 1,350 (A) |
| VOH efficiency (SH − AH) × ₹8 | 1,200 (A) | 1,200 (F) |
| **Total** | **1,000 (A)** | **7,950 (A)** |

Plant: material price = (₹40 − ₹39.50) × 4,300 = **₹2,150 (F)**, the purchase department's; fixed overhead expenditure = ₹1,00,000 − ₹97,000 = **₹3,000 (F)**; volume = (8,400 − 8,000) × ₹12.50 = **₹5,000 (F)**.

**(ii) Reconciliations**

| Particulars (₹) | Day shift | Night shift |
|---|---:|---:|
| Standard variable cost of output (× ₹44) | 2,02,400 | 1,67,200 |
| Add: net adverse variance (table above) | 1,000 | 7,950 |
| **Actual at standard material price** | **2,03,400** | **1,75,150** |

Check: day 2,250 × ₹40 + 3,600 × ₹24 + ₹27,000 = ₹2,03,400; night 2,050 × ₹40 + 2,700 × ₹26 + ₹22,950 = ₹1,75,150.

| Particulars (plant) | Amount (₹) |
|---|---:|
| Standard cost of actual output (8,400 × ₹56.50) | 4,74,600 |
| Add: adverse variances (6,000 + 5,400 + 3,600 + 1,350 + 1,200) | 17,550 |
| Less: favourable variances (2,150 + 2,000 + 1,800 + 3,600 + 1,200 + 3,000 + 5,000) | (18,750) |
| **Actual cost** | **4,73,400** |

Check: 4,300 × ₹39.50 + ₹86,400 + ₹70,200 + ₹27,000 + ₹22,950 + ₹97,000 = ₹4,73,400.

**(iii) Comment.** The plant's ₹1,200 (F) is the sum of ₹18,750 favourable and ₹17,550 adverse, and the plant report hides three problems. The two labour efficiency variances cancel (₹3,600 (A) and ₹3,600 (F)), so the plant shows none, yet the day shift took 150 hours more than standard. The night shift wasted 150 kg of material (₹6,000 (A)), more than the purchase department saved. And the night shift's ₹2 an hour over standard is a night allowance the standard never included: an uncontrollable variance for the shift supervisor which, if significant and persistent, calls for a revision of the standard (SM 13.12). The volume and price gains belong to other people. Variances are reported to the responsibility centre that could control them, one by one; a net figure for the plant fixes nobody's responsibility (SM 13.12).
:::
::::

## Under the hood

### The other bridge: volume at standard profit

The flexible budget measures volume at standard **contribution** and keeps fixed overheads at budget. A system that absorbs fixed overheads in the standard cost (as Format 3 does) measures volume at standard **profit** and lists the fixed overhead volume variance among the cost variances. For the masala tins:

| Step (₹) | Flexible budget bridge | Standard profit bridge |
|---|---:|---:|
| Budgeted profit | 6,00,000 | 6,00,000 |
| Volume: 500 tins × ₹120 contribution / × ₹60 profit | (60,000) | (30,000) |
| Selling price | 95,000 | 95,000 |
| Material, labour, VOH | (85,400) | (85,400) |
| FOH expenditure | (12,000) | (12,000) |
| FOH volume variance | in the volume step | (30,000) |
| **Actual profit** | **5,37,600** | **5,37,600** |

The two volume steps differ by exactly the fixed overhead volume variance: 500 tins × ₹60 = ₹30,000. Use one bridge or the other. Volume at standard profit **without** the FOH volume variance overstates profit by ₹30,000.

### Why the stock carries no variance

Standard costs are used for inventory valuation (and stock can then be recorded in quantities only), and profit is measured without swings from changing stock values (SM 13.50). So in the samosa example the whole ₹10,200 (A) hits December, though 2,000 packs are still in the freezer and 1,600 kg of filling in the store. The exception is the large variance from an unavoidable wrong estimate: a supplementary rate spreads it over cost of sales, finished goods and work-in-progress (SM 4.44–4.46).

### Material price variance: on purchases or on consumption

The rule (SM 13.15): the price variance is taken on the actual quantity **purchased**; if purchases are not given, the quantity purchased is taken as equal to the quantity consumed. Taking the quantity used is "also correct", but it reports a price variance later than the purchase does ([[cma.std.material|material variances]]). When the two quantities differ, the basis decides which actual figure the reconciliation reaches.

The masala tins again, but this time Ritu bought 22,000 kg at ₹39 and used 19,600 kg. The standard for 9,500 tins is 19,000 kg at ₹40:

| ₹ | Price on purchases | Price on consumption |
|---|---:|---:|
| Standard cost of 9,500 tins | 7,60,000 | 7,60,000 |
| Add: usage variance (A) | 24,000 | 24,000 |
| Less: price variance (F) | 22,000 | 19,600 |
| **Actual cost reached** | **7,62,000** | **7,64,400** |

₹7,64,400 is the 19,600 kg consumed at ₹39. ₹7,62,000 is the purchases (22,000 × ₹39 = ₹8,58,000) less the closing stock of 2,400 kg at the **standard** price of ₹40 (₹96,000). The ₹2,400 between them is the price variance on the 2,400 kg still in the store: the purchase basis reports it at once, so the store holds that stock at standard price, as in ICAI's RTP September 2025 case, where stocks "are valued at a predetermined standard cost" and the suggested answer takes the quantity purchased.

**What to write.** Follow the question: "based on actual material consumption" (MTP January 2026 Series II, MTP September 2026 Series I) means the quantity used. If it is silent and purchases differ from consumption, take the quantity purchased, say so, and give the consumption figure in a note, as [[cma.std.material|the material lesson]] advises. Then reconcile to the actual figure that matches the basis.

### Ideal and basic standards

Ideal standards are criticised partly because "there would be no logical method of disposing of these variances" (SM 13.3). Under basic standards, variances are not calculated at all: actual cost is expressed as a percentage of basic cost and compared with the current standard's percentage (SM 13.4). The types of standards are in [[cma.std.setting|standards and standard costing]].

### Not the same reconciliation

Reconciling the costing profit with the financial profit is a different exercise, about items in one set of books but not the other: [[cma.sys.recon|reconciling cost and financial profit]]. Reconciling marginal and absorption costing profits is in [[cma.mc.absorb|marginal versus absorption costing]].

## Exam angle

::: exam How ICAI asks for the reconciliation, May 2024 to September 2026
In the ICAI documents read for this lesson, an income statement, a budget-against-actual comparison or a working-back from variances was asked in 7 of them, and the theory around variances in 4 more.

- **Income statement with the actual gross margin**: standard gross margin, less adverse, plus favourable variances, with production 51,200 units and sales 50,000: MTP January 2026 Series II Q5(a) (11 marks) and MTP September 2026 Series I Q4 (14 marks).
- **Working back from a variance report to actual costs**: RTP September 2025 Case Scenario 1 (ALZO Toys, five MCQs); MTP May 2025 Series II Q3(a) (10 marks, to actual output, overheads absorbed and budgeted output); MTP September 2026 Series II Q4(a) (8 marks); RTP September 2024 Case Scenario 2 (actual output from the usage variance).
- **Budget against actual, flexed to actual volume**: January 2026 Q4(a) (7 marks): budget and actual sales, material, labour and variable overheads, variances on the flexed standard. The Study Material's own Practical Problem 6 of Budgets (SM 15.79, solution 15.92) is the full comparison.
- **Theory**: "Calculation of variances in standard costing is not an end in itself, but a means to an end. Discuss." (MTP January 2025 Series II Q2(b), 4 marks; MTP September 2025 Series I Q6(c), 4 marks; MTP May 2026 Series II Q4(b), 5 marks). "Define controllable and uncontrollable variance" (September 2024 Q6(b), with other terms). Disposal of controllable variances: the chapter's own MCQ 8 (SM 13.56).
- **Named sales variances** and a profit "operating statement": in none of them.
:::

::: exam The traps ICAI used
- MTP September 2026 Series I printed the absorbed factory overhead as actual hours × rate (₹30,000 (A)); the same question in MTP January 2026 Series II used standard hours for actual output × rate (₹24,000 (A)). The Study Material's absorbed overhead is standard hours for actual output × rate (SM 13.42): follow it.
- "Stocks of raw materials and finished goods are valued at a predetermined standard cost" (RTP September 2025 Case Scenario 1): the suggested answer takes the material price variance on the quantity **purchased** (the rule of SM 13.15), and the variances go to the period, not into stock.
- "CALCULATE all material variances based on actual material consumption" (MTP January 2026 Series II, MTP September 2026 Series I): purchases exceed consumption, and the question sets the purchase rule aside; on consumption the variances reconcile to the actual cost of the material used. On purchases they would reconcile to purchases less closing stock at standard price (Under the hood).
:::

::: trick Signs in a bridge
Start from the budget (or the standard) and walk to the actual: add (F), deduct (A). If the last line is not the actual figure, a variance is missing or has the wrong sign. Condition: every variance is measured once, on one basis (contribution or profit, purchase or consumption).
:::

## Answer frame

### "Calculation of variances is not an end in itself, but a means to an end. Discuss."

The points ICAI's suggested answers give (MTP January 2025 Series II Q2(b); MTP September 2025 Series I Q6(c); MTP May 2026 Series II Q4(b)):

1. The crux of standard costing lies in variance analysis: standard costs are predetermined and compared with actual costs; the difference between standard cost and actual cost of actual output is the variance.
2. A variance is favourable when actual cost is less than standard, unfavourable (adverse) when more.
3. The figures alone do not give control: their origin and causes must be traced to take remedial steps.
4. A detailed probe, particularly into **controllable** variances, helps management ascertain (i) the amount of the variance, (ii) the causes of its occurrence, (iii) the responsibility of executives and departments, (iv) the corrective action to reduce or remove it.
5. Success depends on how quickly and effectively corrective action is taken: the variance is information, the means; action on it is the end.

### "How are variances disposed of?"

| Point | Source |
|---|---|
| Disposition is the last step of the standard costing process: variances are transferred to the relevant accounts (Costing P&L) as per the plan adopted | SM 13.5 |
| Small variances, and those from abnormal causes or inefficiency (controllable): Costing P&L | SM 4.44–4.46; MCQ 8 |
| Large variances from an unavoidable wrong estimate: supplementary rate over cost of sales, finished goods and WIP | SM 4.44–4.46 |
| Stocks remain at standard cost, so profit is not distorted by stock values | SM 13.50 |
| Significant, persistent uncontrollable variances: revise the standard (revision variance) | SM 13.12, 13.53 |

### Three answers to "Reconcile the budgeted profit with the actual profit"

::: cols
**Loses marks**

"Budgeted ₹4,20,000 − actual ₹3,82,600 = ₹37,400 (A)."

A difference is not a reconciliation.
---
**Passes**

A list of the cost variances that adds to ₹34,400 (A) of variable costs and ₹3,000 (F) of fixed overheads.

The volume and price effects are missing: the list explains the flexible budget, not the budget.
---
**Full marks**

Working notes; the flexible budget; budgeted profit → volume → flexible budget profit → price → each cost variance with (F)/(A) → actual profit; the check against actual sales less actual costs.
:::

## Common mistakes

::: mistake Hall of Shame: the budget that praised the material buyer
Comparing the master budget with the actual: material ₹8,00,000 budgeted against ₹7,64,400 actual looks like ₹35,600 (F). It is only a smaller volume. **Fix:** compare costs with the **flexible budget** (standard cost of actual output): ₹7,60,000, a variance of ₹4,400 (A) (SM 15.92).
:::

::: mistake The volume counted at profit, the volume variance forgotten
Taking volume at standard profit (₹30,000 (A) for the masala tins) and then only the fixed overhead expenditure variance overstates actual profit by ₹30,000. **Fix:** either volume at standard contribution with fixed overhead expenditure only, or volume at standard profit with the full fixed overhead variance.
:::

::: mistake Variances parked in the closing stock
Valuing the 2,000 unsold samosa packs, or the 1,600 kg left in the store, at actual cost "to be fair" moves part of the variances into stock. **Fix:** in a standard costing system stock is at standard cost and the variances go to the Costing Profit and Loss Account of the period (SM 13.5, 13.50), unless the case for a supplementary rate is made.
:::

::: mistake Netting the report
"Net variance ₹1,200 (F): no action." **Fix:** investigate each variance by responsibility centre; a small net hides large offsetting causes (the two shifts' labour efficiency variances cancel exactly), and responsibility is fixed variance by variance (SM 13.12).
:::

## Practice

::: quiz Check yourself
Q: Tapri's kulhad unit budgeted a profit of ₹4,00,000. The effect of lower volume was ₹30,000 (A), the effect of selling price ₹20,000 (F), and the cost variances added to ₹45,000 (A). What was the actual profit, in rupees?
= 345000
> ₹4,00,000 − ₹30,000 + ₹20,000 − ₹45,000 = ₹3,45,000. Favourable steps are added, adverse ones deducted.

Q: Case scenario. Dev's board slide for the cold-chain division: budget 20,000 deliveries at ₹100, standard variable cost ₹60 a delivery, fixed overheads ₹5,00,000 (absorbed at ₹25 a delivery). Actual: 18,000 deliveries at ₹102; the cost variances, including a fixed overhead expenditure variance but no volume variance, total ₹22,000 (A). Which actual profit should the slide show?
- [x] ₹2,34,000
- [ ] ₹2,84,000
- [ ] ₹3,14,000
- [ ] ₹1,98,000
> Budgeted profit = 20,000 × ₹40 − ₹5,00,000 = ₹3,00,000. Volume at contribution: 2,000 × ₹40 = ₹80,000 (A); price 18,000 × ₹2 = ₹36,000 (F); costs ₹22,000 (A): ₹2,34,000. ₹2,84,000 takes volume at the ₹15 standard profit without adding the ₹50,000 fixed overhead volume variance; ₹3,14,000 forgets volume; ₹1,98,000 forgets the price.

Q: The kulhad unit had no opening stock, made 30,000 trays and sold 27,500. The standard cost is ₹48 a tray, and the month's variances net to ₹9,000 (A). At what value, in rupees, does the closing stock go into the books under standard costing?
= 120000
> Closing stock = 30,000 − 27,500 = 2,500 trays × ₹48 = ₹1,20,000, at standard cost. The ₹9,000 (A) goes to the Costing Profit and Loss Account of the month (SM 13.5); none of it is carried in the stock.

Q: Ritu's intern wants to add an adverse labour efficiency variance, caused by poor supervision, to the cost of the closing stock. Which treatment does the Study Material support?
- [ ] Spread it over closing stock and cost of sales with a supplementary rate
- [x] Transfer it to the Costing Profit and Loss Account
- [ ] Carry it forward to next month's standard
- [ ] Treat it as a revision variance
> Poor supervision is controllable inefficiency: controllable variances are best transferred to the Costing Profit and Loss Account (SM 13.56, MCQ 8), as inefficiency is in Illustration 8 (SM 4.46). Supplementary rates are for large differences from unavoidable wrong estimates.

Q: A large under-absorption of factory overheads arose because the price of indirect material rose after the standards were set. Under a supplementary rate, which accounts share it? Select all that apply.
- [x] Cost of sales
- [x] Finished goods stock
- [x] Work-in-progress
- [ ] Costing Profit and Loss Account
> A supplementary rate distributes the amount over the units of the period: cost of sales, finished goods and work-in-progress (SM 4.44–4.46). The Costing Profit and Loss Account takes small and abnormal amounts.

Q: Case scenario. The standard material cost of the rusk line's output for June is ₹5,40,000 (10,800 kg at ₹50). Ritu bought 12,000 kg at ₹49 and used 11,000 kg; the store carries material at standard price. Ritu's intern takes the price variance on the quantity purchased, as SM 13.15 says. Which actual figure do the standard cost and his two material variances reconcile to?
- [ ] ₹5,39,000, the actual cost of the 11,000 kg used
- [ ] ₹5,88,000, the actual cost of the purchases
- [x] ₹5,38,000, the purchases less the closing stock at standard price
- [ ] ₹5,40,000, because the price and usage variances cancel
> Price on purchases = 12,000 × (₹50 − ₹49) = ₹12,000 (F); usage = (10,800 − 11,000) × ₹50 = ₹10,000 (A). ₹5,40,000 + ₹10,000 − ₹12,000 = ₹5,38,000 = ₹5,88,000 − 1,000 kg × ₹50. ₹5,39,000 is the consumption-basis answer (price ₹11,000 (F)); the ₹1,000 between them is the price variance on the 1,000 kg still in the store.
:::

## Recap

- Standard cost of actual output ± cost variances = actual cost; net cost variance = MCV + LCV + VOCV + FOCV. Price variance on purchases (SM 13.15): the actual cost reached is purchases − closing stock at standard price.
- Budgeted profit → (volume, at standard contribution) → flexible budget profit → (selling price) → (each cost variance) → actual profit. Add (F), deduct (A).
- Volume at standard profit instead: then include the fixed overhead volume variance. Never mix the two.
- Compare costs with the flexible budget, never the master budget.
- Disposition (SM 13.5): to the Costing Profit and Loss Account, where small, abnormal and controllable variances go.
- Large variance from an unavoidable wrong estimate: supplementary rate over cost of sales, finished goods and WIP (SM 4.44–4.46).
- Stocks at standard cost; significant persistent uncontrollable variances → revise the standard (revision variance).
- The masala tins: −₹60,000 volume + ₹95,000 price − ₹97,400 costs = −₹62,400. The bridge closes to the rupee, or it is not a bridge.

## Flashcards

Q:: What is the last step of the standard costing process (SM)?
A:: Disposition of variances: transferring them to the relevant accounts (Costing Profit and Loss Account) as per the accounting method (plan) adopted.

Q:: Controllable variances are best disposed of by transferring them to which account?
A:: The Costing Profit and Loss Account.

Q:: Treatment of a large under-absorption arising from a wrong estimate made for unavoidable reasons?
A:: A supplementary rate, charged to cost of sales, finished goods and work-in-progress.

Q:: Define controllable variance (SM).
A:: A variance which can be controlled under normal operating conditions if a responsibility centre takes preventive measures and acts prudently.

Q:: Define uncontrollable variance (SM).
A:: A variance which occurs due to conditions beyond the control of a responsibility centre and cannot be controlled even though all preventive measures are in place.

Q:: Define revision variance.
A:: The difference between the original standard cost and the revised standard cost of actual production.

Q:: The reconciliation of standard cost and actual cost?
A:: Standard cost of actual output − net cost variance (F as plus, A as minus) = actual cost; net cost variance = material + labour + variable overhead + fixed overhead cost variances.

Q:: Budgeted profit to flexible budget profit: what is the difference?
A:: The effect of volume: (actual units − budgeted units) × standard contribution per unit (fixed overheads stay at budget).

Q:: Income statement under standard costing: the layout?
A:: Sales − standard cost of goods sold = standard gross margin; less adverse variances; add favourable variances; = actual gross margin.

Q:: Material price variance on purchases, purchases above consumption: which actual figure does the reconciliation reach?
A:: Actual purchases less the closing stock of material at standard price. On the consumption basis it reaches the actual cost of the material used.

Q:: Why is closing stock carried at standard cost under standard costing?
A:: Standard costs serve as the basis of inventory valuation; variances go to the period, so profit is not distorted by changes in stock values (SM 13.50).
