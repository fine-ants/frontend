import { HttpResponse, http } from "msw";
import authHandlers from "./authHandlers";
import dashboardHandlers from "./dashboardHandlers";
import portfolioHandlers from "./portfolioHandlers";
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
  ...watchlistHandlers,
];
