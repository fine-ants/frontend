import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllMemberNotification } from "..";
import { notificationKeys } from "./queryKeys";

export default function useDeleteAllMemberNotificationsMutation(
  memberId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationIds: number[]) =>
      deleteAllMemberNotification({ memberId, notificationIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.memberNotifications().queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "알림 목록 전체를 삭제 했습니다",
      toastErrorMessage: "알림 목록 전체 삭제를 실패했습니다",
    },
  });
}
