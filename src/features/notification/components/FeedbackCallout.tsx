import { TextButton } from "@components/Buttons/TextButton";
import { Icon } from "@components/Icon";
import { UserContext } from "@features/user/context/UserContext";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import styled from "styled-components";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog/NotificationSettingsDialog";

type Props = {
  message: string;
};

export function FeedbackCallout({ message }: Props) {
  const { isMobile } = useResponsiveLayout();

  const { user } = useContext(UserContext);
  const {
    state: isOpenDialog,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();

  return (
    <>
      <StyledFeedbackCallout $isMobile={isMobile}>
        <IconWrapper>
          <Icon icon="caption" size={16} color="gray400" />
        </IconWrapper>
        <TextWrapper>
          <span>{message} </span>
          <span> 알림을 받으려면 </span>
          <TextButton variant="underline" onClick={openDialog}>
            알림 설정
          </TextButton>
          <span>을 변경하세요.</span>
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

const StyledFeedbackCallout = styled.div<{ $isMobile: boolean }>`
  width: auto;
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "45px")};
  display: flex;
  gap: 8px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 4px;
  padding: 12px;
  margin: ${({ $isMobile }) => ($isMobile ? "0 16px" : "0")};
`;

const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  padding-top: 3px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
