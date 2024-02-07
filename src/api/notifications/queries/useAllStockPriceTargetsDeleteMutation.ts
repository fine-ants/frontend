import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllStockPriceTargets } from "..";
import { notificationKeys } from "./queryKeys";

export default function useAllStockPriceTargetsDeleteMutation(
  tickerSymbol: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetPriceNotificationIds: number[]) =>
      deleteAllStockPriceTargets({
        tickerSymbol,
        body: { targetPriceNotificationIds },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.stockNotificationSettings().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "종목 지정가 알림을 삭제했습니다",
    },
  });
}
