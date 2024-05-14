import { IconButton } from "@components/Buttons/IconButton";
import BottomDrawer from "@components/BottomDrawer";
import { Icon, IconType } from "@components/Icon";
import useDeleteAllMemberNotificationsMutation from "@features/notification/api/queries/useDeleteAllMemberNotificationsMutation";
import { User } from "@features/user/api/types";
import { useBoolean } from "@hooks/useBoolean";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NotificationSettingsDialog } from "../../NotificationSettingsDialog/NotificationSettingsDialog";

type Props = {
  user: User;
  notificationIds: number[];
  hasNotification: boolean;
  onClose: () => void;
};

type DrawerItemType = { icon: IconType; title: string; onClick: () => void };

export default function NotificationPanelDrawerM({
  user,
  notificationIds,
  hasNotification,
  onClose,
}: Props) {
  const navigate = useNavigate();

  const {
    state: isDrawerOpen,
    setTrue: openDrawer,
    setFalse: closeDrawer,
  } = useBoolean();

  const {
    state: isDialogOpen,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();

  const { mutate } = useDeleteAllMemberNotificationsMutation(user.id);

  const onClickDeleteAllNotifications = () => {
    mutate(notificationIds);
  };

  const RemoveNotificationItem: DrawerItemType = {
    icon: "trash",
    title: "모든 알림 지우기",
    onClick: () => {
      onClickDeleteAllNotifications();
      closeDrawer();
    },
  };

  const drawerItem: DrawerItemType[] = [
    {
      icon: "settings",
      title: "알림 설정",
      onClick: () => {
        openDialog();
        closeDrawer();
      },
    },
    {
      icon: "notification",
      title: "활성 알림 보기",
      onClick: () => {
        navigate("/notifications/stock");
        closeDrawer();
        onClose();
      },
    },
    ...(hasNotification ? [RemoveNotificationItem] : []),
  ];

  return (
    <div>
      <IconButton
        icon="kebab-vertical"
        size="h40"
        iconColor="custom"
        customColor={{ color: "gray800", hoverColor: "gray50" }}
        onClick={openDrawer}
      />
      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}>
        <Content>
          {drawerItem.map((item, index) => (
            <ContentItem key={index}>
              <ContentItemButton onClick={item.onClick}>
                <Icon icon={item.icon} size={24} color="gray400" />
                {item.title}
              </ContentItemButton>
            </ContentItem>
          ))}
        </Content>
      </BottomDrawer>

      <NotificationSettingsDialog
        user={user}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
}

const Content = styled.ul`
  list-style-type: none;
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
