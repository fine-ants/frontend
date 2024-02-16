import { createQueryKeys } from "@lukemorales/query-key-factory";

export const watchlistKeys = createQueryKeys("watchlist", {
  //watchlist 목록
  list: () => ({
    queryKey: ["list"],
  }),

  //watchlist 단일 & 종목
  item: (watchlistId: number) => ({
    queryKey: ["item", watchlistId],
  }),

  hasStock: () => ({
    queryKey: ["hasStock"],
  }),
});
