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
  });
}
