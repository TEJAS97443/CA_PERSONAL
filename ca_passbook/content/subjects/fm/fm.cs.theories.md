---
id: fm.cs.theories
title: Capital structure theories: NI, NOI, traditional and Modigliani-Miller
minutes: 40
needs: fm.coc.wacc, fm.coc.equity
tags: capital structure theories, net income approach, net operating income approach, traditional approach, Modigliani-Miller, arbitrage, trade-off theory, pecking order theory
labs: cap-structure
summary: Does borrowing change what a company is worth? NI says yes, NOI and MM (no tax) say no, the traditional view says up to a point, and MM with tax says debt adds debt × tax rate.
---

## In plain words

### "Debt is cheaper, so borrow it all?"

Tapri Cold Chain Pvt Ltd, the refrigerated-truck subsidiary of Tapri Tea Co. Ltd, earns ₹30 lakh a year before interest and tax and has no debt. Its shareholders expect 15%, so the company is worth ₹30 lakh ÷ 15% = ₹2 crore. A bank offers loans at 10%.

> **Kesar:** Shareholders want 15%, the bank wants 10%. Replace shares with loans, the average cost falls, and the company is worth more. Sab adjust ho jayega.
> **Dev:** Or the shareholders, now standing behind a bank, start wanting 20%, and nothing falls at all. Depends whose theory you believe.
> **Kesar:** How many theories are there?
> **Dev:** For the exam, four, plus two modern ones. Discounted for overlap, still four.

A company's **value** is its operating profit (EBIT) capitalised at its **overall cost of capital (Ko)**, the weighted average of what lenders want (**Kd**) and what shareholders want (**Ke**). **Capital structure** is the mix of debt and equity behind that value. The whole debate is one question: when the mix changes, does Ko change?

- **Net Income (NI) approach**: yes. Kd and Ke stay put, so more cheap debt pulls Ko down and value up. Borrow as much as possible.
- **Net Operating Income (NOI) approach**: no. Shareholders raise Ke exactly enough to cancel the cheap debt; Ko and value never move.
- **Traditional approach**: up to a point. A little debt lowers Ko; too much makes lenders and shareholders nervous and Ko rises. In between lies an **optimum capital structure**.
- **Modigliani-Miller (MM)**: without taxes, no, and they prove it: if two identical firms were valued differently, investors would sell one, buy the other and pocket the difference (**arbitrage**) until the values matched. With corporate tax, yes: interest saves tax, so a levered firm is worth more by the debt × the tax rate.
- **Trade-off** and **pecking order** theories: why real companies stop borrowing somewhere, and which money they use first.

::: analogy The samosa and the taxman
Cut a samosa into two pieces or eight: you still have one samosa. That is MM without taxes: slicing the same earnings between lenders and shareholders does not make more earnings. Now seat a taxman at the table who bites only the shareholders' pieces, never the lenders'. The more of the samosa you hand to lenders, the less the taxman eats and the more is left for the people who own the plate. That is MM with tax: the extra value of debt is exactly the tax it saves.
:::

::: key
A firm is worth its operating profit capitalised at its overall cost of capital, so the debt-equity mix matters only if it changes that overall cost. NI: it falls as debt rises. NOI and MM without tax: it stays constant, because the cost of equity rises just enough to cancel the cheap debt. Traditional: it first falls, then rises, so there is an optimum. MM with tax: borrowing adds value equal to the tax the interest saves, the debt times the tax rate.
:::

## How it works

### The ground rules every theory assumes

The theories explain the relationship between cost of capital, capital structure and value of the firm under these assumptions (SM 5.5):

1. There are only two kinds of funds used by a firm, debt and equity.
2. The total assets of the firm are given; the degree of leverage can be changed by selling debt to purchase shares or selling shares to retire debt.
3. Taxes are not considered.
4. The dividend payout ratio is 100%.
5. The firm's total financing remains constant.
6. Business risk is constant over time.
7. The firm has perpetual life.

With these, the arithmetic is the same in every theory (SM 5.3):

$$\text{Value of the firm} = \frac{\text{EBIT}}{K_o} \qquad K_o = K_d \times \frac{D}{D+S} + K_e \times \frac{S}{D+S}$$

D and S are the market values of debt and equity; Ko is the WACC built in [[fm.coc.wacc|WACC and the marginal cost of capital]]. What differs is which rate each theory holds constant.

### Theory 1: the Net Income approach, where debt is a free lunch

According to the NI approach, capital structure decision is relevant to the value of the firm. An increase in financial leverage will lead to decline in the WACC, while the value of the firm as well as the market price of the ordinary share will increase; a decrease in leverage does the opposite (SM 5.6). Ke and Kd are assumed not to change with leverage. Equity is valued from the earnings left for shareholders:

$$S = \frac{\text{NI}}{K_e} \qquad V = S + D \qquad K_o = \frac{\text{EBIT}}{V}$$

NI is the earnings available for equity shareholders and Ke the equity capitalisation rate. The theory pleads for the firm to employ as much debt as possible to maximise its value (SM 5.7). Tapri Cold Chain, EBIT ₹30 lakh, Kd 10%, Ke fixed at 15%:

| Debt (₹ lakh) | NI = 30 − 10% of D | S = NI ÷ 15% | V = S + D | Ko |
|---:|---:|---:|---:|---:|
| 0 | 30 | 200.00 | 200.00 | 15.00% |
| 50 | 25 | 166.67 | 216.67 | 13.85% |
| 100 | 20 | 133.33 | 233.33 | 12.86% |
| 150 | 15 | 100.00 | 250.00 | 12.00% |

::: diagram NI approach: Ke and Kd flat, so Ko falls
{"type": "plot", "h": 290, "x": [0, 150], "y": [0, 20],
 "xlabel": "debt (₹ lakh)", "ylabel": "cost of capital (%)",
 "xticks": [[0, "0"], [50, "50"], [100, "100"], [150, "150"]],
 "yticks": [0, 5, 10, 15, 20],
 "legend": "bottom-left",
 "series": [
  {"label": "Ke", "fn": "15", "color": "d"},
  {"label": "Ko", "fn": "3000/(x+(30-0.1*x)/0.15)", "color": "a"},
  {"label": "Kd", "fn": "10", "color": "b", "dash": true}
 ],
 "points": [{"x": 0, "y": 15, "label": "15%", "pos": "below"}, {"x": 150, "y": 12, "label": "12%", "pos": "below"}],
 "caption": "Tapri Cold Chain under the NI approach. Orange: Ke, fixed at 15%; teal dashed: Kd, fixed at 10%; blue: Ko, sliding from 15% towards Kd as debt replaces equity."}
:::

### Theory 2: the traditional approach, where there is a sweet spot

As a result of financial leverage up to some point, cost of capital comes down and value of firm increases; beyond that point, reverse trends emerge. The cost of capital depends on the capital structure, and there is an optimal capital structure which minimises it (SM 5.8). Under this approach:

1. The rate of interest on debt remains constant for a certain period and thereafter, with an increase in leverage, it increases.
2. The expected rate of equity shareholders remains constant or increases gradually; after that they start perceiving a financial risk, and from the optimal point the expected rate increases speedily.
3. As a result, the WACC first decreases and then increases. The lowest point on the curve is the optimal capital structure.

Optimum capital structure occurs where value of the firm is highest and the cost of capital is the lowest. The traditional approach strikes a balance between the NI and NOI extremes (SM 5.9). Suppose Tapri Cold Chain's lenders and shareholders react like this as debt rises as a share of total value:

| Debt ÷ total value | Kd | Ke | Ko = Kd × w(D) + Ke × w(S) |
|---:|---:|---:|---:|
| 0% | 10.00% | 15.00% | 15.000% |
| 10% | 10.00% | 15.00% | 14.500% |
| 20% | 10.00% | 15.50% | 14.400% |
| **30%** | **10.50%** | **15.75%** | **14.175%** |
| 40% | 11.00% | 17.50% | 14.900% |
| 50% | 12.50% | 20.00% | 16.250% |
| 60% | 15.00% | 24.00% | 18.600% |

::: diagram Traditional approach: Ko dips, then climbs
{"type": "plot", "h": 300, "x": [0, 60], "y": [8, 26],
 "xlabel": "debt as % of total value", "ylabel": "cost of capital (%)",
 "xticks": [0, 10, 20, 30, 40, 50, 60],
 "yticks": [8, 12, 16, 20, 24],
 "legend": "top-left",
 "series": [
  {"label": "Ke", "pts": [[0, 15], [10, 15], [20, 15.5], [30, 15.75], [40, 17.5], [50, 20], [60, 24]], "color": "d"},
  {"label": "Ko", "pts": [[0, 15], [10, 14.5], [20, 14.4], [30, 14.175], [40, 14.9], [50, 16.25], [60, 18.6]], "color": "a", "dots": true},
  {"label": "Kd", "pts": [[0, 10], [10, 10], [20, 10], [30, 10.5], [40, 11], [50, 12.5], [60, 15]], "color": "b", "dash": true}
 ],
 "points": [{"x": 30, "y": 14.175, "label": "optimum: 30%", "pos": "below"}],
 "caption": "Orange: Ke, flat, then rising speedily; teal dashed: Kd, flat, then rising; blue: Ko, lowest (14.175%) at 30% debt, the optimal capital structure for this schedule."}
:::

::: lab cap-structure {"mode":"trad","basis":"book","ebit":500000,"cap":5000000,"mmcmp":true,"sched":[[0,0,10],[500000,6,10.5],[1000000,6,11],[1500000,6.2,11.3],[2000000,7,12.4],[2500000,7.5,13.5],[3000000,8,16]]}
Work down a traditional schedule yourself: Kd and Ke at each level of debt, Ko at its lowest at the optimum, and MM's Ke beside it for comparison.
:::

### Theory 3: the Net Operating Income approach, where nothing changes

NOI means EBIT. According to this approach, capital structure decisions of the firm are irrelevant: any change in leverage will not lead to any change in the total value of the firm and the market price of shares, as the overall cost of capital is independent of the degree of leverage (SM 5.11). An increase in the use of apparently cheaper debt is offset by an increase in the equity capitalisation rate, because equity investors seek higher compensation for the greater risk of fixed-return securities in the capital structure. So the firm is valued first, and equity is the balancing figure:

$$V = \frac{\text{EBIT}}{K_o} \qquad S = V - D \qquad K_e = \frac{\text{EBIT} - \text{Interest}}{S}$$

Tapri Cold Chain with Ko fixed at 15%:

| Debt (₹ lakh) | V = 30 ÷ 15% | S = V − D | NI | Ke = NI ÷ S |
|---:|---:|---:|---:|---:|
| 0 | 200 | 200 | 30 | 15.00% |
| 50 | 200 | 150 | 25 | 16.67% |
| 100 | 200 | 100 | 20 | 20.00% |
| 150 | 200 | 50 | 15 | 30.00% |

::: diagram NOI approach: Ko and Kd flat, so Ke climbs
{"type": "plot", "h": 290, "x": [0, 150], "y": [0, 32],
 "xlabel": "debt (₹ lakh)", "ylabel": "cost of capital (%)",
 "xticks": [[0, "0"], [50, "50"], [100, "100"], [150, "150"]],
 "yticks": [0, 10, 15, 20, 30],
 "legend": "top-left",
 "series": [
  {"label": "Ke", "fn": "(30-0.1*x)/(200-x)*100", "color": "d"},
  {"label": "Ko", "fn": "15", "color": "a"},
  {"label": "Kd", "fn": "10", "color": "b", "dash": true}
 ],
 "caption": "The same company under the NOI approach. Blue: Ko, fixed at 15%, so value stays ₹2 crore; teal dashed: Kd at 10%; orange: Ke, rising from 15% to 30% to absorb every rupee of cheap debt."}
:::

### Theory 4: Modigliani-Miller (1958, without tax), with a proof by greed

The NOI approach is definitional or conceptual and lacks behavioural significance; MM provide the behavioural justification for a constant Ko and therefore a constant total value (SM 5.15). In a perfect capital market with no transaction cost and no taxes, the value and cost of capital of a company remain unchanged irrespective of change in the capital structure. Additional assumptions:

- Capital markets are perfect: all information is freely available and there are no transaction costs.
- All investors are rational.
- Firms can be grouped into 'equivalent risk classes' on the basis of their business risk.
- Non-existence of corporate taxes.

From these, three propositions (SM 5.16):

1. Total market value of a firm is equal to its expected net operating income divided by the discount rate appropriate to its risk class: value of levered firm (Vg) = value of unlevered firm (Vu) = NOI ÷ Ko.
2. A firm having debt in its capital structure has a higher cost of equity than an unlevered firm; Ke includes a risk premium for the financial risk: ==Ke = Ko + (Ko − Kd) × Debt ÷ Equity==.
3. The structure of the capital (financial leverage) does not affect the overall cost of capital; the cost of capital is only affected by the business risk.

Check it on Tapri Cold Chain at debt ₹100 lakh: 15% + (15% − 10%) × 100 ÷ 100 = 20%, exactly the NOI table's figure.

**The arbitrage process.** MM's operational justification is arbitrage and the substitution of corporate leverage by personal leverage (SM 5.16–5.17). Arbitrage refers to buying an asset or security at a lower price in one market and selling it at a higher price in another, until equilibrium is attained. If two identical firms differ only in debt and one is valued higher, its shareholders sell, borrow (or lend) on their own account to keep the same risk, buy the cheaper firm, and earn the same return at a lower outlay. Their selling and buying moves both prices until the values are equal.

::: diagram The arbitrage process, step by step
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Value both firms:\nV = S + D"},
  {"id": "a", "kind": "process", "label": "Sell shares of the\nfirm with higher V"},
  {"id": "b", "kind": "process", "label": "Borrow (or lend) to keep\nthe same financial risk"},
  {"id": "c", "kind": "process", "label": "Buy shares of the\ncheaper firm"},
  {"id": "e", "kind": "end", "label": "Same income, less outlay\n(or more income)"},
  {"id": "m", "kind": "end", "label": "Values move until\nthey are equal", "color": "g"}],
 "edges": [["s", "a"], ["a", "b"], ["b", "c"], ["c", "e"], ["e", "m"]],
 "caption": "Borrow on personal account when the levered firm is dearer (SM Illustration 7); lend, buying the levered firm's debt with its equity, when the unlevered firm is dearer (Illustration 9). Green: the equilibrium MM predict."}
:::

The value of the levered firm can neither be greater nor lower than that of an unlevered firm: there is a conservation of investment value, since the sum of the parts must equal the whole (SM 5.17). **Shortcoming**: the arbitrage process will fail to work because of imperfections in capital market, existence of transaction cost and presence of corporate income taxes.

::: lab cap-structure {"mode":"arb","ebit":25000,"debtLev":75000,"kd":8,"keLev":12.5,"keUnlev":12.5,"hold":12,"switch":"all"}
Run the arbitrage step by step: sell the levered shares, borrow in proportion, buy the unlevered firm, and count the gain.
:::

### MM 1963, with tax: the taxman's bite

In 1963 MM incorporated tax: interest is deductible, so the value of the firm will increase, or its cost of capital decrease, where corporate taxes exist; the value of the levered firm exceeds that of the unlevered firm by the amount of debt multiplied by the corporate tax rate (SM 5.17–5.18):

$$V_g = V_u + \text{TB} \qquad K_{eg} = K_{eu} + (K_{eu} - K_d) \qquad \times \frac{\text{Debt}\,(1-t)}{\text{Equity}} \qquad K_{og} = K_{eu}\,(1 - tL)$$

TB is the present value of tax shields (debt × t for permanent debt), Keu the cost of equity of the unlevered company, t the tax rate and L = debt ÷ (debt + equity) (SM 5.18, 5.27). Worked Example 3 below applies all three.

::: lab cap-structure {"mode":"mmtax","unit":"lakh","start":"vu","vu":1400,"keu":18,"kd":12,"tax":30,"debt":300}
Step through MM with tax yourself: from the unlevered value to VL = VU + tD, then Ke and Ko as debt grows.
:::

### Two modern theories

**Trade-off theory.** A company chooses how much debt and equity to use by balancing the costs and benefits: the advantage of debt is its tax benefit; its cost is the cost of financial distress, including bankruptcy costs and non-bankruptcy costs (staff leaving, suppliers demanding disadvantageous payment terms, bondholder/stockholder infighting), plus agency costs from shareholders-managers and shareholders-debt holders conflicts. The marginal benefit of further debt declines as debt increases while the marginal cost increases, which gives an optimal capital structure (SM 5.27–5.28). It explains why corporations are usually financed partly with debt and partly with equity.

::: diagram Trade-off theory: tax shield against distress costs
{"type": "plot", "h": 300, "x": [0, 1200], "y": [1700, 2150],
 "xlabel": "debt (₹ lakh)", "ylabel": "value of the firm (₹ lakh)",
 "xticks": [[0, "0"], [300, "300"], [600, "600"], [900, "900"], [1200, "1,200"]],
 "yticks": [[1700, "1,700"], [1800, "1,800"], [1900, "1,900"], [2000, "2,000"], [2100, "2,100"]],
 "legend": "top-left",
 "series": [
  {"label": "MM with tax: Vu + 0.25D", "fn": "1800+0.25*x", "color": "b", "dash": true},
  {"label": "trade-off value", "fn": "1800+0.25*x-0.0002*x^2", "color": "a"},
  {"label": "unlevered value", "fn": "1800", "color": "mute", "dash": true}
 ],
 "points": [{"x": 625, "y": 1878.125, "label": "optimal debt", "pos": "below"}],
 "caption": "Illustrative: an unlevered firm worth ₹1,800 lakh, tax 25%, and distress costs assumed to grow as 0.0002 × D². Teal dashed: the tax shield alone; blue: value after distress costs, highest at debt of ₹625 lakh."}
:::

**Pecking order theory.** Based on **asymmetric information**: managers know more than investors. Firms prefer to issue debt when they are positive about future earnings; equity is issued when they are doubtful and internal finance is insufficient. The capital structure decision gives higher priority to sources that reveal the least amount of information; there is no well-defined debt-equity target (SM 5.29). The order:

1. Managers' first choice is to use internal finance.
2. In absence of internal finance, they use secured debt, unsecured debt, hybrid debt etc.
3. Managers issue new equity shares as a last option.

### All six on one page

::: diagram Relevant or irrelevant?
{"type": "tree", "gapX": 40, "gapY": 96, "root": {"label": "Capital structure\ntheories", "children": [{"label": "Relevance\nNI approach\nTraditional approach\nMM 1963 (with tax)", "color": "a"}, {"label": "Irrelevance\nNOI approach\nMM 1958 (without tax)", "color": "d"}]}, "caption": "ICAI's own grouping (SM 5.5). Trade-off and pecking order theories explain the mix firms actually choose."}
:::

::: compare
| Theory | As debt rises | Message |
|---|---|---|
| NI | Kd, Ke constant; Ko falls | use maximum debt |
| Traditional | Kd, Ke flat, then rising; Ko falls, then rises | an optimum exists |
| NOI | Kd, Ko constant; Ke rises | mix irrelevant |
| MM 1958 | Ko constant; Ke = Ko + (Ko − Kd) D/E | irrelevant, proved by arbitrage |
| MM 1963 | Ke rises less steeply; Ko falls | value up by D × t |
| Trade-off | tax benefit against distress and agency costs | an optimum exists |
| Pecking order | no target ratio | internal funds, then debt, equity last |
:::

How a finance manager actually weighs the mix (control, risk, cost, flexibility) is in [[fm.cs.planning|capital structure planning]], and how each mix changes EPS at a given EBIT is in [[fm.cs.ebiteps|EBIT-EPS analysis]].

## Formats and formulas

*Reproduce these two statements from memory: almost every numerical on this topic is one of them.*

| Value under the NI approach (Ke given) | ₹ |
|---|---:|
| EBIT | xxx |
| Less: Interest on debt | (xxx) |
| Earnings available for equity holders (NI) | xxx |
| Equity capitalisation rate (Ke) | x% |
| Market value of equity (S) = NI ÷ Ke | xxx |
| Market value of debt (D) | xxx |
| **Total value of firm V = S + D** | **xxx** |
| Overall cost of capital Ko = EBIT ÷ V | x% |

| Value under the NOI approach or MM without tax (Ko given) | ₹ |
|---|---:|
| EBIT (NOI) | xxx |
| Overall cost of capital (Ko) | x% |
| **Value of the firm V = EBIT ÷ Ko** | **xxx** |
| Less: Market value of debt (D) | (xxx) |
| Market value of equity (S) | xxx |
| Earnings available for equity holders (EBIT − interest) | xxx |
| Cost of equity Ke = NI ÷ S | x% |

::: formula Overall cost of capital
$$K_o = K_d \times \frac{D}{D+S} + K_e \times \frac{S}{D+S} \qquad = \frac{\text{EBIT}}{V}$$
Ko is the WACC; D and S are market values of debt and equity (SM 5.3). With tax, use the post-tax Kd in the weighted average.
:::

::: formula MM without tax: cost of equity of a levered firm
$$K_e = K_o + (K_o - K_d) \times \frac{\text{Debt}}{\text{Equity}}$$
Ko equals the Ke of the identical unlevered firm (SM 5.16).
:::

::: formula MM with tax: value of a levered firm
$$V_g = V_u + \text{TB} \qquad V_u = \frac{\text{EBIT}\,(1-t)}{K_{eu}}$$
TB = present value of tax shields; for permanent debt, debt × t (SM 5.18, 5.69).
:::

::: formula MM with tax: cost of equity and WACC of a levered firm
$$K_{eg} = K_{eu} + (K_{eu} - K_d) \qquad \times \frac{\text{Debt}\,(1-t)}{\text{Equity}} \qquad K_{og} = K_{eu}\,(1 - tL)$$
Kd here is the pre-tax rate of interest; L = debt ÷ (debt + equity) at market value (SM 5.26–5.27).
:::

**Arbitrage in three steps** (the layout of ICAI's Suggested Answers): 1. Valuation of firms (EBIT, interest, earnings for equity, Ke, S, D, V); 2. Investment and borrowings (sell, borrow or lend, buy); 3. Change in return (new income, less interest, less old income = incremental income due to arbitrage).

::: definition Arbitrage
Arbitrage refers to buying asset or security at lower price in one market and selling it at a higher price in another market. As a result, equilibrium is attained in different markets. (SM 5.16–5.17)
:::

## Worked examples

:::: example Samosa Junction: one company, two theories
Samosa Junction Ltd, Tapri's frozen-snacks subsidiary, earns EBIT of ₹18,00,000 a year and has 12% debentures of ₹60,00,000. Ignore taxes.

**Required:**

(i) Assuming the NI approach with an equity capitalisation rate of 16%, calculate the market value of equity, the value of the firm and the overall cost of capital.

(ii) Assuming the NOI approach with an overall cost of capital of 15%, calculate the value of the firm, the market value of equity and the cost of equity. Verify the cost of equity with MM's formula.

(iii) Recalculate (i) and (ii) if the company issues further debentures to raise its debt to ₹90,00,000 and uses the money to buy back shares. Comment.

::: answer Show the working
**(i) NI approach: statement of value**

| Particulars | ₹ |
|---|---:|
| EBIT | 18,00,000 |
| Less: Interest (12% × ₹60,00,000) | (7,20,000) |
| Earnings available for equity holders (NI) | 10,80,000 |
| Ke | 16% |
| Market value of equity S = 10,80,000 ÷ 0.16 | 67,50,000 |
| Market value of debt D | 60,00,000 |
| **Value of firm V = S + D** | **1,27,50,000** |

Ko = EBIT ÷ V = ₹18,00,000 ÷ ₹1,27,50,000 = **14.12%**.

**(ii) NOI approach: statement of value**

| Particulars | ₹ |
|---|---:|
| EBIT | 18,00,000 |
| Ko | 15% |
| **Value of firm V = 18,00,000 ÷ 0.15** | **1,20,00,000** |
| Less: Market value of debt | (60,00,000) |
| Market value of equity S | 60,00,000 |
| Earnings for equity holders (18,00,000 − 7,20,000) | 10,80,000 |

Ke = ₹10,80,000 ÷ ₹60,00,000 = **18%**. Verification: Ke = Ko + (Ko − Kd) D/E = 15% + (15% − 12%) × 60 ÷ 60 = **18%**.

**(iii) Debt raised to ₹90,00,000** (interest ₹10,80,000; NI ₹7,20,000)

| Particulars | NI approach | NOI approach |
|---|---:|---:|
| Market value of equity (₹) | 45,00,000 (7,20,000 ÷ 16%) | 30,00,000 (1,20,00,000 − 90,00,000) |
| Value of firm (₹) | 1,35,00,000 | 1,20,00,000 |
| Overall cost of capital | 13.33% | 15.00% |
| Cost of equity | 16.00% | 24.00% |

Check (NOI): 15% + 3% × 90 ÷ 30 = 24%.

**Comment.** Under the NI approach the extra debt raises value by ₹7,50,000 and lowers Ko from 14.12% to 13.33%, because Ke is assumed fixed. Under the NOI approach value stays ₹1,20,00,000 and Ko 15%: Ke rises from 18% to 24% and exactly offsets the cheaper debt.
:::
::::

:::: example Cold-chain twins: the arbitrage that costs interest
PolarKart Ltd (levered) and FrostLine Logistics Ltd (unlevered), two cold-chain firms that carry Tapri's frozen snacks, are identical in every respect except capital structure. Each earns EBIT of ₹3,00,000 a year. Ignore taxes.

| Particulars | PolarKart (₹) | FrostLine (₹) |
|---|---:|---:|
| 10% debentures (market value) | 10,00,000 | Nil |
| Market value of equity | 18,00,000 | 25,00,000 |

Bunty's uncle holds 5% of the shares of PolarKart. A bank will lend to him personally at 12%, not at the 10% PolarKart pays.

**Required:**

(i) Show which company the market values higher.

(ii) Calculate the increase in his annual income if he switches his holding to FrostLine, keeping his risk unchanged.

(iii) Calculate the highest personal borrowing rate at which the switch still pays, and comment.

::: answer Show the working
**(i) Valuation of firms**

| Particulars | PolarKart (₹) | FrostLine (₹) |
|---|---:|---:|
| EBIT | 3,00,000 | 3,00,000 |
| Less: Interest (10% × ₹10,00,000) | 1,00,000 | Nil |
| Earnings available to equity shareholders | 2,00,000 | 3,00,000 |
| Value of equity S | 18,00,000 | 25,00,000 |
| Debt D | 10,00,000 | Nil |
| **Value of firm V = S + D** | **28,00,000** | **25,00,000** |

The levered company is valued higher, so he sells its shares and buys shares of the unlevered company. To maintain the level of risk he borrows his proportionate share of the levered company's debt and invests that amount also in the unlevered company.

**(ii) Investment and borrowings**

| Particulars | ₹ |
|---|---:|
| Sell shares in PolarKart (₹18,00,000 × 5%) | 90,000 |
| Borrow money (₹10,00,000 × 5%) | 50,000 |
| **Buy shares in FrostLine** | **1,40,000** |

₹1,40,000 buys 1,40,000 ÷ 25,00,000 = 5.6% of FrostLine.

**Change in return**

| Particulars | ₹ |
|---|---:|
| Income from FrostLine (5.6% × ₹3,00,000) | 16,800 |
| Less: Interest on personal loan (₹50,000 × 12%) | 6,000 |
| Net income after the switch | 10,800 |
| Less: Income from PolarKart (5% × ₹2,00,000) | 10,000 |
| **Incremental income due to arbitrage** | **800** |

**(iii) Highest personal borrowing rate.** The switch pays while ₹16,800 − ₹50,000 × r exceeds ₹10,000, that is while r is below 6,800 ÷ 50,000 = **13.6%**. At PolarKart's own 10% the gain would be ₹1,800.

**Comment.** Arbitrage works through the substitution of corporate leverage by personal leverage (SM 5.16–5.17), so it assumes investors can borrow on terms close to the company's, as in MM's perfect capital market. The dearer the personal loan, the smaller the gain, and above 13.6% this mispricing would survive.
:::
::::

:::: example Kulhad Crafts and its ₹80 lakh target
Kulhad Crafts Ltd, Tapri's pottery supplier, is an all-equity company with a market value of ₹1,800 lakh and a cost of capital of 20%. It distributes its entire earnings as dividend and its EBIT is expected to stay constant. The board wants the company's value to rise to ₹1,880 lakh by buying back equity shares and replacing them with 11% debentures of the same amount. The corporate tax rate is 25%.

**Required:** As per the MM approach,

(i) calculate the amount of debentures needed;

(ii) calculate the overall cost of capital and the cost of equity after the change;

(iii) Dev asks why the company should not replace all its equity with debt. Comment.

::: answer Show the working
**Working note: EBIT.** Earnings for equity holders = ₹1,800 lakh × 20% = ₹360 lakh = EAT, so EBIT = ₹360 lakh ÷ (1 − 0.25) = **₹480 lakh**.

**(i) Debentures needed.** Value of levered firm = value of unlevered firm + tax advantage (D × t). ₹1,880 lakh = ₹1,800 lakh + D × 0.25, so D = ₹80 lakh ÷ 0.25 = **₹320 lakh**.

**(ii) Income statement** (₹ lakh)

| Particulars | All equity | Equity and debt |
|---|---:|---:|
| EBIT | 480.00 | 480.00 |
| Interest on ₹320 lakh @ 11% | — | 35.20 |
| EBT | 480.00 | 444.80 |
| Tax @ 25% | 120.00 | 111.20 |
| Income available to equity holders | 360.00 | 333.60 |

Market value of equity = ₹1,880 lakh − ₹320 lakh = ₹1,560 lakh. Ke = ₹333.60 ÷ ₹1,560 = **21.38%**. Kd = 11% × (1 − 0.25) = 8.25%.

| Component | Amount (₹ lakh) | Cost | Weight | WACC |
|---|---:|---:|---:|---:|
| Equity | 1,560 | 21.38% | 0.83 | 17.75% |
| Debt | 320 | 8.25% | 0.17 | 1.40% |
| **Total** | **1,880** | | **1.00** | **19.15%** |

Weights are 1,560 ÷ 1,880 and 320 ÷ 1,880, rounded to two decimals as ICAI's answers do (unrounded weights give 19.149%, the same 19.15%). Ko has fallen by 0.85% (20% − 19.15%) due to the tax relief on debt interest; Ke has risen by 1.38% due to the financial risk of the debt.

**Check with MM's formulas:** Ko = 20% × [1 − (0.25 × 320 ÷ 1,880)] = **19.15%**; Ke = 20% + (20% − 11%) × 320 (1 − 0.25) ÷ 1,560 = 20% + 1.38% = **21.38%**.

**(iii) Comment.** On MM's 1963 model alone every rupee of debt adds its tax saving, so value would be highest with (almost) all debt. That conclusion ignores the costs of financial distress, which rise with debt; the trade-off theory sets them against the tax shield, so value is highest at a moderate level of debt (the trade-off figure above, drawn for a firm of the same ₹1,800 lakh, peaks at debt of ₹625 lakh).
:::
::::

## Under the hood

### Two printings of one formula

The boxed formula on SM 5.18 prints the levered cost of equity as Keu + (Keu − Kd) × Debt ÷ (Debt + Equity), without (1 − t). The worked note to Illustration 10 (SM 5.27), the May 2025 Suggested Answer and the RTP for September 2024 all use **Keu + (Keu − Kd) × Debt (1 − t) ÷ Equity**, and only that version reproduces the Ke found directly from the income statement (21.38% in Example 3). Use the (1 − t) version, and when time allows, show Ke directly as income for equity ÷ market value of equity as well.

### Where the numbers come from

- **NI against NOI.** Both use V = S + D; they differ in what is given. NI gives Ke and finds V; NOI (and MM without tax) gives Ko and finds Ke. If a question gives Ko, you are in NOI or MM territory.
- **The unlevered firm with tax** is worth EBIT (1 − t) ÷ Keu (SM 5.69, Practical Problem 8): ₹18,00,000 × 0.60 ÷ 18% = ₹60,00,000 there, and the levered twin ₹60,00,000 + ₹54,00,000 × 0.40 = ₹81,60,000.
- **Traditional optimum questions** give a schedule of Kd and Ke. When the debt is given as a share of total value, weight the two rates directly (SM Illustration 3); when it is given in rupees, value equity as (EBIT − interest) ÷ Ke, add debt, and take Ko = EBIT ÷ V for each option (ICAI's answer to MTP Series II for May 2026, Q1(a)). The lowest Ko is the answer.
- **Not the dividend MM.** The same authors' dividend irrelevance theory is a different model: see [[fm.div.models|dividend theories]].

## Exam angle

### What ICAI asks

::: exam In the ICAI documents read for this lesson (new scheme, May 2024 to September 2026)
Capital structure theories appeared in 17 of the 32 question sets searched (8 past papers, 8 RTPs, 16 MTPs):

- **Arbitrage, levered and unlevered firms, 4–5 marks**: May 2024 Q2(b) (4 marks, investor holds 12%); MTP Series I for September 2026 Q1(a) (5 marks); RTP May 2024 Q3. All three switch from levered to unlevered and lay out the three-step answer of Example 2.
- **MM with tax, 2–6 marks**: May 2025 Q2(b) (4 marks, all-equity company buys back ₹300 lakh with 12% debentures); September 2025 MCQ 6 (2 marks, market value of equity after replacing ₹325 lakh of equity with 16% debentures: ₹2,100 + ₹325 × 35% − ₹325 = ₹1,888.75 lakh); MTP Series I for January 2026 Q3(a) (6 marks, converting debt to equity, so value falls); RTP September 2024 Q6.
- **MM without and with tax, two companies, 5 marks**: RTP September 2024 Q7, RTP May 2026 Q6, MTP Series I for September 2025: the Study Material's Practical Problem 8 pattern.
- **NI approach, value and Ko**: MTP Series II for January 2025 Q1(b) (5 marks, the statement of Example 1(i)).
- **NOI / MM cost of equity**: MTP Series I for May 2024 Q1(b) (5 marks); MTP Series I for May 2025 MCQ 6 (2 marks).
- **Traditional approach, optimum debt**: MTP Series II for May 2026 Q1(a) and Series II for January 2026 Q1(b) (5 marks each, the same figures); MTP Series II for May 2025 Q2(b) (6 marks, traditional optimum then Ke under MM).
- **Theory, 1–2 marks**: May 2025 Q4(c) and MTP Series I for May 2026 Q4(c) (OR), the order of financing under pecking order theory (May 2025 also asks why it exists); MCQs on whether Ke rises with the debt ratio (MTP Series II for September 2024, MTP Series I for September 2026).
:::

::: exam The traps in those answers
- MM with tax: equity after the change = Vg − debt. The Suggested Answers subtract the debt that replaced the equity.
- An all-equity value and Ke given, with tax: back out EBIT = (value × Ke) ÷ (1 − t) first, as in May 2025 Q2(b).
- Arbitrage: borrow (or lend) your percentage of the levered firm's debt at the same rate; the answers say "to maintain the level of risk".
- The Suggested Answers round weights to two decimals, so the WACC can differ in the second decimal from the formula Keu (1 − tL): SM Illustration 10 shows 19.11% and 19.10%, and the May 2025 answer prints 16.93% with a note that unrounded weights give 16.91%.
:::

::: trick Which way does the arbitrage run?
Always sell the firm with the **higher** total value V and buy the lower. If the levered firm is dearer, borrow on personal account; if the unlevered firm is dearer, lend (buy the levered firm's debt) in the levered firm's debt-equity proportion. Valid in MM's no-tax world, where the two firms differ only in leverage.
:::

## Answer frame

### Theory questions and the points that earn marks

**"Explain the assumptions of the Modigliani-Miller theory"** (SM 5.15): perfect capital markets (information free, no transaction costs); rational investors; equivalent risk classes based on business risk; no corporate taxes; plus the general assumptions (two sources, constant total financing, 100% payout, constant business risk, perpetual life).

**"Describe the NOI approach and its assumptions"** (SM 5.5, 5.11): NOI = EBIT; capital structure irrelevant; Ko independent of leverage; cheaper debt offset by a rising Ke because equity investors seek compensation for greater risk; Ko and Kd constant, Ke rises; value = EBIT ÷ Ko; the seven general assumptions.

**"What is the hierarchy of financing under the pecking order theory, and why does it exist?"** (SM 5.29; May 2025): internal finance, then debt (secured, unsecured, hybrid), then new equity last; it exists because of asymmetric information, as managers prefer the source that reveals the least information. ICAI's 2025 answer adds: to minimise the cost of capital, keep financial control and avoid negative market signals.

**"Explain the trade-off theory"** (SM 5.27–5.28): balance benefit of debt (tax) against costs (financial distress: bankruptcy and non-bankruptcy costs; agency costs); marginal benefit falls and marginal cost rises with debt; optimum capital structure; explains mixed financing.

### Three answers to "Calculate the increase in earnings from arbitrage"

::: cols
**Loses marks**

"Value of levered firm is higher, so switch. Gain ₹800."

No valuation table, no borrowing: the method marks are gone.
---
**Passes**

Valuation table, then sale of ₹90,000 invested in FrostLine.

Forgot the personal loan, so the risk is not the same and the gain comes out wrong.
---
**Full marks**

Three headings: valuation of firms; investment and borrowings (borrow 5% of the levered debt "to maintain the level of risk"); change in return. Final line: incremental income due to arbitrage.
:::

## Common mistakes

::: mistake Hall of Shame: the arbitrageur who forgot to borrow
Selling ₹90,000 of levered shares and buying ₹90,000 of unlevered shares compares a risky holding with a safe one. **Fix:** borrow your share of the levered firm's debt (here ₹50,000) and invest it too; the interest on it comes off the new income.
:::

::: mistake The value of the firm passed off as the value of equity
In MM with tax, ₹1,880 lakh is the value of the whole company. Using it as equity gives Ke = 333.60 ÷ 1,880 = 17.74%, below the unlevered 20%, which is nonsense. **Fix:** equity = Vg − debt = ₹1,560 lakh, and Ke = 21.38%.
:::

::: mistake NI and NOI swapped
Fixing Ke when the question gives Ko (or the reverse) gives the other theory's answer. **Fix:** read which rate is given: Ke given, start from earnings for equity (NI); Ko given, start from EBIT ÷ Ko (NOI, MM).
:::

::: mistake Post-tax Kd in the wrong formula
The levered Ke formula with tax uses the pre-tax interest rate (12%) and puts (1 − t) on the debt; the WACC uses the post-tax Kd (9%). Mixing them gives 20% + 11% × 0.2 = 22.2%. **Fix:** pre-tax Kd inside (Keu − Kd); post-tax Kd in the weighted average.
:::

## Practice

::: quiz Check yourself
Q: Under the NOI approach, a company has EBIT of ₹12,00,000, an overall cost of capital of 12% and debt of ₹40,00,000 at 9%. Ignoring taxes, what is its cost of equity, in per cent?
= 13.9..14.1
> V = ₹12,00,000 ÷ 12% = ₹1,00,00,000; S = ₹60,00,000; earnings for equity = ₹12,00,000 − ₹3,60,000 = ₹8,40,000; Ke = 14%. MM check: 12% + 3% × 40 ÷ 60 = 14%.

Q: Case scenario. Dev models Tapri's planned airport kiosks business as an all-equity company worth ₹500 crore, with a cost of capital of 15% and a constant EBIT. He then tests a version that borrows ₹100 crore of permanent debt and uses it to buy back shares. The corporate tax rate is 25%. What is the overall cost of capital of the levered version under MM with tax?
- [ ] 15.00%
- [ ] 14.25%
- [x] 14.29%
- [ ] 11.25%
> Vg = ₹500 crore + ₹100 crore × 25% = ₹525 crore, and Ko = Keu × (1 − tD ÷ V) = 15% × (1 − 25 ÷ 525) = 14.29%; equivalently EBIT (1 − t) ÷ Vg = ₹75 crore ÷ ₹525 crore. 15.00% is MM without tax; 14.25% divides by the unlevered ₹500 crore instead of Vg; 11.25% wrongly applies (1 − t) to the whole cost of capital.

Q: Which approach holds that cheaper debt is exactly offset by a higher equity capitalisation rate, so the overall cost of capital stays constant?
- [ ] Net Income approach
- [ ] Traditional approach
- [x] Net Operating Income approach
- [ ] Pecking order theory
> NOI: Ko and Kd constant, Ke rises with leverage. NI holds Ke constant; traditional lets Ko fall then rise; pecking order is about the order of sources.

Q: An investor holds 5% of the equity of a levered firm whose debt is ₹20,00,000, and the levered firm is valued higher than its unlevered twin. To switch without changing his risk, how much must he borrow?
- [ ] Nothing: he only sells and buys shares
- [ ] 5% of the levered firm's total value
- [x] ₹1,00,000, 5% of the levered firm's debt
- [ ] ₹20,00,000, the whole debt
> Personal leverage replaces corporate leverage in the same proportion: 5% of ₹20,00,000. Not borrowing changes the risk; that is the commonest slip.

Q: Which of these are assumptions of the MM approach (1958, without tax)? Select all that apply.
- [x] Capital markets are perfect and there are no transaction costs
- [x] Firms can be grouped into equivalent risk classes
- [ ] The cost of equity stays constant whatever the leverage
- [x] All investors are rational
> SM 5.15 lists perfect markets, rational investors, equivalent risk classes and no corporate taxes. A constant Ke is the NI approach; under MM, Ke rises with leverage.

Q: Under the pecking order theory, which source does management use last?
- [ ] Retained earnings
- [ ] Secured debt
- [ ] Hybrid debt
- [x] A fresh issue of equity shares
> Internal finance first, then debt (secured, unsecured, hybrid), and new equity as the last option, because it reveals the most information.
:::

## Recap

- Value of the firm = EBIT ÷ Ko; Ko = Kd × D/V + Ke × S/V. Capital structure matters only if it moves Ko.
- NI: Ke, Kd constant; S = NI ÷ Ke; V = S + D; Ko falls; use maximum debt.
- NOI: Ko constant; V = EBIT ÷ Ko; S = V − D; Ke = (EBIT − I) ÷ S rises; mix irrelevant.
- Traditional: Kd flat then up, Ke gradual then speedy; Ko falls then rises; optimum at the lowest Ko.
- MM 1958: perfect markets, rational investors, equivalent risk classes, no tax; Ke = Ko + (Ko − Kd) D/E; arbitrage with personal leverage equalises values.
- MM 1963: Vg = Vu + D × t; Ke = Keu + (Keu − Kd) D (1 − t)/E; Ko = Keu (1 − tL).
- Trade-off: tax benefit against distress and agency costs gives an optimum. Pecking order: internal funds, debt, equity last.
- One samosa, however you slice it, unless the taxman only eats from one plate.

## Flashcards

Q:: State the seven assumptions ICAI lists for capital structure theories.
A:: Only debt and equity; total assets given, leverage changed by swapping debt and shares; no taxes; 100% dividend payout; total financing constant; business risk constant; perpetual life.

Q:: NI approach: what is constant, and what does it recommend?
A:: Ke and Kd are constant, so more debt lowers WACC and raises value; it pleads for as much debt as possible.

Q:: NOI approach: how are value and Ke found?
A:: V = EBIT ÷ Ko (Ko constant); S = V − D; Ke = (EBIT − interest) ÷ S, which rises with leverage. Capital structure is irrelevant.

Q:: Traditional approach: the three features?
A:: Kd constant for a while then rises; Ke constant or gradually rising, then rising speedily; WACC first falls then rises, its lowest point being the optimal capital structure.

Q:: MM 1958: the four additional assumptions?
A:: Perfect capital markets (free information, no transaction costs); rational investors; equivalent risk classes by business risk; no corporate taxes.

Q:: MM without tax: cost of equity of a levered firm?
A:: Ke = Ko + (Ko − Kd) × Debt ÷ Equity.

Q:: MM with tax: value of a levered firm?
A:: Vg = Vu + TB, the present value of tax shields (debt × tax rate for permanent debt); Vu = EBIT (1 − t) ÷ Keu.

Q:: MM with tax: Ke and Ko of the levered firm?
A:: Keg = Keu + (Keu − Kd) × Debt (1 − t) ÷ Equity; Kog = Keu (1 − tL), L = debt ÷ (debt + equity).

Q:: Define arbitrage (ICAI).
A:: Buying an asset or security at a lower price in one market and selling it at a higher price in another, so that equilibrium is attained in different markets.

Q:: Shortcoming of the MM approach?
A:: The arbitrage process fails because of capital market imperfections, transaction costs and corporate income taxes.

Q:: Trade-off theory in one line?
A:: Firms balance the tax benefit of debt against the costs of financial distress (bankruptcy and non-bankruptcy) and agency costs; this gives an optimal capital structure.

Q:: Pecking order theory: the order of financing?
A:: Internal finance first; then secured, unsecured and hybrid debt; new equity shares last. Based on asymmetric information.
