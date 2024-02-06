import { useQuery } from "@tanstack/react-query";
import { getWatchlistHasStock } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistHasStockQuery(tickerSymbol: string) {
  return useQuery({
    queryKey: watchlistKeys.hasStock().queryKey,
    queryFn: () => getWatchlistHasStock(tickerSymbol),
    select: (res) => res.data,
  });
}
