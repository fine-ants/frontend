import RightDrawer from "@components/Drawer/RightDrawer";
import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import styled from "styled-components";
import { NotificationPanelContent } from "../NotificationPanelContent";
import { NotificationPanelHeaderM } from "./NotificationPanelHeaderM";

type Props = {
  user: User;
  notifications: MemberNotification[];
  open: boolean;
  onOpenPanel: () => void;
  onClosePanel: () => void;
};

export function NotificationPanelM({
  user,
  open,
  notifications,
  onOpenPanel,
  onClosePanel,
}: Props) {
  return (
    <RightDrawer
      isDrawerOpen={open}
      onOpenDrawer={onOpenPanel}
      onCloseDrawer={onClosePanel}>
      <StyledNotificationPanel>
        <NotificationPanelHeaderM
          user={user}
          notifications={notifications}
          hasNotification={notifications.length > 0}
          handleClose={onClosePanel}
        />
        <NotificationPanelContent
          user={user}
          notifications={notifications}
          handleClose={onClosePanel}
        />
      </StyledNotificationPanel>
    </RightDrawer>
  );
}

const StyledNotificationPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
