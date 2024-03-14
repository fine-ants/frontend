import useDeleteMemberNotificationsMutation from "@api/notifications/queries/useDeleteMemberNotificationsMutation";
import { MemberNotification } from "@api/notifications/types";
import { User } from "@api/user/types";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { getElapsedSince } from "@utils/getElapsedSince";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  user: User;
  memberNotification: MemberNotification;
  onClose: () => void;
};

export function NotificationItem({ user, memberNotification, onClose }: Props) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const { mutate } = useDeleteMemberNotificationsMutation(user.id);

  const {
    body: { name, target },
    isRead,
    notificationId,
    referenceId,
    timestamp,
    title,
    type,
  } = memberNotification;

  const isStock = type === "stock";
  const priceText = isStock ? "가격이 " : "";
  const achievementStatus = target === "목표 수익률" ? "달성" : "도달";

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
          <StyledContent>
            <BoldText>{name}</BoldText>의 {priceText}
            <BoldText>
              {isStock
                ? ` ₩${thousandsDelimiter(Number(target))}`
                : ` ${target}`}
            </BoldText>
            에 {achievementStatus}했습니다
          </StyledContent>
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
  display: flex;
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

const BoldText = styled.pre`
  font: ${designSystem.font.body3.font};
  font-weight: bold;
  color: ${designSystem.color.neutral.gray900};
`;
