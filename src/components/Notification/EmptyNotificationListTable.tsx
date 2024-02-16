import emptyAlertsImage from "@assets/images/empty_alerts.png";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function EmptyNotificationListTable() {
  return (
    <StyledEmptyNotificationListTable>
      <img src={emptyAlertsImage} alt="활성 알림 없음" />

      <TextBox>
        <p>활성화된 알림이 없습니다</p>
        <span>활성화된 알림이 여기에 표시됩니다</span>
      </TextBox>
    </StyledEmptyNotificationListTable>
  );
}

const StyledEmptyNotificationListTable = styled.div`
  width: 100%;
  margin: 108px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  > p {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    font: ${designSystem.font.body2.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
