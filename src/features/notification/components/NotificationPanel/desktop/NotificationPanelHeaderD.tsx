import { IconButton } from "@components/Buttons/IconButton";
import { TextButton } from "@components/Buttons/TextButton";
import { User } from "@features/user/api/types";
import { useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NotificationSettingsDialog } from "../../NotificationSettingsDialog/NotificationSettingsDialog";

type Props = {
  user: User;
  handleClose: () => void;
};

export function NotificationPanelHeaderD({ user, handleClose }: Props) {
  const navigate = useNavigate();

  const {
    state: isOpenDialog,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();

  const navigateActivateNotify = () => {
    handleClose();
    navigate(Routes.NOTIFICATIONS("stock"));
  };

  return (
    <>
      <PanelHeader>
        <PanelTitle>알림</PanelTitle>
        <PanelButtonContainer>
          <TextButton variant="underline" onClick={navigateActivateNotify}>
            활성 알림 보기
          </TextButton>
          <Divider />
          <IconButton
            icon="settings"
            size="h24"
            iconColor="custom"
            customColor={{
              color: "gray800",
              hoverColor: "gray50",
            }}
            onClick={openDialog}
          />
        </PanelButtonContainer>
      </PanelHeader>

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
