import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import { NotificationPanelContent } from "../NotificationPanelContent";
import { NotificationPanelHeaderM } from "./NotificationPanelHeaderM";

type Props = {
  user: User;
  open: boolean;
  notifications: MemberNotification[];
  handleOpen: () => void;
  handleClose: () => void;
};

export function NotificationPanelM({
  user,
  open,
  notifications,
  handleOpen,
  handleClose,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}>
        <StyledNotificationPanel>
          <NotificationPanelHeaderM
            user={user}
            notifications={notifications}
            hasNotification={notifications.length > 0}
            handleClose={handleClose}
          />
          <NotificationPanelContent
            user={user}
            notifications={notifications}
            handleClose={handleClose}
          />
        </StyledNotificationPanel>
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          ".MuiPaper-root": {
            width: "100%",
          },
        },
      },
    },
  },
});

const StyledNotificationPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
