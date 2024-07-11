import { IconButton } from "@components/Buttons/IconButton";
import { useZIndex } from "@hooks/useZIndex";
import { SwipeableDrawer, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  children: ReactNode;
  rootStyle?: CSSProperties;
  paperStyle?: CSSProperties;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  handleTransitionEnd?: () => void;
  handleBackButton?: () => void;
};

const DRAWER_HEADER_HEIGHT = 32;

export default function BottomDrawer({
  isDrawerOpen,
  children,
  rootStyle = {},
  paperStyle = {},
  onOpenDrawer,
  onCloseDrawer,
  handleTransitionEnd,
  handleBackButton,
}: Props) {
  const { zIndex, removeCount } = useZIndex(isDrawerOpen);

  const onClose = () => {
    removeCount();
    onCloseDrawer();
  };

  return (
    <ThemeProvider theme={theme(rootStyle, paperStyle, zIndex)}>
      <SwipeableDrawer
        anchor="bottom"
        disableSwipeToOpen={true}
        open={isDrawerOpen}
        onOpen={onOpenDrawer}
        onClose={onClose}
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
        <Content>{children}</Content>
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

const theme = (
  rootStyle: CSSProperties,
  paperStyle: CSSProperties,
  zIndex: number
) => {
  return createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          root: {
            zIndex: zIndex,
            ...rootStyle,
          },
          paper: {
            display: "flex",
            borderRadius: "16px 16px 0 0",
            padding: "16px 0",
            overflow: "hidden",
            ...paperStyle,
          },
        },
      },
    },
  });
};

const Header = styled.header<{ $hasBackButton: boolean }>`
  margin-left: ${({ $hasBackButton }) => ($hasBackButton ? "0" : "auto")};
  padding: 0 16px;
  display: ${({ $hasBackButton }) => ($hasBackButton ? "flex" : "block")};
  justify-content: ${({ $hasBackButton }) =>
    $hasBackButton ? "space-between" : "normal"};
`;

const Content = styled.div`
  height: calc(100% - ${DRAWER_HEADER_HEIGHT}px);
`;
