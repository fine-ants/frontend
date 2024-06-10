import { Icon } from "@components/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function NotificationDeniedSign() {
  return (
    <StyledNotificationDeniedSign>
      <IconWrapper>
        <Icon icon="caption" color="gray400" size={16} />
      </IconWrapper>

      <DeniedSignContent>
        <DeniedSignText>브라우저 알림 권한이 차단되어 있습니다</DeniedSignText>
        <DeniedSignText>
          알림 받기를 원하시면 브라우저에서 FineAnts 알림을 허용해 주세요
        </DeniedSignText>
      </DeniedSignContent>
    </StyledNotificationDeniedSign>
  );
}

const StyledNotificationDeniedSign = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 8px;
  border-radius: 4px;
  background-color: ${designSystem.color.neutral.gray50};
  padding: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  padding-top: 3px;
`;

const DeniedSignContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DeniedSignText = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
