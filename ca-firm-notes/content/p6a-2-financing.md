## Unit 2 — Financing Decisions and Cost of Capital

:::dialogue
@Y: Shares are cheaper than the bank's 12% loan. They cost nothing — we pay a dividend only if we want to.
@P: Equity is the most expensive money a company can raise. Tell me why by Friday.
@N: The equity holder is paid last and so demands the most, and interest is deductible while dividend is not. That is the spine of the unit.
:::

### Sources of finance

| | Equity shares | Preference shares | Debt |
|---|---|---|---|
| Return | Residual, discretionary | Fixed rate, ranks before equity | Fixed, contractual |
| Maturity | Perpetual; no default possible | Redeemable or irredeemable; arrears accumulate | Dated; enforceable |
| Tax | Dividend is a post-tax appropriation | Same | Interest is a deductible charge |
| Control | Votes, so dilutes control | Limited votes | No votes, but covenants bind |
| Cost to firm | Highest | Between | Lowest |

**Methods of raising long-term finance**: public issue, rights issue, private placement and
preferential allotment, offer for sale, debentures or bonds, term loans and deferred credit, and
internal accruals.

**Short-term sources**: trade credit and accrued expenses (spontaneous, and free unless a discount is
forgone), bank finance (cash credit, overdraft, bills discounting, working capital demand loan, letter
of credit), commercial paper, certificates of deposit, inter-corporate deposits, public deposits,
factoring, and advances from customers.

**Contemporary sources of funding** are examined descriptively, so carry one clause each. **P2P
lending** — a platform matches individual lenders directly with borrowers, cutting out the bank.
**Crowd funding** — many small contributors fund a venture through a platform, in donation, reward,
debt or equity form. **Equity funding** — a stake issued to angel investors, private equity or
strategic investors. **Start-up funding** — the staged ladder from bootstrapping and family money
through incubators, accelerators and angel rounds to venture capital, with government schemes
alongside.

**Internal funds** are retained earnings plus funds released by depreciation: no issue cost, no
dilution — but not free, because retained earnings carry an opportunity cost equal to what
shareholders could have earned, so their cost is the cost of equity.

**International sources**: American and Global Depository Receipts, Foreign Currency Convertible
Bonds, External Commercial Borrowings, foreign currency term loans, Euro issues, export credit, and
foreign direct or portfolio investment.

**Other sources.** **Lease financing** gives use without ownership; a **finance lease** transfers
substantially all risks and rewards, an **operating lease** does not. **Sale and lease back** — the
owner sells an asset and immediately leases it back, freeing locked-up capital while keeping the use of
it. **Convertible debt** — debt carrying a right to convert into equity: cheap while debt, dilutive
once converted. **Venture capital** — equity or quasi-equity in unlisted high-risk ventures, with
active involvement and a planned exit. **Grants** — non-repayable, usually purpose-restricted.

### Cost of capital

The cost of capital is the minimum return a project must earn to leave shareholders no worse off. It is
the **discount rate in Unit 3**, the **benchmark for value creation** in Unit 1, and the quantity
minimised in capital structure design. **Factors**: the general level of interest rates, the tax regime,
capital structure and financial policy, business and financial risk, dividend policy, and issue costs.

**Say this once and never break it.** In WACC, **debt is taken after tax**, because interest is
deductible in computing taxable profit, so the firm parts with only `I(1 - t)`. **Equity and
preference are not**, because dividends are an appropriation of post-tax profit and carry no shield.
Multiplying Ke or Kp by (1 − t) is a guaranteed lost mark.

:::formula Cost of equity — dividend growth model and CAPM
@formula: Ke = D1/P0 + g          with issue cost:  Ke = D1/NP + g      D1 = D0 x (1 + g)
Ke = Rf + Beta x (Rm - Rf)
@terms: g = constant dividend growth = retention ratio (b) x return on equity (r).
@watch: D1, not D0, goes in the numerator. If the risk **premium** is given, do not subtract Rf from it
again — the commonest CAPM slip. CAPM needs no dividend and no growth, so use it for a non-payer.
:::

:::formula Cost of debt and of preference shares
@formula: Kd irredeemable = I(1 - t)/NP           (drop the (1 - t) for the pre-tax cost)
Kd redeemable  = [ I(1 - t) + (RV - NP)/n ] / [ (RV + NP)/2 ]
Kp irredeemable = PD/NP                          Kp redeemable = [ PD + (RV - NP)/n ] / [ (RV + NP)/2 ]
@terms: NP = net proceeds after discount and expenses; RV = redemption value; n = years to redemption.
@watch: Interest is computed on **face value** but divided by **net proceeds**. No (1 − t) appears
anywhere in Kp. The redeemable formulas spread the capital gain or loss over the life and over average
funds — an *approximation* to the true after-tax IRR, so say which route you used.
:::

:::formula Weighted average and marginal cost of capital
@formula: WACC (Ko) = (We x Ke) + (Wp x Kp) + (Wd x Kd after tax) + (Wr x Kr)
Marginal cost of capital = weighted cost of the ADDITIONAL funds, at new costs and new weights only.
@watch: Weights (book or market) must total exactly 1.0 and every cost must be on the same tax basis.
Market weights are preferred because each component cost is itself derived from market prices. Marginal
cost is not the new average cost of the enlarged pool — a different figure the question may also want.
:::

:::estimate WACC on book-value and market-value weights, then the marginal cost
@given: Capital (₹ lakh) — equity capital 100, retained earnings 50, 10% preference 50 (net proceeds ₹95
per ₹100), 12% irredeemable debentures 100 (net proceeds ₹96 per ₹100). Tax 30%. Equity dividend just
paid ₹4, growing at 5%; market price ₹50. Market values: equity 250, preference 45, debentures 105. The
company now raises ₹100 lakh as 50% equity (costing 15% after expenses), 20% preference at 11%, 30%
debt at 9.5% after tax.
@ask: Compute Ke, Kp and Kd; WACC on book and on market weights; and the marginal cost of capital. Say
which figure appraises a new project.
@work: D1 = 4 x 1.05 = ₹4.20, so **Ke = 4.20/50 + 0.05 = 13.40%**; retained earnings take the same
13.40%, there being no issue cost to deduct. **Kp = 10/95 = 10.53%**, no tax adjustment.
**Kd = 12(1 − 0.30)/96 = 8.75%** after tax, against 12/96 = 12.50% before tax.

```text
                          BOOK VALUES                    MARKET VALUES
                     ₹ lakh   Weight    Cost   Product   ₹ lakh  Weight   Cost   Product
  (bracketed book figures are components of the 150, not additions to the 300)
  Equity capital       (100)                                250   0.6250  13.40%  8.375
  Retained earnings     (50)                                  -        -       -      -
  Equity + reserves      150   0.5000  13.40%   6.700
  Preference shares       50   0.1667  10.53%   1.754         45   0.1125  10.53%  1.184
  12% Debentures         100   0.3333   8.75%   2.917        105   0.2625   8.75%  2.297
                         ---   ------           -----        ---   ------          -----
                         300   1.0000          11.37%        400   1.0000         11.86%
```

**Marginal cost of capital** = (0.50 x 15%) + (0.20 x 11%) + (0.30 x 9.5%) = 7.50 + 2.20 + 2.85 =
**12.55%**. Appraise the new project at **12.55%**, because that is the cost of the money the
project will actually consume; the historic WACC prices funds already raised.
@sanity: The market WACC exceeds the book WACC only because equity — the dearest source — carries a
bigger weight at ₹250 lakh than at ₹150 lakh; if yours came out lower, you have added reserves into
the market column too. And each weight column must total exactly 1.0000.
:::

:::trap Giving retained earnings a market value of their own
Retained earnings have a book value but no market quotation — the share price already capitalises them,
which is why the market column shows a dash. Some Study Material questions instead ask you to **split**
the market value of equity between capital and reserves in the ratio of their book values; that
convention exists and yields the same WACC, both slices carrying the same cost. State which you
followed, never both.
:::

> **Verify:** whether any tax on dividend distribution is loaded into Kp or Ke, and whether retained
> earnings are discounted for personal tax and brokerage, are settled by the Study Material for your
> attempt. Do not assume a rate.

### Capital structure decisions

Capital structure is the mix of long-term debt and equity. It moves both WACC and the risk borne by
equity; the **optimum capital structure** is the mix at which WACC is lowest and firm value highest.

**Determinants**: cost of capital and the tax shield; business risk and stability of earnings; the need
to retain control; flexibility and unused debt capacity; lenders' covenants; size and stage of the
company; asset structure and available security; market conditions; and the purpose of the finance.
Designing an optimum structure means maximising EPS or value while keeping fixed charges serviceable —
carry **FRICT**: flexibility, risk, income, control, timing.

| Theory | Ke and Kd as debt rises | WACC | Value of firm |
|---|---|---|---|
| Net Income | Both constant | Falls | Rises with debt; structure is relevant |
| Net Operating Income | Ke rises just enough to offset; Kd constant | Constant | Unaffected; structure is irrelevant |
| Traditional | Ke rises slowly then sharply; Kd rises after a point | U-shaped | Optimum at the bottom of the U |
| Modigliani–Miller | Ke rises per the arbitrage argument; Kd constant | Constant without tax, falls with tax | Vu without tax; Vu + Dt with corporate tax |

The NOI mechanism deserves one arithmetic line, because it *is* the argument. With EBIT ₹10,00,000 and
Ko 12.5%, value = 10,00,000/0.125 = ₹80,00,000. Add ₹20,00,000 of 10% debt: equity is worth ₹60,00,000,
so Ke = (10,00,000 − 2,00,000)/60,00,000 = 13.33%. Recheck the WACC — 0.25 x 10% + 0.75 x 13.33% =
**12.5%**, unchanged. Cheap debt bought nothing because equity repriced. MM defends the result by
**arbitrage**: an investor can create or undo gearing personally, so two identical firms cannot sell at
different prices.

**EBIT–EPS analysis** chooses between financing plans by comparing EPS at the expected EBIT. The
**indifference (break-even EBIT) point** is the EBIT at which two plans give equal EPS. The **financial
break-even EBIT** is a different thing — the EBIT at which EPS is exactly zero, equal to interest plus
preference dividend grossed up by (1 − t).

:::key Above the indifference EBIT, gear up; below it, issue equity. Debt magnifies EPS in both directions, so the choice is really a judgement on how firm the EBIT forecast is.
Worked: to raise ₹40,00,000 on 2,00,000 existing shares, Plan A issues 40,000 shares at ₹100 and Plan
B issues 10% debt; tax 30%. Setting EBIT(1−t)/2,40,000 = (EBIT − 4,00,000)(1−t)/2,00,000 gives EBIT =
**₹24,00,000**, where both yield EPS of exactly **₹7.00**. Plan B's financial break-even EBIT is
₹4,00,000.
:::

**Over- and under-capitalisation** compare earnings with capital employed, and candidates reverse them.
**Over-capitalised**: capital employed exceeds what earnings justify, the earning rate is below normal,
book value of shares exceeds real value — caused by over-issue of capital, assets bought at inflated
prices, promotion in a boom, or inadequate depreciation; remedied by reorganising capital, redeeming
debt and writing down assets. **Under-capitalised**: earnings are high relative to capital employed,
the earning rate is above normal, real value exceeds book value — caused by under-estimating
requirements, conservative dividends building reserves, or high efficiency; remedied by bonus shares,
share splits or a higher dividend.

### Leverages

:::formula The three leverages and the identity between them
@formula: DOL = Contribution / EBIT              = %change in EBIT / %change in Sales
DFL = EBIT / PBT                                 = %change in EPS  / %change in EBIT
DFL with preference shares = EBIT / [ EBIT - I - Dp/(1 - t) ]
DCL = DOL x DFL                                  = %change in EPS  / %change in Sales
DCL = Contribution / PBT        <-- ONLY when there is no preference dividend
DCL with preference shares = Contribution / [ EBIT - I - Dp/(1 - t) ]
@terms: Contribution = Sales − Variable cost. PBT = EBIT − Interest. Dp = preference dividend.
@watch: Operating leverage comes from fixed **operating** cost, financial leverage from fixed
**financial** charges. A firm with no fixed cost has DOL of 1 and one with no debt has DFL of 1 —
leverage is a multiplier, so its neutral value is one, never zero. DCL is a product, never a sum.

**The shortcut `Contribution / PBT` is only valid when `Dp = 0`,** and this is the trap most
revision sheets get wrong. It comes from cancelling EBIT out of `(Contribution/EBIT) x (EBIT/PBT)`
— but the moment a preference dividend exists, DFL is no longer `EBIT/PBT`, so there is no EBIT
to cancel and the shortcut silently understates DCL. Use `%change in EPS / %change in Sales` as
your check; it is the one route that is always right, because DCL is *defined* by the effect on
EPS and preference dividend reduces earnings available to equity.
:::

:::attempt Sales ₹10,00,000, variable cost ₹6,00,000, fixed cost ₹2,00,000, interest ₹50,000, preference dividend ₹21,000, tax 30%, 1,00,000 equity shares. Compute the three leverages by both routes, reconcile them, and verify DFL from EPS.
Lay the statement out first, because both routes read off it.

```text
                                    Base        Sales +10%
  Sales                        10,00,000        11,00,000
  Less: Variable cost           6,00,000         6,60,000
  CONTRIBUTION                  4,00,000         4,40,000
  Less: Fixed cost              2,00,000         2,00,000
  EBIT                          2,00,000         2,40,000      (+20%)
  Less: Interest                   50,000           50,000
  PBT                           1,50,000         1,90,000      (+26.67%)
  Less: Tax at 30%                 45,000           57,000
  PAT                           1,05,000         1,33,000
  Less: Preference dividend        21,000           21,000
  Earnings for equity              84,000         1,12,000
  EPS (1,00,000 shares)              0.84             1.12      (+33.33%)
```

**Operating leverage.** DOL = 4,00,000/2,00,000 = **2.00**. Check: EBIT is up 20% on a 10% sales
rise, so 20/10 = 2 ✓.

**Financial leverage — and this is where the preference dividend bites.** The dividend is paid out
of post-tax profit, so it must be grossed up before it can sit alongside pre-tax interest:
21,000/0.70 = ₹30,000. Then

DFL = 2,00,000 / (2,00,000 − 50,000 − 30,000) = 2,00,000/1,20,000 = **1.6667**

*not* EBIT/PBT = 2,00,000/1,50,000 = 1.3333. Check it against EPS: EPS rises 33.33% while EBIT
rises 20%, and 33.33/20 = **1.6667** ✓. The grossed-up figure is right and EBIT/PBT is wrong here.

**Combined leverage.** DCL = DOL x DFL = 2.00 x 1.6667 = **3.3333**. Check against the percentages:
EPS is up 33.33% on a 10% sales rise, so 33.33/10 = **3.3333** ✓.

Now notice what you must *not* do. Contribution/PBT = 4,00,000/1,50,000 = 2.6667, and that is
**not** the answer to this question. The shortcut assumes DFL is EBIT/PBT so that EBIT cancels out
of the product — which stops being true the moment a preference dividend exists. The correct
direct route here is

DCL = Contribution / [ EBIT − I − Dp/(1 − t) ] = 4,00,000/1,20,000 = **3.3333** ✓

Three routes, one answer. **The 26.67% rise in PBT is a red herring**: it gives you nothing,
because DCL is defined on EPS, and between PBT and EPS sits the preference dividend.
:::

:::think Two firms have equal EBIT and equal DCL. One has DOL 3 and DFL 1.2, the other DOL 1.2 and DFL 3. Which is riskier?
Sensitivity to sales is identical; risk is not. The second firm's exposure is **financial** — fixed
interest payable whatever happens — so a bad year threatens solvency, not just profit.
:::

```text
UNIT 2 FORMULA SHEET — cost of capital, capital structure, leverage
   I = annual interest in ₹ on face value      t  = tax rate
   NP = net proceeds after discount/expenses   RV = redemption value      n = years to redemption
   PD = annual preference dividend in ₹        Dp = preference dividend in the EPS line

COST OF EACH SOURCE
  Ke  dividend growth model     = D1/P0 + g                D1 = D0 x (1 + g)
  Ke  with floatation cost      = D1/NP + g                NP = P0 - cost per share
  Ke  CAPM                      = Rf + Beta x (Rm - Rf)
  Ke  earnings yield            = EPS / Net proceeds per share
  Kr  retained earnings         = Ke  (less personal tax and brokerage if the question says so)
  Kp  irredeemable              = PD / NP                        -- never x (1 - t)
  Kp  redeemable                = [PD + (RV - NP)/n] / [(RV + NP)/2]
  Kd  irredeemable, after tax   = I(1 - t) / NP
  Kd  irredeemable, before tax  = I / NP
  Kd  redeemable, after tax     = [I(1 - t) + (RV - NP)/n] / [(RV + NP)/2]
  Kd  term loan                 = Interest rate x (1 - t)
  Growth rate g                 = retention ratio (b) x return on equity (r)

COMBINING THEM
  WACC (Ko)                     = Sum of (weight x cost) over all sources; weights total 1.0
  Weights                       = book values OR market values (market preferred)
  Marginal cost of capital      = weighted cost of the ADDITIONAL funds only

CAPITAL STRUCTURE
  Value of firm (NOI / MM, no tax)  V  = EBIT / Ko            Ke = (EBIT - I) / Equity
  MM with corporate tax             Vl = Vu + (Debt x t)
  EPS                               = [ (EBIT - I)(1 - t) - Dp ] / No. of equity shares
  Indifference (break-even) EBIT    [(E-I1)(1-t) - Dp1] / n1 = [(E-I2)(1-t) - Dp2] / n2
  Financial break-even EBIT         = I + Dp/(1 - t)                (the EBIT at which EPS = 0)

LEVERAGE
  DOL = Contribution / EBIT             = %change EBIT / %change Sales
  DFL = EBIT / PBT                      = %change EPS  / %change EBIT
  DFL with preference shares            = EBIT / [EBIT - I - Dp/(1 - t)]
  DCL = DOL x DFL                       = %change EPS  / %change Sales
        = Contribution / PBT            ONLY if there is no preference dividend
        = Contribution / [EBIT - I - Dp/(1-t)]      when there is one
  Neutral value of every leverage is 1.0, not 0. DCL is a product, never a sum.
```
