import notificationIcon from "@assets/icons/ic_notification.svg";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import CounterBadge from "../Badges/CounterBadge";
import UserDropdown from "./UserDropdown";

// TODO: API 만든 후에 remove this
const count = 10;

export default function UserControls() {
  return (
    <StyledUserControls>
      <ControlButton>
        <NotificationWrapper>
          <img src={notificationIcon} alt="notification" />
          <CounterBadge count={count} />
        </NotificationWrapper>
      </ControlButton>

      <UserDropdown />
    </StyledUserControls>
  );
}

const StyledUserControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  margin-left: auto;
  gap: 16px;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 4px;
  border-radius: 4px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${designSystem.color.neutral.gray800};
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;
