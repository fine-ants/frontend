import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putStockNotificationSettings } from "..";
import { StockNotificationSettingsPutBody } from "../types";
import { notificationKeys } from "./queryKeys";

export default function useStockNotificationSettingsMutation(
  tickerSymbol: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: notificationKeys.editStockNotificationSettings().queryKey,
    mutationFn: (body: StockNotificationSettingsPutBody) =>
      putStockNotificationSettings({ tickerSymbol, body }),
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
