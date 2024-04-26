import { createQueryKeys } from "@lukemorales/query-key-factory";

export const watchlistKeys = createQueryKeys("watchlist", {
  list: null,
  item: (watchlistId: number) => [watchlistId],
  hasStock: null,
});
