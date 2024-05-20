import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { UserContext } from "@features/user/context/UserContext";
import designSystem from "@styles/designSystem";
import { MouseEvent, useContext } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClick: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
};

export default function UserProfileButton({ isOpen, onClick }: Props) {
  const { user } = useContext(UserContext);

  return (
    <StyledUserProfileButton
      variant="primary"
      size="h32"
      onClick={onClick}
      $isOpen={isOpen}>
      <ProfileImageWrapper>
        {user?.profileUrl ? (
          <ProfileImage src={user.profileUrl} alt={user.nickname} $size={32} />
        ) : (
          <Icon icon="user" size={32} color={isOpen ? "gray400" : "gray600"} />
        )}
      </ProfileImageWrapper>
    </StyledUserProfileButton>
  );
}

const StyledUserProfileButton = styled(Button)<{ $isOpen: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isOpen }) =>
    $isOpen ? designSystem.color.neutral.gray800 : "inherit"};
  border-radius: 4px;

  &:hover {
    background-color: ${designSystem.color.neutral.gray800};

    .icon {
      background-color: ${designSystem.color.neutral.gray400};
    }
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${designSystem.color.neutral.gray800};
`;

const ProfileImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
`;
