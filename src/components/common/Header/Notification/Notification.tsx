import useMemberNotificationsQuery from "@api/notifications/queries/useMemberNotificationsQuery";
import useReadAllMemberNotificationsMutation from "@api/notifications/queries/useReadAllMemberNotificationsMutation";
import { UserContext } from "@context/UserContext";
import designSystem from "@styles/designSystem";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CounterBadge from "../../Badges/CounterBadge";
import { Icon } from "../../Icon";
import { NotificationPanel } from "./NotificationPanel";

export function Notification() {
  const { user } = useContext(UserContext);

  const { data: notifications, isLoading } = useMemberNotificationsQuery(
    user!.id
  );

  const { mutate } = useReadAllMemberNotificationsMutation(user!.id);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!notifications) return;

    setCount(
      notifications.reduce((sum, data) => sum + (data.isRead ? 0 : 1), 0)
    );
  }, [notifications]);

  // TODO : ErrorBoundary, suspense 컴포넌트 구조 고민
  if (isLoading || !notifications) {
    return <div>로딩</div>;
  }

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    const notificationIds = notifications.map((data) => data.notificationId);

    setAnchorEl(null);
    mutate(notificationIds);
  };

  return (
    <>
      <Control>
        <NotificationButton onClick={handleClick}>
          <Icon icon="notification" color="gray400" size={48} />
          {count > 0 && <CounterBadge count={count} />}
        </NotificationButton>
      </Control>
      <NotificationPanel
        anchorEl={anchorEl}
        open={open}
        notifications={notifications}
        handleClose={handleClose}
      />
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
