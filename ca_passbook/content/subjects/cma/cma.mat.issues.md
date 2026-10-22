---
id: cma.mat.issues
title: Pricing material issues: FIFO, LIFO and average methods
minutes: 30
needs: cma.mat.receipts
tags: FIFO, LIFO, weighted average, simple average, stores ledger, pricing of issues, material returns, stock shortage
labs: stores-ledger
summary: The same kilos bought at different prices: how FIFO, LIFO and the average methods price each issue and the closing stock, and how returns, transfers and shortages enter the stores ledger.
---

## In plain words

### Which sugar went to the café?

Tapri's store has two lots of sugar: 100 kg bought last month at ₹40 a kg, and 100 kg bought this week at ₹44. The Bhopal café asks for 120 kg.

> **Kesar:** So what did the café's sugar cost?
> **Ritu:** That depends on which kilos you say left the store.
> **Kesar:** Sugar is sugar!
> **Ritu:** Exactly. The kilos are identical, so the books need a rule.

The physical sugar is identical; only the price tags differ. A **method of pricing issues** is the rule that decides which price tag goes out with each issue and which stays on the closing stock.

| Rule | The 120 kg issued | The 80 kg left |
|---|---:|---:|
| **FIFO**: oldest price first (100 at ₹40, 20 at ₹44) | ₹4,880 | ₹3,520 |
| **LIFO**: newest price first (100 at ₹44, 20 at ₹40) | ₹5,200 | ₹3,200 |
| **Weighted average**: one blended price, ₹8,400 ÷ 200 = ₹42 | ₹5,040 | ₹3,360 |

All three hand out the same ₹8,400 in total, split differently between what was used and what is left. When prices are rising, FIFO charges production the old, cheaper prices and leaves the dearer ones in stock; LIFO does the opposite; the average sits between them.

The record that carries these prices is the **stores ledger**: for every material, each receipt, issue and balance in quantity, rate and amount.

::: analogy The ticket queue, the plate stack and the milk pot
FIFO is the queue at a railway ticket counter: whoever came first is served first. LIFO is the stack of washed plates: the last one put on top is the first one picked up. Weighted average is the big milk pot at the café: every new can is poured in, and each glass served carries the same blended cost.
:::

::: key
A pricing method decides which purchase price each issue carries; the total of issues and closing stock is always the same. In rising prices, FIFO gives the lowest cost of issues and the highest closing stock, LIFO the reverse, and the weighted average falls in between.
:::

## How it works

Materials issued "should be priced at the value at which they are carried in stock", but lots are bought at different times, prices, discounts and taxes, so a method is needed (SM 2.49). The cost accountant chooses it considering: (1) the frequency of purchases, price fluctuations and their range; (2) the frequency of issues and relative quantity; (3) the nature of the cost accounting system; (4) the nature of business and the type of production process; (5) management policy on the valuation of closing stock.

::: diagram ICAI's four groups of pricing methods (SM 2.50–2.62)
{"type": "layers", "layers": [
  {"label": "Cost price methods", "note": "specific price, FIFO, LIFO, base stock"},
  {"label": "Average price methods", "note": "simple average, weighted average"},
  {"label": "Market price methods", "note": "replacement price, realisable price"},
  {"label": "Notional price methods", "note": "standard price, inflated price, re-use price"}]}
:::

### The three you will compute

::: steps
1. **First-in first-out (FIFO)**: issues are priced "in the order in which they are purchased": the items longest in stock go out first, so the closing stock is at the latest prices. ICAI calls it suitable when prices are falling (the charge to production is high while replacement cost is low); when prices rise, the charge to production lags behind replacement cost (SM 2.50).
2. **Last-in first-out (LIFO)**: the last lot purchased is issued first, until it is exhausted, then the earlier lot. In rising prices the cost of production is close to current prices and profits are not overstated. ==LIFO is not permitted under AS 2 and Ind AS 2==; the Study Material keeps it for academic knowledge, and notes that it is not acceptable to the income tax authorities (SM 2.52–2.53).
3. **Weighted average price**: the issue price is the total cost of the material in stock divided by the total quantity, recomputed every time a new lot is received; issues between receipts go out at the same rate (SM 2.60–2.61). It smooths price fluctuations.
:::

### The rest, in one line each

- **Specific price**: material bought for a specific job is issued to it at its own purchase price; each lot is stored and accounted separately (SM 2.50).
- **Base stock**: a minimum quantity is always held at the price of the first lot; the rest is priced by FIFO or LIFO, so it is not an independent method (SM 2.59).
- **Simple average**: total of the lot prices ÷ number of lots, ignoring quantities; a lot already fully issued is left out. Suitable when lots are uniform in size and prices do not fluctuate much (SM 2.59).
- **Replacement price**: the price at which an identical item could be bought now; useful in rising prices. **Realisable price**: the price at which the material could be sold (SM 2.61).
- **Standard price**: a predetermined rate, set from current prices, market trends, discounts and transport charges; it simplifies pricing and measures purchase efficiency (SM 2.62; [[cma.std.material|material variances]]). **Inflated price**: raised to cover natural losses such as evaporation. **Re-use price**: for rejected or re-used material.

### Returns, transfers and shortages in the stores ledger

| Event | Entry in the stores ledger |
|---|---|
| Material **returned to the vendor** | Issue column. The price includes the invoice price plus freight, receiving and handling charges. Strictly it should go at the stores ledger price, but in practice the invoice price (the price of the lot returned) is used, as ICAI's solutions do (SM 2.69, 2.94); the gap between the two is charged as overhead or to an inventory adjustment account (SM 2.63). |
| Material **returned to stores** by a department | Receipt column at the price at which it was originally issued: held in suspense for the next requisition, or merged with stock as a fresh purchase at that price (SM 2.63). |
| **Transfer** between jobs or departments | No entry in the stock balance: the material does not pass through the store; the jobs' cost accounts are adjusted (SM 2.48, 2.93). |
| **Replacement** received from the vendor | A fresh receipt (SM 2.93). |
| **Shortage** found on physical verification | Issue column, at the rate of the method in use (SM 2.63). |
| **Abnormal loss** (pilferage, theft) | Issue column at the current rate; charged to Costing P&L (SM 2.69). |
| **Normal loss** (rusting, breakage, evaporation) | Quantity reduced, value kept: the good units absorb it and the rate rises (SM 2.69). |

::: lab stores-ledger {"method":"fifo"}
Step through a cardamom ledger with every one of these entries posted row by row, then switch the method and watch the issue prices change.
:::

## Formats and formulas

### The stores ledger

ICAI's layout: Date | Receipts (GRN or return note no., Qty, Rate, Amount) | Issues (requisition no., Qty, Rate, Amount) | Balance (Qty, Rate, Amount). *Rule these columns from memory; in this lesson each group is written as "qty @ rate = amount" so it reads on a phone.*

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| | GRN no., qty @ rate = amount | MR no., qty @ rate = amount | qty @ rate = amount |

::: formula Weighted average price
$$\text{Rate} = \frac{\text{Total cost in stock}}{\text{Total units in stock}}$$
Recompute after every receipt (SM 2.61, 2.75).
:::

::: formula Simple average price
$$\text{Rate} = \frac{\text{Sum of the lot prices}}{\text{Number of lots}}$$
ICAI: total of unit price of each purchase ÷ total number of purchases. Lots already fully issued are left out of the average (SM 2.59, 2.75).
:::

::: compare FIFO, LIFO and weighted average when prices are rising
| Point | FIFO | LIFO | Weighted average |
|---|---|---|---|
| Cost of material issued | Lowest (old prices) | Highest (latest prices) | In between |
| Closing stock | Highest, near current price | Lowest, at oldest prices | In between |
| Profit shown | Highest | Lowest | In between |
:::

In falling prices all three rows swap between FIFO and LIFO.

## Worked examples

::::: example Elaichi after a bumper harvest: the three methods when prices fall
Tapri's masala unit buys green cardamom (elaichi) for its masala chai premix. A bumper crop has pushed prices down all month. Transactions for 1 to 20 March:

| Date | Particulars | Kg | Rate (₹) |
|---|---|---:|---:|
| 1 Mar | Opening stock | 300 | 2,400 |
| 4 Mar | Purchased | 450 | 2,300 |
| 7 Mar | Issued | 550 | |
| 11 Mar | Purchased | 300 | 2,150 |
| 13 Mar | Issued | 250 | |
| 16 Mar | Issued | 150 | |
| 18 Mar | Purchased | 300 | 2,000 |
| 20 Mar | Issued | 250 | |

On 20 March the market price of cardamom is ₹2,000 a kg. Tapri values its stock at cost or market price, whichever is lower.

**Required:**

(i) Calculate the value of cardamom issued during 1 to 20 March and of the stock on 20 March under FIFO, LIFO and the weighted average method.

(ii) Under which method(s) must the stock on 20 March be written down to market price, and by how much?

(iii) Which of the three methods suits a period of falling prices such as this one? Give reasons.

:::: answer Show the working
**FIFO**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Mar | | | 300 @ 2,400 = 7,20,000 |
| 4 Mar | 450 @ 2,300 = 10,35,000 | | 300 @ 2,400 + 450 @ 2,300 = 17,55,000 |
| 7 Mar | | 300 @ 2,400 + 250 @ 2,300 = 12,95,000 | 200 @ 2,300 = 4,60,000 |
| 11 Mar | 300 @ 2,150 = 6,45,000 | | 200 @ 2,300 + 300 @ 2,150 = 11,05,000 |
| 13 Mar | | 200 @ 2,300 + 50 @ 2,150 = 5,67,500 | 250 @ 2,150 = 5,37,500 |
| 16 Mar | | 150 @ 2,150 = 3,22,500 | 100 @ 2,150 = 2,15,000 |
| 18 Mar | 300 @ 2,000 = 6,00,000 | | 100 @ 2,150 + 300 @ 2,000 = 8,15,000 |
| 20 Mar | | 100 @ 2,150 + 150 @ 2,000 = 5,15,000 | 150 @ 2,000 = 3,00,000 |

**LIFO**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Mar | | | 300 @ 2,400 = 7,20,000 |
| 4 Mar | 450 @ 2,300 = 10,35,000 | | 300 @ 2,400 + 450 @ 2,300 = 17,55,000 |
| 7 Mar | | 450 @ 2,300 + 100 @ 2,400 = 12,75,000 | 200 @ 2,400 = 4,80,000 |
| 11 Mar | 300 @ 2,150 = 6,45,000 | | 200 @ 2,400 + 300 @ 2,150 = 11,25,000 |
| 13 Mar | | 250 @ 2,150 = 5,37,500 | 200 @ 2,400 + 50 @ 2,150 = 5,87,500 |
| 16 Mar | | 50 @ 2,150 + 100 @ 2,400 = 3,47,500 | 100 @ 2,400 = 2,40,000 |
| 18 Mar | 300 @ 2,000 = 6,00,000 | | 100 @ 2,400 + 300 @ 2,000 = 8,40,000 |
| 20 Mar | | 250 @ 2,000 = 5,00,000 | 100 @ 2,400 + 50 @ 2,000 = 3,40,000 |

**Weighted average** (rate recomputed after each receipt; the 13 and 16 March issues share one rate because no lot arrived between them)

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Mar | | | 300 @ 2,400.00 = 7,20,000 |
| 4 Mar | 450 @ 2,300 = 10,35,000 | | 750 @ 2,340.00 = 17,55,000 |
| 7 Mar | | 550 @ 2,340.00 = 12,87,000 | 200 @ 2,340.00 = 4,68,000 |
| 11 Mar | 300 @ 2,150 = 6,45,000 | | 500 @ 2,226.00 = 11,13,000 |
| 13 Mar | | 250 @ 2,226.00 = 5,56,500 | 250 @ 2,226.00 = 5,56,500 |
| 16 Mar | | 150 @ 2,226.00 = 3,33,900 | 100 @ 2,226.00 = 2,22,600 |
| 18 Mar | 300 @ 2,000 = 6,00,000 | | 400 @ 2,056.50 = 8,22,600 |
| 20 Mar | | 250 @ 2,056.50 = 5,14,125 | 150 @ 2,056.50 = 3,08,475 |

**(i) Summary**

| Method | Cardamom issued (₹) | Stock on 20 Mar (₹) | Total (₹) |
|---|---:|---:|---:|
| FIFO | 27,00,000 | 3,00,000 | 30,00,000 |
| LIFO | 26,60,000 | 3,40,000 | 30,00,000 |
| Weighted average | 26,91,525 | 3,08,475 | 30,00,000 |

**(ii) Write-down to market price.** Market value of the 150 kg = 150 × ₹2,000 = ₹3,00,000.

| Method | Cost of stock (₹) | Market value (₹) | Write-down (₹) |
|---|---:|---:|---:|
| FIFO | 3,00,000 | 3,00,000 | Nil |
| LIFO | 3,40,000 | 3,00,000 | 40,000 |
| Weighted average | 3,08,475 | 3,00,000 | 8,475 |

::: diagram Cost of the 150 kg in stock on 20 March against its market value
{"type": "plot", "h": 260, "x": [0.4, 3.6], "y": [0, 400000], "ylabel": "amount (₹)",
 "xticks": [[1, "FIFO"], [2, "LIFO"], [3, "weighted average"]],
 "yticks": [[0, "0"], [100000, "1,00,000"], [200000, "2,00,000"], [300000, "3,00,000"], [400000, "4,00,000"]],
 "series": [{"label": "cost of closing stock", "bars": true, "values": true, "color": "e",
   "pts": [[1, 300000, "3,00,000"], [2, 340000, "3,40,000"], [3, 308475, "3,08,475"]]},
  {"label": "market value", "color": "bad", "dash": true, "pts": [[0.4, 300000], [3.6, 300000]]}],
 "legend": "outside",
 "caption": "Bars: the cost of the same 150 kg under each method. Dashed rose line: its market value. LIFO's stock still holds 100 kg of the opening lot at ₹2,400."}
:::

**(iii) Method for falling prices.** FIFO. The Study Material considers FIFO suitable in times of falling prices because the material cost charged to production is high while the replacement cost of materials is low (SM 2.50), and under FIFO the closing stock is represented very closely at current market price (SM 2.51): here it needs no write-down. LIFO charges production the latest, lowest prices, so profit tends to rise, but the stock is left at the oldest, highest prices and has to be written down considerably to follow the principle of cost or market price, whichever is lower (SM 2.53): ₹40,000 here. The weighted average lies in between. In every method, issues plus closing stock equal opening stock plus purchases, ₹30,00,000.
::::
:::::

::: lab stores-ledger {"method":"lifo","unit":"units","txns":"1-4 opening 100 @ 5\n5-4 receipt 300 @ 6\n6-4 issue 250\n8-4 receipt 500 @ 7\n10-4 issue 400\n12-4 receipt 600 @ 8\n14-4 issue 500"}
Here is Study Material Illustration 13 under LIFO; switch the method to FIFO to see the other half of ICAI's answer.
:::

:::: example Packing film in April: a weighted average ledger with a late return
Tapri's premix plant in Indore prices issues of laminated packing film (in rolls) by the weighted average method. April transactions:

| Date | Particulars | Rolls |
|---|---|---:|
| 1 Apr | Opening stock @ ₹150 | 1,600 |
| 3 Apr | Issued to Line A, MR 211 | 1,000 |
| 6 Apr | Received, GRN 41 (see note below) | 3,000 |
| 9 Apr | Issued to Line B, MR 212 | 2,000 |
| 12 Apr | Transferred from Line B to Line A, MTN 5 | 100 |
| 14 Apr | Received, GRN 42, @ ₹164 | 2,000 |
| 16 Apr | Returned unused by Line A (against MR 211), MRR 7 | 150 |
| 21 Apr | Issued to Line B, MR 215 | 2,200 |
| 27 Apr | Issued to Line A, MR 218 | 1,200 |

GRN 41: invoice price ₹4,80,000 less 5% trade discount, plus GST (input tax credit is available) and freight of ₹12,000 for the lot. On 30 April the physical count shows 340 rolls; the 10 missing rolls were crushed by a forklift driven carelessly.

**Required:**

(i) Prepare the stores ledger for April.

(ii) Calculate the net cost of film charged to Line A and to Line B for April.

(iii) Line A's foreman wants the 150 returned rolls credited at the average rate standing on 16 April, "because that is what they are worth today". Comment, showing where the difference would go.

::: answer Show the working
**Cost of GRN 41.** ₹4,80,000 − 5% trade discount ₹24,000 + freight ₹12,000 = ₹4,68,000 (GST is left out because input tax credit is available) = ₹156 per roll.

**Stores ledger: packing film (weighted average method)**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Apr | | | 1,600 @ 150.00 = 2,40,000 |
| 3 Apr | | MR 211: 1,000 @ 150.00 = 1,50,000 | 600 @ 150.00 = 90,000 |
| 6 Apr | GRN 41: 3,000 @ 156.00 = 4,68,000 | | 3,600 @ 155.00 = 5,58,000 |
| 9 Apr | | MR 212: 2,000 @ 155.00 = 3,10,000 | 1,600 @ 155.00 = 2,48,000 |
| 14 Apr | GRN 42: 2,000 @ 164.00 = 3,28,000 | | 3,600 @ 160.00 = 5,76,000 |
| 16 Apr | MRR 7: 150 @ 150.00 = 22,500 | | 3,750 @ 159.60 = 5,98,500 |
| 21 Apr | | MR 215: 2,200 @ 159.60 = 3,51,120 | 1,550 @ 159.60 = 2,47,380 |
| 27 Apr | | MR 218: 1,200 @ 159.60 = 1,91,520 | 350 @ 159.60 = 55,860 |
| 30 Apr | | Abnormal loss: 10 @ 159.60 = 1,596 | 340 @ 159.60 = 54,264 |

Working notes:

1. The return from Line A is a receipt at the price at which those rolls were issued on 3 April, ₹150, not at the ₹160 standing on 16 April. Because it comes in below the current average, the rate is recomputed: ₹5,98,500 ÷ 3,750 = ₹159.60.
2. The transfer of 100 rolls from Line B to Line A does not pass through the store, so the stores ledger has no entry; the cost accounts move 100 × ₹155 (the rate at which Line B received them on 9 April) = ₹15,500 from Line B to Line A.
3. The 10 rolls crushed by a careless forklift are a shortage found on physical verification, entered in the issue column at the current rate. The cause is abnormal, so ₹1,596 goes to the Costing Profit and Loss Account.

Check: opening ₹2,40,000 + receipts ₹8,18,500 = issues ₹10,02,640 + abnormal loss ₹1,596 + closing ₹54,264 = ₹10,58,500.

**(ii) Net cost of film charged to each line**

| Particulars | Line A (₹) | Line B (₹) |
|---|---:|---:|
| Issues (MR 211, 218 / MR 212, 215) | 3,41,520 | 6,61,120 |
| Less: returned to stores (MRR 7) | (22,500) | — |
| Add / (less): transfer MTN 5 | 15,500 | (15,500) |
| **Net cost of film** | **3,34,520** | **6,45,620** |

The two lines together carry ₹9,80,140 = issues ₹10,02,640 − return ₹22,500.

**(iii) Comment.** The foreman is not correct. Material returned to stores is entered in the receipt column at the price at which it was originally issued (SM 2.63), so Line A gets back exactly the ₹150 a roll it was charged. A credit at ₹160 would give Line A ₹1,500 more than it was ever charged (150 × ₹10), cutting its cost below what it actually used. The store's average would become ₹6,00,000 ÷ 3,750 = ₹160.00 instead of ₹159.60, so the ₹1,500 would be shifted to later issues and stock: 2,200 × ₹0.40 = ₹880 to Line B (MR 215), 1,200 × ₹0.40 = ₹480 back to Line A (MR 218) and 350 × ₹0.40 = ₹140 to the 350 rolls in stock on 27 April.
:::
::::

::::: example Dev's claim: "one lot a month, so the method makes no difference"
Sugar at Tapri's sweets unit, January to March (no opening stock on 1 January):

| Date | Particulars | Kg | Rate (₹) |
|---|---|---:|---:|
| 2 Jan | Purchased | 800 | 40 |
| 10 Jan | Issued | 300 | |
| 25 Jan | Issued | 300 | |
| 3 Feb | Issued | 200 | |
| 5 Feb | Purchased | 900 | 42 |
| 15 Feb | Issued | 500 | |
| 26 Feb | Issued | 250 | |
| 4 Mar | Purchased | 600 | 45 |
| 12 Mar | Issued | 400 | |
| 28 Mar | Issued | 300 | |

Dev tells the board: "We buy only one lot of sugar a month, so FIFO, LIFO and the weighted average must give the same value for every issue and for the closing stock. The choice of method makes no difference to us."

**Required:**

(i) Examine Dev's claim month by month. (Stores ledgers are not required.)

(ii) Calculate the value of the March issues and of the stock on 31 March under FIFO, LIFO and the weighted average method.

:::: answer Model answer
**(i) Month by month.** A method of pricing issues matters only when the store holds two or more lots at different prices at the time of an issue; the number of purchases in a month does not decide it.

- **January:** the only lot on hand is the 800 kg bought at ₹40 on 2 January. Both January issues (600 kg) can only be priced at ₹40, under every method: ₹24,000. The 200 kg left on 31 January are also at ₹40.
- **February:** the 3 February issue of 200 kg clears the January lot before the February lot arrives on 5 February, so again only one lot is ever on hand. Issues: 200 × ₹40 + 750 × ₹42 = ₹39,500 under every method, and 150 kg at ₹42 remain on 28 February. Dev is right for January and February, even though the stock was not nil at either month-end.
- **March:** the March lot (600 kg at ₹45) arrives on 4 March while 150 kg of the February lot (₹42) is still in the store. From here two lots are held together, so the methods give different figures. Dev's claim fails for March.

**(ii) March issues and closing stock**

| Method | 12 Mar issue (400 kg) | 28 Mar issue (300 kg) | Stock on 31 Mar (50 kg) |
|---|---|---|---|
| FIFO | 150 @ 42 + 250 @ 45 = ₹17,550 | 300 @ 45 = ₹13,500 | 50 @ 45 = ₹2,250 |
| LIFO | 400 @ 45 = ₹18,000 | 200 @ 45 + 100 @ 42 = ₹13,200 | 50 @ 42 = ₹2,100 |
| Weighted average | 400 @ 44.40 = ₹17,760 | 300 @ 44.40 = ₹13,320 | 50 @ 44.40 = ₹2,220 |

Weighted average rate on 4 March = (150 × ₹42 + 600 × ₹45) ÷ 750 = ₹33,300 ÷ 750 = ₹44.40.

March issues: FIFO ₹31,050, LIFO ₹31,200, weighted average ₹31,080. Under each method, March issues plus closing stock = ₹6,300 + ₹27,000 = ₹33,300. Conclusion: Dev's claim holds only while a single lot is on hand at each issue. Once two lots sit together, as in March, the method changes both the cost of issues and the closing stock.
::::
:::::

## Under the hood

### Advantages and disadvantages, in ICAI's points

| Method | Advantages | Disadvantages |
|---|---|---|
| Specific price | Issues to specific jobs at actual and correct cost; best suited for non-standard and specific products | Difficult to operate when purchases and issues are numerous |
| FIFO | Simple to operate; charges actual cost; better results when prices fall; closing stock close to current market price | Clerical errors when prices fluctuate; the same job's cost varies period to period; in rising prices real profits are low while book profits look high |
| LIFO | Issues near current market price, matching cost with current revenue; no undue profit in rising prices; in falling prices profit rises yet products are competitive; irons out profit fluctuations; avoids undue taxes in inflation | Cumbersome with frequent purchases at fluctuating rates; similar batches costed differently; stock written down in falling prices; not acceptable to tax authorities |
| Simple average | Simple when lots are of standard quantity; near market price when prices are stable | Wrong stock values when lots differ in size; far from market price when prices fluctuate |
| Weighted average | Smooths price fluctuations; issue price changes only when a new lot arrives | Not actual cost price, so a different profit or loss arises; recomputed at every receipt |
| Standard price | Simplifies pricing; controls material cost and judges purchase efficiency; less clerical work | Does not reflect market price; hard to fix when prices fluctuate |

### When the method does not matter

If each month has one purchase and one issue and no opening stock carries over, every method gives the same closing stock, because there is never a choice of lots (Illustration 12, SM 2.54). The moment two lots sit together, the method decides the figure.

### Physical issue vs pricing

The issue procedure says material should physically go out of the earliest lot, so that it does not deteriorate (SM 2.47). The pricing method is a separate choice: "in FIFO method, physical flow of the material is irrelevant, and issue price is based on first in first out" (SM 2.93). So a store can physically issue the oldest sacks and still price the issues by another method. FIFO and weighted average also appear in [[cma.proc.eu|equivalent units in process costing]]: a different calculation with the same idea of which costs go first.

## Exam angle

### What ICAI asks from this topic

::: exam Where pricing of issues appeared, May 2024 to September 2026 (and the old scheme)
- **One-step MCQs, 2 marks**: January 2026 MCQ 14 (value of material consumed under LIFO, one issue against three lots); September 2026 MCQ 13 (value of one issue under FIFO after several receipts).
- **Inside a case scenario**: MTP Series I for September 2025, MCQs 1 to 5: closing raw material under FIFO when the price rose mid-period, feeding a cost sheet.
- **Full priced stores ledger, 10 marks**: May 2023 (old scheme) Q2(a), FIFO with month-wise purchases; MTP Series II for November 2022 (old scheme) Q5(b), weighted average with shortages reported by the stock verifier; RTP May 2020 (old scheme) Q1, weighted average with goods received and material returned notes, plus stock levels.
- **True or false**: November 2023 (old scheme) Q6(b): "Under LIFO, in falling prices, lower income is reported" (false: profit tends to rise) and "Simple average suits lots of different quantity with fluctuating prices" (false).
:::

::: exam The traps
- Under the weighted average, **recompute after every receipt**, including a return from a department; issues between receipts use the same rate.
- A transfer between jobs or departments is **not** a stores ledger entry.
- Shortages: ICAI's answers differ. The Study Material enters a verification shortage in the issue column at the method's rate (SM 2.63); one old MTP treated unexplained shortages as absorbed (quantity cut, value kept). If the cause is given, use it: abnormal to Costing P&L, normal absorbed. If not, state your assumption.
- Rates to two decimals; amounts = quantity × the rounded rate, as in ICAI's Illustration 14.
:::

::: trick FIFO fills the cupboard with the latest prices
Whatever the dates, FIFO's closing stock is priced at the most recent purchases (as far back as needed to cover the quantity), and LIFO's at the oldest lots still standing. So for a FIFO closing stock you can skip the ledger: take the closing quantity from the latest receipts backwards. Holds as long as no returns or shortages intervene; LIFO's closing stock depends on the timing of issues, so it always needs the ledger.
:::

## Answer frame

### "Which method would you prefer, and why?" (as in TYK 9, SM 2.96)

1. Compare the cost charged to each job and the closing stock under each method (a small table).
2. Rising prices: FIFO charges least and leaves the highest closing stock (higher profit); LIFO the reverse (lower profit).
3. The weighted average evens out fluctuations: issues and stock show greater uniformity.
4. Conclude with the method you prefer and why: ICAI's own answer prefers the weighted average for the reason in point 3. Add that LIFO is not permitted under AS 2 and Ind AS 2.

### "When and why would you recommend LIFO?" (Illustration 12, SM 2.55)

When prices are rising: issues are close to current market price, so the cost of production matches current sales revenue; profit is not unduly high; in falling prices the products appear competitive; and in inflation it shows the correct profit and avoids paying undue taxes to some extent. Add that it is not permitted under AS 2 and Ind AS 2.

## Common mistakes

::: mistake Hall of Shame: the average that never moved
Computing one average for the whole month (total purchases ÷ total quantity) and pricing every issue at it. That is not ICAI's weighted average method, which recomputes the rate after each receipt. **Fix:** a new rate after every receipt; issues carry the rate standing on their date.
:::

::: mistake The return priced at today's rate
Pricing a department's returned material at the current average instead of the rate at which it was issued, or pricing a return to the supplier at the ledger average when the question gives the lot. **Fix:** returns to stores at the original issue price; returns to the vendor at the price of that lot, as ICAI's solutions do.
:::

::: mistake The transfer that was booked twice
Showing a job-to-job transfer as an issue and a receipt in the stores ledger. **Fix:** no entry in the stores ledger; adjust the two jobs in the cost accounts.
:::

## Practice

::: quiz Check yourself
Q: Ghee at the sweets unit: opening stock 300 kg at ₹80; 2 June, issued 200 kg; 5 June, purchased 500 kg at ₹90; 9 June, issued 450 kg. What is the value of the stock left on 10 June under LIFO, in rupees?
= 12500
> LIFO prices each issue from the latest lot on hand at the time. On 2 June only the opening lot exists: 200 kg at ₹80 go out, leaving 100 kg at ₹80. On 9 June the 450 kg come from the 5 June lot at ₹90, leaving 50 kg of it. Stock: 100 × ₹80 + 50 × ₹90 = ₹12,500. Pricing all 150 kg at the oldest rate (₹12,000) ignores the issue made before the purchase arrived; FIFO would leave 150 × ₹90 = ₹13,500.

Q: Case scenario. Ritu prices chai premix by the weighted average method. On 1 June the store holds 1,000 kg at ₹120; on 4 June it receives 3,000 kg at ₹128; on 6 June it issues 2,000 kg; on 8 June the Pune café returns 200 kg unused out of that issue. Which statement is correct?
- [ ] The 6 June issue is priced at ₹124, the simple average of the two lots.
- [x] The 6 June issue is priced at ₹126 and the 8 June return is received at ₹126.
- [ ] The 6 June issue is priced at ₹128, the latest price.
- [ ] The 8 June return is received at ₹120, the oldest price.
> Weighted average = (₹1,20,000 + ₹3,84,000) ÷ 4,000 kg = ₹126. A return from a department goes back at the price at which it was issued, ₹126. ₹124 ignores quantities; ₹128 is LIFO's first price.

Q: In a period of rising prices, which method gives the lowest value of closing stock?
- [ ] FIFO
- [x] LIFO
- [ ] Weighted average
- [ ] Replacement price
> LIFO issues the latest (dearest) lots first, so the closing stock is left at the oldest, cheapest prices. FIFO leaves the newest prices in stock.

Q: Which of these need NO entry in the stores ledger? Select all that apply.
- [x] Transfer of surplus material from Job 14 to Job 19
- [ ] Return of surplus material from Job 14 to the store
- [ ] Return of defective material to the supplier after the goods received note
- [x] Return of material to the supplier at the gate, before the receiving report
> A job-to-job transfer never passes through the store, and goods rejected before the receiving report never entered the stores ledger. A return to store is a receipt; a return to the supplier after the receiving report is shown in the issue column.

Q: Lots bought in April: 100 units at ₹10, 300 at ₹12 and 100 at ₹17; no lot is yet fully issued. What is the issue price under the simple average method, in rupees?
= 13
> Simple average = (₹10 + ₹12 + ₹17) ÷ 3 = ₹13; quantities are ignored. The weighted average would be ₹6,300 ÷ 500 = ₹12.60.
:::

## Recap

- A pricing method decides which purchase price each issue carries; issues + closing stock = opening stock + receipts under every method.
- FIFO: oldest prices to issues, closing stock at latest prices; suits falling prices.
- LIFO: latest prices to issues, closing stock at oldest prices; suits rising prices; not permitted under AS 2 and Ind AS 2.
- Weighted average = total cost in stock ÷ total quantity, recomputed after every receipt; smooths fluctuations.
- Simple average = total of lot prices ÷ number of lots, ignoring quantities and fully issued lots.
- Rising prices: issues FIFO < weighted average < LIFO; closing stock FIFO > weighted average > LIFO.
- Returns to stores at the original issue price; returns to vendor in the issue column; transfers between jobs: no stores ledger entry.
- Shortages: abnormal in the issue column at the current rate, to Costing P&L; normal absorbed (quantity cut, value kept). (Sugar is sugar; price tags are not.)

## Flashcards

Q:: FIFO: how are issues priced and at what price is closing stock left?
A:: Issues are priced in the order in which the materials were purchased (oldest first); the closing stock is at the price of the latest purchases.

Q:: LIFO: how are issues priced, and is it permitted under AS 2?
A:: The last lot purchased is issued first until exhausted, then the earlier lot; closing stock is at the oldest prices. LIFO is not permitted under AS 2 or Ind AS 2.

Q:: Formula: weighted average price, and when is it recomputed?
A:: Total cost of material in stock ÷ total quantity in stock; recomputed every time a new lot is received.

Q:: Simple average price method: formula and when suitable?
A:: Total of the unit prices of each purchase ÷ number of purchases (quantities ignored; fully issued lots left out). Suitable when lots are of uniform quantity and prices do not fluctuate considerably.

Q:: Which method is considered suitable in times of falling prices, and why?
A:: FIFO: the material cost charged to production is high while the replacement cost of materials is low.

Q:: ICAI's four groups of methods of pricing material issues?
A:: Cost price (specific, FIFO, LIFO, base stock); average price (simple, weighted); market price (replacement, realisable); notional price (standard, inflated, re-use).

Q:: Five factors for selecting a method of pricing issues?
A:: Frequency of purchases and price fluctuations; frequency and quantity of issues; nature of the cost accounting system; nature of business and production process; management policy on closing stock valuation.

Q:: Material returned to stores by a department: how is it priced?
A:: Entered in the receipt column at the price at which it was originally issued.

Q:: Shortage found during physical verification: how is it entered in the stores ledger?
A:: In the issue column, valued at the rate of the method adopted (FIFO or other). An abnormal loss goes to Costing P&L; a normal loss is absorbed by the good units.

Q:: Transfer of material from one job to another: stores ledger entry?
A:: None; the material does not pass through the store. Only the cost accounts of the jobs are adjusted (material transfer note).

Q:: In rising prices, rank FIFO, LIFO and weighted average by cost of materials issued.
A:: FIFO lowest, weighted average in between, LIFO highest (closing stock in the reverse order).
