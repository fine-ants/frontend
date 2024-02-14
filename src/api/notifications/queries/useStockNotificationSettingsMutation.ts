import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putStockNotificationSettings } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockNotificationSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: notificationKeys.editStockNotificationSettings().queryKey,
    mutationFn: putStockNotificationSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.stockNotificationSettings().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "알림 설정을 변경했습니다",
    },
  });
}
