import { HTTPSTATUS } from "@api/types";
import { calculateRate } from "@utils/calculations";
import {
  portfolioHoldings,
  successfulGetPortfolioDetailsResponse,
  successfulGetPortfolioResponse,
  successfulPortfolioAddResponse,
  successfulPortfolioDeleteResponse,
  successfulPortfolioEditResponse,
  successfulPortfolioHoldingPurchaseAddResponse,
  successfulPortfolioHoldingPurchaseDeleteResponse,
  successfulPortfolioHoldingPurchaseEditResponse,
} from "mocks/data/portfolioData";
import { portfolioDetails } from "mocks/data/portfolioDetailsData";
import { rest } from "msw";

const portfolioDetailsData = portfolioDetails;

export default [
  // List of portfolios
  rest.get("/api/portfolios", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetPortfolioResponse)
    );
  }),

  // Portfolio details
  rest.get("/api/portfolio/:portfolioId/holdings", async (req, res, ctx) => {
    const portfolioId = req.params.portfolioId;

    const resPortfolioDetailsResponse = {
      ...successfulGetPortfolioDetailsResponse,
    };
    resPortfolioDetailsResponse.data.portfolioDetails =
      portfolioDetailsData[Number(portfolioId) - 1];

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(resPortfolioDetailsResponse)
    );
  }),

  // Add portfolio holding
  rest.post("/api/portfolio/:portfolioId/holdings", async (req, res, ctx) => {
    const { tickerSymbol } = await req.json();

    const newPortfolioHoldingId = portfolioHoldings.length + 1;
    const data = {
      companyName: "새로추가한주식",
      tickerSymbol: tickerSymbol,
      portfolioHoldingId: newPortfolioHoldingId,
      currentValuation: 600000,
      currentPrice: 60000,
      averageCostPerShare: 50000.0,
      numShares: 10,
      dailyChange: 10000,
      dailyChangeRate: 10,
      totalGain: 100000,
      totalReturnRate: 16,
      annualDividend: 6000,
      annualDividendYield: 10,

      purchaseHistory: [],
    };

    portfolioHoldings.push(data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({
        ...successfulPortfolioAddResponse,
        data: {
          portfolioHoldingId: newPortfolioHoldingId, // 새로운 ID 반환
        },
      })
    );
  }),

  //Delete portfolio holding
  rest.delete(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId",
    async (req, res, ctx) => {
      const { portfolioHoldingId } = req.params;

      // Mutate portfolio holding data
      const targetPortfolioHoldingIndex = portfolioHoldings.findIndex(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      portfolioHoldings.splice(targetPortfolioHoldingIndex, 1);

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioDeleteResponse)
      );
    }
  ),

  // Add Portfolio
  rest.post("/api/portfolios", async (req, res, ctx) => {
    const { name, securitiesFirm, budget, targetGain, maximumLoss } =
      await req.json();

    const targetReturnRate = calculateRate(targetGain, budget);
    const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

    const data = {
      id: portfolioDetails.length + 1,
      securitiesFirm: securitiesFirm,
      name: name,
      budget: budget,
      targetGain: targetGain,
      targetReturnRate: targetReturnRate,
      maximumLoss: maximumLoss,
      maximumLossRate: maximumLossRate,
      currentValuation: 0,
      investedAmount: 0,
      totalGain: 0,
      totalGainRate: 0,
      dailyGain: 0,
      dailyGainRate: 0,
      balance: 0,
      totalAnnualDividend: 0,
      totalAnnualDividendYield: 0,
      annualInvestmentDividendYield: 0,
      provisionalLossBalance: 0,
    };

    portfolioDetailsData.push(data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({
        ...successfulPortfolioAddResponse,
        data: {
          portfolioId: portfolioDetailsData.length,
        },
      })
    );
  }),

  // Edit Portfolio
  rest.put("/api/portfolios/:portfolioId", async (req, res, ctx) => {
    const portfolioId = Number(req.params.portfolioId);
    const { budget, targetGain, maximumLoss } = await req.json();

    const targetReturnRate = calculateRate(targetGain, budget);
    const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

    portfolioDetailsData[portfolioId - 1] = {
      ...portfolioDetailsData[portfolioId - 1],
      ...{
        budget,
        targetGain,
        maximumLoss,
        targetReturnRate: targetReturnRate,
        maximumLossRate: maximumLossRate,
      },
    };

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioEditResponse)
    );
  }),

  // Delete Portfolio
  rest.delete("/api/portfolios/:portfolioId", async (req, res, ctx) => {
    const portfolioId = Number(req.params.portfolioId);
    portfolioDetailsData.splice(portfolioId - 1, 1);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioDeleteResponse)
    );
  }),

  // Add portfolio holding purchase history
  rest.post(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory",
    async (req, res, ctx) => {
      const { portfolioHoldingId } = req.params;
      const body = await req.json();

      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      targetPortfolioHolding?.purchaseHistory.push({
        purchaseHistoryId: Math.random(),
        ...body,
      });

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioHoldingPurchaseAddResponse)
      );
    }
  ),

  // Edit portfolio holding purchase history
  rest.put(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory/:purchaseHistoryId",
    async (req, res, ctx) => {
      const { portfolioHoldingId } = req.params;
      const { purchaseDate, numShares, purchasePricePerShare, memo } =
        await req.json();

      // find portfolio holding purchase history
      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      const targetPurchaseHistory =
        targetPortfolioHolding?.purchaseHistory.find(
          (purchase) =>
            purchase.purchaseHistoryId === Number(req.params.purchaseHistoryId)
        );

      if (targetPurchaseHistory) {
        targetPurchaseHistory.purchaseDate = purchaseDate;
        targetPurchaseHistory.numShares = numShares;
        targetPurchaseHistory.purchasePricePerShare = purchasePricePerShare;
        targetPurchaseHistory.memo = memo;
      }

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioHoldingPurchaseEditResponse)
      );
    }
  ),

  // Delete portfolio holding purchase history
  rest.delete(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory/:purchaseHistoryId",
    async (req, res, ctx) => {
      const { portfolioHoldingId, purchaseHistoryId } = req.params;

      // Mutate portfolio holding purchase history data
      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      const targetPurchaseHistoryIndex =
        targetPortfolioHolding?.purchaseHistory.findIndex(
          (purchase) => purchase.purchaseHistoryId === Number(purchaseHistoryId)
        );
      targetPortfolioHolding?.purchaseHistory.splice(
        targetPurchaseHistoryIndex!,
        1
      );

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioHoldingPurchaseDeleteResponse)
      );
    }
  ),
];
