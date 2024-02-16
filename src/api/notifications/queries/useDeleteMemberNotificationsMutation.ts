import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemberNotification } from "..";
import { notificationKeys } from "./queryKeys";

export default function useDeleteMemberNotificationsMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      deleteMemberNotification({ memberId, notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.memberNotifications().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "알림 목록을 삭제 했습니다",
      toastErrorMessage: "알림 목록 삭제를 실패했습니다",
    },
  });
}
