import useDeleteMemberNotificationsMutation from "@api/notifications/queries/useDeleteMemberNotificationsMutation";
import { MemberNotifications } from "@api/notifications/types";
import { User } from "@api/user/types";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { getElapsedSince } from "@utils/getElapsedSince";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  user: User;
  memberNotifications: MemberNotifications;
  onClose: () => void;
};

export function NotificationItem({
  user,
  memberNotifications,
  onClose,
}: Props) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const { mutate } = useDeleteMemberNotificationsMutation(user.id);

  const {
    content,
    isRead,
    notificationId,
    referenceId,
    timestamp,
    title,
    type,
  } = memberNotifications;

  const deleteNotification = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutate(notificationId);
  };

  const navigateToPage = () => {
    onClose();
    navigate(`/${type}/${referenceId}`);
  };

  return (
    <div
      onClick={navigateToPage}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}>
      <StyledItemContainer>
        <LeftContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledContent>{content}</StyledContent>
          <StyledTimestamp>
            {getElapsedSince(new Date(timestamp))}
          </StyledTimestamp>
        </LeftContainer>
        <RightContainer>
          <DotContainer>{!isRead && <Dot />}</DotContainer>
          {isHover && (
            <button onClick={(event) => deleteNotification(event)}>
              <Icon icon="close" color="gray600" size={16} />
            </button>
          )}
        </RightContainer>
      </StyledItemContainer>
      <Divider />
    </div>
  );
}

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const RightContainer = styled.div`
  width: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const StyledItemContainer = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${designSystem.color.neutral.gray50};
    border-radius: 4px;
  }
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

const DotContainer = styled.div`
  width: 6px;
  height: 6px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${designSystem.color.state.red500};
  border-radius: 50%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  background-color: ${designSystem.color.neutral.gray100};
`;
