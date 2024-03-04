import useMemberNotificationsQuery from "@api/notifications/queries/useMemberNotificationsQuery";
import useReadAllMemberNotificationsMutation from "@api/notifications/queries/useReadAllMemberNotificationsMutation";
import { User } from "@api/user/types";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import CounterBadge from "../../Badges/CounterBadge";
import { Icon } from "../../Icon";
import { NotificationPanel } from "./NotificationPanel";

export function NotificationControl({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [count, setCount] = useState(0);

  // TODO : error, loading handling
  const { data: notifications } = useMemberNotificationsQuery(user.id);
  const { mutate } = useReadAllMemberNotificationsMutation(user.id);

  useEffect(() => {
    if (!notifications) return;

    setCount(
      notifications.reduce((sum, data) => sum + (data.isRead ? 0 : 1), 0)
    );
  }, [notifications]);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (!notifications) return;

    const unreadNotificationIds = notifications.reduce(
      (accumulator: number[], currentValue) => (
        !currentValue.isRead && accumulator.push(currentValue.notificationId),
        accumulator
      ),
      []
    );

    if (unreadNotificationIds.length > 0) {
      mutate(unreadNotificationIds);
    }

    setAnchorEl(null);
  };

  return (
    <>
      <Control>
        <NotificationButton onClick={handleClick}>
          <Icon icon="notification" color="gray400" size={48} />
          {count > 0 && <CounterBadge count={count} />}
        </NotificationButton>
      </Control>
      {notifications && (
        <NotificationPanel
          user={user}
          anchorEl={anchorEl}
          open={open}
          notifications={notifications}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

const Control = styled.div`
  width: 40px;
  height: 40px;
  padding: 4px;
  border-radius: 4px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${designSystem.color.neutral.gray800};
  }
`;

const NotificationButton = styled.button`
  position: relative;
`;
