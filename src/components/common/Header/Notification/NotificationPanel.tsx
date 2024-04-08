import useDeleteAllMemberNotificationsMutation from "@api/notifications/queries/useDeleteAllMemberNotificationsMutation";
import { MemberNotification } from "@api/notifications/types";
import { User } from "@api/user/types";
import { IconButton } from "@components/common/Buttons/IconButton";
import { TextButton } from "@components/common/Buttons/TextButton";
import { Popover } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EmptyNotification } from "./EmptyNotification";
import { NotificationItem } from "./NotificationItem";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog";

type Props = {
  user: User;
  anchorEl: null | HTMLElement;
  open: boolean;
  notifications: MemberNotification[];
  handleClose: () => void;
};

export function NotificationPanel({
  user,
  anchorEl,
  open,
  notifications,
  handleClose,
}: Props) {
  const navigate = useNavigate();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate } = useDeleteAllMemberNotificationsMutation(user.id);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const onClickDeleteAllNotifications = () => {
    const ids = notifications.map((data) => data.notificationId);

    mutate(ids);
  };

  const navigateActivateNotify = () => {
    handleClose();
    navigate("/notifications/stock");
  };

  return (
    <>
      <StyledPopover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <StyledNotificationPanel>
          <PanelHeader>
            <PanelTitle>알림</PanelTitle>
            <PanelButtonContainer>
              <TextButton size="h24" onClick={navigateActivateNotify}>
                활성 알림 보기
              </TextButton>
              <Divider />
              <IconButton
                icon="settings"
                size="h40"
                iconColor="custom"
                customColor={{
                  color: "gray800",
                  hoverColor: "gray50",
                }}
                onClick={openDialog}
              />
            </PanelButtonContainer>
          </PanelHeader>
          <PanelContent>
            {notifications.length === 0 ? (
              <EmptyNotification />
            ) : (
              notifications.map((data) => (
                <NotificationItem
                  key={data.notificationId}
                  user={user}
                  memberNotification={data}
                  onClose={handleClose}
                />
              ))
            )}
          </PanelContent>
          <PanelFooter>
            <TextButton
              color="gray"
              size="h24"
              onClick={onClickDeleteAllNotifications}>
              모든 알림 지우기
            </TextButton>
          </PanelFooter>
        </StyledNotificationPanel>
      </StyledPopover>
      {isOpenDialog && (
        <NotificationSettingsDialog
          user={user}
          isOpen={isOpenDialog}
          onClose={closeDialog}
        />
      )}
    </>
  );
}

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    border: 1px solid ${designSystem.color.neutral.gray100};
    border-radius: 8px;
    left: auto !important;
    right: 30px !important;
  }
`;

const StyledNotificationPanel = styled.div`
  width: 384px;
  max-height: 85vh;
  height: 820px;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

const PanelTitle = styled.div`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
  display: flex;
  align-items: center;
`;

const PanelButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${designSystem.color.neutral.gray200};
`;

const PanelContent = styled.div`
  width: 100%;
  flex: 1;
  overflow: scroll;
  padding: 0 8px;
`;

const PanelFooter = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: right;
  align-items: center;
  box-sizing: border-box;
  padding: 0 24px;
  border-top: 1px solid ${designSystem.color.neutral.gray200};
`;
