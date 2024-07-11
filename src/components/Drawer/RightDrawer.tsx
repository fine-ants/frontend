import { useZIndex } from "@hooks/useZIndex";
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
  const { zIndex, removeCount } = useZIndex(isDrawerOpen);

  const onClose = () => {
    removeCount();
    onCloseDrawer();
  };

  return (
    <ThemeProvider theme={theme(zIndex)}>
      <SwipeableDrawer
        anchor="right"
        disableDiscovery={true}
        open={isDrawerOpen}
        onOpen={onOpenDrawer}
        onClose={onClose}>
        {children}
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

const theme = (zIndex: number) => {
  return createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          root: {
            "zIndex": zIndex,
            ".MuiPaper-root": {
              width: "100%",
            },
          },
        },
      },
    },
  });
};
