import useMemberNotificationsQuery from "@api/notifications/queries/useMemberNotificationsQuery";
import useReadAllMemberNotificationsMutation from "@api/notifications/queries/useReadAllMemberNotificationsMutation";
import { User } from "@api/user/types";
import CounterBadge from "@components/common/Badges/CounterBadge";
import { IconButton } from "@components/common/Buttons/IconButton";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
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
      (accumulator: number[], currentValue) => {
        if (!currentValue.isRead) {
          accumulator.push(currentValue.notificationId);
        }
        return accumulator;
      },
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
        <Wrapper>
          <NotificationButton
            icon="notification"
            size="h40"
            iconColor="gray"
            onClick={handleClick}
          />
          <Icon icon="notification" color="gray100" size={24} />
          {count > 0 && <CounterBadge count={count} />}
        </Wrapper>
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

const NotificationButton = styled(IconButton)``;

const Wrapper = styled.div`
  position: relative;
`;
