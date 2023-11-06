import { createQueryKeys } from "@lukemorales/query-key-factory";

export const portfolioKeys = createQueryKeys("portfolio", {
  details: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  addPortfolio: () => ({
    queryKey: ["addPortfolio"],
  }),
  chart: () => ({
    queryKey: ["portfolioChart"],
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
