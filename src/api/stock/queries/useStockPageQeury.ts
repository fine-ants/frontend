import { useSuspenseQuery } from "@tanstack/react-query";
import { getStockPage } from "..";
import { stockKeys } from "./queryKeys";

export default function useStockPageQuery(tickerSymbol: string) {
  return useSuspenseQuery({
    queryKey: stockKeys.page(tickerSymbol).queryKey,
    queryFn: () => getStockPage(tickerSymbol),
    retry: false,
    select: (res) => res.data,
  });
}
