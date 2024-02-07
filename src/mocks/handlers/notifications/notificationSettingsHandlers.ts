import { HTTPSTATUS } from "@api/types";
import {
  successfulPortfolioNotificationSettingsData,
  successfulStockNotificationSettingsData,
} from "@mocks/data/notifications/notificationSettingsData";
import { HttpResponse, http } from "msw";

export default [
  // Get Stock Notification Settings
  http.get("/api/stocks/notification/settings", () => {
    return HttpResponse.json(successfulStockNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),

  // Get Portfolio Notification Settings
  http.get("/api/portfolios/notification/settings", () => {
    return HttpResponse.json(successfulPortfolioNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),
];
