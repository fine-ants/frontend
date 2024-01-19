import { createQueryKeys } from "@lukemorales/query-key-factory";

export const portfolioKeys = createQueryKeys("portfolio", {
  list: () => ({
    queryKey: ["portfolioList"],
  }),
  details: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  charts: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  addPortfolio: () => ({
    queryKey: ["addPortfolio"],
  }),
  deletePortfolios: () => ({
    queryKey: ["deletePortfolios"],
  }),
  addHolding: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  deleteHolding: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  addHoldingPurchase: () => ({
    queryKey: ["addHoldingPurchase"],
  }),
  editHoldingPurchase: (filters: {
    portfolioId: number;
    portfolioHoldingId: number;
    purchaseHistoryId: number;
  }) => ({
    queryKey: [filters],
  }),
  deleteHoldingPurchase: (filters: {
    portfolioId: number;
    portfolioHoldingId: number;
    purchaseHistoryId: number;
  }) => ({
    queryKey: [filters],
  }),
});
