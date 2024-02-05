import designSystem from "@styles/designSystem";
import { getElapsedSince } from "@utils/getElapsedSince";
import styled from "styled-components";

type Props = {
  // TODO 삭제가 추가된다면 사용
  //   notificationId: number;
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
};

export function NotificationItem({
  //   notificationId,
  title,
  content,
  timestamp,
  isRead,
}: Props) {
  return (
    <StyledNotificationItem>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{content}</StyledContent>
      <StyledTimestamp>{getElapsedSince(new Date(timestamp))}</StyledTimestamp>
      {!isRead && <Dot />}
      <Divider />
    </StyledNotificationItem>
  );
}

const StyledNotificationItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  padding: 8px 16px;
`;

const StyledTitle = styled.div`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.primary.blue300};
`;

const StyledContent = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledTimestamp = styled.div`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray600};
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${designSystem.color.state.red500};
  border-radius: 50%;
  top: 10px;
  right: 30px;
  position: absolute;
  top: 13px;
  right: 18px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray100};
`;
