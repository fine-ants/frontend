import { Icon } from "@components/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function NotificationPWANotice() {
  return (
    <StyledNotificationPWANotice>
      <IconWrapper>
        <Icon icon="caption" color="gray400" size={16} />
      </IconWrapper>

      <NoticeContent>
        <NoticeSignText>
          모바일 브라우저에서는 데스크탑 알림을 받을 수 없습니다
        </NoticeSignText>
        <NoticeSignText>
          알림 받기를 원하시면 브라우저에서 제공하는 프로그레시브 웹 앱(PWA)을
          모바일에 다운로드 해주세요
        </NoticeSignText>
      </NoticeContent>
    </StyledNotificationPWANotice>
  );
}

const StyledNotificationPWANotice = styled.div`
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

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NoticeSignText = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
