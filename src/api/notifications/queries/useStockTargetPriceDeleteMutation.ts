import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStockPriceTarget } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockTargetPriceDeleteMutation(
  tickerSymbol?: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStockPriceTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.stockNotificationSettings.queryKey,
      });
      if (tickerSymbol) {
        queryClient.invalidateQueries({
          queryKey:
            notificationKeys.specificStockTargetPrices(tickerSymbol).queryKey,
        });
      }
    },
    meta: {
      toastSuccessMessage: "종목 지정가 알림을 삭제했습니다",
      toastErrorMessage: "종목 지정가 알림 삭제를 실패했습니다",
    },
  });
}
