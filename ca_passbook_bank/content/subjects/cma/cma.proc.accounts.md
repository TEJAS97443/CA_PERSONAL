---
id: cma.proc.accounts
title: Process accounts, normal loss, abnormal loss and abnormal gain
minutes: 34
needs: cma.sheet.mfg, cma.mat.losses
tags: process costing, process account, normal loss, abnormal loss, abnormal gain, scrap value, costing profit and loss account
labs:
summary: How costs are charged to process accounts and averaged over units, why normal loss raises the cost of good units, and how abnormal loss and gain are valued and closed.
---

## In plain words

### 10,000 kg in, 9,300 kg out, and one very annoyed founder

Tapri's chai premix begins in a roasting drum in Indore. Tea leaves go in, roasted leaves come out and move on to blending. Every month, less comes out than went in.

> **Kesar:** We fed 10,000 kg into the roaster and only 9,300 kg came out. Who is eating my tea?
> **Ritu:** The drum, mostly. Roasting dries the leaves and the sieve takes out dust: about 5% every month, so 500 kg is expected. The other 200 kg went on the floor when the conveyor jammed on the 14th.
> **Kesar:** Then put all 700 kg into the cost per kg. Sab adjust ho jayega.
> **Ritu:** The 500 kg, yes. The 200 kg, no. A jammed conveyor is not a cost of roasting tea.

A **process** is one stage of production (roasting, blending, packing). All its cost is collected in its **process account** and averaged over the units it produces; its output is the next process's input.

The 500 kg that roasting always loses is **normal loss**: part of making roasted tea, so the good kilograms carry its cost. Dhabas buy the dust at ₹20 a kg, and that sale reduces the cost.

The 200 kg beyond the expected loss is **abnormal loss**: valued like a good kilogram and sent to the costing profit and loss account, so a jammed conveyor does not quietly raise the cost of every packet. In a month when only 400 kg is lost, the 100 kg Tapri did not expect to keep is **abnormal gain**, valued the same way and credited to that account.

::: analogy The chai pan
A litre of chai gives 900 ml in cups; the rest is steam. Each cup's cost includes that steam: normal loss. If the pan boils over while you are on the phone, the 200 ml on the stove is the cost of the phone call, not of chai (abnormal loss). If a lid one day gets you 950 ml, the extra 50 ml is the lid's credit (abnormal gain). Tomorrow's cup is still costed on the normal 900 ml.
:::

::: key
Cost is averaged over the **normal output** (input minus normal loss). Good units, abnormal loss and abnormal gain are all valued at that one normal cost per unit. Only the normal loss is absorbed by the good units, and only its scrap value comes back to the process.
:::

## How it works

### Where ICAI uses process costing

**Process costing** is "a method of Cost Accounting whereby costs are charged to processes or operations and averaged over units produced" (SM 10.2), with a separate account for each process. ICAI's examples: steel, paper, medicines, soaps, chemicals, rubber, vegetable oil, paints and varnish.

Industries using it normally have one or more of these **features** (SM 10.2, in ICAI's order):

1. Each plant or factory is divided into a number of processes, cost centres or departments, and each such division is a stage of production or a process.
2. Manufacturing is carried on continuously by one or more processes run sequentially, selectively or simultaneously.
3. The output of one process becomes the input of another process.
4. The end product usually is of like units, not distinguishable from one another.
5. The identity of any particular lot of output cannot be traced to any lot of input materials (no bag of sugar can be traced to a particular lot of sugarcane).
6. Production may give rise to joint products and by-products.

### What a process account collects

Each process is debited with its **materials** (from the second process on, the cost transferred from the previous process plus any material added), its **employee cost**, its **direct expenses** (depreciation, repairs, maintenance, insurance of its own plant) and its **production overheads** (rent, power, lighting, gas, water), apportioned on a suitable basis, usually at a pre-determined rate (SM 10.3).

::: diagram Where a process account's cost comes from and where it goes
{"type": "tree", "gapX": 14,
 "root": {"label": "Materials, labour,\noverheads", "children": [
  {"label": "Process I A/c", "color": "a", "children": [
   {"label": "Process II\nat full cost", "color": "b"},
   {"label": "Normal loss\nat scrap value", "color": "c", "children": [
     {"label": "Bank\nscrap sold"}]},
   {"label": "Abnormal loss\nat full cost", "color": "d", "children": [
     {"label": "Bank\nits scrap"},
     {"label": "Costing P&L\nthe balance", "color": "bad"}]}]}]},
 "caption": "Good units go on to Process II (or finished stock) at full cost. Normal loss leaves only at its scrap value, which the bank receives. Abnormal loss leaves at the full cost of a good unit: its scrap goes to the bank, the rest to the costing P&L."}
:::

### Five steps for any process account with losses

The roaster in June: 10,000 kg of tea at ₹4,00,000, wages ₹1,25,000, overheads ₹1,02,500 (total ₹6,27,500); normal loss 5% of input, sold at ₹20 a kg; output 9,300 kg.

::: steps
1. **Normal loss in units** = input × normal loss %: 10,000 × 5% = 500 kg. Its **value** is the scrap's realisable value less any cost of selling it: 500 × ₹20 = ₹10,000.
2. **Normal output** = input − normal loss = 9,500 kg. Actual output below it is **abnormal loss** (9,500 − 9,300 = 200 kg); above it, **abnormal gain**.
3. **Normal cost per unit** = (total cost − scrap value of normal loss) ÷ normal output = (₹6,27,500 − ₹10,000) ÷ 9,500 = ₹65 a kg.
4. **Value** the output and the abnormal units at that one rate: 9,300 × ₹65 = ₹6,04,500 to blending; 200 × ₹65 = ₹13,000 abnormal loss. With the ₹10,000 of normal loss, the credits total ₹6,27,500.
5. **Close the loss accounts.** The dust sale clears the normal loss account. The abnormal loss account is credited with its own 200 kg of scrap (₹4,000) and sends the balance, ₹9,000, to the costing P&L.
:::

### July: the month the roaster behaved

Same input and costs, but 9,600 kg came out: 400 kg lost against 500 kg expected. The extra 100 kg is **abnormal gain**, at the same ₹65: "the cost of abnormal gain is computed on the basis of normal production" (SM 10.9).

- The process account is **debited** with the abnormal gain, 100 kg, ₹6,500; blending receives 9,600 × ₹65 = ₹6,24,000.
- The process is still credited with the **normal** loss, 500 kg × ₹20 = ₹10,000, although only 400 kg of dust exists: normal loss is valued on the estimated figure (SM 10.10).
- The **abnormal gain account** gives up the dust that was never there to sell: it is debited with 100 kg × ₹20 = ₹2,000 (to the normal loss account), and only the balance, ₹4,500, is credited to the costing P&L. "The Costing P&L Account is credited only for actual gain amount" (SM 10.11). The normal loss account's ₹10,000 is then cleared by that ₹2,000 and ₹8,000 from the 400 kg of dust sold.

::: diagram The roaster in June and July, in kilograms
{"type": "nest", "w": 400,
 "boxes": [
  {"id": "j", "title": "June: 10,000 kg in", "mono": false, "color": "a", "dir": "h", "children": [
    {"title": "Normal loss", "mono": false, "color": "c", "rows": [["kg", "500"], ["scrap", "₹10,000"]]},
    {"title": "Normal output", "note": "@ ₹65", "mono": false, "color": "b", "children": [
      {"title": "To blending", "mono": false, "rows": [["kg", "9,300"], ["₹", "6,04,500"]]},
      {"title": "Abnormal loss", "mono": false, "color": "d", "rows": [["kg", "200"], ["₹", "13,000"]]}]}]},
  {"id": "u", "title": "July: 10,000 kg in", "mono": false, "color": "a", "dir": "h", "children": [
    {"title": "Expected loss 500 kg", "mono": false, "color": "c", "children": [
      {"title": "Dust", "mono": false, "rows": [["kg", "400"], ["sold", "₹8,000"]]},
      {"title": "Abnormal gain", "mono": false, "color": "g", "rows": [["kg", "100"], ["₹", "6,500"]]}]},
    {"title": "Normal output", "note": "@ ₹65", "mono": false, "color": "b", "rows": [["kg", "9,500"], ["₹", "6,17,500"]]}]}
 ],
 "caption": "June: abnormal loss is carved out of the normal output, so it costs what a good kilogram costs. July: abnormal gain is carved out of the expected loss; it leaves the drum as good tea, so blending receives 9,500 + 100 = 9,600 kg at ₹65."}
:::

### Three kinds of loss, three treatments

::: diagram Process loss: which kind, which treatment
{"type": "tree", "gapX": 14,
 "root": {"label": "Process loss\ninput − output", "children": [
  {"label": "Normal loss\nas expected", "note": "absorbed by good units", "color": "c"},
  {"label": "Abnormal loss\nmore than expected", "note": "good-unit cost → P&L", "color": "bad"},
  {"label": "Abnormal gain\nless than expected", "note": "good-unit cost → P&L", "color": "ok"}]},
 "caption": "Amber: normal loss, whose scrap value is credited to the process. Rose: abnormal loss, credited to the process and debited to the costing P&L. Green: abnormal gain, debited to the process and credited to the costing P&L net of the scrap it replaces."}
:::

## Formats and formulas

ICAI writes each account as a T-account, debit side on the left and credit side on the right, with a units column beside every amount column. On a phone the credit side drops below the debit side, and in the worked examples the longer process accounts always show it below; on paper, write them side by side. *Reproduce these formats from memory.*

**Process I Account**

::: cols
| Dr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| To Materials (in Process II: To Process I A/c) | xxx | xxx |
| To Direct wages | – | xxx |
| To Direct expenses | – | xxx |
| To Production overheads | – | xxx |
| To Abnormal gain A/c (units × normal cost) | xxx | xxx |
| **Total** | **xxx** | **xxx** |
---
| Cr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (normal units × scrap rate) | xxx | xxx |
| By Abnormal loss A/c (units × normal cost) | xxx | xxx |
| By Process II A/c (units transferred × normal cost) | xxx | xxx |
| **Total** | **xxx** | **xxx** |
:::

Units and rupees must both balance. Only one of the two abnormal lines appears in a month.

**Abnormal Loss Account**

::: cols
| Dr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| To Process I A/c | xxx | xxx |
| **Total** | **xxx** | **xxx** |
---
| Cr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| By Bank (abnormal units × scrap rate) | xxx | xxx |
| By Costing P&L A/c (balance) | – | xxx |
| **Total** | **xxx** | **xxx** |
:::

**Abnormal Gain Account**

::: cols
| Dr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| To Normal Loss A/c (gain units × scrap rate) | xxx | xxx |
| To Costing P&L A/c (balance) | – | xxx |
| **Total** | **xxx** | **xxx** |
---
| Cr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| By Process I A/c | xxx | xxx |
| **Total** | **xxx** | **xxx** |
:::

**Normal Loss Account**

::: cols
| Dr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| To Process I A/c (normal loss units × scrap rate) | xxx | xxx |
| **Total** | **xxx** | **xxx** |
---
| Cr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| By Abnormal Gain A/c (gain units × scrap rate), if any | xxx | xxx |
| By Bank or Cost Ledger Control A/c (scrap actually sold) | xxx | xxx |
| **Total** | **xxx** | **xxx** |
:::

::: formula Normal cost per unit
$$\text{Normal output} = \text{Input units} \qquad - \text{Normal loss units}$$

$$\text{Cost per unit} \qquad = \frac{\text{Total cost} - \text{Scrap value}}{\text{Normal output}}$$
Scrap value is that of the normal loss. ICAI's words: (Total cost − Realisable value of normal loss) ÷ (Total input units − Normal loss units). The rate values units transferred, abnormal loss and abnormal gain (SM 10.7–10.10).
:::

::: formula Value of normal loss
$$\text{Value of normal loss} \qquad = \text{Normal loss units} \qquad \times (\text{Realisable value} - \text{Cost to sell})$$
ICAI: "Scrap realisable value less cost to sale" (SM 10.6).
:::

::: formula Abnormal units
$$\text{Abnormal loss (gain)} \qquad = \text{Normal output} - \text{Actual output}$$
Positive: abnormal loss; negative: abnormal gain.
:::

::: formula What reaches the costing P&L
$$\text{Net amount} = \text{Abnormal units} \qquad \times (\text{Cost per unit} - \text{Scrap rate})$$
A debit to the costing P&L for an abnormal loss, a credit for an abnormal gain (ICAI's income statement, SM 10.15).
:::

::: definition Process loss
The loss of material arising during the course of a processing operation, equal to the difference between the input quantity of the material and its output. (SM 10.5)
:::

::: definition Normal process loss
The loss of material which is inherent in the nature of work. It can be reasonably anticipated from the nature of the material, nature of operation, experience and technical data; it is unavoidable because of the nature of the material or the process. It also includes units withdrawn from the process for test or sampling. (SM 10.6)
:::

::: definition Abnormal process loss
The loss in excess of the pre-determined loss (normal process loss). It may occur due to carelessness of workers, a bad plant design or operation, sabotage etc.; it cannot be estimated in advance, but it can be kept under control by taking suitable measures. (SM 10.8)
:::

::: definition Abnormal gain
An unexpected gain in production under normal conditions: the difference between actual and expected loss, or actual and expected production, when the loss is less than the normal figure. It arises from over-estimation of process loss, improved efficiency of workers, better technology etc. (SM 10.9)
:::

## Worked examples

::::: example The kulhad kiln and the 300 extra cracks
Tapri fires its own clay kulhads. In October, 25,000 raw kulhads were loaded into the kiln. Costs charged to the Kiln process were: clay and glaze ₹2,00,000, kiln workers' wages ₹1,10,000, fuel and kiln overheads ₹99,000. Normal breakage is 4% of input, and broken pieces are sold to a brick maker at ₹1 each. 23,700 good kulhads were transferred to the Packing process. There was no opening or closing stock.

**Required:**

(i) Prepare the Kiln Process Account.

(ii) Prepare the Normal Loss Account and the Abnormal Loss Account.

(iii) Kesar wants the extra breakage "adjusted in the cost of the good kulhads". Calculate the cost per kulhad on his basis, and state why cost accounts do not follow it.

:::: answer Show the working
**Working notes**

1. Normal loss = 4% × 25,000 = 1,000 kulhads; scrap value 1,000 × ₹1 = ₹1,000.
2. Normal output = 25,000 − 1,000 = 24,000. Actual output 23,700, so abnormal loss = 300 kulhads.
3. Total cost = ₹2,00,000 + ₹1,10,000 + ₹99,000 = ₹4,09,000.
4. Cost per kulhad = (₹4,09,000 − ₹1,000) ÷ 24,000 = **₹17**.

**(i) Kiln Process Account** (debit side)

| Dr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| To Clay and glaze | 25,000 | 2,00,000 |
| To Wages | – | 1,10,000 |
| To Fuel and kiln overheads | – | 99,000 |
| **Total** | **25,000** | **4,09,000** |

**Kiln Process Account** (credit side)

| Cr. Particulars | Units | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (1,000 × ₹1) | 1,000 | 1,000 |
| By Abnormal loss A/c (300 × ₹17) | 300 | 5,100 |
| By Packing process A/c (23,700 × ₹17) | 23,700 | 4,02,900 |
| **Total** | **25,000** | **4,09,000** |

**(ii) Normal Loss Account**

::: cols
| Dr. | Units | (₹) |
|---|---:|---:|
| To Kiln Process A/c | 1,000 | 1,000 |
| **Total** | **1,000** | **1,000** |
---
| Cr. | Units | (₹) |
|---|---:|---:|
| By Bank (broken pieces sold) | 1,000 | 1,000 |
| **Total** | **1,000** | **1,000** |
:::

**Abnormal Loss Account**

::: cols
| Dr. | Units | (₹) |
|---|---:|---:|
| To Kiln Process A/c | 300 | 5,100 |
| **Total** | **300** | **5,100** |
---
| Cr. | Units | (₹) |
|---|---:|---:|
| By Bank (300 × ₹1) | 300 | 300 |
| By Costing P&L A/c | – | 4,800 |
| **Total** | **300** | **5,100** |
:::

**(iii) Kesar's basis.** All 1,300 broken kulhads treated as normal: (₹4,09,000 − ₹1,300) ÷ 23,700 = **₹17.2025** a kulhad. The extra ₹0.2025 on 23,700 kulhads is ₹4,800, exactly the net abnormal loss, now hidden in Packing and in stock.

The cost of an abnormal process loss is not treated as a part of the cost of the product; it is debited to the costing profit and loss account. Charging it to good units would overstate their cost and stock, and hide an avoidable loss that management must investigate and control.
::::
:::::

::::: example Chai premix through two processes, one loss and one gain
Tapri's masala chai premix passes through Grinding (Process I) and Blending (Process II) and is then transferred to finished stock. For November:

| Particulars | Process I | Process II |
|---|---:|---:|
| Raw tea and spices used | 8,000 kg @ ₹150 | – |
| Additional materials (essences, film) | – | ₹1,85,000 |
| Direct wages | ₹2,40,000 | ₹1,80,000 |
| Direct expenses | 50% of direct wages | 60% of direct wages |
| Manufacturing overheads | 25% of direct wages | 20% of direct wages |
| Normal loss (on input) | 5% | 4% |
| Realisable value of scrap per kg | ₹30 | ₹50 |
| Transferred to next process / finished stock | 7,500 kg | 7,260 kg |

7,100 kg of premix were sold at ₹360 a kg. There was no opening or closing work-in-process. Additional materials in Process II add no weight.

**Required:** Prepare Process I Account, Process II Account, Abnormal Loss Account, Abnormal Gain Account, Finished Stock Account and an Income Statement. (Work rates to four decimals and amounts to the nearest rupee, as ICAI's illustrations do.)

:::: answer Show the working
**Working notes**

| Particulars | Process I | Process II |
|---|---:|---:|
| Input (kg) | 8,000 | 7,500 |
| Normal loss (kg) | 400 | 300 |
| Normal output (kg) | 7,600 | 7,200 |
| Actual output (kg) | 7,500 | 7,260 |
| Abnormal loss / (gain) (kg) | 100 | (60) |
| Scrap value of normal loss (₹) | 12,000 | 15,000 |

1. Process I cost = ₹12,00,000 + ₹2,40,000 + ₹1,20,000 + ₹60,000 = ₹16,20,000. Cost per kg = (₹16,20,000 − ₹12,000) ÷ 7,600 = **₹211.5789**.
2. Process II cost = ₹15,86,842 (from Process I) + ₹1,85,000 + ₹1,80,000 + ₹1,08,000 + ₹36,000 = ₹20,95,842. Cost per kg = (₹20,95,842 − ₹15,000) ÷ 7,200 = **₹289.0058**.

**Process I Account** (debit side)

| Dr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| To Raw tea and spices (8,000 × ₹150) | 8,000 | 12,00,000 |
| To Direct wages | – | 2,40,000 |
| To Direct expenses | – | 1,20,000 |
| To Manufacturing overheads | – | 60,000 |
| **Total** | **8,000** | **16,20,000** |

**Process I Account** (credit side)

| Cr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (400 × ₹30) | 400 | 12,000 |
| By Abnormal loss A/c (100 × ₹211.5789) | 100 | 21,158 |
| By Process II A/c (7,500 × ₹211.5789) | 7,500 | 15,86,842 |
| **Total** | **8,000** | **16,20,000** |

**Process II Account** (debit side)

| Dr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| To Process I A/c | 7,500 | 15,86,842 |
| To Additional materials | – | 1,85,000 |
| To Direct wages | – | 1,80,000 |
| To Direct expenses | – | 1,08,000 |
| To Manufacturing overheads | – | 36,000 |
| To Abnormal gain A/c (60 × ₹289.0058) | 60 | 17,340 |
| **Total** | **7,560** | **21,13,182** |

**Process II Account** (credit side)

| Cr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (300 × ₹50) | 300 | 15,000 |
| By Finished stock A/c (7,260 × ₹289.0058) | 7,260 | 20,98,182 |
| **Total** | **7,560** | **21,13,182** |

**Abnormal Loss Account**

::: cols
| Dr. | Kg | (₹) |
|---|---:|---:|
| To Process I A/c | 100 | 21,158 |
| **Total** | **100** | **21,158** |
---
| Cr. | Kg | (₹) |
|---|---:|---:|
| By Bank (100 × ₹30) | 100 | 3,000 |
| By Income statement (Costing P&L) | – | 18,158 |
| **Total** | **100** | **21,158** |
:::

**Abnormal Gain Account**

::: cols
| Dr. | Kg | (₹) |
|---|---:|---:|
| To Normal loss A/c (60 × ₹50) | 60 | 3,000 |
| To Income statement (Costing P&L) | – | 14,340 |
| **Total** | **60** | **17,340** |
---
| Cr. | Kg | (₹) |
|---|---:|---:|
| By Process II A/c | 60 | 17,340 |
| **Total** | **60** | **17,340** |
:::

**Finished Stock Account**

::: cols
| Dr. | Kg | (₹) |
|---|---:|---:|
| To Process II A/c | 7,260 | 20,98,182 |
| **Total** | **7,260** | **20,98,182** |
---
| Cr. | Kg | (₹) |
|---|---:|---:|
| By Cost of sales | 7,100 | 20,51,941 |
| By Balance c/d | 160 | 46,241 |
| **Total** | **7,260** | **20,98,182** |
:::

Both credits at ₹289.0058 a kg: 7,100 × ₹289.0058 and 160 × ₹289.0058.

**Income Statement**

::: cols
| Dr. Particulars | Amount (₹) |
|---|---:|
| To Cost of sales | 20,51,941 |
| To Abnormal loss {100 × (₹211.5789 − ₹30)} | 18,158 |
| To Net profit | 5,00,241 |
| **Total** | **25,70,340** |
---
| Cr. Particulars | Amount (₹) |
|---|---:|
| By Sales (7,100 × ₹360) | 25,56,000 |
| By Abnormal gain {60 × (₹289.0058 − ₹50)} | 14,340 |
| **Total** | **25,70,340** |
:::

The Process II normal loss account (₹15,000) is cleared by ₹3,000 from the abnormal gain account and ₹12,000 from the sale of the 240 kg of scrap that was actually produced.
::::
:::::

## Under the hood

### The base of the normal loss, and scrap worth nothing

Read the base from the question. If the scrap fetches nothing, the normal loss line shows units and ₹ nil (SM 10.6). "5% of input" is the usual wording; with work-in-process ICAI also uses "10% of total input including units in process at the beginning" (SM 10.19) or a percentage of fresh input only (SM 10.37). Those need equivalent units: [[cma.proc.eu|equivalent units: FIFO and weighted average]].

### Why the gain gives up the scrap

The process account's normal loss credit assumed 100 kg of dust worth ₹2,000. By turning into good tea, those 100 kg earned ₹6,500 of good-unit value but lost ₹2,000 of dust value: the real benefit is ₹4,500, which is what the abnormal gain account passes on.

### Next door

See [[cma.mat.losses|waste, scrap, spoilage and defectives]], [[cma.joint.byprod|treatment of by-products]], [[cma.sys.ledgers|integrated and non-integrated accounts]] (scrap through the cost ledger control account) and [[cma.proc.interprocess|inter-process profit]] (transfers at a profit).

## Exam angle

::: exam Where process losses appeared in the documents read for this lesson
- **Descriptive, 5 to 10 marks.** Process account and income statement with an accident loss in rupees and containers: January 2026 Q2(b) (5 marks). Two processes, part of the output sold, abnormal loss and gain accounts and the costing P&L: MTP Series I for May 2025 Q3(a) (10 marks); the same pattern over three processes in RTP September 2025 Q13. Process I and the abnormal gain account: December 2021 (old scheme) Q1(d) (5 marks).
- **Multiple choice, 2 marks each.** Value transferred to Process II: September 2025 MCQ 14. Normal loss % and abnormal gain worked backwards: May 2025 MCQ 15. Abnormal gain or loss in Process II: RTP May 2025 MCQ 5. Abnormal loss in a FIFO case: September 2024 MCQ 3.
- **Theory, 5 marks.** "How will you treat normal loss, abnormal loss and abnormal gain in process costing? Explain.": May 2023 (old scheme) Q6(e).
:::

::: exam The traps ICAI set
- **Work it backwards** (May 2025 MCQ 15): normal loss = input − output + abnormal gain; then its percentage of input.
- **An accident given in rupees** (January 2026 Q2(b)): "other expenses ₹37,350 including an abnormal loss of ₹12,500 due to an accident". The suggested answer charged only ₹24,850 to the process and put the ₹12,500 straight into the income statement. Oil and containers each had a normal and an abnormal part, in their own columns.
- **Part of the output sold, part transferred** (MTP May 2025 Q3(a), RTP September 2025 Q13): both at the same cost per unit.
- The paper's own instruction: "Working notes should form part of the answer."
:::

::: trick Three checks before you move on
Units balance; rupees balance; good units, abnormal loss and abnormal gain carry the same cost per unit. When one fails, the normal loss is usually on the wrong base or at actual instead of normal units. Holds for any process account, with or without scrap value.
:::

## Answer frame

### Theory: "How will you treat normal loss, abnormal loss and abnormal gain in process costing?"

ICAI's suggested answer (May 2023 Q6(e), old scheme) is the Study Material's three treatment paragraphs, in this order:

1. **Normal loss.** The cost of normal process loss is absorbed by good units produced under the process. The amount realised by the sale of normal process loss units is credited to the process account.
2. **Abnormal loss.** ==The cost of an abnormal process loss unit is equal to the cost of a good unit.== The total cost of abnormal process loss is credited to the process account from which it arises; it is not treated as a part of the cost of the product, and is debited to the costing profit and loss account.
3. **Abnormal gain.** The process account under which abnormal gain arises is debited with the abnormal gain and credited to the abnormal gain account, which is closed by transfer to the costing profit and loss account. The cost of abnormal gain is computed on the basis of normal production.

Open each heading with one line on the loss's meaning (normal: inherent, anticipated; abnormal: beyond the pre-determined loss, controllable). For "What is process costing? State its features.": ICAI's definition, the six features in ICAI's order, three industries.

### The numerical parts: three answers to the same question

::: cols
**Loses marks**

A process account with "By Abnormal loss 300, ₹5,100" and no working: if ₹17 is wrong, nothing earns method marks.
---
**Passes**

Working notes and the process account, but no abnormal loss account: the ₹4,800 to the costing P&L never appears.
---
**Full marks**

Working notes, the process account with units and amounts on both sides, and the loss and gain accounts closed to bank and the costing P&L.
:::

## Common mistakes

::: mistake Hall of Shame: the abnormal loss that went to the costing P&L at the wrong rate
Valuing the roaster's 200 kg at ₹6,27,500 ÷ 10,000 = ₹62.75 (the average over all input) or at the ₹20 scrap rate. **Fix:** abnormal loss costs what a good unit costs, (total cost − scrap value of normal loss) ÷ normal output = ₹65. The scrap rate enters later, in the abnormal loss account.
:::

::: mistake The abnormal gain that forgot the dust it replaced
Crediting the full ₹6,500 of July's abnormal gain to the costing P&L. **Fix:** the abnormal gain account is debited with the scrap value of the gain units (100 × ₹20 = ₹2,000, to the normal loss account); only ₹4,500 reaches the costing P&L.
:::

::: mistake Normal loss credited at the actual loss
In July, crediting the process with 400 kg × ₹20 = ₹8,000 because only 400 kg was lost. **Fix:** the process account always credits the **normal** loss, 500 kg × ₹20 = ₹10,000; the abnormal gain account handles the 100 kg difference.
:::

## Practice

::: quiz Check yourself
Q: A Tapri blending process received 4,000 kg costing ₹2,47,200 in all. Normal loss is 5% of input and is sold at ₹16 a kg. Output was 3,700 kg. What is the value of the abnormal loss, to the nearest rupee?
= 6420..6422
> Normal loss 200 kg, scrap ₹3,200. Cost per kg = (₹2,47,200 − ₹3,200) ÷ 3,800 = ₹64.2105. Abnormal loss = 3,800 − 3,700 = 100 kg, valued at ₹6,421.

Q: Case scenario. Ritu reviews the Packing process for March: 12,000 units were input at a total cost of ₹5,78,400. Normal loss is 4% of input, saleable at ₹5 a unit. Output was 11,700 units. Kesar asks what this process puts into the costing profit and loss account for March. Which is correct?
- [ ] ₹9,000 credited to the costing P&L
- [x] ₹8,100 credited to the costing P&L
- [ ] ₹900 debited to the costing P&L
- [ ] ₹8,100 debited to the costing P&L
> Normal loss 480 units (scrap ₹2,400); cost per unit = ₹5,76,000 ÷ 11,520 = ₹50. Output beats the normal 11,520 by 180 units: abnormal gain ₹9,000, less the ₹900 of scrap those units would have fetched. ₹8,100 is credited; ₹9,000 forgets the scrap.

Q: In a month with an abnormal gain, at what quantity is the normal loss credited to the process account?
- [ ] The actual loss units
- [x] The normal (expected) loss units
- [ ] The normal loss units less the abnormal gain units, at good-unit cost
- [ ] No normal loss is credited when there is an abnormal gain
> Normal loss is valued on the estimated figure even when the actual loss is less (SM 10.10); the abnormal gain account adjusts the difference.

Q: Which of these are credited to the Abnormal Loss Account? Select all that apply.
- [x] The scrap value realised from the abnormal loss units
- [ ] The cost of the abnormal loss units at the normal cost per unit
- [x] The balance transferred to the costing profit and loss account
- [ ] The scrap value of the normal loss units
> Debited with the abnormal loss at good-unit cost; credited with its scrap and the balance to the costing P&L. Normal loss scrap goes to the process account.

Q: Units withdrawn from a process for testing or sampling are treated as which of the following?
- [x] Normal process loss
- [ ] Abnormal process loss
- [ ] Abnormal gain
- [ ] A by-product
> ICAI's definition of normal process loss "also includes units withdrawn from the process for test or sampling" (SM 10.6).
:::

## Recap

- Process costing: costs charged to processes and averaged over units produced.
- Normal loss = input × normal %; its scrap value (realisable value less cost to sell) is credited to the process.
- Cost per unit = (total cost − scrap value of normal loss) ÷ (input − normal loss units).
- Abnormal loss (gain) = normal output − actual output (or the reverse), valued at the same cost per unit.
- Abnormal loss: credited to the process; scrap credited in the abnormal loss account; balance debited to the costing P&L.
- Abnormal gain: debited to the process; the abnormal gain account gives up the scrap value of the gain units; balance credited to the costing P&L.
- The process is credited with the normal loss on the expected figure, even in a month of abnormal gain.
- Units and rupees must both balance. (Steam is a cost of chai; a boil-over is not.)

## Flashcards

Q:: ICAI's definition of process costing?
A:: A method of cost accounting whereby costs are charged to processes or operations and averaged over units produced.

Q:: Formula: cost per unit of good output in a process with normal loss?
A:: (Total cost − realisable value of normal loss) ÷ (total input units − normal loss units).

Q:: Treatment of normal process loss in cost accounts?
A:: Its cost is absorbed by the good units produced; the amount realised by selling the normal loss units is credited to the process account.

Q:: Treatment of abnormal process loss in cost accounts?
A:: Each unit is valued at the cost of a good unit; the total is credited to the process account and debited to the costing profit and loss account (via the abnormal loss account, net of scrap realised).

Q:: Treatment of abnormal gain in cost accounts?
A:: The process account is debited and the abnormal gain account credited at the normal cost per unit; the abnormal gain account is closed to the costing P&L after deducting the scrap value the gain units would have fetched.

Q:: How is the value of normal loss computed?
A:: Normal loss units × (scrap realisable value less cost to sell); it is calculated on the estimated (normal) figure even when the actual loss is less.

Q:: ICAI: three causes of abnormal process loss?
A:: Carelessness of workers, a bad plant design or operation, sabotage (it cannot be estimated in advance but can be controlled).

Q:: ICAI: three causes of abnormal gain?
A:: Over-estimation of process loss, improvement in work efficiency of workers, use of better technology in production.

Q:: Are units withdrawn for test or sampling a normal or an abnormal loss?
A:: Normal process loss.

Q:: What does the Abnormal Gain Account debit before the balance goes to the costing P&L?
A:: The normal loss account, with the scrap value of the abnormal gain units (gain units × scrap rate).

Q:: Process costing: six basic features, in ICAI's order?
A:: Plant divided into processes; continuous manufacture; output of one process is input of another; like units; no tracing of output lots to input lots; may give rise to joint and by-products.
