import { User } from "@features/user/api/types";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { ThemeProvider, createTheme } from "@mui/material";
import { NotificationSettingsDialogD } from "./desktop/NotificationSettingsDialogD";
import { NotificationSettingsDialogM } from "./mobile/NotificationSettingsDialogM";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialog({ user, isOpen, onClose }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <ThemeProvider theme={theme}>
      {isDesktop && (
        <NotificationSettingsDialogD
          user={user}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {isMobile && (
        <NotificationSettingsDialogM
          user={user}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </ThemeProvider>
  );
}

const theme = createTheme({
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: "1500",
        },
      },
    },
  },
});
