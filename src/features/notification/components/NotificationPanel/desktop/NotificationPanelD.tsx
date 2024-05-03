import { TextButton } from "@components/Buttons/TextButton";
import useDeleteAllMemberNotificationsMutation from "@features/notification/api/queries/useDeleteAllMemberNotificationsMutation";
import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import { Popover } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { NotificationPanelContent } from "../NotificationPanelContent";
import { NotificationPanelHeaderD } from "./NotificationPanelHeaderD";

type Props = {
  user: User;
  anchorEl: null | HTMLElement;
  open: boolean;
  notifications: MemberNotification[];
  handleClose: () => void;
};

export function NotificationPanelD({
  user,
  anchorEl,
  open,
  notifications,
  handleClose,
}: Props) {
  const { mutate } = useDeleteAllMemberNotificationsMutation(user.id);

  const onClickDeleteAllNotifications = () => {
    const ids = notifications.map((data) => data.notificationId);

    mutate(ids);
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
          <NotificationPanelHeaderD user={user} handleClose={handleClose} />
          <NotificationPanelContent
            user={user}
            notifications={notifications}
            handleClose={handleClose}
          />
          <PanelFooter>
            <TextButton
              color="gray"
              variant="underline"
              onClick={onClickDeleteAllNotifications}>
              모든 알림 지우기
            </TextButton>
          </PanelFooter>
        </StyledNotificationPanel>
      </StyledPopover>
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
