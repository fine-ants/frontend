import useSignOutMutation from "@api/auth/queries/useSignOutMutation";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserControls() {
  const navigate = useNavigate();

  const { mutate: signOutMutate } = useSignOutMutation();

  const onSignOut = () => {
    // TODO: Handler error
    signOutMutate();
  };

  return (
    <StyledUserControls>
      <ControlButton>알</ControlButton>
      <ControlButton>환</ControlButton>
      <ControlButton onClick={() => navigate("/profile/edit")}>
        프
      </ControlButton>
      <Button variant="text" onClick={onSignOut}>
        로그아웃
      </Button>
    </StyledUserControls>
  );
}

const StyledUserControls = styled.div`
  width: 144px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin-left: auto;
`;

const ControlButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
