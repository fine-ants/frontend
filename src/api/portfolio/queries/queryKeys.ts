import { createQueryKeys } from "@lukemorales/query-key-factory";

export const portfolioKeys = createQueryKeys("portfolio", {
  list: null,
  details: (portfolioId: number) => [portfolioId],
  charts: (portfolioId: number) => [portfolioId],
});
