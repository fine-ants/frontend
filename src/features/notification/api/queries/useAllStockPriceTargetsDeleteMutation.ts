import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllStockPriceTargets } from "..";
import { notificationKeys } from "./queryKeys";

export default function useAllStockPriceTargetsDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllStockPriceTargets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.stockNotificationSettings.queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "종목 지정가 알림을 삭제했습니다",
      toastErrorMessage: "종목 지정가 알림 삭제를 실패했습니다",
    },
  });
}
