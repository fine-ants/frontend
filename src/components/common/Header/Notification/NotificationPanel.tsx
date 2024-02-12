import useDeleteAllMemberNotificationsMutation from "@api/notifications/queries/useDeleteAllMemberNotificationsMutation";
import { Icon } from "@components/common/Icon";
import { UserContext } from "@context/UserContext";
import { Popover } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EmptyNotification } from "./EmptyNotification";
import { NotificationItem } from "./NotificationItem";
import { NotificationSettingDialog } from "./NotificationSettingDialog";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  notifications: {
    notificationId: number;
    title: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    type: "stock" | "portfolio";
    referenceId: string;
  }[];

  handleClose: () => void;
};

export function NotificationPanel({
  anchorEl,
  open,
  notifications,
  handleClose,
}: Props) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate } = useDeleteAllMemberNotificationsMutation(user!.id);

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
    closeDialog();
    navigate("/notifications/stock");
  };

  return (
    <>
      <StyledPopover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 70, left: window.innerWidth - 30 }}
        anchorOrigin={{
          vertical: "top",
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
              <TextButton onClick={navigateActivateNotify}>
                활성 알림 보기
              </TextButton>
              <Divider />
              <button onClick={openDialog}>
                <Icon icon="settings" color="gray800" size={24} />
              </button>
            </PanelButtonContainer>
          </PanelHeader>
          <PanelContent>
            {notifications.length === 0 ? (
              <EmptyNotification />
            ) : (
              notifications.map((data) => (
                <NotificationItem
                  key={data.notificationId}
                  {...data}
                  onClose={handleClose}
                />
              ))
            )}
          </PanelContent>
          <PanelFooter>
            <NotificationDeleteAllButton
              onClick={onClickDeleteAllNotifications}>
              모든 알림 지우기
            </NotificationDeleteAllButton>
          </PanelFooter>
        </StyledNotificationPanel>
      </StyledPopover>
      <NotificationSettingDialog isOpen={isOpenDialog} onClose={closeDialog} />
    </>
  );
}

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    border: 1px solid ${designSystem.color.neutral.gray100};
    border-radius: 8px;
  }
`;

const StyledNotificationPanel = styled.div`
  width: 384px;
  min-height: 80vh;
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

const TextButton = styled.button`
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
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

const NotificationDeleteAllButton = styled.button`
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
