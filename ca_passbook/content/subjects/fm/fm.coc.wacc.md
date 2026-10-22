---
id: fm.coc.wacc
title: WACC and the marginal cost of capital
minutes: 40
needs: fm.coc.debt, fm.coc.equity
tags: WACC, weighted average cost of capital, book value weights, market value weights, marginal cost of capital, break point, hurdle rate, significance of cost of capital
labs: wacc
summary: Why a company's hurdle rate is the weighted average of its sources' costs, how book and market value weights change it, and how the marginal cost of capital rises as new funds get dearer.
---

## In plain words

### Kesar picks the cheapest dish on the thali

Dev has priced every source of Tapri's money: debentures 7.70% after tax, preference shares 10.53%, retained earnings 12%, new equity 12.38%. Kesar reads only the first line.

> **Kesar:** Debt costs 7.70%. So any new café that earns 8% is profit. Approve them all!
> **Dev:** Kesar-ji, no café is funded by debt alone. If we borrowed for every café, the debt would make the shares riskier and the shareholders would want more. Every rupee we invest comes from the same mix: thirty paise of debt, ten of preference, sixty of equity.
> **Ritu:** So the price of the rupee is the mix, weighted.
> **Dev:** Per unit, as you always say.

A company rarely raises all its money from one source: it mixes sources to balance financial risk, control and cost. So the cost of its total capital is the **weighted average cost of capital (WACC)**: each source's after-tax cost, weighted by its share of total capital (SM 4.31). It is the company's hurdle rate: a project that earns less than the WACC destroys value, however cheap one of its sources looks.

Two questions then follow. **Which weights?** The amounts in the balance sheet (book value) or what the securities are worth today (market value). **And for new money?** The next rupee may cost more than the last: once this year's retained earnings are used up, new shares must be sold at a lower price with flotation costs, and lenders may charge more beyond a limit. The cost of that additional rupee is the **marginal cost of capital (MCC)**.

::: analogy The chai blend
Tapri's masala chai blends Assam leaf at ₹400 a kg with Darjeeling at ₹1,200, three kilos to one. A kilo of the blend costs (3 × 400 + 1 × 1,200) ÷ 4 = ₹600: a weighted average, not the cheapest leaf and not a simple average of the two prices. Weigh the leaf in the godown at what it cost years ago and you get book value weights; at today's auction prices, market value weights. And once the cheap Assam lot runs out, the next kilo of blend costs more: that is the marginal cost.
:::

::: key
WACC is the after-tax cost of each source weighted by its proportion of total capital, and it is the minimum return at which the company creates value. Market value weights reflect today's prices; marginal weights are the proportions of new funds, and the marginal cost rises at each break point where a cheaper source runs out.
:::

## How it works

### Why the cost of capital matters

Cost of capital is the return expected by the providers of capital. It is also called the **cut-off rate**, **hurdle rate** or **minimum rate of return**, and it is the benchmark for framing debt policies and taking capital budgeting decisions (SM 4.2). The correct figure helps in three decisions (SM 4.2–4.3):

1. **Evaluation of investment options**: future cash flows are converted into present values by discounting them at the relevant cost of capital; each option may have its own cost of capital, so use the one relevant to it.
2. **Financing decision**: choosing between two sources, the finance manager compares their costs and picks the lower, considering financial risk and control as well.
3. **Designing of optimum credit policy**: the cost of allowing a credit period is compared with the benefit from it, with the cost of capital used to find the present values of costs and benefits.

### What pushes it up or down

ICAI lists five factors, in this order (SM 4.4–4.5):

1. **Supply and demand**: many exciting business opportunities compete for funding and push the cost of capital up; when opportunities are scarce, investors lend at lower rates.
2. **Investor preferences**: cultural factors and saving habits decide the pool of capital; higher returns generally lead to more savings.
3. **Risk and return**: high-risk ventures must offer higher potential returns, but too high a cost of capital can make a project unprofitable.
4. **Inflation**: investors look for returns that outpace inflation, so that their money keeps its buying power.
5. **Exchange rates**: for multinational companies, their fluctuations add risk and affect the overall cost of capital.

### WACC in four steps

::: steps
1. **Total capital** from all sources: long-term debt + preference share capital + equity share capital + retained earnings.
2. **Proportion of each source**: its amount ÷ total capital.
3. **Multiply** each proportion by that source's after-tax cost (Kd, Kp, Ke, Kr).
4. **Add** the products: the total is the WACC (SM 4.31).
:::

::: diagram ICAI's Example 5: each source's share of a 7.95% WACC
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [0, 3.6],
 "xlabel": "source of capital", "ylabel": "weight × cost (%)",
 "xticks": [[1, "RE"], [2, "equity"], [3, "pref."], [4, "debt"]], "yticks": [0, 1, 2, 3],
 "legend": "none",
 "series": [{"label": "weight × cost", "bars": true, "values": true, "color": "a", "pts": [[1, 2.50, "25% × 10%"], [2, 1.10, "10% × 11%"], [3, 1.35, "15% × 9%"], [4, 3.00, "50% × 6%"]]}],
 "caption": "RE: retained earnings; pref.: preference shares. Each bar is one source's weight times its cost (SM 4.32): 2.50% + 1.10% + 1.35% + 3.00% = 7.95%. Debt has the lowest cost but the tallest bar, because half the capital is debt."}
:::

The weighted average is used because the sources are present in different proportions; to be representative, the cost of capital must reflect them (SM 4.32). WACC is the discount rate in discounted cash flow analysis and the hurdle rate against which the return on capital is judged: if a company earns 20% and its WACC is 11%, it creates about 9% of value for its investors; earning less than the WACC, it is shedding value (SM 4.32).

### Book value or market value weights

**Book value (BV)** weights are operationally easy and convenient; reserves such as share premium and retained profits are included in the book value of equity. **Market value (MV)** weights are more correct and represent the firm's capital structure: they represent existing conditions and take into consideration changing market conditions and the current prices of the securities. They are preferable for equity, and better for debt too, though the difference there may not be significant. Under MV, reserves are ignored, because they are in effect incorporated in the market value of equity (SM 4.33).

That creates a puzzle: retained earnings have no market value of their own, yet their cost (Kr) differs from that of equity (Ke). ICAI's answer: ==apportion the market value of equity shares in the ratio of the book values of paid-up equity capital and retained earnings== (SM 4.33).

::: diagram Illustration 16: splitting the market value of equity
{"type": "tree", "gapY": 96, "root": {"label": "Market value of equity\n50,000 × ₹50\n= ₹25,00,000", "children": [{"label": "Equity capital\n₹25,00,000 × 1/4\n= ₹6,25,000", "edge": "1/4", "color": "a"}, {"label": "Retained earnings\n₹25,00,000 × 3/4\n= ₹18,75,000", "edge": "3/4", "color": "c"}]}, "caption": "Book values: paid-up equity ₹5,00,000 and retained earnings ₹15,00,000, a ratio of 1 : 3 (SM 4.34). Each part then carries its own cost: 10.41% (Ke) and 10% (Kr), giving a WACC of 10.10%."}
:::

The Study Material compares the two on five points, in this order (SM 4.33–4.34):

::: compare
| Point of comparison | Book value (BV) | Market value (MV) |
|---|---|---|
| 1. Definition | Based on the historical cost of assets and liabilities recorded on the balance sheet | Based on the current market price of equity and debt |
| 2. Reflects current conditions | May not accurately reflect current market conditions or the true economic value | More accurately reflects current market conditions and the value investors place on the company |
| 3. Stability | Generally more stable; does not fluctuate with market conditions | Can be volatile and fluctuate with market conditions |
| 4. Relevance for investors | Less relevant, as it does not consider current market perceptions | More relevant, as it reflects the market's view of the company's value |
| 5. Ease of calculation | Easier, using the financial statements | Requires market data, which can be more complex to gather and calculate |
:::

::: lab wacc {"part":"wacc"}
Step through Study Material Illustration 17: the cost of each source, then book and market weights built column by column, side by side.
:::

### The marginal cost of capital

The **marginal cost of capital** is the cost of raising an additional rupee of capital; since capital is raised in substantial amounts in practice, it is the cost of raising new funds over and above the existing. It is the average cost of capital calculated with **marginal weights**: the proportions of funds the firm intends to employ, so the choice between book and market value weights does not arise (SM 4.38).

If a firm raises funds in its usual proportions and the component costs stay unchanged, the marginal and average costs are the same. But component costs may stay constant up to a level of funds and then rise: debt may cost 7% after tax up to ₹10 lakh and 8% between ₹10 lakh and ₹15 lakh; equity becomes dearer once retained earnings run out and new shares with flotation costs are needed. ==When the component costs start rising, the average cost rises, and the marginal cost rises at a faster rate== (SM 4.38).

Each point where a cheaper source runs out is a **break point** (the Study Material does not use the name; its Illustration 18(C) computes the first one):

$$\text{Break point} = \frac{\text{cheaper source available}}{\text{its proportion in new funds}}$$

With retained earnings of ₹11,800 and equity at 80% of new funds, ICAI's Illustration 18 finds that ₹11,800 ÷ 0.80 = ₹14,750 can be spent before new shares must be sold (SM 4.41).

::: lab wacc {"part":"mcc"}
Step through Study Material Illustration 18: the break point at ₹14,750, the marginal cost in each range, and the step plot.
:::

## Formats and formulas

*Reproduce this layout and the formulas from memory; ICAI's Suggested Answers set out every WACC this way.*

| Source of capital | Amount (₹) | Weight (a) | After-tax cost (b) | (a) × (b) |
|---|---:|---:|---:|---:|
| Equity share capital | xxx | 0.xxxx | Ke | xxx |
| Retained earnings | xxx | 0.xxxx | Kr | xxx |
| Preference share capital | xxx | 0.xxxx | Kp | xxx |
| Debentures / long-term debt | xxx | 0.xxxx | Kd | xxx |
| **Total** | **xxx** | **1.0000** | | **WACC** |

Book value weights take the balance sheet amounts. Market value weights take number × market price for each security, with the market value of equity split between share capital and retained earnings in their book value ratio. Marginal weights take the proportions of the new funds.

::: formula WACC
$$K_o = W_e K_e + W_r K_r + W_p K_p + W_d K_d$$
$K_o$ = WACC (overall cost of capital); each W = that source's amount ÷ total capital, so the weights add up to 1; each K = that source's after-tax cost.
:::

::: formula Market value of equity split (SM 4.33)
$$MV_{EC} = MV_{E} \times \frac{BV_{EC}}{BV_{EC} + BV_{RE}}$$
$MV_E$ = market value of equity shares (number × price); $BV_{EC}$, $BV_{RE}$ = book values of paid-up equity capital and retained earnings. The rest of $MV_E$ is the market value of retained earnings.
:::

::: formula Marginal cost of capital and break point (SM 4.38; Illustration 18, SM 4.39–4.41)
$$MCC = \sum (\text{proportion of new funds} \times \text{marginal cost of the source}) \qquad \text{Break point} = \frac{\text{cheaper source available}}{\text{its proportion}}$$
Below the first break point, retained earnings and the cheapest debt are used; above it, the dearer component cost replaces the cheaper one.
:::

::: definition Weighted average cost of capital
The weighted average after-tax costs of the individual components of the firm's capital structure: the after-tax cost of each debt and equity is calculated separately and added together to a single overall cost of capital. (SM 4.31)
:::

::: definition Marginal cost of capital
The cost of raising an additional rupee of capital; since capital is raised in substantial amount in practice, it is the cost incurred in raising new funds. It is derived when the average cost of capital is calculated using the marginal weights, which represent the proportion of funds the firm intends to employ. (SM 4.38)
:::

## Worked examples

:::: example Tapri's WACC on two kinds of weights
The capital structure of Tapri Tea Co. Ltd on 31 March 2026 is:

| Particulars | Amount (₹ lakh) |
|---|---:|
| Equity share capital (30 lakh shares of ₹10 each) | 300 |
| Retained earnings | 300 |
| 10% irredeemable preference shares of ₹100 each | 100 |
| 9% debentures of ₹100 each, redeemable at par after 5 years | 300 |
| **Total** | **1,000** |

Market prices: equity share ₹50, preference share ₹95, debenture ₹96. Next year's dividend is expected to be ₹3.00 per share, growing at 6% a year. New equity shares would realise ₹47 per share net of flotation cost. The tax rate is 25%.

**Required:**

(i) Calculate the cost of each source of finance.

(ii) Calculate the WACC using book value weights.

(iii) Calculate the WACC using market value weights.

::: answer Show the working
**(i) Specific costs**

- Equity shares (net proceeds of a new issue): Ke = ₹3.00 ÷ ₹47 + 6% = 6.38% + 6% = **12.38%**.
- Retained earnings (market price, no flotation): Kr = ₹3.00 ÷ ₹50 + 6% = **12.00%**.
- Preference shares: Kp = ₹10 ÷ ₹95 = **10.53%**.
- Debentures (approximation method): Kd = [₹9 × 0.75 + (₹100 − ₹96) ÷ 5] ÷ [(₹100 + ₹96) ÷ 2] = ₹7.55 ÷ ₹98 = **7.70%**.

**(ii) WACC, book value weights**

| Source | Book value (₹ lakh) | Weight | Cost | Weight × cost |
|---|---:|---:|---:|---:|
| Equity shares | 300 | 0.3000 | 0.1238 | 0.03714 |
| Retained earnings | 300 | 0.3000 | 0.1200 | 0.03600 |
| Preference shares | 100 | 0.1000 | 0.1053 | 0.01053 |
| Debentures | 300 | 0.3000 | 0.0770 | 0.02310 |
| **Total** | **1,000** | **1.0000** | | **0.10677** |

**WACC (BV) = 10.68%.**

**(iii) WACC, market value weights**

Working note: market value of equity = 30 lakh × ₹50 = ₹1,500 lakh, split in the book value ratio 300 : 300 = 1 : 1: ₹750 lakh to equity capital and ₹750 lakh to retained earnings. Preference: 1 lakh × ₹95 = ₹95 lakh; debentures: 3 lakh × ₹96 = ₹288 lakh.

| Source | Market value (₹ lakh) | Weight | Cost | Weight × cost |
|---|---:|---:|---:|---:|
| Equity shares | 750 | 0.3983 | 0.1238 | 0.04931 |
| Retained earnings | 750 | 0.3983 | 0.1200 | 0.04780 |
| Preference shares | 95 | 0.0505 | 0.1053 | 0.00532 |
| Debentures | 288 | 0.1529 | 0.0770 | 0.01177 |
| **Total** | **1,883** | **1.0000** | | **0.11420** |

**WACC (MV) = 11.42%.**

**Comment.** Equity trades at five times its face value, so market values give equity (the dearest source) almost 80% of the weight against 60% in the books, and the WACC rises from 10.68% to 11.42%. The market value figure is the one that reflects what investors expect today. Convention: equity shares are costed on the net proceeds of a new issue, as in the Study Material's own solutions (SM 4.36, 4.55); if they are costed at the market price instead (Ke = Kr = 12%, as MTP Series II for May 2026 Q3(a) did when no flotation cost was given), the WACC is 10.56% on book and 11.27% on market weights. State the convention you use. Weights and costs to four decimals, products to five (rounding each product to four decimals first would show 10.67%).
:::
::::

:::: example Thanda Logistics borrows more: the new WACC at market values
Thanda Logistics Ltd, a listed cold-chain company that carries Tapri's frozen snacks, has 2 lakh equity shares quoted at ₹150 and ₹150 lakh of 10% irredeemable debentures of ₹100 each, quoted at par. Next year's dividend is expected to be ₹12 per share, growing at 4% a year forever. The tax rate is 25%.

Thanda plans to borrow ₹150 lakh more as a 12% term loan at par, secured ahead of the debentures. Its bankers expect that, after the loan, the expected dividend will rise to ₹13.20 with growth unchanged, the share price will fall to ₹132, and the existing debentures will fall to ₹90 because they now rank behind the loan.

**Required:**

(i) Calculate the WACC now, using market value weights.

(ii) Calculate the WACC after the loan, using market value weights, and comment.

::: answer Show the working
**Working notes.** Now: Ke = ₹12 ÷ ₹150 + 4% = 12.00%; Kd = ₹10 × 0.75 ÷ ₹100 = 7.50%. After the loan: Ke = ₹13.20 ÷ ₹132 + 4% = 14.00%; existing debentures, on their new market price, Kd = ₹7.50 ÷ ₹90 = 8.33%; term loan Kd = 12% × 0.75 = 9.00%.

Market values: equity 2 lakh × ₹150 = ₹300 lakh now and 2 lakh × ₹132 = ₹264 lakh after; debentures 1.5 lakh × ₹100 = ₹150 lakh now and 1.5 lakh × ₹90 = ₹135 lakh after.

**(i) WACC now**

| Source | Market value (₹ lakh) | Weight | Cost (%) | Weighted cost (%) |
|---|---:|---:|---:|---:|
| Equity | 300 | 0.667 | 12.00 | 8.00 |
| 10% debentures | 150 | 0.333 | 7.50 | 2.50 |
| **Total** | **450** | **1.000** | | **10.50** |

**(ii) WACC after the loan**

| Source | Market value (₹ lakh) | Weight | Cost (%) | Weighted cost (%) |
|---|---:|---:|---:|---:|
| Equity | 264 | 0.481 | 14.00 | 6.73 |
| 10% debentures | 135 | 0.246 | 8.33 | 2.05 |
| 12% term loan | 150 | 0.273 | 9.00 | 2.46 |
| **Total** | **549** | **1.000** | | **11.24** |

**Comment.** The WACC rises from 10.50% to 11.24%. The loan itself is cheap (9.00% after tax), but the extra financial risk raises the cost of equity from 12.00% to 14.00% and pushes the old debentures' yield from 7.50% to 8.33%; together they more than offset the cheap tranche. On these figures the loan does not lower Thanda's cost of capital. Each source is costed on its own current market price, and the market values, not the book figures, give the weights.
:::
::::

::::: example Tapri's ₹2.5 crore expansion: the marginal cost of capital
Tapri will raise all new funds for its expansion in its target proportions: 40% debt and 60% equity. Next year's EPS is expected to be ₹6.40, of which 40% will be paid as dividend; Tapri earns 15% on the earnings it retains, and the share is quoted at ₹40. Retained earnings of ₹72 lakh are available for the programme; beyond them, new shares can be sold at the market price less a flotation cost of 8%.

Indore Sahakari Bank will lend up to ₹40 lakh at 10% and a further ₹40 lakh at 11%; any more debt must be raised as 12% debentures at par. The tax rate is 25%.

**Required:**

(i) Calculate the after-tax cost of each new source, including the equity from retained earnings and from new shares.

(ii) Determine the break points at which the marginal cost of capital rises.

(iii) Calculate the marginal cost of capital in each range of new funds.

(iv) Calculate the average cost of raising ₹250 lakh. A project needing the last ₹50 lakh of it has an IRR of 12.90%: should it be undertaken?

:::: answer Show the working
::: diagram Tapri's marginal cost of capital schedule
{"type": "plot", "h": 300, "x": [0, 250], "y": [12, 13.4],
 "xlabel": "new funds raised (₹ lakh)", "ylabel": "marginal cost of capital (%)",
 "xticks": [0, 50, 100, 120, 200, 250], "yticks": [12, 12.4, 12.8, 13.2],
 "legend": "none",
 "series": [{"label": "MCC", "pts": [[0, 12.24], [100, 12.24], [100, 12.54], [120, 12.54], [120, 12.88], [200, 12.88], [200, 13.18], [250, 13.18]], "color": "a"}],
 "points": [{"x": 100, "y": 12.24, "label": "10% loan used up", "pos": "below"}, {"x": 120, "y": 12.88, "label": "retained earnings used up", "pos": "above"}, {"x": 200, "y": 12.88, "label": "11% loan used up", "pos": "below"}],
 "caption": "The marginal cost steps up at each break point: 12.24% up to ₹100 lakh, 12.54% to ₹120 lakh, 12.88% to ₹200 lakh, 13.18% beyond."}
:::

**(i) Specific costs**

- Growth (Gordon's growth model): g = b × r = 60% × 15% = **9%**. D1 = 40% × ₹6.40 = ₹2.56.
- Retained earnings: Kr = ₹2.56 ÷ ₹40 + 9% = **15.40%**. New shares: net price = ₹40 × 0.92 = ₹36.80; Ke = ₹2.56 ÷ ₹36.80 + 9% = 6.96% + 9% = **15.96%**.
- Debt after tax: first ₹40 lakh 10% × 0.75 = **7.50%**; next ₹40 lakh 11% × 0.75 = **8.25%**; debentures 12% × 0.75 = **9.00%**.

**(ii) Break points** (cheaper source available ÷ its proportion of new funds)

- 10% loan: ₹40 lakh ÷ 0.40 = **₹100 lakh**.
- Retained earnings: ₹72 lakh ÷ 0.60 = **₹120 lakh**.
- 11% loan (₹80 lakh of debt in all): ₹80 lakh ÷ 0.40 = **₹200 lakh**.

**(iii) Marginal cost of capital** (weighted cost: debt × 0.40 + equity × 0.60)

| Range of new funds (₹ lakh) | Debt (%) | Equity (%) | MCC (%) |
|---|---:|---:|---:|
| 0–100 | 7.50 | 15.40 | **12.24** |
| 100–120 | 8.25 | 15.40 | **12.54** |
| 120–200 | 8.25 | 15.96 | **12.88** |
| Above 200 | 9.00 | 15.96 | **13.18** |

For example, 0–100: 0.40 × 7.50% + 0.60 × 15.40% = 3.00% + 9.24% = 12.24%.

**(iv) Average cost of ₹250 lakh**

$$\frac{100 \times 12.24\% + 20 \times 12.54\% + 80 \times 12.88\% + 50 \times 13.18\%}{250} \qquad = \frac{3{,}164.2}{250} = 12.66\%$$

The project should **not** be undertaken. The last ₹50 lakh costs 13.18%, the marginal cost of that money, and the project earns 12.90%. Judged against the 12.66% average it would look acceptable, which is why the marginal cost, not the average, is the hurdle for the last project.
::::
:::::

## Under the hood

### The pattern of new finance (ICAI's other MCC question)

The Study Material's Practical Problem 4 (SM 4.46–4.47; the same structure with new figures in RTP September 2025 Q5) gives a debt–equity mix for new funds, retained earnings available, and a cost of debt that steps up beyond a limit. Its answer: (a) split the new funds in the mix (equity 70%, debt 30% of ₹10 lakh), and fill equity first from retained earnings, the rest by new shares; (b) the post-tax average cost of the debt, weighting each tranche by its amount (₹1,80,000 at 5% and ₹1,20,000 at 8% average 6.2%); (c) Ke or Kr by the dividend growth model; (d) the overall weighted average cost of the additional finance (12.36%).

### Three bases for weights

The chapter's own MCQ 6 accepts market values, target values or book values as the basis of WACC weights (answer: any one of them, SM 4.44 and 4.51). The text itself works only with book, market and marginal weights.

### Working backwards from a WACC

ICAI also gives the WACC and asks for a missing cost: May 2025 Q2(a) gave a WACC of 14% and solved for the debenture interest rate (12%); RTP May 2026 Q5 gave a book value WACC of 11% and a market value WACC 150 basis points higher, and solved the two equations for Ke (14%) and Kd (8%). Write the WACC as an equation in the unknown and solve.

### Next door

The specific costs come from [[fm.coc.debt|the cost of debt and preference capital]] and [[fm.coc.equity|the cost of equity and retained earnings]]. The WACC is the discount rate in [[fm.capbud.npv|NPV]] and the hurdle in [[fm.capbud.irr|IRR]]; financing costs stay out of [[fm.capbud.cashflows|project cash flows]] because they are already inside it. Whether more debt lowers the WACC is the question of [[fm.cs.theories|capital structure theories]], and the cost of capital also prices credit periods in [[fm.wc.receivables|receivables management]].

## Exam angle

::: exam Where WACC and MCC appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, a WACC or a marginal cost of capital came up 18 times in 18 documents:
- **Market value WACC as the last part of a costing question**: September 2024 Q2(a) (8 marks, 13.39%), January 2025 Q2(a)(iv) (3 marks, 17.94%), September 2025 Q1(a)(iii) (2 marks, 11.59%), January 2026 MCQ 4 (17.02%), RTP January 2025 Q5 (22.52%).
- **Book and market value WACC side by side**: MTP Series II for May 2026 Q3(a) (7 marks: 15.50% and 14.88%), MTP Series I for September 2026 Q1(b) (5 marks; the Study Material's Illustration 17, word for word).
- **New WACC after extra debt**: MTP Series I for May 2025 Q2(a) (6 marks: 9.56% to 11.30%), MTP Series I for January 2025 Q1(b) (5 marks), RTP September 2024 Q5, RTP September 2026 Q1 (case scenario MCQs).
- **Marginal cost of capital**: RTP May 2024 Q2 (14.49%, ₹3,77,875 before new shares, then 15.99%), MTP Series II for September 2025 Q1(c) (5 marks: Illustration 18 with the years moved on a year and new shares at ₹25); the pattern-of-finance version in RTP September 2025 Q5; May 2026 MCQ 5 (the post-tax average cost of old and new debt, 7.98%).
- **Working backwards**: May 2025 Q2(a) (8 marks), RTP May 2026 Q5, MTP Series I for May 2024 Q3(a) (8 marks, interest rates found from a 16% WACC).
- **The Study Material again**: two of these MTP questions are Illustrations 17 and 18 with at most a figure changed, so work every illustration in SM 4.31–4.41 once.
:::

::: exam The traps ICAI used
- **Market values must be computed**: number of securities × market price (5,00,000 shares × ₹70 in September 2024 Q2(a)), not the book figures with a new label.
- **Retained earnings in market value weights**: split the market value of equity in the book value ratio (MTP Series II for May 2026: ₹9 crore split 6 : 4 into ₹5.40 crore and ₹3.60 crore).
- **Two acceptable answers**: September 2025 Q1(a)(iii) gave 11.59% with the preference cost on its issue price and 10.57% on its market price; January 2025 Q2(a)(iv) printed an alternative too. State the basis you use.
- **After additional debt**, each tranche keeps its own cost and the cost of equity is recomputed at the new price (MTP Series I for May 2025).
- **Cheap new debt, dearer WACC**: RTP September 2026 Q1's five MCQs on one case take every cost on book values (Kp = 11.5 ÷ 100; Kd = 10% × 0.65 = 6.5% for the old debentures and 12% × 0.65 = 7.8% for the new) and add the new debentures as a separate line. Ke rises from 10% to 13% when the price falls from ₹300 to ₹250, so the WACC goes from 9.43% to 11.04%: cheap new debt, dearer WACC, the point the Thanda example makes at market values. RTP September 2024 Q5 is the same case with ₹50 lakh of new debentures that must first be priced at a 13% market yield, with 2% flotation cost.
:::

::: trick Sanity checks on any WACC
The weights must add up to 1, and the WACC must lie between the cheapest and the dearest after-tax cost. Market value weights raise the WACC when equity (the dearest source) trades further above its book value than the other sources do. Conditions: all costs after tax and every source included once.
:::

## Answer frame

**DISCUSS the meaning of weighted average cost of capital. ILLUSTRATE with an example** (SM 4.31–4.32):

1. A company mixes sources to balance financial risk, ownership control and cost, so the cost of total capital is the weighted average of the costs of the individual sources.
2. Definition: the weighted average after-tax costs of the individual components of the firm's capital structure; also called the overall cost of capital; it depends on the capital structure.
3. The four steps (total capital; proportions; proportion × cost; add).
4. A four-line example table (ICAI's: retained earnings 25% × 10%, equity 10% × 11%, preference 15% × 9%, debt 50% × 6% = 7.95%).
5. Use: the discount rate for DCF and NPV, the hurdle rate; returns above WACC create value.

**What is the DIFFERENCE between book value and market value weights?** The five-point table above, in ICAI's order, with one line on retained earnings (included in book value of equity; under market values, apportioned out of the market value of equity).

**DISCUSS marginal cost of capital** (SM 4.38): definition; marginal weights = proportions of new funds, so no BV/MV choice; equal to the average cost if proportions and component costs are unchanged; component costs rise beyond certain levels (debt example, external equity with flotation costs); then the average cost rises and the marginal cost rises faster.

## Common mistakes

::: mistake Hall of Shame: the cheapest source as the hurdle rate
Kesar's 7.70% would accept projects that earn less than the 10.68% to 11.42% the mix costs. **Fix:** the hurdle rate is the WACC of the mix that funds the project, not the cost of the source used this time.
:::

::: mistake Market value weights with retained earnings at book
Adding retained earnings at ₹300 lakh to equity at its market value of ₹1,500 lakh counts the reserves twice: the market value of equity already includes them. **Fix:** split the market value of equity in the book value ratio of equity capital to retained earnings.
:::

::: mistake Pre-tax interest in the WACC
Using the 9% coupon for the debentures. **Fix:** every cost in a WACC is after tax: Kd = I(1 − t) or its redeemable form; preference and equity costs need no adjustment.
:::

::: mistake The break point that forgot the proportion
"Retained earnings are ₹72 lakh, so new shares are needed after ₹72 lakh." **Fix:** retained earnings fund only the equity part (60%) of each rupee: the break point is ₹72 lakh ÷ 0.60 = ₹120 lakh of total new funds.
:::

## Practice

::: quiz Check yourself
Q: A company has equity of ₹60 lakh costing 15%, preference shares of ₹10 lakh costing 11% and debt of ₹30 lakh at 12% interest before tax. The tax rate is 25%. What is its WACC, in %?
= 12.75..12.85
> After-tax Kd = 12% × 0.75 = 9%. WACC = 0.60 × 15% + 0.10 × 11% + 0.30 × 9% = 9.0% + 1.1% + 2.7% = 12.8%. Using the pre-tax 12% for debt gives 13.7%.

Q: Case scenario. Kulhad Crafts Ltd, the listed company that makes Tapri's clay cups, shows equity share capital of ₹40 lakh (4 lakh shares) and retained earnings of ₹60 lakh in its balance sheet; its shares trade at ₹75. Dev wants market value weights. What market value should he give the retained earnings?
- [ ] ₹60 lakh
- [x] ₹180 lakh
- [ ] ₹300 lakh
- [ ] ₹120 lakh
> Market value of equity = 4 lakh × ₹75 = ₹300 lakh, split in the book ratio 40 : 60: ₹120 lakh to equity capital and ₹180 lakh to retained earnings. ₹60 lakh is the book value; ₹300 lakh is all of the equity; ₹120 lakh is the equity capital's share.

Q: When will a firm's marginal cost of capital equal its average cost of capital?
- [ ] When it uses market value weights
- [x] When it raises funds in its existing proportions and the component costs remain unchanged
- [ ] When it has no debt
- [ ] Never, because new funds always cost more
> The Study Material: when a firm raises funds in a proportional manner and the component costs remain unchanged, there is no difference between the average and the marginal cost of capital (SM 4.38).

Q: A company will raise new funds as 40% debt and 60% equity. It has ₹48 lakh of retained earnings; after that it must sell new shares. Up to what amount of new funds can it invest before selling new shares?
- [ ] ₹48 lakh
- [ ] ₹120 lakh
- [x] ₹80 lakh
- [ ] ₹28.8 lakh
> Break point = retained earnings ÷ equity proportion = ₹48 lakh ÷ 0.60 = ₹80 lakh. ₹120 lakh divides by the debt proportion; ₹28.8 lakh multiplies instead of dividing.

Q: Which of these are among the five factors that the Study Material lists as affecting the cost of capital? Select all that apply.
- [x] Inflation
- [x] Exchange rates
- [ ] The company's dividend payout ratio
- [x] Supply and demand for funds
> ICAI's five: supply and demand, investor preferences, risk and return, inflation and exchange rates (SM 4.4–4.5). The payout ratio is not among them.
:::

## Recap

- Cost of capital: the return expected by providers of capital; also called the cut-off rate, hurdle rate, minimum rate of return; used for investment evaluation, financing decisions and credit policy.
- Five factors: supply and demand, investor preferences, risk and return, inflation, exchange rates.
- WACC = Σ weight × after-tax cost; weights add up to 1; it is the minimum return that creates value.
- BV weights: balance sheet figures, reserves inside equity. MV weights: number × market price; split the market value of equity between share capital and retained earnings in their book value ratio.
- MCC: the cost of an additional rupee, with marginal weights (proportions of new funds); no BV/MV choice.
- Break point = cheaper source available ÷ its proportion; beyond it, the MCC steps up, faster than the average.
- Each tranche keeps its own cost; after new debt, recompute Ke at the new price. (The blend costs more once the Assam runs out.)

## Flashcards

Q:: ICAI's definition of WACC?
A:: The weighted average after-tax costs of the individual components of the firm's capital structure, combined into a single overall cost of capital.

Q:: The four steps to calculate WACC?
A:: (1) Total capital from all sources; (2) proportion of each source to total capital; (3) multiply each proportion by its cost; (4) add the products.

Q:: Three decisions in which the cost of capital is significant?
A:: Evaluation of investment options, financing decisions, and designing an optimum credit policy.

Q:: The five factors affecting the cost of capital (SM order)?
A:: Supply and demand, investor preferences, risk and return, inflation, exchange rates.

Q:: How are retained earnings given market value weights?
A:: The market value of equity shares is apportioned between paid-up equity capital and retained earnings in the ratio of their book values.

Q:: Book value versus market value weights: the five points of comparison?
A:: Definition (historical cost vs current market price), reflection of current conditions, stability, relevance for investors, ease of calculation.

Q:: ICAI's definition of marginal cost of capital?
A:: The cost of raising an additional rupee of capital (the cost of new funds), derived as the average cost of capital calculated with marginal weights.

Q:: What are marginal weights, and why is there no BV/MV choice for MCC?
A:: The proportions of funds the firm intends to employ; since the weights are those of the new funds, book and market values do not arise.

Q:: Formula: break point in the marginal cost of capital?
A:: Amount of the cheaper source available ÷ its proportion in new funds (e.g. retained earnings ÷ equity proportion).

Q:: When is MCC equal to the average cost of capital, and what happens when component costs rise?
A:: Equal when funds are raised in the same proportions and component costs stay unchanged; when component costs rise, the average cost rises and the marginal cost rises faster.

Q:: A company earns 20% and its WACC is 11%. What does the Study Material conclude?
A:: It produces value of about 9% for its investors; a return below WACC means the company is shedding value.
