---
id: fm.capbud.cashflows
title: Capital budgeting and estimating relevant cash flows
minutes: 40
needs: fm.coc.wacc
tags: capital budgeting, relevant cash flows, incremental cash flows, tax shield, sunk cost, opportunity cost, working capital, block of assets
labs:
summary: Why capital budgeting decisions matter, the types of investment decision, and how to build a project's post-tax incremental cash flows: initial outflow, interim flows and the terminal year.
---

## In plain words

### Five "costs" Kesar wanted to add

Kesar wants a ₹50 lakh frozen-samosa line at the Indore factory, and Dev must list the cash it will bring in and send out. Kesar has helped.

> **Kesar:** Put everything in, Dev. The consultant's ₹1.5 lakh fee, a share of head-office rent, the loan interest, the depreciation. Sab adjust ho jayega.
> **Dev:** The fee is paid whether we build or not. Head office costs the same either way. The interest is already inside the 12% I discount at. And depreciation is not cash.
> **Kesar:** Then what do you count?
> **Dev:** Only what changes in our bank account because we say yes. After tax.

Choosing long-term investments is **capital budgeting**, and its raw material is a project's **incremental cash flows**: the cash that comes in or goes out only because the project is accepted, after tax.

Some items fool you. The line will take over floor space Tapri now lets to a courier company, so the rent given up is a real cost though no cheque is written: an **opportunity cost**. Depreciation is never paid to anyone, but it lowers the tax bill, and that saving is cash. Money tied up in stock and debtors (**working capital**) goes in at the start and comes back at the end.

::: analogy Two photographs of the bank account
Photograph Tapri's bank balance every year with the samosa line, and again without it. The relevant cash flows are the differences between the two photos. The consultant's fee, already paid, shows up in both photos and cancels out; so does head-office rent. The courier's rent shows up only in the "without" photo, so losing it counts.
:::

::: key
Only post-tax incremental cash flows count: what changes in cash because the project is accepted. Depreciation counts only through the tax it saves; sunk costs, allocated overheads and financing costs stay out.
:::

## How it works

### Why these decisions keep a CFO awake

Capital budgeting identifies projects strategic to the business, estimates and evaluates ==post-tax incremental cash flows== for each, and selects the proposal that maximises the return to investors (SM 7.3). The decisions are critical for four reasons, in ICAI's order (SM 7.3):

1. **Substantial investment**: investment decisions serve long-term objectives and the existence of the organisation, need substantial capital, and the size of capital and timing of cash flows decide the sources of finance; so they need thorough study and planning.
2. **Long time period**: the decision has its effect over a long period; it affects future benefits and costs and influences the rate and direction of the firm's growth.
3. **Irreversibility**: most investment decisions are irreversible; once implemented, reversing them is very difficult and economically not possible (upfront payments, contractual obligations, technological impossibilities).
4. **Complex decisions**: they involve assessing future events that are difficult to predict, and it is difficult to estimate all the benefits and costs in quantitative terms.

### Six phases, one loop

::: diagram The capital budgeting process
{"type": "flow", "w": 420, "nodes": [
  {"id": "p", "kind": "start", "label": "Planning"},
  {"id": "e", "kind": "process", "label": "Evaluation"},
  {"id": "s", "kind": "process", "label": "Selection"},
  {"id": "i", "kind": "process", "label": "Implementation"},
  {"id": "c", "kind": "process", "label": "Control"},
  {"id": "r", "kind": "end", "label": "Review"}],
 "edges": [["p", "e"], ["e", "s"], ["s", "i"], ["i", "c"], ["c", "r"], ["r", "p", "new ideas"]],
 "caption": "Review may produce ideas for new proposals, which start the loop again."}
:::

In ICAI's words (SM 7.4–7.5):

1. **Planning**: potential investment opportunities are identified; their potential effect on the firm and management's ability to exploit them are assessed; little-merit ones are rejected and promising ones advanced as proposals.
2. **Evaluation**: the proposal's investment, inflows and outflows are determined and appraised by a technique, from payback and ARR to discounted cash flow, chosen to give the best decision in the circumstances.
3. **Selection**: considering the returns and risks of the projects and the cost of capital, the projects that maximise shareholders' wealth are chosen.
4. **Implementation**: the firm acquires the necessary funds, purchases the assets and begins the project.
5. **Control**: progress is monitored through feedback reports: capital expenditure progress reports, performance reports comparing actual performance against plans, and post-completion audits.
6. **Review**: when the project terminates, or even before, it is reviewed to explain its success or failure; this may change planning and evaluation procedures and produce ideas for new proposals.

### Two ways to sort a decision

::: diagram On the basis of the firm's existence
{"type": "tree", "root": {"label": "Firm's existence", "children": [
  {"label": "Replacement and\nmodernisation", "note": "cost reduction"},
  {"label": "Expansion", "note": "revenue expansion"},
  {"label": "Diversification", "note": "revenue expansion"}]},
 "caption": "Replacement: the economic life is over. Modernisation: the asset is technologically outdated. Both are cost reduction decisions (SM 7.6)."}
:::

::: diagram On the basis of the decision situation
{"type": "tree", "root": {"label": "Decision situation", "children": [
  {"label": "Mutually\nexclusive", "note": "one excludes others"},
  {"label": "Accept-reject", "note": "independent"},
  {"label": "Contingent", "note": "one needs another"}]},
 "caption": "Semi-automatic or highly automatic machine: mutually exclusive. A factory in a remote area that also needs roads and staff houses: contingent (SM 7.6–7.7)."}
:::

**Mutually exclusive decisions**: acceptance of one proposal will exclude the acceptance of the other alternative proposals. **Accept-reject decisions**: the proposals are independent and do not compete; those giving a higher return than the desired rate are accepted and the rest rejected. **Contingent decisions**: the proposals are dependable, so investment in one requires investment in one or more others (SM 7.6–7.7).

The procedure has three steps (SM 7.7): estimate each project's cash flows over its entire life; evaluate each alternative by the decision criteria; determine the minimum required rate of return, i.e. [[fm.coc.wacc|the WACC]], as the discount rate.

### What goes into the cash flows

Cash flows, not accounting profit, count: their timing may differ, and depreciation has no outflow (SM 7.7). The project's life is set by technological obsolescence, physical deterioration and decline in demand for the product (SM 7.8). Six items need care, in ICAI's order (SM 7.8–7.10):

::: steps
1. **Depreciation**: non-cash, but it reduces tax; the **tax shield** (depreciation × tax rate) is a cash inflow. ₹9,00,000 of depreciation at 25% saves ₹2,25,000.
2. **Opportunity cost**: a benefit given up; included in outflows, at the start or during the project. Land that could be sold for ₹10 crore today is a ₹10 crore outlay, whatever it cost.
3. **Sunk cost**: already incurred and irreversible, so excluded, like a project report fee already paid.
4. **Working capital**: the initial requirement is an outflow and its release at the end an inflow; extra working capital later is an outflow, a reduction an inflow. No depreciation on it; if nothing is said, the full amount is released at the end.
5. **Allocated overheads**: existing costs spread over the proposal are not cash flows; only an increase caused by it is.
6. **Additional capital investment** during the project is an outflow in that year.
:::

::: diagram Is this item a relevant cash flow?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "An item in the data"},
  {"id": "d1", "kind": "decision", "label": "Non-cash, like\ndepreciation?"},
  {"id": "d2", "kind": "decision", "label": "Cash changes\nbecause of\nthe project?"},
  {"id": "d3", "kind": "decision", "label": "Interest or\ndividend?"},
  {"id": "x3", "kind": "end", "label": "Only its\ntax shield", "color": "c"},
  {"id": "x1", "kind": "end", "label": "Ignore (sunk,\nallocated)", "color": "mute"},
  {"id": "x2", "kind": "end", "label": "Exclude\n(in the WACC)", "color": "mute"},
  {"id": "in", "kind": "end", "label": "Include,\nafter tax", "color": "ok"}],
 "edges": [["s", "d1"], ["d1", "x3", "yes"], ["d1", "d2", "no"], ["d2", "x1", "no"], ["d2", "d3", "yes"], ["d3", "x2", "yes"], ["d3", "in", "no"]],
 "caption": "Amber: depreciation and other non-cash items enter only as the tax they save. Grey ends: left out (sunk costs, allocated overheads, interest and dividends). Green: in the cash flows, net of tax. Opportunity costs and working capital pass every test."}
:::

The cash flows fall into three categories (SM 7.10–7.12): the **initial cash outflow** (year 0), the **interim cash flows** of each year of operation, and the **terminal-year net cash flow**, which adds salvage, the tax effect of the sale and the release of working capital. Each has an ICAI format, below.

### Three principles

**6.1 Block of assets and depreciation.** For tax, depreciation is charged on a **block of assets**: a group of assets in one class depreciated at the same rate (SM 7.12–7.13). In the year an asset is sold:

- **Only asset in the block** (the block ceases): no depreciation that year; WDV at the beginning of the year minus sale value is a short-term capital loss (tax benefit), or a gain (tax outflow) if the sale value is higher (SM 7.13–7.14).
- **More than one asset**: depreciation that year on (opening WDV − sale value); none if the sale value exceeds the opening WDV (SM 7.14).

Both cases are worked in the kiln example below.

**6.2 Exclusion of financing costs.** Interest on long-term debt and dividends are excluded because they are reflected in the WACC; deducting them too means ==the cost of long-term funds will be counted twice== (SM 7.14). If profit was struck after interest, add back interest × (1 − tax rate).

**6.3 Post-tax principle.** The discounting rate and the cash flows, both must be post-tax only (SM 7.16).

## Formats and formulas

*Reproduce these formats from memory; ICAI's suggested answers follow them line by line.*

**Initial cash outflow: a fresh proposal or an expansion** (SM 7.10)

| Particulars | Amount | Amount |
|---|---:|---:|
| Cost of new asset(s) | | xxx |
| Add: Installation/set-up costs | xxx | |
| Add: Investment in working capital | xxx | xxx |
| **Initial cash outflow** | | **xxx** |

**Initial cash outflow: a replacement decision** (SM 7.10–7.11)

| Particulars | Amount | Amount |
|---|---:|---:|
| Cost of new asset(s) | | xxx |
| Add: Installation/set-up costs | xxx | |
| Add/(less): Increase (decrease) in net working capital level | xxx | |
| Less: Net proceeds from sale of old assets | (xxx) | |
| Add/(less): Tax expense (saving/loss) due to sale of old asset | xxx | xxx |
| **Initial cash outflow** | | **xxx** |

**Interim cash flow: a new project** (SM 7.11)

| Particulars | Amount | Amount |
|---|---:|---:|
| Profit after tax (PAT) | | xxx |
| Add: Non-cash expenses (e.g. depreciation) | xxx | |
| Add/(less): Net decrease (increase) in working capital | xxx | xxx |
| **Interim net cash flow for the period** | | **xxx** |

**Interim cash flow: a replacement decision** (SM 7.11–7.12)

| Particulars | Amount |
|---|---:|
| Net increase (decrease) in operating revenue | xxx |
| Add/(less): Net decrease (increase) in operating expenses | xxx |
| Net changes in income before taxes | xxx |
| Add/(less): Net decrease (increase) in taxes | xxx |
| Net change in income after taxes | xxx |
| Add/(less): Net decrease (increase) in depreciation charges | xxx |
| **Incremental net cash flow for the period** | **xxx** |

The format is reproduced as the Study Material prints it. In the arithmetic, the change in depreciation is deducted (as an operating expense) before the change in taxes is worked out; the last adjustment then reverses it, because depreciation is not cash: an increase in depreciation is added back, a decrease deducted. The pouch-packer example below shows the lines.

**Terminal-year net cash flow** (SM 7.12)

| Particulars | Amount | Amount |
|---|---:|---:|
| Final salvage value (disposal costs) of asset | | xxx |
| Add: Interim cash flow | xxx | |
| Add/(less): Tax savings (tax expenses) due to sale or disposal of asset (including depreciation) | xxx | |
| Add: Release of net working capital | xxx | xxx |
| **Terminal year net cash flow** | | **xxx** |

**Statement showing the calculation of cash inflow after tax (CFAT)** (SM 7.16)

| Particulars | (₹) | (₹) |
|---|---:|---:|
| Sales value | | xxx |
| Less: Variable cost | | xxx |
| **Contribution** | | **xxx** |
| Less: Fixed cost: (a) fixed cash cost (excluding interest) | xxx | |
| (b) Depreciation | xxx | xxx |
| Earning before tax (EBT) | | xxx |
| Less: Tax | | xxx |
| Earning after tax (EAT) | | xxx |
| Add: Depreciation | | xxx |
| **Cash inflow after tax (CFAT)** | | **xxx** |

::: formula Tax shield on depreciation
$$\text{Tax shield} = \text{Depreciation} \times \text{Tax rate}$$
:::

::: formula Profit after tax excluding financing cost
$$\text{PBIT} \times (1 - t) \qquad = \text{PAT} + \text{Interest} \times (1 - t)$$
PBIT = profit before interest and tax, PAT = profit after tax (struck after interest), t = tax rate (SM 7.15).
:::

::: formula Terminal year: only asset in the block, or other assets in it
$$\text{STCL (STCG)} = W_0 - S \qquad \text{Depreciation} = (W_0 - S) \times r$$
W₀ = WDV at the beginning of the year of sale, S = sale value, r = depreciation rate. The first when the block ceases; the second when it continues and S is below W₀ (SM 7.13–7.14).
:::

::: definition Capital budgeting
The process of evaluating and selecting long-term investments that are in line with the goal of investor's wealth maximization. (SM 7.69)
:::

::: definition Sunk cost
An outlay of cash that has already been incurred in the past and cannot be reversed in present. (SM 7.9)
:::

::: definition Opportunity cost
Foregoing of a benefit due to choosing an alternative investment option. (SM 7.9)
:::

## Worked examples

::::: example The samosa line that took the courier's floor
Tapri Tea Co. Ltd is considering a frozen-samosa line at its Indore factory (an expansion decision). Ritu has collected the data:

| Particulars | Details |
|---|---|
| Machine; installation | ₹48,00,000; ₹2,00,000 |
| Life; salvage at the end of year 5 | 5 years; ₹5,00,000 |
| Depreciation | straight-line, for books and tax |
| Packs sold | 3,00,000 in year 1; 4,00,000 a year in years 2–5 |
| Selling price; variable cost | ₹45 and ₹30 a pack |
| Fixed cash costs of the line (excluding depreciation) | ₹30,00,000 a year |
| Insurance taken out for the line | ₹1,00,000 a year |
| Head-office overheads allocated to the line | ₹4,00,000 a year |
| Floor space now let to a courier (lease to be ended) | rent ₹2,00,000 a year |
| Feasibility report fee, paid last month | ₹1,50,000 |
| Working capital | ₹6,00,000 at the start; ₹2,00,000 more at the end of year 2; all released at the end of year 5 |
| Interest on the term loan for the machine | ₹4,50,000 a year |

Tax is 25% and the cost of capital 12%. PV factors at 12% for years 1–5: 0.893, 0.797, 0.712, 0.636, 0.567.

**Required:**

(i) Identify the items that are not relevant cash flows, with reasons.

(ii) Calculate the initial cash outflow.

(iii) Calculate the cash flows for years 1 to 5, including the terminal year.

(iv) Calculate the NPV and advise.

:::: answer Show the working
**(i) Items left out**

1. Feasibility report fee ₹1,50,000: a sunk cost, already paid.
2. Head-office overheads ₹4,00,000: allocated, not incremental. (The new insurance of ₹1,00,000 is incremental and stays in.)
3. Interest ₹4,50,000: a financing cost, already in the 12% cost of capital.

The rent given up, ₹2,00,000 a year, is an opportunity cost and is included; the rent would have been taxed, so it is deducted before tax.

**(ii) Initial cash outflow**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Cost of new asset | | 48,00,000 |
| Add: Installation | 2,00,000 | |
| Add: Investment in working capital | 6,00,000 | 8,00,000 |
| **Initial cash outflow** | | **56,00,000** |

**(iii) Working note 1.** Depreciation = (₹48,00,000 + ₹2,00,000 − ₹5,00,000) ÷ 5 = **₹9,00,000** a year. The book value at the end of year 5 equals the salvage, so the sale has no tax effect.

**Working note 2. CFAT**

| Particulars | Year 1 (₹) | Years 2–5 (₹) |
|---|---:|---:|
| Sales (₹45 a pack) | 1,35,00,000 | 1,80,00,000 |
| Less: Variable cost (₹30 a pack) | 90,00,000 | 1,20,00,000 |
| **Contribution** | **45,00,000** | **60,00,000** |
| Less: Fixed cash cost (30,00,000 + insurance 1,00,000 + rent foregone 2,00,000) | 33,00,000 | 33,00,000 |
| Less: Depreciation | 9,00,000 | 9,00,000 |
| Earning before tax | 3,00,000 | 18,00,000 |
| Less: Tax @ 25% | 75,000 | 4,50,000 |
| Earning after tax | 2,25,000 | 13,50,000 |
| Add: Depreciation | 9,00,000 | 9,00,000 |
| **CFAT** | **11,25,000** | **22,50,000** |

**Terminal year (year 5).** Salvage ₹5,00,000 + interim cash flow ₹22,50,000 + tax on sale nil + release of working capital ₹8,00,000 = **₹35,50,000**.

**(iv) NPV**

| Year | Cash flow | Amount (₹) | PV factor @ 12% | PV (₹) |
|---|---|---:|---:|---:|
| 0 | Initial cash outflow | (56,00,000) | 1.000 | (56,00,000) |
| 1 | CFAT | 11,25,000 | 0.893 | 10,04,625 |
| 2 | CFAT 22,50,000 less additional working capital 2,00,000 | 20,50,000 | 0.797 | 16,33,850 |
| 3 | CFAT | 22,50,000 | 0.712 | 16,02,000 |
| 4 | CFAT | 22,50,000 | 0.636 | 14,31,000 |
| 5 | Terminal-year net cash flow | 35,50,000 | 0.567 | 20,12,850 |
| | **Net present value** | | | **20,84,325** |

::: diagram Samosa line: the relevant cash flows
{"type": "plot", "h": 300, "x": [-0.6, 5.6], "y": [-60, 40],
 "xlabel": "year", "ylabel": "amount (₹ lakh)",
 "xticks": [0, 1, 2, 3, 4, 5], "yticks": [-60, -40, -20, 0, 20, 40],
 "series": [
  {"label": "outflow", "bars": true, "values": true, "color": "bad", "pts": [[0, -56, "(56.00)"]]},
  {"label": "net inflow", "bars": true, "values": true, "color": "a", "pts": [[1, 11.25, "11.25"], [2, 20.5, "20.50"], [3, 22.5, "22.50"], [4, 22.5, "22.50"], [5, 35.5, "35.50"]]}
 ],
 "caption": "Rose: the initial outflow; blue: net inflows. Year 2 is lower by the extra working capital; year 5 is higher by salvage and the release of working capital."}
:::

**Advice.** The NPV is positive (₹20,84,325), so the samosa line should be accepted. (NPV itself is the subject of [[fm.capbud.npv|the NPV lesson]].)
::::
:::::

:::: example The pouch packer that wanted a pension
Tapri's chai premix plant fills its pouches on a packing machine bought 3 years ago for ₹15,00,000 and depreciated on the straight-line method over 8 years down to a salvage value of ₹3,00,000. It can be sold now for ₹8,50,000. If it is kept, it will run for its remaining 5 years, will need a major overhaul of ₹3,00,000 at the end of year 2 (charged to revenue and allowed for tax), and will fetch its salvage value of ₹3,00,000 at the end of year 5.

A new high-speed packer costs ₹32,00,000 plus ₹1,00,000 for installation, lasts 5 years, has a salvage value of ₹5,00,000 and is depreciated on the straight-line method. It needs no overhaul. Its faster speed lets Tapri sell 2,40,000 more pouches a year at a contribution of ₹2.50 a pouch; film wastage falls by ₹1,90,000 a year; power and the maintenance contract rise by ₹1,32,000 a year. Because it changes over between pack sizes in minutes, Tapri can carry ₹1,50,000 less packing-film stock from the day it is installed; the reduction reverses at the end of year 5.

Tax is 25%; tax depreciation equals book depreciation; a loss on sale of the old packer is allowed for tax at 25% in year 0, as Tapri has other taxable profits. The cost of capital is 12%; PV factors at 12% for years 1–5: 0.893, 0.797, 0.712, 0.636, 0.567.

**Required:**

(i) Calculate the net initial cash outflow.

(ii) Calculate the incremental cash flow after tax for each year.

(iii) Calculate the terminal-year net cash flow and the NPV of the replacement, and advise.

::: answer Show the working
**Working note 1. Old packer.** Depreciation (₹15,00,000 − ₹3,00,000) ÷ 8 = ₹1,50,000 a year; book value = ₹15,00,000 − 3 × ₹1,50,000 = **₹10,50,000**. Loss on sale = ₹10,50,000 − ₹8,50,000 = ₹2,00,000; tax saving @ 25% = **₹50,000**.

**Working note 2. Depreciation.** New packer (₹32,00,000 + ₹1,00,000 − ₹5,00,000) ÷ 5 = ₹5,60,000; old ₹1,50,000; **incremental depreciation ₹4,10,000**.

**Working note 3. Operating changes a year.** Additional contribution 2,40,000 × ₹2.50 = ₹6,00,000; film wastage saved ₹1,90,000; extra power and maintenance ₹1,32,000. In year 2 the replacement also avoids the ₹3,00,000 overhaul, a decrease in operating expenses of that year.

**(i) Net initial cash outflow**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Cost of new asset | | 32,00,000 |
| Add: Installation | 1,00,000 | |
| Less: Decrease in net working capital | (1,50,000) | |
| Less: Net proceeds from sale of old asset | (8,50,000) | |
| Less: Tax saving on loss on sale of old asset (WN 1) | (50,000) | (9,50,000) |
| **Net initial cash outflow** | | **22,50,000** |

**(ii) Incremental cash flow after tax**

| Particulars | Years 1, 3, 4, 5 (₹) | Year 2 (₹) |
|---|---:|---:|
| Increase in operating revenue: contribution | 6,00,000 | 6,00,000 |
| Add: Decrease in operating expenses (WN 3) | 58,000 | 3,58,000 |
| Less: Increase in depreciation (WN 2) | (4,10,000) | (4,10,000) |
| Net change in income before taxes | 2,48,000 | 5,48,000 |
| Less: Increase in taxes @ 25% | (62,000) | (1,37,000) |
| Net change in income after taxes | 1,86,000 | 4,11,000 |
| Add: Increase in depreciation charges | 4,10,000 | 4,10,000 |
| **Incremental net cash flow** | **5,96,000** | **8,21,000** |

The decrease in operating expenses is wastage ₹1,90,000 less power and maintenance ₹1,32,000 = ₹58,000; year 2 adds the ₹3,00,000 overhaul avoided.

**(iii) Terminal year (year 5)**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Final salvage value of new packer | | 5,00,000 |
| Less: Salvage value of old packer forgone | | (3,00,000) |
| Add: Interim cash flow | 5,96,000 | |
| Add/(less): Tax on sale (both at book value) | nil | |
| Less: Working capital rebuilt (the reduction reverses) | (1,50,000) | 4,46,000 |
| **Terminal year net cash flow** | | **6,46,000** |

| Year | Cash flow (₹) | PV factor @ 12% | PV (₹) |
|---|---:|---:|---:|
| 0 | (22,50,000) | 1.000 | (22,50,000) |
| 1 | 5,96,000 | 0.893 | 5,32,228 |
| 2 | 8,21,000 | 0.797 | 6,54,337 |
| 3 | 5,96,000 | 0.712 | 4,24,352 |
| 4 | 5,96,000 | 0.636 | 3,79,056 |
| 5 | 6,46,000 | 0.567 | 3,66,282 |
| **Net present value** | | | **1,06,255** |

**Advice.** The incremental NPV is positive, so the old packer should be replaced.

Two items decide it. Leave out the overhaul avoided and the NPV becomes ₹1,06,255 − ₹3,00,000 × 0.75 × 0.797 = **−₹73,070**: a good replacement rejected. Leave out the old packer's salvage forgone and it is overstated at ₹2,76,355. Both are incremental cash flows: what happens with the new packer minus what would have happened with the old one.

Assumption stated: the loss on sale is tax-deductible in year 0. Without that saving the outflow is ₹23,00,000 and the NPV ₹56,255; the advice does not change.
:::
::::

:::: example The kulhad kiln and its block
Tapri bought a gas kiln for its kulhad unit for ₹8,00,000. For tax it is depreciated at 15% on the written down value (WDV) method. The kiln was sold at the end of year 3, and the tax rate is 25%. The kiln was the only asset in its block, and Ritu's tax working for year 3 shows a tax benefit of ₹69,500 on the sale.

**Required:**

(i) Calculate the price at which the kiln was sold.

(ii) Had the block held other machines and continued, calculate the tax effect in year 3 at the same sale price, and the part of the kiln's loss that would stay in the block for later years.

(iii) State the sale price at which the year-3 tax effect would be the same in both cases.

::: answer Show the working
**WDV schedule**

| Year | Opening WDV (₹) | Depreciation @ 15% (₹) | Closing WDV (₹) |
|---|---:|---:|---:|
| 1 | 8,00,000 | 1,20,000 | 6,80,000 |
| 2 | 6,80,000 | 1,02,000 | 5,78,000 |

WDV at the beginning of year 3 = **₹5,78,000**.

**(i) Only asset in the block: the block ceases, no depreciation in year 3**

| Particulars | Amount (₹) |
|---|---:|
| Tax benefit on short-term capital loss (given) | 69,500 |
| Short-term capital loss (₹69,500 ÷ 25%) | 2,78,000 |
| WDV at the beginning of year 3 | 5,78,000 |
| Less: Short-term capital loss | (2,78,000) |
| **Sale value of the kiln** | **3,00,000** |

**(ii) Other assets in the block: depreciation in year 3**

Depreciation = (₹5,78,000 − ₹3,00,000) × 15% = ₹41,700; tax benefit = ₹41,700 × 25% = **₹10,425** in year 3.

The rest of the ₹2,78,000, that is ₹2,78,000 − ₹41,700 = **₹2,36,300**, stays in the block's WDV and is written off through depreciation in later years. The loss is not lost; its tax saving arrives later, which is worth less in present value terms.

**(iii)** At a sale price equal to the opening WDV, **₹5,78,000**, there is no capital loss or gain if the block ceases and nothing to depreciate if it continues: the year-3 tax effect is nil in both cases. Below that price the only-asset case gives the larger year-3 benefit; above it the only-asset case gives a tax outflow on the short-term capital gain, while a continuing block charges no depreciation (SM 7.13–7.14).

In every case the cash received on sale is a separate inflow in year 3; only its tax effect differs.
:::
::::

## Under the hood

### The tax shield shortcut

CFAT = EAT + depreciation is also **(cash revenue − cash expenses) × (1 − t) + depreciation × t**. The samosa line in years 2–5: ₹27,00,000 × 0.75 + ₹9,00,000 × 0.25 = ₹22,50,000, as before. Depreciation is worth only its tax saving, and the saving is lost when no tax is payable.

### Losses, holidays, rent and subsidies

- A negative EBT saves tax only with other taxable profits or a later set-off; the Study Material's XYZ Ltd. sets a year-1 loss off against year 2 (SM 7.95–7.96). A tax holiday means no tax and no tax shield.
- The samosa example deducts the rent foregone before tax, since the rent would have been taxed. The Study Material's waste-processing solution (SM 7.97–7.98) deducts the rent foregone at its full amount from profit after tax in its statement of operating profit, but its statement of incremental cash flows, which gives the NPV, does not carry the rent. Include the opportunity cost and state your treatment (before tax, or in full after tax).
- A subsidy received a year after purchase can be a year-1 inflow or its present value deducted from the initial outflow; ICAI's suggested answer to May 2024 Q3(a) shows both, with the same NPV.

### Next door

These cash flows feed [[fm.capbud.payback|payback and ARR]], [[fm.capbud.npv|NPV and PI]] and [[fm.capbud.irr|IRR]]; the logic is Paper 4's [[cma.mc.decisions|short-term decisions]], discounted.

## Exam angle

::: exam Where cash-flow estimation appeared, May 2024 to September 2026
In the documents read for this lesson:

- **Replacement, 5 to 8 marks**: May 2024 Q3(a) (7 marks: installation, testing, a subsidy at the end of year 1); September 2025 Q1(c) (5 marks: tax of ₹52,800 on the profit on sale of the old machine added to the outflow, with an alternative answer without it); MTP Series I for May 2024 Q2(a) (8 marks: WDV tax shields, a capital loss); September 2026 Q3(a) (6 marks: 20% depreciation on old and new machine, extra working capital, benefits that continue after year 5).
- **New projects**: January 2025 Q3(a) (6 marks: working capital as debtors + stock − creditors); MTP Series II for January 2025 Q3 (10 marks: EBT after interest, an allocated common cost, sunk report and R&D fees); RTP January 2025 Q9 (WDV, only asset in the block).
- **MCQs, 2 marks each, often five on one case**: MTP Series I for September 2026 (disposal charges saved are a benefit, research spend ignored); September 2026 Case Scenario I (a tax holiday and a project loan; suggested answers not yet published, but the payback option of 3.76 years and the NPV option of ₹362.768 lakh both work only with cash flows before loan interest, ₹220 lakh and ₹184 lakh); MTP Series II for September 2026 MCQ 6 (cash outlay = cost + shipping and installation).
:::

::: exam The traps ICAI used
- "Fixed cost (including depreciation)": take depreciation out to get the cash fixed cost (January 2025 Q3(a)).
- "Earnings before tax but after deducting interest": add the interest back before taxing, or restart from PBIT (MTP Series II, January 2025 Q3).
- Costs paid "in advance (at the beginning)" of a year move to the end of the previous year (MTP Series I, September 2024 Q3(a)).
- "Only asset in the block": the Study Material charges no depreciation in the year of sale and uses the opening WDV (SM 7.13). Two ICAI answers (RTP January 2025 Q9; MTP Series I for September 2024 Q3(a)) charged a year's depreciation and used the closing WDV. Follow the Study Material and state it.
- Working capital "in year 1": taken at the start of the year, with the end-of-year alternative noted (January 2025 Q3(a)).
:::

::: trick Salvage at book value means no tax
With straight-line depreciation down to the estimated salvage, selling at that salvage leaves no gain or loss, so no tax on sale. A tax effect arises only when the sale value differs from the tax WDV.
:::

## Answer frame

The chapter's own theory questions include "Discuss in detail the capital budgeting process" and "Classify various types of capital investment decisions" (SM 7.74). Write:

- **Purpose**: substantial investment; long time period; irreversibility; complex decisions; a sentence each.
- **Process**: planning, evaluation, selection, implementation, control (the three reports), review; a line each.
- **Types**: by firm's existence (replacement and modernisation, expansion, diversification; cost reduction versus revenue expansion) and by situation (mutually exclusive, accept-reject, contingent), each with an example.
- **Treatment of an item**: the principle (incremental, post-tax), the item's treatment in ICAI's words, a two-line example.

::: cols
**Loses marks**

Bare figures: one slip and no method marks survive.
---
**Passes**

The CFAT and NPV tables, but the sunk fee and the interest are silently dropped.
---
**Full marks**

Items excluded, with reasons; initial outflow, CFAT and terminal year in ICAI's formats; assumptions stated (timing, tax on losses); a one-line advice.
:::

## Common mistakes

::: mistake Hall of Shame: the feasibility fee Kesar paid twice
Adding the ₹1,50,000 report fee to the outflow and the allocated head-office overheads to the yearly costs. **Fix:** the fee is sunk and the overheads only allocated. In the samosa example, including them with the interest turns an NPV of ₹20,84,325 into about −₹3.64 lakh: a good project rejected.
:::

::: mistake The interest that was charged twice
Deducting loan interest from the cash flows, then discounting at the WACC. **Fix:** the WACC already contains the cost of debt; take cash flows before interest.
:::

::: mistake The working capital that never came home
Forgetting its release in the terminal year, or depreciating it. **Fix:** working capital comes back in full at the end unless the question says otherwise; no depreciation is provided on it.
:::

::: mistake Depreciation in the year the block died
Charging a year's depreciation on the only asset in its block in the year it is sold, and also taking a capital loss. **Fix:** no depreciation that year; opening WDV less sale value is the short-term capital loss.
:::

## Practice

::: quiz Check yourself
Q: A Tapri kiosk earns ₹8,00,000 a year before depreciation and tax. Depreciation is ₹3,00,000 and tax 25%. What is its annual cash inflow after tax (₹)?
= 675000
> EBT ₹5,00,000; tax ₹1,25,000; EAT ₹3,75,000; add back depreciation: ₹6,75,000. Shortcut: ₹8,00,000 × 0.75 + ₹3,00,000 × 0.25.

Q: Case scenario. Tapri's Pune café will replace its espresso machine. The new machine costs ₹12,00,000 plus ₹50,000 installation. The old machine, with a tax WDV of ₹1,20,000, sells for ₹2,00,000, and tax of 25% is payable on the gain. Working capital rises by ₹1,00,000. A market survey for the café cost ₹40,000 last month. Which is the initial cash outflow?
- [x] ₹11,70,000
- [ ] ₹12,10,000
- [ ] ₹11,30,000
- [ ] ₹10,70,000
> ₹12,00,000 + ₹50,000 + ₹1,00,000 − ₹2,00,000 + tax on the ₹80,000 gain (₹20,000) = ₹11,70,000. The others add the sunk survey, deduct the tax, or forget the working capital.

Q: A project's earnings before tax are ₹10,00,000 after ₹2,00,000 interest on the loan that finances it. Depreciation is ₹3,00,000 and tax 30%. It is discounted at the WACC. Which annual cash inflow is used?
- [ ] ₹10,00,000
- [x] ₹11,40,000
- [ ] ₹12,00,000
- [ ] ₹15,00,000
> PBIT ₹12,00,000 × 0.70 + depreciation ₹3,00,000 = ₹11,40,000. ₹10,00,000 keeps the interest in; ₹12,00,000 adds it back without its tax saving.

Q: Both replacement and modernisation decisions are called:
- [x] Cost reduction decisions
- [ ] Revenue expansion decisions
- [ ] Contingent decisions
- [ ] Accept-reject decisions
> ICAI's term (SM 7.6). Expansion and diversification are revenue expansion decisions; contingent and accept-reject classify by situation.

Q: Which of these are relevant cash flows for Tapri's new cold store? Select all that apply.
- [x] Rent Tapri gives up on a godown the cold store will occupy
- [ ] Head-office costs allocated to the cold store
- [x] Working capital released at the end of the project
- [ ] A consultancy fee paid last year for the site study
- [x] Tax saved because of depreciation on the cold store
> The first, third and fifth change cash because of the project; allocated costs and a sunk fee do not.

Q: A machine, the only asset in its block, has a WDV of ₹4,00,000 at the beginning of its last year and is sold for ₹1,00,000. Tax is 30%. What is the tax benefit in that year (₹)?
= 90000
> The block ceases: no depreciation; short-term capital loss ₹3,00,000 × 30% = ₹90,000.
:::

## Recap

- Capital budgeting: identify projects, estimate post-tax incremental cash flows, select the proposal that maximises return.
- Critical because of substantial investment, long time period, irreversibility, complex decisions.
- Process: planning, evaluation, selection, implementation, control, review.
- Types: replacement and modernisation (cost reduction), expansion, diversification (revenue expansion); mutually exclusive, accept-reject, contingent.
- In: opportunity cost, working capital (out, then released in full), additional investment, incremental overheads, depreciation's tax shield. Out: sunk cost, allocated overheads, interest and dividends.
- Cash flows: initial outflow, interim CFAT (EAT + depreciation), terminal year (salvage, tax on sale, release of working capital).
- Only asset in the block: no depreciation in the year of sale; STCL or STCG on (opening WDV − sale value). Other assets: depreciation on that difference.
- Cash flows and discount rate both post-tax; financing costs live in the WACC. (Two photographs, one difference.)

## Flashcards

Q:: Capital budgeting decisions are critical for four reasons. Name them in ICAI's order.
A:: Substantial investment; long time period; irreversibility; complex decisions.

Q:: The six phases of the capital budgeting process, in order?
A:: Planning, evaluation, selection, implementation, control, review.

Q:: Types of capital investment decisions on the basis of the firm's existence?
A:: Replacement and modernisation (cost reduction decisions); expansion and diversification (revenue expansion decisions).

Q:: Types of capital investment decisions on the basis of situations?
A:: Mutually exclusive, accept-reject and contingent decisions.

Q:: Which three factors determine the life of a project?
A:: Technological obsolescence, physical deterioration and decline in demand for the product.

Q:: ICAI's definition of sunk cost, and its treatment?
A:: An outlay of cash already incurred in the past that cannot be reversed in present; excluded from capital budgeting analysis.

Q:: ICAI's definition of opportunity cost, and its treatment?
A:: Foregoing of a benefit due to choosing an alternative investment option; included in cash outflows, at the start or during the project.

Q:: How is working capital treated in project cash flows?
A:: Initial requirement: outflow; additional need: outflow when needed; reduction: inflow; release at the end: inflow, in full if nothing is said; no depreciation on it.

Q:: Exclusion of financing costs principle: what is excluded and why?
A:: Interest on long-term debt and dividends; they are reflected in the WACC, so deducting them from cash flows counts the cost of funds twice.

Q:: Formula: profit after tax excluding financing cost?
A:: PBIT × (1 − t), which equals PAT + interest × (1 − t).

Q:: Terminal year, asset is the only one in its block: treatment?
A:: No depreciation in that year; opening WDV − sale value is a short-term capital loss (tax benefit) or, if negative, a short-term capital gain (tax outflow).

Q:: Terminal year, other assets remain in the block: treatment?
A:: Depreciation on (opening WDV − sale value) at the block rate; none if the sale value exceeds the opening WDV.
