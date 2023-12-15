import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistQuery() {
  return useQuery({
    queryKey: watchlistKeys.list().queryKey,
    queryFn: () => getWatchlist(),
    retry: false,
    select: (res) => res.data,
  });
}
