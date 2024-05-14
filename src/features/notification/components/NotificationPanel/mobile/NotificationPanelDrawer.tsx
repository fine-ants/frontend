import { IconButton } from "@components/Buttons/IconButton";
import { Icon, IconType } from "@components/Icon";
import useDeleteAllMemberNotificationsMutation from "@features/notification/api/queries/useDeleteAllMemberNotificationsMutation";
import { User } from "@features/user/api/types";
import { useBoolean } from "@hooks/useBoolean";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
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

export default function NotificationPanelDrawer({
  user,
  notificationIds,
  hasNotification,
  onClose,
}: Props) {
  const navigate = useNavigate();

  const {
    state: isOpenDrawer,
    setTrue: openDrawer,
    setFalse: closeDrawer,
  } = useBoolean();

  const {
    state: isOpenDialog,
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
      <ThemeProvider theme={theme}>
        <SwipeableDrawer
          anchor="bottom"
          open={isOpenDrawer}
          onClose={closeDrawer}
          onOpen={openDrawer}>
          <Top>
            <IconButton
              icon="close"
              size="h40"
              iconColor="gray"
              onClick={closeDrawer}
            />
          </Top>
          <Content>
            {drawerItem.map((item, index) => (
              <ContentItem key={index}>
                <StyledButton onClick={item.onClick}>
                  <Icon icon={item.icon} size={24} color="gray400" />
                  {item.title}
                </StyledButton>
              </ContentItem>
            ))}
          </Content>
        </SwipeableDrawer>
      </ThemeProvider>

      <NotificationSettingsDialog
        user={user}
        isOpen={isOpenDialog}
        onClose={closeDialog}
      />
    </div>
  );
}

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          ".MuiPaper-root": {
            borderRadius: "16px 16px 0 0",
            padding: "16px 0",
          },
        },
      },
    },
  },
});

const Top = styled.div`
  margin-left: auto;
  padding: 0 16px;
`;

const Content = styled.li`
  list-style-type: none;
`;

const ContentItem = styled.ul`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 16px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;
