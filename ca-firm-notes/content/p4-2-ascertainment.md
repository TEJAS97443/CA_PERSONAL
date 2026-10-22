## Unit 2 — Ascertainment of Cost and Cost Accounting System

### Material cost: procurement, receipt, issue

Procurement runs requisition, **tender or quotation** above the value limit, purchase order, goods
received note, stores ledger, requisition on issue. **GeM**, the Government e-Marketplace, discovers
rates online and makes tendering auditable; **ERP costing** unifies purchase, stores, production and
costing so that material requirement analysis is continuous; **digital inventory control** fires
re-order triggers off tagged movements.

Material cost is purchase price plus non-recoverable taxes, freight inward, insurance in transit and
handling, less trade discount, rebates and refundable taxes; **cash discount is financial and
excluded**. Normal transit shortage is absorbed by the good units, raising the rate. **Issues** use
FIFO, LIFO, average or standard price — weighted average recomputes the rate on every receipt, never on
an issue.

```text
STORES LEDGER — Material M (Weighted Average)
Date  Particulars      Receipts                 Issues                  Balance
                    Qty   Rate       ₹      Qty   Rate       ₹      Qty   Rate       ₹
  1   Opening        —      —         —       —     —         —      500  20.00  10,000
  5   GRN 14        300  24.00     7,200      —     —         —      800  21.50  17,200
 12   Requisition     —     —         —     400  21.50     8,600     400  21.50   8,600
 20   GRN 19        600  25.00    15,000      —     —         —    1,000  23.60  23,600
 26   Requisition     —     —         —     700  23.60    16,520     300  23.60   7,080
                    ----          ------    ----          ------
                     900          22,200   1,100          25,120
```

Opening ₹10,000 plus receipts ₹22,200 equals issues ₹25,120 plus closing ₹7,080 (FIFO: ₹24,700 and
₹7,500). Stock taking is periodic or continuous; the **perpetual inventory system** is the live record.

### Inventory control

:::formula Economic Order Quantity
@formula: EOQ = sqrt( (2 x A x O) / C )
@terms: A = annual consumption in units. O = ordering cost per order. C = carrying cost per unit per
annum.
@watch: Convert carrying cost given as a percentage of unit price into rupees per unit a year first.
:::

:::formula Stock levels and safety stock
@formula: Re-order level = Maximum consumption x Maximum re-order period
Minimum level = Re-order level − (Normal consumption x Normal re-order period)
Maximum level = Re-order level + Re-order quantity − (Minimum consumption x Minimum re-order period)
@terms: **Safety stock** is the cushion against variation in consumption and in lead time.
@watch: Re-order level takes the *maximum* of both figures, minimum level the *normal* of both.
:::

:::estimate EOQ and the stock levels, with proof of the EOQ balance
@given: 90,000 units a year over 300 days; ordering cost ₹100 an order; price ₹20, carrying cost 10% a
year. Daily consumption normal 300, minimum 250, maximum 350; re-order period 8–12 days, normal 10.
@ask: Compute the EOQ and the re-order, minimum and maximum levels, and prove the EOQ.
@work: C = 10% of ₹20 = **₹2 per unit per annum**.

EOQ = sqrt( (2 x 90,000 x 100) / 2 ) = sqrt(90,00,000) = **3,000 units**, so **30 orders a year**.

Re-order level = 350 x 12 = **4,200**. Minimum = 4,200 − (300 x 10) = **1,200**. Maximum = 4,200 +
3,000 − (250 x 8) = **5,200 units**.
@sanity: Ordering 30 x 100 = ₹3,000 equals carrying 1,500 x ₹2 = ₹3,000 — **the definition of the
EOQ**.
:::

Techniques differ by basis: **ABC** by annual value of consumption, **FSN** by movement (which flags
obsolescence), **HML** by unit price, **VED** by criticality. **JIT** produces against demand only, so
carrying cost approaches zero. **Inventory turnover** is material consumed over average inventory.

:::think A ₹200 gasket is a C item on ABC analysis. Why might it still get the tightest control in the stores?
Because ABC classifies by annual value of consumption while **VED** classifies by criticality to
production. A cheap gasket whose absence halts the line is **vital**, so the control policy follows the
V, not the C. The techniques are complementary, not alternatives.
:::

### Waste, scrap, spoilage, defectives, obsolescence

| Item | Normal | Abnormal |
|---|---|---|
| Waste (no realisable value) | Absorbed by good output | Cost to Costing P&L |
| Scrap (small realisable value) | Credited to job, process or overhead | Realisation and cost to Costing P&L |
| Spoilage (unrectifiable) | Net cost after salvage to good output | Net cost to Costing P&L |
| Defectives (rectifiable) | Rework cost to job or overhead | Rework cost to Costing P&L |
| Obsolescence | — | Written off to Costing P&L |

:::key Every item here sorts into normal or abnormal, and the sort decides the ledger.
Normal loss, idle time and spoilage stay in product cost, raising cost per good unit; anything abnormal
leaves it for the **Costing Profit and Loss Account**.
:::

### Employee cost

Time keeping records presence, time booking what the time was spent on; the gap is idle time.
**Elements of wages** are basic pay, dearness allowance, overtime, bonus, holiday and leave wages,
allowances and perquisites, leave wages being recovered through an inflated hourly rate. Normal idle
time is absorbed in the wage rate or in factory overhead and abnormal idle time goes to Costing P&L;
the **overtime premium** goes to the job for customer urgency, to factory overhead where overtime is
general, to the department whose delay caused it, or to Costing P&L when abnormal.

:::formula Employee turnover rates
@formula: Separation rate = (Separations / Average employees) x 100
Replacement rate = (Replacements / Average employees) x 100
New recruitment rate = (New recruitments / Average employees) x 100
Flux rate = ((Separations + Accessions) / Average employees) x 100
@terms: Accessions = replacements + new recruitments; average employees = (opening + closing) / 2.
@watch: Expansion is not turnover, so keep replacements and new recruitments apart; some editions define
flux on separations plus replacements only. On 1,800 at the start and 2,200 at the close, with 90
separations, 60 replacements and 430 new recruitments: average 2,000, so 4.5%, 3%, 21.5%, flux **29%**.
:::

**Causes** are avoidable (pay, supervision, conditions) and unavoidable (retirement, death, illness,
dismissal); **effects** are costed as preventive and replacement cost — recruitment, training, low
output while learning. **Employee cost control** works through standard times, incentives tied to
output, and watching idle time, overtime and turnover.

:::formula Halsey and Rowan premium bonus
@formula: Halsey wages = (Time taken x Rate) + (50% x Time saved x Rate)
Rowan wages = (Time taken x Rate) + ((Time saved / Standard time) x Time taken x Rate)
@terms: Time saved = standard time allowed − time taken; Halsey's share is 50% unless stated.
@watch: Rowan's bonus is a proportion of *wages earned*, not of time saved. On standard time 40 hours,
taken 30, rate ₹50: Halsey pays 1,500 + 250 = **₹1,750**, Rowan 1,500 + 375 = **₹1,875**. Rowan pays
more while time saved is under half the standard time and Halsey more beyond it; at exactly half — 20
hours taken of 40 — the plans coincide, each paying ₹1,000 of wages plus ₹500 of bonus.
:::

### Direct expenses

Direct or **chargeable expenses** are wholly attributable to one job, product, service or process — a
royalty per unit, a tool hired for one job. They form the third line of prime cost; anything shared on
a basis is an overhead.

### Overheads

Overheads are the three indirect elements, classified **functionally** (factory, administration,
selling, distribution, research and development) and **behaviourally** (fixed, variable,
semi-variable). **Allocation** charges a whole item to the centre where it arose, **apportionment**
splits a common item on an equitable basis (floor area, capital value, headcount, kilowatt-hours),
**absorption** charges a centre's total onto its cost units.

**Primary distribution** spreads factory overhead over all departments, service ones included;
**secondary distribution** clears the service departments onto production, by the direct method, the
step ladder where servicing runs one way, or — for reciprocal services — repeated distribution or
simultaneous equations (S1 = 4,500 + 0.10 S2 with S2 = 4,000 + 0.20 S1 gives ₹5,000 each).

**Absorption rates** are a percentage of direct wages or prime cost, a rate per unit, a labour hour
rate, or a **machine hour rate** where work is machine-paced. Predetermined, they leave overhead
**under- or over-absorbed**, cleared by a supplementary rate, by carry forward where seasonal, or to
Costing P&L. **Administration overheads** are apportioned between production and selling, absorbed
into production cost, or charged wholly to Costing P&L.

> **Verify:** which treatment of administration overheads your attempt's Study Material treats as the
> standard, against the current Study Guidelines.

**Selling and distribution overheads** are absorbed on sales value, units sold or weight, and marketing
strategy moves them directly: the **cost effectiveness of a promotion method** is judged on incremental
contribution against incremental cost. **R&D cost** follows purpose: existing product to its production overhead, new-product
development charged when production begins, an abandoned project to Costing P&L.

### Activity Based Costing

Overhead is traced to **activities** — set-ups, purchase orders, inspections, handling — each with the
**cost driver** that causes its cost, and charged to products on the drivers each consumes, from unit
level up to facility level. ABC pays where overheads are large and products differ in complexity, since
one labour-hour rate cross-subsidises them.

### Integration of cost and financial data

Financial data is recorded once, then segregated by element and function. A **non-integrated system**
keeps a separate self-balancing cost ledger through a **General Ledger Adjustment Account**, with
control accounts for stores, work-in-progress, finished goods, wages and overhead; two sets of books
mean two profits, so reconciliation is required. An **integrated system** keeps one set, so there is
**no reconciliation to do**.

| Group | Examples | Appears in |
|---|---|---|
| Financial charges and appropriations | Loss on sale of an asset, goodwill written off, interest, income tax, dividend | Financial books only |
| Financial income | Interest, dividend, rent received, profit on sale of an asset | Financial books only |
| Notional charges | Notional rent, notional interest on capital | Cost books only |

Add **under- or over-absorption of overheads** and different stock valuation.

:::estimate Reconcile profit as per cost accounts with profit as per financial accounts
@given: Cost profit ₹1,50,000; factory overheads under-absorbed ₹12,000; administration overheads
over-absorbed ₹5,000; interest received ₹8,000; dividend ₹4,000; loss on sale of machinery ₹10,000;
goodwill written off ₹15,000; notional rent in cost accounts ₹6,000; closing stock ₹22,000 (cost)
against ₹25,000 (financial); opening stock ₹18,000 against ₹15,000.
@ask: Prepare the reconciliation statement and find profit as per financial accounts.
@work: The marks are in the layout.

```text
RECONCILIATION STATEMENT for the period ended ...            ₹            ₹
Profit as per Cost Accounts                                            1,50,000
  Add:  Administration overheads over-absorbed          5,000
        Interest received                               8,000
        Dividend received                               4,000
        Notional rent charged in cost accounts only     6,000
        Closing stock undervalued in cost accounts      3,000
        Opening stock overvalued in cost accounts       3,000
                                                      ------            29,000
                                                                       1,79,000
  Less: Factory overheads under-absorbed               12,000
        Loss on sale of machinery                      10,000
        Goodwill written off                           15,000
                                                      ------            37,000
Profit as per Financial Accounts                                       1,42,000
```

1,50,000 + 29,000 − 37,000 = **₹1,42,000**.
@sanity: Under-absorption means cost accounts charged less overhead than was incurred, so cost profit is
the higher figure and the item is **deducted**; over-absorption is the mirror.
:::

:::attempt Starting from cost profit, say whether each is added or deducted: notional interest on capital; overheads over-absorbed; income tax paid; profit on sale of investments; closing stock overvalued in cost accounts.
**Anything that reduced cost profit but not financial profit is added back; anything that reduced
financial profit but not cost profit is deducted.**

- Notional interest on capital — cost books only. **Add.**
- Overheads over-absorbed. **Add.**
- Income tax paid, an appropriation. **Deduct.**
- Profit on sale of investments. **Add.**
- Closing stock overvalued in cost accounts, so cost profit is overstated. **Deduct.**

Travelling the other way reverses every sign, so state your direction.
:::

:::trap Absorbing abnormal cost into the cost unit
Abnormal idle time, wastage, process loss, an overtime premium caused by a department's own delay and
under-absorption from an abnormal cause all leave product cost for the Costing P&L. Candidates lose it
by never asking the question of an item like "idle time ₹8,000".
:::
