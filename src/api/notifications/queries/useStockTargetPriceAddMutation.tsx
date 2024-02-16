import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStockPriceTarget } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockTargetPriceAddMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStockPriceTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.stockNotificationSettings().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "종목 지정가 알림을 추가했습니다",
    },
  });
}
