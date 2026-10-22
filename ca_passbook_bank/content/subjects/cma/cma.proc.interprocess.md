---
id: cma.proc.interprocess
title: Inter-process profit and operation costing
minutes: 32
needs: cma.proc.accounts
tags: inter-process profit, transfer price, unrealised profit, stock at prime cost, profit element, operation costing, hybrid costing
labs:
summary: Why processes may transfer output at a profit, how the cost and profit columns keep unrealised profit out of stock, and what operation costing (hybrid costing) is.
---

## In plain words

### Every process wants a trophy

Kesar has turned Tapri's Roasting and Blending processes into profit centres. Roasting now "sells" its roasted leaves to Blending at a mark-up, and Blending "sells" the premix to the finished-goods godown at another.

> **Kesar:** Roasting made ₹1,20,000 this month, Blending ₹1,80,000. Bonus for everyone!
> **Ritu:** On paper. Roasting sold to Blending, and Blending is us. Whatever premix is still sitting in the godown, nobody outside has paid for.
> **Dev:** So the profit inside that stock has a present value of exactly zero. Finally, something I don't need to discount.

When a process passes its output on at a **transfer price** (cost plus a profit) instead of at cost, the difference is **inter-process profit**. It lets each process show how it performs on its own. But the business earns a profit only when goods are sold to an outsider. Profit locked inside the closing stocks of the processes and of finished goods is **unrealised**, so the accounts carry a separate profit column to keep it apart from cost.

**Operation costing** is the other half of this lesson. Tapri's kulhad unit makes Plain kulhads for its cafés and glazed Royal kulhads for the Diwali gift box. Both go through the same moulding and firing; only the clay and glaze differ. So materials are collected batch by batch, as in job costing, while the moulding and firing costs are collected by operation, as in process costing: a **hybrid**.

::: analogy The car you sold to your brother
You buy a car for ₹4 lakh and sell it to your brother for ₹5 lakh. You show a profit of ₹1 lakh; the family is not one rupee richer. Only when your brother sells it to a stranger for ₹6 lakh does the family gain ₹2 lakh, and if the car is still in his garage, your ₹1 lakh is still "in the stock".
:::

::: key
A transfer at a profit shows each process's profit, but profit is earned only on sale outside the business. The inter-process profit that sits in closing stocks is unrealised; the profit column keeps it out of the cost of stock.
:::

## How it works

### What ICAI means by inter-process profit

To control cost and to measure performance, different processes may be designated as separate profit centres. "The output of one process is transferred to the next process not at cost but at market value or cost plus a percentage of profit. The difference between cost and the transfer price is known as inter-process profits." (SM 10.23)

ICAI's advantages and disadvantages, in ICAI's order (SM 10.23–10.24):

| Advantages | Disadvantages |
|---|---|
| 1. Comparison between the cost of output and its market price at the stage of completion is facilitated. | 1. The use of inter-process profits involves complication. |
| 2. Each process is made to stand by itself as to the profitability. | 2. The system shows profits which are not realised because of stock not sold out. |

### From a profit percentage to a transfer price

Read whether the profit is a percentage of the **transfer price** or of **cost**:

- "25% profit on the transfer price": transfer price = cost ÷ 75%, so ₹3,60,000 becomes ₹4,80,000 and the profit is ₹1,20,000.
- "Cost plus 25%" (25% on cost): transfer price = cost × 125%, so ₹3,60,000 becomes ₹4,50,000.

The same profit can be written both ways: 20% of the transfer price is 25% of cost, 25% of the transfer price is 33⅓% of cost, and one-third of cost is one-quarter of the transfer price.

### No stocks: every rupee of profit is realised

Roasting's cost is ₹3,60,000 and it transfers at 25% profit on the transfer price: ₹4,80,000. Blending adds ₹2,40,000 of its own cost (total ₹7,20,000) and transfers at 20% profit on the transfer price: ₹9,00,000. The premix sells for ₹11,00,000.

::: diagram What each transfer price is made of
{"type": "plot", "h": 300, "x": [0.4, 3.6], "y": [0, 1100000], "legend": "none",
 "xlabel": "transfer or sale", "ylabel": "amount (₹)",
 "xticks": [[1, "to Blending"], [2, "to stock"], [3, "sale"]],
 "yticks": [[0, "0"], [360000, "3,60,000"], [480000, "4,80,000"], [720000, "7,20,000"], [900000, "9,00,000"], [1100000, "11,00,000"]],
 "regions": [
  {"pts": [[0.65, 0], [1.35, 0], [1.35, 360000], [0.65, 360000]], "color": "a", "label": "cost"},
  {"pts": [[0.65, 360000], [1.35, 360000], [1.35, 480000], [0.65, 480000]], "color": "c", "hatch": true, "label": "profit"},
  {"pts": [[1.65, 0], [2.35, 0], [2.35, 360000], [1.65, 360000]], "color": "a"},
  {"pts": [[1.65, 360000], [2.35, 360000], [2.35, 480000], [1.65, 480000]], "color": "c", "hatch": true},
  {"pts": [[1.65, 480000], [2.35, 480000], [2.35, 720000], [1.65, 720000]], "color": "b", "label": "cost"},
  {"pts": [[1.65, 720000], [2.35, 720000], [2.35, 900000], [1.65, 900000]], "color": "d", "hatch": true, "label": "profit"},
  {"pts": [[2.65, 0], [3.35, 0], [3.35, 360000], [2.65, 360000]], "color": "a"},
  {"pts": [[2.65, 360000], [3.35, 360000], [3.35, 480000], [2.65, 480000]], "color": "c", "hatch": true},
  {"pts": [[2.65, 480000], [3.35, 480000], [3.35, 720000], [2.65, 720000]], "color": "b"},
  {"pts": [[2.65, 720000], [3.35, 720000], [3.35, 900000], [2.65, 900000]], "color": "d", "hatch": true},
  {"pts": [[2.65, 900000], [3.35, 900000], [3.35, 1100000], [2.65, 1100000]], "color": "g", "hatch": true, "label": "profit"}
 ],
 "caption": "Blue: Roasting's cost; teal: Blending's cost; hatched: profit (amber Roasting's, orange Blending's, green the profit on sale). Of the ₹9,00,000 at which finished stock receives the premix, ₹3,00,000 is the two processes' own profit."}
:::

The three profits, ₹1,20,000 + ₹1,80,000 + ₹2,00,000 = ₹5,00,000, equal sales less the real cost (₹11,00,000 − ₹3,60,000 − ₹2,40,000). This month nothing was left in stock anywhere, so all of it is realised.

### With stocks: three columns, five steps

Every process account and the finished stock account get three columns on each side: **Total**, **Cost** and **Profit** (SM 10.24–10.26, Illustration 6).

::: steps
1. **Debit** the opening stock (its cost and, separately, the inter-process profit the question says it contains), the transfer from the previous process (its cost and profit columns come from that process's credit side), direct materials, direct wages and any direct expenses. Subtotal: **prime cost**, in all three columns.
2. **Closing stock** valued at prime cost (the instruction in Illustration 6 and in every ICAI question with stocks read for this lesson) carries the same share of profit as the prime cost: cost element = closing stock × prime cost (cost column) ÷ prime cost (total column).
3. **Add overheads** to reach total cost. In the Total column, total cost less closing stock is what the output transferred carries; gross it up to the transfer price.
4. **Profit** = transfer price − (total cost − closing stock), both in the Total column. It is debited in the process account (Total and Profit columns) and credited to the costing P&L.
5. **Finished stock** valued at the price at which it is received from the last process: its cost element = closing stock × cost of the transfer ÷ transfer price (SM 10.26). The sales line then shows, in its cost column, the true cost of goods sold, and in its profit column, the **total profit realised**.
:::

The arithmetic of those accounts gives one check (it follows from ICAI's Illustration 6, SM 10.24–10.26, where ₹52,250 + ₹9,750 − ₹4,425 = ₹57,575):

$$\text{Realised profit} = \text{Profits shown} \qquad + \text{Profit in opening stocks} \qquad - \text{Profit in closing stocks}$$

### Operation costing

ICAI's paragraph 8 (SM 10.26): this product costing system is used when an entity produces more than one variant of the final product using different materials but with similar conversion activities. It is also known as a **hybrid product costing system**, because material costs are accumulated by job order or batch, while conversion costs (labour and overheads) are accumulated by department and assigned to products by process costing methods. Conversion costs are applied using a predetermined rate based on budgeted conversion costs. ICAI's examples: ready-made garments, shoe making, jewellery. The chapter summary adds that operation costing is a refinement of process costing, concerned with the cost of each operation rather than of the process (SM 10.27).

::: diagram Operation costing: two routes into one batch cost
{"type": "nest", "w": 330,
 "root": {"title": "Cost of a batch", "mono": false, "color": "mute", "dir": "v", "children": [
  {"title": "Materials", "note": "by batch", "mono": false, "color": "a", "lines": ["requisitioned for each batch,", "as in job costing"]},
  {"title": "Conversion", "note": "by operation", "mono": false, "color": "b", "lines": ["collected by department, applied", "at a predetermined rate"]}]},
 "caption": "Blue: the materials route, which differs for every variant. Teal: the conversion route, the same operations for every variant. Their sum is the batch cost; divided by the units, the cost per unit."}
:::

## Formats and formulas

### Process account showing the profit element

Write it as ICAI does, with Total, Cost and Profit on both sides, debit on the left and credit on the right. Four columns of lakh amounts do not fit side by side on a screen, so here the credit side sits below the debit side. *Reproduce it from memory.*

**Process II Account** (debit side)

| Dr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Opening stock | xxx | xxx | xxx |
| Transferred from Process I | xxx | xxx | xxx |
| Direct materials | xxx | xxx | – |
| Direct wages | xxx | xxx | – |
| Direct expenses, if any | xxx | xxx | – |
| **Prime cost** | **xxx** | **xxx** | **xxx** |
| Overheads | xxx | xxx | – |
| **Total cost** | **xxx** | **xxx** | **xxx** |
| Profit (to costing P&L) | xxx | – | xxx |
| **Total** | **xxx** | **xxx** | **xxx** |

**Process II Account** (credit side)

| Cr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Finished stock A/c (transfer) | xxx | xxx | xxx |
| Closing stock | xxx | xxx | xxx |
| **Total** | **xxx** | **xxx** | **xxx** |

**Finished Stock Account**: debit opening stock, the transfer from the last process and the profit (balancing figure, total and profit columns); credit the costing P&L A/c with sales and the closing stock, each split into cost and profit.

::: formula Transfer price
Profit as a fraction p of the transfer price:

$$\text{TP} = \frac{\text{Cost transferred}}{1 - p}$$

Profit as a fraction q of cost:

$$\text{TP} = \text{Cost transferred} \times (1 + q)$$

Cost transferred = total cost − closing stock.
:::

::: formula Converting a profit percentage
$$p \text{ on TP} = \frac{p}{1 - p} \text{ on cost} \qquad q \text{ on cost} = \frac{q}{1 + q} \text{ on TP}$$
20% on TP = 25% on cost; 1/3 on cost = 1/4 on TP.
:::

::: formula Cost element of closing stock in a process (stock at prime cost)
$$\text{Cost of closing stock} \qquad = \text{Closing stock} \times \frac{\text{Prime cost (cost)}}{\text{Prime cost (total)}}$$
The cost and total columns of prime cost in the process account (SM 10.25).
:::

::: formula Cost element of closing finished stock
$$\text{Cost of closing stock} \qquad = \text{Closing stock} \times \frac{\text{Cost of the transfer}}{\text{Transfer price}}$$
When the question values finished stock at the price received from the last process (SM 10.26).
:::

::: definition Inter-process profits
The output of one process is transferred to the next process not at cost but at market value or cost plus a percentage of profit; the difference between cost and the transfer price is known as inter-process profits. (SM 10.23)
:::

::: definition Operation costing
A product costing system used when an entity produces more than one variant of the final product using different materials but with similar conversion activities; also known as a hybrid product costing system. (SM 10.26)
:::

## Worked examples

:::: example Roasting, Blending and a godown full of profit
Tapri's chai premix passes through Roasting (Process I) and Blending (Process II) before it reaches finished stock. For December:

| Particulars | Process I (₹) | Process II (₹) | Finished (₹) |
|---|---:|---:|---:|
| Opening stock | 60,000 | 80,000 | 1,50,000 |
| Direct materials | 2,40,000 | 1,00,000 | – |
| Direct wages | 1,20,000 | 70,000 | – |
| Factory overheads | 90,000 | 42,500 | – |
| Closing stock | 30,000 | 44,500 | 1,11,000 |
| Profit in opening stock | – | 12,000 | 45,000 |

Output of Process I is transferred to Process II at 25% profit on the transfer price, and output of Process II to finished stock at 20% profit on the transfer price. "Profit in opening stock" is the inter-process profit it includes. Stock in processes is valued at prime cost. Finished stock is valued at the price at which it is received from Process II. Sales for the month were ₹12,00,000.

**Required:**

(i) Prepare the Process I, Process II and Finished Stock Accounts showing the profit element at each stage.

(ii) Calculate the profit actually realised in December and reconcile it with the profits shown in the three accounts.

::: answer Show the working
**Working notes**

1. Process I: transfer price = (₹5,10,000 − ₹30,000) ÷ 75% = ₹6,40,000; profit = ₹6,40,000 × 25% = ₹1,60,000.
2. Process II closing stock: cost = ₹44,500 × ₹7,18,000 ÷ ₹8,90,000 = ₹35,900; profit ₹8,600.
3. Process II: transfer price = (₹9,32,500 − ₹44,500) ÷ 80% = ₹11,10,000; profit = ₹11,10,000 × 20% = ₹2,22,000.
4. Finished stock closing: cost = ₹1,11,000 × ₹7,24,600 ÷ ₹11,10,000 = ₹72,460; profit ₹38,540.

**Process I Account** (debit side)

| Dr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Opening stock | 60,000 | 60,000 | – |
| Direct materials | 2,40,000 | 2,40,000 | – |
| Direct wages | 1,20,000 | 1,20,000 | – |
| **Prime cost** | **4,20,000** | **4,20,000** | **–** |
| Factory overheads | 90,000 | 90,000 | – |
| **Total cost** | **5,10,000** | **5,10,000** | **–** |
| Profit (WN 1) | 1,60,000 | – | 1,60,000 |
| **Total** | **6,70,000** | **5,10,000** | **1,60,000** |

**Process I Account** (credit side)

| Cr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Process II A/c (WN 1) | 6,40,000 | 4,80,000 | 1,60,000 |
| Closing stock | 30,000 | 30,000 | – |
| **Total** | **6,70,000** | **5,10,000** | **1,60,000** |

**Process II Account** (debit side)

| Dr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Opening stock | 80,000 | 68,000 | 12,000 |
| Process I A/c | 6,40,000 | 4,80,000 | 1,60,000 |
| Direct materials | 1,00,000 | 1,00,000 | – |
| Direct wages | 70,000 | 70,000 | – |
| **Prime cost** | **8,90,000** | **7,18,000** | **1,72,000** |
| Factory overheads | 42,500 | 42,500 | – |
| **Total cost** | **9,32,500** | **7,60,500** | **1,72,000** |
| Profit (WN 3) | 2,22,000 | – | 2,22,000 |
| **Total** | **11,54,500** | **7,60,500** | **3,94,000** |

**Process II Account** (credit side)

| Cr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Finished stock A/c (WN 3) | 11,10,000 | 7,24,600 | 3,85,400 |
| Closing stock (WN 2) | 44,500 | 35,900 | 8,600 |
| **Total** | **11,54,500** | **7,60,500** | **3,94,000** |

The transfer's cost column is the balance of the cost column (₹7,60,500 − ₹35,900), and its profit column the balance of the profit column.

**Finished Stock Account** (debit side)

| Dr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Opening stock | 1,50,000 | 1,05,000 | 45,000 |
| Process II A/c | 11,10,000 | 7,24,600 | 3,85,400 |
| Profit (balancing figure) | 51,000 | – | 51,000 |
| **Total** | **13,11,000** | **8,29,600** | **4,81,400** |

**Finished Stock Account** (credit side)

| Cr. Particulars | Total (₹) | Cost (₹) | Profit (₹) |
|---|---:|---:|---:|
| Costing P&L A/c (sales) | 12,00,000 | 7,57,140 | 4,42,860 |
| Closing stock (WN 4) | 1,11,000 | 72,460 | 38,540 |
| **Total** | **13,11,000** | **8,29,600** | **4,81,400** |

**(ii) Profit realised and reconciliation**

Realised profit = sales − actual cost of goods sold = ₹12,00,000 − ₹7,57,140 = **₹4,42,860**, the profit column of the sales line.

| Particulars | Amount (₹) |
|---|---:|
| Profits shown: Process I ₹1,60,000 + Process II ₹2,22,000 + Finished stock ₹51,000 | 4,33,000 |
| Add: Inter-process profit in opening stocks, now realised (₹12,000 + ₹45,000) | 57,000 |
| Less: Inter-process profit in closing stocks, unrealised (₹8,600 + ₹38,540) | (47,140) |
| **Profit realised** | **4,42,860** |

Of the ₹4,33,000 of profits shown, ₹47,140 is still locked inside the closing stocks, whose true cost is ₹30,000, ₹35,900 and ₹72,460.
:::
::::

:::: example Plain and Royal kulhads on one line
Tapri's kulhad unit makes two variants on the same line. Plain kulhads (for its cafés) use ordinary clay; Royal kulhads (glazed, for the Diwali gift box) use fine clay and glaze. Both pass through the same two operations, Moulding and Firing, whose costs are applied per cup at predetermined rates.

- Budget for November: Moulding conversion cost ₹1,80,000 and Firing ₹2,40,000, each for 60,000 cups.
- Two of November's batches: P-11, 10,000 Plain kulhads, materials ₹20,000; R-04, 4,000 Royal kulhads, materials ₹26,000.
- Actual for November, all batches together: 62,000 cups passed through both operations; Moulding cost ₹1,92,200 and Firing ₹2,38,000.

**Required:**

(i) Calculate the predetermined conversion rate per cup for each operation.

(ii) Calculate the cost of each batch and the cost per kulhad of each variant.

(iii) Calculate the conversion cost under- or over-applied in each operation for November.

(iv) State why this is operation costing and not pure process costing.

::: answer Show the working
**(i) Predetermined rates**: Moulding ₹1,80,000 ÷ 60,000 = **₹3** a cup; Firing ₹2,40,000 ÷ 60,000 = **₹4** a cup; conversion ₹7 a cup.

**(ii) Batch costs**

| Particulars | P-11 Plain (₹) | R-04 Royal (₹) |
|---|---:|---:|
| Materials (by batch) | 20,000 | 26,000 |
| Moulding (10,000 and 4,000 × ₹3) | 30,000 | 12,000 |
| Firing (10,000 and 4,000 × ₹4) | 40,000 | 16,000 |
| **Cost of batch** | **90,000** | **54,000** |
| **Cost per kulhad** | **9.00** | **13.50** |

**(iii) Conversion cost applied and actual**

| Operation | Applied (₹) | Actual (₹) | Difference (₹) |
|---|---:|---:|---:|
| Moulding (62,000 × ₹3) | 1,86,000 | 1,92,200 | 6,200 under-applied |
| Firing (62,000 × ₹4) | 2,48,000 | 2,38,000 | 10,000 over-applied |

They are dealt with like under- or over-absorbed overheads: [[cma.oh.underover|under- and over-absorption]].

**(iv)** The two variants use different materials but similar conversion activities. Materials are accumulated batch-wise, as in job or batch costing; conversion costs are accumulated by operation (department) and applied at a predetermined rate based on budgeted conversion cost, as in process costing. That combination is ICAI's hybrid product costing system, operation costing (SM 10.26).
:::
::::

## Under the hood

### Why the closing stock of Process II holds profit

Process I's output arrives at its transfer price, so Process II's prime cost already contains Process I's profit (and the profit in its opening stock). A closing stock valued at prime cost therefore contains the same proportion of profit, which is why ICAI splits it in the ratio of the cost and total columns of prime cost (SM 10.25). Process I's own closing stock holds no inter-process profit at all.

### "As per instruction given in the question"

ICAI marks its finished stock valuation with exactly this note (SM 10.26). The question decides the basis: processes at prime cost, at total cost, or at cost to the process; finished stock at the transfer price received. Follow it, then split cost from profit in the same proportion as the transfers.

### Prime cost can include direct expenses

In May 2026's case scenario the processes had direct materials, direct wages and direct expenses. The answer key's prime cost for Casing & Shaping (₹55,00,000, MCQ 2 = opening stock + transfer + all three) and the profit in its closing stock (₹90,000, MCQ 3) come out only with direct expenses inside prime cost; without them the prime cost would be ₹51,20,000, which is not among the options. (Core Manufacturing's profit, ₹7,50,000 in MCQ 1, does not depend on it: direct expenses sit in its total cost either way, and its closing stock is given in rupees.) Direct expenses are part of prime cost; overheads are not ([[cma.sheet.mfg|the cost sheet]]).

### Next door

Transfers at cost, with losses, are in [[cma.proc.accounts|process accounts and losses]]; batch-wise accumulation of materials is the method of [[cma.unit.batch|batch costing]]; the conversion rate is a predetermined overhead rate ([[cma.oh.absorb|absorption rates]]).

## Exam angle

::: exam Where inter-process profit and operation costing appeared in the documents read
- **Case scenario, 5 MCQs of 2 marks**: May 2026 Case Scenario I (profit of the first process, prime cost including inter-process profit, profit in closing stock, transfer price, total profit realised); RTP January 2025 Q2 (transfer prices of three processes at cost plus 25% and 33⅓%, cost value of a transfer and of closing stock).
- **Descriptive**: three-column accounts with stocks, MTP Series I for September 2025 Q2 (14 marks); process accounts and total profit with no stocks, MTP Series II for January 2025 Q3(a) (6 marks) and MTP Series II for May 2024 Q1(a) (5 marks).
- **Theory, 5 marks**: "What is inter-process profit? State its advantages and disadvantages", MTP Series I for May 2022 (old scheme) Q6(e); "Describe operation costing with two examples of industries", RTP November 2020 (old scheme) Q15(d). Both are also the chapter's own theory questions (SM 10.31).
:::

::: exam The traps
- **Which base?** "30% profit on the transfer price" (May 2026) means TP = cost ÷ 70%; "1/3rd of cost" (MTP September 2025) means TP = cost × 4/3, which is 1/4 of the TP.
- **"Total profit"** with no stocks (MTP January 2025): the sum of the process profits and the profit on sale, which equals sales less the actual costs.
- **"Total profit realised"** with stocks (May 2026 MCQ 5): the profit column of the sales line, not the sum of the profits shown.
:::

::: trick Percentages on cost and on transfer price
p% on the transfer price is p ÷ (100 − p) on cost; q% on cost is q ÷ (100 + q) on the transfer price. So 20% ↔ 25%, 25% ↔ 33⅓%, 30% ↔ 42.86%. Holds for any percentage, because transfer price = cost + profit.
:::

## Answer frame

### "What is inter-process profit? State its advantages and disadvantages."

ICAI's suggested answer (MTP May 2022 Q6(e), old scheme) is the Study Material's paragraph 7, nearly word for word:

1. **Context**: to control cost and to measure performance, processes are designated as separate profit centres.
2. **Definition**: the output of one process is transferred to the next not at cost but at market value or cost plus a percentage of profit; ==the difference between cost and the transfer price is known as inter-process profits==.
3. **Advantages**: comparison between the cost of output and its market price at the stage of completion is facilitated; each process is made to stand by itself as to the profitability.
4. **Disadvantages**: the use of inter-process profits involves complication; the system shows profits which are not realised because of stock not sold out.

### "Operation costing is defined as refinement of process costing. Explain it."

The chapter's own theory question (SM 10.31); ICAI's answers point to paragraph 8, and RTP November 2020's suggested answer reproduces it with two industries:

1. Used when an entity produces more than one variant of the final product using different materials but similar conversion activities.
2. Also known as a hybrid product costing system: material costs accumulated by job order or batch; conversion costs (labour and overheads) accumulated by department and assigned by process costing methods.
3. Conversion costs applied at a predetermined rate based on budgeted conversion costs.
4. Example: Deluxe and Regular grades of one product, with different raw materials but the same conversion activities.
5. Industries: ready-made garments, shoe making, jewellery. The refinement: it determines the cost of each operation rather than of the whole process (SM 10.27).

## Common mistakes

::: mistake Hall of Shame: 25% on the transfer price added to cost
Taking Roasting's transfer price as ₹3,60,000 × 125% = ₹4,50,000 when the question says 25% profit on the transfer price. **Fix:** profit on transfer price means TP = cost ÷ (1 − 25%) = ₹4,80,000; "cost plus 25%" is the one that multiplies by 125%.
:::

::: mistake Closing stock of Process II carried entirely at cost
Putting all ₹44,500 into the cost column. **Fix:** Process II's prime cost holds ₹1,72,000 of inter-process profit out of ₹8,90,000, so the closing stock holds the same share: ₹8,600 profit, ₹35,900 cost.
:::

::: mistake Overheads in the ratio
Splitting the closing stock with total cost (₹7,60,500 ÷ ₹9,32,500) when stock is valued at prime cost. **Fix:** use the ratio of the column the stock is valued at: prime cost, ₹7,18,000 ÷ ₹8,90,000.
:::

::: mistake Adding up the process profits and calling it the business's profit
Reporting ₹4,33,000 as December's profit. **Fix:** profit realised is ₹4,42,860: add the inter-process profit released from opening stocks and take out what is locked in closing stocks.
:::

## Practice

::: quiz Check yourself
Q: A process transfers output costing ₹2,40,000 to the next process at a profit of 20% on the transfer price. What is the transfer price, in rupees?
= 300000
> TP = ₹2,40,000 ÷ (1 − 20%) = ₹3,00,000; the profit of ₹60,000 is 20% of it (and 25% of cost).

Q: Case scenario. Blending's prime cost for the month is ₹5,00,000, of which ₹1,00,000 is inter-process profit received with transfers from Roasting. Blending's closing stock is valued at prime cost at ₹50,000. Dev wants to know how much unrealised profit sits in it. Which of the following is correct?
- [ ] Nil, because stock is valued at prime cost
- [x] ₹10,000
- [ ] ₹12,500
- [ ] ₹50,000
> The stock carries the prime cost's share of profit: ₹50,000 × ₹1,00,000 ÷ ₹5,00,000 = ₹10,000. ₹12,500 divides by the cost (₹4,00,000) instead of the total.

Q: A process's output is transferred at "cost plus one-third". What percentage of the transfer price is profit?
- [ ] 33⅓%
- [x] 25%
- [ ] 20%
- [ ] 40%
> Cost 3, profit 1, transfer price 4: profit is 1/4 = 25% of the transfer price.

Q: Which of these are ICAI's advantages of using inter-process profit? Select all that apply.
- [x] Comparison of the cost of output with its market price at the stage of completion is facilitated
- [x] Each process is made to stand by itself as to profitability
- [ ] It removes unrealised profit from stock
- [ ] It simplifies the cost accounts
> ICAI's two advantages are the first two. Its disadvantages are the opposite of the last two: the system involves complication and shows profits not realised because stock is not sold out.

Q: In operation costing, material costs and conversion costs are accumulated how?
- [ ] Both by department, using process costing
- [ ] Both by job or batch
- [x] Materials by job or batch; conversion by department, applied at a predetermined rate
- [ ] Materials by department; conversion by job or batch
> That split is why ICAI calls operation costing a hybrid product costing system (SM 10.26).
:::

## Recap

- Inter-process profit = transfer price − cost of the output transferred (market value or cost plus a percentage).
- Advantages: cost compared with market price at each stage; each process stands by itself as to profitability. Disadvantages: complication; unrealised profit shown when stock is not sold.
- On transfer price: TP = cost ÷ (1 − p). On cost: TP = cost × (1 + q).
- Three columns (Total, Cost, Profit) on both sides; stock at prime cost split in the ratio of the prime cost columns; finished stock split in the ratio of the last transfer.
- Realised profit = profits shown + profit in opening stocks − profit in closing stocks = sales − actual cost of goods sold. (Selling to your brother is not a profit until he sells to a stranger.)
- Operation costing: variants with different materials and similar conversion; materials by batch, conversion by department at a predetermined rate; hybrid; garments, shoes, jewellery.

## Flashcards

Q:: ICAI: what are inter-process profits?
A:: The difference between cost and the transfer price when the output of one process is transferred to the next not at cost but at market value or cost plus a percentage of profit.

Q:: Inter-process profit: ICAI's two advantages?
A:: Comparison between the cost of output and its market price at the stage of completion is facilitated; each process is made to stand by itself as to the profitability.

Q:: Inter-process profit: ICAI's two disadvantages?
A:: It involves complication; the system shows profits which are not realised because of stock not sold out.

Q:: Transfer price when profit is p% of the transfer price?
A:: Cost transferred ÷ (1 − p); e.g. cost ₹75 at 25% on TP gives TP ₹100.

Q:: Profit of 1/3 on cost is what fraction of the transfer price?
A:: 1/4 (cost 3 + profit 1 = TP 4).

Q:: Stock in process valued at prime cost: how is its cost element found?
A:: Closing stock × prime cost (cost column) ÷ prime cost (total column, including inter-process profit).

Q:: How is the profit actually realised found in inter-process profit accounts?
A:: Sales − actual cost of goods sold; equivalently, profits shown + profit in opening stocks − profit in closing stocks.

Q:: Why is operation costing called a hybrid product costing system?
A:: Material costs are accumulated by job order or batch, while conversion costs are accumulated by department and assigned by process costing methods.

Q:: Operation costing: when is it used, and three industries (ICAI)?
A:: When more than one variant of a product uses different materials but similar conversion activities; ready-made garments, shoe making, jewellery.

Q:: Operation costing: on what basis are conversion costs applied to products?
A:: A predetermined application rate based on budgeted conversion costs.
