import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistQuery() {
  return useQuery({
    queryKey: watchlistKeys.list().queryKey,
    queryFn: () => getWatchlist(),
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "관심 종목을 불러오는데 실패했습니다",
    },
  });
}
