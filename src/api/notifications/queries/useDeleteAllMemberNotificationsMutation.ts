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
  });
}
