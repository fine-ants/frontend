import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMemberNotificationsReadAll } from "..";
import { notificationKeys } from "./queryKeys";

export default function useReadAllMemberNotificationsMutation(
  memberId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: number[]) =>
      patchMemberNotificationsReadAll({ memberId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.memberNotifications().queryKey,
      });
    },
  });
}
