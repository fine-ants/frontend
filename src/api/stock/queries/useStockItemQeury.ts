import { useQuery } from "@tanstack/react-query";
import { getStockItem } from "..";
import { stockKeys } from "./queryKeys";

export default function useStockItemQuery(tickerSymbol: string) {
  return useQuery({
    queryKey: stockKeys.item(tickerSymbol).queryKey,
    queryFn: () => getStockItem(tickerSymbol),
    select: (res) => res.data,
  });
}
