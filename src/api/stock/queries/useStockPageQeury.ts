import { useQuery } from "@tanstack/react-query";
import { getStockPage } from "..";
import { stockKeys } from "./queryKeys";

export default function useStockPageQuery(tickerSymbol: string) {
  return useQuery({
    queryKey: stockKeys.page(tickerSymbol).queryKey,
    queryFn: () => getStockPage(tickerSymbol),
    select: (res) => res.data,
  });
}
