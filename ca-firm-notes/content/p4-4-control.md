## Unit 4 — Cost Control and Analysis

### Standard costing: setting standards

A standard cost is predetermined on a **standard cost card** — standard quantity at standard price for
each element — set from specifications, time study, wage agreements and expected activity. Four types:
**ideal** (perfect conditions, so demotivating), **normal** (average over a trade cycle), **basic** (a
fixed trend base) and **current or expected**, which control uses. As performance measurement it asks
what the actual output *should* have cost and splits the gap into variances that each point at one
manager.

:::key A positive variance is favourable and a negative one adverse. Label every answer F or A.
In every material, labour and variable overhead variance the **standard-based figure is written first
and the actual subtracted**, and so it is for fixed overhead expenditure (budgeted − actual) and volume
(standard for actual output − budgeted). The exception is **fixed overhead capacity**, written (actual
hours worked − budgeted hours). Take the order from the formula as printed; only the sign convention
never changes.
:::

One card, one period, so every variance ties into one reconciliation.

```text
STANDARD COST CARD (per unit)                     ACTUAL FOR THE PERIOD
  Material X   3 kg @ ₹10          30      X   6,400 kg @ ₹9.50          60,800
  Material Y   2 kg @ ₹15          30      Y   3,800 kg @ ₹16.00         60,800
  Labour       5 hours @ ₹40      200      Wages 10,400 hrs paid @ ₹41 4,26,400
  Variable OH  5 hours @ ₹10       50        (of which 200 hours idle)
  Fixed OH     5 hours @ ₹20      100      Variable overhead           1,05,000
                                 ----      Fixed overhead              2,25,000
STANDARD COST PER UNIT            410                                  --------
                                           Total actual cost            8,78,000
Budgeted output 2,200 units; budgeted hours 11,000; budgeted fixed OH ₹2,20,000
Actual output 2,000 units, so standard cost of actual output = 2,000 x 410 = ₹8,20,000
```

:::formula Material and labour variances
@formula: Material cost = Std cost of actual output − Actual cost
Material price = Actual quantity x (Std price − Actual price)
Material usage = Std price x (Std quantity for actual output − Actual quantity)
Material mix = Std price x (Actual input in std proportion − Actual quantity)
Material yield = Std cost per unit of input x (Std input for actual output − Actual input)
Labour cost = Std cost of actual output − Actual wages
Labour rate = Hours paid x (Std rate − Actual rate)
Idle time = Idle hours x Std rate (always adverse)
Labour efficiency = Std rate x (Std hours for actual output − Actual hours worked)
@terms: Price + usage = material cost; mix + yield = usage; rate + idle + efficiency = labour cost.
@watch: **Rate** is on hours *paid*, **efficiency** on hours *worked*; use paid hours for efficiency
and idle time counts twice, so the three will not sum.
:::

:::formula Overhead variances
@formula: Variable OH cost = (Std hours for actual output x Std rate) − Actual variable OH
Variable OH expenditure = (Actual hours worked x Std rate) − Actual variable OH
Variable OH efficiency = Std rate x (Std hours for actual output − Actual hours worked)
Fixed OH cost = (Actual output x Std fixed OH per unit) − Actual fixed OH
Fixed OH expenditure = Budgeted fixed OH − Actual fixed OH
Fixed OH volume = (Actual output x Std fixed OH per unit) − Budgeted fixed OH
Fixed OH capacity = Std rate per hour x (Actual hours worked − Budgeted hours)
Fixed OH efficiency = Std rate per hour x (Std hours for actual output − Actual hours worked)
@terms: Expenditure + efficiency = variable overhead variance; expenditure + volume = fixed overhead
variance; capacity + efficiency = volume.
@watch: Only **fixed** overhead has a volume variance, because only fixed overhead is spread over a
budgeted volume. Capacity is the one measured against *budgeted* hours, so it turns adverse when fewer
hours are run than planned.
:::

> **Verify:** whether your attempt's material splits volume into capacity and efficiency only, or also
> expects a **calendar** variance where actual working days differ from budgeted.

:::estimate Compute every variance from the card above and reconcile to actual cost
@given: Standard per unit — X 3 kg at ₹10, Y 2 kg at ₹15, 5 labour hours at ₹40, variable overhead ₹10
and fixed overhead ₹20 per standard hour. Budget 2,200 units and 11,000 hours, so budgeted fixed
overhead ₹2,20,000. **Actual output 2,000 units**, with X 6,400 kg at ₹9.50, Y 3,800 kg at ₹16, 10,400
hours paid at ₹41 of which 200 were idle, variable overhead ₹1,05,000 and fixed overhead ₹2,25,000.
@ask: Compute every material, labour, variable and fixed overhead variance, and prove each set sums to
its total.
@work: Standard for actual output is X 6,000 kg = ₹60,000 and Y 4,000 kg = ₹60,000, so ₹1,20,000 on
10,000 kg — a standard cost per kg of input of **₹12**. Then set it out as a statement, because that is
how marks are allotted.

```text
VARIANCE STATEMENT                                                    ₹
MATERIAL   std cost of actual output 1,20,000 · actual 1,21,600
  Price      X 6,400 x (10.00 − 9.50)             3,200 F
             Y 3,800 x (15.00 − 16.00)            3,800 A         600 A
  Usage      X 10 x (6,000 − 6,400)               4,000 A
             Y 15 x (4,000 − 3,800)               3,000 F       1,000 A
  MATERIAL COST VARIANCE                                        1,600 A
  Mix        X 10 x (6,120 − 6,400)               2,800 A
             Y 15 x (4,080 − 3,800)               4,200 F       1,400 F
  Yield      12 x (10,000 − 10,200)                             2,400 A
             mix + yield = usage                                1,000 A
LABOUR     std 10,000 hrs @ 40 = 4,00,000 · actual 10,400 paid @ 41 = 4,26,400
  Rate       10,400 x (40 − 41)                                10,400 A
  Idle time  200 x 40                                           8,000 A
  Efficiency 40 x (10,000 − 10,200)                             8,000 A
  LABOUR COST VARIANCE                                         26,400 A
VARIABLE OVERHEAD   std 10,000 x 10 = 1,00,000 · actual 1,05,000
  Expenditure (10,200 x 10) − 1,05,000                          3,000 A
  Efficiency  10 x (10,000 − 10,200)                            2,000 A
  VARIABLE OVERHEAD COST VARIANCE                               5,000 A
FIXED OVERHEAD   std 2,000 x 100 = 2,00,000 · budget 2,20,000 · actual 2,25,000
  Expenditure 2,20,000 − 2,25,000                               5,000 A
  Volume      2,00,000 − 2,20,000                              20,000 A
  FIXED OVERHEAD COST VARIANCE                                 25,000 A
    Capacity   20 x (10,200 − 11,000)                          16,000 A
    Efficiency 20 x (10,000 − 10,200)                           4,000 A
               capacity + efficiency = volume                  20,000 A

RECONCILIATION
  Standard cost of actual output                              8,20,000
  Add: total adverse variances 1,600 + 26,400 + 5,000 + 25,000  58,000
  ACTUAL COST                                                 8,78,000
```
@sanity: Each pair sums to its total — 600 A + 1,000 A = 1,600 A, 1,400 F + 2,400 A = 1,000 A, and so on.
The four element variances add to ₹58,000 adverse, exactly the gap between standard cost of actual output
and actual cost; if they do not, a whole element is wrong. The same 200 excess hours drive all three
adverse efficiency variances, so the story holds.
:::

### Marginal costing

Marginal costing charges only variable cost to the product and treats fixed cost as a period cost, so
**contribution = sales − variable cost** carries every short-term decision. Finished goods and
work-in-progress are valued at variable cost only — the whole source of the profit difference against
absorption costing.

:::formula Contribution, break-even and margin of safety
@formula: P/V ratio = Contribution / Sales
Break-even (units) = Fixed cost / Contribution per unit
Break-even (value) = Fixed cost / P/V ratio
Margin of safety = Actual sales − Break-even sales
Profit = (Sales x P/V ratio) − Fixed cost = Margin of safety x P/V ratio
Sales for a target profit = (Fixed cost + Target profit) / P/V ratio
@terms: On the **break-even chart** the **angle of incidence** is the angle at which the sales line cuts
the total cost line — a wide angle means profit accrues quickly beyond break-even. A **profit-volume
chart** plots profit against sales instead, cutting the axis at break-even.
@watch: For **multiproduct break-even** work in a composite unit — contribution per bundle of the given
mix. Break-even moves when the mix changes, so state the mix assumed.
:::

Multiproduct break-even is worked on a composite bundle of the given sales mix, with fixed cost
₹4,80,000:

```text
MULTIPRODUCT BREAK-EVEN (mix 3 A : 2 B)          A        B     Bundle
  Selling price per unit                       100      150
  Variable cost per unit                        60       90
  Contribution per unit                         40       60
  Units in the bundle                            3        2
  Contribution                                 120      120        240
  Sales                                        300      300        600
Composite P/V ratio = 240 / 600                                    40%
Break-even = 4,80,000 / 240 = 2,000 bundles
           = 6,000 units of A + 4,000 of B  =  ₹12,00,000
  check: 4,80,000 / 0.40                    =  ₹12,00,000
At sales ₹15,00,000: margin of safety ₹3,00,000 (20%)
  profit = 3,00,000 x 40%                   =  ₹1,20,000
```

**Reconciling the methods:** the profit gap is the fixed overhead in the stock movement. On 2,000 units
produced against 1,800 sold, with **fixed overhead of ₹100 a unit**, the 200 units of closing stock
carry ₹20,000, so absorption profit is **₹20,000 higher**; where stock falls it is lower, and where
stock is unchanged the two agree.

**Short-term decisions** reduce to contribution. **Make or buy** compares the buying price with the
variable cost of making, plus avoidable fixed cost and contribution lost on displaced work.
**Discontinuation**: keep a product while its contribution is positive. With a **limiting factor**, rank
by contribution per unit of that factor, not per unit of product.

### Budget and budgetary control

A **budget** is a quantitative plan for a defined future period; **budgetary control** monitors actual
against it, isolates variances and acts. Essentials: prepared in advance, tied to an objective,
expressed in money or quantity, owned by the managers held to it. The **budget manual** records
responsibilities, forms, timetable and procedures, and budgeting begins from the **principal or key
budget factor** — the constraint, usually sales, that limits everything else.

Functional budgets — sales, production, material, labour, overhead, capital expenditure and
non-operating functions such as administration and research — feed the **cash budget**, and all
consolidate into the **master budget**. **Zero-based budgeting** justifies every rupee from zero each
period through ranked decision packages instead of extrapolating last year: thorough, expensive in
time. A **performance budget** links spending to output achieved. Budgets also **motivate**: attainable
targets lift performance, ideal or imposed ones invite budgetary slack.

**Feedback control** compares actual with budget after the event and corrects next period;
**feed-forward control** compares a forecast outcome with the budget and corrects before it. A cash
budget prepared three months ahead so an overdraft can be arranged is feed-forward; a variance report
is feedback.

```text
FLEXIBLE BUDGET                       60%          80%         100%
Output (units)                       6,000        8,000       10,000
                                         ₹            ₹            ₹
  Variable cost @ ₹60 a unit      3,60,000     4,80,000     6,00,000
  Semi-variable (₹40,000 + ₹5/unit)  70,000       80,000       90,000
  Fixed cost                      1,20,000     1,20,000     1,20,000
                                  --------     --------     --------
TOTAL COST                        5,50,000     6,80,000     8,10,000
Cost per unit                        91.67        85.00        81.00
Sales @ ₹110 a unit               6,60,000     8,80,000    11,00,000
PROFIT                            1,10,000     2,00,000     2,90,000
```

Split the semi-variable line before flexing it and do not let the fixed line move — that is where the
marks sit.

:::formula Control ratios
@formula: Capacity ratio = (Actual hours worked / Budgeted hours) x 100
Activity ratio = (Std hours for actual output / Budgeted hours) x 100
Efficiency ratio = (Std hours for actual output / Actual hours worked) x 100
Activity ratio = (Capacity ratio x Efficiency ratio) / 100, all three being percentages
@terms: Above 100% is favourable; where working days differ from budget, a calendar ratio of actual to
budgeted days is also computed.
@watch: On the data above — 11,000 budgeted hours, 10,200 worked, 10,000 standard — capacity is 92.73%,
efficiency 98.04% and activity 90.91%, and (92.73 x 98.04) / 100 = 90.91.
:::

:::attempt Without looking above, write the four fixed-overhead variances with their formulas, and say which two add to the volume variance and why.
Each compares a different pair, so take the order from the formula rather than from a general rule:

- **Cost** = (actual output x standard fixed OH per unit) − actual fixed overhead.
- **Expenditure** = budgeted − actual fixed overhead: did it spend its allowance?
- **Volume** = (actual output x standard fixed OH per unit) − budgeted fixed overhead: did the volume
  materialise?
- **Capacity** = standard rate x (actual hours worked − budgeted hours); **efficiency** = standard rate
  x (standard hours for actual output − actual hours worked).

**Capacity and efficiency add to volume**, because volume falls short for two reasons only: fewer hours
run than budgeted, or hours producing less than standard. Expenditure plus volume gives the total, and
only fixed overhead has a volume variance.
:::

:::think Why can a product showing a loss under absorption costing be worth keeping?
Because that loss includes apportioned fixed overhead which continues whether or not the product is
made. While sales exceed variable cost, the contribution reduces the fixed cost the rest of the
business carries, so discontinuing cuts profit by that contribution less any fixed cost saved.
:::

:::trap Reading the fixed overhead volume variance as overspending
Overspending the allowance is the **expenditure** variance; failing to produce the budgeted volume, so
that fixed overhead is under-recovered, is the **volume** variance. A department can spend exactly its
allowance and still show a large adverse volume variance because output fell.
:::

:::checkpoint Revision checklist — closing the Costing Desk
**Formats to reproduce from memory.** The cost sheet, with WIP adjusted at works cost and finished
goods after cost of production; the stores ledger on weighted average; the cost–financial
reconciliation statement; the process account with normal loss and abnormal loss or gain, plus the
Abnormal Loss Account; the variance statement above with its reconciliation; the flexible budget with
the semi-variable line split.

**The formula set.** EOQ and stock levels; turnover rates; Halsey and Rowan; economic batch quantity;
cost per good unit in a process; equivalent units; the full variance set; P/V ratio, break-even, margin
of safety, multiproduct break-even; the control ratios.

**Examined most often.** Cost sheet; EOQ with stock levels; incentive plans compared; overhead
absorption and under- or over-absorption; cost–financial reconciliation; process costing with abnormal
loss or gain; service costing on a composite unit; full variance analysis; CVP and short-term
decisions; flexible and cash budgets.

**The traps.** Absorbing abnormal cost into the cost unit; valuing normal loss at cost; recomputing the
process rate on actual output; using hours paid for labour efficiency; confusing fixed overhead
expenditure with volume; omitting F or A; ranking by contribution per unit rather than per unit of the
limiting factor.

**Confirm against the Study Guidelines**: administration overheads; equivalent units on FIFO or
weighted average; whether a calendar variance is expected; and any topic the Guidelines exclude — ICAI
resets these every year and these notes cannot substitute for them.
:::
