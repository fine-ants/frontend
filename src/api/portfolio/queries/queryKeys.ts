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
});
