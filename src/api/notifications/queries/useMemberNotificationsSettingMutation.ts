import { userKeys } from "@api/user/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putMemberNotificationSettings } from "..";
import { MemberNotificationsSettings } from "../types";

export function useMemberNotificationsSettingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: MemberNotificationsSettings) =>
      putMemberNotificationSettings({ memberId, body }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: userKeys.details().queryKey });
    },
  });
}
