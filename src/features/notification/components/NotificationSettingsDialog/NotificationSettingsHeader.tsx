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
  display: flex;
  align-items: center;
  ${({ $isMobile }) =>
    $isMobile ? `height: 56px;` : `justify-content: space-between;`}
`;

const Title = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile
      ? `
          width: 33%;
          font: ${designSystem.font.title3.font};
          letter-spacing: ${designSystem.font.title3.letterSpacing};
          padding: 0 8px;
        `
      : `
          font: ${designSystem.font.heading3.font};
          letter-spacing: ${designSystem.font.heading3.letterSpacing};
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${designSystem.color.neutral.gray800};
`;

const ButtonWrapper = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;
