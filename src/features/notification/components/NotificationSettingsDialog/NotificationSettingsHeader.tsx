import { IconButton } from "@components/Buttons/IconButton";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  onClose: () => void;
};

export function NotificationSettingsHeader({ onClose }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledHeader $isMobile={isMobile}>
      {isMobile && (
        <ButtonWrapper>
          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onClose}
          />
        </ButtonWrapper>
      )}
      <Title $isMobile={isMobile}>알림 설정</Title>
      {isDesktop && (
        <IconButton
          icon="close"
          size="h40"
          iconColor="gray"
          onClick={onClose}
        />
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{ $isMobile: boolean }>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? "56px" : "auto")};
  display: flex;
  align-items: center;
  justify-content: ${({ $isMobile }) =>
    $isMobile ? "normal" : "space-between"};
`;

const Title = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "33%" : "auto")};
  padding: ${({ $isMobile }) => ($isMobile ? "0 8px;" : "0")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${designSystem.color.neutral.gray800};
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.letterSpacing
      : designSystem.font.heading3.letterSpacing};
`;

const ButtonWrapper = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;
