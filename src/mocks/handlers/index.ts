import authHandlers from "./authHandlers";
import dashboardHandlers from "./dashboardHandlers";
import portfolioHandlers from "./portfolioHandlers";
import stockHandlers from "./stockHandlers";
import watchlistHandlers from "./watchlistHandlers";

export default [
  ...authHandlers,
  ...portfolioHandlers,
  ...stockHandlers,
  ...watchlistHandlers,
  ...dashboardHandlers,
];
