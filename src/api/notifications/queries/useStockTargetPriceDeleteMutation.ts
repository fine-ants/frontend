import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStockPriceTarget } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockTargetPriceDeleteMutation(
  tickerSymbol: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetNotificationId: number) =>
      deleteStockPriceTarget({
        tickerSymbol,
        targetNotificationId,
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