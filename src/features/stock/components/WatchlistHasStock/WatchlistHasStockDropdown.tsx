import { AsyncBoundary } from "@components/AsyncBoundary";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import { UserContext } from "@features/user/context/UserContext";
import NewWatchlistDialog from "@features/watchlist/components/NewWatchlistDialog";
import { useBoolean } from "@fineants/demolition";
import { Button as MuiButton } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WatchlistHasStockList from "./WatchlistHasStockList";
import WatchlistHasStockListError from "./errorFallback/WatchlistHasStockListErrorFallback";
import WatchlistHasStockListSkeleton from "./skeleton/WatchlistHasStockListSkeleton";

type Props = {
  tickerSymbol: string;
};

export function WatchlistHasStockDropdown({ tickerSymbol }: Props) {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { onOpen, DropdownMenu } = useDropdown();

  const {
    state: isNewWatchlistDialogOpen,
    setTrue: onAddNewWatchlistButtonClick,
    setFalse: onNewWatchlistDialogClose,
  } = useBoolean();

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      navigate(Routes.SIGNIN);
      return;
    }

    onOpen(e);
  };

  return (
    <>
      <Button variant="secondary" size="h32" onClick={onDropdownButtonClick}>
        <Icon icon="favorite" size={16} color="blue500" />
        관심 종목 설정
      </Button>

      <DropdownMenu
        sx={dropdownMenuSx}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <li>
          <AsyncBoundary
            SuspenseFallback={<WatchlistHasStockListSkeleton />}
            ErrorFallback={WatchlistHasStockListError}>
            <WatchlistHasStockList tickerSymbol={tickerSymbol} />
          </AsyncBoundary>
        </li>

        <Divider />

        <Footer>
          <NewWatchlistButton
            variant="text"
            onClick={onAddNewWatchlistButtonClick}>
            <Icon icon="folder-add" size={16} color="gray600" />
            <span>새 리스트 추가</span>
          </NewWatchlistButton>
        </Footer>
      </DropdownMenu>

      {isNewWatchlistDialogOpen && (
        <NewWatchlistDialog
          isOpen={isNewWatchlistDialogOpen}
          onClose={onNewWatchlistDialogClose}
        />
      )}
    </>
  );
}

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "352px",
    "height": "auto",
    "marginTop": "2px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": designSystem.color.neutral.white,
    "border": `1px solid ${designSystem.color.neutral.gray200}`,
    "borderRadius": "3px",
    "boxShadow": "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",

    ".MuiList-root": {
      "width": "100%",
      "padding": "4px 0 4px 4px",

      ".MuiMenuItem-root": {
        width: "336px",
        height: "32px",
        padding: "8px",
        borderRadius: "4px",
        boxSizing: "border-box",
        display: "flex",
        gap: "8px",
      },

      ".MuiMenuItem-root:hover": {
        backgroundColor: designSystem.color.neutral.gray50,
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const Divider = styled.li`
  width: 336px;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray100};
`;

const Footer = styled.li`
  width: 100%;
  height: 32px;
  padding-right: 4px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const NewWatchlistButton = styled(MuiButton)`
  display: flex;
  gap: 4px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  &:hover {
    background-color: transparent;
  }
`;
