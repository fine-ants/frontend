import { User } from "@api/user/types";
import styled from "styled-components";
import { Notification } from "./Notification/Notification";
import UserDropdown from "./UserDropdown";

export default function UserControls({ user }: { user: User }) {
  return (
    <StyledUserControls>
      <Notification user={user} />
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
