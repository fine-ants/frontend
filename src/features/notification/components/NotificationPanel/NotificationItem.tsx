import { IconButton } from "@components/Buttons/IconButton";
import useDeleteMemberNotificationsMutation from "@features/notification/api/queries/useDeleteMemberNotificationsMutation";
import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import {
  getElapsedSince,
  thousandsDelimiter,
  useBoolean,
} from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  user: User;
  memberNotification: MemberNotification;
  onClose: () => void;
};

export function NotificationItem({ user, memberNotification, onClose }: Props) {
  const navigate = useNavigate();

  const { isMobile } = useResponsiveLayout();
  const { state: isHover, setTrue: setHover, setFalse: setBlur } = useBoolean();

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
    <div onClick={navigateToPage} onMouseOver={setHover} onMouseOut={setBlur}>
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
            {getElapsedSince({ fromDate: new Date(timestamp), language: "ko" })}
          </StyledTimestamp>
        </LeftContainer>
        <RightContainer>
          <DotContainer>{!isRead && <Dot />}</DotContainer>
          {(isMobile || isHover) && (
            <IconButton
              icon="close"
              iconColor="gray"
              size="h24"
              onClick={(event) => deleteNotification(event)}
            />
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
