import { useSuspenseQuery } from "@tanstack/react-query";
import { getSpecificStockTargetPrices } from "..";
import { notificationKeys } from "./queryKeys";

export default function useSpecificStockTargetPricesQuery(
  tickerSymbol: string
) {
  return useSuspenseQuery({
    queryKey: notificationKeys.specificStockTargetPrices(tickerSymbol).queryKey,
    queryFn: () => getSpecificStockTargetPrices(tickerSymbol),
    retry: false,
    select: (res) => res.data.targetPrices,
  });
}
