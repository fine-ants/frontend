import { HttpResponse, http } from "msw";
import authHandlers from "./authHandlers";
import dashboardHandlers from "./dashboardHandlers";
import memberNotifications from "./notifications/memberNotifications";
import portfolioHandlers from "./portfolioHandlers";
import stockHandlers from "./stockHandlers";
import userHandlers from "./userHandlers";
import watchlistHandlers from "./watchlistHandlers";

export default [
  http.get("/api/hello", () => {
    return HttpResponse.json({ message: "Hello World" });
  }),
  ...authHandlers,
  ...dashboardHandlers,
  ...portfolioHandlers,
  ...stockHandlers,
  ...userHandlers,
  ...watchlistHandlers,
  ...memberNotifications,
];
