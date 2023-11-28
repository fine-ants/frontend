import useSignOutMutation from "@api/auth/queries/useSignOutMutation";
import notificationIcon from "@assets/icons/notification.svg";
import settings from "@assets/icons/settings.svg";
import profileImage from "@assets/images/profileImage.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// TODO: remove this
const count = "9";

export default function UserControls() {
  const navigate = useNavigate();

  const { mutate: signOutMutate } = useSignOutMutation();

  const onSignOut = () => {
    // TODO: Handler error
    signOutMutate();
  };

  return (
    <StyledUserControls>
      <ControlButton>
        <NotificationWrapper>
          <img src={notificationIcon} alt="notification" />
          <CounterBadge $numLength={String(count).length}>{count}</CounterBadge>
        </NotificationWrapper>
      </ControlButton>
      <ControlButton>
        <img src={settings} alt="settings" />
      </ControlButton>
      <ControlButton onClick={() => navigate("/profile")}>
        <img src={profileImage} alt="profile" />
      </ControlButton>
      <Button variant="text" onClick={onSignOut}>
        로그아웃
      </Button>
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
  border-radius: 4px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const CounterBadge = styled.div<{ $numLength: number }>`
  height: 16px;

  background-color: ${({ theme: { color } }) => color.state.red};
  color: white;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 1px;
  width: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return 16;
      case 2:
        return 19;
      case 3:
        return 26;
      default:
        return 16;
    }
  }}px;
  border-radius: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return 50;
      case 2:
        return 8;
      case 3:
        return 8;
      default:
        return 8;
    }
  }}px;
  transform: ${({ $numLength }) => {
    switch ($numLength) {
      case 1:
        return "translateX(-5%)";
      case 2:
        return "translateX(10%)";
      case 3:
        return "translateX(35%)";
      default:
        return "translateX(50%)";
    }
  }};
`;
