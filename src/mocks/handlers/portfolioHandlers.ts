import { HTTPSTATUS } from "@api/types";
import {
  PortfolioDetails,
  PortfolioHolding,
  PortfolioReqBody,
  PurchaseHistory,
  PurchaseHistoryInput,
} from "@features/portfolio/api/types";
import { calculateRate } from "@features/portfolio/utils/calculations";
import {
  portfolioHoldings,
  portfolios,
  successfulGetPortfolioChartsResponse,
  successfulGetPortfolioDetailsResponse,
  successfulGetPortfoliosResponse,
  successfulPortfolioAddResponse,
  successfulPortfolioDeleteResponse,
  successfulPortfolioEditResponse,
  successfulPortfolioHoldingPurchaseAddResponse,
  successfulPortfolioHoldingPurchaseDeleteResponse,
  successfulPortfolioHoldingPurchaseEditResponse,
} from "@mocks/data/portfolioData";
import { portfolioDetails } from "@mocks/data/portfolioDetailsData";
import { HttpResponse, http } from "msw";

const portfolioDetailsData = portfolioDetails;

export default [
  // List of all Portfolios
  http.get("/api/portfolios", () => {
    return HttpResponse.json(successfulGetPortfoliosResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Portfolio Charts
  http.get("/api/portfolio/:portfolioId/charts", () => {
    return HttpResponse.json(successfulGetPortfolioChartsResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Add Portfolio
  http.post<never, PortfolioReqBody>("/api/portfolios", async ({ request }) => {
    const { name, securitiesFirm, budget, targetGain, maximumLoss } =
      await request.json();

    const targetReturnRate = Number(calculateRate(targetGain, budget));
    const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

    const data: PortfolioDetails = {
      id: portfolioDetails.length + 1,
      securitiesFirm: securitiesFirm,
      name: name,
      budget,
      targetGain,
      targetReturnRate: isNaN(targetReturnRate) ? 0 : targetReturnRate,
      maximumLoss,
      maximumLossRate: isNaN(maximumLossRate) ? 0 : maximumLossRate,
      currentValuation: 0,
      investedAmount: 0,
      totalGain: 0,
      totalGainRate: 0,
      dailyGain: 0,
      dailyGainRate: 0,
      balance: 0,
      annualDividend: 0,
      annualDividendYield: 0,
      annualInvestmentDividendYield: 0,
      provisionalLossBalance: 0,
      targetGainNotify: false,
      maxLossNotify: false,
    };

    portfolioDetailsData.push(data);

    return HttpResponse.json(
      {
        ...successfulPortfolioAddResponse,
        data: {
          portfolioId: portfolioDetailsData.length,
        },
      },
      {
        status: HTTPSTATUS.success,
      }
    );
  }),

  // Delete Portfolio
  http.delete("/api/portfolios/:portfolioId", ({ params }) => {
    const { portfolioId } = params;
    portfolioDetailsData.splice(Number(portfolioId) - 1, 1);

    return HttpResponse.json(successfulPortfolioDeleteResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Delete Multiple Portfolios
  http.delete<never, { portfolioIds: number[] }>(
    "/api/portfolios",
    async ({ request }) => {
      // TODO: apply changes to mock data
      const { portfolioIds } = await request.json();

      for (let i = 0; i < portfolios.length; i++) {
        const currentPortfolio = portfolios[i];
        if (portfolioIds.includes(currentPortfolio.id)) {
          portfolios.splice(i, 1);
          i--;
        }
      }

      return HttpResponse.json(successfulPortfolioDeleteResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Portfolio Details & Holdings
  http.get("/api/portfolio/:portfolioId/holdings", ({ params }) => {
    const { portfolioId } = params;

    const resPortfolioDetailsResponse = {
      ...successfulGetPortfolioDetailsResponse,
    };
    resPortfolioDetailsResponse.data.portfolioDetails =
      portfolioDetailsData[Number(portfolioId) - 1];

    return HttpResponse.json(resPortfolioDetailsResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Edit Portfolio Details
  http.put<{ portfolioId: string }, PortfolioReqBody>(
    "/api/portfolios/:portfolioId",
    async ({ request, params }) => {
      const { portfolioId } = params;
      const { budget, targetGain, maximumLoss } = await request.json();

      const targetReturnRate = Number(calculateRate(targetGain, budget));
      const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

      portfolioDetailsData[Number(portfolioId) - 1] = {
        ...portfolioDetailsData[Number(portfolioId) - 1],
        ...{
          budget,
          targetGain,
          maximumLoss,
          targetReturnRate,
          maximumLossRate,
        },
      } as PortfolioDetails;

      return HttpResponse.json(successfulPortfolioEditResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Add Portfolio Holding
  http.post<
    { portfolioId: string },
    {
      tickerSymbol: string;
      purchaseHistory?: PurchaseHistoryInput;
    }
  >("/api/portfolio/:portfolioId/holdings", async ({ request }) => {
    const { tickerSymbol, purchaseHistory } = await request.json();
    const purchaseHistoryArray: PurchaseHistory[] = purchaseHistory
      ? [
          {
            purchaseHistoryId: portfolioHoldings.length,
            ...purchaseHistory,
            purchaseDate: purchaseHistory.purchaseDate,
          },
        ]
      : [];

    const newPortfolioHoldingId = portfolioHoldings.length + 1;
    const data: PortfolioHolding = {
      id: newPortfolioHoldingId,
      companyName: "새로추가한주식",
      tickerSymbol: tickerSymbol,
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
      purchaseHistory: purchaseHistoryArray,
      dateAdded: new Date().toISOString(),
    };

    portfolioHoldings.push(data);

    return HttpResponse.json(
      {
        ...successfulPortfolioAddResponse,
        data: {
          portfolioHoldingId: newPortfolioHoldingId,
        },
      },
      {
        status: HTTPSTATUS.success,
      }
    );
  }),

  // Delete Portfolio Holding
  http.delete(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId",
    ({ params }) => {
      const { portfolioHoldingId } = params;

      // Mutate portfolio holding data
      const targetPortfolioHoldingIndex = portfolioHoldings.findIndex(
        (holding) => holding.id === Number(portfolioHoldingId)
      );
      portfolioHoldings.splice(targetPortfolioHoldingIndex, 1);

      return HttpResponse.json(successfulPortfolioDeleteResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Add Portfolio Holding Purchase History
  http.post<
    { portfolioHoldingId: string },
    {
      portfolioId: number;
      portfolioHoldingId: number;
      body: PurchaseHistoryInput;
    }
  >(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory",
    async ({ params, request }) => {
      const { portfolioHoldingId } = params;
      const data = await request.json();

      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.id === Number(portfolioHoldingId)
      );
      targetPortfolioHolding?.purchaseHistory.push({
        purchaseHistoryId: Math.random(),
        ...data.body,
      });

      return HttpResponse.json(successfulPortfolioHoldingPurchaseAddResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Edit Portfolio Holding Purchase History
  http.put<
    { portfolioHoldingId: string; purchaseHistoryId: string },
    {
      portfolioId: number;
      portfolioHoldingId: number;
      purchaseHistoryId: number;
      body: {
        purchaseDate: string;
        numShares: number;
        purchasePricePerShare: number;
        memo: string;
      };
    }
  >(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory/:purchaseHistoryId",
    async ({ params, request }) => {
      const { portfolioHoldingId, purchaseHistoryId } = params;
      const { purchaseDate, numShares, purchasePricePerShare, memo } = (
        await request.json()
      ).body;

      // Find Target Portfolio Holding Purchase History
      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.id === Number(portfolioHoldingId)
      );
      const targetPurchaseHistory =
        targetPortfolioHolding?.purchaseHistory.find(
          (purchase) => purchase.purchaseHistoryId === Number(purchaseHistoryId)
        );

      if (targetPurchaseHistory) {
        targetPurchaseHistory.purchaseDate = purchaseDate;
        targetPurchaseHistory.numShares = numShares;
        targetPurchaseHistory.purchasePricePerShare = purchasePricePerShare;
        targetPurchaseHistory.memo = memo;
      }

      return HttpResponse.json(successfulPortfolioHoldingPurchaseEditResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Delete Portfolio Holding Purchase History
  http.delete(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory/:purchaseHistoryId",
    ({ params }) => {
      const { portfolioHoldingId, purchaseHistoryId } = params;

      // Mutate Portfolio Holding Purchase History Data
      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.id === Number(portfolioHoldingId)
      );
      const targetPurchaseHistoryIndex =
        targetPortfolioHolding?.purchaseHistory.findIndex(
          (purchase) => purchase.purchaseHistoryId === Number(purchaseHistoryId)
        );
      targetPortfolioHolding?.purchaseHistory.splice(
        targetPurchaseHistoryIndex!,
        1
      );

      return HttpResponse.json(
        successfulPortfolioHoldingPurchaseDeleteResponse,
        {
          status: HTTPSTATUS.success,
        }
      );
    }
  ),
];
