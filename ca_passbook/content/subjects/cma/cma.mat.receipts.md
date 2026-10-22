---
id: cma.mat.receipts
title: Valuing material receipts
minutes: 25
needs: cma.mat.procure
tags: valuation of material receipts, trade discount, cash discount, GST input credit, demurrage, returnable containers, normal shortage
labs: stores-ledger
summary: What one unit of purchased material really costs: which invoice items are added, deducted or kept out, and how normal and abnormal shortages change the rate.
---

## In plain words

### Kesar's ₹214.50 tea that cost ₹208.16

Tapri buys 1,000 kg of Assam tea. Kesar adds up every rupee on the paperwork, ₹2,14,500, and announces that tea costs ₹214.50 a kg.

> **Ritu:** Per usable kg, please. The ₹10,000 GST comes back to us as input credit. The ₹500 demurrage is a fine for keeping the truck waiting.
> **Kesar:** The forklift was at my nephew's wedding.
> **Ritu:** Then the forklift pays it, not the tea. And 20 kg were lost breaking open the chests, which happens every time.

Ritu's tea costs the price ₹2,00,000 plus the freight ₹4,000 that brought it to Indore: ₹2,04,000. That cost is carried by the 980 kg that can actually be used: **₹208.16 a kg**.

Working out this figure is **valuation of material receipts**: the cost at which each unit enters the stores ledger and, later, every product that uses it. The rule of thumb has three parts:

- **In**: the price after trade discounts, plus every cost of bringing the material to the store (freight, transit insurance, customs duty, commission, containers that are not returned).
- **Out**: anything that is a finance reward (a cash discount for paying early), a tax that will be recovered (GST with input credit), or the price of a mistake (demurrage, fines, penalties).
- **Spread**: a normal shortage is shared by the good units; an abnormal one is written off.

::: analogy Your new phone
What did your phone cost? The shop's price after its discount, plus the delivery charge and the transit insurance. Not the bank's cashback for paying by card, which rewards how you paid. Not the parking fine you collected while picking it up, which is your own mistake. And not the GST you will claim back as a business. If the box came with a charger that never worked, the phone's cost is still the whole bill: the good part carries it.
:::

::: key
Material cost = purchase price net of trade discounts, rebates, subsidies and recoverable taxes + the costs of bringing it to its present location and condition. Cash discount, demurrage, fines and penalties stay out. A normal shortage raises the cost of each good unit; an abnormal one goes to the Costing Profit and Loss Account.
:::

## How it works

"Ascertainment of cost of material purchased is called valuation of materials receipts. Cost of material includes cost of purchase net of trade discounts, rebates, duty draw-back, input credit availed, etc. and other costs incurred in bringing the inventories to their present location and condition" (SM 2.13).

### Seven steps from invoice to rate per unit

::: steps
1. **Start from the listed price** and deduct **trade** and **quantity discounts** if the invoice has not already done so.
2. **Taxes**: exclude **GST** when its credit is available (unless a question says otherwise, it is not part of cost); include it when it is not, for example for a buyer not registered under GST. Add **customs duty** on imports and **road or toll tax** paid by the buyer.
3. **Add the costs of getting it here**: freight inwards, insurance in transit, commission or brokerage, non-returnable containers, and for returnable containers only the part of the deposit not refunded.
4. **Keep out** the **cash discount** (an interest and finance item, ignored even when received) and the abnormal costs: **demurrage**, **detention charges or fines** and any **penalty**.
5. **Deduct** any **subsidy, grant or incentive** received from the Government or other sources.
6. **Share costs** common to two materials on a suitable basis; ICAI's illustration splits freight in the ratio of quantity purchased (SM 2.16).
7. **Divide by the good quantity**: units purchased less the **normal shortage** (and any provision for deterioration). An **abnormal shortage** is valued at that rate and debited to the Costing Profit and Loss Account.
:::

::: diagram An item on the invoice: in or out?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "An invoice item"},
  {"id": "p", "kind": "decision", "label": "Penalty, fine\nor demurrage?"},
  {"id": "po", "kind": "end", "label": "Keep out:\nabnormal", "color": "bad"},
  {"id": "c", "kind": "decision", "label": "Cash\ndiscount?"},
  {"id": "co", "kind": "end", "label": "Ignore:\nfinance item", "color": "mute"},
  {"id": "t", "kind": "decision", "label": "GST with\ncredit?"},
  {"id": "to", "kind": "end", "label": "Keep out:\nrecovered", "color": "mute"},
  {"id": "d", "kind": "decision", "label": "Discount\nor subsidy?"},
  {"id": "dd", "kind": "end", "label": "Deduct\nfrom cost", "color": "c"},
  {"id": "a", "kind": "end", "label": "Add to cost", "color": "ok"}],
 "edges": [["s", "p"], ["p", "po", "yes"], ["p", "c", "no"], ["c", "co", "yes"], ["c", "t", "no"], ["t", "to", "yes"], ["t", "d", "no"], ["d", "dd", "yes"], ["d", "a", "no"]],
 "caption": "Rose: abnormal costs (penalties, fines, demurrage, detention charges); grey: the cash discount and GST whose credit is available; amber: deductions; green: everything that brings the material to the store (price, freight, insurance, customs duty, toll tax, commission, containers not returned)."}
:::

### Shortages: normal or abnormal?

A **normal shortage** (breaking of bulk, evaporation, unavoidable conditions) is absorbed by the good units: the total cost stays, the quantity falls, the rate rises. An **abnormal shortage** (mishandling, pilferage, avoidable reasons) is not absorbed by the good units; its cost is debited to the Costing Profit and Loss Account (SM 2.15). ICAI's illustration also treats a **provision for further deterioration** as a reduction in usable quantity (SM 2.16).

::: lab stores-ledger {"mode":"receipt"}
Step through an invoice line by line: each item is added, deducted or left out with the Study Material's reason, and the good quantity sets the rate.
:::

## Formats and formulas

### ICAI's table of treatments (SM 2.13–2.15)

*Learn the groups and the order: "state the treatment of" questions use exactly these words.*

| Item | Treatment |
|---|---|
| **Discounts and subsidy** | |
| (i) Trade discount | Deducted from the purchase price if not shown as deduction in the invoice. |
| (ii) Quantity discount | Like trade discount: deducted if not shown as deduction. |
| (iii) Cash discount | Not deducted; treated as interest and finance item. Ignored. |
| (iv) Subsidy / grant / incentives | Deducted from the cost of purchase. |
| **Duties and taxes** | |
| (v) Road tax / toll tax | Included in the cost of purchase if paid by the buyer. |
| (vi) GST | Excluded if credit is available; unless mentioned specifically, not part of cost. |
| (vii) Customs duty | Added to the purchase cost. |
| **Penalty and charges** | |
| (viii) Demurrage | Penalty imposed by the transporter for delay in loading or unloading: abnormal cost, not included. |
| (ix) Detention charges / fine | Imposed by a statutory authority for non-compliance: abnormal cost, not included. |
| (x) Penalty | Of any type, not included. |
| **Other expenditures** | |
| (xi) Insurance charges | Paid for protecting goods in transit: added. |
| (xii) Commission or brokerage | Added. |
| (xiii) Freight inwards | Added: directly attributable to procurement. |
| (xiv) Cost of containers | Non-returnable: added. Returnable and refunded: not considered. Refund less than amount paid: only the shortfall added. |
| (xv) Shortage | Normal: absorbed by good units. Abnormal: not absorbed, debited to Costing P&L. |

### The statement ICAI's answers use

*Reproduce this layout: units in one column, rupees in the other.*

| Particulars | Units | Amount (₹) |
|---|---:|---:|
| Listed price of materials | xxx | xxx |
| Less: Trade discount | | (xxx) |
| Add: GST (only if credit is not available) | | xxx |
| Add: Toll tax, freight and insurance, commission | | xxx |
| Add: Cost of returnable containers (deposit less refund) | | xxx |
| Add: Other expenses | | xxx |
| **Total cost of material** | **xxx** | **xxx** |
| Less: Normal shortage | (xxx) | — |
| **Total cost of good units** | **xxx** | **xxx** |
| **Cost per unit** | | **xxx** |

Notes below the statement explain each item left out (cash discount, demurrage, GST with credit).

::: formula Cost per unit of material received
$$\text{Rate} = \frac{\text{Total cost of material}}{\text{Good units}}$$
Good units = units purchased − normal shortage. An abnormal shortage is valued at this rate and charged to the Costing Profit and Loss Account.
:::

::: formula "Other expenses at x% of total cost"
$$\text{OE} = C \times \frac{x}{100 - x}$$
OE = other expenses; C = the cost before them. The total cost includes the other expenses themselves, so 2% of total cost is 2/98 of the cost before them (ICAI's convention in MTP May 2024 and RTP September 2024).
:::

## Worked examples

:::: example Two quotes for dried tulsi: which gives the lower ledger rate?
Tapri needs 2,500 kg of dried tulsi leaves for its tulsi chai premix. Tapri is registered under GST, and GST at 5% (input tax credit available) is charged under both offers.

| Particulars | Offer A: Rishikesh producer company | Offer B: Nashik trader |
|---|---|---|
| Price | ₹340 per kg ex-works, less 5% trade discount | ₹345 per kg delivered at Indore |
| Freight to Indore | ₹21,000, paid by Tapri | Included |
| Transit insurance | ₹3,500, paid by Tapri | Included |
| Packing | Returnable crates: deposit ₹12,000, refund ₹9,500 on return | Non-returnable sacks, ₹2,000 billed |
| Cash discount | 2% if paid within 10 days | None |
| Normal loss of moisture in transit | 2% | 1% |

**Required:**

(i) Calculate the cost per good kg at which the tulsi would enter the stores ledger under each offer.

(ii) Which offer should Tapri accept? State how the 2% cash discount affects your comparison.

::: answer Show the working
**(i) Statement of cost of 2,500 kg**

| Particulars | Offer A (₹) | Offer B (₹) |
|---|---:|---:|
| Listed price: 2,500 kg × ₹340 / ₹345 | 8,50,000 | 8,62,500 |
| Less: Trade discount @ 5% | (42,500) | — |
| | 8,07,500 | 8,62,500 |
| Add: Freight | 21,000 | — |
| Add: Transit insurance | 3,500 | — |
| Add: Crates (₹12,000 − ₹9,500) / sacks | 2,500 | 2,000 |
| **Total cost of material** | **8,34,500** | **8,64,500** |
| Good quantity: 2,500 kg less normal loss of 2% / 1% | 2,450 kg | 2,475 kg |
| **Cost per good kg** | **₹340.61** | **₹349.29** |

Notes: (1) GST is excluded under both offers because input tax credit is available. (2) For returnable crates only the part of the deposit not refunded is a cost; non-returnable sacks are added in full. (3) The normal moisture loss reduces the quantity, not the cost, so the good kilograms carry it.

**(ii)** Offer A gives the lower stores ledger rate by ₹8.68 a kg (₹349.29 − ₹340.61), even though its loss in transit is higher and Tapri pays the freight and insurance itself. Accept Offer A.

The cash discount does not enter the comparison of material cost: it is an interest and finance item and is ignored in valuing the receipt, whether or not it is taken (SM 2.13). If Tapri pays within 10 days, the saving is a finance gain recorded separately; it makes Offer A more attractive still but does not change its ledger rate of ₹340.61.
:::
::::

:::: example One truck, two materials: freight by weight, insurance by value
A dairy co-operative in Gujarat sends Tapri one truck carrying both materials:

| Particulars | Sugar | Milk powder |
|---|---:|---:|
| Quantity (kg) | 10,000 | 4,000 |
| Price per kg (₹) | 42 | 320 |

Tapri pays freight of ₹28,000 for the truck, charged by weight, and transit insurance of ₹17,000 on the value of the goods. GST is charged on both materials and input tax credit is available. On unloading, 100 kg of sugar have spilled from torn jute bags, which is usual for sugar in jute. 40 kg of milk powder were stolen when the driver left the truck unattended overnight at a roadside dhaba.

**Required:**

(i) Compute the rate per kg of each material for the stores ledger.

(ii) Show the treatment of the 40 kg of milk powder.

::: answer Show the working
**Working note: sharing the common costs**

| Common cost | Basis | Sugar (₹) | Milk powder (₹) |
|---|---|---:|---:|
| Freight ₹28,000 | Weight, 10,000 : 4,000 = 5 : 2 | 20,000 | 8,000 |
| Insurance ₹17,000 | Value, ₹4,20,000 : ₹12,80,000 = 21 : 64 | 4,200 | 12,800 |

Each common cost is shared on the basis that drives it: the freight was charged by weight, the insurance premium on the value insured.

**(i) Statement showing the rate per kg**

| Particulars | Sugar (₹) | Milk powder (₹) |
|---|---:|---:|
| Purchase price | 4,20,000 | 12,80,000 |
| Add: Freight | 20,000 | 8,000 |
| Add: Transit insurance | 4,200 | 12,800 |
| **Total cost (A)** | **4,44,200** | **13,00,800** |
| Quantity carrying the cost (B) | 9,900 kg | 4,000 kg |
| **Rate per kg (A ÷ B)** | **44.87** | **325.20** |

The sugar spilled from torn bags is a normal loss (breaking of bulk), so the 9,900 good kg carry the whole cost. The theft of milk powder is abnormal, so it is not absorbed: the rate is worked on all 4,000 kg.

**(ii)** The 40 kg stolen are an abnormal shortage, valued at the rate of the good units, 40 × ₹325.20 = **₹13,008**, and debited to the Costing Profit and Loss Account (SM 2.15). The stores ledger takes in 3,960 kg × ₹325.20 = ₹12,87,792.

Check: ₹4,44,200 + ₹12,87,792 + ₹13,008 = ₹17,45,000 = price ₹17,00,000 + freight ₹28,000 + insurance ₹17,000.
:::
::::

::::: example Diwali tins: the cost per good tin and the highest price Tapri can accept
For its Diwali premix, Tapri orders 25,000 printed tins from Sivakasi Tin Works. Tapri is registered under GST.

| Particulars | Details |
|---|---|
| Listed price | ₹32 per tin |
| Trade discount | 12.5% of the listed price |
| Commission to the buying agent | 2.5% of the listed price |
| GST | 18% (input tax credit available) |
| Freight and transit insurance | ₹24,000 |
| Demurrage paid to the transporter for late unloading | ₹3,500 |
| Cash discount | 2% if paid within 15 days; Tapri paid in 12 days |

4% of the tins arrive dented, which is normal for printed tins in transit; they are scrapped with no value.

**Required:**

(i) Prepare a statement of the cost of the tins and calculate the cost per good tin.

(ii) Kesar's budget for the Diwali premix allows ₹28.75 per good tin. Other terms remaining the same, what is the highest listed price per tin Tapri can accept?

:::: answer Show the working
**(i) Statement of cost of printed tins**

| Particulars | Units | Amount (₹) |
|---|---:|---:|
| Listed price: 25,000 × ₹32 | 25,000 | 8,00,000 |
| Less: Trade discount @ 12.5% | | (1,00,000) |
| | | 7,00,000 |
| Add: Commission to the buying agent @ 2.5% of listed price | | 20,000 |
| Add: Freight and transit insurance | | 24,000 |
| **Total cost of material** | **25,000** | **7,44,000** |
| Less: Normal shortage @ 4% | (1,000) | — |
| **Total cost of good units** | **24,000** | **7,44,000** |
| **Cost per good tin** | | **31.00** |

Notes:

1. GST of 18% is excluded: input tax credit is available.
2. Demurrage of ₹3,500 is a penalty imposed by the transporter: an abnormal cost, not included.
3. The cash discount is an interest and finance item and is ignored, though it was received.
4. The normal shortage reduces the units, not the cost.

**(ii) Highest listed price within the budget**

Let the listed price per tin be P. For each tin listed, Tapri pays P less 12.5% trade discount plus 2.5% commission = 0.90P; the freight of ₹24,000 does not depend on the price.

$$\frac{25{,}000 \times 0.90P + 24{,}000}{24{,}000} = 28.75$$

25,000 × 0.90P = (₹28.75 × 24,000) − ₹24,000 = ₹6,66,000, so P = ₹6,66,000 ÷ 22,500 = **₹29.60 per tin**.

Check: ₹7,40,000 listed − ₹92,500 trade discount + ₹18,500 commission + ₹24,000 freight = ₹6,90,000; ÷ 24,000 good tins = ₹28.75. Tapri must negotiate the listed price down from ₹32 to ₹29.60, or the trade discount up, to stay within budget.
::::
:::::

## Under the hood

### When the question is silent or contradicts itself

- **GST with no word on credit**: the Study Material says that "unless mentioned specifically it should not form part of cost of purchase". Exclude it and say so.
- **A buyer not registered under GST**: no input credit, so GST is a cost, even where the question's table says "credit available" (RTP September 2024 Q1 treated it exactly so for an unregistered buyer).
- **Two readings of "2% of total cost"**: ICAI grosses up (2/98). Taking 2% of the cost before it (₹2,940 instead of ₹3,000 on a cost of ₹1,47,000) is the other reading; state which you use.
- **Shared freight**: ICAI's illustration splits it by quantity purchased; use weight or value only if the question gives that basis.
- **Abnormal shortage with a number**: the Study Material gives the rule (not absorbed by good units, debited to the Costing Profit and Loss Account, SM 2.15) but no worked figure. Value it at the rate per good unit after the normal shortage, as abnormal losses are valued elsewhere in costing, and say so in a note.

### Where the same items meet you again

Demurrage, penalties, subsidies and interest come back in the cost sheet, where ICAI's rule is the same: abnormal costs and finance costs stay out ([[cma.sheet.mfg|cost sheet for a manufacturer]]). The rate found here is the receipt rate in the stores ledger, from which issues are priced: [[cma.mat.issues|pricing material issues]].

## Exam angle

### What ICAI asks from this topic

::: exam Where receipt valuation appeared, May 2024 to September 2026 (and the old scheme)
- **Full statement, cost per unit**: MTP Series I for May 2024 Q2(b) (5 marks): trade discount, GST without credit (unregistered buyer), cash discount, toll tax, freight, demurrage, commission, returnable containers, other expenses at 2% of total cost, 5% normal shortage. Old-scheme MTP Series I for November 2023 Q1(c): the same pattern.
- **Case scenario, five MCQs**: RTP September 2024 Q1: the cash discount and how it is treated, the other expenses, the GST, the total cost and the cost per good unit.
- **"State the treatment of" items, 5 marks**: May 2022 (old scheme) Q6(b): cash discount, IGST, demurrage, shortage, basic customs duty. January 2021 (old scheme) Q6(a): detention charges, demurrage, returnable containers, CGST, abnormal shortage.
- **The same items in a cost sheet**: September 2026 Q6(c) (4 marks): a State subsidy for eco-friendly raw materials, GST with input credit; MTP Series II for May 2025 Q3(b) (4 marks): subsidy, penalty and demurrage, interest; demurrage in the cost sheets of MTP Series I for January 2025 Q3(a) and RTP May 2026.
:::

::: lab stores-ledger {"mode":"receipt","unit":"units","inv":"listed price 5,00,000\ntrade discount 10%\ngst 18% no credit\ncash discount 10%\ntoll tax 1,800\nfreight and insurance 36,000\ndemurrage 5,000\ncommission and brokerage 10,000\nreturnable containers 30,000 refund 26,000\nother expenses 2% of total","rqty":5000,"rshort":"5%"}
Here is the MTP May 2024 Series I statement, the first question above, worked item by item down to the cost per good unit.
:::

::: exam The traps
- The cash discount was received: still ignored. The statement uses the price after trade discount, never after cash discount.
- GST is worked out on the price after trade discount (18% of ₹2,70,000, not ₹3,00,000).
- "Other expenses @ 2% of total cost" means 2/98 of the cost before them.
- A normal shortage is not deducted from cost: only the units fall.
- Read who the buyer is: "unregistered" decides the GST.
:::

::: trick Price, Path, Penalty
**Price** net of trade discounts and subsidies: in. Every cost of the **path** to the store (freight, insurance, duty, toll, commission, containers kept): in. Every **penalty** for a mistake (demurrage, fines, detention) and every finance reward (cash discount): out. Holds for any purchase; taxes are the one exception to check, in only when their credit is not available.
:::

## Answer frame

### "State the treatment of the following items associated with the purchase of materials"

One line per item, ICAI's words, one mark each:

| Item | Full-marks line |
|---|---|
| Cash discount | Not deducted from the purchase price; treated as an interest and finance item and ignored. |
| GST / IGST / CGST | Excluded from the cost of purchase if credit for the same is available; unless mentioned specifically, not part of cost. |
| Demurrage | A penalty imposed by the transporter for delay in loading or unloading; an abnormal cost, not included. |
| Basic customs duty | Paid on import of goods; added to the purchase cost. |
| Returnable containers | Not considered if refunded; if the refund is less than the amount paid, only the shortfall is added. |
| Shortage | Normal: absorbed by the good units. Abnormal: not absorbed; debited to the Costing Profit and Loss Account. |

### The numerical: three answers

::: cols
**Loses marks**

"Cost per tin = ₹8,26,000 ÷ 25,000 = ₹33.04."

The supplier's bill (price after trade discount plus GST) divided by tins bought: GST in, the costs of the path out, the shortage ignored.
---
**Passes**

The right items, but the normal shortage taken out of cost as well as units: (₹7,44,000 − 1,000 × ₹29.76) ÷ 24,000 = ₹29.76.

Close, but the shortage is in the wrong column.
---
**Full marks**

ICAI's statement (units and rupees), commission on the listed price, the shortage reducing units only (₹31.00), and a numbered note for each item left out.
:::

## Common mistakes

::: mistake Hall of Shame: the cash discount that went shopping
Deducting the 2% cash discount because "we did pay early". It is a reward for prompt payment, a finance item. **Fix:** ignore it in material cost, whether or not it was received.
:::

::: mistake The demurrage that sneaked into stock
Adding demurrage (or a fine, or detention charges) as if it were freight. **Fix:** a penalty for delay or non-compliance is an abnormal cost; it never enters the cost of material.
:::

::: mistake The shortage that was taken out twice
Deducting the normal shortage's value from the total cost and then dividing by the good units too. **Fix:** keep the total cost and divide by the good units; the shortage's cost is spread over them.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Tapri buys 1,000 kg of jaggery from a farmers' co-operative at ₹60 a kg, with GST whose input credit is available. The supplier's credit note for a 5% quantity discount arrives a week after the invoice. The State pays Tapri a subsidy of ₹5 a kg for buying from co-operatives. Tapri pays freight of ₹2,000, and the transporter charges ₹500 demurrage because the godown opened late. Normal loss of moisture is 4%. Which cost per good kg is correct?
- [ ] ₹61.46
- [ ] ₹59.38
- [ ] ₹56.77
- [x] ₹56.25
> Cost = ₹60,000 − ₹3,000 quantity discount (deducted even though it came on a separate credit note) + ₹2,000 freight − ₹5,000 subsidy = ₹54,000, carried by 960 good kg: ₹56.25. GST with credit and the demurrage stay out. ₹61.46 forgets the subsidy, ₹59.38 the quantity discount, and ₹56.77 adds the demurrage.

Q: Which of these are added to the cost of material purchased? Select all that apply.
- [x] Freight inwards
- [x] Customs duty paid on import
- [ ] Demurrage paid to the transporter
- [x] Insurance on the goods in transit
- [ ] Cash discount not availed
> Freight inwards, customs duty and transit insurance bring the material to its present location and condition. Demurrage is a penalty (abnormal cost). A cash discount is a finance item, ignored either way.

Q: A lot of material costs ₹1,47,000 before other expenses, which are 2% of total cost. What is the total cost of the lot, in rupees?
= 150000
> Other expenses = ₹1,47,000 × 2/98 = ₹3,000; total = ₹1,50,000. Taking 2% of ₹1,47,000 (₹2,940) is the reading ICAI does not use.

Q: Tapri deposits ₹8,000 for returnable drums and gets ₹6,500 back on returning them. What is added to the cost of material?
- [ ] ₹8,000
- [x] ₹1,500
- [ ] ₹6,500
- [ ] Nothing, as the drums were returned
> Only the shortfall between the amount paid and the refund is added: ₹8,000 − ₹6,500 = ₹1,500.

Q: 10,000 kg are bought for ₹5,00,000 in all. A normal shortage of 200 kg and an abnormal shortage of 300 kg occur. How much is debited to the Costing Profit and Loss Account? (Round to the nearest rupee.)
= 15306
> Rate = ₹5,00,000 ÷ (10,000 − 200) kg = ₹51.0204 a kg; abnormal shortage = 300 × ₹51.0204 = ₹15,306. The normal shortage is absorbed by the good units; the abnormal one is valued at the same rate.
:::

## Recap

- Material cost: purchase price net of trade discounts, rebates and recoverable taxes, plus costs of bringing it to its present location and condition.
- Added: freight inwards, transit insurance, customs duty, toll tax paid by buyer, commission, non-returnable containers.
- Kept out: cash discount (finance item), demurrage, detention charges and fines, penalties.
- Deducted: trade and quantity discounts (if not already on the invoice), subsidies, grants and incentives.
- GST: out if credit is available (and when the question is silent); in for a buyer who cannot take credit.
- Returnable containers: only the shortfall of the refund is added.
- Rate = total cost ÷ (units − normal shortage); abnormal shortage at that rate to Costing P&L.
- "x% of total cost" = cost before it × x/(100 − x). (The forklift pays for the wedding.)

## Flashcards

Q:: ICAI's definition of valuation of material receipts?
A:: Ascertainment of cost of material purchased; cost includes cost of purchase net of trade discounts, rebates, duty draw-back, input credit availed etc., and other costs incurred in bringing the inventories to their present location and condition.

Q:: Treatment of cash discount in valuing material receipts?
A:: Not deducted from the purchase price; treated as interest and finance item and ignored.

Q:: Treatment of GST in valuing material receipts?
A:: Excluded from the cost of purchase if credit for it is available; unless mentioned specifically, it should not form part of cost of purchase.

Q:: Treatment of demurrage?
A:: A penalty imposed by the transporter for delay in loading or unloading: an abnormal cost, not included in the cost of purchase.

Q:: Treatment of detention charges or fines?
A:: Imposed for non-compliance of rule or law by a statutory authority: abnormal cost, not included in the cost of purchase.

Q:: Treatment of returnable containers?
A:: If returned and refunded, not considered; if the refund is less than the amount paid, only the shortfall is added to the cost of purchase. Non-returnable containers are added.

Q:: Treatment of a subsidy, grant or incentive received on purchase of materials?
A:: Deducted from the cost of purchase.

Q:: Shortage due to normal vs abnormal reasons in material receipts?
A:: Normal (breaking of bulk, evaporation, unavoidable): absorbed by the good units. Abnormal (mishandling, pilferage, avoidable): not absorbed; debited to the Costing Profit and Loss Account.

Q:: Formula: cost per unit of material received with a normal shortage?
A:: Total cost of material ÷ (units purchased − normal shortage).

Q:: "Other expenses at 2% of total cost": how are they calculated?
A:: Cost before other expenses × 2/98, because the total cost includes the other expenses.
