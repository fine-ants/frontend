import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  children: ReactNode;
};

export default function RightDrawer({
  isDrawerOpen,
  onOpenDrawer,
  onCloseDrawer,
  children,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        anchor="right"
        disableDiscovery={true}
        open={isDrawerOpen}
        onOpen={onOpenDrawer}
        onClose={onCloseDrawer}>
        {children}
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
