import BottomDrawer from "@components/Drawer/BottomDrawer";
import { DrawerItemType } from "@components/Drawer/types";
import { Icon } from "@components/Icon";
import useSignOutMutation from "@features/auth/api/queries/useSignOutMutation";
import { useBoolean } from "@hooks/useBoolean";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import UserProfileButton from "../UserProfileButton";

export default function UserDrawer() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { mutate: signOutMutate } = useSignOutMutation();

  const {
    state: isDrawerOpen,
    setTrue: openDrawer,
    setFalse: closeDrawer,
  } = useBoolean();

  const drawerItems: DrawerItemType[] = [
    {
      icon: "settings",
      title: "프로필 및 계정 설정",
      onClick: () => {
        closeDrawer();
        navigate("/settings/profile");
      },
    },
    {
      icon: "logout",
      title: "로그아웃",
      onClick: () => {
        closeDrawer();
        signOutMutate();
      },
    },
  ];

  return (
    <>
      <UserProfileButton isOpen={isDrawerOpen} onClick={openDrawer} />

      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={openDrawer}
        onCloseDrawer={closeDrawer}>
        <ProfileItem>
          {user?.profileUrl ? (
            <ProfileImage src={user.profileUrl} alt={user.nickname} />
          ) : (
            <Icon icon="user" size={32} color={"gray600"} />
          )}
          <div>
            <ProfileDescNickname>{user?.nickname}</ProfileDescNickname>
            <ProfileDescEmail>{user?.email}</ProfileDescEmail>
          </div>
        </ProfileItem>

        <Content>
          {drawerItems.map((item, index) => (
            <ContentItem key={index}>
              <ContentItemButton onClick={item.onClick}>
                <Icon icon={item.icon} size={24} color="gray400" />
                {item.title}
              </ContentItemButton>
            </ContentItem>
          ))}
        </Content>
      </BottomDrawer>
    </>
  );
}

const Content = styled.ul`
  width: 100%;
  list-style-type: none;
`;

const ProfileItem = styled.li`
  width: 100%;
  height: 80px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const ProfileDescNickname = styled.p`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ProfileDescEmail = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const ContentItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ContentItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;
