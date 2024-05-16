import { IconButton } from "@components/Buttons/IconButton";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  children: ReactNode;
};

export default function BottomDrawer({
  isDrawerOpen,
  openDrawer,
  closeDrawer,
  children,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}>
        <Top>
          <IconButton
            icon="close"
            size="h32"
            borderRadius="rounded"
            iconColor="gray"
            onClick={closeDrawer}
          />
        </Top>
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
            borderRadius: "16px 16px 0 0",
            padding: "16px 16px 0 16px",
          },
        },
      },
    },
  },
});

const Top = styled.div`
  margin-left: auto;
`;
