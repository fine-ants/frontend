import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolioNotificationSettings } from "..";
import { PortfolioNotificationSettingsPutBody } from "../types";
import { notificationKeys } from "./queryKeys";

type MutationFnProps = {
  notificationType: "targetGain" | "maxLoss";
  body: PortfolioNotificationSettingsPutBody;
};

export default function usePortfolioNotificationSettingsMutation(
  portfolioId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ notificationType, body }: MutationFnProps) =>
      putPortfolioNotificationSettings({ portfolioId, notificationType, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.portfolioNotificationSettings().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "알림 설정을 변경했습니다",
    },
  });
}
