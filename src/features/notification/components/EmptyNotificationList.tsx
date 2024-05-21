import emptyAlertsImage from "@assets/images/empty_alerts.png";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function EmptyNotificationList() {
  const { isMobile } = useResponsiveLayout();
  return (
    <StyledEmptyNotificationList $isMobile={isMobile}>
      <img src={emptyAlertsImage} alt="활성 알림 없음" />

      <TextBox $isMobile={isMobile}>
        <p>활성화된 알림이 없습니다</p>
        <span>활성화된 알림이 여기에 표시됩니다</span>
      </TextBox>
    </StyledEmptyNotificationList>
  );
}

const StyledEmptyNotificationList = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin: 108px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "24px" : "48px")};

  > img {
    width: ${({ $isMobile }) => ($isMobile ? "80px" : "auto")};
  }
`;

const TextBox = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  > p {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.font
        : designSystem.font.heading3.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.letterSpacing
        : designSystem.font.heading3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    font: ${({ $isMobile }) =>
      $isMobile ? designSystem.font.body3.font : designSystem.font.body2.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
