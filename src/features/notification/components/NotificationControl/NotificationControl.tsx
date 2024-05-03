import useMemberNotificationsQuery from "@features/notification/api/queries/useMemberNotificationsQuery";
import useReadAllMemberNotificationsMutation from "@features/notification/api/queries/useReadAllMemberNotificationsMutation";
import { User } from "@features/user/api/types";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useEffect, useState } from "react";
import { NotificationControlD } from "./desktop/NotificationControlD";
import { NotificationControlM } from "./mobile/NotificationControlM";

export function NotificationControl({ user }: { user: User }) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { data: notifications } = useMemberNotificationsQuery(user.id);
  const { mutate: ReadAllNotificationMutate } =
    useReadAllMemberNotificationsMutation(user.id);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!notifications) return;

    setCount(
      notifications.reduce((sum, data) => sum + (data.isRead ? 0 : 1), 0)
    );
  }, [notifications]);

  const readAllNotification = () => {
    if (!notifications) return;

    const unreadNotificationIds = notifications.reduce(
      (accumulator: number[], currentValue) => {
        if (!currentValue.isRead) {
          accumulator.push(currentValue.notificationId);
        }
        return accumulator;
      },
      []
    );

    if (unreadNotificationIds.length > 0) {
      ReadAllNotificationMutate(unreadNotificationIds);
    }
  };

  return (
    <>
      {notifications && isDesktop && (
        <NotificationControlD
          user={user}
          count={count}
          notifications={notifications}
          readAllNotification={readAllNotification}
        />
      )}
      {notifications && isMobile && (
        <NotificationControlM
          user={user}
          count={count}
          notifications={notifications}
          readAllNotification={readAllNotification}
        />
      )}
    </>
  );
}
