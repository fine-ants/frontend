import { useQuery } from "@tanstack/react-query";
import { postStockSearch } from "..";
import { stockKeys } from "./queryKeys";

export default function useStockSearchQuery(query: string) {
  return useQuery({
    queryKey: stockKeys.search(query).queryKey,
    queryFn: () => postStockSearch(query),
    retry: false,
    enabled: query !== "",
    staleTime: 1000 * 60 * 5,
    select: (res) => res.data,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
