import { useSuspenseQuery } from "@tanstack/react-query";
import { getWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistsQuery() {
  return useSuspenseQuery({
    queryKey: watchlistKeys.list.queryKey,
    queryFn: () => getWatchlists(),
    retry: false,
    select: (res) => res.data,
  });
}
