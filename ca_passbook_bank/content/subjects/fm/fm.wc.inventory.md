---
id: fm.wc.inventory
title: Management of inventory
minutes: 28
needs: fm.wc.basics, cma.mat.eoq
tags: inventory management, working capital, EOQ, carrying cost, JIT, holding period, cost of funds
labs:
summary: Inventory as money on a shelf: what inventory management covers, the stock-out against over-stock trade-off, the Paper 4 control tools seen through a finance lens, and what cutting stock days does to working capital.
---

## In plain words

### The godown that ate the cash credit

Tapri's Indore godown is stacked to the roof with cardamom, because Kesar is afraid of a shortage before the festive season. Across the road, at the bank, the cash credit is fully drawn.

> **Kesar:** Full godown, happy heart. If the cardamom runs out, there is no premix.
> **Dev:** Full godown, empty bank. Every sack in there is sitting on our cash credit at 12%.
> **Ritu:** And I have a formula that says how much to order at a time. Per kilo, please.

**Inventory** is the stock a business holds: raw materials, work-in-progress (half-made goods) and finished goods. It is one of the biggest parts of working capital, and it has two opposite dangers. Too little, and production stops, orders are lost and customers go elsewhere: a **stock-out**. Too much, and money is locked on the shelf, paying interest, rent, insurance and the risk that the stock goes stale: **over-stocking**.

Paper 4 teaches how a store controls its stock: how much to order, when to reorder, which items to watch closely. Paper 6A asks the finance manager's question: how much money should be invested in stock, and what does each extra day of stock cost? The answer is priced at the **cost of the funds** that finance it, usually the bank's cash credit rate or the firm's cost of capital. Every day of stock removed from the operating cycle is cash released.

::: analogy The fridge before a family wedding
Buy all the vegetables for the week on Monday and the fridge overflows, half of it wilts by Saturday, and the money left your wallet on Monday. Go to the market every morning and nothing spoils, but you pay the auto fare and lose an hour every day. The sensible family buys in a few lots, keeps a little extra in case guests arrive early, and knows the sabziwala who can deliver at short notice. Ordering in economic lots is EOQ; the little extra is safety stock; the sabziwala at the door is just-in-time.
:::

::: key
Inventory is working capital on a shelf. Hold enough to avoid stock-outs and no more, and price every extra rupee and every extra day of stock at the cost of the funds that finance it.
:::

## How it works

### What inventory management covers

Inventories constitute a major element of working capital, so the investment in them must be properly controlled; the objectives of inventory management are, to a great extent, similar to those of cash management (SM 9.69). In ICAI's words, inventory management covers a large number of problems (SM 9.69):

::: steps
1. Fixation of minimum and maximum levels.
2. Determining the size of inventory to be carried.
3. Deciding about the issues, receipts and inspection procedures.
4. Determining the economic order quantity.
5. Proper storage facilities.
6. Keeping check over obsolescence.
7. Ensuring control over movement of inventories.
:::

The Paper 6A Study Material then refers the student to Chapter 2 (Material Cost) of Paper 4, where these tools are taught in detail (SM 9.69). This lesson keeps to what the finance manager needs from them; the techniques themselves are in the Paper 4 lessons linked below.

### The trade-off: stock-outs against locked-up capital

ICAI's table of working capital trade-offs gives inventory this row (SM 9.11):

| Advantage of the higher side (profitability) | The trade-off | Advantage of the lower side (liquidity) |
|---|---|---|
| Fewer stock-outs increase the profitability | Use techniques like EOQ, JIT etc. to carry the optimum level of inventory | Lower inventory requires less capital, but endangers stock-out and loss of goodwill |

Among the factors to be considered while planning working capital, the **desired level of inventory** is the level which allows for uninterrupted production but reduces the investment in raw materials and hence increases cash flow; techniques like Just in Time (JIT) and Economic Order Quantity (EOQ) are used for it (SM 9.9). And inventory is ideally financed by credit granted by the supplier (SM 9.10); beyond that, banks lend against stock as a cash credit secured by pledge or hypothecation of goods ([[fm.wc.banking|financing of working capital and bank credit]]).

The CIMA definition the Paper 4 Study Material uses says the same in one line: **inventory control** is "the function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks" (CMA Study Material 2.21).

### Inventory in the operating cycle

Three of the five stages of the operating cycle are inventory (SM 9.19–9.20): **R** (raw material storage period), **W** (work-in-progress holding period) and **F** (finished goods storage period), in

$$\text{Operating cycle} = R + W + F + D - C$$

Each is measured against its own cost base: average raw material stock against the average cost of raw material consumed per day, average WIP against the average cost of production per day, and average finished goods against the average cost of goods sold per day (SM 9.20). The Study Material's rule of thumb (SM 9.19): **shift inventory faster and you free up cash; move it slower and you consume more cash.** The cycle itself is built in [[fm.wc.basics|working capital and the operating cycle]].

### What a shelf of stock holds, in rupees

When a firm orders a fixed lot and keeps a safety stock, its stock falls steadily from the top of each lot to the safety stock and jumps back when the next lot arrives. Take lots of 400 kg, a safety stock of 100 kg and use of 40 kg a day:

::: diagram Stock on hand: lots of 400 kg over a safety stock of 100 kg
{"type": "plot", "h": 270, "x": [0, 30], "y": [0, 560], "legend": "outside",
 "xlabel": "days", "ylabel": "stock on hand (kg)",
 "xticks": [[0, "0"], [10, "10"], [20, "20"], [30, "30"]],
 "yticks": [[0, "0"], [100, "100"], [300, "300"], [500, "500"]],
 "series": [
  {"label": "stock on hand", "pts": [[0, 500], [10, 100], [10, 500], [20, 100], [20, 500], [30, 100]], "color": "a"},
  {"label": "average stock", "pts": [[0, 300], [30, 300]], "color": "g", "dash": true},
  {"label": "safety stock", "pts": [[0, 100], [30, 100]], "color": "mute", "dash": true}],
 "caption": "Blue: stock on hand, falling 40 kg a day from 500 to 100 and refilled by each 400 kg lot. Green dashed: the average, half a lot plus the safety stock (200 + 100 = 300 kg). Grey dashed: the safety stock, which is never used in a normal cycle."}
:::

The money invested in the item is the **average stock** × its cost: half the order quantity plus the safety stock. That is why smaller, more frequent lots (as under JIT) or a smaller safety stock free cash, and why the carrying cost is charged on the average stock and not on the lot.

### The control tools, from Paper 4

The Paper 4 Study Material groups inventory control into four bases (CMA Study Material 2.22):

::: diagram The four bases of inventory control (CMA Study Material 2.22)
{"type": "layers", "layers": [
 {"label": "Setting quantitative levels", "note": "re-order level, EOQ, maximum, minimum, average, danger level, buffer stock", "right": "when, how much"},
 {"label": "Relative classification", "note": "ABC (value), FSN (turnover), VED (importance), HML (price)", "right": "which items"},
 {"label": "Ratio analysis", "note": "input-output ratio, inventory turnover ratio", "right": "how well"},
 {"label": "Physical control", "note": "two bin system, budgets, perpetual inventory, verification", "right": "safe custody"}],
 "caption": "Each base answers a different question; the right-hand column names it. The detail of each is in the Paper 4 lessons linked below."}
:::

| Tool | What it decides | Rule (CMA Study Material) |
|---|---|---|
| Re-order level | When to order | Maximum consumption × maximum re-order period (2.22) |
| Economic order quantity | How much to order | Order size at which ordering + carrying cost is minimum (2.23–2.24) |
| Maximum, minimum, danger levels | How much to hold | Formulas at 2.27; see [[cma.mat.levels|stock levels]] |
| ABC analysis | Which items need tight control | About 10% of items, 70% of value are A (2.35–2.36); see [[cma.mat.techniques|ABC and JIT]] |
| Just in Time | Whether to hold stock at all | Buy only when actually required for production (2.35) |
| Inventory turnover ratio | Is stock moving? | Low ratio: over-investment, working capital locked up (2.42); see [[cma.mat.ratios|turnover ratios]] |

Three Paper 4 definitions the finance manager uses most (CMA Study Material 2.23–2.24, 2.35):

- **Ordering costs**: costs associated with the purchase or order of materials: inviting quotations, purchase orders, procurement staff, transportation and inspection.
- **Carrying costs**: costs of holding inventories in store: ==the cost of fund invested in inventories==, storage, insurance, obsolescence.
- **Just in Time (JIT)**: a system of inventory management with an approach to have zero inventories in stores; material is purchased only when actually required for production. Its two principles: produce goods only when required, and deliver products to customers only when they want them. It is also called a "demand pull" or "pull through" system.

The EOQ and its quantity-discount tests are worked in full in [[cma.mat.eoq|economic order quantity]].

### The finance manager's lens

Three habits distinguish a finance answer from a stores answer:

1. **The rate.** The cost of funds inside the carrying cost is the firm's borrowing rate (the cash credit) or its cost of capital; a higher rate shrinks the EOQ and makes every day of stock dearer.
2. **The base.** Stock is valued at cost, not at selling price: raw materials at material cost, work-in-progress at its cost to date, finished goods at the cost of production (SM 9.22–9.23); the estimation is in [[fm.wc.estimate|estimating working capital requirement]].
3. **The cash.** A change in stock policy is judged by its total cost (purchase price, ordering, carrying) and by the working capital it releases or absorbs; but the interest on released funds is already inside the carrying cost, so it is counted once.

The Paper 4 list of physical controls includes one that is pure finance: **a system of budgets**, an inventories requirement budget from the production plan, which "will discourage the unnecessary investment in inventories" (CMA Study Material 2.45).

## Formats and formulas

*Reproduce the EOQ formula and the cost comparison layout from memory.*

::: formula Economic order quantity (CMA Study Material 2.24)
$$\text{EOQ} = \sqrt{\frac{2 \times A \times O}{C}}$$
A = annual requirement (units); O = cost per order; C = carrying cost per unit per annum, which includes the cost of funds invested in the stock.
:::

::: formula Average stock and the money in it
$$\text{Average stock} = \frac{\text{Order quantity}}{2} + \text{Safety stock} \qquad \text{Investment} = \text{Average stock} \times \text{Cost per unit}$$
:::

::: formula Total annual cost of a stock policy
$$\text{Total cost} = \text{Purchase cost} + \frac{A}{Q} \times O \qquad + \left(\frac{Q}{2} + \text{Safety stock}\right) \times C$$
Q = order quantity. Compare policies on this total; the purchase cost matters whenever the policies change the price.
:::

::: formula Inventory holding periods (SM 9.20)
$$R = \frac{\text{Average stock of raw material}}{\text{Average cost of raw material consumption per day}}$$

$$F = \frac{\text{Average stock of finished goods}}{\text{Average cost of goods sold per day}}$$
W = average work-in-progress ÷ average cost of production per day.
:::

::: formula Working capital released by fewer days of stock
$$\text{Funds released} = \text{Cost per day} \times \text{Days cut} \qquad \text{Annual saving} = \text{Funds released} \times \text{Carrying cost rate}$$
Cost per day on the right base: material consumed per day for raw materials, cost of production per day for finished goods.
:::

### Comparison statement for two stock policies

| Particulars | Policy I (₹) | Policy II (₹) |
|---|---:|---:|
| Purchase cost (units × price) | xxx | xxx |
| Ordering cost (number of orders × cost per order) | xxx | xxx |
| Carrying cost (average stock × carrying cost per unit) | xxx | xxx |
| **Total annual cost** | **xxx** | **xxx** |

::: definition Inventory control (CIMA, as quoted by ICAI)
The function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks. (CMA Study Material 2.21)
:::

::: definition Economic order quantity
The size of an order for which total of ordering and carrying cost are minimum. (CMA Study Material 2.23)
:::

## Worked examples

:::: example Cardamom: economic lots or weekly deliveries?
Tapri's premix plant uses 7,200 kg of cardamom a year, evenly. It buys from a Kerala grower at ₹2,000 per kg. Each order costs ₹7,500 (documentation, freight booked per consignment, inspection). The carrying cost is 15% a year of the stock's cost: 12% is the interest on the cash credit that finances the stock and 3% is storage and insurance. The plant keeps a safety stock of 200 kg.

The grower proposes a just-in-time arrangement: weekly deliveries of 150 kg (48 a year) at ₹2,010 per kg, under a standing order that cuts the cost per delivery to ₹1,200. Because supply becomes regular, Ritu thinks the safety stock can come down to 50 kg.

**Required:**

(i) Calculate the EOQ, the number of orders a year, the average stock and the average investment in cardamom under the present system.

(ii) Calculate the total annual cost under the present system ordering the EOQ, and under the JIT proposal.

(iii) Advise Tapri, and state the working capital the proposal releases.

(iv) Kesar says the released funds will also save 12% interest on the cash credit, so that saving should be added. Comment.

(v) State one risk of the proposal that the figures do not show.

::: answer Show the working
**(i) Present system**

Carrying cost per kg = 15% × ₹2,000 = ₹300 a year.

$$\text{EOQ} = \sqrt{\frac{2 \times 7{,}200 \times 7{,}500}{300}} \qquad = \sqrt{3{,}60{,}000} = 600 \text{ kg}$$

Orders a year = 7,200 ÷ 600 = **12** (one a month). Average stock = 600 ÷ 2 + 200 = **500 kg**; average investment = 500 × ₹2,000 = **₹10,00,000**.

**(ii) Total annual cost**

Under JIT, carrying cost per kg = 15% × ₹2,010 = ₹301.50; average stock = 150 ÷ 2 + 50 = 125 kg.

| Particulars | Present system (₹) | JIT proposal (₹) |
|---|---:|---:|
| Purchase cost (7,200 kg × ₹2,000 / ₹2,010) | 1,44,00,000 | 1,44,72,000 |
| Ordering cost (12 × ₹7,500 / 48 × ₹1,200) | 90,000 | 57,600 |
| Carrying cost, cycle stock (300 × ₹300 / 75 × ₹301.50) | 90,000 | 22,613 |
| Carrying cost, safety stock (200 × ₹300 / 50 × ₹301.50) | 60,000 | 15,075 |
| **Total annual cost** | **1,46,40,000** | **1,45,67,288** |

**(iii) Advice.** The JIT proposal costs **₹72,712 a year less**: the ₹72,000 price premium is more than paid for by ₹32,400 less ordering cost and ₹1,12,312 less carrying cost. Accept it, subject to (v). Average investment falls from ₹10,00,000 to 125 × ₹2,010 = ₹2,51,250, releasing **₹7,48,750** of working capital, which can be used to reduce the cash credit.

**(iv) Kesar's extra saving.** It would be counted twice. The 15% carrying cost already includes 12% interest on the funds invested in stock: the interest on the present ₹10,00,000 (₹1,20,000) and on the JIT ₹2,51,250 (₹30,150) is inside the two carrying cost lines. Adding ₹89,850 again would overstate the benefit.

**(v) Risk.** With only 50 kg of safety stock (about 2.5 days' use), a single late delivery stops the premix line; the cost of a stock-out (lost production, sales and goodwill) is not in the table. The grower's reliability, an alternative supplier and a penalty clause should be settled before the standing order is signed.
:::
::::

:::: example The samosa factory: fewer days of stock, worth the software?
Tapri's frozen samosa factory consumes raw materials costing ₹7.20 crore a year, and its conversion costs (wages and cash overheads) are ₹3.60 crore a year. Raw materials are held for 30 days; work-in-progress takes 6 days, with materials issued at the start and conversion costs 50% complete on average; finished goods are held for 15 days. Debtors pay in 30 days and suppliers are paid in 45 days. Assume 360 days in a year.

Ritu proposes ABC-based stock control with automated reordering, which would cut the raw material period to 18 days and the finished goods period to 9 days, at a cost of ₹6,00,000 a year (software licence and an analyst). Stock is financed by the cash credit at 12%, and storage and insurance cost 3% a year of the value of stock held.

**Required:**

(i) Calculate the investment in each type of inventory before and after the proposal.

(ii) Calculate the change in the net operating cycle.

(iii) Evaluate the proposal on financial grounds and comment.

::: answer Show the working
**Working notes**

1. Cost of production = ₹7.20 crore + ₹3.60 crore = **₹10.80 crore**; per day ₹3,00,000.
2. Raw material consumed per day = ₹7.20 crore ÷ 360 = ₹2,00,000; conversion cost per day = ₹1,00,000.

**(i) Investment in inventory (₹)**

| Particulars | Before | After |
|---|---:|---:|
| Raw materials (₹2,00,000 × 30 / 18 days) | 60,00,000 | 36,00,000 |
| WIP: materials (₹2,00,000 × 6 days) | 12,00,000 | 12,00,000 |
| WIP: conversion (₹1,00,000 × 6 days × 50%) | 3,00,000 | 3,00,000 |
| Finished goods (₹3,00,000 × 15 / 9 days) | 45,00,000 | 27,00,000 |
| **Total inventory** | **1,20,00,000** | **78,00,000** |

Finished goods are valued at the cost of production, not at selling price (SM 9.23).

**(ii) Net operating cycle**

Before: R + W + F + D − C = 30 + 6 + 15 + 30 − 45 = **36 days**. After: 18 + 6 + 9 + 30 − 45 = **18 days**. The cycle halves.

**(iii) Evaluation**

| Particulars | Amount (₹) |
|---|---:|
| Inventory released (1,20,00,000 − 78,00,000) | 42,00,000 |
| Interest saved on the cash credit at 12% | 5,04,000 |
| Storage and insurance saved at 3% | 1,26,000 |
| **Total annual saving** | **6,30,000** |
| Less: annual cost of the proposal | 6,00,000 |
| **Net annual benefit** | **30,000** |

**Comment.** The proposal is only just worth it: a net ₹30,000 a year on ₹6,00,000 of cost. On interest alone (₹5,04,000) it would not pay; the storage saving tips it. The decision is sensitive to the rate: at a higher cash credit rate it improves, and if the lower stocks cause even one costly stock-out it fails. Management should accept it only if the ABC classification also improves control of the high-value A items (the real purpose of the tool), not merely for the interest.
:::
::::

## Under the hood

### Count the interest once

When the carrying cost rate already includes the cost of funds, the interest saved on released inventory is part of the carrying cost saving. Add it separately only when the carrying cost given is storage and insurance alone and the question gives the cost of funds as a separate rate: read which kind of carrying cost the question states.

### Which rate is the cost of funds?

If the stock is financed by a cash credit, the bank's rate is the cost of the marginal rupee; if the question gives the firm's cost of capital or "opportunity cost of funds", use that. ICAI's old-scheme working capital questions used the opportunity cost of capital (15%) as the carrying cost rate inside the EOQ (MTP May 2022 Series II Q3).

### Paper 4 and Paper 6A: the same stock, two questions

The quantity tools (levels, EOQ, quantity discounts, safety stock against stock-out cost) are examined in Paper 4: [[cma.mat.levels|stock levels]], [[cma.mat.eoq|EOQ and quantity discounts]], [[cma.mat.techniques|ABC, FSN, VED, HML and JIT]], [[cma.mat.ratios|inventory turnover]]. In Paper 6A inventory appears as days in the operating cycle, as a line in the working capital statement, as the inventory row of the liquidity-profitability trade-off and as the asset a bank lends against. A long Paper 6A question can use an EOQ to fix the raw material stock inside a working capital estimate, and Baumol for the cash in the same statement (old-scheme MTP May 2022 Series II Q3); see [[fm.wc.cash|treasury and cash management]].

## Exam angle

::: exam How inventory management was examined, May 2024 to September 2026
In the ICAI Paper 6A documents read for this lesson, inventory came up 4 times in 4 new-scheme documents, always inside working capital, never as a stand-alone EOQ question:

- **Theory.** RTP September 2025 Q9(c): analyse the trade-offs between the components of working capital; the suggested answer reproduces ICAI's table, with the inventory row (fewer stock-outs, EOQ and JIT, less capital but risk of stock-out). RTP September 2026 Q10(c): the factors to be considered while planning working capital, including the desired level of inventory (JIT and EOQ).
- **Case scenario.** MTP May 2025 Series II, MCQ 3: rank three proposals to cut the inventory of a washing machine maker (discounts, an exchange scheme, delivery after advance booking) by their benefit.
- **Operating cycle.** MTP September 2025 Series I Q1(c) (5 marks): a just-in-time manufacturer that decides to hold slightly higher inventories after supply disruptions; the net operating cycle from opening and closing stocks of raw material, WIP and finished goods, then the working capital with a 10% contingency reserve.
- **Old scheme, for practice:** May 2022 Q1(c) (5 marks): re-order level, EOQ and a 1% quantity discount in Paper 8; MTP May 2022 Series II Q3 (10 marks): raw material stock equal to the EOQ inside a working capital estimate.
:::

::: exam What earns the marks
- Inventory periods use **cost** bases (consumption, cost of production, cost of goods sold), never sales.
- In a stock-policy comparison, show purchase, ordering and carrying cost for each policy, then the difference.
- In theory answers, name the trade-off in ICAI's words: profitability (fewer stock-outs) against liquidity (less capital locked up), resolved by EOQ and JIT.
:::

::: trick Half the lot plus the cushion
Money in an item = (order quantity ÷ 2 + safety stock) × cost per unit. Condition: steady usage and lots arriving as the previous lot runs down to the safety stock.
:::

## Answer frame

### "Explain the scope of inventory management" or "What does inventory management cover?"

1. Inventories are a major element of working capital; their investment must be properly controlled; the objectives are similar to those of cash management.
2. The seven problems in ICAI's order: minimum and maximum levels; size of inventory; issues, receipts and inspection procedures; EOQ; storage; obsolescence; control over movement.
3. The aim: sufficient stock for all requirements without unnecessarily large stocks.

### "Discuss the trade-off between profitability and liquidity in inventory"

| Point | Higher inventory | Lower inventory |
|---|---|---|
| Effect | Fewer stock-outs; uninterrupted production and sales | Less capital required; cash released |
| Risk | Funds locked up; carrying cost; obsolescence | Stock-out and loss of goodwill |
| Tools | EOQ, JIT, stock levels: carry the optimum level | EOQ, JIT, stock levels: carry the optimum level |

## Common mistakes

::: mistake Hall of Shame: the interest that was saved twice
The carrying cost is 15%, of which 12% is the cost of funds, and the answer adds "interest saved on released stock" on top of the lower carrying cost. **Fix:** the cost of funds is inside the carrying cost; count it once.
:::

::: mistake The whole lot on the shelf all year
Taking the average stock as the EOQ (600 kg) instead of half of it plus the safety stock (500 kg), or forgetting the safety stock altogether (300 kg). **Fix:** average stock = Q ÷ 2 + safety stock; the investment and the carrying cost follow from it.
:::

::: mistake Finished goods at selling price
Valuing finished goods stock at sales value inflates the working capital by the profit margin. **Fix:** finished goods at the cost of production (cash cost where the question uses the cash cost basis), WIP at its cost to date (SM 9.22–9.23).
:::

::: mistake The cheaper order that ignored the price
Comparing JIT and EOQ on ordering and carrying cost alone, when JIT comes with a price premium. **Fix:** when a policy changes the price, the purchase cost is a relevant cost and enters the comparison.
:::

## Practice

::: quiz Check yourself
Q: Tapri's café chain buys 4,000 cartons of tea a year at ₹400 each. Each order costs ₹1,440, and the carrying cost is 18% a year of the stock's cost. It keeps a safety stock of 100 cartons and orders the EOQ. What is the average investment in this tea, in rupees?
= 120000
> C = 18% × ₹400 = ₹72; EOQ = √(2 × 4,000 × 1,440 ÷ 72) = √1,60,000 = 400 cartons. Average stock = 400 ÷ 2 + 100 = 300 cartons; investment = 300 × ₹400 = ₹1,20,000. Taking the whole EOQ gives ₹1,60,000; forgetting the safety stock, ₹80,000.

Q: Case scenario. After two late deliveries of potato flakes, the samosa factory's management doubles the safety stock of raw materials. Usage, the order quantity, prices and all credit periods are unchanged. Which of the following is correct?
- [ ] The EOQ rises, so orders are placed less often
- [x] The raw material storage period, the operating cycle and the working capital requirement all rise
- [ ] The working capital requirement is unchanged, because safety stock is never used
- [ ] The operating cycle falls, because stock-outs are avoided
> The EOQ depends on annual usage, ordering cost and carrying cost, not on the safety stock. The extra safety stock raises the average stock, so R, the operating cycle and the funds invested all rise, even though the safety stock is not used in a normal cycle.

Q: In ICAI's table of working capital trade-offs, what is the advantage of the lower side for inventory?
- [ ] Fewer stock-outs increase profitability
- [ ] It allows quantity discounts from suppliers
- [ ] It removes the need for EOQ and JIT
- [x] Lower inventory requires less capital, though it endangers stock-out and loss of goodwill
> SM 9.11: the higher side gives fewer stock-outs (profitability); the lower side requires less capital (liquidity) but risks stock-out and loss of goodwill; EOQ and JIT are the trade-off tools.

Q: The carrying cost of a component is 16% a year: 13% interest on the cash credit and 3% storage. A new ordering policy releases ₹5,00,000 of stock, and the carrying cost saving has been computed at 16% of it. Kesar wants to add a further ₹65,000 for "interest saved on the cash credit". The correct treatment is:
- [x] Do not add it: the 13% interest is already part of the 16% carrying cost saving
- [ ] Add it: interest and carrying cost are separate items
- [ ] Add it, but only after tax
- [ ] Replace the carrying cost saving with the interest saving
> ₹5,00,000 × 16% = ₹80,000 already includes ₹65,000 of interest and ₹15,000 of storage. Adding ₹65,000 again counts it twice.

Q: Which of these are carrying costs in ICAI's definition? Select all that apply.
- [x] Cost of fund invested in inventories
- [x] Insurance of the stock
- [ ] Cost of inviting quotations
- [x] Obsolescence
- [ ] Inspection of materials received
> Carrying costs: cost of funds invested, storage, insurance, obsolescence (CMA Study Material 2.23). Inviting quotations and inspection on receipt are ordering costs.
:::

## Recap

- Inventories are a major element of working capital; their objectives are similar to those of cash management (SM 9.69).
- Scope, in ICAI's order: minimum and maximum levels; size of inventory; issues, receipts and inspection; EOQ; storage; obsolescence; control over movement.
- Trade-off: more stock, fewer stock-outs (profitability); less stock, less capital but risk of stock-out and goodwill (liquidity); EOQ and JIT find the optimum (SM 9.11).
- EOQ = √(2AO ÷ C); C includes the cost of funds invested in the stock.
- Average stock = Q ÷ 2 + safety stock; money invested = average stock × cost per unit.
- R, W and F are measured on cost bases; shifting stock faster frees cash.
- Compare stock policies on total cost (purchase + ordering + carrying), and count the interest on released funds only once.
- Inventory is ideally financed by supplier credit; banks lend against it as a cash credit. (Buy for the week, not for the wedding season.)

## Flashcards

Q:: The seven problems inventory management covers, in ICAI's order (FM Study Material 9.69)?
A:: Fixation of minimum and maximum levels; determining the size of inventory to be carried; deciding the issues, receipts and inspection procedures; determining the EOQ; proper storage facilities; keeping check over obsolescence; ensuring control over movement of inventories.

Q:: Inventory row of ICAI's working capital trade-off table?
A:: Higher side: fewer stock-outs increase profitability. Trade-off: use EOQ, JIT etc. to carry the optimum level. Lower side: less capital required, but endangers stock-out and loss of goodwill.

Q:: Define inventory control (CIMA, quoted by ICAI).
A:: The function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks.

Q:: EOQ formula and its symbols?
A:: √(2 × A × O ÷ C): A = annual requirement, O = cost per order, C = carrying cost per unit per annum.

Q:: Carrying costs: what do they include (ICAI)?
A:: Cost of fund invested in inventories, cost of storage, insurance cost, obsolescence.

Q:: Average stock with an order quantity Q and a safety stock?
A:: Q ÷ 2 + safety stock; the money invested is that average × cost per unit.

Q:: JIT: definition and its two principles?
A:: A system with an approach to have zero inventories in stores, purchasing material only when actually required for production. Principles: produce goods only when required; deliver products to customers only when they want them.

Q:: Raw material storage period formula (SM 9.20)?
A:: Average stock of raw material ÷ average cost of raw material consumption per day.

Q:: "Desired level of inventory" as a factor in planning working capital?
A:: The level that allows uninterrupted production but reduces the investment in raw materials and hence increases cash flow; JIT and EOQ are used for it.

Q:: How does ICAI say inventory is ideally financed?
A:: By credit granted by the supplier; depending on the cash conversion cycle, a bank loan or overdraft, or factoring of debtors, may be needed.
