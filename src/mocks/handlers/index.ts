import authHandlers from "./authHandlers";
import portfolioHandlers from "./portfolioHandlers";
import stockHandlers from "./stockHandlers";

export default [...authHandlers, ...portfolioHandlers, ...stockHandlers];
