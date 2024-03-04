import { NotificationSettingsDialog } from "@components/common/Header/Notification/NotificationSettingsDialog";
import { Icon } from "@components/common/Icon";
import { UserContext } from "@context/UserContext";
import designSystem from "@styles/designSystem";
import { useContext, useState } from "react";
import styled from "styled-components";

type Props = {
  message: string;
};

export function FeedbackCallout({ message }: Props) {
  const { user } = useContext(UserContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <StyledFeedbackCallout>
        <Icon icon="caption" size={16} color="gray400" />
        <TextWrapper>
          {message} 알림을 받으려면
          <TextButton onClick={openDialog}> 알림 설정</TextButton> 을
          변경하세요.
        </TextWrapper>
      </StyledFeedbackCallout>

      {isOpenDialog && (
        <NotificationSettingsDialog
          user={user!}
          isOpen={isOpenDialog}
          onClose={closeDialog}
        />
      )}
    </>
  );
}

const StyledFeedbackCallout = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 4px;
  padding: 15px 12px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const TextButton = styled.pre`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.primary.blue500};
  cursor: pointer;
`;
