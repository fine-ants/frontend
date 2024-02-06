import { createQueryKeys } from "@lukemorales/query-key-factory";

export const stockKeys = createQueryKeys("stock", {
  search: (query: string) => ({
    queryKey: [query],
  }),
  page: (tickerSymbol: string) => ({
    queryKey: ["page", tickerSymbol],
  }),
});
