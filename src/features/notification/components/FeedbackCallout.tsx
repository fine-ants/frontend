import { TextButton } from "@components/Buttons/TextButton";
import { Icon } from "@components/Icon";
import { UserContext } from "@features/user/context/UserContext";
import designSystem from "@styles/designSystem";
import { useContext, useState } from "react";
import styled from "styled-components";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog/NotificationSettingsDialog";

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
          {`${message} 알림을 받으려면 `}
          <TextButton variant="underline" onClick={openDialog}>
            알림 설정
          </TextButton>
          을 변경하세요.
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

const TextWrapper = styled.pre`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
