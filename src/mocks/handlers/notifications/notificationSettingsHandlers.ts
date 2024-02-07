import { HTTPSTATUS } from "@api/types";
import {
  successfulPortfolioNotificationSettingsData,
  successfulPortfolioNotificationSettingsPutData,
  successfulStockNotificationSettingsData,
  successfulStockNotificationSettingsPutData,
} from "@mocks/data/notifications/notificationSettingsData";
import { HttpResponse, http } from "msw";

export default [
  // Stock Notification Settings
  http.get("/api/stocks/notification/settings", () => {
    return HttpResponse.json(successfulStockNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.put("/api/stocks/:tickerSymbol/target-price/notifications", () => {
    return HttpResponse.json(successfulStockNotificationSettingsPutData, {
      status: HTTPSTATUS.success,
    });
  }),

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
