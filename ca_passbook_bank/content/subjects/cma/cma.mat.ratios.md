---
id: cma.mat.ratios
title: Inventory turnover ratios and stock discrepancies
minutes: 25
needs: cma.mat.issues, cma.mat.techniques
tags: inventory turnover ratio, days of inventory holding, input-output ratio, stock discrepancy, shortage, stock verification, normal loss, abnormal loss
labs:
summary: How fast each material moves (inventory turnover ratio and days held), what the input-output ratio shows, and how shortages found on stock verification are valued and charged.
---

## In plain words

### A full godown is not a good godown

> **Kesar:** Our godown is full to the roof. Nobody can say Tapri ever runs out of anything.
> **Ritu:** Nobody can find our cash either. The elaichi in there is six months of use.

Ritu's test is the **inventory turnover ratio**: how many times in a year a material's average stock is used up and replaced. Last year the factory consumed ₹8,40,000 of cardamom while holding ₹4,20,000 on average: it turned over **2 times**, so the average stock sat for 365 ÷ 2 = **182.5 days**. Sugar worth ₹12,50,000 was consumed from an average stock of ₹1,00,000: **12.5 times**, about **29 days**. Sugar is fast moving; the cardamom is tying up money that could be in the bank.

Then comes the stock count. The stores ledger says 3,500 litres of cooking oil; the shelf holds 3,320.

> **Kesar:** 180 litres? Sab adjust ho jayega.
> **Ritu:** Sixty will: oil is lost every time a drum is decanted into tins. The other 120 went out of the gate without a slip. That one goes to the costing profit and loss account.

A difference between the book balance and the physical balance is a **stock discrepancy**. The shortage is entered as an issue at the stores ledger rate, and then split: a **normal** shortage (inherent, unavoidable) is part of the cost of the good units; an **abnormal** one (avoidable: theft, mishandling) is a loss kept out of product cost.

::: analogy Table turns at a café
A café table that seats six groups an evening earns more than one occupied all night by a single cup of chai. Inventory turnover counts the table turns of your stock; days held is how long each group sits.
:::

::: key
The turnover ratio counts how many times a year the average stock is used up: a high ratio means fast-moving material, a low one over-investment and working capital locked up. A shortage found on verification is priced like an issue; a normal one stays in product cost, an abnormal one goes to the Costing Profit and Loss Account.
:::

## How it works

### Ratio analysis as inventory control

Ratio analysis is the third basis of inventory control (SM 2.22). The Study Material gives two ratios (SM 2.42–2.43):

- **Input-output ratio**: the ratio of the quantity of input of material to production and the standard material content of the actual output. It compares actual consumption with standard consumption, "thus indicating whether the usage of material is favourable or adverse". If the samosa line used 10,500 kg of flour for output whose standard content is 10,000 kg, the ratio is 1.05: 5% more than standard, an adverse usage. The money value of that excess is the [[cma.std.material|material usage variance]].
- **Inventory turnover ratio**: computed for different items and compared. ==A high ratio indicates fast-moving material; a low ratio indicates over-investment and locking up of working capital== (SM 2.42).

### Five steps to the turnover ratio

::: steps
1. **Materials consumed** = opening stock + purchases − closing stock (SM 2.72). Cardamom: ₹3,60,000 + ₹9,60,000 − ₹4,80,000 = ₹8,40,000.
2. **Average stock** = ½ (opening stock + closing stock) = ½ (₹3,60,000 + ₹4,80,000) = ₹4,20,000.
3. **Inventory turnover ratio** = materials consumed ÷ average stock = 2 times.
4. **Average number of days of inventory holding** = 365 days (or 12 months) ÷ inventory turnover ratio = 182.5 days. Use 360 if the question says so.
5. **Compare** materials with each other, with a standard or with the industry, and comment: the material with fewer days is the faster moving.
:::

::: diagram Days of average stock held, 2025-26
{"type": "plot", "h": 260, "x": [0.4, 2.6], "y": [0, 200], "legend": "none",
 "xticks": [[1, "Cardamom (2 times)"], [2, "Sugar (12.5 times)"]], "yticks": [0, 30, 60, 90, 120, 150, 182.5],
 "ylabel": "days of stock held",
 "series": [{"label": "days held", "bars": true, "bw": 0.5, "values": true, "color": "d", "pts": [[1, 182.5, "182.5 days"], [2, 29.2, "29.2 days"]]}],
 "caption": "365 ÷ turnover ratio. The cardamom's average stock lasts six times as long as the sugar's: slow moving, and the first place to look for capital locked up."}
:::

The ratio uses **cost**: cost of materials consumed over cost of average stock (SM 2.43). Paper 6A's inventory turnover uses cost of goods sold (or sales) over average inventory, and its raw material version is the same as this one (FM Study Material 3.16; [[fm.ratio.activity|activity ratios, Paper 6A]]).

### Stock discrepancies: when the shelf disagrees with the book

Under perpetual inventory the stores ledger and bin cards give a book balance at every moment, and continuous stock verification checks a few items a day against the shelves ([[cma.mat.techniques|perpetual inventory]]). When the physical balance differs, the Study Material's steps are: explain promptly the causes of the discrepancies, make corrective entries wherever required, and remove the causes (SM 2.45). Some differences are errors in the records, which a corrective entry puts right. A real **shortage** is handled in two moves:

1. **Value it.** "Materials found short during physical verification should be entered in the issue column and valued at the rate as per the method adopted, i.e., FIFO or any other" (SM 2.63).
2. **Charge it** by its cause (SM 2.15, 2.69):

::: diagram A shortage found on verification
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Physical balance\nbelow book balance"},
  {"id": "v", "kind": "process", "label": "Issue it at the\nissue-method rate"},
  {"id": "d", "kind": "decision", "label": "Normal cause?"},
  {"id": "n", "kind": "end", "label": "Good units\nbear it", "color": "c"},
  {"id": "a", "kind": "end", "label": "Costing\nP&L A/c", "color": "bad"}],
 "edges": [["s", "v"], ["v", "d"], ["d", "n", "yes"], ["d", "a", "no"]],
 "caption": "Normal causes (breaking of bulk, evaporation, unavoidable conditions): the good units bear it, or factory overheads. Abnormal (mishandling, pilferage, avoidable reasons): Costing Profit and Loss Account (SM 2.15)."}
:::

| Shortage | Causes (SM 2.15, 2.69) | Treatment |
|---|---|---|
| Normal | Breaking of bulk, evaporation, rusting, any unavoidable condition | Absorbed by the good units: in the stores ledger the quantity is reduced and the value kept, so the rate per unit rises; in the cost ledger, charged to factory overheads |
| Abnormal | Mishandling, pilferage, misappropriation, any avoidable reason | Valued at the issue rate and transferred to Costing Profit and Loss Account; not part of product cost |

In the Study Material's Illustration 14, 900 missing micro-controllers (misappropriated) are issued at the weighted average rate of ₹282.04, ₹2,53,836, "transferred to Costing Profit & Loss A/c", and 300 rusted ones (normal) are "absorbed by good units": the balance becomes 6,600 units at ₹294.87, with the value unchanged (SM 2.69). The full treatment of material losses is in [[cma.mat.losses|waste, scrap, spoilage and defectives]].

## Formats and formulas

*Reproduce the statement and the formulas from memory.*

::: formula Inventory turnover ratio
$$\text{ITR} = \frac{\text{Cost of materials consumed}}{\text{Cost of average stock held}}$$
ITR = inventory turnover ratio; both terms for the same period. Average stock = ½ (opening stock + closing stock) (SM 2.43).
:::

::: formula Average number of days of inventory holding
$$\text{Days held} = \frac{365}{\text{ITR}}$$
Average number of days of inventory holding = 365 days (or 12 months) ÷ inventory turnover ratio (SM 2.43); 360 if the question fixes it.
:::

::: formula Materials consumed
$$\text{Consumption} = O + P - C$$
O = opening stock, P = purchases, C = closing stock of materials (SM 2.72).
:::

::: formula Input-output ratio
$$\text{Input-output ratio} = \frac{I}{S}$$
I = quantity of material input to production; S = standard material content of the actual output (SM 2.42). The Study Material sets no threshold, but the comparison reads directly: above 1, more material went in than the standard allows (adverse usage); below 1, less (favourable).
:::

### Statement of inventory turnover (ICAI's layout, SM 2.44)

| Particulars | Material A (₹) | Material B (₹) |
|---|---:|---:|
| Opening stock | xxx | xxx |
| Add: Purchases | xxx | xxx |
| | xxx | xxx |
| Less: Closing stock | xxx | xxx |
| **Materials consumed** | **xxx** | **xxx** |
| Average inventory: (opening stock + closing stock) ÷ 2 | xxx | xxx |
| Inventory turnover ratio (consumption ÷ average inventory) | x times | x times |
| Inventory turnover (number of days in a year ÷ IT ratio) | x days | x days |

End with "Comments: Material A is moving faster than Material B" (SM 2.44).

### A shortage in the cost ledger

| Shortage | Debit | Credit |
|---|---|---|
| Normal | Factory Overhead Control A/c | Stores Ledger Control A/c |
| Abnormal | Costing Profit and Loss A/c | Stores Ledger Control A/c |

The Study Material's cost-ledger illustration credits a shortage, "assumed normal", to stores ledger control and debits overhead control (SM 7.37).

## Worked examples

::::: example The samosa factory: three materials, one comment
The following data relate to three materials of Tapri's samosa factory for 2025-26:

| Particulars | Flour (₹) | Potatoes (₹) | Packaging film (₹) |
|---|---:|---:|---:|
| Opening stock | 2,40,000 | 36,000 | 3,00,000 |
| Purchases during the year | 19,20,000 | 14,48,000 | 6,00,000 |
| Closing stock | 1,60,000 | 44,000 | 4,20,000 |

The industry's inventory turnover ratio for such factories is 12 times.

**Required:**

(i) Calculate the inventory turnover ratio of each material.

(ii) Calculate the number of days for which the average inventory is held (assume 360 days in a year).

(iii) Comment on the results.

:::: answer Show the working
**(i) and (ii) Statement of inventory turnover**

| Particulars | Flour (₹) | Potatoes (₹) | Film (₹) |
|---|---:|---:|---:|
| Opening stock | 2,40,000 | 36,000 | 3,00,000 |
| Add: Purchases | 19,20,000 | 14,48,000 | 6,00,000 |
| | 21,60,000 | 14,84,000 | 9,00,000 |
| Less: Closing stock | 1,60,000 | 44,000 | 4,20,000 |
| **Materials consumed** | **20,00,000** | **14,40,000** | **4,80,000** |
| Average inventory | 2,00,000 | 40,000 | 3,60,000 |
| Inventory turnover ratio | 10 times | 36 times | 1.33 times |
| Days of average inventory (360 ÷ ratio) | 36 days | 10 days | 270 days |

::: diagram Days of average inventory against the industry
{"type": "plot", "h": 270, "x": [0.4, 3.6], "y": [0, 300], "legend": "none",
 "xticks": [[1, "Flour"], [2, "Potatoes"], [3, "Packaging film"]], "yticks": [0, 30, 60, 120, 180, 270],
 "ylabel": "days of stock held",
 "series": [
  {"label": "days held", "bars": true, "bw": 0.5, "values": true, "color": "a", "pts": [[1, 36, "36"], [2, 10, "10"], [3, 270, "270"]]},
  {"label": "industry, 12 times = 30 days", "pts": [[0.4, 30], [3.6, 30]], "color": "mute", "dash": true}
 ],
 "caption": "Blue bars: days of average inventory; grey dashed line: the industry's 30 days (360 ÷ 12). Film sits nine times longer than the industry norm."}
:::

**(iii) Comments**

- **Potatoes** turn over 36 times (10 days): the fastest moving, as a perishable must be; keep the stock this lean.
- **Flour** turns over 10 times (36 days), close to the industry's 12 times (30 days): reasonable, with a little room to cut stock.
- **Packaging film** turns over only 1.33 times (270 days), against 30 days for the industry: a slow-moving item, showing over-investment and working capital locked up. Review it for obsolescence (a design change makes printed film useless), reduce the order size and keep it under the FSN review in [[cma.mat.techniques|FSN analysis]].
::::
:::::

:::: example Kulhads and lids: working backwards from the ratio
Tapri's café depot gives you the following for 2025-26:

| Particulars | Kulhads | Lids |
|---|---:|---:|
| Average stock | 45,000 units | 30,000 units |
| Position of stock | Closing stock exceeds opening stock by 18,000 units | Opening stock exceeds closing stock by 12,000 units |
| Inventory turnover ratio | 8 times | 15 times |

**Required:**

(i) Calculate the opening stock, the closing stock and the quantity purchased of each item.

(ii) Calculate the number of days for which the average inventory is held (360 days in a year), and comment.

::: answer Show the working
**Working note: opening and closing stock.** Average stock = (opening + closing) ÷ 2.

Kulhads: let opening stock = X; closing = X + 18,000. (2X + 18,000) ÷ 2 = 45,000, so X = **36,000**; closing stock = **54,000**.

Lids: let closing stock = Y; opening = Y + 12,000. (2Y + 12,000) ÷ 2 = 30,000, so Y = **24,000**; opening stock = **36,000**.

**(i) Consumption and purchases**

| Particulars | Kulhads | Lids |
|---|---:|---:|
| Consumption (turnover ratio × average stock) | 3,60,000 | 4,50,000 |
| Add: Closing stock | 54,000 | 24,000 |
| Less: Opening stock | 36,000 | 36,000 |
| **Purchases** | **3,78,000** | **4,38,000** |

(Purchases = consumption + closing stock − opening stock.)

**(ii) Days of average inventory**: kulhads 360 ÷ 8 = **45 days**; lids 360 ÷ 15 = **24 days**.

**Comment.** Lids move faster than kulhads: their average stock lasts 24 days against 45. The depot also ran its lid stock down by 12,000 while building kulhads up by 18,000; if kulhad sales are not rising, the extra stock is capital locked up.
:::
::::

::::: example Cooking oil: the count that came up 180 litres short
Tapri's samosa factory prices issues of cooking oil on the weighted average method. For October 2025:

| Date | Transaction |
|---|---|
| Oct 1 | Opening stock 2,000 litres at ₹150 |
| Oct 4 | Received 8,000 litres at ₹156 |
| Oct 9 | Issued 6,000 litres to the frying line |
| Oct 12 | Returned to stores 500 litres by the frying line (unused, from the 9 October issue) |
| Oct 18 | Received 6,000 litres at ₹159 |
| Oct 24 | Issued 7,000 litres to the frying line |
| Oct 31 | Physical verification: 3,320 litres in stock. 60 litres are the normal loss on decanting drums into tins; 120 litres left the gate without a requisition. |

**Required:**

(i) Prepare the stores ledger for October.

(ii) State the treatment of the two shortages and pass the entry for the abnormal one in the cost ledger.

:::: answer Show the working
**(i) Stores ledger, cooking oil (weighted average method)**

On paper use ICAI's ten columns (date; receipts, issues and balance, each with quantity, rate and amount). Here each entry and its effect on the balance:

| Date and entry | Litres | Rate (₹) | Amount (₹) | Balance: litres, ₹ |
|---|---:|---:|---:|---|
| Oct 1 opening | 2,000 | 150.00 | 3,00,000 | 2,000; 3,00,000 |
| Oct 4 receipt | 8,000 | 156.00 | 12,48,000 | 10,000; 15,48,000 (₹154.80) |
| Oct 9 issue | 6,000 | 154.80 | 9,28,800 | 4,000; 6,19,200 |
| Oct 12 return to stores | 500 | 154.80 | 77,400 | 4,500; 6,96,600 |
| Oct 18 receipt | 6,000 | 159.00 | 9,54,000 | 10,500; 16,50,600 (₹157.20) |
| Oct 24 issue | 7,000 | 157.20 | 11,00,400 | 3,500; 5,50,200 |
| Oct 31 abnormal shortage (issue) | 120 | 157.20 | 18,864 | 3,380; 5,31,336 |
| Oct 31 normal shortage (issue) | 60 | – | – | 3,320; 5,31,336 (₹160.04) |

Working notes:

1. The return on 12 October is taken back into stock at the price of the issue it came from, ₹154.80, as if it were a fresh purchase at the original issue price (SM 2.63, the second of the two treatments of returns to stores).
2. New average rates: ₹15,48,000 ÷ 10,000 = ₹154.80; ₹16,50,600 ÷ 10,500 = ₹157.20.
3. Book balance 3,500 litres; physical 3,320; shortage 180 litres: 120 abnormal, 60 normal.

**(ii) Treatment**

- **Abnormal shortage, 120 litres**: entered in the issue column at the weighted average rate, 120 × ₹157.20 = **₹18,864**, and transferred to Costing Profit and Loss Account. It is not a cost of the samosas.
- **Normal shortage, 60 litres**: absorbed by the good units. The quantity is written off and the value kept, so the 3,320 litres carry ₹5,31,336 at **₹160.04** a litre (₹5,31,336 ÷ 3,320), as in SM Illustration 14.

| Entry in the cost ledger | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Costing Profit and Loss A/c Dr | 18,864 | |
| To Stores Ledger Control A/c | | 18,864 |
| (Being abnormal shortage of 120 litres of oil written off) | | |

Convention: if the normal shortage is instead charged to production overheads, value it too: Factory Overhead Control A/c Dr ₹9,432 (60 × ₹157.20), To Stores Ledger Control A/c ₹9,432; the 3,320 litres then stay at ₹157.20 (₹5,21,904). Either way the normal loss ends up in product cost; say which you follow.
::::
:::::

## Under the hood

### Which "cost" in the ratio

ICAI's formula is on cost: materials consumed at cost over average stock at cost (SM 2.43). Illustrations give rupee values; MTP May 2026 Series I gives the stocks in kg and the ratio in times. Either works if both terms are in the same unit.

### 365, 360 or 12

The Study Material divides 365 days or 12 months by the ratio (SM 2.43). ICAI's questions often fix 360 days ("Assume 360 days in a year", December 2021; MTP May 2026 Series I); use what the question says, and months if the comment is in months.

### Shortages in issue pricing

The rate for the shortage follows the issue method: under FIFO the Study Material writes off a stock-taking shortage of 2 units at the rate of the oldest lot still in hand, ₹6.10 (SM 2.95, Practical Problem 8). The pricing methods themselves are in [[cma.mat.issues|pricing material issues]]; returns to the vendor and to stores in the same section of the Study Material (SM 2.63).

## Exam angle

::: exam Where these appeared
In the ICAI documents read for this lesson:

- **Inventory turnover, descriptive, 5 marks**: "calculate the quantity of each material purchased during the year and value of opening and closing stock", days held (360 days) and a comment, from average stock, the gap between opening and closing stock, and the turnover ratio (MTP May 2026 Series I Q3(a)). Old scheme: ratio, days and comments for two materials (December 2021 Q1(a)); ratio, days and "interpret the ratio … if the industry inventory turnover rate is 10" (RTP December 2021 Q1).
- **Multiple choice, 2 marks each**: in one case scenario, the average price per unit, the days for which average inventory is held, and the "amount of abnormal loss during storage to be transferred to Costing Profit & Loss Account (based on average price)" (September 2024 MCQs 6, 9 and 10). The published key gives ₹5,100 and ₹2,04,000 without workings. ₹5,100 is what you get when the 80 units of normal wastage are absorbed by the good units: total cost of the opening stock and the year's purchases, ₹33,10,92,000, over 65,000 − 80 = 64,920 units; the 40 units of abnormal wastage at ₹5,100 are then ₹2,04,000. Spread over all 65,000 units the average would be ₹5,093.72, close to the ₹5,094 option.
- **Shortages in the cost ledger**: "Deficiency found in stock of Raw Material (Normal)", journalised as Factory overhead control A/c Dr, To Stores Ledger Control A/c (January 2025 Q5(b), 4 marks); a deficiency "assumed as normal (alternatively can be treated as abnormal loss)" (MTP January 2025 Series I Q1(b)); "deficiencies found in stock taking" charged to the Costing Profit and Loss Account (RTP May 2026 Q11).
:::

::: exam The traps
- A deficiency with no word on its cause: ICAI's answers have gone both ways (SM 7.37 and January 2025: normal, to overheads; RTP May 2026: to Costing Profit and Loss). Write your assumption in one line.
- Consumption, not purchases, goes on top of the ratio: purchases ignore the change in stock.
- "Input-output ratio" also appears in process and joint-product questions as a yield, "100 : 90" (May 2026 Q3(a)): there it gives output from input, not a control ratio.
:::

::: trick Ratio and days are two views of one number
Days × ratio = days in the year (365 or 360). A ratio of 8 is 45 days on 360; 73 days on 365 is a ratio of 5. Condition: the same year length on both sides.
:::

## Answer frame

### "Explain inventory control by ratio analysis"

1. Input-output ratio: input of material ÷ standard material content of actual output; compares actual and standard consumption; shows favourable or adverse usage.
2. Inventory turnover ratio: cost of materials consumed ÷ cost of average stock; average stock = ½ (opening + closing).
3. Days of inventory holding = 365 days (or 12 months) ÷ the ratio.
4. Interpretation: high ratio, fast moving; low ratio, over-investment and locking up of working capital.
5. Use: compare materials (and with standards), reduce capital locked up and prevent over-stocking of slow-moving items.

### "How are shortages found on physical verification treated?"

1. Valuation: entered in the issue column at the rate of the issue method adopted (FIFO or any other).
2. Normal shortage (breaking of bulk, evaporation, unavoidable): absorbed by good units, or charged to factory overheads.
3. Abnormal shortage (mishandling, pilferage, avoidable): transferred to Costing Profit and Loss Account.
4. Control: explain the causes promptly, make corrective entries, remove the causes.

## Common mistakes

::: mistake Hall of Shame: the ratio built on purchases
Dividing purchases (₹6,00,000) by average stock gives the film a ratio of 1.67 instead of 1.33, and 216 days instead of 270. **Fix:** the numerator is materials consumed: opening + purchases − closing.
:::

::: mistake Closing stock in place of average stock
Using closing stock alone (₹4,20,000) as the denominator. **Fix:** average stock = ½ (opening + closing), unless the question gives the average.
:::

::: mistake The normal shortage that went to Costing Profit and Loss
Writing off all 180 litres to Costing Profit and Loss understates the cost of the samosas. **Fix:** only the abnormal 120 litres go there; the normal 60 stay in product cost, absorbed by the good units or through overheads.
:::

::: mistake The shortage at the latest purchase price
Valuing the missing 120 litres at ₹159, the last invoice. **Fix:** a shortage is an issue: use the rate of the issue method, here the weighted average ₹157.20.
:::

## Practice

::: quiz Check yourself
Q: A material's opening stock was ₹40,000, purchases ₹3,00,000 and closing stock ₹60,000. Taking 365 days, for how many days is the average inventory held? (Two decimals.)
= 65.1..65.2
> Consumption = ₹40,000 + ₹3,00,000 − ₹60,000 = ₹2,80,000; average stock = ₹50,000; ratio = 5.6 times; days = 365 ÷ 5.6 = 65.18.

Q: Case scenario. At the year-end count of Tapri's Indore store, Assam tea is 80 kg short of the stores ledger: 50 kg lost by drying out, normal for the season, and 30 kg missing from a broken carton that was never reported. The weighted average rate is ₹300 a kg. Which of the following is correct?
- [ ] ₹24,000 to Costing Profit and Loss Account
- [x] ₹9,000 to Costing Profit and Loss Account; ₹15,000 absorbed by the good units
- [ ] ₹15,000 to Costing Profit and Loss Account; ₹9,000 absorbed by the good units
- [ ] No entry: adjust the shortage when the next lot is received
> 30 kg × ₹300 = ₹9,000 is abnormal (avoidable, unreported) and goes to Costing Profit and Loss. 50 kg × ₹300 = ₹15,000 is normal (evaporation-type loss) and stays in the cost of the good units. Writing off all ₹24,000 overstates the loss.

Q: A low inventory turnover ratio indicates:
- [ ] That the material is fast moving
- [x] Over-investment and locking up of working capital in that material
- [ ] Efficient use of material against the standard
- [ ] A shortage on physical verification
> A low ratio means the average stock is used up slowly, so money sits in the store (SM 2.42). Fast moving is a high ratio; usage against standard is the input-output ratio.

Q: The samosa line used 9,800 kg of flour for output whose standard flour content is 10,000 kg. What does the input-output ratio show?
- [ ] 1.02: adverse usage
- [x] 0.98: favourable usage
- [ ] 0.98: adverse usage
- [ ] 1.02: favourable usage
> Input ÷ standard content of actual output = 9,800 ÷ 10,000 = 0.98: less material than standard, a favourable usage. Inverting the ratio gives 1.02.

Q: Material found short on physical verification is valued at:
- [ ] The invoice price of the latest purchase
- [x] The rate as per the method of pricing issues adopted (FIFO, weighted average or other)
- [ ] The market price on the date of the count
- [ ] The standard price, whatever the pricing method
> The Study Material: enter the shortage in the issue column at the rate as per the method adopted (SM 2.63).
:::

## Recap

- Materials consumed = opening stock + purchases − closing stock.
- Inventory turnover ratio = cost of materials consumed ÷ cost of average stock; average stock = ½ (opening + closing).
- Days of inventory holding = 365 days (or 12 months, or the 360 a question fixes) ÷ ratio.
- High ratio: fast moving. Low ratio: over-investment, working capital locked up.
- Input-output ratio = material input ÷ standard material content of actual output: above 1 adverse, below 1 favourable.
- Shortage on verification: an issue at the issue-method rate; normal (bulk breaking, evaporation, unavoidable) stays in product cost, abnormal (pilferage, mishandling, avoidable) to Costing Profit and Loss.
- Cost ledger: normal, Factory Overhead Control Dr; abnormal, Costing P&L Dr; Stores Ledger Control Cr. (Count the table turns, not the full tables.)

## Flashcards

Q:: Formula: inventory turnover ratio (Paper 4)?
A:: Cost of materials consumed during the period ÷ cost of average stock held during the period; average stock = ½ (opening + closing stock).

Q:: Formula: average number of days of inventory holding?
A:: 365 days (or 12 months) ÷ inventory turnover ratio.

Q:: What do a high and a low inventory turnover ratio indicate?
A:: High: the material is fast moving. Low: over-investment and locking up of working capital in inventories.

Q:: Define the input-output ratio.
A:: The ratio of the quantity of input of material to production and the standard material content of the actual output; it shows whether usage is favourable or adverse.

Q:: How is material found short on physical verification valued?
A:: Entered in the issue column at the rate as per the issue pricing method adopted (FIFO or any other).

Q:: Causes of normal and abnormal shortage of materials?
A:: Normal: breaking of bulk, evaporation, unavoidable conditions. Abnormal: mishandling, pilferage, avoidable reasons.

Q:: Treatment of a normal and an abnormal shortage in stores?
A:: Normal: absorbed by good units (or charged to factory overheads). Abnormal: valued at the issue rate and transferred to Costing Profit and Loss Account.

Q:: Journal entry for an abnormal stock shortage in the cost ledger?
A:: Costing Profit and Loss A/c Dr; To Stores Ledger Control A/c.

Q:: Journal entry for a normal stock deficiency in the cost ledger?
A:: Factory Overhead Control A/c Dr; To Stores Ledger Control A/c.

Q:: Material consumption in financial accounts?
A:: Opening stock + purchases − closing stock (stock at cost or net realisable value, whichever is less).
