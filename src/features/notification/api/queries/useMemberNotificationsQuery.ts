import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMemberNotifications } from "..";
import { notificationKeys } from "./queryKeys";

export default function useMemberNotificationsQuery(memberId: number) {
  const query = useQuery({
    queryKey: notificationKeys.memberNotifications.queryKey,
    queryFn: () => getMemberNotifications(memberId),
    select: (res) => res.data.notifications,
  });

  useEffect(() => {
    const notifications = query.data;

    if (!navigator.setAppBadge || !navigator.clearAppBadge) return;

    if (notifications && notifications.length > 0) {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      navigator.setAppBadge(unreadNotifications.length);
    } else {
      navigator.clearAppBadge();
    }
  });

  return query;
}
