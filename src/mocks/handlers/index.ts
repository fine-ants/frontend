import { HttpResponse, http } from "msw";
import authHandlers from "./authHandlers";
import dashboardHandlers from "./dashboardHandlers";
import memberNotifications from "./notifications/memberNotifications";
import portfolioHandlers from "./portfolioHandlers";
import settingsHandlers from "./settingsHandlers";
import stockHandlers from "./stockHandlers";
import watchlistHandlers from "./watchlistHandlers";

export default [
  http.get("/api/hello", () => {
    return HttpResponse.json({ message: "Hello World" });
  }),
  ...authHandlers,
  ...dashboardHandlers,
  ...portfolioHandlers,
  ...stockHandlers,
  ...settingsHandlers,
  ...watchlistHandlers,
  ...memberNotifications,
];
