import { IconButton } from "@components/Buttons/IconButton";
import BottomDrawer from "@components/Drawer/BottomDrawer";
import DrawerItem from "@components/Drawer/DrawerItem";
import { DrawerItemType } from "@components/Drawer/types";
import { Icon } from "@components/Icon";
import useDeleteAllMemberNotificationsMutation from "@features/notification/api/queries/useDeleteAllMemberNotificationsMutation";
import { User } from "@features/user/api/types";
import { useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import { useNavigate } from "react-router-dom";
import { NotificationSettingsDialog } from "../../NotificationSettingsDialog/NotificationSettingsDialog";

type Props = {
  user: User;
  notificationIds: number[];
  hasNotification: boolean;
  onClose: () => void;
};

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
        navigate(Routes.NOTIFICATIONS("stock"));
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
        onOpenDrawer={openDrawer}
        onCloseDrawer={closeDrawer}>
        <ul>
          {drawerItem.map((item, index) => (
            <DrawerItem key={index} onClick={item.onClick}>
              <Icon icon={item.icon} size={24} color="gray400" />
              {item.title}
            </DrawerItem>
          ))}
        </ul>
      </BottomDrawer>

      <NotificationSettingsDialog
        user={user}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
}
