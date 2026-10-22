---
id: cma.mat.eoq
title: Economic Order Quantity and quantity discounts
minutes: 30
needs: cma.mat.levels
tags: EOQ, economic order quantity, ordering cost, carrying cost, quantity discount, re-order quantity, inventory control
labs: eoq
summary: How much to order at a time: the order size at which ordering cost plus carrying cost is lowest, and how to test a supplier's quantity discount on total cost.
---

## In plain words

### One order a year, or one order a day?

Tapri's Indore blending unit uses 36,000 kg of Assam tea a year. The tea costs ₹300 a kg, and each order costs ₹600 to place (quotations, the purchase order, the truck, the quality check at the gate).

> **Kesar:** One order a year, one headache a year. Buy all 36,000 kg in April.
> **Ritu:** Then the godown holds 18,000 kg on average all year. Interest, rent, insurance and stale tea cost us 10% of the price, ₹30 a kg a year: ₹5,40,000, to save a few ₹600 purchase orders.
> **Kesar:** Fine. Order every three days.
> **Ritu:** That is 120 orders at ₹600: ₹72,000. Per order, please. Somewhere in between is cheapest.

Two costs pull in opposite directions. The **ordering cost** is paid every time an order is placed, so it falls as orders get bigger and fewer. The **carrying cost** is paid on the stock lying in the store, and since stock runs down from a full order to nothing, the store holds half an order on average: bigger orders mean more stock and more carrying cost.

| Order size, kg (orders a year) | Ordering cost (₹) | Carrying cost (₹) | Total (₹) |
|---|---:|---:|---:|
| 36,000 (1) | 600 | 5,40,000 | 5,40,600 |
| 6,000 (6) | 3,600 | 90,000 | 93,600 |
| 3,000 (12) | 7,200 | 45,000 | 52,200 |
| **1,200 (30)** | **18,000** | **18,000** | **36,000** |
| 600 (60) | 36,000 | 9,000 | 45,000 |
| 300 (120) | 72,000 | 4,500 | 76,500 |

The cheapest order size, 1,200 kg, is the **Economic Order Quantity (EOQ)**: 30 orders a year, one every 12 days. Notice where it sits: the row where the two costs are equal.

Then a supplier says "order 6,000 kg at a time and I will knock 2% off the price". Now a third cost moves, the price itself. Ritu does not argue: she adds up purchase cost, ordering cost and carrying cost for each choice and takes the smaller total. (Here the 2% wins by ₹1,60,200: ₹2,16,000 off the price and ₹14,400 less ordering, against ₹70,200 more carrying, at 10% of the lower price.)

::: analogy The vegetable run
Every trip to the mandi costs you an hour and an auto fare, so you do not go every morning. Buy a month's vegetables at once and half of them wilt in a fridge you could not shut. Most homes settle on two trips a week without any formula. EOQ is the same instinct done with numbers: as many trips as it takes to make trips plus storage cheapest.
:::

::: key
EOQ is the order size at which annual ordering cost plus annual carrying cost is lowest; in the basic model the two are equal there. A quantity discount is worth taking only if the total cost, purchase price included, is lower at the discount lot than at the EOQ.
:::

## How it works

### Six steps from a purchase file to the EOQ

The **re-order quantity** is the quantity for which the stores department raises a purchase requisition. ICAI's rule for setting it: "the quantity should be where, the total of carrying cost and ordering cost is at minimum. For this purpose, an economic order quantity should be calculated" (SM 2.23). When to order is the [[cma.mat.levels|re-order level]]; how much to order is the EOQ.

::: steps
1. **Annual requirement (A)**: the material needed for a year, in the material's own unit. Monthly usage × 12. If you are given production, work back: units to produce × material per unit, grossed up for yield, less opening stock of the material where the question says purchases are net of it.
2. **Ordering cost per order (O)**: the costs of placing an order: inviting quotations, preparing purchase orders, procurement staff directly attributable, transportation and inspection (SM 2.23).
3. **Carrying cost per unit per annum (C)**: the cost of holding one unit for a year: cost of funds invested, storage, insurance, obsolescence (SM 2.23). Rates given as a % of price are added and multiplied by the price; a fixed ₹ per unit is added on top; monthly and quarterly rates are converted to a year.
4. **EOQ** $= \sqrt{2AO/C}$. For the tea: $\sqrt{2 \times 36{,}000 \times 600 / 30} = 1{,}200$ kg.
5. **Number of orders** = A ÷ EOQ = 30; **order interval** = days in the year ÷ number of orders = 360 ÷ 30 = 12 days.
6. **Annual costs**: ordering cost = (A ÷ Q) × O = ₹18,000; carrying cost = (Q ÷ 2) × C = ₹18,000; total inventory cost = purchase cost (A × price) + ordering cost + carrying cost = ₹1,08,00,000 + ₹36,000 = ₹1,08,36,000.
:::

::: diagram Assam tea: the costs of ordering and carrying, by order size
{"type": "plot", "h": 320, "x": [0, 4000], "y": [0, 120000], "clip": true,
 "xlabel": "order size (kg)", "ylabel": "annual cost (₹)",
 "legend": "top-right",
 "xticks": [[0, "0"], [600, "600"], [1200, "1,200"], [2000, "2,000"], [3000, "3,000"], [4000, "4,000"]],
 "yticks": [[0, "0"], [18000, "18,000"], [36000, "36,000"], [60000, "60,000"], [90000, "90,000"], [120000, "1,20,000"]],
 "series": [
  {"label": "ordering cost", "fn": "21600000/max(x, 1)", "color": "d"},
  {"label": "carrying cost", "fn": "15*x", "color": "b"},
  {"label": "total", "fn": "21600000/max(x, 1) + 15*x", "color": "a"},
  {"pts": [[1200, 0], [1200, 36000]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 1200, "y": 36000, "label": "EOQ: total ₹36,000", "pos": "above"}, {"x": 1200, "y": 18000, "label": "costs equal", "pos": "right"}],
 "caption": "Orange: ordering cost, ₹2,16,00,000 ÷ order size, falls as orders grow. Teal: carrying cost, half the order × ₹30, a straight line. Blue: their total, lowest at 1,200 kg, exactly where the orange and teal lines cross."}
:::

The bottom of the blue curve is flat. Ordering 600 kg or 2,400 kg (half or double the EOQ) costs ₹45,000, 25% more; ordering 20% below the EOQ costs 2.5% more, and 20% above it less than 2% more. So a supplier's pack size near the EOQ is fine, and a rounded EOQ changes little.

::: lab eoq {"mode":"eoq"}
Step through it yourself: ordering cost falls, carrying cost climbs, and the EOQ sits exactly where the two lines cross.
:::

### Quantity discounts: when the price moves too

A supplier offering a lower price for a bigger lot changes three costs at once: purchase cost falls (lower price), ordering cost falls (fewer orders), carrying cost rises (more stock, though each unit carries a little less where carrying cost is a % of price). The test is always the **total cost**:

::: diagram Testing a quantity discount offer
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Lower price offered\nfor Q units or more"},
  {"id": "e", "kind": "process", "label": "EOQ at the\nnormal price"},
  {"id": "t1", "kind": "process", "label": "Total cost at EOQ\n(purchase + ordering + carrying)"},
  {"id": "t2", "kind": "process", "label": "Total cost at Q,\nall at the discounted price"},
  {"id": "d", "kind": "decision", "label": "Total at Q lower?"},
  {"id": "y", "kind": "end", "label": "Accept\nthe discount", "color": "ok"},
  {"id": "n", "kind": "end", "label": "Order the EOQ", "color": "a"}],
 "edges": [["s", "e"], ["e", "t1"], ["t1", "t2"], ["t2", "d"], ["d", "y", "yes"], ["d", "n", "no"]],
 "caption": "With several price breaks and the EOQ in the undiscounted band, compute the total at the EOQ and at the lowest quantity of each discount band, and pick the smallest. The Study Material's table (SM 2.90) has one row per order size tested."}
:::

ICAI's suggested answers end the comparison with a one-line advice: "The total cost of inventory is lower if EOQ is adopted. Hence, the company is advised not to accept the quantity discount" (SM 2.87), or the reverse when the discount wins (May 2024 Q1(a)).

## Formats and formulas

*Reproduce the formula, the four assumptions and the comparison statement from memory.*

::: formula Economic Order Quantity
$$\text{EOQ} = \sqrt{\frac{2 \times A \times O}{C}}$$
A = annual requirement (the demand for raw material or input for a year); O = cost per order (the cost of placing an order for purchase); C = carrying cost per unit per annum (the cost of carrying average inventory on an annual basis) (SM 2.24).
:::

::: formula Carrying cost per unit per annum
$$C = r \times P + F$$
r = sum of the carrying cost rates per annum; P = price per unit; F = any fixed carrying cost per unit per annum. Storage 2%, interest 12% and obsolescence 6% on a ₹20 unit give C = 20% × ₹20 = ₹4 (SM 2.26). A storage cost of ₹2.5 a kg a month is ₹30 a year.
:::

::: formula Orders, interval and annual costs at order size Q
$$\text{Number of orders} = \frac{A}{Q} \qquad \text{Order interval} = \frac{\text{Days in the year}}{\text{Number of orders}}$$
$$\text{Ordering cost} = \frac{A}{Q} \times O \qquad \text{Carrying cost} = \frac{Q}{2} \times C \qquad \text{Total cost} = A \times \text{price} \qquad + \frac{A}{Q} \times O + \frac{Q}{2} \times C$$
Q ÷ 2 is the average inventory.
:::

::: definition Economic Order Quantity (EOQ)
The size of an order for which total of ordering and carrying cost are minimum. (SM 2.23)
:::

::: definition Ordering cost
Costs associated with the purchase or order of materials, such as cost to invite quotations, documentation works like preparation of purchase orders, employee cost directly attributable to the procurement of material, transportation and inspection cost. (SM 2.23)
:::

::: definition Carrying cost
Costs for holding or carrying inventories in store, such as the cost of fund invested in inventories, cost of storage, insurance cost and obsolescence. (SM 2.23)
:::

**Assumptions underlying EOQ**, in ICAI's order (SM 2.24):

1. Ordering cost per order and carrying cost per unit per annum are known and they are fixed.
2. Anticipated usage of material in units is known.
3. Cost per unit of the material is constant and is known as well.
4. The quantity of material ordered is received immediately, i.e. the lead time is zero.

### The comparison statement for a quantity discount

ICAI prints it as two statements, "(a) When EOQ is ordered" and "(b) When quantity discount is accepted", headed **Evaluation of Profitability of Different Options of Order Quantity**; side by side it reads:

| Particulars | (a) At EOQ (₹) | (b) At discount lot (₹) |
|---|---:|---:|
| Purchase cost (A × price) | xxx | xxx |
| Ordering cost (A ÷ Q × O) | xxx | xxx |
| Carrying cost (Q ÷ 2 × C) | xxx | xxx |
| **Total cost** | **xxx** | **xxx** |

End with "Advise – …". With a schedule of price breaks, ICAI uses one row per order size (SM 2.90); on paper write the columns: annual requirement, order size, number of orders, cost of inventory, ordering cost, carrying cost, total cost.

::: note Rounding the number of orders
If A ÷ Q is not a whole number, the Study Material and recent ICAI answers round the number of orders up ("number of orders cannot be in decimals", SM 2.90; "22.60 Orders or 23 Orders", RTP September 2026 Q5; "rounded off to next whole number", MTP September 2026 Series I). When a question is silent, round up and say so in one line.
:::

## Worked examples

::::: example Kulhads by the lakh: EOQ, re-order level and a 1% offer
Tapri's cafés use 7,20,000 kulhads a year, evenly at 60,000 a month. A kulhad costs ₹10, and carrying cost is 10% of the annual average inventory value. Placing an order costs ₹625. Delivery takes 9 days from the date of order, and a safety stock of 10,000 kulhads is always kept. Assume 360 days in a year.

**Required:**

(i) Compute the EOQ, the number of orders a year and the interval between orders.

(ii) Compute the re-order level.

(iii) The potter offers a discount of 1% if each order is for 1,80,000 kulhads (a quarter's need). Advise whether the offer should be accepted.

:::: answer Show the working
**(i) EOQ**

A = 7,20,000 kulhads; O = ₹625; C = 10% of ₹10 = ₹1 per kulhad per annum.

$$\text{EOQ} = \sqrt{\frac{2 \times 7{,}20{,}000 \times 625}{1}} \qquad = \sqrt{90{,}00{,}00{,}000} = 30{,}000 \text{ kulhads}$$

Number of orders = 7,20,000 ÷ 30,000 = **24**; interval = 360 ÷ 24 = **15 days**.

**(ii) Re-order level** = safety stock + lead time consumption = 10,000 + (2,000 a day × 9 days) = **28,000 kulhads** (daily usage = 7,20,000 ÷ 360). The level formulas are in [[cma.mat.levels|the lesson on stock levels]].

**(iii) Evaluation of profitability of different options of order quantity**

| Particulars | At EOQ, 30,000 (₹) | At 1,80,000 with 1% discount (₹) |
|---|---:|---:|
| Purchase cost (7,20,000 × ₹10; × ₹9.90) | 72,00,000 | 71,28,000 |
| Ordering cost (24 × ₹625; 4 × ₹625) | 15,000 | 2,500 |
| Carrying cost (15,000 × ₹1; 90,000 × ₹0.99) | 15,000 | 89,100 |
| **Total cost** | **72,30,000** | **72,19,600** |

Advise – the total cost is ₹10,400 lower with the discount, so the offer should be accepted. The ₹72,000 saved on price and ₹12,500 on ordering outweigh the ₹74,100 of extra carrying cost.

Carrying cost at the discount lot is on the discounted price: 10% of ₹9.90 = ₹0.99. The safety stock is held under both options, so, as in ICAI's May 2024 suggested answer, it is left out of the comparison.

::: diagram The 1% offer on the total cost curve
{"type": "plot", "h": 320, "x": [0, 380000], "y": [7200000, 7320000],
 "xlabel": "kulhads per order", "ylabel": "total annual cost (₹)",
 "xticks": [[0, "0"], [30000, "30,000"], [120000, "1,20,000"], [180000, "1,80,000"], [240000, "2,40,000"], [360000, "3,60,000"]],
 "yticks": [[7200000, "72,00,000"], [7230000, "72,30,000"], [7260000, "72,60,000"], [7290000, "72,90,000"], [7320000, "73,20,000"]],
 "series": [
  {"label": "at ₹10", "pts": [[10000, 7250000], [15000, 7237500], [20000, 7232500], [25000, 7230500], [30000, 7230000], [40000, 7231250], [50000, 7234000], [60000, 7237500], [80000, 7245625], [100000, 7254500], [120000, 7263750], [140000, 7273214], [160000, 7282812], [180000, 7292500]], "color": "a"},
  {"label": "at ₹9.90 (1,80,000 or more)", "pts": [[180000, 7219600], [200000, 7229250], [240000, 7248675], [280000, 7268207], [320000, 7287806], [360000, 7307450]], "color": "g"},
  {"pts": [[180000, 7292500], [180000, 7219600]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 30000, "y": 7230000, "label": "EOQ ₹72,30,000", "pos": "below"}, {"x": 180000, "y": 7219600, "label": "offer ₹72,19,600", "pos": "right"}],
 "caption": "Blue: total cost at the normal price, lowest at the EOQ. Green: total cost at the discounted price, available from 1,80,000. The discount drops the curve below the EOQ's minimum, so the offer wins; ordering more than 1,80,000 at a time only adds carrying cost."}
:::
::::
:::::

:::: example Sugar on a price ladder: the most economical purchase level
Tapri's premix plant needs 12,000 quintals of sugar a year. Ordering cost is ₹1,500 per order and the holding cost is 15% of the purchase price per annum. The mill quotes:

| Order size (quintals) | Price per quintal (₹) |
|---|---:|
| Less than 300 | 4,000 |
| 300 and less than 600 | 3,980 |
| 600 and less than 1,200 | 3,960 |
| 1,200 and less than 2,400 | 3,950 |
| 2,400 and above | 3,940 |

**Required:** Compute the most economical purchase level. Round the number of orders up to a whole number.

::: answer Show the working
**EOQ at the basic price**: C = 15% of ₹4,000 = ₹600.

$$\text{EOQ} = \sqrt{\frac{2 \times 12{,}000 \times 1{,}500}{600}} \qquad = \sqrt{60{,}000} = 244.9, \text{ say } 245 \text{ quintals}$$

It lies in the first band, so the candidates are 245 and the lowest quantity of each discount band.

| Order size (quintals) | Orders a year (12,000 ÷ q) | Price (₹) | Purchase cost (₹) |
|---:|---:|---:|---:|
| 245 | 48.98, say 49 | 4,000 | 4,80,00,000 |
| 300 | 40 | 3,980 | 4,77,60,000 |
| 600 | 20 | 3,960 | 4,75,20,000 |
| 1,200 | 10 | 3,950 | 4,74,00,000 |
| 2,400 | 5 | 3,940 | 4,72,80,000 |

| Order size (quintals) | Ordering cost (₹) | Carrying cost (₹) | Total cost (₹) |
|---:|---:|---:|---:|
| 245 | 73,500 | 73,500 | 4,81,47,000 |
| 300 | 60,000 | 89,550 | 4,79,09,550 |
| **600** | **30,000** | **1,78,200** | **4,77,28,200** |
| 1,200 | 15,000 | 3,55,500 | 4,77,70,500 |
| 2,400 | 7,500 | 7,09,200 | 4,79,96,700 |

Working: purchase cost = 12,000 × price; ordering cost = orders × ₹1,500; carrying cost = ½ × order size × 15% × price (e.g. ½ × 600 × 15% × ₹3,960 = ₹1,78,200).

The total cost is lowest at **600 quintals**, so the most economical purchase level is 600 quintals (20 orders a year). Bigger lots save price, but beyond 600 the extra carrying cost outruns the last ₹10 and ₹20 off.
:::
::::

::: lab eoq {"mode":"discount","unit":"units","A":360000,"O":1200,"price":240,"pct":10,"rup":0,"tiers":[[30000,"2%"]]}
Now a real one, PYQ May 2024: watch whether 2% off for orders of 30,000 locks beats the EOQ on total cost.
:::

:::: example Milk powder for the premix: the discount that the consultant forgot
For 2026-27 Tapri plans to sell 1,10,000 cartons of chai premix, with 6,000 cartons in stock at the start and 16,000 wanted at the end. A carton needs 2 kg of milk powder, and the input-output ratio is 5 : 4 (80% yield). 12,000 kg of milk powder are already in stock; purchases are to cover the rest. Milk powder costs ₹250 a kg; each order costs ₹2,500. Carrying costs: interest 1% per month and insurance 0.5% per quarter, both on the purchase price, and storage ₹5 per kg per annum.

At present Tapri orders monthly, in 12 equal lots, and its supplier gives a 1% discount on monthly orders. Dev's consultant says "Move to EOQ and you will save".

**Required:**

(i) Compute the annual purchase requirement of milk powder.

(ii) Compute the EOQ and the number of orders.

(iii) Compare the total annual cost of the present policy with the EOQ policy, and advise.

(iv) The supplier now withdraws the monthly discount and offers 1% only on quarterly orders. Advise whether to accept, and compute the minimum discount on quarterly orders that would make them worth accepting.

::: answer Show the working
**(i) Purchase requirement**

| Particulars | Quantity |
|---|---:|
| Sales | 1,10,000 cartons |
| Add: Closing stock of cartons | 16,000 cartons |
| Less: Opening stock of cartons | 6,000 cartons |
| **Production** | **1,20,000 cartons** |
| Milk powder input (1,20,000 × 2 kg ÷ 80%) | 3,00,000 kg |
| Less: Opening stock of milk powder | 12,000 kg |
| **Annual purchase requirement (A)** | **2,88,000 kg** |

**(ii) EOQ**

Carrying cost per kg per annum (C) = interest (1% × 12) + insurance (0.5% × 4) = 14% of ₹250 = ₹35, plus storage ₹5 = **₹40**.

$$\text{EOQ} = \sqrt{\frac{2 \times 2{,}88{,}000 \times 2{,}500}{40}} \qquad = \sqrt{3{,}60{,}00{,}000} = 6{,}000 \text{ kg} \qquad \text{Orders} = \frac{2{,}88{,}000}{6{,}000} = 48$$

**(iii) Present policy against EOQ**

Monthly lot = 2,88,000 ÷ 12 = 24,000 kg at ₹247.50; its carrying cost per kg = 14% of ₹247.50 + ₹5 = ₹39.65.

| Particulars | EOQ, 6,000 kg (₹) | Monthly, 24,000 kg, 1% off (₹) |
|---|---:|---:|
| Purchase cost (2,88,000 × ₹250; × ₹247.50) | 7,20,00,000 | 7,12,80,000 |
| Ordering cost (48 × ₹2,500; 12 × ₹2,500) | 1,20,000 | 30,000 |
| Carrying cost (3,000 × ₹40; 12,000 × ₹39.65) | 1,20,000 | 4,75,800 |
| **Total cost** | **7,22,40,000** | **7,17,85,800** |

Advise – the present policy costs ₹4,54,200 less: the 1% discount (₹7,20,000) is worth far more than the ordering and carrying costs EOQ would save. The consultant compared ordering and carrying cost only and forgot the price. Tapri should keep ordering monthly while the discount lasts.

**(iv) 1% only on quarterly orders**

Without the monthly discount, the choice is EOQ at ₹250 (total ₹7,22,40,000) against quarterly lots of 72,000 kg at ₹247.50: purchase ₹7,12,80,000 + ordering (4 × ₹2,500) ₹10,000 + carrying (36,000 × ₹39.65) ₹14,27,400 = **₹7,27,17,400**, which is ₹4,77,400 more. **Reject** the 1% offer and order the EOQ.

Minimum discount: let the quarterly price be p. Then

$$2{,}88{,}000p + 10{,}000 \qquad + 36{,}000 \times (5 + 0.14p) \qquad = 7{,}22{,}40{,}000 \qquad 2{,}93{,}040p = 7{,}20{,}50{,}000 \qquad p = \text{₹}245.87$$

Discount = (₹250 − ₹245.87) ÷ ₹250 = 1.65%. A quarterly discount of **more than 1.65%** (say 1.66% or more) makes the quarterly lot cheaper than the EOQ; that is the counter-offer to make.
:::
::::

## Under the hood

### Why the minimum sits where the two costs are equal

Total ordering-plus-carrying cost is $\frac{A}{Q}O + \frac{Q}{2}C$. One term falls with Q, the other rises at a constant rate, and their sum is lowest where they are equal: $\frac{A}{Q}O = \frac{Q}{2}C$, which rearranges to $Q^2 = \frac{2AO}{C}$. That is the EOQ formula. It also gives two checks: at the EOQ, ordering cost = carrying cost (₹18,000 each for the tea, ₹400 each in SM Illustration 4), and their total = EOQ × C (1,200 × ₹30 = ₹36,000).

### The price inside the formula

When carrying cost is a % of price, a dearer material has a smaller EOQ: EOQ moves with $1/\sqrt{\text{price}}$. In SM Illustration 4 the price falls from ₹20 to ₹12.80, C from ₹4 to ₹2.56, and the EOQ rises from 200 to 250 units (√(20 ÷ 12.80) = 1.25). Four times the price halves the EOQ. A fixed ₹-per-unit holding cost does not move with price (RTP May 2025 Q8: a holding cost of ₹180 per drum plus 10% of purchase cost).

### Shelf life beats the formula

The EOQ assumes the material keeps. In the Study Material's case scenario, a material that becomes obsolete 10 days after receipt has its maximum stock capped at 10 days' consumption, and the cost comparison adds the "loss due to obsolescence" on everything bought beyond that (SM 2.98–2.99). For perishables, compare total cost including the spoiled quantity, not the formula's answer alone.

### Neighbours

- *When* to order, and the safety stock that guards against a stock-out, are in [[cma.mat.levels|stock levels]]: the maximum level formula uses the re-order quantity, "here, re-order quantity may be EOQ" (SM 2.27).
- A quantity discount shown in the invoice is deducted in valuing the receipt: [[cma.mat.receipts|valuing material receipts]].
- The same trade-off with a set-up cost per production run instead of an ordering cost is the **economic batch quantity**: [[cma.unit.batch|batch costing and the EBQ]].
- Paper 6A's inventory unit sends students back to this chapter (FM Study Material 9.69): [[fm.wc.inventory|management of inventory, Paper 6A]].

## Exam angle

::: exam Where EOQ appeared, May 2024 to September 2026
Of the 32 new-scheme Paper 4 documents (8 past papers, 8 RTPs and 16 MTPs, May 2024 to September 2026), 25 compute an EOQ somewhere, usually with a second part (re-order level, a discount, total cost). The ones read in full for this lesson:

- **Descriptive, 3 to 6 marks.** EOQ, re-order level with a safety stock, and a 2% discount for a 30,000 lot, accepted: May 2024 Q1(a) (5 marks). EOQ and number of orders only: September 2025 Q5(b) (3 marks). EOQ from a market share and storage, interest and obsolescence rates, then the annual ordering cost: September 2026 Q1(b) (4 marks). The Study Material's 4% discount, rejected: MTP January 2026 Series II Q1(c) (4 marks). A discount schedule in rupees per order size, the re-order point with a safety stock, and the number of orders (one, two, four or five, or the EOQ's 20) that costs least: MTP January 2026 Series I Q4(b) (6 marks).
- **Multiple choice, 2 marks each, in case scenarios.** January 2026 MCQs 6–10: demand from a market share, EOQ of two materials whose carrying costs are given per month and per quarter, total annual cost at the EOQ and at another order size. Working backwards: annual demand from the EOQ (September 2024 MCQ 12), carrying cost per unit from the EOQ (January 2025 MCQ 15). MTP September 2024 Series I MCQs 1–3 (requirement from production and yield; quarterly ordering with a 2.5% discount against EOQ); MTP September 2026 Series I MCQs 6–10 (a re-order quantity 280 kg below the EOQ costs ₹244 a year more, orders "rounded off to next whole number").
- **Revision Test Papers** stretch it: a purchasing manager's bonus inside the comparison (May 2025 Q8); EOQ against a quarterly lot with a 5% volume discount (September 2025 Q7); a 1% offer rejected and the counter-offer discount solved for, at least 2.82% (September 2026 Q5).
- **Theory**: re-order quantity and EOQ inside "explain any 5 methods of inventory control by setting quantitative levels" (MTP January 2026 Series I Q6(b), 5 marks).
:::

::: exam The traps ICAI set
- Carrying cost given per month or per quarter: annualise before the formula (January 2026 MCQs 6–10; RTP September 2026 Q5, "1% per month plus ₹2 per unit per annum" is ₹14 on a ₹100 kg).
- Requirement in units of product, EOQ wanted in kg of material: multiply by material per unit and divide by the yield (MTP September 2024 Series I).
- In a discount comparison, carrying cost is recomputed at the discounted price when it is a % of price (SM 2.87: 4,000 × ₹384 × ½ × 20%).
- A safety stock does not enter the EOQ; ICAI's May 2024 comparison left it out of carrying cost under both options.
:::

::: trick Two checks on any EOQ answer
At the EOQ, annual ordering cost = annual carrying cost, and their sum = EOQ × C. If your two figures differ (beyond rounding of the number of orders), the EOQ or one of the costs is wrong. Conditions: the basic model, with C a constant cost per unit per annum and no discount.
:::

## Answer frame

### "Explain EOQ" or "Write a short note on EOQ"

1. Re-order quantity: the quantity for which the purchase requisition is made; it should be where the total of carrying cost and ordering cost is at minimum.
2. Definition: the size of an order for which the total of ordering and carrying cost is minimum.
3. Ordering cost, with ICAI's examples; carrying cost, with ICAI's examples.
4. Formula with A, O and C named.
5. The four assumptions, in order.
6. A sketch of the two cost curves and their total, lowest at the EOQ.

### The numerical parts: three answers to the same discount question

::: cols
**Loses marks**

"EOQ = 30,000. Discount saves ₹72,000 on price, so accept."

The price saving alone; ordering and carrying costs ignored.
---
**Passes**

EOQ computed, then the ordering-plus-carrying cost of each option compared: ₹30,000 at EOQ against ₹91,600, "so reject".

Method shown, but the purchase cost is left out: the wrong advice.
---
**Full marks**

Data line (A, O, C with its build-up), formula, EOQ; the two-column statement with purchase, ordering and carrying cost (carrying cost at the discounted price); total; "Advise – …" with the saving in rupees.
:::

## Common mistakes

::: mistake Hall of Shame: the carrying cost that forgot the price
"Carrying cost 10%" plugged in as C = 0.10 gives an EOQ of about 94,868 kulhads instead of 30,000. **Fix:** C is rupees per unit per annum: 10% × ₹10 = ₹1. Add every rate first, then multiply by the price, then add any fixed ₹ per unit.
:::

::: mistake The monthly figure that stayed monthly
Using 60,000 kulhads a month as A, or a 1% monthly interest rate as 1% a year. **Fix:** A and C must both be per annum: 60,000 × 12, and 1% × 12.
:::

::: mistake Carrying cost on the whole order
Charging carrying cost on Q instead of Q ÷ 2 doubles it. **Fix:** stock runs down from Q to nil, so the average inventory is Q ÷ 2 (plus nothing for a safety stock in ICAI's comparisons).
:::

::: mistake The discount compared without the price
Comparing only ordering plus carrying cost always "proves" EOQ is best, since EOQ minimises exactly those two. **Fix:** a discount changes the purchase cost, so the comparison must include A × price under each option.
:::

## Practice

::: quiz Check yourself
Q: Tapri's samosa factory uses 24,000 kg of refined flour a year. Each order costs ₹300 to place, flour costs ₹400 a kg and the carrying cost is 10% of the price per annum. What is the EOQ in kg?
= 600
> C = 10% × ₹400 = ₹40. EOQ = √(2 × 24,000 × 300 ÷ 40) = √3,60,000 = 600 kg.

Q: A material's EOQ is 800 units, the cost of placing an order is ₹160 and the carrying cost is ₹5 per unit per annum. What is the annual demand?
- [ ] 20,000 units
- [x] 10,000 units
- [ ] 1,02,40,000 units
- [ ] 12.5 units
> EOQ² = 2AO ÷ C, so A = EOQ² × C ÷ 2O = 6,40,000 × 5 ÷ 320 = 10,000. Leaving out the 2 gives 20,000; swapping O and C gives 1,02,40,000; not squaring the EOQ gives 12.5.

Q: Case scenario. Tapri's cold-chain division buys 4,000 crates a year at ₹500 each. Ordering cost is ₹500 per order and carrying cost 20% of the price per annum, so it orders its EOQ of 200 crates. The supplier offers a 2% discount on orders of 1,000 crates. Ritu must advise Kesar. Which of the following is correct?
- [ ] Reject: carrying cost rises by ₹39,000
- [x] Accept: total annual cost falls by ₹9,000
- [ ] Accept: total annual cost falls by ₹8,000
- [ ] Reject: ordering and carrying cost together rise by ₹31,000
> At EOQ: ₹20,00,000 + ₹10,000 + ₹10,000 = ₹20,20,000. At 1,000 crates: ₹19,60,000 + (4 × ₹500) ₹2,000 + (500 × 20% of ₹490) ₹49,000 = ₹20,11,000, ₹9,000 less. ₹8,000 charges carrying cost at the old price; the two "reject" options leave out the ₹40,000 saved on price.

Q: Which of these are carrying costs of inventory? Select all that apply.
- [x] Interest on the funds invested in inventory
- [x] Insurance of the stock in the godown
- [ ] Cost of inviting quotations
- [x] Obsolescence of stored material
- [ ] Inspection of material on receipt
> Carrying costs are those of holding stock: cost of funds, storage, insurance, obsolescence. Quotations, purchase orders, transportation and inspection are ordering costs (SM 2.23).

Q: A component's EOQ is 1,000 units when it costs ₹100 and carrying cost is 20% of the price per annum. The price rises to ₹400 and nothing else changes. What is the new EOQ?
- [ ] 250 units
- [x] 500 units
- [ ] 1,000 units
- [ ] 2,000 units
> C rises fourfold (₹20 to ₹80), and the EOQ moves with 1 ÷ √C: 1,000 ÷ √4 = 500. Dividing by 4 forgets the square root; "unchanged" forgets that C is a % of price.
:::

## Recap

- EOQ = √(2AO ÷ C): A annual requirement, O cost per order, C carrying cost per unit per annum.
- EOQ: the size of an order for which the total of ordering and carrying cost is minimum; at it, the two are equal.
- Ordering cost: quotations, purchase orders, procurement staff, transportation, inspection. Carrying cost: cost of funds, storage, insurance, obsolescence.
- C = (sum of annual rates × price) + fixed ₹ per unit; annualise monthly and quarterly rates first.
- Orders = A ÷ Q; ordering cost = A ÷ Q × O; carrying cost = Q ÷ 2 × C; total = A × price + both.
- Assumptions: costs known and fixed; usage known; price constant; lead time zero.
- Quantity discount: compare total cost including purchase cost, carrying cost at the discounted price; with price breaks (EOQ in the base band), test EOQ and each band's lowest quantity.
- Fractional orders: round up, and say so. (Two mandi trips a week, not one a month.)

## Flashcards

Q:: Formula: Economic Order Quantity?
A:: EOQ = √(2AO ÷ C), where A = annual requirement, O = cost per order, C = carrying cost per unit per annum.

Q:: ICAI's definition of Economic Order Quantity?
A:: The size of an order for which total of ordering and carrying cost are minimum.

Q:: Give ICAI's examples of ordering costs.
A:: Cost to invite quotations, documentation such as preparing purchase orders, employee cost directly attributable to procurement, transportation and inspection cost.

Q:: Give ICAI's examples of carrying costs.
A:: Cost of fund invested in inventories, cost of storage, insurance cost and obsolescence.

Q:: The four assumptions underlying EOQ, in ICAI's order?
A:: (i) Ordering cost per order and carrying cost per unit per annum are known and fixed; (ii) anticipated usage in units is known; (iii) cost per unit of material is constant and known; (iv) the quantity ordered is received immediately (lead time zero).

Q:: At the EOQ, how do annual ordering cost and annual carrying cost compare?
A:: They are equal, and their sum equals EOQ × carrying cost per unit per annum (basic model).

Q:: How is a quantity discount offer evaluated?
A:: Compare total annual cost (purchase cost + ordering cost + carrying cost) at the EOQ with that at the discount order size, carrying cost on the discounted price; accept if the total is lower.

Q:: Storage 2%, interest 12% and obsolescence 6% per annum on a ₹20 unit: carrying cost per unit per annum?
A:: 20% × ₹20 = ₹4 per unit per annum (SM Illustration 4).

Q:: With several price breaks, which order sizes are tested?
A:: When the EOQ at the basic price falls in the undiscounted band: the EOQ and the lowest order quantity of each discount band; the one with the lowest total cost is the most economical purchase level.

Q:: Carrying cost is a % of price. The price is multiplied by 4: what happens to the EOQ?
A:: It halves, because EOQ moves with 1 ÷ √C.
