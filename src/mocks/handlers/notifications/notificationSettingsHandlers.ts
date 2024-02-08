import { HTTPSTATUS } from "@api/types";
import {
  stockNotifications,
  successfulAllStockPriceTargetsDeleteData,
  successfulPortfolioNotificationSettingsData,
  successfulPortfolioNotificationSettingsPutData,
  successfulStockNotificationSettingsData,
  successfulStockNotificationSettingsPutData,
  successfulStockPriceTargetDeleteData,
} from "@mocks/data/notifications/notificationSettingsData";
import { HttpResponse, http } from "msw";

export default [
  // Stock Notification Settings
  http.get("/api/stocks/notification/settings", () => {
    return HttpResponse.json(successfulStockNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.put<{ tickerSymbol: string }, { isActive: boolean }>(
    "/api/stocks/:tickerSymbol/target-price/notifications",
    async ({ params, request }) => {
      const { tickerSymbol } = params;
      const { isActive } = await request.json();

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

  http.delete(
    "/api/stocks/:tickerSymbol/target-price/notifications",
    ({ params }) => {
      const { tickerSymbol } = params;

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

  http.delete(
    "/api/stocks/:tickerSymbol/target-price/notifications/:targetNotificationId",
    ({ params }) => {
      const { tickerSymbol, targetNotificationId } = params;

      const targetStockNotification = stockNotifications.find(
        (stockNotification) => stockNotification.tickerSymbol === tickerSymbol
      );
      targetStockNotification?.targetPrices.splice(
        targetStockNotification.targetPrices.findIndex(
          (targetPrice) =>
            targetPrice.notificationId ===
            parseInt(targetNotificationId as string)
        ),
        1
      );

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

  http.put("/api/portfolio/:portfolioId/notification/targetGain", () => {
    return HttpResponse.json(successfulPortfolioNotificationSettingsPutData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.put("/api/portfolio/:portfolioId/notification/maxLoss", () => {
    return HttpResponse.json(successfulPortfolioNotificationSettingsPutData, {
      status: HTTPSTATUS.success,
    });
  }),
];
