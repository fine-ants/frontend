import { HTTPSTATUS } from "@api/types";
import { successfulPortfolioNotificationSettingsData } from "@mocks/data/notifications/notificationSettingsData";
import { HttpResponse, http } from "msw";

export default [
  // Get Portfolio Notification Settings
  http.get("/api/portfolios/notification/settings", () => {
    return HttpResponse.json(successfulPortfolioNotificationSettingsData, {
      status: HTTPSTATUS.success,
    });
  }),
];
