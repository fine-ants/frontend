import emptyAlertsImage from "@assets/images/empty_alerts.png";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function EmptyNotification() {
  return (
    <StyledEmptyNotification>
      <img width={70} height={80} src={emptyAlertsImage} alt="알림 없음" />
      <Text>알림이 없습니다</Text>
    </StyledEmptyNotification>
  );
}

const StyledEmptyNotification = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

const Text = styled.div`
  font: ${designSystem.font.body2.font};
`;
