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
Material cost = purchase price net of trade discounts, rebates, subsidies and recoverable taxes + the costs of bringing it to its present location and condition. Cash discount, demurrage, fines and penalties stay out. A normal shortage raises the cost of each good unit; an abnormal one goes to the costing profit and loss account.
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
7. **Divide by the good quantity**: units purchased less the **normal shortage** (and any provision for deterioration). An **abnormal shortage** is valued at that rate and debited to the costing profit and loss account.
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

A **normal shortage** (breaking of bulk, evaporation, unavoidable conditions) is absorbed by the good units: the total cost stays, the quantity falls, the rate rises. An **abnormal shortage** (mishandling, pilferage, avoidable reasons) is not absorbed by the good units; its cost is debited to the costing profit and loss account (SM 2.15). ICAI's illustration also treats a **provision for further deterioration** as a reduction in usable quantity (SM 2.16).

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
| (xv) Shortage | Normal: absorbed by good units. Abnormal: not absorbed, debited to costing P&L. |

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
Good units = units purchased − normal shortage. An abnormal shortage is valued at this rate and charged to the costing profit and loss account.
:::

::: formula "Other expenses at x% of total cost"
$$\text{OE} = C \times \frac{x}{100 - x}$$
OE = other expenses; C = the cost before them. The total cost includes the other expenses themselves, so 2% of total cost is 2/98 of the cost before them (ICAI's convention in MTP May 2024 and RTP September 2024).
:::

## Worked examples

:::: example Samosa moulds: the stores ledger rate
Tapri's samosa factory receives this invoice:

| Invoice | Amount (₹) |
|---|---:|
| 400 steel samosa moulds @ ₹25 | 10,000 |
| Less: 15% discount | (1,500) |
| | 8,500 |
| Add: GST @ 18% | 1,530 |
| | 10,030 |
| Add: Packing (4 non-returnable cartons) | 300 |
| **Total** | **10,330** |

A 2% cash discount is allowed if payment is made within 30 days. The GST documents are enclosed for claiming input credit.

**Required:** At what price per mould will the receipt be entered in the stores ledger?

::: answer Show the working
| Particulars | Amount (₹) |
|---|---:|
| Net purchase price | 8,500 |
| Add: Packing (non-returnable cartons) | 300 |
| **Total cost** | **8,800** |
| Number of moulds | 400 |
| **Cost per mould** | **22.00** |

Notes: (i) the cash discount is an interest and finance charge, not considered; (ii) input credit is available for the GST, so it is not added.
:::
::::

:::: example Imported spices: one invoice, two rates
Tapri's masala chai plant imports one consignment of spices:

| Particulars | Amount (₹) |
|---|---:|
| Cardamom: 2,000 kg at ₹1,500 per kg | 30,00,000 |
| Cinnamon: 3,000 kg at ₹400 per kg | 12,00,000 |
| Basic customs duty @ 10% (credit not allowed) | 4,20,000 |
| Freight from the port to Indore | 50,000 |
| **Total** | **46,70,000** |

On receipt, a shortage of 50 kg of cardamom and 75 kg of cinnamon is found, due to breaking of bulk. A provision of 2% is to be made for further deterioration.

**Required:** Compute the rate per kg of each spice.

::: answer Show the working
**Working note: effective quantity**

| Particulars | Cardamom (kg) | Cinnamon (kg) |
|---|---:|---:|
| Quantity purchased | 2,000 | 3,000 |
| Less: Shortage due to breaking of bulk (normal) | 50 | 75 |
| | 1,950 | 2,925 |
| Less: Provision for deterioration @ 2% | 39 | 58.5 |
| **Quantity available** | **1,911** | **2,866.5** |

**Statement showing the rate per kg**

| Particulars | Cardamom (₹) | Cinnamon (₹) |
|---|---:|---:|
| Purchase price | 30,00,000 | 12,00,000 |
| Add: Basic customs duty @ 10% | 3,00,000 | 1,20,000 |
| Add: Freight (ratio of quantity purchased, 2 : 3) | 20,000 | 30,000 |
| **Total cost (A)** | **33,20,000** | **13,50,000** |
| Effective quantity in kg (B) | 1,911 | 2,866.5 |
| **Rate per kg (A ÷ B)** | **1,737.31** | **470.96** |

The shortage is normal, so its cost stays with the good kilograms. Check: 1,911 × ₹1,737.31 + 2,866.5 × ₹470.96 ≈ ₹46,70,000, the whole invoice.
:::
::::

::::: example Paper cups: the full statement
Tapri's cafés buy one lot of 50,000 printed paper cups from Indore Pack Ltd., a registered supplier. Tapri is registered under GST and can claim input tax credit.

| Particulars | Details |
|---|---|
| Listed price of the lot | ₹3,00,000 |
| Trade discount | 10% on listed price |
| GST | 18% (input tax credit available) |
| Cash discount (if paid within 15 days) | 2% |
| Toll tax paid by Tapri | ₹1,200 |
| Freight and transit insurance | ₹13,800 |
| Demurrage paid to the transporter | ₹2,000 |
| Commission to the purchasing agent | ₹6,000 |
| Deposit for returnable crates | ₹12,000 |
| Refund on returning the crates | ₹9,000 |
| Other expenses | 2% of total cost |

4% of the cups are crushed in transit, which is normal. A further 600 cups are crushed when a forklift is driven into a pallet in Tapri's store. Tapri paid within 10 days.

**Required:**

(i) Calculate the cost per good cup and show the treatment of the 600 cups.

(ii) Calculate the cost per good cup if the lot had been bought by Tapri's franchisee in Ujjain, which is not registered under GST.

:::: answer Show the working
**(i) Statement of cost of paper cups purchased**

| Particulars | Units | Amount (₹) |
|---|---:|---:|
| Listed price | 50,000 | 3,00,000 |
| Less: Trade discount @ 10% | | (30,000) |
| | | 2,70,000 |
| Add: Toll tax | | 1,200 |
| Add: Freight and transit insurance | | 13,800 |
| Add: Commission to the purchasing agent | | 6,000 |
| Add: Returnable crates (₹12,000 − ₹9,000) | | 3,000 |
| | | 2,94,000 |
| Add: Other expenses (₹2,94,000 × 2/98) | | 6,000 |
| **Total cost of material** | **50,000** | **3,00,000** |
| Less: Normal shortage @ 4% | (2,000) | — |
| **Total cost of good units** | **48,000** | **3,00,000** |
| **Cost per good cup** | | **6.25** |

The 600 cups crushed by the forklift are an abnormal shortage: 600 × ₹6.25 = **₹3,750** is debited to the costing profit and loss account. Stock is taken in at 47,400 cups × ₹6.25 = ₹2,96,250 (with ₹3,750, the total cost of ₹3,00,000).

::: diagram What makes up ₹6.25 per good cup
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [0, 6.5], "ylabel": "amount per good cup (₹)",
 "xticks": [[1, "net price"], [2, "toll, freight, commission"], [3, "crates"], [4, "other expenses"]],
 "yticks": [[0, "0"], [2, "2.00"], [4, "4.00"], [6, "6.00"]],
 "series": [{"label": "₹ per good cup", "bars": true, "values": true, "color": "a",
   "pts": [[1, 5.625, "5.625"], [2, 0.4375, "0.4375"], [3, 0.0625, "0.0625"], [4, 0.125, "0.125"]]}],
 "legend": "none",
 "caption": "Each cost of the lot divided by the 48,000 good cups: 5.625 + 0.4375 + 0.0625 + 0.125 = ₹6.25."}
:::

Notes:

1. GST of ₹48,600 (18% of ₹2,70,000) is excluded: input tax credit is available.
2. The cash discount of ₹5,400 is an interest and finance item and is ignored, though it was received.
3. Demurrage of ₹2,000 is a penalty imposed by the transporter: an abnormal cost, not included.
4. Only the unrefunded ₹3,000 of the crate deposit is a cost.
5. The normal shortage reduces the units, not the cost.

**(ii) Unregistered franchisee**

Without input tax credit, GST becomes part of cost: ₹2,94,000 + ₹48,600 = ₹3,42,600; other expenses = ₹3,42,600 × 2/98 = ₹6,991.84; total cost = **₹3,49,591.84**; cost per good cup = ₹3,49,591.84 ÷ 48,000 = **₹7.28**.
::::
:::::

## Under the hood

### When the question is silent or contradicts itself

- **GST with no word on credit**: the Study Material says that "unless mentioned specifically it should not form part of cost of purchase". Exclude it and say so.
- **A buyer not registered under GST**: no input credit, so GST is a cost, even where the question's table says "credit available" (RTP September 2024 Q1 treated it exactly so for an unregistered buyer).
- **Two readings of "2% of total cost"**: ICAI grosses up (2/98). Taking 2% of the cost before it (₹5,880 instead of ₹6,000 in the paper cups example) is the other reading; state which you use.
- **Shared freight**: ICAI's illustration splits it by quantity purchased; use weight or value only if the question gives that basis.
- **Abnormal shortage with a number**: the Study Material gives the rule (not absorbed by good units, debited to the costing profit and loss account, SM 2.15) but no worked figure. Value it at the rate per good unit after the normal shortage, as abnormal losses are valued elsewhere in costing, and say so in a note.

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
| Shortage | Normal: absorbed by the good units. Abnormal: not absorbed; debited to the costing profit and loss account. |

### The numerical: three answers

::: cols
**Loses marks**

"Cost per cup = ₹3,18,600 ÷ 50,000 = ₹6.37."

The supplier's bill divided by units bought: GST in, the costs of the path out, the shortage ignored.
---
**Passes**

The right items, but the normal shortage deducted as ₹12,000 from cost, giving ₹6.00.

Close, but the shortage is in the wrong column.
---
**Full marks**

ICAI's statement (units and rupees), other expenses grossed up, the shortage reducing units only, and a numbered note for each item left out.
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
Q: Case scenario. Tapri's franchisee in Dewas, not registered under GST, buys 2,000 kulhads at a listed price of ₹10,000 less 10% trade discount, plus GST of ₹1,080. It pays freight of ₹400 and a ₹300 fine to the municipality for unloading in a no-parking zone, and receives a cash discount of ₹180 for paying within a week. 100 kulhads break in transit, which is normal. Which cost per good kulhad is correct?
- [ ] ₹4.95
- [x] ₹5.52
- [ ] ₹5.24
- [ ] ₹5.67
> Cost = ₹9,000 + ₹1,080 GST (no credit for an unregistered buyer) + ₹400 freight = ₹10,480, carried by 1,900 good kulhads: ₹5.52. The fine stays out and the cash discount is ignored. ₹4.95 leaves out the GST, ₹5.24 divides by 2,000, and ₹5.67 adds the fine.

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

Q: 10,000 kg are bought for ₹5,00,000 in all. A normal shortage of 200 kg and an abnormal shortage of 300 kg occur. How much is debited to the costing profit and loss account? (Round to the nearest rupee.)
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
- Rate = total cost ÷ (units − normal shortage); abnormal shortage at that rate to costing P&L.
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
A:: Normal (breaking of bulk, evaporation, unavoidable): absorbed by the good units. Abnormal (mishandling, pilferage, avoidable): not absorbed; debited to the costing profit and loss account.

Q:: Formula: cost per unit of material received with a normal shortage?
A:: Total cost of material ÷ (units purchased − normal shortage).

Q:: "Other expenses at 2% of total cost": how are they calculated?
A:: Cost before other expenses × 2/98, because the total cost includes the other expenses.
