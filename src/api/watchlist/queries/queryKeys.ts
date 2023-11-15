import { createQueryKeys } from "@lukemorales/query-key-factory";

export const watchlistKeys = createQueryKeys("watchlist", {
  list: () => ({
    queryKey: ["list"],
  }),

  addItem: () => ({
    queryKey: ["addItem"],
  }),

  deleteItem: (tickerSymbol: string) => ({
    queryKey: ["deleteItem", tickerSymbol],
  }),
});
