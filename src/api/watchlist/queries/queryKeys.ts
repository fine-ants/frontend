import { createQueryKeys } from "@lukemorales/query-key-factory";

export const watchlistKeys = createQueryKeys("watchlist", {
  //watchlist 목록
  list: () => ({
    queryKey: ["list"],
  }),

  addList: () => ({
    queryKey: ["addList"],
  }),

  deleteList: () => ({
    queryKey: ["deleteList"],
  }),

  //watchlist 단일 & 종목
  item: (watchlistId: number) => ({
    queryKey: ["item", watchlistId],
  }),

  addStock: (watchlistId: number) => ({
    queryKey: ["addStock", watchlistId],
  }),

  deleteStock: (watchlistId: number) => ({
    queryKey: ["deleteStock", watchlistId],
  }),

  hasStock: () => ({
    queryKey: ["hasStock"],
  }),
});
