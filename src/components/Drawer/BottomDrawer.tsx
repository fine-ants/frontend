import { IconButton } from "@components/Buttons/IconButton";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  children: ReactNode;
  customStyle?: CSSProperties;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  handleTransitionEnd?: () => void;
  handleBackButton?: () => void;
};

export default function BottomDrawer({
  isDrawerOpen,
  children,
  customStyle = {},
  onOpenDrawer,
  onCloseDrawer,
  handleTransitionEnd,
  handleBackButton,
}: Props) {
  return (
    <ThemeProvider theme={theme(customStyle)}>
      <SwipeableDrawer
        anchor="bottom"
        disableSwipeToOpen={true}
        open={isDrawerOpen}
        onOpen={onOpenDrawer}
        onClose={onCloseDrawer}
        onTransitionEnd={handleTransitionEnd}>
        <Header $hasBackButton={!!handleBackButton}>
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
        </Header>
        {children}
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

const theme = (customStyle: CSSProperties) =>
  createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          root: {
            // TODO: z-index system
            "zIndex": 1400,
            ".MuiPaper-root": {
              display: "flex",
              borderRadius: "16px 16px 0 0",
              padding: "16px 0",
              overflow: "hidden",
              ...customStyle,
            },
          },
        },
      },
    },
  });

const Header = styled.header<{ $hasBackButton: boolean }>`
  display: ${({ $hasBackButton }) => ($hasBackButton ? "flex" : "block")};
  justify-content: ${({ $hasBackButton }) =>
    $hasBackButton ? "space-between" : "normal"};
  margin-left: ${({ $hasBackButton }) => ($hasBackButton ? "0" : "auto")};
  padding: 0 16px;
`;
