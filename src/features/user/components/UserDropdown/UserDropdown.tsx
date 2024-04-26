import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import useSignOutMutation from "@features/auth/api/queries/useSignOutMutation";
import { UserContext } from "@features/user/context/UserContext";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import { MouseEvent, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function UserDropdown() {
  const { user } = useContext(UserContext);

  const { mutate: signOutMutate } = useSignOutMutation();

  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const onDropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  const onSignOut = () => {
    // TODO: Handle error
    signOutMutate();
  };

  return (
    <>
      <DropdownButton variant="primary" size="h32" onClick={onDropdownClick}>
        {user?.profileUrl ? (
          <ProfileImageWrapper>
            <ProfileImage
              src={user.profileUrl}
              alt={user.nickname}
              $size={32}
            />
          </ProfileImageWrapper>
        ) : (
          <ProfileImageWrapper>
            <Icon
              icon="user"
              size={32}
              color={isOpen ? "gray400" : "gray600"}
            />
          </ProfileImageWrapper>
        )}
      </DropdownButton>
      <DropdownMenu
        sx={dropdownMenuSx}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Link to={"/settings/profile"}>
          <DropdownItem sx={dropdownItemSx}>
            {user?.profileUrl ? (
              <ProfileImage
                src={user.profileUrl}
                alt={user.nickname}
                $size={48}
              />
            ) : (
              <Icon icon="user" size={48} color="gray200" />
            )}
            <UserDetails>
              <p>{user?.nickname}</p>
              <p>{user?.email}</p>
            </UserDetails>
          </DropdownItem>
        </Link>

        <Divider />

        <DropdownItem sx={dropdownItemSx} onClick={onSignOut}>
          로그아웃
        </DropdownItem>
      </DropdownMenu>
    </>
  );
}

const DropdownButton = styled(Button)<{ $isOpen: boolean }>`
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

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "328px",
    "maxHeight": "265px",
    "marginTop": "8px",
    "padding": "8px",
    "borderRadius": "4px",
    "boxShadow": "0px 4px 8px 0px #00000014",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",

      ".MuiMenuItem-root": {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const dropdownItemSx = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  font: designSystem.font.body2.font,
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};

const ProfileImageWrapper = styled.div`
  background-color: ${designSystem.color.neutral.gray800};
  display: flex;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
`;

const UserDetails = styled.div`
  p:first-of-type {
    margin-bottom: 4px;
    font: ${designSystem.font.title4.font};
    letter-spacing: ${designSystem.font.title4.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }

  p:last-of-type {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray600};
  }
`;
