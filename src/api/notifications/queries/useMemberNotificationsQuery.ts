import { useQuery } from "@tanstack/react-query";
import { getMemberNotifications } from "..";
import { notificationKeys } from "./queryKeys";

export default function useMemberNotificationsQuery(memberId: number) {
  return useQuery({
    queryKey: notificationKeys.memberNotifications().queryKey,
    queryFn: () => getMemberNotifications(memberId),
    select: (res) => res.data.notifications,
  });
}
