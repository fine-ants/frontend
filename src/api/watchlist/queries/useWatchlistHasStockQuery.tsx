import { useSuspenseQuery } from "@tanstack/react-query";
import { getWatchlistHasStock } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistHasStockQuery(tickerSymbol: string) {
  return useSuspenseQuery({
    queryKey: watchlistKeys.hasStock().queryKey,
    queryFn: () => getWatchlistHasStock(tickerSymbol),
    select: (res) => res.data,
  });
}
