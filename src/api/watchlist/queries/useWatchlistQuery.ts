import { useSuspenseQuery } from "@tanstack/react-query";
import { getWatchlist } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistQuery() {
  return useSuspenseQuery({
    queryKey: watchlistKeys.list().queryKey,
    queryFn: () => getWatchlist(),
    retry: false,
    select: (res) => res.data,
  });
}
