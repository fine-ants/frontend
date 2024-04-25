import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMemberNotificationsReadAll } from "..";
import { notificationKeys } from "./queryKeys";

export default function useReadAllMemberNotificationsMutation(
  memberId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationIds: number[]) =>
      patchMemberNotificationsReadAll({ memberId, notificationIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.memberNotifications.queryKey,
      });
    },
  });
}
