---
id: cma.mat.techniques
title: ABC, FSN, HML, VED, JIT and perpetual inventory
minutes: 28
needs: cma.mat.levels
tags: ABC analysis, FSN, VED, HML, just in time, perpetual inventory, continuous stock verification, two bin system
labs:
summary: Four ways to sort stock so that control goes where it matters (value, movement, criticality, unit price), the demand-pull JIT system, and the physical controls behind the records.
---

## In plain words

### Guarding the stirrers, losing the cardamom

Tapri's central store in Indore holds everything from Assam tea to wooden stirrers. Ramesh, the storekeeper, is proud of it.

> **Ramesh:** Fifty thousand stirrers, forty thousand paper cups, all counted every morning. Nothing goes missing on my watch.
> **Ritu:** And the cardamom sacks by the loading door, the ones that got damp in the rain?
> **Ramesh:** Only a few sacks, madam. The bulk items are what fill the store.
> **Ritu:** The stirrers are worth ₹30,000. Those "few sacks" are part of ₹3,00,000. Per rupee, please, not per piece.

Ramesh controls by bulk; Ritu wants control by value. That is **ABC analysis**: rank items by the money tied up in them. A handful of "A" items usually hold most of the value and get tight control; a long tail of "C" items gets light control; "B" sits in between.

A store can also be sorted by how fast an item moves (fast, slow or non-moving: **FSN**), by how badly production suffers if it runs out (vital, essential or desirable: **VED**), or by the price of one unit (high, medium or low: **HML**). Or it can be emptied: under **Just in Time (JIT)** Tapri buys gift-box ribbon only when a Diwali order arrives. And the records need guarding too: **perpetual inventory** keeps bin cards and the stores ledger up to date, and **continuous stock verification** checks a few items every day, by surprise, against them.

::: analogy The household budget
Nobody tracks matchboxes the way they track the rent and the school fees (ABC). The medicine cabinet is sorted differently: the asthma inhaler must never run out, the cough sweets can (VED). And the cook who buys vegetables only after fixing tonight's menu runs JIT.
:::

::: key
Each technique sorts stock on its own basis so that control effort goes where it matters: ABC by value, FSN by movement, VED by criticality, HML by unit price. JIT removes stock by letting demand pull material in. Perpetual inventory with continuous stock verification keeps the records true.
:::

## How it works

### Four ways to control inventory

ICAI defines inventory control (after CIMA) as "the function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks" (SM 2.21). Management may control it on four bases (SM 2.22):

::: diagram The four bases of inventory control (SM 2.22)
{"type": "layers", "layers": [
  {"label": "By setting quantitative levels", "note": "re-order level, EOQ, maximum, minimum, danger level", "right": "when and how much"},
  {"label": "On the basis of relative classification", "note": "ABC, FSN, VED, HML", "right": "where to look"},
  {"label": "Using ratio analysis", "note": "input-output ratio, inventory turnover", "right": "how well it moves"},
  {"label": "Physical control", "note": "two bin, budgets, perpetual inventory, stock verification", "right": "what is really there"}],
 "caption": "This lesson covers relative classification, JIT and physical control; the levels, EOQ and ratios have their own lessons."}
:::

Levels and the re-order quantity are in [[cma.mat.levels|stock levels]] and [[cma.mat.eoq|EOQ]]; the ratios in [[cma.mat.ratios|inventory turnover ratios]]; Paper 6A uses the same ABC analysis in [[fm.wc.inventory|inventory management]].

### Relative classification: four questions, four sortings

The Study Material's one-line bases (SM 2.35): ABC on the value and frequency of inventory; FSN on inventory turnover; VED on the importance of inventory; HML on the price of an item of inventory.

**ABC analysis** "exercises discriminating control over different items of inventory on the basis of the investment involved" (SM 2.35). The Study Material's typical split (SM 2.36):

- **A**: about 10% of the items, about 70% of the inventory value, because of high prices or heavy requirement or both. Controlled by a regular system that plans total requirements through budgets and fixes maximum, minimum and re-order levels.
- **B**: about 20% of the items, about 20% of the value. Orders placed after reviewing the situation periodically.
- **C**: about 70% of the items, about 10% of the value. No constant control; orders placed once in six months or a year, after ascertaining requirements, to economise on ordering and handling costs.

::: diagram ABC: a few items, most of the money
{"type": "plot", "h": 280, "x": [0.4, 3.6], "y": [0, 80],
 "xticks": [[1, "A items"], [2, "B items"], [3, "C items"]],
 "yticks": [0, 10, 20, 40, 60, 70, 80], "ylabel": "% of total", "legend": "top-right",
 "series": [
  {"label": "% of items", "bars": true, "bw": 0.32, "values": true, "color": "e", "pts": [[0.82, 10], [1.82, 20], [2.82, 70]]},
  {"label": "% of inventory value", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[1.18, 70], [2.18, 20], [3.18, 10]]}
 ],
 "caption": "The Study Material's typical shares (SM 2.36). Sky blue: share of the items; blue: share of the value. A and C are mirror images, and the thresholds in a question are management's."}
:::

The steps of an ABC plan, as ICAI's answers lay them out:

::: steps
1. Total cost of each item (units × unit cost), and its % of total units and of total cost.
2. **Rank** the items by total cost, highest first.
3. Put each item in A, B or C by the basis of selective control the question gives (a ₹ range or a % of total cost).
4. Present the **plan of ABC selective control**: items in rank order, with a total line for each category.
:::

**Advantages of ABC analysis** (SM 2.39):

1. **Continuity in production**: no danger of interruption for want of materials, with minimum investment in inventories.
2. **Lower cost**: the cost of placing orders, receiving goods and maintaining stocks is minimised, especially if coupled with proper economic order quantities.
3. **Less attention required**: management time is saved, since attention is paid only to some of the items.
4. **Systematic working**: much of the purchase work can be systematised on a routine basis and handled by subordinate staff.

**FSN** (also called FNS: fast, normal and slow moving) classifies on frequency of usage, with a threshold range of inventory turnover decided by management (SM 2.40–2.41). **Fast moving**: placed nearer the store issue point, reviewed frequently for fresh orders. **Slow moving**: stored a little far, reviewed periodically for obsolescence, may be shifted to non-moving. **Non-moving**: kept for disposal, reported to management; an appropriate provision for loss may be created.

**VED** classifies on criticality for the production function and the final product, generally for **spare parts** (SM 2.41–2.42). **Vital**: unavailability can interrupt production and cause a production loss; strictly controlled by setting a re-order level. **Essential**: essential but not vital; unavailability may cause sub-standardisation and loss of efficiency; reviewed periodically, second priority. **Desirable**: optional; unavailability causes no production or efficiency loss. In a hospital, life-saving, rare and critical drugs are vital (SM 2.42).

**HML** classifies on the cost of an individual item, "unlike ABC analysis where inventories are classified on the basis of overall value of inventory"; high-cost items get more priority (SM 2.42). With Tapri's ranges of ₹1,000 a unit and above (H) and below ₹50 (L), cardamom at ₹2,400 a kg is H, and a ₹6 kulhad is L even though 30,000 kulhads are a B item by value.

### Slow-moving and non-moving stores

Reasons (SM 2.41): (i) failure of production management to communicate the updated requirement to the stores; (ii) technological upgradation (a new machine needs new material, or the material becomes obsolete); (iii) lack of periodic review of inventories. Remedies: timely identification, a minimum level or JIT, and turnover ratios reported against standards.

ICAI's suggested answer to "How is slow moving and non-moving item of stores detected and what steps are necessary to reduce such stocks?" (MTP May 2024 Series II Q4(b); also MTP January 2025 Series II Q6(c)):

- **Detection**: (i) preparing and perusing periodic reports showing the status of different items of stores; (ii) calculating the inventory turnover period of various items in terms of number of days or months of consumption; (iii) computing the inventory turnover ratio periodically, relating issues as a percentage of average stock held; (iv) implementing a well-designed information system.
- **Steps to reduce them**: (i) lay down proper procedure and guidelines for the disposal of non-moving items before they deteriorate further in value; (ii) diversify production to use up such materials; (iii) use these materials as substitutes in place of other materials.

### Just in Time: let the order pull the material

JIT "is a system of inventory management with an approach to have zero inventories in stores. According to this approach material should only be purchased when it is actually required for production" (SM 2.35). It is based on two principles: (i) produce goods only when it is required, and (ii) the products should be delivered to customers at the time only when they want. It is also known as the **'Demand pull' or 'Pull through' system** of production: production starts after the order for the products is received.

::: diagram JIT: the demand pulls the material (SM 2.35)
{"type": "flow", "w": 420, "nodes": [
  {"id": "a", "kind": "start", "label": "Demand for the\nfinal product"},
  {"id": "b", "kind": "process", "label": "Production starts to\nprocess the demand"},
  {"id": "c", "kind": "process", "label": "Requirement sent to\npurchase department"},
  {"id": "d", "kind": "process", "label": "Order for raw materials\nsent to the supplier"},
  {"id": "e", "kind": "end", "label": "Supplier sends material\nfor production"}],
 "edges": [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]],
 "caption": "Nothing moves until a customer orders: the opposite of producing to stock and buying to a re-order level."}
:::

### Physical control: the records and the shelves

The fourth basis keeps the stock itself under control (SM 2.45–2.47):

- **Two bin system.** Each bin is divided into two parts: (I) a smaller part to stock the quantity equal to the minimum stock or even the re-ordering level, and (II) the other part to keep the remaining quantity. Issues are made out of the larger part; as soon as it becomes necessary to use quantity out of the smaller part, a fresh order is placed. The two bin system is supplemental to the record of quantities on the bin card and the stores ledger card.
- **Establishment of a system of budgets.** To control investment in inventories, the exact quantity of each type of inventory and the time it is required are found by studying production plans and production schedules; an inventories requirement budget prepared on this basis discourages unnecessary investment in inventories.
- **Perpetual inventory records and continuous stock verification**, below.

**Perpetual inventory** "represents a system of records maintained by the stores department"; it comprises (i) bin cards and (ii) the stores ledger (SM 2.45). Its success depends on the steps in the flow below:

::: diagram Perpetual inventory: what its success depends on (SM 2.45)
{"type": "flow", "w": 420, "nodes": [
  {"id": "a", "kind": "process", "label": "(a) Stores ledger and\n(b) bin cards"},
  {"id": "c", "kind": "process", "label": "(c) Reconcile the\nquantity balances"},
  {"id": "d", "kind": "process", "label": "(d) Check some items\nevery day, by rotation"},
  {"id": "q", "kind": "decision", "label": "Physical = book?"},
  {"id": "e", "kind": "process", "label": "(e) Explain the\ncauses promptly"},
  {"id": "f", "kind": "process", "label": "(f) Make corrective\nentries"},
  {"id": "g", "kind": "end", "label": "(g) Remove\nthe causes"}],
 "edges": [["a", "c"], ["c", "d"], ["d", "q"], ["q", "d", "yes"], ["q", "e", "no"], ["e", "f"], ["f", "g"]],
 "caption": "How a discrepancy is valued and charged (normal or abnormal) is in the lesson on stock discrepancies."}
:::

**Continuous stock verification** is the physical verification of items, which may be done by the internal audit department, independent of the store and production staff, at appropriate intervals and ==without prior notice==: "the element of surprise is essential" (SM 2.46). It is a part of perpetual inventory (SM 2.77, 2.85). Valuing and booking the differences it finds is in [[cma.mat.ratios|stock discrepancies]].

### Annual stock-taking against continuous stock-taking

Annual stock-taking must cover all items in a given number of days: production shuts down, or the check is of a limited character (SM 2.46). **Continuous stock-taking** has these advantages (SM 2.47); who verifies, and how, is in [[cma.mat.procure|stock verification]]:

1. Closure of normal functioning is not necessary.
2. Stock discrepancies are likely to be noticed and corrected much earlier.
3. It has a sobering influence on the stores staff because of the element of surprise.
4. The stores auditor can watch the movement of items more closely, so the chances of obsolescence buying are reduced.
5. Final accounts can be ready quickly, and interim accounts are possible quite conveniently.

The **advantages of perpetual inventory** (SM 2.46):

1. Physical stocks can be counted and book balances adjusted as and when desired, without waiting for the entire stock-taking to be done.
2. Quick compilation of the Profit and Loss Account for an interim period, due to prompt availability of stock figures.
3. Discrepancies are easily located, so corrective action can be taken promptly to avoid their recurrence.
4. A systematic review reveals the existence of surplus, dormant, obsolete and slow-moving materials, so that remedial measures may be taken in time.
5. Fixing the various stock levels and checking actual balances against them helps the storekeeper keep stocks within limits and raise purchase requisitions for the correct quantity at the appropriate time.

## Formats and formulas

*Reproduce both statements from memory: the column headings carry marks.*

### Statement of total cost and ranking

On paper ICAI's statement has seven columns: Item, Units, % of total units, Unit cost (₹), Total cost (₹), % of total cost, Ranking (SM 2.37). Here it is in two halves:

| Item | Units | % of total units | Unit cost (₹) |
|---|---:|---:|---:|
| 1 | xxx | xx.xx | xx |
| … | … | … | … |
| **Total** | **xxx** | **100** | |

| Item | Total cost (₹) | % of total cost | Ranking |
|---|---:|---:|---:|
| 1 | xxx | xx.xx | x |
| … | … | … | … |
| **Total** | **xxx** | **100** | |

### Plan of ABC selective control

State the basis first ("₹ 50,000 & above: 'A' items …"), then:

| Ranking: item | % of total units | Cost (₹) | % of total cost |
|---|---:|---:|---:|
| 1: item … | xx.xx | xxx | xx.xx |
| 2: item … | xx.xx | xxx | xx.xx |
| **Total A (n items)** | **xx.xx** | **xxx** | **xx.xx** |
| … B items, then **Total B** | | | |
| … C items, then **Total C** | | | |
| **Grand total** | **100** | **xxx** | **100** |

ICAI writes the category in a last column next to each total line; here the total line names it.

## Worked examples

::::: example Two lists for one store: ABC by value, HML by unit price
Tapri's central store gives you the annual consumption of eight items for 2025-26:

| Item | Material | Units | Unit cost (₹) |
|---|---|---:|---:|
| 1 | Assam CTC tea (kg) | 8,000 | 250.00 |
| 2 | Milk powder (kg) | 2,500 | 320.00 |
| 3 | Saffron (g) | 800 | 350.00 |
| 4 | Kulhads | 50,000 | 6.40 |
| 5 | Sugar (kg) | 8,000 | 50.00 |
| 6 | Espresso machine gasket kits | 50 | 1,600.00 |
| 7 | Paper cups | 60,000 | 1.20 |
| 8 | Stirrers | 1,20,000 | 0.40 |

The purchase manager proposes to "control the costly items" only, by HML analysis: unit cost ₹300 and above, H; ₹10 to below ₹300, M; below ₹10, L.

**Required:**

(i) Rank the items and draw a plan of ABC selective control on this basis: ₹5,00,000 and above, 'A' items; ₹1,00,000 to below ₹5,00,000, 'B' items; below ₹1,00,000, 'C' items.

(ii) Classify the items under the purchase manager's HML basis.

(iii) Identify the items on which the two classifications disagree, and advise on the control each needs.

:::: answer Show the working
**Statement of total cost and ranking**

| Item | % of total units | Total cost (₹) | % of total cost | Ranking |
|---|---:|---:|---:|---:|
| 1 | 3.21 | 20,00,000 | 50.00 | 1 |
| 2 | 1.00 | 8,00,000 | 20.00 | 2 |
| 3 | 0.32 | 2,80,000 | 7.00 | 5 |
| 4 | 20.05 | 3,20,000 | 8.00 | 4 |
| 5 | 3.21 | 4,00,000 | 10.00 | 3 |
| 6 | 0.02 | 80,000 | 2.00 | 6 |
| 7 | 24.06 | 72,000 | 1.80 | 7 |
| 8 | 48.13 | 48,000 | 1.20 | 8 |
| **Total** | **100.00** | **40,00,000** | **100.00** | |

Total units = 2,49,350; percentages are rounded to two decimals.

**(i) Plan of ABC selective control**

| Ranking: item | % of total units | Cost (₹) | % of total cost |
|---|---:|---:|---:|
| 1: item 1 | 3.21 | 20,00,000 | 50.00 |
| 2: item 2 | 1.00 | 8,00,000 | 20.00 |
| **Total A (2 items)** | **4.21** | **28,00,000** | **70.00** |
| 3: item 5 | 3.21 | 4,00,000 | 10.00 |
| 4: item 4 | 20.05 | 3,20,000 | 8.00 |
| 5: item 3 | 0.32 | 2,80,000 | 7.00 |
| **Total B (3 items)** | **23.58** | **10,00,000** | **25.00** |
| 6: item 6 | 0.02 | 80,000 | 2.00 |
| 7: item 7 | 24.06 | 72,000 | 1.80 |
| 8: item 8 | 48.13 | 48,000 | 1.20 |
| **Total C (3 items)** | **72.21** | **2,00,000** | **5.00** |
| **Grand total (8 items)** | **100.00** | **40,00,000** | **100.00** |

::: diagram The store ranked by value: cumulative share of value against share of units
{"type": "plot", "h": 300, "x": [0, 100], "y": [0, 100], "xlabel": "cumulative % of units (items in rank order)", "ylabel": "cumulative % of value",
 "xticks": [0, 20, 40, 60, 80, 100], "yticks": [0, 20, 40, 70, 95, 100], "legend": "none",
 "series": [{"label": "ranked items", "pts": [[0, 0], [3.21, 50], [4.21, 70], [7.42, 80], [27.47, 88], [27.79, 95], [27.81, 97], [51.87, 98.8], [100, 100]], "color": "a", "dots": true}],
 "areas": [
  {"under": 0, "from": 0, "to": 4.21, "color": "d", "label": "A"},
  {"under": 0, "from": 4.21, "to": 27.79, "color": "c", "label": "B"},
  {"under": 0, "from": 27.79, "to": 100, "color": "mute", "label": "C"}],
 "caption": "Orange band: the two A items, 4.21% of the units and 70% of the value. Amber band: B items. Grey band: the C items, 72.21% of the units for the last 5% of the value."}
:::

**(ii) HML classification (on the cost of an individual item)**

| Class | Items |
|---|---|
| H (₹300 and above) | 2 milk powder (₹320), 3 saffron (₹350 a g), 6 gasket kits (₹1,600) |
| M (₹10 to below ₹300) | 1 tea (₹250), 5 sugar (₹50) |
| L (below ₹10) | 4 kulhads (₹6.40), 7 paper cups (₹1.20), 8 stirrers (₹0.40) |

**(iii) Where the two lists disagree**

| Item | ABC | HML | Control needed |
|---|---|---|---|
| 1 Assam tea | A | M | Half the store's value: budgets and fixed maximum, minimum and re-order levels, though its unit cost is only medium |
| 6 Gasket kits | C | H | Only 2% of the value: periodic ordering is enough on value; but as spares that can stop the espresso machines, check their criticality by VED |
| 4 Kulhads | B | L | 8% of the value: review periodically before ordering, though each kulhad is cheap |
| 3 Saffron | B | H | 7% of the value: periodic review; its high unit price also calls for safe custody |

Milk powder (A, H), sugar (B, M), paper cups and stirrers (C, L) get similar priority under both methods.

**Advice.** HML classifies inventory on the basis of the cost of an individual item, unlike ABC, which uses the overall value of inventory (SM 2.42). Controlling by unit price alone would leave the tea, half the money in the store, under only moderate control, and spend tight control on gasket kits worth 2%. Use ABC to decide where control effort goes, with HML (and VED for spare parts) as a supplement.
::::
:::::

:::: example Fast, slow or non-moving? The Bhopal depot's turnover test
The Bhopal depot gives you the following for 2025-26:

| Item | Consumed (₹) | Opening stock (₹) | Closing stock (₹) |
|---|---:|---:|---:|
| Masala sachets | 9,60,000 | 70,000 | 90,000 |
| Kulhads | 4,80,000 | 50,000 | 70,000 |
| Gift tins | 1,50,000 | 40,000 | 60,000 |
| Ginger syrup (winter special) | 18,000 | 24,000 | 12,000 |
| Pouches with the old logo | Nil | 45,000 | 45,000 |

Management's threshold range for FSN analysis: inventory turnover ratio of 6 or more, fast moving; below 6 but with some issues during the year, slow moving; no issue during the year, non-moving.

**Required:**

(i) Calculate the inventory turnover ratio and the number of days for which the average stock is held for each item (360 days in a year).

(ii) Classify the items under FSN analysis and state how each class is stored and controlled.

(iii) State possible reasons for the slow-moving and non-moving items and how they can be managed.

::: answer Show the working
**(i) and (ii) Turnover and FSN class**

| Item | Average stock (₹) | Turnover ratio | Days held | Class |
|---|---:|---:|---:|---|
| Masala sachets | 80,000 | 12 times | 30 | Fast |
| Kulhads | 60,000 | 8 times | 45 | Fast |
| Gift tins | 50,000 | 3 times | 120 | Slow |
| Ginger syrup | 18,000 | 1 time | 360 | Slow |
| Old-logo pouches | 45,000 | Nil | — | Non-moving |

Average stock = (opening + closing) ÷ 2; turnover ratio = consumption ÷ average stock; days held = 360 ÷ turnover ratio.

FSN analysis classifies inventory on the basis of frequency of usage, using a threshold range of inventory turnover decided by management (SM 2.40–2.41):

- **Fast moving** (sachets, kulhads): placed nearer to the store issue point; the stock is reviewed frequently for making fresh orders.
- **Slow moving** (gift tins, ginger syrup): stored a little farther away; the stock is reviewed periodically for obsolescence and may be shifted to the non-moving category.
- **Non-moving** (old-logo pouches): kept for disposal, reported to management, and an appropriate provision for loss may be created.

**(iii) Reasons and management.** The Study Material's reasons for slow-moving and non-moving stock fit these items: technological upgradation or existing material becoming obsolete (the rebranding made the old pouches useless); failure of production management to communicate the updated requirement to the stores (gift tins bought for a festival plan that changed); and lack of periodic review of inventories. Such stock is managed by careful observation and timely identification, by keeping stock near the minimum level or using the just-in-time approach (seasonal items such as the ginger syrup can be bought only against confirmed winter demand), and by reporting turnover ratios, actual against standard, to management (SM 2.41).
:::
::::

:::: example Kesar's spare parts: vital, essential or desirable?
The samosa factory's maintenance store holds: (a) a compressor for the blast freezer, with no substitute and a three-week import lead time; (b) a spare belt for the packing conveyor (if it fails, packing continues by hand at half speed); (c) an LED display panel for the visitors' lobby; (d) gaskets for a freezer model scrapped last year, untouched for 14 months; and (e) printer ribbons for the batch-coding machine, issued every day. Kesar wants "the same control for everything".

Advise the factory on classifying these items and the control each needs.

::: answer Model answer
**Basis.** Under VED analysis, inventories are classified on the basis of their criticality for the production function and the final product; generally this classification is done for spare parts. Under FSN analysis, inventories are classified on the basis of frequency of usage (inventory turnover) (SM 2.40–2.42).

**Classification and control.**

| Item | Class | Reason | Control |
|---|---|---|---|
| (a) Freezer compressor | Vital | Unavailability stops production | Strictly controlled by a re-order level |
| (b) Conveyor belt | Essential | Loss of efficiency, not a stoppage | Reviewed periodically; second priority |
| (c) Lobby LED panel | Desirable | Optional: no production or efficiency loss | Lowest priority, after vital and essential |
| (d) Old gaskets | Non-moving | No issues in 14 months; machine scrapped | Keep for disposal, report to management, provide for loss |
| (e) Printer ribbons | Fast moving | Issued daily | Near the issue point; reviewed frequently |

**Conclusion.** Uniform control is not advisable: it spends as much effort on the lobby panel as on the compressor whose absence stops the factory. Apply VED to the spare parts and FSN to all items, with control in proportion to criticality and movement.
:::
::::

## Under the hood

### Two ABCs

ABC analysis of inventory is not **Activity Based Costing**. An MTP asks for "the total cost of Product A and B using the ABC analysis" and means activity based costing (MTP May 2024 Series II MCQ 4). Units and unit costs mean inventory; cost pools and drivers mean [[cma.abc.concept|activity based costing]].

## Exam angle

::: exam Where these techniques appeared, May 2024 to September 2026
In the ICAI documents read for this lesson:

- **ABC plan, 8 marks**: rank eight materials and draw the plan on a ₹ basis, with a storekeeper who "has taken proper care" of the bulk items while a few units of valuable ones deteriorated (September 2025 Q5(a)).
- **JIT, 5 marks**: "Which system of inventory management is known as 'Demand Pull' or 'Pull through' system of production? Explain. Also, specify the two principles on which this system is based." (May 2026 Q6(a)).
- **Slow and non-moving stores, 4 marks**: "HOW is slow moving and non-moving item of stores detected and WHAT steps are necessary to reduce such stocks?" (MTP May 2024 Series II Q4(b)); the same as a scenario, "HOW would you identify slow-moving and non-moving items, and WHAT strategies would you implement" (MTP January 2025 Series II Q6(c)).
- The chapter's own theory questions ask for ABC as a technique of inventory control, the detection and reduction of slow-moving and non-moving stores, and a short note on JIT (SM 2.78).
- **Old scheme**: an ABC plan on % of total inventory cost (July 2021 Q1(a), 5 marks); a short note on VED, on which the examiners found performance "below average" (July 2021 Q6(e)); JIT in the May 2026 words (November 2022 Q6(a)); "Under VED analysis, inventories are classified on the basis of cost of individual items", true or false (false; November 2023 Q6(b)(ii)).
:::

::: exam What the suggested answers do
- ABC: the "Statement of Total Cost and Ranking", the basis restated, then the plan with a total line per category (September 2025 Q5(a); SM 2.37–2.39). A % basis that leaves the B band implicit is filled in ("7% to 14%", July 2021 Q1(a)).
- JIT: the definition, "production process actually starts after the order for the products is received", and the two principles, numbered (May 2026 Q6(a)).
:::

::: trick One word per technique
**A**BC = **A**mount (value). **F**SN = **F**requency (movement). **V**ED = **V**ital to production (criticality). **H**ML = **H**ow much one unit costs (unit price). Condition: these are memory hooks for the basis only; write ICAI's full basis in the answer.
:::

## Answer frame

### "Explain the concept of ABC analysis as a technique of inventory control"

1. Basis: discriminating control over different items of inventory on the basis of the investment involved; categories by relative importance, their value and frequency of replenishment.
2. A: about 10% of items, about 70% of value; controlled by budgets and maximum, minimum and re-order levels.
3. B: about 20% of items, about 20% of value; orders after periodic review.
4. C: about 70% of items, about 10% of value; no constant control; orders once in six months or a year, to economise on ordering and handling costs.
5. The four advantages: continuity in production, lower cost, less attention required, systematic working.
6. A one-line example or a sketch of items against value.

### "Which system is known as demand pull? Explain, and state its two principles" (5 marks)

1. Name it: Just in Time (JIT) inventory management, the 'Demand pull' or 'Pull through' system.
2. ICAI's definition: zero inventories in stores; material purchased only when actually required for production.
3. Working: production starts after the order for the products is received; the material requirement then goes to the purchase department.
4. The two principles, numbered, in ICAI's words.
5. The five-box chain from demand to supplier.

### Distinguish ABC and HML (or VED)

| Point | ABC | HML | VED |
|---|---|---|---|
| Basis | Investment involved: the overall value of the item's inventory, and frequency of replenishment | Cost of an individual item, by a range of cost | Criticality for the production function and the final product; generally for spare parts |
| Categories | A, B, C | High, medium, low cost | Vital, essential, desirable |
| Priority and control | A: budgets and maximum, minimum and re-order levels; B: periodic review; C: orders once in six months or a year | High-cost items get more priority; medium and low cost, less | Vital: strictly controlled by a re-order level; essential: periodic review, second priority |

### Three answers to "Write a short note on VED analysis"

::: cols
**Loses marks**

"VED classifies stock on cost: very expensive, expensive, desirable."

The basis is wrong: the very statement ICAI set as a true-or-false trap (November 2023).
---
**Passes**

"Vital, Essential and Desirable: items classified by their importance for production."

Basis right; no meaning of each class, no control, no field of use.
---
**Full marks**

The basis (criticality for the production function and the final product), generally used for spare parts; each class with its effect on production and its control; the hospital example.
:::

## Common mistakes

::: mistake Hall of Shame: ABC ranked by the number of units
Ranking by units makes the 1,20,000 stirrers the top item, though they are 1.20% of the value. **Fix:** rank by total cost (units × unit cost). The % of units column is shown to prove the point that A items are few, not to rank them.
:::

::: mistake ABC and HML swapped
Classifying the gasket kits as A items "because each costs ₹1,600". **Fix:** ABC uses the item's total inventory value; a high unit price makes it H under HML. In the example the kits are H under HML but C under ABC: 50 × ₹1,600 = ₹80,000, below the ₹1,00,000 limit.
:::

::: mistake VED on cost
**Fix:** VED is on criticality for production; a cheap seal without which the freezer stops is vital, an expensive lobby panel is desirable.
:::

::: mistake Perpetual inventory confused with annual stock-taking
**Fix:** perpetual inventory is the continuously updated records (bin cards and stores ledger), checked by continuous stock verification of a few items daily, by surprise; annual stock-taking counts everything once and is what it replaces.
:::

## Practice

::: quiz Check yourself
Q: A store has four items: P, 2,000 units at ₹150; Q, 500 units at ₹900; R, 12,000 units at ₹5; S, 300 units at ₹40. The basis is: ₹2,00,000 and above, A; ₹50,000 to ₹2,00,000, B; below ₹50,000, C. What is the total cost of the A items, in rupees?
= 750000
> Values: P ₹3,00,000; Q ₹4,50,000; R ₹60,000; S ₹12,000. A = P + Q = ₹7,50,000 (of ₹8,22,000, 91.24%). R is B, S is C. Ranking by units would wrongly put R first.

Q: Case scenario. Ritu sets up a two bin system for kulhads at Tapri's Pune café: the smaller part of the bin holds 1,200 kulhads, the re-order level, and the larger part the rest. Which of the following is correct?
- [ ] A fresh order is placed when the smaller part is empty; the bin card is no longer needed
- [ ] A fresh order is placed when the smaller part is empty; the bin card and stores ledger are still kept
- [x] A fresh order is placed as soon as kulhads have to be taken from the smaller part; the bin card and stores ledger are still kept
- [ ] A fresh order is placed as soon as kulhads have to be taken from the smaller part; the bin card is no longer needed
> Issues are made from the larger part, and a fresh order is placed as soon as it becomes necessary to use the smaller part, which holds the minimum stock or the re-order level. The two bin system is supplemental to the bin card and stores ledger, not a replacement (SM 2.45). Waiting until the smaller part is empty uses up the stock meant to cover the lead time.

Q: Under VED analysis, inventories are classified on the basis of:
- [ ] The cost of an individual item
- [ ] The frequency of usage
- [x] Their criticality for the production function and the final product
- [ ] The value of the inventory held
> Cost of one item is HML, frequency of usage is FSN, value is ABC. VED is criticality, generally for spare parts.

Q: Which of the following are the two principles on which JIT is based? Select all that apply.
- [x] Produce goods only when it is required
- [ ] Order in lots of the economic order quantity
- [x] Deliver products to customers at the time only when they want them
- [ ] Keep a buffer stock equal to the maximum lead time consumption
> JIT's principles: produce only when required, deliver only when customers want. EOQ lots and buffer stocks belong to stock levels, which JIT tries to remove.

Q: Which of these is NOT an advantage of continuous stock-taking?
- [ ] Normal functioning need not be closed
- [ ] Discrepancies come to notice and are corrected earlier
- [x] Every item is counted on the same day, so the store is checked in one go
- [ ] The element of surprise has a sobering influence on the stores staff
> Counting everything at once is annual stock-taking, whose shortcoming is that production must stop or the check is limited. Continuous stock-taking checks a few items every day, by rotation and without notice.
:::

## Recap

- Four bases of inventory control: quantitative levels, relative classification, ratio analysis, physical control.
- ABC: by value and frequency; A about 10% of items and 70% of value, B about 20% and 20%, C about 70% and 10%; rank by total cost.
- FSN: by frequency of usage (inventory turnover); non-moving kept for disposal, with a provision for loss.
- VED: by criticality for production, mainly spare parts; vital items controlled by a re-order level.
- HML: by the cost of an individual item, unlike ABC's overall value.
- JIT: zero inventory, demand pull; two principles: produce only when required, deliver only when customers want.
- Perpetual inventory: bin cards and stores ledger, kept up to date and checked by continuous, surprise stock verification by rotation.
- Two bin: order when issues reach the smaller part. (Watch the rent, not the matchboxes.)

## Flashcards

Q:: ICAI (CIMA): define inventory control.
A:: The function of ensuring that sufficient goods are retained in stock to meet all requirements without carrying unnecessarily large stocks.

Q:: The four bases of inventory control?
A:: By setting quantitative levels; on the basis of relative classification; using ratio analysis; physical control.

Q:: ABC analysis: typical share of items and value in each category?
A:: A: about 10% of items, about 70% of value. B: about 20% and 20%. C: about 70% of items, about 10% of value.

Q:: The four advantages of ABC analysis?
A:: Continuity in production; lower cost; less attention required; systematic working.

Q:: Basis of FSN, VED and HML classification?
A:: FSN: frequency of usage (inventory turnover). VED: criticality for the production function and final product. HML: cost of an individual item.

Q:: VED: how is each category controlled?
A:: Vital: strictly controlled by setting a re-order level. Essential: reviewed periodically, second priority. Desirable: optional in nature; unavailability causes no production or efficiency loss.

Q:: How are non-moving items treated under FSN?
A:: Kept for disposal, reported to management, and an appropriate provision for loss may be created.

Q:: JIT: its other names and its two principles?
A:: 'Demand pull' or 'Pull through' system. (i) Produce goods only when it is required; (ii) deliver products to customers only when they want them.

Q:: Two bin system: when is a fresh order placed?
A:: As soon as issues have to be made out of the smaller part of the bin, which holds a quantity equal to the minimum stock or the re-order level.

Q:: Perpetual inventory comprises what, and its success needs which final three steps?
A:: Bin cards and the stores ledger. Explain promptly the causes of discrepancies; make corrective entries; remove the causes.

Q:: How is slow-moving and non-moving stock detected (ICAI's four ways)?
A:: Periodic status reports; inventory turnover period in days or months of consumption; inventory turnover ratio computed periodically; a well-designed information system.

Q:: Five advantages of perpetual inventory?
A:: Stocks counted and book balances adjusted whenever desired; quick interim Profit and Loss Account; discrepancies easily located and corrected; surplus, dormant, obsolete and slow-moving materials revealed in time; stocks kept within the levels and purchase requisitions raised for the correct quantity at the right time.
