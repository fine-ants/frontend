import { HTTPSTATUS } from "@api/types";
import {
  portfolioNotifications,
  stockNotifications,
  successfulAllStockPriceTargetsDeleteData,
  successfulPortfolioNotificationSettingsData,
  successfulPortfolioNotificationSettingsPutData,
  successfulStockNotificationSettingsData,
  successfulStockNotificationSettingsPutData,
  successfulStockPriceTargetDeleteData,
  successfulStockPriceTargetPostData,
} from "@mocks/data/notifications/notificationSettingsData";
import { HttpResponse, http } from "msw";

export default [
  // Stock Notification Settings
  http.get("/api/stocks/target-price/notifications", () => {
    return HttpResponse.json(successfulStockNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.put<never, { tickerSymbol: string; isActive: boolean }>(
    "/api/stocks/target-price/notifications",
    async ({ request }) => {
      const { tickerSymbol, isActive } = await request.json();

      const targetStock = stockNotifications.find(
        (stockNotification) => stockNotification.tickerSymbol === tickerSymbol
      );

      if (targetStock) {
        targetStock.isActive = isActive;
      }

      return HttpResponse.json(successfulStockNotificationSettingsPutData, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  http.post<never, { tickerSymbol: string; targetPrice: number }>(
    "/api/stocks/target-price/notifications",
    async ({ request }) => {
      const { tickerSymbol, targetPrice } = await request.json();

      const targetStock = stockNotifications.find(
        (stockNotification) => stockNotification.tickerSymbol === tickerSymbol
      );

      if (targetStock) {
        targetStock.targetPrices.push({
          notificationId: stockNotifications.length + 1,
          targetPrice,
          dateAdded: new Date().toISOString(),
        });
      } else {
        stockNotifications.push({
          companyName: "blah",
          tickerSymbol,
          lastPrice: 1000,
          targetPrices: [
            {
              notificationId: 1,
              targetPrice,
              dateAdded: new Date().toISOString(),
            },
          ],
          isActive: true,
          lastUpdated: new Date().toISOString(),
        });
      }

      return HttpResponse.json(successfulStockPriceTargetPostData, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  http.delete<never, { tickerSymbol: string }>(
    "/api/stocks/target-price/notifications",
    async ({ request }) => {
      const { tickerSymbol } = await request.json();

      stockNotifications.splice(
        stockNotifications.findIndex(
          (stockNotification) => stockNotification.tickerSymbol === tickerSymbol
        ),
        1
      );

      return HttpResponse.json(successfulAllStockPriceTargetsDeleteData, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  http.delete<{ targetNotificationId: string }>(
    "/api/stocks/target-price/notifications/:targetNotificationId",
    ({ params }) => {
      const { targetNotificationId } = params;

      stockNotifications.forEach((stockNotification) => {
        const targetPriceIndex = stockNotification.targetPrices.findIndex(
          (targetPrice) =>
            targetPrice.notificationId ===
            parseInt(targetNotificationId as string)
        );

        if (targetPriceIndex !== -1) {
          stockNotification.targetPrices.splice(targetPriceIndex, 1);
        }
      });

      return HttpResponse.json(successfulStockPriceTargetDeleteData, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Portfolio Notification Settings
  http.get("/api/portfolios/notification/settings", () => {
    return HttpResponse.json(successfulPortfolioNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.put<{ portfolioId: string }, { isActive: boolean }>(
    "/api/portfolio/:portfolioId/notification/targetGain",
    async ({ params, request }) => {
      const { portfolioId } = params;
      const { isActive } = await request.json();

      const targetPortfolio = portfolioNotifications.find(
        (portfolioNotification) =>
          portfolioNotification.portfolioId === parseInt(portfolioId as string)
      );

      if (targetPortfolio) {
        targetPortfolio.targetGainNotify = isActive;
      }

      return HttpResponse.json(successfulPortfolioNotificationSettingsPutData, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  http.put<{ portfolioId: string }, { isActive: boolean }>(
    "/api/portfolio/:portfolioId/notification/maxLoss",
    async ({ params, request }) => {
      const { portfolioId } = params;
      const { isActive } = await request.json();

      const targetPortfolio = portfolioNotifications.find(
        (portfolioNotification) =>
          portfolioNotification.portfolioId === parseInt(portfolioId as string)
      );

      if (targetPortfolio) {
        targetPortfolio.maxLossNotify = isActive;
      }

      return HttpResponse.json(successfulPortfolioNotificationSettingsPutData, {
        status: HTTPSTATUS.success,
      });
    }
  ),
];
