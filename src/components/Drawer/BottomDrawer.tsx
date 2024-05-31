import { IconButton } from "@components/Buttons/IconButton";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  children: ReactNode;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  handleTransitionEnd?: () => void;
  handleBackButton?: () => void;
};

export default function BottomDrawer({
  isDrawerOpen,
  children,
  onOpenDrawer,
  onCloseDrawer,
  handleTransitionEnd,
  handleBackButton,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onOpen={onOpenDrawer}
        onClose={onCloseDrawer}
        onTransitionEnd={handleTransitionEnd}>
        <Top $hasBackButton={!!handleBackButton}>
          {handleBackButton && (
            <IconButton
              icon="chevron-left"
              size="h32"
              borderRadius="rounded"
              iconColor="gray"
              onClick={handleBackButton}
            />
          )}

          <IconButton
            icon="close"
            size="h32"
            borderRadius="rounded"
            iconColor="gray"
            onClick={onCloseDrawer}
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
            display: "flex",
            gap: "8px",
            borderRadius: "16px 16px 0 0",
            padding: "16px 0",
          },
        },
      },
    },
  },
});

const Top = styled.div<{ $hasBackButton: boolean }>`
  display: ${({ $hasBackButton }) => ($hasBackButton ? "flex" : "block")};
  justify-content: ${({ $hasBackButton }) =>
    $hasBackButton ? "space-between" : "normal"};
  margin-left: ${({ $hasBackButton }) => ($hasBackButton ? "0" : "auto")};
  padding: 0 16px;
`;
