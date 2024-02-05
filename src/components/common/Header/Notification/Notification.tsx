import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import CounterBadge from "../../Badges/CounterBadge";
import { Icon } from "../../Icon";
import { NotificationPanel } from "./NotificationPanel";

// TODO: API 확정 후에 msw 구현하고 remove this
const data = {
  notifications: [
    {
      notificationId: 13,
      title: "포트폴리오",
      content: "포트폴리오2의 최대 손실율을 초과했습니다",
      timestamp: "2024-01-24T10:10:10",
      isRead: false,
    },
    {
      notificationId: 22,
      title: "포트폴리오",
      content: "포트폴리오1의 목표 수익률을 달성했습니다",
      timestamp: "2024-01-23T10:10:10",
      isRead: false,
    },
    {
      notificationId: 31,
      title: "지정가",
      content: "삼성전자가 지정가 KRW60000에 도달했습니다",
      timestamp: "2024-01-22T10:10:10",
      isRead: true,
    },
    {
      notificationId: 43,
      title: "포트폴리오",
      content: "포트폴리오2의 최대 손실율을 초과했습니다",
      timestamp: "2024-01-24T10:10:10",
      isRead: false,
    },
    {
      notificationId: 2,
      title: "포트폴리오",
      content: "포트폴리오1의 목표 수익률을 달성했습니다",
      timestamp: "2024-01-23T10:10:10",
      isRead: false,
    },
    {
      notificationId: 51,
      title: "지정가",
      content: "삼성전자가 지정가 KRW60000에 도달했습니다",
      timestamp: "2024-01-22T10:10:10",
      isRead: true,
    },
    {
      notificationId: 63,
      title: "포트폴리오",
      content: "포트폴리오2의 최대 손실율을 초과했습니다",
      timestamp: "2024-01-24T10:10:10",
      isRead: false,
    },
    {
      notificationId: 72,
      title: "포트폴리오",
      content: "포트폴리오1의 목표 수익률을 달성했습니다",
      timestamp: "2024-01-23T10:10:10",
      isRead: false,
    },
    {
      notificationId: 81,
      title: "지정가",
      content: "삼성전자가 지정가 KRW60000에 도달했습니다",
      timestamp: "2024-01-22T10:10:10",
      isRead: true,
    },
    {
      notificationId: 93,
      title: "포트폴리오",
      content: "포트폴리오2의 최대 손실율을 초과했습니다",
      timestamp: "2024-01-24T10:10:10",
      isRead: false,
    },
    {
      notificationId: 102,
      title: "포트폴리오",
      content: "포트폴리오1의 목표 수익률을 달성했습니다",
      timestamp: "2024-01-23T10:10:10",
      isRead: false,
    },
    {
      notificationId: 111,
      title: "지정가",
      content: "삼성전자가 지정가 KRW60000에 도달했습니다",
      timestamp: "2024-01-22T10:10:10",
      isRead: true,
    },
    {
      notificationId: 123,
      title: "포트폴리오",
      content: "포트폴리오2의 최대 손실율을 초과했습니다",
      timestamp: "2024-01-24T10:10:10",
      isRead: false,
    },
    {
      notificationId: 132,
      title: "포트폴리오",
      content: "포트폴리오1의 목표 수익률을 달성했습니다",
      timestamp: "2024-01-23T10:10:10",
      isRead: false,
    },
    {
      notificationId: 141,
      title: "지정가",
      content: "삼성전자가 지정가 KRW60000에 도달했습니다",
      timestamp: "2024-01-22T10:10:10",
      isRead: true,
    },
  ],
};

export function Notification() {
  const { notifications } = data;

  const count = notifications.reduce((sum, data) => {
    return sum + (data.isRead ? 0 : 1);
  }, 0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Control>
        <NotificationButton onClick={handleClick}>
          <Icon icon="notification" color="gray400" size={48} />
          <CounterBadge count={count} />
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
