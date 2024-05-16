import { IconButton } from "@components/Buttons/IconButton";
import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import NotificationPanelDrawerM from "./NotificationPanelDrawerM";

type Props = {
  user: User;
  notifications: MemberNotification[];
  hasNotification: boolean;
  handleClose: () => void;
};

export function NotificationPanelHeaderM({
  user,
  notifications,
  hasNotification,
  handleClose,
}: Props) {
  const notificationIds = notifications.map((data) => data.notificationId);

  return (
    <>
      <PanelHeader>
        <IconButton
          icon="arrow-left"
          size="h40"
          iconColor="custom"
          customColor={{ color: "gray800", hoverColor: "gray50" }}
          onClick={handleClose}
        />
        <PanelTitle>알림</PanelTitle>
        <NotificationPanelDrawerM
          user={user}
          notificationIds={notificationIds}
          hasNotification={hasNotification}
          onClose={handleClose}
        />
      </PanelHeader>
    </>
  );
}

const PanelHeader = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const PanelTitle = styled.div`
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
  display: flex;
  align-items: center;
`;
