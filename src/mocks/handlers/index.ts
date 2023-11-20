import authHandlers from "./authHandlers";
import portfolioHandlers from "./portfolioHandlers";
import stockHandlers from "./stockHandlers";
import watchlistHandlers from "./watchlistHandlers";

export default [
  ...authHandlers,
  ...portfolioHandlers,
  ...stockHandlers,
  ...watchlistHandlers,
];
