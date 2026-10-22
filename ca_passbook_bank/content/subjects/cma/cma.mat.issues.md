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
| **Abnormal loss** (pilferage, theft) | Issue column at the current rate; charged to costing P&L (SM 2.69). |
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

::::: example Assam tea for a fortnight: FIFO, LIFO and weighted average
Tapri's blending unit has these transactions in Assam tea for 1 to 15 November:

| Date | Particulars | Kg | Rate (₹) |
|---|---|---:|---:|
| 1 Nov | Opening stock | 400 | 200 |
| 3 Nov | Purchased | 600 | 210 |
| 5 Nov | Issued | 700 | |
| 8 Nov | Purchased | 700 | 220 |
| 10 Nov | Issued | 600 | |
| 12 Nov | Purchased | 600 | 230 |
| 14 Nov | Issued | 700 | |

**Required:**

(i) Calculate the value of tea issued and of the stock on 15 November under FIFO, LIFO and the weighted average method.

(ii) Explain why the figures differ.

:::: answer Show the working
**FIFO**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Nov | | | 400 @ 200 = 80,000 |
| 3 Nov | 600 @ 210 = 1,26,000 | | 400 @ 200 + 600 @ 210 = 2,06,000 |
| 5 Nov | | 400 @ 200 + 300 @ 210 = 1,43,000 | 300 @ 210 = 63,000 |
| 8 Nov | 700 @ 220 = 1,54,000 | | 300 @ 210 + 700 @ 220 = 2,17,000 |
| 10 Nov | | 300 @ 210 + 300 @ 220 = 1,29,000 | 400 @ 220 = 88,000 |
| 12 Nov | 600 @ 230 = 1,38,000 | | 400 @ 220 + 600 @ 230 = 2,26,000 |
| 14 Nov | | 400 @ 220 + 300 @ 230 = 1,57,000 | 300 @ 230 = 69,000 |

**LIFO**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Nov | | | 400 @ 200 = 80,000 |
| 3 Nov | 600 @ 210 = 1,26,000 | | 400 @ 200 + 600 @ 210 = 2,06,000 |
| 5 Nov | | 600 @ 210 + 100 @ 200 = 1,46,000 | 300 @ 200 = 60,000 |
| 8 Nov | 700 @ 220 = 1,54,000 | | 300 @ 200 + 700 @ 220 = 2,14,000 |
| 10 Nov | | 600 @ 220 = 1,32,000 | 300 @ 200 + 100 @ 220 = 82,000 |
| 12 Nov | 600 @ 230 = 1,38,000 | | 300 @ 200 + 100 @ 220 + 600 @ 230 = 2,20,000 |
| 14 Nov | | 600 @ 230 + 100 @ 220 = 1,60,000 | 300 @ 200 = 60,000 |

**Weighted average** (rate recomputed after each receipt)

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Nov | | | 400 @ 200.00 = 80,000 |
| 3 Nov | 600 @ 210 = 1,26,000 | | 1,000 @ 206.00 = 2,06,000 |
| 5 Nov | | 700 @ 206.00 = 1,44,200 | 300 @ 206.00 = 61,800 |
| 8 Nov | 700 @ 220 = 1,54,000 | | 1,000 @ 215.80 = 2,15,800 |
| 10 Nov | | 600 @ 215.80 = 1,29,480 | 400 @ 215.80 = 86,320 |
| 12 Nov | 600 @ 230 = 1,38,000 | | 1,000 @ 224.32 = 2,24,320 |
| 14 Nov | | 700 @ 224.32 = 1,57,024 | 300 @ 224.32 = 67,296 |

**(i) Summary**

| Method | Tea issued (₹) | Stock on 15 Nov (₹) | Total (₹) |
|---|---:|---:|---:|
| FIFO | 4,29,000 | 69,000 | 4,98,000 |
| LIFO | 4,38,000 | 60,000 | 4,98,000 |
| Weighted average | 4,30,704 | 67,296 | 4,98,000 |

::: diagram Value of the 300 kg in stock on 15 November
{"type": "plot", "h": 260, "x": [0.4, 3.6], "y": [0, 80000], "ylabel": "amount (₹)",
 "xticks": [[1, "FIFO"], [2, "LIFO"], [3, "weighted average"]],
 "yticks": [[0, "0"], [20000, "20,000"], [40000, "40,000"], [60000, "60,000"], [80000, "80,000"]],
 "series": [{"label": "closing stock", "bars": true, "values": true, "color": "e",
   "pts": [[1, 69000, "69,000"], [2, 60000, "60,000"], [3, 67296, "67,296"]]}],
 "legend": "none",
 "caption": "Same 300 kg, three values. FIFO keeps the latest ₹230 tea in stock, LIFO the opening ₹200 tea."}
:::

**(ii) Why they differ.** Prices rose from ₹200 to ₹230 during the fortnight. Under FIFO each issue carried the earlier, cheaper lots, so issues are lowest (₹4,29,000) and the 300 kg left are from the latest lot at ₹230. Under LIFO each issue carried the latest lots, so issues are highest (₹4,38,000) and the 300 kg left are the opening stock at ₹200. The weighted average blends the lots and lies in between. In every method, issues plus closing stock equal the opening stock plus purchases, ₹4,98,000.
::::
:::::

::: lab stores-ledger {"method":"lifo","unit":"units","txns":"1-4 opening 100 @ 5\n5-4 receipt 300 @ 6\n6-4 issue 250\n8-4 receipt 500 @ 7\n10-4 issue 400\n12-4 receipt 600 @ 8\n14-4 issue 500"}
Here is Study Material Illustration 13 under LIFO; switch the method to FIFO to see the other half of ICAI's answer.
:::

:::: example Kulhads in March: a weighted average stores ledger
Tapri's central store prices kulhads by the weighted average method. March transactions:

| Date | Particulars | Units |
|---|---|---:|
| 1 Mar | Opening stock @ ₹6.00 | 8,000 |
| 3 Mar | Issued to Indore cafés, MR 101 | 5,000 |
| 6 Mar | Received, GRN 61, @ ₹6.50 | 12,000 |
| 9 Mar | Issued to Bhopal cafés, MR 102 | 9,000 |
| 11 Mar | Returned unused by Bhopal cafés (against MR 102) | 500 |
| 14 Mar | Received, GRN 62, @ ₹6.70 | 8,500 |
| 16 Mar | Returned to the supplier, cracked (out of GRN 62) | 2,000 |
| 20 Mar | Issued to Pune cafés, MR 103 | 8,000 |
| 22 Mar | Transferred from the Bhopal café to the Indore café | 300 |
| 28 Mar | Issued to Indore cafés, MR 104 | 3,000 |

On 31 March the store holds 1,840 kulhads. Of the shortage, 100 are breakages normal for clay, and 60 are missing, apparently pilfered.

**Required:** Prepare the stores ledger for March, and state the treatment of the transfer and the shortage.

::: answer Show the working
**Stores ledger: kulhads (weighted average method)**

| Date | Receipts | Issues | Balance |
|---|---|---|---|
| 1 Mar | | | 8,000 @ 6.00 = 48,000 |
| 3 Mar | | MR 101: 5,000 @ 6.00 = 30,000 | 3,000 @ 6.00 = 18,000 |
| 6 Mar | GRN 61: 12,000 @ 6.50 = 78,000 | | 15,000 @ 6.40 = 96,000 |
| 9 Mar | | MR 102: 9,000 @ 6.40 = 57,600 | 6,000 @ 6.40 = 38,400 |
| 11 Mar | Shop credit note: 500 @ 6.40 = 3,200 | | 6,500 @ 6.40 = 41,600 |
| 14 Mar | GRN 62: 8,500 @ 6.70 = 56,950 | | 15,000 @ 6.57 = 98,550 |
| 16 Mar | | Returned to supplier: 2,000 @ 6.70 = 13,400 | 13,000 @ 6.55 = 85,150 |
| 20 Mar | | MR 103: 8,000 @ 6.55 = 52,400 | 5,000 @ 6.55 = 32,750 |
| 28 Mar | | MR 104: 3,000 @ 6.55 = 19,650 | 2,000 @ 6.55 = 13,100 |
| 31 Mar | | Abnormal loss: 60 @ 6.55 = 393 | 1,940 @ 6.55 = 12,707 |
| 31 Mar | | Normal loss: 100 (no value) | 1,840 @ 6.91 = 12,707 |

Working notes:

1. The return from the Bhopal cafés is entered as a receipt at its original issue price, ₹6.40; it leaves the average unchanged.
2. The cracked kulhads go back to the supplier at the price of the lot returned, ₹6.70 (GRN 62).
3. The transfer of 300 kulhads between cafés does not pass through the store, so the stores ledger has no entry; the cost accounts move their cost (300 × ₹6.40, the rate at which the Bhopal cafés received them) to the Indore café.
4. The 60 kulhads pilfered are an abnormal loss: ₹393 at the current rate is transferred to the costing profit and loss account.
5. The 100 broken kulhads are a normal loss, absorbed by the good units: the value ₹12,707 stays and the rate rises to ₹12,707 ÷ 1,840 = ₹6.91.

Check: opening ₹48,000 + receipts ₹1,38,150 = ₹1,86,150 = issues ₹1,73,443 + closing ₹12,707.
:::
::::

::::: example Dev's claim: "the method makes no difference"
Sugar at Tapri's sweets unit, January to March (no opening stock):

| Month | Purchased (kg) | Rate (₹) | Issued (kg) |
|---|---:|---:|---:|
| January | 500 | 40 | 500 |
| February | 600 | 42 | 600 |
| March | 700 | 45 | 550 |

Each month has one purchase, followed by one issue. Dev tells the board that the closing stock on 31 March is the same whichever method of pricing issues is used, so the choice of method "makes no difference".

**Required:** Do you agree? Explain. (Stores ledgers are not required.)

:::: answer Model answer
Total purchases are 1,800 kg and total issues 1,650 kg, so the closing stock on 31 March is 150 kg.

Up to the end of February, purchases (1,100 kg) equal issues (1,100 kg): no stock is left at the end of either month. In March there is only one purchase (700 kg at ₹45) and one issue (550 kg), with no opening stock. The 150 kg left can only come from the March lot, so under FIFO, LIFO or any average method the closing stock is 150 kg × ₹45 = **₹6,750**.

Dev is right about this closing stock: where each month has one purchase and one issue and no stock is carried forward, the method of pricing becomes irrelevant. His wider claim is not: the moment stock from two lots is held together (an opening stock, two purchases before an issue, or a monthly closing stock carried forward), the methods give different values for issues and closing stock.
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
- Shortages: ICAI's answers differ. The Study Material enters a verification shortage in the issue column at the method's rate (SM 2.63); one old MTP treated unexplained shortages as absorbed (quantity cut, value kept). If the cause is given, use it: abnormal to costing P&L, normal absorbed. If not, state your assumption.
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
Q: A store has 200 kg at ₹50 and then buys 300 kg at ₹55. It issues 400 kg. What is the value of the issue under LIFO, in rupees?
= 21500
> LIFO takes the latest lot first: 300 × ₹55 = ₹16,500, then 100 × ₹50 = ₹5,000; total ₹21,500. FIFO would give 200 × ₹50 + 200 × ₹55 = ₹21,000.

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
- Shortages: abnormal in the issue column at the current rate, to costing P&L; normal absorbed (quantity cut, value kept). (Sugar is sugar; price tags are not.)

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
A:: In the issue column, valued at the rate of the method adopted (FIFO or other). An abnormal loss goes to costing P&L; a normal loss is absorbed by the good units.

Q:: Transfer of material from one job to another: stores ledger entry?
A:: None; the material does not pass through the store. Only the cost accounts of the jobs are adjusted (material transfer note).

Q:: In rising prices, rank FIFO, LIFO and weighted average by cost of materials issued.
A:: FIFO lowest, weighted average in between, LIFO highest (closing stock in the reverse order).
