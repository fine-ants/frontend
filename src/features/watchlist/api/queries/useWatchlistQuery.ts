import { useSuspenseQuery } from "@tanstack/react-query";
import { getWatchlist } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistQuery(watchlistId: number) {
  return useSuspenseQuery({
    queryKey: watchlistKeys.item(watchlistId).queryKey,
    queryFn: () => getWatchlist(watchlistId),
    retry: false,
    select: (res) => res.data,
  });
}
