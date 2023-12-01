import useSignOutMutation from "@api/auth/queries/useSignOutMutation";
import notificationIcon from "@assets/icons/notification.svg";
import settings from "@assets/icons/settings.svg";
import profileImage from "@assets/images/profileImage.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CounterBadge from "./Badges/CounterBadge";

// TODO: API 만든 후에 remove this
const count = 10;

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
          <CounterBadge count={count} />
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
