---
id: fm.wc.estimate
title: Estimating working capital requirement
minutes: 40
needs: fm.wc.basics
tags: working capital estimation, statement of working capital, cash cost basis, operating cycle method, safety margin, double shift, work-in-progress
labs:
summary: Turning the operating cycle into rupees: the operating cycle shortcut, the item-by-item statement of working capital (ICAI's format), the cash cost basis, the half-period rule for WIP and the effect of double shift working.
---

## In plain words

### The bank wants a number

Tapri is opening a chai premix plant at Dewas, and the bank will sanction a working capital limit only against a proper estimate.

> **Kesar:** Write ₹1 crore. Banks like round numbers. Sab adjust ho jayega.
> **Dev:** Banks like workings. Ritu, how many weeks does each rupee sit in each place?
> **Ritu:** Per unit, please, then per week. Four weeks in raw material, two in process, three in the warehouse, six with the distributors. Suppliers wait four weeks.
> **Dev:** Then the estimate writes itself. Mostly.

The idea is one line long: **the money stuck in any stage = the cost flowing through that stage per week (or month, or day) × the time it stays there**. If a plant uses ₹2,50,000 of raw material a week and holds four weeks' stock, the store holds ₹10,00,000. Do that for raw material, work-in-progress, finished goods and debtors, add the cash balance, and you have the **current assets**. Do it again for what suppliers, workers and service providers let you owe, the **current liabilities**, and subtract. Add a **safety margin** for the unexpected, and that is the working capital to ask the bank for.

Two refinements carry most of the marks. Half-made goods have received all their material but, on average, only half their labour and overheads, because those build up evenly while the goods are in process. And a debtor's bill includes profit, which you never spent, and depreciation, which you never paid out in cash; so many experts measure debtors and finished goods at their **cash cost**, the money actually blocked.

::: analogy The railway platform
How many people stand on the platform? Arrivals per minute × minutes each one waits. Six arrivals a minute, each waiting ten minutes: sixty people on the platform at any moment. Working capital is the same count in rupees: what flows in per day × the days it waits. Faster trains (a shorter cycle) mean an emptier platform with the same traffic.
:::

::: key
Each current asset = the cost flowing through it per period × the periods it is held; each current liability = the expense that flows into it per period × the periods it stays unpaid. Value each item at the cost actually paid in (for cash cost basis: no profit, no depreciation), take half the conversion cost for work-in-progress when it accrues evenly, subtract the liabilities and add the safety margin.
:::

## How it works

### Three ways to estimate (SM 9.16–9.17)

The operating cycle is one of the most reliable methods; ICAI lists three:

1. **Current assets holding period**: working capital from the average holding period of current assets, related to costs on the basis of the previous year's experience. This is essentially the operating cycle concept.
2. **Ratio of sales**: working capital as a ratio of sales, on the assumption that current assets change with sales.
3. **Ratio of fixed investments**: working capital as a percentage of fixed investments.

The choice is affected by seasonal fluctuations, the accuracy of the sales forecast, investment cost and variability in sales price; the production cycle and the credit and collection policies must be given due weight. The operating cycle itself is built in [[fm.wc.basics|working capital and the operating cycle]].

### The operating cycle shortcut

When a question gives the periods and the annual operating cost, the requirement is one division (TYK Problem 1, SM 9.130):

$$\text{Working capital required} = \frac{\text{Annual operating cost}}{\text{Number of operating cycles}} \qquad = \text{Operating cost per day} \times \text{Net operating cycle (days)}$$

It assumes costs flow evenly and every rupee of operating cost waits the whole net cycle. On the cash cost basis, depreciation is taken out of the operating cost first.

### The statement method, item by item (SM 9.22–9.24)

The holding period of each current asset and current liability can contract or expand the net operating cycle: the shorter the cycle, the lower the requirement. Each item is estimated separately, then set out in ICAI's statement:

::: diagram Building the statement of working capital
{"type": "flow", "w": 420, "nodes": [
  {"id": "a", "kind": "start", "label": "Cost per unit\nand annual volumes"},
  {"id": "b", "kind": "process", "label": "Annual cost base\nfor each item"},
  {"id": "c", "kind": "process", "label": "Current assets:\nbase × period"},
  {"id": "d", "kind": "process", "label": "Current liabilities:\nbase × lag"},
  {"id": "e", "kind": "process", "label": "CA − CL"},
  {"id": "f", "kind": "end", "label": "+ safety margin\n= requirement", "color": "g"}],
 "edges": [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"]],
 "caption": "The base differs by item: raw material at material cost, WIP at material plus part of conversion, finished goods at cost of production, debtors at cost of sales (or sales value), creditors at purchases. The period is the months, weeks or days held, divided by 12, 52 or 360 (365)."}
:::

**Current assets** (production in units ÷ 12 months or 365 days × cost per unit × period):

- **Raw materials**: estimated production × estimated cost per unit × average raw material storage period.
- **Work-in-progress**: estimated production × estimated WIP cost per unit × average WIP holding period.
- **Finished goods**: estimated production × estimated cost of production per unit × average finished goods storage period.
- **Receivables**: estimated credit sales × estimated cost of sales (excluding depreciation) per unit × average collection period. Only cash cost is considered for debtors and finished goods: sales to debtors include cost and profit, and the funds required need not include profit; non-cash expenses like depreciation are also excluded (SM 9.23).
- **Cash and cash equivalents**: the minimum desired cash and bank balance is added.

**Current liabilities** are deducted, so the requirement is lowered to the extent of current liabilities (**other than bank credit**) arising in the normal course of business (SM 9.23–9.24):

- **Trade payables**: estimated credit purchases × credit period allowed by suppliers.
- **Direct wages**: estimated labour hours × wage rate per hour × average time lag in payment of wages.
- **Overheads** (other than depreciation and amortisation): estimated overheads × average time lag in payment.

Number of days in a year may be taken as 365 or 360 (SM 9.24). Bank borrowing is not deducted: it is what the estimate is for.

### Work-in-progress: the half-period rule

In ICAI's Illustration 3, each unit is in process for one month, the raw materials being fed into the pipeline immediately and the labour and overhead costs accruing evenly during the month. So WIP holds one month's raw material but, on average, ½ month's labour and overheads: on the first day of the month the labour in WIP is nil, on the last day a full month's (SM 9.26).

::: diagram One samosa pack's cost while it is in process
{"type": "plot", "h": 270, "x": [0, 10], "y": [0, 55], "xlabel": "days in process", "ylabel": "cost per pack (₹)", "legend": "outside",
 "xticks": [[0, "0"], [5, "5"], [10, "10"]], "yticks": [[0, "0"], [30, "30"], [40, "40"], [50, "50"]],
 "series": [
  {"label": "material (all at the start)", "fn": "30", "color": "a"},
  {"label": "material + conversion so far", "fn": "30+2*x", "color": "d"},
  {"label": "average cost in WIP", "fn": "40", "color": "g", "dash": true}
 ],
 "areas": [{"under": 0, "from": 0, "to": 10, "color": "a", "label": "material ₹30"}, {"between": [1, 0], "from": 0, "to": 10, "color": "c", "label": "conversion"}],
 "caption": "Material of ₹30 goes in on day 1; labour and overheads of ₹20 build up evenly over 10 days. A pack is worth ₹30 on entry and ₹50 on completion, ₹40 on average: full material plus half the conversion cost."}
:::

When a question states a degree of completion ("raw material 100%, other costs 50% complete", TYK Problem 2, SM 9.130), use it: that is the same rule written as percentages.

### The cash cost basis (SM 9.28)

In current assets like sundry debtors and finished goods, the funds actually blocked are less than their book amount. ICAI's example:

::: diagram ₹1 lakh of debtors: what is really blocked
{"type": "nest", "w": 420, "root": {"title": "Debtors at sales value", "note": "₹1,00,000", "mono": false, "color": "mute", "children": [
  {"title": "Profit", "note": "₹25,000", "lines": ["never spent: no funds needed"], "mono": false, "color": "d"},
  {"title": "Depreciation", "note": "₹5,000", "lines": ["a non-cash cost"], "mono": false, "color": "c"},
  {"title": "Cash cost", "note": "₹70,000", "lines": ["the funds actually blocked"], "mono": false, "color": "g", "hl": true}]},
 "caption": "Cost of sales is ₹75,000 of the ₹1,00,000, the rest is profit; ₹5,000 of the cost is depreciation. Only ₹70,000 must be financed (SM 9.28). Finished goods, valued at cost, likewise leave out non-cash costs."}
:::

Under this approach debtors are calculated not as a percentage of sales value but as a percentage of **cash costs**, and finished goods are valued at cash costs too (SM 9.28). ICAI's Illustration 4 builds two working notes first: **cash cost of production** (materials + wages + cash manufacturing expenses) for finished goods, and **cash cost of sales** (cash cost of production + administrative + selling expenses) for debtors (SM 9.30).

### Double shift working (SM 9.31)

Double shift's greatest economy is the greater use of fixed assets; little additional fund is needed for assets, but working capital changes:

1. Stocks rise with production, but perhaps not in proportion: the minimum levels may not be much higher, so stocks may not have to double when production doubles.
2. **Materials in process do not change**: work started in the first shift is completed in the second, so capital tied up in WIP stays the same, unless second-shift workers are paid more.
3. Larger purchases may bring economies (better terms from vendors), and the fixed costs may not all increase: **fixed cost per unit falls**.

ICAI's Illustration 5 values every item at the new, lower cost per unit, doubles the units of raw material, finished goods, debtors and liabilities, and keeps the units of WIP unchanged (SM 9.32–9.33).

## Formats and formulas

*Reproduce ICAI's statement from memory: the headings, the order and "Safety Margin" carry marks.*

| Estimation of Working Capital Requirements (SM 9.24–9.25) | ₹ | ₹ |
|---|---:|---:|
| **I. Current Assets:** | | |
| Inventories: Raw materials; Work-in-process; Finished goods | --- | --- |
| Receivables: Trade debtors; Bills | --- | --- |
| Prepaid expenses | | --- |
| Minimum cash balance | | --- |
| **Gross Working Capital** | | **---** |
| **II. Current Liabilities:** | | |
| Trade payables; Bills payable | --- | |
| Wages payable; Payables for overheads | --- | --- |
| **III. Excess of current assets over current liabilities [I − II]** | | **---** |
| IV. Safety margin | | --- |
| **V. Net Working Capital [III + IV]** | | **---** |

::: formula Operating cycle method
$$\text{Working capital} = \frac{\text{Annual operating cost}}{\text{Number of operating cycles}}$$
Cash cost basis: annual operating cost less depreciation.
:::

::: formula Current assets
$$\text{Item} = \frac{\text{Annual cost base}}{12 \text{ months (or 365 days)}} \times \text{Holding period}$$
:::

| Item | Annual cost base (total cost basis) | Cash cost basis |
|---|---|---|
| Raw materials | Material consumed | Same |
| Work-in-progress | Material + share of conversion cost | Without depreciation |
| Finished goods | Cost of production | Cash cost of production |
| Debtors | Cost of sales or sales value | Cash cost of sales |
| Prepaid expenses | The expense paid in advance | Same |
| Trade payables | Credit purchases | Same |
| Wages, overheads payable | The expense paid in arrear | Same (no depreciation) |

::: formula Cash costs (Illustration 4, SM 9.30)
$$\text{Cash cost of production} = \text{Materials} + \text{Wages} \qquad + \text{Cash manufacturing expenses}$$
$$\text{Cash cost of sales} = \text{Cash cost of production} \qquad + \text{Administrative expenses} \qquad + \text{Selling expenses}$$
Adjust for opening and closing finished stock when they differ (TYK Problem 5, SM 9.139).
:::

::: formula Work-in-progress (material at the start, conversion accruing evenly)
$$\text{WIP} = \text{Material for the period in process} \qquad + \tfrac{1}{2} \times \text{Conversion cost for that period}$$
:::

## Worked examples

:::: example Kulhad Works: the operating cycle shortcut, from turnover ratios
Tapri Kulhad Works, which makes the clay cups for Tapri's cafés, gives you its turnover ratios for 2025-26:

| Turnover ratio | Times a year |
|---|---:|
| Raw material (on materials consumed) | 9 |
| Work-in-progress (on cost of production) | 24 |
| Finished goods (on cost of goods sold) | 18 |
| Debtors (on credit sales) | 8 |
| Creditors (on credit purchases) | 6 |

Its annual operating cost (cost of goods sold plus administration and selling expenses) is ₹57,60,000, including depreciation of ₹4,32,000. Assume a 360-day year.

**Required:**

(i) Calculate the net operating cycle and the number of operating cycles in the year.

(ii) Calculate the working capital requirement by the operating cycle method, on total cost and on cash cost basis.

(iii) Ritu has persuaded the clay suppliers to allow 75 days' credit. How much working capital does this release on each basis?

::: answer Show the working
**Working note: periods from turnover ratios.** A stock that turns over n times a year is held 360 ÷ n days (in months, 12 ÷ n: ICAI's collection period from the receivables turnover ratio, SM 9.80).

| Period | Working | Days |
|---|---|---:|
| Raw material (R) | 360 ÷ 9 | 40 |
| WIP (W) | 360 ÷ 24 | 15 |
| Finished goods (F) | 360 ÷ 18 | 20 |
| Debtors (D) | 360 ÷ 8 | 45 |
| Creditors (C) | 360 ÷ 6 | 60 |

**(i) Net operating cycle** = R + W + F + D − C = 40 + 15 + 20 + 45 − 60 = **60 days**. **Number of operating cycles** = 360 ÷ 60 = **6 times**.

**(ii) Working capital required**

$$\text{Total cost basis} = \frac{57{,}60{,}000}{6} = \text{₹}9{,}60{,}000 \qquad \text{Cash cost basis} = \frac{57{,}60{,}000 - 4{,}32{,}000}{6} = \text{₹}8{,}88{,}000$$

**(iii) Creditors at 75 days**: net operating cycle = 40 + 15 + 20 + 45 − 75 = 45 days; 360 ÷ 45 = 8 cycles.

| Basis | Before (₹) | After (₹) | Released (₹) |
|---|---:|---:|---:|
| Total cost (57,60,000 ÷ 6, ÷ 8) | 9,60,000 | 7,20,000 | 2,40,000 |
| Cash cost (53,28,000 ÷ 6, ÷ 8) | 8,88,000 | 6,66,000 | 2,22,000 |

Each extra day of suppliers' credit releases one day's operating cost: 15 days × (₹57,60,000 ÷ 360 = ₹16,000) = ₹2,40,000.
:::
::::

:::: example Dewas premix plant: the statement, week by week
The Dewas plant will produce 31,200 cartons of chai premix in 2026-27, evenly over 52 weeks. Estimated cost and price per carton:

| Particulars | ₹ per carton |
|---|---:|
| Raw materials | 480 |
| Direct wages | 120 |
| Overheads (no depreciation) | 240 |
| **Total cost** | **840** |
| Selling price | 1,000 |

Further information:

- Raw materials remain in stock for 4 weeks; suppliers allow 4 weeks' credit.
- Each carton is in process for 2 weeks: materials are issued at the start, wages and overheads accrue evenly.
- Finished cartons stay in the warehouse for 3 weeks; distributors are allowed 6 weeks' credit; all sales are on credit.
- Wages are paid 1 week in arrear and overheads 2 weeks in arrear.
- A cash balance of ₹1,00,000 is to be kept, and a safety margin of 10% added to net working capital.

**Required:**

(i) Prepare a statement of working capital requirement, taking debtors at cost.

(ii) Ritu proposes producing to order: finished cartons would stay 1 week instead of 3, but raw materials would need 7 weeks' stock instead of 4. Keeping creditors at 4 weeks of consumption, calculate the new requirement after the safety margin, and the change.

::: answer Show the working
**Working notes** (weekly production = 31,200 ÷ 52 = 600 cartons)

1. Raw material stock = 600 × ₹480 × 4 weeks = **₹11,52,000**.
2. WIP: 2 weeks in process = 1,200 cartons. Materials 1,200 × ₹480 = ₹5,76,000; wages 1,200 × ₹120 × ½ = ₹72,000; overheads 1,200 × ₹240 × ½ = ₹1,44,000; total **₹7,92,000**.
3. Finished goods = 600 × ₹840 × 3 weeks = **₹15,12,000**.
4. Debtors at cost = 600 × ₹840 × 6 weeks = **₹30,24,000**.
5. Creditors = 600 × ₹480 × 4 weeks = ₹11,52,000 (production is even, so purchases equal consumption). Wages payable = 600 × ₹120 × 1 week = ₹72,000. Overheads payable = 600 × ₹240 × 2 weeks = ₹2,88,000.

**(i) Statement of working capital requirement**

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **A. Current assets** | | |
| Raw materials (WN 1) | 11,52,000 | |
| Work-in-progress (WN 2) | 7,92,000 | |
| Finished goods (WN 3) | 15,12,000 | |
| Debtors at cost (WN 4) | 30,24,000 | |
| Cash | 1,00,000 | 65,80,000 |
| **B. Current liabilities** | | |
| Creditors for materials | 11,52,000 | |
| Wages payable | 72,000 | |
| Overheads payable | 2,88,000 | 15,12,000 |
| **Net working capital (A − B)** | | **50,68,000** |
| Add: Safety margin @ 10% | | 5,06,800 |
| **Working capital requirement** | | **55,74,800** |

**(ii) Producing to order**

| Item | Now (₹) | Producing to order (₹) |
|---|---:|---:|
| Raw materials (600 × ₹480 × 4; × 7) | 11,52,000 | 20,16,000 |
| Finished goods (600 × ₹840 × 3; × 1) | 15,12,000 | 5,04,000 |
| Other current assets (WIP, debtors, cash) | 39,16,000 | 39,16,000 |
| Less: current liabilities | 15,12,000 | 15,12,000 |
| Net working capital | 50,68,000 | 49,24,000 |
| Add: safety margin @ 10% | 5,06,800 | 4,92,400 |
| **Working capital requirement** | **55,74,800** | **54,16,400** |

The requirement falls by **₹1,58,400**: two weeks less of finished goods at ₹840 a carton (₹10,08,000) outweigh three weeks more of raw material at ₹480 (₹8,64,000), and the margin is 10% of the ₹1,44,000 difference.

Had the debtors been taken at selling price, they would be 600 × ₹1,000 × 6 = ₹36,00,000, which is ₹5,76,000 more: six weeks' profit (600 × ₹160 × 6), money the plant never spent. That is why the Study Material's formula takes debtors at cost (SM 9.23); when a question says which basis it wants, follow the question.
:::
::::

:::: example Samosa factory: cash cost basis, with cash sales and work-in-progress
Tapri's samosa factory projects the following for 2026-27:

| Particulars | ₹ |
|---|---:|
| Sales: 25% for cash at the factory outlet, the rest to distributors at 1½ months' credit | 1,20,00,000 |
| Materials consumed (suppliers allow one month's credit) | 45,00,000 |
| Wages (paid ½ month in arrear) | 18,00,000 |
| Manufacturing overheads, including depreciation of ₹6,00,000 (the cash part is paid one month in arrear) | 27,00,000 |
| Administrative expenses, including warehouse rent of ₹2,40,000 paid half-yearly in advance (the rest is paid one month in arrear) | 7,20,000 |
| Selling expenses (paid one month in arrear) | 3,60,000 |

Further information:

- Raw materials are held for one month; finished goods for half a month, valued at cash cost of production.
- Each pack is in process for half a month: materials are issued at the start, wages and overheads accrue evenly.
- A cash balance of ₹2,50,000 is to be kept, and a safety margin of 10% added.

**Required:** Prepare a statement of working capital requirement on cash cost basis, and state how much higher the debtors would be at sales value.

::: answer Show the working
**Working notes**

1. Cash manufacturing overheads = 27,00,000 − 6,00,000 = ₹21,00,000. **Cash cost of production** = 45,00,000 + 18,00,000 + 21,00,000 = **₹84,00,000**.
2. Work-in-progress (half a month in process): materials 45,00,000 × ½ ÷ 12 = ₹1,87,500; wages and cash overheads (18,00,000 + 21,00,000) × ½ ÷ 12 × ½ = ₹81,250; total **₹2,68,750**.
3. **Cash cost of sales** = 84,00,000 + 7,20,000 + 3,60,000 = **₹94,80,000**. Cash and credit sales carry the same price, so 75% of it belongs to the credit sales: ₹71,10,000. Debtors = 71,10,000 × 1.5/12 = **₹8,88,750**.
4. Rent paid half-yearly in advance: six months are prepaid, 2,40,000 × 6/12 = **₹1,20,000** (ICAI takes the whole advance period, as for the sales promotion paid quarterly in advance in Illustration 4, SM 9.29).
5. Administrative expenses outstanding exclude the rent: (7,20,000 − 2,40,000) × 1/12 = **₹40,000**.

**Statement of working capital requirement (cash cost basis)**

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **A. Current assets** | | |
| Raw materials (45,00,000 × 1/12) | 3,75,000 | |
| Work-in-progress (WN 2) | 2,68,750 | |
| Finished goods (84,00,000 × ½ ÷ 12) | 3,50,000 | |
| Debtors (WN 3) | 8,88,750 | |
| Prepaid rent (WN 4) | 1,20,000 | |
| Cash | 2,50,000 | 22,52,500 |
| **B. Current liabilities** | | |
| Creditors (45,00,000 × 1/12) | 3,75,000 | |
| Wages outstanding (18,00,000 × ½ ÷ 12) | 75,000 | |
| Manufacturing overheads outstanding (21,00,000 × 1/12) | 1,75,000 | |
| Administrative expenses outstanding (WN 5) | 40,000 | |
| Selling expenses outstanding (3,60,000 × 1/12) | 30,000 | 6,95,000 |
| **Net working capital (A − B)** | | **15,57,500** |
| Add: Safety margin @ 10% | | 1,55,750 |
| **Working capital requirement** | | **17,13,250** |

**At sales value**, debtors would be 90,00,000 × 1.5/12 = ₹11,25,000 against ₹8,88,750: ₹2,36,250 higher, the profit and depreciation inside the bills. The cash sales stay out of debtors on either basis.

Assumptions: all purchases are on credit and the raw material stock is constant, so purchases equal consumption; depreciation is left out of work-in-progress and finished goods as well as debtors.
:::
::::

::::: example Kulhad Works goes double shift
Tapri Kulhad Works makes 30,000 crates of kulhads a year in one shift and sells them at ₹24 a crate. Cost per crate:

| Per crate | ₹ |
|---|---:|
| Materials | 8.00 |
| Wages (of which ₹3.00 is fixed: supervisors' salaries) | 6.00 |
| Overheads (of which ₹4.50 is fixed) | 6.00 |
| **Total cost** | **20.00** |

Its working capital norms: raw materials, 2 months' consumption; work-in-progress, 1,500 crates in the kilns at any time, valued at materials plus wages; finished goods, 1 month's output; debtors, 2 months' sales, valued at total cost; creditors, 2 months' purchases; wages and overheads paid half a month in arrear.

To supply Tapri's new cafés, production and sales will double with a night shift: the kilns will never cool, and Ritu's spreadsheet will never close. Night-shift workers get 20% more than the variable day wage; fixed wages and fixed overheads stay the same in total, and so do material prices. Because the minimum stock does not double, Ritu expects the raw material stock to rise by only half, to 7,500 crates' worth; the other norms stay as they are.

**Required:** Prepare a comparative statement of working capital requirement and compute the additional working capital needed for double shift working.

:::: answer Show the working
**Working notes**

1. Fixed costs in total: wages ₹3.00 × 30,000 = ₹90,000; overheads ₹4.50 × 30,000 = ₹1,35,000.
2. Variable wage per crate: day ₹3.00, night ₹3.00 × 1.20 = ₹3.60; on double shift the average is ₹3.30.
3. Cost per crate:

| Element | Single shift (₹) | Double shift (₹) |
|---|---:|---:|
| Materials | 8.00 | 8.00 |
| Wages: variable | 3.00 | 3.30 |
| Wages: fixed (₹90,000) | 3.00 | 1.50 |
| Overheads: variable | 1.50 | 1.50 |
| Overheads: fixed (₹1,35,000) | 4.50 | 2.25 |
| **Total cost** | **20.00** | **16.55** |
| Materials + wages (for WIP) | 14.00 | 12.80 |

**4. Quantities.** Single shift (2,500 crates a month): raw materials 5,000; WIP 1,500; finished goods 2,500; debtors 5,000; creditors 5,000; wages and overheads payable 1,250. Double shift (5,000 a month): raw materials 7,500; WIP 1,500; finished goods 5,000; debtors 10,000; creditors 10,000; wages and overheads payable 2,500.

**Comparative statement of working capital requirement**

| Particulars | Single: crates × ₹ | ₹ | Double: crates × ₹ | ₹ |
|---|---:|---:|---:|---:|
| Raw materials | 5,000 × 8.00 | 40,000 | 7,500 × 8.00 | 60,000 |
| Work-in-progress | 1,500 × 14.00 | 21,000 | 1,500 × 12.80 | 19,200 |
| Finished goods | 2,500 × 20.00 | 50,000 | 5,000 × 16.55 | 82,750 |
| Debtors (at cost) | 5,000 × 20.00 | 1,00,000 | 10,000 × 16.55 | 1,65,500 |
| **Current assets (A)** | | **2,11,000** | | **3,27,450** |
| Creditors for materials | 5,000 × 8.00 | 40,000 | 10,000 × 8.00 | 80,000 |
| Wages payable | 1,250 × 6.00 | 7,500 | 2,500 × 4.80 | 12,000 |
| Overheads payable | 1,250 × 6.00 | 7,500 | 2,500 × 3.75 | 9,375 |
| **Current liabilities (B)** | | **55,000** | | **1,01,375** |
| **Working capital (A − B)** | | **1,56,000** | | **2,26,075** |

**Additional working capital** = ₹2,26,075 − ₹1,56,000 = **₹70,075**.

::: note Why the numbers move as they do
WIP stays at 1,500 crates because the night shift finishes what the day shift started (SM 9.31). Its value per crate falls from ₹14.00 to ₹12.80 although night workers are paid more, because the fixed wage is now spread over twice the crates. Creditors are taken at 2 months of consumption, the steady state of ICAI's first, policy approach to Illustration 5; in the first year of the night shift, purchases would also include the 2,500 crates added to stock (ICAI's second approach, SM 9.34–9.35). Production doubles; working capital rises by about 45%.
:::
::::
:::::

## Under the hood

### A newly formed company buys more than it uses

In a first year, closing stock has to be bought too: **purchases = materials consumed (including for closing WIP) + closing stock of raw materials − opening stock (nil)**, and creditors are based on purchases (TYK Problem 6, SM 9.142). In TYK Problem 4 the raw material in WIP is part of materials consumed, and the cash expenses paid in advance become prepaid current assets (SM 9.134–9.136).

### Items that hide in the question

- **Cash including an overdraft limit**: "₹2,50,000 available including the unutilised overdraft limit of ₹75,000" means a cash balance of ₹1,75,000 (TYK Problem 7, SM 9.143).
- **Income tax**: tax paid in advance instalments is a current asset; the instalment that falls in the next year is a current liability (TYK Problems 4 and 7, SM 9.135, 9.144).
- **Export sales at a different price**: work out the export gross profit separately before splitting the cost of sales (TYK Problem 7, SM 9.145).
- **Administrative expenses**: Illustration 4 puts them in the cash cost of sales, so they reach debtors but not finished goods (SM 9.30); TYK Problem 7 assumes they relate to production and includes them in the cost of goods sold, so they reach finished goods too (SM 9.144–9.145). Write the assumption you make.
- **Unequal opening and closing finished stock**: cost of goods sold = cost of production + opening − closing finished goods; finished goods at average cost of goods available (TYK Problem 5, SM 9.137).

### The second approach to double shift

ICAI also solves Illustration 5 "for next year only": units sold are production + opening − closing finished stock, and creditors are based on purchases including the build-up of raw material stock (54,000 units in ICAI's case), which gives a slightly different additional requirement (₹89,400 against ₹94,800 there). ICAI calls the first approach, a comparison within the same year as a matter of production policy, the more appropriate (SM 9.32–9.35).

### Total cost or cash cost: which to use

When the question says "cash cost basis", exclude profit and depreciation from debtors and finished goods. When it says "debtors at selling price" or gives nothing, ICAI's answers vary (TYK Problem 5 shows both statements, SM 9.137–9.139); state the basis in a working note and stay consistent.

## Exam angle

::: exam Where estimation appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, estimating working capital came up 12 times in 11 documents.

- **Operating cycle method, 3 to 5 marks**: September 2024 Q1(b) (periods from averages, then the amount); January 2025 Q2(b) (periods given; the suggested answer also shows a cash cost alternative excluding depreciation); MTP September 2025 Series I (with a 10% contingency); RTP May 2026 Q9.
- **Cash cost statements, 5 marks**: September 2026 Q1(c) (sales at 2 months' credit, sales promotion quarterly in advance, cash at 50% of current liabilities, 15% safety margin); MTP May 2024 Series II (15% margin, ignore WIP); RTP May 2025 (domestic and export sales at different prices).
- **As five-MCQ case scenarios, 2 marks each**: May 2025 MCQs 1–5 (a working capital loan proposal on cash cost basis: cash costs, finished goods and debtors, current assets, current liabilities, the requirement); RTP January 2026 MCQs (gross working capital, requirement, current and quick ratios); September 2025 MCQs 1–5 (back from the number of cycles).
- **Newly formed company applying to a bank, 6 marks**: MTP January 2025 Series II Q2(a) (WIP at prime cost, 90% material, 60% conversion).
- **One-liner**: January 2025 MCQ 8 (a 20% contingency on net working capital).
:::

::: exam The traps ICAI set
- "Safety margin 15% of the net working capital **inclusive of the margin amount**" (MTP January 2025 Series II): the requirement is (CA − CL) ÷ 0.85, not × 1.15.
- Cash "to the extent of 50% of current liabilities" (September 2026 Q1(c)): compute the liabilities first.
- Depreciation inside "cost of production" or "manufacturing overheads": take it out for the cash cost basis (May 2025 MCQs; RTP May 2025).
- The paper's instruction: "Working notes should form part of the answer." Every line of the statement needs its working.
:::

::: trick Months, weeks or days: divide by the same unit
Annual base ÷ 12 × months, ÷ 52 × weeks, or ÷ 360 (365) × days, whichever unit the question uses for the periods. Never mix: a "1½ months" credit with a 360-day year is 45 days ÷ 360, the same as 1.5 ÷ 12.
:::

## Answer frame

### "Discuss the estimation of working capital need based on the operating cycle process" (SM 9.115, Q3)

1. The operating cycle is one of the most reliable methods of computing working capital (the others: ratio of sales, ratio of fixed investments); it estimates working capital from the average holding period of current assets, related to costs.
2. Operating cycle = R + W + F + D − C, each component defined, with its formula (average balance ÷ daily cost or sales).
3. Number of operating cycles = 360 (365) ÷ operating cycle; working capital = annual operating cost ÷ number of cycles.
4. Item by item: raw materials, WIP, finished goods, debtors (at cash cost, excluding profit and depreciation), cash; less trade payables, wages and overheads payable.
5. Add a safety margin; the shorter the cycle, the lower the requirement.

### The numerical, three ways

::: cols
**Loses marks**

A statement with bare figures: "Debtors 8,88,750; Creditors 3,75,000…"

No base, no period: an examiner cannot give method marks to a wrong number.
---
**Passes**

Each line shows base × period ("94,80,000 × 1.5/12"), but the cash sales are left inside debtors and depreciation inside the finished goods.

Two of the traps cost the marks.
---
**Full marks**

Working notes first (cash cost of production, WIP, cash cost of sales and the credit sales' share, the prepaid rent), then ICAI's statement with every base and period visible, safety margin last, assumptions stated.
:::

## Common mistakes

::: mistake Hall of Shame: the overdraft that was counted as cash
TYK Problem 7's "₹2,50,000 available including the overdraft limit of ₹75,000 not yet utilised" written as cash ₹2,50,000. The overdraft is bank credit: it finances working capital, it is not part of it. **Fix:** cash = ₹1,75,000 (SM 9.143); and do not deduct bank borrowing as a current liability.
:::

::: mistake Profit smuggled into the debtors
In Worked example 3, writing debtors as 1½ months of all sales (₹15,00,000) instead of 1½ months of the cash cost of the credit sales (₹8,88,750): the profit, the depreciation and the cash sales all smuggled in. **Fix:** build the cash cost of sales working note first, take the credit sales' share, and the debtors come from it.
:::

::: mistake WIP charged with a full period of conversion
Taking WIP as 2 weeks of the full ₹840 cost (₹10,08,000) when wages and overheads accrue evenly. **Fix:** full material, half conversion: ₹7,92,000. Use the stated percentage when the question gives a degree of completion.
:::

::: mistake WIP doubled in double shift
Doubling the WIP units with production. **Fix:** the quantity in process is unchanged, because work started in the first shift is completed in the second (SM 9.31); only its value per unit changes (a lower fixed wage per unit, a higher night-shift wage, cheaper material if there is a discount).
:::

## Practice

::: quiz Check yourself
Q: Tapri's packaging unit has an annual operating cost of ₹45,00,000, and its working capital requirement by the operating cycle method is ₹9,00,000 (360-day year). What is its net operating cycle, in days?
= 72
> Number of operating cycles = annual operating cost ÷ working capital = ₹45,00,000 ÷ ₹9,00,000 = 5; net operating cycle = 360 ÷ 5 = 72 days. Check: one day's operating cost, ₹12,500, × 72 days = ₹9,00,000.

Q: Case scenario. Tapri's new tea-bag line makes 2,400 boxes a month evenly. Material of ₹50 a box is issued at the start of processing; labour and overheads of ₹30 a box accrue evenly over the one month each box spends in process. What is the work-in-progress to be included in the working capital statement?
- [ ] ₹1,92,000
- [x] ₹1,56,000
- [ ] ₹1,20,000
- [ ] ₹96,000
> One month in process = 2,400 boxes. Material in full: 2,400 × ₹50 = ₹1,20,000; conversion at half: 2,400 × ₹30 × ½ = ₹36,000; total ₹1,56,000. ₹1,92,000 charges full conversion; ₹1,20,000 forgets it; ₹96,000 halves everything.

Q: Annual cash cost of sales is ₹72,00,000 and annual sales ₹90,00,000. Customers get two months' credit. On cash cost basis, debtors in the working capital statement are:
- [ ] ₹15,00,000
- [x] ₹12,00,000
- [ ] ₹18,00,000
- [ ] ₹6,00,000
> Cash cost basis: ₹72,00,000 × 2/12 = ₹12,00,000. ₹15,00,000 is at sales value; ₹18,00,000 uses three months; ₹6,00,000 one month.

Q: A company's current assets are ₹60,00,000 and current liabilities ₹24,00,000. It wants a safety margin of 10% of the net working capital required, inclusive of the margin itself. What is the working capital requirement, in rupees?
= 4000000
> Excess of CA over CL = ₹36,00,000, which is 90% of the requirement: ₹36,00,000 ÷ 0.90 = ₹40,00,000. Adding 10% (₹39,60,000) answers a different question.

Q: Which of these is NOT deducted as a current liability when estimating the working capital requirement?
- [ ] Wages payable for the last half month
- [ ] Creditors for raw materials
- [x] The cash credit the company is applying for
- [ ] Manufacturing expenses paid one month in arrear
> Current liabilities other than bank credit are deducted (SM 9.23); the bank limit is what the estimate is meant to justify.
:::

## Recap

- Three methods: current assets holding period (operating cycle), ratio of sales, ratio of fixed investments (SM 9.16–9.17).
- Operating cycle method: working capital = annual operating cost ÷ number of operating cycles; cash basis: depreciation out first.
- Each item = annual base ÷ 12 (52, 360, 365) × period held; current liabilities other than bank credit are deducted.
- WIP with material at the start and conversion accruing evenly: full material + half conversion for the period in process.
- Cash cost basis: finished goods at cash cost of production, debtors at cash cost of sales (no profit, no depreciation).
- ICAI's statement: current assets (gross working capital) − current liabilities = excess; + safety margin = net working capital.
- Double shift: WIP units unchanged; other stocks rise, though not always in proportion; every item valued at the new cost per unit (lower fixed cost per unit).
- Overdraft limits are not cash; a margin "inclusive of itself" divides. (Count the platform, not the trains.)

## Flashcards

Q:: Three methods of estimating working capital needs (ICAI)?
A:: Current assets holding period (the operating cycle concept), ratio of sales, and ratio of fixed investments.

Q:: Formula: working capital by the operating cycle method?
A:: Annual operating cost ÷ number of operating cycles in the year (on cash cost basis, exclude depreciation from the operating cost).

Q:: Formula for estimated receivables in the working capital statement (SM 9.23)?
A:: Estimated credit sales (units) ÷ 12 months (365 days) × estimated cost of sales (excluding depreciation) per unit × average receivable collection period.

Q:: Why are debtors and finished goods taken at cash cost?
A:: Sales to debtors include cost and profit, and the funds required need not include profit; non-cash expenses like depreciation are also excluded. Only the funds actually blocked are financed.

Q:: Which current liabilities are deducted in the estimate?
A:: Current liabilities other than bank credit arising in the normal course of business: trade payables, wages payable, overheads payable.

Q:: Work-in-progress when raw materials are fed in at the start and labour and overheads accrue evenly?
A:: Full raw material for the period in process plus half of the labour and overheads for that period.

Q:: Cash cost of production and cash cost of sales (Illustration 4)?
A:: Cash cost of production = materials + wages + cash manufacturing expenses. Cash cost of sales = cash cost of production + administrative expenses + selling (sales promotion) expenses.

Q:: ICAI's statement of working capital, the order of the totals?
A:: I Current assets (gross working capital) − II Current liabilities = III Excess of current assets over current liabilities; + IV Safety margin = V Net working capital.

Q:: Effect of double shift working on work-in-progress?
A:: The amount of materials in process does not change, since work started in the first shift is completed in the second; WIP cost changes only if second-shift workers are paid more (or cost per unit changes).

Q:: Why may stocks not double when double shift doubles production?
A:: The minimum level of stocks may not be much higher, so the increase in stocks may not be proportionate to the rise in production.
