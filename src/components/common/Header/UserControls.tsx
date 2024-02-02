import styled from "styled-components";
import { Notification } from "./Notification/Notification";
import UserDropdown from "./UserDropdown";

export default function UserControls() {
  return (
    <StyledUserControls>
      <Notification />
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
